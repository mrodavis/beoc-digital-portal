import type { AccessDoc, AccField, AccRecord, AccRelationship, AccTable, AccValue, AccDataType } from "./types";
import {
  type DataSource,
  type V,
  evalExpr,
  formatValue,
  isDate,
  isoFromSerial,
  num,
  parseCriteria,
  parseDateText,
  parseExpr,
  serialFromIso,
  SqlError,
  NeedParam,
  toText,
  compare,
} from "./sql";

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

const eq = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

export const findTable = (doc: AccessDoc, name: string) => doc.tables.find((t) => eq(t.name, name));
export const findQuery = (doc: AccessDoc, name: string) => doc.queries.find((q) => eq(q.name, name));
export const findForm = (doc: AccessDoc, name: string) => doc.forms.find((f) => eq(f.name, name));
export const findReport = (doc: AccessDoc, name: string) => doc.reports.find((r) => eq(r.name, name));
export const findMacro = (doc: AccessDoc, name: string) => doc.macros.find((m) => eq(m.name, name));
export const findModule = (doc: AccessDoc, name: string) => doc.modules.find((m) => eq(m.name, name));
export const findField = (t: AccTable | undefined, name: string) => t?.fields.find((f) => eq(f.name, name));

export function objectExists(doc: AccessDoc, kind: string, name: string): boolean {
  switch (kind) {
    case "table": return Boolean(findTable(doc, name));
    case "query": return Boolean(findQuery(doc, name));
    case "form": return Boolean(findForm(doc, name));
    case "report": return Boolean(findReport(doc, name));
    case "macro": return Boolean(findMacro(doc, name));
    case "module": return Boolean(findModule(doc, name));
  }
  return false;
}

/** Every object name in the database, any kind (Access names must be unique per kind). */
export function nameTaken(doc: AccessDoc, kind: string, name: string, except?: string) {
  const list: { name: string }[] =
    kind === "table" || kind === "query" ? [...doc.tables, ...doc.queries] : kind === "form" ? doc.forms : kind === "report" ? doc.reports : kind === "macro" ? doc.macros : doc.modules;
  return list.some((o) => eq(o.name, name) && (!except || !eq(o.name, except)));
}

/* ------------------------------------------------------------------ */
/* Stored values ↔ engine values                                       */
/* ------------------------------------------------------------------ */

export function storedToV(type: string | undefined, v: AccValue | undefined): V {
  if (v === undefined || v === null) return null;
  if (type === "Date/Time" || type === "Date/Time Extended") {
    if (typeof v === "string") {
      const s = serialFromIso(v);
      return s === null ? v : { $d: s };
    }
    if (typeof v === "number") return { $d: v };
  }
  if (type === "Yes/No") return typeof v === "boolean" ? v : v === "Yes" || v === "True" || v === -1 || v === 1;
  return v as V;
}

export function vToStored(type: string | undefined, v: V): AccValue {
  if (v === null) return null;
  if (isDate(v)) return isoFromSerial(v.$d);
  if (type === "Date/Time" || type === "Date/Time Extended") {
    if (typeof v === "number") return isoFromSerial(v);
    if (typeof v === "string") {
      const s = parseDateText(v);
      return s === null ? v : isoFromSerial(s);
    }
  }
  if (type === "Number" || type === "Currency" || type === "AutoNumber" || type === "Large Number") {
    const n = num(v);
    return n === null ? null : n;
  }
  if (type === "Yes/No") return typeof v === "boolean" ? v : Boolean(num(v));
  if (type === "Short Text" || type === "Long Text" || type === "Hyperlink") return typeof v === "string" ? v : toText(v);
  return v as AccValue;
}

/** Calculated field values for one record. */
function calcValue(t: AccTable, f: AccField, row: AccRecord): V {
  if (!f.expression) return null;
  try {
    const e = parseExpr(f.expression.replace(/^=/, ""));
    return evalExpr(e, {
      ref: (_tb, n) => {
        const ff = findField(t, n);
        if (!ff) throw new SqlError(`The expression contains an unknown name: '${n}'.`);
        return storedToV(ff.type, row[ff.name]);
      },
    });
  } catch {
    return null;
  }
}

