import type { SimCommit } from "@/types/sim";
import type { AppCore } from "../../types";
import type { AccessDoc } from "./types";
import { accessRibbon } from "./ribbon";
import { accessDialogs } from "./dialogs";
import {
  activeTab,
  accessContextual,
  accessDescribe,
  accessDialogDef,
  accessDialogDefaults,
  accessRibbonState,
  accessSelectionExists,
  applyAccess,
} from "./model";

/** Commands that only open, view or navigate: never counted as a miss. */
export const ACCESS_FREE = [
  "nav.open", "nav.view", "nav.collapse", "nav.menu", "pane.toggle", "pane.close",
  "tab.activate", "tab.close", "tab.closeAll", "tab.closeSave", "tab.closeDiscard",
  "view.switch", "record.nav", "record.undoNew",
  "design.propertySheet", "form.fieldList", "query.addTables", "relationships.showTable", "report.groupSort", "macro.actionCatalog",
  "dbtools.relationships", "table.relationships", "relationships.addTable", "relationships.hideTable", "relationships.clearLayout", "relationships.all", "relationships.direct", "relationships.close", "relationships.report",
  "query.run", "query.parameter", "query.result", "query.count", "sql.edit",
  "macro.run", "macro.singleStep", "macro.expand", "macro.collapse", "macro.expandAll", "macro.collapseAll", "macro.convert", "macro.showAll",
  "vba.open", "vba.close", "vba.edit", "vba.run", "vba.module", "vba.immediate", "vba.immediateToggle", "vba.eventStub", "dbtools.vba", "create.vba", "form.viewCode",
  "form.click", "form.title", "form.tool", "form.wizards", "form.logo",
  "file.save", "file.open", "file.close", "file.browse",
  "home.find", "home.replace", "home.findNext", "home.refresh", "home.totals", "home.newRecord", "home.filterMenu", "home.select", "home.spelling", "home.formatPainter",
  "home.delete", "home.deleteRecord", "fields.delete", "design.deleteRows", "design.insertRows", "object.deleteRequest", "relationships.deleteRequest",
  "object.copy", "home.copy", "home.cut", "home.paste", "object.paste",
  "prompt.close", "prompt.no", "prompt.cancel",
  "preview.zoom", "preview.onePage", "preview.twoPages", "preview.morePages", "preview.page", "preview.close",
  "help.help", "help.support", "help.feedback", "help.training",
  "view.zoom", "view.ribbonCollapse", "qat.autosave",
  "external.savedImports", "external.linkedTables", "external.newSource", "external.email", "external.exportAccess", "external.wordMerge", "external.moreExport",
  "dbtools.dependencies", "dbtools.performance", "dbtools.addins", "dbtools.split", "dbtools.sharepoint",
  "create.appParts", "create.sharepoint", "create.navigation", "create.labels", "create.classModule",
  "design.builder", "design.testRules", "design.indexes", "design.dataMacros", "design.renameMacro",
  "table.events", "table.beforeDelete", "table.afterInsert", "table.afterUpdate", "table.afterDelete", "table.namedMacro",
  "query.insertRows", "query.deleteRows", "query.builder", "query.tableNames",
  "arrange.gridlines", "arrange.removeLayout", "arrange.insertAbove", "arrange.insertBelow", "arrange.insertLeft", "arrange.insertRight", "arrange.selectLayout", "arrange.selectColumn", "arrange.selectRow", "arrange.merge", "arrange.splitVertically", "arrange.splitHorizontally", "arrange.margins", "arrange.padding", "arrange.anchoring",
  "format.object", "format.selectAll", "format.backgroundImage", "format.quickStyles", "format.changeShape", "format.conditional", "format.outline", "format.effects",
  "theme.colors", "theme.fonts", "pageSetup.showMargins", "pageSetup.dataOnly", "pageSetup.columns",
];

/** Commands the window, status bar, panes and message boxes emit that aren't on the Ribbon. */
export const ACCESS_CANVAS = [
  "nav.open", "nav.view", "nav.collapse", "nav.menu", "tab.activate", "tab.close", "tab.closeAll", "tab.closeSave", "tab.closeDiscard", "view.switch",
  "record.nav", "record.delete", "record.undoNew", "prompt.close", "prompt.no", "prompt.cancel",
  "query.parameter", "query.execute", "query.result", "query.count", "sql.edit", "query.run",
  "object.delete", "object.copy", "object.paste", "object.deleteRequest", "relationships.delete", "relationships.deleteRequest", "relationships.addTable",
  "design.deleteField", "field.dataType", "query.addTable", "query.removeTable", "query.addField", "query.join", "query.deleteJoin", "query.type",
  "form.addField", "form.changeTo", "form.deleteControl", "form.placeControl", "form.click", "form.tool",
  "report.addGroup", "report.addSort", "report.deleteGroup", "report.groupOption",
  "macro.addAction", "macro.deleteAction", "macro.moveUp", "macro.moveDown", "macro.run",
  "datasheet.filter", "datasheet.total", "fields.add",
  "vba.open", "vba.close", "vba.edit", "vba.run", "vba.module", "vba.immediate", "vba.immediateToggle", "vba.eventStub",
  "external.runSavedExport", "external.deleteSavedExport", "home.findNext", "home.replaceAll", "preview.page",
  "file.protect", "file.new", "file.open", "file.close", "file.options", "pane.toggle", "home.view",
];

