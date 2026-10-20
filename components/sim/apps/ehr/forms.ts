/**
 * The EHR's modal forms. One builder serves both the canvas (which draws the
 * form in the workstation style) and core.dialogs (static DialogDefs the
 * validator uses to check field keys and option values). Fields whose options
 * come from the document (patients, providers, problem list) become text
 * fields in the static version, so their keys are still checked.
 */
import type { DialogDef, DialogField, SimValue } from "@/types/sim";
import type { EhrDoc } from "./types";
import { ALERT_ACTIONS, ALL_DOSES, ALL_DURATIONS, ALL_FREQS, ALL_ROUTES, imgItem, IMAGING, labItem, LABS, LATERALITY, medItem, MEDS, ORDER_MODES, OVERRIDE_REASONS, PRIORITIES, refItem, REFERRALS } from "./catalog";
import { CARC, icdTitle } from "./codes";

export type FieldOpt = { value: string; label?: string };

export type EhrField =
  | { type: "select"; key: string; label: string; options: FieldOpt[]; required?: boolean; dynamic?: boolean; wide?: boolean }
  | { type: "radio"; key: string; label: string; options: FieldOpt[]; required?: boolean }
  | { type: "text"; key: string; label: string; required?: boolean; placeholder?: string; multiline?: boolean; money?: boolean }
  | { type: "password"; key: string; label: string; required?: boolean }
  | { type: "checkbox"; key: string; label: string; required?: boolean }
  | { type: "checklist"; key: string; label: string; options: FieldOpt[]; dynamic?: boolean }
  | { type: "fixed"; key: string; label: string; value: string; display?: string }
  | { type: "note"; text: string; tone?: "info" | "warn" | "danger" | "plain"; lines?: string[] };

export type EhrForm = {
  id: string;
  title: string;
  subtitle?: string;
  okLabel: string;
  tone?: "default" | "warn" | "danger";
  fields: EhrField[];
  initial?: Record<string, SimValue>;
  width?: number;
};

export const DEPARTMENTS = [
  "Northstar Primary Care (Front Desk)",
  "Northstar Primary Care (Clinical)",
  "Northstar Orthopedics (Front Desk)",
  "Northstar Billing Office",
  "Health Information Management",
];
export const BTG_REASONS = [
  "Treating or scheduled to see this patient today",
  "Registration or scheduling for this patient",
  "Billing or claims work for this patient",
  "Compliance review assigned to me",
  "Other (explain to the Privacy Officer)",
];
export const INCIDENT_CATEGORIES = [
  "Request to view a record without a work reason",
  "Misdirected mail, fax or email",
  "Lost or stolen device",
  "Unattended or unlocked workstation",
  "Shared or stolen password",
  "Request to code or bill above the documentation",
  "Other privacy or compliance concern",
];
export const ROI_REQUESTERS = [
  "Patient (right of access)",
  "Payer: records request for a claim",
  "Another provider (treatment)",
  "Attorney with signed authorization",
  "Family member without authorization",
];
export const ROI_DECISIONS = ["Release now", "Hold for provider review", "Decline: no valid authorization"];
export const ROI_FORMATS = ["Electronic copy (patient portal)", "Electronic copy (secure email)", "Paper copy (mail)", "Secure fax"];
export const PAY_METHODS = ["Credit card", "Cash", "Check", "Not collected"];
export const FOLLOW_UPS = ["None", "1 week", "2 weeks", "1 month", "3 months", "6 months", "1 year"];
export const REFERRAL_OPTS = ["None", "Cardiology", "Orthopedics", "Physical therapy", "Endocrinology"];
export const VISIT_TYPES: { value: string; minutes: number }[] = [
  { value: "New patient", minutes: 30 },
  { value: "Follow-up", minutes: 15 },
  { value: "Annual physical", minutes: 30 },
  { value: "Sick visit", minutes: 15 },
  { value: "Procedure", minutes: 30 },
  { value: "Injection", minutes: 15 },
];
export const ADJ_CODES = ["CO-45", "CO-97", "None"];
export const PR_CODES = ["PR-1", "PR-2", "PR-3", "None"];
export const DENIAL_PHASES = ["Front end (patient access)", "Middle (coding and charge capture)", "Back end (claims and follow-up)"];
export const DENIAL_ACTIONS = [
  "Correct the claim and resubmit",
  "Verify coverage and bill the correct payer",
  "Request a retro authorization or appeal",
  "Write off: filing limit passed",
  "Bill the patient",
];
export const REPORT_NAMES = ["Patient tracking", "No-shows", "A/R aging", "Denials", "Diabetes care gaps"];
export const GROUP_BY = ["None", "Provider", "Payer", "Reason", "Status", "Visit type"];
export const PERIODS = ["Today", "Last 30 days", "Last 90 days", "Last 12 months"];
export const EXPORT_FORMATS = ["PDF", "Excel (CSV)", "Print"];
export const EXPORT_RECIPIENTS = ["Practice manager (internal)", "Care team (internal)", "Outside billing company (BAA on file)", "University researcher (outside)"];
export const DELIVERY = ["Mail", "Patient portal", "Email"];
export const QUERY_TYPES = [
  "Does the documentation support a higher E/M level?",
  "Clarify laterality (left or right)",
  "Clarify diagnosis specificity",
  "Clarify the service performed",
];