export function rowValue(t: AccTable, f: AccField, row: AccRecord): V {
  if (f.type === "Calculated") return calcValue(t, f, row);
  return storedToV(f.type, row[f.name]);
}

/* ------------------------------------------------------------------ */
/* Data source for the SQL engine                                      */
/* ------------------------------------------------------------------ */

type QueryRunner = (doc: AccessDoc, name: string, params: Record<string, string>, depth: number) => { columns: string[]; rows: V[][]; types?: (string | undefined)[] };
let runSavedQuery: QueryRunner | null = null;
/** query.ts registers how a saved query is run when another query uses it as a source. */
export function registerQueryRunner(fn: QueryRunner) {
  runSavedQuery = fn;
}

export function dataSource(doc: AccessDoc, params: Record<string, string> = {}, depth = 0): DataSource {
  return {
    rows(name: string) {
      const t = findTable(doc, name);
      if (t) {
        return {
          name: t.name,
          isTable: true,
          fields: t.fields.map((f) => ({ name: f.name, type: f.type })),
          rows: t.rows.map((r) => {
            const o: Record<string, V> = {};
            for (const f of t.fields) o[f.name] = rowValue(t, f, r);
            return o;
          }),
          ids: t.rows.map((r) => r._id),
        };
      }
      const q = findQuery(doc, name);
      if (q && runSavedQuery && depth < 6) {
        const res = runSavedQuery(doc, q.name, params, depth + 1);
        return {
          name: q.name,
          isTable: false,
          fields: res.columns.map((c, i) => ({ name: c, type: res.types?.[i] })),
          rows: res.rows.map((r) => Object.fromEntries(res.columns.map((c, i) => [c, r[i]]))),
        };
      }
      return null;
    },
  };
}

/* ------------------------------------------------------------------ */
/* Display                                                             */
/* ------------------------------------------------------------------ */

export function applyMaskDisplay(mask: string | undefined, v: string): string {
  if (!mask || !v) return v;
  const { slots, store } = maskSlots(mask);
  if (store) return v;
  let i = 0;
  let out = "";
  for (const s of slots) {
    if (i >= v.length) break;
    if (s.lit !== undefined) out += s.lit;
    else out += v[i++];
  }
  return out;
}

export function displayValue(f: AccField | undefined, v: V): string {
  if (!f) return formatValue(v);
  if (v === null) return "";
  if (f.type === "Short Text" && f.inputMask && typeof v === "string") return applyMaskDisplay(f.inputMask, v);
  return formatValue(v, f.type, f.format, f.decimalPlaces);
}

/* ------------------------------------------------------------------ */
/* Input masks                                                         */
/* ------------------------------------------------------------------ */

type Slot = { lit?: string; cls?: "0" | "9" | "#" | "L" | "?" | "A" | "a" | "&" | "C" };

export function maskSlots(mask: string): { slots: Slot[]; store: boolean; placeholder: string } {
  const parts: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < mask.length; i++) {
    const c = mask[i];
    if (c === '"') inQ = !inQ;
    if (c === "\\" && !inQ) {
      cur += c + (mask[i + 1] ?? "");
      i++;
      continue;
    }
    if (c === ";" && !inQ) {
      parts.push(cur);
      cur = "";
      continue;
    }
    cur += c;
  }
  parts.push(cur);
  const body = parts[0] ?? "";
  const store = (parts[1] ?? "").trim() === "0";
  const placeholder = parts[2] ? parts[2][0] : "_";
  const slots: Slot[] = [];
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === "\\") {
      slots.push({ lit: body[i + 1] ?? "" });
      i++;
    } else if (c === '"') {
      const j = body.indexOf('"', i + 1);
      for (const ch of body.slice(i + 1, j < 0 ? undefined : j)) slots.push({ lit: ch });
      i = j < 0 ? body.length : j;
    } else if ("09#L?Aa&C".includes(c)) slots.push({ cls: c as Slot["cls"] });
    else if (c === "!" || c === "<" || c === ">") continue;
    else slots.push({ lit: c });
  }
  return { slots, store, placeholder };
}

