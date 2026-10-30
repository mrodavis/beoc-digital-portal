import type { CellFormat, ExcelBook, ExcelCell, ExcelCF, ExcelChart, ExcelSheet, SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { applyCommonCommit } from "@/lib/sim/common";
import { clone } from "@/lib/sim/ops";
import {
  builtinFormatCode,
  cellsIn,
  colToNum,
  evaluateCell,
  findTable,
  formatValue,
  GEOGRAPHY,
  geographyKey,
  GROUP_UNITS,
  normalizeRange,
  numToCol,
  parseRange,
  parseRef,
  pivotLayoutOf,
  pivotRecords,
  pivotSnapshot,
  pivotValueLabel,
  rangeValues,
  rectToRange,
  refOf,
  refreshPivots,
  resolveRef,
  shiftFormula,
  type Rect,
  type XCellFormat,
  type XPivot,
  type XPivotValue,
} from "@/lib/sim/excel";
import { flashFill } from "./flashFill";

/* ------------------------------------------------------------------ */
/* Extra fields the shared Excel types can't hold                      */
/* ------------------------------------------------------------------ */

/**
 * Data Validation rule (sheet.validation[range]). Beyond the shared fields:
 * the operator (`op`: between, not between, equal to, not equal to, greater
 * than, less than, greater than or equal to, less than or equal to), `value`
 * for equal to / not equal to, a list `source` that may be a range
 * (=$H$2:$H$5), the Input Message title and switch, and the Error Alert
 * (`errorStyle` Stop | Warning | Information, `errorTitle`, `errorMessage`,
 * `showError`).
 */
export type XValidation = NonNullable<ExcelSheet["validation"]>[string] & {
  op?: string;
  value?: number;
  source?: string;
  ignoreBlank?: boolean;
  showInput?: boolean;
  inputTitle?: string;
  showError?: boolean;
  errorStyle?: "Stop" | "Warning" | "Information";
  errorTitle?: string;
  errorMessage?: string;
};

/**
 * A sparkline (sheet.sparklines[]). Sparklines inserted into a multi-cell
 * location share a `group`; the Sparkline tab's type, Show options and color
 * apply to the whole group.
 */
export type XSparkline = NonNullable<ExcelSheet["sparklines"]>[number] & {
  group?: string;
  high?: boolean;
  low?: boolean;
  first?: boolean;
  last?: boolean;
  negative?: boolean;
  markers?: boolean;
  color?: string;
};

/** A chart whose series were edited in Select Data Source keeps them explicitly. */
export type XChart = ExcelChart & {
  series?: { name: string; values: string }[];
  categories?: string;
};

export const SPARKLINE_COLORS: Record<string, string> = { Blue: "#4472C4", Orange: "#ED7D31", Gray: "#A5A5A5", Gold: "#FFC000", Green: "#70AD47", "Dark Red": "#C00000", Black: "#262626" };

/* ------------------------------------------------------------------ */
/* Basics                                                              */
/* ------------------------------------------------------------------ */

export const DEFAULT_COLS = 10;
export const DEFAULT_ROWS = 22;

export function sheetOf(doc: ExcelBook, ui: SimUi): ExcelSheet {
  return doc.sheets.find((s) => s.name === (ui.sheet ?? doc.active)) ?? doc.sheets[0];
}

export function activeCell(ui: SimUi): string {
  const sel = ui.selection || "A1";
  if (sel.startsWith("chart:") || sel.startsWith("obj:") || sel.startsWith("sheet:")) return "A1";
  const t = sel.replace(/\$/g, "").toUpperCase();
  if (/^[A-Z]+:[A-Z]+$/.test(t)) return `${t.split(":")[0]}1`;
  if (/^\d+:\d+$/.test(t)) return `A${t.split(":")[0]}`;
  const first = t.split(":")[0];
  // The header and footer areas (Page Layout view) are not cells.
  return /^[A-Z]{1,3}\d+$/.test(first) ? first : "A1";
}

/** Selection as a concrete rectangle (whole columns/rows clipped to the sheet). */
export function selRect(sheet: ExcelSheet, sel: string): Rect | null {
  const t = (sel || "A1").replace(/\$/g, "").toUpperCase();
  if (t.startsWith("CHART:") || t.startsWith("OBJ:")) return null;
  const rows = Math.max(sheet.rows ?? DEFAULT_ROWS, usedRect(sheet)?.r2 ?? 0);
  const cols = Math.max(sheet.cols ?? DEFAULT_COLS, usedRect(sheet)?.c2 ?? 0);
  const colM = /^([A-Z]+):([A-Z]+)$/.exec(t);
  if (colM) return { c1: colToNum(colM[1]), r1: 1, c2: colToNum(colM[2]), r2: rows };
  const rowM = /^(\d+):(\d+)$/.exec(t);
  if (rowM) return { c1: 1, r1: Number(rowM[1]), c2: cols, r2: Number(rowM[2]) };
  return parseRange(t);
}

export function usedRect(sheet: ExcelSheet): Rect | null {
  let rc: Rect | null = null;
  for (const ref of Object.keys(sheet.cells)) {
    const c = sheet.cells[ref];
    if (c.v === undefined && !c.f) continue;
    const p = parseRef(ref);
    if (!p) continue;
    if (!rc) rc = { c1: p.c, r1: p.r, c2: p.c, r2: p.r };
    else rc = { c1: Math.min(rc.c1, p.c), r1: Math.min(rc.r1, p.r), c2: Math.max(rc.c2, p.c), r2: Math.max(rc.r2, p.r) };
  }
  return rc;
}

function hasValue(sheet: ExcelSheet, c: number, r: number) {
  const cell = sheet.cells[refOf(c, r)];
  return Boolean(cell && (cell.f || (cell.v !== undefined && cell.v !== "")));
}

/** Excel's "current region": the block of contiguous non-empty cells around a cell. */
export function currentRegion(sheet: ExcelSheet, ref: string): Rect | null {
  const p = parseRef(ref);
  if (!p) return null;
  let rc: Rect = { c1: p.c, r1: p.r, c2: p.c, r2: p.r };
  if (!hasValue(sheet, p.c, p.r)) {
    // Look one cell in each direction like Excel does for an empty active cell.
    const around = [[0, -1], [-1, 0], [0, 1], [1, 0]].find(([dc, dr]) => hasValue(sheet, p.c + dc, p.r + dr));
    if (!around) return null;
    rc = { c1: p.c + around[0], r1: p.r + around[1], c2: p.c + around[0], r2: p.r + around[1] };
  }
  let grew = true;
  while (grew) {
    grew = false;
    const rowHas = (r: number) => { for (let c = rc.c1 - 1; c <= rc.c2 + 1; c++) if (c > 0 && r > 0 && hasValue(sheet, c, r)) return true; return false; };
    const colHas = (c: number) => { for (let r = rc.r1 - 1; r <= rc.r2 + 1; r++) if (c > 0 && r > 0 && hasValue(sheet, c, r)) return true; return false; };
    if (rc.r1 > 1 && rowHas(rc.r1 - 1)) { rc.r1--; grew = true; }
    if (rowHas(rc.r2 + 1)) { rc.r2++; grew = true; }
    if (rc.c1 > 1 && colHas(rc.c1 - 1)) { rc.c1--; grew = true; }
    if (colHas(rc.c2 + 1)) { rc.c2++; grew = true; }
  }
  return rc;
}

/** The table's header and data rows (not its total row). */
export function tableRect(sheet: ExcelSheet): Rect | null {
  return sheet.table ? parseRange(sheet.table.range) : null;
}

/** Is the cell inside the table (optionally counting its total row)? */
export function inTable(sheet: ExcelSheet, ref: string, withTotal = false): boolean {
  const rc = tableRect(sheet);
  const p = parseRef(ref);
  if (!rc || !p) return false;
  const r2 = rc.r2 + (withTotal && sheet.table?.totalRow ? 1 : 0);
  return p.c >= rc.c1 && p.c <= rc.c2 && p.r >= rc.r1 && p.r <= r2;
}

/** What a one-cell command (sort, remove duplicates) acts on: the table the cell is in, else its current region. */
export function dataRegion(sheet: ExcelSheet, ref: string): Rect | null {
  if (inTable(sheet, ref, true)) return tableRect(sheet);
  return currentRegion(sheet, ref);
}

function headerLike(sheet: ExcelSheet, rc: Rect): boolean {
  for (let c = rc.c1; c <= rc.c2; c++) {
    const v = sheet.cells[refOf(c, rc.r1)]?.v;
    if (typeof v === "number") return false;
  }
  return true;
}

export function parseInput(raw: string): ExcelCell {
  const t = raw.trim();
  // A leading apostrophe stores the rest as text and is not part of the value.
  if (raw.startsWith("'")) return { v: raw.slice(1) };
  if (t.startsWith("=")) return { f: t };
  if (t === "") return {};
  const pct = /^(-?[\d,]*\.?\d+)\s*%$/.exec(t);
  if (pct) return { v: Number(pct[1].replace(/,/g, "")) / 100, fmt: { numFmt: "Percentage" } };
  const cur = /^\$\s?(-?[\d,]*\.?\d+)$/.exec(t);
  if (cur) return { v: Number(cur[1].replace(/,/g, "")), fmt: { numFmt: "Currency" } };
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
  if (iso && Number(iso[2]) >= 1 && Number(iso[2]) <= 12 && Number(iso[3]) >= 1 && Number(iso[3]) <= 31) {
    // Excel reads 2026-10-20 as a date and keeps the yyyy-mm-dd look.
    const serial = Math.round((Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])) - Date.UTC(1899, 11, 30)) / 86400000);
    return { v: serial, fmt: { custom: "yyyy-mm-dd" } as XCellFormat };
  }
  const date = /^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/.exec(t);
  if (date && Number(date[1]) >= 1 && Number(date[1]) <= 12 && Number(date[2]) >= 1 && Number(date[2]) <= 31) {
    // Month/day with no year takes the current year, as Excel does.
    const y = date[3] ? Number(date[3].length === 2 ? `20${date[3]}` : date[3]) : 2026;
    const serial = Math.round((Date.UTC(y, Number(date[1]) - 1, Number(date[2])) - Date.UTC(1899, 11, 30)) / 86400000);
    return { v: serial, fmt: { numFmt: "Short Date" } };
  }
  const time = /^(\d{1,2}):(\d{2})\s*([AaPp][Mm])?$/.exec(t);
  if (time && Number(time[1]) < 24 && Number(time[2]) < 60) {
    let h = Number(time[1]) % (time[3] ? 12 : 24);
    if (time[3] && /p/i.test(time[3])) h += 12;
    return { v: (h * 60 + Number(time[2])) / 1440, fmt: { numFmt: "Time" } };
  }
  // Leading zeros are dropped from numbers in a General cell (00125 becomes 125).
  const num = /^-?[\d,]*\.?\d+$/.test(t) ? Number(t.replace(/,/g, "")) : NaN;
  if (!Number.isNaN(num) && /\d/.test(t)) return { v: num };
  return { v: t };
}

function setCellInput(sheet: ExcelSheet, ref: string, raw: string) {
  const prev = sheet.cells[ref] ?? {};
  if (prev.fmt?.numFmt === "Text") {
    // A Text-formatted cell keeps exactly what was typed, formulas included.
    const next: ExcelCell = { ...prev, v: raw.startsWith("'") ? raw.slice(1) : raw, spell: undefined };
    delete next.f;
    if (raw === "") delete next.v;
    sheet.cells[ref] = next;
    return;
  }
  const parsed = parseInput(raw);
  const fmt: XCellFormat = { ...(prev.fmt ?? {}), ...(parsed.fmt ?? {}) };
  // A number format already on the cell wins over the one implied by what was typed.
  const prevFmt = prev.fmt as XCellFormat | undefined;
  if (parsed.fmt && (prevFmt?.custom || (prevFmt?.numFmt && prevFmt.numFmt !== "General"))) {
    fmt.numFmt = prevFmt.numFmt;
    fmt.custom = prevFmt.custom;
    if (fmt.numFmt === undefined) delete fmt.numFmt;
    if (fmt.custom === undefined) delete fmt.custom;
  }
  const next: ExcelCell = { ...prev, v: parsed.v, f: parsed.f, fmt: Object.keys(fmt).length ? fmt : undefined, spell: undefined };
  if (next.f === undefined) delete next.f;
  if (next.v === undefined) delete next.v;
  sheet.cells[ref] = next;
}

function forEachCell(sheet: ExcelSheet, sel: string, fn: (ref: string) => void) {
  const rc = selRect(sheet, sel);
  if (!rc) return;
  const r2 = Math.min(rc.r2, rc.r1 + 400);
  const c2 = Math.min(rc.c2, rc.c1 + 40);
  for (let r = rc.r1; r <= r2; r++) for (let c = rc.c1; c <= c2; c++) fn(refOf(c, r));
}

function fmtCells(sheet: ExcelSheet, sel: string, patch: Partial<XCellFormat> | ((f: XCellFormat) => XCellFormat)) {
  forEachCell(sheet, sel, (ref) => {
    const cell = sheet.cells[ref] ?? {};
    const cur = (cell.fmt ?? {}) as XCellFormat;
    const nf: XCellFormat = typeof patch === "function" ? patch(cur) : { ...cur, ...patch };
    // A built-in number format replaces a custom code.
    if (typeof patch !== "function" && "numFmt" in patch && !("custom" in patch)) delete nf.custom;
    for (const k of Object.keys(nf) as (keyof XCellFormat)[]) if (nf[k] === undefined) delete nf[k];
    sheet.cells[ref] = { ...cell, fmt: nf };
  });
}

function firstFmt(sheet: ExcelSheet, ui: SimUi): CellFormat {
  return sheet.cells[activeCell(ui)]?.fmt ?? {};
}

const DECIMAL_FORMATS: NonNullable<CellFormat["numFmt"]>[] = ["Number", "Currency", "Accounting", "Percentage", "Scientific", "Comma"];

function rangesOverlap(a: string, b: string): boolean {
  const x = parseRange(a), y = parseRange(b);
  return Boolean(x && y && x.c1 <= y.c2 && y.c1 <= x.c2 && x.r1 <= y.r2 && y.r1 <= x.r2);
}

/* Cell protection: every cell is Locked unless listed here (Format Cells › Protection). */

function unlockedRanges(doc: ExcelBook, sheet: ExcelSheet): string[] {
  return String(doc.flags?.[`unlocked:${sheet.name}`] ?? "").split(",").filter(Boolean);
}

function setLocked(doc: ExcelBook, sheet: ExcelSheet, range: string, locked: boolean) {
  let list = unlockedRanges(doc, sheet);
  if (locked) {
    const rc = parseRange(range);
    list = list.filter((r) => {
      const x = parseRange(r);
      return !(x && rc && x.c1 >= rc.c1 && x.c2 <= rc.c2 && x.r1 >= rc.r1 && x.r2 <= rc.r2);
    });
  } else if (!list.includes(range)) list.push(range);
  doc.flags = { ...(doc.flags ?? {}), [`unlocked:${sheet.name}`]: list.join(",") };
}

/** Can this cell be edited while its sheet is protected? */
export function isUnlocked(doc: ExcelBook, sheet: ExcelSheet, ref: string): boolean {
  return unlockedRanges(doc, sheet).some((r) => {
    const rc = parseRange(r);
    const p = parseRef(ref);
    return Boolean(rc && p && p.c >= rc.c1 && p.c <= rc.c2 && p.r >= rc.r1 && p.r <= rc.r2);
  });
}

/* Format Cells › Protection › Hidden: the formula bar shows nothing for these cells once the sheet is protected. */

function hiddenRanges(doc: ExcelBook, sheet: ExcelSheet): string[] {
  return String(doc.flags?.[`hiddenf:${sheet.name}`] ?? "").split(",").filter(Boolean);
}

function setFormulaHidden(doc: ExcelBook, sheet: ExcelSheet, range: string, hidden: boolean) {
  const rc = parseRange(range);
  let list = hiddenRanges(doc, sheet).filter((r) => {
    const x = parseRange(r);
    return !(x && rc && x.c1 >= rc.c1 && x.c2 <= rc.c2 && x.r1 >= rc.r1 && x.r2 <= rc.r2);
  });
  if (hidden) list = [...list, range];
  doc.flags = { ...(doc.flags ?? {}), [`hiddenf:${sheet.name}`]: list.join(",") };
}

/** Is this cell's formula hidden (Format Cells › Protection › Hidden)? It only takes effect on a protected sheet. */
export function isFormulaHidden(doc: ExcelBook, sheet: ExcelSheet, ref: string): boolean {
  return hiddenRanges(doc, sheet).some((r) => {
    const rc = parseRange(r);
    const p = parseRef(ref);
    return Boolean(rc && p && p.c >= rc.c1 && p.c <= rc.c2 && p.r >= rc.r1 && p.r <= rc.r2);
  });
}

/** Review › Allow Edit Ranges: a range people may edit on a protected sheet, optionally with its own password. */
export interface EditRange {
  title: string;
  range: string;
  password: string;
}

export function editRanges(doc: ExcelBook, sheet: ExcelSheet): EditRange[] {
  const pre = `editRange:${sheet.name}:`;
  return Object.keys(doc.flags ?? {})
    .filter((k) => k.startsWith(pre) && doc.flags?.[k])
    .map((k) => ({ title: k.slice(pre.length), range: String(doc.flags![k]), password: String(doc.flags?.[`editRangePw:${sheet.name}:${k.slice(pre.length)}`] ?? "") }));
}

export function editRangeAt(doc: ExcelBook, sheet: ExcelSheet, ref: string): EditRange | null {
  const p = parseRef(ref);
  if (!p) return null;
  return (
    editRanges(doc, sheet).find((e) => {
      const rc = parseRange(e.range);
      return Boolean(rc && p.c >= rc.c1 && p.c <= rc.c2 && p.r >= rc.r1 && p.r <= rc.r2);
    }) ?? null
  );
}

/* Data Validation ----------------------------------------------------- */

export function validationAt(sheet: ExcelSheet, ref: string): { range: string; rule: XValidation } | null {
  const p = parseRef(ref);
  if (!p) return null;
  for (const [rng, rule] of Object.entries(sheet.validation ?? {})) {
    const rc = parseRange(rng);
    if (rc && p.c >= rc.c1 && p.c <= rc.c2 && p.r >= rc.r1 && p.r <= rc.r2) return { range: rng, rule: rule as XValidation };
  }
  return null;
}

/** The items of a List rule: typed items, or the values of a source range (=$H$2:$H$5). */
export function validationList(doc: ExcelBook, sheet: ExcelSheet, rule: XValidation): string[] {
  if (rule.source && rule.source.trim().startsWith("=")) {
    return rangeValues(doc, sheet, rule.source.trim())
      .filter((v) => v !== null && v !== "")
      .map((v) => String(v));
  }
  return rule.list ?? [];
}

function compareOp(n: number, rule: XValidation): boolean {
  const lo = rule.min, hi = rule.max, val = rule.value;
  switch (rule.op ?? "between") {
    case "not between": return (lo !== undefined && n < lo) || (hi !== undefined && n > hi);
    case "equal to": return n === (val ?? lo ?? hi);
    case "not equal to": return n !== (val ?? lo ?? hi);
    case "greater than": return n > (lo ?? val ?? Number.NEGATIVE_INFINITY);
    case "less than": return n < (hi ?? val ?? Number.POSITIVE_INFINITY);
    case "greater than or equal to": return n >= (lo ?? val ?? Number.NEGATIVE_INFINITY);
    case "less than or equal to": return n <= (hi ?? val ?? Number.POSITIVE_INFINITY);
    default: return (lo === undefined || n >= lo) && (hi === undefined || n <= hi);
  }
}

/** Does this entry (as typed) pass the rule? Formulas and blanks are not checked, as in Excel. */
export function validationAllows(doc: ExcelBook, sheet: ExcelSheet, rule: XValidation | undefined, text: string): boolean {
  if (!rule || rule.type === "Any value" || rule.type === "Checkbox") return true;
  const t = text.trim();
  if (t === "" || t.startsWith("=")) return true;
  const v = parseInput(text).v;
  switch (rule.type) {
    case "Whole number": return typeof v === "number" && Number.isInteger(v) && compareOp(v, rule);
    case "Decimal":
    case "Date":
    case "Time": return typeof v === "number" && compareOp(v, rule);
    case "List": return validationList(doc, sheet, rule).some((x) => x.toLowerCase() === t.toLowerCase());
    case "Text length": return compareOp(text.length, rule);
  }
  return true;
}

