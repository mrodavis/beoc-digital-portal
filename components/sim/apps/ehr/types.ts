/**
 * Northstar EHR practice engine: the document a sim starts from.
 *
 * One document holds the whole practice a sim needs: the signed-in user,
 * which workspaces exist (left rail), patients with registration and
 * insurance, the appointment book, preauthorization requests, encounters with
 * diagnoses and charge lines, orders, claims, remittances, report data and
 * the audit log. Everything is plain JSON so a SimDefinition can carry it.
 *
 * Ids are unique across the document and use a prefix per record type:
 * patients P1, visits (appointments) V1, preauth requests PA1, encounters E1,
 * claims C1, orders O1, remittances R1 with lines RL1, documents D1, audit
 * entries L1, providers PRV1, payers PAY1.
 *
 * Selection keys (ui.selection), set by clicking a row, card or slot:
 *   pt:P1                        a patient row in Patient Search
 *   appt:V1                      an appointment on the schedule or a tracker card
 *   slot:PRV1@2026-10-21T10:30   an open slot in the appointment book
 *   order:O1                     an order in the chart's Orders list
 *   dx:E1:S93.402A               a diagnosis on an encounter
 *   chg:E1:L1                    a charge line on an encounter
 *   claim:C1                     a claim in the Claims work queue
 *   cl:C1:L1                     a service line (Box 24) on a claim
 *   cdx:C1:E10.9                 a diagnosis in Box 21 of a claim
 *   era:RL1                      a remittance (ERA) line
 *   audit:L1                     an audit log entry
 *   row:<key>                    a row of the last report run
 *
 * Type targets ("<record>.<field>"), committed with Enter or by leaving the field:
 *   P1.phone, P1.street, P1.dob ...              demographics
 *   P1.guarantor.name | relationship | dob | phone
 *   P1.ins1.payer | plan | subscriber | subscriberDob | relationship | memberId | group | effective | copay
 *   P1.ins2.*                                   secondary coverage (after "Add secondary coverage")
 *   V1.reason, V1.auth, V1.room                  appointment
 *   PA1.cpt | icd | npi | units | notes          preauthorization request
 *   E1.L1.code | mod1 | mod2 | ptr | units       encounter charge line
 *   C1.memberId | group | auth | dx.A ... dx.L | L1.code | L1.mod1 | L1.mod2 | L1.ptr | L1.units   claim (CMS-1500)
 *
 * Commands that act on the open record carry its id in the value
 * ("P1:npp", "E1:S93.402A", "C1"); commands that act on a selected row use
 * requires.selection. See core.ts for the full list.
 */

export type EhrWorkspace = "search" | "chart" | "schedule" | "tracker" | "preauth" | "encoder" | "charges" | "claims" | "reports" | "audit";
export type EhrChartTab = "facesheet" | "registration" | "orders" | "documents" | "ledger";

export type EhrProvider = {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  npi: string;
};

export type EhrPayer = {
  id: string;
  name: string;
  kind?: "Commercial" | "Medicare" | "Medicaid";
  /** Codes this payer requires prior authorization for. */
  authRequired?: string[];
  /** Codes this payer wants a laterality modifier on (LT, RT or 50). */
  laterality?: string[];
  /** Timely filing limit in days. */
  filingDays?: number;
  claimsAddress?: string;
  phone?: string;
  color?: string;
};

export type EhrEligibility = {
  status: "Active" | "Inactive";
  /** What the payer has on file; a mismatch with the registration returns "subscriber not found". */
  memberId?: string;
  dob?: string;
  plan?: string;
  effective?: string;
  termed?: string;
  copay?: string;
  specialist?: string;
  deductible?: string;
  deductibleMet?: string;
  coinsurance?: string;
  /** Extra benefit lines, e.g. "Prior authorization required for advanced imaging (MRI, CT, PET)". */
  notes?: string[];
};

export type EhrCoverage = {
  priority: 1 | 2;
  payer: string;
  plan?: string;
  subscriber?: string;
  subscriberDob?: string;
  relationship?: string;
  memberId?: string;
  group?: string;
  effective?: string;
  copay?: string;
  /** What is printed on the patient's card (the scanned image). Defaults to the payer's record. */
  card?: { name?: string; memberId?: string; group?: string; plan?: string; copays?: string[] };
  /** The payer's side of the 270/271 exchange. */
  elig?: EhrEligibility;
  eligResult?: { at: string; ok: boolean; lines: string[] } | null;
};

export type EhrAllergy = { substance: string; reaction?: string; severity?: string; cls?: string };
export type EhrMed = { id: string; name: string; sig: string; drug?: string; status?: "Active" | "Discontinued" };
export type EhrDocument = { id: string; date: string; type: string; title: string; summary?: string };

