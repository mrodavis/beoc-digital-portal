import type { ExcelCell, ExcelSheet, ExcelBook, CellFormat } from "@/types/sim";

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
    // Structured references: Table[Column], [@Column], Table[@[Column Name]]
    const srefM = /^([A-Za-z_][A-Za-z0-9_.]*)?\[(@?)(?:\[([^\]]+)\]|([^[\]]+))\]/.exec(src.slice(i));
    if (srefM && (srefM[1] || srefM[2])) {
      out.push({ t: "sref", table: srefM[1], col: (srefM[3] ?? srefM[4]).trim(), row: srefM[2] === "@" });
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
    const fn = ({ 1: "AVERAGE", 2: "COUNT", 3: "COUNTA", 4: "MAX", 5: "MIN", 9: "SUM" } as Record<number, string>)[code] ?? "SUM";
    return FNS[fn](rest, [], undefined as unknown as Ctx);
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
  const fnName = ({ 1: "AVERAGE", 2: "COUNT", 3: "COUNTA", 4: "MAX", 5: "MIN", 6: "PRODUCT", 9: "SUM" } as Record<number, string>)[code % 100];
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
