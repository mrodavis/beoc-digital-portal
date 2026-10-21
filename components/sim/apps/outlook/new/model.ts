import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../../types";
import { clone } from "@/lib/sim/ops";
import type { OlMessage, OlPerson, OlRule, OutlookDoc } from "../types";
import {
  CATEGORY_SLOTS, allFolders, applyOutlook, catSlot, currentFolder, firstVisibleKey, folderByName, messagesIn, moduleOf, nextAfter, nextId,
  formFor, normalizeOutlook, nowOf, outlookRibbonState, personFor, selIds, selMessage, selMessages, setFlag, todayOf, visibleMessages, type Res,
} from "../model";
import { addDays, dateOf, dow, toMs } from "../dates";

/*
 * New Outlook for Windows (and Outlook on the web) on top of the Outlook
 * model. Same document (OutlookDoc), same selection keys and type targets as
 * the classic engine (see ../types.ts), plus:
 *
 * COMMANDS (new)
 *   mail.snooze        Later today | Tomorrow | This weekend | Next week
 *   mail.undoSend      Undo on the "Sending" bar (needs Settings › Mail › Compose and reply › Undo send)
 *   mail.alwaysOther / mail.alwaysFocused   right-click › Move › Always move to Other/Focused inbox
 *   home.block         Block sender (value "Block sender")
 *   compose.fromAddress <email>   From line (a shared mailbox)
 *   compose.encrypt    Encrypt | Do Not Forward | Remove encryption
 *   compose.sensitivity <label>
 *   compose.insertSignature <name>   Message tab › Signature
 *   settings.focusedInbox  On | Off   (Settings › Mail › Message list)
 *   rules.run / rules.toggle / rules.delete <rule name>   (Settings › Mail › Rules)
 *   junk.blockAddress / junk.safeAddress / junk.remove <address>   (Settings › Mail › Junk email)
 *   share.accept       Accept a calendar sharing invitation
 *   todo.list <list>   todo.important   todo.myDay   todo.due <Today|Tomorrow|Next week>
 * DIALOGS (canvas-drawn, Fluent style)
 *   sweep {option, folder}   newCategory {name, color}   addShared {email}
 *   newRule {name, condition, conditionValue, action, actionValue, stop}   createRuleQuick {folder}
 *   settings.undoSend {seconds}   settings.conversations {grouping}   settings.readingPane {position}
 *   settings.timeZone {zone, label}   settings.addTimeZone {zone, label}
 *   insertPicture {file}   altText {name, text}
 *   plus the classic ones: newFolder, moveTo, attachFile, scheduleSend, proposeTime, shareCalendar, quickStep, recurrence, event.save, contact.save, group.save
 * TYPE TARGETS (new)
 *   todo.new           "Add a task" box in To Do
 */

export const SWEEP_OPTIONS = [
  "Move all messages from the Inbox folder",
  "Move all messages from the Inbox folder and any future messages",
  "Always keep the latest message and move the rest",
  "Always move messages older than 10 days",
];

export const CATEGORY_COLOR_NAMES: Record<string, string> = {
  Red: "Red Category",
  Orange: "Orange Category",
  Yellow: "Yellow Category",
  Green: "Green Category",
  Blue: "Blue Category",
  Purple: "Purple Category",
};

export const RULE_CONDITIONS = ["From", "Subject includes", "Sent to me"];
export const RULE_ACTIONS = ["Move to", "Categorize", "Mark as read", "Pin to top", "Delete", "Forward to"];

export const NEW_REMINDERS = [
  "Don't remind me", "At time of event", "5 minutes before", "15 minutes before", "30 minutes before", "1 hour before", "2 hours before", "12 hours before", "1 day before", "1 week before",
];
export const NEW_SHOW_AS = ["Free", "Working elsewhere", "Tentative", "Busy", "Away"];

