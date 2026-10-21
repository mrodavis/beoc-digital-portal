/**
 * Microsoft Teams (new Teams) document model.
 *
 * Selection keys (ui.selection). Every committing control first selects the
 * object it acts on, so `requires.selection` names that object:
 *   "chat:<chatId>"        a chat (list item menu, header buttons, compose box)
 *   "channel:<channelId>"  a channel (Posts compose box, channel menu)
 *   "files:<channelId>"    a channel's Files tab (Upload)
 *   "msg:<messageId>"      a chat message or channel post/reply (reactions, … menu)
 *   "reply:<messageId>"    the reply box under a post / a quoted reply in a chat
 *   "meetingchat:<id>"     the chat panel inside a meeting
 *   "file:<fileId>"        a file (Files tab, OneDrive)
 *   "folder:<folderId>"    a OneDrive folder ("folder:root" is My files)
 *   "event:<eventId>"      a calendar event (details card: Join, RSVP)
 *   "prejoin:<meetingId>"  the pre-join screen (camera, mic, effects, audio, Join now)
 *   "meeting:<meetingId>"  the meeting window (toolbar, People, Share, Leave)
 *   "person:<personId>"    a person (Calls)
 *   "status"               your profile card (presence, status message)
 *   "settings"             Settings (Devices, Notifications and activity, Chats and channels, Appearance)
 *   "schedule"             the New event form (Calendar › New event, a chat's Schedule a meeting, a channel's Meet › Schedule a meeting)
 *   "discover"             New items › Join team (team.join)
 *   "planner" / "approvals" the Planner and Approvals apps (Apps on the app bar)
 *   "reader:<messageId>"   Immersive Reader
 * Meeting ids are event ids, or "call-<chatId>" for a call started from a chat.
 *
 * Layout (doc.layout): "combined" (default, as in current Teams) shows teams
 * and channels inside Chat under Favorites / Chats / Teams and channels, and
 * the app bar has no Teams button. "separate" restores the Teams button.
 * A channel opened from Chat keeps view "chat"; selection keys don't change.
 * Channel tabs: Posts, Shared (the Files tab became Shared in January 2026;
 * its selection key is still "files:<channelId>"), plus added tabs.
 *
 * Type targets (commits from text boxes, Enter or Send):
 *   "chat:<id>", "channel:<id>", "reply:<msgId>", "edit:<msgId>",
 *   "meetingchat:<meetingId>", "newchat:<personId>+<personId>" (ids sorted),
 *   "rename:<fileId>", "newfolder:<folderId>", "chatname:<chatId>" (name a group chat),
 *   "notes:<meetingId>" (meeting Notes), "comment:<fileId>" (a comment in an open file),
 *   "loop:<messageId>" (add an item to a Loop component in a message),
 *   "planner:new" (Task: …, Due: MM/DD/YYYY, Assigned to: …),
 *   "approval:new" (Approval name: …, Approvers: a; b, Details: …),
 *   "joinid" (Meeting ID: …, Passcode: …), "addpeople:<chatId>" (People: a; b, History: …).
 * A channel post starts with "Subject: …" or "Headline: …" (announcement) on its own
 * first line when the learner filled that field.
 * Forms commit as a "type" on the form's target with one "Field: value" per
 * line, so tasks can check several fields with match "all":
 *   "status"            Status message: …, Clear after: …, Show when people message me: Yes|No
 *   "schedule"          Title, Attendees (names sorted, "; "), Date (MM/DD/YYYY), Start, End, Repeat, Channel, Location, Details
 *   "share:<fileId>"    People, Link: (Anyone with the link | People in <org> | People with existing access | People you choose), Permission: (Can edit | Can view), Message, Action: (Send | Copy link)
 *   "forward:<msgId>"   To: <name>, Message: …
 * Message text uses **bold**, *italic*, ~~strike~~, "- " bullets, "1. " numbers
 * and "@Full Name" mentions; the committed value carries those markers.
 */
import type { SimAction, SimStep, SimValue } from "@/types/sim";

export type TeamsPresence =
  | "Available"
  | "Busy"
  | "Do not disturb"
  | "Be right back"
  | "Away"
  | "Offline"
  | "In a meeting"
  | "In a call"
  | "Presenting"
  | "Out of office";

export type TeamsView = "activity" | "chat" | "teams" | "calendar" | "calls" | "onedrive" | "apps" | "planner" | "approvals";

export type TeamsPerson = {
  id: string;
  name: string;
  title?: string;
  email?: string;
  presence?: TeamsPresence;
  statusMessage?: string;
  /** Avatar color; one is picked from the name when omitted. */
  color?: string;
};

