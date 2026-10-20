"use client";

import { useState } from "react";
import type { Ctx } from "./ctx";
import type { OlContact, OlGroup } from "./types";
import { Avatar, CategoryChips, DlgButton, Modal, OIcon } from "./parts";
import { contactMenu } from "./menus";
import { RecipientField } from "./mail";
import { ACTIVITY_TYPES, fileAs, people, selKeys, serializeActivity, sortedContacts, todayOf } from "./model";
import { fmtDate, fmtLong, parseUsDate } from "./dates";

export function PeoplePane({ ctx }: { ctx: Ctx }) {
  const n = (ctx.doc.contacts ?? []).length + (ctx.doc.groups ?? []).length;
  return (
    <div className="min-h-0 flex-1 overflow-auto py-1 text-[12.5px]">
      <div className="flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-gray-700">
        <OIcon name="chevronDown" size={10} /> My Contacts
      </div>
      <div className="flex items-center justify-between bg-[#cfe4fa] py-[3px] pl-6 pr-2 font-semibold">
        <span>Contacts</span>
        <span className="text-[11px] font-normal text-gray-600">{n}</span>
      </div>
    </div>
  );
}

type Entry = { kind: "contact"; c: OlContact } | { kind: "group"; g: OlGroup };

function entries(ctx: Ctx, q: string): Entry[] {
  const t = q.trim().toLowerCase();
  const list: Entry[] = [
    ...sortedContacts(ctx.doc).map((c) => ({ kind: "contact" as const, c })),
    ...(ctx.doc.groups ?? []).map((g) => ({ kind: "group" as const, g })),
  ].sort((a, b) => (a.kind === "contact" ? fileAs(a.c) : a.g.name).localeCompare(b.kind === "contact" ? fileAs(b.c) : b.g.name));
  if (!t) return list;
  return list.filter((e) =>
    e.kind === "contact" ? `${e.c.name} ${e.c.company ?? ""} ${e.c.email ?? ""} ${e.c.phone ?? ""}`.toLowerCase().includes(t) : e.g.name.toLowerCase().includes(t),
  );
}

