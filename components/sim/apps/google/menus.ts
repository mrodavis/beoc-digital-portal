/**
 * Menus, toolbars and option lists for the Google editors and Drive.
 *
 * The canvas draws these in Google's style. `catalogRibbon()` turns the same
 * data into RibbonTab[] for `googleCore.ribbon`: the player never draws it
 * (chrome is "bare"), but the validator reads it to know which commands,
 * values and dialogs a learner can reach.
 *
 * An item does one of:
 *   command (+ value)  commit a command
 *   dialog             open one of the canvas's dialogs (dialogs.ts)
 *   action             canvas-only UI (rename box, link popup, comment box, table picker, …)
 *   sub                open a submenu
 * Values written "$open" are replaced with the open file's id at click time.
 */
import type { RibbonControl, RibbonOption, RibbonTab } from "@/types/sim";
import { googleDialogs } from "./dialogs";

export type GItem = {
  label: string;
  icon?: string;
  shortcut?: string;
  command?: string;
  value?: string;
  dialog?: string;
  action?: string;
  sub?: GEntry[];
  /** ribbon-state key; a check mark shows when it is true. */
  check?: string;
  disabled?: boolean;
  /** Color swatch shown instead of an icon. */
  swatch?: string;
};
export type GEntry = GItem | { sep: true } | { head: string };

export const SEP: GEntry = { sep: true };
const c = (label: string, command: string, value?: string, extra: Partial<GItem> = {}): GItem => ({ label, command, value, ...extra });
const d = (label: string, dialog: string, extra: Partial<GItem> = {}): GItem => ({ label, dialog, ...extra });
const a = (label: string, action: string, extra: Partial<GItem> = {}): GItem => ({ label, action, ...extra });
const s = (label: string, sub: GEntry[], extra: Partial<GItem> = {}): GItem => ({ label, sub, ...extra });

export const isItem = (e: GEntry): e is GItem => "label" in e;

/* ------------------------------------------------------------------ */
/* Option lists                                                        */
/* ------------------------------------------------------------------ */

export const DOC_STYLES = ["Normal text", "Title", "Subtitle", "Heading 1", "Heading 2", "Heading 3", "Heading 4", "Heading 5", "Heading 6"];
export const FONTS = ["Arial", "Calibri", "Cambria", "Caveat", "Comfortaa", "Comic Sans MS", "Courier New", "EB Garamond", "Georgia", "Impact", "Lexend", "Lobster", "Lora", "Merriweather", "Montserrat", "Nunito", "Oswald", "Pacifico", "Playfair Display", "Roboto", "Roboto Mono", "Spectral", "Times New Roman", "Trebuchet MS", "Verdana"];
export const SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];
export const ZOOMS = ["Fit", "50%", "75%", "90%", "100%", "125%", "150%", "200%"];
export const LINE_SPACINGS = ["Single", "1.15", "1.5", "Double"];
export const BULLET_PRESETS = ["●", "❖", "➔", "✔", "★", "-"];
export const NUMBER_PRESETS = ["1. a. i.", "1) a) i)", "1. 1.1. 1.1.1.", "A. a. i.", "I. A. 1.", "A. B. C."];
export const DOWNLOAD_DOCS = ["Microsoft Word (.docx)", "OpenDocument Format (.odt)", "Rich Text Format (.rtf)", "PDF Document (.pdf)", "Plain Text (.txt)", "Web Page (.html, zipped)", "EPUB Publication (.epub)"];
export const DOWNLOAD_SHEETS = ["Microsoft Excel (.xlsx)", "OpenDocument (.ods)", "PDF (.pdf)", "Web page (.html)", "Comma Separated Values (.csv)", "Tab Separated Values (.tsv)"];
export const DOWNLOAD_SLIDES = ["Microsoft PowerPoint (.pptx)", "ODP Document (.odp)", "PDF Document (.pdf)", "Plain Text (.txt)", "JPEG image (.jpg, current slide)", "PNG image (.png, current slide)"];
export const PAGE_NUMBERS = ["Top right, all pages", "Bottom right, all pages", "Top right, skip first page", "Bottom right, skip first page"];
export const TOC_STYLES = ["Plain text", "Dotted", "With blue links"];
/** Building blocks offered in Insert › Building blocks and the @ menu. */
export const BUILDING_BLOCKS = ["Meeting notes", "Email draft"];
export const SPECIAL_CHARS = ["©", "®", "™", "°", "±", "×", "÷", "≤", "≥", "≠", "½", "¼", "¾", "→", "←", "↑", "↓", "•", "–", "—", "§", "¶", "€", "£", "¥", "¢", "✓", "✗", "★", "☎", "✉", "♥", "µ", "Ω", "α", "β"];

/** Google's color grid: names for tooltips, hex values for commands. */
const BASE_NAMES = ["red berry", "red", "orange", "yellow", "green", "cyan", "cornflower blue", "blue", "purple", "magenta"];
export const PALETTE_ROWS: { name: string; hex: string }[][] = [
  ["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff"].map((hex, i) => ({ hex, name: ["black", "dark gray 4", "dark gray 3", "dark gray 2", "dark gray 1", "gray", "light gray 1", "light gray 2", "light gray 3", "white"][i] })),
  ["#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"].map((hex, i) => ({ hex, name: BASE_NAMES[i] })),
  ...[
    ["light", 3, ["#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc"]],
    ["light", 2, ["#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd"]],
    ["light", 1, ["#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0"]],
    ["dark", 1, ["#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79"]],
    ["dark", 2, ["#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47"]],
    ["dark", 3, ["#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"]],
  ].map(([kind, n, hexes]) => (hexes as string[]).map((hex, i) => ({ hex, name: `${kind} ${BASE_NAMES[i]} ${n}` }))),
];
export const PALETTE = PALETTE_ROWS.flat();
export const colorName = (hex?: string) => PALETTE.find((p) => p.hex.toLowerCase() === (hex ?? "").toLowerCase())?.name;

/* ---------- Sheets ---------- */

export const NUMBER_FORMATS = ["Automatic", "Plain text", "Number", "Percent", "Scientific", "Accounting", "Financial", "Currency", "Currency rounded", "Date", "Time", "Date time", "Duration"];
export const BORDERS = ["All borders", "Inner borders", "Horizontal borders", "Vertical borders", "Outer borders", "Left border", "Top border", "Right border", "Bottom border", "Clear borders"];
export const MERGES = ["Merge all", "Merge horizontally", "Merge vertically", "Unmerge"];
export const WRAPS = ["Overflow", "Wrap", "Clip"];
export const FUNCTIONS = ["SUM", "AVERAGE", "COUNT", "MAX", "MIN", "IF", "COUNTIF", "SUMIF", "VLOOKUP", "TODAY"];
export const FREEZE_ROWS = ["No rows", "1 row", "2 rows"];
export const FREEZE_COLS = ["No columns", "1 column", "2 columns"];
export const SHEET_ZOOMS = ["50%", "75%", "90%", "100%", "125%", "150%", "200%"];
export const CHART_TYPES = ["Column chart", "Stacked column chart", "Bar chart", "Line chart", "Area chart", "Pie chart", "Doughnut chart", "Scatter chart", "Table chart"];
export const CF_CONDITIONS = [
  "Is empty", "Is not empty", "Text contains", "Text does not contain", "Text starts with", "Text ends with", "Text is exactly",
  "Greater than", "Greater than or equal to", "Less than", "Less than or equal to", "Is equal to", "Is not equal to", "Is between", "Is not between", "Custom formula is",
];
export const CF_STYLES: Record<string, { fill?: string; color?: string; bold?: boolean }> = {
  Default: { fill: "#b7e1cd", color: "#000000" },
  "Green fill": { fill: "#b7e1cd", color: "#0d652d" },
  "Red fill": { fill: "#f4c7c3", color: "#a50e0e" },
  "Yellow fill": { fill: "#fce8b2", color: "#7c4a03" },
  "Blue fill": { fill: "#c6dafc", color: "#174ea6" },
  "Red text": { color: "#cc0000" },
  "Bold red text": { color: "#cc0000", bold: true },
};
export const VALIDATION_CRITERIA = ["Dropdown", "Dropdown (from a range)", "Text contains", "Is valid email", "Is valid URL", "Number between", "Number greater than", "Is valid date", "Checkbox"];

