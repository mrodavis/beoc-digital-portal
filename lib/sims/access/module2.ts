import type { SimDefinition } from "@/types/sim";
import { accessDoc } from "@/components/sim/apps/access/types";
import { cell, cmd, designField, dlg, openObj, prop, rowOf, saveAs, typed, viewSwitch } from "@/components/sim/apps/access/simkit";
import { appointments, patients, providers } from "./lakeside";

/*
 * Microsoft Office (INFO3033), Access Module 2: Tables, data types and relationships.
 * Lakeside Medical Associates; every person and number is fictional.
 */

const SAVE_HINT = "Press Ctrl+S (or File › Save), type the name in the Save As box, and click OK.";
const f = (name: string) => designField("Table1", name);

const relAppts = appointments();

export const accessModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::creating-tables-and-data-types": [
    {
      id: "access-ms-m2-creating-tables-1",
      app: "access",
      title: "Build a supply table that rejects bad data",
      scenario:
        "The old supply list let staff type 12, twelve and 12 boxes into the same column. You build the Supplies table in Design View so that wrong data is refused at the moment it is typed.",
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
            cmd("field.dataType", "AutoNumber", { requires: { selection: f("ItemID") }, selectHint: "Click the ItemID row first." }),
            cmd("design.primaryKey", undefined, { requires: { selection: f("ItemID") }, selectHint: "Click the ItemID row first." }),
          ],
        },
        {
          instruction: "Add an ItemName field (Short Text) with a field size of 60, and make it required.",
          hint: "Type ItemName in the next empty Field Name cell. In Field Properties, set Field Size to 60 and Required to Yes.",
          anyOrder: true,
          steps: [
            typed("fname:Table1.new", "ItemName"),
            prop("Field Size", "60", f("ItemName"), "Click the ItemName row first."),
            prop("Required", "Yes", f("ItemName"), "Click the ItemName row first."),
          ],
        },
        {
          instruction: "Add a Category field (Short Text) with the default value Medical.",
          hint: "Type Category in the next empty Field Name cell. In Field Properties, type Medical in Default Value.",
          steps: [typed("fname:Table1.new", "Category"), prop("Default Value", ['"Medical"', "Medical"], f("Category"), "Click the Category row first.")],
        },
        {
          instruction: "Add a required Quantity field (Number) with the validation rule >=0 and the validation text Quantity cannot be negative.",
          hint: "Type Quantity in the next empty row and choose Number as its data type. In Field Properties, set Required to Yes, Validation Rule to >=0, and type the message in Validation Text.",
          anyOrder: true,
          steps: [
            typed("fname:Table1.new", "Quantity"),
            cmd("field.dataType", "Number", { requires: { selection: f("Quantity") }, selectHint: "Click the Quantity row first." }),
            prop("Required", "Yes", f("Quantity"), "Click the Quantity row first."),
            prop("Validation Rule", ">=0", f("Quantity"), "Click the Quantity row first."),
            prop("Validation Text", "Quantity cannot be negative.", f("Quantity"), "Click the Quantity row first."),
          ],
        },
        {
          instruction: "Add UnitCost (Currency), ReorderLevel (Number) and LastOrdered (Date/Time).",
          hint: "Type each field name in the next empty row, then choose its data type in the Data Type list.",
          anyOrder: true,
          steps: (
            [
              ["UnitCost", "Currency"],
              ["ReorderLevel", "Number"],
              ["LastOrdered", "Date/Time"],
            ] as const
          ).flatMap(([name, type]) => [
            typed("fname:Table1.new", name),
            cmd("field.dataType", type, { requires: { selection: f(name) }, selectHint: `Click the ${name} row first.` }),
          ]),
        },
        {
          instruction: "Save the table as Supplies.",
          hint: SAVE_HINT,
          steps: [saveAs("Supplies")],
        },
        {
          instruction: "Switch to Datasheet View and enter the first item: ItemName Exam Gloves (Box), Quantity 24, UnitCost 8.95, ReorderLevel 10, LastOrdered 10/1/2026. Leave Category as Medical.",
          hint: "Home › Views › View › Datasheet View. Click the ItemName cell in the (New) row, type each value, and press Tab to move on.",
          anyOrder: true,
          steps: [
            viewSwitch("Datasheet View"),
            cell("Supplies", "r1", "ItemName", "Exam Gloves (Box)"),
            cell("Supplies", "r1", "Quantity", "24"),
            cell("Supplies", "r1", "UnitCost", "8.95"),
            cell("Supplies", "r1", "ReorderLevel", "10"),
            cell("Supplies", "r1", "LastOrdered", "10/1/2026"),
          ],
        },
      ],
    },
  ],

  "module-2::relationships-and-referential-integrity": [
    {
      id: "access-ms-m2-relationships-1",
      app: "access",
      title: "Make the database enforce its links",
      scenario:
        "The Patients, Providers and Appointments tables are well designed but not connected, so nothing stops an appointment for a patient who does not exist. You create the relationships with referential integrity, then work with the linked data.",
      fileName: "Lakeside_Appointments.accdb",
      minutes: 8,
      initial: accessDoc({ tables: [patients(), providers(), relAppts] }),
      tasks: [
        {
          instruction: "Open the Relationships window and add the Patients, Providers and Appointments tables.",
          hint: "Database Tools › Relationships › Relationships. In the Add Tables pane, double-click each of the three tables.",
          anyOrder: true,
          steps: [cmd("dbtools.relationships"), cmd("relationships.addTable", "Patients"), cmd("relationships.addTable", "Providers"), cmd("relationships.addTable", "Appointments")],
        },
        {
          instruction: "Create a one-to-many relationship from PatientID in Patients to PatientID in Appointments. Enforce referential integrity and leave cascade delete off.",
          hint: "Drag PatientID from the Patients box onto PatientID in the Appointments box. Check Enforce Referential Integrity only, confirm the type reads One-To-Many, and click Create.",
          steps: [dlg("backstage:editRelationship", { table: "Patients", field: "PatientID", relatedTable: "Appointments", relatedField: "PatientID", enforce: true, cascadeDelete: false })],
        },
        {
          instruction: "Create a one-to-many relationship from ProviderID in Providers to ProviderID in Appointments, with referential integrity enforced.",
          hint: "Drag ProviderID from the Providers box onto ProviderID in the Appointments box, check Enforce Referential Integrity, and click Create.",
          steps: [dlg("backstage:editRelationship", { table: "Providers", field: "ProviderID", relatedTable: "Appointments", relatedField: "ProviderID", enforce: true })],
        },
        {
          instruction: "Open the Appointments table and add an appointment for PatientID 1003 with ProviderID 2 on 10/27/2026, VisitType Follow-Up.",
          hint: "Double-click Appointments. In the (New) row, skip AppointmentID (Access fills it in), type each value, and press Tab to move on.",
          anyOrder: true,
          steps: [
            openObj("table", "Appointments"),
            cell("Appointments", "r17", "PatientID", "1003"),
            cell("Appointments", "r17", "ProviderID", "2"),
            cell("Appointments", "r17", "AppointmentDate", "10/27/2026"),
            cell("Appointments", "r17", "VisitType", "Follow-Up"),
          ],
        },
        {
          instruction: "The patient with AppointmentID 12 canceled. Delete that appointment record.",
          hint: "Click the record selector to the left of AppointmentID 12, press Delete (Home › Records › Delete), and click Yes.",
          steps: [cmd("record.delete", `Appointments.${rowOf(relAppts, "AppointmentID", 12)}`)],
        },
      ],
    },
  ],
};
