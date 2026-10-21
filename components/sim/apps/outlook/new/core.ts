import type { DialogDef } from "@/types/sim";
import type { AppCore, SimUi } from "../../../types";
import type { OutlookDoc } from "../types";
import { outlookDialogs } from "../dialogs";
import {
  FLAG_TO, PERMISSIONS, QS_ACTIONS, moduleOf, outlookDialogDef, outlookDialogDefaults, selEvent, selMessage, selectionExists, sortedContacts, visibleMessages,
} from "../model";
import { TIME_OPTIONS } from "../dates";
import { newOutlookRibbon } from "./ribbon";
import { RULE_ACTIONS, RULE_CONDITIONS, SWEEP_OPTIONS, TIME_ZONES, applyNew, newContextual, newRibbonState, normalizeNew } from "./model";

/*
 * App "outlook-new": new Outlook for Windows. Same document and selection
 * keys as the classic "outlook" engine (../types.ts); see ./model.ts for the
 * commands, dialogs and type targets only new Outlook has. The canvas draws
 * the whole window (title bar with Search and Settings, the simplified
 * Ribbon, the navigation bar on the left), so chrome is "bare".
 */

const QS_NEW = ["Move to folder", "Copy to folder", "Delete message", "Mark as read", "Mark as unread", "Categorize", "Flag message", "Clear flag", "Reply", "Reply all", "Forward"];

