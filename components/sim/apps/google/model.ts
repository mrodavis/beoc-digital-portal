import type { CellFormat, ExcelBook, ExcelCell, ExcelCF, ExcelSheet, PptDeck, PptObject, SimCommit, SimValue, WordDoc, WordPara, WordRun } from "@/types/sim";
import type { SimUi } from "../../types";
import { clone } from "@/lib/sim/ops";
import { evaluateCell, normalizeRange, numToCol, parseRange, parseRef, rectToRange, refOf, shiftFormula, type Rect } from "@/lib/sim/excel";
import { applyWord, paraText, parseSel as wordSel } from "../word/model";
import { activeCell, applyExcel, currentRegion, selRect, sheetOf, usedRect } from "../excel/model";
import { applyPpt, activeSlide } from "../powerpoint/model";
import { BUILDING_BLOCKS, CF_STYLES, googleLayout } from "./menus";
import { templateNamed } from "./templates";
import type { GChip, GComment, GContent, GFile, GHomeApp, GKind, GoogleDoc, GPerson, GProtected, GRole, GRun, GSurface } from "./types";

/* ------------------------------------------------------------------ */
/* Basics                                                              */
/* ------------------------------------------------------------------ */

export const DEFAULT_ME: GPerson = { name: "BEOC Student", email: "bstudent@lakesidemedical.example" };
/** The sim clock: Tuesday, October 20, 2026. */
export const NOW = "10:42 AM";
export const TODAY = "October 20, 2026";
/** Today as a date chip shows it. */
export const TODAY_SHORT = "Oct 20, 2026";

export const meOf = (doc: GoogleDoc): GPerson => doc.me ?? DEFAULT_ME;
export const fileOf = (doc: GoogleDoc, id?: string): GFile | undefined => (id ? doc.files.find((f) => f.id === id) : undefined);
export const openFile = (doc: GoogleDoc): GFile | undefined => fileOf(doc, doc.open);

export function personOf(doc: GoogleDoc, emailOrName?: string): GPerson | undefined {
  if (!emailOrName) return undefined;
  const k = emailOrName.trim().toLowerCase();
  const me = meOf(doc);
  if (me.email.toLowerCase() === k || me.name.toLowerCase() === k) return me;
  return (doc.people ?? []).find((p) => p.email.toLowerCase() === k || p.name.toLowerCase() === k);
}

/** The editor a file opens in. Word, Excel and PowerPoint files open in Docs, Sheets and Slides (Office editing). */
export function surfaceOf(kind: GKind): GSurface | null {
  if (kind === "doc" || kind === "word") return "docs";
  if (kind === "sheet" || kind === "excel") return "sheets";
  if (kind === "slides" || kind === "powerpoint") return "slides";
  return null;
}

/** Microsoft Office files opened in a Google editor keep their format (the .DOCX chip by the title). */
export const isOffice = (kind: GKind) => kind === "word" || kind === "excel" || kind === "powerpoint";
export const officeExt = (kind: GKind) => (kind === "word" ? ".DOCX" : kind === "excel" ? ".XLSX" : kind === "powerpoint" ? ".PPTX" : "");

export function emptyContent(kind: GKind): GContent {
  if (kind === "sheet" || kind === "excel") return { sheets: [{ name: "Sheet1", cells: {} }], active: "Sheet1" } as ExcelBook;
  if (kind === "slides" || kind === "powerpoint") return { slides: [{ id: "s1", layout: "Title slide" }], active: "s1", theme: "Simple Light" } as PptDeck;
  return { paragraphs: [{ id: "p1", text: "" }] } as WordDoc;
}

export const contentOf = (f: GFile): GContent => f.content ?? emptyContent(f.kind);
export const asWord = (f: GFile) => contentOf(f) as WordDoc;
export const asBook = (f: GFile) => contentOf(f) as ExcelBook;
export const asDeck = (f: GFile) => contentOf(f) as PptDeck;

export function editorUi(f: GFile | undefined): SimUi {
  if (!f) return { selection: "" };
  const c = contentOf(f);
  if (f.kind === "sheet" || f.kind === "excel") {
    const b = c as ExcelBook;
    return { selection: "A1", sheet: b.active ?? b.sheets[0]?.name };
  }
  if (f.kind === "slides" || f.kind === "powerpoint") {
    const d = c as PptDeck;
    const s = d.slides.find((x) => x.id === d.active) ?? d.slides[0];
    return { slide: s?.id, selection: s?.id ?? "" };
  }
  return { selection: (c as WordDoc).paragraphs[0]?.id ?? "" };
}

export function googleInitialUi(doc: GoogleDoc): SimUi {
  if (doc.surface === "drive" || doc.surface === "home" || doc.surface === "signin") return { selection: "" };
  return editorUi(openFile(doc));
}

/** Where the first browser tab goes back to: Drive, or the app home screen the learner opened. */
function baseSurface(doc: GoogleDoc): GSurface {
  return doc.homeApp ? "home" : "drive";
}

const APP_HOME: Record<string, GHomeApp> = { Docs: "docs", Sheets: "sheets", Slides: "slides" };

function nextId(doc: GoogleDoc, prefix: string): string {
  let n = 1;
  while (doc.files.some((f) => f.id === `${prefix}${n}`)) n++;
  return `${prefix}${n}`;
}

function nextCommentId(f: GFile): string {
  let n = 1;
  while ((f.comments ?? []).some((c) => c.id === `c${n}`)) n++;
  return `c${n}`;
}

const NEW_NAMES: Record<string, { kind: GKind; name: string }> = {
  "Google Docs": { kind: "doc", name: "Untitled document" },
  "Google Sheets": { kind: "sheet", name: "Untitled spreadsheet" },
  "Google Slides": { kind: "slides", name: "Untitled presentation" },
  "Google Forms": { kind: "form", name: "Untitled form" },
};

export function kindFromName(name: string): GKind {
  const ext = /\.([a-z0-9]+)$/i.exec(name)?.[1]?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "heic"].includes(ext)) return "image";
  if (["doc", "docx"].includes(ext)) return "word";
  if (["xls", "xlsx", "csv"].includes(ext)) return "excel";
  if (["ppt", "pptx"].includes(ext)) return "powerpoint";
  if (["mp4", "mov"].includes(ext)) return "video";
  return "text";
}

/** Folder id for a value typed or picked in a folder picker ("My Drive", a folder name, or an id). */
export function resolveFolder(doc: GoogleDoc, v: SimValue | undefined): string | undefined {
  const s = String(v ?? "").trim();
  if (!s) return undefined;
  if (s === "root" || s.toLowerCase() === "my drive") return "root";
  const byId = doc.files.find((f) => f.id === s && f.kind === "folder");
  if (byId) return byId.id;
  return doc.files.find((f) => f.kind === "folder" && !f.trashed && f.name.toLowerCase() === s.toLowerCase())?.id;
}

/** Ids of a file and everything inside it (for folders). */
function descendants(doc: GoogleDoc, id: string): string[] {
  const out = [id];
  for (let i = 0; i < out.length; i++) for (const f of doc.files) if (f.parent === out[i] && !out.includes(f.id)) out.push(f.id);
  return out;
}

const ids = (v: SimValue | undefined) => String(v ?? "").split(",").map((x) => x.trim().replace(/^file:/, "")).filter(Boolean);

function flag(doc: GoogleDoc, patch: Record<string, SimValue | undefined>) {
  const f = { ...(doc.flags ?? {}) };
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) delete f[k];
    else f[k] = v;
  }
  doc.flags = f;
}

/* ------------------------------------------------------------------ */
/* Built-in behavior                                                   */
/* ------------------------------------------------------------------ */

type R = { doc: GoogleDoc; ui?: Partial<SimUi> };

export function applyGoogle(input: GoogleDoc, c: SimCommit, ui: SimUi): R {
  const doc = clone(input);
  doc.toast = null;
  if (c.kind === "type") return applyType(doc, c.target, c.value, ui);
  if (c.kind === "dialog" && c.id.startsWith("g.")) return applyDialog(doc, c.id, c.values, ui);
  if (c.kind === "command" && c.id.startsWith("g.")) return applyCommand(doc, c.id, c.value, ui);
  return editor(doc, c, ui);
}

/* ---------- typing ---------- */