const opts = (xs: string[]): FieldOpt[] => xs.map((value) => ({ value }));

export type FormCtx = { patient?: string; item?: string; appt?: string; slot?: string; line?: string; claim?: string; enc?: string };

function providerOpts(doc: EhrDoc | null): FieldOpt[] {
  return (doc?.providers ?? []).map((p) => ({ value: p.id, label: `${p.name}, ${p.credentials} (${p.specialty})` }));
}

function problemOpts(doc: EhrDoc | null, pid?: string): FieldOpt[] {
  const p = doc?.patients.find((x) => x.id === pid);
  return (p?.problems ?? []).map((c) => ({ value: c, label: `${c} ${icdTitle(c)}` }));
}

function patientName(doc: EhrDoc | null, pid?: string): string {
  const p = doc?.patients.find((x) => x.id === pid);
  return p ? `${p.first} ${p.last} (MRN ${p.mrn})` : pid ?? "";
}

function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

/** Build a form. With doc = null, returns the static shape (for the validator). */
export function buildForm(id: string, doc: EhrDoc | null, ctx: FormCtx = {}): EhrForm | undefined {
  const pid = ctx.patient ?? doc?.nav.chart ?? undefined;
  const orderCommon = (): EhrField[] => [
    { type: "select", key: "dx", label: "Associated diagnosis", options: problemOpts(doc, pid), dynamic: true, wide: true },
    { type: "radio", key: "mode", label: "Order mode", options: opts(ORDER_MODES), required: true },
    { type: "select", key: "orderedBy", label: "Ordering provider", options: providerOpts(doc), dynamic: true, required: true, wide: true },
  ];
  const orderInitial = (): Record<string, SimValue> => ({ mode: "Standard", orderedBy: doc?.session.provider ?? "", priority: "Routine" });

  switch (id) {
    case "ehr.signin":
      return {
        id,
        title: "Sign in",
        okLabel: "Sign in",
        fields: [
          { type: "text", key: "user", label: "User ID", required: true },
          { type: "password", key: "password", label: "Password", required: true },
          { type: "select", key: "department", label: "Department", options: opts(DEPARTMENTS), required: true, wide: true },
        ],
      };
    case "ehr.btg": {
      const p = doc?.patients.find((x) => x.id === ctx.patient);
      return {
        id,
        title: "Restricted record",
        subtitle: p ? `${p.first} ${p.last} · ${p.restricted ?? "Restricted"} record` : undefined,
        okLabel: "Access record",
        tone: "danger",
        fields: [
          {
            type: "note",
            tone: "danger",
            text: "This record is restricted. Access requires a work-related reason, is logged with your name and the time, and is reviewed by the Privacy Officer. Cancel if your job does not require this record.",
          },
          { type: "radio", key: "reason", label: "Reason for access", options: opts(BTG_REASONS), required: true },
          { type: "checkbox", key: "attest", label: "I attest that my job requires access to this record.", required: true },
        ],
      };
    }
    case "ehr.incident":
      return {
        id,
        title: "Report a privacy or compliance concern",
        subtitle: "Sent to the Northstar Privacy and Compliance Office",
        okLabel: "Submit report",
        tone: "warn",
        fields: [
          { type: "note", tone: "info", text: "Report suspected breaches right away. Deadlines under the Breach Notification Rule start when a breach is discovered. Reports can be anonymous." },
          { type: "select", key: "category", label: "What happened?", options: opts(INCIDENT_CATEGORIES), required: true, wide: true },
          { type: "text", key: "detail", label: "Details (optional)", multiline: true },
        ],
      };
    case "ehr.roi": {
      const p = doc?.patients.find((x) => x.id === pid);
      return {
        id,
        title: "Release of information",
        subtitle: p ? `${p.first} ${p.last} · MRN ${p.mrn}` : undefined,
        okLabel: "Record request",
        fields: [
          { type: "fixed", key: "patient", label: "Patient", value: pid ?? "", display: patientName(doc, pid) },
          { type: "select", key: "requester", label: "Requested by", options: opts(ROI_REQUESTERS), required: true, wide: true },
          { type: "checklist", key: "docs", label: "Documents to release (minimum necessary)", options: (p?.documents ?? []).map((d) => ({ value: d.id, label: `${d.date} · ${d.type}: ${d.title}` })), dynamic: true },
          { type: "select", key: "format", label: "Format (when releasing)", options: opts(ROI_FORMATS), wide: true },
          { type: "radio", key: "decision", label: "Decision", options: opts(ROI_DECISIONS), required: true },
        ],
      };
    }
    case "ehr.checkin": {
      const a = doc?.appointments?.find((x) => x.id === ctx.appt);
      const p = doc?.patients.find((x) => x.id === a?.patient);
      const cov = p?.coverage?.find((c) => c.priority === 1);
      return {
        id,
        title: "Check in",
        subtitle: p && a ? `${p.first} ${p.last} · ${fmtTime(a.time)} ${a.type}` : undefined,
        okLabel: "Check in",
        fields: [
          { type: "note", tone: "info", text: `Copay due today: ${cov?.copay ? `$${cov.copay}` : "none on file"}. Confirm identity with two identifiers and scan the photo ID and insurance card.` },
          { type: "checkbox", key: "idChecked", label: "Photo ID and insurance card scanned" },
          { type: "text", key: "collected", label: "Amount collected", money: true, placeholder: "0.00" },
          { type: "select", key: "method", label: "Payment method", options: opts(PAY_METHODS), required: true },
        ],
      };
    }
    case "ehr.checkout": {
      const a = doc?.appointments?.find((x) => x.id === ctx.appt);
      const p = doc?.patients.find((x) => x.id === a?.patient);
      return {
        id,
        title: "Check out",
        subtitle: p && a ? `${p.first} ${p.last} · ${fmtTime(a.time)} ${a.type}` : undefined,
        okLabel: "Check out",
        fields: [
          { type: "select", key: "followUp", label: "Follow-up", options: opts(FOLLOW_UPS), required: true },
          { type: "select", key: "referral", label: "Referral", options: opts(REFERRAL_OPTS), required: true },
          { type: "text", key: "collected", label: "Amount collected", money: true, placeholder: "0.00" },
          { type: "select", key: "method", label: "Payment method", options: opts(PAY_METHODS), required: true },
        ],
        initial: { referral: "None", method: "Not collected" },
      };
    }
    case "ehr.appt.new": {
      const slot = parseSlot(ctx.slot);
      const prov = doc?.providers.find((x) => x.id === slot?.provider);
      return {
        id,
        title: "New appointment",
        subtitle: slot ? `${prov ? `${prov.name}, ${prov.credentials}` : slot.provider} · ${fmtDate(slot.date)} · ${fmtTime(slot.time)}` : undefined,
        okLabel: "Book appointment",
        fields: [
          { type: "select", key: "patient", label: "Patient", options: (doc?.patients ?? []).map((p) => ({ value: p.id, label: `${p.last}, ${p.first} · DOB ${p.dob} · MRN ${p.mrn}` })), dynamic: true, required: true, wide: true },
          { type: "select", key: "type", label: "Visit type", options: VISIT_TYPES.map((v) => ({ value: v.value, label: `${v.value} (${v.minutes} min)` })), required: true, wide: true },
          { type: "text", key: "reason", label: "Reason for visit", required: true },
        ],
      };
    }
    case "ehr.order.med": {
      const m = medItem(ctx.item ?? "");
      return {
        id,
        title: "Medication order",
        subtitle: m ? m.name : undefined,
        okLabel: "Accept",
        fields: [
          { type: "fixed", key: "patient", label: "Patient", value: pid ?? "", display: patientName(doc, pid) },
          { type: "fixed", key: "drug", label: "Medication", value: m?.id ?? "", display: m?.name },
          { type: "select", key: "dose", label: "Dose", options: opts(doc ? m?.doses ?? [] : ALL_DOSES), required: true },
          { type: "select", key: "route", label: "Route", options: opts(doc ? m?.routes ?? [] : ALL_ROUTES), required: true },
          { type: "select", key: "freq", label: "Frequency", options: opts(doc ? m?.freqs ?? [] : ALL_FREQS), required: true, wide: true },
          { type: "select", key: "duration", label: "Duration", options: opts(doc ? m?.durations ?? [] : ALL_DURATIONS), required: true },
          ...orderCommon(),
        ],
        initial: { ...orderInitial(), route: m && m.routes.length === 1 ? m.routes[0] : "" },
      };
    }
    case "ehr.order.lab": {
      const l = labItem(ctx.item ?? "");
      return {
        id,
        title: "Lab order",
        subtitle: l?.name,
        okLabel: "Accept",
        fields: [
          { type: "fixed", key: "patient", label: "Patient", value: pid ?? "", display: patientName(doc, pid) },
          { type: "fixed", key: "test", label: "Test", value: l?.id ?? "", display: l?.name },
          { type: "radio", key: "priority", label: "Priority", options: opts(PRIORITIES), required: true },
          ...orderCommon(),
        ],
        initial: orderInitial(),
      };
    }
    case "ehr.order.img": {
      const im = imgItem(ctx.item ?? "");
      return {
        id,
        title: "Imaging order",
        subtitle: im?.name,
        okLabel: "Accept",
        fields: [
          { type: "fixed", key: "patient", label: "Patient", value: pid ?? "", display: patientName(doc, pid) },
          { type: "fixed", key: "study", label: "Study", value: im?.id ?? "", display: im?.name },
          { type: "radio", key: "priority", label: "Priority", options: opts(PRIORITIES), required: true },
          { type: "select", key: "laterality", label: "Laterality", options: opts(LATERALITY), required: true },
          ...orderCommon(),
        ],
        initial: { ...orderInitial(), laterality: im?.laterality ? "" : "Not applicable" },
      };
    }
    case "ehr.order.ref": {
      const r = refItem(ctx.item ?? "");
      return {
        id,
        title: "Referral order",
        subtitle: r?.name,
        okLabel: "Accept",
        fields: [
          { type: "fixed", key: "patient", label: "Patient", value: pid ?? "", display: patientName(doc, pid) },
          { type: "fixed", key: "specialty", label: "Referral", value: r?.id ?? "", display: r?.name },
          { type: "radio", key: "priority", label: "Priority", options: opts(PRIORITIES), required: true },
          { type: "text", key: "reason", label: "Reason for referral" },
          ...orderCommon(),
        ],
        initial: orderInitial(),
      };
    }
    case "ehr.alert": {
      const al = doc?.alert;
      const info = al?.severity === "Informational";
      const actions = !doc ? ALERT_ACTIONS : info ? ["Acknowledge"] : ALERT_ACTIONS.filter((a) => a !== "Acknowledge");
      return {
        id,
        title: al ? `${al.severity} alert: ${al.kind}` : "Clinical decision support alert",
        okLabel: "Continue",
        tone: info ? "default" : "danger",
        fields: [
          ...(al ? [{ type: "note" as const, tone: info ? ("info" as const) : ("danger" as const), text: al.title, lines: [al.detail] }] : []),
          { type: "radio", key: "action", label: "Response", options: opts(actions), required: true },
          ...(!doc || !info ? [{ type: "select" as const, key: "reason", label: "Override reason (required to override)", options: opts(OVERRIDE_REASONS), wide: true }] : []),
          { type: "checkbox", key: "report", label: "Report this alert as not useful (sends feedback to the CDS committee)" },
        ],
        initial: info ? { action: "Acknowledge" } : undefined,
      };
    }
    case "ehr.post": {
      const line = doc?.remits?.flatMap((r) => r.lines).find((l) => l.id === ctx.line);
      return {
        id,
        title: "Post remittance line",
        subtitle: line ? `Claim ${line.claim} · ${line.code} · DOS ${line.dos}` : undefined,
        okLabel: "Post",
        fields: [
          ...(line
            ? [
                {
                  type: "note" as const,
                  tone: "plain" as const,
                  text: "From the ERA:",
                  lines: [
                    `Billed ${money(line.billed)} · Allowed ${money(line.allowed)} · Paid ${money(line.paid)}`,
                    `${line.adjCode} ${money(line.adj)}${line.prCode ? ` · ${line.prCode} ${money(line.pr)}` : ""}`,
                  ],
                },
              ]
            : []),
          { type: "text", key: "payment", label: "Insurance payment", money: true, required: true },
          { type: "text", key: "adjustment", label: "Contractual adjustment", money: true, required: true },
          { type: "select", key: "adjCode", label: "Adjustment reason", options: ADJ_CODES.map((c) => ({ value: c, label: CARC[c] ? `${c} ${CARC[c]}` : c })), required: true, wide: true },
          { type: "text", key: "patientResp", label: "Transfer to patient responsibility", money: true, required: true },
          { type: "select", key: "prCode", label: "Patient responsibility reason", options: PR_CODES.map((c) => ({ value: c, label: CARC[c] ? `${c} ${CARC[c]}` : c })), required: true, wide: true },
        ],
      };
    }
    case "ehr.denial": {
      const cl = doc?.claims?.find((c) => c.id === ctx.claim);
      return {
        id,
        title: "Work denial",
        subtitle: cl ? `Claim ${cl.id} · ${cl.carc ?? ""} ${cl.carc && CARC[cl.carc] ? CARC[cl.carc] : cl.denial ?? ""}` : undefined,
        okLabel: "Save",
        fields: [
          { type: "radio", key: "phase", label: "Where did this denial originate?", options: opts(DENIAL_PHASES), required: true },
          { type: "select", key: "action", label: "Next action", options: opts(DENIAL_ACTIONS), required: true, wide: true },
        ],
      };
    }
    case "ehr.report.run":
      return {
        id,
        title: "Run report",
        okLabel: "Run",
        fields: [
          { type: "select", key: "report", label: "Report", options: opts(REPORT_NAMES), required: true, wide: true },
          { type: "select", key: "groupBy", label: "Group by", options: opts(GROUP_BY), required: true },
          { type: "select", key: "period", label: "Period", options: opts(PERIODS), required: true },
        ],
        initial: { groupBy: "None", period: "Today" },
      };
    case "ehr.report.export":
      return {
        id,
        title: "Export report",
        okLabel: "Export",
        tone: "warn",
        fields: [
          { type: "note", tone: "warn", text: "Reports carry PHI. Export only what the recipient needs, and de-identify data leaving the practice unless the recipient has a business associate agreement and a work need for identifiers." },
          { type: "select", key: "format", label: "Format", options: opts(EXPORT_FORMATS), required: true },
          { type: "select", key: "recipient", label: "Recipient", options: opts(EXPORT_RECIPIENTS), required: true, wide: true },
          { type: "checkbox", key: "deidentify", label: "De-identify (remove names, MRNs, dates of birth and other identifiers)" },
        ],
      };
    case "ehr.stmt": {
      return {
        id,
        title: "Patient statement",
        okLabel: "Generate statement",
        fields: [
          { type: "fixed", key: "patient", label: "Patient", value: pid ?? "", display: patientName(doc, pid) },
          { type: "select", key: "delivery", label: "Send by", options: opts(DELIVERY), required: true },
        ],
      };
    }
    case "ehr.query": {
      const e = doc?.encounters?.find((x) => x.id === (ctx.enc ?? doc?.nav.enc));
      return {
        id,
        title: "Query the provider",
        subtitle: e ? `Encounter ${e.id} · ${e.date}` : undefined,
        okLabel: "Send query",
        fields: [
          { type: "fixed", key: "enc", label: "Encounter", value: e?.id ?? ctx.enc ?? "", display: e?.id },
          { type: "note", tone: "info", text: "A query asks the provider a neutral question about the documentation. It never suggests the answer or a code." },
          { type: "select", key: "question", label: "Question", options: opts(QUERY_TYPES), required: true, wide: true },
          { type: "text", key: "detail", label: "Details", multiline: true },
        ],
      };
    }
  }
  return undefined;
}

