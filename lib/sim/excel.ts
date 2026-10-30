import type { ExcelCell, ExcelSheet, ExcelBook, CellFormat, ExcelPivot } from "@/types/sim";

/* ------------------------------------------------------------------ */
/* A1 references                                                       */
/* ------------------------------------------------------------------ */

export function colToNum(col: string): number {
  let n = 0;
  for (const ch of col.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n;
}

export function numToCol(n: number): string {
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

export function parseRef(ref: string): { c: number; r: number } | null {
  const m = /^\$?([A-Za-z]{1,3})\$?(\d+)$/.exec(ref.trim());
  if (!m) return null;
  return { c: colToNum(m[1]), r: Number(m[2]) };
}

export function refOf(c: number, r: number): string {
  return `${numToCol(c)}${r}`;
}

export interface Rect {
  c1: number;
  r1: number;
  c2: number;
  r2: number;
}

export function parseRange(range: string): Rect | null {
  const parts = range.replace(/\$/g, "").split(":");
  const a = parseRef(parts[0]);
  const b = parseRef(parts[1] ?? parts[0]);
  if (!a || !b) {
    // Whole column "B:B" or row "3:3"
    const colM = /^([A-Za-z]+):([A-Za-z]+)$/.exec(range);
    if (colM) return { c1: colToNum(colM[1]), r1: 1, c2: colToNum(colM[2]), r2: 1048576 };
    const rowM = /^(\d+):(\d+)$/.exec(range);
    if (rowM) return { c1: 1, r1: Number(rowM[1]), c2: 16384, r2: Number(rowM[2]) };
    return null;
  }
  return {
    c1: Math.min(a.c, b.c),
    r1: Math.min(a.r, b.r),
    c2: Math.max(a.c, b.c),
    r2: Math.max(a.r, b.r),
  };
}

export function rectToRange(rc: Rect): string {
  const a = refOf(rc.c1, rc.r1);
  const b = refOf(rc.c2, rc.r2);
  return a === b ? a : `${a}:${b}`;
}

/** Canonical form so "D5:B2" and "B2:D5" compare equal. */
export function normalizeRange(range: string): string {
  const t = range.trim().toUpperCase().replace(/\$/g, "");
  if (/^[A-Z]+:[A-Z]+$/.test(t) || /^\d+:\d+$/.test(t)) return t;
  const rc = parseRange(t);
  return rc ? rectToRange(rc) : t;
}

export function cellsIn(range: string): string[] {
  const rc = parseRange(range);
  if (!rc) return [];
  const out: string[] = [];
  const r2 = Math.min(rc.r2, rc.r1 + 500);
  const c2 = Math.min(rc.c2, rc.c1 + 50);
  for (let r = rc.r1; r <= r2; r++) for (let c = rc.c1; c <= c2; c++) out.push(refOf(c, r));
  return out;
}

export function inRange(ref: string, range: string): boolean {
  const p = parseRef(ref);
  const rc = parseRange(range);
  if (!p || !rc) return false;
  return p.c >= rc.c1 && p.c <= rc.c2 && p.r >= rc.r1 && p.r <= rc.r2;
}

/* ------------------------------------------------------------------ */
/* Formula evaluation                                                  */
/* ------------------------------------------------------------------ */

type Val = number | string | boolean | Val[] | null;

export class FormulaError extends Error {
  code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

interface Ctx {
  book: ExcelBook;
  sheet: ExcelSheet;
  depth: number;
  seen: Set<string>;
  /** The cell whose formula is being evaluated (for [@Column] references). */
  cur?: { sheet: ExcelSheet; ref: string };
}

function sheetByName(book: ExcelBook, name: string): ExcelSheet | undefined {
  return book.sheets.find((s) => s.name.toLowerCase() === name.toLowerCase());
}

function cellValue(ctx: Ctx, sheet: ExcelSheet, ref: string): Val {
  const key = `${sheet.name}!${ref}`;
  if (ctx.seen.has(key)) throw new FormulaError("#CIRC!");
  // A PivotTable's cells are its report: formulas (=Analysis!G8) read the
  // values the PivotTable shows, from its cached snapshot of the source.
  if (sheet.pivot && (sheet.pivot as unknown as XPivot).cache) {
    const pc = pivotLayoutOf(ctx.book, sheet)?.cells[ref];
    if (pc) return pc.v === undefined ? null : pc.v;
  }
  const cell = sheet.cells[ref];
  if (!cell) return null;
  if (cell.f) {
    if (ctx.depth > 40) throw new FormulaError("#CIRC!");
    ctx.seen.add(key);
    try {
      return evalFormula(cell.f, { ...ctx, sheet, depth: ctx.depth + 1, cur: { sheet, ref } });
    } finally {
      ctx.seen.delete(key);
    }
  }
  if (cell.v === undefined || cell.v === "") return null;
  return cell.v;
}

/* Tables (structured references) ------------------------------------- */

/** The sheet and range of an Excel Table, by name (case-insensitive). */
export function findTable(book: ExcelBook, name: string): { sheet: ExcelSheet; rect: Rect } | null {
  for (const s of book.sheets) {
    if (s.table?.name && s.table.name.toLowerCase() === name.toLowerCase()) {
      const rect = parseRange(s.table.range);
      if (rect) return { sheet: s, rect };
    }
  }
  return null;
}

function tableAt(sheet: ExcelSheet): Rect | null {
  return sheet.table ? parseRange(sheet.table.range) : null;
}

function tableColumn(sheet: ExcelSheet, rect: Rect, col: string): number {
  for (let c = rect.c1; c <= rect.c2; c++) {
    const h = sheet.cells[refOf(c, rect.r1)]?.v;
    if (String(h ?? "").trim().toLowerCase() === col.trim().toLowerCase()) return c;
  }
  throw new FormulaError("#REF!");
}

/* Linked data types --------------------------------------------------- */

/**
 * The records behind the Geography data type (Data › Geography). Population
 * figures are 2020 U.S. Census counts. Only places used in practice files.
 */
export const GEOGRAPHY: Record<string, Record<string, string | number>> = {
  albany: { Name: "Albany", "Admin Division 1 (State/province/other)": "New York", "Admin Division 2 (County/district/other)": "Albany County", "Country/region": "United States", Population: 99224, "Time zone(s)": "Eastern Time Zone" },
  buffalo: { Name: "Buffalo", "Admin Division 1 (State/province/other)": "New York", "Admin Division 2 (County/district/other)": "Erie County", "Country/region": "United States", Population: 278349, "Time zone(s)": "Eastern Time Zone" },
  rochester: { Name: "Rochester", "Admin Division 1 (State/province/other)": "New York", "Admin Division 2 (County/district/other)": "Monroe County", "Country/region": "United States", Population: 211328, "Time zone(s)": "Eastern Time Zone" },
  syracuse: { Name: "Syracuse", "Admin Division 1 (State/province/other)": "New York", "Admin Division 2 (County/district/other)": "Onondaga County", "Country/region": "United States", Population: 148620, "Time zone(s)": "Eastern Time Zone" },
  yonkers: { Name: "Yonkers", "Admin Division 1 (State/province/other)": "New York", "Admin Division 2 (County/district/other)": "Westchester County", "Country/region": "United States", Population: 211569, "Time zone(s)": "Eastern Time Zone" },
};

/** Match typed text ("Albany", "albany, ny") to a Geography record key. */
export function geographyKey(text: unknown): string | null {
  const t = String(text ?? "").trim().toLowerCase().replace(/,\s*(ny|new york)$/, "");
  return GEOGRAPHY[t] ? t : null;
}

export function isLinkedGeography(book: ExcelBook, sheet: ExcelSheet, ref: string): boolean {
  return Boolean(book.flags?.[`geo:${sheet.name}!${ref}`]);
}

/* AutoFilter ----------------------------------------------------------- */

/**
 * Does a filter specification let this value through? A specification is
 * either the list of checked values (as displayed) or a single criterion
 * from a Text/Number/Date filter, written "~>=100", "~between 5|10",
 * "~contains Medline", "~notcontains gloves", "~begins Med", "~ends Co".
 */
export function filterAllows(spec: string[], v: string | number | boolean | null, shown: string): boolean {
  if (spec.length === 1 && spec[0].startsWith("~")) return criterionMatches(spec[0].slice(1), v, shown);
  const s = shown.toLowerCase();
  const raw = String(v ?? "").toLowerCase();
  return spec.some((a) => {
    const x = a.toLowerCase();
    return x === s || x === raw || (x === "(blanks)" && (v === null || v === ""));
  });
}

function criterionMatches(c: string, v: string | number | boolean | null, shown: string): boolean {
  const text = (typeof v === "string" ? v : shown).toLowerCase();
  let m = /^between (.*)\|(.*)$/i.exec(c);
  if (m) {
    const lo = Number(m[1]), hi = Number(m[2]);
    return typeof v === "number" && v >= Math.min(lo, hi) && v <= Math.max(lo, hi);
  }
  m = /^(contains|notcontains|begins|ends) (.*)$/i.exec(c);
  if (m) {
    const q = m[2].toLowerCase();
    switch (m[1].toLowerCase()) {
      case "contains": return text.includes(q);
      case "notcontains": return !text.includes(q);
      case "begins": return text.startsWith(q);
      default: return text.endsWith(q);
    }
  }
  m = /^(>=|<=|<>|>|<|=)(.*)$/.exec(c);
  if (!m) return true;
  const op = m[1];
  const rhs = m[2].trim();
  const n = Number(rhs.replace(/[$,]/g, ""));
  if (rhs !== "" && !Number.isNaN(n) && typeof v === "number") {
    switch (op) {
      case ">=": return v >= n;
      case "<=": return v <= n;
      case ">": return v > n;
      case "<": return v < n;
      case "<>": return v !== n;
      default: return v === n;
    }
  }
  if (op === "=") return text === rhs.toLowerCase();
  if (op === "<>") return text !== rhs.toLowerCase();
  return false;
}

/** Rows an AutoFilter currently hides on a sheet. */
export function filterHiddenRows(book: ExcelBook, sheet: ExcelSheet): Set<number> {
  const out = new Set<number>();
  const rc = sheet.filter ? parseRange(sheet.filter) : null;
  if (!rc || !sheet.filterValues) return out;
  for (const [col, spec] of Object.entries(sheet.filterValues)) {
    if (!spec || !spec.length) continue;
    for (let r: number = rc.r1 + 1; r <= rc.r2; r++) {
      const ref = `${col}${r}`;
      const v = evaluateCell(book, sheet, ref);
      const shown = formatValue(v, sheet.cells[ref]?.fmt);
      if (!filterAllows(spec, v, shown)) out.add(r);
    }
  }
  return out;
}

/* Tokenizer --------------------------------------------------------- */

type Tok =
  | { t: "num"; v: number }
  | { t: "str"; v: string }
  | { t: "ref"; v: string; sheet?: string }
  | { t: "range"; v: string; sheet?: string }
  | { t: "fn"; v: string }
  | { t: "op"; v: string }
  | { t: "("; }
  | { t: ")"; }
  | { t: ","; }
  | { t: "bool"; v: boolean }
  /** Structured reference: Orders[Cost], [@Cost], Orders[@[Unit Cost]]. */
  | { t: "sref"; table?: string; col: string; row: boolean }
  /** Data type field: A2.Population, A2.[Time zone(s)]. */
  | { t: "field"; ref: string; field: string }
  /** Defined name or table name. */
  | { t: "name"; v: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === " ") { i++; continue; }
    if (ch === '"') {
      let j = i + 1, s = "";
      while (j < src.length && src[j] !== '"') s += src[j++];
      out.push({ t: "str", v: s });
      i = j + 1;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      const m = /^[0-9]*\.?[0-9]+(%)?/.exec(src.slice(i))!;
      let v = parseFloat(m[0]);
      if (m[1]) v = v / 100;
      out.push({ t: "num", v });
      i += m[0].length;
      continue;
    }
    // Sheet-qualified ref/range: Sheet1!A1 or 'Q1 Sales'!A1:B2
    const sheetM = /^(?:'([^']+)'|([A-Za-z_][A-Za-z0-9_ ]*?))!(\$?[A-Za-z]{1,3}\$?\d+(?::\$?[A-Za-z]{1,3}\$?\d+)?)/.exec(src.slice(i));
    if (sheetM) {
      const sheet = sheetM[1] ?? sheetM[2];
      const r = sheetM[3];
      out.push(r.includes(":") ? { t: "range", v: r, sheet } : { t: "ref", v: r, sheet });
      i += sheetM[0].length;
      continue;
    }
    // Structured references: Table[Column], [@Column], Table[@[Column Name]], and [Column] inside the table
    // (the Total Row's =SUBTOTAL(109,[Cost])). An apostrophe escapes a special character: [PO '#].
    const srefM = /^([A-Za-z_][A-Za-z0-9_.]*)?\[(@?)(?:\[([^\]]+)\]|([^[\]]+))\]/.exec(src.slice(i));
    if (srefM) {
      out.push({ t: "sref", table: srefM[1], col: (srefM[3] ?? srefM[4]).trim().replace(/'(.)/g, "$1"), row: srefM[2] === "@" });
      i += srefM[0].length;
      continue;
    }
    const rangeM = /^\$?[A-Za-z]{1,3}\$?\d+:\$?[A-Za-z]{1,3}\$?\d+/.exec(src.slice(i));
    if (rangeM) {
      out.push({ t: "range", v: rangeM[0] });
      i += rangeM[0].length;
      continue;
    }
    // Data type field access: A2.Population or A2.[Admin Division 1 (State/province/other)]
    const fieldM = /^(\$?[A-Za-z]{1,3}\$?\d+)\.(?:\[([^\]]+)\]|([A-Za-z_][A-Za-z0-9_]*))/.exec(src.slice(i));
    if (fieldM) {
      out.push({ t: "field", ref: fieldM[1].replace(/\$/g, "").toUpperCase(), field: (fieldM[2] ?? fieldM[3]).trim() });
      i += fieldM[0].length;
      continue;
    }
    // Mixed and absolute references ($B4, C$3, $E$2) before plain words, or "C" in C$3 reads as a name.
    const mixedRef = /^\$[A-Za-z]{1,3}\$?\d+(?![A-Za-z0-9_(])|^[A-Za-z]{1,3}\$\d+(?![A-Za-z0-9_(])/.exec(src.slice(i));
    if (mixedRef) {
      out.push({ t: "ref", v: mixedRef[0] });
      i += mixedRef[0].length;
      continue;
    }
    const wordM = /^[A-Za-z_][A-Za-z0-9_.]*/.exec(src.slice(i));
    if (wordM) {
      const w = wordM[0];
      const after = src.slice(i + w.length).trimStart();
      if (after.startsWith("(")) {
        out.push({ t: "fn", v: w.toUpperCase() });
      } else if (/^\$?[A-Za-z]{1,3}\$?\d+$/.test(w)) {
        out.push({ t: "ref", v: w });
      } else if (/^(TRUE|FALSE)$/i.test(w)) {
        out.push({ t: "bool", v: w.toUpperCase() === "TRUE" });
      } else {
        out.push({ t: "name", v: w });
      }
      i += w.length;
      continue;
    }
    const refDollar = /^\$[A-Za-z]{1,3}\$?\d+|^[A-Za-z]{1,3}\$\d+/.exec(src.slice(i));
    if (refDollar) {
      out.push({ t: "ref", v: refDollar[0] });
      i += refDollar[0].length;
      continue;
    }
    if (ch === "(") { out.push({ t: "(" }); i++; continue; }
    if (ch === ")") { out.push({ t: ")" }); i++; continue; }
    if (ch === "," || ch === ";") { out.push({ t: "," }); i++; continue; }
    const two = src.slice(i, i + 2);
    if (two === "<=" || two === ">=" || two === "<>") { out.push({ t: "op", v: two }); i += 2; continue; }
    if ("+-*/^&=<>%".includes(ch)) { out.push({ t: "op", v: ch }); i++; continue; }
    throw new FormulaError("#ERROR!");
  }
  return out;
}

/* Parser (precedence climbing) -------------------------------------- */

const PREC: Record<string, number> = { "=": 1, "<>": 1, "<": 1, ">": 1, "<=": 1, ">=": 1, "&": 2, "+": 3, "-": 3, "*": 4, "/": 4, "^": 5 };

function toNum(v: Val): number {
  if (v === null || v === "") return 0;
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (Array.isArray(v)) return toNum(v[0] ?? null);
  const n = Number(String(v).replace(/[$,]/g, ""));
  if (Number.isNaN(n)) throw new FormulaError("#VALUE!");
  return n;
}

function flat(vals: Val[]): Val[] {
  const out: Val[] = [];
  for (const v of vals) Array.isArray(v) ? out.push(...flat(v)) : out.push(v);
  return out;
}

function nums(vals: Val[]): number[] {
  return flat(vals).filter((v): v is number => typeof v === "number");
}

function criteria(test: Val): (v: Val) => boolean {
  const s = String(test ?? "");
  const m = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(s)!;
  const op = m[1] ?? "=";
  const rhsRaw = m[2];
  const rhsNum = Number(rhsRaw);
  const isNum = rhsRaw !== "" && !Number.isNaN(rhsNum);
  return (v: Val) => {
    if (isNum && typeof v === "number") {
      switch (op) {
        case "<": return v < rhsNum;
        case ">": return v > rhsNum;
        case "<=": return v <= rhsNum;
        case ">=": return v >= rhsNum;
        case "<>": return v !== rhsNum;
        default: return v === rhsNum;
      }
    }
    const a = String(v ?? "").toLowerCase();
    const b = rhsRaw.toLowerCase();
    if (op === "<>") return a !== b;
    if (b.includes("*")) return new RegExp("^" + b.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$").test(a);
    return a === b;
  };
}

const FNS: Record<string, (args: Val[], raw: Tok[][], ctx: Ctx) => Val> = {
  SUM: (a) => nums(a).reduce((x, y) => x + y, 0),
  AVERAGE: (a) => {
    const n = nums(a);
    if (!n.length) throw new FormulaError("#DIV/0!");
    return n.reduce((x, y) => x + y, 0) / n.length;
  },
  MIN: (a) => (nums(a).length ? Math.min(...nums(a)) : 0),
  MAX: (a) => (nums(a).length ? Math.max(...nums(a)) : 0),
  COUNT: (a) => nums(a).length,
  COUNTA: (a) => flat(a).filter((v) => v !== null && v !== "").length,
  COUNTBLANK: (a) => flat(a).filter((v) => v === null || v === "").length,
  ROUND: (a) => {
    const p = Math.pow(10, toNum(a[1] ?? 0));
    return Math.round(toNum(a[0]) * p) / p;
  },
  ROUNDUP: (a) => {
    const p = Math.pow(10, toNum(a[1] ?? 0));
    return Math.ceil(toNum(a[0]) * p) / p;
  },
  ROUNDDOWN: (a) => {
    const p = Math.pow(10, toNum(a[1] ?? 0));
    return Math.floor(toNum(a[0]) * p) / p;
  },
  ABS: (a) => Math.abs(toNum(a[0])),
  INT: (a) => Math.floor(toNum(a[0])),
  MEDIAN: (a) => {
    const n = nums(a).sort((x, y) => x - y);
    if (!n.length) return 0;
    const m = Math.floor(n.length / 2);
    return n.length % 2 ? n[m] : (n[m - 1] + n[m]) / 2;
  },
  IF: (a) => (truthy(a[0]) ? a[1] ?? true : a[2] ?? false),
  AND: (a) => flat(a).every(truthy),
  OR: (a) => flat(a).some(truthy),
  NOT: (a) => !truthy(a[0]),
  IFERROR: (a) => a[0],
  SUMIF: (a) => {
    const rng = flat([a[0]]);
    const sum = a[2] !== undefined ? flat([a[2]]) : rng;
    const test = criteria(a[1]);
    let t = 0;
    rng.forEach((v, i) => {
      if (test(v)) t += typeof sum[i] === "number" ? (sum[i] as number) : 0;
    });
    return t;
  },
  COUNTIF: (a) => flat([a[0]]).filter(criteria(a[1])).length,
  AVERAGEIF: (a) => {
    const rng = flat([a[0]]);
    const vals = a[2] !== undefined ? flat([a[2]]) : rng;
    const test = criteria(a[1]);
    const hits = rng.map((v, i) => (test(v) ? vals[i] : null)).filter((v): v is number => typeof v === "number");
    if (!hits.length) throw new FormulaError("#DIV/0!");
    return hits.reduce((x, y) => x + y, 0) / hits.length;
  },
  CONCAT: (a) => flat(a).map((v) => (v ?? "").toString()).join(""),
  CONCATENATE: (a) => flat(a).map((v) => (v ?? "").toString()).join(""),
  TEXTJOIN: (a) => {
    const sep = String(a[0] ?? "");
    const skip = truthy(a[1]);
    return flat(a.slice(2)).filter((v) => !(skip && (v === null || v === ""))).map((v) => String(v ?? "")).join(sep);
  },
  UPPER: (a) => String(a[0] ?? "").toUpperCase(),
  LOWER: (a) => String(a[0] ?? "").toLowerCase(),
  PROPER: (a) => String(a[0] ?? "").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
  LEFT: (a) => String(a[0] ?? "").slice(0, toNum(a[1] ?? 1)),
  RIGHT: (a) => {
    const s = String(a[0] ?? "");
    const n = toNum(a[1] ?? 1);
    return s.slice(Math.max(0, s.length - n));
  },
  MID: (a) => String(a[0] ?? "").substr(toNum(a[1]) - 1, toNum(a[2])),
  LEN: (a) => String(a[0] ?? "").length,
  TRIM: (a) => String(a[0] ?? "").trim().replace(/\s+/g, " "),
  SUBTOTAL: (a) => {
    const code = toNum(a[0]) % 100;
    const rest = a.slice(1);
    const fn = SUBTOTAL_FNS[code] ?? "SUM";
    return FNS[fn](rest, [], undefined as unknown as Ctx);
  },
  STDEV: (a) => stdev(nums(a), true),
  "STDEV.S": (a) => stdev(nums(a), true),
  STDEVP: (a) => stdev(nums(a), false),
  "STDEV.P": (a) => stdev(nums(a), false),
  VAR: (a) => variance(nums(a), true),
  "VAR.S": (a) => variance(nums(a), true),
  VARP: (a) => variance(nums(a), false),
  "VAR.P": (a) => variance(nums(a), false),
  /** TEXT(value, format_text) uses the same custom format codes as Format Cells › Custom. */
  TEXT: (a) => {
    const v = Array.isArray(a[0]) ? flat([a[0]])[0] ?? null : a[0];
    return formatCustom(typeof v === "number" || typeof v === "string" ? v : toNum(v ?? 0), String(a[1] ?? "General"));
  },
  SUMIFS: (a) => {
    const sum = flat([a[0]]);
    let keep = sum.map(() => true);
    for (let i = 1; i + 1 < a.length; i += 2) {
      const rng = flat([a[i]]);
      const test = criteria(a[i + 1]);
      keep = keep.map((k, j) => k && test(rng[j]));
    }
    return sum.reduce<number>((t, v, j) => t + (keep[j] && typeof v === "number" ? v : 0), 0);
  },
  COUNTIFS: (a) => {
    const first = flat([a[0]]);
    let keep = first.map(() => true);
    for (let i = 0; i + 1 < a.length; i += 2) {
      const rng = flat([a[i]]);
      const test = criteria(a[i + 1]);
      keep = keep.map((k, j) => k && test(rng[j]));
    }
    return keep.filter(Boolean).length;
  },
  AVERAGEIFS: (a) => {
    const vals = flat([a[0]]);
    let keep = vals.map(() => true);
    for (let i = 1; i + 1 < a.length; i += 2) {
      const rng = flat([a[i]]);
      const test = criteria(a[i + 1]);
      keep = keep.map((k, j) => k && test(rng[j]));
    }
    const hits = vals.filter((v, j) => keep[j] && typeof v === "number") as number[];
    if (!hits.length) throw new FormulaError("#DIV/0!");
    return hits.reduce((x, y) => x + y, 0) / hits.length;
  },
  DATE: (a) => Math.round((Date.UTC(toNum(a[0]), toNum(a[1]) - 1, toNum(a[2])) - Date.UTC(1899, 11, 30)) / 86400000),
  YEAR: (a) => new Date(Date.UTC(1899, 11, 30) + toNum(a[0]) * 86400000).getUTCFullYear(),
  MONTH: (a) => new Date(Date.UTC(1899, 11, 30) + toNum(a[0]) * 86400000).getUTCMonth() + 1,
  DAY: (a) => new Date(Date.UTC(1899, 11, 30) + toNum(a[0]) * 86400000).getUTCDate(),
  TODAY: () => 46315, // 2026-10-20 as an Excel serial date, so sims are deterministic
  NOW: () => 46315.5,
  PMT: (a) => {
    const rate = toNum(a[0]);
    const n = toNum(a[1]);
    const pv = toNum(a[2]);
    if (rate === 0) return -pv / n;
    return (-pv * rate) / (1 - Math.pow(1 + rate, -n));
  },
  VLOOKUP: (a) => {
    const key = a[0];
    const table = a[1];
    const col = toNum(a[2]);
    const approx = a[3] === undefined ? true : truthy(a[3]);
    if (!Array.isArray(table)) throw new FormulaError("#N/A");
    const rows = table as Val[][];
    if (!approx) {
      const row = rows.find((r) => eq(r[0], key));
      if (!row) throw new FormulaError("#N/A");
      return row[col - 1] ?? null;
    }
    let best: Val[] | null = null;
    for (const r of rows) {
      if (typeof r[0] === "number" && typeof key === "number" && r[0] <= key) best = r;
      else if (eq(r[0], key)) best = r;
    }
    if (!best) throw new FormulaError("#N/A");
    return best[col - 1] ?? null;
  },
  HLOOKUP: (a) => {
    const key = a[0];
    const table = a[1] as Val[][];
    const row = toNum(a[2]);
    if (!Array.isArray(table)) throw new FormulaError("#N/A");
    const idx = (table[0] as Val[]).findIndex((v) => eq(v, key));
    if (idx < 0) throw new FormulaError("#N/A");
    return (table[row - 1] as Val[])[idx];
  },
  XLOOKUP: (a) => {
    const key = a[0];
    const look = flat([a[1]]);
    const ret = flat([a[2]]);
    const idx = look.findIndex((v) => eq(v, key));
    if (idx < 0) {
      if (a[3] !== undefined) return a[3];
      throw new FormulaError("#N/A");
    }
    return ret[idx];
  },
  INDEX: (a) => {
    const t = a[0];
    const r = toNum(a[1]);
    const c = toNum(a[2] ?? 1);
    if (!Array.isArray(t)) return t;
    const row = (t as Val[][])[r - 1];
    return Array.isArray(row) ? row[c - 1] : row;
  },
  MATCH: (a) => {
    const idx = flat([a[1]]).findIndex((v) => eq(v, a[0]));
    if (idx < 0) throw new FormulaError("#N/A");
    return idx + 1;
  },
  /* Dynamic arrays return a grid (rows of values) that spills. */
  UNIQUE: (a) => {
    const g = toGrid(a[0] ?? null);
    const seen = new Set<string>();
    const out: Val[][] = [];
    for (const row of g) {
      const k = row.map((v) => String(v ?? "").toLowerCase()).join("\u0001");
      if (!seen.has(k)) {
        seen.add(k);
        out.push(row);
      }
    }
    return out;
  },
  SORT: (a) => {
    let g = toGrid(a[0] ?? null).map((r) => r.slice());
    const idx = Math.max(1, toNum(a[1] ?? 1)) - 1;
    const desc = toNum(a[2] ?? 1) === -1;
    const byCol = a[3] !== undefined && truthy(a[3]);
    if (byCol) g = transpose(g);
    g.sort((r1, r2) => {
      const c = sortCompare(r1[idx] ?? null, r2[idx] ?? null);
      return desc ? -c : c;
    });
    return byCol ? transpose(g) : g;
  },
  SORTBY: (a) => {
    const g = toGrid(a[0] ?? null);
    const by = toGrid(a[1] ?? null).map((r) => r[0] ?? null);
    const desc = toNum(a[2] ?? 1) === -1;
    const order = g.map((_, i) => i);
    order.sort((i, j) => {
      const c = sortCompare(by[i] ?? null, by[j] ?? null);
      return desc ? -c : c;
    });
    return order.map((i) => g[i]);
  },
  FILTER: (a) => {
    const arr = toGrid(a[0] ?? null);
    const inc = toGrid(a[1] ?? null);
    let out: Val[][];
    if (inc.length === arr.length && (inc[0]?.length ?? 0) === 1) out = arr.filter((_, i) => truthy(inc[i][0]));
    else if (inc.length === 1 && inc[0].length === (arr[0]?.length ?? 0)) {
      const keep = inc[0].map(truthy);
      out = arr.map((row) => row.filter((_, j) => keep[j]));
      if (!out[0]?.length) out = [];
    } else throw new FormulaError("#VALUE!");
    if (!out.length) {
      if (a[2] !== undefined) return a[2];
      throw new FormulaError("#CALC!");
    }
    return out;
  },
  SEQUENCE: (a) => {
    const rows = Math.max(1, toNum(a[0] ?? 1));
    const cols = Math.max(1, toNum(a[1] ?? 1));
    const start = toNum(a[2] ?? 1);
    const step = toNum(a[3] ?? 1);
    return Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => start + (r * cols + c) * step));
  },
  PRODUCT: (a) => nums(a).reduce((x, y) => x * y, 1),
  IFS: (a) => {
    for (let i = 0; i + 1 < a.length; i += 2) if (truthy(a[i])) return a[i + 1];
    throw new FormulaError("#N/A");
  },
  FV: (a) => {
    const rate = toNum(a[0]), n = toNum(a[1]), pmt = toNum(a[2]), pv = toNum(a[3] ?? 0);
    if (rate === 0) return -(pv + pmt * n);
    const f = Math.pow(1 + rate, n);
    return -(pv * f + (pmt * (f - 1)) / rate);
  },
  PV: (a) => {
    const rate = toNum(a[0]), n = toNum(a[1]), pmt = toNum(a[2]), fv = toNum(a[3] ?? 0);
    if (rate === 0) return -(fv + pmt * n);
    const f = Math.pow(1 + rate, n);
    return -(fv + (pmt * (f - 1)) / rate) / f;
  },
  NETWORKDAYS: (a) => {
    let s = Math.floor(toNum(a[0])), e = Math.floor(toNum(a[1]));
    const sign = s <= e ? 1 : -1;
    if (sign < 0) [s, e] = [e, s];
    const hol = new Set(a[2] !== undefined ? nums([a[2]]).map(Math.floor) : []);
    let n = 0;
    for (let d = s; d <= e; d++) {
      const wd = new Date(Date.UTC(1899, 11, 30) + d * 86400000).getUTCDay();
      if (wd !== 0 && wd !== 6 && !hol.has(d)) n++;
    }
    return n * sign;
  },
  WEEKDAY: (a) => new Date(Date.UTC(1899, 11, 30) + Math.floor(toNum(a[0])) * 86400000).getUTCDay() + 1,
};

/** SUBTOTAL function codes (1-11; add 100 to also skip hidden rows). */
const SUBTOTAL_FNS: Record<number, string> = { 1: "AVERAGE", 2: "COUNT", 3: "COUNTA", 4: "MAX", 5: "MIN", 6: "PRODUCT", 7: "STDEV", 8: "STDEVP", 9: "SUM", 10: "VAR", 11: "VARP" };

function variance(n: number[], sample: boolean): number {
  if (n.length < (sample ? 2 : 1)) throw new FormulaError("#DIV/0!");
  const mean = n.reduce((x, y) => x + y, 0) / n.length;
  return n.reduce((t, x) => t + (x - mean) * (x - mean), 0) / (n.length - (sample ? 1 : 0));
}

function stdev(n: number[], sample: boolean): number {
  return Math.sqrt(variance(n, sample));
}

/* Grids ------------------------------------------------------------- */

function toGrid(v: Val): Val[][] {
  if (!Array.isArray(v)) return [[v]];
  if (v.length === 0) return [];
  if (Array.isArray(v[0])) return v as Val[][];
  return (v as Val[]).map((x) => [x]);
}

function transpose(g: Val[][]): Val[][] {
  const cols = Math.max(0, ...g.map((r) => r.length));
  return Array.from({ length: cols }, (_, c) => g.map((r) => r[c] ?? null));
}

/** Excel's sort order: numbers, then text (case-insensitive), then logicals, blanks last. */
function sortCompare(x: Val, y: Val): number {
  const rank = (v: Val) => (v === null || v === "" ? 3 : typeof v === "number" ? 0 : typeof v === "boolean" ? 2 : 1);
  const rx = rank(x), ry = rank(y);
  if (rx !== ry) return rx - ry;
  if (typeof x === "number" && typeof y === "number") return x - y;
  return String(x ?? "").localeCompare(String(y ?? ""), undefined, { sensitivity: "base" });
}

/** Apply a scalar operation element by element (array formulas, FILTER conditions). */
function elementwise(a: Val, b: Val, fn: (x: Val, y: Val) => Val): Val {
  if (!Array.isArray(a) && !Array.isArray(b)) return fn(a, b);
  const ga = toGrid(a), gb = toGrid(b);
  const rows = Math.max(ga.length, gb.length);
  const cols = Math.max(ga[0]?.length ?? 0, gb[0]?.length ?? 0);
  const pick = (g: Val[][], r: number, c: number): Val | undefined => {
    const row = g[g.length === 1 ? 0 : r];
    if (!row) return undefined;
    const cc = row.length === 1 ? 0 : c;
    return cc < row.length ? row[cc] : undefined;
  };
  const out: Val[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Val[] = [];
    for (let c = 0; c < cols; c++) {
      const x = pick(ga, r, c), y = pick(gb, r, c);
      if (x === undefined || y === undefined) {
        row.push("#N/A");
        continue;
      }
      try {
        row.push(fn(x, y));
      } catch (e) {
        row.push(e instanceof FormulaError ? e.code : "#VALUE!");
      }
    }
    out.push(row);
  }
  return out;
}

function eq(a: Val, b: Val): boolean {
  if (typeof a === "number" && typeof b === "number") return a === b;
  return String(a ?? "").toLowerCase() === String(b ?? "").toLowerCase();
}

function truthy(v: Val): boolean {
  if (Array.isArray(v)) return truthy(v[0] ?? null);
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (v === null || v === "") return false;
  return String(v).toUpperCase() === "TRUE";
}

type Node =
  | { k: "lit"; v: Val }
  | { k: "ref"; v: string; sheet?: string }
  | { k: "range"; v: string; sheet?: string }
  | { k: "neg"; a: Node }
  | { k: "pct"; a: Node }
  | { k: "bin"; op: string; a: Node; b: Node }
  | { k: "fn"; name: string; args: Node[] }
  | { k: "sref"; table?: string; col: string; row: boolean }
  | { k: "field"; ref: string; field: string }
  | { k: "name"; v: string }
  /** An omitted argument, as in =SORT(A2:B9,,-1). */
  | { k: "omit" };

function parse(src: string): Node {
  const toks = tokenize(src);
  let pos = 0;
  const peek = () => toks[pos];

  function primary(): Node {
    const t = toks[pos++];
    if (!t) throw new FormulaError("#ERROR!");
    switch (t.t) {
      case "num": return { k: "lit", v: t.v };
      case "str": return { k: "lit", v: t.v };
      case "bool": return { k: "lit", v: t.v };
      case "ref": return { k: "ref", v: t.v.replace(/\$/g, "").toUpperCase(), sheet: t.sheet };
      case "range": return { k: "range", v: t.v, sheet: t.sheet };
      case "sref": return { k: "sref", table: t.table, col: t.col, row: t.row };
      case "field": return { k: "field", ref: t.ref, field: t.field };
      case "name": return { k: "name", v: t.v };
      case "op":
        if (t.v === "-") return { k: "neg", a: unary() };
        if (t.v === "+") return unary();
        throw new FormulaError("#ERROR!");
      case "(": {
        const v = expr(0);
        if (toks[pos]?.t !== ")") throw new FormulaError("#ERROR!");
        pos++;
        return v;
      }
      case "fn": {
        const name = t.v.replace(/^_XLFN\./, "");
        if (toks[pos]?.t !== "(") throw new FormulaError("#ERROR!");
        pos++;
        const args: Node[] = [];
        if (toks[pos]?.t !== ")") {
          for (;;) {
            const nt = toks[pos]?.t;
            args.push(nt === "," || nt === ")" ? { k: "omit" } : expr(0));
            if (toks[pos]?.t === ",") { pos++; continue; }
            break;
          }
        }
        if (toks[pos]?.t !== ")") throw new FormulaError("#ERROR!");
        pos++;
        return { k: "fn", name, args };
      }
      default:
        throw new FormulaError("#ERROR!");
    }
  }

  function unary(): Node {
    let v = primary();
    while (peek()?.t === "op" && (peek() as { v: string }).v === "%") {
      pos++;
      v = { k: "pct", a: v };
    }
    return v;
  }

  function expr(minPrec: number): Node {
    let lhs = unary();
    for (;;) {
      const t = peek();
      if (!t || t.t !== "op") break;
      const prec = PREC[t.v];
      if (prec === undefined || prec < minPrec) break;
      pos++;
      const rhs = expr(t.v === "^" ? prec : prec + 1);
      lhs = { k: "bin", op: t.v, a: lhs, b: rhs };
    }
    return lhs;
  }

  const n = expr(0);
  if (pos < toks.length) throw new FormulaError("#ERROR!");
  return n;
}

function compare(a: Val, b: Val): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a ?? "").localeCompare(String(b ?? ""));
}

