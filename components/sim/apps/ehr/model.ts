/**
 * Built-in behavior of the Northstar EHR practice engine. Pure functions:
 * every action returns a new document. Anything a sim refers to that does not
 * exist (a patient, a code outside the training set, a claim with scrubber
 * errors at submit) throws, so the validator catches authoring mistakes; the
 * canvas never emits such actions.
 */
import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import type {
  EhrAlert,
  EhrAppt,
  EhrAuthRequest,
  EhrClaim,
  EhrCoverage,
  EhrDoc,
  EhrEncounter,
  EhrLedgerRow,
  EhrLine,
  EhrOrder,
  EhrPatient,
  EhrReportRun,
  EhrWorkspace,
  EhrChartTab,
} from "./types";
import { COMPONENT_PAIRS, EXCLUDES1_PAIRS, icdBillable, MODIFIERS, procCode } from "./codes";
import { IMAGING, imgItem, INTERACTIONS, labItem, medItem, ORDER_SETS, refItem } from "./catalog";
import { parseSlot, VISIT_TYPES } from "./forms";

type Out = { doc: EhrDoc; ui?: Partial<SimUi> };

export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

/* ------------------------------------------------------------------ */
/* Lookups and formatting                                              */
/* ------------------------------------------------------------------ */

export function patientOf(doc: EhrDoc, id?: string | null): EhrPatient | undefined {
  return id ? doc.patients.find((p) => p.id === id) : undefined;
}
function mustPatient(doc: EhrDoc, id: string): EhrPatient {
  const p = patientOf(doc, id);
  if (!p) throw new Error(`No patient "${id}"`);
  return p;
}
export function providerOf(doc: EhrDoc, id?: string) {
  return doc.providers.find((p) => p.id === id);
}
export function payerOf(doc: EhrDoc, id?: string) {
  return doc.payers.find((p) => p.id === id || p.name === id);
}
export function coverageOf(p: EhrPatient | undefined, priority: number): EhrCoverage | undefined {
  return p?.coverage?.find((c) => c.priority === priority);
}
export const nameOf = (p?: EhrPatient) => (p ? `${p.first} ${p.last}` : "");
export const listName = (p?: EhrPatient) => (p ? `${p.last}, ${p.first}` : "");