/** Cells whose current value breaks their validation rule (Data › Data Validation › Circle Invalid Data). */
export function invalidCells(doc: ExcelBook, sheet: ExcelSheet): string[] {
  const out: string[] = [];
  for (const [rng, rule] of Object.entries(sheet.validation ?? {})) {
    for (const ref of cellsIn(rng)) {
      const v = evaluateCell(doc, sheet, ref);
      if (v === null || v === "") continue;
      const shown = typeof v === "number" ? String(v) : String(v);
      if (!validationAllows(doc, sheet, rule as XValidation, shown)) out.push(ref);
    }
  }
  return out;
}

/** Ranges with Center Across Selection, from Format Cells › Alignment. */
export function centerAcrossRanges(doc: ExcelBook, sheet: ExcelSheet): Rect[] {
  const pre = `cas:${sheet.name}!`;
  return Object.keys(doc.flags ?? {})
    .filter((k) => k.startsWith(pre) && doc.flags?.[k])
    .map((k) => parseRange(k.slice(pre.length)))
    .filter((r): r is Rect => Boolean(r));
}

/* ------------------------------------------------------------------ */
/* Structural edits                                                    */
/* ------------------------------------------------------------------ */

function shiftRefs(f: string, axis: "row" | "col", at: number, count: number): string {
  return f.replace(/(^|[^A-Za-z0-9_!'])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_(])/g, (m, pre, d1, col, d2, row) => {
    let c = colToNum(col);
    let r = Number(row);
    if (axis === "row" && r >= at) r += count;
    if (axis === "col" && c >= at) c += count;
    if (r < 1 || c < 1) return `${pre}#REF!`;
    return `${pre}${d1}${numToCol(c)}${d2}${r}`;
  });
}

function insertLines(sheet: ExcelSheet, axis: "row" | "col", at: number, count: number) {
  const next: Record<string, ExcelCell> = {};
  for (const [ref, cell] of Object.entries(sheet.cells)) {
    const p = parseRef(ref)!;
    let { c, r } = p;
    if (count > 0) {
      if (axis === "row" && r >= at) r += count;
      if (axis === "col" && c >= at) c += count;
    } else {
      const del = -count;
      if (axis === "row" && r >= at && r < at + del) continue;
      if (axis === "col" && c >= at && c < at + del) continue;
      if (axis === "row" && r >= at + del) r += count;
      if (axis === "col" && c >= at + del) c += count;
    }
    next[refOf(c, r)] = cell.f ? { ...cell, f: shiftRefs(cell.f, axis, count > 0 ? at : at + -count, count) } : cell;
  }
  sheet.cells = next;
  // Column widths, row heights and hidden rows/columns travel with their columns and rows.
  const moveIndex = (k: number): number | null => {
    if (count > 0) return k >= at ? k + count : k;
    if (k >= at && k < at - count) return null;
    return k >= at - count ? k + count : k;
  };
  if (axis === "col") {
    if (sheet.colWidths) {
      const w: Record<string, number> = {};
      for (const [col, px] of Object.entries(sheet.colWidths)) { const k = moveIndex(colToNum(col)); if (k) w[numToCol(k)] = px; }
      sheet.colWidths = w;
    }
    if (sheet.hiddenCols) sheet.hiddenCols = sheet.hiddenCols.map((col) => moveIndex(colToNum(col))).filter((k): k is number => Boolean(k)).map(numToCol);
  } else {
    if (sheet.rowHeights) {
      const h: Record<string, number> = {};
      for (const [row, px] of Object.entries(sheet.rowHeights)) { const k = moveIndex(Number(row)); if (k) h[String(k)] = px; }
      sheet.rowHeights = h;
    }
    if (sheet.hiddenRows) sheet.hiddenRows = sheet.hiddenRows.map((r) => moveIndex(r)).filter((k): k is number => Boolean(k));
  }
  // Ranges that describe the sheet's structure grow, shrink and move with it.
  const adj = (range: string | null | undefined) => (range ? adjustRange(range, axis, at, count) : range);
  if (sheet.table) {
    const t = adj(sheet.table.range);
    sheet.table = t ? { ...sheet.table, range: t } : null;
  }
  if (sheet.filter) {
    sheet.filter = adj(sheet.filter) ?? null;
    if (count < 0 && sheet.filterValues && axis === "col") sheet.filterValues = {};
  }
  if (sheet.printArea) sheet.printArea = adj(sheet.printArea) ?? null;
  if (sheet.merges) sheet.merges = sheet.merges.map((m) => adj(m)).filter((m): m is string => Boolean(m));
  if (sheet.cf) sheet.cf = sheet.cf.map((x) => ({ ...x, range: adj(x.range) ?? "" })).filter((x) => x.range);
  if (sheet.validation) {
    const v: NonNullable<ExcelSheet["validation"]> = {};
    for (const [k, rule] of Object.entries(sheet.validation)) { const nk = adj(k); if (nk) v[nk] = rule; }
    sheet.validation = v;
  }
  if (sheet.charts) sheet.charts = sheet.charts.map((ch) => ({ ...ch, range: ch.range === "PIVOT" ? ch.range : adj(ch.range) ?? ch.range }));
  if (sheet.sparklines)
    sheet.sparklines = sheet.sparklines
      .map((s) => ({ ...s, at: adj(s.at) ?? "", range: s.range.includes("!") ? s.range : adj(s.range) ?? s.range }))
      .filter((s) => s.at);
  if (sheet.pivot?.at) {
    // A PivotTable moves with the rows and columns around it.
    const na = adj(sheet.pivot.at);
    if (na && na !== sheet.pivot.at) sheet.pivot = { ...sheet.pivot, at: na };
  }
  if (axis === "row") sheet.rows = Math.max(1, (sheet.rows ?? DEFAULT_ROWS) + Math.max(0, count));
  else sheet.cols = Math.max(1, (sheet.cols ?? DEFAULT_COLS) + Math.max(0, count));
}

/** A range after inserting (count > 0) or deleting (count < 0) rows/columns at `at`. Null when it is deleted entirely. */
function adjustRange(range: string, axis: "row" | "col", at: number, count: number): string | null {
  const whole = /^[A-Z]+:[A-Z]+$/i.test(range) || /^\d+:\d+$/.test(range);
  const rc = parseRange(range);
  if (!rc || whole) return range;
  let [a, b] = axis === "row" ? [rc.r1, rc.r2] : [rc.c1, rc.c2];
  if (count > 0) {
    if (at <= a) { a += count; b += count; }
    else if (at <= b) b += count;
  } else {
    const d1 = at, d2 = at - count - 1;
    const removed = (x: number) => x >= d1 && x <= d2;
    const shift = (x: number) => (x > d2 ? x + count : x);
    if (removed(a) && removed(b) && a >= d1 && b <= d2) return null;
    const na = removed(a) ? d1 : shift(a);
    const nb = removed(b) ? d1 - 1 : shift(b);
    if (nb < na) return null;
    a = na; b = nb;
  }
  const out = axis === "row" ? { ...rc, r1: a, r2: b } : { ...rc, c1: a, c2: b };
  return rectToRange(out);
}

/**
 * Excel Tables grow when you type directly below or to the right of them,
 * and a formula typed into an empty table column fills the whole column
 * (a calculated column).
 */
function tableAfterTyping(sheet: ExcelSheet, ref: string) {
  if (!sheet.table) return;
  const rc = parseRange(sheet.table.range);
  const p = parseRef(ref);
  const cell = sheet.cells[ref];
  if (!rc || !p || !cell || (cell.v === undefined && !cell.f)) return;
  let grown: Rect | null = null;
  if (!sheet.table.totalRow && p.r === rc.r2 + 1 && p.c >= rc.c1 && p.c <= rc.c2) grown = { ...rc, r2: rc.r2 + 1 };
  else if (p.c === rc.c2 + 1 && p.r >= rc.r1 && p.r <= rc.r2) {
    grown = { ...rc, c2: rc.c2 + 1 };
    if (p.r !== rc.r1 && sheet.cells[refOf(p.c, rc.r1)]?.v === undefined) sheet.cells[refOf(p.c, rc.r1)] = { v: `Column${p.c - rc.c1 + 1}` };
  }
  if (grown) {
    sheet.table = { ...sheet.table, range: rectToRange(grown) };
    if (sheet.filter) sheet.filter = rectToRange(grown);
    if (grown.r2 > rc.r2) {
      // Validation, conditional formatting and charts set on whole table columns grow with the table.
      const grow = (range: string): string => {
        const x = parseRange(range);
        if (!x || x.r2 !== rc.r2 || x.r1 > rc.r1 + 1 || x.c1 < rc.c1 || x.c2 > rc.c2) return range;
        return rectToRange({ ...x, r2: grown!.r2 });
      };
      if (sheet.validation) sheet.validation = Object.fromEntries(Object.entries(sheet.validation).map(([k, v]) => [grow(k), v]));
      if (sheet.cf) sheet.cf = sheet.cf.map((x) => ({ ...x, range: grow(x.range) }));
      if (sheet.charts) sheet.charts = sheet.charts.map((ch) => (ch.range === "PIVOT" || ch.range.includes("!") ? ch : { ...ch, range: grow(ch.range) }));
    }
    // Carry calculated columns into the new row.
    if (grown.r2 > rc.r2) {
      for (let c = rc.c1; c <= rc.c2; c++) {
        const above = sheet.cells[refOf(c, rc.r2)];
        const here = sheet.cells[refOf(c, grown.r2)];
        if (above?.f && !here?.f && here?.v === undefined) sheet.cells[refOf(c, grown.r2)] = { ...above, f: shiftFormula(above.f, 0, 1) };
      }
    }
  }
  const t = grown ?? rc;
  if (cell.f && p.r > t.r1 && p.r <= t.r2 && p.c >= t.c1 && p.c <= t.c2) {
    let empty = true;
    for (let r = t.r1 + 1; r <= t.r2; r++) {
      if (r === p.r) continue;
      const x = sheet.cells[refOf(p.c, r)];
      if (x && (x.f || (x.v !== undefined && x.v !== ""))) empty = false;
    }
    if (empty) for (let r = t.r1 + 1; r <= t.r2; r++) if (r !== p.r) sheet.cells[refOf(p.c, r)] = { ...cell, f: shiftFormula(cell.f, 0, r - p.r) };
  }
}

function moveRows(sheet: ExcelSheet, rc: Rect, order: number[]) {
  // order[i] = original row index for destination row rc.r1+i
  const snapshot: Record<string, ExcelCell | undefined> = {};
  for (let r = rc.r1; r <= rc.r2; r++) for (let c = rc.c1; c <= rc.c2; c++) snapshot[refOf(c, r)] = sheet.cells[refOf(c, r)];
  order.forEach((srcRow, i) => {
    const dst = rc.r1 + i;
    for (let c = rc.c1; c <= rc.c2; c++) {
      const cell = snapshot[refOf(c, srcRow)];
      const ref = refOf(c, dst);
      if (cell) sheet.cells[ref] = cell.f ? { ...cell, f: shiftFormula(cell.f, 0, dst - srcRow) } : cell;
      else delete sheet.cells[ref];
    }
  });
}

interface SortKey {
  col: number;
  desc: boolean;
  /** Custom list order (e.g. Stat, Urgent, Routine). */
  list?: string[];
}

function sortRegion(doc: ExcelBook, sheet: ExcelSheet, ui: SimUi, desc: boolean, byCol?: number, headers?: boolean, more: SortKey[] = [], firstList?: string[]) {
  const sel = ui.selection;
  const single = !sel.includes(":");
  const rc = single ? dataRegion(sheet, activeCell(ui)) : selRect(sheet, sel);
  if (!rc) return;
  const hasHeader = headers ?? (sheet.table && inTable(sheet, activeCell(ui), true) ? true : headerLike(sheet, rc));
  const body: Rect = { ...rc, r1: rc.r1 + (hasHeader ? 1 : 0) };
  const keys: SortKey[] = [{ col: byCol ?? parseRef(activeCell(ui))!.c, desc, list: firstList }, ...more];
  const rows: number[] = [];
  for (let r = body.r1; r <= body.r2; r++) rows.push(r);
  const cmpKey = (k: SortKey, a: number, b: number) => {
    const x = evaluateCell(doc, sheet, refOf(k.col, a)), y = evaluateCell(doc, sheet, refOf(k.col, b));
    if (x === null || x === "") return y === null || y === "" ? 0 : 1; // blanks always last
    if (y === null || y === "") return -1;
    let cmp = 0;
    if (k.list) {
      const ix = k.list.findIndex((w) => w.toLowerCase() === String(x).toLowerCase());
      const iy = k.list.findIndex((w) => w.toLowerCase() === String(y).toLowerCase());
      cmp = (ix < 0 ? 1e6 : ix) - (iy < 0 ? 1e6 : iy);
    } else if (typeof x === "number" && typeof y === "number") cmp = x - y;
    else if (typeof x === "number") cmp = -1;
    else if (typeof y === "number") cmp = 1;
    else cmp = String(x).localeCompare(String(y), undefined, { sensitivity: "base" });
    return k.desc ? -cmp : cmp;
  };
  rows.sort((a, b) => {
    for (const k of keys) {
      const c = cmpKey(k, a, b);
      if (c) return c;
    }
    return a - b;
  });
  moveRows(sheet, body, rows);
  sheet.sortedBy = keys.map((k) => `${numToCol(k.col)} ${k.desc ? "desc" : "asc"}`).join(", ");
}

function autoSumRange(sheet: ExcelSheet, ref: string): string | null {
  const p = parseRef(ref)!;
  // Numbers directly above, else directly left.
  let r = p.r - 1;
  while (r >= 1 && typeof evaluateLiteral(sheet, refOf(p.c, r)) === "number") r--;
  if (r < p.r - 1) return `${refOf(p.c, r + 1)}:${refOf(p.c, p.r - 1)}`;
  let c = p.c - 1;
  while (c >= 1 && typeof evaluateLiteral(sheet, refOf(c, p.r)) === "number") c--;
  if (c < p.c - 1) return `${refOf(c + 1, p.r)}:${refOf(p.c - 1, p.r)}`;
  return null;
}

function evaluateLiteral(sheet: ExcelSheet, ref: string) {
  const c = sheet.cells[ref];
  if (!c) return null;
  if (c.f) return 0; // formulas above count as numbers (subtotals)
  return c.v ?? null;
}

const SERIES_WORDS = [
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
];

function nextInSeries(v: string | number | undefined, step: number, k: number): string | number | undefined {
  if (typeof v === "number") return v + step * k;
  if (typeof v !== "string") return v;
  for (const list of SERIES_WORDS) {
    const i = list.findIndex((w) => w.toLowerCase() === v.toLowerCase());
    if (i >= 0) return list[(((i + step * k) % list.length) + list.length) % list.length];
  }
  const m = /^(.*?)(\d+)$/.exec(v);
  if (m) return `${m[1]}${Number(m[2]) + step * k}`;
  return v;
}

/** Fill from the source rectangle into the target range (fill handle / Ctrl+D). */
function fillRange(sheet: ExcelSheet, source: Rect, target: Rect) {
  const down = target.r2 > source.r2 || target.r1 < source.r1;
  if (down) {
    for (let c = source.c1; c <= source.c2; c++) {
      const src: (ExcelCell | undefined)[] = [];
      for (let r = source.r1; r <= source.r2; r++) src.push(sheet.cells[refOf(c, r)]);
      const nums = src.map((x) => x?.v).filter((v): v is number => typeof v === "number");
      const step = src.length >= 2 && nums.length === src.length ? (nums[nums.length - 1] - nums[0]) / (nums.length - 1) : 0;
      const last = src[src.length - 1];
      for (let r = target.r1; r <= target.r2; r++) {
        if (r >= source.r1 && r <= source.r2) continue;
        const k = r - source.r2;
        const base = src[(r - source.r1) % src.length] ?? last;
        if (!base) { delete sheet.cells[refOf(c, r)]; continue; }
        if (base.f) {
          const srcRow = source.r1 + ((r - source.r1) % src.length);
          sheet.cells[refOf(c, r)] = { ...base, f: shiftFormula(base.f, 0, r - srcRow) };
        } else if (src.length >= 2 && step) {
          sheet.cells[refOf(c, r)] = { ...last, v: (last?.v as number) + step * k };
        } else if (src.length === 1 && typeof base.v === "string") {
          sheet.cells[refOf(c, r)] = { ...base, v: nextInSeries(base.v, 1, k) };
        } else if (src.length === 1 && typeof base.v === "number" && isDateFormat(base.fmt)) {
          // A single date fills one day at a time.
          sheet.cells[refOf(c, r)] = { ...base, v: base.v + k };
        } else {
          sheet.cells[refOf(c, r)] = { ...base };
        }
      }
    }
  } else {
    for (let r = source.r1; r <= source.r2; r++) {
      const base = sheet.cells[refOf(source.c2, r)];
      for (let c = target.c1; c <= target.c2; c++) {
        if (c >= source.c1 && c <= source.c2) continue;
        const k = c - source.c2;
        if (!base) { delete sheet.cells[refOf(c, r)]; continue; }
        if (base.f) sheet.cells[refOf(c, r)] = { ...base, f: shiftFormula(base.f, k, 0) };
        else if (typeof base.v === "string") sheet.cells[refOf(c, r)] = { ...base, v: nextInSeries(base.v, 1, k) };
        else if (typeof base.v === "number" && isDateFormat(base.fmt)) sheet.cells[refOf(c, r)] = { ...base, v: base.v + k };
        else sheet.cells[refOf(c, r)] = { ...base };
      }
    }
  }
}

export function isDateFormat(fmt?: CellFormat): boolean {
  const custom = (fmt as XCellFormat | undefined)?.custom;
  if (custom) {
    const bare = custom.replace(/"[^"]*"/g, "").replace(/\[[^\]]*\]/g, "");
    return /[yd]/i.test(bare) || (/m/i.test(bare) && !/[#0?]/.test(bare));
  }
  return fmt?.numFmt === "Short Date" || fmt?.numFmt === "Long Date";
}

/**
 * Ctrl+D / Ctrl+R (Home › Fill › Down, Right, Up, Left): copy the first row
 * (or column) of the selection into the rest, shifting relative references.
 * Unlike the fill handle, this never extends a series. With one cell
 * selected, Ctrl+D copies the cell above and Ctrl+R the cell to the left.
 */
function copyFill(sheet: ExcelSheet, sel: string, dir: "Down" | "Right" | "Up" | "Left") {
  let rc = selRect(sheet, sel);
  if (!rc) return;
  const single = rc.c1 === rc.c2 && rc.r1 === rc.r2;
  if (single) {
    if (dir === "Down" && rc.r1 > 1) rc = { ...rc, r1: rc.r1 - 1 };
    else if (dir === "Right" && rc.c1 > 1) rc = { ...rc, c1: rc.c1 - 1 };
    else if (dir === "Up") rc = { ...rc, r2: rc.r2 + 1 };
    else if (dir === "Left") rc = { ...rc, c2: rc.c2 + 1 };
    else return;
  }
  const vertical = dir === "Down" || dir === "Up";
  const srcLine = dir === "Down" ? rc.r1 : dir === "Up" ? rc.r2 : dir === "Right" ? rc.c1 : rc.c2;
  const r2 = Math.min(rc.r2, rc.r1 + 500);
  const c2 = Math.min(rc.c2, rc.c1 + 60);
  for (let r = rc.r1; r <= r2; r++)
    for (let c = rc.c1; c <= c2; c++) {
      if ((vertical ? r : c) === srcLine) continue;
      const from = vertical ? refOf(c, srcLine) : refOf(srcLine, r);
      const base = sheet.cells[from];
      const to = refOf(c, r);
      if (!base) { delete sheet.cells[to]; continue; }
      const cp: ExcelCell = { ...clone(base), comment: undefined, note: undefined };
      if (cp.comment === undefined) delete cp.comment;
      if (cp.note === undefined) delete cp.note;
      if (base.f) cp.f = shiftFormula(base.f, vertical ? 0 : c - srcLine, vertical ? r - srcLine : 0);
      sheet.cells[to] = cp;
    }
}

/** Home › Fill › Series...: Linear, Growth, Date or AutoFill from the first cell of each row or column. */
function seriesFill(sheet: ExcelSheet, sel: string, val: Record<string, SimValue>) {
  let rc = selRect(sheet, sel);
  if (!rc) return;
  const inRows = String(val.seriesIn ?? (rc.c2 - rc.c1 > rc.r2 - rc.r1 ? "Rows" : "Columns")) === "Rows";
  const type = String(val.type ?? "Linear");
  const unit = String(val.dateUnit ?? "Day");
  const step = Number(String(val.step ?? "1").replace(/,/g, "")) || (val.step === 0 || val.step === "0" ? 0 : 1);
  const stopRaw = String(val.stop ?? "").trim();
  const stop = stopRaw === "" ? null : typeof parseInput(stopRaw).v === "number" ? (parseInput(stopRaw).v as number) : null;
  if (rc.c1 === rc.c2 && rc.r1 === rc.r2) {
    // One cell plus a stop value: Excel fills as far as the stop value.
    if (stop === null) return;
    rc = inRows ? { ...rc, c2: rc.c1 + 499 } : { ...rc, r2: rc.r1 + 499 };
  }
  const lines = inRows ? Array.from({ length: rc.r2 - rc.r1 + 1 }, (_, i) => rc!.r1 + i) : Array.from({ length: rc.c2 - rc.c1 + 1 }, (_, i) => rc!.c1 + i);
  const len = inRows ? rc.c2 - rc.c1 + 1 : rc.r2 - rc.r1 + 1;
  for (const line of lines) {
    const at = (k: number) => (inRows ? refOf(rc!.c1 + k, line) : refOf(line, rc!.r1 + k));
    const base = sheet.cells[at(0)];
    if (!base || (base.v === undefined && !base.f)) continue;
    if (type === "AutoFill") {
      const src: Rect = inRows ? { c1: rc.c1, c2: rc.c1, r1: line, r2: line } : { c1: line, c2: line, r1: rc.r1, r2: rc.r1 };
      fillRange(sheet, src, inRows ? { ...src, c2: rc.c2 } : { ...src, r2: rc.r2 });
      continue;
    }
    const v0 = base.v;
    for (let k = 1; k < len; k++) {
      let next: string | number | undefined;
      if (typeof v0 === "number") {
        if (type === "Growth") next = v0 * Math.pow(step, k);
        else if (type === "Date") next = addDateUnits(v0, unit, step * k);
        else next = v0 + step * k;
        // Past the stop value the series ends.
        if (stop !== null && ((step >= 0 && next > stop) || (step < 0 && next < stop))) break;
      } else if (typeof v0 === "string") {
        next = nextInSeries(v0, step, k);
      }
      if (next === undefined) break;
      sheet.cells[at(k)] = { ...(sheet.cells[at(k)] ?? {}), v: next, fmt: base.fmt };
      if (sheet.cells[at(k)].f) delete sheet.cells[at(k)].f;
    }
  }
}

function addDateUnits(serial: number, unit: string, n: number): number {
  if (unit === "Weekday") {
    let d = serial, left = Math.abs(n);
    const dir = n < 0 ? -1 : 1;
    while (left > 0) {
      d += dir;
      const wd = new Date(Date.UTC(1899, 11, 30) + d * 86400000).getUTCDay();
      if (wd !== 0 && wd !== 6) left--;
    }
    return d;
  }
  if (unit === "Month" || unit === "Year") {
    const dt = new Date(Date.UTC(1899, 11, 30) + Math.floor(serial) * 86400000);
    const months = unit === "Month" ? n : n * 12;
    const y = dt.getUTCFullYear(), m = dt.getUTCMonth() + months, day = dt.getUTCDate();
    const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    return Math.round((Date.UTC(y, m, Math.min(day, last)) - Date.UTC(1899, 11, 30)) / 86400000);
  }
  return serial + n;
}

function goalSeek(doc: ExcelBook, sheet: ExcelSheet, setCell: string, target: number, changing: string) {
  const f = (x: number) => {
    sheet.cells[changing] = { ...(sheet.cells[changing] ?? {}), v: x, f: undefined };
    const v = evaluateCell(doc, sheet, setCell);
    return typeof v === "number" ? v - target : NaN;
  };
  let x0 = Number(sheet.cells[changing]?.v ?? 0) || 1;
  let x1 = x0 * 1.1 + 1;
  let f0 = f(x0), f1 = f(x1);
  for (let i = 0; i < 60 && Math.abs(f1) > 1e-7 && Number.isFinite(f1); i++) {
    const d = f1 - f0;
    if (d === 0) break;
    const x2 = x1 - (f1 * (x1 - x0)) / d;
    x0 = x1; f0 = f1; x1 = x2; f1 = f(x1);
  }
  sheet.cells[changing] = { ...(sheet.cells[changing] ?? {}), v: Math.round(x1 * 1e9) / 1e9 };
}

const CF_FORMATS: Record<string, { fill?: string; color?: string }> = {
  "Light Red Fill with Dark Red Text": { fill: "#FFC7CE", color: "#9C0006" },
  "Yellow Fill with Dark Yellow Text": { fill: "#FFEB9C", color: "#9C5700" },
  "Green Fill with Dark Green Text": { fill: "#C6EFCE", color: "#006100" },
  "Light Red Fill": { fill: "#FFC7CE" },
  "Red Text": { color: "#9C0006" },
  "Red Border": { color: "#C00000" },
};
export const CF_FORMAT_NAMES = Object.keys(CF_FORMATS);

/** How the Conditional Formatting Rules Manager lists a rule. */
export function cfDescribe(r: ExcelCF): string {
  const v = r.value === undefined ? "" : String(r.value);
  const what =
    r.rule === "Greater Than" ? `Cell Value > ${v}` :
    r.rule === "Less Than" ? `Cell Value < ${v}` :
    r.rule === "Equal To" ? `Cell Value = ${v}` :
    r.rule === "Between" ? `Cell Value between ${v.replace("|", " and ")}` :
    r.rule === "Text Contains" ? `Cell Value contains "${v}"` :
    r.rule === "Top 10" ? `Top ${v || 10}` :
    r.rule === "Formula" ? `Formula: ${v}` :
    r.rule;
  return `${what} (applies to ${r.range})`;
}

/** Insert › Icons library (searchable in Excel; a short list here). */
export const ICONS: Record<string, string> = {
  Warning: "⚠",
  Checkmark: "✔",
  "Medical cross": "✚",
  Flag: "⚑",
  Clipboard: "📋",
  Calendar: "📅",
  Truck: "🚚",
  Telephone: "☎",
};

/** Next free object id on the sheet (o1, o2, ...), so ids stay the same every run. */
function nid(sheet: ExcelSheet): string {
  let n = 1;
  while ((sheet.objects ?? []).some((o) => o.id === `o${n}`)) n++;
  return `o${n}`;
}

/* ------------------------------------------------------------------ */
/* Built-in command handling                                           */
/* ------------------------------------------------------------------ */

export function applyExcel(input: ExcelBook, c: SimCommit, ui: SimUi): { doc: ExcelBook; ui?: Partial<SimUi> } {
  // File › Options opens the Excel Options dialog at the category picked.
  if (c.kind === "command" && c.id === "file.options") return { doc: { ...input, pane: `Excel Options|${String(c.value ?? "General")}` } };
  const common = applyCommonCommit(input, c, ".xlsx");
  if (common) return { doc: common };

  const doc = clone(input);
  const sheet = sheetOf(doc, ui);
  const sel = ui.selection || "A1";
  const act = activeCell(ui);
  const v = c.kind === "command" ? c.value : undefined;
  const sv = v === undefined ? "" : String(v);

  if (c.kind === "type") {
    const t = c.target;
    if (t.startsWith("sheet:")) {
      const old = t.slice(6);
      const sh = doc.sheets.find((s) => s.name === old);
      if (sh && c.value.trim()) {
        sh.name = c.value.trim();
        // PivotTables keep pointing at their renamed source sheet.
        for (const s of doc.sheets) if (s.pivot?.source.sheet === old) s.pivot = { ...s.pivot, source: { ...s.pivot.source, sheet: sh.name } };
        if (doc.active === old) doc.active = sh.name;
        return { doc, ui: ui.sheet === old || (!ui.sheet && doc.active === sh.name) ? { sheet: sh.name } : undefined };
      }
      return { doc };
    }
    if (t.startsWith("chart:")) {
      const id = t.slice(6).replace(/\.title$/, "");
      const ch = sheet.charts?.find((x) => x.id === id);
      if (ch) ch.title = c.value;
      return { doc };
    }
    if (t === "header") { sheet.header = c.value; return { doc }; }
    if (t === "footer") { sheet.footer = c.value; return { doc }; }
    if (t === "tableName") { if (sheet.table) sheet.table.name = c.value; return { doc }; }
    if (t === "find") { doc.pane = `Find:${c.value}`; return { doc }; }
    const ref = (t.includes("!") ? t.split("!")[1] : t).toUpperCase();
    const target = t.includes("!") ? doc.sheets.find((s) => s.name === t.split("!")[0]) ?? sheet : sheet;
    setCellInput(target, ref, c.value);
    tableAfterTyping(target, ref);
    return { doc };
  }

  if (c.kind === "click") {
    if (c.target.startsWith("sheet:")) return { doc, ui: { sheet: c.target.slice(6), selection: "A1" } };
    return { doc };
  }

  if (c.kind === "dialog") {
    const val = c.values;
    switch (c.id) {
      case "formatCells": {
        // Like Excel, OK applies only what was changed in the dialog.
        const before = excelDialogDefaults(input, ui, "formatCells");
        const changed = (k: string) => val[k] !== undefined && String(val[k]) !== String(before[k] ?? "");
        const patch: Partial<XCellFormat> = {};
        const cat = String(val.category ?? before.category ?? "General") as NonNullable<CellFormat["numFmt"]> | "Custom";
        const code = String(val.custom ?? "").trim();
        if (cat === "Custom" || (changed("custom") && code)) {
          // Format Cells › Number › Custom: the code typed in the Type box.
          if (code && (changed("custom") || changed("category"))) { patch.custom = code; patch.numFmt = undefined; patch.decimals = undefined; }
        } else {
          if (changed("category")) { patch.numFmt = cat; patch.decimals = undefined; patch.custom = undefined; }
          if ((changed("category") || changed("decimals")) && DECIMAL_FORMATS.includes(cat) && val.decimals !== "" && val.decimals !== undefined) patch.decimals = Number(val.decimals);
        }
        if (changed("horizontal")) {
          const h = String(val.horizontal);
          patch.align = h === "General" ? undefined : h === "Center Across Selection" ? "center" : (h.toLowerCase() as CellFormat["align"]);
        }
        if (changed("vertical")) patch.valign = ({ Top: "top", Center: "middle", Bottom: "bottom" } as Record<string, CellFormat["valign"]>)[String(val.vertical)];
        if (changed("wrap")) patch.wrap = Boolean(val.wrap) || undefined;
        if (changed("bold")) patch.bold = Boolean(val.bold) || undefined;
        if (changed("fontSize")) patch.size = Number(val.fontSize) || 11;
        if (val.fill && val.fill !== "No Color" && changed("fill")) patch.fill = String(val.fill);
        if (val.border && val.border !== "None" && changed("border")) patch.border = String(val.border).toLowerCase().includes("outline") ? "outside" : "all";
        if (Object.keys(patch).length) fmtCells(sheet, sel, patch);
        const range = normalizeRange(sel);
        const casKey = `cas:${sheet.name}!${range}`;
        if (changed("horizontal")) {
          const flags = { ...(doc.flags ?? {}) };
          for (const k of Object.keys(flags)) if (k.startsWith(`cas:${sheet.name}!`) && rangesOverlap(k.slice(`cas:${sheet.name}!`.length), range)) delete flags[k];
          if (val.horizontal === "Center Across Selection") flags[casKey] = true;
          doc.flags = flags;
        }
        if (changed("locked")) setLocked(doc, sheet, range, Boolean(val.locked));
        if (changed("hidden")) setFormulaHidden(doc, sheet, range, Boolean(val.hidden));
        if (val.merge && changed("merge")) sheet.merges = [...(sheet.merges ?? []).filter((m) => m !== range), range];
        if (!val.merge && changed("merge")) sheet.merges = (sheet.merges ?? []).filter((m) => m !== range);
        return { doc };
      }
      case "createTable": {
        const range = String(val.range || sel).replace(/\$/g, "").replace(/^=/, "");
        const rc = range.includes(":") ? parseRange(range) : currentRegion(sheet, act);
        if (rc) {
          sheet.table = { range: rectToRange(rc), style: sheet.table?.style ?? "Table Style Medium 2", name: "Table1" };
          sheet.filter = rectToRange(rc);
        }
        return { doc };
      }
      case "createPivot": {
        // Table/Range: a table name ("ExpenseData") keeps the PivotTable tied to the
        // table as it grows; a range ("'Expense Data'!$A$1:$E$26") stays fixed.
        const source = pivotSourceFromDialog(doc, sheet, sel, act, String(val.range ?? ""));
        if (!source) return { doc };
        const fresh = { source, rows: [], columns: [], values: [], filters: [] };
        if (String(val.location ?? "New Worksheet") === "New Worksheet") {
          let n = doc.sheets.length + 1;
          while (doc.sheets.some((s) => s.name === `Sheet${n}`)) n++;
          const name = `Sheet${n}`;
          const idx = doc.sheets.findIndex((s) => s.name === sheet.name);
          doc.sheets.splice(idx, 0, { name, cells: {}, pivot: { ...fresh, at: "A3" } });
          return { doc, ui: { sheet: name, selection: "A3" } };
        }
        // Existing Worksheet: Location is a cell on this sheet or on any other ("Dashboard!$A$10").
        const loc = String(val.at || act).trim().replace(/^=/, "");
        const bang = loc.lastIndexOf("!");
        const target = bang > 0 ? doc.sheets.find((s) => s.name.toLowerCase() === loc.slice(0, bang).replace(/^'|'$/g, "").toLowerCase()) ?? sheet : sheet;
        const cell = (bang > 0 ? loc.slice(bang + 1) : loc).replace(/\$/g, "").toUpperCase().split(":")[0];
        target.pivot = { ...fresh, at: parseRef(cell) ? cell : "H3" };
        return { doc, ui: target === sheet ? { selection: target.pivot.at! } : { sheet: target.name, selection: target.pivot.at! } };
      }
      case "changeSource": {
        const pv = sheet.pivot;
        if (!pv) return { doc };
        const source = pivotSourceFromDialog(doc, sheet, sel, act, String(val.range ?? ""), pv.source.sheet);
        if (source) {
          sheet.pivot = { ...pv, source };
          // Changing the source refreshes the PivotTable.
          const x = sheet.pivot as unknown as XPivot;
          if (x.cache) x.cache = pivotSnapshot(doc, x) ?? x.cache;
        }
        return { doc };
      }
      case "pivotGroup": {
        // Group a date field by Months, Quarters, Years (and Days).
        const pv = sheet.pivot as unknown as XPivot | undefined;
        if (!pv) return { doc };
        const field = activePivotField(doc, sheet, act) ?? firstDateField(doc, pv);
        if (!field) return { doc };
        const units = GROUP_UNITS.filter((u) => Boolean(val[u.toLowerCase()]));
        pv.groups = { ...(pv.groups ?? {}) };
        if (units.length) pv.groups[field] = units;
        else delete pv.groups[field];
        return { doc };
      }
      case "insertChart": {
        // Insert Chart › Templates applies a template saved with Save as Template.
        const tpl = String(val.template ?? "");
        const saved = tpl ? doc.flags?.[`charttpl:${tpl}`] : undefined;
        const type = saved ? (JSON.parse(String(saved)) as { type?: string }).type ?? "Clustered Column" : String(val.type ?? "Clustered Column");
        const r = addChart(doc, sheet, ui, type);
        const ch = r.ui?.selection ? sheet.charts?.find((x) => x.id === chartIdOf(r.ui!.selection!)) : undefined;
        if (saved && ch) applyChartTemplate(doc, ch, tpl);
        return r;
      }
      case "insertFunction": {
        const fn = String(val.fn ?? "SUM").toUpperCase();
        const args = String(val.args ?? "").trim();
        setCellInput(sheet, act, `=${fn}(${args})`);
        return { doc };
      }
      case "sort": {
        if (doc.pane === "Sort") doc.pane = null;
        if (sheet.pivot && pivotCellAt(doc, sheet, act)) return pivotSortCommand(doc, sheet, act, String(val.order ?? "A to Z"));
        const rc = dataRegion(sheet, act);
        const colOf = (name: string): number | undefined => {
          if (!rc || !name || name === "(none)") return undefined;
          for (let cc = rc.c1; cc <= rc.c2; cc++) {
            const h = sheet.cells[refOf(cc, rc.r1)]?.v;
            if (String(h ?? "").toLowerCase() === name.toLowerCase() || `Column ${numToCol(cc)}`.toLowerCase() === name.toLowerCase()) return cc;
          }
          return undefined;
        };
        const isDesc = (o: unknown) => /Z to A|Largest to Smallest|Newest to Oldest|Descending/.test(String(o ?? ""));
        const list = (o: unknown, key: string) => {
          if (String(o ?? "") !== "Custom List...") return undefined;
          const raw = String(val[key] ?? val.customList ?? "");
          return raw.split(",").map((x) => x.trim()).filter(Boolean);
        };
        const more: SortKey[] = [];
        const then = colOf(String(val.thenBy ?? ""));
        if (then !== undefined) more.push({ col: then, desc: isDesc(val.thenOrder), list: list(val.thenOrder, "thenCustomList") });
        const then2 = colOf(String(val.then2By ?? ""));
        if (then2 !== undefined) more.push({ col: then2, desc: isDesc(val.then2Order), list: list(val.then2Order, "then2CustomList") });
        sortRegion(doc, sheet, { ...ui, selection: act }, isDesc(val.order), colOf(String(val.sortBy ?? "")), val.headers === undefined ? undefined : Boolean(val.headers), more, list(val.order, "customList"));
        return { doc };
      }
      case "cfGreater":
      case "cfLess":
      case "cfEqual":
      case "cfBetween":
      case "cfText":
      case "cfTop10":
      case "cfDuplicate":
      case "cfAboveAverage": {
        const fmt = CF_FORMATS[String(val.format ?? "Light Red Fill with Dark Red Text")] ?? CF_FORMATS["Light Red Fill with Dark Red Text"];
        const rule = { cfGreater: "Greater Than", cfLess: "Less Than", cfEqual: "Equal To", cfBetween: "Between", cfText: "Text Contains", cfTop10: "Top 10", cfDuplicate: "Duplicate Values", cfAboveAverage: "Above Average" }[c.id];
        const value = c.id === "cfBetween" ? `${val.low}|${val.high}` : (val.value ?? val.text ?? val.count) as string | number | undefined;
        sheet.cf = [...(sheet.cf ?? []), { range: normalizeRange(sel), rule, value, ...fmt }];
        return { doc };
      }
      case "goalSeek": {
        goalSeek(doc, sheet, String(val.setCell ?? "").toUpperCase().replace(/\$/g, ""), Number(val.toValue), String(val.byChanging ?? "").toUpperCase().replace(/\$/g, ""));
        return { doc };
      }
      case "subtotal":
        subtotal(doc, sheet, act, String(val.atEachChange ?? ""), String(val.fn ?? "Sum"), String(val.addTo ?? ""));
        return { doc };
      case "dataValidation": {
        const range = normalizeRange(sel);
        const prev = (sheet.validation?.[range] ?? {}) as Partial<XValidation>;
        const type = String(val.allow ?? prev.type ?? "Any value");
        // Minimum, Maximum and Value accept numbers, dates (5/1/2026) and times (8:00 AM).
        const num = (x: SimValue | undefined, keep: number | undefined): number | undefined => {
          if (x === undefined) return keep;
          if (x === "") return undefined;
          const p = parseInput(String(x)).v;
          return typeof p === "number" ? p : keep;
        };
        const source = val.source === undefined ? prev.source : String(val.source).trim();
        const rule: XValidation = {
          type,
          list: type === "List" && source && !source.startsWith("=") ? source.split(",").map((x) => x.trim()).filter(Boolean) : undefined,
          source: type === "List" ? source || undefined : undefined,
          op: type === "List" || type === "Any value" ? undefined : String(val.data ?? prev.op ?? "between"),
          min: num(val.min, prev.min),
          max: num(val.max, prev.max),
          value: num(val.value, prev.value),
          ignoreBlank: val.ignoreBlank === undefined ? prev.ignoreBlank : Boolean(val.ignoreBlank),
          showInput: val.showInput === undefined ? prev.showInput : Boolean(val.showInput),
          inputTitle: (val.inputTitle === undefined ? prev.inputTitle : String(val.inputTitle)) || undefined,
          message: (val.inputMessage === undefined ? prev.message : String(val.inputMessage)) || undefined,
          showError: val.showError === undefined ? prev.showError : Boolean(val.showError),
          errorStyle: (val.errorStyle === undefined ? prev.errorStyle : (String(val.errorStyle) as XValidation["errorStyle"])) || undefined,
          errorTitle: (val.errorTitle === undefined ? prev.errorTitle : String(val.errorTitle)) || undefined,
          errorMessage: (val.errorMessage === undefined ? prev.errorMessage : String(val.errorMessage)) || undefined,
        };
        for (const k of Object.keys(rule) as (keyof XValidation)[]) if (rule[k] === undefined) delete rule[k];
        const next = { ...(sheet.validation ?? {}) };
        if (type === "Any value" && !rule.message && !rule.errorMessage) delete next[range];
        else next[range] = rule;
        sheet.validation = next;
        return { doc };
      }
      case "series":
        seriesFill(sheet, sel, val);
        return { doc };
      case "removeDuplicates": {
        const rc = currentRegion(sheet, act);
        if (!rc) return { doc };
        const hasHeader = val.headers === undefined ? true : Boolean(val.headers);
        const start = rc.r1 + (hasHeader ? 1 : 0);
        const seen = new Set<string>();
        const keep: number[] = [];
        for (let r = start; r <= rc.r2; r++) {
          const key = Array.from({ length: rc.c2 - rc.c1 + 1 }, (_, i) => String(sheet.cells[refOf(rc.c1 + i, r)]?.v ?? "")).join("|").toLowerCase();
          if (!seen.has(key)) { seen.add(key); keep.push(r); }
        }
        const removed = rc.r2 - start + 1 - keep.length;
        moveRows(sheet, { ...rc, r1: start }, [...keep, ...Array.from({ length: removed }, () => -1)]);
        for (let r = start + keep.length; r <= rc.r2; r++) for (let cc = rc.c1; cc <= rc.c2; cc++) delete sheet.cells[refOf(cc, r)];
        doc.pane = `Removed ${removed} duplicate value${removed === 1 ? "" : "s"}; ${keep.length} unique values remain.`;
        return { doc };
      }
      case "textToColumns": {
        const delim = { Comma: ",", Space: " ", Tab: "\t", Semicolon: ";" }[String(val.delimiter ?? "Comma")] ?? ",";
        const rc = selRect(sheet, sel);
        if (!rc) return { doc };
        for (let r = rc.r1; r <= rc.r2; r++) {
          const raw = sheet.cells[refOf(rc.c1, r)]?.v;
          if (typeof raw !== "string") continue;
          raw.split(delim).map((x) => x.trim()).forEach((part, i) => setCellInput(sheet, refOf(rc.c1 + i, r), part));
        }
        return { doc };
      }
      case "columnWidth":
        forEachCol(sheet, sel, (col) => (sheet.colWidths = { ...(sheet.colWidths ?? {}), [col]: Number(val.width ?? 8.43) * 8 + 5 }));
        return { doc };
      case "rowHeight": {
        const rc = selRect(sheet, sel);
        if (rc) for (let r = rc.r1; r <= rc.r2; r++) sheet.rowHeights = { ...(sheet.rowHeights ?? {}), [String(r)]: Number(val.height ?? 15) * 1.33 };
        return { doc };
      }
      case "protectSheet":
        sheet.protected = !sheet.protected;
        return { doc };
      case "protectWorkbook":
        doc.flags = { ...(doc.flags ?? {}), workbookProtected: true };
        return { doc };
      case "moveCopySheet": {
        const copy = Boolean(val.copy);
        const before = String(val.before ?? "(move to end)");
        const src = clone(sheet);
        if (copy) src.name = `${sheet.name} (2)`;
        if (!copy) doc.sheets = doc.sheets.filter((s) => s.name !== sheet.name);
        const idx = doc.sheets.findIndex((s) => s.name === before);
        doc.sheets.splice(idx < 0 ? doc.sheets.length : idx, 0, src);
        return { doc, ui: { sheet: src.name } };
      }
      case "defineName":
        doc.names = { ...(doc.names ?? {}), [String(val.name ?? "Name")]: String(val.refersTo ?? sel) };
        return { doc };
      case "pageSetupSheet":
        if (val.orientation) sheet.orientation = String(val.orientation).toLowerCase() as "portrait" | "landscape";
        if (val.printTitles !== undefined) sheet.printTitles = String(val.printTitles) || null;
        if (val.fitTo) sheet.fitTo = val.fitTo === "Adjust to 100%" ? undefined : String(val.fitTo);
        if (val.gridlines !== undefined) sheet.printGridlines = Boolean(val.gridlines);
        if (val.header !== undefined) sheet.header = String(val.header);
        if (val.footer !== undefined) sheet.footer = String(val.footer);
        if (val.printArea !== undefined) sheet.printArea = String(val.printArea).trim() ? normalizeRange(String(val.printArea).replace(/^=/, "")) : null;
        return { doc };
      case "newComment":
        sheet.cells[act] = { ...(sheet.cells[act] ?? {}), comment: String(val.text ?? "") };
        return { doc };
      case "newNote":
        sheet.cells[act] = { ...(sheet.cells[act] ?? {}), note: String(val.text ?? "") };
        return { doc };
      case "link": {
        const cell = sheet.cells[act] ?? {};
        sheet.cells[act] = { ...cell, v: String(val.text || cell.v || val.address || ""), fmt: { ...(cell.fmt ?? {}), color: "#0563C1", underline: true } };
        doc.flags = { ...(doc.flags ?? {}), [`link:${act}`]: String(val.address ?? "") };
        return { doc };
      }
      case "replace": {
        const find = String(val.find ?? "");
        const repl = String(val.replace ?? "");
        let n = 0;
        if (find) {
          const re = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), val.matchCase ? "g" : "gi");
          const targets = val.within === "Workbook" ? doc.sheets : [sheet];
          for (const sh of targets)
            for (const [ref, cell] of Object.entries(sh.cells)) {
              if (typeof cell.v === "string" && re.test(cell.v)) {
                re.lastIndex = 0;
                const whole = val.entireCell ? cell.v.toLowerCase() === find.toLowerCase() : true;
                if (!whole) continue;
                sh.cells[ref] = { ...cell, v: cell.v.replace(re, () => { n++; return repl; }) };
              }
            }
        }
        doc.pane = `All done. We made ${n} replacement${n === 1 ? "" : "s"}.`;
        return { doc };
      }
      case "find":
        doc.pane = `Find:${val.find ?? ""}`;
        return { doc };
      case "goTo": {
        const ref = String(val.reference ?? "A1").toUpperCase();
        return { doc, ui: { selection: ref } };
      }
      case "zoom":
        sheet.zoom = Number(val.percent ?? 100);
        return { doc };
      case "sparklines":
        return insertSparklines(doc, sheet, act, String(val.type ?? "Line"), String(val.dataRange ?? ""), String(val.location ?? ""));
      case "headerFooter":
        sheet.header = String(val.header ?? sheet.header ?? "");
        sheet.footer = String(val.footer ?? sheet.footer ?? "");
        return { doc };
      case "allowEditRanges": {
        // Review › Allow Edit Ranges › New: a titled range, editable on the protected sheet.
        const title = String(val.title ?? "").trim() || "Range1";
        const ref = String(val.refersTo ?? "").trim().replace(/^=/, "").replace(/^.*!/, "").replace(/\$/g, "");
        const range = parseRange(ref) ? normalizeRange(ref) : normalizeRange(sel);
        doc.flags = { ...(doc.flags ?? {}), [`editRange:${sheet.name}:${title}`]: range, [`editRangePw:${sheet.name}:${title}`]: String(val.password ?? "") };
        return { doc };
      }
      case "selectData":
        return applySelectData(doc, sheet, ui, val);
      case "saveChartTemplate": {
        const id = chartIdOf(sel) ?? sheet.charts?.[0]?.id;
        const ch = sheet.charts?.find((x) => x.id === id);
        const name = String(val.name ?? "").trim() || "Chart1";
        if (ch) {
          const f = doc.flags ?? {};
          const tpl = { type: ch.type, style: ch.style ?? "", labels: Boolean(f[`chart:${ch.id}:labels`]), legend: String(f[`chart:${ch.id}:legend`] ?? ""), axisTitles: Boolean(f[`chart:${ch.id}:axisTitles`]), colors: String(f["chart.colors"] ?? "") };
          doc.flags = { ...f, [`charttpl:${name}`]: JSON.stringify(tpl) };
        }
        return { doc };
      }
      case "changeChartType": {
        const id = chartIdOf(sel) ?? sheet.charts?.[sheet.charts.length - 1]?.id;
        const ch = sheet.charts?.find((x) => x.id === id);
        if (!ch) return { doc };
        const tpl = String(val.template ?? "");
        if (tpl && doc.flags?.[`charttpl:${tpl}`]) applyChartTemplate(doc, ch, tpl);
        else if (val.type) ch.type = String(val.type);
        return { doc };
      }
      case "moveChart": {
        const id = chartIdOf(sel) ?? sheet.charts?.[0]?.id;
        const ch = sheet.charts?.find((x) => x.id === id);
        if (ch && String(val.location) === "New sheet") {
          sheet.charts = sheet.charts?.filter((x) => x.id !== ch.id);
          const name = String(val.name || "Chart1");
          // A chart sheet has no cells of its own: the chart keeps pointing at its source sheet.
          const range = ch.range === "PIVOT" || ch.range.includes("!") ? ch.range : `${sheet.name}!${ch.range}`;
          doc.sheets.splice(doc.sheets.findIndex((s) => s.name === sheet.name), 0, { name, cells: {}, charts: [{ ...ch, range, at: "A1" }], gridlines: false });
          return { doc, ui: { sheet: name, selection: `chart:${ch.id}` } };
        }
        return { doc };
      }
      case "insertPicture":
        sheet.objects = [...(sheet.objects ?? []), { id: nid(sheet), kind: "image", label: String(val.file ?? "Picture"), glyph: "🖼️", at: act }];
        return { doc };
      case "insertIcons": {
        const name = String(val.icon ?? "Warning");
        const id = nid(sheet);
        sheet.objects = [...(sheet.objects ?? []), { id, kind: "icon", label: name, glyph: ICONS[name] ?? "★", at: act }];
        return { doc, ui: { selection: `obj:${id}` } };
      }
      case "altText": {
        const id = sel.startsWith("obj:") ? sel.slice(4) : sel.startsWith("chart:") ? `chart:${chartIdOf(sel)}` : "";
        if (id) doc.flags = { ...(doc.flags ?? {}), [`alt:${id}`]: String(val.text ?? "") };
        return { doc };
      }
      case "valueFieldSettings": {
        // Applies to the value field of the active cell (the first value field otherwise).
        const pv = sheet.pivot as unknown as XPivot | undefined;
        if (!pv?.values.length) return { doc };
        const i = activeValueIndex(doc, sheet, act);
        const v: XPivotValue = { ...pv.values[i] };
        if (val.fn) v.fn = String(val.fn);
        if (val.customName !== undefined) {
          // The Custom Name box starts with the current label; only a name typed over it is kept.
          const nm = String(val.customName).trim();
          const label = (x: XPivotValue) => pivotValueLabel({ ...pv, values: pv.values.map((y, j) => (j === i ? { ...x, name: undefined } : y)) }, i);
          if (nm && nm !== label(pv.values[i]) && nm !== label(v) && nm !== pv.values[i].name) v.name = nm;
          else if (!nm || nm === label(pv.values[i]) || nm === label(v)) delete v.name;
        }
        if (val.numberFormat !== undefined) {
          // Value Field Settings › Number Format: the format belongs to the field and survives refreshes and rearranging.
          const nf = String(val.numberFormat);
          if (nf === "General" || nf === "") { delete v.numFmt; delete v.decimals; delete v.custom; }
          else if (nf === "Custom") {
            const code = String(val.custom ?? "").trim();
            if (code) { v.custom = code; delete v.numFmt; delete v.decimals; }
          } else {
            v.numFmt = nf as XPivotValue["numFmt"];
            delete v.custom;
            if (val.decimals !== undefined && val.decimals !== "" && DECIMAL_FORMATS.includes(nf as NonNullable<CellFormat["numFmt"]>)) v.decimals = Number(val.decimals);
            else delete v.decimals;
          }
        }
        if (val.showAs !== undefined) v.showAs = syncShowAs(doc, sheet, i, String(val.showAs));
        pv.values = pv.values.map((x, j) => (j === i ? v : x));
        return { doc };
      }
      case "insertSlicer": {
        const f = String(val.field ?? "");
        const key = `slicers:${sheet.name}`;
        const list = String(doc.flags?.[key] ?? "").split(",").filter(Boolean);
        if (f && !list.includes(f)) list.push(f);
        doc.flags = { ...(doc.flags ?? {}), [key]: list.join(",") };
        return { doc };
      }
      case "cfNewRule": {
        const fmt = CF_FORMATS[String(val.format ?? "Light Red Fill with Dark Red Text")] ?? CF_FORMATS["Light Red Fill with Dark Red Text"];
        const formula = String(val.formula ?? "").trim();
        if (!formula) return { doc };
        sheet.cf = [...(sheet.cf ?? []), { range: normalizeRange(sel), rule: "Formula", value: formula.startsWith("=") ? formula : `=${formula}`, ...fmt }];
        return { doc };
      }
      case "cfManage": {
        const pick = String(val.rule ?? "");
        const list = sheet.cf ?? [];
        const i = list.findIndex((r) => cfDescribe(r) === pick);
        if (i >= 0) sheet.cf = list.filter((_, j) => j !== i);
        return { doc };
      }
    }
    return { doc };
  }

  if (c.kind !== "command") return { doc };

  switch (c.id) {
    /* -------- clipboard -------- */
    case "home.copy":
    case "home.cut": {
      const rc = selRect(sheet, sel);
      if (!rc) return { doc };
      const cells: Record<string, ExcelCell> = {};
      for (const ref of cellsIn(rectToRange(rc))) if (sheet.cells[ref]) cells[ref] = clone(sheet.cells[ref]);
      doc.clipboard = { sheet: sheet.name, range: rectToRange(rc), cells, cut: c.id === "home.cut" };
      return { doc };
    }
    case "home.paste": {
      const cb = doc.clipboard;
      if (!cb) return { doc };
      const src = parseRange(cb.range)!;
      const dst = parseRef(act)!;
      const transpose = sv === "Transpose";
      // Pasting into a larger selection repeats the copied block to fill it (copy one formula, paste down a column).
      const selR = selRect(sheet, sel);
      const sw = src.c2 - src.c1 + 1, sh = src.r2 - src.r1 + 1;
      if (!cb.cut && !transpose && selR && (selR.c2 - selR.c1 + 1) % sw === 0 && (selR.r2 - selR.r1 + 1) % sh === 0 && (selR.c2 - selR.c1 + 1 > sw || selR.r2 - selR.r1 + 1 > sh) && !/^[A-Z]+:[A-Z]+$|^\d+:\d+$/i.test(sel)) {
        let cur = doc;
        for (let r = selR.r1; r <= selR.r2; r += sh)
          for (let cc = selR.c1; cc <= selR.c2; cc += sw) cur = applyExcel(cur, { kind: "command", id: "home.paste", value: sv || undefined }, { ...ui, selection: refOf(cc, r) }).doc;
        return { doc: cur, ui: { selection: rectToRange(selR) } };
      }
      const dc = dst.c - src.c1, dr = dst.r - src.r1;
      if (cb.cut) {
        const srcSheet = doc.sheets.find((s) => s.name === cb.sheet);
        if (srcSheet) for (const ref of Object.keys(cb.cells)) delete srcSheet.cells[ref];
      }
      for (const [ref, cell] of Object.entries(cb.cells)) {
        const p = parseRef(ref)!;
        const to = transpose ? refOf(dst.c + (p.r - src.r1), dst.r + (p.c - src.c1)) : refOf(p.c + dc, p.r + dr);
        const prev = sheet.cells[to] ?? {};
        if (sv === "Values" || sv === "Paste Values") {
          const val = evaluateCell(doc, doc.sheets.find((s) => s.name === cb.sheet) ?? sheet, ref);
          sheet.cells[to] = { ...prev, v: val === null ? undefined : (val as string | number), f: undefined };
        } else if (sv === "Formatting") {
          sheet.cells[to] = { ...prev, fmt: cell.fmt };
        } else if (sv === "Formulas") {
          sheet.cells[to] = { ...prev, v: cell.v, f: cell.f ? (cb.cut ? cell.f : shiftFormula(cell.f, dc, dr)) : undefined };
        } else {
          sheet.cells[to] = { ...cell, f: cell.f ? (cb.cut ? cell.f : shiftFormula(cell.f, transpose ? 0 : dc, transpose ? 0 : dr)) : undefined };
        }
      }
      if (cb.cut) doc.clipboard = null;
      const w = src.c2 - src.c1, h = src.r2 - src.r1;
      return { doc, ui: { selection: rectToRange(transpose ? { c1: dst.c, r1: dst.r, c2: dst.c + h, r2: dst.r + w } : { c1: dst.c, r1: dst.r, c2: dst.c + w, r2: dst.r + h }) } };
    }
    case "home.formatPainter":
      doc.painter = { ...firstFmt(sheet, ui) };
      return { doc };
    case "home.formatPainter.apply":
      if (doc.painter) fmtCells(sheet, sel, () => ({ ...doc.painter! }));
      doc.painter = null;
      return { doc };

    /* -------- font -------- */
    case "home.bold":
    case "home.italic":
    case "home.underline": {
      const k = c.id.split(".")[1] as "bold" | "italic" | "underline";
      const on = !firstFmt(sheet, ui)[k];
      fmtCells(sheet, sel, { [k]: on || undefined });
      return { doc };
    }
    case "home.fontName": fmtCells(sheet, sel, { font: sv }); return { doc };
    case "home.fontSize": fmtCells(sheet, sel, { size: Number(sv) || 11 }); return { doc };
    case "home.growFont":
    case "home.shrinkFont": {
      const cur = firstFmt(sheet, ui).size ?? 11;
      fmtCells(sheet, sel, { size: c.id === "home.growFont" ? cur + 1 : Math.max(1, cur - 1) });
      return { doc };
    }
    case "home.fontColor": fmtCells(sheet, sel, { color: sv === "Automatic" ? undefined : sv || "#C00000" }); return { doc };
    case "home.fill": fmtCells(sheet, sel, { fill: sv === "No Fill" ? undefined : sv || "#FFFF00" }); return { doc };
    case "home.borders": {
      const map: Record<string, CellFormat["border"]> = { "Bottom Border": "bottom", "Top Border": "top", "All Borders": "all", "Outside Borders": "outside", "Thick Outside Borders": "outside", "Thick Bottom Border": "thickBottom", "Bottom Double Border": "thickBottom", "No Border": "none" };
      const b = map[sv || "Bottom Border"] ?? "bottom";
      fmtCells(sheet, sel, { border: b === "none" ? undefined : b });
      return { doc };
    }

    /* -------- alignment -------- */
    case "home.alignLeft": fmtCells(sheet, sel, { align: "left" }); return { doc };
    case "home.alignCenter": fmtCells(sheet, sel, { align: "center" }); return { doc };
    case "home.alignRight": fmtCells(sheet, sel, { align: "right" }); return { doc };
    case "home.alignTop": fmtCells(sheet, sel, { valign: "top" }); return { doc };
    case "home.alignMiddle": fmtCells(sheet, sel, { valign: "middle" }); return { doc };
    case "home.alignBottom": fmtCells(sheet, sel, { valign: "bottom" }); return { doc };
    case "home.wrap": { const on = !firstFmt(sheet, ui).wrap; fmtCells(sheet, sel, { wrap: on || undefined }); return { doc }; }
    case "home.indentInc": fmtCells(sheet, sel, (f) => ({ ...f, indent: (f.indent ?? 0) + 1, align: f.align ?? "left" })); return { doc };
    case "home.indentDec": fmtCells(sheet, sel, (f) => ({ ...f, indent: Math.max(0, (f.indent ?? 0) - 1) || undefined })); return { doc };
    case "home.merge": {
      const r = normalizeRange(sel);
      if (sv === "Unmerge Cells") { sheet.merges = (sheet.merges ?? []).filter((m) => !rangesOverlap(m, r)); return { doc }; }
      // Merge & Center on a merged cell is a toggle: it unmerges.
      if ((sv === "Merge & Center" || sv === "") && (sheet.merges ?? []).some((m) => rangesOverlap(m, r))) {
        sheet.merges = (sheet.merges ?? []).filter((m) => !rangesOverlap(m, r));
        return { doc };
      }
      if (sv === "Merge Across") {
        const rc = selRect(sheet, sel);
        if (rc) for (let rr = rc.r1; rr <= rc.r2; rr++) sheet.merges = [...(sheet.merges ?? []), rectToRange({ c1: rc.c1, r1: rr, c2: rc.c2, r2: rr })];
        return { doc };
      }
      sheet.merges = [...(sheet.merges ?? []).filter((m) => m !== r), r];
      if (sv !== "Merge Cells") fmtCells(sheet, act, { align: "center" });
      return { doc };
    }
    case "home.orientation":
      doc.flags = { ...(doc.flags ?? {}), orientation: sv };
      return { doc };

    /* -------- number -------- */
    case "home.numberFormat": fmtCells(sheet, sel, { numFmt: sv as CellFormat["numFmt"], decimals: undefined }); return { doc };
    case "home.accounting": fmtCells(sheet, sel, { numFmt: "Accounting", decimals: 2 }); return { doc };
    case "home.percent": fmtCells(sheet, sel, { numFmt: "Percentage", decimals: 0 }); return { doc };
    case "home.comma": fmtCells(sheet, sel, { numFmt: "Comma", decimals: 2 }); return { doc };
    case "home.decInc":
    case "home.decDec": {
      const cur = firstFmt(sheet, ui);
      const base = cur.decimals ?? (cur.numFmt === "Percentage" ? 0 : cur.numFmt && cur.numFmt !== "General" ? 2 : decimalsOf(sheet.cells[act]?.v));
      fmtCells(sheet, sel, (f) => ({ ...f, numFmt: f.numFmt && f.numFmt !== "General" ? f.numFmt : "Number", decimals: Math.max(0, base + (c.id === "home.decInc" ? 1 : -1)) }));
      return { doc };
    }

    /* -------- styles -------- */
    case "home.cellStyle": {
      const styles: Record<string, Partial<CellFormat>> = {
        Good: { fill: "#C6EFCE", color: "#006100" },
        Bad: { fill: "#FFC7CE", color: "#9C0006" },
        Neutral: { fill: "#FFEB9C", color: "#9C5700" },
        Title: { size: 18, color: "#44546A", bold: true },
        "Heading 1": { size: 15, bold: true, color: "#44546A", border: "thickBottom" },
        "Heading 2": { size: 13, bold: true, color: "#44546A", border: "bottom" },
        Total: { bold: true, border: "top" },
        Currency: { numFmt: "Currency" },
        Percent: { numFmt: "Percentage" },
        Normal: { fill: undefined, color: undefined, bold: undefined, size: undefined, border: undefined },
        Note: { fill: "#FFFFCC", border: "all" },
        "Accent1": { fill: "#4472C4", color: "#FFFFFF" },
      };
      fmtCells(sheet, sel, styles[sv] ?? {});
      return { doc };
    }
    case "home.formatAsTable": {
      const rc = sel.includes(":") ? selRect(sheet, sel) : currentRegion(sheet, act);
      if (rc) {
        sheet.table = { range: rectToRange(rc), style: sv || "Table Style Medium 2", name: sheet.table?.name ?? "Table1" };
        sheet.filter = rectToRange(rc);
      }
      return { doc };
    }
    case "home.conditionalFormatting": {
      if (sv === "Clear Rules from Selected Cells") { const r = normalizeRange(sel); sheet.cf = (sheet.cf ?? []).filter((x) => x.range !== r); return { doc }; }
      if (sv === "Clear Rules from Entire Sheet") { sheet.cf = []; return { doc }; }
      // Data bars, color scales, icon sets: one click applies.
      sheet.cf = [...(sheet.cf ?? []), { range: normalizeRange(sel), rule: sv }];
      return { doc };
    }

    /* -------- cells -------- */
    case "home.insert": {
      const rc = selRect(sheet, sel)!;
      if (sv === "Insert Sheet") return addSheet(doc, sheet.name, true);
      if (sv === "Insert Sheet Columns" || /^[A-Z]+:[A-Z]+$/i.test(sel)) insertLines(sheet, "col", rc.c1, rc.c2 - rc.c1 + 1);
      else insertLines(sheet, "row", rc.r1, rc.r2 - rc.r1 + 1);
      return { doc };
    }
    case "home.insertCut": {
      // Right-click › Insert Cut Cells: move the cut rows (or columns) to the selection, shifting the rest.
      const cb = doc.clipboard;
      const tgt = selRect(sheet, sel);
      if (!cb?.cut || cb.sheet !== sheet.name || !tgt) return { doc };
      const src = parseRange(cb.range)!;
      const used = usedRect(sheet);
      const byCols = /^[A-Z]+:[A-Z]+$/i.test(sel) || (src.r1 === 1 && used !== null && src.r2 >= used.r2 && !(src.c1 === 1 && src.c2 >= used.c2));
      const axis: "row" | "col" = byCols ? "col" : "row";
      const [s1, s2] = axis === "row" ? [src.r1, src.r2] : [src.c1, src.c2];
      let at = axis === "row" ? tgt.r1 : tgt.c1;
      if (at >= s1 && at <= s2 + 1) { doc.clipboard = null; return { doc }; }
      const n = s2 - s1 + 1;
      const snap: { off: number; other: number; cell: ExcelCell }[] = [];
      for (const [ref, cell] of Object.entries(sheet.cells)) {
        const p = parseRef(ref)!;
        const k = axis === "row" ? p.r : p.c;
        if (k >= s1 && k <= s2) snap.push({ off: k - s1, other: axis === "row" ? p.c : p.r, cell });
      }
      insertLines(sheet, axis, s1, -n);
      if (at > s2) at -= n;
      insertLines(sheet, axis, at, n);
      for (const { off, other, cell } of snap) sheet.cells[axis === "row" ? refOf(other, at + off) : refOf(at + off, other)] = cell;
      doc.clipboard = null;
      const moved = axis === "row" ? `${at}:${at + n - 1}` : `${numToCol(at)}:${numToCol(at + n - 1)}`;
      return { doc, ui: { selection: moved } };
    }
    case "home.delete": {
      const rc = selRect(sheet, sel)!;
      if (sv === "Delete Sheet") {
        if (doc.sheets.length > 1) {
          const i = doc.sheets.findIndex((s) => s.name === sheet.name);
          doc.sheets.splice(i, 1);
          const next = doc.sheets[Math.max(0, i - 1)];
          if (doc.active === sheet.name) doc.active = next.name;
          return { doc, ui: { sheet: next.name, selection: "A1" } };
        }
        return { doc };
      }
      if (sv === "Delete Sheet Columns" || /^[A-Z]+:[A-Z]+$/i.test(sel)) insertLines(sheet, "col", rc.c1, -(rc.c2 - rc.c1 + 1));
      else insertLines(sheet, "row", rc.r1, -(rc.r2 - rc.r1 + 1));
      return { doc };
    }
    case "home.format": {
      switch (sv) {
        case "AutoFit Column Width":
          autoFitColumns(doc, sheet, sel);
          return { doc };
        case "AutoFit Row Height":
          autoFitRows(doc, sheet, sel);
          return { doc };
        case "Hide Rows": {
          const rc = selRect(sheet, sel)!;
          const rows: number[] = [];
          for (let r = rc.r1; r <= rc.r2; r++) rows.push(r);
          sheet.hiddenRows = Array.from(new Set([...(sheet.hiddenRows ?? []), ...rows]));
          return { doc };
        }
        case "Hide Columns": {
          const cols: string[] = [];
          forEachCol(sheet, sel, (col) => cols.push(col));
          sheet.hiddenCols = Array.from(new Set([...(sheet.hiddenCols ?? []), ...cols]));
          return { doc };
        }
        case "Unhide Rows": sheet.hiddenRows = []; return { doc };
        case "Unhide Columns": sheet.hiddenCols = []; return { doc };
        case "Hide Sheet": doc.flags = { ...(doc.flags ?? {}), hiddenSheet: sheet.name }; return { doc };
      }
      if (sv.startsWith("Tab Color: ")) { sheet.tabColor = TAB_COLORS[sv.slice(11)] ?? sheet.tabColor; return { doc }; }
      return { doc };
    }
    case "sheet.tabColor": sheet.tabColor = sv === "No Color" ? undefined : TAB_COLORS[sv] ?? sv; return { doc };
    case "sheet.add": return addSheet(doc, sheet.name, false);
    case "sheet.delete": return applyExcel(doc, { kind: "command", id: "home.delete", value: "Delete Sheet" }, ui);
    case "sheet.hide": doc.flags = { ...(doc.flags ?? {}), hiddenSheet: sheet.name }; return { doc };
    case "sheet.duplicate": {
      const cp = clone(sheet);
      cp.name = `${sheet.name} (2)`;
      doc.sheets.splice(doc.sheets.findIndex((s) => s.name === sheet.name) + 1, 0, cp);
      return { doc, ui: { sheet: cp.name } };
    }
    case "sheet.move": {
      // value: "<name>@<1-based position>"
      const [name, pos] = sv.split("@");
      const i = doc.sheets.findIndex((s) => s.name === name);
      if (i >= 0) {
        const [sh] = doc.sheets.splice(i, 1);
        doc.sheets.splice(Math.max(0, Number(pos) - 1), 0, sh);
      }
      return { doc };
    }

    /* -------- editing -------- */
    case "home.autosum": {
      const fn = { Sum: "SUM", Average: "AVERAGE", "Count Numbers": "COUNT", Max: "MAX", Min: "MIN" }[sv || "Sum"] ?? "SUM";
      if (sel.includes(":")) {
        const rc = selRect(sheet, sel)!;
        // Selected numbers: put totals in the row below each column.
        for (let cc = rc.c1; cc <= rc.c2; cc++) setCellInput(sheet, refOf(cc, rc.r2 + 1), `=${fn}(${refOf(cc, rc.r1)}:${refOf(cc, rc.r2)})`);
        return { doc };
      }
      const range = autoSumRange(sheet, act);
      setCellInput(sheet, act, `=${fn}(${range ?? ""})`);
      return { doc };
    }
    case "excel.fill":
    case "home.fill.drag": {
      const src = selRect(sheet, sel);
      const tgt = parseRange(sv);
      if (src && tgt) fillRange(sheet, src, tgt);
      return { doc, ui: tgt ? { selection: rectToRange({ c1: Math.min(src!.c1, tgt.c1), r1: Math.min(src!.r1, tgt.r1), c2: Math.max(src!.c2, tgt.c2), r2: Math.max(src!.r2, tgt.r2) }) } : undefined };
    }
    case "home.fillSeries": {
      // Ctrl+D, Ctrl+R and Home › Fill › Down/Right/Up/Left copy; they never extend a series.
      if (sv === "Down" || sv === "" || sv === "Right" || sv === "Up" || sv === "Left") copyFill(sheet, sel, (sv || "Down") as "Down");
      else if (sv === "Series...") seriesFill(sheet, sel, { type: "AutoFill" });
      else if (sv === "Flash Fill") return doFlashFill(doc, sheet, sel, act);
      return { doc };
    }
    case "home.clear": {
      forEachCell(sheet, sel, (ref) => {
        const cell = sheet.cells[ref];
        if (!cell) return;
        if (sv === "Clear Formats") sheet.cells[ref] = { ...cell, fmt: undefined };
        else if (sv === "Clear Contents") sheet.cells[ref] = { ...cell, v: undefined, f: undefined };
        else if (sv === "Clear Comments and Notes") sheet.cells[ref] = { ...cell, comment: undefined, note: undefined };
        else delete sheet.cells[ref];
      });
      return { doc };
    }
    case "edit.clearContents":
      forEachCell(sheet, sel, (ref) => { const cell = sheet.cells[ref]; if (cell) sheet.cells[ref] = { ...cell, v: undefined, f: undefined }; });
      return { doc };
    case "data.sortAsc":
    case "data.sortDesc":
      // On a PivotTable, sorting reorders its items (by value from a value cell).
      if (sheet.pivot && pivotCellAt(doc, sheet, act)) return pivotSortCommand(doc, sheet, act, c.id === "data.sortAsc" ? "Ascending" : "Descending");
      sortRegion(doc, sheet, ui, c.id === "data.sortDesc");
      return { doc };
    case "data.sort":
      // Opens the Sort dialog, which the canvas draws so its Order list can follow the column type.
      doc.pane = "Sort";
      return { doc };
    case "data.circleInvalid":
      doc.flags = { ...(doc.flags ?? {}), [`circles:${sheet.name}`]: true };
      return { doc };
    case "data.clearCircles":
      doc.flags = { ...(doc.flags ?? {}), [`circles:${sheet.name}`]: false };
      return { doc };
    case "data.filter": {
      if (sheet.filter) { sheet.filter = null; sheet.filterValues = {}; return { doc }; }
      const rc = sel.includes(":") ? selRect(sheet, sel) : currentRegion(sheet, act);
      if (rc) sheet.filter = rectToRange(rc);
      return { doc };
    }
    case "data.clearFilter": sheet.filterValues = {}; return { doc };
    case "data.reapply": return { doc };
    case "filter.by": {
      // value "C=Paid|Pending", "C=*" (Select All), or a Text/Number/Date filter "F~>=100"
      const m = /^([A-Z]+)(=|~)(.*)$/i.exec(sv);
      const fv = { ...(sheet.filterValues ?? {}) };
      if (!m) return { doc };
      const col = m[1].toUpperCase(), vals = m[3];
      if (m[2] === "~") fv[col] = [`~${vals}`];
      else if (!vals || vals === "*") delete fv[col];
      else fv[col] = vals.split("|");
      sheet.filterValues = fv;
      return { doc };
    }
    case "filter.sort": {
      const [col, dir] = sv.split(":");
      const rc = sheet.filter ? parseRange(sheet.filter) : null;
      if (rc) sortRegion(doc, sheet, { ...ui, selection: refOf(colToNum(col), rc.r1 + 1) }, dir === "desc", colToNum(col), true);
      return { doc };
    }

    /* -------- insert -------- */
    case "insert.chart": return addChart(doc, sheet, ui, sv || "Clustered Column");
    case "insert.shape":
    case "insert.icons":
    case "insert.textBox":
    case "insert.smartArt":
    case "insert.onlinePictures": {
      const kind = c.id === "insert.textBox" ? "textbox" : c.id === "insert.icons" ? "icon" : c.id === "insert.smartArt" ? "smartart" : c.id === "insert.shape" ? "shape" : "image";
      const id = nid(sheet);
      sheet.objects = [...(sheet.objects ?? []), { id, kind, label: sv || kind, glyph: kind === "icon" ? "★" : kind === "image" ? "🖼️" : undefined, at: act, text: kind === "textbox" ? "" : undefined }];
      return { doc, ui: { selection: `obj:${id}` } };
    }
    case "insert.headerFooter":
      // Switches to Page Layout view with the cursor in the header, ready to type.
      sheet.view = "pageLayout";
      sheet.header = sheet.header ?? "";
      return { doc, ui: { selection: "header" } };
    case "hf.gotoHeader":
    case "hf.gotoFooter":
      sheet.view = "pageLayout";
      return { doc, ui: { selection: c.id === "hf.gotoHeader" ? "header" : "footer" } };
    case "hf.header":
    case "hf.footer": {
      const text = sv === "(none)" ? "" : sv;
      if (c.id === "hf.header") sheet.header = text;
      else sheet.footer = text;
      sheet.view = "pageLayout";
      return { doc, ui: { selection: c.id === "hf.header" ? "header" : "footer" } };
    }
    case "hf.pageNumber":
    case "hf.numberOfPages":
    case "hf.currentDate":
    case "hf.currentTime":
    case "hf.filePath":
    case "hf.fileName":
    case "hf.sheetName": {
      // Header & Footer Elements add a code to the section being edited.
      const code = HF_CODES[c.id];
      const target = sel === "footer" ? "footer" : "header";
      sheet[target] = `${sheet[target] ?? ""}${code}`;
      sheet.view = "pageLayout";
      return { doc, ui: { selection: target } };
    }
    case "insert.sparkline":
      return { doc };
    case "sparkline.typeLine":
    case "sparkline.typeColumn":
    case "sparkline.typeWinLoss":
      return sparklineCommand(doc, sheet, sel, act, "sparkline.type", { "sparkline.typeLine": "Line", "sparkline.typeColumn": "Column", "sparkline.typeWinLoss": "Win/Loss" }[c.id]!);
    case "sparkline.type":
    case "sparkline.color":
    case "sparkline.high":
    case "sparkline.low":
    case "sparkline.first":
    case "sparkline.last":
    case "sparkline.negative":
    case "sparkline.markers":
    case "sparkline.group":
    case "sparkline.ungroup":
    case "sparkline.clear":
      return sparklineCommand(doc, sheet, sel, act, c.id, sv);
    case "graphics.fill": {
      const id = sel.startsWith("obj:") ? sel.slice(4) : "";
      if (id) doc.flags = { ...(doc.flags ?? {}), [`objfill:${id}`]: sv };
      return { doc };
    }
    case "home.analyzeData":
      doc.pane = "Analyze Data";
      return { doc };
    case "analyze.insert":
      return analyzeInsert(doc, sheet, ui, sv);

    /* -------- chart -------- */
    case "chart.type":
    case "chart.style":
    case "chart.layout":
    case "chart.colors":
    case "chart.addElement":
    case "chart.switchRowCol": {
      const id = chartIdOf(sel) ?? sheet.charts?.[sheet.charts.length - 1]?.id;
      const ch = sheet.charts?.find((x) => x.id === id);
      if (ch) {
        const flags = { ...(doc.flags ?? {}) };
        const series = chartSeriesOf(sel);
        if (c.id === "chart.type") ch.type = sv;
        else if (c.id === "chart.style") ch.style = sv;
        else if (c.id === "chart.switchRowCol") flags[`chart:${ch.id}:switch`] = !flags[`chart:${ch.id}:switch`];
        else if (c.id === "chart.addElement") {
          if (sv === "Chart Title: None") ch.title = "";
          else if (sv === "Chart Title: Above Chart") ch.title = ch.title || "Chart Title";
          // With one series selected (click a column, then click it again), data labels go on that series only.
          else if (sv === "Data Labels" && series) flags[`chart:${ch.id}:labels:s${series}`] = true;
          else if (sv === "Data Labels") flags[`chart:${ch.id}:labels`] = true;
          else if (sv === "Data Labels: None") {
            if (series) delete flags[`chart:${ch.id}:labels:s${series}`];
            else for (const k of Object.keys(flags)) if (k === `chart:${ch.id}:labels` || k.startsWith(`chart:${ch.id}:labels:`)) delete flags[k];
          } else if (sv.startsWith("Legend: ")) flags[`chart:${ch.id}:legend`] = sv.slice(8);
          else if (sv === "Axis Titles") flags[`chart:${ch.id}:axisTitles`] = true;
        } else if (c.id === "chart.layout") {
          // Quick Layouts 1-3 add a title and legend; 2 and 5 add data labels.
          ch.title = ch.title || "Chart Title";
          if (sv === "Layout 2" || sv === "Layout 5") flags[`chart:${ch.id}:labels`] = true;
          if (sv === "Layout 1" || sv === "Layout 9") flags[`chart:${ch.id}:axisTitles`] = true;
        }
        flags[c.id] = sv || true;
        doc.flags = flags;
      }
      return { doc };
    }
    case "chart.delete": {
      const id = chartIdOf(sel) ?? "";
      sheet.charts = (sheet.charts ?? []).filter((x) => x.id !== id);
      return { doc, ui: { selection: "A1" } };
    }
    case "chart.selectData": {
      // Opens Select Data Source; the canvas draws it and commits the "selectData" dialog.
      const id = chartIdOf(sel) ?? sheet.charts?.[sheet.charts.length - 1]?.id;
      if (id) doc.pane = `Select Data Source|${id}`;
      return { doc };
    }

    /* -------- table design -------- */
    case "table.style": if (sheet.table) sheet.table.style = sv; return { doc };
    case "table.totalRow": {
      if (!sheet.table) return { doc };
      const rc = tableRect(sheet)!;
      if (sheet.table.totalRow) {
        // Turning the Total Row off removes it.
        for (let cc = rc.c1; cc <= rc.c2; cc++) delete sheet.cells[refOf(cc, rc.r2 + 1)];
        sheet.table = { ...sheet.table, totalRow: false };
        return { doc };
      }
      // Anything right below the table moves down a row to make room.
      let below = false;
      for (let cc = rc.c1; cc <= rc.c2; cc++) if (hasValue(sheet, cc, rc.r2 + 1)) below = true;
      if (below) insertLines(sheet, "row", rc.r2 + 1, 1);
      sheet.table = { ...sheet.table, totalRow: true, name: sheet.table.name ?? "Table1" };
      Object.assign(sheet.cells, totalRowDefaults(doc, sheet));
      return { doc };
    }
    case "table.totalFn": {
      // The drop-down on a Total Row cell: None, Average, Count, Count Numbers, Max, Min, Sum, StdDev, Var.
      const rc = tableRect(sheet);
      const p = parseRef(act);
      if (!rc || !sheet.table?.totalRow || !p || p.r !== rc.r2 + 1 || p.c < rc.c1 || p.c > rc.c2) return { doc };
      const cell = sheet.cells[act] ?? {};
      const code = TOTAL_FN_CODES[sv];
      if (sv === "None" || code === undefined) {
        const next = { ...cell };
        delete next.f;
        delete next.v;
        sheet.cells[act] = next;
        return { doc };
      }
      const head = String(sheet.cells[refOf(p.c, rc.r1)]?.v ?? `Column${p.c - rc.c1 + 1}`);
      const dataFmt = sheet.cells[refOf(p.c, rc.r1 + 1)]?.fmt;
      // Inside its own table Excel leaves out the table name: =SUBTOTAL(101,[Unit Cost]).
      const next: ExcelCell = { ...cell, f: `=SUBTOTAL(${code},[${structuredCol(head)}])`, fmt: code === 103 || code === 102 ? cell.fmt : { ...(dataFmt ?? {}), ...(cell.fmt ?? {}) } };
      delete next.v;
      sheet.cells[act] = next;
      return { doc };
    }
    case "table.bandedRows":
    case "table.headerRow":
    case "table.firstColumn":
    case "table.bandedColumns":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: !doc.flags?.[c.id] };
      return { doc };
    case "table.name": {
      if (!sheet.table || !sv.trim()) return { doc };
      const old = sheet.table.name;
      const name = sv.trim().replace(/\s+/g, "_");
      sheet.table.name = name;
      // PivotTables and total-row formulas that use the table follow the new name.
      for (const s of doc.sheets) {
        if (old && s.pivot?.source.range.toLowerCase() === old.toLowerCase()) s.pivot = { ...s.pivot, source: { ...s.pivot.source, range: name } };
        if (old)
          for (const [ref, cell] of Object.entries(s.cells))
            if (cell.f && cell.f.includes(`${old}[`)) s.cells[ref] = { ...cell, f: cell.f.split(`${old}[`).join(`${name}[`) };
      }
      return { doc };
    }
    case "table.filterButton": sheet.filter = sheet.filter ? null : sheet.table?.range ?? null; return { doc };
    case "table.convertToRange": {
      // A PivotTable built on the table keeps the same cells as a plain range.
      const name = sheet.table?.name;
      if (name) for (const s of doc.sheets) if (s.pivot?.source.range.toLowerCase() === name.toLowerCase()) s.pivot = { ...s.pivot, source: { sheet: sheet.name, range: sheet.table!.range } };
      sheet.table = null;
      sheet.filter = null;
      return { doc };
    }
    case "table.removeDuplicates": return applyExcel(doc, { kind: "dialog", id: "removeDuplicates", values: { headers: true } }, ui);

    /* -------- pivot -------- */
    case "pivot.field":
    case "pivot.area":
    case "pivot.summarize":
    case "pivot.style":
    case "pivot.clear":
    case "pivot.filter":
    case "pivot.showAs":
    case "pivot.ungroup":
      return pivotCommand(doc, sheet, c.id, sv, act);
    case "pivot.sort":
      return pivotSortCommand(doc, sheet, act, sv);

    /* -------- page layout -------- */
    case "layout.margins": sheet.margins = sv; return { doc };
    case "layout.orientation": sheet.orientation = sv.toLowerCase() as "portrait" | "landscape"; return { doc };
    case "layout.size": doc.flags = { ...(doc.flags ?? {}), paper: sv }; return { doc };
    case "layout.printArea":
      sheet.printArea = sv === "Clear Print Area" ? null : normalizeRange(sel);
      return { doc };
    case "layout.fitWidth": sheet.fitTo = `${sv} wide`; return { doc };
    case "layout.fitHeight": sheet.fitTo = `${sheet.fitTo ?? ""} ${sv} tall`.trim(); return { doc };
    case "layout.gridlinesView": sheet.gridlines = sheet.gridlines === false; return { doc };
    case "layout.gridlinesPrint": sheet.printGridlines = !sheet.printGridlines; return { doc };
    case "layout.headingsView": sheet.headings = sheet.headings === false; return { doc };
    case "layout.headingsPrint": sheet.printHeadings = !sheet.printHeadings; return { doc };
    case "layout.theme": doc.theme = sv; return { doc };
    case "layout.breaks": doc.flags = { ...(doc.flags ?? {}), pageBreak: `${sv} at ${act}` }; return { doc };

    /* -------- formulas -------- */
    case "formulas.function": {
      // Picking a function from the Function Library opens Function Arguments;
      // statistical functions start with the adjacent range guessed, like AutoSum.
      const fn = sv.toUpperCase();
      if (["TODAY", "NOW"].includes(fn)) { setCellInput(sheet, act, `=${fn}()`); return { doc }; }
      const guess = ["SUM", "AVERAGE", "COUNT", "COUNTA", "MAX", "MIN", "MEDIAN", "PRODUCT"].includes(fn) ? autoSumRange(sheet, act) ?? "" : "";
      doc.pane = `Function Arguments|${fn}|${act}|${guess}`;
      return { doc };
    }
    case "formulas.showFormulas": sheet.showFormulas = !sheet.showFormulas; return { doc };
    case "formulas.evaluate":
      doc.pane = `Evaluate Formula|${act}`;
      return { doc };
    case "options.r1c1":
      doc.flags = { ...(doc.flags ?? {}), r1c1: sv === "On" };
      doc.pane = null;
      return { doc };
    case "formulas.tracePrecedents":
    case "formulas.traceDependents":
    case "formulas.removeArrows":
    case "formulas.errorChecking":
    case "formulas.calcNow":
    case "formulas.calcOptions":
    case "formulas.createFromSelection":
    case "formulas.nameManager":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || act };
      return { doc };

    /* -------- data -------- */
    case "data.flashFill": return doFlashFill(doc, sheet, sel, act);
    case "data.group": {
      const rc = selRect(sheet, sel);
      if (rc) sheet.groups = [...(sheet.groups ?? []), { rows: `${rc.r1}:${rc.r2}` }];
      return { doc };
    }
    case "data.ungroup": {
      // Ungroup the selected rows; with nothing grouped there, clear the outline.
      const rc = selRect(sheet, sel);
      const keep = (sheet.groups ?? []).filter((g) => !(rc && rangesOverlap(`A${g.rows.split(":")[0]}:A${g.rows.split(":")[1]}`, `A${rc.r1}:A${rc.r2}`)));
      sheet.groups = keep.length < (sheet.groups ?? []).length ? keep : [];
      sheet.hiddenRows = [];
      if (!sheet.groups.length) doc.flags = { ...(doc.flags ?? {}), [`outline:${sheet.name}`]: "" };
      return { doc };
    }
    case "outline.level": outlineLevel(doc, sheet, Number(sv) || 1); return { doc };
    case "outline.toggle": {
      sheet.groups = (sheet.groups ?? []).map((g) => (g.rows === sv ? { ...g, collapsed: !g.collapsed } : g));
      const g = sheet.groups.find((x) => x.rows === sv);
      if (g) {
        const [a, b] = sv.split(":").map(Number);
        const rows = Array.from({ length: b - a + 1 }, (_, i) => a + i);
        sheet.hiddenRows = g.collapsed ? Array.from(new Set([...(sheet.hiddenRows ?? []), ...rows])) : (sheet.hiddenRows ?? []).filter((r) => !rows.includes(r));
      }
      return { doc };
    }
    case "data.hideDetail":
    case "data.showDetail": {
      // Collapse or expand the group the active cell sits in (or summarizes, on the row below it).
      const r = parseRef(act)!.r;
      const g = (sheet.groups ?? []).find((x) => { const [a, b] = x.rows.split(":").map(Number); return r >= a && r <= b + 1; });
      if (g && Boolean(g.collapsed) !== (c.id === "data.hideDetail")) return applyExcel(doc, { kind: "command", id: "outline.toggle", value: g.rows }, ui);
      return { doc };
    }
    case "data.geography":
    case "data.stocks": {
      // Convert recognized text to a linked data type.
      if (c.id === "data.geography") {
        const flags = { ...(doc.flags ?? {}) };
        let n = 0;
        forEachCell(sheet, sel, (ref) => {
          const key = geographyKey(sheet.cells[ref]?.v);
          if (!key) return;
          sheet.cells[ref] = { ...sheet.cells[ref], v: String(GEOGRAPHY[key].Name) };
          flags[`geo:${sheet.name}!${ref}`] = true;
          n++;
        });
        doc.flags = flags;
        if (!n) doc.pane = "Data Selector: no matches. Check the spelling of the selected cells.";
        return { doc };
      }
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      return { doc };
    }
    case "data.refresh":
      // Refresh / Refresh All re-read the source of every PivotTable.
      refreshPivots(doc);
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      return { doc };
    case "data.getData":
    case "data.consolidate":
    case "data.whatIf":
    case "data.forecastSheet":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      return { doc };

    /* -------- review -------- */
    case "review.spelling": {
      const first = Object.entries(sheet.cells).find(([, cell]) => cell.spell?.length);
      doc.pane = first ? "Spelling" : "Spelling: done";
      return { doc, ui: first ? { selection: first[0] } : undefined };
    }
    case "spelling.change":
    case "spelling.changeAll":
    case "spelling.ignore": {
      const cell = sheet.cells[act];
      const word = String(cell?.v ?? "").toLowerCase();
      if (cell?.spell) sheet.cells[act] = { ...cell, v: c.id === "spelling.ignore" ? cell.v : sv || cell.spell[0], spell: undefined };
      // Change All, Ignore All and Add to Dictionary apply to every cell with the same word.
      if (c.id === "spelling.changeAll" || (c.id === "spelling.ignore" && (sv === "Ignore All" || sv === "Add to Dictionary"))) {
        for (const [ref, x] of Object.entries(sheet.cells)) {
          if (!x.spell || String(x.v ?? "").toLowerCase() !== word) continue;
          sheet.cells[ref] = { ...x, v: c.id === "spelling.changeAll" ? sv || x.spell[0] : x.v, spell: undefined };
        }
      }
      const next = Object.entries(sheet.cells).find(([, x]) => x.spell?.length);
      doc.pane = next ? "Spelling" : "Spelling: done";
      return { doc, ui: next ? { selection: next[0] } : undefined };
    }
    case "review.deleteComment":
      forEachCell(sheet, sel, (ref) => { const cell = sheet.cells[ref]; if (cell) sheet.cells[ref] = { ...cell, comment: undefined }; });
      return { doc };
    case "review.showNotes": doc.flags = { ...(doc.flags ?? {}), showNotes: !doc.flags?.showNotes }; return { doc };
    case "review.showComments": doc.pane = doc.pane === "Comments" ? null : "Comments"; return { doc };
    case "excel.editAnyway": doc.flags = { ...(doc.flags ?? {}), protect: "" }; return { doc };
    case "review.accessibility": doc.pane = "Accessibility"; return { doc };
    case "review.thesaurus": doc.pane = "Thesaurus"; return { doc };
    case "review.translate": doc.pane = "Translator"; return { doc };
    case "review.unprotectSheet": sheet.protected = false; return { doc };

    /* -------- view -------- */
    case "view.mode": {
      const map: Record<string, ExcelSheet["view"]> = { Normal: "normal", "Page Layout": "pageLayout", "Page Break Preview": "pageBreak" };
      sheet.view = map[sv] ?? "normal";
      return { doc };
    }
    case "view.gridlines": sheet.gridlines = sheet.gridlines === false; return { doc };
    case "view.headings": sheet.headings = sheet.headings === false; return { doc };
    case "view.formulaBar": doc.flags = { ...(doc.flags ?? {}), hideFormulaBar: !doc.flags?.hideFormulaBar }; return { doc };
    case "view.zoom": sheet.zoom = Number(sv.replace("%", "")) || 100; return { doc };
    case "view.zoomTo": sheet.zoom = 100; return { doc };
    case "view.zoomSelection": sheet.zoom = 150; return { doc };
    case "view.freeze": {
      if (sv === "Unfreeze Panes") sheet.freeze = null;
      else if (sv === "Freeze Top Row") sheet.freeze = "A2";
      else if (sv === "Freeze First Column") sheet.freeze = "B1";
      else sheet.freeze = act === "A1" ? null : act;
      return { doc };
    }
    case "view.split":
      sheet.split = !sheet.split;
      doc.flags = { ...(doc.flags ?? {}), [`split:${sheet.name}`]: sheet.split ? act : "" };
      return { doc };
    case "view.sheetViewNew":
      doc.flags = { ...(doc.flags ?? {}), sheetView: "Temporary View" };
      return { doc };
    case "view.sheetViewKeep":
      if (doc.flags?.sheetView) doc.flags = { ...(doc.flags ?? {}), sheetView: "View1" };
      return { doc };
    case "view.sheetViewExit":
      doc.flags = { ...(doc.flags ?? {}), sheetView: "" };
      return { doc };
    case "view.newWindow":
    case "view.arrangeAll":
    case "view.hide":
    case "view.sideBySide":
    case "view.macros":
    case "help.help":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      if (c.id === "help.help") doc.pane = "Help";
      return { doc };
  }
  return { doc };
}