export type TeamsMessage = {
  id: string;
  /** Person id, or "me". */
  from: string;
  time: string;
  text: string;
  /** Reaction name (Like, Heart, Laugh, Surprised, Sad, Angry, Check mark, Eyes, Clap, Thank you) → person ids ("me" for you). */
  reactions?: Record<string, string[]>;
  /** Channel thread replies. */
  replies?: TeamsMessage[];
  /** Quoted message for a chat reply. */
  quote?: { from: string; text: string };
  attachments?: string[];
  edited?: boolean;
  deleted?: boolean;
  pinned?: boolean;
  saved?: boolean;
  important?: boolean;
  subject?: string;
  /** A centered system line instead of a bubble ("Meeting ended: 31m 12s"). */
  system?: string;
  /** Channel announcement headline. */
  headline?: string;
  /** A Loop component sent in the message (everyone in the chat can edit it). */
  loop?: { kind: string; items: string[] };
};

export type TeamsChat = {
  id: string;
  /** Group or meeting chat name; one-on-one chats show the other person's name. */
  title?: string;
  /** Person ids (not including you). */
  members: string[];
  kind?: "chat" | "group" | "meeting";
  /** Meeting chats: the event they belong to. */
  event?: string;
  messages: TeamsMessage[];
  unread?: boolean;
  pinned?: boolean;
  muted?: boolean;
  hidden?: boolean;
};

export type TeamsChannel = {
  id: string;
  name: string;
  description?: string;
  posts: TeamsMessage[];
  unread?: boolean;
  /** All activity | Off (older sims also use All new posts | Mentions and replies) */
  notifications?: string;
  pinned?: boolean;
  /** Tabs added with Add a tab (+), shown after Posts and Shared. */
  tabs?: { id: string; name: string; app: string }[];
};

export type TeamsTeam = {
  id: string;
  name: string;
  color?: string;
  description?: string;
  /** Member count shown in Join team. */
  members?: number;
  channels: TeamsChannel[];
};

export type TeamsFile = {
  id: string;
  name: string;
  /** "ch:<channelId>" for a channel's Files tab, "root" or a folder id for OneDrive. */
  folder: string;
  isFolder?: boolean;
  modified?: string;
  modifiedBy?: string;
  size?: string;
  pinned?: boolean;
  /** Sharing summary shown in OneDrive ("Private", "Shared", "Anyone with the link can view"). */
  sharing?: string;
  /** One or two lines shown when the file is opened. */
  preview?: string;
  /** People editing the file right now (co-authoring avatars). */
  editors?: string[];
  comments?: { from: string; text: string }[];
};

export type TeamsEvent = {
  id: string;
  title: string;
  /** ISO date, e.g. "2026-10-21". */
  day: string;
  start: string;
  end: string;
  organizer: string;
  attendees: string[];
  /** Teams meeting (has Join). Default true. */
  online?: boolean;
  location?: string;
  details?: string;
  repeat?: string;
  channel?: string;
  response?: "Accepted" | "Tentative" | "Declined";
  /** You organize it (Mute all, Admit, End meeting, recording). */
  youOrganize?: boolean;
  /** Already in the meeting when you join. */
  participants?: string[];
  /** Participants whose mic is on. */
  unmuted?: string[];
  /** Waiting in the lobby once you join. */
  lobby?: string[];
  /** Meeting chat id. */
  chat?: string;
  /** Meeting in progress (calendar shows it highlighted). */
  live?: boolean;
  /** Optional attendees. */
  optional?: string[];
  /** For Join with an ID. */
  meetingId?: string;
  passcode?: string;
  /** People who join as attendees (everyone else invited joins as a presenter). */
  attendeesRole?: string[];
};

export type TeamsActivity = {
  id: string;
  kind: "mention" | "reply" | "reaction" | "meeting" | "file" | "missed";
  from: string;
  text: string;
  /** Where it happened, e.g. "Front Desk > Scheduling". */
  where: string;
  time: string;
  /** Message id it points at. */
  target?: string;
  unread?: boolean;
};

export type TeamsDevices = {
  speakers: string[];
  microphones: string[];
  cameras: string[];
  speaker: string;
  microphone: string;
  camera: string;
  /** Auto | High | Low | Off */
  noise?: string;
  /** Set after Make a test call. */
  testCall?: boolean;
};

export type TeamsParticipant = { id: string; muted?: boolean; hand?: boolean; camera?: boolean; role?: "Presenter" | "Attendee" | "Co-organizer" };

