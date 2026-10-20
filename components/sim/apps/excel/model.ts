import type { CellFormat, ExcelBook, ExcelCell, ExcelCF, ExcelSheet, SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { applyCommonCommit } from "@/lib/sim/common";
import { clone } from "@/lib/sim/ops";
import {
  cellsIn,
  colToNum,
  evaluateCell,
  GEOGRAPHY,
  geographyKey,
  normalizeRange,
  numToCol,
  parseRange,
  parseRef,
  rectToRange,
  refOf,
  shiftFormula,
  type Rect,
} from "@/lib/sim/excel";

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
  return t.split(":")[0];
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
  const fmt = { ...(prev.fmt ?? {}), ...(parsed.fmt ?? {}) };
  if (parsed.fmt?.numFmt && prev.fmt?.numFmt && prev.fmt.numFmt !== "General") fmt.numFmt = prev.fmt.numFmt;
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

function fmtCells(sheet: ExcelSheet, sel: string, patch: Partial<CellFormat> | ((f: CellFormat) => CellFormat)) {
  forEachCell(sheet, sel, (ref) => {
    const cell = sheet.cells[ref] ?? {};
    const cur = cell.fmt ?? {};
    const nf = typeof patch === "function" ? patch(cur) : { ...cur, ...patch };
    for (const k of Object.keys(nf) as (keyof CellFormat)[]) if (nf[k] === undefined) delete nf[k];
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
  const rc = single ? currentRegion(sheet, activeCell(ui)) : selRect(sheet, sel);
  if (!rc) return;
  const hasHeader = headers ?? (sheet.table ? true : headerLike(sheet, rc));
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
    if (i >= 0) return list[(i + k) % list.length];
  }
  const m = /^(.*?)(\d+)$/.exec(v);
  if (m) return `${m[1]}${Number(m[2]) + k}`;
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
        else sheet.cells[refOf(c, r)] = { ...base };
      }
    }
  }
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
  sheet.cells[changing] = { ...(sheet.cells[changing] ?? {}), v: Math.round(x1 * 100) / 100 };
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
        const patch: Partial<CellFormat> = {};
        const cat = String(val.category ?? before.category ?? "General") as NonNullable<CellFormat["numFmt"]>;
        if (changed("category")) { patch.numFmt = cat; patch.decimals = undefined; }
        if ((changed("category") || changed("decimals")) && DECIMAL_FORMATS.includes(cat) && val.decimals !== "" && val.decimals !== undefined) patch.decimals = Number(val.decimals);
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
        const rc = currentRegion(sheet, act) ?? selRect(sheet, sel);
        if (!rc) return { doc };
        const range = rectToRange(rc);
        if (String(val.location ?? "New Worksheet") === "New Worksheet") {
          let n = doc.sheets.length + 1;
          while (doc.sheets.some((s) => s.name === `Sheet${n}`)) n++;
          const name = `Sheet${n}`;
          const idx = doc.sheets.findIndex((s) => s.name === sheet.name);
          doc.sheets.splice(idx, 0, { name, cells: {}, pivot: { source: { sheet: sheet.name, range }, rows: [], columns: [], values: [], filters: [], at: "A3" } });
          return { doc, ui: { sheet: name, selection: "A3" } };
        }
        sheet.pivot = { source: { sheet: sheet.name, range }, rows: [], columns: [], values: [], filters: [], at: String(val.at || "H3").toUpperCase() };
        return { doc };
      }
      case "insertChart":
        return addChart(doc, sheet, ui, String(val.type ?? "Clustered Column"));
      case "insertFunction": {
        const fn = String(val.fn ?? "SUM").toUpperCase();
        const args = String(val.args ?? "").trim();
        setCellInput(sheet, act, `=${fn}(${args})`);
        return { doc };
      }
      case "sort": {
        const rc = currentRegion(sheet, act);
        const colOf = (name: string): number | undefined => {
          if (!rc || !name || name === "(none)") return undefined;
          for (let cc = rc.c1; cc <= rc.c2; cc++) {
            const h = sheet.cells[refOf(cc, rc.r1)]?.v;
            if (String(h ?? "").toLowerCase() === name.toLowerCase() || `Column ${numToCol(cc)}`.toLowerCase() === name.toLowerCase()) return cc;
          }
          return undefined;
        };
        const isDesc = (o: unknown) => /Z to A|Largest to Smallest|Newest to Oldest|Descending/.test(String(o ?? ""));
        const list = (o: unknown) => (String(o ?? "") === "Custom List..." ? String(val.customList ?? "").split(",").map((x) => x.trim()).filter(Boolean) : undefined);
        const more: SortKey[] = [];
        const then = colOf(String(val.thenBy ?? ""));
        if (then !== undefined) more.push({ col: then, desc: isDesc(val.thenOrder), list: list(val.thenOrder) });
        sortRegion(doc, sheet, { ...ui, selection: act }, isDesc(val.order), colOf(String(val.sortBy ?? "")), val.headers === undefined ? undefined : Boolean(val.headers), more, list(val.order));
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
        const type = String(val.allow ?? "Any value");
        sheet.validation = {
          ...(sheet.validation ?? {}),
          [normalizeRange(sel)]: {
            type,
            list: type === "List" ? String(val.source ?? "").split(",").map((x) => x.trim()).filter(Boolean) : undefined,
            min: val.min !== undefined && val.min !== "" ? Number(val.min) : undefined,
            max: val.max !== undefined && val.max !== "" ? Number(val.max) : undefined,
            message: String(val.inputMessage ?? "") || undefined,
          },
        };
        return { doc };
      }
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
        if (val.fitTo) sheet.fitTo = String(val.fitTo);
        if (val.gridlines !== undefined) sheet.printGridlines = Boolean(val.gridlines);
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
      case "sparklines": {
        sheet.sparklines = [...(sheet.sparklines ?? []), { range: String(val.dataRange ?? ""), at: String(val.location ?? act).toUpperCase(), type: String(val.type ?? "Line") }];
        return { doc };
      }
      case "headerFooter":
        sheet.header = String(val.header ?? sheet.header ?? "");
        sheet.footer = String(val.footer ?? sheet.footer ?? "");
        return { doc };
      case "moveChart": {
        const id = sel.startsWith("chart:") ? sel.slice(6) : sheet.charts?.[0]?.id;
        const ch = sheet.charts?.find((x) => x.id === id);
        if (ch && String(val.location) === "New sheet") {
          sheet.charts = sheet.charts?.filter((x) => x.id !== ch.id);
          const name = String(val.name || "Chart1");
          doc.sheets.splice(doc.sheets.findIndex((s) => s.name === sheet.name), 0, { name, cells: {}, charts: [{ ...ch, at: "A1" }], gridlines: false });
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
        const id = sel.startsWith("obj:") ? sel.slice(4) : sel.startsWith("chart:") ? sel : "";
        if (id) doc.flags = { ...(doc.flags ?? {}), [`alt:${id}`]: String(val.text ?? "") };
        return { doc };
      }
      case "valueFieldSettings":
        if (sheet.pivot?.values[0] && val.fn) sheet.pivot.values[0] = { ...sheet.pivot.values[0], fn: String(val.fn) as "Sum" };
        if (val.showAs !== undefined) doc.flags = { ...(doc.flags ?? {}), [`pvShowAs:${sheet.name}`]: val.showAs === "No Calculation" ? "" : String(val.showAs) };
        return { doc };
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
          forEachCol(sheet, sel, (col) => {
            let max = 6;
            for (const [ref, cell] of Object.entries(sheet.cells)) {
              if (!ref.startsWith(col) || !/^\d+$/.test(ref.slice(col.length))) continue;
              const shown = String(evaluateCell(doc, sheet, ref) ?? "");
              max = Math.max(max, shown.length + (cell.fmt?.numFmt === "Currency" || cell.fmt?.numFmt === "Accounting" ? 4 : 1));
            }
            sheet.colWidths = { ...(sheet.colWidths ?? {}), [col]: Math.min(400, max * 7.5 + 12) };
          });
          return { doc };
        case "AutoFit Row Height":
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
      const rc = selRect(sheet, sel);
      if (!rc) return { doc };
      if (sv === "Down" || sv === "") fillRange(sheet, { ...rc, r2: rc.r1 }, rc);
      else if (sv === "Right") fillRange(sheet, { ...rc, c2: rc.c1 }, rc);
      else if (sv === "Flash Fill") doc.flags = { ...(doc.flags ?? {}), flashFill: act };
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
    case "data.sortAsc": sortRegion(doc, sheet, ui, false); return { doc };
    case "data.sortDesc": sortRegion(doc, sheet, ui, true); return { doc };
    case "data.filter": {
      if (sheet.filter) { sheet.filter = null; sheet.filterValues = {}; return { doc }; }
      const rc = sel.includes(":") ? selRect(sheet, sel) : currentRegion(sheet, act);
      if (rc) sheet.filter = rectToRange(rc);
      return { doc };
    }
    case "data.clearFilter": sheet.filterValues = {}; return { doc };
    case "data.reapply": return { doc };
    case "filter.by": {
      // value "C=Paid|Pending" or "C=*" (Select All)
      const [col, vals] = sv.split("=");
      const fv = { ...(sheet.filterValues ?? {}) };
      if (!vals || vals === "*") delete fv[col];
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
      sheet.view = "pageLayout";
      sheet.header = sheet.header ?? "";
      return { doc, ui: { selection: "header" } };
    case "insert.sparkline":
      return { doc };
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
      const id = sel.startsWith("chart:") ? sel.slice(6) : sheet.charts?.[sheet.charts.length - 1]?.id;
      const ch = sheet.charts?.find((x) => x.id === id);
      if (ch) {
        const flags = { ...(doc.flags ?? {}) };
        if (c.id === "chart.type") ch.type = sv;
        else if (c.id === "chart.style") ch.style = sv;
        else if (c.id === "chart.switchRowCol") flags[`chart:${ch.id}:switch`] = !flags[`chart:${ch.id}:switch`];
        else if (c.id === "chart.addElement") {
          if (sv === "Chart Title: None") ch.title = "";
          else if (sv === "Chart Title: Above Chart") ch.title = ch.title || "Chart Title";
          else if (sv === "Data Labels") flags[`chart:${ch.id}:labels`] = true;
          else if (sv.startsWith("Legend: ")) flags[`chart:${ch.id}:legend`] = sv.slice(8);
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
      const id = sel.startsWith("chart:") ? sel.slice(6) : "";
      sheet.charts = (sheet.charts ?? []).filter((x) => x.id !== id);
      return { doc, ui: { selection: "A1" } };
    }

    /* -------- table design -------- */
    case "table.style": if (sheet.table) sheet.table.style = sv; return { doc };
    case "table.totalRow": if (sheet.table) sheet.table.totalRow = !sheet.table.totalRow; return { doc };
    case "table.bandedRows":
    case "table.headerRow":
    case "table.firstColumn":
    case "table.bandedColumns":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: !doc.flags?.[c.id] };
      return { doc };
    case "table.name": if (sheet.table && sv.trim()) sheet.table.name = sv.trim().replace(/\s+/g, "_"); return { doc };
    case "table.filterButton": sheet.filter = sheet.filter ? null : sheet.table?.range ?? null; return { doc };
    case "table.convertToRange": sheet.table = null; sheet.filter = null; return { doc };
    case "table.removeDuplicates": return applyExcel(doc, { kind: "dialog", id: "removeDuplicates", values: { headers: true } }, ui);

    /* -------- pivot -------- */
    case "pivot.field":
    case "pivot.area":
    case "pivot.summarize":
    case "pivot.style":
    case "pivot.clear":
    case "pivot.filter":
    case "pivot.showAs":
      return pivotCommand(doc, sheet, c.id, sv);

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
      // Excel opens Function Arguments with the adjacent range guessed, like AutoSum.
      const fn = sv.toUpperCase();
      if (["SUM", "AVERAGE", "COUNT", "COUNTA", "MAX", "MIN", "MEDIAN", "PRODUCT"].includes(fn)) setCellInput(sheet, act, `=${fn}(${autoSumRange(sheet, act) ?? ""})`);
      else if (["TODAY", "NOW"].includes(fn)) setCellInput(sheet, act, `=${fn}()`);
      else setCellInput(sheet, act, `=${fn}()`);
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
    case "data.flashFill": doc.flags = { ...(doc.flags ?? {}), flashFill: act }; return { doc };
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
    case "review.smartLookup": doc.pane = "Search"; return { doc };
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

function pivotCommand(doc: ExcelBook, sheet: ExcelSheet, id: string, sv: string): { doc: ExcelBook } {
  const pv = sheet.pivot;
  if (!pv) return { doc };
  const src = doc.sheets.find((s) => s.name === pv.source.sheet);
  const rc = parseRange(pv.source.range);
  const fields: { name: string; numeric: boolean }[] = [];
  if (src && rc) {
    for (let c = rc.c1; c <= rc.c2; c++) {
      const name = String(src.cells[refOf(c, rc.r1)]?.v ?? numToCol(c));
      const sample = src.cells[refOf(c, rc.r1 + 1)]?.v;
      fields.push({ name, numeric: typeof sample === "number" });
    }
  }
  const remove = (f: string) => {
    pv.rows = pv.rows.filter((x) => x !== f);
    pv.columns = pv.columns.filter((x) => x !== f);
    pv.filters = pv.filters.filter((x) => x !== f);
    pv.values = pv.values.filter((x) => x.field !== f);
  };
  switch (id) {
    case "pivot.field": {
      const on = pv.rows.includes(sv) || pv.columns.includes(sv) || pv.filters.includes(sv) || pv.values.some((x) => x.field === sv);
      if (on) remove(sv);
      else if (fields.find((f) => f.name === sv)?.numeric) pv.values.push({ field: sv, fn: "Sum" });
      else pv.rows.push(sv);
      break;
    }
    case "pivot.area": {
      const [f, area] = sv.split(">");
      remove(f);
      if (area === "Rows") pv.rows.push(f);
      else if (area === "Columns") pv.columns.push(f);
      else if (area === "Filters") pv.filters.push(f);
      else if (area === "Values") pv.values.push({ field: f, fn: fields.find((x) => x.name === f)?.numeric ? "Sum" : "Count" });
      break;
    }
    case "pivot.summarize":
      if (pv.values[0]) pv.values[0] = { ...pv.values[0], fn: sv as "Sum" };
      break;
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
    case "pivot.showAs":
      doc.flags = { ...(doc.flags ?? {}), [`pvShowAs:${sheet.name}`]: sv === "No Calculation" ? "" : sv };
      break;
    case "pivot.style":
      pv.style = sv;
      break;
    case "pivot.clear":
      pv.rows = []; pv.columns = []; pv.values = []; pv.filters = [];
      break;
  }
  return { doc };
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
    "home.numberFormat": f.numFmt ?? "General",
    "home.formatPainter": Boolean(doc.painter),
    "data.filter": Boolean(sheet.filter),
    "formulas.showFormulas": Boolean(sheet.showFormulas),
    "view.gridlines": sheet.gridlines !== false,
    "view.headings": sheet.headings !== false,
    "view.formulaBar": !doc.flags?.hideFormulaBar,
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
  };
}

export function excelContextual(doc: ExcelBook, ui: SimUi): string[] {
  const sheet = sheetOf(doc, ui);
  const out: string[] = [];
  if (ui.selection.startsWith("chart:")) out.push("chart");
  if (sheet.table && ui.selection && !ui.selection.startsWith("chart:")) {
    const rc = parseRange(sheet.table.range);
    const p = parseRef(activeCell(ui));
    if (rc && p && p.c >= rc.c1 && p.c <= rc.c2 && p.r >= rc.r1 && p.r <= rc.r2) out.push("table");
  }
  if (sheet.pivot) out.push("pivot");
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
        category: f.numFmt ?? "General",
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
    case "valueFieldSettings":
      return { fn: sheet.pivot?.values[0]?.fn ?? "Sum", showAs: String(doc.flags?.[`pvShowAs:${sheet.name}`] || "No Calculation") };
    case "altText":
      return { text: String(doc.flags?.[`alt:${ui.selection.startsWith("obj:") ? ui.selection.slice(4) : ui.selection}`] ?? "") };
    case "goalSeek":
      return { setCell: act };
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
