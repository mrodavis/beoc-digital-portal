import type { DialogDef, RibbonOption, RibbonTab } from "@/types/sim";
import { THEME_COLORS } from "../../chrome/colors";
import { ANIMATIONS, EMPHASIS, EXITS, LAYOUTS, PPT_THEMES, PPT_THEME_NAMES, TRANSITIONS } from "./model";

const FONTS = ["Aptos", "Aptos Display", "Arial", "Calibri", "Calibri Light", "Century Gothic", "Garamond", "Georgia", "Gill Sans MT", "Segoe UI", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"];
const SIZES = ["10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "40", "44", "48", "54", "60", "72", "96"];

const colorOpts = (extra: RibbonOption[] = []): RibbonOption[] => [
  ...extra,
  { value: "Theme Colors", heading: true },
  ...THEME_COLORS.slice(0, 10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
  { value: "Standard Colors", heading: true },
  ...THEME_COLORS.slice(10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
];

const layoutOpts: RibbonOption[] = LAYOUTS.map((l) => ({ value: l, icon: "layout" }));
const SHAPES = ["Rectangle", "Rounded Rectangle", "Oval", "Triangle", "Right Arrow", "Star: 5 Points", "Speech Bubble: Rectangle", "Callout"];
const PICTURES = ["clinic-lobby.jpg", "handwashing.png", "care-team.jpg", "flu-shot.jpg", "lakeside-logo.png", "map-to-clinic.png"];

export const pptRibbon: RibbonTab[] = [
  {
    id: "home",
    label: "Home",
    groups: [
      {
        label: "Clipboard",
        controls: [
          { type: "dropdown", id: "home.paste", label: "Paste", icon: "paste", size: "large", split: true, options: ["Use Destination Theme", "Keep Source Formatting", "Picture", "Keep Text Only"].map((v) => ({ value: v, icon: "paste" })) },
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
          { type: "dropdown", id: "slides.section", label: "Section", icon: "section", showLabel: true, options: [{ value: "Add Section", dialog: "addSection" }, { value: "Remove All Sections" }, { value: "Collapse All" }, { value: "Expand All" }] },
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
            { type: "dropdown", id: "home.bullets", label: "Bullets", icon: "bullets", split: true, options: [{ value: "None" }, { value: "•", label: "• Filled Round" }, { value: "■", label: "■ Filled Square" }, { value: "✓", label: "✓ Checkmark" }] },
            { type: "dropdown", id: "home.numbering", label: "Numbering", icon: "numbering", split: true, options: [{ value: "None" }, { value: "1.", label: "1. 2. 3." }, { value: "A.", label: "A. B. C." }] },
            { type: "button", id: "home.indentDec", label: "Decrease List Level", icon: "indentDec" },
            { type: "button", id: "home.indentInc", label: "Increase List Level", icon: "indentInc" },
            { type: "dropdown", id: "home.lineSpacing", label: "Line Spacing", icon: "lineSpacing", options: ["1.0", "1.5", "2.0", "2.5", "3.0"].map((v) => ({ value: v })) },
          ],
          [
            { type: "toggle", id: "home.alignLeft", label: "Align Left", icon: "alignLeft", shortcut: "Ctrl+L" },
            { type: "toggle", id: "home.alignCenter", label: "Center", icon: "alignCenter", shortcut: "Ctrl+E" },
            { type: "toggle", id: "home.alignRight", label: "Align Right", icon: "alignRight", shortcut: "Ctrl+R" },
            { type: "toggle", id: "home.justify", label: "Justify", icon: "justify", shortcut: "Ctrl+J" },
            { type: "dropdown", id: "home.convertSmartArt", label: "Convert to SmartArt", icon: "smartart", options: ["Vertical Bullet List", "Basic Block List", "Basic Process", "Basic Cycle", "Hierarchy", "Continuous Block Process"].map((v) => ({ value: v })) },
          ],
        ],
      },
      {
        label: "Drawing",
        controls: [
          { type: "dropdown", id: "insert.shape", label: "Shapes", icon: "shapes", size: "large", gallery: "grid", options: SHAPES.map((v) => ({ value: v, icon: "shapes" })) },
          { type: "dropdown", id: "home.arrange", label: "Arrange", icon: "bringForward", size: "large", options: [
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
          ] },
          { type: "dropdown", id: "shape.style", label: "Quick Styles", icon: "effects", size: "large", gallery: "grid", options: ["Colored Fill - Blue, Accent 1", "Colored Fill - Orange, Accent 2", "Subtle Effect - Green, Accent 6", "Intense Effect - Blue, Accent 1"].map((v) => ({ value: v, icon: "shapes" })) },
          { type: "dropdown", id: "shape.fill", label: "Shape Fill", icon: "fill", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Fill", label: "No Fill" }]) },
          { type: "dropdown", id: "shape.outline", label: "Shape Outline", icon: "pen", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Outline", label: "No Outline" }]) },
          { type: "dropdown", id: "shape.effects", label: "Shape Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges", "Bevel"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Editing",
        controls: [
          { type: "button", id: "home.find", label: "Find", icon: "find", showLabel: true, shortcut: "Ctrl+F" },
          { type: "button", id: "home.replace", label: "Replace", icon: "replace", showLabel: true, dialog: "replace", shortcut: "Ctrl+H" },
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
      { label: "Tables", controls: [{ type: "dropdown", id: "insert.table", label: "Table", icon: "table", size: "large", options: [{ value: "Insert Table", heading: true }, ...["2x2", "3x2", "3x3", "3x4", "4x3", "4x4", "5x3"].map((v) => ({ value: v, label: `${v.replace("x", " × ")} Table`, icon: "table" })), { value: "Insert Table...", dialog: "insertTable" }] }] },
      {
        label: "Images",
        controls: [
          { type: "dropdown", id: "insert.pictures", label: "Pictures", icon: "picture", size: "large", options: [{ value: "Insert Picture From", heading: true }, { value: "This Device...", dialog: "insertPicture" }, { value: "Stock Images...", command: "insert.onlinePictures" }, { value: "Online Pictures...", command: "insert.onlinePictures" }] },
          { type: "dropdown", id: "insert.screenshot", label: "Screenshot", icon: "picture", showLabel: true, options: [{ value: "Screen Clipping" }] },
          { type: "button", id: "insert.photoAlbum", label: "Photo Album", icon: "picture", showLabel: true },
        ],
      },
      { label: "Camera", controls: [{ type: "button", id: "insert.cameo", label: "Cameo", icon: "video", size: "large" }] },
      {
        label: "Illustrations",
        controls: [
          { type: "dropdown", id: "insert.shape", label: "Shapes", icon: "shapes", size: "large", gallery: "grid", options: SHAPES.map((v) => ({ value: v, icon: "shapes" })) },
          { type: "button", id: "insert.icons", label: "Icons", icon: "icons", size: "large" },
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
          { type: "dropdown", id: "insert.video", label: "Video", icon: "video", size: "large", options: [{ value: "This Device...", dialog: "insertVideo" }, { value: "Stock Videos..." }, { value: "Online Videos..." }] },
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
      { label: "Themes", controls: [{ type: "gallery", id: "design.theme", label: "Themes", options: PPT_THEME_NAMES.map((t) => ({ value: t, label: t, color: PPT_THEMES[t].dark ? PPT_THEMES[t].bg : PPT_THEMES[t].accent })), width: 360 }] },
      { label: "Variants", controls: [{ type: "gallery", id: "design.variant", label: "Variants", options: [{ value: "1", label: "Variant 1", color: "#4472C4" }, { value: "2", label: "Variant 2", color: "#4472C4" }, { value: "3", label: "Variant 3", color: "#70AD47" }, { value: "4", label: "Variant 4", color: "#ED7D31" }], width: 200 }] },
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
        { type: "dropdown", id: "transition.effect", label: "Effect Options", icon: "options", size: "large", options: ["From Right", "From Left", "From Top", "From Bottom", "Smoothly", "Through Black"].map((v) => ({ value: v })) },
      ] },
      {
        label: "Timing",
        controls: [],
        rows: [
          [{ type: "dropdown", id: "transition.sound", label: "Sound", combo: true, width: 110, options: ["[No Sound]", "Applause", "Chime", "Click"].map((v) => ({ value: v })) }, { type: "toggle", id: "transition.onClick", label: "On Mouse Click", showLabel: true }],
          [{ type: "dropdown", id: "transition.duration", label: "Duration", combo: true, width: 60, options: ["00.50", "01.00", "01.50", "02.00", "03.00"].map((v) => ({ value: v })) }, { type: "dropdown", id: "transition.advanceAfter", label: "After", combo: true, width: 70, options: ["00:00.00", "00:05.00", "00:10.00"].map((v) => ({ value: v })) }],
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
        { type: "gallery", id: "animation.apply", label: "Animations", options: [...ANIMATIONS.map((a) => ({ value: a, label: a, preview: { color: "#2E7D32" } })), ...EMPHASIS.map((a) => ({ value: a, label: a, preview: { color: "#B8860B" } })), ...EXITS.map((a) => ({ value: a, label: a, preview: { color: "#C00000" } }))], width: 340 },
        { type: "dropdown", id: "animation.effect", label: "Effect Options", icon: "options", size: "large", options: ["From Bottom", "From Left", "From Right", "From Top", "As One Object", "By Paragraph"].map((v) => ({ value: v })) },
      ] },
      { label: "Advanced Animation", controls: [
        { type: "dropdown", id: "animation.add", label: "Add Animation", icon: "animation", size: "large", options: [{ value: "Entrance", heading: true }, ...ANIMATIONS.slice(1).map((a) => ({ value: a })), { value: "Emphasis", heading: true }, ...EMPHASIS.map((a) => ({ value: a })), { value: "Exit", heading: true }, ...EXITS.map((a) => ({ value: a }))] },
        { type: "toggle", id: "animation.pane", label: "Animation Pane", icon: "navPane", showLabel: true },
        { type: "dropdown", id: "animation.trigger", label: "Trigger", icon: "select", showLabel: true, options: [{ value: "On Click of" }, { value: "On Bookmark" }] },
        { type: "button", id: "animation.painter", label: "Animation Painter", icon: "formatPainter", showLabel: true },
      ] },
      {
        label: "Timing",
        controls: [],
        rows: [
          [{ type: "dropdown", id: "animation.start", label: "Start", combo: true, width: 110, options: ["On Click", "With Previous", "After Previous"].map((v) => ({ value: v })) }, { type: "button", id: "animation.earlier", label: "Move Earlier", icon: "undo", showLabel: true }],
          [{ type: "dropdown", id: "animation.duration", label: "Duration", combo: true, width: 60, options: ["00.50", "01.00", "02.00"].map((v) => ({ value: v })) }, { type: "button", id: "animation.later", label: "Move Later", icon: "redo", showLabel: true }],
          [{ type: "dropdown", id: "animation.delay", label: "Delay", combo: true, width: 60, options: ["00.00", "00.50", "01.00"].map((v) => ({ value: v })) }],
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
        { type: "button", id: "slideshow.online", label: "Present Online", icon: "share", size: "large" },
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
      { label: "Proofing", controls: [{ type: "button", id: "review.spelling", label: "Spelling", icon: "spelling", size: "large", shortcut: "F7" }, { type: "button", id: "review.thesaurus", label: "Thesaurus", icon: "thesaurus", showLabel: true }] },
      { label: "Accessibility", controls: [{ type: "dropdown", id: "review.accessibility", label: "Check Accessibility", icon: "accessibility", size: "large", split: true, options: [{ value: "Check Accessibility" }, { value: "Alt Text", dialog: "altText" }] }] },
      { label: "Insights", controls: [{ type: "button", id: "review.smartLookup", label: "Smart Lookup", icon: "smartLookup", size: "large" }] },
      { label: "Language", controls: [{ type: "button", id: "review.translate", label: "Translate", icon: "translate", size: "large" }] },
      { label: "Comments", controls: [
        { type: "button", id: "review.newComment", label: "New Comment", icon: "comment", size: "large", dialog: "newComment" },
        { type: "dropdown", id: "review.deleteComment", label: "Delete", icon: "reject", showLabel: true, split: true, options: [{ value: "Delete" }, { value: "Delete All Comments in This Presentation" }] },
        { type: "button", id: "review.prevComment", label: "Previous", icon: "undo", showLabel: true },
        { type: "button", id: "review.nextComment", label: "Next", icon: "redo", showLabel: true },
        { type: "toggle", id: "review.showComments", label: "Show Comments", icon: "comment", showLabel: true },
      ] },
      { label: "Compare", controls: [{ type: "button", id: "review.compare", label: "Compare", icon: "compare", size: "large" }] },
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
      { label: "Edit Master", controls: [{ type: "button", id: "master.insertMaster", label: "Insert Slide Master", icon: "master", size: "large" }, { type: "button", id: "master.insertLayout", label: "Insert Layout", icon: "layout", size: "large" }, { type: "button", id: "master.rename", label: "Rename", icon: "textbox", showLabel: true, dialog: "renameLayout" }] },
      { label: "Edit Theme", controls: [{ type: "dropdown", id: "design.theme", label: "Themes", icon: "themes", size: "large", options: PPT_THEME_NAMES.map((t) => ({ value: t })) }, { type: "dropdown", id: "master.colors", label: "Colors", icon: "colors", showLabel: true, options: ["Office", "Blue", "Green", "Red"].map((v) => ({ value: v })) }, { type: "dropdown", id: "master.fonts", label: "Fonts", icon: "fonts", showLabel: true, options: ["Office", "Arial", "Calibri", "Georgia"].map((v) => ({ value: v })) }] },
      { label: "Background", controls: [{ type: "button", id: "design.formatBackground", label: "Format Background", icon: "background", showLabel: true, dialog: "formatBackground" }] },
      { label: "Close", controls: [{ type: "button", id: "master.close", label: "Close Master View", icon: "close", size: "large" }] },
    ],
  },
  {
    id: "shapeFormat",
    label: "Shape Format",
    contextual: "shape",
    groups: [
      { label: "Insert Shapes", controls: [{ type: "dropdown", id: "insert.shape", label: "Shapes", icon: "shapes", size: "large", options: SHAPES.map((v) => ({ value: v })) }, { type: "button", id: "insert.textBox", label: "Text Box", icon: "textbox", showLabel: true }] },
      { label: "Shape Styles", controls: [
        { type: "gallery", id: "shape.style", label: "Shape Styles", options: ["Colored Fill - Blue, Accent 1", "Colored Fill - Orange, Accent 2", "Subtle Effect - Green, Accent 6", "Intense Effect - Blue, Accent 1"].map((v) => ({ value: v, label: v })), width: 260 },
        { type: "dropdown", id: "shape.fill", label: "Shape Fill", icon: "fill", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Fill", label: "No Fill" }]) },
        { type: "dropdown", id: "shape.outline", label: "Shape Outline", icon: "pen", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Outline", label: "No Outline" }]) },
        { type: "dropdown", id: "shape.effects", label: "Shape Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Bevel"].map((v) => ({ value: v })) },
      ] },
      { label: "Accessibility", controls: [{ type: "button", id: "shape.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      { label: "Arrange", controls: [
        { type: "button", id: "object.bringForward", label: "Bring Forward", icon: "bringForward", showLabel: true },
        { type: "button", id: "object.sendBackward", label: "Send Backward", icon: "sendBackward", showLabel: true },
        { type: "dropdown", id: "object.align", label: "Align", icon: "align", showLabel: true, options: ["Align Left", "Align Center", "Align Right", "Align Top", "Align Middle", "Align Bottom", "Distribute Horizontally"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "object.group", label: "Group", icon: "groupObjects", showLabel: true, options: [{ value: "Group" }, { value: "Ungroup", command: "object.ungroup" }] },
        { type: "dropdown", id: "object.rotate", label: "Rotate", icon: "rotate", showLabel: true, options: ["Rotate Right 90°", "Rotate Left 90°", "Flip Vertical", "Flip Horizontal"].map((v) => ({ value: v })) },
      ] },
      { label: "Size", controls: [{ type: "dropdown", id: "object.size", label: "Width", combo: true, width: 60, options: ["2", "3", "4", "5", "6"].map((v) => ({ value: v, label: `${v}"` })) }] },
    ],
  },
  {
    id: "pictureFormat",
    label: "Picture Format",
    contextual: "picture",
    groups: [
      { label: "Adjust", controls: [
        { type: "button", id: "picture.removeBackground", label: "Remove Background", icon: "removeBg", size: "large" },
        { type: "dropdown", id: "picture.corrections", label: "Corrections", icon: "corrections", size: "large", options: ["Sharpen: 25%", "Brightness: +20%", "Contrast: +20%"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "picture.color", label: "Color", icon: "colors", size: "large", options: ["Saturation: 0%", "Grayscale", "Sepia", "Washout"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "picture.artistic", label: "Artistic Effects", icon: "effects", size: "large", options: ["None", "Pencil Sketch", "Blur", "Paint Brush"].map((v) => ({ value: v })) },
        { type: "button", id: "picture.reset", label: "Reset Picture", icon: "reset", showLabel: true },
      ] },
      { label: "Picture Styles", controls: [
        { type: "gallery", id: "picture.style", label: "Picture Styles", options: ["Simple Frame, White", "Drop Shadow Rectangle", "Rounded Diagonal Corner, White", "Reflected Rounded Rectangle", "Soft Edge Oval", "Metal Frame"].map((v) => ({ value: v, label: v })), width: 300 },
        { type: "dropdown", id: "picture.border", label: "Picture Border", icon: "pageBorders", showLabel: true, gallery: "swatches", options: colorOpts([{ value: "No Outline", label: "No Outline" }]) },
        { type: "dropdown", id: "picture.effects", label: "Picture Effects", icon: "effects", showLabel: true, options: ["Shadow", "Reflection", "Glow", "Soft Edges"].map((v) => ({ value: v })) },
      ] },
      { label: "Accessibility", controls: [{ type: "button", id: "picture.altText", label: "Alt Text", icon: "altText", size: "large", dialog: "altText" }] },
      { label: "Arrange", controls: [
        { type: "button", id: "object.bringForward", label: "Bring Forward", icon: "bringForward", showLabel: true },
        { type: "button", id: "object.sendBackward", label: "Send Backward", icon: "sendBackward", showLabel: true },
        { type: "dropdown", id: "object.align", label: "Align", icon: "align", showLabel: true, options: ["Align Left", "Align Center", "Align Right", "Align Top", "Align Middle", "Align Bottom"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "object.rotate", label: "Rotate", icon: "rotate", showLabel: true, options: ["Rotate Right 90°", "Rotate Left 90°", "Flip Vertical", "Flip Horizontal"].map((v) => ({ value: v })) },
      ] },
      { label: "Size", controls: [{ type: "button", id: "picture.crop", label: "Crop", icon: "crop", size: "large" }, { type: "dropdown", id: "object.size", label: "Width", combo: true, width: 60, options: ["2", "3", "4", "5", "6"].map((v) => ({ value: v, label: `${v}"` })) }] },
    ],
  },
  {
    id: "tableDesign",
    label: "Table Design",
    contextual: "table",
    groups: [
      { label: "Table Style Options", controls: [{ type: "toggle", id: "table.headerRow", label: "Header Row", showLabel: true }, { type: "toggle", id: "table.totalRow", label: "Total Row", showLabel: true }, { type: "toggle", id: "table.bandedRows", label: "Banded Rows", showLabel: true }] },
      { label: "Table Styles", controls: [{ type: "gallery", id: "table.style", label: "Table Styles", options: ["Medium Style 2 - Accent 1", "Medium Style 2 - Accent 2", "Light Style 1 - Accent 1", "Themed Style 1 - Accent 6"].map((v) => ({ value: v, label: v })), width: 300 }] },
    ],
  },
  {
    id: "chartDesign",
    label: "Chart Design",
    contextual: "chart",
    groups: [
      { label: "Chart Layouts", controls: [{ type: "dropdown", id: "chart.addElement", label: "Add Chart Element", icon: "chart", size: "large", options: ["Chart Title", "Data Labels", "Legend", "Gridlines"].map((v) => ({ value: v })) }] },
      { label: "Chart Styles", controls: [{ type: "dropdown", id: "chart.colors", label: "Change Colors", icon: "colors", size: "large", options: ["Colorful Palette 1", "Colorful Palette 2", "Monochromatic Palette 1"].map((v) => ({ value: v })) }, { type: "gallery", id: "chart.style", label: "Chart Styles", options: ["Style 1", "Style 2", "Style 3", "Style 4", "Style 5", "Style 6"].map((v) => ({ value: v, label: v })), width: 240 }] },
      { label: "Type", controls: [{ type: "dropdown", id: "chart.type", label: "Change Chart Type", icon: "chart", size: "large", options: ["Clustered Column", "Clustered Bar", "Line", "Pie", "Doughnut"].map((v) => ({ value: v })) }] },
    ],
  },
  {
    id: "smartArtDesign",
    label: "SmartArt Design",
    contextual: "smartart",
    groups: [
      { label: "Layouts", controls: [{ type: "gallery", id: "smartart.layout", label: "Layouts", options: ["Vertical Bullet List", "Basic Block List", "Basic Process", "Basic Cycle", "Hierarchy", "Continuous Block Process"].map((v) => ({ value: v, label: v })), width: 300 }] },
      { label: "SmartArt Styles", controls: [{ type: "dropdown", id: "smartart.colors", label: "Change Colors", icon: "colors", size: "large", options: ["Colorful - Accent Colors", "Colorful Range - Accent Colors 2 to 3", "Primary Theme Colors"].map((v) => ({ value: v })) }, { type: "gallery", id: "smartart.style", label: "SmartArt Styles", options: ["Simple Fill", "White Outline", "Subtle Effect", "Moderate Effect", "Intense Effect"].map((v) => ({ value: v, label: v })), width: 240 }] },
    ],
  },
  {
    id: "playback",
    label: "Playback",
    contextual: "media",
    groups: [
      { label: "Preview", controls: [{ type: "button", id: "media.play", label: "Play", icon: "preview", size: "large" }] },
      { label: "Editing", controls: [{ type: "button", id: "media.trim", label: "Trim", icon: "crop", size: "large" }] },
      { label: "Options", controls: [{ type: "dropdown", id: "media.start", label: "Start", combo: true, width: 110, options: ["In Click Sequence", "Automatically", "When Clicked On"].map((v) => ({ value: v })) }, { type: "toggle", id: "media.loop", label: "Loop until Stopped", showLabel: true }, { type: "toggle", id: "media.hide", label: "Hide During Show", showLabel: true }] },
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

export const pptDialogs: Record<string, DialogDef> = {
  font: {
    id: "font",
    title: "Font",
    width: 420,
    fields: [
      { type: "select", key: "font", label: "Latin text font:", options: FONTS },
      { type: "select", key: "style", label: "Font style:", options: ["Regular", "Italic", "Bold", "Bold Italic"] },
      { type: "select", key: "size", label: "Size:", options: SIZES },
      { type: "color", key: "color", label: "Font color:", options: ["Automatic", ...THEME_COLORS.slice(4, 14).map((c) => c.color)] },
    ],
  },
  paragraph: {
    id: "paragraph",
    title: "Paragraph",
    width: 400,
    fields: [
      { type: "select", key: "alignment", label: "Alignment:", options: ["Left", "Centered", "Right", "Justified"] },
      { type: "number", key: "before", label: "Spacing before:", step: 6, suffix: "pt" },
      { type: "select", key: "lineSpacing", label: "Line Spacing:", options: ["Single", "1.5 lines", "Double", "Multiple"] },
    ],
  },
  insertPicture: { id: "insertPicture", title: "Insert Picture", okLabel: "Insert", width: 440, fields: [{ type: "note", text: "This PC › Pictures › Clinic" }, { type: "list", key: "file", label: "File name:", options: PICTURES, height: 130 }] },
  insertVideo: { id: "insertVideo", title: "Insert Video", okLabel: "Insert", width: 420, fields: [{ type: "list", key: "file", label: "File name:", options: ["handwashing-steps.mp4", "welcome-message.mp4", "check-in-kiosk.mp4"], height: 90 }] },
  insertAudio: { id: "insertAudio", title: "Insert Audio", okLabel: "Insert", width: 420, fields: [{ type: "list", key: "file", label: "File name:", options: ["intro-music.mp3", "narration-slide1.m4a", "chime.wav"], height: 90 }] },
  insertChart: { id: "insertChart", title: "Insert Chart", width: 400, fields: [{ type: "list", key: "type", label: "All Charts", options: ["Clustered Column", "Stacked Column", "Line", "Pie", "Clustered Bar", "Doughnut", "Area"], height: 150 }] },
  insertSmartArt: { id: "insertSmartArt", title: "Choose a SmartArt Graphic", width: 440, fields: [{ type: "select", key: "category", label: "Category:", options: ["All", "List", "Process", "Cycle", "Hierarchy", "Relationship"] }, { type: "list", key: "graphic", label: "", options: ["Vertical Bullet List", "Basic Block List", "Basic Process", "Basic Cycle", "Hierarchy", "Continuous Block Process", "Basic Venn"], height: 150 }] },
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
    width: 320,
    fields: [
      { type: "radio", key: "fill", label: "Fill", options: ["Solid fill", "Gradient fill", "Picture or texture fill", "Pattern fill"], default: "Solid fill" },
      { type: "color", key: "color", label: "Color:", options: ["#FFFFFF", "#F2F2F2", "#DDEBF7", "#E2EFDA", "#FFF2CC", "#FCE4D6", "#1F3864", "#000000"] },
      { type: "checkbox", key: "applyToAll", label: "Apply to All" },
    ],
  },
  addSection: { id: "addSection", title: "Rename Section", okLabel: "Rename", width: 300, fields: [{ type: "text", key: "name", label: "Section name:", default: "Untitled Section" }] },
  newComment: { id: "newComment", title: "New Comment", okLabel: "Post", width: 340, fields: [{ type: "note", text: "BEOC Student" }, { type: "text", key: "text", label: "Comment:", placeholder: "Start a conversation" }] },
  link: { id: "link", title: "Insert Hyperlink", width: 420, fields: [{ type: "text", key: "text", label: "Text to display:" }, { type: "text", key: "address", label: "Address:", placeholder: "https://" }] },
  altText: { id: "altText", title: "Alt Text", width: 360, fields: [{ type: "note", text: "How would you describe this object and its context to someone who is blind or has low vision?" }, { type: "text", key: "text", label: "Description:" }, { type: "checkbox", key: "decorative", label: "Mark as decorative" }] },
  replace: { id: "replace", title: "Replace", okLabel: "Replace All", width: 380, fields: [{ type: "text", key: "find", label: "Find what:" }, { type: "text", key: "replace", label: "Replace with:" }, { type: "checkbox", key: "matchCase", label: "Match case" }] },
  slideSize: { id: "slideSize", title: "Slide Size", width: 320, fields: [{ type: "select", key: "size", label: "Slides sized for:", options: ["Widescreen (16:9)", "Standard (4:3)", "Letter Paper (8.5x11 in)", "On-screen Show (16:10)"] }, { type: "radio", key: "orientation", label: "Slides", options: ["Portrait", "Landscape"], default: "Landscape" }] },
  setupShow: { id: "setupShow", title: "Set Up Show", width: 380, fields: [{ type: "radio", key: "showType", label: "Show type", options: ["Presented by a speaker (full screen)", "Browsed by an individual (window)", "Browsed at a kiosk (full screen)"], default: "Presented by a speaker (full screen)" }, { type: "checkbox", key: "loop", label: "Loop continuously until 'Esc'" }, { type: "checkbox", key: "noNarration", label: "Show without narration" }] },
  zoom: { id: "zoom", title: "Zoom", width: 260, fields: [{ type: "radio", key: "preset", label: "Zoom to", options: ["Fit", "400%", "200%", "100%", "66%", "50%"], default: "Fit" }, { type: "number", key: "percent", label: "Percent:", default: 100, step: 10 }] },
  renameLayout: { id: "renameLayout", title: "Rename Layout", width: 300, fields: [{ type: "text", key: "name", label: "Layout name:" }] },
};
