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
  formatValue,
  numToCol,
  parseRange,
  parseRef,
  rectToRange,
  refOf,
  type Rect,
} from "@/lib/sim/excel";
import { activeCell, currentRegion, DEFAULT_COLS, DEFAULT_ROWS, selRect, sheetOf, TAB_COLORS, usedRect } from "./model";
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

function computePivot(doc: ExcelBook, sheet: ExcelSheet): Record<string, VirtualCell> {
  const pv = sheet.pivot;
  const out: Record<string, VirtualCell> = {};
  if (!pv) return out;
  const src = doc.sheets.find((s) => s.name === pv.source.sheet);
  const rc = parseRange(pv.source.range);
  if (!src || !rc) return out;
  const head: string[] = [];
  for (let c = rc.c1; c <= rc.c2; c++) head.push(String(src.cells[refOf(c, rc.r1)]?.v ?? numToCol(c)));
  const rows: Record<string, Val>[] = [];
  for (let r = rc.r1 + 1; r <= rc.r2; r++) {
    const row: Record<string, Val> = {};
    head.forEach((h, i) => (row[h] = evaluateCell(doc, src, refOf(rc.c1 + i, r))));
    rows.push(row);
  }
  const at = parseRef(pv.at ?? "A3")!;
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
  const vf: CellFormat | undefined = val ? src.cells[refOf(rc.c1 + head.indexOf(val.field), rc.r1 + 1)]?.fmt : undefined;
  const fmtV = val?.fn === "Count" ? undefined : vf;
  const hdr: CellFormat = { bold: true, fill: "#DDEBF7" };
  const rowKeys = rowF ? Array.from(new Set(rows.map((r) => String(r[rowF] ?? "(blank)")))).sort() : [];
  const colKeys = colF ? Array.from(new Set(rows.map((r) => String(r[colF] ?? "(blank)")))).sort() : [];
  const label = val ? `${val.fn} of ${val.field}` : "";
  out[refOf(at.c, at.r)] = { v: rowF ? "Row Labels" : label, fmt: hdr };
  if (colF) {
    out[refOf(at.c + 1, at.r - 1)] = { v: "Column Labels", fmt: hdr };
    colKeys.forEach((k, i) => (out[refOf(at.c + 1 + i, at.r)] = { v: k, fmt: hdr }));
    out[refOf(at.c + 1 + colKeys.length, at.r)] = { v: "Grand Total", fmt: hdr };
  } else if (rowF && val) out[refOf(at.c + 1, at.r)] = { v: label, fmt: hdr };
  if (!rowF && val) {
    out[refOf(at.c, at.r + 1)] = { v: agg(rows), fmt: fmtV };
    return out;
  }
  rowKeys.forEach((k, i) => {
    const items = rows.filter((r) => String(r[rowF] ?? "(blank)") === k);
    out[refOf(at.c, at.r + 1 + i)] = { v: k };
    if (colF) {
      colKeys.forEach((ck, j) => (out[refOf(at.c + 1 + j, at.r + 1 + i)] = { v: agg(items.filter((x) => String(x[colF] ?? "(blank)") === ck)), fmt: fmtV }));
      out[refOf(at.c + 1 + colKeys.length, at.r + 1 + i)] = { v: agg(items), fmt: fmtV };
    } else if (val) out[refOf(at.c + 1, at.r + 1 + i)] = { v: agg(items), fmt: fmtV };
  });
  const gt = at.r + 1 + rowKeys.length;
  out[refOf(at.c, gt)] = { v: "Grand Total", fmt: { bold: true, border: "top" } };
  if (colF) {
    colKeys.forEach((ck, j) => (out[refOf(at.c + 1 + j, gt)] = { v: agg(rows.filter((x) => String(x[colF] ?? "(blank)") === ck)), fmt: { ...(fmtV ?? {}), bold: true, border: "top" } }));
    out[refOf(at.c + 1 + colKeys.length, gt)] = { v: agg(rows), fmt: { ...(fmtV ?? {}), bold: true, border: "top" } };
  } else if (val) out[refOf(at.c + 1, gt)] = { v: agg(rows), fmt: { ...(fmtV ?? {}), bold: true, border: "top" } };
  return out;
}