export type EhrLedgerRow = {
  date: string;
  desc: string;
  charge?: number;
  payment?: number;
  adjustment?: number;
  /** Moves an amount from insurance responsibility to the patient. */
  transfer?: number;
  /** Who paid or owes: "Insurance" | "Patient". */
  party?: string;
};

export type EhrPatient = {
  id: string;
  mrn: string;
  last: string;
  first: string;
  middle?: string;
  dob: string;
  sex: string;
  phone?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  language?: string;
  pcp?: string;
  /** "Employee", "VIP" or "Confidential": opening the chart asks for a break-the-glass reason. */
  restricted?: string;
  allergies?: EhrAllergy[];
  /** ICD-10-CM codes on the problem list. */
  problems?: string[];
  meds?: EhrMed[];
  coverage?: EhrCoverage[];
  guarantor?: { name?: string; relationship?: string; dob?: string; phone?: string };
  signatures?: { npp?: string | null; aob?: string | null; fin?: string | null };
  documents?: EhrDocument[];
  ledger?: EhrLedgerRow[];
  lastVisit?: string;
};

export type EhrApptStatus = "Scheduled" | "Confirmed" | "Arrived" | "Roomed" | "With provider" | "Checkout" | "Departed" | "No show" | "Canceled";

export type EhrAppt = {
  id: string;
  patient: string;
  provider: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM, 24-hour */
  time: string;
  minutes: number;
  type: string;
  reason?: string;
  status: EhrApptStatus;
  room?: string;
  copay?: string;
  method?: string;
  followUp?: string;
  referral?: string;
  /** Authorization number recorded on the visit. */
  auth?: string;
  /** Clock time the visit entered its current status, for the tracker. */
  since?: string;
};

export type EhrAuthRule = {
  /** The request is approved when the codes match one of these and the notes mention every keyword. */
  cpt: string[];
  icd: string[];
  notesAll?: string[];
  number: string;
  validFrom: string;
  validTo: string;
  /** Shown when the diagnosis does not match. */
  pendIcd?: string;
  /** Shown when the clinical notes leave out a required fact. */
  pendNotes?: string;
};

export type EhrAuthRequest = {
  id: string;
  patient: string;
  /** The visit the service is booked on. */
  visit?: string;
  payer: string;
  provider: string;
  service: string;
  /** The provider's order and the supporting documentation, as the requester sees it. */
  orderText: string;
  serviceDate: string;
  status: "Needed" | "Submitted" | "Approved" | "Pended" | "Denied";
  cpt?: string;
  icd?: string;
  npi?: string;
  units?: string;
  notes?: string;
  rule: EhrAuthRule;
  responses?: { at: string; status: string; lines: string[] }[];
};

export type EhrLine = {
  id: string;
  code: string;
  mod1?: string;
  mod2?: string;
  ptr?: string;
  units: number;
  fee: number;
};

export type EhrEncounter = {
  id: string;
  patient: string;
  provider: string;
  /** MM/DD/YYYY */
  date: string;
  pos?: string;
  /** What the provider documented, shown beside the coding work. */
  note: string;
  dx: string[];
  lines: EhrLine[];
  status: "Open" | "Billed";
  claim?: string;
  /** Common codes on the practice's superbill form. */
  superbill?: string[];
  /** The visit this encounter belongs to (its authorization number goes to Box 23). */
  visit?: string;
  /** The provider's canned reply to a coding query. */
  queryAnswer?: string;
  /** What the payer does with the claim made from this encounter (copied to the claim). */
  outcome?: EhrClaim["outcome"];
  query?: { question: string; answer: string } | null;
};

export type EhrOrderKind = "med" | "lab" | "img" | "ref";
export type EhrOrderStatus = "Unsigned" | "Alert" | "Signed" | "Pending cosign" | "In progress" | "Resulted" | "Canceled";

export type EhrOrder = {
  id: string;
  patient: string;
  kind: EhrOrderKind;
  item: string;
  name: string;
  details: Record<string, string>;
  status: EhrOrderStatus;
  mode?: string;
  orderedBy?: string;
  enteredBy?: string;
  /** MM/DD/YYYY */
  date: string;
  result?: string;
  flag?: string;
  followUp?: boolean;
  ack?: boolean;
  override?: string;
  alertReported?: boolean;
};

export type EhrAlert = {
  order: string;
  severity: "Major" | "Moderate" | "Informational";
  kind: string;
  title: string;
  detail: string;
};

export type EhrClaimStatus = "Draft" | "Submitted" | "Paid" | "Denied" | "Closed";