function applyType(doc: GoogleDoc, target: string, value: string, ui: SimUi): R {
  const me = meOf(doc);
  const text = value.trim();
  if (target.startsWith("rename:")) {
    const f = fileOf(doc, target.slice(7));
    if (f && text) {
      f.name = text;
      doc.toast = null;
    }
    return { doc };
  }
  if (target.startsWith("newfolder:")) {
    if (!text) return { doc };
    const parent = target.slice(10) || "root";
    doc.files.push({ id: nextId(doc, "new"), name: text, kind: "folder", parent, modified: NOW, modifiedBy: me.email });
    return { doc };
  }
  if (target === "comment" || target.startsWith("assign:")) {
    const f = openFile(doc);
    if (!f || doc.surface === "drive" || !text) return { doc };
    const anchor = commentAnchor(doc, ui);
    const assignee = target.startsWith("assign:") ? personOf(doc, target.slice(7))?.email ?? target.slice(7) : undefined;
    const cm: GComment = { id: nextCommentId(f), anchor, author: me.name, time: NOW, text, ...(assignee ? { assignee } : {}) };
    f.comments = [...(f.comments ?? []), cm];
    if (assignee) doc.toast = `Assigned to ${personOf(doc, assignee)?.name ?? assignee}`;
    return { doc };
  }
  if (target.startsWith("reply:")) {
    const f = openFile(doc);
    const cm = f?.comments?.find((x) => x.id === target.slice(6));
    if (cm && text) {
      cm.replies = [...(cm.replies ?? []), { author: me.name, time: NOW, text }];
      // A reply that mentions someone with "Assign to" checked reassigns the thread (handled by assign: targets).
    }
    return { doc };
  }
  if (target.startsWith("vername:")) {
    const f = openFile(doc);
    if (!f) return { doc };
    const vid = target.slice(8);
    if (vid === "current") f.current = { ...(f.current ?? {}), name: text || undefined };
    else {
      const v = f.versions?.find((x) => x.id === vid);
      if (v) v.name = text || undefined;
    }
    return { doc };
  }
  if (target.startsWith("filterview:")) {
    const f = openFile(doc);
    const fv = f?.filterViews?.find((x) => x.id === target.slice(11));
    if (fv && text) {
      fv.name = text;
      fv.saved = true;
    }
    return { doc };
  }
  if (target.startsWith("signin:")) return signIn(doc, target.slice(7), text);
  if (target.startsWith("note:")) {
    const f = openFile(doc);
    if (!f || f.kind !== "sheet") return { doc };
    const book = clone(asBook(f));
    const sh = sheetOf(book, ui);
    const ref = target.slice(5).toUpperCase();
    sh.cells[ref] = { ...(sh.cells[ref] ?? {}), note: text || undefined };
    commitContent(doc, f, book);
    return { doc };
  }
  return editor(doc, { kind: "type", target, value }, ui);
}

/* ---------- signing in ---------- */

/** The sign-in page: Email → Password → 2-Step Verification (when `flags.twoStep`). */
function signIn(doc: GoogleDoc, step: string, text: string): R {
  const me = meOf(doc);
  if (step === "email") {
    if (text.toLowerCase() !== me.email.toLowerCase()) {
      flag(doc, { signinError: "Couldn't find your Google Account" });
      return { doc };
    }
    flag(doc, { signin: "password", signinError: undefined });
    return { doc };
  }
  if (step === "password") {
    const want = doc.flags?.password;
    if (want !== undefined && String(want) !== text) {
      flag(doc, { signinError: "Wrong password. Try again or click Forgot password to reset it." });
      return { doc };
    }
    if (doc.flags?.twoStep) {
      flag(doc, { signin: "2sv", signinError: undefined });
      return { doc };
    }
    return finishSignIn(doc);
  }
  if (step === "code") {
    const want = doc.flags?.code;
    if (want !== undefined && String(want) !== text.replace(/\s|-/g, "").replace(/^G/i, "")) {
      flag(doc, { signinError: "Wrong code. Try again." });
      return { doc };
    }
    return finishSignIn(doc);
  }
  return { doc };
}

function finishSignIn(doc: GoogleDoc): R {
  doc.surface = baseSurface(doc);
  flag(doc, { signin: undefined, signinError: undefined, signedOut: undefined, signedIn: true });
  return { doc, ui: { selection: "" } };
}

/** What a new comment is anchored to: the current editor selection. */
export function commentAnchor(doc: GoogleDoc, ui: SimUi): string {
  const sel = ui.selection || "";
  if (doc.surface === "sheets") return sel.startsWith("chart:") ? sel : activeCell(ui);
  if (doc.surface === "slides") return sel || ui.slide || "";
  return sel;
}

/* ---------- dialogs ---------- */

function applyDialog(doc: GoogleDoc, id: string, val: Record<string, SimValue>, ui: SimUi): R {
  const me = meOf(doc);
  const target = fileOf(doc, String(val.file ?? "")) ?? openFile(doc);
  switch (id) {
    case "g.share": {
      if (!target) return { doc };
      const role = (String(val.role ?? "Editor") as GRole) || "Editor";
      const sh = (target.sharing = { ...(target.sharing ?? {}) });
      const people = [...(sh.people ?? [])];
      for (const raw of String(val.email ?? "").split(/[,;]/)) {
        const e = raw.trim();
        if (!e) continue;
        const email = personOf(doc, e)?.email ?? e;
        const i = people.findIndex((p) => p.email.toLowerCase() === email.toLowerCase());
        if (i >= 0) people[i] = { ...people[i], role };
        else people.push({ email, role });
      }
      sh.people = people;
      flag(doc, { notified: val.notify === false ? "" : String(val.email ?? ""), shareMessage: String(val.message ?? "") || undefined });
      doc.toast = val.notify === false ? "Access granted" : "Shared";
      return { doc };
    }
    case "g.access": {
      if (!target) return { doc };
      const sh = (target.sharing = { ...(target.sharing ?? {}) });
      const access = String(val.access ?? sh.access ?? "Restricted") as NonNullable<typeof sh.access>;
      sh.access = access;
      sh.linkRole = access === "Restricted" ? undefined : ((String(val.role ?? sh.linkRole ?? "Viewer") as GRole) || "Viewer");
      doc.toast = "Access updated";
      return { doc };
    }
    case "g.permission": {
      if (!target) return { doc };
      const sh = (target.sharing = { ...(target.sharing ?? {}) });
      const email = personOf(doc, String(val.email ?? ""))?.email ?? String(val.email ?? "");
      if (val.role === "Remove access") sh.people = (sh.people ?? []).filter((p) => p.email.toLowerCase() !== email.toLowerCase());
      else sh.people = (sh.people ?? []).map((p) => (p.email.toLowerCase() === email.toLowerCase() ? { ...p, role: String(val.role) as GRole } : p));
      doc.toast = "Access updated";
      return { doc };
    }
    case "g.expiry": {
      if (!target) return { doc };
      const sh = (target.sharing = { ...(target.sharing ?? {}) });
      const email = personOf(doc, String(val.email ?? ""))?.email ?? String(val.email ?? "");
      const date = String(val.date ?? "").trim();
      sh.people = (sh.people ?? []).map((p) => (p.email.toLowerCase() === email.toLowerCase() ? { ...p, expires: date || undefined } : p));
      doc.toast = date ? "Access expiration set" : "Access expiration removed";
      return { doc };
    }
    case "g.move": {
      if (!target) return { doc };
      const folder = resolveFolder(doc, val.folder);
      if (!folder || descendants(doc, target.id).includes(folder)) return { doc };
      for (const fid of ids(val.file).length ? ids(val.file) : [target.id]) {
        const f = fileOf(doc, fid);
        if (f && !descendants(doc, f.id).includes(folder)) f.parent = folder;
      }
      doc.toast = `Moved to ${folder === "root" ? "My Drive" : fileOf(doc, folder)?.name}`;
      return { doc };
    }
    case "g.shortcut": {
      if (!target) return { doc };
      const folder = resolveFolder(doc, val.folder) ?? "root";
      doc.files.push({ id: nextId(doc, "new"), name: target.name, kind: "shortcut", shortcutTo: target.id, parent: folder, modified: NOW, modifiedBy: me.email });
      doc.toast = "Shortcut added";
      return { doc };
    }
    case "g.makeCopy": {
      const src = openFile(doc);
      if (!src) return { doc };
      const copy = clone(src);
      copy.id = nextId(doc, "new");
      copy.name = String(val.name ?? "").trim() || `Copy of ${src.name}`;
      copy.parent = resolveFolder(doc, val.folder) ?? src.parent ?? "root";
      copy.owner = me.email;
      copy.starred = false;
      copy.versions = [];
      copy.current = { time: NOW, author: me.name };
      copy.modified = NOW;
      copy.modifiedBy = me.email;
      if (!val.share) copy.sharing = undefined;
      if (!val.comments) {
        copy.comments = [];
        if (copy.kind === "doc" && copy.content) stripSuggestions(copy.content as WordDoc);
      }
      doc.files.push(copy);
      doc.tabs = [...(doc.tabs ?? []), copy.id];
      doc.open = copy.id;
      doc.mode = "Editing";
      doc.pane = null;
      return { doc, ui: editorUi(copy) };
    }
    case "g.email":
    case "g.emailCollaborators":
      flag(doc, { emailed: String(val.to ?? "collaborators"), emailSubject: String(val.subject ?? ""), emailFormat: String(val.format ?? "") || undefined });
      doc.toast = "Email sent";
      return { doc };
    case "g.print":
      flag(doc, { printed: `${val.copies ?? 1} cop${Number(val.copies ?? 1) === 1 ? "y" : "ies"} to ${val.destination ?? "printer"}` });
      doc.toast = val.destination === "Save as PDF" ? "PDF saved" : "Sent to printer";
      return { doc };
    case "g.nameVersion": {
      const f = openFile(doc);
      if (f) f.current = { ...(f.current ?? {}), time: f.current?.time ?? NOW, author: f.current?.author ?? me.name, name: String(val.name ?? "").trim() || undefined };
      return { doc };
    }
  }
  return editor(doc, { kind: "dialog", id, values: val }, ui);
}

