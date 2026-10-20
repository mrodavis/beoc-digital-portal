import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import type { OlForm, OutlookDoc } from "./types";
import type { AlertSpec, MenuEntry } from "./parts";
import { addDays, dateOf, fmtDate, timeOf } from "./dates";

/** What every canvas view needs from the root. */
export type Ctx = {
  doc: OutlookDoc;
  ui: SimUi;
  accent: string;
  /** Free navigation: change what is selected. */
  select: (sel: string) => void;
  commit: (c: SimCommit) => void;
  cmd: (id: string, value?: SimValue) => void;
  openDialog: (id: string) => void;
  menu: (at: { x: number; y: number }, items: MenuEntry[]) => void;
  alert: (a: AlertSpec) => void;
  /** Open compose fields the learner is typing (committed when sent). */
  cdraft: ComposeDraft | null;
  setCdraft: (patch: Partial<ComposeDraft>) => void;
  /** Open form fields (committed when saved). */
  fdraft: FormDraft | null;
  setFdraft: (patch: Partial<FormDraft>) => void;
  send: () => void;
  /** Commit the typed fields, then open Schedule send. */
  scheduleSend: () => void;
  saveDraft: () => void;
  saveForm: () => void;
  narrow: boolean;
};

export type ComposeDraft = {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  /** Text typed in a recipient box that is not a recipient yet. */
  pending: { to: string; cc: string; bcc: string };
};

export type FormDraft = {
  title: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  allDay: boolean;
  required: string[];
  optional: string[];
  body: string;
  name: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  notes: string;
  subject: string;
  tStart: string;
  tDue: string;
  status: string;
  priority: string;
  percent: string;
  reminderOn: boolean;
  reminderDate: string;
  reminderTime: string;
  assignTo: string[];
  members: string[];
  pending: { required: string; optional: string; assignTo: string };
};

export function composeSource(c: OutlookDoc["compose"]): Omit<ComposeDraft, "pending"> | null {
  if (!c) return null;
  return { to: c.to, cc: c.cc, bcc: c.bcc, subject: c.subject, body: c.body };
}

export function formSource(f: OlForm | null | undefined): Omit<FormDraft, "pending"> | null {
  if (!f) return null;
  const d = f.data;
  const start = d.start ?? "2026-10-20T09:00";
  const end = d.end ?? start;
  const allDay = Boolean(d.allDay);
  return {
    title: d.title ?? "",
    location: d.location ?? "",
    startDate: dateOf(start),
    startTime: timeOf(start),
    endDate: allDay && timeOf(end) === "00:00" && end > start ? addDays(end, -1) : dateOf(end),
    endTime: timeOf(end),
    allDay,
    required: d.required ?? [],
    optional: d.optional ?? [],
    body: d.body ?? "",
    name: d.name ?? "",
    company: d.company ?? "",
    jobTitle: d.jobTitle ?? "",
    email: d.email ?? "",
    phone: d.phone ?? "",
    mobile: d.mobile ?? "",
    address: d.address ?? "",
    notes: d.notes ?? "",
    subject: d.subject ?? "",
    tStart: d.startDate ?? "",
    tDue: d.dueDate ?? "",
    status: d.status ?? "Not Started",
    priority: d.priority ?? "Normal",
    percent: String(d.percent ?? 0),
    reminderOn: Boolean(d.reminderOn),
    reminderDate: d.reminderDate || (d.dueDate ? d.dueDate : fmtDate("2026-10-20")),
    reminderTime: d.reminderTime ?? "8:00 AM",
    assignTo: d.assignTo ?? [],
    members: d.members ?? [],
  };
}

export type { MenuEntry };
