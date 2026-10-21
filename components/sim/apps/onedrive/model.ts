import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { clone } from "@/lib/sim/ops";
import type { OdActivity, OdItem, OdKind, OdLink, OdLocalFile, OdPerm, OdPerson, OdScope, OneDriveDoc } from "./types";

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const NOW_LABEL = "A few seconds ago";
export const TODAY_LABEL = "October 21, 2026";

export const meOf = (doc: OneDriveDoc): OdPerson => doc.me;
export const orgName = (doc: OneDriveDoc): string => doc.org?.name ?? "your organization";

export function itemOf(doc: OneDriveDoc, id?: string): OdItem | undefined {
  if (!id) return undefined;
  return doc.items.find((i) => i.id === id && !i.purged);
}

export function mustItem(doc: OneDriveDoc, id: string | undefined, what = "file"): OdItem {
  const it = itemOf(doc, id);
  if (!it) throw new Error(`no ${what} with id "${id}"`);
  return it;
}

export function isMine(doc: OneDriveDoc, it: OdItem): boolean {
  return !it.owner || it.owner === doc.me.email;
}

export function personOf(doc: OneDriveDoc, emailOrName?: string): OdPerson | undefined {
  if (!emailOrName) return undefined;
  const k = emailOrName.toLowerCase();
  if (doc.me.email.toLowerCase() === k || doc.me.name.toLowerCase() === k) return doc.me;
  return (doc.people ?? []).find((p) => p.email.toLowerCase() === k || p.name.toLowerCase() === k);
}

export function nameOf(doc: OneDriveDoc, emailOrName?: string): string {
  if (!emailOrName) return "";
  return personOf(doc, emailOrName)?.name ?? emailOrName;
}

export function isExternal(doc: OneDriveDoc, email: string): boolean {
  if (doc.account !== "work" || !doc.org) return false;
  return !email.toLowerCase().endsWith(`@${doc.org.domain.toLowerCase()}`);
}

/** Is this item, or any folder above it, in the Recycle bin? */
export function inBin(doc: OneDriveDoc, it: OdItem): boolean {
  let cur: OdItem | undefined = it;
  for (let n = 0; cur && n < 40; n++) {
    if (cur.deleted) return true;
    cur = cur.parent && cur.parent !== "root" && !cur.parent.startsWith("lib:") ? itemOf(doc, cur.parent) : undefined;
  }
  return false;
}

export function live(doc: OneDriveDoc): OdItem[] {
  return doc.items.filter((i) => !i.purged && !inBin(doc, i));
}

export function childrenOf(doc: OneDriveDoc, parent: string): OdItem[] {
  return sortItems(live(doc).filter((i) => (i.parent ?? "") === parent));
}

export function sortItems(list: OdItem[]): OdItem[] {
  return [...list.filter((i) => i.kind === "folder" || i.kind === "vault"), ...list.filter((i) => i.kind !== "folder" && i.kind !== "vault")];
}

export function isFolder(it?: OdItem): boolean {
  return Boolean(it && (it.kind === "folder" || it.kind === "vault"));
}

/** Folder chain from My files down to the item's folder (not including the item). */
export function ancestors(doc: OneDriveDoc, it: OdItem): OdItem[] {
  const out: OdItem[] = [];
  let p = it.parent;
  for (let n = 0; p && p !== "root" && !p.startsWith("lib:") && n < 40; n++) {
    const f = itemOf(doc, p);
    if (!f) break;
    out.unshift(f);
    p = f.parent;
  }
  return out;
}

export function inVault(doc: OneDriveDoc, it: OdItem): boolean {
  return it.kind === "vault" || ancestors(doc, it).some((a) => a.kind === "vault");
}

/** "My files > Patient Forms" */
export function locationLabel(doc: OneDriveDoc, it: OdItem): string {
  if (it.parent === undefined) return `Shared with you by ${nameOf(doc, it.owner)}`;
  if (it.parent.startsWith("lib:")) return doc.libraries?.find((l) => `lib:${l.id}` === it.parent)?.name ?? "Library";
  const chain = ancestors(doc, it).map((a) => a.name);
  return ["My files", ...chain].join(" > ");
}

