"use client";

import { useMemo, useState } from "react";
import { DEPARTMENTS } from "../forms";
import { ageOf, listName, normDate, patientOf } from "../model";
import { Badge, Btn, Empty, Icon, Label, Panel, Row, StarMark, Table, Td, useEhr } from "../ui";

export function SignInScreen() {
  const { doc, commit } = useEhr();
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [dept, setDept] = useState("");
  const ok = user.trim() && pw && dept;
  const submit = () => {
    if (ok) commit({ kind: "dialog", id: "ehr.signin", values: { user: user.trim(), department: dept } });
  };
  return (
    <div className="flex h-full flex-col bg-slate-900 text-white">
      <div className="flex items-center justify-between bg-orange-800 px-3 py-[3px] text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-50">
        <span>Training environment</span>
        <span className="normal-case tracking-normal text-orange-100">Synthetic patients only</span>
      </div>
      <div className="flex flex-1 items-center justify-center p-4">
        <form
          className="w-full max-w-sm rounded-[4px] border border-slate-600 bg-slate-800 p-5 shadow-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <StarMark size={30} />
            <div>
              <div className="text-[16px] font-bold">Northstar EHR</div>
              <div className="text-[11px] text-slate-400">{doc.facility}</div>
            </div>
          </div>
          <label className="mb-2 block">
            <span className="mb-0.5 block text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">User ID</span>
            <input aria-label="User ID" value={user} onChange={(e) => setUser(e.target.value)} autoComplete="off" className="h-8 w-full rounded-[3px] border border-slate-500 bg-slate-900 px-2 text-[13px] outline-none focus:border-sky-400" />
          </label>
          <label className="mb-2 block">
            <span className="mb-0.5 block text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">Password</span>
            <input aria-label="Password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="h-8 w-full rounded-[3px] border border-slate-500 bg-slate-900 px-2 text-[13px] outline-none focus:border-sky-400" />
          </label>
          <label className="mb-4 block">
            <span className="mb-0.5 block text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">Department</span>
            <select aria-label="Department" value={dept} onChange={(e) => setDept(e.target.value)} className="h-8 w-full rounded-[3px] border border-slate-500 bg-slate-900 px-1.5 text-[13px] outline-none focus:border-sky-400">
              <option value="">Select…</option>
              {DEPARTMENTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={!ok} className="h-8 w-full rounded-[3px] bg-sky-600 text-[13px] font-semibold hover:bg-sky-500 disabled:opacity-40">
            Sign in
          </button>
          <p className="mt-3 text-[10.5px] leading-snug text-slate-400">Use only your own credentials. Everything done under your sign-in is attributed to you.</p>
        </form>
      </div>
    </div>
  );
}

export function LockScreen() {
  const { doc, cmd } = useEhr();
  const [pw, setPw] = useState("");
  return (
    <div className="flex h-full items-center justify-center bg-slate-900 p-4 text-white">
      <form
        className="w-full max-w-xs rounded-[4px] border border-slate-600 bg-slate-800 p-5 text-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (pw) cmd("ehr.unlock");
        }}
      >
        <Icon name="lock" size={34} className="mx-auto mb-2 text-orange-300" />
        <div className="text-[15px] font-bold">Workstation secured</div>
        <div className="mb-3 text-[11.5px] text-slate-400">
          {doc.session.name} ({doc.session.user}) · No patient information is visible
        </div>
        <input aria-label="Password" type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} className="mb-2 h-8 w-full rounded-[3px] border border-slate-500 bg-slate-900 px-2 text-[13px] outline-none focus:border-sky-400" />
        <button type="submit" disabled={!pw} className="h-8 w-full rounded-[3px] bg-sky-600 text-[13px] font-semibold hover:bg-sky-500 disabled:opacity-40">
          Unlock
        </button>
      </form>
    </div>
  );
}

