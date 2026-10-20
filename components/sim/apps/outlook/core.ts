import type { AppCore, SimUi } from "../../types";
import type { OutlookDoc } from "./types";
import { outlookRibbon } from "./ribbon";
import { outlookDialogs } from "./dialogs";
import {
  applyOutlook, currentFolder, folderById, moduleOf, normalizeOutlook, outlookContextual, outlookDialogDef, outlookDialogDefaults,
  outlookRibbonState, selectionExists, sortedContacts, visibleMessages, selMessage, selEvent,
} from "./model";

const FORMAT = ["bold", "italic", "underline", "fontName", "fontSize", "fontColor", "type", "html", "plain", "rich", "paste", "cut", "copy", "painter", "grow", "shrink", "highlight", "bullets", "numbering", "alignLeft", "alignCenter", "alignRight", "styles", "find", "replace", "dictate"].map((k) => `format.${k}`);
const INSERT = ["table", "pictures", "shapes", "icons", "chart", "link", "textBox", "dateTime", "wordArt", "symbol"].map((k) => `insert.${k}`);
const REVIEW = ["spelling", "thesaurus", "wordCount", "accessibility", "translate", "readAloud"].map((k) => `review.${k}`);
const HELP = ["help", "support", "feedback", "training", "whatsNew"].map((k) => `help.${k}`);

/** Navigation, viewing, and editing an open form or draft: never a miss. */
const FREE = [
  "nav.module", "mail.folder", "mail.focusTab", "view.focusedInbox", "mail.arrange", "mail.sortOrder", "view.reverseSort", "mail.filter", "search.refine",
  "search.refineFrom", "search.refineSubject", "mail.search", "mail.searchFocus", "search.close", "search.scope", "view.readingPane", "view.folderPane", "view.todoBar",
  "view.conversations", "view.conversationSettings", "view.changeView", "view.reset", "view.settings", "view.addColumns", "view.peoplePane", "view.reminders",
  "view.newWindow", "view.closeAll", "view.zoom", "view.ribbonCollapse", "cal.view", "cal.today", "cal.next7", "cal.prev", "cal.next", "cal.goto",
  "cal.toggleCalendar", "cal.changeView", "cal.color", "cal.openShared", "cal.groups", "cal.publish", "people.view", "people.mailMerge", "people.search", "tasks.view",
  "tasks.folder", "tasks.arrange", "tasks.search", "item.open", "window.close", "invite.calendar", "mail.senderCard", "attachment.open",
  "mail.newEmail", "item.new", "cal.newAppointment", "cal.newMeeting", "cal.newTeamsMeeting", "mail.replyWithMeeting", "people.newContact", "people.newGroup",
  "tasks.newTask", "contact.emailTo", "contact.meetingWith", "contact.logActivity", "contact.edit", "group.addMembers", "compose.addressBook", "addressBook.open",
  "compose.signaturesDialog", "file.signatures", "file.autoReplies", "dialog.close", "compose.checkNames", "compose.requestSend", "outlook.save",
  "event.saveClose", "contact.saveClose", "task.saveClose", "group.saveClose", "compose.discard", "compose.saveDraft", "compose.popOut", "compose.bcc",
  "compose.from", "options.readReceipt", "options.deliveryReceipt", "options.themes", "options.pageColor", "options.encrypt", "options.saveSentTo",
  "options.directReplies", "compose.removeAttachment", "compose.flag", "mail.autoRead", "rules.viewed", "junk.options", "sendReceive.all", "sendReceive.folder",
  "sendReceive.sendAll", "sendReceive.progress", "sendReceive.cancel", "sendReceive.offline", "folder.rename", "folder.newInline", "folder.cancelEdit",
  "folder.favorite", "folder.newSearch", "folder.copy", "folder.sortAZ", "folder.autoArchive", "folder.permissions", "folder.properties", "event.close",
  "event.discard", "form.close", "event.view", "event.inviteAttendees", "event.cancelInvitation", "event.reminder", "event.showAs", "event.teams", "event.private",
  "form.private", "event.recurrence", "event.timeZones", "event.roomFinder", "event.responseOptions", "form.categorize", "form.followUp", "form.importanceHigh",
  "form.importanceLow", "form.view", "task.assign", "file.options", "file.browse", "file.accountSettings", "file.import", "file.openCalendar", "file.officeAccount",
  "file.feedback", "file.exit", "file.cleanupTools", "pane.close", ...FORMAT, ...INSERT, ...REVIEW, ...HELP,
];

/** Commands the canvas, its menus, and the File tab emit (any value). */
const CANVAS = [
  "nav.module", "mail.folder", "mail.focusTab", "mail.search", "mail.sortOrder", "mail.autoRead", "mail.arrange", "mail.filter", "item.open", "window.close",
  "compose.send", "compose.requestSend", "compose.discard", "compose.saveDraft", "compose.popOut", "compose.removeAttachment", "compose.bcc", "invite.respond",
  "invite.removeFromCalendar", "event.move", "cal.goto", "cal.prev", "cal.next", "cal.toggleCalendar", "cal.newAppointment", "cal.today", "tasks.folder",
  "people.search", "tasks.search", "dialog.close", "contact.logActivity", "home.quickStep", "mail.move", "mail.copy", "mail.moveToOther", "mail.moveToFocused",
  "mail.pin", "mail.markRead", "mail.markUnread", "item.categorize", "item.followUp", "item.delete", "task.complete", "task.priority", "folder.newInline",
  "folder.cancelEdit", "folder.favorite", "folder.rename", "folder.delete", "folder.markAllRead", "event.close", "event.discard", "event.view", "evtsel.respond",
  "evtsel.showAs", "evtsel.reminder", "event.cancelMeeting", "mail.emptyDeleted", "mail.senderCard", "attachment.open", "file.accountSettings", "file.import",
  "file.openCalendar", "file.officeAccount", "file.feedback", "file.exit", "file.signatures", "file.autoReplies", "file.cleanupTools", "view.zoom", "qat.undo",
  "qat.redo", "view.ribbonCollapse", "form.close", "compose.addressBook", "contact.edit", "people.view", "tasks.view", "mail.toggleRead", "mail.ignore",
  "home.junk", "home.report", "mail.reply", "mail.replyAll", "mail.forward", "mail.forwardAttachment", "event.forward", "contact.forward", "mail.newEmail",
  "contact.emailTo", "rules.runNow", "pane.close",
];