/* ---------- commands ---------- */

function openTab(doc: GoogleDoc, f: GFile): R {
  const surface = surfaceOf(f.kind);
  if (!surface) return { doc };
  f.content = contentOf(f);
  doc.surface = surface;
  doc.open = f.id;
  doc.tabs = Array.from(new Set([...(doc.tabs ?? []), f.id]));
  doc.mode = "Editing";
  doc.pane = null;
  doc.overlay = null;
  return { doc, ui: editorUi(f) };
}

function applyCommand(doc: GoogleDoc, id: string, value: SimValue | undefined, ui: SimUi): R {
  const me = meOf(doc);
  const sv = value === undefined ? "" : String(value);
  const open = openFile(doc);
  switch (id) {
    /* ---- navigation (free) ---- */
    case "g.go":
      doc.surface = "drive";
      doc.homeApp = undefined;
      doc.drive = { ...(doc.drive ?? {}), location: sv || "root", query: undefined, chips: undefined };
      doc.pane = null;
      return { doc, ui: { selection: "" } };
    case "g.app": {
      // Google apps menu (and New › … › From a template): Drive, or an app's home screen.
      doc.pane = null;
      doc.overlay = null;
      if (sv === "Drive") {
        doc.surface = "drive";
        doc.homeApp = undefined;
        return { doc, ui: { selection: "" } };
      }
      const app = APP_HOME[sv];
      if (!app) {
        doc.toast = `${sv || "That app"} opens in a new tab`;
        return { doc };
      }
      doc.surface = "home";
      doc.homeApp = app;
      return { doc, ui: { selection: "" } };
    }
    case "g.account":
      doc.toast = "Your Google Account opens in a new tab";
      return { doc };
    case "g.signOut":
      doc.surface = "signin";
      doc.open = undefined;
      doc.tabs = [];
      doc.pane = null;
      doc.overlay = null;
      doc.homeApp = undefined;
      flag(doc, { signin: "chooser", signedOut: true, signinError: undefined });
      return { doc, ui: { selection: "" } };
    case "g.signin.step":
      // Choose an account / Use another account / Try another way (free).
      flag(doc, { signin: sv || "email", signinError: undefined });
      return { doc };
    case "g.2sv": {
      if (sv === "Yes") return finishSignIn(doc);
      flag(doc, { signinError: "Sign-in blocked. If this was not you, someone may know your password: change it." });
      return { doc };
    }
    case "g.search":
      doc.surface = "drive";
      doc.homeApp = undefined;
      doc.drive = { ...(doc.drive ?? {}), query: sv.trim() || undefined };
      return { doc, ui: { selection: "" } };
    case "g.filter": {
      // Search chips: "Type=Spreadsheets", "People=<email>", "Modified=Last 7 days", "Location=My Drive", "Type=" clears one, "" clears all.
      const chips = { ...(doc.drive?.chips ?? {}) };
      if (!sv) doc.drive = { ...(doc.drive ?? {}), chips: undefined };
      else {
        const [k, ...rest] = sv.split("=");
        const key = k.trim().toLowerCase() as keyof typeof chips;
        const v = rest.join("=").trim();
        if (v) chips[key] = v;
        else delete chips[key];
        doc.drive = { ...(doc.drive ?? {}), chips: Object.keys(chips).length ? chips : undefined };
      }
      return { doc, ui: { selection: "" } };
    }
    case "g.open": {
      let f = fileOf(doc, sv.replace(/^file:/, ""));
      if (f?.kind === "shortcut") f = fileOf(doc, f.shortcutTo);
      if (!f) return { doc };
      if (f.kind === "folder") return applyCommand(doc, "g.go", f.id, ui);
      if (!surfaceOf(f.kind)) {
        doc.pane = `preview:${f.id}`;
        return { doc };
      }
      return openTab(doc, f);
    }
    case "g.tab": {
      if (sv === "drive" || !sv) {
        doc.surface = baseSurface(doc);
        doc.pane = null;
        doc.overlay = null;
        return { doc, ui: { selection: "" } };
      }
      const f = fileOf(doc, sv);
      return f ? openTab(doc, f) : { doc };
    }
    case "g.closeTab": {
      const tid = sv || doc.open || "";
      doc.tabs = (doc.tabs ?? []).filter((t) => t !== tid);
      if (doc.open === tid || doc.surface !== "drive") {
        const next = doc.tabs.length ? fileOf(doc, doc.tabs[doc.tabs.length - 1]) : undefined;
        if (next && doc.surface !== "drive" && doc.surface !== "home") return openTab(doc, next);
        doc.surface = baseSurface(doc);
        doc.open = undefined;
        doc.pane = null;
        doc.overlay = null;
        return { doc, ui: { selection: "" } };
      }
      return { doc };
    }
    case "g.layout":
      doc.drive = { ...(doc.drive ?? {}), layout: sv === "grid" ? "grid" : "list" };
      return { doc };
    case "g.details":
      doc.drive = { ...(doc.drive ?? {}), details: !doc.drive?.details };
      return { doc };
    case "g.pane": {
      if (!sv) { doc.pane = null; return { doc }; }
      doc.pane = doc.pane === sv ? null : sv;
      if (doc.pane === "Spelling and grammar" && doc.surface === "docs" && open) {
        const first = firstMisspelled(asWord(open));
        if (first) return { doc, ui: { selection: first } };
      }
      return { doc };
    }
    case "g.view": {
      flag(doc, { [`view:${sv}`]: !viewOn(doc, sv) });
      return { doc };
    }
    case "g.versions":
      if (!open) return { doc };
      doc.overlay = "history";
      return { doc, ui: { selection: "ver:current" } };
    case "g.versions.close":
      doc.overlay = null;
      return { doc, ui: editorUi(open) };
    case "g.copyLink":
      flag(doc, { linkCopied: ids(value)[0] ?? doc.open ?? "" });
      doc.toast = "Link copied";
      return { doc };
    case "g.help":
      doc.toast = sv === "Keyboard shortcuts" ? null : `${sv || "Help"} opens in a new tab`;
      return { doc };
    case "g.toast":
      doc.toast = sv || null;
      return { doc };
    case "g.filterView.close":
      flag(doc, { filterView: undefined });
      return { doc };
    case "g.filterView.open":
      flag(doc, { filterView: sv || undefined });
      return { doc };

    /* ---- Drive ---- */
    case "g.template": {
      const t = templateNamed(sv);
      if (!t) return { doc };
      const f: GFile = { id: nextId(doc, "new"), name: t.name, kind: t.kind, parent: "root", modified: NOW, modifiedBy: me.email, current: { time: NOW, author: me.name }, content: t.content() };
      // From File › New › From a template in an empty document, the template fills that document.
      if (open && open.kind === "doc" && t.kind === "doc" && doc.surface === "docs" && asWord(open).paragraphs.every((p) => !paraText(p).trim() && (!p.kind || p.kind === "p"))) {
        open.content = f.content;
        open.modified = NOW;
        doc.pane = null;
        return { doc, ui: editorUi(open) };
      }
      doc.files.push(f);
      return openTab(doc, f);
    }
    case "g.saveAsGoogle": {
      if (!open || !isOffice(open.kind)) return { doc };
      const kind: GKind = open.kind === "word" ? "doc" : open.kind === "excel" ? "sheet" : "slides";
      const copy: GFile = { ...clone(open), id: nextId(doc, "new"), name: open.name.replace(/\.(docx?|xlsx?|xlsm|pptx?)$/i, ""), kind, owner: me.email, starred: false, sharing: undefined, versions: [], current: { time: NOW, author: me.name }, modified: NOW, modifiedBy: me.email, size: undefined };
      doc.files.push(copy);
      doc.toast = "Saved as a Google file. The original Office file is unchanged.";
      return openTab(doc, copy);
    }
    case "g.new": {
      const spec = NEW_NAMES[sv] ?? NEW_NAMES["Google Docs"];
      const loc = doc.surface === "drive" ? doc.drive?.location ?? "root" : "root";
      const parent = loc === "root" || fileOf(doc, loc)?.kind === "folder" || (doc.sharedDrives ?? []).some((d) => d.id === loc) ? loc : "root";
      const f: GFile = { id: nextId(doc, "new"), name: spec.name, kind: spec.kind, parent, modified: NOW, modifiedBy: me.email, current: { time: NOW, author: me.name } };
      if (surfaceOf(spec.kind)) f.content = emptyContent(spec.kind);
      doc.files.push(f);
      if (!surfaceOf(spec.kind)) {
        doc.toast = `${spec.name} created`;
        return { doc };
      }
      return openTab(doc, f);
    }
    case "g.upload": {
      if (!sv) return { doc };
      const loc = doc.drive?.location ?? "root";
      const parent = loc === "root" || fileOf(doc, loc)?.kind === "folder" ? loc : "root";
      doc.files.push({ id: nextId(doc, "new"), name: sv, kind: kindFromName(sv), parent, modified: NOW, modifiedBy: me.email, size: "184 KB" });
      doc.toast = "1 upload complete";
      return { doc };
    }
    case "g.star":
      for (const fid of ids(value).length ? ids(value) : open ? [open.id] : []) {
        const f = fileOf(doc, fid);
        if (f) f.starred = !f.starred;
      }
      return { doc };
    case "g.trash": {
      const list = (sv === "$open" ? [open?.id ?? ""] : ids(value)).filter(Boolean);
      for (const fid of list) {
        const f = fileOf(doc, fid);
        if (f) f.trashed = true;
      }
      doc.toast = `${list.length === 1 ? (fileOf(doc, list[0])?.kind === "folder" ? "Folder" : "File") : `${list.length} items`} moved to trash`;
      if (doc.open && list.includes(doc.open)) {
        doc.tabs = (doc.tabs ?? []).filter((t) => t !== doc.open);
        doc.open = undefined;
        doc.surface = baseSurface(doc);
        doc.pane = null;
        doc.overlay = null;
      }
      return { doc, ui: { selection: "" } };
    }
    case "g.restore":
      for (const fid of ids(value)) {
        const f = fileOf(doc, fid);
        if (f) {
          f.trashed = false;
          if (f.parent && f.parent !== "root" && (!fileOf(doc, f.parent) || fileOf(doc, f.parent)?.trashed)) f.parent = "root";
        }
      }
      doc.toast = "Restored";
      return { doc, ui: { selection: "" } };
    case "g.deleteForever": {
      const gone = new Set(ids(value).flatMap((fid) => descendants(doc, fid)));
      doc.files = doc.files.filter((f) => !gone.has(f.id));
      doc.toast = "Deleted forever";
      return { doc, ui: { selection: "" } };
    }
    case "g.emptyTrash": {
      const gone = new Set(doc.files.filter((f) => f.trashed).flatMap((f) => descendants(doc, f.id)));
      doc.files = doc.files.filter((f) => !gone.has(f.id));
      doc.toast = "Trash emptied";
      return { doc };
    }
    case "g.drive.copy": {
      const src = fileOf(doc, ids(value)[0]);
      if (!src || src.kind === "folder") return { doc };
      const copy = clone(src);
      copy.id = nextId(doc, "new");
      copy.name = `Copy of ${src.name}`;
      copy.owner = me.email;
      copy.sharing = undefined;
      copy.starred = false;
      copy.comments = [];
      copy.versions = [];
      copy.modified = NOW;
      copy.modifiedBy = me.email;
      copy.parent = src.parent ?? "root";
      doc.files.push(copy);
      doc.toast = `Created "${copy.name}"`;
      return { doc, ui: { selection: `file:${copy.id}` } };
    }
    case "g.drive.download": {
      const f = fileOf(doc, ids(value)[0]);
      if (!f) return { doc };
      const ext = f.kind === "doc" ? ".docx" : f.kind === "sheet" ? ".xlsx" : f.kind === "slides" ? ".pptx" : f.kind === "folder" ? ".zip" : "";
      flag(doc, { downloaded: `${f.name}${ext}` });
      doc.toast = f.kind === "folder" ? "Zipping 1 file…" : "Download started";
      return { doc };
    }
    case "g.color": {
      const [fid, col] = sv.split("|");
      const f = fileOf(doc, fid);
      if (f) f.color = col;
      return { doc };
    }

    /* ---- File menu (editor) ---- */
    case "g.download": {
      if (!open) return { doc };
      const ext = /\(([^)]*?)(,.*)?\)$/.exec(sv)?.[1] ?? "";
      flag(doc, { downloaded: `${open.name}${ext.startsWith(".") ? ext : ""}` });
      doc.toast = "Download started";
      return { doc };
    }
    case "g.publish":
      flag(doc, { published: doc.open ?? "" });
      doc.toast = "Published to the web";
      return { doc };
    case "g.offline":
      flag(doc, { offline: !doc.flags?.offline });
      doc.toast = doc.flags?.offline ? "Available offline" : "No longer available offline";
      return { doc };

    /* ---- Docs mode, versions, comments ---- */
    case "g.mode": {
      const mode = (["Editing", "Suggesting", "Viewing"].includes(sv) ? sv : "Editing") as GoogleDoc["mode"];
      doc.mode = mode;
      if (open && open.kind === "doc") {
        const w = clone(asWord(open));
        w.trackChanges = mode === "Suggesting";
        open.content = w;
      }
      return { doc };
    }
    case "g.version.restore": {
      if (!open) return { doc };
      const vid = sv.replace(/^ver:/, "") || ui.selection.replace(/^ver:/, "");
      const v = open.versions?.find((x) => x.id === vid);
      if (!v) return { doc };
      const snapshot = { id: nextVersionId(open), time: open.current?.time ?? NOW, author: open.current?.author ?? me.name, name: open.current?.name, content: clone(contentOf(open)) };
      open.versions = [snapshot, ...(open.versions ?? [])];
      open.content = clone(v.content);
      open.current = { time: NOW, author: me.name };
      open.modified = NOW;
      open.modifiedBy = me.email;
      flag(doc, { restored: v.id });
      doc.overlay = null;
      doc.toast = "Version restored";
      return { doc, ui: editorUi(open) };
    }
    case "g.comment.resolve":
    case "g.comment.reopen":
    case "g.comment.delete": {
      if (!open) return { doc };
      const cid = sv.replace(/^comment:/, "") || ui.selection.replace(/^comment:/, "");
      if (id === "g.comment.delete") open.comments = (open.comments ?? []).filter((x) => x.id !== cid);
      else open.comments = (open.comments ?? []).map((x) => (x.id === cid ? { ...x, resolved: id === "g.comment.resolve" } : x));
      return { doc };
    }
    case "g.wordCountWhileTyping":
      flag(doc, { wordCountWhileTyping: !doc.flags?.wordCountWhileTyping });
      return { doc };
  }
  return editor(doc, { kind: "command", id, value }, ui);
}

