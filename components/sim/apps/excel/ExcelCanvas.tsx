"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CellFormat, ExcelBook, ExcelChart, ExcelSheet } from "@/types/sim";
import type { CanvasProps, MenuItem, StatusBarProps } from "../../types";
import { Popover } from "../../chrome/Ribbon";
import { Icon } from "../../chrome/icons";
import {
  colToNum,
  evaluateCell,
  evaluateSpill,
  evaluateSpillGrid,
  filterAllows as filterAllowsCanvas,
  filterHiddenRows,
  formatValue,
  formulaToR1C1,
  isLinkedGeography,
  numToCol,
  parseRange,
  parseRef,
  rectToRange,
  refOf,
  shiftFormula,
  type Rect,
} from "@/lib/sim/excel";
import { activeCell, analyzeSuggestions, centerAcrossRanges, currentRegion, DEFAULT_COLS, DEFAULT_ROWS, isUnlocked, parseInput, selRect, sheetOf, TAB_COLORS, usedRect } from "./model";
import { SHOW_VALUES_AS } from "./dialogs";
import { TABLE_STYLE_COLORS } from "./ribbon";

const HEAD_W = 40;
const HEAD_H = 22;
const COL_W = 76;
const ROW_H = 22;
const GREEN = "#217346";

type Val = string | number | boolean | null;

function cellRaw(sheet: ExcelSheet, ref: string): string {
  const c = sheet.cells[ref];
  if (!c) return "";
  if (c.f) return c.f;
  if (c.v === undefined) return "";
  if (typeof c.v === "number") {
    if (c.fmt?.numFmt === "Percentage") return `${Math.round(c.v * 10000) / 100}%`;
    if (c.fmt?.numFmt === "Short Date" || c.fmt?.numFmt === "Long Date") return formatValue(c.v, { numFmt: "Short Date" });
  }
  return String(c.v);
}

/* ------------------------------------------------------------------ */
/* Pivot computation                                                   */
/* ------------------------------------------------------------------ */

interface VirtualCell {
  v: Val;
  fmt?: CellFormat;
}

/** Items a PivotTable field is filtered to (report filter or slicer); null = all. */
function pivotFilterItems(doc: ExcelBook, sheet: ExcelSheet, field: string): string[] | null {
  const v = doc.flags?.[`pvf:${sheet.name}:${field}`];
  return v ? String(v).split("|") : null;
}

/** Source records of a PivotTable, as field → value. */
function pivotSource(doc: ExcelBook, sheet: ExcelSheet): { head: string[]; rows: Record<string, Val>[]; fmtOf: (f: string) => CellFormat | undefined } | null {
  const pv = sheet.pivot;
  if (!pv) return null;
  const src = doc.sheets.find((s) => s.name === pv.source.sheet);
  const rc = parseRange(pv.source.range);
  if (!src || !rc) return null;
  const head: string[] = [];
  for (let c = rc.c1; c <= rc.c2; c++) head.push(String(src.cells[refOf(c, rc.r1)]?.v ?? numToCol(c)));
  const rows: Record<string, Val>[] = [];
  for (let r = rc.r1 + 1; r <= rc.r2; r++) {
    const row: Record<string, Val> = {};
    head.forEach((h, i) => (row[h] = evaluateCell(doc, src, refOf(rc.c1 + i, r))));
    if (Object.values(row).every((x) => x === null || x === "")) continue;
    rows.push(row);
  }
  return { head, rows, fmtOf: (f) => src.cells[refOf(rc.c1 + head.indexOf(f), rc.r1 + 1)]?.fmt };
}

function computePivot(doc: ExcelBook, sheet: ExcelSheet): Record<string, VirtualCell> {
  const pv = sheet.pivot;
  const out: Record<string, VirtualCell> = {};
  const source = pivotSource(doc, sheet);
  if (!pv || !source) return out;
  const { head } = source;
  // Report filters and slicers narrow the records first.
  const rows = source.rows.filter((r) => head.every((h) => {
    const items = pivotFilterItems(doc, sheet, h);
    return !items || items.some((it) => it.toLowerCase() === String(r[h] ?? "(blank)").toLowerCase());
  }));
  const at = parseRef(pv.at ?? "A3")!;
  pv.filters.forEach((f, i) => {
    const r = at.r - 2 - (pv.filters.length - 1 - i);
    if (r < 1) return;
    const items = pivotFilterItems(doc, sheet, f);
    out[refOf(at.c, r)] = { v: f, fmt: { bold: true } };
    out[refOf(at.c + 1, r)] = { v: !items ? "(All)" : items.length === 1 ? items[0] : "(Multiple Items)" };
  });
  const rowF = pv.rows[0];
  const colF = pv.columns[0];
  const val = pv.values[0];
  if (!rowF && !val) return out;
  const agg = (items: Record<string, Val>[]) => {
    if (!val) return null;
    const nums = items.map((x) => x[val.field]).filter((x): x is number => typeof x === "number");
    switch (val.fn) {
      case "Count": return items.filter((x) => x[val.field] !== null && x[val.field] !== "").length;
      case "Average": return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
      case "Max": return nums.length ? Math.max(...nums) : 0;
      case "Min": return nums.length ? Math.min(...nums) : 0;
      default: return nums.reduce((a, b) => a + b, 0);
    }
  };
  const showAs = String(doc.flags?.[`pvShowAs:${sheet.name}`] ?? "");
  const vf: CellFormat | undefined = val ? source.fmtOf(val.field) : undefined;
  const pctFmt: CellFormat = { numFmt: "Percentage", decimals: 2 };
  const fmtV = showAs && showAs !== "Running Total In" ? pctFmt : val?.fn === "Count" ? undefined : vf;
  const hdr: CellFormat = { bold: true, fill: "#DDEBF7" };
  const keyOf = (r: Record<string, Val>, f: string) => String(r[f] ?? "(blank)");
  const sortKeys = (keys: string[]) => keys.sort((a, b) => {
    const na = Number(a), nb = Number(b);
    return !Number.isNaN(na) && !Number.isNaN(nb) ? na - nb : a.localeCompare(b, undefined, { sensitivity: "base" });
  });
  const rowKeys = rowF ? sortKeys(Array.from(new Set(rows.map((r) => keyOf(r, rowF))))) : [];
  const colKeys = colF ? sortKeys(Array.from(new Set(rows.map((r) => keyOf(r, colF))))) : [];
  const label = val ? `${val.fn} of ${val.field}` : "";
  const grand = agg(rows) ?? 0;
  const colTotal = (ck: string | null) => agg(ck === null ? rows : rows.filter((x) => keyOf(x, colF) === ck)) ?? 0;
  const running: Record<string, number> = {};
  const show = (v: number | null, rk: string | null, ck: string | null): Val => {
    if (v === null) return null;
    if (!showAs) return v;
    if (showAs === "% of Grand Total") return grand ? v / grand : 0;
    if (showAs === "% of Column Total") { const t = colTotal(ck); return t ? v / t : 0; }
    if (showAs === "% of Row Total") {
      if (rk === null) return grand ? v / grand : 0;
      const t = agg(rows.filter((x) => keyOf(x, rowF) === rk)) ?? 0;
      return t ? v / t : 0;
    }
    if (showAs === "Running Total In") {
      const k = ck ?? "";
      running[k] = (running[k] ?? 0) + v;
      return running[k];
    }
    return v;
  };
  out[refOf(at.c, at.r)] = { v: rowF ? "Row Labels" : label, fmt: hdr };
  if (colF) {
    out[refOf(at.c, at.r - 1)] = { v: label, fmt: hdr };
    out[refOf(at.c + 1, at.r - 1)] = { v: "Column Labels", fmt: hdr };
    colKeys.forEach((k, i) => (out[refOf(at.c + 1 + i, at.r)] = { v: k, fmt: hdr }));
    out[refOf(at.c + 1 + colKeys.length, at.r)] = { v: "Grand Total", fmt: hdr };
  } else if (rowF && val) out[refOf(at.c + 1, at.r)] = { v: label, fmt: hdr };
  if (!rowF && val) {
    out[refOf(at.c, at.r + 1)] = { v: show(agg(rows), null, null), fmt: fmtV };
    return out;
  }
  rowKeys.forEach((k, i) => {
    const items = rows.filter((r) => keyOf(r, rowF) === k);
    out[refOf(at.c, at.r + 1 + i)] = { v: k };
    if (colF) {
      colKeys.forEach((ck, j) => (out[refOf(at.c + 1 + j, at.r + 1 + i)] = { v: show(agg(items.filter((x) => keyOf(x, colF) === ck)), k, ck), fmt: fmtV }));
      out[refOf(at.c + 1 + colKeys.length, at.r + 1 + i)] = { v: showAs === "Running Total In" ? null : show(agg(items), k, null), fmt: fmtV };
    } else if (val) out[refOf(at.c + 1, at.r + 1 + i)] = { v: show(agg(items), k, null), fmt: fmtV };
  });
  const gt = at.r + 1 + rowKeys.length;
  out[refOf(at.c, gt)] = { v: "Grand Total", fmt: { bold: true, border: "top" } };
  const gtFmt = { ...(fmtV ?? {}), bold: true, border: "top" as const };
  if (colF) {
    colKeys.forEach((ck, j) => (out[refOf(at.c + 1 + j, gt)] = { v: showAs === "Running Total In" ? null : show(colTotal(ck), null, ck === null ? null : ck), fmt: gtFmt }));
    out[refOf(at.c + 1 + colKeys.length, gt)] = { v: showAs === "Running Total In" ? null : show(grand, null, null), fmt: gtFmt };
  } else if (val) out[refOf(at.c + 1, gt)] = { v: showAs === "Running Total In" ? null : show(grand, null, null), fmt: gtFmt };
  return out;
}

/** Categories and series a chart plots: from its range, or from the PivotTable for a PivotChart. */
function chartData(doc: ExcelBook, sheet: ExcelSheet, ch: ExcelChart, pivotCells: Record<string, VirtualCell>): { cats: string[]; series: { name: string; vals: number[] }[] } | null {
  let cats: string[] = [];
  let series: { name: string; vals: number[] }[] = [];
  if (ch.range === "PIVOT") {
    const at = parseRef(sheet.pivot?.at ?? "A3");
    if (!at) return null;
    const v = (c: number, r: number) => pivotCells[refOf(c, r)]?.v ?? null;
    const hasRows = v(at.c, at.r) === "Row Labels";
    let lastR = at.r + 1;
    if (hasRows) {
      for (let r = at.r + 1; v(at.c, r) !== null && v(at.c, r) !== "Grand Total"; r++) { cats.push(String(v(at.c, r))); lastR = r; }
    } else cats = ["Total"];
    const cols: { c: number; name: string }[] = [];
    if (hasRows && v(at.c + 1, at.r - 1) === "Column Labels") {
      for (let c = at.c + 1; v(c, at.r) !== null && v(c, at.r) !== "Grand Total"; c++) cols.push({ c, name: String(v(c, at.r)) });
    } else cols.push({ c: hasRows ? at.c + 1 : at.c, name: String(v(hasRows ? at.c + 1 : at.c, at.r) ?? "Total") });
    series = cols.map(({ c, name }) => ({
      name,
      vals: hasRows ? cats.map((_, i) => { const x = v(c, at.r + 1 + i); return typeof x === "number" ? x : 0; }) : [Number(v(at.c, at.r + 1)) || 0],
    }));
    void lastR;
  } else {
    const rc = parseRange(ch.range);
    if (!rc) return null;
    const firstColText = typeof evaluateCell(doc, sheet, refOf(rc.c1, rc.r1 + 1)) !== "number";
    const headerRow = typeof evaluateCell(doc, sheet, refOf(rc.c2, rc.r1)) !== "number";
    const catCol = firstColText ? rc.c1 : null;
    const startRow = headerRow ? rc.r1 + 1 : rc.r1;
    for (let r = startRow; r <= rc.r2; r++) cats.push(catCol ? String(evaluateCell(doc, sheet, refOf(catCol, r)) ?? "") : String(r - startRow + 1));
    for (let c = catCol ? rc.c1 + 1 : rc.c1; c <= rc.c2; c++) {
      const vals: number[] = [];
      for (let r = startRow; r <= rc.r2; r++) {
        const x = evaluateCell(doc, sheet, refOf(c, r));
        vals.push(typeof x === "number" ? x : 0);
      }
      series.push({ name: headerRow ? String(evaluateCell(doc, sheet, refOf(c, rc.r1)) ?? "") : `Series${series.length + 1}`, vals });
    }
  }
  if (doc.flags?.[`chart:${ch.id}:switch`]) {
    // Switch Row/Column: categories become series and series become categories.
    const nextCats = series.map((x) => x.name);
    const nextSeries = cats.map((name, i) => ({ name, vals: series.map((x) => x.vals[i] ?? 0) }));
    cats = nextCats;
    series = nextSeries;
  }
  return { cats, series };
}

/* ------------------------------------------------------------------ */
/* Conditional formatting                                              */
/* ------------------------------------------------------------------ */

type CfStyle = React.CSSProperties & { icon?: string; iconColor?: string };

