/**
 * Gmail, Google Calendar and Google Meet in one browser session (app "gmail").
 *
 * The sim's "today" is Wednesday, October 21, 2026 (doc.today) and the clock
 * is doc.now ("10:02"). Dates are ISO ("2026-10-21"), times 24-hour ("13:30");
 * committed text shows them the way Google does ("Thu, Oct 22", "1:30 PM").
 *
 * SURFACES (doc.surface): "mail" (mail.google.com), "calendar"
 * (calendar.google.com), "meet" (meet.google.com), "chat" (Chat in Gmail).
 *
 * SELECTION KEYS (ui.selection)
 *   msg:<id>              a message: its checkbox in the list, or the open conversation
 *                         ("msg:m1,msg:m2" several checked; order does not matter)
 *   evt:<id>              a calendar event or task (its details card is open)
 *   cal:<id>              a calendar in My calendars (its Options menu)
 *   meet                  the meeting window (pre-join or in the call)
 *   space:<id>            a Google Chat space or conversation
 *
 * JUDGED COMMANDS (value in parentheses; act on the selection)
 *   Mail   gm.archive, gm.delete, gm.deleteForever, gm.emptyTrash, gm.spam, gm.notSpam,
 *          gm.phishing, gm.block (email), gm.unsubscribe, gm.read (read | unread),
 *          gm.star (on | off), gm.important (on | off), gm.snooze (Later today | Tomorrow |
 *          This weekend | Next week | a picked "Mon, Oct 26, 8:00 AM"), gm.labels (the
 *          conversation's labels after Apply, sorted, "; " joined, "" for none),
 *          gm.moveTo (Inbox | a label name | Spam | Trash), gm.category (Primary | Social |
 *          Promotions | Updates | Forums: dragging a row to a tab), gm.undoSend (message id),
 *          gm.cancelSend (message id), gm.search (the query, canonical: see canonicalQuery),
 *          gm.filter.delete (filter id)
 *   Calendar  cal.rsvp (Yes | No | Maybe), cal.delete, cal.taskDone
 *   Meet   meet.mic (on | off), meet.camera (on | off), meet.effects (None | Slightly blur |
 *          Blur | a background name), meet.join, meet.captions (on | off), meet.react (emoji name),
 *          meet.present ("A tab: <title>" | "A window: <title>" | "Your entire screen"),
 *          meet.stopPresent, meet.hand (raise | lower), meet.layout (Auto (dynamic) |
 *          Tiled (legacy) | Spotlight | Sidebar), meet.leave, meet.record (start | stop)
 *   Chat   chat.newSpace is a type target (below)
 * FREE COMMANDS (navigation, never a miss; they still complete a step that asks for them)
 *   app (mail | calendar | meet | chat), gm.go (inbox | starred | snoozed | sent | drafts |
 *   scheduled | important | all | spam | trash | label:<name>), gm.tab (a category),
 *   gm.open (message id), gm.back, gm.settings (General | Labels | Inbox | Filters and
 *   blocked addresses | close), gm.draft, cal.view (Day | Week | Month), cal.go (ISO date),
 *   cal.today, cal.open (event id), cal.close, cal.page (settings | settings:<calId> | newcal |
 *   close), cal.show ("<calId>|on" | "<calId>|off"), meet.open (meeting code), meet.home,
 *   meet.panel (people | chat | details | tools | ""), chat.open (space id), toast
 *
 * TYPE TARGETS (forms commit one "type" with one "Field: value" per line; check them
 * with match "all" or the typeAll helper)
 *   send:new | send:reply:<msgId> | send:replyAll:<msgId> | send:forward:<msgId>
 *       To: <email>   (one line per recipient; also Cc: and Bcc:)
 *       Subject: …
 *       Attachment: <file name>          a file attached from the computer
 *       Drive link: <file name>          a Drive file inserted as a link (also files over 25 MB)
 *       Drive access: Viewer | Commenter | Editor | Don't give access   (when asked on Send)
 *       Confidential: Expires in 1 week | …; No SMS passcode | SMS passcode
 *       Send: Now | Scheduled <Thu, Oct 22, 8:00 AM>
 *       Signature: <signature name>
 *       Body: <the text the learner wrote; the quoted original is not included>
 *   newlabel            "Name" or "Parent/Name"
 *   filter              From: / To: / Subject: / Has the words: / Doesn't have: / Has attachment,
 *                       then one line per action: Skip the Inbox (Archive it) | Mark as read |
 *                       Star it | Apply the label: <name> | Forward it: <email> | Delete it |
 *                       Never send it to Spam | Always mark it as important |
 *                       Never mark it as important | Categorize as: <tab>, and
 *                       "Also apply filter to matching conversations" when checked
 *   categories          Categories: Primary, Promotions, … (Quick settings › Inbox type › Customize)
 *   settings:general    Undo Send: <n> seconds / Default reply behavior: Reply | Reply all /
 *                       Signature: <name> = <text> / For new emails use: <name> /
 *                       On reply/forward use: <name> / Vacation responder: on | off /
 *                       First day: <Oct 26, 2026> / Last day: <Oct 30, 2026> | Last day: none /
 *                       Subject: … / Message: … / Only send a response to people in my Contacts: yes | no
 *   settings:inbox      Categories: … / Importance markers: Show markers | No markers
 *   event:new | event:<id>   Title / Date: Thu, Oct 22, 2026 / Start: 10:00 AM / End: 11:00 AM /
 *                       All day: yes | no / Repeat: Does not repeat | Daily | Weekly on Thursday | … /
 *                       Time zone: <name> / Guest: <email> (one per guest) / Optional: <email> /
 *                       Google Meet: yes | no / Location: … / Notification: 10 minutes before |
 *                       Email: 1 day before (one per notification) / Calendar: <name> /
 *                       Guests can: modify event, invite others, see guest list /
 *                       Description: … / Invitations: Send | Don't send | none
 *   task:new            Title / Date / Time / Description / List
 *   appointments:new    Title / Duration / Availability: Mon 9:00 AM - 12:00 PM (one per day) /
 *                       Scheduling window: … / Buffer time: … / Location: Google Meet video
 *                       conferencing | … / Description / Booking form: First name, Last name,
 *                       Email address, Phone number
 *   calshare:<calId>    Share with: <email> / Permission: <permission label>
 *   calpublic:<calId>   Make available to public: on | off
 *   newcal              Name / Description
 *   settings:timezone   Primary time zone: … / Show additional time zones: on | off /
 *                       Secondary time zone: …
 *   meetcode            the code typed on meet.google.com ("Enter a code or nickname")
 *   meetchat            a message sent in the meeting's chat
 *   chat:<spaceId>      a message posted in Google Chat
 *   newspace            Space name: … / People: <email>; <email>
 */
