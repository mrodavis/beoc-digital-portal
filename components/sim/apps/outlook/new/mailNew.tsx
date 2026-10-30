"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { OlFolder, OlMessage, OutlookDoc } from "../types";
import type { Ctx, ComposeDraft } from "../ctx";
import { Avatar, FileBadge, OIcon } from "../parts";
import { MessageBody, resolveToken, suggestionsFor } from "../mail";
import { ACCEPT, DECLINE, TENTATIVE } from "../simkit";
import {
  CATEGORY_COLORS, CATEGORY_SLOTS, SYSTEM_FOLDERS, allFolders, conflictsWith, conversationKey, currentFolder, folderById, moduleOf, people, selIds, sigText, todayOf, unreadIn,
  visibleMessages,
} from "../model";
import { dateGroup, fmtDate, fmtListDate, fmtLong, fmtTime } from "../dates";
import { catLabel, favoritesOf, isSharedFolder } from "./model";
import { NMenuButton, inputCls, type NEntry } from "./ui";

/** The new Outlook canvas context: the classic Ctx plus Fluent menus and Settings. */
export type NCtx = Ctx & {
  nmenu: (at: { x: number; y: number }, items: NEntry[]) => void;
  settings: (page?: string) => void;
  toast: (text: string) => void;
};

const e = (label: string, cmd: string, val?: string, icon?: string, onPick?: () => void): NEntry => ({ label, cmd, val, icon, onPick });

/* ------------------------------------------------------------------ */
/* Menus                                                               */
/* ------------------------------------------------------------------ */

export function categorizeEntries(ctx: NCtx, current: string[] = [], cmd = "item.categorize"): NEntry[] {
  return [
    ...CATEGORY_SLOTS.map((s) => ({ label: catLabel(ctx.doc, s), color: CATEGORY_COLORS[s], checked: current.includes(s), cmd, val: s, onPick: () => ctx.cmd(cmd, s) })),
    { separator: true },
    { label: "New category", icon: "plus", dlg: "newCategory", onPick: () => ctx.openDialog("newCategory") },
    { label: "Clear categories", icon: "close", cmd, val: "Clear All Categories", onPick: () => ctx.cmd(cmd, "Clear All Categories") },
    { label: "Manage categories", icon: "gear", cmd: "settings.open", val: "Manage categories", onPick: () => ctx.settings("Accounts/Categories") },
  ];
}

export function flagEntries(ctx: NCtx): NEntry[] {
  return [
    ...["Today", "Tomorrow", "This week", "Next week", "No date"].map((v) => e(v, "item.followUp", v, "flag", () => ctx.cmd("item.followUp", v))),
    { separator: true },
    e("Mark complete", "item.followUp", "Mark complete", "check", () => ctx.cmd("item.followUp", "Mark complete")),
    e("Clear flag", "item.followUp", "Clear flag", "close", () => ctx.cmd("item.followUp", "Clear flag")),
  ];
}

export function snoozeEntries(ctx: NCtx): NEntry[] {
  return ["Later today", "Tomorrow", "This weekend", "Next week"].map((v) => e(v, "mail.snooze", v, "clock", () => ctx.cmd("mail.snooze", v)));
}

function folderPickEntries(ctx: NCtx): NEntry[] {
  const doc = ctx.doc;
  const tree = ownTree(doc).filter((x) => !["outbox", "drafts", "sent"].includes(x.folder.id));
  return [
    ...tree.map((x) => ({ label: " ".repeat(x.depth) + x.folder.name, icon: "folder", cmd: "mail.move", val: x.folder.name, onPick: () => ctx.cmd("mail.move", x.folder.name) })),
    { separator: true },
    { label: "Move to a different folder...", icon: "folderMove", dlg: "moveTo", onPick: () => ctx.openDialog("moveTo") },
  ];
}

export function messageEntries(ctx: NCtx, m: OlMessage): NEntry[] {
  const doc = ctx.doc;
  const qs = (doc.quickSteps ?? []).map((q) => e(q.name, "home.quickStep", q.name, "bolt", () => ctx.cmd("home.quickStep", q.name)));
  const items: NEntry[] = [];
  if (m.folder === "drafts") items.push(e("Open", "item.open", `msg:${m.id}`, "edit", () => ctx.cmd("item.open", `msg:${m.id}`)), { separator: true });
  items.push(
    e("Reply", "mail.reply", undefined, "reply", () => ctx.cmd("mail.reply")),
    e("Reply all", "mail.replyAll", undefined, "replyAll", () => ctx.cmd("mail.replyAll")),
    e("Forward", "mail.forward", undefined, "forward", () => ctx.cmd("mail.forward")),
    { separator: true },
    e("Delete", "item.delete", undefined, "trash", () => ctx.cmd("item.delete")),
    e("Archive", "mail.archive", undefined, "archive", () => ctx.cmd("mail.archive")),
    {
      label: "Move",
      icon: "folderMove",
      sub: [
        ...folderPickEntries(ctx),
        ...(doc.focused && m.folder === "inbox"
          ? [
              { separator: true },
              m.other
                ? e("Move to Focused inbox", "mail.moveToFocused", undefined, "inbox", () => ctx.cmd("mail.moveToFocused"))
                : e("Move to Other inbox", "mail.moveToOther", undefined, "inbox", () => ctx.cmd("mail.moveToOther")),
              m.other
                ? e("Always move to Focused inbox", "mail.alwaysFocused", undefined, "inbox", () => ctx.cmd("mail.alwaysFocused"))
                : e("Always move to Other inbox", "mail.alwaysOther", undefined, "inbox", () => ctx.cmd("mail.alwaysOther")),
            ]
          : []),
      ],
    },
    m.read ? e("Mark as unread", "mail.markUnread", undefined, "mail", () => ctx.cmd("mail.markUnread")) : e("Mark as read", "mail.markRead", undefined, "mailOpen", () => ctx.cmd("mail.markRead")),
    { label: "Flag", icon: "flag", sub: flagEntries(ctx) },
    e(m.pinned ? "Unpin" : "Pin", "mail.pin", undefined, "pin", () => ctx.cmd("mail.pin")),
    { label: "Snooze", icon: "alarm", sub: snoozeEntries(ctx) },
    { label: "Categorize", icon: "tag", sub: categorizeEntries(ctx, m.categories) },
    { separator: true },
    {
      label: "Report",
      icon: "shield",
      sub: [
        e("Report phishing", "home.report", "Report phishing", "warning", () => ctx.cmd("home.report", "Report phishing")),
        e(m.folder === "junk" ? "Not junk" : "Report junk", "home.report", m.folder === "junk" ? "Not junk" : "Report junk", "junk", () => ctx.cmd("home.report", m.folder === "junk" ? "Not junk" : "Report junk")),
      ],
    },
    { label: "Block", icon: "junk", sub: [e("Block sender", "home.block", "Block sender", "junk", () => ctx.cmd("home.block", "Block sender"))] },
    {
      label: "Rules",
      icon: "rules",
      sub: [
        { label: "Create rule...", icon: "rules", dlg: "createRuleQuick", onPick: () => ctx.openDialog("createRuleQuick") },
        { label: "Manage rules", icon: "gear", cmd: "settings.open", val: "Manage rules", onPick: () => ctx.settings("Mail/Rules") },
      ],
    },
    { label: "Quick steps", icon: "bolt", sub: [...qs, ...(qs.length ? [{ separator: true } as NEntry] : []), { label: "Manage quick steps", icon: "gear", cmd: "settings.open", val: "Manage quick steps", onPick: () => ctx.settings("Mail/Quick steps") }] },
    { label: "Sweep", icon: "sweep", dlg: "sweep", onPick: () => ctx.openDialog("sweep") },
    e("Ignore", "mail.ignore", undefined, "close", () => ctx.cmd("mail.ignore")),
  );
  return items;
}

/* ------------------------------------------------------------------ */
/* Folder pane                                                         */
/* ------------------------------------------------------------------ */

