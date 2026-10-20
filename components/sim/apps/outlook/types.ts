/**
 * Outlook (classic desktop / Microsoft 365) practice-sim document model.
 *
 * Dates are naive local times: "2026-10-20T09:30" (date-time) or "2026-10-20"
 * (date). The sim's "today" is Tuesday, October 20, 2026 unless `now` says
 * otherwise. Dialog and save values use US formats: "10/27/2026", "2:00 PM".
 *
 * SELECTION KEYS (ui.selection)
 *   msg:<id>                  a message ("msg:m1,msg:m2" for several, Ctrl+click)
 *   evt:<id>                  a calendar item
 *   evt:<id>@<yyyy-mm-dd>     one occurrence of a recurring calendar item
 *   contact:<id> / group:<id> a contact or contact group (People)
 *   task:<id>                 a task (flagged messages in To-Do use msg:<id>)
 *   folder:<id>               a mail folder (right-click / Folder tab commands)
 *   slot:<yyyy-mm-ddThh:mm>   an empty calendar time slot
 *
 * TYPE TARGETS (text committed when the learner sends, saves, or presses Enter)
 *   compose.to | compose.cc | compose.bcc   recipients of the open message: emails
 *                                            (or contact group names), sorted, "; " joined
 *   compose.subject | compose.body          subject and the text the learner wrote
 *                                            (the quoted original of a reply is not included)
 *   event.required | event.optional         attendees of the open meeting form (sorted, "; ")
 *   event.body                              notes / agenda of the open appointment or meeting
 *   form.notes                              notes of the open contact or task form
 *   task.to                                 "To" line of an assigned task (sorted, "; ")
 *   group.members                           members of the open contact group (sorted, "; ")
 *   folder:<id>                             rename a folder in place
 *   tasks.new                               "Type a new task" box in the To-Do list
 *   contact:<id>.activity                   a logged activity, serialized as
 *                                            "<Type> | <M/D/YYYY> | <summary> | Next step: <text> | Follow-up: <M/D/YYYY>"
 *   signatures                              Signatures and Stationery dialog, serialized as
 *                                            "New messages: <name> | Replies/forwards: <name> | [<name>] <text> | [<name>] <text>"
 *   autoReplies                             Automatic Replies dialog, serialized as
 *                                            "Send automatic replies | Time range: 10/26/2026 8:00 AM to 10/28/2026 5:00 PM |
 *                                             Inside: <text> | Outside (Anyone outside my organization): <text>"
 *                                            ("Do not send automatic replies", "Time range: off", "Outside: off")
 *   Use match "all" with pieces of these strings, e.g. ["[Standard]", "Office Assistant", "New messages: Standard"].
 *
 * SAVE DIALOGS (one dialog commit when a form is saved; steps check only the keys they list)
 *   event.save    title, location, startDate, startTime, endDate, endTime, allDay, reminder,
 *                 showAs, recurrence ("Weekly on Friday", "Every weekday", "" when none),
 *                 teams, private, meeting
 *   contact.save  name, company, jobTitle, email, phone, mobile, address
 *   task.save     subject, startDate, dueDate ("None" when blank), status, priority, percent,
 *                 reminder, reminderDate, reminderTime
 *   group.save    name
 *
 * Category commands use the color slot name ("Red Category" … "Purple Category");
 * `categoryNames` can rename a slot ("Red Category" → "Urgent"), which is what
 * the learner sees in menus and on items.
 */

export type OlPerson = { name: string; email: string };

export type OlShowAs = "Free" | "Working Elsewhere" | "Tentative" | "Busy" | "Out of Office";

export type OlFlag = {
  start?: string;
  due?: string;
  /** "Today", "Tomorrow", "This Week", "Next Week", "No Date", "Custom", or a flag-to label such as "Call". */
  label?: string;
  reminder?: string;
  complete?: boolean;
};

export type OlAttachment = { name: string; size?: string; link?: boolean };

export type OlRecurrence = {
  freq: "daily" | "weekly" | "monthly" | "yearly";
  interval?: number;
  /** Weekly: days of the week, 0 = Sunday. */
  days?: number[];
  /** Daily: every weekday. */
  weekdays?: boolean;
  /** Monthly: day of the month. */
  day?: number;
  /** End: number of occurrences or last date (yyyy-mm-dd). */
  count?: number;
  until?: string;
};

export type OlInvite = {
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  location?: string;
  organizer: OlPerson;
  required?: OlPerson[];
  optional?: OlPerson[];
  teams?: boolean;
  body?: string;
  recurrence?: OlRecurrence | null;
  /** Set once the learner responds. */
  response?: "Accepted" | "Tentative" | "Declined";
  /** request (default), cancel, or update. */
  kind?: "request" | "cancel" | "update";
  /** Calendar item this invite belongs to, once accepted. */
  eventId?: string;
};

