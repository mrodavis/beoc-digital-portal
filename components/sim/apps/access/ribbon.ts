import type { RibbonControl, RibbonGroup, RibbonOption, RibbonTab } from "@/types/sim";
import { THEME_COLORS } from "../../chrome/colors";
import { DATA_TYPES } from "./types";

const FONTS = ["Aptos", "Calibri", "Calibri Light", "Arial", "Cambria", "Century Gothic", "Courier New", "Georgia", "Segoe UI", "Tahoma", "Times New Roman", "Verdana"];
const SIZES = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36"];
export const VIEW_OPTIONS = ["Datasheet View", "Design View", "SQL View", "Form View", "Layout View", "Report View", "Print Preview"];
export const FIELD_FORMATS = ["General Number", "Currency", "Euro", "Fixed", "Standard", "Percent", "Scientific", "General Date", "Long Date", "Medium Date", "Short Date", "Long Time", "Medium Time", "Short Time", "Yes/No", "True/False", "On/Off"];
export const THEMES = ["Office", "Facet", "Integral", "Ion", "Ion Boardroom", "Organic", "Retrospect", "Slice", "Wisp", "Banded", "Basis", "Celestial"];
export const CONTROL_TOOLS = ["Text Box", "Label", "Button", "Tab Control", "Hyperlink", "Combo Box", "List Box", "Check Box", "Option Group", "Toggle Button", "Option Button", "Image", "Line", "Rectangle", "Subform/Subreport", "Chart", "Insert Page Break"];

