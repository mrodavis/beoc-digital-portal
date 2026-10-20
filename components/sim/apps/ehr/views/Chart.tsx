"use client";

import { useState } from "react";
import type { EhrChartTab, EhrCoverage, EhrPatient } from "../types";
import { icdTitle } from "../codes";
import { fmtDate, fmtTime } from "../forms";
import { ageOf, balances, coverageOf, money, patientOf, payerOf, providerOf } from "../model";
import { Badge, Btn, EField, Empty, ESelect, Icon, Modal, Panel, Row, Table, Td, useEhr } from "../ui";
import { OrdersTab } from "./Orders";

const TAB_LABEL: Record<EhrChartTab, string> = {
  facesheet: "Face Sheet",
  registration: "Registration",
  orders: "Orders",
  documents: "Documents",
  ledger: "Account",
};

export function PatientHeader() {
  const { doc, cmd } = useEhr();
  const p = patientOf(doc, doc.nav.chart);
  if (!p) return null;
  const cov = coverageOf(p, 1);
  const pcp = providerOf(doc, p.pcp);
  const allergies = p.allergies ?? [];
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-b border-slate-900 bg-slate-700 px-3 py-1.5 text-white">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-500 text-slate-100">
          <Icon name="user" size={18} />
        </span>
        <div className="leading-tight">
          <div className="text-[14px] font-bold">
            {p.last}, {p.first}
            {p.middle ? ` ${p.middle[0]}.` : ""}
          </div>
          <div className="text-[11px] text-slate-300">
            {p.sex} · {ageOf(p.dob, doc.today)} y · DOB {p.dob} · MRN {p.mrn}
          </div>
        </div>
      </div>
      <div className="text-[11px] leading-tight text-slate-300">
        <div>
          PCP <span className="text-white">{pcp ? `${pcp.name}, ${pcp.credentials}` : "None"}</span>
        </div>
        <div>
          Coverage <span className="text-white">{cov ? payerOf(doc, cov.payer)?.name ?? "Not entered" : "Self-pay"}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {allergies.length ? (
          <span className="rounded-[3px] bg-rose-600 px-1.5 py-0.5 text-[11px] font-bold">Allergies: {allergies.map((a) => a.substance).join(", ")}</span>
        ) : (
          <span className="rounded-[3px] bg-slate-600 px-1.5 py-0.5 text-[11px]">No known allergies</span>
        )}
        {p.restricted && (
          <span className="flex items-center gap-1 rounded-[3px] bg-amber-500 px-1.5 py-0.5 text-[11px] font-bold text-slate-900">
            <Icon name="lock" size={12} /> Restricted: {p.restricted}
          </span>
        )}
      </div>
      <div className="flex-1" />
      <button type="button" onClick={() => cmd("ehr.chart.close")} aria-label="Close chart" title="Close chart" className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-slate-200 hover:bg-white/10">
        <Icon name="x" size={14} /> Close chart
      </button>
    </div>
  );
}