export const TIME_ZONES = [
  "(UTC-10:00) Hawaii",
  "(UTC-08:00) Pacific Time (US & Canada)",
  "(UTC-07:00) Mountain Time (US & Canada)",
  "(UTC-06:00) Central Time (US & Canada)",
  "(UTC-05:00) Eastern Time (US & Canada)",
  "(UTC-04:00) Atlantic Time (Canada)",
  "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
  "(UTC+00:00) Dublin, Edinburgh, Lisbon, London",
  "(UTC+01:00) West Central Africa",
];
/** Hours from Eastern time, for the second time zone column (fixed, no daylight saving). */
export function zoneOffsetFromEastern(zone: string): number {
  const m = /UTC([+-]\d{2}):(\d{2})/.exec(zone);
  const utc = m ? +m[1] + (+m[2] / 60) * Math.sign(+m[1] || 1) : 0;
  return utc - -5;
}

export const DEFAULT_ZONE = "(UTC-05:00) Eastern Time (US & Canada)";

/** How new Outlook names a category: renamed, or "Red category". */
export function catLabel(doc: OutlookDoc, slot: string): string {
  return doc.categoryNames?.[slot] ?? slot.replace(" Category", " category");
}

/** Folders of the signed-in mailbox (not shared mailboxes). */
export function isSharedFolder(doc: OutlookDoc, id: string): boolean {
  let f = allFolders(doc).find((x) => x.id === id);
  let guard = 0;
  while (f && guard++ < 20) {
    if (f.mailbox) return true;
    f = f.parent ? allFolders(doc).find((x) => x.id === f!.parent) : undefined;
  }
  return false;
}

export function sharedFolderOf(doc: OutlookDoc, email: string, name: string) {
  return allFolders(doc).find((f) => f.mailbox?.toLowerCase() === email.toLowerCase() && f.name.toLowerCase() === name.toLowerCase());
}

/** Which Ribbon tabs show (keys match RibbonTab.contextual). */
export function newContextual(doc: OutlookDoc, ui: SimUi): string[] {
  void ui;
  if (doc.form) {
    const k = doc.form.kind;
    if (k === "appointment" || k === "meeting") return ["eventForm"];
    return [];
  }
  const mod = moduleOf(doc);
  if (mod === "tasks") return [];
  const keys: string[] = [mod];
  if (mod === "mail") {
    if (doc.search) keys.push("search");
    if (doc.compose) keys.push("compose");
  }
  return keys;
}

export function newRibbonState(doc: OutlookDoc, ui: SimUi): Record<string, SimValue | undefined> {
  const base = outlookRibbonState(doc, ui);
  const comp = doc.compose;
  const m = selMessage(doc, ui);
  return {
    ...base,
    "mail.pin": Boolean(m?.pinned),
    "compose.encrypt": comp?.encrypt,
    "compose.sensitivity": comp?.sensitivity,
    "cal.view": doc.calView ?? "Work Week",
  };
}

/* ------------------------------------------------------------------ */
/* Normalize: new Outlook labels → the model's values                  */
/* ------------------------------------------------------------------ */

const REMINDER_MAP: Record<string, string> = {
  "don't remind me": "None", "at time of event": "0 minutes", "5 minutes before": "5 minutes", "15 minutes before": "15 minutes", "30 minutes before": "30 minutes",
  "1 hour before": "1 hour", "2 hours before": "2 hours", "12 hours before": "12 hours", "1 day before": "1 day", "1 week before": "1 week",
};
const SHOW_AS_MAP: Record<string, string> = { away: "Out of Office", "working elsewhere": "Working Elsewhere", free: "Free", tentative: "Tentative", busy: "Busy" };
const FILTER_MAP: Record<string, string> = { "has files": "Has Attachments", "mentions me": "Mentioned", "to me": "Sent To: Me", flagged: "Flagged", unread: "Unread", all: "All" };
const QS_MAP: Record<string, string> = {
  "move to folder": "Move to folder", "copy to folder": "Copy to folder", delete: "Delete message", "delete message": "Delete message", "mark as read": "Mark as read",
  "mark as unread": "Mark as unread", categorize: "Categorize message", "categorize message": "Categorize message", "flag message": "Flag message", flag: "Flag message",
  "clear flag": "Clear flags on message", forward: "Forward", reply: "Reply", "reply all": "Reply All",
};
const VIEW_MAP: Record<string, string> = { day: "Day", "work week": "Work Week", week: "Week", month: "Month" };

