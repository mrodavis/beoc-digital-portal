"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CellFormat, ExcelBook, ExcelChart, ExcelSheet } from "@/types/sim";
import { evaluateCell, filterHiddenRows, formatValue, numToCol, parseRange, parseRef, rectToRange, refOf, type Rect } from "@/lib/sim/excel";
import { activeCell, currentRegion, selRect, sheetOf, usedRect } from "../excel/model";
import { GIcon } from "./icons";
import { CF_CONDITIONS, CF_STYLES, CHART_TYPES, SHEETS_MENUS, SHEETS_TOOLBAR, VALIDATION_CRITERIA } from "./menus";
import { activeFilterView, asBook, openFile, regionOf, viewOn, type GCF, type GCellFmt } from "./model";
import type { GFile } from "./types";
import { CommentCard, CommentComposer, CommentsPanel, DetailsPanel, EditorHeader, IconBtn, KeyboardShortcuts, MenuList, PillBtn, Popup, SidePanel, TEXT_FONT, Toolbar, useG, type MenuPos } from "./ui";

type Val = string | number | boolean | null;
const HEAD_W = 46;
const HEAD_H = 21;
const COL_W = 100;
const ROW_H = 21;

/* ------------------------------------------------------------------ */
/* Computed values: pivot tables, conditional formats                  */
/* ------------------------------------------------------------------ */

const FN_LABEL: Record<string, string> = { Sum: "SUM", Count: "COUNTA", Average: "AVERAGE", Max: "MAX", Min: "MIN" };

export function pivotCells(book: ExcelBook, sheet: ExcelSheet): Record<string, { v: Val; bold?: boolean; fill?: string }> {
  const pv = sheet.pivot;
  const out: Record<string, { v: Val; bold?: boolean; fill?: string }> = {};
  if (!pv) return out;
  const src = book.sheets.find((s) => s.name === pv.source.sheet);
  const rc = parseRange(pv.source.range);
  if (!src || !rc) return out;
  const at = parseRef(pv.at ?? "A1") ?? { c: 1, r: 1 };
  const head: string[] = [];
  for (let c = rc.c1; c <= rc.c2; c++) head.push(String(src.cells[refOf(c, rc.r1)]?.v ?? numToCol(c)));
  const col = (name: string) => rc.c1 + head.indexOf(name);
  const rows: number[] = [];
  for (let r = rc.r1 + 1; r <= rc.r2; r++) rows.push(r);
  const rowField = pv.rows[0];
  const values = pv.values;
  if (!rowField && !values.length) return out;
  const keyOf = (r: number) => (rowField ? String(evaluateCell(book, src, refOf(col(rowField), r)) ?? "") : "");
  const groups = Array.from(new Set(rows.map(keyOf))).filter((k) => k !== "").sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const agg = (fn: string, nums: Val[]) => {
    const n = nums.filter((x): x is number => typeof x === "number");
    if (fn === "Count") return nums.filter((x) => x !== null && x !== "").length;
    if (!n.length) return 0;
    if (fn === "Average") return n.reduce((a, b) => a + b, 0) / n.length;
    if (fn === "Max") return Math.max(...n);
    if (fn === "Min") return Math.min(...n);
    return n.reduce((a, b) => a + b, 0);
  };
  const put = (c: number, r: number, v: Val, bold?: boolean, fill?: string) => (out[refOf(at.c + c, at.r + r)] = { v, bold, fill });
  put(0, 0, rowField ?? "", true, "#e8eaed");
  values.forEach((vf, i) => put(1 + i, 0, `${FN_LABEL[vf.fn] ?? vf.fn.toUpperCase()} of ${vf.field}`, true, "#e8eaed"));
  const list = rowField ? groups : [""];
  list.forEach((gk, gi) => {
    put(0, 1 + gi, gk);
    values.forEach((vf, i) => put(1 + i, 1 + gi, agg(vf.fn, rows.filter((r) => !rowField || keyOf(r) === gk).map((r) => evaluateCell(book, src, refOf(col(vf.field), r))))));
  });
  put(0, 1 + list.length, "Grand Total", true, "#e8eaed");
  values.forEach((vf, i) => put(1 + i, 1 + list.length, agg(vf.fn, rows.map((r) => evaluateCell(book, src, refOf(col(vf.field), r)))), true, "#e8eaed"));
  return out;
}

function cfMatch(rule: GCF, v: Val): boolean {
  const cond = rule.rule.toLowerCase();
  const empty = v === null || v === "";
  const sv = String(v ?? "").toLowerCase();
  const target = String(rule.value ?? "").toLowerCase();
  const num = typeof v === "number" ? v : Number(v);
  const tn = Number(rule.value);
  const isNum = typeof v === "number" || (!empty && !Number.isNaN(num));
  switch (cond) {
    case "is empty": return empty;
    case "is not empty": return !empty;
    case "text contains": return !empty && sv.includes(target);
    case "text does not contain": return !sv.includes(target);
    case "text starts with": return sv.startsWith(target);
    case "text ends with": return sv.endsWith(target);
    case "text is exactly": return sv === target;
    case "greater than": return isNum && num > tn;
    case "greater than or equal to": return isNum && num >= tn;
    case "less than": return isNum && num < tn;
    case "less than or equal to": return isNum && num <= tn;
    case "is equal to":
    case "equal to": return isNum && !Number.isNaN(tn) ? num === tn : sv === target;
    case "is not equal to": return isNum && !Number.isNaN(tn) ? num !== tn : sv !== target;
    case "is between":
    case "between": {
      const [a, b] = String(rule.value ?? "").includes("|") ? String(rule.value).split("|").map(Number) : [tn, Number(rule.value2)];
      return isNum && num >= Math.min(a, b) && num <= Math.max(a, b);
    }
    case "is not between": {
      const a = tn, b = Number(rule.value2);
      return isNum && (num < Math.min(a, b) || num > Math.max(a, b));
    }
  }
  return false;
}

function cfStyles(book: ExcelBook, sheet: ExcelSheet): Record<string, { fill?: string; color?: string; bold?: boolean }> {
  const out: Record<string, { fill?: string; color?: string; bold?: boolean }> = {};
  for (const rule of (sheet.cf ?? []) as GCF[]) {
    const rc = parseRange(rule.range);
    if (!rc) continue;
    if (rule.rule === "Color scale") {
      const nums: number[] = [];
      for (let r = rc.r1; r <= rc.r2; r++) for (let c = rc.c1; c <= rc.c2; c++) { const v = evaluateCell(book, sheet, refOf(c, r)); if (typeof v === "number") nums.push(v); }
      const lo = Math.min(...nums), hi = Math.max(...nums);
      for (let r = rc.r1; r <= rc.r2; r++) for (let c = rc.c1; c <= rc.c2; c++) {
        const v = evaluateCell(book, sheet, refOf(c, r));
        if (typeof v !== "number" || hi === lo) continue;
        const t = (v - lo) / (hi - lo);
        const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
        out[refOf(c, r)] = { fill: `rgb(${mix(255, 87)},${mix(255, 187)},${mix(255, 138)})` };
      }
      continue;
    }
    for (let r = rc.r1; r <= Math.min(rc.r2, rc.r1 + 400); r++)
      for (let c = rc.c1; c <= rc.c2; c++) {
        const ref = refOf(c, r);
        if (out[ref]) continue;
        if (cfMatch(rule, evaluateCell(book, sheet, ref))) out[ref] = { fill: rule.fill, color: rule.color, bold: rule.bold };
      }
  }
  return out;
}

function validationAt(sheet: ExcelSheet, c: number, r: number): { range: string; rule: NonNullable<ExcelSheet["validation"]>[string] } | undefined {
  for (const [range, rule] of Object.entries(sheet.validation ?? {})) {
    const rc = parseRange(range);
    if (rc && c >= rc.c1 && c <= rc.c2 && r >= rc.r1 && r <= rc.r2) return { range, rule };
  }
  return undefined;
}

const CHIP_COLORS = ["#e8eaed", "#c6dbe1", "#ffcfc9", "#d4edbc", "#ffe5a0", "#bfe1f6", "#e6cff2", "#ffc8aa"];

/* ------------------------------------------------------------------ */
/* Charts                                                              */
/* ------------------------------------------------------------------ */

const PAL = ["#4285f4", "#ea4335", "#fbbc04", "#34a853", "#ff6d01", "#46bdc6"];

