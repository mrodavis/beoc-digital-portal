import type { AccControl, AccessDoc, AccField, AccForm, AccReport, AccTable, AccDataType, ExternalFile, AccValue } from "./types";
import { dataSource, findField, findQuery, findTable, newField, displayValue, relType } from "./data";
import { formatValue, parseDateText, isoFromSerial, type V } from "./sql";
import { runQuery } from "./query";

/** Fields of a table or query: name, type, caption. */
export function sourceFields(doc: AccessDoc, source: string): { name: string; type?: string; caption?: string; field?: AccField }[] {
  const t = findTable(doc, source);
  if (t) return t.fields.map((f) => ({ name: f.name, type: f.type, caption: f.caption, field: f }));
  const q = findQuery(doc, source);
  if (q) {
    try {
      const src = dataSource(doc).rows(q.name);
      if (src) return src.fields.map((f) => ({ name: f.name, type: f.type }));
    } catch {
      return [];
    }
    const r = runQuery(doc, q, {}, { previewOnly: true });
    if (r.result) return r.result.columns.map((c, i) => ({ name: c, type: r.result!.types?.[i] }));
  }
  return [];
}

export function nextName(existing: string[], base: string): string {
  const taken = new Set(existing.map((x) => x.toLowerCase()));
  if (!taken.has(base.toLowerCase())) return base;
  for (let i = 1; i < 999; i++) if (!taken.has(`${base}${i}`.toLowerCase())) return `${base}${i}`;
  return `${base}${Date.now()}`;
}

/** Table1, Query1, Form1 ... skipping names already used. */
export function nextNumbered(existing: string[], base: string): string {
  const taken = new Set(existing.map((x) => x.toLowerCase()));
  for (let i = 1; i < 999; i++) if (!taken.has(`${base}${i}`.toLowerCase())) return `${base}${i}`;
  return `${base}999`;
}

export function controlForField(f: { name: string; type?: string; caption?: string; field?: AccField }, order: number): AccControl {
  const kind: AccControl["kind"] = f.type === "Yes/No" ? "check" : f.field?.lookup ? "combo" : "textbox";
  const c: AccControl = { id: f.name, kind, source: f.name, label: f.caption || f.name, section: "Detail", order };
  if (f.field?.lookup) {
    c.rowSourceType = f.field.lookup.values ? "Value List" : "Table/Query";
    c.rowSource = f.field.lookup.values ? f.field.lookup.values.map((v) => `"${v}"`).join(";") : f.field.lookup.table;
    c.limitToList = f.field.lookup.limitToList;
  }
  return c;
}

/** The Form tool (Create › Form) and the Form Wizard's result. */
export function buildForm(doc: AccessDoc, name: string, source: string, fields: string[] | null, layout: AccForm["layout"], title?: string): AccForm {
  const all = sourceFields(doc, source);
  const pick = fields ? fields.map((n) => all.find((f) => f.name.toLowerCase() === n.toLowerCase())).filter(Boolean) as typeof all : all;
  const controls: AccControl[] = [{ id: "Title", kind: "label", caption: title ?? name, section: "Form Header", order: 0, fontSize: 18 }];
  pick.forEach((f, i) => controls.push(controlForField(f, i + 1)));
  return { name, recordSource: source, layout, controls, saved: false, allowAdditions: true, allowEdits: true, allowDeletions: true, navigationButtons: true, recordSelectors: true };
}

/** The Report tool (Create › Report). */
export function buildReport(doc: AccessDoc, name: string, source: string): AccReport {
  const all = sourceFields(doc, source);
  return {
    name,
    recordSource: source,
    fields: all.map((f) => f.name),
    layout: "Tabular",
    orientation: "Portrait",
    pageSize: "Letter",
    margins: "Normal",
    title: name,
    totals: all.length ? [{ field: all[0].name, fn: "Count" }] : [],
    pageNumbers: { format: "Page N of M", position: "Bottom of Page [Footer]", align: "Right" },
    dateTime: { date: "Long Date", time: "Long Time" },
    saved: false,
  };
}

/* ------------------------------------------------------------------ */
/* Import from Excel                                                   */
/* ------------------------------------------------------------------ */

