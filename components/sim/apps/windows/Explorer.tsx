"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import type { WinBinItem, WinDoc, WinItem, WinRoot, WinWindow } from "./types";
import { FileArt, G, kindForName } from "./icons";
import { Btn, Modal, T, TextIn, WinCtx, type MItem, type WinCtxValue, useWin } from "./ui";
import { TitleBar } from "./frame";
import {
  INVALID_NAME,
  SPECIAL,
  baseOf,
  crumbs,
  dateNum,
  displayName,
  extOf,
  fileType,
  flatten,
  getItem,
  isFolder,
  parentOf,
  realPath,
  rootOf,
  sizeNum,
  sizeOf,
  splitPath,
} from "./fs";
import { S, normLoc, selPaths, userName } from "./model";

/* ------------------------------------------------------------------ */
/* Entries                                                             */
/* ------------------------------------------------------------------ */

export type Entry = {
  key: string;
  path: string;
  name: string;
  label: string;
  item?: WinItem;
  folder: boolean;
  art: string;
  type: string;
  size: string;
  modified: string;
  bin?: WinBinItem;
  root?: WinRoot;
  location?: string;
};

export function rootArt(r: WinRoot): string {
  return { desktop: "desktop", documents: "documents", downloads: "downloads", pictures: "pictures", music: "music", videos: "videos", onedrive: "onedrive", drive: "drive", usb: "usb", network: "network", gdrive: "gdrive" }[r.root];
}

export function itemArt(it: WinItem): string {
  if (it.app) return "exe";
  return kindForName(it.name, isFolder(it));
}

export function entryOf(doc: WinDoc, path: string, showExt: boolean): Entry | null {
  const it = getItem(doc, path);
  if (!it) return null;
  const p = realPath(doc, path);
  const r = doc.fs.find((x) => x.name === p);
  return {
    key: `file:${p}`,
    path: p,
    name: it.name,
    label: r?.label ?? displayName(it, showExt),
    item: it,
    folder: isFolder(it),
    art: r ? rootArt(r) : itemArt(it),
    type: r ? "System Folder" : fileType(it),
    size: sizeOf(it),
    modified: it.modified ?? "",
    root: r,
  };
}

export function sortEntries(list: Entry[], sort = "name", dir: "asc" | "desc" = "asc"): Entry[] {
  const k = (e: Entry): string | number => (sort === "date" ? dateNum(e.modified) : sort === "type" ? e.type : sort === "size" ? sizeNum(e.size) : e.label.toLowerCase());
  const out = list.slice().sort((a, b) => {
    if (a.folder !== b.folder && sort !== "date") return a.folder ? -1 : 1;
    const x = k(a);
    const y = k(b);
    const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true });
    return dir === "desc" ? -c : c;
  });
  return out;
}

export const userRoots = (doc: WinDoc) => doc.fs.filter((r) => ["desktop", "downloads", "documents", "pictures", "music", "videos"].includes(r.root));
export const driveRoots = (doc: WinDoc) => doc.fs.filter((r) => ["drive", "usb", "network"].includes(r.root));

/** What a File Explorer window shows, in display order. */
export function listEntries(doc: WinDoc, w: WinWindow): Entry[] {
  const showExt = S(doc, "explorer.extensions") === "on";
  const showHidden = S(doc, "explorer.hidden") === "on";
  const loc = w.loc ?? "Home";
  const q = (w.search ?? "").trim().toLowerCase();
  let list: Entry[] = [];
  if (q) {
    const scope = loc === "Home" || loc === "This PC" ? doc.fs.filter((r) => r.root !== "gdrive").map((r) => r.name) : [loc];
    for (const s of scope)
      for (const f of flatten(doc, s)) {
        if (!f.item.name.toLowerCase().includes(q) && !(f.item.text ?? "").toLowerCase().includes(q)) continue;
        const e = entryOf(doc, f.path, showExt);
        if (e) list.push({ ...e, location: parentOf(f.path) });
      }
    return sortEntries(list, w.sort, w.dir);
  }
  if (loc === "Home") {
    const quick = [...userRoots(doc).filter((r) => ["desktop", "downloads", "documents", "pictures"].includes(r.root)).map((r) => r.name), ...(doc.quick ?? [])];
    for (const p of quick) {
      const e = entryOf(doc, p, showExt);
      if (e && !list.some((x) => x.key === e.key)) list.push(e);
    }
    for (const p of doc.recent ?? []) {
      const e = entryOf(doc, p, showExt);
      if (e && !list.some((x) => x.key === e.key)) list.push({ ...e, location: parentOf(p) });
    }
    return list;
  }
  if (loc === "This PC") {
    for (const r of [...userRoots(doc), ...driveRoots(doc)]) {
      const e = entryOf(doc, r.name, showExt);
      if (e) list.push(e);
    }
    return list;
  }
  if (loc === "Recycle Bin") {
    return (doc.recycle ?? []).map((b) => ({
      key: `bin:${b.item.name}`,
      path: `${b.from}/${b.item.name}`,
      name: b.item.name,
      label: displayName(b.item, showExt),
      item: b.item,
      folder: isFolder(b.item),
      art: itemArt(b.item),
      type: fileType(b.item),
      size: sizeOf(b.item),
      modified: b.item.modified ?? "",
      bin: b,
      location: b.from,
    }));
  }
  if (loc === "Network") {
    return doc.fs.filter((r) => r.root === "network").map((r) => entryOf(doc, r.name, showExt)!).filter(Boolean);
  }
  const it = getItem(doc, loc);
  if (it?.zip) {
    list = it.zip.map((z) => ({ key: `zip:${loc}/${z.name}`, path: `${loc}/${z.name}`, name: z.name, label: displayName(z, showExt), item: z, folder: isFolder(z), art: itemArt(z), type: fileType(z), size: sizeOf(z), modified: z.modified ?? "" }));
    return sortEntries(list, w.sort, w.dir);
  }
  for (const c of it?.children ?? []) {
    if (c.hidden && !showHidden) continue;
    const e = entryOf(doc, `${realPath(doc, loc)}/${c.name}`, showExt);
    if (e) list.push(e);
  }
  return sortEntries(list, w.sort, w.dir);
}

export function locTitle(doc: WinDoc, loc: string): string {
  if (SPECIAL.includes(loc)) return loc;
  const r = doc.fs.find((x) => x.name === loc);
  if (r) return r.label ?? r.name;
  return baseOf(loc) || loc;
}

export function addressText(doc: WinDoc, loc: string): string {
  if (SPECIAL.includes(loc)) return loc;
  const r = rootOf(doc, loc);
  const user = userName(doc).split(" ")[0].toLowerCase();
  const rest = splitPath(realPath(doc, loc)).slice(1).join("\\");
  if (!r) return loc;
  const m = /\(([A-Z]):\)/.exec(r.name);
  if (m) return `${m[1]}:\\${rest}`;
  if (r.root === "drive") return `C:\\${rest}`;
  return `C:\\Users\\${user}\\${r.name}${rest ? `\\${rest}` : ""}`;
}

