/**
 * Microsoft Access (Microsoft 365) document model for the practice simulator.
 *
 * A doc is one open database: its tables (with records), queries, forms,
 * reports, macros and VBA modules, plus the window state (open document tabs,
 * panes, the message box on screen). Everything is plain JSON.
 *
 * Values: Short Text / Long Text as strings, Number / Currency / AutoNumber as
 * numbers, Yes/No as booleans, Date/Time as ISO strings ("2026-10-20" or
 * "2026-10-20T09:30"), empty as null (or a missing key).
 *
 * Selection keys (ui.selection):
 *   nav:<kind>:<Name>          object in the Navigation Pane (kind: table, query, form, report, macro, module)
 *   cell:<Obj>.<rowId>.<Field> datasheet cell (Obj = table or query name; rowId = record _id, e.g. "r3")
 *   col:<Obj>.<Field>          datasheet column header
 *   row:<Obj>.<rowId>          datasheet record selector
 *   field:<Table>.<Field>      field row in table Design view
 *   qcol:<Query>.<n>           query grid column selector (1-based)
 *   qtable:<Query>.<Table>     field list in the query design upper pane
 *   qjoin:<Query>.<T1>.<F1>-<T2>.<F2>  join line in query design
 *   rel:<T1>.<F1>-<T2>.<F2>    relationship line (T1 = the "one" side)
 *   reltable:<Table>           table box in the Relationships window
 *   ctl:<Obj>.<ControlId>      control on a form or report (Layout/Design view)
 *   sec:<Obj>.<Section>        form/report section bar
 *   form:<Obj>                 the form or report selector (whole object)
 *   mact:<Macro>.<n>           macro action block (1-based)
 *   vba:<Module>               VBA code window
 *
 * Type targets (SimAction "type"):
 *   cell:<Table>.<rowId>.<Field>   datasheet / form entry. A new record uses the next free id
 *                                  (r13 after r1..r12), so every field of the new record targets it.
 *   fname:<Table>.<Field>          rename a field (Design view field name cell or datasheet header)
 *   fname:<Table>.new              type a field name in the first empty Design view row
 *   fdesc:<Table>.<Field>          Description cell
 *   prop:<Property Name>           Property Sheet / Field Properties box, acting on the selection
 *   qcell:<Query>.<col>.<Row>      query design grid cell; col = field name, alias or "new";
 *                                  Row = Field | Table | Total | Sort | Show | Criteria | Or | Or2 | Update To | Append To | Crosstab
 *   sql:<Query>                    SQL view text (use match "all" with required clauses)
 *   nav:<kind>:<Name>              rename in the Navigation Pane
 *   label:<Obj>.<ControlId>        label / title text typed in place (title label id is "Title")
 *   section:<Obj>.<Section>        text box placed in a section with this control source
 *   marg:<Macro>.<n>.<Argument>    macro action argument (1-based action)
 *   vba:<Module>                   module code (committed on Ctrl+S, Save, Run or closing the editor)
 */

export type AccValue = string | number | boolean | null;

export const DATA_TYPES = [
  "Short Text",
  "Long Text",
  "Number",
  "Large Number",
  "Date/Time",
  "Date/Time Extended",
  "Currency",
  "AutoNumber",
  "Yes/No",
  "OLE Object",
  "Hyperlink",
  "Attachment",
  "Calculated",
  "Lookup Wizard...",
] as const;
export type AccDataType = Exclude<(typeof DATA_TYPES)[number], "Lookup Wizard...">;

export type AccField = {
  name: string;
  type: AccDataType;
  description?: string;
  /** Short Text: "50"; Number: "Long Integer" | "Integer" | "Byte" | "Single" | "Double" | "Decimal". */
  size?: string;
  format?: string;
  decimalPlaces?: string;
  inputMask?: string;
  caption?: string;
  defaultValue?: string;
  validationRule?: string;
  validationText?: string;
  required?: boolean;
  allowZeroLength?: boolean;
  indexed?: "No" | "Yes (Duplicates OK)" | "Yes (No Duplicates)";
  /** Calculated fields. */
  expression?: string;
  /** Lookup (combo box) settings from the Lookup Wizard. */
  lookup?: { values?: string[]; table?: string; field?: string; limitToList?: boolean; multi?: boolean };
  newValues?: "Increment" | "Random";
};