/* ---------- Slides ---------- */

/** Google Slides layouts, and the PowerPoint layout each one is drawn with. */
export const SLIDE_LAYOUTS: Record<string, string> = {
  "Title slide": "Title Slide",
  "Section header": "Section Header",
  "Title and body": "Title and Content",
  "Title and two columns": "Two Content",
  "Title only": "Title Only",
  "One column text": "Content with Caption",
  "Main point": "Title Only",
  "Section title and description": "Content with Caption",
  Caption: "Picture with Caption",
  "Big number": "Title Only",
  Blank: "Blank",
};
export const LAYOUT_NAMES = Object.keys(SLIDE_LAYOUTS);
/** Google name for a layout stored with its PowerPoint name. */
export function googleLayout(name: string | undefined): string {
  if (!name) return "Title and body";
  if (SLIDE_LAYOUTS[name]) return name;
  return Object.entries(SLIDE_LAYOUTS).find(([, p]) => p === name)?.[0] ?? name;
}
export function pptLayout(name: string | undefined): string {
  if (!name) return "Title and Content";
  return SLIDE_LAYOUTS[name] ?? name;
}

export interface GTheme {
  bg: string;
  title: string;
  body: string;
  font: string;
  titleFont: string;
  accent: string;
  /** PowerPoint theme drawn underneath (for its decorative band). */
  base: string;
  dark?: boolean;
}
export const SLIDE_THEMES: Record<string, GTheme> = {
  "Simple Light": { bg: "#ffffff", title: "#000000", body: "#595959", font: "Arial", titleFont: "Arial", accent: "#4285f4", base: "Office Theme" },
  "Simple Dark": { bg: "#212121", title: "#ffffff", body: "#e0e0e0", font: "Arial", titleFont: "Arial", accent: "#8ab4f8", base: "Office Theme", dark: true },
  Streamline: { bg: "#ffffff", title: "#1c4587", body: "#434343", font: "Lato", titleFont: "Montserrat", accent: "#3c78d8", base: "Slice" },
  Focus: { bg: "#ffffff", title: "#263238", body: "#455a64", font: "Open Sans", titleFont: "Open Sans", accent: "#ff6d00", base: "Office Theme" },
  Shift: { bg: "#f3f3f3", title: "#3d3d3d", body: "#595959", font: "Raleway", titleFont: "Raleway", accent: "#e91e63", base: "Integral" },
  Momentum: { bg: "#ffffff", title: "#0b5394", body: "#3d3d3d", font: "Montserrat", titleFont: "Montserrat", accent: "#e69138", base: "Retrospect" },
  Paradigm: { bg: "#ffffff", title: "#38761d", body: "#434343", font: "Source Sans Pro", titleFont: "Source Sans Pro", accent: "#6aa84f", base: "Facet" },
  Material: { bg: "#ffffff", title: "#3f51b5", body: "#424242", font: "Roboto", titleFont: "Roboto", accent: "#3f51b5", base: "Madison" },
  Swiss: { bg: "#ffffff", title: "#cc0000", body: "#000000", font: "Arial", titleFont: "Arial", accent: "#cc0000", base: "Office Theme" },
  "Beach Day": { bg: "#fdf6e3", title: "#5f6c7b", body: "#5f6c7b", font: "Proxima Nova", titleFont: "Playfair Display", accent: "#f6b26b", base: "Wisp" },
  Slate: { bg: "#37474f", title: "#ffffff", body: "#cfd8dc", font: "Roboto", titleFont: "Roboto", accent: "#4dd0e1", base: "Office Theme", dark: true },
  Coral: { bg: "#ffffff", title: "#e06666", body: "#434343", font: "Lato", titleFont: "Lato", accent: "#e06666", base: "Madison" },
  Spearmint: { bg: "#e0f2f1", title: "#00695c", body: "#37474f", font: "Montserrat", titleFont: "Montserrat", accent: "#26a69a", base: "Office Theme" },
  Plum: { bg: "#4a148c", title: "#ffffff", body: "#e1bee7", font: "Open Sans", titleFont: "Open Sans", accent: "#ce93d8", base: "Office Theme", dark: true },
};
export const THEME_NAMES = Object.keys(SLIDE_THEMES);
export const gTheme = (name?: string) => SLIDE_THEMES[name ?? ""] ?? SLIDE_THEMES["Simple Light"];

export const TRANSITIONS = ["None", "Dissolve", "Fade", "Slide from right", "Slide from left", "Flip", "Cube", "Gallery"];
export const ANIMATIONS = ["Appear", "Fade in", "Fly in from left", "Fly in from right", "Fly in from bottom", "Zoom in", "Spin", "Disappear", "Fade out"];
export const ANIMATION_STARTS = ["On click", "After previous", "With previous"];
export const SHAPES = ["Rectangle", "Rounded rectangle", "Oval", "Triangle", "Diamond", "Pentagon", "Hexagon", "Star", "Right arrow", "Left arrow", "Up arrow", "Down arrow", "Rectangular callout", "Oval callout"];
export const SLIDE_CHARTS = ["Bar", "Column", "Line", "Pie"];

/* ------------------------------------------------------------------ */
/* Shared menu parts                                                   */
/* ------------------------------------------------------------------ */

const NEW_SUB: GEntry[] = [
  c("Document", "g.new", "Google Docs", { icon: "doc" }),
  c("Spreadsheet", "g.new", "Google Sheets", { icon: "sheet" }),
  c("Presentation", "g.new", "Google Slides", { icon: "slides" }),
  c("Form", "g.new", "Google Forms", { icon: "form" }),
];

/** File menu item shown only while an Office file (.docx, .xlsx, .pptx) is open in Office editing. */
export const SAVE_AS_GOOGLE: Record<"docs" | "sheets" | "slides", GItem> = {
  docs: c("Save as Google Docs", "g.saveAsGoogle", undefined, { icon: "doc" }),
  sheets: c("Save as Google Sheets", "g.saveAsGoogle", undefined, { icon: "sheet" }),
  slides: c("Save as Google Slides", "g.saveAsGoogle", undefined, { icon: "slides" }),
};

function fileMenu(kind: "docs" | "sheets" | "slides"): GEntry[] {
  const downloads = kind === "docs" ? DOWNLOAD_DOCS : kind === "sheets" ? DOWNLOAD_SHEETS : DOWNLOAD_SLIDES;
  return [
    s("New", kind === "docs" ? [...NEW_SUB, SEP, a("From a template", "templates", { icon: "template" })] : NEW_SUB, { icon: "newFile" }),
    a("Open", "open", { icon: "folderOpen", shortcut: "Ctrl+O" }),
    d("Make a copy", "g.makeCopy", { icon: "copy" }),
    SEP,
    s("Share", [a("Share with others", "share", { icon: "personAdd" }), c("Publish to web", "g.publish", undefined, { icon: "public" })], { icon: "personAdd" }),
    s("Email", [d("Email this file", "g.email", { icon: "mail" }), d("Email collaborators", "g.emailCollaborators", { icon: "mail" })], { icon: "mail" }),
    s("Download", downloads.map((f) => c(f, "g.download", f)), { icon: "download" }),
    SEP,
    a("Rename", "rename", { icon: "edit" }),
    d("Move", "g.move", { icon: "move" }),
    d("Add shortcut to Drive", "g.shortcut", { icon: "shortcut" }),
    c("Move to trash", "g.trash", "$open", { icon: "trash" }),
    SEP,
    s(
      "Version history",
      [d("Name current version", "g.nameVersion"), c("See version history", "g.versions", undefined, { shortcut: "Ctrl+Alt+Shift+H" })],
      { icon: "history" },
    ),
    c("Make available offline", "g.offline", undefined, { icon: "offline", check: "offline" }),
    SEP,
    c("Details", "g.pane", "Details", { icon: "info" }),
    ...(kind === "sheets" ? [] : [d("Page setup", kind === "slides" ? "g.slideSize" : "g.pageSetup", { icon: "pageSetup" })]),
    d("Print", "g.print", { icon: "print", shortcut: "Ctrl+P" }),
  ];
}