function nextVersionId(f: GFile): string {
  let n = (f.versions?.length ?? 0) + 1;
  while ((f.versions ?? []).some((v) => v.id === `v${n}`)) n++;
  return `v${n}`;
}

export function viewOn(doc: GoogleDoc, key: string): boolean {
  const v = doc.flags?.[`view:${key}`];
  if (v !== undefined) return Boolean(v);
  // On unless turned off.
  return ["printLayout", "ruler", "spelling", "notes", "filmstrip", "protectedRanges"].includes(key);
}

function stripSuggestions(w: WordDoc) {
  for (const p of w.paragraphs) if (p.runs) p.runs = p.runs.filter((r) => !r.ins).map((r) => ({ ...r, del: undefined }));
}

/* ------------------------------------------------------------------ */
/* Editors                                                             */
/* ------------------------------------------------------------------ */

function commitContent(doc: GoogleDoc, f: GFile, next: GContent) {
  const before = contentOf(f);
  if (JSON.stringify(before) === JSON.stringify(next)) {
    f.content = next;
    return;
  }
  const me = meOf(doc);
  // A named version stays in the history as it was; edits start a new current version.
  if (f.current?.name) {
    f.versions = [{ id: nextVersionId(f), time: f.current.time ?? NOW, author: f.current.author ?? me.name, name: f.current.name, content: clone(before) }, ...(f.versions ?? [])];
    f.current = { time: NOW, author: me.name };
  } else f.current = { ...(f.current ?? {}), time: NOW, author: me.name };
  f.content = next;
  f.modified = NOW;
  f.modifiedBy = me.email;
  flag(doc, { edited: true });
}

function editor(doc: GoogleDoc, c: SimCommit, ui: SimUi): R {
  const f = openFile(doc);
  if (!f || doc.surface === "drive" || doc.surface === "home" || doc.surface === "signin" || doc.overlay === "history") return { doc };
  const content = clone(contentOf(f));
  let r: { doc: GContent; ui?: Partial<SimUi> };
  if (doc.surface === "docs") r = docsApply(doc, content as WordDoc, c, ui);
  else if (doc.surface === "sheets") r = sheetsApply(doc, f, content as ExcelBook, c, ui);
  else r = slidesApply(doc, content as PptDeck, c, ui);
  commitContent(doc, f, r.doc);
  return { doc, ui: r.ui };
}

