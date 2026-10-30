import type { DialogDef, PptDeck, RibbonOption, RibbonTab } from "@/types/sim";
import { THEME_COLORS } from "../../chrome/colors";
import { ANIMATIONS, EMPHASIS, EXITS, LAYOUTS, PPT_THEMES, PPT_THEME_NAMES, TABLE_STYLES, TRANSITIONS, deckLayouts, layoutName, tableStyleSwatch, variantAccent } from "./model";
import { readMaster, AUDIO_FILES, BACKGROUND_STYLES, BULLET_STYLES, COLOR_SETS, EFFECT_SETS, FONT_SETS, GRAPHIC_STYLES, ICONS, NUMBER_FORMATS, ONLINE_PICTURES, PASTE_SPECIAL_FORMATS, PICTURE_FILES, SCREEN_WINDOWS, STOCK_IMAGES, VIDEO_FILES } from "./ext";

const FONTS = ["Aptos", "Aptos Display", "Arial", "Calibri", "Calibri Light", "Cambria", "Candara", "Century Gothic", "Corbel", "Franklin Gothic Book", "Garamond", "Georgia", "Gill Sans MT", "Segoe UI", "Tahoma", "Times New Roman", "Trebuchet MS", "Tw Cen MT", "Verdana"];
const SIZES = ["10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "40", "44", "48", "54", "60", "72", "96"];

const colorOpts = (extra: RibbonOption[] = []): RibbonOption[] => [
  ...extra,
  { value: "Theme Colors", heading: true },
  ...THEME_COLORS.slice(0, 10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
  { value: "Standard Colors", heading: true },
  ...THEME_COLORS.slice(10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
];

const layoutOpts: RibbonOption[] = LAYOUTS.map((l) => ({ value: l, icon: "layout" }));
const SHAPES = ["Rectangle", "Rectangle: Rounded Corners", "Oval", "Isosceles Triangle", "Diamond", "Arrow: Right", "Star: 5 Points", "Folded Corner", "Sun", "Heart", "Flowchart: Process", "Flowchart: Decision", "Speech Bubble: Rectangle", "Callout"];
const shapeOpts = (command?: string): RibbonOption[] => SHAPES.map((v) => ({ value: v, icon: "shapes", command }));
const SHAPE_STYLES = ["Colored Fill - Blue, Accent 1", "Colored Fill - Orange, Accent 2", "Colored Fill - Gold, Accent 4", "Subtle Effect - Green, Accent 6", "Moderate Effect - Gold, Accent 4", "Intense Effect - Blue, Accent 1", "Intense Effect - Gold, Accent 4"];
const PICTURE_STYLES = ["Simple Frame, White", "Simple Frame, Black", "Drop Shadow Rectangle", "Rounded Diagonal Corner, White", "Reflected Rounded Rectangle", "Soft Edge Oval", "Beveled Oval, Black", "Metal Frame"];
const VIDEO_STYLES = ["Simple Frame, White", "Simple Frame, Black", "Rounded Diagonal Corner, Gradient", "Soft Edge Rectangle", "Beveled Rounded Rectangle", "Monitor, Gray", "Reflected Bevel, Black"];
const SMARTART_LAYOUTS = ["Vertical Bullet List", "Basic Block List", "Basic Process", "Step Up Process", "Basic Cycle", "Hierarchy", "Continuous Block Process", "Basic Venn"];
const CHART_TYPES = ["Clustered Column", "Stacked Column", "Clustered Bar", "Line", "Line with Markers", "Pie", "Doughnut", "Area"];
const tableSizes: RibbonOption[] = [];
for (let r = 2; r <= 6; r++) for (let c = 2; c <= 6; c++) tableSizes.push({ value: `${c}x${r}`, label: `${c}×${r} Table`, icon: "table" });

const pictureOptions: RibbonOption[] = [
  { value: "Insert Picture From", heading: true },
  { value: "This Device...", dialog: "insertPicture", icon: "picture" },
  { value: "Stock Images...", dialog: "stockImages", icon: "onlinePicture" },
  { value: "Online Pictures...", dialog: "onlinePictures", icon: "onlinePicture" },
];

const arrangeOpts: RibbonOption[] = [
  { value: "Order Objects", heading: true },
  { value: "Bring to Front", command: "object.bringToFront" },
  { value: "Send to Back", command: "object.sendToBack" },
  { value: "Bring Forward", command: "object.bringForward" },
  { value: "Send Backward", command: "object.sendBackward" },
  { value: "Group Objects", heading: true },
  { value: "Group", command: "object.group" },
  { value: "Ungroup", command: "object.ungroup" },
  { value: "Position Objects", heading: true },
  { value: "Align Left", command: "object.align" },
  { value: "Align Center", command: "object.align" },
  { value: "Align Right", command: "object.align" },
  { value: "Align Top", command: "object.align" },
  { value: "Align Middle", command: "object.align" },
  { value: "Align Bottom", command: "object.align" },
  { value: "Distribute Horizontally", command: "object.align" },
  { value: "Distribute Vertically", command: "object.align" },
  { value: "Align to Slide", command: "object.align" },
  { value: "Align Selected Objects", command: "object.align" },
  { value: "Rotate Right 90°", command: "object.rotate" },
  { value: "Rotate Left 90°", command: "object.rotate" },
  { value: "Selection Pane...", command: "view.selectionPane" },
];
const alignOpts: RibbonOption[] = ["Align Left", "Align Center", "Align Right", "Align Top", "Align Middle", "Align Bottom", "Distribute Horizontally", "Distribute Vertically", "Align to Slide", "Align Selected Objects"].map((v) => ({ value: v }));
const rotateOpts: RibbonOption[] = [...["Rotate Right 90°", "Rotate Left 90°", "Flip Vertical", "Flip Horizontal"].map((v) => ({ value: v })), { value: "More Rotation Options...", dialog: "rotation" }];
const SIZE_IN = ["1", "1.5", "2", "2.5", "3", "4", "5", "6", "8", "10"];
const sizeGroup = (extra: RibbonTab["groups"][number]["controls"] = []): RibbonTab["groups"][number] => ({
  label: "Size",
  launcher: "rotation",
  controls: [
    ...extra,
    { type: "dropdown", id: "object.height", label: "Height", combo: true, width: 64, options: SIZE_IN.map((v) => ({ value: v, label: `${v}"` })) },
    { type: "dropdown", id: "object.size", label: "Width", combo: true, width: 64, options: SIZE_IN.map((v) => ({ value: v, label: `${v}"` })) },
  ],
});
const arrangeGroup: RibbonTab["groups"][number] = {
  label: "Arrange",
  controls: [
    { type: "dropdown", id: "object.bringForward", label: "Bring Forward", icon: "bringForward", showLabel: true, split: true, options: [{ value: "Bring Forward", command: "object.bringForward" }, { value: "Bring to Front", command: "object.bringToFront" }] },
    { type: "dropdown", id: "object.sendBackward", label: "Send Backward", icon: "sendBackward", showLabel: true, split: true, options: [{ value: "Send Backward", command: "object.sendBackward" }, { value: "Send to Back", command: "object.sendToBack" }] },
    { type: "toggle", id: "view.selectionPane", label: "Selection Pane", icon: "navPane", showLabel: true },
    { type: "dropdown", id: "object.align", label: "Align", icon: "align", showLabel: true, options: alignOpts },
    { type: "dropdown", id: "object.group", label: "Group", icon: "groupObjects", showLabel: true, options: [{ value: "Group" }, { value: "Ungroup", command: "object.ungroup" }] },
    { type: "dropdown", id: "object.rotate", label: "Rotate", icon: "rotate", showLabel: true, options: rotateOpts },
  ],
};

// Each Variants thumbnail shows the accent its variant applies (pptRibbonFor redraws them for the theme in use).
const variantOpts: RibbonOption[] = [
  ...[1, 2, 3, 4].map((v) => ({ value: String(v), label: `Variant ${v}`, color: variantAccent("Office Theme", v) })),
  { value: "Colors", heading: true },
  ...COLOR_SETS.map((c) => ({ value: c.name, label: c.name, color: c.accent, command: "design.colors" })),
  { value: "Customize Colors...", label: "Customize Colors...", icon: "colors", dialog: "customizeColors" },
  { value: "Fonts", heading: true },
  ...FONT_SETS.map((f) => ({ value: f.name, label: `${f.name} (${f.heading}/${f.body})`, icon: "fonts", command: "design.fonts", preview: { font: f.heading } })),
  { value: "Customize Fonts...", label: "Customize Fonts...", icon: "fonts", dialog: "customizeFonts" },
  { value: "Effects", heading: true },
  ...EFFECT_SETS.map((e) => ({ value: e, label: e, icon: "effects", command: "design.effects" })),
  { value: "Background Styles", heading: true },
  ...BACKGROUND_STYLES.map((b) => ({ value: b.name, label: b.name, color: b.color, command: "design.backgroundStyle" })),
  { value: "Format Background...", label: "Format Background...", icon: "background", dialog: "formatBackground" },
];

/** Paste arrow: the Paste Options for slides, text and objects, then the chart options, then Paste Special. */
const pasteOpts: RibbonOption[] = [
  { value: "Paste Options:", heading: true },
  ...["Use Destination Theme", "Keep Source Formatting", "Picture", "Keep Text Only"].map((v) => ({ value: v, icon: "paste" })),
  { value: "Charts:", heading: true },
  ...["Use Destination Theme & Embed Workbook", "Keep Source Formatting & Embed Workbook", "Use Destination Theme & Link Data", "Keep Source Formatting & Link Data"].map((v) => ({ value: v, icon: v.includes("Link") ? "link" : "chart" })),
  { value: "Paste Special...", dialog: "pasteSpecial", icon: "paste" },
];

const mediaVolume: RibbonOption[] = ["Low", "Medium", "High", "Mute"].map((v) => ({ value: v }));
const mediaStart: RibbonOption[] = ["In Click Sequence", "Automatically", "When Clicked On"].map((v) => ({ value: v }));
const fadeOpts: RibbonOption[] = ["00.00", "00.50", "01.00", "02.00"].map((v) => ({ value: v }));

export const pptRibbon: RibbonTab[] = [
  {
    id: "home",
    label: "Home",
    groups: [
      {
        label: "Clipboard",
        // The launcher opens the Office Clipboard pane (the canvas turns the launcher click into
        // home.clipboardPane); from Search it opens the Clipboard as a dialog.
        launcher: "officeClipboard",
        controls: [
          { type: "dropdown", id: "home.paste", label: "Paste", icon: "paste", size: "large", split: true, options: pasteOpts },
          { type: "button", id: "home.cut", label: "Cut", icon: "cut", shortcut: "Ctrl+X", showLabel: true },
          { type: "button", id: "home.copy", label: "Copy", icon: "copy", shortcut: "Ctrl+C", showLabel: true },
          { type: "button", id: "home.formatPainter", label: "Format Painter", icon: "formatPainter", showLabel: true },
        ],
      },
      {
        label: "Slides",
        controls: [
          { type: "dropdown", id: "slides.new", label: "New Slide", icon: "newSlide", size: "large", split: true, faceValue: "Title and Content", gallery: "grid", options: [...layoutOpts, { value: "Duplicate Selected Slides", command: "slides.duplicate", icon: "copy" }] },
          { type: "dropdown", id: "slides.layout", label: "Layout", icon: "layout", showLabel: true, gallery: "grid", options: layoutOpts },
          { type: "button", id: "slides.reset", label: "Reset", icon: "reset", showLabel: true },
          { type: "dropdown", id: "slides.section", label: "Section", icon: "section", showLabel: true, options: [{ value: "Add Section", dialog: "addSection" }, { value: "Rename Section", dialog: "renameSection" }, { value: "Remove Section" }, { value: "Remove All Sections" }, { value: "Collapse All" }, { value: "Expand All" }] },
        ],
      },
      {
        label: "Font",
        launcher: "font",
        controls: [],
        rows: [
          [
            { type: "dropdown", id: "home.fontName", label: "Font", combo: true, width: 120, options: FONTS.map((f) => ({ value: f, preview: { font: f } })) },
            { type: "dropdown", id: "home.fontSize", label: "Font Size", combo: true, width: 44, options: SIZES.map((s) => ({ value: s })) },
            { type: "button", id: "home.growFont", label: "Increase Font Size", icon: "growFont", shortcut: "Ctrl+Shift+>" },
            { type: "button", id: "home.shrinkFont", label: "Decrease Font Size", icon: "shrinkFont", shortcut: "Ctrl+Shift+<" },
            { type: "button", id: "home.clearFormatting", label: "Clear All Formatting", icon: "clearFormat" },
          ],
          [
            { type: "toggle", id: "home.bold", label: "Bold", icon: "bold", shortcut: "Ctrl+B" },
            { type: "toggle", id: "home.italic", label: "Italic", icon: "italic", shortcut: "Ctrl+I" },
            { type: "toggle", id: "home.underline", label: "Underline", icon: "underline", shortcut: "Ctrl+U" },
            { type: "toggle", id: "home.shadow", label: "Text Shadow", icon: "wordart" },
            { type: "toggle", id: "home.strike", label: "Strikethrough", icon: "strike" },
            { type: "dropdown", id: "home.changeCase", label: "Change Case", icon: "changeCase", options: ["Sentence case.", "lowercase", "UPPERCASE", "Capitalize Each Word", "tOGGLE cASE"].map((v) => ({ value: v })) },
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
            { type: "dropdown", id: "home.bullets", label: "Bullets", icon: "bullets", split: true, options: [{ value: "None" }, ...BULLET_STYLES.map((b) => ({ value: b.value, label: `${b.glyph}  ${b.value}` })), { value: "Bullets and Numbering...", dialog: "bullets" }] },
            { type: "dropdown", id: "home.numbering", label: "Numbering", icon: "numbering", split: true, options: [{ value: "None" }, ...NUMBER_FORMATS.map((f) => ({ value: f })), { value: "Bullets and Numbering...", dialog: "numbering" }] },
            { type: "button", id: "home.indentDec", label: "Decrease List Level", icon: "indentDec", tip: "Decrease List Level (Shift+Tab)" },
            { type: "button", id: "home.indentInc", label: "Increase List Level", icon: "indentInc", tip: "Increase List Level (Tab)" },
            { type: "dropdown", id: "home.lineSpacing", label: "Line Spacing", icon: "lineSpacing", options: [...["1.0", "1.5", "2.0", "2.5", "3.0"].map((v) => ({ value: v })), { value: "Line Spacing Options...", dialog: "paragraph" }] },
          ],
          [
            { type: "toggle", id: "home.alignLeft", label: "Align Left", icon: "alignLeft", shortcut: "Ctrl+L" },
            { type: "toggle", id: "home.alignCenter", label: "Center", icon: "alignCenter", shortcut: "Ctrl+E" },
            { type: "toggle", id: "home.alignRight", label: "Align Right", icon: "alignRight", shortcut: "Ctrl+R" },
            { type: "toggle", id: "home.justify", label: "Justify", icon: "justify", shortcut: "Ctrl+J" },
            { type: "dropdown", id: "home.convertSmartArt", label: "Convert to SmartArt", icon: "smartart", options: [...SMARTART_LAYOUTS.slice(0, 7).map((v) => ({ value: v })), { value: "More SmartArt Graphics...", dialog: "convertSmartArt" }] },
          ],
        ],
      },
      {
        label: "Drawing",
        controls: [
          { type: "dropdown", id: "insert.shape", label: "Shapes", icon: "shapes", size: "large", gallery: "grid", options: shapeOpts() },
          { type: "dropdown", id: "home.arrange", label: "Arrange", icon: "bringForward", size: "large", options: arrangeOpts },
          { type: "dropdown", id: "shape.style", label: "Quick Styles", icon: "effects", size: "large", gallery: "grid", options: SHAPE_STYLES.map((v) => ({ value: v, icon: "shapes" })) },
          { type: "dropdown", id: "shape.fill", label: "Shape Fill", icon: "fill", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Fill", label: "No Fill" }]) },
          { type: "dropdown", id: "shape.outline", label: "Shape Outline", icon: "pen", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Outline", label: "No Outline" }]) },
          { type: "dropdown", id: "shape.effects", label: "Shape Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges", "Bevel", "3-D Rotation"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Editing",
        controls: [
          { type: "button", id: "home.find", label: "Find", icon: "find", showLabel: true, shortcut: "Ctrl+F", dialog: "find" },
          { type: "dropdown", id: "home.replace", label: "Replace", icon: "replace", showLabel: true, options: [{ value: "Replace...", dialog: "replace", icon: "replace" }, { value: "Replace Fonts...", dialog: "replaceFonts", icon: "fonts" }] },
          { type: "dropdown", id: "home.select", label: "Select", icon: "select", showLabel: true, options: [{ value: "Select All" }, { value: "Selection Pane..." }] },
        ],
      },
      { label: "Voice", controls: [{ type: "button", id: "home.dictate", label: "Dictate", icon: "dictate", size: "large" }] },
      { label: "Designer", controls: [{ type: "button", id: "design.designer", label: "Designer", icon: "designer", size: "large" }] },
    ],
  },
  {
    id: "insert",
    label: "Insert",
    groups: [
      { label: "Slides", controls: [{ type: "dropdown", id: "slides.new", label: "New Slide", icon: "newSlide", size: "large", split: true, faceValue: "Title and Content", gallery: "grid", options: layoutOpts }] },
      { label: "Tables", controls: [{ type: "dropdown", id: "insert.table", label: "Table", icon: "table", size: "large", gallery: "grid", options: [{ value: "Insert Table", heading: true }, ...tableSizes, { value: "Insert Table...", dialog: "insertTable", icon: "table" }] }] },
      {
        label: "Images",
        controls: [
          { type: "dropdown", id: "insert.pictures", label: "Pictures", icon: "picture", size: "large", options: pictureOptions },
          { type: "dropdown", id: "insert.screenshot", label: "Screenshot", icon: "picture", showLabel: true, options: [{ value: "Available Windows", heading: true }, ...SCREEN_WINDOWS.map((w) => ({ value: w, icon: "newWindow" })), { value: "Screen Clipping", icon: "crop" }] },
          { type: "button", id: "insert.photoAlbum", label: "Photo Album", icon: "picture", showLabel: true },
        ],
      },
      { label: "Camera", controls: [{ type: "button", id: "insert.cameo", label: "Cameo", icon: "video", size: "large" }] },
      {
        label: "Illustrations",
        controls: [
          { type: "dropdown", id: "insert.shape", label: "Shapes", icon: "shapes", size: "large", gallery: "grid", options: shapeOpts() },
          { type: "button", id: "insert.icons", label: "Icons", icon: "icons", size: "large", dialog: "insertIcons" },
          { type: "button", id: "insert.3d", label: "3D Models", icon: "shapes", size: "large" },
          { type: "button", id: "insert.smartArt", label: "SmartArt", icon: "smartart", size: "large", dialog: "insertSmartArt" },
          { type: "button", id: "insert.chart", label: "Chart", icon: "chart", size: "large", dialog: "insertChart" },
        ],
      },
      { label: "Links", controls: [{ type: "button", id: "insert.link", label: "Link", icon: "link", size: "large", dialog: "link", shortcut: "Ctrl+K" }, { type: "button", id: "insert.action", label: "Action", icon: "link", size: "large" }] },
      { label: "Comments", controls: [{ type: "button", id: "insert.comment", label: "Comment", icon: "comment", size: "large", dialog: "newComment" }] },
      {
        label: "Text",
        controls: [
          { type: "button", id: "insert.textBox", label: "Text Box", icon: "textbox", size: "large" },
          { type: "button", id: "insert.headerFooter", label: "Header & Footer", icon: "footer", showLabel: true, dialog: "headerFooter" },
          { type: "dropdown", id: "insert.wordArt", label: "WordArt", icon: "wordart", showLabel: true, options: ["Fill: Black, Text color 1; Shadow", "Fill: Blue, Accent color 1; Shadow", "Gradient Fill: Gold"].map((v) => ({ value: v })) },
          { type: "button", id: "insert.dateTime", label: "Date & Time", icon: "date", showLabel: true },
          { type: "button", id: "insert.slideNumber", label: "Slide Number", icon: "pageNumber", showLabel: true },
          { type: "button", id: "insert.object", label: "Object", icon: "new", showLabel: true },
        ],
      },
      { label: "Symbols", controls: [{ type: "button", id: "insert.equation", label: "Equation", icon: "equation", size: "large" }, { type: "button", id: "insert.symbol", label: "Symbol", icon: "symbol", size: "large" }] },
      {
        label: "Media",
        controls: [
          { type: "dropdown", id: "insert.video", label: "Video", icon: "video", size: "large", options: [{ value: "Insert Video From", heading: true }, { value: "This Device...", dialog: "insertVideo" }, { value: "Stock Videos..." }, { value: "Online Videos...", dialog: "onlineVideo" }] },
          { type: "dropdown", id: "insert.audio", label: "Audio", icon: "audio", size: "large", options: [{ value: "Audio on My PC...", dialog: "insertAudio" }, { value: "Record Audio..." }] },
          { type: "button", id: "insert.screenRecording", label: "Screen Recording", icon: "video", size: "large" },
        ],
      },
    ],
  },
  {
    id: "draw",
    label: "Draw",
    groups: [{ label: "Drawing Tools", controls: [{ type: "button", id: "draw.select", label: "Select", icon: "select", size: "large" }, { type: "button", id: "draw.pen", label: "Pen", icon: "pen", size: "large" }, { type: "button", id: "draw.eraser", label: "Eraser", icon: "eraser", size: "large" }] }],
  },
  {
    id: "design",
    label: "Design",
    groups: [
      { label: "Themes", controls: [{ type: "gallery", id: "design.theme", label: "Themes", options: [...PPT_THEME_NAMES.map((t) => ({ value: t, label: t, color: PPT_THEMES[t].dark ? PPT_THEMES[t].bg : PPT_THEMES[t].accent })), { value: "Browse for Themes...", label: "Browse for Themes...", icon: "folder", command: "file.browse" }, { value: "Save Current Theme...", label: "Save Current Theme...", icon: "save", dialog: "saveTheme" }], width: 360 }] },
      { label: "Variants", controls: [{ type: "gallery", id: "design.variant", label: "Variants", options: variantOpts, width: 200 }] },
      {
        label: "Customize",
        controls: [
          { type: "dropdown", id: "design.slideSize", label: "Slide Size", icon: "slideSize", size: "large", options: [{ value: "Standard (4:3)" }, { value: "Widescreen (16:9)" }, { value: "Custom Slide Size...", dialog: "slideSize" }] },
          { type: "button", id: "design.formatBackground", label: "Format Background", icon: "background", size: "large", dialog: "formatBackground" },
        ],
      },
      { label: "Designer", controls: [{ type: "button", id: "design.designer", label: "Designer", icon: "designer", size: "large" }] },
    ],
  },
  {
    id: "transitions",
    label: "Transitions",
    groups: [
      { label: "Preview", controls: [{ type: "button", id: "transition.preview", label: "Preview", icon: "preview", size: "large" }] },
      { label: "Transition to This Slide", controls: [
        { type: "gallery", id: "transition.apply", label: "Transitions", options: TRANSITIONS.map((t) => ({ value: t, label: t })), width: 380 },
        { type: "dropdown", id: "transition.effect", label: "Effect Options", icon: "options", size: "large", options: ["From Right", "From Left", "From Top", "From Bottom", "Smoothly", "Through Black", "Vertical", "Horizontal"].map((v) => ({ value: v })) },
      ] },
      {
        label: "Timing",
        controls: [],
        rows: [
          [{ type: "dropdown", id: "transition.sound", label: "Sound", combo: true, width: 110, options: ["[No Sound]", "Applause", "Chime", "Click"].map((v) => ({ value: v })) }, { type: "toggle", id: "transition.onClick", label: "On Mouse Click", showLabel: true }],
          [{ type: "dropdown", id: "transition.duration", label: "Duration", combo: true, width: 60, options: ["00.50", "01.00", "01.50", "02.00", "03.00"].map((v) => ({ value: v })) }, { type: "dropdown", id: "transition.advanceAfter", label: "After", combo: true, width: 70, options: ["00:00.00", "00:03.00", "00:05.00", "00:10.00"].map((v) => ({ value: v })) }],
          [{ type: "button", id: "transition.applyAll", label: "Apply To All", icon: "accept", showLabel: true }],
        ],
      },
    ],
  },
  {
    id: "animations",
    label: "Animations",
    groups: [
      { label: "Preview", controls: [{ type: "button", id: "animation.preview", label: "Preview", icon: "preview", size: "large" }] },
      { label: "Animation", controls: [
        // The More list groups effects under Emphasis and Exit headings, as PowerPoint does. The entrance
        // effects follow None without their own heading: the Ribbon's in-gallery row shows the first four
        // options as tiles (headings included), so a heading there would show up as a tile.
        { type: "gallery", id: "animation.apply", label: "Animations", options: [...ANIMATIONS.map((a) => ({ value: a, label: a, preview: { color: "#2E7D32" } })).flatMap((o, i) => (i === 1 ? [{ value: "Entrance", heading: true }, o] : [o])), { value: "Emphasis", heading: true }, ...EMPHASIS.map((a) => ({ value: a, label: a, preview: { color: "#B8860B" } })), { value: "Exit", heading: true }, ...EXITS.map((a) => ({ value: a, label: a, preview: { color: "#C00000" } }))], width: 340 },
        { type: "dropdown", id: "animation.effect", label: "Effect Options", icon: "options", size: "large", options: [{ value: "Direction", heading: true }, ...["From Bottom", "From Left", "From Right", "From Top"].map((v) => ({ value: v })), { value: "Sequence", heading: true }, ...["As One Object", "All at Once", "By Paragraph"].map((v) => ({ value: v }))] },
      ] },
      { label: "Advanced Animation", controls: [
        { type: "dropdown", id: "animation.add", label: "Add Animation", icon: "animation", size: "large", options: [{ value: "Entrance", heading: true }, ...ANIMATIONS.slice(1).map((a) => ({ value: a })), { value: "Emphasis", heading: true }, ...EMPHASIS.map((a) => ({ value: a })), { value: "Exit", heading: true }, ...EXITS.map((a) => ({ value: a }))] },
        { type: "toggle", id: "animation.pane", label: "Animation Pane", icon: "navPane", showLabel: true },
        { type: "dropdown", id: "animation.trigger", label: "Trigger", icon: "select", showLabel: true, options: [{ value: "On Click of" }, { value: "On Bookmark" }] },
        { type: "toggle", id: "animation.painter", label: "Animation Painter", icon: "formatPainter", showLabel: true },
      ] },
      {
        label: "Timing",
        controls: [],
        rows: [
          [{ type: "dropdown", id: "animation.start", label: "Start", combo: true, width: 110, options: ["On Click", "With Previous", "After Previous"].map((v) => ({ value: v })) }, { type: "button", id: "animation.earlier", label: "Move Earlier", icon: "undo", showLabel: true }],
          [{ type: "dropdown", id: "animation.duration", label: "Duration", combo: true, width: 60, options: ["00.25", "00.50", "01.00", "02.00"].map((v) => ({ value: v })) }, { type: "button", id: "animation.later", label: "Move Later", icon: "redo", showLabel: true }],
          [{ type: "dropdown", id: "animation.delay", label: "Delay", combo: true, width: 60, options: ["00.00", "00.50", "01.00", "02.00"].map((v) => ({ value: v })) }],
        ],
      },
    ],
  },
  {
    id: "slideShow",
    label: "Slide Show",
    groups: [
      { label: "Start Slide Show", controls: [
        { type: "button", id: "slideshow.fromBeginning", label: "From Beginning", icon: "slideShow", size: "large", shortcut: "F5" },
        { type: "button", id: "slideshow.fromCurrent", label: "From Current Slide", icon: "slideShow", size: "large", shortcut: "Shift+F5" },
        { type: "dropdown", id: "slideshow.custom", label: "Custom Slide Show", icon: "sorter", size: "large", options: [{ value: "Custom Shows..." }] },
      ] },
      { label: "Set Up", controls: [
        { type: "button", id: "slideshow.setup", label: "Set Up Slide Show", icon: "options", size: "large", dialog: "setupShow" },
        { type: "toggle", id: "slideshow.hideSlide", label: "Hide Slide", icon: "close", size: "large" },
        { type: "button", id: "slideshow.rehearse", label: "Rehearse Timings", icon: "rehearse", showLabel: true },
        { type: "button", id: "slideshow.record", label: "Record", icon: "video", showLabel: true },
      ] },
      { label: "Monitors", controls: [{ type: "toggle", id: "slideshow.presenterView", label: "Use Presenter View", icon: "presenter", showLabel: true }] },
      { label: "Captions & Subtitles", controls: [{ type: "toggle", id: "slideshow.captions", label: "Always Use Subtitles", showLabel: true }] },
    ],
  },
  {
    id: "review",
    label: "Review",
    groups: [
      { label: "Proofing", controls: [{ type: "button", id: "review.spelling", label: "Spelling", icon: "spelling", size: "large", shortcut: "F7" }, { type: "button", id: "review.thesaurus", label: "Thesaurus", icon: "thesaurus", showLabel: true, shortcut: "Shift+F7" }] },
      { label: "Accessibility", controls: [{ type: "dropdown", id: "review.accessibility", label: "Check Accessibility", icon: "accessibility", size: "large", split: true, options: [{ value: "Check Accessibility" }, { value: "Alt Text", dialog: "altText" }] }] },
      { label: "Language", controls: [{ type: "button", id: "review.translate", label: "Translate", icon: "translate", size: "large" }] },
      { label: "Comments", controls: [
        { type: "button", id: "review.newComment", label: "New Comment", icon: "comment", size: "large", dialog: "newComment", shortcut: "Ctrl+Alt+M" },
        { type: "dropdown", id: "review.deleteComment", label: "Delete", icon: "reject", showLabel: true, split: true, options: [{ value: "Delete" }, { value: "Delete All Comments on Slide" }, { value: "Delete All Comments in Presentation" }] },
        { type: "button", id: "review.prevComment", label: "Previous", icon: "undo", showLabel: true },
        { type: "button", id: "review.nextComment", label: "Next", icon: "redo", showLabel: true },
        { type: "toggle", id: "review.showComments", label: "Show Comments", icon: "comment", showLabel: true },
      ] },
      // Compare and Merge was retired in PowerPoint for Microsoft 365 version 2502, so the Review tab no longer has a Compare group.
    ],
  },
  {
    id: "view",
    label: "View",
    groups: [
      { label: "Presentation Views", controls: [
        { type: "toggle", id: "view.mode.normal", label: "Normal", icon: "normalView", size: "large", stateKey: "view.normal" },
        { type: "toggle", id: "view.mode.outline", label: "Outline View", icon: "outline", size: "large", stateKey: "view.outline" },
        { type: "toggle", id: "view.mode.sorter", label: "Slide Sorter", icon: "sorter", size: "large", stateKey: "view.sorter" },
        { type: "toggle", id: "view.mode.notes", label: "Notes Page", icon: "notes", size: "large", stateKey: "view.notesPage" },
        { type: "toggle", id: "view.mode.reading", label: "Reading View", icon: "readMode", size: "large", stateKey: "view.reading" },
      ] },
      { label: "Master Views", controls: [
        { type: "button", id: "view.master", label: "Slide Master", icon: "master", size: "large" },
        { type: "button", id: "view.handoutMaster", label: "Handout Master", icon: "multiplePages", size: "large" },
        { type: "button", id: "view.notesMaster", label: "Notes Master", icon: "notes", size: "large" },
      ] },
      { label: "Show", controls: [{ type: "toggle", id: "view.ruler", label: "Ruler", showLabel: true }, { type: "toggle", id: "view.gridlines", label: "Gridlines", showLabel: true }, { type: "toggle", id: "view.guides", label: "Guides", showLabel: true }, { type: "toggle", id: "view.notes", label: "Notes", icon: "notes", size: "large" }] },
      { label: "Zoom", controls: [{ type: "button", id: "view.zoomDialog", label: "Zoom", icon: "zoom", size: "large", dialog: "zoom" }, { type: "button", id: "view.fit", label: "Fit to Window", icon: "pageWidth", size: "large" }] },
      { label: "Color/Grayscale", controls: [{ type: "dropdown", id: "view.grayscale", label: "Color", icon: "colors", showLabel: true, options: ["Color", "Grayscale", "Black and White"].map((v) => ({ value: v })) }] },
      { label: "Window", controls: [{ type: "button", id: "view.newWindow", label: "New Window", icon: "newWindow", size: "large" }, { type: "button", id: "view.arrangeAll", label: "Arrange All", icon: "multiplePages", showLabel: true }] },
      { label: "Macros", controls: [{ type: "button", id: "view.macros", label: "Macros", icon: "macros", size: "large" }] },
    ],
  },
  {
    id: "help",
    label: "Help",
    groups: [{ label: "Help", controls: [{ type: "button", id: "help.help", label: "Help", icon: "help", size: "large" }, { type: "button", id: "help.feedback", label: "Feedback", icon: "comment", size: "large" }] }],
  },
  /* -------- contextual -------- */
  {
    id: "slideMaster",
    label: "Slide Master",
    contextual: "master",
    groups: [
      { label: "Edit Master", controls: [{ type: "button", id: "master.insertMaster", label: "Insert Slide Master", icon: "master", size: "large" }, { type: "button", id: "master.insertLayout", label: "Insert Layout", icon: "layout", size: "large" }, { type: "button", id: "master.delete", label: "Delete", icon: "reject", showLabel: true }, { type: "button", id: "master.rename", label: "Rename", icon: "textbox", showLabel: true, dialog: "renameLayout" }, { type: "button", id: "master.preserve", label: "Preserve", icon: "protect", showLabel: true }] },
      { label: "Edit Theme", controls: [
        { type: "dropdown", id: "design.theme", label: "Themes", icon: "themes", size: "large", options: PPT_THEME_NAMES.map((t) => ({ value: t })) },
        { type: "dropdown", id: "master.colors", label: "Colors", icon: "colors", showLabel: true, options: [...COLOR_SETS.map((c) => ({ value: c.name, color: c.accent })), { value: "Customize Colors...", dialog: "customizeColors" }] },
        { type: "dropdown", id: "master.fonts", label: "Fonts", icon: "fonts", showLabel: true, options: [...FONT_SETS.map((f) => ({ value: f.name, label: `${f.name} (${f.heading}/${f.body})`, preview: { font: f.heading } })), { value: "Customize Fonts...", dialog: "customizeFonts" }] },
        { type: "dropdown", id: "master.effects", label: "Effects", icon: "effects", showLabel: true, options: EFFECT_SETS.map((e) => ({ value: e })) },
      ] },
      { label: "Background", controls: [
        { type: "dropdown", id: "design.backgroundStyle", label: "Background Styles", icon: "background", showLabel: true, gallery: "grid", options: BACKGROUND_STYLES.map((b) => ({ value: b.name, color: b.color })) },
        { type: "button", id: "design.formatBackground", label: "Format Background", icon: "background", showLabel: true, dialog: "formatBackground" },
        { type: "toggle", id: "master.hideBackground", label: "Hide Background Graphics", showLabel: true },
      ] },
      { label: "Size", controls: [{ type: "dropdown", id: "design.slideSize", label: "Slide Size", icon: "slideSize", size: "large", options: [{ value: "Standard (4:3)" }, { value: "Widescreen (16:9)" }, { value: "Custom Slide Size...", dialog: "slideSize" }] }] },
      { label: "Close", controls: [{ type: "button", id: "master.close", label: "Close Master View", icon: "close", size: "large" }] },
    ],
  },
  {
    id: "shapeFormat",
    label: "Shape Format",
    contextual: "shape",
    groups: [
      { label: "Insert Shapes", controls: [
        { type: "dropdown", id: "insert.shape", label: "Shapes", icon: "shapes", size: "large", gallery: "grid", options: shapeOpts() },
        { type: "dropdown", id: "shape.change", label: "Edit Shape", icon: "shapes", showLabel: true, gallery: "grid", options: [{ value: "Change Shape", heading: true }, ...shapeOpts("shape.change")] },
        { type: "button", id: "insert.textBox", label: "Text Box", icon: "textbox", showLabel: true },
      ] },
      { label: "Shape Styles", controls: [
        { type: "gallery", id: "shape.style", label: "Shape Styles", options: SHAPE_STYLES.map((v) => ({ value: v, label: v })), width: 260 },
        { type: "dropdown", id: "shape.fill", label: "Shape Fill", icon: "fill", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Fill", label: "No Fill" }]) },
        { type: "dropdown", id: "shape.outline", label: "Shape Outline", icon: "pen", showLabel: true, gallery: "swatches", options: [...colorOpts([{ value: "No Outline", label: "No Outline" }]), { value: "Weight", heading: true }, ...["¼ pt", "1 pt", "3 pt", "6 pt"].map((w) => ({ value: `Weight: ${w}`, label: w }))] },
        { type: "dropdown", id: "shape.effects", label: "Shape Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges", "Bevel", "3-D Rotation"].map((v) => ({ value: v })) },
      ] },
      { label: "Accessibility", controls: [{ type: "button", id: "shape.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      arrangeGroup,
      sizeGroup(),
    ],
  },
  {
    // Icons (Insert › Icons) are graphics: they get Graphics Format, not Shape Format.
    id: "graphicsFormat",
    label: "Graphics Format",
    contextual: "graphics",
    groups: [
      { label: "Change", controls: [{ type: "dropdown", id: "graphics.change", label: "Change Graphic", icon: "icons", size: "large", options: [{ value: "From Icons...", dialog: "changeGraphic", icon: "icons" }] }] },
      { label: "Graphics Styles", controls: [
        { type: "gallery", id: "graphics.style", label: "Graphics Styles", options: GRAPHIC_STYLES.map((v) => ({ value: v, label: v })), width: 260 },
        { type: "dropdown", id: "graphics.fill", label: "Graphics Fill", icon: "fill", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Fill", label: "No Fill" }]) },
        { type: "dropdown", id: "graphics.outline", label: "Graphics Outline", icon: "pen", showLabel: true, gallery: "swatches", options: [...colorOpts([{ value: "No Outline", label: "No Outline" }]), { value: "Weight", heading: true }, ...["¼ pt", "1 pt", "3 pt", "6 pt"].map((w) => ({ value: `Weight: ${w}`, label: w }))] },
        { type: "dropdown", id: "graphics.effects", label: "Graphics Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges"].map((v) => ({ value: v })) },
      ] },
      { label: "Accessibility", controls: [{ type: "button", id: "graphics.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      arrangeGroup,
      sizeGroup(),
    ],
  },
  {
    id: "pictureFormat",
    label: "Picture Format",
    contextual: "picture",
    groups: [
      { label: "Adjust", controls: [
        { type: "button", id: "picture.removeBackground", label: "Remove Background", icon: "removeBg", size: "large" },
        { type: "dropdown", id: "picture.corrections", label: "Corrections", icon: "corrections", size: "large", options: [{ value: "Sharpen/Soften", heading: true }, ...["Sharpen: 25%", "Soften: 25%"].map((v) => ({ value: v })), { value: "Brightness/Contrast", heading: true }, ...["Brightness: +20% Contrast: 0% (Normal)", "Brightness: -20% Contrast: 0% (Normal)", "Brightness: 0% (Normal) Contrast: +20%", "Brightness: +20% Contrast: +20%"].map((v) => ({ value: v }))] },
        { type: "dropdown", id: "picture.color", label: "Color", icon: "colors", size: "large", options: [{ value: "Color Saturation", heading: true }, { value: "Saturation: 0%" }, { value: "Saturation: 200%" }, { value: "Recolor", heading: true }, ...["Grayscale", "Sepia", "Washout", "Black and White: 50%"].map((v) => ({ value: v }))] },
        { type: "dropdown", id: "picture.artistic", label: "Artistic Effects", icon: "effects", size: "large", gallery: "grid", options: ["None", "Pencil Sketch", "Blur", "Paint Brush", "Watercolor Sponge", "Glow Edges"].map((v) => ({ value: v, icon: "picture" })) },
        { type: "button", id: "picture.compress", label: "Compress Pictures", icon: "pictureStyles", showLabel: true, dialog: "compressPictures" },
        { type: "button", id: "picture.change", label: "Change Picture", icon: "picture", showLabel: true, dialog: "changePicture" },
        { type: "button", id: "picture.reset", label: "Reset Picture", icon: "reset", showLabel: true },
      ] },
      { label: "Picture Styles", controls: [
        { type: "gallery", id: "picture.style", label: "Picture Styles", options: PICTURE_STYLES.map((v) => ({ value: v, label: v })), width: 300 },
        { type: "dropdown", id: "picture.border", label: "Picture Border", icon: "pageBorders", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Outline", label: "No Outline" }]) },
        { type: "dropdown", id: "picture.effects", label: "Picture Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges", "Bevel"].map((v) => ({ value: v })) },
      ] },
      { label: "Accessibility", controls: [{ type: "button", id: "picture.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      arrangeGroup,
      sizeGroup([
        { type: "dropdown", id: "picture.crop", label: "Crop", icon: "crop", size: "large", split: true, options: [
          { value: "Crop", command: "picture.crop", icon: "crop" },
          { value: "Crop to Shape", heading: true },
          ...["Rectangle: Rounded Corners", "Oval", "Diamond", "Isosceles Triangle", "Heart"].map((v) => ({ value: v, command: "picture.cropShape", icon: "shapes" })),
          { value: "Aspect Ratio", heading: true },
          ...["1:1", "4:3", "16:9", "3:2"].map((v) => ({ value: v, command: "picture.aspect" })),
          { value: "Fill", command: "picture.fill" },
          { value: "Fit", command: "picture.fit" },
        ] },
      ]),
    ],
  },
  {
    id: "tableDesign",
    label: "Table Design",
    contextual: "table",
    groups: [
      { label: "Table Style Options", controls: [
        { type: "toggle", id: "table.headerRow", label: "Header Row", showLabel: true },
        { type: "toggle", id: "table.totalRow", label: "Total Row", showLabel: true },
        { type: "toggle", id: "table.bandedRows", label: "Banded Rows", showLabel: true },
        { type: "toggle", id: "table.firstColumn", label: "First Column", showLabel: true },
        { type: "toggle", id: "table.lastColumn", label: "Last Column", showLabel: true },
        { type: "toggle", id: "table.bandedColumns", label: "Banded Columns", showLabel: true },
      ] },
      // Thumbnails like PowerPoint's: a striped table in the style's colors, the name only as the tooltip
      // (and accessible name); the near-zero preview size keeps the caption from showing under the swatch.
      { label: "Table Styles", controls: [{ type: "gallery", id: "table.style", label: "Table Styles", options: TABLE_STYLES.map((v) => ({ value: v, label: v, color: tableStyleSwatch(v), preview: { size: 0.01 } })), width: 300 }] },
    ],
  },
  {
    id: "tableLayout",
    label: "Layout",
    contextual: "table",
    groups: [
      { label: "Rows & Columns", controls: [
        { type: "dropdown", id: "table.delete", label: "Delete", icon: "deleteCells", size: "large", options: ["Delete Columns", "Delete Rows", "Delete Table"].map((v) => ({ value: v })) },
        { type: "button", id: "table.insertAbove", label: "Insert Above", icon: "insertCells", size: "large" },
        { type: "button", id: "table.insertBelow", label: "Insert Below", icon: "insertCells", size: "large" },
        { type: "button", id: "table.insertLeft", label: "Insert Left", icon: "insertCells", showLabel: true },
        { type: "button", id: "table.insertRight", label: "Insert Right", icon: "insertCells", showLabel: true },
      ] },
      { label: "Merge", controls: [{ type: "button", id: "table.merge", label: "Merge Cells", icon: "merge", size: "large" }, { type: "button", id: "table.split", label: "Split Cells", icon: "split", size: "large" }] },
      { label: "Cell Size", controls: [{ type: "button", id: "table.distributeRows", label: "Distribute Rows", icon: "spacing", showLabel: true }, { type: "button", id: "table.distributeColumns", label: "Distribute Columns", icon: "columns", showLabel: true }] },
      { label: "Alignment", controls: [
        { type: "dropdown", id: "table.align", label: "Align Text", icon: "alignCenter", showLabel: true, options: ["Align Left", "Center", "Align Right"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "table.valign", label: "Vertical Alignment", icon: "align", showLabel: true, options: ["Align Top", "Center Vertically", "Align Bottom"].map((v) => ({ value: v })) },
      ] },
      arrangeGroup,
    ],
  },
  {
    id: "chartDesign",
    label: "Chart Design",
    contextual: "chart",
    groups: [
      { label: "Chart Layouts", controls: [
        { type: "dropdown", id: "chart.addElement", label: "Add Chart Element", icon: "chart", size: "large", options: [
          { value: "Axis Titles", heading: true }, { value: "Axis Titles: Primary Horizontal", label: "Primary Horizontal" }, { value: "Axis Titles: None", label: "None" },
          { value: "Chart Title", heading: true }, ...["None", "Above Chart", "Centered Overlay"].map((v) => ({ value: `Chart Title: ${v}`, label: v })),
          { value: "Data Labels", heading: true }, ...["None", "Center", "Inside End", "Inside Base", "Outside End"].map((v) => ({ value: `Data Labels: ${v}`, label: v })),
          { value: "Gridlines", heading: true }, { value: "Gridlines: Primary Major Horizontal", label: "Primary Major Horizontal" }, { value: "Gridlines: None", label: "None" },
          { value: "Legend", heading: true }, ...["None", "Right", "Top", "Left", "Bottom"].map((v) => ({ value: `Legend: ${v}`, label: v })),
        ] },
        { type: "dropdown", id: "chart.quickLayout", label: "Quick Layout", icon: "layout", size: "large", gallery: "grid", options: Array.from({ length: 11 }, (_, i) => ({ value: `Layout ${i + 1}`, icon: "chart" })) },
      ] },
      { label: "Chart Styles", controls: [{ type: "dropdown", id: "chart.colors", label: "Change Colors", icon: "colors", size: "large", options: [{ value: "Colorful", heading: true }, ...["Colorful Palette 1", "Colorful Palette 2", "Colorful Palette 3"].map((v) => ({ value: v })), { value: "Monochromatic", heading: true }, ...["Monochromatic Palette 1", "Monochromatic Palette 2"].map((v) => ({ value: v }))] }, { type: "gallery", id: "chart.style", label: "Chart Styles", options: ["Style 1", "Style 2", "Style 3", "Style 4", "Style 5", "Style 6", "Style 7", "Style 8"].map((v) => ({ value: v, label: v })), width: 240 }] },
      { label: "Data", controls: [{ type: "button", id: "chart.switchRowColumn", label: "Switch Row/Column", icon: "sort", size: "large" }, { type: "button", id: "chart.selectData", label: "Select Data", icon: "table", size: "large" }, { type: "button", id: "chart.editData", label: "Edit Data", icon: "table", size: "large" }, { type: "button", id: "chart.refresh", label: "Refresh Data", icon: "reset", size: "large" }] },
      { label: "Type", controls: [{ type: "button", id: "chart.changeType", label: "Change Chart Type", icon: "chart", size: "large", dialog: "changeChartType" }] },
    ],
  },
  {
    id: "smartArtDesign",
    label: "SmartArt Design",
    contextual: "smartart",
    groups: [
      { label: "Create Graphic", controls: [
        { type: "dropdown", id: "smartart.addShape", label: "Add Shape", icon: "shapes", size: "large", split: true, faceValue: "Add Shape After", options: ["Add Shape After", "Add Shape Before", "Add Shape Above", "Add Shape Below"].map((v) => ({ value: v })) },
        { type: "button", id: "smartart.promote", label: "Promote", icon: "indentDec", showLabel: true },
        { type: "button", id: "smartart.demote", label: "Demote", icon: "indentInc", showLabel: true },
        { type: "button", id: "smartart.rightToLeft", label: "Right to Left", icon: "sort", showLabel: true },
        { type: "button", id: "smartart.moveUp", label: "Move Up", icon: "undo", showLabel: true },
        { type: "button", id: "smartart.moveDown", label: "Move Down", icon: "redo", showLabel: true },
        { type: "toggle", id: "smartart.textPane", label: "Text Pane", icon: "navPane", showLabel: true },
      ] },
      { label: "Layouts", controls: [{ type: "gallery", id: "smartart.layout", label: "Layouts", options: SMARTART_LAYOUTS.map((v) => ({ value: v, label: v })), width: 300 }] },
      { label: "SmartArt Styles", controls: [
        { type: "dropdown", id: "smartart.colors", label: "Change Colors", icon: "colors", size: "large", options: [{ value: "Primary Theme Colors", heading: true }, { value: "Dark 2 Outline" }, { value: "Colorful", heading: true }, ...["Colorful - Accent Colors", "Colorful Range - Accent Colors 2 to 3", "Colorful Range - Accent Colors 4 to 5"].map((v) => ({ value: v })), { value: "Accent 1", heading: true }, ...["Colored Fill - Accent 1", "Gradient Range - Accent 1"].map((v) => ({ value: v })), { value: "Accent 2", heading: true }, { value: "Colored Fill - Accent 2" }, { value: "Accent 6", heading: true }, { value: "Colored Fill - Accent 6" }] },
        { type: "gallery", id: "smartart.style", label: "SmartArt Styles", options: [...["Simple Fill", "White Outline", "Subtle Effect", "Moderate Effect", "Intense Effect"].map((v) => ({ value: v, label: v })), { value: "3-D", heading: true }, ...["Polished", "Inset", "Cartoon", "Powder", "Brick Scene", "Sunset Scene"].map((v) => ({ value: v, label: v }))], width: 260 },
      ] },
      { label: "Reset", controls: [{ type: "button", id: "smartart.reset", label: "Reset Graphic", icon: "reset", size: "large" }, { type: "dropdown", id: "smartart.convert", label: "Convert", icon: "textbox", size: "large", options: ["Convert to Text", "Convert to Shapes"].map((v) => ({ value: v })) }] },
    ],
  },
  {
    id: "videoFormat",
    label: "Video Format",
    contextual: "video",
    groups: [
      { label: "Preview", controls: [{ type: "button", id: "media.play", label: "Play", icon: "preview", size: "large" }] },
      { label: "Adjust", controls: [
        { type: "dropdown", id: "picture.corrections", label: "Corrections", icon: "corrections", size: "large", options: ["Brightness: +20% Contrast: 0% (Normal)", "Brightness: 0% (Normal) Contrast: +20%"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "video.posterFrame", label: "Poster Frame", icon: "picture", size: "large", options: ["Current Frame", "Image from File...", "Reset"].map((v) => ({ value: v })) },
      ] },
      { label: "Video Styles", controls: [
        { type: "gallery", id: "video.style", label: "Video Styles", options: VIDEO_STYLES.map((v) => ({ value: v, label: v })), width: 280 },
        { type: "dropdown", id: "video.shape", label: "Video Shape", icon: "shapes", showLabel: true, gallery: "grid", options: ["Rectangle", "Rectangle: Rounded Corners", "Oval"].map((v) => ({ value: v, icon: "shapes" })) },
        { type: "dropdown", id: "video.border", label: "Video Border", icon: "pageBorders", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Outline", label: "No Outline" }]) },
        { type: "dropdown", id: "video.effects", label: "Video Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges", "Bevel"].map((v) => ({ value: v })) },
      ] },
      { label: "Accessibility", controls: [{ type: "button", id: "picture.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      arrangeGroup,
      sizeGroup([{ type: "button", id: "picture.crop", label: "Crop", icon: "crop", size: "large" }]),
    ],
  },
  {
    id: "playbackVideo",
    label: "Playback",
    contextual: "video",
    groups: [
      { label: "Preview", controls: [{ type: "button", id: "media.play", label: "Play", icon: "preview", size: "large" }] },
      { label: "Bookmarks", controls: [{ type: "button", id: "media.bookmark", label: "Add Bookmark", icon: "section", size: "large" }] },
      { label: "Editing", controls: [
        { type: "button", id: "media.trim", label: "Trim Video", icon: "crop", size: "large", dialog: "trimVideo" },
        { type: "dropdown", id: "media.fadeIn", label: "Fade In", combo: true, width: 60, options: fadeOpts },
        { type: "dropdown", id: "media.fadeOut", label: "Fade Out", combo: true, width: 60, options: fadeOpts },
      ] },
      { label: "Video Options", controls: [
        { type: "dropdown", id: "media.volume", label: "Volume", icon: "audio", size: "large", options: mediaVolume },
        { type: "dropdown", id: "media.start", label: "Start", combo: true, width: 136, options: mediaStart },
        { type: "toggle", id: "media.fullScreen", label: "Play Full Screen", showLabel: true },
        { type: "toggle", id: "media.hide", label: "Hide While Not Playing", showLabel: true },
        { type: "toggle", id: "media.loop", label: "Loop until Stopped", showLabel: true },
        { type: "toggle", id: "media.rewind", label: "Rewind after Playing", showLabel: true },
      ] },
    ],
  },
  {
    id: "audioFormat",
    label: "Audio Format",
    contextual: "audio",
    groups: [
      { label: "Accessibility", controls: [{ type: "button", id: "picture.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      arrangeGroup,
      sizeGroup(),
    ],
  },
  {
    id: "playbackAudio",
    label: "Playback",
    contextual: "audio",
    groups: [
      { label: "Preview", controls: [{ type: "button", id: "media.play", label: "Play", icon: "preview", size: "large" }] },
      { label: "Bookmarks", controls: [{ type: "button", id: "media.bookmark", label: "Add Bookmark", icon: "section", size: "large" }] },
      { label: "Editing", controls: [
        { type: "button", id: "media.trim", label: "Trim Audio", icon: "crop", size: "large", dialog: "trimAudio" },
        { type: "dropdown", id: "media.fadeIn", label: "Fade In", combo: true, width: 60, options: fadeOpts },
        { type: "dropdown", id: "media.fadeOut", label: "Fade Out", combo: true, width: 60, options: fadeOpts },
      ] },
      { label: "Audio Options", controls: [
        { type: "dropdown", id: "media.volume", label: "Volume", icon: "audio", size: "large", options: mediaVolume },
        { type: "dropdown", id: "media.start", label: "Start", combo: true, width: 136, options: mediaStart },
        { type: "toggle", id: "media.playAcross", label: "Play Across Slides", showLabel: true },
        { type: "toggle", id: "media.loop", label: "Loop until Stopped", showLabel: true },
        { type: "toggle", id: "media.hide", label: "Hide During Show", showLabel: true },
        { type: "toggle", id: "media.rewind", label: "Rewind after Playing", showLabel: true },
      ] },
      { label: "Audio Styles", controls: [{ type: "button", id: "media.noStyle", label: "No Style", icon: "reset", size: "large" }, { type: "button", id: "media.playInBackground", label: "Play in Background", icon: "audio", size: "large" }] },
    ],
  },
];

export const PPT_VIEW_ALIASES: Record<string, string> = {
  "view.mode.normal": "Normal",
  "view.mode.outline": "Outline View",
  "view.mode.sorter": "Slide Sorter",
  "view.mode.notes": "Notes Page",
  "view.mode.reading": "Reading View",
};

/** Font and bullet color pickers: Automatic, then every theme and standard color (Black, Dark Blue, ...). */
const DIALOG_COLORS = ["Automatic", ...Array.from(new Set(THEME_COLORS.map((c) => c.color)))];

/** Animation Pane › item menu › Timing (and the Timing tab of Effect Options). */
const animTimingFields: NonNullable<DialogDef["fields"]> = [
  { type: "select", key: "start", label: "Start:", options: ["On Click", "With Previous", "After Previous"] },
  { type: "number", key: "delay", label: "Delay:", min: 0, step: 0.25, suffix: "seconds" },
  { type: "number", key: "duration", label: "Duration:", min: 0.25, step: 0.25, suffix: "seconds" },
  { type: "select", key: "repeat", label: "Repeat:", options: ["(none)", "2", "3", "4", "5", "10", "Until Next Click", "Until End of Slide"] },
];

export const pptDialogs: Record<string, DialogDef> = {
  font: {
    id: "font",
    title: "Font",
    width: 440,
    fields: [
      { type: "select", key: "font", label: "Latin text font:", options: FONTS },
      { type: "select", key: "style", label: "Font style:", options: ["Regular", "Italic", "Bold", "Bold Italic"] },
      { type: "select", key: "size", label: "Size:", options: SIZES },
      { type: "color", key: "color", label: "Font color:", options: DIALOG_COLORS },
      { type: "select", key: "underline", label: "Underline style:", options: ["(none)", "Single", "Double"] },
      { type: "checkbox", key: "strike", label: "Strikethrough" },
    ],
  },
  paragraph: {
    id: "paragraph",
    title: "Paragraph",
    width: 440,
    fields: [
      { type: "note", text: "General" },
      { type: "select", key: "alignment", label: "Alignment:", options: ["Left", "Centered", "Right", "Justified"] },
      { type: "note", text: "Indentation" },
      { type: "number", key: "indentBefore", label: "Before text:", step: 0.25, min: 0, suffix: '"' },
      { type: "select", key: "special", label: "Special:", options: ["(none)", "First line", "Hanging"] },
      { type: "number", key: "by", label: "By:", step: 0.25, min: 0, suffix: '"' },
      { type: "note", text: "Spacing" },
      { type: "number", key: "before", label: "Before:", step: 6, min: 0, suffix: "pt" },
      { type: "number", key: "after", label: "After:", step: 6, min: 0, suffix: "pt" },
      { type: "select", key: "lineSpacing", label: "Line Spacing:", options: ["Single", "1.5 lines", "Double", "Exactly", "Multiple"] },
      { type: "number", key: "at", label: "At:", step: 0.1, min: 0 },
    ],
  },
  bullets: {
    id: "bullets",
    title: "Bullets and Numbering",
    width: 420,
    fields: [
      { type: "note", text: "Bulleted" },
      { type: "list", key: "style", label: "Bullet style:", options: ["None", ...BULLET_STYLES.map((b) => b.value)], height: 150 },
      { type: "number", key: "size", label: "Size:", step: 5, min: 25, max: 400, suffix: "% of text" },
      { type: "color", key: "color", label: "Color:", options: DIALOG_COLORS },
    ],
  },
  numbering: {
    id: "numbering",
    title: "Bullets and Numbering",
    width: 420,
    fields: [
      { type: "note", text: "Numbered" },
      { type: "list", key: "style", label: "Numbering style:", options: ["None", ...NUMBER_FORMATS], height: 150 },
      { type: "number", key: "size", label: "Size:", step: 5, min: 25, max: 400, suffix: "% of text" },
      { type: "color", key: "color", label: "Color:", options: DIALOG_COLORS },
      { type: "number", key: "startAt", label: "Start at:", min: 1, max: 9999 },
    ],
  },
  find: { id: "find", title: "Find", okLabel: "Find Next", width: 380, fields: [{ type: "text", key: "find", label: "Find what:" }, { type: "checkbox", key: "matchCase", label: "Match case" }, { type: "checkbox", key: "wholeWords", label: "Find whole words only" }] },
  replace: { id: "replace", title: "Replace", okLabel: "Replace All", width: 400, fields: [{ type: "text", key: "find", label: "Find what:" }, { type: "text", key: "replace", label: "Replace with:" }, { type: "checkbox", key: "matchCase", label: "Match case" }, { type: "checkbox", key: "wholeWords", label: "Find whole words only" }] },
  replaceFonts: { id: "replaceFonts", title: "Replace Font", okLabel: "Replace", width: 360, fields: [{ type: "select", key: "replace", label: "Replace:", options: FONTS }, { type: "select", key: "with", label: "With:", options: FONTS }] },
  insertPicture: { id: "insertPicture", title: "Insert Picture", okLabel: "Insert", width: 440, fields: [{ type: "note", text: "This PC › Pictures › Clinic" }, { type: "list", key: "file", label: "File name:", options: PICTURE_FILES, height: 150 }] },
  changePicture: { id: "changePicture", title: "Insert Picture", okLabel: "Insert", width: 440, fields: [{ type: "note", text: "Change Picture › From a File" }, { type: "list", key: "file", label: "File name:", options: PICTURE_FILES, height: 150 }] },
  stockImages: { id: "stockImages", title: "Stock Images", okLabel: "Insert", width: 460, fields: [{ type: "text", key: "search", label: "Search:", placeholder: "Search for images" }, { type: "list", key: "image", label: "Images", options: STOCK_IMAGES, height: 160 }, { type: "note", text: "Stock images are free to use in your presentations." }] },
  onlinePictures: { id: "onlinePictures", title: "Online Pictures", okLabel: "Insert", width: 460, fields: [{ type: "text", key: "search", label: "Search Bing:", placeholder: "Search Bing" }, { type: "checkbox", key: "creativeCommons", label: "Creative Commons only", default: true }, { type: "list", key: "image", label: "Results", options: ONLINE_PICTURES, height: 120 }, { type: "note", text: "You're responsible for respecting others' rights, including copyright." }] },
  // On screen the Icons dialog is a checkbox per icon so several can be inserted together
  // (core.dialogDef); a commit carries `icon` (the first) and `icons` (all, comma separated).
  insertIcons: { id: "insertIcons", title: "Icons", okLabel: "Insert", width: 380, fields: [{ type: "text", key: "search", label: "Search:", placeholder: "Search icons" }, { type: "list", key: "icon", label: "Icons", options: ICONS.map((i) => i.name), height: 160 }, { type: "text", key: "icons", label: "Selected:" }] },
  changeGraphic: { id: "changeGraphic", title: "Icons", okLabel: "Insert", width: 380, fields: [{ type: "note", text: "Change Graphic › From Icons" }, { type: "list", key: "icon", label: "Icons", options: ICONS.map((i) => i.name), height: 160 }] },
  pasteSpecial: {
    id: "pasteSpecial",
    title: "Paste Special",
    width: 440,
    fields: [
      { type: "note", text: "Source: (the item on the Clipboard)" },
      { type: "radio", key: "mode", label: "", options: ["Paste", "Paste link"], default: "Paste" },
      { type: "list", key: "as", label: "As:", options: PASTE_SPECIAL_FORMATS, height: 130 },
      { type: "note", text: "Result: Paste inserts the contents of the Clipboard. Paste link inserts a picture of the contents and creates a shortcut to the source file, so changes to the source file are reflected in your presentation." },
    ],
  },
  officeClipboard: { id: "officeClipboard", title: "Clipboard", okLabel: "Paste", width: 360, fields: [{ type: "note", text: "Click an item to paste:" }, { type: "list", key: "item", label: "", options: [], height: 180 }] },
  animEffect: {
    id: "animEffect",
    title: "Effect Options",
    width: 400,
    tabs: [
      { label: "Effect", fields: [
        { type: "select", key: "direction", label: "Direction:", options: ["From Bottom", "From Left", "From Right", "From Top", "From Bottom-Left", "From Top-Right"] },
        { type: "select", key: "sound", label: "Sound:", options: ["[No Sound]", "Applause", "Chime", "Click", "Drum Roll"] },
        { type: "select", key: "after", label: "After animation:", options: ["Don't Dim", "Hide After Animation", "Hide on Next Mouse Click"] },
      ] },
      { label: "Timing", fields: animTimingFields },
      { label: "Text Animation", fields: [{ type: "select", key: "groupText", label: "Group text:", options: ["As One Object", "All Paragraphs At Once", "By 1st Level Paragraphs", "By 2nd Level Paragraphs"] }] },
    ],
  },
  animTiming: { id: "animTiming", title: "Timing", width: 360, fields: animTimingFields },
  // Drawn by the canvas (Custom Shows › New); listed so the validator knows its fields.
  defineCustomShow: { id: "defineCustomShow", title: "Define Custom Show", width: 520, fields: [{ type: "text", key: "name", label: "Slide show name:" }, { type: "text", key: "slides", label: "Slides in custom show:" }, { type: "text", key: "original", label: "" }] },
  insertVideo: { id: "insertVideo", title: "Insert Video", okLabel: "Insert", width: 420, fields: [{ type: "note", text: "This PC › Videos › Training" }, { type: "list", key: "file", label: "File name:", options: VIDEO_FILES, height: 100 }] },
  onlineVideo: { id: "onlineVideo", title: "Online Video", okLabel: "Insert", width: 420, fields: [{ type: "text", key: "address", label: "Enter the address for the online video:", placeholder: "https://" }, { type: "note", text: "Online videos need an internet connection when you present." }] },
  insertAudio: { id: "insertAudio", title: "Insert Audio", okLabel: "Insert", width: 420, fields: [{ type: "note", text: "This PC › Music" }, { type: "list", key: "file", label: "File name:", options: AUDIO_FILES, height: 100 }] },
  insertChart: { id: "insertChart", title: "Insert Chart", width: 400, fields: [{ type: "list", key: "type", label: "All Charts", options: CHART_TYPES, height: 170 }] },
  changeChartType: { id: "changeChartType", title: "Change Chart Type", width: 400, fields: [{ type: "list", key: "type", label: "All Charts", options: CHART_TYPES, height: 170 }] },
  insertSmartArt: { id: "insertSmartArt", title: "Choose a SmartArt Graphic", width: 440, fields: [{ type: "select", key: "category", label: "Category:", options: ["All", "List", "Process", "Cycle", "Hierarchy", "Relationship"] }, { type: "list", key: "graphic", label: "", options: SMARTART_LAYOUTS, height: 170 }] },
  convertSmartArt: { id: "convertSmartArt", title: "Choose a SmartArt Graphic", width: 440, fields: [{ type: "select", key: "category", label: "Category:", options: ["All", "List", "Process", "Cycle", "Hierarchy", "Relationship"] }, { type: "list", key: "graphic", label: "", options: SMARTART_LAYOUTS, height: 170 }] },
  insertTable: { id: "insertTable", title: "Insert Table", width: 280, fields: [{ type: "number", key: "cols", label: "Number of columns:", default: 5, min: 1 }, { type: "number", key: "rows", label: "Number of rows:", default: 2, min: 1 }] },
  headerFooter: {
    id: "headerFooter",
    title: "Header and Footer",
    okLabel: "Apply to All",
    width: 420,
    fields: [
      { type: "checkbox", key: "date", label: "Date and time" },
      { type: "checkbox", key: "slideNumber", label: "Slide number" },
      { type: "checkbox", key: "footer", label: "Footer" },
      { type: "text", key: "footerText", label: "Footer text:" },
      { type: "checkbox", key: "dontShowOnTitle", label: "Don't show on title slide" },
    ],
  },
  formatBackground: {
    id: "formatBackground",
    title: "Format Background",
    width: 340,
    fields: [
      { type: "radio", key: "fill", label: "Fill", options: ["Solid fill", "Gradient fill", "Picture or texture fill", "Pattern fill"], default: "Solid fill" },
      { type: "checkbox", key: "hideGraphics", label: "Hide background graphics" },
      { type: "color", key: "color", label: "Color:", options: ["#FFFFFF", "#F2F2F2", "#DDEBF7", "#E2EFDA", "#FFF2CC", "#FCE4D6", "#1F3864", "#000000"] },
      { type: "checkbox", key: "applyToAll", label: "Apply to All" },
    ],
  },
  addSection: { id: "addSection", title: "Rename Section", okLabel: "Rename", width: 300, fields: [{ type: "text", key: "name", label: "Section name:", default: "Untitled Section" }] },
  renameSection: { id: "renameSection", title: "Rename Section", okLabel: "Rename", width: 300, fields: [{ type: "text", key: "name", label: "Section name:" }] },
  newComment: { id: "newComment", title: "New Comment", okLabel: "Post", width: 340, fields: [{ type: "note", text: "BEOC Student" }, { type: "text", key: "text", label: "Comment:", placeholder: "Start a conversation" }] },
  link: { id: "link", title: "Insert Hyperlink", width: 420, fields: [{ type: "text", key: "text", label: "Text to display:" }, { type: "text", key: "address", label: "Address:", placeholder: "https://" }] },
  altText: { id: "altText", title: "Alt Text", width: 360, fields: [{ type: "note", text: "How would you describe this object and its context to someone who is blind or has low vision?" }, { type: "text", key: "text", label: "Description:" }, { type: "checkbox", key: "decorative", label: "Mark as decorative" }] },
  slideSize: { id: "slideSize", title: "Slide Size", width: 320, fields: [{ type: "select", key: "size", label: "Slides sized for:", options: ["Widescreen (16:9)", "Standard (4:3)", "Letter Paper (8.5x11 in)", "On-screen Show (16:10)"] }, { type: "radio", key: "orientation", label: "Slides", options: ["Portrait", "Landscape"], default: "Landscape" }] },
  setupShow: {
    id: "setupShow",
    title: "Set Up Show",
    width: 420,
    fields: [
      { type: "radio", key: "showType", label: "Show type", options: ["Presented by a speaker (full screen)", "Browsed by an individual (window)", "Browsed at a kiosk (full screen)"], default: "Presented by a speaker (full screen)" },
      { type: "checkbox", key: "loop", label: "Loop continuously until 'Esc'" },
      { type: "checkbox", key: "noNarration", label: "Show without narration" },
      { type: "checkbox", key: "noAnimation", label: "Show without animation" },
      { type: "radio", key: "showSlides", label: "Show slides", options: ["All", "From:", "Custom show:"], default: "All" },
      { type: "number", key: "from", label: "From slide:", min: 1, default: 1 },
      { type: "number", key: "to", label: "To slide:", min: 1, default: 1 },
      { type: "select", key: "customShow", label: "Custom show:", options: [] },
      { type: "radio", key: "advance", label: "Advance slides", options: ["Manually", "Using timings, if present"], default: "Using timings, if present" },
      { type: "checkbox", key: "presenterView", label: "Use Presenter View" },
    ],
  },
  zoom: { id: "zoom", title: "Zoom", width: 260, fields: [{ type: "radio", key: "preset", label: "Zoom to", options: ["Fit", "400%", "200%", "100%", "66%", "50%"], default: "Fit" }, { type: "number", key: "percent", label: "Percent:", default: 100, step: 10 }] },
  renameLayout: { id: "renameLayout", title: "Rename Layout", okLabel: "Rename", width: 300, fields: [{ type: "text", key: "name", label: "Layout name:" }] },
  saveTheme: { id: "saveTheme", title: "Save Current Theme", okLabel: "Save", width: 380, fields: [{ type: "note", text: "Document Themes" }, { type: "text", key: "name", label: "File name:", default: "Theme1" }, { type: "note", text: "Save as type: Office Theme (*.thmx)" }] },
  customizeColors: { id: "customizeColors", title: "Create New Theme Colors", okLabel: "Save", width: 380, fields: [{ type: "color", key: "accent1", label: "Accent 1:", options: ["#4472C4", "#1F3864", "#2E7D32", "#C00000", "#7030A0", "#ED7D31", "#00B0F0", "#FFC000"] }, { type: "text", key: "name", label: "Name:", default: "Custom 1" }] },
  customizeFonts: { id: "customizeFonts", title: "Create New Theme Fonts", okLabel: "Save", width: 380, fields: [{ type: "select", key: "heading", label: "Heading font:", options: FONTS }, { type: "select", key: "body", label: "Body font:", options: FONTS }, { type: "text", key: "name", label: "Name:", default: "Custom 1" }] },
  compressPictures: {
    id: "compressPictures",
    title: "Compress Pictures",
    width: 380,
    fields: [
      { type: "note", text: "Compression options:" },
      { type: "checkbox", key: "applyOnly", label: "Apply only to this picture", default: true },
      { type: "checkbox", key: "deleteCropped", label: "Delete cropped areas of pictures", default: true },
      { type: "radio", key: "resolution", label: "Resolution:", options: ["High fidelity", "HD (330 ppi)", "Print (220 ppi)", "Web (150 ppi)", "E-mail (96 ppi)", "Use default resolution"], default: "Use default resolution" },
    ],
  },
  rotation: {
    id: "rotation",
    title: "Size and Rotation",
    width: 320,
    fields: [
      { type: "number", key: "height", label: "Height:", step: 0.1, min: 0, suffix: '"' },
      { type: "number", key: "width", label: "Width:", step: 0.1, min: 0, suffix: '"' },
      { type: "number", key: "degrees", label: "Rotation:", step: 5, suffix: "°" },
      { type: "checkbox", key: "lockAspect", label: "Lock aspect ratio" },
      { type: "note", text: "With Lock aspect ratio on, changing the width changes the height to match (and the other way around)." },
    ],
  },
  trimVideo: { id: "trimVideo", title: "Trim Video", width: 360, fields: [{ type: "note", text: "Drag the green and red markers, or type the start and end times in seconds." }, { type: "number", key: "start", label: "Start Time:", min: 0, step: 1, suffix: "seconds" }, { type: "number", key: "end", label: "End Time:", min: 0, step: 1, suffix: "seconds" }] },
  trimAudio: { id: "trimAudio", title: "Trim Audio", width: 360, fields: [{ type: "note", text: "Drag the green and red markers, or type the start and end times in seconds." }, { type: "number", key: "start", label: "Start Time:", min: 0, step: 1, suffix: "seconds" }, { type: "number", key: "end", label: "End Time:", min: 0, step: 1, suffix: "seconds" }] },
};

/**
 * The Ribbon for the presentation in view: the Variants thumbnails take the current theme's colors.
 * Called as a method of the app module, so a harness that swaps in a patched `ribbon` keeps it.
 */
export function pptRibbonFor(this: { ribbon?: RibbonTab[] } | void, deck: PptDeck): RibbonTab[] {
  const base = (this && this.ribbon) || pptRibbon;
  // New Slide and Layout list the deck's layouts by their (possibly renamed) names, including
  // layouts added with Slide Master › Insert Layout.
  const custom = deckLayouts(deck).filter((l) => !LAYOUTS.includes(l));
  const renamed = Object.keys(readMaster(deck).layoutNames ?? {}).length > 0;
  const layoutList = (opts: RibbonOption[]): RibbonOption[] => {
    const at = opts.findIndex((o) => o.command);
    const head = (at < 0 ? opts : opts.slice(0, at)).map((o) => (o.icon === "layout" ? { ...o, label: layoutName(deck, o.value) } : o));
    const extra = custom.map((l) => ({ value: l, label: layoutName(deck, l), icon: "layout" }));
    return [...head, ...extra, ...(at < 0 ? [] : opts.slice(at))];
  };
  return base.map((t) => ({
    ...t,
    groups: t.groups.map((g) => ({
      ...g,
      controls: g.controls.map((c) => {
        if (c.type === "gallery" && c.id === "design.variant") {
          return { ...c, options: c.options.map((o) => (!o.command && !o.dialog && !o.heading && /^[1-4]$/.test(o.value) ? { ...o, color: variantAccent(deck.theme, Number(o.value)) } : o)) };
        }
        if ((custom.length || renamed) && c.type === "dropdown" && (c.id === "slides.new" || c.id === "slides.layout")) return { ...c, options: layoutList(c.options) };
        return c;
      }),
    })),
  }));
}
