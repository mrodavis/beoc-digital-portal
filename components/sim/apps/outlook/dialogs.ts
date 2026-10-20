import type { DialogDef, DialogField } from "@/types/sim";
import { TIME_OPTIONS } from "./dates";
import { CATEGORY_SLOTS, FLAG_TO, PERMISSIONS, QS_ACTIONS, QUICK_FLAGS, REMINDERS, SHOW_AS, TASK_STATUS, PRIORITIES } from "./model";

/**
 * Dialogs drawn by the shared SimDialog. Fields whose options come from the
 * mailbox (folders, files) are plain text here and become lists in
 * `outlookDialogDef`, so the validator does not reject sim-specific names.
 */

const ruleFields = (fromLabel: string) => [
  { type: "note" as const, text: "When I get email with all of the selected conditions" },
  { type: "checkbox" as const, key: "fromOn", label: fromLabel },
  { type: "text" as const, key: "from", label: "Sender address:" },
  { type: "checkbox" as const, key: "subjectOn", label: "Subject contains" },
  { type: "text" as const, key: "subject", label: "Subject text:" },
  { type: "checkbox" as const, key: "sentToOn", label: "Sent to: me only" },
  { type: "note" as const, text: "Do the following" },
  { type: "checkbox" as const, key: "alert", label: "Display in the New Item Alert window" },
  { type: "checkbox" as const, key: "sound", label: "Play a selected sound" },
  { type: "checkbox" as const, key: "moveOn", label: "Move the item to folder:" },
  { type: "text" as const, key: "folder", label: "Folder:" },
  { type: "checkbox" as const, key: "categoryOn", label: "Assign it to the category:" },
  { type: "select" as const, key: "category", label: "Category:", options: CATEGORY_SLOTS },
  { type: "checkbox" as const, key: "flagOn", label: "Flag message for follow up:" },
  { type: "select" as const, key: "flag", label: "Flag:", options: QUICK_FLAGS },
  { type: "checkbox" as const, key: "runNow", label: "Run this rule now on messages already in the current folder" },
];

/**
 * Create Rule (Home › Rules › Create Rule...) has only what Outlook's dialog
 * has: From the selected sender (no address box), Subject contains, Sent to,
 * and the alert, sound and move actions. Category and flag actions live in
 * the Rules Wizard (Rules and Alerts). Fewer rows also keep "Run this rule
 * now" in view without scrolling.
 */
const CREATE_RULE_SKIP = new Set(["from", "categoryOn", "category", "flagOn", "flag"]);
const createRuleFields = ruleFields("From sender").filter((f) => !CREATE_RULE_SKIP.has((f as { key?: string }).key ?? ""));

const qsActions = ["(none)", ...QS_ACTIONS];

/** A note the data-driven dialog can replace (outlookDialogDef swaps fields by key). */
const note = (text: string, key: string) => ({ type: "note", text, key }) as DialogField;

