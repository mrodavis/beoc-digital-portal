"use client";

import { useState } from "react";
import type { OlContact, OlGroup } from "../types";
import { Avatar, OIcon } from "../parts";
import { people, selIds, sortedContacts } from "../model";
import type { NCtx } from "./mailNew";
import { NMenuButton, inputCls } from "./ui";
import type { NEntry } from "./ui";
import { resolveToken, suggestionsFor } from "../mail";

/** Delete asks first, as in new Outlook ("Delete" again to confirm). Deleting a list keeps the contacts. */
export function askDeletePerson(ctx: NCtx, key?: string) {
  const doc = ctx.doc;
  const sel = key ?? ctx.ui.selection;
  const c = (doc.contacts ?? []).find((x) => selIds(sel, "contact").includes(x.id));
  const g = (doc.groups ?? []).find((x) => selIds(sel, "group").includes(x.id));
  if (!c && !g) return ctx.cmd("item.delete");
  ctx.alert({
    title: c ? "Delete contact?" : "Delete contact list?",
    text: c ? `${c.name} will be deleted from your contacts.` : `The list "${g!.name}" will be deleted. The contacts in it won't be deleted.`,
    buttons: [{ label: "Delete", primary: true, onClick: () => ctx.cmd("item.delete") }, { label: "Cancel" }],
  });
}

function personMenu(ctx: NCtx, key: string): NEntry[] {
  const doc = ctx.doc;
  const isContact = key.startsWith("contact:");
  return [
    { label: "Email", icon: "mail", cmd: "contact.emailTo", onPick: () => ctx.cmd("contact.emailTo") },
    ...(isContact
      ? [
          {
            label: "Add to list",
            icon: "group",
            sub: [
              { label: "New contact list", icon: "plus", cmd: "people.addToList", val: "New contact list", onPick: () => ctx.cmd("people.addToList", "New contact list") },
              ...(doc.groups ?? []).map((g) => ({ label: g.name, icon: "group", cmd: "people.addToList", val: g.name, onPick: () => ctx.cmd("people.addToList", g.name) })),
            ],
          } as NEntry,
        ]
      : []),
    { label: isContact ? "Edit contact" : "Edit", icon: "edit", cmd: "contact.edit", onPick: () => ctx.cmd("contact.edit") },
    { label: "Delete", icon: "trash", onPick: () => askDeletePerson(ctx, key) },
  ];
}

/* ------------------------------------------------------------------ */
/* People: contacts and contact lists                                  */
/* ------------------------------------------------------------------ */

export function PeoplePaneNew({ ctx, view, setView }: { ctx: NCtx; view: "contacts" | "lists"; setView: (v: "contacts" | "lists") => void }) {
  const row = (key: "contacts" | "lists", label: string, icon: string, n: number) => (
    <button
      type="button"
      data-peopleview={key}
      onClick={() => setView(key)}
      className={`relative mx-1 flex w-[calc(100%-8px)] items-center gap-2 rounded-[4px] px-2.5 py-[6px] text-left text-[13px] ${view === key ? "bg-[#d6e7f8] font-semibold" : "hover:bg-[#ebebeb]"}`}
    >
      {view === key && <span className="absolute left-0 top-1.5 h-4 w-[3px] rounded-full bg-[#0f6cbd]" />}
      <OIcon name={icon} size={15} className="text-gray-600" />
      <span className="flex-1">{label}</span>
      <span className="text-[12px] text-gray-500">{n}</span>
    </button>
  );
  return (
    <div className="min-h-0 flex-1 overflow-auto py-2">
      <button
        type="button"
        data-c="people.newContact"
        onClick={() => ctx.cmd("people.newContact")}
        className="mx-2 mb-3 flex w-[calc(100%-16px)] items-center justify-center gap-1.5 rounded-[4px] bg-[#0f6cbd] py-1.5 text-[13px] font-semibold text-white hover:bg-[#115ea3]"
      >
        <OIcon name="personAdd" size={15} /> New contact
      </button>
      <div className="px-3 pb-1 text-[12px] font-semibold text-gray-600">Contacts</div>
      {row("contacts", "All contacts", "person", (ctx.doc.contacts ?? []).length)}
      {row("lists", "All contact lists", "group", (ctx.doc.groups ?? []).length)}
    </div>
  );
}

