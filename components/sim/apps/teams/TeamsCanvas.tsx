"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { CanvasProps, SimUi, StatusBarProps } from "../../types";
import type { TeamsDoc, TeamsMessage, TeamsUiState, TeamsView } from "./types";
import { TIcon } from "./icons";
import { allChannels, chatTitle, findChannel, findChat, findMessage, personName, serializeForm } from "./model";
import {
  AttachmentChip,
  Avatar,
  Composer,
  Field,
  FloatingMenu,
  IconBtn,
  MenuEntry,
  Modal,
  MORE_REACTIONS,
  PersonAvatar,
  PrimaryBtn,
  ReactionPills,
  REACTIONS,
  RichText,
  SecondaryBtn,
  StatusDot,
  TeamsCtx,
  TeamsCtxValue,
  inputCls,
  useAccepted,
  useOutsideClose,
  useTeams,
} from "./TeamsShared";
import { CalendarView, CallsView, ScheduleForm } from "./TeamsCalendar";
import { ChannelFiles, FileViewer, OneDriveView } from "./TeamsFiles";
import { MeetingWindow, SettingsPage } from "./TeamsMeeting";

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export function TeamsCanvas({ doc, ui, onSelect, onCommit }: CanvasProps<TeamsDoc>) {
  const u = ui as TeamsUiState;
  const [menu, setMenu] = useState<{ x: number; y: number; items: MenuEntry[]; width?: number } | null>(null);
  const [seen, setSeen] = useState<Set<string>>(() => new Set(u.conv ? [u.conv] : []));

  const go = useCallback((patch: Partial<TeamsUiState>) => onSelect(patch as Partial<SimUi>), [onSelect]);
  const act = useCallback(
    (selection: string, c: SimCommit) => {
      onSelect({ selection } as Partial<SimUi>);
      onCommit(c);
    },
    [onSelect, onCommit],
  );
  const cmd = useCallback((selection: string, id: string, value?: string) => act(selection, { kind: "command", id, ...(value !== undefined ? { value: value as SimValue } : {}) }), [act]);
  const openMenu = useCallback((e: { clientX: number; clientY: number } | DOMRect, items: MenuEntry[], width?: number) => {
    if ("clientX" in e) setMenu({ x: e.clientX, y: e.clientY, items, width });
    else setMenu({ x: e.left, y: e.bottom + 4, items, width });
  }, []);
  const closeMenu = useCallback(() => setMenu(null), []);
  const markSeen = useCallback((id: string, on: boolean) => {
    setSeen((s) => {
      const n = new Set(s);
      if (on) n.add(id);
      else n.delete(id);
      return n;
    });
  }, []);

  const ctx: TeamsCtxValue = { doc, ui: u, go, act, cmd, openMenu, closeMenu, seen, markSeen };

  return (
    <TeamsCtx.Provider value={ctx}>
      <div className="relative flex h-full flex-col overflow-hidden bg-[#ebebeb] text-[14px] text-[#242424]" style={{ fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}>
        {doc.meeting ? (
          <MeetingWindow />
        ) : (
          <>
            <TitleBar />
            <div className="flex min-h-0 flex-1">
              <Rail />
              <div className="flex min-w-0 flex-1 overflow-hidden rounded-tl-lg bg-white">
                <MainView />
              </div>
            </div>
            {u.overlay === "settings" && <SettingsPage />}
            {u.overlay === "schedule" && <ScheduleForm />}
          </>
        )}
        {menu && <FloatingMenu x={menu.x} y={menu.y} items={menu.items} width={menu.width} onClose={closeMenu} />}
      </div>
    </TeamsCtx.Provider>
  );
}

export function TeamsStatusBar(_props: StatusBarProps<TeamsDoc>) {
  return null;
}

function MainView() {
  const { ui } = useTeams();
  const view = ui.view ?? "chat";
  if (view === "activity") return <ActivityView />;
  if (view === "teams") return <TeamsView />;
  if (view === "calendar") return <CalendarView />;
  if (view === "calls") return <CallsView />;
  if (view === "onedrive") return <OneDriveView />;
  return <ChatView />;
}

/* ------------------------------------------------------------------ */
/* Title bar, rail, profile                                            */
/* ------------------------------------------------------------------ */

function TitleBar() {
  const { doc, go, openMenu } = useTeams();
  const [q, setQ] = useState("");
  const [profile, setProfile] = useState(false);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const ppl = doc.people.filter((p) => p.name.toLowerCase().includes(s)).map((p) => ({ kind: "person" as const, id: p.id, label: p.name, sub: p.title ?? "" }));
    const chs = allChannels(doc)
      .filter((c) => c.channel.name.toLowerCase().includes(s) || c.team.name.toLowerCase().includes(s))
      .map((c) => ({ kind: "channel" as const, id: c.channel.id, label: c.channel.name, sub: c.team.name }));
    const chats = doc.chats.filter((c) => c.title && c.title.toLowerCase().includes(s)).map((c) => ({ kind: "chat" as const, id: c.id, label: c.title!, sub: "Chat" }));
    return [...ppl, ...chats, ...chs].slice(0, 7);
  }, [q, doc]);

  const openResult = (r: (typeof results)[number]) => {
    setQ("");
    if (r.kind === "channel") go({ view: "teams", conv: r.id, tab: "posts", selection: `channel:${r.id}` });
    else if (r.kind === "chat") go({ view: "chat", conv: r.id, tab: "chat", selection: `chat:${r.id}` });
    else {
      const ch = doc.chats.find((c) => !c.title && c.members.length === 1 && c.members[0] === r.id);
      if (ch) go({ view: "chat", conv: ch.id, tab: "chat", selection: `chat:${ch.id}` });
      else go({ view: "chat", conv: `__new:${r.id}`, selection: `newchat:${r.id}` });
    }
  };

  return (
    <div className="relative flex h-12 shrink-0 items-center gap-2 px-3">
      <div className="flex w-[52px] items-center gap-1 text-[#9e9e9e]" aria-hidden="true">
        <TIcon name="back" size={16} />
        <TIcon name="fwd" size={16} />
      </div>
      <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-[480px]">
          <span className="pointer-events-none absolute left-2.5 top-1.5 text-[#616161]">
            <TIcon name="search" size={16} />
          </span>
          <input
            aria-label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQ("");
              if (e.key === "Enter" && results[0]) openResult(results[0]);
            }}
            placeholder="Search (Ctrl+E)"
            className="h-8 w-full rounded-[4px] border border-transparent bg-white pl-8 pr-2 text-[13px] outline-none placeholder:text-[#616161] focus:border-[#d1d1d1]"
          />
          {results.length > 0 && (
            <div className="absolute left-0 right-0 top-9 z-50 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg">
              {results.map((r) => (
                <button key={`${r.kind}${r.id}`} type="button" onClick={() => openResult(r)} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]">
                  {r.kind === "person" ? <PersonAvatar id={r.id} size={24} /> : <span className="flex h-6 w-6 items-center justify-center rounded bg-[#e8ebfa] text-[#5b5fc7]"><TIcon name={r.kind === "channel" ? "teams" : "chat"} size={14} /></span>}
                  <span className="flex flex-col">
                    <span>{r.label}</span>
                    <span className="text-[11px] text-[#616161]">{r.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        title="Settings and more"
        aria-label="Settings and more"
        onClick={(e) => openMenu(e.currentTarget.getBoundingClientRect(), [{ label: "Settings", icon: "gear", onClick: () => go({ overlay: "settings", settingsPage: "devices", selection: "settings" }) }, { label: "Keyboard shortcuts", icon: "info", disabled: true }, { label: "Help", icon: "info", disabled: true }])}
        className="rounded p-1.5 text-[#424242] hover:bg-[#f5f5f5]"
      >
        <TIcon name="more" size={18} />
      </button>
      <button type="button" aria-label={`Your profile, status ${doc.me.presence}`} title={`${doc.me.name} - ${doc.me.presence}`} onClick={() => setProfile((p) => !p)} className="rounded-full">
        <Avatar name={doc.me.name} size={30} presence={doc.me.presence} ring="#ebebeb" />
      </button>
      <span className="ml-1 hidden gap-4 px-1 text-[#424242] sm:flex" aria-hidden="true">
        <TIcon name="minimize" size={14} />
        <TIcon name="maximize" size={13} />
        <TIcon name="close" size={14} />
      </span>
      {profile && <ProfileCard onClose={() => setProfile(false)} />}
    </div>
  );
}

const STATUS_OPTIONS: [string, TeamsDoc["me"]["presence"]][] = [
  ["Available", "Available"],
  ["Busy", "Busy"],
  ["Do not disturb", "Do not disturb"],
  ["Be right back", "Be right back"],
  ["Appear away", "Away"],
  ["Appear offline", "Offline"],
];

function ProfileCard({ onClose }: { onClose: () => void }) {
  const { doc, cmd, go } = useTeams();
  const [statusOpen, setStatusOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const ref = useOutsideClose(!msgOpen, onClose);
  return (
    <>
      <div ref={ref} className="absolute right-3 top-12 z-[80] w-[320px] rounded-lg border border-[#e0e0e0] bg-white text-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between px-4 pt-3 text-[13px] text-[#616161]">
          <span className="font-semibold text-[#242424]">{doc.org ?? "Contoso"}</span>
          <span className="cursor-default">Sign out</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar name={doc.me.name} size={56} presence={doc.me.presence} />
          <div className="min-w-0">
            <div className="truncate text-[16px] font-semibold">{doc.me.name}</div>
            <div className="truncate text-[12px] text-[#616161]">{doc.me.email ?? ""}</div>
            {doc.me.statusMessage && <div className="mt-1 truncate text-[12px] text-[#424242]">💬 {doc.me.statusMessage}</div>}
          </div>
        </div>
        <div className="border-t border-[#ebebeb] py-1">
          <button type="button" aria-expanded={statusOpen} aria-label={`Status: ${doc.me.presence}`} onClick={() => setStatusOpen((s) => !s)} className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-[#f5f5f5]">
            <StatusDot presence={doc.me.presence} size={12} />
            <span className="flex-1">{doc.me.presence === "Away" ? "Appear away" : doc.me.presence === "Offline" ? "Appear offline" : doc.me.presence}</span>
            <TIcon name={statusOpen ? "chevronUp" : "chevronDown"} size={14} />
          </button>
          {statusOpen && (
            <div className="pb-1 pl-8">
              {STATUS_OPTIONS.map(([label, p]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    cmd("status", "status.set", label);
                    setStatusOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]"
                >
                  <StatusDot presence={p} size={11} />
                  {label}
                </button>
              ))}
              <div className="my-1 border-t border-[#ebebeb]" />
              <button type="button" onClick={() => cmd("status", "status.set", "Reset status")} className="flex w-full items-center gap-3 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]">
                <TIcon name="repeat" size={14} /> Reset status
              </button>
            </div>
          )}
          <button type="button" onClick={() => setMsgOpen(true)} className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-[#f5f5f5]">
            <TIcon name="edit" size={16} />
            <span className="flex-1">{doc.me.statusMessage ? "Edit status message" : "Set status message"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              go({ overlay: "settings", settingsPage: "devices", selection: "settings" });
            }}
            className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-[#f5f5f5]"
          >
            <TIcon name="gear" size={16} />
            <span>Settings</span>
          </button>
        </div>
      </div>
      {msgOpen && <StatusMessageDialog onClose={() => setMsgOpen(false)} />}
    </>
  );
}

function StatusMessageDialog({ onClose }: { onClose: () => void }) {
  const { doc, act, cmd } = useTeams();
  const [text, setText] = useState(doc.me.statusMessage ?? "");
  const [show, setShow] = useState(true);
  const [clear, setClear] = useState(doc.me.statusClearAfter ?? "Today");
  const accepted = useAccepted(doc);
  const done = () =>
    accepted(
      () => act("status", { kind: "type", target: "status", value: serializeForm([["Status message", text.trim()], ["Clear after", clear], ["Show when people message me", show ? "Yes" : "No"]]) }),
      onClose,
    );
  return (
    <Modal
      title="Set status message"
      onClose={onClose}
      width={420}
      footer={
        <>
          {doc.me.statusMessage && (
            <button type="button" onClick={() => accepted(() => cmd("status", "status.clearMessage"), onClose)} className="mr-auto text-[14px] font-semibold text-[#5b5fc7] hover:underline">
              Clear status message
            </button>
          )}
          <SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>
          <PrimaryBtn onClick={done} disabled={!text.trim()}>
            Done
          </PrimaryBtn>
        </>
      }
    >
      <div className="mb-3 flex items-start gap-3 rounded-md border border-[#d1d1d1] p-2">
        <Avatar name={doc.me.name} size={32} presence={doc.me.presence} />
        <textarea aria-label="Status message" value={text} maxLength={280} onChange={(e) => setText(e.target.value)} placeholder="Type a message" rows={3} className="flex-1 resize-none text-[14px] outline-none" />
      </div>
      <label className="mb-3 flex items-center gap-2 text-[13px]">
        <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} aria-label="Show when people message me" />
        Show when people message me
      </label>
      <Field label="Clear status message after">
        <select aria-label="Clear status message after" value={clear} onChange={(e) => setClear(e.target.value)} className={inputCls}>
          {["Never", "Today", "1 hour", "4 hours", "This week"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
    </Modal>
  );
}

const RAIL: [TeamsView, string, string][] = [
  ["activity", "Activity", "activity"],
  ["chat", "Chat", "chat"],
  ["teams", "Teams", "teams"],
  ["calendar", "Calendar", "calendar"],
  ["calls", "Calls", "calls"],
  ["onedrive", "OneDrive", "onedrive"],
];

function Rail() {
  const { doc, ui, go, seen } = useTeams();
  const view = ui.view ?? "chat";
  const badge: Partial<Record<TeamsView, number>> = {
    activity: (doc.activity ?? []).filter((a) => a.unread).length,
    chat: doc.chats.filter((c) => c.unread && !c.hidden && !seen.has(c.id)).length,
  };
  const open = (v: TeamsView) => {
    if (v === "chat") {
      const conv = ui.view === "chat" ? ui.conv : doc.chats.find((c) => !c.hidden)?.id;
      go({ view: v, conv, tab: "chat", selection: conv ? `chat:${conv}` : `view:chat`, highlight: undefined });
    } else if (v === "teams") {
      const conv = ui.view === "teams" ? ui.conv : allChannels(doc)[0]?.channel.id;
      go({ view: v, conv, tab: "posts", selection: conv ? `channel:${conv}` : "view:teams", highlight: undefined });
    } else go({ view: v, selection: `view:${v}`, highlight: undefined, ...(v === "onedrive" ? { folder: "root" } : {}) });
  };
  return (
    <nav className="flex w-[68px] shrink-0 flex-col items-center gap-0.5 pt-1" aria-label="App bar">
      {RAIL.map(([v, label, icon]) => {
        const on = view === v;
        return (
          <button key={v} type="button" aria-label={label} aria-current={on ? "page" : undefined} onClick={() => open(v)} className={`relative flex w-[60px] flex-col items-center gap-0.5 rounded-md py-1.5 text-[10px] ${on ? "font-semibold text-[#5b5fc7]" : "text-[#616161] hover:text-[#5b5fc7]"}`}>
            {on && <span className="absolute left-[-4px] top-2.5 h-5 w-[3px] rounded-full bg-[#5b5fc7]" />}
            <span className="relative">
              <TIcon name={icon} size={22} strokeWidth={on ? 1.7 : 1.4} />
              {Boolean(badge[v]) && <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c4314b] px-1 text-[10px] font-semibold text-white">{badge[v]}</span>}
            </span>
            {label}
          </button>
        );
      })}
      <button type="button" aria-label="Apps" className="mt-1 flex w-[60px] flex-col items-center gap-0.5 rounded-md py-1.5 text-[10px] text-[#616161]">
        <TIcon name="apps" size={22} />
        Apps
      </button>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Message rendering                                                   */
/* ------------------------------------------------------------------ */

function msgMenu(ctx: TeamsCtxValue, m: TeamsMessage, opts: { inChat: boolean; onEdit: () => void; onReply?: () => void; onForward: () => void; onMoreReactions: (e: { clientX: number; clientY: number }) => void }): MenuEntry[] {
  const key = `msg:${m.id}`;
  const mine = m.from === "me";
  const hit = findMessage(ctx.doc, m.id);
  return [
    ...(opts.onReply ? [{ label: "Reply", icon: "reply", onClick: opts.onReply }] : []),
    { label: "More reactions", icon: "emoji", onClick: () => opts.onMoreReactions({ clientX: 0, clientY: 0 }) },
    { separator: true },
    ...(mine ? [{ label: "Edit", icon: "edit", onClick: opts.onEdit }, { label: "Delete", icon: "trash", onClick: () => ctx.cmd(key, "msg.delete") }] : []),
    m.pinned ? { label: "Unpin", icon: "pin", onClick: () => ctx.cmd(key, "msg.unpin") } : { label: "Pin", icon: "pin", onClick: () => ctx.cmd(key, "msg.pin") },
    { label: m.saved ? "Unsave this message" : "Save this message", icon: "bookmark", onClick: () => ctx.cmd(key, "msg.save") },
    {
      label: "Mark as unread",
      icon: "unread",
      onClick: () => {
        if (hit?.chat) ctx.markSeen(hit.chat.id, false);
        ctx.cmd(key, "msg.markUnread");
      },
    },
    { label: "Copy link", icon: "link", onClick: () => ctx.cmd(key, "msg.copyLink") },
    { label: "Forward", icon: "forward", onClick: opts.onForward },
  ];
}

function HoverBar({ m, onMore, onReply }: { m: TeamsMessage; onMore: (e: React.MouseEvent<HTMLButtonElement>) => void; onReply?: () => void }) {
  const { cmd } = useTeams();
  return (
    <div className="absolute -top-4 right-2 z-20 hidden items-center gap-0.5 rounded-md border border-[#e0e0e0] bg-white px-1 py-0.5 shadow-md group-hover:flex group-focus-within:flex">
      {REACTIONS.map(([k, em]) => (
        <button key={k} type="button" title={k} aria-label={k} onClick={() => cmd(`msg:${m.id}`, "msg.react", k)} className="rounded p-0.5 text-[16px] leading-none transition-transform hover:scale-125">
          {em}
        </button>
      ))}
      {onReply && (
        <button type="button" title="Reply" aria-label="Reply" onClick={onReply} className="rounded p-1 text-[#424242] hover:bg-[#f5f5f5]">
          <TIcon name="reply" size={16} />
        </button>
      )}
      <button type="button" title="More options" aria-label="More options" onClick={onMore} className="rounded p-1 text-[#424242] hover:bg-[#f5f5f5]">
        <TIcon name="more" size={16} />
      </button>
    </div>
  );
}

function ForwardDialog({ m, onClose }: { m: TeamsMessage; onClose: () => void }) {
  const { doc, act } = useTeams();
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const accepted = useAccepted(doc);
  const options = Array.from(new Set([...doc.people.map((p) => p.name), ...doc.chats.filter((c) => c.title).map((c) => c.title!)]));
  return (
    <Modal
      title="Forward this message"
      onClose={onClose}
      footer={
        <>
          <SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>
          <PrimaryBtn disabled={!to} onClick={() => accepted(() => act(`forward:${m.id}`, { kind: "type", target: `forward:${m.id}`, value: serializeForm([["To", to], ["Message", text.trim()]]) }), onClose)}>
            Forward
          </PrimaryBtn>
        </>
      }
    >
      <Field label="To">
        <input list="tm-forward-list" aria-label="To" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter a name or chat" className={inputCls} />
        <datalist id="tm-forward-list">
          {options.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      </Field>
      <Field label="Add a message (optional)">
        <textarea aria-label="Add a message" value={text} onChange={(e) => setText(e.target.value)} rows={2} className={inputCls} />
      </Field>
      <div className="rounded-md border-l-4 border-[#c7c7c7] bg-[#f5f5f5] p-2 text-[13px]">
        <div className="font-semibold">{personName(doc, m.from)}</div>
        <RichText text={m.text} />
      </div>
    </Modal>
  );
}

function InlineEdit({ m, onDone }: { m: TeamsMessage; onDone: () => void }) {
  const { doc, act } = useTeams();
  const [text, setText] = useState(m.text);
  const accepted = useAccepted(doc);
  const save = () => accepted(() => act(`edit:${m.id}`, { kind: "type", target: `edit:${m.id}`, value: text.trim() }), onDone);
  return (
    <div className="w-full max-w-[560px] rounded-md border-2 border-[#5b5fc7] bg-white p-2">
      <textarea
        autoFocus
        aria-label="Edit message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            save();
          }
          if (e.key === "Escape") onDone();
        }}
        rows={2}
        className="w-full resize-none text-[14px] outline-none"
      />
      <div className="flex justify-end gap-2">
        <SecondaryBtn onClick={onDone}>Cancel</SecondaryBtn>
        <PrimaryBtn onClick={save}>Done</PrimaryBtn>
      </div>
    </div>
  );
}

function Attachments({ names }: { names?: string[] }) {
  const { doc, cmd } = useTeams();
  if (!names?.length) return null;
  return (
    <div className="mt-1.5 flex flex-wrap gap-2">
      {names.map((n) => {
        const f = doc.files?.find((x) => x.name === n);
        return (
          <button key={n} type="button" aria-label={`Open ${n}`} onClick={() => f && cmd(`file:${f.id}`, "files.open", f.id)} className="text-left">
            <AttachmentChip name={n} />
          </button>
        );
      })}
    </div>
  );
}

function ChatMessage({ m, onReply, compactHeader }: { m: TeamsMessage; onReply: () => void; compactHeader: boolean }) {
  const ctx = useTeams();
  const { doc, ui, cmd } = ctx;
  const [editing, setEditing] = useState(false);
  const [fwd, setFwd] = useState(false);
  const mine = m.from === "me";
  const key = `msg:${m.id}`;
  const hl = ui.highlight === m.id;

  if (m.system) {
    return <div className="my-3 text-center text-[12px] text-[#616161]">{m.system}</div>;
  }
  if (m.deleted) {
    return (
      <div className={`my-1 flex ${mine ? "justify-end" : "pl-10"}`}>
        <div className="rounded-md border border-[#e0e0e0] bg-[#fafafa] px-3 py-1.5 text-[13px] italic text-[#616161]">
          This message has been deleted.{" "}
          {mine && (
            <button type="button" onClick={() => cmd(key, "msg.undoDelete")} className="not-italic font-semibold text-[#5b5fc7] hover:underline">
              Undo
            </button>
          )}
        </div>
      </div>
    );
  }
  const openMore = (e: { clientX: number; clientY: number } | React.MouseEvent<HTMLButtonElement>) => {
    const rect = "currentTarget" in e && e.currentTarget ? (e.currentTarget as HTMLElement).getBoundingClientRect() : null;
    const items = msgMenu(ctx, m, {
      inChat: true,
      onEdit: () => setEditing(true),
      onReply,
      onForward: () => setFwd(true),
      onMoreReactions: () =>
        ctx.openMenu(
          rect ?? { clientX: 400, clientY: 200 },
          MORE_REACTIONS.map(([k, em]) => ({ label: `${em}  ${k}`, onClick: () => cmd(key, "msg.react", k) })),
          200,
        ),
    });
    ctx.openMenu(rect ?? e, items);
  };

  return (
    <div className={`group relative flex gap-2 ${compactHeader ? "mt-0.5" : "mt-3"} ${mine ? "justify-end" : ""}`} onContextMenu={(e) => { e.preventDefault(); openMore({ clientX: e.clientX, clientY: e.clientY }); }}>
      {!mine && <div className="w-8 shrink-0">{!compactHeader && <PersonAvatar id={m.from} size={32} />}</div>}
      <div className={`relative flex max-w-[75%] flex-col ${mine ? "items-end" : "items-start"}`}>
        {!compactHeader && (
          <div className="mb-0.5 flex items-center gap-2 text-[12px] text-[#616161]">
            {!mine && <span className="font-semibold text-[#424242]">{personName(doc, m.from)}</span>}
            <span>{m.time}</span>
            {m.edited && <span>Edited</span>}
            {m.pinned && (
              <span className="flex items-center gap-0.5 text-[#5b5fc7]">
                <TIcon name="pin" size={12} /> Pinned
              </span>
            )}
          </div>
        )}
        {editing ? (
          <InlineEdit m={m} onDone={() => setEditing(false)} />
        ) : (
          <div className={`relative rounded-md px-3 py-2 text-[14px] leading-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${mine ? "bg-[#e8ebfa]" : "bg-white"} ${hl ? "ring-2 ring-[#5b5fc7]" : ""} ${m.important ? "border-l-4 border-[#c4314b]" : ""}`}>
            {m.quote && (
              <div className="mb-1.5 border-l-4 border-[#c7c7c7] bg-black/[0.03] px-2 py-1 text-[12px]">
                <div className="font-semibold">{personName(doc, m.quote.from)}</div>
                <div className="line-clamp-2 text-[#424242]">{m.quote.text.replace(/\*\*|~~/g, "")}</div>
              </div>
            )}
            {m.text && <RichText text={m.text} />}
            <Attachments names={m.attachments} />
            {compactHeader && m.edited && <span className="ml-1 text-[11px] text-[#616161]">Edited</span>}
            <HoverBar m={m} onMore={openMore} onReply={onReply} />
          </div>
        )}
        <ReactionPills reactions={m.reactions} onToggle={(k) => cmd(key, "msg.react", k)} />
      </div>
      {fwd && <ForwardDialog m={m} onClose={() => setFwd(false)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chat view                                                           */
/* ------------------------------------------------------------------ */

function lastPreview(doc: TeamsDoc, msgs: TeamsMessage[]): { text: string; time: string } {
  const m = [...msgs].reverse().find((x) => !x.system || x.system);
  if (!m) return { text: "", time: "" };
  if (m.system) return { text: m.system, time: m.time };
  if (m.deleted) return { text: "This message has been deleted.", time: m.time };
  const who = m.from === "me" ? "You: " : "";
  const t = (m.text || (m.attachments?.length ? `Sent a file: ${m.attachments[0]}` : "")).replace(/\*\*|~~|\n/g, " ").replace(/^- /, "").replace(/(^|\s)@(?=[A-Z])/g, "$1");
  return { text: who + t, time: m.time.replace(/^Yesterday.*/, "Yesterday") };
}

function ChatList() {
  const ctx = useTeams();
  const { doc, ui, go, cmd, seen, markSeen } = ctx;
  const [unreadOnly, setUnreadOnly] = useState(false);
  const chats = doc.chats.filter((c) => !c.hidden && (!unreadOnly || (c.unread && !seen.has(c.id))));
  const pinned = chats.filter((c) => c.pinned);
  const recent = chats.filter((c) => !c.pinned);

  const itemMenu = (e: { clientX: number; clientY: number } | DOMRect, id: string) => {
    const c = findChat(doc, id);
    if (!c) return;
    const key = `chat:${id}`;
    const unread = c.unread && !seen.has(id);
    ctx.openMenu(e, [
      c.pinned ? { label: "Unpin", icon: "pin", onClick: () => cmd(key, "chat.unpin") } : { label: "Pin", icon: "pin", onClick: () => cmd(key, "chat.pin") },
      unread
        ? { label: "Mark as read", icon: "check", onClick: () => { markSeen(id, true); cmd(key, "chat.markRead"); } }
        : { label: "Mark as unread", icon: "unread", onClick: () => { markSeen(id, false); cmd(key, "chat.markUnread"); } },
      c.muted ? { label: "Unmute", icon: "activity", onClick: () => cmd(key, "chat.unmute") } : { label: "Mute", icon: "bellOff", onClick: () => cmd(key, "chat.mute") },
      { label: "Hide", icon: "eyeOff", onClick: () => cmd(key, "chat.hide") },
    ]);
  };

  const row = (id: string) => {
    const c = findChat(doc, id)!;
    const title = chatTitle(doc, c);
    const pv = lastPreview(doc, c.messages);
    const active = ui.conv === id;
    const unread = c.unread && !seen.has(id) && !active;
    const other = c.members.length === 1 && !c.title ? c.members[0] : null;
    return (
      <div
        key={id}
        className={`group relative mx-2 flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 ${active ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "hover:bg-white/70"}`}
        onClick={() => {
          markSeen(id, true);
          go({ view: "chat", conv: id, tab: "chat", selection: `chat:${id}`, highlight: undefined });
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          itemMenu({ clientX: e.clientX, clientY: e.clientY }, id);
        }}
        role="button"
        aria-label={`${title}${unread ? ", unread" : ""}`}
      >
        {other ? (
          <PersonAvatar id={other} size={32} ring={active ? "#fff" : "#f5f5f5"} />
        ) : c.kind === "meeting" ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8ebfa] text-[#5b5fc7]">
            <TIcon name="calendar" size={16} />
          </span>
        ) : (
          <Avatar name={title} size={32} />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className={`flex-1 truncate text-[14px] ${unread ? "font-bold" : ""}`}>{title}</span>
            <span className={`shrink-0 text-[11px] ${unread ? "font-semibold text-[#242424]" : "text-[#616161]"}`}>{pv.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`flex-1 truncate text-[12px] ${unread ? "font-semibold text-[#242424]" : "text-[#616161]"}`}>{pv.text}</span>
            {c.muted && <TIcon name="bellOff" size={12} className="text-[#616161]" />}
          </div>
        </div>
        {unread && <span className="h-2 w-2 shrink-0 rounded-full bg-[#5b5fc7]" aria-hidden="true" />}
        <button
          type="button"
          aria-label={`More options for ${title}`}
          title="More options"
          onClick={(e) => {
            e.stopPropagation();
            itemMenu(e.currentTarget.getBoundingClientRect(), id);
          }}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded bg-white p-1 text-[#424242] shadow-sm hover:text-[#5b5fc7] group-hover:block"
        >
          <TIcon name="more" size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="flex w-[300px] shrink-0 flex-col border-r border-[#e0e0e0] bg-[#f5f5f5]">
      <div className="flex h-14 items-center gap-1 px-4">
        <h1 className="flex-1 text-[18px] font-bold">Chat</h1>
        <IconBtn icon="filter" label="Filter: Unread" active={unreadOnly} onClick={() => setUnreadOnly((x) => !x)} />
        <IconBtn icon="video" label="Meet now" onClick={() => cmd("view:chat", "calendar.meetNow")} />
        <IconBtn icon="newchat" label="New chat" onClick={() => go({ view: "chat", conv: "__new", selection: "view:newchat" })} />
      </div>
      <div className="min-h-0 flex-1 overflow-auto pb-2">
        {pinned.length > 0 && <div className="px-4 pb-1 pt-2 text-[12px] font-semibold text-[#616161]">Pinned</div>}
        {pinned.map((c) => row(c.id))}
        <div className="px-4 pb-1 pt-2 text-[12px] font-semibold text-[#616161]">Recent</div>
        {recent.map((c) => row(c.id))}
        {!chats.length && <div className="px-4 py-6 text-center text-[13px] text-[#616161]">No unread chats</div>}
      </div>
    </div>
  );
}

function ChatView() {
  const { ui } = useTeams();
  const conv = ui.conv ?? "";
  return (
    <>
      <ChatList />
      {conv.startsWith("__new") ? <NewChatPane preset={conv.split(":")[1]} /> : conv ? <ChatPane id={conv} /> : <EmptyPane text="Select a chat to start messaging." />}
    </>
  );
}

function EmptyPane({ text }: { text: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-[#fafafa] text-[14px] text-[#616161]">
      <TIcon name="chat" size={40} className="text-[#c7c7c7]" />
      {text}
    </div>
  );
}

function NewChatPane({ preset }: { preset?: string }) {
  const { doc, go } = useTeams();
  const [ids, setIds] = useState<string[]>(preset ? [preset] : []);
  const [q, setQ] = useState("");
  const matches = q.trim() ? doc.people.filter((p) => !ids.includes(p.id) && p.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : [];
  const sorted = [...ids].sort();
  const add = (id: string) => {
    const next = [...ids, id];
    setQ("");
    if (next.length === 1) {
      const ex = doc.chats.find((c) => !c.title && c.members.length === 1 && c.members[0] === id);
      if (ex) {
        go({ view: "chat", conv: ex.id, tab: "chat", selection: `chat:${ex.id}` });
        return;
      }
    }
    setIds(next);
  };
  const target = `newchat:${sorted.join("+")}`;
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#fafafa]">
      <div className="flex min-h-14 flex-wrap items-center gap-2 border-b border-[#e0e0e0] bg-white px-5 py-2">
        <span className="text-[14px] text-[#616161]">To:</span>
        {ids.map((id) => (
          <span key={id} className="flex items-center gap-1 rounded-full bg-[#ebebeb] py-0.5 pl-0.5 pr-2 text-[13px]">
            <PersonAvatar id={id} size={20} showPresence={false} />
            {personName(doc, id)}
            <button type="button" aria-label={`Remove ${personName(doc, id)}`} onClick={() => setIds(ids.filter((x) => x !== id))}>
              <TIcon name="close" size={12} />
            </button>
          </span>
        ))}
        <div className="relative flex-1">
          <input autoFocus aria-label="Enter name, email, or group" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && matches[0] && add(matches[0].id)} placeholder="Enter name, email, or group" className="w-full min-w-[160px] text-[14px] outline-none" />
          {matches.length > 0 && (
            <div className="absolute left-0 top-7 z-30 w-72 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg">
              {matches.map((p) => (
                <button key={p.id} type="button" onClick={() => add(p.id)} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]">
                  <PersonAvatar id={p.id} size={28} />
                  <span className="flex flex-col">
                    <span>{p.name}</span>
                    <span className="text-[11px] text-[#616161]">{p.title}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center text-[13px] text-[#616161]">{ids.length ? "You're starting a new conversation" : "Add people to start a new chat"}</div>
      {ids.length > 0 && (
        <div className="px-5 pb-4">
          <Composer key={target} target={target} placeholder="Type a message" autoFocus />
        </div>
      )}
    </div>
  );
}

function ChatPane({ id }: { id: string }) {
  const ctx = useTeams();
  const { doc, ui, go, cmd } = ctx;
  const chat = findChat(doc, id);
  const [replyTo, setReplyTo] = useState<TeamsMessage | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const count = chat?.messages.length ?? 0;
  useEffect(() => {
    if (ui.highlight) return;
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [count, id, ui.highlight]);
  useEffect(() => setReplyTo(null), [id]);
  useEffect(() => {
    if (!ui.highlight) return;
    const el = scroller.current?.querySelector(`[data-mid="${ui.highlight}"]`);
    el?.scrollIntoView({ block: "center" });
  }, [ui.highlight]);
  if (!chat) return <EmptyPane text="This chat isn't available." />;
  const title = chatTitle(doc, chat);
  const other = chat.members.length === 1 && !chat.title ? chat.members[0] : null;
  const pinned = chat.messages.find((m) => m.pinned && !m.deleted);
  const ev = chat.event ? doc.events?.find((e) => e.id === chat.event) : undefined;
  const tab = ui.tab === "shared" ? "shared" : "chat";
  const shared = chat.messages.flatMap((m) => m.attachments ?? []);
  const target = replyTo ? `reply:${replyTo.id}` : `chat:${id}`;
  const p = other ? doc.people.find((x) => x.id === other) : undefined;

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#fafafa]">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e0e0e0] bg-white px-5">
        {other ? <PersonAvatar id={other} size={32} /> : chat.kind === "meeting" ? <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8ebfa] text-[#5b5fc7]"><TIcon name="calendar" size={16} /></span> : <Avatar name={title} size={32} />}
        <div className="min-w-0">
          <div className="truncate text-[16px] font-bold">{title}</div>
          {p?.statusMessage && <div className="truncate text-[11px] text-[#616161]">💬 {p.statusMessage}</div>}
        </div>
        <div className="ml-3 flex h-full items-end gap-4">
          {[
            ["chat", "Chat"],
            ["shared", "Shared"],
          ].map(([t, label]) => (
            <button key={t} type="button" aria-label={label} aria-current={tab === t ? "page" : undefined} onClick={() => go({ tab: t })} className={`h-full border-b-[3px] px-0.5 pt-1 text-[14px] ${tab === t ? "border-[#5b5fc7] font-semibold" : "border-transparent text-[#616161] hover:text-[#242424]"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        {chat.kind === "meeting" && ev ? (
          <button type="button" aria-label="Join" onClick={() => cmd(`event:${ev.id}`, "meeting.prejoin", ev.id)} className="flex items-center gap-1.5 rounded-[4px] bg-[#5b5fc7] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-[#4f52b2]">
            <TIcon name="video" size={16} /> Join
          </button>
        ) : (
          <div className="flex items-center rounded-[4px] border border-[#d1d1d1]">
            <button type="button" title="Video call" aria-label="Video call" onClick={() => cmd(`chat:${id}`, "chat.call", "video")} className="rounded-l-[4px] p-1.5 text-[#424242] hover:bg-[#f5f5f5]">
              <TIcon name="video" size={18} />
            </button>
            <span className="h-5 w-px bg-[#d1d1d1]" />
            <button type="button" title="Audio call" aria-label="Audio call" onClick={() => cmd(`chat:${id}`, "chat.call", "audio")} className="rounded-r-[4px] p-1.5 text-[#424242] hover:bg-[#f5f5f5]">
              <TIcon name="calls" size={18} />
            </button>
          </div>
        )}
        <IconBtn icon="addPeople" label={`View and add participants (${chat.members.length + 1})`} />
        <IconBtn icon="more" label="More chat options" onClick={(e) => ctx.openMenu(e.currentTarget.getBoundingClientRect(), [chat.pinned ? { label: "Unpin", icon: "pin", onClick: () => cmd(`chat:${id}`, "chat.unpin") } : { label: "Pin", icon: "pin", onClick: () => cmd(`chat:${id}`, "chat.pin") }, chat.muted ? { label: "Unmute", icon: "activity", onClick: () => cmd(`chat:${id}`, "chat.unmute") } : { label: "Mute", icon: "bellOff", onClick: () => cmd(`chat:${id}`, "chat.mute") }, { label: "Pop out chat", icon: "popout", disabled: true }])} />
      </div>
      {pinned && tab === "chat" && (
        <div className="flex items-center gap-2 border-b border-[#e0e0e0] bg-white px-5 py-1.5 text-[12px]">
          <TIcon name="pin" size={14} className="text-[#5b5fc7]" />
          <span className="font-semibold">{personName(doc, pinned.from)}:</span>
          <button type="button" onClick={() => go({ highlight: pinned.id })} className="flex-1 truncate text-left text-[#424242] hover:underline">
            {pinned.text.replace(/\*\*|~~|\n/g, " ")}
          </button>
        </div>
      )}
      {tab === "shared" ? (
        <div className="flex-1 overflow-auto p-5">
          <h3 className="mb-2 text-[14px] font-semibold">Files</h3>
          {shared.length ? <div className="flex flex-wrap gap-2">{shared.map((n) => <AttachmentChip key={n} name={n} />)}</div> : <p className="text-[13px] text-[#616161]">Files shared in this chat appear here.</p>}
        </div>
      ) : (
        <>
          <div ref={scroller} className="min-h-0 flex-1 overflow-auto px-5 pb-3 pt-2">
            {chat.messages.map((m, i) => {
              const prev = chat.messages[i - 1];
              const compact = Boolean(prev && !prev.system && !prev.deleted && prev.from === m.from && !m.quote);
              return (
                <div key={m.id} data-mid={m.id}>
                  <ChatMessage m={m} compactHeader={compact} onReply={() => setReplyTo(m)} />
                </div>
              );
            })}
          </div>
          <div className="px-5 pb-4">
            {replyTo && (
              <div className="mb-1 flex items-start gap-2 rounded-t-md border border-b-0 border-[#e0e0e0] bg-white px-3 py-2 text-[12px]">
                <div className="flex-1 border-l-4 border-[#5b5fc7] pl-2">
                  <div className="font-semibold">Replying to {personName(doc, replyTo.from)}</div>
                  <div className="line-clamp-1 text-[#616161]">{replyTo.text.replace(/\*\*|~~|\n/g, " ")}</div>
                </div>
                <button type="button" aria-label="Cancel reply" onClick={() => setReplyTo(null)} className="text-[#616161]">
                  <TIcon name="close" size={14} />
                </button>
              </div>
            )}
            <Composer key={target} target={target} placeholder={replyTo ? "Reply" : "Type a message"} onCancel={replyTo ? () => setReplyTo(null) : undefined} autoFocus={Boolean(replyTo)} />
          </div>
        </>
      )}
      <FileViewer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Teams and channels                                                  */
/* ------------------------------------------------------------------ */

function TeamsList() {
  const ctx = useTeams();
  const { doc, ui, go, cmd } = ctx;
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const channelMenu = (e: { clientX: number; clientY: number } | DOMRect, chId: string) => {
    const hit = findChannel(doc, chId);
    if (!hit) return;
    const key = `channel:${chId}`;
    const cur = hit.channel.notifications ?? "Mentions and replies";
    ctx.openMenu(
      e,
      [
        { heading: true, label: "Channel notifications" },
        ...["All new posts", "Mentions and replies", "Off"].map((o) => ({ label: o, checked: cur === o, onClick: () => cmd(key, "channel.notifications", o) })),
        { separator: true },
        { label: hit.channel.pinned ? "Unpin" : "Pin", icon: "pin", onClick: () => cmd(key, "channel.pin") },
        { label: "Copy link to channel", icon: "link", disabled: true },
      ],
      240,
    );
  };
  return (
    <div className="flex w-[300px] shrink-0 flex-col border-r border-[#e0e0e0] bg-[#f5f5f5]">
      <div className="flex h-14 items-center gap-1 px-4">
        <h1 className="flex-1 text-[18px] font-bold">Teams</h1>
        <IconBtn icon="filter" label="Filter" />
        <IconBtn icon="plus" label="Create or join a team" />
      </div>
      <div className="min-h-0 flex-1 overflow-auto pb-2">
        {doc.teams.map((t) => {
          const open = !closed.has(t.id);
          return (
            <div key={t.id} className="mb-1">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setClosed((s) => { const n = new Set(s); if (n.has(t.id)) n.delete(t.id); else n.add(t.id); return n; })}
                className="mx-2 flex w-[calc(100%-16px)] items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/70"
              >
                <TIcon name={open ? "chevronDown" : "chevronRight"} size={12} className="text-[#616161]" />
                <Avatar name={t.name} size={24} square color={t.color ?? "#5b5fc7"} />
                <span className="flex-1 truncate text-[14px] font-semibold">{t.name}</span>
              </button>
              {open &&
                t.channels.map((ch) => {
                  const active = ui.conv === ch.id;
                  return (
                    <div
                      key={ch.id}
                      role="button"
                      aria-label={`${ch.name} channel`}
                      onClick={() => go({ view: "teams", conv: ch.id, tab: "posts", selection: `channel:${ch.id}`, highlight: undefined })}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        channelMenu({ clientX: e.clientX, clientY: e.clientY }, ch.id);
                      }}
                      className={`group relative mx-2 flex cursor-pointer items-center gap-2 rounded-md py-1.5 pl-[52px] pr-8 text-[14px] ${active ? "bg-white font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : ch.unread ? "font-bold hover:bg-white/70" : "hover:bg-white/70"}`}
                    >
                      <span className="truncate">{ch.name}</span>
                      {ch.notifications === "Off" && <TIcon name="bellOff" size={12} className="text-[#616161]" />}
                      <button
                        type="button"
                        aria-label={`More options for ${ch.name}`}
                        title="More options"
                        onClick={(e) => {
                          e.stopPropagation();
                          channelMenu(e.currentTarget.getBoundingClientRect(), ch.id);
                        }}
                        className="absolute right-1.5 top-1/2 hidden -translate-y-1/2 rounded p-0.5 text-[#424242] hover:text-[#5b5fc7] group-hover:block"
                      >
                        <TIcon name="more" size={16} />
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PostMessage({ m, reply, onReply }: { m: TeamsMessage; reply?: boolean; onReply?: () => void }) {
  const ctx = useTeams();
  const { doc, ui, cmd } = ctx;
  const [editing, setEditing] = useState(false);
  const [fwd, setFwd] = useState(false);
  const key = `msg:${m.id}`;
  const hl = ui.highlight === m.id;
  const openMore = (e: { clientX: number; clientY: number } | React.MouseEvent<HTMLButtonElement>) => {
    const rect = "currentTarget" in e && e.currentTarget ? (e.currentTarget as HTMLElement).getBoundingClientRect() : null;
    ctx.openMenu(
      rect ?? e,
      msgMenu(ctx, m, {
        inChat: false,
        onEdit: () => setEditing(true),
        onReply,
        onForward: () => setFwd(true),
        onMoreReactions: () => ctx.openMenu(rect ?? { clientX: 400, clientY: 200 }, MORE_REACTIONS.map(([k, em]) => ({ label: `${em}  ${k}`, onClick: () => cmd(key, "msg.react", k) })), 200),
      }),
    );
  };
  if (m.deleted)
    return (
      <div className={`${reply ? "py-2 pl-12" : "p-3"} text-[13px] italic text-[#616161]`}>
        This message has been deleted.{" "}
        {m.from === "me" && (
          <button type="button" onClick={() => cmd(key, "msg.undoDelete")} className="not-italic font-semibold text-[#5b5fc7]">
            Undo
          </button>
        )}
      </div>
    );
  return (
    <div data-mid={m.id} className={`group relative flex gap-3 ${reply ? "px-4 py-2" : "px-4 pb-2 pt-3"} ${hl ? "bg-[#f0f1fd]" : ""}`} onContextMenu={(e) => { e.preventDefault(); openMore({ clientX: e.clientX, clientY: e.clientY }); }}>
      <PersonAvatar id={m.from} size={reply ? 28 : 32} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[12px] text-[#616161]">
          <span className="font-semibold text-[#242424]">{personName(doc, m.from)}</span>
          <span>{m.time}</span>
          {m.edited && <span>Edited</span>}
          {m.pinned && <span className="flex items-center gap-0.5 text-[#5b5fc7]"><TIcon name="pin" size={12} /> Pinned</span>}
          {m.saved && <TIcon name="bookmark" size={12} className="text-[#5b5fc7]" />}
        </div>
        {m.subject && <div className="mt-0.5 text-[16px] font-semibold">{m.subject}</div>}
        {editing ? <InlineEdit m={m} onDone={() => setEditing(false)} /> : <RichText text={m.text} className="mt-0.5 text-[14px] leading-[20px]" />}
        <Attachments names={m.attachments} />
        <ReactionPills reactions={m.reactions} onToggle={(k) => cmd(key, "msg.react", k)} />
      </div>
      <HoverBar m={m} onMore={openMore} />
      {fwd && <ForwardDialog m={m} onClose={() => setFwd(false)} />}
    </div>
  );
}

function PostCard({ post, channelNames }: { post: TeamsMessage; channelNames: string[] }) {
  const [replying, setReplying] = useState(false);
  const replies = post.replies ?? [];
  const [expanded, setExpanded] = useState(replies.length <= 2);
  const shown = expanded ? replies : replies.slice(-1);
  return (
    <div className="mb-4 rounded-md border border-[#e0e0e0] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <PostMessage m={post} onReply={() => setReplying(true)} />
      {replies.length > 0 && (
        <div className="border-t border-[#f0f0f0]">
          {!expanded && (
            <button type="button" onClick={() => setExpanded(true)} className="px-4 py-1.5 text-[12px] font-semibold text-[#5b5fc7] hover:underline">
              {replies.length - 1} more {replies.length - 1 === 1 ? "reply" : "replies"}
            </button>
          )}
          {shown.map((r) => (
            <PostMessage key={r.id} m={r} reply />
          ))}
        </div>
      )}
      <div className="border-t border-[#f0f0f0] px-4 py-2">
        {replying ? (
          <Composer target={`reply:${post.id}`} placeholder="Reply" compact autoFocus mentionExtra={channelNames} onCancel={() => setReplying(false)} />
        ) : (
          <button type="button" aria-label="Reply" onClick={() => setReplying(true)} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#5b5fc7] hover:underline">
            <TIcon name="reply" size={14} /> Reply
          </button>
        )}
      </div>
    </div>
  );
}

function ChannelPane({ id }: { id: string }) {
  const { doc, ui, go, cmd } = useTeams();
  const hit = findChannel(doc, id);
  const [posting, setPosting] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const count = hit?.channel.posts.length ?? 0;
  useEffect(() => {
    if (!ui.highlight) scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [count, id, ui.highlight]);
  useEffect(() => {
    if (!ui.highlight) return;
    scroller.current?.querySelector(`[data-mid="${ui.highlight}"]`)?.scrollIntoView({ block: "center" });
  }, [ui.highlight]);
  useEffect(() => setPosting(false), [id, count]);
  if (!hit) return <EmptyPane text="This channel isn't available." />;
  const { team, channel } = hit;
  const tab = ui.tab === "files" ? "files" : "posts";
  const channelNames = [channel.name, team.name];
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#fafafa]">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e0e0e0] bg-white px-5">
        <Avatar name={team.name} size={32} square color={team.color ?? "#5b5fc7"} />
        <div className="min-w-0">
          <div className="truncate text-[16px] font-bold">{channel.name}</div>
          <div className="truncate text-[11px] text-[#616161]">{team.name}</div>
        </div>
        <div className="ml-3 flex h-full items-end gap-4">
          {[
            ["posts", "Posts"],
            ["files", "Files"],
          ].map(([t, label]) => (
            <button key={t} type="button" aria-label={label} aria-current={tab === t ? "page" : undefined} onClick={() => go({ tab: t, selection: t === "files" ? `files:${id}` : `channel:${id}` })} className={`h-full border-b-[3px] px-0.5 pt-1 text-[14px] ${tab === t ? "border-[#5b5fc7] font-semibold" : "border-transparent text-[#616161] hover:text-[#242424]"}`}>
              {label}
            </button>
          ))}
          <span className="pb-3 text-[#616161]" aria-hidden="true">
            <TIcon name="plus" size={14} />
          </span>
        </div>
        <div className="flex-1" />
        <button type="button" aria-label="Meet" onClick={() => cmd(`channel:${id}`, "calendar.meetNow")} className="flex items-center gap-1.5 rounded-[4px] border border-[#d1d1d1] px-3 py-1 text-[13px] font-semibold hover:bg-[#f5f5f5]">
          <TIcon name="video" size={16} /> Meet
        </button>
        <IconBtn icon="info" label="Channel info" />
      </div>
      {tab === "files" ? (
        <ChannelFiles channelId={id} />
      ) : (
        <>
          <div ref={scroller} className="min-h-0 flex-1 overflow-auto px-6 pt-4">
            {channel.description && <div className="mb-4 rounded-md bg-[#e8ebfa] px-4 py-2 text-[13px] text-[#424242]">{channel.description}</div>}
            {channel.posts.map((p) => (
              <PostCard key={p.id} post={p} channelNames={channelNames} />
            ))}
          </div>
          <div className="px-6 pb-4 pt-1">
            {posting ? (
              <Composer target={`channel:${id}`} placeholder={`Post in ${channel.name}`} autoFocus mentionExtra={channelNames} onCancel={() => setPosting(false)} />
            ) : (
              <button type="button" aria-label="Start a post" onClick={() => setPosting(true)} className="flex items-center gap-2 rounded-[4px] bg-[#5b5fc7] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#4f52b2]">
                <TIcon name="edit" size={16} /> Start a post
              </button>
            )}
          </div>
        </>
      )}
      <FileViewer />
    </div>
  );
}

function TeamsView() {
  const { ui } = useTeams();
  return (
    <>
      <TeamsList />
      {ui.conv ? <ChannelPane id={ui.conv} /> : <EmptyPane text="Select a channel." />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Activity                                                            */
/* ------------------------------------------------------------------ */

function ActivityView() {
  const { doc, ui, go, cmd } = useTeams();
  const [filter, setFilter] = useState<"all" | "unread" | "mention">("all");
  const items = (doc.activity ?? []).filter((a) => (filter === "unread" ? a.unread : filter === "mention" ? a.kind === "mention" : true));
  const badge: Record<string, string> = { mention: "@", reply: "↩", reaction: "♥", meeting: "📅", file: "📄", missed: "📞" };
  const open = (id: string) => {
    const a = doc.activity?.find((x) => x.id === id);
    if (!a) return;
    cmd(`view:activity`, "activity.open", id);
    const hit = a.target ? findMessage(doc, a.target) : null;
    if (hit?.chat) go({ view: "activity", conv: hit.chat.id, tab: "chat", highlight: a.target, activity: id, selection: `activity:${id}` });
    else if (hit?.channel) go({ view: "activity", conv: hit.channel.id, tab: "posts", highlight: a.target, activity: id, selection: `activity:${id}` });
    else go({ activity: id, selection: `activity:${id}` });
  };
  const selId = ui.activity ?? null;
  const target = selId ? doc.activity?.find((a) => a.id === selId)?.target : undefined;
  const hit = target ? findMessage(doc, target) : null;
  return (
    <>
      <div className="flex w-[300px] shrink-0 flex-col border-r border-[#e0e0e0] bg-[#f5f5f5]">
        <div className="flex h-14 items-center gap-1 px-4">
          <h1 className="flex-1 text-[18px] font-bold">Activity</h1>
        </div>
        <div className="flex gap-1.5 px-4 pb-2">
          {(
            [
              ["all", "All"],
              ["unread", "Unread"],
              ["mention", "@Mentions"],
            ] as const
          ).map(([f, label]) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={`rounded-full border px-2.5 py-0.5 text-[12px] ${filter === f ? "border-[#5b5fc7] bg-[#e8ebfa] font-semibold text-[#5b5fc7]" : "border-[#d1d1d1] bg-white"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-auto pb-2">
          {items.map((a) => (
            <button key={a.id} type="button" onClick={() => open(a.id)} className={`mx-2 flex w-[calc(100%-16px)] items-start gap-2.5 rounded-md px-2 py-2 text-left ${selId === a.id ? "bg-white shadow-sm" : "hover:bg-white/70"}`}>
              <span className="relative">
                <PersonAvatar id={a.from} size={32} showPresence={false} />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#5b5fc7] text-[9px] font-bold text-white">{badge[a.kind]}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className={`flex-1 truncate text-[13px] ${a.unread ? "font-bold" : ""}`}>{personName(doc, a.from)}</span>
                  <span className="text-[11px] text-[#616161]">{a.time}</span>
                </span>
                <span className={`block truncate text-[12px] ${a.unread ? "font-semibold" : "text-[#424242]"}`}>{a.text}</span>
                <span className="block truncate text-[11px] text-[#616161]">{a.where}</span>
              </span>
            </button>
          ))}
          {!items.length && <div className="px-4 py-6 text-center text-[13px] text-[#616161]">Nothing new right now.</div>}
        </div>
      </div>
      {hit?.chat ? <ChatPane id={hit.chat.id} /> : hit?.channel ? <ChannelPane id={hit.channel.id} /> : <EmptyPane text="Select an activity to see it here." />}
    </>
  );
}
