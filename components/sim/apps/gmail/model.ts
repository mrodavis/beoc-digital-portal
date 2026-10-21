import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import type {
  GmBox,
  GmCalendar,
  GmCategory,
  GmEvent,
  GmGuest,
  GmMeeting,
  GmMessage,
  GmPerson,
  GmRoom,
  GmailDoc,
  GmSettings,
} from "./types";

/* ------------------------------------------------------------------ */
/* Dates and times                                                     */
/* ------------------------------------------------------------------ */

export const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const DAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const MON_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MON_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const todayOf = (doc: GmailDoc) => doc.today ?? "2026-10-21";
export const nowOf = (doc: GmailDoc) => doc.now ?? "10:02";

function parts(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m, d };
}
function utc(iso: string): Date {
  const { y, m, d } = parts(iso);
  return new Date(Date.UTC(y, m - 1, d));
}
export function isoOf(dt: Date): string {
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}
export function addDays(iso: string, n: number): string {
  const dt = utc(iso);
  dt.setUTCDate(dt.getUTCDate() + n);
  return isoOf(dt);
}
export const weekday = (iso: string) => utc(iso).getUTCDay();
export function weekStart(iso: string): string {
  return addDays(iso, -weekday(iso));
}
export function dayDiff(a: string, b: string): number {
  return Math.round((utc(b).getTime() - utc(a).getTime()) / 86400000);
}
/** "Thu, Oct 22" */
export function fmtDay(iso: string): string {
  const { m, d } = parts(iso);
  return `${DAY_SHORT[weekday(iso)]}, ${MON_SHORT[m - 1]} ${d}`;
}
/** "Thu, Oct 22, 2026" */
export function fmtDayYear(iso: string): string {
  return `${fmtDay(iso)}, ${parts(iso).y}`;
}
/** "Thursday, October 22" */
export function fmtLongDay(iso: string): string {
  const { m, d } = parts(iso);
  return `${DAY_LONG[weekday(iso)]}, ${MON_LONG[m - 1]} ${d}`;
}
/** "Oct 22, 2026" */
export function fmtMonthDayYear(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${MON_SHORT[m - 1]} ${d}, ${y}`;
}
/** "13:30" → "1:30 PM" */
export function fmtTime(t?: string): string {
  if (!t) return "";
  const [h, mi] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(mi).padStart(2, "0")} ${ap}`;
}
/** "1:30 PM" / "1:30pm" / "13:30" → "13:30" (or "" when unreadable). */
export function parseTime(s: string): string {
  const m = /^\s*(\d{1,2})(?::(\d{2}))?\s*([ap])?\.?m?\.?\s*$/i.exec(s);
  if (!m) return "";
  let h = Number(m[1]);
  const mi = Number(m[2] ?? 0);
  const ap = m[3]?.toLowerCase();
  if (ap === "p" && h < 12) h += 12;
  if (ap === "a" && h === 12) h = 0;
  if (h > 23 || mi > 59) return "";
  return `${String(h).padStart(2, "0")}:${String(mi).padStart(2, "0")}`;
}
export function minutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
export function fromMinutes(n: number): string {
  const v = Math.max(0, Math.min(24 * 60 - 1, n));
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
}
/** Mail list date: a time today, "Oct 18" earlier this year, "10/2/25" before. */
export function listDate(doc: GmailDoc, iso: string): string {
  const day = iso.slice(0, 10);
  if (day === todayOf(doc)) return fmtTime(iso.slice(11, 16));
  const { y, m, d } = parts(day);
  if (y === parts(todayOf(doc)).y) return `${MON_SHORT[m - 1]} ${d}`;
  return `${m}/${d}/${String(y).slice(2)}`;
}
/** Date line in an open message: "Wed, Oct 21, 9:42 AM (20 minutes ago)". */
export function longDate(doc: GmailDoc, iso: string): string {
  const day = iso.slice(0, 10);
  const t = fmtTime(iso.slice(11, 16));
  const base = `${fmtDay(day)}${parts(day).y !== parts(todayOf(doc)).y ? `, ${parts(day).y}` : ""}, ${t}`;
  const days = dayDiff(day, todayOf(doc));
  if (days === 0) {
    const mins = minutes(nowOf(doc)) - minutes(iso.slice(11, 16));
    if (mins >= 0 && mins < 60) return `${base} (${mins} minute${mins === 1 ? "" : "s"} ago)`;
    if (mins >= 60) return `${base} (${Math.floor(mins / 60)} hour${Math.floor(mins / 60) === 1 ? "" : "s"} ago)`;
  }
  if (days > 0 && days < 7) return `${base} (${days} day${days === 1 ? "" : "s"} ago)`;
  return base;
}

/** Gmail's Snooze choices from "now". */
export function snoozeChoices(doc: GmailDoc): { label: string; when: string }[] {
  const t = todayOf(doc);
  const wd = weekday(t);
  const sat = addDays(t, (6 - wd + 7) % 7 || 7);
  const mon = addDays(t, (1 - wd + 7) % 7 || 7);
  return [
    { label: "Later today", when: `${fmtDay(t)}, 6:00 PM` },
    { label: "Tomorrow", when: `${fmtDay(addDays(t, 1))}, 8:00 AM` },
    { label: "This weekend", when: `${fmtDay(sat)}, 8:00 AM` },
    { label: "Next week", when: `${fmtDay(mon)}, 8:00 AM` },
  ];
}

/** Schedule send suggestions from "now". */
export function scheduleChoices(doc: GmailDoc): { label: string; when: string }[] {
  const t = todayOf(doc);
  const wd = weekday(t);
  const mon = addDays(t, (1 - wd + 7) % 7 || 7);
  return [
    { label: "Tomorrow morning", when: `${fmtDay(addDays(t, 1))}, 8:00 AM` },
    { label: "Tomorrow afternoon", when: `${fmtDay(addDays(t, 1))}, 1:00 PM` },
    { label: "Monday morning", when: `${fmtDay(mon)}, 8:00 AM` },
  ];
}

/* ------------------------------------------------------------------ */
/* People and messages                                                 */
/* ------------------------------------------------------------------ */

export function personOf(doc: GmailDoc, email: string): GmPerson {
  if (email === "me" || email.toLowerCase() === doc.me.email.toLowerCase()) return doc.me;
  const p = doc.people.find((x) => x.email.toLowerCase() === email.toLowerCase());
  if (p) return p;
  const local = email.split("@")[0] ?? email;
  return { name: local, email };
}
export const emailOf = (doc: GmailDoc, e: string) => (e === "me" ? doc.me.email : e);
export const nameOf = (doc: GmailDoc, e: string) => (e === "me" || e.toLowerCase() === doc.me.email.toLowerCase() ? "me" : personOf(doc, e).name);