const EDIT_BASE: GEntry[] = [
  c("Undo", "qat.undo", undefined, { icon: "undo", shortcut: "Ctrl+Z" }),
  c("Redo", "qat.redo", undefined, { icon: "redo", shortcut: "Ctrl+Y" }),
  SEP,
  c("Cut", "home.cut", undefined, { icon: "cut", shortcut: "Ctrl+X" }),
  c("Copy", "home.copy", undefined, { icon: "copy", shortcut: "Ctrl+C" }),
  c("Paste", "home.paste", undefined, { icon: "paste", shortcut: "Ctrl+V" }),
];

const TEXT_SUB = (withCase = true): GEntry[] => [
  c("Bold", "home.bold", undefined, { icon: "bold", shortcut: "Ctrl+B" }),
  c("Italic", "home.italic", undefined, { icon: "italic", shortcut: "Ctrl+I" }),
  c("Underline", "home.underline", undefined, { icon: "underline", shortcut: "Ctrl+U" }),
  c("Strikethrough", "home.strike", undefined, { icon: "strike", shortcut: "Alt+Shift+5" }),
  c("Superscript", "home.superscript", undefined, { icon: "superscript", shortcut: "Ctrl+." }),
  c("Subscript", "home.subscript", undefined, { icon: "subscript", shortcut: "Ctrl+," }),
  SEP,
  s("Size", [c("Increase font size", "home.growFont", undefined, { shortcut: "Ctrl+Shift+." }), c("Decrease font size", "home.shrinkFont", undefined, { shortcut: "Ctrl+Shift+," })], { icon: "textSize" }),
  ...(withCase ? [s("Capitalization", [c("lowercase", "home.changeCase", "lowercase"), c("UPPERCASE", "home.changeCase", "UPPERCASE"), c("Title Case", "home.changeCase", "Title Case")], { icon: "case" })] : []),
];

const ALIGN_SUB: GEntry[] = [
  c("Left align", "home.alignLeft", undefined, { icon: "alignLeft", shortcut: "Ctrl+Shift+L" }),
  c("Center align", "home.alignCenter", undefined, { icon: "alignCenter", shortcut: "Ctrl+Shift+E" }),
  c("Right align", "home.alignRight", undefined, { icon: "alignRight", shortcut: "Ctrl+Shift+R" }),
  c("Justified", "home.justify", undefined, { icon: "alignJustify", shortcut: "Ctrl+Shift+J" }),
  SEP,
  c("Increase indent", "home.indentInc", undefined, { icon: "indentInc", shortcut: "Ctrl+]" }),
  c("Decrease indent", "home.indentDec", undefined, { icon: "indentDec", shortcut: "Ctrl+[" }),
];

const SPACING_SUB: GEntry[] = [
  ...LINE_SPACINGS.map((v) => c(v, "home.lineSpacing", v, { check: `ls:${v}` })),
  SEP,
  c("Add space before paragraph", "home.lineSpacing", "Add space before paragraph"),
  c("Add space after paragraph", "home.lineSpacing", "Add space after paragraph"),
  c("Remove space after paragraph", "home.lineSpacing", "Remove space after paragraph"),
  SEP,
  d("Custom spacing", "g.spacing"),
];

const BULLETS_SUB: GEntry[] = [
  s("Bulleted list", BULLET_PRESETS.map((b) => c(`${b}  ${b === "●" ? "○  ■" : b === "❖" ? "➢  ■" : b === "➔" ? "◆  ●" : b === "✔" ? "●  ●" : b === "★" ? "○  ■" : "-  -"}`, "home.bullets", b)), { icon: "bullets" }),
  s("Numbered list", NUMBER_PRESETS.map((n) => c(n, "home.numbering", n)), { icon: "numbered" }),
  c("Checklist", "g.checklist", undefined, { icon: "checklist", shortcut: "Ctrl+Shift+9" }),
  SEP,
  s("List options", [c("Restart numbering", "list.restart"), c("Continue previous list", "list.continue")]),
];

const HELP_MENU: GEntry[] = [
  c("Help", "g.help", "Help", { icon: "help" }),
  c("Training", "g.help", "Training"),
  c("Updates", "g.help", "Updates"),
  SEP,
  c("Help improve Google", "g.help", "Feedback"),
  SEP,
  c("Privacy Policy", "g.help", "Privacy Policy"),
  c("Terms of Service", "g.help", "Terms of Service"),
  SEP,
  c("Keyboard shortcuts", "g.pane", "Keyboard shortcuts", { icon: "keyboard", shortcut: "Ctrl+/" }),
];

const EXTENSIONS_MENU: GEntry[] = [
  s("Add-ons", [c("Get add-ons", "g.help", "Add-ons"), c("Manage add-ons", "g.help", "Manage add-ons")], { icon: "addon" }),
  c("Apps Script", "g.help", "Apps Script", { icon: "code" }),
];

/* ------------------------------------------------------------------ */
/* Docs                                                                */
/* ------------------------------------------------------------------ */