export function normalizeNew(c: SimCommit, doc?: OutlookDoc): SimCommit {
  void doc;
  const n = normalizeOutlook(c);
  if (n.kind === "command") {
    const v = String(n.value ?? "").trim().toLowerCase();
    switch (n.id) {
      case "cal.view":
        return VIEW_MAP[v] ? { ...n, value: VIEW_MAP[v] } : n;
      case "home.report":
        if (v === "not junk") return { kind: "command", id: "home.junk", value: "Not Junk" };
        return n;
      case "home.block":
        return { kind: "command", id: "home.junk", value: "Block Sender" };
      case "event.showAs":
      case "evtsel.showAs":
        return SHOW_AS_MAP[v] ? { ...n, value: SHOW_AS_MAP[v] } : n;
      case "event.reminder":
      case "evtsel.reminder":
        return REMINDER_MAP[v] ? { ...n, value: REMINDER_MAP[v] } : n;
      case "mail.filter":
        return FILTER_MAP[v] ? { ...n, value: FILTER_MAP[v] } : n;
      case "item.followUp": {
        const map: Record<string, string> = { "this week": "This Week", "next week": "Next Week", "no date": "No Date", "mark complete": "Mark Complete", "clear flag": "Clear Flag", today: "Today", tomorrow: "Tomorrow" };
        return map[v] ? { ...n, value: map[v] } : n;
      }
    }
    return n;
  }
  if (n.kind === "dialog" && n.id === "quickStep") {
    const values = { ...n.values };
    for (const k of Object.keys(values)) if (/^action\d$/.test(k)) values[k] = QS_MAP[String(values[k] ?? "").toLowerCase()] ?? values[k];
    return { ...n, values };
  }
  return n;
}

/* ------------------------------------------------------------------ */
/* Built-in behavior                                                   */
/* ------------------------------------------------------------------ */

function snoozeTime(doc: OutlookDoc, v: string): string {
  const today = todayOf(doc);
  const now = nowOf(doc);
  switch (v.toLowerCase()) {
    case "later today": {
      const h = Math.min(23, +now.slice(11, 13) + 3);
      return `${today}T${String(h).padStart(2, "0")}:00`;
    }
    case "tomorrow":
      return `${addDays(today, 1)}T08:00`;
    case "this weekend": {
      const d = dow(today);
      return `${addDays(today, d === 6 ? 7 : 6 - d)}T08:00`;
    }
    default: {
      const d = dow(today);
      return `${addDays(today, ((8 - d) % 7) || 7)}T08:00`;
    }
  }
}

function ruleMatches(doc: OutlookDoc, r: OlRule, m: OlMessage): boolean {
  if (r.off) return false;
  if (!r.from && !r.subject && !r.sentToMe) return false;
  if (r.from && m.from.email.toLowerCase() !== r.from.toLowerCase() && m.from.name.toLowerCase() !== r.from.toLowerCase()) return false;
  if (r.subject && !m.subject.toLowerCase().includes(r.subject.toLowerCase())) return false;
  if (r.sentToMe && !(m.to ?? []).some((p) => p.email.toLowerCase() === doc.account.email.toLowerCase())) return false;
  return true;
}

/** Run a rule on messages (new Outlook rule actions). */
export function runRuleNew(doc: OutlookDoc, r: OlRule, msgs: OlMessage[]): number {
  let n = 0;
  for (const m of msgs) {
    if (!ruleMatches(doc, r, m)) continue;
    n++;
    if (r.category) m.categories = Array.from(new Set([...(m.categories ?? []), r.category]));
    if (r.flag) setFlag(doc, m, r.flag);
    if (r.markRead) m.read = true;
    if (r.pin) m.pinned = true;
    if (r.deleteIt) m.folder = "deleted";
    else if (r.moveTo) {
      const f = folderByName(doc, r.moveTo);
      if (f) m.folder = f.id;
    }
  }
  return n;
}

function afterRemoval(doc: OutlookDoc, before: OlMessage[]): Res {
  const gone = before.filter((m) => !visibleMessages(doc).some((x) => x.id === m.id)).map((m) => m.id);
  return { doc, ui: gone.length ? { selection: nextAfter(before, gone, doc) } : undefined };
}