function decimalsOf(v: unknown): number {
  if (typeof v !== "number") return 0;
  const s = String(v);
  return s.includes(".") ? s.split(".")[1].length : 0;
}

export const TAB_COLORS: Record<string, string> = {
  Red: "#C00000",
  Orange: "#ED7D31",
  Gold: "#FFC000",
  Green: "#70AD47",
  Blue: "#4472C4",
  "Dark Blue": "#203864",
  Purple: "#7030A0",
  Gray: "#A5A5A5",
};

function forEachCol(sheet: ExcelSheet, sel: string, fn: (col: string) => void) {
  const rc = selRect(sheet, sel);
  if (!rc) return;
  for (let c = rc.c1; c <= Math.min(rc.c2, rc.c1 + 40); c++) fn(numToCol(c));
}

function addSheet(doc: ExcelBook, after: string, before: boolean): { doc: ExcelBook; ui?: Partial<SimUi> } {
  let n = doc.sheets.length + 1;
  while (doc.sheets.some((s) => s.name === `Sheet${n}`)) n++;
  const name = `Sheet${n}`;
  const i = doc.sheets.findIndex((s) => s.name === after);
  doc.sheets.splice(before ? i : i + 1, 0, { name, cells: {} });
  return { doc, ui: { sheet: name, selection: "A1" } };
}