export type OlDraft = {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
};

export type OlMessage = {
  id: string;
  /** Folder id: inbox, drafts, sent, deleted, archive, junk, outbox, or a custom folder id. */
  folder: string;
  from: OlPerson;
  to?: OlPerson[];
  cc?: OlPerson[];
  bcc?: OlPerson[];
  subject: string;
  /** Plain text. Blank lines separate paragraphs. Links: [text](https://url). */
  body: string;
  date: string;
  read?: boolean;
  flag?: OlFlag | null;
  categories?: string[];
  importance?: "High" | "Low";
  attachments?: OlAttachment[];
  /** In the Other tab of the Focused Inbox. */
  other?: boolean;
  /** Sender is outside the organization: shows the External tag. */
  external?: boolean;
  /** "You don't often get email from …" safety tip. */
  firstTime?: boolean;
  invite?: OlInvite;
  conversation?: string;
  /** "replied" | "repliedAll" | "forwarded" */
  replied?: string;
  ignored?: boolean;
  /** Drafts folder: what reopens in the compose form. */
  draft?: OlDraft;
  /** Outbox: scheduled send time. */
  sendAt?: string;
  reported?: string;
  pinned?: boolean;
};

export type OlFolder = { id: string; name: string; parent?: string };

export type OlEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  location?: string;
  body?: string;
  organizer?: OlPerson;
  required?: OlPerson[];
  optional?: OlPerson[];
  /** A meeting (has attendees) rather than an appointment. */
  meeting?: boolean;
  teams?: boolean;
  reminder?: string;
  showAs?: OlShowAs;
  recurrence?: OlRecurrence | null;
  /** Deleted occurrences (yyyy-mm-dd). */
  exceptions?: string[];
  categories?: string[];
  private?: boolean;
  /** Your response when someone else organized it. */
  response?: "Accepted" | "Tentative" | "Declined";
  /** Another calendar this item belongs to (shared/overlay calendars). */
  calendar?: string;
};

export type OlBusy = { start: string; end: string; status?: OlShowAs; title?: string };

export type OlActivity = {
  id: string;
  /** Phone Call, Email, Meeting, Note, Document. */
  type: string;
  date: string;
  summary: string;
  next?: string;
  due?: string;
};

export type OlContact = {
  id: string;
  name: string;
  company?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  notes?: string;
  categories?: string[];
  flag?: OlFlag | null;
  activities?: OlActivity[];
  /** Contact folder name; default "Contacts". */
  folder?: string;
};

export type OlGroup = { id: string; name: string; members: string[]; categories?: string[]; notes?: string };

export type OlTaskStatus = "Not Started" | "In Progress" | "Completed" | "Waiting on someone else" | "Deferred";

export type OlTask = {
  id: string;
  subject: string;
  start?: string;
  due?: string;
  status?: OlTaskStatus;
  priority?: "Low" | "Normal" | "High";
  percent?: number;
  /** Reminder date-time, when on. */
  reminder?: string;
  categories?: string[];
  notes?: string;
  /** Who it is assigned to (Assign Task), by name. */
  owner?: string;
  completedOn?: string;
};

export type OlRule = {
  id: string;
  name: string;
  from?: string;
  subject?: string;
  sentToMe?: boolean;
  moveTo?: string;
  category?: string;
  flag?: string;
  alert?: boolean;
  sound?: boolean;
};

export type OlQuickStep = { id: string; name: string; actions: { action: string; target?: string }[]; tooltip?: string };

export type OlFile = { name: string; location?: string; size?: string; cloud?: boolean };

export type OlCompose = {
  id: string;
  mode: "new" | "reply" | "replyAll" | "forward" | "response";
  /** Shown in the reading pane under the original (reply/forward) instead of in its own window. */
  inline?: boolean;
  /** Message replied to or forwarded. */
  of?: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  /** Original message shown under the reply (read-only). */
  quoted?: string;
  attachments: OlAttachment[];
  importance?: "High" | "Low";
  showBcc?: boolean;
  showFrom?: boolean;
  readReceipt?: boolean;
  deliveryReceipt?: boolean;
  /** Delay Delivery / Schedule Send. */
  sendAt?: string;
  /** Drafts message this compose was reopened from. */
  draftId?: string;
  /** Invite response or new-time proposal this message completes. */
  response?: { msg: string; kind: "Accepted" | "Tentative" | "Declined" | "Proposal" };
  format?: { bold?: boolean; italic?: boolean; underline?: boolean; font?: string; size?: string; color?: string; type?: "HTML" | "Plain Text" | "Rich Text" };
  /** Ribbon/keyboard Send request; the canvas commits the fields, then sends. */
  sendSeq?: number;
  /** Ctrl+S: the canvas saves the draft with what the learner typed. */
  saveSeq?: number;
  /** Address Book open. */
  addressBook?: string | null;
};

