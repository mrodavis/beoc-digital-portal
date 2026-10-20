import type { DialogDef } from "@/types/sim";
import { THEME_COLORS } from "../../chrome/colors";
import { ALL_CHART_TYPES, NUMBER_FORMATS } from "./ribbon";
import { CF_FORMAT_NAMES } from "./model";

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
          { type: "list", key: "category", label: "Category:", options: NUMBER_FORMATS, height: 170 },
          { type: "number", key: "decimals", label: "Decimal places:", min: 0, max: 10 },
          { type: "select", key: "symbol", label: "Symbol:", options: ["$", "None", "€", "£"] },
        ],
      },
      {
        label: "Alignment",
        fields: [
          { type: "select", key: "horizontal", label: "Horizontal:", options: ["General", "Left", "Center", "Right", "Fill", "Justify"] },
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
    ],
  },
  insertFunction: {
    id: "insertFunction",
    title: "Insert Function",
    width: 420,
    fields: [
      { type: "select", key: "category", label: "Or select a category:", options: ["Most Recently Used", "All", "Financial", "Date & Time", "Math & Trig", "Statistical", "Lookup & Reference", "Text", "Logical"] },
      { type: "list", key: "fn", label: "Select a function:", options: ["SUM", "AVERAGE", "COUNT", "COUNTA", "COUNTIF", "IF", "MAX", "MIN", "ROUND", "VLOOKUP", "XLOOKUP", "PMT", "TODAY", "CONCAT", "SUMIF"], height: 140 },
      { type: "text", key: "args", label: "Function Arguments:", placeholder: "B2:B10" },
    ],
  },
  sort: {
    id: "sort",
    title: "Sort",
    width: 460,
    fields: [
      { type: "checkbox", key: "headers", label: "My data has headers", default: true },
      { type: "select", key: "sortBy", label: "Sort by", options: [] },
      { type: "select", key: "sortOn", label: "Sort On", options: ["Cell Values", "Cell Color", "Font Color"] },
      { type: "select", key: "order", label: "Order", options: ["A to Z", "Z to A", "Smallest to Largest", "Largest to Smallest"] },
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
      { type: "text", key: "atEachChange", label: "At each change in:" },
      { type: "select", key: "fn", label: "Use function:", options: ["Sum", "Count", "Average", "Max", "Min"] },
      { type: "text", key: "addTo", label: "Add subtotal to:" },
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
          { type: "select", key: "data", label: "Data:", options: ["between", "not between", "equal to", "greater than", "less than"] },
          { type: "text", key: "min", label: "Minimum:" },
          { type: "text", key: "max", label: "Maximum:" },
          { type: "text", key: "source", label: "Source (list items separated by commas):" },
        ],
      },
      { label: "Input Message", fields: [{ type: "checkbox", key: "showInput", label: "Show input message when cell is selected", default: true }, { type: "text", key: "inputMessage", label: "Input message:" }] },
      { label: "Error Alert", fields: [{ type: "select", key: "errorStyle", label: "Style:", options: ["Stop", "Warning", "Information"] }, { type: "text", key: "errorMessage", label: "Error message:" }] },
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
  insertPicture: { id: "insertPicture", title: "Insert Picture", okLabel: "Insert", width: 400, fields: [{ type: "list", key: "file", label: "File name:", options: ["clinic-logo.png", "staff-photo.jpg", "chart-reference.png"], height: 100 }] },
};