export const DOCS_MENUS: Record<string, GEntry[]> = {
  File: fileMenu("docs"),
  Edit: [
    ...EDIT_BASE,
    c("Paste without formatting", "home.paste", "Keep Text Only", { icon: "paste", shortcut: "Ctrl+Shift+V" }),
    SEP,
    a("Select all", "selectAll", { icon: "selectAll", shortcut: "Ctrl+A" }),
    c("Delete", "edit.delete", undefined, { icon: "trash" }),
    SEP,
    d("Find and replace", "replace", { icon: "findReplace", shortcut: "Ctrl+H" }),
  ],
  View: [
    s("Mode", [c("Editing", "g.mode", "Editing", { icon: "edit", check: "mode:Editing" }), c("Suggesting", "g.mode", "Suggesting", { icon: "suggest", check: "mode:Suggesting" }), c("Viewing", "g.mode", "Viewing", { icon: "eye", check: "mode:Viewing" })], { icon: "edit" }),
    SEP,
    c("Show print layout", "g.view", "printLayout", { check: "view:printLayout" }),
    c("Show ruler", "g.view", "ruler", { check: "view:ruler" }),
    c("Show tabs & outlines", "g.view", "outline", { check: "view:outline", shortcut: "Ctrl+Alt+A Ctrl+Alt+H" }),
    c("Show non-printing characters", "g.view", "nonPrinting", { check: "view:nonPrinting", shortcut: "Ctrl+Shift+P" }),
    SEP,
    c("Full screen", "g.view", "fullScreen", { icon: "fullscreen" }),
  ],
  Insert: [
    s(
      "Image",
      ["Upload from computer", "Search the web", "Drive", "Photos", "By URL", "Camera"].map((src) => a(src, `image:${src}`, { icon: src === "Upload from computer" ? "upload" : src === "Search the web" ? "search" : src === "Drive" ? "drive" : "image" })),
      { icon: "image" },
    ),
    a("Table", "table", { icon: "table" }),
    s("Building blocks", BUILDING_BLOCKS.map((b) => c(b, "g.block", b)), { icon: "blocks" }),
    s("Smart chips", [a("People", "chip:person", { icon: "person" }), a("Files", "chip:file", { icon: "doc" }), a("Date", "chip:date", { icon: "calendar" })], { icon: "chip" }),
    a("Link", "link", { icon: "link", shortcut: "Ctrl+K" }),
    s("Chart", [c("Bar", "insert.chart", "Bar"), c("Column", "insert.chart", "Column"), c("Line", "insert.chart", "Line"), c("Pie", "insert.chart", "Pie")], { icon: "chart" }),
    a("Special characters", "special", { icon: "omega" }),
    c("Horizontal line", "g.hr", undefined, { icon: "hr" }),
    SEP,
    s(
      "Page elements",
      [
        c("Header", "insert.header", undefined, { shortcut: "Ctrl+Alt+O Ctrl+Alt+H" }),
        c("Footer", "insert.footer", undefined, { shortcut: "Ctrl+Alt+O Ctrl+Alt+F" }),
        s("Page number", PAGE_NUMBERS.map((p) => c(p, "insert.pageNumber", p))),
        c("Footnote", "insert.footnote", undefined, { shortcut: "Ctrl+Alt+F" }),
        s("Table of contents", TOC_STYLES.map((t) => c(t, "references.toc", t))),
      ],
      { icon: "header" },
    ),
    s("Break", [c("Page break", "insert.pageBreak", undefined, { shortcut: "Ctrl+Enter" }), c("Section break (next page)", "layout.breaks", "Next Page"), c("Section break (continuous)", "layout.breaks", "Continuous")], { icon: "break" }),
    SEP,
    a("Comment", "comment", { icon: "addComment", shortcut: "Ctrl+Alt+M" }),
  ],
  Format: [
    s("Text", TEXT_SUB(), { icon: "bold" }),
    s(
      "Paragraph styles",
      [
        s("Borders and shading", [c("Add bottom border", "home.borders", "Bottom Border"), c("Remove borders", "home.borders", "No Border")]),
        SEP,
        ...DOC_STYLES.map((st) => s(st, [c(`Apply '${st}'`, "home.style", st), c(`Update '${st}' to match`, "home.updateStyle", st)], { check: `style:${st}` })),
      ],
      { icon: "styles" },
    ),
    s("Align & indent", [...ALIGN_SUB, SEP, d("Indentation options", "g.indent")], { icon: "alignLeft" }),
    s("Line & paragraph spacing", SPACING_SUB, { icon: "lineSpacing" }),
    s("Columns", [c("One column", "layout.columns", "One"), c("Two columns", "layout.columns", "Two"), c("Three columns", "layout.columns", "Three")], { icon: "columns" }),
    s("Bullets & numbering", BULLETS_SUB, { icon: "bullets" }),
    SEP,
    s("Page orientation", [c("Switch to landscape", "layout.orientation", "Landscape"), c("Switch to portrait", "layout.orientation", "Portrait")], { icon: "orientation" }),
    s(
      "Table",
      [
        c("Insert row above", "table.insertAbove"),
        c("Insert row below", "table.insertBelow"),
        c("Insert column left", "table.insertLeft"),
        c("Insert column right", "table.insertRight"),
        SEP,
        c("Delete row", "table.delete", "Delete Rows"),
        c("Delete column", "table.delete", "Delete Columns"),
        c("Delete table", "table.delete", "Delete Table"),
      ],
      { icon: "table" },
    ),
    SEP,
    c("Clear formatting", "home.clearFormatting", undefined, { icon: "clearFormat", shortcut: "Ctrl+\\" }),
  ],
  Tools: [
    s("Spelling and grammar", [c("Spelling and grammar check", "g.pane", "Spelling and grammar", { shortcut: "Ctrl+Alt+X" }), c("Show spelling suggestions", "g.view", "spelling", { check: "view:spelling" })], { icon: "spellcheck" }),
    c("Word count", "g.pane", "Word count", { icon: "wordCount", shortcut: "Ctrl+Shift+C" }),
    c("Review suggested edits", "g.pane", "Review suggested edits", { icon: "suggest", shortcut: "Ctrl+Alt+O Ctrl+Alt+U" }),
    SEP,
    c("Dictionary", "g.pane", "Dictionary", { icon: "dictionary", shortcut: "Ctrl+Shift+Y" }),
    SEP,
    c("Voice typing", "g.pane", "Voice typing", { icon: "mic", shortcut: "Ctrl+Shift+S" }),
    SEP,
    c("Preferences", "g.help", "Preferences", { icon: "settings" }),
    c("Accessibility", "g.help", "Accessibility", { icon: "accessibility" }),
  ],
  Extensions: EXTENSIONS_MENU,
  Help: HELP_MENU,
};

/* ------------------------------------------------------------------ */
/* Sheets                                                              */
/* ------------------------------------------------------------------ */

