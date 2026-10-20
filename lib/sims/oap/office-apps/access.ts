import type { SimDefinition } from "@/types/sim";
import { accessDoc, type AccForm, type AccQuery, type AccReport, type AccTable } from "@/components/sim/apps/access/types";
import {
  cell,
  cmd,
  colSel,
  ctl,
  designField,
  dlg,
  fld,
  openIn,
  openObj,
  prop,
  saveAs,
  saveObj,
  table,
  typed,
  viewSwitch,
} from "@/components/sim/apps/access/simkit";
import { patients } from "@/lib/sims/access/lakeside";

/*
 * Office Productivity Applications, Module 8: Database Applications with Access.
 * Lakeside Medical Associates; every person and number is fictional.
 */

const SAVE_HINT = "Press Ctrl+S (or File › Save), type the name in the Save As box, and click OK.";

/** The old flat list: one row per appointment, patient details retyped on every row. */
const appointmentList = (): AccTable =>
  table(
    "AppointmentList",
    [fld.auto("ApptID"), fld.text("PatientName", 60), fld.text("Address", 120), fld.text("Phone", 14), fld.date("ApptDate"), fld.text("Provider", 30), fld.text("Reason", 60)],
    [
      [1, "Jane Okafor", "45 Lincoln Pl, Brooklyn NY 11217", "(718) 555-0116", "2026-03-02", "Dr. Walsh", "Annual physical"],
      [2, "Marcus Bell", "310 Fulton St, Brooklyn NY 11201", "(347) 555-0128", "2026-03-04", "Dr. Rivera", "Follow-up"],
      [3, "Jane Okafor", "45 Lincoln Pl, Brooklyn NY 11217", "(718) 555-0116", "2026-04-15", "Dr. Walsh", "Sick visit"],
      [4, "Ana Lima", "88 Court St, Brooklyn NY 11201", "(917) 555-0171", "2026-04-20", "Dr. Chen", "Consultation"],
      [5, "Jane Okafor", "45 Lincoln Pl, Brooklyn NY 11217", "(718) 555-0116", "2026-05-27", "Dr. Walsh", "Follow-up"],
      [6, "Marcus Bell", "310 Fulton St, Brooklyn NY 11201", "(347) 555-0128", "2026-06-10", "Dr. Rivera", "Follow-up"],
      [7, "Jane Okafor", "1200 Ocean Ave, Brooklyn NY 11230", "(718) 555-0116", "2026-07-08", "Dr. Walsh", "Follow-up"],
      [8, "Ana Lima", "88 Court St, Brooklyn NY 11201", "(917) 555-0171", "2026-08-19", "Dr. Chen", "Follow-up"],
      [9, "Jane Okafor", "45 Lincoln Pl, Brooklyn NY 11217", "(718) 555-0116", "2026-09-23", "Dr. Walsh", "Sick visit"],
      [10, "Marcus Bell", "310 Fulton St, Brooklyn NY 11201", "(347) 555-0128", "2026-10-05", "Dr. Rivera", "Annual physical"],
    ],
  );

/** A coworker's first attempt at a Patients table: no primary key yet, and Address holds four facts. */
const draftPatients = (): AccTable =>
  table(
    "Patients",
    [fld.num("PatientID"), fld.text("LastName", 50), fld.text("FirstName", 50), fld.text("Address", 120), fld.text("Phone", 14)],
    [
      [1, "Okafor", "Jane", "1200 Ocean Ave, Brooklyn NY 11230", "(718) 555-0116"],
      [2, "Bell", "Marcus", "310 Fulton St, Brooklyn NY 11201", "(347) 555-0128"],
      [3, "Lima", "Ana", "88 Court St, Brooklyn NY 11201", "(917) 555-0171"],
    ],
    { pk: [] },
  );

