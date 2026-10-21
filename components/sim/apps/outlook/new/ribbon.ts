import type { RibbonControl, RibbonOption, RibbonTab } from "@/types/sim";
import { CATEGORY_COLORS, CATEGORY_SLOTS } from "../model";
import { NEW_REMINDERS, NEW_SHOW_AS } from "./model";

/**
 * New Outlook for Windows Ribbon (simplified layout). Tabs are keyed by
 * `contextual` (see newContextual): mail | compose | search | calendar |
 * people | eventForm, plus main for the Help tab. The canvas draws these in
 * one row, the way new Outlook does; icons are OIcon names (../parts.tsx).
 */

const FONTS = ["Aptos", "Arial", "Calibri", "Cambria", "Georgia", "Segoe UI", "Tahoma", "Times New Roman", "Verdana"];
const SIZES = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "24"];
const COLORS: RibbonOption[] = [
  { value: "Automatic", label: "Automatic", color: "#000000" },
  { value: "#C00000", label: "Dark red", color: "#C00000" },
  { value: "#FF0000", label: "Red", color: "#FF0000" },
  { value: "#FFC000", label: "Orange", color: "#FFC000" },
  { value: "#00B050", label: "Green", color: "#00B050" },
  { value: "#0070C0", label: "Blue", color: "#0070C0" },
  { value: "#002060", label: "Dark blue", color: "#002060" },
  { value: "#7030A0", label: "Purple", color: "#7030A0" },
];

const b = (id: string, label: string, icon: string, extra: Partial<RibbonControl> = {}): RibbonControl => ({ type: "button", id, label, icon, showLabel: true, ...extra }) as RibbonControl;
const t = (id: string, label: string, icon: string, extra: Partial<RibbonControl> = {}): RibbonControl => ({ type: "toggle", id, label, icon, showLabel: true, ...extra }) as RibbonControl;
const dd = (id: string, label: string, icon: string, options: RibbonOption[], extra: Partial<RibbonControl> = {}): RibbonControl =>
  ({ type: "dropdown", id, label, icon, showLabel: true, options, ...extra }) as RibbonControl;
const sep: RibbonControl = { type: "separator" };

const categorize: RibbonOption[] = [
  ...CATEGORY_SLOTS.map((c) => ({ value: c, label: c.replace(" Category", " category"), color: CATEGORY_COLORS[c] })),
  { value: "New category", icon: "plus", dialog: "newCategory" },
  { value: "Clear All Categories", label: "Clear categories", icon: "close" },
  { value: "Manage categories", icon: "gear", command: "settings.open" },
];

const flagOptions: RibbonOption[] = [
  ...["Today", "Tomorrow", "This week", "Next week", "No date"].map((v) => ({ value: v, icon: "flag" })),
  { value: "Mark complete", icon: "check" },
  { value: "Clear flag", icon: "close" },
];

const fontRow: RibbonControl[] = [
  { type: "dropdown", id: "format.fontName", label: "Font", combo: true, width: 96, stateKey: "format.fontName", options: FONTS.map((f) => ({ value: f })) },
  { type: "dropdown", id: "format.fontSize", label: "Font size", combo: true, width: 44, stateKey: "format.fontSize", options: SIZES.map((f) => ({ value: f })) },
  { type: "toggle", id: "format.bold", label: "Bold", icon: "bold", shortcut: "Ctrl+B" },
  { type: "toggle", id: "format.italic", label: "Italic", icon: "italic", shortcut: "Ctrl+I" },
  { type: "toggle", id: "format.underline", label: "Underline", icon: "underline", shortcut: "Ctrl+U" },
  { type: "dropdown", id: "format.highlight", label: "Highlight", icon: "highlight", gallery: "swatches", options: COLORS.slice(1) },
  { type: "dropdown", id: "format.fontColor", label: "Font color", icon: "fontColor", gallery: "swatches", options: COLORS },
  { type: "button", id: "format.bullets", label: "Bullets", icon: "bullets" },
  { type: "button", id: "format.numbering", label: "Numbering", icon: "numbering" },
];

const attachFile = dd("compose.attach", "Attach file", "clip", [
  { value: "Browse this computer", icon: "folder", dialog: "attachFile" },
  { value: "Upload and share from OneDrive", label: "OneDrive", icon: "cloud", dialog: "attachFile" },
]);
const signature = dd("compose.insertSignature", "Signature", "pen", [{ value: "Signatures", label: "Signatures...", icon: "gear", command: "settings.open" }]);

