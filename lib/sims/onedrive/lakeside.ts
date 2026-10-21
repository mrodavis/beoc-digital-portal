import type { SimStep, SimValue } from "@/types/sim";
import { odDoc, type OdItem, type OdPerson, type OneDriveDoc } from "@/components/sim/apps/onedrive/types";

/*
 * Shared fixtures for the Microsoft OneDrive course: Lakeside Medical
 * Associates (fictional), its people, and a work OneDrive. Sims build on
 * these with `work({ ... })` and `personal({ ... })`.
 */

export const DOMAIN = "lakesidemedical.example";
export const ORG = { name: "Lakeside Medical Associates", domain: DOMAIN };

export const ME: OdPerson = { name: "Alex Morgan", email: `amorgan@${DOMAIN}`, title: "Front Office Assistant" };

export const P = {
  maria: { name: "Maria Santos", email: `msantos@${DOMAIN}`, title: "Office Manager" },
  shah: { name: "Dr. Priya Shah", email: `pshah@${DOMAIN}`, title: "Physician" },
  kevin: { name: "Kevin Patel", email: `kpatel@${DOMAIN}`, title: "Billing Specialist" },
  tasha: { name: "Tasha Greene", email: `tgreene@${DOMAIN}`, title: "Medical Assistant" },
  luis: { name: "Luis Ortega", email: `lortega@${DOMAIN}`, title: "IT Coordinator" },
  renee: { name: "Renee Walker", email: `rwalker@${DOMAIN}`, title: "Practice Administrator" },
  omar: { name: "Omar Haddad", email: `ohaddad@${DOMAIN}`, title: "Front Desk Associate" },
  jen: { name: "Jen Cole", email: `jcole@${DOMAIN}`, title: "Temporary Receptionist" },
  riverside: { name: "Dana Brooks (Riverside Imaging)", email: "scheduling@riversideimaging.example", title: "Scheduling, Riverside Imaging" },
  harbor: { name: "Sam Ito (Harbor Community Center)", email: "events@harborcommunity.example", title: "Events, Harbor Community Center" },
  northwind: { name: "Northwind Medical Supply", email: "orders@northwindsupply.example", title: "Vendor" },
} satisfies Record<string, OdPerson>;

export const PEOPLE: OdPerson[] = Object.values(P);

/** A file. */
export function F(id: string, name: string, parent: string | undefined, extra: Partial<OdItem> = {}): OdItem {
  const ext = /\.([a-z0-9]+)$/i.exec(name)?.[1]?.toLowerCase() ?? "";
  const kind: OdItem["kind"] =
    ext === "docx" ? "word" : ext === "xlsx" || ext === "csv" ? "excel" : ext === "pptx" ? "powerpoint" : ext === "pdf" ? "pdf" : ["jpg", "jpeg", "png"].includes(ext) ? "image" : ext === "mp4" ? "video" : "text";
  return { id, name, kind, parent, modified: "October 14", modifiedBy: ME.email, size: "48 KB", version: "1.0", sync: "local", ...extra };
}

/** A folder. */
export function D(id: string, name: string, parent: string | undefined, extra: Partial<OdItem> = {}): OdItem {
  return { id, name, kind: "folder", parent, modified: "October 9", modifiedBy: ME.email, sync: "local", ...extra };
}