function cfStyles(doc: ExcelBook, sheet: ExcelSheet): Record<string, CfStyle> {
  const out: Record<string, CfStyle> = {};
  for (const rule of sheet.cf ?? []) {
    const rc = parseRange(rule.range);
    if (!rc) continue;
    const refs: string[] = [];
    for (let r = rc.r1; r <= Math.min(rc.r2, rc.r1 + 300); r++) for (let c = rc.c1; c <= Math.min(rc.c2, rc.c1 + 30); c++) refs.push(refOf(c, r));
    const vals = refs.map((ref) => evaluateCell(doc, sheet, ref));
    const nums = vals.filter((v): v is number => typeof v === "number");
    const min = Math.min(...nums), max = Math.max(...nums);
    const avg = nums.reduce((a, b) => a + b, 0) / (nums.length || 1);
    const sorted = nums.slice().sort((a, b) => b - a);
    refs.forEach((ref, i) => {
      const v = vals[i];
      let hit = false;
      const n = typeof v === "number" ? v : NaN;
      const rv = Number(rule.value);
      switch (rule.rule) {
        case "Greater Than": hit = n > rv; break;
        case "Less Than": hit = n < rv; break;
        case "Equal To": hit = typeof v === "number" ? n === rv : String(v ?? "").toLowerCase() === String(rule.value ?? "").toLowerCase(); break;
        case "Between": {
          const [lo, hi] = String(rule.value ?? "").split("|").map(Number);
          hit = n >= lo && n <= hi;
          break;
        }
        case "Text Contains": hit = String(v ?? "").toLowerCase().includes(String(rule.value ?? "").toLowerCase()); break;
        case "Duplicate Values": hit = v !== null && v !== "" && vals.filter((x) => String(x).toLowerCase() === String(v).toLowerCase()).length > 1; break;
        case "Top 10": hit = typeof v === "number" && sorted.indexOf(v) > -1 && sorted.indexOf(v) < Number(rule.value ?? 10); break;
        case "Above Average": hit = n > avg; break;
        case "Formula": {
          // The formula is written for the range's top-left cell and adjusts for every other cell.
          const p = parseRef(ref)!;
          const res = evaluateSpill(doc, sheet, shiftFormula(String(rule.value ?? ""), p.c - rc.c1, p.r - rc.r1), ref)[0];
          hit = res === true || (typeof res === "number" && res !== 0) || (typeof res === "string" && res.toUpperCase() === "TRUE");
          break;
        }
        default: {
          if (typeof v !== "number") return;
          const t = max === min ? 1 : (v - min) / (max - min);
          if (rule.rule.includes("Data Bar")) {
            const col = rule.rule.includes("Green") ? "#63BE7B" : rule.rule.includes("Orange") ? "#FFB628" : "#638EC6";
            out[ref] = { ...out[ref], backgroundImage: `linear-gradient(90deg, ${col}88 ${t * 100}%, transparent ${t * 100}%)` };
          } else if (rule.rule.includes("Color Scale")) {
            if (rule.rule.startsWith("Red")) {
              // Red - Yellow - Green puts red on the highest values.
              const tt = 1 - t;
              const g2 = tt > 0.5 ? [99, 190, 123] : [255, 235, 132];
              const r2 = tt > 0.5 ? [255, 235, 132] : [248, 105, 107];
              const k2 = tt > 0.5 ? (tt - 0.5) * 2 : tt * 2;
              out[ref] = { ...out[ref], background: `rgb(${r2.map((x, j) => Math.round(x + (g2[j] - x) * k2)).join(",")})` };
              return;
            }
            const g = t > 0.5 ? [99, 190, 123] : [255, 235, 132];
            const r = t > 0.5 ? [255, 235, 132] : [248, 105, 107];
            const k = t > 0.5 ? (t - 0.5) * 2 : t * 2;
            const mix = r.map((x, j) => Math.round(x + (g[j] - x) * k));
            out[ref] = { ...out[ref], background: `rgb(${mix.join(",")})` };
          } else if (/Traffic|Arrows|Symbols|Flags/.test(rule.rule)) {
            // Icon sets split the range into thirds: top, middle, bottom.
            const tier = t >= 0.67 ? 0 : t >= 0.33 ? 1 : 2;
            const glyphs = rule.rule.includes("Arrows") ? ["▲", "▶", "▼"] : rule.rule.includes("Symbols") ? ["✔", "!", "✖"] : rule.rule.includes("Flags") ? ["⚑", "⚑", "⚑"] : ["●", "●", "●"];
            out[ref] = { ...out[ref], icon: glyphs[tier], iconColor: ["#00A651", "#E8A33D", "#D9302C"][tier] };
          }
          return;
        }
      }
      if (hit) out[ref] = { ...out[ref], background: rule.fill, color: rule.color };
    });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Chart                                                               */
/* ------------------------------------------------------------------ */

const PALETTE = ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47"];

function ChartView({ doc, sheet, ch, selected, onSelect, onTitleEdit, pivotCells }: { doc: ExcelBook; sheet: ExcelSheet; ch: ExcelChart; selected: boolean; onSelect: () => void; onTitleEdit: () => void; pivotCells: Record<string, VirtualCell> }) {
  const data = chartData(doc, sheet, ch, pivotCells);
  if (!data) return null;
  const { cats, series } = data;
  const labels = Boolean(doc.flags?.[`chart:${ch.id}:labels`]);
  const legend = String(doc.flags?.[`chart:${ch.id}:legend`] ?? "Bottom");
  const max = Math.max(1, ...series.flatMap((s) => s.vals));
  const W = 360, H = 200, P = 30;
  const isPie = /Pie|Doughnut/.test(ch.type);
  const isLine = /Line|Area|Scatter/.test(ch.type);
  const isBar = /Bar/.test(ch.type);
  let body: React.ReactNode;
  if (isPie) {
    const vals = series[0]?.vals ?? [];
    const total = vals.reduce((a, b) => a + b, 0) || 1;
    let acc = 0;
    body = (
      <g transform={`translate(${W / 2 - 60},${H / 2 + 5})`}>
        {vals.map((v, i) => {
          const a0 = (acc / total) * Math.PI * 2;
          acc += v;
          const a1 = (acc / total) * Math.PI * 2;
          const r = 62;
          const large = a1 - a0 > Math.PI ? 1 : 0;
          const d = `M0 0 L${r * Math.sin(a0)} ${-r * Math.cos(a0)} A${r} ${r} 0 ${large} 1 ${r * Math.sin(a1)} ${-r * Math.cos(a1)} Z`;
          return <path key={i} d={d} fill={PALETTE[i % PALETTE.length]} stroke="#fff" />;
        })}
        {ch.type === "Doughnut" && <circle r="30" fill="#fff" />}
        {legend !== "None" && cats.map((c, i) => (
          <g key={i} transform={`translate(90,${-50 + i * 14})`}>
            <rect width="8" height="8" fill={PALETTE[i % PALETTE.length]} />
            <text x="12" y="8" fontSize="9" fill="#444">{c}</text>
          </g>
        ))}
      </g>
    );
  } else {
    const n = cats.length || 1;
    const bandW = (W - P * 2) / n;
    body = (
      <g>
        <line x1={P} y1={H - P} x2={W - 10} y2={H - P} stroke="#bbb" />
        {[0.25, 0.5, 0.75, 1].map((t) => <line key={t} x1={P} x2={W - 10} y1={H - P - t * (H - P * 2)} y2={H - P - t * (H - P * 2)} stroke="#eee" />)}
        {isLine
          ? series.map((s, si) => (
              <polyline key={si} fill="none" stroke={PALETTE[si % PALETTE.length]} strokeWidth="2" points={s.vals.map((v, i) => `${P + bandW * (i + 0.5)},${H - P - (v / max) * (H - P * 2)}`).join(" ")} />
            ))
          : series.map((s, si) =>
              s.vals.map((v, i) => {
                const bw = (bandW * 0.7) / series.length;
                const x = P + bandW * i + bandW * 0.15 + bw * si;
                const h = (v / max) * (H - P * 2);
                return isBar ? (
                  <rect key={`${si}-${i}`} x={P} y={20 + i * ((H - 50) / n) + si * 6} width={(v / max) * (W - P * 2)} height={Math.max(4, (H - 50) / n / series.length - 2)} fill={PALETTE[si % PALETTE.length]} />
                ) : (
                  <rect key={`${si}-${i}`} x={x} y={H - P - h} width={bw} height={h} fill={PALETTE[si % PALETTE.length]} />
                );
              }),
            )}
        {!isBar && cats.map((c, i) => <text key={i} x={P + bandW * (i + 0.5)} y={H - P + 12} fontSize="8.5" textAnchor="middle" fill="#555">{c.length > 10 ? `${c.slice(0, 9)}…` : c}</text>)}
        {labels && !isBar && series.map((s, si) =>
          s.vals.map((v, i) => {
            const bw = (bandW * 0.7) / series.length;
            const x = isLine ? P + bandW * (i + 0.5) : P + bandW * i + bandW * 0.15 + bw * (si + 0.5);
            return <text key={`l${si}-${i}`} x={x} y={H - P - (v / max) * (H - P * 2) - 3} fontSize="7.5" textAnchor="middle" fill="#333">{formatValue(Math.round(v * 100) / 100, undefined)}</text>;
          }),
        )}
        {series.length > 1 && legend !== "None" && series.map((s, si) => (
          <g key={si} transform={`translate(${P + si * 90},${H - 6})`}>
            <rect width="8" height="8" y="-7" fill={PALETTE[si % PALETTE.length]} />
            <text x="11" fontSize="8.5" fill="#444">{s.name}</text>
          </g>
        ))}
      </g>
    );
  }
  return (
    <div
      onMouseDown={(e) => { e.stopPropagation(); onSelect(); }}
      className={`absolute z-20 bg-white shadow ${selected ? "outline outline-2 outline-[#8a8a8a]" : "border border-gray-300"}`}
      style={{ width: W, height: H + 26 }}
    >
      <div onDoubleClick={(e) => { e.stopPropagation(); onTitleEdit(); }} className="cursor-text pt-1 text-center text-[13px] text-gray-700">
        {ch.title === "" ? " " : ch.title ?? "Chart Title"}
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>{body}</svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export function ExcelCanvas({ doc, ui, onSelect, onCommit, onContextMenu, openDialog }: CanvasProps<ExcelBook>) {
  const sheet = sheetOf(doc, ui);
  const z = (sheet.zoom ?? 100) / 100;
  const sel = ui.selection || "A1";
  const act = activeCell(ui);
  const [edit, setEdit] = useState<{ ref: string; text: string; bar?: boolean } | null>(null);
  const editRef = useRef(edit);
  editRef.current = edit;
  const [renaming, setRenaming] = useState<{ name: string; text: string } | null>(null);
  const [filterMenu, setFilterMenu] = useState<{ col: string; x: number; y: number } | null>(null);
  const [listMenu, setListMenu] = useState<{ ref: string; x: number; y: number; items: string[] } | null>(null);
  const [pivotMenu, setPivotMenu] = useState<{ field: string; x: number; y: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const drag = useRef<{ mode: "select" | "fill" | "point" | "col" | "row"; anchor: string; src?: Rect; target?: Rect; pointStart?: number } | null>(null);
  const [fillPreview, setFillPreview] = useState<Rect | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const nameBoxRef = useRef<HTMLInputElement>(null);
  const [nameBox, setNameBox] = useState<string | null>(null);

  useEffect(() => {
    setEdit(null);
  }, [doc]);

  // Dynamic array results spill into the cells below/right; anything in the way gives #SPILL!.
  const spill = useMemo(() => {
    const out: Record<string, Val> = {};
    const blocked = new Set<string>();
    const ranges: Record<string, Rect> = {};
    for (const [ref, cell] of Object.entries(sheet.cells)) {
      if (!cell.f || !/\b(UNIQUE|SORT|SORTBY|FILTER|SEQUENCE)\(/i.test(cell.f)) continue;
      const grid = evaluateSpillGrid(doc, sheet, cell.f, ref);
      const p = parseRef(ref)!;
      const targets: [string, Val][] = [];
      let block = false;
      grid.forEach((row, i) =>
        row.forEach((v, j) => {
          if (i === 0 && j === 0) return;
          const t = refOf(p.c + j, p.r + i);
          const tc = sheet.cells[t];
          if ((tc && (tc.f || (tc.v !== undefined && tc.v !== ""))) || out[t] !== undefined) block = true;
          targets.push([t, v]);
        }),
      );
      if (block) blocked.add(ref);
      else {
        for (const [t, v] of targets) out[t] = v;
        if (targets.length) ranges[ref] = { c1: p.c, r1: p.r, c2: p.c + Math.max(0, ...grid.map((r) => r.length)) - 1, r2: p.r + grid.length - 1 };
      }
    }
    return { out, blocked, ranges };
  }, [doc, sheet]);

  const used = usedRect(sheet);
  const spillMax = Object.values(spill.ranges).reduce((m, r) => ({ c: Math.max(m.c, r.c2), r: Math.max(m.r, r.r2) }), { c: 0, r: 0 });
  const nCols = Math.max(sheet.cols ?? DEFAULT_COLS, (used?.c2 ?? 0) + 2, spillMax.c + 1);
  const nRows = Math.max(sheet.rows ?? DEFAULT_ROWS, (used?.r2 ?? 0) + 3, spillMax.r + 2);
  const hiddenRows = new Set(sheet.hiddenRows ?? []);
  const hiddenCols = new Set(sheet.hiddenCols ?? []);
  const filterRect = sheet.filter ? parseRange(sheet.filter) : null;
  // Rows hidden by an AutoFilter
  const filtered = filterHiddenRows(doc, sheet);
  for (const r of filtered) hiddenRows.add(r);
  const r1c1 = Boolean(doc.flags?.r1c1);
  const markedFinal = doc.flags?.protect === "Mark as Final";
  const sheetView = doc.flags?.sheetView ? String(doc.flags.sheetView) : "";
  // The outline bar (groups and subtotals) sits left of the row numbers.
  const outW = (sheet.groups?.length ?? 0) > 0 ? 30 : 0;
  const headW = HEAD_W + outW;

  const colW = (c: number) => (hiddenCols.has(numToCol(c)) ? 0 : (sheet.colWidths?.[numToCol(c)] ?? COL_W) * z);
  const rowH = (r: number) => (hiddenRows.has(r) ? 0 : (sheet.rowHeights?.[String(r)] ?? ROW_H) * z);
  const colX: number[] = [0, headW];
  for (let c = 1; c <= nCols; c++) colX[c + 1] = colX[c] + colW(c);
  const rowY: number[] = [0, HEAD_H];
  for (let r = 1; r <= nRows; r++) rowY[r + 1] = rowY[r] + rowH(r);

  const pivotCells = useMemo(() => computePivot(doc, sheet), [doc, sheet]);
  const cf = useMemo(() => cfStyles(doc, sheet), [doc, sheet]);
  const casRanges = centerAcrossRanges(doc, sheet);

  const merges = (sheet.merges ?? []).map((m) => parseRange(m)).filter(Boolean) as Rect[];
  const coveredBy = (c: number, r: number) => merges.find((m) => c >= m.c1 && c <= m.c2 && r >= m.r1 && r <= m.r2);

  const tbl = sheet.table ? parseRange(sheet.table.range) : null;
  const tblColor = sheet.table ? TABLE_STYLE_COLORS[sheet.table.style] ?? "#4472C4" : "#4472C4";
  const freeze = sheet.freeze ? parseRef(sheet.freeze) : null;
  const selR = selRect(sheet, sel);

  /* ---------- selection helpers ---------- */

  const focus = () => focusRef.current?.focus({ preventScroll: true });

  const finishSelection = (next: string) => {
    onSelect({ selection: next });
    if (doc.painter) onCommit({ kind: "command", id: "home.formatPainter.apply" });
  };

  const commitEdit = (move: "down" | "right" | "none" = "down") => {
    const e = editRef.current;
    if (!e) return;
    setEdit(null);
    editRef.current = null;
    if (blockedEdit(e.ref)) return;
    if (e.text !== cellRaw(sheet, e.ref)) onCommit({ kind: "type", target: e.ref, value: e.text });
    const p = parseRef(e.ref)!;
    if (move === "down") onSelect({ selection: refOf(p.c, p.r + 1) });
    if (move === "right") onSelect({ selection: refOf(p.c + 1, p.r) });
    focus();
  };

  /** Protected sheets allow edits only in unlocked cells; a workbook marked as final allows none. */
  const blockedEdit = (ref: string) => {
    if (markedFinal && /^[A-Z]+\d+$/.test(ref)) {
      setMessage("An author has marked this workbook as final to discourage editing. Click Edit Anyway on the yellow bar to edit it.");
      return true;
    }
    if (sheet.protected && /^[A-Z]+\d+$/.test(ref) && !isUnlocked(doc, sheet, ref)) {
      setMessage("The cell or chart you're trying to change is on a protected sheet. To make a change, unprotect the sheet (Review › Unprotect Sheet).");
      return true;
    }
    return false;
  };

  const startEdit = (text?: string) => {
    if (sel.startsWith("chart:") || sel.startsWith("obj:")) return;
    if (blockedEdit(act)) return;
    setEdit({ ref: act, text: text ?? cellRaw(sheet, act) });
  };

  const insertRef = (ref: string) => {
    const e = editRef.current;
    if (!e) return;
    const base = drag.current?.pointStart ?? e.text.length;
    setEdit({ ...e, text: e.text.slice(0, base) + ref });
  };

  /* ---------- mouse ---------- */

  useEffect(() => {
    const up = () => {
      const d = drag.current;
      drag.current = null;
      if (!d) return;
      if (d.mode === "fill" && d.target && d.src) {
        setFillPreview(null);
        const t = d.target;
        if (rectToRange(t) !== rectToRange(d.src)) onCommit({ kind: "command", id: "excel.fill", value: rectToRange(t) });
        return;
      }
      if (d.mode === "select" || d.mode === "col" || d.mode === "row") {
        if (doc.painter) onCommit({ kind: "command", id: "home.formatPainter.apply" });
      }
    };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, [doc.painter, onCommit]);

  const cellDown = (e: React.MouseEvent, ref: string) => {
    if (e.button === 2) return;
    e.preventDefault();
    setFilterMenu(null);
    setMessage(null);
    if (edit && edit.text.startsWith("=")) {
      drag.current = { mode: "point", anchor: ref, pointStart: edit.text.length };
      insertRef(ref);
      return;
    }
    if (edit) commitEdit("none");
    if (e.shiftKey) {
      const anchor = act;
      const a = parseRef(anchor)!, b = parseRef(ref)!;
      onSelect({ selection: rectToRange({ c1: Math.min(a.c, b.c), r1: Math.min(a.r, b.r), c2: Math.max(a.c, b.c), r2: Math.max(a.r, b.r) }) });
    } else {
      drag.current = { mode: "select", anchor: ref };
      onSelect({ selection: ref });
    }
    focus();
  };

  const cellEnter = (ref: string) => {
    const d = drag.current;
    if (!d) return;
    const a = parseRef(d.anchor)!, b = parseRef(ref)!;
    const rect = { c1: Math.min(a.c, b.c), r1: Math.min(a.r, b.r), c2: Math.max(a.c, b.c), r2: Math.max(a.r, b.r) };
    if (d.mode === "select") onSelect({ selection: rectToRange(rect) });
    else if (d.mode === "point") {
      const e = editRef.current;
      if (e) setEdit({ ...e, text: e.text.slice(0, d.pointStart) + rectToRange(rect) });
    } else if (d.mode === "fill" && d.src) {
      const s = d.src;
      let t: Rect = s;
      if (b.r > s.r2) t = { ...s, r2: b.r };
      else if (b.r < s.r1) t = { ...s, r1: b.r };
      else if (b.c > s.c2) t = { ...s, c2: b.c };
      else if (b.c < s.c1) t = { ...s, c1: b.c };
      d.target = t;
      setFillPreview(t);
    }
  };

  const colDown = (e: React.MouseEvent, c: number) => {
    if (e.button === 2) return;
    e.preventDefault();
    if (edit) commitEdit("none");
    const col = numToCol(c);
    drag.current = { mode: "col", anchor: `${col}1` };
    onSelect({ selection: `${col}:${col}` });
    focus();
  };
  const rowDown = (e: React.MouseEvent, r: number) => {
    if (e.button === 2) return;
    e.preventDefault();
    if (edit) commitEdit("none");
    drag.current = { mode: "row", anchor: `A${r}` };
    onSelect({ selection: `${r}:${r}` });
    focus();
  };

  /* ---------- keyboard ---------- */

  const move = (dc: number, dr: number, extend: boolean, jump: boolean) => {
    const p = parseRef(act)!;
    let c = p.c + dc, r = p.r + dr;
    if (jump) {
      // Jump to the edge of the data region.
      const has = (cc: number, rr: number) => Boolean(sheet.cells[refOf(cc, rr)]?.v !== undefined || sheet.cells[refOf(cc, rr)]?.f);
      c = p.c; r = p.r;
      while (c + dc >= 1 && r + dr >= 1 && c + dc <= nCols && r + dr <= nRows && has(c + dc, r + dr)) { c += dc; r += dr; }
      if (c === p.c && r === p.r) { c = Math.max(1, Math.min(nCols, p.c + dc)); r = Math.max(1, Math.min(nRows, p.r + dr)); }
    }
    c = Math.max(1, Math.min(nCols, c));
    r = Math.max(1, Math.min(nRows, r));
    if (extend) {
      const rc = selR ?? { c1: p.c, r1: p.r, c2: p.c, r2: p.r };
      const r1 = dr < 0 ? Math.max(1, rc.r1 - 1) : rc.r1, r2 = dr > 0 ? rc.r2 + 1 : rc.r2;
      const c1 = dc < 0 ? Math.max(1, rc.c1 - 1) : rc.c1, c2 = dc > 0 ? rc.c2 + 1 : rc.c2;
      onSelect({ selection: rectToRange({ c1, r1, c2, r2 }) });
    } else onSelect({ selection: refOf(c, r) });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (edit || renaming) return;
    const k = e.key;
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl && k.toLowerCase() === "a") {
      e.preventDefault();
      e.stopPropagation();
      const rc = currentRegion(sheet, act);
      onSelect({ selection: rc && rectToRange(rc) !== sel ? rectToRange(rc) : `A1:${numToCol(nCols)}${nRows}` });
      return;
    }
    if (ctrl && k === "Home") { e.preventDefault(); onSelect({ selection: "A1" }); return; }
    if (k.startsWith("Arrow")) {
      e.preventDefault();
      const [dc, dr] = k === "ArrowUp" ? [0, -1] : k === "ArrowDown" ? [0, 1] : k === "ArrowLeft" ? [-1, 0] : [1, 0];
      move(dc, dr, e.shiftKey, ctrl);
      return;
    }
    if (ctrl || e.altKey) return;
    if (k === "Enter") { e.preventDefault(); move(0, e.shiftKey ? -1 : 1, false, false); return; }
    if (k === "Tab") { e.preventDefault(); move(e.shiftKey ? -1 : 1, 0, false, false); return; }
    if (k === "Home") { e.preventDefault(); onSelect({ selection: refOf(1, parseRef(act)!.r) }); return; }
    if (k === "Delete" || k === "Backspace") {
      e.preventDefault();
      if (sel.startsWith("chart:")) onCommit({ kind: "command", id: "chart.delete" });
      else if (k === "Backspace") startEdit("");
      else onCommit({ kind: "command", id: "edit.clearContents" });
      return;
    }
    if (k === "F2") { e.preventDefault(); startEdit(); return; }
    if (k.length === 1) { e.preventDefault(); startEdit(k); }
  };

  /* ---------- context menus ---------- */

  const cellMenu = (e: React.MouseEvent, ref: string, kind: "cell" | "col" | "row") => {
    e.preventDefault();
    e.stopPropagation();
    const inSel = selR && (() => { const p = parseRef(ref)!; return p.c >= selR.c1 && p.c <= selR.c2 && p.r >= selR.r1 && p.r <= selR.r2; })();
    if (!inSel) onSelect({ selection: kind === "col" ? `${ref.replace(/\d+/, "")}:${ref.replace(/\d+/, "")}` : kind === "row" ? `${ref.replace(/[A-Z]+/, "")}:${ref.replace(/[A-Z]+/, "")}` : ref });
    const items: MenuItem[] = [
      { label: "Cut", icon: "cut", command: "home.cut", shortcut: "Ctrl+X" },
      { label: "Copy", icon: "copy", command: "home.copy", shortcut: "Ctrl+C" },
      { label: "Paste", icon: "paste", command: "home.paste" },
      { label: "Paste Values", icon: "paste", command: "home.paste", value: "Values" },
      { label: "Paste Formulas", icon: "fx", command: "home.paste", value: "Formulas" },
      { label: "Paste Transpose", icon: "orientation", command: "home.paste", value: "Transpose" },
      { separator: true },
    ];
    // After a Cut, Excel offers to insert the cut cells here and shift the rest.
    if (doc.clipboard?.cut) items.push({ label: "Insert Cut Cells", icon: "insertCells", command: "home.insertCut" });
    if (kind === "cell" && sheet.pivot && pivotCells[ref]) {
      items.push(
        { label: "Refresh", icon: "reset", command: "data.refresh" },
        { separator: true },
        ...["Sum", "Count", "Average", "Max", "Min"].map((v) => ({ label: `Summarize Values By › ${v}`, command: "pivot.summarize", value: v })),
        ...SHOW_VALUES_AS.map((v) => ({ label: `Show Values As › ${v}`, command: "pivot.showAs", value: v })),
        { label: "Value Field Settings...", icon: "options", dialog: "valueFieldSettings" },
        { separator: true },
      );
    }
    if (kind === "col") {
      items.push(
        { label: "Insert", icon: "insertCells", command: "home.insert", value: "Insert Sheet Columns" },
        { label: "Delete", icon: "deleteCells", command: "home.delete", value: "Delete Sheet Columns" },
        { label: "Clear Contents", icon: "clear", command: "edit.clearContents" },
        { separator: true },
        { label: "Format Cells...", icon: "format", dialog: "formatCells" },
        { label: "Column Width...", icon: "columns", dialog: "columnWidth" },
        { label: "Hide", command: "home.format", value: "Hide Columns" },
        { label: "Unhide", command: "home.format", value: "Unhide Columns" },
      );
    } else if (kind === "row") {
      items.push(
        { label: "Insert", icon: "insertCells", command: "home.insert", value: "Insert Sheet Rows" },
        { label: "Delete", icon: "deleteCells", command: "home.delete", value: "Delete Sheet Rows" },
        { label: "Clear Contents", icon: "clear", command: "edit.clearContents" },
        { separator: true },
        { label: "Format Cells...", icon: "format", dialog: "formatCells" },
        { label: "Row Height...", icon: "spacing", dialog: "rowHeight" },
        { label: "Hide", command: "home.format", value: "Hide Rows" },
        { label: "Unhide", command: "home.format", value: "Unhide Rows" },
      );
    } else {
      items.push(
        { label: "Insert Sheet Rows", icon: "insertCells", command: "home.insert", value: "Insert Sheet Rows" },
        { label: "Insert Sheet Columns", icon: "insertCells", command: "home.insert", value: "Insert Sheet Columns" },
        { label: "Delete Sheet Rows", icon: "deleteCells", command: "home.delete", value: "Delete Sheet Rows" },
        { label: "Clear Contents", icon: "clear", command: "edit.clearContents" },
        { separator: true },
        { label: "Filter", icon: "filter", command: "data.filter" },
        { label: "Sort A to Z", icon: "sortAsc", command: "data.sortAsc" },
        { label: "Sort Z to A", icon: "sortDesc", command: "data.sortDesc" },
        { separator: true },
        { label: "New Comment", icon: "comment", dialog: "newComment" },
        { label: "New Note", icon: "notes", dialog: "newNote" },
        { separator: true },
        { label: "Format Cells...", icon: "format", dialog: "formatCells" },
        { label: "Define Name...", icon: "field", dialog: "defineName" },
        { label: "Link", icon: "link", dialog: "link" },
      );
    }
    onContextMenu(e.clientX, e.clientY, items);
  };

  /* ---------- render ---------- */

  const tabColorMenu = (name: string): MenuItem[] => [
    { label: "Insert Sheet", icon: "insertCells", command: "sheet.add" },
    { label: "Delete", icon: "deleteCells", command: "sheet.delete" },
    { label: "Rename", icon: "textbox", command: "__rename" },
    { label: "Move or Copy...", icon: "copy", dialog: "moveCopySheet" },
    { label: "Duplicate", icon: "copy", command: "sheet.duplicate" },
    { separator: true },
    ...Object.keys(TAB_COLORS).map((n) => ({ label: `Tab Color: ${n}`, command: "sheet.tabColor", value: n })),
    { label: "Tab Color: No Color", command: "sheet.tabColor", value: "No Color" },
    { separator: true },
    { label: "Hide", command: "sheet.hide" },
    { label: "Protect Sheet...", icon: "protect", dialog: "protectSheet" },
  ].map((m) => (m.command === "__rename" ? { ...m, command: undefined, dialog: `__rename:${name}` } : m));

  const actP = parseRef(act);
  const formulaText = edit
    ? edit.text
    : sel.startsWith("chart:") || sel.startsWith("obj:")
      ? ""
      : r1c1 && sheet.cells[act]?.f && actP
        ? formulaToR1C1(sheet.cells[act].f!, actP.r, actP.c)
        : cellRaw(sheet, act);
  const nameBoxText = sel.startsWith("chart:") ? `Chart ${sel.slice(7)}` : sel.startsWith("obj:") ? `Graphic ${sel.slice(5)}` : r1c1 && actP ? `R${actP.r}C${actP.c}` : sel.includes(":") ? act : sel;

  const cells: React.ReactNode[] = [];
  for (let r = 1; r <= nRows; r++) {
    if (hiddenRows.has(r)) continue;
    for (let c = 1; c <= nCols; c++) {
      if (hiddenCols.has(numToCol(c))) continue;
      const merge = coveredBy(c, r);
      if (merge && (merge.c1 !== c || merge.r1 !== r)) continue;
      const ref = refOf(c, r);
      const cell = sheet.cells[ref];
      const virtual = pivotCells[ref];
      const fmt: CellFormat = { ...(virtual?.fmt ?? {}), ...(cell?.fmt ?? {}) };
      let value: Val = virtual ? virtual.v : spill.out[ref] !== undefined ? spill.out[ref] : cell ? (cell.f ? (spill.blocked.has(ref) ? "#SPILL!" : evaluateCell(doc, sheet, ref)) : cell.v ?? null) : null;
      const geo = typeof value === "string" && isLinkedGeography(doc, sheet, ref);
      // Center Across Selection: the text in the first cell is centered over the whole range.
      const cas = typeof value === "string" || typeof value === "number" ? casRanges.find((rc) => r >= rc.r1 && r <= rc.r2 && c >= rc.c1 && c <= rc.c2) : undefined;
      const pivotFilterField = sheet.pivot && virtual && c === parseRef(sheet.pivot.at ?? "A3")!.c + 1 && sheet.pivot.filters.includes(String(pivotCells[refOf(c - 1, r)]?.v ?? "")) ? String(pivotCells[refOf(c - 1, r)]?.v) : null;
      let text = sheet.showFormulas && cell?.f ? cell.f : formatValue(value as Val, fmt);
      const isNum = typeof value === "number";
      const isErr = typeof value === "string" && value.startsWith("#");
      // Header/banding for tables
      let bg = fmt.fill;
      let color = fmt.color;
      let bold = fmt.bold;
      if (tbl && c >= tbl.c1 && c <= tbl.c2 && r >= tbl.r1 && r <= tbl.r2) {
        if (r === tbl.r1) { bg = bg ?? tblColor; color = color ?? (tblColor === "#d9d9d9" ? "#000" : "#fff"); bold = true; }
        else if (!doc.flags?.["table.bandedRows"] && (r - tbl.r1) % 2 === 0) bg = bg ?? `${tblColor}26`;
      }
      if (tbl && sheet.table?.totalRow && r === tbl.r2 + 1 && c >= tbl.c1 && c <= tbl.c2) {
        bold = true;
        bg = `${tblColor}33`;
        if (c === tbl.c1) text = "Total";
        else if (c === tbl.c2) {
          let s = 0;
          // The total row uses SUBTOTAL(109, …), so rows hidden by a filter are left out.
          for (let rr = tbl.r1 + 1; rr <= tbl.r2; rr++) { if (filtered.has(rr)) continue; const v = evaluateCell(doc, sheet, refOf(c, rr)); if (typeof v === "number") s += v; }
          value = s;
          text = formatValue(s, sheet.cells[refOf(c, tbl.r2)]?.fmt);
        }
      }
      const cfs = cf[ref];
      const align = fmt.align ?? (isNum ? "right" : isErr || typeof value === "boolean" ? "center" : "left");
      const w = merge ? colX[merge.c2 + 1] - colX[c] : colW(c);
      const h = merge ? rowY[merge.r2 + 1] - rowY[r] : rowH(r);
      const nextEmpty = !sheet.cells[refOf(c + 1, r)]?.v && !sheet.cells[refOf(c + 1, r)]?.f && !pivotCells[refOf(c + 1, r)];
      const frozenRow = freeze && r < freeze.r;
      const frozenCol = freeze && c < freeze.c;
      const isEditing = edit?.ref === ref && !edit.bar;
      const hasFilter = filterRect && r === filterRect.r1 && c >= filterRect.c1 && c <= filterRect.c2;
      const validation = Object.entries(sheet.validation ?? {}).find(([rng]) => { const rc = parseRange(rng); return rc && c >= rc.c1 && c <= rc.c2 && r >= rc.r1 && r <= rc.r2; })?.[1];
      const spark = sheet.sparklines?.find((s) => s.at === ref);
      const border = fmt.border;
      cells.push(
        <div
          key={ref}
          data-cell={ref}
          onMouseDown={(e) => cellDown(e, ref)}
          onMouseEnter={() => cellEnter(ref)}
          onDoubleClick={() => { onSelect({ selection: ref }); setEdit({ ref, text: cellRaw(sheet, ref) }); }}
          onContextMenu={(e) => cellMenu(e, ref, "cell")}
          title={cell?.note ?? cell?.comment ?? (validation?.message ?? undefined)}
          className="absolute select-none"
          style={{
            left: colX[c],
            top: rowY[r],
            width: w,
            height: h,
            background: cfs?.background ?? bg ?? (sheet.gridlines === false ? "#fff" : undefined),
            backgroundImage: cfs?.backgroundImage,
            borderRight: sheet.gridlines === false ? undefined : "1px solid #e1e1e1",
            borderBottom: border === "thickBottom" ? "2px solid #000" : border === "bottom" || border === "all" ? "1px solid #000" : sheet.gridlines === false ? undefined : "1px solid #e1e1e1",
            borderTop: border === "top" || border === "all" ? "1px solid #000" : undefined,
            borderLeft: border === "all" ? "1px solid #000" : undefined,
            outline: border === "outside" ? "1px solid #000" : undefined,
            outlineOffset: -1,
            color: cfs?.color ?? color ?? (isErr ? "#c00000" : "#000"),
            fontWeight: bold ? 700 : 400,
            fontStyle: fmt.italic ? "italic" : undefined,
            textDecoration: fmt.underline ? "underline" : undefined,
            fontFamily: fmt.font ? `'${fmt.font}', 'Aptos Narrow', Calibri, Arial, sans-serif` : "'Aptos Narrow', Calibri, Arial, sans-serif",
            fontSize: (fmt.size ?? 11) * 1.33 * z,
            textAlign: align,
            paddingLeft: 3 + (fmt.indent ?? 0) * 10,
            paddingRight: 3,
            lineHeight: `${h}px`,
            whiteSpace: fmt.wrap ? "normal" : "nowrap",
            overflow: cas ? "visible" : fmt.wrap || !nextEmpty || align !== "left" ? "hidden" : "visible",
            textOverflow: "clip",
            display: fmt.wrap ? "flex" : undefined,
            alignItems: fmt.wrap ? (fmt.valign === "top" ? "flex-start" : fmt.valign === "middle" ? "center" : "flex-end") : undefined,
            zIndex: frozenRow || frozenCol ? 3 : cas ? 2 : overflowZ(nextEmpty, align),
            position: frozenRow || frozenCol ? "sticky" : "absolute",
            marginTop: frozenRow ? undefined : undefined,
          }}
        >
          {isEditing ? (
            <CellEditor
              value={edit!.text}
              onChange={(t) => setEdit({ ref, text: t })}
              onCommit={(m) => commitEdit(m)}
              onCancel={() => { setEdit(null); focus(); }}
            />
          ) : (
            <>
              {cfs?.icon &&
                (["✔", "!", "✖"].includes(cfs.icon) ? (
                  <span className="mr-1 inline-flex h-3 w-3 items-center justify-center rounded-full align-middle text-[8px] font-bold text-white" style={{ background: cfs.iconColor }}>{cfs.icon}</span>
                ) : (
                  <span className="mr-1 text-[10px]" style={{ color: cfs.iconColor }}>{cfs.icon}</span>
                ))}
              {geo && <span className="mr-1 text-[10px]" title="Geography data type">🗺</span>}
              {spark ? (
                <Sparkline doc={doc} sheet={sheet} range={spark.range} type={spark.type} h={h} />
              ) : cas ? (
                <span className="pointer-events-none absolute top-0 text-center" style={{ left: colX[cas.c1] - colX[c], width: colX[cas.c2 + 1] - colX[cas.c1] }}>{text}</span>
              ) : (
                text
              )}
            </>
          )}
          {(cell?.comment || cell?.note) && <span className="absolute right-0 top-0 h-0 w-0 border-l-[6px] border-t-[6px] border-l-transparent" style={{ borderTopColor: cell?.comment ? "#7030a0" : "#c00000" }} />}
          {hasFilter && (
            <button
              type="button"
              aria-label={`Filter ${numToCol(c)}`}
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); const rr = (e.currentTarget as HTMLElement).getBoundingClientRect(); setFilterMenu({ col: numToCol(c), x: rr.left, y: rr.bottom }); }}
              className="absolute right-0.5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center border border-gray-400 bg-white text-[9px] text-gray-700"
            >
              {sheet.filterValues?.[numToCol(c)] ? "⏷" : "▾"}
            </button>
          )}
          {pivotFilterField && (
            <button
              type="button"
              aria-label={`Filter ${pivotFilterField}`}
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); const rr = (e.currentTarget as HTMLElement).getBoundingClientRect(); setPivotMenu({ field: pivotFilterField, x: rr.left, y: rr.bottom }); }}
              className="absolute right-0.5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center border border-gray-400 bg-white text-[9px] text-gray-700"
            >
              {doc.flags?.[`pvf:${sheet.name}:${pivotFilterField}`] ? "⏷" : "▾"}
            </button>
          )}
          {validation?.list && ref === act && !isEditing && (
            <button
              type="button"
              aria-label="Show list"
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); const rr = (e.currentTarget as HTMLElement).getBoundingClientRect(); setListMenu({ ref, x: rr.left - 100, y: rr.bottom, items: validation.list! }); }}
              className="absolute -right-5 top-0 flex h-full w-4 items-center justify-center border border-gray-400 bg-white text-[9px]"
            >
              ▾
            </button>
          )}
        </div>,
      );
    }
  }

  // Frozen panes use sticky positioning on a wrapper; positions above are absolute within the grid.
  function overflowZ(nextEmpty: boolean, align: string) {
    return nextEmpty && align === "left" ? 1 : 0;
  }

  const gridW = colX[nCols + 1];
  const gridH = rowY[nRows + 1];
  const selBox = selR && !sel.startsWith("chart:") ? { left: colX[selR.c1], top: rowY[selR.r1], width: colX[Math.min(selR.c2, nCols) + 1] - colX[selR.c1], height: rowY[Math.min(selR.r2, nRows) + 1] - rowY[selR.r1] } : null;
  const ap = parseRef(act);
  const actMerge = ap ? coveredBy(ap.c, ap.r) : undefined;
  const actBox = ap ? { left: colX[ap.c], top: rowY[ap.r], width: actMerge ? colX[actMerge.c2 + 1] - colX[ap.c] : colW(ap.c), height: actMerge ? rowY[actMerge.r2 + 1] - rowY[ap.r] : rowH(ap.r) } : null;
  const stats = (() => {
    if (!selR || (selR.c1 === selR.c2 && selR.r1 === selR.r2)) return null;
    const nums: number[] = [];
    let count = 0;
    for (let r = selR.r1; r <= Math.min(selR.r2, selR.r1 + 400); r++)
      for (let c = selR.c1; c <= Math.min(selR.c2, selR.c1 + 40); c++) {
        const v = evaluateCell(doc, sheet, refOf(c, r));
        if (v !== null && v !== "") count++;
        if (typeof v === "number") nums.push(v);
      }
    if (count < 2) return null;
    return { count, sum: nums.reduce((a, b) => a + b, 0), avg: nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null, n: nums.length };
  })();
  void stats;

  const pageLayout = sheet.view === "pageLayout";
  const pane = doc.pane && !doc.pane.startsWith("Find:") ? doc.pane : null;
  const findTerm = doc.pane?.startsWith("Find:") ? doc.pane.slice(5) : null;

  return (
    <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="flex h-full flex-col bg-white outline-none">
      {!doc.flags?.hideFormulaBar && (
        <div className="flex h-7 shrink-0 items-center gap-1 border-b border-gray-300 bg-white px-1 text-[12px]">
          <input
            ref={nameBoxRef}
            aria-label="Name Box"
            value={nameBox ?? nameBoxText}
            onChange={(e) => setNameBox(e.target.value)}
            onFocus={(e) => { setNameBox(e.target.value); e.target.select(); }}
            onBlur={() => setNameBox(null)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter" && nameBox) {
                const t = nameBox.trim().toUpperCase();
                const rc1 = /^R(\d+)C(\d+)$/.exec(t);
                if (rc1) onSelect({ selection: refOf(Number(rc1[2]), Number(rc1[1])) });
                else if (/^[A-Z]{1,3}\d+(:[A-Z]{1,3}\d+)?$/.test(t)) onSelect({ selection: t });
                else if (doc.names?.[nameBox.trim()]) onSelect({ selection: doc.names[nameBox.trim()].replace(/^.*!/, "").replace(/\$/g, "") });
                setNameBox(null);
                focus();
              }
              if (e.key === "Escape") { setNameBox(null); focus(); }
            }}
            className="h-5 w-24 border border-gray-300 px-1"
          />
          <span className="px-1 text-gray-400">⋮</span>
          <button type="button" aria-label="Cancel" disabled={!edit} onClick={() => setEdit(null)} className="px-1 text-gray-500 disabled:opacity-30">✕</button>
          <button type="button" aria-label="Enter" disabled={!edit} onClick={() => commitEdit("none")} className="px-1 text-gray-500 disabled:opacity-30">✓</button>
          <button type="button" aria-label="Insert Function" onClick={() => openDialog("insertFunction")} className="px-1 italic text-gray-600">fx</button>
          <input
            aria-label="Formula Bar"
            value={formulaText}
            onFocus={() => { if (!edit && !sel.startsWith("chart:") && !sel.startsWith("obj:")) setEdit({ ref: act, text: cellRaw(sheet, act), bar: true }); }}
            onChange={(e) => setEdit({ ref: act, text: e.target.value, bar: true })}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "F4") { e.preventDefault(); const el = e.currentTarget; const out = cycleRef(el.value, el.selectionStart ?? el.value.length); setEdit({ ref: act, text: out.text, bar: true }); setTimeout(() => el.setSelectionRange(out.caret, out.caret), 0); }
              if (e.key === "Enter") { e.preventDefault(); commitEdit("down"); (e.target as HTMLInputElement).blur(); }
              if (e.key === "Escape") { setEdit(null); (e.target as HTMLInputElement).blur(); }
            }}
            className="h-5 flex-1 border border-gray-300 px-1 font-mono text-[12px]"
          />
        </div>
      )}
      {message && (
        <div role="alert" className="flex items-start gap-2 border-b border-amber-300 bg-amber-50 px-3 py-1.5 text-[12px] text-amber-900">
          <span className="flex-1">{message}</span>
          <button type="button" onClick={() => setMessage(null)} aria-label="Dismiss">✕</button>
        </div>
      )}
      {markedFinal && (
        <div className="flex items-center gap-3 border-b border-amber-300 bg-[#fff4ce] px-3 py-1.5 text-[12px] text-gray-800">
          <b>MARKED AS FINAL</b>
          <span className="flex-1">An author has marked this workbook as final to discourage editing.</span>
          <button type="button" onClick={() => onCommit({ kind: "command", id: "excel.editAnyway" })} className="border border-gray-400 bg-white px-2 py-0.5 hover:bg-gray-50">Edit Anyway</button>
        </div>
      )}
      {sheetView && (
        <div className="flex items-center gap-2 border-b border-gray-700 bg-[#3b3b3b] px-3 py-1 text-[12px] text-white">
          <span aria-hidden="true">👁</span>
          <span className="flex-1">Sheet View: {sheetView}. Sorting and filtering here change only your view, not what co-authors see.</span>
          <button type="button" onClick={() => onCommit({ kind: "command", id: "view.sheetViewExit" })} className="border border-white/50 px-2 py-0.5 hover:bg-white/10">Exit</button>
        </div>
      )}
      <div className="flex min-h-0 flex-1">
        <div ref={gridRef} className={`relative min-w-0 flex-1 overflow-auto ${pageLayout ? "bg-[#e7e7e7] p-6" : ""}`}>
          {pageLayout && (
            <div className="mx-auto mb-1 bg-white px-10 pt-4 text-center text-[12px] text-gray-500" style={{ width: Math.max(gridW, 600) }}>
              <button
                type="button"
                onClick={() => onSelect({ selection: "header" })}
                onDoubleClick={() => setEdit({ ref: "header", text: sheet.header ?? "", bar: true })}
                className={`w-full border border-dashed py-2 ${sel === "header" ? "border-[#217346] bg-[#e9f5ee]" : "border-transparent hover:border-gray-300"}`}
              >
                {edit?.ref === "header" ? (
                  <CellEditor value={edit.text} onChange={(t) => setEdit({ ref: "header", text: t, bar: true })} onCommit={() => { const e = editRef.current; setEdit(null); if (e) onCommit({ kind: "type", target: "header", value: e.text }); }} onCancel={() => setEdit(null)} />
                ) : (
                  sheet.header || "Add header"
                )}
              </button>
            </div>
          )}
          <div className={`relative ${pageLayout ? "mx-auto bg-white shadow" : ""}`} style={{ width: gridW, height: gridH }}>
            {/* column headers */}
            <div className="sticky top-0 z-[6] h-0">
              {outW > 0 && (
                <div className="absolute left-0 top-0 flex items-center justify-center gap-px border-b border-r border-gray-300 bg-[#f3f3f3]" style={{ width: outW, height: HEAD_H }}>
                  {Array.from({ length: doc.flags?.[`outline:${sheet.name}`] ? 3 : 2 }, (_, i) => i + 1).map((lv) => (
                    <button key={lv} type="button" aria-label={`Outline level ${lv}`} title={`Level ${lv}`} onClick={() => onCommit({ kind: "command", id: "outline.level", value: String(lv) })} className="h-3.5 w-2.5 border border-gray-400 bg-white text-[8px] leading-none text-gray-700 hover:bg-[#e5f1fb]">
                      {lv}
                    </button>
                  ))}
                </div>
              )}
              <div className={`absolute top-0 border-b border-r border-gray-300 ${sheetView ? "bg-[#3b3b3b]" : "bg-[#f3f3f3]"}`} style={{ left: outW, width: HEAD_W, height: HEAD_H }}>
                <button type="button" aria-label="Select All" onClick={() => onSelect({ selection: `A1:${numToCol(nCols)}${nRows}` })} className="h-full w-full" />
              </div>
              {sheet.headings !== false &&
                Array.from({ length: nCols }, (_, i) => i + 1).map((c) =>
                  hiddenCols.has(numToCol(c)) ? null : (
                    <div
                      key={c}
                      onMouseDown={(e) => colDown(e, c)}
                      onMouseEnter={() => drag.current?.mode === "col" && onSelect({ selection: `${numToCol(Math.min(colToNum(drag.current.anchor.replace(/\d+/, "")), c))}:${numToCol(Math.max(colToNum(drag.current.anchor.replace(/\d+/, "")), c))}` })}
                      onContextMenu={(e) => cellMenu(e, `${numToCol(c)}1`, "col")}
                      className={`absolute top-0 flex cursor-s-resize select-none items-center justify-center border-b border-r border-gray-300 text-[11px] ${selR && c >= selR.c1 && c <= selR.c2 ? "bg-[#d3e7dc] font-semibold text-[#217346]" : sheetView ? "bg-[#3b3b3b] text-gray-100" : "bg-[#f3f3f3] text-gray-600"}`}
                      style={{ left: colX[c], width: colW(c), height: HEAD_H }}
                    >
                      {r1c1 ? c : numToCol(c)}
                    </div>
                  ),
                )}
            </div>
            {/* row headers */}
            <div className="sticky left-0 z-[5] w-0">
              {sheet.headings !== false &&
                Array.from({ length: nRows }, (_, i) => i + 1).map((r) =>
                  hiddenRows.has(r) ? null : (
                    <div
                      key={r}
                      onMouseDown={(e) => rowDown(e, r)}
                      onMouseEnter={() => drag.current?.mode === "row" && onSelect({ selection: `${Math.min(Number(drag.current.anchor.slice(1)), r)}:${Math.max(Number(drag.current.anchor.slice(1)), r)}` })}
                      onContextMenu={(e) => cellMenu(e, `A${r}`, "row")}
                      className={`absolute flex cursor-e-resize select-none items-center justify-center border-b border-r border-gray-300 text-[11px] ${selR && r >= selR.r1 && r <= selR.r2 ? "bg-[#d3e7dc] font-semibold text-[#217346]" : sheetView ? "bg-[#3b3b3b] text-gray-100" : "bg-[#f3f3f3] text-gray-600"}`}
                      style={{ left: outW, top: rowY[r], width: HEAD_W, height: rowH(r) }}
                    >
                      {r}
                    </div>
                  ),
                )}
            </div>
            {/* outline bar: one bracket and +/- button per group */}
            {outW > 0 && (
              <div className="sticky left-0 z-[5] w-0">
                <div className="absolute left-0 bg-[#f3f3f3]" style={{ top: HEAD_H, width: outW, height: gridH - HEAD_H }} />
                {(sheet.groups ?? []).map((g) => {
                  const [a, b] = g.rows.split(":").map(Number);
                  const top = rowY[a] ?? HEAD_H;
                  const bottom = rowY[b + 1] ?? top;
                  const btnTop = rowY[Math.min(b + 1, nRows)] ?? bottom;
                  return (
                    <div key={g.rows}>
                      {!g.collapsed && <div className="pointer-events-none absolute border-l border-t border-gray-500" style={{ left: 14, top: top + 4, width: 5, height: Math.max(0, bottom - top - 4) }} />}
                      <button
                        type="button"
                        aria-label={g.collapsed ? `Show detail rows ${g.rows}` : `Hide detail rows ${g.rows}`}
                        onClick={() => onCommit({ kind: "command", id: "outline.toggle", value: g.rows })}
                        className="absolute flex h-3.5 w-3.5 items-center justify-center border border-gray-500 bg-white text-[10px] leading-none text-gray-700 hover:bg-[#e5f1fb]"
                        style={{ left: 8, top: btnTop + 4 }}
                      >
                        {g.collapsed ? "+" : "−"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {cells}
            {/* split bars */}
            {(() => {
              const sp = sheet.split ? parseRef(String(doc.flags?.[`split:${sheet.name}`] || "")) : null;
              if (!sp) return null;
              const midR = sp.r === 1 && sp.c === 1 ? Math.ceil(nRows / 2) : sp.r;
              const midC = sp.r === 1 && sp.c === 1 ? Math.ceil(nCols / 2) : sp.c;
              return (
                <>
                  {midR > 1 && <div className="pointer-events-none absolute z-[4] h-[4px] bg-[#c6c6c6]" style={{ left: 0, top: rowY[midR] - 2, width: gridW }} />}
                  {midC > 1 && <div className="pointer-events-none absolute z-[4] w-[4px] bg-[#c6c6c6]" style={{ top: 0, left: colX[midC] - 2, height: gridH }} />}
                </>
              );
            })()}
            {/* spill range border */}
            {spill.ranges[act] && (
              <div className="pointer-events-none absolute z-[6] border border-[#4472C4]" style={{ left: colX[spill.ranges[act].c1], top: rowY[spill.ranges[act].r1], width: colX[spill.ranges[act].c2 + 1] - colX[spill.ranges[act].c1], height: rowY[spill.ranges[act].r2 + 1] - rowY[spill.ranges[act].r1] }} />
            )}
            {/* notes shown with Review › Notes › Show All Notes */}
            {doc.flags?.showNotes &&
              Object.entries(sheet.cells)
                .filter(([, x]) => x.note)
                .map(([ref, x]) => {
                  const p = parseRef(ref)!;
                  return (
                    <div key={`note-${ref}`} className="pointer-events-none absolute z-[9] w-40 border border-gray-500 bg-[#ffffe1] px-1.5 py-1 text-[11px] leading-snug text-gray-800 shadow" style={{ left: (colX[p.c + 1] ?? 0) + 8, top: rowY[p.r] }}>
                      {x.note}
                    </div>
                  );
                })}
            {/* freeze lines */}
            {freeze && freeze.r > 1 && <div className="pointer-events-none absolute z-[4] h-px bg-gray-500" style={{ left: 0, top: rowY[freeze.r], width: gridW }} />}
            {freeze && freeze.c > 1 && <div className="pointer-events-none absolute z-[4] w-px bg-gray-500" style={{ top: 0, left: colX[freeze.c], height: gridH }} />}
            {/* print area / page break preview */}
            {(sheet.view === "pageBreak" || sheet.printArea) && used && (
              <div className="pointer-events-none absolute z-[4] border-2 border-dashed border-[#2b579a]" style={{ left: colX[(sheet.printArea ? parseRange(sheet.printArea)! : used).c1], top: rowY[(sheet.printArea ? parseRange(sheet.printArea)! : used).r1], width: colX[(sheet.printArea ? parseRange(sheet.printArea)! : used).c2 + 1] - colX[(sheet.printArea ? parseRange(sheet.printArea)! : used).c1], height: rowY[(sheet.printArea ? parseRange(sheet.printArea)! : used).r2 + 1] - rowY[(sheet.printArea ? parseRange(sheet.printArea)! : used).r1] }}>
                {sheet.view === "pageBreak" && <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-300">Page 1</span>}
              </div>
            )}
            {/* selection */}
            {selBox && (
              <div className="pointer-events-none absolute z-[7] border-2" style={{ ...selBox, borderColor: GREEN, background: selR && (selR.c1 !== selR.c2 || selR.r1 !== selR.r2) ? "rgba(33,115,70,.08)" : undefined }}>
                <span
                  className="pointer-events-auto absolute -bottom-[5px] -right-[5px] h-[8px] w-[8px] cursor-crosshair border border-white"
                  style={{ background: GREEN }}
                  aria-label="Fill handle"
                  onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); if (selR) drag.current = { mode: "fill", anchor: act, src: selR }; }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    if (!selR) return;
                    // Fill down as far as the column to the left has data.
                    const leftCol = selR.c1 > 1 ? selR.c1 - 1 : selR.c2 + 1;
                    let r = selR.r2;
                    while (sheet.cells[refOf(leftCol, r + 1)]?.v !== undefined || sheet.cells[refOf(leftCol, r + 1)]?.f) r++;
                    if (r > selR.r2) onCommit({ kind: "command", id: "excel.fill", value: rectToRange({ ...selR, r2: r }) });
                  }}
                />
              </div>
            )}
            {actBox && selR && (selR.c1 !== selR.c2 || selR.r1 !== selR.r2) && <div className="pointer-events-none absolute z-[7] bg-white/60" style={{ ...actBox, mixBlendMode: "lighten" }} />}
            {fillPreview && <div className="pointer-events-none absolute z-[8] border border-dashed border-gray-700" style={{ left: colX[fillPreview.c1], top: rowY[fillPreview.r1], width: colX[fillPreview.c2 + 1] - colX[fillPreview.c1], height: rowY[fillPreview.r2 + 1] - rowY[fillPreview.r1] }} />}
            {/* charts */}
            {(sheet.charts ?? []).map((ch) => {
              const a = parseRef(ch.at ?? "F2")!;
              return (
                <div key={ch.id} className="absolute z-20" style={{ left: colX[Math.min(a.c, nCols)] ?? 0, top: rowY[Math.min(a.r, nRows)] ?? 0 }}>
                  <ChartView
                    doc={doc}
                    sheet={sheet}
                    ch={ch}
                    selected={sel === `chart:${ch.id}`}
                    onSelect={() => onSelect({ selection: `chart:${ch.id}` })}
                    onTitleEdit={() => setEdit({ ref: `chart:${ch.id}.title`, text: ch.title ?? "", bar: true })}
                    pivotCells={pivotCells}
                  />
                  {edit?.ref === `chart:${ch.id}.title` && (
                    <div className="absolute inset-x-8 top-1 z-30">
                      <CellEditor
                        value={edit.text}
                        onChange={(t) => setEdit({ ref: `chart:${ch.id}.title`, text: t, bar: true })}
                        onCommit={() => { const e = editRef.current; setEdit(null); if (e) onCommit({ kind: "type", target: `chart:${ch.id}.title`, value: e.text }); }}
                        onCancel={() => setEdit(null)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            {(sheet.objects ?? []).map((o) => {
              const a = parseRef(o.at) ?? { c: 6, r: 2 };
              if (o.kind === "icon") {
                const fill = doc.flags?.[`objfill:${o.id}`];
                return (
                  <div
                    key={o.id}
                    role="img"
                    aria-label={String(doc.flags?.[`alt:${o.id}`] || o.label)}
                    title={String(doc.flags?.[`alt:${o.id}`] || o.label)}
                    onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: `obj:${o.id}` }); }}
                    className={`absolute z-20 flex h-10 w-10 items-center justify-center text-[28px] leading-none ${sel === `obj:${o.id}` ? "outline outline-1 outline-gray-500" : ""}`}
                    style={{ left: colX[a.c] + 2, top: rowY[a.r], color: fill ? String(fill) : "#000" }}
                  >
                    {o.glyph ?? "★"}
                  </div>
                );
              }
              return (
                <div
                  key={o.id}
                  onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: `obj:${o.id}` }); }}
                  className={`absolute z-20 flex h-28 w-40 flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-100 text-[11px] text-gray-600 shadow ${sel === `obj:${o.id}` ? "outline outline-2 outline-gray-500" : ""}`}
                  style={{ left: colX[a.c], top: rowY[a.r] }}
                >
                  <span className="text-2xl">{o.glyph ?? "▭"}</span>
                  {o.text ?? o.label}
                </div>
              );
            })}
            <Slicers doc={doc} sheet={sheet} left={colX[Math.min(nCols, (sheet.pivot ? parseRef(sheet.pivot.at ?? "A3")!.c : 1) + 4)] ?? 400} top={rowY[3] ?? 60} onCommit={onCommit} />
            {sheet.pivot && Object.keys(pivotCells).length === 0 && (
              <div className="absolute z-[2] flex flex-col items-center justify-center border border-gray-400 bg-[#f7fbff] p-3 text-center text-[11px] text-gray-600" style={{ left: colX[parseRef(sheet.pivot.at ?? "A3")!.c], top: rowY[parseRef(sheet.pivot.at ?? "A3")!.r], width: 220, height: 120 }}>
                <b className="mb-1 text-gray-800">PivotTable1</b>
                To build a report, choose fields from the PivotTable Field List
              </div>
            )}
          </div>
        </div>

        {sheet.pivot && <PivotPane doc={doc} sheet={sheet} onCommit={onCommit} />}
        {((pane && !pane.startsWith("Excel Options")) || findTerm !== null) && <ExcelPane doc={doc} sheet={sheet} pane={pane} findTerm={findTerm} act={act} onCommit={onCommit} onSelect={(r) => onSelect({ selection: r })} />}
      </div>

      {/* sheet tabs */}
      <div className="flex h-7 shrink-0 items-stretch border-t border-gray-300 bg-[#f3f3f3] text-[12px]">
        <span className="flex items-center gap-2 px-2 text-gray-400" aria-hidden="true">◀ ▶</span>
        {doc.sheets.map((s, i) => {
          const active = s.name === sheet.name;
          return (
            <div
              key={s.name}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/sheet", s.name)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { const name = e.dataTransfer.getData("text/sheet"); if (name && name !== s.name) onCommit({ kind: "command", id: "sheet.move", value: `${name}@${i + 1}` }); }}
              onClick={() => { if (!active) onSelect({ sheet: s.name, selection: "A1" }); }}
              onDoubleClick={() => setRenaming({ name: s.name, text: s.name })}
              onContextMenu={(e) => {
                e.preventDefault();
                if (!active) onSelect({ sheet: s.name, selection: "A1" });
                const items = tabColorMenu(s.name);
                onContextMenu(e.clientX, e.clientY - 280, items.map((m) => (m.dialog?.startsWith("__rename:") ? { ...m, dialog: undefined, command: undefined } : m)));
                // Rename from the menu is handled by double-click; the menu item starts it too:
                setTimeout(() => {
                  const btns = Array.from(document.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
                  const rn = btns.find((b) => b.textContent?.trim() === "Rename");
                  rn?.addEventListener("click", () => setRenaming({ name: s.name, text: s.name }), { once: true });
                }, 0);
              }}
              role="tab"
              aria-selected={active}
              className={`relative flex cursor-pointer select-none items-center px-4 ${active ? "bg-white font-semibold text-[#217346] shadow-[inset_0_-2px_0_#217346]" : "text-gray-700 hover:bg-white/70"}`}
              style={s.tabColor ? { boxShadow: `inset 0 -3px 0 ${s.tabColor}` } : undefined}
            >
              {renaming?.name === s.name ? (
                <input
                  autoFocus
                  aria-label="Sheet name"
                  value={renaming.text}
                  onChange={(e) => setRenaming({ name: s.name, text: e.target.value })}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") { const r = renaming; setRenaming(null); if (r.text !== r.name) onCommit({ kind: "type", target: `sheet:${r.name}`, value: r.text }); }
                    if (e.key === "Escape") setRenaming(null);
                  }}
                  onBlur={() => { const r = renaming; setRenaming(null); if (r && r.text !== r.name) onCommit({ kind: "type", target: `sheet:${r.name}`, value: r.text }); }}
                  className="w-24 border border-[#217346] px-1"
                />
              ) : (
                s.name
              )}
            </div>
          );
        })}
        <button type="button" aria-label="New sheet" title="New sheet" onClick={() => onCommit({ kind: "command", id: "sheet.add" })} className="px-3 text-lg leading-none text-gray-600 hover:bg-white">
          ⊕
        </button>
      </div>

      {filterMenu && (
        <FilterMenu
          doc={doc}
          sheet={sheet}
          col={filterMenu.col}
          anchor={{ x: filterMenu.x, y: filterMenu.y }}
          onClose={() => setFilterMenu(null)}
          onCommit={(c) => { setFilterMenu(null); onCommit(c); }}
        />
      )}
      {pivotMenu && (
        <PivotFilterMenu doc={doc} sheet={sheet} field={pivotMenu.field} anchor={{ x: pivotMenu.x, y: pivotMenu.y }} onClose={() => setPivotMenu(null)} onCommit={(c) => { setPivotMenu(null); onCommit(c); }} />
      )}
      {pane?.startsWith("Excel Options") && <OptionsDialog doc={doc} start={pane.split("|")[1] ?? "General"} onCommit={onCommit} />}
      {listMenu && (
        <Popover
          anchor={{ x: listMenu.x, y: listMenu.y }}
          onClose={() => setListMenu(null)}
          items={listMenu.items.map((it) => ({ key: it, label: it, onPick: () => onCommit({ kind: "type", target: listMenu.ref, value: it }) }))}
        />
      )}
    </div>
  );
}

