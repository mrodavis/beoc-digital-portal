"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { Ctx } from "./ctx";
import type { OlFolder, OlMessage, OlPerson } from "./types";
import { Avatar, CategoryChips, FileBadge, MenuButton, OIcon, type MenuEntry } from "./parts";
import { folderMenu, messageMenu, respondSub } from "./menus";
import {
  CATEGORY_COLORS, catName, composeVisible, conflictsWith, conversationKey, currentFolder, folderById, folderTree, moduleOf,
  occurrences, people, selIds, selKeys, sortedContacts, todayOf, unreadIn, visibleMessages,
} from "./model";
import { addDays, dateGroup, dateOf, fmtDate, fmtListDate, fmtLong, fmtTime, toMs } from "./dates";

/* ------------------------------------------------------------------ */
/* Navigation bar (Mail · Calendar · People · Tasks)                  */
/* ------------------------------------------------------------------ */

export function NavBar({ ctx, compact }: { ctx: Ctx; compact?: boolean }) {
  const mod = moduleOf(ctx.doc);
  const items: [string, string, string][] = [
    ["Mail", "mail", "mail"],
    ["Calendar", "calendar", "calendar"],
    ["People", "people", "people"],
    ["Tasks", "tasks", "tasks"],
  ];
  return (
    <nav aria-label="Navigation bar" className={`flex shrink-0 border-t border-gray-200 bg-white ${compact ? "flex-col items-center gap-1 py-1" : "items-center gap-0.5 px-1 py-1"}`}>
      {items.map(([label, key, icon]) => (
        <button
          key={key}
          type="button"
          aria-label={label}
          aria-current={mod === key ? "page" : undefined}
          title={`${label} (Ctrl+${items.findIndex((x) => x[1] === key) + 1})`}
          onClick={() => ctx.cmd("nav.module", label)}
          className={`flex items-center justify-center rounded px-1.5 py-1 text-[12px] hover:bg-[#e5f1fb] ${mod === key ? "font-semibold" : "text-gray-700"}`}
          style={mod === key ? { color: ctx.accent, boxShadow: `inset 0 -2px 0 ${ctx.accent}` } : undefined}
        >
          {compact ? <OIcon name={icon} size={18} /> : label}
        </button>
      ))}
      {!compact && (
        <MenuButton ariaLabel="More apps" className="ml-auto rounded px-1.5 py-1 text-gray-600 hover:bg-[#e5f1fb]" items={[{ label: "Notes", disabled: true }, { label: "Folders", onPick: () => ctx.cmd("nav.module", "Mail") }, { label: "Shortcuts", disabled: true }, { separator: true }, { label: "Navigation Options...", disabled: true }]}>
          <OIcon name="more" />
        </MenuButton>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Folder pane                                                         */
/* ------------------------------------------------------------------ */

function InlineInput({ initial, onDone, onCancel, label }: { initial: string; onDone: (v: string) => void; onCancel: () => void; label: string }) {
  const [v, setV] = useState(initial);
  const ref = useRef<HTMLInputElement>(null);
  const done = useRef(false);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);
  const finish = (commit: boolean) => {
    if (done.current) return;
    done.current = true;
    if (commit && v.trim() && v.trim() !== initial) onDone(v.trim());
    else onCancel();
  };
  return (
    <input
      ref={ref}
      aria-label={label}
      value={v}
      onChange={(e) => setV(e.target.value)}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") finish(true);
        if (e.key === "Escape") finish(false);
      }}
      onBlur={() => finish(true)}
      className="w-full border border-[#0f6cbd] px-1 py-0 text-[12.5px] outline-none"
    />
  );
}

function FolderRow({ ctx, f, depth, fav }: { ctx: Ctx; f: OlFolder; depth: number; fav?: boolean }) {
  const doc = ctx.doc;
  const active = moduleOf(doc) === "mail" && !doc.search && currentFolder(doc) === f.id;
  const [over, setOver] = useState(false);
  const n = unreadIn(doc, f.id);
  const kids = (doc.folders ?? []).some((x) => x.parent === f.id);
  const renaming = doc.renaming === f.id && !fav;
  const selectedForMenu = selKeys(ctx.ui.selection)[0] === `folder:${f.id}`;
  return (
    <>
      <div
        role="treeitem"
        aria-selected={active}
        aria-label={`${f.name}${n ? `, ${n} unread` : ""}`}
        tabIndex={-1}
        onClick={() => ctx.cmd("mail.folder", f.name)}
        onContextMenu={(e) => {
          e.preventDefault();
          ctx.select(`folder:${f.id}`);
          ctx.menu({ x: e.clientX, y: e.clientY }, folderMenu(ctx, f));
        }}
        onDragOver={(e) => {
          if (e.dataTransfer.types.includes("text/x-olmsg") && f.id !== "outbox" && f.id !== "drafts") {
            e.preventDefault();
            setOver(true);
          }
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          const ids = e.dataTransfer.getData("text/x-olmsg").split(",").filter(Boolean);
          if (!ids.length) return;
          ctx.select(ids.map((i) => `msg:${i}`).join(","));
          ctx.cmd("mail.move", f.name);
        }}
        className={`flex cursor-default items-center gap-1.5 py-[3px] pr-2 text-[12.5px] ${active ? "bg-[#cfe4fa] font-semibold" : over ? "bg-[#e5f1fb] outline outline-1 outline-[#0f6cbd]" : selectedForMenu ? "bg-gray-100" : "hover:bg-[#f0f6fc]"}`}
        style={{ paddingLeft: 10 + depth * 14 }}
      >
        <span className="w-3 text-gray-500">{kids && !fav ? <OIcon name="chevronDown" size={10} /> : null}</span>
        {renaming ? (
          <InlineInput label="Folder name" initial={f.name} onDone={(v) => ctx.commit({ kind: "type", target: `folder:${f.id}`, value: v })} onCancel={() => ctx.cmd("folder.cancelEdit")} />
        ) : (
          <>
            <span className="min-w-0 flex-1 truncate">{f.name}</span>
            {n > 0 && <span className={f.id === "drafts" ? "text-gray-600" : "font-semibold"} style={f.id === "drafts" ? undefined : { color: ctx.accent }}>{f.id === "drafts" ? `[${n}]` : n}</span>}
          </>
        )}
      </div>
      {doc.newFolderIn === f.id && !fav && (
        <div className="py-[2px] pr-2" style={{ paddingLeft: 24 + (depth + 1) * 14 }}>
          <InlineInput
            label="New folder name"
            initial=""
            onDone={(v) => ctx.commit({ kind: "dialog", id: "newFolder", values: { name: v, parent: f.name, contains: "Mail and Post Items" } })}
            onCancel={() => ctx.cmd("folder.cancelEdit")}
          />
        </div>
      )}
    </>
  );
}

export function FolderPane({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const [openFav, setOpenFav] = useState(true);
  const [openAcct, setOpenAcct] = useState(true);
  const favs = (doc.favorites ?? ["inbox", "sent", "deleted"]).map((id) => folderById(doc, id)).filter(Boolean) as OlFolder[];
  const tree = folderTree(doc);
  return (
    <div className="min-h-0 flex-1 overflow-auto py-1" role="tree" aria-label="Folder Pane">
      <button type="button" onClick={() => setOpenFav((v) => !v)} className="flex w-full items-center gap-1 px-2 py-1 text-[12px] font-semibold text-gray-700">
        <OIcon name={openFav ? "chevronDown" : "chevronRight"} size={10} /> Favorites
      </button>
      {openFav && favs.map((f) => <FolderRow key={`fav-${f.id}`} ctx={ctx} f={f} depth={0} fav />)}
      <button type="button" onClick={() => setOpenAcct((v) => !v)} className="mt-2 flex w-full items-center gap-1 px-2 py-1 text-left text-[12px] font-semibold text-gray-700">
        <OIcon name={openAcct ? "chevronDown" : "chevronRight"} size={10} />
        <span className="truncate">{doc.account.email}</span>
      </button>
      {openAcct && tree.map((x) => <FolderRow key={x.folder.id} ctx={ctx} f={x.folder} depth={x.depth} />)}
      {openAcct && (
        <div className="px-2 py-[3px] pl-[24px] text-[12.5px] text-gray-500">
          <span>Search Folders</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Message list                                                        */
/* ------------------------------------------------------------------ */

function preview(body: string) {
  return body.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim().slice(0, 140);
}

function displayFrom(m: OlMessage): string {
  if (m.folder === "sent" || m.folder === "drafts" || m.folder === "outbox") return (m.to ?? []).map((p) => p.name).join("; ") || "(No recipients)";
  return m.from.name;
}

function MessageRow({
  ctx, m, selected, indent, caret, onCaret, count,
}: { ctx: Ctx; m: OlMessage; selected: boolean; indent?: boolean; caret?: "open" | "closed"; onCaret?: () => void; count?: number }) {
  const doc = ctx.doc;
  const unread = !m.read && m.folder !== "sent" && m.folder !== "drafts";
  const ids = selIds(ctx.ui.selection, "msg");
  const flagged = m.flag && !m.flag.complete;
  const click = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      const set = new Set(ids);
      if (set.has(m.id)) set.delete(m.id);
      else set.add(m.id);
      ctx.select(Array.from(set).map((i) => `msg:${i}`).join(","));
      return;
    }
    if (e.shiftKey && ids.length) {
      const list = visibleMessages(doc).map((x) => x.id);
      const a = list.indexOf(ids[0]), b = list.indexOf(m.id);
      if (a >= 0 && b >= 0) {
        ctx.select(list.slice(Math.min(a, b), Math.max(a, b) + 1).map((i) => `msg:${i}`).join(","));
        return;
      }
    }
    ctx.select(`msg:${m.id}`);
  };
  const quick = (e: React.MouseEvent, run: () => void) => {
    e.stopPropagation();
    ctx.select(`msg:${m.id}`);
    run();
  };
  return (
    <div
      role="option"
      aria-selected={selected}
      aria-label={`${unread ? "Unread. " : ""}${displayFrom(m)}. ${m.subject}`}
      draggable
      onDragStart={(e) => {
        const drag = ids.includes(m.id) ? ids : [m.id];
        if (!ids.includes(m.id)) ctx.select(`msg:${m.id}`);
        e.dataTransfer.setData("text/x-olmsg", drag.join(","));
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={click}
      onDoubleClick={() => ctx.cmd("item.open", `msg:${m.id}`)}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!ids.includes(m.id)) ctx.select(`msg:${m.id}`);
        ctx.menu({ x: e.clientX, y: e.clientY }, messageMenu(ctx, m));
      }}
      className={`group relative flex cursor-default gap-2 border-b border-gray-100 py-1.5 pr-2 text-[12px] ${selected ? "bg-[#cfe4fa]" : "hover:bg-[#f3f2f1]"} ${m.ignored ? "opacity-60" : ""}`}
      style={{ paddingLeft: indent ? 26 : 10 }}
    >
      {unread && <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: ctx.accent }} />}
      {caret && (
        <button type="button" aria-label={caret === "open" ? "Collapse conversation" : "Expand conversation"} onClick={(e) => { e.stopPropagation(); onCaret?.(); }} className="absolute left-0.5 top-1.5 rounded text-gray-500 hover:bg-gray-200">
          <OIcon name={caret === "open" ? "chevronDown" : "chevronRight"} size={10} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          {m.folder === "drafts" && <span className="text-[#c50f1f]">[Draft]</span>}
          <span className={`min-w-0 flex-1 truncate ${unread ? "font-semibold" : ""} text-[13px]`}>{displayFrom(m)}</span>
          {count && count > 1 ? <span className="text-[11px] text-gray-500">({count})</span> : null}
          <span className="flex items-center gap-1 text-gray-500 group-hover:hidden">
            {m.replied && <OIcon name={m.replied === "forwarded" ? "forward" : "reply"} size={12} />}
            {m.attachments?.length ? <OIcon name="clip" size={12} /> : null}
            {m.importance === "High" && <span className="font-bold text-[#c50f1f]" title="High importance">!</span>}
            {m.importance === "Low" && <OIcon name="down" size={12} />}
            {m.pinned && <OIcon name="pin" size={12} />}
          </span>
          <span className="hidden items-center gap-0.5 group-hover:flex">
            <button type="button" title="Delete" aria-label="Delete" onClick={(e) => quick(e, () => ctx.cmd("item.delete"))} className="rounded p-0.5 hover:bg-gray-300">
              <OIcon name="trash" size={13} />
            </button>
            <button type="button" title={m.read ? "Mark as unread" : "Mark as read"} aria-label={m.read ? "Mark as unread" : "Mark as read"} onClick={(e) => quick(e, () => ctx.cmd(m.read ? "mail.markUnread" : "mail.markRead"))} className="rounded p-0.5 hover:bg-gray-300">
              <OIcon name={m.read ? "mail" : "mailOpen"} size={13} />
            </button>
            <button type="button" title="Pin" aria-label="Pin" onClick={(e) => quick(e, () => ctx.cmd("mail.pin"))} className="rounded p-0.5 hover:bg-gray-300">
              <OIcon name="pin" size={13} />
            </button>
          </span>
        </div>
        <div className="flex items-center gap-1">
          {m.invite && <OIcon name="calendar" size={12} className="text-gray-500" />}
          <span className={`min-w-0 flex-1 truncate ${unread ? "font-semibold" : ""}`} style={unread ? { color: ctx.accent } : undefined}>
            {m.subject || "(No subject)"}
          </span>
          <CategoryChips doc={doc} cats={m.categories} compact />
          <span className="whitespace-nowrap text-[11px] text-gray-500" style={unread ? { color: ctx.accent } : undefined}>
            {fmtListDate(m.date, todayOf(doc))}
          </span>
          <button
            type="button"
            title={flagged ? "Mark complete" : m.flag?.complete ? "Completed" : "Flag this message"}
            aria-label={flagged ? "Mark complete" : "Flag this message"}
            onClick={(e) => quick(e, () => ctx.cmd("item.followUp", flagged ? "Mark Complete" : m.flag?.complete ? "Clear Flag" : "Today"))}
            className={`rounded p-0.5 hover:bg-gray-300 ${m.flag ? "" : "opacity-0 group-hover:opacity-100"}`}
          >
            {m.flag?.complete ? <OIcon name="check" size={13} className="text-gray-500" /> : <OIcon name={flagged ? "flagFill" : "flag"} size={13} color={flagged ? "#c50f1f" : undefined} />}
          </button>
        </div>
        <div className="truncate text-[11.5px] text-gray-500">
          {m.sendAt && m.folder === "outbox" ? `Will be sent ${fmtDate(m.sendAt)} ${fmtTime(m.sendAt)} · ` : ""}
          {m.invite ? `${fmtLong(m.invite.start).replace(/, \d{4}$/, "")} ${fmtTime(m.invite.start)}${m.invite.location ? ` · ${m.invite.location}` : ""}` : preview(m.body) || "(This message has no content)"}
        </div>
      </div>
    </div>
  );
}

function groupLabel(ctx: Ctx, m: OlMessage): string {
  const a = ctx.doc.arrange ?? "Date";
  if (a === "Date") return dateGroup(m.date, todayOf(ctx.doc));
  if (a === "From") return m.from.name;
  if (a === "Categories") return m.categories?.length ? m.categories.map((c) => catName(ctx.doc, c)).join(", ") : "(none)";
  if (a === "Importance") return m.importance ? `Importance: ${m.importance}` : "Importance: Normal";
  if (a.startsWith("Flag")) return m.flag && !m.flag.complete ? (m.flag.due ? `Due: ${fmtDate(m.flag.due)}` : "No Date") : "Not flagged";
  if (a === "Attachments") return m.attachments?.length ? "With Attachments" : "Without Attachments";
  return "";
}

export function MessageList({ ctx, wide }: { ctx: Ctx; wide?: boolean }) {
  const doc = ctx.doc;
  const list = useMemo(() => visibleMessages(doc), [doc]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [q, setQ] = useState(doc.search ?? "");
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selected = new Set(selIds(ctx.ui.selection, "msg"));
  useEffect(() => setQ(doc.search ?? ""), [doc.search]);
  useEffect(() => {
    if (doc.searchFocus) searchRef.current?.focus();
  }, [doc.searchFocus]);

  const folder = folderById(doc, currentFolder(doc));
  const inboxFocused = doc.focused && currentFolder(doc) === "inbox" && !doc.search;

  // Conversation grouping.
  type Row = { m: OlMessage; indent?: boolean; caret?: "open" | "closed"; count?: number; key: string };
  const rows: Row[] = [];
  if (doc.conversations) {
    const byKey = new Map<string, OlMessage[]>();
    for (const m of list) byKey.set(conversationKey(m), [...(byKey.get(conversationKey(m)) ?? []), m]);
    const seen = new Set<string>();
    for (const m of list) {
      const k = conversationKey(m);
      if (seen.has(k)) continue;
      seen.add(k);
      const all = byKey.get(k)!;
      const open = expanded.has(k);
      rows.push({ m, caret: all.length > 1 ? (open ? "open" : "closed") : undefined, count: all.length, key: m.id });
      if (open) for (const c of all.slice(1)) rows.push({ m: c, indent: true, key: c.id });
    }
  } else for (const m of list) rows.push({ m, key: m.id });

  const sortItems: MenuEntry[] = [
    ...["Date", "From", "To", "Categories", "Flag: Due Date", "Size", "Subject", "Importance", "Attachments"].map((a) => ({ label: a, checked: (doc.arrange ?? "Date") === a, onPick: () => ctx.cmd("mail.arrange", a) })),
    { separator: true },
    { label: doc.arrange && doc.arrange !== "Date" ? "A on top" : "Newest on top", checked: !doc.sortAsc, onPick: () => ctx.cmd("mail.sortOrder", "Newest on top") },
    { label: doc.arrange && doc.arrange !== "Date" ? "Z on top" : "Oldest on top", checked: Boolean(doc.sortAsc), onPick: () => ctx.cmd("mail.sortOrder", "Oldest on top") },
    { separator: true },
    { label: "Show as Conversations", checked: Boolean(doc.conversations), onPick: () => ctx.cmd("view.conversations") },
  ];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") return;
    const ids = list.map((m) => m.id);
    const cur = ids.indexOf(selIds(ctx.ui.selection, "msg")[0] ?? "");
    if (e.key === "Enter" && cur >= 0) {
      e.preventDefault();
      ctx.cmd("item.open", `msg:${ids[cur]}`);
      return;
    }
    const n = ids[Math.max(0, Math.min(ids.length - 1, cur + (e.key === "ArrowDown" ? 1 : -1)))];
    if (n) {
      e.preventDefault();
      ctx.select(`msg:${n}`);
      listRef.current?.querySelector(`[data-mid="${n}"]`)?.scrollIntoView({ block: "nearest" });
    }
  };

  let lastGroup = "";
  return (
    <section aria-label="Message list" className={`flex min-h-0 min-w-0 flex-col bg-white ${wide ? "flex-1" : ""}`}>
      <div className="flex items-center gap-1 border-b border-gray-200 px-2 py-1.5">
        <div className="flex min-w-0 flex-1 items-center gap-1 rounded border border-gray-300 bg-white px-1.5 focus-within:border-[#0f6cbd]">
          <OIcon name="search" size={13} className="text-gray-500" />
          <input
            ref={searchRef}
            aria-label="Search Current Mailbox"
            placeholder={`Search ${doc.searchScope === "Current Folder" ? folder?.name ?? "Folder" : "Current Mailbox"} (Ctrl+E)`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") ctx.cmd("mail.search", q);
              if (e.key === "Escape") ctx.cmd("search.close");
            }}
            className="min-w-0 flex-1 py-1 text-[12px] outline-none"
          />
          {doc.search && (
            <button type="button" aria-label="Close search" title="Close Search" onClick={() => ctx.cmd("search.close")} className="text-gray-500 hover:text-gray-800">
              <OIcon name="close" size={12} />
            </button>
          )}
        </div>
        <MenuButton
          ariaLabel="Search scope"
          className="whitespace-nowrap rounded px-1 py-1 text-[11px] text-gray-600 hover:bg-gray-100"
          items={["Current Folder", "Current Mailbox", "All Mailboxes"].map((s) => ({ label: s, checked: (doc.searchScope ?? "Current Mailbox") === s, onPick: () => ctx.cmd("search.scope", s) }))}
        >
          {doc.searchScope ?? "Current Mailbox"} ▾
        </MenuButton>
      </div>
      <div className="flex items-center gap-3 px-3 pt-1.5 text-[12.5px]">
        {doc.search ? (
          <span className="font-semibold">Search results</span>
        ) : inboxFocused ? (
          (["Focused", "Other"] as const).map((t) => (
            <button key={t} type="button" onClick={() => ctx.cmd("mail.focusTab", t)} className={`pb-1 ${(doc.focusTab ?? "Focused") === t ? "font-semibold" : "text-gray-600 hover:text-gray-900"}`} style={(doc.focusTab ?? "Focused") === t ? { boxShadow: `inset 0 -2px 0 ${ctx.accent}` } : undefined}>
              {t}
            </button>
          ))
        ) : (
          (["All", "Unread"] as const).map((t) => (
            <button key={t} type="button" onClick={() => ctx.cmd("mail.filter", t)} className={`pb-1 ${(t === "All" ? !doc.filter : doc.filter === "Unread") ? "font-semibold" : "text-gray-600 hover:text-gray-900"}`} style={(t === "All" ? !doc.filter : doc.filter === "Unread") ? { boxShadow: `inset 0 -2px 0 ${ctx.accent}` } : undefined}>
              {t}
            </button>
          ))
        )}
        <span className="flex-1" />
        {doc.filter && doc.filter !== "Unread" && (
          <button type="button" onClick={() => ctx.cmd("mail.filter", "All")} className="rounded bg-[#e5f1fb] px-1.5 text-[11px]" title="Clear filter">
            {doc.filter} ✕
          </button>
        )}
        <MenuButton ariaLabel="Arrange by" className="pb-1 text-[11.5px] text-gray-600 hover:text-gray-900" items={sortItems}>
          By {doc.arrange ?? "Date"} {doc.sortAsc ? "↑" : "↓"}
        </MenuButton>
      </div>
      <div ref={listRef} role="listbox" aria-label={folder?.name ?? "Messages"} aria-multiselectable="true" tabIndex={0} onKeyDown={onKey} className="min-h-0 flex-1 overflow-auto outline-none">
        {rows.length === 0 && <p className="px-4 py-8 text-center text-[12px] text-gray-500">{doc.search ? "We couldn't find anything to show." : "We didn't find anything to show here."}</p>}
        {rows.map((r) => {
          const label = r.indent ? "" : groupLabel(ctx, r.m);
          const header = label && label !== lastGroup && !r.m.pinned ? label : "";
          if (header) lastGroup = label;
          return (
            <Fragment key={r.key}>
              {header && <div className="sticky top-0 z-[1] bg-white px-2.5 pb-0.5 pt-1.5 text-[11.5px] font-semibold text-gray-600">{header}</div>}
              <div data-mid={r.m.id}>
                <MessageRow
                  ctx={ctx}
                  m={r.m}
                  selected={selected.has(r.m.id)}
                  indent={r.indent}
                  caret={r.caret}
                  count={r.count}
                  onCaret={() =>
                    setExpanded((s) => {
                      const n = new Set(s);
                      const k = conversationKey(r.m);
                      if (n.has(k)) n.delete(k);
                      else n.add(k);
                      return n;
                    })
                  }
                />
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reading pane                                                        */
/* ------------------------------------------------------------------ */

function linkify(text: string, onLink: (url: string) => void, onHover: (url: string | null, el?: HTMLElement) => void, disabled?: boolean) {
  const out: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s)]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const label = m[1] ?? m[3];
    const url = m[2] ?? m[3];
    out.push(
      <a
        key={i++}
        href={url}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) onLink(url);
        }}
        onMouseEnter={(e) => onHover(url, e.currentTarget)}
        onMouseLeave={() => onHover(null)}
        className={disabled ? "cursor-not-allowed text-gray-500 underline" : "text-[#0563c1] underline"}
      >
        {label}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function MessageBody({ ctx, text, disabledLinks }: { ctx: Ctx; text: string; disabledLinks?: boolean }) {
  const [tip, setTip] = useState<{ url: string; x: number; y: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const onHover = (url: string | null, el?: HTMLElement) => {
    if (!url || !el || !boxRef.current) return setTip(null);
    const r = el.getBoundingClientRect();
    const b = boxRef.current.getBoundingClientRect();
    setTip({ url, x: r.left - b.left, y: r.bottom - b.top + 4 });
  };
  const paras = text.split(/\n\s*\n/);
  return (
    <div ref={boxRef} className="relative text-[13px] leading-relaxed text-gray-900" style={{ fontFamily: "Aptos, Calibri, 'Segoe UI', sans-serif" }}>
      {paras.map((p, i) => (
        <p key={i} className="mb-3 whitespace-pre-wrap">
          {linkify(p, (url) => ctx.commit({ kind: "click", target: `link:${url}` }), onHover, disabledLinks)}
        </p>
      ))}
      {tip && (
        <div role="tooltip" className="pointer-events-none absolute z-20 max-w-[90%] border border-gray-400 bg-[#fffff0] px-2 py-1 text-[11.5px] shadow" style={{ left: Math.max(0, tip.x), top: tip.y }}>
          <div className="break-all font-semibold">{tip.url}</div>
          <div className="text-gray-600">{disabledLinks ? "Links are disabled in the Junk Email folder." : "Click or tap to follow link."}</div>
        </div>
      )}
    </div>
  );
}

function SenderName({ p, external }: { p: OlPerson; external?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <span className="relative inline-flex items-center gap-1" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <span className="cursor-default text-[14px] font-semibold hover:underline" tabIndex={0} onFocus={() => setHover(true)} onBlur={() => setHover(false)} aria-label={`${p.name}, ${p.email}`}>
        {p.name}
      </span>
      {external && <span className="rounded-sm border border-gray-400 px-1 text-[10px] uppercase tracking-wide text-gray-600">External</span>}
      {hover && (
        <span role="tooltip" className="absolute left-0 top-6 z-30 flex w-72 gap-3 rounded border border-gray-300 bg-white p-3 text-[12px] shadow-xl">
          <Avatar name={p.name} size={40} />
          <span className="min-w-0">
            <span className="block text-[14px] font-semibold">{p.name}</span>
            <span className="block break-all text-gray-700">{p.email}</span>
            <span className="mt-1 block text-[11px] text-gray-500">{external ? "Outside your organization" : "Contact card"}</span>
          </span>
        </span>
      )}
    </span>
  );
}

function InfoBar({ icon, children, tone = "gray" }: { icon: string; children: React.ReactNode; tone?: "gray" | "yellow" | "red" | "blue" }) {
  const cls = tone === "yellow" ? "bg-[#fff4ce] border-[#f7e28c]" : tone === "red" ? "bg-[#fde7e9] border-[#f1bbbc]" : tone === "blue" ? "bg-[#eff6fc] border-[#c7e0f4]" : "bg-[#f3f2f1] border-gray-200";
  return (
    <div className={`mb-1 flex items-center gap-2 border px-2 py-1 text-[12px] ${cls}`}>
      <OIcon name={icon} size={14} className="text-gray-600" />
      <span className="flex-1">{children}</span>
    </div>
  );
}

export function AttachmentTile({ name, size, link, onRemove, onOpen }: { name: string; size?: string; link?: boolean; onRemove?: () => void; onOpen?: () => void }) {
  return (
    <div className="flex max-w-[220px] items-center gap-2 rounded border border-gray-300 bg-white px-2 py-1 text-[12px]" title={name}>
      <FileBadge name={name} size={24} />
      <button type="button" onDoubleClick={onOpen} className="min-w-0 text-left">
        <span className="block truncate">{name}</span>
        <span className="block text-[10.5px] text-gray-500">{link ? "OneDrive · Shared link" : size ?? "24 KB"}</span>
      </button>
      {onRemove && (
        <button type="button" aria-label={`Remove ${name}`} onClick={onRemove} className="ml-1 rounded p-0.5 text-gray-500 hover:bg-gray-200">
          <OIcon name="close" size={11} />
        </button>
      )}
    </div>
  );
}

function DayStrip({ ctx, start, end, exceptId }: { ctx: Ctx; start: string; end: string; exceptId?: string }) {
  const date = dateOf(start);
  const from = 8 * 60, to = 18 * 60;
  const pct = (iso: string) => {
    const t = +iso.slice(11, 13) * 60 + +iso.slice(14, 16);
    return Math.max(0, Math.min(100, ((t - from) / (to - from)) * 100));
  };
  const mine = occurrences(ctx.doc, date, date).filter((o) => !o.evt.allDay && !o.evt.calendar && o.evt.id !== exceptId);
  return (
    <div className="mt-2">
      <div className="relative h-14 rounded border border-gray-200 bg-white">
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className="absolute top-0 h-full border-l border-gray-100 text-[9px] text-gray-400" style={{ left: `${(i / 10) * 100}%` }}>
            <span className="pl-0.5">{((8 + i - 1) % 12) + 1}</span>
          </span>
        ))}
        {mine.map((o) => (
          <span key={o.key} className="absolute top-3 h-5 truncate rounded-sm border border-gray-400 bg-gray-200 px-1 text-[10px]" style={{ left: `${pct(o.start)}%`, width: `${Math.max(2, pct(o.end) - pct(o.start))}%` }} title={`${o.evt.title} ${fmtTime(o.start)}-${fmtTime(o.end)}`}>
            {o.evt.title}
          </span>
        ))}
        <span className="absolute bottom-1 h-5 truncate rounded-sm border px-1 text-[10px] text-white" style={{ left: `${pct(start)}%`, width: `${Math.max(2, pct(end) - pct(start))}%`, background: ctx.accent, borderColor: ctx.accent }}>
          This meeting
        </span>
      </div>
    </div>
  );
}

function InviteCard({ ctx, m }: { ctx: Ctx; m: OlMessage }) {
  const inv = m.invite!;
  const conflicts = conflictsWith(ctx.doc, inv.start, inv.end, inv.eventId);
  const btn = "flex items-center gap-1 rounded border border-gray-300 bg-white px-2 py-1 text-[12px] hover:bg-[#f3f2f1]";
  return (
    <div className="mb-3 rounded border border-[#c7e0f4] bg-[#f5f9fd] p-3 text-[12.5px]">
      {inv.response ? (
        <p className="mb-2 font-semibold">{inv.response === "Accepted" ? "You accepted this meeting." : inv.response === "Tentative" ? "You tentatively accepted this meeting." : "You declined this meeting."}</p>
      ) : inv.kind === "cancel" ? (
        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold text-[#c50f1f]">This meeting has been canceled.</span>
          <button type="button" className={btn} onClick={() => ctx.cmd("invite.removeFromCalendar")}>Remove from Calendar</button>
        </div>
      ) : (
        <div className="mb-2 flex flex-wrap gap-1.5">
          <MenuButton ariaLabel="Accept" className={btn} items={respondSub(ctx, "Accept")}>
            <OIcon name="check" size={13} className="text-green-700" /> Accept ▾
          </MenuButton>
          <MenuButton ariaLabel="Tentative" className={btn} items={respondSub(ctx, "Tentative")}>
            ? Tentative ▾
          </MenuButton>
          <MenuButton ariaLabel="Decline" className={btn} items={respondSub(ctx, "Decline")}>
            <OIcon name="close" size={13} className="text-red-700" /> Decline ▾
          </MenuButton>
          <MenuButton
            ariaLabel="Propose New Time"
            className={btn}
            items={[
              { label: "Tentative and Propose New Time...", onPick: () => ctx.openDialog("proposeTime") },
              { label: "Decline and Propose New Time...", onPick: () => ctx.openDialog("proposeTimeDecline") },
            ]}
          >
            <OIcon name="clock" size={13} /> Propose New Time ▾
          </MenuButton>
          <button type="button" className={btn} onClick={() => ctx.cmd("invite.calendar")}>
            <OIcon name="calendar" size={13} /> Calendar...
          </button>
        </div>
      )}
      <div className="grid grid-cols-[64px_1fr] gap-y-0.5">
        <span className="text-gray-600">When</span>
        <span>
          {fmtLong(inv.start)} {inv.allDay ? "(all day)" : `${fmtTime(inv.start)} - ${fmtTime(inv.end)}`}
        </span>
        <span className="text-gray-600">Where</span>
        <span>{inv.location || (inv.teams ? "Microsoft Teams Meeting" : "(none)")}</span>
        <span className="text-gray-600">Organizer</span>
        <span>{inv.organizer.name}</span>
        {inv.required?.length ? (
          <>
            <span className="text-gray-600">Required</span>
            <span>{inv.required.map((p) => p.name).join("; ")}</span>
          </>
        ) : null}
        {inv.optional?.length ? (
          <>
            <span className="text-gray-600">Optional</span>
            <span>{inv.optional.map((p) => p.name).join("; ")}</span>
          </>
        ) : null}
      </div>
      {!inv.response && inv.kind !== "cancel" && (
        <p className={`mt-2 flex items-center gap-1 ${conflicts.length ? "text-[#a4262c]" : "text-green-800"}`}>
          <OIcon name={conflicts.length ? "warning" : "check"} size={13} />
          {conflicts.length ? `Conflicts with another appointment on your Calendar: ${conflicts.map((o) => `${o.evt.title} (${fmtTime(o.start)} - ${fmtTime(o.end)})`).join(", ")}` : "No conflicts"}
        </p>
      )}
      {!inv.allDay && <DayStrip ctx={ctx} start={inv.start} end={inv.end} exceptId={inv.eventId} />}
      {inv.teams && (
        <div className="mt-2 border-t border-gray-300 pt-2">
          <p className="flex items-center gap-1 font-semibold"><OIcon name="teams" size={16} /> Microsoft Teams meeting</p>
          <p className="text-[12px]">Join on your computer, mobile app or room device</p>
          <span className="text-[12px] text-[#5b5fc7] underline">Click here to join the meeting</span>
        </div>
      )}
    </div>
  );
}

export function MessageView({ ctx, m }: { ctx: Ctx; m: OlMessage }) {
  const doc = ctx.doc;
  const junk = m.folder === "junk";
  const btn = "flex items-center gap-1 rounded px-1.5 py-1 text-[12px] hover:bg-[#f3f2f1]";
  const flag = m.flag;
  return (
    <article aria-label={`Message: ${m.subject}`} className="min-h-0 flex-1 overflow-auto bg-white px-4 py-3">
      <h2 className="mb-2 text-[17px] font-semibold leading-snug text-gray-900">{m.subject || "(No subject)"}</h2>
      <div className="mb-2 flex items-start gap-3">
        <Avatar name={m.from.name} size={36} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1">
            <SenderName p={m.from} external={m.external} />
          </div>
          {m.to?.length ? <div className="truncate text-[12px] text-gray-600">To: {m.to.map((p) => p.name).join("; ")}</div> : null}
          {m.cc?.length ? <div className="truncate text-[12px] text-gray-600">Cc: {m.cc.map((p) => p.name).join("; ")}</div> : null}
          {m.bcc?.length && m.from.email === doc.account.email ? <div className="truncate text-[12px] text-gray-600">Bcc: {m.bcc.map((p) => p.name).join("; ")}</div> : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <div className="flex items-center">
            <button type="button" className={btn} aria-label="Reply" onClick={() => ctx.cmd("mail.reply")}>
              <OIcon name="reply" /> <span className="hidden xl:inline">Reply</span>
            </button>
            <button type="button" className={btn} aria-label="Reply All" onClick={() => ctx.cmd("mail.replyAll")}>
              <OIcon name="replyAll" /> <span className="hidden xl:inline">Reply All</span>
            </button>
            <button type="button" className={btn} aria-label="Forward" onClick={() => ctx.cmd("mail.forward")}>
              <OIcon name="forward" /> <span className="hidden xl:inline">Forward</span>
            </button>
            <MenuButton ariaLabel="More actions" className={btn} items={messageMenu(ctx, m)}>
              <OIcon name="more" />
            </MenuButton>
          </div>
          <span className="text-[11.5px] text-gray-500">{fmtLong(m.date).replace(/^(\w{3})\w+/, "$1")} {fmtTime(m.date)}</span>
        </div>
      </div>
      {m.firstTime && (
        <InfoBar icon="info" tone="yellow">
          You don&apos;t often get email from {m.from.email}. <span className="text-[#0563c1] underline">Learn why this is important</span>
        </InfoBar>
      )}
      {junk && (
        <InfoBar icon="junk" tone="red">
          This message was identified as junk. Links and other functionality have been disabled.{" "}
          <button type="button" className="font-semibold text-[#0563c1] underline" onClick={() => ctx.cmd("home.junk", "Not Junk")}>
            It&apos;s not junk
          </button>
        </InfoBar>
      )}
      {m.reported === "phishing" && <InfoBar icon="shield" tone="blue">You reported this message as phishing.</InfoBar>}
      {m.importance === "High" && <InfoBar icon="important">This message was sent with High importance.</InfoBar>}
      {m.replied && <InfoBar icon={m.replied === "forwarded" ? "forward" : "reply"}>{m.replied === "forwarded" ? "You forwarded this message." : "You replied to this message."}</InfoBar>}
      {flag && (
        <InfoBar icon={flag.complete ? "check" : "flag"}>
          {flag.complete
            ? "Flag for follow up. Completed."
            : `${flag.label && !["Today", "Tomorrow", "This Week", "Next Week", "No Date", "Custom"].includes(flag.label) ? flag.label : "Follow up"}.${flag.start ? ` Start by ${fmtLong(flag.start)}.` : ""}${flag.due ? ` Due by ${fmtLong(flag.due)}.` : ""}${flag.reminder ? ` Reminder: ${fmtDate(flag.reminder)} ${fmtTime(flag.reminder)}.` : ""}`}
        </InfoBar>
      )}
      {m.sendAt && m.folder === "outbox" && <InfoBar icon="clock">This message will be sent {fmtLong(m.sendAt)} at {fmtTime(m.sendAt)}.</InfoBar>}
      {m.categories?.length ? (
        <div className="mb-2">
          <CategoryChips doc={doc} cats={m.categories} />
        </div>
      ) : null}
      {m.attachments?.length ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {m.attachments.map((a) => (
            <AttachmentTile key={a.name} name={a.name} size={a.size} link={a.link} onOpen={() => ctx.cmd("attachment.open", a.name)} />
          ))}
        </div>
      ) : null}
      {m.invite && <InviteCard ctx={ctx} m={m} />}
      <MessageBody ctx={ctx} text={m.body} disabledLinks={junk} />
    </article>
  );
}

export function ReadingPane({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const ids = selIds(ctx.ui.selection, "msg");
  if (composeVisible(doc, ctx.ui) && doc.compose?.inline) return <ComposeForm ctx={ctx} inline />;
  if (ids.length > 1)
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-white text-[13px] text-gray-600">
        <OIcon name="mail" size={40} className="mb-2 text-gray-400" />
        {ids.length} items selected
      </div>
    );
  const m = doc.messages.find((x) => x.id === ids[0] && visibleMessages(doc).some((y) => y.id === x.id));
  if (!m)
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-white text-[13px] text-gray-500">
        <OIcon name="mail" size={44} className="mb-2 text-gray-300" />
        Select an item to read
        <span className="mt-1 text-[11.5px] text-gray-400">Click here to always preview messages</span>
      </div>
    );
  return <MessageView ctx={ctx} m={m} />;
}

/* ------------------------------------------------------------------ */
/* Compose                                                             */
/* ------------------------------------------------------------------ */

export function suggestionsFor(ctx: Ctx, text: string): { label: string; sub: string; token: string }[] {
  const t = text.trim().toLowerCase();
  if (!t) return [];
  const out: { label: string; sub: string; token: string }[] = [];
  for (const g of ctx.doc.groups ?? []) if (g.name.toLowerCase().includes(t)) out.push({ label: g.name, sub: "Contact group", token: g.name });
  for (const p of people(ctx.doc)) {
    if (p.name.toLowerCase().split(/\s+/).some((w) => w.startsWith(t)) || p.name.toLowerCase().startsWith(t) || p.email.toLowerCase().startsWith(t)) out.push({ label: p.name, sub: p.email, token: p.email });
  }
  return out.slice(0, 7);
}

export function resolveToken(ctx: Ctx, text: string): string | null {
  const t = text.trim().replace(/[;,]+$/, "").trim();
  if (!t) return null;
  const g = (ctx.doc.groups ?? []).find((x) => x.name.toLowerCase() === t.toLowerCase());
  if (g) return g.name;
  const all = people(ctx.doc);
  const p = all.find((x) => x.email.toLowerCase() === t.toLowerCase() || x.name.toLowerCase() === t.toLowerCase());
  if (p) return p.email;
  const angle = /<([^>]+@[^>]+)>/.exec(t);
  if (angle) return angle[1].trim();
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t)) return t;
  const s = suggestionsFor(ctx, t);
  if (s.length === 1) return s[0].token;
  return null;
}

export function RecipientField({
  ctx, label, tokens, pending, onTokens, onPending, onButton,
}: { ctx: Ctx; label: string; tokens: string[]; pending: string; onTokens: (t: string[]) => void; onPending: (s: string) => void; onButton?: () => void }) {
  const [hi, setHi] = useState(0);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const sugg = focus ? suggestionsFor(ctx, pending) : [];
  const add = (tok: string) => {
    if (!tokens.some((t) => t.toLowerCase() === tok.toLowerCase())) onTokens([...tokens, tok]);
    onPending("");
    setHi(0);
  };
  const tryResolve = () => {
    const r = resolveToken(ctx, pending);
    if (r) add(r);
  };
  const nameOf = (t: string) => {
    const g = (ctx.doc.groups ?? []).find((x) => x.name.toLowerCase() === t.toLowerCase());
    if (g) return g.name;
    return people(ctx.doc).find((p) => p.email.toLowerCase() === t.toLowerCase())?.name ?? t;
  };
  return (
    <div className="flex items-start gap-2 border-b border-gray-200 py-1">
      <button type="button" onClick={onButton} className="mt-0.5 w-14 shrink-0 rounded border border-gray-300 bg-white px-1 py-0.5 text-left text-[12px] hover:bg-[#f3f2f1]" aria-label={`${label} (Address Book)`}>
        {label}
      </button>
      <div className="relative flex min-h-[24px] min-w-0 flex-1 flex-wrap items-center gap-1" onClick={() => inputRef.current?.focus()}>
        {tokens.map((t) => {
          const isGroup = (ctx.doc.groups ?? []).some((g) => g.name.toLowerCase() === t.toLowerCase());
          return (
            <span key={t} className="group/chip flex items-center gap-1 rounded-sm bg-[#e8ebfa] px-1.5 py-[1px] text-[12px] text-gray-900" title={isGroup ? `Contact group: ${t}` : t}>
              {isGroup && <OIcon name="group" size={12} />}
              {nameOf(t)}
              <button type="button" aria-label={`Remove ${nameOf(t)}`} onClick={(e) => { e.stopPropagation(); onTokens(tokens.filter((x) => x !== t)); }} className="text-gray-500 hover:text-gray-900">
                ×
              </button>
            </span>
          );
        })}
        <input
          ref={inputRef}
          aria-label={label}
          value={pending}
          onChange={(e) => {
            const v = e.target.value;
            if (/[;,]\s*$/.test(v)) {
              const r = resolveToken(ctx, v);
              if (r) {
                add(r);
                return;
              }
            }
            onPending(v);
            setHi(0);
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setTimeout(() => setFocus(false), 150);
            if (pending.trim()) tryResolve();
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "ArrowDown" && sugg.length) {
              e.preventDefault();
              setHi((h) => Math.min(sugg.length - 1, h + 1));
            } else if (e.key === "ArrowUp" && sugg.length) {
              e.preventDefault();
              setHi((h) => Math.max(0, h - 1));
            } else if ((e.key === "Enter" || e.key === "Tab") && pending.trim()) {
              if (sugg[hi]) {
                e.preventDefault();
                add(sugg[hi].token);
              } else if (e.key === "Enter") {
                e.preventDefault();
                tryResolve();
              }
            } else if (e.key === "Backspace" && !pending && tokens.length) {
              onTokens(tokens.slice(0, -1));
            }
          }}
          className={`min-w-[80px] flex-1 py-0.5 text-[12.5px] outline-none ${pending && !focus ? "underline decoration-red-600 decoration-wavy" : ""}`}
        />
        {sugg.length > 0 && (
          <div role="listbox" className="absolute left-0 top-full z-40 mt-0.5 w-80 border border-gray-300 bg-white py-1 shadow-lg">
            {sugg.map((s, i) => (
              <button
                key={s.token}
                type="button"
                role="option"
                aria-selected={i === hi}
                onMouseDown={(e) => {
                  e.preventDefault();
                  add(s.token);
                }}
                className={`flex w-full items-center gap-2 px-2 py-1 text-left text-[12px] ${i === hi ? "bg-[#e5f1fb]" : "hover:bg-[#f3f2f1]"}`}
              >
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
    </div>
  );
}

export function ComposeForm({ ctx, inline }: { ctx: Ctx; inline?: boolean }) {
  const doc = ctx.doc;
  const c = doc.compose!;
  const d = ctx.cdraft ?? { to: c.to, cc: c.cc, bcc: c.bcc, subject: c.subject, body: c.body, pending: { to: "", cc: "", bcc: "" } };
  const fmt = c.format ?? {};
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (c.mode !== "new" && bodyRef.current) {
      bodyRef.current.focus();
      bodyRef.current.setSelectionRange(0, 0);
    }
  }, [c.id, c.mode]);
  const field = (k: "to" | "cc" | "bcc", label: string) => (
    <RecipientField
      ctx={ctx}
      label={label}
      tokens={d[k]}
      pending={d.pending[k]}
      onTokens={(t) => ctx.setCdraft({ [k]: t })}
      onPending={(s) => ctx.setCdraft({ pending: { ...d.pending, [k]: s } })}
      onButton={() => ctx.cmd("compose.addressBook", label.replace("...", ""))}
    />
  );
  const sendMenu: MenuEntry[] = [
    { label: "Send", onPick: () => ctx.send() },
    { label: "Schedule send", icon: <OIcon name="clock" size={14} />, onPick: () => ctx.scheduleSend() },
  ];
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white" aria-label={inline ? "Reply" : "New message"}>
      {inline && (
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#faf9f8] px-3 py-1 text-[12px]">
          <button type="button" onClick={() => ctx.cmd("compose.popOut")} className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-gray-200">
            <OIcon name="popout" size={13} /> Pop Out
          </button>
          <button type="button" onClick={() => ctx.cmd("compose.discard")} className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-gray-200">
            <OIcon name="trash" size={13} /> Discard
          </button>
          <span className="flex-1" />
          <span className="text-gray-500">{c.mode === "forward" ? "Forwarding" : c.mode === "replyAll" ? "Replying to all" : "Replying"}</span>
        </div>
      )}
      {!inline && (
        <div className="flex items-center justify-end border-b border-gray-200 px-2 py-0.5">
          <button type="button" aria-label="Close message" title="Close" onClick={() => ctx.saveDraft()} className="rounded p-1 text-gray-600 hover:bg-red-600 hover:text-white">
            <OIcon name="close" size={12} />
          </button>
        </div>
      )}
      {c.sendAt && (
        <div className="flex items-center gap-2 border-b border-[#f7e28c] bg-[#fff4ce] px-3 py-1 text-[12px]">
          <OIcon name="clock" size={13} /> This message will be delivered on {fmtLong(c.sendAt)} at {fmtTime(c.sendAt)}.
        </div>
      )}
      {c.importance && (
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f3f2f1] px-3 py-1 text-[12px]">
          <OIcon name={c.importance === "High" ? "important" : "down"} size={13} /> This message has {c.importance} importance.
        </div>
      )}
      <div className="flex gap-2 px-3 pt-2">
        <div className="flex flex-col">
          <button type="button" onClick={() => ctx.send()} aria-label="Send" title="Send (Ctrl+Enter)" className="flex h-[52px] w-14 flex-col items-center justify-center gap-0.5 rounded-t border border-gray-300 bg-white text-[12px] hover:bg-[#e5f1fb]">
            <OIcon name="send" size={20} className="text-[#0f6cbd]" />
            Send
          </button>
          <MenuButton ariaLabel="Send options" className="h-4 w-14 rounded-b border border-t-0 border-gray-300 bg-white text-[10px] text-gray-600 hover:bg-[#e5f1fb]" items={sendMenu}>
            ▾
          </MenuButton>
        </div>
        <div className="min-w-0 flex-1">
          {c.showFrom && (
            <div className="flex items-center gap-2 border-b border-gray-200 py-1 text-[12.5px]">
              <span className="w-14 text-gray-600">From</span>
              <span>{doc.account.email}</span>
            </div>
          )}
          {field("to", "To...")}
          {field("cc", "Cc...")}
          {c.showBcc && field("bcc", "Bcc...")}
          <div className="flex items-center gap-2 border-b border-gray-200 py-1">
            <label htmlFor={`subj-${c.id}`} className="w-14 shrink-0 text-[12px] text-gray-600">
              Subject
            </label>
            <input id={`subj-${c.id}`} value={d.subject} onChange={(e) => ctx.setCdraft({ subject: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 py-0.5 text-[12.5px] outline-none" />
            {inline && !c.showBcc && (
              <button type="button" onClick={() => ctx.cmd("compose.bcc")} className="rounded px-1 text-[11.5px] text-gray-600 hover:bg-gray-100">
                Bcc
              </button>
            )}
          </div>
          {c.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 border-b border-gray-200 py-1.5">
              {c.attachments.map((a) => (
                <AttachmentTile key={a.name} name={a.name} size={a.size} link={a.link} onRemove={() => ctx.cmd("compose.removeAttachment", a.name)} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-2 pt-1">
        <textarea
          ref={bodyRef}
          aria-label="Message body"
          value={d.body}
          onChange={(e) => ctx.setCdraft({ body: e.target.value })}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              ctx.send();
            }
          }}
          className="min-h-[110px] w-full flex-1 resize-none border-0 p-1 text-[13px] leading-relaxed outline-none"
          style={{
            fontFamily: `${fmt.font ?? "Aptos"}, Calibri, 'Segoe UI', sans-serif`,
            fontSize: fmt.size ? `${Number(fmt.size) * 1.2}px` : undefined,
            fontWeight: fmt.bold ? 700 : undefined,
            fontStyle: fmt.italic ? "italic" : undefined,
            textDecoration: fmt.underline ? "underline" : undefined,
            color: fmt.color && fmt.color !== "Automatic" ? fmt.color : undefined,
          }}
        />
        {c.quoted && <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap border-t border-gray-300 pt-2 font-sans text-[12px] text-gray-600">{c.quoted}</pre>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* To-Do Bar                                                           */
/* ------------------------------------------------------------------ */

export function TodoBar({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const today = todayOf(doc);
  const upcoming = occurrences(doc, today, addDays(today, 6)).filter((o) => !o.evt.calendar && toMs(o.end) >= toMs(`${today}T00:00`)).slice(0, 6);
  const flagged = doc.messages.filter((m) => m.flag && !m.flag.complete && m.folder !== "deleted");
  const tasks = (doc.tasks ?? []).filter((t) => t.status !== "Completed");
  return (
    <aside aria-label="To-Do Bar" className="hidden w-56 shrink-0 flex-col overflow-auto border-l border-gray-200 bg-[#faf9f8] p-2 text-[12px] md:flex">
      {doc.todoBar !== "Tasks" && (
        <>
          <h3 className="mb-1 font-semibold">{doc.todoBar === "People" ? "People" : "Calendar"}</h3>
          {doc.todoBar === "People" ? (
            sortedContacts(doc).slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center gap-2 py-1">
                <Avatar name={c.name} size={22} />
                <span className="truncate">{c.name}</span>
              </div>
            ))
          ) : upcoming.length ? (
            upcoming.map((o) => (
              <div key={o.key} className="mb-1 border-l-2 pl-1.5" style={{ borderColor: o.evt.categories?.[0] ? CATEGORY_COLORS[o.evt.categories[0]] : ctx.accent }}>
                <div className="font-semibold">{o.evt.title}</div>
                <div className="text-gray-600">
                  {dateOf(o.start) === today ? "Today" : fmtLong(o.start).split(",")[0]} {o.evt.allDay ? "All day" : `${fmtTime(o.start)} - ${fmtTime(o.end)}`}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </>
      )}
      <h3 className="mb-1 mt-3 font-semibold">Tasks</h3>
      {[...flagged.map((m) => ({ k: `msg:${m.id}`, title: m.subject, due: m.flag?.due })), ...tasks.map((t) => ({ k: `task:${t.id}`, title: t.subject, due: t.due }))]
        .sort((a, b) => toMs(a.due ?? "2099-01-01") - toMs(b.due ?? "2099-01-01"))
        .map((t) => (
          <button key={t.k} type="button" onClick={() => ctx.select(t.k)} className="flex w-full items-center gap-1.5 border-b border-gray-200 py-1 text-left hover:bg-white">
            <OIcon name="flagFill" size={12} color="#c50f1f" />
            <span className="min-w-0 flex-1 truncate">{t.title}</span>
            <span className="text-[11px] text-gray-500">{t.due ? (t.due === today ? "Today" : fmtDate(t.due)) : ""}</span>
          </button>
        ))}
      {!flagged.length && !tasks.length && <p className="text-gray-500">There are no items to show in this view.</p>}
    </aside>
  );
}

