"use client";

import { useEffect, useRef, useState } from "react";
import { FileIcon, OIcon } from "./icons";
import { anyoneAllowed, defaultLink, isExternal, itemOf, linkSentence, nameOf, personOf, scopeTitle } from "./model";
import type { OdItem, OdPerm, OdScope } from "./types";
import { Avatar, Btn, BRAND, FONT, Modal, RadioRow, TextField, useOd } from "./ui";

const PERM_TEXT: Record<OdPerm, string> = {
  "Can edit": "Make any changes",
  "Can view": "Can't make changes",
  "Can review": "Can suggest changes and comment",
  "Can't download": "Can view, but not download",
};

function permOptions(it: OdItem, work: boolean): OdPerm[] {
  const out: OdPerm[] = ["Can edit", "Can view"];
  if (it.kind === "word") out.push("Can review");
  if (work) out.push("Can't download");
  return out;
}

const PERM_ICON: Record<OdPerm, string> = { "Can edit": "pen", "Can view": "eye", "Can review": "comment", "Can't download": "eye" };
const SCOPE_ICON: Record<OdScope, string> = { Anyone: "globe", Organization: "building", Existing: "people", "People you choose": "person" };

type LinkState = { scope: OdScope; perm: OdPerm; expiration: string; password: string };

/** Link settings: who the link works for, what it allows, expiration and password. */
function LinkSettings({ it, value, onApply, onCancel }: { it: OdItem; value: LinkState; onApply: (v: LinkState) => void; onCancel: () => void }) {
  const ctx = useOd();
  const { doc } = ctx;
  const [v, setV] = useState<LinkState>(value);
  const work = doc.account === "work";
  const scopes: OdScope[] = work ? ["Anyone", "Organization", "Existing", "People you choose"] : ["Anyone", "People you choose"];
  const help: Record<OdScope, string> = {
    Anyone: "Anyone with the link, including people outside your organization",
    Organization: `Only people in ${doc.org?.name ?? "your organization"} with the link`,
    Existing: "Only people who already have access. Doesn't change permissions",
    "People you choose": "Only the people you specify",
  };
  const anyone = v.scope === "Anyone";
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <button type="button" aria-label="Back" onClick={onCancel} className="rounded p-1 hover:bg-[#f0f0f0]"><OIcon name="back" size={16} /></button>
        <h3 className="text-[16px] font-semibold">Link settings</h3>
      </div>
      <div className="mb-2 text-[13px] font-semibold">Share the link with</div>
      <div className="mb-4 flex flex-col gap-2" role="radiogroup" aria-label="Share the link with">
        {scopes.map((s) => (
          <RadioRow
            key={s}
            checked={v.scope === s}
            icon={SCOPE_ICON[s]}
            title={scopeTitle(doc, s)}
            text={help[s]}
            disabled={s === "Anyone" && !anyoneAllowed(doc)}
            note={s === "Anyone" && !anyoneAllowed(doc) ? "Your organization doesn't allow this option" : undefined}
            onClick={() => setV({ ...v, scope: s })}
          />
        ))}
      </div>
      <div className="mb-2 text-[13px] font-semibold">More settings</div>
      <label className="mb-3 flex items-center gap-3 text-[14px]">
        <span className="w-40 shrink-0">Permission</span>
        <select aria-label="Link permission" value={v.perm} disabled={v.scope === "Existing"} onChange={(e) => setV({ ...v, perm: e.target.value as OdPerm })} onKeyDown={(e) => e.stopPropagation()} className="h-8 flex-1 rounded border border-[#d1d1d1] px-2 disabled:opacity-50">
          {permOptions(it, work).map((p) => <option key={p}>{p}</option>)}
        </select>
      </label>
      <label className={`mb-3 flex items-center gap-3 text-[14px] ${anyone ? "" : "opacity-50"}`}>
        <span className="w-40 shrink-0">Set expiration date</span>
        <input type="date" aria-label="Set expiration date" disabled={!anyone} value={anyone ? v.expiration : ""} onChange={(e) => setV({ ...v, expiration: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-8 flex-1 rounded border border-[#d1d1d1] px-2" />
      </label>
      <label className={`mb-1 flex items-center gap-3 text-[14px] ${anyone ? "" : "opacity-50"}`}>
        <span className="w-40 shrink-0">Set password</span>
        <input type="password" aria-label="Set password" disabled={!anyone} value={anyone ? v.password : ""} onChange={(e) => setV({ ...v, password: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-8 flex-1 rounded border border-[#d1d1d1] px-2" />
      </label>
      {!anyone && <p className="mb-2 text-[12px] text-[#616161]">Expiration dates and passwords are available for links that work for Anyone.</p>}
      <div className="mt-4 flex justify-end gap-2">
        <Btn kind="primary" onClick={() => onApply(anyone ? v : { ...v, expiration: "", password: "" })}>Apply</Btn>
        <Btn onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

function PermMenuButton({ it, perm, onPick }: { it: OdItem; perm: OdPerm; onPick: (p: OdPerm) => void }) {
  const ctx = useOd();
  const work = ctx.doc.account === "work";
  return (
    <button
      type="button"
      aria-label={`Permission: ${perm}`}
      title={perm}
      onClick={(e) => ctx.menu(e, permOptions(it, work).map((p) => ({ label: p, icon: PERM_ICON[p], check: p === perm, onClick: () => onPick(p) })))}
      className="flex h-9 shrink-0 items-center gap-1 rounded border border-[#d1d1d1] px-2 hover:bg-[#f5f5f5]"
    >
      <OIcon name={PERM_ICON[perm]} size={16} color={BRAND} />
      <OIcon name="chevronDown" size={12} />
    </button>
  );
}

/** The Share dialog: invite people, or copy a link. */
export function ShareDialog({ fileId, startCopy }: { fileId: string; startCopy?: boolean }) {
  const ctx = useOd();
  const { doc } = ctx;
  const it = itemOf(doc, fileId);
  const [query, setQuery] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [perm, setPerm] = useState<OdPerm>("Can edit");
  const [message, setMessage] = useState("");
  const [view, setView] = useState<"main" | "settings">("main");
  const d = defaultLink(doc);
  const [link, setLink] = useState<LinkState>({ scope: d.scope === "Anyone" && !anyoneAllowed(doc) ? "Organization" : d.scope, perm: d.perm, expiration: "", password: "" });
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (!startCopy) inputRef.current?.focus(); }, [startCopy]);
  if (!it) return null;
  const close = () => ctx.open(null);
  const people = doc.people ?? [];
  const q = query.trim().toLowerCase();
  const suggestions = q ? people.filter((p) => !chips.includes(p.email) && (p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q))).slice(0, 5) : [];
  const addChip = (raw: string) => {
    const e = raw.trim().replace(/[,;]$/, "");
    if (!e) return;
    const email = personOf(doc, e)?.email ?? e;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setChips((c) => (c.includes(email) ? c : [...c, email]));
    setQuery("");
  };
  const allPeople = () => (query.trim() ? [...chips, personOf(doc, query.trim())?.email ?? query.trim()] : chips).filter((x) => /@/.test(x));
  const invite = () => {
    const list = allPeople();
    if (!list.length) return;
    ctx.commit("od.share", { file: it.id, people: [...list].sort().join("; "), permission: perm, message });
    close();
  };
  const copy = () => {
    const list = link.scope === "People you choose" ? allPeople() : [];
    if (link.scope === "People you choose" && !list.length) return;
    ctx.commit("od.link", { file: it.id, scope: link.scope, permission: link.scope === "Existing" ? "Can view" : link.perm, people: [...list].sort().join("; "), expiration: link.expiration, hasExpiration: Boolean(link.expiration), password: Boolean(link.password) });
    setCopied(true);
  };
  const external = chips.filter((c) => isExternal(doc, c));
  const accessPeople = (it.access ?? []).map((a) => personOf(doc, a.email) ?? { name: a.email, email: a.email });
  const title = startCopy ? "Copy link" : `Share “${it.name}”`;

  return (
    <Modal title={view === "settings" ? `Share “${it.name}”` : title} onClose={close} width={500} label={view === "settings" ? "Link settings" : title}>
      {view === "settings" ? (
        <LinkSettings it={it} value={link} onCancel={() => setView("main")} onApply={(v) => { setLink(v); setCopied(false); setView("main"); }} />
      ) : (
        <div style={{ fontFamily: FONT }}>
          {!startCopy && (
            <>
              <div className="flex gap-2">
                <div className="relative flex min-h-[36px] flex-1 flex-wrap items-center gap-1 rounded border border-[#d1d1d1] border-b-[#616161] px-1.5 py-1 focus-within:border-b-2 focus-within:border-b-[#0f6cbd]">
                  {chips.map((c) => {
                    const p = personOf(doc, c);
                    return (
                      <span key={c} className="flex items-center gap-1 rounded bg-[#f0f0f0] py-0.5 pl-0.5 pr-1 text-[13px]">
                        <Avatar person={p ?? { name: c }} size={20} />
                        {p?.name ?? c}
                        <button type="button" aria-label={`Remove ${p?.name ?? c}`} onClick={() => setChips((x) => x.filter((y) => y !== c))}><OIcon name="close" size={12} /></button>
                      </span>
                    );
                  })}
                  <input
                    ref={inputRef}
                    aria-label="Add a name, group, or email"
                    placeholder={chips.length ? "" : "Add a name, group, or email"}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if ((e.key === "Enter" || e.key === "," || e.key === ";" || e.key === "Tab") && query.trim()) {
                        e.preventDefault();
                        addChip(suggestions[0]?.email ?? query);
                      }
                      if (e.key === "Backspace" && !query && chips.length) setChips((c) => c.slice(0, -1));
                    }}
                    className="h-7 min-w-[150px] flex-1 px-1 text-[14px] outline-none"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg" role="listbox" aria-label="Suggestions">
                      {suggestions.map((p) => (
                        <button key={p.email} type="button" role="option" aria-selected={false} aria-label={`${p.name} ${p.email}`} onClick={() => addChip(p.email)} className="flex w-full items-center gap-3 px-3 py-1.5 text-left hover:bg-[#f5f5f5]">
                          <Avatar person={p} size={28} />
                          <span className="text-[13px]"><span className="block">{p.name}</span><span className="block text-[12px] text-[#616161]">{p.email}</span></span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <PermMenuButton it={it} perm={perm} onPick={setPerm} />
              </div>
              <p className="mt-1 text-[12px] text-[#616161]">{perm}: {PERM_TEXT[perm]}</p>
              {external.length > 0 && (
                <p className="mt-2 rounded bg-[#fff4ce] px-3 py-2 text-[12px] text-[#5c4600]">{external.join(", ")} {external.length === 1 ? "is" : "are"} outside your organization.</p>
              )}
              <textarea aria-label="Add a message (optional)" placeholder="Add a message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.stopPropagation()} rows={2} className="mt-3 w-full resize-none rounded border border-[#d1d1d1] p-2 text-[14px] outline-none focus:border-[#0f6cbd]" />
              <div className="mt-2 flex justify-end">
                {/* Microsoft Support, "Share files with OneDrive": add people, set the permission, add a message, "Select Send." */}
                <Btn kind="primary" icon="send" disabled={!chips.length && !/@/.test(query)} onClick={invite}>Send</Btn>
              </div>
              <div className="my-4 border-t border-[#e0e0e0]" />
            </>
          )}
          <div className="mb-2 text-[14px] font-semibold">Copy link</div>
          <div className="flex items-center gap-2 rounded-md border border-[#e0e0e0] p-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ebf3fc]"><OIcon name={SCOPE_ICON[link.scope]} size={16} color={BRAND} /></span>
            <span className="min-w-0 flex-1 text-[13px]">
              <span className="block">{linkSentence(doc, { scope: link.scope, perm: link.scope === "Existing" ? "Can view" : link.perm, people: link.scope === "People you choose" ? allPeople() : undefined })}</span>
              {(link.expiration || link.password) && <span className="block text-[12px] text-[#616161]">{[link.expiration && `Expires ${link.expiration}`, link.password && "Password protected"].filter(Boolean).join(" · ")}</span>}
              {link.scope === "People you choose" && !allPeople().length && <span className="block text-[12px] text-[#c50f1f]">{startCopy ? "Open Share to add the people this link works for." : "Add the people this link works for in the box above."}</span>}
            </span>
            <Btn kind="primary" icon="link" onClick={copy} disabled={link.scope === "People you choose" && !allPeople().length}>{copied ? "Copied" : "Copy"}</Btn>
            <button type="button" aria-label="Link settings" title="Link settings" onClick={() => setView("settings")} className="rounded p-1.5 hover:bg-[#f0f0f0]"><OIcon name="gear" size={18} color="#424242" /></button>
          </div>
          {copied && (
            <p className="mt-2 flex items-center gap-1 text-[12px] text-[#107c10]" role="status"><OIcon name="check" size={14} color="#107c10" /> Link copied. Paste it in an email, a chat, or a document.</p>
          )}
          <div className="mt-4 flex items-center gap-2">
            <button type="button" aria-label="Manage access" onClick={() => ctx.open({ kind: "manage", file: it.id })} className="flex items-center gap-2 rounded px-1 py-1 hover:bg-[#f5f5f5]">
              <span className="flex -space-x-1">
                <Avatar person={doc.me} size={24} ring />
                {accessPeople.slice(0, 3).map((p) => <Avatar key={p.email} person={p} size={24} ring />)}
              </span>
              <span className="text-[13px] text-[#0f6cbd]">Manage access</span>
            </button>
            <span className="flex-1" />
            {copied && <Btn onClick={close}>Close</Btn>}
          </div>
        </div>
      )}
    </Modal>
  );
}

/** Manage access: People, Groups and Links, Stop sharing. */
export function ManageAccess({ fileId, startTab }: { fileId: string; startTab?: "People" | "Groups" | "Links" }) {
  const ctx = useOd();
  const { doc } = ctx;
  const it = itemOf(doc, fileId);
  const [tab, setTab] = useState<"People" | "Groups" | "Links">(startTab ?? "People");
  const [confirm, setConfirm] = useState<{ kind: "person"; email: string } | { kind: "link"; id: string } | { kind: "stop" } | null>(null);
  if (!it) return null;
  const close = () => ctx.open(null);
  const access = it.access ?? [];
  const links = it.links ?? [];
  const linkPeople = links.flatMap((l) => (l.people ?? []).map((p) => ({ email: p, perm: l.perm, via: true })));
  const rows = [...access.map((a) => ({ ...a, via: false })), ...linkPeople.filter((lp) => !access.some((a) => a.email === lp.email))];
  return (
    <Modal
      title={
        <span className="flex items-center gap-2">
          <FileIcon kind={it.kind} size={22} /> Manage access
        </span>
      }
      label="Manage access"
      onClose={close}
      width={520}
    >
      <p className="-mt-1 mb-3 truncate text-[13px] text-[#616161]">{it.name}</p>
      <div className="mb-3 flex items-center gap-2">
        <Btn kind="primary" icon="person" onClick={() => ctx.open({ kind: "share", file: it.id })}>Grant access</Btn>
        <span className="flex-1" />
        <Btn kind="subtle" onClick={() => setConfirm({ kind: "stop" })} disabled={!rows.length && !links.length}>Stop sharing</Btn>
      </div>
      <div className="mb-2 flex gap-4 border-b border-[#e0e0e0]" role="tablist" aria-label="Manage access">
        {(["People", "Groups", "Links"] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`-mb-px border-b-2 pb-1.5 text-[14px] ${tab === t ? "border-[#0f6cbd] font-semibold" : "border-transparent text-[#616161]"}`}>
            {t}
          </button>
        ))}
      </div>
      {tab === "People" && (
        <div className="min-h-[150px]">
          <div className="flex items-center gap-3 py-2">
            <Avatar person={doc.me} size={32} />
            <div className="min-w-0 flex-1"><div className="truncate text-[14px]">{doc.me.name} (you)</div><div className="truncate text-[12px] text-[#616161]">{doc.me.email}</div></div>
            <span className="px-2 text-[13px] text-[#616161]">Owner</span>
          </div>
          {rows.map((r) => {
            const p = personOf(doc, r.email);
            return (
              <div key={r.email} className="flex items-center gap-3 py-2">
                <Avatar person={p ?? { name: r.email }} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px]">{p?.name ?? r.email}</div>
                  <div className="truncate text-[12px] text-[#616161]">{isExternal(doc, r.email) ? "External user · " : ""}{r.email}{r.via ? " · Through a link" : ""}</div>
                </div>
                <button
                  type="button"
                  aria-label={`Access for ${p?.name ?? r.email}: ${r.perm}`}
                  onClick={(e) =>
                    ctx.menu(e, [
                      ...(r.via ? [] : (["Can edit", "Can view"] as OdPerm[]).map((pp) => ({ label: pp, check: pp === r.perm, onClick: () => ctx.commit("od.access", { file: it.id, person: r.email, permission: pp }) }))),
                      ...(r.via ? [] : [{ sep: true }]),
                      { label: "Remove direct access", icon: "delete", danger: true, onClick: () => setConfirm({ kind: "person", email: r.email }) },
                    ])
                  }
                  className="flex h-8 items-center gap-1 rounded px-2 text-[13px] hover:bg-[#f0f0f0]"
                >
                  {r.perm} <OIcon name="chevronDown" size={12} />
                </button>
              </div>
            );
          })}
          {!rows.length && <p className="py-3 text-[13px] text-[#616161]">No one else has direct access.</p>}
        </div>
      )}
      {tab === "Groups" && <p className="min-h-[150px] py-3 text-[13px] text-[#616161]">No groups have access to this item.</p>}
      {tab === "Links" && (
        <div className="min-h-[150px]">
          {links.map((l) => (
            <div key={l.id} className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ebf3fc]"><OIcon name={SCOPE_ICON[l.scope]} size={16} color={BRAND} /></span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px]">{linkSentence(doc, l)}</div>
                {(l.expires || l.password) && <div className="text-[12px] text-[#616161]">{[l.expires && `Expires ${l.expires}`, l.password && "Password protected"].filter(Boolean).join(" · ")}</div>}
              </div>
              <Btn kind="subtle" icon="link" onClick={() => ctx.cmd("od.toast", "Link copied")}>Copy</Btn>
              <button type="button" aria-label={`Remove link: ${linkSentence(doc, l)}`} title="Remove link" onClick={() => setConfirm({ kind: "link", id: l.id })} className="rounded p-1.5 hover:bg-[#f0f0f0]"><OIcon name="delete" size={16} color="#c50f1f" /></button>
            </div>
          ))}
          {!links.length && <p className="py-3 text-[13px] text-[#616161]">No sharing links have been created for this item.</p>}
        </div>
      )}
      {confirm && (
        <div className="absolute inset-0 z-[130] flex items-center justify-center bg-black/30" onMouseDown={(e) => e.stopPropagation()}>
          <div role="alertdialog" aria-label={confirm.kind === "stop" ? "Stop sharing?" : confirm.kind === "link" ? "Remove link?" : "Remove direct access?"} className="w-[380px] rounded-lg bg-white p-5 shadow-2xl" style={{ fontFamily: FONT }}>
            <h3 className="mb-2 text-[16px] font-semibold">{confirm.kind === "stop" ? "Stop sharing?" : confirm.kind === "link" ? "Remove link?" : "Remove direct access?"}</h3>
            <p className="mb-4 text-[13px] text-[#424242]">
              {confirm.kind === "stop"
                ? "Everyone who has access through direct access or a link will lose access. You will still have access."
                : confirm.kind === "link"
                  ? "Anyone who uses this link will no longer have access through it."
                  : `${nameOf(doc, confirm.email)} will lose access to this item.`}
            </p>
            <div className="flex justify-end gap-2">
              <Btn
                kind="danger"
                onClick={() => {
                  if (confirm.kind === "stop") ctx.commit("od.stopSharing", { file: it.id });
                  else if (confirm.kind === "link") ctx.commit("od.removeLink", { file: it.id, link: confirm.id });
                  else ctx.commit("od.access", { file: it.id, person: confirm.email, permission: "Remove direct access" });
                  setConfirm(null);
                }}
              >
                {confirm.kind === "stop" ? "Stop sharing" : "Remove"}
              </Btn>
              <Btn onClick={() => setConfirm(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
