"use client";

import type { ReactNode } from "react";
import { CARC, icdTitle, procCode } from "../codes";
import { claimTotal, LETTERS, money, patientOf, payerOf, providerOf, scrubClaim } from "../model";
import { Badge, Btn, EField, Empty, Icon, Panel, Row, Table, Td, useEhr } from "../ui";

const SUBS = [
  { id: "queue", label: "Work queue" },
  { id: "claim", label: "Claim (CMS-1500)" },
  { id: "era", label: "Remittance (ERA)" },
];

const CLAIM_TONE: Record<string, "slate" | "blue" | "green" | "red" | "amber"> = { Draft: "amber", Submitted: "blue", Paid: "green", Denied: "red", Closed: "slate" };

export function ClaimsView() {
  const { doc, cmd } = useEhr();
  const sub = doc.nav.sub && SUBS.some((s) => s.id === doc.nav.sub) ? doc.nav.sub : "queue";
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div role="tablist" aria-label="Claims" className="flex shrink-0 gap-0.5 border-b border-slate-300 bg-slate-200 px-2 pt-1">
        {SUBS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={sub === s.id}
            disabled={s.id === "claim" && !doc.nav.claim}
            onClick={() => cmd("ehr.nav", `claims:${s.id}`)}
            className={`rounded-t-[3px] border border-b-0 px-3 py-1 text-[12px] font-semibold disabled:opacity-40 ${sub === s.id ? "border-slate-300 bg-slate-100 text-slate-900" : "border-transparent text-slate-600 hover:bg-slate-100/70"}`}
          >
            {s.label}
            {s.id === "claim" && doc.nav.claim ? ` ${doc.nav.claim}` : ""}
          </button>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-auto">
        {sub === "queue" && <Queue />}
        {sub === "claim" && <ClaimForm />}
        {sub === "era" && <Era />}
      </div>
    </div>
  );
}

function Queue() {
  const { doc, sel, select, cmd, openForm, menu, openPatient } = useEhr();
  const claims = doc.claims ?? [];
  const picked = sel.startsWith("claim:") ? claims.find((c) => c.id === sel.slice(6)) : undefined;
  return (
    <div className="p-2.5">
      <Panel
        title="Revenue work queue"
        right={
          <>
            <Btn small icon="claim" disabled={!picked} onClick={() => picked && cmd("ehr.claim.open", picked.id)}>
              Open claim
            </Btn>
            <Btn small tone="warn" disabled={!picked || picked.status !== "Denied"} onClick={() => picked && openForm("ehr.denial", { claim: picked.id })}>
              Work denial…
            </Btn>
            {doc.workspaces.includes("chart") && (
              <Btn small icon="chart" disabled={!picked} onClick={() => picked && openPatient(picked.patient)}>
                Open chart
              </Btn>
            )}
          </>
        }
        bodyClass="p-0"
      >
        {claims.length === 0 ? (
          <Empty>No claims yet. Create one from an encounter in Charges.</Empty>
        ) : (
          <Table head={["Claim", "Patient", "Payer", "DOS", "Billed", "Status", "Scrubber", "Denial / next step"]} dense>
            {claims.map((c) => {
              const p = patientOf(doc, c.patient);
              const issues = c.status === "Draft" ? scrubClaim(doc, c).length : 0;
              return (
                <Row
                  key={c.id}
                  label={`Claim ${c.id}`}
                  selected={picked?.id === c.id}
                  onClick={() => select(`claim:${c.id}`)}
                  onDoubleClick={() => cmd("ehr.claim.open", c.id)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    select(`claim:${c.id}`);
                    menu(e, [
                      { label: "Open claim", onPick: () => cmd("ehr.claim.open", c.id) },
                      { label: "Work denial…", onPick: () => openForm("ehr.denial", { claim: c.id }), disabled: c.status !== "Denied" },
                    ]);
                  }}
                  tone={c.status === "Denied" && !c.worked ? "warn" : undefined}
                >
                  <Td mono className="font-semibold">
                    {c.id}
                  </Td>
                  <Td>
                    {p?.last}, {p?.first}
                  </Td>
                  <Td>{payerOf(doc, c.payer)?.name}</Td>
                  <Td>
                    {c.dos}
                    {c.age ? <span className="block text-[10.5px] text-slate-500">{c.age} days old</span> : null}
                  </Td>
                  <Td mono className="text-right">
                    {money(claimTotal(c))}
                  </Td>
                  <Td>
                    <Badge tone={CLAIM_TONE[c.status]}>{c.status}</Badge>
                  </Td>
                  <Td>{c.status === "Draft" ? issues ? <Badge tone="red">{issues} error{issues === 1 ? "" : "s"}</Badge> : <Badge tone="green">Clean</Badge> : ""}</Td>
                  <Td>
                    {c.carc && (
                      <span>
                        <span className="font-mono font-bold text-rose-700">{c.carc}</span> {CARC[c.carc] ?? c.denial}
                      </span>
                    )}
                    {c.worked && <span className="block text-[11px] text-emerald-800">Worked: {c.worked.action}</span>}
                  </Td>
                </Row>
              );
            })}
          </Table>
        )}
      </Panel>
    </div>
  );
}