export function ChartView() {
  const { doc, cmd } = useEhr();
  const p = patientOf(doc, doc.nav.chart);
  const tabs = doc.chartTabs ?? ["facesheet", "registration"];
  const tab = doc.nav.tab && tabs.includes(doc.nav.tab) ? doc.nav.tab : tabs[0];
  if (!p) return <Empty>No chart is open.</Empty>;
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PatientHeader />
      <div role="tablist" aria-label="Chart sections" className="flex shrink-0 gap-0.5 border-b border-slate-300 bg-slate-200 px-2 pt-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={t === tab}
            onClick={() => cmd("ehr.chart.tab", t)}
            className={`rounded-t-[3px] border border-b-0 px-3 py-1 text-[12px] font-semibold ${t === tab ? "border-slate-300 bg-slate-100 text-slate-900" : "border-transparent text-slate-600 hover:bg-slate-100/70"}`}
          >
            {TAB_LABEL[t]}
          </button>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-auto">
        {tab === "facesheet" && <FaceSheet p={p} />}
        {tab === "registration" && <Registration p={p} />}
        {tab === "orders" && <OrdersTab p={p} />}
        {tab === "documents" && <Documents p={p} />}
        {tab === "ledger" && <Ledger p={p} />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Face sheet                                                          */
/* ------------------------------------------------------------------ */

function FaceSheet({ p }: { p: EhrPatient }) {
  const { doc } = useEhr();
  const appts = (doc.appointments ?? []).filter((a) => a.patient === p.id && a.date >= doc.today && a.status !== "Canceled");
  const sig = p.signatures ?? {};
  return (
    <div className="grid gap-2 p-3 md:grid-cols-2 xl:grid-cols-3">
      <Panel title="Demographics">
        <dl className="grid grid-cols-[96px_1fr] gap-x-2 gap-y-0.5 text-[12px]">
          <dt className="text-slate-500">Legal name</dt>
          <dd className="font-semibold">
            {p.first} {p.middle ? `${p.middle} ` : ""}
            {p.last}
          </dd>
          <dt className="text-slate-500">DOB / Sex</dt>
          <dd>
            {p.dob} · {p.sex}
          </dd>
          <dt className="text-slate-500">Address</dt>
          <dd>{[p.street, [p.city, p.state].filter(Boolean).join(", "), p.zip].filter(Boolean).join(" ") || "None"}</dd>
          <dt className="text-slate-500">Phone</dt>
          <dd>{p.phone ?? "None"}</dd>
          <dt className="text-slate-500">Language</dt>
          <dd>{p.language ?? "English"}</dd>
        </dl>
      </Panel>
      <Panel title="Insurance">
        {(p.coverage ?? []).length === 0 && <span className="text-[12px] text-slate-500">Self-pay</span>}
        {(p.coverage ?? [])
          .slice()
          .sort((a, b) => a.priority - b.priority)
          .map((c) => (
            <div key={c.priority} className="mb-1.5 text-[12px] last:mb-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">{c.priority === 1 ? "Primary" : "Secondary"}:</span> {payerOf(doc, c.payer)?.name ?? "Not entered"}
                {c.eligResult && <Badge tone={c.eligResult.ok ? "green" : "red"}>{c.eligResult.ok ? "Verified" : "Not verified"}</Badge>}
              </div>
              <div className="text-slate-600">
                Member ID <span className="font-mono">{c.memberId || "None"}</span> · Group {c.group || "None"}
              </div>
            </div>
          ))}
      </Panel>
      <Panel title="Allergies">
        {(p.allergies ?? []).length === 0 ? (
          <span className="text-[12px] text-slate-600">No known allergies</span>
        ) : (
          <ul className="space-y-0.5 text-[12px]">
            {(p.allergies ?? []).map((a) => (
              <li key={a.substance}>
                <span className="font-semibold text-rose-700">{a.substance}</span>
                {a.reaction ? ` · ${a.reaction}` : ""}
                {a.severity ? ` (${a.severity})` : ""}
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Problem list">
        {(p.problems ?? []).length === 0 ? (
          <span className="text-[12px] text-slate-500">None recorded</span>
        ) : (
          <ul className="space-y-0.5 text-[12px]">
            {(p.problems ?? []).map((c) => (
              <li key={c}>
                <span className="font-mono font-semibold">{c}</span> {icdTitle(c)}
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Medications">
        {(p.meds ?? []).filter((m) => m.status !== "Discontinued").length === 0 ? (
          <span className="text-[12px] text-slate-500">None</span>
        ) : (
          <ul className="space-y-0.5 text-[12px]">
            {(p.meds ?? [])
              .filter((m) => m.status !== "Discontinued")
              .map((m) => (
                <li key={m.id}>
                  <span className="font-semibold">{m.name}</span> · {m.sig}
                </li>
              ))}
          </ul>
        )}
      </Panel>
      <Panel title="Signatures on file">
        <ul className="space-y-0.5 text-[12px]">
          {SIG_FORMS.map((f) => (
            <li key={f.key} className="flex items-center justify-between gap-2">
              <span>{f.short}</span>
              {sig[f.key] ? <Badge tone="green">On file {sig[f.key]}</Badge> : <Badge tone="red">Missing</Badge>}
            </li>
          ))}
        </ul>
      </Panel>
      {appts.length > 0 && (
        <Panel title="Upcoming visits" className="md:col-span-2 xl:col-span-3">
          <ul className="space-y-0.5 text-[12px]">
            {appts.map((a) => {
              const pr = providerOf(doc, a.provider);
              return (
                <li key={a.id}>
                  {fmtDate(a.date)} {fmtTime(a.time)} · {a.type} with {pr ? `${pr.name}, ${pr.credentials}` : a.provider} · <Badge>{a.status}</Badge>
                </li>
              );
            })}
          </ul>
        </Panel>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Registration                                                        */
/* ------------------------------------------------------------------ */

const SUBS = [
  { id: "demographics", label: "Demographics" },
  { id: "guarantor", label: "Guarantor" },
  { id: "insurance", label: "Insurance" },
  { id: "signatures", label: "Signatures" },
];

const SEX = ["Female", "Male", "X", "Unknown"].map((value) => ({ value }));
const STATES = ["NY", "NJ", "CT", "PA", "MA"].map((value) => ({ value }));
const LANGS = ["English", "Spanish", "Haitian Creole", "Russian", "Chinese (Mandarin)", "Bengali", "Arabic", "Other"].map((value) => ({ value }));
const REL = ["Self", "Spouse", "Child", "Other"].map((value) => ({ value }));
const GUAR_REL = ["Self", "Spouse", "Parent", "Legal guardian", "Other"].map((value) => ({ value }));

export const SIG_FORMS = [
  { key: "npp" as const, short: "HIPAA privacy notice acknowledgment", label: "Notice of Privacy Practices acknowledgment (HIPAA)", text: "I acknowledge that I received Northstar Medical Center's Notice of Privacy Practices, which describes how my health information may be used and disclosed and my rights to it." },
  { key: "aob" as const, short: "Assignment of benefits", label: "Assignment of benefits", text: "I authorize my insurance benefits to be paid directly to Northstar Medical Center for services I receive, and I authorize release of the information needed to process my claims." },
  { key: "fin" as const, short: "Financial responsibility", label: "Financial responsibility agreement", text: "I understand I am responsible for copays, deductibles, coinsurance and any services my plan does not cover." },
];

function Registration({ p }: { p: EhrPatient }) {
  const { doc, cmd } = useEhr();
  const sub = doc.nav.sub && SUBS.some((s) => s.id === doc.nav.sub) ? doc.nav.sub : "demographics";
  return (
    <div className="flex min-h-0 flex-1">
      <nav aria-label="Registration sections" className="w-36 shrink-0 border-r border-slate-300 bg-white py-2">
        {SUBS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-current={s.id === sub ? "page" : undefined}
            onClick={() => cmd("ehr.chart.tab", `registration:${s.id}`)}
            className={`block w-full border-l-[3px] px-3 py-1.5 text-left text-[12.5px] ${s.id === sub ? "border-sky-700 bg-sky-50 font-semibold text-sky-900" : "border-transparent text-slate-700 hover:bg-slate-50"}`}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <div className="min-w-0 flex-1 overflow-auto p-3">
        {sub === "demographics" && <Demographics p={p} />}
        {sub === "guarantor" && <Guarantor p={p} />}
        {sub === "insurance" && <Insurance p={p} />}
        {sub === "signatures" && <Signatures p={p} />}
      </div>
    </div>
  );
}

function Demographics({ p }: { p: EhrPatient }) {
  return (
    <Panel title="Demographics">
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        <EField target={`${p.id}.last`} value={p.last} label="Last name" required />
        <EField target={`${p.id}.first`} value={p.first} label="First name" required />
        <EField target={`${p.id}.middle`} value={p.middle} label="Middle" />
        <EField target={`${p.id}.dob`} value={p.dob} label="Date of birth" required placeholder="MM/DD/YYYY" />
        <ESelect target={`${p.id}.sex`} value={p.sex} options={SEX} label="Legal sex" required />
        <EField target={`${p.id}.phone`} value={p.phone} label="Mobile phone" />
        <EField target={`${p.id}.email`} value={p.email} label="Email" className="md:col-span-2" />
        <EField target={`${p.id}.street`} value={p.street} label="Street address" className="col-span-2" />
        <EField target={`${p.id}.city`} value={p.city} label="City" />
        <div className="grid grid-cols-2 gap-2">
          <ESelect target={`${p.id}.state`} value={p.state} options={STATES} label="State" />
          <EField target={`${p.id}.zip`} value={p.zip} label="ZIP" />
        </div>
        <ESelect target={`${p.id}.language`} value={p.language ?? "English"} options={LANGS} label="Preferred language" />
      </div>
      <p className="mt-2.5 text-[11px] text-slate-500">Verify the legal name and date of birth against a photo ID. Changes save when you press Enter or leave the field.</p>
    </Panel>
  );
}

function Guarantor({ p }: { p: EhrPatient }) {
  const { cmd } = useEhr();
  const g = p.guarantor ?? {};
  return (
    <Panel title="Guarantor (financially responsible party)" right={<Btn small onClick={() => cmd("ehr.guar.self", p.id)}>Same as patient</Btn>}>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        <EField target={`${p.id}.guarantor.name`} value={g.name} label="Name (last, first)" className="col-span-2" />
        <ESelect target={`${p.id}.guarantor.relationship`} value={g.relationship} options={GUAR_REL} label="Relationship to patient" />
        <EField target={`${p.id}.guarantor.dob`} value={g.dob} label="Date of birth" placeholder="MM/DD/YYYY" />
        <EField target={`${p.id}.guarantor.phone`} value={g.phone} label="Phone" />
      </div>
    </Panel>
  );
}

function Insurance({ p }: { p: EhrPatient }) {
  const { cmd } = useEhr();
  const covs = (p.coverage ?? []).slice().sort((a, b) => a.priority - b.priority);
  return (
    <div className="flex flex-col gap-2">
      {covs.map((c) => (
        <CoveragePanel key={c.priority} p={p} c={c} />
      ))}
      {!coverageOf(p, 2) && (
        <div>
          <Btn icon="plus" onClick={() => cmd("ehr.cov.add", `${p.id}:2`)}>
            Add secondary coverage
          </Btn>
        </div>
      )}
      {covs.length === 0 && <Empty>No coverage on file. The patient is self-pay.</Empty>}
    </div>
  );
}

function CoveragePanel({ p, c }: { p: EhrPatient; c: EhrCoverage }) {
  const { doc, cmd } = useEhr();
  const [card, setCard] = useState(false);
  const k = `${p.id}.ins${c.priority}`;
  const payers = doc.payers.map((x) => ({ value: x.id, label: x.name }));
  return (
    <Panel
      title={`${c.priority === 1 ? "Primary" : "Secondary"} coverage`}
      right={
        <>
          {c.eligResult && <Badge tone={c.eligResult.ok ? "green" : "red"}>{c.eligResult.ok ? `Verified ${c.eligResult.at}` : "Not verified"}</Badge>}
          {(c.card || c.elig) && (
            <Btn small icon="card" onClick={() => setCard((v) => !v)}>
              {card ? "Hide card" : "View card"}
            </Btn>
          )}
          <Btn small tone="primary" icon="check" onClick={() => cmd("ehr.elig.check", `${p.id}:${c.priority}`)}>
            Verify eligibility
          </Btn>
        </>
      }
    >
      <div className="flex flex-wrap gap-3">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2.5 md:grid-cols-3">
          <ESelect target={`${k}.payer`} value={c.payer} options={payers} label="Payer" required className="col-span-2 md:col-span-1" />
          <EField target={`${k}.plan`} value={c.plan} label="Plan" />
          <EField target={`${k}.memberId`} value={c.memberId} label="Member ID" required mono />
          <EField target={`${k}.group`} value={c.group} label="Group number" mono />
          <EField target={`${k}.subscriber`} value={c.subscriber} label="Subscriber (last, first)" />
          <EField target={`${k}.subscriberDob`} value={c.subscriberDob} label="Subscriber DOB" placeholder="MM/DD/YYYY" />
          <ESelect target={`${k}.relationship`} value={c.relationship} options={REL} label="Patient's relationship to subscriber" required />
          <EField target={`${k}.effective`} value={c.effective} label="Effective date" placeholder="MM/DD/YYYY" />
          <EField target={`${k}.copay`} value={c.copay} label="Office visit copay ($)" mono />
        </div>
        {card && <InsuranceCard p={p} c={c} />}
      </div>
      {c.eligResult && (
        <div className={`mt-2.5 rounded-[3px] border px-2.5 py-2 font-mono text-[11.5px] leading-relaxed ${c.eligResult.ok ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-rose-300 bg-rose-50 text-rose-950"}`} aria-label="Eligibility response">
          {c.eligResult.lines.map((l, i) => (
            <div key={i} className={i === 0 ? "mb-0.5 font-sans text-[10.5px] font-semibold uppercase tracking-wide opacity-70" : ""}>
              {l}
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

function InsuranceCard({ p, c }: { p: EhrPatient; c: EhrCoverage }) {
  const { doc } = useEhr();
  const [side, setSide] = useState<"front" | "back">("front");
  const payer = payerOf(doc, c.payer);
  const color = payer?.color ?? "#1e3a8a";
  const memberId = c.card?.memberId ?? c.elig?.memberId ?? c.memberId;
  const name = c.card?.name ?? (c.subscriber || `${p.last}, ${p.first}`);
  const copays = c.card?.copays ?? [c.elig?.copay ? `PCP $${c.elig.copay}` : "", c.elig?.specialist ? `Specialist $${c.elig.specialist}` : ""].filter(Boolean);
  return (
    <figure className="w-[300px] shrink-0" aria-label="Scanned insurance card">
      <div className="mb-1 flex items-center justify-between">
        <figcaption className="text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">Scanned card ({side})</figcaption>
        <div className="flex gap-1">
          <Btn small onClick={() => setSide("front")} disabled={side === "front"}>
            Front
          </Btn>
          <Btn small onClick={() => setSide("back")} disabled={side === "back"}>
            Back
          </Btn>
        </div>
      </div>
      {side === "front" ? (
        <div className="relative h-[180px] overflow-hidden rounded-[10px] border border-slate-300 bg-gradient-to-br from-white to-slate-100 shadow-md" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="flex items-center justify-between px-3 py-1.5 text-white" style={{ background: color }}>
            <span className="text-[12px] font-bold tracking-tight">{payer?.name ?? "Health plan"}</span>
            <span className="text-[10px] opacity-90">{c.card?.plan ?? c.elig?.plan ?? c.plan}</span>
          </div>
          <div className="space-y-1 px-3 pt-2 text-[10px] text-slate-700">
            <div>
              <div className="uppercase text-slate-500">Member</div>
              <div className="text-[12.5px] font-bold uppercase text-slate-900">{name}</div>
            </div>
            <div className="flex gap-6">
              <div>
                <div className="uppercase text-slate-500">Member ID</div>
                <div className="font-mono text-[12.5px] font-bold text-slate-900">{memberId}</div>
              </div>
              <div>
                <div className="uppercase text-slate-500">Group</div>
                <div className="font-mono text-[12.5px] font-bold text-slate-900">{c.card?.group ?? c.group}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-3 text-[10.5px] font-semibold text-slate-800">{copays.map((x) => <span key={x}>{x}</span>)}</div>
          </div>
          <div className="absolute bottom-1.5 right-3 text-[8.5px] text-slate-400">TRAINING CARD · NOT VALID FOR COVERAGE</div>
        </div>
      ) : (
        <div className="h-[180px] overflow-hidden rounded-[10px] border border-slate-300 bg-white px-3 py-2 text-[10px] leading-snug text-slate-700 shadow-md" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="mb-1 h-5 bg-slate-800" />
          <div className="font-bold text-slate-900">Providers: send claims to</div>
          <div>{payer?.claimsAddress ?? "Claims address on file with the payer"}</div>
          <div className="mt-1 font-bold text-slate-900">Provider services</div>
          <div>{payer?.phone ?? "(800) 555-0100"}</div>
          <div className="mt-1">Show this card at every visit. Possession of this card does not guarantee eligibility or payment.</div>
        </div>
      )}
    </figure>
  );
}

function Signatures({ p }: { p: EhrPatient }) {
  const { cmd } = useEhr();
  const [pad, setPad] = useState<(typeof SIG_FORMS)[number] | null>(null);
  const [signed, setSigned] = useState(false);
  const sig = p.signatures ?? {};
  return (
    <Panel title="Signatures on file" bodyClass="p-0">
      <Table head={["Form", "Status", "Signed", ""]}>
        {SIG_FORMS.map((f) => (
          <Row key={f.key} label={f.label}>
            <Td className="font-semibold">{f.label}</Td>
            <Td>{sig[f.key] ? <Badge tone="green">On file</Badge> : <Badge tone="red">Missing</Badge>}</Td>
            <Td>{sig[f.key] ?? ""}</Td>
            <Td className="text-right">
              <Btn
                small
                icon="pen"
                onClick={() => {
                  setSigned(false);
                  setPad(f);
                }}
              >
                Capture signature
              </Btn>
            </Td>
          </Row>
        ))}
      </Table>
      {pad && (
        <Modal
          title={pad.label}
          subtitle={`${p.first} ${p.last} · signature pad`}
          onClose={() => setPad(null)}
          footer={
            <>
              <Btn onClick={() => setPad(null)}>Cancel</Btn>
              <Btn
                tone="primary"
                disabled={!signed}
                onClick={() => {
                  const f = pad.key;
                  setPad(null);
                  cmd("ehr.sig.capture", `${p.id}:${f}`);
                }}
              >
                Accept signature
              </Btn>
            </>
          }
        >
          <p className="mb-2 rounded-[3px] bg-slate-50 p-2 text-[12px] leading-snug">{pad.text}</p>
          <button type="button" aria-label="Signature box: the patient signs here" onClick={() => setSigned(true)} className="relative flex h-24 w-full items-end justify-center rounded-[3px] border-2 border-dashed border-slate-400 bg-white pb-2 text-[11px] text-slate-400 hover:border-sky-500">
            {signed ? (
              <svg viewBox="0 0 200 50" className="absolute inset-x-8 top-3 h-14" aria-hidden="true">
                <path d="M5 35c10-25 18-25 20 0s12-30 22-12 8 16 18 2 14-14 20 0 10 8 22-6 18 4 26 6 20-8 30-4" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : null}
            <span>{signed ? "Signed" : "Click here to have the patient sign on the pad"}</span>
          </button>
        </Modal>
      )}
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Documents and release of information                               */
/* ------------------------------------------------------------------ */

function Documents({ p }: { p: EhrPatient }) {
  const { doc, openForm } = useEhr();
  const disclosures = (doc.roi ?? []).filter((r) => r.patient === p.id);
  return (
    <div className="flex flex-col gap-2 p-3">
      <Panel
        title="Documents"
        right={
          <Btn tone="primary" icon="report" onClick={() => openForm("ehr.roi", { patient: p.id })}>
            Release of information…
          </Btn>
        }
        bodyClass="p-0"
      >
        {(p.documents ?? []).length === 0 ? (
          <Empty>No documents.</Empty>
        ) : (
          <Table head={["Date", "Type", "Title", "Summary"]}>
            {(p.documents ?? []).map((d) => (
              <Row key={d.id} label={d.title}>
                <Td className="whitespace-nowrap">{d.date}</Td>
                <Td>{d.type}</Td>
                <Td className="font-semibold">{d.title}</Td>
                <Td className="text-slate-600">{d.summary}</Td>
              </Row>
            ))}
          </Table>
        )}
      </Panel>
      <Panel title="Release of information log (accounting of disclosures)" bodyClass="p-0">
        {disclosures.length === 0 ? (
          <Empty>No requests recorded for this patient.</Empty>
        ) : (
          <Table head={["When", "Requested by", "Documents", "Format", "Decision"]}>
            {disclosures.map((r, i) => (
              <Row key={i}>
                <Td className="whitespace-nowrap">{r.at}</Td>
                <Td>{r.requester}</Td>
                <Td>{r.docs ? r.docs.split(",").map((id) => p.documents?.find((d) => d.id === id)?.title ?? id).join("; ") : "None"}</Td>
                <Td>{r.format}</Td>
                <Td>
                  <Badge tone={r.decision === "Release now" ? "green" : "amber"}>{r.decision}</Badge>
                </Td>
              </Row>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Account ledger and statements                                       */
/* ------------------------------------------------------------------ */

function Ledger({ p }: { p: EhrPatient }) {
  const { doc, openForm } = useEhr();
  const bal = balances(p);
  const stmts = (doc.statements ?? []).filter((s) => s.patient === p.id);
  const last = stmts[stmts.length - 1];
  let ins = 0;
  let pt = 0;
  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Tile label="Insurance balance" value={money(bal.insurance)} />
        <Tile label="Patient balance" value={money(bal.patient)} strong />
        <Tile label="Statements sent" value={String(stmts.length)} />
        <div className="flex items-center justify-end">
          <Btn tone="primary" icon="report" onClick={() => openForm("ehr.stmt", { patient: p.id })}>
            Patient statement…
          </Btn>
        </div>
      </div>
      <Panel title="Account ledger" bodyClass="p-0">
        {(p.ledger ?? []).length === 0 ? (
          <Empty>No transactions.</Empty>
        ) : (
          <Table head={["Date", "Description", "Charge", "Payment", "Adjustment", "To patient", "Ins. balance", "Pt. balance"]} dense>
            {(p.ledger ?? []).map((r, i) => {
              ins += (r.charge ?? 0) - (r.adjustment ?? 0) - (r.transfer ?? 0) - (r.party === "Patient" ? 0 : r.payment ?? 0);
              pt += (r.transfer ?? 0) - (r.party === "Patient" ? r.payment ?? 0 : 0);
              return (
                <Row key={i}>
                  <Td className="whitespace-nowrap">{r.date}</Td>
                  <Td>{r.desc}</Td>
                  <Td mono className="text-right">{r.charge ? money(r.charge) : ""}</Td>
                  <Td mono className="text-right">{r.payment ? money(r.payment) : ""}</Td>
                  <Td mono className="text-right">{r.adjustment ? money(r.adjustment) : ""}</Td>
                  <Td mono className="text-right">{r.transfer ? money(r.transfer) : ""}</Td>
                  <Td mono className="text-right">{money(ins)}</Td>
                  <Td mono className="text-right font-semibold">{money(pt)}</Td>
                </Row>
              );
            })}
          </Table>
        )}
      </Panel>
      {last && (
        <Panel title={`Statement preview · ${last.at} · sent by ${last.delivery.toLowerCase()}`}>
          <div className="mx-auto max-w-lg rounded-[3px] border border-slate-300 bg-white p-4 text-[12px] shadow-sm" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            <div className="flex justify-between">
              <div>
                <div className="text-[14px] font-bold">{doc.facility}</div>
                <div className="text-slate-600">Patient Financial Services</div>
              </div>
              <div className="text-right">
                <div className="font-bold">STATEMENT</div>
                <div>{last.at.split(" ")[0]}</div>
              </div>
            </div>
            <div className="mt-3">
              {p.first} {p.last}
              <br />
              {p.street}
              <br />
              {[p.city, p.state].filter(Boolean).join(", ")} {p.zip}
            </div>
            <div className="mt-3 border-t border-slate-300 pt-2">Account {p.mrn}</div>
            <div className="mt-2 flex justify-between text-[14px] font-bold">
              <span>Amount you owe</span>
              <span>{money(last.amount)}</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-600">Your insurance has processed these services. This is your share under your plan (deductible, coinsurance or copay).</div>
          </div>
        </Panel>
      )}
    </div>
  );
}

export function Tile({ label, value, strong, tone }: { label: string; value: string; strong?: boolean; tone?: "red" | "green" }) {
  return (
    <div className="rounded-[3px] border border-slate-300 bg-white px-3 py-2">
      <div className="text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`text-[18px] ${strong ? "font-bold" : "font-semibold"} ${tone === "red" ? "text-rose-700" : tone === "green" ? "text-emerald-700" : "text-slate-900"}`}>{value}</div>
    </div>
  );
}