/** The template shown while typing, e.g. "(___) ___-____". */
export function maskTemplate(mask: string): string {
  const { slots, placeholder } = maskSlots(mask);
  return slots.map((s) => (s.lit !== undefined ? s.lit : placeholder)).join("");
}

const fits = (cls: Slot["cls"], ch: string) => {
  switch (cls) {
    case "0": case "9": return /\d/.test(ch);
    case "#": return /[\d +-]/.test(ch);
    case "L": case "?": return /[A-Za-z]/.test(ch);
    case "A": case "a": return /[A-Za-z0-9]/.test(ch);
    default: return true;
  }
};
const required = (cls: Slot["cls"]) => cls === "0" || cls === "L" || cls === "A" || cls === "&";

/** Fit typed text into the mask. Returns stored text, or null if it doesn't fit. */
export function fitMask(mask: string, text: string): { stored: string; display: string } | null {
  const { slots, store } = maskSlots(mask);
  const lits = new Set(slots.filter((s) => s.lit !== undefined).map((s) => s.lit!));
  const data = Array.from(text).filter((c) => !lits.has(c) && c !== "_");
  let di = 0;
  let disp = "";
  let raw = "";
  let missing = false;
  const upper = mask.includes(">");
  for (const s of slots) {
    if (s.lit !== undefined) {
      disp += s.lit;
      continue;
    }
    const ch = data[di];
    if (ch !== undefined && fits(s.cls, ch)) {
      const c = upper ? ch.toUpperCase() : ch;
      disp += c;
      raw += c;
      di++;
    } else {
      if (required(s.cls)) missing = true;
      disp += " ";
    }
  }
  if (missing || di < data.length) return null;
  const display = disp.trimEnd();
  return { stored: store ? display : raw, display };
}

/* ------------------------------------------------------------------ */
/* Typed entry                                                         */
/* ------------------------------------------------------------------ */

export const MSG = {
  invalid: "The value you entered isn't valid for this field.\n\nFor example, you may have entered text in a numeric field or a number that is larger than the FieldSize setting permits.",
  duplicate:
    "The changes you requested to the table were not successful because they would create duplicate values in the index, primary key, or relationship. Change the data in the field or fields that contain duplicate data, remove the index, or redefine the index to permit duplicate entries and try again.",
  related: (t: string) => `You cannot add or change a record because a related record is required in table '${t}'.`,
  hasRelated: (t: string) => `The record cannot be deleted or changed because table '${t}' includes related records.`,
  required: (t: string, f: string) => `You must enter a value in the '${t}.${f}' field.`,
  rule: (rule: string, t: string, f: string) => `One or more values are prohibited by the validation rule '${rule}' set for '${t}.${f}'. Enter a value that the expression for this field can accept.`,
  mask: (m: string) => `The value you entered isn't appropriate for the input mask '${m}' specified for this field.`,
  notInList: "The text you entered isn't an item in the list.\n\nSelect an item from the list, or enter text that matches one of the listed items.",
  autoNumber: (f: string) => `Control can't be edited; it's bound to AutoNumber field '${f}'.`,
  calculated: (f: string) => `Field '${f}' is based on an expression and can't be edited.`,
};

const NUM_RANGE: Record<string, [number, number, boolean]> = {
  Byte: [0, 255, true],
  Integer: [-32768, 32767, true],
  "Long Integer": [-2147483648, 2147483647, true],
  Single: [-3.4e38, 3.4e38, false],
  Double: [-1.79e308, 1.79e308, false],
  Decimal: [-1e28, 1e28, false],
  "Replication ID": [-1e308, 1e308, false],
};