export function parseAddress(doc: WinDoc, text: string): string {
  let t = text.trim().replace(/\//g, "\\");
  const user = /^c:\\users\\[^\\]+\\?/i.exec(t);
  if (user) t = t.slice(user[0].length);
  const drive = /^([a-z]):\\?(.*)$/i.exec(t);
  if (drive) {
    const r = doc.fs.find((x) => x.name.toUpperCase().includes(`(${drive[1].toUpperCase()}:)`)) ?? (drive[1].toUpperCase() === "C" ? doc.fs.find((x) => x.root === "drive") : undefined);
    if (r) t = [r.name, drive[2]].filter(Boolean).join("\\");
  }
  return normLoc(doc, t.replace(/\\/g, "/").replace(/\s*›\s*/g, "/").replace(/\s*>\s*/g, "/"));
}

/* ------------------------------------------------------------------ */
/* File actions shared by Explorer and the desktop                     */
/* ------------------------------------------------------------------ */

export function canWrite(doc: WinDoc, loc: string): boolean {
  if (SPECIAL.includes(loc) || loc.startsWith("search:")) return false;
  const it = getItem(doc, loc);
  return Boolean(it && isFolder(it) && !it.zip);
}

/**
 * Run a command once per selected item, selecting each one first. Moving three
 * files at once and moving them one by one then both satisfy per-file steps.
 */
export function perItem(ctx: WinCtxValue, paths: string[], id: string, value?: string, prefix = "file:") {
  for (const p of paths) {
    ctx.select(`${prefix}${p}`);
    ctx.cmd(id, value);
  }
}

export function pasteInto(ctx: WinCtxValue, dest: string) {
  const cb = ctx.doc.clipboard;
  if (!cb || !canWrite(ctx.doc, dest)) return;
  perItem(ctx, cb.paths, cb.mode === "cut" ? "fs.move" : "fs.copyTo", realPath(ctx.doc, dest));
}

export function deleteSelected(ctx: WinCtxValue, permanent: boolean, only?: string[]) {
  const paths = only ?? selPaths(ctx.sel);
  if (!paths.length) return;
  const removable = paths.some((p) => ["usb", "network"].includes(rootOf(ctx.doc, p)?.root ?? ""));
  if (permanent || removable) {
    const first = getItem(ctx.doc, paths[0]);
    ctx.modal(
      <ConfirmDelete
        count={paths.length}
        item={first}
        onYes={() => {
          ctx.modal(null);
          perItem(ctx, paths, permanent ? "fs.deletePermanent" : "fs.delete");
        }}
        onNo={() => ctx.modal(null)}
      />,
    );
    return;
  }
  perItem(ctx, paths, "fs.delete");
}

function ConfirmDelete({ count, item, onYes, onNo }: { count: number; item: WinItem | null; onYes: () => void; onNo: () => void }) {
  return (
    <Modal
      title={count > 1 ? "Delete Multiple Items" : isFolder(item) ? "Delete Folder" : "Delete File"}
      onClose={onNo}
      footer={
        <>
          <Btn primary onClick={onYes} label="Yes">Yes</Btn>
          <Btn onClick={onNo} label="No">No</Btn>
        </>
      }
    >
      <p className="mb-3">{count > 1 ? `Are you sure you want to permanently delete these ${count} items?` : `Are you sure you want to permanently delete this ${isFolder(item) ? "folder" : "file"}?`}</p>
      {count === 1 && item && (
        <div className="flex items-center gap-3">
          <FileArt kind={itemArt(item)} s={40} />
          <div className="text-[12px]">
            <div className="font-semibold">{item.name}</div>
            <div style={{ color: T.sub }}>Type: {fileType(item)}</div>
            {!isFolder(item) && <div style={{ color: T.sub }}>Size: {sizeOf(item)}</div>}
            <div style={{ color: T.sub }}>Date modified: {item.modified ?? ""}</div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export function openProperties(ctx: WinCtxValue, path?: string) {
  const p = path ?? selPaths(ctx.sel)[0];
  if (!p) return;
  ctx.modal(<PropertiesDialog path={p} />);
}

function PropertiesDialog({ path }: { path: string }) {
  const ctx = useWin();
  const it = getItem(ctx.doc, path);
  const [ro, setRo] = useState(Boolean(it?.readonly));
  const [hid, setHid] = useState(Boolean(it?.hidden));
  if (!it) return null;
  const r = ctx.doc.fs.find((x) => x.name === realPath(ctx.doc, path));
  const drive = r && ["drive", "usb", "network"].includes(r.root);
  const apply = () => {
    ctx.select(`file:${realPath(ctx.doc, path)}`);
    if (ro !== Boolean(it.readonly)) ctx.cmd("fs.attr", `readonly=${ro ? "on" : "off"}`);
    if (hid !== Boolean(it.hidden)) ctx.cmd("fs.attr", `hidden=${hid ? "on" : "off"}`);
  };
  const count = flatten(ctx.doc, path);
  return (
    <Modal
      title={`${r?.label ?? it.name} Properties`}
      width={380}
      onClose={() => ctx.modal(null)}
      footer={
        <>
          <Btn primary label="OK" onClick={() => { ctx.modal(null); apply(); }}>OK</Btn>
          <Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn>
          <Btn label="Apply" onClick={apply}>Apply</Btn>
        </>
      }
    >
      <div className="mb-2 flex gap-4 border-b pb-1 text-[12px]" style={{ borderColor: T.line }}>
        <span className="border-b-2 pb-1 font-semibold" style={{ borderColor: T.accent }}>General</span>
        <span style={{ color: T.sub }}>{drive ? "Tools" : "Sharing"}</span>
        <span style={{ color: T.sub }}>Security</span>
        <span style={{ color: T.sub }}>Previous Versions</span>
      </div>
      <div className="flex items-center gap-3 border-b py-3" style={{ borderColor: T.line }}>
        <FileArt kind={r ? rootArt(r) : itemArt(it)} s={34} />
        <span className="font-semibold">{r?.label ?? it.name}</span>
      </div>
      {drive ? (
        <div className="space-y-1.5 py-3 text-[12px]">
          <div className="flex justify-between"><span>Type:</span><span>{r.root === "usb" ? "USB Drive" : r.root === "network" ? "Network Connection" : "Local Disk"}</span></div>
          <div className="flex justify-between"><span>File system:</span><span>{r.root === "usb" ? "exFAT" : "NTFS"}</span></div>
          <div className="flex justify-between"><span>Used space:</span><span>{r.free && r.capacity ? `${(parseFloat(r.capacity) - parseFloat(r.free)).toFixed(0)} GB` : ""}</span></div>
          <div className="flex justify-between"><span>Free space:</span><span>{r.free ?? ""}</span></div>
          <div className="flex justify-between font-semibold"><span>Capacity:</span><span>{r.capacity ?? ""}</span></div>
          <div className="mx-auto mt-3 h-16 w-16 rounded-full" style={{ background: `conic-gradient(#2b88d8 0 ${r.free && r.capacity ? 100 - (parseFloat(r.free) / parseFloat(r.capacity)) * 100 : 40}%, #c7a3f1 0)` }} />
        </div>
      ) : (
        <div className="space-y-1.5 py-3 text-[12px]">
          <div className="flex justify-between gap-4"><span>Type of file:</span><span className="text-right">{fileType(it)}{extOf(it.name) ? ` (${extOf(it.name)})` : ""}</span></div>
          <div className="flex justify-between gap-4"><span>Location:</span><span className="truncate text-right">{addressText(ctx.doc, parentOf(realPath(ctx.doc, path)))}</span></div>
          {isFolder(it) ? (
            <div className="flex justify-between gap-4"><span>Contains:</span><span>{count.filter((x) => !isFolder(x.item)).length} Files, {count.filter((x) => isFolder(x.item)).length} Folders</span></div>
          ) : (
            <div className="flex justify-between gap-4"><span>Size:</span><span>{sizeOf(it)}</span></div>
          )}
          <div className="flex justify-between gap-4"><span>Created:</span><span>{it.created ?? it.modified ?? ""}</span></div>
          <div className="flex justify-between gap-4"><span>Modified:</span><span>{it.modified ?? ""}</span></div>
          <div className="flex items-center gap-4 border-t pt-3" style={{ borderColor: T.line }}>
            <span>Attributes:</span>
            <label className="flex items-center gap-1.5"><input type="checkbox" aria-label="Read-only" checked={ro} onChange={(e) => setRo(e.target.checked)} /> Read-only</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" aria-label="Hidden" checked={hid} onChange={(e) => setHid(e.target.checked)} /> Hidden</label>
          </div>
        </div>
      )}
    </Modal>
  );
}

export function openExtract(ctx: WinCtxValue, path?: string) {
  const p = path ?? selPaths(ctx.sel)[0];
  if (!p) return;
  ctx.modal(<ExtractDialog path={p} />);
}

function ExtractDialog({ path }: { path: string }) {
  const ctx = useWin();
  const real = realPath(ctx.doc, path);
  const [dest, setDest] = useState(addressText(ctx.doc, `${parentOf(real)}/${baseOf(real).replace(/\.zip$/i, "")}`));
  const [show, setShow] = useState(true);
  return (
    <Modal
      title="Extract Compressed (Zipped) Folders"
      width={480}
      onClose={() => ctx.modal(null)}
      footer={
        <>
          <Btn primary label="Extract" onClick={() => { ctx.modal(null); ctx.select(`file:${real}`); ctx.cmd("fs.extract", parseAddress(ctx.doc, dest)); }}>Extract</Btn>
          <Btn label="Cancel" onClick={() => ctx.modal(null)}>Cancel</Btn>
        </>
      }
    >
      <p className="mb-3 text-[15px]" style={{ color: "#1a4e8a" }}>Select a Destination and Extract Files</p>
      <p className="mb-1">Files will be extracted to this folder:</p>
      <div className="mb-3 flex gap-2">
        <TextIn label="Destination folder" value={dest} onChange={setDest} width="100%" />
        <Btn label="Browse">Browse...</Btn>
      </div>
      <label className="flex items-center gap-2"><input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} aria-label="Show extracted files when complete" /> Show extracted files when complete</label>
    </Modal>
  );
}

/** The Windows share sheet for local files (non-OneDrive). */
function ShareSheet({ name }: { name: string }) {
  const ctx = useWin();
  const pick = (app: string) => {
    ctx.modal(null);
    ctx.cmd("share.app", app);
  };
  return (
    <Modal title="Share" width={360} onClose={() => ctx.modal(null)}>
      <div className="mb-3 flex items-center gap-3 rounded p-2" style={{ background: T.bg }}>
        <FileArt kind={kindForName(name, false)} s={28} />
        <span className="truncate">{name}</span>
      </div>
      <div className="mb-2 text-[11px] font-semibold">Nearby sharing</div>
      <p className="mb-3 text-[11px]" style={{ color: T.sub }}>Nearby sharing is off. Turn it on in Settings to share with devices near you.</p>
      <div className="mb-2 text-[11px] font-semibold">Share using</div>
      <div className="flex gap-2">
        {[["outlook", "Outlook"], ["teams", "Microsoft Teams"], ["mail", "Email a contact"]].map(([id, label]) => (
          <button key={id} type="button" aria-label={label} onClick={() => pick(label)} className="flex w-24 flex-col items-center gap-1 rounded p-2 text-[11px] hover:bg-[var(--w-hover)]">
            <G n={id === "mail" ? "mail" : "people"} s={22} />
            {label}
          </button>
        ))}
      </div>
    </Modal>
  );
}

export function shareSelected(ctx: WinCtxValue, path?: string) {
  const p = path ?? selPaths(ctx.sel)[0];
  if (!p) return;
  const r = rootOf(ctx.doc, p);
  if (r?.root === "onedrive" || r?.root === "gdrive") ctx.share(realPath(ctx.doc, p), r.root === "gdrive" ? "google" : "ms");
  else ctx.modal(<ShareSheet name={baseOf(p)} />);
}

export function newMenu(ctx: WinCtxValue, loc: string): MItem[] {
  const ok = canWrite(ctx.doc, loc);
  const nf = (name: string) => () => ctx.cmd("fs.newFile", `${realPath(ctx.doc, loc)}/${name}`);
  return [
    { label: "Folder", icon: "newFolder", disabled: !ok, onClick: () => ctx.cmd("fs.newFolder", realPath(ctx.doc, loc)), shortcut: "Ctrl+Shift+N" },
    { label: "Shortcut", icon: "link", disabled: true },
    { sep: true },
    { label: "Bitmap image", icon: "app", disabled: !ok, onClick: nf("New Bitmap image.bmp") },
    { label: "Microsoft Word Document", icon: "properties", disabled: !ok, onClick: nf("New Microsoft Word Document.docx") },
    { label: "Microsoft Excel Worksheet", icon: "grid", disabled: !ok, onClick: nf("New Microsoft Excel Worksheet.xlsx") },
    { label: "Microsoft PowerPoint Presentation", icon: "app", disabled: !ok, onClick: nf("New Microsoft PowerPoint Presentation.pptx") },
    { label: "Text Document", icon: "properties", disabled: !ok, onClick: nf("New Text Document.txt") },
    { label: "Compressed (zipped) Folder", icon: "compress", disabled: !ok, onClick: nf("New Compressed (zipped) Folder.zip") },
  ];
}

export function viewItems(ctx: WinCtxValue, w: WinWindow | undefined, desktop = false): MItem[] {
  const v = w?.view ?? "details";
  const opt = (label: string, val: string) => ({ label, dot: v === val, onClick: () => ctx.cmd("explorer.view", label) });
  if (desktop) return [{ label: "Large icons", onClick: () => undefined }, { label: "Medium icons", dot: true, onClick: () => undefined }, { label: "Small icons", onClick: () => undefined }, { sep: true }, { label: "Auto arrange icons", check: true }, { label: "Align icons to grid", check: true }, { label: "Show desktop icons", check: true }];
  const tog = (label: string, key: string) => ({ label, check: S(ctx.doc, `explorer.${key}`) === "on" || (key === "navpane" && S(ctx.doc, "explorer.navpane") !== "off"), onClick: () => ctx.cmd("explorer.toggle", key) });
  return [
    opt("Extra large icons", "extralarge"),
    opt("Large icons", "large"),
    opt("Medium icons", "medium"),
    opt("Small icons", "small"),
    opt("List", "list"),
    opt("Details", "details"),
    opt("Tiles", "tiles"),
    opt("Content", "content"),
    { sep: true },
    { label: "Show", sub: [tog("Navigation pane", "navpane"), tog("Details pane", "details"), tog("Preview pane", "preview"), tog("Item check boxes", "checkboxes"), tog("File name extensions", "extensions"), tog("Hidden items", "hidden")] },
  ];
}

export function sortItems(ctx: WinCtxValue, w: WinWindow | undefined): MItem[] {
  const s = w?.sort ?? "name";
  const opt = (label: string, val: string) => ({ label, dot: s === val, onClick: () => ctx.cmd("explorer.sort", label) });
  return [
    opt("Name", "name"),
    opt("Date modified", "date"),
    opt("Type", "type"),
    opt("Size", "size"),
    { sep: true },
    { label: "Ascending", dot: (w?.dir ?? "asc") === "asc", onClick: () => ctx.cmd("explorer.sortDir", "Ascending") },
    { label: "Descending", dot: w?.dir === "desc", onClick: () => ctx.cmd("explorer.sortDir", "Descending") },
    { sep: true },
    { label: "Group by", sub: ["None", "Name", "Date modified", "Type"].map((g) => ({ label: g, dot: (w?.group || "none") === g.toLowerCase(), onClick: () => ctx.cmd("explorer.group", g) })) },
  ];
}

/** Right-click menu for an item (and the rest of the selection when it is part of it). */
export function itemMenu(ctx: WinCtxValue, e: { clientX: number; clientY: number }, entry: Entry, opts: { bin?: boolean } = {}) {
  const doc = ctx.doc;
  if (opts.bin || entry.bin) {
    const cur = selPaths(ctx.sel, "bin:");
    const names = cur.includes(entry.name) ? cur : [entry.name];
    ctx.menu(e, [
      { label: "Restore", icon: "restoreItem", onClick: () => perItem(ctx, names, "bin.restore", undefined, "bin:") },
      { sep: true },
      { label: "Delete", icon: "delete", onClick: () => ctx.modal(<ConfirmDelete count={names.length} item={entry.item ?? null} onYes={() => { ctx.modal(null); perItem(ctx, names, "bin.delete", undefined, "bin:"); }} onNo={() => ctx.modal(null)} />) },
      { label: "Properties", icon: "properties", disabled: true },
    ]);
    return;
  }
  const cur = selPaths(ctx.sel);
  const paths = cur.some((p) => p.toLowerCase() === entry.path.toLowerCase()) ? cur : [entry.path];
  const single = paths.length <= 1;
  const selectAll = () => ctx.select(paths.map((p) => `file:${p}`).join(","));
  const r = rootOf(doc, entry.path);
  const od = r?.root === "onedrive";
  const isZip = extOf(entry.name) === ".zip";
  const rootItem = Boolean(entry.root);
  const quick = (doc.quick ?? []).includes(entry.path);
  const top: MItem[] = [
    { label: "Cut", icon: "cut", disabled: rootItem, onClick: () => { selectAll(); ctx.cmd("fs.cut"); } },
    { label: "Copy", icon: "copy", onClick: () => { selectAll(); ctx.cmd("fs.copy"); } },
    { label: "Rename", icon: "rename", disabled: !single || rootItem, onClick: () => { ctx.select(entry.key); ctx.setRenaming(entry.path); } },
    { label: "Share", icon: "share", disabled: entry.folder && !od, onClick: () => shareSelected(ctx, entry.path) },
    { label: "Delete", icon: "delete", disabled: rootItem, onClick: () => deleteSelected(ctx, false, paths) },
  ];
  const items: MItem[] = [
    { label: "Open", icon: "open", shortcut: "Enter", onClick: () => ctx.cmd("fs.open", entry.path) },
  ];
  if (!entry.folder) items.push({ label: "Open with", icon: "app", sub: [{ label: "Notepad", onClick: () => ctx.cmd("win.open", "notepad") }, { label: "Microsoft Edge", onClick: () => ctx.cmd("fs.open", entry.path) }, { label: "Choose another app", disabled: true }] });
  if (isZip) items.push({ label: "Extract All...", icon: "extract", onClick: () => openExtract(ctx, entry.path) });
  if (!rootItem) items.push({ label: "Compress to ZIP file", icon: "compress", onClick: () => { selectAll(); ctx.cmd("fs.compress"); } });
  items.push({ label: "Copy as path", icon: "link", shortcut: "Ctrl+Shift+C", onClick: () => ctx.addClip(`"${addressText(doc, entry.path)}"`) });
  if (entry.folder) items.push(quick ? { label: "Unpin from Quick access", icon: "pin", onClick: () => ctx.cmd("fs.unpinQuick", entry.path) } : { label: "Pin to Quick access", icon: "pin", onClick: () => perItem(ctx, paths, "fs.pinQuick") });
  else items.push({ label: "Add to Favorites", icon: "star", onClick: () => perItem(ctx, paths, "fs.pinQuick") });
  items.push({ label: "Properties", icon: "properties", shortcut: "Alt+Enter", onClick: () => openProperties(ctx, entry.path) });
  if (od) {
    items.push(
      { sep: true },
      { label: "Share", icon: "share", onClick: () => shareSelected(ctx, entry.path) },
      { label: "Manage access", icon: "people", onClick: () => shareSelected(ctx, entry.path) },
      { label: "View online", icon: "globe", onClick: () => { ctx.cmd("edge.nav", "onedrive.live.com"); ctx.cmd("cloud.open", entry.folder ? entry.path : parentOf(entry.path)); if (!entry.folder) ctx.cmd("cloud.open", entry.path); } },
      { label: "Version history", icon: "history", disabled: entry.folder, onClick: () => { ctx.cmd("edge.nav", "onedrive.live.com"); ctx.cmd("cloud.open", entry.path); } },
      { sep: true },
      { label: "Always keep on this device", icon: "cloudCheck", check: entry.item?.sync === "always", onClick: () => perItem(ctx, paths, "od.keep") },
      { label: "Free up space", icon: "cloud", onClick: () => perItem(ctx, paths, "od.free") },
    );
  }
  items.push({ sep: true }, { label: "Show more options", icon: "more", disabled: true });
  ctx.menu(e, items, top);
}

export function backgroundMenu(ctx: WinCtxValue, e: { clientX: number; clientY: number }, loc: string, w?: WinWindow) {
  const bin = loc === "Recycle Bin";
  ctx.menu(e, [
    { label: "View", icon: "view", sub: viewItems(ctx, w) },
    { label: "Sort by", icon: "sort", sub: sortItems(ctx, w).slice(0, 7) },
    { label: "Group by", icon: "details", sub: ["None", "Name", "Date modified", "Type"].map((g) => ({ label: g, dot: (w?.group || "none") === g.toLowerCase(), onClick: () => ctx.cmd("explorer.group", g) })) },
    { sep: true },
    ...(bin
      ? [
          { label: "Empty Recycle Bin", icon: "delete", disabled: !(ctx.doc.recycle ?? []).length, onClick: () => confirmEmpty(ctx) },
          { label: "Restore all items", icon: "restoreItem", disabled: !(ctx.doc.recycle ?? []).length, onClick: () => ctx.cmd("bin.restoreAll") },
        ]
      : [
          { label: "Undo", icon: "restoreItem", shortcut: "Ctrl+Z", disabled: !(ctx.doc.undo ?? []).length, onClick: () => ctx.cmd("fs.undo") },
          { label: "Paste", icon: "paste", shortcut: "Ctrl+V", disabled: !ctx.doc.clipboard || !canWrite(ctx.doc, loc), onClick: () => pasteInto(ctx, loc) },
          { label: "New", icon: "newc", disabled: !canWrite(ctx.doc, loc), sub: newMenu(ctx, loc) },
        ]),
    { sep: true },
    { label: "Properties", icon: "properties", disabled: !canWrite(ctx.doc, loc), onClick: () => { ctx.select(`file:${realPath(ctx.doc, loc)}`); ctx.modal(<PropertiesDialog path={loc} />); } },
    { label: "Open in Terminal", icon: "cmd", onClick: () => ctx.cmd("win.open", "cmd") },
    { label: "Show more options", icon: "more", disabled: true },
  ]);
}

export function confirmEmpty(ctx: WinCtxValue) {
  const n = (ctx.doc.recycle ?? []).length;
  ctx.modal(
    <Modal
      title="Delete Multiple Items"
      onClose={() => ctx.modal(null)}
      footer={
        <>
          <Btn primary label="Yes" onClick={() => { ctx.modal(null); ctx.cmd("bin.empty"); }}>Yes</Btn>
          <Btn label="No" onClick={() => ctx.modal(null)}>No</Btn>
        </>
      }
    >
      <p>{n === 1 ? "Are you sure you want to permanently delete this file?" : `Are you sure you want to permanently delete these ${n} items?`}</p>
    </Modal>,
  );
}

/** Keyboard shortcuts for a folder view (Explorer or the desktop). Returns true when handled. */
export function fileKeys(e: React.KeyboardEvent, ctx: WinCtxValue, loc: string, entries: Entry[]): boolean {
  const ctrl = e.ctrlKey || e.metaKey;
  const k = e.key.toLowerCase();
  const paths = selPaths(ctx.sel);
  const binSel = ctx.sel.startsWith("bin:");
  if (ctrl && !e.shiftKey && k === "a") {
    ctx.select(entries.map((x) => x.key).join(","));
    return true;
  }
  if (ctrl && !e.shiftKey && k === "c" && paths.length) {
    ctx.cmd("fs.copy");
    return true;
  }
  if (ctrl && !e.shiftKey && k === "x" && paths.length) {
    ctx.cmd("fs.cut");
    return true;
  }
  if (ctrl && !e.shiftKey && k === "v") {
    pasteInto(ctx, loc);
    return true;
  }
  if (ctrl && !e.shiftKey && k === "z") {
    ctx.cmd("fs.undo");
    return true;
  }
  if (ctrl && e.shiftKey && k === "n") {
    if (canWrite(ctx.doc, loc)) ctx.cmd("fs.newFolder", realPath(ctx.doc, loc));
    return true;
  }
  if (ctrl && e.shiftKey && k === "c" && paths.length) {
    ctx.addClip(`"${addressText(ctx.doc, paths[0])}"`);
    return true;
  }
  if (e.key === "F2" && paths.length === 1) {
    ctx.setRenaming(realPath(ctx.doc, paths[0]));
    return true;
  }
  if (e.key === "Delete") {
    if (binSel) {
      ctx.modal(<ConfirmDelete count={1} item={null} onYes={() => { ctx.modal(null); perItem(ctx, selPaths(ctx.sel, "bin:"), "bin.delete", undefined, "bin:"); }} onNo={() => ctx.modal(null)} />);
      return true;
    }
    if (paths.length) deleteSelected(ctx, e.shiftKey);
    return true;
  }
  if (e.key === "Enter" && paths.length === 1) {
    if (e.altKey) openProperties(ctx);
    else ctx.cmd("fs.open", paths[0]);
    return true;
  }
  if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
    if (!entries.length) return false;
    const i = entries.findIndex((x) => x.key === ctx.sel.split(",")[0]);
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const n = Math.max(0, Math.min(entries.length - 1, i < 0 ? 0 : i + step));
    ctx.select(entries[n].key);
    return true;
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* Drag and drop                                                       */
/* ------------------------------------------------------------------ */

export const DND = "application/x-win-paths";

export function startItemDrag(e: React.DragEvent, ctx: WinCtxValue, entry: Entry) {
  let paths = selPaths(ctx.sel);
  if (!paths.some((p) => p.toLowerCase() === entry.path.toLowerCase())) {
    paths = [entry.path];
    ctx.select(entry.key);
  }
  e.dataTransfer.setData(DND, JSON.stringify(paths));
  e.dataTransfer.setData("text/plain", paths.join("\n"));
  e.dataTransfer.effectAllowed = "copyMove";
}

/** Same drive moves, a different drive copies (like Windows). Ctrl forces copy, Shift forces move. */
export function dropMode(doc: WinDoc, paths: string[], dest: string, e: { ctrlKey: boolean; shiftKey: boolean; metaKey?: boolean }): "move" | "copy" {
  if (e.ctrlKey || e.metaKey) return "copy";
  if (e.shiftKey) return "move";
  const drv = (p: string) => {
    const r = rootOf(doc, p)?.root;
    return r === "usb" || r === "network" ? rootOf(doc, p)?.name : r === "gdrive" ? "gdrive" : "C";
  };
  return paths.some((p) => drv(p) !== drv(dest)) ? "copy" : "move";
}

export function dropOnto(e: React.DragEvent, ctx: WinCtxValue, dest: string) {
  e.preventDefault();
  e.stopPropagation();
  const raw = e.dataTransfer.getData(DND);
  if (!raw) return;
  let paths: string[] = [];
  try {
    paths = JSON.parse(raw) as string[];
  } catch {
    return;
  }
  if (dest === "Recycle Bin") {
    perItem(ctx, paths, "fs.delete");
    return;
  }
  if (!canWrite(ctx.doc, dest)) return;
  if (paths.some((p) => p.toLowerCase() === dest.toLowerCase())) return;
  const mode = dropMode(ctx.doc, paths, dest, e);
  if (mode === "move" && paths.every((p) => parentOf(p).toLowerCase() === realPath(ctx.doc, dest).toLowerCase())) return;
  perItem(ctx, paths, mode === "move" ? "fs.move" : "fs.copyTo", realPath(ctx.doc, dest));
}

export function dragOver(e: React.DragEvent, doc: WinDoc, dest: string, setHint?: (h: string | null) => void) {
  if (!Array.from(e.dataTransfer.types).includes(DND)) return;
  e.preventDefault();
  e.stopPropagation();
  const copy = e.ctrlKey || e.metaKey;
  const cross = ["usb", "network"].includes(rootOf(doc, dest)?.root ?? "");
  const mode = dest === "Recycle Bin" ? "Move to" : copy || (cross && !e.shiftKey) ? "Copy to" : "Move to";
  e.dataTransfer.dropEffect = mode === "Copy to" ? "copy" : "move";
  setHint?.(`${mode} ${locTitle(doc, dest)}`);
}

/* ------------------------------------------------------------------ */
/* Rename box                                                          */
/* ------------------------------------------------------------------ */

export function RenameBox({ entry, className = "", center }: { entry: Entry; className?: string; center?: boolean }) {
  const ctx = useWin();
  const showExt = S(ctx.doc, "explorer.extensions") === "on";
  const it = entry.item;
  const ext = it && !entry.folder ? extOf(it.name) : "";
  const initial = entry.folder ? entry.name : showExt ? entry.name : entry.label;
  const [val, setVal] = useState(initial);
  const [err, setErr] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    const end = showExt && ext ? initial.length - ext.length : initial.length;
    el.setSelectionRange(0, Math.max(0, end));
  }, [initial, ext, showExt]);
  const finish = (cancel: boolean) => {
    if (done.current) return;
    if (cancel) {
      done.current = true;
      ctx.setRenaming(null);
      ctx.focusRoot();
      return;
    }
    const typed = val.trim();
    if (!typed) {
      done.current = true;
      ctx.setRenaming(null);
      return;
    }
    if (INVALID_NAME.test(typed)) {
      setErr('A file name can\'t contain any of the following characters: \\ / : * ? " < > |');
      return;
    }
    let final = typed;
    if (!entry.folder && !showExt && ext && !typed.toLowerCase().endsWith(ext)) final = typed + ext;
    if (final === entry.name) {
      done.current = true;
      ctx.setRenaming(null);
      ctx.focusRoot();
      return;
    }
    const send = () => {
      done.current = true;
      ctx.setRenaming(null);
      ctx.commit({ kind: "type", target: entry.path, value: final });
      ctx.focusRoot();
    };
    if (!entry.folder && showExt && ext && extOf(final) !== ext) {
      ctx.modal(
        <Modal
          title="Rename"
          onClose={() => ctx.modal(null)}
          footer={
            <>
              <Btn primary label="Yes" onClick={() => { ctx.modal(null); send(); }}>Yes</Btn>
              <Btn label="No" onClick={() => { ctx.modal(null); ref.current?.focus(); }}>No</Btn>
            </>
          }
        >
          <div className="flex items-start gap-3">
            <span className="text-amber-500"><G n="warn" s={28} /></span>
            <p>If you change a file name extension, the file might become unusable.<br />Are you sure you want to change it?</p>
          </div>
        </Modal>,
      );
      return;
    }
    send();
  };
  return (
    <span className={`relative ${className}`} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
      <input
        ref={ref}
        aria-label="Rename"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          setErr(null);
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") finish(false);
          if (e.key === "Escape") finish(true);
        }}
        onBlur={() => finish(false)}
        className={`w-full rounded-sm px-1 text-[12px] outline-none ${center ? "text-center" : ""}`}
        style={{ border: `1px solid ${T.accent}`, background: T.input, color: T.text }}
      />
      {err && <span className="absolute left-0 top-full z-50 mt-1 w-64 rounded border bg-[#fffde7] p-2 text-[11px] text-black shadow">{err}</span>}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Explorer window                                                     */
/* ------------------------------------------------------------------ */

function SyncIcon({ s }: { s?: string }) {
  if (!s) return null;
  const map: Record<string, { n: string; c: string; t: string }> = {
    cloud: { n: "cloud", c: "#0f6cbd", t: "Available when online" },
    local: { n: "cloudCheck", c: "#107c10", t: "Available on this device" },
    always: { n: "check", c: "#fff", t: "Always available on this device" },
    syncing: { n: "sync", c: "#0f6cbd", t: "Sync pending" },
    error: { n: "close", c: "#fff", t: "Sync error" },
  };
  const m = map[s];
  if (!m) return null;
  const solid = s === "always" || s === "error";
  return (
    <span title={m.t} aria-label={m.t} className="inline-flex h-4 w-4 items-center justify-center rounded-full" style={{ background: solid ? (s === "error" ? "#c42b1c" : "#107c10") : "transparent", color: m.c }}>
      <G n={m.n} s={solid ? 11 : 15} />
    </span>
  );
}

function NavNode({ path, label, art, depth, w, expanded, toggle, hasKids, pin }: { path: string; label: string; art: string; depth: number; w: WinWindow; expanded: boolean; toggle: () => void; hasKids: boolean; pin?: boolean }) {
  const ctx = useWin();
  const [hint, setHint] = useState<string | null>(null);
  const active = (w.loc ?? "Home").toLowerCase() === path.toLowerCase() && !w.search;
  return (
    <div
      className="relative flex h-7 cursor-default items-center gap-1 rounded pr-2 text-[12px] hover:bg-[var(--w-hover)]"
      style={{ paddingLeft: 4 + depth * 14, background: active ? T.press : undefined }}
      onClick={() => ctx.cmd("explorer.nav", path)}
      onContextMenu={(e) => {
        e.preventDefault();
        if (SPECIAL.includes(path)) return;
        const en = entryOf(ctx.doc, path, false);
        if (!en) return;
        ctx.select(en.key);
        itemMenu(ctx, e, en);
      }}
      onDragOver={(e) => dragOver(e, ctx.doc, path, setHint)}
      onDragLeave={() => setHint(null)}
      onDrop={(e) => {
        setHint(null);
        dropOnto(e, ctx, path);
      }}
      role="treeitem"
      aria-label={label}
      aria-selected={active}
    >
      {active && <span className="absolute left-0 top-1.5 h-4 w-[3px] rounded" style={{ background: T.accent }} />}
      <button
        type="button"
        aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        className={`flex h-5 w-4 items-center justify-center ${hasKids ? "" : "invisible"}`}
        style={{ color: T.sub }}
      >
        <G n={expanded ? "chevD" : "chevR"} s={10} />
      </button>
      <FileArt kind={art} s={16} />
      <span className="ml-1 flex-1 truncate">{label}</span>
      {pin && <span style={{ color: T.sub }}><G n="pin" s={11} /></span>}
      {hint && <span className="absolute left-8 top-full z-50 whitespace-nowrap rounded bg-white px-2 py-0.5 text-[11px] text-black shadow">{hint}</span>}
    </div>
  );
}

function NavPane({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const loc = w.loc ?? "Home";
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const ancestors = useMemo(() => {
    const segs = splitPath(loc);
    return new Set(segs.map((_, i) => segs.slice(0, i + 1).join("/").toLowerCase()));
  }, [loc]);
  const isOpen = (p: string) => open[p.toLowerCase()] ?? ancestors.has(p.toLowerCase());
  const toggle = (p: string) => setOpen((o) => ({ ...o, [p.toLowerCase()]: !isOpen(p) }));
  const subFolders = (p: string) => (getItem(doc, p)?.children ?? []).filter((c) => isFolder(c) && !c.zip && (!c.hidden || S(doc, "explorer.hidden") === "on"));
  const tree = (p: string, label: string, art: string, depth: number, pin?: boolean): React.ReactNode => {
    const kids = subFolders(p);
    return (
      <div key={`${p}-${depth}-${label}`}>
        <NavNode path={p} label={label} art={art} depth={depth} w={w} expanded={isOpen(p)} toggle={() => toggle(p)} hasKids={kids.length > 0} pin={pin} />
        {isOpen(p) && kids.map((k) => tree(`${p}/${k.name}`, k.name, "folder", depth + 1))}
      </div>
    );
  };
  const od = doc.fs.filter((r) => r.root === "onedrive");
  const pc = [...userRoots(doc), ...driveRoots(doc)];
  const [pcOpen, setPcOpen] = useState(true);
  return (
    <div className="w-[190px] shrink-0 overflow-auto px-1 py-1" style={{ borderRight: `1px solid ${T.line}` }} role="tree" aria-label="Navigation pane">
      <NavNode path="Home" label="Home" art="home" depth={0} w={w} expanded={false} toggle={() => undefined} hasKids={false} />
      {od.map((r) => tree(r.name, r.label ?? r.name, "onedrive", 0))}
      <div className="my-1 border-t" style={{ borderColor: T.line }} />
      {userRoots(doc).map((r) => (
        <NavNode key={`q-${r.name}`} path={r.name} label={r.label ?? r.name} art={rootArt(r)} depth={0} w={w} expanded={false} toggle={() => undefined} hasKids={false} pin />
      ))}
      {(doc.quick ?? []).filter((p) => getItem(doc, p)).map((p) => (
        <NavNode key={`qp-${p}`} path={p} label={baseOf(p)} art="folder" depth={0} w={w} expanded={false} toggle={() => undefined} hasKids={false} pin />
      ))}
      <div className="my-1 border-t" style={{ borderColor: T.line }} />
      <NavNode path="This PC" label="This PC" art="thispc" depth={0} w={w} expanded={pcOpen} toggle={() => setPcOpen((o) => !o)} hasKids />
      {pcOpen && pc.map((r) => tree(r.name, r.label ?? r.name, rootArt(r), 1))}
      {doc.fs.some((r) => r.root === "network") && <NavNode path="Network" label="Network" art="network" depth={0} w={w} expanded={false} toggle={() => undefined} hasKids={false} />}
    </div>
  );
}

function Address({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const loc = w.loc ?? "Home";
  const [edit, setEdit] = useState<string | null>(null);
  const parts = crumbs(doc, loc);
  const segs = splitPath(realPath(doc, loc));
  const pathFor = (i: number) => {
    if (SPECIAL.includes(loc)) return loc;
    if (parts[0] === "This PC") return i === 0 ? "This PC" : segs.slice(0, i).join("/");
    return segs.slice(0, i + 1).join("/");
  };
  if (edit !== null)
    return (
      <input
        autoFocus
        aria-label="Address bar"
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
        onFocus={(e) => e.target.select()}
        onBlur={() => setEdit(null)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") {
            const to = parseAddress(doc, edit);
            setEdit(null);
            ctx.cmd("explorer.nav", to);
          }
          if (e.key === "Escape") setEdit(null);
        }}
        className="h-8 min-w-0 flex-1 rounded px-2 text-[12px] outline-none"
        style={{ background: T.input, border: `1px solid ${T.accent}`, color: T.text }}
      />
    );
  return (
    <div className="flex h-8 min-w-0 flex-1 items-center rounded px-1 text-[12px]" style={{ background: T.input, border: `1px solid ${T.line}` }} onClick={() => setEdit(addressText(doc, loc))}>
      <span className="px-1"><FileArt kind={loc === "Home" ? "home" : loc === "This PC" ? "thispc" : loc === "Recycle Bin" ? "recycle" : rootOf(doc, loc) && segs.length === 1 ? rootArt(rootOf(doc, loc)!) : "folder"} s={16} /></span>
      <G n="chevR" s={10} style={{ color: T.sub }} />
      {w.search ? (
        <span className="px-1.5">Search Results in {locTitle(doc, loc)}</span>
      ) : (
        parts.map((p, i) => (
          <span key={i} className="flex min-w-0 items-center">
            <button
              type="button"
              aria-label={p}
              onClick={(e) => {
                e.stopPropagation();
                ctx.cmd("explorer.nav", pathFor(i));
              }}
              className="truncate rounded px-1.5 py-0.5 hover:bg-[var(--w-hover)]"
            >
              {i === 0 && doc.fs.find((r) => r.name === p)?.label ? doc.fs.find((r) => r.name === p)!.label : p}
            </button>
            {i < parts.length - 1 && <G n="chevR" s={10} style={{ color: T.sub }} />}
          </span>
        ))
      )}
      <span className="flex-1" />
    </div>
  );
}

function SearchBox({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const [q, setQ] = useState(w.search ?? "");
  useEffect(() => setQ(w.search ?? ""), [w.search, w.loc]);
  return (
    <div className="flex h-8 w-[200px] shrink-0 items-center gap-1 rounded px-2" style={{ background: T.input, border: `1px solid ${T.line}` }}>
      <input
        aria-label={`Search ${locTitle(ctx.doc, w.loc ?? "Home")}`}
        placeholder={`Search ${locTitle(ctx.doc, w.loc ?? "Home")}`}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") ctx.cmd("explorer.search", q.trim());
          if (e.key === "Escape") {
            setQ("");
            ctx.cmd("explorer.search", "");
          }
        }}
        className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
        style={{ color: T.text }}
      />
      {q ? (
        <button type="button" aria-label="Clear search" onClick={() => { setQ(""); ctx.cmd("explorer.search", ""); }}><G n="close" s={11} /></button>
      ) : (
        <button type="button" aria-label="Search" onClick={() => ctx.cmd("explorer.search", q.trim())}><G n="search" s={14} /></button>
      )}
    </div>
  );
}

function CmdBtn({ icon, label, onClick, disabled, text, caret }: { icon: string; label: string; onClick?: (e: React.MouseEvent) => void; disabled?: boolean; text?: string; caret?: boolean }) {
  return (
    <button type="button" title={label} aria-label={label} disabled={disabled} onClick={onClick} className="flex h-8 items-center gap-1.5 rounded px-2 text-[12px] hover:bg-[var(--w-hover)] disabled:opacity-35">
      <G n={icon} s={16} />
      {text && <span>{text}</span>}
      {caret && <G n="chevD" s={10} />}
    </button>
  );
}

function CommandBar({ w, entries }: { w: WinWindow; entries: Entry[] }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const loc = w.loc ?? "Home";
  const paths = selPaths(ctx.sel);
  const has = paths.length > 0;
  const bin = loc === "Recycle Bin";
  const writable = canWrite(doc, loc);
  const zipSel = paths.length === 1 && extOf(paths[0]) === ".zip";
  const rootSel = paths.some((p) => doc.fs.some((r) => r.name === realPath(doc, p)));
  const at = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return { clientX: r.left, clientY: r.bottom + 2 };
  };
  if (bin)
    return (
      <div className="flex h-11 shrink-0 items-center gap-0.5 px-3" style={{ borderBottom: `1px solid ${T.line}` }}>
        <CmdBtn icon="delete" label="Empty Recycle Bin" text="Empty Recycle Bin" disabled={!(doc.recycle ?? []).length} onClick={() => confirmEmpty(ctx)} />
        <span className="mx-1 h-5 border-l" style={{ borderColor: T.line }} />
        <CmdBtn icon="restoreItem" label="Restore all items" text="Restore all items" disabled={!(doc.recycle ?? []).length} onClick={() => ctx.cmd("bin.restoreAll")} />
        <CmdBtn icon="restoreItem" label="Restore the selected items" text="Restore the selected items" disabled={!ctx.sel.startsWith("bin:")} onClick={() => perItem(ctx, selPaths(ctx.sel, "bin:"), "bin.restore", undefined, "bin:")} />
        <span className="mx-1 h-5 border-l" style={{ borderColor: T.line }} />
        <CmdBtn icon="delete" label="Delete" disabled={!ctx.sel.startsWith("bin:")} onClick={() => ctx.modal(<ConfirmDelete count={ctx.sel.split(",").length} item={null} onYes={() => { ctx.modal(null); perItem(ctx, selPaths(ctx.sel, "bin:"), "bin.delete", undefined, "bin:"); }} onNo={() => ctx.modal(null)} />)} />
        <CmdBtn icon="sort" label="Sort" text="Sort" caret onClick={(e) => ctx.menu(at(e), sortItems(ctx, w))} />
        <CmdBtn icon="view" label="View" text="View" caret onClick={(e) => ctx.menu(at(e), viewItems(ctx, w))} />
      </div>
    );
  return (
    <div className="flex h-11 shrink-0 items-center gap-0.5 overflow-hidden px-3" style={{ borderBottom: `1px solid ${T.line}` }}>
      <button type="button" aria-label="New" title="New" disabled={!writable} onClick={(e) => ctx.menu(at(e), newMenu(ctx, loc))} className="mr-1 flex h-8 items-center gap-1.5 rounded px-2.5 text-[12px] hover:bg-[var(--w-hover)] disabled:opacity-35" style={{ border: `1px solid ${T.line}` }}>
        <G n="newc" s={16} /> New <G n="chevD" s={10} />
      </button>
      <span className="mx-1 h-5 border-l" style={{ borderColor: T.line }} />
      <CmdBtn icon="cut" label="Cut" disabled={!has || rootSel} onClick={() => ctx.cmd("fs.cut")} />
      <CmdBtn icon="copy" label="Copy" disabled={!has} onClick={() => ctx.cmd("fs.copy")} />
      <CmdBtn icon="paste" label="Paste" disabled={!doc.clipboard || !writable} onClick={() => pasteInto(ctx, loc)} />
      <CmdBtn icon="rename" label="Rename" disabled={paths.length !== 1 || rootSel} onClick={() => ctx.setRenaming(realPath(doc, paths[0]))} />
      <CmdBtn icon="share" label="Share" disabled={paths.length !== 1} onClick={() => shareSelected(ctx)} />
      <CmdBtn icon="delete" label="Delete" disabled={!has || rootSel} onClick={() => deleteSelected(ctx, false)} />
      <span className="mx-1 h-5 border-l" style={{ borderColor: T.line }} />
      <CmdBtn icon="sort" label="Sort" text="Sort" caret onClick={(e) => ctx.menu(at(e), sortItems(ctx, w))} />
      <CmdBtn icon="view" label="View" text="View" caret onClick={(e) => ctx.menu(at(e), viewItems(ctx, w))} />
      {zipSel && (
        <>
          <span className="mx-1 h-5 border-l" style={{ borderColor: T.line }} />
          <CmdBtn icon="extract" label="Extract all" text="Extract all" onClick={() => openExtract(ctx)} />
        </>
      )}
      <CmdBtn
        icon="more"
        label="See more"
        onClick={(e) =>
          ctx.menu(at(e), [
            { label: "Undo", icon: "restoreItem", shortcut: "Ctrl+Z", disabled: !(doc.undo ?? []).length, onClick: () => ctx.cmd("fs.undo") },
            { label: "Pin to Quick access", icon: "pin", disabled: !has, onClick: () => perItem(ctx, paths, "fs.pinQuick") },
            { label: "Compress to ZIP file", icon: "compress", disabled: !has || rootSel, onClick: () => ctx.cmd("fs.compress") },
            { sep: true },
            { label: "Select all", icon: "check", shortcut: "Ctrl+A", onClick: () => ctx.select(entries.map((x) => x.key).join(",")) },
            { label: "Select none", onClick: () => ctx.select("") },
            { label: "Invert selection", onClick: () => ctx.select(entries.filter((x) => !ctx.sel.split(",").includes(x.key)).map((x) => x.key).join(",")) },
            { sep: true },
            { label: "Properties", icon: "properties", shortcut: "Alt+Enter", disabled: !has, onClick: () => openProperties(ctx) },
            { label: "Options", icon: "gear", disabled: true },
          ])
        }
      />
      <span className="flex-1" />
      <button type="button" aria-label="Details pane" title="Details" onClick={() => ctx.cmd("explorer.toggle", "details")} className="flex h-8 items-center gap-1.5 rounded px-2 text-[12px] hover:bg-[var(--w-hover)]" style={{ background: S(doc, "explorer.details") === "on" ? T.press : undefined }}>
        <G n="properties" s={16} /> Details
      </button>
    </div>
  );
}

function EntryRow({ e, w, cols, onDown, selected }: { e: Entry; w: WinWindow; cols: string[]; onDown: (ev: React.MouseEvent, en: Entry) => void; selected: boolean }) {
  const ctx = useWin();
  const [hint, setHint] = useState<string | null>(null);
  const renaming = ctx.renaming && e.path.toLowerCase() === ctx.renaming.toLowerCase();
  const isRoot = Boolean(e.root);
  const drop = e.folder && !e.bin;
  return (
    <div
      role="row"
      aria-selected={selected}
      aria-label={e.label}
      draggable={!e.bin && !isRoot && !e.key.startsWith("zip:")}
      onDragStart={(ev) => startItemDrag(ev, ctx, e)}
      onDragOver={drop ? (ev) => dragOver(ev, ctx.doc, e.path, setHint) : undefined}
      onDragLeave={() => setHint(null)}
      onDrop={drop ? (ev) => { setHint(null); dropOnto(ev, ctx, e.path); } : undefined}
      onMouseDown={(ev) => onDown(ev, e)}
      onDoubleClick={() => (e.bin || e.key.startsWith("zip:") ? undefined : ctx.cmd("fs.open", e.path))}
      onContextMenu={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (!selected) ctx.select(e.key);
        if (!e.key.startsWith("zip:")) itemMenu(ctx, ev, e);
      }}
      className="relative flex h-7 cursor-default items-center rounded-sm text-[12px]"
      style={{ background: selected ? T.sel : hint ? T.hover : undefined, outline: selected ? `1px solid ${T.selLine}` : undefined, outlineOffset: -1 }}
    >
      {cols.map((c) => {
        if (c === "Name")
          return (
            <div key={c} className="flex min-w-0 flex-[2.4] items-center gap-2 px-2">
              {S(ctx.doc, "explorer.checkboxes") === "on" && <input type="checkbox" readOnly checked={selected} aria-label={`Select ${e.label}`} className="h-3.5 w-3.5" />}
              <span className="relative">
                <FileArt kind={e.art} s={18} />
                {e.item?.app && <span className="absolute -bottom-0.5 -left-0.5"><FileArt kind="shortcut" s={9} /></span>}
              </span>
              {renaming ? <RenameBox entry={e} className="min-w-0 flex-1" /> : <span className="truncate">{e.label}</span>}
              {e.item?.shared && e.item.shared.length > 0 && <span title="Shared" style={{ color: T.sub }}><G n="people" s={12} /></span>}
            </div>
          );
        const val =
          c === "Date modified" ? e.modified : c === "Type" ? e.type : c === "Size" ? e.size : c === "Original Location" ? addressText(ctx.doc, e.location ?? "") : c === "Date Deleted" ? e.bin?.deleted ?? "" : c === "Folder" ? (e.location ? addressText(ctx.doc, e.location) : "") : c === "Free space" ? (e.root?.free ? `${e.root.free} of ${e.root.capacity}` : "") : "";
        if (c === "Status")
          return (
            <div key={c} className="flex w-16 shrink-0 items-center px-2">
              <SyncIcon s={e.item?.sync} />
            </div>
          );
        return (
          <div key={c} className={`truncate px-2 ${c === "Size" ? "w-20 shrink-0 text-right" : "min-w-0 flex-1"}`} style={{ color: T.sub }}>
            {val}
          </div>
        );
      })}
      {hint && <span className="absolute left-10 top-full z-50 whitespace-nowrap rounded bg-white px-2 py-0.5 text-[11px] text-black shadow">{hint}</span>}
    </div>
  );
}