export function extOf(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name);
  return m ? m[1].toLowerCase() : "";
}

export function baseOf(name: string): string {
  return name.replace(/\.[a-z0-9]+$/i, "");
}

export function kindFromName(name: string, folder = false): OdKind {
  if (folder) return "folder";
  const e = extOf(name);
  if (["doc", "docx"].includes(e)) return "word";
  if (["xls", "xlsx", "csv"].includes(e)) return "excel";
  if (["ppt", "pptx"].includes(e)) return "powerpoint";
  if (e === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "heic", "bmp"].includes(e)) return "image";
  if (["mp4", "mov", "wmv"].includes(e)) return "video";
  if (e === "zip") return "zip";
  if (e === "one") return "onenote";
  return "text";
}

export const TYPE_NAME: Record<OdKind, string> = {
  folder: "Folder",
  vault: "Personal Vault",
  word: "Word document",
  excel: "Excel workbook",
  powerpoint: "PowerPoint presentation",
  pdf: "PDF document",
  image: "Image",
  video: "Video",
  text: "Text document",
  onenote: "OneNote notebook",
  zip: "Compressed (zipped) folder",
};

/** Characters OneDrive does not allow in file or folder names. */
export const INVALID_CHARS = /["*:<>?/\\|]/;

export function hasSharing(it: OdItem): boolean {
  return Boolean(it.access?.length || it.links?.length);
}

export function sharingLabel(doc: OneDriveDoc, it: OdItem): string {
  if (!isMine(doc, it)) return "Shared";
  if (it.links?.some((l) => l.scope === "Anyone")) return "Anyone with the link";
  return hasSharing(it) ? "Shared" : "Private";
}

export function scopeTitle(doc: OneDriveDoc, s: OdScope): string {
  switch (s) {
    case "Anyone":
      return "Anyone";
    case "Organization":
      return `People in ${orgName(doc)}`;
    case "Existing":
      return "People with existing access";
    case "People you choose":
      return "People you choose";
  }
}

export function permVerb(p: OdPerm): string {
  return p === "Can edit" ? "can edit" : p === "Can review" ? "can review" : p === "Can't download" ? "can view, but can't download" : "can view";
}

/** The sentence OneDrive shows for a link: "People in Lakeside Medical Associates with the link can edit". */
export function linkSentence(doc: OneDriveDoc, l: { scope: OdScope; perm: OdPerm; people?: string[] }): string {
  const v = permVerb(l.perm);
  switch (l.scope) {
    case "Anyone":
      return `Anyone with the link ${v}`;
    case "Organization":
      return `People in ${orgName(doc)} with the link ${v}`;
    case "Existing":
      return "Only people with existing access can open the link";
    case "People you choose":
      return l.people?.length ? `${l.people.map((p) => nameOf(doc, p)).join(", ")} ${v}` : `Only the people you choose ${v}`;
  }
}

export function defaultLink(doc: OneDriveDoc): { scope: OdScope; perm: OdPerm } {
  return {
    scope: doc.org?.defaultScope ?? (doc.account === "work" ? "Organization" : "Anyone"),
    perm: doc.org?.defaultPerm ?? "Can edit",
  };
}

export function anyoneAllowed(doc: OneDriveDoc): boolean {
  return doc.account === "personal" || doc.org?.anyone !== false;
}

/** Version label after a new version is made: "3.0" → "4.0". */
export function nextVersion(label?: string): string {
  const n = Number.parseFloat(label ?? "1.0");
  return `${Number.isFinite(n) ? Math.floor(n) + 1 : 2}.0`;
}

function seq(doc: OneDriveDoc): number {
  doc.seq = (doc.seq ?? 0) + 1;
  return doc.seq;
}

function uniqueName(doc: OneDriveDoc, parent: string, name: string): string {
  const taken = new Set(childrenOf(doc, parent).map((i) => i.name.toLowerCase()));
  if (!taken.has(name.toLowerCase())) return name;
  const ext = extOf(name);
  const base = ext ? baseOf(name) : name;
  for (let n = 1; n < 100; n++) {
    const cand = ext ? `${base} ${n}.${ext}` : `${base} ${n}`;
    if (!taken.has(cand.toLowerCase())) return cand;
  }
  return name;
}

function ids(v: SimValue | undefined): string[] {
  return String(v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function descendants(doc: OneDriveDoc, id: string): OdItem[] {
  const out: OdItem[] = [];
  const walk = (pid: string) => {
    for (const c of doc.items.filter((i) => i.parent === pid && !i.purged)) {
      out.push(c);
      walk(c.id);
    }
  };
  walk(id);
  return out;
}

function folderTarget(doc: OneDriveDoc, v: SimValue | undefined): string {
  const f = String(v ?? "root");
  if (f === "root" || f.startsWith("lib:")) return f;
  const it = mustItem(doc, f, "folder");
  if (!isFolder(it)) throw new Error(`"${f}" is not a folder`);
  return it.id;
}

/* ------------------------------------------------------------------ */
/* Built-in behavior                                                   */
/* ------------------------------------------------------------------ */

type R = { doc: OneDriveDoc; ui?: Partial<SimUi> };

const PRESET_DAYS: Record<string, number> = { Yesterday: 1, "One week ago": 7, "Three weeks ago": 21 };

export function applyOneDrive(input: OneDriveDoc, c: SimCommit, ui: SimUi): R {
  const doc = clone(input) as OneDriveDoc;
  doc.toast = null;
  doc.view = doc.view ?? {};

  if (c.kind === "command") return command(doc, c.id, c.value, ui);
  if (c.kind === "type") return typed(doc, c.target, c.value);
  if (c.kind === "click") return { doc };
  return dialog(doc, c.id, c.values);
}

function command(doc: OneDriveDoc, id: string, value: SimValue | undefined, ui: SimUi): R {
  const v = value === undefined ? "" : String(value);
  switch (id) {
    case "od.go": {
      const loc = v || "root";
      doc.view!.location = loc;
      doc.view!.search = "";
      doc.surface = "web";
      return { doc, ui: { selection: "" } };
    }
    case "od.openWebInternal": {
      const it = mustItem(doc, v);
      if (isFolder(it)) {
        doc.view!.location = it.shortcutTo ?? it.id;
        doc.surface = "web";
        return { doc, ui: { selection: "" } };
      }
      const from = doc.surface;
      doc.viewer = { ...(doc.viewer ?? {}), file: it.id, app: "web", pane: doc.viewer?.file === it.id ? doc.viewer?.pane ?? null : null };
      doc.flags = { ...(doc.flags ?? {}), returnTo: from === "viewer" ? String(doc.flags?.returnTo ?? "web") : from };
      doc.surface = "viewer";
      if (it.sync === "cloud") it.sync = "local";
      return { doc, ui: { selection: "" } };
    }
    case "od.openApp": {
      const it = mustItem(doc, v);
      const from = doc.surface;
      doc.viewer = { ...(doc.viewer ?? {}), file: it.id, app: it.kind === "word" ? "desktop" : "web", pane: null };
      doc.flags = { ...(doc.flags ?? {}), returnTo: from === "viewer" ? String(doc.flags?.returnTo ?? "web") : from };
      doc.surface = "viewer";
      if (it.sync === "cloud") it.sync = "local";
      return { doc, ui: { selection: "" } };
    }
    case "od.open":
      return openWeb(doc, v);
    case "od.close": {
      const back = String(doc.flags?.returnTo ?? "web");
      doc.surface = back === "explorer" ? "explorer" : "web";
      return { doc, ui: { selection: doc.viewer?.file ? `item:${doc.viewer.file}` : "" } };
    }
    case "od.layout":
      doc.view!.layout = v === "tiles" ? "tiles" : "list";
      return { doc };
    case "od.details":
      doc.view!.details = v === "" ? !doc.view!.details : v === "on" || v === "true";
      return { doc };
    case "od.search":
      doc.view!.search = v;
      if (v) doc.view!.location = "search";
      else if (doc.view!.location === "search") doc.view!.location = "root";
      doc.surface = "web";
      return { doc, ui: { selection: "" } };
    case "od.sort":
      doc.view!.sort = v;
      return { doc };
    case "od.surface":
      doc.surface = v === "explorer" ? "explorer" : v === "viewer" && doc.viewer?.file ? "viewer" : "web";
      return { doc, ui: { selection: "" } };
    case "od.sharedTab":
      doc.view!.sharedTab = v === "by" ? "by" : "with";
      doc.view!.location = "shared";
      doc.surface = "web";
      return { doc, ui: { selection: "" } };
    case "od.exp.nav":
      doc.pc = { ...(doc.pc ?? {}), location: v || "onedrive" };
      doc.surface = "explorer";
      return { doc, ui: { selection: "" } };
    case "od.toast":
      doc.toast = v || null;
      return { doc };
    case "od.pane":
      if (doc.viewer) doc.viewer.pane = v || null;
      return { doc };
    case "od.help":
      doc.toast = v || "Help opened in a new tab";
      return { doc };
    default:
      void ui;
      return { doc };
  }
}

function openWeb(doc: OneDriveDoc, v: string): R {
  return command(doc, "od.openWebInternal", v, { selection: "" });
}

function typed(doc: OneDriveDoc, target: string, value: string): R {
  const text = value.trim();
  if (target.startsWith("comment:")) {
    const [fileId, para] = target.slice(8).split(".");
    const it = mustItem(doc, fileId);
    const cid = `c${seq(doc)}`;
    it.comments = [...(it.comments ?? []), { id: cid, para, author: doc.me.email, time: NOW_LABEL, text }];
    return { doc, ui: { selection: `comment:${cid}` } };
  }
  if (target.startsWith("reply:")) {
    const cid = target.slice(6);
    const it = doc.items.find((i) => i.comments?.some((c) => c.id === cid));
    const cm = it?.comments?.find((c) => c.id === cid);
    if (!cm) throw new Error(`no comment "${cid}"`);
    cm.replies = [...(cm.replies ?? []), { author: doc.me.email, time: NOW_LABEL, text }];
    return { doc, ui: { selection: `comment:${cid}` } };
  }
  return { doc };
}

function dialog(doc: OneDriveDoc, id: string, values: Record<string, SimValue>): R {
  const me = doc.me.email;
  const stamp = (it: OdItem) => {
    it.modified = NOW_LABEL;
    it.modifiedBy = me;
  };
  switch (id) {
    case "od.newFolder": {
      const parent = folderTarget(doc, values.parent);
      const name = String(values.name ?? "New folder").trim() || "New folder";
      const nid = `new${seq(doc)}`;
      doc.items.push({ id: nid, name: uniqueName(doc, parent, name), kind: "folder", parent, modified: NOW_LABEL, modifiedBy: me, sync: "local" });
      return { doc, ui: { selection: `item:${nid}` } };
    }
    case "od.newFile": {
      const parent = folderTarget(doc, values.folder);
      const kind = String(values.kind ?? "Word document");
      const ext = kind.startsWith("Excel") ? "xlsx" : kind.startsWith("PowerPoint") ? "pptx" : "docx";
      let name = String(values.name ?? "").trim() || (kind.startsWith("Excel") ? "Book.xlsx" : kind.startsWith("PowerPoint") ? "Presentation.pptx" : "Document.docx");
      if (!extOf(name)) name = `${name}.${ext}`;
      const nid = `new${seq(doc)}`;
      doc.items.push({ id: nid, name: uniqueName(doc, parent, name), kind: kindFromName(name), parent, modified: NOW_LABEL, modifiedBy: me, size: "12 KB", version: "1.0", text: [""], sync: "local" });
      return { doc, ui: { selection: `item:${nid}` } };
    }
    case "od.upload": {
      const parent = folderTarget(doc, values.folder);
      const names = String(values.file ?? "").split(";").map((s) => s.trim()).filter(Boolean);
      if (!names.length) throw new Error("od.upload needs a file");
      const added: string[] = [];
      const addLocal = (lf: OdLocalFile, into: string) => {
        const nid = `new${seq(doc)}`;
        const folder = Boolean(lf.folder);
        doc.items.push({ id: nid, name: uniqueName(doc, into, lf.name), kind: kindFromName(lf.name, folder), parent: into, modified: NOW_LABEL, modifiedBy: me, size: folder ? undefined : lf.size ?? "48 KB", version: folder ? undefined : "1.0", sync: "local" });
        for (const ch of lf.children ?? []) addLocal(ch, nid);
        return nid;
      };
      for (const n of names) {
        const lf = (doc.computer ?? []).find((x) => x.name.toLowerCase() === n.toLowerCase()) ?? { name: n };
        added.push(addLocal(lf, parent));
      }
      doc.toast = `Uploaded ${names.length} item${names.length === 1 ? "" : "s"}`;
      return { doc, ui: { selection: added.map((x) => `item:${x}`).join(",") } };
    }
    case "od.rename": {
      const it = mustItem(doc, String(values.file));
      const name = String(values.name ?? "").trim();
      if (!name) throw new Error("od.rename needs a name");
      it.name = name;
      stamp(it);
      if (it.sync === "error" && !INVALID_CHARS.test(name)) {
        it.sync = "local";
        it.syncError = undefined;
      }
      return { doc, ui: { selection: "" } };
    }
    case "od.move": {
      const folder = folderTarget(doc, values.folder);
      const list = ids(values.file).map((x) => mustItem(doc, x));
      for (const it of list) {
        if (it.id === folder || descendants(doc, it.id).some((d) => d.id === folder)) throw new Error("can't move a folder into itself");
        it.parent = folder;
      }
      doc.toast = `Moved ${list.length} item${list.length === 1 ? "" : "s"} to ${folder === "root" ? "My files" : itemOf(doc, folder)?.name ?? "the folder"}`;
      return { doc, ui: { selection: "" } };
    }
    case "od.copy": {
      const folder = folderTarget(doc, values.folder);
      const list = ids(values.file).map((x) => mustItem(doc, x));
      const copyOne = (src: OdItem, into: string) => {
        const nid = `new${seq(doc)}`;
        const cp: OdItem = { ...clone(src), id: nid, parent: into, name: uniqueName(doc, into, src.name), access: [], links: [], favorite: false, owner: undefined, modified: NOW_LABEL, modifiedBy: me, versions: [], version: src.version ? "1.0" : undefined, comments: [] };
        doc.items.push(cp);
        for (const ch of doc.items.filter((i) => i.parent === src.id && !i.purged && !i.deleted)) copyOne(ch, nid);
      };
      for (const it of list) copyOne(it, folder);
      doc.toast = `Copied ${list.length} item${list.length === 1 ? "" : "s"}`;
      return { doc };
    }
    case "od.delete": {
      const list = ids(values.file).map((x) => mustItem(doc, x));
      for (const it of list) {
        if (it.shortcutTo) {
          doc.items = doc.items.filter((x) => x.id !== it.id);
          continue;
        }
        if (!isMine(doc, it)) throw new Error(`"${it.name}" isn't yours to delete`);
        it.deleted = { on: TODAY_LABEL, by: doc.me.name };
      }
      doc.toast = `Deleted ${list.length} item${list.length === 1 ? "" : "s"}`;
      return { doc, ui: { selection: "" } };
    }
    case "od.favorite": {
      const it = mustItem(doc, String(values.file));
      const on = values.on === undefined ? !it.favorite : values.on === true || values.on === "true";
      it.favorite = on;
      doc.toast = on ? "Added to favorites" : "Removed from favorites";
      return { doc };
    }
    case "od.download": {
      const it = mustItem(doc, String(values.file));
      doc.toast = `Downloading ${it.name}`;
      doc.flags = { ...(doc.flags ?? {}), [`downloaded:${it.id}`]: true };
      return { doc };
    }
    case "od.share": {
      const it = mustItem(doc, String(values.file));
      const perm = (String(values.permission ?? "Can edit") as OdPerm);
      const people = String(values.people ?? "").split(";").map((s) => s.trim()).filter(Boolean);
      if (!people.length) throw new Error("od.share needs people");
      const access = [...(it.access ?? [])];
      for (const p of people) {
        const email = personOf(doc, p)?.email ?? p;
        const ex = access.find((a) => a.email.toLowerCase() === email.toLowerCase());
        if (ex) ex.perm = perm;
        else access.push({ email, perm });
      }
      it.access = access;
      doc.toast = `Sent to ${people.map((p) => nameOf(doc, p)).join(", ")}`;
      return { doc, ui: { selection: `item:${it.id}` } };
    }
    case "od.link": {
      const it = mustItem(doc, String(values.file));
      const scope = String(values.scope ?? defaultLink(doc).scope) as OdScope;
      const perm = String(values.permission ?? defaultLink(doc).perm) as OdPerm;
      if (scope === "Anyone" && !anyoneAllowed(doc)) throw new Error("Anyone links are turned off for this organization");
      const people = String(values.people ?? "").split(";").map((s) => s.trim()).filter(Boolean);
      const expires = String(values.expiration ?? "") || undefined;
      const password = values.password === true || values.password === "true";
      const same = (l: OdLink) => l.scope === scope && l.perm === perm && (l.people ?? []).join(";") === people.join(";") && (l.expires ?? "") === (expires ?? "") && Boolean(l.password) === password;
      const links = [...(it.links ?? [])];
      if (scope !== "Existing" && !links.some(same)) links.push({ id: `l${seq(doc)}`, scope, perm, ...(people.length ? { people } : {}), ...(expires ? { expires } : {}), ...(password ? { password } : {}) });
      it.links = links;
      doc.toast = "Link copied";
      return { doc, ui: { selection: `item:${it.id}` } };
    }
    case "od.access": {
      const it = mustItem(doc, String(values.file));
      const who = String(values.person ?? "");
      const email = personOf(doc, who)?.email ?? who;
      const perm = String(values.permission ?? "");
      const has = (it.access ?? []).some((a) => a.email.toLowerCase() === email.toLowerCase()) || (it.links ?? []).some((l) => l.people?.some((p) => p.toLowerCase() === email.toLowerCase()));
      if (!has) throw new Error(`${email} has no access to "${it.name}"`);
      if (perm === "Remove direct access") {
        it.access = (it.access ?? []).filter((a) => a.email.toLowerCase() !== email.toLowerCase());
        it.links = (it.links ?? [])
          .map((l) => (l.people ? { ...l, people: l.people.filter((p) => p.toLowerCase() !== email.toLowerCase()) } : l))
          .filter((l) => l.scope !== "People you choose" || (l.people ?? []).length > 0);
        doc.toast = `Removed ${nameOf(doc, email)}`;
      } else {
        it.access = (it.access ?? []).map((a) => (a.email.toLowerCase() === email.toLowerCase() ? { ...a, perm: perm as OdPerm } : a));
        doc.toast = "Access updated";
      }
      return { doc, ui: { selection: `item:${it.id}` } };
    }
    case "od.removeLink": {
      const it = mustItem(doc, String(values.file));
      const lid = String(values.link ?? "");
      if (!(it.links ?? []).some((l) => l.id === lid)) throw new Error(`no link "${lid}" on "${it.name}"`);
      it.links = (it.links ?? []).filter((l) => l.id !== lid);
      doc.toast = "Link removed";
      return { doc, ui: { selection: `item:${it.id}` } };
    }
    case "od.stopSharing": {
      const it = mustItem(doc, String(values.file));
      it.access = [];
      it.links = [];
      doc.toast = "Stopped sharing";
      return { doc, ui: { selection: `item:${it.id}` } };
    }
    case "od.restoreVersion": {
      const it = mustItem(doc, String(values.file));
      const vid = String(values.version ?? "");
      const ver = (it.versions ?? []).find((x) => x.id === vid);
      if (!ver) throw new Error(`no version "${vid}" of "${it.name}"`);
      const cur = { id: `v${seq(doc)}`, label: it.version ?? "1.0", modified: it.modified ?? "", by: it.modifiedBy ?? me, size: it.size, text: it.text };
      it.versions = [cur, ...(it.versions ?? [])];
      it.version = nextVersion(it.version);
      it.text = ver.text ? [...ver.text] : it.text;
      it.size = ver.size ?? it.size;
      stamp(it);
      doc.toast = `Restored version ${ver.label}`;
      return { doc, ui: { selection: `item:${it.id}` } };
    }
    case "od.restore": {
      const list = ids(values.file).map((x) => mustItem(doc, x));
      for (const it of list) {
        if (!it.deleted) throw new Error(`"${it.name}" isn't in the Recycle bin`);
        it.deleted = undefined;
        for (const a of ancestors(doc, it)) a.deleted = undefined;
      }
      doc.toast = `Restored ${list.length} item${list.length === 1 ? "" : "s"}`;
      return { doc, ui: { selection: "" } };
    }
    case "od.purge": {
      const list = ids(values.file).map((x) => mustItem(doc, x));
      for (const it of list) {
        if (!it.deleted) throw new Error(`"${it.name}" isn't in the Recycle bin`);
        it.purged = true;
        for (const d of descendants(doc, it.id)) d.purged = true;
      }
      doc.toast = `Permanently deleted ${list.length} item${list.length === 1 ? "" : "s"}`;
      return { doc, ui: { selection: "" } };
    }
    case "od.emptyBin": {
      for (const it of doc.items.filter((i) => i.deleted && !i.purged)) {
        it.purged = true;
        for (const d of descendants(doc, it.id)) d.purged = true;
      }
      doc.toast = "The Recycle bin is empty";
      return { doc, ui: { selection: "" } };
    }
    case "od.restoreOneDrive": {
      const date = String(values.date ?? "Yesterday");
      const acts = doc.activities ?? [];
      let undo: OdActivity[];
      if (date === "Custom date and time") {
        const idx = acts.findIndex((a) => a.id === String(values.from ?? ""));
        if (idx < 0) throw new Error(`no activity "${values.from}"`);
        undo = acts.slice(0, idx + 1);
      } else {
        const days = PRESET_DAYS[date];
        if (days === undefined) throw new Error(`unknown restore date "${date}"`);
        undo = acts.filter((a) => a.daysAgo < days);
      }
      for (const a of undo) {
        const it = doc.items.find((i) => i.id === a.file);
        if (!it || it.purged) continue;
        if (a.undo.op === "rename") it.name = a.undo.name;
        else if (a.undo.op === "undelete") it.deleted = undefined;
        else if (a.undo.op === "remove") it.deleted = { on: TODAY_LABEL, by: doc.me.name };
        else if (a.undo.op === "text") it.text = [...a.undo.text];
      }
      const undone = new Set(undo.map((a) => a.id));
      doc.activities = acts.filter((a) => !undone.has(a.id));
      doc.restored = date;
      doc.toast = "Your OneDrive was restored";
      return { doc, ui: { selection: "" } };
    }
    case "od.shortcut": {
      const it = mustItem(doc, String(values.file));
      if (!isFolder(it)) throw new Error("only folders can be added to My files");
      if (doc.items.some((x) => x.shortcutTo === it.id)) return { doc };
      doc.items.push({ id: `sc-${it.id}`, name: it.name, kind: "folder", parent: "root", owner: it.owner, shortcutTo: it.id, modified: it.modified, modifiedBy: it.modifiedBy, sync: "cloud" });
      doc.toast = `Added a shortcut to "${it.name}" in My files`;
      return { doc };
    }
    case "od.removeShortcut": {
      const fid = String(values.file);
      const sc = doc.items.find((x) => x.id === fid || x.shortcutTo === fid);
      if (!sc?.shortcutTo) throw new Error(`no shortcut for "${fid}"`);
      doc.items = doc.items.filter((x) => x.id !== sc.id);
      doc.toast = "Shortcut removed from My files";
      return { doc, ui: { selection: "" } };
    }
    case "od.vault": {
      const action = String(values.action ?? "unlock");
      doc.vault = { locked: action === "lock" };
      if (action === "lock") {
        const loc = doc.view?.location;
        const at = loc ? itemOf(doc, loc) : undefined;
        if (at && inVault(doc, at)) doc.view!.location = "root";
        doc.toast = "Personal Vault is locked";
      } else {
        const v = doc.items.find((i) => i.kind === "vault");
        if (v) doc.view!.location = v.id;
        doc.surface = "web";
      }
      return { doc, ui: { selection: "" } };
    }
    case "od.keep":
    case "od.free": {
      const list = ids(values.file).map((x) => mustItem(doc, x));
      const to = id === "od.keep" ? "always" : "cloud";
      for (const it of list) {
        if (!isFolder(it)) it.sync = to;
        else it.sync = to === "always" ? "always" : "cloud";
        for (const d of descendants(doc, it.id)) d.sync = to;
      }
      return { doc };
    }
    case "od.pause":
      doc.pc = { ...(doc.pc ?? {}), paused: Number(values.hours ?? 2) };
      return { doc };
    case "od.resume":
      doc.pc = { ...(doc.pc ?? {}), paused: null };
      return { doc };
    case "od.backup": {
      const pc = (doc.pc = { ...(doc.pc ?? {}) });
      const backup = { ...(pc.backup ?? {}) };
      const local = { ...(pc.local ?? {}) };
      for (const key of ["Desktop", "Documents", "Pictures"] as const) {
        if (values[key] === undefined) continue;
        const want = values[key] === true || values[key] === "true";
        if (want && !backup[key]) {
          let folder = childrenOf(doc, "root").find((i) => i.kind === "folder" && i.name === key && !i.shortcutTo);
          if (!folder) {
            folder = { id: `bk-${key.toLowerCase()}`, name: key, kind: "folder", parent: "root", modified: NOW_LABEL, modifiedBy: me, sync: "local" };
            doc.items.push(folder);
          }
          for (const lf of local[key] ?? []) {
            const nid = `new${seq(doc)}`;
            doc.items.push({ id: nid, name: lf.name, kind: kindFromName(lf.name, lf.folder), parent: folder.id, modified: lf.modified ?? "October 14", modifiedBy: me, size: lf.size, sync: "local", backedUpFrom: key, version: lf.folder ? undefined : "1.0" });
          }
          local[key] = [];
        }
        backup[key] = want;
      }
      pc.backup = backup;
      pc.local = local;
      return { doc };
    }
    case "od.fod": {
      const action = String(values.action ?? "Free up disk space") as "Free up disk space" | "Download all files";
      doc.pc = { ...(doc.pc ?? {}), fod: action };
      for (const it of live(doc)) {
        if (!isMine(doc, it) || isFolder(it)) continue;
        if (action === "Download all files") it.sync = "always";
        else if (it.sync === "local" || it.sync === "always") it.sync = "cloud";
      }
      return { doc };
    }
    case "od.autosave": {
      doc.viewer = { ...(doc.viewer ?? { file: String(values.file ?? "") }), autosave: values.on === true || values.on === "true" };
      return { doc };
    }
    case "od.mode": {
      doc.viewer = { ...(doc.viewer ?? { file: String(values.file ?? "") }), mode: String(values.mode ?? "Editing") as "Editing" | "Reviewing" | "Viewing" };
      return { doc };
    }
    case "od.resolve": {
      const cid = String(values.comment ?? "");
      const it = doc.items.find((i) => i.comments?.some((c) => c.id === cid));
      const cm = it?.comments?.find((c) => c.id === cid);
      if (!cm) throw new Error(`no comment "${cid}"`);
      cm.resolved = true;
      return { doc, ui: { selection: `comment:${cid}` } };
    }
    default:
      return { doc };
  }
}

/* ------------------------------------------------------------------ */
/* Core helpers                                                        */
/* ------------------------------------------------------------------ */

export function odInitialUi(): SimUi {
  return { selection: "" };
}

export function selItems(sel: string): string[] {
  return sel
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("item:"))
    .map((s) => s.slice(5));
}

export function odSelectionExists(doc: OneDriveDoc, sel: string): boolean {
  if (!sel) return true;
  if (sel.startsWith("item:")) return selItems(sel).every((x) => Boolean(itemOf(doc, x)));
  if (sel.startsWith("comment:")) return doc.items.some((i) => i.comments?.some((c) => c.id === sel.slice(8)));
  if (sel.startsWith("para:")) return true;
  return false;
}

export function describeOd(doc: OneDriveDoc, ui: SimUi): string {
  const list = selItems(ui.selection);
  if (list.length === 1) return `${itemOf(doc, list[0])?.name ?? list[0]} selected`;
  if (list.length > 1) return `${list.length} items selected`;
  return "";
}
