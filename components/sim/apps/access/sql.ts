/**
 * A small Access SQL and expression engine.
 *
 * - Expressions: Access syntax ([Field], "text", 'text', #1/1/2026#, & + - * / \ ^ Mod,
 *   = <> < > <= >=, And Or Not Xor, Like with * ? # [..], Between, In, Is [Not] Null,
 *   and the common functions (Date, Year, Format, IIf, Nz, DCount, Left, ...).
 * - Criteria: the same grammar where a comparison may omit its left side
 *   (">=0", "Between 1 And 5", "\"NY\" Or \"NJ\"", "Is Null").
 * - Statements: SELECT [DISTINCT] [TOP n] ... [INTO t] FROM (INNER/LEFT/RIGHT JOIN) WHERE
 *   GROUP BY HAVING ORDER BY, TRANSFORM ... PIVOT, UPDATE ... SET, DELETE ... FROM,
 *   INSERT INTO ... SELECT / VALUES.
 *
 * The engine is pure: it reads tables through a DataSource and returns result
 * sets or a description of the change an action query would make.
 */

/* ------------------------------------------------------------------ */
/* Values and dates                                                    */
/* ------------------------------------------------------------------ */

export type DateV = { $d: number };
export type V = string | number | boolean | null | DateV;

export const isDate = (v: unknown): v is DateV => typeof v === "object" && v !== null && "$d" in (v as object);
const EPOCH = Date.UTC(1899, 11, 30);
export const serialOf = (y: number, m: number, d: number) => (Date.UTC(y, m - 1, d) - EPOCH) / 864e5;
export const TODAY = serialOf(2026, 10, 20);
export const NOW = TODAY + 9.5 / 24;

export function ymd(serial: number): { y: number; m: number; d: number; wd: number; h: number; n: number; s: number } {
  const day = Math.floor(serial + 1e-9);
  const dt = new Date(EPOCH + day * 864e5);
  let frac = serial - day;
  if (frac < 0) frac = 0;
  const secs = Math.round(frac * 86400);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate(), wd: dt.getUTCDay() + 1, h: Math.floor(secs / 3600), n: Math.floor((secs % 3600) / 60), s: secs % 60 };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function validYmd(y: number, m: number, d: number) {
  if (m < 1 || m > 12 || d < 1 || y < 100 || y > 9999) return false;
  const dim = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return d <= dim;
}

function fullYear(y: number) {
  if (y >= 100) return y;
  return y < 30 ? 2000 + y : 1900 + y;
}

function parseTime(s: string): number | null {
  const m = /^(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?\s*(am|pm|a|p)?$/i.exec(s.trim());
  if (!m) return null;
  let h = Number(m[1]);
  const n = Number(m[2] ?? 0), sec = Number(m[3] ?? 0);
  if (m[4]) {
    const pm = m[4].toLowerCase().startsWith("p");
    if (h === 12) h = pm ? 12 : 0;
    else if (pm) h += 12;
  }
  if (!m[2] && !m[4]) return null;
  if (h > 23 || n > 59 || sec > 59) return null;
  return (h * 3600 + n * 60 + sec) / 86400;
}

/** Parse the date formats Access accepts when typing into a Date/Time field. */
export function parseDateText(raw: string): number | null {
  const s = raw.trim().replace(/\s+/g, " ");
  if (!s) return null;
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}:\d{2}(?::\d{2})?))?$/.exec(s);
  if (m) {
    const y = +m[1], mo = +m[2], d = +m[3];
    if (!validYmd(y, mo, d)) return null;
    const t = m[4] ? parseTime(m[4]) : 0;
    return serialOf(y, mo, d) + (t ?? 0);
  }
  m = /^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})(?: (.+))?$/.exec(s);
  if (m) {
    const mo = +m[1], d = +m[2], y = fullYear(+m[3]);
    if (!validYmd(y, mo, d)) return null;
    let t = 0;
    if (m[4]) {
      const tt = parseTime(m[4]);
      if (tt === null) return null;
      t = tt;
    }
    return serialOf(y, mo, d) + t;
  }
  m = /^(\d{1,2})[/-](\d{1,2})$/.exec(s);
  if (m) {
    const mo = +m[1], d = +m[2];
    if (!validYmd(2026, mo, d)) return null;
    return serialOf(2026, mo, d);
  }
  const monIdx = (w: string) => MONTHS.findIndex((x) => x.toLowerCase().startsWith(w.toLowerCase().slice(0, 3)) && w.length >= 3 && x.toLowerCase().startsWith(w.toLowerCase()));
  m = /^([A-Za-z]+)\.? (\d{1,2}),? (\d{2,4})$/.exec(s);
  if (m) {
    const mi = monIdx(m[1]);
    if (mi < 0) return null;
    const y = fullYear(+m[3]), d = +m[2];
    if (!validYmd(y, mi + 1, d)) return null;
    return serialOf(y, mi + 1, d);
  }
  m = /^(\d{1,2})[- ]([A-Za-z]+)[- ,]+(\d{2,4})$/.exec(s);
  if (m) {
    const mi = monIdx(m[2]);
    if (mi < 0) return null;
    const y = fullYear(+m[3]), d = +m[1];
    if (!validYmd(y, mi + 1, d)) return null;
    return serialOf(y, mi + 1, d);
  }
  const t = parseTime(s);
  if (t !== null) return t;
  return null;
}

export function isoFromSerial(serial: number): string {
  const p = ymd(serial);
  const date = `${p.y}-${String(p.m).padStart(2, "0")}-${String(p.d).padStart(2, "0")}`;
  if (p.h || p.n || p.s) return `${date}T${String(p.h).padStart(2, "0")}:${String(p.n).padStart(2, "0")}${p.s ? `:${String(p.s).padStart(2, "0")}` : ""}`;
  return date;
}

export function serialFromIso(iso: string): number | null {
  return parseDateText(iso);
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

function pad(n: number, w = 2) {
  return String(n).padStart(w, "0");
}

export function formatDateSerial(serial: number, fmt?: string): string {
  const p = ymd(serial);
  const f = (fmt ?? "").trim();
  const hasTime = p.h || p.n || p.s;
  const h12 = ((p.h + 11) % 12) + 1;
  const ap = p.h < 12 ? "AM" : "PM";
  const isOnlyTime = serial < 1 && serial >= 0 && hasTime;
  switch (f.toLowerCase()) {
    case "":
    case "general date":
      if (isOnlyTime) return `${h12}:${pad(p.n)}:${pad(p.s)} ${ap}`;
      return `${p.m}/${p.d}/${p.y}${hasTime ? ` ${h12}:${pad(p.n)}:${pad(p.s)} ${ap}` : ""}`;
    case "short date":
      return `${p.m}/${p.d}/${p.y}`;
    case "medium date":
      return `${pad(p.d)}-${MONTHS[p.m - 1].slice(0, 3)}-${String(p.y).slice(2)}`;
    case "long date":
      return `${DAYS[p.wd - 1]}, ${MONTHS[p.m - 1]} ${p.d}, ${p.y}`;
    case "long time":
      return `${h12}:${pad(p.n)}:${pad(p.s)} ${ap}`;
    case "medium time":
      return `${h12}:${pad(p.n)} ${ap}`;
    case "short time":
      return `${pad(p.h)}:${pad(p.n)}`;
  }
  // Custom pattern.
  let out = "";
  let i = 0;
  const src = f;
  while (i < src.length) {
    const rest = src.slice(i);
    const low = rest.toLowerCase();
    if (rest[0] === '"') {
      const j = src.indexOf('"', i + 1);
      out += src.slice(i + 1, j < 0 ? undefined : j);
      i = j < 0 ? src.length : j + 1;
      continue;
    }
    if (rest[0] === "\\") {
      out += rest[1] ?? "";
      i += 2;
      continue;
    }
    if (low.startsWith("yyyy")) { out += p.y; i += 4; continue; }
    if (low.startsWith("yy")) { out += String(p.y).slice(2); i += 2; continue; }
    if (low.startsWith("mmmm")) { out += MONTHS[p.m - 1]; i += 4; continue; }
    if (low.startsWith("mmm")) { out += MONTHS[p.m - 1].slice(0, 3); i += 3; continue; }
    if (low.startsWith("mm")) { out += pad(p.m); i += 2; continue; }
    if (low.startsWith("m")) { out += p.m; i += 1; continue; }
    if (low.startsWith("dddd")) { out += DAYS[p.wd - 1]; i += 4; continue; }
    if (low.startsWith("ddd")) { out += DAYS[p.wd - 1].slice(0, 3); i += 3; continue; }
    if (low.startsWith("dd")) { out += pad(p.d); i += 2; continue; }
    if (low.startsWith("d")) { out += p.d; i += 1; continue; }
    if (low.startsWith("hh")) { out += pad(/am\/pm/i.test(src) ? h12 : p.h); i += 2; continue; }
    if (low.startsWith("h")) { out += /am\/pm/i.test(src) ? h12 : p.h; i += 1; continue; }
    if (low.startsWith("nn")) { out += pad(p.n); i += 2; continue; }
    if (low.startsWith("n")) { out += p.n; i += 1; continue; }
    if (low.startsWith("ss")) { out += pad(p.s); i += 2; continue; }
    if (low.startsWith("am/pm")) { out += ap; i += 5; continue; }
    if (low.startsWith("q")) { out += Math.ceil(p.m / 3); i += 1; continue; }
    if (low.startsWith("ww")) { out += Math.ceil((serial - serialOf(p.y, 1, 1) + 1) / 7); i += 2; continue; }
    out += rest[0];
    i += 1;
  }
  return out;
}

function groupThousands(s: string) {
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumber(n: number, fmt?: string, decimals?: string): string {
  const f = (fmt ?? "").trim();
  const dp = decimals && decimals !== "Auto" ? Number(decimals) : undefined;
  const fixed = (x: number, d: number) => {
    const neg = x < 0;
    const s = Math.abs(x).toFixed(d);
    const [a, b] = s.split(".");
    return { neg, int: a, dec: b };
  };
  switch (f.toLowerCase()) {
    case "":
    case "general number": {
      if (dp !== undefined) return n.toFixed(dp);
      return String(Math.round(n * 1e10) / 1e10);
    }
    case "currency": {
      const r = fixed(n, dp ?? 2);
      const body = `$${groupThousands(r.int)}${r.dec !== undefined ? `.${r.dec}` : ""}`;
      return r.neg ? `(${body})` : body;
    }
    case "euro": {
      const r = fixed(n, dp ?? 2);
      return `${r.neg ? "-" : ""}€${groupThousands(r.int)}${r.dec !== undefined ? `.${r.dec}` : ""}`;
    }
    case "fixed":
      return n.toFixed(dp ?? 2);
    case "standard": {
      const r = fixed(n, dp ?? 2);
      return `${r.neg ? "-" : ""}${groupThousands(r.int)}${r.dec !== undefined ? `.${r.dec}` : ""}`;
    }
    case "percent":
      return `${(n * 100).toFixed(dp ?? 2)}%`;
    case "scientific":
      return n.toExponential(dp ?? 2).toUpperCase();
  }
  // Custom: prefix/suffix + 0/#, grouping, decimals, %.
  const m = /^([^0#]*)([#,0]+)(?:\.([0#]+))?(.*)$/.exec(f);
  if (!m) return String(n);
  const pct = m[4].includes("%") || m[1].includes("%");
  const x = pct ? n * 100 : n;
  const d = (m[3] ?? "").length;
  const r = fixed(x, d);
  const int = m[2].includes(",") ? groupThousands(r.int) : r.int;
  return `${r.neg ? "-" : ""}${m[1].replace(/"/g, "")}${int}${d ? `.${r.dec}` : ""}${m[4].replace(/"/g, "")}`;
}

/** Display a value the way a datasheet shows it. */
export function formatValue(v: V, type?: string, fmt?: string, decimals?: string): string {
  if (v === null || v === undefined) return "";
  if (isDate(v)) return formatDateSerial(v.$d, fmt);
  if (typeof v === "boolean") {
    const f = (fmt ?? "").toLowerCase();
    if (f === "true/false") return v ? "True" : "False";
    if (f === "on/off") return v ? "On" : "Off";
    return v ? "Yes" : "No";
  }
  if (typeof v === "number") {
    if (type === "Currency") return formatNumber(v, fmt || "Currency", decimals);
    if (type === "Date/Time") return formatDateSerial(v, fmt);
    return formatNumber(v, fmt, decimals);
  }
  const s = String(v);
  if (fmt === ">") return s.toUpperCase();
  if (fmt === "<") return s.toLowerCase();
  return s;
}

export function toText(v: V): string {
  if (v === null || v === undefined) return "";
  if (isDate(v)) return formatDateSerial(v.$d);
  if (typeof v === "boolean") return v ? "True" : "False";
  if (typeof v === "number") return String(Math.round(v * 1e10) / 1e10);
  return String(v);
}

/* ------------------------------------------------------------------ */
/* Tokenizer                                                           */
/* ------------------------------------------------------------------ */

export class SqlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SqlError";
  }
}

export class NeedParam extends Error {
  constructor(public param: string) {
    super(`Enter Parameter Value: ${param}`);
    this.name = "NeedParam";
  }
}

type TokT = "num" | "str" | "date" | "id" | "br" | "op" | "punc" | "eof";
interface Tok {
  t: TokT;
  v: string;
  pos: number;
}

const OPS = ["<=", ">=", "<>", "=", "<", ">", "+", "-", "*", "/", "\\", "^", "&"];

export function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '"' || c === "'") {
      let j = i + 1;
      let s = "";
      while (j < src.length) {
        if (src[j] === c) {
          if (src[j + 1] === c) { s += c; j += 2; continue; }
          break;
        }
        s += src[j++];
      }
      if (j >= src.length) throw new SqlError(`Syntax error in string in query expression '${src}'.`);
      out.push({ t: "str", v: s, pos: i });
      i = j + 1;
      continue;
    }
    if (c === "#") {
      const j = src.indexOf("#", i + 1);
      if (j < 0) throw new SqlError(`Syntax error in date in query expression '${src}'.`);
      out.push({ t: "date", v: src.slice(i + 1, j), pos: i });
      i = j + 1;
      continue;
    }
    if (c === "[") {
      const j = src.indexOf("]", i + 1);
      if (j < 0) throw new SqlError(`Syntax error in query expression '${src}'.`);
      out.push({ t: "br", v: src.slice(i + 1, j), pos: i });
      i = j + 1;
      continue;
    }
    if (/\d/.test(c) || (c === "." && /\d/.test(src[i + 1] ?? ""))) {
      const m = /^(\d*\.?\d+(?:[eE][+-]?\d+)?)/.exec(src.slice(i));
      out.push({ t: "num", v: m![1], pos: i });
      i += m![1].length;
      continue;
    }
    if (/[A-Za-z_À-ɏ]/.test(c)) {
      const m = /^[A-Za-z_À-ɏ][A-Za-z0-9_À-ɏ]*/.exec(src.slice(i));
      out.push({ t: "id", v: m![0], pos: i });
      i += m![0].length;
      continue;
    }
    const op = OPS.find((o) => src.startsWith(o, i));
    if (op) {
      out.push({ t: "op", v: op, pos: i });
      i += op.length;
      continue;
    }
    if ("(),.!;:?".includes(c)) {
      out.push({ t: "punc", v: c, pos: i });
      i++;
      continue;
    }
    throw new SqlError(`Syntax error in query expression '${src}'.`);
  }
  out.push({ t: "eof", v: "", pos: src.length });
  return out;
}