export type EhrClaim = {
  id: string;
  patient: string;
  enc?: string;
  payer: string;
  provider: string;
  /** MM/DD/YYYY */
  dos: string;
  pos?: string;
  memberId: string;
  group?: string;
  insured?: string;
  relationship?: string;
  /** Box 23 */
  auth?: string;
  dx: string[];
  lines: EhrLine[];
  status: EhrClaimStatus;
  /** Days since the date of service (timely filing). */
  age?: number;
  carc?: string;
  denial?: string;
  worked?: { phase: string; action: string };
  /** What the payer does when the claim is submitted (canned adjudication). */
  outcome?: {
    status: "Paid" | "Denied";
    carc?: string;
    denial?: string;
    lines?: Record<string, { allowed: number; paid: number; pr?: number; prCode?: string }>;
  };
  history?: string[];
};

export type EhrRemitLine = {
  id: string;
  claim: string;
  patient: string;
  code: string;
  dos: string;
  billed: number;
  allowed: number;
  paid: number;
  adj: number;
  adjCode: string;
  pr: number;
  prCode?: string;
  carc?: string;
  posted?: { payment: string; adjustment: string; patientResp: string } | null;
};

export type EhrRemit = { id: string; payer: string; date: string; trace: string; lines: EhrRemitLine[] };

export type EhrAuditEntry = {
  id: string;
  at: string;
  user: string;
  role?: string;
  patient?: string;
  action: string;
  detail?: string;
  workstation?: string;
  flagged?: boolean;
};

export type EhrReportName = "Patient tracking" | "No-shows" | "A/R aging" | "Denials" | "Diabetes care gaps";

export type EhrReportData = {
  noShows?: { patient: string; date: string; provider: string; type: string }[];
  /** One row per payer with dollars in each aging bucket. */
  arAging?: { payer: string; b0: number; b31: number; b61: number; b91: number }[];
  denials?: { claim: string; patient: string; payer: string; carc: string; reason: string; amount: number; date: string }[];
  quality?: { patient: string; mrn: string; dob: string; provider: string; lastA1c: string; value: string; gap: boolean }[];
  /** Totals the report summaries use: avgDailyCharges, claimsSubmitted, firstPassAccepted. */
  metrics?: Record<string, number>;
};

export type EhrReportRun = {
  report: EhrReportName;
  groupBy: string;
  period: string;
  sort?: string;
  flagged?: string[];
};

export type EhrDoc = {
  facility: string;
  department: string;
  /** YYYY-MM-DD */
  today: string;
  /** Clock time for the audit log, HH:MM. Advances one minute per logged action. */
  clock: string;
  session: {
    user: string;
    name: string;
    role: string;
    signedIn: boolean;
    locked?: boolean;
    /** The provider record the user is, when the user is a provider. */
    provider?: string;
  };
  /**
   * Compliance mode: opening any chart is judged (command "ehr.access.open")
   * instead of being free navigation (command "ehr.chart.open").
   */
  judgeAccess?: boolean;
  workspaces: EhrWorkspace[];
  chartTabs?: EhrChartTab[];
  nav: {
    ws: EhrWorkspace;
    chart?: string | null;
    tab?: EhrChartTab;
    /** Sub-view inside a workspace or chart tab, e.g. "insurance", "era", "tabular". */
    sub?: string;
    /** Schedule day, YYYY-MM-DD. */
    day?: string;
    enc?: string;
    claim?: string;
    auth?: string;
  };
  providers: EhrProvider[];
  payers: EhrPayer[];
  patients: EhrPatient[];
  appointments?: EhrAppt[];
  auths?: EhrAuthRequest[];
  encounters?: EhrEncounter[];
  orders?: EhrOrder[];
  alert?: EhrAlert | null;
  claims?: EhrClaim[];
  remits?: EhrRemit[];
  /** The payers' eligibility databases, for coverage added during a sim (matched by payer and member ID). */
  eligRecords?: (EhrEligibility & { payer: string })[];
  /** Practice fee schedule overrides, code → dollars. */
  fees?: Record<string, number>;
  reportData?: EhrReportData;
  report?: EhrReportRun | null;
  exports?: { report: string; format: string; recipient: string; deidentify: boolean }[];
  audit: EhrAuditEntry[];
  /** Break-the-glass access granted this session: patient id → reason. */
  btg?: Record<string, string>;
  incidents?: { category: string; detail: string; at: string }[];
  roi?: { patient: string; requester: string; decision: string; docs: string; format: string; at: string }[];
  statements?: { patient: string; delivery: string; amount: number; at: string }[];
  /** Short confirmation shown after the last action. */
  toast?: string | null;
};

/** Type-checks a sim's starting document: `initial: ehrDoc({ ... })`. */
export const ehrDoc = (d: EhrDoc) => d as unknown as Record<string, unknown>;