function Sparkline({ doc, sheet, range, type, h }: { doc: ExcelBook; sheet: ExcelSheet; range: string; type: string; h: number }) {
  const rc = parseRange(range);
  if (!rc) return null;
  const vals: number[] = [];
  for (let r = rc.r1; r <= rc.r2; r++) for (let c = rc.c1; c <= rc.c2; c++) { const v = evaluateCell(doc, sheet, refOf(c, r)); vals.push(typeof v === "number" ? v : 0); }
  const max = Math.max(...vals, 1), min = Math.min(...vals, 0);
  const W = 60, H = Math.max(10, h - 6);
  return (
    <svg width={W} height={H} className="inline-block align-middle">
      {type === "Line" ? (
        <polyline fill="none" stroke="#4472C4" strokeWidth="1.5" points={vals.map((v, i) => `${(i / Math.max(1, vals.length - 1)) * W},${H - ((v - min) / (max - min || 1)) * H}`).join(" ")} />
      ) : (
        vals.map((v, i) => <rect key={i} x={(i * W) / vals.length} width={W / vals.length - 1} y={H - ((v - min) / (max - min || 1)) * H} height={((v - min) / (max - min || 1)) * H} fill="#4472C4" />)
      )}
    </svg>
  );
}

/** F4 while editing a formula: cycle the reference at (or just before) the cursor through $ styles. */
function cycleRef(text: string, caret: number): { text: string; caret: number } {
  const re = /(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9(])/g;
  let hit: RegExpExecArray | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const prev = m.index > 0 ? text[m.index - 1] : "";
    if (/[A-Za-z0-9_]/.test(prev)) continue;
    if (m.index <= caret) hit = m;
    if (m.index <= caret && caret <= m.index + m[0].length) break;
  }
  if (!hit) return { text, caret };
  const [all, d1, col, d2, row] = hit;
  const next = !d1 && !d2 ? `$${col}$${row}` : d1 && d2 ? `${col}$${row}` : !d1 && d2 ? `$${col}${row}` : `${col}${row}`;
  const out = text.slice(0, hit.index) + next + text.slice(hit.index + all.length);
  return { text: out, caret: hit.index + next.length };
}