/* ---------- Docs ---------- */

const DOC_STYLE_IN: Record<string, string> = { "Normal text": "Normal" };
const SPACING_IN: Record<string, string> = {
  Single: "1.0",
  Double: "2.0",
  "Add space before paragraph": "Add Space Before Paragraph",
  "Add space after paragraph": "Add Space After Paragraph",
  "Remove space after paragraph": "Remove Space After Paragraph",
  "Remove space before paragraph": "Remove Space Before Paragraph",
};
const WORD_CHART: Record<string, string> = { Bar: "Clustered Bar", Column: "Clustered Column", Line: "Line", Pie: "Pie" };

export function firstMisspelled(w: WordDoc): string | undefined {
  for (const p of w.paragraphs) for (const r of p.runs ?? []) if (r.misspelled && r.id) return `${p.id}.${r.id}`;
  return undefined;
}

function docsApply(doc: GoogleDoc, w: WordDoc, c: SimCommit, ui: SimUi): { doc: WordDoc; ui?: Partial<SimUi> } {
  // The editing mode is the source of truth for suggestions (Word's Track Changes).
  w.trackChanges = doc.mode === "Suggesting" || undefined;
  const sel = wordSel(w, ui.selection);
  const paras = () => sel.paras.map((id) => w.paragraphs.find((p) => p.id === id)).filter(Boolean) as WordPara[];
  if (c.kind === "command") {
    const sv = c.value === undefined ? "" : String(c.value);
    switch (c.id) {
      case "home.style":
      case "home.updateStyle":
        return tagSuggestions(doc, applyWord(w, { ...c, value: DOC_STYLE_IN[sv] ?? sv }, ui));
      case "home.changeCase":
        return tagSuggestions(doc, applyWord(w, { ...c, value: sv === "Title Case" ? "Capitalize Each Word" : sv }, ui));
      case "home.lineSpacing":
        return applyWord(w, { ...c, value: SPACING_IN[sv] ?? sv }, ui);
      case "home.highlight":
        return applyWord(w, { ...c, value: sv === "None" || sv === "Reset" ? "No Color" : sv }, ui);
      case "home.fontColor":
        return applyWord(w, { ...c, value: sv === "Reset" ? "Automatic" : sv }, ui);
      case "review.accept":
      case "review.reject":
        return applyWord(w, { ...c, value: /all/i.test(sv) ? `${c.id === "review.accept" ? "Accept" : "Reject"} All Changes` : sv }, ui);
      case "insert.chart":
        return applyWord(w, { kind: "dialog", id: "insertChart", values: { type: WORD_CHART[sv] ?? "Clustered Column" } }, ui);
      case "g.checklist": {
        const ps = paras().filter((p) => !p.kind || p.kind === "p");
        const on = ps.length > 0 && ps.every((p) => p.list === "bullet" && (p.bulletChar === "☐" || p.bulletChar === "☑"));
        for (const p of ps) {
          if (on) { p.list = null; p.bulletChar = undefined; }
          else { p.list = "bullet"; p.bulletChar = "☐"; }
        }
        return { doc: w };
      }
      case "g.check":
        for (const p of paras()) {
          if (p.bulletChar === "☐") { p.bulletChar = "☑"; p.strike = true; }
          else if (p.bulletChar === "☑") { p.bulletChar = "☐"; p.strike = undefined; }
        }
        return { doc: w };
      case "g.hr": {
        let n = 1;
        while (w.paragraphs.some((p) => p.id === `hr${n}`)) n++;
        const at = w.paragraphs.findIndex((p) => p.id === sel.paras[sel.paras.length - 1]);
        w.paragraphs.splice(at < 0 ? w.paragraphs.length : at + 1, 0, { id: `hr${n}`, text: "", border: "#9aa0a6", spaceAfter: 6 });
        return { doc: w };
      }
      case "g.zoom":
        w.zoom = sv === "Fit" ? undefined : Number(sv.replace("%", "")) || 100;
        return { doc: w };
      case "g.block":
        return insertBlock(w, sv, sel.run?.para ?? sel.paras[sel.paras.length - 1]);
    }
  }
  if (c.kind === "dialog") {
    const v = c.values;
    switch (c.id) {
      case "g.chip":
        return insertChip(doc, w, String(v.kind ?? "person"), String(v.value ?? ""), ui);
      case "g.image":
        return applyWord(w, { kind: "dialog", id: "insertPicture", values: { file: v.file ?? "Image" } }, ui);
      case "g.indent":
        return applyWord(w, { kind: "dialog", id: "paragraph", values: { indentLeft: v.left ?? 0, indentRight: v.right ?? 0, special: v.special === "First line" ? "First line" : v.special === "Hanging" ? "Hanging" : "(none)", by: v.by ?? 0.5 } }, ui);
      case "g.spacing":
        return applyWord(w, { kind: "dialog", id: "paragraph", values: { lineSpacing: "Multiple", at: Number(v.lineSpacing ?? 1.15), spaceBefore: Number(v.before ?? 0), spaceAfter: Number(v.after ?? 0) } }, ui);
      case "g.pageSetup": {
        const m = (k: string) => Number(v[k] ?? 1);
        const sizes: Record<string, string> = { "Letter": "Letter", Legal: "Legal", A4: "A4", A5: "A5", Executive: "Executive" };
        const size = sizes[String(v.size ?? "Letter").split(" ")[0]] ?? String(v.size ?? "Letter").split(" ")[0];
        const t = m("top"), b = m("bottom"), l = m("left"), r = m("right");
        w.page = { ...(w.page ?? {}), orientation: String(v.orientation ?? "Portrait").toLowerCase() === "landscape" ? "landscape" : "portrait", size, margins: t === 1 && b === 1 && l === 1 && r === 1 ? "Normal" : `Custom (T ${t}" B ${b}" L ${l}" R ${r}")` };
        w.pageColor = v.pageColor && String(v.pageColor).toLowerCase() !== "#ffffff" ? String(v.pageColor) : undefined;
        w.flags = { ...(w.flags ?? {}), pageless: v.format === "Pageless" };
        return { doc: w };
      }
    }
  }
  return tagSuggestions(doc, applyWord(w, c, ui));
}

/** Smart chip text for a picker value. */
export function chipFor(doc: GoogleDoc, kind: string, value: string): GChip | null {
  if (kind === "person") {
    const p = personOf(doc, value);
    return { kind: "person", label: p?.name ?? value, ref: p?.email ?? value };
  }
  if (kind === "file") {
    const f = fileOf(doc, value) ?? doc.files.find((x) => x.name.toLowerCase() === value.toLowerCase());
    return f ? { kind: "file", label: f.name, ref: f.id } : null;
  }
  if (kind === "date") return value.trim() ? { kind: "date", label: value.trim(), ref: value.trim() } : null;
  return null;
}

function insertChip(doc: GoogleDoc, w: WordDoc, kind: string, value: string, ui: SimUi): { doc: WordDoc; ui?: Partial<SimUi> } {
  const chip = chipFor(doc, kind, value);
  const sel = wordSel(w, ui.selection);
  const pid = sel.run?.para ?? sel.paras[sel.paras.length - 1];
  const p = w.paragraphs.find((x) => x.id === pid);
  if (!chip || !p || (p.kind && p.kind !== "p")) return { doc: w };
  const runs: GRun[] = (p.runs ?? (p.text ? [{ text: p.text }] : [])) as GRun[];
  let n = 1;
  while (runs.some((r) => r.id === `chip${n}`)) n++;
  const run: GRun = { id: `chip${n}`, text: chip.label, chip };
  const at = sel.run ? runs.findIndex((r) => r.id === sel.run!.run) + 1 : runs.length;
  const before = runs[at - 1];
  const pad: GRun[] = before && before.text && !/\s$/.test(before.text) ? [{ text: " " }] : [];
  runs.splice(at, 0, ...pad, run);
  p.runs = runs;
  p.text = undefined;
  return { doc: w, ui: { selection: `${p.id}.${run.id}` } };
}

/** Insert › Building blocks: Meeting notes or Email draft, after the selected paragraph. */
function insertBlock(w: WordDoc, name: string, after: string | undefined): { doc: WordDoc; ui?: Partial<SimUi> } {
  if (!BUILDING_BLOCKS.includes(name)) return { doc: w };
  const at = Math.max(0, w.paragraphs.findIndex((p) => p.id === after) + 1) || w.paragraphs.length;
  const made: WordPara[] = [];
  const add = (p: Omit<WordPara, "id">) => {
    let n = 1;
    while (w.paragraphs.some((x) => x.id === `blk${n}`) || made.some((x) => x.id === `blk${n}`)) n++;
    const para = { ...p, id: `blk${n}` } as WordPara;
    made.push(para);
    return para;
  };
  if (name === "Meeting notes") {
    add({ style: "Heading 2", runs: [{ id: "chip1", text: TODAY_SHORT, chip: { kind: "date", label: TODAY_SHORT, ref: TODAY_SHORT } } as GRun, { text: " | Meeting title" }] });
    add({ text: "Attendees: " });
    add({ style: "Heading 3", text: "Notes" });
    add({ list: "bullet", text: "" });
    add({ style: "Heading 3", text: "Action items" });
    add({ list: "bullet", bulletChar: "☐", text: "" });
  } else {
    add({ kind: "table", table: { rows: [["To", ""], ["Cc", ""], ["Bcc", ""], ["Subject", ""]], widths: [20, 80] } });
    add({ text: "" });
  }
  w.paragraphs.splice(at, 0, ...made);
  return { doc: w, ui: { selection: made[0].kind === "table" ? `${made[0].id}.r1c2` : made[0].id } };
}