function addChart(doc: ExcelBook, sheet: ExcelSheet, ui: SimUi, type: string): { doc: ExcelBook; ui?: Partial<SimUi> } {
  const sel = ui.selection;
  if (sheet.pivot) {
    // A PivotChart plots the PivotTable and follows it as fields and filters change.
    const id = `c${(sheet.charts?.length ?? 0) + 1}`;
    const at = parseRef(sheet.pivot.at ?? "A3")!;
    sheet.charts = [...(sheet.charts ?? []), { id, type, title: "Total", range: "PIVOT", at: refOf(at.c + 6, at.r) }];
    return { doc, ui: { selection: `chart:${id}` } };
  }
  const rc = sel.includes(":") ? selRect(sheet, sel) : currentRegion(sheet, activeCell(ui));
  if (!rc) return { doc };
  const id = `c${(sheet.charts?.length ?? 0) + 1}`;
  sheet.charts = [...(sheet.charts ?? []), { id, type, title: "Chart Title", range: rectToRange(rc), at: refOf(rc.c2 + 2, rc.r1) }];
  return { doc, ui: { selection: `chart:${id}` } };
}

function pivotCommand(doc: ExcelBook, sheet: ExcelSheet, id: string, sv: string, act: string): { doc: ExcelBook } {
  const pv = sheet.pivot as unknown as XPivot | null | undefined;
  if (!pv) return { doc };
  const recs = pivotRecords(doc, pv);
  // Numeric fields go to Values, text and dates to Rows (checking a box in the field list).
  const numeric = (f: string) => Boolean(recs?.isNumeric(f) && !recs.isDate(f));
  const remove = (f: string, keepValues = false) => {
    pv.rows = pv.rows.filter((x) => x !== f);
    pv.columns = pv.columns.filter((x) => x !== f);
    pv.filters = pv.filters.filter((x) => x !== f);
    if (!keepValues) pv.values = pv.values.filter((x) => x.field !== f);
  };
  switch (id) {
    case "pivot.field": {
      const on = pv.rows.includes(sv) || pv.columns.includes(sv) || pv.filters.includes(sv) || pv.values.some((x) => x.field === sv);
      if (on) remove(sv);
      else if (numeric(sv)) pv.values.push({ field: sv, fn: "Sum" });
      else pv.rows.push(sv);
      break;
    }
    case "pivot.area": {
      const [f, area] = sv.split(">");
      if (area === "Values") {
        // A field can sit in Values more than once (Sum of Amount and Count of Amount2).
        remove(f, true);
        pv.values.push({ field: f, fn: numeric(f) ? "Sum" : "Count" });
        break;
      }
      remove(f);
      if (area === "Rows") pv.rows.push(f);
      else if (area === "Columns") pv.columns.push(f);
      else if (area === "Filters") pv.filters.push(f);
      break;
    }
    case "pivot.summarize": {
      // "Average" applies to the active value field; "Average|Amount" names the field.
      const [fn, field] = sv.split("|");
      const i = field ? Math.max(0, pv.values.findIndex((x) => x.field === field)) : activeValueIndex(doc, sheet, act);
      if (pv.values[i]) pv.values = pv.values.map((x, j) => (j === i ? { ...x, fn } : x));
      break;
    }
    case "pivot.ungroup": {
      const f = activePivotField(doc, sheet, act) ?? firstDateField(doc, pv);
      if (f && pv.groups) {
        const groups = { ...pv.groups };
        delete groups[f];
        pv.groups = groups;
      }
      break;
    }
    case "pivot.filter": {
      // "Department=Pediatrics|Family Medicine" (report filter or slicer); "Department=*" clears it.
      const eq = sv.indexOf("=");
      const f = sv.slice(0, eq), items = sv.slice(eq + 1);
      const flags = { ...(doc.flags ?? {}) };
      if (!items || items === "*") delete flags[`pvf:${sheet.name}:${f}`];
      else flags[`pvf:${sheet.name}:${f}`] = items;
      doc.flags = flags;
      break;
    }
    case "pivot.showAs": {
      if (!pv.values.length) {
        doc.flags = { ...(doc.flags ?? {}), [`pvShowAs:${sheet.name}`]: sv === "No Calculation" ? "" : sv };
        break;
      }
      const i = activeValueIndex(doc, sheet, act);
      const showAs = syncShowAs(doc, sheet, i, sv);
      pv.values = pv.values.map((x, j) => (j === i ? { ...x, showAs } : x));
      break;
    }
    case "pivot.style":
      pv.style = sv;
      break;
    case "pivot.clear":
      pv.rows = []; pv.columns = []; pv.values = []; pv.filters = []; pv.groups = {}; pv.sort = {};
      break;
  }
  return { doc };
}