function chartData(book: ExcelBook, sheet: ExcelSheet, ch: ExcelChart, pv: Record<string, { v: Val }>) {
  if (ch.range === "PIVOT") {
    const at = parseRef(sheet.pivot?.at ?? "A1") ?? { c: 1, r: 1 };
    const cats: string[] = [];
    const vals: number[] = [];
    for (let r = at.r + 1; ; r++) {
      const k = pv[refOf(at.c, r)]?.v;
      if (k === undefined || k === "Grand Total") break;
      cats.push(String(k));
      vals.push(Number(pv[refOf(at.c + 1, r)]?.v ?? 0));
    }
    return { cats, series: [{ name: String(pv[refOf(at.c + 1, at.r)]?.v ?? "Total"), vals }] };
  }
  const src = ch.range.includes("!") ? book.sheets.find((s) => s.name === ch.range.split("!")[0].replace(/'/g, "")) ?? sheet : sheet;
  const rc = parseRange(ch.range.replace(/^.*!/, ""));
  if (!rc) return { cats: [], series: [] };
  const hasHead = rc.r2 > rc.r1 && typeof evaluateCell(book, src, refOf(rc.c2, rc.r1)) !== "number";
  const r0 = hasHead ? rc.r1 + 1 : rc.r1;
  const labelCol = rc.c2 > rc.c1 && typeof evaluateCell(book, src, refOf(rc.c1, r0)) !== "number";
  const cats: string[] = [];
  for (let r = r0; r <= rc.r2; r++) cats.push(labelCol ? String(evaluateCell(book, src, refOf(rc.c1, r)) ?? "") : String(r - r0 + 1));
  const series: { name: string; vals: number[] }[] = [];
  for (let c = labelCol ? rc.c1 + 1 : rc.c1; c <= rc.c2; c++) {
    const vals: number[] = [];
    for (let r = r0; r <= rc.r2; r++) { const v = evaluateCell(book, src, refOf(c, r)); vals.push(typeof v === "number" ? v : 0); }
    if (vals.some((v) => v !== 0)) series.push({ name: hasHead ? String(evaluateCell(book, src, refOf(c, rc.r1)) ?? "") : `Series ${series.length + 1}`, vals });
  }
  return { cats, series };
}

export function SheetChart({ book, sheet, ch, selected, onSelect, onOpen, pv }: { book: ExcelBook; sheet: ExcelSheet; ch: ExcelChart; selected: boolean; onSelect?: () => void; onOpen?: () => void; pv: Record<string, { v: Val }> }) {
  const { cats, series } = chartData(book, sheet, ch, pv);
  const type = ch.type.toLowerCase();
  const max = Math.max(1, ...series.flatMap((s) => (type.includes("stacked") ? cats.map((_, i) => series.reduce((a, x) => a + (x.vals[i] ?? 0), 0)) : s.vals)));
  let plot: React.ReactNode;
  if (type.includes("pie") || type.includes("doughnut")) {
    const vals = series[0]?.vals ?? [];
    const total = vals.reduce((a, b) => a + b, 0) || 1;
    let acc = 0;
    const stops = vals.map((v, i) => { const a = (acc / total) * 100; acc += v; return `${PAL[i % PAL.length]} ${a}% ${(acc / total) * 100}%`; });
    plot = (
      <div className="flex h-full items-center gap-4 px-4">
        <div className="relative aspect-square h-[80%] rounded-full" style={{ background: `conic-gradient(${stops.join(",")})` }}>{type.includes("doughnut") && <div className="absolute inset-[30%] rounded-full bg-white" />}</div>
        <div className="space-y-1 text-[11px]">{cats.map((c, i) => <div key={i} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: PAL[i % PAL.length] }} />{c}</div>)}</div>
      </div>
    );
  } else if (type.includes("line") || type.includes("area") || type.includes("scatter")) {
    const n = cats.length;
    plot = (
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-full">
        {[15, 30, 45].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#e0e0e0" strokeWidth="0.3" />)}
        {series.map((s, si) => {
          const pts = s.vals.map((v, i) => `${n === 1 ? 50 : 4 + (i / (n - 1)) * 92},${58 - (v / max) * 52}`);
          return type.includes("scatter") ? (
            pts.map((p, i) => <circle key={`${si}-${i}`} cx={p.split(",")[0]} cy={p.split(",")[1]} r="1.2" fill={PAL[si % PAL.length]} />)
          ) : type.includes("area") ? (
            <polygon key={si} points={`4,58 ${pts.join(" ")} 96,58`} fill={PAL[si % PAL.length]} opacity="0.5" />
          ) : (
            <polyline key={si} points={pts.join(" ")} fill="none" stroke={PAL[si % PAL.length]} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          );
        })}
      </svg>
    );
  } else if (type.includes("table")) {
    plot = (
      <table className="w-full text-[11px]"><tbody>{cats.map((c, i) => <tr key={i} className="border-b border-[#e0e0e0]"><td className="px-2">{c}</td>{series.map((s, j) => <td key={j} className="px-2 text-right">{s.vals[i]}</td>)}</tr>)}</tbody></table>
    );
  } else if (type.includes("bar")) {
    plot = (
      <div className="flex h-full flex-col justify-around gap-1 py-1 pr-4">
        {cats.map((c, i) => (
          <div key={i} className="flex items-center gap-1 text-[10px]">
            <span className="w-16 shrink-0 truncate text-right text-[#5f6368]">{c}</span>
            <div className="flex flex-1 flex-col gap-[1px]">{series.map((s, si) => <span key={si} className="h-2" style={{ width: `${(s.vals[i] / max) * 100}%`, background: PAL[si % PAL.length] }} />)}</div>
          </div>
        ))}
      </div>
    );
  } else {
    plot = (
      <div className="flex h-full items-end gap-2 border-b border-[#9aa0a6] px-3">
        {cats.map((c, i) => (
          <div key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
            <div className={`flex h-full w-full items-end justify-center ${type.includes("stacked") ? "flex-col-reverse items-stretch justify-start" : "gap-[1px]"}`}>
              {series.map((s, si) => <div key={si} style={{ height: `${((s.vals[i] ?? 0) / max) * 100}%`, width: type.includes("stacked") ? "100%" : `${100 / series.length}%`, background: PAL[si % PAL.length] }} />)}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={ch.title || "Chart"}
      onMouseDown={(e) => { e.stopPropagation(); onSelect?.(); }}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen?.(); }}
      className={`flex h-full w-full flex-col bg-white p-2 ${selected ? "outline outline-2 outline-[#1a73e8]" : "outline outline-1 outline-[#dadce0]"}`}
      style={{ fontFamily: "Roboto, Arial" }}
    >
      <div className="mb-1 truncate text-center text-[13px] text-[#1f1f1f]">{ch.title ?? ""}</div>
      <div className="min-h-0 flex-1">{plot}</div>
      {!type.includes("pie") && !type.includes("doughnut") && !type.includes("bar") && !type.includes("table") && (
        <div className="mt-1 flex justify-around text-[10px] text-[#5f6368]">{cats.slice(0, 12).map((c, i) => <span key={i} className="truncate">{c}</span>)}</div>
      )}
      {series.length > 1 && <div className="mt-1 flex justify-center gap-3 text-[10px]">{series.map((s, i) => <span key={i} className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: PAL[i % PAL.length] }} />{s.name}</span>)}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid                                                                */
/* ------------------------------------------------------------------ */

function cellRaw(sheet: ExcelSheet, ref: string): string {
  const c = sheet.cells[ref];
  if (!c) return "";
  if (c.f) return c.f;
  if (c.v === undefined) return "";
  if (typeof c.v === "number" && c.fmt?.numFmt === "Percentage") return `${+(c.v * 100).toFixed(4)}%`;
  return String(c.v);
}

export interface GridProps {
  book: ExcelBook;
  sheet: ExcelSheet;
  file: GFile;
  interactive?: boolean;
  selection?: string;
  edit?: { ref: string; text: string } | null;
  setEdit?: (e: { ref: string; text: string } | null) => void;
  commitEdit?: (move: "down" | "right" | "none") => void;
  onCellDown?: (ref: string, e: React.MouseEvent) => void;
  onCellEnter?: (ref: string) => void;
  onHeader?: (kind: "col" | "row" | "all", key: string, e: React.MouseEvent) => void;
  onContext?: (e: React.MouseEvent, ref: string, kind: "cell" | "col" | "row") => void;
  onFilter?: (col: string, e: React.MouseEvent) => void;
  onChip?: (ref: string, items: string[], e: React.MouseEvent) => void;
  onCheckbox?: (ref: string) => void;
  onFillStart?: (e: React.MouseEvent) => void;
  fillPreview?: Rect | null;
  onChart?: (id: string, open?: boolean) => void;
  filterViewId?: string;
  showProtected?: boolean;
  zoom?: number;
}

/** Header color of a table made with Format › Convert to table. */
const TABLE_HEAD = "#3d6b8f";

export function SheetGrid(p: GridProps) {
  const { book, sheet, interactive, selection = "A1" } = p;
  const z = p.zoom ?? 1;
  const used = usedRect(sheet);
  const pv = useMemo(() => pivotCells(book, sheet), [book, sheet]);
  const pvMax = Object.keys(pv).reduce((m, k) => { const q = parseRef(k)!; return { c: Math.max(m.c, q.c), r: Math.max(m.r, q.r) }; }, { c: 0, r: 0 });
  const nCols = Math.max(sheet.cols ?? 12, (used?.c2 ?? 0) + 3, pvMax.c + 2);
  const nRows = Math.max(sheet.rows ?? 30, (used?.r2 ?? 0) + 8, pvMax.r + 4);
  const cf = useMemo(() => cfStyles(book, sheet), [book, sheet]);
  const fv = p.filterViewId ? (p.file.filterViews ?? []).find((x) => x.id === p.filterViewId) : undefined;
  const hidden = useMemo(() => {
    const view = fv ? { ...sheet, filter: fv.range, filterValues: fv.values ?? {} } : sheet;
    const out = filterHiddenRows(book, view as ExcelSheet);
    for (const r of sheet.hiddenRows ?? []) out.add(r);
    return out;
  }, [book, sheet, fv]);
  const filterRect = fv ? parseRange(fv.range) : sheet.filter ? parseRange(sheet.filter) : null;
  const tableRect = sheet.table?.style === "Google table" ? parseRange(sheet.table.range) : null;
  const filterVals = fv ? fv.values ?? {} : sheet.filterValues ?? {};
  const merges = (sheet.merges ?? []).map((m) => parseRange(m)).filter(Boolean) as Rect[];
  const coveredBy = (c: number, r: number) => merges.find((m) => c >= m.c1 && c <= m.c2 && r >= m.r1 && r <= m.r2);
  const freeze = sheet.freeze ? parseRef(sheet.freeze) : null;
  const fRows = freeze ? freeze.r - 1 : 0, fCols = freeze ? freeze.c - 1 : 0;
  const colW = (c: number) => (sheet.hiddenCols?.includes(numToCol(c)) ? 0 : (sheet.colWidths?.[numToCol(c)] ?? COL_W) * z);
  const rowH = (r: number) => (sheet.rowHeights?.[String(r)] ?? ROW_H) * z;
  const selR = selection.startsWith("chart:") ? null : selRect(sheet, selection);
  const act = parseRef(activeCell({ selection }));
  const alt = book.flags?.[`alt:${sheet.name}`] ? parseRange(String(book.flags[`alt:${sheet.name}`])) : null;
  const protectedRects = (p.file.protected ?? []).filter((x) => x.sheet === sheet.name).map((x) => (x.range ? parseRange(x.range) : { c1: 1, r1: 1, c2: nCols, r2: nRows })).filter(Boolean) as Rect[];
  const colLeft = (c: number) => { let x = HEAD_W; for (let k = 1; k < c; k++) x += colW(k); return x; };
  const rowTop = (r: number) => { let y = HEAD_H; for (let k = 1; k < r; k++) if (!hidden.has(k)) y += rowH(k); return y; };
  const gridlines = sheet.gridlines !== false;
  const inSel = (c: number, r: number) => Boolean(selR && c >= selR.c1 && c <= selR.c2 && r >= selR.r1 && r <= selR.r2);
  const comments = (p.file.comments ?? []).filter((x) => !x.resolved);

  const rowsEls: React.ReactNode[] = [];
  for (let r = 1; r <= nRows; r++) {
    if (hidden.has(r)) continue;
    const tds: React.ReactNode[] = [];
    const rowSel = Boolean(selR && r >= selR.r1 && r <= selR.r2);
    tds.push(
      <th
        key="h"
        onMouseDown={interactive ? (e) => p.onHeader?.("row", String(r), e) : undefined}
        onContextMenu={interactive ? (e) => p.onContext?.(e, `A${r}`, "row") : undefined}
        className="sticky left-0 z-[3] select-none border-b border-r border-[#c0c0c0] text-center text-[11px] font-normal"
        style={{ background: rowSel ? "#d3e3fd" : "#f8f9fa", color: rowSel ? "#0b57d0" : "#444746", height: rowH(r), width: HEAD_W, top: r <= fRows ? rowTop(r) : undefined, position: "sticky", zIndex: r <= fRows ? 5 : 3, borderBottom: r === fRows ? "4px solid #c0c0c0" : undefined }}
      >
        {r}
      </th>,
    );
    for (let c = 1; c <= nCols; c++) {
      if (sheet.hiddenCols?.includes(numToCol(c))) continue;
      const m = coveredBy(c, r);
      if (m && (m.c1 !== c || m.r1 !== r)) continue;
      const ref = refOf(c, r);
      const cell = sheet.cells[ref];
      const virt = pv[ref];
      const fmt = (cell?.fmt ?? {}) as GCellFmt;
      const v: Val = virt ? virt.v : cell ? (cell.f ? evaluateCell(book, sheet, ref) : cell.v ?? null) : null;
      const val = validationAt(sheet, c, r);
      const isCheckbox = val?.rule.type === "Checkbox";
      const chipStyle = val?.rule.type === "List" ? String(book.flags?.[`vstyle:${sheet.name}!${val.range}`] ?? "Chip") : null;
      let text = sheet.showFormulas && cell?.f ? cell.f : formatValue(v, fmt as CellFormat);
      if (fmt.numFmt === "Currency" && fmt.decimals === 0 && typeof v === "number") text = `$${Math.round(v).toLocaleString("en-US")}`;
      const isNum = typeof v === "number";
      const cfs = cf[ref];
      let bg = cfs?.fill ?? fmt.fill ?? virt?.fill;
      if (!bg && alt && c >= alt.c1 && c <= alt.c2 && r >= alt.r1 && r <= alt.r2) bg = r === alt.r1 ? "#bdbdbd" : (r - alt.r1) % 2 === 0 ? "#f3f3f3" : "#ffffff";
      const inTable = tableRect && c >= tableRect.c1 && c <= tableRect.c2 && r >= tableRect.r1 && r <= tableRect.r2;
      if (inTable && !bg) bg = r === tableRect!.r1 ? TABLE_HEAD : (r - tableRect!.r1) % 2 === 0 ? "#f4f6fb" : "#ffffff";
      const headerFilter = filterRect && r === filterRect.r1 && c >= filterRect.c1 && c <= filterRect.c2;
      if (headerFilter && !bg) bg = fv ? "#e8eaed" : "#e6f4ea";
      const selected = inSel(c, r);
      const isAct = act && act.c === c && act.r === r;
      const edges: string[] = [];
      if (selR && selected && !(selR.c1 === selR.c2 && selR.r1 === selR.r2)) {
        if (r === selR.r1) edges.push("inset 0 2px 0 #1a73e8");
        if (r === (m ? m.r2 : selR.r2) || r === selR.r2) edges.push("inset 0 -2px 0 #1a73e8");
        if (c === selR.c1) edges.push("inset 2px 0 0 #1a73e8");
        if (c === selR.c2 || (m && m.c2 === selR.c2)) edges.push("inset -2px 0 0 #1a73e8");
      }
      if (isAct) edges.push("inset 0 0 0 2px #1a73e8");
      const inFill = p.fillPreview && c >= p.fillPreview.c1 && c <= p.fillPreview.c2 && r >= p.fillPreview.r1 && r <= p.fillPreview.r2;
      const prot = p.showProtected && protectedRects.some((q) => c >= q.c1 && c <= q.c2 && r >= q.r1 && r <= q.r2);
      const hasComment = comments.some((x) => x.anchor === ref);
      const editing = p.edit?.ref === ref;
      const frozenR = r <= fRows, frozenC = c <= fCols;
      const align = fmt.align ?? (isNum ? "right" : typeof v === "boolean" ? "center" : "left");
      const chipIdx = chipStyle === "Chip" && v !== null && v !== "" ? Math.max(0, (val?.rule.list ?? []).indexOf(String(v))) : 0;
      tds.push(
        <td
          key={c}
          data-cell={ref}
          colSpan={m ? m.c2 - m.c1 + 1 : undefined}
          rowSpan={m ? m.r2 - m.r1 + 1 : undefined}
          onMouseDown={interactive ? (e) => p.onCellDown?.(ref, e) : undefined}
          onMouseEnter={interactive ? () => p.onCellEnter?.(ref) : undefined}
          onDoubleClick={interactive ? () => p.setEdit?.({ ref, text: cellRaw(sheet, ref) }) : undefined}
          onContextMenu={interactive ? (e) => p.onContext?.(e, ref, "cell") : undefined}
          title={cell?.note ?? undefined}
          className="relative overflow-hidden"
          style={{
            height: rowH(r),
            maxWidth: m ? undefined : colW(c),
            padding: "0 3px",
            background: `${prot ? "repeating-linear-gradient(135deg, rgba(0,0,0,.06) 0 2px, transparent 2px 6px)," : ""}${inFill ? "rgba(26,115,232,.08)" : selected && !isAct ? (bg ? `linear-gradient(rgba(14,101,235,.1),rgba(14,101,235,.1)),${bg}` : "rgba(14,101,235,.1)") : bg ?? "#fff"}`,
            borderRight: gridlines ? "1px solid #e2e3e3" : "1px solid transparent",
            borderBottom: fmt.border === "bottom" || fmt.border === "all" || fmt.border === "thickBottom" ? `${fmt.border === "thickBottom" ? 2 : 1}px solid #000` : r === fRows ? "4px solid #c0c0c0" : gridlines ? "1px solid #e2e3e3" : "1px solid transparent",
            borderTop: fmt.border === "top" || fmt.border === "all" ? "1px solid #000" : undefined,
            borderLeft: fmt.border === "all" ? "1px solid #000" : undefined,
            outline: fmt.border === "outside" ? "1px solid #000" : undefined,
            outlineOffset: -1,
            boxShadow: edges.join(",") || undefined,
            color: cfs?.color ?? fmt.color ?? (inTable && r === tableRect!.r1 ? "#ffffff" : typeof v === "string" && v.startsWith("#") && cell?.f ? "#d93025" : "#000"),
            fontWeight: fmt.bold || cfs?.bold || virt?.bold || (inTable && r === tableRect!.r1) ? 700 : 400,
            fontStyle: fmt.italic ? "italic" : undefined,
            textDecoration: [fmt.underline ? "underline" : "", fmt.strike ? "line-through" : ""].filter(Boolean).join(" ") || undefined,
            fontFamily: fmt.font ? `'${fmt.font}', Arial` : "Arial",
            fontSize: (fmt.size ?? 10) * 1.333 * z,
            textAlign: align,
            verticalAlign: fmt.valign === "top" ? "top" : fmt.valign === "middle" ? "middle" : "bottom",
            whiteSpace: fmt.wrap ? "normal" : "nowrap",
            lineHeight: fmt.wrap ? 1.2 : `${rowH(r) - 2}px`,
            position: frozenR || frozenC ? "sticky" : "relative",
            top: frozenR ? rowTop(r) : undefined,
            left: frozenC ? colLeft(c) : undefined,
            zIndex: frozenR && frozenC ? 4 : frozenR || frozenC ? 2 : undefined,
            borderRightWidth: c === fCols ? 4 : undefined,
            borderRightColor: c === fCols ? "#c0c0c0" : undefined,
          }}
        >
          {editing ? (
            <CellInput value={p.edit!.text} onChange={(t) => p.setEdit?.({ ref, text: t })} onCommit={(mv) => p.commitEdit?.(mv)} onCancel={() => p.setEdit?.(null)} />
          ) : isCheckbox ? (
            <span className="flex h-full items-center justify-center">
              <input type="checkbox" aria-label={`Checkbox ${ref}`} checked={String(v).toUpperCase() === "TRUE"} onMouseDown={(e) => e.stopPropagation()} onChange={() => p.onCheckbox?.(ref)} className="h-3.5 w-3.5 accent-[#1a73e8]" />
            </span>
          ) : chipStyle === "Chip" ? (
            <span className="inline-flex max-w-full items-center gap-0.5 rounded-full px-2 align-middle text-[12px] leading-[17px]" style={{ background: v === null || v === "" ? "transparent" : CHIP_COLORS[chipIdx % CHIP_COLORS.length] }}>
              <span className="truncate">{text}</span>
              {interactive && (
                <button type="button" aria-label={`Open dropdown ${ref}`} onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); p.onChip?.(ref, val?.rule.list ?? [], e); }} className="flex items-center">
                  <GIcon name="dropDown" size={14} color="#444746" />
                </button>
              )}
            </span>
          ) : (
            <>
              <span className={fmt.wrap ? "" : "pointer-events-none"}>{text}</span>
              {chipStyle === "Arrow" && interactive && (
                <button type="button" aria-label={`Open dropdown ${ref}`} onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); p.onChip?.(ref, val?.rule.list ?? [], e); }} className="absolute right-0.5 top-1/2 -translate-y-1/2">
                  <GIcon name="dropDown" size={16} color="#5f6368" />
                </button>
              )}
            </>
          )}
          {hasComment && <span className="absolute right-0 top-0 h-0 w-0 border-l-[7px] border-t-[7px] border-l-transparent border-t-[#fbbc04]" />}
          {cell?.note && <span className="absolute right-0 top-0 h-0 w-0 border-l-[6px] border-t-[6px] border-l-transparent border-t-black" />}
          {headerFilter && interactive && (
            <button
              type="button"
              aria-label={`Filter ${numToCol(c)}`}
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); p.onFilter?.(numToCol(c), e); }}
              className="absolute right-0.5 top-1/2 flex h-[15px] w-[15px] -translate-y-1/2 items-center justify-center rounded-sm"
              style={{ background: filterVals[numToCol(c)] ? "#188038" : "transparent" }}
            >
              <GIcon name={filterVals[numToCol(c)] ? "filterView" : "filter"} size={13} color={filterVals[numToCol(c)] ? "#fff" : "#188038"} />
            </button>
          )}
          {interactive && selR && !p.edit && c === selR.c2 && r === selR.r2 && (
            <span onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); p.onFillStart?.(e); }} className="absolute -bottom-[3px] -right-[3px] z-[3] h-[7px] w-[7px] cursor-crosshair rounded-full border border-white bg-[#1a73e8]" aria-hidden="true" />
          )}
        </td>,
      );
    }
    rowsEls.push(<tr key={r}>{tds}</tr>);
  }

  const cols: React.ReactNode[] = [];
  for (let c = 1; c <= nCols; c++) {
    if (sheet.hiddenCols?.includes(numToCol(c))) continue;
    const colSel = Boolean(selR && c >= selR.c1 && c <= selR.c2);
    cols.push(
      <th
        key={c}
        onMouseDown={interactive ? (e) => p.onHeader?.("col", numToCol(c), e) : undefined}
        onContextMenu={interactive ? (e) => p.onContext?.(e, `${numToCol(c)}1`, "col") : undefined}
        className="sticky top-0 select-none border-b border-r border-[#c0c0c0] text-center text-[11px] font-normal"
        style={{ width: colW(c), minWidth: colW(c), height: HEAD_H, background: colSel ? "#d3e3fd" : "#f8f9fa", color: colSel ? "#0b57d0" : "#444746", zIndex: c <= fCols ? 6 : 4, left: c <= fCols ? colLeft(c) : undefined, borderRight: c === fCols ? "4px solid #c0c0c0" : undefined }}
      >
        {numToCol(c)}
      </th>,
    );
  }

  return (
    <div className="relative" style={{ width: "max-content" }}>
      <table className="border-separate" style={{ borderSpacing: 0, tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th
              onMouseDown={interactive ? (e) => p.onHeader?.("all", "", e) : undefined}
              className="sticky left-0 top-0 z-[7] border-b border-r border-[#c0c0c0] bg-[#f8f9fa]"
              style={{ width: HEAD_W, minWidth: HEAD_W, height: HEAD_H, borderRight: fCols ? undefined : undefined, borderBottom: fRows === 0 ? undefined : undefined }}
              aria-label="Select all"
            />
            {cols}
          </tr>
        </thead>
        <tbody>{rowsEls}</tbody>
      </table>
      {tableRect && (
        <div className="absolute z-[8] flex h-[18px] items-center gap-1 rounded-t px-2 text-[11px] font-medium text-white" style={{ left: colLeft(tableRect.c1), top: Math.max(0, rowTop(tableRect.r1) - 18), background: TABLE_HEAD }} aria-label={`Table ${sheet.table?.name ?? ""}`}>
          <GIcon name="table" size={12} color="#fff" /> {sheet.table?.name}
        </div>
      )}
      {(sheet.charts ?? []).map((ch) => {
        const at = parseRef(ch.at ?? "F2") ?? { c: 6, r: 2 };
        return (
          <div key={ch.id} className="absolute z-[8]" style={{ left: colLeft(at.c), top: rowTop(at.r), width: 380 * z, height: 230 * z }}>
            <SheetChart book={book} sheet={sheet} ch={ch} pv={pv} selected={selection === `chart:${ch.id}`} onSelect={() => p.onChart?.(ch.id)} onOpen={() => p.onChart?.(ch.id, true)} />
          </div>
        );
      })}
    </div>
  );
}

function CellInput({ value, onChange, onCommit, onCancel }: { value: string; onChange: (v: string) => void; onCommit: (m: "down" | "right" | "none") => void; onCancel: () => void }) {
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
      className="absolute inset-0 z-[6] h-full min-w-full bg-white px-[3px] outline-none"
      style={{ font: "inherit", boxShadow: "inset 0 0 0 2px #1a73e8", width: "max-content" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Sheets surface                                                      */
/* ------------------------------------------------------------------ */

export function SheetsSurface({ composer, setComposer, noteFor, setNoteFor }: { composer: boolean; setComposer: (v: boolean) => void; noteFor: string | null; setNoteFor: (r: string | null) => void }) {
  const g = useG();
  const { doc, ui } = g;
  const f = openFile(doc)!;
  const book = asBook(f);
  const sheet = sheetOf(book, ui);
  const sel = ui.selection || "A1";
  const act = activeCell(ui);
  const [edit, setEditState] = useState<{ ref: string; text: string; bar?: boolean } | null>(null);
  const editRef = useRef(edit);
  const setEdit = (e: { ref: string; text: string; bar?: boolean } | null) => { editRef.current = e; setEditState(e); };
  const drag = useRef<{ mode: "select" | "fill" | "point"; anchor: string; src?: Rect; target?: Rect; base?: number } | null>(null);
  const [fillPreview, setFillPreview] = useState<Rect | null>(null);
  const [menu, setMenu] = useState<{ kind: "filter" | "chip" | "cell" | "tab" | "sheets"; pos: MenuPos; col?: string; ref?: string; items?: string[]; tab?: string; cellKind?: "cell" | "col" | "row" } | null>(null);
  const [renaming, setRenaming] = useState<{ name: string; text: string } | null>(null);
  const [nameBox, setNameBox] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const fvId = doc.flags?.filterView ? String(doc.flags.filterView) : undefined;
  const fv = activeFilterView(doc, f, sheet);
  useEffect(() => { editRef.current = null; setEditState(null); }, [doc]);
  useEffect(() => {
    const up = () => {
      const d = drag.current;
      drag.current = null;
      if (d?.mode === "fill") {
        setFillPreview(null);
        if (d.target && d.src && rectToRange(d.target) !== rectToRange(d.src)) g.cmd("excel.fill", rectToRange(d.target));
      }
    };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  });

  const focusGrid = () => gridRef.current?.focus({ preventScroll: true });
  const commitEdit = (move: "down" | "right" | "none" = "down") => {
    const e = editRef.current;
    if (!e) return;
    setEdit(null);
    const raw = cellRaw(sheet, e.ref);
    if (e.text !== raw) {
      const p = parseRef(e.ref)!;
      const v = validationAt(sheet, p.c, p.r);
      const reject = v && book.flags?.[`vreject:${sheet.name}!${v.range}`];
      if (reject && v.rule.type === "List" && e.text.trim() && !(v.rule.list ?? []).some((x) => x.toLowerCase() === e.text.trim().toLowerCase())) {
        setMsg(`There was a problem. The data you entered in cell ${e.ref} violates the data validation rules set on this cell.`);
        focusGrid();
        return;
      }
      g.onCommit({ kind: "type", target: e.ref, value: e.text });
    }
    const p = parseRef(e.ref)!;
    if (move === "down") g.onSelect({ selection: refOf(p.c, p.r + 1) });
    if (move === "right") g.onSelect({ selection: refOf(p.c + 1, p.r) });
    focusGrid();
  };
  const startEdit = (text?: string) => {
    if (sel.startsWith("chart:") || doc.mode === "Viewing") return;
    setEdit({ ref: act, text: text ?? cellRaw(sheet, act) });
  };
  g.hooksRef.current.type = (k: string) => (k === "\n" ? startEdit() : startEdit(k));
  g.hooksRef.current.fn = (name: string) => setEdit({ ref: act, text: `=${name}(` });

  const cellDown = (ref: string, e: React.MouseEvent) => {
    if (e.button === 2) return;
    e.preventDefault();
    setMsg(null);
    const ed = editRef.current;
    if (ed && ed.text.startsWith("=") && ed.ref !== ref) {
      drag.current = { mode: "point", anchor: ref, base: ed.text.length };
      setEdit({ ...ed, text: ed.text + ref });
      return;
    }
    if (ed) commitEdit("none");
    if (e.shiftKey) {
      const a = parseRef(act)!, b = parseRef(ref)!;
      g.onSelect({ selection: rectToRange({ c1: Math.min(a.c, b.c), r1: Math.min(a.r, b.r), c2: Math.max(a.c, b.c), r2: Math.max(a.r, b.r) }) });
    } else {
      drag.current = { mode: "select", anchor: ref };
      g.onSelect({ selection: ref });
      if (book.painter) g.cmd("home.formatPainter.apply");
    }
    focusGrid();
  };
  const cellEnter = (ref: string) => {
    const d = drag.current;
    if (!d) return;
    const a = parseRef(d.anchor)!, b = parseRef(ref)!;
    const rect = { c1: Math.min(a.c, b.c), r1: Math.min(a.r, b.r), c2: Math.max(a.c, b.c), r2: Math.max(a.r, b.r) };
    if (d.mode === "select") g.onSelect({ selection: rectToRange(rect) });
    else if (d.mode === "point") {
      const ed = editRef.current;
      if (ed) setEdit({ ...ed, text: ed.text.slice(0, d.base) + rectToRange(rect) });
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
  const header = (kind: "col" | "row" | "all", key: string, e: React.MouseEvent) => {
    if (e.button === 2) return;
    e.preventDefault();
    if (editRef.current) commitEdit("none");
    if (kind === "all") g.onSelect({ selection: `A1:${numToCol(Math.max(12, usedRect(sheet)?.c2 ?? 1))}${Math.max(30, usedRect(sheet)?.r2 ?? 1)}` });
    else g.onSelect({ selection: `${key}:${key}` });
    focusGrid();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (edit || renaming) return;
    const k = e.key;
    const ctrl = e.ctrlKey || e.metaKey;
    const p = parseRef(act) ?? { c: 1, r: 1 };
    const sr = selRect(sheet, sel);
    const go = (dc: number, dr: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey && sr) {
        const rc = { ...sr };
        if (dr > 0) rc.r2++; if (dr < 0) rc.r1 = Math.max(1, rc.r1 - 1); if (dc > 0) rc.c2++; if (dc < 0) rc.c1 = Math.max(1, rc.c1 - 1);
        g.onSelect({ selection: rectToRange(rc) });
      } else g.onSelect({ selection: refOf(Math.max(1, p.c + dc), Math.max(1, p.r + dr)) });
    };
    if (ctrl && k.toLowerCase() === "a") { e.preventDefault(); e.stopPropagation(); const rc = currentRegion(sheet, act); g.onSelect({ selection: rc ? rectToRange(rc) : "A1" }); return; }
    if (ctrl && k.toLowerCase() === "d") { e.preventDefault(); e.stopPropagation(); g.cmd("home.fillSeries", "Down"); return; }
    if (ctrl || e.altKey) return;
    if (k === "ArrowUp") return go(0, -1);
    if (k === "ArrowDown" || k === "Enter") return go(0, 1);
    if (k === "ArrowLeft") return go(-1, 0);
    if (k === "ArrowRight" || k === "Tab") return go(1, 0);
    if (k === "Delete" || k === "Backspace") {
      e.preventDefault();
      e.stopPropagation();
      if (sel.startsWith("chart:")) g.cmd("chart.delete");
      else g.cmd("edit.clearContents");
      return;
    }
    if (k === "F2") { e.preventDefault(); e.stopPropagation(); startEdit(); return; }
    if (k.length === 1) { e.preventDefault(); e.stopPropagation(); startEdit(k); }
  };

  const ctxEntries = (kind: "cell" | "col" | "row") => {
    const col = act.replace(/\d+/g, ""), row = act.replace(/[A-Z]+/g, "");
    return [
      { label: "Cut", icon: "cut", command: "home.cut", shortcut: "Ctrl+X" },
      { label: "Copy", icon: "copy", command: "home.copy", shortcut: "Ctrl+C" },
      { label: "Paste", icon: "paste", command: "home.paste", shortcut: "Ctrl+V" },
      { label: "Paste special", icon: "paste", sub: [{ label: "Values only", command: "home.paste", value: "Values", shortcut: "Ctrl+Shift+V" }, { label: "Format only", command: "home.paste", value: "Formatting", shortcut: "Ctrl+Alt+V" }] },
      { sep: true as const },
      ...(kind !== "col" ? [{ label: "Insert 1 row above", icon: "plus", command: "home.insert", value: "Insert 1 row above" }, { label: "Insert 1 row below", icon: "plus", command: "home.insert", value: "Insert 1 row below" }] : []),
      ...(kind !== "row" ? [{ label: "Insert 1 column left", icon: "plus", command: "home.insert", value: "Insert 1 column left" }, { label: "Insert 1 column right", icon: "plus", command: "home.insert", value: "Insert 1 column right" }] : []),
      ...(kind !== "col" ? [{ label: `Delete row${kind === "row" ? "" : ` ${row}`}`, icon: "trash", command: "home.delete", value: "Delete Sheet Rows" }] : []),
      ...(kind !== "row" ? [{ label: `Delete column${kind === "col" ? "" : ` ${col}`}`, icon: "trash", command: "home.delete", value: "Delete Sheet Columns" }] : []),
      { sep: true as const },
      ...(kind === "col" ? [{ label: "Sort sheet A to Z", icon: "sort", command: "data.sortAsc" }, { label: "Sort sheet Z to A", icon: "sort", command: "data.sortDesc" }, { sep: true as const }] : []),
      { label: "Create a filter", icon: "filter", command: "data.filter" },
      { sep: true as const },
      { label: "Insert link", icon: "link", action: "link", shortcut: "Ctrl+K" },
      { label: "Comment", icon: "addComment", action: "comment", shortcut: "Ctrl+Alt+M" },
      { label: "Insert note", icon: "note", action: "note", shortcut: "Shift+F2" },
      { sep: true as const },
      { label: "Conditional formatting", icon: "cf", command: "g.pane", value: "Conditional format rules" },
      { label: "Data validation", icon: "validation", command: "g.pane", value: "Data validation rules" },
      { label: "Protect range", icon: "lock", command: "g.pane", value: "Protected sheets and ranges" },
    ];
  };

  const tabMenu = (name: string) => [
    { label: "Delete", command: "sheet.delete" },
    { label: "Duplicate", command: "sheet.duplicate" },
    { label: "Rename", action: "renameSheet" },
    { label: "Change color", sub: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].map((c) => ({ label: c, command: "sheet.tabColor", value: c })) },
    { label: "Protect sheet", command: "g.pane", value: "Protected sheets and ranges" },
    { label: "Hide sheet", command: "sheet.hide" },
    { sep: true as const },
    { label: "Move right", command: "sheet.move", value: `${name}@${Math.min(book.sheets.length, book.sheets.findIndex((s) => s.name === name) + 2)}` },
    { label: "Move left", command: "sheet.move", value: `${name}@${Math.max(1, book.sheets.findIndex((s) => s.name === name))}` },
  ];

  const formula = edit ? edit.text : sel.startsWith("chart:") ? "" : cellRaw(sheet, act);
  const pane = doc.pane;
  const stats = (() => {
    const rc = selRect(sheet, sel);
    if (!rc || (rc.c1 === rc.c2 && rc.r1 === rc.r2)) return null;
    let sum = 0, n = 0;
    let first: CellFormat | undefined;
    for (let r = rc.r1; r <= Math.min(rc.r2, rc.r1 + 300); r++) for (let c = rc.c1; c <= rc.c2; c++) { const v = evaluateCell(book, sheet, refOf(c, r)); if (typeof v === "number") { if (!n) first = sheet.cells[refOf(c, r)]?.fmt as CellFormat | undefined; sum += v; n++; } }
    if (!n) return null;
    // Sheets shows the sum in the format of the first number in the selection.
    const shown = first?.numFmt && first.numFmt !== "General" ? formatValue(Math.round(sum * 100) / 100, first) : sum.toLocaleString("en-US", { maximumFractionDigits: 2 });
    return `Sum: ${shown}`;
  })();

  const side = pane && ["Comments", "Details", "Conditional format rules", "Data validation rules", "Protected sheets and ranges", "Chart editor", "Pivot table editor"].includes(pane) ? pane : null;
  const fullScreen = viewOn(doc, "fullScreen");
  return (
    <div className="flex h-full flex-col bg-[#f9fbfd]">
      {!fullScreen && <EditorHeader menus={SHEETS_MENUS} />}
      {!fullScreen && <Toolbar tools={SHEETS_TOOLBAR} />}
      {fullScreen && <button type="button" onClick={() => g.cmd("g.view", "fullScreen")} className="absolute right-3 top-2 z-20 rounded-full bg-[#303030] px-4 py-1.5 text-[13px] text-white">Exit full screen</button>}
      {fv && (
        <div className="flex h-9 shrink-0 items-center gap-3 bg-[#5f6368] px-3 text-[13px] text-white">
          {fv.saved === false ? (
            <span className="rounded bg-[#4a4d51] px-2 py-0.5">Temporary view</span>
          ) : (
            <>
              <span>Name:</span>
              <input aria-label="Filter view name" defaultValue={fv.name} key={fv.id + fv.name} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") e.currentTarget.blur(); }} onBlur={(e) => { if (e.currentTarget.value !== fv.name) g.onCommit({ kind: "type", target: `filterview:${fv.id}`, value: e.currentTarget.value }); }} className="h-6 w-32 rounded bg-[#4a4d51] px-2 text-white outline-none" />
            </>
          )}
          <span>Range: {fv.range}</span>
          <span className="flex-1" />
          {fv.saved === false && (
            saving !== null ? (
              <span className="flex items-center gap-2" role="dialog" aria-label="Save view">
                <input autoFocus aria-label="View name" value={saving} onChange={(e) => setSaving(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && saving.trim()) { g.onCommit({ kind: "type", target: `filterview:${fv.id}`, value: saving.trim() }); setSaving(null); } if (e.key === "Escape") setSaving(null); }} className="h-6 w-40 rounded bg-white px-2 text-[#1f1f1f] outline-none" />
                <button type="button" onClick={() => { if (saving.trim()) { g.onCommit({ kind: "type", target: `filterview:${fv.id}`, value: saving.trim() }); setSaving(null); } }} className="rounded-full bg-[#a8c7fa] px-3 py-0.5 font-medium text-[#062e6f]">Save</button>
              </span>
            ) : (
              <button type="button" onClick={() => setSaving(fv.name)} className="rounded-full border border-white/70 px-3 py-0.5 font-medium">Save view</button>
            )
          )}
          <IconBtn icon="close" label="Close filter view" color="#fff" onClick={() => g.cmd("g.filterView.close")} />
        </div>
      )}
      {(doc.flags?.formulaBar ?? true) !== false && (
        <div className="flex h-[30px] shrink-0 items-center border-y border-[#e0e0e0] bg-white text-[13px]">
          <input
            aria-label="Name box"
            value={nameBox ?? (sel.startsWith("chart:") ? "" : sel.includes(":") && !/^[A-Z]+:[A-Z]+$|^\d+:\d+$/.test(sel) ? sel : act)}
            onFocus={(e) => { setNameBox(e.currentTarget.value); e.currentTarget.select(); }}
            onChange={(e) => setNameBox(e.target.value)}
            onBlur={() => setNameBox(null)}
            onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { const v = e.currentTarget.value.toUpperCase().replace(/\$/g, ""); if (/^[A-Z]+\d+(:[A-Z]+\d+)?$/.test(v)) g.onSelect({ selection: v }); setNameBox(null); focusGrid(); } }}
            className="h-full w-24 border-r border-[#e0e0e0] px-2 outline-none focus:ring-2 focus:ring-inset focus:ring-[#1a73e8]"
          />
          <span className="px-2 text-[15px] italic text-[#5f6368]" style={{ fontFamily: "serif" }}>fx</span>
          <input
            aria-label="Formula bar"
            value={formula}
            onFocus={() => { if (!edit && !sel.startsWith("chart:")) setEdit({ ref: act, text: cellRaw(sheet, act), bar: true }); }}
            onChange={(e) => setEdit({ ref: edit?.ref ?? act, text: e.target.value, bar: true })}
            onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); commitEdit("down"); } if (e.key === "Escape") { setEdit(null); focusGrid(); } }}
            className="h-full min-w-0 flex-1 px-1 outline-none"
          />
        </div>
      )}
      <div className="flex min-h-0 flex-1">
        <div className="relative flex min-w-0 flex-1 flex-col">
          <div ref={gridRef} tabIndex={0} onKeyDown={onKeyDown} className="relative min-h-0 flex-1 overflow-auto bg-white outline-none" aria-label="Spreadsheet grid">
            <SheetGrid
              book={book}
              sheet={sheet}
              file={f}
              interactive
              selection={sel}
              edit={edit && !edit.bar ? edit : null}
              setEdit={(e) => { if (doc.mode === "Viewing") return; if (e) g.onSelect({ selection: e.ref }); setEdit(e); }}
              commitEdit={commitEdit}
              onCellDown={cellDown}
              onCellEnter={cellEnter}
              onHeader={header}
              onContext={(e, ref, kind) => {
                e.preventDefault();
                const rc = selRect(sheet, sel);
                const q = parseRef(ref)!;
                const inside = rc && q.c >= rc.c1 && q.c <= rc.c2 && q.r >= rc.r1 && q.r <= rc.r2;
                if (!inside) g.onSelect({ selection: kind === "col" ? `${numToCol(q.c)}:${numToCol(q.c)}` : kind === "row" ? `${q.r}:${q.r}` : ref });
                setMenu({ kind: "cell", pos: { x: e.clientX, y: e.clientY }, cellKind: kind });
              }}
              onFilter={(col, e) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setMenu({ kind: "filter", col, pos: { x: r.left - 200, y: r.bottom + 2 } }); }}
              onChip={(ref, items, e) => { g.onSelect({ selection: ref }); const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setMenu({ kind: "chip", ref, items, pos: { x: r.left - 60, y: r.bottom + 4 } }); }}
              onCheckbox={(ref) => { g.onSelect({ selection: ref }); g.onCommit({ kind: "type", target: ref, value: String(evaluateCell(book, sheet, ref)).toUpperCase() === "TRUE" ? "FALSE" : "TRUE" }); }}
              onFillStart={() => { const rc = selRect(sheet, sel); if (rc) drag.current = { mode: "fill", anchor: refOf(rc.c1, rc.r1), src: rc }; }}
              fillPreview={fillPreview}
              onChart={(id, open) => { g.onSelect({ selection: `chart:${id}` }); if (open) g.cmd("g.pane", "Chart editor"); focusGrid(); }}
              filterViewId={fvId}
              showProtected={viewOn(doc, "protectedRanges")}
              zoom={(sheet.zoom ?? 100) / 100}
            />
            {msg && (
              <div className="sticky bottom-2 left-2 z-20 m-2 flex w-fit max-w-md items-start gap-2 rounded bg-[#fce8e6] p-3 text-[13px] text-[#a50e0e] shadow">
                <span className="flex-1">{msg}</span>
                <button type="button" aria-label="Dismiss" onClick={() => setMsg(null)}><GIcon name="close" size={16} color="#a50e0e" /></button>
              </div>
            )}
          </div>
          {(composer || noteFor) && (
            <div className="absolute right-4 top-4 z-30 w-[280px]">
              {composer ? (
                <CommentComposer onCancel={() => setComposer(false)} />
              ) : (
                <NoteEditor cell={noteFor!} initial={sheet.cells[noteFor!]?.note ?? ""} onDone={(t) => { setNoteFor(null); if (t !== (sheet.cells[noteFor!]?.note ?? "")) g.onCommit({ kind: "type", target: `note:${noteFor}`, value: t }); }} />
              )}
            </div>
          )}
          {!composer && !noteFor && (() => {
            const c = (f.comments ?? []).find((x) => !x.resolved && x.anchor === act && !sel.includes(":"));
            return c ? <div className="absolute right-4 top-4 z-30 w-[280px]"><CommentCard c={c} active onActivate={() => undefined} /></div> : null;
          })()}
          {/* Sheet tabs */}
          <div className="flex h-10 shrink-0 items-center gap-1 border-t border-[#e0e0e0] bg-[#f9fbfd] px-2 text-[13px]" role="tablist" aria-label="Sheets">
            <IconBtn icon="plus" label="Add Sheet" onClick={() => g.cmd("sheet.add")} />
            <IconBtn icon="menu" label="All Sheets" onClick={(e) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setMenu({ kind: "sheets", pos: { x: r.left, y: r.top - 8 - book.sheets.length * 32 } }); }} />
            {book.sheets.filter((s) => doc.flags?.hiddenSheet !== s.name && book.flags?.hiddenSheet !== s.name).map((s) => {
              const on = s.name === sheet.name;
              return renaming?.name === s.name ? (
                <input
                  key={s.name}
                  autoFocus
                  aria-label="Sheet name"
                  value={renaming.text}
                  onChange={(e) => setRenaming({ ...renaming, text: e.target.value })}
                  onBlur={() => { if (renaming.text.trim() && renaming.text !== s.name) g.onCommit({ kind: "type", target: `sheet:${s.name}`, value: renaming.text.trim() }); setRenaming(null); }}
                  onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") e.currentTarget.blur(); if (e.key === "Escape") setRenaming(null); }}
                  className="h-8 w-28 rounded border-2 border-[#1a73e8] px-2 outline-none"
                />
              ) : (
                <button
                  key={s.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={s.name}
                  onClick={() => g.onSelect({ sheet: s.name, selection: "A1" })}
                  onDoubleClick={() => setRenaming({ name: s.name, text: s.name })}
                  onContextMenu={(e) => { e.preventDefault(); g.onSelect({ sheet: s.name, selection: "A1" }); setMenu({ kind: "tab", tab: s.name, pos: { x: e.clientX, y: e.clientY - 300 } }); }}
                  className={`flex h-8 items-center gap-1 rounded-t px-3 ${on ? "bg-[#e1e9f7] font-medium text-[#0b57d0]" : "text-[#444746] hover:bg-[#e9eef6]"}`}
                  style={{ borderBottom: s.tabColor ? `3px solid ${s.tabColor}` : undefined }}
                >
                  {s.name}
                  {on && (
                    <span role="button" aria-label={`${s.name} options`} onClick={(e) => { e.stopPropagation(); const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setMenu({ kind: "tab", tab: s.name, pos: { x: r.left, y: r.top - 300 } }); }}>
                      <GIcon name="dropDown" size={16} color="#0b57d0" />
                    </span>
                  )}
                </button>
              );
            })}
            <span className="flex-1" />
            {stats && <span className="rounded bg-white px-3 py-1 text-[12px] text-[#444746] shadow-sm">{stats}</span>}
          </div>
        </div>
        {side === "Comments" && <CommentsPanel quoteOf={(a) => a} />}
        {side === "Details" && <DetailsPanel />}
        {side === "Conditional format rules" && <CfPanel sheet={sheet} />}
        {side === "Data validation rules" && <ValidationPanel book={book} sheet={sheet} />}
        {side === "Protected sheets and ranges" && <ProtectPanel f={f} sheet={sheet} />}
        {side === "Chart editor" && <ChartEditor sheet={sheet} />}
        {side === "Pivot table editor" && <PivotEditor book={book} sheet={sheet} />}
      </div>
      {pane === "Keyboard shortcuts" && <KeyboardShortcuts />}
      {menu && (
        <Popup onClose={() => setMenu(null)}>
          {menu.kind === "filter" ? (
            <FilterMenu book={book} sheet={sheet} col={menu.col!} pos={menu.pos} fvValues={fv?.values} filterRange={fv?.range ?? sheet.filter ?? ""} onClose={() => setMenu(null)} />
          ) : menu.kind === "chip" ? (
            <MenuList entries={(menu.items ?? []).map((x) => ({ label: x, value: x }))} pos={menu.pos} width={180} onPick={(i) => { setMenu(null); g.onCommit({ kind: "type", target: menu.ref!, value: String(i.value) }); focusGrid(); }} onClose={() => setMenu(null)} />
          ) : menu.kind === "sheets" ? (
            <MenuList entries={book.sheets.map((s) => ({ label: s.name, value: s.name, check: s.name === sheet.name ? "on" : undefined }))} state={{ on: true }} pos={menu.pos} width={200} onPick={(i) => { setMenu(null); g.onSelect({ sheet: String(i.value), selection: "A1" }); }} onClose={() => setMenu(null)} />
          ) : menu.kind === "tab" ? (
            <MenuList entries={tabMenu(menu.tab!) as never} pos={menu.pos} width={220} onPick={(i) => { setMenu(null); if (i.action === "renameSheet") setRenaming({ name: menu.tab!, text: menu.tab! }); else if (i.command) g.cmd(i.command, i.value); }} onClose={() => setMenu(null)} />
          ) : (
            <MenuList entries={ctxEntries(menu.cellKind ?? "cell") as never} pos={menu.pos} width={280} onPick={(i) => { setMenu(null); if (i.action) g.act(i.action); else if (i.command) g.cmd(i.command, i.value); }} onClose={() => setMenu(null)} />
          )}
        </Popup>
      )}
    </div>
  );
}