export function ownTree(doc: OutlookDoc): { folder: OlFolder; depth: number }[] {
  const custom = (doc.folders ?? []).filter((f) => !isSharedFolder(doc, f.id));
  const out: { folder: OlFolder; depth: number }[] = [];
  const kids = (p: string | undefined) => custom.filter((f) => (f.parent ?? "") === (p ?? "")).sort((a, b) => a.name.localeCompare(b.name));
  const walk = (f: OlFolder, d: number) => {
    out.push({ folder: f, depth: d });
    for (const k of kids(f.id)) walk(k, d + 1);
  };
  const order = ["inbox", "drafts", "sent", "deleted", "junk", "archive", "outbox"];
  for (const id of order) {
    const f = SYSTEM_FOLDERS.find((x) => x.id === id)!;
    if (id === "outbox" && !doc.messages.some((m) => m.folder === "outbox")) continue;
    walk(f, 0);
  }
  for (const k of kids(undefined)) walk(k, 0);
  return out;
}

const FOLDER_ICONS: Record<string, string> = { inbox: "inbox", drafts: "draft", sent: "send", deleted: "trash", junk: "junk", archive: "archive", outbox: "outbox" };

function NewFolderInput({ onDone, onCancel, initial = "" }: { onDone: (v: string) => void; onCancel: () => void; initial?: string }) {
  const [v, setV] = useState(initial);
  const ref = useRef<HTMLInputElement>(null);
  const done = useRef(false);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);
  const finish = (ok: boolean) => {
    if (done.current) return;
    done.current = true;
    if (ok && v.trim() && v.trim() !== initial) onDone(v.trim());
    else onCancel();
  };
  return (
    <input
      ref={ref}
      aria-label="Folder name"
      data-t="folder.name"
      value={v}
      onChange={(ev) => setV(ev.target.value)}
      onKeyDown={(ev) => {
        ev.stopPropagation();
        if (ev.key === "Enter") finish(true);
        if (ev.key === "Escape") finish(false);
      }}
      onBlur={() => finish(true)}
      className="w-full rounded-[3px] border border-[#0f6cbd] px-1.5 py-[2px] text-[13px] outline-none"
    />
  );
}