/** Show Values As for value field i; the first field's setting also lives in the sheet's pvShowAs flag. */
function syncShowAs(doc: ExcelBook, sheet: ExcelSheet, i: number, sv: string): string {
  const v = sv === "No Calculation" ? "" : sv;
  if (i === 0) doc.flags = { ...(doc.flags ?? {}), [`pvShowAs:${sheet.name}`]: v };
  return v;
}

/** The PivotTable report cell under a reference, if any. */
export function pivotCellAt(doc: ExcelBook, sheet: ExcelSheet, ref: string) {
  if (!sheet.pivot) return undefined;
  return pivotLayoutOf(doc, sheet)?.cells[ref];
}

/** The value field the active cell belongs to (the first one otherwise). */
export function activeValueIndex(doc: ExcelBook, sheet: ExcelSheet, act: string): number {
  const pc = pivotCellAt(doc, sheet, act);
  return pc?.vi !== undefined && pc.vi >= 0 ? pc.vi : 0;
}

/** The row or column field of the active item cell, mapped back to its source field. */
function activePivotField(doc: ExcelBook, sheet: ExcelSheet, act: string): string | null {
  const pv = sheet.pivot as unknown as XPivot | undefined;
  const pc = pivotCellAt(doc, sheet, act);
  if (!pv || !pc?.field || (pc.kind !== "rowItem" && pc.kind !== "colItem")) return null;
  if ([...pv.rows, ...pv.columns].includes(pc.field)) return pc.field;
  return Object.keys(pv.groups ?? {}).find((f) => pv.groups![f].includes(pc.field!)) ?? null;
}

