import type { DialogDef, DialogField, WordDoc } from "@/types/sim";
import type { SimUi } from "../../types";
import { FONTS, PICTURE_FILES, SIZE_OPTS, THEME_COLORS } from "./ribbon";
import {
  CHAR_STYLE_NAMES,
  FILTER_OPS,
  PARA_STYLE_NAMES,
  columnsApplyTo,
  customStyleNames,
  headingsOf,
  mergeFieldNames,
  recipientLabel,
  recipientsOf,
  selectionFontInfo,
  type XDoc,
  type XMerge,
} from "./model";

/*
 * Dialog ids a step can judge ({ kind: "dialog", id, values }). Added for
 * references, mail merge and forms: bookmark (name), crossRef (refType, refTo,
 * hyperlink, item = heading text or bookmark name), customToc (pageNumbers,
 * rightAlign, leader, format, levels), editRecipients (r1…r12 checkboxes,
 * filterField, filterOp, filterValue, sortBy, sortOrder), autoText (entry),
 * saveAutoText (name, gallery, …), controlProperties (title, tag, items,
 * lockDelete, lockEdit). wordDialogDef (bottom of this file) fills in the
 * choices that come from the document.
 */

/** Merge fields offered when the document has no data source yet (the names Insert Merge Field lists). */
const MERGE_FIELDS = ["First_Name", "Last_Name", "Address", "City", "State", "ZIP", "Appointment_Date", "Appointment_Time", "Provider"];

/** Online Pictures (Bing) results the sim offers. */
export const ONLINE_PICTURES = ["Nurse giving a flu shot (illustration)", "Hand washing steps (icon set)", "Doctor talking with a patient (photo)", "Healthy plate (illustration)", "Calendar with reminder (icon)", "Clinic waiting room (photo)"];

const colors = ["Automatic", ...THEME_COLORS.map((c) => c.color)];