export function applyNew(input: OutlookDoc, c: SimCommit, ui: SimUi): Res {
  const pre = applyNewOnly(input, c, ui);
  if (pre) return pre;
  const beforeIds = new Set(input.messages.map((m) => m.id));
  const comp = input.compose;
  const r = applyOutlook(input, c, ui);
  // Something was sent: apply new Outlook's handling of the new message.
  const sentNow = comp && !r.doc.compose && ((c.kind === "command" && c.id === "compose.send") || (c.kind === "dialog" && c.id === "scheduleSend"));
  if (sentNow) {
    const doc = r.doc;
    const fresh = doc.messages.filter((m) => !beforeIds.has(m.id) && m.from.email === doc.account.email && (m.folder === "sent" || m.folder === "outbox"));
    for (const m of fresh) {
      if (comp!.from && comp!.from.toLowerCase() !== doc.account.email.toLowerCase()) {
        const sh = (doc.shared ?? []).find((x) => x.email.toLowerCase() === comp!.from!.toLowerCase());
        m.from = { name: sh?.name ?? comp!.from, email: comp!.from };
        const sent = sharedFolderOf(doc, comp!.from, "Sent Items");
        if (sent && m.folder === "sent") m.folder = sent.id;
      }
      // Scheduled messages wait in Drafts (not the Outbox) until they are sent.
      if (m.folder === "outbox") m.folder = "drafts";
      if (comp!.encrypt) m.encrypted = comp!.encrypt;
      if (comp!.sensitivity) m.sensitivity = comp!.sensitivity;
    }
    const sentMsg = fresh.find((m) => m.folder !== "drafts");
    doc.lastSent = (doc.undoSend ?? 0) > 0 && sentMsg ? sentMsg.id : null;
  }
  return r;
}