function binop(op: string, a: Val, b: Val): Val {
  switch (op) {
    case "+": return toNum(a) + toNum(b);
    case "-": return toNum(a) - toNum(b);
    case "*": return toNum(a) * toNum(b);
    case "/": {
      const d = toNum(b);
      if (d === 0) throw new FormulaError("#DIV/0!");
      return toNum(a) / d;
    }
    case "^": return Math.pow(toNum(a), toNum(b));
    case "&": return String(a ?? "") + String(b ?? "");
    case "=": return eq(a, b);
    case "<>": return !eq(a, b);
    case "<": return compare(a, b) < 0;
    case ">": return compare(a, b) > 0;
    case "<=": return compare(a, b) <= 0;
    case ">=": return compare(a, b) >= 0;
  }
  throw new FormulaError("#ERROR!");
}

function evalNode(n: Node, ctx: Ctx): Val {
  switch (n.k) {
    case "lit": return n.v;
    case "ref": {
      const sheet = n.sheet ? sheetByName(ctx.book, n.sheet) : ctx.sheet;
      if (!sheet) throw new FormulaError("#REF!");
      return cellValue(ctx, sheet, n.v);
    }
    case "range": {
      const sheet = n.sheet ? sheetByName(ctx.book, n.sheet) : ctx.sheet;
      if (!sheet) throw new FormulaError("#REF!");
      const rc = parseRange(n.v)!;
      const rows: Val[][] = [];
      const r2 = Math.min(rc.r2, rc.r1 + 1000);
      for (let r = rc.r1; r <= r2; r++) {
        const row: Val[] = [];
        for (let c = rc.c1; c <= Math.min(rc.c2, rc.c1 + 60); c++) row.push(cellValue(ctx, sheet, refOf(c, r)));
        rows.push(row);
      }
      return rows;
    }
    case "neg": return elementwise(evalNode(n.a, ctx), null, (x) => -toNum(x));
    case "pct": return elementwise(evalNode(n.a, ctx), null, (x) => toNum(x) / 100);
    case "bin": return elementwise(evalNode(n.a, ctx), evalNode(n.b, ctx), (x, y) => binop(n.op, x, y));
    case "omit": return undefined as unknown as Val;
    case "sref": {
      const t = n.table ? findTable(ctx.book, n.table) : (() => {
        const s = ctx.cur?.sheet ?? ctx.sheet;
        const rect = tableAt(s);
        return rect ? { sheet: s, rect } : null;
      })();
      if (!t) throw new FormulaError("#REF!");
      const col = tableColumn(t.sheet, t.rect, n.col);
      if (n.row) {
        const p = ctx.cur ? parseRef(ctx.cur.ref) : null;
        if (!p || p.r <= t.rect.r1 || p.r > t.rect.r2) throw new FormulaError("#VALUE!");
        return cellValue(ctx, t.sheet, refOf(col, p.r));
      }
      return evalNode({ k: "range", v: `${refOf(col, t.rect.r1 + 1)}:${refOf(col, t.rect.r2)}`, sheet: t.sheet.name }, ctx);
    }
    case "field": {
      const sheet = ctx.cur?.sheet ?? ctx.sheet;
      if (!isLinkedGeography(ctx.book, sheet, n.ref)) throw new FormulaError("#FIELD!");
      const key = geographyKey(cellValue(ctx, sheet, n.ref));
      const rec = key ? GEOGRAPHY[key] : null;
      const f = rec ? Object.keys(rec).find((k) => k.toLowerCase() === n.field.toLowerCase()) : undefined;
      if (!rec || !f) throw new FormulaError("#FIELD!");
      return rec[f];
    }
    case "name": {
      const names = ctx.book.names ?? {};
      const key = Object.keys(names).find((k) => k.toLowerCase() === n.v.toLowerCase());
      if (key) {
        if (ctx.depth > 40) throw new FormulaError("#NAME?");
        return evalNode(parse(names[key].replace(/^=/, "")), { ...ctx, depth: ctx.depth + 1 });
      }
      const t = findTable(ctx.book, n.v);
      if (t) return evalNode({ k: "range", v: `${refOf(t.rect.c1, t.rect.r1 + 1)}:${refOf(t.rect.c2, t.rect.r2)}`, sheet: t.sheet.name }, ctx);
      throw new FormulaError("#NAME?");
    }
    case "fn": {
      if (n.name === "IF") {
        const c = evalNode(n.args[0] ?? { k: "omit" }, ctx);
        if (Array.isArray(c)) {
          // Array condition (e.g. =IF(C2:C9<D2:D9,"Reorder","OK")): evaluate per element.
          const yes = n.args[1] ? evalNode(n.args[1], ctx) : true;
          const no = n.args[2] ? evalNode(n.args[2], ctx) : false;
          return elementwise(c, null, (x) => (truthy(x) ? (Array.isArray(yes) ? toGrid(yes)[0]?.[0] ?? null : yes) : Array.isArray(no) ? toGrid(no)[0]?.[0] ?? null : no));
        }
        if (truthy(c)) return n.args[1] ? evalNode(n.args[1], ctx) : true;
        return n.args[2] ? evalNode(n.args[2], ctx) : false;
      }
      if (n.name === "IFERROR") {
        try {
          return evalNode(n.args[0], ctx);
        } catch (e) {
          if (e instanceof FormulaError) return n.args[1] ? evalNode(n.args[1], ctx) : "";
          throw e;
        }
      }
      if (n.name === "SUBTOTAL") return subtotalFn(n.args, ctx);
      if (n.name === "GETPIVOTDATA") {
        // GETPIVOTDATA(data_field, pivot_table, [field1, item1], ...): pivot_table is any cell of the report.
        const dataField = String(evalNode(n.args[0] ?? { k: "omit" }, ctx) ?? "");
        const area = n.args[1] ? areaOf(n.args[1], ctx) : null;
        if (!area?.sheet.pivot) throw new FormulaError("#REF!");
        const pairs: [string, Scalar][] = [];
        for (let i = 2; i + 1 < n.args.length; i += 2) {
          const f = evalNode(n.args[i], ctx);
          const it = evalNode(n.args[i + 1], ctx);
          pairs.push([String(Array.isArray(f) ? flat([f])[0] ?? "" : f ?? ""), (Array.isArray(it) ? flat([it])[0] ?? null : it) as Scalar]);
        }
        const r = getPivotData(ctx.book, area.sheet, dataField, pairs);
        if (typeof r === "string" && r.startsWith("#")) throw new FormulaError(r);
        return r;
      }
      const fn = FNS[n.name];
      if (!fn) throw new FormulaError("#NAME?");
      return fn(n.args.map((a) => evalNode(a, ctx)), [], ctx);
    }
  }
}

