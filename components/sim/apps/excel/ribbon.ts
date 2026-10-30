import type { ExcelBook, RibbonControl, RibbonOption, RibbonTab } from "@/types/sim";
import type { SimUi } from "../../types";
import { THEME_COLORS } from "../../chrome/colors";
import { activeCell, pivotCellAt, sheetOf, SPARKLINE_COLORS, TAB_COLORS } from "./model";

const FONTS = ["Aptos Narrow", "Aptos", "Calibri", "Arial", "Cambria", "Century Gothic", "Courier New", "Georgia", "Segoe UI", "Tahoma", "Times New Roman", "Verdana"];
const SIZES = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "24", "28", "36"];

const colorOpts = (extra: RibbonOption[] = []): RibbonOption[] => [
  ...extra,
  { value: "Theme Colors", heading: true },
  ...THEME_COLORS.slice(0, 10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
  { value: "Standard Colors", heading: true },
  ...THEME_COLORS.slice(10).map((c) => ({ value: c.color, label: c.label, color: c.color })),
];

export const NUMBER_FORMATS = ["General", "Number", "Currency", "Accounting", "Short Date", "Long Date", "Time", "Percentage", "Fraction", "Scientific", "Text"];
export const TABLE_STYLES = ["Table Style Light 1", "Table Style Light 9", "Table Style Medium 2", "Table Style Medium 4", "Table Style Medium 7", "Table Style Medium 9", "Table Style Medium 14", "Table Style Dark 1"];
export const TABLE_STYLE_COLORS: Record<string, string> = {
  "Table Style Light 1": "#d9d9d9",
  "Table Style Light 9": "#4472C4",
  "Table Style Medium 2": "#4472C4",
  "Table Style Medium 4": "#FFC000",
  "Table Style Medium 7": "#70AD47",
  "Table Style Medium 9": "#4472C4",
  "Table Style Medium 14": "#ED7D31",
  "Table Style Dark 1": "#262626",
};
const CHART_TYPES = {
  column: ["Clustered Column", "Stacked Column", "100% Stacked Column", "Clustered Bar", "Stacked Bar"],
  line: ["Line", "Line with Markers", "Stacked Line", "Area"],
  pie: ["Pie", "3-D Pie", "Doughnut"],
};
export const ALL_CHART_TYPES = [...CHART_TYPES.column, ...CHART_TYPES.line, ...CHART_TYPES.pie, "Scatter", "Combo"];

const fnMenu = (names: string[]): RibbonOption[] => names.map((n) => ({ value: n, command: "formulas.function" }));

export const excelRibbon: RibbonTab[] = [
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
              { value: "Paste", heading: true },
              { value: "Formulas", icon: "fx" },
              { value: "Values", icon: "paste" },
              { value: "Formatting", icon: "formatPainter" },
              { value: "Transpose", icon: "orientation" },
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
        launcher: "formatCells",
        controls: [],
        rows: [
          [
            { type: "dropdown", id: "home.fontName", label: "Font", combo: true, width: 112, options: FONTS.map((f) => ({ value: f, preview: { font: f } })) },
            { type: "dropdown", id: "home.fontSize", label: "Font Size", combo: true, width: 42, options: SIZES.map((s) => ({ value: s })) },
            { type: "button", id: "home.growFont", label: "Increase Font Size", icon: "growFont" },
            { type: "button", id: "home.shrinkFont", label: "Decrease Font Size", icon: "shrinkFont" },
          ],
          [
            { type: "toggle", id: "home.bold", label: "Bold", icon: "bold", shortcut: "Ctrl+B" },
            { type: "toggle", id: "home.italic", label: "Italic", icon: "italic", shortcut: "Ctrl+I" },
            { type: "toggle", id: "home.underline", label: "Underline", icon: "underline", shortcut: "Ctrl+U" },
            {
              type: "dropdown",
              id: "home.borders",
              label: "Borders",
              icon: "borders",
              split: true,
              faceValue: "Bottom Border",
              options: ["Bottom Border", "Top Border", "Left Border", "Right Border", "No Border", "All Borders", "Outside Borders", "Thick Outside Borders", "Bottom Double Border", "Thick Bottom Border"].map((v) => ({ value: v, icon: "borders" })),
            },
            { type: "dropdown", id: "home.fill", label: "Fill Color", icon: "fill", split: true, faceValue: "#FFFF00", gallery: "swatches", options: colorOpts([{ value: "No Fill", label: "No Fill" }]) },
            { type: "dropdown", id: "home.fontColor", label: "Font Color", icon: "fontColor", split: true, faceValue: "#C00000", gallery: "swatches", options: colorOpts([{ value: "Automatic", label: "Automatic", color: "#000000" }]) },
          ],
        ],
      },
      {
        label: "Alignment",
        launcher: "formatCells",
        controls: [],
        rows: [
          [
            { type: "toggle", id: "home.alignTop", label: "Top Align", icon: "alignLeft" },
            { type: "toggle", id: "home.alignMiddle", label: "Middle Align", icon: "alignCenter" },
            { type: "toggle", id: "home.alignBottom", label: "Bottom Align", icon: "alignRight" },
            { type: "dropdown", id: "home.orientation", label: "Orientation", icon: "rotate", options: ["Angle Counterclockwise", "Angle Clockwise", "Vertical Text", "Rotate Text Up", "Rotate Text Down"].map((v) => ({ value: v })) },
            { type: "toggle", id: "home.wrap", label: "Wrap Text", icon: "wrap", showLabel: true },
          ],
          [
            { type: "toggle", id: "home.alignLeft", label: "Align Left", icon: "alignLeft" },
            { type: "toggle", id: "home.alignCenter", label: "Center", icon: "alignCenter" },
            { type: "toggle", id: "home.alignRight", label: "Align Right", icon: "alignRight" },
            { type: "button", id: "home.indentDec", label: "Decrease Indent", icon: "indentDec" },
            { type: "button", id: "home.indentInc", label: "Increase Indent", icon: "indentInc" },
            { type: "dropdown", id: "home.merge", label: "Merge & Center", icon: "merge", showLabel: true, split: true, faceValue: "Merge & Center", options: ["Merge & Center", "Merge Across", "Merge Cells", "Unmerge Cells"].map((v) => ({ value: v, icon: "merge" })) },
          ],
        ],
      },
      {
        label: "Number",
        launcher: "formatCells",
        controls: [],
        rows: [
          [{ type: "dropdown", id: "home.numberFormat", label: "Number Format", combo: true, width: 110, options: [...NUMBER_FORMATS.map((v) => ({ value: v })), { value: "More Number Formats...", dialog: "formatCells" }] }],
          [
            { type: "dropdown", id: "home.accounting", label: "Accounting Number Format", icon: "currency", split: true, faceValue: "$ English (United States)", options: ["$ English (United States)", "£ English (United Kingdom)", "€ Euro (€ 123)"].map((v) => ({ value: v })) },
            { type: "button", id: "home.percent", label: "Percent Style", icon: "percent", shortcut: "Ctrl+Shift+%" },
            { type: "button", id: "home.comma", label: "Comma Style", icon: "comma" },
            { type: "button", id: "home.decInc", label: "Increase Decimal", icon: "decInc" },
            { type: "button", id: "home.decDec", label: "Decrease Decimal", icon: "decDec" },
          ],
        ],
      },
      {
        label: "Styles",
        controls: [
          {
            type: "dropdown",
            id: "home.conditionalFormatting",
            label: "Conditional Formatting",
            icon: "condFormat",
            size: "large",
            options: [
              { value: "Highlight Cells Rules", heading: true },
              { value: "Greater Than...", dialog: "cfGreater" },
              { value: "Less Than...", dialog: "cfLess" },
              { value: "Between...", dialog: "cfBetween" },
              { value: "Equal To...", dialog: "cfEqual" },
              { value: "Text that Contains...", dialog: "cfText" },
              { value: "Duplicate Values...", dialog: "cfDuplicate" },
              { value: "Top/Bottom Rules", heading: true },
              { value: "Top 10 Items...", dialog: "cfTop10" },
              { value: "Above Average...", dialog: "cfAboveAverage" },
              { value: "Data Bars", heading: true },
              { value: "Blue Data Bar" },
              { value: "Green Data Bar" },
              { value: "Orange Data Bar" },
              { value: "Color Scales", heading: true },
              { value: "Green - Yellow - Red Color Scale" },
              { value: "Red - Yellow - Green Color Scale" },
              { value: "Icon Sets", heading: true },
              { value: "3 Traffic Lights" },
              { value: "3 Arrows (Colored)" },
              { value: "3 Symbols (Circled)" },
              { value: "3 Flags" },
              { value: "Rules", heading: true },
              { value: "New Rule...", dialog: "cfNewRule" },
              { value: "Clear Rules from Selected Cells" },
              { value: "Clear Rules from Entire Sheet" },
              { value: "Manage Rules...", dialog: "cfManage" },
            ],
          },
          { type: "dropdown", id: "home.formatAsTable", label: "Format as Table", icon: "formatTable", size: "large", gallery: "grid", options: TABLE_STYLES.map((s) => ({ value: s, color: TABLE_STYLE_COLORS[s] })) },
          { type: "dropdown", id: "home.cellStyle", label: "Cell Styles", icon: "cellStyles", size: "large", gallery: "grid", options: [
            { value: "Good, Bad and Neutral", heading: true },
            { value: "Normal", color: "#ffffff" },
            { value: "Bad", color: "#FFC7CE" },
            { value: "Good", color: "#C6EFCE" },
            { value: "Neutral", color: "#FFEB9C" },
            { value: "Titles and Headings", heading: true },
            { value: "Title", color: "#ffffff" },
            { value: "Heading 1", color: "#ffffff" },
            { value: "Heading 2", color: "#ffffff" },
            { value: "Total", color: "#ffffff" },
            { value: "Number Format", heading: true },
            { value: "Currency", color: "#ffffff" },
            { value: "Percent", color: "#ffffff" },
            { value: "Note", color: "#FFFFCC" },
            { value: "Accent1", color: "#4472C4" },
          ] },
        ],
      },
      {
        label: "Cells",
        controls: [
          { type: "dropdown", id: "home.insert", label: "Insert", icon: "insertCells", size: "large", split: true, faceValue: "Insert Cells", options: ["Insert Cells...", "Insert Sheet Rows", "Insert Sheet Columns", "Insert Sheet"].map((v) => ({ value: v, icon: "insertCells" })) },
          { type: "dropdown", id: "home.delete", label: "Delete", icon: "deleteCells", size: "large", split: true, faceValue: "Delete Cells", options: ["Delete Cells...", "Delete Sheet Rows", "Delete Sheet Columns", "Delete Sheet"].map((v) => ({ value: v, icon: "deleteCells" })) },
          {
            type: "dropdown",
            id: "home.format",
            label: "Format",
            icon: "format",
            size: "large",
            options: [
              { value: "Cell Size", heading: true },
              { value: "Row Height...", dialog: "rowHeight" },
              { value: "AutoFit Row Height" },
              { value: "Column Width...", dialog: "columnWidth" },
              { value: "AutoFit Column Width" },
              { value: "Visibility", heading: true },
              { value: "Hide Rows" },
              { value: "Hide Columns" },
              { value: "Hide Sheet" },
              { value: "Unhide Rows" },
              { value: "Unhide Columns" },
              { value: "Organize Sheets", heading: true },
              { value: "Move or Copy Sheet...", dialog: "moveCopySheet" },
              ...Object.keys(TAB_COLORS).map((n) => ({ value: `Tab Color: ${n}`, color: TAB_COLORS[n] })),
              { value: "Protection", heading: true },
              { value: "Protect Sheet...", dialog: "protectSheet" },
              { value: "Format Cells...", dialog: "formatCells" },
            ],
          },
        ],
      },
      {
        label: "Editing",
        controls: [
          { type: "dropdown", id: "home.autosum", label: "AutoSum", icon: "sum", showLabel: true, split: true, faceValue: "Sum", options: ["Sum", "Average", "Count Numbers", "Max", "Min"].map((v) => ({ value: v })).concat([{ value: "More Functions...", dialog: "insertFunction" } as RibbonOption]) },
          {
            type: "dropdown",
            id: "home.fillSeries",
            label: "Fill",
            icon: "fillDown",
            showLabel: true,
            options: [{ value: "Down" }, { value: "Right" }, { value: "Up" }, { value: "Left" }, { value: "Series...", dialog: "series" }, { value: "Flash Fill" }],
          },
          { type: "dropdown", id: "home.clear", label: "Clear", icon: "clear", showLabel: true, options: ["Clear All", "Clear Formats", "Clear Contents", "Clear Comments and Notes", "Clear Hyperlinks"].map((v) => ({ value: v })) },
          {
            type: "dropdown",
            id: "home.sortFilter",
            label: "Sort & Filter",
            icon: "sort",
            size: "large",
            options: [
              { value: "Sort A to Z", command: "data.sortAsc", icon: "sortAsc" },
              { value: "Sort Z to A", command: "data.sortDesc", icon: "sortDesc" },
              { value: "Custom Sort...", command: "data.sort", icon: "sort" },
              { value: "Filter", command: "data.filter", icon: "filter" },
              { value: "Clear", command: "data.clearFilter", icon: "clear" },
              { value: "Reapply", command: "data.reapply", icon: "reset" },
            ],
          },
          { type: "dropdown", id: "home.findSelect", label: "Find & Select", icon: "find", size: "large", options: [{ value: "Find...", dialog: "find" }, { value: "Replace...", dialog: "replace" }, { value: "Go To...", dialog: "goTo" }] },
        ],
      },
      { label: "Analysis", controls: [{ type: "button", id: "home.analyzeData", label: "Analyze Data", icon: "recommendedCharts", size: "large" }] },
    ],
  },
  {
    id: "insert",
    label: "Insert",
    groups: [
      {
        label: "Tables",
        controls: [
          { type: "button", id: "insert.pivotTable", label: "PivotTable", icon: "pivot", size: "large", dialog: "createPivot" },
          { type: "button", id: "insert.recommendedPivot", label: "Recommended PivotTables", icon: "pivot", size: "large", dialog: "createPivot" },
          { type: "button", id: "insert.table", label: "Table", icon: "formatTable", size: "large", dialog: "createTable", shortcut: "Ctrl+T" },
        ],
      },
      {
        label: "Illustrations",
        controls: [
          { type: "dropdown", id: "insert.pictures", label: "Pictures", icon: "picture", size: "large", options: [{ value: "Place in Cell", heading: true }, { value: "This Device...", dialog: "insertPicture" }, { value: "Stock Images...", command: "insert.onlinePictures" }] },
          { type: "dropdown", id: "insert.shape", label: "Shapes", icon: "shapes", showLabel: true, options: ["Rectangle", "Oval", "Right Arrow", "Callout"].map((v) => ({ value: v })) },
          { type: "button", id: "insert.icons", label: "Icons", icon: "icons", showLabel: true, dialog: "insertIcons" },
          { type: "button", id: "insert.smartArt", label: "SmartArt", icon: "smartart", showLabel: true },
        ],
      },
      {
        label: "Charts",
        launcher: "insertChart",
        controls: [
          { type: "button", id: "insert.recommendedCharts", label: "Recommended Charts", icon: "recommendedCharts", size: "large", dialog: "insertChart" },
          { type: "dropdown", id: "insert.chart.column", label: "Insert Column or Bar Chart", icon: "chart", options: CHART_TYPES.column.map((v) => ({ value: v, command: "insert.chart", icon: "chart" })) },
          { type: "dropdown", id: "insert.chart.line", label: "Insert Line or Area Chart", icon: "line", options: CHART_TYPES.line.map((v) => ({ value: v, command: "insert.chart", icon: "line" })) },
          { type: "dropdown", id: "insert.chart.pie", label: "Insert Pie or Doughnut Chart", icon: "pie", options: CHART_TYPES.pie.map((v) => ({ value: v, command: "insert.chart", icon: "pie" })) },
          { type: "dropdown", id: "insert.chart.scatter", label: "Insert Scatter Chart", icon: "line", options: [{ value: "Scatter", command: "insert.chart" }] },
          { type: "dropdown", id: "insert.chart.combo", label: "Insert Combo Chart", icon: "chart", options: [{ value: "Combo", command: "insert.chart" }] },
          { type: "button", id: "insert.pivotChart", label: "PivotChart", icon: "chart", size: "large", dialog: "createPivot" },
        ],
      },
      { label: "Sparklines", controls: [{ type: "button", id: "insert.sparkLine", label: "Line", icon: "line", showLabel: true, dialog: "sparklines" }, { type: "button", id: "insert.sparkColumn", label: "Column", icon: "chart", showLabel: true, dialog: "sparklines" }, { type: "button", id: "insert.sparkWinLoss", label: "Win/Loss", icon: "chart", showLabel: true, dialog: "sparklines" }] },
      { label: "Filters", controls: [{ type: "button", id: "insert.slicer", label: "Slicer", icon: "filter", showLabel: true, dialog: "insertSlicer" }, { type: "button", id: "insert.timeline", label: "Timeline", icon: "date", showLabel: true }] },
      { label: "Links", controls: [{ type: "button", id: "insert.link", label: "Link", icon: "link", size: "large", dialog: "link", shortcut: "Ctrl+K" }] },
      { label: "Comments", controls: [{ type: "button", id: "insert.comment", label: "Comment", icon: "comment", size: "large", dialog: "newComment" }] },
      { label: "Text", controls: [{ type: "button", id: "insert.textBox", label: "Text Box", icon: "textbox", showLabel: true }, { type: "button", id: "insert.headerFooter", label: "Header & Footer", icon: "header", showLabel: true }, { type: "button", id: "insert.wordArt", label: "WordArt", icon: "wordart", showLabel: true }] },
      { label: "Symbols", controls: [{ type: "button", id: "insert.equation", label: "Equation", icon: "equation", showLabel: true }, { type: "button", id: "insert.symbol", label: "Symbol", icon: "symbol", showLabel: true }] },
    ],
  },
  {
    id: "pageLayout",
    label: "Page Layout",
    groups: [
      { label: "Themes", controls: [{ type: "dropdown", id: "layout.theme", label: "Themes", icon: "themes", size: "large", options: ["Office", "Facet", "Ion", "Retrospect", "Slice", "Wisp"].map((v) => ({ value: v })) }, { type: "dropdown", id: "layout.colors", label: "Colors", icon: "colors", showLabel: true, options: ["Office", "Blue", "Green", "Red Orange"].map((v) => ({ value: v })) }, { type: "dropdown", id: "layout.fonts", label: "Fonts", icon: "fonts", showLabel: true, options: ["Office", "Arial", "Calibri"].map((v) => ({ value: v })) }] },
      {
        label: "Page Setup",
        launcher: "pageSetupSheet",
        controls: [
          { type: "dropdown", id: "layout.margins", label: "Margins", icon: "margins", size: "large", options: ["Normal", "Wide", "Narrow", "Custom Margins..."].map((v) => (v === "Custom Margins..." ? { value: v, dialog: "pageSetupSheet" } : { value: v })) },
          { type: "dropdown", id: "layout.orientation", label: "Orientation", icon: "orientation", size: "large", options: [{ value: "Portrait" }, { value: "Landscape" }] },
          { type: "dropdown", id: "layout.size", label: "Size", icon: "size", size: "large", options: ["Letter", "Legal", "A4"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "layout.printArea", label: "Print Area", icon: "print", size: "large", options: [{ value: "Set Print Area" }, { value: "Clear Print Area" }] },
          { type: "dropdown", id: "layout.breaks", label: "Breaks", icon: "breaks", size: "large", options: ["Insert Page Break", "Remove Page Break", "Reset All Page Breaks"].map((v) => ({ value: v })) },
          { type: "button", id: "layout.background", label: "Background", icon: "background", size: "large" },
          { type: "button", id: "layout.printTitles", label: "Print Titles", icon: "table", size: "large", dialog: "pageSetupSheet" },
        ],
      },
      {
        label: "Scale to Fit",
        controls: [],
        rows: [
          [{ type: "dropdown", id: "layout.fitWidth", label: "Width", combo: true, width: 76, options: ["Automatic", "1 page", "2 pages"].map((v) => ({ value: v })) }],
          [{ type: "dropdown", id: "layout.fitHeight", label: "Height", combo: true, width: 76, options: ["Automatic", "1 page", "2 pages"].map((v) => ({ value: v })) }],
          [{ type: "dropdown", id: "layout.scale", label: "Scale", combo: true, width: 76, options: ["100%", "90%", "75%"].map((v) => ({ value: v })) }],
        ],
      },
      {
        label: "Sheet Options",
        controls: [
          { type: "toggle", id: "layout.gridlinesView", label: "Gridlines: View", showLabel: true },
          { type: "toggle", id: "layout.gridlinesPrint", label: "Gridlines: Print", showLabel: true },
          { type: "toggle", id: "layout.headingsView", label: "Headings: View", showLabel: true },
          { type: "toggle", id: "layout.headingsPrint", label: "Headings: Print", showLabel: true },
        ],
      },
    ],
  },
  {
    id: "formulas",
    label: "Formulas",
    groups: [
      {
        label: "Function Library",
        controls: [
          { type: "button", id: "formulas.insertFunction", label: "Insert Function", icon: "fx", size: "large", dialog: "insertFunction", shortcut: "Shift+F3" },
          { type: "dropdown", id: "home.autosum", label: "AutoSum", icon: "sum", size: "large", options: ["Sum", "Average", "Count Numbers", "Max", "Min"].map((v) => ({ value: v })) },
          { type: "dropdown", id: "formulas.recent", label: "Recently Used", icon: "history", size: "large", options: fnMenu(["SUM", "AVERAGE", "IF", "COUNTIF", "VLOOKUP", "XLOOKUP"]) },
          { type: "dropdown", id: "formulas.financial", label: "Financial", icon: "currency", size: "large", options: fnMenu(["PMT", "FV", "PV", "RATE"]) },
          { type: "dropdown", id: "formulas.logical", label: "Logical", icon: "whatIf", size: "large", options: fnMenu(["IF", "AND", "OR", "NOT", "IFERROR", "IFS"]) },
          { type: "dropdown", id: "formulas.text", label: "Text", icon: "textbox", size: "large", options: fnMenu(["CONCAT", "LEFT", "RIGHT", "MID", "LEN", "UPPER", "LOWER", "PROPER", "TRIM", "TEXTJOIN"]) },
          { type: "dropdown", id: "formulas.dateTime", label: "Date & Time", icon: "date", size: "large", options: fnMenu(["TODAY", "NOW", "DATE", "YEAR", "MONTH", "DAY"]) },
          { type: "dropdown", id: "formulas.lookup", label: "Lookup & Reference", icon: "find", size: "large", options: fnMenu(["VLOOKUP", "HLOOKUP", "XLOOKUP", "INDEX", "MATCH", "FILTER", "SORT", "UNIQUE"]) },
          { type: "dropdown", id: "formulas.math", label: "Math & Trig", icon: "equation", size: "large", options: fnMenu(["SUM", "SUMIF", "SUMIFS", "ROUND", "ROUNDUP", "ROUNDDOWN", "ABS", "INT"]) },
          { type: "dropdown", id: "formulas.more", label: "More Functions", icon: "more", size: "large", options: fnMenu(["AVERAGE", "COUNT", "COUNTA", "COUNTIF", "COUNTIFS", "MAX", "MIN", "MEDIAN"]) },
        ],
      },
      {
        label: "Defined Names",
        controls: [
          { type: "button", id: "formulas.nameManager", label: "Name Manager", icon: "table", size: "large" },
          { type: "button", id: "formulas.defineName", label: "Define Name", icon: "field", showLabel: true, dialog: "defineName" },
          { type: "button", id: "formulas.useInFormula", label: "Use in Formula", icon: "fx", showLabel: true },
          { type: "button", id: "formulas.createFromSelection", label: "Create from Selection", icon: "table", showLabel: true },
        ],
      },
      {
        label: "Formula Auditing",
        controls: [
          { type: "button", id: "formulas.tracePrecedents", label: "Trace Precedents", icon: "redo", showLabel: true },
          { type: "button", id: "formulas.traceDependents", label: "Trace Dependents", icon: "undo", showLabel: true },
          { type: "button", id: "formulas.removeArrows", label: "Remove Arrows", icon: "close", showLabel: true },
          { type: "toggle", id: "formulas.showFormulas", label: "Show Formulas", icon: "fx", showLabel: true, shortcut: "Ctrl+`" },
          { type: "button", id: "formulas.errorChecking", label: "Error Checking", icon: "checkIssues", showLabel: true },
          { type: "button", id: "formulas.evaluate", label: "Evaluate Formula", icon: "fx", showLabel: true },
        ],
      },
      { label: "Calculation", controls: [{ type: "dropdown", id: "formulas.calcOptions", label: "Calculation Options", icon: "options", size: "large", options: ["Automatic", "Automatic Except for Data Tables", "Manual"].map((v) => ({ value: v })) }, { type: "button", id: "formulas.calcNow", label: "Calculate Now", icon: "reset", showLabel: true }] },
    ],
  },
  {
    id: "data",
    label: "Data",
    groups: [
      { label: "Get & Transform Data", controls: [{ type: "dropdown", id: "data.getData", label: "Get Data", icon: "folder", size: "large", options: ["From File", "From Database", "From Web", "From Table/Range"].map((v) => ({ value: v })) }, { type: "button", id: "data.fromText", label: "From Text/CSV", icon: "new", showLabel: true }, { type: "button", id: "data.fromWeb", label: "From Web", icon: "webLayout", showLabel: true }] },
      { label: "Queries & Connections", controls: [{ type: "button", id: "data.refresh", label: "Refresh All", icon: "reset", size: "large" }] },
      { label: "Data Types", controls: [{ type: "button", id: "data.stocks", label: "Stocks", icon: "line", size: "large" }, { type: "button", id: "data.geography", label: "Geography", icon: "webLayout", size: "large" }] },
      {
        label: "Sort & Filter",
        controls: [
          { type: "button", id: "data.sortAsc", label: "Sort A to Z", icon: "sortAsc", tip: "Sort Smallest to Largest" },
          { type: "button", id: "data.sortDesc", label: "Sort Z to A", icon: "sortDesc", tip: "Sort Largest to Smallest" },
          { type: "button", id: "data.sort", label: "Sort", icon: "sort", size: "large" },
          { type: "toggle", id: "data.filter", label: "Filter", icon: "filter", size: "large", shortcut: "Ctrl+Shift+L" },
          { type: "button", id: "data.clearFilter", label: "Clear", icon: "clear", showLabel: true },
          { type: "button", id: "data.reapply", label: "Reapply", icon: "reset", showLabel: true },
        ],
      },
      {
        label: "Data Tools",
        controls: [
          { type: "button", id: "data.textToColumns", label: "Text to Columns", icon: "textToColumns", size: "large", dialog: "textToColumns" },
          { type: "button", id: "data.flashFill", label: "Flash Fill", icon: "fillDown", showLabel: true, shortcut: "Ctrl+E" },
          { type: "button", id: "data.removeDuplicates", label: "Remove Duplicates", icon: "removeDup", showLabel: true, dialog: "removeDuplicates" },
          {
            type: "dropdown",
            id: "data.validation",
            label: "Data Validation",
            icon: "validation",
            showLabel: true,
            options: [
              { value: "Data Validation...", dialog: "dataValidation", icon: "validation" },
              { value: "Circle Invalid Data", command: "data.circleInvalid" },
              { value: "Clear Validation Circles", command: "data.clearCircles" },
            ],
          },
          { type: "button", id: "data.consolidate", label: "Consolidate", icon: "table", showLabel: true },
        ],
      },
      { label: "Forecast", controls: [{ type: "dropdown", id: "data.whatIf", label: "What-If Analysis", icon: "whatIf", size: "large", options: [{ value: "Scenario Manager..." }, { value: "Goal Seek...", dialog: "goalSeek" }, { value: "Data Table..." }] }, { type: "button", id: "data.forecastSheet", label: "Forecast Sheet", icon: "line", size: "large" }] },
      {
        label: "Outline",
        controls: [
          { type: "button", id: "data.group", label: "Group", icon: "group", size: "large", shortcut: "Shift+Alt+Right" },
          { type: "button", id: "data.ungroup", label: "Ungroup", icon: "group", size: "large" },
          { type: "button", id: "data.subtotal", label: "Subtotal", icon: "subtotal", size: "large", dialog: "subtotal" },
          { type: "button", id: "data.showDetail", label: "Show Detail", icon: "insertCells", showLabel: true },
          { type: "button", id: "data.hideDetail", label: "Hide Detail", icon: "deleteCells", showLabel: true },
        ],
      },
    ],
  },
  {
    id: "review",
    label: "Review",
    groups: [
      { label: "Proofing", controls: [{ type: "button", id: "review.spelling", label: "Spelling", icon: "spelling", size: "large", shortcut: "F7" }, { type: "button", id: "review.thesaurus", label: "Thesaurus", icon: "thesaurus", showLabel: true }, { type: "button", id: "review.workbookStats", label: "Workbook Statistics", icon: "wordCount", showLabel: true }] },
      { label: "Accessibility", controls: [{ type: "button", id: "review.accessibility", label: "Check Accessibility", icon: "accessibility", size: "large" }] },
      // Smart Lookup (Review › Insights) was retired in January 2025, so the Insights group is gone.
      { label: "Language", controls: [{ type: "button", id: "review.translate", label: "Translate", icon: "translate", size: "large" }] },
      {
        label: "Comments",
        controls: [
          { type: "button", id: "review.newComment", label: "New Comment", icon: "comment", size: "large", dialog: "newComment" },
          { type: "button", id: "review.deleteComment", label: "Delete", icon: "reject", showLabel: true },
          { type: "button", id: "review.prevComment", label: "Previous Comment", icon: "undo", showLabel: true },
          { type: "button", id: "review.nextComment", label: "Next Comment", icon: "redo", showLabel: true },
          { type: "button", id: "review.showComments", label: "Show Comments", icon: "comment", size: "large" },
        ],
      },
      { label: "Notes", controls: [{ type: "dropdown", id: "review.notes", label: "Notes", icon: "notes", size: "large", options: [{ value: "New Note", dialog: "newNote" }, { value: "Show All Notes", command: "review.showNotes" }] }] },
      {
        label: "Protect",
        controls: [
          { type: "button", id: "review.protectSheet", label: "Protect Sheet", icon: "protect", size: "large", dialog: "protectSheet" },
          { type: "button", id: "review.protectWorkbook", label: "Protect Workbook", icon: "protect", size: "large", dialog: "protectWorkbook" },
          { type: "button", id: "review.allowEditRanges", label: "Allow Edit Ranges", icon: "protect", showLabel: true, dialog: "allowEditRanges" },
        ],
      },
    ],
  },
  {
    id: "view",
    label: "View",
    groups: [
      {
        label: "Sheet View",
        controls: [
          { type: "button", id: "view.sheetViewNew", label: "New", icon: "new", showLabel: true, tip: "New Sheet View: sort and filter without changing what others see" },
          { type: "button", id: "view.sheetViewKeep", label: "Keep", icon: "save", showLabel: true },
          { type: "button", id: "view.sheetViewExit", label: "Exit", icon: "close", showLabel: true },
        ],
      },
      {
        label: "Workbook Views",
        controls: [
          { type: "toggle", id: "view.mode.normal", label: "Normal", icon: "printLayout", size: "large", stateKey: "view.normal" },
          { type: "toggle", id: "view.mode.pageBreak", label: "Page Break Preview", icon: "pageBreak", size: "large", stateKey: "view.pageBreak" },
          { type: "toggle", id: "view.mode.pageLayout", label: "Page Layout", icon: "onePage", showLabel: true, stateKey: "view.pageLayout" },
          { type: "button", id: "view.customViews", label: "Custom Views", icon: "multiplePages", showLabel: true },
        ],
      },
      { label: "Show", controls: [{ type: "toggle", id: "view.ruler", label: "Ruler", showLabel: true }, { type: "toggle", id: "view.gridlines", label: "Gridlines", showLabel: true }, { type: "toggle", id: "view.formulaBar", label: "Formula Bar", showLabel: true }, { type: "toggle", id: "view.headings", label: "Headings", showLabel: true }] },
      { label: "Zoom", controls: [{ type: "button", id: "view.zoomDialog", label: "Zoom", icon: "zoom", size: "large", dialog: "zoom" }, { type: "button", id: "view.zoomTo", label: "100%", icon: "zoom", size: "large" }, { type: "button", id: "view.zoomSelection", label: "Zoom to Selection", icon: "zoom", size: "large" }] },
      {
        label: "Window",
        controls: [
          { type: "button", id: "view.newWindow", label: "New Window", icon: "newWindow", size: "large" },
          { type: "button", id: "view.arrangeAll", label: "Arrange All", icon: "multiplePages", size: "large" },
          { type: "dropdown", id: "view.freeze", label: "Freeze Panes", icon: "freeze", size: "large", options: ["Freeze Panes", "Freeze Top Row", "Freeze First Column", "Unfreeze Panes"].map((v) => ({ value: v, icon: "freeze" })) },
          { type: "toggle", id: "view.split", label: "Split", icon: "split", showLabel: true },
          { type: "button", id: "view.hide", label: "Hide", icon: "close", showLabel: true },
          { type: "button", id: "view.sideBySide", label: "View Side by Side", icon: "compare", showLabel: true },
        ],
      },
      { label: "Macros", controls: [{ type: "dropdown", id: "view.macros", label: "Macros", icon: "macros", size: "large", options: [{ value: "View Macros" }, { value: "Record Macro..." }] }] },
    ],
  },
  {
    id: "help",
    label: "Help",
    groups: [{ label: "Help", controls: [{ type: "button", id: "help.help", label: "Help", icon: "help", size: "large" }, { type: "button", id: "help.feedback", label: "Feedback", icon: "comment", size: "large" }] }],
  },
  /* -------- contextual -------- */
  {
    id: "tableDesign",
    label: "Table Design",
    contextual: "table",
    groups: [
      { label: "Properties", controls: [{ type: "dropdown", id: "table.name", label: "Table Name", combo: true, width: 96, options: [] }, { type: "button", id: "table.resize", label: "Resize Table", icon: "size", showLabel: true }] },
      { label: "Tools", controls: [{ type: "button", id: "table.summarizePivot", label: "Summarize with PivotTable", icon: "pivot", showLabel: true, dialog: "createPivot" }, { type: "button", id: "table.removeDuplicates", label: "Remove Duplicates", icon: "removeDup", showLabel: true }, { type: "button", id: "table.convertToRange", label: "Convert to Range", icon: "table", showLabel: true }, { type: "button", id: "insert.slicer", label: "Insert Slicer", icon: "filter", size: "large", dialog: "insertSlicer" }] },
      {
        label: "Table Style Options",
        controls: [
          { type: "toggle", id: "table.headerRow", label: "Header Row", showLabel: true },
          { type: "toggle", id: "table.totalRow", label: "Total Row", showLabel: true },
          { type: "toggle", id: "table.bandedRows", label: "Banded Rows", showLabel: true },
          { type: "toggle", id: "table.firstColumn", label: "First Column", showLabel: true },
          { type: "toggle", id: "table.filterButton", label: "Filter Button", showLabel: true },
          { type: "toggle", id: "table.bandedColumns", label: "Banded Columns", showLabel: true },
        ],
      },
      { label: "Table Styles", controls: [{ type: "gallery", id: "table.style", label: "Table Styles", options: TABLE_STYLES.map((s) => ({ value: s, label: s.replace("Table Style ", ""), color: TABLE_STYLE_COLORS[s] })), width: 300 }] },
    ],
  },
  {
    id: "chartDesign",
    label: "Chart Design",
    contextual: "chart",
    groups: [
      { label: "Chart Layouts", controls: [{ type: "dropdown", id: "chart.addElement", label: "Add Chart Element", icon: "chart", size: "large", options: ["Axes", "Axis Titles", "Chart Title: Above Chart", "Chart Title: None", "Data Labels", "Data Labels: None", "Data Table", "Gridlines", "Legend: Right", "Legend: Bottom", "Legend: None"].map((v) => ({ value: v })) }, { type: "dropdown", id: "chart.layout", label: "Quick Layout", icon: "layout", size: "large", options: ["Layout 1", "Layout 2", "Layout 3", "Layout 5", "Layout 9"].map((v) => ({ value: v })) }] },
      { label: "Chart Styles", controls: [{ type: "dropdown", id: "chart.colors", label: "Change Colors", icon: "colors", size: "large", options: ["Colorful Palette 1", "Colorful Palette 2", "Monochromatic Palette 1", "Monochromatic Palette 6"].map((v) => ({ value: v })) }, { type: "gallery", id: "chart.style", label: "Chart Styles", options: ["Style 1", "Style 2", "Style 3", "Style 4", "Style 5", "Style 6", "Style 7", "Style 8"].map((v) => ({ value: v, label: v })), width: 260 }] },
      { label: "Data", controls: [{ type: "button", id: "chart.switchRowCol", label: "Switch Row/Column", icon: "orientation", size: "large" }, { type: "button", id: "chart.selectData", label: "Select Data", icon: "sheet", size: "large" }] },
      { label: "Type", controls: [{ type: "dropdown", id: "chart.type", label: "Change Chart Type", icon: "chart", size: "large", options: [...ALL_CHART_TYPES.map((v) => ({ value: v })), { value: "Templates", heading: true }, { value: "Change Chart Type...", dialog: "changeChartType" }] }] },
      { label: "Location", controls: [{ type: "button", id: "chart.move", label: "Move Chart", icon: "export", size: "large", dialog: "moveChart" }] },
    ],
  },
  {
    id: "pivotAnalyze",
    label: "PivotTable Analyze",
    contextual: "pivot",
    groups: [
      { label: "Active Field", controls: [{ type: "button", id: "pivot.fieldSettings", label: "Field Settings", icon: "options", size: "large", dialog: "valueFieldSettings" }, { type: "dropdown", id: "pivot.summarize", label: "Summarize Values By", icon: "sum", size: "large", options: [...["Sum", "Count", "Average", "Max", "Min"].map((v) => ({ value: v })), { value: "More Options...", dialog: "valueFieldSettings" }] }] },
      { label: "Group", controls: [{ type: "button", id: "pivot.groupField", label: "Group Field", icon: "group", showLabel: true, dialog: "pivotGroup" }, { type: "button", id: "pivot.ungroup", label: "Ungroup", icon: "group", showLabel: true }] },
      { label: "Filter", controls: [{ type: "button", id: "pivot.insertSlicer", label: "Insert Slicer", icon: "filter", size: "large", dialog: "insertSlicer" }, { type: "button", id: "insert.timeline", label: "Insert Timeline", icon: "date", showLabel: true }] },
      { label: "Data", controls: [{ type: "button", id: "data.refresh", label: "Refresh", icon: "reset", size: "large" }, { type: "button", id: "pivot.changeSource", label: "Change Data Source", icon: "sheet", size: "large", dialog: "changeSource" }] },
      { label: "Actions", controls: [{ type: "button", id: "pivot.clear", label: "Clear", icon: "clear", size: "large" }] },
      { label: "Tools", controls: [{ type: "button", id: "insert.pivotChart", label: "PivotChart", icon: "chart", size: "large", dialog: "insertChart" }] },
    ],
  },
  {
    id: "pivotDesign",
    label: "Design",
    contextual: "pivot",
    groups: [
      { label: "PivotTable Styles", controls: [{ type: "gallery", id: "pivot.style", label: "PivotTable Styles", options: ["Pivot Style Light 16", "Pivot Style Medium 2", "Pivot Style Medium 9", "Pivot Style Dark 2"].map((v) => ({ value: v, label: v.replace("Pivot Style ", "") })), width: 280 }] },
    ],
  },
];

