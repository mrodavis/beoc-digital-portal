import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { clone } from "@/lib/sim/ops";
import type { TeamsChannel, TeamsChat, TeamsDoc, TeamsEvent, TeamsFile, TeamsMeeting, TeamsMessage, TeamsUiState } from "./types";

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const DEFAULT_TODAY = "2026-10-20";

export function splitKey(key: string): [string, string] {
  const i = key.indexOf(":");
  return i < 0 ? [key, ""] : [key.slice(0, i), key.slice(i + 1)];
}

export function personName(doc: TeamsDoc, id: string): string {
  if (id === "me") return doc.me.name;
  return doc.people.find((p) => p.id === id)?.name ?? id;
}

export function allChannels(doc: TeamsDoc): { team: TeamsDoc["teams"][number]; channel: TeamsChannel }[] {
  return doc.teams.flatMap((team) => team.channels.map((channel) => ({ team, channel })));
}

export function findChannel(doc: TeamsDoc, id: string) {
  return allChannels(doc).find((x) => x.channel.id === id);
}

export function findChat(doc: TeamsDoc, id: string): TeamsChat | undefined {
  return doc.chats.find((c) => c.id === id);
}

export function chatTitle(doc: TeamsDoc, chat: TeamsChat): string {
  if (chat.title) return chat.title;
  return chat.members.map((m) => personName(doc, m)).join(", ");
}

export interface MsgHit {
  msg: TeamsMessage;
  /** Array that holds the message. */
  list: TeamsMessage[];
  chat?: TeamsChat;
  channel?: TeamsChannel;
  /** For channel replies: the post they belong to. */
  post?: TeamsMessage;
}

export function findMessage(doc: TeamsDoc, id: string): MsgHit | null {
  for (const chat of doc.chats) {
    const m = chat.messages.find((x) => x.id === id);
    if (m) return { msg: m, list: chat.messages, chat };
  }
  for (const { channel } of allChannels(doc)) {
    for (const p of channel.posts) {
      if (p.id === id) return { msg: p, list: channel.posts, channel };
      const r = p.replies?.find((x) => x.id === id);
      if (r) return { msg: r, list: p.replies!, channel, post: p };
    }
  }
  return null;
}

export function findEvent(doc: TeamsDoc, id: string): TeamsEvent | undefined {
  return doc.events?.find((e) => e.id === id);
}

export function findFile(doc: TeamsDoc, id: string): TeamsFile | undefined {
  return doc.files?.find((f) => f.id === id);
}

/** The chat that carries a meeting's conversation (created on demand). */
export function meetingChatId(doc: TeamsDoc, meetingId: string): string {
  if (meetingId.startsWith("call-")) return meetingId.slice(5);
  const ev = findEvent(doc, meetingId);
  if (ev?.chat) return ev.chat;
  const existing = doc.chats.find((c) => c.event === meetingId);
  return existing?.id ?? `chat-${meetingId}`;
}

function ensureMeetingChat(doc: TeamsDoc, meetingId: string): TeamsChat {
  const id = meetingChatId(doc, meetingId);
  let chat = findChat(doc, id);
  if (!chat) {
    const ev = findEvent(doc, meetingId);
    chat = { id, title: ev?.title ?? "Meeting", kind: "meeting", event: meetingId, members: ev ? Array.from(new Set([ev.organizer, ...ev.attendees].filter((x) => x !== "me"))) : [], messages: [] };
    doc.chats.unshift(chat);
  }
  return chat;
}

export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function nextId(doc: TeamsDoc, prefix = "new"): string {
  doc.seq = (doc.seq ?? 0) + 1;
  return `${prefix}${doc.seq}`;
}

/* ------------------------------------------------------------------ */
/* Form serialization ("Field: value" per line)                        */
/* ------------------------------------------------------------------ */

export function serializeForm(fields: [string, string][]): string {
  return fields.map(([k, v]) => `${k}: ${v}`).join("\n");
}