export const SHEETS_MENUS: Record<string, GEntry[]> = {
  File: fileMenu("sheets"),
  Edit: [
    ...EDIT_BASE,
    s("Paste special", [c("Values only", "home.paste", "Values", { shortcut: "Ctrl+Shift+V" }), c("Format only", "home.paste", "Formatting", { shortcut: "Ctrl+Alt+V" }), c("Transposed", "home.paste", "Transpose")], { icon: "paste" }),
    SEP,
    s("Delete", [c("Values", "edit.clearContents"), c("Row", "home.delete", "Delete Sheet Rows"), c("Column", "home.delete", "Delete Sheet Columns")], { icon: "trash" }),
    SEP,
    d("Find and replace", "replace", { icon: "findReplace", shortcut: "Ctrl+H" }),
  ],
  View: [
    s("Show", [c("Gridlines", "view.gridlines", undefined, { check: "gridlines" }), c("Formula bar", "view.formulaBar", undefined, { check: "formulaBar" }), c("Protected ranges", "g.view", "protectedRanges", { check: "view:protectedRanges" })], { icon: "eye" }),
    s("Freeze", [...FREEZE_ROWS.map((v) => c(v, "g.freeze", v)), c("Up to row $row", "g.freeze", "Up to row $row"), SEP, ...FREEZE_COLS.map((v) => c(v, "g.freeze", v)), c("Up to column $col", "g.freeze", "Up to column $col")], { icon: "freeze" }),
    s("Zoom", SHEET_ZOOMS.map((z) => c(z, "view.zoom", z.replace("%", ""))), { icon: "zoom" }),
    SEP,
    c("Full screen", "g.view", "fullScreen", { icon: "fullscreen" }),
  ],
  Insert: [
    s("Rows", [c("Insert 1 row above", "home.insert", "Insert 1 row above"), c("Insert 1 row below", "home.insert", "Insert 1 row below")], { icon: "rows" }),
    s("Columns", [c("Insert 1 column left", "home.insert", "Insert 1 column left"), c("Insert 1 column right", "home.insert", "Insert 1 column right")], { icon: "columns" }),
    c("Sheet", "sheet.add", undefined, { icon: "sheetTab", shortcut: "Shift+F11" }),
    SEP,
    c("Chart", "insert.chart", "Column chart", { icon: "chart" }),
    d("Pivot table", "g.pivot", { icon: "pivot" }),
    SEP,
    s("Function", FUNCTIONS.map((f) => a(f, `fn:${f}`)), { icon: "sigma" }),
    SEP,
    a("Link", "link", { icon: "link", shortcut: "Ctrl+K" }),
    c("Checkbox", "g.checkbox", undefined, { icon: "checkbox" }),
    c("Dropdown", "g.pane", "Data validation rules", { icon: "dropdown" }),
    SEP,
    a("Comment", "comment", { icon: "addComment", shortcut: "Ctrl+Alt+M" }),
    a("Note", "note", { icon: "note", shortcut: "Shift+F2" }),
  ],
  Format: [
    s("Number", [c("Automatic", "home.numberFormat", "Automatic"), c("Plain text", "home.numberFormat", "Plain text"), SEP, ...NUMBER_FORMATS.slice(2).map((f) => c(f, "home.numberFormat", f))], { icon: "123" }),
    s("Text", [c("Bold", "home.bold", undefined, { icon: "bold", shortcut: "Ctrl+B" }), c("Italic", "home.italic", undefined, { icon: "italic", shortcut: "Ctrl+I" }), c("Underline", "home.underline", undefined, { icon: "underline", shortcut: "Ctrl+U" }), c("Strikethrough", "home.strike", undefined, { icon: "strike", shortcut: "Alt+Shift+5" })], { icon: "bold" }),
    s("Alignment", [c("Left", "home.alignLeft", undefined, { icon: "alignLeft" }), c("Center", "home.alignCenter", undefined, { icon: "alignCenter" }), c("Right", "home.alignRight", undefined, { icon: "alignRight" }), SEP, c("Top", "home.alignTop", undefined, { icon: "vTop" }), c("Middle", "home.alignMiddle", undefined, { icon: "vMiddle" }), c("Bottom", "home.alignBottom", undefined, { icon: "vBottom" })], { icon: "alignLeft" }),
    s("Wrapping", WRAPS.map((w) => c(w, "home.wrap", w)), { icon: "wrap" }),
    s("Font size", [6, 7, 8, 9, 10, 11, 12, 14, 18, 24, 36].map((n) => c(String(n), "home.fontSize", String(n))), { icon: "textSize" }),
    s("Merge cells", MERGES.map((m) => c(m, "home.merge", m)), { icon: "merge" }),
    SEP,
    c("Convert to table", "g.convertTable", undefined, { icon: "table" }),
    SEP,
    c("Conditional formatting", "g.pane", "Conditional format rules", { icon: "cf" }),
    c("Alternating colors", "g.altColors", undefined, { icon: "altColors" }),
    SEP,
    c("Clear formatting", "home.clear", "Clear Formats", { icon: "clearFormat", shortcut: "Ctrl+\\" }),
  ],
  Data: [
    s("Sort sheet", [c("Sort sheet (A to Z)", "data.sortAsc"), c("Sort sheet (Z to A)", "data.sortDesc")], { icon: "sort" }),
    s("Sort range", [d("Advanced range sorting options", "g.sortRange")], { icon: "sort" }),
    SEP,
    c("Create a filter", "data.filter", undefined, { icon: "filter", check: "filter" }),
    c("Create filter view", "g.filterView", "Create new filter view", { icon: "filterView" }),
    a("Change view", "changeView", { icon: "filterView" }),
    SEP,
    c("Protect sheets and ranges", "g.pane", "Protected sheets and ranges", { icon: "lock" }),
    SEP,
    c("Data validation", "g.pane", "Data validation rules", { icon: "validation" }),
    s("Data cleanup", [d("Remove duplicates", "g.removeDuplicates"), c("Trim whitespace", "g.trim")], { icon: "cleanup" }),
    c("Split text to columns", "g.split", undefined, { icon: "split" }),
  ],
  Tools: [
    c("Spelling", "review.spelling", undefined, { icon: "spellcheck", shortcut: "F7" }),
    SEP,
    c("Notification settings", "g.help", "Notification settings", { icon: "bell" }),
    c("Accessibility", "g.help", "Accessibility", { icon: "accessibility" }),
  ],
  Extensions: EXTENSIONS_MENU,
  Help: [...HELP_MENU, c("Function list", "g.help", "Function list")],
};

/* ------------------------------------------------------------------ */
/* Slides                                                              */
/* ------------------------------------------------------------------ */

export const SLIDES_MENUS: Record<string, GEntry[]> = {
  File: fileMenu("slides"),
  Edit: [
    ...EDIT_BASE,
    c("Paste without formatting", "home.paste", "Keep Text Only", { icon: "paste", shortcut: "Ctrl+Shift+V" }),
    SEP,
    c("Select all", "home.selectAll", undefined, { icon: "selectAll", shortcut: "Ctrl+A" }),
    c("Delete", "edit.delete", undefined, { icon: "trash" }),
    c("Duplicate", "slides.duplicate", undefined, { icon: "copy", shortcut: "Ctrl+D" }),
    SEP,
    d("Find and replace", "replace", { icon: "findReplace", shortcut: "Ctrl+H" }),
  ],
  View: [
    c("Slideshow", "slideshow.fromCurrent", undefined, { icon: "present", shortcut: "Ctrl+F5" }),
    c("Motion", "g.pane", "Motion", { icon: "motion", shortcut: "Ctrl+Alt+Shift+B" }),
    c("Grid view", "g.view", "grid", { icon: "grid", check: "view:grid", shortcut: "Ctrl+Alt+1" }),
    SEP,
    c("Show speaker notes", "g.view", "notes", { check: "view:notes" }),
    c("Show filmstrip", "g.view", "filmstrip", { check: "view:filmstrip" }),
    c("Show ruler", "g.view", "ruler", { check: "view:ruler" }),
    SEP,
    c("Full screen", "g.view", "fullScreen", { icon: "fullscreen" }),
  ],
  Insert: [
    s("Image", ["Upload from computer", "Search the web", "Drive", "Photos", "By URL", "Camera"].map((src) => a(src, `image:${src}`)), { icon: "image" }),
    c("Text box", "insert.textBox", undefined, { icon: "textbox" }),
    s("Shape", SHAPES.map((x) => c(x, "insert.shape", x)), { icon: "shape" }),
    a("Table", "table", { icon: "table" }),
    s("Chart", SLIDE_CHARTS.map((x) => c(x, "insert.chart", x)), { icon: "chart" }),
    c("Word art", "insert.wordArt", undefined, { icon: "wordArt" }),
    a("Special characters", "special", { icon: "omega" }),
    SEP,
    c("Animation", "g.pane", "Motion", { icon: "motion" }),
    SEP,
    a("Link", "link", { icon: "link", shortcut: "Ctrl+K" }),
    a("Comment", "comment", { icon: "addComment", shortcut: "Ctrl+Alt+M" }),
    SEP,
    c("New slide", "slides.new", "Title and body", { icon: "newSlide", shortcut: "Ctrl+M" }),
    c("Slide numbers", "insert.slideNumber", undefined, { icon: "pageNumber" }),
  ],
  Format: [
    s("Text", TEXT_SUB(), { icon: "bold" }),
    s("Align & indent", ALIGN_SUB, { icon: "alignLeft" }),
    s("Line & paragraph spacing", LINE_SPACINGS.map((v) => c(v, "home.lineSpacing", v)), { icon: "lineSpacing" }),
    s("Bullets & numbering", [s("Bulleted list", BULLET_PRESETS.map((b) => c(b, "home.bullets", b)), { icon: "bullets" }), s("Numbered list", NUMBER_PRESETS.map((n) => c(n, "home.numbering", n)), { icon: "numbered" })], { icon: "bullets" }),
    SEP,
    c("Clear formatting", "home.clearFormatting", undefined, { icon: "clearFormat", shortcut: "Ctrl+\\" }),
  ],
  Slide: [
    c("New slide", "slides.new", "Title and body", { icon: "newSlide", shortcut: "Ctrl+M" }),
    c("Duplicate slide", "slides.duplicate", undefined, { icon: "copy" }),
    c("Delete slide", "slides.delete", undefined, { icon: "trash" }),
    c("Skip slide", "slides.hide", undefined, { icon: "eyeOff", check: "skipped" }),
    SEP,
    s("Move slide", [c("Slide to beginning", "slides.move", "$slide@1"), c("Slide up", "slides.move", "$slide@up"), c("Slide down", "slides.move", "$slide@down"), c("Slide to end", "slides.move", "$slide@end")], { icon: "move" }),
    SEP,
    d("Change background", "g.background", { icon: "background" }),
    s("Apply layout", LAYOUT_NAMES.map((l) => c(l, "slides.layout", l)), { icon: "layout" }),
    c("Transition", "g.pane", "Motion", { icon: "motion" }),
    SEP,
    c("Change theme", "g.pane", "Themes", { icon: "palette" }),
  ],
  Arrange: [
    s("Order", [c("Bring to front", "object.bringToFront", undefined, { shortcut: "Ctrl+Alt+Shift+↑" }), c("Bring forward", "object.bringForward", undefined, { shortcut: "Ctrl+↑" }), c("Send backward", "object.sendBackward", undefined, { shortcut: "Ctrl+↓" }), c("Send to back", "object.sendToBack", undefined, { shortcut: "Ctrl+Alt+Shift+↓" })], { icon: "order" }),
    s("Align", [c("Left", "object.align", "Align Left"), c("Center", "object.align", "Align Center"), c("Right", "object.align", "Align Right"), SEP, c("Top", "object.align", "Align Top"), c("Middle", "object.align", "Align Middle"), c("Bottom", "object.align", "Align Bottom")], { icon: "alignObjects" }),
    SEP,
    c("Group", "object.group", undefined, { icon: "group", shortcut: "Ctrl+Alt+G" }),
    c("Ungroup", "object.ungroup", undefined, { icon: "ungroup", shortcut: "Ctrl+Alt+Shift+G" }),
  ],
  Tools: [
    c("Spelling", "review.spelling", undefined, { icon: "spellcheck" }),
    c("Dictionary", "g.pane", "Dictionary", { icon: "dictionary", shortcut: "Ctrl+Shift+Y" }),
    SEP,
    c("Q&A history", "g.help", "Q&A history", { icon: "qa" }),
    c("Accessibility", "g.help", "Accessibility", { icon: "accessibility" }),
  ],
  Extensions: EXTENSIONS_MENU,
  Help: HELP_MENU,
};

