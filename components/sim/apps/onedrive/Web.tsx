"use client";

import { useState } from "react";
import { FileIcon, OIcon, OneDriveLogo } from "./icons";
import {
  ancestors, childrenOf, hasSharing, inVault, isFolder, isMine, itemOf, live, locationLabel, nameOf, personOf, selItems, sharingLabel, TYPE_NAME,
} from "./model";
import type { OdItem, OneDriveDoc } from "./types";
import { Avatar, Btn, BRAND, CmdBtn, FONT, useOd, type MenuItem, type OdCtxValue } from "./ui";
import { RestoreView } from "./Panels";

/* ------------------------------------------------------------------ */
/* Item actions shared by the command bar, the … button and right-click */
/* ------------------------------------------------------------------ */

export function itemMenu(ctx: OdCtxValue, it: OdItem, sel: string[]): MenuItem[] {
  const { doc } = ctx;
  const multi = sel.length > 1;
  const ids = multi ? sel : [it.id];
  const mine = isMine(doc, it);
  const folder = isFolder(it);
  const work = doc.account === "work";
  if (it.deleted) {
    return [
      { label: "Restore", icon: "restore", onClick: () => ctx.commit("od.restore", { file: [...ids].sort().join(",") }) },
      { label: "Delete", icon: "delete", onClick: () => ctx.open({ kind: "purge", files: ids }) },
    ];
  }
  if (it.kind === "vault") {
    return [{ label: "Open", icon: "open", onClick: () => openItem(ctx, it) }];
  }
  if (it.shortcutTo) {
    return [
      { label: "Open", icon: "open", onClick: () => openItem(ctx, it) },
      { label: "Remove shortcut from My files", icon: "delete", onClick: () => ctx.commit("od.removeShortcut", { file: it.id }) },
      { label: "Details", icon: "info", onClick: () => ctx.cmd("od.details", "on") },
    ];
  }
  const items: MenuItem[] = [];
  if (!multi) {
    if (folder) items.push({ label: "Open", icon: "open", onClick: () => openItem(ctx, it) });
    else
      items.push({
        label: "Open",
        icon: "open",
        sub: [
          { label: "Open in browser", icon: "globe", onClick: () => ctx.cmd("od.open", it.id) },
          { label: "Open in app", icon: "open", onClick: () => openInApp(ctx, it) },
        ],
      });
  }
  if (!multi || !work) items.push({ label: "Share", icon: "share", onClick: () => ctx.open({ kind: "share", file: it.id }) });
  if (!multi) items.push({ label: "Copy link", icon: "link", onClick: () => ctx.open({ kind: "copylink", file: it.id }) });
  if (!multi && mine) items.push({ label: "Manage access", icon: "people", onClick: () => ctx.open({ kind: "manage", file: it.id }) });
  if (!multi && !mine && folder && (it.parent === undefined || it.parent.startsWith("lib:")) && !ctx.doc.items.some((x) => x.shortcutTo === it.id))
    items.push({ label: "Add shortcut to My files", icon: "shortcut", onClick: () => ctx.commit("od.shortcut", { file: it.id }) });
  if (!multi && work) items.push(it.favorite ? { label: "Remove from favorites", icon: "star", onClick: () => ctx.commit("od.favorite", { file: it.id, on: false }) } : { label: "Add to favorites", icon: "star", onClick: () => ctx.commit("od.favorite", { file: it.id, on: true }) });
  items.push({ label: "Download", icon: "download", onClick: () => ctx.commit("od.download", { file: it.id }) });
  if (mine) {
    items.push({ label: "Delete", icon: "delete", onClick: () => ctx.open({ kind: "delete", files: ids }) });
    items.push({ label: "Move to", icon: "move", onClick: () => ctx.open({ kind: "pick", files: ids, mode: "move" }) });
    items.push({ label: "Copy to", icon: "copy", onClick: () => ctx.open({ kind: "pick", files: ids, mode: "copy" }) });
    if (!multi) items.push({ label: "Rename", icon: "rename", onClick: () => ctx.open({ kind: "rename", file: it.id }) });
  } else items.push({ label: "Copy to", icon: "copy", onClick: () => ctx.open({ kind: "pick", files: ids, mode: "copy" }) });
  if (!multi && !folder) items.push({ label: "Version history", icon: "history", onClick: () => ctx.open({ kind: "versions", file: it.id }) });
  if (!multi) items.push({ label: "Details", icon: "info", onClick: () => ctx.cmd("od.details", "on") });
  return items;
}

export function openItem(ctx: OdCtxValue, it: OdItem) {
  if (it.deleted) return;
  if (it.kind === "vault" && ctx.doc.vault?.locked !== false) {
    ctx.open({ kind: "vault" });
    return;
  }
  if (isFolder(it)) ctx.cmd("od.go", it.shortcutTo ?? it.id);
  else ctx.cmd("od.open", it.id);
}

function openInApp(ctx: OdCtxValue, it: OdItem) {
  ctx.cmd("od.openApp", it.id);
}

/* ------------------------------------------------------------------ */
/* Browser frame                                                       */
/* ------------------------------------------------------------------ */

export function urlFor(doc: OneDriveDoc): string {
  const loc = doc.view?.location ?? "root";
  if (doc.account === "personal") {
    const base = "onedrive.live.com";
    if (loc === "home") return `${base}/?view=0`;
    if (loc === "shared") return `${base}/?view=1`;
    if (loc === "recycle") return `${base}/?view=5`;
    if (loc === "photos") return "photos.onedrive.com";
    return `${base}/?id=${encodeURIComponent(loc)}`;
  }
  const tenant = (doc.org?.domain ?? "contoso.com").split(".")[0];
  const user = doc.me.email.replace(/[@.]/g, "_");
  const base = `${tenant}-my.sharepoint.com/personal/${user}/_layouts/15/onedrive.aspx`;
  if (loc === "home") return base;
  if (loc === "root") return `${base}?view=0`;
  if (loc === "shared") return `${base}?view=1`;
  if (loc === "recycle") return `${base}?view=5`;
  return `${base}?id=${encodeURIComponent(loc)}`;
}