function firstDateField(doc: ExcelBook, pv: XPivot): string | null {
  const recs = pivotRecords(doc, pv);
  return [...pv.rows, ...pv.columns].find((f) => recs?.isDate(f)) ?? null;
}

/**
 * Sort a PivotTable: from a value cell by that value (Sort Largest to
 * Smallest), from an item cell by its labels. The sort sticks to the field,
 * so it survives refreshes.
 */
function pivotSortCommand(doc: ExcelBook, sheet: ExcelSheet, act: string, sv: string): { doc: ExcelBook } {
  const pv = sheet.pivot as unknown as XPivot | undefined;
  if (!pv) return { doc };
  const lay = pivotLayoutOf(doc, sheet);
  const pc = lay?.cells[act];
  const desc = /Largest to Smallest|Z to A|Newest to Oldest|Descending/i.test(sv);
  const byValue = pc ? pc.kind === "value" || pc.kind === "grand" || (pc.kind === "header" && pc.vi !== undefined) : /Largest|Smallest/i.test(sv);
  let field: string | undefined;
  if (pc?.kind === "rowItem" || pc?.kind === "colItem") field = pc.field;
  else if (pc?.rowPath?.length && lay) field = lay.rowFields[pc.rowPath.length - 1];
  field = field ?? lay?.rowFields[0] ?? pv.rows[0];
  if (!field) return { doc };
  const vi = pc?.vi !== undefined && pc.vi >= 0 ? pc.vi : 0;
  pv.sort = { ...(pv.sort ?? {}), [field]: { by: byValue && pv.values[vi] ? pivotValueLabel(pv, vi) : "label", desc } };
  return { doc };
}

