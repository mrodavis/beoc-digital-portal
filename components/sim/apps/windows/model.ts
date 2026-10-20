import type { SimCommit } from "@/types/sim";
import type { SimUi } from "../../types";
import { clone } from "@/lib/sim/ops";
import {
  APP_MEM,
  BACKGROUND_PROCESSES,
  DEFAULT_APPS,
  DEFAULT_DEVICES,
  DEFAULT_NET,
  DEFAULT_PRINTERS,
  DEFAULT_SETTINGS,
  DEFAULT_SPECS,
  DEFAULT_STARTUP,
  DEFAULT_START_PINS,
  DEFAULT_TASKBAR,
  NOW,
  appInfo,
} from "./data";
import {
  INVALID_NAME,
  SPECIAL,
  STAMP,
  baseOf,
  copyName,
  detach,
  ensureFolder,
  extOf,
  getItem,
  isFolder,
  parentOf,
  realPath,
  rebase,
  rootOf,
  splitPath,
  uniqueName,
  walkItems,
  within,
} from "./fs";
import type { WebBlock, WebPage, WinApp, WinDevice, WinDoc, WinItem, WinNet, WinPrinter, WinProcess, WinSpecs, WinStartup, WinTab, WinWindow } from "./types";

/* ------------------------------------------------------------------ */
/* Effective values (document overrides on top of defaults)            */
/* ------------------------------------------------------------------ */

export const S = (doc: WinDoc, key: string): string => doc.settings?.[key] ?? DEFAULT_SETTINGS[key] ?? "";
export const on = (doc: WinDoc, key: string) => S(doc, key) === "on";
export const specs = (doc: WinDoc): WinSpecs => ({ ...DEFAULT_SPECS, ...(doc.specs ?? {}) });
export const net = (doc: WinDoc): WinNet => {
  const n = { ...DEFAULT_NET, ...(doc.net ?? {}) };
  n.hosts = { ...DEFAULT_NET.hosts, ...(doc.net?.hosts ?? {}) };
  return n;
};
export const taskbarApps = (doc: WinDoc) => doc.taskbar ?? DEFAULT_TASKBAR;
export const startPins = (doc: WinDoc) => doc.startPins ?? DEFAULT_START_PINS;
export const userName = (doc: WinDoc) => doc.user?.name ?? "Jordan Rivera";
export const pinOf = (doc: WinDoc) => doc.pin ?? "2468";

const flagList = (doc: WinDoc, k: string) => String(doc.flags?.[k] ?? "").split("|").filter(Boolean);