/** Suggestions typed in Suggesting mode carry your name. */
function tagSuggestions(doc: GoogleDoc, r: { doc: WordDoc; ui?: Partial<SimUi> }) {
  if (!r.doc.trackChanges) return r;
  const me = meOf(doc).name;
  for (const p of r.doc.paragraphs) for (const run of p.runs ?? []) if ((run.ins || run.del) && !(run as SuggestRun).author) (run as SuggestRun).author = me;
  return r;
}

export type SuggestRun = GRun;

/* ---------- Sheets ---------- */

const NUMFMT_IN: Record<string, NonNullable<CellFormat["numFmt"]>> = {
  Automatic: "General",
  "Plain text": "Text",
  Number: "Number",
  Percent: "Percentage",
  Scientific: "Scientific",
  Accounting: "Accounting",
  Financial: "Comma",
  Currency: "Currency",
  "Currency rounded": "Currency",
  Date: "Short Date",
  Time: "Time",
  "Date time": "Short Date",
  Duration: "Time",
};
const MERGE_IN: Record<string, string> = { "Merge all": "Merge Cells", "Merge horizontally": "Merge Across", "Merge vertically": "Merge Cells", Unmerge: "Unmerge Cells" };
const BORDER_IN: Record<string, string> = {
  "All borders": "All Borders",
  "Inner borders": "All Borders",
  "Horizontal borders": "All Borders",
  "Vertical borders": "All Borders",
  "Outer borders": "Outside Borders",
  "Left border": "Outside Borders",
  "Right border": "Outside Borders",
  "Top border": "Top Border",
  "Bottom border": "Bottom Border",
  "Clear borders": "No Border",
};
const SUMMARIZE_IN: Record<string, string> = { SUM: "Sum", COUNTA: "Count", COUNT: "Count", AVERAGE: "Average", MAX: "Max", MIN: "Min" };

export type GCellFmt = CellFormat & { strike?: boolean; clip?: boolean };
export type GCF = ExcelCF & { bold?: boolean; value2?: string | number };

function eachCell(sheet: ExcelSheet, rc: Rect, fn: (ref: string) => void) {
  for (let r = rc.r1; r <= Math.min(rc.r2, rc.r1 + 500); r++) for (let c = rc.c1; c <= Math.min(rc.c2, rc.c1 + 60); c++) fn(refOf(c, r));
}

function fmtSel(sheet: ExcelSheet, sel: string, fn: (f: GCellFmt) => GCellFmt) {
  const rc = selRect(sheet, sel);
  if (!rc) return;
  eachCell(sheet, rc, (ref) => {
    const cell = sheet.cells[ref] ?? {};
    sheet.cells[ref] = { ...cell, fmt: fn({ ...(cell.fmt ?? {}) }) };
  });
}

/** The data region a Sheets command acts on: the selected range, or the block around the active cell. */
export function regionOf(sheet: ExcelSheet, ui: SimUi): Rect | null {
  const sel = ui.selection || "A1";
  if (sel.includes(":") && !/^[A-Z]+:[A-Z]+$|^\d+:\d+$/i.test(sel)) return selRect(sheet, sel);
  return currentRegion(sheet, activeCell(ui)) ?? selRect(sheet, sel);
}

