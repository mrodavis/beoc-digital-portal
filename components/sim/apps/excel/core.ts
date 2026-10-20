import type { DialogDef, ExcelBook, SimCommit } from "@/types/sim";
import type { AppCore } from "../../types";
import { applyExcel, cfDescribe, excelContextual, excelDialogDefaults, excelRibbonState, pivotFieldNames, regionHeaders, sheetOf } from "./model";
import { excelRibbon, EXCEL_VIEW_ALIASES } from "./ribbon";
import { excelDialogs } from "./dialogs";

function normalize(c: SimCommit): SimCommit {
  if (c.kind === "command" && EXCEL_VIEW_ALIASES[c.id]) return { kind: "command", id: "view.mode", value: EXCEL_VIEW_ALIASES[c.id] };
  if (c.kind === "command" && c.id === "home.paste" && c.value === undefined) return { kind: "command", id: "home.paste" };
  if (c.kind === "command" && (c.id === "home.insert" || c.id === "home.delete") && (c.value === "Insert Cells" || c.value === "Delete Cells")) return { kind: "command", id: c.id, value: c.value === "Insert Cells" ? "Insert Sheet Rows" : "Delete Sheet Rows" };
  if (c.kind === "command" && c.id === "home.fill.drag") return { kind: "command", id: "excel.fill", value: c.value };
  return c;
}

export const excelCore: AppCore<ExcelBook> = {
  name: "Excel",
  accent: "#217346",
  ribbon: excelRibbon,
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
    "Shift+F11": { command: "sheet.add" },
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
  ],
  freeCommands: ["pane.close", "view.zoom", "view.zoomTo", "view.zoomSelection", "help.help", "file.browse", "file.options", "formulas.tracePrecedents", "formulas.traceDependents", "formulas.removeArrows", "excel.editAnyway"],
  initialUi: (doc) => ({ selection: "A1", sheet: doc.active ?? doc.sheets[0]?.name }),
  normalize,
  apply: applyExcel,
  ribbonState: excelRibbonState,
  contextualTabs: excelContextual,
  dialogDefaults: excelDialogDefaults,
  dialogDef: (doc, ui, id): DialogDef | undefined => {
    // Dialogs whose lists come from the data: column headers, rules, PivotTable fields.
    const withOptions = (base: DialogDef, opts: Record<string, string[]>): DialogDef => ({
      ...base,
      fields: (base.fields ?? []).map((f) => ("key" in f && opts[f.key] && (f.type === "select" || f.type === "list") ? { ...f, options: opts[f.key] } : f)),
    });
    if (id === "sort" || id === "subtotal") {
      const heads = regionHeaders(doc, ui);
      const h = heads.length ? heads : ["Column A"];
      return id === "sort" ? withOptions(excelDialogs.sort, { sortBy: h, thenBy: ["(none)", ...h] }) : withOptions(excelDialogs.subtotal, { atEachChange: h, addTo: h });
    }
    if (id === "cfManage") return withOptions(excelDialogs.cfManage, { rule: (sheetOf(doc, ui).cf ?? []).map(cfDescribe) });
    if (id === "insertSlicer") return withOptions(excelDialogs.insertSlicer, { field: pivotFieldNames(doc, ui) });
    return undefined;
  },
  describeSelection: (_doc, ui) => ui.selection,
};