export const wordDialogs: Record<string, DialogDef> = {
  font: {
    id: "font",
    title: "Font",
    width: 460,
    tabs: [
      {
        label: "Font",
        fields: [
          { type: "select", key: "font", label: "Font:", options: FONTS },
          { type: "select", key: "style", label: "Font style:", options: ["Regular", "Italic", "Bold", "Bold Italic"] },
          { type: "select", key: "size", label: "Size:", options: SIZE_OPTS },
          { type: "color", key: "color", label: "Font color:", options: colors.slice(0, 13) },
          { type: "select", key: "underline", label: "Underline style:", options: ["(none)", "Single", "Double", "Dotted", "Wave"] },
          { type: "checkbox", key: "strike", label: "Strikethrough" },
          { type: "checkbox", key: "superscript", label: "Superscript" },
          { type: "checkbox", key: "subscript", label: "Subscript" },
          { type: "checkbox", key: "allCaps", label: "All caps" },
        ],
      },
      {
        label: "Advanced",
        fields: [
          { type: "select", key: "scale", label: "Scale:", options: ["100%", "90%", "110%"] },
          { type: "select", key: "spacing", label: "Spacing:", options: ["Normal", "Expanded", "Condensed"] },
        ],
      },
    ],
  },
  paragraph: {
    id: "paragraph",
    title: "Paragraph",
    width: 440,
    tabs: [
      {
        label: "Indents and Spacing",
        fields: [
          { type: "select", key: "alignment", label: "Alignment:", options: ["Left", "Centered", "Right", "Justified"] },
          { type: "number", key: "indentLeft", label: "Left indent:", step: 0.25, min: 0, suffix: '"' },
          { type: "number", key: "indentRight", label: "Right indent:", step: 0.25, min: 0, suffix: '"' },
          { type: "select", key: "special", label: "Special:", options: ["(none)", "First line", "Hanging"] },
          { type: "number", key: "by", label: "By:", step: 0.25, min: 0, suffix: '"' },
          { type: "number", key: "spaceBefore", label: "Spacing before:", step: 6, min: 0, suffix: "pt" },
          { type: "number", key: "spaceAfter", label: "Spacing after:", step: 6, min: 0, suffix: "pt" },
          { type: "select", key: "lineSpacing", label: "Line spacing:", options: ["Single", "1.5 lines", "Double", "Multiple"] },
          { type: "number", key: "at", label: "At:", step: 0.05, min: 0.5 },
        ],
      },
      {
        label: "Line and Page Breaks",
        fields: [
          { type: "checkbox", key: "widow", label: "Widow/Orphan control", default: true },
          { type: "checkbox", key: "keepNext", label: "Keep with next" },
          { type: "checkbox", key: "pageBreakBefore", label: "Page break before" },
        ],
      },
      {
        label: "Tabs",
        fields: [
          { type: "note", text: "Set a tab stop for the selected paragraphs. (In Word: Paragraph dialog › Tabs… button.)" },
          { type: "number", key: "tabPos", label: "Tab stop position:", step: 0.25, min: 0, suffix: '"' },
          { type: "radio", key: "tabAlign", label: "Alignment", options: ["Left", "Center", "Right", "Decimal", "Bar"], default: "Left" },
          { type: "radio", key: "tabLeader", label: "Leader", options: ["1 None", "2 .......", "3 -------", "4 _______"], default: "1 None" },
          { type: "checkbox", key: "clearTabs", label: "Clear all existing tab stops first" },
        ],
      },
    ],
  },
  replace: {
    id: "replace",
    title: "Find and Replace",
    okLabel: "Replace All",
    width: 440,
    fields: [
      { type: "text", key: "find", label: "Find what:" },
      { type: "text", key: "replace", label: "Replace with:" },
      { type: "checkbox", key: "matchCase", label: "Match case" },
      { type: "checkbox", key: "wholeWords", label: "Find whole words only" },
    ],
  },
  goTo: {
    id: "goTo",
    title: "Find and Replace",
    okLabel: "Go To",
    fields: [
      { type: "list", key: "what", label: "Go to what:", options: ["Page", "Section", "Line", "Bookmark", "Comment", "Heading"], height: 110 },
      { type: "text", key: "number", label: "Enter page number:" },
    ],
  },
  link: {
    id: "link",
    title: "Insert Hyperlink",
    width: 460,
    fields: [
      { type: "radio", key: "linkTo", label: "Link to:", options: ["Existing File or Web Page", "Place in This Document", "Create New Document", "E-mail Address"], default: "Existing File or Web Page" },
      { type: "text", key: "text", label: "Text to display:" },
      { type: "text", key: "address", label: "Address:", placeholder: "https://" },
    ],
  },
  newComment: {
    id: "newComment",
    title: "New Comment",
    okLabel: "Post",
    width: 360,
    fields: [
      { type: "note", text: "BEOC Student · Now" },
      { type: "text", key: "text", label: "Comment:", placeholder: "Start a conversation" },
    ],
  },
  insertPicture: {
    id: "insertPicture",
    title: "Insert Picture",
    okLabel: "Insert",
    width: 460,
    fields: [
      { type: "note", text: "This PC › Pictures › Clinic" },
      { type: "list", key: "file", label: "File name:", options: PICTURE_FILES, height: 130 },
    ],
  },
  onlinePictures: {
    id: "onlinePictures",
    title: "Online Pictures",
    okLabel: "Insert",
    width: 460,
    fields: [
      { type: "text", key: "search", label: "Search Bing:", placeholder: "Search Bing" },
      { type: "list", key: "image", label: "Results", options: ONLINE_PICTURES, height: 140 },
      { type: "checkbox", key: "creativeCommons", label: "Creative Commons only", default: true },
      { type: "note", text: "You're responsible for respecting others' rights, including copyright." },
    ],
  },
  compressPictures: {
    id: "compressPictures",
    title: "Compress Pictures",
    width: 380,
    fields: [
      { type: "checkbox", key: "onlyThis", label: "Apply only to this picture", default: true },
      { type: "checkbox", key: "deleteCropped", label: "Delete cropped areas of pictures", default: true },
      { type: "radio", key: "resolution", label: "Resolution:", options: ["High fidelity", "HD (330 ppi)", "Print (220 ppi)", "Web (150 ppi)", "E-mail (96 ppi)", "Use default resolution"], default: "Use default resolution" },
    ],
  },
  convertTextToTable: {
    id: "convertTextToTable",
    title: "Convert Text to Table",
    width: 360,
    fields: [
      { type: "number", key: "cols", label: "Number of columns:", default: 3, min: 1, max: 20 },
      { type: "radio", key: "autofit", label: "AutoFit behavior", options: ["Fixed column width", "AutoFit to contents", "AutoFit to window"], default: "Fixed column width" },
      { type: "radio", key: "separator", label: "Separate text at", options: ["Paragraphs", "Commas", "Tabs", "Other"], default: "Paragraphs" },
    ],
  },
  defineBullet: {
    id: "defineBullet",
    title: "Define New Bullet",
    width: 360,
    fields: [
      { type: "list", key: "symbol", label: "Bullet character (Symbol…):", options: ["•", "○", "■", "□", "◆", "➢", "➤", "✓", "★", "❖"], height: 120 },
      { type: "color", key: "color", label: "Font color (Font…):", options: colors },
    ],
  },
  setNumbering: {
    id: "setNumbering",
    title: "Set Numbering Value",
    width: 340,
    fields: [
      { type: "radio", key: "mode", label: "", options: ["Start new list", "Continue from previous list"], default: "Start new list" },
      { type: "number", key: "start", label: "Set value to:", default: 1, min: 1, max: 999 },
    ],
  },
  columns: {
    id: "columns",
    title: "Columns",
    width: 400,
    fields: [
      { type: "radio", key: "preset", label: "Presets", options: ["One", "Two", "Three", "Left", "Right"], default: "One" },
      { type: "number", key: "num", label: "Number of columns:", default: 1, min: 1, max: 6 },
      { type: "number", key: "spacing", label: "Spacing:", default: 0.5, min: 0, step: 0.1, suffix: '"' },
      { type: "checkbox", key: "equal", label: "Equal column width", default: true },
      { type: "checkbox", key: "line", label: "Line between" },
      // The choices shown depend on the selection (wordDialogDef): "Selected text" wraps it in continuous section breaks.
      { type: "select", key: "applyTo", label: "Apply to:", options: ["Whole document", "This section", "This point forward", "Selected text"] },
    ],
  },
  modifyStyle: {
    id: "modifyStyle",
    title: "Modify Style",
    width: 440,
    fields: [
      { type: "select", key: "style", label: "Name:", options: PARA_STYLE_NAMES },
      { type: "select", key: "font", label: "Font:", options: FONTS },
      { type: "select", key: "size", label: "Size:", options: SIZE_OPTS },
      { type: "color", key: "color", label: "Font color:", options: colors },
      { type: "checkbox", key: "bold", label: "Bold" },
      { type: "checkbox", key: "italic", label: "Italic" },
      { type: "select", key: "align", label: "Alignment:", options: ["Left", "Center", "Right", "Justify"] },
      { type: "number", key: "spaceAfter", label: "Spacing after (Format › Paragraph…):", step: 6, min: 0, suffix: "pt" },
      { type: "radio", key: "scope", label: "", options: ["Only in this document", "New documents based on this template"], default: "Only in this document" },
    ],
  },
  createStyle: {
    id: "createStyle",
    title: "Create New Style from Formatting",
    width: 440,
    fields: [
      { type: "text", key: "name", label: "Name:", default: "Style1" },
      { type: "select", key: "type", label: "Style type:", options: ["Paragraph", "Character", "Linked (paragraph and character)"] },
      { type: "select", key: "basedOn", label: "Style based on:", options: PARA_STYLE_NAMES },
      { type: "select", key: "font", label: "Font:", options: FONTS },
      { type: "select", key: "size", label: "Size:", options: SIZE_OPTS },
      { type: "color", key: "color", label: "Font color:", options: colors },
      { type: "checkbox", key: "bold", label: "Bold" },
      { type: "checkbox", key: "italic", label: "Italic" },
    ],
  },
  saveStyleSet: {
    id: "saveStyleSet",
    title: "Save as a New Style Set",
    okLabel: "Save",
    width: 400,
    fields: [
      { type: "note", text: "This PC › Templates › QuickStyles" },
      { type: "text", key: "name", label: "File name:" },
    ],
  },
  saveTheme: {
    id: "saveTheme",
    title: "Save Current Theme",
    okLabel: "Save",
    width: 400,
    fields: [
      { type: "note", text: "This PC › Templates › Document Themes" },
      { type: "text", key: "name", label: "File name:" },
      { type: "select", key: "type", label: "Save as type:", options: ["Office Theme (*.thmx)"] },
    ],
  },
  updateToc: {
    id: "updateToc",
    title: "Update Table of Contents",
    width: 360,
    fields: [
      { type: "note", text: "Word is updating the table of contents. Select one of the following options:" },
      { type: "radio", key: "mode", label: "", options: ["Update page numbers only", "Update entire table"], default: "Update page numbers only" },
    ],
  },
  createSource: {
    id: "createSource",
    title: "Create Source",
    width: 460,
    fields: [
      { type: "select", key: "type", label: "Type of Source:", options: ["Web site", "Journal Article", "Book", "Report"] },
      { type: "text", key: "author", label: "Author:" },
      { type: "text", key: "title", label: "Title:" },
      { type: "text", key: "year", label: "Year:" },
      { type: "text", key: "publisher", label: "Publisher / Website name:" },
      { type: "text", key: "url", label: "URL:" },
    ],
  },
  /**
   * References › Manage Sources (Source Manager). The Master List holds sources
   * saved from earlier documents (doc.masterSources); OK ("Copy →") copies the
   * chosen one to this document's Current List without citing it. Options are
   * filled in by wordDialogDef.
   */
  manageSources: {
    id: "manageSources",
    title: "Source Manager",
    okLabel: "Copy →",
    width: 520,
    fields: [
      { type: "list", key: "source", label: "Master List:", options: [], height: 120 },
    ],
  },
  insertChart: {
    id: "insertChart",
    title: "Insert Chart",
    width: 420,
    fields: [{ type: "list", key: "type", label: "All Charts", options: ["Clustered Column", "Stacked Column", "Line", "Pie", "Clustered Bar", "Area", "Doughnut"], height: 150 }],
  },
  insertTable: {
    id: "insertTable",
    title: "Insert Table",
    width: 320,
    fields: [
      { type: "number", key: "cols", label: "Number of columns:", default: 5, min: 1, max: 20 },
      { type: "number", key: "rows", label: "Number of rows:", default: 2, min: 1, max: 50 },
      { type: "radio", key: "autofit", label: "AutoFit behavior", options: ["Fixed column width", "AutoFit to contents", "AutoFit to window"], default: "Fixed column width" },
    ],
  },
  altText: {
    id: "altText",
    title: "Alt Text",
    width: 380,
    fields: [
      { type: "note", text: "How would you describe this object and its context to someone who is blind or has low vision?" },
      { type: "text", key: "text", label: "Description:" },
      { type: "checkbox", key: "decorative", label: "Mark as decorative" },
    ],
  },
  pageBorders: {
    id: "pageBorders",
    title: "Borders and Shading",
    width: 420,
    tabs: [
      {
        label: "Page Border",
        fields: [
          { type: "radio", key: "setting", label: "Setting:", options: ["None", "Box", "Shadow", "3-D", "Custom"], default: "None" },
          { type: "select", key: "style", label: "Style:", options: ["Single", "Double", "Dotted", "Dashed", "Thick-Thin"] },
          { type: "color", key: "color", label: "Color:", options: colors.slice(0, 11) },
          { type: "select", key: "width", label: "Width:", options: ["½ pt", "1 pt", "1 ½ pt", "3 pt"] },
          { type: "select", key: "applyTo", label: "Apply to:", options: ["Whole document", "This section"] },
        ],
      },
    ],
  },
  watermark: {
    id: "watermark",
    title: "Printed Watermark",
    fields: [
      { type: "radio", key: "kind", label: "", options: ["No watermark", "Picture watermark", "Text watermark"], default: "Text watermark" },
      { type: "text", key: "text", label: "Text:", default: "CONFIDENTIAL" },
      { type: "select", key: "layout", label: "Layout:", options: ["Diagonal", "Horizontal"] },
    ],
  },
  zoom: {
    id: "zoom",
    title: "Zoom",
    width: 300,
    fields: [
      { type: "radio", key: "preset", label: "Zoom to", options: ["200%", "100%", "75%", "Page width", "Whole page"], default: "100%" },
      { type: "number", key: "percent", label: "Percent:", default: 100, min: 10, max: 500, step: 10 },
    ],
  },
  dateTime: {
    id: "dateTime",
    title: "Date and Time",
    width: 340,
    fields: [
      { type: "list", key: "format", label: "Available formats:", options: ["10/20/2026", "Tuesday, October 20, 2026", "October 20, 2026", "10/20/26", "2026-10-20", "20 October 2026", "10:03 AM"], height: 140 },
      { type: "checkbox", key: "update", label: "Update automatically" },
    ],
  },
  symbol: {
    id: "symbol",
    title: "Symbol",
    fields: [{ type: "list", key: "symbol", label: "Symbols", options: ["©", "®", "™", "°", "±", "÷", "×", "€", "£", "¥", "§", "¶", "✓", "→", "♥"], height: 120 }],
  },
  sort: {
    id: "sort",
    title: "Sort Text",
    width: 380,
    fields: [
      { type: "select", key: "by", label: "Sort by:", options: ["Paragraphs"] },
      { type: "select", key: "type", label: "Type:", options: ["Text", "Number", "Date"] },
      { type: "radio", key: "order", label: "", options: ["Ascending", "Descending"], default: "Ascending" },
    ],
  },
  selectRecipients: {
    id: "selectRecipients",
    title: "Select Data Source",
    okLabel: "Open",
    width: 440,
    fields: [
      { type: "note", text: "This PC › Documents › Lakeside Medical" },
      { type: "list", key: "file", label: "File name:", options: ["Patient Reminder List.xlsx", "Provider Directory.xlsx", "Flu Clinic Signups.xlsx"], height: 110 },
    ],
  },
  stylesPane: {
    id: "stylesPane",
    title: "Styles",
    okLabel: "Apply",
    width: 280,
    // The pane also lists the document's custom styles (wordDialogDef). OK commits home.style / home.customStyle.
    fields: [{ type: "list", key: "style", label: "Styles", options: [...PARA_STYLE_NAMES, ...CHAR_STYLE_NAMES], height: 200 }],
  },
  bookmark: {
    id: "bookmark",
    title: "Bookmark",
    okLabel: "Add",
    width: 360,
    fields: [
      { type: "text", key: "name", label: "Bookmark name:", placeholder: "No spaces, for example RecordsPolicy" },
      { type: "note", text: "The bookmark marks what is selected (or the paragraph with the insertion point)." },
    ],
  },
  crossRef: {
    id: "crossRef",
    title: "Cross-reference",
    okLabel: "Insert",
    width: 440,
    fields: [
      { type: "select", key: "refType", label: "Reference type:", options: ["Heading", "Bookmark"] },
      { type: "select", key: "refTo", label: "Insert reference to:", options: ["Heading text", "Page number", "Bookmark text", "Above/below"] },
      { type: "checkbox", key: "hyperlink", label: "Insert as hyperlink", default: true },
      // Lists the document's headings and bookmarks (wordDialogDef); any value is accepted here.
      { type: "list", key: "item", label: "For which heading or bookmark:", options: [], height: 130 },
    ],
  },
  customToc: {
    id: "customToc",
    title: "Table of Contents",
    width: 400,
    fields: [
      { type: "checkbox", key: "pageNumbers", label: "Show page numbers", default: true },
      { type: "checkbox", key: "rightAlign", label: "Right align page numbers", default: true },
      { type: "select", key: "leader", label: "Tab leader:", options: [".......", "-------", "_______", "(none)"], default: "......." },
      { type: "select", key: "format", label: "Formats:", options: ["From template", "Classic", "Distinctive", "Fancy", "Modern", "Formal", "Simple"] },
      { type: "number", key: "levels", label: "Show levels:", default: 3, min: 1, max: 9 },
    ],
  },
  editRecipients: {
    id: "editRecipients",
    title: "Mail Merge Recipients",
    width: 480,
    tabs: [
      {
        label: "Recipients",
        fields: [
          { type: "note", text: "This is the list of recipients that will be used in your merge. Use the checkboxes to add or remove recipients from the merge." },
          // One checkbox per recipient, r1 = the first record (wordDialogDef labels them from the data source).
          ...Array.from({ length: 12 }, (_, i) => ({ type: "checkbox" as const, key: `r${i + 1}`, label: `Recipient ${i + 1}`, default: true })),
        ],
      },
      {
        label: "Filter Records",
        fields: [
          { type: "note", text: "Show only the recipients that match. Choose (none) to clear the filter." },
          { type: "select", key: "filterField", label: "Field:", options: ["(none)", ...MERGE_FIELDS] },
          { type: "select", key: "filterOp", label: "Comparison:", options: FILTER_OPS },
          { type: "text", key: "filterValue", label: "Compare to:" },
        ],
      },
      {
        label: "Sort Records",
        fields: [
          { type: "select", key: "sortBy", label: "Sort by:", options: ["(none)", ...MERGE_FIELDS] },
          { type: "radio", key: "sortOrder", label: "", options: ["Ascending", "Descending"], default: "Ascending" },
        ],
      },
    ],
  },
  autoText: {
    id: "autoText",
    title: "AutoText",
    okLabel: "Insert",
    width: 380,
    fields: [
      // The entries saved in the document (doc.autoText), listed by wordDialogDef.
      { type: "list", key: "entry", label: "AutoText entries:", options: [], height: 140 },
    ],
  },
  saveAutoText: {
    id: "saveAutoText",
    title: "Create New Building Block",
    width: 400,
    fields: [
      { type: "text", key: "name", label: "Name:" },
      { type: "select", key: "gallery", label: "Gallery:", options: ["AutoText", "Quick Parts"] },
      { type: "select", key: "category", label: "Category:", options: ["General"] },
      { type: "text", key: "description", label: "Description:" },
      { type: "select", key: "saveIn", label: "Save in:", options: ["Normal", "Building Blocks"] },
      { type: "select", key: "options", label: "Options:", options: ["Insert content only", "Insert content in its own paragraph", "Insert content in its own page"] },
    ],
  },
  controlProperties: {
    id: "controlProperties",
    title: "Content Control Properties",
    width: 420,
    fields: [
      { type: "text", key: "title", label: "Title:" },
      { type: "text", key: "tag", label: "Tag:" },
      { type: "text", key: "items", label: "Drop-down list items:", placeholder: "Medicare, Medicaid, Self-Pay" },
      { type: "note", text: "Separate drop-down list items with commas. (In Word: Drop-Down List Properties › Add…)" },
      { type: "checkbox", key: "lockDelete", label: "Content control cannot be deleted" },
      { type: "checkbox", key: "lockEdit", label: "Contents cannot be edited" },
    ],
  },
  pageSetup: {
    id: "pageSetup",
    title: "Page Setup",
    tabs: [
      {
        label: "Margins",
        fields: [
          { type: "number", key: "top", label: "Top:", default: 1, step: 0.25, suffix: '"' },
          { type: "number", key: "bottom", label: "Bottom:", default: 1, step: 0.25, suffix: '"' },
          { type: "number", key: "left", label: "Left:", default: 1, step: 0.25, suffix: '"' },
          { type: "number", key: "right", label: "Right:", default: 1, step: 0.25, suffix: '"' },
          { type: "number", key: "gutter", label: "Gutter:", default: 0, step: 0.25, min: 0, suffix: '"' },
          { type: "radio", key: "orientation", label: "Orientation", options: ["Portrait", "Landscape"], default: "Portrait" },
          { type: "select", key: "applyTo", label: "Apply to:", options: ["Whole document", "This section", "This point forward"] },
        ],
      },
      { label: "Paper", fields: [{ type: "select", key: "size", label: "Paper size:", options: ["Letter", "Legal", "Executive", "A4", "A5"] }] },
      { label: "Layout", fields: [{ type: "select", key: "vAlign", label: "Vertical alignment:", options: ["Top", "Center", "Justified", "Bottom"] }] },
    ],
  },
  customMargins: {
    id: "customMargins",
    title: "Page Setup",
    fields: [
      { type: "number", key: "top", label: "Top:", default: 1, step: 0.25, suffix: '"' },
      { type: "number", key: "bottom", label: "Bottom:", default: 1, step: 0.25, suffix: '"' },
      { type: "number", key: "left", label: "Left:", default: 1, step: 0.25, suffix: '"' },
      { type: "number", key: "right", label: "Right:", default: 1, step: 0.25, suffix: '"' },
      { type: "number", key: "gutter", label: "Gutter:", default: 0, step: 0.25, min: 0, suffix: '"' },
    ],
  },
  properties: {
    id: "properties",
    title: "Properties",
    fields: [
      { type: "text", key: "title", label: "Title:" },
      { type: "text", key: "tags", label: "Tags:" },
      { type: "text", key: "author", label: "Author:", default: "BEOC Student" },
    ],
  },
  encrypt: {
    id: "encrypt",
    title: "Encrypt Document",
    fields: [
      { type: "note", text: "Encrypt the contents of this file. Caution: if you lose or forget the password, it cannot be recovered." },
      { type: "text", key: "password", label: "Password:", password: true },
    ],
  },
};