function EntryTile({ e, onDown, selected, big }: { e: Entry; onDown: (ev: React.MouseEvent, en: Entry) => void; selected: boolean; big: number }) {
  const ctx = useWin();
  const [hint, setHint] = useState<string | null>(null);
  const renaming = ctx.renaming && e.path.toLowerCase() === ctx.renaming.toLowerCase();
  const drop = e.folder && !e.bin;
  return (
    <div
      role="option"
      aria-selected={selected}
      aria-label={e.label}
      draggable={!e.bin && !e.root && !e.key.startsWith("zip:")}
      onDragStart={(ev) => startItemDrag(ev, ctx, e)}
      onDragOver={drop ? (ev) => dragOver(ev, ctx.doc, e.path, setHint) : undefined}
      onDragLeave={() => setHint(null)}
      onDrop={drop ? (ev) => { setHint(null); dropOnto(ev, ctx, e.path); } : undefined}
      onMouseDown={(ev) => onDown(ev, e)}
      onDoubleClick={() => (e.bin ? undefined : ctx.cmd("fs.open", e.path))}
      onContextMenu={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (!selected) ctx.select(e.key);
        itemMenu(ctx, ev, e);
      }}
      className="relative flex cursor-default flex-col items-center gap-1 rounded p-1.5 text-center text-[11.5px]"
      style={{ width: big + 40, background: selected ? T.sel : hint ? T.hover : undefined, outline: selected ? `1px solid ${T.selLine}` : undefined, outlineOffset: -1 }}
    >
      <span className="relative">
        <FileArt kind={e.art} s={big} />
        {e.item?.sync && <span className="absolute -bottom-1 -left-1"><SyncIcon s={e.item.sync} /></span>}
      </span>
      {renaming ? <RenameBox entry={e} center className="w-full" /> : <span className="line-clamp-2 break-words leading-tight">{e.label}</span>}
      {e.root?.capacity && <span className="text-[10px]" style={{ color: T.sub }}>{e.root.free} free of {e.root.capacity}</span>}
      {hint && <span className="absolute left-2 top-full z-50 whitespace-nowrap rounded bg-white px-2 py-0.5 text-[11px] text-black shadow">{hint}</span>}
    </div>
  );
}