function CellEditor({ value, onChange, onCommit, onCancel }: { value: string; onChange: (v: string) => void; onCommit: (move: "down" | "right" | "none") => void; onCancel: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);
  return (
    <input
      ref={ref}
      aria-label="Cell editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") { e.preventDefault(); onCommit("down"); }
        if (e.key === "Tab") { e.preventDefault(); onCommit("right"); }
        if (e.key === "Escape") onCancel();
        if (e.key === "F4") {
          // F4 cycles the reference at the cursor: A1 → $A$1 → A$1 → $A1 → A1.
          e.preventDefault();
          const el = e.currentTarget;
          const out = cycleRef(el.value, el.selectionStart ?? el.value.length);
          onChange(out.text);
          setTimeout(() => el.setSelectionRange(out.caret, out.caret), 0);
        }
      }}
      className="h-full w-full min-w-[60px] border-0 bg-white px-0.5 outline outline-2 outline-[#217346]"
      style={{ font: "inherit", textAlign: "left" }}
    />
  );
}

const TEXT_OPS: [string, string][] = [["Equals...", "="], ["Does Not Equal...", "<>"], ["Begins With...", "begins "], ["Ends With...", "ends "], ["Contains...", "contains "], ["Does Not Contain...", "notcontains "]];
const NUMBER_OPS: [string, string][] = [["Equals...", "="], ["Does Not Equal...", "<>"], ["Greater Than...", ">"], ["Greater Than Or Equal To...", ">="], ["Less Than...", "<"], ["Less Than Or Equal To...", "<="], ["Between...", "between "]];
const DATE_OPS: [string, string][] = [["Equals...", "="], ["Before...", "<"], ["After...", ">"], ["Between...", "between "]];

