import type { DialogDef } from "@/types/sim";

export const IMPORT_MODES = [
  "Import the source data into a new table in the current database.",
  "Append a copy of the records to the table:",
  "Link to the data source by creating a linked table.",
];
export const PK_OPTIONS = ["Let Access add primary key", "Choose my own primary key", "No primary key"];
export const LOOKUP_SOURCES = ["I want the lookup field to get the values from another table or query.", "I will type in the values that I want."];
export const QUERY_WIZARDS = ["Simple Query Wizard", "Crosstab Query Wizard", "Find Duplicates Query Wizard", "Find Unmatched Query Wizard"];
export const FORM_LAYOUTS = ["Columnar", "Tabular", "Datasheet", "Justified"];
export const REPORT_LAYOUTS = ["Stepped", "Block", "Outline", "Tabular", "Columnar", "Justified"];
export const FORM_OPEN = ["Open the form to view or enter information.", "Modify the form's design."];
export const REPORT_OPEN = ["Preview the report.", "Modify the report's design."];
export const QUERY_OPEN = ["Open the query to view information.", "Modify the query design."];
export const DATE_SAMPLES = ["Tuesday, October 20, 2026", "20-Oct-26", "10/20/2026"];
export const TIME_SAMPLES = ["9:30:00 AM", "9:30 AM", "09:30"];

/**
 * Dialogs drawn by the shared dialog renderer, plus the fields of the
 * dialogs and wizards the Access window draws itself (ids "backstage:…"),
 * which are listed here so the validator can check the values sims use.
 */