export type AccRecord = { _id: string } & Record<string, AccValue>;

export type DatasheetView = {
  sort?: { field: string; dir: "asc" | "desc" }[];
  /** Filter as a list of conditions (all must hold). */
  filter?: { field: string; op: "eq" | "ne" | "contains" | "notContains" | "in" | "begins" | "lt" | "gt" | "between" | "null" | "notNull"; value?: AccValue; values?: AccValue[]; value2?: AccValue }[];
  filterOn?: boolean;
  hidden?: string[];
  frozen?: string[];
  widths?: Record<string, number>;
  totalsOn?: boolean;
  totals?: Record<string, string>;
  font?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  altRow?: string;
  gridlines?: string;
  rowHeight?: number;
};

export type AccTable = {
  name: string;
  fields: AccField[];
  /** Primary key field names. */
  pk?: string[];
  rows: AccRecord[];
  description?: string;
  validationRule?: string;
  validationText?: string;
  view?: DatasheetView;
  /** Linked to an external file (Get External Data › Link). */
  linked?: string;
  hidden?: boolean;
};

export type QueryType = "Select" | "Make Table" | "Append" | "Update" | "Crosstab" | "Delete";
export const TOTAL_FUNCS = ["Group By", "Sum", "Avg", "Min", "Max", "Count", "StDev", "Var", "First", "Last", "Expression", "Where"] as const;
export type TotalFunc = (typeof TOTAL_FUNCS)[number];

export type AccQueryCol = {
  /** "LastName", "Patients.*", "*", "Total: [Qty]*[Price]", or an expression. */
  field: string;
  table?: string;
  total?: TotalFunc;
  sort?: "Ascending" | "Descending";
  show?: boolean;
  criteria?: string;
  or?: string[];
  updateTo?: string;
  appendTo?: string;
  crosstab?: "Row Heading" | "Column Heading" | "Value" | "(not shown)";
  /** Field properties set on the query column (Format, Caption). */
  format?: string;
  caption?: string;
};

export type AccJoin = { left: string; leftField: string; right: string; rightField: string; type?: "inner" | "left" | "right" };

export type AccQuery = {
  name: string;
  type: QueryType;
  tables: string[];
  joins?: AccJoin[];
  cols: AccQueryCol[];
  totals?: boolean;
  /** Set when the query was written or edited in SQL view; overrides the grid. */
  sql?: string;
  /** Make Table / Append target table. */
  target?: string;
  topValues?: string;
  unique?: boolean;
  /** False while it is still "Query1" and has never been saved. */
  saved?: boolean;
  description?: string;
  view?: DatasheetView;
};

export type AccSection =
  | "Form Header"
  | "Detail"
  | "Form Footer"
  | "Report Header"
  | "Page Header"
  | "Page Footer"
  | "Report Footer"
  | string; // "<Field> Header" / "<Field> Footer" for report groups

export type AccControlKind = "textbox" | "label" | "combo" | "listbox" | "check" | "button" | "subform" | "image" | "line" | "rect" | "pageNumber" | "dateTime";

export type AccControl = {
  id: string;
  kind: AccControlKind;
  /** Control Source: a field name, or an expression starting with "=". */
  source?: string;
  /** Attached label (text boxes) or caption (labels, buttons). */
  label?: string;
  caption?: string;
  section?: AccSection;
  /** Order inside its section (layout order). */
  order?: number;
  width?: number;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  fill?: string;
  align?: "Left" | "Center" | "Right";
  format?: string;
  locked?: boolean;
  enabled?: boolean;
  visible?: boolean;
  tabStop?: boolean;
  rowSource?: string;
  rowSourceType?: "Table/Query" | "Value List" | "Field List";
  limitToList?: boolean;
  /** Event properties. */
  onClick?: string;
  /** Embedded macro for a button made with the Command Button Wizard. */
  macro?: AccMacroAction[];
  /** Command Button Wizard action, e.g. "Go To Next Record". */
  action?: string;
  /** Running sum / totals made by the Totals button in report Layout view. */
  totalFn?: string;
  subform?: string;
  linkField?: string;
};