/** Parse what was typed into a field by its data type. */
export function parseInput(f: AccField, raw: string): { ok: true; value: AccValue } | { ok: false; message: string } {
  const text = raw;
  const t = text.trim();
  if (f.type === "AutoNumber") return { ok: false, message: MSG.autoNumber(f.name) };
  if (f.type === "Calculated") return { ok: false, message: MSG.calculated(f.name) };
  if (f.type === "Attachment" || f.type === "OLE Object") return { ok: false, message: MSG.invalid };
  if (t === "") return { ok: true, value: null };
  switch (f.type as AccDataType) {
    case "Number":
    case "Large Number": {
      const n = Number(t.replace(/,/g, ""));
      if (!/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(t.replace(/,/g, "")) || Number.isNaN(n)) return { ok: false, message: MSG.invalid };
      const range = NUM_RANGE[f.size ?? "Long Integer"] ?? NUM_RANGE["Long Integer"];
      const v = range[2] ? Math.round(n) : n;
      if (v < range[0] || v > range[1]) return { ok: false, message: MSG.invalid };
      return { ok: true, value: v };
    }
    case "Currency": {
      const s = t.replace(/[$,\s]/g, "").replace(/^\((.*)\)$/, "-$1");
      if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return { ok: false, message: MSG.invalid };
      return { ok: true, value: Math.round(Number(s) * 10000) / 10000 };
    }
    case "Date/Time":
    case "Date/Time Extended": {
      if (f.inputMask) {
        const fit = fitMask(f.inputMask, t);
        if (!fit) return { ok: false, message: MSG.mask(f.inputMask) };
      }
      const s = parseDateText(t);
      if (s === null) return { ok: false, message: MSG.invalid };
      return { ok: true, value: isoFromSerial(s) };
    }
    case "Yes/No": {
      const l = t.toLowerCase();
      if (["yes", "true", "on", "-1", "1", "x"].includes(l)) return { ok: true, value: true };
      if (["no", "false", "off", "0"].includes(l)) return { ok: true, value: false };
      return { ok: false, message: MSG.invalid };
    }
    default: {
      let v = text;
      if (f.inputMask) {
        const fit = fitMask(f.inputMask, text);
        if (!fit) return { ok: false, message: MSG.mask(f.inputMask) };
        v = fit.stored;
      }
      if (f.type === "Short Text") {
        const size = Number(f.size ?? 255) || 255;
        if (v.length > size) v = v.slice(0, size);
      }
      return { ok: true, value: v };
    }
  }
}

export function lookupValues(doc: AccessDoc, f: AccField): string[] | null {
  if (!f.lookup) return null;
  if (f.lookup.values) return f.lookup.values;
  if (f.lookup.table) {
    const t = findTable(doc, f.lookup.table);
    const ff = findField(t, f.lookup.field ?? "");
    if (t && ff) return t.rows.map((r) => displayValue(ff, rowValue(t, ff, r))).filter(Boolean);
    const q = findQuery(doc, f.lookup.table);
    if (q) {
      try {
        const src = dataSource(doc).rows(q.name);
        if (src) return src.rows.map((r) => toText(r[f.lookup!.field ?? src.fields[0]?.name] ?? null));
      } catch {
        return [];
      }
    }
  }
  return null;
}

/** Relationships where this table/field is the "many" side and integrity is enforced. */
export const parentRels = (doc: AccessDoc, table: string, field?: string) =>
  doc.relationships.filter((r) => r.enforce && eq(r.relatedTable, table) && (!field || eq(r.relatedField, field)));
/** Relationships where this table is the "one" side and integrity is enforced. */
export const childRels = (doc: AccessDoc, table: string, field?: string) =>
  doc.relationships.filter((r) => r.enforce && eq(r.table, table) && (!field || eq(r.field, field)));

function sameValue(type: string | undefined, a: AccValue | undefined, b: AccValue | undefined) {
  const c = compare(storedToV(type, a ?? null), storedToV(type, b ?? null));
  return c === 0;
}

