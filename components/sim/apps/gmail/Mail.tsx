"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FileTile, GmailLogo, Icon } from "./icons";
import {
  CATEGORY_ORDER,
  canonicalQuery,
  categoriesOn,
  conversations,
  emailOf,
  eventOf,
  filterQuery,
  fmtDay,
  fmtMonthDayYear,
  fmtTime,
  inFolder,
  listDate,
  longDate,
  matchesQuery,
  msgOf,
  nameOf,
  personOf,
  scheduleChoices,
  snoozeChoices,
  tabOf,
  threadMessages,
  threadOf,
  todayOf,
} from "./model";
import type { GmAttachment, GmCategory, GmMessage, GmailDoc } from "./types";
import { AppsMenu, Avatar, BLUE, Btn, Check, FONT, Field, IconBtn, Menu, Modal, Select, TEXT, useGm, useMenuPos, type MenuItem, type MenuPos } from "./ui";

/* ------------------------------------------------------------------ */
/* Compose state (kept by the canvas so it survives switching apps)    */
/* ------------------------------------------------------------------ */

export type ComposeState = {
  key: number;
  /** send:new | send:reply:<id> | send:replyAll:<id> | send:forward:<id> */
  target: string;
  to: string[];
  cc: string[];
  bcc: string[];
  showCc: boolean;
  showBcc: boolean;
  subject: string;
  body: string;
  attachments: GmAttachment[];
  driveLinks: string[];
  confidential?: string;
  signature?: string;
  minimized?: boolean;
  /** Reply / forward: shown under the box, not committed. */
  quoted?: string;
};

export type Composer = {
  list: ComposeState[];
  open: (c: Partial<ComposeState> & { target: string }) => void;
  update: (key: number, p: Partial<ComposeState>) => void;
  close: (key: number) => void;
};

/** A compose window for a reply, reply all or forward of a message. */
export function replyCompose(doc: GmailDoc, m: GmMessage, mode: "reply" | "replyAll" | "forward"): Partial<ComposeState> & { target: string } {
  const me = doc.me.email.toLowerCase();
  const sender = emailOf(doc, m.from);
  const s = doc.settings;
  const sig = mode === "forward" || mode === "reply" || mode === "replyAll" ? s?.sigReply : s?.sigNew;
  const subject = `${mode === "forward" ? "Fwd" : "Re"}: ${m.subject.replace(/^(re|fwd):\s*/i, "")}`;
  const quoted = `On ${fmtDay(m.date.slice(0, 10))}, ${fmtTime(m.date.slice(11, 16))} ${personOf(doc, m.from).name} <${sender}> wrote:\n${m.body}`;
  if (mode === "forward") return { target: `send:forward:${m.id}`, subject, quoted: `---------- Forwarded message ---------\nFrom: ${personOf(doc, m.from).name} <${sender}>\nSubject: ${m.subject}\n\n${m.body}`, attachments: [...(m.attachments ?? []).filter((a) => !a.drive)], driveLinks: (m.attachments ?? []).filter((a) => a.drive).map((a) => a.name), signature: sig };
  if (m.from === "me") {
    // Replying to your own message goes to the people you wrote to.
    return { target: `send:${mode}:${m.id}`, to: m.to, cc: mode === "replyAll" ? m.cc ?? [] : [], subject, quoted, signature: sig };
  }
  if (mode === "reply") return { target: `send:reply:${m.id}`, to: [sender], subject, quoted, signature: sig };
  const to = [sender, ...m.to.map((e) => emailOf(doc, e))].filter((e, i, a) => e.toLowerCase() !== me && a.indexOf(e) === i);
  const cc = (m.cc ?? []).map((e) => emailOf(doc, e)).filter((e) => e.toLowerCase() !== me && !to.includes(e));
  return { target: `send:replyAll:${m.id}`, to, cc, showCc: cc.length > 0, subject, quoted, signature: sig };
}

/* ------------------------------------------------------------------ */
/* Surface                                                             */
/* ------------------------------------------------------------------ */

export function MailSurface({ composer }: { composer: Composer }) {
  const g = useGm();
  const { doc } = g;
  const view = doc.view ?? {};
  const [search, setSearch] = useState(view.folder === "search" ? view.search ?? "" : "");
  const [options, setOptions] = useState<null | { from?: string }>(null);
  const [quick, setQuick] = useState(false);
  const [apps, setApps] = useState<MenuPos | null>(null);
  const [navOpen, setNavOpen] = useState(true);
  useEffect(() => { if (view.folder !== "search") setSearch(""); else setSearch(view.search ?? ""); }, [view.folder, view.search]);

  const runSearch = (q: string) => { if (q.trim()) g.cmd("gm.search", q.trim()); };
  const openThread = view.open ? threadMessages(doc, view.open) : [];

  return (
    <div className="flex h-full flex-col bg-[#f6f8fc]" style={{ fontFamily: TEXT }}>
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center gap-2 px-3">
        <IconBtn icon="menu" label={navOpen ? "Hide main menu" : "Show main menu"} onClick={() => setNavOpen((x) => !x)} box={44} size={22} />
        <div className="flex w-[180px] shrink-0 items-center gap-1.5 pl-1">
          <GmailLogo size={30} />
          <span className="text-[22px] text-[#444746]" style={{ fontFamily: FONT }}>Gmail</span>
        </div>
        <div className="relative max-w-[720px] flex-1">
          <div className="flex h-12 items-center gap-1 rounded-full bg-[#e9eef6] px-1.5 focus-within:bg-white focus-within:shadow">
            <IconBtn icon="search" label="Search" onClick={() => runSearch(search)} />
            <input
              aria-label="Search mail"
              placeholder="Search mail"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") runSearch(search); }}
              className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-[#1f1f1f] outline-none placeholder:text-[#444746]"
            />
            {view.folder === "search" && <IconBtn icon="close" label="Clear search" onClick={() => { setSearch(""); g.cmd("gm.go", "inbox"); }} />}
            <IconBtn icon="tune" label="Show search options" onClick={() => setOptions(options ? null : {})} pressed={Boolean(options)} />
          </div>
          {options && <SearchOptions initial={options} query={search} onClose={() => setOptions(null)} onSearch={(q) => { setOptions(null); setSearch(q); runSearch(q); }} />}
        </div>
        <span className="flex-1" />
        <IconBtn icon="help" label="Support" onClick={() => g.cmd("toast", "Gmail Help opens in a new tab.")} />
        <IconBtn icon="settings" label="Settings" onClick={() => setQuick((q) => !q)} pressed={quick} />
        <IconBtn icon="apps" label="Google apps" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setApps({ x: r.right, y: r.bottom + 4 }); }} />
        <span className="ml-1"><Avatar person={doc.me} size={32} /></span>
      </div>
      {apps && <AppsMenu pos={apps} onClose={() => setApps(null)} />}

      <div className="flex min-h-0 flex-1">
        <AppRail />
        {navOpen && <MailNav composer={composer} />}
        <main className="mb-2 mr-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white">
          {view.settings ? <SettingsPage /> : openThread.length ? <ThreadView thread={openThread} composer={composer} onFilterLike={(from) => setOptions({ from })} /> : <MessageList />}
        </main>
        {quick && <QuickSettings onClose={() => setQuick(false)} />}
        <SideIcons />
      </div>

      {/* Floating compose windows */}
      <div className="pointer-events-none absolute bottom-0 right-16 z-[120] flex items-end gap-3">
        {composer.list.filter((c) => c.target === "send:new" || !openThread.length || !openThread.some((m) => c.target.endsWith(`:${m.id}`))).map((c) => (
          <div key={c.key} className="pointer-events-auto">
            <ComposeBox c={c} composer={composer} floating />
          </div>
        ))}
      </div>
    </div>
  );
}

function AppRail() {
  const g = useGm();
  const unread = conversations(g.doc, (m) => m.box === "inbox" && Boolean(m.unread) && tabOf(g.doc, m) === "Primary").length;
  const item = (label: string, icon: string, active: boolean, onClick: () => void, badge?: number) => (
    <button type="button" aria-label={label} onClick={onClick} className="flex flex-col items-center gap-1 py-1.5 text-[12px] text-[#444746]">
      <span className={`relative flex h-8 w-14 items-center justify-center rounded-full ${active ? "bg-[#d3e3fd]" : "hover:bg-[#e9eef6]"}`}>
        <Icon name={icon} size={22} color={active ? "#041e49" : "#444746"} />
        {badge ? <span className="absolute -right-1 -top-1 rounded-full bg-[#c5221f] px-1.5 text-[11px] font-medium text-white">{badge}</span> : null}
      </span>
      {label}
    </button>
  );
  return (
    <nav aria-label="Apps in Gmail" className="flex w-[68px] shrink-0 flex-col items-center gap-1 pt-1">
      {item("Mail", "mail", g.doc.surface === "mail", () => g.cmd("gm.go", "inbox"), unread)}
      {item("Chat", "chat", g.doc.surface === "chat", () => g.cmd("app", "chat"))}
      {item("Meet", "video", false, () => g.cmd("meet.home"))}
    </nav>
  );
}