import type { SimValue } from "@/types/sim";

export type GmSurface = "mail" | "calendar" | "meet" | "chat";

export type GmPerson = {
  name: string;
  email: string;
  /** Avatar color; picked from the name when omitted. */
  color?: string;
  /** In the signed-in person's Contacts (vacation responder "only Contacts"). */
  contact?: boolean;
};

export type GmAttachment = {
  name: string;
  /** Display size, e.g. "212 KB" or "38 MB". */
  size?: string;
  /** Size in MB: over 25 becomes a Drive link automatically. */
  mb?: number;
  /** Sent as a Google Drive link rather than an attached copy. */
  drive?: boolean;
};

export type GmBox = "inbox" | "archive" | "sent" | "drafts" | "scheduled" | "spam" | "trash" | "snoozed";
export type GmCategory = "Primary" | "Social" | "Promotions" | "Updates" | "Forums";

export type GmMessage = {
  id: string;
  /** Conversation id; messages with the same thread show as one conversation. Defaults to the id. */
  thread?: string;
  /** Sender email; "me" is the signed-in account. */
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  /** Plain text. Blank lines separate paragraphs. Links: [text](https://url). */
  body: string;
  /** ISO date-time "2026-10-21T09:42". */
  date: string;
  box: GmBox;
  unread?: boolean;
  starred?: boolean;
  important?: boolean;
  /** Label names. */
  labels?: string[];
  /** Inbox tab; Primary when omitted. */
  category?: GmCategory;
  attachments?: GmAttachment[];
  /** Snoozed until, as Gmail shows it ("Thu, Oct 22, 8:00 AM"). */
  snoozeUntil?: string;
  /** Scheduled send time ("Thu, Oct 22, 8:00 AM"). */
  scheduledFor?: string;
  /** Confidential mode summary shown on the message. */
  confidential?: string;
  /** Gmail's warning banner ("This message seems dangerous"). */
  warning?: string;
  /** Shows Unsubscribe next to the sender. */
  unsubscribe?: boolean;
  /** Calendar event this message invites you to (Yes / No / Maybe on the message). */
  invite?: string;
  /** Box before it went to Trash or Spam (restores there). */
  prevBox?: GmBox;
  /** Signature name added when sent. */
  signature?: string;
};