export function useItemSelect(entries: Entry[], override?: { sel: string; select: (s: string) => void }) {
  const c = useContext(WinCtx);
  const anchor = useRef<string | null>(null);
  const sel = override?.sel ?? c?.sel ?? "";
  const select = override?.select ?? c?.select ?? (() => undefined);
  return (ev: React.MouseEvent, en: Entry) => {
    if (ev.button === 2) return;
    ev.stopPropagation();
    const cur = sel ? sel.split(",").filter(Boolean) : [];
    if (ev.ctrlKey || ev.metaKey) {
      const next = cur.includes(en.key) ? cur.filter((k) => k !== en.key) : [...cur, en.key];
      select(next.join(","));
      anchor.current = en.key;
      return;
    }
    if (ev.shiftKey && anchor.current) {
      const a = entries.findIndex((x) => x.key === anchor.current);
      const b = entries.findIndex((x) => x.key === en.key);
      if (a >= 0 && b >= 0) {
        const [lo, hi] = a < b ? [a, b] : [b, a];
        select(entries.slice(lo, hi + 1).map((x) => x.key).join(","));
        return;
      }
    }
    anchor.current = en.key;
    if (cur.length > 1 && cur.includes(en.key)) return; // keep a multi-selection for dragging
    select(en.key);
  };
}

