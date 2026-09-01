import { Lesson } from "@/types/lesson";

/**
 * INFO 3033 Module 5 — Database applications (MS Access), sessions 27-28.
 *
 * The syllabus offers an alternative Module 5 covering Word-Excel integration
 * through mail merge; that material is covered in Module 2 of this course.
 * This module delivers the Access track: database principles, the Access
 * window, and the three objects a beginner must be able to build.
 */
export const module8Lessons: Lesson[] = [
  {
    slug: "database-principles",
    title: "Basic Principles of Database Construction",
    description:
      "Understand what a database is, why a spreadsheet stops being adequate, and the design rules that keep data trustworthy.",
    duration: "22 min",
    objectives: [
      "Explain how a database differs from a spreadsheet, and when each is right",
      "Define table, record, field, primary key, and relationship",
      "Recognize data redundancy and the problems it causes",
      "Apply the one-fact-per-field rule when designing a table",
    ],
    sections: [
      {
        heading: "When a spreadsheet stops being enough",
        blocks: [
          {
            type: "scenario",
            role: "You maintain the patient contact list at Lakeside Medical Associates.",
            text: "The list is a spreadsheet with one row per appointment. A patient who has visited eleven times appears in eleven rows, with her address typed eleven times. She moves. Someone updates four of the rows. The practice now holds two addresses for one patient and no way to tell which is current.",
            task: "Understand why storing a fact once is the central idea of database design.",
          },
          {
            type: "paragraph",
            text: "A spreadsheet stores a grid of values. A database stores related tables, each describing one kind of thing, linked so that each fact is recorded once. That difference sounds academic until data changes — and data always changes.",
          },
          {
            type: "paragraph",
            text: "In the scenario above, a database would hold one Patients table with one row per patient, and one Appointments table with one row per appointment, linked by a patient ID. The address exists in exactly one place. Changing it changes it everywhere, because everywhere is one row.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Table",
                definition:
                  "A collection of records about one kind of thing — patients, appointments, providers. One table per kind of thing.",
              },
              {
                term: "Record (row)",
                definition:
                  "One instance: one patient, one appointment.",
              },
              {
                term: "Field (column)",
                definition:
                  "One attribute of that thing: last name, date of birth, appointment date.",
              },
              {
                term: "Primary key",
                definition:
                  "A field whose value uniquely identifies each record. No duplicates, never empty.",
              },
              {
                term: "Foreign key",
                definition:
                  "A field holding another table's primary key. This is what links tables together.",
              },
              {
                term: "Redundancy",
                definition:
                  "The same fact stored in more than one place — the condition that allows a database to contradict itself.",
              },
            ],
          },
          {
            type: "table",
            caption: "Spreadsheet or database?",
            columns: ["Situation", "Use", "Why"],
            rows: [
              [
                "A one-off calculation or budget",
                "Spreadsheet",
                "Fast to build; relationships do not matter",
              ],
              [
                "Data about several related things",
                "Database",
                "Each fact stored once, linked by keys",
              ],
              [
                "Records many people update over years",
                "Database",
                "Validation and integrity rules prevent contradictions",
              ],
              [
                "Ad-hoc analysis of a data extract",
                "Spreadsheet",
                "Better analysis and charting tools",
              ],
              [
                "Anything where the same value is typed repeatedly",
                "Database",
                "Repeated typing is the signal that a second table is needed",
              ],
            ],
          },
          {
            type: "worked-example",
            title: "Splitting one flat list into proper tables",
            task: "Turn the appointment spreadsheet — patient name, address, phone, appointment date, provider, reason — into a sound table design.",
            steps: [
              {
                move: "List the distinct kinds of thing the data describes.",
                why: "There are three: patients, providers, and appointments. Each becomes a table. Identifying the nouns is the whole of basic database design, and doing it before touching Access saves rebuilding later.",
              },
              {
                move: "Give each table a primary key that will never change.",
                why: "PatientID, ProviderID, AppointmentID — usually auto-numbered. A name is a poor key because names repeat and people change them; a phone number is worse because it changes often. A key's only job is to identify, so it should carry no other meaning.",
              },
              {
                move: "Move each fact to the table it actually belongs to.",
                why: "The address describes the patient, not the appointment, so it belongs in Patients. This is the step that eliminates the eleven copies. If a fact is about the patient, it goes in the patient's row — once.",
              },
              {
                move: "Link Appointments to the other tables with foreign keys.",
                why: "Appointments holds PatientID and ProviderID rather than repeating names and addresses. One appointment row is then a small row of dates and references, and the patient's details are reached through the link.",
              },
              {
                move: "Check that every field holds exactly one fact.",
                why: "A field holding 'Jane Okafor' should be two fields, and one holding '123 Main St, Brooklyn NY 11201' should be several. Combined fields cannot be sorted or filtered reliably — you cannot sort by surname if the surname is buried in a full-name field.",
              },
            ],
            result:
              "Three tables where each fact is stored once, and a changed address updates everywhere automatically.",
            takeaway:
              "One table per kind of thing, one fact per field, a stable key on every table. Repeated typing is the symptom that tells you a table is missing.",
          },
          {
            type: "knowledge-check",
            question:
              "In a patient database, why is a patient's phone number a poor choice for a primary key?",
            options: [
              "Phone numbers are too long to index efficiently",
              "Phone numbers change, and may be shared or missing — a key must be unique, stable, and always present",
              "Access does not permit text fields as primary keys",
              "Phone numbers are protected information and cannot be keys",
            ],
            correctIndex: 1,
            explanation:
              "A primary key must uniquely identify a record, never be empty, and ideally never change. Phone numbers fail all three: people change them, family members share them, and some patients have none on file. An auto-numbered ID has no meaning and therefore no reason to change.",
            optionRationales: [
              "Length is not the issue. Access indexes text fields perfectly well.",
              "Correct. Keys must be unique, stable, and always present, and phone numbers are none of these.",
              "Access does allow text primary keys. The problem is this particular field's behavior, not its type.",
              "Phone numbers are indeed sensitive, but that is not what disqualifies them as a key.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Design before you build. This exercise needs paper, not Access.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "A clinic tracks: patient name, patient address, insurance carrier, policy number, appointment date, provider name, provider specialty, visit reason, and copay collected. List the distinct kinds of thing this describes.",
          "Design a table for each, naming its fields and choosing a primary key. Mark which fields are foreign keys.",
          "Identify every field in the original flat list that would have been typed repeatedly, and say which table now stores it once.",
          "Find two fields in the original list that hold more than one fact, and split them.",
        ],
      },
    ],
  },
  {
    slug: "the-access-window",
    title: "The Access Window and Database Objects",
    description:
      "Navigate the Access interface and learn what each of the four object types is for.",
    duration: "18 min",
    objectives: [
      "Identify the Navigation Pane, Ribbon, and object tabs",
      "Describe what tables, queries, forms, and reports each do",
      "Switch between Datasheet view and Design view",
      "Explain why data is entered through forms rather than directly into tables",
    ],
    sections: [
      {
        heading: "Four object types, four jobs",
        blocks: [
          {
            type: "scenario",
            role: "You open the practice database for the first time at Lakeside Medical Associates.",
            text: "The Navigation Pane lists about twenty items with different icons. Some open as grids, some as forms, some produce printable pages. Until you know what each type is for, the database is an undifferentiated list of things you are afraid to click.",
            task: "Learn the four object types so the Navigation Pane becomes a map.",
          },
          {
            type: "paragraph",
            text: "Access databases are built from four object types, and each has one job. Understanding the division is most of what makes Access comprehensible.",
          },
          {
            type: "table",
            caption: "The four object types",
            columns: ["Object", "Job", "Think of it as"],
            rows: [
              [
                "Table",
                "Stores the data",
                "The filing cabinet — the only place data actually lives",
              ],
              [
                "Query",
                "Asks a question of the data",
                "A saved question, re-answered against current data each time it runs",
              ],
              [
                "Form",
                "Provides an interface for entering and viewing records",
                "The data entry screen staff actually use",
              ],
              [
                "Report",
                "Formats data for printing or distribution",
                "The printed output",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "The critical point is that only tables store data. Queries, forms, and reports all display data that lives in tables. Delete a query and you lose the question, not the data. Delete a table and the data is genuinely gone.",
          },
          {
            type: "table",
            caption: "The two main views",
            columns: ["View", "Shows", "Use it to"],
            rows: [
              [
                "Datasheet view",
                "The data in a grid, like a spreadsheet",
                "Read and enter records",
              ],
              [
                "Design view",
                "The structure — fields, data types, properties",
                "Change what the object is, not what it contains",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Access saves record edits the moment you move off a row — there is no Ctrl+S and no undo once you have moved on. This is the single biggest adjustment for anyone coming from Excel, where nothing is committed until you save. Before working on a live database, make a copy. Before a structural change, make another.",
          },
          {
            type: "paragraph",
            text: "Data entry should happen through forms rather than directly into tables. A form can show one record at a time, present fields in a sensible order with clear labels, validate entries, and hide fields the user should not touch. Typing directly into a table exposes every field of every record at once, which is how the wrong row gets edited.",
          },
          {
            type: "knowledge-check",
            question:
              "You delete a query from an Access database. What happens to the data it displayed?",
            options: [
              "The data is deleted along with the query",
              "Nothing — the data lives in tables, and only the saved question is removed",
              "The data is moved to a temporary table",
              "The data becomes read-only until the query is recreated",
            ],
            correctIndex: 1,
            explanation:
              "Only tables store data. A query is a saved question that runs against table data each time it opens, so deleting it removes the question and leaves every record untouched.",
            optionRationales: [
              "Queries display data; they do not own it. Deleting one cannot delete records.",
              "Correct. The data remains in its tables — you have lost only the saved question.",
              "There is no such temporary table. The data never moved out of its own table.",
              "Table data is unaffected by the existence of any query.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Explore a database before building one. Access ships with sample templates under File > New.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Access and create a database from any built-in template. In the Navigation Pane, list every object and label each as a table, query, form, or report.",
          "Open one table in Datasheet view and then in Design view. Write two sentences describing what each view lets you change.",
          "Open a form and a report built on the same table. Describe what each is optimized for and why the practice would use both.",
          "Without changing anything, explain in writing what would happen if you deleted the form, and what would happen if you deleted the table.",
        ],
      },
    ],
  },
  {
    slug: "building-tables-forms-reports",
    title: "Creating Tables, Forms, and Reports",
    description:
      "Build the three core objects of a working database: a table with proper data types, a form for entry, and a report for output.",
    duration: "25 min",
    objectives: [
      "Create a table in Design view and choose appropriate data types",
      "Set a primary key and basic field properties",
      "Generate and adjust a form for data entry",
      "Generate a report and prepare it for printing",
    ],
    sections: [
      {
        heading: "Data types are a validation decision",
        blocks: [
          {
            type: "scenario",
            role: "You build a supply inventory database at Lakeside Medical Associates.",
            text: "You set every field to Short Text because it accepts anything. Six months later the quantity field contains '12', 'twelve', '12 boxes', and 'approx 12'. Nothing can be summed, sorted, or reported on, and the database cannot answer the one question it was built for.",
            task: "Choose data types that make wrong data impossible to enter rather than merely discouraged.",
          },
          {
            type: "paragraph",
            text: "A data type is the first line of defence for data quality. A Number field will not accept 'twelve'. A Date/Time field will not accept 'next Tuesday'. Choosing the right type at design time prevents an entire category of problem that is extremely tedious to fix afterwards.",
          },
          {
            type: "table",
            caption: "Access data types",
            columns: ["Type", "Use for", "Note"],
            rows: [
              ["Short Text", "Names, addresses, codes", "Up to 255 characters"],
              ["Long Text", "Notes and comments", "Sortable but not efficiently indexed"],
              ["Number", "Quantities you will calculate with", "Choose an appropriate field size"],
              ["Currency", "Money", "Avoids the rounding errors of floating-point numbers"],
              ["Date/Time", "Dates and times", "Enables date arithmetic and proper sorting"],
              ["Yes/No", "Two-state values", "Stored as true/false"],
              ["AutoNumber", "Primary keys", "Access assigns a unique value automatically"],
              ["Attachment", "Files linked to a record", "Grows the database file quickly"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Store an identifier that is never calculated with — a phone number, a ZIP code, a patient ID — as Short Text, not Number. A Number field strips leading zeros, so ZIP code 07030 becomes 7030. The test is simple: if you would never add two of these values together, it is text.",
          },
          {
            type: "worked-example",
            title: "Building a supply inventory table",
            task: "Create a table recording supply items, quantities, costs, and reorder levels, designed so bad data cannot be entered.",
            steps: [
              {
                move: "Create the table in Design view rather than by typing into a datasheet.",
                why: "Design view makes you name each field and choose its type deliberately. Building by typing into a datasheet lets Access guess the types, and it guesses Short Text far too often — which is how the scenario above happens.",
              },
              {
                move: "Add ItemID as AutoNumber and set it as the primary key.",
                why: "AutoNumber guarantees uniqueness with no effort and no meaning attached, which is exactly what a key should be. Access will not enforce record uniqueness without a primary key.",
              },
              {
                move: "Set types by what each field is for: Quantity as Number, UnitCost as Currency, LastOrdered as Date/Time.",
                why: "Each type rejects data that does not belong. Currency specifically avoids the floating-point rounding that makes money columns fail to reconcile by a cent — a real problem with ordinary decimal number fields.",
              },
              {
                move: "Set field properties: Required on the fields that must be filled, and a Default Value where one is sensible.",
                why: "Required stops half-entered records, which are worse than no record because they look complete in a list. Defaults reduce typing and mistakes on fields that are usually the same.",
              },
              {
                move: "Generate a form with Create > Form, and reorder the fields to match how staff work.",
                why: "The generated form is a starting point in table order, which is rarely entry order. Arranging fields in the sequence someone reading off a delivery note would use is what makes the form fast rather than merely functional.",
              },
              {
                move: "Generate a report with Create > Report, then check it in Print Preview.",
                why: "The default report is almost always too wide for the page. Print Preview shows the real pagination, and narrowing or removing columns there is what turns it into something usable on paper.",
              },
            ],
            result:
              "A table that rejects invalid entries, a form staff can work through quickly, and a report that prints correctly.",
            takeaway:
              "Design the table first and deliberately. Forms and reports are generated in seconds; a badly typed table takes months to repair.",
          },
          {
            type: "knowledge-check",
            question:
              "Which data type should be used for a five-digit ZIP code field?",
            options: [
              "Number, because ZIP codes are numeric",
              "Short Text, because a Number field would strip leading zeros",
              "AutoNumber, so Access assigns them",
              "Long Text, to allow for extended ZIP+4 codes",
            ],
            correctIndex: 1,
            explanation:
              "A Number field treats 07030 as the value 7030 and drops the leading zero, corrupting every ZIP code in the Northeast. ZIP codes are identifiers rather than quantities — you never add two together — so they belong in a text field.",
            optionRationales: [
              "They look numeric, but a Number field strips leading zeros and would corrupt any ZIP beginning with 0.",
              "Correct. Short Text preserves leading zeros, and ZIP codes are identifiers rather than quantities.",
              "AutoNumber generates sequential values for keys. It cannot store a real ZIP code.",
              "Short Text handles 255 characters, which is far more than a ZIP+4 needs. Long Text is for paragraphs.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a small working database from your Module 5 design.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In Access, create a database named 'Lakeside Supplies'. Build a table in Design view with fields for item name, category, quantity on hand, unit cost, reorder level, and last ordered date. Choose a deliberate data type for each and set an AutoNumber primary key.",
          "Set Required on item name and quantity, and give category a sensible default. Enter six records and try to save one with a blank item name — note exactly what Access does.",
          "Generate a form for the table. Reorder the fields to match the order someone would read them off a delivery note, and enter two more records through the form.",
          "Generate a report, open Print Preview, and adjust it until it fits the page width. Write two sentences on what you had to change and why the default was not usable.",
        ],
      },
    ],
  },
];
