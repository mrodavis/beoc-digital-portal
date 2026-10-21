"use client";

import { useState } from "react";
import { AppLogo, DriveLogo, FolderIcon, GIcon } from "./icons";
import { DRIVE_NEW, driveItemMenu, type GItem } from "./menus";
import { fileOf, meOf, personOf, surfaceOf } from "./model";
import type { GFile } from "./types";
import { AccountButton, AppsButton, Avatar, FONT, IconBtn, MenuList, Popup, TEXT_FONT, useG, type MenuPos } from "./ui";

const NAV: { id: string; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "activity", label: "Activity", icon: "activity" },
  { id: "root", label: "My Drive", icon: "myDrive" },
  { id: "shareddrives", label: "Shared drives", icon: "sharedDrive" },
  { id: "computers", label: "Computers", icon: "computer" },
  { id: "shared", label: "Shared with me", icon: "people" },
  { id: "recent", label: "Recent", icon: "recent" },
  { id: "starred", label: "Starred", icon: "star" },
  { id: "spam", label: "Spam", icon: "spam" },
  { id: "trash", label: "Trash", icon: "trash" },
  { id: "storage", label: "Storage", icon: "cloud" },
];

/** Search chip options (Type, Modified, Location). */
export const CHIP_TYPES: Record<string, string[]> = {
  Documents: ["doc", "word", "text"],
  Spreadsheets: ["sheet", "excel"],
  Presentations: ["slides", "powerpoint"],
  Forms: ["form"],
  "Photos & images": ["image"],
  PDFs: ["pdf"],
  Videos: ["video"],
  Shortcuts: ["shortcut"],
  Folders: ["folder"],
};
export const CHIP_MODIFIED = ["Today", "Last 7 days", "Last 30 days", "This year (2026)", "Last year (2025)"];
export const CHIP_LOCATIONS = ["Anywhere in Drive", "My Drive", "Shared with me", "Starred", "Trash"];