const colorOpts = (first: RibbonOption): RibbonOption[] => [
  first,
  { value: "Theme Colors", heading: true },
  ...THEME_COLORS.slice(0, 10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
  { value: "Standard Colors", heading: true },
  ...THEME_COLORS.slice(10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
];

const viewGroup = (): RibbonGroup => ({
  label: "Views",
  controls: [{ type: "dropdown", id: "home.view", label: "View", icon: "normalView", size: "large", split: true, faceValue: "toggle", options: VIEW_OPTIONS.map((v) => ({ value: v, icon: v === "Design View" ? "layout" : v === "SQL View" ? "fx" : v === "Print Preview" ? "preview" : v === "Layout View" ? "layout" : "table" })) }],
});

const fontRows = (): RibbonControl[][] => [
  [
    { type: "dropdown", id: "home.fontName", label: "Font", combo: true, width: 110, options: FONTS.map((f) => ({ value: f, preview: { font: f } })) },
    { type: "dropdown", id: "home.fontSize", label: "Font Size", combo: true, width: 40, options: SIZES.map((s) => ({ value: s })) },
  ],
  [
    { type: "toggle", id: "home.bold", label: "Bold", icon: "bold", shortcut: "Ctrl+B" },
    { type: "toggle", id: "home.italic", label: "Italic", icon: "italic", shortcut: "Ctrl+I" },
    { type: "toggle", id: "home.underline", label: "Underline", icon: "underline", shortcut: "Ctrl+U" },
    { type: "dropdown", id: "home.fontColor", label: "Font Color", icon: "fontColor", split: true, faceValue: "#C00000", gallery: "swatches", options: colorOpts({ value: "Automatic", label: "Automatic", color: "#000000" }) },
    { type: "dropdown", id: "home.fill", label: "Background Color", icon: "fill", split: true, faceValue: "#FFFF00", gallery: "swatches", options: colorOpts({ value: "No Color", label: "No Color" }) },
  ],
  [
    { type: "button", id: "home.alignLeft", label: "Align Left", icon: "alignLeft" },
    { type: "button", id: "home.alignCenter", label: "Center", icon: "alignCenter" },
    { type: "button", id: "home.alignRight", label: "Align Right", icon: "alignRight" },
  ],
];

const controlsGroup = (): RibbonGroup => ({
  label: "Controls",
  controls: [
    { type: "button", id: "form.tool.Text Box", label: "Text Box", icon: "textbox" },
    { type: "button", id: "form.tool.Label", label: "Label", icon: "caption" },
    { type: "button", id: "form.buttonWizard", label: "Button", icon: "shapes", dialog: "backstage:buttonWizard" },
    { type: "button", id: "form.tool.Combo Box", label: "Combo Box", icon: "select" },
    { type: "button", id: "form.tool.Check Box", label: "Check Box", icon: "checkIssues" },
    { type: "button", id: "form.tool.List Box", label: "List Box", icon: "bullets" },
    { type: "dropdown", id: "form.tool", label: "More Controls", icon: "more", options: CONTROL_TOOLS.map((v) => ({ value: v })) },
    { type: "toggle", id: "form.wizards", label: "Use Control Wizards", icon: "designer", showLabel: true },
  ],
});

const headerFooterGroup = (report: boolean): RibbonGroup => ({
  label: "Header / Footer",
  controls: [
    ...(report ? [{ type: "button", id: "report.pageNumbersBtn", label: "Page Numbers", icon: "pageNumber", size: "large", dialog: "pageNumbers" } as RibbonControl] : []),
    { type: "button", id: "form.logo", label: "Logo", icon: "picture", showLabel: true },
    { type: "button", id: "form.title", label: "Title", icon: "header", showLabel: true },
    { type: "button", id: "form.dateTimeBtn", label: "Date and Time", icon: "date", showLabel: true, dialog: "dateTime" },
  ],
});

const designToolsGroup = (design: boolean): RibbonGroup => ({
  label: "Tools",
  controls: [
    { type: "toggle", id: "form.fieldList", label: "Add Existing Fields", icon: "field", size: "large" },
    { type: "toggle", id: "design.propertySheet", label: "Property Sheet", icon: "options", size: "large", shortcut: "F4" },
    ...(design
      ? ([
          { type: "button", id: "form.tabOrderBtn", label: "Tab Order", icon: "sort", showLabel: true, dialog: "backstage:tabOrder" },
          { type: "button", id: "form.viewCode", label: "View Code", icon: "macros", showLabel: true },
        ] as RibbonControl[])
      : []),
  ],
});

const themesGroup = (id: string): RibbonGroup => ({
  label: "Themes",
  controls: [
    { type: "dropdown", id, label: "Themes", icon: "themes", size: "large", gallery: "grid", options: THEMES.map((t, i) => ({ value: t, color: ["#4472C4", "#90C226", "#1CADE4", "#B01513", "#2C3C43", "#549E39", "#F07F09", "#4E67C8", "#A53010", "#FFC000", "#A6B727", "#AC3EC1"][i] })) },
    { type: "dropdown", id: "theme.colors", label: "Colors", icon: "colors", options: ["Office", "Blue", "Green", "Red Orange", "Violet"].map((v) => ({ value: v })) },
    { type: "dropdown", id: "theme.fonts", label: "Fonts", icon: "fonts", options: ["Office", "Calibri", "Arial", "Corbel", "Candara"].map((v) => ({ value: v })) },
  ],
});

const arrangeTab = (contextual: string): RibbonTab => ({
  id: `${contextual}`,
  label: "Arrange",
  contextual,
  groups: [
    {
      label: "Table",
      controls: [
        { type: "dropdown", id: "arrange.gridlines", label: "Gridlines", icon: "gridlines", size: "large", options: ["Both", "Vertical", "Horizontal", "Top", "Bottom", "Outline", "None"].map((v) => ({ value: v })) },
        { type: "button", id: "arrange.stacked", label: "Stacked", icon: "multiplePages", size: "large" },
        { type: "button", id: "arrange.tabular", label: "Tabular", icon: "table", size: "large" },
        { type: "button", id: "arrange.removeLayout", label: "Remove Layout", icon: "clear", size: "large" },
      ],
    },
    {
      label: "Rows & Columns",
      controls: [
        { type: "button", id: "arrange.insertAbove", label: "Insert Above", icon: "insertCells", size: "large" },
        { type: "button", id: "arrange.insertBelow", label: "Insert Below", icon: "insertCells", size: "large" },
        { type: "button", id: "arrange.insertLeft", label: "Insert Left", icon: "insertCells", size: "large" },
        { type: "button", id: "arrange.insertRight", label: "Insert Right", icon: "insertCells", size: "large" },
        { type: "button", id: "arrange.selectLayout", label: "Select Layout", icon: "select", showLabel: true },
        { type: "button", id: "arrange.selectColumn", label: "Select Column", icon: "select", showLabel: true },
        { type: "button", id: "arrange.selectRow", label: "Select Row", icon: "select", showLabel: true },
      ],
    },
    {
      label: "Merge / Split",
      controls: [
        { type: "button", id: "arrange.merge", label: "Merge", icon: "merge", size: "large" },
        { type: "button", id: "arrange.splitVertically", label: "Split Vertically", icon: "split", showLabel: true },
        { type: "button", id: "arrange.splitHorizontally", label: "Split Horizontally", icon: "split", showLabel: true },
      ],
    },
    {
      label: "Move",
      controls: [
        { type: "button", id: "arrange.moveUp", label: "Move Up", icon: "bringForward", size: "large" },
        { type: "button", id: "arrange.moveDown", label: "Move Down", icon: "sendBackward", size: "large" },
      ],
    },
    {
      label: "Position",
      controls: [
        { type: "dropdown", id: "arrange.margins", label: "Control Margins", icon: "margins", size: "large", options: ["None", "Narrow", "Medium", "Wide"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "arrange.padding", label: "Control Padding", icon: "spacing", size: "large", options: ["None", "Narrow", "Medium", "Wide"].map((v) => ({ value: v })) },
        { type: "dropdown", id: "arrange.anchoring", label: "Anchoring", icon: "position", size: "large", options: ["Top Left", "Stretch Down", "Bottom Left", "Stretch Across Top", "Stretch Down and Across", "Stretch Across Bottom", "Top Right", "Stretch Down and Right", "Bottom Right"].map((v) => ({ value: v })) },
      ],
    },
  ],
});

const formatTab = (contextual: string): RibbonTab => ({
  id: `${contextual}`,
  label: "Format",
  contextual,
  groups: [
    {
      label: "Selection",
      controls: [
        { type: "dropdown", id: "format.object", label: "Object", combo: true, width: 120, stateKey: "format.object", options: [{ value: "Detail" }, { value: "Form" }] },
        { type: "button", id: "format.selectAll", label: "Select All", icon: "select", showLabel: true },
      ],
    },
    { label: "Font", controls: [], rows: fontRows() },
    {
      label: "Number",
      controls: [],
      rows: [
        [{ type: "dropdown", id: "format.number", label: "Format", combo: true, width: 110, options: FIELD_FORMATS.map((v) => ({ value: v })) }],
        [
          { type: "button", id: "fields.currency", label: "Apply Currency Format", icon: "currency" },
          { type: "button", id: "fields.percent", label: "Apply Percent Format", icon: "percent" },
          { type: "button", id: "fields.comma", label: "Apply Comma Number Format", icon: "comma" },
          { type: "button", id: "fields.decInc", label: "Increase Decimals", icon: "decInc" },
          { type: "button", id: "fields.decDec", label: "Decrease Decimals", icon: "decDec" },
        ],
      ],
    },
    {
      label: "Background",
      controls: [
        { type: "button", id: "format.backgroundImage", label: "Background Image", icon: "picture", size: "large" },
        { type: "dropdown", id: "home.altRow", label: "Alternate Row Color", icon: "shading", size: "large", gallery: "swatches", options: colorOpts({ value: "No Color", label: "No Color" }) },
      ],
    },
    {
      label: "Control Formatting",
      controls: [
        { type: "dropdown", id: "format.quickStyles", label: "Quick Styles", icon: "styles", size: "large", gallery: "grid", options: ["Colored Outline", "Colored Fill", "Light 1 Fill", "Intense Effect"].map((v, i) => ({ value: v, color: ["#ffffff", "#4472C4", "#DDEBF7", "#1F4E79"][i] })) },
        { type: "dropdown", id: "format.changeShape", label: "Change Shape", icon: "shapes", size: "large", options: ["Rectangle", "Rounded Rectangle", "Oval", "Snip Corners"].map((v) => ({ value: v })) },
        { type: "button", id: "format.conditional", label: "Conditional Formatting", icon: "condFormat", size: "large" },
        { type: "dropdown", id: "home.fill", label: "Shape Fill", icon: "fill", gallery: "swatches", options: colorOpts({ value: "Transparent", label: "Transparent" }) },
        { type: "dropdown", id: "format.outline", label: "Shape Outline", icon: "borders", gallery: "swatches", options: colorOpts({ value: "Transparent", label: "Transparent" }) },
        { type: "dropdown", id: "format.effects", label: "Shape Effects", icon: "effects", options: ["Shadow", "Glow", "Soft Edges", "Bevel"].map((v) => ({ value: v })) },
      ],
    },
  ],
});

const pageSetupGroups = (): RibbonGroup[] => [
  {
    label: "Page Size",
    controls: [
      { type: "dropdown", id: "pageSetup.size", label: "Size", icon: "size", size: "large", options: ["Letter", "Legal", "Executive", "A4", "Tabloid"].map((v) => ({ value: v, label: v === "Letter" ? "Letter 8.5\" x 11\"" : v === "Legal" ? "Legal 8.5\" x 14\"" : v === "Executive" ? "Executive 7.25\" x 10.5\"" : v === "A4" ? "A4 8.27\" x 11.69\"" : "Tabloid 11\" x 17\"" })) },
      { type: "dropdown", id: "pageSetup.margins", label: "Margins", icon: "margins", size: "large", options: ["Normal", "Wide", "Narrow"].map((v) => ({ value: v, label: v === "Normal" ? "Normal  Top: 0.75\" Bottom: 0.75\" Left: 0.25\" Right: 0.25\"" : v === "Wide" ? "Wide  Top: 1\" Bottom: 1\" Left: 0.75\" Right: 0.75\"" : "Narrow  Top: 0.25\" Bottom: 0.25\" Left: 0.25\" Right: 0.25\"" })) },
      { type: "toggle", id: "pageSetup.showMargins", label: "Show Margins", icon: "ruler", showLabel: true },
      { type: "toggle", id: "pageSetup.dataOnly", label: "Print Data Only", icon: "print", showLabel: true },
    ],
  },
  {
    label: "Page Layout",
    controls: [
      { type: "toggle", id: "pageSetup.portrait", label: "Portrait", icon: "orientation", size: "large" },
      { type: "toggle", id: "pageSetup.landscape", label: "Landscape", icon: "orientation", size: "large" },
      { type: "button", id: "pageSetup.columns", label: "Columns", icon: "columns", size: "large" },
      { type: "button", id: "pageSetup.dialog", label: "Page Setup", icon: "options", size: "large", dialog: "pageSetup" },
    ],
  },
];

export const accessRibbon: RibbonTab[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "home",
    label: "Home",
    groups: [
      viewGroup(),
      {
        label: "Clipboard",
        controls: [
          { type: "dropdown", id: "home.paste", label: "Paste", icon: "paste", size: "large", split: true, faceValue: "Paste", options: [{ value: "Paste", icon: "paste" }, { value: "Paste Special...", icon: "paste", dialog: "pasteTableAs" }, { value: "Paste Append", icon: "paste" }] },
          { type: "button", id: "home.cut", label: "Cut", icon: "cut", shortcut: "Ctrl+X", showLabel: true },
          { type: "button", id: "home.copy", label: "Copy", icon: "copy", shortcut: "Ctrl+C", showLabel: true },
          { type: "toggle", id: "home.formatPainter", label: "Format Painter", icon: "formatPainter", showLabel: true },
        ],
      },
      {
        label: "Sort & Filter",
        controls: [
          { type: "button", id: "home.filterMenu", label: "Filter", icon: "filter", size: "large" },
          { type: "button", id: "home.sortAsc", label: "Ascending", icon: "sortAsc", showLabel: true },
          { type: "button", id: "home.sortDesc", label: "Descending", icon: "sortDesc", showLabel: true },
          { type: "button", id: "home.removeSort", label: "Remove Sort", icon: "sort", showLabel: true },
          { type: "dropdown", id: "home.selection", label: "Selection", icon: "filter", showLabel: true, options: ["Equals Selection", "Does Not Equal Selection", "Contains Selection", "Does Not Contain Selection"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "home.advanced", label: "Advanced", icon: "filter", showLabel: true, options: ["Clear All Filters", "Filter By Form", "Apply Filter/Sort", "Advanced Filter/Sort...", "Load from Query...", "Save As Query"].map((v) => ({ value: v })) },
          { type: "toggle", id: "home.toggleFilter", label: "Toggle Filter", icon: "filter", showLabel: true },
        ],
      },
      {
        label: "Records",
        controls: [
          { type: "button", id: "home.refresh", label: "Refresh All", icon: "reset", size: "large" },
          { type: "button", id: "home.newRecord", label: "New", icon: "new", showLabel: true, shortcut: "Ctrl++" },
          { type: "button", id: "file.save", label: "Save", icon: "save", showLabel: true, shortcut: "Ctrl+S" },
          { type: "dropdown", id: "home.delete", label: "Delete", icon: "deleteCells", showLabel: true, split: true, options: [{ value: "Delete", icon: "deleteCells" }, { value: "Delete Record", command: "home.deleteRecord", icon: "deleteCells" }, { value: "Delete Column", command: "fields.delete", icon: "deleteCells" }] },
          { type: "toggle", id: "home.totals", label: "Totals", icon: "sum", showLabel: true },
          { type: "button", id: "home.spelling", label: "Spelling", icon: "spelling", showLabel: true },
          { type: "dropdown", id: "home.more", label: "More", icon: "more", showLabel: true, options: [{ value: "Row Height...", dialog: "rowHeight" }, { value: "Subdatasheet" }, { value: "Hide Fields" }, { value: "Unhide Fields...", dialog: "unhideFields" }, { value: "Freeze Fields" }, { value: "Unfreeze All Fields" }, { value: "Field Width...", dialog: "fieldWidth" }] },
        ],
      },
      {
        label: "Find",
        controls: [
          { type: "button", id: "home.find", label: "Find", icon: "find", size: "large", shortcut: "Ctrl+F" },
          { type: "button", id: "home.replace", label: "Replace", icon: "replace", showLabel: true, shortcut: "Ctrl+H" },
          { type: "dropdown", id: "record.nav", label: "Go To", icon: "navPane", showLabel: true, options: ["First", "Previous", "Next", "Last", "New"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "home.select", label: "Select", icon: "select", showLabel: true, options: ["Select", "Select All"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Text Formatting",
        launcher: "datasheetFormatting",
        controls: [],
        rows: [
          ...fontRows(),
          [
            { type: "dropdown", id: "home.gridlines", label: "Gridlines", icon: "gridlines", options: ["Gridlines: Both", "Gridlines: Horizontal", "Gridlines: Vertical", "Gridlines: None"].map((v) => ({ value: v })) },
            { type: "dropdown", id: "home.altRow", label: "Alternate Row Color", icon: "shading", split: true, faceValue: "#F2F2F2", gallery: "swatches", options: colorOpts({ value: "No Color", label: "No Color" }) },
          ],
        ],
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "create",
    label: "Create",
    groups: [
      {
        label: "Templates",
        controls: [{ type: "dropdown", id: "create.appParts", label: "Application Parts", icon: "addIns", size: "large", options: [{ value: "Blank Forms", heading: true }, { value: "1 Right" }, { value: "2 Right" }, { value: "Details" }, { value: "List" }, { value: "Quick Start", heading: true }, { value: "Comments" }, { value: "Contacts" }, { value: "Issues" }, { value: "Tasks" }, { value: "Users" }] }],
      },
      {
        label: "Tables",
        controls: [
          { type: "button", id: "create.table", label: "Table", icon: "table", size: "large" },
          { type: "button", id: "create.tableDesign", label: "Table Design", icon: "formatTable", size: "large" },
          { type: "dropdown", id: "create.sharepoint", label: "SharePoint Lists", icon: "share", size: "large", options: ["Contacts", "Tasks", "Issues", "Events", "Custom", "Existing SharePoint List"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Queries",
        controls: [
          { type: "button", id: "create.queryWizard", label: "Query Wizard", icon: "whatIf", size: "large", dialog: "backstage:queryWizard" },
          { type: "button", id: "create.queryDesign", label: "Query Design", icon: "filter", size: "large" },
        ],
      },
      {
        label: "Forms",
        controls: [
          { type: "button", id: "create.form", label: "Form", icon: "textbox", size: "large" },
          { type: "button", id: "create.formDesign", label: "Form Design", icon: "layout", size: "large" },
          { type: "button", id: "create.blankForm", label: "Blank Form", icon: "new", size: "large" },
          { type: "button", id: "create.formWizard", label: "Form Wizard", icon: "designer", showLabel: true, dialog: "backstage:formWizard" },
          { type: "dropdown", id: "create.navigation", label: "Navigation", icon: "navPane", showLabel: true, options: ["Horizontal Tabs", "Vertical Tabs, Left", "Vertical Tabs, Right", "Horizontal Tabs, 2 Levels"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "create.moreForms", label: "More Forms", icon: "more", showLabel: true, options: ["Multiple Items", "Datasheet", "Split Form", "Modal Dialog"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Reports",
        controls: [
          { type: "button", id: "create.report", label: "Report", icon: "printLayout", size: "large" },
          { type: "button", id: "create.reportDesign", label: "Report Design", icon: "layout", size: "large" },
          { type: "button", id: "create.blankReport", label: "Blank Report", icon: "blankPage", size: "large" },
          { type: "button", id: "create.reportWizard", label: "Report Wizard", icon: "designer", showLabel: true, dialog: "backstage:reportWizard" },
          { type: "button", id: "create.labels", label: "Labels", icon: "envelope", showLabel: true },
        ],
      },
      {
        label: "Macros & Code",
        controls: [
          { type: "button", id: "create.macro", label: "Macro", icon: "macros", size: "large" },
          { type: "button", id: "create.module", label: "Module", icon: "fx", showLabel: true },
          { type: "button", id: "create.classModule", label: "Class Module", icon: "fx", showLabel: true },
          { type: "button", id: "create.vba", label: "Visual Basic", icon: "macros", showLabel: true, shortcut: "Alt+F11" },
        ],
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "external",
    label: "External Data",
    groups: [
      {
        label: "Import & Link",
        controls: [
          { type: "button", id: "external.savedImports", label: "Saved Imports", icon: "history", size: "large" },
          { type: "button", id: "external.linkedTables", label: "Linked Table Manager", icon: "link", size: "large" },
          {
            type: "dropdown",
            id: "external.newSource",
            label: "New Data Source",
            icon: "open",
            size: "large",
            options: [
              { value: "From File", heading: true },
              { value: "Excel", icon: "sheet", dialog: "backstage:importExcel" },
              { value: "Access", icon: "open" },
              { value: "HTML Document", icon: "new" },
              { value: "XML File", icon: "new" },
              { value: "Text File", icon: "new" },
              { value: "From Database", heading: true },
              { value: "SQL Server", icon: "pc" },
              { value: "Azure Database", icon: "cloud" },
              { value: "dBASE File", icon: "new" },
              { value: "From Online Services", heading: true },
              { value: "SharePoint List", icon: "share" },
              { value: "Data Services", icon: "cloud" },
              { value: "Dynamics 365 (online)", icon: "cloud" },
              { value: "From Other Sources", heading: true },
              { value: "ODBC Database", icon: "pc" },
              { value: "Outlook Folder", icon: "folder" },
            ],
          },
        ],
      },
      {
        label: "Export",
        controls: [
          { type: "button", id: "external.savedExportsBtn", label: "Saved Exports", icon: "history", size: "large", dialog: "backstage:savedExports" },
          { type: "button", id: "external.exportExcel", label: "Excel", icon: "sheet", size: "large", dialog: "backstage:exportExcel" },
          { type: "button", id: "external.exportText", label: "Text File", icon: "new", size: "large", dialog: "backstage:exportText" },
          { type: "button", id: "external.exportPdf", label: "PDF or XPS", icon: "pdf", size: "large", dialog: "backstage:exportPdf" },
          { type: "button", id: "external.email", label: "Email", icon: "share", size: "large" },
          { type: "button", id: "external.exportAccess", label: "Access", icon: "open", showLabel: true },
          { type: "button", id: "external.wordMerge", label: "Word Merge", icon: "mailMerge", showLabel: true },
          { type: "dropdown", id: "external.moreExport", label: "More", icon: "more", showLabel: true, options: ["Word", "SharePoint List", "ODBC Database", "HTML Document", "XML File", "dBASE File"].map((v) => ({ value: v })) },
        ],
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "dbtools",
    label: "Database Tools",
    groups: [
      { label: "Tools", controls: [{ type: "button", id: "dbtools.compact", label: "Compact and Repair", icon: "checkIssues", size: "large", tip: "Compact and Repair Database" }] },
      {
        label: "Macro",
        controls: [
          { type: "button", id: "dbtools.vba", label: "Visual Basic", icon: "macros", size: "large", shortcut: "Alt+F11" },
          { type: "button", id: "dbtools.runMacro", label: "Run Macro", icon: "slideShow", size: "large", dialog: "runMacro" },
        ],
      },
      {
        label: "Relationships",
        controls: [
          { type: "button", id: "dbtools.relationships", label: "Relationships", icon: "smartart", size: "large" },
          { type: "button", id: "dbtools.dependencies", label: "Object Dependencies", icon: "groupObjects", size: "large" },
        ],
      },
      {
        label: "Analyze",
        controls: [
          { type: "button", id: "dbtools.documenter", label: "Database Documenter", icon: "printLayout", showLabel: true, dialog: "backstage:documenter" },
          { type: "button", id: "dbtools.performance", label: "Analyze Performance", icon: "chart", showLabel: true },
          { type: "button", id: "dbtools.analyzeTable", label: "Analyze Table", icon: "table", showLabel: true, dialog: "backstage:analyzeTable" },
        ],
      },
      {
        label: "Move Data",
        controls: [
          { type: "button", id: "dbtools.split", label: "Access Database", icon: "split", size: "large" },
          { type: "button", id: "dbtools.sharepoint", label: "SharePoint", icon: "share", size: "large" },
        ],
      },
      { label: "Add-ins", controls: [{ type: "button", id: "dbtools.addins", label: "Add-ins", icon: "addIns", size: "large" }] },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "help",
    label: "Help",
    groups: [
      {
        label: "Help",
        controls: [
          { type: "button", id: "help.help", label: "Help", icon: "help", size: "large", shortcut: "F1" },
          { type: "button", id: "help.support", label: "Contact Support", icon: "help", size: "large" },
          { type: "button", id: "help.feedback", label: "Feedback", icon: "comment", size: "large" },
          { type: "button", id: "help.training", label: "Show Training", icon: "video", size: "large" },
        ],
      },
    ],
  },

  /* ================= contextual ================= */
  {
    id: "tableFields",
    label: "Table Fields",
    contextual: "tableFields",
    groups: [
      viewGroup(),
      {
        label: "Add & Delete",
        controls: [
          { type: "button", id: "fields.add.Short Text", label: "Short Text", icon: "textbox", size: "large" },
          { type: "button", id: "fields.add.Number", label: "Number", icon: "decInc", showLabel: true },
          { type: "button", id: "fields.add.Currency", label: "Currency", icon: "currency", showLabel: true },
          { type: "button", id: "fields.add.Date/Time", label: "Date & Time", icon: "date", showLabel: true },
          { type: "button", id: "fields.add.Yes/No", label: "Yes/No", icon: "checkIssues", showLabel: true },
          {
            type: "dropdown",
            id: "fields.add",
            label: "More Fields",
            icon: "more",
            showLabel: true,
            options: [
              { value: "Basic Types", heading: true },
              { value: "Short Text" },
              { value: "Long Text" },
              { value: "Number" },
              { value: "Large Number" },
              { value: "Currency" },
              { value: "Date/Time", label: "Date & Time" },
              { value: "Date/Time Extended", label: "Date & Time Extended" },
              { value: "Yes/No" },
              { value: "Attachment" },
              { value: "Hyperlink" },
              { value: "Lookup & Relationship", dialog: "backstage:lookupWizard" },
            ],
          },
          { type: "button", id: "fields.delete", label: "Delete", icon: "deleteCells", size: "large" },
        ],
      },
      {
        label: "Properties",
        controls: [
          { type: "button", id: "fields.nameCaption", label: "Name & Caption", icon: "textbox", showLabel: true, dialog: "nameCaption" },
          { type: "button", id: "fields.defaultValue", label: "Default Value", icon: "fx", showLabel: true, dialog: "defaultValue" },
          { type: "dropdown", id: "fields.fieldSize", label: "Field Size", combo: true, width: 60, stateKey: "fields.fieldSize", options: ["10", "15", "20", "30", "50", "100", "255"].map((v) => ({ value: v })) },
          { type: "button", id: "fields.modifyLookups", label: "Modify Lookups", icon: "link", showLabel: true, dialog: "backstage:lookupWizard" },
        ],
      },
      {
        label: "Formatting",
        controls: [],
        rows: [
          [{ type: "dropdown", id: "fields.dataType", label: "Data Type", combo: true, width: 110, stateKey: "fields.dataType", options: DATA_TYPES.filter((t) => t !== "Lookup Wizard...").map((v) => ({ value: v })) }],
          [{ type: "dropdown", id: "fields.format", label: "Format", combo: true, width: 110, stateKey: "fields.format", options: FIELD_FORMATS.map((v) => ({ value: v })) }],
          [
            { type: "button", id: "fields.currency", label: "Apply Currency Format", icon: "currency" },
            { type: "button", id: "fields.percent", label: "Apply Percent Format", icon: "percent" },
            { type: "button", id: "fields.comma", label: "Comma Style", icon: "comma" },
            { type: "button", id: "fields.decInc", label: "Increase Decimals", icon: "decInc" },
            { type: "button", id: "fields.decDec", label: "Decrease Decimals", icon: "decDec" },
          ],
        ],
      },
      {
        label: "Field Validation",
        controls: [
          { type: "toggle", id: "fields.required", label: "Required", icon: "checkIssues", showLabel: true },
          { type: "toggle", id: "fields.unique", label: "Unique", icon: "checkIssues", showLabel: true },
          { type: "toggle", id: "fields.indexed", label: "Indexed", icon: "sort", showLabel: true },
          {
            type: "dropdown",
            id: "fields.validation",
            label: "Validation",
            icon: "validation",
            size: "large",
            options: [
              { value: "Field Validation Rule", dialog: "validationRule" },
              { value: "Field Validation Message", dialog: "validationText" },
              { value: "Record Validation Rule", dialog: "recordValidationRule" },
              { value: "Record Validation Message", dialog: "recordValidationText" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tableTab",
    label: "Table",
    contextual: "table",
    groups: [
      { label: "Properties", controls: [{ type: "button", id: "table.properties", label: "Table Properties", icon: "info", size: "large", dialog: "tableProperties" }] },
      {
        label: "Before Events",
        controls: [
          { type: "button", id: "table.events", label: "Before Change", icon: "macros", size: "large" },
          { type: "button", id: "table.beforeDelete", label: "Before Delete", icon: "macros", size: "large" },
        ],
      },
      {
        label: "After Events",
        controls: [
          { type: "button", id: "table.afterInsert", label: "After Insert", icon: "macros", size: "large" },
          { type: "button", id: "table.afterUpdate", label: "After Update", icon: "macros", size: "large" },
          { type: "button", id: "table.afterDelete", label: "After Delete", icon: "macros", size: "large" },
        ],
      },
      { label: "Named Macros", controls: [{ type: "dropdown", id: "table.namedMacro", label: "Named Macro", icon: "macros", size: "large", options: ["Create Named Macro", "Edit Named Macro", "Rename/Delete Macro"].map((v) => ({ value: v })) }] },
      {
        label: "Relationships",
        controls: [
          { type: "button", id: "table.relationships", label: "Relationships", icon: "smartart", size: "large" },
          { type: "button", id: "dbtools.dependencies", label: "Object Dependencies", icon: "groupObjects", size: "large" },
        ],
      },
    ],
  },
  {
    id: "tableDesign",
    label: "Table Design",
    contextual: "tableDesign",
    groups: [
      viewGroup(),
      {
        label: "Tools",
        controls: [
          { type: "toggle", id: "design.primaryKey", label: "Primary Key", icon: "protect", size: "large" },
          { type: "button", id: "design.builder", label: "Builder", icon: "designer", size: "large" },
          { type: "button", id: "design.testRules", label: "Test Validation Rules", icon: "checkIssues", size: "large" },
          { type: "button", id: "design.insertRows", label: "Insert Rows", icon: "insertCells", showLabel: true },
          { type: "button", id: "design.deleteRows", label: "Delete Rows", icon: "deleteCells", showLabel: true },
          { type: "button", id: "design.modifyLookups", label: "Modify Lookups", icon: "link", showLabel: true, dialog: "backstage:lookupWizard" },
        ],
      },
      {
        label: "Show/Hide",
        controls: [
          { type: "toggle", id: "design.propertySheet", label: "Property Sheet", icon: "options", size: "large", shortcut: "F4" },
          { type: "button", id: "design.indexes", label: "Indexes", icon: "sort", size: "large" },
        ],
      },
      {
        label: "Field, Record & Table Events",
        controls: [
          { type: "dropdown", id: "design.dataMacros", label: "Create Data Macros", icon: "macros", size: "large", options: ["After Insert", "After Update", "After Delete", "Before Delete", "Before Change", "Create Named Macro"].map((v) => ({ value: v })) },
          { type: "button", id: "design.renameMacro", label: "Rename/ Delete Macro", icon: "macros", size: "large" },
        ],
      },
      {
        label: "Relationships",
        controls: [
          { type: "button", id: "table.relationships", label: "Relationships", icon: "smartart", size: "large" },
          { type: "button", id: "dbtools.dependencies", label: "Object Dependencies", icon: "groupObjects", size: "large" },
        ],
      },
    ],
  },
  {
    id: "queryDesign",
    label: "Query Design",
    contextual: "queryDesign",
    groups: [
      {
        label: "Results",
        controls: [
          { type: "dropdown", id: "home.view", label: "View", icon: "normalView", size: "large", split: true, faceValue: "toggle", options: ["Datasheet View", "SQL View", "Design View"].map((v) => ({ value: v })) },
          { type: "button", id: "query.run", label: "Run", icon: "slideShow", size: "large" },
        ],
      },
      {
        label: "Query Type",
        controls: [
          { type: "toggle", id: "query.type.Select", label: "Select", icon: "table", size: "large", stateKey: "qtype:Select" },
          { type: "button", id: "query.makeTable", label: "Make Table", icon: "formatTable", size: "large", dialog: "makeTable" },
          { type: "button", id: "query.append", label: "Append", icon: "insertCells", size: "large", dialog: "appendTo" },
          { type: "toggle", id: "query.type.Update", label: "Update", icon: "reset", size: "large", stateKey: "qtype:Update" },
          { type: "toggle", id: "query.type.Crosstab", label: "Crosstab", icon: "pivot", size: "large", stateKey: "qtype:Crosstab" },
          { type: "toggle", id: "query.type.Delete", label: "Delete", icon: "deleteCells", size: "large", stateKey: "qtype:Delete" },
          { type: "button", id: "query.type.Union", label: "Union", icon: "merge", showLabel: true },
          { type: "button", id: "query.type.Pass-Through", label: "Pass-Through", icon: "share", showLabel: true },
          { type: "button", id: "query.type.Data Definition", label: "Data Definition", icon: "fx", showLabel: true },
        ],
      },
      {
        label: "Query Setup",
        controls: [
          { type: "toggle", id: "query.addTables", label: "Add Tables", icon: "table", size: "large" },
          { type: "button", id: "query.insertRows", label: "Insert Rows", icon: "insertCells", showLabel: true },
          { type: "button", id: "query.deleteRows", label: "Delete Rows", icon: "deleteCells", showLabel: true },
          { type: "button", id: "query.builder", label: "Builder", icon: "designer", showLabel: true },
          { type: "button", id: "query.insertColumns", label: "Insert Columns", icon: "insertCells", showLabel: true },
          { type: "button", id: "query.deleteColumns", label: "Delete Columns", icon: "deleteCells", showLabel: true },
          { type: "dropdown", id: "query.top", label: "Return", combo: true, width: 64, stateKey: "query.top", options: ["5", "25", "100", "5%", "25%", "All"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Show/Hide",
        controls: [
          { type: "toggle", id: "query.totals", label: "Totals", icon: "sum", size: "large" },
          { type: "button", id: "query.parametersBtn", label: "Parameters", icon: "fx", size: "large", dialog: "queryParameters" },
          { type: "toggle", id: "design.propertySheet", label: "Property Sheet", icon: "options", showLabel: true },
          { type: "toggle", id: "query.tableNames", label: "Table Names", icon: "table", showLabel: true },
        ],
      },
    ],
  },
  {
    id: "relDesign",
    label: "Relationship Design",
    contextual: "relDesign",
    groups: [
      {
        label: "Tools",
        controls: [
          { type: "button", id: "relationships.edit", label: "Edit Relationships", icon: "smartart", size: "large", dialog: "backstage:editRelationship" },
          { type: "button", id: "relationships.clearLayout", label: "Clear Layout", icon: "clear", showLabel: true },
          { type: "button", id: "relationships.report", label: "Relationship Report", icon: "printLayout", showLabel: true },
        ],
      },
      {
        label: "Relationships",
        controls: [
          { type: "toggle", id: "relationships.showTable", label: "Add Tables", icon: "table", size: "large", stateKey: "query.addTables" },
          { type: "button", id: "relationships.hideTable", label: "Hide Table", icon: "close", showLabel: true },
          { type: "button", id: "relationships.direct", label: "Direct Relationships", icon: "smartart", showLabel: true },
          { type: "button", id: "relationships.all", label: "All Relationships", icon: "smartart", showLabel: true },
        ],
      },
      { label: "Close", controls: [{ type: "button", id: "relationships.close", label: "Close", icon: "close", size: "large" }] },
    ],
  },
  {
    id: "formLayout",
    label: "Form Layout Design",
    contextual: "formLayout",
    groups: [viewGroup(), themesGroup("form.theme"), controlsGroup(), headerFooterGroup(false), designToolsGroup(false)],
  },
  {
    id: "formDesign",
    label: "Form Design",
    contextual: "formDesign",
    groups: [viewGroup(), themesGroup("form.theme"), controlsGroup(), headerFooterGroup(false), designToolsGroup(true)],
  },
  arrangeTab("formArrange"),
  formatTab("formFormat"),
  {
    id: "reportLayout",
    label: "Report Layout Design",
    contextual: "reportLayout",
    groups: [
      viewGroup(),
      themesGroup("report.theme"),
      {
        label: "Grouping & Totals",
        controls: [
          { type: "toggle", id: "report.groupSort", label: "Group & Sort", icon: "sort", size: "large" },
          { type: "dropdown", id: "report.totals", label: "Totals", icon: "sum", showLabel: true, options: ["Sum", "Average", "Count Records", "Count Values", "Max", "Min", "Standard Deviation", "Variance"].map((v) => ({ value: v })) },
          { type: "toggle", id: "report.hideDetails", label: "Hide Details", icon: "clear", showLabel: true },
        ],
      },
      controlsGroup(),
      headerFooterGroup(true),
      designToolsGroup(false),
    ],
  },
  {
    id: "reportDesign",
    label: "Report Design",
    contextual: "reportDesign",
    groups: [
      viewGroup(),
      themesGroup("report.theme"),
      {
        label: "Grouping & Totals",
        controls: [
          { type: "toggle", id: "report.groupSort", label: "Group & Sort", icon: "sort", size: "large" },
          { type: "dropdown", id: "report.totals", label: "Totals", icon: "sum", showLabel: true, options: ["Sum", "Average", "Count Records", "Count Values", "Max", "Min", "Standard Deviation", "Variance"].map((v) => ({ value: v })) },
          { type: "toggle", id: "report.hideDetails", label: "Hide Details", icon: "clear", showLabel: true },
        ],
      },
      controlsGroup(),
      headerFooterGroup(true),
      designToolsGroup(true),
    ],
  },
  arrangeTab("reportArrange"),
  formatTab("reportFormat"),
  { id: "reportPageSetup", label: "Page Setup", contextual: "reportPageSetup", groups: pageSetupGroups() },
  {
    id: "printPreview",
    label: "Print Preview",
    contextual: "printPreview",
    groups: [
      { label: "Print", controls: [{ type: "button", id: "preview.print", label: "Print", icon: "print", size: "large", dialog: "file.print" }] },
      {
        label: "Page Size",
        controls: [
          { type: "dropdown", id: "pageSetup.size", label: "Size", icon: "size", size: "large", options: ["Letter", "Legal", "Executive", "A4", "Tabloid"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "pageSetup.margins", label: "Margins", icon: "margins", size: "large", options: ["Normal", "Wide", "Narrow"].map((v) => ({ value: v })) },
          { type: "toggle", id: "pageSetup.dataOnly", label: "Print Data Only", icon: "print", showLabel: true },
        ],
      },
      pageSetupGroups()[1],
      {
        label: "Zoom",
        controls: [
          { type: "dropdown", id: "preview.zoom", label: "Zoom", icon: "zoom", size: "large", options: ["Fit to Window", "10%", "25%", "50%", "75%", "100%", "150%", "200%", "500%", "1000%"].map((v) => ({ value: v })) },
          { type: "button", id: "preview.onePage", label: "One Page", icon: "onePage", size: "large" },
          { type: "button", id: "preview.twoPages", label: "Two Pages", icon: "multiplePages", size: "large" },
          { type: "dropdown", id: "preview.morePages", label: "More Pages", icon: "multiplePages", size: "large", options: ["Four Pages", "Eight Pages", "Twelve Pages"].map((v) => ({ value: v })) },
        ],
      },
      {
        label: "Data",
        controls: [
          { type: "button", id: "home.refresh", label: "Refresh All", icon: "reset", size: "large" },
          { type: "button", id: "preview.excel", label: "Excel", icon: "sheet", size: "large", dialog: "backstage:exportExcel" },
          { type: "button", id: "preview.text", label: "Text File", icon: "new", size: "large", dialog: "backstage:exportText" },
          { type: "button", id: "preview.pdf", label: "PDF or XPS", icon: "pdf", size: "large", dialog: "backstage:exportPdf" },
          { type: "button", id: "external.email", label: "Email", icon: "share", size: "large" },
          { type: "dropdown", id: "external.moreExport", label: "More", icon: "more", size: "large", options: ["Word", "SharePoint List", "HTML Document", "XML File"].map((v) => ({ value: v })) },
        ],
      },
      { label: "Close Preview", controls: [{ type: "button", id: "preview.close", label: "Close Print Preview", icon: "close", size: "large" }] },
    ],
  },
  {
    id: "macroDesign",
    label: "Macro Design",
    contextual: "macroDesign",
    groups: [
      {
        label: "Tools",
        controls: [
          { type: "button", id: "macro.run", label: "Run", icon: "slideShow", size: "large" },
          { type: "button", id: "macro.singleStep", label: "Single Step", icon: "preview", showLabel: true },
          { type: "button", id: "macro.convert", label: "Convert Macros to Visual Basic", icon: "macros", showLabel: true },
        ],
      },
      {
        label: "Collapse/Expand",
        controls: [
          { type: "button", id: "macro.expand", label: "Expand Actions", icon: "indentInc", size: "large" },
          { type: "button", id: "macro.collapse", label: "Collapse Actions", icon: "indentDec", size: "large" },
          { type: "button", id: "macro.expandAll", label: "Expand All", icon: "indentInc", size: "large" },
          { type: "button", id: "macro.collapseAll", label: "Collapse All", icon: "indentDec", size: "large" },
        ],
      },
      {
        label: "Show/Hide",
        controls: [
          { type: "toggle", id: "macro.actionCatalog", label: "Action Catalog", icon: "navPane", size: "large" },
          { type: "toggle", id: "macro.showAll", label: "Show All Actions", icon: "more", size: "large" },
        ],
      },
    ],
  },
];