/** Commands and dialogs only new Outlook has; undefined means "let the classic model handle it". */
function applyNewOnly(input: OutlookDoc, c: SimCommit, ui: SimUi): Res | undefined {
  if (c.kind === "type") {
    if (c.target === "todo.new") {
      const doc = clone(input);
      const v = c.value.trim();
      if (!v) return { doc };
      const tasks = (doc.tasks = doc.tasks ?? []);
      const list = doc.todoList ?? "Tasks";
      const builtIn = ["My Day", "Important", "Planned", "Assigned to me", "Flagged email", "Tasks"];
      const t = {
        id: nextId(tasks, "t"),
        subject: v,
        status: "Not Started" as const,
        priority: "Normal" as const,
        percent: 0,
        myDay: list === "My Day" ? true : undefined,
        important: list === "Important" ? true : undefined,
        due: list === "Planned" || list === "My Day" ? todayOf(doc) : undefined,
        list: builtIn.includes(list) ? "Tasks" : list,
      };
      tasks.push(t);
      return { doc, ui: { selection: `task:${t.id}` } };
    }
    return undefined;
  }
  if (c.kind === "dialog") {
    const v = c.values;
    const s = (k: string) => String(v[k] ?? "").replace(/ /g, " ").trim();
    switch (c.id) {
      case "sweep": {
        const doc = clone(input);
        const m = selMessage(doc, ui);
        if (!m) return { doc };
        const opt = s("option") || SWEEP_OPTIONS[0];
        const target = folderByName(doc, s("folder") || "Deleted Items") ?? folderByName(doc, "Deleted Items")!;
        const before = visibleMessages(doc);
        const from = m.from.email.toLowerCase();
        const same = messagesIn(doc, currentFolder(doc)).filter((x) => x.from.email.toLowerCase() === from).sort((a, b) => toMs(b.date) - toMs(a.date));
        let move = same;
        if (opt === SWEEP_OPTIONS[2]) move = same.slice(1);
        if (opt === SWEEP_OPTIONS[3]) move = same.filter((x) => toMs(x.date) < toMs(addDays(todayOf(doc), -10)));
        for (const x of move) x.folder = target.id;
        if (opt !== SWEEP_OPTIONS[0]) doc.flags = { ...(doc.flags ?? {}), [`sweep:${from}`]: `${opt} → ${target.name}` };
        return afterRemoval(doc, before);
      }
      case "newCategory": {
        const doc = clone(input);
        const slot = CATEGORY_COLOR_NAMES[s("color")] ?? catSlot(doc, s("color")) ?? CATEGORY_SLOTS.find((x) => !doc.categoryNames?.[x]) ?? CATEGORY_SLOTS[0];
        const name = s("name");
        if (!name) return { doc };
        doc.categoryNames = { ...(doc.categoryNames ?? {}), [slot]: name };
        for (const m of selMessages(doc, ui)) m.categories = Array.from(new Set([...(m.categories ?? []), slot]));
        return { doc };
      }
      case "addShared": {
        const doc = clone(input);
        const e = s("email");
        if (!e) return { doc };
        const list = (doc.shared = doc.shared ?? []);
        const hit = list.find((x) => x.email.toLowerCase() === e.toLowerCase() || x.name.toLowerCase() === e.toLowerCase());
        if (hit) hit.added = true;
        else list.push({ name: e, email: e, added: true });
        return { doc };
      }
      case "newRule": {
        const doc = clone(input);
        const rules = (doc.rules = doc.rules ?? []);
        const cond = s("condition");
        const act = s("action");
        const cv = s("conditionValue");
        const av = s("actionValue");
        const r: OlRule = {
          id: nextId(rules, "r"),
          name: s("name") || "Rule",
          from: cond === "From" ? (cv.includes("@") ? cv : personFor(doc, cv).email) : undefined,
          subject: cond === "Subject includes" ? cv : undefined,
          sentToMe: cond === "Sent to me" ? true : undefined,
          moveTo: act === "Move to" ? av : undefined,
          category: act === "Categorize" ? catSlot(doc, av) : undefined,
          markRead: act === "Mark as read" ? true : undefined,
          pin: act === "Pin to top" ? true : undefined,
          deleteIt: act === "Delete" ? true : undefined,
          forwardTo: act === "Forward to" ? av : undefined,
          stop: Boolean(v.stop),
        };
        rules.push(r);
        return { doc };
      }
      case "createRuleQuick": {
        const doc = clone(input);
        const m = selMessage(doc, ui);
        if (!m) return { doc };
        const rules = (doc.rules = doc.rules ?? []);
        rules.push({ id: nextId(rules, "r"), name: m.from.name || m.from.email, from: m.from.email, moveTo: s("folder") });
        return { doc };
      }
      case "settings.undoSend": {
        const doc = clone(input);
        doc.undoSend = Math.max(0, Math.min(10, Number(v.seconds ?? 0) || 0));
        return { doc };
      }
      case "settings.conversations": {
        const doc = clone(input);
        doc.conversations = s("grouping") !== "Do not group messages";
        return { doc };
      }
      case "settings.readingPane": {
        const doc = clone(input);
        const p = s("position");
        doc.readingPane = p === "Show on the bottom" ? "Bottom" : p === "Hide reading pane" ? "Off" : "Right";
        return { doc };
      }
      case "settings.timeZone": {
        const doc = clone(input);
        doc.timeZone = s("zone") || doc.timeZone;
        return { doc };
      }
      case "settings.addTimeZone": {
        const doc = clone(input);
        const z = s("zone");
        if (z) doc.extraTimeZones = [...(doc.extraTimeZones ?? []).filter((x) => x.zone !== z), { zone: z, label: s("label") || undefined }];
        return { doc };
      }
      case "insertPicture": {
        const doc = clone(input);
        if (doc.compose && s("file")) doc.compose.images = [...(doc.compose.images ?? []).filter((x) => x.name !== s("file")), { name: s("file") }];
        return { doc };
      }
      case "altText": {
        const doc = clone(input);
        const img = doc.compose?.images?.find((x) => x.name === s("name")) ?? doc.compose?.images?.[0];
        if (img) img.alt = s("text");
        return { doc };
      }
    }
    return undefined;
  }
  if (c.kind !== "command") return undefined;
  const sv = c.value === undefined ? "" : String(c.value);
  switch (c.id) {
    case "mail.snooze": {
      const doc = clone(input);
      const before = visibleMessages(doc);
      const until = snoozeTime(doc, sv);
      for (const m of selMessages(doc, ui)) m.snoozeUntil = until;
      return afterRemoval(doc, before);
    }
    case "mail.undoSend": {
      const doc = clone(input);
      const m = doc.lastSent ? doc.messages.find((x) => x.id === doc.lastSent) : undefined;
      doc.lastSent = null;
      if (!m) return { doc };
      doc.messages = doc.messages.filter((x) => x.id !== m.id && !(x.folder === "inbox" && x.subject === m.subject && x.date === m.date));
      const n = ((doc.flags?.composeSeq as number | undefined) ?? 0) + 1;
      doc.flags = { ...(doc.flags ?? {}), composeSeq: n };
      doc.compose = {
        id: `c${n}-undo-${m.id}`, mode: "new", to: (m.to ?? []).map((p) => p.email), cc: (m.cc ?? []).map((p) => p.email), bcc: (m.bcc ?? []).map((p) => p.email),
        subject: m.subject, body: m.body, attachments: m.attachments ?? [],
      };
      return { doc };
    }
    case "mail.alwaysOther":
    case "mail.alwaysFocused": {
      const doc = clone(input);
      const before = visibleMessages(doc);
      const other = c.id === "mail.alwaysOther";
      for (const m of selMessages(doc, ui)) {
        const e = m.from.email.toLowerCase();
        doc.alwaysOther = (doc.alwaysOther ?? []).filter((x) => x !== e);
        doc.alwaysFocused = (doc.alwaysFocused ?? []).filter((x) => x !== e);
        (other ? (doc.alwaysOther = [...doc.alwaysOther, e]) : (doc.alwaysFocused = [...doc.alwaysFocused, e]));
        for (const x of doc.messages) if (x.folder === "inbox" && x.from.email.toLowerCase() === e) x.other = other;
      }
      return afterRemoval(doc, before);
    }
    case "compose.fromAddress": {
      const doc = clone(input);
      if (doc.compose) {
        doc.compose.from = sv && sv.toLowerCase() !== doc.account.email.toLowerCase() ? sv : undefined;
        doc.compose.showFrom = true;
      }
      return { doc };
    }
    case "compose.encrypt": {
      const doc = clone(input);
      if (doc.compose) doc.compose.encrypt = !sv || /^remove/i.test(sv) ? undefined : sv;
      return { doc };
    }
    case "compose.sensitivity": {
      const doc = clone(input);
      if (doc.compose) doc.compose.sensitivity = sv || undefined;
      return { doc };
    }
    case "compose.insertSignature": {
      // The canvas inserts the text into what the learner is typing.
      return { doc: clone(input) };
    }
    case "settings.focusedInbox": {
      const doc = clone(input);
      doc.focused = !/off/i.test(sv);
      doc.focusTab = "Focused";
      return { doc, ui: { selection: firstVisibleKey(doc) } };
    }
    case "rules.run": {
      const doc = clone(input);
      const r = (doc.rules ?? []).find((x) => x.name.toLowerCase() === sv.toLowerCase());
      if (!r) return { doc };
      const before = visibleMessages(doc);
      runRuleNew(doc, { ...r, off: false }, doc.messages.filter((m) => m.folder === "inbox"));
      return afterRemoval(doc, before);
    }
    case "rules.toggle": {
      const doc = clone(input);
      const r = (doc.rules ?? []).find((x) => x.name.toLowerCase() === sv.toLowerCase());
      if (r) r.off = !r.off;
      return { doc };
    }
    case "rules.delete": {
      const doc = clone(input);
      doc.rules = (doc.rules ?? []).filter((x) => x.name.toLowerCase() !== sv.toLowerCase());
      return { doc };
    }
    case "junk.blockAddress":
    case "junk.safeAddress": {
      const doc = clone(input);
      const a = sv.trim().toLowerCase();
      if (!a) return { doc };
      if (c.id === "junk.blockAddress") {
        doc.blocked = Array.from(new Set([...(doc.blocked ?? []), a]));
        doc.safe = (doc.safe ?? []).filter((x) => x !== a);
      } else {
        doc.safe = Array.from(new Set([...(doc.safe ?? []), a]));
        doc.blocked = (doc.blocked ?? []).filter((x) => x !== a);
      }
      return { doc };
    }
    case "junk.remove": {
      const doc = clone(input);
      const a = sv.trim().toLowerCase();
      doc.blocked = (doc.blocked ?? []).filter((x) => x !== a);
      doc.safe = (doc.safe ?? []).filter((x) => x !== a);
      return { doc };
    }
    case "share.accept": {
      const doc = clone(input);
      const m = selMessage(doc, ui);
      if (!m?.shareInvite) return { doc };
      const name = m.shareInvite.calendar;
      doc.calendars = [...(doc.calendars ?? []).filter((x) => x.name !== name), { name, shown: true }];
      m.read = true;
      doc.flags = { ...(doc.flags ?? {}), [`accepted:${m.id}`]: true };
      return { doc };
    }
    case "todo.list": {
      const doc = clone(input);
      doc.module = "tasks";
      doc.todoList = sv || "My Day";
      return { doc, ui: { selection: "" } };
    }
    case "todo.important":
    case "todo.myDay":
    case "todo.due": {
      const doc = clone(input);
      const ids = selIds(ui.selection, "task");
      for (const t of (doc.tasks ?? []).filter((x) => ids.includes(x.id))) {
        if (c.id === "todo.important") t.important = !t.important;
        else if (c.id === "todo.myDay") t.myDay = !t.myDay;
        else {
          const today = todayOf(doc);
          const d = dow(today);
          t.due = /tomorrow/i.test(sv) ? addDays(today, 1) : /next week/i.test(sv) ? addDays(today, ((8 - d) % 7) || 7) : /remove/i.test(sv) ? undefined : today;
        }
      }
      return { doc };
    }
    case "mail.recall": {
      const doc = clone(input);
      const m = doc.messages.find((x) => x.id === (sv || doc.window));
      if (!m || m.from.email.toLowerCase() !== doc.account.email.toLowerCase()) return { doc };
      const domain = doc.account.email.split("@")[1].toLowerCase();
      const all = [...(m.to ?? []), ...(m.cc ?? [])];
      const outside = all.filter((p) => !p.email.toLowerCase().endsWith("@" + domain));
      const ok = outside.length === 0;
      doc.messages.push({
        id: nextId(doc.messages, "m"),
        folder: "inbox",
        from: { name: "Microsoft Outlook", email: `postmaster@${domain}` },
        to: [doc.account],
        subject: `Message Recall Report for message: ${m.subject}`,
        body: ok
          ? `Recall Succeeded. Your request to recall the message "${m.subject}" succeeded for: ${all.map((p) => p.name).join("; ")}. The message was removed before it was read.`
          : `Recall Failed. The message "${m.subject}" couldn't be recalled for: ${outside.map((p) => p.email).join("; ")}. Recall only works for recipients in your organization.`,
        date: nowOf(doc),
        read: false,
      });
      doc.flags = { ...(doc.flags ?? {}), [`recalled:${m.id}`]: ok ? "Succeeded" : "Failed" };
      doc.window = null;
      return { doc };
    }
    case "people.addToList": {
      const doc = clone(input);
      const emails = (doc.contacts ?? []).filter((x) => selIds(ui.selection, "contact").includes(x.id)).map((x) => x.email ?? "").filter(Boolean);
      if (!sv || /^new contact list$/i.test(sv)) {
        doc.form = formFor(doc, "group", { members: emails });
        return { doc };
      }
      const g = (doc.groups ?? []).find((x) => x.name.toLowerCase() === sv.toLowerCase());
      if (g) g.members = Array.from(new Set([...g.members, ...emails]));
      return { doc };
    }
    case "review.accessibility": {
      const doc = clone(input);
      doc.accessibilityPane = true;
      return { doc };
    }
    case "pane.close": {
      const doc = clone(input);
      doc.accessibilityPane = false;
      return { doc };
    }
    case "view.myDay": {
      const doc = clone(input);
      doc.myDayOpen = !doc.myDayOpen;
      return { doc };
    }
    case "nav.module": {
      const r = applyOutlook(input, c, ui);
      if (/to do/i.test(sv)) r.doc.todoList = r.doc.todoList ?? "My Day";
      return r;
    }
  }
  return undefined;
}

/** When a message from a sender listed in alwaysOther arrives, it goes to Other. */
export function personName(doc: OutlookDoc, email: string): string {
  return personFor(doc, email).name;
}

export function dateLabel(iso: string): string {
  return dateOf(iso);
}

export type { OlPerson };
