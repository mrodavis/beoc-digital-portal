/**
 * The database templates on the File › New page. Each builds a small,
 * empty database the way Access's own templates arrive: tables with their
 * fields, a query, a details form, a list form, and a couple of reports.
 */
import type { AccessDoc, AccField, AccForm, AccQuery, AccReport, AccTable } from "./types";
import { buildForm, buildReport } from "./build";

const f = (name: string, type: AccField["type"], extra: Partial<AccField> = {}): AccField => ({
  name,
  type,
  ...(type === "Short Text" ? { size: "255", allowZeroLength: true } : {}),
  ...(type === "Number" ? { size: "Long Integer" } : {}),
  ...(type === "Currency" ? { format: "Currency" } : {}),
  ...(type === "Yes/No" ? { format: "Yes/No", defaultValue: "No" } : {}),
  ...(type === "AutoNumber" ? { size: "Long Integer", newValues: "Increment" } : {}),
  ...extra,
});

type Spec = {
  table: AccTable;
  query?: AccQuery;
  forms: { name: string; layout: AccForm["layout"]; fields?: string[] }[];
  reports: { name: string; fields?: string[]; group?: string; sort?: string }[];
};

const SPECS: Record<string, () => Spec> = {
  contacts: () => ({
    table: {
      name: "Contacts",
      pk: ["ID"],
      rows: [],
      saved: true,
      fields: [
        f("ID", "AutoNumber"),
        f("Company", "Short Text"),
        f("Last Name", "Short Text"),
        f("First Name", "Short Text"),
        f("E-mail Address", "Short Text"),
        f("Job Title", "Short Text"),
        f("Business Phone", "Short Text"),
        f("Mobile Phone", "Short Text"),
        f("Address", "Long Text"),
        f("City", "Short Text"),
        f("State/Province", "Short Text"),
        f("ZIP/Postal Code", "Short Text"),
        f("Notes", "Long Text"),
      ],
    },
    query: {
      name: "Contacts Extended",
      type: "Select",
      tables: ["Contacts"],
      saved: true,
      cols: [
        { field: 'Contact Name: [Last Name] & ", " & [First Name]', table: "Contacts", show: true, sort: "Ascending" },
        { field: "Company", table: "Contacts", show: true },
        { field: "E-mail Address", table: "Contacts", show: true },
        { field: "Business Phone", table: "Contacts", show: true },
        { field: "Mobile Phone", table: "Contacts", show: true },
      ],
    },
    forms: [
      { name: "Contact Details", layout: "Columnar" },
      { name: "Contact List", layout: "Datasheet", fields: ["Last Name", "First Name", "Company", "E-mail Address", "Business Phone", "Mobile Phone"] },
    ],
    reports: [
      { name: "Contact Address Book", fields: ["Last Name", "First Name", "Address", "City", "State/Province", "ZIP/Postal Code"], sort: "Last Name" },
      { name: "Contact Phone List", fields: ["Last Name", "First Name", "Business Phone", "Mobile Phone"], sort: "Last Name" },
    ],
  }),
  "asset tracking": () => ({
    table: {
      name: "Assets",
      pk: ["ID"],
      rows: [],
      saved: true,
      fields: [
        f("ID", "AutoNumber"),
        f("Item", "Short Text"),
        f("Description", "Long Text"),
        f("Category", "Short Text", { lookup: { values: ["(1) Category", "(2) Category", "(3) Category"] } }),
        f("Condition", "Short Text", { lookup: { values: ["(1) New", "(2) Good", "(3) Fair", "(4) Poor"] } }),
        f("Acquired Date", "Date/Time", { format: "Short Date" }),
        f("Purchase Price", "Currency"),
        f("Current Value", "Currency"),
        f("Location", "Short Text"),
        f("Manufacturer", "Short Text"),
        f("Model", "Short Text"),
        f("Retired", "Yes/No"),
      ],
    },
    query: {
      name: "Current Assets",
      type: "Select",
      tables: ["Assets"],
      saved: true,
      cols: [
        { field: "Item", table: "Assets", show: true, sort: "Ascending" },
        { field: "Category", table: "Assets", show: true },
        { field: "Location", table: "Assets", show: true },
        { field: "Current Value", table: "Assets", show: true },
        { field: "Retired", table: "Assets", show: false, criteria: "False" },
      ],
    },
    forms: [
      { name: "Asset Details", layout: "Columnar" },
      { name: "Asset List", layout: "Datasheet", fields: ["Item", "Category", "Condition", "Location", "Current Value"] },
    ],
    reports: [
      { name: "All Assets", fields: ["Item", "Category", "Condition", "Location", "Current Value"], sort: "Item" },
      { name: "Assets by Category", fields: ["Item", "Condition", "Location", "Current Value"], group: "Category" },
    ],
  }),
  students: () => ({
    table: {
      name: "Students",
      pk: ["ID"],
      rows: [],
      saved: true,
      fields: [
        f("ID", "AutoNumber"),
        f("Student ID", "Short Text"),
        f("Last Name", "Short Text"),
        f("First Name", "Short Text"),
        f("E-mail Address", "Short Text"),
        f("Mobile Phone", "Short Text"),
        f("Level", "Short Text", { lookup: { values: ["Freshman", "Sophomore", "Junior", "Senior"] } }),
        f("Room", "Short Text"),
        f("Date of Birth", "Date/Time", { format: "Short Date" }),
        f("Notes", "Long Text"),
      ],
    },
    query: {
      name: "Students Extended",
      type: "Select",
      tables: ["Students"],
      saved: true,
      cols: [
        { field: 'Student Name: [Last Name] & ", " & [First Name]', table: "Students", show: true, sort: "Ascending" },
        { field: "Student ID", table: "Students", show: true },
        { field: "Level", table: "Students", show: true },
        { field: "Room", table: "Students", show: true },
      ],
    },
    forms: [
      { name: "Student Details", layout: "Columnar" },
      { name: "Student List", layout: "Datasheet", fields: ["Student ID", "Last Name", "First Name", "Level", "Room", "E-mail Address"] },
    ],
    reports: [
      { name: "All Students", fields: ["Student ID", "Last Name", "First Name", "Level", "Room"], sort: "Last Name" },
      { name: "Students by Level", fields: ["Last Name", "First Name", "Room"], group: "Level" },
    ],
  }),
  "event management": () => ({
    table: {
      name: "Events",
      pk: ["ID"],
      rows: [],
      saved: true,
      fields: [
        f("ID", "AutoNumber"),
        f("Title", "Short Text"),
        f("Start Time", "Date/Time", { format: "General Date" }),
        f("End Time", "Date/Time", { format: "General Date" }),
        f("Location", "Short Text"),
        f("Description", "Long Text"),
      ],
    },
    query: {
      name: "Upcoming Events",
      type: "Select",
      tables: ["Events"],
      saved: true,
      cols: [
        { field: "Title", table: "Events", show: true },
        { field: "Start Time", table: "Events", show: true, sort: "Ascending", criteria: ">=Date()" },
        { field: "Location", table: "Events", show: true },
      ],
    },
    forms: [
      { name: "Event Details", layout: "Columnar" },
      { name: "Event List", layout: "Datasheet", fields: ["Title", "Start Time", "End Time", "Location"] },
    ],
    reports: [{ name: "All Events", fields: ["Title", "Start Time", "End Time", "Location"], sort: "Start Time" }],
  }),
  "task management": () => ({
    table: {
      name: "Tasks",
      pk: ["ID"],
      rows: [],
      saved: true,
      fields: [
        f("ID", "AutoNumber"),
        f("Title", "Short Text"),
        f("Priority", "Short Text", { lookup: { values: ["(1) High", "(2) Normal", "(3) Low"] } }),
        f("Status", "Short Text", { lookup: { values: ["Not Started", "In Progress", "Completed", "Deferred", "Waiting"] } }),
        f("Percent Complete", "Number", { size: "Double", format: "Percent" }),
        f("Start Date", "Date/Time", { format: "Short Date" }),
        f("Due Date", "Date/Time", { format: "Short Date" }),
        f("Assigned To", "Short Text"),
        f("Description", "Long Text"),
      ],
    },
    query: {
      name: "Open Tasks",
      type: "Select",
      tables: ["Tasks"],
      saved: true,
      cols: [
        { field: "Title", table: "Tasks", show: true },
        { field: "Status", table: "Tasks", show: true, criteria: '<>"Completed"' },
        { field: "Due Date", table: "Tasks", show: true, sort: "Ascending" },
        { field: "Assigned To", table: "Tasks", show: true },
      ],
    },
    forms: [
      { name: "Task Details", layout: "Columnar" },
      { name: "Task List", layout: "Datasheet", fields: ["Title", "Priority", "Status", "Due Date", "Assigned To"] },
    ],
    reports: [
      { name: "All Tasks", fields: ["Title", "Priority", "Status", "Due Date", "Assigned To"], sort: "Due Date" },
      { name: "Tasks by Status", fields: ["Title", "Priority", "Due Date", "Assigned To"], group: "Status" },
    ],
  }),
};

export const TEMPLATE_NAMES = ["Contacts", "Asset tracking", "Students", "Event management", "Task management"];

/** Fill `doc` with a template's objects. Returns the form to open first, or null for an unknown template. */
export function applyTemplate(doc: AccessDoc, template: string): string | null {
  const make = SPECS[template.trim().toLowerCase()];
  if (!make) return null;
  const spec = make();
  doc.tables = [spec.table];
  doc.queries = spec.query ? [spec.query] : [];
  doc.forms = spec.forms.map((x) => {
    const form = buildForm(doc, x.name, spec.table.name, x.fields ?? null, x.layout, x.name);
    form.saved = true;
    return form;
  });
  doc.reports = spec.reports.map((x) => {
    const r: AccReport = buildReport(doc, x.name, spec.table.name);
    if (x.fields) r.fields = x.fields.filter((n) => n !== x.group);
    if (x.group) r.groups = [{ field: x.group, dir: "asc", header: true, footer: false }];
    if (x.sort) r.sorts = [{ field: x.sort, dir: "asc" }];
    r.totals = [];
    r.title = x.name;
    r.saved = true;
    return r;
  });
  return spec.forms[spec.forms.length - 1]?.name ?? null;
}
