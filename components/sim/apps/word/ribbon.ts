import type { RibbonControl, RibbonOption, RibbonTab } from "@/types/sim";
import { CHAR_STYLE_NAMES, COLOR_SETS, FONT_SETS, PARA_STYLE_NAMES, STYLE_SETS, THEMES, THEME_NAMES, customStyleNames } from "./model";

/*
 * Command and dialog ids added for references, templates and forms (all
 * handled in model.ts › applyWord):
 *
 * Commands
 * - home.customStyle (value = style name): apply a style made with Create a
 *   Style. The Styles gallery and Styles pane list custom styles; core.normalize
 *   turns a `home.style` commit with a non-built-in name into this id.
 * - insert.pageNumber values "Top of Page - Bold Numbers 1|2|3" and
 *   "Bottom of Page - Bold Numbers 1|2|3": Page X of Y ("Page 1 of 3").
 * - references.footnote / references.endnote: insert a reference mark and move
 *   the cursor into the empty note (selection "footnote:<n>" / "endnote:<n>");
 *   the typed note is { kind: "type", target: "footnote:<n>" }.
 * - developer.plainText, developer.richText, developer.checkBox,
 *   developer.dropDown, developer.comboBox, developer.datePicker,
 *   developer.picture: insert a content control. On a selected run the control
 *   wraps it (same selection key); on a paragraph it is added at the end as run
 *   `cc<n>` ("p5.cc1"), which becomes the selection. developer.designMode toggles.
 * - contentControl.toggle (check box) and contentControl.choose (value = list
 *   entry or date): emitted by clicking a control on the page.
 * - review.restrict opens the Restrict Editing pane; its Yes, Start Enforcing
 *   Protection button emits review.enforce with value "Filling in forms",
 *   "No changes (Read only)", "Comments" or "Tracked changes";
 *   review.stopProtection turns it off.
 *
 * Dialogs (see dialogs.ts): bookmark, crossRef, customToc, editRecipients
 * (Mail Merge Recipients: checkboxes r1, r2, … per recipient, filterField /
 * filterOp / filterValue, sortBy / sortOrder; OK with nothing changed commits
 * the older mail.editRecipients command), autoText (entry), saveAutoText,
 * controlProperties. The columns dialog's applyTo now includes "Selected text"
 * and "This point forward".
 */

