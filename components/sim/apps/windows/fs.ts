import type { WinDoc, WinItem, WinRoot } from "./types";

/** Locations in File Explorer that are not folders. */
export const SPECIAL = ["Home", "This PC", "Recycle Bin", "Network", "Gallery"];

export const splitPath = (p: string) => p.split("/").filter(Boolean);
export const joinPath = (...parts: string[]) => parts.filter(Boolean).join("/");
export const parentOf = (p: string) => splitPath(p).slice(0, -1).join("/");
export const baseOf = (p: string) => splitPath(p).slice(-1)[0] ?? "";

export function extOf(name: string): string {
  const m = /(\.[A-Za-z0-9]{1,5})$/.exec(name);
  return m ? m[1].toLowerCase() : "";
}

export function stem(name: string): string {
  const e = extOf(name);
  return e ? name.slice(0, -e.length) : name;
}

export const isFolder = (it: WinItem | null | undefined) => Boolean(it && (it.folder || it.children));

export function rootOf(doc: WinDoc, path: string): WinRoot | undefined {
  const r = splitPath(path)[0];
  return doc.fs.find((x) => x.name.toLowerCase() === (r ?? "").toLowerCase());
}

export function getItem(doc: WinDoc, path: string): WinItem | null {
  const segs = splitPath(path);
  if (!segs.length) return null;
  let cur: WinItem | undefined = doc.fs.find((r) => r.name.toLowerCase() === segs[0].toLowerCase());
  for (let i = 1; i < segs.length && cur; i++) {
    cur = (cur.children ?? []).find((c) => c.name.toLowerCase() === segs[i].toLowerCase());
  }
  return cur ?? null;
}

/** Canonical casing of an existing path. */
export function realPath(doc: WinDoc, path: string): string {
  const segs = splitPath(path);
  const out: string[] = [];
  let cur: WinItem | undefined = doc.fs.find((r) => r.name.toLowerCase() === (segs[0] ?? "").toLowerCase());
  if (!cur) return path;
  out.push(cur.name);
  for (let i = 1; i < segs.length && cur; i++) {
    cur = (cur.children ?? []).find((c) => c.name.toLowerCase() === segs[i].toLowerCase());
    out.push(cur ? cur.name : segs[i]);
  }
  return out.join("/");
}

export function children(doc: WinDoc, path: string): WinItem[] {
  const it = getItem(doc, path);
  return it?.children ?? [];
}

export function uniqueName(list: WinItem[], name: string): string {
  const taken = new Set(list.map((c) => c.name.toLowerCase()));
  if (!taken.has(name.toLowerCase())) return name;
  const e = extOf(name);
  const s = e && !/^New folder/i.test(name) ? name.slice(0, -e.length) : name;
  const ee = e && !/^New folder/i.test(name) ? e : "";
  for (let i = 2; i < 200; i++) {
    const n = `${s} (${i})${ee}`;
    if (!taken.has(n.toLowerCase())) return n;
  }
  return `${s} (${Date.now()})${ee}`;
}

export function copyName(list: WinItem[], name: string): string {
  const e = isFolderName(name) ? "" : extOf(name);
  const s = e ? name.slice(0, -e.length) : name;
  return uniqueName(list, `${s} - Copy${e}`);
}

const isFolderName = (n: string) => !extOf(n);

/** Remove the item at path; returns it (the doc must already be a clone). */
export function detach(doc: WinDoc, path: string): WinItem | null {
  const parent = getItem(doc, parentOf(path));
  if (!parent?.children) return null;
  const i = parent.children.findIndex((c) => c.name.toLowerCase() === baseOf(path).toLowerCase());
  if (i < 0) return null;
  return parent.children.splice(i, 1)[0];
}

/** Ensure a folder path exists (creating folders as needed); returns it. */
export function ensureFolder(doc: WinDoc, path: string): WinItem | null {
  const segs = splitPath(path);
  let cur: WinItem | undefined = doc.fs.find((r) => r.name.toLowerCase() === (segs[0] ?? "").toLowerCase());
  if (!cur) return null;
  for (let i = 1; i < segs.length; i++) {
    cur.children = cur.children ?? [];
    let next: WinItem | undefined = cur.children.find((c) => c.name.toLowerCase() === segs[i].toLowerCase());
    if (!next) {
      next = { name: segs[i], folder: true, children: [], modified: STAMP };
      cur.children.push(next);
    }
    cur = next;
  }
  if (!cur.children) cur.children = [];
  cur.folder = true;
  return cur;
}

export const STAMP = "10/20/2026 9:41 AM";