/** The standard work OneDrive for Alex Morgan at Lakeside. */
export function baseItems(): OdItem[] {
  return [
    D("f-frontdesk", "Front Desk", "root", { modified: "October 19" }),
    F("frontdesk-huddle", "Daily Huddle Notes.docx", "f-frontdesk", { modified: "Yesterday at 8:12 AM", size: "31 KB", text: ["Daily Huddle Notes", "Two providers out Friday afternoon. Move walk-ins to Dr. Shah.", "The fax line is fixed.", "Reminder: verify insurance at every visit."] }),
    F("frontdesk-script", "Phone Script - New Patients.docx", "f-frontdesk", { modified: "October 2", size: "27 KB", text: ["Phone Script - New Patients", "Thank you for calling Lakeside Medical Associates. This is Alex. How can I help you?", "Ask for the caller's name, date of birth, and insurance."] }),
    F("frontdesk-reminder", "Appointment Reminder Template.docx", "f-frontdesk", { modified: "September 28", size: "22 KB" }),
    D("f-forms", "Patient Forms", "root", { modified: "October 12" }),
    F("forms-intake", "New Patient Intake Form.pdf", "f-forms", { modified: "September 30", size: "188 KB", sync: "cloud" }),
    F("forms-hipaa", "HIPAA Acknowledgment Form.pdf", "f-forms", { modified: "September 30", size: "96 KB", sync: "cloud" }),
    F("forms-insurance", "Insurance Verification Checklist.docx", "f-forms", { modified: "October 12", size: "35 KB", text: ["Insurance Verification Checklist", "1. Ask for the insurance card at every visit.", "2. Scan both sides of the card.", "3. Check eligibility before the appointment."] }),
    D("f-training", "Training", "root", { modified: "October 1" }),
    F("training-od", "OneDrive Quick Start.pdf", "f-training", { modified: "October 1", size: "1.1 MB", sync: "cloud" }),
    F("root-schedule", "Staff Schedule - November.xlsx", "root", { modified: "October 20", size: "64 KB", modifiedBy: P.maria.email }),
    F("root-supply", "Supply Order Log.xlsx", "root", { modified: "October 16", size: "41 KB" }),
    F("root-flyer", "Flu Clinic Flyer.docx", "root", { modified: "October 18", size: "220 KB", text: ["Flu Shot Clinic", "Walk-ins welcome at Lakeside Medical Associates.", "Bring your insurance card. Most plans cover the flu shot."] }),
    F("root-phones", "Office Phone List.docx", "root", { modified: "October 7", size: "19 KB" }),
  ];
}

export function work(o: Partial<OneDriveDoc> & { items?: OdItem[] } = {}): Record<string, unknown> {
  const d: OneDriveDoc = {
    surface: "web",
    account: "work",
    me: ME,
    org: { ...ORG },
    people: PEOPLE,
    items: baseItems(),
    view: { location: "root" },
    storage: { used: "21.4 GB", total: "1 TB", percent: 2 },
    ...o,
  };
  return odDoc(d);
}

export const HOME_ME: OdPerson = { name: "Alex Morgan", email: "alex.morgan@outlook.example" };

export function personal(o: Partial<OneDriveDoc> & { items?: OdItem[] } = {}): Record<string, unknown> {
  const d: OneDriveDoc = {
    surface: "web",
    account: "personal",
    me: HOME_ME,
    people: [{ name: "Jordan Morgan", email: "jordan.morgan@outlook.example" }],
    items: [],
    view: { location: "root" },
    storage: { used: "3.1 GB", total: "5 GB", percent: 62 },
    vault: { locked: true },
    ...o,
  };
  return odDoc(d);
}

/* ------------------------------------------------------------------ */
/* Step helpers                                                        */
/* ------------------------------------------------------------------ */

export const go = (location: string): SimStep => ({ action: { kind: "command", id: "od.go", value: location } });
export const openFile = (id: string): SimStep => ({ action: { kind: "command", id: "od.open", value: id } });

/** A judged dialog commit; `values` lists only what the task checks. */
export function dlg(id: string, values: Record<string, SimValue | SimValue[]>, extra: Omit<SimStep, "action"> = {}): SimStep {
  return { action: { kind: "dialog", id, values }, ...extra };
}

/** A dialog commit about one item, with a selection hint when the wrong item is used. */
export function on(item: string, id: string, values: Record<string, SimValue | SimValue[]>, selectHint: string): SimStep {
  return { action: { kind: "dialog", id, values: { file: item, ...values } }, requires: { selection: `item:${item}` }, selectHint };
}