/** Graphics Format: appears when an icon or picture is selected. */
excelRibbon.push({
  id: "graphicsFormat",
  label: "Graphics Format",
  contextual: "graphics",
  groups: [
    { label: "Graphics Styles", controls: [{ type: "dropdown", id: "graphics.fill", label: "Graphics Fill", icon: "fill", showLabel: true, gallery: "swatches", options: colorOpts() }] },
    { label: "Accessibility", controls: [{ type: "button", id: "graphics.altText", label: "Alt Text", icon: "accessibility", size: "large", dialog: "altText" }] },
  ],
});

/** Sparkline: appears when the active cell holds a sparkline; settings apply to its group. */
excelRibbon.push({
  id: "sparklineTab",
  label: "Sparkline",
  contextual: "sparkline",
  groups: [
    {
      label: "Type",
      controls: [
        { type: "toggle", id: "sparkline.typeLine", label: "Line", icon: "line", size: "large", stateKey: "sparkline.typeLine" },
        { type: "toggle", id: "sparkline.typeColumn", label: "Column", icon: "chart", size: "large", stateKey: "sparkline.typeColumn" },
        { type: "toggle", id: "sparkline.typeWinLoss", label: "Win/Loss", icon: "chart", size: "large", stateKey: "sparkline.typeWinLoss" },
      ],
    },
    {
      label: "Show",
      controls: [
        { type: "toggle", id: "sparkline.high", label: "High Point", showLabel: true },
        { type: "toggle", id: "sparkline.low", label: "Low Point", showLabel: true },
        { type: "toggle", id: "sparkline.negative", label: "Negative Points", showLabel: true },
        { type: "toggle", id: "sparkline.first", label: "First Point", showLabel: true },
        { type: "toggle", id: "sparkline.last", label: "Last Point", showLabel: true },
        { type: "toggle", id: "sparkline.markers", label: "Markers", showLabel: true },
      ],
    },
    {
      label: "Style",
      controls: [{ type: "dropdown", id: "sparkline.color", label: "Sparkline Color", icon: "fill", showLabel: true, gallery: "swatches", options: Object.entries(SPARKLINE_COLORS).map(([n, c]) => ({ value: n, label: n, color: c })) }],
    },
    {
      label: "Group",
      controls: [
        { type: "button", id: "sparkline.group", label: "Group", icon: "group", showLabel: true },
        { type: "button", id: "sparkline.ungroup", label: "Ungroup", icon: "group", showLabel: true },
        { type: "dropdown", id: "sparkline.clear", label: "Clear", icon: "clear", showLabel: true, options: [{ value: "Clear Selected Sparklines" }, { value: "Clear Selected Sparkline Groups" }] },
      ],
    },
  ],
});