/** Is `inner` the same as, or inside, `outer`? */
export function within(inner: string, outer: string): boolean {
  const a = inner.toLowerCase();
  const b = outer.toLowerCase();
  return a === b || a.startsWith(`${b}/`);
}

/** Replace a path prefix (after a rename or move). */
export function rebase(p: string, from: string, to: string): string {
  if (p.toLowerCase() === from.toLowerCase()) return to;
  if (p.toLowerCase().startsWith(`${from.toLowerCase()}/`)) return to + p.slice(from.length);
  return p;
}

export function walkItems(it: WinItem, fn: (x: WinItem) => void) {
  fn(it);
  for (const c of it.children ?? []) walkItems(c, fn);
}

/** Every item under a path, with paths, for search. */
export function flatten(doc: WinDoc, path: string): { path: string; item: WinItem }[] {
  const out: { path: string; item: WinItem }[] = [];
  const start = getItem(doc, path);
  if (!start) return out;
  const rec = (p: string, it: WinItem) => {
    for (const c of it.children ?? []) {
      const cp = `${p}/${c.name}`;
      out.push({ path: cp, item: c });
      rec(cp, c);
    }
  };
  rec(realPath(doc, path), start);
  return out;
}

export function allFiles(doc: WinDoc): { path: string; item: WinItem }[] {
  return doc.fs.filter((r) => r.root !== "gdrive").flatMap((r) => flatten(doc, r.name));
}

export function fileType(it: WinItem): string {
  if (isFolder(it)) return "File folder";
  if (it.app) return "Shortcut";
  const e = extOf(it.name);
  return (
    {
      ".docx": "Microsoft Word Document",
      ".doc": "Microsoft Word 97 - 2003 Document",
      ".xlsx": "Microsoft Excel Worksheet",
      ".xls": "Microsoft Excel 97-2003 Worksheet",
      ".csv": "Microsoft Excel Comma Separated Values File",
      ".pptx": "Microsoft PowerPoint Presentation",
      ".pdf": "Microsoft Edge PDF Document",
      ".txt": "Text Document",
      ".png": "PNG File",
      ".jpg": "JPG File",
      ".jpeg": "JPEG File",
      ".zip": "Compressed (zipped) Folder",
      ".exe": "Application",
      ".msi": "Windows Installer Package",
      ".mp4": "MP4 File",
      ".mp3": "MP3 File",
      ".html": "Microsoft Edge HTML Document",
      ".lnk": "Shortcut",
    } as Record<string, string>
  )[e] ?? (e ? `${e.slice(1).toUpperCase()} File` : "File");
}

/** Display name: hide known extensions unless "File name extensions" is on. */
export function displayName(it: WinItem, showExt: boolean): string {
  if (isFolder(it) || showExt) return it.name;
  const e = extOf(it.name);
  return e ? it.name.slice(0, -e.length) : it.name;
}

export function sizeOf(it: WinItem): string {
  if (isFolder(it)) return "";
  return it.size ?? (it.text ? `${Math.max(1, Math.ceil(it.text.length / 1024))} KB` : "1 KB");
}

/** For sorting by size. */
export function sizeNum(s?: string): number {
  if (!s) return 0;
  const m = /([\d.,]+)\s*(KB|MB|GB|bytes)?/i.exec(s);
  if (!m) return 0;
  const n = Number(m[1].replace(/,/g, ""));
  const u = (m[2] ?? "KB").toUpperCase();
  return n * (u === "GB" ? 1e6 : u === "MB" ? 1e3 : u === "BYTES" ? 0.001 : 1);
}

export function dateNum(s?: string): number {
  if (!s) return 0;
  const m = /(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})\s*(AM|PM))?/i.exec(s);
  if (!m) return 0;
  let h = Number(m[4] ?? 0) % 12;
  if ((m[6] ?? "").toUpperCase() === "PM") h += 12;
  return Number(m[3]) * 1e8 + Number(m[1]) * 1e6 + Number(m[2]) * 1e4 + h * 100 + Number(m[5] ?? 0);
}

/** Where a path lives, for the address bar: ["This PC", "Documents", "Billing"]. */
export function crumbs(doc: WinDoc, loc: string): string[] {
  if (SPECIAL.includes(loc)) return [loc];
  if (loc.startsWith("search:")) return ["Search"];
  const r = rootOf(doc, loc);
  const segs = splitPath(realPath(doc, loc));
  if (!r) return segs;
  if (r.root === "onedrive" || r.root === "gdrive") return segs;
  return ["This PC", ...segs];
}

export const INVALID_NAME = /[\\/:*?"<>|]/;