export const FONTS = ["Calibri", "Calibri Light", "Aptos", "Arial", "Arial Black", "Cambria", "Century Gothic", "Comic Sans MS", "Courier New", "Garamond", "Georgia", "Gill Sans MT", "Segoe UI", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"];
export const SIZE_OPTS = ["8", "9", "10", "10.5", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72"];

export const THEME_COLORS: { label: string; color: string }[] = [
  { label: "White", color: "#FFFFFF" },
  { label: "Black", color: "#000000" },
  { label: "Gray", color: "#E7E6E6" },
  { label: "Dark Blue, Text 2", color: "#44546A" },
  { label: "Blue, Accent 1", color: "#4472C4" },
  { label: "Orange, Accent 2", color: "#ED7D31" },
  { label: "Gray, Accent 3", color: "#A5A5A5" },
  { label: "Gold, Accent 4", color: "#FFC000" },
  { label: "Blue, Accent 5", color: "#5B9BD5" },
  { label: "Green, Accent 6", color: "#70AD47" },
  { label: "Dark Red", color: "#C00000" },
  { label: "Red", color: "#FF0000" },
  { label: "Orange", color: "#FFC000" },
  { label: "Yellow", color: "#FFFF00" },
  { label: "Light Green", color: "#92D050" },
  { label: "Green", color: "#00B050" },
  { label: "Light Blue", color: "#00B0F0" },
  { label: "Blue", color: "#0070C0" },
  { label: "Dark Blue", color: "#002060" },
  { label: "Purple", color: "#7030A0" },
];

const colorOpts = (extra: RibbonOption[] = []): RibbonOption[] => [
  ...extra,
  { value: "Theme Colors", heading: true },
  ...THEME_COLORS.slice(0, 10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
  { value: "Standard Colors", heading: true },
  ...THEME_COLORS.slice(10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
];

export const HIGHLIGHTS: RibbonOption[] = [
  { value: "#FFFF00", label: "Yellow", color: "#FFFF00" },
  { value: "#00FF00", label: "Bright Green", color: "#00FF00" },
  { value: "#00FFFF", label: "Turquoise", color: "#00FFFF" },
  { value: "#FF00FF", label: "Pink", color: "#FF00FF" },
  { value: "#0000FF", label: "Blue", color: "#0000FF" },
  { value: "#FF0000", label: "Red", color: "#FF0000" },
  { value: "#C0C0C0", label: "Gray 25%", color: "#C0C0C0" },
  { value: "No Color", label: "No Color" },
];

const builtInStyleOpts: RibbonOption[] = [...PARA_STYLE_NAMES, ...CHAR_STYLE_NAMES].map((n): RibbonOption => ({
  value: n,
  preview:
    n === "Title" ? { size: 18 } :
    n.startsWith("Heading 1") ? { size: 14, color: "#2F5496" } :
    n.startsWith("Heading 2") ? { size: 12, color: "#2F5496" } :
    n.startsWith("Heading 3") ? { size: 11, color: "#1F3763" } :
    n === "Subtitle" ? { color: "#5A5A5A" } :
    n === "Strong" ? { bold: true } :
    n.includes("Emphasis") || n.includes("Quote") ? { italic: true } : undefined,
}));
const styleCommandOpts: RibbonOption[] = [
  { value: "Style commands", heading: true },
  { value: "Create a Style", icon: "styles", dialog: "createStyle" },
  { value: "Clear Formatting", icon: "clearFormat", command: "home.clearFormatting" },
  { value: "Update Style to Match Selection", icon: "styles", command: "home.updateStyle" },
  { value: "Modify Style...", icon: "styles", dialog: "modifyStyle" },
];

/** Home › Styles gallery: built-in styles, then the document's own (Create a Style), then the style commands. */
const stylesGallery = { type: "gallery", id: "home.style", label: "Styles", options: [], width: 330 } as RibbonControl & { type: "gallery" };
Object.defineProperty(stylesGallery, "options", {
  enumerable: true,
  get: (): RibbonOption[] => [
    ...builtInStyleOpts,
    ...customStyleNames().map((n): RibbonOption => ({ value: n, command: "home.customStyle" })),
    ...styleCommandOpts,
  ],
});

export const DICTATION_LANGUAGES = ["English (United States)", "English (United Kingdom)", "Spanish (Spain)", "Spanish (Mexico)", "French (France)", "Portuguese (Brazil)", "Chinese (China)", "German (Germany)", "Italian (Italy)", "Japanese (Japan)"];

const ARRANGE_FORWARD: RibbonControl = { type: "dropdown", id: "object.bringForward", label: "Bring Forward", icon: "bringForward", showLabel: true, split: true, faceValue: "Bring Forward", options: ["Bring Forward", "Bring to Front", "Bring in Front of Text"].map((v) => ({ value: v, icon: "bringForward" })) };
const ARRANGE_BACKWARD: RibbonControl = { type: "dropdown", id: "object.sendBackward", label: "Send Backward", icon: "sendBackward", showLabel: true, split: true, faceValue: "Send Backward", options: ["Send Backward", "Send to Back", "Send Behind Text"].map((v) => ({ value: v, icon: "sendBackward" })) };
const SELECTION_PANE: RibbonControl = { type: "button", id: "object.selectionPane", label: "Selection Pane", icon: "navPane", showLabel: true };
const WRAP_OPTS = (cmd?: string): RibbonOption[] => [
  ...["In Line with Text", "Square", "Tight", "Through", "Top and Bottom", "Behind Text", "In Front of Text"].map((v) => ({ value: v, icon: "wrapText", ...(cmd ? { command: cmd } : {}) })),
  { value: "Position on page", heading: true },
  { value: "Move with Text", ...(cmd ? { command: cmd } : {}) },
  { value: "Fix Position on Page", ...(cmd ? { command: cmd } : {}) },
];
const POSITION_OPTS: RibbonOption[] = [
  { value: "In Line with Text" },
  { value: "With Text Wrapping", heading: true },
  ...["Top Left", "Top Center", "Top Right", "Middle Left", "Middle Center", "Middle Right", "Bottom Left", "Bottom Center", "Bottom Right"].map((v) => ({ value: `Position in ${v}`, icon: "position" })),
];
const ALIGN_OPTS = ["Align Left", "Align Center", "Align Right", "Align Top", "Align Middle", "Align Bottom", "Distribute Horizontally", "Distribute Vertically"];
/** Insert › Page Number. Plain Number 1/2/3 = left/center/right; Page X of Y uses Bold Numbers 1/2/3 ("Page 1 of 3"). */
const PAGE_NUMBER_OPTS: RibbonOption[] = [
  { value: "Top of Page", heading: true },
  { value: "Top of Page - Plain Number 1" },
  { value: "Top of Page - Plain Number 2" },
  { value: "Top of Page - Plain Number 3" },
  { value: "Top of Page - Bold Numbers 1", label: "Top of Page - Page X of Y, Bold Numbers 1" },
  { value: "Top of Page - Bold Numbers 2", label: "Top of Page - Page X of Y, Bold Numbers 2" },
  { value: "Top of Page - Bold Numbers 3", label: "Top of Page - Page X of Y, Bold Numbers 3" },
  { value: "Bottom of Page", heading: true },
  { value: "Bottom of Page - Plain Number 1" },
  { value: "Bottom of Page - Plain Number 2" },
  { value: "Bottom of Page - Plain Number 3" },
  { value: "Bottom of Page - Bold Numbers 1", label: "Bottom of Page - Page X of Y, Bold Numbers 1" },
  { value: "Bottom of Page - Bold Numbers 2", label: "Bottom of Page - Page X of Y, Bold Numbers 2" },
  { value: "Bottom of Page - Bold Numbers 3", label: "Bottom of Page - Page X of Y, Bold Numbers 3" },
  { value: "Page Margins" },
  { value: "Format Page Numbers..." },
  { value: "Remove Page Numbers" },
];

const tablePicker: RibbonOption[] = [
  { value: "Insert Table", heading: true },
  ...["2x2", "3x2", "3x3", "3x4", "4x3", "4x4", "4x5", "5x4", "5x5", "2x5", "3x5", "6x3"].map((v) => ({ value: v, label: `${v.replace("x", " × ")} Table`, icon: "table" })),
  { value: "Insert Table...", dialog: "insertTable", icon: "table" },
  { value: "Draw Table", icon: "pen" },
  { value: "Convert Text to Table...", dialog: "convertTextToTable", icon: "table" },
  { value: "Excel Spreadsheet", icon: "sheet" },
  { value: "Quick Tables", icon: "table" },
];

const TABLE_STYLES = ["Table Grid", "Plain Table 1", "Plain Table 2", "Grid Table 1 Light", "Grid Table 4 - Accent 1", "Grid Table 4 - Accent 2", "Grid Table 5 Dark - Accent 1", "List Table 3 - Accent 1", "List Table 4 - Accent 6", "Grid Table 6 Colorful - Accent 1"];
const TABLE_STYLE_COLORS: Record<string, string> = {
  "Table Grid": "#ffffff",
  "Plain Table 1": "#f2f2f2",
  "Plain Table 2": "#ffffff",
  "Grid Table 1 Light": "#d9e2f3",
  "Grid Table 4 - Accent 1": "#4472C4",
  "Grid Table 4 - Accent 2": "#ED7D31",
  "Grid Table 5 Dark - Accent 1": "#2F5496",
  "List Table 3 - Accent 1": "#4472C4",
  "List Table 4 - Accent 6": "#70AD47",
  "Grid Table 6 Colorful - Accent 1": "#8EAADB",
};

export const PICTURE_FILES = ["clinic-front-desk.jpg", "lakeside-logo.png", "handwashing-poster.png", "team-photo.jpg", "flu-shot-clinic.jpg", "map-directions.png"];

export const wordRibbon: RibbonTab[] = [
  {
    id: "home",
    label: "Home",
    groups: [
      {
        label: "Clipboard",
        controls: [
          {
            type: "dropdown",
            id: "home.paste",
            label: "Paste",
            icon: "paste",
            size: "large",
            split: true,
            options: [
              { value: "Keep Source Formatting", icon: "paste" },
              { value: "Merge Formatting", icon: "paste" },
              { value: "Keep Text Only", icon: "paste" },
              { value: "Paste Special...", icon: "paste" },
            ],
          },
          { type: "button", id: "home.cut", label: "Cut", icon: "cut", shortcut: "Ctrl+X", showLabel: true },
          { type: "button", id: "home.copy", label: "Copy", icon: "copy", shortcut: "Ctrl+C", showLabel: true },
          { type: "toggle", id: "home.formatPainter", label: "Format Painter", icon: "formatPainter", showLabel: true },
        ],
      },
      {
        label: "Font",
        launcher: "font",
        controls: [],
        rows: [
          [
            { type: "dropdown", id: "home.fontName", label: "Font", combo: true, width: 120, options: FONTS.map((f) => ({ value: f, preview: { font: f } })) },
            { type: "dropdown", id: "home.fontSize", label: "Font Size", combo: true, width: 44, options: SIZE_OPTS.map((s) => ({ value: s })) },
            { type: "button", id: "home.growFont", label: "Increase Font Size", icon: "growFont", shortcut: "Ctrl+Shift+>" },
            { type: "button", id: "home.shrinkFont", label: "Decrease Font Size", icon: "shrinkFont", shortcut: "Ctrl+Shift+<" },
            {
              type: "dropdown",
              id: "home.changeCase",
              label: "Change Case",
              icon: "changeCase",
              options: ["Sentence case.", "lowercase", "UPPERCASE", "Capitalize Each Word", "tOGGLE cASE"].map((v) => ({ value: v })),
            },
            { type: "button", id: "home.clearFormatting", label: "Clear All Formatting", icon: "clearFormat" },
          ],
          [
            { type: "toggle", id: "home.bold", label: "Bold", icon: "bold", shortcut: "Ctrl+B" },
            { type: "toggle", id: "home.italic", label: "Italic", icon: "italic", shortcut: "Ctrl+I" },
            {
              type: "dropdown",
              id: "home.underline",
              label: "Underline",
              icon: "underline",
              split: true,
              faceValue: "Underline",
              options: ["Single", "Double", "Thick", "Dotted", "Dashed", "Wave"].map((v) => ({ value: v })),
            },
            { type: "toggle", id: "home.strike", label: "Strikethrough", icon: "strike" },
            { type: "toggle", id: "home.subscript", label: "Subscript", icon: "subscript", shortcut: "Ctrl+=" },
            { type: "toggle", id: "home.superscript", label: "Superscript", icon: "superscript", shortcut: "Ctrl+Shift++" },
            { type: "button", id: "home.textEffects", label: "Text Effects and Typography", icon: "wordart" },
            { type: "dropdown", id: "home.highlight", label: "Text Highlight Color", icon: "highlight", split: true, faceValue: "#FFFF00", gallery: "swatches", options: HIGHLIGHTS },
            { type: "dropdown", id: "home.fontColor", label: "Font Color", icon: "fontColor", split: true, faceValue: "#C00000", gallery: "swatches", options: colorOpts([{ value: "Automatic", label: "Automatic", color: "#000000" }]) },
          ],
        ],
      },
      {
        label: "Paragraph",
        launcher: "paragraph",
        controls: [],
        rows: [
          [
            {
              type: "dropdown",
              id: "home.bullets",
              label: "Bullets",
              icon: "bullets",
              split: true,
              options: [
                { value: "Bullet Library", heading: true },
                { value: "None" },
                { value: "•", label: "• Solid round" },
                { value: "○", label: "○ Hollow round" },
                { value: "■", label: "■ Solid square" },
                { value: "◆", label: "◆ Diamond" },
                { value: "➢", label: "➢ Arrow" },
                { value: "✓", label: "✓ Check mark" },
                { value: "Define New Bullet...", dialog: "defineBullet" },
              ],
            },
            {
              type: "dropdown",
              id: "home.numbering",
              label: "Numbering",
              icon: "numbering",
              split: true,
              options: [
                { value: "Numbering Library", heading: true },
                { value: "None" },
                { value: "1.", label: "1. 2. 3." },
                { value: "1)", label: "1) 2) 3)" },
                { value: "I.", label: "I. II. III." },
                { value: "A.", label: "A. B. C." },
                { value: "a)", label: "a) b) c)" },
                { value: "i.", label: "i. ii. iii." },
                { value: "Set Numbering Value...", dialog: "setNumbering" },
              ],
            },
            { type: "dropdown", id: "home.multilevel", label: "Multilevel List", icon: "multilevel", options: [{ value: "1. a. i." }, { value: "1. 1.1. 1.1.1." }, { value: "Article I. Section 1.01" }] },
            { type: "button", id: "home.indentDec", label: "Decrease Indent", icon: "indentDec" },
            { type: "button", id: "home.indentInc", label: "Increase Indent", icon: "indentInc" },
            { type: "button", id: "home.sort", label: "Sort", icon: "sort", dialog: "sort" },
            { type: "toggle", id: "home.showMarks", label: "Show/Hide ¶", icon: "pilcrow", shortcut: "Ctrl+Shift+8" },
          ],
          [
            { type: "toggle", id: "home.alignLeft", label: "Align Left", icon: "alignLeft", shortcut: "Ctrl+L" },
            { type: "toggle", id: "home.alignCenter", label: "Center", icon: "alignCenter", shortcut: "Ctrl+E" },
            { type: "toggle", id: "home.alignRight", label: "Align Right", icon: "alignRight", shortcut: "Ctrl+R" },
            { type: "toggle", id: "home.justify", label: "Justify", icon: "justify", shortcut: "Ctrl+J" },
            {
              type: "dropdown",
              id: "home.lineSpacing",
              label: "Line and Paragraph Spacing",
              icon: "lineSpacing",
              options: [
                { value: "1.0" },
                { value: "1.15" },
                { value: "1.5" },
                { value: "2.0" },
                { value: "2.5" },
                { value: "3.0" },
                { value: "Line Spacing Options...", dialog: "paragraph" },
                { value: "Add Space Before Paragraph" },
                { value: "Remove Space After Paragraph" },
              ],
            },
            { type: "dropdown", id: "home.shading", label: "Shading", icon: "shading", split: true, faceValue: "#D9E2F3", gallery: "swatches", options: colorOpts([{ value: "No Color", label: "No Color" }]) },
            {
              type: "dropdown",
              id: "home.borders",
              label: "Borders",
              icon: "borders",
              split: true,
              faceValue: "Bottom Border",
              options: ["Bottom Border", "Top Border", "Left Border", "Right Border", "No Border", "All Borders", "Outside Borders", "Horizontal Line"].map((v) => ({ value: v, icon: "borders" })),
            },
          ],
        ],
      },
      {
        label: "Styles",
        launcher: "stylesPane",
        controls: [stylesGallery],
      },
      {
        label: "Editing",
        controls: [
          { type: "dropdown", id: "home.find", label: "Find", icon: "find", showLabel: true, split: true, options: [{ value: "Find" }, { value: "Advanced Find...", dialog: "replace" }, { value: "Go To...", dialog: "goTo" }] },
          { type: "button", id: "home.replace", label: "Replace", icon: "replace", showLabel: true, dialog: "replace", shortcut: "Ctrl+H" },
          { type: "dropdown", id: "home.select", label: "Select", icon: "select", showLabel: true, options: [{ value: "Select All", command: "home.selectAll" }, { value: "Select Objects" }, { value: "Select All Text With Similar Formatting" }] },
        ],
      },
      {
        label: "Voice",
        controls: [
          {
            type: "dropdown",
            id: "home.dictate",
            label: "Dictate",
            icon: "dictate",
            size: "large",
            split: true,
            options: [{ value: "Spoken language", heading: true }, ...DICTATION_LANGUAGES.map((l) => ({ value: l, command: "home.dictateLanguage" }))],
          },
        ],
      },
      { label: "Editor", controls: [{ type: "button", id: "home.editor", label: "Editor", icon: "editor", size: "large" }] },
      { label: "Add-ins", controls: [{ type: "button", id: "home.addIns", label: "Add-ins", icon: "addIns", size: "large" }] },
    ],
  },
  {
    id: "insert",
    label: "Insert",
    groups: [
      {
        label: "Pages",
        controls: [
          { type: "dropdown", id: "insert.coverPage", label: "Cover Page", icon: "coverPage", showLabel: true, gallery: "grid", options: ["Austin", "Banded", "Facet", "Grid", "Ion (Dark)", "Motion", "Retrospect", "Sideline"].map((v) => ({ value: v, icon: "coverPage" })) },
          { type: "button", id: "insert.blankPage", label: "Blank Page", icon: "blankPage", showLabel: true },
          { type: "button", id: "insert.pageBreak", label: "Page Break", icon: "pageBreak", showLabel: true, shortcut: "Ctrl+Enter" },
        ],
      },
      { label: "Tables", controls: [{ type: "dropdown", id: "insert.table", label: "Table", icon: "table", size: "large", options: tablePicker }] },
      {
        label: "Illustrations",
        controls: [
          {
            type: "dropdown",
            id: "insert.pictures",
            label: "Pictures",
            icon: "picture",
            size: "large",
            options: [
              { value: "Insert Picture From", heading: true },
              { value: "This Device...", dialog: "insertPicture", icon: "pc" },
              { value: "Stock Images...", command: "insert.onlinePictures", icon: "picture" },
              { value: "Online Pictures...", dialog: "onlinePictures", icon: "onlinePicture" },
            ],
          },
          {
            type: "dropdown",
            id: "insert.shape",
            label: "Shapes",
            icon: "shapes",
            size: "large",
            gallery: "grid",
            options: [
              { value: "Rectangles", heading: true },
              { value: "Rectangle", icon: "shapes" },
              { value: "Rounded Rectangle", icon: "shapes" },
              { value: "Basic Shapes", heading: true },
              { value: "Oval", icon: "shapes" },
              { value: "Triangle", icon: "shapes" },
              { value: "Diamond", icon: "shapes" },
              { value: "Block Arrows", heading: true },
              { value: "Right Arrow", icon: "shapes" },
              { value: "Down Arrow", icon: "shapes" },
              { value: "Flowchart", heading: true },
              { value: "Flowchart: Process", icon: "shapes" },
              { value: "Flowchart: Decision", icon: "shapes" },
              { value: "Flowchart: Terminator", icon: "shapes" },
              { value: "Stars and Banners", heading: true },
              { value: "Star: 5 Points", icon: "shapes" },
              { value: "Callouts", heading: true },
              { value: "Speech Bubble: Rectangle", icon: "shapes" },
            ],
          },
          { type: "button", id: "insert.icons", label: "Icons", icon: "icons", size: "large" },
          { type: "button", id: "insert.3d", label: "3D Models", icon: "shapes", showLabel: true },
          { type: "button", id: "insert.smartArt", label: "SmartArt", icon: "smartart", showLabel: true },
          { type: "button", id: "insert.chart", label: "Chart", icon: "chart", showLabel: true, dialog: "insertChart" },
          { type: "dropdown", id: "insert.screenshot", label: "Screenshot", icon: "picture", showLabel: true, options: [{ value: "Screen Clipping" }] },
        ],
      },
      { label: "Add-ins", controls: [{ type: "button", id: "insert.addins", label: "Get Add-ins", icon: "addIns", showLabel: true }] },
      { label: "Media", controls: [{ type: "button", id: "insert.video", label: "Online Videos", icon: "video", size: "large" }] },
      {
        label: "Links",
        controls: [
          { type: "button", id: "insert.link", label: "Link", icon: "link", size: "large", dialog: "link", shortcut: "Ctrl+K" },
          { type: "button", id: "insert.bookmark", label: "Bookmark", icon: "link", showLabel: true, dialog: "bookmark" },
          { type: "button", id: "insert.crossRef", label: "Cross-reference", icon: "link", showLabel: true, dialog: "crossRef" },
        ],
      },
      { label: "Comments", controls: [{ type: "button", id: "insert.comment", label: "Comment", icon: "comment", size: "large", dialog: "newComment" }] },
      {
        label: "Header & Footer",
        controls: [
          { type: "dropdown", id: "insert.header", label: "Header", icon: "header", showLabel: true, gallery: "grid", options: ["Blank", "Blank (Three Columns)", "Austin", "Banded", "Facet (Even Page)", "Edit Header", "Remove Header"].map((v) => ({ value: v, icon: "header" })) },
          { type: "dropdown", id: "insert.footer", label: "Footer", icon: "footer", showLabel: true, gallery: "grid", options: ["Blank", "Blank (Three Columns)", "Austin", "Banded", "Facet (Even Page)", "Edit Footer", "Remove Footer"].map((v) => ({ value: v, icon: "footer" })) },
          {
            type: "dropdown",
            id: "insert.pageNumber",
            label: "Page Number",
            icon: "pageNumber",
            showLabel: true,
            options: PAGE_NUMBER_OPTS,
          },
        ],
      },
      {
        label: "Text",
        controls: [
          { type: "dropdown", id: "insert.textBox", label: "Text Box", icon: "textbox", size: "large", gallery: "grid", options: ["Simple Text Box", "Austin Quote", "Banded Sidebar", "Draw Text Box"].map((v) => ({ value: v, icon: "textbox" })) },
          {
            type: "dropdown",
            id: "insert.quickParts",
            label: "Quick Parts",
            icon: "field",
            showLabel: true,
            options: [
              // AutoText opens the gallery of entries saved in the document (doc.autoText); pick one and Insert.
              { value: "AutoText", icon: "field", dialog: "autoText" },
              { value: "Document Property" },
              { value: "Field..." },
              { value: "Save Selection to AutoText Gallery...", icon: "save", dialog: "saveAutoText" },
            ],
          },
          { type: "dropdown", id: "insert.wordArt", label: "WordArt", icon: "wordart", showLabel: true, options: [{ value: "Fill: Black, Text color 1; Shadow" }, { value: "Fill: Blue, Accent color 1; Shadow" }, { value: "Gradient Fill: Gold" }] },
          { type: "dropdown", id: "insert.dropCap", label: "Drop Cap", icon: "dropcap", showLabel: true, options: [{ value: "None" }, { value: "Dropped" }, { value: "In margin" }] },
          { type: "button", id: "insert.signature", label: "Signature Line", icon: "pen", showLabel: true },
          { type: "button", id: "insert.dateTime", label: "Date & Time", icon: "date", showLabel: true, dialog: "dateTime" },
          { type: "button", id: "insert.object", label: "Object", icon: "new", showLabel: true },
        ],
      },
      {
        label: "Symbols",
        controls: [
          { type: "button", id: "insert.equation", label: "Equation", icon: "equation", size: "large" },
          { type: "dropdown", id: "insert.symbol", label: "Symbol", icon: "symbol", size: "large", options: ["©", "®", "™", "°", "±", "€", "£", "§", "✓", "More Symbols..."].map((v) => (v === "More Symbols..." ? { value: v, dialog: "symbol" } : { value: v })) },
        ],
      },
    ],
  },
  {
    id: "draw",
    label: "Draw",
    groups: [
      { label: "Drawing Tools", controls: [{ type: "button", id: "draw.select", label: "Select", icon: "select", size: "large" }, { type: "button", id: "draw.pen", label: "Pen", icon: "pen", size: "large" }, { type: "button", id: "draw.eraser", label: "Eraser", icon: "eraser", size: "large" }] },
      { label: "Convert", controls: [{ type: "button", id: "draw.inkToShape", label: "Ink to Shape", icon: "shapes", size: "large" }, { type: "button", id: "draw.inkToMath", label: "Ink to Math", icon: "equation", size: "large" }] },
    ],
  },
  {
    id: "design",
    label: "Design",
    groups: [
      {
        label: "Document Formatting",
        controls: [
          {
            type: "dropdown",
            id: "design.theme",
            label: "Themes",
            icon: "themes",
            size: "large",
            gallery: "grid",
            options: [
              ...THEME_NAMES.map((t) => ({ value: t, label: t, color: THEMES[t].accent })),
              { value: "Reset to Theme from Template", icon: "reset" },
              { value: "Save Current Theme...", icon: "save", dialog: "saveTheme" },
            ],
          },
          {
            type: "gallery",
            id: "design.styleSet",
            label: "Style Set",
            options: [
              ...STYLE_SETS.map((s): RibbonOption => ({ value: s, label: s })),
              { value: "Style Set commands", heading: true },
              { value: "Reset to the Default Style Set", icon: "reset" },
              { value: "Save as a New Style Set...", icon: "save", dialog: "saveStyleSet" },
            ],
            width: 300,
          },
          { type: "dropdown", id: "design.colors", label: "Colors", icon: "colors", size: "large", gallery: "list", options: [...Object.keys(COLOR_SETS).map((v) => ({ value: v, color: COLOR_SETS[v] })), { value: "Customize Colors..." }] },
          { type: "dropdown", id: "design.fonts", label: "Fonts", icon: "fonts", size: "large", options: [...Object.keys(FONT_SETS).map((v) => ({ value: v, label: `${v} (${FONT_SETS[v][0]} / ${FONT_SETS[v][1]})`, preview: { font: FONT_SETS[v][1] } })), { value: "Customize Fonts..." }] },
          { type: "dropdown", id: "design.paragraphSpacing", label: "Paragraph Spacing", icon: "spacing", showLabel: true, options: ["Default", "No Paragraph Space", "Compact", "Tight", "Open", "Relaxed", "Double"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "design.effects", label: "Effects", icon: "effects", showLabel: true, options: ["Office", "Subtle Solids", "Banded Edge", "Smokey Glass", "Glow Edge"].map((v) => ({ value: v })) },
          { type: "button", id: "design.setDefault", label: "Set as Default", icon: "accept", showLabel: true },
        ],
      },
      {
        label: "Page Background",
        controls: [
          {
            type: "dropdown",
            id: "design.watermark",
            label: "Watermark",
            icon: "watermark",
            size: "large",
            options: [
              { value: "Confidential", heading: true },
              { value: "CONFIDENTIAL 1" },
              { value: "DO NOT COPY 1" },
              { value: "Disclaimers", heading: true },
              { value: "DRAFT 1" },
              { value: "SAMPLE 1" },
              { value: "Urgent", heading: true },
              { value: "URGENT 1" },
              { value: "ASAP 1" },
              { value: "Custom Watermark...", dialog: "watermark" },
              { value: "Remove Watermark" },
            ],
          },
          { type: "dropdown", id: "design.pageColor", label: "Page Color", icon: "pageColor", size: "large", gallery: "swatches", options: colorOpts([{ value: "No Color", label: "No Color" }]) },
          { type: "button", id: "design.pageBorders", label: "Page Borders", icon: "pageBorders", size: "large", dialog: "pageBorders" },
        ],
      },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    groups: [
      {
        label: "Page Setup",
        launcher: "pageSetup",
        controls: [
          { type: "dropdown", id: "layout.margins", label: "Margins", icon: "margins", size: "large", options: [{ value: "Normal", label: 'Normal (1")' }, { value: "Narrow", label: 'Narrow (0.5")' }, { value: "Moderate", label: 'Moderate (1" / 0.75")' }, { value: "Wide", label: 'Wide (1" / 2")' }, { value: "Mirrored" }, { value: "Custom Margins...", dialog: "customMargins" }] },
          { type: "dropdown", id: "layout.orientation", label: "Orientation", icon: "orientation", size: "large", options: [{ value: "Portrait" }, { value: "Landscape" }] },
          { type: "dropdown", id: "layout.size", label: "Size", icon: "size", size: "large", options: ["Letter", "Legal", "Executive", "A4", "A5", "Envelope #10"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "layout.columns", label: "Columns", icon: "columns", size: "large", options: [...["One", "Two", "Three", "Left", "Right"].map((v) => ({ value: v, icon: "columns" })), { value: "More Columns...", icon: "columns", dialog: "columns" }] },
          {
            type: "dropdown",
            id: "layout.breaks",
            label: "Breaks",
            icon: "breaks",
            showLabel: true,
            options: [
              { value: "Page Breaks", heading: true },
              { value: "Page" },
              { value: "Column" },
              { value: "Text Wrapping" },
              { value: "Section Breaks", heading: true },
              { value: "Next Page" },
              { value: "Continuous" },
              { value: "Even Page" },
              { value: "Odd Page" },
            ],
          },
          { type: "dropdown", id: "layout.lineNumbers", label: "Line Numbers", icon: "numbering", showLabel: true, options: ["None", "Continuous", "Restart Each Page", "Restart Each Section"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "layout.hyphenation", label: "Hyphenation", icon: "hyphenation", showLabel: true, options: ["None", "Automatic", "Manual"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Paragraph",
        launcher: "paragraph",
        controls: [],
        rows: [
          [
            { type: "dropdown", id: "layout.indentLeft", label: "Indent Left", combo: true, width: 54, options: ["0", "0.25", "0.5", "0.75", "1"].map((v) => ({ value: v })) },
            { type: "dropdown", id: "layout.spaceBefore", label: "Spacing Before", combo: true, width: 54, options: ["0", "6", "12", "18", "24"].map((v) => ({ value: v })) },
          ],
          [
            { type: "dropdown", id: "layout.indentRight", label: "Indent Right", combo: true, width: 54, options: ["0", "0.25", "0.5"].map((v) => ({ value: v })) },
            { type: "dropdown", id: "layout.spaceAfter", label: "Spacing After", combo: true, width: 54, options: ["0", "6", "8", "10", "12", "18"].map((v) => ({ value: v })) },
          ],
        ],
      },
      {
        label: "Arrange",
        controls: [
          { type: "dropdown", id: "picture.position", label: "Position", icon: "position", size: "large", options: POSITION_OPTS },
          { type: "dropdown", id: "picture.wrap", label: "Wrap Text", icon: "wrapText", size: "large", options: WRAP_OPTS() },
          ARRANGE_FORWARD,
          ARRANGE_BACKWARD,
          SELECTION_PANE,
          { type: "dropdown", id: "object.align", label: "Align", icon: "align", showLabel: true, options: ALIGN_OPTS.map((v) => ({ value: v })) },
          { type: "dropdown", id: "object.group", label: "Group", icon: "groupObjects", showLabel: true, options: [{ value: "Group" }, { value: "Ungroup", command: "object.ungroup" }] },
          { type: "dropdown", id: "picture.rotate", label: "Rotate", icon: "rotate", showLabel: true, options: ["Rotate Right 90°", "Rotate Left 90°", "Flip Vertical", "Flip Horizontal"].map((v) => ({ value: v })) },
        ],
      },
    ],
  },
  {
    id: "references",
    label: "References",
    groups: [
      {
        label: "Table of Contents",
        controls: [
          {
            type: "dropdown",
            id: "references.toc",
            label: "Table of Contents",
            icon: "toc",
            size: "large",
            gallery: "grid",
            options: ["Automatic Table 1", "Automatic Table 2", "Manual Table", "Custom Table of Contents...", "Remove Table of Contents"].map((v) => (v === "Custom Table of Contents..." ? { value: v, icon: "toc", dialog: "customToc" } : { value: v, icon: "toc" })),
          },
          { type: "dropdown", id: "references.addText", label: "Add Text", icon: "toc", showLabel: true, options: ["Do Not Show in Table of Contents", "Level 1", "Level 2", "Level 3"].map((v) => ({ value: v })) },
          { type: "button", id: "references.updateToc", label: "Update Table", icon: "reset", showLabel: true, dialog: "updateToc", tip: "Update Table (F9)" },
        ],
      },
      {
        label: "Footnotes",
        controls: [
          { type: "button", id: "references.footnote", label: "Insert Footnote", icon: "footnote", size: "large", shortcut: "Alt+Ctrl+F" },
          { type: "button", id: "references.endnote", label: "Insert Endnote", icon: "footnote", showLabel: true, shortcut: "Alt+Ctrl+D" },
          { type: "button", id: "references.nextFootnote", label: "Next Footnote", icon: "footnote", showLabel: true },
        ],
      },
      { label: "Research", controls: [{ type: "button", id: "references.smartLookup", label: "Search", icon: "smartLookup", size: "large" }, { type: "button", id: "references.researcher", label: "Researcher", icon: "researcher", size: "large" }] },
      {
        label: "Citations & Bibliography",
        controls: [
          { type: "dropdown", id: "references.citation", label: "Insert Citation", icon: "citation", size: "large", options: [{ value: "Add New Source...", dialog: "createSource" }, { value: "Add New Placeholder..." }] },
          { type: "button", id: "references.manageSources", label: "Manage Sources", icon: "folder", showLabel: true },
          { type: "dropdown", id: "references.citationStyle", label: "Style", icon: "styles", showLabel: true, options: ["APA", "Chicago", "MLA", "IEEE", "Harvard"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "references.bibliography", label: "Bibliography", icon: "toc", showLabel: true, options: ["Bibliography", "References", "Works Cited"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Captions",
        controls: [
          { type: "button", id: "references.caption", label: "Insert Caption", icon: "caption", size: "large" },
          { type: "button", id: "references.tableOfFigures", label: "Insert Table of Figures", icon: "toc", showLabel: true },
          { type: "button", id: "insert.crossRef", label: "Cross-reference", icon: "link", showLabel: true, dialog: "crossRef" },
        ],
      },
      { label: "Index", controls: [{ type: "button", id: "references.markEntry", label: "Mark Entry", icon: "pen", size: "large" }, { type: "button", id: "references.index", label: "Insert Index", icon: "toc", showLabel: true }] },
    ],
  },
  {
    id: "mailings",
    label: "Mailings",
    groups: [
      { label: "Create", controls: [{ type: "button", id: "mail.envelopes", label: "Envelopes", icon: "envelope", size: "large" }, { type: "button", id: "mail.labels", label: "Labels", icon: "envelope", size: "large" }] },
      {
        label: "Start Mail Merge",
        controls: [
          { type: "dropdown", id: "mail.start", label: "Start Mail Merge", icon: "mailMerge", size: "large", options: ["Letters", "E-mail Messages", "Envelopes...", "Labels...", "Directory", "Normal Word Document", "Step-by-Step Mail Merge Wizard..."].map((v) => ({ value: v })) },
          { type: "dropdown", id: "mail.recipients", label: "Select Recipients", icon: "recipients", size: "large", options: [{ value: "Type a New List..." }, { value: "Use an Existing List...", dialog: "selectRecipients" }, { value: "Choose from Outlook Contacts..." }] },
          // Opens Mail Merge Recipients: a checkbox per recipient, plus Filter Records and Sort Records.
          { type: "button", id: "mail.editRecipients", label: "Edit Recipient List", icon: "recipients", size: "large", dialog: "editRecipients" },
        ],
      },
      {
        label: "Write & Insert Fields",
        controls: [
          { type: "button", id: "mail.highlightFields", label: "Highlight Merge Fields", icon: "highlight", size: "large" },
          { type: "button", id: "mail.addressBlock", label: "Address Block", icon: "envelope", size: "large" },
          { type: "button", id: "mail.greetingLine", label: "Greeting Line", icon: "comment", size: "large" },
          { type: "dropdown", id: "mail.insertField", label: "Insert Merge Field", icon: "field", size: "large", options: ["First_Name", "Last_Name", "Address", "City", "State", "ZIP", "Appointment_Date", "Appointment_Time", "Provider"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Preview Results",
        controls: [
          { type: "toggle", id: "mail.preview", label: "Preview Results", icon: "preview", size: "large" },
          { type: "button", id: "mail.prev", label: "Previous Record", icon: "undo", showLabel: true },
          { type: "button", id: "mail.next", label: "Next Record", icon: "redo", showLabel: true },
          { type: "button", id: "mail.checkErrors", label: "Check for Errors", icon: "checkIssues", showLabel: true },
        ],
      },
      { label: "Finish", controls: [{ type: "dropdown", id: "mail.finish", label: "Finish & Merge", icon: "mailMerge", size: "large", options: ["Edit Individual Documents...", "Print Documents...", "Send Email Messages..."].map((v) => ({ value: v })) }] },
    ],
  },
  {
    id: "review",
    label: "Review",
    groups: [
      {
        label: "Proofing",
        controls: [
          { type: "button", id: "review.spelling", label: "Spelling & Grammar", icon: "spelling", size: "large", shortcut: "F7" },
          { type: "button", id: "review.thesaurus", label: "Thesaurus", icon: "thesaurus", showLabel: true, shortcut: "Shift+F7" },
          { type: "button", id: "review.wordCount", label: "Word Count", icon: "wordCount", showLabel: true },
        ],
      },
      { label: "Speech", controls: [{ type: "button", id: "review.readAloud", label: "Read Aloud", icon: "readAloud", size: "large" }] },
      { label: "Accessibility", controls: [{ type: "dropdown", id: "review.accessibility", label: "Check Accessibility", icon: "accessibility", size: "large", split: true, options: [{ value: "Check Accessibility" }, { value: "Alt Text", dialog: "altText" }, { value: "Accessibility Assistant" }] }] },
      { label: "Language", controls: [{ type: "dropdown", id: "review.translate", label: "Translate", icon: "translate", size: "large", options: [{ value: "Translate Selection" }, { value: "Translate Document" }] }, { type: "dropdown", id: "review.language", label: "Language", icon: "translate", size: "large", options: [{ value: "Set Proofing Language..." }, { value: "Language Preferences..." }] }] },
      {
        label: "Comments",
        controls: [
          { type: "button", id: "review.newComment", label: "New Comment", icon: "comment", size: "large", dialog: "newComment", shortcut: "Ctrl+Alt+M" },
          { type: "dropdown", id: "review.deleteComment", label: "Delete", icon: "reject", showLabel: true, split: true, faceValue: "Delete", options: [{ value: "Delete" }, { value: "Delete All Comments in Document" }] },
          { type: "button", id: "review.prevComment", label: "Previous", icon: "undo", showLabel: true },
          { type: "button", id: "review.nextComment", label: "Next", icon: "redo", showLabel: true },
          { type: "button", id: "review.resolveComment", label: "Resolve", icon: "accept", showLabel: true },
          { type: "button", id: "review.showComments", label: "Show Comments", icon: "comment", showLabel: true },
        ],
      },
      {
        label: "Tracking",
        controls: [
          { type: "toggle", id: "review.trackChanges", label: "Track Changes", icon: "trackChanges", size: "large", shortcut: "Ctrl+Shift+E" },
          { type: "dropdown", id: "review.markup", label: "Display for Review", icon: "trackChanges", combo: true, width: 112, stateKey: "review.markupLabel", options: ["Simple Markup", "All Markup", "No Markup", "Original"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "review.showMarkup", label: "Show Markup", icon: "comment", showLabel: true, options: ["Comments", "Insertions and Deletions", "Formatting", "Balloons"].map((v) => ({ value: v })) },
          { type: "button", id: "review.reviewingPane", label: "Reviewing Pane", icon: "navPane", showLabel: true },
        ],
      },
      {
        label: "Changes",
        controls: [
          { type: "dropdown", id: "review.accept", label: "Accept", icon: "accept", size: "large", split: true, faceValue: "Accept and Move to Next", options: ["Accept and Move to Next", "Accept This Change", "Accept All Changes", "Accept All Changes and Stop Tracking"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "review.reject", label: "Reject", icon: "reject", showLabel: true, split: true, faceValue: "Reject and Move to Next", options: ["Reject and Move to Next", "Reject Change", "Reject All Changes", "Reject All Changes and Stop Tracking"].map((v) => ({ value: v })) },
          { type: "button", id: "review.prevChange", label: "Previous", icon: "undo", showLabel: true },
          { type: "button", id: "review.nextChange", label: "Next", icon: "redo", showLabel: true },
        ],
      },
      { label: "Compare", controls: [{ type: "dropdown", id: "review.compare", label: "Compare", icon: "compare", size: "large", options: [{ value: "Compare..." }, { value: "Combine..." }] }] },
      { label: "Protect", controls: [{ type: "button", id: "review.restrict", label: "Restrict Editing", icon: "protect", size: "large" }] },
    ],
  },
  {
    id: "view",
    label: "View",
    groups: [
      {
        label: "Views",
        controls: [
          { type: "toggle", id: "view.mode.read", label: "Read Mode", icon: "readMode", size: "large", stateKey: "view.read" },
          { type: "toggle", id: "view.mode.print", label: "Print Layout", icon: "printLayout", size: "large", stateKey: "view.print" },
          { type: "toggle", id: "view.mode.web", label: "Web Layout", icon: "webLayout", size: "large", stateKey: "view.web" },
          { type: "toggle", id: "view.mode.outline", label: "Outline", icon: "outline", showLabel: true, stateKey: "view.outline" },
          { type: "toggle", id: "view.mode.draft", label: "Draft", icon: "printLayout", showLabel: true, stateKey: "view.draft" },
        ],
      },
      { label: "Immersive", controls: [{ type: "button", id: "view.focus", label: "Focus", icon: "onePage", size: "large" }, { type: "button", id: "view.immersive", label: "Immersive Reader", icon: "readMode", size: "large" }] },
      { label: "Page Movement", controls: [{ type: "toggle", id: "view.vertical", label: "Vertical", icon: "onePage", size: "large" }, { type: "toggle", id: "view.sideToSide", label: "Side to Side", icon: "multiplePages", size: "large" }] },
      {
        label: "Show",
        controls: [
          { type: "toggle", id: "view.ruler", label: "Ruler", icon: "ruler", showLabel: true },
          { type: "toggle", id: "view.gridlines", label: "Gridlines", icon: "gridlines", showLabel: true },
          { type: "toggle", id: "view.navPane", label: "Navigation Pane", icon: "navPane", showLabel: true },
        ],
      },
      {
        label: "Zoom",
        controls: [
          { type: "button", id: "view.zoomDialog", label: "Zoom", icon: "zoom", size: "large", dialog: "zoom" },
          { type: "button", id: "view.zoomTo", label: "100%", icon: "zoom", size: "large" },
          { type: "button", id: "view.onePage", label: "One Page", icon: "onePage", showLabel: true },
          { type: "button", id: "view.multiplePages", label: "Multiple Pages", icon: "multiplePages", showLabel: true },
          { type: "button", id: "view.pageWidth", label: "Page Width", icon: "pageWidth", showLabel: true },
        ],
      },
      {
        label: "Window",
        controls: [
          { type: "button", id: "view.newWindow", label: "New Window", icon: "newWindow", size: "large" },
          { type: "button", id: "view.arrangeAll", label: "Arrange All", icon: "multiplePages", size: "large" },
          { type: "button", id: "view.split", label: "Split", icon: "split", size: "large" },
          { type: "button", id: "view.sideBySide", label: "View Side by Side", icon: "compare", showLabel: true },
        ],
      },
      { label: "Macros", controls: [{ type: "dropdown", id: "view.macros", label: "Macros", icon: "macros", size: "large", options: [{ value: "View Macros" }, { value: "Record Macro..." }] }] },
    ],
  },
  {
    // Word shows this tab once File › Options › Customize Ribbon › Developer is checked; the sim always shows it.
    id: "developer",
    label: "Developer",
    groups: [
      {
        label: "Code",
        controls: [
          { type: "button", id: "developer.visualBasic", label: "Visual Basic", icon: "macros", size: "large" },
          { type: "dropdown", id: "view.macros", label: "Macros", icon: "macros", size: "large", options: [{ value: "View Macros" }, { value: "Record Macro..." }] },
        ],
      },
      { label: "Add-ins", controls: [{ type: "button", id: "developer.addIns", label: "Word Add-ins", icon: "addIns", size: "large" }] },
      {
        label: "Controls",
        controls: [
          { type: "button", id: "developer.richText", label: "Rich Text Content Control", icon: "textbox", tip: "Rich Text Content Control: formatted text, several paragraphs" },
          { type: "button", id: "developer.plainText", label: "Plain Text Content Control", icon: "field", tip: "Plain Text Content Control: one line of plain text" },
          { type: "button", id: "developer.picture", label: "Picture Content Control", icon: "picture" },
          { type: "button", id: "developer.checkBox", label: "Check Box Content Control", icon: "accept" },
          { type: "button", id: "developer.comboBox", label: "Combo Box Content Control", icon: "select" },
          { type: "button", id: "developer.dropDown", label: "Drop-Down List Content Control", icon: "select" },
          { type: "button", id: "developer.datePicker", label: "Date Picker Content Control", icon: "date" },
          { type: "button", id: "developer.legacyTools", label: "Legacy Tools", icon: "options" },
          { type: "toggle", id: "developer.designMode", label: "Design Mode", icon: "pen", showLabel: true },
          { type: "button", id: "developer.properties", label: "Properties", icon: "options", showLabel: true, dialog: "controlProperties" },
        ],
      },
      { label: "Mapping", controls: [{ type: "button", id: "developer.xmlMapping", label: "XML Mapping Pane", icon: "navPane", size: "large" }] },
      {
        label: "Protect",
        controls: [
          { type: "button", id: "developer.blockAuthors", label: "Block Authors", icon: "protect", size: "large" },
          { type: "button", id: "review.restrict", label: "Restrict Editing", icon: "protect", size: "large" },
        ],
      },
      { label: "Templates", controls: [{ type: "button", id: "developer.documentTemplate", label: "Document Template", icon: "new", size: "large" }] },
    ],
  },
  {
    id: "help",
    label: "Help",
    groups: [
      { label: "Help", controls: [{ type: "button", id: "help.help", label: "Help", icon: "help", size: "large", shortcut: "F1" }, { type: "button", id: "help.contact", label: "Contact Support", icon: "comment", size: "large" }, { type: "button", id: "help.feedback", label: "Feedback", icon: "comment", size: "large" }, { type: "button", id: "help.training", label: "Show Training", icon: "video", size: "large" }] },
    ],
  },
  /* ---------------- Contextual tabs ---------------- */
  {
    id: "headerFooter",
    label: "Header & Footer",
    contextual: "header",
    groups: [
      {
        label: "Header & Footer",
        controls: [
          { type: "dropdown", id: "insert.header", label: "Header", icon: "header", size: "large", options: ["Blank", "Blank (Three Columns)", "Austin", "Remove Header"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "insert.footer", label: "Footer", icon: "footer", size: "large", options: ["Blank", "Blank (Three Columns)", "Austin", "Remove Footer"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "insert.pageNumber", label: "Page Number", icon: "pageNumber", size: "large", options: PAGE_NUMBER_OPTS },
        ],
      },
      { label: "Insert", controls: [{ type: "button", id: "insert.dateTime", label: "Date & Time", icon: "date", size: "large", dialog: "dateTime" }, { type: "button", id: "header.docInfo", label: "Document Info", icon: "info", size: "large" }, { type: "button", id: "insert.pictures.header", label: "Pictures", icon: "picture", size: "large" }] },
      { label: "Navigation", controls: [{ type: "button", id: "header.gotoHeader", label: "Go to Header", icon: "header", size: "large" }, { type: "button", id: "header.gotoFooter", label: "Go to Footer", icon: "footer", size: "large" }] },
      { label: "Options", controls: [{ type: "toggle", id: "header.differentFirst", label: "Different First Page", showLabel: true }, { type: "toggle", id: "header.differentOddEven", label: "Different Odd & Even Pages", showLabel: true }, { type: "toggle", id: "header.showDocText", label: "Show Document Text", showLabel: true }] },
      { label: "Close", controls: [{ type: "button", id: "header.close", label: "Close Header and Footer", icon: "close", size: "large" }] },
    ],
  },
  {
    id: "tableDesign",
    label: "Table Design",
    contextual: "table",
    groups: [
      {
        label: "Table Style Options",
        controls: [
          { type: "toggle", id: "table.headerRow", label: "Header Row", showLabel: true },
          { type: "toggle", id: "table.totalRow", label: "Total Row", showLabel: true },
          { type: "toggle", id: "table.bandedRows", label: "Banded Rows", showLabel: true },
          { type: "toggle", id: "table.firstColumn", label: "First Column", showLabel: true },
          { type: "toggle", id: "table.lastColumn", label: "Last Column", showLabel: true },
          { type: "toggle", id: "table.bandedColumns", label: "Banded Columns", showLabel: true },
        ],
      },
      { label: "Table Styles", controls: [{ type: "gallery", id: "table.style", label: "Table Styles", options: TABLE_STYLES.map((s) => ({ value: s, label: s, color: TABLE_STYLE_COLORS[s] })), width: 340 }, { type: "dropdown", id: "table.shading", label: "Shading", icon: "shading", size: "large", gallery: "swatches", options: colorOpts() }] },
      { label: "Borders", controls: [{ type: "dropdown", id: "table.borders", label: "Borders", icon: "borders", size: "large", options: ["All Borders", "Outside Borders", "Inside Borders", "No Border"].map((v) => ({ value: v })) }] },
    ],
  },
  {
    id: "tableLayout",
    label: "Table Layout",
    contextual: "table",
    groups: [
      { label: "Table", controls: [{ type: "dropdown", id: "table.select", label: "Select", icon: "select", showLabel: true, options: ["Select Cell", "Select Column", "Select Row", "Select Table"].map((v) => ({ value: v })) }, { type: "toggle", id: "table.gridlines", label: "View Gridlines", icon: "gridlines", showLabel: true }, { type: "button", id: "table.properties", label: "Properties", icon: "options", showLabel: true }] },
      { label: "Rows & Columns", controls: [
        { type: "dropdown", id: "table.delete", label: "Delete", icon: "deleteCells", size: "large", options: ["Delete Cells...", "Delete Columns", "Delete Rows", "Delete Table"].map((v) => ({ value: v })) },
        { type: "button", id: "table.insertAbove", label: "Insert Above", icon: "insertCells", size: "large" },
        { type: "button", id: "table.insertBelow", label: "Insert Below", icon: "insertCells", showLabel: true },
        { type: "button", id: "table.insertLeft", label: "Insert Left", icon: "insertCells", showLabel: true },
        { type: "button", id: "table.insertRight", label: "Insert Right", icon: "insertCells", showLabel: true },
      ] },
      { label: "Merge", controls: [{ type: "button", id: "table.merge", label: "Merge Cells", icon: "merge", showLabel: true }, { type: "button", id: "table.split", label: "Split Cells", icon: "split", showLabel: true }, { type: "button", id: "table.splitTable", label: "Split Table", icon: "split", showLabel: true }] },
      { label: "Cell Size", controls: [{ type: "dropdown", id: "table.autofit", label: "AutoFit", icon: "pageWidth", showLabel: true, options: ["AutoFit Contents", "AutoFit Window", "Fixed Column Width"].map((v) => ({ value: v })) }, { type: "button", id: "table.distributeColumns", label: "Distribute Columns", icon: "columns", showLabel: true }] },
      { label: "Alignment", controls: [{ type: "dropdown", id: "table.alignment", label: "Cell Alignment", icon: "alignCenter", size: "large", options: ["Align Top Left", "Align Center", "Align Center Left", "Align Bottom Right"].map((v) => ({ value: v })) }, { type: "button", id: "table.textDirection", label: "Text Direction", icon: "orientation", size: "large" }] },
      { label: "Data", controls: [{ type: "dropdown", id: "table.sort", label: "Sort", icon: "sort", size: "large", options: ["Ascending", "Descending"].map((v) => ({ value: v })) }, { type: "toggle", id: "table.repeatHeader", label: "Repeat Header Rows", icon: "table", showLabel: true }, { type: "button", id: "table.convertToText", label: "Convert to Text", icon: "new", showLabel: true }, { type: "button", id: "table.formula", label: "Formula", icon: "fx", showLabel: true }] },
    ],
  },
  {
    id: "pictureFormat",
    label: "Picture Format",
    contextual: "picture",
    groups: [
      { label: "Adjust", controls: [
        { type: "button", id: "picture.removeBackground", label: "Remove Background", icon: "removeBg", size: "large" },
        { type: "dropdown", id: "picture.corrections", label: "Corrections", icon: "corrections", size: "large", options: ["Sharpen: 25%", "Brightness: +20% Contrast: 0%", "Brightness: 0% Contrast: +20%"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "picture.color", label: "Color", icon: "colors", size: "large", options: ["Saturation: 0%", "Grayscale", "Sepia", "Washout"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "picture.artistic", label: "Artistic Effects", icon: "effects", size: "large", options: ["None", "Pencil Sketch", "Blur", "Paint Brush"].map((v) => ({ value: v })) },
        { type: "button", id: "picture.compress", label: "Compress Pictures", icon: "picture", showLabel: true, dialog: "compressPictures" },
        { type: "button", id: "picture.change", label: "Change Picture", icon: "picture", showLabel: true },
        { type: "button", id: "picture.reset", label: "Reset Picture", icon: "reset", showLabel: true },
      ] },
      { label: "Picture Styles", controls: [
        { type: "gallery", id: "picture.style", label: "Picture Styles", options: ["Simple Frame, White", "Beveled Matte, White", "Drop Shadow Rectangle", "Rounded Diagonal Corner, White", "Reflected Rounded Rectangle", "Soft Edge Rectangle", "Center Shadow Rectangle", "Metal Frame"].map((v) => ({ value: v, label: v })), width: 300 },
        { type: "dropdown", id: "picture.border", label: "Picture Border", icon: "pageBorders", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Outline", label: "No Outline" }]) },
        { type: "dropdown", id: "picture.effects", label: "Picture Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges", "Bevel"].map((v) => ({ value: v })) },
      ] },
      { label: "Accessibility", controls: [{ type: "button", id: "picture.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      { label: "Arrange", controls: [
        { type: "dropdown", id: "picture.position", label: "Position", icon: "position", size: "large", options: POSITION_OPTS },
        { type: "dropdown", id: "picture.wrap", label: "Wrap Text", icon: "wrapText", size: "large", options: WRAP_OPTS() },
        ARRANGE_FORWARD,
        ARRANGE_BACKWARD,
        SELECTION_PANE,
        { type: "dropdown", id: "object.align", label: "Align", icon: "align", showLabel: true, options: ALIGN_OPTS.map((v) => ({ value: v })) },
        { type: "dropdown", id: "picture.rotate", label: "Rotate", icon: "rotate", showLabel: true, options: ["Rotate Right 90°", "Rotate Left 90°", "Flip Vertical", "Flip Horizontal"].map((v) => ({ value: v })) },
      ] },
      { label: "Size", controls: [
        {
          type: "dropdown",
          id: "picture.crop",
          label: "Crop",
          icon: "crop",
          size: "large",
          split: true,
          faceValue: "Crop",
          options: [
            { value: "Crop", icon: "crop" },
            { value: "Crop to Shape", heading: true },
            ...["Rectangle", "Rounded Rectangle", "Oval", "Diamond", "Hexagon", "Double Wave"].map((v) => ({ value: v, icon: "shapes" })),
            { value: "Aspect Ratio", heading: true },
            ...["1:1", "2:3", "3:4", "4:3", "16:9"].map((v) => ({ value: v })),
            { value: "Fill" },
            { value: "Fit" },
          ],
        },
        { type: "dropdown", id: "picture.width", label: "Width", combo: true, width: 60, options: ["1", "2", "3", "4", "5", "6"].map((v) => ({ value: v, label: `${v}"` })) },
      ] },
    ],
  },
  {
    id: "shapeFormat",
    label: "Shape Format",
    contextual: "shape",
    groups: [
      {
        label: "Insert Shapes",
        controls: [
          { type: "dropdown", id: "insert.shape", label: "Shapes", icon: "shapes", size: "large", options: ["Rectangle", "Rounded Rectangle", "Oval", "Diamond", "Right Arrow", "Down Arrow", "Flowchart: Process", "Flowchart: Decision", "Star: 5 Points"].map((v) => ({ value: v })) },
          {
            type: "dropdown",
            id: "shape.change",
            label: "Edit Shape",
            icon: "shapes",
            showLabel: true,
            options: [{ value: "Change Shape", heading: true }, ...["Rectangle", "Rounded Rectangle", "Oval", "Diamond", "Triangle", "Right Arrow", "Down Arrow", "Flowchart: Process", "Flowchart: Decision", "Flowchart: Terminator", "Star: 5 Points", "Speech Bubble: Rectangle"].map((v) => ({ value: v, icon: "shapes" }))],
          },
          { type: "button", id: "insert.textBox", label: "Draw Text Box", icon: "textbox", showLabel: true },
        ],
      },
      { label: "Shape Styles", controls: [
        { type: "gallery", id: "shape.style", label: "Shape Styles", options: ["Colored Fill - Blue, Accent 1", "Colored Fill - Orange, Accent 2", "Subtle Effect - Blue, Accent 1", "Intense Effect - Green, Accent 6"].map((v) => ({ value: v, label: v })), width: 260 },
        { type: "dropdown", id: "shape.fill", label: "Shape Fill", icon: "fill", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Fill", label: "No Fill" }]) },
        { type: "dropdown", id: "shape.outline", label: "Shape Outline", icon: "pen", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Outline", label: "No Outline" }]) },
        { type: "dropdown", id: "shape.effects", label: "Shape Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges", "Bevel"].map((v) => ({ value: v })) },
      ] },
      { label: "WordArt Styles", controls: [{ type: "dropdown", id: "shape.textFill", label: "Text Fill", icon: "fontColor", showLabel: true, gallery: "swatches", options: colorOpts() }] },
      { label: "Accessibility", controls: [{ type: "button", id: "picture.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      { label: "Arrange", controls: [
        { type: "dropdown", id: "shape.position", label: "Position", icon: "position", size: "large", options: POSITION_OPTS },
        { type: "dropdown", id: "shape.wrap", label: "Wrap Text", icon: "wrapText", size: "large", options: WRAP_OPTS() },
        ARRANGE_FORWARD,
        ARRANGE_BACKWARD,
        SELECTION_PANE,
        { type: "dropdown", id: "object.align", label: "Align", icon: "align", showLabel: true, options: ALIGN_OPTS.map((v) => ({ value: v })) },
        { type: "dropdown", id: "object.group", label: "Group", icon: "groupObjects", showLabel: true, options: [{ value: "Group" }, { value: "Ungroup", command: "object.ungroup" }] },
        { type: "dropdown", id: "shape.rotate", label: "Rotate", icon: "rotate", showLabel: true, options: ["Rotate Right 90°", "Rotate Left 90°", "Flip Vertical", "Flip Horizontal"].map((v) => ({ value: v })) },
      ] },
      { label: "Size", controls: [{ type: "dropdown", id: "shape.width", label: "Width", combo: true, width: 60, options: ["1", "2", "3", "4", "5"].map((v) => ({ value: v, label: `${v}"` })) }] },
    ],
  },
  {
    id: "chartDesign",
    label: "Chart Design",
    contextual: "chart",
    groups: [
      { label: "Chart Layouts", controls: [{ type: "dropdown", id: "chart.addElement", label: "Add Chart Element", icon: "chart", size: "large", options: ["Axes", "Axis Titles", "Chart Title", "Data Labels", "Data Table", "Gridlines", "Legend"].map((v) => ({ value: v })) }, { type: "dropdown", id: "chart.layout", label: "Quick Layout", icon: "layout", size: "large", options: ["Layout 1", "Layout 2", "Layout 3", "Layout 5"].map((v) => ({ value: v })) }] },
      { label: "Chart Styles", controls: [{ type: "dropdown", id: "chart.colors", label: "Change Colors", icon: "colors", size: "large", options: ["Colorful Palette 1", "Colorful Palette 2", "Monochromatic Palette 1"].map((v) => ({ value: v })) }, { type: "gallery", id: "chart.style", label: "Chart Styles", options: ["Style 1", "Style 2", "Style 3", "Style 4", "Style 5", "Style 6"].map((v) => ({ value: v, label: v })), width: 260 }] },
      { label: "Data", controls: [{ type: "button", id: "chart.switchRowCol", label: "Switch Row/Column", icon: "orientation", size: "large" }, { type: "button", id: "chart.selectData", label: "Select Data", icon: "sheet", size: "large" }, { type: "button", id: "chart.editData", label: "Edit Data", icon: "sheet", size: "large" }] },
      { label: "Type", controls: [{ type: "dropdown", id: "chart.type", label: "Change Chart Type", icon: "chart", size: "large", options: ["Clustered Column", "Clustered Bar", "Line", "Pie", "Doughnut", "Area"].map((v) => ({ value: v })) }] },
    ],
  },
];

/** Normalise the three view toggles to one command id + value. */
export const VIEW_ALIASES: Record<string, string> = {
  "view.mode.read": "Read Mode",
  "view.mode.print": "Print Layout",
  "view.mode.web": "Web Layout",
  "view.mode.outline": "Outline",
  "view.mode.draft": "Draft",
};
