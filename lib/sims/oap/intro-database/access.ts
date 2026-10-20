import type { SimDefinition } from "@/types/sim";
import { accessDoc, type AccForm, type AccQuery, type AccReport, type AccTable } from "@/components/sim/apps/access/types";
import {
  addQField,
  anyField,
  cell,
  cellsWith,
  cmd,
  colSel,
  ctl,
  designField,
  dlg,
  fld,
  IMPORT_MODES,
  LOOKUP_SOURCES,
  openIn,
  openObj,
  PK_OPTIONS,
  prop,
  qcell,
  rowOf,
  runQuery,
  saveAs,
  saveObj,
  spaced,
  tab,
  table,
  typed,
  viewSwitch,
} from "@/components/sim/apps/access/simkit";
import { appointments, apptRelationships, patients, patientsReg, PHONE_MASK, providers, providersP, supplies } from "@/lib/sims/access/lakeside";

/*
 * Introduction to Database Management: practice sims in the Access engine.
 * Lakeside Medical Associates; every person and number is fictional.
 */

const DOCS = "C:\\Users\\Student\\Documents";
const ONEDRIVE = "C:\\Users\\Student\\OneDrive - BEOC\\Documents";
const SAVE_HINT = "Press Ctrl+S (or File › Save), type the name in the Save As box, and click OK.";

/* ------------------------------------------------------------------ */
/* Module 1                                                            */
/* ------------------------------------------------------------------ */

/** Patients before clean-up: no primary key yet, and DateOfBirth stored as text. */
function patientsUnkeyed(): AccTable {
  const p = patients();
  p.pk = [];
  const dob = p.fields.find((f) => f.name === "DateOfBirth")!;
  dob.type = "Short Text";
  dob.size = "20";
  dob.format = undefined;
  for (const r of p.rows) {
    const [y, m, d] = String(r.DateOfBirth).split("-").map(Number);
    r.DateOfBirth = `${m}/${d}/${y}`;
  }
  return p;
}

const conceptPatients = patientsUnkeyed();

const APPT_LOG = [
  ["PatientName", "Phone", "ApptDate", "Provider", "VisitType", "Copay"],
  ["Rodriguez, Maria", "(718) 555-0142", "10/21/2026", "Walsh", "Annual Physical", 25],
  ["Thompson, James", "(347) 555-0177", "10/21/2026", "Rivera", "Follow-Up", 40],
  ["Nguyen, Linh", "(718) 555-0103", "10/22/2026", "Walsh", "Sick Visit", 0],
  ["Patel, Priya", "(917) 555-0188", "10/22/2026", "Chen", "Consultation", 50],
  ["Delgado, Rosa", "(718) 555-0121", "10/23/2026", "Rivera", "Follow-Up", 0],
  ["Kim, Daniel", "(646) 555-0135", "10/23/2026", "Okafor", "New Patient", 30],
  ["Haddad, Omar", "(347) 555-0110", "10/26/2026", "Walsh", "Sick Visit", 40],
  ["Fischer, Anna", "(718) 555-0199", "10/26/2026", "Chen", "Follow-Up", 0],
  ["Mensah, Kwame", "(929) 555-0156", "10/27/2026", "Rivera", "Annual Physical", 25],
  ["Rodriguez, Maria", "(718) 555-0142", "10/28/2026", "Walsh", "Follow-Up", 25],
];
/** Selection keys for a field of the table the import creates (r1..r10). */
const importedField = (field: string) => [`field:Appointments.${field}`, `col:Appointments.${field}`, ...APPT_LOG.slice(1).map((_, i) => `cell:Appointments.r${i + 1}.${field}`)];