export function PeopleList({ ctx }: { ctx: Ctx }) {
  const [q, setQ] = useState("");
  const view = ctx.doc.peopleView ?? "People";
  const list = entries(ctx, q);
  const sel = selKeys(ctx.ui.selection);
  const keyOf = (e: Entry) => (e.kind === "contact" ? `contact:${e.c.id}` : `group:${e.g.id}`);
  const onMenu = (ev: React.MouseEvent, e: Entry) => {
    ev.preventDefault();
    ctx.select(keyOf(e));
    ctx.menu({ x: ev.clientX, y: ev.clientY }, e.kind === "contact" ? contactMenu(ctx, e.c) : contactMenu(ctx, e.g, true));
  };
  const rowProps = (e: Entry) => ({
    role: "option" as const,
    "aria-selected": sel.includes(keyOf(e)),
    onClick: () => ctx.select(keyOf(e)),
    onDoubleClick: () => ctx.cmd("item.open", keyOf(e)),
    onContextMenu: (ev: React.MouseEvent) => onMenu(ev, e),
  });
  let letter = "";
  return (
    <section aria-label="Contacts" className={`flex min-h-0 flex-col border-r border-gray-200 bg-white ${view === "List" || view === "Business Card" || view === "Card" || view === "Phone" ? "flex-1" : "w-72 shrink-0"}`}>
      <div className="flex items-center gap-1 border-b border-gray-200 px-2 py-1.5">
        <div className="flex flex-1 items-center gap-1 rounded border border-gray-300 px-1.5 focus-within:border-[#0f6cbd]">
          <OIcon name="search" size={13} className="text-gray-500" />
          <input aria-label="Search Contacts" placeholder="Search Contacts" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 py-1 text-[12px] outline-none" />
        </div>
      </div>
      <div role="listbox" aria-label="Contacts" tabIndex={0} className="min-h-0 flex-1 overflow-auto">
        {list.length === 0 && <p className="p-4 text-center text-[12px] text-gray-500">We couldn&apos;t find anyone by that name.</p>}
        {view === "List" || view === "Phone" ? (
          <table className="w-full text-[12px]">
            <thead className="sticky top-0 bg-[#faf9f8] text-left text-gray-600">
              <tr>
                <th className="px-2 py-1 font-normal">Full Name</th>
                <th className="px-2 py-1 font-normal">Company</th>
                <th className="px-2 py-1 font-normal">{view === "Phone" ? "Business Phone" : "E-mail"}</th>
                <th className="px-2 py-1 font-normal">Categories</th>
                <th className="px-2 py-1 font-normal">Flag</th>
              </tr>
            </thead>
            <tbody>
              {list.map((e) => (
                <tr key={keyOf(e)} {...rowProps(e)} className={`border-b border-gray-100 ${sel.includes(keyOf(e)) ? "bg-[#cfe4fa]" : "hover:bg-[#f3f2f1]"}`}>
                  <td className="px-2 py-1">{e.kind === "contact" ? e.c.name : `${e.g.name} (group)`}</td>
                  <td className="px-2 py-1">{e.kind === "contact" ? e.c.company : ""}</td>
                  <td className="px-2 py-1">{e.kind === "contact" ? (view === "Phone" ? e.c.phone : e.c.email) : ""}</td>
                  <td className="px-2 py-1"><CategoryChips doc={ctx.doc} cats={e.kind === "contact" ? e.c.categories : e.g.categories} compact /></td>
                  <td className="px-2 py-1">{e.kind === "contact" && e.c.flag && !e.c.flag.complete ? <OIcon name="flagFill" size={12} color="#c50f1f" /> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : view === "Business Card" || view === "Card" ? (
          <div className="flex flex-wrap gap-2 p-2">
            {list.map((e) => (
              <div key={keyOf(e)} {...rowProps(e)} className={`w-52 cursor-default border p-2 text-[11.5px] ${sel.includes(keyOf(e)) ? "border-[#0f6cbd] bg-[#eff6fc]" : "border-gray-300 hover:bg-[#f3f2f1]"}`}>
                <div className="mb-1 border-b border-gray-200 pb-1 text-[12.5px] font-semibold">{e.kind === "contact" ? fileAs(e.c) : e.g.name}</div>
                {e.kind === "contact" ? (
                  <>
                    <div>{e.c.company}</div>
                    <div>{e.c.jobTitle}</div>
                    <div>{e.c.phone && `${e.c.phone} Work`}</div>
                    <div className="truncate text-[#0563c1]">{e.c.email}</div>
                  </>
                ) : (
                  <div>{e.g.members.length} members</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          list.map((e) => {
            const name = e.kind === "contact" ? e.c.name : e.g.name;
            const L = (e.kind === "contact" ? fileAs(e.c) : e.g.name)[0]?.toUpperCase() ?? "#";
            const head = L !== letter ? L : "";
            if (head) letter = L;
            return (
              <div key={keyOf(e)}>
                {head && <div className="px-3 pb-0.5 pt-2 text-[12px] font-semibold" style={{ color: ctx.accent }}>{head}</div>}
                <div {...rowProps(e)} className={`flex cursor-default items-center gap-2 px-3 py-1.5 ${sel.includes(keyOf(e)) ? "bg-[#cfe4fa]" : "hover:bg-[#f3f2f1]"}`}>
                  {e.kind === "group" ? (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e1dfdd]"><OIcon name="group" size={18} /></span>
                  ) : (
                    <Avatar name={name} size={32} />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px]">{name}</span>
                    <span className="block truncate text-[11.5px] text-gray-500">{e.kind === "contact" ? [e.c.jobTitle, e.c.company].filter(Boolean).join(", ") : `Contact group · ${e.g.members.length} members`}</span>
                  </span>
                  {e.kind === "contact" && e.c.flag && !e.c.flag.complete && <OIcon name="flagFill" size={12} color="#c50f1f" />}
                  <CategoryChips doc={ctx.doc} cats={e.kind === "contact" ? e.c.categories : e.g.categories} compact />
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

function Field({ label, value, link }: { label: string; value?: string; link?: boolean }) {
  if (!value) return null;
  return (
    <div className="mb-1.5">
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className={`whitespace-pre-wrap text-[12.5px] ${link ? "text-[#0563c1]" : ""}`}>{value}</div>
    </div>
  );
}

export function ContactCard({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const k = selKeys(ctx.ui.selection)[0] ?? "";
  const c = k.startsWith("contact:") ? (doc.contacts ?? []).find((x) => x.id === k.slice(8)) : undefined;
  const g = k.startsWith("group:") ? (doc.groups ?? []).find((x) => x.id === k.slice(6)) : undefined;
  const view = doc.peopleView ?? "People";
  if (view !== "People") return null;
  if (g)
    return (
      <article aria-label={`Contact group ${g.name}`} className="min-h-0 flex-1 overflow-auto bg-white p-4">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e1dfdd]"><OIcon name="group" size={30} /></span>
          <div>
            <h2 className="text-[18px] font-semibold">{g.name}</h2>
            <p className="text-[12px] text-gray-600">Contact group · {g.members.length} members</p>
          </div>
        </div>
        <button type="button" onClick={() => ctx.cmd("item.open", `group:${g.id}`)} className="mb-3 rounded border border-gray-300 px-2 py-1 text-[12px] hover:bg-gray-100">Edit group</button>
        <h3 className="mb-1 text-[12px] font-semibold text-gray-700">Members</h3>
        {g.members.map((m) => {
          const p = people(doc).find((x) => x.email.toLowerCase() === m.toLowerCase());
          return (
            <div key={m} className="flex items-center gap-2 py-1 text-[12.5px]">
              <Avatar name={p?.name ?? m} size={24} />
              <span>{p?.name ?? m}</span>
              <span className="text-gray-500">{m}</span>
            </div>
          );
        })}
        <CategoryChips doc={doc} cats={g.categories} />
      </article>
    );
  if (!c)
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-white text-[13px] text-gray-500">
        <OIcon name="person" size={44} className="mb-2 text-gray-300" />
        Select a contact to see their details
      </div>
    );
  const acts = (c.activities ?? []).slice().sort((a, b) => b.date.localeCompare(a.date));
  const btn = "flex items-center gap-1 rounded border border-gray-300 bg-white px-2 py-1 text-[12px] hover:bg-[#f3f2f1]";
  return (
    <article aria-label={`Contact ${c.name}`} className="min-h-0 flex-1 overflow-auto bg-white p-4">
      <div className="mb-3 flex items-center gap-3">
        <Avatar name={c.name} size={56} />
        <div className="min-w-0">
          <h2 className="text-[19px] font-semibold leading-tight">{c.name}</h2>
          <p className="text-[12.5px] text-gray-600">{[c.jobTitle, c.company].filter(Boolean).join(", ")}</p>
          <CategoryChips doc={doc} cats={c.categories} />
        </div>
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <button type="button" className={btn} onClick={() => ctx.cmd("contact.emailTo")}><OIcon name="mail" size={13} /> Email</button>
        <button type="button" className={btn} onClick={() => ctx.cmd("contact.meetingWith")}><OIcon name="calendar" size={13} /> Meeting</button>
        <button type="button" className={btn} onClick={() => ctx.cmd("contact.logActivity", c.id)}><OIcon name="notes" size={13} /> Log activity</button>
        <button type="button" className={btn} onClick={() => ctx.cmd("item.open", `contact:${c.id}`)}><OIcon name="edit" size={13} /> Edit</button>
      </div>
      {c.flag && (
        <div className={`mb-3 flex items-center gap-2 border px-2 py-1 text-[12px] ${c.flag.complete ? "border-gray-200 bg-[#f3f2f1]" : "border-[#f7e28c] bg-[#fff4ce]"}`}>
          <OIcon name={c.flag.complete ? "check" : "flag"} size={13} />
          {c.flag.complete ? "Follow up completed." : `${c.flag.label && !["Today", "Tomorrow", "This Week", "Next Week", "No Date"].includes(c.flag.label) ? c.flag.label : "Follow up"}.${c.flag.due ? ` Due by ${fmtLong(c.flag.due)}.` : ""}`}
        </div>
      )}
      <div className="grid gap-x-6 sm:grid-cols-2">
        <section>
          <h3 className="mb-1 border-b border-gray-200 pb-0.5 text-[12px] font-semibold text-gray-700">Contact</h3>
          <Field label="Work email" value={c.email} link />
          <Field label="Work phone" value={c.phone} />
          <Field label="Mobile" value={c.mobile} />
          <Field label="Work address" value={c.address} />
          <Field label="Company" value={c.company} />
        </section>
        <section>
          <h3 className="mb-1 border-b border-gray-200 pb-0.5 text-[12px] font-semibold text-gray-700">Notes</h3>
          <p className="whitespace-pre-wrap text-[12.5px] text-gray-800">{c.notes || <span className="text-gray-400">No notes.</span>}</p>
        </section>
      </div>
      <section className="mt-3">
        <div className="mb-1 flex items-center justify-between border-b border-gray-200 pb-0.5">
          <h3 className="text-[12px] font-semibold text-gray-700">Activity</h3>
          <button type="button" onClick={() => ctx.cmd("contact.logActivity", c.id)} className="text-[12px] text-[#0563c1] hover:underline">+ Log activity</button>
        </div>
        {acts.length === 0 && <p className="text-[12px] text-gray-400">No activity logged yet.</p>}
        <ol className="space-y-2">
          {acts.map((a) => (
            <li key={a.id} className="border-l-2 pl-2 text-[12px]" style={{ borderColor: ctx.accent }}>
              <div className="flex items-center gap-2">
                <OIcon name={a.type === "Phone Call" ? "phone" : a.type === "Email" ? "mail" : a.type === "Meeting" ? "calendar" : a.type === "Document" ? "file" : "notes"} size={13} />
                <span className="font-semibold">{a.type}</span>
                <span className="text-gray-500">{fmtDate(a.date)}</span>
              </div>
              <p className="whitespace-pre-wrap text-gray-800">{a.summary}</p>
              {a.next && <p className="text-gray-700"><span className="font-semibold">Next step:</span> {a.next}</p>}
              {a.due && <p className="text-gray-700"><span className="font-semibold">Follow-up:</span> {fmtLong(a.due)}</p>}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

/** Log Activity dialog (journal entry on a contact). */
export function ActivityDialog({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const c = (doc.contacts ?? []).find((x) => x.id === doc.dialogArg);
  const [type, setType] = useState("Phone Call");
  const [date, setDate] = useState(fmtDate(todayOf(doc)));
  const [summary, setSummary] = useState("");
  const [next, setNext] = useState("");
  const [due, setDue] = useState("");
  const [err, setErr] = useState("");
  if (!c) return null;
  const close = () => ctx.cmd("dialog.close");
  const save = () => {
    const d = parseUsDate(date);
    const dd = due.trim() ? parseUsDate(due) : null;
    if (!d) return setErr("Type the date as M/D/YYYY, for example 10/20/2026.");
    if (due.trim() && !dd) return setErr("Type the follow-up date as M/D/YYYY, or leave it blank.");
    if (!summary.trim()) return setErr("Add a short summary of what happened.");
    setErr("");
    ctx.commit({ kind: "type", target: `contact:${c.id}.activity`, value: serializeActivity({ type, date: d, summary, next, due: dd ?? undefined }) });
  };
  const lab = "mb-0.5 block text-[12px] text-gray-700";
  return (
    <Modal title={`Log Activity - ${c.name}`} width={460} onClose={close} footer={<><DlgButton primary onClick={save}>Save</DlgButton><DlgButton onClick={close}>Cancel</DlgButton></>}>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className={lab}>Activity type:</span>
          <select aria-label="Activity type" value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-gray-400 bg-white px-1 py-0.5">
            {ACTIVITY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={lab}>Date:</span>
          <input aria-label="Activity date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-400 px-1 py-0.5" />
        </label>
      </div>
      <label className="mt-2 block">
        <span className={lab}>Summary (who, what was discussed, what was agreed):</span>
        <textarea aria-label="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full resize-none border border-gray-400 p-1" />
      </label>
      <label className="mt-2 block">
        <span className={lab}>Next step (who does what):</span>
        <input aria-label="Next step" value={next} onChange={(e) => setNext(e.target.value)} className="w-full border border-gray-400 px-1 py-0.5" />
      </label>
      <label className="mt-2 block">
        <span className={lab}>Follow-up due date (flags the contact):</span>
        <input aria-label="Follow-up due date" placeholder="M/D/YYYY" value={due} onChange={(e) => setDue(e.target.value)} className="w-40 border border-gray-400 px-1 py-0.5" />
      </label>
      {err && <p className="mt-2 text-[12px] text-[#a4262c]">{err}</p>}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export function ContactForm({ ctx }: { ctx: Ctx }) {
  const f = ctx.doc.form!;
  const d = ctx.fdraft;
  if (!d) return null;
  const input = (key: "name" | "company" | "jobTitle" | "email" | "phone" | "mobile" | "address", label: string, multi?: boolean) => (
    <div className="flex items-start gap-2 py-[3px]">
      <label htmlFor={`ct-${key}`} className="w-24 shrink-0 pt-0.5 text-[12px] text-gray-700">{label}</label>
      {multi ? (
        <textarea id={`ct-${key}`} rows={2} value={d[key]} onChange={(e) => ctx.setFdraft({ [key]: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 resize-none border border-gray-300 px-1 py-0.5 text-[12.5px] outline-none focus:border-[#0f6cbd]" />
      ) : (
        <input id={`ct-${key}`} value={d[key]} onChange={(e) => ctx.setFdraft({ [key]: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 border border-gray-300 px-1 py-0.5 text-[12.5px] outline-none focus:border-[#0f6cbd]" />
      )}
    </div>
  );
  const flag = f.data.flag;
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white" aria-label="Contact">
      <div className="flex items-center justify-end border-b border-gray-200 px-2 py-0.5">
        <button type="button" aria-label="Close" onClick={() => ctx.cmd("form.close")} className="rounded p-1 text-gray-600 hover:bg-red-600 hover:text-white">
          <OIcon name="close" size={12} />
        </button>
      </div>
      {flag && !flag.complete && (
        <div className="flex items-center gap-2 border-b border-[#f7e28c] bg-[#fff4ce] px-3 py-1 text-[12px]">
          <OIcon name="flag" size={13} /> Follow up.{flag.due ? ` Due by ${fmtLong(flag.due)}.` : ""}
        </div>
      )}
      <div className="flex min-h-0 flex-1 gap-4 overflow-auto p-3">
        <div className="min-w-0 flex-1">
          {input("name", "Full Name...")}
          {input("company", "Company")}
          {input("jobTitle", "Job title")}
          <div className="flex items-center gap-2 py-[3px] text-[12px] text-gray-500">
            <span className="w-24 shrink-0">File as</span>
            <span>{d.name ? fileAs({ name: d.name }) : ""}</span>
          </div>
          <h4 className="mt-2 border-b border-gray-200 text-[11.5px] font-semibold text-gray-600">Internet</h4>
          {input("email", "E-mail...")}
          <div className="flex items-center gap-2 py-[3px] text-[12px] text-gray-500">
            <span className="w-24 shrink-0">Display as</span>
            <span className="truncate">{d.name && d.email ? `${d.name} (${d.email})` : ""}</span>
          </div>
          <h4 className="mt-2 border-b border-gray-200 text-[11.5px] font-semibold text-gray-600">Phone numbers</h4>
          {input("phone", "Business...")}
          {input("mobile", "Mobile...")}
          <h4 className="mt-2 border-b border-gray-200 text-[11.5px] font-semibold text-gray-600">Addresses</h4>
          {input("address", "Business...", true)}
        </div>
        <div className="hidden w-64 shrink-0 flex-col sm:flex">
          <div className="mb-2 border border-gray-300 p-2 text-[11.5px] shadow-sm">
            <div className="flex gap-2">
              <Avatar name={d.name || "?"} size={40} />
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold">{d.name || "Full Name"}</div>
                <div className="truncate">{d.company}</div>
                <div className="truncate">{d.jobTitle}</div>
                <div className="truncate">{d.phone && `${d.phone} Work`}</div>
                <div className="truncate text-[#0563c1]">{d.email}</div>
              </div>
            </div>
          </div>
          <label htmlFor="ct-notes" className="text-[12px] text-gray-700">Notes</label>
          <textarea id="ct-notes" value={d.notes} onChange={(e) => ctx.setFdraft({ notes: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-h-[120px] flex-1 resize-none border border-gray-300 p-1 text-[12.5px] outline-none focus:border-[#0f6cbd]" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact group form                                                  */
/* ------------------------------------------------------------------ */

export function GroupForm({ ctx }: { ctx: Ctx }) {
  const d = ctx.fdraft;
  if (!d) return null;
  const all = people(ctx.doc);
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white" aria-label="Contact Group">
      <div className="flex items-center justify-end border-b border-gray-200 px-2 py-0.5">
        <button type="button" aria-label="Close" onClick={() => ctx.cmd("form.close")} className="rounded p-1 text-gray-600 hover:bg-red-600 hover:text-white">
          <OIcon name="close" size={12} />
        </button>
      </div>
      <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2">
        <label htmlFor="grp-name" className="w-14 text-[12px] text-gray-700">Name</label>
        <input id="grp-name" value={d.name} onChange={(e) => ctx.setFdraft({ name: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 border border-gray-300 px-1 py-0.5 text-[12.5px] outline-none focus:border-[#0f6cbd]" />
      </div>
      <div className="px-3 py-1">
        <RecipientField ctx={ctx} label="Add" tokens={[]} pending={d.pending.required} onTokens={(t) => ctx.setFdraft({ members: Array.from(new Set([...d.members, ...t])), pending: { ...d.pending, required: "" } })} onPending={(s) => ctx.setFdraft({ pending: { ...d.pending, required: s } })} onButton={() => ctx.cmd("group.addMembers")} />
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-3">
        <table className="w-full text-[12.5px]">
          <thead className="text-left text-[11.5px] text-gray-600">
            <tr className="border-b border-gray-200">
              <th className="py-1 font-normal">Name</th>
              <th className="py-1 font-normal">E-mail</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {d.members.length === 0 && (
              <tr>
                <td colSpan={3} className="py-3 text-center text-gray-500">There are no members in this group. Use Add Members to add people.</td>
              </tr>
            )}
            {d.members.map((m) => (
              <tr key={m} className="border-b border-gray-100">
                <td className="py-1">{all.find((p) => p.email.toLowerCase() === m.toLowerCase())?.name ?? m}</td>
                <td className="py-1 text-gray-600">{m}</td>
                <td className="py-1 text-right">
                  <button type="button" aria-label={`Remove ${m}`} onClick={() => ctx.setFdraft({ members: d.members.filter((x) => x !== m) })} className="rounded px-1 text-gray-500 hover:bg-gray-200">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