/** Sort order for a filter list: numbers by value, then text A to Z ignoring case, blanks last. */
function listCompare(a: { v: Val; shown: string }, b: { v: Val; shown: string }) {
  const rank = (x: Val) => (x === null || x === "" ? 2 : typeof x === "number" ? 0 : 1);
  if (rank(a.v) !== rank(b.v)) return rank(a.v) - rank(b.v);
  if (typeof a.v === "number" && typeof b.v === "number") return a.v - b.v;
  return a.shown.localeCompare(b.shown, undefined, { sensitivity: "base" });
}

function FilterMenu({ doc, sheet, col, anchor, onClose, onCommit }: { doc: ExcelBook; sheet: ExcelSheet; col: string; anchor: { x: number; y: number }; onClose: () => void; onCommit: CanvasProps<ExcelBook>["onCommit"] }) {
  const rc = parseRange(sheet.filter ?? "")!;
  const header = String(sheet.cells[`${col}${rc.r1}`]?.v ?? `(Column ${col})`);
  // Like Excel, the list only shows values still visible under the other columns' filters.
  const others = Object.entries(sheet.filterValues ?? {}).filter(([k, spec]) => k !== col && spec?.length);
  const entries: { v: Val; shown: string }[] = [];
  const seen = new Set<string>();
  let isNum = true, isDate = false;
  for (let r = rc.r1 + 1; r <= rc.r2; r++) {
    const hiddenByOther = others.some(([k, spec]) => {
      const v = evaluateCell(doc, sheet, `${k}${r}`);
      return !filterAllowsCanvas(spec, v as Val, formatValue(v as Val, sheet.cells[`${k}${r}`]?.fmt));
    });
    if (hiddenByOther) continue;
    const v = evaluateCell(doc, sheet, `${col}${r}`) as Val;
    const fmt = sheet.cells[`${col}${r}`]?.fmt;
    if (v !== null && v !== "" && typeof v !== "number") isNum = false;
    if (fmt?.numFmt === "Short Date" || fmt?.numFmt === "Long Date") isDate = true;
    const shown = formatValue(v, fmt) || "(Blanks)";
    if (seen.has(shown.toLowerCase())) continue;
    seen.add(shown.toLowerCase());
    entries.push({ v, shown });
  }
  entries.sort(listCompare);
  const values = entries.map((e) => e.shown);
  const current = sheet.filterValues?.[col];
  const criteria = current?.length === 1 && current[0].startsWith("~");
  const [checked, setChecked] = useState<Set<string>>(new Set(current && !criteria ? values.filter((v) => current.some((c) => c.toLowerCase() === v.toLowerCase())) : values));
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const [op, setOp] = useState<[string, string] | null>(null);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const down = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", down); };
  }, [onClose]);
  const kind = isDate ? "Date" : isNum ? "Number" : "Text";
  const ops = isDate ? DATE_OPS : isNum ? NUMBER_OPS : TEXT_OPS;
  const shownList = search ? values.filter((v) => v.toLowerCase().includes(search.toLowerCase())) : values;
  const all = checked.size === values.length;
  const operand = (t: string) => {
    if (kind === "Text") return t;
    const parsed = parseInput(t).v;
    return typeof parsed === "number" ? String(parsed) : t.replace(/[$,]/g, "");
  };
  const applyCustom = () => {
    if (!op) return;
    const code = op[1] === "between " ? `between ${operand(a)}|${operand(b)}` : `${op[1]}${operand(a)}`;
    onCommit({ kind: "command", id: "filter.by", value: `${col}~${code}` });
  };
  const ok = () => {
    if (search) {
      onCommit({ kind: "command", id: "filter.by", value: shownList.length === values.length ? `${col}=*` : `${col}=${shownList.join("|")}` });
      return;
    }
    const picked = values.filter((v) => checked.has(v));
    onCommit({ kind: "command", id: "filter.by", value: all ? `${col}=*` : `${col}=${picked.join("|")}` });
  };
  return (
    <div ref={ref} role="dialog" aria-label={`Filter column ${col}`} className="fixed z-[200] w-64 border border-gray-300 bg-white text-[12px] shadow-xl" style={{ left: anchor.x, top: anchor.y }}>
      <button type="button" onClick={() => onCommit({ kind: "command", id: "filter.sort", value: `${col}:asc` })} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#e5f1fb]"><Icon name="sortAsc" size={14} /> {kind === "Text" ? "Sort A to Z" : kind === "Date" ? "Sort Oldest to Newest" : "Sort Smallest to Largest"}</button>
      <button type="button" onClick={() => onCommit({ kind: "command", id: "filter.sort", value: `${col}:desc` })} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#e5f1fb]"><Icon name="sortDesc" size={14} /> {kind === "Text" ? "Sort Z to A" : kind === "Date" ? "Sort Newest to Oldest" : "Sort Largest to Smallest"}</button>
      <button type="button" disabled={!current} onClick={() => onCommit({ kind: "command", id: "filter.by", value: `${col}=*` })} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#e5f1fb] disabled:opacity-40"><Icon name="clear" size={14} /> Clear Filter From &quot;{header}&quot;</button>
      <button type="button" onClick={() => { setMenu((m) => !m); setOp(null); }} className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-[#e5f1fb]">
        <span className="pl-[22px]">{kind} Filters</span>
        <span aria-hidden="true">›</span>
      </button>
      {menu && !op && (
        <div className="mx-3 mb-1 border border-gray-300 bg-white py-1">
          {ops.map((o) => (
            <button key={o[0]} type="button" onClick={() => { setOp(o); setA(""); setB(""); }} className="block w-full px-3 py-1 text-left hover:bg-[#e5f1fb]">{o[0]}</button>
          ))}
        </div>
      )}
      {op && (
        <div className="mx-3 mb-2 border border-gray-300 bg-[#f7f7f7] p-2">
          <div className="mb-1 font-semibold">Custom AutoFilter</div>
          <div className="mb-1 text-gray-600">Show rows where: {header} {op[0].replace("...", "").toLowerCase()}</div>
          <input autoFocus aria-label="Filter value" value={a} onChange={(e) => setA(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && op[1] !== "between ") applyCustom(); }} className="mb-1 w-full border border-gray-400 px-1 py-0.5" placeholder={kind === "Date" ? "m/d/yyyy" : ""} />
          {op[1] === "between " && <input aria-label="And" value={b} onChange={(e) => setB(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") applyCustom(); }} className="mb-1 w-full border border-gray-400 px-1 py-0.5" placeholder="and" />}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={applyCustom} className="border border-[#217346] bg-[#e9f5ee] px-3 py-0.5">OK</button>
            <button type="button" onClick={() => setOp(null)} className="border border-gray-400 px-3 py-0.5">Cancel</button>
          </div>
        </div>
      )}
      <div className="mx-3 mt-1">
        <input aria-label="Search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") ok(); }} className="w-full border border-gray-400 px-1 py-0.5" />
      </div>
      <div className="mx-3 my-1 max-h-44 overflow-auto border border-gray-300 p-1">
        {search ? (
          <label className="flex items-center gap-2 py-0.5 text-gray-600">
            <input type="checkbox" checked readOnly />
            (Select All Search Results)
          </label>
        ) : (
          <label className="flex items-center gap-2 py-0.5">
            <input type="checkbox" checked={all} onChange={() => setChecked(all ? new Set() : new Set(values))} />
            (Select All)
          </label>
        )}
        {shownList.map((v) => (
          <label key={v} className="flex items-center gap-2 py-0.5">
            <input type="checkbox" checked={search ? true : checked.has(v)} disabled={Boolean(search)} onChange={() => { const n = new Set(checked); n.has(v) ? n.delete(v) : n.add(v); setChecked(n); }} />
            {v}
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-2 px-3 py-2">
        <button type="button" onClick={ok} className="border border-[#217346] bg-[#e9f5ee] px-3 py-0.5">OK</button>
        <button type="button" onClick={onClose} className="border border-gray-400 px-3 py-0.5">Cancel</button>
      </div>
    </div>
  );
}

const AREA_KEYS: Record<string, string> = { Filters: "Filters", Columns: "Columns", Rows: "Rows", Values: "Values" };

function PivotPane({ doc, sheet, onCommit }: { doc: ExcelBook; sheet: ExcelSheet; onCommit: CanvasProps<ExcelBook>["onCommit"] }) {
  const pv = sheet.pivot!;
  const src = doc.sheets.find((s) => s.name === pv.source.sheet);
  const rc = parseRange(pv.source.range);
  const fields: string[] = [];
  if (src && rc) for (let c = rc.c1; c <= rc.c2; c++) fields.push(String(src.cells[refOf(c, rc.r1)]?.v ?? numToCol(c)));
  const on = (f: string) => pv.rows.includes(f) || pv.columns.includes(f) || pv.filters.includes(f) || pv.values.some((v) => v.field === f);
  const [over, setOver] = useState<string | null>(null);
  const moveTo = (field: string, areaKey: string) => onCommit({ kind: "command", id: "pivot.area", value: `${field.replace(/^(Sum|Count|Average|Max|Min) of /, "")}>${areaKey}` });
  const area = (label: string, items: string[]) => (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(label); }}
      onDragLeave={() => setOver(null)}
      onDrop={(e) => { e.preventDefault(); setOver(null); const f = e.dataTransfer.getData("text/pivot-field"); if (f) moveTo(f, AREA_KEYS[label]); }}
      aria-label={`${label} area`}
      className={`flex-1 rounded border p-1 ${over === label ? "border-[#217346] bg-[#e9f5ee]" : "border-gray-300"}`}
    >
      <div className="mb-1 text-[10px] font-semibold uppercase text-gray-500">{label}</div>
      {items.map((it) => (
        <div key={it} draggable onDragStart={(e) => e.dataTransfer.setData("text/pivot-field", it)} className="mb-0.5 flex cursor-grab items-center justify-between rounded bg-[#e9f5ee] px-1 py-0.5">
          <span className="truncate">{it}</span>
          <select
            aria-label={`Move ${it}`}
            value=""
            onChange={(e) => e.target.value && moveTo(it, e.target.value)}
            className="w-4 bg-transparent text-[10px]"
          >
            <option value="">▾</option>
            <option value="Rows">Move to Row Labels</option>
            <option value="Columns">Move to Column Labels</option>
            <option value="Values">Move to Values</option>
            <option value="Filters">Move to Report Filter</option>
          </select>
        </div>
      ))}
    </div>
  );
  return (
    <aside className="flex w-64 shrink-0 flex-col border-l border-gray-300 bg-white text-[12px]">
      <div className="border-b px-3 py-2 text-[13px]">PivotTable Fields</div>
      <div className="px-3 py-1 text-[11px] text-gray-500">Choose fields to add to report:</div>
      <div className="max-h-40 overflow-auto px-3">
        {fields.map((f) => (
          <div key={f} draggable onDragStart={(e) => e.dataTransfer.setData("text/pivot-field", f)} className="flex cursor-grab items-center gap-2 py-0.5">
            <input type="checkbox" aria-label={f} checked={on(f)} onChange={() => onCommit({ kind: "command", id: "pivot.field", value: f })} />
            <span className="flex-1">{f}</span>
            <select
              aria-label={`Add ${f} to an area`}
              title="Add to Report Filter, Row Labels, Column Labels or Values"
              value=""
              onChange={(e) => e.target.value && moveTo(f, e.target.value)}
              className="w-4 bg-transparent text-[10px]"
            >
              <option value="">▾</option>
              <option value="Filters">Add to Report Filter</option>
              <option value="Rows">Add to Row Labels</option>
              <option value="Columns">Add to Column Labels</option>
              <option value="Values">Add to Values</option>
            </select>
          </div>
        ))}
      </div>
      <div className="mt-2 px-3 text-[11px] text-gray-500">Drag fields between areas below:</div>
      <div className="grid flex-1 grid-cols-2 gap-1 p-2">
        {area("Filters", pv.filters)}
        {area("Columns", pv.columns)}
        {area("Rows", pv.rows)}
        {area("Values", pv.values.map((v) => `${v.fn} of ${v.field}`))}
      </div>
    </aside>
  );
}

/** Distinct values of a PivotTable source field (or table column), for filter lists and slicers. */
function fieldItems(doc: ExcelBook, sheet: ExcelSheet, field: string): string[] {
  const src = pivotSource(doc, sheet);
  let vals: string[] = [];
  if (src) vals = src.rows.map((r) => String(r[field] ?? "(blank)"));
  else if (sheet.table) {
    const rc = parseRange(sheet.table.range)!;
    for (let c = rc.c1; c <= rc.c2; c++) {
      if (String(sheet.cells[refOf(c, rc.r1)]?.v ?? "") !== field) continue;
      for (let r = rc.r1 + 1; r <= rc.r2; r++) vals.push(String(evaluateCell(doc, sheet, refOf(c, r)) ?? "(blank)"));
    }
  }
  return Array.from(new Set(vals)).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

/** The report filter dropdown on a PivotTable (always multi-select). */
function PivotFilterMenu({ doc, sheet, field, anchor, onClose, onCommit }: { doc: ExcelBook; sheet: ExcelSheet; field: string; anchor: { x: number; y: number }; onClose: () => void; onCommit: CanvasProps<ExcelBook>["onCommit"] }) {
  const items = fieldItems(doc, sheet, field);
  const cur = pivotFilterItems(doc, sheet, field);
  const [checked, setChecked] = useState<Set<string>>(new Set(cur ? items.filter((i) => cur.some((c) => c.toLowerCase() === i.toLowerCase())) : items));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const down = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", down); };
  }, [onClose]);
  const all = checked.size === items.length;
  return (
    <div ref={ref} role="dialog" aria-label={`Filter ${field}`} className="fixed z-[200] w-56 border border-gray-300 bg-white text-[12px] shadow-xl" style={{ left: anchor.x, top: anchor.y }}>
      <div className="mx-3 my-2 max-h-48 overflow-auto border border-gray-300 p-1">
        <label className="flex items-center gap-2 py-0.5">
          <input type="checkbox" checked={all} onChange={() => setChecked(all ? new Set() : new Set(items))} />
          (All)
        </label>
        {items.map((v) => (
          <label key={v} className="flex items-center gap-2 py-0.5">
            <input type="checkbox" checked={checked.has(v)} onChange={() => { const n = new Set(checked); n.has(v) ? n.delete(v) : n.add(v); setChecked(n); }} />
            {v}
          </label>
        ))}
      </div>
      <label className="mx-3 flex items-center gap-2 text-gray-600"><input type="checkbox" checked readOnly /> Select Multiple Items</label>
      <div className="flex justify-end gap-2 px-3 py-2">
        <button type="button" disabled={!checked.size} onClick={() => onCommit({ kind: "command", id: "pivot.filter", value: all ? `${field}=*` : `${field}=${items.filter((i) => checked.has(i)).join("|")}` })} className="border border-[#217346] bg-[#e9f5ee] px-3 py-0.5 disabled:opacity-40">OK</button>
        <button type="button" onClick={onClose} className="border border-gray-400 px-3 py-0.5">Cancel</button>
      </div>
    </div>
  );
}