const dialogs: Record<string, DialogDef> = {
  newFolder: outlookDialogs.newFolder,
  moveTo: { id: "moveTo", title: "Move to a different folder", fields: [{ type: "text", key: "folder", label: "Folder" }] },
  copyTo: outlookDialogs.copyTo,
  attachFile: {
    id: "attachFile",
    title: "Attach file",
    fields: [
      { type: "text", key: "file", label: "File" },
      { type: "radio", key: "attachAs", label: "How do you want to share this file?", options: ["Share link", "Attach as copy"] },
    ],
  },
  scheduleSend: outlookDialogs.scheduleSend,
  proposeTime: outlookDialogs.proposeTime,
  proposeTimeDecline: outlookDialogs.proposeTimeDecline,
  shareCalendar: {
    id: "shareCalendar",
    title: "Sharing and permissions",
    fields: [
      { type: "text", key: "person", label: "Enter an email address or contact name" },
      { type: "select", key: "permission", label: "Permission", options: PERMISSIONS, default: "Can view all details" },
    ],
  },
  quickStep: {
    id: "quickStep",
    title: "New quick step",
    fields: [
      { type: "text", key: "name", label: "Name your quick step" },
      { type: "select", key: "action1", label: "Choose an action", options: [...QS_NEW, ...QS_ACTIONS], default: "Move to folder" },
      { type: "text", key: "target1", label: "Folder, category, or address" },
      { type: "select", key: "action2", label: "Choose an action", options: ["(none)", ...QS_NEW, ...QS_ACTIONS] },
      { type: "text", key: "target2", label: "Folder, category, or address" },
      { type: "select", key: "shortcut", label: "Choose a shortcut", options: ["Choose a shortcut", "Ctrl+Shift+5", "Ctrl+Shift+6", "Ctrl+Shift+7", "Ctrl+Shift+8", "Ctrl+Shift+9"] },
      { type: "text", key: "tooltip", label: "Customize your quick step (description)" },
    ],
  },
  recurrence: outlookDialogs.recurrence,
  customFlag: { ...outlookDialogs.customFlag, fields: outlookDialogs.customFlag.fields?.map((f) => ("key" in f && f.key === "flagTo" ? { ...f, options: FLAG_TO } : f)) },
  sweep: {
    id: "sweep",
    title: "Sweep messages",
    fields: [
      { type: "radio", key: "option", label: "Choose what to do with messages from this sender", options: SWEEP_OPTIONS },
      { type: "text", key: "folder", label: "Move to" },
    ],
  },
  newCategory: {
    id: "newCategory",
    title: "New category",
    fields: [
      { type: "text", key: "name", label: "Name" },
      { type: "select", key: "color", label: "Color", options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"] },
    ],
  },
  addShared: { id: "addShared", title: "Add shared folder or mailbox", fields: [{ type: "text", key: "email", label: "Enter the name or email address" }] },
  newRule: {
    id: "newRule",
    title: "Add new rule",
    fields: [
      { type: "text", key: "name", label: "Name your rule" },
      { type: "select", key: "condition", label: "Add a condition", options: RULE_CONDITIONS },
      { type: "text", key: "conditionValue", label: "Condition value" },
      { type: "select", key: "action", label: "Add an action", options: RULE_ACTIONS },
      { type: "text", key: "actionValue", label: "Action value" },
      { type: "checkbox", key: "stop", label: "Stop processing more rules" },
    ],
  },
  createRuleQuick: { id: "createRuleQuick", title: "Create a rule", fields: [{ type: "text", key: "folder", label: "Move to this folder" }] },
  "settings.undoSend": { id: "settings.undoSend", title: "Compose and reply", fields: [{ type: "number", key: "seconds", label: "Undo send", min: 0, max: 10, step: 5 }] },
  "settings.conversations": {
    id: "settings.conversations",
    title: "Reading pane",
    fields: [{ type: "radio", key: "grouping", label: "Message organization", options: ["Group messages by conversation", "Group messages by branches within conversations", "Do not group messages"] }],
  },
  "settings.readingPane": {
    id: "settings.readingPane",
    title: "Reading pane",
    fields: [{ type: "radio", key: "position", label: "Reading pane", options: ["Show on the right", "Show on the bottom", "Hide reading pane"] }],
  },
  "settings.timeZone": {
    id: "settings.timeZone",
    title: "Time zones",
    fields: [
      { type: "select", key: "zone", label: "Display my calendar in time zone", options: TIME_ZONES },
      { type: "text", key: "label", label: "Label" },
    ],
  },
  "settings.addTimeZone": {
    id: "settings.addTimeZone",
    title: "Other time zones",
    fields: [
      { type: "select", key: "zone", label: "Other time zones", options: TIME_ZONES },
      { type: "text", key: "label", label: "Label" },
    ],
  },
  insertPicture: { id: "insertPicture", title: "Insert pictures", fields: [{ type: "text", key: "file", label: "Picture" }] },
  altText: {
    id: "altText",
    title: "Alt text",
    fields: [
      { type: "text", key: "name", label: "Picture" },
      { type: "text", key: "text", label: "How would you describe this picture to someone who is blind?" },
    ],
  },
  "event.save": outlookDialogs["event.save"],
  "contact.save": outlookDialogs["contact.save"],
  "group.save": outlookDialogs["group.save"],
};
void TIME_OPTIONS;

/** Navigation and editing an open item: never a miss. */
const FREE = [
  "nav.module", "mail.folder", "mail.focusTab", "mail.arrange", "mail.sortOrder", "mail.filter", "search.refine", "search.refineFrom", "search.refineSubject", "mail.search",
  "mail.searchFocus", "search.close", "search.scope", "view.readingPane", "view.folderPane", "view.myDay", "settings.open", "settings.close", "settings.page", "cal.view",
  "cal.today", "cal.prev", "cal.next", "cal.goto", "cal.toggleCalendar", "people.search", "todo.list", "item.open", "window.close", "mail.senderCard", "attachment.open",
  "mail.newEmail", "home.new", "cal.new", "people.new", "item.new", "cal.newAppointment", "cal.newMeeting", "cal.newTeamsMeeting", "people.newContact", "people.newGroup",
  "contact.edit", "dialog.close", "compose.requestSend", "event.saveClose", "contact.saveClose", "group.saveClose", "compose.discard", "compose.saveDraft",
  "compose.popOut", "compose.bcc", "compose.from", "compose.removeAttachment", "event.close", "event.discard", "form.close", "event.view", "event.viewScheduling",
  "event.viewMain", "event.teams", "event.private", "event.reminder", "event.showAs", "pane.close", "review.accessibility", "review.spelling", "format.dictate",
  "insert.link", "insert.table", "insert.emoji", "format.bold", "format.italic", "format.underline", "format.fontName", "format.fontSize", "format.fontColor",
  "format.highlight", "format.bullets", "format.numbering", "format.alignLeft", "format.alignCenter", "format.alignRight", "format.clear", "copilot.summarize",
  "copilot.open", "help.help", "help.support", "help.feedback", "help.whatsNew", "ribbon.layout", "toggle.newOutlook", "app.launch", "mail.markUnread", "mail.markRead",
  "mail.autoRead", "qat.undo", "toast.close",
];

/** Commands the canvas, its menus and Settings emit (any value). */
const CANVAS = [
  "nav.module", "mail.folder", "mail.focusTab", "mail.search", "mail.sortOrder", "mail.autoRead", "mail.arrange", "mail.filter", "item.open", "window.close",
  "compose.send", "compose.requestSend", "compose.discard", "compose.saveDraft", "compose.popOut", "compose.removeAttachment", "compose.bcc", "compose.from",
  "compose.fromAddress", "compose.insertSignature", "compose.addressBook", "invite.respond", "invite.removeFromCalendar", "event.move", "cal.goto", "cal.prev", "cal.next",
  "cal.toggleCalendar", "cal.newAppointment", "cal.today", "people.search", "dialog.close", "home.quickStep", "mail.move", "mail.copy", "mail.moveToOther",
  "mail.moveToFocused", "mail.alwaysOther", "mail.alwaysFocused", "mail.pin", "mail.markRead", "mail.markUnread", "mail.toggleRead", "mail.snooze", "mail.undoSend",
  "item.categorize", "item.followUp", "item.delete", "task.complete", "folder.newInline", "folder.cancelEdit", "folder.favorite", "folder.rename", "folder.delete",
  "folder.markAllRead", "mail.emptyDeleted", "event.close", "event.discard", "event.view", "evtsel.respond", "evtsel.showAs", "evtsel.reminder", "event.cancelMeeting",
  "mail.senderCard", "attachment.open", "form.close", "contact.edit", "contact.emailTo", "home.junk", "home.report", "home.block", "mail.reply", "mail.replyAll",
  "mail.forward", "event.forward", "mail.newEmail", "mail.archive", "settings.open", "settings.close", "settings.page", "settings.focusedInbox", "rules.run",
  "rules.toggle", "rules.delete", "junk.blockAddress", "junk.safeAddress", "junk.remove", "share.accept", "todo.list", "todo.important", "todo.myDay", "todo.due",
  "copilot.summarize", "copilot.open", "pane.close", "view.myDay", "toggle.newOutlook", "app.launch", "toast.close", "mail.ignore", "event.saveClose", "contact.saveClose",
  "group.saveClose", "event.recurrence", "review.accessibility", "people.addToList", "mail.recall", "people.newContact", "people.newGroup", "cal.newTeamsMeeting", "qat.undo",
];

function initialUi(doc: OutlookDoc): SimUi {
  const mod = moduleOf(doc);
  if (mod === "mail") {
    const m = visibleMessages(doc)[0];
    return { selection: m ? `msg:${m.id}` : "" };
  }
  if (mod === "people") {
    const c = sortedContacts(doc)[0];
    return { selection: c ? `contact:${c.id}` : "" };
  }
  return { selection: "" };
}

export const newOutlookCore: AppCore<OutlookDoc> = {
  name: "Outlook",
  accent: "#0f6cbd",
  chrome: "bare",
  autosave: false,
  ribbon: newOutlookRibbon,
  dialogs,
  backstage: { templates: [], recent: [], formats: [], ext: ".msg" },
  shortcuts: {
    "Ctrl+N": { command: "item.new" },
    "Ctrl+R": { command: "mail.reply" },
    "Ctrl+Shift+R": { command: "mail.replyAll" },
    "Ctrl+F": { command: "mail.forward" },
    "Ctrl+Enter": { command: "compose.requestSend" },
    Delete: { command: "item.delete" },
    "Ctrl+Q": { command: "mail.markRead" },
    "Ctrl+U": { command: "mail.markUnread" },
    Insert: { command: "item.followUp", value: "Today" },
    "Ctrl+1": { command: "nav.module", value: "Mail" },
    "Ctrl+2": { command: "nav.module", value: "Calendar" },
    "Ctrl+3": { command: "nav.module", value: "People" },
    "Ctrl+Z": { command: "qat.undo" },
  },
  canvasCommands: CANVAS,
  canvasDialogs: Object.keys(dialogs),
  freeCommands: FREE,
  initialUi,
  normalize: (c, doc) => normalizeNew(c, doc as OutlookDoc | undefined),
  apply: applyNew,
  ribbonState: newRibbonState,
  contextualTabs: newContextual,
  dialogDefaults: outlookDialogDefaults,
  dialogDef: (doc, ui, id) => outlookDialogDef(doc, ui, id, dialogs[id]),
  selectionExists: (doc, sel) => selectionExists(doc, sel) || sel === "todo.new" || sel.startsWith("settings"),
  describeSelection: (doc, ui) => selMessage(doc, ui)?.subject ?? selEvent(doc, ui)?.evt.title ?? "",
};
