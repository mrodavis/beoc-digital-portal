import { Lesson } from "@/types/lesson";

export const accessModule1Lessons: Lesson[] = [
  {
    slug: "getting-started-with-access",
    title: "Getting Started with Access",
    description:
      "Learn what a database does that a spreadsheet cannot, and find your way around the Access window.",
    duration: "20 min",
    objectives: [
      "Explain when a database is the right tool and when a spreadsheet is",
      "Identify the Navigation Pane, Ribbon, and object tabs",
      "Describe the four Access object types and what each is for",
      "Create a blank database and save it in the correct format",
    ],
    sections: [
      {
        heading: "Why Access exists",
        blocks: [
          {
            type: "scenario",
            role: "You maintain records at Lakeside Medical Associates.",
            text: "The patient contact list is a spreadsheet with one row per appointment. A patient who has visited eleven times appears in eleven rows, with her address typed eleven times. She moves. Someone updates four rows. The practice now holds two addresses for one patient and no way to tell which is current.",
            task: "Understand the problem Access solves, so you know when reaching for it is worth the extra effort.",
          },
          {
            type: "paragraph",
            text: "Excel stores a grid of values. Access stores related tables, each describing one kind of thing, linked so that every fact is recorded exactly once. That difference sounds academic until data changes — and data always changes.",
          },
          {
            type: "paragraph",
            text: "In the scenario above, Access would hold one Patients table with one row per patient and one Appointments table with one row per appointment, linked by a patient ID. The address exists in one place. Changing it changes it everywhere, because everywhere is one row.",
          },
          {
            type: "table",
            caption: "Access or Excel?",
            columns: ["Situation", "Use", "Why"],
            rows: [
              ["A budget or one-off calculation", "Excel", "Fast to build; relationships do not matter"],
              ["Data about several related things", "Access", "Each fact stored once, linked by keys"],
              ["Records many people update over years", "Access", "Validation and integrity rules prevent contradictions"],
              ["Ad-hoc analysis and charting", "Excel", "Far better analysis tooling"],
              ["The same value typed repeatedly", "Access", "Repeated typing is the signal a second table is needed"],
              ["More rows than Excel handles comfortably", "Access", "Designed for larger record counts"],
            ],
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Database",
                definition:
                  "A structured collection of related data, organized so each fact is stored once and can be linked to others.",
              },
              {
                term: "Object",
                definition:
                  "One of the four building blocks of an Access database: table, query, form, or report.",
              },
              {
                term: "Navigation Pane",
                definition:
                  "The list down the left showing every object in the database, grouped by type.",
              },
              {
                term: "Datasheet view",
                definition: "Shows an object's data in a grid, like a spreadsheet.",
              },
              {
                term: "Design view",
                definition:
                  "Shows an object's structure — its fields, types, and properties — rather than its contents.",
              },
              {
                term: ".accdb",
                definition:
                  "The Access database file format. One file holds every table, query, form, and report.",
              },
            ],
          },
        ],
      },
      {
        heading: "Four object types, four jobs",
        blocks: [
          {
            type: "table",
            caption: "The Access objects",
            columns: ["Object", "Job", "Think of it as"],
            rows: [
              ["Table", "Stores the data", "The filing cabinet — the only place data actually lives"],
              ["Query", "Asks a question of the data", "A saved question, re-answered against current data"],
              ["Form", "Interface for entering and viewing records", "The data entry screen staff use"],
              ["Report", "Formats data for printing", "The printed output"],
            ],
          },
          {
            type: "paragraph",
            text: "Only tables store data. Queries, forms, and reports all display data that lives in tables. Delete a query and you lose the question, not the data. Delete a table and the data is genuinely gone.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Access saves record edits the moment you move off a row. There is no Ctrl+S for data and no undo once you have moved on. This is the biggest adjustment coming from Excel, where nothing is committed until you save. Before working on a live database, make a copy of the file — and make another before any structural change.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Access is included in Microsoft 365 Apps for business and enterprise, and in Office Professional. It is Windows-only — there is no Mac version and no full browser version, which is why the Google Workspace half of this program has no Access equivalent. If Access is missing from your Office installation, check which edition you have before assuming something is broken.",
          },
          {
            type: "knowledge-check",
            question:
              "You delete a query from an Access database. What happens to the data it displayed?",
            options: [
              "The data is deleted along with the query",
              "Nothing — data lives in tables, and only the saved question is removed",
              "The data is moved to a temporary table",
              "The data becomes read-only until the query is recreated",
            ],
            correctIndex: 1,
            explanation:
              "Only tables store data. A query is a saved question that runs against table data each time it opens, so deleting it removes the question and leaves every record untouched.",
            optionRationales: [
              "Queries display data; they never own it. Deleting one cannot delete records.",
              "Correct. The data remains in its tables — you have lost only the saved question.",
              "There is no such temporary table. The data never left its own table.",
              "Table data is unaffected by whether any query exists.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Explore a database before building one. Access ships with templates under File > New.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a database from any built-in template. In the Navigation Pane, list every object and label each as a table, query, form, or report.",
          "Open one table in Datasheet view, then in Design view. Write two sentences on what each view lets you change.",
          "Open a form and a report built on the same table. Describe what each is optimized for.",
          "Without changing anything, write what would happen if you deleted the form, and what would happen if you deleted the table.",
        ],
      },
    ],
  },
  {
    slug: "database-design-principles",
    title: "Designing a Database Before You Build It",
    description:
      "Plan tables, keys, and relationships on paper first — the step that determines whether the database works or has to be rebuilt.",
    duration: "24 min",
    objectives: [
      "Identify the distinct entities in a set of data",
      "Choose a primary key that is unique, stable, and always present",
      "Apply the one-fact-per-field rule",
      "Recognize data redundancy and the contradictions it permits",
    ],
    sections: [
      {
        heading: "Design is the part you cannot skip",
        blocks: [
          {
            type: "scenario",
            role: "You are rebuilding the appointment records at Lakeside Medical Associates.",
            text: "The flat spreadsheet holds patient name, address, phone, appointment date, provider, and reason — one row per appointment. Rebuilt in Access as a single table it would have exactly the same problems it has now, just in a different application.",
            task: "Split the data into tables so each fact is stored once, before creating anything in Access.",
          },
          {
            type: "paragraph",
            text: "Almost every unusable Access database is a design failure rather than a technical one. Design is done on paper, takes twenty minutes, and cannot practically be retrofitted once staff have entered six months of records.",
          },
          {
            type: "worked-example",
            title: "Splitting a flat list into proper tables",
            task: "Turn the appointment spreadsheet into a sound table design.",
            steps: [
              {
                move: "List the distinct kinds of thing the data describes.",
                why: "There are three: patients, providers, and appointments. Each becomes a table. Identifying the nouns is the whole of basic database design, and doing it before touching Access saves rebuilding later.",
              },
              {
                move: "Give each table a primary key that will never change.",
                why: "PatientID, ProviderID, AppointmentID, usually AutoNumber. A name is a poor key because names repeat and people change them; a phone number is worse because it changes often. A key's only job is to identify, so it should carry no other meaning.",
              },
              {
                move: "Move each fact to the table it belongs to.",
                why: "The address describes the patient, not the appointment, so it belongs in Patients. This is the step that eliminates the eleven copies. If a fact is about the patient, it goes in the patient's row — once.",
              },
              {
                move: "Link Appointments to the others with foreign keys.",
                why: "Appointments holds PatientID and ProviderID rather than repeating names and addresses. One appointment row becomes a small row of dates and references.",
              },
              {
                move: "Check that every field holds exactly one fact.",
                why: "A field holding 'Jane Okafor' should be two fields; one holding a full address should be several. Combined fields cannot be sorted or filtered reliably — you cannot sort by surname if the surname is buried inside a full-name field.",
              },
            ],
            result:
              "Three tables where each fact is stored once, and a changed address updates everywhere automatically.",
            takeaway:
              "One table per kind of thing, one fact per field, a stable key on every table. Repeated typing is the symptom that tells you a table is missing.",
          },
          {
            type: "table",
            caption: "What makes a good primary key",
            columns: ["Requirement", "Means", "Why phone numbers fail"],
            rows: [
              ["Unique", "No two records share it", "Family members share a number"],
              ["Never empty", "Every record has one", "Some patients have no number on file"],
              ["Stable", "It does not change", "People change numbers constantly"],
              ["Meaningless", "It carries no other information", "A number that means something has a reason to change"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "In a patient database, why is a phone number a poor choice for a primary key?",
            options: [
              "Phone numbers are too long to index efficiently",
              "Phone numbers change, may be shared, and may be missing — a key must be unique, stable, and always present",
              "Access does not permit text fields as primary keys",
              "Phone numbers are protected information and cannot be keys",
            ],
            correctIndex: 1,
            explanation:
              "A primary key must uniquely identify a record, never be empty, and ideally never change. Phone numbers fail all three. An AutoNumber ID has no meaning and therefore no reason to change.",
            optionRationales: [
              "Length is not the issue; Access indexes text fields perfectly well.",
              "Correct. Keys must be unique, stable, and always present, and phone numbers are none of these.",
              "Access does allow text primary keys. The problem is this field's behavior, not its type.",
              "Phone numbers are sensitive, but that is not what disqualifies them as a key.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Design on paper. Do not open Access for this exercise.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "A clinic tracks: patient name, address, insurance carrier, policy number, appointment date, provider name, provider specialty, visit reason, and copay collected. List the distinct kinds of thing this describes.",
          "Design a table for each, naming its fields and choosing a primary key. Mark which fields are foreign keys.",
          "Identify every field that would have been typed repeatedly in the flat list, and say which table now stores it once.",
          "Find two fields holding more than one fact and split them.",
        ],
      },
    ],
  },
];