export const threadOf = (m: GmMessage) => m.thread ?? m.id;
export const msgOf = (doc: GmailDoc, id: string) => doc.messages.find((m) => m.id === id);
export function threadMessages(doc: GmailDoc, thread: string): GmMessage[] {
  return doc.messages.filter((m) => threadOf(m) === thread).sort((a, b) => a.date.localeCompare(b.date));
}

/** Message ids in the selection ("msg:a,msg:b"). */
export function selectedIds(ui: { selection: string }): string[] {
  return ui.selection
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("msg:"))
    .map((s) => s.slice(4));
}

export const categoriesOn = (doc: GmailDoc): GmCategory[] => doc.settings?.categories ?? ["Primary", "Promotions", "Social", "Updates"];
export const CATEGORY_ORDER: GmCategory[] = ["Primary", "Promotions", "Social", "Updates", "Forums"];

/** The tab a message shows under (Primary when its category is turned off). */
export function tabOf(doc: GmailDoc, m: GmMessage): GmCategory {
  const c = m.category ?? "Primary";
  return categoriesOn(doc).includes(c) ? c : "Primary";
}

const NOT_SEARCHED: GmBox[] = ["spam", "trash"];

export function inFolder(doc: GmailDoc, m: GmMessage, folder: string): boolean {
  switch (folder) {
    case "inbox":
      return m.box === "inbox";
    case "starred":
      return Boolean(m.starred) && !NOT_SEARCHED.includes(m.box);
    case "snoozed":
      return m.box === "snoozed";
    case "sent":
      return m.from === "me" && m.box !== "drafts" && m.box !== "scheduled" && !NOT_SEARCHED.includes(m.box);
    case "drafts":
      return m.box === "drafts";
    case "scheduled":
      return m.box === "scheduled";
    case "important":
      return Boolean(m.important) && !NOT_SEARCHED.includes(m.box);
    case "all":
      return !NOT_SEARCHED.includes(m.box) && m.box !== "drafts" && m.box !== "scheduled";
    case "spam":
      return m.box === "spam";
    case "trash":
      return m.box === "trash";
    default:
      if (folder.startsWith("label:")) return (m.labels ?? []).some((l) => l.toLowerCase() === folder.slice(6).toLowerCase()) && !NOT_SEARCHED.includes(m.box);
      return false;
  }
}

/** Conversations to list: the newest matching message of each thread, newest first. */
export function conversations(doc: GmailDoc, matches: (m: GmMessage) => boolean): { last: GmMessage; count: number; all: GmMessage[] }[] {
  const by = new Map<string, GmMessage[]>();
  for (const m of doc.messages) {
    if (!matches(m)) continue;
    const t = threadOf(m);
    by.set(t, [...(by.get(t) ?? []), m]);
  }
  const out: { last: GmMessage; count: number; all: GmMessage[] }[] = [];
  for (const [t, list] of by) {
    const all = threadMessages(doc, t);
    const sorted = list.sort((a, b) => a.date.localeCompare(b.date));
    out.push({ last: sorted[sorted.length - 1], count: all.filter((x) => x.box !== "drafts").length, all });
  }
  return out.sort((a, b) => b.last.date.localeCompare(a.last.date));
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

function tokenize(q: string): string[] {
  const out: string[] = [];
  const re = /(-?[a-z_]+:"[^"]*"|-?[a-z_]+:\([^)]*\)|-?"[^"]*"|\S+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(q))) out.push(m[1]);
  return out;
}

/**
 * Canonical form of a search, so equivalent queries compare equal: lowercase,
 * single spaces, terms sorted (queries with OR, braces or parentheses keep their order).
 */
export function canonicalQuery(q: string): string {
  const t = q.replace(/[“”]/g, '"').trim().replace(/\s+/g, " ").toLowerCase();
  if (/\bor\b|[{}()]/.test(t)) return t;
  return tokenize(t).sort().join(" ");
}

function sizeMb(s: string): number {
  const m = /^(\d+(?:\.\d+)?)\s*([kmg]?)b?$/i.exec(s.trim());
  if (!m) return NaN;
  const n = Number(m[1]);
  const u = m[2].toLowerCase();
  return u === "k" ? n / 1024 : u === "g" ? n * 1024 : u === "m" ? n : n / (1024 * 1024);
}
function attachMb(a: { size?: string; mb?: number }): number {
  if (a.mb !== undefined) return a.mb;
  const m = /([\d.]+)\s*(KB|MB|GB)/i.exec(a.size ?? "");
  if (!m) return 0;
  return sizeMb(`${m[1]}${m[2][0]}`);
}

function textOf(doc: GmailDoc, m: GmMessage): string {
  const who = [m.from, ...m.to, ...(m.cc ?? [])].map((e) => `${personOf(doc, e).name} ${emailOf(doc, e)}`).join(" ");
  return `${m.subject} ${m.body} ${who} ${(m.attachments ?? []).map((a) => a.name).join(" ")}`.toLowerCase();
}

function personMatches(doc: GmailDoc, emails: string[], v: string): boolean {
  const q = v.replace(/^"|"$/g, "").toLowerCase();
  return emails.some((e) => {
    if (q === "me") return e === "me" || e.toLowerCase() === doc.me.email.toLowerCase();
    const p = personOf(doc, e);
    return emailOf(doc, e).toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
  });
}