/** Where a new PivotTable reads from: what was typed in Table/Range, else the table or region around the active cell. */
function pivotSourceFromDialog(doc: ExcelBook, sheet: ExcelSheet, sel: string, act: string, raw: string, defSheet = sheet.name): { sheet: string; range: string } | null {
  const t = raw.trim().replace(/^=/, "");
  if (t) {
    const table = findTable(doc, t.replace(/^.*!/, ""));
    if (table?.sheet.table?.name) return { sheet: table.sheet.name, range: table.sheet.table.name };
    const r = resolveRef(doc, doc.sheets.find((s) => s.name === defSheet) ?? sheet, t);
    if (r) {
      // A range that is exactly a table becomes the table, as Excel shows it.
      if (r.sheet.table?.name && normalizeRange(r.sheet.table.range) === rectToRange(r.rect)) return { sheet: r.sheet.name, range: r.sheet.table.name };
      return { sheet: r.sheet.name, range: rectToRange(r.rect) };
    }
  }
  if (sheet.table?.name && inTable(sheet, act, true)) return { sheet: sheet.name, range: sheet.table.name };
  const rc = currentRegion(sheet, act) ?? selRect(sheet, sel);
  return rc ? { sheet: sheet.name, range: rectToRange(rc) } : null;
}

/** "chart:c1" or "chart:c1.s2" (one series selected) → "c1". */
export function chartIdOf(sel: string): string | undefined {
  if (!sel.startsWith("chart:")) return undefined;
  return sel.slice(6).split(".")[0] || undefined;
}

/** The selected series number in "chart:c1.s2", if any. */
export function chartSeriesOf(sel: string): number | undefined {
  const m = /^chart:[^.]+\.s(\d+)$/.exec(sel);
  return m ? Number(m[1]) : undefined;
}

function applyChartTemplate(doc: ExcelBook, ch: ExcelChart, name: string) {
  const raw = doc.flags?.[`charttpl:${name}`];
  if (!raw) return;
  const t = JSON.parse(String(raw)) as { type?: string; style?: string; labels?: boolean; legend?: string; axisTitles?: boolean; colors?: string };
  if (t.type) ch.type = t.type;
  if (t.style) ch.style = t.style;
  const flags = { ...(doc.flags ?? {}) };
  if (t.labels) flags[`chart:${ch.id}:labels`] = true;
  if (t.legend) flags[`chart:${ch.id}:legend`] = t.legend;
  if (t.axisTitles) flags[`chart:${ch.id}:axisTitles`] = true;
  if (t.colors) flags["chart.colors"] = t.colors;
  flags[`chart:${ch.id}:template`] = name;
  doc.flags = flags;
}

/** Names of the chart templates saved with Save as Template. */
export function chartTemplates(doc: ExcelBook): string[] {
  return Object.keys(doc.flags ?? {})
    .filter((k) => k.startsWith("charttpl:"))
    .map((k) => k.slice(9));
}

/** Absolute reference text for Select Data Source: =Data!$B$2:$B$7. */
export function absRef(sheetName: string, rc: Rect): string {
  const q = /^[A-Za-z_][A-Za-z0-9_]*$/.test(sheetName) ? sheetName : `'${sheetName}'`;
  const a = `$${numToCol(rc.c1)}$${rc.r1}`;
  const b = `$${numToCol(rc.c2)}$${rc.r2}`;
  return `=${q}!${a === b ? a : `${a}:${b}`}`;
}

/**
 * The series a chart's data range makes (as Select Data Source lists them):
 * one per column after the label column, or one per row when switched.
 */
export function seriesFromRange(doc: ExcelBook, sheet: ExcelSheet, range: string, switched: boolean): { series: { name: string; values: string }[]; categories: string } {
  const t = resolveRef(doc, sheet, range);
  if (!t) return { series: [], categories: "" };
  const { rect: rc, sheet: src } = t;
  const firstColText = typeof evaluateCell(doc, src, refOf(rc.c1, rc.r1 + 1)) !== "number";
  const headerRow = typeof evaluateCell(doc, src, refOf(rc.c2, rc.r1)) !== "number";
  const dc = firstColText ? rc.c1 + 1 : rc.c1;
  const dr = headerRow ? rc.r1 + 1 : rc.r1;
  const series: { name: string; values: string }[] = [];
  if (!switched) {
    for (let c = dc; c <= rc.c2; c++) series.push({ name: headerRow ? absRef(src.name, { c1: c, c2: c, r1: rc.r1, r2: rc.r1 }) : `Series${series.length + 1}`, values: absRef(src.name, { c1: c, c2: c, r1: dr, r2: rc.r2 }) });
    return { series, categories: firstColText ? absRef(src.name, { c1: rc.c1, c2: rc.c1, r1: dr, r2: rc.r2 }) : "" };
  }
  for (let r = dr; r <= rc.r2; r++) series.push({ name: firstColText ? absRef(src.name, { c1: rc.c1, c2: rc.c1, r1: r, r2: r }) : `Series${series.length + 1}`, values: absRef(src.name, { c1: dc, c2: rc.c2, r1: r, r2: r }) });
  return { series, categories: headerRow ? absRef(src.name, { c1: dc, c2: rc.c2, r1: rc.r1, r2: rc.r1 }) : "" };
}

/** Select Data Source › OK: the data range, the series list, the category labels and Switch Row/Column. */
function applySelectData(doc: ExcelBook, sheet: ExcelSheet, ui: SimUi, val: Record<string, SimValue>): { doc: ExcelBook } {
  if (doc.pane?.startsWith("Select Data Source")) doc.pane = null;
  const id = chartIdOf(ui.selection) ?? sheet.charts?.[sheet.charts.length - 1]?.id;
  const ch = sheet.charts?.find((x) => x.id === id) as XChart | undefined;
  if (!ch || ch.range === "PIVOT") return { doc };
  const flags = { ...(doc.flags ?? {}) };
  const range = String(val.range ?? "").trim();
  if (range) {
    const t = resolveRef(doc, sheet, range);
    if (t) ch.range = t.sheet === sheet ? rectToRange(t.rect) : `${t.sheet.name}!${rectToRange(t.rect)}`;
  }
  if (val.switched !== undefined) flags[`chart:${ch.id}:switch`] = Boolean(val.switched);
  // Series edited by hand (added, edited or removed) are kept as a list; otherwise the range decides.
  if (val.edited && val.series) {
    try {
      const list = JSON.parse(String(val.series)) as { name: string; values: string }[];
      ch.series = list.filter((s) => s.values);
      ch.categories = String(val.categories ?? "") || undefined;
      flags[`chart:${ch.id}:switch`] = false;
    } catch {
      /* keep the chart as it was */
    }
  } else {
    delete ch.series;
    delete ch.categories;
  }
  doc.flags = flags;
  return { doc };
}

/** Insert › Sparklines: one sparkline per location cell, grouped, each from its own row or column of the data. */
function insertSparklines(doc: ExcelBook, sheet: ExcelSheet, act: string, type: string, dataRange: string, location: string): { doc: ExcelBook } {
  const data = dataRange.trim().replace(/^=/, "").replace(/\$/g, "");
  const locRc = parseRange((location.trim().replace(/^=/, "").replace(/^.*!/, "").replace(/\$/g, "") || act).toUpperCase());
  const t = resolveRef(doc, sheet, data);
  if (!locRc || !t) return { doc };
  const prefix = data.includes("!") ? data.slice(0, data.lastIndexOf("!") + 1) : "";
  const cellsAt: string[] = [];
  for (let r = locRc.r1; r <= locRc.r2; r++) for (let c = locRc.c1; c <= locRc.c2; c++) cellsAt.push(refOf(c, r));
  const d = t.rect;
  const rows = d.r2 - d.r1 + 1, cols = d.c2 - d.c1 + 1;
  const n = cellsAt.length;
  const ranges: string[] = [];
  if (n === 1) ranges.push(rectToRange(d));
  else if (locRc.r1 === locRc.r2 && cols === n) for (let i = 0; i < n; i++) ranges.push(rectToRange({ c1: d.c1 + i, c2: d.c1 + i, r1: d.r1, r2: d.r2 }));
  else if (rows === n) for (let i = 0; i < n; i++) ranges.push(rectToRange({ c1: d.c1, c2: d.c2, r1: d.r1 + i, r2: d.r1 + i }));
  else if (cols === n) for (let i = 0; i < n; i++) ranges.push(rectToRange({ c1: d.c1 + i, c2: d.c1 + i, r1: d.r1, r2: d.r2 }));
  else {
    doc.pane = "Location reference is not valid. The location must have as many cells as the data range has rows or columns.";
    return { doc };
  }
  let g = 1;
  while ((sheet.sparklines ?? []).some((s) => (s as XSparkline).group === `g${g}`)) g++;
  const kept = (sheet.sparklines ?? []).filter((s) => !cellsAt.includes(s.at));
  const added: XSparkline[] = cellsAt.map((at, i) => ({ range: prefix + ranges[i], at, type, group: `g${g}` }));
  sheet.sparklines = [...kept, ...added];
  return { doc };
}

export function sparklineAt(sheet: ExcelSheet, ref: string): XSparkline | undefined {
  return sheet.sparklines?.find((s) => s.at === ref) as XSparkline | undefined;
}

/** Sparkline tab: type, Show points and color apply to the whole group of the active sparkline. */
function sparklineCommand(doc: ExcelBook, sheet: ExcelSheet, sel: string, act: string, id: string, sv: string): { doc: ExcelBook } {
  const cur = sparklineAt(sheet, act);
  if (!cur) return { doc };
  const list = (sheet.sparklines ?? []) as XSparkline[];
  const selRc = selRect(sheet, sel);
  const inSel = (s: XSparkline) => {
    const p = parseRef(s.at);
    return Boolean(p && selRc && p.c >= selRc.c1 && p.c <= selRc.c2 && p.r >= selRc.r1 && p.r <= selRc.r2);
  };
  const inGroup = (s: XSparkline) => (cur.group ? s.group === cur.group : s.at === cur.at);
  if (id === "sparkline.clear") {
    sheet.sparklines = list.filter((s) => !(sv === "Clear Selected Sparkline Groups" ? inGroup(s) : inSel(s)));
    return { doc };
  }
  if (id === "sparkline.ungroup") {
    let n = 1;
    sheet.sparklines = list.map((s) => {
      if (!inGroup(s)) return s;
      while (list.some((x) => x.group === `u${n}`)) n++;
      return { ...s, group: `u${n++}` };
    });
    return { doc };
  }
  if (id === "sparkline.group") {
    let g = 1;
    while (list.some((s) => s.group === `g${g}`)) g++;
    sheet.sparklines = list.map((s) => (inSel(s) ? { ...s, group: `g${g}`, type: cur.type, color: cur.color, high: cur.high, low: cur.low } : s));
    return { doc };
  }
  const patch: Partial<XSparkline> =
    id === "sparkline.type" ? { type: sv || "Line" }
    : id === "sparkline.color" ? { color: SPARKLINE_COLORS[sv] ?? sv }
    : { [id.slice(10)]: !cur[id.slice(10) as "high"] };
  sheet.sparklines = list.map((s) => (inGroup(s) ? { ...s, ...patch } : s));
  return { doc };
}

/** SUBTOTAL codes behind the Total Row drop-down (101-110 skip rows hidden by a filter). */
export const TOTAL_FN_CODES: Record<string, number> = { Average: 101, Count: 103, "Count Numbers": 102, Max: 104, Min: 105, Sum: 109, StdDev: 107, Var: 110 };
export const TOTAL_FN_NAMES = ["None", "Average", "Count", "Count Numbers", "Max", "Min", "Sum", "StdDev", "Var", "More Functions..."];

