import type { SimDefinition } from "@/types/sim";
import { accessDoc, type AccTable } from "@/components/sim/apps/access/types";
import { cell, cmd, colSel, designField, fld, openIn, openObj, saveAs, saveObj, table, typed, viewSwitch } from "@/components/sim/apps/access/simkit";

/*
 * Microsoft Office (INFO3033), Access Module 1: Getting started and design.
 * Lakeside Medical Associates; every person and number is fictional.
 */

/** The flat appointment spreadsheet, imported as-is: provider names retyped on every row. */
const appointmentRecords = (): AccTable =>
  table(
    "Appointment Records",
    [fld.auto("RecordID"), fld.text("PatientName", 60), fld.text("Phone", 14), fld.date("ApptDate"), fld.text("ProviderName", 40), fld.text("Specialty", 40), fld.text("Reason", 60)],
    [
      [1, "Okafor, Jane", "(718) 555-0116", "2026-09-01", "Karen Walsh", "Family Medicine", "Annual physical"],
      [2, "Bell, Marcus", "(347) 555-0128", "2026-09-02", "Daniel Rivera", "Internal Medicine", "Follow-up"],
      [3, "Lima, Ana", "(917) 555-0171", "2026-09-03", "Lisa Chen", "Cardiology", "Consultation"],
      [4, "Okafor, Jane", "(718) 555-0116", "2026-09-10", "Karen Walsh", "Family Medicine", "Sick visit"],
      [5, "Price, Owen", "(646) 555-0139", "2026-09-14", "Daniel Rivera", "Internal Medicine", "New patient"],
      [6, "Bell, Marcus", "(347) 555-0128", "2026-09-21", "Daniel Rivera", "Internal Med", "Follow-up"],
      [7, "Lima, Ana", "(917) 555-0171", "2026-10-02", "Lisa Chen", "Cardiology", "Follow-up"],
      [8, "Price, Owen", "(646) 555-0139", "2026-10-09", "Karen Walsh", "Family Medicine", "Sick visit"],
    ],
  );

/** A first try at Patients: Phone is the primary key and FullName holds two facts. */
const phoneKeyedPatients = (): AccTable =>
  table(
    "Patients",
    [fld.num("PatientID"), fld.text("FullName", 60), fld.text("Phone", 14), fld.date("DateOfBirth")],
    [
      [1, "Jane Okafor", "(718) 555-0116", "1984-06-02"],
      [2, "Marcus Bell", "(347) 555-0128", "1979-01-23"],
      [3, "Ana Lima", "(917) 555-0171", "1992-11-08"],
      [4, "Owen Price", "(646) 555-0139", "2000-03-30"],
    ],
    { pk: ["Phone"] },
  );

const records = appointmentRecords();