function SideIcons() {
  const g = useGm();
  return (
    <aside aria-label="Side panel" className="flex w-14 shrink-0 flex-col items-center gap-3 pt-3">
      <button type="button" aria-label="Calendar" title="Calendar" onClick={() => g.cmd("app", "calendar")} className="rounded-full p-2 hover:bg-[#e9eef6]"><Icon name="calendar" size={20} color="#1a73e8" /></button>
      <button type="button" aria-label="Keep" title="Keep" onClick={() => g.cmd("toast", "Keep isn't part of this practice.")} className="rounded-full p-2 hover:bg-[#e9eef6]"><Icon name="notes" size={20} color="#f9ab00" /></button>
      <button type="button" aria-label="Tasks" title="Tasks" onClick={() => g.cmd("app", "calendar")} className="rounded-full p-2 hover:bg-[#e9eef6]"><Icon name="task" size={20} color="#1a73e8" /></button>
      <button type="button" aria-label="Contacts" title="Contacts" onClick={() => g.cmd("toast", "Contacts isn't part of this practice.")} className="rounded-full p-2 hover:bg-[#e9eef6]"><Icon name="person" size={20} color="#1a73e8" /></button>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Left navigation                                                     */
/* ------------------------------------------------------------------ */

function MailNav({ composer }: { composer: Composer }) {
  const g = useGm();
  const { doc } = g;
  const folder = doc.view?.settings ? "" : doc.view?.folder ?? "inbox";
  const [more, setMore] = useState(["important", "scheduled", "all", "spam", "trash"].includes(folder));
  const [newLabel, setNewLabel] = useState(false);
  const count = (f: (m: GmMessage) => boolean) => conversations(doc, f).length;
  const inboxUnread = count((m) => m.box === "inbox" && Boolean(m.unread) && tabOf(doc, m) === "Primary");
  const drafts = doc.messages.filter((m) => m.box === "drafts").length;
  const scheduled = doc.messages.filter((m) => m.box === "scheduled").length;
  const row = (id: string, label: string, icon: string, n?: number) => {
    const on = folder === id;
    return (
      <button
        key={id}
        type="button"
        aria-label={label}
        aria-current={on ? "page" : undefined}
        onClick={() => g.cmd("gm.go", id)}
        onDragOver={(e) => { if (id.startsWith("label:") || id === "trash" || id === "spam") e.preventDefault(); }}
        onDrop={(e) => {
          const msg = e.dataTransfer.getData("text/msg");
          if (!msg) return;
          g.onSelect({ selection: `msg:${msg}` });
          g.cmd("gm.moveTo", id === "trash" ? "Trash" : id === "spam" ? "Spam" : id.slice(6));
        }}
        className={`flex h-8 w-full items-center gap-4 rounded-r-full pl-6 pr-3 text-[14px] ${on ? "bg-[#d3e3fd] font-bold text-[#041e49]" : "text-[#1f1f1f] hover:bg-[#e9eef6]"} ${n ? "font-bold" : ""}`}
      >
        <Icon name={icon} size={20} color={on ? "#041e49" : "#444746"} />
        <span className="flex-1 truncate text-left">{label}</span>
        {n ? <span className="text-[12px]">{n}</span> : null}
      </button>
    );
  };
  return (
    <nav aria-label="Main menu" className="flex w-[240px] shrink-0 flex-col overflow-y-auto pb-4 pr-2">
      <button type="button" aria-label="Compose" onClick={() => composer.open({ target: "send:new", signature: doc.settings?.sigNew })} className="mb-3 ml-2 mt-1 flex h-14 w-[138px] items-center gap-3 rounded-2xl bg-[#c2e7ff] px-5 text-[14px] font-medium text-[#001d35] hover:shadow" style={{ fontFamily: FONT }}>
        <Icon name="edit" size={22} color="#001d35" /> Compose
      </button>
      {row("inbox", "Inbox", "inbox", inboxUnread)}
      {row("starred", "Starred", "star")}
      {row("snoozed", "Snoozed", "clock")}
      {row("sent", "Sent", "send")}
      {row("drafts", "Drafts", "draft", drafts)}
      {more && (
        <>
          {row("important", "Important", "importantOutline")}
          {row("scheduled", "Scheduled", "scheduleSend", scheduled)}
          {row("all", "All Mail", "mail")}
          {row("spam", "Spam", "spam")}
          {row("trash", "Trash", "delete")}
          <button type="button" onClick={() => g.cmd("gm.settings", "Labels")} className="flex h-8 w-full items-center gap-4 rounded-r-full pl-6 text-[14px] text-[#1f1f1f] hover:bg-[#e9eef6]"><Icon name="settings" size={20} /> Manage labels</button>
          <button type="button" onClick={() => setNewLabel(true)} className="flex h-8 w-full items-center gap-4 rounded-r-full pl-6 text-[14px] text-[#1f1f1f] hover:bg-[#e9eef6]"><Icon name="plus" size={20} /> Create new label</button>
        </>
      )}
      <button type="button" aria-label={more ? "Less" : "More"} onClick={() => setMore((x) => !x)} className="flex h-8 w-full items-center gap-4 rounded-r-full pl-6 text-[14px] text-[#1f1f1f] hover:bg-[#e9eef6]">
        <Icon name="expand" size={20} style={{ transform: more ? "rotate(180deg)" : undefined }} /> {more ? "Less" : "More"}
      </button>
      <div className="mt-4 flex items-center pl-6 pr-2">
        <span className="flex-1 text-[16px] font-medium text-[#1f1f1f]" style={{ fontFamily: FONT }}>Labels</span>
        <IconBtn icon="plus" label="Create new label" onClick={() => setNewLabel(true)} box={32} />
      </div>
      {(doc.labels ?? []).map((l) => row(`label:${l.name}`, l.name, "label"))}
      {newLabel && <NewLabelDialog onClose={() => setNewLabel(false)} />}
    </nav>
  );
}

function NewLabelDialog({ onClose }: { onClose: () => void }) {
  const g = useGm();
  const [name, setName] = useState("");
  const [nest, setNest] = useState(false);
  const labels = (g.doc.labels ?? []).map((l) => l.name);
  const [parent, setParent] = useState(labels[0] ?? "");
  const ok = () => {
    if (!name.trim()) return;
    g.type("newlabel", nest && parent ? `${parent}/${name.trim()}` : name.trim());
    onClose();
  };
  return (
    <Modal title="New label" onClose={onClose} width={420} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn onClick={ok} disabled={!name.trim()}>Create</Btn></>}>
      <p className="mb-2 text-[14px]">Please enter a new label name:</p>
      <Field label="Label name" value={name} onChange={setName} onEnter={ok} autoFocus />
      <Check label="Nest label under:" checked={nest} onChange={setNest} />
      {nest && <Select label="Parent label" value={parent} options={labels} onChange={setParent} className="ml-7 mt-2" hideLabel />}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Message list                                                        */
/* ------------------------------------------------------------------ */

function folderTitle(folder: string): string {
  if (folder.startsWith("label:")) return folder.slice(6);
  return ({ inbox: "Inbox", starred: "Starred", snoozed: "Snoozed", sent: "Sent", drafts: "Drafts", scheduled: "Scheduled", important: "Important", all: "All Mail", spam: "Spam", trash: "Trash", search: "Search results" } as Record<string, string>)[folder] ?? folder;
}

function MessageList() {
  const g = useGm();
  const { doc, ui } = g;
  const folder = doc.view?.folder ?? "inbox";
  const cats = categoriesOn(doc);
  const showTabs = folder === "inbox" && cats.length > 1;
  const tab: GmCategory = showTabs && cats.includes(doc.view?.tab ?? "Primary") ? doc.view?.tab ?? "Primary" : "Primary";
  const q = doc.view?.search ?? "";
  const list = conversations(doc, (m) => {
    if (folder === "search") return matchesQuery(doc, m, q);
    if (!inFolder(doc, m, folder)) return false;
    if (folder === "inbox" && showTabs) return tabOf(doc, m) === tab;
    return true;
  });
  // Only conversations still shown count as checked (a reported or moved one leaves the list).
  const shown = new Set(list.map((c) => c.last.id));
  const checked = ui.selection.startsWith("msg:") && !doc.view?.open ? ui.selection.split(",").map((s) => s.trim().slice(4)).filter((id) => shown.has(id)) : [];
  const setChecked = (ids: string[]) => g.onSelect({ selection: ids.map((i) => `msg:${i}`).join(",") });
  const toggle = (id: string) => setChecked(checked.includes(id) ? checked.filter((x) => x !== id) : [...checked, id]);
  const [ctx, setCtx] = useState<{ pos: MenuPos; id: string } | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Toolbar ids={checked} all={list.map((c) => c.last.id)} onCheckAll={(on) => setChecked(on ? list.map((c) => c.last.id) : [])} />
      {folder === "trash" && list.length > 0 && (
        <div className="flex items-center justify-center gap-2 bg-[#f2f2f2] py-2 text-[13px] text-[#444746]">
          Messages that have been in Trash more than 30 days will be automatically deleted.
          <button type="button" onClick={() => g.cmd("gm.emptyTrash")} className="font-medium text-[#0b57d0] hover:underline">Empty Trash now</button>
        </div>
      )}
      {folder === "search" && <div className="px-4 py-1 text-[13px] text-[#444746]">Results for <span className="font-medium">{q}</span></div>}
      {showTabs && (
        <div role="tablist" aria-label="Inbox categories" className="flex border-b border-[#f1f1f1]">
          {CATEGORY_ORDER.filter((c) => cats.includes(c)).map((c) => {
            const on = c === tab;
            const unreadIn = conversations(doc, (m) => m.box === "inbox" && tabOf(doc, m) === c && Boolean(m.unread)).length;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={c}
                onClick={() => g.cmd("gm.tab", c)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const msg = e.dataTransfer.getData("text/msg");
                  if (!msg) return;
                  g.onSelect({ selection: `msg:${msg}` });
                  g.cmd("gm.category", c);
                }}
                className={`relative flex h-14 w-[230px] items-center gap-4 px-4 text-[14px] ${on ? "text-[#0b57d0]" : "text-[#444746] hover:bg-[#f2f6fc]"}`}
              >
                <Icon name={c === "Primary" ? "inbox" : c === "Promotions" ? "labelFilled" : c === "Social" ? "people" : c === "Updates" ? "info" : "chat"} size={20} color={on ? BLUE : "#444746"} />
                <span className="font-medium">{c}</span>
                {c !== "Primary" && unreadIn > 0 && <span className="rounded-full bg-[#1a73e8] px-2 text-[11px] font-medium text-white">{unreadIn} new</span>}
                {on && <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t bg-[#0b57d0]" />}
              </button>
            );
          })}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto" role="list" aria-label="Conversations">
        {list.length === 0 && (
          <p className="py-10 text-center text-[14px] text-[#5f6368]">
            {folder === "search" ? "No messages matched your search." : folder === "spam" ? "Hooray, no spam here!" : folder === "trash" ? "No conversations in Trash." : folder === "snoozed" ? "Nothing snoozed" : `No conversations in ${folderTitle(folder)}.`}
          </p>
        )}
        {list.map(({ last, count }) => (
          <Row key={last.id} m={last} count={count} checked={checked.includes(last.id)} onToggle={() => toggle(last.id)} onContext={(pos) => setCtx({ pos, id: last.id })} showTab={folder === "search" || folder === "all"} />
        ))}
      </div>
      {ctx && <RowMenu id={ctx.id} pos={ctx.pos} onClose={() => setCtx(null)} />}
    </div>
  );
}

function Row({ m, count, checked, onToggle, onContext, showTab }: { m: GmMessage; count: number; checked: boolean; onToggle: () => void; onContext: (pos: MenuPos) => void; showTab?: boolean }) {
  const g = useGm();
  const { doc } = g;
  const conv = threadMessages(doc, threadOf(m));
  const unread = conv.some((x) => x.unread);
  const starred = conv.some((x) => x.starred);
  const important = conv.some((x) => x.important);
  const markers = doc.settings?.importanceMarkers !== false;
  const senders = Array.from(new Set(conv.filter((x) => x.box !== "drafts").map((x) => nameOf(doc, x.from))));
  const who = m.box === "drafts" ? "Draft" : m.box === "scheduled" ? `To: ${m.to.map((e) => personOf(doc, e).name).join(", ")}` : senders.join(", ");
  const att = conv.flatMap((x) => x.attachments ?? []);
  const select = () => g.onSelect({ selection: `msg:${m.id}` });
  const act = (id: string, v?: string) => { select(); g.cmd(id, v); };
  const [snooze, setSnooze] = useState<MenuPos | null>(null);
  return (
    <div
      role="listitem"
      aria-label={`${who}, ${m.subject}`}
      draggable
      onDragStart={(e) => { e.dataTransfer.setData("text/msg", m.id); e.dataTransfer.effectAllowed = "move"; }}
      onClick={() => g.cmd("gm.open", m.id)}
      onContextMenu={(e) => { e.preventDefault(); select(); onContext({ x: e.clientX, y: e.clientY }); }}
      className={`group relative flex h-10 cursor-pointer items-center gap-1 border-b border-[#f1f1f1] pl-2 pr-4 text-[14px] hover:z-10 hover:shadow-[inset_1px_0_0_#dadce0,inset_-1px_0_0_#dadce0,0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] ${checked ? "bg-[#c2dbff]" : unread ? "bg-white" : "bg-[#f2f6fc]"}`}
    >
      <input type="checkbox" aria-label={`Select ${m.subject}`} checked={checked} onClick={(e) => e.stopPropagation()} onChange={onToggle} className="mx-2 h-[18px] w-[18px] shrink-0 accent-[#0b57d0]" />
      <IconBtn icon={starred ? "starFilled" : "star"} label={starred ? "Starred" : "Not starred"} color={starred ? "#f4b400" : "#444746"} box={28} size={20} onClick={() => act("gm.star", starred ? "off" : "on")} />
      {markers && (
        <IconBtn icon={important ? "important" : "importantOutline"} label={important ? "Important because you marked it as important. Click to teach Gmail this conversation is not important." : "Click to teach Gmail this conversation is important."} color={important ? "#f4b400" : "#444746"} box={28} size={18} onClick={() => act("gm.important", important ? "off" : "on")} />
      )}
      <span className={`ml-2 w-[180px] shrink-0 truncate ${unread ? "font-bold text-[#1f1f1f]" : "text-[#444746]"} ${m.box === "drafts" ? "text-[#d93025]" : ""}`}>
        {who}{count > 1 && <span className="ml-1 text-[12px] font-normal text-[#5f6368]">{count}</span>}
      </span>
      <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
        {showTab && m.box === "inbox" && <span className="shrink-0 rounded bg-[#e8eaed] px-1.5 text-[12px] text-[#444746]">Inbox</span>}
        {(m.labels ?? []).map((l) => <span key={l} className="shrink-0 rounded bg-[#e8eaed] px-1.5 text-[12px] text-[#444746]">{l}</span>)}
        <span className={`max-w-[70%] shrink-0 truncate ${unread ? "font-bold text-[#1f1f1f]" : "text-[#1f1f1f]"}`}>{m.subject}</span>
        <span className="min-w-0 truncate text-[#5f6368]"> - {m.body.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").slice(0, 120)}</span>
      </span>
      {att.length > 0 && <span className="ml-2 hidden shrink-0 items-center gap-1 rounded-full border border-[#dadce0] px-2 py-0.5 text-[12px] text-[#444746] lg:flex"><Icon name={att[0].drive ? "drive" : "attach"} size={14} />{att[0].name}{att.length > 1 ? ` +${att.length - 1}` : ""}</span>}
      <span className={`ml-3 w-[96px] shrink-0 text-right text-[12px] group-hover:invisible ${unread ? "font-bold text-[#1f1f1f]" : "text-[#5f6368]"}`}>
        {m.box === "snoozed" ? m.snoozeUntil?.split(",").slice(0, 2).join(",") : m.box === "scheduled" ? m.scheduledFor?.split(",").slice(0, 2).join(",") : listDate(doc, m.date)}
      </span>
      {/* Hover actions */}
      <span className={`absolute right-0 hidden items-center pl-2 pr-3 group-hover:flex ${checked ? "bg-[#c2dbff]" : unread ? "bg-white" : "bg-[#f2f6fc]"}`} onClick={(e) => e.stopPropagation()}>
        {m.box !== "archive" && m.box !== "trash" && m.box !== "spam" && <IconBtn icon="archive" label="Archive" box={36} onClick={() => act("gm.archive")} />}
        {m.box !== "trash" && <IconBtn icon="delete" label="Delete" box={36} onClick={() => act("gm.delete")} />}
        <IconBtn icon={unread ? "mailOpen" : "mail"} label={unread ? "Mark as read" : "Mark as unread"} box={36} onClick={() => act("gm.read", unread ? "read" : "unread")} />
        {m.box !== "trash" && m.box !== "spam" && <IconBtn icon="clock" label="Snooze" box={36} onClick={(e) => { select(); const r = e.currentTarget.getBoundingClientRect(); setSnooze({ x: r.left - 200, y: r.bottom + 2 }); }} />}
      </span>
      {snooze && <SnoozeMenu pos={snooze} onClose={() => setSnooze(null)} />}
    </div>
  );
}

function RowMenu({ id, pos, onClose }: { id: string; pos: MenuPos; onClose: () => void }) {
  const g = useGm();
  const m = msgOf(g.doc, id);
  if (!m) return null;
  const items: MenuItem[] = [
    { label: "Archive", icon: "archive", onClick: () => g.cmd("gm.archive") },
    { label: "Delete", icon: "delete", onClick: () => g.cmd("gm.delete") },
    { label: m.unread ? "Mark as read" : "Mark as unread", icon: m.unread ? "mailOpen" : "mail", onClick: () => g.cmd("gm.read", m.unread ? "read" : "unread") },
    { sep: true },
    { label: "Move to", icon: "moveTo", sub: moveItems(g.doc, (v) => g.cmd("gm.moveTo", v)) },
    { label: `Find emails from ${personOf(g.doc, m.from).name}`, icon: "search", onClick: () => g.cmd("gm.search", `from:${emailOf(g.doc, m.from)}`) },
  ];
  return <Menu items={items} pos={pos} onClose={onClose} label="Conversation menu" />;
}

function moveItems(doc: GmailDoc, pick: (v: string) => void): MenuItem[] {
  return [
    { head: "Move to:" },
    ...(doc.view?.folder !== "inbox" ? [{ label: "Inbox", icon: "inbox", onClick: () => pick("Inbox") }] : []),
    ...(doc.labels ?? []).map((l) => ({ label: l.name, icon: "label", onClick: () => pick(l.name) })),
    { sep: true as const },
    { label: "Spam", icon: "spam", onClick: () => pick("Spam") },
    { label: "Trash", icon: "delete", onClick: () => pick("Trash") },
  ];
}

export function SnoozeMenu({ pos, onClose }: { pos: MenuPos; onClose: () => void }) {
  const g = useGm();
  const [pick, setPick] = useState(false);
  const [date, setDate] = useState(todayOf(g.doc));
  const [time, setTime] = useState("08:00");
  if (pick)
    return (
      <Modal title="Pick date & time" onClose={onClose} width={380} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn onClick={() => { onClose(); g.cmd("gm.snooze", `${fmtDay(date)}, ${fmtTime(time)}`); }}>Save</Btn></>}>
        <label className="mb-3 block text-[13px]">Date<input type="date" aria-label="Snooze date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block h-10 w-full rounded border border-[#747775] px-2" /></label>
        <label className="block text-[13px]">Time<input type="time" aria-label="Snooze time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block h-10 w-full rounded border border-[#747775] px-2" /></label>
      </Modal>
    );
  return (
    <Menu
      label="Snooze until"
      pos={pos}
      onClose={onClose}
      width={300}
      items={[
        { head: "Snooze until…" },
        ...snoozeChoices(g.doc).map((c) => ({ label: c.label, hint: c.when, onClick: () => g.cmd("gm.snooze", c.label) })),
        { sep: true },
        { label: "Pick date & time", icon: "calendar", onClick: () => setTimeout(() => setPick(true), 0) },
      ]}
    />
  );
}

function LabelsMenu({ ids, pos, onClose }: { ids: string[]; pos: MenuPos; onClose: () => void }) {
  const g = useGm();
  const msgs = ids.map((i) => msgOf(g.doc, i)).filter(Boolean) as GmMessage[];
  const start = useMemo(() => Array.from(new Set(msgs.flatMap((m) => threadMessages(g.doc, threadOf(m)).flatMap((x) => x.labels ?? [])))), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [set, setSet] = useState<string[]>(start);
  const [q, setQ] = useState("");
  const [creating, setCreating] = useState(false);
  const labels = (g.doc.labels ?? []).map((l) => l.name).filter((n) => !q || n.toLowerCase().includes(q.toLowerCase()));
  const changed = set.slice().sort().join("|") !== start.slice().sort().join("|");
  if (creating) return <NewLabelDialog onClose={onClose} />;
  return (
    <div className="fixed inset-0 z-[190]" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label="Label as" className="fixed z-[200] w-[260px] rounded-md bg-white py-2 text-[14px] shadow-lg" style={{ left: pos.x, top: pos.y, boxShadow: "0 2px 6px 2px rgba(60,64,67,.15)" }}>
        <div className="px-3 pb-1 text-[13px] text-[#444746]">Label as:</div>
        <input aria-label="Search labels" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="mx-3 mb-1 h-8 w-[234px] border-b border-[#747775] text-[14px] outline-none" />
        <div className="max-h-56 overflow-auto">
          {labels.map((n) => (
            <label key={n} className="flex h-8 cursor-pointer items-center gap-3 px-3 hover:bg-[#f1f3f4]">
              <input type="checkbox" aria-label={n} checked={set.includes(n)} onChange={(e) => setSet((s) => (e.target.checked ? [...s, n] : s.filter((x) => x !== n)))} className="h-4 w-4 accent-[#0b57d0]" />
              {n}
            </label>
          ))}
        </div>
        <div className="mt-1 border-t border-[#e0e0e0] pt-1">
          {changed ? (
            <button type="button" aria-label="Apply" onClick={() => { onClose(); g.cmd("gm.labels", set.join("; ")); }} className="h-8 w-full px-3 text-left font-medium text-[#0b57d0] hover:bg-[#f1f3f4]">Apply</button>
          ) : (
            <>
              <button type="button" onClick={() => setCreating(true)} className="h-8 w-full px-3 text-left hover:bg-[#f1f3f4]">Create new</button>
              <button type="button" onClick={() => { onClose(); g.cmd("gm.settings", "Labels"); }} className="h-8 w-full px-3 text-left hover:bg-[#f1f3f4]">Manage labels</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Toolbar over the list (acts on checked conversations) or over an open conversation. */
function Toolbar({ ids, all, onCheckAll, inThread }: { ids: string[]; all?: string[]; onCheckAll?: (on: boolean) => void; inThread?: GmMessage }) {
  const g = useGm();
  const { doc } = g;
  const folder = doc.view?.folder ?? "inbox";
  const menu = useMenuPos();
  const [kind, setKind] = useState<"move" | "labels" | "snooze" | "more" | null>(null);
  const target = inThread ? [inThread.id] : ids;
  const any = target.length > 0;
  const first = target[0] ? msgOf(doc, target[0]) : undefined;
  const conv = first ? threadMessages(doc, threadOf(first)) : [];
  const unread = conv.some((m) => m.unread);
  const important = conv.some((m) => m.important);
  const starred = conv.some((m) => m.starred);
  const box = first?.box;
  const open = (k: typeof kind) => (e: React.MouseEvent) => { menu.openAt(e); setKind(k); };
  const [phish, setPhish] = useState(false);
  return (
    <div className="flex h-12 shrink-0 items-center gap-1 px-2" role="toolbar" aria-label="Conversation actions">
      {inThread ? (
        <IconBtn icon="back" label={`Back to ${folderTitle(folder)}`} onClick={() => g.cmd("gm.back")} />
      ) : (
        <>
          <input type="checkbox" aria-label="Select all" checked={Boolean(all?.length) && ids.length === all?.length} onChange={(e) => onCheckAll?.(e.target.checked)} className="ml-3 mr-2 h-[18px] w-[18px] accent-[#0b57d0]" />
          {!any && <IconBtn icon="refresh" label="Refresh" onClick={() => g.cmd("toast", "No new mail.")} />}
        </>
      )}
      {any && (
        <>
          {box === "spam" ? (
            <Btn kind="outlined" small onClick={() => g.cmd("gm.notSpam")} label="Not spam">Not spam</Btn>
          ) : box === "trash" ? (
            <Btn kind="outlined" small onClick={() => g.cmd("gm.deleteForever")} label="Delete forever">Delete forever</Btn>
          ) : box === "scheduled" ? (
            <Btn kind="outlined" small onClick={() => g.cmd("gm.cancelSend", first?.id)} label="Cancel send">Cancel send</Btn>
          ) : (
            <>
              {box !== "archive" && <IconBtn icon="archive" label="Archive" onClick={() => g.cmd("gm.archive")} />}
              <IconBtn icon="spam" label="Report spam" onClick={() => g.cmd("gm.spam")} />
              <IconBtn icon="delete" label="Delete" onClick={() => g.cmd("gm.delete")} />
            </>
          )}
          <span className="mx-1 h-5 w-px bg-[#dadce0]" />
          <IconBtn icon={unread ? "mailOpen" : "mail"} label={unread ? "Mark as read" : "Mark as unread"} onClick={() => g.cmd("gm.read", unread ? "read" : "unread")} />
          {box !== "trash" && box !== "spam" && box !== "scheduled" && <IconBtn icon="clock" label="Snooze" onClick={open("snooze")} />}
          <IconBtn icon="addTask" label="Add to Tasks" onClick={() => g.cmd("toast", "Added to Tasks.")} />
          <span className="mx-1 h-5 w-px bg-[#dadce0]" />
          <IconBtn icon="moveTo" label="Move to" onClick={open("move")} />
          <IconBtn icon="label" label="Labels" onClick={open("labels")} />
          <IconBtn icon="more" label="More" onClick={open("more")} />
        </>
      )}
      {!any && !inThread && (
        <IconBtn icon="more" label="More" onClick={open("more")} />
      )}
      {menu.pos && kind === "move" && <Menu items={moveItems(doc, (v) => g.cmd("gm.moveTo", v))} pos={menu.pos} onClose={menu.close} label="Move to" />}
      {menu.pos && kind === "labels" && <LabelsMenu ids={target} pos={menu.pos} onClose={menu.close} />}
      {menu.pos && kind === "snooze" && <SnoozeMenu pos={menu.pos} onClose={menu.close} />}
      {menu.pos && kind === "more" && (
        <Menu
          pos={menu.pos}
          onClose={menu.close}
          label="More"
          items={
            any
              ? [
                  { label: important ? "Mark as not important" : "Mark as important", icon: important ? "importantOutline" : "important", onClick: () => g.cmd("gm.important", important ? "off" : "on") },
                  { label: starred ? "Remove star" : "Add star", icon: "star", onClick: () => g.cmd("gm.star", starred ? "off" : "on") },
                  { label: "Filter messages like these", icon: "filter", onClick: () => g.cmd("toast", "Use Show search options in the search box, or open the message and choose More › Filter messages like this.") },
                  { label: "Report phishing", icon: "warning", onClick: () => setTimeout(() => setPhish(true), 0) },
                ]
              : [{ label: "Mark all as read", icon: "mailOpen", onClick: () => g.cmd("toast", "Select conversations first, then use Mark as read.") }]
          }
        />
      )}
      {phish && <PhishingDialog onClose={() => setPhish(false)} />}
      <span className="flex-1" />
      {!inThread && all && <span className="pr-3 text-[12px] text-[#5f6368]">{all.length ? `1–${all.length} of ${all.length}` : ""}</span>}
    </div>
  );
}

function PhishingDialog({ onClose }: { onClose: () => void }) {
  const g = useGm();
  return (
    <Modal title="Report phishing" onClose={onClose} width={460} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn onClick={() => { onClose(); g.cmd("gm.phishing"); }} label="Report phishing message">Report phishing message</Btn></>}>
      <p className="text-[14px] leading-6">This message will be moved to Spam and reported to Google as a phishing attempt that tries to trick you into giving away personal information.</p>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Conversation view                                                   */
/* ------------------------------------------------------------------ */

function bodyNodes(text: string, onLink: (href: string) => void): React.ReactNode[] {
  return text.split(/\n{2,}/).map((para, i) => (
    <p key={i} className="mb-3 whitespace-pre-wrap">
      {para.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, j) => {
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (!m) return <span key={j}>{part}</span>;
        return (
          <a key={j} href={m[2]} title={m[2]} onClick={(e) => { e.preventDefault(); onLink(m[2]); }} className="text-[#0b57d0] underline">
            {m[1]}
          </a>
        );
      })}
    </p>
  ));
}

function ThreadView({ thread, composer, onFilterLike }: { thread: GmMessage[]; composer: Composer; onFilterLike: (from: string) => void }) {
  const g = useGm();
  const { doc } = g;
  const visible = thread.filter((m) => m.box !== "drafts");
  const last = visible[visible.length - 1] ?? thread[thread.length - 1];
  const [expanded, setExpanded] = useState<string[]>([last.id]);
  const subject = thread[0].subject;
  const labels = Array.from(new Set(thread.flatMap((m) => m.labels ?? [])));
  const inbox = thread.some((m) => m.box === "inbox");
  const replying = composer.list.filter((c) => thread.some((m) => c.target.endsWith(`:${m.id}`)));
  const reply = (m: GmMessage, mode: "reply" | "replyAll" | "forward") => {
    g.onSelect({ selection: `msg:${m.id}` });
    if (replying.length) return;
    composer.open(replyCompose(doc, m, mode));
  };
  const multi = (m: GmMessage) => [...m.to, ...(m.cc ?? [])].filter((e) => e.toLowerCase() !== doc.me.email.toLowerCase() && e !== "me").length + (m.from === "me" ? 0 : 1) > 1;
  const onLink = (href: string) => {
    const meet = /meet\.google\.com\/([a-z]{3}-[a-z]{4}-[a-z]{3})/.exec(href);
    if (meet) return g.cmd("meet.open", meet[1]);
    g.cmd("toast", `Opening ${href.replace(/^https?:\/\//, "")} in a new tab`);
  };
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Toolbar ids={[last.id]} inThread={last} />
      <div className="min-h-0 flex-1 overflow-y-auto pb-8">
        <div className="flex items-center gap-2 py-3 pl-[72px] pr-6">
          <h2 className="text-[22px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>{subject}</h2>
          {inbox && <span className="rounded bg-[#e8eaed] px-1.5 text-[12px] text-[#444746]">Inbox</span>}
          {labels.map((l) => <span key={l} className="rounded bg-[#e8eaed] px-1.5 text-[12px] text-[#444746]">{l}</span>)}
          <span className="flex-1" />
          <IconBtn icon="print" label="Print all" onClick={() => g.cmd("toast", "Print opens your browser's print dialog.")} />
        </div>
        {visible.map((m) => (
          <MessageCard key={m.id} m={m} open={expanded.includes(m.id)} onToggle={() => setExpanded((x) => (x.includes(m.id) ? x.filter((y) => y !== m.id) : [...x, m.id]))} onReply={(mode) => reply(m, mode)} onFilterLike={onFilterLike} onLink={onLink} />
        ))}
        {replying.length ? (
          <div className="ml-[72px] mr-6 mt-2">
            {replying.map((c) => <ComposeBox key={c.key} c={c} composer={composer} />)}
          </div>
        ) : (
          last.box !== "scheduled" && (
            <div className="ml-[72px] mt-2 flex gap-3">
              <Btn kind="outlined" onClick={() => reply(last, "reply")} label="Reply"><Icon name="reply" size={18} color={BLUE} /> Reply</Btn>
              {multi(last) && <Btn kind="outlined" onClick={() => reply(last, "replyAll")} label="Reply all"><Icon name="replyAll" size={18} color={BLUE} /> Reply all</Btn>}
              <Btn kind="outlined" onClick={() => reply(last, "forward")} label="Forward"><Icon name="forward" size={18} color={BLUE} /> Forward</Btn>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function MessageCard({ m, open, onToggle, onReply, onFilterLike, onLink }: { m: GmMessage; open: boolean; onToggle: () => void; onReply: (mode: "reply" | "replyAll" | "forward") => void; onFilterLike: (from: string) => void; onLink: (href: string) => void }) {
  const g = useGm();
  const { doc } = g;
  const sender = personOf(doc, m.from);
  const menu = useMenuPos();
  const [confirm, setConfirm] = useState<null | "phish" | "block" | "unsub">(null);
  const [details, setDetails] = useState(false);
  const select = () => g.onSelect({ selection: `msg:${m.id}` });
  const ev = m.invite ? eventOf(doc, m.invite) : undefined;
  const toLine = m.to.map((e) => nameOf(doc, e)).join(", ");
  if (!open)
    return (
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-3 border-b border-[#f1f1f1] py-2 pl-4 pr-6 text-left text-[14px] hover:bg-[#f8fafd]">
        <Avatar person={sender} size={40} />
        <span className="w-[180px] truncate font-medium">{m.from === "me" ? "me" : sender.name}</span>
        <span className="flex-1 truncate text-[#5f6368]">{m.body.replace(/\s+/g, " ").slice(0, 100)}</span>
        <span className="text-[12px] text-[#5f6368]">{listDate(doc, m.date)}</span>
      </button>
    );
  return (
    <article aria-label={`Message from ${sender.name}`} className="flex gap-3 border-b border-[#f1f1f1] py-3 pl-4 pr-6" onClick={select}>
      <Avatar person={sender} size={40} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <div className="text-[14px]">
              <span className="font-bold text-[#1f1f1f]">{m.from === "me" ? doc.me.name : sender.name}</span>{" "}
              <span className="text-[12px] text-[#5f6368]">&lt;{emailOf(doc, m.from)}&gt;</span>
              {m.unsubscribe && m.from !== "me" && (
                <button type="button" onClick={(e) => { e.stopPropagation(); select(); setConfirm("unsub"); }} className="ml-2 text-[12px] text-[#444746] underline">Unsubscribe</button>
              )}
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); setDetails((d) => !d); }} className="text-[12px] text-[#5f6368]">
              to {toLine || "me"}{m.cc?.length ? `, cc: ${m.cc.map((e) => nameOf(doc, e)).join(", ")}` : ""} ▾
            </button>
            {details && (
              <div className="mt-1 w-fit rounded border border-[#dadce0] p-2 text-[12px] text-[#444746]" role="note" aria-label="Message details">
                <div>from: {sender.name} &lt;{emailOf(doc, m.from)}&gt;</div>
                <div>to: {m.to.map((e) => emailOf(doc, e)).join(", ")}</div>
                {m.cc?.length ? <div>cc: {m.cc.map((e) => emailOf(doc, e)).join(", ")}</div> : null}
                {m.from === "me" && m.bcc?.length ? <div>bcc: {m.bcc.join(", ")}</div> : null}
                <div>date: {longDate(doc, m.date)}</div>
                <div>subject: {m.subject}</div>
                {m.from !== "me" && <div>mailed-by: {emailOf(doc, m.from).split("@")[1]}</div>}
              </div>
            )}
          </div>
          <span className="whitespace-nowrap pt-0.5 text-[12px] text-[#5f6368]">{m.box === "scheduled" ? `Scheduled for ${m.scheduledFor}` : longDate(doc, m.date)}</span>
          <IconBtn icon={m.starred ? "starFilled" : "star"} label={m.starred ? "Starred" : "Not starred"} color={m.starred ? "#f4b400" : "#444746"} box={32} onClick={() => { select(); g.cmd("gm.star", m.starred ? "off" : "on"); }} />
          {m.box !== "scheduled" && <IconBtn icon="reply" label="Reply" box={32} onClick={() => onReply("reply")} />}
          <IconBtn icon="more" label="More message options" box={32} onClick={(e) => { select(); menu.openAt(e, true, 260); }} />
        </div>
        {m.warning && (
          <div role="alert" className="mt-3 flex gap-3 rounded-lg bg-[#fce8e6] p-3 text-[14px] text-[#3c4043]">
            <Icon name="warning" size={22} color="#d93025" />
            <div><div className="font-medium text-[#a50e0e]">Be careful with this message</div>{m.warning}</div>
          </div>
        )}
        {m.confidential && (
          <div className="mt-3 flex items-center gap-2 rounded bg-[#f1f3f4] p-2 text-[13px] text-[#444746]"><Icon name="lockClock" size={18} /> Confidential mode. {m.confidential}</div>
        )}
        {ev && (
          <div className="mt-3 rounded-lg border border-[#dadce0] p-3 text-[14px]" aria-label="Invitation">
            <div className="text-[16px] font-medium">{ev.title}</div>
            <div className="text-[13px] text-[#444746]">{fmtDay(ev.day)} · {ev.allDay ? "All day" : `${fmtTime(ev.start)} – ${fmtTime(ev.end)}`}</div>
            {ev.meet && <button type="button" onClick={(e) => { e.stopPropagation(); g.cmd("meet.open", ev.meet); }} className="mt-2 rounded-full bg-[#0b57d0] px-4 py-1.5 text-[13px] font-medium text-white">Join with Google Meet</button>}
            <div className="mt-3 flex items-center gap-2 text-[13px]">
              <span className="text-[#444746]">Reply for {doc.me.email}</span>
              {(["Yes", "No", "Maybe"] as const).map((a) => (
                <button key={a} type="button" aria-label={a} aria-pressed={ev.myResponse === a} onClick={(e) => { e.stopPropagation(); g.onSelect({ selection: `evt:${ev.id}` }); g.cmd("cal.rsvp", a); }} className={`rounded-full border px-4 py-1 ${ev.myResponse === a ? "border-transparent bg-[#c2e7ff] font-medium" : "border-[#747775] hover:bg-[#f1f3f4]"}`}>{a}</button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 text-[14px] leading-6 text-[#222]">{bodyNodes(m.body, onLink)}</div>
        {m.signature && doc.settings?.signatures?.find((s) => s.name === m.signature) && (
          <div className="whitespace-pre-wrap text-[13px] text-[#5f6368]">--{"\n"}{doc.settings.signatures.find((s) => s.name === m.signature)!.text}</div>
        )}
        {(m.attachments ?? []).length > 0 && (
          <div className="mt-3 border-t border-[#f1f1f1] pt-3">
            <div className="mb-2 text-[13px] font-medium text-[#444746]">{m.attachments!.length} attachment{m.attachments!.length > 1 ? "s" : ""}</div>
            <div className="flex flex-wrap gap-3">
              {m.attachments!.map((a) => (
                <div key={a.name} className="flex h-[52px] w-[200px] items-center gap-2 rounded-lg border border-[#dadce0] px-3 text-[13px]" title={a.drive ? "Google Drive file" : "Attachment"}>
                  {a.drive ? <Icon name="drive" size={20} color="#1a73e8" /> : <FileTile kind={/\.pdf$/i.test(a.name) ? "pdf" : /\.(png|jpe?g)$/i.test(a.name) ? "image" : "doc"} />}
                  <span className="min-w-0 flex-1 truncate">{a.name}</span>
                  {a.size && <span className="text-[11px] text-[#5f6368]">{a.size}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {menu.pos && (
        <Menu
          pos={menu.pos}
          onClose={menu.close}
          width={260}
          label="More message options"
          items={[
            ...(m.box === "scheduled" ? [] : [
              { label: "Reply", icon: "reply", onClick: () => onReply("reply") },
              ...(m.to.length + (m.cc?.length ?? 0) > 1 ? [{ label: "Reply all", icon: "replyAll", onClick: () => onReply("replyAll") }] : []),
              { label: "Forward", icon: "forward", onClick: () => onReply("forward") },
            ]),
            { sep: true },
            { label: "Filter messages like this", icon: "filter", onClick: () => onFilterLike(emailOf(doc, m.from)) },
            { label: "Print", icon: "print", onClick: () => g.cmd("toast", "Print opens your browser's print dialog.") },
            { label: "Delete this message", icon: "delete", onClick: () => g.cmd("gm.delete") },
            ...(m.from === "me" ? [] : [
              { label: `Block "${sender.name}"`, icon: "block", onClick: () => setTimeout(() => setConfirm("block"), 0) },
              { label: "Report spam", icon: "spam", onClick: () => g.cmd("gm.spam") },
              { label: "Report phishing", icon: "warning", onClick: () => setTimeout(() => setConfirm("phish"), 0) },
            ]),
            { label: "Show original", icon: "description", onClick: () => g.cmd("toast", "Show original opens the message's raw headers in a new tab.") },
            { label: "Mark unread from here", icon: "mail", onClick: () => g.cmd("gm.read", "unread") },
          ]}
        />
      )}
      {confirm === "phish" && <PhishingDialog onClose={() => setConfirm(null)} />}
      {confirm === "block" && (
        <Modal title="Block this email address" onClose={() => setConfirm(null)} width={460} footer={<><Btn kind="text" onClick={() => setConfirm(null)}>Cancel</Btn><Btn onClick={() => { setConfirm(null); g.cmd("gm.block", emailOf(doc, m.from)); }}>Block</Btn></>}>
          <p className="text-[14px] leading-6">Future messages from {emailOf(doc, m.from)} will be moved to Spam. You can unblock this sender in Settings › Filters and Blocked Addresses.</p>
        </Modal>
      )}
      {confirm === "unsub" && (
        <Modal title={`Unsubscribe from ${sender.name}?`} onClose={() => setConfirm(null)} width={460} footer={<><Btn kind="text" onClick={() => setConfirm(null)}>Cancel</Btn><Btn onClick={() => { setConfirm(null); g.cmd("gm.unsubscribe"); }}>Unsubscribe</Btn></>}>
          <p className="text-[14px] leading-6">Gmail will ask {sender.name} to stop sending you messages.</p>
        </Modal>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Compose                                                             */
/* ------------------------------------------------------------------ */

function resolveRecipient(doc: GmailDoc, raw: string): string | null {
  const s = raw.trim().replace(/[,;]$/, "").trim();
  if (!s) return null;
  const angle = /<([^>]+)>/.exec(s);
  if (angle) return angle[1];
  const exact = doc.people.find((p) => p.email.toLowerCase() === s.toLowerCase());
  if (exact) return exact.email;
  const hits = doc.people.filter((p) => p.name.toLowerCase().includes(s.toLowerCase()) || p.email.toLowerCase().startsWith(s.toLowerCase()));
  if (hits.length === 1) return hits[0].email;
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s)) return s;
  return null;
}

function Recipients({ label, list, onChange, autoFocus }: { label: string; list: string[]; onChange: (l: string[]) => void; autoFocus?: boolean }) {
  const g = useGm();
  const [text, setText] = useState("");
  const [bad, setBad] = useState(false);
  const commit = (raw = text) => {
    const e = resolveRecipient(g.doc, raw);
    if (!raw.trim()) return true;
    if (!e) { setBad(true); return false; }
    if (!list.includes(e)) onChange([...list, e]);
    setText("");
    setBad(false);
    return true;
  };
  const hits = text.trim().length >= 1 ? g.doc.people.filter((p) => !list.includes(p.email) && (p.name.toLowerCase().includes(text.toLowerCase()) || p.email.toLowerCase().includes(text.toLowerCase()))).slice(0, 5) : [];
  return (
    <div className="relative flex min-h-[38px] flex-wrap items-center gap-1 border-b border-[#f1f1f1] py-1 text-[14px]">
      <span className="mr-1 text-[#444746]">{label}</span>
      {list.map((e) => (
        <span key={e} className="flex items-center gap-1 rounded-full border border-[#dadce0] bg-white py-0.5 pl-1 pr-1.5 text-[13px]" title={e}>
          <Avatar person={personOf(g.doc, e)} size={18} />
          {personOf(g.doc, e).name === e.split("@")[0] ? e : personOf(g.doc, e).name}
          <button type="button" aria-label={`Remove ${e}`} onClick={() => onChange(list.filter((x) => x !== e))} className="ml-0.5 text-[#5f6368]">✕</button>
        </span>
      ))}
      <input
        aria-label={`${label} recipients`}
        autoFocus={autoFocus}
        value={text}
        onChange={(e) => { setText(e.target.value); setBad(false); if (/[,;]$/.test(e.target.value)) commit(e.target.value); }}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" || e.key === "Tab") { if (text.trim()) { e.preventDefault(); commit(); } }
          if (e.key === "Backspace" && !text && list.length) onChange(list.slice(0, -1));
        }}
        onBlur={() => { if (text.trim()) commit(); }}
        className={`h-7 min-w-[120px] flex-1 outline-none ${bad ? "text-[#d93025]" : ""}`}
      />
      {hits.length > 0 && (
        <div role="listbox" aria-label="Suggested recipients" className="absolute left-8 top-full z-[130] w-[320px] rounded-md bg-white py-1 shadow-lg" style={{ boxShadow: "0 2px 6px 2px rgba(60,64,67,.15)" }}>
          {hits.map((p) => (
            <button key={p.email} type="button" role="option" aria-selected={false} aria-label={`${p.name} ${p.email}`} onMouseDown={(e) => { e.preventDefault(); onChange([...list, p.email]); setText(""); }} className="flex w-full items-center gap-3 px-3 py-1.5 text-left hover:bg-[#f1f3f4]">
              <Avatar person={p} size={28} />
              <span><span className="block text-[14px]">{p.name}</span><span className="block text-[12px] text-[#5f6368]">{p.email}</span></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const EXPIRES = ["Expires in 1 day", "Expires in 1 week", "Expires in 1 month", "Expires in 3 months", "Expires in 5 years"];

export function ComposeBox({ c, composer, floating }: { c: ComposeState; composer: Composer; floating?: boolean }) {
  const g = useGm();
  const { doc } = g;
  const up = (p: Partial<ComposeState>) => composer.update(c.key, p);
  const [dlg, setDlg] = useState<null | "attach" | "drive" | "schedule" | "confidential" | "noRecipients" | "access" | "sig" | "discard">(null);
  const [sendMenu, setSendMenu] = useState<MenuPos | null>(null);
  const [sigMenu, setSigMenu] = useState<MenuPos | null>(null);
  const [scheduleFor, setScheduleFor] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const title = c.target === "send:new" ? (c.subject || "New Message") : c.subject;
  const sigs = doc.settings?.signatures ?? [];
  const sig = sigs.find((s) => s.name === c.signature);

  const serialize = (opts: { schedule?: string; access?: string }) => {
    const lines: string[] = [];
    c.to.forEach((e) => lines.push(`To: ${e}`));
    c.cc.forEach((e) => lines.push(`Cc: ${e}`));
    c.bcc.forEach((e) => lines.push(`Bcc: ${e}`));
    lines.push(`Subject: ${c.subject}`);
    c.attachments.forEach((a) => lines.push(a.drive ? `Drive link: ${a.name}` : `Attachment: ${a.name}`));
    c.driveLinks.forEach((n) => lines.push(`Drive link: ${n}`));
    if (opts.access) lines.push(`Drive access: ${opts.access}`);
    if (c.confidential) lines.push(`Confidential: ${c.confidential}`);
    lines.push(`Send: ${opts.schedule ? `Scheduled ${opts.schedule}` : "Now"}`);
    if (c.signature) lines.push(`Signature: ${c.signature}`);
    lines.push(`Body: ${c.body.trim()}`);
    return lines.join("\n");
  };
  const needsAccess = () => {
    const links = [...c.driveLinks, ...c.attachments.filter((a) => a.drive).map((a) => a.name)];
    const who = [...c.to, ...c.cc, ...c.bcc];
    return links.some((n) => {
      const f = doc.drive?.find((x) => x.name === n);
      return f && who.some((e) => !(f.sharedWith ?? []).map((x) => x.toLowerCase()).includes(e.toLowerCase()));
    });
  };
  const send = (schedule?: string) => {
    if (!c.to.length && !c.cc.length && !c.bcc.length) return setDlg("noRecipients");
    if (needsAccess()) { setScheduleFor(schedule ?? null); return setDlg("access"); }
    g.type(c.target, serialize({ schedule }));
  };
  const finishAccess = (access: string) => { setDlg(null); g.type(c.target, serialize({ schedule: scheduleFor ?? undefined, access })); };

  if (c.minimized && floating)
    return (
      <button type="button" onClick={() => up({ minimized: false })} className="flex h-10 w-[260px] items-center rounded-t-lg bg-[#f2f6fc] px-4 text-[14px] font-medium shadow-lg">{title}</button>
    );
  return (
    <div role="dialog" aria-label={floating ? title : "Reply"} className={`flex flex-col bg-white ${floating ? "h-[440px] max-h-[calc(100vh-40px)] w-[520px] rounded-t-lg shadow-[0_8px_10px_1px_rgba(0,0,0,.14),0_3px_14px_2px_rgba(0,0,0,.12)]" : "rounded-2xl border border-[#dadce0] shadow-sm"}`} style={{ fontFamily: TEXT }}>
      {floating && (
        <div className="flex h-10 shrink-0 items-center rounded-t-lg bg-[#f2f6fc] pl-4 pr-2 text-[14px] font-medium text-[#041e49]">
          <span className="flex-1 truncate">{title}</span>
          <IconBtn icon="minimize" label="Minimize" box={28} size={16} onClick={() => up({ minimized: true })} />
          <IconBtn icon="popOut" label="Full screen" box={28} size={16} onClick={() => g.cmd("toast", "Full screen isn't part of this practice.")} />
          <IconBtn icon="close" label="Save & close" box={28} size={16} onClick={() => { if (c.body.trim() || c.subject.trim() || c.to.length) g.cmd("gm.draft", JSON.stringify({ to: c.to, subject: c.subject, body: c.body })); composer.close(c.key); }} />
        </div>
      )}
      <div className="px-4">
        <div className="flex items-start">
          <div className="flex-1">
            <Recipients label="To" list={c.to} onChange={(to) => up({ to })} autoFocus={floating && !c.to.length} />
          </div>
          <span className="flex h-[38px] items-center gap-2 border-b border-[#f1f1f1] text-[14px] text-[#444746]">
            {!c.showCc && <button type="button" aria-label="Add Cc recipients" onClick={() => up({ showCc: true })} className="hover:underline">Cc</button>}
            {!c.showBcc && <button type="button" aria-label="Add Bcc recipients" onClick={() => up({ showBcc: true })} className="hover:underline">Bcc</button>}
          </span>
        </div>
        {c.showCc && <Recipients label="Cc" list={c.cc} onChange={(cc) => up({ cc })} autoFocus />}
        {c.showBcc && <Recipients label="Bcc" list={c.bcc} onChange={(bcc) => up({ bcc })} autoFocus />}
        {floating && (
          <input aria-label="Subject" placeholder="Subject" value={c.subject} onChange={(e) => up({ subject: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-[38px] w-full border-b border-[#f1f1f1] text-[14px] outline-none" />
        )}
      </div>
      <div className={`min-h-0 flex-1 overflow-auto px-4 pt-2 ${floating ? "" : "min-h-[140px]"}`}>
        <textarea ref={bodyRef} aria-label="Message Body" value={c.body} onChange={(e) => up({ body: e.target.value })} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && e.ctrlKey) send(); }} className="min-h-[120px] w-full resize-none text-[14px] leading-6 outline-none" />
        {sig && <div className="whitespace-pre-wrap pb-2 text-[13px] text-[#5f6368]" aria-label="Signature">--{"\n"}{sig.text}</div>}
        {c.quoted && <div className="mb-2 border-l-2 border-[#dadce0] pl-3 text-[12px] text-[#5f6368] whitespace-pre-wrap line-clamp-4">{c.quoted}</div>}
        {(c.attachments.length > 0 || c.driveLinks.length > 0) && (
          <div className="mb-2 space-y-1">
            {c.attachments.map((a) => (
              <div key={a.name} className="flex w-fit items-center gap-2 rounded bg-[#f5f5f5] px-2 py-1 text-[13px]">
                {a.drive ? <Icon name="drive" size={16} color="#1a73e8" /> : <Icon name="attach" size={16} />}
                <span className="font-medium text-[#0b57d0]">{a.name}</span>
                <span className="text-[#5f6368]">{a.drive ? "(Drive link)" : a.size ? `(${a.size})` : ""}</span>
                <button type="button" aria-label={`Remove attachment ${a.name}`} onClick={() => up({ attachments: c.attachments.filter((x) => x !== a) })} className="text-[#5f6368]">✕</button>
              </div>
            ))}
            {c.driveLinks.map((n) => (
              <div key={n} className="flex w-fit items-center gap-2 rounded bg-[#f5f5f5] px-2 py-1 text-[13px]">
                <Icon name="drive" size={16} color="#1a73e8" />
                <span className="font-medium text-[#0b57d0]">{n}</span>
                <span className="text-[#5f6368]">(Drive link)</span>
                <button type="button" aria-label={`Remove Drive link ${n}`} onClick={() => up({ driveLinks: c.driveLinks.filter((x) => x !== n) })} className="text-[#5f6368]">✕</button>
              </div>
            ))}
          </div>
        )}
        {c.confidential && (
          <div className="mb-2 flex items-center gap-2 rounded bg-[#f1f3f4] px-3 py-2 text-[13px]" aria-label="Confidential mode">
            <Icon name="lockClock" size={18} />
            <span className="flex-1">Content expires {c.confidential.split(";")[0].replace(/^Expires\s*/i, "")}</span>
            <button type="button" onClick={() => setDlg("confidential")} className="font-medium text-[#0b57d0]">Edit</button>
            <button type="button" aria-label="Turn off confidential mode" onClick={() => up({ confidential: undefined })} className="text-[#5f6368]">✕</button>
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-0.5 px-3 py-2">
        <span className="flex h-9 overflow-hidden rounded-full bg-[#0b57d0] text-white">
          <button type="button" aria-label="Send" onClick={() => send()} className="pl-5 pr-3 text-[14px] font-medium hover:bg-[#0842a0]">Send</button>
          <button type="button" aria-label="More send options" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setSendMenu({ x: r.left, y: r.top - 50 }); }} className="border-l border-white/30 px-2 hover:bg-[#0842a0]"><Icon name="dropDown" size={18} color="#fff" /></button>
        </span>
        <IconBtn icon="format" label="Formatting options" box={34} onClick={() => g.cmd("toast", "Formatting options: bold, italic, lists and more.")} />
        <IconBtn icon="attach" label="Attach files" box={34} onClick={() => setDlg("attach")} />
        <IconBtn icon="link" label="Insert link" box={34} onClick={() => g.cmd("toast", "Insert link isn't part of this practice.")} />
        <IconBtn icon="emoji" label="Insert emoji" box={34} onClick={() => g.cmd("toast", "Insert emoji isn't part of this practice.")} />
        <IconBtn icon="drive" label="Insert files using Drive" box={34} onClick={() => setDlg("drive")} />
        <IconBtn icon="photo" label="Insert photo" box={34} onClick={() => g.cmd("toast", "Insert photo isn't part of this practice.")} />
        <IconBtn icon="lockClock" label="Toggle confidential mode" box={34} pressed={Boolean(c.confidential)} onClick={() => setDlg("confidential")} />
        <IconBtn icon="edit" label="Insert signature" box={34} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setSigMenu({ x: r.left, y: r.top - 40 - 32 * (sigs.length + 2) }); }} />
        <span className="flex-1" />
        <IconBtn icon="delete" label="Discard draft" box={34} onClick={() => composer.close(c.key)} />
      </div>

      {sendMenu && <Menu pos={sendMenu} onClose={() => setSendMenu(null)} label="More send options" items={[{ label: "Schedule send", icon: "scheduleSend", onClick: () => setTimeout(() => setDlg("schedule"), 0) }]} />}
      {sigMenu && (
        <Menu
          pos={sigMenu}
          onClose={() => setSigMenu(null)}
          label="Insert signature"
          items={[
            { label: "Manage signatures", icon: "settings", onClick: () => g.cmd("gm.settings", "General") },
            { sep: true },
            { label: "No signature", checked: !c.signature, onClick: () => up({ signature: undefined }) },
            ...sigs.map((s) => ({ label: s.name, checked: c.signature === s.name, onClick: () => up({ signature: s.name }) })),
          ]}
        />
      )}
      {dlg === "noRecipients" && (
        <Modal title="Error" onClose={() => setDlg(null)} width={400} footer={<Btn onClick={() => setDlg(null)}>OK</Btn>}>
          <p>Please specify at least one recipient.</p>
        </Modal>
      )}
      {dlg === "attach" && <AttachDialog onClose={() => setDlg(null)} onPick={(a) => { setDlg(null); if ((a.mb ?? 0) > 25) { up({ attachments: [...c.attachments, { ...a, drive: true }] }); g.cmd("toast", `Large files must be shared with Google Drive. ${a.name} was added as a Drive link.`); } else up({ attachments: [...c.attachments, a] }); }} />}
      {dlg === "drive" && <DrivePicker onClose={() => setDlg(null)} onPick={(name, asAttachment) => { setDlg(null); if (asAttachment) up({ attachments: [...c.attachments, { name }] }); else up({ driveLinks: [...c.driveLinks, name] }); }} />}
      {dlg === "schedule" && <ScheduleDialog onClose={() => setDlg(null)} onPick={(when) => { setDlg(null); send(when); }} />}
      {dlg === "confidential" && <ConfidentialDialog current={c.confidential} onClose={() => setDlg(null)} onSave={(v) => { setDlg(null); up({ confidential: v }); }} />}
      {dlg === "access" && <AccessDialog files={[...c.driveLinks, ...c.attachments.filter((a) => a.drive).map((a) => a.name)]} onClose={() => setDlg(null)} onSend={finishAccess} />}
    </div>
  );
}

function AttachDialog({ onClose, onPick }: { onClose: () => void; onPick: (a: GmAttachment) => void }) {
  const g = useGm();
  const files = g.doc.computer ?? [];
  const [pick, setPick] = useState<GmAttachment | null>(null);
  return (
    <div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/30" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label="Open" className="w-[560px] max-w-full overflow-hidden rounded-lg border border-[#c8c8c8] bg-white shadow-2xl" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
        <div className="flex h-8 items-center bg-[#f3f3f3] px-3 text-[12px]"><span className="flex-1">Open</span><button type="button" aria-label="Close" onClick={onClose}>✕</button></div>
        <div className="flex h-8 items-center gap-2 border-b border-[#e5e5e5] px-3 text-[12px] text-[#444]">This PC › Documents</div>
        <div className="grid grid-cols-[1fr_90px] border-b border-[#e5e5e5] px-3 py-1 text-[11px] text-[#666]"><span>Name</span><span>Size</span></div>
        <div className="h-56 overflow-auto p-1" role="listbox" aria-label="Files on this computer">
          {files.map((f) => (
            <div key={f.name} role="option" aria-selected={pick?.name === f.name} aria-label={f.name} onClick={() => setPick(f)} onDoubleClick={() => onPick(f)} className={`grid h-8 cursor-default grid-cols-[1fr_90px] items-center px-2 text-[12px] ${pick?.name === f.name ? "bg-[#cce8ff]" : "hover:bg-[#e5f3ff]"}`}>
              <span className="flex items-center gap-2 truncate"><FileTile kind={/\.pdf$/i.test(f.name) ? "pdf" : /\.(png|jpe?g)$/i.test(f.name) ? "image" : "doc"} size={16} />{f.name}</span>
              <span className="text-[#666]">{f.size}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-[#e5e5e5] bg-[#f3f3f3] p-3 text-[12px]">
          <span>File name:</span>
          <input aria-label="File name" value={pick?.name ?? ""} readOnly className="h-6 flex-1 border border-[#7a7a7a] bg-white px-1" />
          <button type="button" onClick={() => pick && onPick(pick)} disabled={!pick} className="h-6 rounded border border-[#0078d4] bg-[#0078d4] px-4 text-white disabled:opacity-50">Open</button>
          <button type="button" onClick={onClose} className="h-6 rounded border border-[#adadad] bg-white px-3">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function DrivePicker({ onClose, onPick }: { onClose: () => void; onPick: (name: string, asAttachment: boolean) => void }) {
  const g = useGm();
  const files = (g.doc.drive ?? []).filter((f) => f.kind !== "folder");
  const [pick, setPick] = useState<string | null>(null);
  const [as, setAs] = useState<"Drive link" | "Attachment">("Drive link");
  const f = files.find((x) => x.name === pick);
  const native = f ? ["doc", "sheet", "slides"].includes(f.kind) : false;
  return (
    <Modal title="Insert files using Google Drive" onClose={onClose} width={640} footer={
      <div className="flex w-full items-center gap-4">
        <span className="flex items-center gap-3 text-[13px]">
          Insert as:
          {(["Drive link", "Attachment"] as const).map((o) => (
            <label key={o} className={`flex items-center gap-1.5 ${o === "Attachment" && native ? "text-[#9aa0a6]" : ""}`}>
              <input type="radio" name="insertAs" aria-label={o} disabled={o === "Attachment" && native} checked={(native ? "Drive link" : as) === o} onChange={() => setAs(o)} className="accent-[#0b57d0]" />
              {o}
            </label>
          ))}
        </span>
        <span className="flex-1" />
        <Btn kind="text" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!pick} onClick={() => pick && onPick(pick, !native && as === "Attachment")}>Insert</Btn>
      </div>
    }>
      <div className="mb-2 flex gap-5 border-b border-[#e0e0e0] text-[14px]">
        {["Recent", "My Drive", "Shared with me", "Starred", "Upload"].map((t, i) => <span key={t} className={`pb-2 ${i === 1 ? "border-b-[3px] border-[#0b57d0] text-[#0b57d0]" : "text-[#444746]"}`}>{t}</span>)}
      </div>
      <div className="max-h-64 overflow-auto" role="listbox" aria-label="Drive files">
        {files.map((x) => (
          <div key={x.name} role="option" aria-selected={pick === x.name} aria-label={x.name} onClick={() => setPick(x.name)} className={`flex h-10 cursor-default items-center gap-3 rounded px-2 text-[14px] ${pick === x.name ? "bg-[#c2e7ff]" : "hover:bg-[#f1f3f4]"}`}>
            <FileTile kind={x.kind} size={20} />
            <span className="flex-1 truncate">{x.name}</span>
          </div>
        ))}
      </div>
      {native && <p className="mt-2 text-[12px] text-[#5f6368]">Google Docs, Sheets and Slides files can only be sent as a Drive link.</p>}
    </Modal>
  );
}

function ScheduleDialog({ onClose, onPick }: { onClose: () => void; onPick: (when: string) => void }) {
  const g = useGm();
  const [custom, setCustom] = useState(false);
  const [date, setDate] = useState(todayOf(g.doc));
  const [time, setTime] = useState("08:00");
  if (custom)
    return (
      <Modal title="Pick date & time" onClose={onClose} width={400} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn onClick={() => onPick(`${fmtDay(date)}, ${fmtTime(time)}`)}>Schedule send</Btn></>}>
        <label className="mb-3 block text-[13px]">Date<input type="date" aria-label="Schedule date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block h-10 w-full rounded border border-[#747775] px-2" /></label>
        <label className="block text-[13px]">Time<input type="time" aria-label="Schedule time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block h-10 w-full rounded border border-[#747775] px-2" /></label>
      </Modal>
    );
  return (
    <Modal title="Schedule send" onClose={onClose} width={420}>
      <div className="pb-3">
        {scheduleChoices(g.doc).map((c) => (
          <button key={c.label} type="button" aria-label={c.label} onClick={() => onPick(c.when)} className="flex h-11 w-full items-center justify-between rounded px-2 text-[14px] hover:bg-[#f1f3f4]">
            <span>{c.label}</span><span className="text-[#5f6368]">{c.when}</span>
          </button>
        ))}
        <button type="button" onClick={() => setCustom(true)} className="mt-1 flex h-11 w-full items-center gap-3 border-t border-[#e0e0e0] px-2 text-[14px] hover:bg-[#f1f3f4]"><Icon name="calendar" size={18} /> Pick date & time</button>
      </div>
    </Modal>
  );
}

function ConfidentialDialog({ current, onClose, onSave }: { current?: string; onClose: () => void; onSave: (v: string) => void }) {
  const [exp, setExp] = useState(current?.split(";")[0].trim() || "Expires in 1 week");
  const [code, setCode] = useState(current?.split(";")[1]?.trim() || "No SMS passcode");
  return (
    <Modal title="Confidential mode" onClose={onClose} width={480} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn onClick={() => onSave(`${exp}; ${code}`)}>Save</Btn></>}>
      <p className="mb-4 text-[13px] leading-5 text-[#444746]">Recipients won't have the option to forward, copy, print, or download this email.</p>
      <div className="mb-1 text-[13px] font-medium">SET EXPIRATION</div>
      <Select label="Set expiration" hideLabel value={exp} options={EXPIRES} onChange={setExp} className="mb-4" />
      <div className="mb-1 text-[13px] font-medium">REQUIRE PASSCODE</div>
      <p className="mb-2 text-[12px] text-[#5f6368]">All passcodes will be generated by Google.</p>
      {["No SMS passcode", "SMS passcode"].map((o) => (
        <label key={o} className="mb-1 flex items-center gap-2 text-[14px]">
          <input type="radio" name="passcode" aria-label={o} checked={code === o} onChange={() => setCode(o)} className="accent-[#0b57d0]" />
          {o}
        </label>
      ))}
    </Modal>
  );
}

/**
 * The prompt Gmail shows when recipients can't open an inserted Drive file
 * (support.google.com/mail/answer/2487407): "Anyone with the link" lets you choose
 * whether people can view, comment in, or edit; to limit access to the message's
 * recipients, select More options. The dialog title is an approximation (the help page
 * doesn't name it), so lessons and hints don't quote it.
 * Serialized as "Drive access: <role>" (recipients only) or "Drive access: Anyone with the link, <role>".
 */
function AccessDialog({ files, onClose, onSend }: { files: string[]; onClose: () => void; onSend: (access: string) => void }) {
  const [more, setMore] = useState(false);
  const [who, setWho] = useState<"link" | "recipients">("link");
  const [role, setRole] = useState("Viewer");
  const option = (v: "link" | "recipients", label: string) => (
    <label className="mb-2 flex items-center gap-2 text-[14px]">
      <input type="radio" name="driveAccess" aria-label={label} checked={who === v} onChange={() => setWho(v)} className="accent-[#0b57d0]" />
      {label}
    </label>
  );
  return (
    <Modal title="Change sharing settings before sending?" onClose={onClose} width={520} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn onClick={() => onSend(who === "link" ? `Anyone with the link, ${role}` : role)}>Send</Btn></>}>
      <p className="mb-3 text-[14px] leading-5">The recipients don't have access to {files.length === 1 ? "this Google Drive file" : "these Google Drive files"}:</p>
      <ul className="mb-3 list-disc pl-6 text-[14px]">{files.map((f) => <li key={f}>{f}</li>)}</ul>
      {more ? option("recipients", "Recipients of this email") : null}
      {option("link", "Anyone with the link")}
      <div className="mb-2 ml-6 flex items-center gap-2 text-[14px]">
        <span className="text-[#444746]">Access</span>
        <select aria-label="Access" value={role} onChange={(e) => setRole(e.target.value)} className="h-9 rounded border border-[#747775] bg-white px-2">
          {["Viewer", "Commenter", "Editor"].map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>
      {!more && <Btn kind="text" onClick={() => setMore(true)} label="More options">More options</Btn>}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Search options and filters                                          */
/* ------------------------------------------------------------------ */

function SearchOptions({ initial, query, onClose, onSearch }: { initial: { from?: string }; query: string; onClose: () => void; onSearch: (q: string) => void }) {
  const g = useGm();
  const [f, setF] = useState({ from: initial.from ?? "", to: "", subject: "", has: initial.from ? "" : query, not: "", size: "", sizeOp: "greater than", attachment: false, chats: false });
  const [step, setStep] = useState<"criteria" | "actions">("criteria");
  const set = (p: Partial<typeof f>) => setF((x) => ({ ...x, ...p }));
  const build = () => {
    const q: string[] = [];
    const quote = (v: string) => (/\s/.test(v.trim()) ? `(${v.trim()})` : v.trim());
    if (f.from.trim()) q.push(`from:${quote(f.from)}`);
    if (f.to.trim()) q.push(`to:${quote(f.to)}`);
    if (f.subject.trim()) q.push(`subject:${quote(f.subject)}`);
    if (f.has.trim()) q.push(f.has.trim());
    if (f.not.trim()) q.push(...f.not.trim().split(/\s+/).map((w) => `-${w}`));
    if (f.size.trim()) q.push(`${f.sizeOp === "greater than" ? "larger" : "smaller"}:${f.size.trim()}M`);
    if (f.attachment) q.push("has:attachment");
    return q.join(" ").replace(/\(([^)\s]+)\)/g, "$1");
  };
  const criteria = () => {
    const l: string[] = [];
    if (f.from.trim()) l.push(`From: ${f.from.trim()}`);
    if (f.to.trim()) l.push(`To: ${f.to.trim()}`);
    if (f.subject.trim()) l.push(`Subject: ${f.subject.trim()}`);
    if (f.has.trim()) l.push(`Has the words: ${f.has.trim()}`);
    if (f.not.trim()) l.push(`Doesn't have: ${f.not.trim()}`);
    if (f.attachment) l.push("Has attachment");
    return l;
  };
  const empty = !criteria().length;
  const row = (label: string, key: "from" | "to" | "subject" | "has" | "not") => (
    <label className="flex items-center gap-4 py-1.5 text-[14px]">
      <span className="w-[120px] shrink-0 text-[#444746]">{label}</span>
      <input aria-label={label} value={f[key]} onChange={(e) => set({ [key]: e.target.value })} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && !empty) onSearch(build()); }} className="h-8 flex-1 border-b border-[#747775] outline-none focus:border-b-2 focus:border-[#0b57d0]" />
    </label>
  );
  return (
    <div role="dialog" aria-label={step === "criteria" ? "Search options" : "Filter actions"} className="absolute left-0 right-0 top-[52px] z-[140] rounded-lg bg-white px-6 py-4 shadow-[0_2px_6px_2px_rgba(60,64,67,.15),0_1px_2px_rgba(60,64,67,.3)]" onClick={(e) => e.stopPropagation()}>
      {step === "criteria" ? (
        <>
          {row("From", "from")}
          {row("To", "to")}
          {row("Subject", "subject")}
          {row("Has the words", "has")}
          {row("Doesn't have", "not")}
          <div className="flex items-center gap-4 py-1.5 text-[14px]">
            <span className="w-[120px] shrink-0 text-[#444746]">Size</span>
            <select aria-label="Size comparison" value={f.sizeOp} onChange={(e) => set({ sizeOp: e.target.value })} className="h-8 border-b border-[#747775]"><option>greater than</option><option>less than</option></select>
            <input aria-label="Size" value={f.size} onChange={(e) => set({ size: e.target.value.replace(/[^\d.]/g, "") })} onKeyDown={(e) => e.stopPropagation()} className="h-8 w-24 border-b border-[#747775] outline-none" />
            <span>MB</span>
          </div>
          <div className="flex items-center gap-6 py-2">
            <Check label="Has attachment" checked={f.attachment} onChange={(v) => set({ attachment: v })} />
            <Check label="Don't include chats" checked={f.chats} onChange={(v) => set({ chats: v })} />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Btn kind="text" onClick={onClose}>Cancel</Btn>
            <Btn kind="text" disabled={empty} onClick={() => setStep("actions")} label="Create filter">Create filter</Btn>
            <Btn disabled={empty} onClick={() => onSearch(build())} label="Search">Search</Btn>
          </div>
        </>
      ) : (
        <FilterActions criteria={criteria()} query={build()} onBack={() => setStep("criteria")} onDone={() => { onClose(); }} />
      )}
      <span className="hidden">{g.doc.me.email}</span>
    </div>
  );
}

const FILTER_FLAGS = ["Skip the Inbox (Archive it)", "Mark as read", "Star it", "Delete it", "Never send it to Spam", "Always mark it as important", "Never mark it as important"];

function FilterActions({ criteria, query, onBack, onDone }: { criteria: string[]; query: string; onBack: () => void; onDone: () => void }) {
  const g = useGm();
  const [on, setOn] = useState<string[]>([]);
  const [label, setLabel] = useState("");
  const [cat, setCat] = useState("");
  const [also, setAlso] = useState(false);
  const labels = (g.doc.labels ?? []).map((l) => l.name);
  const matches = conversations(g.doc, (m) => m.from !== "me" && matchesQuery(g.doc, m, query)).length;
  const toggle = (k: string, v: boolean) => setOn((s) => (v ? [...s, k] : s.filter((x) => x !== k)));
  const create = () => {
    const lines = [...criteria];
    for (const k of FILTER_FLAGS.slice(0, 3)) if (on.includes(k)) lines.push(k);
    if (on.includes("label") && label) lines.push(`Apply the label: ${label}`);
    for (const k of FILTER_FLAGS.slice(3)) if (on.includes(k)) lines.push(k);
    if (on.includes("category") && cat) lines.push(`Categorize as: ${cat}`);
    if (also) lines.push("Also apply filter to matching conversations");
    g.type("filter", lines.join("\n"));
    onDone();
  };
  const box = (k: string) => <Check key={k} label={k} checked={on.includes(k)} onChange={(v) => toggle(k, v)} className="py-1" />;
  return (
    <div className="text-[14px]">
      <div className="mb-3 flex items-center gap-2">
        <IconBtn icon="back" label="Back to search options" onClick={onBack} box={32} />
        <span className="truncate text-[#444746]">{query}</span>
      </div>
      <p className="mb-2 text-[13px] text-[#444746]">When a message is an exact match for your search criteria:</p>
      {FILTER_FLAGS.slice(0, 3).map(box)}
      <div className="flex items-center gap-3 py-1">
        <Check label="Apply the label:" checked={on.includes("label")} onChange={(v) => toggle("label", v)} />
        <select aria-label="Choose label" value={label} onChange={(e) => { setLabel(e.target.value); if (e.target.value) toggle("label", true); }} className="h-8 rounded border border-[#747775] px-1">
          <option value="">Choose label…</option>
          {labels.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      <Check label="Forward it" checked={false} onChange={() => g.cmd("toast", "Add a forwarding address in Settings first.")} className="py-1 text-[#9aa0a6]" />
      {FILTER_FLAGS.slice(3).map(box)}
      <div className="flex items-center gap-3 py-1">
        <Check label="Categorize as:" checked={on.includes("category")} onChange={(v) => toggle("category", v)} />
        <select aria-label="Choose category" value={cat} onChange={(e) => { setCat(e.target.value); if (e.target.value) toggle("category", true); }} className="h-8 rounded border border-[#747775] px-1">
          <option value="">Choose category…</option>
          {CATEGORY_ORDER.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <Check label={`Also apply filter to ${matches} matching conversation${matches === 1 ? "" : "s"}.`} checked={also} onChange={setAlso} className="mt-2 py-1" />
      <div className="flex justify-end pt-3">
        <Btn onClick={create} label="Create filter">Create filter</Btn>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

function QuickSettings({ onClose }: { onClose: () => void }) {
  const g = useGm();
  const [cats, setCats] = useState(false);
  const radio = (name: string, options: string[], value: string) => (
    <div className="mb-1">
      {options.map((o) => (
        <label key={o} className="flex h-8 items-center gap-3 text-[14px]">
          <input type="radio" name={name} aria-label={o} defaultChecked={o === value} onChange={() => g.cmd("toast", `${o} isn't part of this practice.`)} className="accent-[#0b57d0]" />
          {o}
          {o === "Default" && <button type="button" onClick={() => setCats(true)} className="ml-auto text-[13px] font-medium text-[#0b57d0]">Customize</button>}
        </label>
      ))}
    </div>
  );
  return (
    <aside aria-label="Quick settings" className="mb-2 flex w-[300px] shrink-0 flex-col overflow-y-auto rounded-2xl bg-white px-4 py-3">
      <div className="mb-2 flex items-center">
        <h3 className="flex-1 text-[16px]" style={{ fontFamily: FONT }}>Quick settings</h3>
        <IconBtn icon="close" label="Close" onClick={onClose} box={32} />
      </div>
      <Btn kind="outlined" onClick={() => { onClose(); g.cmd("gm.settings", "General"); }} label="See all settings" className="mb-4 w-full">See all settings</Btn>
      <div className="mb-1 text-[12px] font-medium uppercase tracking-wide text-[#444746]">Inbox type</div>
      {radio("inboxType", ["Default", "Important first", "Unread first", "Starred first", "Priority Inbox", "Multiple Inboxes"], "Default")}
      <div className="mb-1 mt-3 text-[12px] font-medium uppercase tracking-wide text-[#444746]">Reading pane</div>
      {radio("pane", ["No split", "Right of inbox", "Below inbox"], "No split")}
      <div className="mb-1 mt-3 text-[12px] font-medium uppercase tracking-wide text-[#444746]">Email threading</div>
      <Check label="Conversation view" checked onChange={() => g.cmd("toast", "Conversation view stays on in this practice.")} />
      {cats && <CategoriesDialog onClose={() => setCats(false)} />}
    </aside>
  );
}

function CategoriesDialog({ onClose }: { onClose: () => void }) {
  const g = useGm();
  const [on, setOn] = useState<GmCategory[]>(categoriesOn(g.doc));
  const [starred, setStarred] = useState(false);
  // The title is an approximation: the help page says "Click Customize" and "Select one or more categories" but doesn't name the dialog.
  return (
    <Modal title="Select tabs to enable" onClose={onClose} width={420} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn onClick={() => { onClose(); g.type("categories", `Categories: ${CATEGORY_ORDER.filter((c) => on.includes(c)).join(", ")}`); }}>Save</Btn></>}>
      {CATEGORY_ORDER.map((c) => (
        <label key={c} className={`flex h-9 items-center gap-3 text-[14px] ${c === "Primary" ? "text-[#9aa0a6]" : ""}`}>
          <input type="checkbox" aria-label={c} disabled={c === "Primary"} checked={on.includes(c)} onChange={(e) => setOn((s) => (e.target.checked ? [...s, c] : s.filter((x) => x !== c)))} className="h-[18px] w-[18px] accent-[#0b57d0]" />
          {c}
        </label>
      ))}
      {/* support.google.com/mail/answer/3055016 names this option; it doesn't change the practice. */}
      <label className="mt-2 flex h-9 items-center gap-3 border-t border-[#e0e0e0] pt-2 text-[14px]">
        <input type="checkbox" aria-label="Include starred in Primary" checked={starred} onChange={(e) => setStarred(e.target.checked)} className="h-[18px] w-[18px] accent-[#0b57d0]" />
        Include starred in Primary
      </label>
    </Modal>
  );
}

const SETTINGS_TABS = ["General", "Labels", "Inbox", "Accounts", "Filters and Blocked Addresses", "Forwarding and POP/IMAP", "Add-ons", "Chat and Meet", "Advanced", "Offline", "Themes"];

function SettingsPage() {
  const g = useGm();
  const tab = g.doc.view?.settings ?? "General";
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-2 px-6 pt-4">
        <h2 className="text-[22px]" style={{ fontFamily: FONT }}>Settings</h2>
      </div>
      <div role="tablist" aria-label="Settings" className="flex flex-wrap border-b border-[#e0e0e0] px-4">
        {SETTINGS_TABS.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={t === tab} onClick={() => g.cmd("gm.settings", t)} className={`px-3 py-3 text-[14px] ${t === tab ? "border-b-[3px] border-[#0b57d0] font-medium text-[#0b57d0]" : "text-[#444746] hover:bg-[#f1f3f4]"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 text-[14px]">
        {tab === "General" ? <GeneralSettings /> : tab === "Inbox" ? <InboxSettings /> : tab === "Filters and Blocked Addresses" ? <FilterSettings /> : tab === "Labels" ? <LabelSettings /> : <p className="py-8 text-[#5f6368]">These settings aren't part of this practice. Use General, Labels, Inbox, or Filters and Blocked Addresses.</p>}
      </div>
    </div>
  );
}

function SettingRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-6 border-b border-[#e0e0e0] py-4">
      <div className="w-[220px] shrink-0 font-medium text-[#1f1f1f]">{label}</div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function toIsoInput(s?: string): string {
  if (!s) return "";
  const m = /([A-Za-z]{3})[a-z]* (\d{1,2}), (\d{4})/.exec(s);
  if (!m) return "";
  const mi = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(m[1]);
  return `${m[3]}-${String(mi + 1).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

function GeneralSettings() {
  const g = useGm();
  const s = g.doc.settings ?? {};
  const [undo, setUndo] = useState(String(s.undoSend ?? 5));
  const [reply, setReply] = useState(s.replyDefault ?? "Reply");
  const [sigs, setSigs] = useState(s.signatures ?? []);
  const [cur, setCur] = useState(s.signatures?.[0]?.name ?? "");
  const [sigNew, setSigNew] = useState(s.sigNew ?? "No signature");
  const [sigReply, setSigReply] = useState(s.sigReply ?? "No signature");
  const [naming, setNaming] = useState(false);
  const [newName, setNewName] = useState("");
  const v = s.vacation;
  const [vac, setVac] = useState(v?.on ? "on" : "off");
  const [first, setFirst] = useState(toIsoInput(v?.first) || todayOf(g.doc));
  const [hasLast, setHasLast] = useState(Boolean(v?.last));
  const [last, setLast] = useState(toIsoInput(v?.last));
  const [subject, setSubject] = useState(v?.subject ?? "");
  const [message, setMessage] = useState(v?.message ?? "");
  const [contacts, setContacts] = useState(Boolean(v?.contactsOnly));
  const sig = sigs.find((x) => x.name === cur);
  const save = () => {
    const lines = [`Undo Send: ${undo} seconds`, `Default reply behavior: ${reply}`];
    sigs.forEach((x) => lines.push(`Signature: ${x.name} = ${x.text.replace(/\n/g, " / ")}`));
    lines.push(`For new emails use: ${sigNew}`, `On reply/forward use: ${sigReply}`);
    lines.push(`Vacation responder: ${vac}`);
    if (vac === "on") {
      lines.push(`First day: ${first ? fmtMonthDayYear(first) : ""}`, `Last day: ${hasLast && last ? fmtMonthDayYear(last) : "none"}`, `Subject: ${subject}`, `Message: ${message.replace(/\n+/g, " ")}`, `Only send a response to people in my Contacts: ${contacts ? "yes" : "no"}`);
    }
    g.type("settings:general", lines.join("\n"));
  };
  return (
    <div className="max-w-[900px]">
      <SettingRow label="Undo Send:">
        <label className="flex items-center gap-2">
          Send cancellation period:
          <select aria-label="Send cancellation period" value={undo} onChange={(e) => setUndo(e.target.value)} className="h-8 rounded border border-[#747775] px-1">
            {["5", "10", "20", "30"].map((n) => <option key={n}>{n}</option>)}
          </select>
          seconds
        </label>
      </SettingRow>
      <SettingRow label="Default reply behavior:">
        {(["Reply", "Reply all"] as const).map((o) => (
          <label key={o} className="mr-6 inline-flex items-center gap-2"><input type="radio" name="replyDefault" aria-label={o} checked={reply === o} onChange={() => setReply(o)} className="accent-[#0b57d0]" />{o}</label>
        ))}
      </SettingRow>
      <SettingRow label={<>Signature:<span className="block text-[12px] font-normal text-[#5f6368]">(appended at the end of all outgoing messages)</span></>}>
        <div className="flex gap-3">
          <div className="w-[200px] shrink-0">
            {sigs.length === 0 && <p className="mb-2 text-[#5f6368]">No signatures</p>}
            {sigs.map((x) => (
              <button key={x.name} type="button" onClick={() => setCur(x.name)} className={`block w-full truncate rounded px-2 py-1.5 text-left ${cur === x.name ? "bg-[#d3e3fd]" : "hover:bg-[#f1f3f4]"}`}>{x.name}</button>
            ))}
            <Btn kind="outlined" small onClick={() => { setNewName(""); setNaming(true); }} className="mt-2" label="Create new"><Icon name="plus" size={16} color={BLUE} /> Create new</Btn>
          </div>
          {sig && (
            <textarea aria-label="Signature text" value={sig.text} onChange={(e) => setSigs((l) => l.map((x) => (x.name === sig.name ? { ...x, text: e.target.value } : x)))} onKeyDown={(e) => e.stopPropagation()} className="h-28 flex-1 rounded border border-[#747775] p-2 outline-none focus:border-2 focus:border-[#0b57d0]" />
          )}
        </div>
        <div className="mt-4 text-[12px] font-medium uppercase text-[#444746]">Signature defaults</div>
        <div className="mt-1 flex flex-wrap gap-6">
          <Select label="For new emails use" value={sigNew} options={["No signature", ...sigs.map((x) => x.name)]} onChange={setSigNew} className="w-[220px]" />
          <Select label="On reply/forward use" value={sigReply} options={["No signature", ...sigs.map((x) => x.name)]} onChange={setSigReply} className="w-[220px]" />
        </div>
      </SettingRow>
      <SettingRow label={<>Vacation responder:<span className="block text-[12px] font-normal text-[#5f6368]">(sends an automated reply to incoming messages)</span></>}>
        {[["off", "Vacation responder off"], ["on", "Vacation responder on"]].map(([k, l]) => (
          <label key={k} className="mb-1 flex items-center gap-2"><input type="radio" name="vacation" aria-label={l} checked={vac === k} onChange={() => setVac(k)} className="accent-[#0b57d0]" />{l}</label>
        ))}
        <div className={`mt-2 space-y-2 ${vac === "on" ? "" : "pointer-events-none opacity-50"}`}>
          <label className="flex items-center gap-3">First day: <input type="date" aria-label="First day" value={first} onChange={(e) => setFirst(e.target.value)} className="h-8 rounded border border-[#747775] px-2" /></label>
          <div className="flex items-center gap-3">
            <Check label="Last day:" checked={hasLast} onChange={setHasLast} />
            <input type="date" aria-label="Last day" value={last} onChange={(e) => { setLast(e.target.value); setHasLast(true); }} className="h-8 rounded border border-[#747775] px-2" />
          </div>
          <label className="flex items-center gap-3">Subject: <input aria-label="Vacation subject" value={subject} onChange={(e) => setSubject(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-8 flex-1 rounded border border-[#747775] px-2" /></label>
          <label className="flex items-start gap-3">Message: <textarea aria-label="Vacation message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-24 flex-1 rounded border border-[#747775] p-2" /></label>
          <Check label="Only send a response to people in my Contacts" checked={contacts} onChange={setContacts} />
        </div>
      </SettingRow>
      <div className="flex justify-center gap-3 py-6">
        <Btn onClick={save} label="Save Changes">Save Changes</Btn>
        <Btn kind="outlined" onClick={() => g.cmd("gm.settings", "close")} label="Cancel">Cancel</Btn>
      </div>
      {naming && (
        <Modal title="Name new signature" onClose={() => setNaming(false)} width={420} footer={<><Btn kind="text" onClick={() => setNaming(false)}>Cancel</Btn><Btn disabled={!newName.trim()} onClick={() => { setSigs((l) => [...l, { name: newName.trim(), text: "" }]); setCur(newName.trim()); setNaming(false); }}>Create</Btn></>}>
          <Field label="Signature name" value={newName} onChange={setNewName} autoFocus onEnter={() => { if (newName.trim()) { setSigs((l) => [...l, { name: newName.trim(), text: "" }]); setCur(newName.trim()); setNaming(false); } }} />
        </Modal>
      )}
    </div>
  );
}

function InboxSettings() {
  const g = useGm();
  const [cats, setCats] = useState<GmCategory[]>(categoriesOn(g.doc));
  const [markers, setMarkers] = useState(g.doc.settings?.importanceMarkers !== false);
  const save = () => g.type("settings:inbox", `Categories: ${CATEGORY_ORDER.filter((c) => cats.includes(c)).join(", ")}\nImportance markers: ${markers ? "Show markers" : "No markers"}`);
  return (
    <div className="max-w-[900px]">
      <SettingRow label="Inbox type:"><select aria-label="Inbox type" defaultValue="Default" className="h-8 rounded border border-[#747775] px-1"><option>Default</option></select></SettingRow>
      <SettingRow label="Categories:">
        {CATEGORY_ORDER.map((c) => (
          <label key={c} className={`flex h-8 items-center gap-3 ${c === "Primary" ? "text-[#9aa0a6]" : ""}`}>
            <input type="checkbox" aria-label={c} disabled={c === "Primary"} checked={cats.includes(c)} onChange={(e) => setCats((s) => (e.target.checked ? [...s, c] : s.filter((x) => x !== c)))} className="h-[18px] w-[18px] accent-[#0b57d0]" />
            {c}
          </label>
        ))}
      </SettingRow>
      <SettingRow label="Importance markers:">
        {[["Show markers", true], ["No markers", false]].map(([l, val]) => (
          <label key={String(l)} className="mb-1 flex items-center gap-2"><input type="radio" name="markers" aria-label={String(l)} checked={markers === val} onChange={() => setMarkers(Boolean(val))} className="accent-[#0b57d0]" />{String(l)}</label>
        ))}
      </SettingRow>
      <div className="flex justify-center gap-3 py-6">
        <Btn onClick={save} label="Save Changes">Save Changes</Btn>
        <Btn kind="outlined" onClick={() => g.cmd("gm.settings", "close")}>Cancel</Btn>
      </div>
    </div>
  );
}

function FilterSettings() {
  const g = useGm();
  const filters = g.doc.filters ?? [];
  const [del, setDel] = useState<string | null>(null);
  return (
    <div className="max-w-[900px]">
      <p className="mb-2 font-medium">The following filters are applied to all incoming mail:</p>
      {filters.length === 0 && <p className="py-2 text-[#5f6368]">You have no filters.</p>}
      {filters.map((f) => (
        <div key={f.id} className="flex items-start gap-4 border-b border-[#e0e0e0] py-3">
          <div className="flex-1">
            <div><span className="font-medium">Matches:</span> {filterQuery(f.lines)}</div>
            <div className="text-[#444746]"><span className="font-medium text-[#1f1f1f]">Do this:</span> {f.lines.filter((l) => !/^(From|To|Subject|Has the words|Doesn't have):|^Has attachment$|^Also apply/.test(l)).join(", ")}</div>
          </div>
          <button type="button" onClick={() => setDel(f.id)} className="text-[#0b57d0] hover:underline" aria-label={`Delete filter ${filterQuery(f.lines)}`}>delete</button>
        </div>
      ))}
      <p className="mt-6 font-medium">The following email addresses are blocked. Messages from these addresses will appear in Spam:</p>
      {(g.doc.blocked ?? []).length === 0 ? <p className="py-2 text-[#5f6368]">You currently have no blocked addresses.</p> : (g.doc.blocked ?? []).map((b) => <div key={b} className="border-b border-[#e0e0e0] py-2">{b}</div>)}
      {del && (
        <Modal title="Confirm delete" onClose={() => setDel(null)} width={400} footer={<><Btn kind="text" onClick={() => setDel(null)}>Cancel</Btn><Btn onClick={() => { g.cmd("gm.filter.delete", del); setDel(null); }}>OK</Btn></>}>
          <p>Are you sure you want to delete this filter?</p>
        </Modal>
      )}
    </div>
  );
}

function LabelSettings() {
  const g = useGm();
  const [creating, setCreating] = useState(false);
  return (
    <div className="max-w-[900px]">
      <div className="mb-2 font-medium">Labels</div>
      {(g.doc.labels ?? []).map((l) => <div key={l.name} className="border-b border-[#e0e0e0] py-2">{l.name}</div>)}
      <Btn kind="outlined" small className="mt-3" onClick={() => setCreating(true)}>Create new label</Btn>
      {creating && <NewLabelDialog onClose={() => setCreating(false)} />}
    </div>
  );
}

export { canonicalQuery };
