import type { DialogDef } from "@/types/sim";

/**
 * Dialogs the Google canvas draws itself (Material style, not the shared
 * Office dialog). The player never opens these: they are listed here so the
 * validator can check field names and options, and so the canvas's generic
 * dialog renderer has the fields.
 *
 * Fields named `file` identify the Drive item a dialog acts on (filled in by
 * the canvas, never shown).
 */
const ROLES = ["Viewer", "Commenter", "Editor"];

export const googleDialogs: Record<string, DialogDef> = {
  /* ---------- sharing ---------- */
  "g.share": {
    id: "g.share",
    title: "Share",
    okLabel: "Send",
    fields: [
      { type: "text", key: "file", label: "File" },
      { type: "text", key: "email", label: "Add people, groups, and calendar events" },
      { type: "select", key: "role", label: "Role", options: ROLES, default: "Editor" },
      { type: "checkbox", key: "notify", label: "Notify people", default: true },
      { type: "text", key: "message", label: "Message" },
    ],
  },
  "g.access": {
    id: "g.access",
    title: "General access",
    fields: [
      { type: "text", key: "file", label: "File" },
      { type: "select", key: "access", label: "General access", options: ["Restricted", "Organization", "Anyone with the link"] },
      { type: "select", key: "role", label: "Role", options: ROLES },
    ],
  },
  "g.permission": {
    id: "g.permission",
    title: "People with access",
    fields: [
      { type: "text", key: "file", label: "File" },
      { type: "text", key: "email", label: "Person" },
      { type: "select", key: "role", label: "Role", options: [...ROLES, "Remove access"] },
    ],
  },
  "g.expiry": {
    id: "g.expiry",
    title: "Access expiration",
    fields: [
      { type: "text", key: "file", label: "File" },
      { type: "text", key: "email", label: "Person" },
      { type: "text", key: "date", label: "Access expires" },
    ],
  },

  /* ---------- Drive and File menu ---------- */
  "g.move": {
    id: "g.move",
    title: "Move",
    okLabel: "Move",
    fields: [
      { type: "text", key: "file", label: "File" },
      { type: "text", key: "folder", label: "Folder" },
    ],
  },
  "g.shortcut": {
    id: "g.shortcut",
    title: "Add shortcut",
    okLabel: "Add",
    fields: [
      { type: "text", key: "file", label: "File" },
      { type: "text", key: "folder", label: "Folder" },
    ],
  },
  "g.makeCopy": {
    id: "g.makeCopy",
    title: "Copy document",
    okLabel: "Make a copy",
    fields: [
      { type: "text", key: "name", label: "Name" },
      { type: "text", key: "folder", label: "Folder" },
      { type: "checkbox", key: "share", label: "Share it with the same people", default: false },
      { type: "checkbox", key: "comments", label: "Copy comments and suggestions", default: false },
    ],
  },
  "g.email": {
    id: "g.email",
    title: "Email as attachment",
    okLabel: "Send",
    fields: [
      { type: "checkbox", key: "copy", label: "Send yourself a copy", default: false },
      { type: "text", key: "to", label: "To" },
      { type: "text", key: "subject", label: "Subject" },
      { type: "text", key: "message", label: "Message" },
      { type: "select", key: "format", label: "Attach as", options: ["PDF", "Microsoft Word", "Rich Text", "Plain Text", "Microsoft Excel", "Microsoft PowerPoint", "Don't attach. Include content in the email."], default: "PDF" },
    ],
  },
  "g.emailCollaborators": {
    id: "g.emailCollaborators",
    title: "Email collaborators",
    okLabel: "Send",
    fields: [
      { type: "text", key: "subject", label: "Subject" },
      { type: "text", key: "message", label: "Message" },
    ],
  },
  "g.print": {
    id: "g.print",
    title: "Print",
    okLabel: "Print",
    fields: [
      { type: "select", key: "destination", label: "Destination", options: ["Front Desk Printer", "Save as PDF", "Billing Office Printer"], default: "Front Desk Printer" },
      { type: "select", key: "pages", label: "Pages", options: ["All", "Odd pages only", "Even pages only", "Custom"], default: "All" },
      { type: "number", key: "copies", label: "Copies", default: 1, min: 1, max: 99 },
      { type: "select", key: "layout", label: "Layout", options: ["Portrait", "Landscape"], default: "Portrait" },
    ],
  },
  "g.nameVersion": {
    id: "g.nameVersion",
    title: "Name current version",
    okLabel: "Save",
    fields: [{ type: "text", key: "name", label: "Version name" }],
  },

  /* ---------- Docs ---------- */
  "g.chip": {
    id: "g.chip",
    title: "Smart chips",
    okLabel: "Insert",
    fields: [
      { type: "select", key: "kind", label: "Chip", options: ["person", "date", "file"], default: "person" },
      { type: "text", key: "value", label: "Person, date, or file" },
    ],
  },
  "g.pageSetup": {
    id: "g.pageSetup",
    title: "Page setup",
    okLabel: "OK",
    fields: [
      { type: "radio", key: "format", label: "Format", options: ["Pages", "Pageless"], default: "Pages" },
      { type: "radio", key: "orientation", label: "Orientation", options: ["Portrait", "Landscape"], default: "Portrait" },
      { type: "select", key: "size", label: "Paper size", options: ['Letter (8.5" x 11")', 'Tabloid (11" x 17")', 'Legal (8.5" x 14")', 'Statement (5.5" x 8.5")', 'Executive (7.25" x 10.5")', 'A4 (8.27" x 11.69")', 'A5 (5.83" x 8.27")'], default: 'Letter (8.5" x 11")' },
      { type: "color", key: "pageColor", label: "Page color", options: [], default: "#ffffff" },
      { type: "number", key: "top", label: "Top (inches)", default: 1, step: 0.25 },
      { type: "number", key: "bottom", label: "Bottom (inches)", default: 1, step: 0.25 },
      { type: "number", key: "left", label: "Left (inches)", default: 1, step: 0.25 },
      { type: "number", key: "right", label: "Right (inches)", default: 1, step: 0.25 },
    ],
  },
  "g.indent": {
    id: "g.indent",
    title: "Indentation options",
    okLabel: "Apply",
    fields: [
      { type: "number", key: "left", label: "Left (inches)", default: 0, step: 0.25 },
      { type: "number", key: "right", label: "Right (inches)", default: 0, step: 0.25 },
      { type: "select", key: "special", label: "Special indent", options: ["None", "First line", "Hanging"], default: "None" },
      { type: "number", key: "by", label: "By (inches)", default: 0.5, step: 0.25 },
    ],
  },
  "g.spacing": {
    id: "g.spacing",
    title: "Custom spacing",
    okLabel: "Apply",
    fields: [
      { type: "number", key: "lineSpacing", label: "Line spacing", default: 1.15, step: 0.05 },
      { type: "number", key: "before", label: "Before (pt)", default: 0 },
      { type: "number", key: "after", label: "After (pt)", default: 0 },
    ],
  },
  "g.image": {
    id: "g.image",
    title: "Insert image",
    okLabel: "Insert",
    fields: [
      { type: "select", key: "source", label: "Source", options: ["Upload from computer", "Stock & web", "Drive & Photos", "Camera", "By URL"], default: "Upload from computer" },
      { type: "text", key: "file", label: "Image" },
    ],
  },
  link: {
    id: "link",
    title: "Link",
    okLabel: "Apply",
    fields: [
      { type: "text", key: "text", label: "Text" },
      { type: "text", key: "address", label: "Search or paste a link" },
    ],
  },
  replace: {
    id: "replace",
    title: "Find and replace",
    okLabel: "Replace all",
    fields: [
      { type: "text", key: "find", label: "Find" },
      { type: "text", key: "replace", label: "Replace with" },
      { type: "select", key: "search", label: "Search", options: ["All sheets", "This sheet"], default: "All sheets" },
      { type: "checkbox", key: "matchCase", label: "Match case", default: false },
    ],
  },

  /* ---------- Sheets ---------- */
  "g.sortRange": {
    id: "g.sortRange",
    title: "Sort range",
    okLabel: "Sort",
    fields: [
      { type: "text", key: "range", label: "Range" },
      { type: "checkbox", key: "header", label: "Data has header row", default: false },
      { type: "select", key: "sortBy", label: "Sort by", options: [] },
      { type: "radio", key: "order", label: "Order", options: ["A to Z", "Z to A"], default: "A to Z" },
    ],
  },
  "g.validation": {
    id: "g.validation",
    title: "Data validation rules",
    okLabel: "Done",
    fields: [
      { type: "text", key: "range", label: "Apply to range" },
      { type: "select", key: "criteria", label: "Criteria", options: ["Dropdown", "Dropdown from a range", "Text contains", "Is valid email", "Is valid URL", "Number between", "Number greater than", "Is valid date", "Checkbox"], default: "Dropdown" },
      { type: "text", key: "items", label: "Items" },
      { type: "text", key: "min", label: "Minimum" },
      { type: "text", key: "max", label: "Maximum" },
      { type: "radio", key: "invalid", label: "If the data is invalid", options: ["Show a warning", "Reject the input"], default: "Reject the input" },
      { type: "radio", key: "style", label: "Display style", options: ["Chip", "Arrow", "Plain text"], default: "Chip" },
    ],
  },
  "g.cf": {
    id: "g.cf",
    title: "Conditional format rules",
    okLabel: "Done",
    fields: [
      { type: "radio", key: "type", label: "Type", options: ["Single color", "Color scale"], default: "Single color" },
      { type: "text", key: "range", label: "Apply to range" },
      { type: "select", key: "condition", label: "Format cells if…", options: ["Is empty", "Is not empty", "Text contains", "Text does not contain", "Text starts with", "Text ends with", "Text is exactly", "Greater than", "Greater than or equal to", "Less than", "Less than or equal to", "Is equal to", "Is not equal to", "Is between", "Is not between", "Custom formula is"], default: "Is not empty" },
      { type: "text", key: "value", label: "Value or formula" },
      { type: "text", key: "value2", label: "And" },
      { type: "select", key: "style", label: "Formatting style", options: ["Default", "Green fill", "Red fill", "Yellow fill", "Blue fill", "Red text", "Bold red text"], default: "Default" },
    ],
  },
  "g.pivot": {
    id: "g.pivot",
    title: "Create pivot table",
    okLabel: "Create",
    fields: [
      { type: "text", key: "range", label: "Data range" },
      { type: "radio", key: "insert", label: "Insert to", options: ["New sheet", "Existing sheet"], default: "New sheet" },
      { type: "text", key: "at", label: "Location" },
    ],
  },
  "g.protect": {
    id: "g.protect",
    title: "Protected sheets and ranges",
    okLabel: "Done",
    fields: [
      { type: "text", key: "description", label: "Enter a description" },
      { type: "radio", key: "kind", label: "Protect", options: ["Range", "Sheet"], default: "Range" },
      { type: "text", key: "range", label: "Range" },
      { type: "radio", key: "mode", label: "Range editing permissions", options: ["Show a warning when editing this range", "Restrict who can edit this range"], default: "Restrict who can edit this range" },
      { type: "select", key: "editors", label: "Who can edit", options: ["Only you", "Custom"], default: "Only you" },
    ],
  },
  "g.removeDuplicates": {
    id: "g.removeDuplicates",
    title: "Remove duplicates",
    okLabel: "Remove duplicates",
    fields: [
      { type: "checkbox", key: "header", label: "Data has header row", default: true },
      { type: "text", key: "columns", label: "Columns to analyze" },
    ],
  },

  /* ---------- Slides ---------- */
  "g.background": {
    id: "g.background",
    title: "Background",
    okLabel: "Done",
    fields: [
      { type: "color", key: "color", label: "Color", options: [] },
      { type: "checkbox", key: "addToTheme", label: "Add to theme", default: false },
    ],
  },
  "g.slideSize": {
    id: "g.slideSize",
    title: "Page setup",
    okLabel: "Apply",
    fields: [{ type: "select", key: "size", label: "Size", options: ["Widescreen 16:9", "Widescreen 16:10", "Standard 4:3"], default: "Widescreen 16:9" }],
  },
};