export function installedApps(doc: WinDoc): WinApp[] {
  const gone = new Set(flagList(doc, "uninstalled").map((x) => x.toLowerCase()));
  const map = new Map<string, WinApp>();
  for (const a of [...DEFAULT_APPS, ...(doc.apps ?? []), ...(doc.webApps ?? []).map((w) => ({ name: w.name, publisher: "Microsoft Edge web app", version: "1.0", size: "", installed: "10/20/2026" }))]) map.set(a.name.toLowerCase(), a);
  return Array.from(map.values()).filter((a) => !gone.has(a.name.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
}

export function startupApps(doc: WinDoc): WinStartup[] {
  const gone = new Set(flagList(doc, "uninstalled").map((x) => x.toLowerCase()));
  const map = new Map<string, WinStartup>();
  for (const a of [...DEFAULT_STARTUP, ...(doc.startup ?? [])]) map.set(a.name.toLowerCase(), a);
  return Array.from(map.values()).filter((a) => !gone.has(a.name.toLowerCase()));
}

export function processes(doc: WinDoc): WinProcess[] {
  const ended = new Set(flagList(doc, "ended").map((x) => x.toLowerCase()));
  const listed = doc.processes ?? [];
  const out: WinProcess[] = [];
  for (const p of listed) out.push(p);
  for (const w of doc.windows) {
    if (listed.some((p) => p.app === w.app)) continue;
    if (w.app === "printqueue") continue;
    const nm = w.app === "edgeprivate" ? "Microsoft Edge (InPrivate)" : w.app === "explorer" ? "File Explorer" : appInfo(w.app).name;
    out.push({ name: nm, app: w.app, cpu: w.app === "edge" ? "1.8%" : "0.3%", mem: APP_MEM[w.app] ?? "52.0 MB" });
  }
  for (const b of BACKGROUND_PROCESSES) if (!out.some((p) => p.name.toLowerCase() === b.name.toLowerCase())) out.push(b);
  return out.filter((p) => !ended.has(p.name.toLowerCase()));
}

export function printers(doc: WinDoc): WinPrinter[] {
  const list = [...(doc.printers ?? [])];
  for (const p of DEFAULT_PRINTERS) if (!list.some((x) => x.name === p.name)) list.push(p);
  const removed = new Set(flagList(doc, "printersRemoved"));
  const out = list.filter((p) => !removed.has(p.name));
  if (!out.some((p) => p.default) && out.length) {
    const i = out.findIndex((p) => p.kind !== "pdf");
    out[i >= 0 ? i : 0] = { ...out[i >= 0 ? i : 0], default: true };
  }
  return out;
}

export const devices = (doc: WinDoc): WinDevice[] => doc.devices ?? DEFAULT_DEVICES;

/* ------------------------------------------------------------------ */
/* URLs and web pages                                                  */
/* ------------------------------------------------------------------ */

export function normUrl(raw: string): string {
  let s = String(raw ?? "").trim();
  if (/^edge:\/\//i.test(s)) return s.toLowerCase().replace(/\/+$/, "");
  if (/^file:\/\//i.test(s)) return s;
  s = s.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/+$/, "");
  return s.toLowerCase();
}

export function looksLikeUrl(s: string): boolean {
  const t = s.trim();
  if (!t || /\s/.test(t)) return false;
  if (/^(https?:\/\/|edge:\/\/|file:\/\/)/i.test(t)) return true;
  if (/^\d{1,3}(\.\d{1,3}){3}(:\d+)?(\/.*)?$/.test(t)) return true;
  if (/^localhost(:\d+)?/i.test(t)) return true;
  return /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(:\d+)?(\/.*)?$/i.test(t);
}

export const searchUrl = (q: string) => `bing.com/search?q=${q.trim()}`;

export type CloudCfg = { host: string; provider: "onedrive" | "gdrive"; root: string };

export function clouds(doc: WinDoc): CloudCfg[] {
  const out: CloudCfg[] = [...(doc.clouds ?? [])];
  const od = doc.fs.find((r) => r.root === "onedrive");
  if (od && !out.some((c) => c.provider === "onedrive")) out.push({ host: "onedrive.live.com", provider: "onedrive", root: od.name });
  const gd = doc.fs.find((r) => r.root === "gdrive");
  if (gd && !out.some((c) => c.provider === "gdrive")) out.push({ host: "drive.google.com", provider: "gdrive", root: gd.name });
  return out;
}

export function cloudFor(doc: WinDoc, url: string): CloudCfg | undefined {
  const u = normUrl(url);
  return clouds(doc).find(
    (c) =>
      u === c.host ||
      u.startsWith(`${c.host}/`) ||
      (c.provider === "gdrive" && (u.startsWith("docs.google.com") || u.startsWith("drive.google.com"))) ||
      (c.provider === "onedrive" && (u === "onedrive.com" || u.startsWith("onedrive.com/") || u.startsWith("onedrive.live.com") || u.startsWith("office.com/onedrive") || u.startsWith("onedrive.cloud.microsoft"))),
  );
}

export type Resolved =
  | { kind: "newtab" }
  | { kind: "search"; q: string }
  | { kind: "page"; page: WebPage; url: string }
  | { kind: "cloud"; cfg: CloudCfg }
  | { kind: "edge"; sub: string }
  | { kind: "file"; path: string }
  | { kind: "error"; url: string };

export function resolveUrl(doc: WinDoc, url: string): Resolved {
  const u = normUrl(url);
  if (!u || u === "edge://newtab") return { kind: "newtab" };
  if (u.startsWith("edge://")) return { kind: "edge", sub: u.slice(7) };
  if (u.startsWith("file:///")) return { kind: "file", path: decodeURIComponent(url.slice(8)) };
  if (u.startsWith("bing.com/search?q=")) return { kind: "search", q: url.replace(/^.*?search\?q=/i, "") };
  const page = doc.web?.[u];
  if (page) return { kind: "page", page, url: u };
  const cfg = cloudFor(doc, u);
  if (cfg) return { kind: "cloud", cfg };
  if (u === "bing.com" || u === "google.com" || u === "msn.com") return { kind: "newtab" };
  return { kind: "error", url: u };
}

export function pageTitle(doc: WinDoc, url: string, file?: string): string {
  const r = resolveUrl(doc, url);
  if (r.kind === "cloud" && file) {
    const n = baseOf(file);
    if (r.cfg.provider !== "gdrive") return n;
    const e = extOf(n);
    return `${e ? n.slice(0, -e.length) : n} - ${e === ".xlsx" ? "Google Sheets" : e === ".pptx" ? "Google Slides" : "Google Docs"}`;
  }
  switch (r.kind) {
    case "newtab": return "New tab";
    case "search": return `${r.q} - Search`;
    case "page": return r.page.title;
    case "cloud": return r.cfg.provider === "gdrive" ? "My Drive - Google Drive" : "My files - OneDrive";
    case "edge": return r.sub.startsWith("settings") ? "Settings" : r.sub.charAt(0).toUpperCase() + r.sub.slice(1);
    case "file": return baseOf(r.path);
    default: return normUrl(url);
  }
}

export function findBlock(blocks: WebBlock[], id: string): WebBlock | undefined {
  for (const b of blocks) {
    if ("id" in b && b.id === id) return b;
    if (b.t === "cols") for (const col of b.cols) {
      const f = findBlock(col, id);
      if (f) return f;
    }
  }
  return undefined;
}

export function allPagesBlock(doc: WinDoc, id: string): WebBlock | undefined {
  for (const p of Object.values(doc.web ?? {})) {
    const f = findBlock(p.blocks, id);
    if (f) return f;
  }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Windows                                                             */
/* ------------------------------------------------------------------ */

export const curDesk = (doc: WinDoc) => doc.desk ?? 1;
export const winOf = (doc: WinDoc, id: string) => doc.windows.find((w) => w.id === id);
export const deskOf = (w: WinWindow) => w.desk ?? 1;

/** The focused window if it is visible on this desktop. */
export function focused(doc: WinDoc): WinWindow | undefined {
  const w = doc.focus ? winOf(doc, doc.focus) : undefined;
  return w && !w.min && deskOf(w) === curDesk(doc) ? w : undefined;
}

function newWindow(doc: WinDoc, app: string): WinWindow {
  const base: WinWindow = { id: app, app, desk: curDesk(doc) };
  switch (app) {
    case "explorer": return { ...base, loc: "Home", view: "details", sort: "name", dir: "asc" };
    case "settings": return { ...base, page: "home" };
    case "security": return { ...base, page: "home" };
    case "edge":
    case "edgeprivate": return { ...base, tabs: [{ id: "t1", url: app === "edge" && doc.flags?.homepage ? String(doc.flags.homepage) : "edge://newtab" }], tab: "t1" };
    case "taskmgr": return { ...base, tm: "processes", perf: "cpu" };
    case "cmd": return { ...base, out: ["Microsoft Windows [Version 10.0.26100.4061]", "(c) Microsoft Corporation. All rights reserved.", ""] };
    case "notepad": return { ...base, text: "" };
    default: return base;
  }
}

/** Open (or bring forward) an app's window. Mutates the clone. */
export function openWin(d: WinDoc, app: string, patch?: Partial<WinWindow>): WinWindow {
  let w = winOf(d, app);
  if (w) {
    d.windows = [...d.windows.filter((x) => x.id !== app), w];
    w.min = false;
    w.desk = curDesk(d);
  } else {
    w = newWindow(d, app);
    d.windows = [...d.windows, w];
  }
  if (patch) Object.assign(w, patch);
  d.focus = w.id;
  d.peek = null;
  return w;
}

function closeWin(d: WinDoc, id: string) {
  d.windows = d.windows.filter((w) => w.id !== id);
  if (d.focus === id) {
    const top = [...d.windows].reverse().find((w) => !w.min && deskOf(w) === curDesk(d));
    d.focus = top?.id ?? null;
  }
}

function focusNext(d: WinDoc) {
  const top = [...d.windows].reverse().find((w) => !w.min && deskOf(w) === curDesk(d));
  d.focus = top?.id ?? null;
}

/* ------------------------------------------------------------------ */
/* Selection                                                           */
/* ------------------------------------------------------------------ */

export function selPaths(sel: string, prefix = "file:"): string[] {
  return (sel || "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith(prefix))
    .map((s) => s.slice(prefix.length));
}

export const fileSel = (paths: string[]) => paths.map((p) => `file:${p}`).join(",");

export function selectionExists(doc: WinDoc, sel: string): boolean {
  if (!sel) return true;
  return sel.split(",").every((part) => {
    const s = part.trim();
    const i = s.indexOf(":");
    const kind = i > 0 ? s.slice(0, i) : "";
    const v = i > 0 ? s.slice(i + 1) : s;
    switch (kind) {
      case "file": return Boolean(getItem(doc, v));
      case "bin": return (doc.recycle ?? []).some((b) => b.item.name.toLowerCase() === v.toLowerCase());
      case "proc": return processes(doc).some((p) => p.name.toLowerCase() === v.toLowerCase());
      case "startup": return startupApps(doc).some((p) => p.name.toLowerCase() === v.toLowerCase());
      case "job": return printers(doc).some((p) => (p.jobs ?? []).some((j) => j.name.toLowerCase() === v.toLowerCase()));
      case "page": return resolveUrl(doc, v).kind !== "error";
      case "notepad": return true;
      case "form": return Boolean(allPagesBlock(doc, v));
      case "web": return Boolean(allPagesBlock(doc, v));
      default:
        // A rename target (a plain path).
        return Boolean(getItem(doc, s)) || Boolean(getItem(doc, freshAlias(doc, s) ?? ""));
    }
  });
}

/** "Documents/New folder" may refer to "Documents/New folder (2)" when that is the item just created. */
function freshAlias(doc: WinDoc, path: string): string | null {
  if (!doc.fresh) return null;
  return normNewName(doc.fresh).toLowerCase() === path.toLowerCase() ? doc.fresh : null;
}

const NEW_NAMES = /^(.*\/)?(New folder|New Text Document|New Microsoft Word Document|New Microsoft Excel Worksheet|New Microsoft PowerPoint Presentation|New Bitmap image|New Compressed \(zipped\) Folder|New Rich Text Document) \(\d+\)(\.[A-Za-z0-9]+)?$/i;
export const normNewName = (p: string) => p.replace(NEW_NAMES, "$1$2$3");

export function normalize(c: SimCommit): SimCommit {
  if (c.kind === "type" && NEW_NAMES.test(c.target)) return { ...c, target: normNewName(c.target) };
  if (c.kind === "command" && c.id === "fs.newFile" && typeof c.value === "string") return { ...c, value: normNewName(c.value) };
  if (c.kind === "command" && (c.id === "edge.nav" || c.id === "edge.closeTab" || c.id === "edge.tab") && typeof c.value === "string") return { ...c, value: normUrl(c.value) };
  return c;
}

/* ------------------------------------------------------------------ */
/* File-system operations                                              */
/* ------------------------------------------------------------------ */

function snapshot(d: WinDoc) {
  d.undo = [...(d.undo ?? []).slice(-9), { fs: clone(d.fs), recycle: clone(d.recycle ?? []) }];
}

/** After paths move or are renamed, keep windows, Quick access and recent in step. */
function rebaseAll(d: WinDoc, from: string, to: string) {
  for (const w of d.windows) {
    if (w.loc) w.loc = rebase(w.loc, from, to);
    if (w.back) w.back = w.back.map((p) => rebase(p, from, to));
    if (w.fwd) w.fwd = w.fwd.map((p) => rebase(p, from, to));
    if (w.file) w.file = rebase(w.file, from, to);
    for (const t of w.tabs ?? []) {
      if (t.cloud) t.cloud = rebase(t.cloud, from, to);
      if (t.file) t.file = rebase(t.file, from, to);
    }
  }
  if (d.quick) d.quick = d.quick.map((p) => rebase(p, from, to));
  if (d.recent) d.recent = d.recent.map((p) => rebase(p, from, to));
}

function dropMissing(d: WinDoc) {
  for (const w of d.windows) {
    if (w.loc && !SPECIAL.includes(w.loc) && !w.loc.startsWith("search:") && !getItem(d, w.loc)) {
      let p = w.loc;
      while (p && !getItem(d, p)) p = parentOf(p);
      w.loc = p || "This PC";
    }
    for (const t of w.tabs ?? []) {
      if (t.cloud && !getItem(d, t.cloud)) t.cloud = parentOf(t.cloud) || undefined;
      if (t.file && !getItem(d, t.file)) t.file = undefined;
    }
  }
  if (d.quick) d.quick = d.quick.filter((p) => getItem(d, p));
}

function setSync(d: WinDoc, it: WinItem, path: string) {
  const r = rootOf(d, path);
  walkItems(it, (x) => {
    if (r?.root === "onedrive") x.sync = x.sync && x.sync !== "error" ? x.sync : "local";
    else delete x.sync;
  });
}

function moveItems(d: WinDoc, paths: string[], dest: string, copy: boolean): string[] {
  const destItem = getItem(d, dest);
  if (!destItem || !isFolder(destItem)) return [];
  const destPath = realPath(d, dest);
  const out: string[] = [];
  for (const raw of paths) {
    const src = realPath(d, raw);
    const it = getItem(d, src);
    if (!it) continue;
    if (!copy && parentOf(src).toLowerCase() === destPath.toLowerCase()) {
      out.push(src);
      continue;
    }
    if (within(destPath, src)) continue;
    destItem.children = destItem.children ?? [];
    let name = it.name;
    const sameFolder = parentOf(src).toLowerCase() === destPath.toLowerCase();
    if (copy && sameFolder) name = copyName(destItem.children, it.name);
    const existing = destItem.children.findIndex((c) => c.name.toLowerCase() === name.toLowerCase());
    const moved = copy ? clone(it) : detach(d, src);
    if (!moved) continue;
    moved.name = name;
    moved.modified = copy ? moved.modified : moved.modified;
    if (existing >= 0) destItem.children.splice(existing, 1, moved);
    else destItem.children.push(moved);
    const np = `${destPath}/${name}`;
    setSync(d, moved, np);
    if (!copy) rebaseAll(d, src, np);
    out.push(np);
  }
  return out;
}

function deleteItems(d: WinDoc, paths: string[], permanent: boolean) {
  for (const raw of paths) {
    const p = realPath(d, raw);
    const r = rootOf(d, p);
    const it = detach(d, p);
    if (!it) continue;
    if (!permanent && r?.root !== "usb" && r?.root !== "network") {
      d.recycle = [...(d.recycle ?? []), { item: it, from: parentOf(p), deleted: STAMP }];
    }
  }
  dropMissing(d);
}

function restoreBin(d: WinDoc, names: string[]) {
  const keep: typeof d.recycle = [];
  for (const b of d.recycle ?? []) {
    if (names.some((n) => n.toLowerCase() === b.item.name.toLowerCase())) {
      const parent = ensureFolder(d, b.from);
      if (parent) {
        parent.children = parent.children ?? [];
        const name = uniqueName(parent.children, b.item.name);
        parent.children.push({ ...b.item, name });
      }
    } else keep.push(b);
  }
  d.recycle = keep;
}

function newItem(d: WinDoc, parentPath: string, name: string, folder: boolean): string | null {
  const parent = getItem(d, parentPath);
  if (!parent || !isFolder(parent)) return null;
  parent.children = parent.children ?? [];
  const nm = uniqueName(parent.children, name);
  const it: WinItem = folder ? { name: nm, folder: true, children: [], modified: STAMP } : { name: nm, modified: STAMP, size: "0 KB", text: "" };
  parent.children.push(it);
  const p = `${realPath(d, parentPath)}/${nm}`;
  setSync(d, it, p);
  return p;
}

function renameItem(d: WinDoc, target: string, value: string): string | null {
  let path = target;
  if (!getItem(d, path)) path = freshAlias(d, target) ?? target;
  if (!getItem(d, path)) {
    // "New folder" may be "New folder (2)" when several were created before renaming.
    const parent = getItem(d, parentOf(target));
    const hit = (parent?.children ?? []).filter((c) => normNewName(`${parentOf(target)}/${c.name}`).toLowerCase() === target.toLowerCase()).pop();
    if (hit) path = `${realPath(d, parentOf(target))}/${hit.name}`;
  }
  const it = getItem(d, path);
  const name = value.trim();
  if (!it || !name || INVALID_NAME.test(name)) return null;
  const parent = getItem(d, parentOf(path));
  if (parent?.children?.some((c) => c !== it && c.name.toLowerCase() === name.toLowerCase())) return null;
  const real = realPath(d, path);
  it.name = name;
  it.modified = STAMP;
  const np = `${parentOf(real)}/${name}`;
  rebaseAll(d, real, np);
  return np;
}

function openFile(d: WinDoc, path: string): Partial<SimUi> | undefined {
  const it = getItem(d, path);
  if (!it) return undefined;
  const p = realPath(d, path);
  if (isFolder(it) || extOf(it.name) === ".zip") {
    explorerNav(d, p);
    return { selection: "" };
  }
  if (it.app) {
    openWin(d, it.app);
    return undefined;
  }
  d.recent = [p, ...(d.recent ?? []).filter((x) => x !== p)].slice(0, 8);
  const e = extOf(it.name);
  if ([".txt", ".log"].includes(e)) openWin(d, "notepad", { file: p, text: it.text ?? "" });
  else if ([".docx", ".doc", ".rtf"].includes(e)) openWin(d, "word", { file: p });
  else if ([".xlsx", ".xls", ".csv"].includes(e)) openWin(d, "excel", { file: p });
  else if ([".pptx", ".ppt"].includes(e)) openWin(d, "powerpoint", { file: p });
  else if ([".png", ".jpg", ".jpeg", ".gif", ".bmp"].includes(e)) openWin(d, "photos", { file: p });
  else if ([".pdf", ".htm", ".html"].includes(e)) {
    const w = openWin(d, "edge");
    const id = `t${Date.now() % 100000}${(w.tabs ?? []).length}`;
    w.tabs = [...(w.tabs ?? []), { id, url: `file:///${p}` }];
    w.tab = id;
  } else if ([".exe", ".msi"].includes(e)) {
    d.flags = { ...(d.flags ?? {}), smartApp: it.name };
  } else openWin(d, "notepad", { file: p, text: it.text ?? "" });
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Explorer                                                            */
/* ------------------------------------------------------------------ */

function explorerWin(d: WinDoc): WinWindow {
  return winOf(d, "explorer") ? openWin(d, "explorer") : openWin(d, "explorer");
}

export function normLoc(d: WinDoc, loc: string): string {
  const t = loc.trim().replace(/\\/g, "/").replace(/\/+$/, "");
  const sp = SPECIAL.find((s) => s.toLowerCase() === t.toLowerCase());
  if (sp) return sp;
  if (/^quick access$/i.test(t)) return "Home";
  if (/^this pc\//i.test(t)) return normLoc(d, t.slice(8));
  if (/^c:$/i.test(t)) {
    const c = d.fs.find((r) => r.root === "drive");
    return c ? c.name : t;
  }
  const r = d.fs.find((x) => x.label && x.label.toLowerCase() === splitPath(t)[0]?.toLowerCase());
  if (r) return realPath(d, [r.name, ...splitPath(t).slice(1)].join("/"));
  return getItem(d, t) ? realPath(d, t) : t;
}

export function explorerNav(d: WinDoc, loc: string) {
  const w = explorerWin(d);
  const to = normLoc(d, loc);
  if (!SPECIAL.includes(to) && !getItem(d, to)) return;
  if (w.loc !== to) {
    w.back = [...(w.back ?? []), w.loc ?? "Home"].slice(-30);
    w.fwd = [];
  }
  w.loc = to;
  w.search = "";
}

/* ------------------------------------------------------------------ */
/* Edge                                                                */
/* ------------------------------------------------------------------ */

function edgeWin(d: WinDoc): WinWindow {
  const f = d.focus ? winOf(d, d.focus) : undefined;
  if (f && (f.app === "edge" || f.app === "edgeprivate")) return f;
  const top = [...d.windows].reverse().find((w) => w.app === "edge" || w.app === "edgeprivate");
  return openWin(d, top?.app ?? "edge");
}

function activeTab(w: WinWindow): WinTab {
  if (!w.tabs || !w.tabs.length) {
    w.tabs = [{ id: "t1", url: "edge://newtab" }];
    w.tab = "t1";
  }
  return w.tabs.find((t) => t.id === w.tab) ?? w.tabs[0];
}

function navTab(d: WinDoc, w: WinWindow, url: string) {
  const t = activeTab(w);
  const u = url.startsWith("file:///") ? url : normUrl(url);
  if (t.url !== u) {
    t.back = [...(t.back ?? []), t.url].slice(-30);
    t.fwd = [];
  }
  t.url = u;
  t.cloud = undefined;
  t.file = undefined;
  t.bypass = false;
  t.section = undefined;
  w.pane = null;
  if (w.app !== "edgeprivate" && u !== "edge://newtab") {
    d.history = [{ title: pageTitle(d, u), url: u, when: NOW.time }, ...(d.history ?? []).filter((h) => h.url !== u)].slice(0, 40);
  }
}

function newTabId(w: WinWindow) {
  let n = (w.tabs ?? []).length + 1;
  while ((w.tabs ?? []).some((t) => t.id === `t${n}`)) n++;
  return `t${n}`;
}

function pageOfTab(d: WinDoc, t: WinTab): WebPage | undefined {
  const r = resolveUrl(d, t.url);
  return r.kind === "page" ? r.page : undefined;
}

function addDownload(d: WinDoc, name: string, size?: string, danger?: string, url?: string) {
  const status = danger ? "warn" : "done";
  d.downloads = [{ name, size, danger, status, url }, ...(d.downloads ?? []).filter((x) => x.name !== name)];
  if (status === "done") putDownload(d, name, size);
}

function putDownload(d: WinDoc, name: string, size?: string) {
  const dl = d.fs.find((r) => r.root === "downloads");
  if (!dl) return;
  dl.children = dl.children ?? [];
  if (!dl.children.some((c) => c.name.toLowerCase() === name.toLowerCase())) dl.children.unshift({ name, size: size ?? "1.2 MB", modified: STAMP });
}

/* ------------------------------------------------------------------ */
/* Command Prompt                                                      */
/* ------------------------------------------------------------------ */

function hostIp(n: WinNet, host: string): string | null {
  const h = host.toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) return h;
  if ((n.nxdomain ?? []).includes(h)) return null;
  return n.hosts[h] ?? n.hosts[h.replace(/^www\./, "")] ?? null;
}

export function runCmd(doc: WinDoc, raw: string): string[] {
  const n = net(doc);
  const sp = specs(doc);
  const cmd = raw.trim();
  const lc = cmd.toLowerCase().replace(/\s+/g, " ");
  const user = userName(doc).split(" ")[0].toLowerCase();
  const wifi = n.type === "wifi";
  const offline = n.connected === false || on(doc, "airplane") || (wifi && S(doc, "wifi") === "off");
  const adapter = wifi ? "Wireless LAN adapter Wi-Fi:" : "Ethernet adapter Ethernet:";
  if (!lc) return [];
  if (lc === "ipconfig" || lc === "ipconfig /all" || lc === "ipconfig/all") {
    const all = lc.includes("all");
    const out = ["", "Windows IP Configuration", ""];
    if (all) out.push(`   Host Name . . . . . . . . . . . . : ${sp.deviceName}`, "   Primary Dns Suffix  . . . . . . . : ", "   Node Type . . . . . . . . . . . . : Hybrid", "   IP Routing Enabled. . . . . . . . : No", "");
    out.push(adapter, "");
    if (offline) {
      out.push("   Media State . . . . . . . . . . . : Media disconnected", "   Connection-specific DNS Suffix  . : ", "");
      return out;
    }
    out.push("   Connection-specific DNS Suffix  . : ");
    if (all) out.push(`   Description . . . . . . . . . . . : ${wifi ? "Intel(R) Wi-Fi 6E AX211 160MHz" : "Intel(R) Ethernet Connection (17) I219-LM"}`, `   Physical Address. . . . . . . . . : ${n.mac}`, "   DHCP Enabled. . . . . . . . . . . : Yes", "   Autoconfiguration Enabled . . . . : Yes");
    out.push(
      "   Link-local IPv6 Address . . . . . : fe80::4c1a:7d2e:9b3f:12a8%12",
      `   IPv4 Address. . . . . . . . . . . : ${n.ip}${all ? "(Preferred)" : ""}`,
      `   Subnet Mask . . . . . . . . . . . : ${n.subnet}`,
    );
    if (all) out.push("   Lease Obtained. . . . . . . . . . : Tuesday, October 20, 2026 8:02:14 AM", "   Lease Expires . . . . . . . . . . : Wednesday, October 21, 2026 8:02:14 AM");
    out.push(`   Default Gateway . . . . . . . . . : ${n.gateway}`);
    if (all) out.push(`   DHCP Server . . . . . . . . . . . : ${n.gateway}`, `   DNS Servers . . . . . . . . . . . : ${n.dns}`, "   NetBIOS over Tcpip. . . . . . . . : Enabled");
    for (const v of n.vpns.filter((x) => x.connected)) out.push("", `PPP adapter ${v.name}:`, "", "   Connection-specific DNS Suffix  . : ", "   IPv4 Address. . . . . . . . . . . : 10.20.0.87", "   Subnet Mask . . . . . . . . . . . : 255.255.255.255", "   Default Gateway . . . . . . . . . : 0.0.0.0");
    out.push("");
    return out;
  }
  if (lc === "hostname") return [sp.deviceName, ""];
  if (lc === "whoami") return [`${sp.deviceName.toLowerCase()}\\${user}`, ""];
  if (lc === "ver") return ["", `Microsoft Windows [Version 10.0.${sp.osBuild}]`, ""];
  if (lc === "getmac") return ["", "Physical Address    Transport Name", "=================== ==========================================================", `${n.mac}   \\Device\\Tcpip_{8F2A51C4-6E3D-4B7A-9C10-2D5E7F31A9B2}`, ""];
  if (lc === "date /t") return ["Tue 10/20/2026", ""];
  if (lc === "time /t") return [NOW.time.replace(/ (AM|PM)/, ""), ""];
  if (lc === "cd" || lc === "chdir") return [`C:\\Users\\${user}`, ""];
  if (lc === "help") return ["For more information on a specific command, type HELP command-name", "CD             Displays the name of or changes the current directory.", "CLS            Clears the screen.", "DATE           Displays or sets the date.", "DIR            Displays a list of files and subdirectories in a directory.", "EXIT           Quits the CMD.EXE program (command interpreter).", "HOSTNAME       Prints the name of the current host.", "IPCONFIG       Displays IP network configuration values.", "NSLOOKUP       Queries DNS for the IP address of a name.", "PING           Tests whether another computer can be reached.", "SYSTEMINFO     Displays machine-specific properties and configuration.", "TRACERT        Shows the route packets take to a host.", "VER            Displays the Windows version.", ""];
  if (lc === "dir") {
    const roots = doc.fs.filter((r) => ["desktop", "documents", "downloads", "pictures", "music", "videos", "onedrive"].includes(r.root));
    return ["", " Volume in drive C has no label.", " Volume Serial Number is 6A1F-3C2D", "", ` Directory of C:\\Users\\${user}`, "", "10/20/2026  08:02 AM    <DIR>          .", ...roots.map((r) => `10/19/2026  04:51 PM    <DIR>          ${r.name}`), `               0 File(s)              0 bytes`, `              ${roots.length + 1} Dir(s)  ${(rootOf(doc, "C:") ? "" : "")}289,145,602,048 bytes free`, ""];
  }
  if (lc === "systeminfo") return ["", `Host Name:                 ${sp.deviceName}`, `OS Name:                   Microsoft ${sp.edition}`, `OS Version:                10.0.${sp.osBuild.split(".")[0]} N/A Build ${sp.osBuild.split(".")[0]}`, `System Manufacturer:       ${sp.model.split(" ")[0]}`, `System Model:              ${sp.model}`, `System Type:               x64-based PC`, `Processor(s):              1 Processor(s) Installed.`, `                           [01]: ${sp.processor.replace(/\s+/g, " ")}`, `Total Physical Memory:     ${sp.ram.split(" (")[0].replace(" GB", ",000")} MB`, `Network Card(s):           1 NIC(s) Installed.`, `                           [01]: ${wifi ? "Intel(R) Wi-Fi 6E AX211" : "Intel(R) Ethernet Connection I219-LM"}`, `                                 IP address(es): [01]: ${n.ip}`, ""];
  const ping = /^ping (\S+)/.exec(lc);
  if (ping) {
    const host = ping[1];
    const ip = hostIp(n, host);
    if (offline) return [`Ping request could not find host ${host}. Please check the name and try again.`, ""];
    if (!ip) return [`Ping request could not find host ${host}. Please check the name and try again.`, ""];
    const down = (n.down ?? []).includes(host) || (n.down ?? []).includes(ip);
    const lan = ip.startsWith("192.168.") || ip.startsWith("10.");
    const vpnNeeded = ip.startsWith("10.") && !n.vpns.some((v) => v.connected) && !n.ip.startsWith("10.");
    const name = /^\d/.test(host) ? ip : `${host} [${ip}]`;
    const out = ["", `Pinging ${name} with 32 bytes of data:`];
    if (down || vpnNeeded) {
      for (let i = 0; i < 4; i++) out.push("Request timed out.");
      out.push("", `Ping statistics for ${ip}:`, "    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss),", "");
      return out;
    }
    const base = lan ? 1 : ip.startsWith("10.") ? 18 : 12;
    const times = [base, base + 2, base + 1, base + 3].map((t) => (lan ? "<1" : String(t)));
    for (const t of times) out.push(`Reply from ${ip}: bytes=32 time${t === "<1" ? "<1" : `=${t}`}ms TTL=${lan ? 64 : 117}`);
    out.push("", `Ping statistics for ${ip}:`, "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),", "Approximate round trip times in milli-seconds:", lan ? "    Minimum = 0ms, Maximum = 1ms, Average = 0ms" : `    Minimum = ${base}ms, Maximum = ${base + 3}ms, Average = ${base + 1}ms`, "");
    return out;
  }
  const tr = /^tracert (\S+)/.exec(lc);
  if (tr) {
    const host = tr[1];
    const ip = hostIp(n, host);
    if (offline || !ip) return [`Unable to resolve target system name ${host}.`, ""];
    const hops = [n.gateway, "10.42.0.1", "96.120.88.233", "68.86.143.89", "96.110.42.117", "be-32021-cs02.newyork.ibone.example.net [96.110.42.117]", "72.14.209.162", ip];
    const out = ["", `Tracing route to ${/^\d/.test(host) ? ip : `${host} [${ip}]`}`, "over a maximum of 30 hops:", ""];
    hops.forEach((h, i) => {
      const t = i === 0 ? ["<1", "<1", "<1"] : [String(6 + i * 2), String(7 + i * 2), String(6 + i * 2)];
      const slow = i === 4;
      const tt = slow ? ["38", "41", "39"] : t;
      out.push(`  ${String(i + 1).padStart(2)}    ${tt.map((x) => `${x} ms`.padStart(6)).join("  ")}  ${h}`);
    });
    out.push("", "Trace complete.", "");
    return out;
  }
  const ns = /^nslookup (\S+)/.exec(lc);
  if (ns) {
    const host = ns[1];
    const ip = hostIp(n, host);
    const out = [`Server:  router.home`, `Address:  ${n.dns}`, ""];
    if (offline) return ["DNS request timed out.", "    timeout was 2 seconds.", `*** Can't find server name for address ${n.dns}: Timed out`, ""];
    if (!ip) return [...out, `*** router.home can't find ${host}: Non-existent domain`, ""];
    return [...out, "Non-authoritative answer:", `Name:    ${host}`, `Address:  ${ip}`, ""];
  }
  if (lc.startsWith("echo ")) return [cmd.slice(5), ""];
  if (lc.startsWith("cd ")) return [""];
  return [`'${cmd.split(" ")[0]}' is not recognized as an internal or external command,`, "operable program or batch file.", ""];
}

/* ------------------------------------------------------------------ */
/* apply                                                               */
/* ------------------------------------------------------------------ */

function kv(v: unknown): [string, string] {
  const s = String(v ?? "");
  const i = s.indexOf("=");
  return i < 0 ? [s, ""] : [s.slice(0, i).trim(), s.slice(i + 1).trim()];
}

function setSetting(d: WinDoc, key: string, value: string) {
  d.settings = { ...(d.settings ?? {}), [key]: value };
  const n = { ...(d.net ?? {}) };
  if (key === "airplane") {
    d.settings.wifi = value === "on" ? "off" : "on";
    d.settings.bt = value === "on" ? "off" : "on";
  }
  if (key === "wifi" && value === "on" && S(d, "airplane") === "on") d.settings.airplane = "off";
  d.net = n;
}

function toast(d: WinDoc, title: string, text: string) {
  d.toast = { title, text, n: (d.toast?.n ?? 0) + 1 };
}

function addFlag(d: WinDoc, k: string, v: string) {
  const list = flagList(d, k);
  if (!list.includes(v)) list.push(v);
  d.flags = { ...(d.flags ?? {}), [k]: list.join("|") };
}

export function applyWin(doc: WinDoc, c: SimCommit, ui: SimUi): { doc: WinDoc; ui?: Partial<SimUi> } {
  const d = clone(doc) as WinDoc;
  d.flags = { ...(d.flags ?? {}) };
  delete d.flags.pinError;
  const sel = ui.selection ?? "";

  if (c.kind === "type") {
    const t = c.target;
    if (t.startsWith("notepad:")) {
      const path = t.slice(8);
      let it = getItem(d, path);
      if (!it) {
        const p = newItem(d, parentOf(path), baseOf(path), false);
        it = p ? getItem(d, p) : null;
      }
      if (it) {
        it.text = c.value;
        it.size = `${Math.max(1, Math.ceil(c.value.length / 1024))} KB`;
        it.modified = STAMP;
        openWin(d, "notepad", { file: realPath(d, path), text: c.value });
      }
      return { doc: d };
    }
    if (t.startsWith("form:")) {
      const id = t.slice(5);
      d.webState = { ...(d.webState ?? {}), [id]: c.value };
      const w = d.windows.find((x) => x.app === "edge" || x.app === "edgeprivate");
      const b = allPagesBlock(d, id);
      if (b && b.t === "form") {
        if (b.toast) toast(d, "Saved", b.toast);
        if (b.goto && w) navTab(d, w, b.goto);
      }
      return { doc: d };
    }
    snapshot(d);
    const np = renameItem(d, t, c.value);
    if (np) {
      d.fresh = null;
      return { doc: d, ui: { selection: `file:${np}` } };
    }
    d.undo = d.undo?.slice(0, -1);
    d.fresh = null;
    return { doc: d };
  }

  if (c.kind === "click") {
    if (c.target.startsWith("web:")) {
      const id = c.target.slice(4);
      d.webState = { ...(d.webState ?? {}), [id]: "clicked" };
      const w = d.windows.find((x) => (x.app === "edge" || x.app === "edgeprivate") && x.id === d.focus) ?? d.windows.find((x) => x.app === "edge" || x.app === "edgeprivate");
      const b = allPagesBlock(d, id);
      if (b && b.t === "button") {
        if (b.toast) toast(d, "Done", b.toast);
        if (b.download) addDownload(d, b.download.name, b.download.size, b.download.danger, w ? activeTab(w).url : undefined);
        if (b.goto && w) navTab(d, w, b.goto);
        if (b.download && w) w.pane = "downloads";
      }
      if (b && b.t === "product" && w && b.href) navTab(d, w, b.href);
    }
    return { doc: d };
  }

  if (c.kind !== "command") return { doc: d };
  const v = c.value === undefined ? "" : String(c.value);

  switch (c.id) {
    /* ---------------- windows ---------------- */
    case "win.open": {
      if (!v) return { doc: d };
      if (v.startsWith("webapp:")) {
        const wa = (d.webApps ?? []).find((x) => `webapp:${normUrl(x.url)}` === v);
        const w = openWin(d, "edge");
        if (wa) navTab(d, w, wa.url);
        return { doc: d };
      }
      openWin(d, v);
      return { doc: d };
    }
    case "win.focus": {
      const w = winOf(d, v);
      if (!w) {
        if (!v) d.focus = null;
        return { doc: d };
      }
      if (deskOf(w) !== curDesk(d)) d.desk = deskOf(w);
      d.windows = [...d.windows.filter((x) => x.id !== v), w];
      w.min = false;
      d.focus = v;
      d.peek = null;
      return { doc: d };
    }
    case "win.minimize": {
      const w = winOf(d, v);
      if (w) {
        w.min = true;
        if (d.focus === v) focusNext(d);
      }
      return { doc: d };
    }
    case "win.maximize": {
      const w = winOf(d, v);
      if (w) {
        w.max = !w.max || Boolean(w.snap);
        w.snap = null;
        w.min = false;
        d.focus = v;
      }
      return { doc: d };
    }
    case "win.restore": {
      const w = winOf(d, v);
      if (w) {
        w.max = false;
        w.snap = null;
        w.min = false;
      }
      return { doc: d };
    }
    case "win.close": {
      closeWin(d, v);
      return { doc: d };
    }
    case "win.snap": {
      const [app, pos] = v.split(":");
      const w = winOf(d, app);
      if (w) {
        w.snap = pos || "left";
        w.max = false;
        w.min = false;
        d.windows = [...d.windows.filter((x) => x.id !== app), w];
        d.focus = app;
      }
      return { doc: d };
    }
    case "win.showDesktop": {
      const vis = d.windows.filter((w) => !w.min && deskOf(w) === curDesk(d));
      if (vis.length) {
        d.peek = vis.map((w) => w.id);
        for (const w of vis) w.min = true;
        d.focus = null;
      } else if (d.peek?.length) {
        for (const id of d.peek) {
          const w = winOf(d, id);
          if (w) w.min = false;
        }
        d.focus = d.peek[d.peek.length - 1];
        d.peek = null;
      }
      return { doc: d };
    }
    case "win.lock":
      d.locked = true;
      return { doc: d };
    case "win.unlock":
      if (v === pinOf(d) || (d.password && v === d.password)) d.locked = false;
      else d.flags.pinError = true;
      return { doc: d };
    case "win.taskView":
      return { doc: d };
    case "vd.new":
      d.desks = (d.desks ?? 1) + 1;
      d.desk = d.desks;
      d.focus = null;
      return { doc: d };
    case "vd.switch": {
      const n = Math.max(1, Math.min(d.desks ?? 1, Number(v) || 1));
      d.desk = n;
      focusNext(d);
      return { doc: d };
    }
    case "vd.close": {
      const n = Number(v) || curDesk(d);
      if ((d.desks ?? 1) <= 1) return { doc: d };
      for (const w of d.windows) {
        if (deskOf(w) === n) w.desk = Math.max(1, n - 1);
        else if (deskOf(w) > n) w.desk = deskOf(w) - 1;
      }
      d.desks = (d.desks ?? 1) - 1;
      d.desk = Math.min(curDesk(d), d.desks);
      focusNext(d);
      return { doc: d };
    }
    case "power.restart":
    case "update.restart":
    case "power.signout":
      d.windows = [];
      d.focus = null;
      d.locked = true;
      d.clipboard = null;
      d.flags.boot = c.id === "power.signout" ? "signout" : "restart";
      d.flags.bootN = Number(d.flags.bootN ?? 0) + 1;
      if (c.id !== "power.signout" && d.flags.updateInstalled) d.flags.updateDone = true;
      return { doc: d };
    case "power.shutdown":
      d.windows = [];
      d.focus = null;
      d.locked = true;
      d.power = "off";
      if (d.flags.updateInstalled) d.flags.updateDone = true;
      return { doc: d };
    case "power.sleep":
      d.power = "sleep";
      d.locked = true;
      return { doc: d };
    case "power.on":
      d.power = "on";
      d.locked = true;
      return { doc: d };
    case "taskbar.pin":
      d.taskbar = [...taskbarApps(d).filter((x) => x !== v), v];
      return { doc: d };
    case "taskbar.unpin":
      d.taskbar = taskbarApps(d).filter((x) => x !== v);
      return { doc: d };
    case "start.pin":
      d.startPins = [...startPins(d).filter((x) => x !== v), v];
      return { doc: d };
    case "start.unpin":
      d.startPins = startPins(d).filter((x) => x !== v);
      return { doc: d };
    case "notify.clear":
      d.notifications = [];
      return { doc: d };
    case "clip.open":
      return { doc: d };

    /* ---------------- Explorer ---------------- */
    case "explorer.nav":
      explorerNav(d, v);
      return { doc: d, ui: { selection: "" } };
    case "explorer.back": {
      const w = explorerWin(d);
      const prev = (w.back ?? []).slice(-1)[0];
      if (prev) {
        w.back = (w.back ?? []).slice(0, -1);
        w.fwd = [w.loc ?? "Home", ...(w.fwd ?? [])];
        w.loc = prev;
        w.search = "";
      }
      return { doc: d, ui: { selection: "" } };
    }
    case "explorer.forward": {
      const w = explorerWin(d);
      const next = (w.fwd ?? [])[0];
      if (next) {
        w.fwd = (w.fwd ?? []).slice(1);
        w.back = [...(w.back ?? []), w.loc ?? "Home"];
        w.loc = next;
        w.search = "";
      }
      return { doc: d, ui: { selection: "" } };
    }
    case "explorer.up": {
      const w = explorerWin(d);
      const loc = w.loc ?? "Home";
      if (SPECIAL.includes(loc)) {
        if (loc !== "Home" && loc !== "This PC") explorerNav(d, "This PC");
        else if (loc === "This PC") explorerNav(d, "Home");
        return { doc: d, ui: { selection: "" } };
      }
      const p = parentOf(loc);
      const r = rootOf(d, loc);
      explorerNav(d, p || (r?.root === "onedrive" ? "Home" : "This PC"));
      return { doc: d, ui: { selection: "" } };
    }
    case "explorer.refresh":
      return { doc: d };
    case "explorer.view": {
      const w = explorerWin(d);
      w.view = v.toLowerCase().replace(/ icons?$/, "").replace(/\s+/g, "") || "details";
      return { doc: d };
    }
    case "explorer.sort": {
      const w = explorerWin(d);
      const k = v.toLowerCase();
      w.sort = k.includes("date") ? "date" : k.includes("type") ? "type" : k.includes("size") ? "size" : k.includes("status") ? "status" : "name";
      w.dir = w.sort === "date" ? "desc" : "asc";
      return { doc: d };
    }
    case "explorer.sortDir": {
      const w = explorerWin(d);
      w.dir = v.toLowerCase().startsWith("desc") ? "desc" : "asc";
      return { doc: d };
    }
    case "explorer.group": {
      const w = explorerWin(d);
      w.group = v.toLowerCase() === "none" ? "" : v.toLowerCase();
      return { doc: d };
    }
    case "explorer.toggle": {
      const key = `explorer.${v.toLowerCase()}`;
      setSetting(d, key, S(d, key) === "on" ? "off" : "on");
      return { doc: d };
    }
    case "explorer.search": {
      const w = explorerWin(d);
      w.search = v;
      return { doc: d, ui: { selection: "" } };
    }
    case "fs.open": {
      const u = openFile(d, v);
      return { doc: d, ui: u };
    }
    case "fs.runAnyway": {
      d.flags.ran = v;
      delete d.flags.smartApp;
      toast(d, "Windows Security", `${v} is running.`);
      return { doc: d };
    }
    case "fs.dontRun":
      delete d.flags.smartApp;
      return { doc: d };
    case "fs.cut":
    case "fs.copy": {
      const paths = selPaths(sel).map((p) => realPath(d, p));
      if (paths.length) d.clipboard = { mode: c.id === "fs.cut" ? "cut" : "copy", paths };
      return { doc: d };
    }
    case "fs.undo": {
      const last = (d.undo ?? []).slice(-1)[0];
      if (last) {
        d.fs = last.fs;
        d.recycle = last.recycle;
        d.undo = (d.undo ?? []).slice(0, -1);
        dropMissing(d);
      }
      return { doc: d, ui: { selection: "" } };
    }
    case "fs.move":
    case "fs.copyTo": {
      const paths = selPaths(sel);
      snapshot(d);
      const out = moveItems(d, paths, v, c.id === "fs.copyTo");
      if (c.id === "fs.move" && d.clipboard?.mode === "cut") d.clipboard = null;
      const ex = winOf(d, "explorer");
      const showing = ex && ex.loc && ex.loc.toLowerCase() === realPath(d, v).toLowerCase();
      return { doc: d, ui: { selection: showing ? fileSel(out) : "" } };
    }
    case "fs.delete":
    case "fs.deletePermanent": {
      const paths = selPaths(sel);
      snapshot(d);
      deleteItems(d, paths, c.id === "fs.deletePermanent");
      return { doc: d, ui: { selection: "" } };
    }
    case "fs.newFolder": {
      snapshot(d);
      const p = newItem(d, v, "New folder", true);
      d.fresh = p;
      return { doc: d, ui: { selection: p ? `file:${p}` : "" } };
    }
    case "fs.newFile": {
      snapshot(d);
      const p = newItem(d, parentOf(v), baseOf(v), false);
      d.fresh = p;
      return { doc: d, ui: { selection: p ? `file:${p}` : "" } };
    }
    case "fs.compress": {
      const paths = selPaths(sel).map((p) => realPath(d, p));
      if (!paths.length) return { doc: d };
      snapshot(d);
      const parentPath = parentOf(paths[0]);
      const parent = getItem(d, parentPath);
      if (!parent) return { doc: d };
      parent.children = parent.children ?? [];
      const first = getItem(d, paths[0]);
      const base = first ? (isFolder(first) ? first.name : first.name.replace(/\.[^.]+$/, "")) : "Archive";
      const name = uniqueName(parent.children, `${base}.zip`);
      const zip: WinItem = { name, modified: STAMP, size: "184 KB", zip: paths.map((p) => getItem(d, p)).filter((x): x is WinItem => Boolean(x)).map((x) => clone(x)) };
      parent.children.push(zip);
      const zp = `${parentPath}/${name}`;
      setSync(d, zip, zp);
      d.fresh = zp;
      return { doc: d, ui: { selection: `file:${zp}` } };
    }
    case "fs.extract": {
      const zp = selPaths(sel)[0];
      const zip = zp ? getItem(d, zp) : null;
      if (!zip?.zip) return { doc: d };
      snapshot(d);
      const dest = v || `${parentOf(realPath(d, zp))}/${zip.name.replace(/\.zip$/i, "")}`;
      const folder = ensureFolder(d, dest);
      if (folder) {
        folder.children = folder.children ?? [];
        for (const it of zip.zip) {
          const i = folder.children.findIndex((x) => x.name.toLowerCase() === it.name.toLowerCase());
          if (i >= 0) folder.children.splice(i, 1);
          folder.children.push(clone(it));
        }
        setSync(d, folder, realPath(d, dest));
      }
      explorerNav(d, dest);
      return { doc: d, ui: { selection: "" } };
    }
    case "fs.pinQuick": {
      const paths = selPaths(sel).map((p) => realPath(d, p));
      d.quick = [...(d.quick ?? []).filter((p) => !paths.includes(p)), ...paths];
      return { doc: d };
    }
    case "fs.unpinQuick": {
      const paths = (selPaths(sel).length ? selPaths(sel) : [v]).map((p) => realPath(d, p).toLowerCase());
      d.quick = (d.quick ?? []).filter((p) => !paths.includes(p.toLowerCase()));
      return { doc: d };
    }
    case "fs.attr": {
      const [k, val] = kv(v);
      for (const p of selPaths(sel)) {
        const it = getItem(d, p);
        if (!it) continue;
        if (k === "readonly") it.readonly = val === "on";
        if (k === "hidden") it.hidden = val === "on";
      }
      return { doc: d };
    }
    case "od.keep":
    case "od.free": {
      for (const p of selPaths(sel)) {
        const it = getItem(d, p);
        if (it && rootOf(d, p)?.root === "onedrive") walkItems(it, (x) => (x.sync = c.id === "od.keep" ? "always" : "cloud"));
      }
      return { doc: d };
    }
    case "share.send":
    case "share.perm":
    case "share.expire": {
      const paths = selPaths(sel);
      const i = v.lastIndexOf(":");
      const email = (i < 0 ? v : v.slice(0, i)).trim();
      const rest = (i < 0 ? "" : v.slice(i + 1)).trim().toLowerCase();
      for (const p of paths) {
        const it = getItem(d, p);
        if (!it) continue;
        const list = (it.shared ?? []).filter((s) => s.email.toLowerCase() !== email.toLowerCase());
        const prev = (it.shared ?? []).find((s) => s.email.toLowerCase() === email.toLowerCase());
        if (c.id === "share.expire") list.push({ ...(prev ?? { email, perm: "view" }), expires: rest });
        else list.push({ ...(prev ?? {}), email, perm: (rest.startsWith("edit") ? "edit" : rest.startsWith("comment") ? "comment" : "view") });
        it.shared = list;
      }
      if (c.id === "share.send") toast(d, "Shared", `Link sent to ${email}.`);
      return { doc: d };
    }
    case "share.remove": {
      for (const p of selPaths(sel)) {
        const it = getItem(d, p);
        if (!it) continue;
        if (v.toLowerCase() === "link") it.link = null;
        else it.shared = (it.shared ?? []).filter((s) => s.email.toLowerCase() !== v.toLowerCase());
      }
      return { doc: d };
    }
    case "share.link":
    case "share.general": {
      for (const p of selPaths(sel)) {
        const it = getItem(d, p);
        if (!it) continue;
        it.link = v.toLowerCase() === "restricted" ? null : v.toLowerCase();
      }
      if (c.id === "share.link") toast(d, "Link copied", "The link is copied to your clipboard.");
      return { doc: d };
    }
    case "share.app":
      d.flags.sharedVia = v;
      return { doc: d };
    case "bin.restore":
      restoreBin(d, selPaths(sel, "bin:"));
      return { doc: d, ui: { selection: "" } };
    case "bin.restoreAll":
      restoreBin(d, (d.recycle ?? []).map((b) => b.item.name));
      return { doc: d, ui: { selection: "" } };
    case "bin.empty":
      d.recycle = [];
      return { doc: d, ui: { selection: "" } };
    case "bin.delete": {
      const names = selPaths(sel, "bin:").map((x) => x.toLowerCase());
      d.recycle = (d.recycle ?? []).filter((b) => !names.includes(b.item.name.toLowerCase()));
      return { doc: d, ui: { selection: "" } };
    }

    /* ---------------- Settings ---------------- */
    case "settings.nav": {
      const w = openWin(d, "settings");
      if (w.page !== v) w.pback = [...(w.pback ?? []), w.page ?? "home"].slice(-20);
      w.page = v || "home";
      return { doc: d };
    }
    case "settings.back": {
      const w = openWin(d, "settings");
      const prev = (w.pback ?? []).slice(-1)[0];
      if (prev) {
        w.pback = (w.pback ?? []).slice(0, -1);
        w.page = prev;
      }
      return { doc: d };
    }
    case "settings.set": {
      const [k, val] = kv(v);
      if (k) setSetting(d, k, val);
      return { doc: d };
    }
    case "settings.slide": {
      const [k, val] = kv(v);
      const key = k === "brightness" ? "display.brightness" : k;
      if (key) setSetting(d, key, val);
      return { doc: d };
    }
    case "app.uninstall": {
      addFlag(d, "uninstalled", v);
      const id = (d.webApps ?? []).find((w) => w.name.toLowerCase() === v.toLowerCase());
      if (id) {
        d.webApps = (d.webApps ?? []).filter((w) => w !== id);
        d.startPins = startPins(d).filter((x) => x !== `webapp:${normUrl(id.url)}`);
      }
      toast(d, "Apps", `${v} was uninstalled.`);
      return { doc: d };
    }
    case "startup.disable":
    case "startup.enable": {
      const name = selPaths(sel, "startup:")[0] ?? v;
      const list = startupApps(d).map((a) => (a.name.toLowerCase() === name.toLowerCase() ? { ...a, on: c.id === "startup.enable" } : a));
      d.startup = list;
      return { doc: d };
    }
    case "taskmgr.tab": {
      const w = openWin(d, "taskmgr");
      w.tm = v || "processes";
      return { doc: d };
    }
    case "taskmgr.perf": {
      const w = openWin(d, "taskmgr");
      w.perf = v || "cpu";
      return { doc: d };
    }
    case "taskmgr.endTask": {
      const name = selPaths(sel, "proc:")[0] ?? v;
      const p = processes(d).find((x) => x.name.toLowerCase() === name.toLowerCase());
      if (p) {
        addFlag(d, "ended", p.name);
        if (p.app) closeWin(d, p.app);
        if (d.processes) d.processes = d.processes.filter((x) => x.name.toLowerCase() !== name.toLowerCase());
      }
      return { doc: d, ui: { selection: "" } };
    }
    case "printer.queue":
      openWin(d, "printqueue", { file: v });
      return { doc: d };
    case "printer.default": {
      const list = printers(d).map((p) => ({ ...p, default: p.name === v }));
      d.printers = list;
      setSetting(d, "printer.manage", "off");
      return { doc: d };
    }
    case "printer.pause":
    case "printer.resume": {
      d.printers = printers(d).map((p) => (p.name === v ? { ...p, paused: c.id === "printer.pause", status: c.id === "printer.pause" ? "Paused" : (p.jobs ?? []).length ? "Printing" : "Idle" } : p));
      return { doc: d };
    }
    case "printer.testPage":
      d.printers = printers(d).map((p) => (p.name === v ? { ...p, jobs: [...(p.jobs ?? []), { name: "Test Page", owner: userName(d), pages: 1, status: p.paused ? "Paused" : "Printing", size: "88.4 KB", submitted: NOW.time }] } : p));
      toast(d, "Printers & scanners", "A test page was sent to the printer.");
      return { doc: d };
    case "printer.remove":
      addFlag(d, "printersRemoved", v);
      return { doc: d };
    case "printer.add":
      d.printers = [...printers(d).filter((p) => p.name !== v), { name: v, kind: /scan/i.test(v) ? "scanner" : "mfp", status: "Idle" }];
      d.flags.addable = String(d.flags.addable ?? "").split("|").filter((x) => x && x !== v).join("|");
      return { doc: d };
    case "printer.cancel": {
      const job = selPaths(sel, "job:")[0] ?? v;
      d.printers = printers(d).map((p) => ({ ...p, jobs: (p.jobs ?? []).filter((j) => j.name.toLowerCase() !== job.toLowerCase()) }));
      return { doc: d, ui: { selection: "" } };
    }
    case "printer.restartJob": {
      const job = selPaths(sel, "job:")[0] ?? v;
      d.printers = printers(d).map((p) => ({ ...p, jobs: (p.jobs ?? []).map((j) => (j.name.toLowerCase() === job.toLowerCase() ? { ...j, status: "Printing" } : j)) }));
      return { doc: d };
    }
    case "bt.add": {
      const kind: WinDevice["kind"] = /keyboard|k\d{3}/i.test(v) ? "keyboard" : /mouse|m\d{3}/i.test(v) ? "mouse" : /headset|headphone|buds|earbud/i.test(v) ? "headset" : /speaker/i.test(v) ? "speaker" : /phone/i.test(v) ? "phone" : "other";
      d.devices = [...devices(d).filter((x) => x.name !== v), { name: v, kind, connected: true, bt: true, battery: "90%" }];
      d.nearby = (d.nearby ?? []).filter((x) => x !== v);
      return { doc: d };
    }
    case "bt.remove":
      d.devices = devices(d).filter((x) => x.name !== v);
      return { doc: d };
    case "bt.connect":
    case "bt.disconnect":
      d.devices = devices(d).map((x) => (x.name === v ? { ...x, connected: c.id === "bt.connect" } : x));
      return { doc: d };
    case "display.detect":
      if (d.flags.monitor2) {
        d.displays = 2;
        delete d.flags.monitor2;
      }
      d.flags.detected = true;
      return { doc: d };
    case "display.identify":
      return { doc: d };
    case "net.connect": {
      d.net = { ...(d.net ?? {}), ssid: v, type: "wifi", connected: true };
      setSetting(d, "wifi", "on");
      return { doc: d };
    }
    case "net.disconnect":
      d.net = { ...(d.net ?? {}), connected: net(d).type === "wifi" ? false : net(d).connected };
      if (net(d).type === "wifi") d.flags.wifiOff = v;
      return { doc: d };
    case "net.forget":
      addFlag(d, "forgot", v);
      if (net(d).ssid === v && net(d).type === "wifi") d.net = { ...(d.net ?? {}), connected: false };
      return { doc: d };
    case "net.vpn":
    case "net.vpnOff": {
      const n = net(d);
      d.net = { ...(d.net ?? {}), vpns: n.vpns.map((x) => (x.name === v ? { ...x, connected: c.id === "net.vpn" } : x)) };
      return { doc: d };
    }
    case "net.troubleshoot":
      d.flags.troubleshot = true;
      return { doc: d };
    case "update.check":
      d.flags.updateChecked = true;
      return { doc: d };
    case "update.install":
      d.flags.updateChecked = true;
      d.flags.updateInstalled = true;
      return { doc: d };
    case "acct.pin":
      d.pin = v;
      toast(d, "Sign-in options", "Your PIN was changed.");
      return { doc: d };
    case "acct.password":
      d.password = v;
      toast(d, "Sign-in options", "Your password was changed.");
      return { doc: d };
    case "sec.nav": {
      const w = openWin(d, "security");
      w.page = v || "home";
      return { doc: d };
    }
    case "sec.scan":
      d.flags.scanned = v || "quick";
      d.security = { ...(d.security ?? {}), scanned: v || "quick" };
      return { doc: d };
    case "sec.action": {
      const sec = d.security ?? {};
      const status = v === "allow" ? "Allowed" : v === "quarantine" ? "Quarantined" : "Removed";
      const threats = (sec.threats ?? []).map((t) => ({ ...t, status: t.status && t.status !== "Active" ? t.status : status }));
      if (v !== "allow") for (const t of sec.threats ?? []) {
        if (getItem(d, t.file)) detach(d, realPath(d, t.file));
      }
      d.security = { ...sec, threats, history: [...(sec.history ?? []), ...threats.map((t) => `${t.name} ${status.toLowerCase()}`)] };
      dropMissing(d);
      return { doc: d };
    }

    /* ---------------- Edge ---------------- */
    case "edge.nav": {
      const w = edgeWin(d);
      navTab(d, w, v);
      return { doc: d };
    }
    case "edge.search": {
      const w = edgeWin(d);
      navTab(d, w, searchUrl(v));
      return { doc: d };
    }
    case "edge.newTab": {
      const w = edgeWin(d);
      const id = newTabId(w);
      w.tabs = [...(w.tabs ?? []), { id, url: "edge://newtab" }];
      w.tab = id;
      w.pane = null;
      return { doc: d };
    }
    case "edge.closeTab": {
      const w = edgeWin(d);
      const tabs = w.tabs ?? [];
      const act = activeTab(w);
      const t = act.url === normUrl(v) || !v ? act : tabs.find((x) => x.url === normUrl(v)) ?? act;
      const idx = tabs.indexOf(t);
      w.tabs = tabs.filter((x) => x !== t);
      if (!w.tabs.length) closeWin(d, w.id);
      else if (w.tab === t.id) w.tab = w.tabs[Math.max(0, idx - 1)].id;
      return { doc: d };
    }
    case "edge.tab": {
      const w = edgeWin(d);
      const tabs = w.tabs ?? [];
      const t = tabs.find((x) => x.url === normUrl(v) && x.id !== w.tab) ?? tabs.find((x) => x.url === normUrl(v)) ?? tabs.find((x) => x.id === v);
      if (t) w.tab = t.id;
      w.pane = null;
      return { doc: d };
    }
    case "edge.back":
    case "edge.forward": {
      const w = edgeWin(d);
      const t = activeTab(w);
      if (t.file || (t.cloud && c.id === "edge.back")) {
        if (t.file) t.file = undefined;
        else t.cloud = parentOf(t.cloud ?? "") || undefined;
        return { doc: d };
      }
      if (c.id === "edge.back" && (t.back ?? []).length) {
        t.fwd = [t.url, ...(t.fwd ?? [])];
        t.url = (t.back ?? []).slice(-1)[0];
        t.back = (t.back ?? []).slice(0, -1);
        t.bypass = false;
      } else if (c.id === "edge.forward" && (t.fwd ?? []).length) {
        t.back = [...(t.back ?? []), t.url];
        t.url = (t.fwd ?? [])[0];
        t.fwd = (t.fwd ?? []).slice(1);
      }
      return { doc: d };
    }
    case "edge.refresh":
    case "edge.siteInfo":
    case "edge.zoom":
      return { doc: d };
    case "edge.pane": {
      const w = edgeWin(d);
      w.pane = v === "none" || !v || w.pane === v ? null : v;
      return { doc: d };
    }
    case "edge.favBar":
      d.showFavBar = !d.showFavBar;
      return { doc: d };
    case "edge.inPrivate":
      openWin(d, "edgeprivate");
      return { doc: d };
    case "edge.smartBack": {
      const w = edgeWin(d);
      const t = activeTab(w);
      if ((t.back ?? []).length) {
        t.url = (t.back ?? []).slice(-1)[0];
        t.back = (t.back ?? []).slice(0, -1);
      } else t.url = "edge://newtab";
      t.bypass = false;
      return { doc: d };
    }
    case "edge.smartContinue": {
      const w = edgeWin(d);
      activeTab(w).bypass = true;
      return { doc: d };
    }
    case "edge.reportUnsafe": {
      const url = selPaths(sel, "page:")[0] ?? (d.windows.find((x) => x.app === "edge") ? activeTab(edgeWin(d)).url : "");
      d.flags.reported = url;
      toast(d, "Microsoft Defender SmartScreen", "Thanks for your report. It helps keep people safe.");
      return { doc: d };
    }
    case "edge.favorite": {
      const w = edgeWin(d);
      const url = selPaths(sel, "page:")[0] ?? activeTab(w).url;
      const folder = v || "Favorites bar";
      const name = pageTitle(d, url);
      d.favorites = [...(d.favorites ?? []).filter((f) => f.url !== url), { name, url, folder }];
      if (folder !== "Favorites bar" && folder !== "Other favorites" && !(d.favFolders ?? []).includes(folder)) d.favFolders = [...(d.favFolders ?? []), folder];
      return { doc: d };
    }
    case "edge.favRemove":
      d.favorites = (d.favorites ?? []).filter((f) => f.url !== normUrl(v));
      return { doc: d };
    case "edge.favFolder":
      if (v && !(d.favFolders ?? []).includes(v)) d.favFolders = [...(d.favFolders ?? []), v];
      return { doc: d };
    case "edge.download": {
      const w = edgeWin(d);
      const t = activeTab(w);
      const page = pageOfTab(d, t);
      let spec: { name: string; size?: string; danger?: string } | undefined;
      const scan = (bs: WebBlock[]) => {
        for (const b of bs) {
          if ((b.t === "link" || b.t === "button") && b.download && b.download.name === v) spec = b.download;
          if (b.t === "cols") b.cols.forEach(scan);
        }
      };
      if (page) scan(page.blocks);
      addDownload(d, v, spec?.size, spec?.danger, t.url);
      w.pane = "downloads";
      return { doc: d };
    }
    case "edge.dlKeep": {
      d.downloads = (d.downloads ?? []).map((x) => (x.name === v ? { ...x, status: "done" } : x));
      const dl = (d.downloads ?? []).find((x) => x.name === v);
      putDownload(d, v, dl?.size);
      return { doc: d };
    }
    case "edge.dlDelete": {
      d.downloads = (d.downloads ?? []).filter((x) => x.name !== v);
      const root = d.fs.find((r) => r.root === "downloads");
      if (root?.children) root.children = root.children.filter((x) => x.name !== v);
      return { doc: d };
    }
    case "edge.dlOpen": {
      const root = d.fs.find((r) => r.root === "downloads");
      if (root && getItem(d, `${root.name}/${v}`)) openFile(d, `${root.name}/${v}`);
      return { doc: d };
    }
    case "edge.dlShow": {
      const root = d.fs.find((r) => r.root === "downloads");
      if (root) explorerNav(d, root.name);
      return { doc: d, ui: { selection: root ? `file:${root.name}/${v}` : "" } };
    }
    case "edge.installApp": {
      const w = edgeWin(d);
      const t = activeTab(w);
      const page = pageOfTab(d, t);
      const url = v || t.url;
      const name = page?.site ?? page?.title ?? url;
      d.webApps = [...(d.webApps ?? []).filter((x) => normUrl(x.url) !== normUrl(url)), { name, url: normUrl(url) }];
      d.startPins = [...startPins(d), `webapp:${normUrl(url)}`];
      toast(d, "Microsoft Edge", `${name} was installed. Find it in Start.`);
      return { doc: d };
    }
    case "edge.clearData":
      d.flags.cleared = v;
      if (v.toLowerCase().includes("history")) d.history = [];
      if (v.toLowerCase().includes("download")) d.downloads = [];
      toast(d, "Microsoft Edge", "Browsing data was cleared.");
      return { doc: d };
    case "edge.historyDelete":
      d.history = (d.history ?? []).filter((h) => h.url !== normUrl(v));
      return { doc: d };
    case "web.set": {
      const [k, val] = kv(v);
      d.webState = { ...(d.webState ?? {}), [k]: val };
      return { doc: d };
    }
    case "cloud.open": {
      const w = edgeWin(d);
      const t = activeTab(w);
      const it = getItem(d, v);
      if (!it) return { doc: d };
      if (isFolder(it)) {
        t.cloud = realPath(d, v);
        t.file = undefined;
        t.section = undefined;
      } else {
        t.file = realPath(d, v);
        d.recent = [t.file, ...(d.recent ?? []).filter((x) => x !== t.file)].slice(0, 8);
      }
      return { doc: d, ui: { selection: "" } };
    }
    case "cloud.view": {
      const w = edgeWin(d);
      const t = activeTab(w);
      t.section = v;
      t.file = undefined;
      if (v === "My files" || v === "My Drive") t.section = undefined;
      return { doc: d, ui: { selection: "" } };
    }
    case "cloud.restore": {
      const p = selPaths(sel)[0];
      const it = p ? getItem(d, p) : null;
      if (it?.versions) {
        const ver = it.versions.find((x) => x.label.toLowerCase() === v.toLowerCase());
        if (ver) {
          it.versions = it.versions.map((x) => ({ ...x, current: x === ver }));
          if (ver.text !== undefined) it.text = ver.text;
          it.modified = STAMP;
        }
      }
      return { doc: d };
    }
    case "doc.accept":
    case "doc.reject": {
      const p = selPaths(sel)[0];
      const it = p ? getItem(d, p) : null;
      if (it?.suggestions) it.suggestions = it.suggestions.map((s) => (s.id === v ? { ...s, status: c.id === "doc.accept" ? "accepted" : "rejected" } : s));
      return { doc: d };
    }

    /* ---------------- small apps ---------------- */
    case "cmd.run": {
      const w = openWin(d, "cmd");
      const prompt = `C:\\Users\\${userName(d).split(" ")[0]}>`;
      if (/^cls$/i.test(v.trim())) {
        w.out = [];
        return { doc: d };
      }
      if (/^exit$/i.test(v.trim())) {
        closeWin(d, "cmd");
        return { doc: d };
      }
      w.out = [...(w.out ?? []), `${prompt}${v}`, ...runCmd(d, v)].slice(-400);
      return { doc: d };
    }
    case "snip.capture": {
      const f = focused(d);
      d.snip = { mode: v || "rectangle", of: v === "fullscreen" ? "Full screen" : f ? (f.app === "explorer" ? "File Explorer" : appInfo(f.app).name) : "Desktop" };
      openWin(d, "snip");
      toast(d, "Snipping Tool", "Snip copied to clipboard. Select here to mark up and share.");
      return { doc: d };
    }
    case "snip.save": {
      const parent = parentOf(v);
      ensureFolder(d, parent);
      const p = newItem(d, parent, baseOf(v), false);
      if (p) {
        const it = getItem(d, p);
        if (it) it.size = "212 KB";
      }
      return { doc: d };
    }
    case "notepad.new":
      openWin(d, "notepad", { file: undefined, text: "" });
      return { doc: d };
  }
  return { doc: d };
}