export function evalRule(rule: string, value: V, doc?: AccessDoc, fields?: Record<string, V>): boolean | null {
  try {
    const e = parseCriteria(rule);
    const r = evalExpr(e, {
      implicit: value,
      db: doc ? dataSource(doc) : undefined,
      ref: (_t, n) => {
        if (fields) {
          const k = Object.keys(fields).find((x) => eq(x, n));
          if (k !== undefined) return fields[k];
        }
        throw new NeedParam(n);
      },
    });
    if (r === null) return null;
    return Boolean(r);
  } catch {
    return null;
  }
}

export type EntryResult =
  | { ok: true; value: AccValue; cascade?: { table: string; field: string; ids: string[]; value: AccValue }[] }
  | { ok: false; message: string; title?: string };

/**
 * Everything Access checks when a value is typed into a field and the record is saved. With
 * `atSave` false (a datasheet or form leaving the field), the related-record check is left out: the
 * window runs relatedRecordMissing() when the learner leaves the record, as Access does.
 */
export function checkEntry(doc: AccessDoc, table: AccTable, rowId: string, field: AccField, raw: string, atSave = true): EntryResult {
  const p = parseInput(field, raw);
  if (!p.ok) return p;
  let value = p.value;
  const row = table.rows.find((r) => r._id === rowId);
  // Lookup list
  if (field.lookup?.limitToList && value !== null) {
    const list = lookupValues(doc, field);
    if (list && !list.some((x) => eq(x, String(value)))) return { ok: false, message: MSG.notInList };
    if (list) value = list.find((x) => eq(x, String(value))) ?? value;
  }
  // Required
  if (value === null && (field.required || table.pk?.some((k) => eq(k, field.name))) && row) {
    return { ok: false, message: MSG.required(table.name, field.name) };
  }
  // Validation rule
  if (field.validationRule && value !== null) {
    const ok = evalRule(field.validationRule, storedToV(field.type, value), doc);
    if (ok === false) return { ok: false, message: field.validationText?.trim() || MSG.rule(field.validationRule, table.name, field.name) };
  }
  // Table-level rule
  if (table.validationRule && row) {
    const vals: Record<string, V> = {};
    for (const f of table.fields) vals[f.name] = rowValue(table, f, row);
    vals[field.name] = storedToV(field.type, value);
    const ok = evalRule(table.validationRule, null, doc, vals);
    if (ok === false) return { ok: false, message: table.validationText?.trim() || `One or more values are prohibited by the validation rule '${table.validationRule}' set for '${table.name}'. Enter a value that the expression for this field can accept.` };
  }
  // Primary key / unique index
  const unique = (table.pk?.length === 1 && eq(table.pk[0], field.name)) || field.indexed === "Yes (No Duplicates)";
  if (unique && value !== null && table.rows.some((r) => r._id !== rowId && sameValue(field.type, r[field.name], value))) {
    return { ok: false, message: MSG.duplicate };
  }
  // Referential integrity: this field points at a parent.
  const missing = atSave ? relatedRecordMissing(doc, table, field, value) : null;
  if (missing) return { ok: false, message: MSG.related(missing) };
  // Referential integrity: this field is a parent key with children.
  const cascade: { table: string; field: string; ids: string[]; value: AccValue }[] = [];
  if (row && !sameValue(field.type, row[field.name], value)) {
    for (const rel of childRels(doc, table.name, field.name)) {
      const child = findTable(doc, rel.relatedTable);
      const cf = findField(child, rel.relatedField);
      if (!child || !cf) continue;
      const kids = child.rows.filter((r) => sameValue(cf.type, r[cf.name], row[field.name]));
      if (!kids.length) continue;
      if (!rel.cascadeUpdate) return { ok: false, message: MSG.hasRelated(child.name) };
      cascade.push({ table: child.name, field: cf.name, ids: kids.map((k) => k._id), value });
    }
  }
  return { ok: true, value, cascade: cascade.length ? cascade : undefined };
}

/** Required fields still empty in a record (checked when the record is saved). */
/**
 * The parent table a foreign-key value has no match in (enforced relationships only), or null.
 * Access checks this when the record is saved, not when you leave the field.
 */