export type AccForm = {
  name: string;
  recordSource: string;
  layout: "Columnar" | "Tabular" | "Datasheet" | "Justified" | "Split Form" | "Multiple Items";
  controls: AccControl[];
  tabOrder?: string[];
  theme?: string;
  caption?: string;
  allowAdditions?: boolean;
  allowEdits?: boolean;
  allowDeletions?: boolean;
  dataEntry?: boolean;
  recordSelectors?: boolean;
  navigationButtons?: boolean;
  defaultView?: "Single Form" | "Continuous Forms" | "Datasheet" | "Split Form";
  onLoad?: string;
  saved?: boolean;
  fill?: string;
};

export type AccReportGroup = {
  field: string;
  dir?: "asc" | "desc";
  header?: boolean;
  footer?: boolean;
  keepTogether?: string;
  forceNewPage?: string;
  interval?: string;
};

export type AccReport = {
  name: string;
  recordSource: string;
  /** Detail columns, in order. */
  fields: string[];
  groups?: AccReportGroup[];
  sorts?: { field: string; dir: "asc" | "desc" }[];
  /** Summary totals shown in group footers and the report footer. */
  totals?: { field: string; fn: "Sum" | "Avg" | "Count" | "Min" | "Max" }[];
  summaryOnly?: boolean;
  layout: "Stepped" | "Block" | "Outline" | "Tabular" | "Columnar" | "Justified";
  orientation: "Portrait" | "Landscape";
  pageSize?: "Letter" | "Legal" | "A4" | "Tabloid" | "Executive";
  margins?: "Normal" | "Wide" | "Narrow";
  title?: string;
  /** Extra controls the learner placed (labels, text boxes, page numbers). */
  controls?: AccControl[];
  pageNumbers?: { format: string; position: string; align: string; first?: boolean } | null;
  dateTime?: { date?: string; time?: string } | null;
  logo?: boolean;
  theme?: string;
  /** Column label captions edited in Layout view (field → caption). */
  captions?: Record<string, string>;
  widths?: Record<string, number>;
  saved?: boolean;
  sectionProps?: Record<string, Record<string, string>>;
};

export type MacroActionName =
  | "OpenForm"
  | "OpenReport"
  | "OpenQuery"
  | "OpenTable"
  | "MessageBox"
  | "CloseWindow"
  | "GoToRecord"
  | "RunMacro"
  | "ApplyFilter"
  | "QuitAccess"
  | "SetValue"
  | "RunCode"
  | "FindRecord"
  | "MaximizeWindow"
  | "Beep"
  | "Comment";

export type AccMacroAction = { action: MacroActionName | string; args: Record<string, string> };

export type AccMacro = { name: string; actions: AccMacroAction[]; saved?: boolean };

export type AccModule = { name: string; code: string; kind?: "standard" | "class"; saved?: boolean };

export type AccRelationship = {
  /** The "one" side (primary key). */
  table: string;
  field: string;
  /** The "many" side (foreign key). */
  relatedTable: string;
  relatedField: string;
  enforce?: boolean;
  cascadeUpdate?: boolean;
  cascadeDelete?: boolean;
  /** 1 = inner, 2 = all from table, 3 = all from relatedTable. */
  join?: 1 | 2 | 3;
};

export type AccView = "Datasheet View" | "Design View" | "SQL View" | "Form View" | "Layout View" | "Report View" | "Print Preview";