/** The sheet and rectangle a reference node points at (for SUBTOTAL). */
function areaOf(n: Node, ctx: Ctx): { sheet: ExcelSheet; rect: Rect } | null {
  if (n.k === "range" || n.k === "ref") {
    const sheet = n.sheet ? sheetByName(ctx.book, n.sheet) : ctx.sheet;
    const rect = parseRange(n.v);
    return sheet && rect ? { sheet, rect } : null;
  }
  if (n.k === "sref" && !n.row) {
    const t = n.table ? findTable(ctx.book, n.table) : (() => {
      const s = ctx.cur?.sheet ?? ctx.sheet;
      const rect = tableAt(s);
      return rect ? { sheet: s, rect } : null;
    })();
    if (!t) return null;
    const col = tableColumn(t.sheet, t.rect, n.col);
    return { sheet: t.sheet, rect: { c1: col, c2: col, r1: t.rect.r1 + 1, r2: t.rect.r2 } };
  }
  return null;
}

/**
 * SUBTOTAL ignores rows hidden by a filter, and with codes 101-111 also rows
 * hidden by hand or by a collapsed outline. Like Excel, it skips other
 * SUBTOTAL results inside its range so grand totals never double count.
 */
function subtotalFn(args: Node[], ctx: Ctx): Val {
  const code = toNum(evalNode(args[0] ?? { k: "omit" }, ctx));
  const fnName = SUBTOTAL_FNS[code % 100];
  if (!fnName) throw new FormulaError("#VALUE!");
  const vals: Val[] = [];
  for (const arg of args.slice(1)) {
    const area = areaOf(arg, ctx);
    if (!area) {
      vals.push(evalNode(arg, ctx));
      continue;
    }
    const filtered = filterHiddenRows(ctx.book, area.sheet);
    const manual = new Set(code > 100 ? area.sheet.hiddenRows ?? [] : []);
    const r2 = Math.min(area.rect.r2, area.rect.r1 + 1000);
    for (let r = area.rect.r1; r <= r2; r++) {
      if (filtered.has(r) || manual.has(r)) continue;
      for (let c = area.rect.c1; c <= Math.min(area.rect.c2, area.rect.c1 + 60); c++) {
        const ref = refOf(c, r);
        const cell = area.sheet.cells[ref];
        if (cell?.f && /\bSUBTOTAL\s*\(/i.test(cell.f)) continue;
        vals.push(cellValue(ctx, area.sheet, ref));
      }
    }
  }
  return FNS[fnName](vals, [], ctx);
}

const PARSE_CACHE = new Map<string, Node>();

function evalFormula(f: string, ctx: Ctx): Val {
  const src = f.startsWith("=") ? f.slice(1) : f;
  let node = PARSE_CACHE.get(src);
  if (!node) {
    node = parse(src);
    if (PARSE_CACHE.size > 2000) PARSE_CACHE.clear();
    PARSE_CACHE.set(src, node);
  }
  return evalNode(node, ctx);
}

/** Evaluate a cell (formula or literal). Errors come back as their code string. */
export function evaluateCell(book: ExcelBook, sheet: ExcelSheet, ref: string): string | number | boolean | null {
  try {
    const v = cellValue({ book, sheet, depth: 0, seen: new Set() }, sheet, ref);
    if (Array.isArray(v)) {
      const f = flat(v)[0];
      return f === undefined ? null : (f as string | number | boolean | null);
    }
    return v;
  } catch (e) {
    if (e instanceof FormulaError) return e.code;
    return "#ERROR!";
  }
}

/** Spill support for dynamic-array lessons: returns all values a formula produces. */
export function evaluateSpill(book: ExcelBook, sheet: ExcelSheet, f: string, at?: string): (string | number | boolean | null)[] {
  try {
    const v = evalFormula(f, { book, sheet, depth: 0, seen: new Set(), cur: at ? { sheet, ref: at } : undefined });
    return Array.isArray(v) ? (flat(v) as (string | number | boolean | null)[]) : [v as string | number | boolean | null];
  } catch (e) {
    return [e instanceof FormulaError ? e.code : "#ERROR!"];
  }
}

export type Scalar = string | number | boolean | null;

/** The full grid a dynamic array formula returns (rows of values), for spilling. */
export function evaluateSpillGrid(book: ExcelBook, sheet: ExcelSheet, f: string, at?: string): Scalar[][] {
  try {
    const v = evalFormula(f, { book, sheet, depth: 0, seen: new Set(), cur: at ? { sheet, ref: at } : undefined });
    if (!Array.isArray(v)) return [[(v ?? null) as Scalar]];
    return toGrid(v).map((row) => row.map((x) => (Array.isArray(x) ? (flat(x)[0] ?? null) : x) as Scalar));
  } catch (e) {
    return [[e instanceof FormulaError ? e.code : "#ERROR!"]];
  }
}

/** Show a formula in R1C1 notation as seen from the cell at (row, col). */
export function formulaToR1C1(f: string, row: number, col: number): string {
  let inStr = false;
  return f
    .split('"')
    .map((part) => {
      const out = inStr
        ? part
        : part.replace(/(^|[^A-Za-z0-9_'.[])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_(!])/g, (_m, pre, d1, colS, d2, rowS) => {
            const c = colToNum(colS), r = Number(rowS);
            const rs = d2 ? `R${r}` : r === row ? "R" : `R[${r - row}]`;
            const cs = d1 ? `C${c}` : c === col ? "C" : `C[${c - col}]`;
            return `${pre}${rs}${cs}`;
          });
      inStr = !inStr;
      return out;
    })
    .join('"');
}

/* ------------------------------------------------------------------ */
/* Display formatting                                                  */
/* ------------------------------------------------------------------ */

function excelDate(serial: number, long: boolean): string {
  const d = new Date(Date.UTC(1899, 11, 30) + Math.round(serial) * 86400000);
  if (long) {
    return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  }
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
}

export function formatValue(v: string | number | boolean | null, fmt?: CellFormat): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  const custom = (fmt as XCellFormat | undefined)?.custom;
  if (custom && !/^general$/i.test(custom.trim()) && !(typeof v === "string" && v.startsWith("#"))) return formatCustom(v, custom);
  if (typeof v === "string") return v;
  const nf = fmt?.numFmt ?? "General";
  const dec = fmt?.decimals;
  const fixed = (n: number, d: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  switch (nf) {
    case "Number": return fixed(v, dec ?? 2);
    case "Comma": return fixed(v, dec ?? 2);
    case "Currency": return (v < 0 ? "-$" : "$") + fixed(Math.abs(v), dec ?? 2);
    case "Accounting": return (v < 0 ? "$ (" : "$ ") + fixed(Math.abs(v), dec ?? 2) + (v < 0 ? ")" : " ");
    case "Percentage": return fixed(v * 100, dec ?? 0) + "%";
    case "Short Date": return excelDate(v, false);
    case "Long Date": return excelDate(v, true);
    case "Time": {
      const mins = Math.round((v % 1) * 1440);
      const h = Math.floor(mins / 60), m = mins % 60;
      const ap = h >= 12 ? "PM" : "AM";
      return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`;
    }
    case "Scientific": return v.toExponential(dec ?? 2).toUpperCase();
    case "Fraction": return String(v);
    case "Text": return String(v);
    default: {
      if (dec !== undefined) return fixed(v, dec);
      if (Number.isInteger(v)) return String(v);
      return String(Math.round(v * 1e9) / 1e9);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Custom number formats (Format Cells › Number › Custom)              */
/* ------------------------------------------------------------------ */

/** A cell format that may carry a custom format code such as "yyyy-mm-dd" or "$"#,##0.00. */
export type XCellFormat = CellFormat & { custom?: string };

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Split a format code into its ; sections, ignoring ; inside quotes. */
function splitSections(code: string): string[] {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (ch === '"') { q = !q; cur += ch; continue; }
    if (!q && ch === "\\") { cur += ch + (code[i + 1] ?? ""); i++; continue; }
    if (!q && ch === ";") { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
}

/** The section text without quoted literals, escapes and [tags], for classifying it. */
function bareSection(s: string): string {
  return s.replace(/"[^"]*"/g, "").replace(/\\./g, "").replace(/\[[^\]]*\]/g, "").replace(/_.|\*./g, "");
}

function isDateSection(s: string): boolean {
  const b = bareSection(s);
  return /[ydhs]/i.test(b) || /m/i.test(b.replace(/AM\/PM|A\/P/gi, "")) || /AM\/PM|A\/P/i.test(b);
}

/** Format a date/time serial with a code such as yyyy-mm-dd, mmmm d, yyyy or h:mm AM/PM. */
function formatDateCode(serial: number, code: string): string {
  const day = Math.floor(serial);
  const d = new Date(Date.UTC(1899, 11, 30) + day * 86400000);
  const secs = Math.round((serial - day) * 86400);
  const hh = Math.floor(secs / 3600) % 24, mi = Math.floor((secs % 3600) / 60), ss = secs % 60;
  const toks = code.match(/"[^"]*"|\\.|\[[^\]]*\]|yyyy|yyy|yy|y|mmmmm|mmmm|mmm|mm|m|dddd|ddd|dd|d|hh|h|ss|s|AM\/PM|am\/pm|A\/P|a\/p|_.|\*.|./gi) ?? [];
  const twelve = toks.some((t) => /^(AM\/PM|A\/P)$/i.test(t));
  const out: string[] = [];
  toks.forEach((t, i) => {
    const low = t.toLowerCase();
    if (t.startsWith('"')) { out.push(t.slice(1, -1)); return; }
    if (t.startsWith("\\")) { out.push(t.slice(1)); return; }
    if (t.startsWith("[")) return;
    if (t.startsWith("_")) { out.push(" "); return; }
    if (t.startsWith("*")) return;
    if (/^m{1,2}$/.test(low)) {
      // m/mm right after an hour or right before seconds means minutes.
      const prev = toks.slice(0, i).reverse().find((x) => /^[a-z]/i.test(x) && !/^(AM\/PM|A\/P)$/i.test(x));
      const next = toks.slice(i + 1).find((x) => /^[a-z]/i.test(x) && !/^(AM\/PM|A\/P)$/i.test(x));
      if ((prev && /^h+$/i.test(prev)) || (next && /^s+$/i.test(next))) { out.push(low === "mm" ? String(mi).padStart(2, "0") : String(mi)); return; }
      out.push(low === "mm" ? String(d.getUTCMonth() + 1).padStart(2, "0") : String(d.getUTCMonth() + 1));
      return;
    }
    switch (low) {
      case "yyyy": case "yyy": out.push(String(d.getUTCFullYear())); return;
      case "yy": case "y": out.push(String(d.getUTCFullYear() % 100).padStart(2, "0")); return;
      case "mmmmm": out.push(MONTH_NAMES[d.getUTCMonth()][0]); return;
      case "mmmm": out.push(MONTH_NAMES[d.getUTCMonth()]); return;
      case "mmm": out.push(MONTH_NAMES[d.getUTCMonth()].slice(0, 3)); return;
      case "dddd": out.push(DAY_NAMES[d.getUTCDay()]); return;
      case "ddd": out.push(DAY_NAMES[d.getUTCDay()].slice(0, 3)); return;
      case "dd": out.push(String(d.getUTCDate()).padStart(2, "0")); return;
      case "d": out.push(String(d.getUTCDate())); return;
      case "hh": case "h": {
        const h = twelve ? ((hh + 11) % 12) + 1 : hh;
        out.push(low === "hh" ? String(h).padStart(2, "0") : String(h));
        return;
      }
      case "ss": out.push(String(ss).padStart(2, "0")); return;
      case "s": out.push(String(ss)); return;
      case "am/pm": out.push(hh >= 12 ? (t === "am/pm" ? "pm" : "PM") : t === "am/pm" ? "am" : "AM"); return;
      case "a/p": out.push(hh >= 12 ? (t === "a/p" ? "p" : "P") : t === "a/p" ? "a" : "A"); return;
    }
    out.push(t);
  });
  return out.join("");
}

type NumTok = { t: "lit"; s: string } | { t: "ph"; ch: string } | { t: "dot" } | { t: "comma" };

/** Format a number with a code such as #,##0.00, "$"#,##0.00, 0.0%, 000-00-0000 or 0.00E+00. */
function formatNumberCode(n: number, code: string): string {
  if (/^\s*general\s*$/i.test(bareSection(code))) return formatValue(n);
  const frac = /([#0?]*)\s*([#0?]+)\/([#0?]+|\d+)/.exec(bareSection(code));
  if (frac) {
    // Fractions: # ?/? (up to one-digit denominators), # ??/??, or a fixed denominator (# ?/8).
    const a = Math.abs(n);
    const whole = frac[1] ? Math.trunc(a) : 0;
    const rest = a - whole;
    let best = { p: 0, q: 1, err: rest };
    const fixed = /^\d+$/.test(frac[3]) ? Number(frac[3]) : 0;
    const maxQ = fixed || Math.pow(10, frac[3].length) - 1;
    for (let q = fixed || 1; q <= maxQ; q++) {
      const p = Math.round(rest * q);
      if (Math.abs(rest - p / q) < best.err - 1e-12) best = { p, q, err: Math.abs(rest - p / q) };
      if (fixed) break;
    }
    if (best.p === best.q) return String(whole + 1);
    if (best.p === 0) return frac[1] ? String(whole) : "0";
    return `${frac[1] && whole ? `${whole} ` : ""}${best.p}/${best.q}`;
  }
  const toks: NumTok[] = [];
  let pct = 0;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (ch === '"') {
      const j = code.indexOf('"', i + 1);
      toks.push({ t: "lit", s: code.slice(i + 1, j < 0 ? code.length : j) });
      i = j < 0 ? code.length : j;
      continue;
    }
    if (ch === "\\") { toks.push({ t: "lit", s: code[i + 1] ?? "" }); i++; continue; }
    if (ch === "[") {
      const j = code.indexOf("]", i);
      const tag = code.slice(i + 1, j < 0 ? code.length : j);
      // [$$-409] and [$€-x-euro] carry a currency symbol; colors and conditions show nothing.
      if (tag.startsWith("$")) toks.push({ t: "lit", s: tag.slice(1).split("-")[0] });
      i = j < 0 ? code.length : j;
      continue;
    }
    if (ch === "_") { toks.push({ t: "lit", s: " " }); i++; continue; }
    if (ch === "*") { i++; continue; }
    if (ch === "0" || ch === "#" || ch === "?") { toks.push({ t: "ph", ch }); continue; }
    if (ch === ".") { toks.push({ t: "dot" }); continue; }
    if (ch === ",") { toks.push({ t: "comma" }); continue; }
    if (ch === "%") { pct++; toks.push({ t: "lit", s: "%" }); continue; }
    if ((ch === "E" || ch === "e") && (code[i + 1] === "+" || code[i + 1] === "-")) {
      const m = /^[Ee][+-]([0#]+)/.exec(code.slice(i));
      const expDigits = m ? m[1].length : 2;
      const dot = toks.findIndex((t) => t.t === "dot");
      const fd = dot < 0 ? 0 : toks.slice(dot + 1).filter((t) => t.t === "ph").length;
      const [mStr, eStr] = Math.abs(n).toExponential(fd).split("e");
      const e = Number(eStr);
      const pre = toks.slice(0, Math.max(0, toks.findIndex((t) => t.t === "ph"))).map((t) => (t.t === "lit" ? t.s : "")).join("");
      return `${pre}${mStr}E${e < 0 ? "-" : "+"}${String(Math.abs(e)).padStart(expDigits, "0")}`;
    }
    toks.push({ t: "lit", s: ch });
  }
  let v = Math.abs(n) * Math.pow(100, pct);
  const first = toks.findIndex((t) => t.t === "ph");
  if (first < 0) return toks.map((t) => (t.t === "lit" ? t.s : t.t === "dot" ? "." : t.t === "comma" ? "," : "")).join("");
  let last = toks.length - 1;
  while (last > first && toks[last].t !== "ph") last--;
  // Commas right after the last digit placeholder divide by 1,000 each.
  let k = last + 1;
  while (k < toks.length && toks[k].t === "comma") { v /= 1000; k++; }
  const region = toks.slice(first, last + 1);
  const dotAt = region.findIndex((t) => t.t === "dot");
  const intPart = dotAt < 0 ? region : region.slice(0, dotAt);
  const fracPart = dotAt < 0 ? [] : region.slice(dotAt + 1);
  const fracPh = fracPart.filter((t): t is { t: "ph"; ch: string } => t.t === "ph");
  const intPh = intPart.filter((t): t is { t: "ph"; ch: string } => t.t === "ph");
  const thousands = intPart.some((t) => t.t === "comma");
  const rounded = Number(v.toFixed(fracPh.length));
  let intStr = String(Math.floor(rounded));
  let fracStr = fracPh.length ? rounded.toFixed(fracPh.length).split(".")[1] ?? "" : "";
  // Trailing # drop zeros, ? pad with spaces, 0 keep them.
  for (let i = fracPh.length - 1; i >= 0 && fracStr[i] === "0" && fracPh[i].ch !== "0"; i--) fracStr = fracStr.slice(0, i) + (fracPh[i].ch === "?" ? " " : "") + fracStr.slice(i + 1);
  const minInt = intPh.filter((t) => t.ch === "0").length;
  if (intStr === "0" && minInt === 0) intStr = "";
  intStr = intStr.padStart(minInt, "0");
  const hasInnerLit = intPart.some((t) => t.t === "lit");
  let body: string;
  if (hasInnerLit) {
    // Digit placement (phone numbers, IDs): fill the placeholders from the right.
    const digits = intStr.split("");
    const outParts: string[] = [];
    for (let i = intPart.length - 1; i >= 0; i--) {
      const t = intPart[i];
      if (t.t === "ph") outParts.unshift(digits.length ? digits.pop()! : t.ch === "0" ? "0" : t.ch === "?" ? " " : "");
      else if (t.t === "lit") outParts.unshift(t.s);
      else if (t.t === "comma") outParts.unshift(",");
    }
    body = digits.join("") + outParts.join("");
  } else {
    body = thousands ? intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : intStr;
  }
  if (dotAt >= 0) {
    const fracLits = fracPart.filter((t) => t.t === "lit").map((t) => (t as { s: string }).s).join("");
    body += (fracStr.trim() || fracPh.some((t) => t.ch === "0") || fracPh.length ? "." : "") + fracStr + fracLits;
  }
  const lit = (ts: NumTok[]) => ts.map((t) => (t.t === "lit" ? t.s : t.t === "dot" ? "." : "")).join("");
  return lit(toks.slice(0, first)) + body + lit(toks.slice(k));
}

/**
 * Apply an Excel custom number format code. Supports up to four sections
 * (positive;negative;zero;text), quoted text, \ escapes, [color] tags,
 * digit placeholders 0 # ?, thousands separators, %, scientific, and date
 * and time codes (yyyy, mmm, dd, h:mm AM/PM).
 */
export function formatCustom(v: number | string, code: string): string {
  const sections = splitSections(code);
  if (typeof v === "string") {
    const textSec = sections.length >= 4 ? sections[3] : sections.find((s) => s.includes("@"));
    if (!textSec) return v;
    return textSec.replace(/"([^"]*)"/g, "$1").replace(/\\(.)/g, "$1").replace(/\[[^\]]*\]/g, "").replace(/@/g, v);
  }
  let sec = sections[0];
  let neg = false;
  if (v < 0 && sections.length >= 2 && sections[1] !== "") sec = sections[1];
  else if (v < 0) neg = true;
  else if (v === 0 && sections.length >= 3 && sections[2] !== "") sec = sections[2];
  if (isDateSection(sec)) return formatDateCode(v, sec);
  const s = formatNumberCode(v < 0 && sections.length >= 2 && sections[1] !== "" ? -v : v, sec);
  return neg && /[1-9]/.test(s) ? `-${s}` : s;
}

/** The custom code Format Cells › Custom shows for a built-in format. */
export function builtinFormatCode(fmt?: CellFormat): string {
  const custom = (fmt as XCellFormat | undefined)?.custom;
  if (custom) return custom;
  const d = fmt?.decimals;
  const dec = (n: number) => (n > 0 ? `.${"0".repeat(n)}` : "");
  switch (fmt?.numFmt) {
    case "Number": return `0${dec(d ?? 2)}`;
    case "Comma": return `#,##0${dec(d ?? 2)}`;
    case "Currency": return `"$"#,##0${dec(d ?? 2)}`;
    case "Accounting": return `_("$"* #,##0${dec(d ?? 2)}_)`;
    case "Short Date": return "m/d/yyyy";
    case "Long Date": return "dddd, mmmm d, yyyy";
    case "Time": return "h:mm AM/PM";
    case "Percentage": return `0${dec(d ?? 0)}%`;
    case "Scientific": return `0${dec(d ?? 2)}E+00`;
    case "Text": return "@";
    default: return "General";
  }
}

/** Normalize a formula for comparison. */
export function normalizeFormula(f: string, strictRefs = false): string {
  let s = f.trim().toUpperCase().replace(/\s+/g, "");
  if (!s.startsWith("=")) s = "=" + s;
  if (!strictRefs) s = s.replace(/\$/g, "");
  return s.replace(/;/g, ",");
}

/* ------------------------------------------------------------------ */
/* Fill / copy with relative references                                */
/* ------------------------------------------------------------------ */

export function shiftFormula(f: string, dc: number, dr: number): string {
  // Sheet-qualified references (Data!C7, 'Q3 Orders'!C7) shift too; a sheet
  // name that looks like a cell (Q1!B4) is left alone.
  return f.replace(/(^|[^A-Za-z0-9_'.[])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_(!])/g, (m, pre, d1, col, d2, row) => {
    const c = d1 ? colToNum(col) : colToNum(col) + dc;
    const r = d2 ? Number(row) : Number(row) + dr;
    if (c < 1 || r < 1) return `${pre}#REF!`;
    return `${pre}${d1}${numToCol(c)}${d2}${r}`;
  });
}

export function cellAt(sheet: ExcelSheet, ref: string): ExcelCell | undefined {
  return sheet.cells[ref];
}

/** Resolve "B2:B7", "$B$2:$B$7", "=Data!$B$2:$B$7" or "'Q1 Sales'!B2" to a sheet and rectangle. */
export function resolveRef(book: ExcelBook, sheet: ExcelSheet, ref: string): { sheet: ExcelSheet; rect: Rect } | null {
  let r = String(ref ?? "").trim().replace(/^=/, "");
  let sh: ExcelSheet | undefined = sheet;
  const bang = r.lastIndexOf("!");
  if (bang > 0) {
    sh = sheetByName(book, r.slice(0, bang).replace(/^'|'$/g, ""));
    r = r.slice(bang + 1);
  }
  const rect = parseRange(r.replace(/\$/g, ""));
  return sh && rect ? { sheet: sh, rect } : null;
}

/** The values in a reference, row by row (chart series, sparklines, list sources). */
export function rangeValues(book: ExcelBook, sheet: ExcelSheet, ref: string): Scalar[] {
  const t = resolveRef(book, sheet, ref);
  if (!t) return [];
  const out: Scalar[] = [];
  for (let r = t.rect.r1; r <= Math.min(t.rect.r2, t.rect.r1 + 500); r++)
    for (let c = t.rect.c1; c <= Math.min(t.rect.c2, t.rect.c1 + 60); c++) out.push(evaluateCell(book, t.sheet, refOf(c, r)));
  return out;
}

/* ------------------------------------------------------------------ */
/* PivotTables                                                         */
/* ------------------------------------------------------------------ */

/**
 * A PivotTable works from its own snapshot of the source (the pivot cache),
 * as in Excel: it shows what the source held when it was created or last
 * refreshed, so a change to the source shows up only after Refresh. The
 * source may name an Excel Table ("ExpenseData"), so rows added to the table
 * are picked up by the next refresh.
 *
 * Extra fields kept on `sheet.pivot` (see XPivot): `cache`, `groups` (date
 * grouping by Years/Quarters/Months/Days, per field), `sort` (per row or
 * column field: by "label" or by a value field's label), and per value field
 * `numFmt`/`decimals`/`custom` (Value Field Settings › Number Format),
 * `showAs` and `name`.
 */
export interface XPivotValue {
  field: string;
  fn: string;
  numFmt?: CellFormat["numFmt"];
  decimals?: number;
  custom?: string;
  /** Show Values As; "" is No Calculation. Falls back to the sheet's pvShowAs flag for the first value field. */
  showAs?: string;
  name?: string;
}

export interface PivotCache {
  head: string[];
  rows: Scalar[][];
  fmts: (CellFormat | null)[];
}

export type XPivot = Omit<ExcelPivot, "values"> & {
  values: XPivotValue[];
  cache?: PivotCache;
  groups?: Record<string, string[]>;
  sort?: Record<string, { by: string; desc: boolean }>;
};

/** Summary functions offered by Value Field Settings. */
export const PIVOT_FNS = ["Sum", "Count", "Average", "Max", "Min", "Product", "Count Numbers", "StdDev", "StdDevp", "Var", "Varp"];
/** Date grouping units, coarsest first. */
export const GROUP_UNITS = ["Years", "Quarters", "Months", "Days"];

const MON3 = MONTH_NAMES.map((m) => m.slice(0, 3));
const DAY3 = DAY_NAMES.map((d) => d.slice(0, 3));

/** "Sum of Amount"; a field added to Values twice is numbered, as in Excel ("Sum of Amount2"). */
export function pivotValueLabel(pv: XPivot, i: number): string {
  const v = pv.values[i];
  if (!v) return "";
  if (v.name) return v.name;
  const base = `${v.fn === "Count Numbers" ? "Count" : v.fn} of ${v.field}`;
  const dup = pv.values.slice(0, i).filter((x) => x.field === v.field).length;
  return dup ? `${base}${dup + 1}` : base;
}

/** The sheet and rectangle a PivotTable reads: a table by name, or a range. */
export function pivotSourceArea(book: ExcelBook, pv: { source: { sheet: string; range: string } }): { sheet: ExcelSheet; rect: Rect } | null {
  let rng = String(pv.source?.range ?? "").trim().replace(/^=/, "");
  let sheetName = pv.source?.sheet;
  const bang = rng.lastIndexOf("!");
  if (bang > 0) {
    sheetName = rng.slice(0, bang).replace(/^'|'$/g, "");
    rng = rng.slice(bang + 1);
  }
  const table = findTable(book, rng);
  if (table) return table;
  const rect = parseRange(rng.replace(/\$/g, ""));
  const sheet = sheetName ? sheetByName(book, sheetName) : undefined;
  if (!rect || !sheet) return null;
  // Whole columns stop at the last used row.
  const last = Object.keys(sheet.cells).reduce((m, ref) => Math.max(m, parseRef(ref)?.r ?? 0), rect.r1);
  return { sheet, rect: { ...rect, r2: Math.min(rect.r2, last) } };
}

/** Read the source now: what Refresh stores in the pivot cache. */
export function pivotSnapshot(book: ExcelBook, pv: { source: { sheet: string; range: string } }): PivotCache | null {
  const area = pivotSourceArea(book, pv);
  if (!area) return null;
  const { sheet: src, rect } = area;
  const c2 = Math.min(rect.c2, rect.c1 + 60);
  const r2 = Math.min(rect.r2, rect.r1 + 2000);
  const head: string[] = [];
  for (let c = rect.c1; c <= c2; c++) head.push(String(src.cells[refOf(c, rect.r1)]?.v ?? numToCol(c)));
  const rows: Scalar[][] = [];
  for (let r = rect.r1 + 1; r <= r2; r++) {
    const row = head.map((_, i) => evaluateCell(book, src, refOf(rect.c1 + i, r)));
    if (row.every((x) => x === null || x === "")) continue;
    rows.push(row);
  }
  const fmts = head.map((_, i) => {
    const f = src.cells[refOf(rect.c1 + i, rect.r1 + 1)]?.fmt;
    return f ? { ...f } : null;
  });
  return { head, rows, fmts };
}

export interface PivotRecords {
  head: string[];
  rows: Record<string, Scalar>[];
  fmtOf(field: string): CellFormat | undefined;
  isNumeric(field: string): boolean;
  isDate(field: string): boolean;
}

const SNAP_BUSY = new Set<object>();

/** The records a PivotTable summarizes: its cache, or the live source when it has none yet. */
export function pivotRecords(book: ExcelBook, pv: XPivot): PivotRecords | null {
  let cache = pv.cache;
  if (!cache) {
    if (SNAP_BUSY.has(pv)) return null;
    SNAP_BUSY.add(pv);
    try {
      cache = pivotSnapshot(book, pv) ?? undefined;
    } finally {
      SNAP_BUSY.delete(pv);
    }
  }
  if (!cache) return null;
  const c = cache;
  const idx = (f: string) => c.head.findIndex((h) => h.toLowerCase() === f.toLowerCase());
  const fmtOf = (f: string) => c.fmts[idx(f)] ?? undefined;
  return {
    head: c.head,
    rows: c.rows.map((r) => Object.fromEntries(c.head.map((h, i) => [h, r[i] ?? null]))),
    fmtOf,
    isNumeric: (f) => {
      const i = idx(f);
      const first = c.rows.map((r) => r[i]).find((v) => v !== null && v !== "" && v !== undefined);
      return typeof first === "number";
    },
    isDate: (f) => {
      const fm = fmtOf(f) as XCellFormat | undefined;
      return Boolean(fm && (fm.numFmt === "Short Date" || fm.numFmt === "Long Date" || (fm.custom && isDateSection(fm.custom))));
    },
  };
}

interface PLevel {
  /** Name shown in the report and used by GETPIVOTDATA ("Years" for a derived level). */
  name: string;
  field: string;
  unit?: string;
}

function levelsFor(pv: XPivot, f: string): PLevel[] {
  const g = pv.groups?.[f];
  if (!g?.length) return [{ name: f, field: f }];
  const units = GROUP_UNITS.filter((u) => g.includes(u));
  return units.map((u, i) => ({ name: i === units.length - 1 ? f : u, field: f, unit: u }));
}

/** Field list entries: the source columns plus Years/Quarters fields made by grouping a date. */
export function pivotFieldList(book: ExcelBook, pv: XPivot): { name: string; derived?: boolean }[] {
  const recs = pivotRecords(book, pv);
  if (!recs) return [];
  const out: { name: string; derived?: boolean }[] = [];
  for (const h of recs.head) {
    out.push({ name: h });
    for (const lv of levelsFor(pv, h)) if (lv.name !== h) out.push({ name: lv.name, derived: true });
  }
  return out;
}

interface PKey {
  id: string;
  v: Scalar;
  order?: number;
  fmt?: CellFormat;
}

function numberFormatOnly(f?: CellFormat | null): CellFormat | undefined {
  if (!f) return undefined;
  const out: XCellFormat = {};
  if (f.numFmt) out.numFmt = f.numFmt;
  if (f.decimals !== undefined) out.decimals = f.decimals;
  if ((f as XCellFormat).custom) out.custom = (f as XCellFormat).custom;
  return Object.keys(out).length ? out : undefined;
}

function pivotKey(rec: Record<string, Scalar>, lv: PLevel, recs: PivotRecords): PKey {
  const raw = rec[lv.field] ?? null;
  if (raw === null || raw === "") return { id: "(blank)", v: "(blank)", order: Number.MAX_SAFE_INTEGER };
  if (lv.unit && typeof raw === "number") {
    const d = new Date(Date.UTC(1899, 11, 30) + Math.floor(raw) * 86400000);
    const y = d.getUTCFullYear(), m = d.getUTCMonth(), day = d.getUTCDate();
    const q = Math.floor(m / 3) + 1;
    switch (lv.unit) {
      case "Years": return { id: String(y), v: String(y), order: y };
      case "Quarters": return { id: `Qtr${q}`, v: `Qtr${q}`, order: q };
      case "Months": return { id: MON3[m], v: MON3[m], order: m };
      default: return { id: `${day}-${MON3[m]}`, v: `${day}-${MON3[m]}`, order: m * 32 + day };
    }
  }
  return { id: String(raw), v: raw, fmt: typeof raw === "number" ? numberFormatOnly(recs.fmtOf(lv.field)) : undefined };
}

/** Position of a month or weekday name in Excel's built-in custom lists, or -1. */
function calendarIndex(id: string): number {
  const s = id.toLowerCase();
  for (const list of [MONTH_NAMES, MON3]) {
    const i = list.findIndex((m) => m.toLowerCase() === s);
    if (i >= 0) return i;
  }
  for (const list of [DAY_NAMES, DAY3]) {
    const i = list.findIndex((m) => m.toLowerCase() === s);
    if (i >= 0) return 100 + i;
  }
  return -1;
}

/** Item order: grouped units by calendar, months and weekdays by calendar (custom lists), numbers, then text A to Z. */
function sortPivotKeys(keys: PKey[]): PKey[] {
  const real = keys.filter((k) => k.id !== "(blank)");
  const calendar = real.length > 0 && real.every((k) => calendarIndex(k.id) >= 0);
  return keys.slice().sort((a, b) => {
    if (a.id === "(blank)" || b.id === "(blank)") return a.id === b.id ? 0 : a.id === "(blank)" ? 1 : -1;
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    if (calendar) return calendarIndex(a.id) - calendarIndex(b.id);
    if (typeof a.v === "number" && typeof b.v === "number") return a.v - b.v;
    if (typeof a.v === "number") return -1;
    if (typeof b.v === "number") return 1;
    return a.id.localeCompare(b.id, undefined, { sensitivity: "base", numeric: true });
  });
}

function pivotAggregate(vals: Scalar[], fn: string): number | null {
  const n = vals.filter((x): x is number => typeof x === "number");
  const sum = () => n.reduce((a, b) => a + b, 0);
  switch (fn) {
    case "Count": return vals.filter((x) => x !== null && x !== "").length;
    case "Count Numbers": return n.length;
    case "Average": return n.length ? sum() / n.length : null;
    case "Max": return n.length ? Math.max(...n) : null;
    case "Min": return n.length ? Math.min(...n) : null;
    case "Product": return n.length ? n.reduce((a, b) => a * b, 1) : null;
    case "StdDev": return n.length > 1 ? stdev(n, true) : null;
    case "StdDevp": return n.length ? stdev(n, false) : null;
    case "Var": return n.length > 1 ? variance(n, true) : null;
    case "Varp": return n.length ? variance(n, false) : null;
    default: return sum();
  }
}

/** One cell of a PivotTable report. */
export interface PivotCell {
  v: Scalar;
  fmt?: CellFormat;
  kind: "filter" | "header" | "rowItem" | "colItem" | "value" | "grand";
  /** Value field index for value, grand and value-header cells. */
  vi?: number;
  rowPath?: string[];
  colKey?: string | null;
  /** Row or column field of an item cell (or of a filter cell). */
  field?: string;
  depth?: number;
}

export interface PivotLayout {
  cells: Record<string, PivotCell>;
  rect: Rect | null;
  /** What a PivotChart plots: one category per innermost row item, one series per column item (or value field). */
  chart: { cats: string[]; series: { name: string; vals: number[] }[] };
  rowFields: string[];
  colFields: string[];
}

const PIVOT_HDR: CellFormat = { bold: true, fill: "#DDEBF7" };

function pivotFlag(book: ExcelBook, sheet: ExcelSheet, field: string): string[] | null {
  const v = book.flags?.[`pvf:${sheet.name}:${field}`];
  return v ? String(v).split("|") : null;
}

interface PRec {
  r: Record<string, Scalar>;
  col: string;
  rk: PKey[];
}

interface PNode {
  key: PKey;
  path: string[];
  items: PRec[];
  children: PNode[];
  depth: number;
}

/** Lay out a PivotTable report (compact form, subtotals at the top of each group, grand totals). */
export function computePivot(book: ExcelBook, sheet: ExcelSheet): PivotLayout {
  const empty: PivotLayout = { cells: {}, rect: null, chart: { cats: [], series: [] }, rowFields: [], colFields: [] };
  const pv = sheet.pivot as unknown as XPivot | null | undefined;
  if (!pv) return empty;
  const recs = pivotRecords(book, pv);
  if (!recs) return empty;
  const out: Record<string, PivotCell> = {};
  const put = (c: number, r: number, cell: PivotCell) => {
    if (c >= 1 && r >= 1) out[refOf(c, r)] = cell;
  };
  // Report filters and slicers narrow the records first.
  const kept = recs.rows.filter((r) =>
    recs.head.every((h) => {
      const items = pivotFlag(book, sheet, h);
      return !items || items.some((it) => it.toLowerCase() === String(r[h] ?? "(blank)").toLowerCase());
    }),
  );
  const at = parseRef(pv.at ?? "A3") ?? { c: 1, r: 3 };
  pv.filters.forEach((f, i) => {
    const r = at.r - 2 - (pv.filters.length - 1 - i);
    const items = pivotFlag(book, sheet, f);
    put(at.c, r, { v: f, fmt: { bold: true }, kind: "filter", field: f });
    put(at.c + 1, r, { v: !items ? "(All)" : items.length === 1 ? items[0] : "(Multiple Items)", kind: "filter", field: f });
  });
  const rowLv = pv.rows.flatMap((f) => levelsFor(pv, f));
  const colLv = pv.columns.flatMap((f) => levelsFor(pv, f));
  const vals = pv.values ?? [];
  const nv = vals.length;
  const labels = vals.map((_, i) => pivotValueLabel(pv, i));
  const finish = (chart: PivotLayout["chart"]): PivotLayout => {
    let rect: Rect | null = null;
    for (const ref of Object.keys(out)) {
      const p = parseRef(ref)!;
      rect = rect ? { c1: Math.min(rect.c1, p.c), r1: Math.min(rect.r1, p.r), c2: Math.max(rect.c2, p.c), r2: Math.max(rect.r2, p.r) } : { c1: p.c, r1: p.r, c2: p.c, r2: p.r };
    }
    return { cells: out, rect, chart, rowFields: rowLv.map((l) => l.name), colFields: colLv.map((l) => l.name) };
  };
  if (!rowLv.length && !colLv.length && !nv) return finish({ cats: [], series: [] });

  const all: PRec[] = kept.map((r) => ({
    r,
    col: colLv.map((l) => pivotKey(r, l, recs).id).join("\u0001"),
    rk: rowLv.map((l) => pivotKey(r, l, recs)),
  }));
  const aggOf = (items: PRec[], i: number): number | null => (items.length && vals[i] ? pivotAggregate(items.map((x) => x.r[vals[i].field] ?? null), vals[i].fn) : null);
  const sortSpec = (name: string) => pv.sort?.[name];
  const byValue = (list: { key: PKey; items: PRec[] }[], spec: { by: string; desc: boolean }) => {
    const vi = vals.findIndex((_, i) => labels[i].toLowerCase() === spec.by.toLowerCase());
    if (vi < 0) return;
    list.sort((a, b) => {
      const x = aggOf(a.items, vi) ?? Number.NEGATIVE_INFINITY, y = aggOf(b.items, vi) ?? Number.NEGATIVE_INFINITY;
      return spec.desc ? y - x : x - y;
    });
  };

  // Column items (several column fields combine into one item per combination).
  type CK = { id: string; label: Scalar; fmt?: CellFormat };
  let colKeys: CK[] = [];
  if (colLv.length) {
    const seen = new Map<string, { id: string; key: PKey; parts: PKey[]; items: PRec[] }>();
    for (const x of all) {
      const parts = colLv.map((l) => pivotKey(x.r, l, recs));
      const g = seen.get(x.col);
      if (g) g.items.push(x);
      else seen.set(x.col, { id: x.col, key: parts[parts.length - 1], parts, items: [x] });
    }
    let groups = Array.from(seen.values());
    // Sort by each level in turn (outer level first).
    for (let li = colLv.length - 1; li >= 0; li--) {
      const order = sortPivotKeys(groups.map((g) => g.parts[li])).map((k) => k.id);
      const uniq = Array.from(new Set(order));
      groups = groups.slice().sort((a, b) => uniq.indexOf(a.parts[li].id) - uniq.indexOf(b.parts[li].id));
    }
    const spec = sortSpec(colLv[colLv.length - 1].name);
    if (spec?.by === "label" && spec.desc) groups.reverse();
    else if (spec && spec.by !== "label") byValue(groups, spec);
    colKeys = groups.map((g) => ({
      id: g.id,
      label: g.parts.length === 1 ? g.parts[0].v : g.parts.map((p) => p.id).join(" "),
      fmt: g.parts.length === 1 ? g.parts[0].fmt : undefined,
    }));
  }

  // Row items, as a tree.
  const build = (items: PRec[], depth: number, path: string[]): PNode[] => {
    if (depth >= rowLv.length) return [];
    const groups = new Map<string, { key: PKey; items: PRec[] }>();
    for (const it of items) {
      const k = it.rk[depth];
      const g = groups.get(k.id);
      if (g) g.items.push(it);
      else groups.set(k.id, { key: k, items: [it] });
    }
    const order = sortPivotKeys(Array.from(groups.values()).map((g) => g.key)).map((k) => k.id);
    const list = order.map((id) => groups.get(id)!);
    const spec = sortSpec(rowLv[depth].name);
    if (spec?.by === "label" && spec.desc) list.reverse();
    else if (spec && spec.by !== "label") byValue(list, spec);
    return list.map((g) => ({ key: g.key, path: [...path, g.key.id], items: g.items, depth, children: build(g.items, depth + 1, [...path, g.key.id]) }));
  };
  const tree = build(all, 0, []);

  // Value columns: each column item × value field, then the grand total columns.
  type VCol = { ck: CK | null; vi: number; grand: boolean };
  const vcols: VCol[] = [];
  if (colLv.length) {
    for (const ck of colKeys) for (let i = 0; i < Math.max(nv, 1); i++) vcols.push({ ck, vi: nv ? i : -1, grand: false });
    for (let i = 0; i < Math.max(nv, 1); i++) vcols.push({ ck: null, vi: nv ? i : -1, grand: true });
  } else for (let i = 0; i < nv; i++) vcols.push({ ck: null, vi: i, grand: false });

  const flagShowAs = String(book.flags?.[`pvShowAs:${sheet.name}`] ?? "");
  const showAsOf = (i: number) => (vals[i]?.showAs !== undefined ? vals[i].showAs! : i === 0 ? flagShowAs : "") || "";
  const valueFmt = (i: number): CellFormat | undefined => {
    const v = vals[i];
    if (!v) return undefined;
    if (showAsOf(i).startsWith("%")) return { numFmt: "Percentage", decimals: 2 };
    if (v.custom) return { custom: v.custom } as XCellFormat;
    if (v.numFmt) return v.decimals === undefined ? { numFmt: v.numFmt } : { numFmt: v.numFmt, decimals: v.decimals };
    if (v.fn === "Count" || v.fn === "Count Numbers") return undefined;
    return numberFormatOnly(recs.fmtOf(v.field));
  };
  const itemsIn = (items: PRec[], ck: CK | null) => (ck ? items.filter((x) => x.col === ck.id) : items);
  const running = new Map<string, number>();
  const show = (items: PRec[], i: number, node: PNode | null, ck: CK | null, grand: boolean): Scalar => {
    const raw = aggOf(itemsIn(items, ck), i);
    if (raw === null) return null;
    const sa = showAsOf(i);
    if (!sa) return raw;
    if (sa === "% of Grand Total") {
      const g = aggOf(all, i);
      return g ? raw / g : 0;
    }
    if (sa === "% of Column Total") {
      const t = aggOf(itemsIn(all, ck), i);
      return t ? raw / t : 0;
    }
    if (sa === "% of Row Total") {
      const t = aggOf(node ? node.items : all, i);
      return t ? raw / t : 0;
    }
    if (sa === "Running Total In") {
      if (grand || !node) return null;
      const k = `${i}|${ck?.id ?? ""}|${node.depth}|${node.path.slice(0, -1).join("\u0001")}`;
      const t = (running.get(k) ?? 0) + raw;
      running.set(k, t);
      return t;
    }
    return raw;
  };

  const hasRows = rowLv.length > 0;
  const c0 = at.c;
  let r = at.r;
  if (colLv.length) {
    // The report starts at its location: the value name and Column Labels first, then the item row.
    put(c0, r, { v: nv === 1 ? labels[0] : "", fmt: PIVOT_HDR, kind: "header", vi: nv === 1 ? 0 : undefined });
    put(c0 + 1, r, { v: "Column Labels", fmt: PIVOT_HDR, kind: "header" });
    r += 1;
    if (nv <= 1) {
      put(c0, r, { v: hasRows ? "Row Labels" : "", fmt: PIVOT_HDR, kind: "header" });
      colKeys.forEach((ck, j) => put(c0 + 1 + j, r, { v: ck.label, fmt: { ...PIVOT_HDR, ...(ck.fmt ?? {}) }, kind: "colItem", colKey: ck.id, field: colLv[colLv.length - 1].name }));
      put(c0 + 1 + colKeys.length, r, { v: "Grand Total", fmt: PIVOT_HDR, kind: "header" });
      r += 1;
    } else {
      vcols.forEach((vc, j) => put(c0 + 1 + j, r, { v: !vc.grand && j % nv === 0 ? vc.ck!.label : "", fmt: { ...PIVOT_HDR, ...(vc.ck?.fmt ?? {}) }, kind: vc.grand ? "header" : "colItem", colKey: vc.ck?.id ?? null, field: colLv[colLv.length - 1].name }));
      put(c0, r, { v: "", fmt: PIVOT_HDR, kind: "header" });
      r += 1;
      put(c0, r, { v: hasRows ? "Row Labels" : "", fmt: PIVOT_HDR, kind: "header" });
      vcols.forEach((vc, j) => put(c0 + 1 + j, r, { v: vc.grand ? `Total ${labels[vc.vi]}` : labels[vc.vi], fmt: PIVOT_HDR, kind: "header", vi: vc.vi }));
      r += 1;
    }
  } else if (hasRows) {
    put(c0, r, { v: "Row Labels", fmt: PIVOT_HDR, kind: "header" });
    vcols.forEach((vc, j) => put(c0 + 1 + j, r, { v: labels[vc.vi], fmt: PIVOT_HDR, kind: "header", vi: vc.vi }));
    r += 1;
  } else {
    vcols.forEach((vc, j) => put(c0 + j, r, { v: labels[vc.vi], fmt: PIVOT_HDR, kind: "header", vi: vc.vi }));
    r += 1;
  }
  const firstVal = hasRows || colLv.length ? c0 + 1 : c0;

  const leaves: PNode[] = [];
  const rowOf = new Map<PNode, number>();
  const emit = (nodes: PNode[]) => {
    for (const nd of nodes) {
      const parent = nd.children.length > 0;
      put(c0, r, { v: nd.key.v, fmt: { ...(nd.key.fmt ?? {}), ...(parent ? { bold: true } : {}), ...(nd.depth ? { indent: nd.depth } : {}) }, kind: "rowItem", rowPath: nd.path, field: rowLv[nd.depth].name, depth: nd.depth });
      vcols.forEach((vc, j) => {
        if (vc.vi < 0) return;
        put(firstVal + j, r, { v: show(nd.items, vc.vi, nd, vc.ck, vc.grand), fmt: { ...(valueFmt(vc.vi) ?? {}), ...(parent ? { bold: true } : {}) }, kind: "value", vi: vc.vi, rowPath: nd.path, colKey: vc.ck?.id ?? null });
      });
      rowOf.set(nd, r);
      r++;
      if (parent) emit(nd.children);
      else leaves.push(nd);
    }
  };
  let totalsRow = r;
  if (hasRows) {
    emit(tree);
    totalsRow = r;
    put(c0, r, { v: "Grand Total", fmt: { bold: true, border: "top" }, kind: "grand" });
    vcols.forEach((vc, j) => {
      if (vc.vi < 0) return;
      put(firstVal + j, r, { v: show(all, vc.vi, null, vc.ck, true), fmt: { ...(valueFmt(vc.vi) ?? {}), bold: true, border: "top" }, kind: "grand", vi: vc.vi, colKey: vc.ck?.id ?? null });
    });
  } else if (nv) {
    if (colLv.length && nv === 1) put(c0, r, { v: labels[0], fmt: { bold: true }, kind: "header", vi: 0 });
    vcols.forEach((vc, j) => {
      if (vc.vi < 0) return;
      put(firstVal + j, r, { v: show(all, vc.vi, null, vc.ck, vc.grand), fmt: valueFmt(vc.vi), kind: vc.grand ? "grand" : "value", vi: vc.vi, colKey: vc.ck?.id ?? null });
    });
  }

  // What a PivotChart plots.
  const label = (k: PKey) => (typeof k.v === "number" && k.fmt ? formatValue(k.v, k.fmt) : String(k.v ?? ""));
  const numAt = (c: number, rr: number) => {
    const x = out[refOf(c, rr)]?.v;
    return typeof x === "number" ? x : 0;
  };
  const plot = vcols.map((vc, j) => ({ vc, x: firstVal + j })).filter(({ vc }) => !vc.grand && vc.vi >= 0);
  const chart: PivotLayout["chart"] = {
    cats: hasRows ? leaves.map((nd) => (nd.depth ? [...nd.path.slice(0, -1), label(nd.key)].join(" ") : label(nd.key))) : ["Total"],
    series: plot.map(({ vc, x }) => ({
      name: vc.ck ? (nv > 1 ? `${typeof vc.ck.label === "number" && vc.ck.fmt ? formatValue(vc.ck.label, vc.ck.fmt) : String(vc.ck.label)} - ${labels[vc.vi]}` : typeof vc.ck.label === "number" && vc.ck.fmt ? formatValue(vc.ck.label, vc.ck.fmt) : String(vc.ck.label)) : labels[vc.vi],
      vals: hasRows ? leaves.map((nd) => numAt(x, rowOf.get(nd)!)) : [numAt(x, totalsRow)],
    })),
  };
  return finish(chart);
}

const PIVOT_MEMO = new WeakMap<object, { sig: string; cache: unknown; src: unknown; lay: PivotLayout }>();
const LAYOUT_BUSY = new Set<object>();

function pivotSig(book: ExcelBook, sheet: ExcelSheet): string {
  const pv = sheet.pivot as unknown as XPivot;
  const flags = Object.entries(book.flags ?? {}).filter(([k]) => k.startsWith(`pvf:${sheet.name}:`) || k === `pvShowAs:${sheet.name}`);
  return JSON.stringify([pv.rows, pv.columns, pv.values, pv.filters, pv.at, pv.groups ?? null, pv.sort ?? null, pv.source, flags]);
}

/** The report a sheet's PivotTable shows (memoized per PivotTable and cache). */
export function pivotLayoutOf(book: ExcelBook, sheet: ExcelSheet): PivotLayout | null {
  const pv = sheet.pivot as unknown as XPivot | null | undefined;
  if (!pv) return null;
  const sig = pivotSig(book, sheet);
  const src = pv.cache ? null : pivotSourceArea(book, pv)?.sheet ?? null;
  const memo = PIVOT_MEMO.get(pv);
  if (memo && memo.sig === sig && memo.cache === pv.cache && memo.src === src && (pv.cache || src)) return memo.lay;
  if (LAYOUT_BUSY.has(pv)) return null;
  LAYOUT_BUSY.add(pv);
  try {
    const lay = computePivot(book, sheet);
    PIVOT_MEMO.set(pv, { sig, cache: pv.cache, src, lay });
    return lay;
  } finally {
    LAYOUT_BUSY.delete(pv);
  }
}

/**
 * GETPIVOTDATA: the value a PivotTable shows for a value field ("Amount" or
 * "Sum of Amount") and optional field/item pairs ("Department", "Medical").
 * Returns "#REF!" when the field or item is not in the report.
 */
export function getPivotData(book: ExcelBook, sheet: ExcelSheet, dataField: string, pairs: [string, Scalar][]): Scalar {
  const pv = sheet.pivot as unknown as XPivot | null | undefined;
  if (!pv) return "#REF!";
  const recs = pivotRecords(book, pv);
  if (!recs) return "#REF!";
  const want = dataField.trim().toLowerCase();
  const vi = pv.values.findIndex((v, i) => pivotValueLabel(pv, i).toLowerCase() === want || v.field.toLowerCase() === want);
  if (vi < 0) return "#REF!";
  const val = pv.values[vi];
  const levels = [...pv.rows, ...pv.columns].flatMap((f) => levelsFor(pv, f));
  const rowNames = new Set(pv.rows.flatMap((f) => levelsFor(pv, f)).map((l) => l.name.toLowerCase()));
  const kept = recs.rows.filter((r) =>
    recs.head.every((h) => {
      const items = pivotFlag(book, sheet, h);
      return !items || items.some((it) => it.toLowerCase() === String(r[h] ?? "(blank)").toLowerCase());
    }),
  );
  const matchers: { lv: PLevel; item: Scalar }[] = [];
  for (const [field, item] of pairs) {
    const lv = levels.find((l) => l.name.toLowerCase() === field.trim().toLowerCase());
    if (!lv) return "#REF!";
    matchers.push({ lv, item });
  }
  const hit = (r: Record<string, Scalar>, ms: { lv: PLevel; item: Scalar }[]) =>
    ms.every(({ lv, item }) => {
      const k = pivotKey(r, lv, recs);
      if (typeof item === "number") return k.v === item || Number(k.id) === item || (typeof k.v === "string" && k.v === String(item));
      const s = String(item ?? "").toLowerCase();
      return k.id.toLowerCase() === s || (typeof k.v === "number" && k.fmt !== undefined && formatValue(k.v, k.fmt).toLowerCase() === s);
    });
  const items = kept.filter((r) => hit(r, matchers));
  if (matchers.length && !items.length) return "#REF!";
  const agg = (rs: Record<string, Scalar>[]) => (rs.length ? pivotAggregate(rs.map((x) => x[val.field] ?? null), val.fn) : null);
  const raw = agg(items);
  if (raw === null) return "#REF!";
  const flagShowAs = String(book.flags?.[`pvShowAs:${sheet.name}`] ?? "");
  const sa = (val.showAs !== undefined ? val.showAs : vi === 0 ? flagShowAs : "") || "";
  if (sa === "% of Grand Total") {
    const g = agg(kept);
    return g ? raw / g : 0;
  }
  if (sa === "% of Column Total" || sa === "% of Row Total") {
    const useRows = sa === "% of Row Total";
    const base = kept.filter((r) => hit(r, matchers.filter((m) => rowNames.has(m.lv.name.toLowerCase()) === useRows)));
    const t = agg(base);
    return t ? raw / t : 0;
  }
  return raw;
}

/**
 * Give every PivotTable that has no cache yet a snapshot of its source. The
 * Excel engine calls this before and after each command, so a PivotTable
 * keeps showing the data it was built from until Refresh.
 */
export function withPivotCaches(book: ExcelBook): ExcelBook {
  if (!book.sheets.some((s) => s.pivot && !(s.pivot as unknown as XPivot).cache)) return book;
  const next: ExcelBook = { ...book, sheets: book.sheets.map((s) => (s.pivot && !(s.pivot as unknown as XPivot).cache ? { ...s, pivot: { ...s.pivot } } : s)) };
  for (const s of next.sheets) {
    const pv = s.pivot as unknown as XPivot | null | undefined;
    if (pv && !pv.cache) pv.cache = pivotSnapshot(next, pv) ?? { head: [], rows: [], fmts: [] };
  }
  return next;
}

/** Refresh (PivotTable Analyze › Refresh, Data › Refresh All): re-read the source of every cached PivotTable. Mutates `book`. */
export function refreshPivots(book: ExcelBook, only?: ExcelSheet): number {
  let n = 0;
  for (const s of book.sheets) {
    const pv = s.pivot as unknown as XPivot | null | undefined;
    if (!pv || !pv.cache || (only && s !== only)) continue;
    pv.cache = pivotSnapshot(book, pv) ?? pv.cache;
    n++;
  }
  return n;
}