/** "184 KB", "1.2 GB" → bytes, for sorting Storage. */
function bytes(size?: string): number {
  const m = /([\d.]+)\s*(KB|MB|GB|bytes)/i.exec(size ?? "");
  if (!m) return 1024;
  const n = Number(m[1]);
  const u = m[2].toUpperCase();
  return n * (u === "GB" ? 1e9 : u === "MB" ? 1e6 : u === "KB" ? 1e3 : 1);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** Days before the sim's today (Oct 20, 2026) a file was modified; times of day mean today. */
function ageDays(modified?: string): number {
  if (!modified || /AM|PM/.test(modified)) return 0;
  const m = /^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/.exec(modified);
  if (!m) return 999;
  const d = Date.UTC(Number(m[3]), MONTHS.indexOf(m[1]), Number(m[2]));
  return Math.round((Date.UTC(2026, 9, 20) - d) / 86400000);
}
function modifiedMatch(f: GFile, v: string): boolean {
  const a = ageDays(f.modified);
  if (v === "Today") return a === 0;
  if (v === "Last 7 days") return a <= 7;
  if (v === "Last 30 days") return a <= 30;
  if (v.startsWith("This year")) return !f.modified || /AM|PM/.test(f.modified) || f.modified.endsWith("2026");
  if (v.startsWith("Last year")) return Boolean(f.modified?.endsWith("2025"));
  return true;
}

const TYPE_NAME: Record<string, string> = {
  folder: "Folder", doc: "Google Docs", sheet: "Google Sheets", slides: "Google Slides", form: "Google Forms", pdf: "PDF", image: "Image", word: "Microsoft Word", excel: "Microsoft Excel", powerpoint: "Microsoft PowerPoint", text: "Text", video: "Video", shortcut: "Shortcut",
};

export function FileIcon({ f, size = 24 }: { f: GFile; size?: number }) {
  if (f.kind === "folder") return <FolderIcon size={size} color={f.color ?? "#5f6368"} shared={Boolean(f.sharing?.people?.length || (f.sharing?.access && f.sharing.access !== "Restricted"))} />;
  return <AppLogo kind={f.kind === "shortcut" ? "text" : f.kind} size={size} />;
}

export function DriveView({ search, setSearch }: { search: string; setSearch: (s: string) => void }) {
  const g = useG();
  const { doc, ui } = g;
  const me = meOf(doc);
  const loc = doc.drive?.location ?? "root";
  const layout = doc.drive?.layout ?? "list";
  const [menu, setMenu] = useState<{ kind: "new" | "item"; pos: MenuPos } | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const selected = ui.selection.startsWith("file:") ? ui.selection.split(",").map((s) => s.trim().slice(5)) : [];
  const mine = (f: GFile) => !f.owner || f.owner === me.email;
  const target = (f: GFile) => (f.kind === "shortcut" ? fileOf(doc, f.shortcutTo) ?? f : f);

  let items: GFile[];
  let title = "My Drive";
  const q = (doc.drive?.query ?? "").trim().toLowerCase();
  const chips = doc.drive?.chips ?? {};
  const searching = Boolean(q || Object.keys(chips).length);
  const [chipMenu, setChipMenu] = useState<{ chip: "type" | "people" | "modified" | "location"; pos: MenuPos } | null>(null);
  const owners = Array.from(new Set(doc.files.map((f) => f.owner ?? me.email)));
  const inShared = (f: GFile) => !mine(f);
  const sharedDrives = doc.sharedDrives ?? [];
  if (searching) {
    const loc0 = chips.location ?? "Anywhere in Drive";
    items = doc.files.filter((f) => {
      if (loc0 === "Trash" ? !f.trashed : f.trashed) return false;
      if (q && !f.name.toLowerCase().includes(q)) return false;
      if (chips.type && !(CHIP_TYPES[chips.type] ?? []).includes(f.kind)) return false;
      if (chips.people && (f.owner ?? me.email).toLowerCase() !== chips.people.toLowerCase() && !(f.sharing?.people ?? []).some((p) => p.email.toLowerCase() === chips.people!.toLowerCase())) return false;
      if (chips.modified && !modifiedMatch(f, chips.modified)) return false;
      if (loc0 === "My Drive" && (!mine(f) || !f.parent)) return false;
      if (loc0 === "Shared with me" && !inShared(f)) return false;
      if (loc0 === "Starred" && !f.starred) return false;
      return true;
    });
    title = "Search results";
  } else if (loc === "activity") {
    // Recent comments and edits by others (work accounts).
    items = doc.files.filter((f) => !f.trashed && f.kind !== "folder" && ((f.comments ?? []).some((c) => !c.resolved) || (f.modifiedBy && f.modifiedBy !== me.email)));
    title = "Activity";
  } else if (loc === "shareddrives") {
    items = sharedDrives.map((d) => ({ id: d.id, name: d.name, kind: "folder" as const, parent: "shareddrives", color: "#5f6368" }));
    title = "Shared drives";
  } else if (loc === "trash") {
    items = doc.files.filter((f) => f.trashed && !(f.parent && fileOf(doc, f.parent)?.trashed));
    title = "Trash";
  } else if (loc === "shared") {
    items = doc.files.filter((f) => !f.trashed && !mine(f) && !(f.parent && fileOf(doc, f.parent) && !mine(fileOf(doc, f.parent)!)));
    title = "Shared with me";
  } else if (loc === "starred") {
    items = doc.files.filter((f) => !f.trashed && f.starred);
    title = "Starred";
  } else if (loc === "recent" || loc === "home") {
    items = doc.files.filter((f) => !f.trashed && f.kind !== "folder" && f.kind !== "shortcut");
    title = loc === "home" ? `Welcome to Drive` : "Recent";
  } else if (loc === "storage") {
    // Files that use your storage, largest first (Storage used).
    items = doc.files.filter((f) => f.kind !== "folder" && f.kind !== "shortcut" && mine(f)).sort((a, b) => bytes(b.size) - bytes(a.size));
    title = "Storage";
  } else if (loc === "computers" || loc === "spam") {
    items = [];
    title = loc === "computers" ? "Computers" : "Spam";
  } else {
    items = doc.files.filter((f) => !f.trashed && (f.parent ?? "") === loc);
    title = loc === "root" ? "My Drive" : fileOf(doc, loc)?.name ?? sharedDrives.find((d) => d.id === loc)?.name ?? "My Drive";
  }
  if (loc !== "storage" || searching) items = [...items.filter((f) => f.kind === "folder"), ...items.filter((f) => f.kind !== "folder")];

  const crumbs: GFile[] = [];
  if (!searching && loc !== "root" && fileOf(doc, loc)?.kind === "folder") {
    let cur = fileOf(doc, loc);
    while (cur) {
      crumbs.unshift(cur);
      cur = cur.parent && cur.parent !== "root" ? fileOf(doc, cur.parent) : undefined;
    }
  }
  // A folder inside a shared drive: the drive name starts the path.
  const inDrive = crumbs.length ? sharedDrives.find((d) => d.id === crumbs[0].parent) : sharedDrives.find((d) => d.id === loc);
  const inMyDrive = crumbs.length > 0 && mine(crumbs[0]) && (crumbs[0].parent ?? "") === "root";

  const select = (f: GFile, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `file:${f.id}`;
    if (e.ctrlKey || e.metaKey) {
      const set = new Set(selected);
      if (set.has(f.id)) set.delete(f.id);
      else set.add(f.id);
      g.onSelect({ selection: Array.from(set).map((x) => `file:${x}`).join(",") });
    } else if (e.shiftKey && selected.length) {
      const ids = items.map((x) => x.id);
      const a = ids.indexOf(selected[0]), b = ids.indexOf(f.id);
      g.onSelect({ selection: ids.slice(Math.min(a, b), Math.max(a, b) + 1).map((x) => `file:${x}`).join(",") });
    } else g.onSelect({ selection: key });
    g.focus();
  };
  const open = (f: GFile) => {
    const t = target(f);
    if (f.trashed) return;
    if (t.kind === "folder" || f.parent === "shareddrives") g.cmd("g.go", t.id);
    else g.cmd("g.open", t.id);
  };
  const ctx = (f: GFile, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selected.includes(f.id)) g.onSelect({ selection: `file:${f.id}` });
    setMenu({ kind: "item", pos: { x: e.clientX, y: e.clientY } });
  };
  const menuFor = (): GItem[] => {
    const ids = selected.length ? selected : [];
    const f = fileOf(doc, ids[0]);
    if (!f) return [];
    return driveItemMenu({ folder: f.kind === "folder", starred: Boolean(f.starred), trashed: Boolean(f.trashed), editor: Boolean(surfaceOf(target(f).kind)) }) as GItem[];
  };
  const pick = (i: GItem) => {
    setMenu(null);
    const ids = selected;
    if (i.dialog === "g.move" || i.dialog === "g.shortcut") return g.dialog(i.dialog, { file: ids.join(",") });
    if (i.dialog) return g.dialog(i.dialog);
    if (i.action) return g.act(i.action, ids[0]);
    if (i.command) {
      const v = i.value?.replace("$id", ids.join(","));
      return g.cmd(i.command, v);
    }
  };
  const drop = (folderId: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const raw = e.dataTransfer.getData("text/x-drive");
    if (!raw) return;
    const ids = raw.split(",").filter((x) => x !== folderId);
    if (!ids.length) return;
    g.onCommit({ kind: "dialog", id: "g.move", values: { file: ids.join(","), folder: folderId === "root" ? "My Drive" : fileOf(doc, folderId)?.name ?? folderId } });
  };
  const dragProps = (f: GFile) => ({
    draggable: !f.trashed,
    onDragStart: (e: React.DragEvent) => {
      const ids = selected.includes(f.id) ? selected : [f.id];
      if (!selected.includes(f.id)) g.onSelect({ selection: `file:${f.id}` });
      e.dataTransfer.setData("text/x-drive", ids.join(","));
      e.dataTransfer.effectAllowed = "move";
    },
    ...(f.kind === "folder" && !f.trashed
      ? {
          onDragOver: (e: React.DragEvent) => { e.preventDefault(); setDragOver(f.id); },
          onDragLeave: () => setDragOver((d) => (d === f.id ? null : d)),
          onDrop: (e: React.DragEvent) => drop(f.id, e),
        }
      : {}),
  });

  const ownerLabel = (f: GFile) => {
    if (mine(f)) return "me";
    return personOf(doc, f.owner)?.name ?? f.owner ?? "";
  };
  const modifiedLabel = (f: GFile) => {
    const who = f.modifiedBy && f.modifiedBy !== me.email ? personOf(doc, f.modifiedBy)?.name ?? "" : "me";
    return `${f.modified ?? "Oct 1, 2026"}${who ? ` ${who}` : ""}`;
  };
  const sel1 = fileOf(doc, selected[0]);

  return (
    <div className="flex h-full flex-col bg-[#f8fafd]" style={{ fontFamily: TEXT_FONT }} onClick={() => g.onSelect({ selection: "" })}>
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center gap-2 px-4">
        <button type="button" aria-label="Drive" onClick={(e) => { e.stopPropagation(); setSearch(""); g.cmd("g.go", "home"); }} className="flex shrink-0 items-center gap-2 rounded-full pr-3 hover:bg-black/5">
          <span className="p-1"><DriveLogo size={36} /></span>
          <span className="text-[22px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>Drive</span>
        </button>
        <div className="mx-auto flex h-12 w-full max-w-[720px] items-center gap-2 rounded-full bg-[#e9eef6] px-3 focus-within:bg-white focus-within:shadow" onClick={(e) => e.stopPropagation()}>
          <IconBtn icon="search" label="Search" onClick={() => g.cmd("g.search", search)} />
          <input aria-label="Search in Drive" placeholder="Search in Drive" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") g.cmd("g.search", search); if (e.key === "Escape") { setSearch(""); g.cmd("g.search", ""); } }} className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none" />
          {search || doc.drive?.query ? <IconBtn icon="close" label="Clear search" onClick={() => { setSearch(""); g.cmd("g.search", ""); }} /> : <IconBtn icon="tune" label="Advanced search" onClick={() => g.cmd("g.toast", "Advanced search: owner, type, words in the file, location, date modified, and more")} />}
        </div>
        <IconBtn icon="help" label="Support" onClick={(e) => { e.stopPropagation(); g.cmd("g.help", "Drive Help"); }} />
        <IconBtn icon="settings" label="Settings" onClick={(e) => { e.stopPropagation(); g.cmd("g.help", "Settings"); }} />
        <AppsButton />
        <AccountButton />
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Navigation */}
        <nav className="flex w-[232px] shrink-0 flex-col overflow-y-auto pb-2 pl-2 pr-3" aria-label="Drive">
          <button
            type="button"
            aria-label="New"
            onClick={(e) => { e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); setMenu({ kind: "new", pos: { x: r.left, y: r.top } }); }}
            className="mb-3 ml-1 flex h-14 w-fit items-center gap-3 rounded-2xl bg-white pl-4 pr-6 text-[14px] font-medium text-[#1f1f1f] shadow-[0_1px_2px_rgba(0,0,0,.3),0_1px_3px_1px_rgba(0,0,0,.15)] hover:bg-[#edf2fa]"
            style={{ fontFamily: FONT }}
          >
            <GIcon name="plus" size={24} color="#1f1f1f" /> New
          </button>
          {NAV.filter((n) => (n.id !== "shareddrives" && n.id !== "activity") || doc.org || sharedDrives.length).map((n) => {
            const active = !searching && (loc === n.id || (n.id === "root" && crumbs.length > 0 && inMyDrive) || (n.id === "shareddrives" && Boolean(inDrive)));
            return (
              <button
                key={n.id}
                type="button"
                aria-label={n.label}
                aria-current={active ? "page" : undefined}
                onClick={(e) => { e.stopPropagation(); setSearch(""); g.cmd("g.go", n.id); }}
                onDragOver={n.id === "root" ? (e) => { e.preventDefault(); setDragOver("root"); } : undefined}
                onDragLeave={n.id === "root" ? () => setDragOver(null) : undefined}
                onDrop={n.id === "root" ? (e) => drop("root", e) : undefined}
                className={`flex h-8 shrink-0 items-center gap-4 rounded-full pl-4 text-[14px] ${active ? "bg-[#c2e7ff] font-medium text-[#001d35]" : "text-[#1f1f1f] hover:bg-[#e9eef6]"} ${dragOver === "root" && n.id === "root" ? "ring-2 ring-[#0b57d0]" : ""} ${n.id === "spam" || n.id === "computers" ? "mt-0" : ""}`}
              >
                <GIcon name={n.id === "starred" ? "star" : n.icon} size={20} color={active ? "#001d35" : "#444746"} />
                {n.label}
              </button>
            );
          })}
          <div className="mt-2 pl-4 text-[13px] text-[#444746]">
            <div className="mb-1 h-1 w-40 overflow-hidden rounded-full bg-[#e3e3e3]"><div className="h-full w-[16%] bg-[#0b57d0]" /></div>
            2.4 GB of 15 GB used
          </div>
        </nav>

        {/* Main */}
        <main className="mb-4 mr-4 flex min-w-0 flex-1 flex-col rounded-2xl bg-white" aria-label={title}>
          <div className="flex h-14 shrink-0 items-center gap-1 px-4">
            {crumbs.length ? (
              <div className="flex min-w-0 flex-1 items-center gap-1 text-[22px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>
                {inMyDrive && (
                  <>
                    <button type="button" onClick={(e) => { e.stopPropagation(); g.cmd("g.go", "root"); }} className="shrink-0 rounded-full px-3 py-1 hover:bg-[#e9eef6]">My Drive</button>
                    <GIcon name="chevronRight" size={22} />
                  </>
                )}
                {inDrive && (
                  <>
                    <button type="button" onClick={(e) => { e.stopPropagation(); g.cmd("g.go", inDrive.id); }} className="shrink-0 rounded-full px-3 py-1 hover:bg-[#e9eef6]">{inDrive.name}</button>
                    <GIcon name="chevronRight" size={22} />
                  </>
                )}
                {crumbs.map((c, i) => (
                  <span key={c.id} className="flex min-w-0 items-center gap-1">
                    {i > 0 && <GIcon name="chevronRight" size={22} />}
                    <button type="button" onClick={(e) => { e.stopPropagation(); g.cmd("g.go", c.id); }} className="truncate rounded-full px-3 py-1 hover:bg-[#e9eef6]">{c.name}</button>
                  </span>
                ))}
              </div>
            ) : (
              <h1 className="flex-1 truncate px-3 text-[22px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>{title}</h1>
            )}
            {loc === "trash" && !searching && items.length > 0 && (
              <button type="button" onClick={(e) => { e.stopPropagation(); g.cmd("g.emptyTrash"); }} className="mr-2 rounded-full px-4 py-2 text-[14px] font-medium text-[#0b57d0] hover:bg-[#0b57d0]/10">Empty trash</button>
            )}
            <div className="flex h-8 overflow-hidden rounded-full border border-[#747775]" role="group" aria-label="Layout">
              <button type="button" aria-label="List layout" aria-pressed={layout === "list"} onClick={(e) => { e.stopPropagation(); g.cmd("g.layout", "list"); }} className={`flex w-12 items-center justify-center ${layout === "list" ? "bg-[#c2e7ff]" : ""}`}>
                {layout === "list" && <GIcon name="check" size={16} color="#001d35" />}
                <GIcon name="list" size={18} color="#001d35" />
              </button>
              <button type="button" aria-label="Grid layout" aria-pressed={layout === "grid"} onClick={(e) => { e.stopPropagation(); g.cmd("g.layout", "grid"); }} className={`flex w-12 items-center justify-center border-l border-[#747775] ${layout === "grid" ? "bg-[#c2e7ff]" : ""}`}>
                {layout === "grid" && <GIcon name="check" size={16} color="#001d35" />}
                <GIcon name="grid" size={18} color="#001d35" />
              </button>
            </div>
            <IconBtn icon="info" label="View details" pressed={Boolean(doc.drive?.details)} onClick={(e) => { e.stopPropagation(); g.cmd("g.details"); }} />
          </div>

          {/* Filter chips or selection bar */}
          <div className="flex h-12 shrink-0 items-center gap-2 px-4" onClick={(e) => e.stopPropagation()}>
            {selected.length ? (
              <div className="flex h-10 flex-1 items-center gap-1 rounded-full bg-[#edf2fa] px-2" role="toolbar" aria-label="Selection">
                <IconBtn icon="close" label="Clear selection" onClick={() => g.onSelect({ selection: "" })} />
                <span className="mr-3 text-[14px]">{selected.length} selected</span>
                {sel1?.trashed ? (
                  <>
                    <IconBtn icon="restore" label="Restore from trash" onClick={() => g.cmd("g.restore", selected.join(","))} />
                    <IconBtn icon="trash" label="Delete forever" onClick={() => g.cmd("g.deleteForever", selected.join(","))} />
                  </>
                ) : (
                  <>
                    <IconBtn icon="personAdd" label="Share" onClick={() => g.act("share", selected[0])} />
                    <IconBtn icon="download" label="Download" onClick={() => g.cmd("g.drive.download", selected[0])} />
                    <IconBtn icon="move" label="Move" onClick={() => g.dialog("g.move", { file: selected.join(",") })} />
                    <IconBtn icon="trash" label="Move to trash" onClick={() => g.cmd("g.trash", selected.join(","))} />
                    <IconBtn icon="link" label="Copy link" onClick={() => g.cmd("g.copyLink", selected[0])} />
                    <IconBtn icon="more" label="More actions" onClick={(e) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setMenu({ kind: "item", pos: { x: r.left, y: r.bottom } }); }} />
                  </>
                )}
              </div>
            ) : loc === "trash" && !searching ? (
              <p className="flex-1 rounded-lg bg-[#f1f3f4] px-4 py-2 text-[13px] text-[#444746]">Items in trash will be deleted forever after 30 days</p>
            ) : (
              <>
                {(["type", "people", "modified", "location"] as const).map((c) => {
                  const on = chips[c];
                  const label = on ? (c === "people" ? personOf(doc, on)?.name ?? on : on) : c === "type" ? "Type" : c === "people" ? "People" : c === "modified" ? "Modified" : "Location";
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-label={`${c[0].toUpperCase()}${c.slice(1)} filter${on ? `: ${label}` : ""}`}
                      onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setChipMenu({ chip: c, pos: { x: r.left, y: r.bottom + 4 } }); }}
                      className={`flex h-8 items-center gap-1 rounded-lg pl-4 pr-2 text-[14px] ${on ? "bg-[#c2e7ff] text-[#001d35]" : "border border-[#747775] text-[#444746] hover:bg-[#f1f3f4]"}`}
                    >
                      {on && <GIcon name="check" size={16} color="#001d35" />}
                      {label} <GIcon name="dropDown" size={18} color={on ? "#001d35" : undefined} />
                    </button>
                  );
                })}
                {searching && Object.keys(chips).length > 0 && (
                  <button type="button" onClick={() => g.cmd("g.filter", "")} className="ml-1 rounded-full px-3 py-1.5 text-[14px] font-medium text-[#0b57d0] hover:bg-[#0b57d0]/10">Clear filters</button>
                )}
              </>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-auto px-4 pb-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-[#444746]">
                <DriveLogo size={64} />
                <p className="mt-4 text-[18px]" style={{ fontFamily: FONT }}>{searching ? "No results" : loc === "trash" ? "Nothing in trash" : loc === "starred" ? "No starred files" : loc === "computers" ? "No computers syncing" : "Drop files here"}</p>
                <p className="mt-1 text-[13px]">{searching ? "Try a different search or remove a filter." : loc === "trash" ? "Move items you don't need to trash." : loc === "shareddrives" ? "Shared drives your organization adds appear here." : 'or use the "New" button.'}</p>
              </div>
            ) : layout === "grid" ? (
              <>
                {items.some((f) => f.kind === "folder") && <h2 className="mb-2 mt-1 text-[14px] font-medium text-[#1f1f1f]">Folders</h2>}
                <div className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                  {items.filter((f) => f.kind === "folder").map((f) => (
                    <div key={f.id} role="row" aria-label={f.name} aria-selected={selected.includes(f.id)} {...dragProps(f)} onClick={(e) => select(f, e)} onDoubleClick={() => open(f)} onContextMenu={(e) => ctx(f, e)} className={`flex h-12 items-center gap-3 rounded-xl px-4 text-[14px] ${selected.includes(f.id) ? "bg-[#c2e7ff]" : "bg-[#f0f4f9] hover:bg-[#e1e5ea]"} ${dragOver === f.id ? "ring-2 ring-[#0b57d0]" : ""}`}>
                      <FileIcon f={f} size={22} />
                      <span className="min-w-0 flex-1 truncate font-medium">{f.name}</span>
                      <button type="button" aria-label={`More actions for ${f.name}`} onClick={(e) => ctx(f, e)} className="rounded-full p-1 hover:bg-black/5"><GIcon name="more" size={18} /></button>
                    </div>
                  ))}
                </div>
                {items.some((f) => f.kind !== "folder") && <h2 className="mb-2 text-[14px] font-medium text-[#1f1f1f]">Files</h2>}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                  {items.filter((f) => f.kind !== "folder").map((f) => (
                    <div key={f.id} role="row" aria-label={f.name} aria-selected={selected.includes(f.id)} {...dragProps(f)} onClick={(e) => select(f, e)} onDoubleClick={() => open(f)} onContextMenu={(e) => ctx(f, e)} className={`flex flex-col rounded-xl p-2 ${selected.includes(f.id) ? "bg-[#c2e7ff]" : "bg-[#f0f4f9] hover:bg-[#e1e5ea]"}`}>
                      <div className="flex items-center gap-2 px-2 pb-2 text-[14px] font-medium">
                        <FileIcon f={target(f)} size={20} />
                        <span className="min-w-0 flex-1 truncate">{f.name}</span>
                      </div>
                      <div className="flex h-28 items-center justify-center rounded-lg bg-white"><FileIcon f={target(f)} size={56} /></div>
                      <div className="flex items-center gap-2 px-2 pt-2 text-[12px] text-[#444746]">
                        <Avatar person={personOf(doc, f.owner) ?? me} size={20} />
                        <span className="truncate">{mine(f) ? "You" : ownerLabel(f)} {f.trashed ? "trashed" : "edited"} · {f.modified ?? "Oct 1"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <table className="w-full table-fixed text-[14px]" role="grid" aria-label="Files">
                <thead>
                  <tr className="h-12 border-b border-[#c7c7c7] text-left text-[14px] font-medium text-[#1f1f1f]">
                    <th className="pl-3 font-medium">Name</th>
                    <th className="w-[140px] font-medium">Owner</th>
                    <th className="w-[170px] font-medium">{loc === "trash" ? "Date trashed" : "Last modified"}</th>
                    <th className={`${loc === "storage" && !searching ? "" : "hidden lg:table-cell"} w-[110px] font-medium`}>{loc === "storage" && !searching ? "Storage used" : "File size"}</th>
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((f) => {
                    const isSel = selected.includes(f.id);
                    return (
                      <tr
                        key={f.id}
                        role="row"
                        aria-label={f.name}
                        aria-selected={isSel}
                        {...dragProps(f)}
                        onClick={(e) => select(f, e)}
                        onDoubleClick={() => open(f)}
                        onContextMenu={(e) => ctx(f, e)}
                        className={`h-12 cursor-default border-b border-[#e3e3e3] ${isSel ? "bg-[#c2e7ff]" : "hover:bg-[#e9eef6]"} ${dragOver === f.id ? "outline outline-2 outline-[#0b57d0]" : ""}`}
                      >
                        <td className="truncate pl-3">
                          <span className="flex min-w-0 items-center gap-4">
                            <span className="relative shrink-0">
                              <FileIcon f={target(f)} size={22} />
                              {f.kind === "shortcut" && <span className="absolute -bottom-1 -left-1 rounded-full bg-white text-[10px]">↪</span>}
                            </span>
                            <span className="truncate">{f.name}</span>
                            {f.sharing?.people?.length || (f.sharing?.access && f.sharing.access !== "Restricted") ? <GIcon name="people" size={16} color="#5f6368" /> : null}
                            {f.starred && <GIcon name="starFilled" size={16} color="#5f6368" />}
                          </span>
                        </td>
                        <td className="truncate">
                          <span className="flex items-center gap-2"><Avatar person={personOf(doc, f.owner) ?? me} size={24} /> <span className="truncate">{ownerLabel(f)}</span></span>
                        </td>
                        <td className="truncate text-[#444746]">{modifiedLabel(f)}</td>
                        <td className={`${loc === "storage" && !searching ? "" : "hidden lg:table-cell"} text-[#444746]`}>{f.kind === "folder" ? "—" : f.size ?? (surfaceOf(f.kind) ? "1 KB" : "—")}{f.trashed ? " (in trash)" : ""}</td>
                        <td>
                          <button type="button" aria-label={`More actions for ${f.name}`} onClick={(e) => ctx(f, e)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/10">
                            <GIcon name="more" size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {doc.drive?.details && <DetailsPane f={sel1 ?? (loc !== "root" ? fileOf(doc, loc) : undefined)} />}
      </div>

      {menu && (
        <Popup onClose={() => setMenu(null)}>
          {menu.kind === "new" ? (
            <MenuList entries={DRIVE_NEW} pos={menu.pos} width={300} onPick={(i) => { setMenu(null); if (i.action) g.act(i.action); else if (i.command) g.cmd(i.command, i.value); }} onClose={() => setMenu(null)} />
          ) : (
            <MenuList entries={menuFor()} pos={menu.pos} width={280} onPick={pick} onClose={() => setMenu(null)} />
          )}
        </Popup>
      )}
      {chipMenu && (
        <Popup onClose={() => setChipMenu(null)}>
          <MenuList
            entries={
              (chipMenu.chip === "type"
                ? Object.keys(CHIP_TYPES).map((t) => ({ label: t, value: `Type=${t}`, check: chips.type === t ? "on" : undefined }))
                : chipMenu.chip === "people"
                  ? owners.map((e) => ({ label: e === me.email ? `${me.name} (me)` : personOf(doc, e)?.name ?? e, value: `People=${e}`, check: chips.people === e ? "on" : undefined }))
                  : chipMenu.chip === "modified"
                    ? CHIP_MODIFIED.map((m) => ({ label: m, value: `Modified=${m}`, check: chips.modified === m ? "on" : undefined }))
                    : CHIP_LOCATIONS.map((l) => ({ label: l, value: `Location=${l}`, check: (chips.location ?? "Anywhere in Drive") === l ? "on" : undefined }))
              ).concat(chips[chipMenu.chip] ? [{ label: "Clear", value: `${chipMenu.chip === "type" ? "Type" : chipMenu.chip === "people" ? "People" : chipMenu.chip === "modified" ? "Modified" : "Location"}=`, check: undefined }] : [])
            }
            state={{ on: true }}
            pos={chipMenu.pos}
            width={220}
            onPick={(i) => { setChipMenu(null); g.cmd("g.filter", i.value); }}
            onClose={() => setChipMenu(null)}
          />
        </Popup>
      )}
      {doc.pane?.startsWith("preview:") && <Preview f={fileOf(doc, doc.pane.slice(8))} />}
    </div>
  );
}

function DetailsPane({ f }: { f?: GFile }) {
  const g = useG();
  const me = meOf(g.doc);
  const [tab, setTab] = useState<"Details" | "Activity">("Details");
  if (!f) {
    return (
      <aside className="mb-4 mr-4 flex w-[300px] shrink-0 flex-col rounded-2xl bg-white p-4 text-[14px]" onClick={(e) => e.stopPropagation()} aria-label="Details">
        <div className="mb-4 flex items-center"><span className="flex-1 text-[16px]" style={{ fontFamily: FONT }}>My Drive</span><IconBtn icon="close" label="Close details" onClick={() => g.cmd("g.details")} /></div>
        <p className="text-[#444746]">Select a file or folder to see its details.</p>
      </aside>
    );
  }
  const owner = personOf(g.doc, f.owner) ?? me;
  const people = f.sharing?.people ?? [];
  const parent = f.parent === "root" || !f.parent ? (f.owner && f.owner !== me.email ? "Shared with me" : "My Drive") : fileOf(g.doc, f.parent)?.name ?? "My Drive";
  return (
    <aside className="mb-4 mr-4 flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white text-[14px]" onClick={(e) => e.stopPropagation()} aria-label={`Details: ${f.name}`}>
      <div className="flex items-center gap-2 p-4">
        <FileIcon f={f} size={22} />
        <span className="min-w-0 flex-1 truncate text-[16px]" style={{ fontFamily: FONT }}>{f.name}</span>
        <IconBtn icon="close" label="Close details" onClick={() => g.cmd("g.details")} />
      </div>
      <div className="flex border-b border-[#e3e3e3] px-4">
        {(["Details", "Activity"] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`mr-6 border-b-[3px] pb-2 text-[14px] font-medium ${tab === t ? "border-[#0b57d0] text-[#0b57d0]" : "border-transparent text-[#444746]"}`}>{t}</button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        {tab === "Details" ? (
          <>
            <h3 className="mb-2 text-[14px] font-medium">Who has access</h3>
            <div className="mb-2 flex -space-x-1">
              <Avatar person={owner} size={30} ring />
              {people.map((p) => <Avatar key={p.email} person={personOf(g.doc, p.email) ?? { name: p.email }} size={30} ring />)}
            </div>
            <p className="mb-2 text-[12px] text-[#444746]">{people.length ? `Owned by ${owner.email === me.email ? "you" : owner.name}. Shared with ${people.map((p) => personOf(g.doc, p.email)?.name ?? p.email).join(", ")}.` : `Private to ${owner.email === me.email ? "you" : owner.name}`}{f.sharing?.access === "Anyone with the link" ? " Anyone with the link can open it." : f.sharing?.access === "Organization" ? ` Anyone at ${g.doc.org?.name ?? "your organization"} with the link can open it.` : ""}</p>
            <button type="button" onClick={() => g.act("share", f.id)} className="mb-5 rounded-full border border-[#747775] px-4 py-1.5 text-[14px] font-medium text-[#0b57d0] hover:bg-[#0b57d0]/10">Manage access</button>
            <h3 className="mb-2 text-[14px] font-medium">File details</h3>
            {[
              ["Type", TYPE_NAME[f.kind] ?? f.kind],
              ["Size", f.kind === "folder" ? "—" : f.size ?? "1 KB"],
              ["Location", parent],
              ["Owner", owner.email === me.email ? "me" : owner.name],
              ["Modified", `${f.modified ?? "Oct 1, 2026"} by ${f.modifiedBy && f.modifiedBy !== me.email ? personOf(g.doc, f.modifiedBy)?.name ?? f.modifiedBy : "me"}`],
              ["Created", "Oct 1, 2026"],
            ].map(([k, v]) => (
              <div key={k} className="mb-3"><div className="text-[12px] text-[#444746]">{k}</div><div>{v}</div></div>
            ))}
          </>
        ) : (
          <ul className="space-y-3 text-[13px]">
            <li><b>{f.modifiedBy && f.modifiedBy !== me.email ? personOf(g.doc, f.modifiedBy)?.name : "You"}</b> edited this item · {f.modified ?? "Oct 1"}</li>
            {people.map((p) => <li key={p.email}><b>{owner.email === me.email ? "You" : owner.name}</b> shared this item with {personOf(g.doc, p.email)?.name ?? p.email} as {p.role}</li>)}
            <li><b>{owner.email === me.email ? "You" : owner.name}</b> created this item · Oct 1, 2026</li>
          </ul>
        )}
      </div>
    </aside>
  );
}

function Preview({ f }: { f?: GFile }) {
  const g = useG();
  if (!f) return null;
  return (
    <div className="absolute inset-0 z-[110] flex flex-col bg-black/80 text-white" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`Preview: ${f.name}`}>
      <div className="flex h-14 items-center gap-3 px-3">
        <IconBtn icon="back" label="Close preview" color="#fff" onClick={() => g.cmd("g.pane", "")} />
        <FileIcon f={f} size={22} />
        <span className="flex-1 truncate text-[16px]">{f.name}</span>
        {(f.kind === "word" || f.kind === "excel" || f.kind === "powerpoint") && <button type="button" onClick={() => g.cmd("g.open", f.id)} className="rounded-full bg-white/15 px-4 py-2 text-[14px] hover:bg-white/25">Open with Google {f.kind === "word" ? "Docs" : f.kind === "excel" ? "Sheets" : "Slides"}</button>}
        <IconBtn icon="download" label="Download" color="#fff" onClick={() => g.cmd("g.drive.download", f.id)} />
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex h-full max-h-[420px] w-full max-w-[340px] flex-col items-center justify-center gap-3 rounded bg-white text-[#444746] shadow-2xl">
          <FileIcon f={f} size={72} />
          <span className="px-4 text-center text-[14px]">{f.name}</span>
          <span className="text-[12px]">{f.size ?? ""}</span>
        </div>
      </div>
    </div>
  );
}
