import type { RibbonControl, RibbonGroup, RibbonOption, RibbonTab } from "@/types/sim";
import { CATEGORY_COLORS, CATEGORY_SLOTS, REMINDERS, SHOW_AS } from "./model";

/**
 * Outlook's Home tab differs in Mail, Calendar, People and Tasks, so the
 * module tabs are contextual (keyed by module) and `outlookContextual`
 * picks which set shows. Send / Receive and Help always show.
 */

const FONTS = ["Aptos", "Calibri", "Arial", "Cambria", "Georgia", "Segoe UI", "Tahoma", "Times New Roman", "Verdana"];
const SIZES = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "24"];
const COLORS: RibbonOption[] = [
  { value: "Automatic", label: "Automatic", color: "#000000" },
  { value: "#C00000", label: "Dark Red", color: "#C00000" },
  { value: "#FF0000", label: "Red", color: "#FF0000" },
  { value: "#FFC000", label: "Orange", color: "#FFC000" },
  { value: "#00B050", label: "Green", color: "#00B050" },
  { value: "#0070C0", label: "Blue", color: "#0070C0" },
  { value: "#002060", label: "Dark Blue", color: "#002060" },
  { value: "#7030A0", label: "Purple", color: "#7030A0" },
];

const categorizeOptions = (cmd?: string): RibbonOption[] => [
  ...CATEGORY_SLOTS.map((c) => ({ value: c, color: CATEGORY_COLORS[c], ...(cmd ? { command: cmd } : {}) })),
  { value: "All Categories...", icon: "colors", dialog: "colorCategories" },
  { value: "Clear All Categories", icon: "clear", ...(cmd ? { command: cmd } : {}) },
];

const followUpOptions = (cmd?: string, dialogs = true): RibbonOption[] => [
  ...["Today", "Tomorrow", "This Week", "Next Week", "No Date"].map((v) => ({ value: v, icon: "history", ...(cmd ? { command: cmd } : {}) })),
  ...(dialogs ? [{ value: "Custom...", icon: "history", dialog: "customFlag" }] : []),
  { value: "Mark Complete", icon: "accept", ...(cmd ? { command: cmd } : {}) },
  { value: "Clear Flag", icon: "clear", ...(cmd ? { command: cmd } : {}) },
];

const newItems: RibbonControl = {
  type: "dropdown",
  id: "home.newItems",
  label: "New Items",
  icon: "new",
  size: "large",
  options: [
    { value: "E-mail Message", icon: "mailMerge", command: "mail.newEmail" },
    { value: "Appointment", icon: "date", command: "cal.newAppointment" },
    { value: "Meeting", icon: "recipients", command: "cal.newMeeting" },
    { value: "Contact", icon: "icons", command: "people.newContact" },
    { value: "Task", icon: "checkIssues", command: "tasks.newTask" },
    { value: "Contact Group", icon: "recipients", command: "people.newGroup" },
    { value: "Teams Meeting", icon: "video", command: "cal.newTeamsMeeting" },
  ],
};

const deleteBtn: RibbonControl = { type: "button", id: "item.delete", label: "Delete", icon: "deleteCells", size: "large", shortcut: "Delete" };
const findGroup: RibbonGroup = {
  label: "Find",
  controls: [
    { type: "button", id: "addressBook.open", label: "Address Book", icon: "recipients", showLabel: true, shortcut: "Ctrl+Shift+B" },
    {
      type: "dropdown",
      id: "mail.filter",
      label: "Filter Email",
      icon: "filter",
      showLabel: true,
      options: ["Unread", "Has Attachments", "Categorized", "This Week", "Flagged", "Important", "Sent To: Me", "All"].map((v) => ({ value: v, icon: "filter" })),
    },
  ],
};

const respondGroup: RibbonGroup = {
  label: "Respond",
  controls: [
    { type: "button", id: "mail.reply", label: "Reply", icon: "undo", size: "large", shortcut: "Ctrl+R" },
    { type: "button", id: "mail.replyAll", label: "Reply All", icon: "undo", size: "large", shortcut: "Ctrl+Shift+R" },
    { type: "button", id: "mail.forward", label: "Forward", icon: "redo", size: "large", shortcut: "Ctrl+F" },
    { type: "button", id: "mail.replyWithMeeting", label: "Meeting", icon: "date", showLabel: true },
    {
      type: "dropdown",
      id: "mail.more",
      label: "More",
      icon: "more",
      showLabel: true,
      options: [{ value: "Forward as Attachment", icon: "redo", command: "mail.forwardAttachment" }],
    },
  ],
};