function sheetsApply(doc: GoogleDoc, f: GFile, book: ExcelBook, c: SimCommit, ui: SimUi): { doc: ExcelBook; ui?: Partial<SimUi> } {
  const sheet = sheetOf(book, ui);
  const act = activeCell(ui);
  const sel = ui.selection || "A1";
  if (c.kind === "command") {
    const sv = c.value === undefined ? "" : String(c.value);
    switch (c.id) {
      case "home.numberFormat": {
        const r = applyExcel(book, { ...c, value: NUMFMT_IN[sv] ?? sv }, ui);
        if (sv === "Currency rounded") fmtSel(sheetOf(r.doc, ui), sel, (x) => ({ ...x, decimals: 0 }));
        return r;
      }
      case "home.merge":
        return applyExcel(book, { ...c, value: MERGE_IN[sv] ?? (sv || "Merge Cells") }, ui);
      case "home.borders":
        return applyExcel(book, { ...c, value: BORDER_IN[sv] ?? (sv || "All Borders") }, ui);
      case "home.fill":
        return applyExcel(book, { ...c, value: sv === "Reset" || sv === "None" ? "No Fill" : sv }, ui);
      case "home.fontColor":
        return applyExcel(book, { ...c, value: sv === "Reset" ? "Automatic" : sv }, ui);
      case "home.wrap":
        fmtSel(sheet, sel, (x) => ({ ...x, wrap: sv === "Wrap" || (!sv && !x.wrap) || undefined, clip: sv === "Clip" || undefined }));
        return { doc: book };
      case "home.strike": {
        const on = !(sheet.cells[act]?.fmt as GCellFmt | undefined)?.strike;
        fmtSel(sheet, sel, (x) => ({ ...x, strike: on || undefined }));
        return { doc: book };
      }
      case "home.insert": {
        const rc = selRect(sheet, sel);
        if (!rc) return { doc: book };
        if (sv === "Insert 1 row above" || sv === "Insert 1 row below") {
          const r = sv.endsWith("below") ? rc.r2 + 1 : rc.r1;
          return applyExcel(book, { kind: "command", id: "home.insert", value: "Insert Sheet Rows" }, { ...ui, selection: `${r}:${r}` });
        }
        if (sv === "Insert 1 column left" || sv === "Insert 1 column right") {
          const col = numToCol(sv.endsWith("right") ? rc.c2 + 1 : rc.c1);
          return applyExcel(book, { kind: "command", id: "home.insert", value: "Insert Sheet Columns" }, { ...ui, selection: `${col}:${col}` });
        }
        return applyExcel(book, c, ui);
      }
      case "insert.chart": {
        const r = applyExcel(book, { kind: "command", id: "insert.chart", value: sv || "Column chart" }, ui);
        doc.pane = "Chart editor";
        return r;
      }
      case "pivot.summarize":
        return applyExcel(book, { ...c, value: SUMMARIZE_IN[sv] ?? sv }, ui);
      case "g.freeze": {
        const cur = sheet.freeze ? parseRef(sheet.freeze) : null;
        let rows = cur ? cur.r - 1 : 0, cols = cur ? cur.c - 1 : 0;
        const p = parseRef(act) ?? { c: 1, r: 1 };
        if (sv === "No rows") rows = 0;
        else if (sv === "1 row") rows = 1;
        else if (sv === "2 rows") rows = 2;
        else if (sv.startsWith("Up to row")) rows = Number(/\d+/.exec(sv)?.[0] ?? p.r);
        else if (sv === "No columns") cols = 0;
        else if (sv === "1 column") cols = 1;
        else if (sv === "2 columns") cols = 2;
        else if (sv.startsWith("Up to column")) cols = /column ([A-Z]+)/.exec(sv) ? parseRef(`${/column ([A-Z]+)/.exec(sv)![1]}1`)!.c : p.c;
        sheet.freeze = rows || cols ? refOf(cols + 1, rows + 1) : null;
        return { doc: book };
      }
      case "g.convertTable": {
        const rc = regionOf(sheet, ui);
        if (!rc) return { doc: book };
        let n = 1;
        while (book.sheets.some((x) => x.table?.name === `Table${n}`)) n++;
        sheet.table = { range: rectToRange(rc), style: "Google table", name: `Table${n}` };
        return { doc: book, ui: { selection: rectToRange(rc) } };
      }
      case "g.altColors": {
        const rc = regionOf(sheet, ui);
        if (rc) book.flags = { ...(book.flags ?? {}), [`alt:${sheet.name}`]: rectToRange(rc) };
        return { doc: book };
      }
      case "g.trim": {
        const rc = selRect(sheet, sel);
        if (rc) eachCell(sheet, rc, (ref) => { const cell = sheet.cells[ref]; if (cell && typeof cell.v === "string") sheet.cells[ref] = { ...cell, v: cell.v.trim().replace(/\s+/g, " ") }; });
        return { doc: book };
      }
      case "g.split": {
        const first = String(sheet.cells[act]?.v ?? "");
        return applyExcel(book, { kind: "dialog", id: "textToColumns", values: { delimiter: first.includes(",") ? "Comma" : first.includes(";") ? "Semicolon" : "Space" } }, ui);
      }
      case "g.checkbox": {
        const range = normalizeRange(sel);
        sheet.validation = { ...(sheet.validation ?? {}), [range]: { type: "Checkbox" } };
        const rc = selRect(sheet, sel);
        if (rc) eachCell(sheet, rc, (ref) => { const cell = sheet.cells[ref] ?? {}; if (cell.v === undefined || cell.v === "") sheet.cells[ref] = { ...cell, v: "FALSE" }; });
        return { doc: book };
      }
      case "g.filterView": {
        const rc = sheet.filter ? parseRange(sheet.filter) : regionOf(sheet, ui);
        if (!rc) return { doc: book };
        let n = 1;
        while ((f.filterViews ?? []).some((v) => v.id === `fv${n}`)) n++;
        f.filterViews = [...(f.filterViews ?? []), { id: `fv${n}`, name: `Filter ${n}`, sheet: sheet.name, range: rectToRange(rc), values: {} }];
        flag(doc, { filterView: `fv${n}` });
        return { doc: book };
      }
      case "filter.by": {
        const fv = activeFilterView(doc, f, sheet);
        if (!fv) return applyExcel(book, c, ui);
        const m = /^([A-Z]+)(=|~)(.*)$/i.exec(sv);
        if (!m) return { doc: book };
        const vals = { ...(fv.values ?? {}) };
        const col = m[1].toUpperCase();
        if (m[2] === "~") vals[col] = [`~${m[3]}`];
        else if (!m[3] || m[3] === "*") delete vals[col];
        else vals[col] = m[3].split("|");
        fv.values = vals;
        return { doc: book };
      }
      case "g.zoom":
        sheet.zoom = Number(sv.replace("%", "")) || 100;
        return { doc: book };
    }
  }
  if (c.kind === "dialog") {
    const v = c.values;
    switch (c.id) {
      case "g.sortRange": {
        const rc = v.range ? parseRange(String(v.range).replace(/\$/g, "").toUpperCase()) : regionOf(sheet, ui);
        if (rc) sortRange(book, sheet, rc, Boolean(v.header), String(v.sortBy ?? ""), String(v.order ?? "A to Z").startsWith("Z"));
        return { doc: book };
      }
      case "g.validation": {
        const range = normalizeRange(String(v.range || sel).replace(/^.*!/, "").replace(/\$/g, ""));
        const crit = String(v.criteria ?? "Dropdown");
        const type = crit.startsWith("Dropdown") ? "List" : crit === "Checkbox" ? "Checkbox" : crit === "Number between" ? "Decimal" : crit;
        const list = crit === "Dropdown (from a range)" ? listFromRange(book, sheet, String(v.items ?? "")) : String(v.items ?? "").split(",").map((x) => x.trim()).filter(Boolean);
        sheet.validation = {
          ...(sheet.validation ?? {}),
          [range]: { type, list: type === "List" ? list : undefined, min: v.min !== undefined && v.min !== "" ? Number(v.min) : undefined, max: v.max !== undefined && v.max !== "" ? Number(v.max) : undefined },
        };
        book.flags = { ...(book.flags ?? {}), [`vstyle:${sheet.name}!${range}`]: String(v.style ?? "Chip"), [`vreject:${sheet.name}!${range}`]: v.invalid === "Reject the input" };
        return { doc: book };
      }
      case "g.cf": {
        const range = normalizeRange(String(v.range || sel).replace(/\$/g, ""));
        const st = CF_STYLES[String(v.style ?? "Default")] ?? CF_STYLES.Default;
        const rule: GCF = v.type === "Color scale" ? { range, rule: "Color scale", fill: "#57bb8a" } : { range, rule: String(v.condition ?? "Is not empty"), value: numOrText(v.value), value2: v.value2 === undefined || v.value2 === "" ? undefined : numOrText(v.value2), fill: st.fill, color: st.color, bold: st.bold };
        sheet.cf = [...(sheet.cf ?? []), rule];
        return { doc: book };
      }
      case "g.pivot": {
        const rc = v.range ? parseRange(String(v.range).replace(/^.*!/, "").replace(/\$/g, "").toUpperCase()) : regionOf(sheet, ui);
        const start = rc ? refOf(rc.c1, rc.r1) : act;
        const r = applyExcel(book, { kind: "dialog", id: "createPivot", values: { location: v.insert === "Existing sheet" ? "Existing Worksheet" : "New Worksheet", at: String(v.at ?? "H1") } }, { ...ui, selection: start });
        doc.pane = "Pivot table editor";
        if (r.ui?.sheet) {
          const ns = r.doc.sheets.find((s) => s.name === r.ui!.sheet);
          let n = 1;
          while (r.doc.sheets.some((s) => s.name === `Pivot Table ${n}`)) n++;
          if (ns) {
            ns.name = `Pivot Table ${n}`;
            if (ns.pivot) ns.pivot.at = "A1";
            // Google puts the new sheet after the source sheet.
            const i = r.doc.sheets.indexOf(ns);
            r.doc.sheets.splice(i, 1);
            r.doc.sheets.splice(r.doc.sheets.findIndex((s) => s.name === sheet.name) + 1, 0, ns);
            return { doc: r.doc, ui: { sheet: ns.name, selection: "A1" } };
          }
        }
        return r;
      }
      case "g.protect": {
        const whole = v.kind === "Sheet";
        const range = whole ? "" : normalizeRange(String(v.range || sel).replace(/^.*!/, "").replace(/\$/g, ""));
        let n = 1;
        while ((f.protected ?? []).some((p) => p.id === `pr${n}`)) n++;
        const pr: GProtected = { id: `pr${n}`, sheet: sheet.name, range, description: String(v.description ?? "") || undefined, mode: String(v.mode ?? "").startsWith("Show a warning") ? "warning" : "restricted", editors: [meOf(doc).email] };
        f.protected = [...(f.protected ?? []), pr];
        return { doc: book };
      }
      case "g.removeDuplicates": {
        const r = applyExcel(book, { kind: "dialog", id: "removeDuplicates", values: { headers: v.header !== false } }, ui);
        if (r.doc.pane) {
          doc.toast = r.doc.pane.replace(/^Removed/, "Removed").replace(/values?;/, "rows;");
          r.doc.pane = null;
        }
        return r;
      }
      case "replace":
        return applyExcel(book, { kind: "dialog", id: "replace", values: { find: v.find ?? "", replace: v.replace ?? "", matchCase: Boolean(v.matchCase), within: v.search === "This sheet" ? "Sheet" : "Workbook" } }, ui);
    }
  }
  return applyExcel(book, c, ui);
}

export function activeFilterView(doc: GoogleDoc, f: GFile, sheet: ExcelSheet) {
  const id = doc.flags?.filterView;
  return (f.filterViews ?? []).find((v) => v.id === id && v.sheet === sheet.name);
}

function numOrText(v: SimValue | undefined): string | number | undefined {
  if (v === undefined || v === "") return undefined;
  const s = String(v).trim();
  const n = Number(s.replace(/[$,%]/g, ""));
  return s !== "" && !Number.isNaN(n) && /\d/.test(s) && !s.startsWith("=") ? n : s;
}

function listFromRange(book: ExcelBook, sheet: ExcelSheet, range: string): string[] {
  const rc = parseRange(range.replace(/^.*!/, "").replace(/\$/g, "").replace(/^=/, "").toUpperCase());
  if (!rc) return [];
  const out: string[] = [];
  eachCell(sheet, rc, (ref) => { const v = evaluateCell(book, sheet, ref); if (v !== null && v !== "") out.push(String(v)); });
  return Array.from(new Set(out));
}

/** Google's Sort range: sorts only the rows of the range, by one column. */
function sortRange(book: ExcelBook, sheet: ExcelSheet, rc: Rect, header: boolean, sortBy: string, desc: boolean) {
  const top = rc.r1 + (header ? 1 : 0);
  if (top > rc.r2) return;
  let col = rc.c1;
  const m = /^Column ([A-Z]+)$/i.exec(sortBy.trim());
  if (m) col = parseRef(`${m[1].toUpperCase()}1`)!.c;
  else if (sortBy) {
    for (let c = rc.c1; c <= rc.c2; c++) if (String(sheet.cells[refOf(c, rc.r1)]?.v ?? "").toLowerCase() === sortBy.trim().toLowerCase()) col = c;
  }
  const rows = Array.from({ length: rc.r2 - top + 1 }, (_, i) => top + i);
  const key = (r: number) => evaluateCell(book, sheet, refOf(col, r));
  rows.sort((a, b) => {
    const x = key(a), y = key(b);
    if (x === null || x === "") return 1;
    if (y === null || y === "") return -1;
    const cmp = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true, sensitivity: "base" });
    return desc ? -cmp : cmp;
  });
  const snap: Record<string, ExcelCell | undefined> = {};
  for (let r = top; r <= rc.r2; r++) for (let c = rc.c1; c <= rc.c2; c++) snap[refOf(c, r)] = sheet.cells[refOf(c, r)];
  rows.forEach((from, i) => {
    const to = top + i;
    for (let c = rc.c1; c <= rc.c2; c++) {
      const cell = snap[refOf(c, from)];
      const ref = refOf(c, to);
      if (!cell) delete sheet.cells[ref];
      else sheet.cells[ref] = { ...cell, f: cell.f ? shiftFormula(cell.f, 0, to - from) : undefined };
      if (sheet.cells[ref] && sheet.cells[ref].f === undefined) delete sheet.cells[ref].f;
    }
  });
  sheet.sortedBy = `${numToCol(col)}:${desc ? "desc" : "asc"}`;
}