export type OlForm = {
  kind: "appointment" | "meeting" | "contact" | "task" | "group";
  /** Existing item being edited. */
  id?: string;
  data: OlFormData;
  /** Meeting/appointment: "main" | "scheduling". Task: "main" | "details". */
  view?: string;
  /** Ribbon Save & Close request; the canvas commits the form. */
  submitSeq?: number;
  /** Prefilled from an accepted invite or a slot. */
  from?: string;
};

export type OlFormData = {
  title?: string;
  location?: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  required?: string[];
  optional?: string[];
  body?: string;
  reminder?: string;
  showAs?: OlShowAs;
  recurrence?: OlRecurrence | null;
  teams?: boolean;
  private?: boolean;
  categories?: string[];
  importance?: "High" | "Low";
  /* contact */
  name?: string;
  company?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  notes?: string;
  flag?: OlFlag | null;
  /* task */
  subject?: string;
  startDate?: string;
  dueDate?: string;
  status?: OlTaskStatus;
  priority?: "Low" | "Normal" | "High";
  percent?: number;
  reminderOn?: boolean;
  reminderDate?: string;
  reminderTime?: string;
  assign?: boolean;
  assignTo?: string[];
  /* group */
  members?: string[];
};

export type OlModule = "mail" | "calendar" | "people" | "tasks";

export type OutlookDoc = {
  /** The signed-in mailbox. */
  account: OlPerson;
  /** Current date-time ("2026-10-20T09:30"); new items are stamped from it. */
  now?: string;
  folders?: OlFolder[];
  messages: OlMessage[];
  /** Messages that arrive on Send/Receive (F9); rules run on them. */
  incoming?: OlMessage[];
  events?: OlEvent[];
  /** Other people's free/busy blocks, by email (Scheduling Assistant). */
  freeBusy?: Record<string, OlBusy[]>;
  /** Extra calendars listed under My Calendars. */
  calendars?: { name: string; color?: string; shown?: boolean }[];
  contacts?: OlContact[];
  groups?: OlGroup[];
  /** Global Address List: colleagues for autocomplete and Address Book. */
  directory?: OlPerson[];
  tasks?: OlTask[];
  rules?: OlRule[];
  quickSteps?: OlQuickStep[];
  signatures?: { name: string; text: string }[];
  defaultNew?: string;
  defaultReply?: string;
  autoReplies?: { on: boolean; start?: string; end?: string; inside?: string; outsideOn?: boolean; outsideScope?: string; outside?: string } | null;
  /** Files the Attach File dialog offers. */
  files?: OlFile[];
  categoryNames?: Record<string, string>;
  /** People the calendar is shared with. */
  shares?: { email: string; permission: string }[];
  blocked?: string[];
  safe?: string[];
  manager?: OlPerson;
  team?: string[];

  /* view state */
  module?: OlModule;
  folder?: string;
  focused?: boolean;
  focusTab?: "Focused" | "Other";
  arrange?: string;
  sortAsc?: boolean;
  filter?: string;
  search?: string;
  searchScope?: string;
  conversations?: boolean;
  readingPane?: "Right" | "Bottom" | "Off";
  folderPane?: "Normal" | "Minimized" | "Off";
  todoBar?: "Calendar" | "People" | "Tasks" | "Off";
  calView?: "Day" | "Work Week" | "Week" | "Month" | "Schedule View";
  calDate?: string;
  peopleView?: string;
  tasksView?: string;
  tasksFolder?: "To-Do List" | "Tasks";
  favorites?: string[];

  compose?: OlCompose | null;
  form?: OlForm | null;
  /** Message opened in its own window. */
  window?: string | null;
  /** Canvas-drawn dialog: "signatures", "autoReplies", "addressBook", "selectMembers", "deletePrompt". */
  dialog?: string | null;
  dialogArg?: string;
  /** Folder being renamed in place / new folder being typed under this parent. */
  renaming?: string | null;
  newFolderIn?: string | null;
  searchFocus?: number;

  flags?: Record<string, string | number | boolean>;
  ribbonCollapsed?: boolean;
  pane?: string | null;
  saved?: { name?: string; location?: string; format?: string; autosave?: boolean };
};

/** Type-checks an Outlook sim's starting document: `initial: outlookDoc({ ... })`. */
export const outlookDoc = (d: OutlookDoc) => d as unknown as Record<string, unknown>;
