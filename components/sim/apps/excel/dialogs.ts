import type { DialogDef } from "@/types/sim";
import { PIVOT_FNS } from "@/lib/sim/excel";
import { THEME_COLORS } from "../../chrome/colors";
import { ALL_CHART_TYPES, NUMBER_FORMATS } from "./ribbon";
import { CF_FORMAT_NAMES, ICONS } from "./model";

/** Every Order the Sort dialog can show. The canvas's Sort dialog offers the ones that fit each column's type. */
export const SORT_ORDERS = ["A to Z", "Z to A", "Smallest to Largest", "Largest to Smallest", "Oldest to Newest", "Newest to Oldest", "Custom List..."];
/** The Order choices per column type, as in Excel's Sort dialog. */
export const SORT_ORDERS_BY_TYPE: Record<"text" | "number" | "date", string[]> = {
  text: ["A to Z", "Z to A", "Custom List..."],
  number: ["Smallest to Largest", "Largest to Smallest", "Custom List..."],
  date: ["Oldest to Newest", "Newest to Oldest", "Custom List..."],
};
/** Excel's built-in custom lists (File › Options › Advanced › Edit Custom Lists). */
export const BUILT_IN_LISTS = [
  "Sun, Mon, Tue, Wed, Thu, Fri, Sat",
  "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday",
  "Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec",
  "January, February, March, April, May, June, July, August, September, October, November, December",
];
export const SHOW_VALUES_AS = ["No Calculation", "% of Grand Total", "% of Column Total", "% of Row Total", "Running Total In"];
export const VALIDATION_OPERATORS = ["between", "not between", "equal to", "not equal to", "greater than", "less than", "greater than or equal to", "less than or equal to"];
const VFS_NUMBER_FORMATS = ["General", "Number", "Currency", "Accounting", "Percentage", "Comma", "Short Date", "Long Date", "Custom"];
const ICON_NAMES = Object.keys(ICONS);
const CF_RULE_TYPES = [
  "Format all cells based on their values",
  "Format only cells that contain",
  "Format only top or bottom ranked values",
  "Format only values that are above or below average",
  "Format only unique or duplicate values",
  "Use a formula to determine which cells to format",
];

const cfFormat = { type: "select" as const, key: "format", label: "with", options: CF_FORMAT_NAMES };