export const FORM_IDS = [
  "ehr.signin", "ehr.btg", "ehr.incident", "ehr.roi", "ehr.checkin", "ehr.checkout", "ehr.appt.new",
  "ehr.order.med", "ehr.order.lab", "ehr.order.img", "ehr.order.ref", "ehr.alert", "ehr.post", "ehr.denial",
  "ehr.report.run", "ehr.report.export", "ehr.stmt", "ehr.query",
];

function toDialogField(f: EhrField): DialogField | null {
  switch (f.type) {
    case "note": return { type: "note", text: f.text };
    case "fixed": return { type: "text", key: f.key, label: f.label };
    case "text": return { type: "text", key: f.key, label: f.label };
    case "password": return null;
    case "checkbox": return { type: "checkbox", key: f.key, label: f.label };
    case "checklist": return { type: "text", key: f.key, label: f.label };
    case "select":
      return f.dynamic ? { type: "text", key: f.key, label: f.label } : { type: "select", key: f.key, label: f.label, options: f.options.map((o) => o.value) };
    case "radio": return { type: "radio", key: f.key, label: f.label, options: f.options.map((o) => o.value) };
  }
}

/** Static DialogDefs for core.dialogs (validator field checks). */
export function staticDialogs(): Record<string, DialogDef> {
  const out: Record<string, DialogDef> = {};
  for (const id of FORM_IDS) {
    const f = buildForm(id, null);
    if (!f) continue;
    out[id] = { id, title: f.title, okLabel: f.okLabel, fields: f.fields.map(toDialogField).filter((x): x is DialogField => x !== null) };
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Small shared formatters                                             */
/* ------------------------------------------------------------------ */

export function parseSlot(s?: string): { provider: string; date: string; time: string } | null {
  const m = /^slot:([^@]+)@(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/.exec(s ?? "");
  return m ? { provider: m[1], date: m[2], time: m[3] } : null;
}

export function fmtTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ap}`;
}

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export function fmtDate(iso: string, withDow = true): string {
  const [y, mo, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  const s = `${String(mo).padStart(2, "0")}/${String(d).padStart(2, "0")}/${y}`;
  return withDow ? `${DOW[dt.getUTCDay()]} ${s}` : s;
}

export { MEDS, LABS, IMAGING, REFERRALS };