export type AccTab = {
  id: string;
  kind: "table" | "query" | "form" | "report" | "macro" | "relationships" | "documenter";
  name: string;
  view: AccView;
  /** Current record (0-based) in Form view; -1 = the new record. */
  record?: number;
  /** Parameter values entered for a parameter query. */
  params?: Record<string, string>;
  dirty?: boolean;
  /** Print Preview zoom / page. */
  zoom?: number;
  page?: number;
  pages?: number;
  /** Documenter output. */
  doc?: string[];
  /** The view to come back to when Print Preview closes. */
  prevView?: AccView;
};

export type ExternalFile = {
  name: string;
  /** Folder shown in dialogs. */
  folder?: string;
  kind: "xlsx" | "csv" | "txt" | "pdf" | "accdb";
  sheets?: { name: string; rows: (string | number | null)[][] }[];
  /** Created by an export: which object, when. */
  from?: string;
  size?: string;
};

export type SavedSpec = { name: string; object: string; format: string; file: string; description?: string };

export type AccPrompt = {
  kind: "message" | "confirm" | "yesnocancel" | "param" | "saveAs" | "pasteAs" | "find";
  title?: string;
  text?: string;
  icon?: "warning" | "error" | "info" | "question";
  /** Commit sent on Yes / OK. */
  yes?: { id: string; value?: string };
  no?: { id: string; value?: string };
  /** Parameter prompt. */
  param?: string;
  query?: string;
  /** Save As prompt: the object being saved and its default name. */
  objectKind?: string;
  objectName?: string;
  defaultName?: string;
  /** Run after a successful save (e.g. switch to Design view). */
  thenView?: AccView;
  nonce?: number;
};

export type AccessDoc = {
  /** No database open: show the Access start screen. */
  noDb?: boolean;
  tables: AccTable[];
  queries: AccQuery[];
  forms: AccForm[];
  reports: AccReport[];
  macros: AccMacro[];
  modules: AccModule[];
  relationships: AccRelationship[];
  /** Tables shown in the Relationships window. */
  relLayout?: string[];
  open: AccTab[];
  active?: string | null;
  navHidden?: boolean;
  /** Navigation Pane groups the learner collapsed. */
  navCollapsed?: string[];
  panes?: { propertySheet?: boolean; fieldList?: boolean; addTables?: boolean; groupSort?: boolean; actionCatalog?: boolean };
  prompt?: AccPrompt | null;
  /** Visual Basic Editor window. */
  vbe?: { open: boolean; module?: string; immediate?: boolean; output?: string[] } | null;
  files?: ExternalFile[];
  savedExports?: SavedSpec[];
  savedImports?: SavedSpec[];
  /** Exports and backups made in this session, for display. */
  exports?: { object: string; format: string; file: string }[];
  backups?: string[];
  encrypted?: boolean;
  compacted?: boolean;
  /** Access Options › Current Database. */
  options?: { displayForm?: string; appTitle?: string; compactOnClose?: boolean; tabbed?: boolean };
  clipboard?: { kind: string; name: string } | null;
  /** Last text found with Find. */
  find?: { text: string; match?: string; field?: string } | null;
  saved?: { name?: string; location?: string; format?: string; autosave?: boolean };
  flags?: Record<string, string | number | boolean>;
  ribbonCollapsed?: boolean;
  pane?: string | null;
  /** Control tool armed from the Controls gallery (Design view), for display. */
  tool?: string | null;
  /** Message on the status bar after the last action. */
  status?: string;
};

/** Partial doc accepted by accessDoc(); everything but tables is optional. */
export type AccessDocInput = Partial<AccessDoc> & { tables?: AccTable[] };

/**
 * Wrap a sim's starting database so it type-checks and gets defaults
 * (empty object lists, the Documents folder as the save location).
 */
export const accessDoc = (d: AccessDocInput) =>
  ({
    queries: [],
    forms: [],
    reports: [],
    macros: [],
    modules: [],
    relationships: [],
    open: [],
    active: null,
    ...d,
    tables: d.tables ?? [],
    saved: { location: "C:\\Users\\Student\\Documents", ...(d.saved ?? {}) },
  }) as unknown as Record<string, unknown>;