export function PeopleListNew({ ctx, view }: { ctx: NCtx; view: "contacts" | "lists" }) {
  const doc = ctx.doc;
  const [q, setQ] = useState("");
  const sel = ctx.ui.selection;
  const ctxRef = ctx;
  const contacts = sortedContacts(doc).filter((c) => !q || `${c.name} ${c.email ?? ""} ${c.company ?? ""}`.toLowerCase().includes(q.toLowerCase()));
  const groups = (doc.groups ?? []).filter((g) => !q || g.name.toLowerCase().includes(q.toLowerCase()));
  const item = (key: string, name: string, sub: string, icon?: string) => (
    <button
      key={key}
      type="button"
      data-sel={key}
      onClick={() => ctx.select(key)}
      onDoubleClick={() => ctx.cmd("item.open", key)}
      onContextMenu={(ev) => {
        ev.preventDefault();
        ctx.select(key);
        const at = { x: ev.clientX, y: ev.clientY };
        setTimeout(() => ctxRef.nmenu(at, personMenu(ctxRef, key)), 0);
      }}
      className={`mx-1 flex w-[calc(100%-8px)] items-center gap-2.5 rounded-[4px] px-2 py-2 text-left text-[13px] ${sel === key ? "bg-[#d6e7f8]" : "hover:bg-[#f0f0f0]"}`}
    >
      {icon ? <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ebf3fc] text-[#0f6cbd]"><OIcon name={icon} size={16} /></span> : <Avatar name={name} size={32} />}
      <span className="min-w-0">
        <span className="block truncate font-semibold">{name}</span>
        <span className="block truncate text-[12px] text-gray-500">{sub}</span>
      </span>
    </button>
  );
  return (
    <section aria-label={view === "lists" ? "Contact lists" : "Contacts"} className="flex w-[300px] min-w-0 shrink-0 flex-col rounded-lg bg-white shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]">
      <div className="border-b border-gray-200 p-2">
        <input aria-label="Search contacts" placeholder="Search contacts" value={q} onChange={(ev) => setQ(ev.target.value)} onKeyDown={(ev) => ev.stopPropagation()} className={inputCls} />
      </div>
      <div className="min-h-0 flex-1 overflow-auto py-1">
        {view === "contacts"
          ? contacts.map((c) => item(`contact:${c.id}`, c.name, c.email ?? c.company ?? ""))
          : groups.map((g) => item(`group:${g.id}`, g.name, `${g.members.length} member${g.members.length === 1 ? "" : "s"}`, "group"))}
        {view === "contacts" && !contacts.length && <p className="p-4 text-center text-[12.5px] text-gray-500">No contacts to show.</p>}
        {view === "lists" && !groups.length && <p className="p-4 text-center text-[12.5px] text-gray-500">No contact lists yet. Select a contact, then Add to list › New contact list.</p>}
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="mb-2">
      <div className="text-[12px] text-gray-500">{label}</div>
      <div className="text-[13px]">{value}</div>
    </div>
  );
}

export function ContactDetailsNew({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const cid = selIds(ctx.ui.selection, "contact")[0];
  const gid = selIds(ctx.ui.selection, "group")[0];
  const c: OlContact | undefined = (doc.contacts ?? []).find((x) => x.id === cid);
  const g: OlGroup | undefined = (doc.groups ?? []).find((x) => x.id === gid);
  const nameOf = (t: string) => people(doc).find((p) => p.email.toLowerCase() === t.toLowerCase())?.name ?? t;
  const btn = "flex items-center gap-1.5 rounded-[4px] border border-gray-300 px-2.5 py-1 text-[12.5px] hover:bg-gray-50";
  if (!c && !g)
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg bg-white text-[13px] text-gray-500 shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]">
        Select a contact to see the details
      </div>
    );
  return (
    <section aria-label="Contact details" className="min-h-0 flex-1 overflow-auto rounded-lg bg-white p-5 shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]">
      <div className="mb-4 flex items-center gap-3">
        {c ? <Avatar name={c.name} size={56} /> : <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ebf3fc] text-[#0f6cbd]"><OIcon name="group" size={26} /></span>}
        <div>
          <h2 className="text-[20px] font-semibold">{c?.name ?? g?.name}</h2>
          {c?.jobTitle || c?.company ? <p className="text-[13px] text-gray-600">{[c.jobTitle, c.company].filter(Boolean).join(", ")}</p> : null}
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <button type="button" className={btn} data-c="contact.emailTo" onClick={() => ctx.cmd("contact.emailTo")}>
          <OIcon name="mail" size={14} /> Email
        </button>
        {c && (
          <NMenuButton
            dd="people.addToList"
            ariaLabel="Add to list"
            items={[
              { label: "New contact list", icon: "plus", cmd: "people.addToList", val: "New contact list", onPick: () => ctx.cmd("people.addToList", "New contact list") },
              ...(doc.groups ?? []).map((g) => ({ label: g.name, icon: "group", cmd: "people.addToList", val: g.name, onPick: () => ctx.cmd("people.addToList", g.name) })),
            ]}
            className={btn}
          >
            <OIcon name="group" size={14} /> Add to list
          </NMenuButton>
        )}
        <button type="button" className={btn} data-c="contact.edit" onClick={() => ctx.cmd("contact.edit")}>
          <OIcon name="edit" size={14} /> {c ? "Edit contact" : "Edit"}
        </button>
        <button type="button" className={btn} data-delask="1" onClick={() => askDeletePerson(ctx)}>
          <OIcon name="trash" size={14} /> Delete
        </button>
      </div>
      {c && (
        <>
          <Field label="Email" value={c.email} />
          <Field label="Phone" value={c.phone} />
          <Field label="Mobile" value={c.mobile} />
          <Field label="Company" value={c.company} />
          <Field label="Job title" value={c.jobTitle} />
          <Field label="Address" value={c.address} />
          <Field label="Notes" value={c.notes} />
        </>
      )}
      {g && (
        <>
          <div className="mb-1 text-[12px] text-gray-500">Members ({g.members.length})</div>
          {g.members.map((m) => (
            <div key={m} className="flex items-center gap-2 py-1 text-[13px]">
              <Avatar name={nameOf(m)} size={24} /> {nameOf(m)} <span className="text-gray-500">{m}</span>
            </div>
          ))}
          <Field label="Description" value={g.notes} />
        </>
      )}
    </section>
  );
}

/** Add contact / Edit contact. Saves with the classic "contact.save" dialog commit. */
export function ContactFormNew({ ctx }: { ctx: NCtx }) {
  // The form draft is created right after the form opens; render nothing for that one frame.
  if (!ctx.doc.form || !ctx.fdraft) return null;
  return <ContactFormBody ctx={ctx} key={ctx.doc.form.id ?? "new"} />;
}

function ContactFormBody({ ctx }: { ctx: NCtx }) {
  const f = ctx.doc.form!;
  const d = ctx.fdraft!;
  const parts = d.name.trim().split(/\s+/);
  const [first, setFirst] = useState(parts.length > 1 ? parts.slice(0, -1).join(" ") : parts[0] ?? "");
  const [last, setLast] = useState(parts.length > 1 ? parts[parts.length - 1] : "");
  const setName = (fi: string, la: string) => ctx.setFdraft({ name: `${fi} ${la}`.trim() });
  const row = (label: string, key: keyof typeof d, f2: string) => (
    <label className="mb-2.5 flex flex-col gap-1 text-[13px]">
      <span className="font-semibold">{label}</span>
      <input data-f={f2} value={String(d[key] ?? "")} onChange={(ev) => ctx.setFdraft({ [key]: ev.target.value } as never)} onKeyDown={(ev) => ev.stopPropagation()} className={inputCls} />
    </label>
  );
  return (
    <section aria-label={f.id ? "Edit contact" : "Add contact"} className="min-h-0 flex-1 overflow-auto rounded-lg bg-white p-5 shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]">
      <h2 className="mb-4 text-[18px] font-semibold">{f.id ? "Edit contact" : "Add contact"}</h2>
      <div className="grid max-w-[560px] grid-cols-2 gap-x-3">
        <label className="mb-2.5 flex flex-col gap-1 text-[13px]">
          <span className="font-semibold">First name</span>
          <input data-f="firstName" value={first} onChange={(ev) => { setFirst(ev.target.value); setName(ev.target.value, last); }} onKeyDown={(ev) => ev.stopPropagation()} className={inputCls} />
        </label>
        <label className="mb-2.5 flex flex-col gap-1 text-[13px]">
          <span className="font-semibold">Last name</span>
          <input data-f="lastName" value={last} onChange={(ev) => { setLast(ev.target.value); setName(first, ev.target.value); }} onKeyDown={(ev) => ev.stopPropagation()} className={inputCls} />
        </label>
      </div>
      <div className="max-w-[560px]">
        {row("Email", "email", "email")}
        {row("Phone number", "phone", "phone")}
        {row("Company", "company", "company")}
        {row("Job title", "jobTitle", "jobTitle")}
        {row("Address", "address", "address")}
        <label className="mb-2.5 flex flex-col gap-1 text-[13px]">
          <span className="font-semibold">Notes</span>
          <textarea data-t="form.notes" value={d.notes} onChange={(ev) => ctx.setFdraft({ notes: ev.target.value })} onKeyDown={(ev) => ev.stopPropagation()} className={`${inputCls} min-h-[60px]`} />
        </label>
      </div>
      <div className="mt-2 flex gap-2">
        <button type="button" data-c="contact.saveClose" onClick={() => ctx.saveForm()} className="rounded-[4px] bg-[#0f6cbd] px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#115ea3]">
          Save
        </button>
        <button type="button" data-c="form.close" onClick={() => ctx.cmd("form.close")} className="rounded-[4px] border border-gray-300 px-4 py-1.5 text-[13px] hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </section>
  );
}

/** New contact list. Saves with "group.members" then "group.save". */
export function GroupFormNew({ ctx }: { ctx: NCtx }) {
  if (!ctx.doc.form || !ctx.fdraft) return null;
  return <GroupFormBody ctx={ctx} />;
}

function GroupFormBody({ ctx }: { ctx: NCtx }) {
  const f = ctx.doc.form!;
  const d = ctx.fdraft!;
  const [pending, setPending] = useState("");
  const [focus, setFocus] = useState(false);
  const sugg = focus ? suggestionsFor(ctx, pending) : [];
  const add = (t: string) => {
    if (!d.members.some((x) => x.toLowerCase() === t.toLowerCase())) ctx.setFdraft({ members: [...d.members, t] });
    setPending("");
  };
  const nameOf = (t: string) => people(ctx.doc).find((p) => p.email.toLowerCase() === t.toLowerCase())?.name ?? t;
  return (
    <section aria-label="New contact list" className="min-h-0 flex-1 overflow-auto rounded-lg bg-white p-5 shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]">
      <h2 className="mb-4 text-[18px] font-semibold">{f.id ? "Edit contact list" : "New contact list"}</h2>
      <div className="max-w-[560px]">
        <label className="mb-3 flex flex-col gap-1 text-[13px]">
          <span className="font-semibold">Contact list name</span>
          <input data-f="name" value={d.name} onChange={(ev) => ctx.setFdraft({ name: ev.target.value })} onKeyDown={(ev) => ev.stopPropagation()} className={inputCls} />
        </label>
        <div className="mb-1 text-[13px] font-semibold">Add email addresses</div>
        <div className="relative mb-2 flex min-h-[34px] flex-wrap items-center gap-1 rounded-[4px] border border-gray-300 px-2 py-1">
          {d.members.map((m) => (
            <span key={m} className="flex items-center gap-1 rounded-full bg-[#ebf3fc] py-[1px] pl-0.5 pr-2 text-[12.5px]">
              <Avatar name={nameOf(m)} size={18} />
              {nameOf(m)}
              <button type="button" aria-label={`Remove ${nameOf(m)}`} onClick={() => ctx.setFdraft({ members: d.members.filter((x) => x !== m) })} className="text-gray-500">
                ×
              </button>
            </span>
          ))}
          <input
            aria-label="Add email addresses"
            data-t="group.members"
            value={pending}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              setTimeout(() => setFocus(false), 150);
              const r = pending.trim() ? resolveToken(ctx, pending) : null;
              if (r) add(r);
            }}
            onChange={(ev) => setPending(ev.target.value)}
            onKeyDown={(ev) => {
              ev.stopPropagation();
              if ((ev.key === "Enter" || ev.key === ";") && pending.trim()) {
                const r = sugg[0]?.token ?? resolveToken(ctx, pending);
                if (r) {
                  ev.preventDefault();
                  add(r);
                }
              }
            }}
            className="min-w-[140px] flex-1 text-[13px] outline-none"
          />
          {sugg.length > 0 && (
            <div className="absolute left-0 top-full z-40 mt-1 w-80 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              {sugg.map((s) => (
                <button key={s.token} type="button" onMouseDown={(ev) => { ev.preventDefault(); add(s.token); }} className="flex w-full items-center gap-2 px-2.5 py-1 text-left text-[12.5px] hover:bg-[#ebf3fc]">
                  <Avatar name={s.label} size={22} />
                  <span className="min-w-0">
                    <span className="block truncate">{s.label}</span>
                    <span className="block truncate text-[11px] text-gray-500">{s.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <label className="mb-3 flex flex-col gap-1 text-[13px]">
          <span className="font-semibold">Description</span>
          <textarea data-t="form.notes" value={d.notes} onChange={(ev) => ctx.setFdraft({ notes: ev.target.value })} onKeyDown={(ev) => ev.stopPropagation()} className={`${inputCls} min-h-[60px]`} />
        </label>
      </div>
      <div className="flex gap-2">
        <button type="button" data-c="group.saveClose" onClick={() => ctx.saveForm()} className="rounded-[4px] bg-[#0f6cbd] px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#115ea3]">
          {f.id ? "Save" : "Create"}
        </button>
        <button type="button" data-c="form.close" onClick={() => ctx.cmd("form.close")} className="rounded-[4px] border border-gray-300 px-4 py-1.5 text-[13px] hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </section>
  );
}