function inferType(vals: (string | number | null)[]): { type: AccDataType; size?: string } {
  const present = vals.filter((v) => v !== null && v !== "");
  if (!present.length) return { type: "Short Text", size: "255" };
  if (present.every((v) => typeof v === "number" || (typeof v === "string" && /^[-+]?\d+(\.\d+)?$/.test(v.trim())))) return { type: "Number", size: "Double" };
  if (present.every((v) => typeof v === "string" && /\d/.test(v) && parseDateText(v) !== null && /[/-]/.test(v))) return { type: "Date/Time" };
  if (present.every((v) => typeof v === "string" && /^\$\s?[\d,]+(\.\d+)?$/.test(v.trim()))) return { type: "Currency" };
  if (present.every((v) => typeof v === "string" && /^(yes|no|true|false)$/i.test(v.trim()))) return { type: "Yes/No" };
  return { type: "Short Text", size: "255" };
}

function convert(type: AccDataType, v: string | number | null): AccValue {
  if (v === null || v === "") return null;
  switch (type) {
    case "Number":
    case "Currency": {
      const n = typeof v === "number" ? v : Number(String(v).replace(/[$,\s]/g, ""));
      return Number.isNaN(n) ? null : n;
    }
    case "Date/Time": {
      const s = parseDateText(String(v));
      return s === null ? null : isoFromSerial(s);
    }
    case "Yes/No": return /^(yes|true)$/i.test(String(v));
    default: return String(v);
  }
}

export interface ImportSpec {
  file: string;
  sheet?: string;
  headings: boolean;
  mode: "new" | "append" | "link";
  appendTo?: string;
  pk: string;
  pkField?: string;
  table: string;
  skip?: string[];
}

export function importSheet(doc: AccessDoc, spec: ImportSpec): { table?: AccTable; append?: { table: string; rows: Record<string, AccValue>[] }; error?: string } {
  const file = (doc.files ?? []).find((f) => f.name.toLowerCase() === spec.file.replace(/^.*[\\/]/, "").toLowerCase());
  if (!file) return { error: `The Microsoft Access database engine could not find the object '${spec.file}'.` };
  const sheet = (file.sheets ?? []).find((s) => !spec.sheet || s.name.toLowerCase() === spec.sheet.toLowerCase()) ?? file.sheets?.[0];
  if (!sheet || !sheet.rows.length) return { error: "The wizard is unable to access information in the file. Please check that the file exists and is in the correct format." };
  const width = Math.max(...sheet.rows.map((r) => r.length));
  const heads = spec.headings ? sheet.rows[0].map((h, i) => String(h ?? `Field${i + 1}`).trim() || `Field${i + 1}`) : Array.from({ length: width }, (_, i) => `Field${i + 1}`);
  const data = spec.headings ? sheet.rows.slice(1) : sheet.rows;
  const keep = heads.map((h) => !(spec.skip ?? []).some((s) => s.toLowerCase() === h.toLowerCase()));
  if (spec.mode === "append") {
    const target = findTable(doc, spec.appendTo ?? "");
    if (!target) return { error: "Select the table to append to." };
    const rows = data.map((r) => {
      const o: Record<string, AccValue> = {};
      heads.forEach((h, i) => {
        const f = findField(target, h);
        if (f && keep[i]) o[f.name] = convert(f.type, r[i] ?? null);
      });
      return o;
    });
    return { append: { table: target.name, rows } };
  }
  const fields: AccField[] = [];
  const types = heads.map((_, i) => inferType(data.map((r) => r[i] ?? null)));
  if (spec.pk === "Let Access add primary key") fields.push({ ...newField("ID", "AutoNumber") });
  heads.forEach((h, i) => {
    if (!keep[i]) return;
    const f = newField(h, types[i].type);
    if (types[i].size) f.size = types[i].size;
    fields.push(f);
  });
  const rows = data.map((r, ri) => {
    const rec: Record<string, AccValue> & { _id: string } = { _id: `r${ri + 1}` };
    if (spec.pk === "Let Access add primary key") rec.ID = ri + 1;
    heads.forEach((h, i) => {
      if (keep[i]) rec[h] = convert(types[i].type, r[i] ?? null);
    });
    return rec;
  });
  const t: AccTable = { name: spec.table, fields, rows };
  if (spec.pk === "Let Access add primary key") t.pk = ["ID"];
  else if (spec.pk === "Choose my own primary key" && spec.pkField) t.pk = [spec.pkField];
  if (spec.mode === "link") t.linked = file.name;
  return { table: t };
}

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */

/** The rows an object exports (tables, queries, forms and reports use their data). */
export function exportRows(doc: AccessDoc, object: string): (string | number | null)[][] {
  const t = findTable(doc, object);
  if (t) return [t.fields.map((f) => f.name), ...t.rows.map((r) => t.fields.map((f) => displayValue(f, dataSource(doc).rows(t.name)!.rows[t.rows.indexOf(r)][f.name] as V)))];
  const q = findQuery(doc, object);
  if (q) {
    const r = runQuery(doc, q, {}, { previewOnly: true });
    if (r.result) return [r.result.columns, ...r.result.rows.map((row) => row.map((v, i) => formatValue(v, r.result!.types?.[i])))];
  }
  const f = doc.forms.find((x) => x.name.toLowerCase() === object.toLowerCase());
  if (f) return exportRows(doc, f.recordSource);
  const rp = doc.reports.find((x) => x.name.toLowerCase() === object.toLowerCase());
  if (rp) return exportRows(doc, rp.recordSource);
  return [];
}

export function exportFile(doc: AccessDoc, object: string, file: string, kind: ExternalFile["kind"]): ExternalFile {
  const name = file.replace(/^.*[\\/]/, "");
  const folder = /[\\/]/.test(file) ? file.replace(/[\\/][^\\/]*$/, "") : "C:\\Users\\Student\\Documents";
  const rows = exportRows(doc, object);
  return { name, folder, kind, sheets: [{ name: object, rows }], from: object, size: `${Math.max(8, Math.round(rows.length * 0.6 + 6))} KB` };
}

/* ------------------------------------------------------------------ */
/* Documenter                                                          */
/* ------------------------------------------------------------------ */

export function documenter(doc: AccessDoc, objects: string[]): string[] {
  const out: string[] = [];
  for (const o of objects) {
    const t = findTable(doc, o);
    if (t) {
      out.push(`#Table: ${t.name}`);
      out.push(`Properties|Record Count: ${t.rows.length}|Primary Key: ${(t.pk ?? []).join(", ") || "(none)"}`);
      out.push("Columns|Name|Type|Size");
      for (const f of t.fields) {
        const size = f.type === "Short Text" ? f.size ?? "255" : f.type === "Number" ? (f.size === "Integer" ? "2" : f.size === "Byte" ? "1" : f.size === "Double" ? "8" : "4") : f.type === "Currency" || f.type === "Date/Time" ? "8" : f.type === "Yes/No" ? "1" : f.type === "AutoNumber" ? "4" : "-";
        out.push(`|${f.name}|${f.type === "AutoNumber" ? "Long Integer" : f.type === "Number" ? f.size ?? "Long Integer" : f.type === "Short Text" ? "Short Text" : f.type}|${size}`);
        const props: string[] = [];
        if (f.required) props.push("Required: True");
        if (f.validationRule) props.push(`ValidationRule: ${f.validationRule}`);
        if (f.validationText) props.push(`ValidationText: ${f.validationText}`);
        if (f.defaultValue) props.push(`DefaultValue: ${f.defaultValue}`);
        if (f.inputMask) props.push(`InputMask: ${f.inputMask}`);
        if (f.caption) props.push(`Caption: ${f.caption}`);
        if (f.format) props.push(`Format: ${f.format}`);
        for (const p of props) out.push(`||  ${p}|`);
      }
      const rels = doc.relationships.filter((r) => r.table === t.name || r.relatedTable === t.name);
      if (rels.length) {
        out.push("Relationships|||");
        for (const r of rels) out.push(`|${r.table}.${r.field} → ${r.relatedTable}.${r.relatedField}|${relType(doc, r)}|${r.enforce ? "Enforced" : "Not enforced"}`);
      }
      continue;
    }
    const q = findQuery(doc, o);
    if (q) {
      out.push(`#Query: ${q.name}`);
      out.push(`Properties|Type: ${q.type}|Source: ${q.tables.join(", ")}`);
      try {
        const r = runQuery(doc, q, {}, { previewOnly: true });
        if (r.sql) out.push(`SQL|${r.sql.replace(/\n/g, " ")}||`);
      } catch {
        // ignore
      }
      continue;
    }
    const f = doc.forms.find((x) => x.name === o);
    if (f) {
      out.push(`#Form: ${f.name}`);
      out.push(`Properties|Record Source: ${f.recordSource || "(none)"}|Controls: ${f.controls.length}`);
      for (const c of f.controls) out.push(`|${c.id}|${c.kind}|${c.source ?? c.caption ?? ""}`);
      continue;
    }
    const rp = doc.reports.find((x) => x.name === o);
    if (rp) {
      out.push(`#Report: ${rp.name}`);
      out.push(`Properties|Record Source: ${rp.recordSource}|Orientation: ${rp.orientation}`);
      for (const fld of rp.fields) out.push(`|${fld}|Text Box|${fld}`);
    }
  }
  return out;
}