export type GmLabel = { name: string; color?: string };

export type GmFilter = {
  id: string;
  /** Criteria and actions as the filter form commits them, one per line. */
  lines: string[];
};

export type GmSignature = { name: string; text: string };

export type GmVacation = {
  on: boolean;
  first?: string;
  last?: string;
  subject?: string;
  message?: string;
  contactsOnly?: boolean;
};

export type GmSettings = {
  /** Undo Send cancellation period in seconds: 5, 10, 20 or 30. */
  undoSend?: number;
  replyDefault?: "Reply" | "Reply all";
  signatures?: GmSignature[];
  sigNew?: string;
  sigReply?: string;
  vacation?: GmVacation;
  /** Inbox tabs that are on (Primary is always on). */
  categories?: GmCategory[];
  importanceMarkers?: boolean;
};

export type GmDriveFile = {
  name: string;
  /** doc | sheet | slides | pdf | image | folder */
  kind: string;
  /** Emails that already have access. */
  sharedWith?: string[];
};

/* ---------------- Calendar ---------------- */

export type GmCalendar = {
  id: string;
  name: string;
  color: string;
  /** Your own calendar (My calendars); others are under Other calendars. */
  mine?: boolean;
  /** Unchecked in the list (its events are hidden). */
  off?: boolean;
  description?: string;
  /** People it is shared with. */
  shared?: { email: string; permission: string }[];
  public?: boolean;
};

export type GmGuest = { email: string; response?: "Yes" | "No" | "Maybe" | "Awaiting"; optional?: boolean };

export type GmEvent = {
  id: string;
  title: string;
  /** ISO date. */
  day: string;
  /** 24-hour "13:30"; omitted for all-day events. */
  start?: string;
  end?: string;
  allDay?: boolean;
  /** Calendar id. */
  calendar: string;
  /** Organizer email; you when omitted. */
  organizer?: string;
  guests?: GmGuest[];
  /** Google Meet code ("kpr-tmwq-zse"). */
  meet?: string;
  location?: string;
  description?: string;
  /** "Weekly on Thursday" … */
  repeat?: string;
  /** "10 minutes before" (popup) or "Email: 1 day before". */
  notifications?: string[];
  timeZone?: string;
  /** Your answer when someone else organizes it. */
  myResponse?: "Yes" | "No" | "Maybe";
  kind?: "event" | "task" | "appointments";
  done?: boolean;
  guestPerms?: string[];
};

/** Someone else's busy time, for Find a time. */
export type GmBusy = { email: string; day: string; start: string; end: string; title?: string };

/* ---------------- Meet ---------------- */

export type GmParticipant = { email: string; muted?: boolean; camera?: boolean; hand?: boolean };

