import { Lesson } from "@/types/lesson";

export const accessModule2Lessons: Lesson[] = [
  {
    slug: "creating-tables-and-data-types",
    title: "Creating Tables and Choosing Data Types",
    description:
      "Build tables in Design view and choose data types that make invalid entries impossible rather than merely discouraged.",
    duration: "24 min",
    objectives: [
      "Create a table in Design view and set a primary key",
      "Choose the appropriate data type for each field",
      "Set field properties including Required, Default Value, and Field Size",
      "Explain why identifiers belong in text fields",
    ],
    sections: [
      {
        heading: "Data types are your first line of defence",
        blocks: [
          {
            type: "scenario",
            role: "You build a supply inventory database at Lakeside Medical Associates.",
            text: "You set every field to Short Text because it accepts anything. Six months later the quantity field contains '12', 'twelve', '12 boxes', and 'approx 12'. Nothing can be summed, sorted, or reported on, and the database cannot answer the one question it was built for.",
            task: "Choose types that reject wrong data at the moment of entry.",
          },
          {
            type: "paragraph",
            text: "A data type constrains what a field will accept. A Number field will not take 'twelve'. A Date/Time field will not take 'next Tuesday'. Choosing correctly at design time prevents a category of problem that is extremely tedious to repair afterwards.",
          },
          {
            type: "table",
            caption: "Access data types",
            columns: ["Type", "Use for", "Note"],
            rows: [
              ["Short Text", "Names, addresses, codes, identifiers", "Up to 255 characters"],
              ["Long Text", "Notes and comments", "Sortable but not efficiently indexed"],
              ["Number", "Quantities you will calculate with", "Set an appropriate Field Size"],
              ["Currency", "Money", "Avoids the rounding errors of floating-point numbers"],
              ["Date/Time", "Dates and times", "Enables date arithmetic and correct sorting"],
              ["Yes/No", "Two-state values", "Stored as true/false"],
              ["AutoNumber", "Primary keys", "Access assigns a unique value automatically"],
              ["Lookup", "A value chosen from a list or another table", "Enforces consistent entry"],
              ["Attachment", "Files linked to a record", "Grows the file quickly; use sparingly"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Store an identifier you would never calculate with — a phone number, a ZIP code, a patient ID — as Short Text, not Number. A Number field strips leading zeros, so ZIP code 07030 becomes 7030. The test is simple: if you would never add two of these values together, it is text.",
          },
          {
            type: "table",
            caption: "Field properties worth setting",
            columns: ["Property", "Does", "Use it to"],
            rows: [
              ["Required", "Refuses to save a record with this field empty", "Stop half-entered records"],
              ["Default Value", "Pre-fills a value", "Reduce typing on fields that are usually the same"],
              ["Field Size", "Caps the length or numeric range", "Prevent a 200-character state abbreviation"],
              ["Validation Rule", "Rejects entries failing a condition", "Refuse a negative quantity"],
              ["Validation Text", "The message shown when the rule fails", "Explain what the user should do instead"],
              ["Input Mask", "Guides entry into a fixed format", "Phone numbers and dates"],
              ["Indexed", "Speeds searching and can enforce uniqueness", "Fields you search or sort on constantly"],
            ],
          },
          {
            type: "worked-example",
            title: "Building the supply inventory table",
            task: "Create a table recording items, quantities, costs, and reorder levels, designed so bad data cannot be entered.",
            steps: [
              {
                move: "Create the table in Design view, not by typing into a datasheet.",
                why: "Design view makes you name each field and choose its type deliberately. Building by typing lets Access guess, and it guesses Short Text far too often — which is exactly how the scenario above happens.",
              },
              {
                move: "Add ItemID as AutoNumber and set it as the primary key.",
                why: "AutoNumber guarantees uniqueness with no effort and carries no meaning, which is what a key should be. Access will not enforce record uniqueness without a primary key.",
              },
              {
                move: "Set types by purpose: Quantity as Number, UnitCost as Currency, LastOrdered as Date/Time.",
                why: "Each type rejects data that does not belong. Currency specifically avoids the floating-point rounding that makes money columns fail to reconcile by a cent — a real problem with ordinary decimal fields.",
              },
              {
                move: "Add a Validation Rule of >=0 on Quantity, with Validation Text explaining it.",
                why: "A negative quantity on hand is meaningless. Catching it at entry is far cheaper than discovering it in a report, and the Validation Text is what makes the rejection useful rather than confusing.",
              },
              {
                move: "Set Required on ItemName and Quantity.",
                why: "Half-entered records are worse than no record, because they look complete in a list. Required makes the incomplete record impossible rather than merely discouraged.",
              },
            ],
            result:
              "A table that refuses invalid entries at the point of entry rather than accumulating them.",
            takeaway:
              "Design the table deliberately and constrain it. Forms and reports are generated in seconds; a badly typed table takes months to repair.",
          },
          {
            type: "knowledge-check",
            question: "Which data type should be used for a five-digit ZIP code?",
            options: [
              "Number, because ZIP codes are numeric",
              "Short Text, because a Number field would strip leading zeros",
              "AutoNumber, so Access assigns them",
              "Long Text, to allow for ZIP+4 codes",
            ],
            correctIndex: 1,
            explanation:
              "A Number field treats 07030 as 7030, dropping the leading zero and corrupting every ZIP in the Northeast. ZIP codes are identifiers rather than quantities — you never add two together — so they belong in a text field.",
            optionRationales: [
              "They look numeric, but a Number field strips leading zeros and corrupts any ZIP starting with 0.",
              "Correct. Short Text preserves leading zeros, and ZIP codes are identifiers rather than quantities.",
              "AutoNumber generates sequential values for keys. It cannot store a real ZIP code.",
              "Short Text handles 255 characters, far more than ZIP+4 needs. Long Text is for paragraphs.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build the table from your Module 1 design.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a database named 'Lakeside Supplies'. Build a table in Design view with fields for item name, category, quantity on hand, unit cost, reorder level, and last ordered date. Choose a deliberate type for each and set an AutoNumber primary key.",
          "Set Required on item name and quantity, a Default Value on category, and a Validation Rule preventing negative quantities. Write Validation Text for it.",
          "Try to save a record with a blank item name and one with a quantity of -5. Record exactly what Access does in each case.",
          "Enter six valid records, then explain in two sentences which property you think prevents the most errors in practice.",
        ],
      },
    ],
  },
  {
    slug: "relationships-and-referential-integrity",
    title: "Relationships and Referential Integrity",
    description:
      "Link tables so Access enforces the connections between them, and understand what referential integrity actually prevents.",
    duration: "22 min",
    objectives: [
      "Create a relationship between two tables",
      "Explain one-to-many and many-to-many relationships",
      "Enable referential integrity and describe what it enforces",
      "Explain what cascade update and cascade delete do",
    ],
    sections: [
      {
        heading: "Building the relationship",
        blocks: [
          {
            type: "worked-example",
            title: "Linking Appointments to Patients",
            task: "Connect the two tables so Access refuses to accept an appointment for a patient who does not exist.",
            steps: [
              {
                move: "Open Database Tools > Relationships and add both tables.",
                why: "The Relationships window is where links are defined for the whole database, not per-query. A join drawn inside one query applies only to that query; a relationship defined here is enforced everywhere, including direct table entry.",
              },
              {
                move: "Drag PatientID from Patients onto PatientID in Appointments.",
                why: "Drag from the 'one' side to the 'many' side — from the primary key to the foreign key. Access reads the direction to decide which table is which, and dragging the wrong way produces a relationship that does not mean what you intended.",
              },
              {
                move: "Tick Enforce Referential Integrity before clicking Create.",
                why: "This is the whole point of the exercise, and it is off by default. Without it you get a line on a diagram and no enforcement — Access will happily accept an appointment for PatientID 4471 when no such patient exists.",
              },
              {
                move: "Confirm Access reports the relationship as One-To-Many.",
                why: "If it says One-To-One, the foreign key has a unique index on it and each patient could have only one appointment. If it says Indeterminate, the fields are different data types — usually a Number joined to a Short Text — and integrity cannot be enforced until you fix that.",
              },
              {
                move: "Test it: try to enter an appointment with a PatientID that does not exist.",
                why: "A relationship you have not tested is a relationship you are assuming. Access should refuse the record. If it accepts it, integrity is not actually on.",
              },
            ],
            result: "Appointments can only reference real patients, and a patient with appointments on file cannot be deleted.",
            takeaway: "Drag from the one side to the many side, and tick Enforce Referential Integrity — it is off by default, and without it the relationship is decorative.",
          },
        ],
      },
      {
        heading: "Relationships turn tables into a database",
        blocks: [
          {
            type: "scenario",
            role: "You finish the appointment database at Lakeside Medical Associates.",
            text: "Your tables are well designed but unconnected. Nothing stops someone entering an appointment for PatientID 4471 when no such patient exists, and nothing warns anyone deleting a patient who still has twelve appointments on file. Those appointments become orphans pointing at nobody.",
            task: "Define relationships so Access enforces the links your design assumes.",
          },
          {
            type: "paragraph",
            text: "A relationship connects a primary key in one table to a foreign key in another. The overwhelmingly common form is one-to-many: one patient has many appointments; one provider has many appointments. The 'one' side holds the primary key and the 'many' side holds the foreign key.",
          },
          {
            type: "table",
            caption: "Relationship types",
            columns: ["Type", "Means", "Example"],
            rows: [
              ["One-to-many", "One record relates to many in the other table", "One patient, many appointments"],
              ["One-to-one", "One record relates to exactly one", "A patient and a rarely-used detail record"],
              ["Many-to-many", "Records on both sides relate to many", "Patients and insurance plans — requires a junction table"],
            ],
          },
          {
            type: "paragraph",
            text: "Access cannot represent many-to-many directly. You create a third junction table holding a foreign key to each side, which turns one many-to-many into two one-to-many relationships. A PatientInsurance table linking PatientID to PlanID is the standard pattern.",
          },
          {
            type: "paragraph",
            text: "Referential integrity is the rule Access enforces once you switch it on. It refuses to let you create an appointment for a patient who does not exist, and refuses to delete a patient who still has appointments. It converts your design assumption into something the database actually guarantees.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Cascade Delete Related Records removes the children when you delete the parent. Deleting one patient silently deletes all twelve of their appointments, with no second confirmation. That is occasionally what you want and usually a disaster in a records system where history must be retained. Leave it off unless you have a specific reason, and think hard before enabling it on anything holding patient data. Cascade Update, which propagates a changed key value, is far safer and rarely needed if your keys are AutoNumbers that never change.",
          },
          {
            type: "knowledge-check",
            question:
              "With referential integrity enabled and cascade delete off, what happens when you try to delete a patient who has twelve appointments on file?",
            options: [
              "The patient and all twelve appointments are deleted",
              "Access refuses the deletion, because appointments still reference that patient",
              "The patient is deleted and the appointments are left pointing at nothing",
              "Access deletes the patient and asks what to do with the appointments",
            ],
            correctIndex: 1,
            explanation:
              "Referential integrity prevents orphaned records. Since the appointments reference that PatientID, Access refuses the deletion until those child records are dealt with. That refusal is the feature working — it is what stops twelve appointments pointing at a patient who no longer exists.",
            optionRationales: [
              "That is what cascade delete would do, and it is off in this scenario.",
              "Correct. Access blocks the deletion to prevent orphaned appointment records.",
              "Orphaned records are precisely what referential integrity exists to prevent.",
              "Access does not offer that choice. It simply refuses the deletion.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build the relationships your design implies, then test that they hold.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create Patients, Providers, and Appointments tables from your Module 1 design, with appropriate keys.",
          "Open Database Tools > Relationships and create one-to-many relationships from Patients and Providers to Appointments. Enable referential integrity on both.",
          "Try to enter an appointment with a PatientID that does not exist. Record what happens.",
          "Try to delete a patient who has appointments. Record what happens, then explain in two sentences why you would not enable cascade delete on this database.",
        ],
      },
    ],
  },
];