/** Header & Footer: appears while the header or footer is being edited (Insert › Header & Footer). */
const HF_PRESETS = [
  { value: "(none)", label: "(none)" },
  { value: "Page &[Page]", label: "Page 1" },
  { value: "Page &[Page] of &[Pages]", label: "Page 1 of ?" },
  { value: "&[Tab]", label: "Sheet name" },
  { value: "&[File]", label: "File name" },
  { value: "Confidential, &[Date], Page &[Page]", label: "Confidential, 10/20/2026, Page 1" },
  { value: "Prepared by BEOC Student &[Date], Page &[Page]", label: "Prepared by BEOC Student 10/20/2026, Page 1" },
];
excelRibbon.push({
  id: "headerFooterTab",
  label: "Header & Footer",
  contextual: "headerFooter",
  groups: [
    {
      label: "Header & Footer",
      controls: [
        { type: "dropdown", id: "hf.header", label: "Header", icon: "header", size: "large", options: HF_PRESETS },
        { type: "dropdown", id: "hf.footer", label: "Footer", icon: "footer", size: "large", options: HF_PRESETS },
      ],
    },
    {
      label: "Header & Footer Elements",
      controls: [
        { type: "button", id: "hf.pageNumber", label: "Page Number", icon: "pageNumber", size: "large" },
        { type: "button", id: "hf.numberOfPages", label: "Number of Pages", icon: "multiplePages", size: "large" },
        { type: "button", id: "hf.currentDate", label: "Current Date", icon: "date", size: "large" },
        { type: "button", id: "hf.currentTime", label: "Current Time", icon: "date", size: "large" },
        { type: "button", id: "hf.filePath", label: "File Path", icon: "folder", size: "large" },
        { type: "button", id: "hf.fileName", label: "File Name", icon: "new", size: "large" },
        { type: "button", id: "hf.sheetName", label: "Sheet Name", icon: "sheet", size: "large" },
      ],
    },
    {
      label: "Navigation",
      controls: [
        { type: "button", id: "hf.gotoHeader", label: "Go to Header", icon: "header", size: "large" },
        { type: "button", id: "hf.gotoFooter", label: "Go to Footer", icon: "footer", size: "large" },
      ],
    },
  ],
});