const splitAppointments = (): AccTable =>
  table(
    "Appointments",
    [fld.auto("ApptID"), fld.num("PatientID"), fld.date("ApptDate"), fld.text("Provider", 30), fld.text("Reason", 60)],
    [
      [1, 1, "2026-03-02", "Dr. Walsh", "Annual physical"],
      [2, 2, "2026-03-04", "Dr. Rivera", "Follow-up"],
      [3, 1, "2026-04-15", "Dr. Walsh", "Sick visit"],
      [4, 3, "2026-04-20", "Dr. Chen", "Consultation"],
      [5, 1, "2026-05-27", "Dr. Walsh", "Follow-up"],
    ],
  );

const flatList = appointmentList();

const windowPatients = patients();
const patientEntry = (): AccForm => ({
  name: "Patient Entry",
  recordSource: "Patients",
  layout: "Columnar",
  controls: [
    { id: "Title", kind: "label", caption: "Patient Entry", section: "Form Header", order: 0, fontSize: 18 },
    ...["PatientID", "LastName", "FirstName", "DateOfBirth", "Phone", "City", "InsurancePlan"].map((f, i) => ({ id: f, kind: "textbox" as const, source: f, label: f, section: "Detail", order: i + 1 })),
  ],
  saved: true,
  allowAdditions: true,
  navigationButtons: true,
});
const patientList = (): AccReport => ({
  name: "Patient List",
  recordSource: "Patients",
  fields: ["LastName", "FirstName", "Phone", "City"],
  sorts: [{ field: "LastName", dir: "asc" }],
  layout: "Tabular",
  orientation: "Portrait",
  pageSize: "Letter",
  margins: "Normal",
  title: "Patient List",
  pageNumbers: { format: "Page N of M", position: "Bottom of Page [Footer]", align: "Right" },
  dateTime: { date: "Long Date" },
  saved: true,
});
const brooklynQuery = (): AccQuery => ({
  name: "Query1",
  type: "Select",
  tables: ["Patients"],
  cols: [
    { field: "LastName", table: "Patients", show: true, sort: "Ascending" },
    { field: "FirstName", table: "Patients", show: true },
    { field: "City", table: "Patients", show: true, criteria: '"Brooklyn"' },
  ],
  saved: true,
});

const NEW_FIELDS: [string, string][] = [
  ["Quantity", "Number"],
  ["UnitCost", "Currency"],
  ["LastOrdered", "Date/Time"],
];