export const accessDialogs: Record<string, DialogDef> = {
  saveObject: { id: "saveObject", title: "Save As", width: 320, fields: [{ type: "text", key: "name", label: "Table Name:" }] },
  pasteTableAs: {
    id: "pasteTableAs",
    title: "Paste Table As",
    width: 360,
    fields: [
      { type: "text", key: "name", label: "Table Name:" },
      { type: "radio", key: "option", label: "Paste Options", options: ["Structure Only", "Structure and Data", "Append Data to Existing Table"], default: "Structure and Data" },
    ],
  },
  nameCaption: {
    id: "nameCaption",
    title: "Enter Field Properties",
    width: 380,
    fields: [
      { type: "text", key: "name", label: "Name" },
      { type: "text", key: "caption", label: "Caption" },
      { type: "text", key: "description", label: "Description" },
    ],
  },
  defaultValue: { id: "defaultValue", title: "Expression Builder", width: 460, fields: [{ type: "note", text: "Enter an Expression to define the default value: (Examples of expressions include [field1] + [field2] and [field1] < 5)" }, { type: "text", key: "expr", label: "Expression" }] },
  validationRule: { id: "validationRule", title: "Expression Builder", width: 460, fields: [{ type: "note", text: "Enter an Expression to validate the data in this field: (Examples of expressions include [field1] + [field2] and [field1] < 5)" }, { type: "text", key: "rule", label: "Expression" }] },
  validationText: { id: "validationText", title: "Enter Validation Message", width: 420, fields: [{ type: "text", key: "text", label: "Enter a validation message for this field:" }] },
  recordValidationRule: { id: "recordValidationRule", title: "Expression Builder", width: 460, fields: [{ type: "note", text: "Enter an Expression to validate the data in this record:" }, { type: "text", key: "rule", label: "Expression" }] },
  recordValidationText: { id: "recordValidationText", title: "Enter Validation Message", width: 420, fields: [{ type: "text", key: "text", label: "Enter a validation message for this record:" }] },
  tableProperties: { id: "tableProperties", title: "Enter Table Properties", width: 380, fields: [{ type: "text", key: "description", label: "Description" }] },
  fieldWidth: {
    id: "fieldWidth",
    title: "Column Width",
    width: 300,
    fields: [
      { type: "number", key: "width", label: "Column Width:", min: 0, max: 200, step: 0.5 },
      { type: "checkbox", key: "standard", label: "Standard Width" },
    ],
    okLabel: "OK",
  },
  rowHeight: {
    id: "rowHeight",
    title: "Row Height",
    width: 300,
    fields: [
      { type: "number", key: "height", label: "Row Height:", min: 5, max: 100, step: 0.5, default: 14.4 },
      { type: "checkbox", key: "standard", label: "Standard Height" },
    ],
  },
  unhideFields: { id: "unhideFields", title: "Unhide Columns", width: 260, fields: [{ type: "note", text: "Column" }] },
  datasheetFormatting: {
    id: "datasheetFormatting",
    title: "Datasheet Formatting",
    width: 420,
    fields: [
      { type: "radio", key: "cellEffect", label: "Cell Effect", options: ["Flat", "Raised", "Sunken"], default: "Flat" },
      { type: "checkbox", key: "horizontal", label: "Gridlines Shown: Horizontal", default: true },
      { type: "checkbox", key: "vertical", label: "Gridlines Shown: Vertical", default: true },
      { type: "select", key: "background", label: "Background Color:", options: ["Automatic", "White", "Light Gray", "Light Blue", "Light Green", "Light Yellow"] },
      { type: "select", key: "alternate", label: "Alternate Background Color:", options: ["No Color", "Light Gray", "Light Blue", "Light Green", "Light Yellow"] },
    ],
  },
  makeTable: {
    id: "makeTable",
    title: "Make Table",
    width: 420,
    fields: [
      { type: "note", text: "Make New Table" },
      { type: "text", key: "name", label: "Table Name:" },
      { type: "radio", key: "db", label: "", options: ["Current Database", "Another Database:"], default: "Current Database" },
    ],
  },
  appendTo: {
    id: "appendTo",
    title: "Append",
    width: 420,
    fields: [
      { type: "note", text: "Append To" },
      { type: "text", key: "name", label: "Table Name:" },
      { type: "radio", key: "db", label: "", options: ["Current Database", "Another Database:"], default: "Current Database" },
    ],
  },
  joinProperties: { id: "joinProperties", title: "Join Properties", width: 520, fields: [{ type: "radio", key: "join", label: "", options: ["1", "2", "3"] }] },
  queryParameters: {
    id: "queryParameters",
    title: "Query Parameters",
    width: 380,
    fields: [
      { type: "text", key: "param", label: "Parameter" },
      { type: "select", key: "dataType", label: "Data Type", options: ["Short Text", "Date With Time", "Currency", "Integer", "Long Integer", "Double", "Yes/No"] },
    ],
  },
  pageNumbers: {
    id: "pageNumbers",
    title: "Page Numbers",
    width: 340,
    fields: [
      { type: "radio", key: "format", label: "Format", options: ["Page N", "Page N of M"], default: "Page N" },
      { type: "radio", key: "position", label: "Position", options: ["Top of Page [Header]", "Bottom of Page [Footer]"], default: "Top of Page [Header]" },
      { type: "select", key: "align", label: "Alignment:", options: ["Center", "Left", "Right", "Inside", "Outside"] },
      { type: "checkbox", key: "first", label: "Show Number on First Page", default: true },
    ],
  },
  dateTime: {
    id: "dateTime",
    title: "Date and Time",
    width: 340,
    fields: [
      { type: "checkbox", key: "includeDate", label: "Include Date", default: true },
      { type: "radio", key: "dateFormat", label: "", options: DATE_SAMPLES, default: DATE_SAMPLES[0] },
      { type: "checkbox", key: "includeTime", label: "Include Time", default: true },
      { type: "radio", key: "timeFormat", label: "", options: TIME_SAMPLES, default: TIME_SAMPLES[0] },
    ],
  },
  pageSetup: {
    id: "pageSetup",
    title: "Page Setup",
    width: 380,
    tabs: [
      {
        label: "Print Options",
        fields: [
          { type: "number", key: "top", label: "Top:", default: 0.25, step: 0.05, suffix: "in" },
          { type: "number", key: "bottom", label: "Bottom:", default: 0.25, step: 0.05, suffix: "in" },
          { type: "number", key: "left", label: "Left:", default: 0.25, step: 0.05, suffix: "in" },
          { type: "number", key: "right", label: "Right:", default: 0.25, step: 0.05, suffix: "in" },
          { type: "checkbox", key: "dataOnly", label: "Print Data Only" },
        ],
      },
      {
        label: "Page",
        fields: [
          { type: "radio", key: "orientation", label: "Orientation", options: ["Portrait", "Landscape"], default: "Portrait" },
          { type: "select", key: "size", label: "Size:", options: ["Letter", "Legal", "Executive", "A4", "Tabloid"] },
        ],
      },
      { label: "Columns", fields: [{ type: "number", key: "columns", label: "Number of Columns:", default: 1, min: 1, max: 6 }] },
    ],
  },
  runMacro: { id: "runMacro", title: "Run Macro", width: 320, fields: [{ type: "select", key: "name", label: "Macro Name:", options: ["(none)"] }] },
  "file.print": {
    id: "file.print",
    title: "Print",
    width: 420,
    fields: [
      { type: "select", key: "printer", label: "Printer Name:", options: ["BEOC-Lab-Printer on 14BP", "Microsoft Print to PDF", "Front Desk HP LaserJet"] },
      { type: "radio", key: "range", label: "Print Range", options: ["All", "Pages", "Selected Record(s)"], default: "All" },
      { type: "number", key: "copies", label: "Number of Copies:", default: 1, min: 1, max: 99 },
    ],
  },

  /* ---- validation-only definitions for dialogs the Access window draws ---- */
  "backstage:editRelationship": {
    id: "backstage:editRelationship",
    title: "Edit Relationships",
    fields: [
      { type: "text", key: "table", label: "Table/Query" },
      { type: "text", key: "field", label: "Field" },
      { type: "text", key: "relatedTable", label: "Related Table/Query" },
      { type: "text", key: "relatedField", label: "Related Field" },
      { type: "checkbox", key: "enforce", label: "Enforce Referential Integrity" },
      { type: "checkbox", key: "cascadeUpdate", label: "Cascade Update Related Fields" },
      { type: "checkbox", key: "cascadeDelete", label: "Cascade Delete Related Records" },
      { type: "select", key: "join", label: "Join Type", options: ["1", "2", "3"] },
    ],
  },
  "backstage:formWizard": {
    id: "backstage:formWizard",
    title: "Form Wizard",
    fields: [
      { type: "text", key: "source", label: "Tables/Queries" },
      { type: "text", key: "fields", label: "Selected Fields" },
      { type: "select", key: "layout", label: "Layout", options: FORM_LAYOUTS },
      { type: "text", key: "title", label: "Title" },
      { type: "select", key: "open", label: "Open", options: FORM_OPEN },
    ],
  },
  "backstage:reportWizard": {
    id: "backstage:reportWizard",
    title: "Report Wizard",
    fields: [
      { type: "text", key: "source", label: "Tables/Queries" },
      { type: "text", key: "fields", label: "Selected Fields" },
      { type: "text", key: "groups", label: "Grouping Levels" },
      { type: "text", key: "sorts", label: "Sort Order" },
      { type: "text", key: "summary", label: "Summary Values" },
      { type: "select", key: "summaryMode", label: "Show", options: ["Detail and Summary", "Summary Only"] },
      { type: "select", key: "layout", label: "Layout", options: REPORT_LAYOUTS },
      { type: "select", key: "orientation", label: "Orientation", options: ["Portrait", "Landscape"] },
      { type: "text", key: "title", label: "Title" },
      { type: "select", key: "open", label: "Open", options: REPORT_OPEN },
    ],
  },
  "backstage:queryWizard": {
    id: "backstage:queryWizard",
    title: "New Query",
    fields: [
      { type: "select", key: "wizard", label: "Wizard", options: QUERY_WIZARDS },
      { type: "text", key: "source", label: "Tables/Queries" },
      { type: "text", key: "fields", label: "Selected Fields" },
      { type: "select", key: "detail", label: "Detail or summary", options: ["Detail (shows every field of every record)", "Summary"] },
      { type: "text", key: "summary", label: "Summary Options" },
      { type: "text", key: "title", label: "Title" },
      { type: "select", key: "open", label: "Open", options: QUERY_OPEN },
      { type: "text", key: "rowHeadings", label: "Row headings" },
      { type: "text", key: "columnHeading", label: "Column heading" },
      { type: "text", key: "value", label: "Value field" },
      { type: "select", key: "fn", label: "Function", options: ["Avg", "Count", "First", "Last", "Max", "Min", "StDev", "Sum", "Var"] },
      { type: "checkbox", key: "rowSums", label: "Yes, include row sums." },
      { type: "text", key: "dupFields", label: "Duplicate-value fields" },
      { type: "text", key: "relatedTable", label: "Related table" },
      { type: "text", key: "matchField", label: "Matching field" },
      { type: "text", key: "relatedField", label: "Related field" },
    ],
  },
  "backstage:importExcel": {
    id: "backstage:importExcel",
    title: "Get External Data - Excel Spreadsheet",
    fields: [
      { type: "text", key: "file", label: "File name" },
      { type: "text", key: "sheet", label: "Worksheet" },
      { type: "checkbox", key: "headings", label: "First Row Contains Column Headings" },
      { type: "select", key: "mode", label: "Storage", options: IMPORT_MODES },
      { type: "text", key: "appendTo", label: "Append to" },
      { type: "select", key: "pk", label: "Primary key", options: PK_OPTIONS },
      { type: "text", key: "pkField", label: "Primary key field" },
      { type: "text", key: "table", label: "Import to Table" },
      { type: "text", key: "skip", label: "Do not import" },
      { type: "checkbox", key: "saveSteps", label: "Save import steps" },
      { type: "text", key: "saveName", label: "Save as" },
    ],
  },
  "backstage:exportExcel": {
    id: "backstage:exportExcel",
    title: "Export - Excel Spreadsheet",
    fields: [
      { type: "text", key: "object", label: "Object" },
      { type: "text", key: "file", label: "File name" },
      { type: "select", key: "format", label: "File format", options: ["Excel Workbook (*.xlsx)", "Excel Binary Workbook (*.xlsb)", "Excel 97 - Excel 2003 Workbook (*.xls)"] },
      { type: "checkbox", key: "formatting", label: "Export data with formatting and layout." },
      { type: "checkbox", key: "open", label: "Open the destination file after the export operation is complete." },
      { type: "checkbox", key: "saveSteps", label: "Save export steps" },
      { type: "text", key: "saveName", label: "Save as" },
      { type: "text", key: "description", label: "Description" },
    ],
  },
  "backstage:exportPdf": {
    id: "backstage:exportPdf",
    title: "Publish as PDF or XPS",
    fields: [
      { type: "text", key: "object", label: "Object" },
      { type: "text", key: "file", label: "File name" },
      { type: "select", key: "optimize", label: "Optimize for", options: ["Standard (publishing online and printing)", "Minimum size (publishing online)"] },
      { type: "checkbox", key: "open", label: "Open file after publishing" },
      { type: "checkbox", key: "saveSteps", label: "Save export steps" },
      { type: "text", key: "saveName", label: "Save as" },
      { type: "text", key: "description", label: "Description" },
    ],
  },
  "backstage:exportText": {
    id: "backstage:exportText",
    title: "Export Text Wizard",
    fields: [
      { type: "text", key: "object", label: "Object" },
      { type: "text", key: "file", label: "File name" },
      { type: "select", key: "format", label: "Format", options: ["Delimited", "Fixed Width"] },
      { type: "select", key: "delimiter", label: "Delimiter", options: ["Comma", "Tab", "Semicolon", "Space", "Other"] },
      { type: "checkbox", key: "headings", label: "Include Field Names on First Row" },
      { type: "select", key: "qualifier", label: "Text Qualifier", options: ['"', "'", "{none}"] },
      { type: "checkbox", key: "saveSteps", label: "Save export steps" },
      { type: "text", key: "saveName", label: "Save as" },
      { type: "text", key: "description", label: "Description" },
    ],
  },
  "backstage:lookupWizard": {
    id: "backstage:lookupWizard",
    title: "Lookup Wizard",
    fields: [
      { type: "text", key: "table", label: "Table" },
      { type: "text", key: "field", label: "Field" },
      { type: "select", key: "source", label: "Values", options: LOOKUP_SOURCES },
      { type: "text", key: "values", label: "Values" },
      { type: "text", key: "lookupTable", label: "Lookup table" },
      { type: "text", key: "lookupField", label: "Lookup field" },
      { type: "text", key: "label", label: "Label" },
      { type: "checkbox", key: "limitToList", label: "Limit To List" },
      { type: "checkbox", key: "multi", label: "Allow Multiple Values" },
      { type: "checkbox", key: "storeKey", label: "Hide key column" },
    ],
  },
  "backstage:documenter": { id: "backstage:documenter", title: "Documenter", fields: [{ type: "text", key: "objects", label: "Objects" }] },
  "backstage:analyzeTable": { id: "backstage:analyzeTable", title: "Table Analyzer Wizard", fields: [{ type: "text", key: "table", label: "Table" }, { type: "text", key: "decision", label: "Decision" }] },
  "backstage:tabOrder": { id: "backstage:tabOrder", title: "Tab Order", fields: [{ type: "text", key: "form", label: "Form" }, { type: "text", key: "order", label: "Custom Order" }] },
  "backstage:buttonWizard": {
    id: "backstage:buttonWizard",
    title: "Command Button Wizard",
    fields: [
      { type: "select", key: "category", label: "Categories", options: ["Record Navigation", "Record Operations", "Form Operations", "Report Operations", "Application", "Miscellaneous"] },
      { type: "text", key: "action", label: "Actions" },
      { type: "text", key: "object", label: "Object" },
      { type: "text", key: "text", label: "Text" },
      { type: "text", key: "name", label: "Name" },
      { type: "text", key: "section", label: "Section" },
    ],
  },
  "backstage:options": {
    id: "backstage:options",
    title: "Access Options",
    fields: [
      { type: "text", key: "displayForm", label: "Display Form" },
      { type: "text", key: "appTitle", label: "Application Title" },
      { type: "checkbox", key: "compactOnClose", label: "Compact on Close" },
    ],
  },
};
