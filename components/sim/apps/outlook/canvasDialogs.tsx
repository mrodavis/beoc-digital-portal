"use client";

import { useState } from "react";
import type { SimCommit } from "@/types/sim";
import type { OutlookDoc } from "./types";
import { DlgButton, Modal, OIcon, waitFor } from "./parts";
import { people, serializeAutoReplies, serializeSignatures, todayOf } from "./model";
import { TIME_OPTIONS, addDays, fmtDate, fmtTime, parseTime, parseUsDate } from "./dates";

/* ------------------------------------------------------------------ */
/* Signatures and Stationery                                           */
/* ------------------------------------------------------------------ */

export function SignaturesDialog({ doc, onCommit, onClose, docNow }: { doc: OutlookDoc; onCommit: (c: SimCommit) => void; onClose: () => void; docNow: () => OutlookDoc }) {
  const [sigs, setSigs] = useState(() => (doc.signatures ?? []).map((s) => ({ ...s })));
  const [sel, setSel] = useState<string>(doc.signatures?.[0]?.name ?? "");
  const [defNew, setDefNew] = useState(doc.defaultNew ?? "");
  const [defReply, setDefReply] = useState(doc.defaultReply ?? "");
  const [naming, setNaming] = useState<{ mode: "new" | "rename"; text: string } | null>(null);
  const [tab, setTab] = useState(0);
  const cur = sigs.find((s) => s.name === sel);
  const ok = async () => {
    const value = serializeSignatures(sigs, defNew || undefined, defReply || undefined);
    const before = docNow();
    onCommit({ kind: "type", target: "signatures", value });
    const accepted = await waitFor(() => docNow() !== before);
    if (accepted) onClose();
  };
  const finishName = () => {
    if (!naming) return;
    const name = naming.text.trim();
    if (!name) return setNaming(null);
    if (naming.mode === "new") {
      if (!sigs.some((s) => s.name === name)) setSigs([...sigs, { name, text: "" }]);
      setSel(name);
    } else if (cur) {
      setSigs(sigs.map((s) => (s.name === cur.name ? { ...s, name } : s)));
      if (defNew === cur.name) setDefNew(name);
      if (defReply === cur.name) setDefReply(name);
      setSel(name);
    }
    setNaming(null);
  };
  return (
    <Modal
      title="Signatures and Stationery"
      width={560}
      onClose={onClose}
      footer={
        <>
          <DlgButton primary onClick={ok}>OK</DlgButton>
          <DlgButton onClick={onClose}>Cancel</DlgButton>
        </>
      }
    >
      <div role="tablist" className="mb-2 flex gap-0.5 border-b border-gray-300">
        {["E-mail Signature", "Personal Stationery"].map((t, i) => (
          <button key={t} type="button" role="tab" aria-selected={i === tab} onClick={() => setTab(i)} className={`border border-b-0 px-3 py-1 ${i === tab ? "border-gray-300 bg-white" : "border-transparent"}`}>
            {t}
          </button>
        ))}
      </div>
      {tab === 1 ? (
        <p className="text-gray-600">Theme or stationery for new HTML e-mail message: No theme currently selected.</p>
      ) : (
        <>
          <div className="flex gap-4">
            <div className="w-56">
              <p className="mb-1">Select signature to edit</p>
              <div role="listbox" aria-label="Signatures" className="h-28 overflow-auto border border-gray-400 bg-white">
                {sigs.map((s) => (
                  <button key={s.name} type="button" role="option" aria-selected={s.name === sel} onClick={() => setSel(s.name)} className={`block w-full px-2 py-0.5 text-left ${s.name === sel ? "bg-[#0078d4] text-white" : "hover:bg-[#e5f1fb]"}`}>
                    {s.name}
                  </button>
                ))}
              </div>
              <div className="mt-1 flex gap-1">
                <DlgButton onClick={() => cur && (setSigs(sigs.filter((s) => s.name !== cur.name)), setSel(sigs.find((s) => s.name !== cur.name)?.name ?? ""))}>Delete</DlgButton>
                <DlgButton onClick={() => setNaming({ mode: "new", text: "" })}>New</DlgButton>
                <DlgButton onClick={() => cur && setNaming({ mode: "rename", text: cur.name })}>Rename</DlgButton>
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1">Choose default signature</p>
              <label className="mb-1 flex items-center justify-between gap-2">
                <span>E-mail account:</span>
                <select aria-label="E-mail account" className="w-44 border border-gray-400 bg-white px-1 py-0.5">
                  <option>{doc.account.email}</option>
                </select>
              </label>
              <label className="mb-1 flex items-center justify-between gap-2">
                <span>New messages:</span>
                <select aria-label="New messages" value={defNew} onChange={(e) => setDefNew(e.target.value)} className="w-44 border border-gray-400 bg-white px-1 py-0.5">
                  <option value="">(none)</option>
                  {sigs.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </label>
              <label className="flex items-center justify-between gap-2">
                <span>Replies/forwards:</span>
                <select aria-label="Replies/forwards" value={defReply} onChange={(e) => setDefReply(e.target.value)} className="w-44 border border-gray-400 bg-white px-1 py-0.5">
                  <option value="">(none)</option>
                  {sigs.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </label>
            </div>
          </div>
          <p className="mb-1 mt-3">Edit signature</p>
          <div className="mb-1 flex gap-1 border border-b-0 border-gray-300 bg-[#f7f7f7] px-1 py-0.5 text-[11px] text-gray-600">
            <span className="border-r border-gray-300 pr-2">Aptos</span>
            <span className="border-r border-gray-300 px-2">11</span>
            <span className="px-1 font-bold">B</span>
            <span className="px-1 italic">I</span>
            <span className="px-1 underline">U</span>
          </div>
          <textarea
            aria-label="Edit signature"
            disabled={!cur}
            value={cur?.text ?? ""}
            placeholder={cur ? "" : "Click New to create a signature."}
            onChange={(e) => setSigs(sigs.map((s) => (s.name === sel ? { ...s, text: e.target.value } : s)))}
            onKeyDown={(e) => e.stopPropagation()}
            rows={6}
            className="w-full resize-none border border-gray-300 p-1.5 text-[12.5px] disabled:bg-gray-50"
          />
        </>
      )}
      {naming && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10">
          <div className="w-80 border border-gray-400 bg-white p-3 shadow-xl">
            <p className="mb-1">{naming.mode === "new" ? "Type a name for this signature:" : "Type a new name for this signature:"}</p>
            <input
              autoFocus
              aria-label="Signature name"
              value={naming.text}
              onChange={(e) => setNaming({ ...naming, text: e.target.value })}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") finishName();
                if (e.key === "Escape") setNaming(null);
              }}
              className="mb-2 w-full border border-gray-400 px-1 py-0.5"
            />
            <div className="flex justify-end gap-2">
              <DlgButton primary onClick={finishName}>OK</DlgButton>
              <DlgButton onClick={() => setNaming(null)}>Cancel</DlgButton>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Automatic Replies (Out of Office)                                   */
/* ------------------------------------------------------------------ */

export function AutoRepliesDialog({ doc, onCommit, onClose, docNow }: { doc: OutlookDoc; onCommit: (c: SimCommit) => void; onClose: () => void; docNow: () => OutlookDoc }) {
  const a = doc.autoReplies;
  const today = todayOf(doc);
  const [on, setOn] = useState(Boolean(a?.on));
  const [range, setRange] = useState(Boolean(a?.start));
  const [sd, setSd] = useState(fmtDate(a?.start ?? addDays(today, 1)));
  const [st, setSt] = useState(a?.start ? fmtTime(a.start) : "8:00 AM");
  const [ed, setEd] = useState(fmtDate(a?.end ?? addDays(today, 2)));
  const [et, setEt] = useState(a?.end ? fmtTime(a.end) : "5:00 PM");
  const [inside, setInside] = useState(a?.inside ?? "");
  const [outOn, setOutOn] = useState(Boolean(a?.outsideOn));
  const [scope, setScope] = useState(a?.outsideScope ?? "Anyone outside my organization");
  const [outside, setOutside] = useState(a?.outside ?? "");
  const [tab, setTab] = useState(0);
  const [err, setErr] = useState("");
  const ok = async () => {
    let start: string | undefined, end: string | undefined;
    if (on && range) {
      const a1 = parseUsDate(sd), a2 = parseTime(st), b1 = parseUsDate(ed), b2 = parseTime(et);
      if (!a1 || !a2 || !b1 || !b2) return setErr("Check the start and end dates (M/D/YYYY).");
      start = `${a1}T${a2}`;
      end = `${b1}T${b2}`;
      if (end <= start) return setErr("The end time must be after the start time.");
    }
    setErr("");
    const value = serializeAutoReplies({ on, start, end, inside, outsideOn: outOn, outsideScope: scope, outside });
    const before = docNow();
    onCommit({ kind: "type", target: "autoReplies", value });
    if (await waitFor(() => docNow() !== before)) onClose();
  };
  const dis = !on;
  return (
    <Modal
      title={`Automatic Replies - ${doc.account.email}`}
      width={540}
      onClose={onClose}
      footer={
        <>
          <DlgButton onClick={() => undefined}>Rules...</DlgButton>
          <span className="flex-1" />
          <DlgButton primary onClick={ok}>OK</DlgButton>
          <DlgButton onClick={onClose}>Cancel</DlgButton>
        </>
      }
    >
      <fieldset className="mb-2">
        <label className="flex items-center gap-2">
          <input type="radio" name="ar-mode" checked={!on} onChange={() => setOn(false)} /> Do not send automatic replies
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="ar-mode" checked={on} onChange={() => setOn(true)} /> Send automatic replies
        </label>
      </fieldset>
      <div className={`mb-2 pl-5 ${dis ? "opacity-50" : ""}`}>
        <label className="mb-1 flex items-center gap-2">
          <input type="checkbox" disabled={dis} checked={range} onChange={(e) => setRange(e.target.checked)} /> Only send during this time range:
        </label>
        <div className="grid grid-cols-[70px_auto_auto] items-center gap-1 pl-5">
          <span>Start time:</span>
          <input aria-label="Start date" disabled={dis || !range} value={sd} onChange={(e) => setSd(e.target.value)} className="w-28 border border-gray-400 px-1 py-0.5" />
          <select aria-label="Start time" disabled={dis || !range} value={st} onChange={(e) => setSt(e.target.value)} className="w-24 border border-gray-400 bg-white px-1 py-0.5">
            {TIME_OPTIONS.map((t) => <option key={t}>{t}</option>)}
          </select>
          <span>End time:</span>
          <input aria-label="End date" disabled={dis || !range} value={ed} onChange={(e) => setEd(e.target.value)} className="w-28 border border-gray-400 px-1 py-0.5" />
          <select aria-label="End time" disabled={dis || !range} value={et} onChange={(e) => setEt(e.target.value)} className="w-24 border border-gray-400 bg-white px-1 py-0.5">
            {TIME_OPTIONS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <p className="mb-1">Automatically reply once for each sender with the following messages:</p>
      <div role="tablist" className="flex gap-0.5 border-b border-gray-300">
        {["Inside My Organization", `Outside My Organization (${outOn ? "On" : "Off"})`].map((t, i) => (
          <button key={t} type="button" role="tab" aria-selected={i === tab} onClick={() => setTab(i)} className={`border border-b-0 px-3 py-1 ${i === tab ? "border-gray-300 bg-white" : "border-transparent"}`}>
            {t}
          </button>
        ))}
      </div>
      {tab === 0 ? (
        <textarea aria-label="Inside My Organization message" disabled={dis} value={inside} onChange={(e) => setInside(e.target.value)} onKeyDown={(e) => e.stopPropagation()} rows={6} className="w-full resize-none border border-t-0 border-gray-300 p-1.5 text-[12.5px] disabled:bg-gray-50" />
      ) : (
        <div className="border border-t-0 border-gray-300 p-1.5">
          <label className="mb-1 flex items-center gap-2">
            <input type="checkbox" disabled={dis} checked={outOn} onChange={(e) => setOutOn(e.target.checked)} /> Auto-reply to people outside my organization
          </label>
          <div className="mb-1 flex gap-4 pl-5">
            {["My Contacts only", "Anyone outside my organization"].map((s) => (
              <label key={s} className="flex items-center gap-1">
                <input type="radio" name="ar-scope" disabled={dis || !outOn} checked={scope === s} onChange={() => setScope(s)} /> {s}
              </label>
            ))}
          </div>
          <textarea aria-label="Outside My Organization message" disabled={dis || !outOn} value={outside} onChange={(e) => setOutside(e.target.value)} onKeyDown={(e) => e.stopPropagation()} rows={5} className="w-full resize-none border border-gray-300 p-1.5 text-[12.5px] disabled:bg-gray-50" />
        </div>
      )}
      {err && <p className="mt-2 text-[#a4262c]">{err}</p>}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Address Book / Select Names                                         */
/* ------------------------------------------------------------------ */

export function AddressBookDialog({
  doc, fields, initial, onOk, onClose, title,
}: { doc: OutlookDoc; fields: string[]; initial: Record<string, string[]>; onOk: (v: Record<string, string[]>) => void; onClose: () => void; title: string }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string | null>(null);
  const [vals, setVals] = useState<Record<string, string[]>>(() => ({ ...initial }));
  const list = [
    ...(doc.groups ?? []).map((g) => ({ name: g.name, email: "", token: g.name, title: "Contact group" })),
    ...people(doc).map((p) => {
      const c = (doc.contacts ?? []).find((x) => x.email?.toLowerCase() === p.email.toLowerCase());
      return { name: p.name, email: p.email, token: p.email, title: c?.jobTitle ?? "" };
    }),
  ]
    .filter((p) => `${p.name} ${p.email}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));
  const add = (f: string, tok = sel) => {
    if (!tok) return;
    setVals((v) => ({ ...v, [f]: Array.from(new Set([...(v[f] ?? []), tok])) }));
  };
  const nameOf = (t: string) => list.find((x) => x.token === t)?.name ?? people(doc).find((p) => p.email === t)?.name ?? t;
  return (
    <Modal
      title={title}
      width={560}
      onClose={onClose}
      footer={
        <>
          <DlgButton primary onClick={() => onOk(vals)}>OK</DlgButton>
          <DlgButton onClick={onClose}>Cancel</DlgButton>
        </>
      }
    >
      <div className="mb-2 flex items-center gap-2">
        <span>Search:</span>
        <input aria-label="Search names" autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="flex-1 border border-gray-400 px-1 py-0.5" />
        <span className="text-gray-600">Address Book: Contacts</span>
      </div>
      <div role="listbox" aria-label="Names" className="h-44 overflow-auto border border-gray-400 bg-white">
        <div className="sticky top-0 grid grid-cols-[1fr_1fr_1fr] bg-[#f3f2f1] px-2 py-0.5 text-[11px] text-gray-600">
          <span>Name</span>
          <span>Title</span>
          <span>E-mail Address</span>
        </div>
        {list.map((p) => (
          <button
            key={p.token}
            type="button"
            role="option"
            aria-selected={sel === p.token}
            onClick={() => setSel(p.token)}
            onDoubleClick={() => add(fields[0], p.token)}
            className={`grid w-full grid-cols-[1fr_1fr_1fr] px-2 py-0.5 text-left ${sel === p.token ? "bg-[#0078d4] text-white" : "hover:bg-[#e5f1fb]"}`}
          >
            <span className="flex items-center gap-1 truncate">{p.email ? <OIcon name="person" size={12} /> : <OIcon name="group" size={12} />} {p.name}</span>
            <span className="truncate">{p.title}</span>
            <span className="truncate">{p.email}</span>
          </button>
        ))}
      </div>
      <div className="mt-2 space-y-1">
        {fields.map((f) => (
          <div key={f} className="flex items-center gap-2">
            <DlgButton onClick={() => add(f)}>{f} -&gt;</DlgButton>
            <div className="flex min-h-[24px] flex-1 flex-wrap items-center gap-1 border border-gray-400 bg-white px-1">
              {(vals[f] ?? []).map((t) => (
                <span key={t} className="flex items-center gap-1 rounded-sm bg-[#e8ebfa] px-1 text-[11.5px]">
                  {nameOf(t)}
                  <button type="button" aria-label={`Remove ${nameOf(t)}`} onClick={() => setVals((v) => ({ ...v, [f]: (v[f] ?? []).filter((x) => x !== t) }))}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