const withOptions = (def: DialogDef, key: string, patch: (f: DialogField) => DialogField): DialogDef => {
  const map = (fs: DialogField[]) => fs.map((f) => ("key" in f && f.key === key ? patch(f) : f));
  return { ...def, fields: def.fields ? map(def.fields) : undefined, tabs: def.tabs?.map((t) => ({ ...t, fields: map(t.fields) })) };
};

/**
 * Dialogs whose choices come from the document: the Styles pane and Modify
 * Style list custom styles, Mail Merge Recipients lists the data source,
 * Cross-reference lists headings and bookmarks, AutoText lists saved entries,
 * Columns › Apply to depends on the selection, and the Font dialog gets a blank
 * Font / Size choice when the selection mixes them.
 */
export function wordDialogDef(doc: WordDoc, ui: SimUi, id: string): DialogDef | undefined {
  const base = wordDialogs[id];
  if (!base) return undefined;
  const d = doc as XDoc;
  switch (id) {
    case "font": {
      const fi = selectionFontInfo(doc, ui);
      let def = base;
      if (fi.font === undefined) def = withOptions(def, "font", (f) => ({ ...f, options: ["", ...FONTS] }) as DialogField);
      if (fi.size === undefined) def = withOptions(def, "size", (f) => ({ ...f, options: ["", ...SIZE_OPTS] }) as DialogField);
      return def;
    }
    case "stylesPane":
      return withOptions(base, "style", (f) => ({ ...f, options: [...PARA_STYLE_NAMES, ...CHAR_STYLE_NAMES, ...customStyleNames(doc)] }) as DialogField);
    case "modifyStyle":
      return withOptions(base, "style", (f) => ({ ...f, options: [...PARA_STYLE_NAMES, ...customStyleNames(doc)] }) as DialogField);
    case "columns":
      return withOptions(base, "applyTo", (f) => ({ ...f, options: columnsApplyTo(doc, ui) }) as DialogField);
    case "crossRef": {
      const items = [...headingsOf(doc).map((h) => h.text), ...(d.bookmarks ?? []).map((b) => b.name)];
      return withOptions(base, "item", (f) => ({ ...f, options: items.length ? Array.from(new Set(items)) : ["(no headings or bookmarks)"] }) as DialogField);
    }
    case "manageSources": {
      const master = d.masterSources ?? [];
      const current = d.sources ?? [];
      const label = (s: { author: string; title: string; year: string }) => `${s.author}; ${s.title} (${s.year})`;
      return {
        ...base,
        fields: [
          master.length
            ? { type: "list", key: "source", label: "Master List:", options: master.map(label), height: 120 }
            : { type: "note", text: "Master List: (empty) Sources you create in other documents are saved here." },
          { type: "note", text: current.length ? `Current List: ${current.map(label).join(" | ")}` : "Current List: no sources in this document yet." },
          { type: "note", text: "Select a source in the Master List, then Copy → to add it to this document. It then appears under Insert Citation." },
        ],
      };
    }
    case "bookmark": {
      const names = (d.bookmarks ?? []).map((b) => b.name);
      return { ...base, fields: [...(base.fields ?? []), { type: "note", text: names.length ? `Bookmarks in this document: ${names.join(", ")}` : "This document has no bookmarks yet." }] };
    }
    case "autoText": {
      const names = (d.autoText ?? []).map((e) => e.name);
      return names.length
        ? withOptions(base, "entry", (f) => ({ ...f, options: names }) as DialogField)
        : { ...base, fields: [{ type: "note", text: "No AutoText entries yet. Select text, then Quick Parts › Save Selection to AutoText Gallery." }] };
    }
    case "selectRecipients": {
      // The sim document can name the files to offer (merge.files); a source it already uses is always listed.
      const m = doc.merge as XMerge | undefined;
      const stock = (base.fields!.find((f) => "key" in f && f.key === "file") as { options: string[] }).options;
      const files = m?.files?.length ? m.files : m?.source && !stock.includes(m.source) ? [m.source, ...stock] : undefined;
      return files ? withOptions(base, "file", (f) => ({ ...f, options: files }) as DialogField) : base;
    }
    case "editRecipients": {
      const recs = recipientsOf(doc);
      const fields = mergeFieldNames(doc);
      const tabs = base.tabs!.map((t) => {
        if (t.label === "Recipients") {
          return {
            ...t,
            fields: recs.length
              ? [t.fields[0], ...recs.map((r, i): DialogField => ({ type: "checkbox", key: `r${i + 1}`, label: recipientLabel(r), default: true }))]
              : [{ type: "note", text: "There is no recipient list yet. Use Mailings › Select Recipients first." } as DialogField],
          };
        }
        const fieldOpts = ["(none)", ...(fields.length ? fields : MERGE_FIELDS)];
        return { ...t, fields: t.fields.map((f) => ("key" in f && (f.key === "filterField" || f.key === "sortBy") ? ({ ...f, options: fieldOpts } as DialogField) : f)) };
      });
      return { ...base, tabs };
    }
  }
  return base;
}