export function FolderPaneNew({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const [openFav, setOpenFav] = useState(true);
  const [openAcct, setOpenAcct] = useState(true);
  const [openShared, setOpenShared] = useState(true);
  const [newIn, setNewIn] = useState<string | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const favs = favoritesOf(doc).map((id) => folderById(doc, id)).filter(Boolean) as OlFolder[];
  const tree = ownTree(doc);
  const shared = (doc.shared ?? []).filter((s) => s.added);

  const row = (f: OlFolder, depth: number, keyPrefix: string, fav = false) => {
    const active = moduleOf(doc) === "mail" && !doc.search && currentFolder(doc) === f.id;
    const n = unreadIn(doc, f.id);
    const system = SYSTEM_FOLDERS.some((s) => s.id === f.id);
    const sharedF = isSharedFolder(doc, f.id);
    const go = () => ctx.cmd("mail.folder", sharedF ? f.id : f.name);
    const menu: NEntry[] = [
      { label: "Create new subfolder", icon: "folder", onPick: () => setNewIn(f.id) },
      ...(!system && !sharedF ? [{ label: "Rename", icon: "edit", onPick: () => setRenaming(f.id) } as NEntry, { label: "Delete folder", icon: "trash", cmd: "folder.delete", onPick: () => { ctx.select(`folder:${f.id}`); ctx.cmd("folder.delete"); } } as NEntry] : []),
      { label: "Mark all as read", icon: "mailOpen", cmd: "folder.markAllRead", onPick: () => { ctx.select(`folder:${f.id}`); ctx.cmd("folder.markAllRead"); } },
      ...(f.id === "deleted" ? [{ label: "Empty folder", icon: "trash", cmd: "mail.emptyDeleted", onPick: () => ctx.cmd("mail.emptyDeleted") } as NEntry] : []),
      { separator: true },
      { label: favoritesOf(doc).includes(f.id) ? "Remove from Favorites" : "Add to Favorites", icon: "star", cmd: "folder.favorite", val: f.id, onPick: () => ctx.cmd("folder.favorite", f.id) },
    ];
    return (
      <Fragment key={`${keyPrefix}${f.id}`}>
        <div
          role="treeitem"
          aria-selected={active}
          tabIndex={-1}
          data-sel={fav ? undefined : `folder:${f.id}`}
          data-folder={f.id}
          aria-label={`${f.name}${n ? `, ${n} unread` : ""}`}
          onClick={go}
          onContextMenu={(ev) => {
            ev.preventDefault();
            ctx.select(`folder:${f.id}`);
            ctx.nmenu({ x: ev.clientX, y: ev.clientY }, menu);
          }}
          onDragOver={(ev) => {
            if (ev.dataTransfer.types.includes("text/x-olmsg") && f.id !== "drafts") ev.preventDefault();
          }}
          onDrop={(ev) => {
            ev.preventDefault();
            const ids = ev.dataTransfer.getData("text/x-olmsg").split(",").filter(Boolean);
            if (!ids.length) return;
            ctx.select(ids.map((i) => `msg:${i}`).join(","));
            ctx.cmd("mail.move", sharedF ? f.id : f.name);
          }}
          className={`relative mx-1 flex cursor-default items-center gap-2 rounded-[4px] py-[5px] pr-2 text-[13px] ${active ? "bg-[#d6e7f8] font-semibold" : "hover:bg-[#ebebeb]"}`}
          style={{ paddingLeft: 10 + depth * 14 }}
        >
          {active && <span className="absolute left-0 top-1.5 h-4 w-[3px] rounded-full bg-[#0f6cbd]" />}
          <OIcon name={FOLDER_ICONS[f.id] ?? (f.name === "Inbox" ? "inbox" : f.name === "Sent Items" ? "send" : "folder")} size={15} className="text-gray-600" />
          {renaming === f.id && !fav ? (
            <NewFolderInput initial={f.name} onDone={(v) => { setRenaming(null); ctx.commit({ kind: "type", target: `folder:${f.id}`, value: v }); }} onCancel={() => setRenaming(null)} />
          ) : (
            <>
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              {n > 0 && <span className={`text-[12px] ${f.id === "drafts" ? "text-gray-600" : "font-semibold text-[#0f6cbd]"}`}>{n}</span>}
            </>
          )}
        </div>
        {newIn === f.id && !fav && (
          <div className="mx-1 py-[3px] pr-2" style={{ paddingLeft: 34 + (depth + 1) * 14 }}>
            <NewFolderInput onDone={(v) => { setNewIn(null); ctx.commit({ kind: "dialog", id: "newFolder", values: { name: v, parent: f.name, contains: "Mail and Post Items" } }); }} onCancel={() => setNewIn(null)} />
          </div>
        )}
      </Fragment>
    );
  };

  const head = (label: string, open: boolean, toggle: () => void, onCtx?: (ev: React.MouseEvent) => void, testId?: string) => (
    <button
      type="button"
      onClick={toggle}
      onContextMenu={onCtx}
      data-acct={testId}
      className="flex w-full items-center gap-1.5 px-2 pb-1 pt-2 text-left text-[13px] font-semibold text-gray-800"
    >
      <OIcon name={open ? "chevronDown" : "chevronRight"} size={11} />
      <span className="truncate">{label}</span>
    </button>
  );

  const acctMenu = (ev: React.MouseEvent) => {
    ev.preventDefault();
    ctx.nmenu({ x: ev.clientX, y: ev.clientY }, [
      { label: "Create new folder", icon: "folder", onPick: () => setNewIn("__root") },
      { label: "Add shared folder or mailbox", icon: "group", dlg: "addShared", onPick: () => ctx.openDialog("addShared") },
    ]);
  };

  return (
    <nav aria-label="Folder pane" role="tree" className="min-h-0 flex-1 overflow-auto pb-2">
      {head("Favorites", openFav, () => setOpenFav((v) => !v))}
      {openFav && favs.map((f) => row(f, 0, "fav-", true))}
      {head(doc.account.email, openAcct, () => setOpenAcct((v) => !v), acctMenu, "account")}
      {openAcct && tree.map((x) => row(x.folder, x.depth, ""))}
      {openAcct && newIn === "__root" && (
        <div className="mx-1 py-[3px] pl-[34px] pr-2">
          <NewFolderInput onDone={(v) => { setNewIn(null); ctx.commit({ kind: "dialog", id: "newFolder", values: { name: v, parent: doc.account.email, contains: "Mail and Post Items" } }); }} onCancel={() => setNewIn(null)} />
        </div>
      )}
      {openAcct && (
        <button type="button" data-newfolder="1" onClick={() => setNewIn("__root")} className="mx-1 mt-0.5 flex w-[calc(100%-8px)] items-center gap-2 rounded-[4px] py-[5px] pl-[10px] text-left text-[13px] text-[#0f6cbd] hover:bg-[#ebebeb]">
          <OIcon name="plus" size={14} /> Create new folder
        </button>
      )}
      {shared.length > 0 && (
        <>
          {head("Shared with me", openShared, () => setOpenShared((v) => !v))}
          {openShared &&
            shared.map((s) => (
              <div key={s.email}>
                <div className="flex items-center gap-1.5 px-4 pb-0.5 pt-1.5 text-[12.5px] font-semibold text-gray-700">
                  <OIcon name="group" size={13} /> {s.name}
                </div>
                {allFolders(doc)
                  .filter((f) => f.mailbox?.toLowerCase() === s.email.toLowerCase())
                  .map((f) => row(f, 1, `sh-${s.email}-`))}
              </div>
            ))}
        </>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Message list                                                        */
/* ------------------------------------------------------------------ */

function preview(body: string) {
  return body.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim().slice(0, 120);
}
function displayFrom(m: OlMessage) {
  if (m.folder === "sent" || m.folder === "drafts" || m.folder === "outbox") return (m.to ?? []).map((p) => p.name).join("; ") || "(No recipients)";
  return m.from.name;
}

export function CatPills({ doc, cats }: { doc: OutlookDoc; cats?: string[] }) {
  if (!cats?.length) return null;
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1">
      {cats.map((c) => (
        <span key={c} className="truncate rounded-[3px] px-1.5 text-[11px] leading-[16px] text-gray-900" style={{ background: (CATEGORY_COLORS[c] ?? "#999") + "40", border: `1px solid ${(CATEGORY_COLORS[c] ?? "#999") + "aa"}` }}>
          {catLabel(doc, c)}
        </span>
      ))}
    </span>
  );
}

function Row({ ctx, m, selected }: { ctx: NCtx; m: OlMessage; selected: boolean }) {
  const doc = ctx.doc;
  const unread = !m.read && m.folder !== "sent" && m.folder !== "drafts";
  const ids = selIds(ctx.ui.selection, "msg");
  const flagged = m.flag && !m.flag.complete;
  const quick = (ev: React.MouseEvent, run: () => void) => {
    ev.stopPropagation();
    ctx.select(`msg:${m.id}`);
    run();
  };
  return (
    <div
      role="option"
      aria-selected={selected}
      data-sel={`msg:${m.id}`}
      aria-label={`${unread ? "Unread. " : ""}${displayFrom(m)}. ${m.subject}`}
      draggable
      onDragStart={(ev) => {
        const drag = ids.includes(m.id) ? ids : [m.id];
        if (!ids.includes(m.id)) ctx.select(`msg:${m.id}`);
        ev.dataTransfer.setData("text/x-olmsg", drag.join(","));
      }}
      onClick={(ev) => {
        if (ev.ctrlKey || ev.metaKey) {
          const s = new Set(ids);
          if (s.has(m.id)) s.delete(m.id);
          else s.add(m.id);
          ctx.select(Array.from(s).map((i) => `msg:${i}`).join(","));
          return;
        }
        ctx.select(`msg:${m.id}`);
      }}
      onDoubleClick={() => ctx.cmd("item.open", `msg:${m.id}`)}
      onContextMenu={(ev) => {
        ev.preventDefault();
        if (!ids.includes(m.id)) ctx.select(`msg:${m.id}`);
        ctx.nmenu({ x: ev.clientX, y: ev.clientY }, messageEntries(ctx, m));
      }}
      className={`group relative mx-1 mb-[1px] flex cursor-default gap-2.5 rounded-[4px] px-2 py-2 text-[13px] ${selected ? "bg-[#d6e7f8]" : unread ? "bg-white hover:bg-[#f0f0f0]" : "hover:bg-[#f0f0f0]"} ${m.ignored ? "opacity-60" : ""}`}
    >
      {unread && <span className="absolute inset-y-1 left-0 w-[3px] rounded-full bg-[#0f6cbd]" />}
      <Avatar name={displayFrom(m)} size={32} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          {m.folder === "drafts" && <span className="text-[#c50f1f]">[Draft]</span>}
          <span className={`min-w-0 flex-1 truncate ${unread ? "font-semibold" : ""}`}>{displayFrom(m)}</span>
          <span className="flex items-center gap-1 text-gray-500 group-hover:hidden">
            {m.attachments?.length ? <OIcon name="clip" size={13} /> : null}
            {m.importance === "High" && <span className="font-bold text-[#c50f1f]">!</span>}
            {m.pinned && <OIcon name="pin" size={13} className="text-[#0f6cbd]" />}
            {flagged && <OIcon name="flagFill" size={13} color="#c50f1f" />}
          </span>
          <span className="hidden items-center gap-0.5 group-hover:flex">
            <button type="button" title="Delete" aria-label="Delete" data-c="item.delete" onClick={(ev) => quick(ev, () => ctx.cmd("item.delete"))} className="rounded p-0.5 hover:bg-gray-300">
              <OIcon name="trash" size={14} />
            </button>
            <button type="button" title={m.read ? "Mark as unread" : "Mark as read"} aria-label={m.read ? "Mark as unread" : "Mark as read"} onClick={(ev) => quick(ev, () => ctx.cmd(m.read ? "mail.markUnread" : "mail.markRead"))} className="rounded p-0.5 hover:bg-gray-300">
              <OIcon name={m.read ? "mail" : "mailOpen"} size={14} />
            </button>
            <button type="button" title={flagged ? "Unflag this message" : "Flag this message"} aria-label="Flag this message" onClick={(ev) => quick(ev, () => ctx.cmd("item.followUp", flagged ? "Clear flag" : "Today"))} className="rounded p-0.5 hover:bg-gray-300">
              <OIcon name={flagged ? "flagFill" : "flag"} size={14} color={flagged ? "#c50f1f" : undefined} />
            </button>
            <button type="button" title={m.pinned ? "Unpin" : "Pin"} aria-label="Pin" onClick={(ev) => quick(ev, () => ctx.cmd("mail.pin"))} className="rounded p-0.5 hover:bg-gray-300">
              <OIcon name="pin" size={14} />
            </button>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {m.invite && <OIcon name="calendar" size={12} className="text-gray-500" />}
          {m.body.includes("@" + doc.account.name.split(" ")[0]) && <span className="font-semibold text-[#0f6cbd]" title="Mentions you">@</span>}
          <span className={`min-w-0 flex-1 truncate ${unread ? "font-semibold text-[#0f6cbd]" : "text-gray-800"}`}>{m.subject || "(No subject)"}</span>
          <span className={`shrink-0 whitespace-nowrap text-[11.5px] ${unread ? "font-semibold text-[#0f6cbd]" : "text-gray-500"}`}>{fmtListDate(m.date, todayOf(doc))}</span>
        </div>
        <div className="truncate text-[12px] text-gray-500">
          {m.sendAt && m.folder === "drafts" ? `Scheduled for ${fmtDate(m.sendAt)} ${fmtTime(m.sendAt)} · ` : ""}
          {preview(m.body) || "No preview is available."}
        </div>
        {m.categories?.length ? (
          <div className="mt-0.5">
            <CatPills doc={doc} cats={m.categories} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function MessageListNew({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const list = useMemo(() => visibleMessages(doc), [doc]);
  const selected = new Set(selIds(ctx.ui.selection, "msg"));
  const folder = folderById(doc, currentFolder(doc));
  const focusedTabs = doc.focused && currentFolder(doc) === "inbox" && !doc.search;
  const filterEntries: NEntry[] = [
    ...[["All", "All"], ["Unread", "Unread"], ["Flagged", "Flagged"], ["To me", "To me"], ["Has files", "Has files"], ["Mentions me", "Mentions me"]].map(([label, v]) => ({
      label,
      cmd: "mail.filter",
      val: v,
      checked: label === "All" ? !doc.filter : doc.filter === ({ Unread: "Unread", Flagged: "Flagged", "To me": "Sent To: Me", "Has files": "Has Attachments", "Mentions me": "Mentioned" } as Record<string, string>)[label],
      onPick: () => ctx.cmd("mail.filter", v),
    })),
    { separator: true },
    { label: "Sort", sub: ["Date", "From", "Size", "Importance", "Subject"].map((a) => ({ label: a, cmd: "mail.arrange", val: a, checked: (doc.arrange ?? "Date") === a, onPick: () => ctx.cmd("mail.arrange", a) })) },
  ];
  let last = "";
  const rows: React.ReactNode[] = [];
  const conv = new Set<string>();
  for (const m of list) {
    if (doc.conversations) {
      const k = conversationKey(m);
      if (conv.has(k)) continue;
      conv.add(k);
    }
    const g = m.pinned ? "Pinned" : dateGroup(m.date, todayOf(doc));
    if (g !== last) {
      rows.push(
        <div key={`g-${g}-${m.id}`} className="px-3 pb-1 pt-2 text-[12px] font-semibold text-gray-600">
          {g}
        </div>,
      );
      last = g;
    }
    rows.push(<Row key={m.id} ctx={ctx} m={m} selected={selected.has(m.id)} />);
  }
  return (
    <section aria-label="Message list" className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg bg-white shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]">
      <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-1.5">
        {doc.search ? (
          <span className="flex-1 truncate text-[13px] font-semibold">Results for &quot;{doc.search}&quot;</span>
        ) : focusedTabs ? (
          <div className="flex flex-1 gap-1">
            {(["Focused", "Other"] as const).map((t) => (
              <button
                key={t}
                type="button"
                data-c="mail.focusTab"
                data-v={t}
                onClick={() => ctx.cmd("mail.focusTab", t)}
                className={`rounded-full px-3 py-0.5 text-[13px] ${(doc.focusTab ?? "Focused") === t ? "bg-[#ebf3fc] font-semibold text-[#0f6cbd]" : "text-gray-700 hover:bg-gray-100"}`}
              >
                {t}
              </button>
            ))}
          </div>
        ) : (
          <span className="flex-1 truncate text-[14px] font-semibold">{folder?.name ?? "Inbox"}</span>
        )}
        {doc.filter && (
          <button type="button" data-c="mail.filter" data-v="All" onClick={() => ctx.cmd("mail.filter", "All")} className="rounded-full bg-[#ebf3fc] px-2 text-[11.5px] text-[#0f6cbd]" title="Clear filter">
            {({ "Has Attachments": "Has files", Mentioned: "Mentions me", "Sent To: Me": "To me" } as Record<string, string>)[doc.filter] ?? doc.filter} ✕
          </button>
        )}
        <NMenuButton dd="mail.filter" ariaLabel="Filter" title="Filter" items={filterEntries} className="rounded p-1 text-gray-700 hover:bg-gray-100">
          <OIcon name="filter" size={16} />
        </NMenuButton>
      </div>
      <div role="listbox" aria-label={folder?.name ?? "Messages"} aria-multiselectable="true" className="min-h-0 flex-1 overflow-auto py-1">
        {rows.length === 0 && (
          <div className="flex flex-col items-center px-4 py-10 text-center text-[13px] text-gray-500">
            <OIcon name="inbox" size={40} className="mb-2 text-gray-300" />
            {doc.search ? "We couldn't find any results." : "All done for the day. Enjoy your empty inbox."}
          </div>
        )}
        {rows}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reading pane                                                        */
/* ------------------------------------------------------------------ */

function Bar({ icon, children, tone = "gray" }: { icon: string; children: React.ReactNode; tone?: "gray" | "yellow" | "red" | "blue" }) {
  const cls = tone === "yellow" ? "bg-[#fff9f5] border-[#fdcfb4]" : tone === "red" ? "bg-[#fdf3f4] border-[#eeacb2]" : tone === "blue" ? "bg-[#ebf3fc] border-[#b4d6fa]" : "bg-[#f5f5f5] border-gray-200";
  return (
    <div className={`mb-2 flex items-center gap-2 rounded-[4px] border px-2.5 py-1.5 text-[12.5px] ${cls}`}>
      <OIcon name={icon} size={15} className="text-gray-600" />
      <span className="flex-1">{children}</span>
    </div>
  );
}

/*
 * Accept / Tentative / Decline send the response. Microsoft's support pages don't document the
 * extra response choices new Outlook offers (and community answers say "Do not send a response"
 * isn't always there), so the sim doesn't show any; it sends the response, value Accept /
 * Tentative / Decline.
 */

function InviteCardNew({ ctx, m }: { ctx: NCtx; m: OlMessage }) {
  const inv = m.invite!;
  const conflicts = conflictsWith(ctx.doc, inv.start, inv.end, inv.eventId);
  const btn = "flex items-center gap-1.5 rounded-[4px] border border-gray-300 bg-white px-2.5 py-1 text-[13px] hover:bg-gray-50";
  return (
    <div className="mb-3 rounded-lg border border-gray-200 bg-[#fafafa] p-3 text-[13px]">
      <div className="mb-2 flex items-center gap-2">
        <OIcon name="calendar" size={18} className="text-[#0f6cbd]" />
        <span className="font-semibold">
          {fmtLong(inv.start)} {inv.allDay ? "(all day)" : `${fmtTime(inv.start)} - ${fmtTime(inv.end)}`}
        </span>
      </div>
      <div className="mb-2 text-gray-700">{inv.location || (inv.teams ? "Microsoft Teams Meeting" : "No location")}</div>
      {inv.response ? (
        <p className="font-semibold">{inv.response === "Accepted" ? "You accepted this event." : inv.response === "Tentative" ? "You tentatively accepted this event." : "You declined this event."}</p>
      ) : inv.kind === "cancel" ? (
        <button type="button" className={btn} data-c="invite.removeFromCalendar" onClick={() => ctx.cmd("invite.removeFromCalendar")}>Remove from calendar</button>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          <button type="button" aria-label="Accept" data-c="invite.respond" data-v={ACCEPT[0]} onClick={() => ctx.cmd("invite.respond", ACCEPT[0])} className={btn}>
            <OIcon name="check" size={14} className="text-green-700" /> Accept
          </button>
          <button type="button" aria-label="Tentative" data-c="invite.respond" data-v={TENTATIVE[0]} onClick={() => ctx.cmd("invite.respond", TENTATIVE[0])} className={btn}>
            <span className="font-bold text-[#8a6d00]">?</span> Tentative
          </button>
          <button type="button" aria-label="Decline" data-c="invite.respond" data-v={DECLINE[0]} onClick={() => ctx.cmd("invite.respond", DECLINE[0])} className={btn}>
            <OIcon name="close" size={14} className="text-red-700" /> Decline
          </button>
          {!inv.recurrence && (
            <NMenuButton
              dd="invite.propose"
              ariaLabel="Propose new time"
              items={[
                { label: "I might attend", dlg: "proposeTime", onPick: () => ctx.openDialog("proposeTime") },
                { label: "No, I won't attend", dlg: "proposeTimeDecline", onPick: () => ctx.openDialog("proposeTimeDecline") },
              ]}
              className={btn}
            >
              <OIcon name="clock" size={14} /> Propose new time <OIcon name="chevronDown" size={10} />
            </NMenuButton>
          )}
        </div>
      )}
      {!inv.response && inv.kind !== "cancel" && (
        <p className={`mt-2 flex items-center gap-1 text-[12.5px] ${conflicts.length ? "text-[#a4262c]" : "text-green-800"}`}>
          <OIcon name={conflicts.length ? "warning" : "check"} size={13} />
          {conflicts.length ? `Conflicts with ${conflicts.map((o) => o.evt.title).join(", ")}` : "No conflicts"}
        </p>
      )}
      {inv.teams && (
        <p className="mt-2 flex items-center gap-1.5 border-t border-gray-200 pt-2 text-[12.5px]">
          <OIcon name="teams" size={16} /> <span className="text-[#5b5fc7] underline">Join the meeting now</span>
        </p>
      )}
    </div>
  );
}

/** Select a name to see the profile card; More options › Add to contacts. */
function ProfileName({ ctx, person }: { ctx: NCtx; person: { name: string; email: string } }) {
  const [open, setOpen] = useState(false);
  const known = (ctx.doc.contacts ?? []).some((c) => c.email?.toLowerCase() === person.email.toLowerCase());
  return (
    <span className="relative">
      <button type="button" data-profile={person.email} onClick={() => setOpen((v) => !v)} className="text-[14px] font-semibold hover:underline" title={person.email}>
        {person.name}
      </button>
      {open && (
        <div role="dialog" aria-label={`Profile card: ${person.name}`} className="absolute left-0 top-full z-40 mt-1 w-72 rounded-lg border border-gray-200 bg-white p-3 shadow-xl">
          <div className="flex items-center gap-2.5">
            <Avatar name={person.name} size={44} />
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold">{person.name}</div>
              <div className="truncate text-[12px] text-gray-600">{person.email}</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <button type="button" onClick={() => setOpen(false)} className="flex items-center gap-1 rounded-[4px] border border-gray-300 px-2 py-1 text-[12.5px] hover:bg-gray-50">
              <OIcon name="close" size={13} /> Close
            </button>
            <NMenuButton
              dd="profile.more"
              ariaLabel="More options"
              title="More options"
              items={[
                known
                  ? { label: "Already in your contacts", icon: "person", onPick: () => setOpen(false) }
                  : { label: "Add to contacts", icon: "personAdd", cmd: "people.addSender", val: person.email, onPick: () => { setOpen(false); ctx.cmd("people.addSender", person.email); } },
              ]}
              className="rounded-[4px] border border-gray-300 px-2 py-1 hover:bg-gray-50"
            >
              <OIcon name="more" size={14} />
            </NMenuButton>
          </div>
        </div>
      )}
    </span>
  );
}

export function MessageViewNew({ ctx, m }: { ctx: NCtx; m: OlMessage }) {
  const doc = ctx.doc;
  const [summary, setSummary] = useState(false);
  const junk = m.folder === "junk";
  const btn = "flex items-center gap-1 rounded-[4px] px-1.5 py-1 text-[12.5px] text-gray-700 hover:bg-gray-100";
  const flag = m.flag;
  useEffect(() => setSummary(false), [m.id]);
  return (
    <article aria-label={`Message: ${m.subject}`} className="min-h-0 flex-1 overflow-auto px-5 py-4">
      <div className="mb-3 flex items-start gap-2">
        <h2 className="min-w-0 flex-1 text-[18px] font-semibold leading-snug text-gray-900">{m.subject || "(No subject)"}</h2>
        <CatPills doc={doc} cats={m.categories} />
      </div>
      {doc.copilot && (
        <div className="mb-3 rounded-lg border border-[#d9d0f5] bg-gradient-to-r from-[#f5f2ff] to-[#eef6ff] p-2.5">
          <button type="button" data-c="copilot.summarize" onClick={() => { setSummary(true); ctx.cmd("copilot.summarize", m.id); }} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#5b3fc4]">
            <OIcon name="sparkle" size={15} /> Summary by Copilot
          </button>
          {summary && <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-800">{m.summary ?? `${m.from.name} wrote about "${m.subject}". ${preview(m.body)}`}</p>}
          {summary && <p className="mt-1 text-[11px] text-gray-500">AI-generated content may be incorrect. Check it against the message.</p>}
        </div>
      )}
      <div className="mb-3 flex items-start gap-3 rounded-lg border border-gray-200 p-3">
        <Avatar name={m.from.name} size={40} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <ProfileName ctx={ctx} person={m.from} />
            <span className="text-[12.5px] text-gray-600">&lt;{m.from.email}&gt;</span>
            {m.external && <span className="rounded-[3px] bg-[#fdf3f4] px-1.5 text-[11px] font-semibold text-[#a4262c]">External</span>}
          </div>
          {m.to?.length ? <div className="truncate text-[12.5px] text-gray-600">To: {m.to.map((p) => p.name).join("; ")}</div> : null}
          {m.cc?.length ? <div className="truncate text-[12.5px] text-gray-600">Cc: {m.cc.map((p) => p.name).join("; ")}</div> : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <div className="flex items-center">
            <button type="button" className={btn} aria-label="Reply" title="Reply" data-c="mail.reply" onClick={() => ctx.cmd("mail.reply")}>
              <OIcon name="reply" size={16} />
            </button>
            <button type="button" className={btn} aria-label="Reply all" title="Reply all" data-c="mail.replyAll" onClick={() => ctx.cmd("mail.replyAll")}>
              <OIcon name="replyAll" size={16} />
            </button>
            <button type="button" className={btn} aria-label="Forward" title="Forward" data-c="mail.forward" onClick={() => ctx.cmd("mail.forward")}>
              <OIcon name="forward" size={16} />
            </button>
            <NMenuButton dd="msg.more" ariaLabel="More actions" title="More actions" items={messageEntries(ctx, m)} className={btn}>
              <OIcon name="more" size={16} />
            </NMenuButton>
          </div>
          <span className="text-[12px] text-gray-500">{fmtLong(m.date).replace(/^(\w{3})\w+/, "$1")} {fmtTime(m.date)}</span>
        </div>
      </div>
      {m.firstTime && <Bar icon="info" tone="yellow">You don&apos;t often get email from {m.from.email}. Learn why this is important.</Bar>}
      {junk && (
        <Bar icon="junk" tone="red">
          This message is in Junk Email. Links and other features in it are turned off.{" "}
          <button type="button" data-c="home.report" data-v="Not junk" className="font-semibold text-[#0f6cbd] underline" onClick={() => ctx.cmd("home.report", "Not junk")}>
            It&apos;s not junk
          </button>
        </Bar>
      )}
      {m.reported === "phishing" && <Bar icon="shield" tone="blue">You reported this message as phishing.</Bar>}
      {m.importance === "High" && <Bar icon="important">This message was sent with high importance.</Bar>}
      {m.encrypted && <Bar icon="lock" tone="blue">Encrypt{m.encrypted === "Do Not Forward" ? ": Do Not Forward" : ""}. This message is protected.</Bar>}
      {m.sensitivity && <Bar icon="tag">Sensitivity: {m.sensitivity}</Bar>}
      {m.replied && <Bar icon={m.replied === "forwarded" ? "forward" : "reply"}>{m.replied === "forwarded" ? "You forwarded this message." : "You replied to this message."}</Bar>}
      {flag && !flag.complete && <Bar icon="flag">Follow up.{flag.due ? ` Due ${fmtLong(flag.due)}.` : ""}</Bar>}
      {flag?.complete && <Bar icon="check">Completed.</Bar>}
      {m.sendAt && m.folder === "drafts" && (
        <Bar icon="clock" tone="blue">
          This message will be sent {fmtLong(m.sendAt)} at {fmtTime(m.sendAt)}.{" "}
          <button type="button" className="font-semibold text-[#0f6cbd] underline" data-c="item.open" data-v={`msg:${m.id}`} onClick={() => ctx.cmd("item.open", `msg:${m.id}`)}>
            Cancel send
          </button>
        </Bar>
      )}
      {m.attachments?.length ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {m.attachments.map((a) => (
            <div key={a.name} className="flex max-w-[240px] items-center gap-2 rounded-[4px] border border-gray-300 px-2 py-1.5 text-[12.5px]" title={a.name}>
              <FileBadge name={a.name} size={26} />
              <span className="min-w-0">
                <span className="block truncate">{a.name}</span>
                <span className="block text-[11px] text-gray-500">{a.link ? "Link · OneDrive" : a.size ?? "24 KB"}</span>
              </span>
            </div>
          ))}
        </div>
      ) : null}
      {m.invite && <InviteCardNew ctx={ctx} m={m} />}
      {m.shareInvite && (
        <div className="mb-3 rounded-lg border border-gray-200 bg-[#fafafa] p-3 text-[13px]">
          <p className="mb-2">
            {m.shareInvite.owner.name} shared the calendar &quot;{m.shareInvite.calendar}&quot; with you ({m.shareInvite.permission}).
          </p>
          {doc.flags?.[`accepted:${m.id}`] ? (
            <p className="font-semibold text-green-800">Accepted. The calendar is in your calendar list.</p>
          ) : (
            <button type="button" data-c="share.accept" onClick={() => ctx.cmd("share.accept")} className="rounded-[4px] bg-[#0f6cbd] px-3 py-1 font-semibold text-white">
              Accept
            </button>
          )}
        </div>
      )}
      <MessageBody ctx={ctx} text={m.body} disabledLinks={junk} />
    </article>
  );
}

export function ReadingPaneNew({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const ids = selIds(ctx.ui.selection, "msg");
  if (doc.compose && doc.compose.inline !== false) return <ComposeNew ctx={ctx} />;
  if (ids.length > 1)
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-[13px] text-gray-600">
        <OIcon name="mail" size={40} className="mb-2 text-gray-400" />
        {ids.length} items selected
      </div>
    );
  const m = doc.messages.find((x) => x.id === ids[0] && visibleMessages(doc).some((y) => y.id === x.id));
  if (!m)
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-[13px] text-gray-500">
        <OIcon name="mail" size={48} className="mb-2 text-gray-300" />
        Select an item to read
        <span className="mt-1 text-[12px] text-gray-400">Nothing is selected</span>
      </div>
    );
  return <MessageViewNew ctx={ctx} m={m} />;
}

/* ------------------------------------------------------------------ */
/* Compose                                                             */
/* ------------------------------------------------------------------ */

function RecipientRow({
  ctx, label, field, tokens, pending, onTokens, onPending, right,
}: { ctx: NCtx; label: string; field: "to" | "cc" | "bcc"; tokens: string[]; pending: string; onTokens: (t: string[]) => void; onPending: (s: string) => void; right?: React.ReactNode }) {
  const [hi, setHi] = useState(0);
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const sugg = focus ? suggestionsFor(ctx, pending) : [];
  const add = (tok: string) => {
    if (!tokens.some((t) => t.toLowerCase() === tok.toLowerCase())) onTokens([...tokens, tok]);
    onPending("");
    setHi(0);
  };
  const nameOf = (t: string) => (ctx.doc.groups ?? []).find((g) => g.name.toLowerCase() === t.toLowerCase())?.name ?? people(ctx.doc).find((p) => p.email.toLowerCase() === t.toLowerCase())?.name ?? t;
  return (
    <div className="flex items-start gap-2 border-b border-gray-200 py-1.5">
      <span className="mt-[3px] w-10 shrink-0 text-[13px] text-gray-700">{label}</span>
      <div className="relative flex min-h-[26px] min-w-0 flex-1 flex-wrap items-center gap-1" onClick={() => ref.current?.focus()}>
        {tokens.map((t) => (
          <span key={t} className="flex items-center gap-1 rounded-full bg-[#ebf3fc] py-[1px] pl-0.5 pr-2 text-[12.5px] text-gray-900" title={t}>
            <Avatar name={nameOf(t)} size={18} />
            {nameOf(t)}
            <button type="button" aria-label={`Remove ${nameOf(t)}`} onClick={(ev) => { ev.stopPropagation(); onTokens(tokens.filter((x) => x !== t)); }} className="text-gray-500 hover:text-gray-900">
              ×
            </button>
          </span>
        ))}
        <input
          ref={ref}
          aria-label={label}
          data-t={`compose.${field}`}
          value={pending}
          onChange={(ev) => {
            const v = ev.target.value;
            if (/[;,]\s*$/.test(v)) {
              const r = resolveToken(ctx, v);
              if (r) return add(r);
            }
            onPending(v);
            setHi(0);
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setTimeout(() => setFocus(false), 150);
            const r = pending.trim() ? resolveToken(ctx, pending) : null;
            if (r) add(r);
          }}
          onKeyDown={(ev) => {
            ev.stopPropagation();
            if (ev.key === "ArrowDown" && sugg.length) {
              ev.preventDefault();
              setHi((h) => Math.min(sugg.length - 1, h + 1));
            } else if (ev.key === "ArrowUp" && sugg.length) {
              ev.preventDefault();
              setHi((h) => Math.max(0, h - 1));
            } else if ((ev.key === "Enter" || ev.key === "Tab") && pending.trim()) {
              const r = sugg[hi]?.token ?? resolveToken(ctx, pending);
              if (r) {
                ev.preventDefault();
                add(r);
              }
            } else if (ev.key === "Backspace" && !pending && tokens.length) onTokens(tokens.slice(0, -1));
          }}
          className={`min-w-[90px] flex-1 py-0.5 text-[13px] outline-none ${pending && !focus ? "underline decoration-red-600 decoration-wavy" : ""}`}
        />
        {sugg.length > 0 && (
          <div role="listbox" className="absolute left-0 top-full z-40 mt-1 w-80 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {sugg.map((s, i) => (
              <button
                key={s.token}
                type="button"
                role="option"
                aria-selected={i === hi}
                onMouseDown={(ev) => {
                  ev.preventDefault();
                  add(s.token);
                }}
                className={`flex w-full items-center gap-2 px-2.5 py-1 text-left text-[12.5px] ${i === hi ? "bg-[#ebf3fc]" : "hover:bg-gray-50"}`}
              >
                <Avatar name={s.label} size={24} />
                <span className="min-w-0">
                  <span className="block truncate">{s.label}</span>
                  <span className="block truncate text-[11px] text-gray-500">{s.sub}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {right}
    </div>
  );
}

/** "@pa" before the caret: the text being typed as a mention. */
function mentionAt(text: string, caret: number): { start: number; q: string } | null {
  const before = text.slice(0, caret);
  const m = /(^|\s)@([A-Za-z][A-Za-z.'-]*(?: [A-Za-z][A-Za-z.'-]*)?)$/.exec(before) ?? /(^|\s)@$/.exec(before);
  if (!m) return null;
  const q = (m[2] ?? "").trim();
  return { start: before.length - q.length - 1, q };
}

/**
 * Draft with Copilot (Microsoft 365 Copilot license). Microsoft Support ("Draft an email message
 * with Copilot in Outlook"): New mail › the Copilot icon on the toolbar › Draft with Copilot › type a
 * prompt › Generate › review › Keep. The length and tone choices (Generate options) aren't drawn.
 * Here the Copilot icon is on the Message tab (command copilot.draft, which bumps
 * doc.flags.copilotOpen). The draft text comes from the sim (doc.copilotDraft) so it is predictable;
 * the prompt is committed as type "copilot.prompt" so a task can check what the learner asked for.
 */
function CopilotDraft({ ctx, body }: { ctx: NCtx; body: string }) {
  const doc = ctx.doc;
  // "<compose id>#<n>": only the message the learner chose Draft with Copilot in opens the box.
  const openTag = String(doc.flags?.copilotOpen ?? "");
  const mine = Boolean(doc.compose) && openTag.startsWith(`${doc.compose!.id}#`);
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [draft, setDraft] = useState<string | null>(null);
  useEffect(() => {
    if (mine) setOpen(true);
  }, [mine, openTag]);
  const first = doc.account.name.split(" ")[0];
  const generate = () => {
    const p = prompt.trim();
    if (!p) return;
    ctx.commit({ kind: "type", target: "copilot.prompt", value: p });
    setDraft(doc.copilotDraft ?? `Hello,\n\n${p.charAt(0).toUpperCase()}${p.slice(1).replace(/[.]?$/, ".")}\n\nPlease let me know if you have any questions.\n\nThank you,\n${first}`);
  };
  if (!open) return null;
  return (
    <div role="region" aria-label="Draft with Copilot" className="mb-2 rounded-lg border border-[#d9d0f5] bg-gradient-to-r from-[#f5f2ff] to-[#eef6ff] p-2.5">
      <div className="flex items-start gap-2">
        <OIcon name="sparkle" size={16} className="mt-1.5 text-[#5b3fc4]" />
        <textarea
          aria-label="Tell Copilot what you want to write"
          placeholder="Tell Copilot what you want to write"
          data-t="copilot.prompt"
          value={prompt}
          onChange={(ev) => setPrompt(ev.target.value)}
          onKeyDown={(ev) => {
            ev.stopPropagation();
            if (ev.key === "Enter" && !ev.shiftKey) {
              ev.preventDefault();
              generate();
            }
          }}
          className="min-h-[44px] flex-1 resize-none rounded-[4px] border border-gray-300 bg-white px-2 py-1 text-[13px] outline-none focus:border-[#5b3fc4]"
        />
        <button type="button" aria-label="Generate" title="Generate" data-c="copilot.generate" onClick={generate} className="mt-1 rounded-[4px] bg-[#5b3fc4] px-2.5 py-1 text-[12.5px] font-semibold text-white hover:bg-[#4a32a6]">
          Generate
        </button>
        <button type="button" aria-label="Close Copilot" title="Close" onClick={() => { setDraft(null); setOpen(false); setPrompt(""); }} className="mt-1 rounded p-1 text-gray-600 hover:bg-white/60">
          <OIcon name="close" size={12} />
        </button>
      </div>
      {draft !== null && (
        <div className="mt-2 rounded-[4px] border border-gray-200 bg-white p-2">
          <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-gray-800">{draft}</pre>
          <p className="mt-1 text-[11px] text-gray-500">AI-generated content may be incorrect. Review it before you send.</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              data-c="copilot.keep"
              onClick={() => {
                ctx.setCdraft({ body: body.trim() ? `${draft}\n\n${body}` : draft });
                setDraft(null);
                setOpen(false);
                setPrompt("");
              }}
              className="rounded-[4px] bg-[#0f6cbd] px-3 py-1 text-[12.5px] font-semibold text-white hover:bg-[#115ea3]"
            >
              Keep
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ComposeNew({ ctx, popped }: { ctx: NCtx; popped?: boolean }) {
  const doc = ctx.doc;
  const c = doc.compose!;
  const d: ComposeDraft = ctx.cdraft ?? { to: c.to, cc: c.cc, bcc: c.bcc, subject: c.subject, body: c.body, pending: { to: "", cc: "", bcc: "" } };
  const [showCc, setShowCc] = useState(false);
  const [mention, setMention] = useState<{ start: number; q: string } | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const fmt = c.format ?? {};
  useEffect(() => {
    if (c.mode !== "new" && bodyRef.current) {
      bodyRef.current.focus();
      bodyRef.current.setSelectionRange(0, 0);
    }
  }, [c.id, c.mode]);
  const mentionList = mention ? people(doc).filter((p) => p.email !== doc.account.email && (!mention.q || p.name.toLowerCase().split(/\s+/).some((w) => w.startsWith(mention.q.toLowerCase())) || p.name.toLowerCase().startsWith(mention.q.toLowerCase()))).slice(0, 6) : [];
  const pickMention = (p: { name: string; email: string }) => {
    if (!mention) return;
    const caret = bodyRef.current?.selectionStart ?? d.body.length;
    const body = `${d.body.slice(0, mention.start)}@${p.name} ${d.body.slice(caret)}`;
    const to = d.to.some((t) => t.toLowerCase() === p.email.toLowerCase()) ? d.to : [...d.to, p.email];
    ctx.setCdraft({ body, to });
    setMention(null);
    setTimeout(() => bodyRef.current?.focus(), 0);
  };
  const shared = (doc.shared ?? []).filter((s) => s.added);
  const fromEntries: NEntry[] = [
    { label: doc.account.email, cmd: "compose.fromAddress", val: doc.account.email, checked: !c.from, onPick: () => ctx.cmd("compose.fromAddress", doc.account.email) },
    ...shared.map((s) => ({ label: `${s.name} <${s.email}>`, cmd: "compose.fromAddress", val: s.email, checked: c.from?.toLowerCase() === s.email.toLowerCase(), onPick: () => ctx.cmd("compose.fromAddress", s.email) })),
  ];
  const sendMenu: NEntry[] = [{ label: "Schedule send", icon: "clock", dlg: "scheduleSend", onPick: () => ctx.scheduleSend() }];
  const missingAlt = (c.images ?? []).filter((i) => !i.alt);
  return (
    <div className="flex min-h-0 flex-1" aria-label={c.mode === "new" ? "New message" : "Reply"}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1 px-4 pb-1 pt-3">
          <span className="flex">
            <button type="button" aria-label="Send" title="Send (Ctrl+Enter)" data-c="compose.send" onClick={() => ctx.send()} className="flex items-center gap-1.5 rounded-l-[4px] bg-[#0f6cbd] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-[#115ea3]">
              <OIcon name="send" size={15} /> Send
            </button>
            <NMenuButton dd="compose.sendOptions" ariaLabel="Send options" items={sendMenu} className="rounded-r-[4px] border-l border-white/40 bg-[#0f6cbd] px-1.5 text-white hover:bg-[#115ea3]">
              <OIcon name="chevronDown" size={11} />
            </NMenuButton>
          </span>
          <button type="button" aria-label="Discard" title="Discard" data-c="compose.discard" onClick={() => ctx.cmd("compose.discard")} className="ml-1 rounded p-1.5 text-gray-700 hover:bg-gray-100">
            <OIcon name="trash" size={16} />
          </button>
          <span className="flex-1" />
          {c.mode !== "new" && <span className="text-[12px] text-gray-500">{c.mode === "forward" ? "Forwarding" : c.mode === "replyAll" ? "Replying to all" : "Replying"}</span>}
          {!popped && (
            <button type="button" aria-label="Open in new window" title="Open in new window" data-c="compose.popOut" onClick={() => ctx.cmd("compose.popOut")} className="rounded p-1.5 text-gray-700 hover:bg-gray-100">
              <OIcon name="popout" size={15} />
            </button>
          )}
        </div>
        <div className="px-4">
          {(c.showFrom || c.from) && (
            <div className="flex items-center gap-2 border-b border-gray-200 py-1.5 text-[13px]">
              <span className="w-10 text-gray-700">From</span>
              <NMenuButton dd="compose.fromAddress" ariaLabel="From" items={fromEntries} className="flex items-center gap-1 rounded-[4px] border border-gray-300 px-2 py-0.5 hover:bg-gray-50">
                {c.from ?? doc.account.email} <OIcon name="chevronDown" size={10} />
              </NMenuButton>
            </div>
          )}
          <RecipientRow
            ctx={ctx}
            label="To"
            field="to"
            tokens={d.to}
            pending={d.pending.to}
            onTokens={(t) => ctx.setCdraft({ to: t })}
            onPending={(s) => ctx.setCdraft({ pending: { ...d.pending, to: s } })}
            right={
              <span className="mt-[3px] flex shrink-0 gap-1 text-[12.5px] text-gray-700">
                {!showCc && !d.cc.length && <button type="button" data-showcc="1" onClick={() => setShowCc(true)} className="rounded px-1 hover:bg-gray-100">Cc</button>}
                {!c.showBcc && <button type="button" data-c="compose.bcc" onClick={() => ctx.cmd("compose.bcc")} className="rounded px-1 hover:bg-gray-100">Bcc</button>}
              </span>
            }
          />
          {(showCc || d.cc.length > 0) && (
            <RecipientRow ctx={ctx} label="Cc" field="cc" tokens={d.cc} pending={d.pending.cc} onTokens={(t) => ctx.setCdraft({ cc: t })} onPending={(s) => ctx.setCdraft({ pending: { ...d.pending, cc: s } })} />
          )}
          {c.showBcc && <RecipientRow ctx={ctx} label="Bcc" field="bcc" tokens={d.bcc} pending={d.pending.bcc} onTokens={(t) => ctx.setCdraft({ bcc: t })} onPending={(s) => ctx.setCdraft({ pending: { ...d.pending, bcc: s } })} />}
          <div className="border-b border-gray-200 py-1.5">
            <input
              aria-label="Add a subject"
              placeholder="Add a subject"
              data-t="compose.subject"
              value={d.subject}
              onChange={(ev) => ctx.setCdraft({ subject: ev.target.value })}
              onKeyDown={(ev) => ev.stopPropagation()}
              className="w-full py-0.5 text-[14px] outline-none placeholder:text-gray-500"
            />
          </div>
          {c.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 border-b border-gray-200 py-2">
              {c.attachments.map((a) => (
                <div key={a.name} className="flex max-w-[260px] items-center gap-2 rounded-[4px] border border-gray-300 px-2 py-1 text-[12.5px]" title={a.name}>
                  <FileBadge name={a.name} size={24} />
                  <span className="min-w-0">
                    <span className="block truncate">{a.name}</span>
                    <span className="block text-[11px] text-gray-500">{a.link ? "Link · People in Lakeside can edit" : a.size ?? "24 KB"}</span>
                  </span>
                  <button type="button" aria-label={`Remove ${a.name}`} data-c="compose.removeAttachment" data-v={a.name} onClick={() => ctx.cmd("compose.removeAttachment", a.name)} className="rounded p-0.5 text-gray-500 hover:bg-gray-200">
                    <OIcon name="close" size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {c.importance && <div className="mt-1.5 rounded-[4px] bg-[#f5f5f5] px-2 py-1 text-[12px]">This message is marked {c.importance === "High" ? "high" : "low"} importance.</div>}
          {c.encrypt && <div className="mt-1.5 flex items-center gap-1.5 rounded-[4px] bg-[#ebf3fc] px-2 py-1 text-[12px]"><OIcon name="lock" size={13} /> {c.encrypt === "Do Not Forward" ? "Do Not Forward: Recipients can't forward, print, or copy content." : "Encrypt: This message is encrypted. Recipients can't remove encryption."}</div>}
          {c.sensitivity && <div className="mt-1.5 flex items-center gap-1.5 rounded-[4px] bg-[#f5f5f5] px-2 py-1 text-[12px]"><OIcon name="tag" size={13} /> Sensitivity: {c.sensitivity}</div>}
          {c.readReceipt && <div className="mt-1.5 rounded-[4px] bg-[#f5f5f5] px-2 py-1 text-[12px]">A read receipt was requested.</div>}
        </div>
        <div className="relative flex min-h-0 flex-1 flex-col px-4 pb-3 pt-2">
          {doc.copilot && <CopilotDraft ctx={ctx} body={d.body} />}
          <textarea
            ref={bodyRef}
            aria-label="Message body"
            data-t="compose.body"
            value={d.body}
            onChange={(ev) => {
              ctx.setCdraft({ body: ev.target.value });
              setMention(mentionAt(ev.target.value, ev.target.selectionStart ?? ev.target.value.length));
            }}
            onKeyDown={(ev) => {
              ev.stopPropagation();
              if (mention && mentionList.length && (ev.key === "Enter" || ev.key === "Tab")) {
                ev.preventDefault();
                pickMention(mentionList[0]);
                return;
              }
              if (ev.key === "Escape") setMention(null);
              if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
                ev.preventDefault();
                ctx.send();
              }
            }}
            className="min-h-[110px] w-full flex-1 resize-none border-0 text-[14px] leading-relaxed outline-none"
            style={{
              fontFamily: `${fmt.font ?? "Aptos"}, Calibri, 'Segoe UI', sans-serif`,
              fontWeight: fmt.bold ? 700 : undefined,
              fontStyle: fmt.italic ? "italic" : undefined,
              textDecoration: fmt.underline ? "underline" : undefined,
              color: fmt.color && fmt.color !== "Automatic" ? fmt.color : undefined,
            }}
          />
          {mention && mentionList.length > 0 && (
            <div role="listbox" aria-label="Suggested people" className="absolute left-6 top-10 z-40 w-72 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              {mentionList.map((p) => (
                <button key={p.email} type="button" role="option" data-mention={p.email} onMouseDown={(ev) => { ev.preventDefault(); pickMention(p); }} className="flex w-full items-center gap-2 px-2.5 py-1 text-left text-[12.5px] hover:bg-[#ebf3fc]">
                  <Avatar name={p.name} size={22} />
                  <span className="min-w-0">
                    <span className="block truncate">{p.name}</span>
                    <span className="block truncate text-[11px] text-gray-500">{p.email}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
          {(c.images ?? []).length > 0 && (
            <div className="flex flex-wrap gap-2 pb-2">
              {(c.images ?? []).map((im) => (
                <div key={im.name} className="flex w-48 flex-col items-center gap-1 rounded border border-gray-300 p-2 text-[12px]">
                  <OIcon name="image" size={40} className="text-gray-400" />
                  <span className="truncate">{im.name}</span>
                </div>
              ))}
            </div>
          )}
          {c.quoted && <pre className="mt-1 max-h-40 overflow-auto whitespace-pre-wrap border-t border-gray-300 pt-2 font-sans text-[12.5px] text-gray-600">{c.quoted}</pre>}
        </div>
      </div>
      {doc.accessibilityPane && (
        <aside aria-label="Accessibility Checker" className="flex w-60 shrink-0 flex-col border-l border-gray-200 bg-[#fafafa] p-3 text-[12.5px]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[14px] font-semibold">Accessibility Checker</span>
            <button type="button" aria-label="Close Accessibility Checker" data-c="pane.close" onClick={() => ctx.cmd("pane.close")} className="rounded p-0.5 hover:bg-gray-200">
              <OIcon name="close" size={12} />
            </button>
          </div>
          {missingAlt.length ? (
            <>
              <p className="mb-1 font-semibold text-[#a4262c]">Errors ({missingAlt.length})</p>
              {missingAlt.map((im) => (
                <div key={im.name} className="mb-2 rounded border border-gray-200 bg-white p-2">
                  <p className="font-semibold">Missing alternative text</p>
                  <p className="text-gray-600">{im.name}</p>
                  <button type="button" data-dlg="altText" onClick={() => ctx.openDialog("altText")} className="mt-1 text-[#0f6cbd] underline">
                    Fix this
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p className="flex items-center gap-1.5 text-green-800">
              <OIcon name="check" size={14} /> No accessibility issues found. People with disabilities should not have difficulty reading this message.
            </p>
          )}
          <button type="button" data-c="review.accessibility" onClick={() => ctx.cmd("review.accessibility")} className="mt-2 w-fit rounded-[4px] border border-gray-300 bg-white px-2.5 py-1 hover:bg-gray-50">
            Check again
          </button>
        </aside>
      )}
    </div>
  );
}

/** Text of a signature, for inserting it into what the learner is typing. */
export function signatureInsert(doc: OutlookDoc, body: string, name: string): string {
  const t = sigText(doc, name);
  if (!t || body.includes(t)) return body;
  return `${body.replace(/\s+$/, "")}\n\n${t}`;
}