function NoteEditor({ cell, initial, onDone }: { cell: string; initial: string; onDone: (t: string) => void }) {
  const [t, setT] = useState(initial);
  return (
    <div className="rounded bg-white p-3 shadow-lg" onMouseDown={(e) => e.stopPropagation()}>
      <div className="mb-1 text-[12px] text-[#5f6368]">Note on {cell}</div>
      <textarea autoFocus aria-label="Note" value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onDone(t.trim()); } }} rows={3} className="w-full resize-none border border-[#747775] p-2 text-[13px] outline-none" />
      <div className="mt-2 flex justify-end"><PillBtn onClick={() => onDone(t.trim())}>Done</PillBtn></div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Menus and panels                                                    */
/* ------------------------------------------------------------------ */

function FilterMenu({ book, sheet, col, pos, onClose, fvValues, filterRange }: { book: ExcelBook; sheet: ExcelSheet; col: string; pos: MenuPos; onClose: () => void; fvValues?: Record<string, string[]>; filterRange: string }) {
  const g = useG();
  const rc = parseRange(filterRange);
  const c = parseRef(`${col}1`)!.c;
  const values: string[] = [];
  if (rc) for (let r = rc.r1 + 1; r <= rc.r2; r++) { const v = evaluateCell(book, sheet, refOf(c, r)); values.push(v === null || v === "" ? "(Blanks)" : formatValue(v, sheet.cells[refOf(c, r)]?.fmt)); }
  const unique = Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const current = (fvValues ?? sheet.filterValues ?? {})[col];
  const [checked, setChecked] = useState<Set<string>>(() => new Set(current && !current[0]?.startsWith("~") ? current : unique));
  const [search, setSearch] = useState("");
  const [cond, setCond] = useState<{ op: string; v: string }>({ op: "None", v: "" });
  const [section, setSection] = useState<"values" | "condition">("values");
  const ops: Record<string, string> = { "Greater than": ">", "Greater than or equal to": ">=", "Less than": "<", "Less than or equal to": "<=", "Is equal to": "=", "Text contains": "contains" };
  const ok = () => {
    if (section === "condition" && cond.op !== "None" && cond.v.trim()) {
      const op = ops[cond.op];
      g.cmd("filter.by", op === "contains" ? `${col}~contains ${cond.v.trim()}` : `${col}~${op}${cond.v.trim()}`);
    } else {
      const all = unique.every((u) => checked.has(u));
      g.cmd("filter.by", all ? `${col}=*` : `${col}=${unique.filter((u) => checked.has(u)).join("|")}`);
    }
    onClose();
  };
  return (
    <div className="fixed z-[200] w-[260px] rounded-md bg-white py-2 text-[13px] shadow-lg" style={{ left: Math.max(8, pos.x), top: pos.y, fontFamily: TEXT_FONT }} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label={`Filter column ${col}`}>
      <button type="button" onClick={() => { g.cmd("filter.sort", `${col}:asc`); onClose(); }} className="flex w-full px-4 py-1.5 text-left hover:bg-[#f1f3f4]">Sort A → Z</button>
      <button type="button" onClick={() => { g.cmd("filter.sort", `${col}:desc`); onClose(); }} className="flex w-full px-4 py-1.5 text-left hover:bg-[#f1f3f4]">Sort Z → A</button>
      <div className="my-1 border-t border-[#e0e0e0]" />
      <button type="button" onClick={() => setSection(section === "condition" ? "values" : "condition")} className="flex w-full items-center px-4 py-1.5 text-left hover:bg-[#f1f3f4]"><GIcon name={section === "condition" ? "expand" : "chevronRight"} size={16} /> Filter by condition</button>
      {section === "condition" && (
        <div className="px-4 pb-2">
          <select aria-label="Condition" value={cond.op} onChange={(e) => setCond({ ...cond, op: e.target.value })} className="mb-2 h-8 w-full rounded border border-[#747775] px-1">
            {["None", ...Object.keys(ops)].map((o) => <option key={o}>{o}</option>)}
          </select>
          {cond.op !== "None" && <input aria-label="Value or formula" placeholder="Value or formula" value={cond.v} onChange={(e) => setCond({ ...cond, v: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-8 w-full rounded border border-[#747775] px-2" />}
        </div>
      )}
      <button type="button" onClick={() => setSection(section === "values" ? "condition" : "values")} className="flex w-full items-center px-4 py-1.5 text-left hover:bg-[#f1f3f4]"><GIcon name={section === "values" ? "expand" : "chevronRight"} size={16} /> Filter by values</button>
      {section === "values" && (
        <div className="px-4">
          <div className="mb-1 flex gap-3 text-[12px] text-[#0b57d0]">
            <button type="button" onClick={() => setChecked(new Set(unique))}>Select all</button>
            <button type="button" onClick={() => setChecked(new Set())}>Clear</button>
          </div>
          <input aria-label="Search values" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="mb-1 h-7 w-full rounded border border-[#747775] px-2" />
          <div className="max-h-40 overflow-auto">
            {unique.filter((u) => u.toLowerCase().includes(search.toLowerCase())).map((u) => (
              <label key={u} className="flex items-center gap-2 py-0.5">
                <input type="checkbox" aria-label={u} checked={checked.has(u)} onChange={(e) => { const n = new Set(checked); if (e.target.checked) n.add(u); else n.delete(u); setChecked(n); }} className="accent-[#188038]" />
                {u}
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="mt-2 flex justify-end gap-2 border-t border-[#e0e0e0] px-3 pt-2">
        <PillBtn kind="text" onClick={onClose}>Cancel</PillBtn>
        <PillBtn onClick={ok}>OK</PillBtn>
      </div>
    </div>
  );
}

function useRangeOf() {
  const g = useG();
  const f = openFile(g.doc)!;
  const book = asBook(f);
  const sheet = sheetOf(book, g.ui);
  const rc = g.ui.selection.includes(":") ? selRect(sheet, g.ui.selection) : regionOf(sheet, g.ui);
  return rc ? rectToRange(rc) : activeCell(g.ui);
}

function CfPanel({ sheet }: { sheet: ExcelSheet }) {
  const g = useG();
  const sel = useRangeOf();
  const [adding, setAdding] = useState((sheet.cf ?? []).length === 0);
  const [v, setV] = useState({ type: "Single color", range: sel, condition: "Is not empty", value: "", value2: "", style: "Default" });
  const done = () => {
    g.onCommit({ kind: "dialog", id: "g.cf", values: { ...v } });
    setAdding(false);
  };
  return (
    <SidePanel title="Conditional format rules" onClose={() => g.cmd("g.pane", "")}>
      {!adding ? (
        <>
          {(sheet.cf ?? []).map((r, i) => (
            <div key={i} className="mb-2 flex items-center gap-3 rounded border border-[#e0e0e0] p-2">
              <span className="flex h-8 w-8 items-center justify-center rounded text-[12px]" style={{ background: r.fill ?? "#fff", color: r.color }}>123</span>
              <span className="flex-1 text-[13px]"><span className="block">{r.rule}{r.value !== undefined ? ` ${r.value}` : ""}</span><span className="block text-[12px] text-[#5f6368]">{r.range}</span></span>
            </div>
          ))}
          <button type="button" onClick={() => { setV({ ...v, range: sel }); setAdding(true); }} className="mt-2 flex items-center gap-2 text-[14px] text-[#0b57d0]"><GIcon name="plus" size={18} color="#0b57d0" /> Add another rule</button>
        </>
      ) : (
        <div className="text-[13px]">
          <div className="mb-3 flex border-b border-[#e0e0e0]">
            {["Single color", "Color scale"].map((t) => <button key={t} type="button" onClick={() => setV({ ...v, type: t })} className={`mr-4 border-b-[3px] pb-1.5 ${v.type === t ? "border-[#0b57d0] text-[#0b57d0]" : "border-transparent"}`}>{t}</button>)}
          </div>
          <label className="mb-1 block font-medium">Apply to range</label>
          <input aria-label="Apply to range" value={v.range} onChange={(e) => setV({ ...v, range: e.target.value.toUpperCase() })} onKeyDown={(e) => e.stopPropagation()} className="mb-3 h-9 w-full rounded border border-[#747775] px-2" />
          {v.type === "Single color" ? (
            <>
              <label className="mb-1 block font-medium">Format cells if…</label>
              <select aria-label="Format cells if" value={v.condition} onChange={(e) => setV({ ...v, condition: e.target.value })} className="mb-2 h-9 w-full rounded border border-[#747775] px-1">
                {CF_CONDITIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              {!["Is empty", "Is not empty"].includes(v.condition) && <input aria-label="Value or formula" placeholder="Value or formula" value={v.value} onChange={(e) => setV({ ...v, value: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="mb-2 h-9 w-full rounded border border-[#747775] px-2" />}
              {v.condition.includes("between") && <input aria-label="And" placeholder="And" value={v.value2} onChange={(e) => setV({ ...v, value2: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="mb-2 h-9 w-full rounded border border-[#747775] px-2" />}
              <label className="mb-1 mt-2 block font-medium">Formatting style</label>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {Object.entries(CF_STYLES).map(([k, st]) => (
                  <button key={k} type="button" title={k} aria-label={k} aria-pressed={v.style === k} onClick={() => setV({ ...v, style: k })} className={`h-8 rounded px-2 text-[12px] ${v.style === k ? "ring-2 ring-[#0b57d0]" : "ring-1 ring-[#dadce0]"}`} style={{ background: st.fill ?? "#fff", color: st.color, fontWeight: st.bold ? 700 : 400 }}>
                    {k}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="mb-3 h-6 rounded" style={{ background: "linear-gradient(90deg,#fff,#57bb8a)" }} aria-label="White to green" />
          )}
          <div className="flex justify-end gap-2">
            <PillBtn kind="text" onClick={() => setAdding(false)}>Cancel</PillBtn>
            <PillBtn onClick={done}>Done</PillBtn>
          </div>
        </div>
      )}
    </SidePanel>
  );
}

function ValidationPanel({ book, sheet }: { book: ExcelBook; sheet: ExcelSheet }) {
  const g = useG();
  const sel = g.ui.selection.includes(":") ? g.ui.selection : activeCell(g.ui);
  const rules = Object.entries(sheet.validation ?? {});
  const [adding, setAdding] = useState(rules.length === 0);
  const [v, setV] = useState({ range: sel, criteria: "Dropdown", items: ["", ""], min: "", max: "", invalid: "Show a warning", style: "Chip", advanced: false });
  const done = () => {
    g.onCommit({ kind: "dialog", id: "g.validation", values: { range: v.range, criteria: v.criteria, items: v.items.map((x) => x.trim()).filter(Boolean).join(", "), min: v.min, max: v.max, invalid: v.invalid, style: v.style } });
    setAdding(false);
  };
  return (
    <SidePanel title="Data validation rules" onClose={() => g.cmd("g.pane", "")}>
      {!adding ? (
        <>
          {rules.map(([range, r]) => (
            <div key={range} className="mb-2 rounded border border-[#e0e0e0] p-2 text-[13px]">
              <div className="font-medium">{range}</div>
              <div className="text-[#5f6368]">{r.type === "List" ? `Dropdown: ${(r.list ?? []).join(", ")}` : r.type}{book.flags?.[`vreject:${sheet.name}!${range}`] ? " · Reject input" : ""}</div>
            </div>
          ))}
          <PillBtn kind="outlined" onClick={() => { setV({ ...v, range: sel }); setAdding(true); }}><GIcon name="plus" size={18} color="#0b57d0" /> Add rule</PillBtn>
        </>
      ) : (
        <div className="text-[13px]">
          <label className="mb-1 block font-medium">Apply to range</label>
          <input aria-label="Apply to range" value={v.range} onChange={(e) => setV({ ...v, range: e.target.value.toUpperCase() })} onKeyDown={(e) => e.stopPropagation()} className="mb-3 h-9 w-full rounded border border-[#747775] px-2" />
          <label className="mb-1 block font-medium">Criteria</label>
          <select aria-label="Criteria" value={v.criteria} onChange={(e) => setV({ ...v, criteria: e.target.value })} className="mb-2 h-9 w-full rounded border border-[#747775] px-1">
            {VALIDATION_CRITERIA.map((o) => <option key={o}>{o}</option>)}
          </select>
          {v.criteria === "Dropdown" && (
            <>
              {v.items.map((it, i) => (
                <div key={i} className="mb-1.5 flex items-center gap-2">
                  <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: CHIP_COLORS[i % CHIP_COLORS.length] }} />
                  <input aria-label={`Option ${i + 1}`} placeholder={`Option ${i + 1}`} value={it} onChange={(e) => setV({ ...v, items: v.items.map((x, k) => (k === i ? e.target.value : x)) })} onKeyDown={(e) => e.stopPropagation()} className="h-8 min-w-0 flex-1 rounded border border-[#747775] px-2" />
                </div>
              ))}
              <PillBtn kind="text" onClick={() => setV({ ...v, items: [...v.items, ""] })}>Add another item</PillBtn>
            </>
          )}
          {v.criteria === "Dropdown (from a range)" && <input aria-label="Range" placeholder="e.g. Lists!A2:A6" value={v.items[0]} onChange={(e) => setV({ ...v, items: [e.target.value] })} onKeyDown={(e) => e.stopPropagation()} className="mb-2 h-8 w-full rounded border border-[#747775] px-2" />}
          {v.criteria.startsWith("Number") && (
            <div className="mb-2 flex gap-2">
              <input aria-label="Minimum" placeholder="Min" value={v.min} onChange={(e) => setV({ ...v, min: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-8 w-1/2 rounded border border-[#747775] px-2" />
              {v.criteria === "Number between" && <input aria-label="Maximum" placeholder="Max" value={v.max} onChange={(e) => setV({ ...v, max: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-8 w-1/2 rounded border border-[#747775] px-2" />}
            </div>
          )}
          <button type="button" onClick={() => setV({ ...v, advanced: !v.advanced })} className="my-2 flex items-center gap-1 font-medium"><GIcon name={v.advanced ? "expand" : "chevronRight"} size={18} /> Advanced options</button>
          {v.advanced && (
            <div className="mb-3 pl-2">
              <p className="mb-1 font-medium">If the data is invalid:</p>
              {["Show a warning", "Reject the input"].map((o) => <label key={o} className="flex items-center gap-2 py-0.5"><input type="radio" aria-label={o} checked={v.invalid === o} onChange={() => setV({ ...v, invalid: o })} className="accent-[#0b57d0]" />{o}</label>)}
              <p className="mb-1 mt-2 font-medium">Display style</p>
              {["Chip", "Arrow", "Plain text"].map((o) => <label key={o} className="flex items-center gap-2 py-0.5"><input type="radio" aria-label={o} checked={v.style === o} onChange={() => setV({ ...v, style: o })} className="accent-[#0b57d0]" />{o}</label>)}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <PillBtn kind="text" onClick={() => setAdding(false)}>Cancel</PillBtn>
            <PillBtn onClick={done}>Done</PillBtn>
          </div>
        </div>
      )}
    </SidePanel>
  );
}

function ProtectPanel({ f, sheet }: { f: GFile; sheet: ExcelSheet }) {
  const g = useG();
  const sel = useRangeOf();
  const list = f.protected ?? [];
  const [step, setStep] = useState<0 | 1 | 2>(list.length ? 0 : 1);
  const [v, setV] = useState({ description: "", kind: "Range", range: sel, mode: "Restrict who can edit this range", editors: "Only you" });
  const done = () => {
    g.onCommit({ kind: "dialog", id: "g.protect", values: { ...v } });
    setStep(0);
  };
  return (
    <SidePanel title="Protected sheets and ranges" onClose={() => g.cmd("g.pane", "")}>
      {step === 0 && (
        <>
          {list.map((p) => (
            <div key={p.id} className="mb-2 flex items-start gap-2 rounded border border-[#e0e0e0] p-2 text-[13px]">
              <GIcon name="lock" size={18} />
              <span className="flex-1"><span className="block font-medium">{p.description || (p.range ? `${p.sheet}!${p.range}` : p.sheet)}</span><span className="block text-[#5f6368]">{p.range ? `${p.sheet}!${p.range}` : `Sheet: ${p.sheet}`} · {p.mode === "warning" ? "Warning only" : "Only you can edit"}</span></span>
            </div>
          ))}
          <button type="button" onClick={() => { setV({ ...v, range: sel }); setStep(1); }} className="mt-2 flex items-center gap-2 text-[14px] text-[#0b57d0]"><GIcon name="plus" size={18} color="#0b57d0" /> Add a sheet or range</button>
        </>
      )}
      {step === 1 && (
        <div className="text-[13px]">
          <input aria-label="Enter a description" placeholder="Enter a description" value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="mb-3 h-9 w-full rounded border border-[#747775] px-2" />
          <div className="mb-3 flex border-b border-[#e0e0e0]">
            {["Range", "Sheet"].map((t) => <button key={t} type="button" onClick={() => setV({ ...v, kind: t })} className={`mr-4 border-b-[3px] pb-1.5 ${v.kind === t ? "border-[#0b57d0] text-[#0b57d0]" : "border-transparent"}`}>{t}</button>)}
          </div>
          {v.kind === "Range" ? <input aria-label="Range" value={v.range} onChange={(e) => setV({ ...v, range: e.target.value.toUpperCase() })} onKeyDown={(e) => e.stopPropagation()} className="mb-3 h-9 w-full rounded border border-[#747775] px-2" /> : <p className="mb-3">{sheet.name}</p>}
          <div className="flex justify-end gap-2">
            <PillBtn kind="text" onClick={() => setStep(list.length ? 0 : 1)}>Cancel</PillBtn>
            <PillBtn onClick={() => setStep(2)}>Set permissions</PillBtn>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="text-[13px]">
          <p className="mb-2 font-medium">Range editing permissions</p>
          {["Show a warning when editing this range", "Restrict who can edit this range"].map((o) => <label key={o} className="mb-1 flex items-center gap-2"><input type="radio" aria-label={o} checked={v.mode === o} onChange={() => setV({ ...v, mode: o })} className="accent-[#0b57d0]" />{o}</label>)}
          {v.mode.startsWith("Restrict") && (
            <select aria-label="Who can edit" value={v.editors} onChange={(e) => setV({ ...v, editors: e.target.value })} className="mb-3 ml-6 mt-1 h-9 rounded border border-[#747775] px-1">
              <option>Only you</option>
              <option>Custom</option>
            </select>
          )}
          <div className="mt-3 flex justify-end gap-2">
            <PillBtn kind="text" onClick={() => setStep(1)}>Cancel</PillBtn>
            <PillBtn onClick={done}>Done</PillBtn>
          </div>
        </div>
      )}
    </SidePanel>
  );
}

function ChartEditor({ sheet }: { sheet: ExcelSheet }) {
  const g = useG();
  const id = g.ui.selection.startsWith("chart:") ? g.ui.selection.slice(6) : sheet.charts?.[sheet.charts.length - 1]?.id;
  const ch = sheet.charts?.find((c) => c.id === id);
  const [tab, setTab] = useState<"Setup" | "Customize">("Setup");
  const [title, setTitle] = useState(ch?.title ?? "");
  useEffect(() => setTitle(ch?.title ?? ""), [ch?.title]);
  if (!ch) return <SidePanel title="Chart editor" onClose={() => g.cmd("g.pane", "")}><p className="text-[13px] text-[#5f6368]">Select a chart to edit it.</p></SidePanel>;
  const sel = () => g.onSelect({ selection: `chart:${ch.id}` });
  return (
    <SidePanel title="Chart editor" onClose={() => g.cmd("g.pane", "")}>
      <div className="mb-3 flex border-b border-[#e0e0e0]">
        {(["Setup", "Customize"] as const).map((t) => <button key={t} type="button" onClick={() => setTab(t)} className={`mr-5 border-b-[3px] pb-1.5 text-[14px] ${tab === t ? "border-[#0b57d0] text-[#0b57d0]" : "border-transparent text-[#444746]"}`}>{t}</button>)}
      </div>
      {tab === "Setup" ? (
        <div className="text-[13px]">
          <label className="mb-1 block font-medium">Chart type</label>
          <select aria-label="Chart type" value={CHART_TYPES.includes(ch.type) ? ch.type : "Column chart"} onChange={(e) => { sel(); g.cmd("chart.type", e.target.value); }} className="mb-3 h-9 w-full rounded border border-[#747775] px-1">
            {CHART_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <label className="mb-1 block font-medium">Data range</label>
          <div className="mb-3 rounded border border-[#747775] px-2 py-2">{ch.range === "PIVOT" ? "Pivot table" : ch.range}</div>
        </div>
      ) : (
        <div className="text-[13px]">
          <p className="mb-2 font-medium">Chart &amp; axis titles</p>
          <label className="mb-1 block text-[12px] text-[#444746]">Title text</label>
          <input aria-label="Title text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { sel(); g.onCommit({ kind: "type", target: `chart:${ch.id}.title`, value: title }); } }} onBlur={() => { if (title !== (ch.title ?? "")) { sel(); g.onCommit({ kind: "type", target: `chart:${ch.id}.title`, value: title }); } }} className="mb-3 h-9 w-full rounded border border-[#747775] px-2" />
        </div>
      )}
    </SidePanel>
  );
}

function PivotEditor({ book, sheet }: { book: ExcelBook; sheet: ExcelSheet }) {
  const g = useG();
  const pv = sheet.pivot;
  const [add, setAdd] = useState<{ area: string; pos: MenuPos } | null>(null);
  if (!pv) return <SidePanel title="Pivot table editor" onClose={() => g.cmd("g.pane", "")}><p className="text-[13px] text-[#5f6368]">Click a pivot table to edit it.</p></SidePanel>;
  const src = book.sheets.find((s) => s.name === pv.source.sheet);
  const rc = parseRange(pv.source.range);
  const fields: string[] = [];
  if (src && rc) for (let c = rc.c1; c <= rc.c2; c++) fields.push(String(src.cells[refOf(c, rc.r1)]?.v ?? numToCol(c)));
  const area = (name: string, list: string[]) => (
    <div className="mb-4">
      <div className="mb-1 flex items-center">
        <span className="flex-1 text-[14px] font-medium">{name}</span>
        <button type="button" aria-label={`Add ${name}`} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setAdd({ area: name, pos: { x: r.left - 120, y: r.bottom } }); }} className="rounded-full px-3 py-1 text-[13px] font-medium text-[#0b57d0] hover:bg-[#0b57d0]/10">Add</button>
      </div>
      {list.map((x) => (
        <div key={x} className="mb-1 flex items-center rounded bg-[#f1f3f4] px-3 py-2 text-[13px]">
          <span className="flex-1">{x}</span>
          {name === "Values" && (
            <select aria-label={`Summarize ${x} by`} value={FN_LABEL[pv.values.find((v) => v.field === x)?.fn ?? "Sum"] ?? "SUM"} onChange={(e) => g.cmd("pivot.summarize", e.target.value)} className="mr-2 h-7 rounded border border-[#747775] bg-white px-1 text-[12px]">
              {["SUM", "COUNTA", "AVERAGE", "MAX", "MIN"].map((o) => <option key={o}>{o}</option>)}
            </select>
          )}
          <button type="button" aria-label={`Remove ${x}`} onClick={() => g.cmd("pivot.field", x)}><GIcon name="close" size={16} /></button>
        </div>
      ))}
    </div>
  );
  return (
    <SidePanel title="Pivot table editor" onClose={() => g.cmd("g.pane", "")}>
      <p className="mb-3 rounded border border-[#e0e0e0] px-2 py-1.5 text-[13px]">{pv.source.sheet}!{pv.source.range}</p>
      {area("Rows", pv.rows)}
      {area("Columns", pv.columns)}
      {area("Values", pv.values.map((v) => v.field))}
      {area("Filters", pv.filters)}
      {add && (
        <Popup onClose={() => setAdd(null)}>
          <MenuList entries={fields.map((x) => ({ label: x, value: x }))} pos={add.pos} width={200} onPick={(i) => { setAdd(null); g.cmd("pivot.area", `${i.value}>${add.area}`); }} onClose={() => setAdd(null)} />
        </Popup>
      )}
    </SidePanel>
  );
}