/* ---------- Slides ---------- */

const PPT_SHAPE: Record<string, string> = {
  Rectangle: "Rectangle",
  "Rounded rectangle": "Rounded Rectangle",
  Oval: "Oval",
  Triangle: "Isosceles Triangle",
  Diamond: "Diamond",
  Pentagon: "Pentagon",
  Hexagon: "Hexagon",
  Star: "Star: 5 Points",
  "Right arrow": "Right Arrow",
  "Left arrow": "Left Arrow",
  "Up arrow": "Up Arrow",
  "Down arrow": "Down Arrow",
  "Rectangular callout": "Speech Bubble: Rectangle",
  "Oval callout": "Speech Bubble: Oval",
};
const PPT_CHART: Record<string, string> = { Bar: "Clustered Bar", Column: "Clustered Column", Line: "Line", Pie: "Pie" };
const ANIM_START: Record<string, string> = { "On click": "On Click", "After previous": "After Previous", "With previous": "With Previous" };

function slidesApply(doc: GoogleDoc, deck: PptDeck, c: SimCommit, ui: SimUi): { doc: PptDeck; ui?: Partial<SimUi> } {
  const slide = activeSlide(deck, ui);
  if (c.kind === "command") {
    const sv = c.value === undefined ? "" : String(c.value);
    switch (c.id) {
      case "slides.new":
      case "slides.layout": {
        const r = applyPpt(deck, { ...c, value: googleLayout(sv || "Title and body") }, ui);
        return withActive(r, ui);
      }
      case "slides.move": {
        if (!slide) return { doc: deck };
        const i = deck.slides.findIndex((s) => s.id === slide.id);
        const m = /^(?:\$slide|[^@]+)@(.+)$/.exec(sv);
        const where = m?.[1] ?? "";
        const pos = where === "up" ? i : where === "down" ? i + 2 : where === "end" ? deck.slides.length : Number(where) || 1;
        const sid = sv.startsWith("$slide") || !sv.includes("@") ? slide.id : sv.split("@")[0];
        return applyPpt(deck, { kind: "command", id: "slides.move", value: `${sid}@${pos}` }, ui);
      }
      case "insert.shape": {
        if (sv === "Line") {
          const r = applyPpt(deck, { kind: "command", id: "insert.shape", value: "Rectangle" }, ui);
          const key = r.ui?.selection ?? "";
          const [sid, oid] = key.split(".");
          const o = r.doc.slides.find((s) => s.id === sid)?.objects?.find((x) => x.id === oid);
          if (o) Object.assign(o, { label: "Line", h: 0.6, y: 50, fill: "#5f6368" } as Partial<PptObject>);
          return r;
        }
        return applyPpt(deck, { ...c, value: PPT_SHAPE[sv] ?? sv }, ui);
      }
      case "insert.chart": {
        const r = applyPpt(deck, { kind: "dialog", id: "insertChart", values: { type: PPT_CHART[sv] ?? "Clustered Column" } }, ui);
        r.doc.pane = null;
        return r;
      }
      case "home.lineSpacing":
        return applyPpt(deck, { ...c, value: sv === "Single" ? "1" : sv === "Double" ? "2" : sv }, ui);
      case "home.highlight":
        return { doc: deck };
      case "animation.start":
        return applyPpt(deck, { ...c, value: ANIM_START[sv] ?? sv }, ui);
      case "g.zoom":
        deck.flags = { ...(deck.flags ?? {}), zoom: sv === "Fit" ? 100 : Number(sv.replace("%", "")) || 100 };
        return { doc: deck };
    }
  }
  if (c.kind === "dialog") {
    const v = c.values;
    switch (c.id) {
      case "g.image":
        return applyPpt(deck, { kind: "dialog", id: "insertPicture", values: { file: v.file ?? "Image" } }, ui);
      case "g.background":
        return applyPpt(deck, { kind: "dialog", id: "formatBackground", values: { color: String(v.color ?? "#ffffff"), applyToAll: Boolean(v.addToTheme) } }, ui);
      case "g.slideSize":
        return applyPpt(deck, { kind: "command", id: "design.slideSize", value: String(v.size ?? "Widescreen 16:9") }, ui);
    }
  }
  const r = applyPpt(deck, c, ui);
  if (c.kind === "command" && ["review.showComments", "chart.editData"].includes(c.id)) r.doc.pane = null;
  return withActive(r, ui);
}

function withActive(r: { doc: PptDeck; ui?: Partial<SimUi> }, ui: SimUi) {
  const sid = r.ui?.slide ?? ui.slide;
  if (sid && r.doc.slides.some((s) => s.id === sid)) r.doc.active = sid;
  return r;
}

/* ------------------------------------------------------------------ */
/* Selection checks (validator)                                        */
/* ------------------------------------------------------------------ */

const TYPE_TARGETS = /^(rename|newfolder|assign|reply|vername|filterview|note|signin):/;

export function googleSelectionExists(doc: GoogleDoc, sel: string): boolean {
  if (!sel) return true;
  if (sel === "comment" || TYPE_TARGETS.test(sel)) return true;
  if (sel.startsWith("file:")) return sel.split(",").every((k) => Boolean(fileOf(doc, k.trim().replace(/^file:/, ""))));
  const f = openFile(doc);
  if (sel.startsWith("ver:")) return sel === "ver:current" ? Boolean(f) : Boolean(f?.versions?.some((v) => v.id === sel.slice(4)));
  if (sel.startsWith("comment:")) return Boolean(f?.comments?.some((c) => c.id === sel.slice(8)));
  if (!f || doc.surface === "drive" || doc.surface === "home" || doc.surface === "signin") return false;
  const content = contentOf(f);
  if (doc.surface === "docs") {
    const w = content as WordDoc;
    if (sel === "all" || sel === "header" || sel === "footer") return true;
    const cell = /^([^.,]+)\.r(\d+)c(\d+)$/.exec(sel);
    if (cell) {
      const p = w.paragraphs.find((x) => x.id === cell[1]);
      return Boolean(p?.table && p.table.rows.length >= Number(cell[2]) && p.table.rows[0].length >= Number(cell[3]));
    }
    return sel.split(",").every((part) => {
      const [pid, rid] = part.trim().split(".");
      const p = w.paragraphs.find((x) => x.id === pid);
      if (!p) return false;
      return rid ? Boolean(p.runs?.some((r) => r.id === rid)) : true;
    });
  }
  if (doc.surface === "sheets") {
    const b = content as ExcelBook;
    const m = /^(sheet|chart):([^.]+)/.exec(sel);
    if (m?.[1] === "sheet") return b.sheets.some((s) => s.name === m[2]);
    if (m?.[1] === "chart") return b.sheets.some((s) => s.charts?.some((c) => c.id === m[2]));
    return /^[A-Z]{1,3}\d+(:[A-Z]{1,3}\d+)?$|^[A-Z]+:[A-Z]+$|^\d+:\d+$/i.test(sel.replace(/\$/g, ""));
  }
  const d = content as PptDeck;
  return sel.split(",").every((k) => {
    const [sid, part] = k.trim().split(".");
    const s = d.slides.find((x) => x.id === sid);
    if (!s) return false;
    if (!part || ["title", "subtitle", "body", "body2", "notes"].includes(part)) return true;
    return Boolean(s.objects?.some((o) => o.id === part));
  });
}

export function describeGoogle(doc: GoogleDoc, ui: SimUi): string {
  const sel = ui.selection;
  if (sel.startsWith("file:")) return fileOf(doc, sel.slice(5))?.name ?? "";
  const f = openFile(doc);
  if (!f) return "";
  if (doc.surface === "docs") {
    const w = asWord(f);
    const p = w.paragraphs.find((x) => x.id === wordSel(w, sel).paras[0]);
    return p ? `“${paraText(p).slice(0, 40)}”` : "";
  }
  return sel;
}

/** Used range of a sheet, as text, for Explore and the name box. */
export function usedRange(sheet: ExcelSheet): string {
  const u = usedRect(sheet);
  return u ? rectToRange(u) : "A1";
}