/* ------------------------------------------------------------------ */
/* Drive                                                               */
/* ------------------------------------------------------------------ */

export const DRIVE_NEW: GEntry[] = [
  a("New folder", "newFolder", { icon: "newFolder", shortcut: "Alt+C then F" }),
  SEP,
  a("File upload", "upload", { icon: "upload", shortcut: "Alt+C then U" }),
  a("Folder upload", "folderUpload", { icon: "folderUpload", shortcut: "Alt+C then I" }),
  SEP,
  c("Google Docs", "g.new", "Google Docs", { icon: "doc", sub: [c("Blank document", "g.new", "Google Docs"), c("From a template", "g.app", "Docs")] }),
  c("Google Sheets", "g.new", "Google Sheets", { icon: "sheet", sub: [c("Blank spreadsheet", "g.new", "Google Sheets"), c("From a template", "g.app", "Sheets")] }),
  c("Google Slides", "g.new", "Google Slides", { icon: "slides", sub: [c("Blank presentation", "g.new", "Google Slides"), c("From a template", "g.app", "Slides")] }),
  c("Google Forms", "g.new", "Google Forms", { icon: "form", sub: [c("Blank form", "g.new", "Google Forms"), c("Blank quiz", "g.new", "Google Forms")] }),
];

/** Right-click menu for a Drive item (file or folder). `$id` is replaced with the item ids. */
export function driveItemMenu(opts: { folder: boolean; starred: boolean; trashed: boolean; editor: boolean }): GEntry[] {
  if (opts.trashed) return [c("Restore", "g.restore", "$id", { icon: "restore" }), c("Delete forever", "g.deleteForever", "$id", { icon: "trash" })];
  return [
    ...(opts.folder ? [c("Open", "g.go", "$id", { icon: "folderOpen" })] : [s("Open with", [c(opts.editor ? "Open" : "Preview", "g.open", "$id", { icon: "openWith" })], { icon: "openWith" })]),
    SEP,
    c("Download", "g.drive.download", "$id", { icon: "download" }),
    a("Rename", "rename", { icon: "edit", shortcut: "Ctrl+Alt+E" }),
    ...(opts.folder ? [] : [c("Make a copy", "g.drive.copy", "$id", { icon: "copy", shortcut: "Ctrl+C Ctrl+V" })]),
    SEP,
    s("Share", [a("Share", "share", { icon: "personAdd", shortcut: "Ctrl+Alt+A" }), c("Copy link", "g.copyLink", "$id", { icon: "link" })], { icon: "personAdd" }),
    s(
      "Organize",
      [
        d("Move", "g.move", { icon: "move", shortcut: "Ctrl+Alt+M" }),
        d("Add shortcut", "g.shortcut", { icon: "shortcut", shortcut: "Shift+Z" }),
        c(opts.starred ? "Remove from starred" : "Add to starred", "g.star", "$id", { icon: opts.starred ? "starFilled" : "star", shortcut: "S" }),
        ...(opts.folder ? [s("Change color", ["#8f8f8f", "#ac725e", "#f83a22", "#fa573c", "#ff7537", "#ffad46", "#16a765", "#4986e7", "#9a9cff", "#b99aff"].map((col) => c(col, "g.color", `$id|${col}`, { swatch: col })))] : []),
      ],
      { icon: "move" },
    ),
    s("File information", [c("Details", "g.details", undefined, { icon: "info" }), c("Activity", "g.details", undefined, { icon: "activity" })], { icon: "info" }),
    SEP,
    c("Move to trash", "g.trash", "$id", { icon: "trash", shortcut: "Delete" }),
  ];
}

/* ------------------------------------------------------------------ */
/* Toolbars                                                            */
/* ------------------------------------------------------------------ */

/**
 * One toolbar control. kind:
 *   button    commit (command/value) or run an action
 *   toggle    like button, drawn pressed when state[stateKey] is true
 *   menu      a button that opens `items`
 *   split     face commits command/value; arrow opens `items`
 *   combo     editable box (font, size, zoom) committing command with the typed value
 *   select    dropdown box (styles) committing command with one of `options`
 *   colors    color grid committing command with a hex value
 *   sep       a divider
 */
export type GTool = {
  kind: "button" | "toggle" | "menu" | "split" | "combo" | "select" | "colors" | "sep";
  id?: string;
  label?: string;
  icon?: string;
  command?: string;
  value?: string;
  action?: string;
  dialog?: string;
  stateKey?: string;
  items?: GEntry[];
  width?: number;
  options?: string[];
  shortcut?: string;
  /** Which surfaces show it: Slides shows text tools only with text selected. */
  when?: "text" | "noText";
};
const T = (t: GTool) => t;
const SEPT: GTool = { kind: "sep" };

const TEXT_TOOLS: GTool[] = [
  T({ kind: "combo", id: "font", label: "Font", command: "home.fontName", options: FONTS, width: 92, stateKey: "font" }),
  SEPT,
  T({ kind: "button", label: "Decrease font size", icon: "minus", command: "home.shrinkFont", shortcut: "Ctrl+Shift+," }),
  T({ kind: "combo", id: "size", label: "Font size", command: "home.fontSize", options: SIZES.map(String), width: 36, stateKey: "size" }),
  T({ kind: "button", label: "Increase font size", icon: "plus", command: "home.growFont", shortcut: "Ctrl+Shift+." }),
  SEPT,
  T({ kind: "toggle", label: "Bold", icon: "bold", command: "home.bold", stateKey: "bold", shortcut: "Ctrl+B" }),
  T({ kind: "toggle", label: "Italic", icon: "italic", command: "home.italic", stateKey: "italic", shortcut: "Ctrl+I" }),
  T({ kind: "toggle", label: "Underline", icon: "underline", command: "home.underline", stateKey: "underline", shortcut: "Ctrl+U" }),
  T({ kind: "colors", label: "Text color", icon: "textColor", command: "home.fontColor", stateKey: "color" }),
  T({ kind: "colors", label: "Highlight color", icon: "highlight", command: "home.highlight", stateKey: "highlight" }),
];