export const accessSims: Record<string, SimDefinition[]> = {
  "module-8::database-principles": [
    {
      id: "access-oa-m8-database-principles-1",
      app: "access",
      title: "Store each fact once",
      scenario:
        "The old appointment list repeats a patient's address on every visit, and Jane Okafor now has two different addresses on file. You look at the repetition, let Access suggest a split, and finish the Patients table a coworker started.",
      fileName: "Lakeside_Patients.accdb",
      minutes: 7,
      initial: accessDoc({ tables: [flatList, draftPatients(), splitAppointments()], open: [{ id: "table:AppointmentList", kind: "table", name: "AppointmentList", view: "Datasheet View" }], active: "table:AppointmentList" }),
      tasks: [
        {
          instruction: "Sort the AppointmentList table by PatientName from A to Z, so each patient's repeated rows sit together.",
          hint: "Click any cell in the PatientName column, then Home › Sort & Filter › Ascending.",
          steps: [cmd("home.sortAsc", undefined, { requires: { selection: colSel(flatList, "PatientName") }, selectHint: "Click a cell in the PatientName column first." })],
        },
        {
          instruction: "Run the Table Analyzer on the AppointmentList table and let the wizard decide which fields go in which tables.",
          hint: "Database Tools › Analyze › Analyze Table. Click Next twice, select AppointmentList, click Next, choose Yes, let the wizard decide, and click Finish.",
          steps: [dlg("backstage:analyzeTable", { table: "AppointmentList", decision: "Yes, let the wizard decide." })],
        },
        {
          instruction: "Open the Patients table in Design View and set PatientID as the primary key.",
          hint: "Right-click Patients in the Navigation Pane and choose Design View. Click the PatientID row, then Table Design › Tools › Primary Key.",
          steps: [
            openIn("table", "Patients", "Design View"),
            cmd("design.primaryKey", undefined, { requires: { selection: designField("Patients", "PatientID") }, selectHint: "Click the PatientID row first." }),
          ],
        },
        {
          instruction: "Address holds the street, city, state and ZIP code in one field. Add three new Short Text fields named City, State and ZIP so each fact can have its own field.",
          hint: "Click the first empty Field Name cell, type City, and press Enter. Do the same for State and ZIP. Short Text is the default data type.",
          anyOrder: true,
          steps: [typed("fname:Patients.new", "City"), typed("fname:Patients.new", "State"), typed("fname:Patients.new", "ZIP")],
        },
        {
          instruction: "Save the table design.",
          hint: "Press Ctrl+S, or click Save on the Quick Access Toolbar.",
          steps: [saveObj()],
        },
        {
          instruction: "Link the tables: relate PatientID in Patients to PatientID in Appointments with referential integrity enforced.",
          hint: "Database Tools › Relationships › Relationships. Add Patients and Appointments, drag PatientID from Patients onto PatientID in Appointments, check Enforce Referential Integrity, and click Create.",
          steps: [
            cmd("dbtools.relationships"),
            dlg("backstage:editRelationship", { table: "Patients", field: "PatientID", relatedTable: "Appointments", relatedField: "PatientID", enforce: true }),
          ],
        },
      ],
    },
  ],

  "module-8::the-access-window": [
    {
      id: "access-oa-m8-the-access-window-1",
      app: "access",
      title: "Find your way around the database",
      scenario:
        "You are opening the Lakeside Medical Associates database for the first time. You learn what each object in the Navigation Pane does by opening a table, a form and a report, and you tidy up one badly named query.",
      fileName: "Lakeside_Practice.accdb",
      minutes: 6,
      initial: accessDoc({ tables: [windowPatients], forms: [patientEntry()], reports: [patientList()], queries: [brooklynQuery()] }),
      tasks: [
        {
          instruction: "Open the Patients table in Datasheet View, then switch it to Design View to see its structure.",
          hint: "Double-click Patients in the Navigation Pane. Then Home › Views › View › Design View.",
          steps: [openObj("table", "Patients"), viewSwitch("Design View")],
        },
        {
          instruction: "Close the Patients table.",
          hint: "Click the X at the right end of the Patients tab, or press Ctrl+W.",
          steps: [cmd("tab.close")],
        },
        {
          instruction: "Open the Patient Entry form and go to the last record.",
          hint: "Double-click Patient Entry in the Navigation Pane, then click Last record on the navigation bar at the bottom of the form.",
          steps: [openObj("form", "Patient Entry"), cmd("record.nav", "Last")],
        },
        {
          instruction: "Use the form to add a new patient: LastName Banerjee, FirstName Asha, DateOfBirth 4/9/1991.",
          hint: "Click New (blank) record on the navigation bar, type each value, and press Tab to move to the next box.",
          anyOrder: true,
          steps: [cell("Patients", "r13", "LastName", "Banerjee"), cell("Patients", "r13", "FirstName", "Asha"), cell("Patients", "r13", "DateOfBirth", "4/9/1991")],
        },
        {
          instruction: "Open the Patient List report in Print Preview.",
          hint: "Right-click Patient List in the Navigation Pane and choose Print Preview.",
          steps: [openIn("report", "Patient List", "Print Preview")],
        },
        {
          instruction: "Rename the query Query1 to Brooklyn Patients.",
          hint: "Right-click Query1 in the Navigation Pane, choose Rename, type Brooklyn Patients, and press Enter.",
          steps: [typed("nav:query:Query1", "Brooklyn Patients")],
        },
      ],
    },
  ],

  "module-8::building-tables-forms-reports": [
    {
      id: "access-oa-m8-building-tables-forms-reports-1",
      app: "access",
      title: "Build the supply inventory",
      scenario:
        "The old supply list let people type 12, twelve and 12 boxes into the same column. You build a Supplies table whose data types reject that, then a form for entering deliveries and a report that fits on the page.",
      fileName: "Lakeside Supplies.accdb",
      minutes: 10,
      initial: accessDoc({ tables: [] }),
      tasks: [
        {
          instruction: "Create a table in Design View whose first field, ItemID, uses the AutoNumber data type and is the primary key.",
          hint: "Create › Tables › Table Design. Type ItemID, choose AutoNumber in the Data Type list, then Table Design › Tools › Primary Key.",
          steps: [
            cmd("create.tableDesign"),
            typed("fname:Table1.new", "ItemID"),
            cmd("field.dataType", "AutoNumber", { requires: { selection: designField("Table1", "ItemID") }, selectHint: "Click the ItemID row first." }),
            cmd("design.primaryKey", undefined, { requires: { selection: designField("Table1", "ItemID") }, selectHint: "Click the ItemID row first." }),
          ],
        },
        {
          instruction: "Add an ItemName field (Short Text) and make it required.",
          hint: "Type ItemName in the next empty Field Name cell. In Field Properties, set Required to Yes.",
          steps: [typed("fname:Table1.new", "ItemName"), prop("Required", "Yes", designField("Table1", "ItemName"), "Click the ItemName row first.")],
        },
        {
          instruction: "Add a Category field (Short Text) with the default value Medical.",
          hint: "Type Category in the next empty Field Name cell. In Field Properties, type Medical in Default Value.",
          steps: [typed("fname:Table1.new", "Category"), prop("Default Value", ['"Medical"', "Medical"], designField("Table1", "Category"), "Click the Category row first.")],
        },
        {
          instruction: "Add Quantity (Number), UnitCost (Currency) and LastOrdered (Date/Time).",
          hint: "Type each field name in the next empty row, then choose its data type in the Data Type list.",
          anyOrder: true,
          steps: NEW_FIELDS.flatMap(([name, type]) => [
            typed("fname:Table1.new", name),
            cmd("field.dataType", type, { requires: { selection: designField("Table1", name) }, selectHint: `Click the ${name} row first.` }),
          ]),
        },
        {
          instruction: "Save the table as Supplies.",
          hint: SAVE_HINT,
          steps: [saveAs("Supplies")],
        },
        {
          instruction: "Create a form for the Supplies table in one click, then move Quantity above Category to match the delivery slip.",
          hint: "Create › Forms › Form. In Layout View, click the Quantity box and choose Arrange › Move › Move Up (or right-click › Move Up).",
          steps: [
            cmd("create.form"),
            cmd("arrange.moveUp", undefined, { requires: { selection: ctl("Supplies", "Quantity") }, selectHint: "Click the Quantity box first." }),
          ],
        },
        {
          instruction: "Save the form as Supply Entry.",
          hint: SAVE_HINT,
          steps: [saveAs("Supply Entry")],
        },
        {
          instruction: "Create a report for the Supplies table in one click, then preview it in Landscape orientation.",
          hint: "Click Supplies in the Navigation Pane, then Create › Reports › Report. Then Home › View › Print Preview, and Print Preview › Page Layout › Landscape.",
          steps: [
            cmd("create.report", undefined, { requires: { selection: "nav:table:Supplies" }, selectHint: "Click the Supplies table in the Navigation Pane first." }),
            viewSwitch("Print Preview"),
            cmd("pageSetup.landscape", undefined, { alt: [{ kind: "dialog", id: "pageSetup", values: { orientation: "Landscape" } }] }),
          ],
        },
      ],
    },
  ],
};