const tagsGroup = (withRead: boolean): RibbonGroup => ({
  label: "Tags",
  controls: [
    ...(withRead ? [{ type: "button", id: "mail.toggleRead", label: "Unread/ Read", icon: "envelope", showLabel: true } as RibbonControl] : []),
    { type: "dropdown", id: "item.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() },
    { type: "dropdown", id: "item.followUp", label: "Follow Up", icon: "history", showLabel: true, options: followUpOptions() },
  ],
});

const moveGroup: RibbonGroup = {
  label: "Move",
  controls: [
    {
      type: "dropdown",
      id: "mail.move",
      label: "Move",
      icon: "folder",
      showLabel: true,
      options: [
        { value: "Inbox", icon: "folder" },
        { value: "Archive", icon: "folder" },
        { value: "Other Folder...", icon: "folder", dialog: "moveTo" },
        { value: "Copy to Folder...", icon: "copy", dialog: "copyTo" },
      ],
    },
    {
      type: "dropdown",
      id: "home.rules",
      label: "Rules",
      icon: "filter",
      showLabel: true,
      options: [
        { value: "Always Move Messages From Sender...", icon: "folder", dialog: "alwaysMove" },
        { value: "Create Rule...", icon: "filter", dialog: "createRule" },
        { value: "Manage Rules & Alerts...", icon: "filter", dialog: "rulesAlerts" },
      ],
    },
  ],
};

const quickStepsGroup: RibbonGroup = {
  label: "Quick Steps",
  launcher: "quickStep",
  controls: [
    {
      type: "gallery",
      id: "home.quickStep",
      label: "Quick Steps",
      width: 250,
      options: [
        { value: "To Manager", label: "→ To Manager" },
        { value: "Team Email", label: "✉ Team Email" },
        { value: "Done", label: "✓ Done" },
        { value: "Reply & Delete", label: "↩ Reply & Delete" },
        { value: "Move to: ?", label: "Move to: ?", dialog: "quickStep" },
        { value: "Create New", label: "+ Create New", dialog: "quickStep" },
      ],
    },
  ],
};

const homeMail: RibbonTab = {
  id: "home",
  label: "Home",
  contextual: "mail",
  groups: [
    { label: "New", controls: [{ type: "button", id: "mail.newEmail", label: "New Email", icon: "mailMerge", size: "large", shortcut: "Ctrl+N" }, newItems] },
    {
      label: "Delete",
      controls: [
        { type: "button", id: "mail.ignore", label: "Ignore", icon: "close", showLabel: true },
        { type: "dropdown", id: "mail.cleanUp", label: "Clean Up", icon: "clear", showLabel: true, options: ["Clean Up Conversation", "Clean Up Folder", "Clean Up Folder & Subfolders"].map((v) => ({ value: v, icon: "clear" })) },
        {
          type: "dropdown",
          id: "home.junk",
          label: "Junk",
          icon: "reject",
          showLabel: true,
          options: [
            { value: "Block Sender", icon: "reject" },
            { value: "Never Block Sender", icon: "accept" },
            { value: "Never Block Sender's Domain", icon: "accept" },
            { value: "Never Block this Group or Mailing List", icon: "accept" },
            { value: "Not Junk", icon: "accept" },
            { value: "Junk E-mail Options...", icon: "options", dialog: "junkOptions" },
          ],
        },
        deleteBtn,
        { type: "button", id: "mail.archive", label: "Archive", icon: "folder", size: "large", shortcut: "Backspace" },
      ],
    },
    {
      label: "Protection",
      controls: [
        {
          type: "dropdown",
          id: "home.report",
          label: "Report",
          icon: "protect",
          size: "large",
          options: [
            { value: "Report Phishing", icon: "protect" },
            { value: "Report Junk", icon: "reject" },
            { value: "Report Not Junk", icon: "accept" },
          ],
        },
      ],
    },
    respondGroup,
    quickStepsGroup,
    moveGroup,
    tagsGroup(true),
    findGroup,
  ],
};

const calViews: RibbonControl[] = [
  { type: "toggle", id: "cal.day", label: "Day", icon: "onePage", size: "large", shortcut: "Ctrl+Alt+1" },
  { type: "toggle", id: "cal.workweek", label: "Work Week", icon: "multiplePages", size: "large", shortcut: "Ctrl+Alt+2" },
  { type: "toggle", id: "cal.week", label: "Week", icon: "columns", size: "large", shortcut: "Ctrl+Alt+3" },
  { type: "toggle", id: "cal.month", label: "Month", icon: "table", size: "large", shortcut: "Ctrl+Alt+4" },
  { type: "toggle", id: "cal.schedule", label: "Schedule View", icon: "pageWidth", size: "large", shortcut: "Ctrl+Alt+5" },
];

const homeCal: RibbonTab = {
  id: "home",
  label: "Home",
  contextual: "calendar",
  groups: [
    {
      label: "New",
      controls: [
        { type: "button", id: "cal.newAppointment", label: "New Appointment", icon: "date", size: "large", shortcut: "Ctrl+N" },
        { type: "button", id: "cal.newMeeting", label: "New Meeting", icon: "recipients", size: "large", shortcut: "Ctrl+Shift+Q" },
        { type: "button", id: "cal.newTeamsMeeting", label: "New Teams Meeting", icon: "video", size: "large" },
        newItems,
      ],
    },
    {
      label: "Go To",
      controls: [
        { type: "button", id: "cal.today", label: "Today", icon: "date", size: "large" },
        { type: "button", id: "cal.next7", label: "Next 7 Days", icon: "multiplePages", size: "large" },
      ],
    },
    { label: "Arrange", controls: calViews },
    {
      label: "Manage Calendars",
      controls: [
        { type: "dropdown", id: "cal.openShared", label: "Open Calendar", icon: "open", size: "large", options: ["From Address Book...", "Open Shared Calendar...", "From Room List...", "From Internet..."].map((v) => ({ value: v, icon: "date" })) },
        { type: "dropdown", id: "cal.groups", label: "Calendar Groups", icon: "group", size: "large", options: ["Create New Calendar Group...", "Save as New Calendar Group..."].map((v) => ({ value: v })) },
      ],
    },
    {
      label: "Share",
      controls: [
        { type: "button", id: "cal.emailCalendar", label: "E-mail Calendar", icon: "envelope", showLabel: true, dialog: "emailCalendar" },
        { type: "button", id: "cal.share", label: "Share Calendar", icon: "share", showLabel: true, dialog: "shareCalendar" },
        { type: "button", id: "cal.publish", label: "Publish Online", icon: "cloud", showLabel: true },
        { type: "button", id: "cal.permissions", label: "Calendar Permissions", icon: "protect", showLabel: true, dialog: "shareCalendar" },
      ],
    },
    { label: "Find", controls: [{ type: "button", id: "addressBook.open", label: "Address Book", icon: "recipients", showLabel: true }] },
  ],
};

const homePeople: RibbonTab = {
  id: "home",
  label: "Home",
  contextual: "people",
  groups: [
    {
      label: "New",
      controls: [
        { type: "button", id: "people.newContact", label: "New Contact", icon: "icons", size: "large", shortcut: "Ctrl+N" },
        { type: "button", id: "people.newGroup", label: "New Contact Group", icon: "recipients", size: "large", shortcut: "Ctrl+Shift+L" },
        newItems,
      ],
    },
    { label: "Delete", controls: [deleteBtn] },
    {
      label: "Communicate",
      controls: [
        { type: "button", id: "contact.emailTo", label: "Email", icon: "envelope", size: "large" },
        { type: "button", id: "contact.meetingWith", label: "Meeting", icon: "date", size: "large" },
        { type: "button", id: "contact.logActivity", label: "Log Activity", icon: "notes", size: "large", tip: "Log a call, email, meeting, or note on this contact's activity history" },
        { type: "dropdown", id: "contact.more", label: "More", icon: "more", showLabel: true, options: [{ value: "Assign Task", icon: "checkIssues", command: "tasks.newTask" }, { value: "Journal Entry", icon: "notes", command: "contact.logActivity" }] },
      ],
    },
    {
      label: "Current View",
      controls: [{ type: "gallery", id: "people.view", label: "Current View", width: 230, options: ["People", "Business Card", "Card", "Phone", "List"].map((v) => ({ value: v })) }],
    },
    {
      label: "Actions",
      controls: [
        { type: "dropdown", id: "contact.forwardMenu", label: "Forward Contact", icon: "redo", showLabel: true, options: ["As a Business Card", "In Internet Format (vCard)", "As an Outlook Contact"].map((v) => ({ value: v, command: "contact.forward" })) },
        { type: "button", id: "people.mailMerge", label: "Mail Merge", icon: "mailMerge", showLabel: true },
      ],
    },
    tagsGroup(false),
    { label: "Find", controls: [{ type: "button", id: "addressBook.open", label: "Address Book", icon: "recipients", showLabel: true }] },
  ],
};

const homeTasks: RibbonTab = {
  id: "home",
  label: "Home",
  contextual: "tasks",
  groups: [
    {
      label: "New",
      controls: [
        { type: "button", id: "tasks.newTask", label: "New Task", icon: "checkIssues", size: "large", shortcut: "Ctrl+N" },
        { type: "button", id: "mail.newEmail", label: "New Email", icon: "mailMerge", size: "large" },
        newItems,
      ],
    },
    { label: "Delete", controls: [deleteBtn] },
    {
      label: "Respond",
      controls: [
        { type: "button", id: "mail.reply", label: "Reply", icon: "undo", size: "large" },
        { type: "button", id: "mail.replyAll", label: "Reply All", icon: "undo", size: "large" },
        { type: "button", id: "mail.forward", label: "Forward", icon: "redo", size: "large" },
      ],
    },
    {
      label: "Manage Task",
      controls: [
        { type: "button", id: "task.complete", label: "Mark Complete", icon: "accept", size: "large" },
        { type: "button", id: "task.removeFromList", label: "Remove from List", icon: "reject", size: "large" },
      ],
    },
    {
      label: "Follow Up",
      controls: [
        { type: "button", id: "tasks.flagToday", label: "Today", icon: "history", showLabel: true },
        { type: "button", id: "tasks.flagTomorrow", label: "Tomorrow", icon: "history", showLabel: true },
        { type: "button", id: "tasks.flagThisWeek", label: "This Week", icon: "history", showLabel: true },
        { type: "button", id: "tasks.flagNextWeek", label: "Next Week", icon: "history", showLabel: true },
        { type: "button", id: "tasks.flagNoDate", label: "No Date", icon: "history", showLabel: true },
        { type: "button", id: "tasks.flagCustom", label: "Custom", icon: "history", showLabel: true, dialog: "customFlag" },
      ],
    },
    {
      label: "Current View",
      controls: [
        {
          type: "gallery",
          id: "tasks.view",
          label: "Current View",
          width: 250,
          options: ["Detailed", "Simple List", "To-Do List", "Prioritized", "Active", "Completed", "Today", "Next 7 Days", "Overdue", "Assigned"].map((v) => ({ value: v })),
        },
      ],
    },
    {
      label: "Tags",
      controls: [
        { type: "toggle", id: "task.priorityHigh", label: "High Importance", icon: "growFont", showLabel: true },
        { type: "toggle", id: "task.priorityLow", label: "Low Importance", icon: "shrinkFont", showLabel: true },
        { type: "dropdown", id: "item.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() },
      ],
    },
  ],
};

/* ---------- compose ---------- */

const clipboardGroup: RibbonGroup = {
  label: "Clipboard",
  controls: [
    { type: "dropdown", id: "format.paste", label: "Paste", icon: "paste", size: "large", split: true, options: ["Keep Source Formatting", "Merge Formatting", "Keep Text Only"].map((v) => ({ value: v, icon: "paste" })) },
    { type: "button", id: "format.cut", label: "Cut", icon: "cut", showLabel: true },
    { type: "button", id: "format.copy", label: "Copy", icon: "copy", showLabel: true },
    { type: "button", id: "format.painter", label: "Format Painter", icon: "formatPainter", showLabel: true },
  ],
};

const basicText: RibbonGroup = {
  label: "Basic Text",
  launcher: undefined,
  controls: [],
  rows: [
    [
      { type: "dropdown", id: "format.fontName", label: "Font", combo: true, width: 104, options: FONTS.map((f) => ({ value: f, preview: { font: f } })) },
      { type: "dropdown", id: "format.fontSize", label: "Font Size", combo: true, width: 40, options: SIZES.map((s) => ({ value: s })) },
      { type: "button", id: "format.grow", label: "Increase Font Size", icon: "growFont" },
      { type: "button", id: "format.shrink", label: "Decrease Font Size", icon: "shrinkFont" },
    ],
    [
      { type: "toggle", id: "format.bold", label: "Bold", icon: "bold", shortcut: "Ctrl+B" },
      { type: "toggle", id: "format.italic", label: "Italic", icon: "italic", shortcut: "Ctrl+I" },
      { type: "toggle", id: "format.underline", label: "Underline", icon: "underline" },
      { type: "button", id: "format.highlight", label: "Text Highlight Color", icon: "highlight" },
      { type: "dropdown", id: "format.fontColor", label: "Font Color", icon: "fontColor", split: true, faceValue: "#C00000", gallery: "swatches", options: COLORS },
      { type: "button", id: "format.bullets", label: "Bullets", icon: "bullets" },
      { type: "button", id: "format.numbering", label: "Numbering", icon: "numbering" },
      { type: "button", id: "format.alignLeft", label: "Align Left", icon: "alignLeft" },
      { type: "button", id: "format.alignCenter", label: "Center", icon: "alignCenter" },
    ],
  ],
};

const signatureDropdown: RibbonControl = {
  type: "dropdown",
  id: "compose.signature",
  label: "Signature",
  icon: "pen",
  size: "large",
  options: [{ value: "Signatures...", icon: "pen", command: "compose.signaturesDialog" }],
};

const attachDropdown: RibbonControl = {
  type: "dropdown",
  id: "compose.attachFile",
  label: "Attach File",
  icon: "link",
  size: "large",
  options: [
    { value: "Browse Web Locations...", icon: "cloud", dialog: "attachFile" },
    { value: "Browse This PC...", icon: "pc", dialog: "attachFile" },
  ],
};

const messageGroups = (inline: boolean): RibbonGroup[] => [
  ...(inline ? [] : [clipboardGroup]),
  basicText,
  {
    label: "Names",
    controls: [
      { type: "button", id: "compose.addressBook", label: "Address Book", icon: "recipients", size: "large" },
      { type: "button", id: "compose.checkNames", label: "Check Names", icon: "checkIssues", size: "large" },
    ],
  },
  {
    label: "Include",
    controls: [
      attachDropdown,
      { type: "dropdown", id: "compose.attachItem", label: "Attach Item", icon: "envelope", size: "large", options: [{ value: "Calendar...", icon: "date", dialog: "emailCalendar" }] },
      signatureDropdown,
    ],
  },
  {
    label: "Tags",
    controls: [
      { type: "dropdown", id: "compose.flag", label: "Follow Up", icon: "history", showLabel: true, options: followUpOptions(undefined, false) },
      { type: "toggle", id: "message.importanceHigh", label: "High Importance", icon: "growFont", showLabel: true },
      { type: "toggle", id: "message.importanceLow", label: "Low Importance", icon: "shrinkFont", showLabel: true },
    ],
  },
  { label: "Voice", controls: [{ type: "button", id: "format.dictate", label: "Dictate", icon: "dictate", size: "large" }] },
];

const messageTab: RibbonTab = { id: "message", label: "Message", contextual: "compose", groups: messageGroups(false) };
const messageInlineTab: RibbonTab = { id: "message", label: "Message", contextual: "composeInline", groups: messageGroups(true) };

const insertCompose: RibbonTab = {
  id: "insert",
  label: "Insert",
  contextual: "compose",
  groups: [
    { label: "Include", controls: [attachDropdown, { type: "dropdown", id: "compose.attachItem", label: "Outlook Item", icon: "envelope", size: "large", options: [{ value: "Calendar...", icon: "date", dialog: "emailCalendar" }] }, signatureDropdown] },
    { label: "Tables", controls: [{ type: "button", id: "insert.table", label: "Table", icon: "table", size: "large" }] },
    {
      label: "Illustrations",
      controls: [
        { type: "button", id: "insert.pictures", label: "Pictures", icon: "picture", size: "large" },
        { type: "button", id: "insert.shapes", label: "Shapes", icon: "shapes", size: "large" },
        { type: "button", id: "insert.icons", label: "Icons", icon: "icons", size: "large" },
        { type: "button", id: "insert.chart", label: "Chart", icon: "chart", size: "large" },
      ],
    },
    { label: "Links", controls: [{ type: "button", id: "insert.link", label: "Link", icon: "link", size: "large", shortcut: "Ctrl+K" }] },
    {
      label: "Text",
      controls: [
        { type: "button", id: "insert.textBox", label: "Text Box", icon: "textbox", size: "large" },
        { type: "button", id: "insert.dateTime", label: "Date & Time", icon: "date", showLabel: true },
        { type: "button", id: "insert.wordArt", label: "WordArt", icon: "wordart", showLabel: true },
      ],
    },
    { label: "Symbols", controls: [{ type: "button", id: "insert.symbol", label: "Symbol", icon: "symbol", size: "large" }] },
  ],
};

const optionsCompose: RibbonTab = {
  id: "options",
  label: "Options",
  contextual: "compose",
  groups: [
    {
      label: "Themes",
      controls: [
        { type: "button", id: "options.themes", label: "Themes", icon: "themes", size: "large" },
        { type: "button", id: "options.pageColor", label: "Page Color", icon: "pageColor", showLabel: true },
      ],
    },
    {
      label: "Show Fields",
      controls: [
        { type: "toggle", id: "compose.bcc", label: "Bcc", icon: "recipients", size: "large" },
        { type: "toggle", id: "compose.from", label: "From", icon: "icons", size: "large" },
      ],
    },
    { label: "Encrypt", controls: [{ type: "button", id: "options.encrypt", label: "Encrypt", icon: "protect", size: "large" }] },
    {
      label: "Tracking",
      controls: [
        { type: "toggle", id: "options.deliveryReceipt", label: "Request a Delivery Receipt", icon: "checkIssues", showLabel: true },
        { type: "toggle", id: "options.readReceipt", label: "Request a Read Receipt", icon: "checkIssues", showLabel: true },
      ],
    },
    {
      label: "More Options",
      controls: [
        { type: "button", id: "options.saveSentTo", label: "Save Sent Item To", icon: "folder", showLabel: true },
        { type: "button", id: "options.delayDelivery", label: "Delay Delivery", icon: "history", showLabel: true, dialog: "delayDelivery" },
        { type: "button", id: "options.directReplies", label: "Direct Replies To", icon: "undo", showLabel: true },
      ],
    },
  ],
};

const fontGroup = (ctx: string): RibbonGroup => ({
  label: "Font",
  controls: [],
  rows: [
    [
      { type: "dropdown", id: "format.fontName", label: "Font", combo: true, width: 104, options: FONTS.map((f) => ({ value: f, preview: { font: f } })) },
      { type: "dropdown", id: "format.fontSize", label: "Font Size", combo: true, width: 40, options: SIZES.map((s) => ({ value: s })) },
    ],
    [
      { type: "toggle", id: "format.bold", label: "Bold", icon: "bold" },
      { type: "toggle", id: "format.italic", label: "Italic", icon: "italic" },
      { type: "toggle", id: "format.underline", label: "Underline", icon: "underline" },
      { type: "dropdown", id: "format.fontColor", label: "Font Color", icon: "fontColor", split: true, faceValue: "#C00000", gallery: "swatches", options: COLORS },
    ],
  ],
  ...(ctx ? {} : {}),
});

const formatTextTab = (ctx: string): RibbonTab => ({
  id: "formatText",
  label: "Format Text",
  contextual: ctx,
  groups: [
    ...(ctx === "compose"
      ? [
          {
            label: "Format",
            controls: [
              { type: "toggle", id: "format.html", label: "HTML", icon: "webLayout", showLabel: true },
              { type: "toggle", id: "format.plain", label: "Plain Text", icon: "readMode", showLabel: true },
              { type: "toggle", id: "format.rich", label: "Rich Text", icon: "fonts", showLabel: true },
            ],
          } as RibbonGroup,
        ]
      : []),
    clipboardGroup,
    fontGroup(ctx),
    {
      label: "Paragraph",
      controls: [
        { type: "button", id: "format.bullets", label: "Bullets", icon: "bullets" },
        { type: "button", id: "format.numbering", label: "Numbering", icon: "numbering" },
        { type: "button", id: "format.alignLeft", label: "Align Left", icon: "alignLeft" },
        { type: "button", id: "format.alignCenter", label: "Center", icon: "alignCenter" },
        { type: "button", id: "format.alignRight", label: "Align Right", icon: "alignRight" },
      ],
    },
    { label: "Styles", controls: [{ type: "button", id: "format.styles", label: "Styles", icon: "styles", size: "large" }] },
    { label: "Editing", controls: [{ type: "button", id: "format.find", label: "Find", icon: "find", showLabel: true }, { type: "button", id: "format.replace", label: "Replace", icon: "replace", showLabel: true }] },
    { label: "Zoom", controls: [{ type: "button", id: "view.zoom", label: "Zoom", icon: "zoom", size: "large" }] },
  ],
});

const reviewCompose: RibbonTab = {
  id: "review",
  label: "Review",
  contextual: "compose",
  groups: [
    {
      label: "Proofing",
      controls: [
        { type: "button", id: "review.spelling", label: "Spelling & Grammar", icon: "spelling", size: "large", shortcut: "F7" },
        { type: "button", id: "review.thesaurus", label: "Thesaurus", icon: "thesaurus", showLabel: true },
        { type: "button", id: "review.wordCount", label: "Word Count", icon: "wordCount", showLabel: true },
      ],
    },
    { label: "Accessibility", controls: [{ type: "button", id: "review.accessibility", label: "Check Accessibility", icon: "accessibility", size: "large" }] },
    { label: "Language", controls: [{ type: "button", id: "review.translate", label: "Translate", icon: "translate", size: "large" }] },
  ],
};

/* ---------- read window ---------- */

const readWindowTab: RibbonTab = {
  id: "message",
  label: "Message",
  contextual: "readWindow",
  groups: [
    {
      label: "Delete",
      controls: [
        { type: "button", id: "mail.ignore", label: "Ignore", icon: "close", showLabel: true },
        { type: "dropdown", id: "home.junk", label: "Junk", icon: "reject", showLabel: true, options: ["Block Sender", "Never Block Sender", "Not Junk"].map((v) => ({ value: v, icon: "reject" })) },
        deleteBtn,
        { type: "button", id: "mail.archive", label: "Archive", icon: "folder", size: "large" },
      ],
    },
    respondGroup,
    quickStepsGroup,
    moveGroup,
    {
      label: "Tags",
      controls: [
        { type: "button", id: "mail.markUnread", label: "Mark Unread", icon: "envelope", showLabel: true },
        { type: "dropdown", id: "item.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() },
        { type: "dropdown", id: "item.followUp", label: "Follow Up", icon: "history", showLabel: true, options: followUpOptions() },
      ],
    },
    { label: "Speech", controls: [{ type: "button", id: "review.readAloud", label: "Read Aloud", icon: "readAloud", size: "large" }] },
  ],
};

/* ---------- calendar forms ---------- */

const optionsGroup = (prefix: "event" | "evtsel"): RibbonGroup => ({
  label: "Options",
  controls: [
    { type: "dropdown", id: `${prefix}.showAs`, label: "Show As", combo: true, width: 104, stateKey: `${prefix}.showAs`, options: SHOW_AS.map((v) => ({ value: v })) },
    { type: "dropdown", id: `${prefix}.reminder`, label: "Reminder", combo: true, width: 104, stateKey: `${prefix}.reminder`, options: REMINDERS.map((v) => ({ value: v })) },
    ...(prefix === "event"
      ? [
          { type: "button", id: "event.recurrenceBtn", label: "Recurrence", icon: "rotate", size: "large", dialog: "recurrence" } as RibbonControl,
          { type: "button", id: "event.timeZones", label: "Time Zones", icon: "pageWidth", size: "large" } as RibbonControl,
          { type: "button", id: "event.roomFinder", label: "Room Finder", icon: "find", size: "large" } as RibbonControl,
        ]
      : []),
  ],
});

const formTags = (prefix: "event" | "form"): RibbonGroup => ({
  label: "Tags",
  controls: [
    { type: "toggle", id: `${prefix}.private`, label: "Private", icon: "protect", showLabel: true },
    { type: "toggle", id: "form.importanceHigh", label: "High Importance", icon: "growFont", showLabel: true },
    { type: "toggle", id: "form.importanceLow", label: "Low Importance", icon: "shrinkFont", showLabel: true },
    { type: "dropdown", id: "form.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() },
  ],
});

const showGroup = (first: string): RibbonGroup => ({
  label: "Show",
  controls: [
    { type: "toggle", id: "event.viewMain", label: first, icon: "date", size: "large" },
    { type: "toggle", id: "event.viewScheduling", label: "Scheduling Assistant", icon: "table", size: "large" },
  ],
});

const apptFormTab: RibbonTab = {
  id: "appointment",
  label: "Appointment",
  contextual: "apptForm",
  groups: [
    {
      label: "Actions",
      controls: [
        { type: "button", id: "event.saveClose", label: "Save & Close", icon: "accept", size: "large", shortcut: "Ctrl+S" },
        { type: "button", id: "event.deleteOpen", label: "Delete", icon: "deleteCells", size: "large" },
        { type: "button", id: "event.forward", label: "Forward", icon: "redo", size: "large" },
      ],
    },
    { label: "Teams Meeting", controls: [{ type: "toggle", id: "event.teams", label: "Teams Meeting", icon: "video", size: "large" }] },
    showGroup("Appointment"),
    { label: "Attendees", controls: [{ type: "button", id: "event.inviteAttendees", label: "Invite Attendees", icon: "recipients", size: "large" }] },
    optionsGroup("event"),
    formTags("event"),
  ],
};

const meetingFormTab: RibbonTab = {
  id: "meeting",
  label: "Meeting",
  contextual: "meetingForm",
  groups: [
    {
      label: "Actions",
      controls: [
        { type: "button", id: "event.discard", label: "Delete", icon: "deleteCells", size: "large" },
        { type: "button", id: "event.cancelMeeting", label: "Cancel Meeting", icon: "close", size: "large" },
        { type: "button", id: "event.forward", label: "Forward", icon: "redo", size: "large" },
      ],
    },
    { label: "Teams Meeting", controls: [{ type: "toggle", id: "event.teams", label: "Teams Meeting", icon: "video", size: "large" }] },
    showGroup("Meeting"),
    {
      label: "Attendees",
      controls: [
        { type: "button", id: "event.cancelInvitation", label: "Cancel Invitation", icon: "close", size: "large" },
        { type: "button", id: "compose.addressBook", label: "Address Book", icon: "recipients", showLabel: true },
        { type: "button", id: "compose.checkNames", label: "Check Names", icon: "checkIssues", showLabel: true },
        { type: "dropdown", id: "event.responseOptions", label: "Response Options", icon: "options", showLabel: true, options: ["Request Responses", "Allow New Time Proposals", "Hide Attendee List"].map((v) => ({ value: v })) },
      ],
    },
    optionsGroup("event"),
    formTags("event"),
  ],
};

const insertForm: RibbonTab = {
  id: "insert",
  label: "Insert",
  contextual: "eventForm",
  groups: [
    { label: "Tables", controls: [{ type: "button", id: "insert.table", label: "Table", icon: "table", size: "large" }] },
    { label: "Illustrations", controls: [{ type: "button", id: "insert.pictures", label: "Pictures", icon: "picture", size: "large" }] },
    { label: "Links", controls: [{ type: "button", id: "insert.link", label: "Link", icon: "link", size: "large" }] },
  ],
};

/* Selected item in the calendar (Calendar Tools). */
const deleteDropdown: RibbonControl = { type: "dropdown", id: "item.delete", label: "Delete", icon: "deleteCells", size: "large", options: [{ value: "Delete Occurrence", icon: "deleteCells" }, { value: "Delete Series", icon: "deleteCells" }] };

const apptSelTab: RibbonTab = {
  id: "calAppt",
  label: "Appointment",
  contextual: "apptSel",
  groups: [
    { label: "Actions", controls: [{ type: "button", id: "item.open", label: "Open", icon: "open", size: "large" }, deleteBtn, { type: "button", id: "event.forward", label: "Forward", icon: "redo", size: "large" }] },
    optionsGroup("evtsel"),
    { label: "Tags", controls: [{ type: "toggle", id: "evtsel.private", label: "Private", icon: "protect", showLabel: true }, { type: "dropdown", id: "item.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() }] },
  ],
};

const meetingSelTab: RibbonTab = {
  id: "calMeeting",
  label: "Meeting",
  contextual: "meetingSel",
  groups: [
    {
      label: "Actions",
      controls: [
        { type: "button", id: "event.cancelMeeting", label: "Cancel Meeting", icon: "close", size: "large" },
        deleteBtn,
        { type: "button", id: "item.open", label: "Open", icon: "open", size: "large" },
        { type: "button", id: "event.forward", label: "Forward", icon: "redo", size: "large" },
      ],
    },
    { label: "Respond", controls: [{ type: "dropdown", id: "evtsel.respond", label: "Respond", icon: "accept", size: "large", options: ["Accept", "Tentative", "Decline"].map((v) => ({ value: v })) }] },
    optionsGroup("evtsel"),
    { label: "Tags", controls: [{ type: "toggle", id: "evtsel.private", label: "Private", icon: "protect", showLabel: true }, { type: "dropdown", id: "item.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() }] },
  ],
};

/* One occurrence of a recurring item selected: Delete asks Occurrence or Series. */
const occurrenceTab = (meeting: boolean): RibbonTab => {
  const base = meeting ? meetingSelTab : apptSelTab;
  const swap = (c: RibbonControl): RibbonControl => (c.type === "button" && c.id === "item.delete" ? deleteDropdown : c);
  return {
    ...base,
    id: meeting ? "calMeetingOcc" : "calApptOcc",
    label: meeting ? "Meeting Occurrence" : "Appointment Occurrence",
    contextual: meeting ? "meetingOccSel" : "apptOccSel",
    groups: base.groups.map((g) => ({ ...g, controls: g.controls.map(swap) })),
  };
};

/* Meeting request selected in the Inbox. */
const respondOptions = (base: string): RibbonOption[] => [
  { value: `${base} (Edit)`, label: "Edit the Response before Sending" },
  { value: base, label: "Send the Response Now" },
  { value: `${base} (No Response)`, label: "Do Not Send a Response" },
];

const inviteTab: RibbonTab = {
  id: "invite",
  label: "Meeting",
  contextual: "invite",
  groups: [
    {
      label: "Respond",
      controls: [
        { type: "dropdown", id: "invite.respond", label: "Accept", icon: "accept", size: "large", options: respondOptions("Accept") },
        { type: "dropdown", id: "invite.tentative", label: "Tentative", icon: "whatIf", size: "large", options: respondOptions("Tentative").map((o) => ({ ...o, command: "invite.respond" })) },
        { type: "dropdown", id: "invite.decline", label: "Decline", icon: "reject", size: "large", options: respondOptions("Decline").map((o) => ({ ...o, command: "invite.respond" })) },
        {
          type: "dropdown",
          id: "invite.propose",
          label: "Propose New Time",
          icon: "history",
          size: "large",
          options: [
            { value: "Tentative and Propose New Time...", dialog: "proposeTime" },
            { value: "Decline and Propose New Time...", dialog: "proposeTimeDecline" },
          ],
        },
        {
          type: "dropdown",
          id: "invite.reply",
          label: "Respond",
          icon: "undo",
          size: "large",
          options: [
            { value: "Reply", command: "mail.reply" },
            { value: "Reply All", command: "mail.replyAll" },
            { value: "Forward", command: "mail.forward" },
          ],
        },
      ],
    },
    { label: "Calendar", controls: [{ type: "button", id: "invite.calendar", label: "Calendar...", icon: "date", size: "large" }] },
    { label: "Delete", controls: [deleteBtn] },
    tagsGroup(false),
  ],
};

/* ---------- contact / task / group forms ---------- */

const contactFormTab: RibbonTab = {
  id: "contact",
  label: "Contact",
  contextual: "contactForm",
  groups: [
    {
      label: "Actions",
      controls: [
        { type: "button", id: "contact.saveClose", label: "Save & Close", icon: "accept", size: "large", shortcut: "Ctrl+S" },
        { type: "button", id: "contact.deleteOpen", label: "Delete", icon: "deleteCells", size: "large" },
        { type: "button", id: "contact.forward", label: "Forward", icon: "redo", showLabel: true },
      ],
    },
    {
      label: "Show",
      controls: [
        { type: "toggle", id: "form.viewMain", label: "General", icon: "icons", size: "large" },
        { type: "toggle", id: "form.viewDetails", label: "Details", icon: "notes", size: "large" },
      ],
    },
    {
      label: "Communicate",
      controls: [
        { type: "button", id: "contact.emailTo", label: "Email", icon: "envelope", size: "large" },
        { type: "button", id: "contact.meetingWith", label: "Meeting", icon: "date", size: "large" },
      ],
    },
    { label: "Names", controls: [{ type: "button", id: "addressBook.open", label: "Address Book", icon: "recipients", size: "large" }] },
    {
      label: "Tags",
      controls: [
        { type: "dropdown", id: "form.followUp", label: "Follow Up", icon: "history", showLabel: true, options: followUpOptions(undefined, false) },
        { type: "toggle", id: "form.private", label: "Private", icon: "protect", showLabel: true },
        { type: "dropdown", id: "form.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() },
      ],
    },
  ],
};

const taskFormTab: RibbonTab = {
  id: "task",
  label: "Task",
  contextual: "taskForm",
  groups: [
    {
      label: "Actions",
      controls: [
        { type: "button", id: "task.saveClose", label: "Save & Close", icon: "accept", size: "large", shortcut: "Ctrl+S" },
        { type: "button", id: "task.deleteOpen", label: "Delete", icon: "deleteCells", size: "large" },
      ],
    },
    {
      label: "Show",
      controls: [
        { type: "toggle", id: "form.viewMain", label: "Task", icon: "checkIssues", size: "large" },
        { type: "toggle", id: "form.viewDetails", label: "Details", icon: "notes", size: "large" },
      ],
    },
    {
      label: "Manage Task",
      controls: [
        { type: "toggle", id: "task.assign", label: "Assign Task", icon: "recipients", size: "large" },
        { type: "button", id: "task.statusReport", label: "Send Status Report", icon: "envelope", size: "large" },
        { type: "button", id: "task.complete", label: "Mark Complete", icon: "accept", size: "large" },
      ],
    },
    {
      label: "Tags",
      controls: [
        { type: "toggle", id: "form.private", label: "Private", icon: "protect", showLabel: true },
        { type: "toggle", id: "form.importanceHigh", label: "High Importance", icon: "growFont", showLabel: true },
        { type: "toggle", id: "form.importanceLow", label: "Low Importance", icon: "shrinkFont", showLabel: true },
        { type: "dropdown", id: "form.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() },
      ],
    },
  ],
};

const groupFormTab: RibbonTab = {
  id: "contactGroup",
  label: "Contact Group",
  contextual: "groupForm",
  groups: [
    {
      label: "Actions",
      controls: [
        { type: "button", id: "group.saveClose", label: "Save & Close", icon: "accept", size: "large", shortcut: "Ctrl+S" },
        { type: "button", id: "group.deleteOpen", label: "Delete Group", icon: "deleteCells", size: "large" },
      ],
    },
    {
      label: "Members",
      controls: [
        {
          type: "dropdown",
          id: "group.addMenu",
          label: "Add Members",
          icon: "recipients",
          size: "large",
          options: ["From Outlook Contacts", "From Address Book", "New E-mail Contact"].map((v) => ({ value: v, icon: "recipients", command: "group.addMembers" })),
        },
      ],
    },
    { label: "Tags", controls: [{ type: "dropdown", id: "form.categorize", label: "Categorize", icon: "colors", showLabel: true, options: categorizeOptions() }] },
  ],
};

/* ---------- search ---------- */

const searchTab: RibbonTab = {
  id: "search",
  label: "Search",
  contextual: "search",
  groups: [
    {
      label: "Scope",
      controls: [
        { type: "toggle", id: "search.scopeFolder", label: "Current Folder", icon: "folder", showLabel: true },
        { type: "toggle", id: "search.scopeMailbox", label: "Current Mailbox", icon: "envelope", showLabel: true },
        { type: "toggle", id: "search.scopeAll", label: "All Mailboxes", icon: "open", showLabel: true },
      ],
    },
    {
      label: "Refine",
      controls: [
        { type: "button", id: "search.refineFrom", label: "From", icon: "icons", size: "large" },
        { type: "button", id: "search.refineSubject", label: "Subject", icon: "comment", size: "large" },
        { type: "dropdown", id: "search.refine", label: "Has Attachments", icon: "link", size: "large", options: ["Has Attachments", "Flagged", "Important", "Unread", "Categorized", "This Week"].map((v) => ({ value: v })) },
      ],
    },
    { label: "Close", controls: [{ type: "button", id: "search.close", label: "Close Search", icon: "close", size: "large" }] },
  ],
};

/* ---------- always-on tabs ---------- */

const sendReceiveTab: RibbonTab = {
  id: "sendReceive",
  label: "Send / Receive",
  contextual: "main",
  groups: [
    {
      label: "Send & Receive",
      controls: [
        { type: "button", id: "sendReceive.all", label: "Send/Receive All Folders", icon: "reset", size: "large", shortcut: "F9" },
        { type: "button", id: "sendReceive.folder", label: "Update Folder", icon: "reset", showLabel: true, shortcut: "Shift+F9" },
        { type: "button", id: "sendReceive.sendAll", label: "Send All", icon: "redo", showLabel: true },
      ],
    },
    {
      label: "Download",
      controls: [
        { type: "button", id: "sendReceive.progress", label: "Show Progress", icon: "history", showLabel: true },
        { type: "button", id: "sendReceive.cancel", label: "Cancel All", icon: "close", showLabel: true },
      ],
    },
    { label: "Preferences", controls: [{ type: "toggle", id: "sendReceive.offline", label: "Work Offline", icon: "pc", size: "large" }] },
  ],
};

const folderTab: RibbonTab = {
  id: "folder",
  label: "Folder",
  contextual: "mail",
  groups: [
    {
      label: "New",
      controls: [
        { type: "button", id: "folder.new", label: "New Folder", icon: "open", size: "large", dialog: "newFolder", shortcut: "Ctrl+Shift+E" },
        { type: "button", id: "folder.newSearch", label: "New Search Folder", icon: "find", size: "large" },
      ],
    },
    {
      label: "Actions",
      controls: [
        { type: "button", id: "folder.rename", label: "Rename Folder", icon: "editor", showLabel: true },
        { type: "button", id: "folder.copy", label: "Copy Folder", icon: "copy", showLabel: true },
        { type: "button", id: "folder.delete", label: "Delete Folder", icon: "deleteCells", showLabel: true },
      ],
    },
    {
      label: "Clean Up",
      controls: [
        { type: "button", id: "folder.markAllRead", label: "Mark All as Read", icon: "envelope", size: "large" },
        { type: "button", id: "rules.runNow", label: "Run Rules Now", icon: "filter", size: "large" },
        { type: "button", id: "folder.sortAZ", label: "Show All Folders A to Z", icon: "sort", showLabel: true },
        { type: "dropdown", id: "mail.cleanUp", label: "Clean Up Folder", icon: "clear", showLabel: true, options: ["Clean Up Folder", "Clean Up Folder & Subfolders"].map((v) => ({ value: v })) },
        { type: "button", id: "folder.deleteAll", label: "Delete All", icon: "deleteCells", showLabel: true },
      ],
    },
    { label: "Favorites", controls: [{ type: "toggle", id: "folder.favorite", label: "Show in Favorites", icon: "folder", size: "large" }] },
    {
      label: "Properties",
      controls: [
        { type: "button", id: "folder.autoArchive", label: "AutoArchive Settings", icon: "history", size: "large" },
        { type: "button", id: "folder.permissions", label: "Folder Permissions", icon: "protect", size: "large" },
        { type: "button", id: "folder.properties", label: "Folder Properties", icon: "info", size: "large" },
      ],
    },
  ],
};

const layoutGroup: RibbonGroup = {
  label: "Layout",
  controls: [
    { type: "dropdown", id: "view.folderPane", label: "Folder Pane", icon: "navPane", size: "large", options: ["Normal", "Minimized", "Off"].map((v) => ({ value: v })) },
    { type: "dropdown", id: "view.readingPane", label: "Reading Pane", icon: "compare", size: "large", options: ["Right", "Bottom", "Off"].map((v) => ({ value: v })) },
    { type: "dropdown", id: "view.todoBar", label: "To-Do Bar", icon: "checkIssues", size: "large", options: ["Calendar", "People", "Tasks", "Off"].map((v) => ({ value: v })) },
  ],
};
const windowGroup: RibbonGroup = {
  label: "Window",
  controls: [
    { type: "button", id: "view.reminders", label: "Reminders Window", icon: "history", size: "large" },
    { type: "button", id: "view.newWindow", label: "Open in New Window", icon: "newWindow", size: "large" },
    { type: "button", id: "view.closeAll", label: "Close All Items", icon: "close", size: "large" },
  ],
};

const viewMail: RibbonTab = {
  id: "view",
  label: "View",
  contextual: "mail",
  groups: [
    {
      label: "Current View",
      controls: [
        { type: "dropdown", id: "view.changeView", label: "Change View", icon: "layout", size: "large", options: ["Compact", "Single", "Preview"].map((v) => ({ value: v, icon: "layout" })) },
        { type: "button", id: "view.settings", label: "View Settings", icon: "options", size: "large" },
        { type: "button", id: "view.reset", label: "Reset View", icon: "reset", size: "large" },
      ],
    },
    {
      label: "Messages",
      controls: [
        { type: "toggle", id: "view.conversations", label: "Show as Conversations", icon: "comment", showLabel: true },
        { type: "dropdown", id: "view.conversationSettings", label: "Conversation Settings", icon: "options", showLabel: true, options: ["Show Messages from Other Folders", "Show Senders Above the Subject", "Always Expand Selected Conversation", "Use Classic Indented View"].map((v) => ({ value: v })) },
        { type: "toggle", id: "view.focusedInbox", label: "Show Focused Inbox", icon: "filter", size: "large" },
      ],
    },
    {
      label: "Arrangement",
      controls: [
        { type: "gallery", id: "mail.arrange", label: "Arrangement", width: 260, options: ["Date", "From", "To", "Categories", "Flag: Start Date", "Flag: Due Date", "Size", "Subject", "Attachments", "Importance"].map((v) => ({ value: v })) },
        { type: "button", id: "view.reverseSort", label: "Reverse Sort", icon: "sort", showLabel: true },
        { type: "button", id: "view.addColumns", label: "Add Columns", icon: "insertCells", showLabel: true },
      ],
    },
    layoutGroup,
    { label: "People Pane", controls: [{ type: "dropdown", id: "view.peoplePane", label: "People Pane", icon: "recipients", size: "large", options: ["Normal", "Minimized", "Off"].map((v) => ({ value: v })) }] },
    windowGroup,
  ],
};

const viewCal: RibbonTab = {
  id: "view",
  label: "View",
  contextual: "calendar",
  groups: [
    {
      label: "Current View",
      controls: [
        { type: "dropdown", id: "cal.changeView", label: "Change View", icon: "layout", size: "large", options: ["Calendar", "Preview", "List", "Active"].map((v) => ({ value: v })) },
        { type: "button", id: "view.settings", label: "View Settings", icon: "options", size: "large" },
        { type: "button", id: "view.reset", label: "Reset View", icon: "reset", size: "large" },
      ],
    },
    { label: "Arrangement", controls: calViews },
    {
      label: "Color",
      controls: [{ type: "dropdown", id: "cal.color", label: "Color", icon: "colors", size: "large", options: ["Automatic", "Blue", "Green", "Orange", "Purple", "Red"].map((v) => ({ value: v })) }],
    },
    layoutGroup,
    windowGroup,
  ],
};

const viewPeople: RibbonTab = {
  id: "view",
  label: "View",
  contextual: "people",
  groups: [
    {
      label: "Current View",
      controls: [
        { type: "dropdown", id: "people.view", label: "Change View", icon: "layout", size: "large", options: ["People", "Business Card", "Card", "Phone", "List"].map((v) => ({ value: v })) },
        { type: "button", id: "view.reset", label: "Reset View", icon: "reset", size: "large" },
      ],
    },
    layoutGroup,
    windowGroup,
  ],
};

const viewTasks: RibbonTab = {
  id: "view",
  label: "View",
  contextual: "tasks",
  groups: [
    {
      label: "Current View",
      controls: [
        { type: "dropdown", id: "tasks.view", label: "Change View", icon: "layout", size: "large", options: ["Detailed", "Simple List", "To-Do List", "Prioritized", "Active", "Completed", "Today", "Next 7 Days", "Overdue", "Assigned"].map((v) => ({ value: v })) },
        { type: "button", id: "view.settings", label: "View Settings", icon: "options", size: "large" },
        { type: "button", id: "view.reset", label: "Reset View", icon: "reset", size: "large" },
      ],
    },
    {
      label: "Arrangement",
      controls: [
        { type: "gallery", id: "tasks.arrange", label: "Arrangement", width: 240, options: ["Categories", "Start Date", "Due Date", "Folder", "Type", "Importance"].map((v) => ({ value: v })) },
        { type: "button", id: "view.reverseSort", label: "Reverse Sort", icon: "sort", showLabel: true },
      ],
    },
    layoutGroup,
    windowGroup,
  ],
};

const helpTab: RibbonTab = {
  id: "help",
  label: "Help",
  contextual: "main",
  groups: [
    {
      label: "Help",
      controls: [
        { type: "button", id: "help.help", label: "Help", icon: "help", size: "large", shortcut: "F1" },
        { type: "button", id: "help.support", label: "Contact Support", icon: "info", size: "large" },
        { type: "button", id: "help.feedback", label: "Feedback", icon: "comment", size: "large" },
        { type: "button", id: "help.training", label: "Show Training", icon: "video", size: "large" },
        { type: "button", id: "help.whatsNew", label: "What's New", icon: "effects", size: "large" },
      ],
    },
  ],
};

/**
 * Never shown. Lists dialogs that open from the File tab or from the canvas
 * (the Send button's Schedule Send, the forms' Save) so the validator knows
 * they are reachable.
 */
const canvasRegistry: RibbonTab = {
  id: "_canvas",
  label: "Canvas",
  contextual: "__never__",
  groups: [
    {
      label: "Canvas dialogs",
      controls: ["scheduleSend", "event.save", "contact.save", "task.save", "group.save"].map((d) => ({ type: "button", id: `canvas.${d}`, label: d, dialog: d }) as RibbonControl),
    },
  ],
};

/**
 * Contexts whose tabs are ordinary tabs in real Outlook: the per-module Home,
 * Folder and View tabs, Send / Receive and Help ("main", hidden while a form
 * window is open), and every tab of a pop-out compose or item window.
 */
const PLAIN_CONTEXTS = new Set(["mail", "calendar", "people", "tasks", "main", "compose", "readWindow", "apptForm", "meetingForm", "eventForm", "contactForm", "taskForm", "groupForm"]);

export const outlookRibbon: RibbonTab[] = [
  homeMail,
  homeCal,
  homePeople,
  homeTasks,
  messageTab,
  messageInlineTab,
  readWindowTab,
  apptFormTab,
  meetingFormTab,
  contactFormTab,
  taskFormTab,
  groupFormTab,
  inviteTab,
  apptSelTab,
  meetingSelTab,
  occurrenceTab(false),
  occurrenceTab(true),
  insertCompose,
  insertForm,
  optionsCompose,
  formatTextTab("compose"),
  formatTextTab("eventForm"),
  reviewCompose,
  searchTab,
  sendReceiveTab,
  folderTab,
  viewMail,
  viewCal,
  viewPeople,
  viewTasks,
  helpTab,
  canvasRegistry,
].map((t) => (PLAIN_CONTEXTS.has(t.contextual ?? "") ? { ...t, plain: true } : t));