function windowTitle(doc: OutlookDoc): string {
  const c = doc.compose;
  if (c && !c.inline) return `${c.subject || "Untitled"} - Message (${c.format?.type ?? "HTML"})`;
  const f = doc.form;
  if (f) {
    if (f.kind === "appointment") return `${f.data.title || "Untitled"} - Appointment`;
    if (f.kind === "meeting") return `${f.data.title || "Untitled"} - Meeting`;
    if (f.kind === "contact") return `${f.data.name || "Untitled"} - Contact`;
    if (f.kind === "task") return `${f.data.subject || "Untitled"} - Task`;
    return `${f.data.name || "Untitled"} - Contact Group`;
  }
  if (doc.window) {
    const m = doc.messages.find((x) => x.id === doc.window);
    if (m) return `${m.subject} - Message (HTML)`;
  }
  const mod = moduleOf(doc);
  const where =
    mod === "calendar" ? "Calendar" : mod === "people" ? "Contacts" : mod === "tasks" ? doc.tasksFolder ?? "To-Do List" : doc.search ? "Search Results" : folderById(doc, currentFolder(doc))?.name ?? "Inbox";
  return `${where} - ${doc.account.email} - Outlook`;
}

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

export const outlookCore: AppCore<OutlookDoc> = {
  name: "Outlook",
  accent: "#0f6cbd",
  chrome: "office",
  autosave: false,
  windowTitle,
  ribbon: outlookRibbon,
  dialogs: outlookDialogs,
  backstage: { templates: [], recent: [], formats: ["Outlook Message Format - Unicode (*.msg)", "Text Only (*.txt)", "HTML (*.htm)"], ext: ".msg" },
  shortcuts: {
    "Ctrl+1": { command: "nav.module", value: "Mail" },
    "Ctrl+2": { command: "nav.module", value: "Calendar" },
    "Ctrl+3": { command: "nav.module", value: "People" },
    "Ctrl+4": { command: "nav.module", value: "Tasks" },
    "Ctrl+N": { command: "item.new" },
    "Ctrl+Shift+M": { command: "mail.newEmail" },
    "Ctrl+Shift+A": { command: "cal.newAppointment" },
    "Ctrl+Shift+Q": { command: "cal.newMeeting" },
    "Ctrl+Shift+C": { command: "people.newContact" },
    "Ctrl+Shift+L": { command: "people.newGroup" },
    "Ctrl+Shift+K": { command: "tasks.newTask" },
    "Ctrl+R": { command: "mail.reply" },
    "Ctrl+Shift+R": { command: "mail.replyAll" },
    "Ctrl+F": { command: "mail.forward" },
    "Ctrl+Alt+F": { command: "mail.forwardAttachment" },
    "Ctrl+Enter": { command: "compose.requestSend" },
    "Alt+S": { command: "compose.requestSend" },
    Delete: { command: "item.delete" },
    "Ctrl+D": { command: "item.delete" },
    Backspace: { command: "mail.archive" },
    "Ctrl+Q": { command: "mail.markRead" },
    "Ctrl+U": { command: "mail.markUnread" },
    "Ctrl+Shift+V": { dialog: "moveTo" },
    "Ctrl+Shift+E": { dialog: "newFolder" },
    "Ctrl+Shift+G": { dialog: "customFlag" },
    Insert: { command: "item.followUp", value: "Today" },
    "Ctrl+E": { command: "mail.searchFocus" },
    F3: { command: "mail.searchFocus" },
    F9: { command: "sendReceive.all" },
    "Shift+F9": { command: "sendReceive.folder" },
    "Ctrl+S": { command: "outlook.save" },
    "Ctrl+P": { backstage: "print" },
    F12: { backstage: "saveAs" },
    "Ctrl+Shift+B": { command: "addressBook.open" },
    "Ctrl+Shift+I": { command: "mail.folder", value: "Inbox" },
    "Ctrl+Shift+O": { command: "mail.folder", value: "Outbox" },
    "Ctrl+Alt+1": { command: "cal.view", value: "Day" },
    "Ctrl+Alt+2": { command: "cal.view", value: "Work Week" },
    "Ctrl+Alt+3": { command: "cal.view", value: "Week" },
    "Ctrl+Alt+4": { command: "cal.view", value: "Month" },
    "Ctrl+Alt+5": { command: "cal.view", value: "Schedule View" },
    "Ctrl+Z": { command: "qat.undo" },
    "Ctrl+F1": { command: "view.ribbonCollapse" },
    F1: { command: "help.help" },
    F7: { command: "review.spelling" },
  },
  canvasCommands: CANVAS,
  freeCommands: FREE,
  initialUi,
  normalize: normalizeOutlook,
  apply: applyOutlook,
  ribbonState: outlookRibbonState,
  contextualTabs: outlookContextual,
  dialogDefaults: outlookDialogDefaults,
  dialogDef: (doc, ui, id) => outlookDialogDef(doc, ui, id, outlookDialogs[id]),
  selectionExists,
  describeSelection: (doc, ui) => selMessage(doc, ui)?.subject ?? selEvent(doc, ui)?.evt.title ?? "",
};