export const excelDialogs: Record<string, DialogDef> = {
  formatCells: {
    id: "formatCells",
    title: "Format Cells",
    width: 460,
    tabs: [
      {
        label: "Number",
        fields: [
          { type: "list", key: "category", label: "Category:", options: [...NUMBER_FORMATS, "Comma", "Custom"], height: 170 },
          { type: "number", key: "decimals", label: "Decimal places:", min: 0, max: 10 },
          { type: "select", key: "symbol", label: "Symbol:", options: ["$", "None", "€", "£"] },
          { type: "text", key: "custom", label: "Type (Custom):", placeholder: "yyyy-mm-dd" },
          { type: "note", text: "Custom codes: yyyy-mm-dd, mm/dd/yyyy, mmmm d, yyyy, \"$\"#,##0.00, #,##0, 0.0%, 000-00-0000, h:mm AM/PM. Pick Custom, then type the code." },
        ],
      },
      {
        label: "Alignment",
        fields: [
          { type: "select", key: "horizontal", label: "Horizontal:", options: ["General", "Left", "Center", "Right", "Fill", "Justify", "Center Across Selection"] },
          { type: "select", key: "vertical", label: "Vertical:", options: ["Bottom", "Center", "Top"] },
          { type: "checkbox", key: "wrap", label: "Wrap text" },
          { type: "checkbox", key: "shrink", label: "Shrink to fit" },
          { type: "checkbox", key: "merge", label: "Merge cells" },
        ],
      },
      { label: "Font", fields: [{ type: "checkbox", key: "bold", label: "Bold" }, { type: "select", key: "fontSize", label: "Size:", options: ["10", "11", "12", "14", "16", "18"] }] },
      { label: "Border", fields: [{ type: "radio", key: "border", label: "Presets", options: ["None", "Outline", "Inside"], default: "None" }] },
      { label: "Fill", fields: [{ type: "color", key: "fill", label: "Background Color:", options: ["No Color", ...THEME_COLORS.slice(2, 14).map((c) => c.color)] }] },
      { label: "Protection", fields: [{ type: "checkbox", key: "locked", label: "Locked", default: true }, { type: "checkbox", key: "hidden", label: "Hidden" }] },
    ],
  },
  createTable: {
    id: "createTable",
    title: "Create Table",
    width: 320,
    fields: [
      { type: "text", key: "range", label: "Where is the data for your table?" },
      { type: "checkbox", key: "headers", label: "My table has headers", default: true },
    ],
  },
  createPivot: {
    id: "createPivot",
    title: "PivotTable from table or range",
    width: 380,
    fields: [
      { type: "note", text: "Select a table or range" },
      { type: "text", key: "range", label: "Table/Range:" },
      { type: "radio", key: "location", label: "Choose where you want the PivotTable to be placed", options: ["New Worksheet", "Existing Worksheet"], default: "New Worksheet" },
      { type: "text", key: "at", label: "Location:" },
    ],
  },
  insertChart: {
    id: "insertChart",
    title: "Insert Chart",
    width: 420,
    tabs: [
      { label: "Recommended Charts", fields: [{ type: "list", key: "type", label: "", options: ["Clustered Column", "Clustered Bar", "Line", "Pie", "Stacked Column"], height: 150 }] },
      { label: "All Charts", fields: [{ type: "list", key: "type", label: "", options: ALL_CHART_TYPES, height: 170 }] },
      // Filled from the workbook's saved chart templates (core.dialogDef).
      { label: "Templates", fields: [{ type: "note", text: "Chart templates you saved with Save as Template." }, { type: "list", key: "template", label: "My Templates", options: [], default: "", height: 120 }] },
    ],
  },
  changeChartType: {
    id: "changeChartType",
    title: "Change Chart Type",
    width: 420,
    tabs: [
      { label: "All Charts", fields: [{ type: "list", key: "type", label: "", options: ALL_CHART_TYPES, height: 170 }] },
      { label: "Templates", fields: [{ type: "note", text: "Chart templates you saved with Save as Template." }, { type: "list", key: "template", label: "My Templates", options: [], default: "", height: 120 }] },
    ],
  },
  saveChartTemplate: {
    id: "saveChartTemplate",
    title: "Save Chart Template",
    okLabel: "Save",
    width: 380,
    fields: [
      { type: "note", text: "Save in: Charts (Templates folder)" },
      { type: "text", key: "name", label: "File name:" },
      { type: "note", text: "Save as type: Chart Template Files (*.crtx)" },
    ],
  },
  /** Select Data Source is drawn by the canvas (its series list changes as you work); this lists its fields. */
  selectData: {
    id: "selectData",
    title: "Select Data Source",
    width: 520,
    fields: [
      { type: "text", key: "range", label: "Chart data range:" },
      { type: "text", key: "names", label: "Legend Entries (Series):" },
      { type: "text", key: "series", label: "Series:" },
      { type: "number", key: "count", label: "Number of series:" },
      { type: "text", key: "categories", label: "Horizontal (Category) Axis Labels:" },
      { type: "checkbox", key: "switched", label: "Switch Row/Column" },
      { type: "checkbox", key: "edited", label: "Series edited" },
    ],
  },
  insertFunction: {
    id: "insertFunction",
    title: "Insert Function",
    width: 420,
    fields: [
      { type: "select", key: "category", label: "Or select a category:", options: ["Most Recently Used", "All", "Financial", "Date & Time", "Math & Trig", "Statistical", "Lookup & Reference", "Text", "Logical"] },
      { type: "list", key: "fn", label: "Select a function:", options: ["SUM", "AVERAGE", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "IF", "MAX", "MIN", "MEDIAN", "ROUND", "SUBTOTAL", "VLOOKUP", "XLOOKUP", "FILTER", "SORT", "UNIQUE", "PMT", "TODAY", "NETWORKDAYS", "CONCAT", "SUMIF"], height: 140 },
      { type: "text", key: "args", label: "Function Arguments:", placeholder: "B2:B10" },
    ],
  },
  /** The Sort dialog is drawn by the canvas (Data › Sort): its levels and Order lists follow each column's type. */
  sort: {
    id: "sort",
    title: "Sort",
    width: 460,
    fields: [
      { type: "checkbox", key: "headers", label: "My data has headers", default: true },
      { type: "select", key: "sortBy", label: "Sort by", options: [] },
      { type: "select", key: "sortOn", label: "Sort On", options: ["Cell Values"] },
      { type: "select", key: "order", label: "Order", options: SORT_ORDERS },
      { type: "text", key: "customList", label: "Custom List entries:", placeholder: "Stat, Urgent, Routine" },
      { type: "select", key: "thenBy", label: "Then by", options: [] },
      { type: "select", key: "thenOrder", label: "Order", options: SORT_ORDERS },
      { type: "text", key: "thenCustomList", label: "Custom List entries:" },
      { type: "select", key: "then2By", label: "Then by", options: [] },
      { type: "select", key: "then2Order", label: "Order", options: SORT_ORDERS },
      { type: "text", key: "then2CustomList", label: "Custom List entries:" },
    ],
  },
  series: {
    id: "series",
    title: "Series",
    width: 400,
    fields: [
      { type: "radio", key: "seriesIn", label: "Series in", options: ["Rows", "Columns"], default: "Columns" },
      { type: "radio", key: "type", label: "Type", options: ["Linear", "Growth", "Date", "AutoFill"], default: "Linear" },
      { type: "radio", key: "dateUnit", label: "Date unit", options: ["Day", "Weekday", "Month", "Year"], default: "Day" },
      { type: "checkbox", key: "trend", label: "Trend" },
      { type: "text", key: "step", label: "Step value:", default: "1" },
      { type: "text", key: "stop", label: "Stop value:" },
    ],
  },
  pivotGroup: {
    id: "pivotGroup",
    title: "Grouping",
    width: 320,
    fields: [
      { type: "note", text: "Auto: starting and ending at the first and last date in the data." },
      { type: "note", text: "By (choose one or more):" },
      { type: "checkbox", key: "days", label: "Days" },
      { type: "checkbox", key: "months", label: "Months", default: true },
      { type: "checkbox", key: "quarters", label: "Quarters" },
      { type: "checkbox", key: "years", label: "Years" },
    ],
  },
  changeSource: {
    id: "changeSource",
    title: "Change PivotTable Data Source",
    width: 380,
    fields: [
      { type: "note", text: "Choose the data that you want to analyze" },
      { type: "text", key: "range", label: "Table/Range:" },
    ],
  },
  allowEditRanges: {
    id: "allowEditRanges",
    title: "New Range",
    width: 360,
    fields: [
      { type: "note", text: "Allow Users to Edit Ranges › New: ranges unlocked by a password when the sheet is protected." },
      { type: "text", key: "title", label: "Title:" },
      { type: "text", key: "refersTo", label: "Refers to cells:" },
      { type: "text", key: "password", label: "Range password:", password: true },
    ],
  },
  cfGreater: { id: "cfGreater", title: "Greater Than", width: 420, fields: [{ type: "text", key: "value", label: "Format cells that are GREATER THAN:" }, cfFormat] },
  cfLess: { id: "cfLess", title: "Less Than", width: 420, fields: [{ type: "text", key: "value", label: "Format cells that are LESS THAN:" }, cfFormat] },
  cfEqual: { id: "cfEqual", title: "Equal To", width: 420, fields: [{ type: "text", key: "value", label: "Format cells that are EQUAL TO:" }, cfFormat] },
  cfBetween: { id: "cfBetween", title: "Between", width: 440, fields: [{ type: "text", key: "low", label: "Format cells that are BETWEEN:" }, { type: "text", key: "high", label: "and" }, cfFormat] },
  cfText: { id: "cfText", title: "Text That Contains", width: 420, fields: [{ type: "text", key: "text", label: "Format cells that contain the text:" }, cfFormat] },
  cfDuplicate: { id: "cfDuplicate", title: "Duplicate Values", width: 400, fields: [{ type: "select", key: "kind", label: "Format cells that contain:", options: ["Duplicate", "Unique"] }, cfFormat] },
  cfTop10: { id: "cfTop10", title: "Top 10 Items", width: 400, fields: [{ type: "number", key: "count", label: "Format cells that rank in the TOP:", default: 10, min: 1 }, cfFormat] },
  cfAboveAverage: { id: "cfAboveAverage", title: "Above Average", width: 400, fields: [{ type: "note", text: "Format cells that are ABOVE AVERAGE:" }, cfFormat] },
  goalSeek: {
    id: "goalSeek",
    title: "Goal Seek",
    width: 300,
    fields: [
      { type: "text", key: "setCell", label: "Set cell:" },
      { type: "text", key: "toValue", label: "To value:" },
      { type: "text", key: "byChanging", label: "By changing cell:" },
    ],
  },
  subtotal: {
    id: "subtotal",
    title: "Subtotal",
    width: 320,
    fields: [
      { type: "select", key: "atEachChange", label: "At each change in:", options: [] },
      { type: "select", key: "fn", label: "Use function:", options: ["Sum", "Count", "Average", "Max", "Min"] },
      { type: "select", key: "addTo", label: "Add subtotal to:", options: [] },
      { type: "checkbox", key: "replace", label: "Replace current subtotals", default: true },
      { type: "checkbox", key: "summaryBelow", label: "Summary below data", default: true },
    ],
  },
  dataValidation: {
    id: "dataValidation",
    title: "Data Validation",
    width: 420,
    tabs: [
      {
        label: "Settings",
        fields: [
          { type: "select", key: "allow", label: "Allow:", options: ["Any value", "Whole number", "Decimal", "List", "Date", "Time", "Text length"] },
          { type: "checkbox", key: "ignoreBlank", label: "Ignore blank", default: true },
          { type: "select", key: "data", label: "Data:", options: VALIDATION_OPERATORS },
          { type: "text", key: "min", label: "Minimum (between, greater than):" },
          { type: "text", key: "max", label: "Maximum (between, less than):" },
          { type: "text", key: "value", label: "Value (equal to, not equal to):" },
          { type: "text", key: "source", label: "Source (items separated by commas, or =$H$2:$H$5):" },
        ],
      },
      {
        label: "Input Message",
        fields: [
          { type: "checkbox", key: "showInput", label: "Show input message when cell is selected", default: true },
          { type: "text", key: "inputTitle", label: "Title:" },
          { type: "text", key: "inputMessage", label: "Input message:" },
        ],
      },
      {
        label: "Error Alert",
        fields: [
          { type: "checkbox", key: "showError", label: "Show error alert after invalid data is entered", default: true },
          { type: "select", key: "errorStyle", label: "Style:", options: ["Stop", "Warning", "Information"] },
          { type: "text", key: "errorTitle", label: "Title:" },
          { type: "text", key: "errorMessage", label: "Error message:" },
        ],
      },
    ],
  },
  removeDuplicates: {
    id: "removeDuplicates",
    title: "Remove Duplicates",
    width: 360,
    fields: [
      { type: "note", text: "To delete duplicate values, select one or more columns that contain duplicates." },
      { type: "checkbox", key: "headers", label: "My data has headers", default: true },
    ],
  },
  textToColumns: {
    id: "textToColumns",
    title: "Convert Text to Columns Wizard",
    okLabel: "Finish",
    width: 420,
    fields: [
      { type: "radio", key: "type", label: "Original data type", options: ["Delimited", "Fixed width"], default: "Delimited" },
      { type: "radio", key: "delimiter", label: "Delimiters", options: ["Tab", "Semicolon", "Comma", "Space"], default: "Tab" },
    ],
  },
  columnWidth: { id: "columnWidth", title: "Column Width", width: 260, fields: [{ type: "number", key: "width", label: "Column width:", step: 1, min: 0 }] },
  rowHeight: { id: "rowHeight", title: "Row Height", width: 260, fields: [{ type: "number", key: "height", label: "Row height:", step: 1, min: 0 }] },
  protectSheet: {
    id: "protectSheet",
    title: "Protect Sheet",
    width: 340,
    fields: [
      { type: "checkbox", key: "protectContents", label: "Protect worksheet and contents of locked cells", default: true },
      { type: "text", key: "password", label: "Password to unprotect sheet:", password: true },
      { type: "checkbox", key: "selectLocked", label: "Select locked cells", default: true },
      { type: "checkbox", key: "selectUnlocked", label: "Select unlocked cells", default: true },
      { type: "checkbox", key: "formatCells", label: "Format cells" },
    ],
  },
  protectWorkbook: { id: "protectWorkbook", title: "Protect Structure and Windows", width: 320, fields: [{ type: "checkbox", key: "structure", label: "Structure", default: true }, { type: "text", key: "password", label: "Password (optional):", password: true }] },
  moveCopySheet: {
    id: "moveCopySheet",
    title: "Move or Copy",
    width: 320,
    fields: [
      { type: "select", key: "toBook", label: "To book:", options: ["(current workbook)", "(new book)"] },
      { type: "text", key: "before", label: "Before sheet:", default: "(move to end)" },
      { type: "checkbox", key: "copy", label: "Create a copy" },
    ],
  },
  defineName: {
    id: "defineName",
    title: "New Name",
    width: 340,
    fields: [
      { type: "text", key: "name", label: "Name:" },
      { type: "select", key: "scope", label: "Scope:", options: ["Workbook"] },
      { type: "text", key: "refersTo", label: "Refers to:" },
    ],
  },
  pageSetupSheet: {
    id: "pageSetupSheet",
    title: "Page Setup",
    width: 440,
    tabs: [
      { label: "Page", fields: [{ type: "radio", key: "orientation", label: "Orientation", options: ["Portrait", "Landscape"], default: "Portrait" }, { type: "select", key: "fitTo", label: "Fit to:", options: ["Adjust to 100%", "1 page wide by 1 tall", "1 page wide by automatic tall"] }] },
      { label: "Margins", fields: [{ type: "number", key: "top", label: "Top:", default: 0.75, step: 0.25 }, { type: "checkbox", key: "centerH", label: "Center on page: Horizontally" }] },
      { label: "Header/Footer", fields: [{ type: "text", key: "header", label: "Header:" }, { type: "text", key: "footer", label: "Footer:" }] },
      { label: "Sheet", fields: [{ type: "text", key: "printArea", label: "Print area:" }, { type: "text", key: "printTitles", label: "Rows to repeat at top:" }, { type: "checkbox", key: "gridlines", label: "Gridlines" }] },
    ],
  },
  newComment: { id: "newComment", title: "New Comment", okLabel: "Post", width: 340, fields: [{ type: "note", text: "BEOC Student" }, { type: "text", key: "text", label: "Comment:", placeholder: "Start a conversation" }] },
  newNote: { id: "newNote", title: "New Note", width: 320, fields: [{ type: "text", key: "text", label: "Note:" }] },
  link: { id: "link", title: "Insert Hyperlink", width: 440, fields: [{ type: "text", key: "text", label: "Text to display:" }, { type: "text", key: "address", label: "Address:", placeholder: "https://" }] },
  find: { id: "find", title: "Find and Replace", okLabel: "Find All", width: 400, fields: [{ type: "text", key: "find", label: "Find what:" }, { type: "select", key: "within", label: "Within:", options: ["Sheet", "Workbook"] }] },
  replace: {
    id: "replace",
    title: "Find and Replace",
    okLabel: "Replace All",
    width: 420,
    fields: [
      { type: "text", key: "find", label: "Find what:" },
      { type: "text", key: "replace", label: "Replace with:" },
      { type: "select", key: "within", label: "Within:", options: ["Sheet", "Workbook"] },
      { type: "checkbox", key: "matchCase", label: "Match case" },
      { type: "checkbox", key: "entireCell", label: "Match entire cell contents" },
    ],
  },
  goTo: { id: "goTo", title: "Go To", width: 300, fields: [{ type: "text", key: "reference", label: "Reference:" }] },
  zoom: { id: "zoom", title: "Zoom", width: 260, fields: [{ type: "radio", key: "preset", label: "Magnification", options: ["200%", "100%", "75%", "50%", "Fit selection"], default: "100%" }, { type: "number", key: "percent", label: "Custom:", default: 100, step: 10 }] },
  sparklines: { id: "sparklines", title: "Create Sparklines", width: 340, fields: [{ type: "select", key: "type", label: "Type:", options: ["Line", "Column", "Win/Loss"] }, { type: "text", key: "dataRange", label: "Data Range:" }, { type: "text", key: "location", label: "Location Range:" }] },
  headerFooter: { id: "headerFooter", title: "Header/Footer", width: 380, fields: [{ type: "text", key: "header", label: "Header:" }, { type: "text", key: "footer", label: "Footer:" }] },
  moveChart: { id: "moveChart", title: "Move Chart", width: 360, fields: [{ type: "radio", key: "location", label: "Choose where you want the chart to be placed:", options: ["New sheet", "Object in"], default: "Object in" }, { type: "text", key: "name", label: "New sheet name:", default: "Chart1" }] },
  cfNewRule: {
    id: "cfNewRule",
    title: "New Formatting Rule",
    width: 460,
    fields: [
      { type: "list", key: "ruleType", label: "Select a Rule Type:", options: CF_RULE_TYPES, default: CF_RULE_TYPES[5], height: 110 },
      { type: "text", key: "formula", label: "Format values where this formula is true:", placeholder: "=$C2<$D2" },
      { type: "select", key: "format", label: "Format:", options: CF_FORMAT_NAMES },
    ],
  },
  cfManage: {
    id: "cfManage",
    title: "Conditional Formatting Rules Manager",
    okLabel: "Delete Rule",
    width: 480,
    fields: [
      { type: "note", text: "Show formatting rules for: This Worksheet" },
      { type: "list", key: "rule", label: "Rule (applied in order shown)", options: [], height: 130 },
    ],
  },
  insertIcons: {
    id: "insertIcons",
    title: "Icons",
    okLabel: "Insert",
    width: 380,
    fields: [
      { type: "text", key: "search", label: "Search:", placeholder: "Search icons" },
      { type: "list", key: "icon", label: "Icons", options: ICON_NAMES, height: 150 },
    ],
  },
  altText: { id: "altText", title: "Alt Text", width: 360, fields: [{ type: "note", text: "How would you describe this object and its context to someone who is blind or low vision?" }, { type: "text", key: "text", label: "Description:" }, { type: "checkbox", key: "decorative", label: "Mark as decorative" }] },
  valueFieldSettings: {
    id: "valueFieldSettings",
    title: "Value Field Settings",
    width: 400,
    tabs: [
      {
        label: "Summarize Values By",
        fields: [
          { type: "text", key: "customName", label: "Custom Name:" },
          { type: "list", key: "fn", label: "Summarize value field by", options: PIVOT_FNS, height: 130 },
        ],
      },
      { label: "Show Values As", fields: [{ type: "select", key: "showAs", label: "Show values as", options: SHOW_VALUES_AS }] },
      {
        // Number Format belongs to the value field, so it survives refreshes and layout changes.
        label: "Number Format",
        fields: [
          { type: "list", key: "numberFormat", label: "Category:", options: VFS_NUMBER_FORMATS, height: 130 },
          { type: "number", key: "decimals", label: "Decimal places:", min: 0, max: 10 },
          { type: "text", key: "custom", label: "Type (Custom):", placeholder: "\"$\"#,##0.00" },
        ],
      },
    ],
  },
  insertSlicer: { id: "insertSlicer", title: "Insert Slicers", width: 300, fields: [{ type: "list", key: "field", label: "Choose a field:", options: [], height: 150 }] },
  insertPicture: { id: "insertPicture", title: "Insert Picture", okLabel: "Insert", width: 400, fields: [{ type: "list", key: "file", label: "File name:", options: ["clinic-logo.png", "staff-photo.jpg", "chart-reference.png"], height: 100 }] },
};