/* ------------------------------------------------------------------ */
/* Expression AST                                                      */
/* ------------------------------------------------------------------ */

export type Expr =
  | { k: "num"; v: number }
  | { k: "str"; v: string }
  | { k: "date"; v: number; raw?: string }
  | { k: "bool"; v: boolean }
  | { k: "null" }
  | { k: "ref"; table?: string; name: string; bang?: boolean }
  | { k: "star"; table?: string }
  | { k: "bin"; op: string; l: Expr; r: Expr }
  | { k: "not"; e: Expr }
  | { k: "neg"; e: Expr }
  | { k: "like"; e: Expr; pat: Expr; not?: boolean }
  | { k: "between"; e: Expr; lo: Expr; hi: Expr; not?: boolean }
  | { k: "in"; e: Expr; list: Expr[]; not?: boolean }
  | { k: "isnull"; e: Expr; not?: boolean }
  | { k: "call"; name: string; args: Expr[] }
  | { k: "paren"; e: Expr }
  | { k: "implicit" };

const KEYWORDS = new Set(["and", "or", "not", "xor", "eqv", "imp", "like", "between", "in", "is", "null", "mod", "select", "from", "where", "group", "by", "having", "order", "asc", "desc", "as", "on", "inner", "left", "right", "outer", "join", "into", "values", "set", "distinct", "top", "percent", "union", "transform", "pivot", "update", "delete", "insert", "distinctrow", "all", "parameters"]);
export const AGGREGATES = new Set(["count", "sum", "avg", "min", "max", "first", "last", "stdev", "stdevp", "var", "varp"]);

class Parser {
  i = 0;
  constructor(public toks: Tok[], public src: string, public criteria = false) {}
  peek(o = 0) {
    return this.toks[Math.min(this.i + o, this.toks.length - 1)];
  }
  next() {
    return this.toks[this.i++];
  }
  isKw(w: string, o = 0) {
    const t = this.peek(o);
    return t.t === "id" && t.v.toLowerCase() === w;
  }
  eatKw(w: string) {
    if (this.isKw(w)) { this.i++; return true; }
    return false;
  }
  expectKw(w: string) {
    if (!this.eatKw(w)) throw this.err();
  }
  isP(p: string, o = 0) {
    const t = this.peek(o);
    return t.t === "punc" && t.v === p;
  }
  eatP(p: string) {
    if (this.isP(p)) { this.i++; return true; }
    return false;
  }
  isOp(op: string, o = 0) {
    const t = this.peek(o);
    return t.t === "op" && t.v === op;
  }
  err(msg?: string) {
    return new SqlError(msg ?? `Syntax error (missing operator) in query expression '${this.src.trim()}'.`);
  }

  parseExpr(): Expr {
    return this.parseImp();
  }
  parseImp(): Expr {
    let l = this.parseOr();
    while (this.isKw("xor") || this.isKw("eqv") || this.isKw("imp")) {
      const op = this.next().v.toLowerCase();
      l = { k: "bin", op, l, r: this.parseOr() };
    }
    return l;
  }
  parseOr(): Expr {
    let l = this.parseAnd();
    while (this.isKw("or")) {
      this.next();
      l = { k: "bin", op: "or", l, r: this.parseAnd() };
    }
    return l;
  }
  parseAnd(): Expr {
    let l = this.parseNot();
    while (this.isKw("and")) {
      this.next();
      l = { k: "bin", op: "and", l, r: this.parseNot() };
    }
    return l;
  }
  parseNot(): Expr {
    if (this.isKw("not") && !this.isKw("like", 1) && !this.isKw("in", 1) && !this.isKw("between", 1)) {
      this.next();
      return { k: "not", e: this.parseNot() };
    }
    return this.parseCompare();
  }
  /** In criteria mode a comparison may start with its operator. */
  startsComparison() {
    const t = this.peek();
    if (t.t === "op" && ["=", "<>", "<", ">", "<=", ">="].includes(t.v)) return true;
    if (this.isKw("like") || this.isKw("between") || this.isKw("in") || this.isKw("is")) return true;
    if (this.isKw("not") && (this.isKw("like", 1) || this.isKw("in", 1) || this.isKw("between", 1))) return true;
    return false;
  }
  parseCompare(): Expr {
    let l: Expr;
    if (this.criteria && this.startsComparison()) l = { k: "implicit" };
    else l = this.parseConcat();
    for (;;) {
      const t = this.peek();
      if (t.t === "op" && ["=", "<>", "<", ">", "<=", ">="].includes(t.v)) {
        this.next();
        l = { k: "bin", op: t.v, l, r: this.parseConcat() };
        continue;
      }
      let not = false;
      if (this.isKw("not") && (this.isKw("like", 1) || this.isKw("in", 1) || this.isKw("between", 1))) {
        this.next();
        not = true;
      }
      if (this.eatKw("like")) {
        l = { k: "like", e: l, pat: this.parseConcat(), not };
        continue;
      }
      if (this.eatKw("between")) {
        const lo = this.parseConcat();
        this.expectKw("and");
        const hi = this.parseConcat();
        l = { k: "between", e: l, lo, hi, not };
        continue;
      }
      if (this.eatKw("in")) {
        if (!this.eatP("(")) throw this.err();
        const list: Expr[] = [];
        if (!this.isP(")")) {
          do list.push(this.parseConcat());
          while (this.eatP(","));
        }
        if (!this.eatP(")")) throw this.err();
        l = { k: "in", e: l, list, not };
        continue;
      }
      if (this.isKw("is")) {
        this.next();
        const n = this.eatKw("not");
        this.expectKw("null");
        l = { k: "isnull", e: l, not: n };
        continue;
      }
      return l;
    }
  }
  parseConcat(): Expr {
    let l = this.parseAdd();
    while (this.isOp("&")) {
      this.next();
      l = { k: "bin", op: "&", l, r: this.parseAdd() };
    }
    return l;
  }
  parseAdd(): Expr {
    let l = this.parseMod();
    while (this.isOp("+") || this.isOp("-")) {
      const op = this.next().v;
      l = { k: "bin", op, l, r: this.parseMod() };
    }
    return l;
  }
  parseMod(): Expr {
    let l = this.parseIntDiv();
    while (this.isKw("mod")) {
      this.next();
      l = { k: "bin", op: "mod", l, r: this.parseIntDiv() };
    }
    return l;
  }
  parseIntDiv(): Expr {
    let l = this.parseMul();
    while (this.isOp("\\")) {
      this.next();
      l = { k: "bin", op: "\\", l, r: this.parseMul() };
    }
    return l;
  }
  parseMul(): Expr {
    let l = this.parseUnary();
    while (this.isOp("*") || this.isOp("/")) {
      const op = this.next().v;
      l = { k: "bin", op, l, r: this.parseUnary() };
    }
    return l;
  }
  parseUnary(): Expr {
    if (this.isOp("-")) {
      this.next();
      return { k: "neg", e: this.parseUnary() };
    }
    if (this.isOp("+")) {
      this.next();
      return this.parseUnary();
    }
    return this.parsePow();
  }
  parsePow(): Expr {
    const l = this.parsePrimary();
    if (this.isOp("^")) {
      this.next();
      return { k: "bin", op: "^", l, r: this.parseUnary() };
    }
    return l;
  }
  parseName(): { name: string; bracket: boolean } {
    const t = this.next();
    if (t.t === "br") return { name: t.v, bracket: true };
    if (t.t === "id") return { name: t.v, bracket: false };
    this.i--;
    throw this.err();
  }
  parsePrimary(): Expr {
    const t = this.peek();
    if (t.t === "num") {
      this.next();
      return { k: "num", v: Number(t.v) };
    }
    if (t.t === "str") {
      this.next();
      return { k: "str", v: t.v };
    }
    if (t.t === "date") {
      this.next();
      const s = parseDateText(t.v);
      if (s === null) throw new SqlError(`Syntax error in date in query expression '${this.src.trim()}'.`);
      return { k: "date", v: s, raw: t.v };
    }
    if (t.t === "punc" && t.v === "(") {
      this.next();
      const e = this.parseExpr();
      if (!this.eatP(")")) throw this.err();
      return { k: "paren", e };
    }
    if (t.t === "op" && t.v === "*") {
      this.next();
      return { k: "star" };
    }
    if (t.t === "id" || t.t === "br") {
      const low = t.v.toLowerCase();
      if (t.t === "id") {
        if (low === "null") { this.next(); return { k: "null" }; }
        if (low === "true" || low === "yes" || low === "on") { this.next(); return { k: "bool", v: true }; }
        if (low === "false" || low === "no" || low === "off") { this.next(); return { k: "bool", v: false }; }
        if (KEYWORDS.has(low) && !(this.isP("(", 1) && (low === "left" || low === "right"))) throw this.err();
      }
      const first = this.parseName();
      // Function call
      if (!first.bracket && this.isP("(")) {
        this.next();
        const args: Expr[] = [];
        if (!this.isP(")")) {
          do {
            if (this.isOp("*")) {
              this.next();
              args.push({ k: "star" });
            } else args.push(this.parseExpr());
          } while (this.eatP(","));
        }
        if (!this.eatP(")")) throw this.err();
        return { k: "call", name: first.name, args };
      }
      // Qualified reference: a.b, [a].[b], a![b], Forms![F]![C]
      const parts = [first.name];
      let bang = false;
      while (this.isP(".") || this.isP("!")) {
        const sep = this.next().v;
        if (sep === "!") bang = true;
        if (this.isOp("*")) {
          this.next();
          return { k: "star", table: parts.join(".") };
        }
        parts.push(this.parseName().name);
      }
      if (parts.length > 1 && this.isP("(")) {
        this.next();
        const args: Expr[] = [];
        if (!this.isP(")")) {
          do args.push(this.parseExpr());
          while (this.eatP(","));
        }
        if (!this.eatP(")")) throw this.err();
        return { k: "call", name: parts.join("."), args };
      }
      if (parts.length === 1) {
        // Zero-argument functions written without parentheses (Date, Now, Time).
        if (!first.bracket && ["date", "now", "time"].includes(low)) return { k: "call", name: first.name, args: [] };
        return { k: "ref", name: parts[0] };
      }
      const name = parts.pop()!;
      return { k: "ref", table: parts.join("."), name, bang };
    }
    throw this.err();
  }
}