const module1: Record<string, SimDefinition[]> = {
  "module-1::database-concepts": [
    {
      id: "access-id-m1-database-concepts-1",
      app: "access",
      title: "Tour the patient database",
      scenario:
        "Lakeside Medical Associates moved its paper patient charts into Access. Before the front desk starts using it, you check that the Patients table is sorted, keyed, typed correctly, and linked to Appointments the way a well-built database should be.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 7,
      initial: accessDoc({ tables: [conceptPatients, appointments(), providers()] }),
      tasks: [
        {
          instruction: "Open the Patients table and sort its records by LastName from A to Z.",
          hint: "Double-click Patients in the Navigation Pane. Click any cell in the LastName column, then Home › Sort & Filter › Ascending.",
          steps: [
            openObj("table", "Patients"),
            cmd("home.sortAsc", undefined, { requires: { selection: colSel(conceptPatients, "LastName") }, selectHint: "Click a cell in the LastName column first." }),
          ],
        },
        {
          instruction: "Select the whole record for the patient Maria Rodriguez.",
          hint: "Click the gray record selector at the far left of Maria Rodriguez's row. The whole record highlights.",
          steps: [{ action: { kind: "select", target: [`row:Patients.${rowOf(conceptPatients, "LastName", "Rodriguez")}`] } }],
        },
        {
          instruction: "Switch the Patients table to Design View and set PatientID as the table's primary key.",
          hint: "Home › Views › View › Design View. Click the PatientID row selector, then Table Design › Tools › Primary Key.",
          steps: [
            viewSwitch("Design View"),
            cmd("design.primaryKey", undefined, { requires: { selection: designField("Patients", "PatientID") }, selectHint: "Click the PatientID row in the field list first." }),
          ],
        },
        {
          instruction: "Change the data type of the DateOfBirth field to Date/Time, so the database can sort birthdays and reject impossible dates.",
          hint: "Click the DateOfBirth row, open the Data Type list in that row, and choose Date/Time.",
          steps: [
            cmd("field.dataType", "Date/Time", { requires: { selection: anyField(conceptPatients, "DateOfBirth") }, selectHint: "Click the DateOfBirth field first." }),
          ],
        },
        {
          instruction: "Save the changes to the table design.",
          hint: "Press Ctrl+S, or click Save on the Quick Access Toolbar.",
          steps: [saveObj()],
        },
        {
          instruction: "Create a one-to-many relationship from PatientID in Patients to PatientID in Appointments, and enforce referential integrity.",
          hint: "Database Tools › Relationships › Relationships. Add Patients and Appointments from the Add Tables pane, drag PatientID from Patients onto PatientID in Appointments, check Enforce Referential Integrity, and click Create.",
          steps: [
            cmd("dbtools.relationships"),
            dlg("backstage:editRelationship", { table: "Patients", field: "PatientID", relatedTable: "Appointments", relatedField: "PatientID", enforce: true }),
          ],
        },
      ],
    },
  ],

  "module-1::excel-vs-access": [
    {
      id: "access-id-m1-excel-vs-access-1",
      app: "access",
      title: "Move the appointment log into Access",
      scenario:
        "The front desk's appointment spreadsheet keeps crashing, and two people cannot edit it at the same time. Your supervisor approved moving it into Access, where entries can be checked and staff can work in a form.",
      fileName: "Lakeside_FrontDesk.accdb",
      minutes: 7,
      initial: accessDoc({
        tables: [providers()],
        files: [{ name: "Appointment Log.xlsx", folder: DOCS, kind: "xlsx", sheets: [{ name: "Appointments", rows: APPT_LOG }] }],
      }),
      tasks: [
        {
          instruction: "Import the Appointment Log.xlsx workbook from the Documents folder into a new table named Appointments. Use the first row as field names and let Access add a primary key.",
          hint: "External Data › Import & Link › New Data Source › From File › Excel. Browse to Appointment Log.xlsx and keep Import the source data into a new table. In the wizard, check First Row Contains Column Headings, choose Let Access add primary key, type Appointments as the table name, and click Finish.",
          steps: [
            dlg("backstage:importExcel", { headings: true, mode: IMPORT_MODES[0], pk: PK_OPTIONS[0], table: "Appointments" }),
          ],
        },
        {
          instruction: "Open the Appointments table in Design View and change the Copay field to the Currency data type.",
          hint: "Right-click Appointments in the Navigation Pane and choose Design View. In the Copay row, open the Data Type list and choose Currency.",
          steps: [
            openIn("table", "Appointments", "Design View"),
            cmd("field.dataType", "Currency", { requires: { selection: importedField("Copay") }, selectHint: "Click the Copay field first." }),
          ],
        },
        {
          instruction: "Make PatientName a required field, so an appointment cannot be saved without a patient.",
          hint: "Click the PatientName row. In Field Properties at the bottom, set Required to Yes.",
          steps: [
            prop("Required", "Yes", importedField("PatientName"), "Click the PatientName field first.", [
              { kind: "command", id: "fields.required", requires: { selection: importedField("PatientName").slice(1) } },
            ]),
          ],
        },
        {
          instruction: "Save the table design.",
          hint: "Press Ctrl+S, or click Save on the Quick Access Toolbar.",
          steps: [saveObj()],
        },
        {
          instruction: "Create a form for the Appointments table in one step, so staff no longer type into the grid.",
          hint: "With Appointments open or selected in the Navigation Pane, click Create › Forms › Form.",
          steps: [cmd("create.form")],
        },
        {
          instruction: "Save the new form as Appointment Entry.",
          hint: SAVE_HINT,
          steps: [saveAs("Appointment Entry")],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Module 3                                                            */
/* ------------------------------------------------------------------ */

const entryPatients = patients({ phoneMask: true });
const entryAppts = appointments();

/** An Appointments table mid-design: some field types and sizes still wrong. */
const draftAppointments = (): AccTable =>
  table(
    "Appointments",
    [fld.auto("AppointmentID"), fld.text("PatientID", 255), fld.text("ProviderID", 50), fld.date("AppointmentDate"), fld.text("VisitType", 255), fld.text("Notes", 255)],
    [],
  );

const relPatients = patients();
const relAppts = appointments();

const module3: Record<string, SimDefinition[]> = {
  "module-3::welcome-to-access": [
    {
      id: "access-id-m3-welcome-to-access-1",
      app: "access",
      title: "Create your first Access database",
      scenario:
        "The practice manager wants to see whether Access can fix the shared-spreadsheet problems. You create a new database for Lakeside Medical Associates and start its first table.",
      fileName: "LakesideMedical_Practice.accdb",
      minutes: 6,
      initial: accessDoc({ noDb: true, tables: [] }),
      tasks: [
        {
          instruction: "Create a blank database named LakesideMedical_Practice.",
          hint: "On the Access start screen, click Blank database. Type LakesideMedical_Practice in the File Name box and click Create.",
          steps: [cmd("file.new", ["LakesideMedical_Practice", "LakesideMedical_Practice.accdb"])],
        },
        {
          instruction: "Switch Table1 to Design View and save it as Patients when Access asks.",
          hint: "Home › Views › View › Design View. In the Save As box, type Patients and click OK.",
          steps: [viewSwitch("Design View"), saveAs("Patients")],
        },
        {
          instruction: "Rename the ID field to PatientID.",
          hint: "In Design View, click ID in the Field Name column, type PatientID, and press Enter.",
          steps: [typed("fname:Patients.ID", "PatientID")],
        },
        {
          instruction: "Add a field named LastName with the Short Text data type and a field size of 50.",
          hint: "Click the first empty Field Name cell, type LastName, and press Tab (Short Text is the default type). In Field Properties, set Field Size to 50.",
          anyOrder: true,
          steps: [
            typed("fname:Patients.new", "LastName"),
            prop("Field Size", "50", designField("Patients", "LastName"), "Click the LastName row first."),
          ],
        },
        {
          instruction: "Save the table design.",
          hint: "Press Ctrl+S, or click Save on the Quick Access Toolbar.",
          steps: [saveObj()],
        },
        {
          instruction: "Switch to Datasheet View and enter Rodriguez as the LastName of the first patient.",
          hint: "Home › Views › View › Datasheet View. Click the LastName cell in the (New) row, type Rodriguez, and press Enter.",
          steps: [viewSwitch("Datasheet View"), cell("Patients", "r1", "LastName", "Rodriguez")],
        },
      ],
    },
  ],

  "module-3::tables-and-fields": [
    {
      id: "access-id-m3-tables-and-fields-1",
      app: "access",
      title: "Build the Patients table",
      scenario:
        "You are designing the patient registration table for Lakeside Medical Associates. Each field's type and properties decide which mistakes the database can stop for years to come.",
      fileName: "LakesideMedical_Practice.accdb",
      minutes: 8,
      initial: accessDoc({ tables: [providers()] }),
      tasks: [
        {
          instruction: "Create a new table in Design View.",
          hint: "Create › Tables › Table Design.",
          steps: [cmd("create.tableDesign")],
        },
        {
          instruction: "Add a field named PatientID with the AutoNumber data type, and make it the primary key.",
          hint: "Type PatientID in the first Field Name cell and press Tab. Choose AutoNumber in the Data Type list, then Table Design › Tools › Primary Key.",
          steps: [
            typed("fname:Table1.new", "PatientID"),
            cmd("field.dataType", "AutoNumber", { requires: { selection: designField("Table1", "PatientID") }, selectHint: "Click the PatientID row first." }),
            cmd("design.primaryKey", undefined, { requires: { selection: designField("Table1", "PatientID") }, selectHint: "Click the PatientID row first." }),
          ],
        },
        {
          instruction: "Add a LastName field (Short Text) with a field size of 50, and make it required.",
          hint: "Type LastName in the next empty Field Name cell. In Field Properties, set Field Size to 50 and Required to Yes.",
          anyOrder: true,
          steps: [
            typed("fname:Table1.new", "LastName"),
            prop("Field Size", "50", designField("Table1", "LastName"), "Click the LastName row first."),
            prop("Required", "Yes", designField("Table1", "LastName"), "Click the LastName row first."),
          ],
        },
        {
          instruction: "Add a DateOfBirth field with the Date/Time data type.",
          hint: "Type DateOfBirth in the next empty Field Name cell, then choose Date/Time in its Data Type list.",
          steps: [
            typed("fname:Table1.new", "DateOfBirth"),
            cmd("field.dataType", "Date/Time", { requires: { selection: designField("Table1", "DateOfBirth") }, selectHint: "Click the DateOfBirth row first." }),
          ],
        },
        {
          instruction: "Add an InsuranceID field (Short Text) limited to 15 characters.",
          hint: "Type InsuranceID in the next empty Field Name cell. In Field Properties, set Field Size to 15.",
          steps: [typed("fname:Table1.new", "InsuranceID"), prop("Field Size", "15", designField("Table1", "InsuranceID"), "Click the InsuranceID row first.")],
        },
        {
          instruction: "Add an IsActivePatient field with the Yes/No data type and a default value of Yes.",
          hint: "Type IsActivePatient in the next empty Field Name cell and choose Yes/No as its data type. In Field Properties, type Yes in Default Value.",
          steps: [
            typed("fname:Table1.new", "IsActivePatient"),
            cmd("field.dataType", "Yes/No", { requires: { selection: designField("Table1", "IsActivePatient") }, selectHint: "Click the IsActivePatient row first." }),
            prop("Default Value", ["Yes", "True", "-1"], designField("Table1", "IsActivePatient"), "Click the IsActivePatient row first."),
          ],
        },
        {
          instruction: "Save the table as Patients.",
          hint: SAVE_HINT,
          steps: [saveAs("Patients")],
        },
      ],
    },
    {
      id: "access-id-m3-tables-and-fields-2",
      app: "access",
      title: "Set field rules for appointments",
      scenario:
        "A coworker started the Appointments table, but several fields still accept anything. You fix the data types and properties before anyone enters a real appointment.",
      fileName: "LakesideMedical_Practice.accdb",
      minutes: 7,
      initial: accessDoc({ tables: [patients(), draftAppointments()], open: [tab("table", "Appointments", "Design View")], active: "table:Appointments" }),
      tasks: [
        {
          instruction: "Change the PatientID field to the Number data type, so it matches the PatientID key in Patients.",
          hint: "Click the PatientID row, open its Data Type list, and choose Number.",
          steps: [cmd("field.dataType", "Number", { requires: { selection: designField("Appointments", "PatientID") }, selectHint: "Click the PatientID row first." })],
        },
        {
          instruction: "Make PatientID a required field.",
          hint: "With PatientID selected, set Required to Yes in Field Properties.",
          steps: [prop("Required", "Yes", designField("Appointments", "PatientID"), "Click the PatientID row first.")],
        },
        {
          instruction: "Limit VisitType to 30 characters.",
          hint: "Click the VisitType row and set Field Size to 30 in Field Properties.",
          steps: [prop("Field Size", "30", designField("Appointments", "VisitType"), "Click the VisitType row first.")],
        },
        {
          instruction: "Give AppointmentDate the validation rule >=Date() and the validation text Appointments cannot be scheduled in the past.",
          hint: "Click the AppointmentDate row. In Field Properties, type >=Date() in Validation Rule, then type the message in Validation Text.",
          anyOrder: true,
          steps: [
            prop("Validation Rule", ">=Date()", designField("Appointments", "AppointmentDate"), "Click the AppointmentDate row first."),
            prop("Validation Text", "Appointments cannot be scheduled in the past.", designField("Appointments", "AppointmentDate"), "Click the AppointmentDate row first."),
          ],
        },
        {
          instruction: "Change the Notes field to Long Text, so staff can write longer comments.",
          hint: "Click the Notes row, open its Data Type list, and choose Long Text.",
          steps: [cmd("field.dataType", "Long Text", { requires: { selection: designField("Appointments", "Notes") }, selectHint: "Click the Notes row first." })],
        },
        {
          instruction: "Save the table design.",
          hint: "Press Ctrl+S, or click Save on the Quick Access Toolbar.",
          steps: [saveObj()],
        },
      ],
    },
  ],

  "module-3::entering-editing-records": [
    {
      id: "access-id-m3-entering-editing-records-1",
      app: "access",
      title: "Front desk data entry",
      scenario:
        "The new database is live and the front desk is busy. You register a walk-in patient, update a phone number, pull up one insurance plan's patients, and remove a canceled appointment.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 8,
      initial: accessDoc({
        tables: [entryPatients, entryAppts, providers()],
        relationships: apptRelationships(),
        open: [tab("table", "Patients", "Datasheet View")],
        active: "table:Patients",
      }),
      tasks: [
        {
          instruction: "Add a new patient: LastName Whitfield, FirstName James, DateOfBirth 6/2/1979, Phone (718) 555-0190, City Brooklyn, InsurancePlan Aetna.",
          hint: "Click the LastName cell in the (New) row at the bottom of the datasheet. Type each value and press Tab to move to the next field. For Phone, type just the digits.",
          anyOrder: true,
          steps: [
            cell("Patients", "r13", "LastName", "Whitfield"),
            cell("Patients", "r13", "FirstName", "James"),
            cell("Patients", "r13", "DateOfBirth", "6/2/1979"),
            cell("Patients", "r13", "Phone", "(718) 555-0190"),
            cell("Patients", "r13", "City", "Brooklyn"),
            cell("Patients", "r13", "InsurancePlan", "Aetna"),
          ],
        },
        {
          instruction: "Use Find to locate the patient whose last name is Delgado.",
          hint: "Click any LastName cell and press Ctrl+F (Home › Find › Find). Type Delgado in Find What and click Find Next.",
          steps: [cmd("home.findNext", "Delgado")],
        },
        {
          instruction: "Change Rosa Delgado's phone number to (347) 555-0123.",
          hint: "Click Rosa Delgado's Phone cell, type the new digits over the old number, and press Enter.",
          steps: [cell("Patients", rowOf(entryPatients, "LastName", "Delgado"), "Phone", "(347) 555-0123")],
        },
        {
          instruction: "Show only the patients whose InsurancePlan is BlueCross by filtering on a BlueCross cell.",
          hint: "Click any InsurancePlan cell that says BlueCross, then Home › Sort & Filter › Selection › Equals Selection. You can also right-click the cell and choose Filter By Selection.",
          steps: [
            cmd("home.selection", "Equals Selection", {
              requires: { selection: cellsWith(entryPatients, "InsurancePlan", "BlueCross") },
              selectHint: "Click an InsurancePlan cell that contains BlueCross first.",
              alt: [
                { kind: "command", id: "datasheet.filter", value: ["InsurancePlan=BlueCross", "InsurancePlan:Equals:BlueCross"], requires: { selection: colSel(entryPatients, "InsurancePlan") } },
              ],
            }),
          ],
        },
        {
          instruction: "Turn the filter off so every patient shows again.",
          hint: "Home › Sort & Filter › Toggle Filter, or click Filtered on the record navigation bar.",
          steps: [
            cmd("home.toggleFilter", undefined, {
              alt: [
                { kind: "command", id: "home.advanced", value: "Clear All Filters" },
                { kind: "command", id: "datasheet.filter", value: "InsurancePlan:clear" },
              ],
            }),
          ],
        },
        {
          instruction: "Open the Appointments table and delete the canceled appointment whose AppointmentID is 15.",
          hint: "Double-click Appointments in the Navigation Pane. Click the record selector to the left of AppointmentID 15, press Delete (Home › Records › Delete), and click Yes.",
          steps: [openObj("table", "Appointments"), cmd("record.delete", `Appointments.${rowOf(entryAppts, "AppointmentID", 15)}`)],
        },
      ],
    },
  ],

  "module-3::table-relationships": [
    {
      id: "access-id-m3-table-relationships-1",
      app: "access",
      title: "Link patients to their appointments",
      scenario:
        "Right now nothing stops someone from entering an appointment for PatientID 9999, and nothing connects the tables so you can list Maria Rodriguez's visits. You create the relationships and a query that uses them.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 8,
      initial: accessDoc({ tables: [relPatients, relAppts, providers()] }),
      tasks: [
        {
          instruction: "Open the Relationships window and add the Patients and Appointments tables to it.",
          hint: "Database Tools › Relationships › Relationships. In the Add Tables pane, double-click Patients and then Appointments.",
          anyOrder: true,
          steps: [cmd("dbtools.relationships"), cmd("relationships.addTable", "Patients"), cmd("relationships.addTable", "Appointments")],
        },
        {
          instruction: "Relate PatientID in Patients to PatientID in Appointments. Enforce referential integrity, and leave Cascade Delete Related Records off.",
          hint: "Drag PatientID from the Patients box onto PatientID in the Appointments box. In Edit Relationships, check Enforce Referential Integrity only, then click Create.",
          steps: [dlg("backstage:editRelationship", { table: "Patients", field: "PatientID", relatedTable: "Appointments", relatedField: "PatientID", enforce: true, cascadeDelete: false })],
        },
        {
          instruction: "Add the Providers table and relate ProviderID in Providers to ProviderID in Appointments, with referential integrity enforced.",
          hint: "In the Add Tables pane, double-click Providers (Relationship Design › Relationships › Add Tables reopens it). Drag ProviderID onto ProviderID in Appointments, check Enforce Referential Integrity, and click Create.",
          steps: [
            cmd("relationships.addTable", "Providers"),
            dlg("backstage:editRelationship", { table: "Providers", field: "ProviderID", relatedTable: "Appointments", relatedField: "ProviderID", enforce: true }),
          ],
        },
        {
          instruction: "Start a new query in Design View that uses the Patients and Appointments tables.",
          hint: "Create › Queries › Query Design. In the Add Tables pane, double-click Patients and then Appointments. The relationship line appears between them.",
          anyOrder: true,
          steps: [cmd("create.queryDesign"), cmd("query.addTable", "Patients"), cmd("query.addTable", "Appointments")],
        },
        {
          instruction: "Add LastName and FirstName from Patients, then AppointmentDate and VisitType from Appointments, to the query grid.",
          hint: "Double-click each field name in the field lists, or drag it down to an empty column in the grid.",
          anyOrder: true,
          steps: [
            addQField("Query1", "Patients", "LastName"),
            addQField("Query1", "Patients", "FirstName"),
            addQField("Query1", "Appointments", "AppointmentDate"),
            addQField("Query1", "Appointments", "VisitType"),
          ],
        },
        {
          instruction: "Run the query, then save it as Patient Appointments.",
          hint: "Query Design › Results › Run. Then press Ctrl+S, type Patient Appointments, and click OK.",
          anyOrder: true,
          steps: [runQuery(), saveAs("Patient Appointments")],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Module 4                                                            */
/* ------------------------------------------------------------------ */

const regPatients = patientsReg();

/** September appointments with provider and patient names (three tables joined). */
const septemberQuery = (): AccQuery => ({
  name: "SeptemberAppointments",
  type: "Select",
  tables: ["Providers", "Appointments", "Patients"],
  joins: [
    { left: "Providers", leftField: "ProviderID", right: "Appointments", rightField: "ProviderID", type: "inner" },
    { left: "Patients", leftField: "PatientID", right: "Appointments", rightField: "PatientID", type: "inner" },
  ],
  cols: [
    { field: "ProviderLastName", table: "Providers", show: true },
    { field: "AppointmentDate", table: "Appointments", show: true, criteria: "Between #9/1/2026# And #9/30/2026#" },
    { field: "PatientLastName", table: "Patients", show: true },
    { field: "PatientFirstName", table: "Patients", show: true },
    { field: "VisitType", table: "Appointments", show: true },
  ],
  saved: true,
});

const providerSchedule = (): AccQuery => ({
  name: "Provider Schedule",
  type: "Select",
  tables: ["Providers", "Appointments"],
  joins: [{ left: "Providers", leftField: "ProviderID", right: "Appointments", rightField: "ProviderID", type: "inner" }],
  cols: [
    { field: "ProviderLastName", table: "Providers", show: true },
    { field: "AppointmentDate", table: "Appointments", show: true },
    { field: "VisitType", table: "Appointments", show: true },
    { field: "PatientID", table: "Appointments", show: true },
  ],
  saved: true,
});

const monthlyReport = (): AccReport => ({
  name: "MonthlyAppointmentSummary",
  recordSource: "SeptemberAppointments",
  fields: ["AppointmentDate", "PatientLastName", "PatientFirstName", "VisitType"],
  groups: [{ field: "ProviderLastName", dir: "asc", header: true, footer: true }],
  sorts: [{ field: "AppointmentDate", dir: "asc" }],
  totals: [{ field: "AppointmentDate", fn: "Count" }],
  layout: "Stepped",
  orientation: "Landscape",
  pageSize: "Letter",
  margins: "Normal",
  title: "Monthly Appointment Summary",
  pageNumbers: { format: "Page N of M", position: "Bottom of Page [Footer]", align: "Right" },
  dateTime: { date: "Long Date" },
  saved: true,
});

const REG_FIELDS: [string, string][] = [
  ["PatientFirstName", "First Name"],
  ["PatientLastName", "Last Name"],
  ["DateOfBirth", "Date of Birth"],
  ["PhoneNumber", "Phone Number"],
  ["Email", "Email"],
  ["InsurancePlan", "Insurance Plan"],
];
/** The registration form after the wizard, with a tab order that jumps from First Name to Insurance Plan. */
const registrationForm = (): AccForm => ({
  name: "PatientRegistrationForm",
  recordSource: "Patients",
  layout: "Columnar",
  controls: [
    { id: "Title", kind: "label", caption: "Patient Registration", section: "Form Header", order: 0, fontSize: 18 },
    ...REG_FIELDS.map(([id, label], i) => ({ id, kind: "textbox" as const, source: id, label, section: "Detail", order: i + 1 })),
  ],
  tabOrder: ["PatientFirstName", "InsurancePlan", "PatientLastName", "DateOfBirth", "PhoneNumber", "Email"],
  saved: true,
  allowAdditions: true,
  allowEdits: true,
  allowDeletions: true,
  navigationButtons: true,
  recordSelectors: true,
});

const m4Tables = () => [patientsReg(), providersP(), appointments()];

const module4: Record<string, SimDefinition[]> = {
  "module-4::creating-queries": [
    {
      id: "access-id-m4-creating-queries-1",
      app: "access",
      title: "Find unbilled September appointments",
      scenario:
        "The billing manager spends hours each month matching appointments against bills by hand. You build a saved query that lists every September appointment that has not been billed yet, with the patient's name beside it.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 8,
      initial: accessDoc({ tables: m4Tables(), relationships: apptRelationships() }),
      tasks: [
        {
          instruction: "Start a new query in Design View that uses the Patients and Appointments tables.",
          hint: "Create › Queries › Query Design. In the Add Tables pane, double-click Patients and then Appointments.",
          anyOrder: true,
          steps: [cmd("create.queryDesign"), cmd("query.addTable", "Patients"), cmd("query.addTable", "Appointments")],
        },
        {
          instruction: "Add PatientLastName and PatientFirstName from Patients, then AppointmentDate, VisitType and BilledDate from Appointments.",
          hint: "Double-click each field in the field lists, or drag it to an empty column of the grid.",
          anyOrder: true,
          steps: [
            addQField("Query1", "Patients", "PatientLastName"),
            addQField("Query1", "Patients", "PatientFirstName"),
            addQField("Query1", "Appointments", "AppointmentDate"),
            addQField("Query1", "Appointments", "VisitType"),
            addQField("Query1", "Appointments", "BilledDate"),
          ],
        },
        {
          instruction: "Limit the results to appointments from 9/1/2026 through 9/30/2026.",
          hint: "In the Criteria row under AppointmentDate, type Between #9/1/2026# And #9/30/2026#.",
          steps: [qcell("Query1", "AppointmentDate", "Criteria", ["Between #9/1/2026# And #9/30/2026#", ">=#9/1/2026# And <=#9/30/2026#"])],
        },
        {
          instruction: "On the same Criteria row, show only appointments that have no BilledDate yet.",
          hint: "In the Criteria row under BilledDate, type Is Null.",
          steps: [qcell("Query1", "BilledDate", "Criteria", "Is Null")],
        },
        {
          instruction: "Sort the results by AppointmentDate from oldest to newest.",
          hint: "In the Sort row under AppointmentDate, choose Ascending.",
          steps: [qcell("Query1", "AppointmentDate", "Sort", "Ascending")],
        },
        {
          instruction: "Run the query.",
          hint: "Query Design › Results › Run (the red exclamation point).",
          steps: [runQuery()],
        },
        {
          instruction: "Save the query as SeptemberUnbilledAppointments.",
          hint: SAVE_HINT,
          steps: [saveAs("SeptemberUnbilledAppointments")],
        },
      ],
    },
    {
      id: "access-id-m4-creating-queries-2",
      app: "access",
      title: "Show two providers' schedules",
      scenario:
        "The office manager wants one list of appointments for Dr. Rivera and Dr. Walsh, in date order. You edit the saved Provider Schedule query instead of building a new one.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 5,
      initial: accessDoc({ tables: m4Tables(), relationships: apptRelationships(), queries: [providerSchedule()] }),
      tasks: [
        {
          instruction: "Open the Provider Schedule query in Design View.",
          hint: "Right-click Provider Schedule in the Navigation Pane and choose Design View.",
          steps: [openIn("query", "Provider Schedule", "Design View")],
        },
        {
          instruction: "Show only appointments where ProviderLastName is Rivera.",
          hint: "In the Criteria row under ProviderLastName, type Rivera. Access adds the quotation marks.",
          steps: [qcell("Provider Schedule", "ProviderLastName", "Criteria", '"Rivera"')],
        },
        {
          instruction: "Also include appointments where ProviderLastName is Walsh.",
          hint: "In the or row under ProviderLastName (just below Criteria), type Walsh.",
          steps: [
            {
              ...qcell("Provider Schedule", "ProviderLastName", "Or", '"Walsh"'),
              alt: [{ kind: "type", target: "qcell:Provider Schedule.ProviderLastName.Criteria", value: ['"Rivera" Or "Walsh"', '"Walsh" Or "Rivera"'] }],
            },
          ],
        },
        {
          instruction: "Sort the results by AppointmentDate from oldest to newest.",
          hint: "In the Sort row under AppointmentDate, choose Ascending.",
          steps: [qcell("Provider Schedule", "AppointmentDate", "Sort", "Ascending")],
        },
        {
          instruction: "Run the query and save your changes.",
          hint: "Query Design › Results › Run, then press Ctrl+S.",
          anyOrder: true,
          steps: [runQuery(), saveObj()],
        },
      ],
    },
  ],

  "module-4::designing-forms": [
    {
      id: "access-id-m4-designing-forms-1",
      app: "access",
      title: "Build the patient registration form",
      scenario:
        "Three staff members type new patients straight into the table, and dates and insurance names come out five different ways. You build a registration form with plain labels and a drop-down list for insurance plans.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 9,
      initial: accessDoc({ tables: m4Tables() }),
      tasks: [
        {
          instruction: "Use the Form Wizard to build a Columnar form from the Patients table with these fields in this order: PatientFirstName, PatientLastName, DateOfBirth, PhoneNumber, Email, InsurancePlan. Title it PatientRegistrationForm.",
          hint: "Create › Forms › Form Wizard. Choose Table: Patients, move the six fields to Selected Fields in order with the > button, click Next, choose Columnar, click Next, type the title, and click Finish.",
          steps: [
            dlg("backstage:formWizard", {
              source: "Table: Patients",
              fields: "PatientFirstName,PatientLastName,DateOfBirth,PhoneNumber,Email,InsurancePlan",
              layout: "Columnar",
              title: "PatientRegistrationForm",
            }),
          ],
        },
        {
          instruction: "Switch the form to Design View and change the PatientFirstName label to First Name.",
          hint: "Home › Views › View › Design View. Double-click the PatientFirstName label (on the left of its box), type First Name, and press Enter.",
          steps: [
            cmd("view.switch", ["Design View", "Layout View"]),
            typed("label:PatientRegistrationForm.PatientFirstName", "First Name", {
              alt: [{ kind: "type", target: "prop:Caption", value: "First Name", requires: { selection: "ctl:PatientRegistrationForm.PatientFirstName_Label" } }],
            }),
          ],
        },
        {
          instruction: "Change the PatientLastName label to Last Name and the DateOfBirth label to Date of Birth.",
          hint: "Double-click each label, type the new text, and press Enter. You can also change Caption in the Property Sheet (F4).",
          anyOrder: true,
          steps: [
            typed("label:PatientRegistrationForm.PatientLastName", "Last Name", {
              alt: [{ kind: "type", target: "prop:Caption", value: "Last Name", requires: { selection: "ctl:PatientRegistrationForm.PatientLastName_Label" } }],
            }),
            typed("label:PatientRegistrationForm.DateOfBirth", "Date of Birth", {
              alt: [{ kind: "type", target: "prop:Caption", value: "Date of Birth", requires: { selection: "ctl:PatientRegistrationForm.DateOfBirth_Label" } }],
            }),
          ],
        },
        {
          instruction: "Change the InsurancePlan text box into a combo box.",
          hint: "Right-click the InsurancePlan box (not its label) and choose Change To › Combo Box.",
          steps: [
            cmd("form.changeTo", "Combo Box", { requires: { selection: "ctl:PatientRegistrationForm.InsurancePlan" }, selectHint: "Click the InsurancePlan box itself, not its label, first." }),
          ],
        },
        {
          instruction: "Make the combo box list the values BlueCross, Aetna and Medicare.",
          hint: "With the combo box selected, open the Property Sheet (F4). On the Data tab, set Row Source Type to Value List, then type \"BlueCross\";\"Aetna\";\"Medicare\" in Row Source.",
          anyOrder: true,
          steps: [
            prop("Row Source Type", "Value List", "ctl:PatientRegistrationForm.InsurancePlan", "Click the InsurancePlan combo box first."),
            typed("prop:Row Source", ["BlueCross", "Aetna", "Medicare"], { match: "all", requires: { selection: "ctl:PatientRegistrationForm.InsurancePlan" }, selectHint: "Click the InsurancePlan combo box first." }),
          ],
        },
        {
          instruction: "Save the form.",
          hint: "Press Ctrl+S, or click Save on the Quick Access Toolbar.",
          steps: [saveObj()],
        },
        {
          instruction: "Switch to Form View and register a new patient: First Name Grace, Last Name Adeyemi, Date of Birth 2/14/1992.",
          hint: "Home › Views › View › Form View. Click New (blank) record on the navigation bar at the bottom, then type each value and press Tab.",
          anyOrder: true,
          steps: [
            viewSwitch("Form View"),
            cell("Patients", "r13", "PatientFirstName", "Grace"),
            cell("Patients", "r13", "PatientLastName", "Adeyemi"),
            cell("Patients", "r13", "DateOfBirth", "2/14/1992"),
          ],
        },
      ],
    },
    {
      id: "access-id-m4-designing-forms-2",
      app: "access",
      title: "Fix the registration form",
      scenario:
        "The front desk supervisor reports that pressing Tab on the registration form jumps from First Name straight to Insurance Plan. You fix the tab order, mark the required fields, and add a button for starting a new registration.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 7,
      initial: accessDoc({ tables: m4Tables(), forms: [registrationForm()], open: [tab("form", "PatientRegistrationForm", "Form View")], active: "form:PatientRegistrationForm" }),
      tasks: [
        {
          instruction: "Switch the PatientRegistrationForm form to Design View.",
          hint: "Home › Views › View › Design View, or right-click the form's tab and choose Design View.",
          steps: [viewSwitch("Design View")],
        },
        {
          instruction: "Set the tab order so it follows the order of the fields on the form, top to bottom.",
          hint: "Form Design › Tools › Tab Order. Click Auto Order, then click OK.",
          steps: [dlg("backstage:tabOrder", { order: "PatientFirstName,PatientLastName,DateOfBirth,PhoneNumber,Email,InsurancePlan" })],
        },
        {
          instruction: "Add a label to the Form Header that reads * Required fields",
          hint: "Form Design › Controls › Label, click an empty spot in the Form Header section, type * Required fields, and press Enter.",
          steps: [cmd("form.tool", "Label"), typed("section:PatientRegistrationForm.Form Header", "* Required fields")],
        },
        {
          instruction: "Add a command button that goes to a new record. Show the text Add Patient on it and name it cmdAddPatient.",
          hint: "Form Design › Controls › Button, then click in the Form Footer. In the wizard choose Record Operations › Add New Record, click Next, choose Text and type Add Patient, click Next, type cmdAddPatient as the name, and click Finish.",
          steps: [dlg("backstage:buttonWizard", { action: "Add New Record", text: "Add Patient", name: "cmdAddPatient" })],
        },
        {
          instruction: "Save the form and switch to Form View.",
          hint: "Press Ctrl+S, then Home › Views › View › Form View.",
          anyOrder: true,
          steps: [saveObj(), viewSwitch("Form View")],
        },
        {
          instruction: "Click Add Patient, then register First Name Samuel, Last Name Ortiz, Date of Birth 11/30/1986.",
          hint: "Click the Add Patient button at the bottom of the form. Type each value in its box and press Tab to move on.",
          anyOrder: true,
          steps: [
            cmd("form.click", "PatientRegistrationForm.cmdAddPatient"),
            cell("Patients", "r13", "PatientFirstName", "Samuel"),
            cell("Patients", "r13", "PatientLastName", "Ortiz"),
            cell("Patients", "r13", "DateOfBirth", "11/30/1986"),
          ],
        },
      ],
    },
  ],

  "module-4::building-reports": [
    {
      id: "access-id-m4-building-reports-1",
      app: "access",
      title: "Build the monthly appointment summary",
      scenario:
        "Every month the office manager spends a Monday afternoon turning the appointment list into a printed summary by provider. You build an Access report that does it in seconds and save a PDF copy for the staff meeting.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 9,
      initial: accessDoc({ tables: m4Tables(), relationships: apptRelationships(), queries: [septemberQuery()] }),
      tasks: [
        {
          instruction: "Use the Report Wizard on the SeptemberAppointments query with these fields in this order: ProviderLastName, AppointmentDate, PatientLastName, PatientFirstName, VisitType. Group by ProviderLastName, sort by AppointmentDate ascending, use the Stepped layout, and title it MonthlyAppointmentSummary.",
          hint: "Create › Reports › Report Wizard. Choose Query: SeptemberAppointments and move the five fields over in order. Add ProviderLastName as the grouping level, pick AppointmentDate in the first sort box, keep Stepped, type the title, and click Finish.",
          steps: [
            dlg("backstage:reportWizard", {
              source: "Query: SeptemberAppointments",
              fields: "ProviderLastName,AppointmentDate,PatientLastName,PatientFirstName,VisitType",
              groups: "ProviderLastName",
              sorts: "AppointmentDate:asc",
              layout: "Stepped",
              title: "MonthlyAppointmentSummary",
            }),
          ],
        },
        {
          instruction: "Switch the report to Design View and change the title text to Monthly Appointment Summary.",
          hint: "Close Print Preview › Close Print Preview opens Design View (or Home › View › Design View). Double-click the title in the Report Header, type the new text, and press Enter.",
          steps: [
            cmd("view.switch", ["Design View", "Layout View"], { alt: [{ kind: "command", id: "preview.close" }] }),
            typed("label:MonthlyAppointmentSummary.Title", "Monthly Appointment Summary", {
              alt: [{ kind: "type", target: "prop:Caption", value: "Monthly Appointment Summary", requires: { selection: "ctl:MonthlyAppointmentSummary.Title" } }],
            }),
          ],
        },
        {
          instruction: "Give the ProviderLastName group a footer section.",
          hint: "Report Design › Grouping & Totals › Group & Sort. On the Group on ProviderLastName bar, click More and change without a footer section to with a footer section.",
          steps: [cmd("report.groupOption", "ProviderLastName|with a footer section")],
        },
        {
          instruction: "In the ProviderLastName Footer, add a text box that counts each provider's appointments with =Count([AppointmentDate])",
          hint: "Report Design › Controls › Text Box, click in the ProviderLastName Footer section, type =Count([AppointmentDate]), and press Enter.",
          steps: [
            typed("section:MonthlyAppointmentSummary.ProviderLastName Footer", spaced("=Count([AppointmentDate])", "=Count(*)"), {
              alt: [{ kind: "command", id: "report.totals", value: ["Count Records", "Count Values"], requires: { selection: ctl("MonthlyAppointmentSummary", "AppointmentDate") } }],
            }),
          ],
        },
        {
          instruction: "Preview the report and change its orientation to Landscape.",
          hint: "Home › Views › View › Print Preview, then Print Preview › Page Layout › Landscape.",
          steps: [viewSwitch("Print Preview"), cmd("pageSetup.landscape", undefined, { alt: [{ kind: "dialog", id: "pageSetup", values: { orientation: "Landscape" } }] })],
        },
        {
          instruction: "Save the report, then export it as a PDF named MonthlyAppointmentSummary_September2026.pdf in the Documents folder.",
          hint: "Press Ctrl+S. Then Print Preview › Data › PDF or XPS (or External Data › Export › PDF or XPS), type the file name, and click Publish.",
          anyOrder: true,
          steps: [
            saveObj(),
            dlg("backstage:exportPdf", { object: "MonthlyAppointmentSummary", file: [`${DOCS}\\MonthlyAppointmentSummary_September2026.pdf`, `${DOCS}\\MonthlyAppointmentSummary_September2026`] }, {
              alt: [{ kind: "dialog", id: "file.saveAs", values: { format: "PDF or XPS", name: "MonthlyAppointmentSummary_September2026" } }],
            }),
          ],
        },
      ],
    },
  ],

  "module-4::exporting-access-data": [
    {
      id: "access-id-m4-exporting-access-data-1",
      app: "access",
      title: "Send appointment data three ways",
      scenario:
        "Three people need the September appointments: the office manager wants Excel for a chart, the billing contractor needs a CSV file for her billing software, and the practice manager wants the summary report as a PDF.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 7,
      initial: accessDoc({
        tables: m4Tables(),
        relationships: apptRelationships(),
        queries: [septemberQuery()],
        reports: [monthlyReport()],
        savedExports: [{ name: "Monthly Appointments to Excel", object: "SeptemberAppointments", format: "Excel Workbook", file: "S:\\Lakeside Shared\\Appointments_Current.xlsx", description: "Office manager's monthly chart data" }],
      }),
      tasks: [
        {
          instruction: "Export the SeptemberAppointments query to an Excel workbook named SeptemberAppointments_Export.xlsx in the Documents folder, keeping its formatting and layout.",
          hint: "Click SeptemberAppointments in the Navigation Pane, then External Data › Export › Excel. Change the file name to SeptemberAppointments_Export.xlsx, check Export data with formatting and layout, and click OK.",
          steps: [dlg("backstage:exportExcel", { object: "SeptemberAppointments", file: `${DOCS}\\SeptemberAppointments_Export.xlsx`, formatting: true })],
        },
        {
          instruction: "Export the same query as a comma-delimited text file named SeptemberAppointments.csv with field names in the first row. Save the export steps as SeptemberAppointmentsToBilling.",
          hint: "External Data › Export › Text File. Change the file name to SeptemberAppointments.csv and click OK. Choose Delimited and Comma, check Include Field Names on First Row, and click Finish. Then check Save export steps, type the name, and click Save Export.",
          steps: [
            dlg("backstage:exportText", {
              object: "SeptemberAppointments",
              file: `${DOCS}\\SeptemberAppointments.csv`,
              format: "Delimited",
              delimiter: "Comma",
              headings: true,
              saveSteps: true,
              saveName: "SeptemberAppointmentsToBilling",
            }),
          ],
        },
        {
          instruction: "Run the saved export named Monthly Appointments to Excel.",
          hint: "External Data › Export › Saved Exports. Click Monthly Appointments to Excel, then click Run.",
          steps: [cmd("external.runSavedExport", "Monthly Appointments to Excel")],
        },
        {
          instruction: "Export the MonthlyAppointmentSummary report as a PDF file named MonthlyAppointmentSummary.pdf in the Documents folder.",
          hint: "Click MonthlyAppointmentSummary in the Navigation Pane, then External Data › Export › PDF or XPS, and click Publish.",
          steps: [dlg("backstage:exportPdf", { object: "MonthlyAppointmentSummary", file: `${DOCS}\\MonthlyAppointmentSummary.pdf` })],
        },
      ],
    },
  ],
};

export const accessSims: Record<string, SimDefinition[]> = {
  ...module1,
  ...module3,
  ...module4,
};

void LOOKUP_SOURCES;
void PHONE_MASK;
void ONEDRIVE;
void supplies;
void regPatients;