/* ------------------------------------------------------------------ */
/* Conditional formatting                                              */
/* ------------------------------------------------------------------ */

function cfStyles(doc: ExcelBook, sheet: ExcelSheet): Record<string, React.CSSProperties & { icon?: string }> {
  const out: Record<string, React.CSSProperties & { icon?: string }> = {};
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
        default: {
          if (typeof v !== "number") return;
          const t = max === min ? 1 : (v - min) / (max - min);
          if (rule.rule.includes("Data Bar")) {
            const col = rule.rule.includes("Green") ? "#63BE7B" : "#638EC6";
            out[ref] = { ...out[ref], backgroundImage: `linear-gradient(90deg, ${col}88 ${t * 100}%, transparent ${t * 100}%)` };
          } else if (rule.rule.includes("Color Scale")) {
            const g = t > 0.5 ? [99, 190, 123] : [255, 235, 132];
            const r = t > 0.5 ? [255, 235, 132] : [248, 105, 107];
            const k = t > 0.5 ? (t - 0.5) * 2 : t * 2;
            const mix = r.map((x, j) => Math.round(x + (g[j] - x) * k));
            out[ref] = { ...out[ref], background: `rgb(${mix.join(",")})` };
          } else if (rule.rule.includes("Traffic") || rule.rule.includes("Arrows")) {
            out[ref] = { ...out[ref], icon: rule.rule.includes("Arrows") ? (t > 0.66 ? "▲" : t > 0.33 ? "▶" : "▼") : t > 0.66 ? "🟢" : t > 0.33 ? "🟡" : "🔴" };
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

function ChartView({ doc, sheet, ch, selected, onSelect, onTitleEdit }: { doc: ExcelBook; sheet: ExcelSheet; ch: ExcelChart; selected: boolean; onSelect: () => void; onTitleEdit: () => void }) {
  const rc = parseRange(ch.range);
  if (!rc) return null;
  const firstColText = typeof evaluateCell(doc, sheet, refOf(rc.c1, rc.r1 + 1)) !== "number";
  const headerRow = typeof evaluateCell(doc, sheet, refOf(rc.c2, rc.r1)) !== "number";
  const catCol = firstColText ? rc.c1 : null;
  const startRow = headerRow ? rc.r1 + 1 : rc.r1;
  const cats: string[] = [];
  for (let r = startRow; r <= rc.r2; r++) cats.push(catCol ? String(evaluateCell(doc, sheet, refOf(catCol, r)) ?? "") : String(r - startRow + 1));
  const series: { name: string; vals: number[] }[] = [];
  for (let c = catCol ? rc.c1 + 1 : rc.c1; c <= rc.c2; c++) {
    const vals: number[] = [];
    for (let r = startRow; r <= rc.r2; r++) {
      const v = evaluateCell(doc, sheet, refOf(c, r));
      vals.push(typeof v === "number" ? v : 0);
    }
    series.push({ name: headerRow ? String(evaluateCell(doc, sheet, refOf(c, rc.r1)) ?? "") : `Series${series.length + 1}`, vals });
  }
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
        {cats.map((c, i) => (
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
        {series.length > 1 && series.map((s, si) => (
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

  const used = usedRect(sheet);
  const nCols = Math.max(sheet.cols ?? DEFAULT_COLS, (used?.c2 ?? 0) + 2, ...(sheet.charts ?? []).map(() => 0));
  const nRows = Math.max(sheet.rows ?? DEFAULT_ROWS, (used?.r2 ?? 0) + 3);
  const hiddenRows = new Set(sheet.hiddenRows ?? []);
  const hiddenCols = new Set(sheet.hiddenCols ?? []);
  const filterRect = sheet.filter ? parseRange(sheet.filter) : null;
  // Rows hidden by an AutoFilter
  if (filterRect && sheet.filterValues) {
    for (let r = filterRect.r1 + 1; r <= filterRect.r2; r++) {
      for (const [col, allowed] of Object.entries(sheet.filterValues)) {
        const v = evaluateCell(doc, sheet, `${col}${r}`);
        const shown = formatValue(v as Val, sheet.cells[`${col}${r}`]?.fmt);
        if (!allowed.some((a) => a.toLowerCase() === shown.toLowerCase() || a.toLowerCase() === String(v ?? "").toLowerCase())) hiddenRows.add(r);
      }
    }
  }

  const colW = (c: number) => (hiddenCols.has(numToCol(c)) ? 0 : (sheet.colWidths?.[numToCol(c)] ?? COL_W) * z);
  const rowH = (r: number) => (hiddenRows.has(r) ? 0 : (sheet.rowHeights?.[String(r)] ?? ROW_H) * z);
  const colX: number[] = [0, HEAD_W];
  for (let c = 1; c <= nCols; c++) colX[c + 1] = colX[c] + colW(c);
  const rowY: number[] = [0, HEAD_H];
  for (let r = 1; r <= nRows; r++) rowY[r + 1] = rowY[r] + rowH(r);

  const pivotCells = useMemo(() => computePivot(doc, sheet), [doc, sheet]);
  const cf = useMemo(() => cfStyles(doc, sheet), [doc, sheet]);
  const spill = useMemo(() => {
    const out: Record<string, Val> = {};
    for (const [ref, cell] of Object.entries(sheet.cells)) {
      if (!cell.f || !/\b(UNIQUE|SORT|FILTER|SEQUENCE)\(/i.test(cell.f)) continue;
      const vals = evaluateSpill(doc, sheet, cell.f);
      const p = parseRef(ref)!;
      vals.slice(1).forEach((v, i) => {
        const r = refOf(p.c, p.r + 1 + i);
        if (!sheet.cells[r]) out[r] = v;
      });
    }
    return out;
  }, [doc, sheet]);

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
    if (sheet.protected) {
      setMessage("The cell or chart you're trying to change is on a protected sheet. To make a change, unprotect the sheet (Review › Unprotect Sheet).");
      return;
    }
    if (e.text !== cellRaw(sheet, e.ref)) onCommit({ kind: "type", target: e.ref, value: e.text });
    const p = parseRef(e.ref)!;
    if (move === "down") onSelect({ selection: refOf(p.c, p.r + 1) });
    if (move === "right") onSelect({ selection: refOf(p.c + 1, p.r) });
    focus();
  };

  const startEdit = (text?: string) => {
    if (sel.startsWith("chart:") || sel.startsWith("obj:")) return;
    if (sheet.protected) {
      setMessage("The cell or chart you're trying to change is on a protected sheet. To make a change, unprotect the sheet (Review › Unprotect Sheet).");
      return;
    }
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

  const formulaText = edit ? edit.text : sel.startsWith("chart:") ? "" : cellRaw(sheet, act);

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
      let value: Val = virtual ? virtual.v : spill[ref] !== undefined ? spill[ref] : cell ? (cell.f ? evaluateCell(doc, sheet, ref) : cell.v ?? null) : null;
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
          for (let rr = tbl.r1 + 1; rr <= tbl.r2; rr++) { const v = evaluateCell(doc, sheet, refOf(c, rr)); if (typeof v === "number") s += v; }
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
            overflow: fmt.wrap || !nextEmpty || align !== "left" ? "hidden" : "visible",
            textOverflow: "clip",
            display: fmt.wrap ? "flex" : undefined,
            alignItems: fmt.wrap ? (fmt.valign === "top" ? "flex-start" : fmt.valign === "middle" ? "center" : "flex-end") : undefined,
            zIndex: frozenRow || frozenCol ? 3 : overflowZ(nextEmpty, align),
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
              {cfs?.icon && <span className="mr-1 text-[10px]">{cfs.icon}</span>}
              {spark ? <Sparkline doc={doc} sheet={sheet} range={spark.range} type={spark.type} h={h} /> : text}
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
            value={nameBox ?? (sel.startsWith("chart:") ? `Chart ${sel.slice(7)}` : sel.includes(":") ? act : sel)}
            onChange={(e) => setNameBox(e.target.value)}
            onFocus={(e) => { setNameBox(e.target.value); e.target.select(); }}
            onBlur={() => setNameBox(null)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter" && nameBox) {
                const t = nameBox.trim().toUpperCase();
                if (/^[A-Z]{1,3}\d+(:[A-Z]{1,3}\d+)?$/.test(t)) onSelect({ selection: t });
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
            onFocus={() => { if (!edit && !sel.startsWith("chart:")) setEdit({ ref: act, text: cellRaw(sheet, act), bar: true }); }}
            onChange={(e) => setEdit({ ref: act, text: e.target.value, bar: true })}
            onKeyDown={(e) => {
              e.stopPropagation();
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
              <div className="absolute left-0 top-0 border-b border-r border-gray-300 bg-[#f3f3f3]" style={{ width: HEAD_W, height: HEAD_H }}>
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
                      className={`absolute top-0 flex cursor-s-resize select-none items-center justify-center border-b border-r border-gray-300 text-[11px] ${selR && c >= selR.c1 && c <= selR.c2 ? "bg-[#d3e7dc] font-semibold text-[#217346]" : "bg-[#f3f3f3] text-gray-600"}`}
                      style={{ left: colX[c], width: colW(c), height: HEAD_H }}
                    >
                      {numToCol(c)}
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
                      className={`absolute left-0 flex cursor-e-resize select-none items-center justify-center border-b border-r border-gray-300 text-[11px] ${selR && r >= selR.r1 && r <= selR.r2 ? "bg-[#d3e7dc] font-semibold text-[#217346]" : "bg-[#f3f3f3] text-gray-600"}`}
                      style={{ top: rowY[r], width: HEAD_W, height: rowH(r) }}
                    >
                      {r}
                    </div>
                  ),
                )}
            </div>
            {cells}
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
            {sheet.pivot && Object.keys(pivotCells).length === 0 && (
              <div className="absolute z-[2] flex flex-col items-center justify-center border border-gray-400 bg-[#f7fbff] p-3 text-center text-[11px] text-gray-600" style={{ left: colX[parseRef(sheet.pivot.at ?? "A3")!.c], top: rowY[parseRef(sheet.pivot.at ?? "A3")!.r], width: 220, height: 120 }}>
                <b className="mb-1 text-gray-800">PivotTable1</b>
                To build a report, choose fields from the PivotTable Field List
              </div>
            )}
          </div>
        </div>

        {sheet.pivot && <PivotPane doc={doc} sheet={sheet} onCommit={onCommit} />}
        {(pane || findTerm !== null) && <ExcelPane doc={doc} sheet={sheet} pane={pane} findTerm={findTerm} act={act} onCommit={onCommit} onSelect={(r) => onSelect({ selection: r })} />}
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
                onContextMenu(e.clientX, e.clientY - 280, items.map((m) => (m.dialog?.startsWith("__rename:") ? { ...m, dialog: undefined, command: "__noop" } : m)));
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
      }}
      className="h-full w-full min-w-[60px] border-0 bg-white px-0.5 outline outline-2 outline-[#217346]"
      style={{ font: "inherit", textAlign: "left" }}
    />
  );
}

function FilterMenu({ doc, sheet, col, anchor, onClose, onCommit }: { doc: ExcelBook; sheet: ExcelSheet; col: string; anchor: { x: number; y: number }; onClose: () => void; onCommit: CanvasProps<ExcelBook>["onCommit"] }) {
  const rc = parseRange(sheet.filter ?? "")!;
  const values = Array.from(new Set(Array.from({ length: rc.r2 - rc.r1 }, (_, i) => formatValue(evaluateCell(doc, sheet, `${col}${rc.r1 + 1 + i}`) as Val, sheet.cells[`${col}${rc.r1 + 1 + i}`]?.fmt)))).sort();
  const current = sheet.filterValues?.[col];
  const [checked, setChecked] = useState<Set<string>>(new Set(current ?? values));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const down = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", down); };
  }, [onClose]);
  const all = checked.size === values.length;
  return (
    <div ref={ref} role="dialog" aria-label={`Filter column ${col}`} className="fixed z-[200] w-60 border border-gray-300 bg-white text-[12px] shadow-xl" style={{ left: anchor.x, top: anchor.y }}>
      <button type="button" onClick={() => onCommit({ kind: "command", id: "filter.sort", value: `${col}:asc` })} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#e5f1fb]"><Icon name="sortAsc" size={14} /> Sort A to Z</button>
      <button type="button" onClick={() => onCommit({ kind: "command", id: "filter.sort", value: `${col}:desc` })} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#e5f1fb]"><Icon name="sortDesc" size={14} /> Sort Z to A</button>
      {current && <button type="button" onClick={() => onCommit({ kind: "command", id: "filter.by", value: `${col}=*` })} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#e5f1fb]"><Icon name="clear" size={14} /> Clear Filter</button>}
      <div className="mx-3 my-1 max-h-48 overflow-auto border border-gray-300 p-1">
        <label className="flex items-center gap-2 py-0.5">
          <input type="checkbox" checked={all} onChange={() => setChecked(all ? new Set() : new Set(values))} />
          (Select All)
        </label>
        {values.map((v) => (
          <label key={v} className="flex items-center gap-2 py-0.5">
            <input type="checkbox" checked={checked.has(v)} onChange={() => { const n = new Set(checked); n.has(v) ? n.delete(v) : n.add(v); setChecked(n); }} />
            {v || "(Blanks)"}
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-2 px-3 py-2">
        <button type="button" onClick={() => onCommit({ kind: "command", id: "filter.by", value: all ? `${col}=*` : `${col}=${Array.from(checked).join("|")}` })} className="border border-[#217346] bg-[#e9f5ee] px-3 py-0.5">OK</button>
        <button type="button" onClick={onClose} className="border border-gray-400 px-3 py-0.5">Cancel</button>
      </div>
    </div>
  );
}

function PivotPane({ doc, sheet, onCommit }: { doc: ExcelBook; sheet: ExcelSheet; onCommit: CanvasProps<ExcelBook>["onCommit"] }) {
  const pv = sheet.pivot!;
  const src = doc.sheets.find((s) => s.name === pv.source.sheet);
  const rc = parseRange(pv.source.range);
  const fields: string[] = [];
  if (src && rc) for (let c = rc.c1; c <= rc.c2; c++) fields.push(String(src.cells[refOf(c, rc.r1)]?.v ?? numToCol(c)));
  const on = (f: string) => pv.rows.includes(f) || pv.columns.includes(f) || pv.filters.includes(f) || pv.values.some((v) => v.field === f);
  const area = (label: string, items: string[]) => (
    <div className="flex-1 rounded border border-gray-300 p-1">
      <div className="mb-1 text-[10px] font-semibold uppercase text-gray-500">{label}</div>
      {items.map((it) => (
        <div key={it} className="mb-0.5 flex items-center justify-between rounded bg-[#e9f5ee] px-1 py-0.5">
          <span className="truncate">{it}</span>
          <select
            aria-label={`Move ${it}`}
            value=""
            onChange={(e) => e.target.value && onCommit({ kind: "command", id: "pivot.area", value: `${it.replace(/^(Sum|Count|Average|Max|Min) of /, "")}>${e.target.value}` })}
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
          <label key={f} className="flex items-center gap-2 py-0.5">
            <input type="checkbox" checked={on(f)} onChange={() => onCommit({ kind: "command", id: "pivot.field", value: f })} />
            {f}
          </label>
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
    body = cell?.spell ? (
      <div className="space-y-2">
        <p>Not in Dictionary: <b className="text-red-700">{String(cell.v)}</b></p>
        <p className="text-[11px] text-gray-500">Suggestions:</p>
        {cell.spell.map((s) => <button key={s} type="button" onClick={() => onCommit({ kind: "command", id: "spelling.change", value: s })} className="block w-full rounded border border-gray-300 px-2 py-1 text-left hover:bg-[#e5f1fb]">{s}</button>)}
        <button type="button" onClick={() => onCommit({ kind: "command", id: "spelling.ignore" })} className="text-[#217346] hover:underline">Ignore Once</button>
      </div>
    ) : <p>Select the next misspelled cell.</p>;
  } else if (pane === "Spelling: done") {
    title = "Spelling";
    body = <p>The spelling check is complete for the entire sheet.</p>;
  } else if (pane === "Accessibility") {
    const charts = sheet.charts?.length ?? 0;
    body = charts ? <p className="rounded border border-red-200 bg-red-50 p-2">Missing alternative text: {charts} chart(s)</p> : <p className="text-emerald-700">No accessibility issues found.</p>;
  } else if (pane?.startsWith("All done") || pane?.startsWith("Removed")) {
    title = "Microsoft Excel";
  }
  void doc;
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