export function parseExpr(src: string): Expr {
  const p = new Parser(tokenize(src), src);
  const e = p.parseExpr();
  if (p.peek().t !== "eof") throw p.err();
  return e;
}

const isBoolNode = (e: Expr): boolean =>
  e.k === "like" || e.k === "between" || e.k === "in" || e.k === "isnull" ||
  (e.k === "bin" && ["=", "<>", "<", ">", "<=", ">="].includes(e.op)) ||
  (e.k === "paren" && isBoolNode(e.e));

/** Wrap value leaves of a criteria expression as "implicit = value". */
function wrapCriteria(e: Expr): Expr {
  if (e.k === "bin" && (e.op === "and" || e.op === "or" || e.op === "xor")) return { ...e, l: wrapCriteria(e.l), r: wrapCriteria(e.r) };
  if (e.k === "not") return { k: "not", e: wrapCriteria(e.e) };
  if (e.k === "paren") return isBoolNode(e.e) || (e.e.k === "bin" && (e.e.op === "and" || e.e.op === "or")) ? { k: "paren", e: wrapCriteria(e.e) } : { k: "bin", op: "=", l: { k: "implicit" }, r: e };
  if (isBoolNode(e)) return e;
  return { k: "bin", op: "=", l: { k: "implicit" }, r: e };
}

/** Parse a criteria / validation rule: ">=0", "Between 1 And 5", "\"NY\" Or \"NJ\"". */
export function parseCriteria(src: string): Expr {
  const p = new Parser(tokenize(src), src, true);
  const e = p.parseExpr();
  if (p.peek().t !== "eof") throw p.err();
  return wrapCriteria(e);
}

/** Replace the implicit left operand with an expression. */
export function bindImplicit(e: Expr, to: Expr): Expr {
  const r = (x: Expr): Expr => bindImplicit(x, to);
  switch (e.k) {
    case "implicit": return to;
    case "bin": return { ...e, l: r(e.l), r: r(e.r) };
    case "not": return { k: "not", e: r(e.e) };
    case "neg": return { k: "neg", e: r(e.e) };
    case "paren": return { k: "paren", e: r(e.e) };
    case "like": return { ...e, e: r(e.e), pat: r(e.pat) };
    case "between": return { ...e, e: r(e.e), lo: r(e.lo), hi: r(e.hi) };
    case "in": return { ...e, e: r(e.e), list: e.list.map(r) };
    case "isnull": return { ...e, e: r(e.e) };
    case "call": return { ...e, args: e.args.map(r) };
    default: return e;
  }
}

export function walkExpr(e: Expr, fn: (x: Expr) => void) {
  fn(e);
  switch (e.k) {
    case "bin": walkExpr(e.l, fn); walkExpr(e.r, fn); break;
    case "not": case "neg": case "paren": case "isnull": walkExpr(e.e, fn); break;
    case "like": walkExpr(e.e, fn); walkExpr(e.pat, fn); break;
    case "between": walkExpr(e.e, fn); walkExpr(e.lo, fn); walkExpr(e.hi, fn); break;
    case "in": walkExpr(e.e, fn); e.list.forEach((x) => walkExpr(x, fn)); break;
    case "call": e.args.forEach((x) => walkExpr(x, fn)); break;
  }
}

export function hasAggregate(e: Expr): boolean {
  let found = false;
  walkExpr(e, (x) => {
    if (x.k === "call" && AGGREGATES.has(x.name.toLowerCase())) found = true;
  });
  return found;
}

/* ------------------------------------------------------------------ */
/* Printing                                                            */
/* ------------------------------------------------------------------ */

export const needsBrackets = (n: string) => !/^[A-Za-z_][A-Za-z0-9_]*$/.test(n) || KEYWORDS.has(n.toLowerCase());
export const qn = (n: string) => (needsBrackets(n) ? `[${n}]` : n);

export function dateLiteral(serial: number) {
  const p = ymd(serial);
  const t = p.h || p.n || p.s ? ` ${((p.h + 11) % 12) + 1}:${pad(p.n)}:${pad(p.s)} ${p.h < 12 ? "AM" : "PM"}` : "";
  return `#${p.m}/${p.d}/${p.y}${t}#`;
}

const FN_CASE: Record<string, string> = Object.fromEntries(
  ["Date", "Now", "Time", "Year", "Month", "Day", "Weekday", "Hour", "Minute", "Second", "MonthName", "WeekdayName", "DateSerial", "DateValue", "CDate", "DateAdd", "DateDiff", "DatePart", "Format", "FormatCurrency", "FormatNumber", "FormatPercent", "IIf", "Nz", "IsNull", "IsNumeric", "IsDate", "Switch", "Choose", "Val", "CStr", "CInt", "CLng", "CDbl", "CCur", "CBool", "Int", "Fix", "Abs", "Sgn", "Sqr", "Round", "Len", "Left", "Right", "Mid", "UCase", "LCase", "Trim", "LTrim", "RTrim", "InStr", "Replace", "StrConv", "Count", "Sum", "Avg", "Min", "Max", "First", "Last", "StDev", "Var", "DCount", "DSum", "DAvg", "DMin", "DMax", "DLookup"].map((n) => [n.toLowerCase(), n]),
);

const PREC: Record<string, number> = { imp: 0, eqv: 0, xor: 0, or: 1, and: 2, "=": 4, "<>": 4, "<": 4, ">": 4, "<=": 4, ">=": 4, "&": 5, "+": 6, "-": 6, mod: 7, "\\": 8, "*": 9, "/": 9, "^": 11 };
const opText = (op: string) => ({ and: "And", or: "Or", xor: "Xor", eqv: "Eqv", imp: "Imp", mod: "Mod" })[op] ?? op;

/** Print an expression in Access style. `impl` renders the implicit operand (criteria). */
export function printExpr(e: Expr, impl = ""): string {
  const p = (x: Expr) => printExpr(x, impl);
  switch (e.k) {
    case "num": return String(e.v);
    case "str": return `"${e.v.replace(/"/g, '""')}"`;
    case "date": return dateLiteral(e.v);
    case "bool": return e.v ? "True" : "False";
    case "null": return "Null";
    case "implicit": return impl;
    case "star": return e.table ? `${qn(e.table)}.*` : "*";
    case "ref": return e.table ? `${e.table.split(".").map(qn).join(".")}${e.bang ? "!" : "."}${qn(e.name)}` : `[${e.name}]`;
    case "paren": return `(${p(e.e)})`;
    case "neg": return `-${p(e.e)}`;
    case "not": return `Not ${p(e.e)}`;
    case "like": return `${p(e.e)}${impl || e.e.k !== "implicit" ? " " : ""}${e.not ? "Not " : ""}Like ${p(e.pat)}`.trimStart();
    case "between": return `${p(e.e)} ${e.not ? "Not " : ""}Between ${p(e.lo)} And ${p(e.hi)}`.trimStart();
    case "in": return `${p(e.e)} ${e.not ? "Not " : ""}In (${e.list.map(p).join(",")})`.trimStart();
    case "isnull": return `${p(e.e)} Is ${e.not ? "Not " : ""}Null`.trimStart();
    case "call": return `${FN_CASE[e.name.toLowerCase()] ?? e.name}(${e.args.map(p).join(",")})`;
    case "bin": {
      const pr = PREC[e.op] ?? 3;
      const side = (x: Expr, right: boolean) => {
        const s = p(x);
        if (x.k === "bin") {
          const xp = PREC[x.op] ?? 3;
          if (xp < pr || (right && xp === pr && pr >= 4)) return `(${s})`;
        }
        return s;
      };
      const word = /^[a-z]/.test(e.op);
      const l = side(e.l, false);
      const r = side(e.r, true);
      if (word || e.op === "&") return `${l} ${opText(e.op)} ${r}`.trim();
      return `${l}${e.op}${r}`;
    }
  }
}

/** Access-style criteria cell text: implicit operand omitted, "=" dropped. */
export function printCriteria(e: Expr): string {
  if (e.k === "bin" && e.op === "=" && e.l.k === "implicit") return printExpr(e.r);
  if (e.k === "bin" && (e.op === "or" || e.op === "and")) return `${printCriteria(e.l)} ${opText(e.op)} ${printCriteria(e.r)}`;
  if (e.k === "not" && e.e.k === "bin" && e.e.op === "=" && e.e.l.k === "implicit") return `Not ${printExpr(e.e.r)}`;
  return printExpr(e).trim();
}

