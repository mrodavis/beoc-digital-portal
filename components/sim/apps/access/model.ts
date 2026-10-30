import type { DialogDef, SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import type {
  AccControl,
  AccessDoc,
  AccField,
  AccForm,
  AccMacro,
  AccPrompt,
  AccQuery,
  AccQueryCol,
  AccRecord,
  AccRelationship,
  AccReport,
  AccTab,
  AccTable,
  AccView,
  AccDataType,
  DatasheetView,
  QueryType,
  TotalFunc,
} from "./types";
import { DATA_TYPES, TOTAL_FUNCS } from "./types";
import {
  checkEntry,
  convertValues,
  dataSource,
  deletePlan,
  defaultFor,
  displayValue,
  findField,
  findForm,
  findMacro,
  findModule,
  findQuery,
  findReport,
  findTable,
  nameTaken,
  newField,
  newRecord,
  nextRowId,
  objectExists,
  orientRel,
  parseInput,
  relKey,
  rowValue,
  storedToV,
  vToStored,
} from "./data";
import { actionMessage, colKey, queryText, resultSignature, runQuery, splitField, sqlToGrid, tableForField } from "./query";
import { buildForm, buildReport, controlForField, documenter, exportFile, importSheet, nextName, nextNumbered, sourceFields } from "./build";
import { applyTemplate, TEMPLATE_NAMES } from "./templates";
import { compare, formatValue, isDate, normalizeCriteria, parseCriteria, toText, type ActionEffect, type V } from "./sql";
import { immediate, runVba, type VbaAction } from "./vba";
import { DATE_SAMPLES, TIME_SAMPLES } from "./dialogs";

type D = AccessDoc;
const clone = <T,>(x: T): T => (typeof structuredClone === "function" ? structuredClone(x) : JSON.parse(JSON.stringify(x)));
const eq = (a: string | undefined, b: string | undefined) => (a ?? "").toLowerCase() === (b ?? "").toLowerCase();
const yes = (v: unknown) => /^(yes|true|-1|on)$/i.test(String(v).trim());

/* ------------------------------------------------------------------ */
/* Selection keys                                                      */
/* ------------------------------------------------------------------ */

export type Sel =
  | { k: "nav"; kind: string; name: string }
  | { k: "cell"; obj: string; row: string; field: string }
  | { k: "col"; obj: string; field: string }
  | { k: "row"; obj: string; row: string }
  | { k: "field"; table: string; field: string }
  | { k: "qcol"; query: string; n: number }
  | { k: "qtable"; query: string; table: string }
  | { k: "qjoin"; query: string; left: string; leftField: string; right: string; rightField: string }
  | { k: "rel"; table: string; field: string; relatedTable: string; relatedField: string }
  | { k: "reltable"; table: string }
  | { k: "ctl"; obj: string; id: string }
  | { k: "sec"; obj: string; section: string }
  | { k: "form"; obj: string }
  | { k: "mact"; macro: string; n: number }
  | { k: "vba"; module: string }
  | { k: "qprops"; query: string }
  | { k: "none" };

export function parseSel(sel: string | undefined): Sel {
  const s = sel ?? "";
  const i = s.indexOf(":");
  if (i < 0) return { k: "none" };
  const pre = s.slice(0, i);
  const rest = s.slice(i + 1);
  const dot = (x: string) => x.split(".");
  switch (pre) {
    case "nav": {
      const j = rest.indexOf(":");
      return j < 0 ? { k: "none" } : { k: "nav", kind: rest.slice(0, j), name: rest.slice(j + 1) };
    }
    case "cell": {
      const p = dot(rest);
      return p.length >= 3 ? { k: "cell", obj: p[0], row: p[1], field: p.slice(2).join(".") } : { k: "none" };
    }
    case "col": {
      const p = dot(rest);
      return p.length >= 2 ? { k: "col", obj: p[0], field: p.slice(1).join(".") } : { k: "none" };
    }
    case "row": {
      const p = dot(rest);
      return p.length >= 2 ? { k: "row", obj: p[0], row: p[1] } : { k: "none" };
    }
    case "field": {
      const p = dot(rest);
      return p.length >= 2 ? { k: "field", table: p[0], field: p.slice(1).join(".") } : { k: "none" };
    }
    case "qcol": {
      const p = dot(rest);
      return { k: "qcol", query: p[0], n: Number(p[1]) || 0 };
    }
    case "qtable": {
      const p = dot(rest);
      return { k: "qtable", query: p[0], table: p.slice(1).join(".") };
    }
    case "qjoin": {
      const j = rest.indexOf(".");
      const q = rest.slice(0, j);
      const [a, b] = rest.slice(j + 1).split("-");
      const [l, lf] = dot(a ?? "");
      const [r, rf] = dot(b ?? "");
      return { k: "qjoin", query: q, left: l, leftField: lf ?? "", right: r ?? "", rightField: rf ?? "" };
    }
    case "rel": {
      const [a, b] = rest.split("-");
      const [t, f] = dot(a ?? "");
      const [rt, rf] = dot(b ?? "");
      return { k: "rel", table: t, field: f ?? "", relatedTable: rt ?? "", relatedField: rf ?? "" };
    }
    case "reltable": return { k: "reltable", table: rest };
    case "ctl": {
      const j = rest.indexOf(".");
      return j < 0 ? { k: "none" } : { k: "ctl", obj: rest.slice(0, j), id: rest.slice(j + 1) };
    }
    case "sec": {
      const j = rest.indexOf(".");
      return j < 0 ? { k: "none" } : { k: "sec", obj: rest.slice(0, j), section: rest.slice(j + 1) };
    }
    case "form": return { k: "form", obj: rest };
    case "mact": {
      const p = dot(rest);
      return { k: "mact", macro: p[0], n: Number(p[1]) || 0 };
    }
    case "vba": return { k: "vba", module: rest };
    case "qprops": return { k: "qprops", query: rest };
  }
  return { k: "none" };
}

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */

export const activeTab = (d: D): AccTab | undefined => d.open.find((t) => t.id === d.active);

export const DEFAULT_VIEW: Record<string, AccView> = {
  table: "Datasheet View",
  query: "Datasheet View",
  form: "Form View",
  report: "Report View",
  macro: "Design View",
  relationships: "Design View",
  documenter: "Print Preview",
};

export function viewsFor(kind: string, q?: AccQuery): AccView[] {
  switch (kind) {
    case "table": return ["Datasheet View", "Design View"];
    case "query": return q?.type === "Select" || q?.type === "Crosstab" || !q ? ["Datasheet View", "SQL View", "Design View"] : ["Datasheet View", "SQL View", "Design View"];
    case "form": return ["Form View", "Datasheet View", "Layout View", "Design View"];
    case "report": return ["Report View", "Print Preview", "Layout View", "Design View"];
    case "macro": return ["Design View"];
    default: return [];
  }
}

function openTab(d: D, kind: AccTab["kind"], name: string, view: AccView): AccTab {
  const id = `${kind}:${name}`;
  let t = d.open.find((x) => x.id === id);
  if (!t) {
    t = { id, kind, name, view };
    d.open.push(t);
  } else {
    if (view === "Print Preview" && t.view !== "Print Preview") t.prevView = t.view;
    t.view = view;
  }
  if (kind === "form" && view === "Form View" && t.record === undefined) t.record = 0;
  d.active = id;
  snapshot(d, t);
  return t;
}

/** Remember the object as it was when its design was opened, for "No" on close. */
function snapshot(d: D, t: AccTab) {
  if (t.orig || !(t.view === "Design View" || t.view === "Layout View" || t.view === "SQL View")) return;
  const o = t.kind === "table" ? findTable(d, t.name) : t.kind === "query" ? findQuery(d, t.name) : t.kind === "form" ? findForm(d, t.name) : t.kind === "report" ? findReport(d, t.name) : t.kind === "macro" ? findMacro(d, t.name) : undefined;
  if (o && o.saved !== false) t.orig = JSON.stringify(o);
}

function restoreObject(d: D, t: AccTab) {
  if (!t.orig) return;
  const o = JSON.parse(t.orig);
  const swap = <T extends { name: string }>(list: T[]) => list.map((x) => (eq(x.name, t.name) ? (o as T) : x));
  if (t.kind === "table") d.tables = swap(d.tables);
  if (t.kind === "query") d.queries = swap(d.queries);
  if (t.kind === "form") d.forms = swap(d.forms);
  if (t.kind === "report") d.reports = swap(d.reports);
  if (t.kind === "macro") d.macros = swap(d.macros);
}

function closeTab(d: D, id: string) {
  const i = d.open.findIndex((t) => t.id === id);
  if (i < 0) return;
  const t = d.open[i];
  // A draft that was never saved disappears with its tab.
  if (t.kind === "table") { const tb = findTable(d, t.name); if (tb && tb.saved === false) d.tables = d.tables.filter((x) => x !== tb); }
  if (t.kind === "query") { const q = findQuery(d, t.name); if (q && q.saved === false) d.queries = d.queries.filter((x) => x !== q); }
  if (t.kind === "form") { const f = findForm(d, t.name); if (f && f.saved === false) d.forms = d.forms.filter((x) => x !== f); }
  if (t.kind === "report") { const r = findReport(d, t.name); if (r && r.saved === false) d.reports = d.reports.filter((x) => x !== r); }
  if (t.kind === "macro") { const m = findMacro(d, t.name); if (m && m.saved === false) d.macros = d.macros.filter((x) => x !== m); }
  d.open.splice(i, 1);
  if (d.active === id) d.active = d.open[Math.max(0, i - 1)]?.id ?? null;
  if (d.designInsert && t.kind === "table" && eq(d.designInsert.table, t.name)) d.designInsert = null;
}

function renameTabs(d: D, kind: string, from: string, to: string) {
  for (const t of d.open) {
    if (t.kind === kind && eq(t.name, from)) {
      const old = t.id;
      t.name = to;
      t.id = `${kind}:${to}`;
      if (d.active === old) d.active = t.id;
    }
  }
}

function markDirty(d: D) {
  const t = activeTab(d);
  if (t && (t.view === "Design View" || t.view === "Layout View" || t.view === "SQL View" || t.kind === "macro")) t.dirty = true;
}

/* ------------------------------------------------------------------ */
/* Object helpers                                                      */
/* ------------------------------------------------------------------ */

function allNames(d: D) {
  return [...d.tables, ...d.queries, ...d.forms, ...d.reports, ...d.macros, ...d.modules].map((o) => o.name);
}

function prompt(d: D, p: AccPrompt) {
  d.prompt = { ...p, nonce: (d.prompt?.nonce ?? 0) + 1 };
}

function message(d: D, text: string, icon: AccPrompt["icon"] = "warning", title = "Microsoft Access") {
  prompt(d, { kind: "message", text, icon, title });
}

/** The table and field a field-level command acts on. */
export function selField(d: D, ui: SimUi): { t: AccTable; f: AccField } | null {
  const s = parseSel(ui.selection);
  let table: string | undefined;
  let field: string | undefined;
  if (s.k === "field") { table = s.table; field = s.field; }
  else if (s.k === "col" || s.k === "cell") { table = s.obj; field = s.field; }
  if (!table || !field) return null;
  const t = findTable(d, table);
  const f = findField(t, field);
  return t && f ? { t, f } : null;
}

/** The object whose datasheet a sort/filter/format command acts on. */
function dsTarget(d: D, ui: SimUi): { obj: AccTable | AccQuery; isTable: boolean; field?: string; row?: string } | null {
  const s = parseSel(ui.selection);
  let name: string | undefined;
  let field: string | undefined;
  let row: string | undefined;
  if (s.k === "col" || s.k === "cell" || s.k === "row") {
    name = s.obj;
    field = s.k === "row" ? undefined : s.field;
    row = s.k === "row" || s.k === "cell" ? s.row : undefined;
  } else {
    const t = activeTab(d);
    if (t && (t.kind === "table" || t.kind === "query") && t.view === "Datasheet View") name = t.name;
  }
  if (!name) return null;
  const t = findTable(d, name);
  if (t) return { obj: t, isTable: true, field, row };
  const q = findQuery(d, name);
  if (q) return { obj: q, isTable: false, field, row };
  return null;
}

function viewOf(o: AccTable | AccQuery): DatasheetView {
  o.view = o.view ?? {};
  return o.view;
}

/** The form or report a control/section key points at (the active tab first). */
function designObj(d: D, name: string): { form?: AccForm; report?: AccReport } {
  const t = activeTab(d);
  if (t && eq(t.name, name)) {
    if (t.kind === "form") return { form: findForm(d, name) };
    if (t.kind === "report") return { report: findReport(d, name) };
  }
  const f = findForm(d, name);
  if (f) return { form: f };
  return { report: findReport(d, name) };
}

function activeDesign(d: D): { form?: AccForm; report?: AccReport; tab?: AccTab } {
  const t = activeTab(d);
  if (t?.kind === "form") return { form: findForm(d, t.name), tab: t };
  if (t?.kind === "report") return { report: findReport(d, t.name), tab: t };
  return {};
}

function nextCtlId(controls: AccControl[], base: string) {
  const taken = new Set(controls.map((c) => c.id.toLowerCase()));
  for (let i = 1; i < 999; i++) if (!taken.has(`${base}${i}`.toLowerCase())) return `${base}${i}`;
  return `${base}999`;
}

/* ------------------------------------------------------------------ */
/* Renames                                                             */
/* ------------------------------------------------------------------ */

function renameObject(d: D, kind: string, from: string, to: string) {
  if (!to.trim() || eq(from, to) && from === to) return;
  if (kind === "table") {
    const t = findTable(d, from);
    if (!t) return;
    t.name = to;
    for (const r of d.relationships) {
      if (eq(r.table, from)) r.table = to;
      if (eq(r.relatedTable, from)) r.relatedTable = to;
    }
    d.relLayout = (d.relLayout ?? []).map((x) => (eq(x, from) ? to : x));
  }
  if (kind === "query") {
    const q = findQuery(d, from);
    if (!q) return;
    q.name = to;
  }
  if (kind === "table" || kind === "query") {
    for (const q of d.queries) {
      q.tables = q.tables.map((x) => (eq(x, from) ? to : x));
      for (const j of q.joins ?? []) {
        if (eq(j.left, from)) j.left = to;
        if (eq(j.right, from)) j.right = to;
      }
      for (const c of q.cols) if (eq(c.table, from)) c.table = to;
      if (eq(q.target, from)) q.target = to;
    }
    for (const f of d.forms) if (eq(f.recordSource, from)) f.recordSource = to;
    for (const r of d.reports) if (eq(r.recordSource, from)) r.recordSource = to;
  }
  if (kind === "form") { const f = findForm(d, from); if (f) f.name = to; }
  if (kind === "report") { const r = findReport(d, from); if (r) r.name = to; }
  if (kind === "macro") { const m = findMacro(d, from); if (m) m.name = to; }
  if (kind === "module") { const m = findModule(d, from); if (m) m.name = to; }
  renameTabs(d, kind, from, to);
}

function renameField(d: D, t: AccTable, from: string, to: string) {
  const f = findField(t, from);
  if (!f || !to.trim()) return;
  const old = f.name;
  f.name = to;
  for (const r of t.rows) {
    if (old in r) {
      r[to] = r[old];
      if (to !== old) delete r[old];
    }
  }
  t.pk = t.pk?.map((k) => (eq(k, old) ? to : k));
  for (const r of d.relationships) {
    if (eq(r.table, t.name) && eq(r.field, old)) r.field = to;
    if (eq(r.relatedTable, t.name) && eq(r.relatedField, old)) r.relatedField = to;
  }
  for (const q of d.queries) {
    if (!q.tables.some((x) => eq(x, t.name))) continue;
    for (const c of q.cols) if ((eq(c.table, t.name) || !c.table) && eq(c.field, old)) c.field = to;
    for (const j of q.joins ?? []) {
      if (eq(j.left, t.name) && eq(j.leftField, old)) j.leftField = to;
      if (eq(j.right, t.name) && eq(j.rightField, old)) j.rightField = to;
    }
  }
  for (const fm of d.forms) if (eq(fm.recordSource, t.name)) for (const c of fm.controls) if (eq(c.source, old)) { c.source = to; if (eq(c.id, old)) c.id = to; }
  for (const rp of d.reports) {
    if (!eq(rp.recordSource, t.name)) continue;
    rp.fields = rp.fields.map((x) => (eq(x, old) ? to : x));
    for (const g of rp.groups ?? []) if (eq(g.field, old)) g.field = to;
    for (const s of rp.sorts ?? []) if (eq(s.field, old)) s.field = to;
    for (const s of rp.totals ?? []) if (eq(s.field, old)) s.field = to;
  }
  for (const v of [t.view]) {
    if (!v) continue;
    v.sort = v.sort?.map((s) => (eq(s.field, old) ? { ...s, field: to } : s));
    v.filter = v.filter?.map((s) => (eq(s.field, old) ? { ...s, field: to } : s));
  }
}

/* ------------------------------------------------------------------ */
/* Field properties                                                    */
/* ------------------------------------------------------------------ */

export const NUMBER_SIZES = ["Byte", "Integer", "Long Integer", "Single", "Double", "Replication ID", "Decimal"];
export const INDEXED = ["No", "Yes (Duplicates OK)", "Yes (No Duplicates)"] as const;

function setFieldProp(d: D, t: AccTable, f: AccField, prop: string, value: string) {
  const v = value.trim();
  switch (prop.toLowerCase()) {
    case "field size":
      if (f.type === "Short Text") {
        const n = Math.max(1, Math.min(255, Number(v) || 255));
        f.size = String(n);
        for (const r of t.rows) if (typeof r[f.name] === "string" && (r[f.name] as string).length > n) r[f.name] = (r[f.name] as string).slice(0, n);
      } else f.size = NUMBER_SIZES.find((x) => eq(x, v)) ?? v;
      return;
    case "format": f.format = v || undefined; return;
    case "decimal places": f.decimalPlaces = v || undefined; return;
    case "input mask": f.inputMask = v || undefined; return;
    case "caption": f.caption = v || undefined; return;
    case "default value": f.defaultValue = v || undefined; return;
    case "validation rule": f.validationRule = v || undefined; return;
    case "validation text": f.validationText = v || undefined; return;
    case "required": f.required = yes(v); return;
    case "allow zero length": f.allowZeroLength = yes(v); return;
    case "indexed": f.indexed = (INDEXED.find((x) => eq(x, v)) ?? "No") as AccField["indexed"]; return;
    case "description": f.description = v || undefined; return;
    case "expression": f.expression = v || undefined; return;
    case "new values": f.newValues = /random/i.test(v) ? "Random" : "Increment"; return;
    case "row source":
      f.lookup = { ...(f.lookup ?? {}), ...(/;/.test(v) || /^"/.test(v) ? { values: v.split(";").map((x) => x.trim().replace(/^"(.*)"$/, "$1")).filter(Boolean), table: undefined } : { table: v.replace(/^select .* from\s+/i, "").replace(/;$/, ""), values: undefined }) };
      return;
    case "limit to list": f.lookup = { ...(f.lookup ?? {}), limitToList: yes(v) }; return;
    case "display control": if (/text box/i.test(v)) f.lookup = undefined; else f.lookup = f.lookup ?? { values: [] }; return;
  }
  f.props = { ...(f.props ?? {}), [prop]: v };
}

function setControlProp(c: AccControl, prop: string, value: string, owner: { controls: AccControl[] }) {
  const v = value.trim();
  switch (prop.toLowerCase()) {
    case "caption": if (c.kind === "label" || c.kind === "button") c.caption = v; else c.label = v; return;
    case "control source": c.source = v || undefined; return;
    case "name": if (v && !owner.controls.some((x) => x !== c && eq(x.id, v))) c.id = v; return;
    case "format": c.format = v || undefined; return;
    case "row source": c.rowSource = v; return;
    case "row source type": c.rowSourceType = (["Table/Query", "Value List", "Field List"].find((x) => eq(x, v)) ?? "Table/Query") as AccControl["rowSourceType"]; return;
    case "limit to list": c.limitToList = yes(v); return;
    case "locked": c.locked = yes(v); return;
    case "enabled": c.enabled = yes(v); return;
    case "visible": c.visible = yes(v); return;
    case "tab stop": c.tabStop = yes(v); return;
    case "width": c.width = Number(v.replace(/[^\d.]/g, "")) || c.width; return;
    case "font size": c.fontSize = Number(v) || c.fontSize; return;
    case "font weight": c.bold = /bold|heavy|semi/i.test(v); return;
    case "font italic": c.italic = yes(v); return;
    case "fore color": c.color = v; return;
    case "back color": c.fill = v; return;
    case "text align": c.align = (["Left", "Center", "Right"].find((x) => eq(x, v)) ?? undefined) as AccControl["align"]; return;
    case "on click": c.onClick = v || undefined; return;
  }
}

function setFormProp(f: AccForm, prop: string, value: string) {
  const v = value.trim();
  switch (prop.toLowerCase()) {
    case "caption": f.caption = v || undefined; return;
    case "record source": f.recordSource = v; return;
    case "default view": f.defaultView = (["Single Form", "Continuous Forms", "Datasheet", "Split Form"].find((x) => eq(x, v)) ?? "Single Form") as AccForm["defaultView"]; return;
    case "allow additions": f.allowAdditions = yes(v); return;
    case "allow edits": f.allowEdits = yes(v); return;
    case "allow deletions": f.allowDeletions = yes(v); return;
    case "data entry": f.dataEntry = yes(v); return;
    case "record selectors": f.recordSelectors = yes(v); return;
    case "navigation buttons": f.navigationButtons = yes(v); return;
    case "on load": f.onLoad = v || undefined; return;
    case "back color": f.fill = v; return;
  }
}

/* ------------------------------------------------------------------ */
/* Datasheet entry                                                     */
/* ------------------------------------------------------------------ */

function typeCell(d: D, table: string, rowId: string, field: string, raw: string) {
  const t = findTable(d, table);
  const f = findField(t, field);
  if (!t || !f) return;
  let row = t.rows.find((r) => r._id === rowId);
  if (!row) {
    // A new record: typing in the (New) row creates it with its defaults.
    row = newRecord(d, t, rowId);
    const p = parseInput(f, raw);
    if (!p.ok) return;
    t.rows.push(row);
  }
  const r = checkEntry(d, t, rowId, f, raw);
  if (!r.ok) {
    // The window has already shown the message; the validator may still play it.
    const p = parseInput(f, raw);
    if (p.ok) row[f.name] = p.value;
    return;
  }
  row[f.name] = r.value;
  for (const c of r.cascade ?? []) {
    const ct = findTable(d, c.table);
    if (!ct) continue;
    for (const kid of ct.rows) if (c.ids.includes(kid._id)) kid[c.field] = c.value;
  }
}

function deleteRows(d: D, table: string, ids: string[]) {
  const t = findTable(d, table);
  if (!t) return;
  const plan = deletePlan(d, table, ids);
  if (plan.blocked) return;
  t.rows = t.rows.filter((r) => !ids.includes(r._id));
  for (const c of plan.cascade) {
    const ct = findTable(d, c.table);
    if (ct) ct.rows = ct.rows.filter((r) => !c.ids.includes(r._id));
  }
}

/* ------------------------------------------------------------------ */
/* Queries                                                             */
/* ------------------------------------------------------------------ */

const ACTION_TYPES: QueryType[] = ["Make Table", "Append", "Update", "Delete"];

function bumpRun(d: D, q: string) {
  d.lastRun = { query: q, n: (d.lastRun?.n ?? 0) + 1 };
}

function paramPrompt(d: D, params: string[], then: NonNullable<AccPrompt["then"]>, collected: Record<string, string> = {}) {
  prompt(d, { kind: "param", title: "Enter Parameter Value", param: params[0], pending: params.slice(1), collected, then, query: then.kind === "query" ? then.name : undefined });
}

/** Open or run a query, asking for parameters first. */
function startQuery(d: D, q: AccQuery, run: boolean) {
  const pre = runQuery(d, q, {}, { previewOnly: true });
  if (pre.needParams?.length) {
    paramPrompt(d, pre.needParams, { kind: "query", name: q.name, run });
    return;
  }
  finishQuery(d, q, {}, run);
}

function finishQuery(d: D, q: AccQuery, params: Record<string, string>, run: boolean) {
  const isAction = ACTION_TYPES.includes(q.type);
  if (run && isAction) {
    const r = runQuery(d, q, params);
    if (r.error) return message(d, r.error);
    if (!r.effect) return;
    prompt(d, { kind: "confirm", icon: "warning", title: "Microsoft Access", text: actionMessage(r.effect), yes: { id: "query.execute", value: q.name }, params, query: q.name });
    return;
  }
  const r = runQuery(d, q, params, { previewOnly: true });
  if (r.error) return message(d, r.error);
  const tab = openTab(d, "query", q.name, "Datasheet View");
  tab.params = Object.keys(params).length ? params : undefined;
  bumpRun(d, q.name);
}

function startSource(d: D, kind: "form" | "report", name: string, source: string, view: AccView): boolean {
  const q = findQuery(d, source);
  if (!q) return false;
  const pre = runQuery(d, q, {}, { previewOnly: true });
  if (pre.needParams?.length && (view === "Form View" || view === "Report View" || view === "Print Preview" || view === "Layout View")) {
    paramPrompt(d, pre.needParams, { kind, name, view });
    return true;
  }
  return false;
}

function applyEffect(d: D, e: ActionEffect) {
  if (e.kind === "maketable") {
    const fields: AccField[] = e.columns.map((c, i) => {
      const sample = e.rows.find((r) => r[i] !== null)?.[i];
      let type = (e.types[i] as AccDataType | undefined) ?? undefined;
      if (type === "AutoNumber") type = "Number";
      if (!type || !DATA_TYPES.includes(type)) type = typeof sample === "number" ? "Number" : isDate(sample) ? "Date/Time" : typeof sample === "boolean" ? "Yes/No" : "Short Text";
      const f = newField(c.replace(/^.*\./, ""), type);
      if (type === "Number") f.size = "Double";
      return f;
    });
    const t: AccTable = {
      name: e.table,
      fields,
      rows: e.rows.map((r, ri) => {
        const rec: AccRecord = { _id: `r${ri + 1}` };
        fields.forEach((f, i) => (rec[f.name] = vToStored(f.type, r[i] ?? null)));
        return rec;
      }),
    };
    d.tables = d.tables.filter((x) => !eq(x.name, e.table));
    d.tables.push(t);
    d.status = `${e.count} row(s) pasted into ${e.table}`;
    return;
  }
  const t = findTable(d, e.table);
  if (!t) return;
  if (e.kind === "update") {
    for (const ch of e.changes) {
      const row = t.rows.find((r) => r._id === ch.id);
      const f = findField(t, ch.field);
      if (row && f && f.type !== "AutoNumber" && f.type !== "Calculated") row[f.name] = vToStored(f.type, ch.value);
    }
    d.status = `${e.count} row(s) updated`;
  }
  if (e.kind === "delete") {
    const ok = e.ids.filter((id) => !deletePlan(d, t.name, [id]).blocked);
    deleteRows(d, t.name, ok);
    d.status = `${ok.length} row(s) deleted`;
  }
  if (e.kind === "insert") {
    for (const src of e.rows) {
      const rec = newRecord(d, t, nextRowId(t));
      for (const [k, v] of Object.entries(src)) {
        const f = findField(t, k);
        if (!f || f.type === "Calculated") continue;
        if (f.type === "AutoNumber" && (v === null || t.rows.some((r) => compare(storedToV(f.type, r[f.name]), v) === 0))) continue;
        rec[f.name] = vToStored(f.type, v);
      }
      t.rows.push(rec);
    }
    d.status = `${e.count} row(s) appended`;
  }
}

function qcolIndex(q: AccQuery, key: string): number {
  if (/^\d+$/.test(key)) return Number(key) - 1;
  return q.cols.findIndex((c) => eq(colKey(c), key) || eq(splitField(c.field).expr.replace(/^\[|\]$/g, ""), key));
}

function nextExprName(q: AccQuery) {
  const taken = new Set(q.cols.map((c) => splitField(c.field).alias?.toLowerCase()).filter(Boolean));
  for (let i = 1; i < 99; i++) if (!taken.has(`expr${i}`)) return `Expr${i}`;
  return "Expr99";
}

function setFieldCell(d: D, q: AccQuery, col: AccQueryCol, text: string) {
  let t = text.trim();
  const dotted = /^\[?([^[\].]+)\]?\.\[?([^[\]]+?)\]?$/.exec(t);
  if (dotted && (findTable(d, dotted[1]) || findQuery(d, dotted[1]))) {
    col.table = findTable(d, dotted[1])?.name ?? findQuery(d, dotted[1])?.name;
    col.field = dotted[2] === "*" ? `${col.table}.*` : dotted[2];
    return;
  }
  const { alias, expr } = splitField(t);
  if (!alias) {
    const bare = expr.replace(/^\[|\]$/g, "");
    if (/^[^[\]()*+\-/&<>=",]+$/.test(bare) && !/^\d/.test(bare)) {
      const owner = tableForField(d, q, bare);
      if (owner || !/\s/.test(bare)) {
        col.field = bare;
        col.table = owner ?? col.table;
        return;
      }
    }
    if (/[()*+\-/&]/.test(expr) || /^\[.*\]$/.test(expr)) t = `${nextExprName(q)}: ${expr}`;
  }
  col.field = t;
  col.table = undefined;
}

function autoJoins(d: D, q: AccQuery, added: string) {
  q.joins = q.joins ?? [];
  for (const other of q.tables) {
    if (eq(other, added)) continue;
    const rels = d.relationships.filter((r) => (eq(r.table, other) && eq(r.relatedTable, added)) || (eq(r.table, added) && eq(r.relatedTable, other)));
    for (const r of rels) {
      if (q.joins.some((j) => eq(j.left, r.table) && eq(j.right, r.relatedTable) && eq(j.leftField, r.field))) continue;
      q.joins.push({ left: r.table, leftField: r.field, right: r.relatedTable, rightField: r.relatedField, type: r.join === 2 ? "left" : r.join === 3 ? "right" : "inner" });
    }
    if (!rels.length) {
      // AutoJoin: same name, same type, one side is a primary key.
      const a = findTable(d, other), b = findTable(d, added);
      if (!a || !b) continue;
      for (const fa of a.fields) {
        const fb = findField(b, fa.name);
        if (!fb) continue;
        const aPk = a.pk?.length === 1 && eq(a.pk[0], fa.name);
        const bPk = b.pk?.length === 1 && eq(b.pk[0], fb.name);
        if (!aPk && !bPk) continue;
        if (aPk && bPk) continue;
        const one = aPk ? a : b, many = aPk ? b : a;
        if (!q.joins.some((j) => eq(j.left, one.name) && eq(j.right, many.name))) q.joins.push({ left: one.name, leftField: fa.name, right: many.name, rightField: fa.name, type: "inner" });
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Macros                                                              */
/* ------------------------------------------------------------------ */

export const MACRO_ACTIONS = ["ApplyFilter", "Beep", "CloseWindow", "Comment", "FindRecord", "GoToRecord", "MaximizeWindow", "MessageBox", "OpenForm", "OpenQuery", "OpenReport", "OpenTable", "QuitAccess", "RunCode", "RunMacro", "SetValue"];

export const MACRO_ARGS: Record<string, { name: string; options?: string[] | "forms" | "reports" | "queries" | "tables" | "macros"; def?: string; required?: boolean }[]> = {
  OpenForm: [
    { name: "Form Name", options: "forms", required: true },
    { name: "View", options: ["Form", "Design", "Print Preview", "Datasheet", "PivotTable", "PivotChart", "Layout"], def: "Form" },
    { name: "Filter Name" },
    { name: "Where Condition" },
    { name: "Data Mode", options: ["Add", "Edit", "Read Only"] },
    { name: "Window Mode", options: ["Normal", "Hidden", "Icon", "Dialog"], def: "Normal" },
  ],
  OpenReport: [
    { name: "Report Name", options: "reports", required: true },
    { name: "View", options: ["Print", "Design", "Print Preview", "Report", "Layout"], def: "Report" },
    { name: "Filter Name" },
    { name: "Where Condition" },
    { name: "Window Mode", options: ["Normal", "Hidden", "Icon", "Dialog"], def: "Normal" },
  ],
  OpenQuery: [
    { name: "Query Name", options: "queries", required: true },
    { name: "View", options: ["Datasheet", "Design", "Print Preview", "PivotTable", "PivotChart"], def: "Datasheet" },
    { name: "Data Mode", options: ["Add", "Edit", "Read Only"], def: "Edit" },
  ],
  OpenTable: [
    { name: "Table Name", options: "tables", required: true },
    { name: "View", options: ["Datasheet", "Design", "Print Preview"], def: "Datasheet" },
    { name: "Data Mode", options: ["Add", "Edit", "Read Only"], def: "Edit" },
  ],
  MessageBox: [
    { name: "Message", required: true },
    { name: "Beep", options: ["Yes", "No"], def: "Yes" },
    { name: "Type", options: ["None", "Critical", "Warning?", "Warning!", "Information"], def: "None" },
    { name: "Title" },
  ],
  CloseWindow: [
    { name: "Object Type", options: ["Table", "Query", "Form", "Report", "Macro", "Module"] },
    { name: "Object Name" },
    { name: "Save", options: ["Prompt", "Yes", "No"], def: "Prompt" },
  ],
  GoToRecord: [
    { name: "Object Type", options: ["Table", "Query", "Form"] },
    { name: "Object Name" },
    { name: "Record", options: ["Previous", "Next", "First", "Last", "Go To", "New"], def: "Next" },
    { name: "Offset" },
  ],
  RunMacro: [
    { name: "Macro Name", options: "macros", required: true },
    { name: "Repeat Count" },
    { name: "Repeat Expression" },
  ],
  ApplyFilter: [
    { name: "Filter Name" },
    { name: "Where Condition" },
    { name: "Control Name" },
  ],
  QuitAccess: [{ name: "Options", options: ["Prompt", "Save All", "Exit"], def: "Save All" }],
  SetValue: [{ name: "Item", required: true }, { name: "Expression", required: true }],
  RunCode: [{ name: "Function Name", required: true }],
  FindRecord: [{ name: "Find What", required: true }, { name: "Match", options: ["Whole Field", "Any Part of Field", "Start of Field"], def: "Whole Field" }],
  MaximizeWindow: [],
  Beep: [],
  Comment: [{ name: "Comment" }],
};

function macroDefaults(action: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const a of MACRO_ARGS[action] ?? []) if (a.def) out[a.name] = a.def;
  return out;
}

const MACRO_VIEW: Record<string, AccView> = { Form: "Form View", Design: "Design View", "Print Preview": "Print Preview", Datasheet: "Datasheet View", Layout: "Layout View", Report: "Report View", Print: "Print Preview" };

function runMacro(d: D, m: AccMacro | { name: string; actions: AccMacro["actions"] }, depth = 0) {
  if (depth > 4) return;
  const msgs: AccPrompt[] = [];
  for (const a of m.actions) {
    const g = (k: string) => a.args[k] ?? "";
    switch (a.action) {
      case "OpenForm": {
        const f = findForm(d, g("Form Name"));
        if (!f) { msgs.push({ kind: "message", icon: "warning", title: "Microsoft Access", text: `The action or method requires a Form Name argument.` }); break; }
        const tab = openTab(d, "form", f.name, MACRO_VIEW[g("View") || "Form"] ?? "Form View");
        tab.params = g("Where Condition") ? { __where: g("Where Condition") } : undefined;
        tab.record = g("Data Mode") === "Add" ? -1 : 0;
        break;
      }
      case "OpenReport": {
        const r = findReport(d, g("Report Name"));
        if (!r) { msgs.push({ kind: "message", icon: "warning", title: "Microsoft Access", text: `The action or method requires a Report Name argument.` }); break; }
        const tab = openTab(d, "report", r.name, MACRO_VIEW[g("View") || "Report"] ?? "Report View");
        tab.params = g("Where Condition") ? { __where: g("Where Condition") } : undefined;
        break;
      }
      case "OpenQuery": {
        const q = findQuery(d, g("Query Name"));
        if (q) {
          if (g("View") === "Design") openTab(d, "query", q.name, "Design View");
          else startQuery(d, q, true);
        }
        break;
      }
      case "OpenTable": {
        const t = findTable(d, g("Table Name"));
        if (t) openTab(d, "table", t.name, g("View") === "Design" ? "Design View" : "Datasheet View");
        break;
      }
      case "MessageBox": msgs.push({ kind: "message", icon: g("Type") === "Critical" ? "error" : g("Type") === "Information" ? "info" : g("Type").startsWith("Warning") ? "warning" : "none", title: g("Title") || "Microsoft Access", text: g("Message") }); break;
      case "CloseWindow": {
        const kind = g("Object Type").toLowerCase();
        const name = g("Object Name");
        const id = kind && name ? `${kind}:${name}` : d.active;
        if (id) closeTab(d, d.open.find((t) => eq(t.id, id))?.id ?? id);
        break;
      }
      case "GoToRecord": {
        const t = activeTab(d);
        if (t && t.kind === "form") navRecord(d, t, g("Record") || "Next", g("Offset"));
        break;
      }
      case "RunMacro": {
        const mm = findMacro(d, g("Macro Name"));
        if (mm) runMacro(d, mm, depth + 1);
        break;
      }
      case "ApplyFilter": {
        const t = activeTab(d);
        if (t && (t.kind === "form" || t.kind === "report")) t.params = { ...(t.params ?? {}), __where: g("Where Condition") };
        break;
      }
      case "QuitAccess": msgs.push({ kind: "message", icon: "info", title: "Microsoft Access", text: "QuitAccess would close Access now. (The practice window stays open so you can keep working.)" }); break;
    }
  }
  if (msgs.length) {
    const [first, ...rest] = msgs;
    prompt(d, { ...first, queue: rest });
  }
}

function formRecordCount(d: D, f: AccForm, tab?: AccTab): number {
  const src = dataSource(d, tab?.params ?? {}).rows(f.recordSource);
  return src?.rows.length ?? 0;
}

function navRecord(d: D, tab: AccTab, how: string, offset?: string) {
  const f = findForm(d, tab.name);
  if (!f) return;
  const n = formRecordCount(d, f, tab);
  const cur = tab.record ?? 0;
  switch (how) {
    case "First": tab.record = 0; break;
    case "Previous": tab.record = cur <= 0 ? (cur === -1 ? n - 1 : 0) : cur - 1; break;
    case "Next": tab.record = cur === -1 ? -1 : cur + 1 >= n ? (f.allowAdditions === false ? n - 1 : -1) : cur + 1; break;
    case "Last": tab.record = Math.max(0, n - 1); break;
    case "New": tab.record = -1; break;
    case "Go To": tab.record = Math.max(0, Math.min(n - 1, (Number(offset) || 1) - 1)); break;
    default:
      if (/^\d+$/.test(how)) tab.record = Math.max(0, Math.min(n - 1, Number(how) - 1));
  }
}

function applyVbaActions(d: D, actions: VbaAction[]) {
  for (const a of actions) {
    if (a.kind === "openForm") {
      const f = findForm(d, a.name);
      if (f) { const t = openTab(d, "form", f.name, (a.view as AccView) ?? "Form View"); t.params = a.where ? { __where: a.where } : undefined; }
    }
    if (a.kind === "openReport") {
      const r = findReport(d, a.name);
      if (r) { const t = openTab(d, "report", r.name, a.view === "Print" ? "Print Preview" : ((a.view as AccView) ?? "Print Preview")); t.params = a.where ? { __where: a.where } : undefined; }
    }
    if (a.kind === "openQuery") { const q = findQuery(d, a.name); if (q) startQuery(d, q, true); }
    if (a.kind === "openTable") { const t = findTable(d, a.name); if (t) openTab(d, "table", t.name, "Datasheet View"); }
    if (a.kind === "close") {
      const id = a.name && a.objectType ? `${a.objectType.toLowerCase()}:${a.name}` : d.active;
      const tab = d.open.find((t) => eq(t.id, id ?? ""));
      if (tab) closeTab(d, tab.id);
    }
    if (a.kind === "goToRecord") { const t = activeTab(d); if (t?.kind === "form") navRecord(d, t, a.record); }
    if (a.kind === "runSql") {
      const q: AccQuery = { name: "__RunSQL", type: "Select", tables: [], cols: [], sql: a.sql };
      const r = runQuery(d, q);
      if (r.effect) applyEffect(d, r.effect);
      else if (r.error) message(d, r.error);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Opening objects                                                     */
/* ------------------------------------------------------------------ */

function openObject(d: D, kind: string, name: string, view?: AccView) {
  switch (kind) {
    case "table": {
      const t = findTable(d, name);
      if (t) openTab(d, "table", t.name, view ?? "Datasheet View");
      return;
    }
    case "query": {
      const q = findQuery(d, name);
      if (!q) return;
      if (view === "Design View" || view === "SQL View") {
        openTab(d, "query", q.name, view);
        return;
      }
      startQuery(d, q, ACTION_TYPES.includes(q.type));
      return;
    }
    case "form": {
      const f = findForm(d, name);
      if (!f) return;
      const v = view ?? "Form View";
      if (!startSource(d, "form", f.name, f.recordSource, v)) openTab(d, "form", f.name, v);
      return;
    }
    case "report": {
      const r = findReport(d, name);
      if (!r) return;
      const v = view ?? "Report View";
      if (!startSource(d, "report", r.name, r.recordSource, v)) openTab(d, "report", r.name, v);
      return;
    }
    case "macro": {
      const m = findMacro(d, name);
      if (!m) return;
      if (view === "Design View") openTab(d, "macro", m.name, "Design View");
      else runMacro(d, m);
      return;
    }
    case "module": {
      const m = findModule(d, name);
      if (m) d.vbe = { open: true, module: m.name, immediate: d.vbe?.immediate ?? true, output: d.vbe?.output ?? [] };
      return;
    }
  }
}

/** File › Open / reopen: run startup options (Display Form, AutoExec). */
function startup(d: D) {
  d.open = [];
  d.active = null;
  d.noDb = false;
  if (d.options?.displayForm) {
    const f = findForm(d, d.options.displayForm);
    if (f) openTab(d, "form", f.name, "Form View");
  }
  const auto = findMacro(d, "AutoExec");
  if (auto && auto.saved !== false) runMacro(d, auto);
}

/* ------------------------------------------------------------------ */
/* Switching views                                                     */
/* ------------------------------------------------------------------ */

function switchView(d: D, tab: AccTab, view: AccView) {
  if (view === tab.view) return;
  try {
    return switchViewInner(d, tab, view);
  } finally {
    snapshot(d, tab);
  }
}

function switchViewInner(d: D, tab: AccTab, view: AccView) {
  if (tab.kind === "table") {
    const t = findTable(d, tab.name);
    if (!t) return;
    if (t.saved === false && view === "Design View") {
      prompt(d, { kind: "saveAs", title: "Save As", objectKind: "table", objectName: t.name, defaultName: t.name, thenView: "Design View" });
      return;
    }
    if (view === "Datasheet View" && t.saved === false && tab.view === "Design View") {
      prompt(d, { kind: "saveAs", title: "Save As", objectKind: "table", objectName: t.name, defaultName: t.name, thenView: "Datasheet View" });
      return;
    }
    if (view === "Datasheet View" && tab.dirty) {
      tab.dirty = false;
      d.status = "";
    }
    tab.view = view === "Design View" ? "Design View" : "Datasheet View";
    return;
  }
  if (tab.kind === "query") {
    const q = findQuery(d, tab.name);
    if (!q) return;
    if (view === "Design View" && q.sql) {
      const g = sqlToGrid(d, q.sql);
      if (g) Object.assign(q, g);
    }
    if (view === "Datasheet View") {
      const pre = runQuery(d, q, {}, { previewOnly: true });
      if (pre.needParams?.length) {
        paramPrompt(d, pre.needParams, { kind: "query", name: q.name, run: false });
        return;
      }
      if (pre.error) return message(d, pre.error);
      tab.view = "Datasheet View";
      tab.params = undefined;
      bumpRun(d, q.name);
      return;
    }
    tab.view = view;
    return;
  }
  if (tab.kind === "form" || tab.kind === "report") {
    const obj = tab.kind === "form" ? findForm(d, tab.name) : findReport(d, tab.name);
    if (!obj) return;
    if ((view === "Form View" || view === "Report View" || view === "Print Preview") && !tab.params && startSource(d, tab.kind, obj.name, obj.recordSource, view)) return;
    if (view === "Print Preview" && tab.view !== "Print Preview") tab.prevView = tab.view;
    tab.view = view;
    if (view === "Form View" && tab.record === undefined) tab.record = 0;
    return;
  }
  tab.view = view;
}

/* ------------------------------------------------------------------ */
/* Saving                                                              */
/* ------------------------------------------------------------------ */

function objectOfTab(d: D, tab: AccTab | undefined): { kind: string; obj: { name: string; saved?: boolean } } | null {
  if (!tab) return null;
  const o = tab.kind === "table" ? findTable(d, tab.name) : tab.kind === "query" ? findQuery(d, tab.name) : tab.kind === "form" ? findForm(d, tab.name) : tab.kind === "report" ? findReport(d, tab.name) : tab.kind === "macro" ? findMacro(d, tab.name) : undefined;
  return o ? { kind: tab.kind, obj: o } : null;
}

function saveAs(d: D, kind: string, name: string, newName: string) {
  const n = newName.trim();
  if (!n) return;
  const coll: { name: string; saved?: boolean }[] | null =
    kind === "table" ? d.tables : kind === "query" ? d.queries : kind === "form" ? d.forms : kind === "report" ? d.reports : kind === "macro" ? d.macros : kind === "module" ? d.modules : null;
  if (!coll) return;
  const obj = coll.find((o) => eq(o.name, name));
  if (!obj) return;
  if (obj.saved === false || eq(name, n)) {
    if (!eq(name, n) || name !== n) renameObject(d, kind, name, n);
    obj.saved = true;
  } else {
    // Save As a copy: the open object becomes the copy.
    const copy = { ...clone(obj), name: n, saved: true };
    const existing = coll.findIndex((o) => eq(o.name, n));
    if (existing >= 0) coll.splice(existing, 1);
    coll.push(copy);
    renameTabs(d, kind, name, n);
  }
  const tab = d.open.find((t) => t.kind === kind && eq(t.name, n));
  if (tab) {
    tab.dirty = false;
    tab.orig = undefined;
    snapshot(d, tab);
  }
  d.status = "";
}

/* ------------------------------------------------------------------ */
/* apply                                                               */
/* ------------------------------------------------------------------ */

const VIEW_NAMES: AccView[] = ["Datasheet View", "Design View", "SQL View", "Form View", "Layout View", "Report View", "Print Preview"];

export function applyAccess(doc: AccessDoc, c: SimCommit, ui: SimUi): { doc: AccessDoc; ui?: Partial<SimUi> } {
  const d = clone(doc);
  const out = (patch?: Partial<SimUi>) => ({ doc: d, ui: patch });
  const val = c.kind === "command" ? (c.value === undefined ? "" : String(c.value)) : "";

  // A message box is answered first.
  if (c.kind === "command" && (c.id === "prompt.close" || c.id === "prompt.no" || c.id === "prompt.cancel")) {
    const q = d.prompt?.queue ?? [];
    d.prompt = q.length ? { ...q[0], queue: q.slice(1), nonce: (d.prompt?.nonce ?? 0) + 1 } : null;
    return out();
  }

  if (c.kind === "type") return applyType(d, c.target, c.value, ui);
  if (c.kind === "dialog") return applyDialog(d, c.id, c.values, ui);
  if (c.kind === "click") return out();

  const tab = activeTab(d);
  const sel = parseSel(ui.selection);

  switch (c.id) {
    /* ---------- window, navigation, views (free) ---------- */
    case "nav.open": {
      const j = val.indexOf(":");
      if (j > 0) openObject(d, val.slice(0, j), val.slice(j + 1));
      return out();
    }
    case "nav.view": {
      const [obj, view] = val.split("|");
      const j = obj.indexOf(":");
      if (j > 0) openObject(d, obj.slice(0, j), obj.slice(j + 1), (VIEW_NAMES.find((v) => eq(v, view)) ?? undefined) as AccView | undefined);
      return out();
    }
    case "pane.toggle":
      d.navHidden = !d.navHidden;
      return out();
    case "nav.collapse": {
      const set = new Set(d.navCollapsed ?? []);
      if (set.has(val)) set.delete(val);
      else set.add(val);
      d.navCollapsed = Array.from(set);
      return out();
    }
    case "tab.activate":
      if (d.open.some((t) => t.id === val)) d.active = val;
      return out();
    case "tab.close": {
      const id = val || d.active || "";
      const t = d.open.find((x) => x.id === id);
      if (!t) return out();
      const o = objectOfTab(d, t);
      if (o && (o.obj.saved === false || t.dirty)) {
        const noun = t.kind === "table" ? "table" : t.kind;
        prompt(d, { kind: "yesnocancel", icon: "warning", text: `Do you want to save changes to the design of ${noun} '${t.name}'?`, yes: { id: "tab.closeSave", value: id }, no: { id: "tab.closeDiscard", value: id } });
        return out();
      }
      closeTab(d, id);
      return out();
    }
    case "tab.closeSave": {
      d.prompt = null;
      const t = d.open.find((x) => x.id === val);
      const o = objectOfTab(d, t);
      if (!t || !o) return out();
      if (o.obj.saved === false) {
        prompt(d, { kind: "saveAs", title: "Save As", objectKind: o.kind, objectName: o.obj.name, defaultName: o.obj.name, thenClose: true });
        return out();
      }
      t.dirty = false;
      closeTab(d, t.id);
      return out();
    }
    case "tab.closeDiscard": {
      d.prompt = null;
      const t = d.open.find((x) => x.id === val);
      if (!t) return out();
      if (t.orig && t.dirty) restoreObject(d, t);
      closeTab(d, t.id);
      return out();
    }
    case "tab.closeAll":
      for (const t of d.open.slice()) closeTab(d, t.id);
      return out();
    case "view.switch":
    case "home.view": {
      if (!tab) return out();
      let v = VIEW_NAMES.find((x) => eq(x, val)) as AccView | undefined;
      if (!v || val === "toggle") {
        const views = viewsFor(tab.kind, findQuery(d, tab.name));
        v = tab.view === views[0] ? (views.includes("Design View") ? "Design View" : views[1]) : views[0];
      }
      switchView(d, tab, v);
      return out();
    }
    case "record.nav": {
      if (tab?.kind === "form") navRecord(d, tab, val);
      return out();
    }
    case "design.propertySheet":
      d.panes = { ...(d.panes ?? {}), propertySheet: !d.panes?.propertySheet };
      return out();
    case "form.fieldList":
      d.panes = { ...(d.panes ?? {}), fieldList: !d.panes?.fieldList };
      return out();
    case "query.addTables":
    case "relationships.showTable":
      d.panes = { ...(d.panes ?? {}), addTables: !d.panes?.addTables };
      return out();
    case "report.groupSort":
      d.panes = { ...(d.panes ?? {}), groupSort: !d.panes?.groupSort };
      return out();
    case "macro.actionCatalog":
      d.panes = { ...(d.panes ?? {}), actionCatalog: !d.panes?.actionCatalog };
      return out();
    case "pane.close":
      if (!val) d.panes = {};
      else d.panes = { ...(d.panes ?? {}), [val]: false };
      return out();
    case "dbtools.relationships":
    case "table.relationships": {
      openTab(d, "relationships", "Relationships", "Design View");
      if (!(d.relLayout ?? []).length) {
        const used = new Set<string>();
        for (const r of d.relationships) { used.add(r.table); used.add(r.relatedTable); }
        d.relLayout = Array.from(used);
        if (!d.relLayout.length) d.panes = { ...(d.panes ?? {}), addTables: true };
      }
      return out();
    }
    case "relationships.addTable": {
      const t = findTable(d, val) ?? findQuery(d, val);
      if (t && !(d.relLayout ?? []).some((x) => eq(x, t.name))) d.relLayout = [...(d.relLayout ?? []), t.name];
      return out();
    }
    case "relationships.hideTable": {
      if (sel.k === "reltable") d.relLayout = (d.relLayout ?? []).filter((x) => !eq(x, sel.table));
      return out({ selection: "" });
    }
    case "relationships.clearLayout":
      d.relLayout = [];
      return out();
    case "relationships.all": {
      const used = new Set(d.relLayout ?? []);
      for (const r of d.relationships) { used.add(r.table); used.add(r.relatedTable); }
      d.relLayout = Array.from(used);
      return out();
    }
    case "relationships.direct":
      return out();
    case "relationships.close":
      closeTab(d, "relationships:Relationships");
      return out();
    case "relationships.report": {
      const t = openTab(d, "documenter", "Relationships for " + "Database", "Print Preview");
      t.doc = ["#Relationships", ...d.relationships.map((r) => `|${r.table}.${r.field} → ${r.relatedTable}.${r.relatedField}|${r.enforce ? "Enforced" : ""}|`)];
      return out();
    }
    case "home.find":
      prompt(d, { kind: "find", title: "Find and Replace" });
      return out();
    case "home.replace":
      prompt(d, { kind: "find", title: "Find and Replace", text: "replace" });
      return out();
    case "home.findNext":
      return findNext(d, val, ui);
    case "home.refresh":
    case "home.spelling":
    case "help.help":
    case "help.support":
    case "help.feedback":
    case "help.training":
    case "view.zoom":
    case "query.result":
    case "query.count":
    case "dbtools.dependencies":
    case "dbtools.performance":
    case "dbtools.addins":
    case "external.linkedTables":
    case "external.newSource":
    case "file.browse":
    case "form.logo":
    case "table.events":
    case "macro.singleStep":
    case "macro.expand":
    case "macro.collapse":
    case "nav.menu":
      return out();
    case "preview.zoom":
      if (tab) tab.zoom = Number(val.replace("%", "")) || 100;
      return out();
    case "preview.onePage":
      if (tab) tab.zoom = 100;
      return out();
    case "preview.twoPages":
      if (tab) tab.zoom = 50;
      return out();
    case "preview.page":
      if (tab) tab.page = Math.max(1, Number(val) || 1);
      return out();
    case "preview.close":
      if (tab) {
        if (tab.kind === "documenter") closeTab(d, tab.id);
        else tab.view = tab.prevView && tab.prevView !== "Print Preview" ? tab.prevView : tab.kind === "report" ? "Report View" : tab.kind === "form" ? "Form View" : "Datasheet View";
      }
      return out();
    case "home.totals": {
      const t = dsTarget(d, ui);
      if (t) viewOf(t.obj).totalsOn = !viewOf(t.obj).totalsOn;
      return out();
    }
    case "home.newRecord": {
      if (tab?.kind === "form") tab.record = -1;
      return out();
    }
    case "record.undoNew": {
      const [tb, id] = val.split(".");
      const t = findTable(d, tb);
      if (t) t.rows = t.rows.filter((r) => r._id !== id);
      return out();
    }
    case "home.filterMenu":
      return out();
    case "form.title": {
      const des = activeDesign(d);
      const obj = des.form ?? des.report;
      if (!obj) return out();
      if (des.form && !des.form.controls.some((x) => x.id === "Title")) des.form.controls.unshift({ id: "Title", kind: "label", caption: des.form.name, section: "Form Header", order: 0, fontSize: 18 });
      if (des.report && !des.report.title) des.report.title = des.report.name;
      return out({ selection: `ctl:${obj.name}.Title` });
    }
    case "form.click":
      return clickButton(d, val);
    case "form.tool":
      d.tool = val || null;
      return out();
    case "form.wizards":
      d.flags = { ...(d.flags ?? {}), noWizards: !d.flags?.noWizards };
      return out();
    case "form.viewCode": {
      const des = activeDesign(d);
      const obj = des.form ?? des.report;
      if (!obj) return out();
      const modName = `${des.form ? "Form" : "Report"}_${obj.name}`;
      if (!findModule(d, modName)) d.modules.push({ name: modName, code: "Option Compare Database\n\n", kind: "class", saved: true });
      d.vbe = { open: true, module: modName, immediate: d.vbe?.immediate ?? true, output: d.vbe?.output ?? [] };
      return out();
    }
    case "vba.open":
    case "dbtools.vba":
    case "create.vba":
      d.vbe = { open: true, module: d.vbe?.module ?? d.modules[0]?.name, immediate: true, output: d.vbe?.output ?? [] };
      return out();
    case "vba.close":
      d.vbe = d.vbe ? { ...d.vbe, open: false } : null;
      return out();
    case "vba.module":
      if (findModule(d, val)) d.vbe = { ...(d.vbe ?? { open: true }), open: true, module: findModule(d, val)!.name };
      return out();
    case "vba.immediateToggle":
      d.vbe = { ...(d.vbe ?? { open: true }), immediate: !d.vbe?.immediate };
      return out();
    case "vba.edit": {
      const m = findModule(d, d.vbe?.module ?? "");
      if (m) m.code = val;
      return out();
    }
    case "vba.immediate": {
      const code = d.modules.map((m) => m.code).join("\n");
      const lines = immediate(d, val, code);
      d.vbe = { ...(d.vbe ?? { open: true }), output: [...(d.vbe?.output ?? []), ...lines].slice(-40) };
      return out();
    }
    case "vba.run": {
      const m = findModule(d, d.vbe?.module ?? "") ?? d.modules[0];
      if (!m) return out();
      const r = runVba(d, m.code, val, d.modules.filter((x) => x !== m).map((x) => x.code));
      applyVbaActions(d, r.actions);
      if (r.debug.length) d.vbe = { ...(d.vbe ?? { open: true }), output: [...(d.vbe?.output ?? []), ...r.debug].slice(-40) };
      const msgs: AccPrompt[] = r.messages.map((x) => ({ kind: "message", icon: "none", title: x.title ?? "Microsoft Access", text: x.text }));
      if (r.error) msgs.push({ kind: "message", icon: "error", title: r.error.title, text: r.error.text });
      if (msgs.length) prompt(d, { ...msgs[0], queue: msgs.slice(1) });
      return out();
    }
    case "vba.eventStub": {
      const [fname, ctlId] = val.split(".");
      const modName = `Form_${fname}`;
      let m = findModule(d, modName);
      if (!m) {
        m = { name: modName, code: "Option Compare Database\n\n", kind: "class", saved: true };
        d.modules.push(m);
      }
      if (ctlId && !new RegExp(`Sub\\s+${ctlId}_Click\\b`, "i").test(m.code)) m.code = `${m.code.replace(/\s*$/, "\n\n")}Private Sub ${ctlId}_Click()\n\nEnd Sub\n`;
      d.vbe = { open: true, module: m.name, immediate: d.vbe?.immediate ?? true, output: d.vbe?.output ?? [] };
      return out();
    }
    case "macro.run": {
      const m = val ? findMacro(d, val) : tab?.kind === "macro" ? findMacro(d, tab.name) : undefined;
      if (m) runMacro(d, m);
      return out();
    }
    case "sql.edit": {
      const q = tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      if (q) setSql(d, q, val);
      return out();
    }

    /* ---------- running queries ---------- */
    case "query.run": {
      const q = val ? findQuery(d, val) : tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      if (q) startQuery(d, q, true);
      return out();
    }
    case "query.parameter": {
      const p = d.prompt;
      if (!p || p.kind !== "param" || !p.then) return out();
      const collected = { ...(p.collected ?? {}), [p.param ?? ""]: val };
      if (p.pending?.length) {
        paramPrompt(d, p.pending, p.then, collected);
        return out();
      }
      d.prompt = null;
      const th = p.then;
      if (th.kind === "query") {
        const q = findQuery(d, th.name);
        if (q) finishQuery(d, q, collected, Boolean(th.run));
      } else {
        const t = openTab(d, th.kind, th.name, th.view ?? (th.kind === "form" ? "Form View" : "Report View"));
        t.params = collected;
      }
      return out();
    }
    case "query.execute": {
      const q = findQuery(d, val || d.prompt?.query || tab?.name || "");
      const params = d.prompt?.params ?? {};
      d.prompt = null;
      if (!q) return out();
      const r = runQuery(d, q, params);
      if (r.effect) applyEffect(d, r.effect);
      bumpRun(d, q.name);
      return out();
    }

    /* ---------- saving ---------- */
    case "file.save": {
      if (d.vbe?.open) {
        const m = findModule(d, d.vbe.module ?? "");
        if (m && m.saved === false) prompt(d, { kind: "saveAs", title: "Save As", objectKind: "module", objectName: m.name, defaultName: m.name });
        else if (m) m.saved = true;
        return out();
      }
      const o = objectOfTab(d, tab);
      if (!o || !tab) {
        d.status = "";
        return out();
      }
      if (o.obj.saved === false) {
        prompt(d, { kind: "saveAs", title: "Save As", objectKind: o.kind, objectName: o.obj.name, defaultName: o.obj.name });
        return out();
      }
      tab.dirty = false;
      tab.orig = undefined;
      snapshot(d, tab);
      return out();
    }

    /* ---------- requests that ask first (free) ---------- */
    case "home.delete":
    case "home.deleteRecord":
    case "fields.delete":
    case "design.deleteRows":
    case "object.deleteRequest":
    case "relationships.deleteRequest":
      return deleteRequest(d, c.id, ui);
    case "object.copy":
    case "home.copy":
    case "home.cut": {
      if (sel.k === "nav") d.clipboard = { kind: sel.kind, name: sel.name };
      return out();
    }
    case "home.paste":
    case "object.paste": {
      const cb = d.clipboard;
      if (!cb) return out();
      if (cb.kind === "table") prompt(d, { kind: "pasteAs", title: "Paste Table As", objectKind: "table", objectName: cb.name, defaultName: `Copy Of ${cb.name}` });
      else prompt(d, { kind: "pasteAs", title: "Paste As", objectKind: cb.kind, objectName: cb.name, defaultName: `Copy Of ${cb.name}` });
      return out();
    }

    /* ---------- judged: database objects ---------- */
    case "object.delete": {
      if (sel.k !== "nav") return out();
      deleteObject(d, sel.kind, sel.name);
      return out({ selection: "" });
    }
    case "record.delete": {
      let table = "", ids: string[] = [];
      if (val.includes(".")) {
        const [tb, id] = val.split(".");
        table = tb;
        ids = [id];
      } else if (sel.k === "row" || sel.k === "cell") {
        table = sel.obj;
        ids = [sel.row];
      }
      const t = findTable(d, table);
      if (!t) {
        // Query datasheet: map to its base table.
        return out();
      }
      deleteRows(d, t.name, ids);
      d.prompt = null;
      return out({ selection: "" });
    }
    case "relationships.delete": {
      if (sel.k === "rel") d.relationships = d.relationships.filter((r) => relKey(r) !== relKey(sel));
      d.prompt = null;
      return out({ selection: "" });
    }
    case "design.deleteField": {
      const sf = selField(d, ui);
      d.prompt = null;
      if (!sf) return out();
      const { t, f } = sf;
      t.fields = t.fields.filter((x) => x !== f);
      for (const r of t.rows) delete r[f.name];
      t.pk = t.pk?.filter((k) => !eq(k, f.name));
      d.relationships = d.relationships.filter((r) => !((eq(r.table, t.name) && eq(r.field, f.name)) || (eq(r.relatedTable, t.name) && eq(r.relatedField, f.name))));
      markDirty(d);
      return out({ selection: "" });
    }

    /* ---------- creating objects ---------- */
    case "create.table": {
      const name = nextNumbered(allNames(d), "Table");
      d.tables.push({ name, fields: [{ ...newField("ID", "AutoNumber") }], pk: ["ID"], rows: [], saved: false });
      openTab(d, "table", name, "Datasheet View");
      return out({ selection: `col:${name}.ID` });
    }
    case "create.tableDesign": {
      const name = nextNumbered(allNames(d), "Table");
      d.tables.push({ name, fields: [], rows: [], saved: false });
      openTab(d, "table", name, "Design View");
      return out({ selection: "" });
    }
    case "create.queryDesign": {
      const name = nextNumbered([...d.queries.map((q) => q.name), ...d.tables.map((t) => t.name)], "Query");
      d.queries.push({ name, type: "Select", tables: [], cols: [], saved: false });
      openTab(d, "query", name, "Design View");
      d.panes = { ...(d.panes ?? {}), addTables: true };
      return out({ selection: "" });
    }
    case "create.form":
    case "create.moreForms":
    case "create.report": {
      const srcName = sel.k === "nav" && (sel.kind === "table" || sel.kind === "query") ? sel.name : (tab && (tab.kind === "table" || tab.kind === "query") ? tab.name : "");
      const src = findTable(d, srcName)?.name ?? findQuery(d, srcName)?.name;
      if (!src) return out();
      if (c.id === "create.report") {
        const name = nextName(d.reports.map((r) => r.name), src);
        d.reports.push(buildReport(d, name, src));
        openTab(d, "report", name, "Layout View");
        return out({ selection: `ctl:${name}.Title` });
      }
      const layout = c.id === "create.moreForms" ? (val === "Split Form" ? "Split Form" : val === "Multiple Items" ? "Multiple Items" : val === "Datasheet" ? "Datasheet" : "Columnar") : "Columnar";
      const name = nextName(d.forms.map((f) => f.name), src);
      d.forms.push(buildForm(d, name, src, null, layout as AccForm["layout"]));
      openTab(d, "form", name, layout === "Datasheet" ? "Datasheet View" : "Layout View");
      return out({ selection: `ctl:${name}.Title` });
    }
    case "create.formDesign":
    case "create.blankForm": {
      const name = nextNumbered(d.forms.map((f) => f.name), "Form");
      d.forms.push({ name, recordSource: "", layout: "Columnar", controls: [], saved: false, allowAdditions: true });
      openTab(d, "form", name, c.id === "create.formDesign" ? "Design View" : "Layout View");
      d.panes = { ...(d.panes ?? {}), fieldList: true };
      return out({ selection: `form:${name}` });
    }
    case "create.reportDesign":
    case "create.blankReport": {
      const name = nextNumbered(d.reports.map((r) => r.name), "Report");
      d.reports.push({ name, recordSource: "", fields: [], layout: "Tabular", orientation: "Portrait", saved: false, controls: [] });
      openTab(d, "report", name, c.id === "create.reportDesign" ? "Design View" : "Layout View");
      d.panes = { ...(d.panes ?? {}), fieldList: true };
      return out({ selection: `form:${name}` });
    }
    case "create.macro": {
      const name = nextNumbered(d.macros.map((m) => m.name), "Macro");
      d.macros.push({ name, actions: [], saved: false });
      openTab(d, "macro", name, "Design View");
      d.panes = { ...(d.panes ?? {}), actionCatalog: true };
      return out({ selection: "" });
    }
    case "create.module": {
      const name = nextNumbered(d.modules.map((m) => m.name), "Module");
      d.modules.push({ name, code: `Option Compare Database\n${d.flags?.requireDeclaration ? "Option Explicit\n" : ""}\n`, kind: "standard", saved: false });
      d.vbe = { open: true, module: name, immediate: true, output: d.vbe?.output ?? [] };
      return out({ selection: `vba:${name}` });
    }

    /* ---------- table design ---------- */
    case "field.dataType":
    case "fields.dataType": {
      const sf = selField(d, ui);
      const to = DATA_TYPES.find((x) => eq(x, val));
      if (!sf || !to || to === "Lookup Wizard...") return out();
      const { t, f } = sf;
      if (to === f.type) return out();
      if (to === "AutoNumber" && t.rows.length) return out();
      const conv = convertValues(t, f, to);
      t.rows = conv.rows;
      const fresh = newField(f.name, to);
      f.type = to;
      f.size = fresh.size;
      f.format = fresh.format;
      f.decimalPlaces = fresh.decimalPlaces;
      if (to === "AutoNumber") f.newValues = "Increment";
      if (to !== "Short Text" && to !== "Long Text") f.allowZeroLength = undefined;
      if (to === "Yes/No") f.defaultValue = f.defaultValue ?? "No";
      markDirty(d);
      return out();
    }
    case "design.primaryKey": {
      const sf = selField(d, ui);
      if (!sf) return out();
      const { t, f } = sf;
      if (t.pk?.length === 1 && eq(t.pk[0], f.name)) t.pk = [];
      else {
        t.pk = [f.name];
        f.required = f.type === "AutoNumber" ? f.required : true;
        f.indexed = "Yes (No Duplicates)";
      }
      markDirty(d);
      return out();
    }
    case "design.insertRows": {
      const sf = selField(d, ui);
      if (sf) d.designInsert = { table: sf.t.name, index: sf.t.fields.indexOf(sf.f) };
      return out();
    }
    case "fields.add": {
      const type = (DATA_TYPES.find((x) => eq(x, val)) ?? (/date/i.test(val) ? "Date/Time" : /yes/i.test(val) ? "Yes/No" : /long/i.test(val) || /rich/i.test(val) ? "Long Text" : /currency/i.test(val) ? "Currency" : /number/i.test(val) ? "Number" : "Short Text")) as AccDataType;
      const dt = dsTarget(d, ui);
      const t = dt?.isTable ? (dt.obj as AccTable) : tab?.kind === "table" ? findTable(d, tab.name) : undefined;
      if (!t) return out();
      const name = nextNumbered(t.fields.map((f) => f.name), "Field");
      const nf = newField(name, (type as string) === "Lookup Wizard..." ? "Short Text" : type);
      const after = dt?.field ? t.fields.findIndex((f) => eq(f.name, dt.field)) : -1;
      if (after >= 0) t.fields.splice(after + 1, 0, nf);
      else t.fields.push(nf);
      return out({ selection: `col:${t.name}.${name}` });
    }
    case "fields.required":
    case "fields.unique":
    case "fields.indexed": {
      const sf = selField(d, ui);
      if (!sf) return out();
      if (c.id === "fields.required") sf.f.required = !sf.f.required;
      if (c.id === "fields.unique") sf.f.indexed = sf.f.indexed === "Yes (No Duplicates)" ? "No" : "Yes (No Duplicates)";
      if (c.id === "fields.indexed") sf.f.indexed = sf.f.indexed && sf.f.indexed !== "No" ? "No" : "Yes (Duplicates OK)";
      return out();
    }
    case "fields.currency":
    case "fields.percent":
    case "fields.comma": {
      const sf = selField(d, ui);
      if (sf) sf.f.format = c.id === "fields.currency" ? "Currency" : c.id === "fields.percent" ? "Percent" : "Standard";
      return out();
    }
    case "fields.decInc":
    case "fields.decDec": {
      const sf = selField(d, ui);
      if (sf) {
        const cur = Number(sf.f.decimalPlaces) || 2;
        sf.f.decimalPlaces = String(Math.max(0, Math.min(15, cur + (c.id === "fields.decInc" ? 1 : -1))));
      }
      return out();
    }

    /* ---------- datasheet: sort, filter, totals, layout ---------- */
    case "home.sortAsc":
    case "home.sortDesc": {
      const t = dsTarget(d, ui);
      if (!t?.field) return out();
      viewOf(t.obj).sort = [{ field: t.field, dir: c.id === "home.sortAsc" ? "asc" : "desc" }];
      return out();
    }
    case "home.removeSort": {
      const t = dsTarget(d, ui);
      if (t) viewOf(t.obj).sort = [];
      return out();
    }
    case "home.toggleFilter": {
      const t = dsTarget(d, ui);
      if (t && (viewOf(t.obj).filter ?? []).length) viewOf(t.obj).filterOn = !viewOf(t.obj).filterOn;
      return out();
    }
    case "home.advanced": {
      const t = dsTarget(d, ui);
      if (t && /clear all/i.test(val)) {
        viewOf(t.obj).filter = [];
        viewOf(t.obj).filterOn = false;
      }
      return out();
    }
    case "home.selection": {
      const t = dsTarget(d, ui);
      if (!t || !t.field || !t.row) return out();
      const v = cellValue(d, t, t.row, t.field);
      const text = v === null ? null : toText(v);
      const op = /does not equal/i.test(val) ? "ne" : /does not contain/i.test(val) ? "notContains" : /contains/i.test(val) ? "contains" : /less/i.test(val) ? "lt" : /greater/i.test(val) ? "gt" : "eq";
      setFilter(t.obj, t.field, v === null ? { field: t.field, op: op === "ne" ? "notNull" : "null" } : { field: t.field, op, value: isDate(v) ? text : (v as string | number | boolean) });
      return out();
    }
    case "datasheet.filter": {
      const t = dsTarget(d, ui);
      const m = /^([^=:]+)(=|:)(.*)$/.exec(val);
      if (!t || !m) return out();
      const field = m[1];
      if (m[2] === "=") {
        const values = m[3].split("|").map((x) => (x === "(Blanks)" ? null : x));
        setFilter(t.obj, field, { field, op: "in", values });
      } else {
        const [op, a, b] = m[3].split(":");
        if (op === "clear") {
          const v = viewOf(t.obj);
          v.filter = (v.filter ?? []).filter((x) => !eq(x.field, field));
          if (!v.filter.length) v.filterOn = false;
          return out();
        }
        const map: Record<string, NonNullable<DatasheetView["filter"]>[number]["op"]> = { Equals: "eq", "Does Not Equal": "ne", "Begins With": "begins", Contains: "contains", "Does Not Contain": "notContains", "Less Than": "lt", "Greater Than": "gt", Between: "between", "Is Null": "null", "Is Not Null": "notNull" };
        setFilter(t.obj, field, { field, op: map[op] ?? "eq", value: a, value2: b });
      }
      return out();
    }
    case "datasheet.total": {
      const t = dsTarget(d, ui);
      const [field, fn] = val.split("=");
      if (!t || !field) return out();
      const v = viewOf(t.obj);
      v.totalsOn = true;
      v.totals = { ...(v.totals ?? {}) };
      if (!fn || fn === "None") delete v.totals[field];
      else v.totals[field] = fn;
      return out();
    }
    case "home.more": {
      const t = dsTarget(d, ui);
      if (!t) return out();
      const v = viewOf(t.obj);
      if (/^hide fields$/i.test(val) && t.field) v.hidden = Array.from(new Set([...(v.hidden ?? []), t.field]));
      if (/^freeze fields$/i.test(val) && t.field) v.frozen = Array.from(new Set([...(v.frozen ?? []), t.field]));
      if (/^unfreeze all fields$/i.test(val)) v.frozen = [];
      return out();
    }
    case "home.replaceAll": {
      const [find, repl, field] = val.split("|");
      const t = dsTarget(d, ui);
      if (!t || !t.isTable || !find) return out();
      const tb = t.obj as AccTable;
      for (const r of tb.rows) {
        for (const f of tb.fields) {
          if (field && !eq(field, f.name)) continue;
          if (typeof r[f.name] === "string" && (r[f.name] as string).toLowerCase() === find.toLowerCase()) r[f.name] = repl ?? "";
        }
      }
      return out();
    }

    /* ---------- text formatting (datasheet or selected control) ---------- */
    case "home.bold":
    case "home.italic":
    case "home.underline":
    case "home.fontName":
    case "home.fontSize":
    case "home.fontColor":
    case "home.fill":
    case "home.alignLeft":
    case "home.alignCenter":
    case "home.alignRight":
    case "home.altRow":
    case "home.gridlines":
      return formatCmd(d, c.id, val, ui);

    /* ---------- query design ---------- */
    case "query.addTable": {
      const q = tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      const src = findTable(d, val)?.name ?? findQuery(d, val)?.name;
      if (!q || !src || eq(src, q.name)) return out();
      if (!q.tables.some((x) => eq(x, src))) q.tables.push(src);
      autoJoins(d, q, src);
      q.sql = undefined;
      markDirty(d);
      return out();
    }
    case "query.removeTable": {
      const q = sel.k === "qtable" ? findQuery(d, sel.query) : undefined;
      if (!q || sel.k !== "qtable") return out();
      q.tables = q.tables.filter((x) => !eq(x, sel.table));
      q.joins = (q.joins ?? []).filter((j) => !eq(j.left, sel.table) && !eq(j.right, sel.table));
      q.cols = q.cols.filter((x) => !eq(x.table, sel.table));
      q.sql = undefined;
      return out({ selection: "" });
    }
    case "query.addField": {
      const q = tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      if (!q) return out();
      const [tb, ...rest] = val.split(".");
      const fld = rest.join(".");
      const table = findTable(d, tb)?.name ?? findQuery(d, tb)?.name;
      if (!table) return out();
      if (!q.tables.some((x) => eq(x, table))) { q.tables.push(table); autoJoins(d, q, table); }
      const col: AccQueryCol = { field: fld === "*" ? `${table}.*` : fld, table, show: true };
      if (q.totals) col.total = "Group By";
      if (q.type === "Append" && q.target) {
        const target = findTable(d, q.target);
        const m = findField(target, fld);
        if (m) col.appendTo = m.name;
      }
      if (q.type === "Crosstab") col.total = "Group By";
      const empty = q.cols.findIndex((x) => !x.field.trim());
      if (empty >= 0) q.cols[empty] = col;
      else q.cols.push(col);
      q.sql = undefined;
      markDirty(d);
      return out();
    }
    case "query.type": {
      const q = tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      const t = (["Select", "Make Table", "Append", "Update", "Crosstab", "Delete"] as QueryType[]).find((x) => eq(x, val));
      if (!q || !t) return out();
      q.type = t;
      if (t === "Crosstab") {
        q.totals = false;
        for (const col of q.cols) col.total = col.total && col.total !== "Group By" ? col.total : "Group By";
      }
      if (t !== "Make Table" && t !== "Append") q.target = undefined;
      q.sql = undefined;
      markDirty(d);
      return out();
    }
    case "query.totals": {
      const q = tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      if (!q) return out();
      q.totals = !q.totals;
      if (q.totals) for (const col of q.cols) col.total = col.total ?? "Group By";
      q.sql = undefined;
      markDirty(d);
      return out();
    }
    case "query.deleteColumns": {
      const q = sel.k === "qcol" ? findQuery(d, sel.query) : undefined;
      if (q && sel.k === "qcol") q.cols.splice(sel.n - 1, 1);
      if (q) q.sql = undefined;
      return out({ selection: "" });
    }
    case "query.insertColumns": {
      const q = sel.k === "qcol" ? findQuery(d, sel.query) : tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      if (!q) return out();
      q.cols.splice(sel.k === "qcol" ? sel.n - 1 : q.cols.length, 0, { field: "", show: true });
      return out();
    }
    case "query.top": {
      const q = tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      if (q) { q.topValues = val === "All" ? undefined : val; q.sql = undefined; }
      return out();
    }
    case "query.join": {
      const q = tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      const m = /^([^.]+)\.(.+?)=([^.]+)\.(.+)$/.exec(val);
      if (!q || !m) return out();
      q.joins = [...(q.joins ?? []).filter((j) => !(eq(j.left, m[1]) && eq(j.leftField, m[2]) && eq(j.right, m[3]))), { left: m[1], leftField: m[2], right: m[3], rightField: m[4], type: "inner" }];
      q.sql = undefined;
      return out();
    }
    case "query.deleteJoin": {
      if (sel.k !== "qjoin") return out();
      const q = findQuery(d, sel.query);
      if (q) q.joins = (q.joins ?? []).filter((j) => !(eq(j.left, sel.left) && eq(j.leftField, sel.leftField) && eq(j.right, sel.right) && eq(j.rightField, sel.rightField)));
      return out({ selection: "" });
    }

    /* ---------- forms and reports ---------- */
    case "form.addField": {
      const des = activeDesign(d);
      const [a, b] = val.includes(".") ? val.split(".") : ["", val];
      if (des.form) {
        const f = des.form;
        if (!f.recordSource && a) f.recordSource = findTable(d, a)?.name ?? findQuery(d, a)?.name ?? a;
        const fields = sourceFields(d, f.recordSource);
        const fld = fields.find((x) => eq(x.name, b));
        if (!fld || f.controls.some((x) => eq(x.source, fld.name))) return out();
        const ctl = controlForField(fld, Math.max(0, ...f.controls.filter((x) => (x.section ?? "Detail") === "Detail").map((x) => x.order ?? 0)) + 1);
        ctl.id = f.controls.some((x) => eq(x.id, ctl.id)) ? nextCtlId(f.controls, fld.name) : ctl.id;
        f.controls.push(ctl);
        markDirty(d);
        return out({ selection: `ctl:${f.name}.${ctl.id}` });
      }
      if (des.report) {
        const r = des.report;
        if (!r.recordSource && a) r.recordSource = findTable(d, a)?.name ?? findQuery(d, a)?.name ?? a;
        const fld = sourceFields(d, r.recordSource).find((x) => eq(x.name, b));
        if (!fld || r.fields.some((x) => eq(x, fld.name))) return out();
        r.fields.push(fld.name);
        markDirty(d);
        return out({ selection: `ctl:${r.name}.${fld.name}` });
      }
      return out();
    }
    case "form.changeTo": {
      if (sel.k !== "ctl") return out();
      const { form } = designObj(d, sel.obj);
      const ctl = form?.controls.find((x) => eq(x.id, sel.id));
      if (!ctl) return out();
      const kind = /combo/i.test(val) ? "combo" : /list/i.test(val) ? "listbox" : /check/i.test(val) ? "check" : /label/i.test(val) ? "label" : "textbox";
      ctl.kind = kind;
      if ((kind === "combo" || kind === "listbox") && !ctl.rowSourceType) ctl.rowSourceType = "Table/Query";
      markDirty(d);
      return out();
    }
    case "arrange.moveUp":
    case "arrange.moveDown": {
      if (sel.k !== "ctl") return out();
      const { form, report } = designObj(d, sel.obj);
      if (report) {
        const id = sel.id.replace(/_Label$/, "");
        const i = report.fields.findIndex((x) => eq(x, id));
        const j = c.id === "arrange.moveUp" ? i - 1 : i + 1;
        if (i >= 0 && j >= 0 && j < report.fields.length) [report.fields[i], report.fields[j]] = [report.fields[j], report.fields[i]];
        markDirty(d);
        return out();
      }
      if (!form) return out();
      const id = sel.id.replace(/_Label$/, "");
      const ctl = form.controls.find((x) => eq(x.id, id));
      if (!ctl) return out();
      const sec = ctl.section ?? "Detail";
      const list = form.controls.filter((x) => (x.section ?? "Detail") === sec).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      list.forEach((x, k) => (x.order = k + 1));
      const i = list.indexOf(ctl);
      const j = c.id === "arrange.moveUp" ? i - 1 : i + 1;
      if (j < 0 || j >= list.length) return out();
      // Each control keeps its tab position (TabIndex) when it moves, so the tab order stays the
      // old one until it is fixed in Tab Order (Auto Order). Keep the order from before the move.
      if (sec === "Detail" && !form.tabOrder?.length) form.tabOrder = list.filter((x) => x.kind !== "label").map((x) => x.id);
      const tmp = list[j].order;
      list[j].order = ctl.order;
      ctl.order = tmp;
      markDirty(d);
      return out();
    }
    case "arrange.stacked":
    case "arrange.tabular": {
      const des = activeDesign(d);
      if (des.form) des.form.layout = c.id === "arrange.stacked" ? "Columnar" : "Tabular";
      if (des.report) des.report.layout = c.id === "arrange.stacked" ? "Columnar" : "Tabular";
      markDirty(d);
      return out();
    }
    case "form.deleteControl": {
      if (sel.k !== "ctl") return out();
      const { form, report } = designObj(d, sel.obj);
      if (form) {
        if (/_Label$/.test(sel.id)) {
          const base = form.controls.find((x) => eq(x.id, sel.id.replace(/_Label$/, "")));
          if (base) base.label = "";
        } else form.controls = form.controls.filter((x) => !eq(x.id, sel.id));
      }
      if (report) {
        const id = sel.id.replace(/_Label$/, "");
        if (eq(id, "Title")) report.title = "";
        else if (report.fields.some((x) => eq(x, id))) report.fields = report.fields.filter((x) => !eq(x, id));
        else if (/^Total_/.test(id)) report.totals = (report.totals ?? []).filter((t) => `Total_${t.fn}_${t.field}` !== id);
        else if (eq(id, "PageNumber")) report.pageNumbers = null;
        else if (eq(id, "Date")) report.dateTime = null;
        else report.controls = (report.controls ?? []).filter((x) => !eq(x.id, id));
      }
      markDirty(d);
      return out({ selection: "" });
    }
    case "form.placeControl": {
      const des = activeDesign(d);
      const [kindName, section] = val.split("@");
      const owner = des.form ?? des.report;
      if (!owner) return out();
      const kind: AccControl["kind"] = /button/i.test(kindName) ? "button" : /label/i.test(kindName) ? "label" : /combo/i.test(kindName) ? "combo" : /check/i.test(kindName) ? "check" : /list/i.test(kindName) ? "listbox" : "textbox";
      const controls = des.form ? des.form.controls : (des.report!.controls = des.report!.controls ?? []);
      const base = kind === "button" ? "Command" : kind === "label" ? "Label" : kind === "combo" ? "Combo" : kind === "check" ? "Check" : kind === "listbox" ? "List" : "Text";
      const id = nextCtlId(controls, base);
      controls.push({ id, kind, section: section || "Detail", order: 99, caption: kind === "button" ? id : kind === "label" ? "" : undefined, label: kind === "textbox" || kind === "combo" ? `${id}:` : undefined });
      d.tool = null;
      markDirty(d);
      return out({ selection: `ctl:${owner.name}.${id}` });
    }
    case "form.theme":
    case "report.theme": {
      const des = activeDesign(d);
      if (des.form) des.form.theme = val;
      if (des.report) des.report.theme = val;
      return out();
    }
    case "report.addGroup":
    case "report.addSort": {
      const r = activeDesign(d).report;
      if (!r || !val) return out();
      if (c.id === "report.addGroup") {
        if (!(r.groups ?? []).some((g) => eq(g.field, val))) r.groups = [...(r.groups ?? []), { field: val, dir: "asc", header: true, footer: false }];
        r.fields = r.fields.filter((x) => !eq(x, val));
      } else if (!(r.sorts ?? []).some((s) => eq(s.field, val))) r.sorts = [...(r.sorts ?? []), { field: val, dir: "asc" }];
      markDirty(d);
      return out();
    }
    case "report.deleteGroup": {
      const r = activeDesign(d).report;
      if (!r) return out();
      const g = (r.groups ?? []).find((x) => eq(x.field, val));
      r.groups = (r.groups ?? []).filter((x) => !eq(x.field, val));
      r.sorts = (r.sorts ?? []).filter((x) => !eq(x.field, val));
      if (g && !r.fields.some((x) => eq(x, g.field))) r.fields.unshift(g.field);
      return out();
    }
    case "report.groupOption": {
      const r = activeDesign(d).report;
      const [field, opt] = val.split("|");
      if (!r || !opt) return out();
      const g = (r.groups ?? []).find((x) => eq(x.field, field));
      const s = (r.sorts ?? []).find((x) => eq(x.field, field));
      const target = g ?? s;
      if (!target) return out();
      if (/with z on top|largest to smallest|newest to oldest|descending/i.test(opt)) target.dir = "desc";
      else if (/with a on top|smallest to largest|oldest to newest|ascending/i.test(opt)) target.dir = "asc";
      if (g) {
        if (/with a header section/i.test(opt)) g.header = true;
        if (/without a header section/i.test(opt)) g.header = false;
        if (/with a footer section/i.test(opt)) g.footer = true;
        if (/without a footer section/i.test(opt)) g.footer = false;
        if (/keep whole group together on one page/i.test(opt)) g.keepTogether = "Whole Group";
        if (/do not keep group together/i.test(opt)) g.keepTogether = "No";
      }
      markDirty(d);
      return out();
    }
    case "report.totals": {
      const r = activeDesign(d).report;
      if (!r || sel.k !== "ctl") return out();
      const field = sel.id.replace(/_Label$/, "");
      if (!r.fields.some((x) => eq(x, field)) && !(r.groups ?? []).some((g) => eq(g.field, field))) return out();
      const fn = /count/i.test(val) ? "Count" : /average/i.test(val) ? "Avg" : /max/i.test(val) ? "Max" : /min/i.test(val) ? "Min" : "Sum";
      const exists = (r.totals ?? []).some((t) => eq(t.field, field) && t.fn === fn);
      r.totals = exists ? (r.totals ?? []).filter((t) => !(eq(t.field, field) && t.fn === fn)) : [...(r.totals ?? []), { field, fn }];
      for (const g of r.groups ?? []) g.footer = true;
      markDirty(d);
      return out();
    }
    case "report.hideDetails": {
      const r = activeDesign(d).report;
      if (r) r.summaryOnly = !r.summaryOnly;
      return out();
    }
    case "pageSetup.size":
    case "pageSetup.margins":
    case "pageSetup.portrait":
    case "pageSetup.landscape": {
      const r = activeDesign(d).report ?? (tab?.kind === "report" ? findReport(d, tab.name) : undefined);
      if (!r) return out();
      if (c.id === "pageSetup.size") r.pageSize = (["Letter", "Legal", "A4", "Tabloid", "Executive"].find((x) => eq(x, val)) ?? "Letter") as AccReport["pageSize"];
      if (c.id === "pageSetup.margins") r.margins = (["Normal", "Wide", "Narrow"].find((x) => eq(x, val)) ?? "Normal") as AccReport["margins"];
      if (c.id === "pageSetup.portrait") r.orientation = "Portrait";
      if (c.id === "pageSetup.landscape") r.orientation = "Landscape";
      markDirty(d);
      return out();
    }

    /* ---------- macros ---------- */
    case "macro.addAction": {
      const m = tab?.kind === "macro" ? findMacro(d, tab.name) : undefined;
      const a = MACRO_ACTIONS.find((x) => eq(x, val));
      if (!m || !a) return out();
      m.actions.push({ action: a, args: macroDefaults(a) });
      markDirty(d);
      return out({ selection: `mact:${m.name}.${m.actions.length}` });
    }
    case "macro.deleteAction":
    case "macro.moveUp":
    case "macro.moveDown": {
      if (sel.k !== "mact") return out();
      const m = findMacro(d, sel.macro);
      if (!m) return out();
      const i = sel.n - 1;
      if (c.id === "macro.deleteAction") {
        m.actions.splice(i, 1);
        return out({ selection: "" });
      }
      const j = c.id === "macro.moveUp" ? i - 1 : i + 1;
      if (j < 0 || j >= m.actions.length) return out();
      [m.actions[i], m.actions[j]] = [m.actions[j], m.actions[i]];
      return out({ selection: `mact:${m.name}.${j + 1}` });
    }

    /* ---------- external data and tools ---------- */
    case "external.runSavedExport": {
      const s = (d.savedExports ?? []).find((x) => eq(x.name, val));
      if (!s) return out();
      const kind = /pdf/i.test(s.format) ? "pdf" : /text|csv/i.test(s.format) ? (/\.csv$/i.test(s.file) ? "csv" : "txt") : "xlsx";
      d.files = [...(d.files ?? []).filter((f) => !eq(f.name, s.file.replace(/^.*[\\/]/, ""))), exportFile(d, s.object, s.file, kind)];
      d.exports = [...(d.exports ?? []), { object: s.object, format: s.format, file: s.file }];
      d.status = `Exported ${s.object}`;
      return out();
    }
    case "external.deleteSavedExport":
      d.savedExports = (d.savedExports ?? []).filter((x) => !eq(x.name, val));
      return out();
    case "dbtools.compact": {
      for (const t of d.open.slice()) closeTab(d, t.id);
      d.compacted = true;
      d.status = "Compact and Repair Database complete";
      d.vbe = null;
      return out({ selection: "" });
    }

    /* ---------- File tab ---------- */
    case "file.new": {
      // "Contacts|Office Contacts.accdb" (a template) or "Front Desk.accdb" (blank).
      const bar = val.indexOf("|");
      const template = bar >= 0 ? val.slice(0, bar).trim() : TEMPLATE_NAMES.find((t) => eq(t, val)) ?? "";
      const rawName = bar >= 0 ? val.slice(bar + 1) : val;
      const name = (rawName || template || "Database1").replace(/\.accdb$/i, "").trim() || "Database1";
      if (template && TEMPLATE_NAMES.some((t) => eq(t, template))) {
        const fromTemplate: AccessDoc = { tables: [], queries: [], forms: [], reports: [], macros: [], modules: [], relationships: [], open: [], active: null, saved: { name: `${name}.accdb`, location: d.saved?.location ?? "C:\\Users\\Student\\Documents" }, files: d.files };
        const first = applyTemplate(fromTemplate, template);
        if (first) openTab(fromTemplate, "form", first, "Form View");
        return { doc: fromTemplate, ui: { selection: "" } };
      }
      const fresh: AccessDoc = {
        tables: [{ name: "Table1", fields: [{ ...newField("ID", "AutoNumber") }], pk: ["ID"], rows: [], saved: false }],
        queries: [],
        forms: [],
        reports: [],
        macros: [],
        modules: [],
        relationships: [],
        open: [],
        active: null,
        saved: { name: `${name}.accdb`, location: d.saved?.location ?? "C:\\Users\\Student\\Documents" },
        files: d.files,
      };
      openTab(fresh, "table", "Table1", "Datasheet View");
      return { doc: fresh, ui: { selection: "col:Table1.ID" } };
    }
    case "file.open":
      startup(d);
      return out({ selection: "" });
    case "file.close":
      d.noDb = true;
      d.open = [];
      d.active = null;
      d.vbe = null;
      return out({ selection: "" });
    case "file.protect":
      d.encrypted = !/decrypt/i.test(val);
      return out();
    case "file.options": {
      const m = /^([^:]+):\s*(.*)$/.exec(val);
      if (!m) return out();
      const k = m[1].trim().toLowerCase();
      d.options = { ...(d.options ?? {}) };
      if (k === "display form") d.options.displayForm = m[2] === "(none)" ? undefined : m[2];
      if (k === "application title") d.options.appTitle = m[2] || undefined;
      if (k === "compact on close") d.options.compactOnClose = yes(m[2]);
      if (k === "require variable declaration") d.flags = { ...(d.flags ?? {}), requireDeclaration: yes(m[2]) };
      return out();
    }
    case "qat.autosave":
    case "view.ribbonCollapse":
      if (c.id === "view.ribbonCollapse") d.ribbonCollapsed = !d.ribbonCollapsed;
      return out();
  }
  return out();
}

/* ------------------------------------------------------------------ */
/* Typing                                                              */
/* ------------------------------------------------------------------ */

function setSql(d: D, q: AccQuery, text: string) {
  q.sql = text.trim() ? text : undefined;
  if (q.sql) {
    const g = sqlToGrid(d, q.sql);
    if (g) {
      const keep = q.sql;
      Object.assign(q, g);
      q.sql = keep;
    }
  }
}

function applyType(d: D, target: string, value: string, ui: SimUi): { doc: D; ui?: Partial<SimUi> } {
  const out = (patch?: Partial<SimUi>) => ({ doc: d, ui: patch });
  const i = target.indexOf(":");
  const pre = target.slice(0, i);
  const rest = target.slice(i + 1);
  switch (pre) {
    case "cell": {
      const p = rest.split(".");
      typeCell(d, p[0], p[1], p.slice(2).join("."), value);
      return out();
    }
    case "fname": {
      const j = rest.indexOf(".");
      const t = findTable(d, rest.slice(0, j));
      const fname = rest.slice(j + 1);
      if (!t || !value.trim()) return out();
      if (fname === "new" || /^new@\d+$/.test(fname)) {
        if (findField(t, value.trim())) return out();
        const nf = newField(value.trim(), "Short Text");
        const at = /^new@(\d+)$/.exec(fname)?.[1] ?? (d.designInsert && eq(d.designInsert.table, t.name) ? String(d.designInsert.index) : null);
        if (at !== null) t.fields.splice(Number(at), 0, nf);
        else t.fields.push(nf);
        d.designInsert = null;
        markDirty(d);
        return out({ selection: `field:${t.name}.${nf.name}` });
      }
      const f = findField(t, fname);
      if (!f) return out();
      renameField(d, t, f.name, value.trim());
      markDirty(d);
      const s = parseSel(ui.selection);
      return out({ selection: s.k === "col" || s.k === "cell" ? `col:${t.name}.${value.trim()}` : `field:${t.name}.${value.trim()}` });
    }
    case "fdesc": {
      const j = rest.indexOf(".");
      const t = findTable(d, rest.slice(0, j));
      const f = findField(t, rest.slice(j + 1));
      if (f) f.description = value || undefined;
      markDirty(d);
      return out();
    }
    case "prop":
      return applyProp(d, rest, value, ui);
    case "tprop": {
      const sf = selField(d, ui);
      const tab = activeTab(d);
      const t = sf?.t ?? (tab?.kind === "table" ? findTable(d, tab.name) : undefined);
      if (!t) return out();
      if (eq(rest, "Validation Rule")) t.validationRule = value.trim() || undefined;
      if (eq(rest, "Validation Text")) t.validationText = value.trim() || undefined;
      if (eq(rest, "Description")) t.description = value.trim() || undefined;
      markDirty(d);
      return out();
    }
    case "qcell": {
      const parts = rest.split(".");
      const qname = parts[0];
      const row = parts[parts.length - 1];
      const key = parts.slice(1, -1).join(".");
      const q = findQuery(d, qname);
      if (!q) return out();
      let idx = key === "new" ? -1 : qcolIndex(q, key);
      if (idx < 0 && key !== "new") return out();
      if (key === "new") {
        if (row !== "Field" || !value.trim()) return out();
        const col: AccQueryCol = { field: "", show: true };
        setFieldCell(d, q, col, value);
        if (q.totals) col.total = /\b(sum|avg|count|min|max)\s*\(/i.test(col.field) ? "Expression" : "Group By";
        const empty = q.cols.findIndex((x) => !x.field.trim());
        if (empty >= 0) q.cols[empty] = col;
        else q.cols.push(col);
        idx = q.cols.indexOf(col);
      } else {
        const col = q.cols[idx];
        setQCell(d, q, col, row, value);
        if (row === "Field" && !col.field.trim()) q.cols.splice(idx, 1);
      }
      q.sql = undefined;
      markDirty(d);
      return out();
    }
    case "sql": {
      const q = findQuery(d, rest);
      if (q) setSql(d, q, value);
      markDirty(d);
      return out();
    }
    case "nav": {
      const j = rest.indexOf(":");
      const kind = rest.slice(0, j);
      const name = rest.slice(j + 1);
      if (!objectExists(d, kind, name) || !value.trim()) return out();
      if (nameTaken(d, kind, value.trim(), name)) return out();
      renameObject(d, kind, name, value.trim());
      return out({ selection: `nav:${kind}:${value.trim()}` });
    }
    case "label": {
      const j = rest.indexOf(".");
      const obj = rest.slice(0, j);
      const id = rest.slice(j + 1);
      const { form, report } = designObj(d, obj);
      if (form) {
        const base = id.replace(/_Label$/, "");
        const ctl = form.controls.find((x) => eq(x.id, base));
        if (!ctl) return out();
        if (ctl.kind === "label" || ctl.kind === "button") ctl.caption = value;
        else ctl.label = value;
      }
      if (report) {
        const base = id.replace(/_Label$/, "");
        if (eq(base, "Title")) report.title = value;
        else if (report.fields.some((x) => eq(x, base)) || (report.groups ?? []).some((g) => eq(g.field, base))) report.captions = { ...(report.captions ?? {}), [base]: value };
        else {
          const ctl = (report.controls ?? []).find((x) => eq(x.id, base));
          if (ctl) {
            if (ctl.kind === "label") ctl.caption = value;
            else ctl.source = value;
          }
        }
      }
      markDirty(d);
      return out();
    }
    case "section": {
      const j = rest.indexOf(".");
      const { form, report } = designObj(d, rest.slice(0, j));
      const section = rest.slice(j + 1);
      const owner = form ?? report;
      if (!owner || !value.trim()) return out();
      const controls = form ? form.controls : (report!.controls = report!.controls ?? []);
      const v = value.trim();
      const asLabel = /label/i.test(d.tool ?? "") || (!d.tool && /^"/.test(v));
      const id = nextCtlId(controls, asLabel ? "Label" : "Text");
      if (asLabel) controls.push({ id, kind: "label", caption: v.replace(/^"(.*)"$/, "$1"), section, order: 99 });
      else controls.push({ id, kind: "textbox", source: v, section, order: 99 });
      d.tool = null;
      markDirty(d);
      return out({ selection: `ctl:${owner.name}.${id}` });
    }
    case "marg": {
      const p = rest.split(".");
      const m = findMacro(d, p[0]);
      const n = Number(p[1]) - 1;
      const arg = p.slice(2).join(".");
      if (!m || !m.actions[n]) return out();
      m.actions[n].args = { ...m.actions[n].args, [arg]: value };
      markDirty(d);
      return out();
    }
    case "vba": {
      const m = findModule(d, rest);
      if (m) m.code = value;
      return out();
    }
  }
  return out();
}

function setQCell(d: D, q: AccQuery, col: AccQueryCol, row: string, value: string) {
  const v = value.trim();
  const r = row.toLowerCase();
  switch (r) {
    case "field": setFieldCell(d, q, col, v); return;
    case "table": col.table = findTable(d, v)?.name ?? findQuery(d, v)?.name ?? (v || undefined); return;
    case "total": col.total = (TOTAL_FUNCS.find((x) => eq(x, v)) ?? "Group By") as TotalFunc; if (col.total === "Where") col.show = false; return;
    case "sort": col.sort = /^asc/i.test(v) ? "Ascending" : /^desc/i.test(v) ? "Descending" : undefined; return;
    case "show": col.show = yes(v) || v === "✓"; return;
    case "criteria": col.criteria = v || undefined; return;
    case "update to": col.updateTo = v || undefined; return;
    case "append to": col.appendTo = v || undefined; return;
    case "crosstab": col.crosstab = (["Row Heading", "Column Heading", "Value", "(not shown)"].find((x) => eq(x, v)) ?? undefined) as AccQueryCol["crosstab"]; return;
  }
  const om = /^or(\d*)$/.exec(r);
  if (om) {
    const k = om[1] ? Number(om[1]) - 1 : 0;
    col.or = col.or ?? [];
    while (col.or.length <= k) col.or.push("");
    col.or[k] = v;
    while (col.or.length && !col.or[col.or.length - 1]) col.or.pop();
  }
}

function applyProp(d: D, prop: string, value: string, ui: SimUi): { doc: D; ui?: Partial<SimUi> } {
  const s = parseSel(ui.selection);
  const out = { doc: d };
  if (s.k === "field" || s.k === "col" || s.k === "cell") {
    const sf = selField(d, ui);
    if (sf) setFieldProp(d, sf.t, sf.f, prop, value);
    markDirty(d);
    return out;
  }
  if (s.k === "ctl") {
    const { form, report } = designObj(d, s.obj);
    const renamed = (ctl: AccControl) => (eq(prop, "Name") && ctl.id !== s.id.replace(/_Label$/, "") ? { doc: d, ui: { selection: `ctl:${s.obj}.${ctl.id}${/_Label$/.test(s.id) ? "_Label" : ""}` } } : null);
    if (form) {
      const ctl = form.controls.find((x) => eq(x.id, s.id.replace(/_Label$/, "")));
      if (ctl) {
        setControlProp(ctl, prop, value, form);
        markDirty(d);
        const r = renamed(ctl);
        if (r) return r;
      }
    }
    if (report) {
      const id = s.id.replace(/_Label$/, "");
      const ctl = (report.controls ?? []).find((x) => eq(x.id, id));
      if (ctl) {
        setControlProp(ctl, prop, value, { controls: report.controls ?? [] });
        markDirty(d);
        const r = renamed(ctl);
        if (r) return r;
      }
      else if (eq(prop, "Caption") && (report.fields.some((x) => eq(x, id)) || eq(id, "Title"))) {
        if (eq(id, "Title")) report.title = value;
        else report.captions = { ...(report.captions ?? {}), [id]: value };
      } else if (eq(prop, "Width")) report.widths = { ...(report.widths ?? {}), [id]: Number(value) || 1 };
    }
    markDirty(d);
    return out;
  }
  if (s.k === "form") {
    const { form, report } = designObj(d, s.obj);
    if (form) setFormProp(form, prop, value);
    if (report && eq(prop, "Record Source")) report.recordSource = value;
    if (report && eq(prop, "Caption")) report.title = report.title ?? value;
    markDirty(d);
    return out;
  }
  if (s.k === "sec") {
    const { form, report } = designObj(d, s.obj);
    if (report) {
      report.sectionProps = { ...(report.sectionProps ?? {}), [s.section]: { ...(report.sectionProps?.[s.section] ?? {}), [prop]: value } };
      const g = (report.groups ?? []).find((x) => eq(`${x.field} Header`, s.section) || eq(`${x.field} Footer`, s.section));
      if (g && eq(prop, "Force New Page")) g.forceNewPage = value;
      if (g && eq(prop, "Keep Together")) g.keepTogether = value;
    }
    if (form) form.fill = eq(prop, "Back Color") ? value : form.fill;
    markDirty(d);
    return out;
  }
  if (s.k === "qcol") {
    const q = findQuery(d, s.query);
    const col = q?.cols[s.n - 1];
    if (col) {
      if (eq(prop, "Format")) col.format = value || undefined;
      if (eq(prop, "Caption")) col.caption = value || undefined;
    }
    return out;
  }
  if (s.k === "qprops") {
    const q = findQuery(d, s.query);
    if (q) {
      if (eq(prop, "Top Values")) q.topValues = value === "All" ? undefined : value;
      if (eq(prop, "Unique Values")) q.unique = yes(value);
      if (eq(prop, "Description")) q.description = value;
      q.sql = undefined;
    }
    return out;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Dialogs                                                             */
/* ------------------------------------------------------------------ */

const sv = (v: SimValue | undefined) => (v === undefined || v === null ? "" : String(v));
const sb = (v: SimValue | undefined) => v === true || /^(true|yes|-1|on)$/i.test(sv(v));

function applyDialog(d: D, id: string, v: Record<string, SimValue>, ui: SimUi): { doc: D; ui?: Partial<SimUi> } {
  const out = (patch?: Partial<SimUi>) => ({ doc: d, ui: patch });
  const tab = activeTab(d);
  switch (id) {
    case "saveObject": {
      const p = d.prompt?.kind === "saveAs" ? d.prompt : null;
      let kind = p?.objectKind;
      let name = p?.objectName;
      if (!kind || !name) {
        if (d.vbe?.open && d.vbe.module) {
          kind = "module";
          name = d.vbe.module;
        } else {
          const o = objectOfTab(d, tab);
          if (!o) return out();
          kind = o.kind;
          name = o.obj.name;
        }
      }
      const newName = sv(v.name).trim();
      if (!newName) return out();
      d.prompt = null;
      saveAs(d, kind, name, newName);
      if (kind === "module" && d.vbe) d.vbe.module = newName;
      if (p?.thenView) {
        const t = d.open.find((x) => x.kind === kind && eq(x.name, newName));
        if (t) switchView(d, t, p.thenView);
      }
      if (p?.thenClose) {
        const t = d.open.find((x) => x.kind === kind && eq(x.name, newName));
        if (t) closeTab(d, t.id);
      }
      return out(kind === "table" || kind === "query" || kind === "form" || kind === "report" || kind === "macro" ? { selection: parseSel(ui.selection).k === "nav" ? `nav:${kind}:${newName}` : ui.selection } : undefined);
    }
    case "pasteTableAs": {
      const cb = d.clipboard;
      const p = d.prompt;
      d.prompt = null;
      const name = sv(v.name).trim();
      if (!cb || !name) return out();
      const opt = sv(v.option) || "Structure and Data";
      if (cb.kind === "table") {
        const src = findTable(d, cb.name);
        if (!src) return out();
        if (/append/i.test(opt)) {
          const target = findTable(d, name);
          if (!target) return out();
          for (const r of src.rows) {
            const rec = newRecord(d, target, nextRowId(target));
            for (const f of target.fields) if (f.type !== "AutoNumber" && f.name in r) rec[f.name] = r[f.name];
            target.rows.push(rec);
          }
          return out();
        }
        const copy: AccTable = { ...clone(src), name, saved: true, rows: /structure only/i.test(opt) ? [] : clone(src.rows) };
        d.tables = d.tables.filter((t) => !eq(t.name, name));
        d.tables.push(copy);
        return out({ selection: `nav:table:${name}` });
      }
      const coll = cb.kind === "query" ? d.queries : cb.kind === "form" ? d.forms : cb.kind === "report" ? d.reports : cb.kind === "macro" ? d.macros : null;
      const src = (coll as { name: string }[] | null)?.find((o) => eq(o.name, cb.name));
      if (coll && src) (coll as { name: string }[]).push({ ...clone(src), name });
      void p;
      return out({ selection: `nav:${cb.kind}:${name}` });
    }
    case "nameCaption": {
      const sf = selField(d, ui);
      if (!sf) return out();
      if (sv(v.name).trim() && !eq(sv(v.name), sf.f.name)) renameField(d, sf.t, sf.f.name, sv(v.name).trim());
      sf.f.caption = sv(v.caption) || undefined;
      sf.f.description = sv(v.description) || undefined;
      return out({ selection: `col:${sf.t.name}.${sf.f.name}` });
    }
    case "fieldWidth": {
      const t = dsTarget(d, ui);
      if (!t?.field) return out();
      const vw = viewOf(t.obj);
      vw.widths = { ...(vw.widths ?? {}), [t.field]: sb(v.standard) ? 13.29 : Number(v.width) || 13.29 };
      return out();
    }
    case "rowHeight": {
      const t = dsTarget(d, ui);
      if (t) viewOf(t.obj).rowHeight = sb(v.standard) ? undefined : Number(v.height) || undefined;
      return out();
    }
    case "unhideFields": {
      const t = dsTarget(d, ui) ?? (tab ? { obj: findTable(d, tab.name) ?? findQuery(d, tab.name)!, isTable: true } : null);
      if (!t?.obj) return out();
      const vw = viewOf(t.obj);
      vw.hidden = (vw.hidden ?? []).filter((f) => !sb(v[f]));
      return out();
    }
    case "makeTable":
    case "appendTo": {
      const q = tab?.kind === "query" ? findQuery(d, tab.name) : undefined;
      if (!q) return out();
      q.type = id === "makeTable" ? "Make Table" : "Append";
      q.target = sv(v.name).trim() || undefined;
      if (q.type === "Append" && q.target) {
        const target = findTable(d, q.target);
        for (const col of q.cols) {
          const name = splitField(col.field).alias ?? col.field.replace(/^\[|\]$/g, "");
          const m = findField(target, name);
          if (m && !col.appendTo) col.appendTo = m.name;
        }
      }
      q.sql = undefined;
      markDirty(d);
      return out();
    }
    case "joinProperties": {
      const s = parseSel(ui.selection);
      if (s.k !== "qjoin") return out();
      const q = findQuery(d, s.query);
      const j = (q?.joins ?? []).find((x) => eq(x.left, s.left) && eq(x.leftField, s.leftField) && eq(x.right, s.right) && eq(x.rightField, s.rightField));
      if (!q || !j) return out();
      const opt = sv(v.join);
      j.type = opt.startsWith("2") ? "left" : opt.startsWith("3") ? "right" : "inner";
      q.sql = undefined;
      return out();
    }
    case "pageNumbers": {
      const r = activeDesign(d).report;
      if (!r) return out();
      r.pageNumbers = { format: sv(v.format) || "Page N", position: sv(v.position) || "Bottom of Page [Footer]", align: sv(v.align) || "Center", first: v.first === undefined ? true : sb(v.first) };
      markDirty(d);
      return out();
    }
    case "dateTime": {
      const des = activeDesign(d);
      const dateNames = ["Long Date", "Medium Date", "Short Date"];
      const timeNames = ["Long Time", "Medium Time", "Short Time"];
      const di = DATE_SAMPLES.indexOf(sv(v.dateFormat));
      const ti = TIME_SAMPLES.indexOf(sv(v.timeFormat));
      const dt = { date: sb(v.includeDate) ? (di >= 0 ? dateNames[di] : sv(v.dateFormat) || "Long Date") : undefined, time: sb(v.includeTime) ? (ti >= 0 ? timeNames[ti] : sv(v.timeFormat) || "Long Time") : undefined };
      if (des.report) des.report.dateTime = dt.date || dt.time ? dt : null;
      if (des.form) {
        des.form.controls = des.form.controls.filter((x) => x.id !== "Auto_Date" && x.id !== "Auto_Time");
        if (dt.date) des.form.controls.push({ id: "Auto_Date", kind: "textbox", source: "=Date()", format: dt.date, section: "Form Header", order: 50 });
        if (dt.time) des.form.controls.push({ id: "Auto_Time", kind: "textbox", source: "=Time()", format: dt.time, section: "Form Header", order: 51 });
      }
      markDirty(d);
      return out();
    }
    case "find": {
      return findNext(d, sv(v.findWhat), ui);
    }
    case "runMacro": {
      const m = findMacro(d, sv(v.name));
      if (m) runMacro(d, m);
      return out();
    }
    case "datasheetFormatting": {
      const t = dsTarget(d, ui);
      if (!t) return out();
      const vw = viewOf(t.obj);
      const colors: Record<string, string> = { "Light Gray": "#F2F2F2", "Light Blue": "#DDEBF7", "Light Green": "#E2EFDA", "Light Yellow": "#FFF2CC", White: "#FFFFFF" };
      vw.altRow = colors[sv(v.alternate)] ?? undefined;
      vw.gridlines = sb(v.horizontal) && sb(v.vertical) ? "Gridlines: Both" : sb(v.horizontal) ? "Gridlines: Horizontal" : sb(v.vertical) ? "Gridlines: Vertical" : "Gridlines: None";
      return out();
    }
    case "pageSetup": {
      const r = activeDesign(d).report ?? (tab?.kind === "report" ? findReport(d, tab.name) : undefined);
      if (!r) return out();
      if (v.orientation) r.orientation = /landscape/i.test(sv(v.orientation)) ? "Landscape" : "Portrait";
      if (v.size) r.pageSize = (["Letter", "Legal", "A4", "Tabloid", "Executive"].find((x) => eq(x, sv(v.size))) ?? "Letter") as AccReport["pageSize"];
      markDirty(d);
      return out();
    }
    case "queryParameters":
      return out();
    case "file.print":
      d.flags = { ...(d.flags ?? {}), printed: `${sv(v.copies) || 1} cop${Number(v.copies ?? 1) === 1 ? "y" : "ies"}` };
      return out();
    case "file.saveAs": {
      const fmt = sv(v.format);
      const name = sv(v.name).trim();
      const loc = sv(v.location) || d.saved?.location || "C:\\Users\\Student\\Documents";
      if (/back ?up/i.test(fmt)) {
        const file = `${name.replace(/\.accdb$/i, "")}.accdb`;
        d.backups = [...(d.backups ?? []), `${loc}\\${file}`];
        d.files = [...(d.files ?? []), { name: file, folder: loc, kind: "accdb", from: "Back Up Database" }];
        d.status = `Backed up to ${file}`;
        return out();
      }
      if (/pdf/i.test(fmt)) {
        const o = objectOfTab(d, tab);
        if (o) {
          const file = `${name.replace(/\.pdf$/i, "")}.pdf`;
          d.files = [...(d.files ?? []), exportFile(d, o.obj.name, `${loc}\\${file}`, "pdf")];
          d.exports = [...(d.exports ?? []), { object: o.obj.name, format: "PDF", file }];
        }
        return out();
      }
      if (/object/i.test(fmt)) {
        const o = objectOfTab(d, tab);
        if (o && name) saveAs(d, o.kind, o.obj.name, name);
        return out();
      }
      const ext = /2002-2003|2000/.test(fmt) ? ".mdb" : /template/i.test(fmt) ? ".accdt" : /accde/i.test(fmt) ? ".accde" : ".accdb";
      d.saved = { ...(d.saved ?? {}), name: `${name.replace(/\.(accdb|mdb|accdt|accde)$/i, "")}${ext}`, location: loc, format: fmt };
      return out();
    }

    /* ---------- dialogs drawn by the Access window (backstage:*) ---------- */
    case "backstage:editRelationship": {
      const r0: AccRelationship = {
        table: sv(v.table),
        field: sv(v.field),
        relatedTable: sv(v.relatedTable),
        relatedField: sv(v.relatedField),
        enforce: sb(v.enforce),
        cascadeUpdate: sb(v.enforce) && sb(v.cascadeUpdate),
        cascadeDelete: sb(v.enforce) && sb(v.cascadeDelete),
        join: (Number(sv(v.join).slice(0, 1)) || 1) as 1 | 2 | 3,
      };
      const t = findTable(d, r0.table), rt = findTable(d, r0.relatedTable);
      if (!t || !rt) return out();
      r0.table = t.name;
      r0.relatedTable = rt.name;
      r0.field = findField(t, r0.field)?.name ?? r0.field;
      r0.relatedField = findField(rt, r0.relatedField)?.name ?? r0.relatedField;
      const r = orientRel(d, r0);
      d.relationships = d.relationships.filter((x) => !(eq(x.table, r.table) && eq(x.relatedTable, r.relatedTable) && eq(x.field, r.field) && eq(x.relatedField, r.relatedField)));
      d.relationships.push(r);
      for (const n of [r.table, r.relatedTable]) if (!(d.relLayout ?? []).some((x) => eq(x, n))) d.relLayout = [...(d.relLayout ?? []), n];
      return out({ selection: `rel:${relKey(r)}` });
    }
    case "backstage:lookupWizard": {
      const t = findTable(d, sv(v.table));
      if (!t) return out();
      let f = findField(t, sv(v.field));
      const label = sv(v.label).trim();
      if (!f) {
        if (!label || findField(t, label)) return out();
        f = newField(label, "Short Text");
        t.fields.push(f);
      } else if (label && !eq(label, f.name)) renameField(d, t, f.name, label);
      const source = sv(v.source);
      if (/type in/i.test(source)) {
        f.lookup = { values: sv(v.values).split(/[;\n]/).map((x) => x.trim()).filter(Boolean), limitToList: sb(v.limitToList), multi: sb(v.multi) };
        if (f.type !== "Short Text") f.type = "Short Text";
      } else {
        const lt = findTable(d, sv(v.lookupTable)) ?? findQuery(d, sv(v.lookupTable));
        if (!lt) return out();
        f.lookup = { table: lt.name, field: sv(v.lookupField), limitToList: true };
        const pk = findTable(d, lt.name)?.pk?.[0];
        if (pk && sb(v.storeKey)) {
          f.type = "Number";
          f.size = "Long Integer";
          f.lookup.field = pk;
        }
      }
      markDirty(d);
      return out({ selection: `field:${t.name}.${f.name}` });
    }
    case "backstage:formWizard": {
      const src = sv(v.source).replace(/^(table|query):\s*/i, "");
      const source = findTable(d, src)?.name ?? findQuery(d, src)?.name;
      if (!source) return out();
      const title = sv(v.title).trim() || source;
      const layout = (["Columnar", "Tabular", "Datasheet", "Justified"].find((x) => eq(x, sv(v.layout))) ?? "Columnar") as AccForm["layout"];
      const fields = sv(v.fields).split(",").map((x) => x.trim()).filter(Boolean);
      const name = nextName(d.forms.map((f) => f.name), title);
      const f = buildForm(d, name, source, fields.length ? fields : null, layout, title);
      f.saved = true;
      d.forms.push(f);
      openTab(d, "form", name, /modify/i.test(sv(v.open)) ? "Design View" : layout === "Datasheet" ? "Datasheet View" : "Form View");
      return out({ selection: `nav:form:${name}` });
    }
    case "backstage:reportWizard": {
      const src = sv(v.source).replace(/^(table|query):\s*/i, "");
      const source = findTable(d, src)?.name ?? findQuery(d, src)?.name;
      if (!source) return out();
      const title = sv(v.title).trim() || source;
      const fields = sv(v.fields).split(",").map((x) => x.trim()).filter(Boolean);
      const groups = sv(v.groups).split(",").map((x) => x.trim()).filter(Boolean);
      const sorts = sv(v.sorts).split(",").map((x) => x.trim()).filter(Boolean).map((x) => {
        const [field, dir] = x.split(":");
        return { field, dir: (/desc/i.test(dir ?? "") ? "desc" : "asc") as "asc" | "desc" };
      });
      const totals = sv(v.summary).split(",").map((x) => x.trim()).filter(Boolean).map((x) => {
        const [field, fn] = x.split(":");
        return { field, fn: (["Sum", "Avg", "Min", "Max", "Count"].find((y) => eq(y, fn)) ?? "Sum") as "Sum" | "Avg" | "Min" | "Max" | "Count" };
      });
      const name = nextName(d.reports.map((r) => r.name), title);
      const all = sourceFields(d, source).map((f) => f.name);
      const r: AccReport = {
        name,
        recordSource: source,
        fields: (fields.length ? fields : all).filter((f) => !groups.some((g) => eq(g, f))),
        groups: groups.map((g) => ({ field: g, dir: "asc", header: true, footer: totals.length > 0 })),
        sorts,
        totals,
        summaryOnly: /summary only/i.test(sv(v.summaryMode)),
        summaryLine: totals.length > 0,
        layout: (["Stepped", "Block", "Outline", "Tabular", "Columnar", "Justified"].find((x) => eq(x, sv(v.layout))) ?? (groups.length ? "Stepped" : "Tabular")) as AccReport["layout"],
        orientation: /landscape/i.test(sv(v.orientation)) ? "Landscape" : "Portrait",
        pageSize: "Letter",
        margins: "Normal",
        title,
        pageNumbers: { format: "Page N of M", position: "Bottom of Page [Footer]", align: "Right" },
        dateTime: { date: "Long Date" },
        saved: true,
      };
      d.reports.push(r);
      const rt = openTab(d, "report", name, /modify/i.test(sv(v.open)) ? "Design View" : "Print Preview");
      // Close Print Preview after the wizard lands in Design view, as in Access.
      if (rt.view === "Print Preview") rt.prevView = "Design View";
      return out({ selection: `nav:report:${name}` });
    }
    case "backstage:queryWizard": {
      const wizard = sv(v.wizard);
      const name = sv(v.title).trim();
      const src = sv(v.source).replace(/^(table|query):\s*/i, "");
      const source = findTable(d, src)?.name ?? findQuery(d, src)?.name;
      if (!source || !name) return out();
      let q: AccQuery;
      if (/crosstab/i.test(wizard)) {
        const fn = (["Sum", "Avg", "Count", "Min", "Max", "First", "Last", "StDev", "Var"].find((x) => eq(x, sv(v.fn))) ?? "Count") as TotalFunc;
        const rows = sv(v.rowHeadings).split(",").map((x) => x.trim()).filter(Boolean);
        q = {
          name,
          type: "Crosstab",
          tables: [source],
          cols: [
            ...rows.map((r) => ({ field: r, table: source, total: "Group By" as TotalFunc, crosstab: "Row Heading" as const })),
            { field: sv(v.columnHeading), table: source, total: "Group By", crosstab: "Column Heading" },
            { field: sv(v.value), table: source, total: fn, crosstab: "Value" },
          ],
          saved: true,
        };
        if (sb(v.rowSums)) q.cols.splice(rows.length, 0, { field: `Total Of ${sv(v.value)}: ${sv(v.value)}`, table: source, total: fn, crosstab: "Row Heading" });
      } else if (/duplicates/i.test(wizard)) {
        const dups = sv(v.dupFields).split(",").map((x) => x.trim()).filter(Boolean);
        const extra = sv(v.fields).split(",").map((x) => x.trim()).filter(Boolean);
        const cond = dups.map((f) => `[${f}]`).join(" & ");
        q = {
          name,
          type: "Select",
          tables: [source],
          cols: [...dups, ...extra].map((f, i) => ({ field: f, table: source, show: true, sort: i === 0 ? ("Ascending" as const) : undefined })),
          saved: true,
        };
        if (dups.length === 1) q.cols[0].criteria = `In (SELECT [${dups[0]}] FROM [${source}] As Tmp GROUP BY [${dups[0]}] HAVING Count(*)>1 )`;
        q.sql = `SELECT ${[...dups, ...extra].map((f) => `[${source}].[${f}]`).join(", ")}\nFROM [${source}]\nWHERE ${cond} In (SELECT ${cond} FROM [${source}] GROUP BY ${cond} HAVING Count(*)>1)\nORDER BY [${source}].[${dups[0]}];`;
        // The engine has no subqueries; store the duplicate keys directly as an In list.
        const counts = new Map<string, { n: number; vals: V[] }>();
        const rows = dataSource(d).rows(source)?.rows ?? [];
        for (const r of rows) {
          const k = dups.map((f) => toText(r[f] ?? null).toLowerCase()).join("\u0001");
          const e = counts.get(k) ?? { n: 0, vals: dups.map((f) => r[f] ?? null) };
          e.n++;
          counts.set(k, e);
        }
        const dupVals = Array.from(counts.values()).filter((x) => x.n > 1).map((x) => x.vals[0]);
        q.sql = undefined;
        q.cols[0].criteria = dupVals.length ? `In (${dupVals.map((x) => (typeof x === "number" ? String(x) : `"${toText(x).replace(/"/g, '""')}"`)).join(",")})` : `Is Null And Is Not Null`;
      } else if (/unmatched/i.test(wizard)) {
        const other = findTable(d, sv(v.relatedTable))?.name ?? findQuery(d, sv(v.relatedTable))?.name;
        if (!other) return out();
        const fields = sv(v.fields).split(",").map((x) => x.trim()).filter(Boolean);
        q = {
          name,
          type: "Select",
          tables: [source, other],
          joins: [{ left: source, leftField: sv(v.matchField), right: other, rightField: sv(v.relatedField) || sv(v.matchField), type: "left" }],
          cols: [...fields.map((f) => ({ field: f, table: source, show: true })), { field: sv(v.relatedField) || sv(v.matchField), table: other, show: false, criteria: "Is Null" }],
          saved: true,
        };
      } else {
        const fields = sv(v.fields).split(",").map((x) => x.trim()).filter(Boolean);
        const summary = /summary/i.test(sv(v.detail));
        q = {
          name,
          type: "Select",
          tables: [source],
          cols: fields.map((f) => {
            const [tb, fld] = f.includes(".") ? f.split(".") : [source, f];
            return { field: fld, table: findTable(d, tb)?.name ?? source, show: true };
          }),
          saved: true,
        };
        const extraTables = Array.from(new Set(q.cols.map((x) => x.table!).filter((x) => !eq(x, source))));
        for (const et of extraTables) {
          q.tables.push(et);
          autoJoins(d, q, et);
        }
        if (summary) {
          q.totals = true;
          const sums = sv(v.summary).split(",").map((x) => x.trim()).filter(Boolean);
          for (const col of q.cols) col.total = "Group By";
          for (const s of sums) {
            const [fld, fn] = s.split(":");
            const col = q.cols.find((x) => eq(x.field, fld));
            if (col) col.total = (["Sum", "Avg", "Min", "Max", "Count"].find((x) => eq(x, fn)) ?? "Sum") as TotalFunc;
          }
        }
      }
      d.queries = d.queries.filter((x) => !eq(x.name, name));
      d.queries.push(q);
      if (/modify/i.test(sv(v.open))) openTab(d, "query", name, "Design View");
      else startQuery(d, q, false);
      return out({ selection: `nav:query:${name}` });
    }
    case "backstage:importExcel": {
      const spec = {
        file: sv(v.file) || (d.files ?? []).find((x) => x.kind === "xlsx" || x.kind === "csv")?.name || "",
        sheet: sv(v.sheet) || undefined,
        headings: v.headings === undefined ? true : sb(v.headings),
        mode: (/append/i.test(sv(v.mode)) ? "append" : /link/i.test(sv(v.mode)) ? "link" : "new") as "new" | "append" | "link",
        appendTo: sv(v.appendTo) || undefined,
        pk: sv(v.pk) || "Let Access add primary key",
        pkField: sv(v.pkField) || undefined,
        table: sv(v.table).trim() || sv(v.sheet) || "Sheet1",
        skip: sv(v.skip).split(",").map((x) => x.trim()).filter(Boolean),
      };
      const r = importSheet(d, spec);
      if (r.error) {
        message(d, r.error);
        return out();
      }
      if (r.table) {
        const tname = nextName(d.tables.map((t) => t.name), r.table.name);
        r.table.name = tname;
        d.tables.push(r.table);
      }
      if (r.append) {
        const t = findTable(d, r.append.table);
        if (t) for (const row of r.append.rows) {
          const rec = newRecord(d, t, nextRowId(t));
          for (const [k, val] of Object.entries(row)) if (findField(t, k)?.type !== "AutoNumber") rec[k] = val;
          t.rows.push(rec);
        }
      }
      if (sb(v.saveSteps)) d.savedImports = [...(d.savedImports ?? []), { name: sv(v.saveName) || `Import-${spec.table}`, object: spec.table, format: "Excel", file: spec.file }];
      return out({ selection: r.table ? `nav:table:${r.table.name}` : undefined });
    }
    case "backstage:exportExcel":
    case "backstage:exportPdf":
    case "backstage:exportText": {
      const sel = parseSel(ui.selection);
      const object = sv(v.object) || (sel.k === "nav" ? sel.name : tab?.name ?? "");
      const ext = id === "backstage:exportPdf" ? "pdf" : id === "backstage:exportText" ? "txt" : "xlsx";
      const file = sv(v.file).trim() || `C:\\Users\\Student\\Documents\\${object}.${ext}`;
      if (!object || !file) return out();
      const kind = id === "backstage:exportPdf" ? "pdf" : id === "backstage:exportText" ? (/\.csv$/i.test(file) ? "csv" : "txt") : "xlsx";
      const fmt = id === "backstage:exportPdf" ? "PDF" : id === "backstage:exportText" ? "Text File" : "Excel Workbook";
      const ef = exportFile(d, object, file, kind);
      d.files = [...(d.files ?? []).filter((f) => !eq(f.name, ef.name)), ef];
      d.exports = [...(d.exports ?? []), { object, format: fmt, file }];
      if (sb(v.saveSteps)) d.savedExports = [...(d.savedExports ?? []).filter((s) => !eq(s.name, sv(v.saveName))), { name: sv(v.saveName) || `Export-${object}`, object, format: fmt, file, description: sv(v.description) || undefined }];
      d.status = `Exported ${object} to ${ef.name}`;
      return out();
    }
    case "backstage:documenter": {
      const objects = sv(v.objects).split(",").map((x) => x.trim()).filter(Boolean);
      if (!objects.length) return out();
      const t = openTab(d, "documenter", "Object Definition", "Print Preview");
      t.doc = documenter(d, objects);
      return out();
    }
    case "backstage:analyzeTable":
      d.flags = { ...(d.flags ?? {}), analyzed: sv(v.table) };
      return out();
    case "backstage:tabOrder": {
      const f = activeDesign(d).form ?? findForm(d, sv(v.form));
      if (!f) return out();
      f.tabOrder = sv(v.order).split(",").map((x) => x.trim()).filter(Boolean);
      markDirty(d);
      return out();
    }
    case "backstage:buttonWizard": {
      const f = activeDesign(d).form;
      if (!f) return out();
      const action = sv(v.action);
      const id = sv(v.name).trim() || nextCtlId(f.controls, "Command");
      const text = sv(v.text).trim() || action;
      const target = sv(v.object);
      const macro = buttonMacro(action, target);
      f.controls = f.controls.filter((x) => !eq(x.id, id));
      f.controls.push({ id, kind: "button", caption: text, section: sv(v.section) || "Form Footer", order: 90, action, onClick: "[Embedded Macro]", macro });
      markDirty(d);
      return out({ selection: `ctl:${f.name}.${id}` });
    }
    case "backstage:options": {
      d.options = { ...(d.options ?? {}), displayForm: sv(v.displayForm) && sv(v.displayForm) !== "(none)" ? sv(v.displayForm) : undefined, appTitle: sv(v.appTitle) || undefined, compactOnClose: sb(v.compactOnClose) };
      return out();
    }
  }
  return out();
}

export const BUTTON_ACTIONS: Record<string, string[]> = {
  "Record Navigation": ["Find Next", "Find Record", "Go To First Record", "Go To Last Record", "Go To Next Record", "Go To Previous Record"],
  "Record Operations": ["Add New Record", "Delete Record", "Duplicate Record", "Print Record", "Save Record", "Undo Record"],
  "Form Operations": ["Apply Form Filter", "Close Form", "Open Form", "Print a Form", "Print Current Form", "Refresh Form Data"],
  "Report Operations": ["Mail Report", "Open Report", "Preview Report", "Print Report", "Send Report to File"],
  Application: ["Quit Application"],
  Miscellaneous: ["Auto Dialer", "Print Table", "Run Macro", "Run Query"],
};

function buttonMacro(action: string, target: string): AccMacro["actions"] {
  switch (action) {
    case "Go To Next Record": return [{ action: "GoToRecord", args: { Record: "Next" } }];
    case "Go To Previous Record": return [{ action: "GoToRecord", args: { Record: "Previous" } }];
    case "Go To First Record": return [{ action: "GoToRecord", args: { Record: "First" } }];
    case "Go To Last Record": return [{ action: "GoToRecord", args: { Record: "Last" } }];
    case "Add New Record": return [{ action: "GoToRecord", args: { Record: "New" } }];
    case "Close Form": return [{ action: "CloseWindow", args: {} }];
    case "Open Form": return [{ action: "OpenForm", args: { "Form Name": target, View: "Form" } }];
    case "Open Report":
    case "Preview Report": return [{ action: "OpenReport", args: { "Report Name": target, View: action === "Preview Report" ? "Print Preview" : "Report" } }];
    case "Run Query": return [{ action: "OpenQuery", args: { "Query Name": target } }];
    case "Run Macro": return [{ action: "RunMacro", args: { "Macro Name": target } }];
    case "Quit Application": return [{ action: "QuitAccess", args: { Options: "Save All" } }];
    case "Save Record": return [{ action: "Comment", args: { Comment: "Save record" } }];
  }
  return [{ action: "Comment", args: { Comment: action } }];
}

function clickButton(d: D, val: string): { doc: D } {
  const [fname, id] = val.split(".");
  const f = findForm(d, fname);
  const ctl = f?.controls.find((x) => eq(x.id, id));
  if (!f || !ctl) return { doc: d };
  const tab = d.open.find((t) => t.kind === "form" && eq(t.name, f.name));
  if (tab) d.active = tab.id;
  if (ctl.onClick === "[Embedded Macro]" && ctl.macro) runMacro(d, { name: "", actions: ctl.macro });
  else if (ctl.onClick === "[Event Procedure]") {
    const m = findModule(d, `Form_${f.name}`);
    if (m) {
      const r = runVba(d, m.code, `${ctl.id}_Click`, d.modules.filter((x) => x !== m).map((x) => x.code));
      applyVbaActions(d, r.actions);
      const msgs: AccPrompt[] = r.messages.map((x) => ({ kind: "message", icon: "none", title: x.title ?? "Microsoft Access", text: x.text }));
      if (r.error) msgs.push({ kind: "message", icon: "error", title: r.error.title, text: r.error.text });
      if (msgs.length) prompt(d, { ...msgs[0], queue: msgs.slice(1) });
    }
  } else if (ctl.onClick) {
    const m = findMacro(d, ctl.onClick);
    if (m) runMacro(d, m);
  }
  return { doc: d };
}

/* ------------------------------------------------------------------ */
/* Requests that confirm first                                         */
/* ------------------------------------------------------------------ */

function deleteRequest(d: D, id: string, ui: SimUi): { doc: D; ui?: Partial<SimUi> } {
  const s = parseSel(ui.selection);
  const out = { doc: d };
  const tab = activeTab(d);
  if ((id === "home.delete" || id === "object.deleteRequest") && s.k === "nav") {
    if (d.open.some((t) => t.kind === s.kind && eq(t.name, s.name))) {
      message(d, `You can't delete the database object '${s.name}' while it's open.\n\nClose the database object, and then delete it.`);
      return out;
    }
    const rels = s.kind === "table" ? d.relationships.filter((r) => eq(r.table, s.name) || eq(r.relatedTable, s.name)) : [];
    const noun = s.kind === "table" ? "table" : s.kind;
    if (rels.length) prompt(d, { kind: "confirm", icon: "warning", text: `You can't delete the table '${s.name}' until its relationships to other tables have been deleted.\n\nDo you want Microsoft Access to delete the relationships now?`, yes: { id: "object.delete" } });
    else prompt(d, { kind: "confirm", icon: "warning", text: `Do you want to delete the ${noun} '${s.name}'?\n\nDeleting this object will remove it from all groups.${s.kind === "table" ? "\n\nFor more information on how to prevent this message from displaying every time you delete an object, click Help." : ""}`, yes: { id: "object.delete" } });
    return out;
  }
  if ((id === "home.delete" || id === "home.deleteRecord") && (s.k === "row" || s.k === "cell" || (tab?.kind === "form" && tab.view === "Form View"))) {
    let table = "";
    let row = "";
    if (s.k === "row" || s.k === "cell") {
      table = s.obj;
      row = s.row;
    } else if (tab) {
      const f = findForm(d, tab.name);
      const t = f ? findTable(d, f.recordSource) : undefined;
      if (t && tab.record !== undefined && tab.record >= 0) {
        table = t.name;
        row = t.rows[tab.record]?._id ?? "";
      }
    }
    const t = findTable(d, table);
    if (!t || !row || !t.rows.some((r) => r._id === row)) return out;
    const plan = deletePlan(d, t.name, [row]);
    if (plan.blocked) {
      message(d, `The record cannot be deleted or changed because table '${plan.blocked}' includes related records.`);
      return out;
    }
    const text = plan.cascade.length
      ? "Relationships that specify cascading deletes are about to cause 1 record(s) in this table and in related tables to be deleted.\n\nAre you sure you want to delete these records?"
      : "You are about to delete 1 record(s).\n\nIf you click Yes, you won't be able to undo this Delete operation.\nAre you sure you want to delete these records?";
    prompt(d, { kind: "confirm", icon: "warning", text, yes: { id: "record.delete", value: `${t.name}.${row}` } });
    return out;
  }
  if ((id === "design.deleteRows" || id === "fields.delete" || id === "home.delete") && (s.k === "field" || s.k === "col" || (id === "fields.delete" && s.k === "cell"))) {
    const sf = selField(d, ui);
    if (!sf) return out;
    const rel = d.relationships.find((r) => (eq(r.table, sf.t.name) && eq(r.field, sf.f.name)) || (eq(r.relatedTable, sf.t.name) && eq(r.relatedField, sf.f.name)));
    if (rel) {
      message(d, `The field '${sf.f.name}' is part of one or more relationships.\n\nIf you want to delete this field, first delete its relationships in the Relationships window.`);
      return out;
    }
    prompt(d, { kind: "confirm", icon: "warning", text: "Do you want to permanently delete the selected field(s) and all the data in the field(s)?\n\nTo permanently delete the field(s), click Yes.", yes: { id: "design.deleteField" } });
    return out;
  }
  if ((id === "relationships.deleteRequest" || id === "home.delete") && s.k === "rel") {
    prompt(d, { kind: "confirm", icon: "warning", text: "Are you sure you want to permanently delete the selected relationship from your database?", yes: { id: "relationships.delete" } });
    return out;
  }
  return out;
}

function deleteObject(d: D, kind: string, name: string) {
  if (kind === "table") {
    d.tables = d.tables.filter((t) => !eq(t.name, name));
    d.relationships = d.relationships.filter((r) => !eq(r.table, name) && !eq(r.relatedTable, name));
    d.relLayout = (d.relLayout ?? []).filter((x) => !eq(x, name));
  }
  if (kind === "query") d.queries = d.queries.filter((q) => !eq(q.name, name));
  if (kind === "form") d.forms = d.forms.filter((f) => !eq(f.name, name));
  if (kind === "report") d.reports = d.reports.filter((r) => !eq(r.name, name));
  if (kind === "macro") d.macros = d.macros.filter((m) => !eq(m.name, name));
  if (kind === "module") d.modules = d.modules.filter((m) => !eq(m.name, name));
  d.prompt = null;
}

/* ------------------------------------------------------------------ */
/* Filters, find, formatting                                           */
/* ------------------------------------------------------------------ */

function setFilter(o: AccTable | AccQuery, field: string, cond: NonNullable<DatasheetView["filter"]>[number]) {
  const v = viewOf(o);
  v.filter = [...(v.filter ?? []).filter((x) => !eq(x.field, field)), cond];
  v.filterOn = true;
}

function cellValue(d: D, t: { obj: AccTable | AccQuery; isTable: boolean }, row: string, field: string): V {
  if (t.isTable) {
    const tb = t.obj as AccTable;
    const r = tb.rows.find((x) => x._id === row);
    const f = findField(tb, field);
    return r && f ? rowValue(tb, f, r) : null;
  }
  const res = runQuery(d, t.obj as AccQuery, {}, { previewOnly: true }).result;
  const ci = res?.columns.findIndex((c) => eq(c, field)) ?? -1;
  const ri = Number(row.replace(/^q/, ""));
  return res && ci >= 0 ? res.rows[ri]?.[ci] ?? null : null;
}

function findNext(d: D, text: string, ui: SimUi): { doc: D; ui?: Partial<SimUi> } {
  const tab = activeTab(d);
  d.find = { text };
  if (!text || !tab) return { doc: d };
  const s = parseSel(ui.selection);
  const needle = text.toLowerCase();
  const match = (v: string) => v.toLowerCase().includes(needle);
  if (tab.kind === "table") {
    const t = findTable(d, tab.name);
    if (!t) return { doc: d };
    const fields = s.k === "cell" || s.k === "col" ? t.fields.filter((f) => eq(f.name, s.field)) : t.fields;
    const startRow = s.k === "cell" ? t.rows.findIndex((r) => r._id === s.row) : -1;
    for (let k = 1; k <= t.rows.length; k++) {
      const r = t.rows[(startRow + k + t.rows.length) % t.rows.length];
      for (const f of fields.length ? fields : t.fields) {
        if (match(displayValue(f, rowValue(t, f, r)))) return { doc: d, ui: { selection: `cell:${t.name}.${r._id}.${f.name}` } };
      }
    }
    message(d, "Microsoft Access finished searching the records. The search item was not found.", "info");
    return { doc: d };
  }
  if (tab.kind === "form") {
    const f = findForm(d, tab.name);
    const src = f ? dataSource(d, tab.params ?? {}).rows(f.recordSource) : null;
    if (!src) return { doc: d };
    const start = tab.record ?? 0;
    for (let k = 1; k <= src.rows.length; k++) {
      const i = (start + k) % src.rows.length;
      if (Object.values(src.rows[i]).some((v) => match(formatValue(v)))) {
        tab.record = i;
        return { doc: d };
      }
    }
    message(d, "Microsoft Access finished searching the records. The search item was not found.", "info");
  }
  return { doc: d };
}

function formatCmd(d: D, id: string, val: string, ui: SimUi): { doc: D } {
  const s = parseSel(ui.selection);
  const apply = (o: { bold?: boolean; italic?: boolean; underline?: boolean; color?: string; fill?: string; fontSize?: number; align?: AccControl["align"] } & { font?: string }) => {
    switch (id) {
      case "home.bold": o.bold = !o.bold; break;
      case "home.italic": o.italic = !o.italic; break;
      case "home.underline": o.underline = !o.underline; break;
      case "home.fontSize": o.fontSize = Number(val) || o.fontSize; break;
      case "home.fontColor": o.color = val || "#000000"; break;
      case "home.fill": o.fill = val; break;
      case "home.alignLeft": o.align = "Left"; break;
      case "home.alignCenter": o.align = "Center"; break;
      case "home.alignRight": o.align = "Right"; break;
      case "home.fontName": o.font = val; break;
    }
  };
  if (s.k === "ctl") {
    const { form, report } = designObj(d, s.obj);
    if (form) {
      const ctl = form.controls.find((x) => eq(x.id, s.id.replace(/_Label$/, "")));
      if (ctl) apply(ctl);
    }
    if (report) {
      const ctl = (report.controls ?? []).find((x) => eq(x.id, s.id));
      if (ctl) apply(ctl);
      else if (eq(s.id, "Title")) {
        report.sectionProps = { ...(report.sectionProps ?? {}), Title: { ...(report.sectionProps?.Title ?? {}), [id]: val || "on" } };
      }
    }
    markDirty(d);
    return { doc: d };
  }
  const t = dsTarget(d, ui);
  if (!t) return { doc: d };
  const v = viewOf(t.obj);
  if (id === "home.fontName") v.font = val;
  else if (id === "home.fontSize") v.fontSize = Number(val) || undefined;
  else if (id === "home.bold") v.bold = !v.bold;
  else if (id === "home.italic") v.italic = !v.italic;
  else if (id === "home.underline") v.underline = !v.underline;
  else if (id === "home.fontColor") v.color = val;
  else if (id === "home.altRow") v.altRow = val;
  else if (id === "home.gridlines") v.gridlines = val;
  return { doc: d };
}

/* ------------------------------------------------------------------ */
/* Ribbon state, contextual tabs, dialogs                              */
/* ------------------------------------------------------------------ */

export function accessContextual(doc: AccessDoc): string[] {
  if (doc.noDb || doc.vbe?.open) return [];
  const t = activeTab(doc);
  if (!t) return [];
  if (t.view === "Print Preview") return ["printPreview"];
  switch (t.kind) {
    case "table": return t.view === "Design View" ? ["tableDesign"] : ["tableFields", "table"];
    case "query": return t.view === "Datasheet View" ? [] : ["queryDesign"];
    case "relationships": return ["relDesign"];
    case "form": return t.view === "Layout View" ? ["formLayout", "formArrange", "formFormat"] : t.view === "Design View" ? ["formDesign", "formArrange", "formFormat"] : [];
    case "report": return t.view === "Layout View" ? ["reportLayout", "reportArrange", "reportFormat", "reportPageSetup"] : t.view === "Design View" ? ["reportDesign", "reportArrange", "reportFormat", "reportPageSetup"] : [];
    case "macro": return ["macroDesign"];
    case "documenter": return ["printPreview"];
  }
  return [];
}

export function accessRibbonState(doc: AccessDoc, ui: SimUi): Record<string, SimValue | undefined> {
  const st: Record<string, SimValue | undefined> = {};
  const t = activeTab(doc);
  const sf = selField(doc, ui);
  if (sf) {
    st["design.primaryKey"] = Boolean(sf.t.pk?.length === 1 && eq(sf.t.pk[0], sf.f.name));
    st["fields.required"] = Boolean(sf.f.required);
    st["fields.unique"] = sf.f.indexed === "Yes (No Duplicates)";
    st["fields.indexed"] = Boolean(sf.f.indexed && sf.f.indexed !== "No");
    st["fields.dataType"] = sf.f.type;
    st["fields.format"] = sf.f.format ?? "";
    st["fields.fieldSize"] = sf.f.type === "Short Text" ? sf.f.size ?? "255" : sf.f.size ?? "";
  }
  if (t?.kind === "query") {
    const q = findQuery(doc, t.name);
    if (q) {
      st["query.totals"] = Boolean(q.totals);
      st["query.type"] = q.type;
      for (const k of ["Select", "Make Table", "Append", "Update", "Crosstab", "Delete"]) st[`qtype:${k}`] = q.type === k;
      st["query.top"] = q.topValues ?? "All";
    }
  }
  st["design.propertySheet"] = Boolean(doc.panes?.propertySheet);
  st["form.fieldList"] = Boolean(doc.panes?.fieldList);
  st["query.addTables"] = Boolean(doc.panes?.addTables);
  st["report.groupSort"] = Boolean(doc.panes?.groupSort);
  st["macro.actionCatalog"] = Boolean(doc.panes?.actionCatalog);
  st["form.wizards"] = !doc.flags?.noWizards;
  const ds = dsTarget(doc, ui);
  if (ds) {
    const v = ds.obj.view ?? {};
    st["home.totals"] = Boolean(v.totalsOn);
    st["home.toggleFilter"] = Boolean(v.filterOn && (v.filter ?? []).length);
    st["home.bold"] = Boolean(v.bold);
    st["home.italic"] = Boolean(v.italic);
    st["home.underline"] = Boolean(v.underline);
    st["home.fontName"] = v.font ?? "Calibri";
    st["home.fontSize"] = String(v.fontSize ?? 11);
  } else {
    st["home.fontName"] = "Calibri";
    st["home.fontSize"] = "11";
  }
  const s = parseSel(ui.selection);
  if (s.k === "ctl") {
    const { form, report } = designObj(doc, s.obj);
    const ctl = form?.controls.find((x) => eq(x.id, s.id.replace(/_Label$/, ""))) ?? report?.controls?.find((x) => eq(x.id, s.id));
    if (ctl) {
      st["home.bold"] = Boolean(ctl.bold);
      st["home.italic"] = Boolean(ctl.italic);
      st["home.underline"] = Boolean(ctl.underline);
      st["home.fontSize"] = String(ctl.fontSize ?? 11);
      st["format.object"] = ctl.id;
    }
  }
  if (t?.kind === "report") {
    const r = findReport(doc, t.name);
    if (r) {
      st["pageSetup.portrait"] = r.orientation === "Portrait";
      st["pageSetup.landscape"] = r.orientation === "Landscape";
      st["report.hideDetails"] = Boolean(r.summaryOnly);
    }
  }
  return st;
}

export function accessDialogDefaults(doc: AccessDoc, ui: SimUi, id: string): Record<string, SimValue> {
  const t = activeTab(doc);
  switch (id) {
    case "saveObject": {
      const o = objectOfTab(doc, t);
      if (doc.vbe?.open && doc.vbe.module) return { name: doc.vbe.module };
      return { name: o ? (o.obj.saved === false ? o.obj.name : `Copy of ${o.obj.name}`) : "" };
    }
    case "nameCaption": {
      const sf = selField(doc, ui);
      return sf ? { name: sf.f.name, caption: sf.f.caption ?? "", description: sf.f.description ?? "" } : {};
    }
    case "fieldWidth": {
      const ds = dsTarget(doc, ui);
      return { width: ds?.field ? ds.obj.view?.widths?.[ds.field] ?? 13.29 : 13.29, standard: false };
    }
    case "makeTable":
    case "appendTo": {
      const q = t?.kind === "query" ? findQuery(doc, t.name) : undefined;
      return { name: q?.target ?? "", db: "Current Database" };
    }
    case "joinProperties": {
      const s = parseSel(ui.selection);
      if (s.k === "qjoin") {
        const q = findQuery(doc, s.query);
        const j = (q?.joins ?? []).find((x) => eq(x.left, s.left) && eq(x.right, s.right));
        const opts = joinOptions(s.left, s.right);
        return { join: j?.type === "left" ? opts[1] : j?.type === "right" ? opts[2] : opts[0] };
      }
      return {};
    }
    case "pageNumbers":
      return { format: "Page N", position: "Bottom of Page [Footer]", align: "Center", first: true };
    case "dateTime":
      return { includeDate: true, dateFormat: "Long Date", includeTime: true, timeFormat: "Long Time" };
    case "find":
      return { findWhat: doc.find?.text ?? "", lookIn: "Current field", match: "Any Part of Field", search: "All" };
  }
  return {};
}

export function joinOptions(left: string, right: string) {
  return [
    `1: Only include rows where the joined fields from both tables are equal.`,
    `2: Include ALL records from '${left}' and only those records from '${right}' where the joined fields are equal.`,
    `3: Include ALL records from '${right}' and only those records from '${left}' where the joined fields are equal.`,
  ];
}

export function accessDialogDef(doc: AccessDoc, ui: SimUi, id: string, base: DialogDef | undefined): DialogDef | undefined {
  if (!base) return undefined;
  const t = activeTab(doc);
  if (id === "saveObject") {
    const o = objectOfTab(doc, t);
    const kind = doc.vbe?.open ? "module" : o?.kind ?? "table";
    const noun = kind === "table" ? "Table" : kind === "query" ? "Query" : kind === "form" ? "Form" : kind === "report" ? "Report" : kind === "macro" ? "Macro" : "Module";
    const saved = o && o.obj.saved !== false;
    return { ...base, fields: [{ type: "text", key: "name", label: saved ? `Save '${o!.obj.name}' To:` : `${noun} Name:` }] };
  }
  if (id === "joinProperties") {
    const s = parseSel(ui.selection);
    if (s.k === "qjoin") {
      const opts = joinOptions(s.left, s.right);
      return { ...base, fields: [{ type: "note", text: `Left Table Name: ${s.left}    Right Table Name: ${s.right}\nLeft Column Name: ${s.leftField}    Right Column Name: ${s.rightField}` }, { type: "radio", key: "join", label: "", options: opts, default: opts[0] }] };
    }
  }
  if (id === "runMacro") {
    const names = doc.macros.filter((m) => m.saved !== false).map((m) => m.name);
    return { ...base, fields: [{ type: "select", key: "name", label: "Macro Name:", options: names.length ? names : ["(none)"] }] };
  }
  if (id === "unhideFields") {
    const ds = dsTarget(doc, ui) ?? (t ? { obj: findTable(doc, t.name) ?? findQuery(doc, t.name) } : null);
    const o = ds?.obj as AccTable | undefined;
    if (o && "fields" in o) return { ...base, fields: o.fields.map((f) => ({ type: "checkbox" as const, key: f.name, label: f.name, default: !(o.view?.hidden ?? []).includes(f.name) })) };
  }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Selection checks (validator)                                        */
/* ------------------------------------------------------------------ */

export function accessSelectionExists(doc: AccessDoc, sel: string): boolean {
  if (!sel) return true;
  const s = parseSel(sel);
  const pre = sel.slice(0, sel.indexOf(":"));
  if (["prop", "qcell", "sql", "label", "section", "marg", "fname", "fdesc", "result"].includes(pre)) {
    if (pre === "sql" || pre === "qcell") return Boolean(findQuery(doc, sel.slice(pre.length + 1).split(".")[0]));
    if (pre === "fname" || pre === "fdesc") return Boolean(findTable(doc, sel.slice(pre.length + 1).split(".")[0]));
    if (pre === "marg") return Boolean(findMacro(doc, sel.slice(5).split(".")[0]));
    if (pre === "label" || pre === "section") {
      const name = sel.slice(pre.length + 1).split(".")[0];
      return Boolean(findForm(doc, name) || findReport(doc, name));
    }
    return true;
  }
  switch (s.k) {
    case "nav": return objectExists(doc, s.kind, s.name);
    case "cell": {
      const t = findTable(doc, s.obj);
      if (t) return Boolean(findField(t, s.field)) && (t.rows.some((r) => r._id === s.row) || s.row === nextRowId(t) || /^r\d+$/.test(s.row));
      return Boolean(findQuery(doc, s.obj));
    }
    case "col": {
      const t = findTable(doc, s.obj);
      return t ? Boolean(findField(t, s.field)) : Boolean(findQuery(doc, s.obj));
    }
    case "row": {
      const t = findTable(doc, s.obj);
      return t ? t.rows.some((r) => r._id === s.row) : Boolean(findQuery(doc, s.obj));
    }
    case "field": return Boolean(findField(findTable(doc, s.table), s.field));
    case "qcol": { const q = findQuery(doc, s.query); return Boolean(q && s.n >= 1 && s.n <= q.cols.length); }
    case "qtable": return Boolean(findQuery(doc, s.query)?.tables.some((x) => eq(x, s.table)));
    case "qjoin": return Boolean(findQuery(doc, s.query)?.joins?.some((j) => eq(j.left, s.left) && eq(j.right, s.right)));
    case "rel": return doc.relationships.some((r) => relKey(r).toLowerCase() === relKey(s).toLowerCase());
    case "reltable": return Boolean(findTable(doc, s.table) || findQuery(doc, s.table));
    case "ctl": {
      const f = findForm(doc, s.obj);
      const r = findReport(doc, s.obj);
      const id = s.id.replace(/_Label$/, "");
      if (f && f.controls.some((c) => eq(c.id, id))) return true;
      if (r && (eq(id, "Title") || eq(id, "PageNumber") || eq(id, "Date") || r.fields.some((x) => eq(x, id)) || (r.groups ?? []).some((g) => eq(g.field, id)) || (r.controls ?? []).some((c) => eq(c.id, id)) || /^Total_/.test(id))) return true;
      return false;
    }
    case "sec": return Boolean(findForm(doc, s.obj) || findReport(doc, s.obj));
    case "form": return Boolean(findForm(doc, s.obj) || findReport(doc, s.obj));
    case "mact": { const m = findMacro(doc, s.macro); return Boolean(m && s.n >= 1 && s.n <= m.actions.length); }
    case "vba": return Boolean(findModule(doc, s.module)) || s.module === "Immediate";
    case "qprops": return Boolean(findQuery(doc, s.query));
  }
  return false;
}

export function accessDescribe(doc: AccessDoc, ui: SimUi): string {
  const s = parseSel(ui.selection);
  switch (s.k) {
    case "nav": return `${s.name} (${s.kind})`;
    case "cell": return `${s.field} in record ${s.row.replace(/^r/, "")} of ${s.obj}`;
    case "col": return `${s.field} column of ${s.obj}`;
    case "row": return `record ${s.row.replace(/^r/, "")} of ${s.obj}`;
    case "field": return `${s.field} field of ${s.table}`;
    case "ctl": return `${s.id} control`;
    case "rel": return `relationship ${s.table} to ${s.relatedTable}`;
    case "sec": return `${s.section} section`;
    default: return "";
  }
}

/** Default value shown in a new record's row (for the canvas). */
export function newRowDefaults(doc: AccessDoc, t: AccTable): AccRecord {
  return newRecord(doc, t, nextRowId(t));
}

export { defaultFor, displayValue, queryText, resultSignature, normalizeCriteria, parseCriteria };
