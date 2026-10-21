"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { CanvasProps, SimUi, StatusBarProps } from "../../types";
import type { TeamsDoc, TeamsMessage, TeamsUiState, TeamsView } from "./types";
import { TIcon } from "./icons";
import { allChannels, chatTitle, findChannel, findChat, findMessage, personName, serializeForm } from "./model";
import { AddTabDialog, ApprovalsView, AppsView, ImmersiveReader, JoinTeamPage, ParticipantsPanel, PlannerView } from "./TeamsApps";
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

  const [overlayRoot, setOverlayRoot] = useState<HTMLElement | null>(null);
  const ctx: TeamsCtxValue = { doc, ui: u, go, act, cmd, openMenu, closeMenu, seen, markSeen, overlayRoot };

  return (
    <TeamsCtx.Provider value={ctx}>
      <div ref={setOverlayRoot} className="relative flex h-full flex-col overflow-hidden bg-[#ebebeb] text-[14px] text-[#242424]" style={{ fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}>
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
            {u.overlay === "discover" && <JoinTeamPage />}
            <ImmersiveReader />
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
  const { doc, ui } = useTeams();
  const view = ui.view ?? "chat";
  if (view === "activity") return <ActivityView />;
  if (view === "teams") return doc.layout === "separate" ? <TeamsView /> : <ChatView />;
  if (view === "calendar") return <CalendarView />;
  if (view === "calls") return <CallsView />;
  if (view === "onedrive") return <OneDriveView />;
  if (view === "apps") return <AppsView />;
  if (view === "planner") return <PlannerView />;
  if (view === "approvals") return <ApprovalsView />;
  return <ChatView />;
}

/* ------------------------------------------------------------------ */
/* Title bar, rail, profile                                            */
/* ------------------------------------------------------------------ */

function TitleBar() {
  const { doc, go, openMenu } = useTeams();
  const [q, setQ] = useState("");
  const [profile, setProfile] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
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
    if (r.kind === "channel") go({ view: doc.layout === "separate" ? "teams" : "chat", conv: r.id, tab: "posts", selection: `channel:${r.id}` });
    else if (r.kind === "chat") go({ view: "chat", conv: r.id, tab: "chat", selection: `chat:${r.id}` });
    else {
      const ch = doc.chats.find((c) => !c.title && c.members.length === 1 && c.members[0] === r.id);
      if (ch) go({ view: "chat", conv: ch.id, tab: "chat", selection: `chat:${ch.id}` });
      else go({ view: "chat", conv: `__new:${r.id}`, selection: `newchat:${r.id}` });
    }
  };

  return (
    <div className="flex h-12 shrink-0 items-center gap-2 px-3">
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
      {profile && (
        <ProfileCard
          onClose={() => setProfile(false)}
          onMessage={() => {
            setProfile(false);
            setMsgOpen(true);
          }}
        />
      )}
      {msgOpen && <StatusMessageDialog onClose={() => setMsgOpen(false)} />}
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

function ProfileCard({ onClose, onMessage }: { onClose: () => void; onMessage: () => void }) {
  const { doc, cmd, go } = useTeams();
  const [statusOpen, setStatusOpen] = useState(false);
  const ref = useOutsideClose(true, onClose);
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
          <button type="button" onClick={onMessage} className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-[#f5f5f5]">
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
  ["planner", "Planner", "note"],
  ["approvals", "Approvals", "check"],
];

function Rail() {
  const { doc, ui, go, seen } = useTeams();
  const view = ui.view ?? "chat";
  const badge: Partial<Record<TeamsView, number>> = {
    activity: (doc.activity ?? []).filter((a) => a.unread).length,
    chat: doc.chats.filter((c) => c.unread && !c.hidden && !seen.has(c.id)).length,
  };
  const combined = doc.layout !== "separate";
  const pinned = doc.pinnedApps ?? [];
  const items = RAIL.filter(([v]) => (v === "teams" ? !combined : v === "planner" || v === "approvals" ? pinned.includes(v) : true));
  const open = (v: TeamsView) => {
    if (v === "chat") {
      const conv = ui.view === "chat" ? ui.conv : doc.chats.find((c) => !c.hidden)?.id;
      const isCh = Boolean(conv && findChannel(doc, conv));
      go({ view: v, conv, tab: isCh ? "posts" : "chat", selection: conv ? `${isCh ? "channel" : "chat"}:${conv}` : `view:chat`, highlight: undefined });
    } else if (v === "planner" || v === "approvals") {
      go({ view: v, selection: v, highlight: undefined });
    } else if (v === "teams") {
      const conv = ui.view === "teams" ? ui.conv : allChannels(doc)[0]?.channel.id;
      go({ view: v, conv, tab: "posts", selection: conv ? `channel:${conv}` : "view:teams", highlight: undefined });
    } else go({ view: v, selection: `view:${v}`, highlight: undefined, ...(v === "onedrive" ? { folder: "root" } : {}) });
  };
  return (
    <nav className="flex w-[68px] shrink-0 flex-col items-center gap-0.5 pt-1" aria-label="App bar">
      {items.map(([v, label, icon]) => {
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
      <button type="button" aria-label="Apps" aria-current={view === "apps" ? "page" : undefined} onClick={() => go({ view: "apps", selection: "view:apps", highlight: undefined })} className={`relative mt-1 flex w-[60px] flex-col items-center gap-0.5 rounded-md py-1.5 text-[10px] ${view === "apps" ? "font-semibold text-[#5b5fc7]" : "text-[#616161] hover:text-[#5b5fc7]"}`}>
        {view === "apps" && <span className="absolute left-[-4px] top-2.5 h-5 w-[3px] rounded-full bg-[#5b5fc7]" />}
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
  const pinLabel = opts.inChat ? (m.pinned ? "Unpin for everyone" : "Pin for everyone") : m.pinned ? "Unpin" : "Pin";
  return [
    ...(opts.onReply ? [{ label: "Reply", icon: "reply", onClick: opts.onReply }] : []),
    { label: "More reactions", icon: "emoji", onClick: () => opts.onMoreReactions({ clientX: 0, clientY: 0 }) },
    { separator: true },
    ...(mine ? [{ label: "Edit", icon: "edit", onClick: opts.onEdit }, { label: "Delete", icon: "trash", onClick: () => ctx.cmd(key, "msg.delete") }] : []),
    m.pinned ? { label: pinLabel, icon: "pin", onClick: () => ctx.cmd(key, "msg.unpin") } : { label: pinLabel, icon: "pin", onClick: () => ctx.cmd(key, "msg.pin") },
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
    { separator: true },
    { label: "Immersive Reader", icon: "view", onClick: () => ctx.cmd(key, "msg.immersiveReader", m.id) },
    { label: "Translate", icon: "globe", disabled: true },
  ];
}

function HoverBar({ m, onMore, onReply, onEdit }: { m: TeamsMessage; onMore: (e: React.MouseEvent<HTMLButtonElement>) => void; onReply?: () => void; onEdit?: () => void }) {
  const { cmd, openMenu } = useTeams();
  return (
    <div className="absolute -top-4 right-2 z-20 hidden items-center gap-0.5 rounded-md border border-[#e0e0e0] bg-white px-1 py-0.5 shadow-md group-hover:flex group-focus-within:flex">
      {REACTIONS.map(([k, em]) => (
        <button key={k} type="button" title={k} aria-label={k} onClick={() => cmd(`msg:${m.id}`, "msg.react", k)} className="rounded p-0.5 text-[16px] leading-none transition-transform hover:scale-125">
          {em}
        </button>
      ))}
      <button
        type="button"
        title="More reactions"
        aria-label="More reactions"
        onClick={(e) => openMenu(e.currentTarget.getBoundingClientRect(), MORE_REACTIONS.map(([k, em]) => ({ label: `${em}  ${k}`, onClick: () => cmd(`msg:${m.id}`, "msg.react", k) })), 200)}
        className="rounded p-1 text-[#424242] hover:bg-[#f5f5f5]"
      >
        <TIcon name="emoji" size={16} />
      </button>
      {m.from === "me" && onEdit && (
        <button type="button" title="Edit" aria-label="Edit" onClick={onEdit} className="rounded p-1 text-[#424242] hover:bg-[#f5f5f5]">
          <TIcon name="edit" size={16} />
        </button>
      )}
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
            {m.important && <div className="mb-0.5 text-[12px] font-bold text-[#c4314b]">IMPORTANT!</div>}
            {m.text && <RichText text={m.text} />}
            <Attachments names={m.attachments} />
            <LoopCard m={m} />
            {compactHeader && m.edited && <span className="ml-1 text-[11px] text-[#616161]">Edited</span>}
            <HoverBar m={m} onMore={openMore} onReply={onReply} onEdit={() => setEditing(true)} />
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

function channelMenuItems(ctx: TeamsCtxValue, chId: string): MenuEntry[] {
  const hit = findChannel(ctx.doc, chId);
  if (!hit) return [];
  const key = `channel:${chId}`;
  const off = hit.channel.notifications === "Off";
  return [
    { heading: true, label: "Channel notifications" },
    { label: "All activity", checked: !off, onClick: () => ctx.cmd(key, "channel.notifications", "All activity") },
    { label: "Off", checked: off, onClick: () => ctx.cmd(key, "channel.notifications", "Off") },
    { label: "Custom", disabled: true },
    { separator: true },
    { label: hit.channel.pinned ? "Unpin" : "Pin", icon: "pin", onClick: () => ctx.cmd(key, "channel.pin") },
    { label: "Copy link to channel", icon: "link", disabled: true },
  ];
}

function chatMenuItems(ctx: TeamsCtxValue, id: string): MenuEntry[] {
  const c = findChat(ctx.doc, id);
  if (!c) return [];
  const key = `chat:${id}`;
  const unread = c.unread && !ctx.seen.has(id);
  return [
    c.pinned ? { label: "Unpin", icon: "pin", onClick: () => ctx.cmd(key, "chat.unpin") } : { label: "Pin", icon: "pin", onClick: () => ctx.cmd(key, "chat.pin") },
    unread
      ? { label: "Mark as read", icon: "check", onClick: () => { ctx.markSeen(id, true); ctx.cmd(key, "chat.markRead"); } }
      : { label: "Mark as unread", icon: "unread", onClick: () => { ctx.markSeen(id, false); ctx.cmd(key, "chat.markUnread"); } },
    c.muted ? { label: "Unmute", icon: "activity", onClick: () => ctx.cmd(key, "chat.unmute") } : { label: "Mute", icon: "bellOff", onClick: () => ctx.cmd(key, "chat.mute") },
    { label: "Hide", icon: "eyeOff", onClick: () => ctx.cmd(key, "chat.hide") },
  ];
}

/** "New message" with the New items drop-down (Join team, New channel, New section). */
function NewItemsButtons() {
  const { doc, go, openMenu } = useTeams();
  return (
    <span className="flex items-center">
      <IconBtn icon="newchat" label="New message" onClick={() => go({ view: "chat", conv: "__new", selection: "view:newchat" })} />
      <button
        type="button"
        title="New items"
        aria-label="New items"
        onClick={(e) =>
          openMenu(
            e.currentTarget.getBoundingClientRect(),
            [
              { label: "New message", icon: "newchat", onClick: () => go({ view: "chat", conv: "__new", selection: "view:newchat" }) },
              { label: "New channel", icon: "plus", disabled: true },
              { label: "New section", icon: "plus", disabled: true },
              { separator: true },
              { label: "Join team", icon: "teams", disabled: !(doc.discover ?? []).length, onClick: () => go({ overlay: "discover", selection: "discover" }) },
              { label: "Create team", icon: "teams", disabled: true },
            ],
            200,
          )
        }
        className="-ml-1 rounded-[4px] p-1 text-[#424242] hover:bg-[#f0f0f0] hover:text-[#5b5fc7]"
      >
        <TIcon name="chevronDown" size={14} />
      </button>
    </span>
  );
}

function SectionHead({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button type="button" aria-expanded={open} onClick={onToggle} className="flex w-full items-center gap-1 px-4 pb-1 pt-2 text-left text-[12px] font-semibold text-[#616161] hover:text-[#242424]">
      <TIcon name={open ? "chevronDown" : "chevronRight"} size={10} />
      {label}
    </button>
  );
}

function ChannelRow({ teamId, chId, indent = true }: { teamId: string; chId: string; indent?: boolean }) {
  const ctx = useTeams();
  const { doc, ui, go } = ctx;
  const hit = findChannel(doc, chId);
  if (!hit) return null;
  const { team, channel: ch } = hit;
  const active = ui.conv === ch.id;
  const combined = doc.layout !== "separate";
  const view = combined ? "chat" : "teams";
  return (
    <div
      key={`${teamId}-${ch.id}`}
      role="button"
      aria-label={`${ch.name} channel${indent ? "" : `, ${team.name}`}`}
      onClick={() => go({ view, conv: ch.id, tab: "posts", selection: `channel:${ch.id}`, highlight: undefined })}
      onContextMenu={(e) => {
        e.preventDefault();
        ctx.openMenu({ clientX: e.clientX, clientY: e.clientY }, channelMenuItems(ctx, ch.id), 240);
      }}
      className={`group relative mx-2 flex cursor-pointer items-center gap-2 rounded-md py-1.5 pr-8 text-[14px] ${indent ? "pl-[44px]" : "pl-2"} ${active ? "bg-white font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : ch.unread ? "font-bold hover:bg-white/70" : "hover:bg-white/70"}`}
    >
      {!indent && <Avatar name={team.name} size={28} square color={team.color ?? "#5b5fc7"} />}
      <span className="min-w-0 flex-1 truncate">
        {ch.name}
        {!indent && <span className="block truncate text-[11px] font-normal text-[#616161]">{team.name}</span>}
      </span>
      {ch.notifications === "Off" && <TIcon name="bellOff" size={12} className="text-[#616161]" />}
      <button
        type="button"
        aria-label={`More options for ${ch.name}`}
        title="More options"
        onClick={(e) => {
          e.stopPropagation();
          ctx.openMenu(e.currentTarget.getBoundingClientRect(), channelMenuItems(ctx, ch.id), 240);
        }}
        className="absolute right-1.5 top-1/2 hidden -translate-y-1/2 rounded p-0.5 text-[#424242] hover:text-[#5b5fc7] group-hover:block"
      >
        <TIcon name="more" size={16} />
      </button>
    </div>
  );
}

function TeamTree() {
  const { doc } = useTeams();
  const [closed, setClosed] = useState<Set<string>>(new Set());
  return (
    <>
      {doc.teams.map((t) => {
        const open = !closed.has(t.id);
        return (
          <div key={t.id} className="mb-0.5">
            <button
              type="button"
              aria-expanded={open}
              aria-label={`${t.name} team`}
              onClick={() => setClosed((s) => { const n = new Set(s); if (n.has(t.id)) n.delete(t.id); else n.add(t.id); return n; })}
              className="mx-2 flex w-[calc(100%-16px)] items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/70"
            >
              <TIcon name={open ? "chevronDown" : "chevronRight"} size={12} className="text-[#616161]" />
              <Avatar name={t.name} size={24} square color={t.color ?? "#5b5fc7"} />
              <span className="flex-1 truncate text-[14px] font-semibold">{t.name}</span>
            </button>
            {open && t.channels.map((ch) => <ChannelRow key={ch.id} teamId={t.id} chId={ch.id} />)}
          </div>
        );
      })}
    </>
  );
}

function SavedList() {
  const { doc, go } = useTeams();
  const items: { m: TeamsMessage; where: string; conv: string; channel: boolean }[] = [];
  for (const c of doc.chats) for (const m of c.messages) if (m.saved && !m.deleted) items.push({ m, where: chatTitle(doc, c), conv: c.id, channel: false });
  for (const { channel } of allChannels(doc))
    for (const p of channel.posts) for (const m of [p, ...(p.replies ?? [])]) if (m.saved && !m.deleted) items.push({ m, where: channel.name, conv: channel.id, channel: true });
  if (!items.length) return null;
  const combined = doc.layout !== "separate";
  return (
    <>
      <div className="px-4 pb-1 pt-2 text-[12px] font-semibold text-[#616161]">Saved</div>
      {items.map(({ m, where, conv, channel }) => (
        <button
          key={m.id}
          type="button"
          onClick={() => go({ view: channel && !combined ? "teams" : "chat", conv, tab: channel ? "posts" : "chat", selection: `${channel ? "channel" : "chat"}:${conv}`, highlight: m.id })}
          className="mx-2 flex w-[calc(100%-16px)] items-start gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/70"
        >
          <TIcon name="bookmark" size={14} className="mt-0.5 text-[#5b5fc7]" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px]">{m.text.replace(/\*\*|~~|\n/g, " ")}</span>
            <span className="block truncate text-[11px] text-[#616161]">{personName(doc, m.from)} in {where}</span>
          </span>
        </button>
      ))}
    </>
  );
}

const FILTERS = ["Unread", "Chats", "Channels", "Meetings"] as const;

function ChatList() {
  const ctx = useTeams();
  const { doc, ui, go, cmd, seen, markSeen } = ctx;
  const combined = doc.layout !== "separate";
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number] | "">("");
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const toggle = (k: string) => setClosed((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const isUnread = (c: { id: string; unread?: boolean }) => Boolean(c.unread) && !seen.has(c.id) && ui.conv !== c.id;
  const chats = doc.chats.filter((c) => !c.hidden && (filter === "" || (filter === "Unread" && isUnread(c)) || (filter === "Chats" && c.kind !== "meeting") || (filter === "Meetings" && c.kind === "meeting")));
  const showChats = filter !== "Channels";
  const favChats = showChats ? chats.filter((c) => c.pinned) : [];
  const favChannels = combined && (filter === "" || filter === "Channels") ? allChannels(doc).filter((x) => x.channel.pinned) : [];
  const recent = showChats ? chats.filter((c) => !c.pinned) : [];
  const unreadChannels = filter === "Unread" && combined ? allChannels(doc).filter((x) => x.channel.unread && ui.conv !== x.channel.id) : [];

  const row = (id: string) => {
    const c = findChat(doc, id)!;
    const title = chatTitle(doc, c);
    const pv = lastPreview(doc, c.messages);
    const active = ui.conv === id;
    const unread = isUnread(c);
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
          ctx.openMenu({ clientX: e.clientX, clientY: e.clientY }, chatMenuItems(ctx, id));
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
            ctx.openMenu(e.currentTarget.getBoundingClientRect(), chatMenuItems(ctx, id));
          }}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded bg-white p-1 text-[#424242] shadow-sm hover:text-[#5b5fc7] group-hover:block"
        >
          <TIcon name="more" size={16} />
        </button>
      </div>
    );
  };

  const empty = !favChats.length && !favChannels.length && !recent.length && !unreadChannels.length && !(combined && (filter === "" || filter === "Channels"));

  return (
    <div className="flex w-[300px] shrink-0 flex-col border-r border-[#e0e0e0] bg-[#f5f5f5]">
      <div className="flex h-14 items-center gap-0.5 px-4">
        <h1 className="flex-1 text-[18px] font-bold">Chat</h1>
        <IconBtn icon="filter" label="Filter" active={filterOpen || Boolean(filter)} onClick={() => setFilterOpen((x) => !x)} />
        <IconBtn
          icon="more"
          label="More list options"
          onClick={(e) => ctx.openMenu(e.currentTarget.getBoundingClientRect(), [{ label: "Customize view", icon: "gear", onClick: () => go({ overlay: "settings", settingsPage: "chats", selection: "settings" }) }], 200)}
        />
        <IconBtn icon="video" label="Meet now" onClick={() => cmd("view:chat", "calendar.meetNow")} />
        <NewItemsButtons />
      </div>
      {filterOpen && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {FILTERS.filter((f) => combined || f !== "Channels").map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(filter === f ? "" : f)} className={`rounded-full border px-2.5 py-0.5 text-[12px] ${filter === f ? "border-[#5b5fc7] bg-[#e8ebfa] font-semibold text-[#5b5fc7]" : "border-[#d1d1d1] bg-white"}`}>
              {f}
            </button>
          ))}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-auto pb-2">
        {filter === "" && <SavedList />}
        {(favChats.length > 0 || favChannels.length > 0) && (
          <>
            <SectionHead label="Favorites" open={!closed.has("fav")} onToggle={() => toggle("fav")} />
            {!closed.has("fav") && (
              <>
                {favChats.map((c) => row(c.id))}
                {favChannels.map((x) => <ChannelRow key={x.channel.id} teamId={x.team.id} chId={x.channel.id} indent={false} />)}
              </>
            )}
          </>
        )}
        {recent.length > 0 && (
          <>
            <SectionHead label="Chats" open={!closed.has("chats")} onToggle={() => toggle("chats")} />
            {!closed.has("chats") && recent.map((c) => row(c.id))}
          </>
        )}
        {unreadChannels.map((x) => <ChannelRow key={x.channel.id} teamId={x.team.id} chId={x.channel.id} indent={false} />)}
        {combined && (filter === "" || filter === "Channels") && (
          <>
            <SectionHead label="Teams and channels" open={!closed.has("teams")} onToggle={() => toggle("teams")} />
            {!closed.has("teams") && <TeamTree />}
          </>
        )}
        {empty && <div className="px-4 py-6 text-center text-[13px] text-[#616161]">{filter === "Unread" ? "No unread chats" : "Nothing to show"}</div>}
      </div>
    </div>
  );
}

function ChatView() {
  const { doc, ui } = useTeams();
  const conv = ui.conv ?? "";
  const isChannel = Boolean(conv && !conv.startsWith("__new") && findChannel(doc, conv));
  return (
    <>
      <ChatList />
      {conv.startsWith("__new") ? <NewChatPane preset={conv.split(":")[1]} /> : isChannel ? <ChannelPane id={conv} /> : conv ? <ChatPane id={conv} /> : <EmptyPane text="Select a chat to start messaging." />}
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
  const [showName, setShowName] = useState(false);
  const [groupName, setGroupName] = useState("");
  const matches = q.trim() ? doc.people.filter((p) => !ids.includes(p.id) && p.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : [];
  const sorted = [...ids].sort();
  const add = (id: string) => {
    const next = [...ids, id];
    setQ("");
    if (next.length === 1 && !showName) {
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
          <button type="button" aria-label="Add a group name" title="Add a group name" aria-expanded={showName} onClick={() => setShowName((x) => !x)} className="absolute right-0 top-0 rounded p-0.5 text-[#616161] hover:bg-[#f5f5f5]">
            <TIcon name={showName ? "chevronUp" : "chevronDown"} size={14} />
          </button>
          <input autoFocus aria-label="Enter name, email, or group" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && matches[0] && add(matches[0].id)} placeholder="Enter name, email, or group" className="w-full min-w-[160px] text-[14px] outline-none" />
          {matches.length > 0 && (
            <div className="absolute left-0 top-7 z-30 w-72 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg" role="listbox" aria-label="People">
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
      {showName && (
        <div className="flex items-center gap-2 border-b border-[#e0e0e0] bg-white px-5 py-2">
          <span className="text-[14px] text-[#616161]">Group name:</span>
          <input aria-label="Group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter a group name" className="flex-1 text-[14px] outline-none" />
        </div>
      )}
      <div className="flex flex-1 items-center justify-center text-[13px] text-[#616161]">{ids.length ? "You're starting a new conversation" : "Add people to start a new chat"}</div>
      {ids.length > 0 && (
        <div className="px-5 pb-4">
          <Composer key={target} target={target} placeholder="Type a message" autoFocus prefix={showName && groupName.trim() ? `Group name: ${groupName.trim()}\n` : undefined} />
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
  const [people, setPeople] = useState(false);
  const [naming, setNaming] = useState<string | null>(null);
  const acceptedName = useAccepted(doc);
  const scroller = useRef<HTMLDivElement>(null);
  const count = chat?.messages.length ?? 0;
  useEffect(() => {
    if (ui.highlight) return;
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [count, id, ui.highlight]);
  useEffect(() => {
    setReplyTo(null);
    setPeople(false);
    setNaming(null);
  }, [id]);
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
    <div className="relative flex min-w-0 flex-1 flex-col bg-[#fafafa]">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e0e0e0] bg-white px-5">
        {other ? <PersonAvatar id={other} size={32} /> : chat.kind === "meeting" ? <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8ebfa] text-[#5b5fc7]"><TIcon name="calendar" size={16} /></span> : <Avatar name={title} size={32} />}
        <div className="flex min-w-0 items-center gap-1">
          {naming !== null ? (
            <input
              autoFocus
              aria-label="Group name"
              value={naming}
              onChange={(e) => setNaming(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setNaming(null);
                if (e.key === "Enter" && naming.trim()) acceptedName(() => ctx.act(`chatname:${id}`, { kind: "type", target: `chatname:${id}`, value: naming.trim() }), () => setNaming(null));
              }}
              onBlur={() => setNaming(null)}
              placeholder="Enter a group name"
              className="w-56 rounded-[4px] border border-[#d1d1d1] px-2 py-1 text-[14px] outline-none focus:border-[#5b5fc7]"
            />
          ) : (
            <div className="min-w-0">
              <div className="truncate text-[16px] font-bold">{title}</div>
              {p?.statusMessage && <div className="truncate text-[11px] text-[#616161]">💬 {p.statusMessage}</div>}
            </div>
          )}
          {chat.kind !== "meeting" && chat.members.length > 1 && naming === null && (
            <button type="button" aria-label="Name group chat" title="Name group chat" onClick={() => setNaming(chat.title ?? "")} className="rounded p-1 text-[#616161] hover:bg-[#f5f5f5] hover:text-[#5b5fc7]">
              <TIcon name="edit" size={14} />
            </button>
          )}
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
        <IconBtn icon="addPeople" label="View and add participants" active={people} onClick={() => setPeople((x) => !x)} />
        <IconBtn
          icon="more"
          label="More chat options"
          onClick={(e) =>
            ctx.openMenu(e.currentTarget.getBoundingClientRect(), [
              chat.pinned ? { label: "Unpin", icon: "pin", onClick: () => cmd(`chat:${id}`, "chat.unpin") } : { label: "Pin", icon: "pin", onClick: () => cmd(`chat:${id}`, "chat.pin") },
              chat.muted ? { label: "Unmute", icon: "activity", onClick: () => cmd(`chat:${id}`, "chat.unmute") } : { label: "Mute", icon: "bellOff", onClick: () => cmd(`chat:${id}`, "chat.mute") },
              { label: "Schedule a meeting", icon: "calendar", onClick: () => go({ overlay: "schedule", selection: "schedule", prefill: `chat:${id}` }) },
              { label: "Pop out chat", icon: "popout", disabled: true },
            ])
          }
        />
      </div>
      {people && <ParticipantsPanel chat={chat} onClose={() => setPeople(false)} />}
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
  const { doc } = useTeams();
  const fav = allChannels(doc).filter((x) => x.channel.pinned);
  return (
    <div className="flex w-[300px] shrink-0 flex-col border-r border-[#e0e0e0] bg-[#f5f5f5]">
      <div className="flex h-14 items-center gap-1 px-4">
        <h1 className="flex-1 text-[18px] font-bold">Teams</h1>
        <IconBtn icon="filter" label="Filter" />
        <NewItemsButtons />
      </div>
      <div className="min-h-0 flex-1 overflow-auto pb-2">
        {fav.length > 0 && (
          <>
            <div className="px-4 pb-1 pt-2 text-[12px] font-semibold text-[#616161]">Favorites</div>
            {fav.map((x) => <ChannelRow key={x.channel.id} teamId={x.team.id} chId={x.channel.id} indent={false} />)}
            <div className="px-4 pb-1 pt-3 text-[12px] font-semibold text-[#616161]">Your teams</div>
          </>
        )}
        <TeamTree />
      </div>
    </div>
  );
}

function LoopCard({ m }: { m: TeamsMessage }) {
  const { doc, act } = useTeams();
  const [text, setText] = useState("");
  const accepted = useAccepted(doc);
  if (!m.loop) return null;
  const add = () => {
    if (!text.trim()) return;
    accepted(() => act(`loop:${m.id}`, { kind: "type", target: `loop:${m.id}`, value: text.trim() }), () => setText(""));
  };
  const kind = m.loop.kind;
  return (
    <div className="mt-2 w-[360px] max-w-full rounded-md border border-[#c5cbfa] bg-white text-[13px] text-[#242424]" aria-label={`Loop component: ${kind}`}>
      <div className="flex items-center gap-1.5 border-b border-[#e8ebfa] bg-[#f6f7fe] px-3 py-1.5 text-[12px] font-semibold text-[#4f52b2]">
        <TIcon name="sparkle" size={14} /> {kind}
        <span className="ml-auto text-[11px] font-normal text-[#616161]">Everyone in this conversation can edit</span>
      </div>
      <div className="px-3 py-2">
        {m.loop.items.map((it, i) =>
          kind === "Task list" ? (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <span className="h-3.5 w-3.5 rounded-full border border-[#8a8886]" /> {it}
            </div>
          ) : kind === "Table" ? (
            <div key={i} className="border-b border-[#f0f0f0] py-0.5">{it}</div>
          ) : (
            <p key={i} className="py-0.5">{it}</p>
          ),
        )}
        <div className="mt-1 flex items-center gap-2">
          <input
            aria-label={kind === "Task list" ? "Add a task" : kind === "Table" ? "Add a row" : "Type here"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
            placeholder={kind === "Task list" ? "Add a task" : kind === "Table" ? "Add a row" : "Type here"}
            className="min-w-0 flex-1 rounded border border-transparent px-1 py-0.5 outline-none hover:border-[#e0e0e0] focus:border-[#5b5fc7]"
          />
        </div>
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
    <div data-mid={m.id} className={`group relative ${hl ? "bg-[#f0f1fd]" : ""}`} onContextMenu={(e) => { e.preventDefault(); openMore({ clientX: e.clientX, clientY: e.clientY }); }}>
      {m.headline && !reply && (
        <div className="rounded-t-md bg-gradient-to-r from-[#5b5fc7] to-[#7f85f5] px-5 py-4 text-white">
          <div className="text-[11px] font-semibold uppercase tracking-wider opacity-80">Announcement</div>
          <div className="text-[22px] font-bold leading-tight">{m.headline}</div>
        </div>
      )}
      <div className={`flex gap-3 ${reply ? "px-4 py-2" : "px-4 pb-2 pt-3"}`}>
        <PersonAvatar id={m.from} size={reply ? 28 : 32} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[12px] text-[#616161]">
            <span className="font-semibold text-[#242424]">{personName(doc, m.from)}</span>
            <span>{m.time}</span>
            {m.edited && <span>Edited</span>}
            {m.pinned && <span className="flex items-center gap-0.5 text-[#5b5fc7]"><TIcon name="pin" size={12} /> Pinned</span>}
            {m.saved && <TIcon name="bookmark" size={12} className="text-[#5b5fc7]" />}
            {m.important && <span className="font-bold text-[#c4314b]">IMPORTANT!</span>}
          </div>
          {m.subject && <div className="mt-0.5 text-[16px] font-semibold">{m.subject}</div>}
          {editing ? <InlineEdit m={m} onDone={() => setEditing(false)} /> : <RichText text={m.text} className="mt-0.5 text-[14px] leading-[20px]" />}
          <Attachments names={m.attachments} />
          <LoopCard m={m} />
          <ReactionPills reactions={m.reactions} onToggle={(k) => cmd(key, "msg.react", k)} />
        </div>
      </div>
      <HoverBar m={m} onMore={openMore} onEdit={() => setEditing(true)} />
      {fwd && <ForwardDialog m={m} onClose={() => setFwd(false)} />}
    </div>
  );
}

function PostCard({ post, channelNames }: { post: TeamsMessage; channelNames: string[] }) {
  const { doc } = useTeams();
  const [replying, setReplying] = useState(false);
  const replies = post.replies ?? [];
  const [expanded, setExpanded] = useState(replies.length <= 2);
  const shown = expanded ? replies : replies.slice(-1);
  if (post.system)
    return (
      <div className="mb-4 flex items-center gap-3 rounded-md border border-[#e0e0e0] bg-white px-4 py-3 text-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#e8ebfa] text-[#5b5fc7]">
          <TIcon name="calendar" size={16} />
        </span>
        <span className="flex-1">
          <span className="block font-semibold">{post.subject ?? "Meeting"}</span>
          <span className="text-[#616161]">{post.system}</span>
        </span>
        <span className="text-[12px] text-[#616161]">{personName(doc, post.from)}</span>
      </div>
    );
  return (
    <div className={`mb-4 rounded-md border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${post.important ? "border-l-4 border-[#e0e0e0] border-l-[#c4314b]" : "border-[#e0e0e0]"}`}>
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

function CustomTab({ channelId, tabId }: { channelId: string; tabId: string }) {
  const { doc } = useTeams();
  const hit = findChannel(doc, channelId);
  const tab = hit?.channel.tabs?.find((t) => t.id === tabId);
  if (!hit || !tab) return <EmptyPane text="This tab isn't available." />;
  const tasks = (doc.tasks ?? []).filter((t) => t.plan === hit.channel.name || t.plan === hit.team.name);
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white p-6 text-[14px]">
      <div className="mb-3 flex items-center gap-2 text-[16px] font-semibold">
        <TIcon name="note" size={18} className="text-[#5b5fc7]" /> {tab.name}
      </div>
      {tab.app === "Planner" ? (
        <>
          <p className="mb-3 text-[13px] text-[#616161]">This plan belongs to the {hit.channel.name} channel. Everyone in the team can see and update its tasks.</p>
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-3 border-b border-[#f0f0f0] py-2">
              <span className={`h-4 w-4 rounded-full border-2 ${t.done ? "border-[#5b5fc7] bg-[#5b5fc7]" : "border-[#8a8886]"}`} />
              <span className={`flex-1 ${t.done ? "text-[#9e9e9e] line-through" : ""}`}>{t.title}</span>
              <span className="text-[12px] text-[#616161]">{t.assigned ?? ""}</span>
            </div>
          ))}
          {!tasks.length && <p className="text-[13px] text-[#616161]">No tasks yet. Add tasks to share the work.</p>}
        </>
      ) : (
        <p className="text-[13px] text-[#616161]">This {tab.app} tab is pinned to the top of the {hit.channel.name} channel so the whole team can open it in one click.</p>
      )}
    </div>
  );
}

function ChannelPane({ id }: { id: string }) {
  const ctx = useTeams();
  const { doc, ui, go, cmd } = ctx;
  const hit = findChannel(doc, id);
  const [posting, setPosting] = useState(false);
  const [addTab, setAddTab] = useState(false);
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
  const tab = ui.tab === "files" ? "files" : ui.tab?.startsWith("tab:") ? ui.tab : "posts";
  const channelNames = [channel.name, team.name];
  const tabs: [string, string][] = [["posts", "Posts"], ["files", "Shared"], ...(channel.tabs ?? []).map((t) => [`tab:${t.id}`, t.name] as [string, string])];
  return (
    <div className="relative flex min-w-0 flex-1 flex-col bg-[#fafafa]">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e0e0e0] bg-white px-5">
        <Avatar name={team.name} size={32} square color={team.color ?? "#5b5fc7"} />
        <div className="min-w-0">
          <div className="truncate text-[16px] font-bold">{channel.name}</div>
          <div className="truncate text-[11px] text-[#616161]">{team.name}</div>
        </div>
        <div className="ml-3 flex h-full items-end gap-4">
          {tabs.map(([t, label]) => (
            <button key={t} type="button" aria-label={label} aria-current={tab === t ? "page" : undefined} onClick={() => go({ tab: t, selection: t === "files" ? `files:${id}` : `channel:${id}` })} className={`h-full border-b-[3px] px-0.5 pt-1 text-[14px] ${tab === t ? "border-[#5b5fc7] font-semibold" : "border-transparent text-[#616161] hover:text-[#242424]"}`}>
              {label}
            </button>
          ))}
          <button type="button" aria-label="Add a tab" title="Add a tab" onClick={() => { go({ selection: `channel:${id}` }); setAddTab(true); }} className="mb-3 rounded p-0.5 text-[#616161] hover:bg-[#f5f5f5] hover:text-[#5b5fc7]">
            <TIcon name="plus" size={14} />
          </button>
        </div>
        <div className="flex-1" />
        <div className="flex items-center rounded-[4px] border border-[#d1d1d1]">
          <button type="button" aria-label="Meet" onClick={() => cmd(`channel:${id}`, "calendar.meetNow")} className="flex items-center gap-1.5 rounded-l-[4px] px-3 py-1 text-[13px] font-semibold hover:bg-[#f5f5f5]">
            <TIcon name="video" size={16} /> Meet
          </button>
          <span className="h-5 w-px bg-[#d1d1d1]" />
          <button
            type="button"
            aria-label="Meet options"
            title="Meet options"
            onClick={(e) =>
              ctx.openMenu(
                e.currentTarget.getBoundingClientRect(),
                [
                  { label: "Meet now", icon: "video", onClick: () => cmd(`channel:${id}`, "calendar.meetNow") },
                  { label: "Schedule a meeting", icon: "calendar", onClick: () => go({ overlay: "schedule", selection: "schedule", prefill: `channel:${id}` }) },
                ],
                200,
              )
            }
            className="rounded-r-[4px] px-1.5 py-1.5 hover:bg-[#f5f5f5]"
          >
            <TIcon name="chevronDown" size={12} />
          </button>
        </div>
        <IconBtn icon="more" label="More channel options" onClick={(e) => ctx.openMenu(e.currentTarget.getBoundingClientRect(), channelMenuItems(ctx, id), 240)} />
      </div>
      {tab === "files" ? (
        <ChannelFiles channelId={id} />
      ) : tab.startsWith("tab:") ? (
        <CustomTab channelId={id} tabId={tab.slice(4)} />
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
              <Composer target={`channel:${id}`} placeholder="Type a message" autoFocus post mentionExtra={channelNames} onCancel={() => setPosting(false)} />
            ) : (
              <button type="button" aria-label="Start a post" onClick={() => setPosting(true)} className="flex items-center gap-2 rounded-[4px] bg-[#5b5fc7] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#4f52b2]">
                <TIcon name="edit" size={16} /> Start a post
              </button>
            )}
          </div>
        </>
      )}
      {addTab && <AddTabDialog channelId={id} onClose={() => setAddTab(false)} />}
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
