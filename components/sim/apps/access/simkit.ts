/**
 * Builders for Access practice sims: fields, tables with rows, open tabs,
 * selection lists and the common steps (open, save, add a query field).
 * Everything returned is plain JSON, so sim definitions stay serializable.
 */
import type { SimAction, SimAlt, SimRequires, SimStep, SimValue } from "@/types/sim";
import type { AccField, AccRecord, AccTab, AccTable, AccValue, AccView } from "./types";
import { IMPORT_MODES, LOOKUP_SOURCES, PK_OPTIONS, QUERY_OPEN, FORM_OPEN, REPORT_OPEN } from "./dialogs";

export { IMPORT_MODES, LOOKUP_SOURCES, PK_OPTIONS, QUERY_OPEN, FORM_OPEN, REPORT_OPEN };

/* ------------------------------------------------------------------ */
/* Fields and tables                                                   */
/* ------------------------------------------------------------------ */

type FX = Partial<AccField>;
export const fld = {
  auto: (name: string, x: FX = {}): AccField => ({ name, type: "AutoNumber", size: "Long Integer", newValues: "Increment", ...x }),
  text: (name: string, size = 255, x: FX = {}): AccField => ({ name, type: "Short Text", size: String(size), allowZeroLength: true, ...x }),
  long: (name: string, x: FX = {}): AccField => ({ name, type: "Long Text", allowZeroLength: true, ...x }),
  num: (name: string, x: FX = {}): AccField => ({ name, type: "Number", size: "Long Integer", ...x }),
  dbl: (name: string, x: FX = {}): AccField => ({ name, type: "Number", size: "Double", ...x }),
  cur: (name: string, x: FX = {}): AccField => ({ name, type: "Currency", format: "Currency", ...x }),
  date: (name: string, x: FX = {}): AccField => ({ name, type: "Date/Time", format: "Short Date", ...x }),
  yes: (name: string, x: FX = {}): AccField => ({ name, type: "Yes/No", format: "Yes/No", defaultValue: "No", ...x }),
};

/** A table whose rows are given as arrays in field order. Row ids are r1, r2, ... */
export function table(name: string, fields: AccField[], rows: AccValue[][], opts: { pk?: string[]; saved?: boolean; description?: string } = {}): AccTable {
  const recs: AccRecord[] = rows.map((r, i) => {
    const rec: AccRecord = { _id: `r${i + 1}` };
    fields.forEach((f, j) => {
      if (r[j] !== undefined && r[j] !== null) rec[f.name] = r[j];
    });
    return rec;
  });
  const pk = opts.pk ?? (fields[0]?.type === "AutoNumber" ? [fields[0].name] : []);
  return { name, fields, pk, rows: recs, saved: opts.saved ?? true, ...(opts.description ? { description: opts.description } : {}) };
}

/** The id the next new record gets (r13 after r1..r12). */
export const nextId = (t: AccTable) => `r${t.rows.length + 1}`;

/** Row id of the first record whose field equals the value. */
export function rowOf(t: AccTable, field: string, value: AccValue): string {
  const r = t.rows.find((x) => x[field] === value);
  if (!r) throw new Error(`simkit: no ${t.name} record with ${field} = ${value}`);
  return r._id;
}

/* ------------------------------------------------------------------ */
/* Window state                                                        */
/* ------------------------------------------------------------------ */

export const tab = (kind: AccTab["kind"], name: string, view: AccView): AccTab => ({ id: `${kind}:${name}`, kind, name, view, ...(kind === "form" && view === "Form View" ? { record: 0 } : {}) });

/* ------------------------------------------------------------------ */
/* Selections                                                          */
/* ------------------------------------------------------------------ */

/** A datasheet column: its header or any cell in it. */
export const colSel = (t: AccTable, field: string) => [`col:${t.name}.${field}`, ...t.rows.map((r) => `cell:${t.name}.${r._id}.${field}`)];
/** A record: its selector or any of its cells. */
export const rowSel = (t: AccTable, id: string) => [`row:${t.name}.${id}`, ...t.fields.map((f) => `cell:${t.name}.${id}.${f.name}`)];
/** The cells in a column that hold this value. */
export const cellsWith = (t: AccTable, field: string, value: AccValue) => t.rows.filter((r) => r[field] === value).map((r) => `cell:${t.name}.${r._id}.${field}`);
/** A field, picked in Design view or in Datasheet view. */
export const anyField = (t: AccTable, field: string) => [`field:${t.name}.${field}`, ...colSel(t, field)];
/** A field row in table Design view. */
export const designField = (table: string, field: string) => `field:${table}.${field}`;
/** A form or report control, or its attached label. */
export const ctl = (obj: string, id: string) => [`ctl:${obj}.${id}`, `ctl:${obj}.${id}_Label`];

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */

