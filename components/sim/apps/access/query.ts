import type { AccessDoc, AccJoin, AccQuery, AccQueryCol, TotalFunc } from "./types";
import {
  type ActionEffect,
  type Expr,
  type FromItem,
  type ResultSet,
  type SelectStmt,
  type Stmt,
  type V,
  bindImplicit,
  findParams,
  formatValue,
  layoutSql,
  NeedParam,
  parseCriteria,
  parseExpr,
  parseSql,
  printCriteria,
  printExpr,
  qn,
  runStmt,
  SqlError,
  AGGREGATES,
  hasAggregate,
} from "./sql";
import { dataSource, findField, findQuery, findTable, registerQueryRunner } from "./data";

/* ------------------------------------------------------------------ */
/* Grid columns                                                        */
/* ------------------------------------------------------------------ */

/** Split a Field cell: "Total: [Qty]*[Price]" → alias + expression. */
export function splitField(s: string): { alias?: string; expr: string } {
  const m = /^\s*([^:[\]"'#()!.]+?)\s*:\s*(.+)$/.exec(s);
  if (m && !/^(forms|reports)$/i.test(m[1])) return { alias: m[1].trim(), expr: m[2].trim() };
  return { expr: s.trim() };
}

/**
 * Tidy a Field cell the way Access redisplays it when you leave the cell:
 * "TotalCost:[Quantity] * UnitCost" → "TotalCost: [Quantity]*[UnitCost]".
 * Plain field names and "Table.*" stay as typed.
 */
export function normalizeFieldCell(raw: string): string {
  const s = raw.trim();
  if (!s) return s;
  const { alias, expr } = splitField(s);
  if (!alias && (/^\[?[\w ]+\]?$/.test(expr) || /\*$/.test(expr) || /^[\w ]+\.[\w ]+$/.test(expr))) return s;
  try {
    const e = printExpr(parseExpr(expr));
    return alias ? `${alias}: ${e}` : e;
  } catch {
    return s;
  }
}

/** The visible name of a grid column, used in qcell targets. */
export function colKey(c: AccQueryCol): string {
  const { alias, expr } = splitField(c.field);
  if (alias) return alias;
  if (expr === "*") return `${c.table ?? ""}.*`;
  return expr.replace(/^\[|\]$/g, "");
}

const isPlainName = (s: string) => /^\[?[^[\]()*+\-/&<>=",]+\]?$/.test(s) && !/^\d/.test(s);

/** Which table owns a bare field name in this query. */
export function tableForField(doc: AccessDoc, q: AccQuery, name: string): string | undefined {
  for (const t of q.tables) {
    const tb = findTable(doc, t);
    if (tb && findField(tb, name)) return tb.name;
    const qq = findQuery(doc, t);
    if (qq && qq.name !== q.name) {
      try {
        const src = dataSource(doc).rows(qq.name);
        if (src?.fields.some((f) => f.name.toLowerCase() === name.toLowerCase())) return qq.name;
      } catch {
        // ignore
      }
    }
  }
  return undefined;
}

/** Expression for a grid column (without its alias). */
export function colExpr(doc: AccessDoc, q: AccQuery, c: AccQueryCol): Expr {
  const { alias, expr } = splitField(c.field);
  if (expr === "*" || /\.\*$/.test(expr)) return { k: "star", table: c.table ?? (expr.endsWith(".*") ? expr.slice(0, -2) : undefined) };
  if (!alias && isPlainName(expr)) {
    const name = expr.replace(/^\[|\]$/g, "");
    const table = c.table ?? tableForField(doc, q, name);
    return table ? { k: "ref", table, name } : { k: "ref", name };
  }
  return parseExpr(expr);
}

const aggAlias = (fn: TotalFunc, c: AccQueryCol) => {
  const { alias, expr } = splitField(c.field);
  if (alias) return alias;
  const name = expr.replace(/^\[|\]$/g, "").replace(/^.*\./, "");
  return `${fn}Of${name}`;
};

/* ------------------------------------------------------------------ */
/* Grid → SQL                                                          */
/* ------------------------------------------------------------------ */

function fromSql(q: AccQuery): string {
  const tables = q.tables.slice();
  if (!tables.length) throw new SqlError("Query input must contain at least one table or query.");
  const joins = (q.joins ?? []).filter((j) => tables.includes(j.left) && tables.includes(j.right));
  const used: string[] = [];
  const parts: string[] = [];
  const remaining = new Set(tables);
  const pairKey = (a: string, b: string) => [a, b].sort().join("|");
  while (remaining.size) {
    const start = tables.find((t) => remaining.has(t))!;
    let expr = qn(start);
    remaining.delete(start);
    used.push(start);
    let joinedCount = 1;
    for (;;) {
      const j = joins.find((x) => (used.includes(x.left) && remaining.has(x.right)) || (used.includes(x.right) && remaining.has(x.left)));
      if (!j) break;
      const other = remaining.has(j.right) ? j.right : j.left;
      const conds = joins.filter((x) => pairKey(x.left, x.right) === pairKey(j.left, j.right)).map((x) => `${qn(x.left)}.${qn(x.leftField)} = ${qn(x.right)}.${qn(x.rightField)}`);
      let type = "INNER JOIN";
      if (j.type === "left") type = other === j.right ? "LEFT JOIN" : "RIGHT JOIN";
      if (j.type === "right") type = other === j.right ? "RIGHT JOIN" : "LEFT JOIN";
      expr = `${joinedCount > 1 ? `(${expr})` : expr} ${type} ${qn(other)} ON ${conds.join(" AND ")}`;
      remaining.delete(other);
      used.push(other);
      joinedCount++;
    }
    parts.push(expr);
  }
  return parts.join(", ");
}

function critRows(doc: AccessDoc, q: AccQuery, cols: AccQueryCol[], subject: (c: AccQueryCol) => Expr): string | null {
  const nRows = Math.max(1, ...cols.map((c) => 1 + (c.or?.length ?? 0)));
  const rows: string[] = [];
  for (let r = 0; r < nRows; r++) {
    const conds: string[] = [];
    for (const c of cols) {
      const text = (r === 0 ? c.criteria : c.or?.[r - 1])?.trim();
      if (!text) continue;
      let e: Expr;
      try {
        e = parseCriteria(text);
      } catch {
        throw new SqlError(`Syntax error in query expression '${text}'.`);
      }
      const subj = subject(c);
      conds.push(printExpr(bindImplicit(e, { k: "paren", e: subj })));
    }
    if (conds.length) rows.push(`(${conds.map((c) => `(${c})`).join(" AND ")})`);
  }
  if (!rows.length) return null;
  return rows.join(" OR ");
}

export function gridToSql(doc: AccessDoc, q: AccQuery): string {
  const from = fromSql(q);
  const cols = q.cols.filter((c) => c.field.trim());
  const ex = (c: AccQueryCol) => colExpr(doc, q, c);
  const ord = (c: AccQueryCol) => (c.sort === "Descending" ? " DESC" : "");
  const top = q.topValues && q.topValues !== "All" ? ` TOP ${q.topValues.replace("%", "")}${q.topValues.includes("%") ? " PERCENT" : ""}` : "";
  const distinct = q.unique ? " DISTINCT" : "";

  if (q.type === "Update") {
    const sets = cols.filter((c) => c.updateTo?.trim()).map((c) => `${printExpr(ex(c))} = ${c.updateTo!.trim()}`);
    if (!sets.length) throw new SqlError("Query must have at least one destination field.");
    const where = critRows(doc, q, cols, ex);
    return `UPDATE ${from} SET ${sets.join(", ")}${where ? `\nWHERE ${where}` : ""};`;
  }
  if (q.type === "Delete") {
    const where = critRows(doc, q, cols, ex);
    const targets = cols.length ? cols.map((c) => printExpr(ex(c))).join(", ") : "*";
    return `DELETE ${targets}\nFROM ${from}${where ? `\nWHERE ${where}` : ""};`;
  }
  if (q.type === "Crosstab") {
    const rowH = cols.filter((c) => c.crosstab === "Row Heading");
    const colH = cols.find((c) => c.crosstab === "Column Heading");
    const val = cols.find((c) => c.crosstab === "Value");
    if (!rowH.length || !colH || !val) throw new SqlError("You must specify at least one Row Heading, one Column Heading, and one Value for a crosstab query.");
    const fn = val.total && val.total !== "Group By" && val.total !== "Expression" && val.total !== "Where" ? val.total : "Count";
    const vExpr = val.total === "Expression" ? printExpr(ex(val)) : `${fn}(${printExpr(ex(val))})`;
    const sel = rowH.map((c) => { const a = splitField(c.field).alias; return a ? `${printExpr(ex(c))} AS ${qn(a)}` : printExpr(ex(c)); });
    const where = critRows(doc, q, cols.filter((c) => c.total === "Where" || c.crosstab === "(not shown)"), ex);
    return `TRANSFORM ${vExpr} AS ${qn(aggAlias(fn, val))}\nSELECT ${sel.join(", ")}\nFROM ${from}${where ? `\nWHERE ${where}` : ""}\nGROUP BY ${rowH.map((c) => printExpr(ex(c))).join(", ")}\nPIVOT ${printExpr(ex(colH))};`;
  }

  // Select / Make Table / Append
  const shown = cols.filter((c) => c.show !== false && c.total !== "Where");
  let items: string[];
  let where: string | null;
  let having: string | null = null;
  let groupBy: string[] = [];
  let orderBy: string[];
  if (q.totals) {
    const aggOf = (c: AccQueryCol): Expr => {
      const e = ex(c);
      const fn = c.total ?? "Group By";
      if (fn === "Group By" || fn === "Expression" || fn === "Where") return e;
      return { k: "call", name: fn, args: [e.k === "star" ? { k: "star" } : e] };
    };
    items = shown.map((c) => {
      const fn = c.total ?? "Group By";
      const e = printExpr(aggOf(c));
      if (fn === "Group By") { const a = splitField(c.field).alias; return a ? `${printExpr(ex(c))} AS ${qn(a)}` : e; }
      if (fn === "Expression") return `${e} AS ${qn(splitField(c.field).alias ?? "Expr1")}`;
      return `${e} AS ${qn(aggAlias(fn, c))}`;
    });
    where = critRows(doc, q, cols.filter((c) => c.total === "Where"), ex);
    having = critRows(doc, q, cols.filter((c) => c.total !== "Where"), aggOf);
    groupBy = cols.filter((c) => (c.total ?? "Group By") === "Group By").map((c) => printExpr(ex(c)));
    orderBy = cols.filter((c) => c.sort).map((c) => printExpr(aggOf(c)) + ord(c));
  } else {
    items = shown.map((c) => {
      const e = ex(c);
      const a = splitField(c.field).alias;
      return a ? `${printExpr(e)} AS ${qn(a)}` : printExpr(e);
    });
    where = critRows(doc, q, cols, ex);
    orderBy = cols.filter((c) => c.sort).map((c) => printExpr(ex(c)) + ord(c));
  }
  if (!items.length) throw new SqlError("Query must have at least one destination field.");
  const tail = `\nFROM ${from}${where ? `\nWHERE ${where}` : ""}${groupBy.length ? `\nGROUP BY ${groupBy.join(", ")}` : ""}${having ? `\nHAVING ${having}` : ""}${orderBy.length ? `\nORDER BY ${orderBy.join(", ")}` : ""};`;
  if (q.type === "Make Table") {
    if (!q.target) throw new SqlError("Enter a name for the new table.");
    return `SELECT${distinct}${top} ${items.join(", ")} INTO ${qn(q.target)}${tail}`;
  }
  if (q.type === "Append") {
    if (!q.target) throw new SqlError("Enter the name of the table to append to.");
    const ap = cols.filter((c) => c.appendTo?.trim() && c.total !== "Where");
    if (!ap.length) throw new SqlError("Query must have at least one destination field.");
    const sel = ap.map((c) => printExpr(ex(c)));
    return `INSERT INTO ${qn(q.target)} ( ${ap.map((c) => qn(c.appendTo!.trim())).join(", ")} )\nSELECT${distinct}${top} ${sel.join(", ")}${tail}`;
  }
  return `SELECT${distinct}${top} ${items.join(", ")}${tail}`;
}

/** The SQL a query runs: typed SQL if it was authored in SQL view, else the grid. */
export function queryText(doc: AccessDoc, q: AccQuery): string {
  return q.sql ?? gridToSql(doc, q);
}

/* ------------------------------------------------------------------ */
/* SQL → grid                                                          */
/* ------------------------------------------------------------------ */

function flattenFrom(items: FromItem[], tables: string[], joins: AccJoin[]): boolean {
  const visit = (f: FromItem): boolean => {
    if (f.kind === "table") {
      if (!tables.includes(f.name)) tables.push(f.name);
      return !f.alias || f.alias === f.name;
    }
    if (!visit(f.left) || !visit(f.right)) return false;
    const conds: Expr[] = [];
    const split = (e: Expr) => {
      if (e.k === "bin" && e.op === "and") { split(e.l); split(e.r); }
      else if (e.k === "paren") split(e.e);
      else conds.push(e);
    };
    split(f.on);
    for (const c of conds) {
      if (c.k !== "bin" || c.op !== "=" || c.l.k !== "ref" || c.r.k !== "ref" || !c.l.table || !c.r.table) return false;
      joins.push({ left: c.l.table, leftField: c.l.name, right: c.r.table, rightField: c.r.name, type: f.type === "inner" ? "inner" : f.type });
    }
    return true;
  };
  return items.every(visit);
}

const unparen = (e: Expr): Expr => (e.k === "paren" ? unparen(e.e) : e);

function splitOr(e: Expr): Expr[] {
  const x = unparen(e);
  if (x.k === "bin" && x.op === "or") return [...splitOr(x.l), ...splitOr(x.r)];
  return [x];
}
function splitAnd(e: Expr): Expr[] {
  const x = unparen(e);
  if (x.k === "bin" && x.op === "and") return [...splitAnd(x.l), ...splitAnd(x.r)];
  return [x];
}

/** Subject of a condition (its left side) and the condition with the subject made implicit. */
function condSubject(c: Expr): { subject: Expr; crit: string } | null {
  const x = unparen(c);
  const subj = (e: Expr) => unparen(e);
  if (x.k === "bin" && ["=", "<>", "<", ">", "<=", ">="].includes(x.op)) return { subject: subj(x.l), crit: printCriteria({ ...x, l: { k: "implicit" } }) };
  if (x.k === "like" || x.k === "between" || x.k === "in" || x.k === "isnull") return { subject: subj(x.e), crit: printCriteria({ ...x, e: { k: "implicit" } } as Expr) };
  if (x.k === "not") {
    const inner = condSubject(x.e);
    return inner ? { subject: inner.subject, crit: `Not ${inner.crit}` } : null;
  }
  return null;
}

/** Turn SQL back into the design grid, as Access does when you switch to Design view. */
export function sqlToGrid(doc: AccessDoc, sql: string): Partial<AccQuery> | null {
  let st: Stmt;
  try {
    st = parseSql(sql);
  } catch {
    return null;
  }
  const tables: string[] = [];
  const joins: AccJoin[] = [];
  const cols: AccQueryCol[] = [];
  const out: Partial<AccQuery> = { tables, joins, cols };
  const realName = (n: string) => findTable(doc, n)?.name ?? findQuery(doc, n)?.name ?? n;
  const tmpQ = (): AccQuery => ({ name: "", type: "Select", tables, cols: [] });
  const resolveRef = (e: Expr): { field: string; table?: string } | null => {
    if (e.k === "ref") {
      const table = e.table ? realName(e.table) : tableForField(doc, tmpQ(), e.name);
      return { field: e.name, table };
    }
    return null;
  };
  const sameSubject = (c: AccQueryCol, subj: Expr) => {
    const r = resolveRef(subj);
    if (r) return !splitField(c.field).alias && c.field.replace(/^\[|\]$/g, "").toLowerCase() === r.field.toLowerCase() && (!r.table || !c.table || c.table.toLowerCase() === r.table.toLowerCase());
    return splitField(c.field).expr.toLowerCase() === printExpr(subj).toLowerCase();
  };
  const colFor = (subj: Expr, init: Partial<AccQueryCol> = {}) => {
    let c = cols.find((x) => sameSubject(x, subj));
    if (!c) {
      const r = resolveRef(subj);
      c = r ? { field: r.field, table: r.table, show: false, ...init } : { field: printExpr(subj), show: false, ...init };
      cols.push(c);
    }
    return c;
  };
  const putWhere = (where: Expr | undefined, filter?: (c: AccQueryCol) => void) => {
    if (!where) return true;
    const rows = splitOr(where);
    for (let ri = 0; ri < rows.length; ri++) {
      for (const cond of splitAnd(rows[ri])) {
        const cs = condSubject(cond);
        if (!cs) return false;
        const c = colFor(cs.subject);
        filter?.(c);
        if (ri === 0) c.criteria = cs.crit;
        else {
          c.or = c.or ?? [];
          while (c.or.length < ri - 1) c.or.push("");
          c.or[ri - 1] = cs.crit;
        }
      }
    }
    return true;
  };

  const fromItems = st.kind === "insert" ? st.select?.from ?? [] : st.from;
  if (!flattenFrom(fromItems, tables, joins)) return null;
  for (let i = 0; i < tables.length; i++) tables[i] = realName(tables[i]);
  for (const j of joins) {
    j.left = realName(j.left);
    j.right = realName(j.right);
  }

  if (st.kind === "update") {
    out.type = "Update";
    for (const s of st.set) {
      const c = colFor({ k: "ref", table: s.table, name: s.name });
      c.updateTo = printExpr(s.expr);
      c.show = undefined;
    }
    if (!putWhere(st.where)) return null;
    return out;
  }
  if (st.kind === "delete") {
    out.type = "Delete";
    if (!putWhere(st.where)) return null;
    return out;
  }
  const sel: SelectStmt | undefined = st.kind === "insert" ? st.select : st;
  if (!sel) return null;
  if (st.kind === "insert") {
    out.type = "Append";
    out.target = realName(st.table);
  } else if (sel.into) {
    out.type = "Make Table";
    out.target = sel.into;
  } else if (sel.transform) out.type = "Crosstab";
  else out.type = "Select";
  if (sel.distinct) out.unique = true;
  if (sel.top) out.topValues = `${sel.top.n}${sel.top.percent ? "%" : ""}`;
  const totals = Boolean(sel.groupBy?.length) || sel.items.some((i) => hasAggregate(i.expr));
  if (totals && out.type !== "Crosstab") out.totals = true;
  sel.items.forEach((it, idx) => {
    const e = it.expr;
    if (e.k === "star") {
      cols.push({ field: e.table ? `${realName(e.table)}.*` : "*", table: e.table ? realName(e.table) : tables[0], show: true });
      return;
    }
    let col: AccQueryCol;
    if (e.k === "call" && AGGREGATES.has(e.name.toLowerCase()) && e.args.length === 1 && out.totals) {
      const fn = (["Sum", "Avg", "Min", "Max", "Count", "StDev", "Var", "First", "Last"].find((f) => f.toLowerCase() === e.name.toLowerCase()) ?? "Sum") as TotalFunc;
      const arg = e.args[0];
      const r = resolveRef(arg);
      const base = r ? r.field : printExpr(arg);
      const auto = `${fn}Of${r ? r.field : ""}`;
      col = { field: it.alias && it.alias !== auto ? `${it.alias}: ${r ? `[${base}]` : base}` : base, table: r?.table, total: fn, show: true };
    } else {
      const r = !it.alias ? resolveRef(e) : null;
      col = r ? { field: r.field, table: r.table, show: true } : { field: `${it.alias ?? `Expr${1000 + idx}`}: ${printExpr(e)}`, show: true };
      if (out.totals) col.total = sel.groupBy?.some((g) => printExpr(g).toLowerCase() === printExpr(e).toLowerCase() || (g.k === "ref" && e.k === "ref" && g.name.toLowerCase() === e.name.toLowerCase())) ? "Group By" : "Expression";
    }
    if (st.kind === "insert" && st.cols?.[idx]) col.appendTo = st.cols[idx];
    if (out.type === "Crosstab") col.crosstab = "Row Heading";
    cols.push(col);
  });
  if (out.type === "Crosstab" && sel.transform && sel.pivot) {
    const r = resolveRef(sel.pivot.expr);
    cols.push(r ? { field: r.field, table: r.table, total: "Group By", crosstab: "Column Heading" } : { field: `Expr1: ${printExpr(sel.pivot.expr)}`, total: "Group By", crosstab: "Column Heading" });
    const t = unparen(sel.transform.expr);
    if (t.k === "call" && AGGREGATES.has(t.name.toLowerCase()) && t.args.length === 1) {
      const vr = resolveRef(t.args[0]);
      const fn = (["Sum", "Avg", "Min", "Max", "Count"].find((f) => f.toLowerCase() === t.name.toLowerCase()) ?? "Sum") as TotalFunc;
      cols.push(vr ? { field: vr.field, table: vr.table, total: fn, crosstab: "Value" } : { field: printExpr(t.args[0]), total: fn, crosstab: "Value" });
    } else return null;
    for (const c of cols) if (c.crosstab === "Row Heading") c.total = "Group By";
  }
  if (!putWhere(sel.where, (c) => { if (out.totals && !c.total) { c.total = "Where"; c.show = false; } })) return null;
  if (sel.having) {
    // Criteria on aggregate columns.
    for (const cond of splitAnd(sel.having)) {
      const cs = condSubject(cond);
      if (!cs) return null;
      const s = unparen(cs.subject);
      const c = cols.find((x) => {
        if (s.k === "call" && x.total && x.total.toLowerCase() === s.name.toLowerCase()) {
          const r = resolveRef(s.args[0]);
          return r ? splitField(x.field).expr.replace(/^\[|\]$/g, "").toLowerCase() === r.field.toLowerCase() : true;
        }
        return sameSubject(x, s);
      });
      if (!c) return null;
      c.criteria = cs.crit;
    }
  }
  for (const ob of sel.orderBy ?? []) {
    const e = unparen(ob.expr);
    const c = cols.find((x) => sameSubject(x, e) || (e.k === "ref" && splitField(x.field).alias?.toLowerCase() === e.name.toLowerCase())) ?? colFor(e);
    c.sort = ob.desc ? "Descending" : "Ascending";
  }
  for (const g of sel.groupBy ?? []) {
    if (!cols.some((x) => sameSubject(x, unparen(g)))) colFor(unparen(g), { total: "Group By" });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Running                                                             */
/* ------------------------------------------------------------------ */

export interface RunOutcome {
  sql?: string;
  result?: ResultSet;
  effect?: ActionEffect;
  needParams?: string[];
  error?: string;
}

function preview(st: Stmt): Stmt {
  // Datasheet view of an action query shows the rows it would touch.
  if (st.kind === "update") return { kind: "select", items: st.set.map((s) => ({ expr: { k: "ref", table: s.table, name: s.name } as Expr })), from: st.from, where: st.where };
  if (st.kind === "delete") return { kind: "select", items: [{ expr: { k: "star" } }], from: st.from, where: st.where };
  if (st.kind === "insert" && st.select) return st.select;
  if (st.kind === "select" && st.into) return { ...st, into: undefined };
  return st;
}

export function runQuery(doc: AccessDoc, q: AccQuery, params: Record<string, string> = {}, opts: { previewOnly?: boolean } = {}): RunOutcome {
  let sql: string;
  try {
    sql = queryText(doc, q);
  } catch (e) {
    return { error: (e as Error).message };
  }
  let st: Stmt;
  try {
    st = parseSql(sql);
  } catch (e) {
    return { sql, error: (e as Error).message };
  }
  const db = dataSource(doc, params);
  const needed = findParams(st, db).filter((p) => !Object.keys(params).some((k) => k.toLowerCase() === p.toLowerCase()));
  if (needed.length) return { sql, needParams: needed };
  try {
    const r = runStmt(opts.previewOnly ? preview(st) : st, db, params);
    return { sql, result: r.result, effect: opts.previewOnly ? undefined : r.effect };
  } catch (e) {
    if (e instanceof NeedParam) return { sql, needParams: [e.param] };
    return { sql, error: (e as Error).message };
  }
}

registerQueryRunner((doc, name, params) => {
  const q = findQuery(doc, name);
  if (!q) throw new SqlError(`The Microsoft Access database engine cannot find the input table or query '${name}'.`);
  const r = runQuery(doc, q, params, { previewOnly: true });
  if (r.needParams?.length) throw new NeedParam(r.needParams[0]);
  if (r.error || !r.result) throw new SqlError(r.error ?? "Query failed.");
  return r.result;
});

/** A compact text form of a result set, used to judge query results. */
export function resultSignature(r: ResultSet): string {
  const cell = (v: V, i: number) => formatValue(v, r.types?.[i]);
  const rows = r.rows.map((row) => row.map(cell).join(" | "));
  return `${r.rows.length} rows: ${rows.join(" ; ")}`;
}

export function formatSql(sql: string) {
  return layoutSql(sql);
}

/** Action query confirmation text, as Access words it. */
export function actionMessage(effect: ActionEffect): string {
  const n = effect.count;
  switch (effect.kind) {
    case "update": return `You are about to update ${n} row(s).\n\nOnce you click Yes, you can't use the Undo command to reverse the changes.\nAre you sure you want to update these records?`;
    case "delete": return `You are about to delete ${n} row(s) from the specified table.\n\nOnce you click Yes, you can't use the Undo command to reverse the changes.\nAre you sure you want to delete the selected records?`;
    case "insert": return `You are about to append ${n} row(s).\n\nOnce you click Yes, you can't use the Undo command to reverse the changes.\nAre you sure you want to append the selected rows?`;
    case "maketable": return `You are about to paste ${n} row(s) into a new table.\n\nOnce you click Yes, you can't use the Undo command to reverse the changes.\nAre you sure you want to create a new table with the selected records?`;
  }
}