/** The three Sparkline type buttons commit sparkline.type with their type. */
export const SPARKLINE_TYPE_ALIASES: Record<string, string> = {
  "sparkline.typeLine": "Line",
  "sparkline.typeColumn": "Column",
  "sparkline.typeWinLoss": "Win/Loss",
};

export const EXCEL_VIEW_ALIASES: Record<string, string> = {
  "view.mode.normal": "Normal",
  "view.mode.pageBreak": "Page Break Preview",
  "view.mode.pageLayout": "Page Layout",
};

/**
 * The Ribbon as Excel shows it for the active sheet: the first Freeze Panes item toggles between
 * Freeze Panes and Unfreeze Panes; with the active cell in a PivotTable, Insert › PivotChart charts
 * that PivotTable.
 */
export function excelRibbonFor(doc: ExcelBook, ui: SimUi): RibbonTab[] {
  const sheet = sheetOf(doc, ui);
  const frozen = Boolean(sheet.freeze);
  const inPivot = Boolean(sheet.pivot && pivotCellAt(doc, sheet, activeCell(ui)));
  const swap = (c: RibbonControl, tab: string): RibbonControl => {
    if (c.type === "dropdown" && c.id === "view.freeze") return { ...c, options: [frozen ? "Unfreeze Panes" : "Freeze Panes", "Freeze Top Row", "Freeze First Column"].map((v) => ({ value: v, icon: "freeze" })) };
    if (inPivot && tab === "insert" && c.type === "button" && c.id === "insert.pivotChart") return { ...c, dialog: "insertChart" };
    return c;
  };
  return excelRibbon.map((t) => ({
    ...t,
    groups: t.groups.map((g) => ({ ...g, controls: g.controls.map((c) => swap(c, t.id)), ...(g.rows ? { rows: g.rows.map((row) => row.map((c) => swap(c, t.id))) } : {}) })),
  }));
}