type StepX = { requires?: SimRequires; selectHint?: string; alt?: SimAlt[] };

export const cmd = (id: string, value?: SimValue | SimValue[], x: StepX = {}): SimStep => ({ action: { kind: "command", id, ...(value !== undefined ? { value } : {}) }, ...x });
export const dlg = (id: string, values: Record<string, SimValue | SimValue[]>, x: StepX = {}): SimStep => ({ action: { kind: "dialog", id, values }, ...x });
export const typed = (target: string, value: string | string[], x: StepX & { match?: "exact" | "includes" | "all" } = {}): SimStep => {
  const { match, ...rest } = x;
  return { action: { kind: "type", target, value, ...(match ? { match } : {}) }, ...rest };
};
export const select = (target: string | string[]): SimStep => ({ action: { kind: "select", target } });

/** Open an object from the Navigation Pane (double-click, Enter, or right-click › Open). */
export const openObj = (kind: string, name: string): SimStep => cmd("nav.open", `${kind}:${name}`);
/** Open an object in a given view (right-click in the Navigation Pane), or switch the open tab to it. */
export const openIn = (kind: string, name: string, view: AccView): SimStep => ({
  action: { kind: "command", id: "nav.view", value: `${kind}:${name}|${view}` },
  alt: [{ kind: "command", id: "view.switch", value: view }],
});
/** Switch the active tab's view (Home › View, the status bar buttons). */
export const viewSwitch = (view: AccView): SimStep => cmd("view.switch", view);
/** Name and save a new object in the Save As box (Ctrl+S, F12, File › Save, or closing the tab). */
export const saveAs = (name: string | string[]): SimStep => dlg("saveObject", { name });
/** Save the active object (Ctrl+S, the Quick Access Toolbar, File › Save). */
export const saveObj = (): SimStep => cmd("file.save");

/** Add a field to the query grid by double-clicking or dragging it, or by typing it in an empty Field cell. */
export const addQField = (query: string, table: string, field: string): SimStep => ({
  action: { kind: "command", id: "query.addField", value: `${table}.${field}` },
  alt: [{ kind: "type", target: `qcell:${query}.new.Field`, value: field }],
});
/** Type into a query design grid cell. */
export const qcell = (query: string, col: string, row: string, value: string | string[]): SimStep => typed(`qcell:${query}.${col}.${row}`, value);
/** Run the query (Run, or Datasheet View). */
export const runQuery = (): SimStep => ({ action: { kind: "command", id: "query.run" }, alt: [{ kind: "command", id: "view.switch", value: "Datasheet View" }] });

/** Type a value into a datasheet or form cell. */
export const cell = (table: string, id: string, field: string, value: string | string[]): SimStep => typed(`cell:${table}.${id}.${field}`, value);

/** A Field Properties / Property Sheet value, typed or picked, for the selected field or control. */
export const prop = (name: string, value: string | string[], requires: string | string[], selectHint: string, alt: SimAlt[] = []): SimStep => ({
  action: { kind: "type", target: `prop:${name}`, value },
  requires: { selection: requires },
  selectHint,
  ...(alt.length ? { alt } : {}),
});

/** Every spacing of "a: b" an Access user is likely to type, for exact matches on short values. */
export function spaced(...variants: string[]): string[] {
  const out = new Set<string>();
  for (const v of variants) {
    out.add(v);
    out.add(v.replace(/\s*([=<>*+/&-])\s*/g, "$1"));
    out.add(v.replace(/\s*([=<>*+/&-]+)\s*/g, " $1 "));
  }
  return Array.from(out);
}

/** Alternative actions helper (keeps sims tidy). */
export const alt = (a: SimAction, requires?: SimRequires): SimAlt => (requires ? { ...a, requires } : a) as SimAlt;