/** A table column name in a structured reference: Excel puts an apostrophe before ' # [ and ]. */
function structuredCol(name: string): string {
  return name.replace(/(['#[\]])/g, "'$1");
}

/** The cells Excel puts in a new Total Row: "Total" in the first column, =SUBTOTAL(109,[Column]) under the last numeric column. */
export function totalRowDefaults(doc: ExcelBook, sheet: ExcelSheet): Record<string, ExcelCell> {
  const rc = tableRect(sheet);
  if (!rc || !sheet.table) return {};
  const out: Record<string, ExcelCell> = {};
  const r = rc.r2 + 1;
  let sumCol = 0;
  for (let c = rc.c2; c >= rc.c1 && !sumCol; c--) {
    for (let rr = rc.r1 + 1; rr <= rc.r2; rr++) {
      const v = evaluateCell(doc, sheet, refOf(c, rr));
      if (v === null || v === "") continue;
      if (typeof v === "number" && !isDateFormat(sheet.cells[refOf(c, rr)]?.fmt)) sumCol = c;
      break;
    }
  }
  if (sumCol !== rc.c1) out[refOf(rc.c1, r)] = { ...(sheet.cells[refOf(rc.c1, r)] ?? {}), v: "Total" };
  if (sumCol) {
    const head = String(sheet.cells[refOf(sumCol, rc.r1)]?.v ?? `Column${sumCol - rc.c1 + 1}`);
    const f = sheet.cells[refOf(sumCol, rc.r1 + 1)]?.fmt;
    out[refOf(sumCol, r)] = { f: `=SUBTOTAL(109,[${structuredCol(head)}])`, ...(f ? { fmt: numberOnly(f) } : {}) };
  }
  return out;
}

function numberOnly(f: CellFormat): CellFormat {
  const out: XCellFormat = {};
  if (f.numFmt) out.numFmt = f.numFmt;
  if (f.decimals !== undefined) out.decimals = f.decimals;
  if ((f as XCellFormat).custom) out.custom = (f as XCellFormat).custom;
  return out;
}

/** A table whose Total Row is on but has no cells yet (older workbooks) gets the default totals. */
export function withTotalRows(doc: ExcelBook): ExcelBook {
  const needs = (s: ExcelSheet) => {
    const rc = tableRect(s);
    if (!rc || !s.table?.totalRow) return false;
    for (let c = rc.c1; c <= rc.c2; c++) if (s.cells[refOf(c, rc.r2 + 1)]?.v !== undefined || s.cells[refOf(c, rc.r2 + 1)]?.f) return false;
    return true;
  };
  if (!doc.sheets.some(needs)) return doc;
  return { ...doc, sheets: doc.sheets.map((s) => (needs(s) ? { ...s, cells: { ...s.cells, ...totalRowDefaults(doc, s) } } : s)) };
}

/** Header & Footer Elements: the codes Excel stores in the header text. */
export const HF_CODES: Record<string, string> = {
  "hf.pageNumber": "&[Page]",
  "hf.numberOfPages": "&[Pages]",
  "hf.currentDate": "&[Date]",
  "hf.currentTime": "&[Time]",
  "hf.filePath": "&[Path]&[File]",
  "hf.fileName": "&[File]",
  "hf.sheetName": "&[Tab]",
};

/** What a header or footer shows on the page: codes replaced by their values. */
export function resolveHeaderFooter(text: string, sheetName: string, fileName: string): string {
  return text
    .replace(/&\[Page\]/g, "1")
    .replace(/&\[Pages\]/g, "1")
    .replace(/&\[Date\]/g, "10/20/2026")
    .replace(/&\[Time\]/g, "9:00 AM")
    .replace(/&\[Path\]/g, "C:\\Users\\BEOC Student\\Documents\\")
    .replace(/&\[File\]/g, fileName)
    .replace(/&\[Tab\]/g, sheetName);
}

function doFlashFill(doc: ExcelBook, sheet: ExcelSheet, sel: string, act: string): { doc: ExcelBook } {
  const p = parseRef(act);
  const region = p ? currentRegion(sheet, act) : null;
  doc.flags = { ...(doc.flags ?? {}), flashFill: act };
  if (!p || !region) {
    doc.pane = "Flash Fill: We looked at all the data next to the selection and didn't see a pattern for filling in values for you.";
    return { doc };
  }
  // Column headings: a formatted first row, a table header, or text over numbers.
  const firstRowStyled = Array.from({ length: region.c2 - region.c1 + 1 }, (_, i) => sheet.cells[refOf(region.c1 + i, region.r1)]?.fmt).some((f) => f && (f.bold || f.fill || f.border));
  const textOverNumbers = headerLike(sheet, region) && Array.from({ length: region.c2 - region.c1 + 1 }, (_, i) => typeof sheet.cells[refOf(region.c1 + i, region.r1 + 1)]?.v === "number").some(Boolean);
  const header = Boolean((sheet.table && inTable(sheet, refOf(region.c1, region.r1))) || firstRowStyled || textOverNumbers);
  const res = flashFill(doc, sheet, region, p.c, header);
  for (const [ref, v] of Object.entries(res.fill)) sheet.cells[ref] = { ...(sheet.cells[ref] ?? {}), v };
  if (res.message) doc.pane = `Flash Fill: ${res.message}`;
  else doc.flags = { ...doc.flags, flashFillCount: Object.keys(res.fill).length, flashFillRule: res.explanation ?? "" };
  void sel;
  return { doc };
}

/** Width of what a cell shows, in pixels, for AutoFit. */
function shownWidth(doc: ExcelBook, sheet: ExcelSheet, ref: string, text?: string, fmt?: CellFormat): number {
  const cell = sheet.cells[ref];
  const f = fmt ?? cell?.fmt;
  const shown = text ?? formatValue(evaluateCell(doc, sheet, ref), f);
  const size = f?.size ?? 11;
  return shown.length * 7 * (size / 11) * (f?.bold ? 1.08 : 1) + 12;
}

/** Home › Format › AutoFit Column Width (or double-click a column header's right border). */
function autoFitColumns(doc: ExcelBook, sheet: ExcelSheet, sel: string) {
  const pivotCells = sheet.pivot ? pivotLayoutOf(doc, sheet)?.cells ?? {} : {};
  forEachCol(sheet, sel, (col) => {
    let max = 0;
    // A whole column fits all of its contents; a range fits the selected cells, as in Excel.
    const rc = selRect(sheet, sel);
    const whole = /^[A-Z]+:[A-Z]+$/i.test(sel) || !rc;
    for (const ref of Object.keys(sheet.cells)) {
      const p = parseRef(ref);
      if (!p || numToCol(p.c) !== col) continue;
      if (!whole && rc && (p.r < rc.r1 || p.r > rc.r2)) continue;
      const cell = sheet.cells[ref];
      if (cell.v === undefined && !cell.f) continue;
      if ((sheet.merges ?? []).some((m) => { const x = parseRange(m); return x && x.c1 !== x.c2 && p.c >= x.c1 && p.c <= x.c2 && p.r >= x.r1 && p.r <= x.r2; })) continue;
      max = Math.max(max, shownWidth(doc, sheet, ref));
    }
    for (const [ref, pc] of Object.entries(pivotCells)) {
      const p = parseRef(ref);
      if (p && numToCol(p.c) === col) max = Math.max(max, shownWidth(doc, sheet, ref, formatValue(pc.v, pc.fmt), pc.fmt) + (pc.fmt?.indent ?? 0) * 10);
    }
    if (max > 0) sheet.colWidths = { ...(sheet.colWidths ?? {}), [col]: Math.round(Math.min(400, Math.max(24, max))) };
  });
}

/** Home › Format › AutoFit Row Height (or double-click a row header's bottom border). */
function autoFitRows(doc: ExcelBook, sheet: ExcelSheet, sel: string) {
  const rc = selRect(sheet, sel);
  if (!rc) return;
  const heights = { ...(sheet.rowHeights ?? {}) };
  for (let r = rc.r1; r <= Math.min(rc.r2, rc.r1 + 400); r++) {
    let h = 22;
    for (const [ref, cell] of Object.entries(sheet.cells)) {
      const p = parseRef(ref);
      if (!p || p.r !== r || (cell.v === undefined && !cell.f)) continue;
      const size = cell.fmt?.size ?? 11;
      let lines = 1;
      if (cell.fmt?.wrap) {
        const w = sheet.colWidths?.[numToCol(p.c)] ?? 76;
        const per = Math.max(4, Math.floor((w - 6) / (6.2 * (size / 11))));
        lines = formatValue(evaluateCell(doc, sheet, ref), cell.fmt).split("\n").reduce((n, part) => n + Math.max(1, Math.ceil(part.length / per)), 0);
      }
      h = Math.max(h, lines * 15 * (size / 11) + 6);
    }
    if (Math.round(h) === 22) delete heights[String(r)];
    else heights[String(r)] = Math.round(h);
  }
  sheet.rowHeights = heights;
}

function subtotal(doc: ExcelBook, sheet: ExcelSheet, act: string, atEach: string, fn: string, addTo: string) {
  const rc = currentRegion(sheet, act);
  if (!rc) return;
  let groupCol = rc.c1, valueCol = rc.c2;
  for (let c = rc.c1; c <= rc.c2; c++) {
    const h = String(sheet.cells[refOf(c, rc.r1)]?.v ?? "");
    if (h.toLowerCase() === atEach.toLowerCase()) groupCol = c;
    if (h.toLowerCase() === addTo.toLowerCase()) valueCol = c;
  }
  const code = ({ Sum: 9, Count: 3, Average: 1, Max: 4, Min: 5 } as Record<string, number>)[fn] ?? 9;
  const rows: { cells: Record<number, ExcelCell | undefined> }[] = [];
  for (let r = rc.r1 + 1; r <= rc.r2; r++) {
    const row: Record<number, ExcelCell | undefined> = {};
    for (let c = rc.c1; c <= rc.c2; c++) row[c] = sheet.cells[refOf(c, r)];
    rows.push({ cells: row });
  }
  // Subtotal inserts whole rows, so anything below the list moves down rather than being overwritten.
  let changes = 0;
  rows.forEach((row, i) => { if (!rows[i + 1] || String(rows[i + 1].cells[groupCol]?.v ?? "") !== String(row.cells[groupCol]?.v ?? "")) changes++; });
  insertLines(sheet, "row", rc.r2 + 1, changes + 1);
  // Clear body
  for (let r = rc.r1 + 1; r <= rc.r2; r++) for (let c = rc.c1; c <= rc.c2; c++) delete sheet.cells[refOf(c, r)];
  let out = rc.r1 + 1;
  let groupStart = out;
  const groups: { rows: string }[] = [];
  const totals: string[] = [];
  rows.forEach((row, i) => {
    for (let c = rc.c1; c <= rc.c2; c++) if (row.cells[c]) sheet.cells[refOf(c, out)] = row.cells[c]!;
    out++;
    const key = String(row.cells[groupCol]?.v ?? "");
    const nextKey = rows[i + 1] ? String(rows[i + 1].cells[groupCol]?.v ?? "") : null;
    if (nextKey !== key) {
      sheet.cells[refOf(groupCol, out)] = { v: `${key} Total`, fmt: { bold: true } };
      sheet.cells[refOf(valueCol, out)] = { f: `=SUBTOTAL(${code},${refOf(valueCol, groupStart)}:${refOf(valueCol, out - 1)})`, fmt: { bold: true, ...(row.cells[valueCol]?.fmt ?? {}) } };
      groups.push({ rows: `${groupStart}:${out - 1}` });
      totals.push(refOf(valueCol, out));
      out++;
      groupStart = out;
    }
  });
  sheet.cells[refOf(groupCol, out)] = { v: "Grand Total", fmt: { bold: true } };
  sheet.cells[refOf(valueCol, out)] = { f: `=SUBTOTAL(${code},${refOf(valueCol, rc.r1 + 1)}:${refOf(valueCol, out - 1)})`, fmt: { ...(sheet.cells[refOf(valueCol, rc.r1 + 1)]?.fmt ?? {}), bold: true } };
  sheet.groups = groups;
  sheet.hiddenRows = [];
  // Outline level 1 hides everything above the grand total.
  doc.flags = { ...(doc.flags ?? {}), [`outline:${sheet.name}`]: `${rc.r1 + 1}:${out - 1}` };
  sheet.rows = Math.max(sheet.rows ?? DEFAULT_ROWS, out + 2);
}

/** The outline buttons 1, 2, 3 at the top of the outline bar. */
function outlineLevel(doc: ExcelBook, sheet: ExcelSheet, level: number) {
  const span = String(doc.flags?.[`outline:${sheet.name}`] ?? "");
  const groups = sheet.groups ?? [];
  const rowsOf = (g: string) => {
    const [a, b] = g.split(":").map(Number);
    return Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
  };
  const levels = span ? 3 : 2;
  if (level >= levels) {
    sheet.groups = groups.map((g) => ({ ...g, collapsed: false }));
    sheet.hiddenRows = [];
  } else if (level === levels - 1) {
    sheet.groups = groups.map((g) => ({ ...g, collapsed: true }));
    sheet.hiddenRows = Array.from(new Set(groups.flatMap((g) => rowsOf(g.rows))));
  } else {
    sheet.groups = groups.map((g) => ({ ...g, collapsed: true }));
    sheet.hiddenRows = rowsOf(span);
  }
}

/* ------------------------------------------------------------------ */
/* Ribbon state / contextual                                           */
/* ------------------------------------------------------------------ */

export function excelRibbonState(doc: ExcelBook, ui: SimUi): Record<string, SimValue | undefined> {
  const sheet = sheetOf(doc, ui);
  const f = firstFmt(sheet, ui);
  return {
    "home.fontName": f.font ?? "Aptos Narrow",
    "home.fontSize": f.size ?? 11,
    "home.bold": Boolean(f.bold),
    "home.italic": Boolean(f.italic),
    "home.underline": Boolean(f.underline),
    "home.alignLeft": f.align === "left",
    "home.alignCenter": f.align === "center",
    "home.alignRight": f.align === "right",
    "home.alignTop": f.valign === "top",
    "home.alignMiddle": f.valign === "middle",
    "home.alignBottom": !f.valign || f.valign === "bottom",
    "home.wrap": Boolean(f.wrap),
    "home.numberFormat": (f as XCellFormat).custom ? "Custom" : f.numFmt ?? "General",
    "home.formatPainter": Boolean(doc.painter),
    "data.filter": Boolean(sheet.filter),
    "formulas.showFormulas": Boolean(sheet.showFormulas),
    "view.gridlines": sheet.gridlines !== false,
    "view.headings": sheet.headings !== false,
    "view.formulaBar": !doc.flags?.hideFormulaBar,
    "view.split": Boolean(sheet.split),
    "layout.gridlinesView": sheet.gridlines !== false,
    "layout.headingsView": sheet.headings !== false,
    "layout.gridlinesPrint": Boolean(sheet.printGridlines),
    "layout.headingsPrint": Boolean(sheet.printHeadings),
    "table.totalRow": Boolean(sheet.table?.totalRow),
    "table.name": sheet.table?.name ?? "",
    "review.showComments": doc.pane === "Comments",
    "table.filterButton": Boolean(sheet.filter),
    "table.headerRow": true,
    "table.bandedRows": !doc.flags?.["table.bandedRows"],
    "view.normal": (sheet.view ?? "normal") === "normal",
    "view.pageLayout": sheet.view === "pageLayout",
    "view.pageBreak": sheet.view === "pageBreak",
    ...(() => {
      const sp = sparklineAt(sheet, activeCell(ui));
      return {
        "sparkline.typeLine": sp?.type === "Line",
        "sparkline.typeColumn": sp?.type === "Column",
        "sparkline.typeWinLoss": sp?.type === "Win/Loss",
        "sparkline.high": Boolean(sp?.high),
        "sparkline.low": Boolean(sp?.low),
        "sparkline.negative": Boolean(sp?.negative),
        "sparkline.first": Boolean(sp?.first),
        "sparkline.last": Boolean(sp?.last),
        "sparkline.markers": Boolean(sp?.markers),
      };
    })(),
  };
}

export function excelContextual(doc: ExcelBook, ui: SimUi): string[] {
  const sheet = sheetOf(doc, ui);
  const out: string[] = [];
  if (ui.selection.startsWith("chart:")) out.push("chart");
  const onCells = Boolean(ui.selection) && !/^(chart|obj|sheet):/.test(ui.selection) && ui.selection !== "header" && ui.selection !== "footer";
  if (sheet.table && onCells && inTable(sheet, activeCell(ui), true)) out.push("table");
  if (sheet.pivot) out.push("pivot");
  if (onCells && sparklineAt(sheet, activeCell(ui))) out.push("sparkline");
  if (ui.selection === "header" || ui.selection === "footer") out.push("headerFooter");
  if (ui.selection.startsWith("obj:")) {
    const o = sheet.objects?.find((x) => x.id === ui.selection.slice(4));
    if (o && (o.kind === "icon" || o.kind === "image")) out.push("graphics");
  }
  return out;
}

/** Field names a slicer can filter on: the PivotTable's source headers, or the table's. */
export function pivotFieldNames(doc: ExcelBook, ui: SimUi): string[] {
  const sheet = sheetOf(doc, ui);
  const pv = sheet.pivot;
  const src = pv ? doc.sheets.find((s) => s.name === pv.source.sheet) : sheet;
  const rc = pv ? parseRange(pv.source.range) : sheet.table ? parseRange(sheet.table.range) : currentRegion(sheet, activeCell(ui));
  if (!src || !rc) return [];
  const out: string[] = [];
  for (let c = rc.c1; c <= rc.c2; c++) out.push(String(src.cells[refOf(c, rc.r1)]?.v ?? numToCol(c)));
  return out;
}

export function excelDialogDefaults(doc: ExcelBook, ui: SimUi, id: string): Record<string, SimValue> {
  const sheet = sheetOf(doc, ui);
  const f = firstFmt(sheet, ui);
  const act = activeCell(ui);
  switch (id) {
    case "formatCells": {
      const cas = centerAcrossRanges(doc, sheet).some((rc) => { const p = parseRef(act); return p && p.c >= rc.c1 && p.c <= rc.c2 && p.r >= rc.r1 && p.r <= rc.r2; });
      return {
        category: (f as XCellFormat).custom ? "Custom" : f.numFmt ?? "General",
        custom: builtinFormatCode(f),
        hidden: isFormulaHidden(doc, sheet, act),
        decimals: f.decimals ?? 2,
        horizontal: cas ? "Center Across Selection" : f.align ? f.align[0].toUpperCase() + f.align.slice(1) : "General",
        vertical: f.valign === "top" ? "Top" : f.valign === "middle" ? "Center" : "Bottom",
        wrap: Boolean(f.wrap),
        merge: (sheet.merges ?? []).includes(normalizeRange(ui.selection || act)),
        bold: Boolean(f.bold),
        fontSize: String(f.size ?? 11),
        border: "None",
        fill: "No Color",
        locked: !isUnlocked(doc, sheet, act),
      };
    }
    case "createTable": {
      const rc = ui.selection.includes(":") ? selRect(sheet, ui.selection) : currentRegion(sheet, act);
      return { range: rc ? `=$${numToCol(rc.c1)}$${rc.r1}:$${numToCol(rc.c2)}$${rc.r2}` : "", headers: true };
    }
    case "sort": {
      const rc = currentRegion(sheet, act);
      const head = rc ? String(sheet.cells[refOf(parseRef(act)!.c, rc.r1)]?.v ?? "") : "";
      return { sortBy: head, headers: true, thenBy: "(none)" };
    }
    case "subtotal": {
      const heads = regionHeaders(doc, ui);
      return { atEachChange: heads[0] ?? "", addTo: heads[heads.length - 1] ?? "", fn: "Sum" };
    }
    case "valueFieldSettings": {
      const pv = sheet.pivot as unknown as XPivot | undefined;
      const i = activeValueIndex(doc, sheet, act);
      const v = pv?.values[i];
      const flagShowAs = String(doc.flags?.[`pvShowAs:${sheet.name}`] || "");
      const sa = (v?.showAs !== undefined ? v.showAs : i === 0 ? flagShowAs : "") || "No Calculation";
      return {
        sourceName: v?.field ?? "",
        customName: pv && v ? pivotValueLabel(pv, i) : "",
        fn: v?.fn ?? "Sum",
        showAs: sa,
        numberFormat: v?.custom ? "Custom" : v?.numFmt ?? "General",
        decimals: v?.decimals ?? 2,
        custom: v?.custom ?? "",
      };
    }
    case "createPivot": {
      // Table/Range shows the table's name when the active cell is in a table.
      const src = pivotSourceFromDialog(doc, sheet, ui.selection, act, "");
      const range = !src ? "" : findTable(doc, src.range) ? src.range : absRef(src.sheet, parseRange(src.range)!).slice(1);
      return { range, location: "New Worksheet", at: "" };
    }
    case "changeSource": {
      const pv = sheet.pivot;
      if (!pv) return {};
      const t = findTable(doc, pv.source.range);
      return { range: t ? pv.source.range : absRef(pv.source.sheet, parseRange(pv.source.range) ?? { c1: 1, r1: 1, c2: 1, r2: 1 }).slice(1) };
    }
    case "pivotGroup": {
      const pv = sheet.pivot as unknown as XPivot | undefined;
      const f = pv ? activePivotField(doc, sheet, act) ?? firstDateField(doc, pv) : null;
      const g = (f && pv?.groups?.[f]) || ["Months"];
      return { field: f ?? "", days: g.includes("Days"), months: g.includes("Months"), quarters: g.includes("Quarters"), years: g.includes("Years") };
    }
    case "sparklines": {
      const rc = selRect(sheet, ui.selection || act);
      return { type: "Line", dataRange: "", location: rc ? absRef(sheet.name, rc).replace(/^=.*!/, "") : "" };
    }
    case "series": {
      const rc = selRect(sheet, ui.selection || act);
      return { seriesIn: rc && rc.c2 - rc.c1 > rc.r2 - rc.r1 ? "Rows" : "Columns", type: "Linear", dateUnit: "Day", trend: false, step: "1", stop: "" };
    }
    case "allowEditRanges": {
      let n = 1;
      while (doc.flags?.[`editRange:${sheet.name}:Range${n}`]) n++;
      const rc = selRect(sheet, ui.selection || act);
      return { title: `Range${n}`, refersTo: rc ? absRef(sheet.name, rc).replace(/^=.*!/, "=") : "", password: "" };
    }
    case "saveChartTemplate":
      return { name: `Chart Template ${chartTemplates(doc).length + 1}` };
    case "changeChartType": {
      const ch = sheet.charts?.find((x) => x.id === chartIdOf(ui.selection));
      return { type: ch?.type ?? "Clustered Column", template: "" };
    }
    case "insertChart":
      return { type: "Clustered Column", template: "" };
    case "altText":
      return { text: String(doc.flags?.[`alt:${ui.selection.startsWith("obj:") ? ui.selection.slice(4) : ui.selection}`] ?? "") };
    case "goalSeek":
      return { setCell: act };
    case "dataValidation": {
      // Reopening Data Validation shows the rule already on the selection.
      const rule = (sheet.validation?.[normalizeRange(ui.selection || act)] ?? validationAt(sheet, act)?.rule) as XValidation | undefined;
      const fmtBound = (n: number | undefined) => (n === undefined ? "" : rule && (rule.type === "Date" || rule.type === "Time") ? formatValue(n, { numFmt: rule.type === "Date" ? "Short Date" : "Time" }) : String(n));
      return rule
        ? {
            allow: rule.type,
            data: rule.op ?? "between",
            min: fmtBound(rule.min),
            max: fmtBound(rule.max),
            value: fmtBound(rule.value),
            source: rule.source ?? (rule.list ?? []).join(","),
            ignoreBlank: rule.ignoreBlank ?? true,
            showInput: rule.showInput ?? true,
            inputTitle: rule.inputTitle ?? "",
            inputMessage: rule.message ?? "",
            showError: rule.showError ?? true,
            errorStyle: rule.errorStyle ?? "Stop",
            errorTitle: rule.errorTitle ?? "",
            errorMessage: rule.errorMessage ?? "",
          }
        : { allow: "Any value", data: "between", ignoreBlank: true, showInput: true, showError: true, errorStyle: "Stop" };
    }
    case "pageSetupSheet":
      return {
        orientation: sheet.orientation === "landscape" ? "Landscape" : "Portrait",
        fitTo: sheet.fitTo ?? "Adjust to 100%",
        printTitles: sheet.printTitles ?? "",
        printArea: sheet.printArea ?? "",
        gridlines: Boolean(sheet.printGridlines),
        header: sheet.header ?? "",
        footer: sheet.footer ?? "",
      };
    case "zoom":
      return { percent: sheet.zoom ?? 100 };
    case "columnWidth":
      return { width: 8.43 };
    case "rowHeight":
      return { height: 15 };
  }
  return {};
}

/** Column headers of the current region, for the Sort dialog's list. */
export function regionHeaders(doc: ExcelBook, ui: SimUi): string[] {
  const sheet = sheetOf(doc, ui);
  const rc = currentRegion(sheet, activeCell(ui));
  if (!rc) return [];
  const out: string[] = [];
  for (let c = rc.c1; c <= rc.c2; c++) out.push(String(sheet.cells[refOf(c, rc.r1)]?.v ?? `Column ${numToCol(c)}`));
  return out;
}

/* ------------------------------------------------------------------ */
/* Analyze Data                                                        */
/* ------------------------------------------------------------------ */

export interface AnalyzeSuggestion {
  title: string;
  num: string;
  cat: string;
}

/** What Home › Analyze Data proposes for the data around the active cell. */
export function analyzeSuggestions(doc: ExcelBook, sheet: ExcelSheet, act: string): AnalyzeSuggestion[] {
  const rc = currentRegion(sheet, act) ?? usedRect(sheet);
  if (!rc || rc.r2 <= rc.r1) return [];
  const nums: string[] = [];
  const cats: string[] = [];
  for (let c = rc.c1; c <= rc.c2; c++) {
    const head = String(sheet.cells[refOf(c, rc.r1)]?.v ?? "");
    const sample = sheet.cells[refOf(c, rc.r1 + 1)];
    const v = evaluateCell(doc, sheet, refOf(c, rc.r1 + 1));
    const isDate = sample?.fmt?.numFmt === "Short Date" || sample?.fmt?.numFmt === "Long Date";
    if (!head) continue;
    if (typeof v === "number" && !isDate) nums.push(head);
    else if (typeof v === "string") {
      const distinct = new Set<string>();
      for (let r = rc.r1 + 1; r <= rc.r2; r++) distinct.add(String(evaluateCell(doc, sheet, refOf(c, r)) ?? ""));
      if (distinct.size < rc.r2 - rc.r1 + 1) cats.push(head);
    }
  }
  const out: AnalyzeSuggestion[] = [];
  for (const cat of cats.slice(0, 2)) if (nums[0]) out.push({ title: `'${nums[0]}' by '${cat}'`, num: nums[0], cat });
  if (nums[1] && cats[0]) out.push({ title: `'${nums[1]}' by '${cats[0]}'`, num: nums[1], cat: cats[0] });
  return out.slice(0, 3);
}

function analyzeInsert(doc: ExcelBook, sheet: ExcelSheet, ui: SimUi, title: string): { doc: ExcelBook; ui?: Partial<SimUi> } {
  const s = analyzeSuggestions(doc, sheet, activeCell(ui)).find((x) => x.title === title);
  const rc = currentRegion(sheet, activeCell(ui)) ?? usedRect(sheet);
  if (!s || !rc) return { doc };
  let n = doc.sheets.length + 1;
  while (doc.sheets.some((x) => x.name === `Sheet${n}`)) n++;
  const name = `Sheet${n}`;
  const idx = doc.sheets.findIndex((x) => x.name === sheet.name);
  doc.sheets.splice(idx, 0, {
    name,
    cells: {},
    pivot: { source: { sheet: sheet.name, range: rectToRange(rc) }, rows: [s.cat], columns: [], values: [{ field: s.num, fn: "Sum" }], filters: [], at: "A3" },
    charts: [{ id: "c1", type: "Clustered Column", title: title.replace(/'/g, ""), range: "PIVOT", at: "D3" }],
  });
  doc.pane = null;
  return { doc, ui: { sheet: name, selection: "A3" } };
}