const PARA_TOOLS: GTool[] = [
  T({
    kind: "menu",
    id: "align",
    label: "Align",
    icon: "alignLeft",
    stateKey: "alignIcon",
    items: [c("Left align", "home.alignLeft", undefined, { icon: "alignLeft", shortcut: "Ctrl+Shift+L" }), c("Center align", "home.alignCenter", undefined, { icon: "alignCenter", shortcut: "Ctrl+Shift+E" }), c("Right align", "home.alignRight", undefined, { icon: "alignRight", shortcut: "Ctrl+Shift+R" }), c("Justify", "home.justify", undefined, { icon: "alignJustify", shortcut: "Ctrl+Shift+J" })],
  }),
  T({ kind: "menu", label: "Line & paragraph spacing", icon: "lineSpacing", items: SPACING_SUB }),
];

export const DOCS_TOOLBAR: GTool[] = [
  T({ kind: "button", label: "Search the menus", icon: "search", action: "searchMenus", shortcut: "Alt+/" }),
  T({ kind: "button", label: "Undo", icon: "undo", command: "qat.undo", shortcut: "Ctrl+Z" }),
  T({ kind: "button", label: "Redo", icon: "redo", command: "qat.redo", shortcut: "Ctrl+Y" }),
  T({ kind: "button", label: "Print", icon: "print", dialog: "g.print", shortcut: "Ctrl+P" }),
  T({ kind: "button", label: "Spelling and grammar check", icon: "spellcheck", command: "g.pane", value: "Spelling and grammar", shortcut: "Ctrl+Alt+X" }),
  T({ kind: "toggle", label: "Paint format", icon: "paintFormat", command: "home.formatPainter", stateKey: "painter" }),
  T({ kind: "combo", id: "zoom", label: "Zoom", command: "g.zoom", options: ZOOMS, width: 48, stateKey: "zoom" }),
  SEPT,
  T({ kind: "select", id: "style", label: "Styles", command: "home.style", options: DOC_STYLES, width: 92, stateKey: "style" }),
  SEPT,
  ...TEXT_TOOLS,
  SEPT,
  T({ kind: "button", label: "Insert link", icon: "link", action: "link", shortcut: "Ctrl+K" }),
  T({ kind: "button", label: "Add comment", icon: "addComment", action: "comment", shortcut: "Ctrl+Alt+M" }),
  T({ kind: "menu", label: "Insert image", icon: "image", items: ["Upload from computer", "Search the web", "Drive", "Photos", "By URL", "Camera"].map((src) => a(src, `image:${src}`)) }),
  SEPT,
  ...PARA_TOOLS,
  T({ kind: "split", label: "Checklist", icon: "checklist", command: "g.checklist", items: [c("Checklist", "g.checklist")], shortcut: "Ctrl+Shift+9" }),
  T({ kind: "split", label: "Bulleted list", icon: "bullets", command: "home.bullets", stateKey: "bullets", items: BULLET_PRESETS.map((b) => c(b, "home.bullets", b)), shortcut: "Ctrl+Shift+8" }),
  T({ kind: "split", label: "Numbered list", icon: "numbered", command: "home.numbering", stateKey: "numbering", items: NUMBER_PRESETS.map((n) => c(n, "home.numbering", n)), shortcut: "Ctrl+Shift+7" }),
  T({ kind: "button", label: "Decrease indent", icon: "indentDec", command: "home.indentDec", shortcut: "Ctrl+[" }),
  T({ kind: "button", label: "Increase indent", icon: "indentInc", command: "home.indentInc", shortcut: "Ctrl+]" }),
  T({ kind: "button", label: "Clear formatting", icon: "clearFormat", command: "home.clearFormatting", shortcut: "Ctrl+\\" }),
];

export const SHEETS_TOOLBAR: GTool[] = [
  T({ kind: "button", label: "Search the menus", icon: "search", action: "searchMenus", shortcut: "Alt+/" }),
  T({ kind: "button", label: "Undo", icon: "undo", command: "qat.undo", shortcut: "Ctrl+Z" }),
  T({ kind: "button", label: "Redo", icon: "redo", command: "qat.redo", shortcut: "Ctrl+Y" }),
  T({ kind: "button", label: "Print", icon: "print", dialog: "g.print", shortcut: "Ctrl+P" }),
  T({ kind: "toggle", label: "Paint format", icon: "paintFormat", command: "home.formatPainter", stateKey: "painter" }),
  T({ kind: "combo", id: "zoom", label: "Zoom", command: "view.zoom", options: SHEET_ZOOMS, width: 48, stateKey: "zoom" }),
  SEPT,
  T({ kind: "button", label: "Format as currency", icon: "dollar", command: "home.numberFormat", value: "Currency" }),
  T({ kind: "button", label: "Format as percent", icon: "percent", command: "home.numberFormat", value: "Percent" }),
  T({ kind: "button", label: "Decrease decimal places", icon: "decDec", command: "home.decDec" }),
  T({ kind: "button", label: "Increase decimal places", icon: "decInc", command: "home.decInc" }),
  T({ kind: "menu", label: "More formats", icon: "123", items: [c("Automatic", "home.numberFormat", "Automatic"), c("Plain text", "home.numberFormat", "Plain text"), SEP, ...NUMBER_FORMATS.slice(2).map((f) => c(f, "home.numberFormat", f))] }),
  SEPT,
  T({ kind: "combo", id: "font", label: "Font", command: "home.fontName", options: FONTS, width: 84, stateKey: "font" }),
  SEPT,
  T({ kind: "button", label: "Decrease font size", icon: "minus", command: "home.shrinkFont" }),
  T({ kind: "combo", id: "size", label: "Font size", command: "home.fontSize", options: SIZES.map(String), width: 32, stateKey: "size" }),
  T({ kind: "button", label: "Increase font size", icon: "plus", command: "home.growFont" }),
  SEPT,
  T({ kind: "toggle", label: "Bold", icon: "bold", command: "home.bold", stateKey: "bold", shortcut: "Ctrl+B" }),
  T({ kind: "toggle", label: "Italic", icon: "italic", command: "home.italic", stateKey: "italic", shortcut: "Ctrl+I" }),
  T({ kind: "toggle", label: "Strikethrough", icon: "strike", command: "home.strike", stateKey: "strike", shortcut: "Alt+Shift+5" }),
  T({ kind: "colors", label: "Text color", icon: "textColor", command: "home.fontColor", stateKey: "color" }),
  SEPT,
  T({ kind: "colors", label: "Fill color", icon: "fill", command: "home.fill", stateKey: "fill" }),
  T({ kind: "menu", label: "Borders", icon: "borders", items: BORDERS.map((b) => c(b, "home.borders", b)) }),
  T({ kind: "split", label: "Merge cells", icon: "merge", command: "home.merge", value: "Merge all", items: MERGES.map((m) => c(m, "home.merge", m)) }),
  SEPT,
  T({ kind: "menu", label: "Horizontal align", icon: "alignLeft", stateKey: "alignIcon", items: [c("Left", "home.alignLeft", undefined, { icon: "alignLeft" }), c("Center", "home.alignCenter", undefined, { icon: "alignCenter" }), c("Right", "home.alignRight", undefined, { icon: "alignRight" })] }),
  T({ kind: "menu", label: "Vertical align", icon: "vBottom", items: [c("Top", "home.alignTop", undefined, { icon: "vTop" }), c("Middle", "home.alignMiddle", undefined, { icon: "vMiddle" }), c("Bottom", "home.alignBottom", undefined, { icon: "vBottom" })] }),
  T({ kind: "menu", label: "Text wrapping", icon: "wrap", items: WRAPS.map((w) => c(w, "home.wrap", w)) }),
  SEPT,
  T({ kind: "button", label: "Insert link", icon: "link", action: "link", shortcut: "Ctrl+K" }),
  T({ kind: "button", label: "Insert comment", icon: "addComment", action: "comment", shortcut: "Ctrl+Alt+M" }),
  T({ kind: "button", label: "Insert chart", icon: "chart", command: "insert.chart", value: "Column chart" }),
  T({ kind: "split", label: "Create a filter", icon: "filter", command: "data.filter", stateKey: "filter", items: [c("Create a filter", "data.filter"), c("Create new filter view", "g.filterView", "Create new filter view")] }),
  T({ kind: "menu", label: "Functions", icon: "sigma", items: FUNCTIONS.map((f) => a(f, `fn:${f}`)) }),
];

