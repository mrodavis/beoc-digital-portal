import type { DialogDef, ExcelBook, SimCommit } from "@/types/sim";
import type { AppCore } from "../../types";
import { withPivotCaches } from "@/lib/sim/excel";
import { applyExcel, autoFitPivots, cfDescribe, chartTemplates, excelContextual, excelDialogDefaults, excelRibbonState, pivotFieldNames, regionHeaders, sheetOf, withTotalRows } from "./model";
import { excelRibbon, excelRibbonFor, EXCEL_VIEW_ALIASES, SPARKLINE_TYPE_ALIASES } from "./ribbon";
import { excelDialogs } from "./dialogs";

/*
 * Excel command and dialog ids added for the newer features (all others are in ribbon.ts):
 *
 * - home.fillSeries "Down" | "Right" | "Up" | "Left" (Ctrl+D, Ctrl+R): copy, never a series.
 *   Home › Fill › Series... opens dialog "series" (seriesIn, type Linear | Growth | Date | AutoFill,
 *   dateUnit, step, stop). "Flash Fill" and data.flashFill (Ctrl+E) learn the pattern from the
 *   examples in the active column (see flashFill.ts).
 * - table.totalFn: the Total Row cell drop-down (None, Average, Count, Count Numbers, Max, Min, Sum,
 *   StdDev, Var); writes =SUBTOTAL(101..110,Table[Column]) into the active total cell.
 * - Sparkline tab: sparkline.type (Line, Column, Win/Loss), sparkline.high | low | negative | first |
 *   last | markers (toggles), sparkline.color, sparkline.group, sparkline.ungroup, sparkline.clear.
 * - PivotTables: dialog "pivotGroup" (days, months, quarters, years), pivot.ungroup, dialog
 *   "changeSource" (range), pivot.sort ("Largest to Smallest", "Smallest to Largest", "A to Z", "Z to A"),
 *   Value Field Settings has customName, numberFormat, decimals, custom. data.refresh re-reads the
 *   source (until then a PivotTable shows its cached snapshot). createPivot's range may be a table name;
 *   "Existing Worksheet" takes a location on any sheet ("Dashboard!$A$3").
 * - Data Validation: dialog fields data (operator), value, ignoreBlank, inputTitle, showError,
 *   errorStyle, errorTitle, errorMessage; data.circleInvalid, data.clearCircles.
 * - Review › Allow Edit Ranges: dialog "allowEditRanges" (title, refersTo, password).
 * - data.sort opens the canvas's Sort dialog, which commits dialog "sort" (sortBy/order/customList,
 *   thenBy/thenOrder/thenCustomList, then2By/then2Order/then2CustomList, headers).
 * - Charts: chart.selectData opens Select Data Source (canvas), which commits dialog "selectData"
 *   (range, names, count, categories, switched, edited, series as JSON). "chart:c1.s2" selects one
 *   series (click a column, then click it again); Data Labels then go on that series only.
 *   Dialog "saveChartTemplate" (name; right-click a chart), "changeChartType" (type, template) and
 *   insertChart's Templates tab (template).
 * - Header & Footer tab: hf.header, hf.footer (presets), hf.pageNumber, hf.numberOfPages,
 *   hf.currentDate, hf.currentTime, hf.filePath, hf.fileName, hf.sheetName, hf.gotoHeader, hf.gotoFooter.
 * - Double-clicking a column header's right border commits home.format "AutoFit Column Width" with
 *   that column selected (a row header's bottom border: "AutoFit Row Height").
 * - Shift+F11 is home.insert "Insert Sheet": a new sheet before the active one.
 */

function normalize(c: SimCommit): SimCommit {
  if (c.kind === "command" && EXCEL_VIEW_ALIASES[c.id]) return { kind: "command", id: "view.mode", value: EXCEL_VIEW_ALIASES[c.id] };
  if (c.kind === "command" && SPARKLINE_TYPE_ALIASES[c.id]) return { kind: "command", id: "sparkline.type", value: SPARKLINE_TYPE_ALIASES[c.id] };
  if (c.kind === "command" && c.id === "home.paste" && c.value === undefined) return { kind: "command", id: "home.paste" };
  if (c.kind === "command" && (c.id === "home.insert" || c.id === "home.delete") && (c.value === "Insert Cells" || c.value === "Delete Cells")) return { kind: "command", id: c.id, value: c.value === "Insert Cells" ? "Insert Sheet Rows" : "Delete Sheet Rows" };
  if (c.kind === "command" && c.id === "home.fill.drag") return { kind: "command", id: "excel.fill", value: c.value };
  return c;
}

