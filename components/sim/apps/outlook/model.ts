import type { DialogDef, DialogField, SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { clone } from "@/lib/sim/ops";
import { applyCommonCommit } from "@/lib/sim/common";
import type {
  OlActivity, OlAttachment, OlCompose, OlContact, OlEvent, OlFlag, OlFolder, OlForm, OlFormData, OlGroup,
  OlMessage, OlModule, OlPerson, OlRecurrence, OlRule, OlShowAs, OlTask, OlTaskStatus, OutlookDoc,
} from "./types";
import {
  NOW, TODAY, addDays, addMinutes, at, dateOf, dow, fmtDate, fmtLong, fmtTime, flagDates, minutesBetween, parseTime,
  parseUsDate, toMs, weekStart, addMonths, DAY_NAMES, MONTHS, timeOf,
} from "./dates";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

export const SYSTEM_FOLDERS: OlFolder[] = [
  { id: "inbox", name: "Inbox" },
  { id: "drafts", name: "Drafts" },
  { id: "sent", name: "Sent Items" },
  { id: "deleted", name: "Deleted Items" },
  { id: "archive", name: "Archive" },
  { id: "junk", name: "Junk Email" },
  { id: "outbox", name: "Outbox" },
];

export const CATEGORY_SLOTS = ["Red Category", "Orange Category", "Yellow Category", "Green Category", "Blue Category", "Purple Category"];
export const CATEGORY_COLORS: Record<string, string> = {
  "Red Category": "#e34a4a",
  "Orange Category": "#f7952f",
  "Yellow Category": "#f2c811",
  "Green Category": "#4fae4f",
  "Blue Category": "#3f8fd8",
  "Purple Category": "#9065c9",
};

export const REMINDERS = ["None", "0 minutes", "5 minutes", "10 minutes", "15 minutes", "30 minutes", "1 hour", "2 hours", "3 hours", "4 hours", "18 hours", "1 day", "2 days", "3 days", "1 week", "2 weeks"];
export const SHOW_AS: OlShowAs[] = ["Free", "Working Elsewhere", "Tentative", "Busy", "Out of Office"];
export const TASK_STATUS: OlTaskStatus[] = ["Not Started", "In Progress", "Completed", "Waiting on someone else", "Deferred"];
export const PRIORITIES = ["Low", "Normal", "High"];
export const FLAG_TO = ["Call", "Do not Forward", "Follow up", "For Your Information", "Forward", "No Response Necessary", "Read", "Reply", "Reply to All", "Review"];
export const QUICK_FLAGS = ["Today", "Tomorrow", "This Week", "Next Week", "No Date"];
export const DEFAULT_QUICK_STEPS = ["To Manager", "Team Email", "Done", "Reply & Delete"];
export const QS_ACTIONS = [
  "Move to folder", "Copy to folder", "Delete message", "Mark as read", "Mark as unread", "Categorize message", "Clear categories",
  "Flag message", "Clear flags on message", "Mark complete", "Forward", "Reply", "Reply All", "New Message", "Create a task with text of message",
];
export const ACTIVITY_TYPES = ["Phone Call", "Email", "Meeting", "Note", "Document", "Task"];
export const PERMISSIONS = ["Can view when I'm busy", "Can view titles and locations", "Can view all details", "Can edit", "Delegate"];

/* ------------------------------------------------------------------ */
/* Accessors                                                           */
/* ------------------------------------------------------------------ */

export const todayOf = (doc: OutlookDoc) => dateOf(doc.now ?? NOW);
export const nowOf = (doc: OutlookDoc) => doc.now ?? NOW;
export const moduleOf = (doc: OutlookDoc): OlModule => doc.module ?? "mail";

export function allFolders(doc: OutlookDoc): OlFolder[] {
  return [...SYSTEM_FOLDERS, ...(doc.folders ?? [])];
}
export function folderById(doc: OutlookDoc, id?: string): OlFolder | undefined {
  return allFolders(doc).find((f) => f.id === id);
}
export function folderByName(doc: OutlookDoc, name: string): OlFolder | undefined {
  const n = String(name ?? "").replace(/ /g, " ").trim().toLowerCase();
  return allFolders(doc).find((f) => f.name.toLowerCase() === n) ?? allFolders(doc).find((f) => f.id.toLowerCase() === n);
}
export const currentFolder = (doc: OutlookDoc) => doc.folder ?? "inbox";

/** Folders in tree order with depth, for the folder pane and folder pickers. */
export function folderTree(doc: OutlookDoc): { folder: OlFolder; depth: number }[] {
  const custom = doc.folders ?? [];
  const out: { folder: OlFolder; depth: number }[] = [];
  const kids = (parent: string | undefined) =>
    custom.filter((f) => (f.parent ?? "") === (parent ?? "")).sort((a, b) => a.name.localeCompare(b.name));
  const walk = (f: OlFolder, depth: number) => {
    out.push({ folder: f, depth });
    for (const k of kids(f.id)) walk(k, depth + 1);
  };
  for (const s of SYSTEM_FOLDERS) walk(s, 0);
  for (const k of kids(undefined)) walk(k, 0);
  return out;
}

export function slug(s: string): string {
  return "f-" + s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function nextId(items: { id: string }[] | undefined, prefix: string): string {
  let n = 0;
  for (const it of items ?? []) {
    const m = new RegExp(`^${prefix}(\\d+)$`).exec(it.id);
    if (m) n = Math.max(n, +m[1]);
  }
  return `${prefix}${n + 1}`;
}

export function catName(doc: OutlookDoc, slot: string): string {
  return doc.categoryNames?.[slot] ?? slot;
}
export function catSlot(doc: OutlookDoc, nameOrSlot: string): string | undefined {
  const n = String(nameOrSlot ?? "").trim().toLowerCase();
  return CATEGORY_SLOTS.find((s) => s.toLowerCase() === n || catName(doc, s).toLowerCase() === n || s.split(" ")[0].toLowerCase() === n);
}

/** Everyone the mailbox knows: account, manager, contacts, directory, and past correspondents. */
export function people(doc: OutlookDoc): OlPerson[] {
  const seen = new Map<string, OlPerson>();
  const add = (p?: OlPerson) => {
    if (!p?.email) return;
    const k = p.email.toLowerCase();
    if (!seen.has(k)) seen.set(k, { name: p.name || p.email, email: p.email });
  };
  add(doc.account);
  add(doc.manager);
  for (const c of doc.contacts ?? []) if (c.email) add({ name: c.name, email: c.email });
  for (const p of doc.directory ?? []) add(p);
  for (const m of doc.messages) {
    add(m.from);
    (m.to ?? []).forEach(add);
    (m.cc ?? []).forEach(add);
  }
  return Array.from(seen.values());
}

export function personFor(doc: OutlookDoc, token: string): OlPerson {
  const t = token.trim();
  const g = (doc.groups ?? []).find((x) => x.name.toLowerCase() === t.toLowerCase());
  if (g) return { name: g.name, email: "" };
  const all = people(doc);
  const p = all.find((x) => x.email.toLowerCase() === t.toLowerCase()) ?? all.find((x) => x.name.toLowerCase() === t.toLowerCase());
  return p ?? { name: t, email: t };
}

export function tokensOf(v: string): string[] {
  return String(v ?? "")
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
/** Canonical recipients string: unique, sorted case-insensitively, "; " joined. */
export function joinTokens(list: string[] | undefined): string {
  const uniq: string[] = [];
  for (const t of list ?? []) {
    const s = t.trim();
    if (s && !uniq.some((u) => u.toLowerCase() === s.toLowerCase())) uniq.push(s);
  }
  return uniq.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join("; ");
}

export function sigText(doc: OutlookDoc, name?: string): string {
  if (!name) return "";
  return (doc.signatures ?? []).find((s) => s.name === name)?.text ?? "";
}

/* ------------------------------------------------------------------ */
/* Selection                                                           */
/* ------------------------------------------------------------------ */

export function selKeys(sel: string): string[] {
  return String(sel ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
export function selIds(sel: string, prefix: string): string[] {
  return selKeys(sel)
    .filter((k) => k.startsWith(prefix + ":"))
    .map((k) => k.slice(prefix.length + 1).split("@")[0].split(".")[0]);
}
export function selMessages(doc: OutlookDoc, ui: SimUi): OlMessage[] {
  const ids = selIds(ui.selection, "msg");
  return doc.messages.filter((m) => ids.includes(m.id));
}
export function selMessage(doc: OutlookDoc, ui: SimUi): OlMessage | undefined {
  return selMessages(doc, ui)[0];
}
export function selEvent(doc: OutlookDoc, ui: SimUi): { evt: OlEvent; date?: string } | undefined {
  const k = selKeys(ui.selection).find((x) => x.startsWith("evt:"));
  if (!k) return undefined;
  const [id, date] = k.slice(4).split("@");
  const evt = (doc.events ?? []).find((e) => e.id === id);
  return evt ? { evt, date } : undefined;
}

export function selectionExists(doc: OutlookDoc, sel: string): boolean {
  if (!sel) return true;
  return selKeys(sel).every((k) => {
    if (k.startsWith("msg:")) return doc.messages.some((m) => m.id === k.slice(4));
    if (k.startsWith("evt:")) {
      const [id, date] = k.slice(4).split("@");
      const e = (doc.events ?? []).find((x) => x.id === id);
      if (!e) return false;
      if (!date) return true;
      return e.recurrence ? occursOn(e, date) : dateOf(e.start) === date;
    }
    if (k.startsWith("contact:")) return (doc.contacts ?? []).some((c) => c.id === k.slice(8).split(".")[0]);
    if (k.startsWith("group:")) return (doc.groups ?? []).some((g) => g.id === k.slice(6));
    if (k.startsWith("task:")) return (doc.tasks ?? []).some((t) => t.id === k.slice(5));
    if (k.startsWith("folder:")) return Boolean(folderById(doc, k.slice(7)));
    if (k.startsWith("slot:")) return true;
    if (k === "compose" || k.startsWith("compose.")) return Boolean(doc.compose);
    if (k.startsWith("event.")) return Boolean(doc.form && (doc.form.kind === "appointment" || doc.form.kind === "meeting"));
    if (k === "form.notes") return Boolean(doc.form && (doc.form.kind === "contact" || doc.form.kind === "task"));
    if (k === "task.to") return doc.form?.kind === "task";
    if (k === "group.members") return doc.form?.kind === "group";
    if (k === "tasks.new" || k === "signatures" || k === "autoReplies") return true;
    return false;
  });
}

/* ------------------------------------------------------------------ */
/* Mail views                                                          */
/* ------------------------------------------------------------------ */

export function messagesIn(doc: OutlookDoc, folder: string): OlMessage[] {
  return doc.messages.filter((m) => m.folder === folder);
}
export function unreadIn(doc: OutlookDoc, folder: string): number {
  if (folder === "sent" || folder === "outbox") return 0;
  if (folder === "drafts") return messagesIn(doc, folder).length;
  return messagesIn(doc, folder).filter((m) => !m.read).length;
}

function textOf(m: OlMessage) {
  return `${m.from.name} ${m.from.email} ${m.subject} ${m.body} ${(m.to ?? []).map((p) => p.name + " " + p.email).join(" ")}`.toLowerCase();
}

export function searchMatches(m: OlMessage, q: string): boolean {
  const query = q.trim().toLowerCase();
  if (!query) return true;
  const terms = query.match(/(\w+:"[^"]+"|\w+:\S+|"[^"]+"|\S+)/g) ?? [];
  return terms.every((t) => {
    const op = /^(\w+):(.*)$/.exec(t);
    const v = (op ? op[2] : t).replace(/^"|"$/g, "");
    if (op) {
      switch (op[1]) {
        case "from":
          return `${m.from.name} ${m.from.email}`.toLowerCase().includes(v);
        case "to":
          return (m.to ?? []).some((p) => `${p.name} ${p.email}`.toLowerCase().includes(v));
        case "subject":
          return m.subject.toLowerCase().includes(v);
        case "hasattachments":
          return (v === "yes" || v === "true") === Boolean(m.attachments?.length);
        case "category":
          return (m.categories ?? []).some((c) => c.toLowerCase().includes(v));
      }
    }
    return textOf(m).includes(v);
  });
}

export function filterMatches(doc: OutlookDoc, m: OlMessage, f?: string): boolean {
  switch (f) {
    case "Unread":
      return !m.read;
    case "Flagged":
      return Boolean(m.flag && !m.flag.complete);
    case "Has Attachments":
      return Boolean(m.attachments?.length);
    case "Important":
      return m.importance === "High";
    case "Categorized":
      return Boolean(m.categories?.length);
    case "Mentioned":
      return m.body.includes("@" + doc.account.name.split(" ")[0]);
    case "This Week":
      return dateOf(m.date) >= weekStart(todayOf(doc));
    case "Sent To: Me":
      return (m.to ?? []).some((p) => p.email.toLowerCase() === doc.account.email.toLowerCase());
    default:
      return true;
  }
}

export function sortMessages(doc: OutlookDoc, list: OlMessage[]): OlMessage[] {
  const a = doc.arrange ?? "Date";
  const dir = doc.sortAsc ? 1 : -1;
  const key = (m: OlMessage): string | number => {
    switch (a) {
      case "From":
        return m.from.name.toLowerCase();
      case "To":
        return (m.to?.[0]?.name ?? "").toLowerCase();
      case "Subject":
        return m.subject.replace(/^(re|fw|fwd):\s*/i, "").toLowerCase();
      case "Size":
        return m.body.length + (m.attachments?.length ?? 0) * 50000;
      case "Importance":
        return m.importance === "High" ? 2 : m.importance === "Low" ? 0 : 1;
      case "Categories":
        return (m.categories?.[0] ?? "~").toLowerCase();
      case "Flag: Due Date":
      case "Flag: Start Date":
        return m.flag && !m.flag.complete ? toMs(m.flag.due ?? m.flag.start ?? "2099-01-01") : toMs("2099-12-31");
      case "Attachments":
        return m.attachments?.length ? 1 : 0;
      default:
        return toMs(m.date);
    }
  };
  const textual = ["From", "To", "Subject", "Categories"].includes(a);
  const d = textual ? -dir : dir;
  return list.slice().sort((x, y) => {
    if (x.pinned !== y.pinned) return x.pinned ? -1 : 1;
    const kx = key(x), ky = key(y);
    if (kx === ky) return toMs(y.date) - toMs(x.date);
    return (kx < ky ? -1 : 1) * d;
  });
}

/** What the message list shows right now. */
export function visibleMessages(doc: OutlookDoc): OlMessage[] {
  const folder = currentFolder(doc);
  let list: OlMessage[];
  if (doc.search) {
    const scope = doc.searchScope ?? "Current Mailbox";
    list = doc.messages.filter((m) => (scope === "Current Folder" ? m.folder === folder : m.folder !== "outbox") && searchMatches(m, doc.search!));
  } else {
    list = messagesIn(doc, folder);
    if (folder === "inbox" && doc.focused) list = list.filter((m) => (doc.focusTab === "Other" ? m.other : !m.other));
  }
  list = list.filter((m) => filterMatches(doc, m, doc.filter));
  return sortMessages(doc, list);
}

export function conversationKey(m: OlMessage): string {
  return m.conversation ?? m.subject.replace(/^((re|fw|fwd):\s*)+/i, "").trim().toLowerCase();
}

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

export function recurrenceText(r?: OlRecurrence | null): string {
  if (!r) return "";
  const n = r.interval && r.interval > 1 ? r.interval : 1;
  const days = (r.days ?? []).slice().sort((a, b) => a - b).map((d) => DAY_NAMES[d]);
  switch (r.freq) {
    case "daily":
      if (r.weekdays) return "Every weekday";
      return n === 1 ? "Daily" : `Every ${n} days`;
    case "weekly":
      if (days.length === 5 && !days.includes("Sunday") && !days.includes("Saturday") && n === 1) return "Every weekday";
      return n === 1 ? `Weekly on ${days.join(", ")}` : `Every ${n} weeks on ${days.join(", ")}`;
    case "monthly":
      return n === 1 ? `Monthly on day ${r.day ?? 1}` : `Every ${n} months on day ${r.day ?? 1}`;
    case "yearly":
      return "Yearly";
  }
  return "";
}

/** Inverse of recurrenceText for the canonical strings it produces. */
export function recurrenceFromText(t: string | undefined, start: string): OlRecurrence | null {
  const v = String(t ?? "").trim();
  if (!v || v === "None") return null;
  const dayIdx = (list: string) => list.split(/,\s*|\s+and\s+/).map((d) => DAY_NAMES.findIndex((n) => n.toLowerCase() === d.trim().toLowerCase())).filter((i) => i >= 0);
  let m: RegExpExecArray | null;
  if (/^daily$/i.test(v)) return { freq: "daily", interval: 1 };
  if ((m = /^every (\d+) days$/i.exec(v))) return { freq: "daily", interval: +m[1] };
  if (/^every weekday$/i.test(v)) return { freq: "daily", weekdays: true };
  if ((m = /^weekly on (.+)$/i.exec(v))) return { freq: "weekly", interval: 1, days: dayIdx(m[1]) };
  if ((m = /^every (\d+) weeks on (.+)$/i.exec(v))) return { freq: "weekly", interval: +m[1], days: dayIdx(m[2]) };
  if ((m = /^monthly on day (\d+)$/i.exec(v))) return { freq: "monthly", interval: 1, day: +m[1] };
  if ((m = /^every (\d+) months on day (\d+)$/i.exec(v))) return { freq: "monthly", interval: +m[1], day: +m[2] };
  if (/^yearly$/i.test(v)) return { freq: "yearly" };
  return { freq: "weekly", interval: 1, days: [dow(start)] };
}

export function recurrenceEndText(r?: OlRecurrence | null): string {
  if (!r) return "";
  if (r.count) return `End after ${r.count} occurrences`;
  if (r.until) return `End by ${fmtDate(r.until)}`;
  return "No end date";
}

export function occursOn(e: OlEvent, date: string): boolean {
  const start = dateOf(e.start);
  if (!e.recurrence) return date >= start && date <= dateOf(addMinutes(e.end, -1));
  if (date < start) return false;
  if ((e.exceptions ?? []).includes(date)) return false;
  const r = e.recurrence;
  if (r.until && date > r.until) return false;
  const n = r.interval && r.interval > 1 ? r.interval : 1;
  const days = Math.round((toMs(date) - toMs(start)) / 86400000);
  let ok = false;
  let index = 0;
  switch (r.freq) {
    case "daily":
      ok = r.weekdays ? dow(date) > 0 && dow(date) < 6 : days % n === 0;
      index = r.weekdays ? countWeekdays(start, date) : Math.floor(days / n);
      break;
    case "weekly": {
      const list = r.days?.length ? r.days : [dow(start)];
      const weeks = Math.floor((toMs(weekStart(date)) - toMs(weekStart(start))) / (7 * 86400000));
      ok = list.includes(dow(date)) && weeks % n === 0;
      index = Math.floor(weeks / n) * list.length + list.filter((d) => d < dow(date)).length;
      break;
    }
    case "monthly":
      ok = +date.slice(8, 10) === (r.day ?? +start.slice(8, 10));
      index = (+date.slice(0, 4) - +start.slice(0, 4)) * 12 + (+date.slice(5, 7) - +start.slice(5, 7));
      break;
    case "yearly":
      ok = date.slice(5) === start.slice(5);
      index = +date.slice(0, 4) - +start.slice(0, 4);
      break;
  }
  if (ok && r.count && index >= r.count) return false;
  return ok;
}

function countWeekdays(a: string, b: string): number {
  let n = 0;
  for (let d = a; d < b; d = addDays(d, 1)) if (dow(d) > 0 && dow(d) < 6) n++;
  return n;
}

export type Occurrence = { evt: OlEvent; date: string; start: string; end: string; key: string };

/** Every item (and occurrence) that touches [from, to] (dates, inclusive). */
export function occurrences(doc: OutlookDoc, from: string, to: string, includeHidden = false): Occurrence[] {
  const out: Occurrence[] = [];
  const hidden = new Set((doc.calendars ?? []).filter((c) => !c.shown).map((c) => c.name));
  for (const e of doc.events ?? []) {
    if (e.calendar && hidden.has(e.calendar) && !includeHidden) continue;
    if (!e.recurrence) {
      if (dateOf(e.start) <= to && dateOf(addMinutes(e.end, e.allDay ? -1 : 0)) >= from)
        out.push({ evt: e, date: dateOf(e.start), start: e.start, end: e.end, key: `evt:${e.id}` });
      continue;
    }
    const len = minutesBetween(e.start, e.end);
    for (let d = from; d <= to; d = addDays(d, 1)) {
      if (occursOn(e, d)) {
        const s = at(d, timeOf(e.start));
        out.push({ evt: e, date: d, start: s, end: addMinutes(s, len), key: `evt:${e.id}@${d}` });
      }
    }
  }
  return out.sort((a, b) => toMs(a.start) - toMs(b.start));
}

/** My own calendar items that overlap [start, end), excluding one item. */
export function conflictsWith(doc: OutlookDoc, start: string, end: string, exceptId?: string): Occurrence[] {
  return occurrences(doc, dateOf(start), dateOf(end))
    .filter((o) => o.evt.id !== exceptId && !o.evt.allDay && !o.evt.calendar && (o.evt.showAs ?? "Busy") !== "Free")
    .filter((o) => toMs(o.start) < toMs(end) && toMs(o.end) > toMs(start));
}

/**
 * Busy blocks for one attendee on one day (Scheduling Assistant). Someone whose
 * free/busy you can see is also busy during the meetings on your calendar that
 * they attend (the Tuesday status meeting shows on Jordan's row too).
 * `exceptId` leaves out the meeting being edited, so it never conflicts with itself.
 */
export function busyFor(doc: OutlookDoc, email: string, date: string, exceptId?: string): { start: string; end: string; status: OlShowAs; title?: string }[] {
  const e = email.toLowerCase();
  const mine = occurrences(doc, date, date).filter((o) => o.evt.id !== exceptId && !o.evt.calendar && !o.evt.allDay);
  if (e === doc.account.email.toLowerCase()) {
    return mine.map((o) => ({ start: o.start, end: o.end, status: o.evt.showAs ?? "Busy", title: o.evt.title }));
  }
  if (!hasFreeBusy(doc, email)) return [];
  const list = Object.entries(doc.freeBusy ?? {}).find(([k]) => k.toLowerCase() === e)?.[1] ?? [];
  const shared = mine
    .filter((o) => o.evt.meeting && [o.evt.organizer, ...(o.evt.required ?? []), ...(o.evt.optional ?? [])].some((p) => p?.email.toLowerCase() === e))
    .map((o) => ({ start: o.start, end: o.end, status: "Busy" as OlShowAs, title: o.evt.title }));
  return [...list.filter((b) => dateOf(b.start) === date).map((b) => ({ start: b.start, end: b.end, status: b.status ?? "Busy", title: b.title })), ...shared].sort((a, b) => toMs(a.start) - toMs(b.start));
}
export function hasFreeBusy(doc: OutlookDoc, email: string): boolean {
  const e = email.toLowerCase();
  return e === doc.account.email.toLowerCase() || Object.keys(doc.freeBusy ?? {}).some((k) => k.toLowerCase() === e);
}

/* ------------------------------------------------------------------ */
/* Serialization (type targets for text-heavy dialogs)                 */
/* ------------------------------------------------------------------ */

const clean = (s: string) => String(s ?? "").replace(/\|/g, "/").trim();

export function serializeSignatures(sigs: { name: string; text: string }[], defNew?: string, defReply?: string): string {
  const parts = [`New messages: ${defNew || "(none)"}`, `Replies/forwards: ${defReply || "(none)"}`];
  for (const s of sigs) parts.push(`[${clean(s.name)}] ${clean(s.text)}`);
  return parts.join(" | ");
}
export function parseSignatures(v: string): { sigs: { name: string; text: string }[]; defNew?: string; defReply?: string } {
  const parts = String(v).split(" | ");
  const out: { name: string; text: string }[] = [];
  let defNew: string | undefined, defReply: string | undefined;
  for (const p of parts) {
    const n = /^New messages: ([\s\S]*)$/.exec(p);
    const r = /^Replies\/forwards: ([\s\S]*)$/.exec(p);
    const s = /^\[([^\]]*)\] ?([\s\S]*)$/.exec(p);
    if (n) defNew = n[1] === "(none)" ? undefined : n[1];
    else if (r) defReply = r[1] === "(none)" ? undefined : r[1];
    else if (s) out.push({ name: s[1], text: s[2] });
  }
  return { sigs: out, defNew, defReply };
}

export type AutoReplies = NonNullable<OutlookDoc["autoReplies"]>;
export function serializeAutoReplies(a: AutoReplies): string {
  const range = a.start && a.end ? `Time range: ${fmtDate(a.start)} ${fmtTime(a.start)} to ${fmtDate(a.end)} ${fmtTime(a.end)}` : "Time range: off";
  const outside = a.outsideOn ? `Outside (${a.outsideScope ?? "Anyone outside my organization"}): ${clean(a.outside ?? "")}` : "Outside: off";
  return [a.on ? "Send automatic replies" : "Do not send automatic replies", range, `Inside: ${clean(a.inside ?? "")}`, outside].join(" | ");
}
export function parseAutoReplies(v: string): AutoReplies {
  const parts = String(v).split(" | ");
  const a: AutoReplies = { on: parts[0] === "Send automatic replies" };
  const tr = /^Time range: (\S+) (\d+:\d+ [AP]M) to (\S+) (\d+:\d+ [AP]M)$/.exec(parts[1] ?? "");
  if (tr) {
    const sd = parseUsDate(tr[1]), st = parseTime(tr[2]), ed = parseUsDate(tr[3]), et = parseTime(tr[4]);
    if (sd && st && ed && et) {
      a.start = `${sd}T${st}`;
      a.end = `${ed}T${et}`;
    }
  }
  const ins = /^Inside: ([\s\S]*)$/.exec(parts[2] ?? "");
  a.inside = ins ? ins[1] : "";
  const out = /^Outside \(([^)]*)\): ([\s\S]*)$/.exec(parts.slice(3).join(" | "));
  if (out) {
    a.outsideOn = true;
    a.outsideScope = out[1];
    a.outside = out[2];
  }
  return a;
}

export function serializeActivity(a: { type: string; date: string; summary: string; next?: string; due?: string }): string {
  return `${a.type} | ${fmtDate(a.date)} | ${clean(a.summary)} | Next step: ${clean(a.next ?? "")} | Follow-up: ${a.due ? fmtDate(a.due) : "none"}`;
}
export function parseActivity(v: string): Omit<OlActivity, "id"> {
  const p = String(v).split(" | ");
  const date = parseUsDate(p[1] ?? "") ?? TODAY;
  const next = (p[3] ?? "").replace(/^Next step: ?/, "");
  const dueRaw = (p[4] ?? "").replace(/^Follow-up: ?/, "");
  return { type: p[0] || "Note", date, summary: p[2] ?? "", next: next || undefined, due: parseUsDate(dueRaw) ?? undefined };
}

/* ------------------------------------------------------------------ */
/* Builders                                                            */
/* ------------------------------------------------------------------ */

function personLine(list?: OlPerson[]) {
  return (list ?? []).map((p) => p.name).join("; ");
}

export function quoteOf(m: OlMessage): string {
  const lines = [
    `From: ${m.from.name} <${m.from.email}>`,
    `Sent: ${fmtLong(m.date)} ${fmtTime(m.date)}`,
    `To: ${personLine(m.to)}`,
  ];
  if (m.cc?.length) lines.push(`Cc: ${personLine(m.cc)}`);
  lines.push(`Subject: ${m.subject}`, "", m.body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1"));
  return lines.join("\n");
}

function prefixed(prefix: string, subject: string) {
  const re = new RegExp(`^${prefix}:\\s*`, "i");
  return re.test(subject) ? subject : `${prefix}: ${subject}`;
}

function startBody(doc: OutlookDoc, sig?: string) {
  const t = sigText(doc, sig);
  return t ? `\n\n${t}` : "";
}

export function composeFor(doc: OutlookDoc, mode: OlCompose["mode"], m?: OlMessage): OlCompose {
  const id = `c${(doc.flags?.composeSeq as number | undefined) ?? 0}-${mode}-${m?.id ?? "new"}`;
  const me = doc.account.email.toLowerCase();
  if (!m || mode === "new") {
    return { id, mode: "new", to: [], cc: [], bcc: [], subject: "", body: startBody(doc, doc.defaultNew), attachments: [] };
  }
  if (mode === "forward") {
    return {
      id, mode, inline: true, of: m.id, to: [], cc: [], bcc: [], subject: prefixed("FW", m.subject), body: startBody(doc, doc.defaultReply),
      quoted: quoteOf(m), attachments: (m.attachments ?? []).map((a) => ({ ...a })),
    };
  }
  const to = [m.from.email];
  const cc =
    mode === "replyAll"
      ? [...(m.to ?? []), ...(m.cc ?? [])].map((p) => p.email).filter((e) => e.toLowerCase() !== me && e.toLowerCase() !== m.from.email.toLowerCase())
      : [];
  return { id, mode, inline: true, of: m.id, to, cc, bcc: [], subject: prefixed("RE", m.subject), body: startBody(doc, doc.defaultReply), quoted: quoteOf(m), attachments: [] };
}

function bumpCompose(doc: OutlookDoc) {
  doc.flags = { ...(doc.flags ?? {}), composeSeq: ((doc.flags?.composeSeq as number | undefined) ?? 0) + 1 };
}

function tick(doc: OutlookDoc): string {
  const n = addMinutes(nowOf(doc), 1);
  doc.now = n;
  return n;
}

function nextSlot(doc: OutlookDoc): string {
  const base = doc.calDate && doc.calDate !== todayOf(doc) ? at(doc.calDate, "09:00") : nowOf(doc);
  const ms = toMs(base);
  const half = 30 * 60000;
  return addMinutes(base, Math.round((Math.ceil(ms / half) * half - ms) / 60000));
}

export function formFor(doc: OutlookDoc, kind: OlForm["kind"], init?: Partial<OlFormData>, id?: string): OlForm {
  if (kind === "appointment" || kind === "meeting") {
    const start = init?.start ?? nextSlot(doc);
    return {
      kind,
      id,
      view: "main",
      data: { title: "", location: "", start, end: addMinutes(start, 30), allDay: false, required: [], optional: [], body: "", reminder: "15 minutes", showAs: "Busy", recurrence: null, teams: false, ...init },
    };
  }
  if (kind === "contact") return { kind, id, view: "main", data: { name: "", company: "", jobTitle: "", email: "", phone: "", mobile: "", address: "", notes: "", ...init } };
  if (kind === "task")
    return { kind, id, view: "main", data: { subject: "", startDate: "", dueDate: "", status: "Not Started", priority: "Normal", percent: 0, reminderOn: false, reminderDate: "", reminderTime: "8:00 AM", notes: "", assignTo: [], ...init } };
  return { kind, id, view: "main", data: { name: "", members: [], notes: "", ...init } };
}

function eventForm(doc: OutlookDoc, e: OlEvent): OlForm {
  return formFor(
    doc,
    e.meeting ? "meeting" : "appointment",
    {
      title: e.title, location: e.location ?? "", start: e.start, end: e.end, allDay: e.allDay, required: (e.required ?? []).map((p) => p.email),
      optional: (e.optional ?? []).map((p) => p.email), body: e.body ?? "", reminder: e.reminder ?? "15 minutes", showAs: e.showAs ?? "Busy",
      recurrence: e.recurrence ?? null, teams: e.teams, private: e.private, categories: e.categories,
    },
    e.id,
  );
}

/* ------------------------------------------------------------------ */
/* Apply helpers                                                       */
/* ------------------------------------------------------------------ */

function firstVisibleKey(doc: OutlookDoc): string {
  const m = visibleMessages(doc)[0];
  return m ? `msg:${m.id}` : "";
}

/** After removing messages from the list, select the next one, like Outlook. */
function nextAfter(before: OlMessage[], removed: string[], doc: OutlookDoc): string {
  const after = visibleMessages(doc);
  const idx = before.findIndex((m) => removed.includes(m.id));
  for (let i = idx; i < before.length && i >= 0; i++) if (!removed.includes(before[i].id) && after.some((m) => m.id === before[i].id)) return `msg:${before[i].id}`;
  for (let i = idx - 1; i >= 0; i--) if (!removed.includes(before[i].id) && after.some((m) => m.id === before[i].id)) return `msg:${before[i].id}`;
  return after[0] ? `msg:${after[0].id}` : "";
}

function moveMessages(doc: OutlookDoc, ids: string[], folder: string) {
  for (const m of doc.messages) if (ids.includes(m.id)) m.folder = folder;
}

function setFlag(doc: OutlookDoc, target: { flag?: OlFlag | null }, value: string) {
  const today = todayOf(doc);
  if (value === "Clear Flag" || value === "Clear Flag & Mark Complete") target.flag = null;
  else if (value === "Mark Complete") target.flag = { ...(target.flag ?? {}), complete: true };
  else if (value === "No Date") target.flag = { label: "No Date" };
  else if (value === "Flag Message") target.flag = { label: "Today", ...flagDates("Today", today) };
  else target.flag = { label: value, ...flagDates(value, today) };
}

function toggleCategory(list: string[] | undefined, slot: string): string[] {
  const l = list ?? [];
  return l.includes(slot) ? l.filter((c) => c !== slot) : [...l, slot];
}

function sentCopy(doc: OutlookDoc, to: OlPerson[], subject: string, body: string, extra: Partial<OlMessage> = {}): OlMessage {
  const m: OlMessage = { id: nextId(doc.messages, "m"), folder: "sent", from: doc.account, to, subject, body, date: tick(doc), read: true, ...extra };
  doc.messages.push(m);
  return m;
}

function runRule(doc: OutlookDoc, r: OlRule, msgs: OlMessage[]): number {
  let n = 0;
  for (const m of msgs) {
    if (r.from && m.from.email.toLowerCase() !== r.from.toLowerCase() && !m.from.email.toLowerCase().endsWith(r.from.toLowerCase().replace(/^\*?/, ""))) continue;
    if (r.subject && !m.subject.toLowerCase().includes(r.subject.toLowerCase())) continue;
    if (r.sentToMe && !(m.to ?? []).some((p) => p.email.toLowerCase() === doc.account.email.toLowerCase())) continue;
    if (!r.from && !r.subject && !r.sentToMe) continue;
    n++;
    if (r.category) m.categories = Array.from(new Set([...(m.categories ?? []), r.category]));
    if (r.flag) setFlag(doc, m, r.flag);
    if (r.moveTo) {
      const f = folderByName(doc, r.moveTo);
      if (f) m.folder = f.id;
    }
  }
  return n;
}

function respondInvite(doc: OutlookDoc, m: OlMessage, kind: "Accepted" | "Tentative" | "Declined") {
  const inv = m.invite!;
  inv.response = kind;
  const events = (doc.events = doc.events ?? []);
  if (kind === "Declined") {
    if (inv.eventId) doc.events = events.filter((e) => e.id !== inv.eventId);
  } else {
    let e = inv.eventId ? events.find((x) => x.id === inv.eventId) : undefined;
    if (!e) {
      e = {
        id: nextId(events, "e"), title: inv.title, start: inv.start, end: inv.end, allDay: inv.allDay, location: inv.location, organizer: inv.organizer,
        required: inv.required, optional: inv.optional, meeting: true, teams: inv.teams, body: inv.body, recurrence: inv.recurrence ?? null, reminder: "15 minutes",
      };
      events.push(e);
      inv.eventId = e.id;
    }
    e.response = kind;
    e.showAs = kind === "Tentative" ? "Tentative" : "Busy";
  }
}

function formEvent(doc: OutlookDoc, f: OlForm, values: Record<string, SimValue>): OlEvent {
  const d = f.data;
  const sv = (k: string) => (values[k] === undefined ? undefined : String(values[k]));
  const allDay = values.allDay !== undefined ? Boolean(values.allDay) : Boolean(d.allDay);
  // Like the form, moving the start keeps the duration unless an end is given.
  const oldStart = d.start ?? nextSlot(doc);
  const oldEnd = d.end && toMs(d.end) > toMs(oldStart) ? d.end : addMinutes(oldStart, 30);
  const daySpan = Math.max(0, Math.round((toMs(dateOf(oldEnd)) - toMs(dateOf(oldStart))) / 86400000) - (d.allDay ? 1 : 0));
  const sd = parseUsDate(sv("startDate") ?? "") ?? dateOf(oldStart);
  const st = parseTime(sv("startTime") ?? "") ?? timeOf(oldStart);
  const edGiven = parseUsDate(sv("endDate") ?? "");
  const etGiven = parseTime(sv("endTime") ?? "");
  const shifted = addMinutes(`${sd}T${st}`, d.allDay ? 30 : minutesBetween(oldStart, oldEnd));
  const ed = edGiven ?? (allDay ? addDays(sd, daySpan) : etGiven ? addDays(sd, d.allDay ? 0 : daySpan) : dateOf(shifted));
  const et = etGiven ?? timeOf(shifted);
  let start = allDay ? `${sd}T00:00` : `${sd}T${st}`;
  let end = allDay ? `${addDays(ed, 1)}T00:00` : `${ed}T${et}`;
  if (toMs(end) <= toMs(start)) end = allDay ? `${addDays(sd, 1)}T00:00` : addMinutes(start, 30);
  if (allDay && toMs(end) <= toMs(start)) start = `${sd}T00:00`;
  const req = values.required !== undefined ? tokensOf(String(values.required)) : d.required ?? [];
  const opt = values.optional !== undefined ? tokensOf(String(values.optional)) : d.optional ?? [];
  const meeting = f.kind === "meeting" || req.length > 0 || opt.length > 0;
  const teams = values.teams !== undefined ? Boolean(values.teams) : Boolean(d.teams);
  const location = sv("location") ?? d.location ?? "";
  const recurrence = d.recurrence ?? recurrenceFromText(sv("recurrence"), start);
  if (recurrence?.freq === "weekly" && recurrence.days?.length && !recurrence.days.includes(dow(start))) {
    // Outlook moves the first occurrence to the next day in the pattern.
    const len = minutesBetween(start, end);
    let n = 1;
    while (n < 7 && !recurrence.days.includes(dow(addDays(start, n)))) n++;
    start = `${addDays(start, n)}T${timeOf(start)}`;
    end = addMinutes(start, len);
  }
  return {
    id: f.id ?? nextId(doc.events, "e"),
    title: sv("title") ?? d.title ?? "",
    start,
    end,
    allDay,
    location: location || (teams ? "Microsoft Teams Meeting" : ""),
    body: sv("body") ?? d.body ?? "",
    meeting,
    organizer: meeting ? doc.account : undefined,
    required: meeting ? req.map((t) => personFor(doc, t)) : undefined,
    optional: meeting && opt.length ? opt.map((t) => personFor(doc, t)) : undefined,
    teams,
    reminder: sv("reminder") ?? d.reminder ?? "15 minutes",
    // Checking All day event switches Show As to Free (and back to Busy), as in Outlook.
    showAs:
      (sv("showAs") as OlShowAs | undefined) ??
      (values.allDay !== undefined && allDay !== Boolean(d.allDay) ? (allDay ? "Free" : "Busy") : d.showAs ?? (allDay ? "Free" : "Busy")),
    recurrence,
    categories: d.categories,
    private: values.private !== undefined ? Boolean(values.private) : d.private,
  };
}

function parseRecurrence(v: string, start: string): OlRecurrence | null {
  let o: Record<string, SimValue>;
  try {
    o = JSON.parse(v);
  } catch {
    return null;
  }
  if (o.remove) return null;
  const pattern = String(o.pattern ?? "Weekly");
  const interval = Math.max(1, Number(o.every ?? 1) || 1);
  const r: OlRecurrence = { freq: pattern === "Daily" ? "daily" : pattern === "Monthly" ? "monthly" : pattern === "Yearly" ? "yearly" : "weekly", interval };
  if (r.freq === "daily" && o.weekdays) r.weekdays = true;
  if (r.freq === "weekly") {
    const keys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    r.days = keys.map((k, i) => (o[k] ? i : -1)).filter((i) => i >= 0);
    if (!r.days.length) r.days = [dow(start)];
  }
  if (r.freq === "monthly") r.day = Number(o.monthDay ?? +dateOf(start).slice(8, 10)) || 1;
  if (o.range === "End after") r.count = Math.max(1, Number(o.count ?? 10) || 10);
  if (o.range === "End by") r.until = parseUsDate(String(o.until ?? "")) ?? undefined;
  return r;
}

/* ------------------------------------------------------------------ */
/* Built-in behavior                                                   */
/* ------------------------------------------------------------------ */

type Res = { doc: OutlookDoc; ui?: Partial<SimUi> };

export function applyOutlook(input: OutlookDoc, c: SimCommit, ui: SimUi): Res {
  if (c.kind === "dialog" && c.id === "file.saveAs") {
    const d = clone(input);
    d.flags = { ...(d.flags ?? {}), savedAs: `${String(c.values.name ?? "Message")}`, lastAction: "saved" };
    return { doc: d };
  }
  if (!(c.kind === "command" && (c.id === "file.new" || c.id === "file.open"))) {
    const common = applyCommonCommit(input, c, ".msg");
    if (common) return { doc: common };
  }
  const doc = clone(input);
  doc.messages = doc.messages ?? [];
  if (c.kind === "type") return applyType(doc, c.target, c.value);
  if (c.kind === "dialog") return applyDialog(doc, c.id, c.values, ui);
  if (c.kind === "click") {
    doc.flags = { ...(doc.flags ?? {}), clicked: c.target };
    return { doc };
  }
  return applyCommand(doc, c.id, c.value, ui);
}

function applyType(doc: OutlookDoc, target: string, value: string): Res {
  const comp = doc.compose;
  switch (target) {
    case "compose.to":
    case "compose.cc":
    case "compose.bcc":
      if (comp) {
        comp[target.slice(8) as "to" | "cc" | "bcc"] = tokensOf(value);
        if (target === "compose.to") comp.prefilled = false;
      }
      return { doc };
    case "compose.subject":
      if (comp) comp.subject = value;
      return { doc };
    case "compose.body":
      if (comp) comp.body = value;
      return { doc };
    case "event.required":
    case "event.optional":
      if (doc.form) {
        doc.form.data[target === "event.required" ? "required" : "optional"] = tokensOf(value);
        if (doc.form.kind === "appointment" && tokensOf(value).length) doc.form.kind = "meeting";
      }
      return { doc };
    case "event.body":
      if (doc.form) doc.form.data.body = value;
      return { doc };
    case "form.notes":
      if (doc.form) doc.form.data.notes = value;
      return { doc };
    case "task.to":
      if (doc.form) {
        doc.form.data.assignTo = tokensOf(value);
        doc.form.data.assign = true;
      }
      return { doc };
    case "group.members":
      if (doc.form) doc.form.data.members = tokensOf(value);
      return { doc };
    case "tasks.new": {
      if (!value.trim()) return { doc };
      const tasks = (doc.tasks = doc.tasks ?? []);
      const t: OlTask = { id: nextId(tasks, "t"), subject: value.trim(), start: todayOf(doc), due: todayOf(doc), status: "Not Started", priority: "Normal", percent: 0 };
      tasks.push(t);
      return { doc, ui: { selection: `task:${t.id}` } };
    }
    case "signatures": {
      const p = parseSignatures(value);
      doc.signatures = p.sigs;
      doc.defaultNew = p.defNew;
      doc.defaultReply = p.defReply;
      doc.dialog = null;
      return { doc };
    }
    case "autoReplies":
      doc.autoReplies = parseAutoReplies(value);
      doc.dialog = null;
      return { doc };
  }
  if (target.startsWith("folder:")) {
    const f = (doc.folders ?? []).find((x) => x.id === target.slice(7));
    if (f && value.trim()) f.name = value.trim();
    doc.renaming = null;
    return { doc };
  }
  const act = /^contact:([^.]+)\.activity$/.exec(target);
  if (act) {
    const ct = (doc.contacts ?? []).find((x) => x.id === act[1]);
    if (ct) {
      const a = parseActivity(value);
      const all = (doc.contacts ?? []).flatMap((x) => x.activities ?? []);
      ct.activities = [...(ct.activities ?? []), { id: nextId(all, "a"), ...a }];
      if (a.due) ct.flag = { label: "Follow up", start: a.due, due: a.due };
    }
    doc.dialog = null;
    return { doc, ui: { selection: `contact:${act[1]}` } };
  }
  return { doc };
}

function applyDialog(doc: OutlookDoc, id: string, v: Record<string, SimValue>, ui: SimUi): Res {
  const s = (k: string) => String(v[k] ?? "").replace(/ /g, " ").trim();
  const msgs = selMessages(doc, ui);
  switch (id) {
    case "newFolder": {
      const name = s("name");
      if (!name) return { doc };
      const parentF = folderByName(doc, s("parent"));
      const parent = parentF?.id ?? (s("parent") === doc.account.email || !s("parent") ? undefined : "inbox");
      const folders = (doc.folders = doc.folders ?? []);
      let fid = slug(name);
      while (allFolders(doc).some((f) => f.id === fid)) fid += "-2";
      folders.push({ id: fid, name, ...(parent ? { parent } : {}) });
      doc.newFolderIn = null;
      return { doc };
    }
    case "createRule": {
      const rules = (doc.rules = doc.rules ?? []);
      // Create Rule builds "From" from the selected message; Rules and Alerts types the address.
      const from = s("from") || msgs[0]?.from.email || "";
      const r: OlRule = {
        id: nextId(rules, "r"),
        name: v.fromOn ? personFor(doc, from).name : v.subjectOn ? s("subject") : "Rule",
        from: v.fromOn ? from : undefined,
        subject: v.subjectOn ? s("subject") : undefined,
        sentToMe: Boolean(v.sentToOn),
        moveTo: v.moveOn ? s("folder") : undefined,
        category: v.categoryOn ? catSlot(doc, s("category")) : undefined,
        flag: v.flagOn ? s("flag") : undefined,
        alert: Boolean(v.alert),
        sound: Boolean(v.sound),
      };
      rules.push(r);
      if (v.runNow) {
        const before = visibleMessages(doc);
        runRule(doc, r, messagesIn(doc, currentFolder(doc)));
        const gone = before.filter((m) => !visibleMessages(doc).some((x) => x.id === m.id)).map((m) => m.id);
        if (gone.length) return { doc, ui: { selection: nextAfter(before, gone, doc) } };
      }
      return { doc };
    }
    case "alwaysMove": {
      const m = msgs[0];
      if (!m) return { doc };
      const rules = (doc.rules = doc.rules ?? []);
      const r: OlRule = { id: nextId(rules, "r"), name: m.from.name || m.from.email, from: m.from.email, moveTo: s("folder") };
      rules.push(r);
      const before = visibleMessages(doc);
      runRule(doc, r, messagesIn(doc, currentFolder(doc)));
      const gone = before.filter((x) => !visibleMessages(doc).some((y) => y.id === x.id)).map((x) => x.id);
      return { doc, ui: gone.length ? { selection: nextAfter(before, gone, doc) } : undefined };
    }
    case "quickStep": {
      const qs = (doc.quickSteps = doc.quickSteps ?? []);
      const actions: { action: string; target?: string }[] = [];
      for (const i of [1, 2, 3, 4]) {
        const a = s(`action${i}`);
        if (a && a !== "(none)" && a !== "Choose an Action") actions.push({ action: a, target: s(`target${i}`) || undefined });
      }
      const name = s("name") || "My Quick Step";
      const existing = qs.find((q) => q.name.toLowerCase() === name.toLowerCase());
      if (existing) existing.actions = actions;
      else qs.push({ id: nextId(qs, "q"), name, actions, tooltip: s("tooltip") || undefined });
      return { doc };
    }
    case "customFlag": {
      const label = s("flagTo") || "Follow up";
      const start = parseUsDate(s("startDate")) ?? undefined;
      const due = parseUsDate(s("dueDate")) ?? undefined;
      const rd = parseUsDate(s("reminderDate"));
      const rt = parseTime(s("reminderTime"));
      const flag: OlFlag = { label, start, due, reminder: v.reminder && rd && rt ? `${rd}T${rt}` : undefined };
      const targets = flagTargets(doc, ui);
      for (const t of targets) t.flag = { ...flag };
      if (doc.form?.kind === "contact" && !targets.length) doc.form.data.flag = { ...flag };
      for (const t of selTasks(doc, ui)) {
        t.start = start;
        t.due = due;
      }
      return { doc };
    }
    case "colorCategories": {
      const slot = catSlot(doc, s("category"));
      if (!slot) return { doc };
      if (s("name")) doc.categoryNames = { ...(doc.categoryNames ?? {}), [slot]: s("name") };
      if (v.assign) for (const t of categoryTargets(doc, ui)) t.categories = Array.from(new Set([...(t.categories ?? []), slot]));
      return { doc };
    }
    case "attachFile": {
      const name = s("file");
      if (!name) return { doc };
      const f = (doc.files ?? []).find((x) => x.name === name);
      const att: OlAttachment = { name, size: f?.size, link: s("attachAs") === "Share link" };
      if (doc.compose) doc.compose.attachments = [...doc.compose.attachments.filter((a) => a.name !== name), att];
      return { doc };
    }
    case "scheduleSend": {
      if (!doc.compose) return { doc };
      const when = s("when");
      const today = todayOf(doc);
      let date = parseUsDate(s("date")) ?? addDays(today, 1);
      let time = parseTime(s("time")) ?? "08:00";
      if (when.startsWith("Tomorrow")) {
        date = addDays(today, 1);
        time = "08:00";
      } else if (when.startsWith("Monday")) {
        date = addDays(weekStart(today), 8);
        time = "08:00";
      }
      doc.compose.sendAt = `${date}T${time}`;
      return send(doc);
    }
    case "delayDelivery": {
      if (!doc.compose) return { doc };
      const date = parseUsDate(s("date"));
      const time = parseTime(s("time"));
      doc.compose.sendAt = v.delayOn && date && time ? `${date}T${time}` : undefined;
      return { doc };
    }
    case "proposeTime": {
      const m = msgs[0];
      if (!m?.invite) return { doc };
      const date = parseUsDate(s("date")) ?? dateOf(m.invite.start);
      const st = parseTime(s("start")) ?? timeOf(m.invite.start);
      const et = parseTime(s("end")) ?? timeOf(m.invite.end);
      const kind = s("response") === "Decline" ? "Declined" : "Tentative";
      respondInvite(doc, m, kind);
      bumpCompose(doc);
      const startIso = `${date}T${st}`;
      doc.compose = {
        id: `c${doc.flags?.composeSeq}-proposal-${m.id}`, mode: "response", to: [m.invite.organizer.email], cc: [], bcc: [], subject: `New Time Proposed: ${m.invite.title}`,
        body: "", quoted: `Proposed new time: ${fmtLong(startIso)} ${fmtTime(startIso)} - ${fmtTime(`${date}T${et}`)}\nOriginal time: ${fmtLong(m.invite.start)} ${fmtTime(m.invite.start)} - ${fmtTime(m.invite.end)}`,
        attachments: [], response: { msg: m.id, kind: "Proposal" },
      };
      return { doc };
    }
    case "shareCalendar": {
      const email = s("person");
      if (!email) return { doc };
      const p = personFor(doc, email);
      doc.shares = [...(doc.shares ?? []).filter((x) => x.email.toLowerCase() !== p.email.toLowerCase()), { email: p.email, permission: s("permission") || "Can view all details" }];
      sentCopy(doc, [p], `Sharing invitation: ${doc.account.name} - Calendar`, `${doc.account.name} would like to share a calendar with you. Permission: ${s("permission")}.`);
      return { doc };
    }
    case "emailCalendar": {
      const range = s("dateRange") || "Next 7 days";
      const days = range === "Today" ? 1 : range === "Tomorrow" ? 1 : range === "Next 30 days" ? 30 : 7;
      const from = range === "Tomorrow" ? addDays(todayOf(doc), 1) : todayOf(doc);
      const list = occurrences(doc, from, addDays(from, days - 1)).filter((o) => !o.evt.calendar);
      const detail = s("detail") || "Limited details";
      const lines = list.map((o) => `${fmtLong(o.start)}  ${o.evt.allDay ? "All day" : `${fmtTime(o.start)} - ${fmtTime(o.end)}`}  ${detail === "Availability only" ? o.evt.showAs ?? "Busy" : o.evt.title}`);
      bumpCompose(doc);
      const base = doc.compose && doc.compose.mode === "new" ? doc.compose : composeFor(doc, "new");
      doc.compose = {
        ...base,
        subject: base.subject || `${doc.account.name} Calendar`,
        quoted: [`${doc.account.name}'s Calendar (${range})`, "", ...lines].join("\n"),
        attachments: [...base.attachments.filter((a) => a.name !== "Calendar.ics"), { name: "Calendar.ics", size: "4 KB" }],
      };
      return { doc };
    }
    case "event.save": {
      const f = doc.form && (doc.form.kind === "appointment" || doc.form.kind === "meeting") ? doc.form : formFor(doc, v.meeting ? "meeting" : "appointment");
      const e = formEvent(doc, f, v);
      const events = (doc.events = doc.events ?? []);
      const i = events.findIndex((x) => x.id === e.id);
      const prev = i >= 0 ? events[i] : undefined;
      if (prev) events[i] = { ...prev, ...e, organizer: prev.organizer ?? e.organizer, response: prev.response, exceptions: prev.exceptions };
      else events.push(e);
      if (e.meeting && (!prev || !prev.organizer || prev.organizer.email === doc.account.email)) {
        const to = [...(e.required ?? []), ...(e.optional ?? [])];
        sentCopy(doc, to, prev ? `Updated: ${e.title}` : e.title, e.body ?? "", {
          invite: { title: e.title, start: e.start, end: e.end, location: e.location, organizer: doc.account, required: e.required, optional: e.optional, teams: e.teams, eventId: e.id },
        });
      }
      doc.form = null;
      return { doc, ui: { selection: e.recurrence ? `evt:${e.id}@${dateOf(e.start)}` : `evt:${e.id}` } };
    }
    case "contact.save": {
      const f = doc.form?.kind === "contact" ? doc.form : formFor(doc, "contact");
      const d = f.data;
      const contacts = (doc.contacts = doc.contacts ?? []);
      const val = (k: string, fb?: string) => (v[k] !== undefined ? s(k) : fb ?? "") || undefined;
      const prev = f.id ? contacts.find((x) => x.id === f.id) : undefined;
      const ct: OlContact = {
        ...(prev ?? {}),
        id: prev?.id ?? nextId(contacts, "c"),
        name: val("name", d.name) ?? "Untitled",
        company: val("company", d.company),
        jobTitle: val("jobTitle", d.jobTitle),
        email: val("email", d.email),
        phone: val("phone", d.phone),
        mobile: val("mobile", d.mobile),
        address: val("address", d.address),
        notes: val("notes", d.notes),
        categories: d.categories ?? prev?.categories,
        flag: d.flag !== undefined ? d.flag : prev?.flag,
      };
      if (prev) contacts[contacts.indexOf(prev)] = ct;
      else contacts.push(ct);
      doc.form = null;
      return { doc, ui: { selection: `contact:${ct.id}` } };
    }
    case "task.save": {
      const f = doc.form?.kind === "task" ? doc.form : formFor(doc, "task");
      const d = f.data;
      const tasks = (doc.tasks = doc.tasks ?? []);
      const prev = f.id ? tasks.find((x) => x.id === f.id) : undefined;
      const date = (k: string, fb?: string) => {
        const raw = v[k] !== undefined ? s(k) : fb ?? "";
        return raw && raw !== "None" ? parseUsDate(raw) ?? undefined : undefined;
      };
      const status = ((v.status !== undefined ? s("status") : d.status) || "Not Started") as OlTaskStatus;
      const remOn = v.reminder !== undefined ? Boolean(v.reminder) : Boolean(d.reminderOn);
      const rd = parseUsDate(v.reminderDate !== undefined ? s("reminderDate") : d.reminderDate ?? "");
      const rt = parseTime(v.reminderTime !== undefined ? s("reminderTime") : d.reminderTime ?? "8:00 AM");
      const owner = (d.assignTo ?? []).length ? personFor(doc, d.assignTo![0]).name : prev?.owner;
      const t: OlTask = {
        ...(prev ?? {}),
        id: prev?.id ?? nextId(tasks, "t"),
        subject: (v.subject !== undefined ? s("subject") : d.subject) || "Untitled",
        start: date("startDate", d.startDate),
        due: date("dueDate", d.dueDate),
        status,
        priority: ((v.priority !== undefined ? s("priority") : d.priority) || "Normal") as OlTask["priority"],
        percent: status === "Completed" ? 100 : Number(v.percent ?? d.percent ?? 0) || 0,
        reminder: remOn && rd && rt ? `${rd}T${rt}` : undefined,
        notes: d.notes || prev?.notes,
        categories: d.categories ?? prev?.categories,
        owner,
        completedOn: status === "Completed" ? prev?.completedOn ?? todayOf(doc) : undefined,
      };
      if (prev) tasks[tasks.indexOf(prev)] = t;
      else tasks.push(t);
      if ((d.assignTo ?? []).length && !prev?.owner) sentCopy(doc, d.assignTo!.map((x) => personFor(doc, x)), `Task Request: ${t.subject}`, d.notes ?? "");
      doc.form = null;
      return { doc, ui: { selection: `task:${t.id}` } };
    }
    case "group.save": {
      const f = doc.form?.kind === "group" ? doc.form : formFor(doc, "group");
      const groups = (doc.groups = doc.groups ?? []);
      const prev = f.id ? groups.find((x) => x.id === f.id) : undefined;
      const g: OlGroup = {
        ...(prev ?? {}),
        id: prev?.id ?? nextId(groups, "g"),
        name: (v.name !== undefined ? s("name") : f.data.name) || "Untitled Group",
        members: v.members !== undefined ? tokensOf(s("members")) : f.data.members ?? [],
        notes: f.data.notes || prev?.notes,
        categories: f.data.categories ?? prev?.categories,
      };
      if (prev) groups[groups.indexOf(prev)] = g;
      else groups.push(g);
      doc.form = null;
      return { doc, ui: { selection: `group:${g.id}` } };
    }
  }
  return { doc };
}

function flagTargets(doc: OutlookDoc, ui: SimUi): { flag?: OlFlag | null }[] {
  return [...selMessages(doc, ui), ...(doc.contacts ?? []).filter((x) => selIds(ui.selection, "contact").includes(x.id))];
}
function selTasks(doc: OutlookDoc, ui: SimUi): OlTask[] {
  const ids = selIds(ui.selection, "task");
  return (doc.tasks ?? []).filter((t) => ids.includes(t.id));
}
function categoryTargets(doc: OutlookDoc, ui: SimUi): { categories?: string[] }[] {
  const out: { categories?: string[] }[] = [...selMessages(doc, ui), ...selTasks(doc, ui)];
  const ev = selIds(ui.selection, "evt");
  out.push(...(doc.events ?? []).filter((e) => ev.includes(e.id)));
  const ct = selIds(ui.selection, "contact");
  out.push(...(doc.contacts ?? []).filter((x) => ct.includes(x.id)));
  const gr = selIds(ui.selection, "group");
  out.push(...(doc.groups ?? []).filter((x) => gr.includes(x.id)));
  return out;
}

function send(doc: OutlookDoc): Res {
  const comp = doc.compose;
  if (!comp) return { doc };
  const p = (list: string[]) => list.map((t) => personFor(doc, t));
  const body = comp.quoted && comp.mode !== "response" ? `${comp.body}\n\n________________________________\n${comp.quoted}` : comp.quoted ? `${comp.body}\n\n${comp.quoted}` : comp.body;
  const sched = comp.sendAt && toMs(comp.sendAt) > toMs(nowOf(doc));
  const msg = sentCopy(doc, p(comp.to), comp.subject, body.replace(/^\n+/, ""), {
    cc: comp.cc.length ? p(comp.cc) : undefined,
    bcc: comp.bcc.length ? p(comp.bcc) : undefined,
    attachments: comp.attachments.length ? comp.attachments.map((a) => ({ ...a })) : undefined,
    importance: comp.importance,
    folder: sched ? "outbox" : "sent",
    sendAt: sched ? comp.sendAt : undefined,
    conversation: comp.of ? conversationKey(doc.messages.find((m) => m.id === comp.of)!) : undefined,
  });
  // A message to yourself (or a group you are in) also arrives in the Inbox.
  const me = doc.account.email.toLowerCase();
  if (!sched && [...comp.to, ...comp.cc, ...comp.bcc].some((t) => t.toLowerCase() === me)) {
    doc.messages.push({ ...clone(msg), id: nextId(doc.messages, "m"), folder: "inbox", read: false, bcc: undefined });
  }
  if (comp.of) {
    const orig = doc.messages.find((m) => m.id === comp.of);
    if (orig) orig.replied = comp.mode === "forward" ? "forwarded" : comp.mode === "replyAll" ? "repliedAll" : "replied";
  }
  if (comp.draftId) doc.messages = doc.messages.filter((m) => m.id !== comp.draftId);
  if (comp.response && comp.response.kind !== "Proposal") {
    const inv = doc.messages.find((m) => m.id === comp.response!.msg);
    if (inv?.invite) inv.folder = "deleted";
  }
  if (comp.response?.kind === "Proposal") {
    const inv = doc.messages.find((m) => m.id === comp.response!.msg);
    if (inv) inv.folder = "deleted";
  }
  doc.compose = null;
  return { doc };
}

function runQuickStep(doc: OutlookDoc, name: string, ui: SimUi): Res {
  const msgs = selMessages(doc, ui);
  const before = visibleMessages(doc);
  const ids = msgs.map((m) => m.id);
  const done = (): Res => {
    const gone = before.filter((m) => !visibleMessages(doc).some((x) => x.id === m.id)).map((m) => m.id);
    return { doc, ui: gone.length ? { selection: nextAfter(before, gone, doc) } : undefined };
  };
  switch (name) {
    case "To Manager":
      if (msgs[0] && doc.manager) {
        bumpCompose(doc);
        doc.compose = { ...composeFor(doc, "forward", msgs[0]), to: [doc.manager.email], inline: false, prefilled: true };
      }
      return { doc };
    case "Team Email":
      bumpCompose(doc);
      doc.compose = { ...composeFor(doc, "new"), to: doc.team ?? [], prefilled: Boolean(doc.team?.length) };
      return { doc };
    case "Done":
      for (const m of msgs) {
        m.read = true;
        if (m.flag) m.flag = { ...m.flag, complete: true };
        m.folder = "archive";
      }
      return done();
    case "Reply & Delete":
      if (msgs[0]) {
        bumpCompose(doc);
        doc.compose = { ...composeFor(doc, "reply", msgs[0]), inline: false };
        msgs[0].folder = "deleted";
      }
      return { doc };
  }
  const qs = (doc.quickSteps ?? []).find((q) => q.name.toLowerCase() === name.toLowerCase());
  if (!qs) return { doc };
  for (const a of qs.actions) {
    const t = a.target ?? "";
    for (const m of doc.messages.filter((x) => ids.includes(x.id))) {
      switch (a.action) {
        case "Move to folder": {
          const f = folderByName(doc, t);
          if (f) m.folder = f.id;
          break;
        }
        case "Copy to folder": {
          const f = folderByName(doc, t);
          if (f) doc.messages.push({ ...clone(m), id: nextId(doc.messages, "m"), folder: f.id });
          break;
        }
        case "Delete message":
          m.folder = "deleted";
          break;
        case "Mark as read":
          m.read = true;
          break;
        case "Mark as unread":
          m.read = false;
          break;
        case "Categorize message": {
          const slot = catSlot(doc, t);
          if (slot) m.categories = Array.from(new Set([...(m.categories ?? []), slot]));
          break;
        }
        case "Clear categories":
          m.categories = [];
          break;
        case "Flag message":
          setFlag(doc, m, QUICK_FLAGS.includes(t) ? t : "Today");
          break;
        case "Clear flags on message":
          m.flag = null;
          break;
        case "Mark complete":
          m.flag = { ...(m.flag ?? {}), complete: true };
          break;
      }
    }
    if (["Forward", "Reply", "Reply All", "New Message"].includes(a.action) && msgs[0]) {
      bumpCompose(doc);
      const mode = a.action === "Forward" ? "forward" : a.action === "Reply" ? "reply" : a.action === "Reply All" ? "replyAll" : "new";
      const comp = composeFor(doc, mode, mode === "new" ? undefined : msgs[0]);
      doc.compose = { ...comp, inline: false, to: t ? tokensOf(t) : comp.to };
    }
  }
  return done();
}

function deleteSelection(doc: OutlookDoc, value: SimValue | undefined, ui: SimUi): Res {
  const sel = selKeys(ui.selection);
  if (sel.some((k) => k.startsWith("msg:"))) {
    const before = visibleMessages(doc);
    const ids = selIds(ui.selection, "msg");
    for (const m of doc.messages.filter((x) => ids.includes(x.id))) {
      if (m.folder === "deleted") m.folder = "__gone";
      else m.folder = "deleted";
    }
    doc.messages = doc.messages.filter((m) => m.folder !== "__gone");
    if (doc.window && ids.includes(doc.window)) doc.window = null;
    return { doc, ui: { selection: nextAfter(before, ids, doc) } };
  }
  const ev = selEvent(doc, ui);
  if (ev) {
    const e = ev.evt;
    const occ = e.recurrence && ev.date && value !== "Delete Series";
    if (occ) e.exceptions = Array.from(new Set([...(e.exceptions ?? []), ev.date!]));
    else doc.events = (doc.events ?? []).filter((x) => x.id !== e.id);
    if (e.meeting && (!e.organizer || e.organizer.email === doc.account.email)) {
      sentCopy(doc, [...(e.required ?? []), ...(e.optional ?? [])], `Canceled: ${e.title}`, occ ? `This occurrence on ${fmtLong(ev.date!)} has been canceled.` : "This meeting has been canceled.");
    }
    return { doc, ui: { selection: "" } };
  }
  const ct = selIds(ui.selection, "contact");
  if (ct.length) {
    doc.contacts = (doc.contacts ?? []).filter((x) => !ct.includes(x.id));
    return { doc, ui: { selection: doc.contacts[0] ? `contact:${doc.contacts[0].id}` : "" } };
  }
  const gr = selIds(ui.selection, "group");
  if (gr.length) {
    doc.groups = (doc.groups ?? []).filter((x) => !gr.includes(x.id));
    return { doc, ui: { selection: "" } };
  }
  const tk = selIds(ui.selection, "task");
  if (tk.length) {
    doc.tasks = (doc.tasks ?? []).filter((x) => !tk.includes(x.id));
    return { doc, ui: { selection: "" } };
  }
  const fo = selIds(ui.selection, "folder");
  if (fo.length) return deleteFolder(doc, fo[0]);
  return { doc };
}

function deleteFolder(doc: OutlookDoc, id: string): Res {
  if (SYSTEM_FOLDERS.some((f) => f.id === id)) return { doc };
  const ids = new Set<string>([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const f of doc.folders ?? []) if (f.parent && ids.has(f.parent) && !ids.has(f.id)) {
      ids.add(f.id);
      grew = true;
    }
  }
  const f = (doc.folders ?? []).find((x) => x.id === id);
  if (f) f.parent = "deleted";
  for (const m of doc.messages) if (ids.has(m.folder) && m.folder !== id) m.folder = id;
  if (ids.has(currentFolder(doc))) doc.folder = "inbox";
  return { doc, ui: { selection: `folder:${id}` } };
}

const CAL_STEP: Record<string, number> = { Day: 1, "Work Week": 7, Week: 7, "Schedule View": 1 };

function applyCommand(doc: OutlookDoc, id: string, value: SimValue | undefined, ui: SimUi): Res {
  const sv = value === undefined ? "" : String(value);
  const msgs = selMessages(doc, ui);
  const msg = msgs[0];
  switch (id) {
    /* ---------- navigation ---------- */
    case "nav.module": {
      const map: Record<string, OlModule> = { Mail: "mail", Calendar: "calendar", People: "people", Contacts: "people", Tasks: "tasks", "To Do": "tasks" };
      doc.module = map[sv] ?? (sv.toLowerCase() as OlModule);
      doc.window = null;
      doc.search = undefined;
      let sel = "";
      if (doc.module === "mail") sel = firstVisibleKey(doc);
      if (doc.module === "people" && doc.contacts?.[0]) sel = `contact:${sortedContacts(doc)[0].id}`;
      return { doc, ui: { selection: sel } };
    }
    case "mail.folder": {
      const f = folderByName(doc, sv) ?? folderById(doc, sv);
      if (!f) return { doc };
      doc.module = "mail";
      doc.folder = f.id;
      doc.search = undefined;
      doc.filter = undefined;
      return { doc, ui: { selection: firstVisibleKey(doc) } };
    }
    case "mail.focusTab":
      doc.focusTab = sv === "Other" ? "Other" : "Focused";
      return { doc, ui: { selection: firstVisibleKey(doc) } };
    case "view.focusedInbox":
      doc.focused = !doc.focused;
      doc.focusTab = "Focused";
      return { doc, ui: { selection: firstVisibleKey(doc) } };
    case "mail.arrange":
      doc.arrange = sv || "Date";
      return { doc };
    case "mail.sortOrder":
      doc.sortAsc = /oldest|a on top|smallest|low/i.test(sv);
      return { doc };
    case "view.reverseSort":
      doc.sortAsc = !doc.sortAsc;
      return { doc };
    case "mail.filter":
    case "search.refine":
      doc.filter = !sv || sv === "All" || sv === "Clear Filter" ? undefined : sv;
      return { doc, ui: { selection: firstVisibleKey(doc) } };
    case "mail.search":
      doc.module = "mail";
      doc.search = sv.trim() || undefined;
      return { doc, ui: { selection: firstVisibleKey(doc) } };
    case "mail.searchFocus":
      doc.searchFocus = (doc.searchFocus ?? 0) + 1;
      return { doc };
    case "search.close":
      doc.search = undefined;
      doc.filter = undefined;
      return { doc, ui: { selection: firstVisibleKey(doc) } };
    case "search.scope":
      doc.searchScope = sv || "Current Mailbox";
      return { doc };
    case "search.refineFrom":
    case "search.refineSubject":
      doc.search = `${doc.search ?? ""} ${id === "search.refineFrom" ? "from:" : "subject:"}`.trim();
      doc.searchFocus = (doc.searchFocus ?? 0) + 1;
      return { doc };
    case "view.readingPane":
      doc.readingPane = (sv as OutlookDoc["readingPane"]) || "Right";
      return { doc };
    case "view.folderPane":
      doc.folderPane = (sv as OutlookDoc["folderPane"]) || "Normal";
      return { doc };
    case "view.todoBar":
      doc.todoBar = (sv as OutlookDoc["todoBar"]) || "Off";
      return { doc };
    case "view.conversations":
      doc.conversations = !doc.conversations;
      return { doc };
    case "view.changeView":
      doc.flags = { ...(doc.flags ?? {}), listView: sv };
      return { doc };
    case "view.reset":
      doc.arrange = undefined;
      doc.sortAsc = undefined;
      doc.filter = undefined;
      return { doc };
    case "cal.view":
      doc.module = "calendar";
      doc.calView = (sv as OutlookDoc["calView"]) || "Work Week";
      return { doc };
    case "cal.today":
      doc.module = "calendar";
      doc.calDate = todayOf(doc);
      return { doc };
    case "cal.next7":
      doc.module = "calendar";
      doc.calDate = todayOf(doc);
      doc.calView = "Week";
      return { doc };
    case "cal.prev":
    case "cal.next": {
      const dir = id === "cal.next" ? 1 : -1;
      const v = doc.calView ?? "Work Week";
      const cur = doc.calDate ?? todayOf(doc);
      doc.calDate = v === "Month" ? addMonths(cur, dir) : addDays(cur, dir * (CAL_STEP[v] ?? 7));
      return { doc };
    }
    case "cal.goto": {
      const d = parseUsDate(sv) ?? (/^\d{4}-\d{2}-\d{2}/.test(sv) ? dateOf(sv) : null);
      if (d) {
        doc.module = "calendar";
        doc.calDate = d;
      }
      return { doc };
    }
    case "cal.toggleCalendar":
      doc.calendars = (doc.calendars ?? []).map((c) => (c.name === sv ? { ...c, shown: !c.shown } : c));
      return { doc };
    case "people.view":
      doc.peopleView = sv || "People";
      return { doc };
    case "tasks.view":
      doc.tasksView = sv || "To-Do List";
      return { doc };
    case "tasks.folder":
      doc.tasksFolder = sv === "Tasks" ? "Tasks" : "To-Do List";
      return { doc };
    case "item.open":
      return openItem(doc, sv || ui.selection);
    case "window.close":
      doc.window = null;
      return { doc };
    case "invite.calendar":
      if (msg?.invite) {
        doc.module = "calendar";
        doc.calDate = dateOf(msg.invite.start);
        doc.calView = "Day";
      }
      return { doc };

    /* ---------- opening forms ---------- */
    case "mail.newEmail":
      bumpCompose(doc);
      doc.compose = composeFor(doc, "new");
      return { doc };
    case "item.new": {
      const mod = moduleOf(doc);
      if (mod === "calendar") return applyCommand(doc, "cal.newAppointment", undefined, ui);
      if (mod === "people") return applyCommand(doc, "people.newContact", undefined, ui);
      if (mod === "tasks") return applyCommand(doc, "tasks.newTask", undefined, ui);
      return applyCommand(doc, "mail.newEmail", undefined, ui);
    }
    case "cal.newAppointment":
    case "cal.newMeeting":
    case "cal.newTeamsMeeting": {
      const slot = /^\d{4}-\d{2}-\d{2}T/.test(sv) ? sv : selKeys(ui.selection).find((k) => k.startsWith("slot:"))?.slice(5);
      doc.form = formFor(doc, id === "cal.newAppointment" ? "appointment" : "meeting", { ...(slot ? { start: slot, end: addMinutes(slot, 30) } : {}), teams: id === "cal.newTeamsMeeting" });
      return { doc };
    }
    case "mail.replyWithMeeting":
      if (msg) {
        const att = [msg.from, ...(msg.to ?? []), ...(msg.cc ?? [])].map((p) => p.email).filter((e) => e.toLowerCase() !== doc.account.email.toLowerCase());
        doc.form = formFor(doc, "meeting", { title: msg.subject.replace(/^((re|fw):\s*)+/i, ""), required: att, body: msg.body });
      }
      return { doc };
    case "people.newContact":
      doc.form = formFor(doc, "contact");
      return { doc };
    case "people.newGroup":
      doc.form = formFor(doc, "group");
      return { doc };
    case "tasks.newTask":
      doc.form = formFor(doc, "task");
      return { doc };
    case "contact.emailTo": {
      const to = contactEmails(doc, ui);
      bumpCompose(doc);
      doc.compose = { ...composeFor(doc, "new"), to, prefilled: to.length > 0 };
      return { doc };
    }
    case "contact.meetingWith":
      doc.form = formFor(doc, "meeting", { required: contactEmails(doc, ui) });
      return { doc };
    case "contact.logActivity": {
      const cid = sv || selIds(ui.selection, "contact")[0];
      if (cid) {
        doc.dialog = "activity";
        doc.dialogArg = cid;
      }
      return { doc, ui: cid ? { selection: `contact:${cid}` } : undefined };
    }
    case "contact.edit":
      return openItem(doc, ui.selection);
    case "group.addMembers":
      doc.dialog = "selectMembers";
      return { doc };
    case "compose.addressBook":
      if (doc.compose) doc.compose.addressBook = sv || "To";
      else if (doc.form) doc.dialog = "addressBook";
      return { doc };
    case "addressBook.open":
      doc.dialog = "addressBook";
      return { doc };
    case "compose.signaturesDialog":
    case "file.signatures":
      doc.dialog = "signatures";
      return { doc };
    case "file.autoReplies":
      doc.dialog = "autoReplies";
      return { doc };
    case "dialog.close":
      doc.dialog = null;
      doc.dialogArg = undefined;
      if (doc.compose) doc.compose.addressBook = null;
      return { doc };

    /* ---------- composing ---------- */
    case "mail.reply":
    case "mail.replyAll":
    case "mail.forward":
      if (!msg) return { doc };
      bumpCompose(doc);
      doc.compose = composeFor(doc, id === "mail.reply" ? "reply" : id === "mail.replyAll" ? "replyAll" : "forward", msg);
      if (doc.window === msg.id) {
        doc.window = null;
        doc.compose.inline = false;
      }
      return { doc, ui: { selection: `msg:${msg.id}` } };
    case "mail.forwardAttachment":
      if (!msg) return { doc };
      bumpCompose(doc);
      doc.compose = {
        ...composeFor(doc, "new"),
        mode: "forward",
        of: msg.id,
        subject: `FW: ${msg.subject}`,
        attachments: [{ name: `${msg.subject.replace(/[\\/:*?"<>|]/g, "")}.msg`, size: "48 KB" }],
      };
      return { doc };
    case "event.forward": {
      const e = doc.form?.id ? (doc.events ?? []).find((x) => x.id === doc.form!.id) : selEvent(doc, ui)?.evt;
      if (!e) return { doc };
      bumpCompose(doc);
      doc.compose = { ...composeFor(doc, "new"), mode: "forward", subject: `FW: ${e.title}`, quoted: `${e.title}\nWhen: ${fmtLong(e.start)} ${fmtTime(e.start)} - ${fmtTime(e.end)}\nWhere: ${e.location ?? ""}`, attachments: [] };
      doc.form = null;
      return { doc };
    }
    case "contact.forward": {
      const ids = selIds(ui.selection, "contact");
      const list = (doc.contacts ?? []).filter((x) => ids.includes(x.id) || x.id === doc.form?.id);
      if (!list.length) return { doc };
      bumpCompose(doc);
      doc.compose = { ...composeFor(doc, "new"), subject: list[0].name, attachments: list.map((x) => ({ name: `${x.name}.vcf`, size: "2 KB" })) };
      return { doc };
    }
    case "compose.send":
      return send(doc);
    case "compose.requestSend":
      if (doc.compose) doc.compose.sendSeq = (doc.compose.sendSeq ?? 0) + 1;
      else if (doc.form) doc.form.submitSeq = (doc.form.submitSeq ?? 0) + 1;
      return { doc };
    case "outlook.save":
    case "event.saveClose":
    case "contact.saveClose":
    case "task.saveClose":
    case "group.saveClose":
      if (doc.form) doc.form.submitSeq = (doc.form.submitSeq ?? 0) + 1;
      else if (doc.compose && id === "outlook.save") doc.compose.saveSeq = (doc.compose.saveSeq ?? 0) + 1;
      return { doc };
    case "compose.discard":
      doc.compose = null;
      return { doc };
    case "compose.saveDraft": {
      const comp = doc.compose;
      if (!comp) return { doc };
      let draft: OlMessage["draft"];
      try {
        draft = sv ? JSON.parse(sv) : undefined;
      } catch {
        draft = undefined;
      }
      const d = draft ?? { to: comp.to, cc: comp.cc, bcc: comp.bcc, subject: comp.subject, body: comp.body };
      const existing = comp.draftId ? doc.messages.find((m) => m.id === comp.draftId) : undefined;
      const m: OlMessage = existing ?? { id: nextId(doc.messages, "m"), folder: "drafts", from: doc.account, subject: "", body: "", date: nowOf(doc), read: true };
      m.to = d.to.map((t) => personFor(doc, t));
      m.subject = d.subject;
      m.body = d.body;
      m.draft = d;
      m.attachments = comp.attachments.length ? comp.attachments : undefined;
      if (!existing) doc.messages.push(m);
      doc.compose = null;
      return { doc };
    }
    case "compose.popOut":
      if (doc.compose) doc.compose.inline = false;
      return { doc };
    case "compose.bcc":
      if (doc.compose) doc.compose.showBcc = !doc.compose.showBcc;
      return { doc };
    case "compose.from":
      if (doc.compose) doc.compose.showFrom = !doc.compose.showFrom;
      return { doc };
    case "options.readReceipt":
      if (doc.compose) doc.compose.readReceipt = !doc.compose.readReceipt;
      return { doc };
    case "options.deliveryReceipt":
      if (doc.compose) doc.compose.deliveryReceipt = !doc.compose.deliveryReceipt;
      return { doc };
    case "message.importanceHigh":
    case "message.importanceLow": {
      const lvl = id === "message.importanceHigh" ? "High" : "Low";
      if (doc.compose) doc.compose.importance = doc.compose.importance === lvl ? undefined : lvl;
      return { doc };
    }
    case "compose.removeAttachment":
      if (doc.compose) doc.compose.attachments = doc.compose.attachments.filter((a) => a.name !== sv);
      return { doc };
    case "format.bold":
    case "format.italic":
    case "format.underline": {
      if (!doc.compose) return { doc };
      const k = id.slice(7) as "bold" | "italic" | "underline";
      doc.compose.format = { ...(doc.compose.format ?? {}), [k]: !doc.compose.format?.[k] };
      return { doc };
    }
    case "format.fontName":
    case "format.fontSize":
    case "format.fontColor":
      if (doc.compose) doc.compose.format = { ...(doc.compose.format ?? {}), [id === "format.fontName" ? "font" : id === "format.fontSize" ? "size" : "color"]: sv };
      return { doc };
    case "format.type":
      if (doc.compose) doc.compose.format = { ...(doc.compose.format ?? {}), type: sv as "HTML" };
      return { doc };

    /* ---------- mail actions ---------- */
    case "item.delete":
      return deleteSelection(doc, value, ui);
    case "mail.archive":
    case "mail.move":
    case "mail.moveToFolder": {
      if (!msgs.length) return { doc };
      const target = id === "mail.archive" ? folderById(doc, "archive") : folderByName(doc, sv);
      if (!target) return { doc };
      const before = visibleMessages(doc);
      const ids = msgs.map((m) => m.id);
      moveMessages(doc, ids, target.id);
      if (doc.window && ids.includes(doc.window)) doc.window = null;
      return { doc, ui: { selection: nextAfter(before, ids, doc) } };
    }
    case "mail.copy": {
      const target = folderByName(doc, sv);
      if (!target) return { doc };
      for (const m of msgs) doc.messages.push({ ...clone(m), id: nextId(doc.messages, "m"), folder: target.id });
      return { doc };
    }
    case "mail.markRead":
    case "mail.markUnread":
      for (const m of msgs) m.read = id === "mail.markRead";
      for (const t of selIds(ui.selection, "folder")) for (const m of messagesIn(doc, t)) m.read = id === "mail.markRead";
      return { doc };
    case "mail.toggleRead": {
      const to = !msgs.every((m) => m.read);
      for (const m of msgs) m.read = to;
      return { doc };
    }
    case "mail.autoRead": {
      const m = doc.messages.find((x) => x.id === sv);
      if (m) m.read = true;
      return { doc };
    }
    case "item.followUp": {
      if (!sv) return { doc };
      const tasks = selTasks(doc, ui);
      for (const t of tasks) {
        if (sv === "Mark Complete") {
          t.status = "Completed";
          t.percent = 100;
          t.completedOn = todayOf(doc);
        } else if (sv === "Clear Flag") {
          t.start = undefined;
          t.due = undefined;
        } else {
          const d = flagDates(sv === "Flag Message" ? "Today" : sv, todayOf(doc));
          t.start = d.start;
          t.due = d.due;
        }
      }
      for (const t of flagTargets(doc, ui)) setFlag(doc, t, sv);
      return { doc };
    }
    case "item.categorize": {
      const targets = categoryTargets(doc, ui);
      if (sv === "Clear All Categories") {
        for (const t of targets) t.categories = [];
        return { doc };
      }
      const slot = catSlot(doc, sv);
      if (!slot) return { doc };
      for (const t of targets) t.categories = toggleCategory(t.categories, slot);
      return { doc };
    }
    case "mail.ignore": {
      if (!msg) return { doc };
      const key = conversationKey(msg);
      const before = visibleMessages(doc);
      const ids = doc.messages.filter((m) => conversationKey(m) === key && m.folder !== "sent").map((m) => m.id);
      for (const m of doc.messages) if (ids.includes(m.id)) {
        m.folder = "deleted";
        m.ignored = true;
      }
      return { doc, ui: { selection: nextAfter(before, ids, doc) } };
    }
    case "mail.cleanUp": {
      const before = visibleMessages(doc);
      const scope = msg && sv === "Clean Up Conversation" ? doc.messages.filter((m) => conversationKey(m) === conversationKey(msg)) : messagesIn(doc, currentFolder(doc));
      const groups = new Map<string, OlMessage[]>();
      for (const m of scope) groups.set(conversationKey(m), [...(groups.get(conversationKey(m)) ?? []), m]);
      const ids: string[] = [];
      for (const list of Array.from(groups.values())) {
        const sorted = list.filter((m) => m.folder !== "sent").sort((a, b) => toMs(b.date) - toMs(a.date));
        for (const m of sorted.slice(1)) {
          m.folder = "deleted";
          ids.push(m.id);
        }
      }
      return { doc, ui: ids.length ? { selection: nextAfter(before, ids, doc) } : undefined };
    }
    case "home.junk": {
      if (!msg && sv !== "Junk E-mail Options...") return { doc };
      const before = visibleMessages(doc);
      const ids = msgs.map((m) => m.id);
      if (sv === "Block Sender") {
        doc.blocked = Array.from(new Set([...(doc.blocked ?? []), ...msgs.map((m) => m.from.email)]));
        moveMessages(doc, ids, "junk");
      } else if (sv === "Not Junk" || sv === "Never Block Sender" || sv === "Never Block Sender's Domain" || sv === "Never Block this Group or Mailing List") {
        const add = msgs.map((m) => (sv === "Never Block Sender's Domain" ? "@" + m.from.email.split("@")[1] : m.from.email));
        doc.safe = Array.from(new Set([...(doc.safe ?? []), ...add]));
        doc.blocked = (doc.blocked ?? []).filter((b) => !add.includes(b));
        for (const m of msgs) if (m.folder === "junk") m.folder = "inbox";
      }
      return { doc, ui: { selection: nextAfter(before, ids.filter((i) => !visibleMessages(doc).some((m) => m.id === i)), doc) } };
    }
    case "home.report": {
      if (!msgs.length) return { doc };
      const before = visibleMessages(doc);
      const ids = msgs.map((m) => m.id);
      for (const m of msgs) {
        if (sv === "Report Phishing") {
          m.reported = "phishing";
          m.folder = "deleted";
        } else if (sv === "Report Junk") {
          m.reported = "junk";
          m.folder = "junk";
        } else {
          m.reported = "not junk";
          if (m.folder === "junk") m.folder = "inbox";
        }
      }
      return { doc, ui: { selection: nextAfter(before, ids, doc) } };
    }
    case "mail.moveToOther":
    case "mail.moveToFocused": {
      const before = visibleMessages(doc);
      for (const m of msgs) m.other = id === "mail.moveToOther";
      return { doc, ui: { selection: nextAfter(before, msgs.map((m) => m.id), doc) } };
    }
    case "mail.pin":
      for (const m of msgs) m.pinned = !m.pinned;
      return { doc };
    case "home.quickStep":
      return runQuickStep(doc, sv, ui);
    case "rules.runNow": {
      const before = visibleMessages(doc);
      for (const r of doc.rules ?? []) runRule(doc, r, messagesIn(doc, "inbox"));
      const gone = before.filter((m) => !visibleMessages(doc).some((x) => x.id === m.id)).map((m) => m.id);
      return { doc, ui: gone.length ? { selection: nextAfter(before, gone, doc) } : undefined };
    }
    case "sendReceive.all": {
      const arriving = doc.incoming ?? [];
      doc.incoming = [];
      for (const m of arriving) {
        const nm: OlMessage = { ...m, folder: m.folder ?? "inbox", read: false, date: m.date ?? tick(doc) };
        if ((doc.blocked ?? []).some((b) => nm.from.email.toLowerCase() === b.toLowerCase())) nm.folder = "junk";
        doc.messages.push(nm);
        for (const r of doc.rules ?? []) runRule(doc, r, [nm]);
      }
      for (const m of doc.messages) if (m.folder === "outbox" && (!m.sendAt || toMs(m.sendAt) <= toMs(nowOf(doc)))) m.folder = "sent";
      doc.flags = { ...(doc.flags ?? {}), lastSendReceive: nowOf(doc) };
      return { doc };
    }
    case "sendReceive.offline":
      doc.flags = { ...(doc.flags ?? {}), offline: !doc.flags?.offline };
      return { doc };
    case "mail.emptyDeleted":
      doc.messages = doc.messages.filter((m) => m.folder !== "deleted");
      return { doc };

    /* ---------- folders ---------- */
    case "folder.rename": {
      const fid = selIds(ui.selection, "folder")[0] ?? currentFolder(doc);
      if (!SYSTEM_FOLDERS.some((f) => f.id === fid)) doc.renaming = fid;
      return { doc };
    }
    case "folder.newInline":
      doc.newFolderIn = sv || selIds(ui.selection, "folder")[0] || currentFolder(doc);
      return { doc };
    case "folder.cancelEdit":
      doc.renaming = null;
      doc.newFolderIn = null;
      return { doc };
    case "folder.delete":
      return deleteFolder(doc, selIds(ui.selection, "folder")[0] ?? currentFolder(doc));
    case "folder.markAllRead": {
      const fid = selIds(ui.selection, "folder")[0] ?? currentFolder(doc);
      for (const m of messagesIn(doc, fid)) m.read = true;
      return { doc };
    }
    case "folder.favorite": {
      const fid = sv || selIds(ui.selection, "folder")[0] || currentFolder(doc);
      const fav = doc.favorites ?? ["inbox", "sent", "deleted"];
      doc.favorites = fav.includes(fid) ? fav.filter((x) => x !== fid) : [...fav, fid];
      return { doc };
    }
    case "folder.deleteAll": {
      const fid = selIds(ui.selection, "folder")[0] ?? currentFolder(doc);
      for (const m of messagesIn(doc, fid)) m.folder = "deleted";
      return { doc, ui: { selection: "" } };
    }

    /* ---------- meeting requests ---------- */
    case "invite.respond": {
      if (!msg?.invite) return { doc };
      const base = sv.split(" (")[0];
      const kind = base === "Decline" ? "Declined" : base === "Tentative" ? "Tentative" : "Accepted";
      const mode = /\(Edit\)/i.test(sv) ? "edit" : /No Response/i.test(sv) ? "none" : "send";
      const before = visibleMessages(doc);
      respondInvite(doc, msg, kind);
      if (mode === "edit") {
        bumpCompose(doc);
        doc.compose = { id: `c${doc.flags?.composeSeq}-resp-${msg.id}`, mode: "response", to: [msg.invite.organizer.email], cc: [], bcc: [], subject: `${kind}: ${msg.invite.title}`, body: "", attachments: [], response: { msg: msg.id, kind } };
        return { doc };
      }
      if (mode === "send") sentCopy(doc, [msg.invite.organizer], `${kind}: ${msg.invite.title}`, "");
      msg.folder = "deleted";
      return { doc, ui: { selection: nextAfter(before, [msg.id], doc) } };
    }
    case "invite.removeFromCalendar": {
      if (!msg?.invite) return { doc };
      const t = msg.invite.title.toLowerCase();
      doc.events = (doc.events ?? []).filter((e) => e.title.toLowerCase() !== t && e.id !== msg.invite!.eventId);
      const before = visibleMessages(doc);
      msg.folder = "deleted";
      return { doc, ui: { selection: nextAfter(before, [msg.id], doc) } };
    }

    /* ---------- calendar ---------- */
    case "event.move": {
      const s = selEvent(doc, ui);
      if (!s) return { doc };
      const m = /^(.+?)\s+(\d{1,2}:\d{2}\s*[AP]M)$/i.exec(sv.trim());
      const newStart = m ? (parseUsDate(m[1]) && parseTime(m[2]) ? `${parseUsDate(m[1])}T${parseTime(m[2])}` : null) : /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(sv) ? sv : null;
      if (!newStart) return { doc };
      const e = s.evt;
      if (e.recurrence && s.date) {
        const len = minutesBetween(e.start, e.end);
        e.exceptions = Array.from(new Set([...(e.exceptions ?? []), s.date]));
        const copy: OlEvent = { ...clone(e), id: nextId(doc.events, "e"), recurrence: null, exceptions: undefined, start: newStart, end: addMinutes(newStart, len) };
        doc.events!.push(copy);
        return { doc, ui: { selection: `evt:${copy.id}` } };
      }
      const len = minutesBetween(e.start, e.end);
      e.start = newStart;
      e.end = addMinutes(newStart, len);
      if (e.meeting && (!e.organizer || e.organizer.email === doc.account.email))
        sentCopy(doc, [...(e.required ?? []), ...(e.optional ?? [])], `Updated: ${e.title}`, `New time: ${fmtLong(e.start)} ${fmtTime(e.start)} - ${fmtTime(e.end)}`);
      return { doc, ui: { selection: `evt:${e.id}` } };
    }
    case "event.cancelMeeting":
      if (doc.form?.id) {
        const fid = doc.form.id;
        doc.form = null;
        return deleteSelection(doc, "Delete Series", { ...ui, selection: `evt:${fid}` });
      }
      return deleteSelection(doc, value, ui);
    case "event.deleteOpen":
    case "contact.deleteOpen":
    case "task.deleteOpen":
    case "group.deleteOpen": {
      const f = doc.form;
      if (!f?.id) {
        doc.form = null;
        return { doc };
      }
      const key = id === "event.deleteOpen" ? `evt:${f.id}` : id === "contact.deleteOpen" ? `contact:${f.id}` : id === "task.deleteOpen" ? `task:${f.id}` : `group:${f.id}`;
      doc.form = null;
      return deleteSelection(doc, "Delete Series", { ...ui, selection: key });
    }
    case "event.close":
    case "event.discard":
    case "form.close":
      doc.form = null;
      doc.dialog = null;
      return { doc };
    case "event.view":
      if (doc.form) doc.form.view = sv === "Scheduling Assistant" ? "scheduling" : sv === "Details" ? "details" : "main";
      return { doc };
    case "event.inviteAttendees":
      if (doc.form) doc.form.kind = "meeting";
      return { doc };
    case "event.cancelInvitation":
      if (doc.form) {
        doc.form.kind = "appointment";
        doc.form.data.required = [];
        doc.form.data.optional = [];
      }
      return { doc };
    case "event.reminder":
      if (doc.form) doc.form.data.reminder = sv;
      return { doc };
    case "event.showAs":
      if (doc.form) doc.form.data.showAs = sv as OlShowAs;
      return { doc };
    case "event.teams":
      if (doc.form) doc.form.data.teams = !doc.form.data.teams;
      return { doc };
    case "event.private":
    case "form.private":
      if (doc.form) doc.form.data.private = !doc.form.data.private;
      return { doc };
    case "event.recurrence":
      if (doc.form) doc.form.data.recurrence = parseRecurrence(sv, doc.form.data.start ?? nowOf(doc));
      return { doc };
    case "form.categorize": {
      if (!doc.form) return { doc };
      if (sv === "Clear All Categories") doc.form.data.categories = [];
      else {
        const slot = catSlot(doc, sv);
        if (slot) doc.form.data.categories = toggleCategory(doc.form.data.categories, slot);
      }
      return { doc };
    }
    case "form.followUp":
      if (doc.form) {
        const holder: { flag?: OlFlag | null } = { flag: doc.form.data.flag };
        setFlag(doc, holder, sv);
        doc.form.data.flag = holder.flag;
      }
      return { doc };
    case "form.importanceHigh":
    case "form.importanceLow":
      if (doc.form) {
        const lvl = id === "form.importanceHigh" ? "High" : "Low";
        if (doc.form.kind === "task") doc.form.data.priority = doc.form.data.priority === lvl ? "Normal" : lvl;
        else doc.form.data.importance = doc.form.data.importance === lvl ? undefined : lvl;
      }
      return { doc };
    case "form.view":
      if (doc.form) doc.form.view = sv === "Details" ? "details" : "main";
      return { doc };
    case "evtsel.reminder":
    case "evtsel.showAs":
    case "evtsel.private": {
      const s = selEvent(doc, ui);
      if (!s) return { doc };
      if (id === "evtsel.reminder") s.evt.reminder = sv;
      else if (id === "evtsel.showAs") s.evt.showAs = sv as OlShowAs;
      else s.evt.private = !s.evt.private;
      return { doc };
    }
    case "evtsel.respond": {
      const s = selEvent(doc, ui);
      if (!s) return { doc };
      const base = sv.split(" (")[0];
      if (base === "Decline") {
        if (s.evt.recurrence && s.date) s.evt.exceptions = Array.from(new Set([...(s.evt.exceptions ?? []), s.date]));
        else doc.events = (doc.events ?? []).filter((e) => e.id !== s.evt.id);
        if (s.evt.organizer && s.evt.organizer.email !== doc.account.email) sentCopy(doc, [s.evt.organizer], `Declined: ${s.evt.title}`, s.date && s.evt.recurrence ? `Declined the occurrence on ${fmtLong(s.date)}.` : "");
        return { doc, ui: { selection: "" } };
      }
      s.evt.response = base === "Tentative" ? "Tentative" : "Accepted";
      s.evt.showAs = base === "Tentative" ? "Tentative" : "Busy";
      return { doc };
    }

    /* ---------- tasks ---------- */
    case "task.complete": {
      if (doc.form?.kind === "task" && doc.form.id) {
        const t = (doc.tasks ?? []).find((x) => x.id === doc.form!.id);
        if (t) {
          t.status = "Completed";
          t.percent = 100;
          t.completedOn = todayOf(doc);
        }
        doc.form = null;
        return { doc };
      }
      for (const t of selTasks(doc, ui)) {
        const done = t.status !== "Completed";
        t.status = done ? "Completed" : "Not Started";
        t.percent = done ? 100 : 0;
        t.completedOn = done ? todayOf(doc) : undefined;
      }
      for (const m of msgs) if (m.flag) m.flag = { ...m.flag, complete: !m.flag.complete };
      for (const c of (doc.contacts ?? []).filter((x) => selIds(ui.selection, "contact").includes(x.id))) if (c.flag) c.flag = { ...c.flag, complete: true };
      return { doc };
    }
    case "task.priority": {
      const lvl = (sv || "High") as OlTask["priority"];
      for (const t of selTasks(doc, ui)) t.priority = t.priority === lvl ? "Normal" : lvl;
      for (const m of msgs) m.importance = m.importance === lvl ? undefined : (lvl as "High" | "Low");
      return { doc };
    }
    case "task.removeFromList":
      for (const m of msgs) m.flag = null;
      if (selTasks(doc, ui).length) return deleteSelection(doc, undefined, ui);
      return { doc, ui: { selection: "" } };
    case "task.assign":
      if (doc.form?.kind === "task") doc.form.data.assign = !doc.form.data.assign;
      return { doc };
    case "task.statusReport": {
      const t = doc.form?.id ? (doc.tasks ?? []).find((x) => x.id === doc.form!.id) : selTasks(doc, ui)[0];
      if (!t) return { doc };
      bumpCompose(doc);
      doc.compose = {
        ...composeFor(doc, "new"),
        to: doc.manager ? [doc.manager.email] : [],
        subject: `Task Status Report: ${t.subject}`,
        quoted: `Subject: ${t.subject}\nDue date: ${t.due ? fmtLong(t.due) : "None"}\nStatus: ${t.status ?? "Not Started"}\nPriority: ${t.priority ?? "Normal"}\n% Complete: ${t.percent ?? 0}%`,
      };
      doc.form = null;
      return { doc };
    }
  }
  return { doc };
}

function contactEmails(doc: OutlookDoc, ui: SimUi): string[] {
  const ids = selIds(ui.selection, "contact");
  const gids = selIds(ui.selection, "group");
  const list = (doc.contacts ?? []).filter((x) => ids.includes(x.id) || (doc.form?.kind === "contact" && x.id === doc.form.id)).map((x) => x.email ?? "").filter(Boolean);
  for (const g of (doc.groups ?? []).filter((x) => gids.includes(x.id))) list.push(g.name);
  return list;
}

export function sortedContacts(doc: OutlookDoc): OlContact[] {
  return (doc.contacts ?? []).slice().sort((a, b) => fileAs(a).localeCompare(fileAs(b)));
}
export function fileAs(c: { name: string }): string {
  const parts = c.name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[parts.length - 1]}, ${parts.slice(0, -1).join(" ")}` : c.name;
}

function openItem(doc: OutlookDoc, key: string): Res {
  const k = selKeys(key)[0] ?? "";
  if (k.startsWith("msg:")) {
    const m = doc.messages.find((x) => x.id === k.slice(4));
    if (!m) return { doc };
    if (m.folder === "drafts") {
      bumpCompose(doc);
      const d = m.draft ?? { to: (m.to ?? []).map((p) => p.email), cc: [], bcc: [], subject: m.subject, body: m.body };
      doc.compose = { ...composeFor(doc, "new"), ...d, attachments: m.attachments ?? [], draftId: m.id, body: d.body };
      return { doc };
    }
    m.read = true;
    doc.window = m.id;
    return { doc, ui: { selection: k } };
  }
  if (k.startsWith("evt:")) {
    const e = (doc.events ?? []).find((x) => x.id === k.slice(4).split("@")[0]);
    if (e) doc.form = eventForm(doc, e);
    return { doc };
  }
  if (k.startsWith("contact:")) {
    const ct = (doc.contacts ?? []).find((x) => x.id === k.slice(8).split(".")[0]);
    if (ct) doc.form = formFor(doc, "contact", { name: ct.name, company: ct.company ?? "", jobTitle: ct.jobTitle ?? "", email: ct.email ?? "", phone: ct.phone ?? "", mobile: ct.mobile ?? "", address: ct.address ?? "", notes: ct.notes ?? "", categories: ct.categories, flag: ct.flag }, ct.id);
    return { doc };
  }
  if (k.startsWith("group:")) {
    const g = (doc.groups ?? []).find((x) => x.id === k.slice(6));
    if (g) doc.form = formFor(doc, "group", { name: g.name, members: g.members, notes: g.notes ?? "", categories: g.categories }, g.id);
    return { doc };
  }
  if (k.startsWith("task:")) {
    const t = (doc.tasks ?? []).find((x) => x.id === k.slice(5));
    if (t)
      doc.form = formFor(
        doc,
        "task",
        {
          subject: t.subject, startDate: t.start ? fmtDate(t.start) : "", dueDate: t.due ? fmtDate(t.due) : "", status: t.status ?? "Not Started", priority: t.priority ?? "Normal",
          percent: t.percent ?? 0, reminderOn: Boolean(t.reminder), reminderDate: t.reminder ? fmtDate(t.reminder) : "", reminderTime: t.reminder ? fmtTime(t.reminder) : "8:00 AM",
          notes: t.notes ?? "", categories: t.categories, assignTo: [],
        },
        t.id,
      );
    return { doc };
  }
  return { doc };
}

/* ------------------------------------------------------------------ */
/* Normalize                                                           */
/* ------------------------------------------------------------------ */

const CAL_VIEW_ALIASES: Record<string, string> = { "cal.day": "Day", "cal.workweek": "Work Week", "cal.week": "Week", "cal.month": "Month", "cal.schedule": "Schedule View" };
const TASK_FLAG_ALIASES: Record<string, string> = { "tasks.flagToday": "Today", "tasks.flagTomorrow": "Tomorrow", "tasks.flagThisWeek": "This Week", "tasks.flagNextWeek": "Next Week", "tasks.flagNoDate": "No Date" };
const SCOPE_ALIASES: Record<string, string> = { "search.scopeFolder": "Current Folder", "search.scopeMailbox": "Current Mailbox", "search.scopeAll": "All Mailboxes" };
const EVENT_VIEW_ALIASES: Record<string, string> = { "event.viewMain": "Appointment", "event.viewScheduling": "Scheduling Assistant" };

export function normalizeOutlook(c: SimCommit): SimCommit {
  if (c.kind === "command") {
    if (CAL_VIEW_ALIASES[c.id]) return { kind: "command", id: "cal.view", value: CAL_VIEW_ALIASES[c.id] };
    if (TASK_FLAG_ALIASES[c.id]) return { kind: "command", id: "item.followUp", value: TASK_FLAG_ALIASES[c.id] };
    if (SCOPE_ALIASES[c.id]) return { kind: "command", id: "search.scope", value: SCOPE_ALIASES[c.id] };
    if (EVENT_VIEW_ALIASES[c.id]) return { kind: "command", id: "event.view", value: EVENT_VIEW_ALIASES[c.id] };
    if (c.id === "task.priorityHigh") return { kind: "command", id: "task.priority", value: "High" };
    if (c.id === "task.priorityLow") return { kind: "command", id: "task.priority", value: "Low" };
    if (c.id === "item.followUp" && (c.value === undefined || c.value === "Flag Message")) return { kind: "command", id: "item.followUp", value: "Today" };
    return c;
  }
  if (c.kind === "dialog") {
    const v = c.values;
    const trim = (x: SimValue | undefined) => String(x ?? "").replace(/ /g, " ").trim();
    if (c.id === "moveTo") return { kind: "command", id: "mail.move", value: trim(v.folder) };
    if (c.id === "copyTo") return { kind: "command", id: "mail.copy", value: trim(v.folder) };
    if (c.id === "rulesAlerts") return v.fromOn || v.subjectOn || v.sentToOn ? { kind: "dialog", id: "createRule", values: v } : { kind: "command", id: "rules.viewed" };
    if (c.id === "recurrence") return { kind: "command", id: "event.recurrence", value: JSON.stringify(v) };
    if (c.id === "proposeTimeDecline") return { kind: "dialog", id: "proposeTime", values: { ...v, response: "Decline" } };
    if (c.id === "junkOptions") return { kind: "command", id: "junk.options", value: trim(v.level) };
    if (c.id === "viewSettings") return { kind: "command", id: "view.settings" };
  }
  return c;
}

/* ------------------------------------------------------------------ */
/* Ribbon state & contextual tabs                                      */
/* ------------------------------------------------------------------ */

export function composeVisible(doc: OutlookDoc, ui: SimUi): boolean {
  const c = doc.compose;
  if (!c) return false;
  if (!c.inline) return true;
  return moduleOf(doc) === "mail" && selKeys(ui.selection)[0] === `msg:${c.of}`;
}

export function outlookContextual(doc: OutlookDoc, ui: SimUi): string[] {
  if (doc.compose && !doc.compose.inline) return ["compose"];
  if (doc.form) {
    const k = doc.form.kind;
    if (k === "appointment") return ["apptForm", "eventForm"];
    if (k === "meeting") return ["meetingForm", "eventForm"];
    if (k === "contact") return ["contactForm"];
    if (k === "task") return ["taskForm"];
    return ["groupForm"];
  }
  if (doc.window) return ["readWindow"];
  const mod = moduleOf(doc);
  const keys: string[] = [mod, "main"];
  if (mod === "mail") {
    if (doc.search) keys.push("search");
    if (composeVisible(doc, ui)) keys.push("composeInline");
    else if (selMessage(doc, ui)?.invite && !selMessage(doc, ui)?.invite?.response) keys.push("invite");
  }
  if (mod === "calendar") {
    const s = selEvent(doc, ui);
    if (s) keys.push(s.evt.recurrence ? (s.evt.meeting ? "meetingOccSel" : "apptOccSel") : s.evt.meeting ? "meetingSel" : "apptSel");
  }
  return keys;
}

export function outlookRibbonState(doc: OutlookDoc, ui: SimUi): Record<string, SimValue | undefined> {
  const comp = doc.compose;
  const f = doc.form;
  const cv = doc.calView ?? "Work Week";
  const ev = selEvent(doc, ui)?.evt;
  return {
    "view.conversations": Boolean(doc.conversations),
    "view.focusedInbox": Boolean(doc.focused),
    "cal.day": cv === "Day",
    "cal.workweek": cv === "Work Week",
    "cal.week": cv === "Week",
    "cal.month": cv === "Month",
    "cal.schedule": cv === "Schedule View",
    "message.importanceHigh": comp?.importance === "High",
    "message.importanceLow": comp?.importance === "Low",
    "compose.bcc": Boolean(comp?.showBcc),
    "compose.from": Boolean(comp?.showFrom),
    "options.readReceipt": Boolean(comp?.readReceipt),
    "options.deliveryReceipt": Boolean(comp?.deliveryReceipt),
    "format.bold": Boolean(comp?.format?.bold),
    "format.italic": Boolean(comp?.format?.italic),
    "format.underline": Boolean(comp?.format?.underline),
    "format.fontName": comp?.format?.font ?? "Aptos",
    "format.fontSize": comp?.format?.size ?? "11",
    "format.html": (comp?.format?.type ?? "HTML") === "HTML",
    "format.plain": comp?.format?.type === "Plain Text",
    "format.rich": comp?.format?.type === "Rich Text",
    "event.teams": Boolean(f?.data.teams),
    "event.private": Boolean(f?.data.private),
    "form.private": Boolean(f?.data.private),
    "form.importanceHigh": f?.kind === "task" ? f.data.priority === "High" : f?.data.importance === "High",
    "form.importanceLow": f?.kind === "task" ? f.data.priority === "Low" : f?.data.importance === "Low",
    "event.reminder": f?.data.reminder ?? "15 minutes",
    "event.showAs": f?.data.showAs ?? "Busy",
    "event.viewMain": f?.view !== "scheduling",
    "event.viewScheduling": f?.view === "scheduling",
    "form.viewMain": f?.view !== "details",
    "form.viewDetails": f?.view === "details",
    "task.assign": Boolean(f?.data.assign),
    "evtsel.reminder": ev?.reminder ?? "15 minutes",
    "evtsel.showAs": ev?.showAs ?? "Busy",
    "evtsel.private": Boolean(ev?.private),
    "people.view": doc.peopleView ?? "People",
    "tasks.view": doc.tasksView ?? "To-Do List",
    "mail.arrange": doc.arrange ?? "Date",
    "sendReceive.offline": Boolean(doc.flags?.offline),
    "folder.favorite": (doc.favorites ?? ["inbox", "sent", "deleted"]).includes(selIds(ui.selection, "folder")[0] ?? currentFolder(doc)),
    "search.scopeFolder": doc.searchScope === "Current Folder",
    "search.scopeMailbox": (doc.searchScope ?? "Current Mailbox") === "Current Mailbox",
    "search.scopeAll": doc.searchScope === "All Mailboxes",
    "task.priorityHigh": selTasks(doc, ui)[0]?.priority === "High",
    "task.priorityLow": selTasks(doc, ui)[0]?.priority === "Low",
  };
}

/* ------------------------------------------------------------------ */
/* Dialog defaults and data-driven dialogs                             */
/* ------------------------------------------------------------------ */

export function folderOptions(doc: OutlookDoc, includeRoot = false): string[] {
  const list = folderTree(doc)
    .filter((x) => x.folder.id !== "outbox")
    .map((x) => "   ".repeat(x.depth) + x.folder.name);
  return includeRoot ? [doc.account.email, ...list] : list;
}

export function outlookDialogDefaults(doc: OutlookDoc, ui: SimUi, id: string): Record<string, SimValue> {
  const m = selMessage(doc, ui);
  const today = todayOf(doc);
  const cur = folderById(doc, selIds(ui.selection, "folder")[0] ?? currentFolder(doc))?.name ?? "Inbox";
  switch (id) {
    case "newFolder":
      return { name: "", contains: "Mail and Post Items", parent: cur };
    case "moveTo":
    case "copyTo":
    case "alwaysMove":
      return { folder: folderOptions(doc).find((o) => o.trim() === cur) ?? "Inbox" };
    case "createRule":
    case "rulesAlerts":
      return {
        fromOn: false, from: id === "createRule" ? m?.from.email ?? "" : "", subjectOn: false, subject: id === "createRule" ? m?.subject ?? "" : "", sentToOn: false,
        alert: false, sound: false, moveOn: false, folder: "Inbox", categoryOn: false, category: "Red Category", flagOn: false, flag: "Today", runNow: false,
      };
    case "customFlag": {
      const fl = m?.flag ?? (doc.contacts ?? []).find((x) => selIds(ui.selection, "contact").includes(x.id))?.flag;
      return { flagTo: fl?.label && FLAG_TO.includes(fl.label) ? fl.label : "Follow up", startDate: fmtDate(fl?.start ?? today), dueDate: fmtDate(fl?.due ?? today), reminder: false, reminderDate: fmtDate(fl?.due ?? today), reminderTime: "4:00 PM" };
    }
    case "colorCategories":
      return { category: "Red Category", name: catName(doc, "Red Category"), assign: true };
    case "quickStep":
      return { name: "My Quick Step", action1: "Move to folder", target1: "", action2: "(none)", target2: "", action3: "(none)", target3: "", action4: "(none)", target4: "", shortcut: "Choose a shortcut", tooltip: "" };
    case "proposeTime":
    case "proposeTimeDecline":
      return m?.invite ? { date: fmtDate(m.invite.start), start: fmtTime(m.invite.start), end: fmtTime(m.invite.end) } : { date: fmtDate(today), start: "9:00 AM", end: "9:30 AM" };
    case "scheduleSend":
      return { when: "Tomorrow morning 8:00 AM", date: fmtDate(addDays(today, 1)), time: "8:00 AM" };
    case "delayDelivery":
      return { delayOn: true, date: fmtDate(addDays(today, 1)), time: "8:00 AM" };
    case "attachFile":
      return { file: doc.files?.[0]?.name ?? "", attachAs: "Attach as copy" };
    case "shareCalendar":
      return { person: "", permission: "Can view all details" };
    case "emailCalendar":
      return { calendar: "Calendar", dateRange: "Next 7 days", detail: "Limited details" };
    case "recurrence": {
      const start = doc.form?.data.start ?? nowOf(doc);
      const r = doc.form?.data.recurrence;
      const keys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const days = r?.days ?? [dow(start)];
      const out: Record<string, SimValue> = {
        pattern: r ? ({ daily: "Daily", weekly: "Weekly", monthly: "Monthly", yearly: "Yearly" } as const)[r.freq] : "Weekly",
        every: r?.interval ?? 1, weekdays: Boolean(r?.weekdays), monthDay: r?.day ?? +dateOf(start).slice(8, 10),
        rangeStart: fmtDate(start), range: r?.count ? "End after" : r?.until ? "End by" : "No end date", count: r?.count ?? 10, until: fmtDate(r?.until ?? addDays(dateOf(start), 70)), remove: false,
      };
      keys.forEach((k, i) => (out[k] = days.includes(i)));
      return out;
    }
    case "junkOptions":
      return { level: "Low" };
  }
  return {};
}

const withField = (def: DialogDef, key: string, field: DialogField): DialogDef => {
  const swap = (fs: DialogField[]) => fs.map((f) => ("key" in f && f.key === key ? field : f));
  return { ...def, fields: def.fields ? swap(def.fields) : undefined, tabs: def.tabs?.map((t) => ({ ...t, fields: swap(t.fields) })) };
};

export function outlookDialogDef(doc: OutlookDoc, ui: SimUi, id: string, base: DialogDef | undefined): DialogDef | undefined {
  if (!base) return undefined;
  const m = selMessage(doc, ui);
  const folders = folderOptions(doc);
  switch (id) {
    case "newFolder":
      return withField(base, "parent", { type: "list", key: "parent", label: "Select where to place the folder:", options: folderOptions(doc, true), height: 130 });
    case "moveTo":
    case "copyTo":
      return withField(base, "folder", { type: "list", key: "folder", label: id === "moveTo" ? "Move the selected items to the folder:" : "Copy the selected items to the folder:", options: folders, height: 170 });
    case "alwaysMove":
      return withField({ ...base, title: "Rules and Alerts" }, "folder", { type: "list", key: "folder", label: `Always move messages from: ${m?.from.name ?? "this sender"}`, options: folders, height: 160 });
    case "createRule": {
      let d = withField(base, "fromOn", { type: "checkbox", key: "fromOn", label: `From ${m?.from.name ?? "sender"}` });
      d = withField(d, "folder", { type: "select", key: "folder", label: "Folder:", options: folders.map((f) => f.trim()) });
      return d;
    }
    case "rulesAlerts": {
      const list = (doc.rules ?? []).map((r) => `☑ ${r.name}${r.moveTo ? ` → move to ${r.moveTo}` : ""}`);
      let d = withField(base, "existing", { type: "note", text: list.length ? `Your rules: ${list.join(";  ")}` : "You have no rules yet. Fill in the conditions and actions below to create one." });
      d = withField(d, "folder", { type: "select", key: "folder", label: "Folder:", options: folders.map((f) => f.trim()) });
      return d;
    }
    case "attachFile": {
      const files = doc.files ?? [];
      return withField(base, "file", { type: "list", key: "file", label: "Recent Items, OneDrive and This PC:", options: files.length ? files.map((f) => f.name) : ["(no files)"], height: 150 });
    }
    case "proposeTime":
    case "proposeTimeDecline": {
      const inv = m?.invite;
      if (!inv) return base;
      const busy = conflictsWith(doc, inv.start, inv.end, inv.eventId).map((o) => `${o.evt.title} (${fmtTime(o.start)}-${fmtTime(o.end)})`);
      return { ...withField(base, "info", { type: "note", text: `Current meeting time: ${fmtLong(inv.start)} ${fmtTime(inv.start)} - ${fmtTime(inv.end)}.${busy.length ? ` Conflicts with: ${busy.join(", ")}.` : ""}` }), title: `Propose New Time: ${inv.title}` };
    }
    case "colorCategories": {
      const names = CATEGORY_SLOTS.map((sl) => (catName(doc, sl) === sl ? sl : `${sl} (now "${catName(doc, sl)}")`));
      return withField(base, "current", { type: "note", text: `Categories: ${names.join(", ")}` });
    }
  }
  return base;
}

export const MONTH_NAMES = MONTHS;