export const SLIDES_TOOLBAR: GTool[] = [
  T({ kind: "button", label: "Search the menus", icon: "search", action: "searchMenus", shortcut: "Alt+/" }),
  T({ kind: "split", label: "New slide", icon: "plus", command: "slides.new", value: "Title and body", items: LAYOUT_NAMES.map((l) => c(l, "slides.new", l)), shortcut: "Ctrl+M" }),
  T({ kind: "button", label: "Undo", icon: "undo", command: "qat.undo", shortcut: "Ctrl+Z" }),
  T({ kind: "button", label: "Redo", icon: "redo", command: "qat.redo", shortcut: "Ctrl+Y" }),
  T({ kind: "button", label: "Print", icon: "print", dialog: "g.print", shortcut: "Ctrl+P" }),
  T({ kind: "toggle", label: "Paint format", icon: "paintFormat", command: "home.formatPainter", stateKey: "painter" }),
  T({ kind: "combo", id: "zoom", label: "Zoom", command: "g.zoom", options: ["Fit", "50%", "100%", "200%"], width: 44, stateKey: "zoom" }),
  SEPT,
  T({ kind: "button", label: "Select", icon: "cursor", action: "select" }),
  T({ kind: "button", label: "Text box", icon: "textbox", command: "insert.textBox" }),
  T({ kind: "menu", label: "Insert image", icon: "image", items: ["Upload from computer", "Search the web", "Drive", "Photos", "By URL", "Camera"].map((src) => a(src, `image:${src}`)) }),
  T({ kind: "menu", label: "Shape", icon: "shape", items: SHAPES.map((x) => c(x, "insert.shape", x)) }),
  T({ kind: "button", label: "Line", icon: "line", command: "insert.shape", value: "Line" }),
  SEPT,
  T({ kind: "button", label: "Add comment", icon: "addComment", action: "comment", shortcut: "Ctrl+Alt+M" }),
  SEPT,
  T({ kind: "button", label: "Background", dialog: "g.background", when: "noText" }),
  T({ kind: "menu", label: "Layout", items: LAYOUT_NAMES.map((l) => c(l, "slides.layout", l)), when: "noText" }),
  T({ kind: "button", label: "Theme", command: "g.pane", value: "Themes", when: "noText" }),
  T({ kind: "button", label: "Transition", command: "g.pane", value: "Motion", when: "noText" }),
  ...TEXT_TOOLS.map((t) => ({ ...t, when: "text" as const })),
  { ...SEPT, when: "text" },
  T({ kind: "button", label: "Insert link", icon: "link", action: "link", when: "text" }),
  ...PARA_TOOLS.map((t) => ({ ...t, when: "text" as const })),
  T({ kind: "split", label: "Bulleted list", icon: "bullets", command: "home.bullets", items: BULLET_PRESETS.map((b) => c(b, "home.bullets", b)), when: "text" }),
  T({ kind: "split", label: "Numbered list", icon: "numbered", command: "home.numbering", items: NUMBER_PRESETS.map((n) => c(n, "home.numbering", n)), when: "text" }),
  T({ kind: "button", label: "Decrease indent", icon: "indentDec", command: "home.indentDec", when: "text" }),
  T({ kind: "button", label: "Increase indent", icon: "indentInc", command: "home.indentInc", when: "text" }),
  T({ kind: "button", label: "Clear formatting", icon: "clearFormat", command: "home.clearFormatting", when: "text" }),
];

/* ------------------------------------------------------------------ */
/* Ribbon catalog for the validator                                    */
/* ------------------------------------------------------------------ */

function controlsFrom(entries: GEntry[], out: RibbonControl[], key: { n: number }) {
  const opts: RibbonOption[] = [];
  for (const e of entries) {
    if (!isItem(e)) continue;
    if (e.command) opts.push({ value: e.value ?? "", label: e.label, command: e.command });
    if (e.dialog) opts.push({ value: e.label, label: e.label, dialog: e.dialog });
    if (e.sub) controlsFrom(e.sub, out, key);
  }
  if (opts.length) out.push({ type: "dropdown", id: `menu${key.n++}`, label: "Menu", options: opts });
}

function toolControls(tools: GTool[], out: RibbonControl[], key: { n: number }) {
  for (const t of tools) {
    if (t.kind === "sep") continue;
    if (t.kind === "combo" && t.command) out.push({ type: "dropdown", id: t.command, label: t.label ?? "", combo: true, options: [] });
    if (t.kind === "select" && t.command) out.push({ type: "dropdown", id: t.command, label: t.label ?? "", options: (t.options ?? []).map((value) => ({ value })) });
    if (t.kind === "colors" && t.command) out.push({ type: "dropdown", id: t.command, label: t.label ?? "", options: [...PALETTE.map((p) => ({ value: p.hex })), { value: "Reset" }, { value: "None" }] });
    if ((t.kind === "button" || t.kind === "toggle" || t.kind === "split") && t.command) {
      if (t.value !== undefined) out.push({ type: "dropdown", id: t.command, label: t.label ?? "", options: [{ value: t.value }] });
      else out.push({ type: "button", id: t.command, label: t.label ?? "" });
    }
    if (t.dialog) out.push({ type: "button", id: `tool${key.n++}`, label: t.label ?? "", dialog: t.dialog });
    if (t.items) controlsFrom(t.items, out, key);
  }
}

/** Everything the learner can reach, as RibbonTab[] for the validator. Never drawn. */
export function catalogRibbon(): RibbonTab[] {
  const key = { n: 1 };
  const tabs: RibbonTab[] = [];
  const add = (id: string, label: string, groups: { label: string; entries?: GEntry[]; tools?: GTool[] }[]) => {
    tabs.push({
      id,
      label,
      groups: groups.map((g) => {
        const controls: RibbonControl[] = [];
        if (g.entries) controlsFrom(g.entries, controls, key);
        if (g.tools) toolControls(g.tools, controls, key);
        return { label: g.label, controls };
      }),
    });
  };
  add("docs", "Docs", [...Object.entries(DOCS_MENUS).map(([k, v]) => ({ label: k, entries: v })), { label: "Toolbar", tools: DOCS_TOOLBAR }]);
  add("sheets", "Sheets", [...Object.entries(SHEETS_MENUS).map(([k, v]) => ({ label: k, entries: v })), { label: "Toolbar", tools: SHEETS_TOOLBAR }]);
  add("slides", "Slides", [...Object.entries(SLIDES_MENUS).map(([k, v]) => ({ label: k, entries: v })), { label: "Toolbar", tools: SLIDES_TOOLBAR }]);
  add("office", "Office editing", [{ label: "File", entries: Object.values(SAVE_AS_GOOGLE) }]);
  add("drive", "Drive", [{ label: "New", entries: DRIVE_NEW }, { label: "Item", entries: driveItemMenu({ folder: true, starred: false, trashed: false, editor: true }) }, { label: "Trash", entries: driveItemMenu({ folder: false, starred: true, trashed: true, editor: true }) }]);
  // Dialogs the canvas opens from buttons, cards and popups (Share, Link, Comment boxes, pickers).
  tabs.push({
    id: "dialogs",
    label: "Dialogs",
    groups: [{ label: "Dialogs", controls: Object.keys(googleDialogs).map((id) => ({ type: "button" as const, id: `dlg:${id}`, label: googleDialogs[id].title, dialog: id })) }],
  });
  return tabs;
}
