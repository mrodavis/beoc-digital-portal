import type { CellFormat, ExcelBook, ExcelCell, ExcelSheet, SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { applyCommonCommit } from "@/lib/sim/common";
import { clone } from "@/lib/sim/ops";
import {
  cellsIn,
  colToNum,
  evaluateCell,
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
  if (t.startsWith("=")) return { f: t };
  if (t === "") return {};
  const pct = /^(-?[\d,]*\.?\d+)\s*%$/.exec(t);
  if (pct) return { v: Number(pct[1].replace(/,/g, "")) / 100, fmt: { numFmt: "Percentage" } };
  const cur = /^\$\s?(-?[\d,]*\.?\d+)$/.exec(t);
  if (cur) return { v: Number(cur[1].replace(/,/g, "")), fmt: { numFmt: "Currency" } };
  const date = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/.exec(t);
  if (date) {
    const y = Number(date[3].length === 2 ? `20${date[3]}` : date[3]);
    const serial = Math.round((Date.UTC(y, Number(date[1]) - 1, Number(date[2])) - Date.UTC(1899, 11, 30)) / 86400000);
    return { v: serial, fmt: { numFmt: "Short Date" } };
  }
  const num = /^-?[\d,]*\.?\d+$/.test(t) && !/^0\d/.test(t) ? Number(t.replace(/,/g, "")) : NaN;
  if (!Number.isNaN(num) && /\d/.test(t)) return { v: num };
  return { v: t };
}

function setCellInput(sheet: ExcelSheet, ref: string, raw: string) {
  const prev = sheet.cells[ref] ?? {};
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
  if (axis === "row") sheet.rows = Math.max(1, (sheet.rows ?? DEFAULT_ROWS) + Math.max(0, count));
  else sheet.cols = Math.max(1, (sheet.cols ?? DEFAULT_COLS) + Math.max(0, count));
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

function sortRegion(doc: ExcelBook, sheet: ExcelSheet, ui: SimUi, desc: boolean, byCol?: number, headers?: boolean) {
  const sel = ui.selection;
  const single = !sel.includes(":");
  const rc = single ? currentRegion(sheet, activeCell(ui)) : selRect(sheet, sel);
  if (!rc) return;
  const hasHeader = headers ?? (sheet.table ? true : headerLike(sheet, rc));
  const body: Rect = { ...rc, r1: rc.r1 + (hasHeader ? 1 : 0) };
  const key = byCol ?? parseRef(activeCell(ui))!.c;
  const rows: number[] = [];
  for (let r = body.r1; r <= body.r2; r++) rows.push(r);
  const val = (r: number) => evaluateCell(doc, sheet, refOf(key, r));
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    let cmp = 0;
    if (typeof x === "number" && typeof y === "number") cmp = x - y;
    else if (x === null || x === "") cmp = 1;
    else if (y === null || y === "") cmp = -1;
    else cmp = String(x).localeCompare(String(y));
    return desc ? -cmp : cmp;
  });
  moveRows(sheet, body, rows);
  sheet.sortedBy = `${numToCol(key)} ${desc ? "desc" : "asc"}`;
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

let seq = 0;
const nid = (p: string) => `${p}${++seq}`;

/* ------------------------------------------------------------------ */
/* Built-in command handling                                           */
/* ------------------------------------------------------------------ */

export function applyExcel(input: ExcelBook, c: SimCommit, ui: SimUi): { doc: ExcelBook; ui?: Partial<SimUi> } {
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
    const ref = t.includes("!") ? t.split("!")[1] : t;
    const target = t.includes("!") ? doc.sheets.find((s) => s.name === t.split("!")[0]) ?? sheet : sheet;
    setCellInput(target, ref.toUpperCase(), c.value);
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
        const patch: Partial<CellFormat> = {};
        if (val.category) patch.numFmt = String(val.category) as CellFormat["numFmt"];
        if (val.decimals !== undefined && val.decimals !== "") patch.decimals = Number(val.decimals);
        if (val.horizontal && val.horizontal !== "General") patch.align = String(val.horizontal).toLowerCase() as CellFormat["align"];
        if (val.vertical) patch.valign = String(val.vertical).toLowerCase() as CellFormat["valign"];
        if (val.wrap !== undefined) patch.wrap = Boolean(val.wrap);
        if (val.bold !== undefined) patch.bold = Boolean(val.bold);
        if (val.fill && val.fill !== "No Color") patch.fill = String(val.fill);
        if (val.border && val.border !== "None") patch.border = String(val.border).toLowerCase().includes("outline") ? "outside" : "all";
        fmtCells(sheet, sel, patch);
        if (val.merge) { sheet.merges = [...(sheet.merges ?? []), normalizeRange(sel)]; }
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
        const col = String(val.sortBy ?? "");
        const rc = currentRegion(sheet, act);
        let byCol: number | undefined;
        if (rc) {
          for (let cc = rc.c1; cc <= rc.c2; cc++) {
            const h = sheet.cells[refOf(cc, rc.r1)]?.v;
            if (String(h ?? "").toLowerCase() === col.toLowerCase() || `Column ${numToCol(cc)}`.toLowerCase() === col.toLowerCase()) byCol = cc;
          }
        }
        sortRegion(doc, sheet, { ...ui, selection: act }, String(val.order ?? "").includes("Z to A") || String(val.order ?? "").includes("Largest to Smallest") || String(val.order ?? "") === "Descending", byCol, val.headers === undefined ? undefined : Boolean(val.headers));
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
        sheet.objects = [...(sheet.objects ?? []), { id: nid("o"), kind: "image", label: String(val.file ?? "Picture"), glyph: "🖼️", at: act }];
        return { doc };
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
      const dc = dst.c - src.c1, dr = dst.r - src.r1;
      const transpose = sv === "Transpose";
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
      if (sv === "Unmerge Cells") { sheet.merges = (sheet.merges ?? []).filter((m) => m !== r); return { doc }; }
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
      const id = nid("o");
      sheet.objects = [...(sheet.objects ?? []), { id, kind, label: sv || kind, glyph: kind === "icon" ? "★" : kind === "image" ? "🖼️" : undefined, at: act, text: kind === "textbox" ? "" : undefined }];
      return { doc, ui: { selection: `obj:${id}` } };
    }
    case "insert.headerFooter":
      sheet.view = "pageLayout";
      sheet.header = sheet.header ?? "";
      return { doc, ui: { selection: "header" } };
    case "insert.sparkline":
      return { doc };

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
        if (c.id === "chart.type") ch.type = sv;
        else if (c.id === "chart.style") ch.style = sv;
        else if (c.id === "chart.addElement" && sv === "Chart Title: None") ch.title = "";
        else doc.flags = { ...(doc.flags ?? {}), [`${c.id}`]: sv || true };
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
    case "table.filterButton": sheet.filter = sheet.filter ? null : sheet.table?.range ?? null; return { doc };
    case "table.convertToRange": sheet.table = null; sheet.filter = null; return { doc };
    case "table.removeDuplicates": return applyExcel(doc, { kind: "dialog", id: "removeDuplicates", values: { headers: true } }, ui);

    /* -------- pivot -------- */
    case "pivot.field":
    case "pivot.area":
    case "pivot.summarize":
    case "pivot.style":
    case "pivot.clear":
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
      const fn = sv.toUpperCase();
      if (["SUM", "AVERAGE", "COUNT", "MAX", "MIN"].includes(fn)) setCellInput(sheet, act, `=${fn}(${autoSumRange(sheet, act) ?? ""})`);
      else setCellInput(sheet, act, `=${fn}()`);
      return { doc };
    }
    case "formulas.showFormulas": sheet.showFormulas = !sheet.showFormulas; return { doc };
    case "formulas.tracePrecedents":
    case "formulas.traceDependents":
    case "formulas.removeArrows":
    case "formulas.errorChecking":
    case "formulas.evaluate":
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
    case "data.ungroup": sheet.groups = []; return { doc };
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
    case "data.showDetail":
    case "data.refresh":
    case "data.getData":
    case "data.stocks":
    case "data.geography":
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
    case "spelling.ignore": {
      const cell = sheet.cells[act];
      if (cell?.spell) sheet.cells[act] = { ...cell, v: c.id === "spelling.change" ? sv || cell.spell[0] : cell.v, spell: undefined };
      const next = Object.entries(sheet.cells).find(([, x]) => x.spell?.length);
      doc.pane = next ? "Spelling" : "Spelling: done";
      return { doc, ui: next ? { selection: next[0] } : undefined };
    }
    case "review.deleteComment":
      forEachCell(sheet, sel, (ref) => { const cell = sheet.cells[ref]; if (cell) sheet.cells[ref] = { ...cell, comment: undefined }; });
      return { doc };
    case "review.showNotes": doc.flags = { ...(doc.flags ?? {}), showNotes: !doc.flags?.showNotes }; return { doc };
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
    case "view.split": sheet.split = !sheet.split; return { doc };
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
  // Clear body
  for (let r = rc.r1 + 1; r <= rc.r2 + rows.length + 2; r++) for (let c = rc.c1; c <= rc.c2; c++) delete sheet.cells[refOf(c, r)];
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
  sheet.cells[refOf(valueCol, out)] = { f: `=SUBTOTAL(${code},${refOf(valueCol, rc.r1 + 1)}:${refOf(valueCol, out - 1)})`, fmt: { bold: true } };
  sheet.groups = groups;
  sheet.rows = Math.max(sheet.rows ?? DEFAULT_ROWS, out + 2);
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
  return out;
}

export function excelDialogDefaults(doc: ExcelBook, ui: SimUi, id: string): Record<string, SimValue> {
  const sheet = sheetOf(doc, ui);
  const f = firstFmt(sheet, ui);
  const act = activeCell(ui);
  switch (id) {
    case "formatCells":
      return { category: f.numFmt ?? "General", decimals: f.decimals ?? 2, horizontal: f.align ? f.align[0].toUpperCase() + f.align.slice(1) : "General", wrap: Boolean(f.wrap) };
    case "createTable": {
      const rc = ui.selection.includes(":") ? selRect(sheet, ui.selection) : currentRegion(sheet, act);
      return { range: rc ? `=$${numToCol(rc.c1)}$${rc.r1}:$${numToCol(rc.c2)}$${rc.r2}` : "", headers: true };
    }
    case "sort": {
      const rc = currentRegion(sheet, act);
      const head = rc ? String(sheet.cells[refOf(parseRef(act)!.c, rc.r1)]?.v ?? "") : "";
      return { sortBy: head, headers: true };
    }
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