export function relatedRecordMissing(doc: AccessDoc, table: AccTable, field: AccField, value: AccValue | undefined): string | null {
  if (value === null || value === undefined || value === "") return null;
  for (const rel of parentRels(doc, table.name, field.name)) {
    const parent = findTable(doc, rel.table);
    const pf = findField(parent, rel.field);
    if (parent && pf && !parent.rows.some((r) => sameValue(pf.type, r[pf.name], value))) return parent.name;
  }
  return null;
}

export function missingRequired(table: AccTable, row: AccRecord): string | null {
  for (const f of table.fields) {
    if (f.type === "AutoNumber" || f.type === "Calculated") continue;
    const v = row[f.name];
    if ((f.required || table.pk?.some((k) => eq(k, f.name))) && (v === null || v === undefined || v === "")) return f.name;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Records                                                             */
/* ------------------------------------------------------------------ */

export function nextRowId(t: AccTable): string {
  let max = 0;
  for (const r of t.rows) {
    const m = /^r(\d+)$/.exec(r._id);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return `r${Math.max(max, t.rows.length) + 1}`;
}

export function nextAutoNumber(t: AccTable, f: AccField): number {
  let max = 0;
  for (const r of t.rows) {
    const v = r[f.name];
    if (typeof v === "number") max = Math.max(max, v);
  }
  return max + 1;
}

export function defaultFor(doc: AccessDoc, f: AccField): AccValue {
  const d = (f.defaultValue ?? "").trim();
  if (!d) return f.type === "Yes/No" ? false : null;
  try {
    const v = evalExpr(parseExpr(d.replace(/^=/, "")), { ref: (_t, n) => { throw new NeedParam(n); }, db: dataSource(doc) });
    return vToStored(f.type, v);
  } catch {
    return vToStored(f.type, d.replace(/^"(.*)"$/, "$1"));
  }
}

export function newRecord(doc: AccessDoc, t: AccTable, id: string): AccRecord {
  const r: AccRecord = { _id: id };
  for (const f of t.fields) {
    if (f.type === "AutoNumber") r[f.name] = nextAutoNumber(t, f);
    else if (f.type !== "Calculated") {
      const v = defaultFor(doc, f);
      if (v !== null) r[f.name] = v;
    }
  }
  return r;
}

/** Records that block or cascade when deleting rows from a table. */
export function deletePlan(doc: AccessDoc, table: string, ids: string[]): { blocked?: string; cascade: { table: string; ids: string[] }[] } {
  const cascade: { table: string; ids: string[] }[] = [];
  const visit = (tName: string, rowIds: string[], depth: number): string | undefined => {
    if (depth > 5) return undefined;
    const t = findTable(doc, tName);
    if (!t) return undefined;
    const rows = t.rows.filter((r) => rowIds.includes(r._id));
    for (const rel of childRels(doc, tName)) {
      const child = findTable(doc, rel.relatedTable);
      const pf = findField(t, rel.field), cf = findField(child, rel.relatedField);
      if (!child || !pf || !cf) continue;
      const kids = child.rows.filter((k) => rows.some((r) => sameValue(pf.type, r[pf.name], k[cf.name])));
      if (!kids.length) continue;
      if (!rel.cascadeDelete) return child.name;
      cascade.push({ table: child.name, ids: kids.map((k) => k._id) });
      const b = visit(child.name, kids.map((k) => k._id), depth + 1);
      if (b) return b;
    }
    return undefined;
  };
  const blocked = visit(table, ids, 0);
  return { blocked, cascade };
}

/* ------------------------------------------------------------------ */
/* Fields                                                              */
/* ------------------------------------------------------------------ */

export function newField(name: string, type: AccDataType): AccField {
  const f: AccField = { name, type };
  if (type === "Short Text") {
    f.size = "255";
    f.allowZeroLength = true;
  }
  if (type === "Number") {
    f.size = "Long Integer";
    f.decimalPlaces = "Auto";
  }
  if (type === "Currency") f.format = "Currency";
  if (type === "Yes/No") {
    f.format = "Yes/No";
    f.defaultValue = "No";
  }
  if (type === "AutoNumber") {
    f.size = "Long Integer";
    f.newValues = "Increment";
  }
  if (type === "Long Text") f.allowZeroLength = true;
  return f;
}

/** Change a field's type, converting existing values the way Access does. */
export function convertValues(t: AccTable, f: AccField, to: AccDataType): { rows: AccRecord[]; lost: number } {
  let lost = 0;
  const rows = t.rows.map((r) => {
    const v = r[f.name];
    if (v === null || v === undefined) return r;
    const text = typeof v === "string" ? v : displayValue(f, storedToV(f.type, v));
    const p = parseInput({ ...newField(f.name, to), name: f.name, type: to === "AutoNumber" ? "Number" : to }, text);
    if (!p.ok) {
      lost++;
      return { ...r, [f.name]: null };
    }
    return { ...r, [f.name]: p.value };
  });
  return { rows, lost };
}

export function fieldNames(doc: AccessDoc, tables: string[]): string[] {
  const out: string[] = [];
  for (const n of tables) {
    const t = findTable(doc, n);
    if (t) out.push(...t.fields.map((f) => f.name));
    const q = findQuery(doc, n);
    if (q) {
      try {
        const src = dataSource(doc).rows(q.name);
        if (src) out.push(...src.fields.map((f) => f.name));
      } catch {
        // ignore
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Relationships                                                       */
/* ------------------------------------------------------------------ */

const isUnique = (t: AccTable, field: string) => (t.pk?.length === 1 && eq(t.pk[0], field)) || findField(t, field)?.indexed === "Yes (No Duplicates)";

export function relType(doc: AccessDoc, r: AccRelationship): "One-To-Many" | "One-To-One" | "Indeterminate" {
  const a = findTable(doc, r.table), b = findTable(doc, r.relatedTable);
  if (!a || !b) return "Indeterminate";
  const ua = isUnique(a, r.field), ub = isUnique(b, r.relatedField);
  if (ua && ub) return "One-To-One";
  if (ua || ub) return "One-To-Many";
  return "Indeterminate";
}

const typeFamily = (f: AccField) => (f.type === "AutoNumber" ? "Number:Long Integer" : f.type === "Number" ? `Number:${f.size ?? "Long Integer"}` : f.type === "Long Text" ? "Long Text" : f.type);

/** Put the primary-key side first, whichever way the field was dragged. */
export function orientRel(doc: AccessDoc, r: AccRelationship): AccRelationship {
  const a = findTable(doc, r.table), b = findTable(doc, r.relatedTable);
  if (a && b && !isUnique(a, r.field) && isUnique(b, r.relatedField)) {
    return { ...r, table: r.relatedTable, field: r.relatedField, relatedTable: r.table, relatedField: r.field, join: r.join === 2 ? 3 : r.join === 3 ? 2 : r.join };
  }
  return r;
}

/** Why Access would refuse to create this relationship, or null. */
export function relProblem(doc: AccessDoc, r: AccRelationship): string | null {
  const a = findTable(doc, r.table), b = findTable(doc, r.relatedTable);
  const fa = findField(a, r.field), fb = findField(b, r.relatedField);
  if (!a || !b || !fa || !fb) return "Invalid field definition in definition of index or relationship.";
  if (typeFamily(fa) !== typeFamily(fb)) return "Relationship must be on the same number of fields with the same data types.";
  if (!r.enforce) return null;
  if (relType(doc, r) === "Indeterminate") return "No unique index found for the referenced field of the primary table.";
  for (const k of b.rows) {
    const v = k[fb.name];
    if (v === null || v === undefined) continue;
    if (!a.rows.some((p) => sameValue(fa.type, p[fa.name], v))) return `Data in the table '${b.name}' violates referential integrity rules.`;
  }
  return null;
}

export const relKey = (r: { table: string; field: string; relatedTable: string; relatedField: string }) => `${r.table}.${r.field}-${r.relatedTable}.${r.relatedField}`;