export function todayMdy(doc: EhrDoc): string {
  const [y, m, d] = doc.today.split("-");
  return `${m}/${d}/${y}`;
}
export function stamp(doc: EhrDoc): string {
  return `${todayMdy(doc)} ${doc.clock}`;
}
function tick(doc: EhrDoc) {
  const [h, m] = doc.clock.split(":").map(Number);
  const t = h * 60 + m + 1;
  doc.clock = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

export function ageOf(dob: string, todayIso: string): number {
  const [mm, dd, yy] = dob.split("/").map(Number);
  const [ty, tm, td] = todayIso.split("-").map(Number);
  let a = ty - yy;
  if (tm < mm || (tm === mm && td < dd)) a--;
  return a;
}

export function money(n: number | undefined): string {
  const v = n ?? 0;
  const s = Math.abs(v).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return v < 0 ? `-$${s}` : `$${s}`;
}

function nextId(ids: string[], prefix: string): string {
  let n = 0;
  for (const id of ids) {
    const m = new RegExp(`^${prefix}(\\d+)$`).exec(id);
    if (m) n = Math.max(n, Number(m[1]));
  }
  return `${prefix}${n + 1}`;
}

function log(doc: EhrDoc, action: string, patient?: string, detail?: string) {
  doc.audit.push({
    id: nextId(doc.audit.map((a) => a.id), "L"),
    at: stamp(doc),
    user: doc.session.user,
    role: doc.session.role,
    patient,
    action,
    detail,
    workstation: "NMC-TRN-07",
  });
  tick(doc);
}

export const LETTERS = "ABCDEFGHIJKL";

/* ------------------------------------------------------------------ */
/* Normalizers (also used by core.normalize)                           */
/* ------------------------------------------------------------------ */

export function normPhone(s: string): string {
  let d = s.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : s.trim();
}
export function normDate(s: string): string {
  const t = s.trim();
  let m = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(t);
  if (m) return `${m[1].padStart(2, "0")}/${m[2].padStart(2, "0")}/${m[3]}`;
  m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
  if (m) return `${m[2].padStart(2, "0")}/${m[3].padStart(2, "0")}/${m[1]}`;
  m = /^(\d{2})(\d{2})(\d{4})$/.exec(t);
  if (m) return `${m[1]}/${m[2]}/${m[3]}`;
  return t;
}
export function normMoney(s: string): string {
  const t = s.replace(/[$,\s]/g, "");
  if (t === "") return "";
  const n = Number(t);
  return Number.isFinite(n) ? n.toFixed(2) : s.trim();
}
export function normIcd(s: string): string {
  let t = s.toUpperCase().replace(/\s/g, "").replace(/\.$/, "");
  if (t && !t.includes(".") && t.length > 3) t = `${t.slice(0, 3)}.${t.slice(3)}`;
  return t;
}
export const normCode = (s: string) => s.toUpperCase().replace(/\s/g, "");
export function normPtr(s: string): string {
  const t = s.toUpperCase().trim();
  if (/^[\d\s,]+$/.test(t)) {
    return t
      .split(/[\s,]+/)
      .filter(Boolean)
      .map((n) => LETTERS[Number(n) - 1] ?? "")
      .join("");
  }
  const seen = new Set<string>();
  return t
    .replace(/[^A-L]/g, "")
    .split("")
    .filter((c) => (seen.has(c) ? false : (seen.add(c), true)))
    .join("");
}
export const normMod = (s: string) => s.toUpperCase().replace(/[-\s]/g, "");
export function normUnits(s: string): string {
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? String(n) : s.trim();
}

/** The normalizer that applies to a type target's field. */
export function normalizeField(target: string, value: string): string {
  const segs = target.split(".");
  const f = segs[segs.length - 1];
  if (f === "phone") return normPhone(value);
  if (f === "dob" || f === "subscriberDob" || f === "effective") return normDate(value);
  if (f === "copay") return normMoney(value);
  if (f === "icd" || (segs[segs.length - 2] === "dx" && /^[A-L]$/.test(f))) return normIcd(value);
  if (f === "cpt" || f === "code" || f === "memberId" || f === "group" || f === "auth") return normCode(value);
  if (f === "ptr") return normPtr(value);
  if (f === "mod1" || f === "mod2") return normMod(value);
  if (f === "units") return normUnits(value);
  if (f === "npi") return value.replace(/\D/g, "");
  return value.trim();
}

/* ------------------------------------------------------------------ */
/* Eligibility (270/271)                                               */
/* ------------------------------------------------------------------ */

export function eligibilityResponse(doc: EhrDoc, p: EhrPatient, cov: EhrCoverage): { ok: boolean; lines: string[] } {
  const payer = payerOf(doc, cov.payer);
  const e = cov.elig ?? doc.eligRecords?.find((r) => r.payer === cov.payer && r.memberId && normCode(r.memberId) === normCode(cov.memberId ?? ""));
  const head = `271 response from ${payer?.name ?? "payer"} · ${stamp(doc)}`;
  if (!e && !cov.memberId) return { ok: false, lines: [head, "REJECTED: Invalid or missing subscriber ID.", "Enter the member ID from the insurance card and send the inquiry again."] };
  if (!e || !cov.memberId || (e.memberId && normCode(cov.memberId) !== normCode(e.memberId))) {
    return { ok: false, lines: [head, "REJECTED: Subscriber/insured not found.", "Check the member ID against the insurance card and send the inquiry again."] };
  }
  const subDob = cov.subscriberDob || (cov.relationship === "Self" ? p.dob : "");
  if (e.dob && normDate(subDob) !== normDate(e.dob)) {
    return { ok: false, lines: [head, "REJECTED: Subscriber date of birth does not match the payer's record.", "Confirm the subscriber's date of birth and send the inquiry again."] };
  }
  if (e.status === "Inactive") {
    return { ok: false, lines: [head, `Coverage status: INACTIVE${e.termed ? ` (terminated ${e.termed})` : ""}.`, "Ask the patient for current coverage before the visit."] };
  }
  const lines = [head, `Coverage status: ACTIVE · ${e.plan ?? cov.plan ?? ""}${e.effective ? ` · effective ${e.effective}` : ""}`];
  if (e.copay) lines.push(`Office visit copay (in network): $${e.copay}`);
  if (e.specialist) lines.push(`Specialist copay (in network): $${e.specialist}`);
  if (e.deductible) lines.push(`Deductible: $${e.deductible}${e.deductibleMet ? ` (met to date: $${e.deductibleMet})` : ""}`);
  if (e.coinsurance) lines.push(`Coinsurance: ${e.coinsurance}`);
  for (const n of e.notes ?? []) lines.push(n);
  lines.push("This response is not a guarantee of payment. Benefits are determined when the claim is processed.");
  return { ok: true, lines };
}

/* ------------------------------------------------------------------ */
/* Preauthorization                                                    */
/* ------------------------------------------------------------------ */

export function authMissing(a: EhrAuthRequest): string[] {
  const out: string[] = [];
  if (!a.cpt) out.push("CPT/HCPCS code");
  if (!a.icd) out.push("ICD-10-CM code");
  if (!a.npi) out.push("ordering provider NPI");
  if (!a.notes) out.push("clinical notes");
  return out;
}

function evaluateAuth(doc: EhrDoc, a: EhrAuthRequest): { status: EhrAuthRequest["status"]; lines: string[] } {
  const payer = payerOf(doc, a.payer);
  const head = `Response from ${payer?.name ?? "payer"} · ${stamp(doc)} · reference ${a.id}-${doc.audit.length + 100}`;
  const r = a.rule;
  if (!r.cpt.map(normCode).includes(normCode(a.cpt ?? ""))) return { status: "Pended", lines: [head, "PENDED: The requested service code does not match the order on file.", "Check the CPT/HCPCS code against the provider's order."] };
  if (!r.icd.map(normIcd).includes(normIcd(a.icd ?? ""))) {
    return { status: "Pended", lines: [head, "PENDED: The diagnosis does not support medical necessity for the requested service.", r.pendIcd ?? "Submit the most specific diagnosis the documentation supports."] };
  }
  const prov = providerOf(doc, a.provider);
  if (!prov || prov.npi !== (a.npi ?? "").replace(/\D/g, "")) return { status: "Pended", lines: [head, "PENDED: The ordering provider NPI does not match the provider on the order."] };
  const notes = (a.notes ?? "").toLowerCase();
  const missing = (r.notesAll ?? []).filter((k) => !notes.includes(k.toLowerCase()));
  if (missing.length) return { status: "Pended", lines: [head, "PENDED: Clinical documentation is incomplete.", r.pendNotes ?? "Add the clinical facts that support the request and resubmit."] };
  return {
    status: "Approved",
    lines: [
      head,
      `APPROVED · Authorization number ${r.number}`,
      `Service ${normCode(a.cpt ?? "")} × ${a.units || "1"} · valid ${r.validFrom} through ${r.validTo}`,
      "Authorization confirms medical necessity review only. It is not a guarantee of payment; eligibility and benefits apply on the date of service.",
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Clinical decision support                                           */
/* ------------------------------------------------------------------ */

function activeDrugs(doc: EhrDoc, p: EhrPatient, exceptOrder?: string): { drug: string; group?: string; label: string }[] {
  const out: { drug: string; group?: string; label: string }[] = [];
  for (const m of p.meds ?? []) {
    if (m.status === "Discontinued" || !m.drug) continue;
    const item = medItem(m.drug);
    out.push({ drug: m.drug, group: item?.group, label: `${m.name} · ${m.sig}` });
  }
  for (const o of doc.orders ?? []) {
    if (o.patient !== p.id || o.kind !== "med" || o.id === exceptOrder || o.status === "Canceled" || o.status === "Alert") continue;
    const item = medItem(o.item);
    if (item && !(p.meds ?? []).some((m) => m.drug === item.drug && m.status !== "Discontinued")) out.push({ drug: item.drug, group: item.group, label: `${item.name} (order ${o.id})` });
  }
  return out;
}

export function runCds(doc: EhrDoc, p: EhrPatient, o: EhrOrder): EhrAlert | null {
  if (o.kind !== "med") return null;
  const item = medItem(o.item);
  if (!item) return null;
  const al = (p.allergies ?? []).find((a) => a.cls && a.cls === item.cls);
  if (al) {
    return {
      order: o.id,
      severity: "Major",
      kind: "Drug-allergy",
      title: `${nameOf(p)} has a documented allergy to ${al.substance}${al.reaction ? ` (${al.reaction})` : ""}.`,
      detail: `${item.name} belongs to the same drug class (${item.cls}). Giving it can cause an allergic reaction.`,
    };
  }
  const meds = activeDrugs(doc, p, o.id);
  for (const ix of INTERACTIONS) {
    for (const m of meds) {
      const hit = (m.drug === ix.a && (item.group === ix.b || item.drug === ix.b)) || (item.drug === ix.a && (m.group === ix.b || m.drug === ix.b));
      if (hit) return { order: o.id, severity: "Major", kind: "Drug-drug interaction", title: `${item.name} interacts with ${m.label}.`, detail: ix.text };
    }
  }
  const dup = meds.find((m) => m.drug === item.drug);
  if (dup) {
    return {
      order: o.id,
      severity: "Moderate",
      kind: "Duplicate therapy",
      title: `${nameOf(p)} already has an active prescription for ${item.drug}.`,
      detail: `Active: ${dup.label}. A second order duplicates therapy.`,
    };
  }
  if (item.formulary) return { order: o.id, severity: "Informational", kind: "Formulary information", title: item.formulary, detail: "This alert is informational. It appears on every order for this medication." };
  return null;
}

/* ------------------------------------------------------------------ */
/* Claim scrubber                                                      */
/* ------------------------------------------------------------------ */

export type ScrubIssue = { box: string; text: string; line?: string; dx?: string };

const hasMod = (l: EhrLine, ...m: string[]) => m.includes(normMod(l.mod1 ?? "")) || m.includes(normMod(l.mod2 ?? ""));
const KNOWN_MODS = new Set(MODIFIERS.map((m) => m.code));

export function scrubClaim(doc: EhrDoc, c: EhrClaim): ScrubIssue[] {
  const out: ScrubIssue[] = [];
  const p = patientOf(doc, c.patient);
  const payer = payerOf(doc, c.payer);
  if (!c.memberId) out.push({ box: "1a", text: "Insured's ID number is missing." });
  else {
    const cov = p?.coverage?.find((x) => x.payer === c.payer);
    const rec = cov?.elig?.memberId;
    if (rec && normCode(rec) !== normCode(c.memberId)) out.push({ box: "1a", text: "Insured's ID does not match the payer's eligibility record (subscriber not found)." });
  }
  if (p && !p.signatures?.aob) out.push({ box: "13", text: "No assignment of benefits on file. Capture the patient's signature in Registration › Signatures." });
  if (!c.dx.length) out.push({ box: "21", text: "At least one diagnosis code is required." });
  c.dx.forEach((code, i) => {
    const b = icdBillable(code);
    if (!b.ok) {
      const L = LETTERS[i];
      if (b.reason === "unknown") out.push({ box: "21", dx: code, text: `${L}: ${code} is not a valid ICD-10-CM code in this code set.` });
      else if (b.reason === "seventh") out.push({ box: "21", dx: code, text: `${L}: ${code} needs a 7th character (for example, A for initial encounter).` });
      else out.push({ box: "21", dx: code, text: `${L}: ${code} is a category or subcategory heading, not a complete code. Add the remaining characters.` });
    }
  });
  for (const pr of EXCLUDES1_PAIRS) {
    const a = c.dx.find((d) => d.startsWith(pr.a));
    const b = c.dx.find((d) => d.startsWith(pr.b));
    if (a && b) out.push({ box: "21", dx: b, text: `${a} and ${b} cannot be reported together (${pr.note}).` });
  }
  if (payer?.filingDays && c.age && c.age > payer.filingDays && c.status === "Draft") {
    out.push({ box: "24A", text: `Timely filing: the date of service is ${c.age} days old and ${payer.name} allows ${payer.filingDays} days.` });
  }
  const codes = c.lines.map((l) => l.code);
  const hasMinor = c.lines.some((l) => procCode(l.code)?.minor);
  c.lines.forEach((l, i) => {
    const n = i + 1;
    const pc = procCode(l.code);
    if (!pc) out.push({ box: "24D", line: l.id, text: `Line ${n}: ${l.code || "(blank)"} is not a valid CPT or HCPCS code in this code set.` });
    if (!l.ptr) out.push({ box: "24E", line: l.id, text: `Line ${n} (${l.code}) has no diagnosis pointer. Payers deny lines without one (CO-16).` });
    else {
      if (l.ptr.length > 4) out.push({ box: "24E", line: l.id, text: `Line ${n} has more than 4 diagnosis pointers.` });
      for (const ch of l.ptr) {
        const idx = LETTERS.indexOf(ch);
        if (idx < 0 || idx >= c.dx.length) out.push({ box: "24E", line: l.id, text: `Line ${n} points to diagnosis ${ch}, which is not in Box 21.` });
      }
    }
    if (!(l.units >= 1)) out.push({ box: "24G", line: l.id, text: `Line ${n} needs at least 1 unit.` });
    for (const m of [l.mod1, l.mod2]) if (m && !KNOWN_MODS.has(normMod(m))) out.push({ box: "24D", line: l.id, text: `Line ${n}: modifier ${m} is not recognized.` });
    if (pc && !pc.em && hasMod(l, "25")) out.push({ box: "24D", line: l.id, text: `Line ${n}: modifier 25 attaches only to an E/M code, never to the procedure.` });
    if (pc?.em && hasMod(l, "59", "XE", "XS", "XP", "XU")) out.push({ box: "24D", line: l.id, text: `Line ${n}: 59 and the X modifiers attach to procedure codes. An E/M on the day of a procedure takes modifier 25.` });
    if (pc?.em && hasMinor && !hasMod(l, "25")) {
      const proc = c.lines.find((x) => procCode(x.code)?.minor);
      out.push({ box: "24D", line: l.id, text: `Line ${n}: NCCI edit. ${l.code} is bundled into ${proc?.code} on the same date unless modifier 25 shows a significant, separately identifiable E/M service.` });
    }
    if (payer?.laterality?.includes(l.code) && !hasMod(l, "LT", "RT", "50")) out.push({ box: "24D", line: l.id, text: `Line ${n}: ${payer.name} requires a laterality modifier (LT, RT or 50) on ${l.code}.` });
    if (payer?.authRequired?.includes(l.code) && !c.auth) out.push({ box: "23", line: l.id, text: `Prior authorization number required for ${l.code} by ${payer.name}.` });
    if (codes.indexOf(l.code) !== i && !hasMod(l, "76", "59", "XE", "XS", "XP", "XU")) out.push({ box: "24D", line: l.id, text: `Line ${n}: ${l.code} is billed twice for the same date of service (duplicate service denial risk, CARC 18).` });
  });
  for (const cp of COMPONENT_PAIRS) {
    if (codes.includes(cp.comprehensive)) {
      const comp = c.lines.find((l) => l.code === cp.component);
      if (comp) out.push({ box: "24D", line: comp.id, text: `Panel bundling edit: ${cp.note}` });
    }
  }
  return out;
}

export function claimTotal(c: { lines: EhrLine[] }): number {
  return c.lines.reduce((s, l) => s + l.fee * l.units, 0);
}

/* ------------------------------------------------------------------ */
/* Ledger                                                              */
/* ------------------------------------------------------------------ */

export function balances(p: EhrPatient): { insurance: number; patient: number } {
  let ins = 0;
  let pt = 0;
  for (const r of p.ledger ?? []) {
    ins += (r.charge ?? 0) - (r.adjustment ?? 0) - (r.transfer ?? 0) - (r.party === "Patient" ? 0 : r.payment ?? 0);
    pt += (r.transfer ?? 0) - (r.party === "Patient" ? r.payment ?? 0 : 0);
  }
  return { insurance: Math.round(ins * 100) / 100, patient: Math.round(pt * 100) / 100 };
}

function addLedger(p: EhrPatient, row: EhrLedgerRow) {
  p.ledger = [...(p.ledger ?? []), row];
}

/* ------------------------------------------------------------------ */
/* Reports                                                             */
/* ------------------------------------------------------------------ */

export type ReportCol = { key: string; label: string; kind?: "money" | "num" | "pct" };
export type ReportOut = { title: string; columns: ReportCol[]; rows: { key: string; cells: Record<string, string | number> }[]; summary: { label: string; value: string }[]; note?: string };

function daysBetween(mdy: string, todayIso: string): number {
  const [m, d, y] = mdy.split("/").map(Number);
  const [ty, tm, td] = todayIso.split("-").map(Number);
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(y, m - 1, d)) / 86400000);
}
function inPeriod(mdy: string, period: string, todayIso: string): boolean {
  const n = daysBetween(mdy, todayIso);
  if (n < 0) return false;
  if (period === "Today") return n === 0;
  if (period === "Last 30 days") return n <= 30;
  if (period === "Last 90 days") return n <= 90;
  return n <= 365;
}

function groupRows(rows: { key: string; cells: Record<string, string | number> }[], by: string, field: string, label: (v: string) => string, valueCols: ReportCol[]) {
  const map = new Map<string, { key: string; cells: Record<string, string | number> }>();
  for (const r of rows) {
    const raw = String(r.cells[`_${field}`] ?? r.cells[field] ?? "");
    const k = `${by}:${raw}`;
    const g = map.get(k) ?? { key: k, cells: { group: label(raw), count: 0 } as Record<string, string | number> };
    g.cells.count = Number(g.cells.count) + 1;
    for (const vc of valueCols) g.cells[vc.key] = Number(g.cells[vc.key] ?? 0) + Number(r.cells[vc.key] ?? 0);
    map.set(k, g);
  }
  return Array.from(map.values());
}

export function runReport(doc: EhrDoc, run: EhrReportRun): ReportOut {
  const prov = (id: string) => {
    const p = providerOf(doc, id);
    return p ? `${p.name}, ${p.credentials}` : id;
  };
  const payerName = (id: string) => payerOf(doc, id)?.name ?? id;
  const data = doc.reportData ?? {};
  let out: ReportOut;
  switch (run.report) {
    case "Patient tracking": {
      const appts = (doc.appointments ?? []).filter((a) => a.date === doc.today);
      const rows = appts
        .slice()
        .sort((a, b) => a.time.localeCompare(b.time))
        .map((a) => {
          const p = patientOf(doc, a.patient);
          return { key: a.id, cells: { time: a.time, patient: listName(p), provider: prov(a.provider), _provider: a.provider, type: a.type, _type: a.type, status: a.status, _status: a.status, room: a.room ?? "" } };
        });
      const cols: ReportCol[] = [
        { key: "time", label: "Time" },
        { key: "patient", label: "Patient" },
        { key: "provider", label: "Provider" },
        { key: "type", label: "Visit type" },
        { key: "status", label: "Status" },
        { key: "room", label: "Room" },
      ];
      const by = run.groupBy === "Provider" ? "provider" : run.groupBy === "Status" ? "status" : run.groupBy === "Visit type" ? "type" : "";
      out = by
        ? { title: `Patient tracking by ${run.groupBy.toLowerCase()}`, columns: [{ key: "group", label: run.groupBy }, { key: "count", label: "Visits", kind: "num" }], rows: groupRows(rows, run.groupBy, by, (v) => (by === "provider" ? prov(v) : v), []), summary: [] }
        : { title: "Patient tracking", columns: cols, rows, summary: [] };
      out.summary = [
        { label: "Visits today", value: String(appts.length) },
        { label: "In clinic now", value: String(appts.filter((a) => ["Arrived", "Roomed", "With provider", "Checkout"].includes(a.status)).length) },
        { label: "No-shows", value: String(appts.filter((a) => a.status === "No show").length) },
      ];
      break;
    }
    case "No-shows": {
      const base = [
        ...(data.noShows ?? []),
        ...(doc.appointments ?? [])
          .filter((a) => a.status === "No show")
          .map((a) => {
            const [y, m, d] = a.date.split("-");
            return { patient: listName(patientOf(doc, a.patient)), date: `${m}/${d}/${y}`, provider: a.provider, type: a.type };
          }),
      ].filter((r) => inPeriod(r.date, run.period, doc.today));
      const rows = base.map((r, i) => ({ key: `NS${i + 1}`, cells: { date: r.date, patient: r.patient, provider: prov(r.provider), _provider: r.provider, type: r.type, _type: r.type } }));
      const by = run.groupBy === "Provider" ? "provider" : run.groupBy === "Visit type" ? "type" : "";
      out = by
        ? { title: `No-shows by ${run.groupBy.toLowerCase()}`, columns: [{ key: "group", label: run.groupBy }, { key: "count", label: "No-shows", kind: "num" }], rows: groupRows(rows, run.groupBy, by, (v) => (by === "provider" ? prov(v) : v), []), summary: [] }
        : { title: "No-shows", columns: [{ key: "date", label: "Date" }, { key: "patient", label: "Patient" }, { key: "provider", label: "Provider" }, { key: "type", label: "Visit type" }], rows, summary: [] };
      out.summary = [{ label: `No-shows (${run.period.toLowerCase()})`, value: String(base.length) }];
      break;
    }
    case "A/R aging": {
      const rows = (data.arAging ?? []).map((r) => {
        const total = r.b0 + r.b31 + r.b61 + r.b91;
        return { key: r.payer, cells: { payer: payerName(r.payer), b0: r.b0, b31: r.b31, b61: r.b61, b91: r.b91, total, pct: total ? Math.round((r.b91 / total) * 1000) / 10 : 0 } };
      });
      const total = rows.reduce((s, r) => s + Number(r.cells.total), 0);
      const over = rows.reduce((s, r) => s + Number(r.cells.b91), 0);
      out = {
        title: "Accounts receivable aging by payer",
        columns: [
          { key: "payer", label: "Payer" },
          { key: "b0", label: "0-30", kind: "money" },
          { key: "b31", label: "31-60", kind: "money" },
          { key: "b61", label: "61-90", kind: "money" },
          { key: "b91", label: "Over 90", kind: "money" },
          { key: "total", label: "Total", kind: "money" },
          { key: "pct", label: "% over 90", kind: "pct" },
        ],
        rows,
        summary: [
          { label: "Total A/R", value: money(total) },
          { label: "Over 90 days", value: money(over) },
          { label: "% over 90 days", value: total ? `${((over / total) * 100).toFixed(1)}%` : "0%" },
          ...(data.metrics?.avgDailyCharges ? [{ label: "Days in A/R", value: (total / data.metrics.avgDailyCharges).toFixed(1) }] : []),
        ],
        note: "Common targets: Days in A/R under 40; A/R over 90 days under 15-20%. Treat targets as orientation; watch the trend.",
      };
      break;
    }
    case "Denials": {
      const base = (data.denials ?? []).filter((r) => inPeriod(r.date, run.period, doc.today));
      const rows = base.map((r) => ({ key: r.claim, cells: { date: r.date, claim: r.claim, patient: r.patient, payer: payerName(r.payer), _payer: r.payer, carc: r.carc, _reason: r.carc, reason: r.reason, amount: r.amount } }));
      const by = run.groupBy === "Reason" ? "reason" : run.groupBy === "Payer" ? "payer" : "";
      out = by
        ? {
            title: `Denials by ${run.groupBy.toLowerCase()}`,
            columns: [{ key: "group", label: run.groupBy === "Reason" ? "Reason code" : "Payer" }, { key: "count", label: "Denials", kind: "num" }, { key: "amount", label: "Amount", kind: "money" }],
            rows: groupRows(rows, run.groupBy, by, (v) => (by === "payer" ? payerName(v) : `${v} ${base.find((b) => b.carc === v)?.reason ?? ""}`), [{ key: "amount", label: "Amount" }]),
            summary: [],
          }
        : { title: "Denials", columns: [{ key: "date", label: "Date" }, { key: "claim", label: "Claim" }, { key: "patient", label: "Patient" }, { key: "payer", label: "Payer" }, { key: "carc", label: "Code" }, { key: "reason", label: "Reason" }, { key: "amount", label: "Amount", kind: "money" }], rows, summary: [] };
      const sub = data.metrics?.claimsSubmitted;
      out.summary = [
        { label: `Denials (${run.period.toLowerCase()})`, value: String(base.length) },
        ...(sub ? [{ label: "Denial rate", value: `${((base.length / sub) * 100).toFixed(1)}%` }] : []),
        ...(sub && data.metrics?.firstPassAccepted ? [{ label: "Clean claim rate", value: `${((data.metrics.firstPassAccepted / sub) * 100).toFixed(1)}%` }] : []),
      ];
      break;
    }
    case "Diabetes care gaps":
    default: {
      const base = data.quality ?? [];
      const rows = base.map((r) => ({ key: r.mrn, cells: { patient: r.patient, mrn: r.mrn, dob: r.dob, provider: prov(r.provider), _provider: r.provider, lastA1c: r.lastA1c, value: r.value, gap: r.gap ? "Gap: no A1c in 6 months" : "Met" } }));
      const by = run.groupBy === "Provider" ? "provider" : "";
      out = by
        ? { title: "Diabetes care gaps by provider", columns: [{ key: "group", label: "Provider" }, { key: "count", label: "Patients", kind: "num" }], rows: groupRows(rows, "Provider", "provider", prov, []), summary: [] }
        : {
            title: "Diabetes care gaps: hemoglobin A1c in the last 6 months",
            columns: [{ key: "patient", label: "Patient" }, { key: "mrn", label: "MRN" }, { key: "dob", label: "DOB" }, { key: "provider", label: "PCP" }, { key: "lastA1c", label: "Last A1c" }, { key: "value", label: "Result" }, { key: "gap", label: "Measure" }],
            rows,
            summary: [],
          };
      const met = base.filter((r) => !r.gap).length;
      out.summary = [
        { label: "Patients with diabetes", value: String(base.length) },
        { label: "A1c in last 6 months", value: String(met) },
        { label: "Care gaps", value: String(base.length - met) },
        { label: "Measure rate", value: base.length ? `${Math.round((met / base.length) * 100)}%` : "0%" },
      ];
      out.note = "Contains PHI. Use it for treatment and care-team outreach; de-identify before it leaves the practice.";
      break;
    }
  }
  if (run.sort) {
    const [col, dir] = run.sort.split(":");
    out.rows = out.rows.slice().sort((a, b) => {
      const x = a.cells[col];
      const y = b.cells[col];
      const asDate = (v: unknown) => {
        const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(v ?? ""));
        return m ? `${m[3]}${m[1]}${m[2]}` : null;
      };
      const dx = asDate(x);
      const dy = asDate(y);
      const c = typeof x === "number" && typeof y === "number" ? x - y : dx && dy ? dx.localeCompare(dy) : String(x ?? "").localeCompare(String(y ?? ""));
      return dir === "desc" ? -c : c;
    });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Diagnosis pointer maintenance                                       */
/* ------------------------------------------------------------------ */

function remapPointers(lines: EhrLine[], map: (idx: number) => number | null) {
  for (const l of lines) {
    if (!l.ptr) continue;
    l.ptr = l.ptr
      .split("")
      .map((ch) => {
        const i = LETTERS.indexOf(ch);
        const n = i < 0 ? null : map(i);
        return n === null || n < 0 ? "" : LETTERS[n];
      })
      .join("");
  }
}
function removeDxAt(target: { dx: string[]; lines: EhrLine[] }, idx: number) {
  target.dx.splice(idx, 1);
  remapPointers(target.lines, (i) => (i === idx ? null : i > idx ? i - 1 : i));
}
function moveDxFirst(target: { dx: string[]; lines: EhrLine[] }, idx: number) {
  const [code] = target.dx.splice(idx, 1);
  target.dx.unshift(code);
  remapPointers(target.lines, (i) => (i === idx ? 0 : i < idx ? i + 1 : i));
}

function feeFor(doc: EhrDoc, code: string): number {
  return doc.fees?.[code] ?? procCode(code)?.fee ?? 0;
}

/* ------------------------------------------------------------------ */
/* Record lookup by id                                                 */
/* ------------------------------------------------------------------ */

function findAppt(doc: EhrDoc, id: string): EhrAppt | undefined {
  return doc.appointments?.find((a) => a.id === id);
}
function mustAppt(doc: EhrDoc, id: string): EhrAppt {
  const a = findAppt(doc, id);
  if (!a) throw new Error(`No appointment "${id}"`);
  return a;
}
function mustEnc(doc: EhrDoc, id: string): EhrEncounter {
  const e = doc.encounters?.find((x) => x.id === id);
  if (!e) throw new Error(`No encounter "${id}"`);
  return e;
}
function mustClaim(doc: EhrDoc, id: string): EhrClaim {
  const c = doc.claims?.find((x) => x.id === id);
  if (!c) throw new Error(`No claim "${id}"`);
  return c;
}
function mustAuth(doc: EhrDoc, id: string): EhrAuthRequest {
  const a = doc.auths?.find((x) => x.id === id);
  if (!a) throw new Error(`No preauthorization request "${id}"`);
  return a;
}
function mustOrder(doc: EhrDoc, id: string): EhrOrder {
  const o = doc.orders?.find((x) => x.id === id);
  if (!o) throw new Error(`No order "${id}"`);
  return o;
}
function selId(ui: SimUi, prefix: string): string {
  const s = ui.selection ?? "";
  if (!s.startsWith(`${prefix}:`)) throw new Error(`This action needs a "${prefix}:" selection (got "${s}")`);
  return s.slice(prefix.length + 1);
}
function splitVal(v: SimValue | undefined, n = 2): string[] {
  const s = String(v ?? "");
  const i = s.indexOf(":");
  if (n === 2 && i >= 0) return [s.slice(0, i), s.slice(i + 1)];
  return [s];
}

/* ------------------------------------------------------------------ */
/* Type commits                                                        */
/* ------------------------------------------------------------------ */

const PATIENT_FIELDS = ["last", "first", "middle", "dob", "sex", "phone", "email", "street", "city", "state", "zip", "language"];
const GUAR_FIELDS = ["name", "relationship", "dob", "phone"];
const COV_FIELDS = ["payer", "plan", "subscriber", "subscriberDob", "relationship", "memberId", "group", "effective", "copay"];
const LINE_FIELDS = ["code", "mod1", "mod2", "ptr", "units"];

function setLineField(doc: EhrDoc, l: EhrLine, f: string, v: string) {
  if (!LINE_FIELDS.includes(f)) throw new Error(`Unknown line field "${f}"`);
  if (f === "units") l.units = Math.max(0, parseInt(v, 10) || 0);
  else if (f === "code") {
    l.code = normCode(v);
    l.fee = feeFor(doc, l.code);
  } else (l as unknown as Record<string, string>)[f] = v;
}

function applyType(d: EhrDoc, target: string, raw: string) {
  const v = normalizeField(target, raw);
  const [id, ...rest] = target.split(".");
  const p = patientOf(d, id);
  if (p) {
    if (rest.length === 1 && PATIENT_FIELDS.includes(rest[0])) {
      (p as unknown as Record<string, string>)[rest[0]] = v;
      d.toast = "Registration updated.";
      return;
    }
    if (rest[0] === "guarantor" && GUAR_FIELDS.includes(rest[1])) {
      p.guarantor = { ...(p.guarantor ?? {}), [rest[1]]: v };
      d.toast = "Guarantor updated.";
      return;
    }
    const m = /^ins([12])$/.exec(rest[0] ?? "");
    if (m && COV_FIELDS.includes(rest[1])) {
      const cov = coverageOf(p, Number(m[1]));
      if (!cov) throw new Error(`${id} has no coverage ${m[1]}`);
      (cov as unknown as Record<string, string>)[rest[1]] = rest[1] === "payer" ? payerOf(d, v)?.id ?? v : v;
      if (["payer", "memberId", "subscriberDob", "relationship"].includes(rest[1])) cov.eligResult = null;
      d.toast = "Coverage updated.";
      return;
    }
    throw new Error(`Unknown patient field "${target}"`);
  }
  const a = findAppt(d, id);
  if (a) {
    if (!["reason", "auth", "room"].includes(rest[0])) throw new Error(`Unknown appointment field "${target}"`);
    (a as unknown as Record<string, string>)[rest[0]] = v;
    d.toast = rest[0] === "auth" ? "Authorization number saved on the visit." : "Appointment updated.";
    return;
  }
  const pa = d.auths?.find((x) => x.id === id);
  if (pa) {
    if (!["cpt", "icd", "npi", "units", "notes"].includes(rest[0])) throw new Error(`Unknown preauthorization field "${target}"`);
    (pa as unknown as Record<string, string>)[rest[0]] = v;
    return;
  }
  const e = d.encounters?.find((x) => x.id === id);
  if (e) {
    const l = e.lines.find((x) => x.id === rest[0]);
    if (!l) throw new Error(`No line "${rest[0]}" on ${id}`);
    setLineField(d, l, rest[1], v);
    return;
  }
  const c = d.claims?.find((x) => x.id === id);
  if (c) {
    if (rest.length === 1 && ["memberId", "group", "auth", "relationship", "insured"].includes(rest[0])) {
      (c as unknown as Record<string, string>)[rest[0]] = v;
      return;
    }
    if (rest[0] === "dx") {
      const idx = LETTERS.indexOf(rest[1]);
      if (idx < 0 || idx > c.dx.length) throw new Error(`Box 21 ${rest[1]} is out of range on ${id}`);
      if (!v) removeDxAt(c, idx);
      else c.dx[idx] = v;
      return;
    }
    const l = c.lines.find((x) => x.id === rest[0]);
    if (!l) throw new Error(`No line "${rest[0]}" on ${id}`);
    setLineField(d, l, rest[1], v);
    return;
  }
  throw new Error(`Nothing to type into at "${target}"`);
}

/* ------------------------------------------------------------------ */
/* Commands                                                            */
/* ------------------------------------------------------------------ */

const WORKSPACES: EhrWorkspace[] = ["search", "chart", "schedule", "tracker", "preauth", "encoder", "charges", "claims", "reports", "audit"];
const CHART_TABS: EhrChartTab[] = ["facesheet", "registration", "orders", "documents", "ledger"];
export const TRACK_MOVES = ["Roomed", "With provider", "Checkout"];

function openChart(d: EhrDoc, pid: string, judged: boolean) {
  const p = mustPatient(d, pid);
  d.nav.chart = pid;
  d.nav.ws = "chart";
  const tabs = d.chartTabs ?? ["facesheet", "registration"];
  if (!d.nav.tab || !tabs.includes(d.nav.tab)) d.nav.tab = tabs[0];
  d.nav.sub = undefined;
  log(d, "Chart opened", pid, judged && p.restricted ? `Restricted (${p.restricted})` : undefined);
}

function signOrders(d: EhrDoc, pid: string) {
  const p = mustPatient(d, pid);
  const pending = (d.orders ?? []).filter((o) => o.patient === pid && o.status === "Unsigned");
  if (!pending.length) throw new Error(`No unsigned orders for ${pid}`);
  for (const o of pending) {
    const verbal = o.mode && o.mode !== "Standard";
    o.status = verbal ? "Pending cosign" : "Signed";
    if (o.kind === "med") {
      const item = medItem(o.item);
      p.meds = [
        ...(p.meds ?? []),
        { id: nextId((p.meds ?? []).map((m) => m.id), "M"), name: item?.name ?? o.name, sig: `${o.details.dose} ${o.details.route?.toLowerCase()} ${o.details.freq?.toLowerCase()} for ${o.details.duration}`, drug: item?.drug, status: "Active" },
      ];
    }
  }
  log(d, `Signed ${pending.length} order${pending.length === 1 ? "" : "s"}`, pid);
  d.toast = `${pending.length} order${pending.length === 1 ? "" : "s"} signed${pending.some((o) => o.status === "Pending cosign") ? ". Verbal and telephone orders are routed to the provider for cosignature." : "."}`;
}

function createClaim(d: EhrDoc, eid: string): string {
  const e = mustEnc(d, eid);
  if (e.status === "Billed") throw new Error(`${eid} is already billed`);
  const p = mustPatient(d, e.patient);
  const cov = coverageOf(p, 1);
  if (!cov) throw new Error(`${p.id} has no primary coverage`);
  const id = nextId((d.claims ?? []).map((c) => c.id), "C");
  const visit = e.visit ? findAppt(d, e.visit) : undefined;
  const claim: EhrClaim = {
    id,
    patient: p.id,
    enc: e.id,
    payer: cov.payer,
    provider: e.provider,
    dos: e.date,
    pos: e.pos ?? "11",
    memberId: cov.memberId ?? "",
    group: cov.group,
    insured: cov.subscriber || `${p.last}, ${p.first}`,
    relationship: cov.relationship ?? "Self",
    auth: visit?.auth,
    dx: e.dx.slice(),
    lines: clone(e.lines),
    status: "Draft",
    outcome: e.outcome ? clone(e.outcome) : undefined,
    history: [`${stamp(d)} Claim created from encounter ${e.id}`],
  };
  d.claims = [...(d.claims ?? []), claim];
  e.status = "Billed";
  e.claim = id;
  for (const l of e.lines) addLedger(p, { date: e.date, desc: `${l.code}${l.mod1 ? `-${l.mod1}` : ""} ${procCode(l.code)?.text ?? ""}`.trim(), charge: l.fee * l.units, party: "Insurance" });
  return id;
}

function submitClaim(d: EhrDoc, cid: string) {
  const c = mustClaim(d, cid);
  if (c.status !== "Draft") throw new Error(`${cid} is not a draft`);
  const issues = scrubClaim(d, c);
  if (issues.length) throw new Error(`${cid} still has scrubber errors: ${issues.map((i) => i.text).join(" | ")}`);
  c.status = "Submitted";
  c.history = [...(c.history ?? []), `${stamp(d)} Submitted to ${payerOf(d, c.payer)?.name ?? c.payer} (837P)`, `${stamp(d)} Accepted by the clearinghouse (277CA)`];
  const out = c.outcome;
  if (out?.status === "Denied") {
    c.status = "Denied";
    c.carc = out.carc;
    c.denial = out.denial;
    c.history.push(`${stamp(d)} Denied: ${out.carc ?? ""} ${out.denial ?? ""}`.trim());
  } else if (out?.status === "Paid") {
    const rid = nextId((d.remits ?? []).map((r) => r.id), "R");
    const base = Number(nextId((d.remits ?? []).flatMap((r) => r.lines.map((l) => l.id)), "RL").slice(2)) - 1;
    const lines = c.lines.map((l, i) => {
      const o = out.lines?.[l.id] ?? { allowed: l.fee * l.units, paid: l.fee * l.units };
      const billed = l.fee * l.units;
      return {
        id: `RL${base + i + 1}`,
        claim: c.id,
        patient: c.patient,
        code: l.code,
        dos: c.dos,
        billed,
        allowed: o.allowed,
        paid: o.paid,
        adj: Math.round((billed - o.allowed) * 100) / 100,
        adjCode: "CO-45",
        pr: o.pr ?? 0,
        prCode: o.pr ? o.prCode ?? "PR-2" : undefined,
        posted: null,
      };
    });
    d.remits = [...(d.remits ?? []), { id: rid, payer: c.payer, date: todayMdy(d), trace: `EFT ${8800000 + Number(rid.slice(1)) * 137}`, lines }];
    c.status = "Paid";
    c.history.push(`${stamp(d)} Paid: ERA ${rid} received, ready to post`);
  }
  log(d, "Claim submitted", c.patient, c.id);
  d.toast = c.status === "Denied" ? `Claim ${c.id} was denied (${c.carc}). Work the denial from the queue.` : c.status === "Paid" ? `Claim ${c.id} accepted and paid. The ERA is ready to post.` : `Claim ${c.id} submitted.`;
}

function applyCommand(d: EhrDoc, id: string, value: SimValue | undefined, ui: SimUi): Out {
  const v = String(value ?? "");
  switch (id) {
    case "ehr.nav": {
      const [ws, sub] = splitVal(v);
      if (!WORKSPACES.includes(ws as EhrWorkspace)) throw new Error(`Unknown workspace "${ws}"`);
      if (!d.workspaces.includes(ws as EhrWorkspace) || (ws === "chart" && !d.nav.chart)) return { doc: d };
      d.nav.ws = ws as EhrWorkspace;
      d.nav.sub = sub || undefined;
      return { doc: d, ui: { selection: "" } };
    }
    case "ehr.chart.tab": {
      const [tab, sub] = splitVal(v);
      if (!CHART_TABS.includes(tab as EhrChartTab)) throw new Error(`Unknown chart tab "${tab}"`);
      if (!d.nav.chart) throw new Error("No chart is open");
      d.nav.ws = "chart";
      d.nav.tab = tab as EhrChartTab;
      d.nav.sub = sub || undefined;
      return { doc: d, ui: { selection: "" } };
    }
    case "ehr.chart.open":
      openChart(d, v, false);
      return { doc: d, ui: { selection: "" } };
    case "ehr.access.open":
      openChart(d, v, true);
      return { doc: d, ui: { selection: "" } };
    case "ehr.chart.close":
      d.nav.chart = null;
      if (d.nav.ws === "chart") d.nav.ws = d.workspaces.includes("search") ? "search" : d.workspaces[0];
      return { doc: d, ui: { selection: "" } };
    case "ehr.sched.day":
      d.nav.day = v;
      return { doc: d, ui: { selection: "" } };
    case "ehr.enc.open":
      mustEnc(d, v);
      d.nav.enc = v;
      return { doc: d, ui: { selection: "" } };
    case "ehr.claim.open":
      mustClaim(d, v);
      d.nav.claim = v;
      d.nav.ws = "claims";
      d.nav.sub = "claim";
      return { doc: d, ui: { selection: `claim:${v}` } };
    case "ehr.auth.open":
      mustAuth(d, v);
      d.nav.auth = v;
      d.nav.ws = "preauth";
      return { doc: d };
    case "ehr.report.sort":
      if (!d.report) throw new Error("No report has been run");
      d.report.sort = v;
      return { doc: d };
    case "ehr.unlock":
      d.session.locked = false;
      return { doc: d };
    case "ehr.lock":
      d.session.locked = true;
      log(d, "Workstation secured");
      return { doc: d, ui: { selection: "" } };
    case "ehr.signout":
      log(d, "Signed out");
      d.session.signedIn = false;
      d.session.locked = false;
      d.nav.chart = null;
      return { doc: d, ui: { selection: "" } };

    /* Registration */
    case "ehr.elig.check": {
      const [pid, pr] = splitVal(v);
      const p = mustPatient(d, pid);
      const cov = coverageOf(p, Number(pr) || 1);
      if (!cov) throw new Error(`${pid} has no coverage ${pr}`);
      cov.eligResult = { at: stamp(d), ...eligibilityResponse(d, p, cov) };
      log(d, "Eligibility inquiry (270) sent", pid, payerOf(d, cov.payer)?.name);
      d.toast = cov.eligResult.ok ? "Eligibility verified: coverage is active." : "The payer did not confirm coverage. Read the response.";
      return { doc: d };
    }
    case "ehr.cov.add": {
      const [pid, pr] = splitVal(v);
      const p = mustPatient(d, pid);
      const n = (Number(pr) || 2) as 1 | 2;
      if (coverageOf(p, n)) throw new Error(`${pid} already has coverage ${n}`);
      p.coverage = [...(p.coverage ?? []), { priority: n, payer: "", relationship: "", memberId: "", subscriber: "" }];
      d.toast = n === 2 ? "Secondary coverage added. Fill in the subscriber and plan from the card." : "Coverage added.";
      return { doc: d };
    }
    case "ehr.sig.capture": {
      const [pid, form] = splitVal(v);
      const p = mustPatient(d, pid);
      if (!["npp", "aob", "fin"].includes(form)) throw new Error(`Unknown signature form "${form}"`);
      p.signatures = { ...(p.signatures ?? {}), [form]: todayMdy(d) };
      log(d, "Signature captured", pid, form === "npp" ? "Notice of Privacy Practices acknowledgment" : form === "aob" ? "Assignment of benefits" : "Financial responsibility agreement");
      d.toast = "Signature saved to the record.";
      return { doc: d };
    }
    case "ehr.guar.self": {
      const p = mustPatient(d, v);
      p.guarantor = { name: `${p.last}, ${p.first}`, relationship: "Self", dob: p.dob, phone: p.phone };
      d.toast = "Guarantor set to the patient.";
      return { doc: d };
    }

    /* Scheduling and tracking */
    case "ehr.appt.confirm":
    case "ehr.appt.noShow":
    case "ehr.appt.cancel": {
      const a = mustAppt(d, selId(ui, "appt"));
      a.status = id === "ehr.appt.confirm" ? "Confirmed" : id === "ehr.appt.noShow" ? "No show" : "Canceled";
      a.since = d.clock;
      d.toast = `${nameOf(patientOf(d, a.patient))}: ${a.status.toLowerCase()}.`;
      return { doc: d };
    }
    case "ehr.track.status": {
      const a = mustAppt(d, selId(ui, "appt"));
      if (!TRACK_MOVES.includes(v)) throw new Error(`Not a tracker status: "${v}"`);
      a.status = v as EhrAppt["status"];
      a.since = d.clock;
      tick(d);
      d.toast = `${nameOf(patientOf(d, a.patient))} moved to ${v}.`;
      return { doc: d };
    }

    /* Preauthorization */
    case "ehr.auth.submit": {
      const a = mustAuth(d, v);
      const miss = authMissing(a);
      if (miss.length) throw new Error(`${a.id} is missing ${miss.join(", ")}`);
      const r = evaluateAuth(d, a);
      a.status = r.status;
      a.responses = [...(a.responses ?? []), { at: stamp(d), status: r.status, lines: r.lines }];
      log(d, "Prior authorization request (278) sent", a.patient, a.service);
      d.toast = r.status === "Approved" ? "Authorization approved. Record the number on the visit." : "The payer pended the request. Read the response.";
      return { doc: d };
    }

    /* Coding and charges */
    case "ehr.dx.add": {
      const [eid, code0] = splitVal(v);
      const e = mustEnc(d, eid);
      const code = normIcd(code0);
      const b = icdBillable(code);
      if (!b.ok) throw new Error(`${code} is not a complete code in the training set (${b.reason})`);
      if (!e.dx.includes(code)) {
        if (e.dx.length >= 12) throw new Error("Box 21 holds 12 diagnoses");
        e.dx.push(code);
      }
      d.toast = `${code} added as diagnosis ${LETTERS[e.dx.indexOf(code)]}.`;
      return { doc: d };
    }
    case "ehr.dx.remove":
    case "ehr.dx.first": {
      const [eid, code] = splitVal(selId(ui, "dx"));
      const e = mustEnc(d, eid);
      const idx = e.dx.indexOf(code);
      if (idx < 0) throw new Error(`${code} is not on ${eid}`);
      if (id === "ehr.dx.remove") removeDxAt(e, idx);
      else moveDxFirst(e, idx);
      d.toast = id === "ehr.dx.remove" ? `${code} removed. Pointers were updated.` : `${code} is now diagnosis A.`;
      return { doc: d, ui: { selection: id === "ehr.dx.remove" ? "" : `dx:${eid}:${code}` } };
    }
    case "ehr.chg.add": {
      const [eid, code0] = splitVal(v);
      const e = mustEnc(d, eid);
      const code = normCode(code0);
      if (!procCode(code)) throw new Error(`${code} is not in the training code set`);
      const lid = nextId(e.lines.map((l) => l.id), "L");
      e.lines.push({ id: lid, code, units: 1, ptr: "", fee: feeFor(d, code) });
      d.toast = `${code} added as line ${e.lines.length}. Set its diagnosis pointer.`;
      return { doc: d, ui: { selection: `chg:${eid}:${lid}` } };
    }
    case "ehr.chg.remove": {
      const [eid, lid] = splitVal(selId(ui, "chg"));
      const e = mustEnc(d, eid);
      if (!e.lines.some((l) => l.id === lid)) throw new Error(`No line ${lid} on ${eid}`);
      e.lines = e.lines.filter((l) => l.id !== lid);
      return { doc: d, ui: { selection: "" } };
    }
    case "ehr.claim.create": {
      const cid = createClaim(d, v);
      d.nav.ws = d.workspaces.includes("claims") ? "claims" : d.nav.ws;
      d.nav.claim = cid;
      d.nav.sub = "claim";
      d.toast = `Claim ${cid} created. Review the scrubber before you submit.`;
      return { doc: d, ui: { selection: `claim:${cid}` } };
    }
    case "ehr.claim.submit":
      submitClaim(d, v);
      return { doc: d };
    case "ehr.claim.removeLine": {
      const [cid, lid] = splitVal(selId(ui, "cl"));
      const c = mustClaim(d, cid);
      if (!c.lines.some((l) => l.id === lid)) throw new Error(`No line ${lid} on ${cid}`);
      c.lines = c.lines.filter((l) => l.id !== lid);
      d.toast = "Line removed from the claim.";
      return { doc: d, ui: { selection: `claim:${cid}` } };
    }
    case "ehr.claim.removeDx": {
      const [cid, code] = splitVal(selId(ui, "cdx"));
      const c = mustClaim(d, cid);
      const idx = c.dx.indexOf(code);
      if (idx < 0) throw new Error(`${code} is not on ${cid}`);
      removeDxAt(c, idx);
      d.toast = `${code} removed from Box 21. Pointers were updated.`;
      return { doc: d, ui: { selection: `claim:${cid}` } };
    }

    /* Orders */
    case "ehr.orderset.add": {
      const [pid, setId] = splitVal(v);
      const p = mustPatient(d, pid);
      const set = ORDER_SETS.find((s) => s.id === setId);
      if (!set) throw new Error(`Unknown order set "${setId}"`);
      for (const it of set.items) {
        const name = it.kind === "lab" ? labItem(it.item)?.name : imgItem(it.item)?.name;
        d.orders = [
          ...(d.orders ?? []),
          { id: nextId((d.orders ?? []).map((o) => o.id), "O"), patient: p.id, kind: it.kind, item: it.item, name: name ?? it.item, details: { priority: "Routine" }, status: "Unsigned", mode: "Standard", orderedBy: d.session.provider ?? p.pcp, enteredBy: d.session.user, date: todayMdy(d) },
        ];
      }
      d.toast = `${set.name} order set added: ${set.items.length} orders to review and sign.`;
      return { doc: d };
    }
    case "ehr.order.remove": {
      const o = mustOrder(d, selId(ui, "order"));
      if (o.status !== "Unsigned") throw new Error(`${o.id} is not an unsigned order`);
      d.orders = (d.orders ?? []).filter((x) => x.id !== o.id);
      d.toast = `${o.name} removed before signing.`;
      return { doc: d, ui: { selection: "" } };
    }
    case "ehr.orders.sign":
      if (d.alert) throw new Error("Respond to the open alert first");
      signOrders(d, v);
      return { doc: d };
    case "ehr.order.followUp": {
      const o = mustOrder(d, selId(ui, "order"));
      if (o.result) throw new Error(`${o.id} already has a result`);
      o.followUp = true;
      d.toast = `Follow-up sent to the performing department for ${o.name}.`;
      return { doc: d };
    }
    case "ehr.result.ack": {
      const o = mustOrder(d, selId(ui, "order"));
      if (!o.result) throw new Error(`${o.id} has no result`);
      o.ack = true;
      d.toast = `Result acknowledged: ${o.name}.`;
      return { doc: d };
    }

    /* Compliance and reports */
    case "ehr.audit.flag": {
      const lid = selId(ui, "audit");
      const e = d.audit.find((a) => a.id === lid);
      if (!e) throw new Error(`No audit entry ${lid}`);
      e.flagged = true;
      d.toast = "Entry flagged for Privacy Officer review.";
      return { doc: d };
    }
    case "ehr.report.flag": {
      const key = selId(ui, "row");
      if (!d.report) throw new Error("No report has been run");
      if (!runReport(d, d.report).rows.some((r) => r.key === key)) throw new Error(`No report row "${key}"`);
      d.report.flagged = Array.from(new Set([...(d.report.flagged ?? []), key]));
      d.toast = "Row flagged for follow-up.";
      return { doc: d };
    }
  }
  throw new Error(`Unknown command "${id}"`);
}

/* ------------------------------------------------------------------ */
/* Dialogs                                                             */
/* ------------------------------------------------------------------ */

function str(values: Record<string, SimValue>, k: string): string {
  const v = values[k];
  return v === undefined || v === null ? "" : String(v);
}

function applyDialog(d: EhrDoc, id: string, values: Record<string, SimValue>, ui: SimUi): Out {
  switch (id) {
    case "ehr.signin":
      d.session.signedIn = true;
      d.session.locked = false;
      d.session.user = str(values, "user") || d.session.user;
      d.department = str(values, "department") || d.department;
      log(d, "Signed in", undefined, d.department);
      return { doc: d };
    case "ehr.btg": {
      const pid = selId(ui, "pt");
      const p = mustPatient(d, pid);
      d.btg = { ...(d.btg ?? {}), [pid]: str(values, "reason") };
      d.nav.chart = pid;
      d.nav.ws = "chart";
      const tabs = d.chartTabs ?? ["facesheet", "registration"];
      if (!d.nav.tab || !tabs.includes(d.nav.tab)) d.nav.tab = tabs[0];
      log(d, "Break-the-glass access", pid, `${p.restricted ?? "Restricted"} record · Reason: ${str(values, "reason")}`);
      return { doc: d, ui: { selection: "" } };
    }
    case "ehr.incident":
      d.incidents = [...(d.incidents ?? []), { category: str(values, "category"), detail: str(values, "detail"), at: stamp(d) }];
      d.toast = `Report received by the Privacy and Compliance Office. Reference PC-${d.today.replace(/-/g, "").slice(2)}-${(d.incidents?.length ?? 0) + 40}.`;
      tick(d);
      return { doc: d };
    case "ehr.roi": {
      const pid = str(values, "patient") || d.nav.chart || "";
      mustPatient(d, pid);
      const rec = { patient: pid, requester: str(values, "requester"), decision: str(values, "decision"), docs: str(values, "docs"), format: str(values, "format"), at: stamp(d) };
      d.roi = [...(d.roi ?? []), rec];
      if (rec.decision === "Release now") log(d, "Records released (ROI)", pid, `${rec.requester} · ${rec.docs || "no documents"} · ${rec.format}`);
      else log(d, "Release of information request logged", pid, `${rec.requester} · ${rec.decision}`);
      d.toast = rec.decision === "Release now" ? "Release recorded. The disclosure is now in the patient's accounting of disclosures." : "Request recorded.";
      return { doc: d };
    }
    case "ehr.checkin": {
      const a = mustAppt(d, selId(ui, "appt"));
      a.status = "Arrived";
      a.since = d.clock;
      const amt = Number(normMoney(str(values, "collected")) || 0);
      a.copay = amt ? amt.toFixed(2) : a.copay;
      a.method = str(values, "method");
      const p = mustPatient(d, a.patient);
      if (amt > 0) addLedger(p, { date: todayMdy(d), desc: `Copay collected at check-in (${a.method.toLowerCase()})`, payment: amt, party: "Patient" });
      log(d, "Patient checked in", a.patient, `${a.type} ${a.time}`);
      d.toast = `${nameOf(p)} checked in. The visit is now on the tracker as Arrived.`;
      return { doc: d };
    }
    case "ehr.checkout": {
      const a = mustAppt(d, selId(ui, "appt"));
      a.status = "Departed";
      a.since = d.clock;
      a.followUp = str(values, "followUp");
      a.referral = str(values, "referral");
      const amt = Number(normMoney(str(values, "collected")) || 0);
      const p = mustPatient(d, a.patient);
      if (amt > 0) addLedger(p, { date: todayMdy(d), desc: `Payment at check-out (${str(values, "method").toLowerCase()})`, payment: amt, party: "Patient" });
      tick(d);
      d.toast = `${nameOf(p)} checked out${a.followUp && a.followUp !== "None" ? `. Follow-up in ${a.followUp}` : ""}.`;
      return { doc: d };
    }
    case "ehr.appt.new": {
      const slot = parseSlot(ui.selection);
      if (!slot) throw new Error(`New appointment needs a slot selection (got "${ui.selection}")`);
      if (!providerOf(d, slot.provider)) throw new Error(`No provider ${slot.provider}`);
      const pid = str(values, "patient");
      mustPatient(d, pid);
      const vt = VISIT_TYPES.find((x) => x.value === str(values, "type"));
      if (!vt) throw new Error(`Unknown visit type "${str(values, "type")}"`);
      if (slotConflict(d, slot.provider, slot.date, slot.time, vt.minutes)) {
        d.toast = `A ${vt.minutes}-minute ${vt.value.toLowerCase()} visit at ${slot.time} overlaps another appointment. Choose an earlier slot or another provider.`;
        return { doc: d };
      }
      const nid = nextId((d.appointments ?? []).map((a) => a.id), "V");
      d.appointments = [...(d.appointments ?? []), { id: nid, patient: pid, provider: slot.provider, date: slot.date, time: slot.time, minutes: vt.minutes, type: vt.value, reason: str(values, "reason"), status: "Scheduled" }];
      tick(d);
      d.toast = `Booked: ${nameOf(patientOf(d, pid))}, ${vt.value}, ${slot.time}.`;
      return { doc: d, ui: { selection: `appt:${nid}` } };
    }
    case "ehr.order.med":
    case "ehr.order.lab":
    case "ehr.order.img":
    case "ehr.order.ref": {
      const pid = str(values, "patient");
      const p = mustPatient(d, pid);
      const kind = id.slice(10) as EhrOrder["kind"];
      const itemId = str(values, kind === "med" ? "drug" : kind === "lab" ? "test" : kind === "img" ? "study" : "specialty");
      const item = kind === "med" ? medItem(itemId) : kind === "lab" ? labItem(itemId) : kind === "img" ? imgItem(itemId) : refItem(itemId);
      if (!item) throw new Error(`Unknown ${kind} item "${itemId}"`);
      const details: Record<string, string> = {};
      for (const [k, val] of Object.entries(values)) if (!["patient", "drug", "test", "study", "specialty", "mode", "orderedBy"].includes(k) && val !== "" && val !== undefined) details[k] = String(val);
      const o: EhrOrder = {
        id: nextId((d.orders ?? []).map((x) => x.id), "O"),
        patient: pid,
        kind,
        item: item.id,
        name: item.name,
        details,
        status: "Unsigned",
        mode: str(values, "mode") || "Standard",
        orderedBy: str(values, "orderedBy") || d.session.provider,
        enteredBy: d.session.user,
        date: todayMdy(d),
      };
      d.orders = [...(d.orders ?? []), o];
      const alert = runCds(d, p, o);
      if (alert) {
        o.status = "Alert";
        d.alert = alert;
      } else d.toast = `${o.name} added to Orders to sign.`;
      if (kind === "img" && (IMAGING.find((x) => x.id === item.id)?.auth ?? false)) {
        const cov = coverageOf(p, 1);
        const code = imgItem(item.id)?.code;
        if (code && payerOf(d, cov?.payer)?.authRequired?.includes(code)) d.toast = `${o.name} added. ${payerOf(d, cov?.payer)?.name} requires prior authorization for ${code}.`;
      }
      return { doc: d };
    }
    case "ehr.alert": {
      const al = d.alert;
      if (!al) throw new Error("No alert is open");
      const o = mustOrder(d, al.order);
      const action = str(values, "action");
      if (action === "Cancel this order") {
        o.status = "Canceled";
        d.toast = `${o.name} canceled.`;
      } else if (action === "Override and keep the order") {
        if (!str(values, "reason")) {
          d.toast = "Choose an override reason before you keep an order that triggered an alert.";
          return { doc: d };
        }
        o.status = "Unsigned";
        o.override = str(values, "reason");
        d.toast = "Alert overridden. The reason is saved with the order.";
      } else {
        o.status = "Unsigned";
        d.toast = `${o.name} added to Orders to sign.`;
      }
      if (values.report === true) {
        o.alertReported = true;
        d.toast = `${d.toast} Feedback sent to the CDS committee.`;
      }
      log(d, `CDS alert ${action === "Cancel this order" ? "accepted (order canceled)" : action === "Acknowledge" ? "acknowledged" : "overridden"}`, o.patient, `${al.kind}: ${o.name}`);
      d.alert = null;
      return { doc: d };
    }
    case "ehr.post": {
      const lid = selId(ui, "era");
      const line = (d.remits ?? []).flatMap((r) => r.lines).find((l) => l.id === lid);
      if (!line) throw new Error(`No ERA line ${lid}`);
      if (line.posted) throw new Error(`${lid} is already posted`);
      const payment = Number(normMoney(str(values, "payment")) || 0);
      const adjustment = Number(normMoney(str(values, "adjustment")) || 0);
      const pr = Number(normMoney(str(values, "patientResp")) || 0);
      line.posted = { payment: payment.toFixed(2), adjustment: adjustment.toFixed(2), patientResp: pr.toFixed(2) };
      const p = mustPatient(d, line.patient);
      const payer = payerOf(d, (d.remits ?? []).find((r) => r.lines.includes(line))?.payer)?.name ?? "Insurance";
      if (payment) addLedger(p, { date: todayMdy(d), desc: `Insurance payment, ${payer} (${line.code})`, payment, party: "Insurance" });
      if (adjustment) addLedger(p, { date: todayMdy(d), desc: `Contractual adjustment ${str(values, "adjCode")} (${line.code})`, adjustment });
      if (pr) addLedger(p, { date: todayMdy(d), desc: `Transfer to patient responsibility ${str(values, "prCode")} (${line.code})`, transfer: pr, party: "Patient" });
      const c = d.claims?.find((x) => x.id === line.claim);
      if (c && (d.remits ?? []).flatMap((r) => r.lines).filter((l) => l.claim === c.id).every((l) => l.posted)) {
        c.status = "Closed";
        c.history = [...(c.history ?? []), `${stamp(d)} Payment posted; insurance balance closed`];
      }
      tick(d);
      d.toast = "Remittance line posted to the ledger.";
      return { doc: d };
    }
    case "ehr.denial": {
      const c = mustClaim(d, selId(ui, "claim"));
      if (c.status !== "Denied") throw new Error(`${c.id} is not denied`);
      c.worked = { phase: str(values, "phase"), action: str(values, "action") };
      c.history = [...(c.history ?? []), `${stamp(d)} Denial worked: ${c.worked.action}`];
      tick(d);
      d.toast = `Denial on ${c.id} worked: ${c.worked.action.toLowerCase()}.`;
      return { doc: d };
    }
    case "ehr.report.run": {
      const report = str(values, "report") as EhrReportRun["report"];
      d.report = { report, groupBy: str(values, "groupBy") || "None", period: str(values, "period") || "Today", flagged: [] };
      d.nav.ws = "reports";
      log(d, "Report generated", undefined, `${report} · ${d.report.groupBy} · ${d.report.period}`);
      return { doc: d, ui: { selection: "" } };
    }
    case "ehr.report.export": {
      if (!d.report) throw new Error("No report has been run");
      const rec = { report: d.report.report, format: str(values, "format"), recipient: str(values, "recipient"), deidentify: values.deidentify === true };
      d.exports = [...(d.exports ?? []), rec];
      log(d, `Report exported${rec.deidentify ? " (de-identified)" : ""}`, undefined, `${rec.report} · ${rec.format} · ${rec.recipient}`);
      d.toast = `${rec.report} exported as ${rec.format}${rec.deidentify ? ", de-identified" : ""}.`;
      return { doc: d };
    }
    case "ehr.stmt": {
      const pid = str(values, "patient") || d.nav.chart || "";
      const p = mustPatient(d, pid);
      const amount = Math.max(0, balances(p).patient);
      d.statements = [...(d.statements ?? []), { patient: pid, delivery: str(values, "delivery"), amount, at: stamp(d) }];
      tick(d);
      d.toast = `Statement for ${money(amount)} generated and sent by ${str(values, "delivery").toLowerCase()}.`;
      return { doc: d };
    }
    case "ehr.query": {
      const e = mustEnc(d, str(values, "enc") || d.nav.enc || "");
      e.query = { question: str(values, "question"), answer: e.queryAnswer ?? "Received. I will review the note." };
      tick(d);
      d.toast = "Query sent. The provider's reply is on the encounter.";
      return { doc: d };
    }
  }
  throw new Error(`Unknown dialog "${id}"`);
}

/* ------------------------------------------------------------------ */
/* Schedule helpers                                                    */
/* ------------------------------------------------------------------ */

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function slotConflict(doc: EhrDoc, provider: string, date: string, time: string, minutes: number, ignore?: string): boolean {
  const s = toMin(time);
  const e = s + minutes;
  return (doc.appointments ?? []).some((a) => a.id !== ignore && a.provider === provider && a.date === date && a.status !== "Canceled" && toMin(a.time) < e && toMin(a.time) + a.minutes > s);
}

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */

export function applyEhr(doc: EhrDoc, c: SimCommit, ui: SimUi): Out {
  const d = clone(doc);
  d.toast = null;
  if (c.kind === "type") {
    applyType(d, c.target, c.value);
    return { doc: d };
  }
  if (c.kind === "command") return applyCommand(d, c.id, c.value, ui);
  if (c.kind === "dialog") return applyDialog(d, c.id, c.values, ui);
  return { doc };
}

/* ------------------------------------------------------------------ */
/* Selections                                                          */
/* ------------------------------------------------------------------ */

export function ehrSelectionExists(doc: EhrDoc, sel: string): boolean {
  if (!sel) return true;
  const i = sel.indexOf(":");
  if (i > 0) {
    const kind = sel.slice(0, i);
    const rest = sel.slice(i + 1);
    switch (kind) {
      case "pt": return Boolean(patientOf(doc, rest));
      case "appt": return Boolean(findAppt(doc, rest));
      case "slot": {
        const s = parseSlot(sel);
        return Boolean(s && providerOf(doc, s.provider) && !slotConflict(doc, s.provider, s.date, s.time, 15));
      }
      case "order": return Boolean(doc.orders?.some((o) => o.id === rest));
      case "dx": {
        const [e, code] = splitVal(rest);
        return Boolean(doc.encounters?.find((x) => x.id === e)?.dx.includes(code));
      }
      case "chg": {
        const [e, l] = splitVal(rest);
        return Boolean(doc.encounters?.find((x) => x.id === e)?.lines.some((x) => x.id === l));
      }
      case "claim": return Boolean(doc.claims?.some((c) => c.id === rest));
      case "cl": {
        const [c, l] = splitVal(rest);
        return Boolean(doc.claims?.find((x) => x.id === c)?.lines.some((x) => x.id === l));
      }
      case "cdx": {
        const [c, code] = splitVal(rest);
        return Boolean(doc.claims?.find((x) => x.id === c)?.dx.includes(code));
      }
      case "era": return Boolean(doc.remits?.some((r) => r.lines.some((l) => l.id === rest)));
      case "audit": return doc.audit.some((a) => a.id === rest);
      case "row": return Boolean(doc.report && runReport(doc, doc.report).rows.some((r) => r.key === rest));
    }
    return false;
  }
  // Type targets
  const [id, ...rest] = sel.split(".");
  const p = patientOf(doc, id);
  if (p) {
    if (rest.length === 1) return PATIENT_FIELDS.includes(rest[0]);
    if (rest[0] === "guarantor") return GUAR_FIELDS.includes(rest[1]);
    const m = /^ins([12])$/.exec(rest[0] ?? "");
    return Boolean(m && coverageOf(p, Number(m[1])) && COV_FIELDS.includes(rest[1]));
  }
  if (findAppt(doc, id)) return ["reason", "auth", "room"].includes(rest[0]);
  if (doc.auths?.some((a) => a.id === id)) return ["cpt", "icd", "npi", "units", "notes"].includes(rest[0]);
  const e = doc.encounters?.find((x) => x.id === id);
  if (e) return e.lines.some((l) => l.id === rest[0]) && LINE_FIELDS.includes(rest[1]);
  const c = doc.claims?.find((x) => x.id === id);
  if (c) {
    if (rest.length === 1) return ["memberId", "group", "auth", "relationship", "insured"].includes(rest[0]);
    if (rest[0] === "dx") return LETTERS.indexOf(rest[1]) >= 0 && LETTERS.indexOf(rest[1]) <= c.dx.length;
    return c.lines.some((l) => l.id === rest[0]) && LINE_FIELDS.includes(rest[1]);
  }
  return false;
}

export function describeEhrSelection(doc: EhrDoc, sel: string): string {
  if (sel.startsWith("appt:")) {
    const a = findAppt(doc, sel.slice(5));
    return a ? `${listName(patientOf(doc, a.patient))} · ${a.time}` : sel;
  }
  if (sel.startsWith("pt:")) return listName(patientOf(doc, sel.slice(3)));
  return sel;
}