export function SearchView() {
  const { doc, sel, select, openPatient } = useEhr();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [mrn, setMrn] = useState("");
  const hasCriteria = name.trim().length >= 2 || dob.trim().length >= 6 || mrn.trim().length >= 3;
  const results = useMemo(() => {
    if (!hasCriteria) return doc.judgeAccess ? [] : doc.patients.slice().sort((a, b) => listName(a).localeCompare(listName(b)));
    const n = name.trim().toLowerCase().replace(/,/g, " ").split(/\s+/).filter(Boolean);
    const d = dob.trim() ? normDate(dob) : "";
    return doc.patients.filter((p) => {
      const full = `${p.last} ${p.first} ${p.middle ?? ""}`.toLowerCase();
      if (n.length && !n.every((t) => full.includes(t))) return false;
      if (d && p.dob !== d) return false;
      if (mrn.trim() && !p.mrn.toLowerCase().includes(mrn.trim().toLowerCase())) return false;
      return true;
    });
  }, [doc.patients, doc.judgeAccess, name, dob, mrn, hasCriteria]);
  const picked = sel.startsWith("pt:") ? sel.slice(3) : "";
  const pickedOk = results.some((p) => p.id === picked);
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-3">
      <Panel title="Patient search">
        <form
          className="grid grid-cols-[1.4fr_1fr_1fr_auto] items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (results.length === 1) select(`pt:${results[0].id}`);
          }}
        >
          <label>
            <Label>Name (last, first)</Label>
            <input aria-label="Patient name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Baptiste, Andre" className="h-[26px] w-full rounded-[3px] border border-slate-300 px-1.5 text-[12.5px] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
          </label>
          <label>
            <Label>Date of birth</Label>
            <input aria-label="Date of birth" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="MM/DD/YYYY" className="h-[26px] w-full rounded-[3px] border border-slate-300 px-1.5 text-[12.5px] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
          </label>
          <label>
            <Label>MRN</Label>
            <input aria-label="MRN" value={mrn} onChange={(e) => setMrn(e.target.value)} className="h-[26px] w-full rounded-[3px] border border-slate-300 px-1.5 text-[12.5px] outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200" />
          </label>
          <button type="submit" className="flex h-[26px] items-center gap-1 rounded-[3px] border border-sky-800 bg-sky-700 px-3 text-[12px] font-semibold text-white hover:bg-sky-600">
            <Icon name="search" size={13} /> Search
          </button>
        </form>
        <p className="mt-1.5 text-[11px] text-slate-500">Confirm two identifiers (name and date of birth) before you open a chart. Every chart you open is logged.</p>
      </Panel>
      <Panel
        title={hasCriteria ? `Results (${results.length})` : doc.judgeAccess ? "Results" : "Recent patients"}
        right={
          <Btn tone="primary" icon="chart" disabled={!pickedOk} onClick={() => pickedOk && openPatient(picked)}>
            Open chart
          </Btn>
        }
        bodyClass="p-0"
      >
        {results.length === 0 ? (
          <Empty>{hasCriteria ? "No patients match. Check the spelling and the date of birth." : "Enter a name, date of birth or MRN to search."}</Empty>
        ) : (
          <Table head={["Name", "Sex", "DOB (age)", "MRN", "Phone", "Last visit", ""]}>
            {results.map((p) => (
              <Row key={p.id} label={`${p.last}, ${p.first}`} selected={picked === p.id} onClick={() => select(`pt:${p.id}`)} onDoubleClick={() => openPatient(p.id)}>
                <Td className="font-semibold">
                  {p.last}, {p.first}
                  {p.middle ? ` ${p.middle}` : ""}
                </Td>
                <Td>{p.sex}</Td>
                <Td>
                  {p.dob} ({ageOf(p.dob, doc.today)})
                </Td>
                <Td mono>{p.mrn}</Td>
                <Td>{p.phone}</Td>
                <Td>{p.lastVisit ?? ""}</Td>
                <Td>
                  {p.restricted && (
                    <Badge tone="amber">
                      <Icon name="lock" size={11} /> <span className="ml-0.5">Restricted</span>
                    </Badge>
                  )}
                </Td>
              </Row>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  );
}

export function AuditView() {
  const { doc, sel, select, cmd } = useEhr();
  const [user, setUser] = useState("");
  const [pq, setPq] = useState("");
  const users = Array.from(new Set(doc.audit.map((a) => a.user)));
  const rows = doc.audit
    .filter((a) => !user || a.user === user)
    .filter((a) => {
      if (!pq.trim()) return true;
      const p = patientOf(doc, a.patient);
      return `${p?.last ?? ""} ${p?.first ?? ""} ${p?.mrn ?? ""}`.toLowerCase().includes(pq.trim().toLowerCase());
    })
    .slice()
    .reverse();
  const picked = sel.startsWith("audit:") ? sel.slice(6) : "";
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-3">
      <Panel
        title="Access audit log"
        right={
          <Btn tone="danger" icon="flag" disabled={!picked} onClick={() => cmd("ehr.audit.flag")}>
            Flag for privacy review
          </Btn>
        }
        bodyClass="p-0"
      >
        <div className="flex flex-wrap items-end gap-2 border-b border-slate-200 bg-white px-2.5 py-2">
          <label>
            <Label>User</Label>
            <select aria-label="Filter by user" value={user} onChange={(e) => setUser(e.target.value)} className="h-[26px] rounded-[3px] border border-slate-300 px-1 text-[12px]">
              <option value="">All users</option>
              {users.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </label>
          <label>
            <Label>Patient</Label>
            <input aria-label="Filter by patient" value={pq} onChange={(e) => setPq(e.target.value)} placeholder="Name or MRN" className="h-[26px] rounded-[3px] border border-slate-300 px-1.5 text-[12px]" />
          </label>
          <p className="ml-auto max-w-sm text-[11px] leading-snug text-slate-500">The audit trail records who opened what, when, and from where. It cannot be switched off.</p>
        </div>
        <Table head={["Date and time", "User", "Role", "Patient", "Action", "Detail", "Workstation", ""]} dense>
          {rows.map((a) => {
            const p = patientOf(doc, a.patient);
            return (
              <Row key={a.id} label={`Audit entry ${a.id}`} selected={picked === a.id} onClick={() => select(`audit:${a.id}`)} tone={a.flagged ? "warn" : undefined}>
                <Td className="whitespace-nowrap font-mono text-[11.5px]">{a.at}</Td>
                <Td className="font-semibold">{a.user}</Td>
                <Td>{a.role}</Td>
                <Td>{p ? `${p.last}, ${p.first} (${p.mrn})` : ""}</Td>
                <Td>{a.action}</Td>
                <Td className="text-slate-600">{a.detail}</Td>
                <Td mono className="text-[11px]">
                  {a.workstation}
                </Td>
                <Td>{a.flagged && <Icon name="flag" size={14} className="text-rose-600" />}</Td>
              </Row>
            );
          })}
        </Table>
      </Panel>
    </div>
  );
}