function Box({ n, label, children, className = "" }: { n: string; label: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`border-b border-r border-[#e3a0a0] px-1.5 py-1 ${className}`}>
      <div className="text-[9px] font-semibold uppercase leading-tight tracking-wide text-[#b4443f]">
        {n}. {label}
      </div>
      <div className="mt-0.5 text-[12px] text-slate-900">{children}</div>
    </div>
  );
}

function ClaimForm() {
  const { doc, sel, select, cmd, openPatient } = useEhr();
  const c = (doc.claims ?? []).find((x) => x.id === doc.nav.claim);
  if (!c) return <Empty>Open a claim from the work queue.</Empty>;
  const p = patientOf(doc, c.patient);
  const payer = payerOf(doc, c.payer);
  const prov = providerOf(doc, c.provider);
  const draft = c.status === "Draft";
  const issues = draft ? scrubClaim(doc, c) : [];
  const selLine = sel.startsWith(`cl:${c.id}:`) ? sel.slice(`cl:${c.id}:`.length) : "";
  const selDx = sel.startsWith(`cdx:${c.id}:`) ? sel.slice(`cdx:${c.id}:`.length) : "";
  const sof = p?.signatures?.aob ? "SIGNATURE ON FILE" : "";
  const dxSlots = Math.min(12, c.dx.length + (draft ? 1 : 0));
  return (
    <div className="flex min-h-0 flex-1 gap-2 p-2.5">
      <div className="min-w-0 flex-1 overflow-auto">
        <div className="mx-auto max-w-[880px] border border-[#e3a0a0] bg-[#fffdfb] shadow-sm" aria-label={`CMS-1500 claim ${c.id}`}>
          <div className="flex items-end justify-between border-b border-[#e3a0a0] px-2 py-1.5">
            <div>
              <div className="text-[15px] font-bold tracking-wide text-[#b4443f]">HEALTH INSURANCE CLAIM FORM</div>
              <div className="text-[9px] uppercase tracking-wide text-[#b4443f]">Approved by National Uniform Claim Committee (NUCC) 02/12 · training copy</div>
            </div>
            <div className="text-right text-[11px] text-slate-700">
              <div className="font-semibold">{payer?.name}</div>
              <div>{payer?.claimsAddress}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <Box n="1" label="Program">
              {payer?.kind === "Medicare" ? "Medicare" : payer?.kind === "Medicaid" ? "Medicaid" : "Group health plan"}
            </Box>
            <Box n="1a" label="Insured's I.D. number">
              <EField target={`${c.id}.memberId`} value={c.memberId} label="Box 1a insured's ID" mono disabled={!draft} />
            </Box>
            <Box n="2" label="Patient's name (last, first)">
              {p?.last}, {p?.first}
            </Box>
            <Box n="4" label="Insured's name (last, first)">
              {c.insured}
            </Box>
            <Box n="3" label="Patient's birth date · sex">
              {p?.dob} · {p?.sex === "Female" ? "F" : p?.sex === "Male" ? "M" : p?.sex}
            </Box>
            <Box n="6" label="Patient relationship to insured">
              {c.relationship}
            </Box>
            <Box n="5" label="Patient's address">
              {p?.street}, {p?.city}, {p?.state} {p?.zip}
            </Box>
            <Box n="11" label="Insured's policy group number">
              <EField target={`${c.id}.group`} value={c.group} label="Box 11 group number" mono disabled={!draft} />
            </Box>
            <Box n="12" label="Patient's or authorized person's signature">
              {sof || <span className="text-rose-700">Not on file</span>}
            </Box>
            <Box n="13" label="Insured's or authorized person's signature">
              {sof || <span className="text-rose-700">Not on file</span>}
            </Box>
          </div>
          <Box n="21" label="Diagnosis or nature of illness or injury · ICD Ind. 0 (ICD-10-CM)" className="border-r-0">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-4">
              {Array.from({ length: dxSlots }, (_, i) => {
                const code = c.dx[i];
                const L = LETTERS[i];
                return (
                  <div key={L} className={`flex items-center gap-1 rounded-[3px] px-0.5 ${code && selDx === code ? "bg-sky-100 ring-1 ring-sky-500" : ""}`} onClick={() => code && select(`cdx:${c.id}:${code}`)}>
                    <span className="w-3 text-[11px] font-bold text-[#b4443f]">{L}.</span>
                    <EField target={`${c.id}.dx.${L}`} value={code} label={`Box 21 ${L}`} mono disabled={!draft} placeholder={code ? undefined : "add"} />
                  </div>
                );
              })}
            </div>
          </Box>
          <div className="grid grid-cols-2">
            <Box n="22" label="Resubmission code">
              <span className="text-slate-400">Original claim</span>
            </Box>
            <Box n="23" label="Prior authorization number" className="border-r-0">
              <EField target={`${c.id}.auth`} value={c.auth} label="Box 23 prior authorization number" mono disabled={!draft} />
            </Box>
          </div>
          <div className="border-b border-[#e3a0a0]">
            <table className="w-full border-collapse text-[11.5px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-wide text-[#b4443f]">
                  <th className="border-r border-[#e3a0a0] px-1 py-0.5 text-left">24A. Date(s) of service</th>
                  <th className="border-r border-[#e3a0a0] px-1 text-left">B. POS</th>
                  <th className="border-r border-[#e3a0a0] px-1 text-left">D. CPT/HCPCS</th>
                  <th className="border-r border-[#e3a0a0] px-1 text-left">Modifier</th>
                  <th className="border-r border-[#e3a0a0] px-1 text-left">E. Dx pointer</th>
                  <th className="border-r border-[#e3a0a0] px-1 text-right">F. $ Charges</th>
                  <th className="border-r border-[#e3a0a0] px-1 text-left">G. Units</th>
                  <th className="px-1 text-left">J. Rendering NPI</th>
                </tr>
              </thead>
              <tbody>
                {c.lines.map((l, i) => (
                  <tr key={l.id} onClick={() => select(`cl:${c.id}:${l.id}`)} aria-selected={selLine === l.id} className={`cursor-pointer border-t border-[#f0c4c4] ${selLine === l.id ? "bg-sky-100" : "hover:bg-[#fff3f0]"}`}>
                    <td className="border-r border-[#f0c4c4] px-1 py-1">
                      <span className="mr-1 text-[10px] font-bold text-[#b4443f]">{i + 1}</span>
                      {c.dos}
                    </td>
                    <td className="border-r border-[#f0c4c4] px-1">{c.pos ?? "11"}</td>
                    <td className="border-r border-[#f0c4c4] px-1">
                      <EField target={`${c.id}.${l.id}.code`} value={l.code} label={`Line ${i + 1} code`} mono width={70} disabled={!draft} />
                    </td>
                    <td className="border-r border-[#f0c4c4] px-1">
                      <span className="flex gap-1">
                        <EField target={`${c.id}.${l.id}.mod1`} value={l.mod1} label={`Line ${i + 1} modifier 1`} mono width={40} disabled={!draft} />
                        <EField target={`${c.id}.${l.id}.mod2`} value={l.mod2} label={`Line ${i + 1} modifier 2`} mono width={40} disabled={!draft} />
                      </span>
                    </td>
                    <td className="border-r border-[#f0c4c4] px-1">
                      <EField target={`${c.id}.${l.id}.ptr`} value={l.ptr} label={`Line ${i + 1} diagnosis pointer`} mono width={52} disabled={!draft} />
                    </td>
                    <td className="border-r border-[#f0c4c4] px-1 text-right font-mono">{(l.fee * l.units).toFixed(2)}</td>
                    <td className="border-r border-[#f0c4c4] px-1">
                      <EField target={`${c.id}.${l.id}.units`} value={l.units} label={`Line ${i + 1} units`} mono width={40} disabled={!draft} />
                    </td>
                    <td className="px-1 font-mono">{prov?.npi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-3">
            <Box n="26" label="Patient's account no.">
              {p?.mrn}
            </Box>
            <Box n="28" label="Total charge">
              <span className="font-mono font-bold">{money(claimTotal(c))}</span>
            </Box>
            <Box n="31" label="Signature of physician or supplier" className="border-r-0">
              {prov ? `${prov.name}, ${prov.credentials}` : ""}
            </Box>
            <Box n="32" label="Service facility location" className="col-span-1">
              {doc.facility}
            </Box>
            <Box n="33" label="Billing provider info" className="col-span-2 border-r-0">
              {doc.facility} · Patient Financial Services
            </Box>
          </div>
        </div>
        {c.lines.some((l) => !procCode(l.code)) || c.dx.some((d) => !d) ? null : (
          <p className="mx-auto mt-1.5 max-w-[880px] text-[10.5px] text-slate-500">
            Box 21: {c.dx.map((d, i) => `${LETTERS[i]} ${d} ${icdTitle(d)}`).join("; ")}
          </p>
        )}
      </div>

      <div className="flex w-[270px] shrink-0 flex-col gap-2 overflow-auto">
        <Panel title={`Claim ${c.id}`} right={<Badge tone={CLAIM_TONE[c.status]}>{c.status}</Badge>}>
          <div className="flex flex-wrap gap-1.5">
            <Btn small disabled={!selLine || !draft} onClick={() => cmd("ehr.claim.removeLine")}>
              Remove line
            </Btn>
            <Btn small disabled={!selDx || !draft} onClick={() => cmd("ehr.claim.removeDx")}>
              Remove diagnosis
            </Btn>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Btn tone="primary" icon="check" disabled={!draft || issues.length > 0} onClick={() => cmd("ehr.claim.submit", c.id)}>
              Submit claim
            </Btn>
            {doc.workspaces.includes("chart") && (
              <Btn small icon="chart" onClick={() => openPatient(c.patient)}>
                Open chart
              </Btn>
            )}
          </div>
        </Panel>
        {draft && (
          <Panel title={`Claim scrubber · ${issues.length ? `${issues.length} error${issues.length === 1 ? "" : "s"}` : "clean"}`} bodyClass="p-1.5">
            {issues.length === 0 ? (
              <div className="flex items-center gap-1.5 px-1 py-1 text-[12px] text-emerald-800">
                <Icon name="check" size={15} /> No errors. The claim is ready to submit.
              </div>
            ) : (
              <ul className="space-y-1">
                {issues.map((i, k) => (
                  <li key={k}>
                    <button
                      type="button"
                      onClick={() => (i.line ? select(`cl:${c.id}:${i.line}`) : i.dx ? select(`cdx:${c.id}:${i.dx}`) : undefined)}
                      className="flex w-full items-start gap-1.5 rounded-[3px] border border-rose-200 bg-rose-50 px-1.5 py-1 text-left text-[11.5px] leading-snug text-rose-950 hover:bg-rose-100"
                    >
                      <span className="shrink-0 rounded-[2px] bg-rose-700 px-1 font-mono text-[10px] font-bold text-white">{i.box}</span>
                      <span>{i.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        )}
        {c.carc && (
          <Panel title="Denial">
            <div className="text-[12px]">
              <span className="font-mono font-bold text-rose-700">{c.carc}</span> {CARC[c.carc] ?? c.denial}
            </div>
          </Panel>
        )}
        <Panel title="Claim history" bodyClass="p-2">
          <ul className="space-y-0.5 text-[11px] text-slate-700">
            {(c.history ?? []).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Era() {
  const { doc, sel, select, cmd, openForm } = useEhr();
  const remits = doc.remits ?? [];
  const picked = sel.startsWith("era:") ? sel.slice(4) : "";
  const pickedLine = remits.flatMap((r) => r.lines).find((l) => l.id === picked);
  return (
    <div className="flex flex-col gap-2 p-2.5">
      {remits.length === 0 && <Empty>No remittances have been received.</Empty>}
      {remits.map((r) => (
        <Panel
          key={r.id}
          title={`ERA ${r.id} · ${payerOf(doc, r.payer)?.name} · ${r.date} · ${r.trace}`}
          right={
            <>
              <span className="text-[11.5px] font-semibold text-slate-700">Paid {money(r.lines.reduce((s, l) => s + l.paid, 0))}</span>
              <Btn small tone="primary" disabled={!pickedLine || Boolean(pickedLine.posted) || !r.lines.includes(pickedLine)} onClick={() => pickedLine && openForm("ehr.post", { line: pickedLine.id })}>
                Post line…
              </Btn>
            </>
          }
          bodyClass="p-0"
        >
          <Table head={["Claim", "Patient", "Code", "DOS", "Billed", "Allowed", "Paid", "Adjustment", "Patient resp.", "Status"]} dense>
            {r.lines.map((l) => {
              const p = patientOf(doc, l.patient);
              return (
                <Row key={l.id} label={`ERA line ${l.id}`} selected={picked === l.id} onClick={() => select(`era:${l.id}`)} onDoubleClick={() => !l.posted && (select(`era:${l.id}`), openForm("ehr.post", { line: l.id }))}>
                  <Td mono>
                    <button type="button" className="text-sky-700 underline decoration-dotted" onClick={(e) => (e.stopPropagation(), cmd("ehr.claim.open", l.claim))}>
                      {l.claim}
                    </button>
                  </Td>
                  <Td>
                    {p?.last}, {p?.first}
                  </Td>
                  <Td mono className="font-semibold">
                    {l.code}
                  </Td>
                  <Td>{l.dos}</Td>
                  <Td mono className="text-right">
                    {money(l.billed)}
                  </Td>
                  <Td mono className="text-right">
                    {money(l.allowed)}
                  </Td>
                  <Td mono className="text-right font-semibold">
                    {money(l.paid)}
                  </Td>
                  <Td mono className="text-right">
                    {l.adjCode} {money(l.adj)}
                  </Td>
                  <Td mono className="text-right">
                    {l.prCode ? `${l.prCode} ${money(l.pr)}` : money(0)}
                  </Td>
                  <Td>{l.posted ? <Badge tone="green">Posted</Badge> : l.carc ? <Badge tone="red">Denied {l.carc}</Badge> : <Badge tone="amber">Unposted</Badge>}</Td>
                </Row>
              );
            })}
          </Table>
          <p className="border-t border-slate-200 px-2.5 py-1.5 text-[11px] text-slate-500">
            Post three things for each line: the payment, the contractual adjustment (billed minus allowed, never billed to the patient), and the patient's share. Reason codes: CO-45 contractual; PR-1 deductible, PR-2 coinsurance, PR-3 copay.
          </p>
        </Panel>
      ))}
    </div>
  );
}