function normalize(c: SimCommit): SimCommit {
  if (c.kind === "command") {
    if (c.id === "home.view") return { kind: "command", id: "view.switch", value: c.value };
    if (c.id.startsWith("fields.add.")) return { kind: "command", id: "fields.add", value: c.id.slice("fields.add.".length) };
    if (c.id.startsWith("query.type.")) return { kind: "command", id: "query.type", value: c.id.slice("query.type.".length) };
    if (c.id.startsWith("form.tool.")) return { kind: "command", id: "form.tool", value: c.id.slice("form.tool.".length) };
    if (c.id === "fields.dataType") return { kind: "command", id: "field.dataType", value: c.value };
    if (c.id === "fields.fieldSize") return { kind: "type", target: "prop:Field Size", value: String(c.value ?? "") };
    if (c.id === "fields.format" || c.id === "format.number") return { kind: "type", target: "prop:Format", value: String(c.value ?? "") };
    if (c.id === "home.delete" && c.value === "Delete") return { kind: "command", id: "home.delete" };
    if (c.id === "home.paste" && (c.value === "Paste" || c.value === "Paste Append")) return { kind: "command", id: "home.paste" };
  }
  if (c.kind === "dialog") {
    const v = c.values;
    if (c.id === "validationRule") return { kind: "type", target: "prop:Validation Rule", value: String(v.rule ?? "") };
    if (c.id === "validationText") return { kind: "type", target: "prop:Validation Text", value: String(v.text ?? "") };
    if (c.id === "defaultValue") return { kind: "type", target: "prop:Default Value", value: String(v.expr ?? "") };
    if (c.id === "recordValidationRule") return { kind: "type", target: "tprop:Validation Rule", value: String(v.rule ?? "") };
    if (c.id === "recordValidationText") return { kind: "type", target: "tprop:Validation Text", value: String(v.text ?? "") };
    if (c.id === "tableProperties") return { kind: "type", target: "tprop:Description", value: String(v.description ?? "") };
  }
  return c;
}

export const accessCore: AppCore<AccessDoc> = {
  name: "Access",
  accent: "#a4373a",
  autosave: false,
  windowTitle: (doc, fileName) => {
    const db = fileName.replace(/\.accdb$/i, "");
    if (doc.vbe?.open) return `Microsoft Visual Basic for Applications - ${db}${doc.vbe.module ? ` - [${doc.vbe.module} (Code)]` : ""}`;
    if (doc.noDb) return "Access";
    return `Access - ${db} : Database- ${doc.saved?.location ?? "C:\\Users\\Student\\Documents"}\\${db}.accdb (Access 2007 - 365) file format`;
  },
  ribbon: accessRibbon,
  dialogs: accessDialogs,
  backstage: {
    templates: [{ name: "Blank database" }, { name: "Contacts", color: "#a4373a" }, { name: "Asset tracking", color: "#2b579a" }, { name: "Students", color: "#217346" }, { name: "Event management", color: "#b7472a" }],
    recent: [],
    formats: ["Access Database (*.accdb)", "Access 2002-2003 Database (*.mdb)", "Access 2000 Database (*.mdb)", "Template (*.accdt)"],
    ext: ".accdb",
  },
  shortcuts: {
    F11: { command: "pane.toggle" },
    "Ctrl+S": { command: "file.save" },
    F12: { dialog: "saveObject" },
    "Ctrl+F": { command: "home.find" },
    "Ctrl+H": { command: "home.replace" },
    "Ctrl+Shift++": { command: "home.newRecord" },
    "Ctrl++": { command: "home.newRecord" },
    "Ctrl+-": { command: "home.deleteRecord" },
    "Ctrl+C": { command: "home.copy" },
    "Ctrl+X": { command: "home.cut" },
    "Ctrl+V": { command: "home.paste" },
    "Ctrl+B": { command: "home.bold" },
    "Ctrl+I": { command: "home.italic" },
    "Ctrl+U": { command: "home.underline" },
    "Ctrl+Z": { command: "qat.undo" },
    "Ctrl+Y": { command: "qat.redo" },
    "Ctrl+W": { command: "tab.close" },
    "Ctrl+F4": { command: "tab.close" },
    "Ctrl+F1": { command: "view.ribbonCollapse" },
    "Alt+F11": { command: "vba.open" },
    "Ctrl+G": { command: "vba.open" },
    F4: { command: "design.propertySheet" },
    "Alt+Enter": { command: "design.propertySheet" },
    "Alt+F8": { command: "form.fieldList" },
    F1: { command: "help.help" },
    "Ctrl+P": { backstage: "print" },
    "Ctrl+O": { backstage: "open" },
    "Ctrl+N": { backstage: "new" },
  },
  canvasCommands: ACCESS_CANVAS,
  freeCommands: ACCESS_FREE,
  initialUi: (doc) => {
    const t = activeTab(doc);
    if (t?.kind === "table" && t.view === "Datasheet View") {
      const tb = doc.tables.find((x) => x.name === t.name);
      const f = tb?.fields[0];
      const r = tb?.rows[0];
      if (tb && f && r) return { selection: `cell:${tb.name}.${r._id}.${f.name}` };
    }
    return { selection: "" };
  },
  normalize,
  apply: applyAccess,
  ribbonState: accessRibbonState,
  contextualTabs: (doc) => accessContextual(doc),
  dialogDef: (doc, ui, id) => accessDialogDef(doc, ui, id, accessDialogs[id]),
  dialogDefaults: accessDialogDefaults,
  describeSelection: accessDescribe,
  selectionExists: accessSelectionExists,
  fullScreen: (doc) => Boolean(doc.noDb || doc.vbe?.open),
};