/**
 * Tidy criteria the way Access does when you leave the cell: quote bare words,
 * wrap bare dates in #, capitalize keywords. Field names stay bracketed.
 */
export function normalizeCriteria(raw: string, fieldNames: string[] = []): string {
  let s = raw.trim();
  if (!s) return "";
  // Bare Like patterns: like s*  →  Like "s*"
  s = s.replace(/\b(like)\s+(?!["'[(])([^\s"']+)/gi, (_m, kw: string, pat: string) => `${kw} "${pat}"`);
  // Wrap bare dates in #.
  let pre = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === '"' || c === "'" || c === "#" || c === "[") {
      const close = c === "[" ? "]" : c;
      const j = s.indexOf(close, i + 1);
      const end = j < 0 ? s.length : j + 1;
      pre += s.slice(i, end);
      i = end;
      continue;
    }
    const m = /^\d{1,2}\/\d{1,2}\/\d{2,4}/.exec(s.slice(i));
    if (m && !/[\d.]/.test(s[i - 1] ?? "")) {
      pre += `#${m[0]}#`;
      i += m[0].length;
      continue;
    }
    pre += c;
    i++;
  }
  // Quote bare words that are not keywords, functions or field names.
  const known = new Set(fieldNames.map((f) => f.toLowerCase()));
  let toks: Tok[];
  try {
    toks = tokenize(pre);
  } catch {
    return s;
  }
  let out = "";
  let last = 0;
  for (let k = 0; k < toks.length; k++) {
    const t = toks[k];
    if (t.t !== "id") continue;
    const low = t.v.toLowerCase();
    const nextIsCall = toks[k + 1]?.t === "punc" && toks[k + 1].v === "(";
    const prevDot = toks[k - 1]?.t === "punc" && (toks[k - 1].v === "." || toks[k - 1].v === "!");
    const nextDot = toks[k + 1]?.t === "punc" && (toks[k + 1].v === "." || toks[k + 1].v === "!");
    if (KEYWORDS.has(low) || ["true", "false", "yes", "no", "null", "on", "off", "date", "now", "time"].includes(low) || nextIsCall || prevDot || nextDot) continue;
    if (known.has(low)) {
      out += pre.slice(last, t.pos) + `[${t.v}]`;
      last = t.pos + t.v.length;
      continue;
    }
    // Merge consecutive bare words ("New York") into one quoted string.
    let end = k;
    while (toks[end + 1]?.t === "id" && !KEYWORDS.has(toks[end + 1].v.toLowerCase())) end++;
    const stop = toks[end].pos + toks[end].v.length;
    out += pre.slice(last, t.pos) + `"${pre.slice(t.pos, stop)}"`;
    last = stop;
    k = end;
  }
  out += pre.slice(last);
  try {
    return printCriteria(parseCriteria(out));
  } catch {
    return out;
  }
}

/** Tidy a validation rule or expression the way Access redisplays it. */
export function normalizeRule(raw: string): string {
  const s = raw.trim();
  if (!s) return "";
  try {
    return printCriteria(parseCriteria(s));
  } catch {
    return s;
  }
}

/* ------------------------------------------------------------------ */
/* Evaluation                                                          */
/* ------------------------------------------------------------------ */

export interface EvalCtx {
  /** Resolve a field reference; throw NeedParam for unknown names. */
  ref(table: string | undefined, name: string): V;
  /** Aggregate over the current group. */
  agg?(call: Extract<Expr, { k: "call" }>): V;
  /** Implicit operand for criteria/validation. */
  implicit?: V;
  db?: DataSource;
  /** Hook for calls the engine doesn't know (VBA methods, user functions). Return undefined to fall through. */
  call?(name: string, args: V[], raw: Expr[]): V | undefined;
}

export function num(v: V): number | null {
  if (v === null) return null;
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? -1 : 0;
  if (isDate(v)) return v.$d;
  const s = String(v).replace(/[$,]/g, "").trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}

function asDate(v: V): number | null {
  if (v === null) return null;
  if (isDate(v)) return v.$d;
  if (typeof v === "number") return v;
  if (typeof v === "string") return parseDateText(v);
  return null;
}

export function truthy(v: V): boolean {
  if (v === null) return false;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (isDate(v)) return v.$d !== 0;
  const s = v.toLowerCase();
  if (s === "true" || s === "yes" || s === "-1") return true;
  if (s === "false" || s === "no" || s === "0" || s === "") return false;
  return Boolean(num(v));
}

/** Compare like Access: numbers numerically, dates by date, text case-insensitively. */
export function compare(a: V, b: V): number | null {
  if (a === null || b === null) return null;
  if (isDate(a) || isDate(b)) {
    const x = asDate(a), y = asDate(b);
    if (x !== null && y !== null) return x - y;
  }
  if (typeof a === "boolean" || typeof b === "boolean") {
    const x = num(a), y = num(b);
    if (x !== null && y !== null) return x - y;
  }
  if (typeof a === "number" || typeof b === "number") {
    const x = num(a), y = num(b);
    if (x !== null && y !== null) return x - y;
  }
  const x = toText(a).toLowerCase(), y = toText(b).toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
}

export function likeToRegex(pat: string): RegExp {
  let r = "";
  for (let i = 0; i < pat.length; i++) {
    const c = pat[i];
    if (c === "*") r += ".*";
    else if (c === "?") r += ".";
    else if (c === "#") r += "\\d";
    else if (c === "[") {
      const j = pat.indexOf("]", i + 1);
      if (j < 0) { r += "\\["; continue; }
      let body = pat.slice(i + 1, j);
      if (body.startsWith("!")) body = "^" + body.slice(1);
      r += `[${body.replace(/\\/g, "\\\\")}]`;
      i = j;
    } else r += c.replace(/[.+^${}()|\\/]/g, "\\$&");
  }
  return new RegExp(`^${r}$`, "is");
}

function bankers(n: number, d = 0) {
  const f = Math.pow(10, d);
  const x = n * f;
  const r = Math.round(x);
  const diff = Math.abs(x % 1);
  if (Math.abs(diff - 0.5) < 1e-9) return (2 * Math.round(x / 2)) / f;
  return r / f;
}

function dateAdd(interval: string, n: number, d: number): number {
  const p = ymd(d);
  const frac = d - Math.floor(d);
  switch (interval.toLowerCase()) {
    case "yyyy": return serialOf(p.y + n, p.m, Math.min(p.d, new Date(Date.UTC(p.y + n, p.m, 0)).getUTCDate())) + frac;
    case "q": n *= 3; // falls through
    case "m": {
      const t = p.m - 1 + n;
      const y = p.y + Math.floor(t / 12), m = (((t % 12) + 12) % 12) + 1;
      return serialOf(y, m, Math.min(p.d, new Date(Date.UTC(y, m, 0)).getUTCDate())) + frac;
    }
    case "ww": return d + n * 7;
    case "d": case "y": case "w": return d + n;
    case "h": return d + n / 24;
    case "n": return d + n / 1440;
    case "s": return d + n / 86400;
  }
  throw new SqlError("Invalid procedure call or argument.");
}

function dateDiff(interval: string, a: number, b: number): number {
  const p = ymd(a), q = ymd(b);
  switch (interval.toLowerCase()) {
    case "yyyy": return q.y - p.y;
    case "q": return (q.y * 4 + Math.ceil(q.m / 3)) - (p.y * 4 + Math.ceil(p.m / 3));
    case "m": return (q.y * 12 + q.m) - (p.y * 12 + p.m);
    case "ww": case "w": return Math.trunc((Math.floor(b) - Math.floor(a)) / 7);
    case "d": case "y": return Math.floor(b) - Math.floor(a);
    case "h": return Math.round((b - a) * 24);
    case "n": return Math.round((b - a) * 1440);
    case "s": return Math.round((b - a) * 86400);
  }
  throw new SqlError("Invalid procedure call or argument.");
}

function formatFn(v: V, fmt: string): string {
  if (v === null) return "";
  const f = fmt.trim();
  const low = f.toLowerCase();
  if (isDate(v)) return formatDateSerial(v.$d, f);
  if (["general date", "short date", "medium date", "long date", "long time", "medium time", "short time"].includes(low) || /[ymd]/i.test(f.replace(/"[^"]*"/g, ""))) {
    const d = asDate(v);
    if (d !== null && (typeof v === "string" || typeof v === "number")) return formatDateSerial(d, f);
  }
  if (low === "yes/no" || low === "true/false" || low === "on/off") return formatValue(truthy(v), "Yes/No", f);
  if (low === ">" ) return toText(v).toUpperCase();
  if (low === "<") return toText(v).toLowerCase();
  const n = num(v);
  if (n !== null) return formatNumber(n, f);
  return toText(v);
}

export interface DataSource {
  /** Rows of a table or saved query by name (case-insensitive), or null. */
  rows(name: string): { name: string; fields: { name: string; type?: string }[]; rows: Record<string, V>[]; ids?: string[]; isTable: boolean } | null;
}

function domainAgg(fn: string, args: V[], db?: DataSource): V {
  if (!db) throw new SqlError("Unknown function.");
  const [exprV, domV, critV] = args;
  const src = db.rows(toText(domV));
  if (!src) throw new SqlError(`The Microsoft Access database engine cannot find the input table or query '${toText(domV)}'. Make sure it exists and that its name is spelled correctly.`);
  const expr = toText(exprV);
  const crit = critV === undefined || critV === null ? null : toText(critV);
  const ex = expr === "*" ? null : parseExpr(expr);
  const cr = crit ? parseExpr(crit) : null;
  const vals: V[] = [];
  let count = 0;
  for (const row of src.rows) {
    const ctx: EvalCtx = {
      ref: (_t, n) => {
        const k = Object.keys(row).find((x) => x.toLowerCase() === n.toLowerCase());
        if (k === undefined) throw new NeedParam(n);
        return row[k];
      },
      db,
    };
    if (cr && !truthy(evalExpr(cr, ctx))) continue;
    count++;
    if (ex) vals.push(evalExpr(ex, ctx));
  }
  switch (fn) {
    case "dcount": return ex ? vals.filter((v) => v !== null).length : count;
    case "dlookup": return vals[0] ?? null;
    case "dfirst": return vals[0] ?? null;
    case "dlast": return vals[vals.length - 1] ?? null;
  }
  return aggregate(fn.slice(1), vals);
}

export function aggregate(fn: string, vals: V[], countStar = false, rowCount = 0): V {
  const f = fn.toLowerCase();
  if (f === "count") return countStar ? rowCount : vals.filter((v) => v !== null).length;
  const present = vals.filter((v) => v !== null);
  if (f === "first") return vals[0] ?? null;
  if (f === "last") return vals[vals.length - 1] ?? null;
  if (!present.length) return null;
  if (f === "min" || f === "max") {
    let best = present[0];
    for (const v of present.slice(1)) {
      const c = compare(v, best);
      if (c !== null && (f === "min" ? c < 0 : c > 0)) best = v;
    }
    return best;
  }
  const nums = present.map(num).filter((x): x is number => x !== null);
  const sum = nums.reduce((a, b) => a + b, 0);
  if (f === "sum") return Math.round(sum * 1e8) / 1e8;
  if (f === "avg") return nums.length ? sum / nums.length : null;
  const mean = nums.length ? sum / nums.length : 0;
  const ss = nums.reduce((a, b) => a + (b - mean) ** 2, 0);
  if (f === "var") return nums.length > 1 ? ss / (nums.length - 1) : null;
  if (f === "varp") return nums.length ? ss / nums.length : null;
  if (f === "stdev") return nums.length > 1 ? Math.sqrt(ss / (nums.length - 1)) : null;
  if (f === "stdevp") return nums.length ? Math.sqrt(ss / nums.length) : null;
  throw new SqlError(`Undefined function '${fn}' in expression.`);
}

function callFn(name: string, a: V[], ctx: EvalCtx): V {
  const f = name.toLowerCase();
  const s = (i: number) => toText(a[i] ?? null);
  const n = (i: number) => num(a[i] ?? null);
  const d = (i: number) => asDate(a[i] ?? null);
  const anyNull = (k = a.length) => a.slice(0, k).some((x) => x === null);
  switch (f) {
    case "date": return { $d: TODAY };
    case "now": return { $d: NOW };
    case "time": return { $d: NOW - TODAY };
    case "year": return anyNull(1) ? null : ymd(d(0)!).y;
    case "month": return anyNull(1) ? null : ymd(d(0)!).m;
    case "day": return anyNull(1) ? null : ymd(d(0)!).d;
    case "weekday": return anyNull(1) ? null : ymd(d(0)!).wd;
    case "hour": return anyNull(1) ? null : ymd(d(0)!).h;
    case "minute": return anyNull(1) ? null : ymd(d(0)!).n;
    case "second": return anyNull(1) ? null : ymd(d(0)!).s;
    case "monthname": return MONTHS[(n(0) ?? 1) - 1]?.slice(0, a[1] && truthy(a[1]) ? 3 : undefined) ?? null;
    case "weekdayname": return DAYS[(n(0) ?? 1) - 1]?.slice(0, a[1] && truthy(a[1]) ? 3 : undefined) ?? null;
    case "dateserial": {
      if (anyNull(3)) return null;
      return { $d: dateAdd("m", n(1)! - 1, serialOf(fullYear(n(0)!), 1, 1)) + n(2)! - 1 };
    }
    case "datevalue": case "cdate": {
      const x = d(0);
      if (x === null) throw new SqlError("Type mismatch.");
      return { $d: f === "datevalue" ? Math.floor(x) : x };
    }
    case "dateadd": return anyNull() ? null : { $d: dateAdd(s(0), n(1)!, d(2)!) };
    case "datediff": return anyNull(3) ? null : dateDiff(s(0), d(1)!, d(2)!);
    case "datepart": {
      if (anyNull(2)) return null;
      const p = ymd(d(1)!);
      switch (s(0).toLowerCase()) {
        case "yyyy": return p.y;
        case "q": return Math.ceil(p.m / 3);
        case "m": return p.m;
        case "d": return p.d;
        case "w": return p.wd;
        case "ww": return Math.ceil((d(1)! - serialOf(p.y, 1, 1) + 1) / 7);
        case "h": return p.h;
        case "n": return p.n;
        case "s": return p.s;
        case "y": return Math.floor(d(1)!) - serialOf(p.y, 1, 1) + 1;
      }
      throw new SqlError("Invalid procedure call or argument.");
    }
    case "format": return a[0] === null ? null : formatFn(a[0], s(1));
    case "formatcurrency": return a[0] === null ? null : formatNumber(n(0)!, "Currency", a[1] !== undefined ? String(n(1)) : undefined);
    case "formatnumber": return a[0] === null ? null : formatNumber(n(0)!, "Standard", a[1] !== undefined ? String(n(1)) : undefined);
    case "formatpercent": return a[0] === null ? null : formatNumber(n(0)!, "Percent", a[1] !== undefined ? String(n(1)) : undefined);
    case "formatdatetime": return a[0] === null ? null : formatDateSerial(d(0)!, ["General Date", "Long Date", "Short Date", "Long Time", "Short Time"][n(1) ?? 0]);
    case "iif": return truthy(a[0]) ? a[1] ?? null : a[2] ?? null;
    case "nz": return a[0] === null ? (a.length > 1 ? a[1] : "") : a[0];
    case "isnull": return a[0] === null;
    case "isnumeric": return a[0] !== null && num(a[0]) !== null;
    case "isdate": return a[0] !== null && asDate(a[0]) !== null;
    case "switch": {
      for (let i = 0; i + 1 < a.length; i += 2) if (truthy(a[i])) return a[i + 1];
      return null;
    }
    case "choose": { const i = n(0); return i !== null && i >= 1 && i < a.length ? a[i] : null; }
    case "val": { const m = /^\s*[-+]?\d*\.?\d+/.exec(s(0).replace(/\s+/g, "")); return m ? Number(m[0]) : 0; }
    case "cstr": return s(0);
    case "cint": case "clng": return a[0] === null ? null : bankers(n(0) ?? 0);
    case "cdbl": case "csng": case "ccur": case "cdec": return a[0] === null ? null : n(0);
    case "cbool": return truthy(a[0]);
    case "int": return a[0] === null ? null : Math.floor(n(0)!);
    case "fix": return a[0] === null ? null : Math.trunc(n(0)!);
    case "abs": return a[0] === null ? null : Math.abs(n(0)!);
    case "sgn": return a[0] === null ? null : Math.sign(n(0)!);
    case "sqr": return a[0] === null ? null : Math.sqrt(n(0)!);
    case "round": return a[0] === null ? null : bankers(n(0)!, n(1) ?? 0);
    case "len": return a[0] === null ? null : s(0).length;
    case "left": return a[0] === null ? null : s(0).slice(0, Math.max(0, n(1) ?? 0));
    case "right": return a[0] === null ? null : (n(1) ?? 0) <= 0 ? "" : s(0).slice(-(n(1) ?? 0));
    case "mid": return a[0] === null ? null : s(0).substr((n(1) ?? 1) - 1, a[2] === undefined ? undefined : n(2) ?? 0);
    case "ucase": return a[0] === null ? null : s(0).toUpperCase();
    case "lcase": return a[0] === null ? null : s(0).toLowerCase();
    case "trim": return a[0] === null ? null : s(0).trim();
    case "ltrim": return a[0] === null ? null : s(0).replace(/^\s+/, "");
    case "rtrim": return a[0] === null ? null : s(0).replace(/\s+$/, "");
    case "space": return " ".repeat(Math.max(0, n(0) ?? 0));
    case "string": return s(1).charAt(0).repeat(Math.max(0, n(0) ?? 0));
    case "instr": {
      if (a.length >= 3) return s(1).toLowerCase().indexOf(s(2).toLowerCase(), (n(0) ?? 1) - 1) + 1;
      return s(0).toLowerCase().indexOf(s(1).toLowerCase()) + 1;
    }
    case "replace": return a[0] === null ? null : s(0).split(s(1)).join(s(2));
    case "strconv": return n(1) === 3 ? s(0).toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : n(1) === 1 ? s(0).toUpperCase() : n(1) === 2 ? s(0).toLowerCase() : s(0);
    case "strcomp": { const c = compare(a[0], a[1]); return c === null ? null : Math.sign(c); }
    case "chr": return String.fromCharCode(n(0) ?? 0);
    case "asc": return s(0).charCodeAt(0) || 0;
    case "dcount": case "dsum": case "davg": case "dmin": case "dmax": case "dlookup": case "dfirst": case "dlast":
      return domainAgg(f, a, ctx.db);
  }
  throw new SqlError(`Undefined function '${name}' in expression.`);
}

export function evalExpr(e: Expr, ctx: EvalCtx): V {
  switch (e.k) {
    case "num": return e.v;
    case "str": return e.v;
    case "date": return { $d: e.v };
    case "bool": return e.v;
    case "null": return null;
    case "implicit": return ctx.implicit ?? null;
    case "star": return null;
    case "paren": return evalExpr(e.e, ctx);
    case "ref": return ctx.ref(e.table, e.name);
    case "neg": { const v = evalExpr(e.e, ctx); if (v === null) return null; if (isDate(v)) return { $d: -v.$d }; return -(num(v) ?? 0); }
    case "not": { const v = evalExpr(e.e, ctx); return v === null ? null : !truthy(v); }
    case "isnull": { const v = evalExpr(e.e, ctx); return e.not ? v !== null : v === null; }
    case "like": {
      const v = evalExpr(e.e, ctx), p = evalExpr(e.pat, ctx);
      if (v === null || p === null) return null;
      const hit = likeToRegex(toText(p)).test(toText(v));
      return e.not ? !hit : hit;
    }
    case "between": {
      const v = evalExpr(e.e, ctx), lo = evalExpr(e.lo, ctx), hi = evalExpr(e.hi, ctx);
      const a = compare(v, lo), b = compare(v, hi);
      if (a === null || b === null) return null;
      const hit = a >= 0 && b <= 0;
      return e.not ? !hit : hit;
    }
    case "in": {
      const v = evalExpr(e.e, ctx);
      if (v === null) return null;
      const hit = e.list.some((x) => compare(v, evalExpr(x, ctx)) === 0);
      return e.not ? !hit : hit;
    }
    case "call": {
      if (AGGREGATES.has(e.name.toLowerCase())) {
        if (!ctx.agg) throw new SqlError(`Cannot have aggregate function in expression (${printExpr(e)}).`);
        return ctx.agg(e);
      }
      const args = e.args.map((x) => evalExpr(x, ctx));
      if (ctx.call) {
        const r = ctx.call(e.name, args, e.args);
        if (r !== undefined) return r;
      }
      return callFn(e.name, args, ctx);
    }
    case "bin": {
      if (e.op === "and") {
        const l = evalExpr(e.l, ctx);
        if (l !== null && !truthy(l)) return false;
        const r = evalExpr(e.r, ctx);
        if (r !== null && !truthy(r)) return false;
        return l === null || r === null ? null : true;
      }
      if (e.op === "or") {
        const l = evalExpr(e.l, ctx);
        if (l !== null && truthy(l)) return true;
        const r = evalExpr(e.r, ctx);
        if (r !== null && truthy(r)) return true;
        return l === null || r === null ? null : false;
      }
      const l = evalExpr(e.l, ctx), r = evalExpr(e.r, ctx);
      switch (e.op) {
        case "xor": return l === null || r === null ? null : truthy(l) !== truthy(r);
        case "eqv": return l === null || r === null ? null : truthy(l) === truthy(r);
        case "imp": return l === null || r === null ? null : !truthy(l) || truthy(r);
        case "&": return toText(l) + toText(r);
        case "=": case "<>": case "<": case ">": case "<=": case ">=": {
          const c = compare(l, r);
          if (c === null) return null;
          return e.op === "=" ? c === 0 : e.op === "<>" ? c !== 0 : e.op === "<" ? c < 0 : e.op === ">" ? c > 0 : e.op === "<=" ? c <= 0 : c >= 0;
        }
      }
      if (l === null || r === null) return null;
      if (e.op === "+") {
        if (typeof l === "string" && typeof r === "string" && (num(l) === null || num(r) === null)) return l + r;
        if (isDate(l) || isDate(r)) return { $d: (num(l) ?? 0) + (num(r) ?? 0) };
      }
      if (e.op === "-" && isDate(l) && !isDate(r)) return { $d: l.$d - (num(r) ?? 0) };
      const x = num(l), y = num(r);
      if (x === null || y === null) throw new SqlError("Data type mismatch in criteria expression.");
      switch (e.op) {
        case "+": return x + y;
        case "-": return Math.round((x - y) * 1e10) / 1e10;
        case "*": return Math.round(x * y * 1e10) / 1e10;
        case "/": if (y === 0) throw new SqlError("Division by zero."); return x / y;
        case "\\": if (y === 0) throw new SqlError("Division by zero."); return Math.trunc(bankers(x) / bankers(y));
        case "mod": if (y === 0) throw new SqlError("Division by zero."); return bankers(x) % bankers(y);
        case "^": return Math.pow(x, y);
      }
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* SQL statements                                                      */
/* ------------------------------------------------------------------ */

export type FromItem =
  | { kind: "table"; name: string; alias?: string }
  | { kind: "join"; type: "inner" | "left" | "right"; left: FromItem; right: FromItem; on: Expr };

export interface SelectItem {
  expr: Expr;
  alias?: string;
}

export interface SelectStmt {
  kind: "select";
  distinct?: boolean;
  top?: { n: number; percent?: boolean };
  items: SelectItem[];
  into?: string;
  from: FromItem[];
  where?: Expr;
  groupBy?: Expr[];
  having?: Expr;
  orderBy?: { expr: Expr; desc?: boolean }[];
  transform?: SelectItem;
  pivot?: { expr: Expr; in?: Expr[] };
}

export interface UpdateStmt {
  kind: "update";
  from: FromItem[];
  set: { table?: string; name: string; expr: Expr }[];
  where?: Expr;
}

export interface DeleteStmt {
  kind: "delete";
  from: FromItem[];
  where?: Expr;
}

export interface InsertStmt {
  kind: "insert";
  table: string;
  cols?: string[];
  select?: SelectStmt;
  values?: Expr[];
}

export type Stmt = SelectStmt | UpdateStmt | DeleteStmt | InsertStmt;

const SELECT_ERR = "The SELECT statement includes a reserved word or an argument name that is misspelled or missing, or the punctuation is incorrect.";
const FROM_ERR = "Syntax error in FROM clause.";

class SqlParser extends Parser {
  tableName(): string {
    const t = this.next();
    if (t.t === "br" || (t.t === "id" && !KEYWORDS.has(t.v.toLowerCase()))) {
      let name = t.v;
      // Allow dotted names only as a single identifier ([Sheet1$] etc. not needed).
      while (this.isP(".") && (this.peek(1).t === "id" || this.peek(1).t === "br")) {
        this.next();
        name += "." + this.next().v;
      }
      return name;
    }
    this.i--;
    throw new SqlError(FROM_ERR);
  }
  fromPrimary(): FromItem {
    if (this.eatP("(")) {
      const inner = this.fromJoin();
      if (!this.eatP(")")) throw new SqlError(FROM_ERR);
      return inner;
    }
    const name = this.tableName();
    let alias: string | undefined;
    if (this.eatKw("as")) alias = this.parseName().name;
    else if (this.peek().t === "br" || (this.peek().t === "id" && !KEYWORDS.has(this.peek().v.toLowerCase()))) alias = this.parseName().name;
    return { kind: "table", name, alias };
  }
  fromJoin(): FromItem {
    let left = this.fromPrimary();
    for (;;) {
      let type: "inner" | "left" | "right" | null = null;
      if (this.isKw("inner") && this.isKw("join", 1)) { this.i += 2; type = "inner"; }
      else if (this.isKw("join")) { this.i++; type = "inner"; }
      else if ((this.isKw("left") || this.isKw("right")) && (this.isKw("join", 1) || (this.isKw("outer", 1) && this.isKw("join", 2)))) {
        type = this.next().v.toLowerCase() as "left" | "right";
        this.eatKw("outer");
        this.expectKw("join");
      }
      if (!type) return left;
      const right = this.fromPrimary();
      if (!this.eatKw("on")) throw new SqlError("JOIN expression not supported.");
      const on = this.parseExpr();
      left = { kind: "join", type, left, right, on };
    }
  }
  fromList(): FromItem[] {
    const out = [this.fromJoin()];
    while (this.eatP(",")) out.push(this.fromJoin());
    return out;
  }
  selectItems(): SelectItem[] {
    const items: SelectItem[] = [];
    do {
      const expr = this.parseExpr();
      let alias: string | undefined;
      if (this.eatKw("as")) alias = this.parseName().name;
      items.push({ expr, alias });
    } while (this.eatP(","));
    return items;
  }
  select(): SelectStmt {
    this.expectKw("select");
    const st: SelectStmt = { kind: "select", items: [], from: [] };
    if (this.eatKw("distinct") || this.eatKw("distinctrow")) st.distinct = true;
    this.eatKw("all");
    if (this.eatKw("top")) {
      const t = this.next();
      if (t.t !== "num") throw new SqlError(SELECT_ERR);
      st.top = { n: Number(t.v), percent: this.eatKw("percent") };
    }
    try {
      st.items = this.selectItems();
    } catch (e) {
      if (e instanceof SqlError && /missing operator/.test(e.message)) throw e;
      throw new SqlError(SELECT_ERR);
    }
    if (this.eatKw("into")) st.into = this.tableName();
    if (!this.eatKw("from")) {
      if (this.peek().t === "eof" || this.isP(";")) throw new SqlError("Query input must contain at least one table or query.");
      throw new SqlError(SELECT_ERR);
    }
    st.from = this.fromList();
    if (this.eatKw("where")) st.where = this.parseExpr();
    if (this.isKw("group") && this.isKw("by", 1)) {
      this.i += 2;
      st.groupBy = [];
      do st.groupBy.push(this.parseExpr());
      while (this.eatP(","));
    }
    if (this.eatKw("having")) st.having = this.parseExpr();
    if (this.isKw("order") && this.isKw("by", 1)) {
      this.i += 2;
      st.orderBy = [];
      do {
        const expr = this.parseExpr();
        let desc = false;
        if (this.eatKw("desc")) desc = true;
        else this.eatKw("asc");
        st.orderBy.push({ expr, desc });
      } while (this.eatP(","));
    }
    return st;
  }
  statement(): Stmt {
    // PARAMETERS [x] Text ( 255 ), [y] DateTime;
    if (this.eatKw("parameters")) {
      while (!this.isP(";") && this.peek().t !== "eof") this.next();
      this.eatP(";");
    }
    let st: Stmt;
    if (this.isKw("transform")) {
      this.next();
      const expr = this.parseExpr();
      let alias: string | undefined;
      if (this.eatKw("as")) alias = this.parseName().name;
      const sel = this.select();
      sel.transform = { expr, alias };
      if (!this.eatKw("pivot")) throw new SqlError("Syntax error in TRANSFORM statement.");
      const pe = this.parseExpr();
      let inList: Expr[] | undefined;
      if (this.eatKw("in")) {
        if (!this.eatP("(")) throw new SqlError("Syntax error in TRANSFORM statement.");
        inList = [];
        do inList.push(this.parseConcat());
        while (this.eatP(","));
        if (!this.eatP(")")) throw new SqlError("Syntax error in TRANSFORM statement.");
      }
      sel.pivot = { expr: pe, in: inList };
      st = sel;
    } else if (this.isKw("select")) {
      st = this.select();
    } else if (this.eatKw("update")) {
      const from = this.fromList();
      if (!this.eatKw("set")) throw new SqlError("Syntax error in UPDATE statement.");
      const set: UpdateStmt["set"] = [];
      do {
        const target = this.parsePrimary();
        if (target.k !== "ref") throw new SqlError("Syntax error in UPDATE statement.");
        if (!this.isOp("=")) throw new SqlError("Syntax error in UPDATE statement.");
        this.next();
        set.push({ table: target.table, name: target.name, expr: this.parseExpr() });
      } while (this.eatP(","));
      const u: UpdateStmt = { kind: "update", from, set };
      if (this.eatKw("where")) u.where = this.parseExpr();
      st = u;
    } else if (this.eatKw("delete")) {
      // DELETE [t.*, t.f] FROM ...
      while (!this.isKw("from") && this.peek().t !== "eof") this.next();
      if (!this.eatKw("from")) throw new SqlError("Syntax error in DELETE statement.");
      const d: DeleteStmt = { kind: "delete", from: this.fromList() };
      if (this.eatKw("where")) d.where = this.parseExpr();
      st = d;
    } else if (this.eatKw("insert")) {
      this.expectKw("into");
      const table = this.tableName();
      const ins: InsertStmt = { kind: "insert", table };
      if (this.eatP("(")) {
        ins.cols = [];
        do {
          const r = this.parsePrimary();
          if (r.k !== "ref") throw new SqlError("Syntax error in INSERT INTO statement.");
          ins.cols.push(r.name);
        } while (this.eatP(","));
        if (!this.eatP(")")) throw new SqlError("Syntax error in INSERT INTO statement.");
      }
      if (this.eatKw("values")) {
        if (!this.eatP("(")) throw new SqlError("Syntax error in INSERT INTO statement.");
        ins.values = [];
        do ins.values.push(this.parseExpr());
        while (this.eatP(","));
        if (!this.eatP(")")) throw new SqlError("Syntax error in INSERT INTO statement.");
      } else ins.select = this.select();
      st = ins;
    } else {
      throw new SqlError("Invalid SQL statement; expected 'DELETE', 'INSERT', 'PROCEDURE', 'SELECT', or 'UPDATE'.");
    }
    this.eatP(";");
    if (this.peek().t !== "eof") throw new SqlError("Characters found after end of SQL statement.");
    return st;
  }
}

export function parseSql(src: string): Stmt {
  const p = new SqlParser(tokenize(src), src);
  return p.statement();
}

/* ------------------------------------------------------------------ */
/* Execution                                                           */
/* ------------------------------------------------------------------ */

export interface ResultSet {
  columns: string[];
  rows: V[][];
  /** For each result row, the base-table record ids it came from (table → id). */
  ids?: Record<string, string>[];
  /** For each column, the base table and field it shows (when it is a plain field). */
  origin?: ({ table: string; field: string } | null)[];
  types?: (string | undefined)[];
}

export type ActionEffect =
  | { kind: "update"; table: string; changes: { id: string; field: string; value: V }[]; count: number }
  | { kind: "delete"; table: string; ids: string[]; count: number }
  | { kind: "insert"; table: string; rows: Record<string, V>[]; count: number }
  | { kind: "maketable"; table: string; columns: string[]; types: (string | undefined)[]; rows: V[][]; count: number };

interface Src {
  alias: string;
  table: string;
  fields: { name: string; type?: string }[];
  isTable: boolean;
}

interface JRow {
  vals: Map<string, V>; // "alias.field" lowercased
  ids: Record<string, string>;
}

class Exec {
  srcs: Src[] = [];
  nullRow: Record<string, JRow> = {};
  constructor(public db: DataSource, public params: Record<string, string>, public paramOrder: string[]) {}

  srcOf(name: string) {
    const r = this.db.rows(name);
    if (!r) throw new SqlError(`The Microsoft Access database engine cannot find the input table or query '${name}'. Make sure it exists and that its name is spelled correctly.`);
    return r;
  }

  build(item: FromItem): JRow[] {
    if (item.kind === "table") {
      const r = this.srcOf(item.name);
      const alias = item.alias ?? r.name;
      this.srcs.push({ alias, table: r.name, fields: r.fields, isTable: r.isTable });
      return r.rows.map((row, i) => {
        const vals = new Map<string, V>();
        for (const f of r.fields) vals.set(`${alias.toLowerCase()}.${f.name.toLowerCase()}`, row[f.name] ?? null);
        const ids: Record<string, string> = {};
        if (r.ids) ids[alias] = r.ids[i];
        return { vals, ids };
      });
    }
    const L = this.build(item.left);
    const leftSrcs = this.srcs.slice();
    const R = this.build(item.right);
    const rightSrcs = this.srcs.filter((s) => !leftSrcs.includes(s));
    const out: JRow[] = [];
    const nullOf = (srcs: Src[]) => {
      const vals = new Map<string, V>();
      for (const s of srcs) for (const f of s.fields) vals.set(`${s.alias.toLowerCase()}.${f.name.toLowerCase()}`, null);
      return vals;
    };
    const merge = (a: JRow, b: JRow): JRow => ({ vals: new Map([...a.vals, ...b.vals]), ids: { ...a.ids, ...b.ids } });
    const matchedR = new Set<number>();
    for (const a of L) {
      let hit = false;
      R.forEach((b, j) => {
        const m = merge(a, b);
        if (truthy(this.evalRow(item.on, m))) {
          out.push(m);
          hit = true;
          matchedR.add(j);
        }
      });
      if (!hit && item.type === "left") out.push(merge(a, { vals: nullOf(rightSrcs), ids: {} }));
    }
    if (item.type === "right") R.forEach((b, j) => { if (!matchedR.has(j)) out.push(merge({ vals: nullOf(leftSrcs), ids: {} }, b)); });
    return out;
  }

  rowsFrom(from: FromItem[]): JRow[] {
    let rows: JRow[] = [{ vals: new Map(), ids: {} }];
    for (const f of from) {
      const next = this.build(f);
      const out: JRow[] = [];
      for (const a of rows) for (const b of next) out.push({ vals: new Map([...a.vals, ...b.vals]), ids: { ...a.ids, ...b.ids } });
      rows = out;
    }
    return rows;
  }

  /**
   * The data type Access gives a calculated column: Currency arithmetic stays
   * Currency (so it displays as $1.00), Sum/Min/Max keep their argument's type.
   */
  exprType(e: Expr): string | undefined {
    switch (e.k) {
      case "paren":
      case "neg":
        return this.exprType(e.e);
      case "ref": {
        let k: string | null = null;
        try { k = this.keyOf(e.table, e.name); } catch { return undefined; }
        if (!k) return undefined;
        const s = this.srcs.find((x) => k!.startsWith(x.alias.toLowerCase() + "."));
        const t = s?.fields.find((x) => x.name.toLowerCase() === k!.slice(s.alias.length + 1))?.type;
        return t === "AutoNumber" ? "Number" : t;
      }
      case "num":
        return "Number";
      case "bin": {
        if (!["+", "-", "*"].includes(e.op)) return undefined;
        const a = this.exprType(e.l), b = this.exprType(e.r);
        if ((a === "Currency" && (b === "Currency" || b === "Number")) || (b === "Currency" && a === "Number")) return "Currency";
        return a === "Number" && b === "Number" ? "Number" : undefined;
      }
      case "call": {
        const fn = e.name.toLowerCase();
        if (["sum", "min", "max", "first", "last", "avg", "nz"].includes(fn) && e.args[0]) {
          const t = this.exprType(e.args[0]);
          return fn === "avg" && t !== "Currency" ? undefined : t;
        }
        return undefined;
      }
      default:
        return undefined;
    }
  }

  /** Find the column key for a reference. */
  keyOf(table: string | undefined, name: string): string | null {
    const n = name.toLowerCase();
    if (table) {
      const t = table.toLowerCase();
      const s = this.srcs.find((x) => x.alias.toLowerCase() === t || x.table.toLowerCase() === t);
      if (!s) return null;
      const f = s.fields.find((x) => x.name.toLowerCase() === n);
      return f ? `${s.alias.toLowerCase()}.${n}` : null;
    }
    const hits = this.srcs.filter((s) => s.fields.some((f) => f.name.toLowerCase() === n));
    if (hits.length > 1) throw new SqlError(`The specified field '${name}' could refer to more than one table listed in the FROM clause of your SQL statement.`);
    if (hits.length === 1) return `${hits[0].alias.toLowerCase()}.${n}`;
    return null;
  }

  param(name: string): V {
    const key = Object.keys(this.params).find((k) => k.toLowerCase() === name.toLowerCase());
    if (key !== undefined) return this.params[key];
    if (!this.paramOrder.some((p) => p.toLowerCase() === name.toLowerCase())) this.paramOrder.push(name);
    throw new NeedParam(name);
  }

  ctxFor(row: JRow, extra?: Map<string, V>): EvalCtx {
    return {
      ref: (table, name) => {
        const k = this.keyOf(table, name);
        if (k !== null) return row.vals.get(k) ?? null;
        if (!table && extra) {
          const x = extra.get(name.toLowerCase());
          if (x !== undefined) return x;
        }
        if (table && /^forms?$/i.test(table.split(".")[0])) return this.param(`${table}!${name}`);
        return this.param(table ? `${table}.${name}` : name);
      },
      db: this.db,
    };
  }

  evalRow(e: Expr, row: JRow, extra?: Map<string, V>): V {
    return evalExpr(e, this.ctxFor(row, extra));
  }

  evalGroup(e: Expr, rows: JRow[], extra?: Map<string, V>): V {
    const first = rows[0] ?? { vals: this.nullVals(), ids: {} };
    const ctx = this.ctxFor(first, extra);
    ctx.agg = (call) => {
      const fn = call.name.toLowerCase();
      const arg = call.args[0];
      if (!arg) throw new SqlError(`Wrong number of arguments used with function in query expression '${printExpr(call)}'.`);
      if (arg.k === "star") return aggregate(fn, [], true, rows.length);
      return aggregate(fn, rows.map((r) => this.evalRow(arg, r, extra)));
    };
    return evalExpr(e, ctx);
  }

  nullVals() {
    const vals = new Map<string, V>();
    for (const s of this.srcs) for (const f of s.fields) vals.set(`${s.alias.toLowerCase()}.${f.name.toLowerCase()}`, null);
    return vals;
  }

  starCols(table?: string) {
    const out: { key: string; name: string; src: Src; field: string }[] = [];
    const srcs = table ? this.srcs.filter((s) => s.alias.toLowerCase() === table.toLowerCase() || s.table.toLowerCase() === table.toLowerCase()) : this.srcs;
    if (table && !srcs.length) throw new SqlError(`The Microsoft Access database engine cannot find the input table or query '${table}'. Make sure it exists and that its name is spelled correctly.`);
    for (const s of srcs) for (const f of s.fields) out.push({ key: `${s.alias.toLowerCase()}.${f.name.toLowerCase()}`, name: f.name, src: s, field: f.name });
    return out;
  }

  select(st: SelectStmt): ResultSet {
    this.srcs = [];
    let rows = this.rowsFrom(st.from);
    if (st.where) {
      if (hasAggregate(st.where)) throw new SqlError(`Cannot have aggregate function in WHERE clause (${printExpr(st.where)}).`);
      rows = rows.filter((r) => truthy(this.evalRow(st.where!, r)));
    }

    // Column plan.
    type Col = { name: string; expr?: Expr; key?: string; origin: { table: string; field: string } | null; type?: string };
    const cols: Col[] = [];
    let exprN = 1000;
    for (const it of st.items) {
      if (it.expr.k === "star") {
        for (const c of this.starCols(it.expr.table)) cols.push({ name: c.name, key: c.key, origin: c.src.isTable ? { table: c.src.table, field: c.field } : null, type: c.src.fields.find((f) => f.name === c.field)?.type });
        continue;
      }
      let origin: Col["origin"] = null;
      let type: string | undefined;
      let name = it.alias;
      if (it.expr.k === "ref") {
        const k = this.keyOf(it.expr.table, it.expr.name);
        if (k) {
          const s = this.srcs.find((x) => k.startsWith(x.alias.toLowerCase() + "."))!;
          const f = s.fields.find((x) => x.name.toLowerCase() === k.slice(s.alias.length + 1))!;
          if (s.isTable) origin = { table: s.table, field: f.name };
          type = f.type;
          name = name ?? f.name;
        }
      } else if (it.expr.k === "call" && AGGREGATES.has(it.expr.name.toLowerCase()) && it.expr.args[0]?.k === "ref") {
        const a = it.expr.args[0];
        const k = this.keyOf(a.table, a.name);
        if (k) {
          const s = this.srcs.find((x) => k.startsWith(x.alias.toLowerCase() + "."))!;
          const f = s.fields.find((x) => x.name.toLowerCase() === k.slice(s.alias.length + 1));
          if (f && ["sum", "min", "max", "first", "last"].includes(it.expr.name.toLowerCase())) type = f.type === "AutoNumber" ? "Number" : f.type;
        }
      }
      if (!type && it.expr.k !== "ref") type = this.exprType(it.expr);
      cols.push({ name: name ?? `Expr${exprN++}`, expr: it.expr, origin, type });
    }
    // Disambiguate duplicate names.
    const seen = new Map<string, number>();
    for (const c of cols) seen.set(c.name.toLowerCase(), (seen.get(c.name.toLowerCase()) ?? 0) + 1);
    for (const c of cols) if ((seen.get(c.name.toLowerCase()) ?? 0) > 1 && c.origin) c.name = `${c.origin.table}.${c.origin.field}`;

    const isAgg = Boolean(st.groupBy?.length) || st.items.some((i) => hasAggregate(i.expr)) || Boolean(st.having && hasAggregate(st.having));

    if (st.transform && st.pivot) return this.crosstab(st, rows, cols);

    let outRows: { vals: V[]; sortRow: JRow; group?: JRow[]; ids: Record<string, string> }[] = [];
    const aliasMap = (vals: V[]) => {
      const m = new Map<string, V>();
      cols.forEach((c, i) => m.set(c.name.toLowerCase(), vals[i]));
      return m;
    };
    if (isAgg) {
      // Check non-aggregated select expressions are grouped.
      const gb = st.groupBy ?? [];
      const gbText = gb.map((g) => printExpr(g).toLowerCase());
      for (const it of st.items) {
        if (it.expr.k === "star") throw new SqlError("Cannot group on fields selected with '*'.");
        if (hasAggregate(it.expr)) continue;
        if (it.expr.k === "num" || it.expr.k === "str" || it.expr.k === "date" || it.expr.k === "bool") continue;
        const t = printExpr(it.expr).toLowerCase();
        const refOk = it.expr.k === "ref" && gb.some((g) => g.k === "ref" && g.name.toLowerCase() === (it.expr as { name: string }).name.toLowerCase());
        if (!gbText.includes(t) && !refOk) throw new SqlError(`Your query does not include the specified expression '${printExpr(it.expr).replace(/^\[|\]$/g, "")}' as part of an aggregate function.`);
      }
      const groups = new Map<string, JRow[]>();
      if (gb.length) {
        for (const r of rows) {
          const key = JSON.stringify(gb.map((g) => { const v = this.evalRow(g, r); return isDate(v) ? `d${v.$d}` : typeof v === "string" ? v.toLowerCase() : v; }));
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key)!.push(r);
        }
      } else groups.set("all", rows);
      for (const g of groups.values()) {
        const vals: V[] = [];
        const extra = new Map<string, V>();
        cols.forEach((c) => {
          const v = c.expr ? this.evalGroup(c.expr, g, extra) : null;
          vals.push(v);
          extra.set(c.name.toLowerCase(), v);
        });
        if (st.having && !truthy(this.evalGroup(st.having, g))) continue;
        outRows.push({ vals, sortRow: g[0] ?? { vals: this.nullVals(), ids: {} }, group: g, ids: {} });
      }
      // Access returns grouped rows in ascending order of the Group By fields.
      if (gb.length && !st.orderBy?.length) {
        const keyOfRow = (o: (typeof outRows)[number]) => gb.map((x) => this.evalRow(x, o.sortRow));
        const keyed = outRows.map((o) => ({ o, k: keyOfRow(o) }));
        keyed.sort((a, b) => {
          for (let i = 0; i < gb.length; i++) {
            const x = a.k[i], y = b.k[i];
            const c = x === null && y === null ? 0 : x === null ? -1 : y === null ? 1 : compare(x, y) ?? 0;
            if (c) return c;
          }
          return 0;
        });
        outRows = keyed.map((x) => x.o);
      }
    } else {
      for (const r of rows) {
        const extra = new Map<string, V>();
        const vals = cols.map((c) => {
          const v = c.key ? r.vals.get(c.key) ?? null : c.expr ? this.evalRow(c.expr, r, extra) : null;
          extra.set(c.name.toLowerCase(), v);
          return v;
        });
        const ids: Record<string, string> = {};
        for (const s of this.srcs) if (s.isTable && r.ids[s.alias]) ids[s.table] = r.ids[s.alias];
        outRows.push({ vals, sortRow: r, ids });
      }
    }

    if (st.orderBy?.length) {
      const keys = outRows.map((o) =>
        st.orderBy!.map((ob) => {
          if (ob.expr.k === "num" && Number.isInteger(ob.expr.v)) return o.vals[ob.expr.v - 1] ?? null;
          return o.group ? this.evalGroup(ob.expr, o.group, aliasMap(o.vals)) : this.evalRow(ob.expr, o.sortRow, aliasMap(o.vals));
        }),
      );
      const idx = outRows.map((_, i) => i);
      idx.sort((a, b) => {
        for (let k = 0; k < st.orderBy!.length; k++) {
          const x = keys[a][k], y = keys[b][k];
          let c: number;
          if (x === null && y === null) c = 0;
          else if (x === null) c = -1;
          else if (y === null) c = 1;
          else c = compare(x, y) ?? 0;
          if (c !== 0) return st.orderBy![k].desc ? -c : c;
        }
        return a - b;
      });
      outRows = idx.map((i) => outRows[i]);
    }
    if (st.distinct) {
      const seenRows = new Set<string>();
      outRows = outRows.filter((o) => {
        const k = JSON.stringify(o.vals.map((v) => (typeof v === "string" ? v.toLowerCase() : v)));
        if (seenRows.has(k)) return false;
        seenRows.add(k);
        return true;
      });
    }
    if (st.top) {
      const n = st.top.percent ? Math.ceil((outRows.length * st.top.n) / 100) : st.top.n;
      outRows = outRows.slice(0, n);
    }
    return {
      columns: cols.map((c) => c.name),
      rows: outRows.map((o) => o.vals),
      ids: outRows.map((o) => o.ids),
      origin: isAgg ? cols.map(() => null) : cols.map((c) => c.origin),
      types: cols.map((c) => c.type),
    };
  }

  crosstab(st: SelectStmt, rows: JRow[], cols: { name: string; expr?: Expr }[]): ResultSet {
    const gb = st.groupBy ?? [];
    const pv = st.pivot!;
    const tf = st.transform!;
    const rowKeys = new Map<string, { vals: V[]; rows: JRow[] }>();
    const pivotVals: V[] = [];
    const pivotKey = (v: V) => (v === null ? "<>" : isDate(v) ? `d${v.$d}` : toText(v).toLowerCase());
    for (const r of rows) {
      const gv = gb.map((g) => this.evalRow(g, r));
      const k = JSON.stringify(gv.map((v) => (isDate(v) ? `d${v.$d}` : typeof v === "string" ? v.toLowerCase() : v)));
      if (!rowKeys.has(k)) rowKeys.set(k, { vals: gv, rows: [] });
      rowKeys.get(k)!.rows.push(r);
      const p = this.evalRow(pv.expr, r);
      if (!pivotVals.some((x) => pivotKey(x) === pivotKey(p))) pivotVals.push(p);
    }
    let heads: V[] = pv.in ? pv.in.map((e) => evalExpr(e, this.ctxFor({ vals: new Map(), ids: {} }))) : pivotVals.slice().sort((a, b) => (a === null ? -1 : b === null ? 1 : compare(a, b) ?? 0));
    if (!pv.in) heads = heads.filter((h, i, arr) => arr.findIndex((x) => pivotKey(x) === pivotKey(h)) === i);
    const outCols = cols.map((c) => c.name).concat(heads.map((h) => (h === null ? "<>" : toText(h))));
    const out: V[][] = [];
    for (const g of rowKeys.values()) {
      const base = cols.map((c) => (c.expr ? this.evalGroup(c.expr, g.rows) : null));
      for (const h of heads) {
        const sub = g.rows.filter((r) => pivotKey(this.evalRow(pv.expr, r)) === pivotKey(h));
        base.push(sub.length ? this.evalGroup(tf.expr, sub) : null);
      }
      out.push(base);
    }
    // Row headings sort ascending, as Access does.
    out.sort((a, b) => {
      for (let i = 0; i < cols.length; i++) {
        const c = compare(a[i], b[i]);
        if (c) return c;
      }
      return 0;
    });
    return { columns: outCols, rows: out, origin: outCols.map(() => null), types: [] };
  }

  update(st: UpdateStmt): ActionEffect {
    this.srcs = [];
    const rows = this.rowsFrom(st.from).filter((r) => !st.where || truthy(this.evalRow(st.where, r)));
    const first = st.set[0];
    const tKey = first ? this.keyOf(first.table, first.name) : null;
    if (!tKey) throw new NeedParam(first ? (first.table ? `${first.table}.${first.name}` : first.name) : "?");
    const src = this.srcs.find((s) => tKey.startsWith(s.alias.toLowerCase() + "."))!;
    const changes: { id: string; field: string; value: V }[] = [];
    const ids = new Set<string>();
    for (const r of rows) {
      const id = r.ids[src.alias];
      if (!id) continue;
      ids.add(id);
      for (const s of st.set) {
        const k = this.keyOf(s.table, s.name);
        if (!k) throw new NeedParam(s.name);
        const f = src.fields.find((x) => `${src.alias.toLowerCase()}.${x.name.toLowerCase()}` === k);
        if (!f) continue;
        changes.push({ id, field: f.name, value: this.evalRow(s.expr, r) });
      }
    }
    return { kind: "update", table: src.table, changes, count: ids.size };
  }

  delete(st: DeleteStmt): ActionEffect {
    this.srcs = [];
    const rows = this.rowsFrom(st.from).filter((r) => !st.where || truthy(this.evalRow(st.where, r)));
    const src = this.srcs[0];
    const ids = Array.from(new Set(rows.map((r) => r.ids[src.alias]).filter(Boolean)));
    return { kind: "delete", table: src.table, ids, count: ids.length };
  }
}

export interface RunResult {
  result?: ResultSet;
  effect?: ActionEffect;
}

/** Names of the parameters a statement needs, in prompt order (static analysis). */
export function findParams(st: Stmt, db: DataSource): string[] {
  const ex = new Exec(db, {}, []);
  const out: string[] = [];
  const add = (n: string) => {
    if (!out.some((x) => x.toLowerCase() === n.toLowerCase())) out.push(n);
  };
  const scan = (e: Expr | undefined, aliases: Set<string>) => {
    if (!e) return;
    walkExpr(e, (x) => {
      if (x.k !== "ref") return;
      let k: string | null = null;
      try {
        k = ex.keyOf(x.table, x.name);
      } catch {
        k = "ambiguous";
      }
      if (k !== null) return;
      if (!x.table && aliases.has(x.name.toLowerCase())) return;
      add(x.table ? `${x.table}${x.bang ? "!" : "."}${x.name}` : x.name);
    });
  };
  try {
    if (st.kind === "select") {
      ex.rowsFrom(st.from);
      const aliases = new Set<string>();
      if (st.transform) scan(st.transform.expr, aliases);
      for (const it of st.items) {
        scan(it.expr, aliases);
        if (it.alias) aliases.add(it.alias.toLowerCase());
      }
      scan(st.where, new Set());
      st.groupBy?.forEach((g) => scan(g, new Set()));
      scan(st.having, new Set());
      st.orderBy?.forEach((o) => scan(o.expr, aliases));
      if (st.pivot) scan(st.pivot.expr, new Set());
    } else if (st.kind === "update") {
      ex.rowsFrom(st.from);
      st.set.forEach((s) => scan(s.expr, new Set()));
      scan(st.where, new Set());
    } else if (st.kind === "delete") {
      ex.rowsFrom(st.from);
      scan(st.where, new Set());
    } else if (st.kind === "insert" && st.select) {
      return findParams(st.select, db);
    }
  } catch {
    return out;
  }
  return out;
}

export function runStmt(st: Stmt, db: DataSource, params: Record<string, string> = {}): RunResult {
  const ex = new Exec(db, params, []);
  if (st.kind === "select") {
    const result = ex.select(st);
    if (st.into) return { result, effect: { kind: "maketable", table: st.into, columns: result.columns, types: result.types ?? [], rows: result.rows, count: result.rows.length } };
    return { result };
  }
  if (st.kind === "update") return { effect: ex.update(st) };
  if (st.kind === "delete") return { effect: ex.delete(st) };
  // insert
  const target = db.rows(st.table);
  if (!target) throw new SqlError(`The Microsoft Access database engine cannot find the output table '${st.table}'.`);
  if (st.values) {
    const row: Record<string, V> = {};
    const cols = st.cols ?? target.fields.map((f) => f.name);
    st.values.forEach((e, i) => (row[cols[i]] = evalExpr(e, { ref: (_t, n) => ex.param(n), db })));
    return { effect: { kind: "insert", table: target.name, rows: [row], count: 1 } };
  }
  const res = ex.select(st.select!);
  const cols = st.cols ?? res.columns;
  const rows = res.rows.map((r) => {
    const o: Record<string, V> = {};
    cols.forEach((c, i) => {
      const f = target.fields.find((x) => x.name.toLowerCase() === c.toLowerCase());
      if (f) o[f.name] = r[i] ?? null;
    });
    return o;
  });
  return { effect: { kind: "insert", table: target.name, rows, count: rows.length } };
}

/** Evaluate a stand-alone expression (validation rules, default values, the Immediate window). */
export function evalStandalone(src: string, db?: DataSource, implicit?: V, fields?: Record<string, V>): V {
  const e = implicit !== undefined ? parseCriteria(src) : parseExpr(src);
  return evalExpr(e, {
    implicit,
    db,
    ref: (_t, n) => {
      if (fields) {
        const k = Object.keys(fields).find((x) => x.toLowerCase() === n.toLowerCase());
        if (k !== undefined) return fields[k];
      }
      throw new SqlError(`The expression contains an unknown name: '${n}'.`);
    },
  });
}

/** Pretty-print SQL the way Access lays it out in SQL view (one clause per line). */
export function layoutSql(sql: string): string {
  return sql
    .replace(/\s+/g, " ")
    .replace(/\s+(FROM|WHERE|GROUP BY|HAVING|ORDER BY|PIVOT|SET|VALUES)\s+/g, "\n$1 ")
    .replace(/\s*;\s*$/, ";")
    .trim();
}