export const newOutlookRibbon: RibbonTab[] = [
  /* ---------------- Mail ---------------- */
  {
    id: "home",
    label: "Home",
    contextual: "mail",
    plain: true,
    groups: [
      {
        label: "New",
        controls: [
          dd("home.new", "New mail", "newMail", [
            { value: "Mail", icon: "mail", command: "mail.newEmail" },
            { value: "Event", icon: "calendar", command: "cal.newAppointment" },
          ], { split: true, faceValue: "Mail" }),
        ],
      },
      {
        label: "Delete",
        controls: [
          b("item.delete", "Delete", "trash", { shortcut: "Delete" }),
          b("mail.archive", "Archive", "archive"),
          dd("home.report", "Report", "shield", [
            { value: "Report phishing", icon: "warning" },
            { value: "Report junk", icon: "junk" },
          ]),
          b("mail.sweep", "Sweep", "sweep", { dialog: "sweep" }),
        ],
      },
      {
        label: "Move",
        controls: [
          dd("mail.move", "Move to", "folderMove", [
            { value: "Inbox", icon: "inbox" },
            { value: "Archive", icon: "archive" },
            { value: "Move to a different folder", label: "Move to a different folder...", icon: "folder", dialog: "moveTo" },
          ]),
          dd("home.rules", "Rules", "rules", [
            { value: "Create rule", label: "Create rule...", icon: "rules", dialog: "createRuleQuick" },
            { value: "Manage rules", icon: "gear", command: "settings.open" },
          ]),
        ],
      },
      {
        label: "Respond",
        controls: [b("mail.reply", "Reply", "reply", { shortcut: "Ctrl+R" }), b("mail.replyAll", "Reply all", "replyAll", { shortcut: "Ctrl+Shift+R" }), b("mail.forward", "Forward", "forward", { shortcut: "Ctrl+F" })],
      },
      {
        label: "Quick steps",
        controls: [dd("home.quickStep", "Quick steps", "bolt", [{ value: "Manage quick steps", icon: "gear", command: "settings.open" }])],
      },
      {
        label: "Tags",
        controls: [
          b("mail.toggleRead", "Read / Unread", "mailOpen"),
          dd("item.categorize", "Categorize", "tag", categorize),
          dd("item.followUp", "Flag / Unflag", "flag", flagOptions, { split: true, faceValue: "Today" }),
          t("mail.pin", "Pin / Unpin", "pin", { stateKey: "mail.pin" }),
          dd("mail.snooze", "Snooze", "alarm", ["Later today", "Tomorrow", "This weekend", "Next week"].map((v) => ({ value: v, icon: "clock" }))),
        ],
      },
    ],
  },
  {
    id: "view",
    label: "View",
    contextual: "mail",
    plain: true,
    groups: [
      {
        label: "Settings",
        controls: [b("settings.open", "View settings", "gear")],
      },
      {
        label: "Layout",
        controls: [
          dd("view.readingPane", "Layout", "layout", [
            { value: "Right", label: "Show reading pane on the right", icon: "layout" },
            { value: "Bottom", label: "Show reading pane on the bottom", icon: "layout" },
            { value: "Off", label: "Hide reading pane", icon: "layout" },
          ]),
          dd("view.folderPane", "Folder pane", "folder", [
            { value: "Normal", label: "Show folder pane" },
            { value: "Off", label: "Hide folder pane" },
          ]),
          t("view.myDay", "My Day", "myday"),
        ],
      },
    ],
  },
  {
    id: "search",
    label: "Search",
    contextual: "search",
    plain: true,
    groups: [
      {
        label: "Refine",
        controls: [
          b("search.refineFrom", "From", "person"),
          b("search.refineSubject", "Subject", "mail"),
          dd("search.refine", "Filters", "filter", ["Unread", "Flagged", "Has Attachments", "Mentioned", "All"].map((v) => ({ value: v, label: v === "Has Attachments" ? "Has attachments" : v === "Mentioned" ? "Mentions me" : v === "All" ? "Clear filters" : v }))),
          b("search.close", "Exit search", "close"),
        ],
      },
    ],
  },
  /* ---------------- Compose ---------------- */
  {
    id: "message",
    label: "Message",
    contextual: "compose",
    plain: true,
    groups: [
      { label: "Basic text", controls: fontRow },
      { label: "Insert", controls: [attachFile, b("insert.link", "Link", "link"), signature] },
      { label: "Proofing", controls: [b("review.spelling", "Editor", "editor"), b("format.dictate", "Dictate", "mic")] },
    ],
  },
  {
    id: "insert",
    label: "Insert",
    contextual: "compose",
    plain: true,
    groups: [
      {
        label: "Insert",
        controls: [
          attachFile,
          b("insert.link", "Link", "link"),
          b("insert.pictures", "Pictures", "image", { dialog: "insertPicture" }),
          b("insert.table", "Table", "table"),
          b("insert.emoji", "Emoji", "emoji"),
          signature,
        ],
      },
    ],
  },
  {
    id: "format",
    label: "Format text",
    contextual: "compose",
    plain: true,
    groups: [
      { label: "Font", controls: fontRow },
      {
        label: "Paragraph",
        controls: [
          { type: "button", id: "format.alignLeft", label: "Align left", icon: "alignLeft" },
          { type: "button", id: "format.alignCenter", label: "Center", icon: "alignCenter" },
          { type: "button", id: "format.alignRight", label: "Align right", icon: "alignRight" },
          b("format.clear", "Clear formatting", "close"),
        ],
      },
    ],
  },
  {
    id: "options",
    label: "Options",
    contextual: "compose",
    plain: true,
    groups: [
      { label: "Show", controls: [t("compose.from", "Show From", "person", { stateKey: "compose.from" }), t("compose.bcc", "Show Bcc", "group", { stateKey: "compose.bcc" })] },
      {
        label: "Protect",
        controls: [
          dd("compose.encrypt", "Encrypt", "lock", [
            { value: "Encrypt", icon: "lock" },
            { value: "Do Not Forward", icon: "lock" },
            { value: "Remove encryption", icon: "close" },
          ]),
          dd("compose.sensitivity", "Sensitivity", "tag", [
            { value: "Public" },
            { value: "General" },
            { value: "Confidential" },
            { value: "Highly Confidential" },
          ]),
        ],
      },
      {
        label: "Tags",
        controls: [
          t("message.importanceHigh", "High importance", "important", { stateKey: "message.importanceHigh" }),
          t("message.importanceLow", "Low importance", "down", { stateKey: "message.importanceLow" }),
        ],
      },
      {
        label: "Tracking",
        controls: [
          t("options.readReceipt", "Request a Read Receipt", "mailOpen", { stateKey: "options.readReceipt" }),
          t("options.deliveryReceipt", "Request a Delivery Receipt", "send", { stateKey: "options.deliveryReceipt" }),
        ],
      },
      { label: "Accessibility", controls: [b("review.accessibility", "Check Accessibility", "accessibility")] },
    ],
  },
  /* ---------------- Calendar ---------------- */
  {
    id: "calHome",
    label: "Home",
    contextual: "calendar",
    plain: true,
    groups: [
      {
        label: "New",
        controls: [
          dd("cal.new", "New event", "calendarAdd", [
            { value: "Event", icon: "calendar", command: "cal.newAppointment" },
            { value: "Teams meeting", icon: "teams", command: "cal.newTeamsMeeting" },
          ], { split: true, faceValue: "Event" }),
        ],
      },
      {
        label: "Go to",
        controls: [b("cal.today", "Today", "calendar")],
      },
      {
        label: "Arrange",
        controls: [
          dd("cal.view", "Calendar view", "layout", [
            { value: "Day", icon: "calendar" },
            { value: "Work Week", label: "Work week", icon: "calendar" },
            { value: "Week", icon: "calendar" },
            { value: "Month", icon: "calendar" },
          ], { stateKey: "cal.view" }),
        ],
      },
      { label: "Share", controls: [b("cal.share", "Share calendar", "share", { dialog: "shareCalendar" })] },
    ],
  },
  {
    id: "calView",
    label: "View",
    contextual: "calendar",
    plain: true,
    groups: [
      { label: "Settings", controls: [b("settings.open", "View settings", "gear")] },
      {
        label: "Arrange",
        controls: [
          b("cal.day", "Day", "calendar"),
          b("cal.workweek", "Work week", "calendar"),
          b("cal.week", "Week", "calendar"),
          b("cal.month", "Month", "calendar"),
        ],
      },
    ],
  },
  /* ---------------- People ---------------- */
  {
    id: "peopleHome",
    label: "Home",
    contextual: "people",
    plain: true,
    groups: [
      {
        label: "New",
        controls: [
          dd("people.new", "New contact", "personAdd", [
            { value: "New contact", icon: "person", command: "people.newContact" },
            { value: "New contact list", icon: "group", command: "people.newGroup" },
          ], { split: true, faceValue: "New contact" }),
        ],
      },
      { label: "Manage", controls: [b("contact.edit", "Edit", "edit"), b("item.delete", "Delete", "trash"), b("contact.emailTo", "Email", "mail")] },
    ],
  },
  /* ---------------- Event form ---------------- */
  {
    id: "event",
    label: "Event",
    contextual: "eventForm",
    plain: true,
    groups: [
      { label: "Actions", controls: [b("event.saveClose", "Save", "save"), b("event.discard", "Discard", "trash")] },
      {
        label: "Options",
        controls: [
          b("event.viewScheduling", "Scheduling Assistant", "group"),
          t("event.teams", "Teams meeting", "teams", { stateKey: "event.teams" }),
          dd("event.showAs", "Show as", "calendar", NEW_SHOW_AS.map((v) => ({ value: v })), { stateKey: "event.showAs" }),
          dd("event.reminder", "Reminder", "bell", NEW_REMINDERS.map((v) => ({ value: v })), { stateKey: "event.reminder" }),
          b("event.recurrenceDialog", "Recurring", "recur", { dialog: "recurrence" }),
          dd("form.categorize", "Categorize", "tag", CATEGORY_SLOTS.map((c) => ({ value: c, label: c.replace(" Category", " category"), color: CATEGORY_COLORS[c] }))),
          t("event.private", "Private", "lock", { stateKey: "event.private" }),
        ],
      },
    ],
  },
  /* ---------------- Help (mail, calendar, people) ---------------- */
  {
    id: "help",
    label: "Help",
    contextual: "main",
    plain: true,
    groups: [
      {
        label: "Help",
        controls: [b("help.help", "Help", "help"), b("help.support", "Contact support", "headset"), b("help.feedback", "Feedback", "comment"), b("help.whatsNew", "What's new", "sparkle")],
      },
    ],
  },
];