function dateOk(v: string): string | null {
  const m = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(v) ?? /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(v);
  if (!m) return null;
  return v.includes("/") && m[1].length === 4 ? `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}` : `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

function termMatches(doc: GmailDoc, m: GmMessage, term: string): boolean {
  const neg = term.startsWith("-") && term.length > 1;
  const t = neg ? term.slice(1) : term;
  const r = ((): boolean => {
    const op = /^([a-z_]+):(.*)$/i.exec(t);
    if (op) {
      const key = op[1].toLowerCase();
      const val = op[2].replace(/^[("]+|[)"]+$/g, "").toLowerCase();
      switch (key) {
        case "from": return personMatches(doc, [m.from], val);
        case "to": return personMatches(doc, m.to, val);
        case "cc": return personMatches(doc, m.cc ?? [], val);
        case "bcc": return personMatches(doc, m.bcc ?? [], val);
        case "subject": return m.subject.toLowerCase().includes(val);
        case "has":
          if (val === "attachment") return (m.attachments ?? []).length > 0;
          if (val === "drive") return (m.attachments ?? []).some((a) => a.drive);
          if (val === "userlabels") return (m.labels ?? []).length > 0;
          if (val === "yellow-star") return Boolean(m.starred);
          return false;
        case "filename": return (m.attachments ?? []).some((a) => a.name.toLowerCase().includes(val));
        case "is":
          if (val === "unread") return Boolean(m.unread);
          if (val === "read") return !m.unread;
          if (val === "starred") return Boolean(m.starred);
          if (val === "important") return Boolean(m.important);
          if (val === "snoozed") return m.box === "snoozed";
          return false;
        case "in":
          if (val === "anywhere") return true;
          if (val === "inbox") return m.box === "inbox";
          if (val === "sent") return m.from === "me";
          return m.box === val;
        case "label": return (m.labels ?? []).some((l) => l.toLowerCase().replace(/[\s/]+/g, "-") === val.replace(/[\s/]+/g, "-") || l.toLowerCase() === val);
        case "category": return (m.category ?? "Primary").toLowerCase() === val;
        case "older_than":
        case "newer_than": {
          const n = /^(\d+)([dmy])$/.exec(val);
          if (!n) return false;
          const days = Number(n[1]) * (n[2] === "d" ? 1 : n[2] === "m" ? 30 : 365);
          const age = dayDiff(m.date.slice(0, 10), todayOf(doc));
          return key === "older_than" ? age > days : age < days;
        }
        case "after":
        case "before":
        case "older":
        case "newer": {
          const d = dateOk(val);
          if (!d) return false;
          return key === "after" || key === "newer" ? m.date.slice(0, 10) >= d : m.date.slice(0, 10) < d;
        }
        case "larger":
        case "smaller": {
          const lim = sizeMb(val);
          const total = (m.attachments ?? []).reduce((s, a) => s + attachMb(a), 0);
          return key === "larger" ? total > lim : total < lim;
        }
        default:
          return textOf(doc, m).includes(t.toLowerCase());
      }
    }
    return textOf(doc, m).includes(t.replace(/^"|"$/g, "").toLowerCase());
  })();
  return neg ? !r : r;
}

/** Does a message match a Gmail search? Spam and Trash are skipped unless the query names them. */
export function matchesQuery(doc: GmailDoc, m: GmMessage, q: string): boolean {
  const query = q.trim();
  if (!query) return false;
  if (!/\bin:(anywhere|spam|trash|drafts|scheduled)\b/i.test(query) && (NOT_SEARCHED.includes(m.box) || m.box === "drafts" || m.box === "scheduled")) return false;
  // OR between terms ("from:amy OR from:david", "{from:amy from:david}").
  const braces = /^\{(.*)\}$/.exec(query);
  if (braces) return tokenize(braces[1]).some((t) => termMatches(doc, m, t));
  if (/\sOR\s/i.test(query)) return query.split(/\s+OR\s+/i).some((part) => tokenize(part).every((t) => termMatches(doc, m, t)));
  return tokenize(query).every((t) => termMatches(doc, m, t));
}

/* ------------------------------------------------------------------ */
/* Forms ("Field: value" lines)                                        */
/* ------------------------------------------------------------------ */

export function linesOf(value: string): { key: string; val: string }[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(":");
      return i > 0 ? { key: l.slice(0, i).trim(), val: l.slice(i + 1).trim() } : { key: l, val: "" };
    });
}
const field = (ls: { key: string; val: string }[], k: string) => ls.find((l) => l.key.toLowerCase() === k.toLowerCase())?.val;
const fields = (ls: { key: string; val: string }[], k: string) => ls.filter((l) => l.key.toLowerCase() === k.toLowerCase()).map((l) => l.val);

/** A form's body text can span lines: everything after "Body:" (or another last field). */
function tail(value: string, key: string): string {
  const i = value.indexOf(`\n${key}:`);
  const j = value.startsWith(`${key}:`) ? 0 : i >= 0 ? i + 1 : -1;
  if (j < 0) return "";
  return value.slice(j + key.length + 1).trim();
}

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

export const PERMISSIONS = [
  "See only free/busy (hide details)",
  "See event details",
  "Make changes (see private events as free/busy)",
  "Make changes and see event details",
  "Make changes and manage sharing",
];
export const REPEATS = (iso: string) => [
  "Does not repeat",
  "Daily",
  `Weekly on ${DAY_LONG[weekday(iso)]}`,
  `Monthly on the ${ordinal(Math.ceil(parts(iso).d / 7))} ${DAY_LONG[weekday(iso)]}`,
  `Annually on ${MON_LONG[parts(iso).m - 1]} ${parts(iso).d}`,
  "Every weekday (Monday to Friday)",
];
function ordinal(n: number) {
  return ["first", "second", "third", "fourth", "last"][Math.min(4, n - 1)];
}
export const TIME_ZONES = [
  "(GMT-04:00) Eastern Time - New York",
  "(GMT-05:00) Central Time - Chicago",
  "(GMT-06:00) Mountain Time - Denver",
  "(GMT-07:00) Pacific Time - Los Angeles",
  "(GMT-03:00) Atlantic Time - Puerto Rico",
  "(GMT+01:00) Central European Time - Paris",
];
/** "(GMT-07:00) Pacific Time - Los Angeles" → -420 (minutes from GMT). */
export function tzOffset(label?: string): number {
  const m = /\(GMT([+-])(\d{2}):(\d{2})\)/.exec(label ?? "");
  if (!m) return -240;
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]));
}
export const primaryZone = (doc: GmailDoc) => String(doc.flags?.tz || TIME_ZONES[0]);
/** Minutes to add to an event's own times to show them in your primary time zone. */
export function zoneShift(doc: GmailDoc, e: { timeZone?: string }): number {
  if (!e.timeZone) return 0;
  return tzOffset(primaryZone(doc)) - tzOffset(e.timeZone);
}
export const calendarsOf = (doc: GmailDoc): GmCalendar[] => doc.calendars ?? [{ id: "main", name: doc.me.name, color: "#039be5", mine: true }];
export const calOf = (doc: GmailDoc, id: string) => calendarsOf(doc).find((c) => c.id === id);
export const eventOf = (doc: GmailDoc, id: string) => (doc.events ?? []).find((e) => e.id === id);
export const roomOf = (doc: GmailDoc, code: string) => (doc.rooms ?? []).find((r) => r.code === code);

function parseDate(s: string, fallback: string): string {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (iso) return s.trim();
  const m = /([A-Za-z]{3})[a-z]*\.? (\d{1,2})(?:, (\d{4}))?/.exec(s);
  if (!m) return fallback;
  const mi = MON_SHORT.findIndex((x) => x.toLowerCase() === m[1].toLowerCase());
  if (mi < 0) return fallback;
  const y = m[3] ? Number(m[3]) : parts(fallback).y;
  return `${y}-${String(mi + 1).padStart(2, "0")}-${String(Number(m[2])).padStart(2, "0")}`;
}

function eventFromForm(doc: GmailDoc, value: string, base?: GmEvent): GmEvent {
  const ls = linesOf(value);
  const day = parseDate(field(ls, "Date") ?? "", base?.day ?? todayOf(doc));
  const allDay = (field(ls, "All day") ?? "").toLowerCase() === "yes";
  const guests: GmGuest[] = [
    ...fields(ls, "Guest").map((email) => ({ email, response: base?.guests?.find((g) => g.email === email)?.response ?? ("Awaiting" as const) })),
    ...fields(ls, "Optional").map((email) => ({ email, optional: true, response: "Awaiting" as const })),
  ];
  const cal = calendarsOf(doc).find((c) => c.name === field(ls, "Calendar"))?.id ?? base?.calendar ?? calendarsOf(doc).find((c) => c.mine)?.id ?? "main";
  const meet = (field(ls, "Google Meet") ?? "").toLowerCase() === "yes" ? base?.meet ?? newCode(doc) : undefined;
  const notes = [...fields(ls, "Notification"), ...fields(ls, "Email").map((x) => `Email: ${x}`)];
  return {
    ...(base ?? {}),
    id: base?.id ?? `e${(doc.seq ?? 0) + 1}`,
    title: field(ls, "Title") || "(No title)",
    day,
    start: allDay ? undefined : parseTime(field(ls, "Start") ?? "") || base?.start || "09:00",
    end: allDay ? undefined : parseTime(field(ls, "End") ?? "") || base?.end || "10:00",
    allDay,
    calendar: cal,
    guests: guests.length ? guests : undefined,
    meet,
    location: field(ls, "Location") || undefined,
    description: tail(value, "Description") || undefined,
    repeat: field(ls, "Repeat") && field(ls, "Repeat") !== "Does not repeat" ? field(ls, "Repeat") : undefined,
    notifications: notes.length ? notes : undefined,
    timeZone: field(ls, "Time zone") || base?.timeZone,
    guestPerms: (field(ls, "Guests can") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    kind: base?.kind ?? "event",
  };
}

function newCode(doc: GmailDoc): string {
  const n = (doc.seq ?? 0) + 7;
  const a = "abcdefghjkmnpqrstuvwxyz";
  const pick = (k: number, len: number) => Array.from({ length: len }, (_, i) => a[(k * 7 + i * 5 + n) % a.length]).join("");
  return `${pick(1, 3)}-${pick(2, 4)}-${pick(3, 3)}`;
}

/* ------------------------------------------------------------------ */
/* Meet                                                                */
/* ------------------------------------------------------------------ */

function startMeeting(doc: GmailDoc, room: GmRoom): GmMeeting {
  return {
    code: room.code,
    stage: "prejoin",
    mic: doc.flags?.micOff ? false : true,
    camera: doc.flags?.cameraOff ? false : true,
    effect: "None",
    chat: [...(room.chat ?? [])],
    participants: room.participants.map((p) => ({ ...p })),
    layout: "Auto (dynamic)",
  };
}

/* ------------------------------------------------------------------ */
/* Apply                                                               */
/* ------------------------------------------------------------------ */

function bump(doc: GmailDoc): GmailDoc {
  return { ...doc, seq: (doc.seq ?? 0) + 1 };
}
const nowIso = (doc: GmailDoc) => `${todayOf(doc)}T${nowOf(doc)}`;

function mapThreads(doc: GmailDoc, ids: string[], f: (m: GmMessage) => GmMessage): GmailDoc {
  const threads = new Set(ids.map((id) => msgOf(doc, id)).filter(Boolean).map((m) => threadOf(m!)));
  return { ...doc, messages: doc.messages.map((m) => (threads.has(threadOf(m)) ? f(m) : m)) };
}
const movable = (m: GmMessage) => m.box !== "drafts" && m.box !== "scheduled" && !(m.from === "me" && m.box === "sent");

function moveTo(doc: GmailDoc, ids: string[], box: GmBox, extra: Partial<GmMessage> = {}): GmailDoc {
  return mapThreads(doc, ids, (m) => (movable(m) ? { ...m, prevBox: box === "trash" || box === "spam" ? m.box : m.prevBox, box, ...extra } : m));
}

function closeOpen(doc: GmailDoc, ids: string[]): GmailDoc {
  const open = doc.view?.open;
  if (!open) return doc;
  const threads = ids.map((id) => msgOf(doc, id)).filter(Boolean).map((m) => threadOf(m!));
  return threads.includes(open) ? { ...doc, view: { ...doc.view, open: null } } : doc;
}

function toast(doc: GmailDoc, text: string, undo?: string, view?: string): GmailDoc {
  return { ...doc, toast: { text, undo, view } };
}

function plural(ids: string[], one: string, many: string) {
  return ids.length > 1 ? `${ids.length} ${many}` : one;
}

/** Messages a filter's criteria lines match. */
export function filterQuery(lines: string[]): string {
  const ls = lines.map((l) => {
    const i = l.indexOf(":");
    return i > 0 ? { key: l.slice(0, i).trim(), val: l.slice(i + 1).trim() } : { key: l.trim(), val: "" };
  });
  const q: string[] = [];
  const quote = (v: string) => (/\s/.test(v) ? `"${v}"` : v);
  const f = (k: string) => field(ls, k);
  if (f("From")) q.push(`from:${quote(f("From")!)}`);
  if (f("To")) q.push(`to:${quote(f("To")!)}`);
  if (f("Subject")) q.push(`subject:${quote(f("Subject")!)}`);
  if (f("Has the words")) q.push(f("Has the words")!);
  if (f("Doesn't have")) q.push(...f("Doesn't have")!.split(/\s+/).map((w) => `-${w}`));
  if (ls.some((l) => l.key === "Has attachment")) q.push("has:attachment");
  return q.join(" ");
}

function applyFilterActions(doc: GmailDoc, lines: string[]): GmailDoc {
  const q = filterQuery(lines);
  if (!q) return doc;
  const ls = linesOf(lines.join("\n"));
  const has = (k: string) => ls.some((l) => l.key === k);
  const label = field(ls, "Apply the label");
  const cat = field(ls, "Categorize as") as GmCategory | undefined;
  return {
    ...doc,
    messages: doc.messages.map((m) => {
      if (m.from === "me" || !matchesQuery(doc, m, q)) return m;
      let n = { ...m };
      if (has("Skip the Inbox (Archive it)") && n.box === "inbox") n.box = "archive";
      if (has("Mark as read")) n.unread = false;
      if (has("Star it")) n.starred = true;
      if (label) n.labels = Array.from(new Set([...(n.labels ?? []), label]));
      if (has("Delete it")) n = { ...n, prevBox: n.box, box: "trash" };
      if (has("Always mark it as important")) n.important = true;
      if (has("Never mark it as important")) n.important = false;
      if (cat) n.category = cat;
      return n;
    }),
  };
}

function sendMessage(doc: GmailDoc, target: string, value: string): GmailDoc {
  const ls = linesOf(value);
  const [, mode, ref] = target.split(":");
  const orig = ref ? msgOf(doc, ref) : undefined;
  const id = `s${(doc.seq ?? 0) + 1}`;
  const send = field(ls, "Send") ?? "Now";
  const scheduled = /^scheduled\s+(.*)$/i.exec(send)?.[1];
  const attachments = [
    ...fields(ls, "Attachment").map((name) => ({ name, ...(doc.computer?.find((c) => c.name === name) ?? {}) })),
    ...fields(ls, "Drive link").map((name) => ({ name, drive: true })),
  ];
  const subject = field(ls, "Subject") ?? (orig ? `${mode === "forward" ? "Fwd" : "Re"}: ${orig.subject.replace(/^(re|fwd):\s*/i, "")}` : "");
  const msg: GmMessage = {
    id,
    thread: orig ? threadOf(orig) : undefined,
    from: "me",
    to: fields(ls, "To"),
    cc: fields(ls, "Cc"),
    bcc: fields(ls, "Bcc"),
    subject: subject || "(no subject)",
    body: tail(value, "Body"),
    date: nowIso(doc),
    box: scheduled ? "scheduled" : "sent",
    attachments: attachments.length ? attachments : undefined,
    scheduledFor: scheduled,
    confidential: field(ls, "Confidential"),
    signature: field(ls, "Signature"),
  };
  let d: GmailDoc = { ...bump(doc), messages: [...doc.messages, msg], lastSent: { target, seq: (doc.seq ?? 0) + 1 }, reopen: null };
  // Drive files get shared with the recipients when the sender chose a role.
  const access = field(ls, "Drive access");
  if (access && access !== "Don't give access" && d.drive) {
    const names = new Set(fields(ls, "Drive link"));
    const who = [...msg.to, ...(msg.cc ?? []), ...(msg.bcc ?? [])];
    d = { ...d, drive: d.drive!.map((f) => (names.has(f.name) ? { ...f, sharedWith: Array.from(new Set([...(f.sharedWith ?? []), ...who])) } : f)) };
  }
  return toast(d, scheduled ? `Send scheduled for ${scheduled}` : "Message sent", id, id);
}

export function applyGmail(doc: GmailDoc, c: SimCommit, ui: SimUi): { doc: GmailDoc; ui?: Partial<SimUi> } {
  // Any action clears the last notice.
  let d: GmailDoc = doc.toast ? { ...doc, toast: null } : doc;
  const ids = selectedIds(ui);
  const view = d.view ?? {};
  const sel = ui.selection;

  if (c.kind === "type") {
    const t = c.target;
    const v = c.value;
    if (t.startsWith("send:")) return { doc: sendMessage(d, t, v) };
    if (t === "newlabel") {
      const name = v.trim();
      if (!name || (d.labels ?? []).some((l) => l.name === name)) return { doc: d };
      return { doc: toast({ ...d, labels: [...(d.labels ?? []), { name }] }, `Label "${name}" created.`) };
    }
    if (t === "filter") {
      const lines = v.split("\n").map((l) => l.trim()).filter(Boolean);
      d = { ...bump(d), filters: [...(d.filters ?? []), { id: `f${(d.seq ?? 0) + 1}`, lines }] };
      if (lines.some((l) => l.startsWith("Also apply filter"))) d = applyFilterActions(d, lines);
      return { doc: toast(d, "Your filter was created.") };
    }
    if (t === "categories" || t === "settings:inbox" || t === "settings:general") {
      const ls = linesOf(v);
      const s: GmSettings = { ...(d.settings ?? {}) };
      const cats = field(ls, "Categories");
      if (cats !== undefined) s.categories = Array.from(new Set(["Primary", ...cats.split(",").map((x) => x.trim()).filter(Boolean)])) as GmCategory[];
      const imp = field(ls, "Importance markers");
      if (imp) s.importanceMarkers = imp === "Show markers";
      if (t === "settings:general") {
        const u = Number((field(ls, "Undo Send") ?? "").replace(/\D/g, ""));
        if (u) s.undoSend = u;
        const r = field(ls, "Default reply behavior");
        if (r === "Reply" || r === "Reply all") s.replyDefault = r;
        const sigs = fields(ls, "Signature");
        if (sigs.length) s.signatures = sigs.map((x) => { const i = x.indexOf("="); return { name: x.slice(0, i).trim(), text: x.slice(i + 1).trim().replace(/ \/ /g, "\n") }; });
        const sn = field(ls, "For new emails use");
        if (sn !== undefined) s.sigNew = sn === "No signature" ? undefined : sn;
        const sr = field(ls, "On reply/forward use");
        if (sr !== undefined) s.sigReply = sr === "No signature" ? undefined : sr;
        const vac = field(ls, "Vacation responder");
        if (vac) {
          s.vacation = {
            on: vac === "on",
            first: field(ls, "First day"),
            last: field(ls, "Last day") === "none" ? undefined : field(ls, "Last day"),
            subject: field(ls, "Subject"),
            message: field(ls, "Message"),
            contactsOnly: field(ls, "Only send a response to people in my Contacts") === "yes",
          };
        }
      }
      d = { ...d, settings: s };
      if (t !== "categories") d = { ...d, view: { ...view, settings: null, folder: "inbox", open: null } };
      return { doc: toast(d, t === "categories" ? "Inbox tabs updated." : "Your preferences have been saved.") };
    }
    if (t === "event:new" || t.startsWith("event:")) {
      const id = t.slice(6);
      const base = id === "new" ? undefined : eventOf(d, id);
      const ev = eventFromForm(d, v, base);
      d = bump(d);
      const events = base ? (d.events ?? []).map((e) => (e.id === base.id ? ev : e)) : [...(d.events ?? []), ev];
      const invited = (field(linesOf(v), "Invitations") ?? "") === "Send";
      return { doc: toast({ ...d, events, view: { ...view, calPage: null, calDate: ev.day } }, invited ? "Event saved. Invitations sent." : "Event saved"), ui: { selection: "" } };
    }
    if (t === "task:new") {
      const ls = linesOf(v);
      const ev: GmEvent = {
        id: `t${(d.seq ?? 0) + 1}`,
        kind: "task",
        title: field(ls, "Title") || "(No title)",
        day: parseDate(field(ls, "Date") ?? "", todayOf(d)),
        start: parseTime(field(ls, "Time") ?? "") || undefined,
        allDay: !parseTime(field(ls, "Time") ?? ""),
        calendar: "tasks",
        description: tail(v, "Description") || undefined,
      };
      d = bump(d);
      return { doc: toast({ ...d, events: [...(d.events ?? []), ev] }, "Task created") };
    }
    if (t === "appointments:new") {
      const ls = linesOf(v);
      const avail = fields(ls, "Availability");
      const start = weekStart(view.calDate ?? todayOf(d));
      const evs: GmEvent[] = [];
      avail.forEach((a, i) => {
        const m = /^(\w{3})\w*\s+(.+?)\s*-\s*(.+)$/.exec(a);
        if (!m) return;
        const wd = DAY_SHORT.findIndex((x) => x.toLowerCase() === m[1].toLowerCase());
        if (wd < 0) return;
        evs.push({ id: `a${(d.seq ?? 0) + 1}-${i}`, kind: "appointments", title: field(ls, "Title") || "Bookable appointments", day: addDays(start, wd), start: parseTime(m[2]), end: parseTime(m[3]), calendar: calendarsOf(d).find((c) => c.mine)?.id ?? "main", repeat: "Weekly", description: tail(v, "Description") || undefined });
      });
      d = bump(d);
      return { doc: toast({ ...d, events: [...(d.events ?? []), ...evs], flags: { ...(d.flags ?? {}), appointments: v } }, "Appointment schedule saved") };
    }
    if (t.startsWith("calshare:")) {
      const id = t.slice(9);
      const ls = linesOf(v);
      const email = field(ls, "Share with") ?? "";
      const permission = field(ls, "Permission") ?? PERMISSIONS[1];
      return { doc: toast({ ...d, calendars: calendarsOf(d).map((c) => (c.id === id ? { ...c, shared: [...(c.shared ?? []).filter((s) => s.email !== email), { email, permission }] } : c)) }, "Calendar shared") };
    }
    if (t.startsWith("calpublic:")) {
      const id = t.slice(10);
      const on = (field(linesOf(v), "Make available to public") ?? "").toLowerCase() === "on";
      return { doc: { ...d, calendars: calendarsOf(d).map((c) => (c.id === id ? { ...c, public: on } : c)) } };
    }
    if (t === "newcal") {
      const ls = linesOf(v);
      const name = field(ls, "Name") ?? "";
      if (!name) return { doc: d };
      const colors = ["#33b679", "#f4511e", "#8e24aa", "#e67c73", "#f6bf26", "#0b8043"];
      const n = calendarsOf(d).length;
      d = bump(d);
      return { doc: toast({ ...d, calendars: [...calendarsOf(d), { id: `c${d.seq}`, name, description: tail(v, "Description") || undefined, color: colors[n % colors.length], mine: true }], view: { ...view, calPage: null } }, "Calendar created.") };
    }
    if (t === "settings:timezone") {
      const ls = linesOf(v);
      const f = { ...(d.flags ?? {}) };
      const p = field(ls, "Primary time zone");
      if (p) f.tz = p;
      const show = field(ls, "Show additional time zones");
      if (show) {
        f.tz2on = show === "on";
        if (show === "on" && !f.tz2) f.tz2 = TIME_ZONES[1];
      }
      const s2 = field(ls, "Secondary time zone");
      if (s2) { f.tz2 = s2; f.tz2on = true; }
      return { doc: toast({ ...d, flags: f }, "Settings saved") };
    }
    if (t === "meetcode") {
      const code = v.trim().toLowerCase().replace(/^https?:\/\/(meet\.google\.com\/)?/, "").replace(/^meet\.google\.com\//, "");
      const room = roomOf(d, code);
      if (!room) return { doc: toast(d, "Check your meeting code") };
      return { doc: { ...d, surface: "meet", tabs: Array.from(new Set([...(d.tabs ?? ["mail"]), "meet" as const])), meeting: startMeeting(d, room) }, ui: { selection: "meet" } };
    }
    if (t === "meetchat" && d.meeting) {
      return { doc: { ...d, meeting: { ...d.meeting, chat: [...d.meeting.chat, { from: "me", text: v, time: fmtTime(nowOf(d)) }] } } };
    }
    if (t.startsWith("chat:")) {
      const id = t.slice(5);
      return { doc: { ...d, spaces: (d.spaces ?? []).map((s) => (s.id === id ? { ...s, messages: [...s.messages, { from: "me", text: v, time: fmtTime(nowOf(d)) }] } : s)) } };
    }
    if (t.startsWith("addpeople:")) {
      const id = t.slice(10);
      const add = (field(linesOf(v), "People") ?? "").split(";").map((x) => x.trim()).filter(Boolean);
      return { doc: toast({ ...d, spaces: (d.spaces ?? []).map((s) => (s.id === id ? { ...s, members: Array.from(new Set([...s.members, ...add])) } : s)) }, `Added ${add.length} ${add.length === 1 ? "person" : "people"}`) };
    }
    if (t === "newspace") {
      const ls = linesOf(v);
      const name = field(ls, "Space name") ?? "";
      const members = (field(ls, "People") ?? "").split(";").map((x) => x.trim()).filter(Boolean);
      d = bump(d);
      const id = `sp${d.seq}`;
      return { doc: { ...d, spaces: [...(d.spaces ?? []), { id, name, kind: "space", members, messages: [] }], view: { ...view, space: id } }, ui: { selection: `space:${id}` } };
    }
    return { doc: d };
  }

  if (c.kind !== "command") return { doc: d };
  const v = c.value === undefined ? "" : String(c.value);

  switch (c.id) {
    /* ---------- navigation (free) ---------- */
    case "app": {
      const s = v as GmailDoc["surface"];
      return { doc: { ...d, surface: s, tabs: s === "mail" || s === "chat" ? d.tabs : Array.from(new Set([...(d.tabs ?? ["mail"]), s])) } };
    }
    case "gm.go":
      return { doc: { ...d, surface: "mail", view: { ...view, folder: v, open: null, settings: null } }, ui: { selection: "" } };
    case "gm.tab":
      return { doc: { ...d, view: { ...view, folder: "inbox", tab: v as GmCategory, open: null } }, ui: { selection: "" } };
    case "gm.open": {
      const m = msgOf(d, v);
      if (!m) return { doc: d };
      if (m.box === "drafts") return { doc: d };
      const th = threadOf(m);
      d = { ...d, messages: d.messages.map((x) => (threadOf(x) === th ? { ...x, unread: false } : x)), view: { ...view, open: th } };
      return { doc: d, ui: { selection: `msg:${m.id}` } };
    }
    case "gm.back":
      return { doc: { ...d, view: { ...view, open: null } }, ui: { selection: "" } };
    case "gm.settings":
      return { doc: { ...d, surface: "mail", view: { ...view, settings: v === "close" || !v ? null : v, open: null } }, ui: { selection: "" } };
    case "gm.draft": {
      try {
        const x = JSON.parse(v) as { to?: string[]; subject?: string; body?: string };
        d = bump(d);
        return { doc: { ...d, messages: [...d.messages, { id: `d${d.seq}`, from: "me", to: x.to ?? [], subject: x.subject || "(no subject)", body: x.body ?? "", date: nowIso(d), box: "drafts" }] } };
      } catch {
        return { doc: d };
      }
    }
    case "toast":
      return { doc: v ? toast(d, v) : d };

    /* ---------- mail actions ---------- */
    case "gm.archive":
      d = closeOpen(moveTo(d, ids, "archive"), ids);
      return { doc: toast(d, plural(ids, "Conversation archived.", "conversations archived.")), ui: { selection: "" } };
    case "gm.delete":
      d = closeOpen(moveTo(d, ids, "trash"), ids);
      return { doc: toast(d, plural(ids, "Conversation moved to Trash.", "conversations moved to Trash.")), ui: { selection: "" } };
    case "gm.deleteForever": {
      const threads = new Set(ids.map((id) => msgOf(d, id)).filter(Boolean).map((m) => threadOf(m!)));
      d = closeOpen(d, ids);
      return { doc: toast({ ...d, messages: d.messages.filter((m) => !(threads.has(threadOf(m)) && (m.box === "trash" || m.box === "spam"))) }, "Conversation deleted forever."), ui: { selection: "" } };
    }
    case "gm.emptyTrash":
      return { doc: toast({ ...d, messages: d.messages.filter((m) => m.box !== "trash"), view: { ...view, open: null } }, "Trash emptied."), ui: { selection: "" } };
    case "gm.spam":
      d = closeOpen(moveTo(d, ids, "spam"), ids);
      return { doc: toast(d, plural(ids, "Conversation marked as spam.", "conversations marked as spam.")), ui: { selection: "" } };
    case "gm.notSpam":
      d = closeOpen(mapThreads(d, ids, (m) => (m.box === "spam" ? { ...m, box: m.prevBox && m.prevBox !== "spam" ? m.prevBox : "inbox" } : m)), ids);
      return { doc: toast(d, "Conversation moved to Inbox."), ui: { selection: "" } };
    case "gm.phishing":
      d = closeOpen(moveTo(d, ids, "spam", { warning: "Reported as phishing" }), ids);
      return { doc: toast(d, "Thanks for reporting this phishing message."), ui: { selection: "" } };
    case "gm.block": {
      const email = v || (ids[0] ? msgOf(d, ids[0])?.from : "") || "";
      if (!email) return { doc: d };
      d = { ...d, blocked: Array.from(new Set([...(d.blocked ?? []), email])), messages: d.messages.map((m) => (m.from === email && m.box !== "trash" ? { ...m, prevBox: m.box, box: "spam" } : m)) };
      d = closeOpen(d, ids);
      return { doc: toast(d, `You have blocked ${email}. New messages from this sender will be moved to Spam.`), ui: { selection: "" } };
    }
    case "gm.unsubscribe": {
      const m = ids[0] ? msgOf(d, ids[0]) : undefined;
      if (!m) return { doc: d };
      d = mapThreads(d, ids, (x) => ({ ...x, unsubscribe: false }));
      return { doc: toast(d, `Unsubscribed from ${personOf(d, m.from).name}`) };
    }
    case "gm.read":
      return { doc: mapThreads(d, ids, (m) => ({ ...m, unread: v === "unread" })) , ui: v === "unread" && view.open ? { selection: "" } : undefined };
    case "gm.star": {
      const on = v !== "off";
      if (!on) return { doc: mapThreads(d, ids, (m) => ({ ...m, starred: false })) };
      const targets = new Set(ids);
      return { doc: { ...d, messages: d.messages.map((m) => (targets.has(m.id) ? { ...m, starred: true } : m)) } };
    }
    case "gm.important":
      return { doc: mapThreads(d, ids, (m) => ({ ...m, important: v !== "off" })) };
    case "gm.snooze": {
      const choice = snoozeChoices(d).find((x) => x.label === v);
      const until = choice?.when ?? v;
      d = closeOpen(mapThreads(d, ids, (m) => (movable(m) ? { ...m, box: "snoozed", snoozeUntil: until } : m)), ids);
      return { doc: toast(d, `Snoozed until ${until}`), ui: { selection: "" } };
    }
    case "gm.labels": {
      const names = v.split(";").map((x) => x.trim()).filter(Boolean);
      d = mapThreads(d, ids, (m) => ({ ...m, labels: names }));
      return { doc: toast(d, names.length ? `Labels applied` : "Labels removed") };
    }
    case "gm.moveTo": {
      if (v === "Inbox") {
        d = closeOpen(mapThreads(d, ids, (m) => (movable(m) || m.box === "trash" ? { ...m, box: "inbox", snoozeUntil: undefined } : m)), ids);
        return { doc: toast(d, plural(ids, "Conversation moved to Inbox.", "conversations moved to Inbox.")), ui: { selection: "" } };
      }
      if (v === "Spam" || v === "Trash") {
        d = closeOpen(moveTo(d, ids, v === "Spam" ? "spam" : "trash"), ids);
        return { doc: toast(d, `Conversation moved to ${v}.`), ui: { selection: "" } };
      }
      d = closeOpen(mapThreads(d, ids, (m) => ({ ...m, labels: Array.from(new Set([...(m.labels ?? []), v])), box: m.box === "inbox" ? "archive" : m.box })), ids);
      return { doc: toast(d, `Conversation moved to "${v}".`), ui: { selection: "" } };
    }
    case "gm.category":
      d = mapThreads(d, ids, (m) => ({ ...m, category: v as GmCategory }));
      return { doc: toast(d, `Conversation moved to "${v}".`), ui: { selection: "" } };
    case "gm.undoSend": {
      const m = msgOf(d, v);
      if (!m) return { doc: d };
      const target = d.lastSent?.target ?? "send:new";
      return {
        doc: {
          ...bump(d),
          messages: d.messages.filter((x) => x.id !== v),
          reopen: { target, to: m.to, cc: m.cc ?? [], bcc: m.bcc ?? [], subject: m.subject, body: m.body, seq: (d.seq ?? 0) + 1 },
          toast: { text: m.box === "scheduled" ? "Scheduled send canceled." : "Sending undone." },
        },
      };
    }
    case "gm.cancelSend": {
      const m = msgOf(d, v || ids[0] || "");
      if (!m) return { doc: d };
      d = { ...d, messages: d.messages.map((x) => (x.id === m.id ? { ...x, box: "drafts", scheduledFor: undefined } : x)), view: { ...view, open: null } };
      return { doc: toast(d, "Send canceled. Message reverted to draft."), ui: { selection: "" } };
    }
    case "gm.search":
      return { doc: { ...d, surface: "mail", view: { ...view, folder: "search", search: v, open: null, settings: null } }, ui: { selection: "" } };
    case "gm.filter.delete":
      return { doc: toast({ ...d, filters: (d.filters ?? []).filter((f) => f.id !== v) }, "Filter deleted.") };

    /* ---------- calendar ---------- */
    case "cal.view":
      return { doc: { ...d, surface: "calendar", view: { ...view, calView: v as "Day" | "Week" | "Month" } } };
    case "cal.go":
      return { doc: { ...d, view: { ...view, calDate: v } } };
    case "cal.today":
      return { doc: { ...d, view: { ...view, calDate: todayOf(d) } } };
    case "cal.open":
      return { doc: d, ui: { selection: `evt:${v}` } };
    case "cal.close":
      return { doc: d, ui: { selection: "" } };
    case "cal.page":
      return { doc: { ...d, surface: "calendar", view: { ...view, calPage: v === "close" || !v ? null : v } }, ui: { selection: "" } };
    case "cal.show": {
      const [id, on] = v.split("|");
      return { doc: { ...d, calendars: calendarsOf(d).map((x) => (x.id === id ? { ...x, off: on === "off" } : x)) } };
    }
    case "cal.rsvp": {
      const id = sel.startsWith("evt:") ? sel.slice(4) : "";
      const ans = v as "Yes" | "No" | "Maybe";
      d = { ...d, events: (d.events ?? []).map((e) => (e.id === id ? { ...e, myResponse: ans, guests: e.guests?.map((g) => (g.email.toLowerCase() === d.me.email.toLowerCase() ? { ...g, response: ans } : g)) } : e)) };
      return { doc: toast(d, `Responded ${ans}`) };
    }
    case "cal.delete": {
      const id = sel.startsWith("evt:") ? sel.slice(4) : "";
      return { doc: toast({ ...d, events: (d.events ?? []).filter((e) => e.id !== id) }, "Event deleted"), ui: { selection: "" } };
    }
    case "cal.taskDone": {
      const id = sel.startsWith("evt:") ? sel.slice(4) : "";
      return { doc: toast({ ...d, events: (d.events ?? []).map((e) => (e.id === id ? { ...e, done: true } : e)) }, "Task completed"), ui: { selection: "" } };
    }

    /* ---------- meet ---------- */
    case "meet.open": {
      const room = roomOf(d, v);
      if (!room) return { doc: d };
      return { doc: { ...d, surface: "meet", tabs: Array.from(new Set([...(d.tabs ?? ["mail"]), "meet" as const])), meeting: startMeeting(d, room) }, ui: { selection: "meet" } };
    }
    case "meet.home":
      return { doc: { ...d, surface: "meet", tabs: Array.from(new Set([...(d.tabs ?? ["mail"]), "meet" as const])), meeting: null }, ui: { selection: "" } };
    case "chat.open":
      return { doc: { ...d, surface: "chat", view: { ...view, space: v } }, ui: { selection: `space:${v}` } };
    case "meet.panel":
      return d.meeting ? { doc: { ...d, meeting: { ...d.meeting, panel: v || null } } } : { doc: d };
  }

  const mt = d.meeting;
  if (mt && c.id.startsWith("meet.")) {
    const set = (p: Partial<GmMeeting>, msg?: string) => ({ doc: msg ? toast({ ...d, meeting: { ...mt, ...p } }, msg) : { ...d, meeting: { ...mt, ...p } } });
    switch (c.id) {
      case "meet.mic":
        return set({ mic: v === "on" });
      case "meet.camera":
        return set({ camera: v === "on" });
      case "meet.effects":
        return set({ effect: v });
      case "meet.join":
        return set({ stage: "in" }, roomOf(d, mt.code)?.askToJoin ? "Someone in the meeting let you in" : undefined);
      case "meet.captions":
        return set({ captions: v === "on" });
      case "meet.react":
        return set({ lastReaction: v });
      case "meet.present":
        return set({ presenting: v }, "You are presenting");
      case "meet.stopPresent":
        return set({ presenting: null });
      case "meet.hand":
        return set({ hand: v === "raise" });
      case "meet.layout":
        return set({ layout: v });
      case "meet.leave":
        return set({ stage: "left", presenting: null, hand: false, recording: false, panel: null });
      case "meet.record":
        return roomOf(d, mt.code)?.canRecord ? set({ recording: v === "start" }, v === "start" ? "Recording has started" : "Recording stopped. It will be saved to the organizer's Google Drive.") : { doc: d };
    }
  }
  return { doc: d };
}

/* ------------------------------------------------------------------ */
/* Core helpers                                                        */
/* ------------------------------------------------------------------ */

export function gmailInitialUi(doc: GmailDoc): SimUi {
  if (doc.surface === "meet" && doc.meeting) return { selection: "meet" };
  const open = doc.view?.open;
  if (doc.surface === "mail" && open) {
    const list = threadMessages(doc, open);
    const last = list[list.length - 1];
    if (last) return { selection: `msg:${last.id}` };
  }
  if (doc.surface === "chat" && doc.view?.space) return { selection: `space:${doc.view.space}` };
  return { selection: "" };
}

/** Type targets of the canvas's forms (not selections). */
const FORM_TARGET = /^(send:(new|reply:|replyAll:|forward:)|newlabel$|filter$|categories$|settings:|event:|task:new$|appointments:new$|calshare:|calpublic:|newcal$|meetcode$|meetchat$|chat:|newspace$|addpeople:)/;

export function gmailSelectionExists(doc: GmailDoc, sel: string): boolean {
  if (!sel) return true;
  if (FORM_TARGET.test(sel)) return true;
  return sel.split(",").every((raw) => {
    const s = raw.trim();
    if (s === "meet") return true;
    if (s.startsWith("msg:")) return Boolean(msgOf(doc, s.slice(4)));
    if (s.startsWith("evt:")) return Boolean(eventOf(doc, s.slice(4)));
    if (s.startsWith("cal:")) return Boolean(calOf(doc, s.slice(4)));
    if (s.startsWith("space:")) return (doc.spaces ?? []).some((x) => x.id === s.slice(6));
    return false;
  });
}

export function describeGmail(doc: GmailDoc, ui: SimUi): string {
  const s = ui.selection;
  if (s.startsWith("msg:")) {
    const ids = selectedIds(ui);
    if (ids.length > 1) return `${ids.length} conversations selected`;
    const m = msgOf(doc, ids[0]);
    return m ? `Message: ${m.subject}` : "";
  }
  if (s.startsWith("evt:")) return `Event: ${eventOf(doc, s.slice(4))?.title ?? ""}`;
  if (s.startsWith("cal:")) return `Calendar: ${calOf(doc, s.slice(4))?.name ?? ""}`;
  return "";
}

export function normalizeGmail(c: SimCommit): SimCommit {
  if (c.kind === "command" && c.id === "gm.search" && typeof c.value === "string") return { ...c, value: canonicalQuery(c.value) };
  if (c.kind === "command" && c.id === "gm.labels" && typeof c.value === "string") {
    return { ...c, value: c.value.split(";").map((x) => x.trim()).filter(Boolean).sort((a, b) => a.localeCompare(b)).join("; ") };
  }
  return c;
}

/** Values for dropdowns that depend on the session. */
export function stateValue(v: SimValue | undefined): string {
  return v === undefined ? "" : String(v);
}