/** Slicers: one panel of buttons per field; click filters to one item, Ctrl+click adds or removes items. */
function Slicers({ doc, sheet, left, top, onCommit }: { doc: ExcelBook; sheet: ExcelSheet; left: number; top: number; onCommit: CanvasProps<ExcelBook>["onCommit"] }) {
  const fields = String(doc.flags?.[`slicers:${sheet.name}`] ?? "").split(",").filter(Boolean);
  if (!fields.length) return null;
  const forTable = !sheet.pivot && sheet.table;
  const tableCol = (field: string) => {
    const rc = parseRange(sheet.table!.range)!;
    for (let c = rc.c1; c <= rc.c2; c++) if (String(sheet.cells[refOf(c, rc.r1)]?.v ?? "") === field) return numToCol(c);
    return "A";
  };
  return (
    <>
      {fields.map((f, i) => {
        const items = fieldItems(doc, sheet, f);
        const cur = forTable ? sheet.filterValues?.[tableCol(f)] ?? null : pivotFilterItems(doc, sheet, f);
        const isOn = (it: string) => !cur || cur.some((c) => c.toLowerCase() === it.toLowerCase());
        const send = (list: string[] | null) =>
          onCommit({ kind: "command", id: forTable ? "filter.by" : "pivot.filter", value: forTable ? `${tableCol(f)}=${list ? list.join("|") : "*"}` : `${f}=${list ? list.join("|") : "*"}` });
        return (
          <div key={f} role="group" aria-label={`${f} slicer`} className="absolute z-[21] w-40 border border-gray-400 bg-white text-[11px] shadow-md" style={{ left: left + i * 170, top }}>
            <div className="flex items-center justify-between border-b border-gray-200 px-2 py-1 font-semibold text-gray-800">
              {f}
              <button type="button" aria-label={`Clear filter from ${f}`} title="Clear Filter" disabled={!cur} onClick={() => send(null)} className="px-1 text-gray-500 hover:text-red-600 disabled:opacity-30">⊗</button>
            </div>
            <div className="flex flex-col gap-1 p-1.5">
              {items.map((it) => (
                <button
                  key={it}
                  type="button"
                  onClick={(e) => {
                    if (e.ctrlKey || e.metaKey) {
                      const now = items.filter(isOn);
                      const next = isOn(it) ? now.filter((x) => x !== it) : items.filter((x) => isOn(x) || x === it);
                      send(next.length === items.length || !next.length ? null : next);
                    } else send(cur && cur.length === 1 && isOn(it) ? null : [it]);
                  }}
                  className={`truncate border px-1.5 py-1 text-left ${isOn(it) ? "border-[#4472C4] bg-[#dbe5f1]" : "border-gray-200 bg-white text-gray-400"}`}
                >
                  {it}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

/** File › Options: the Excel Options dialog (Formulas holds the R1C1 setting). */
function OptionsDialog({ doc, start, onCommit }: { doc: ExcelBook; start: string; onCommit: CanvasProps<ExcelBook>["onCommit"] }) {
  const cats = ["General", "Formulas", "Data", "Proofing", "Save", "Language", "Accessibility", "Advanced", "Customize Ribbon", "Quick Access Toolbar", "Add-ins", "Trust Center"];
  const [cat, setCat] = useState(cats.includes(start) ? start : "General");
  const [r1c1, setR1c1] = useState(Boolean(doc.flags?.r1c1));
  const ok = () => {
    if (r1c1 !== Boolean(doc.flags?.r1c1)) onCommit({ kind: "command", id: "options.r1c1", value: r1c1 ? "On" : "Off" });
    else onCommit({ kind: "command", id: "pane.close" });
  };
  return (
    <div className="absolute inset-0 z-[90] flex items-center justify-center bg-black/10" onKeyDown={(e) => e.stopPropagation()}>
      <div role="dialog" aria-modal="true" aria-label="Excel Options" className="flex h-[380px] w-[600px] max-w-[95%] flex-col border border-gray-400 bg-white text-[12px] shadow-2xl">
        <div className="flex items-center justify-between border-b px-3 py-1.5">
          <span>Excel Options</span>
          <button type="button" aria-label="Close" onClick={() => onCommit({ kind: "command", id: "pane.close" })} className="px-2 hover:bg-red-600 hover:text-white">✕</button>
        </div>
        <div className="flex min-h-0 flex-1">
          <nav className="w-40 shrink-0 overflow-auto border-r bg-[#f3f3f3] py-1">
            {cats.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} className={`block w-full px-3 py-1 text-left ${cat === c ? "bg-[#cce4f7] font-semibold" : "hover:bg-[#e5f1fb]"}`}>{c}</button>
            ))}
          </nav>
          <div className="flex-1 overflow-auto p-4">
            {cat === "Formulas" ? (
              <div className="flex flex-col gap-3">
                <p className="text-gray-600">Change options related to formula calculation, performance, and error handling.</p>
                <fieldset className="border-t pt-2">
                  <legend className="pr-2 font-semibold">Calculation options</legend>
                  <label className="flex items-center gap-2"><input type="radio" checked readOnly /> Automatic</label>
                </fieldset>
                <fieldset className="border-t pt-2">
                  <legend className="pr-2 font-semibold">Working with formulas</legend>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={r1c1} onChange={(e) => setR1c1(e.target.checked)} />
                    R1C1 reference style
                  </label>
                  <label className="flex items-center gap-2 text-gray-600"><input type="checkbox" checked readOnly /> Formula AutoComplete</label>
                  <label className="flex items-center gap-2 text-gray-600"><input type="checkbox" checked readOnly /> Use table names in formulas</label>
                </fieldset>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-gray-600">
                <p className="font-semibold text-gray-800">{cat}</p>
                {cat === "General" && <p>User name: BEOC Student</p>}
                {cat === "Proofing" && <p>Ignore words in UPPERCASE: On</p>}
                {cat === "Save" && <p>Save AutoRecover information every 10 minutes: On</p>}
                {!["General", "Proofing", "Save"].includes(cat) && <p>No changes needed here for this course.</p>}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t px-3 py-2">
          <button type="button" onClick={ok} className="min-w-[72px] border border-[#0078d4] bg-[#e5f1fb] px-3 py-1 hover:bg-[#cce4f7]">OK</button>
          <button type="button" onClick={() => onCommit({ kind: "command", id: "pane.close" })} className="min-w-[72px] border border-gray-400 bg-[#e1e1e1] px-3 py-1">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function SpellingPane({ cell, onCommit }: { cell: { v?: string | number; spell?: string[] }; onCommit: CanvasProps<ExcelBook>["onCommit"] }) {
  const [pick, setPick] = useState(cell.spell?.[0] ?? "");
  useEffect(() => setPick(cell.spell?.[0] ?? ""), [cell]);
  const btn = "block w-full rounded border border-gray-300 px-2 py-1 text-left hover:bg-[#e5f1fb]";
  return (
    <div className="space-y-2">
      <p>Not in Dictionary: <b className="text-red-700">{String(cell.v)}</b></p>
      <p className="text-[11px] text-gray-500">Suggestions:</p>
      <div role="listbox" aria-label="Suggestions" className="border border-gray-300">
        {(cell.spell ?? []).map((s) => (
          <button key={s} type="button" role="option" aria-selected={pick === s} onClick={() => setPick(s)} onDoubleClick={() => onCommit({ kind: "command", id: "spelling.change", value: s })} className={`block w-full px-2 py-0.5 text-left ${pick === s ? "bg-[#0078d4] text-white" : "hover:bg-[#e5f1fb]"}`}>{s}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        <button type="button" onClick={() => onCommit({ kind: "command", id: "spelling.ignore" })} className={btn}>Ignore Once</button>
        <button type="button" onClick={() => onCommit({ kind: "command", id: "spelling.ignore", value: "Ignore All" })} className={btn}>Ignore All</button>
        <button type="button" onClick={() => onCommit({ kind: "command", id: "spelling.ignore", value: "Add to Dictionary" })} className={`${btn} col-span-2`}>Add to Dictionary</button>
        <button type="button" disabled={!pick} onClick={() => onCommit({ kind: "command", id: "spelling.change", value: pick })} className={btn}>Change</button>
        <button type="button" disabled={!pick} onClick={() => onCommit({ kind: "command", id: "spelling.changeAll", value: pick })} className={btn}>Change All</button>
      </div>
    </div>
  );
}

/** Formulas › Evaluate Formula: the formula, then its references replaced by values, then the result. */
function EvaluatePane({ doc, sheet, cellRef: ref }: { doc: ExcelBook; sheet: ExcelSheet; cellRef: string }) {
  const [step, setStep] = useState(0);
  useEffect(() => setStep(0), [ref]);
  const f = sheet.cells[ref]?.f;
  if (!f) return <p>Cell {ref} does not contain a formula.</p>;
  const withValues = f.replace(/(^|[^A-Za-z0-9_:$!'.])(\$?[A-Za-z]{1,3}\$?\d+)(?![A-Za-z0-9_(:!])/g, (m, pre, r) => {
    const v = evaluateCell(doc, sheet, r.replace(/\$/g, "").toUpperCase());
    return `${pre}${typeof v === "string" ? `"${v}"` : v === null ? 0 : String(v)}`;
  });
  const result = evaluateCell(doc, sheet, ref);
  const lines = [f, withValues, String(result ?? "")];
  return (
    <div className="space-y-2">
      <p>Reference: <b>{sheet.name}!{ref}</b></p>
      <p className="text-[11px] text-gray-500">Evaluation:</p>
      <p className="break-all rounded border border-gray-300 bg-gray-50 p-2 font-mono text-[12px]">{lines[Math.min(step, 2)]}</p>
      <div className="flex gap-2">
        <button type="button" onClick={() => setStep((x) => (x >= 2 ? 0 : x + 1))} className="rounded border border-gray-400 px-3 py-1 hover:bg-[#e5f1fb]">{step >= 2 ? "Restart" : "Evaluate"}</button>
      </div>
      <p className="text-[11px] text-gray-500">Evaluate replaces each reference with its value, then shows the result.</p>
    </div>
  );
}

function ExcelPane({ doc, sheet, pane, findTerm, act, onCommit, onSelect }: { doc: ExcelBook; sheet: ExcelSheet; pane: string | null; findTerm: string | null; act: string; onCommit: CanvasProps<ExcelBook>["onCommit"]; onSelect: (r: string) => void }) {
  let title = pane ?? "Find";
  let body: React.ReactNode = <p className="text-gray-600">{pane}</p>;
  if (findTerm !== null) {
    title = "Find and Replace";
    const hits = Object.keys(sheet.cells).filter((r) => String(sheet.cells[r].v ?? "").toLowerCase().includes(findTerm.toLowerCase()));
    body = (
      <div>
        <p className="mb-2">{hits.length} cell(s) found</p>
        {hits.map((h) => <button key={h} type="button" onClick={() => onSelect(h)} className="block w-full px-1 py-0.5 text-left hover:bg-[#e5f1fb]">{sheet.name} · {h} · {String(sheet.cells[h].v)}</button>)}
      </div>
    );
  } else if (pane === "Spelling") {
    const cell = sheet.cells[act];
    body = cell?.spell ? <SpellingPane cell={cell} onCommit={onCommit} /> : <p>Select the next misspelled cell.</p>;
  } else if (pane === "Spelling: done") {
    title = "Spelling";
    body = <p>The spelling check is complete for the entire sheet.</p>;
  } else if (pane === "Accessibility") {
    const charts = sheet.charts?.length ?? 0;
    const objects = (sheet.objects ?? []).filter((o) => !doc.flags?.[`alt:${o.id}`]).length;
    body = charts || objects ? (
      <div className="space-y-1">
        {charts > 0 && <p className="rounded border border-red-200 bg-red-50 p-2">Missing alternative text: {charts} chart(s)</p>}
        {objects > 0 && <p className="rounded border border-red-200 bg-red-50 p-2">Missing alternative text: {objects} graphic(s)</p>}
      </div>
    ) : <p className="text-emerald-700">No accessibility issues found.</p>;
  } else if (pane?.startsWith("Evaluate Formula|")) {
    title = "Evaluate Formula";
    body = <EvaluatePane doc={doc} sheet={sheet} cellRef={pane.split("|")[1]} />;
  } else if (pane === "Analyze Data") {
    const sugg = analyzeSuggestions(doc, sheet, act);
    body = (
      <div className="space-y-3">
        <input aria-label="Ask a question about your data" placeholder="Ask a question about your data" className="w-full border border-gray-400 px-2 py-1" onKeyDown={(e) => e.stopPropagation()} />
        <p className="text-[11px] text-gray-500">Discover insights</p>
        {sugg.length === 0 && <p className="text-gray-600">Analyze Data could not find a pattern here. Check that the data has one header row and no blank rows or merged cells.</p>}
        {sugg.map((x) => (
          <div key={x.title} className="rounded border border-gray-300 p-2">
            <p className="mb-1 font-semibold">{x.title}</p>
            <div className="mb-2 flex h-12 items-end gap-1" aria-hidden="true">{[5, 9, 4, 7].map((h, i) => <span key={i} className="w-3 bg-[#4472C4]" style={{ height: h * 4 }} />)}</div>
            <button type="button" onClick={() => onCommit({ kind: "command", id: "analyze.insert", value: x.title })} className="rounded border border-[#217346] px-2 py-0.5 text-[#217346] hover:bg-[#e9f5ee]">+ Insert PivotChart</button>
          </div>
        ))}
      </div>
    );
  } else if (pane === "Comments") {
    const list = Object.entries(sheet.cells).filter(([, c]) => c.comment);
    body = list.length ? (
      <div className="space-y-2">
        {list.map(([ref, c]) => (
          <button key={ref} type="button" onClick={() => onSelect(ref)} className="block w-full rounded border border-gray-300 p-2 text-left hover:bg-[#e5f1fb]">
            <span className="block text-[11px] text-gray-500">{ref} · BEOC Student</span>
            {String(c.comment)}
          </button>
        ))}
      </div>
    ) : <p className="text-gray-600">There are no comments on this sheet.</p>;
  } else if (pane?.startsWith("All done") || pane?.startsWith("Removed")) {
    title = "Microsoft Excel";
  } else if (pane?.startsWith("Data Selector")) {
    title = "Data Selector";
  }
  return (
    <aside className="flex w-60 shrink-0 flex-col border-l border-gray-300 bg-white text-[12px]">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-[13px]">{title}</span>
        <button type="button" aria-label={`Close ${title}`} onClick={() => onCommit({ kind: "command", id: "pane.close" })} className="px-1 hover:bg-gray-100">✕</button>
      </div>
      <div className="flex-1 overflow-auto p-3">{body}</div>
    </aside>
  );
}

export function ExcelStatusBar({ doc, ui, onCommit }: StatusBarProps<ExcelBook>) {
  const sheet = sheetOf(doc, ui);
  const zoom = sheet.zoom ?? 100;
  const rc = selRect(sheet, ui.selection || "A1");
  let stats: { avg: number | null; count: number; sum: number; n: number } | null = null;
  if (rc && (rc.c1 !== rc.c2 || rc.r1 !== rc.r2)) {
    const nums: number[] = [];
    let count = 0;
    for (let r = rc.r1; r <= Math.min(rc.r2, rc.r1 + 300); r++)
      for (let c = rc.c1; c <= Math.min(rc.c2, rc.c1 + 30); c++) {
        const v = evaluateCell(doc, sheet, refOf(c, r));
        if (v !== null && v !== "") count++;
        if (typeof v === "number") nums.push(v);
      }
    if (count >= 2) stats = { count, n: nums.length, sum: nums.reduce((a, b) => a + b, 0), avg: nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null };
  }
  const fmt = sheet.cells[activeCell(ui)]?.fmt;
  return (
    <div className="flex h-6 shrink-0 items-center gap-4 border-t border-gray-300 bg-[#f3f3f3] px-3 text-[11px] text-gray-700">
      <span>Ready</span>
      <span className="hidden sm:inline">Accessibility: Good to go</span>
      {doc.flags?.lastAction && <span className="hidden text-gray-500 sm:inline">Last action: {String(doc.flags.lastAction)}</span>}
      <span className="flex-1" />
      {stats && (
        <span className="flex gap-4">
          {stats.n > 0 && stats.avg !== null && <span>Average: {formatValue(stats.avg, fmt?.numFmt && fmt.numFmt !== "General" ? fmt : { decimals: Number.isInteger(stats.avg) ? undefined : 2 })}</span>}
          <span>Count: {stats.count}</span>
          {stats.n > 0 && <span>Sum: {formatValue(stats.sum, fmt)}</span>}
        </span>
      )}
      <span className="flex items-center gap-1">
        {[
          ["Normal", "printLayout"],
          ["Page Layout", "onePage"],
          ["Page Break Preview", "pageBreak"],
        ].map(([v, icon]) => (
          <button key={v} type="button" title={v} aria-label={v} onClick={() => onCommit({ kind: "command", id: "view.mode", value: v })} className={`rounded p-0.5 hover:bg-gray-200 ${(sheet.view ?? "normal") === ({ Normal: "normal", "Page Layout": "pageLayout", "Page Break Preview": "pageBreak" } as const)[v as "Normal"] ? "bg-gray-300" : ""}`}>
            <Icon name={icon} size={14} />
          </button>
        ))}
      </span>
      <span className="flex items-center gap-1">
        <button type="button" aria-label="Zoom out" onClick={() => onCommit({ kind: "command", id: "view.zoom", value: String(Math.max(30, zoom - 10)) })} className="px-1 hover:bg-gray-200">−</button>
        <input type="range" aria-label="Zoom" min={30} max={200} step={10} value={zoom} onChange={(e) => onCommit({ kind: "command", id: "view.zoom", value: e.target.value })} className="h-1 w-24 accent-gray-600" />
        <button type="button" aria-label="Zoom in" onClick={() => onCommit({ kind: "command", id: "view.zoom", value: String(Math.min(200, zoom + 10)) })} className="px-1 hover:bg-gray-200">+</button>
        <span className="w-9 text-right">{zoom}%</span>
      </span>
    </div>
  );
}