export type GmRoom = {
  /** Meeting code, "kpr-tmwq-zse". */
  code: string;
  title: string;
  /** Calendar event it belongs to. */
  event?: string;
  /** People already in the call. */
  participants: GmParticipant[];
  /** Messages already in the meeting chat. */
  chat?: { from: string; text: string; time: string }[];
  /** Captions that scroll while captions are on. */
  captions?: { from: string; text: string }[];
  /** The account can record (Meeting tools › Recording). */
  canRecord?: boolean;
  /** You are not invited: Ask to join. */
  askToJoin?: boolean;
};

export type GmMeeting = {
  code: string;
  stage: "prejoin" | "in" | "left";
  mic: boolean;
  camera: boolean;
  effect?: string;
  captions?: boolean;
  hand?: boolean;
  layout?: string;
  presenting?: string | null;
  panel?: string | null;
  recording?: boolean;
  lastReaction?: string;
  chat: { from: string; text: string; time: string }[];
  participants: GmParticipant[];
};

/* ---------------- Chat ---------------- */

export type GmSpace = {
  id: string;
  name: string;
  /** "space" or a direct message ("dm"). */
  kind: "space" | "dm";
  members: string[];
  messages: { from: string; text: string; time: string }[];
  unread?: boolean;
};

/* ---------------- The session ---------------- */

export type GmView = {
  /** Mail: current folder (inbox, starred, …, label:<name>, search). */
  folder?: string;
  /** Inbox tab in view. */
  tab?: GmCategory;
  /** Conversation (thread id) open in the reading view. */
  open?: string | null;
  /** Last search query. */
  search?: string;
  /** Settings page tab, or null. */
  settings?: string | null;
  /** Calendar view and the date in view. */
  calView?: "Day" | "Week" | "Month";
  calDate?: string;
  /** Calendar full page: "settings", "settings:<calId>", "newcal", or null. */
  calPage?: string | null;
  /** Chat: open space. */
  space?: string | null;
};

export type GmailDoc = {
  surface: GmSurface;
  me: GmPerson;
  /** Directory for autocomplete, avatars and the guest list. */
  people: GmPerson[];
  org?: { name: string; domain: string };
  messages: GmMessage[];
  labels?: GmLabel[];
  filters?: GmFilter[];
  settings?: GmSettings;
  blocked?: string[];
  /** Files on this computer (Attach files). */
  computer?: GmAttachment[];
  /** Files in Google Drive (Insert files using Drive). */
  drive?: GmDriveFile[];
  calendars?: GmCalendar[];
  events?: GmEvent[];
  busy?: GmBusy[];
  rooms?: GmRoom[];
  meeting?: GmMeeting | null;
  spaces?: GmSpace[];
  /** Browser tabs other than Gmail that Meet's "Present now › A tab" offers. */
  browserTabs?: string[];
  /** Windows that "Present now › A window" offers. */
  windows?: string[];
  /** Tabs open in this browser window (mail, calendar, meet). Mail is always open. */
  tabs?: GmSurface[];
  view?: GmView;
  /** ISO date of today (default 2026-10-21) and the clock (default "10:02"). */
  today?: string;
  now?: string;
  /** Bottom-left notice ("Message sent", "Conversation archived"). */
  toast?: { text: string; undo?: string; view?: string } | null;
  /** A just-unsent message to reopen in a compose window. */
  reopen?: { target: string; to: string[]; cc: string[]; bcc: string[]; subject: string; body: string; seq: number } | null;
  /** Counter for new ids and compose bookkeeping. */
  seq?: number;
  /** The last send target the model applied (the canvas closes that compose window). */
  lastSent?: { target: string; seq: number } | null;
  flags?: Record<string, SimValue>;
};

/** Type helper for sim files: `initial: gmailDoc({ ... })`. */
export const gmailDoc = (d: GmailDoc) => d as unknown as Record<string, unknown>;