export type TeamsMeeting = {
  id: string;
  title: string;
  stage: "prejoin" | "in";
  camera: boolean;
  mic: boolean;
  /** None | Blur | a background name */
  background: string;
  /** Computer audio | Room audio | Phone audio | Don't use audio */
  audio: string;
  hand?: boolean;
  sharing?: string | null;
  recording?: boolean;
  transcribing?: boolean;
  captions?: boolean;
  participants: TeamsParticipant[];
  lobby?: string[];
  organizer?: boolean;
  lastReaction?: string;
  view?: string;
  /** Chat id of the meeting chat. */
  chat?: string;
  /** Meeting notes (Notes in the meeting controls). */
  notes?: string[];
};

export type TeamsDoc = {
  /** Organization name shown in the title bar and share settings. */
  org?: string;
  me: {
    name: string;
    title?: string;
    email?: string;
    presence: TeamsPresence;
    statusMessage?: string;
    statusClearAfter?: string;
  };
  people: TeamsPerson[];
  chats: TeamsChat[];
  teams: TeamsTeam[];
  files?: TeamsFile[];
  /** Files offered by "Upload from this device". */
  localFiles?: { name: string; size?: string }[];
  events?: TeamsEvent[];
  /** ISO date of "today" (default 2026-10-20). */
  today?: string;
  /** Clock time used for new messages (default "10:02 AM"). */
  now?: string;
  activity?: TeamsActivity[];
  devices?: TeamsDevices;
  /** Defaults copied into a meeting when the pre-join screen opens. */
  av?: { camera: boolean; mic: boolean; background?: string };
  meeting?: TeamsMeeting | null;
  /** Windows offered by Share › Window. */
  windows?: string[];
  backgrounds?: string[];
  /** "combined" (default): teams and channels live in Chat. "separate": Teams has its own app bar button. */
  layout?: "combined" | "separate";
  /** Teams the learner can find with New items › Join team. */
  discover?: TeamsTeam[];
  /** Planner tasks (Apps › Planner › My Tasks). */
  tasks?: { id: string; title: string; due?: string; assigned?: string; done?: boolean; plan?: string }[];
  /** Approvals (Apps › Approvals). */
  approvals?: { id: string; name: string; approvers: string[]; details?: string; status: string; from?: string }[];
  /** Apps pinned to the app bar (planner, approvals). */
  pinnedApps?: string[];
  /** Settings the learner can change. */
  settings?: { theme?: string; notify?: Record<string, string> };
  /** Where the sim opens. */
  start?: { view?: TeamsView; conv?: string; tab?: string; folder?: string; settings?: boolean; settingsPage?: string };
  /** Attachments waiting in a compose box, keyed by compose target. */
  drafts?: Record<string, string[]>;
  /** Delivery option (Important) waiting in a compose box, keyed by compose target. */
  delivery?: Record<string, string>;
  /** Loop component waiting in a compose box, keyed by compose target. */
  loopDrafts?: Record<string, string>;
  seq?: number;
  clipboard?: string;
  flags?: Record<string, SimValue>;
};

/** Extra UI keys the Teams canvas keeps alongside `selection`. */
export type TeamsUiState = {
  selection: string;
  view?: TeamsView;
  /** Open chat id or channel id. */
  conv?: string;
  /** Channel tab: posts | files. Chat tab: chat | shared. */
  tab?: string;
  folder?: string;
  overlay?: "settings" | "schedule" | "discover" | null;
  settingsPage?: string;
  /** Prefill for the New event form: "chat:<id>" or "channel:<id>". */
  prefill?: string;
  highlight?: string;
  /** Activity item open in the Activity view. */
  activity?: string;
};

export const teamsDoc = (d: TeamsDoc) => d as unknown as Record<string, unknown>;

/**
 * A typing step graded with match "all": the learner passes with any text that
 * contains every keyword (a keyword may be a list of alternatives, e.g.
 * ["3 bullets", "three bullets"]). `sample` is one complete answer; it is the
 * main action so the validator, which replays the main action, can play it.
 */
export function typeAll(target: string, sample: string, keywords: (string | string[])[], extra?: Omit<SimStep, "action" | "alt">): SimStep {
  const norm = (x: string) => x.toLowerCase().replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
  let combos: string[][] = [[]];
  for (const k of keywords) {
    const opts = Array.isArray(k) ? k : [k];
    combos = combos.flatMap((c) => opts.map((o) => [...c, o])).slice(0, 32);
  }
  const s = norm(sample);
  if (!combos.some((c) => c.every((k) => s.includes(norm(k))))) throw new Error(`typeAll sample for ${target} is missing a keyword: ${sample}`);
  const alt: SimAction[] = combos.map((c) => ({ kind: "type", target, value: c, match: "all" }));
  return { action: { kind: "type", target, value: sample, match: "includes" }, alt, ...(extra ?? {}) };
}
