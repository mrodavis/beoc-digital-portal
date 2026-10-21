"use client";

import { useEffect, useRef, useState } from "react";
import { FolderIcon, GIcon } from "./icons";
import { fileOf, meOf, personOf } from "./model";
import type { GFile, GRole } from "./types";
import { Avatar, FONT, IconBtn, MenuList, Modal, PillBtn, Popup, TEXT_FONT, useG, type MenuPos } from "./ui";

const ROLES: GRole[] = ["Viewer", "Commenter", "Editor"];

function fmtDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}

/** Google's Share dialog: add people with a role, people with access, and general access. */
export function ShareDialog({ fileId, onClose }: { fileId: string; onClose: () => void }) {
  const g = useG();
  const f = fileOf(g.doc, fileId) as GFile | undefined;
  const [query, setQuery] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [role, setRole] = useState<GRole>("Editor");
  const [notify, setNotify] = useState(true);
  const [message, setMessage] = useState("");
  const [menu, setMenu] = useState<{ kind: "person" | "access" | "linkRole" | "addRole"; email?: string; pos: MenuPos } | null>(null);
  const [expiring, setExpiring] = useState<{ email: string; date: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  if (!f) return null;
  const me = meOf(g.doc);
  const owner = personOf(g.doc, f.owner) ?? (f.owner ? { name: f.owner.split("@")[0], email: f.owner } : me);
  const iOwn = owner.email === me.email;
  const sh = f.sharing ?? {};
  const access = sh.access ?? "Restricted";
  const org = g.doc.org ?? { name: "Lakeside Medical Associates", domain: "lakesidemedical.example" };
  const people = g.doc.people ?? [];
  const suggestions = query.trim()
    ? people.filter((p) => !chips.includes(p.email) && (p.name.toLowerCase().includes(query.trim().toLowerCase()) || p.email.toLowerCase().includes(query.trim().toLowerCase()))).slice(0, 5)
    : [];
  const addChip = (email: string) => {
    const e = email.trim().replace(/[,;]$/, "");
    if (!e) return;
    const p = personOf(g.doc, e);
    const v = p?.email ?? e;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return;
    setChips((c) => (c.includes(v) ? c : [...c, v]));
    setQuery("");
  };
  const send = () => {
    const all = query.trim() ? [...chips, personOf(g.doc, query.trim())?.email ?? query.trim()] : chips;
    if (!all.length) return;
    g.onCommit({ kind: "dialog", id: "g.share", values: { file: f.id, email: all.slice().sort().join(", "), role, notify, message } });
    onClose();
  };
  const external = (email: string) => !email.toLowerCase().endsWith(`@${org.domain}`);

  const accessLabel = access === "Organization" ? org.name : access;
  const accessHelp = access === "Restricted" ? "Only people with access can open with the link" : access === "Organization" ? `Anyone in this group with the link can ${sh.linkRole === "Editor" ? "edit" : sh.linkRole === "Commenter" ? "comment" : "view"}` : `Anyone on the internet with the link can ${sh.linkRole === "Editor" ? "edit" : sh.linkRole === "Commenter" ? "comment" : "view"}`;

  const roleMenu = (current: GRole, email?: string): { label: string; command?: string; value?: string; check?: string; icon?: string }[] => [
    ...ROLES.map((r) => ({ label: r, value: r, check: r === current ? "on" : undefined })),
    // Access expiration is for eligible work and school accounts.
    ...(email ? [...(g.doc.org ? [{ label: "Add expiration", value: "Add expiration", icon: "recent" }] : []), { label: "Remove access", value: "Remove access" }] : []),
  ];

  const adding = chips.length > 0;
  return (
    <Modal
      title={
        adding ? (
          <span className="flex items-center gap-2">
            <IconBtn icon="back" label="Back" onClick={() => { setChips([]); setQuery(""); }} />
            Share “{f.name}”
          </span>
        ) : (
          <>Share “{f.name}”</>
        )
      }
      onClose={onClose}
      width={560}
      footer={
        adding ? (
          <>
            <PillBtn kind="text" onClick={() => { setChips([]); setQuery(""); }}>Cancel</PillBtn>
            <PillBtn onClick={send}>{notify ? "Send" : "Share"}</PillBtn>
          </>
        ) : (
          <div className="flex w-full items-center">
            <PillBtn kind="outlined" onClick={() => g.cmd("g.copyLink", f.id)}>
              <GIcon name="link" size={18} color="#0b57d0" /> Copy link
            </PillBtn>
            <span className="flex-1" />
            <PillBtn onClick={onClose}>Done</PillBtn>
          </div>
        )
      }
    >
      <div style={{ fontFamily: TEXT_FONT }}>
        <div className="flex gap-2">
          <div className={`relative flex min-h-[48px] flex-1 flex-wrap items-center gap-1 rounded border px-2 py-1 ${adding ? "border-2 border-[#0b57d0]" : "border-[#747775] focus-within:border-2 focus-within:border-[#0b57d0]"}`}>
            {chips.map((c) => {
              const p = personOf(g.doc, c);
              return (
                <span key={c} className="flex items-center gap-1 rounded-full border border-[#747775] py-0.5 pl-0.5 pr-1.5 text-[13px]">
                  <Avatar person={p ?? { name: c }} size={22} />
                  {p?.name ?? c}
                  <button type="button" aria-label={`Remove ${p?.name ?? c}`} onClick={() => setChips((x) => x.filter((y) => y !== c))}><GIcon name="close" size={14} /></button>
                </span>
              );
            })}
            <input
              ref={inputRef}
              aria-label="Add people, groups, and calendar events"
              placeholder={chips.length ? "" : "Add people, groups, and calendar events"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if ((e.key === "Enter" || e.key === "," || e.key === "Tab") && query.trim()) {
                  e.preventDefault();
                  addChip(suggestions[0]?.email ?? query);
                }
                if (e.key === "Backspace" && !query && chips.length) setChips((c) => c.slice(0, -1));
              }}
              className="h-9 min-w-[160px] flex-1 px-1 text-[15px] outline-none"
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md bg-white py-1 shadow-lg" role="listbox" aria-label="Suggestions">
                {suggestions.map((p) => (
                  <button key={p.email} type="button" role="option" aria-selected={false} aria-label={`${p.name} ${p.email}`} onClick={() => addChip(p.email)} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-[#f1f3f4]">
                    <Avatar person={p} size={32} />
                    <span className="text-[14px]"><span className="block">{p.name}</span><span className="block text-[12px] text-[#5f6368]">{p.email}</span></span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {adding && (
            <button type="button" aria-label={`Role: ${role}`} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMenu({ kind: "addRole", pos: { x: r.left, y: r.bottom } }); }} className="flex h-12 items-center gap-1 rounded border border-[#747775] px-3 text-[14px]">
              {role} <GIcon name="dropDown" size={18} />
            </button>
          )}
        </div>

        {adding ? (
          <div className="mt-4">
            {chips.some(external) && <p className="mb-3 rounded bg-[#fef7e0] px-3 py-2 text-[13px] text-[#5f4b00]">{chips.filter(external).join(", ")} {chips.filter(external).length === 1 ? "is" : "are"} outside your organization.</p>}
            <label className="mb-3 flex items-center gap-3 text-[14px]">
              <input type="checkbox" aria-label="Notify people" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="h-[18px] w-[18px] accent-[#0b57d0]" />
              Notify people
            </label>
            {notify && <textarea aria-label="Message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.stopPropagation()} rows={4} className="w-full resize-none rounded border border-[#747775] p-3 text-[14px] outline-none focus:border-2 focus:border-[#0b57d0]" />}
          </div>
        ) : (
          <>
            <h3 className="mb-1 mt-5 text-[16px]" style={{ fontFamily: FONT }}>People with access</h3>
            <div className="-mx-2">
              {[{ email: owner.email, role: "Owner" as const }, ...(sh.people ?? []).filter((p) => p.email !== owner.email)].map((p) => {
                const person = personOf(g.doc, p.email);
                const isOwner = p.role === "Owner";
                const exp = "expires" in p ? p.expires : undefined;
                return (
                  <div key={p.email} className="flex items-center gap-3 rounded px-2 py-1.5 hover:bg-[#f1f3f4]">
                    <Avatar person={person ?? { name: p.email }} size={36} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px]">{person?.name ?? p.email}{p.email === me.email ? " (you)" : ""}</div>
                      <div className="truncate text-[12px] text-[#5f6368]">{p.email}</div>
                      {exp && <div className="text-[12px] text-[#5f6368]">Access expires {fmtDate(exp)}</div>}
                    </div>
                    {isOwner ? (
                      <span className="px-3 text-[14px] text-[#5f6368]">Owner</span>
                    ) : (
                      <button type="button" aria-label={`Role for ${person?.name ?? p.email}: ${p.role}`} disabled={!iOwn && false} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMenu({ kind: "person", email: p.email, pos: { x: r.right - 220, y: r.bottom } }); }} className="flex h-9 items-center gap-1 rounded px-3 text-[14px] hover:bg-black/5">
                        {p.role} <GIcon name="dropDown" size={18} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {expiring && (
              <div className="mt-2 flex items-center gap-2 rounded bg-[#f0f4f9] p-3 text-[14px]">
                <span className="flex-1">Access expires for {personOf(g.doc, expiring.email)?.name ?? expiring.email}</span>
                <input type="date" aria-label="Access expires" value={expiring.date} onChange={(e) => setExpiring({ ...expiring, date: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-9 rounded border border-[#747775] px-2" />
                <PillBtn onClick={() => { g.onCommit({ kind: "dialog", id: "g.expiry", values: { file: f.id, email: expiring.email, date: expiring.date } }); setExpiring(null); }}>Save</PillBtn>
              </div>
            )}
            <h3 className="mb-1 mt-4 text-[16px]" style={{ fontFamily: FONT }}>General access</h3>
            <div className="-mx-2 flex items-center gap-3 rounded px-2 py-1.5">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${access === "Restricted" ? "bg-[#e3e3e3]" : "bg-[#c4eed0]"}`}>
                <GIcon name={access === "Restricted" ? "lock" : access === "Organization" ? "domain" : "public"} size={20} color={access === "Restricted" ? "#444746" : "#0d652d"} />
              </span>
              <div className="min-w-0 flex-1">
                <button type="button" aria-label={`General access: ${accessLabel}`} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMenu({ kind: "access", pos: { x: r.left, y: r.bottom } }); }} className="-ml-2 flex items-center gap-1 rounded px-2 py-0.5 text-[14px] font-medium hover:bg-black/5">
                  {accessLabel} <GIcon name="dropDown" size={18} />
                </button>
                <div className="text-[12px] text-[#5f6368]">{accessHelp}</div>
              </div>
              {access !== "Restricted" && (
                <button type="button" aria-label={`Link role: ${sh.linkRole ?? "Viewer"}`} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMenu({ kind: "linkRole", pos: { x: r.right - 200, y: r.bottom } }); }} className="flex h-9 items-center gap-1 rounded px-3 text-[14px] hover:bg-black/5">
                  {sh.linkRole ?? "Viewer"} <GIcon name="dropDown" size={18} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {menu && (
        <Popup onClose={() => setMenu(null)}>
          <MenuList
            pos={menu.pos}
            width={220}
            state={{ on: true }}
            entries={
              menu.kind === "access"
                ? [
                    { label: "Restricted", value: "Restricted", check: access === "Restricted" ? "on" : undefined },
                    // Personal accounts have no organization option.
                    ...(g.doc.org ? [{ label: org.name, value: "Organization", check: access === "Organization" ? "on" : undefined }] : []),
                    { label: "Anyone with the link", value: "Anyone with the link", check: access === "Anyone with the link" ? "on" : undefined },
                  ]
                : menu.kind === "linkRole"
                  ? roleMenu((sh.linkRole ?? "Viewer") as GRole)
                  : menu.kind === "addRole"
                    ? roleMenu(role)
                    : roleMenu(((sh.people ?? []).find((p) => p.email === menu.email)?.role ?? "Viewer") as GRole, menu.email)
            }
            onPick={(i) => {
              const v = String(i.value);
              setMenu(null);
              if (menu.kind === "addRole") setRole(v as GRole);
              else if (menu.kind === "access") g.onCommit({ kind: "dialog", id: "g.access", values: { file: f.id, access: v, role: sh.linkRole ?? "Viewer" } });
              else if (menu.kind === "linkRole") g.onCommit({ kind: "dialog", id: "g.access", values: { file: f.id, access, role: v } });
              else if (v === "Add expiration") setExpiring({ email: menu.email!, date: "" });
              else g.onCommit({ kind: "dialog", id: "g.permission", values: { file: f.id, email: menu.email!, role: v } });
            }}
            onClose={() => setMenu(null)}
          />
        </Popup>
      )}
    </Modal>
  );
}

/** Move / Add shortcut: pick a folder in My Drive. */
export function FolderPicker({ fileIds, mode, onClose }: { fileIds: string[]; mode: "move" | "shortcut"; onClose: () => void }) {
  const g = useG();
  const first = fileOf(g.doc, fileIds[0]);
  const [at, setAt] = useState<string>("root");
  const [picked, setPicked] = useState<string | null>(null);
  if (!first) return null;
  const moving = new Set(fileIds);
  const folders = g.doc.files.filter((x) => x.kind === "folder" && !x.trashed && (x.parent ?? "") === at && !moving.has(x.id));
  const here = at === "root" ? "My Drive" : fileOf(g.doc, at)?.name ?? "My Drive";
  const parentOf = (id: string) => fileOf(g.doc, id)?.parent ?? "root";
  const target = picked ?? at;
  const current = first.parent ?? "";
  const go = () => {
    g.onCommit({ kind: "dialog", id: mode === "move" ? "g.move" : "g.shortcut", values: { file: fileIds.join(","), folder: target === "root" ? "My Drive" : fileOf(g.doc, target)?.name ?? target } });
    onClose();
  };
  return (
    <Modal
      title={`${mode === "move" ? "Move" : "Add shortcut to"} “${fileIds.length > 1 ? `${fileIds.length} items` : first.name}”`}
      onClose={onClose}
      width={520}
      footer={
        <>
          <PillBtn kind="text" onClick={onClose}>Cancel</PillBtn>
          <PillBtn onClick={go} disabled={mode === "move" && target === current}>{mode === "move" ? "Move" : "Add shortcut"}</PillBtn>
        </>
      }
    >
      <p className="mb-3 text-[13px] text-[#444746]">
        Current location: <span className="inline-flex items-center gap-1 rounded-lg border border-[#747775] px-2 py-0.5"><FolderIcon size={14} /> {current === "root" || !current ? "My Drive" : fileOf(g.doc, current)?.name}</span>
      </p>
      <div className="mb-2 flex items-center gap-1">
        {at !== "root" && <IconBtn icon="back" label="Back" onClick={() => { setAt(parentOf(at)); setPicked(null); }} />}
        <span className="text-[15px] font-medium" style={{ fontFamily: FONT }}>{here}</span>
      </div>
      <div className="min-h-[160px] rounded border border-[#e0e0e0]" role="listbox" aria-label="Folders">
        {folders.length === 0 && <p className="p-6 text-center text-[13px] text-[#5f6368]">No folders</p>}
        {folders.map((x) => (
          <div
            key={x.id}
            role="option"
            aria-selected={picked === x.id}
            aria-label={x.name}
            onClick={() => setPicked(x.id)}
            onDoubleClick={() => { setAt(x.id); setPicked(null); }}
            className={`flex h-11 cursor-default items-center gap-3 px-3 text-[14px] ${picked === x.id ? "bg-[#c2e7ff]" : "hover:bg-[#f1f3f4]"}`}
          >
            <FolderIcon size={20} color={x.color ?? "#5f6368"} shared={Boolean(x.sharing?.people?.length)} />
            <span className="flex-1 truncate">{x.name}</span>
            <button type="button" aria-label={`Open ${x.name}`} onClick={(e) => { e.stopPropagation(); setAt(x.id); setPicked(null); }} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5">
              <GIcon name="chevronRight" size={20} />
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