export const outlookDialogs: Record<string, DialogDef> = {
  newFolder: {
    id: "newFolder",
    title: "Create New Folder",
    width: 360,
    fields: [
      { type: "text", key: "name", label: "Name:" },
      { type: "select", key: "contains", label: "Folder contains:", options: ["Mail and Post Items", "Calendar Items", "Contact Items", "Task Items", "Note Items"] },
      { type: "text", key: "parent", label: "Select where to place the folder:" },
    ],
  },
  moveTo: { id: "moveTo", title: "Move Items", width: 360, fields: [{ type: "text", key: "folder", label: "Move the selected items to the folder:" }] },
  copyTo: { id: "copyTo", title: "Copy Items", width: 360, fields: [{ type: "text", key: "folder", label: "Copy the selected items to the folder:" }] },
  alwaysMove: { id: "alwaysMove", title: "Rules and Alerts", width: 360, fields: [{ type: "text", key: "folder", label: "Always move messages from this sender to:" }] },
  createRule: { id: "createRule", title: "Create Rule", width: 470, fields: createRuleFields },
  rulesAlerts: {
    id: "rulesAlerts",
    title: "Rules and Alerts",
    width: 480,
    okLabel: "OK",
    fields: [note("", "existing"), ...ruleFields("From (sender address below)")],
  },
  customFlag: {
    id: "customFlag",
    title: "Custom",
    width: 400,
    fields: [
      { type: "note", text: "Flagging an item creates a to-do item that reminds you to follow up. After you follow up, you can mark the to-do item complete." },
      { type: "select", key: "flagTo", label: "Flag to:", options: FLAG_TO, default: "Follow up" },
      { type: "text", key: "startDate", label: "Start date:" },
      { type: "text", key: "dueDate", label: "Due date:" },
      { type: "checkbox", key: "reminder", label: "Reminder" },
      { type: "text", key: "reminderDate", label: "Reminder date:" },
      { type: "select", key: "reminderTime", label: "Reminder time:", options: TIME_OPTIONS, default: "4:00 PM" },
    ],
  },
  colorCategories: {
    id: "colorCategories",
    title: "Color Categories",
    width: 420,
    fields: [
      note("To assign Color Categories to the currently selected items, use the checkbox below. To rename a category, pick it and type a new name.", "current"),
      { type: "select", key: "category", label: "Category:", options: CATEGORY_SLOTS },
      { type: "text", key: "name", label: "Rename to:" },
      { type: "checkbox", key: "assign", label: "Assign this category to the selected item", default: true },
    ],
  },
  quickStep: {
    id: "quickStep",
    title: "Edit Quick Step",
    width: 470,
    okLabel: "Finish",
    fields: [
      { type: "text", key: "name", label: "Name:" },
      { type: "select", key: "action1", label: "Action:", options: QS_ACTIONS, default: "Move to folder" },
      { type: "text", key: "target1", label: "Folder, category, flag, or address:" },
      { type: "select", key: "action2", label: "Action:", options: qsActions },
      { type: "text", key: "target2", label: "Folder, category, flag, or address:" },
      { type: "select", key: "action3", label: "Action:", options: qsActions },
      { type: "text", key: "target3", label: "Folder, category, flag, or address:" },
      { type: "select", key: "action4", label: "Action:", options: qsActions },
      { type: "text", key: "target4", label: "Folder, category, flag, or address:" },
      { type: "select", key: "shortcut", label: "Shortcut key:", options: ["Choose a shortcut", "CTRL+SHIFT+1", "CTRL+SHIFT+2", "CTRL+SHIFT+3", "CTRL+SHIFT+4", "CTRL+SHIFT+5"] },
      { type: "text", key: "tooltip", label: "Tooltip text:" },
    ],
  },
  proposeTime: {
    id: "proposeTime",
    title: "Propose New Time",
    width: 400,
    okLabel: "Propose Time",
    fields: [
      note("", "info"),
      { type: "text", key: "date", label: "Meeting date:" },
      { type: "select", key: "start", label: "Meeting start time:", options: TIME_OPTIONS },
      { type: "select", key: "end", label: "Meeting end time:", options: TIME_OPTIONS },
    ],
  },
  proposeTimeDecline: {
    id: "proposeTimeDecline",
    title: "Propose New Time",
    width: 400,
    okLabel: "Propose Time",
    fields: [
      note("", "info"),
      { type: "text", key: "date", label: "Meeting date:" },
      { type: "select", key: "start", label: "Meeting start time:", options: TIME_OPTIONS },
      { type: "select", key: "end", label: "Meeting end time:", options: TIME_OPTIONS },
    ],
  },
  scheduleSend: {
    id: "scheduleSend",
    title: "Schedule send",
    width: 360,
    okLabel: "Send",
    fields: [
      { type: "radio", key: "when", label: "Send this message:", options: ["Tomorrow morning 8:00 AM", "Monday morning 8:00 AM", "Custom time"], default: "Tomorrow morning 8:00 AM" },
      { type: "text", key: "date", label: "Date:" },
      { type: "select", key: "time", label: "Time:", options: TIME_OPTIONS, default: "8:00 AM" },
    ],
  },
  delayDelivery: {
    id: "delayDelivery",
    title: "Properties",
    width: 400,
    okLabel: "Close",
    fields: [
      { type: "note", text: "Delivery options" },
      { type: "checkbox", key: "delayOn", label: "Do not deliver before:", default: true },
      { type: "text", key: "date", label: "Date:" },
      { type: "select", key: "time", label: "Time:", options: TIME_OPTIONS, default: "8:00 AM" },
    ],
  },
  attachFile: {
    id: "attachFile",
    title: "Insert File",
    width: 440,
    okLabel: "Insert",
    fields: [
      { type: "text", key: "file", label: "File name:" },
      { type: "radio", key: "attachAs", label: "How do you want to attach this file?", options: ["Attach as copy", "Share link"], default: "Attach as copy" },
    ],
  },
  shareCalendar: {
    id: "shareCalendar",
    title: "Calendar Properties",
    width: 420,
    fields: [
      { type: "note", text: "Permissions: people you share your calendar with, and what they can see." },
      { type: "text", key: "person", label: "Add (email address):", placeholder: "name@example.com" },
      { type: "select", key: "permission", label: "Permission:", options: PERMISSIONS, default: "Can view all details" },
    ],
  },
  emailCalendar: {
    id: "emailCalendar",
    title: "Send a Calendar via E-mail",
    width: 420,
    fields: [
      { type: "select", key: "calendar", label: "Calendar:", options: ["Calendar"] },
      { type: "select", key: "dateRange", label: "Date Range:", options: ["Today", "Tomorrow", "Next 7 days", "Next 30 days", "Whole calendar"], default: "Next 7 days" },
      { type: "select", key: "detail", label: "Detail:", options: ["Availability only", "Limited details", "Full details"], default: "Limited details" },
    ],
  },
  recurrence: {
    id: "recurrence",
    title: "Appointment Recurrence",
    width: 440,
    tabs: [
      {
        label: "Recurrence pattern",
        fields: [
          { type: "radio", key: "pattern", label: "Recurrence pattern", options: ["Daily", "Weekly", "Monthly", "Yearly"], default: "Weekly" },
          { type: "number", key: "every", label: "Recur every (days / weeks / months):", default: 1, min: 1, max: 99 },
          { type: "checkbox", key: "weekdays", label: "Daily: every weekday" },
          { type: "checkbox", key: "sun", label: "Sunday" },
          { type: "checkbox", key: "mon", label: "Monday" },
          { type: "checkbox", key: "tue", label: "Tuesday" },
          { type: "checkbox", key: "wed", label: "Wednesday" },
          { type: "checkbox", key: "thu", label: "Thursday" },
          { type: "checkbox", key: "fri", label: "Friday" },
          { type: "checkbox", key: "sat", label: "Saturday" },
          { type: "number", key: "monthDay", label: "Monthly: day", default: 1, min: 1, max: 31 },
        ],
      },
      {
        label: "Range of recurrence",
        fields: [
          { type: "text", key: "rangeStart", label: "Start:" },
          { type: "radio", key: "range", label: "End", options: ["No end date", "End after", "End by"], default: "No end date" },
          { type: "number", key: "count", label: "End after (occurrences):", default: 10, min: 1 },
          { type: "text", key: "until", label: "End by:" },
          { type: "checkbox", key: "remove", label: "Remove Recurrence" },
        ],
      },
    ],
  },
  junkOptions: {
    id: "junkOptions",
    title: "Junk Email Options",
    width: 420,
    fields: [
      { type: "radio", key: "level", label: "Choose the level of junk email protection you want:", options: ["No Automatic Filtering", "Low", "High", "Safe Lists Only"], default: "Low" },
    ],
  },

  /* Form saves. Never opened as dialogs: the canvas forms commit them. Listed so the validator checks their keys. */
  "event.save": {
    id: "event.save",
    title: "Appointment",
    fields: [
      { type: "text", key: "title", label: "Title" },
      { type: "text", key: "location", label: "Location" },
      { type: "text", key: "startDate", label: "Start date" },
      { type: "text", key: "startTime", label: "Start time" },
      { type: "text", key: "endDate", label: "End date" },
      { type: "text", key: "endTime", label: "End time" },
      { type: "checkbox", key: "allDay", label: "All day event" },
      { type: "text", key: "reminder", label: `Reminder (${REMINDERS.slice(0, 3).join(", ")}…)` },
      { type: "text", key: "showAs", label: `Show As (${SHOW_AS.join(", ")})` },
      { type: "text", key: "recurrence", label: "Recurrence" },
      { type: "checkbox", key: "teams", label: "Teams meeting" },
      { type: "checkbox", key: "private", label: "Private" },
      { type: "checkbox", key: "meeting", label: "Meeting" },
      { type: "text", key: "required", label: "Required" },
      { type: "text", key: "optional", label: "Optional" },
      { type: "text", key: "body", label: "Notes" },
    ],
  },
  "contact.save": {
    id: "contact.save",
    title: "Contact",
    fields: ["name", "company", "jobTitle", "email", "phone", "mobile", "address", "notes"].map((k) => ({ type: "text" as const, key: k, label: k })),
  },
  "task.save": {
    id: "task.save",
    title: "Task",
    fields: [
      { type: "text", key: "subject", label: "Subject" },
      { type: "text", key: "startDate", label: "Start date" },
      { type: "text", key: "dueDate", label: "Due date" },
      { type: "text", key: "status", label: `Status (${TASK_STATUS.join(", ")})` },
      { type: "text", key: "priority", label: `Priority (${PRIORITIES.join(", ")})` },
      { type: "number", key: "percent", label: "% Complete" },
      { type: "checkbox", key: "reminder", label: "Reminder" },
      { type: "text", key: "reminderDate", label: "Reminder date" },
      { type: "text", key: "reminderTime", label: "Reminder time" },
    ],
  },
  "group.save": { id: "group.save", title: "Contact Group", fields: [{ type: "text", key: "name", label: "Name" }, { type: "text", key: "members", label: "Members" }] },
};