export function BrowserFrame({ tabs, active, onTab, url, children }: { tabs: string[]; active: number; onTab: (i: number) => void; url: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-[#dfe3e8]" style={{ fontFamily: FONT }}>
      <div className="flex h-9 shrink-0 items-end gap-1 px-2 pt-1.5">
        {tabs.map((t, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Browser tab: ${t}`}
            aria-current={i === active ? "page" : undefined}
            onClick={() => onTab(i)}
            className={`flex h-7 max-w-[220px] items-center gap-2 rounded-t-md px-3 text-[12px] ${i === active ? "bg-white text-[#242424]" : "text-[#424242] hover:bg-white/50"}`}
          >
            {i === 0 ? <OneDriveLogo size={14} /> : <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#185abd] text-[8px] font-bold text-white">W</span>}
            <span className="truncate">{t}</span>
          </button>
        ))}
        <span className="mb-1 ml-1 text-[16px] text-[#616161]">+</span>
      </div>
      <div className="flex h-9 shrink-0 items-center gap-2 bg-white px-2">
        <OIcon name="back" size={16} color="#616161" />
        <OIcon name="forward" size={16} color="#bdbdbd" />
        <OIcon name="refresh" size={16} color="#616161" />
        <div className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f0f0f0] px-3 text-[12px] text-[#424242]">
          <OIcon name="lock" size={12} color="#616161" />
          <span className="truncate" aria-label="Address bar">{url}</span>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 bg-white">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The OneDrive web app                                                */
/* ------------------------------------------------------------------ */

const NAV_WORK = [
  { id: "home", label: "Home", icon: "home" },
  { id: "root", label: "My files", icon: "folder" },
  { id: "shared", label: "Shared", icon: "people" },
  { id: "favorites", label: "Favorites", icon: "star" },
  { id: "recycle", label: "Recycle bin", icon: "trash" },
];
const NAV_BROWSE = [
  { id: "people", label: "People", icon: "person" },
  { id: "meetings", label: "Meetings", icon: "calendar" },
  { id: "media", label: "Media", icon: "image" },
];
const NAV_PERSONAL = [
  { id: "home", label: "Home", icon: "home" },
  { id: "root", label: "My files", icon: "folder" },
  { id: "shared", label: "Shared", icon: "people" },
  { id: "photos", label: "Photos", icon: "image" },
  { id: "recycle", label: "Recycle bin", icon: "trash" },
];

export function WebApp() {
  const ctx = useOd();
  const { doc, ui } = ctx;
  const [search, setSearch] = useState(doc.view?.search ?? "");
  const loc = doc.view?.location ?? "root";
  const work = doc.account === "work";
  const sel = selItems(ui.selection);
  const sel1 = itemOf(doc, sel[0]);
  const folderHere = loc === "root" || (itemOf(doc, loc) && isFolder(itemOf(doc, loc))) ? loc : null;
  const canCreate = folderHere !== null && (folderHere === "root" || isMine(doc, itemOf(doc, folderHere)!));
  const go = (id: string) => {
    setSearch("");
    if (id === "vault") {
      const v = doc.items.find((i) => i.kind === "vault");
      if (v) openItem(ctx, v);
      return;
    }
    ctx.cmd("od.go", id);
  };

  const createMenu: MenuItem[] = [
    { label: "Folder", icon: "folder", onClick: () => ctx.open({ kind: "newFolder", parent: folderHere ?? "root" }) },
    { sep: true },
    { label: "Word document", icon: "documents", onClick: () => ctx.commit("od.newFile", { folder: folderHere ?? "root", kind: "Word document" }) },
    { label: "Excel workbook", icon: "documents", onClick: () => ctx.commit("od.newFile", { folder: folderHere ?? "root", kind: "Excel workbook" }) },
    { label: "PowerPoint presentation", icon: "documents", onClick: () => ctx.commit("od.newFile", { folder: folderHere ?? "root", kind: "PowerPoint presentation" }) },
    { sep: true },
    { label: "Files upload", icon: "upload", onClick: () => ctx.open({ kind: "upload", folder: folderHere ?? "root", mode: "files" }) },
    { label: "Folder upload", icon: "upload", onClick: () => ctx.open({ kind: "upload", folder: folderHere ?? "root", mode: "folder" }) },
  ];

  return (
    <div className="flex h-full flex-col" style={{ fontFamily: FONT }}>
      {/* Suite header */}
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-[#e0e0e0] bg-[#fafafa] px-2">
        <button type="button" aria-label="App launcher" title="App launcher" className="flex h-9 w-9 items-center justify-center rounded hover:bg-[#f0f0f0]">
          <OIcon name="waffle" size={18} color="#424242" />
        </button>
        <button type="button" aria-label="OneDrive" onClick={() => go("home")} className="flex items-center gap-2 rounded px-1.5 py-1 hover:bg-[#f0f0f0]">
          <OneDriveLogo size={26} />
          <span className="text-[16px] font-semibold text-[#242424]">OneDrive</span>
        </button>
        <form
          className="mx-auto flex h-8 w-full max-w-[460px] items-center gap-2 rounded-md border border-[#e0e0e0] bg-white px-2.5 focus-within:border-[#0f6cbd]"
          onSubmit={(e) => { e.preventDefault(); ctx.cmd("od.search", search.trim()); }}
        >
          <OIcon name="search" size={16} color="#616161" />
          <input
            aria-label="Search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] outline-none"
          />
          {search && (
            <button type="button" aria-label="Clear search" onClick={() => { setSearch(""); ctx.cmd("od.search", ""); }} className="rounded p-0.5 hover:bg-[#f0f0f0]">
              <OIcon name="close" size={14} />
            </button>
          )}
        </form>
        <button type="button" aria-label="Settings" title="Settings" onClick={() => ctx.open({ kind: "settingsPane" })} className="flex h-9 w-9 items-center justify-center rounded hover:bg-[#f0f0f0]">
          <OIcon name="gear" size={18} color="#424242" />
        </button>
        <button type="button" aria-label="Help" title="Help" onClick={() => ctx.cmd("od.help", "OneDrive Help opened")} className="flex h-9 w-9 items-center justify-center rounded hover:bg-[#f0f0f0]">
          <OIcon name="help" size={18} color="#424242" />
        </button>
        <span className="ml-1"><Avatar person={doc.me} size={30} /></span>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Navigation pane */}
        <nav aria-label="OneDrive navigation" className="flex w-[200px] shrink-0 flex-col overflow-y-auto border-r border-[#e0e0e0] bg-[#fafafa] px-2 py-3">
          <div className="mb-2 truncate px-2 text-[14px] font-semibold text-[#242424]">{doc.me.name}</div>
          <button
            type="button"
            aria-label={work ? "Create or upload" : "Add new"}
            disabled={!canCreate}
            onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); ctx.menu({ clientX: r.left, clientY: r.bottom + 4 }, createMenu); }}
            className="mb-3 flex h-9 items-center gap-2 rounded-md bg-[#0f6cbd] px-3 text-[14px] font-semibold text-white hover:bg-[#115ea3] disabled:opacity-40"
          >
            <OIcon name="plus" size={16} color="#fff" strokeWidth={2} /> {work ? "Create or upload" : "Add new"}
          </button>
          {(work ? NAV_WORK : NAV_PERSONAL).map((n) => (
            <NavBtn key={n.id} label={n.label} icon={n.icon} active={navActive(doc, n.id)} onClick={() => go(n.id)} />
          ))}
          {work && (
            <>
              <div className="mb-1 mt-4 px-2 text-[12px] font-semibold text-[#616161]">Browse files by</div>
              {NAV_BROWSE.map((n) => (
                <NavBtn key={n.id} label={n.label} icon={n.icon} active={navActive(doc, n.id)} onClick={() => go(n.id)} />
              ))}
              {(doc.libraries ?? []).length > 0 && (
                <>
                  <div className="mb-1 mt-4 px-2 text-[12px] font-semibold text-[#616161]">Quick access</div>
                  {(doc.libraries ?? []).map((l) => (
                    <NavBtn key={l.id} label={l.name} icon="building" active={loc === `lib:${l.id}`} onClick={() => go(`lib:${l.id}`)} />
                  ))}
                </>
              )}
            </>
          )}
          <div className="mt-auto px-2 pt-4 text-[12px] text-[#616161]">
            <div className="mb-1 h-1 w-full overflow-hidden rounded-full bg-[#e0e0e0]">
              <div className="h-full bg-[#0f6cbd]" style={{ width: `${doc.storage?.percent ?? 2}%` }} />
            </div>
            {doc.storage ? `${doc.storage.used} used of ${doc.storage.total}` : work ? "21.4 GB used of 1 TB" : "1.2 GB used of 5 GB"}
            {!work && <div className="mt-1 font-semibold text-[#0f6cbd]">Get more storage</div>}
          </div>
        </nav>

        <main className="relative flex min-w-0 flex-1 flex-col bg-white" aria-label="Files" onClick={() => ctx.onSelect({ selection: "" })}>
          <MainView />
        </main>
        {doc.view?.details && <DetailsPane it={sel1 ?? (itemOf(doc, loc) ?? undefined)} />}
      </div>
    </div>
  );
}

function navActive(doc: OneDriveDoc, id: string): boolean {
  const loc = doc.view?.location ?? "root";
  if (loc === id) return true;
  if (id === "root") {
    const at = itemOf(doc, loc);
    return Boolean(at && isMine(doc, at) && at.parent !== undefined && !at.parent.startsWith("lib:"));
  }
  if (id === "people") return loc.startsWith("person:");
  if (id === "meetings") return loc.startsWith("meeting:");
  if (id === "shared") {
    const at = itemOf(doc, loc);
    return Boolean(at && !isMine(doc, at));
  }
  return false;
}

function NavBtn({ label, icon, active, onClick }: { label: string; icon: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={`relative flex h-8 shrink-0 items-center gap-2.5 rounded-md px-2 text-left text-[14px] ${active ? "bg-[#ebebeb] font-semibold text-[#242424]" : "text-[#424242] hover:bg-[#f0f0f0]"}`}
    >
      {active && <span className="absolute left-0 top-2 h-4 w-[3px] rounded-full bg-[#0f6cbd]" />}
      <OIcon name={icon} size={18} color={active ? BRAND : "#424242"} filled={false} />
      <span className="truncate">{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Main area                                                           */
/* ------------------------------------------------------------------ */

function MainView() {
  const ctx = useOd();
  const { doc } = ctx;
  const loc = doc.view?.location ?? "root";
  if (loc === "restore") return <RestoreView />;
  if (loc === "home") return <HomeView />;
  if (loc === "shared") return <SharedView />;
  if (loc === "people") return <PeopleView />;
  if (loc === "meetings") return <MeetingsView />;
  return <FolderView />;
}

function Title({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2 px-6">
      <div className="flex min-w-0 flex-1 items-center gap-1 text-[20px] font-semibold text-[#242424]">{children}</div>
      {right}
    </div>
  );
}

function ViewButtons() {
  const ctx = useOd();
  const { doc } = ctx;
  const layout = doc.view?.layout ?? "list";
  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <CmdBtn icon={layout === "list" ? "list" : "tiles"} label={layout === "list" ? "Switch to tiles view" : "Switch to list view"} showLabel={false} onClick={() => ctx.cmd("od.layout", layout === "list" ? "tiles" : "list")} />
      <CmdBtn icon="info" label="Open the details pane" showLabel={false} pressed={Boolean(doc.view?.details)} onClick={() => ctx.cmd("od.details")} />
    </div>
  );
}

/** Command bar for the selected items. */
function CommandBar({ inBinView, libView }: { inBinView?: boolean; libView?: boolean }) {
  const ctx = useOd();
  const { doc, ui } = ctx;
  const sel = selItems(ui.selection);
  const it = itemOf(doc, sel[0]);
  const [more, setMore] = useState(false);
  void more;
  if (inBinView) {
    return (
      <div className="flex h-11 shrink-0 items-center gap-1 border-b border-[#f0f0f0] px-5" onClick={(e) => e.stopPropagation()} role="toolbar" aria-label="Commands">
        {sel.length ? (
          <>
            <CmdBtn icon="restore" label="Restore" onClick={() => ctx.commit("od.restore", { file: [...sel].sort().join(",") })} />
            <CmdBtn icon="delete" label="Delete" onClick={() => ctx.open({ kind: "purge", files: sel })} />
            <span className="ml-auto text-[13px] text-[#616161]">{sel.length} selected</span>
          </>
        ) : (
          <CmdBtn icon="delete" label="Empty recycle bin" disabled={!doc.items.some((i) => i.deleted && !i.purged)} onClick={() => ctx.open({ kind: "emptyBin" })} />
        )}
      </div>
    );
  }
  if (!it) {
    return <div className="h-11 shrink-0 border-b border-[#f0f0f0]" />;
  }
  const menu = itemMenu(ctx, it, sel);
  const primary = ["Open", "Share", "Copy link", "Add shortcut to My files", "Download", "Delete", "Move to", "Copy to", "Rename", "Restore", "Remove shortcut from My files"];
  const shown = menu.filter((m) => m.label && primary.includes(m.label) && !(libView && m.label === "Open"));
  const rest = menu.filter((m) => !m.sep && !(m.label && primary.includes(m.label)));
  return (
    <div className="flex h-11 shrink-0 items-center gap-0.5 overflow-hidden border-b border-[#f0f0f0] px-5" onClick={(e) => e.stopPropagation()} role="toolbar" aria-label="Commands">
      {shown.map((m) => (
        <CmdBtn key={m.label} icon={m.icon ?? "info"} label={m.label!} onClick={(e) => (m.sub ? ctx.menu(e, m.sub) : m.onClick?.())} />
      ))}
      {rest.length > 0 && <CmdBtn icon="more" label="More actions" showLabel={false} onClick={(e) => { setMore(true); ctx.menu(e, rest); }} />}
      <span className="ml-auto shrink-0 pl-2 text-[13px] text-[#616161]">{sel.length} selected</span>
      <button type="button" aria-label="Clear selection" onClick={() => ctx.onSelect({ selection: "" })} className="ml-1 rounded p-1 hover:bg-[#f0f0f0]">
        <OIcon name="close" size={14} />
      </button>
    </div>
  );
}

function FolderView() {
  const ctx = useOd();
  const { doc } = ctx;
  const loc = doc.view?.location ?? "root";
  const work = doc.account === "work";
  const at = itemOf(doc, loc);
  let items: OdItem[] = [];
  let title: React.ReactNode = "My files";
  let empty = "This folder is empty";
  let bin = false;
  let lib = false;
  if (loc === "root") items = childrenOf(doc, "root").filter((i) => !(i.kind === "vault" && doc.account !== "personal"));
  else if (loc === "favorites") {
    items = live(doc).filter((i) => i.favorite);
    title = "Favorites";
    empty = "Files you add to favorites show up here";
  } else if (loc === "recycle") {
    items = doc.items.filter((i) => i.deleted && !i.purged && !ancestors(doc, i).some((a) => a.deleted));
    title = "Recycle bin";
    empty = "The recycle bin is empty";
    bin = true;
  } else if (loc === "media" || loc === "photos") {
    items = live(doc).filter((i) => (i.kind === "image" || i.kind === "video") && isMine(doc, i));
    title = loc === "media" ? "Media" : "Photos";
    empty = "Photos and videos you save to OneDrive show up here";
  } else if (loc === "search") {
    const q = (doc.view?.search ?? "").toLowerCase();
    items = live(doc).filter((i) => i.name.toLowerCase().includes(q) && !i.shortcutTo && !(inVault(doc, i) && doc.vault?.locked !== false) && i.kind !== "vault");
    title = `Results for “${doc.view?.search ?? ""}”`;
    empty = "No results. Check the spelling or try other words.";
  } else if (loc.startsWith("person:")) {
    const email = loc.slice(7);
    items = live(doc).filter((i) => (!isMine(doc, i) && i.owner === email && i.parent === undefined) || (isMine(doc, i) && i.access?.some((a) => a.email === email)));
    title = (
      <>
        <button type="button" onClick={(e) => { e.stopPropagation(); ctx.cmd("od.go", "people"); }} className="rounded px-1 hover:bg-[#f0f0f0]">People</button>
        <OIcon name="chevronRight" size={16} />
        <span>{nameOf(doc, email)}</span>
      </>
    );
    empty = "No files shared between you yet";
  } else if (loc.startsWith("meeting:")) {
    const m = doc.meetings?.find((x) => `meeting:${x.id}` === loc);
    items = (m?.files ?? []).map((id) => itemOf(doc, id)).filter((x): x is OdItem => Boolean(x));
    title = (
      <>
        <button type="button" onClick={(e) => { e.stopPropagation(); ctx.cmd("od.go", "meetings"); }} className="rounded px-1 hover:bg-[#f0f0f0]">Meetings</button>
        <OIcon name="chevronRight" size={16} />
        <span className="truncate">{m?.title ?? "Meeting"}</span>
      </>
    );
  } else if (loc.startsWith("lib:")) {
    const l = doc.libraries?.find((x) => `lib:${x.id}` === loc);
    items = childrenOf(doc, loc);
    title = (
      <span className="flex items-center gap-2">
        <OIcon name="building" size={20} color={BRAND} /> {l?.name ?? "Library"} <span className="text-[13px] font-normal text-[#616161]">· Documents</span>
      </span>
    );
    lib = true;
  } else if (at) {
    items = childrenOf(doc, at.id);
    const chain = [...ancestors(doc, at), at];
    const shared = !isMine(doc, at);
    const inLib = at.parent?.startsWith("lib:") || ancestors(doc, at)[0]?.parent?.startsWith("lib:");
    const libRoot = inLib ? doc.libraries?.find((l) => `lib:${l.id}` === (ancestors(doc, at)[0] ?? at).parent) : undefined;
    lib = Boolean(inLib);
    title = (
      <>
        {shared && !inLib ? (
          <button type="button" onClick={(e) => { e.stopPropagation(); ctx.cmd("od.go", "shared"); }} className="shrink-0 rounded px-1 hover:bg-[#f0f0f0]">Shared</button>
        ) : libRoot ? (
          <button type="button" onClick={(e) => { e.stopPropagation(); ctx.cmd("od.go", `lib:${libRoot.id}`); }} className="shrink-0 rounded px-1 hover:bg-[#f0f0f0]">{libRoot.name}</button>
        ) : (
          <button type="button" onClick={(e) => { e.stopPropagation(); ctx.cmd("od.go", "root"); }} className="shrink-0 rounded px-1 hover:bg-[#f0f0f0]">My files</button>
        )}
        {chain.map((c) => (
          <span key={c.id} className="flex min-w-0 items-center gap-1">
            <OIcon name="chevronRight" size={16} />
            <button type="button" onClick={(e) => { e.stopPropagation(); ctx.cmd("od.go", c.id); }} className="truncate rounded px-1 hover:bg-[#f0f0f0]">{c.name}</button>
          </span>
        ))}
        {at.kind === "vault" && doc.vault?.locked === false && (
          <Btn kind="secondary" icon="lock" className="ml-3" onClick={(e) => { e.stopPropagation(); ctx.commit("od.vault", { action: "lock" }); }}>Lock</Btn>
        )}
      </>
    );
  }
  if (at?.kind === "vault" && doc.vault?.locked !== false) items = [];
  void work;
  return (
    <>
      <Title right={!bin && <ViewButtons />}>{title}</Title>
      <CommandBar inBinView={bin} libView={lib} />
      {bin && <p className="px-6 pt-2 text-[12px] text-[#616161]">{doc.account === "work" ? "Items you delete stay here for 93 days unless your organization changed this, then they're removed." : "Items you delete stay here for 30 days, then they're removed."}</p>}
      <FileList items={items} empty={empty} bin={bin} />
    </>
  );
}

function HomeView() {
  const ctx = useOd();
  const { doc } = ctx;
  const [filter, setFilter] = useState("All");
  const kinds: Record<string, string> = { Word: "word", Excel: "excel", PowerPoint: "powerpoint", PDF: "pdf" };
  const recent = live(doc).filter((i) => !isFolder(i) && !inVault(doc, i) && (filter === "All" || i.kind === kinds[filter]));
  return (
    <>
      <Title right={<ViewButtons />}>Home</Title>
      <CommandBar />
      <div className="flex shrink-0 items-center gap-2 px-6 pb-1 pt-3" onClick={(e) => e.stopPropagation()}>
        <span className="mr-2 text-[14px] font-semibold">Recent</span>
        {["All", "Word", "Excel", "PowerPoint", "PDF"].map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={`h-7 rounded-full border px-3 text-[13px] ${filter === f ? "border-[#0f6cbd] bg-[#ebf3fc] text-[#0f6cbd]" : "border-[#d1d1d1] hover:bg-[#f5f5f5]"}`}>
            {f}
          </button>
        ))}
      </div>
      <FileList items={recent} empty="Files you open or edit show up here" columns="recent" />
    </>
  );
}

function SharedView() {
  const ctx = useOd();
  const { doc } = ctx;
  const tab = doc.view?.sharedTab ?? "with";
  const withYou = live(doc).filter((i) => !isMine(doc, i) && i.parent === undefined);
  const byYou = live(doc).filter((i) => isMine(doc, i) && hasSharing(i) && !i.shortcutTo);
  return (
    <>
      <Title right={<ViewButtons />}>Shared</Title>
      <div className="flex shrink-0 gap-4 px-6" role="tablist" aria-label="Shared" onClick={(e) => e.stopPropagation()}>
        {(["with", "by"] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => ctx.cmd("od.sharedTab", t)} className={`border-b-2 pb-1.5 text-[14px] ${tab === t ? "border-[#0f6cbd] font-semibold text-[#242424]" : "border-transparent text-[#616161] hover:text-[#242424]"}`}>
            {t === "with" ? "Shared with you" : "Shared by you"}
          </button>
        ))}
      </div>
      <CommandBar />
      <FileList items={tab === "with" ? withYou : byYou} empty={tab === "with" ? "Files others share with you show up here" : "Files you share show up here"} columns={tab === "with" ? "sharedWith" : "sharedBy"} />
    </>
  );
}

function PeopleView() {
  const ctx = useOd();
  const { doc } = ctx;
  const emails = new Set<string>();
  for (const i of live(doc)) {
    if (!isMine(doc, i) && i.owner && i.parent === undefined) emails.add(i.owner);
    if (isMine(doc, i)) for (const a of i.access ?? []) emails.add(a.email);
  }
  const people = Array.from(emails);
  return (
    <>
      <Title>People</Title>
      <p className="px-6 pb-3 text-[13px] text-[#616161]">Find files by the people you work with. Select a person to see the files shared between you.</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3 overflow-auto px-6 pb-6">
        {people.map((e) => {
          const p = personOf(doc, e) ?? { name: e, email: e };
          const n = live(doc).filter((i) => (!isMine(doc, i) && i.owner === e && i.parent === undefined) || (isMine(doc, i) && i.access?.some((a) => a.email === e))).length;
          return (
            <button key={e} type="button" aria-label={p.name} onClick={(ev) => { ev.stopPropagation(); ctx.cmd("od.go", `person:${e}`); }} className="flex flex-col items-center gap-2 rounded-lg border border-[#e0e0e0] p-4 hover:bg-[#f5f5f5]">
              <Avatar person={p} size={48} />
              <span className="w-full truncate text-center text-[14px] font-semibold">{p.name}</span>
              <span className="text-[12px] text-[#616161]">{n} file{n === 1 ? "" : "s"}</span>
            </button>
          );
        })}
        {people.length === 0 && <p className="text-[13px] text-[#616161]">No one has shared files with you yet.</p>}
      </div>
    </>
  );
}

function MeetingsView() {
  const ctx = useOd();
  const { doc } = ctx;
  const ms = doc.meetings ?? [];
  return (
    <>
      <Title>Meetings</Title>
      <p className="px-6 pb-3 text-[13px] text-[#616161]">Files shared in your Teams meetings, such as agendas, notes and recordings.</p>
      <div className="overflow-auto px-6 pb-6">
        {ms.map((m) => (
          <button key={m.id} type="button" aria-label={m.title} onClick={(e) => { e.stopPropagation(); ctx.cmd("od.go", `meeting:${m.id}`); }} className="mb-2 flex w-full items-center gap-3 rounded-lg border border-[#e0e0e0] px-4 py-3 text-left hover:bg-[#f5f5f5]">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#ebf3fc]"><OIcon name="calendar" size={18} color={BRAND} /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-semibold">{m.title}</span>
              <span className="block text-[12px] text-[#616161]">{m.when} · {m.files.length} file{m.files.length === 1 ? "" : "s"}</span>
            </span>
            <OIcon name="chevronRight" size={16} color="#616161" />
          </button>
        ))}
        {ms.length === 0 && <p className="text-[13px] text-[#616161]">No meeting files yet.</p>}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* File list                                                           */
/* ------------------------------------------------------------------ */

function FileList({ items, empty, bin, columns = "files" }: { items: OdItem[]; empty: string; bin?: boolean; columns?: "files" | "recent" | "sharedWith" | "sharedBy" }) {
  const ctx = useOd();
  const { doc, ui } = ctx;
  const sel = selItems(ui.selection);
  const [drag, setDrag] = useState<string | null>(null);
  const layout = doc.view?.layout ?? "list";
  const select = (it: OdItem, e: React.MouseEvent, toggle = false) => {
    e.stopPropagation();
    if (toggle || e.ctrlKey || e.metaKey) {
      const s = new Set(sel);
      if (s.has(it.id)) s.delete(it.id);
      else s.add(it.id);
      ctx.onSelect({ selection: Array.from(s).map((x) => `item:${x}`).join(",") });
    } else if (e.shiftKey && sel.length) {
      const order = items.map((x) => x.id);
      const a = order.indexOf(sel[0]), b = order.indexOf(it.id);
      ctx.onSelect({ selection: order.slice(Math.min(a, b), Math.max(a, b) + 1).map((x) => `item:${x}`).join(",") });
    } else ctx.onSelect({ selection: `item:${it.id}` });
  };
  const ctxMenu = (it: OdItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let s = sel;
    if (!sel.includes(it.id)) {
      s = [it.id];
      ctx.onSelect({ selection: `item:${it.id}` });
    }
    ctx.menu(e, itemMenu(ctx, it, s));
  };
  const dragProps = (it: OdItem) =>
    bin || !isMine(doc, it)
      ? {}
      : {
          draggable: true,
          onDragStart: (e: React.DragEvent) => {
            const ids = sel.includes(it.id) ? sel : [it.id];
            e.dataTransfer.setData("text/x-onedrive", ids.join(","));
            e.dataTransfer.effectAllowed = "move";
          },
          ...(isFolder(it) && !it.shortcutTo && it.kind !== "vault"
            ? {
                onDragOver: (e: React.DragEvent) => { e.preventDefault(); setDrag(it.id); },
                onDragLeave: () => setDrag((d) => (d === it.id ? null : d)),
                onDrop: (e: React.DragEvent) => {
                  e.preventDefault();
                  setDrag(null);
                  const raw = e.dataTransfer.getData("text/x-onedrive");
                  const ids = raw.split(",").filter((x) => x && x !== it.id);
                  if (ids.length) ctx.commit("od.move", { file: ids.sort().join(","), folder: it.id });
                },
              }
            : {}),
        };

  if (!items.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-[#616161]">
        <OneDriveLogo size={64} mono="#c8c6c4" />
        <p className="mt-3 text-[15px] font-semibold text-[#424242]">{empty}</p>
      </div>
    );
  }

  if (layout === "tiles" && !bin) {
    return (
      <div className="grid min-h-0 flex-1 auto-rows-min grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 overflow-auto px-6 py-3">
        {items.map((it) => {
          const on = sel.includes(it.id);
          return (
            <div key={it.id} role="row" aria-label={it.name} aria-selected={on} {...dragProps(it)} onClick={(e) => select(it, e)} onDoubleClick={() => openItem(ctx, it)} onContextMenu={(e) => ctxMenu(it, e)} className={`relative flex flex-col items-center gap-2 rounded-lg border p-3 ${on ? "border-[#0f6cbd] bg-[#ebf3fc]" : "border-transparent hover:bg-[#f5f5f5]"} ${drag === it.id ? "ring-2 ring-[#0f6cbd]" : ""}`}>
              <FileIcon kind={it.kind} size={56} shared={hasSharing(it) || !isMine(doc, it)} shortcut={Boolean(it.shortcutTo)} />
              <button type="button" onClick={(e) => { e.stopPropagation(); openItem(ctx, it); }} className="w-full truncate text-center text-[13px] hover:underline">{it.name}</button>
              <span className="text-[11px] text-[#616161]">{it.modified ?? ""}</span>
            </div>
          );
        })}
      </div>
    );
  }

  const allCols =
    bin ? ["Name", "Date deleted", "Deleted by", "Original location"]
    : columns === "recent" ? ["Name", "Opened", "Owner", "Location"]
    : columns === "sharedWith" ? ["Name", "Date shared", "Shared by", "Shared in"]
    : columns === "sharedBy" ? ["Name", "Modified", "Sharing", "Has access"]
    : ["Name", "Modified", "Modified By", "File size", "Sharing"];
  // With the details pane open there is less room: keep the most useful columns.
  const cols = doc.view?.details ? allCols.filter((c) => !["Modified By", "File size", "Deleted by", "Owner"].includes(c)) : allCols;
  const W: Record<string, string> = { Modified: "w-[140px]", Opened: "w-[130px]", "Date shared": "w-[110px]", "Modified By": "w-[120px]", "File size": "w-[80px]", Sharing: "w-[110px]", Owner: "w-[120px]", Location: "w-[150px]", "Shared by": "w-[120px]", "Shared in": "w-[150px]", "Has access": "w-[170px]", "Date deleted": "w-[120px]", "Deleted by": "w-[110px]", "Original location": "w-[170px]" };

  const cell = (it: OdItem, c: string): React.ReactNode => {
    switch (c) {
      case "Modified":
      case "Opened":
      case "Date shared":
        return it.modified ?? "";
      case "Modified By":
        return it.modifiedBy ? (it.modifiedBy === doc.me.email ? doc.me.name : nameOf(doc, it.modifiedBy)) : doc.me.name;
      case "File size":
        return isFolder(it) ? `${childrenOf(doc, it.shortcutTo ?? it.id).length} items` : it.size ?? "";
      case "Sharing":
        return (
          <span className="flex items-center gap-1.5">
            <OIcon name={sharingLabel(doc, it) === "Private" ? "lock" : sharingLabel(doc, it) === "Anyone with the link" ? "globe" : "people"} size={14} color="#616161" />
            {sharingLabel(doc, it)}
          </span>
        );
      case "Owner":
      case "Shared by":
        return isMine(doc, it) ? doc.me.name : nameOf(doc, it.owner);
      case "Location":
        return locationLabel(doc, it);
      case "Shared in":
        return it.sharedVia ?? "";
      case "Has access":
        return [...(it.access ?? []).map((a) => nameOf(doc, a.email)), ...(it.links ?? []).map((l) => (l.scope === "Anyone" ? "Anyone with the link" : l.scope === "Organization" ? `People in ${doc.org?.name ?? "your org"}` : "Link"))].join(", ");
      case "Date deleted":
        return it.deleted?.on ?? "";
      case "Deleted by":
        return it.deleted?.by ?? doc.me.name;
      case "Original location":
        return locationLabel(doc, it);
      default:
        return "";
    }
  };

  return (
    <div className="min-h-0 flex-1 overflow-auto px-4 pb-4">
      <table className="w-full table-fixed text-[13px] text-[#242424]" role="grid" aria-label="Files">
        <thead>
          <tr className="h-10 border-b border-[#e0e0e0] text-left text-[12px] font-semibold text-[#424242]">
            <th className="w-8" />
            {cols.map((c, i) => (
              <th key={c} className={`font-semibold ${i === 0 ? "" : W[c] ?? "w-[130px]"}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((it) => {
            const on = sel.includes(it.id);
            return (
              <tr
                key={it.id}
                role="row"
                aria-label={it.name}
                aria-selected={on}
                {...dragProps(it)}
                onClick={(e) => select(it, e)}
                onDoubleClick={() => openItem(ctx, it)}
                onContextMenu={(e) => ctxMenu(it, e)}
                className={`group h-11 cursor-default border-b border-[#f0f0f0] ${on ? "bg-[#ebf3fc]" : "hover:bg-[#f5f5f5]"} ${drag === it.id ? "outline outline-2 outline-[#0f6cbd]" : ""}`}
              >
                <td className="pl-1">
                  <button type="button" role="checkbox" aria-checked={on} aria-label={`Select ${it.name}`} onClick={(e) => select(it, e, true)} className={`flex h-5 w-5 items-center justify-center rounded-full border ${on ? "border-[#0f6cbd] bg-[#0f6cbd]" : "border-[#8a8886] bg-white opacity-0 group-hover:opacity-100"}`}>
                    {on && <OIcon name="check" size={12} color="#fff" strokeWidth={2.2} />}
                  </button>
                </td>
                {cols.map((c, i) =>
                  i === 0 ? (
                    <td key={c} className="truncate">
                      <span className="flex min-w-0 items-center gap-3">
                        <FileIcon kind={it.kind} size={24} shared={hasSharing(it) || !isMine(doc, it)} shortcut={Boolean(it.shortcutTo)} />
                        <button type="button" disabled={bin} onClick={(e) => { e.stopPropagation(); if (!bin) openItem(ctx, it); }} className="min-w-0 truncate text-left hover:underline disabled:no-underline">
                          {it.name}
                        </button>
                        {it.favorite && <OIcon name="star" size={13} color="#986f0b" filled />}
                        {!bin && (
                          <span className="ml-auto flex shrink-0 items-center opacity-0 group-hover:opacity-100">
                            {isMine(doc, it) && !it.shortcutTo && it.kind !== "vault" && (
                              <button type="button" aria-label={`Share ${it.name}`} title="Share" onClick={(e) => { e.stopPropagation(); ctx.onSelect({ selection: `item:${it.id}` }); ctx.open({ kind: "share", file: it.id }); }} className="rounded p-1 hover:bg-[#e0e0e0]">
                                <OIcon name="share" size={15} color={BRAND} />
                              </button>
                            )}
                            <button type="button" aria-label={`More actions for ${it.name}`} title="More actions" onClick={(e) => ctxMenu(it, e)} className="rounded p-1 hover:bg-[#e0e0e0]">
                              <OIcon name="more" size={15} />
                            </button>
                          </span>
                        )}
                      </span>
                    </td>
                  ) : (
                    <td key={c} className="truncate pr-2 text-[#424242]">{cell(it, c)}</td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Details pane                                                        */
/* ------------------------------------------------------------------ */

function DetailsPane({ it }: { it?: OdItem }) {
  const ctx = useOd();
  const { doc } = ctx;
  if (!it) {
    return (
      <aside aria-label="Details" className="w-[280px] shrink-0 border-l border-[#e0e0e0] bg-white p-4 text-[13px]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center">
          <span className="flex-1 text-[15px] font-semibold">Details</span>
          <button type="button" aria-label="Close the details pane" onClick={() => ctx.cmd("od.details", "off")} className="rounded p-1 hover:bg-[#f0f0f0]"><OIcon name="close" size={14} /></button>
        </div>
        <p className="text-[#616161]">Select a file or folder to see its details.</p>
      </aside>
    );
  }
  const owner = isMine(doc, it) ? doc.me : personOf(doc, it.owner) ?? { name: it.owner ?? "", email: it.owner ?? "" };
  const people = (it.access ?? []).map((a) => personOf(doc, a.email) ?? { name: a.email, email: a.email });
  return (
    <aside aria-label={`Details: ${it.name}`} className="flex w-[280px] shrink-0 flex-col overflow-auto border-l border-[#e0e0e0] bg-white p-4 text-[13px]" onClick={(e) => e.stopPropagation()}>
      <div className="mb-3 flex items-center gap-2">
        <FileIcon kind={it.kind} size={22} />
        <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">{it.name}</span>
        <button type="button" aria-label="Close the details pane" onClick={() => ctx.cmd("od.details", "off")} className="rounded p-1 hover:bg-[#f0f0f0]"><OIcon name="close" size={14} /></button>
      </div>
      <div className="mb-4 flex h-28 items-center justify-center rounded-md bg-[#f5f5f5]"><FileIcon kind={it.kind} size={56} /></div>
      <h3 className="mb-2 text-[13px] font-semibold">Has access</h3>
      <div className="mb-2 flex items-center -space-x-1">
        <Avatar person={owner} size={28} ring />
        {people.map((p) => <Avatar key={p.email} person={p} size={28} ring />)}
        {(it.links ?? []).length > 0 && (
          <span className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#ebf3fc]" title="Sharing links"><OIcon name="link" size={14} color={BRAND} /></span>
        )}
      </div>
      <p className="mb-2 text-[12px] text-[#616161]">
        {hasSharing(it) ? `Shared with ${[...people.map((p) => p.name), ...(it.links ?? []).map((l) => (l.scope === "Anyone" ? "anyone with the link" : l.scope === "Organization" ? `people in ${doc.org?.name ?? "your organization"}` : "people with the link"))].join(", ")}.` : isMine(doc, it) ? "Only you have access." : `Shared with you by ${owner.name}.`}
      </p>
      {isMine(doc, it) && !it.shortcutTo && (
        <button type="button" onClick={() => ctx.open({ kind: "manage", file: it.id })} className="mb-4 self-start text-[13px] font-semibold text-[#0f6cbd] hover:underline">Manage access</button>
      )}
      <h3 className="mb-2 text-[13px] font-semibold">More details</h3>
      {[
        ["Type", TYPE_NAME[it.kind]],
        ["Modified", `${it.modified ?? ""}${it.modifiedBy ? ` by ${it.modifiedBy === doc.me.email ? "you" : nameOf(doc, it.modifiedBy)}` : ""}`],
        ["Path", locationLabel(doc, it)],
        ["Owner", owner.name],
        ...(isFolder(it) ? [] : [["Size", it.size ?? ""], ["Version", it.version ?? "1.0"]]),
      ].map(([k, v]) => (
        <div key={k} className="mb-2">
          <div className="text-[12px] text-[#616161]">{k}</div>
          <div className="break-words">{v}</div>
        </div>
      ))}
    </aside>
  );
}