function DetailsPane({ entries }: { entries: Entry[] }) {
  const ctx = useWin();
  const keys = ctx.sel.split(",").filter(Boolean);
  const sel = entries.filter((e) => keys.includes(e.key));
  const e = sel[0];
  const preview = S(ctx.doc, "explorer.preview") === "on";
  return (
    <div className="w-[220px] shrink-0 overflow-auto p-3 text-[12px]" style={{ borderLeft: `1px solid ${T.line}` }}>
      {!e ? (
        <p style={{ color: T.sub }}>{preview ? "Select a file to preview." : "Select a single file to get more information and share your cloud content."}</p>
      ) : sel.length > 1 ? (
        <p>{sel.length} items selected</p>
      ) : (
        <>
          <div className="mb-3 flex justify-center py-3"><FileArt kind={e.art} s={64} /></div>
          <div className="mb-3 break-words font-semibold">{e.name}</div>
          {preview && e.item?.text ? (
            <pre className="whitespace-pre-wrap rounded p-2 text-[11px]" style={{ background: T.panel2 }}>{e.item.text}</pre>
          ) : (
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold">Properties</div>
              <div className="flex justify-between gap-2"><span style={{ color: T.sub }}>Type</span><span className="text-right">{e.type}</span></div>
              {!e.folder && <div className="flex justify-between gap-2"><span style={{ color: T.sub }}>Size</span><span>{e.size}</span></div>}
              <div className="flex justify-between gap-2"><span style={{ color: T.sub }}>Date modified</span><span className="text-right">{e.modified}</span></div>
              {e.item?.sync && <div className="flex justify-between gap-2"><span style={{ color: T.sub }}>Availability</span><span className="text-right">{{ cloud: "Available when online", local: "Available on this device", always: "Always available", syncing: "Sync pending", error: "Sync error" }[e.item.sync]}</span></div>}
              {e.item?.shared?.length ? (
                <>
                  <div className="pt-2 text-[11px] font-semibold">Has access</div>
                  {e.item.shared.map((s) => (
                    <div key={s.email} className="flex justify-between gap-2"><span className="truncate">{s.name ?? s.email}</span><span style={{ color: T.sub }}>{s.perm === "edit" ? "Can edit" : s.perm === "comment" ? "Can comment" : "Can view"}</span></div>
                  ))}
                </>
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function ExplorerApp({ w }: { w: WinWindow }) {
  const ctx = useWin();
  const doc = ctx.doc;
  const loc = w.loc ?? "Home";
  const entries = useMemo(() => listEntries(doc, w), [doc, w]);
  const onDown = useItemSelect(entries);
  const view = w.view ?? "details";
  const keys = new Set(ctx.sel.split(",").filter(Boolean));
  const [hint, setHint] = useState<string | null>(null);
  const bin = loc === "Recycle Bin";
  const odLoc = rootOf(doc, loc)?.root === "onedrive";
  const cols = bin ? ["Name", "Original Location", "Date Deleted", "Size", "Type"] : w.search ? ["Name", "Date modified", "Type", "Size", "Folder"] : loc === "This PC" ? ["Name", "Type", "Free space"] : odLoc ? ["Name", "Status", "Date modified", "Type", "Size"] : ["Name", "Date modified", "Type", "Size"];
  const sortKey: Record<string, string> = { Name: "name", "Date modified": "date", Type: "type", Size: "size" };
  const iconSize = view === "extralarge" ? 96 : view === "large" ? 64 : view === "medium" ? 44 : 28;
  const selCount = keys.size;
  const selSize = entries.filter((e) => keys.has(e.key) && !e.folder).reduce((a, e) => a + sizeNum(e.size), 0);
  const title = w.search ? `${w.search} - Search Results in ${locTitle(doc, loc)}` : locTitle(doc, loc);
  const homeQuick = loc === "Home" && !w.search ? entries.filter((e) => e.folder) : [];
  const homeRecent = loc === "Home" && !w.search ? entries.filter((e) => !e.folder) : [];
  const zipView = Boolean(getItem(doc, loc)?.zip);
  return (
    <div className="flex h-full flex-col" style={{ background: T.bg, color: T.text }}>
      <TitleBar app="explorer">
        <div className="flex min-w-0 flex-1 items-end gap-1 pl-2">
          <div className="flex h-[34px] min-w-0 max-w-[240px] items-center gap-2 rounded-t-lg px-3 text-[12px]" style={{ background: T.panel2 }}>
            <FileArt kind={loc === "Home" ? "home" : loc === "This PC" ? "thispc" : loc === "Recycle Bin" ? "recycle" : "folder"} s={16} />
            <span className="truncate">{title}</span>
            <button type="button" aria-label="Close tab" onClick={() => ctx.cmd("win.close", "explorer")} className="ml-1 rounded p-0.5 hover:bg-[var(--w-hover)]"><G n="close" s={10} /></button>
          </div>
          <button type="button" aria-label="New tab" className="mb-1.5 rounded p-1 hover:bg-[var(--w-hover)]"><G n="plus" s={14} /></button>
          <span className="flex-1" />
        </div>
      </TitleBar>
      <div className="flex h-11 shrink-0 items-center gap-1 px-2" style={{ background: T.panel2 }}>
        <button type="button" aria-label="Back" title="Back (Alt+Left Arrow)" disabled={!(w.back ?? []).length} onClick={() => ctx.cmd("explorer.back")} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="back" s={16} /></button>
        <button type="button" aria-label="Forward" title="Forward (Alt+Right Arrow)" disabled={!(w.fwd ?? []).length} onClick={() => ctx.cmd("explorer.forward")} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="forward" s={16} /></button>
        <button type="button" aria-label="Up" title="Up to parent folder (Alt+Up Arrow)" disabled={loc === "Home"} onClick={() => ctx.cmd("explorer.up")} className="rounded p-1.5 hover:bg-[var(--w-hover)] disabled:opacity-30"><G n="up" s={16} /></button>
        <button type="button" aria-label="Refresh" title="Refresh (F5)" onClick={() => ctx.cmd("explorer.refresh")} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="refresh" s={16} /></button>
        <Address w={w} />
        <SearchBox w={w} />
      </div>
      <div style={{ background: T.panel2 }}>
        <CommandBar w={w} entries={entries} />
      </div>
      <div className="flex min-h-0 flex-1" style={{ background: T.panel }}>
        {S(doc, "explorer.navpane") !== "off" && <NavPane w={w} />}
        <div
          className="relative min-w-0 flex-1 overflow-auto p-2"
          role="listbox"
          aria-label={`${title} contents`}
          aria-multiselectable
          onMouseDown={(e) => {
            if (e.button === 0 && e.target === e.currentTarget) ctx.select("");
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            ctx.select("");
            backgroundMenu(ctx, e, loc, w);
          }}
          onDragOver={(e) => (canWrite(doc, loc) ? dragOver(e, doc, loc, setHint) : undefined)}
          onDragLeave={() => setHint(null)}
          onDrop={(e) => {
            setHint(null);
            dropOnto(e, ctx, loc);
          }}
        >
          {loc === "Home" && !w.search ? (
            <div onMouseDown={(e) => { if (e.target === e.currentTarget) ctx.select(""); }}>
              <div className="mb-1 px-1 text-[13px] font-semibold">Quick access</div>
              <div className="mb-4 flex flex-wrap gap-1">
                {homeQuick.map((e) => (
                  <EntryTile key={e.key} e={e} onDown={onDown} selected={keys.has(e.key)} big={44} />
                ))}
              </div>
              <div className="mb-1 px-1 text-[13px] font-semibold">Recent</div>
              {homeRecent.length ? (
                <div>
                  <div className="flex h-7 items-center text-[11px]" style={{ color: T.sub }}><span className="flex-[2.4] px-2">Name</span><span className="flex-1 px-2">Date modified</span><span className="flex-1 px-2">File location</span></div>
                  {homeRecent.map((e) => (
                    <EntryRow key={e.key} e={e} w={w} cols={["Name", "Date modified", "Folder"]} onDown={onDown} selected={keys.has(e.key)} />
                  ))}
                </div>
              ) : (
                <p className="px-2 text-[12px]" style={{ color: T.sub }}>After you&apos;ve opened some files, we&apos;ll show the most recent ones here.</p>
              )}
            </div>
          ) : !entries.length ? (
            <p className="pt-8 text-center text-[12px]" style={{ color: T.sub }}>{w.search ? "No items match your search." : bin ? "The Recycle Bin is empty." : "This folder is empty."}</p>
          ) : view === "details" || view === "list" ? (
            <div role="grid">
              {view === "details" && (
                <div className="sticky top-0 z-10 flex h-7 items-center text-[11px]" style={{ background: T.panel, color: T.sub, borderBottom: `1px solid ${T.line}` }}>
                  {cols.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Sort by ${c}`}
                      onClick={() => sortKey[c] && ctx.cmd(sortKey[c] === (w.sort ?? "name") ? "explorer.sortDir" : "explorer.sort", sortKey[c] === (w.sort ?? "name") ? ((w.dir ?? "asc") === "asc" ? "Descending" : "Ascending") : c)}
                      className={`flex h-full items-center gap-1 truncate px-2 text-left hover:bg-[var(--w-hover)] ${c === "Name" ? "min-w-0 flex-[2.4]" : c === "Size" ? "w-20 shrink-0 justify-end" : c === "Status" ? "w-16 shrink-0" : "min-w-0 flex-1"}`}
                    >
                      {c}
                      {sortKey[c] === (w.sort ?? "name") && <G n={(w.dir ?? "asc") === "asc" ? "chevU" : "chevD"} s={9} />}
                    </button>
                  ))}
                </div>
              )}
              {entries.map((e) => (
                <EntryRow key={e.key} e={e} w={w} cols={view === "list" ? ["Name"] : cols} onDown={onDown} selected={keys.has(e.key)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap content-start gap-1" onMouseDown={(e) => { if (e.target === e.currentTarget) ctx.select(""); }}>
              {entries.map((e) => (
                <EntryTile key={e.key} e={e} onDown={onDown} selected={keys.has(e.key)} big={iconSize} />
              ))}
            </div>
          )}
          {zipView && <p className="mt-2 text-[11px]" style={{ color: T.sub }}>This is a compressed (zipped) folder. Use Extract all to work with these files.</p>}
          {hint && <span className="pointer-events-none absolute bottom-2 left-1/2 z-50 -translate-x-1/2 rounded bg-white px-2 py-0.5 text-[11px] text-black shadow">{hint}</span>}
        </div>
        {(S(doc, "explorer.details") === "on" || S(doc, "explorer.preview") === "on") && <DetailsPane entries={entries} />}
      </div>
      <div className="flex h-6 shrink-0 items-center gap-4 px-3 text-[11px]" style={{ background: T.panel, color: T.sub, borderTop: `1px solid ${T.line}` }}>
        <span>{entries.length} item{entries.length === 1 ? "" : "s"}</span>
        {selCount > 0 && <span>{selCount} item{selCount === 1 ? "" : "s"} selected{selSize ? ` ${selSize >= 1000 ? `${(selSize / 1000).toFixed(1)} MB` : `${Math.round(selSize)} KB`}` : ""}</span>}
        {doc.clipboard && <span>{doc.clipboard.paths.length} item{doc.clipboard.paths.length === 1 ? "" : "s"} on the clipboard ({doc.clipboard.mode === "cut" ? "cut" : "copied"})</span>}
        <span className="flex-1" />
        <button type="button" aria-label="Details view" title="Details" onClick={() => ctx.cmd("explorer.view", "Details")} className="rounded p-0.5 hover:bg-[var(--w-hover)]" style={{ background: view === "details" ? T.press : undefined }}><G n="details" s={13} /></button>
        <button type="button" aria-label="Large icons view" title="Large icons" onClick={() => ctx.cmd("explorer.view", "Large icons")} className="rounded p-0.5 hover:bg-[var(--w-hover)]" style={{ background: view === "large" ? T.press : undefined }}><G n="tiles" s={13} /></button>
      </div>
    </div>
  );
}