export function parseForm(s: string, keys: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  const known = new Set(keys.map((k) => k.toLowerCase()));
  let cur: string | null = null;
  for (const line of s.split("\n")) {
    const m = /^([A-Za-z][A-Za-z ]{0,40}):\s?(.*)$/.exec(line);
    if (m && known.has(m[1].toLowerCase())) {
      cur = m[1].toLowerCase();
      out[cur] = m[2];
    } else if (cur) out[cur] += `\n${line}`;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Dates and times                                                     */
/* ------------------------------------------------------------------ */

export function parseTime(t: string): number {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(t.trim());
  if (!m) return 0;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h * 60 + Number(m[2]);
}

export function fmtTime(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ap = h24 >= 12 ? "PM" : "AM";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, "0")} ${ap}`;
}

export function isoToMDY(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

export function mdyToIso(s: string): string {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s.trim());
  if (!m) return s;
  return `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

export function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function weekdayOf(iso: string): number {
  return new Date(`${iso}T12:00:00Z`).getUTCDay();
}

export function mondayOf(iso: string): string {
  const wd = weekdayOf(iso);
  return addDays(iso, wd === 0 ? -6 : 1 - wd);
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function longDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return `${DAY_NAMES[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

export function shortDay(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return `${DAY_NAMES[d.getUTCDay()].slice(0, 3)} ${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
}

/* ------------------------------------------------------------------ */
/* Meetings                                                            */
/* ------------------------------------------------------------------ */

export function meetingTitle(doc: TeamsDoc, id: string): string {
  if (id.startsWith("call-")) {
    const chat = findChat(doc, id.slice(5));
    return chat ? chatTitle(doc, chat) : "Call";
  }
  if (id === "meetnow") return `Meeting with ${doc.me.name}`;
  return findEvent(doc, id)?.title ?? "Meeting";
}

function newMeeting(doc: TeamsDoc, id: string, stage: "prejoin" | "in"): TeamsMeeting {
  const ev = findEvent(doc, id);
  const chat = id.startsWith("call-") ? findChat(doc, id.slice(5)) : undefined;
  const ids = ev?.participants ?? chat?.members ?? [];
  return {
    id,
    title: meetingTitle(doc, id),
    stage,
    camera: doc.av?.camera ?? true,
    mic: doc.av?.mic ?? true,
    background: doc.av?.background ?? "None",
    audio: "Computer audio",
    participants: ids.map((p) => ({ id: p, muted: !(ev?.unmuted ?? []).includes(p), camera: true })),
    lobby: ev?.lobby ? [...ev.lobby] : [],
    organizer: Boolean(ev?.youOrganize) || id === "meetnow" || id.startsWith("call-"),
    sharing: null,
    view: "Gallery",
    chat: meetingChatId(doc, id),
  };
}

/** The meeting a selection key points at, created if the learner reached it some other way. */
function meetingFor(doc: TeamsDoc, sel: string, stage: "prejoin" | "in"): TeamsMeeting {
  const [kind, id] = splitKey(sel);
  const mid = kind === "prejoin" || kind === "meeting" ? id : doc.meeting?.id ?? id;
  if (!doc.meeting || doc.meeting.id !== mid) doc.meeting = newMeeting(doc, mid, stage);
  return doc.meeting;
}

const ON = (v: SimValue | undefined) => String(v ?? "").toLowerCase() === "on" || v === true;

/* ------------------------------------------------------------------ */
/* Apply                                                               */
/* ------------------------------------------------------------------ */

function now(doc: TeamsDoc) {
  return doc.now ?? "10:02 AM";
}

function postMessage(doc: TeamsDoc, list: TeamsMessage[], text: string, draftKey: string, extra?: Partial<TeamsMessage>): TeamsMessage {
  const attachments = doc.drafts?.[draftKey];
  const msg: TeamsMessage = { id: nextId(doc), from: "me", time: now(doc), text, ...(attachments?.length ? { attachments: [...attachments] } : {}), ...extra };
  list.push(msg);
  if (doc.drafts) delete doc.drafts[draftKey];
  return msg;
}

export function applyTeams(input: TeamsDoc, c: SimCommit, uiIn: SimUi): { doc: TeamsDoc; ui?: Partial<SimUi> } {
  const doc = clone(input);
  const ui = uiIn as TeamsUiState;
  const sel = ui.selection ?? "";
  const [selKind, selId] = splitKey(sel);
  const out = (patch?: Partial<TeamsUiState>) => ({ doc, ui: patch as Partial<SimUi> | undefined });

  if (c.kind === "type") {
    const [kind, id] = splitKey(c.target);
    const text = c.value;
    switch (kind) {
      case "chat": {
        const chat = findChat(doc, id);
        if (chat) {
          postMessage(doc, chat.messages, text, c.target);
          chat.unread = false;
          chat.hidden = false;
        }
        return out();
      }
      case "newchat": {
        const ids = id.split("+").filter(Boolean).sort();
        const existing = doc.chats.find((x) => x.kind !== "meeting" && !x.title && x.members.slice().sort().join("+") === ids.join("+"));
        const chat: TeamsChat = existing ?? { id: `chat-${ids.join("-")}`, members: ids, kind: ids.length > 1 ? "group" : "chat", messages: [] };
        if (!existing) doc.chats.unshift(chat);
        postMessage(doc, chat.messages, text, c.target);
        return out({ view: "chat", conv: chat.id, selection: `chat:${chat.id}` });
      }
      case "channel": {
        const hit = findChannel(doc, id);
        if (hit) postMessage(doc, hit.channel.posts, text, c.target, { replies: [] });
        return out();
      }
      case "reply": {
        const hit = findMessage(doc, id);
        if (!hit) return out();
        if (hit.channel) {
          const post = hit.post ?? hit.msg;
          post.replies = post.replies ?? [];
          postMessage(doc, post.replies, text, c.target);
        } else if (hit.chat) {
          postMessage(doc, hit.chat.messages, text, c.target, { quote: { from: hit.msg.from, text: hit.msg.text } });
        }
        return out();
      }
      case "edit": {
        const hit = findMessage(doc, id);
        if (hit && text.trim()) {
          hit.msg.text = text;
          hit.msg.edited = true;
        }
        return out();
      }
      case "meetingchat": {
        const chat = ensureMeetingChat(doc, id);
        postMessage(doc, chat.messages, text, c.target);
        return out();
      }
      case "status": {
        const f = parseForm(text, ["Status message", "Clear after", "Show when people message me"]);
        doc.me.statusMessage = (f["status message"] ?? text).trim();
        doc.me.statusClearAfter = f["clear after"]?.trim();
        return out();
      }
      case "schedule": {
        const f = parseForm(text, ["Title", "Attendees", "Date", "Start", "End", "Repeat", "Channel", "Location", "Details"]);
        const attendees = (f.attendees ?? "")
          .split(";")
          .map((n) => n.trim())
          .filter(Boolean)
          .map((n) => doc.people.find((p) => p.name.toLowerCase() === n.toLowerCase())?.id ?? n);
        const ev: TeamsEvent = {
          id: nextId(doc, "ev"),
          title: (f.title ?? "").trim() || "New meeting",
          day: mdyToIso((f.date ?? "").trim() || isoToMDY(doc.today ?? DEFAULT_TODAY)),
          start: (f.start ?? "").trim() || "10:00 AM",
          end: (f.end ?? "").trim() || "10:30 AM",
          organizer: "me",
          attendees,
          online: true,
          location: f.location?.trim() || undefined,
          details: f.details?.trim() || undefined,
          repeat: f.repeat?.trim() || undefined,
          channel: f.channel && f.channel.trim() !== "None" ? f.channel.trim() : undefined,
          youOrganize: true,
          response: "Accepted",
        };
        doc.events = [...(doc.events ?? []), ev];
        const chat: TeamsChat = { id: `chat-${ev.id}`, title: ev.title, kind: "meeting", event: ev.id, members: attendees, messages: [{ id: nextId(doc), from: "me", time: now(doc), text: "", system: `Meeting scheduled for ${shortDay(ev.day)} ${ev.start}` }] };
        ev.chat = chat.id;
        doc.chats.unshift(chat);
        return out({ overlay: null, view: "calendar", selection: `event:${ev.id}` });
      }
      case "rename": {
        const f = findFile(doc, id);
        if (f && text.trim()) f.name = text.trim();
        return out();
      }
      case "newfolder": {
        const name = text.trim();
        if (name) {
          doc.files = [...(doc.files ?? []), { id: slug(name), name, folder: id || "root", isFolder: true, modified: "Just now", modifiedBy: doc.me.name, sharing: "Private" }];
        }
        return out();
      }
      case "share": {
        const f = findFile(doc, id);
        const v = parseForm(text, ["People", "Link", "Permission", "Message", "Action"]);
        if (f) {
          const link = (v.link ?? "").trim();
          const perm = (v.permission ?? "").trim().toLowerCase();
          f.sharing = link.startsWith("Anyone") ? `Anyone with the link ${perm || "can view"}` : link ? `Shared (${link})` : "Shared";
        }
        if ((v.action ?? "").trim().toLowerCase() === "copy link") doc.clipboard = `https://tortech-my.sharepoint.example/:f:/${id}`;
        return out();
      }
      case "forward": {
        const hit = findMessage(doc, id);
        const v = parseForm(text, ["To", "Message"]);
        const toName = (v.to ?? "").trim().toLowerCase();
        const person = doc.people.find((p) => p.name.toLowerCase() === toName);
        let chat = doc.chats.find((x) => (x.title ?? "").toLowerCase() === toName) ?? (person ? doc.chats.find((x) => !x.title && x.members.length === 1 && x.members[0] === person.id) : undefined);
        if (!chat && person) {
          chat = { id: `chat-${person.id}`, members: [person.id], kind: "chat", messages: [] };
          doc.chats.unshift(chat);
        }
        if (chat && hit) chat.messages.push({ id: nextId(doc), from: "me", time: now(doc), text: (v.message ?? "").trim(), quote: { from: hit.msg.from, text: hit.msg.text } });
        return out();
      }
    }
    return out();
  }

  if (c.kind === "dialog" || c.kind === "click") return out();

  const v = c.value;
  const sv = v === undefined ? "" : String(v);
  const msg = selKind === "msg" ? findMessage(doc, selId) : null;
  const chat = selKind === "chat" ? findChat(doc, selId) : undefined;

  switch (c.id) {
    /* ---------- messages ---------- */
    case "msg.react": {
      if (!msg) return out();
      const r = { ...(msg.msg.reactions ?? {}) };
      const list = r[sv] ?? [];
      r[sv] = list.includes("me") ? list.filter((x) => x !== "me") : [...list, "me"];
      if (!r[sv].length) delete r[sv];
      msg.msg.reactions = r;
      return out();
    }
    case "msg.delete":
      if (msg) msg.msg.deleted = true;
      return out();
    case "msg.undoDelete":
      if (msg) msg.msg.deleted = false;
      return out();
    case "msg.pin":
      if (msg) {
        for (const m of msg.list) m.pinned = false;
        msg.msg.pinned = true;
      }
      return out();
    case "msg.unpin":
      if (msg) msg.msg.pinned = false;
      return out();
    case "msg.markUnread":
      if (msg?.chat) msg.chat.unread = true;
      if (msg?.channel) msg.channel.unread = true;
      return out();
    case "msg.save":
      if (msg) msg.msg.saved = !msg.msg.saved;
      return out();
    case "msg.copyLink":
      if (msg) doc.clipboard = `https://teams.microsoft.example/l/message/${msg.msg.id}`;
      return out();

    /* ---------- chats & channels ---------- */
    case "chat.pin":
      if (chat) chat.pinned = true;
      return out();
    case "chat.unpin":
      if (chat) chat.pinned = false;
      return out();
    case "chat.markUnread":
      if (chat) chat.unread = true;
      return out();
    case "chat.markRead":
      if (chat) chat.unread = false;
      return out();
    case "chat.mute":
      if (chat) chat.muted = true;
      return out();
    case "chat.unmute":
      if (chat) chat.muted = false;
      return out();
    case "chat.hide":
      if (chat) chat.hidden = true;
      return out();
    case "chat.call": {
      if (!chat) return out();
      const m = newMeeting(doc, `call-${chat.id}`, "in");
      m.camera = sv !== "audio";
      m.mic = true;
      doc.meeting = m;
      return out({ selection: `meeting:${m.id}` });
    }
    case "channel.notifications": {
      const hit = selKind === "channel" ? findChannel(doc, selId) : undefined;
      if (hit) hit.channel.notifications = sv;
      return out();
    }
    case "channel.pin": {
      const hit = selKind === "channel" ? findChannel(doc, selId) : undefined;
      if (hit) hit.channel.pinned = !hit.channel.pinned;
      return out();
    }
    case "compose.attach": {
      const drafts = { ...(doc.drafts ?? {}) };
      const list = drafts[sel] ?? [];
      if (!list.includes(sv)) drafts[sel] = [...list, sv];
      doc.drafts = drafts;
      return out();
    }
    case "compose.detach": {
      const drafts = { ...(doc.drafts ?? {}) };
      drafts[sel] = (drafts[sel] ?? []).filter((x) => x !== sv);
      doc.drafts = drafts;
      return out();
    }

    /* ---------- presence ---------- */
    case "status.set": {
      const map: Record<string, TeamsDoc["me"]["presence"]> = {
        Available: "Available",
        Busy: "Busy",
        "Do not disturb": "Do not disturb",
        "Be right back": "Be right back",
        "Appear away": "Away",
        "Appear offline": "Offline",
        "Reset status": "Available",
      };
      doc.me.presence = map[sv] ?? doc.me.presence;
      return out();
    }
    case "status.clearMessage":
      doc.me.statusMessage = undefined;
      doc.me.statusClearAfter = undefined;
      return out();

    /* ---------- files ---------- */
    case "files.upload": {
      const folder = selKind === "files" ? `ch:${selId}` : selKind === "folder" ? selId || "root" : "root";
      const exists = doc.files?.find((f) => f.folder === folder && f.name === sv);
      if (!exists) doc.files = [...(doc.files ?? []), { id: slug(sv), name: sv, folder, modified: "Just now", modifiedBy: doc.me.name, size: doc.localFiles?.find((f) => f.name === sv)?.size, sharing: folder.startsWith("ch:") ? "Shared" : "Private" }];
      else exists.modified = "Just now";
      return out();
    }
    case "files.copyLink": {
      const f = selKind === "file" ? findFile(doc, selId) : undefined;
      if (f) doc.clipboard = `https://tortech.sharepoint.example/:w:/${f.id}`;
      return out();
    }
    case "files.pin": {
      const f = selKind === "file" ? findFile(doc, selId) : undefined;
      if (f) f.pinned = !f.pinned;
      return out();
    }
    case "files.delete":
      if (selKind === "file") doc.files = (doc.files ?? []).filter((f) => f.id !== selId && f.folder !== selId);
      return out();
    case "files.download": {
      const f = selKind === "file" ? findFile(doc, selId) : undefined;
      if (f) doc.flags = { ...(doc.flags ?? {}), downloaded: f.name };
      return out();
    }
    case "files.move": {
      const f = selKind === "file" ? findFile(doc, selId) : undefined;
      if (f && sv !== f.id) f.folder = sv || "root";
      return out();
    }
    case "files.open":
      doc.flags = { ...(doc.flags ?? {}), viewing: sv || selId };
      return out();
    case "files.close": {
      const f = { ...(doc.flags ?? {}) };
      delete f.viewing;
      doc.flags = f;
      return out();
    }

    /* ---------- calendar ---------- */
    case "event.rsvp": {
      const ev = selKind === "event" ? findEvent(doc, selId) : undefined;
      if (ev) ev.response = sv === "Accept" ? "Accepted" : sv === "Decline" ? "Declined" : "Tentative";
      return out();
    }
    case "calendar.meetNow": {
      doc.meeting = newMeeting(doc, "meetnow", "prejoin");
      return out({ selection: "prejoin:meetnow" });
    }

    /* ---------- pre-join and devices ---------- */
    case "meeting.prejoin": {
      const id = sv || selId;
      if (!doc.meeting || doc.meeting.id !== id) doc.meeting = newMeeting(doc, id, "prejoin");
      return out({ selection: `prejoin:${id}` });
    }
    case "meeting.cancel":
      if (doc.meeting?.stage === "prejoin") doc.meeting = null;
      return out({ selection: "" });
    case "av.camera":
    case "av.mic":
    case "av.background":
    case "av.audio": {
      if (selKind !== "prejoin" && selKind !== "meeting") return out();
      const m = meetingFor(doc, sel, selKind === "prejoin" ? "prejoin" : "in");
      if (c.id === "av.camera") m.camera = ON(v);
      if (c.id === "av.mic") m.mic = ON(v);
      if (c.id === "av.background") m.background = sv || "None";
      if (c.id === "av.audio") {
        m.audio = sv;
        if (sv !== "Computer audio") m.mic = false;
      }
      return out();
    }
    case "av.speaker":
    case "av.microphone":
    case "av.cameraDevice":
    case "av.noise": {
      const d = doc.devices ?? { speakers: [], microphones: [], cameras: [], speaker: "", microphone: "", camera: "" };
      if (c.id === "av.speaker") d.speaker = sv;
      if (c.id === "av.microphone") d.microphone = sv;
      if (c.id === "av.cameraDevice") d.camera = sv;
      if (c.id === "av.noise") d.noise = sv;
      d.testCall = false;
      doc.devices = d;
      return out();
    }
    case "settings.testCall": {
      if (doc.devices) doc.devices.testCall = true;
      return out();
    }
    case "meeting.joinNow": {
      const m = meetingFor(doc, sel, "prejoin");
      m.stage = "in";
      const ev = findEvent(doc, m.id);
      if (ev) ev.live = true;
      return out({ selection: `meeting:${m.id}` });
    }

    /* ---------- in the meeting ---------- */
    case "meeting.panel":
    case "meeting.view": {
      if (!doc.meeting) return out();
      if (c.id === "meeting.view") doc.meeting.view = sv;
      return out();
    }
    case "meeting.raiseHand": {
      const m = meetingFor(doc, sel, "in");
      m.hand = sv ? sv.toLowerCase() === "raise" : !m.hand;
      return out();
    }
    case "meeting.react": {
      const m = meetingFor(doc, sel, "in");
      m.lastReaction = sv;
      return out();
    }
    case "meeting.share": {
      const m = meetingFor(doc, sel, "in");
      m.sharing = sv;
      return out();
    }
    case "meeting.stopShare": {
      const m = meetingFor(doc, sel, "in");
      m.sharing = null;
      return out();
    }
    case "meeting.record": {
      const m = meetingFor(doc, sel, "in");
      m.recording = sv.toLowerCase() !== "stop";
      if (m.recording) m.transcribing = true;
      return out();
    }
    case "meeting.transcribe": {
      const m = meetingFor(doc, sel, "in");
      m.transcribing = sv.toLowerCase() !== "stop";
      return out();
    }
    case "meeting.captions": {
      const m = meetingFor(doc, sel, "in");
      m.captions = ON(v);
      return out();
    }
    case "meeting.admit": {
      const m = meetingFor(doc, sel, "in");
      const who = sv === "all" ? m.lobby ?? [] : [sv];
      m.lobby = (m.lobby ?? []).filter((p) => !who.includes(p));
      for (const p of who) if (!m.participants.some((x) => x.id === p)) m.participants.push({ id: p, muted: true, camera: true });
      return out();
    }
    case "meeting.deny": {
      const m = meetingFor(doc, sel, "in");
      m.lobby = (m.lobby ?? []).filter((p) => p !== sv);
      return out();
    }
    case "meeting.muteAll": {
      const m = meetingFor(doc, sel, "in");
      for (const p of m.participants) p.muted = true;
      return out();
    }
    case "meeting.mutePerson": {
      const m = meetingFor(doc, sel, "in");
      const p = m.participants.find((x) => x.id === sv);
      if (p) p.muted = true;
      return out();
    }
    case "meeting.leave":
    case "meeting.end": {
      const m = doc.meeting;
      if (m) {
        const chat = m.id.startsWith("call-") ? findChat(doc, m.id.slice(5)) : ensureMeetingChat(doc, m.id);
        chat?.messages.push({ id: nextId(doc), from: "me", time: now(doc), text: "", system: c.id === "meeting.end" ? "Meeting ended" : m.recording ? "You left the meeting. Recording saved to the chat." : "You left the meeting." });
        const ev = findEvent(doc, m.id);
        if (ev && c.id === "meeting.end") ev.live = false;
      }
      doc.meeting = null;
      doc.flags = { ...(doc.flags ?? {}), left: m?.id ?? "" };
      return out({ selection: "" });
    }

    /* ---------- calls ---------- */
    case "calls.call": {
      let ch = doc.chats.find((x) => !x.title && x.members.length === 1 && x.members[0] === sv);
      if (!ch) {
        ch = { id: `chat-${sv}`, members: [sv], kind: "chat", messages: [] };
        doc.chats.unshift(ch);
      }
      const m = newMeeting(doc, `call-${ch.id}`, "in");
      m.camera = false;
      doc.meeting = m;
      return out({ selection: `meeting:${m.id}` });
    }

    case "activity.open": {
      const a = doc.activity?.find((x) => x.id === sv);
      if (a) a.unread = false;
      return out();
    }
  }
  return out();
}

/* ------------------------------------------------------------------ */
/* Validator support                                                   */
/* ------------------------------------------------------------------ */

export function teamsSelectionExists(doc: TeamsDoc, sel: string): boolean {
  if (!sel) return true;
  const [kind, id] = splitKey(sel);
  switch (kind) {
    case "status":
    case "settings":
    case "schedule":
    case "view":
      return true;
    case "chat":
      return Boolean(findChat(doc, id));
    case "newchat":
      return id.split("+").every((p) => doc.people.some((x) => x.id === p));
    case "channel":
    case "files":
      return Boolean(findChannel(doc, id));
    case "msg":
    case "reply":
    case "edit":
    case "forward":
      return Boolean(findMessage(doc, id));
    case "file":
    case "rename":
    case "share":
      return Boolean(findFile(doc, id));
    case "folder":
    case "newfolder":
      return id === "root" || id === "" || Boolean(doc.files?.some((f) => f.id === id && f.isFolder));
    case "person":
      return doc.people.some((p) => p.id === id);
    case "event":
      return Boolean(findEvent(doc, id));
    case "prejoin":
    case "meeting":
    case "meetingchat":
      if (id === "meetnow") return true;
      if (id.startsWith("call-")) return Boolean(findChat(doc, id.slice(5)));
      return Boolean(findEvent(doc, id));
  }
  return false;
}

export function teamsInitialUi(doc: TeamsDoc): SimUi {
  const s = doc.start ?? {};
  const view = s.view ?? "chat";
  let conv = s.conv;
  if (!conv && view === "chat") conv = doc.chats.find((c) => !c.hidden)?.id;
  if (!conv && view === "teams") conv = doc.teams[0]?.channels[0]?.id;
  const selection = doc.meeting ? `${doc.meeting.stage === "prejoin" ? "prejoin" : "meeting"}:${doc.meeting.id}` : conv ? `${view === "teams" ? "channel" : "chat"}:${conv}` : "";
  const u: TeamsUiState = { selection, view, conv, tab: s.tab, folder: s.folder ?? "root", overlay: s.settings ? "settings" : null, settingsPage: "devices" };
  return u as SimUi;
}

export function describeTeams(doc: TeamsDoc, ui: SimUi): string {
  const [kind, id] = splitKey(ui.selection ?? "");
  if (kind === "msg") return "Message";
  if (kind === "chat") {
    const c = findChat(doc, id);
    return c ? chatTitle(doc, c) : "Chat";
  }
  if (kind === "channel") return findChannel(doc, id)?.channel.name ?? "Channel";
  return ui.selection;
}