export const excelCore: AppCore<ExcelBook> = {
  name: "Excel",
  accent: "#217346",
  ribbon: excelRibbon,
  ribbonFor: excelRibbonFor,
  dialogs: excelDialogs,
  backstage: {
    templates: [
      { name: "Blank workbook" },
      { name: "Simple budget", color: "#217346" },
      { name: "Time sheet", color: "#4472C4" },
      { name: "Inventory list", color: "#ED7D31" },
      { name: "Appointment tracker", color: "#70AD47" },
    ],
    recent: [
      { name: "Clinic Supply Budget.xlsx", location: "OneDrive › Documents › Lakeside", when: "Yesterday" },
      { name: "Patient Visits Q3.xlsx", location: "This PC › Documents", when: "Mon" },
      { name: "Staff Hours.xlsx", location: "OneDrive › Documents", when: "Oct 12" },
    ],
    formats: ["Excel Workbook (*.xlsx)", "Excel Macro-Enabled Workbook (*.xlsm)", "Excel 97-2003 Workbook (*.xls)", "CSV (Comma delimited) (*.csv)", "PDF (*.pdf)", "Excel Template (*.xltx)"],
    ext: ".xlsx",
  },
  shortcuts: {
    "Ctrl+B": { command: "home.bold" },
    "Ctrl+I": { command: "home.italic" },
    "Ctrl+U": { command: "home.underline" },
    "Ctrl+X": { command: "home.cut" },
    "Ctrl+C": { command: "home.copy" },
    "Ctrl+V": { command: "home.paste" },
    "Ctrl+Z": { command: "qat.undo" },
    "Ctrl+Y": { command: "qat.redo" },
    "Ctrl+D": { command: "home.fillSeries", value: "Down" },
    "Ctrl+R": { command: "home.fillSeries", value: "Right" },
    "Ctrl+E": { command: "data.flashFill" },
    "Ctrl+T": { dialog: "createTable" },
    "Ctrl+L": { dialog: "createTable" },
    "Ctrl+1": { dialog: "formatCells" },
    "Ctrl+K": { dialog: "link" },
    "Ctrl+F": { dialog: "find" },
    "Ctrl+H": { dialog: "replace" },
    "Ctrl+G": { dialog: "goTo" },
    F5: { dialog: "goTo" },
    "Ctrl+`": { command: "formulas.showFormulas" },
    "Ctrl+Shift+~": { command: "home.numberFormat", value: "General" },
    "Ctrl+Shift+$": { command: "home.numberFormat", value: "Currency" },
    "Ctrl+Shift+%": { command: "home.percent" },
    "Ctrl+Shift+#": { command: "home.numberFormat", value: "Short Date" },
    "Ctrl+Shift+L": { command: "data.filter" },
    "Alt+=": { command: "home.autosum", value: "Sum" },
    "Shift+F3": { dialog: "insertFunction" },
    "Shift+F2": { dialog: "newNote" },
    "Ctrl+Shift+F2": { dialog: "newComment" },
    // Shift+F11 inserts a new worksheet in front of the active one (the + button adds one after it).
    "Shift+F11": { command: "home.insert", value: "Insert Sheet" },
    "Ctrl+F1": { command: "view.ribbonCollapse" },
    F7: { command: "review.spelling" },
    F1: { command: "help.help" },
    F12: { backstage: "saveAs" },
    "Ctrl+S": { command: "file.save" },
    "Ctrl+P": { backstage: "print" },
    "Ctrl+O": { backstage: "open" },
    "Ctrl+N": { command: "file.new", value: "Blank workbook" },
  },
  canvasCommands: [
    "excel.fill", "edit.clearContents", "filter.by", "filter.sort", "sheet.add", "sheet.delete", "sheet.tabColor", "sheet.move",
    "sheet.duplicate", "sheet.hide", "pivot.field", "pivot.area", "home.formatPainter.apply", "spelling.change", "spelling.ignore",
    "view.mode", "view.zoom", "pane.close", "chart.delete", "outline.toggle", "qat.undo", "qat.redo", "qat.autosave", "view.ribbonCollapse",
    // Right-click Insert Cut Cells, the outline level buttons, PivotTable filter/slicer buttons and
    // right-click Show Values As, Excel Options, Analyze Data cards, the Marked as Final bar.
    "home.insertCut", "spelling.changeAll", "outline.level", "pivot.filter", "pivot.showAs", "options.r1c1", "analyze.insert", "excel.editAnyway",
    // The Total Row drop-down and the PivotTable right-click Sort menu.
    "table.totalFn", "pivot.sort",
    // Unprotect Sheet replaces Protect Sheet on a protected sheet (Review tab, Home › Format, sheet tab menu).
    "review.unprotectSheet",
  ],
  // Viewing commands, and commands that only open a place to work (a dialog the canvas draws, the
  // header in Page Layout view) are never a miss: the step they lead to is judged instead.
  freeCommands: [
    "pane.close", "view.zoom", "view.zoomTo", "view.zoomSelection", "help.help", "file.browse", "file.options", "formulas.tracePrecedents", "formulas.traceDependents",
    "formulas.removeArrows", "excel.editAnyway", "formulas.function",
    "insert.headerFooter", "view.mode", "hf.gotoHeader", "hf.gotoFooter", "data.sort", "chart.selectData",
  ],
  // Dialogs the canvas draws itself (Sort, Select Data Source) or opens from its own menus.
  canvasDialogs: ["sort", "selectData", "saveChartTemplate", "pivotGroup", "changeChartType"],
  initialUi: (doc) => ({ selection: "A1", sheet: doc.active ?? doc.sheets[0]?.name }),
  normalize,
  // PivotTables keep a snapshot of their source from before each command, so an edit to the source
  // shows only after Refresh; tables whose Total Row is on get its cells. A PivotTable that changed
  // has its columns fitted (Excel's "Autofit column widths on update").
  apply: (doc, c, ui) => {
    const base = withTotalRows(withPivotCaches(doc));
    const r = applyExcel(base, c, ui);
    return { ...r, doc: autoFitPivots(base, withPivotCaches(r.doc)) };
  },
  ribbonState: excelRibbonState,
  contextualTabs: excelContextual,
  dialogDefaults: excelDialogDefaults,
  dialogDef: (doc, ui, id): DialogDef | undefined => {
    // Dialogs whose lists come from the data: column headers, rules, PivotTable fields, chart templates.
    const withOptions = (base: DialogDef, opts: Record<string, string[]>): DialogDef => ({
      ...base,
      fields: (base.fields ?? []).map((f) => ("key" in f && opts[f.key] && (f.type === "select" || f.type === "list") ? { ...f, options: opts[f.key] } : f)),
      tabs: base.tabs?.map((t) => ({ ...t, fields: t.fields.map((f) => ("key" in f && opts[f.key] && (f.type === "select" || f.type === "list") ? { ...f, options: opts[f.key] } : f)) })),
    });
    if (id === "sort" || id === "subtotal") {
      const heads = regionHeaders(doc, ui);
      const h = heads.length ? heads : ["Column A"];
      return id === "sort" ? withOptions(excelDialogs.sort, { sortBy: h, thenBy: ["(none)", ...h], then2By: ["(none)", ...h] }) : withOptions(excelDialogs.subtotal, { atEachChange: h, addTo: h });
    }
    if (id === "cfManage") return withOptions(excelDialogs.cfManage, { rule: (sheetOf(doc, ui).cf ?? []).map(cfDescribe) });
    if (id === "insertSlicer") return withOptions(excelDialogs.insertSlicer, { field: pivotFieldNames(doc, ui) });
    if (id === "insertChart" || id === "changeChartType") return withOptions(excelDialogs[id], { template: chartTemplates(doc) });
    return undefined;
  },
  describeSelection: (_doc, ui) => ui.selection,
};