export const accessModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::getting-started-with-access": [
    {
      id: "access-ms-m1-getting-started-1",
      app: "access",
      title: "Explore a template database",
      scenario:
        "Before you build anything for the front office, you explore a ready-made Access database to see how its tables, forms and reports work together. You create it from the Contacts template and add the first contact.",
      fileName: "Office Contacts.accdb",
      minutes: 6,
      initial: accessDoc({ noDb: true, tables: [] }),
      tasks: [
        {
          instruction: "Create a database from the Contacts template named Office Contacts.",
          hint: "On the Access start screen, click the Contacts template. Type Office Contacts in the File Name box and click Create.",
          steps: [cmd("file.new", ["Contacts|Office Contacts", "Contacts|Office Contacts.accdb"])],
        },
        {
          instruction: "Open the Contacts table, then switch it to Design View to see its fields and data types.",
          hint: "Double-click Contacts in the Navigation Pane, then Home › Views › View › Design View.",
          steps: [openObj("table", "Contacts"), viewSwitch("Design View")],
        },
        {
          instruction: "Close the Contacts table.",
          hint: "Click the X at the right end of the Contacts tab, or press Ctrl+W.",
          steps: [cmd("tab.close")],
        },
        {
          instruction: "Open the Contact Details form and add a contact: Company Lakeside Medical Associates, Last Name Reyes, First Name Monica, Business Phone (718) 555-0150.",
          hint: "Double-click Contact Details in the Navigation Pane. Type each value in its box and press Tab to move on.",
          anyOrder: true,
          steps: [
            openObj("form", "Contact Details"),
            cell("Contacts", "r1", "Company", "Lakeside Medical Associates"),
            cell("Contacts", "r1", "Last Name", "Reyes"),
            cell("Contacts", "r1", "First Name", "Monica"),
            cell("Contacts", "r1", "Business Phone", "(718) 555-0150"),
          ],
        },
        {
          instruction: "Open the Contact Phone List report in Print Preview to see the contact you added.",
          hint: "Right-click Contact Phone List in the Navigation Pane and choose Print Preview.",
          steps: [openIn("report", "Contact Phone List", "Print Preview")],
        },
      ],
    },
  ],

  "module-1::database-design-principles": [
    {
      id: "access-ms-m1-database-design-principles-1",
      app: "access",
      title: "Give each kind of thing its own table",
      scenario:
        "The appointment records were imported from a spreadsheet as one flat table, so every provider's name and specialty is retyped on each row, and one row already says Internal Med. You start rebuilding the design with separate tables and stable keys.",
      fileName: "Lakeside_Appointments.accdb",
      minutes: 8,
      initial: accessDoc({
        tables: [records, phoneKeyedPatients()],
        open: [{ id: "table:Appointment Records", kind: "table", name: "Appointment Records", view: "Datasheet View" }],
        active: "table:Appointment Records",
      }),
      tasks: [
        {
          instruction: "Sort Appointment Records by ProviderName from A to Z to see how often each provider is retyped.",
          hint: "Click any cell in the ProviderName column, then Home › Sort & Filter › Ascending.",
          steps: [cmd("home.sortAsc", undefined, { requires: { selection: colSel(records, "ProviderName") }, selectHint: "Click a cell in the ProviderName column first." })],
        },
        {
          instruction: "Create a new table in Design View with a ProviderID field that uses the AutoNumber data type and is the primary key.",
          hint: "Create › Tables › Table Design. Type ProviderID, choose AutoNumber in the Data Type list, then Table Design › Tools › Primary Key.",
          steps: [
            cmd("create.tableDesign"),
            typed("fname:Table1.new", "ProviderID"),
            cmd("field.dataType", "AutoNumber", { requires: { selection: designField("Table1", "ProviderID") }, selectHint: "Click the ProviderID row first." }),
            cmd("design.primaryKey", undefined, { requires: { selection: designField("Table1", "ProviderID") }, selectHint: "Click the ProviderID row first." }),
          ],
        },
        {
          instruction: "Add ProviderLastName, ProviderFirstName and Specialty fields (all Short Text), then save the table as Providers.",
          hint: "Type each name in the next empty Field Name cell (Short Text is the default). Then press Ctrl+S, type Providers, and click OK.",
          anyOrder: true,
          steps: [typed("fname:Table1.new", "ProviderLastName"), typed("fname:Table1.new", "ProviderFirstName"), typed("fname:Table1.new", "Specialty"), saveAs("Providers")],
        },
        {
          instruction: "Phone numbers change and can be shared, so they make a poor key. Open Patients in Design View and make PatientID the primary key instead of Phone.",
          hint: "Right-click Patients in the Navigation Pane and choose Design View. Click the PatientID row, then Table Design › Tools › Primary Key.",
          steps: [
            openIn("table", "Patients", "Design View"),
            cmd("design.primaryKey", undefined, { requires: { selection: designField("Patients", "PatientID") }, selectHint: "Click the PatientID row first." }),
          ],
        },
        {
          instruction: "FullName holds two facts, so the list cannot be sorted by surname. Add LastName and FirstName fields (Short Text) to hold them separately.",
          hint: "Click the first empty Field Name cell, type LastName, and press Enter. Then type FirstName in the next empty cell. Short Text is the default data type.",
          anyOrder: true,
          steps: [typed("fname:Patients.new", "LastName"), typed("fname:Patients.new", "FirstName")],
        },
        {
          instruction: "Save the Patients table design.",
          hint: "Press Ctrl+S, or click Save on the Quick Access Toolbar.",
          steps: [saveObj()],
        },
      ],
    },
  ],
};

