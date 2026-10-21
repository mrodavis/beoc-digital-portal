"use client";

import { useState } from "react";
import { FileIcon, OIcon, OneDriveLogo, SyncIcon } from "./icons";
import { childrenOf, isFolder, itemOf, selItems, TYPE_NAME } from "./model";
import type { OdItem, OdLocalFile, OneDriveDoc } from "./types";
import { Btn, BRAND, Modal, Toggle, useOd, type MenuItem } from "./ui";

const WIN_FONT = "'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif";
const LOCAL = ["Desktop", "Documents", "Pictures"] as const;
type LocalKey = (typeof LOCAL)[number];

export function odLabel(doc: OneDriveDoc) {
  return doc.account === "work" ? `OneDrive - ${doc.org?.name ?? "Work"}` : "OneDrive - Personal";
}

function backupFolder(doc: OneDriveDoc, key: LocalKey): OdItem | undefined {
  return childrenOf(doc, "root").find((i) => i.kind === "folder" && i.name === key && !i.shortcutTo);
}

/** File Explorer on the PC, with the OneDrive folder, plus the taskbar and the OneDrive activity center. */
export function ExplorerView() {
  const ctx = useOd();
  const { doc, ui } = ctx;
  const pc = doc.pc ?? {};
  const loc = pc.location ?? "onedrive";
  const [fly, setFly] = useState(false);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameText, setRenameText] = useState("");
  const [creating, setCreating] = useState<{ kind: "folder" | "word"; name: string } | null>(null);
  const label = odLabel(doc);
  const sel = selItems(ui.selection);
  const errors = doc.items.filter((i) => i.sync === "error" && !i.deleted && !i.purged);

  // What the current location shows.
  let odFolder: string | null = null;
  let localKey: LocalKey | null = null;
  let crumbs: { label: string; loc: string }[] = [];
  if (loc === "onedrive") {
    odFolder = "root";
    crumbs = [{ label, loc: "onedrive" }];
  } else if ((LOCAL as readonly string[]).includes(loc)) {
    localKey = loc as LocalKey;
    if (pc.backup?.[localKey]) {
      odFolder = backupFolder(doc, localKey)?.id ?? null;
      crumbs = [{ label, loc: "onedrive" }, { label: loc, loc }];
    } else crumbs = [{ label: loc, loc }];
  } else if (loc === "This PC") {
    crumbs = [{ label: "This PC", loc }];
  } else {
    const f = itemOf(doc, loc);
    if (f) {
      odFolder = f.shortcutTo ?? f.id;
      const chain: OdItem[] = [];
      let cur: OdItem | undefined = f;
      while (cur && cur.parent && cur.parent !== "root") {
        chain.unshift(cur);
        cur = itemOf(doc, cur.parent);
      }
      if (cur) chain.unshift(cur);
      crumbs = [{ label, loc: "onedrive" }, ...chain.map((c) => ({ label: c.name, loc: c.id }))];
    }
  }
  const odItems = odFolder ? childrenOf(doc, odFolder).filter((i) => !(i.kind === "vault" && doc.account !== "personal")) : [];
  const localItems: OdLocalFile[] = localKey && !pc.backup?.[localKey] ? pc.local?.[localKey] ?? [] : [];
  const isOd = odFolder !== null;

  const nav = (l: string) => {
    setRenaming(null);
    ctx.cmd("od.exp.nav", l);
  };
  const open = (it: OdItem) => {
    if (isFolder(it)) {
      if (it.kind === "vault" && doc.vault?.locked !== false) {
        ctx.open({ kind: "vault" });
        return;
      }
      nav(it.shortcutTo ?? it.id);
    } else ctx.cmd("od.open", it.id);
  };
  const select = (it: OdItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      const s = new Set(sel);
      if (s.has(it.id)) s.delete(it.id);
      else s.add(it.id);
      ctx.onSelect({ selection: Array.from(s).map((x) => `item:${x}`).join(",") });
    } else ctx.onSelect({ selection: `item:${it.id}` });
  };
  const startRename = (it: OdItem) => {
    setRenaming(it.id);
    setRenameText(it.name);
  };
  const finishRename = (it: OdItem) => {
    const n = renameText.trim();
    setRenaming(null);
    if (n && n !== it.name) ctx.commit("od.rename", { file: it.id, name: n });
  };
  const menuFor = (it: OdItem, ids: string[]): MenuItem[] => {
    const file = !isFolder(it);
    const many = ids.length > 1;
    const list = [...ids].sort().join(",");
    const items: MenuItem[] = [{ label: "Open", icon: "open", onClick: () => open(it) }];
    if (it.kind !== "vault") {
      items.push(
        { sep: true },
        { label: "Share", icon: "share", disabled: many, onClick: () => ctx.open({ kind: "share", file: it.id }) },
        { label: "Manage access", icon: "people", disabled: many || Boolean(it.shortcutTo), onClick: () => ctx.open({ kind: "manage", file: it.id }) },
        { label: "View online", icon: "globe", onClick: () => ctx.cmd("od.go", file ? it.parent ?? "root" : it.shortcutTo ?? it.id) },
        { label: "Version history", icon: "history", disabled: !file || many, onClick: () => ctx.open({ kind: "versions", file: it.id }) },
        { sep: true },
        { label: "Always keep on this device", icon: "cloud", check: it.sync === "always", onClick: () => ctx.commit("od.keep", { file: list }) },
        { label: "Free up space", icon: "cloud", onClick: () => ctx.commit("od.free", { file: list }) },
      );
    }
    items.push({ sep: true }, { label: "Rename", icon: "rename", disabled: many, onClick: () => startRename(it) }, { label: "Delete", icon: "delete", onClick: () => ctx.commit("od.delete", { file: list }) });
    return items;
  };
  const ctxMenu = (it: OdItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let ids = sel;
    if (!sel.includes(it.id)) {
      ids = [it.id];
      ctx.onSelect({ selection: `item:${it.id}` });
    }
    ctx.menu(e, menuFor(it, ids));
  };
  const statusText = (it?: OdItem) =>
    !it ? "" : it.sync === "always" ? "Always available on this device" : it.sync === "local" ? "Available on this device" : it.sync === "error" ? "Sync problem" : it.sync === "syncing" ? "Sync pending" : "Available when online";

  const navItem = (l: string, text: string, icon: React.ReactNode, depth = 0) => (
    <button key={l} type="button" aria-label={text} aria-current={loc === l ? "page" : undefined} onClick={() => nav(l)} className={`flex h-7 w-full items-center gap-2 rounded pr-2 text-left text-[12px] ${loc === l ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`} style={{ paddingLeft: 8 + depth * 14 }}>
      {icon}
      <span className="truncate">{text}</span>
    </button>
  );

  return (
    <div className="relative flex h-full flex-col bg-[#c9d6e3]" style={{ fontFamily: WIN_FONT }} onClick={() => setFly(false)}>
      {/* Window */}
      <div className="m-2 mb-1 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#a0a0a0] bg-[#f3f3f3] shadow-xl" onClick={() => ctx.onSelect({ selection: "" })}>
        <div className="flex h-9 shrink-0 items-end bg-[#e8e8e8] pl-2">
          <div className="flex h-8 max-w-[300px] items-center gap-2 rounded-t-md bg-[#f9f9f9] px-3 text-[12px]">
            {isOd ? <OneDriveLogo size={14} /> : <OIcon name="folder" size={14} color="#c89b2a" />}
            <span className="truncate">{crumbs[crumbs.length - 1]?.label ?? "File Explorer"}</span>
          </div>
          <span className="mb-2 ml-2 text-[14px] text-[#616161]">+</span>
          <span className="flex-1" />
          <span className="flex h-9 w-11 items-center justify-center"><OIcon name="minimize" size={12} /></span>
          <span className="flex h-9 w-11 items-center justify-center"><OIcon name="maximize" size={11} /></span>
          <span className="flex h-9 w-11 items-center justify-center"><OIcon name="close" size={12} /></span>
        </div>
        <div className="flex h-11 shrink-0 items-center gap-1 border-b border-[#e0e0e0] bg-[#f9f9f9] px-2 text-[12px]" onClick={(e) => e.stopPropagation()}>
          <button type="button" aria-label="New" disabled={!isOd} onClick={(e) => ctx.menu(e, [{ label: "Folder", icon: "folder", onClick: () => setCreating({ kind: "folder", name: "New folder" }) }, { label: "Microsoft Word Document", icon: "documents", onClick: () => setCreating({ kind: "word", name: "New Microsoft Word Document" }) }])} className="flex h-8 items-center gap-1 rounded px-2 hover:bg-[#e8e8e8] disabled:opacity-40">
            <OIcon name="plus" size={15} color={BRAND} /> New <OIcon name="chevronDown" size={10} />
          </button>
          <span className="mx-1 h-6 border-l border-[#d1d1d1]" />
          {[
            { icon: "copy", label: "Copy" },
            { icon: "rename", label: "Rename", on: () => { const it = itemOf(doc, sel[0]); if (it && sel.length === 1) startRename(it); } },
            { icon: "share", label: "Share", on: () => { const it = itemOf(doc, sel[0]); if (it && sel.length === 1) ctx.open({ kind: "share", file: it.id }); } },
            { icon: "delete", label: "Delete", on: () => { if (sel.length) ctx.commit("od.delete", { file: [...sel].sort().join(",") }); } },
          ].map((b) => (
            <button key={b.label} type="button" aria-label={b.label} title={b.label} disabled={!sel.length} onClick={b.on} className="flex h-8 w-8 items-center justify-center rounded hover:bg-[#e8e8e8] disabled:opacity-40">
              <OIcon name={b.icon} size={16} />
            </button>
          ))}
          <span className="mx-1 h-6 border-l border-[#d1d1d1]" />
          <span className="flex h-8 items-center gap-1 rounded px-2 text-[#424242]"><OIcon name="sort" size={15} /> Sort</span>
          <span className="flex h-8 items-center gap-1 rounded px-2 text-[#424242]"><OIcon name="list" size={15} /> View</span>
        </div>
        <div className="flex h-10 shrink-0 items-center gap-2 bg-[#f9f9f9] px-2 text-[12px]" onClick={(e) => e.stopPropagation()}>
          <OIcon name="back" size={14} color="#616161" />
          <OIcon name="forward" size={14} color="#bdbdbd" />
          <button type="button" aria-label="Up" onClick={() => { if (crumbs.length > 1) nav(crumbs[crumbs.length - 2].loc); }} className="rounded p-1 hover:bg-[#e8e8e8]"><OIcon name="upload" size={14} color="#616161" /></button>
          <div className="flex h-7 min-w-0 flex-1 items-center gap-1 rounded border border-[#d1d1d1] bg-white px-2" aria-label="Address bar">
            {isOd && <OneDriveLogo size={14} />}
            {crumbs.map((c, i) => (
              <span key={c.loc} className="flex min-w-0 items-center gap-1">
                {i > 0 && <OIcon name="chevronRight" size={11} color="#616161" />}
                <button type="button" onClick={() => nav(c.loc)} className="truncate rounded px-1 hover:bg-[#e5f1fb]">{c.label}</button>
              </span>
            ))}
          </div>
          <div className="flex h-7 w-48 items-center gap-1 rounded border border-[#d1d1d1] bg-white px-2 text-[#616161]">
            <OIcon name="search" size={13} color="#616161" /> <span className="truncate">Search {crumbs[crumbs.length - 1]?.label}</span>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 bg-white">
          <nav aria-label="Navigation pane" className="w-52 shrink-0 overflow-y-auto border-r border-[#e8e8e8] bg-[#f9f9f9] py-2 pl-1 pr-1" onClick={(e) => e.stopPropagation()}>
            {navItem("Home", "Home", <OIcon name="home" size={14} color="#616161" />)}
            {navItem("onedrive", label, <OneDriveLogo size={15} />)}
            {childrenOf(doc, "root")
              .filter((i) => isFolder(i) && !(i.kind === "vault" && doc.account !== "personal"))
              .map((f) => navItem(f.shortcutTo ?? f.id, f.name, <FileIcon kind={f.kind} size={14} shortcut={Boolean(f.shortcutTo)} />, 1))}
            <div className="my-2 border-t border-[#e0e0e0]" />
            {LOCAL.map((l) => navItem(l, l, <OIcon name={l === "Desktop" ? "desktop" : l === "Pictures" ? "pictures" : "documents"} size={14} color={l === "Desktop" ? "#0f6cbd" : "#616161"} />))}
            <div className="my-2 border-t border-[#e0e0e0]" />
            {navItem("This PC", "This PC", <OIcon name="pc" size={14} color="#616161" />)}
          </nav>
          <div className="flex min-w-0 flex-1 flex-col" onClick={() => ctx.onSelect({ selection: "" })}>
            {loc === "This PC" || loc === "Home" ? (
              <div className="p-4 text-[12px]">
                <div className="mb-2 font-semibold">Devices and drives</div>
                <div className="flex w-72 items-center gap-3 rounded border border-[#e0e0e0] p-3">
                  <OIcon name="pc" size={28} color="#616161" />
                  <div className="flex-1">
                    <div>Local Disk (C:)</div>
                    <div className="my-1 h-2 rounded bg-[#e0e0e0]"><div className="h-2 rounded bg-[#0f6cbd]" style={{ width: "62%" }} /></div>
                    <div className="text-[#616161]">{pc.free ?? "181 GB"} free of 476 GB</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-auto">
                <div className="sticky top-0 flex h-8 items-center border-b border-[#e8e8e8] bg-white px-3 text-[12px] text-[#424242]">
                  <span className="min-w-0 flex-[2.4]">Name</span>
                  {isOd && <span className="w-16 shrink-0">Status</span>}
                  <span className="min-w-0 flex-1">Date modified</span>
                  <span className="min-w-0 flex-1">Type</span>
                  <span className="w-20 shrink-0 text-right">Size</span>
                </div>
                {creating && odFolder && (
                  <div className="flex h-7 items-center bg-[#cce4f7] px-3 text-[12px]" onClick={(e) => e.stopPropagation()}>
                    <span className="flex min-w-0 flex-[2.4] items-center gap-2">
                      <FileIcon kind={creating.kind === "folder" ? "folder" : "word"} size={16} />
                      <input
                        aria-label={creating.kind === "folder" ? "New folder name" : "New document name"}
                        autoFocus
                        value={creating.name}
                        onFocus={(e) => e.currentTarget.select()}
                        onChange={(e) => setCreating({ ...creating, name: e.target.value })}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === "Escape") setCreating(null);
                          if (e.key === "Enter") {
                            const n = creating.name.trim();
                            if (!n) return;
                            if (creating.kind === "folder") ctx.commit("od.newFolder", { parent: odFolder, name: n });
                            else ctx.commit("od.newFile", { folder: odFolder, kind: "Word document", name: /\.docx$/i.test(n) ? n : `${n}.docx` });
                            setCreating(null);
                          }
                        }}
                        className="h-6 min-w-0 flex-1 border border-[#0f6cbd] px-1 outline-none"
                      />
                    </span>
                    <span className="w-16 shrink-0" />
                    <span className="min-w-0 flex-1 text-[#616161]">Press Enter to finish</span>
                  </div>
                )}
                {odItems.map((it) => {
                  const on = sel.includes(it.id);
                  return (
                    <div
                      key={it.id}
                      role="row"
                      aria-label={it.name}
                      aria-selected={on}
                      onClick={(e) => select(it, e)}
                      onDoubleClick={() => open(it)}
                      onContextMenu={(e) => ctxMenu(it, e)}
                      onKeyDown={(e) => { if (e.key === "F2") startRename(it); }}
                      tabIndex={0}
                      className={`flex h-7 cursor-default items-center px-3 text-[12px] outline-none ${on ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}
                    >
                      <span className="flex min-w-0 flex-[2.4] items-center gap-2">
                        <FileIcon kind={it.kind} size={16} shortcut={Boolean(it.shortcutTo)} />
                        {renaming === it.id ? (
                          <input
                            aria-label="Rename"
                            autoFocus
                            value={renameText}
                            onChange={(e) => setRenameText(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                              if (e.key === "Enter") finishRename(it);
                              if (e.key === "Escape") setRenaming(null);
                            }}
                            onBlur={() => finishRename(it)}
                            className="h-6 min-w-0 flex-1 border border-[#0f6cbd] px-1 outline-none"
                          />
                        ) : (
                          <span className="truncate">{it.name}</span>
                        )}
                      </span>
                      <span className="flex w-16 shrink-0 items-center" title={statusText(it)}>{it.kind !== "vault" && <SyncIcon status={it.sync ?? "cloud"} size={14} />}</span>
                      <span className="min-w-0 flex-1 truncate text-[#616161]">{it.modified ?? ""}</span>
                      <span className="min-w-0 flex-1 truncate text-[#616161]">{isFolder(it) ? "File folder" : TYPE_NAME[it.kind]}</span>
                      <span className="w-20 shrink-0 text-right text-[#616161]">{isFolder(it) ? "" : it.size ?? ""}</span>
                    </div>
                  );
                })}
                {localItems.map((f) => (
                  <div key={f.name} role="row" aria-label={f.name} className="flex h-7 cursor-default items-center px-3 text-[12px] hover:bg-[#e5f1fb]">
                    <span className="flex min-w-0 flex-[2.4] items-center gap-2"><FileIcon kind={f.folder ? "folder" : "text"} size={16} /> <span className="truncate">{f.name}</span></span>
                    <span className="min-w-0 flex-1 truncate text-[#616161]">{f.modified ?? "10/14/2026 9:12 AM"}</span>
                    <span className="min-w-0 flex-1 truncate text-[#616161]">{f.folder ? "File folder" : "File"}</span>
                    <span className="w-20 shrink-0 text-right text-[#616161]">{f.size ?? ""}</span>
                  </div>
                ))}
                {!odItems.length && !localItems.length && <p className="p-6 text-center text-[12px] text-[#616161]">This folder is empty.</p>}
              </div>
            )}
            <div className="flex h-6 shrink-0 items-center gap-3 border-t border-[#e8e8e8] px-3 text-[11px] text-[#616161]">
              <span>{odItems.length + localItems.length} items</span>
              {sel.length > 0 && <span>{sel.length} item{sel.length === 1 ? "" : "s"} selected</span>}
              {sel.length === 1 && isOd && <span>Status: {statusText(itemOf(doc, sel[0]))}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <div className="flex h-11 shrink-0 items-center border-t border-[#b8c4d0] bg-[#eef2f6]/95 px-2" onClick={(e) => e.stopPropagation()}>
        <span className="flex-1" />
        <div className="flex items-center gap-1">
          <span className="flex h-9 w-9 items-center justify-center rounded" title="Start"><OIcon name="waffle" size={16} color="#0f6cbd" /></span>
          <span className="flex h-9 w-9 items-center justify-center rounded" title="Search"><OIcon name="search" size={16} /></span>
          <button type="button" aria-label="File Explorer" title="File Explorer" onClick={() => ctx.cmd("od.surface", "explorer")} className="flex h-9 w-9 items-center justify-center rounded bg-white/70"><OIcon name="folder" size={18} color="#c89b2a" /></button>
          <button type="button" aria-label="Microsoft Edge" title="Microsoft Edge" onClick={() => ctx.cmd("od.surface", "web")} className="flex h-9 w-9 items-center justify-center rounded hover:bg-white/60"><OIcon name="globe" size={18} color="#0f6cbd" /></button>
        </div>
        <span className="flex-1" />
        <button
          type="button"
          aria-label={pc.paused ? "OneDrive - Syncing paused" : errors.length ? "OneDrive - Sync issue" : "OneDrive - Up to date"}
          title={pc.paused ? "OneDrive - Syncing paused" : errors.length ? "OneDrive - Sync issue" : "OneDrive - Up to date"}
          onClick={(e) => { e.stopPropagation(); setFly((f) => !f); }}
          onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); ctx.menu(e, settingsMenu(ctx, doc)); }}
          className="relative flex h-9 w-9 items-center justify-center rounded hover:bg-white/60"
        >
          <OneDriveLogo size={20} mono={doc.account === "work" ? "#0f6cbd" : "#424242"} />
          {pc.paused ? <span className="absolute bottom-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#424242]"><OIcon name="pause" size={8} color="#fff" strokeWidth={2.4} /></span> : errors.length ? <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-[#c50f1f]" /> : null}
        </button>
        <span className="ml-1 flex items-center gap-1 px-1 text-[#424242]"><OIcon name="globe" size={14} /></span>
        <span className="ml-2 text-right text-[11px] leading-tight text-[#242424]">10:42 AM<br />10/21/2026</span>
      </div>

      {fly && <ActivityCenter onClose={() => setFly(false)} />}
    </div>
  );
}

function settingsMenu(ctx: ReturnType<typeof useOd>, doc: OneDriveDoc): MenuItem[] {
  const paused = Boolean(doc.pc?.paused);
  return [
    { label: "Settings", icon: "gear", onClick: () => ctx.open({ kind: "odSettings" }) },
    paused
      ? { label: "Resume syncing", icon: "play", onClick: () => ctx.commit("od.resume", {}) }
      : {
          label: "Pause syncing",
          icon: "pause",
          sub: [2, 8, 24].map((h) => ({ label: `${h} hours`, onClick: () => ctx.commit("od.pause", { hours: h }) })),
        },
    { sep: true },
    { label: "Quit OneDrive", icon: "close", disabled: true },
  ];
}

function ActivityCenter({ onClose }: { onClose: () => void }) {
  const ctx = useOd();
  const { doc } = ctx;
  const pc = doc.pc ?? {};
  const errors = doc.items.filter((i) => i.sync === "error" && !i.deleted && !i.purged);
  const recent = doc.items.filter((i) => !i.deleted && !i.purged && !isFolder(i) && (i.modified === "A few seconds ago" || i.sync === "syncing")).slice(0, 4);
  return (
    <div role="dialog" aria-label="OneDrive activity center" className="absolute bottom-12 right-16 z-[100] w-[340px] rounded-lg border border-[#c8c8c8] bg-[#f9f9f9] shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-2 border-b border-[#e0e0e0] px-3 py-2.5">
        <OneDriveLogo size={20} />
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">{odLabel(doc)}</span>
        <button type="button" aria-label="Open folder" title="Open folder" onClick={() => { onClose(); ctx.cmd("od.exp.nav", "onedrive"); }} className="rounded p-1.5 hover:bg-[#e8e8e8]"><OIcon name="folder" size={16} /></button>
        <button type="button" aria-label="View online" title="View online" onClick={() => { onClose(); ctx.cmd("od.go", "root"); }} className="rounded p-1.5 hover:bg-[#e8e8e8]"><OIcon name="globe" size={16} /></button>
        <button type="button" aria-label="Help & Settings" title="Help & Settings" onClick={(e) => ctx.menu(e, settingsMenu(ctx, doc))} className="rounded p-1.5 hover:bg-[#e8e8e8]"><OIcon name="gear" size={16} /></button>
      </div>
      {pc.paused ? (
        <button type="button" aria-label="Resume syncing" onClick={() => ctx.commit("od.resume", {})} className="flex w-full items-center gap-2 bg-[#fff4ce] px-3 py-2 text-left text-[12px] hover:bg-[#ffecb3]">
          <OIcon name="pause" size={14} /> <span className="flex-1">Syncing is paused for {pc.paused} hours. Select to resume.</span>
        </button>
      ) : errors.length ? (
        <div className="bg-[#fde7e9] px-3 py-2 text-[12px]">
          <div className="mb-1 font-semibold text-[#c50f1f]">{errors.length} sync issue{errors.length === 1 ? "" : "s"}</div>
          {errors.map((e) => (
            <button key={e.id} type="button" aria-label={`Sync issue: ${e.name}`} onClick={() => { onClose(); ctx.cmd("od.exp.nav", e.parent && e.parent !== "root" ? e.parent : "onedrive"); }} className="mb-1 flex w-full items-start gap-2 rounded p-1 text-left hover:bg-[#f9d0d4]">
              <OIcon name="error" size={14} color="#c50f1f" />
              <span><span className="block font-semibold">{e.name}</span><span className="block text-[#424242]">{e.syncError ?? "This item can't sync."}</span></span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-3 text-[12px]"><OIcon name="check" size={14} color="#107c10" /> Your files are synced</div>
      )}
      <div className="max-h-40 overflow-auto px-2 pb-2">
        {recent.map((r) => (
          <div key={r.id} className="flex items-center gap-2 rounded px-1 py-1.5 text-[12px]">
            <FileIcon kind={r.kind} size={18} />
            <span className="min-w-0 flex-1"><span className="block truncate">{r.name}</span><span className="block text-[11px] text-[#616161]">{pc.paused ? "Waiting to sync" : "Uploaded to OneDrive"}</span></span>
          </div>
        ))}
      </div>
      <div className="border-t border-[#e0e0e0] px-3 py-2 text-[11px] text-[#616161]">{doc.storage ? `${doc.storage.used} of ${doc.storage.total} used` : doc.account === "work" ? "21.4 GB of 1 TB used" : "1.2 GB of 5 GB used"}</div>
    </div>
  );
}

/** OneDrive settings window: Sync and backup (Manage backup, Files On-Demand), Account. */
export function OdSettings({ startTab }: { startTab?: string }) {
  const ctx = useOd();
  const { doc } = ctx;
  const [tab, setTab] = useState(startTab ?? "Sync and backup");
  const [adv, setAdv] = useState(false);
  const [confirm, setConfirm] = useState<"Free up disk space" | "Download all files" | null>(null);
  const close = () => ctx.open(null);
  return (
    <Modal title="OneDrive settings" label="OneDrive settings" onClose={close} width={620}>
      <div className="flex min-h-[320px] gap-4" style={{ fontFamily: WIN_FONT }}>
        <nav className="w-40 shrink-0" aria-label="Settings pages">
          {["Sync and backup", "Account", "Notifications", "About"].map((t) => (
            <button key={t} type="button" aria-current={tab === t ? "page" : undefined} onClick={() => setTab(t)} className={`mb-1 flex h-8 w-full items-center rounded px-2 text-left text-[13px] ${tab === t ? "bg-[#ebebeb] font-semibold" : "hover:bg-[#f5f5f5]"}`}>{t}</button>
          ))}
        </nav>
        <div className="min-w-0 flex-1 text-[13px]">
          {tab === "Sync and backup" && (
            <>
              <div className="mb-3 flex items-center gap-3 rounded-md border border-[#e0e0e0] p-3">
                <div className="flex-1">
                  <div className="font-semibold">Back up important PC folders to OneDrive</div>
                  <div className="text-[12px] text-[#616161]">Back up your Desktop, Documents and Pictures folders so they&apos;re protected and available on other devices.</div>
                </div>
                <Btn kind="primary" onClick={() => ctx.open({ kind: "backup" })}>Manage backup</Btn>
              </div>
              <div className="mb-3 flex items-center gap-3 rounded-md border border-[#e0e0e0] p-3">
                <div className="flex-1">
                  <div className="font-semibold">Pause syncing</div>
                  <div className="text-[12px] text-[#616161]">{doc.pc?.paused ? `Paused for ${doc.pc.paused} hours` : "Syncing is on"}</div>
                </div>
                {doc.pc?.paused ? <Btn onClick={() => ctx.commit("od.resume", {})}>Resume syncing</Btn> : <Btn onClick={(e) => ctx.menu(e, [2, 8, 24].map((h) => ({ label: `${h} hours`, onClick: () => ctx.commit("od.pause", { hours: h }) })))}>Pause</Btn>}
              </div>
              <button type="button" aria-expanded={adv} onClick={() => setAdv((a) => !a)} className="mb-2 flex w-full items-center gap-2 rounded-md border border-[#e0e0e0] p-3 text-left font-semibold hover:bg-[#f5f5f5]">
                <OIcon name={adv ? "chevronDown" : "chevronRight"} size={14} /> Advanced settings
              </button>
              {adv && (
                <div className="rounded-md border border-[#e0e0e0] p-3">
                  <div className="mb-1 font-semibold">Files On-Demand</div>
                  <p className="mb-3 text-[12px] text-[#616161]">Save space on this device by making files online-only. Online-only files open when you&apos;re connected to the internet.</p>
                  <div className="flex gap-2">
                    <Btn kind={doc.pc?.fod === "Download all files" ? "secondary" : "primary"} onClick={() => setConfirm("Free up disk space")}>Free up disk space</Btn>
                    <Btn onClick={() => setConfirm("Download all files")}>Download all files</Btn>
                  </div>
                </div>
              )}
            </>
          )}
          {tab === "Account" && (
            <div className="rounded-md border border-[#e0e0e0] p-3">
              <div className="font-semibold">{doc.me.name}</div>
              <div className="mb-2 text-[12px] text-[#616161]">{doc.me.email}</div>
              <div className="text-[12px]">{odLabel(doc)}</div>
              <div className="text-[12px] text-[#616161]">{doc.storage ? `${doc.storage.used} of ${doc.storage.total} used` : doc.account === "work" ? "21.4 GB of 1 TB used" : "1.2 GB of 5 GB used"}</div>
            </div>
          )}
          {tab === "Notifications" && <p className="text-[#616161]">Choose which OneDrive notifications you get on this PC.</p>}
          {tab === "About" && <p className="text-[#616161]">Microsoft OneDrive</p>}
        </div>
      </div>
      {confirm && (
        <div className="absolute inset-0 z-[130] flex items-center justify-center bg-black/30">
          <div role="alertdialog" aria-label={confirm} className="w-[380px] rounded-lg bg-white p-5 shadow-2xl">
            <h3 className="mb-2 text-[16px] font-semibold">{confirm}?</h3>
            <p className="mb-4 text-[13px] text-[#424242]">{confirm === "Free up disk space" ? "Files you aren't using will become online-only. They'll still appear in File Explorer and download when you open them." : "Every file in your OneDrive will download to this device and take up space on it."}</p>
            <div className="flex justify-end gap-2">
              <Btn kind="primary" onClick={() => { ctx.commit("od.fod", { action: confirm }); setConfirm(null); }}>Continue</Btn>
              <Btn onClick={() => setConfirm(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export function BackupDialog() {
  const ctx = useOd();
  const { doc } = ctx;
  const cur = doc.pc?.backup ?? {};
  const [v, setV] = useState({ Desktop: Boolean(cur.Desktop), Documents: Boolean(cur.Documents), Pictures: Boolean(cur.Pictures) });
  const close = () => ctx.open({ kind: "odSettings" });
  const changed = LOCAL.some((k) => v[k] !== Boolean(cur[k]));
  return (
    <Modal title="Back up folders on this PC" label="Manage backup" onClose={close} width={460} footer={<><Btn kind="primary" disabled={!changed} onClick={() => { ctx.commit("od.backup", { Desktop: v.Desktop, Documents: v.Documents, Pictures: v.Pictures }); ctx.open({ kind: "odSettings" }); }}>Save changes</Btn><Btn onClick={close}>Cancel</Btn></>}>
      <p className="mb-3 text-[13px] text-[#616161]">Folders you back up sync to OneDrive. New and existing files are added to OneDrive, backed up, and available on your other devices.</p>
      {LOCAL.map((k) => {
        const files = doc.pc?.local?.[k] ?? [];
        return (
          <div key={k} className="mb-2 flex items-center gap-3 rounded-md border border-[#e0e0e0] p-3">
            <OIcon name={k === "Desktop" ? "desktop" : k === "Pictures" ? "pictures" : "documents"} size={22} color={BRAND} />
            <div className="flex-1">
              <div className="text-[14px] font-semibold">{k}</div>
              <div className="text-[12px] text-[#616161]">{cur[k] ? "Backed up" : `Not backed up · ${files.length} item${files.length === 1 ? "" : "s"}`}</div>
            </div>
            <Toggle label={`Back up ${k}`} on={v[k]} onChange={(on) => setV({ ...v, [k]: on })} />
          </div>
        );
      })}
    </Modal>
  );
}
