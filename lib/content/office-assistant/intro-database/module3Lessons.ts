import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "welcome-to-access",
    title: "Welcome to Microsoft Access",
    description:
      "Get oriented in the Microsoft Access environment, understand its core components, and learn how it differs from Excel for professional data management.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The practice manager at Lakeside Medical Associates has seen the reports you built in Excel and is impressed. But she is frustrated: when two staff members open the appointment spreadsheet at the same time, one person's changes get overwritten by the other's. Sorting and filtering take too long on 1,500 rows. And there is no way to prevent staff from entering 'N/A' in the Date of Birth field. She asks you to explore whether Microsoft Access could solve these problems. This lesson gets you started.",
          },
        ],
      },
      {
        heading: "The Access Interface",
        blocks: [
          {
            type: "paragraph",
            text: "Microsoft Access shares the Ribbon interface with Word and Excel, but its purpose and layout are fundamentally different — it is a database application, not a document or spreadsheet:",
          },
          {
            type: "list",
            items: [
              "The Navigation Pane (left side) is the central organizer in Access — it shows all the objects in your database: Tables, Queries, Forms, and Reports. Unlike Excel where everything is on sheets in a single workbook, Access organizes different types of database objects into these four categories. Every database you build will have Tables (where data lives) and may have Queries, Forms, and Reports depending on its complexity.",
              "The Object area (right side / main area) is where database objects open when you double-click them in the Navigation Pane — it is where you view and edit data in a Table, design a Query, fill out a Form, or preview a Report. Multiple objects can be open simultaneously as tabbed windows.",
              "The Status Bar (bottom) shows the current view mode and provides navigation controls in Datasheet View — record number indicators, search field, and view switching buttons. In Datasheet View, you see records in rows and columns similar to Excel. In Design View, you see and modify the structure of the object.",
              "Access file format is .accdb — an Access database is a single file with the .accdb extension (Access Database) that contains all your tables, queries, forms, and reports in one place. This file should be saved on the network drive (not your local C:) so all authorized staff can access it. The database file can be opened by multiple users simultaneously, with Access managing record locking to prevent conflict.",
            ],
          },
        ],
      },
      {
        heading: "The Four Database Objects",
        blocks: [
          {
            type: "paragraph",
            text: "Every Access database is built from four types of objects — understanding what each does and when to use each is the key to building useful databases:",
          },
          {
            type: "list",
            items: [
              "Tables are where data is stored — every fact in your database lives in a table. A well-designed database has a table for each distinct entity: Patients, Appointments, Providers, InsurancePlans. Tables enforce data types, store records, and hold the primary keys. Everything else (Queries, Forms, Reports) depends on Tables as its data source.",
              "Queries retrieve, filter, and calculate data from one or more tables — a Query is like an advanced filter or a saved question. 'Show me all appointments for Dr. Walsh in May 2025' is a Query. 'Calculate total billed amount by insurance plan' is a Query. Queries can combine data from multiple related tables and can calculate new values. They are the analytical engine of an Access database.",
              "Forms are user interfaces for entering and viewing data — instead of typing directly into a table's datasheet grid (which is error-prone and confusing), Forms provide a user-friendly data entry screen. A patient registration form might show fields one at a time with labels, dropdown menus for common values, and validation that prevents incorrect entries.",
              "Reports are formatted outputs for printing or PDF export — a Report takes data from a Table or Query and presents it in a professionally formatted layout for printing. Monthly appointment summaries, billing reports by payer, and patient lists for a specific provider are all appropriate Report use cases.",
            ],
          },
        ],
      },
      {
        heading: "Creating a New Database",
        blocks: [
          {
            type: "paragraph",
            text: "Starting a new database from scratch in Access is straightforward — the critical decision is where to save the file:",
          },
          {
            type: "list",
            items: [
              "When Access opens, the home screen offers 'Blank Database' and various templates. For a practice database, start with 'Blank Database.' Click it, then in the panel on the right, name the file (e.g., 'LakesideMedical_Appointments.accdb') and choose a save location — the network drive shared folder, not your local Documents. Click Create.",
              "Access immediately creates the database file and opens a blank Table (named 'Table1') in Datasheet View. This is the default starting point. Before entering any data, switch to Design View to define the table structure: click the Design View button in the View menu or press Ctrl+Enter in the table header area. If prompted to save the table, give it a meaningful name (e.g., 'Patients').",
              "Unlike Excel where you can start typing data immediately, Access requires you to define the structure (field names and data types) before entering records. This up-front design step is what makes Access enforce data quality — it cannot be skipped or done after the fact without significant rework.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "An Access database containing patient information is a covered system under HIPAA. It must be saved in an access-controlled location (the appropriate network drive, not your personal desktop or USB drive), backed up on the same schedule as other practice data, and accessible only to staff whose role requires it. In addition, Access does not encrypt its database file by default — for databases containing PHI, enable database password protection or full database encryption (Database Tools > Encrypt with Password) and store the password securely with IT. An unencrypted .accdb file containing patient data on an unprotected network share is a compliance risk.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Compare Microsoft Excel and Microsoft Access for a small medical office that needs to manage patient appointments and billing records. Create a comparison table with rows for: multi-user access, data validation enforcement, relationships between data sets, form design, report generation, file size limits, ease of use, and learning curve. In your final recommendation, which tool should they use for a growing practice with 2,000+ patients?' Use the comparison to brief your supervisor on the benefits of the Access transition.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In Microsoft Access, which object type is used to present data in a professionally formatted layout for printing?",
            options: [
              "Table — it stores the data in rows and columns for printing",
              "Query — it retrieves and calculates data for the printer",
              "Form — it provides a user-friendly entry and print interface",
              "Report — it is specifically designed to format data for printing and PDF export",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Create your first Microsoft Access database and explore its interface.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Microsoft Access and create a new Blank Database. Name it 'LakesideMedical_Practice_[YourName].accdb' and save it to your practice folder (not your desktop). Screenshot the Access home screen showing the file being created.",
          "Access opens with a default Table1. In the Navigation Pane, right-click Table1 and rename it 'Patients.' Switch to Design View when prompted to save. Screenshot the Design View of the empty Patients table.",
          "In the Navigation Pane, explore what tabs are available (Tables, Queries, Forms, Reports). Take a screenshot of the Navigation Pane showing the category tabs.",
          "In a Word document, write a 3-sentence summary of the four Access object types (Tables, Queries, Forms, Reports) in your own words — as if explaining them to a colleague who has never used Access. Save as 'AccessIntro_Summary_[YourName].docx'.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your three screenshots and your Word summary to your instructor. This exercise confirms that you can create, navigate, and begin working in a Microsoft Access database — the starting point for all the database work in the remaining lessons.",
      },
    ],
  },

  {
    slug: "tables-and-fields",
    title: "Building Tables and Defining Fields",
    description:
      "Design database tables in Access Design View — choose correct data types, set field properties, and configure the primary key for reliable, well-structured data storage.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You are building the patient registration table for Lakeside Medical Associates in Access. You need to decide: should Date of Birth be a Date/Time field or a Short Text field? Should InsuranceID allow any length of text, or should it be limited to 15 characters? What happens if a staff member leaves the Last Name field blank? These field design decisions — made once at the beginning — determine what errors the database can and cannot prevent for years to come.",
          },
        ],
      },
      {
        heading: "Access Data Types",
        blocks: [
          {
            type: "paragraph",
            text: "Access enforces data types at the field level — every field must have a data type, and the database will reject input that does not match. Choosing the correct data type is one of the most important design decisions:",
          },
          {
            type: "list",
            items: [
              "Short Text (formerly 'Text') — for names, addresses, codes, and other text data that is 255 characters or fewer. Use Short Text for: patient names, insurance plan names, provider names, procedure codes. Always set the Field Size property to the maximum expected length to prevent oversized entries: 50 characters for a full name, 15 for an insurance ID.",
              "Long Text (formerly 'Memo') — for large amounts of text with no practical length limit, such as clinical notes or detailed patient comments. Use sparingly in a data table — Long Text fields are slower and cannot be indexed for fast searching.",
              "Number — for numeric data used in calculations. Sub-types matter: Integer for whole numbers (appointment count), Long Integer for larger whole numbers (medical record numbers), Single or Double for decimal numbers. Use Number for quantities and IDs that will be used in arithmetic, but not for phone numbers or ZIP codes (those are Short Text, because you never add or divide them).",
              "Date/Time — for any date or time value. Access validates that entered data is a real date — it is impossible to type '13/45/2025' into a Date/Time field and have it accepted. Use Date/Time for: date of birth, appointment date, date of service. Never store dates as Short Text — you lose the ability to sort chronologically or calculate date differences.",
              "Currency — for monetary values requiring precise decimal representation. Use Currency for billed amounts, copay amounts, and payment values. Currency prevents floating-point rounding errors that occur with Double fields.",
              "AutoNumber — automatically assigns a unique sequential integer to each new record. Use as the primary key for every table. Never delete or modify AutoNumber values — they are the identity of the record.",
              "Yes/No — for true/false, yes/no, active/inactive fields. Use Yes/No for: Is Active Patient (Yes/No), Has Insurance (Yes/No). Displays as a checkbox in forms.",
            ],
          },
        ],
      },
      {
        heading: "Field Properties",
        blocks: [
          {
            type: "paragraph",
            text: "Each field has properties that control how data is stored, displayed, and validated — set these in the Field Properties pane at the bottom of Design View:",
          },
          {
            type: "list",
            items: [
              "Field Size limits the maximum length of Short Text fields — set it to the expected maximum length, not the Access default of 255. A LastName field set to 50 characters prevents accidental entry of an entire paragraph. A ZIPCode field set to 10 characters enforces the 5-digit or 9-digit ZIP format.",
              "Required: Yes forces users to fill in the field — they cannot save a record with this field blank. Set Required: Yes for fields that are truly mandatory: PatientID (auto), LastName, DateOfBirth, and InsuranceID at minimum. Be conservative — making every field required frustrates staff and leads to placeholder values ('UNKNOWN') that pollute the data.",
              "Default Value provides a pre-filled value when a new record is created — useful for fields that are almost always the same. A State field in a medical office in California might have Default Value = 'CA' to save staff from typing it every time.",
              "Validation Rule prevents specific invalid values — for example, a validation rule of '>=Date()' on an AppointmentDate field prevents appointments from being scheduled in the past. A validation rule of 'Len([InsuranceID])=12' ensures insurance IDs are always exactly 12 characters. Validation Text provides the error message shown when the rule is violated.",
              "Input Mask enforces a specific entry format — a phone number Input Mask '(999) 000-0000;0;_' forces users to enter a phone number in the correct format. Access fills in the parentheses, space, and dash automatically, so users only type the 10 digits. Use Input Mask for phone numbers, SSNs, and ZIP codes.",
            ],
          },
        ],
      },
      {
        heading: "Setting the Primary Key",
        blocks: [
          {
            type: "paragraph",
            text: "Every table needs a primary key — the field (or combination of fields) that uniquely identifies each record:",
          },
          {
            type: "list",
            items: [
              "The AutoNumber field is the standard primary key approach — by default, Access creates an 'ID' field of type AutoNumber in every new table and sets it as the primary key (indicated by a key icon in the row selector). Rename this field to something meaningful: PatientID, AppointmentID, ProviderID.",
              "To set a different field as primary key: in Design View, click the row selector (gray box) of the field you want as the primary key, then click the Primary Key button in the Design tab. The key icon moves to that field. Only one field (or one defined combination) can be the primary key.",
              "The primary key field is automatically indexed — this means Access creates an index on the primary key field, making lookups by that field very fast. You can also manually add indexes to other frequently searched fields (LastName, InsuranceID) via the Indexes button in the Design tab.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Changing a table's structure — adding, deleting, or modifying fields — after data has been entered is risky. Deleting a field permanently deletes all data stored in that field across every record. Changing a field's data type may corrupt data that does not match the new type. Before making structural changes to a table with existing data, create a backup copy of the entire database (File > Save As > Copy). Only make structural changes to the backup until you verify the changes work correctly, then apply them to the production database.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Design a Microsoft Access table for patient registration at a small medical office. List every field with: Field Name, Data Type, Field Size (if applicable), Required (Yes/No), Default Value (if applicable), and Validation Rule (if applicable). Explain why you chose each data type for at least three fields.' Use the design as the basis for building your Patients table in Access.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want to prevent staff from entering a date in the past for the AppointmentDate field. Which field property allows you to enforce this rule?",
            options: [
              "Required: Yes — making the field required prevents incorrect dates",
              "Default Value — set to today's date so staff cannot change it",
              "Validation Rule — set to '>=Date()' to reject any date before today",
              "Input Mask — format the date display to prevent past dates",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build the Patients and Appointments tables for Lakeside Medical Associates in Access.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open your LakesideMedical_Practice database. In Design View, define the Patients table with at least these fields: PatientID (AutoNumber, Primary Key), LastName (Short Text, size 50, Required), FirstName (Short Text, size 50, Required), DateOfBirth (Date/Time, Required), Phone (Short Text, size 14, Input Mask for phone format), InsurancePlan (Short Text, size 50), InsuranceID (Short Text, size 15), IsActivePatient (Yes/No, Default Yes). Screenshot the Design View showing all fields and their data types.",
          "Create a second table called 'Appointments' with: AppointmentID (AutoNumber, Primary Key), PatientID (Number, Long Integer, Required), ProviderID (Short Text, size 50, Required), AppointmentDate (Date/Time, Required, Validation Rule >=Date()), VisitType (Short Text, size 30), Notes (Long Text). Screenshot the Design View.",
          "Switch each table to Datasheet View and enter 3 fictional patient records in Patients and 5 appointment records in Appointments. Confirm that the Validation Rules prevent invalid entries (try entering a past date in AppointmentDate — it should be rejected). Screenshot the Datasheet View of each table with data.",
          "In a Word document, write a table (3 rows × 4 columns) listing three field property decisions you made, why you made each decision, and what error it prevents.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your three Access screenshots (Patients Design View, Appointments Design View, and both Datasheet Views with data), your validation rejection screenshot, and your field property justification table to your instructor. This exercise confirms you can design and build a properly structured Access database table from scratch — the foundational skill for all subsequent database work.",
      },
    ],
  },

  {
    slug: "entering-editing-records",
    title: "Entering and Editing Records in Access",
    description:
      "Enter, navigate, update, and delete records in Access tables efficiently and accurately — with the same attention to data quality that clinical records demand.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The new Access database is live at Lakeside Medical Associates. Three front desk staff need to enter patient registrations and appointment records throughout the day. They need to know: how to move between fields efficiently, what to do when they make a mistake in a record they just saved, how to find a specific patient record without scrolling through 1,500 rows, and how to delete an appointment that was canceled. This lesson covers all four.",
          },
        ],
      },
      {
        heading: "Entering Records in Datasheet View",
        blocks: [
          {
            type: "paragraph",
            text: "Datasheet View in Access looks like a spreadsheet but behaves differently — understanding the differences prevents data entry confusion:",
          },
          {
            type: "list",
            items: [
              "Navigating between fields: press Tab to move to the next field in a record, Shift+Tab to move back. Tab on the last field of a record moves to the first field of a new record. This Tab-key navigation keeps your hands on the keyboard for efficient data entry without touching the mouse.",
              "The record selector star (*) marks the new record row — the row with a star in the gray row selector on the far left is the next empty record waiting for data. Click it or Tab to it to start entering a new record. The pencil icon in the row selector indicates the current record is being edited and has not yet been saved.",
              "Records are saved automatically when you move to another record — unlike Excel where you press Ctrl+S to save, Access saves records when you move the cursor to a different row. If you make a change to a record and then click to a different row, the change is permanently saved. There is no 'undo after saving' for record data in Access.",
              "Undo while still in the record: if you make a mistake and have not yet moved to another row, press Escape once to undo the change to the current field, or Escape twice to undo all changes to the current record. Once you move to another row, those changes are saved and Escape will not reverse them.",
            ],
          },
        ],
      },
      {
        heading: "Finding and Editing Specific Records",
        blocks: [
          {
            type: "paragraph",
            text: "With thousands of records in a table, you cannot scroll to find the right one — Access provides several powerful ways to locate specific records:",
          },
          {
            type: "list",
            items: [
              "Find (Ctrl+F): opens the Find and Replace dialog. Type the value you are looking for and click Find Next. Access jumps to the first record where that value appears in the current field. Use 'Any Part of Field' in the Match dropdown to find a partial string (searching 'Whitfield' will find 'James Whitfield'). This is the fastest way to locate a specific patient without building a query.",
              "Filter by Selection: right-click any cell and choose 'Filter By Selection' to temporarily show only records where that field has the same value. For example, right-click a cell containing 'BlueCross' in the InsurancePlan field and select Filter By Selection — the table immediately shows only BlueCross patients. Click the Toggle Filter button in the Home tab to switch the filter on and off.",
              "Editing an existing record: click the cell you want to change, type the new value, and move to another row to save. In a Date field, Access displays a calendar picker — click a date on the calendar or type the date in the format the field expects. If the Validation Rule rejects your entry (e.g., a past date in AppointmentDate), Access shows the Validation Text message and keeps the cursor in the field until a valid value is entered.",
            ],
          },
        ],
      },
      {
        heading: "Deleting Records",
        blocks: [
          {
            type: "paragraph",
            text: "Deleting records in Access is permanent and irreversible — unlike a file you can restore from the Recycle Bin, deleted Access records are gone immediately:",
          },
          {
            type: "list",
            items: [
              "To delete a record: click the gray row selector on the far left of the record to select the entire row (it highlights blue), then press the Delete key. Access displays a confirmation dialog: 'Are you sure you want to delete 1 record(s)? This operation cannot be undone.' Click Yes only when you are certain.",
              "Referential integrity prevents deleting records with dependencies — if you try to delete a Patient record that has related Appointments records (and referential integrity is enforced), Access will refuse the deletion with an error message: 'The record cannot be deleted or changed because table Appointments includes related records.' This is the correct behavior — you cannot delete a patient who has appointment records without first deleting or reassigning those appointments.",
              "In a medical office, deleting patient records may be a HIPAA violation — patient records have legal retention requirements. Do not delete patient records simply because a patient has not returned. Mark them as inactive (IsActivePatient = No) rather than deleting. Deletion should only occur under an authorized records purge process that complies with your state's retention requirements.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Access does not have an 'Undo' function for saved records — once you navigate away from a record, all changes to it are permanent. This is why data entry accuracy and verification are even more critical in Access than in Excel. Before moving away from any record you have just entered or edited, re-read every field against the source document. A wrong digit in an insurance ID or a transposed date of birth that gets saved to an Access record may affect billing and patient care before the error is discovered and corrected.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a data entry training guide for front desk staff using Microsoft Access to enter patient registrations. Cover: keyboard navigation with Tab, how to undo a mistake before saving, how to find a specific patient record with Ctrl+F, when to use Filter By Selection, and the correct procedure for canceling an appointment (without deleting the record). Keep it practical and brief — one page maximum.' Customize the guide for your specific database field names.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are entering a patient record in Access and realize you mistyped the last name, but you have not yet moved to another row. What is the fastest way to undo the change to just the Last Name field?",
            options: [
              "Ctrl+Z — standard undo works in Access the same as Word",
              "Delete the entire record and re-enter it from scratch",
              "Press Escape once — this undoes the change to the current field while still in the record",
              "Close the database without saving — Access will discard the changes",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice data entry, editing, searching, and the delete confirmation workflow in your Access database.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Enter 10 fictional patient records into your Patients table using Tab navigation only (no mouse after the first click). Time yourself. Note any fields where Tab navigation felt awkward.",
          "Use Ctrl+F to find a specific patient by last name. Screenshot the Find dialog and the highlighted record.",
          "Use Filter By Selection to show only patients with a specific insurance plan. Screenshot the filtered view showing the filter indicator in the toolbar.",
          "Attempt to delete one patient record that has related appointment records (if referential integrity is set up — if not, just attempt deletion and screenshot the confirmation dialog). Write one sentence explaining what happened and why.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Find screenshot, Filter By Selection screenshot, and deletion attempt screenshot (plus your one-sentence explanation) to your instructor. These exercises confirm you can enter, locate, and manage records in an Access database — the daily workflow of data-intensive medical office roles.",
      },
    ],
  },

  {
    slug: "table-relationships",
    title: "Linking Tables with Relationships",
    description:
      "Define relationships between tables in Access using primary and foreign keys — connecting your data so that appointments always link to real patients and providers.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "In your Access database, the Patients table has patient records identified by PatientID. The Appointments table has appointment records, each with a PatientID field that should refer to a real patient. But right now, nothing prevents a staff member from entering PatientID 9999 in an appointment record when no patient with that ID exists. And nothing connects the two tables so you can ask 'show me all appointments for Maria Rodriguez.' This lesson creates those connections and the rules that enforce them.",
          },
        ],
      },
      {
        heading: "Understanding Relationships in Access",
        blocks: [
          {
            type: "paragraph",
            text: "A relationship in Access is a formal link between two tables, defined by a matching field — the primary key in one table (the 'one' side) and a foreign key in another table (the 'many' side):",
          },
          {
            type: "list",
            items: [
              "One-to-Many: one patient can have many appointments, but each appointment belongs to exactly one patient. The Patients table (PatientID is the primary key) is the 'one' side. The Appointments table (PatientID is the foreign key) is the 'many' side. This is the most common relationship type in a medical office database.",
              "Foreign key setup: the PatientID field in the Appointments table must have the same data type as the PatientID primary key in the Patients table. Both should be Number (Long Integer) if PatientID is an AutoNumber in Patients. The field names do not need to be identical, but they typically are for clarity.",
              "To open the Relationships view: click Database Tools > Relationships. This shows a visual diagram of all relationships in your database. Drag each table from the Show Table dialog into the diagram, then drag the primary key field from the 'one' table to the foreign key field in the 'many' table to create the relationship line.",
            ],
          },
        ],
      },
      {
        heading: "Referential Integrity",
        blocks: [
          {
            type: "paragraph",
            text: "Referential integrity is the rule that enforces valid relationships — it prevents orphaned records and ensures every foreign key value matches a real primary key value in the related table:",
          },
          {
            type: "list",
            items: [
              "Enabling referential integrity: when you create a relationship line in the Relationships view, Access shows a dialog. Check the 'Enforce Referential Integrity' checkbox. With this checked, Access will: (1) prevent creating an appointment record with a PatientID that does not exist in the Patients table, and (2) prevent deleting a patient record that still has related appointment records.",
              "Cascade Update Related Fields: if enabled, changing a patient's PatientID in the Patients table automatically updates all matching PatientID values in the Appointments table. For AutoNumber primary keys, IDs never change, so this option is rarely needed — but useful for natural keys that might change.",
              "Cascade Delete Related Records: if enabled, deleting a patient record automatically deletes all related appointment records. This is powerful but dangerous in a medical context — enabling cascade delete means one accidental patient deletion removes all their appointment history. Leave this unchecked in a healthcare database and instead manage deletions manually with appropriate authorization.",
            ],
          },
        ],
      },
      {
        heading: "Using Relationships in Queries",
        blocks: [
          {
            type: "paragraph",
            text: "Once relationships are defined, you can create queries that pull data from multiple related tables simultaneously — answering questions that span the entire database:",
          },
          {
            type: "list",
            items: [
              "A multi-table query in Access automatically recognizes the relationship and joins the tables correctly — when you add both the Patients table and the Appointments table to a Query Design, Access draws the relationship line between them. You can then select fields from both tables: patient name from Patients and appointment date from Appointments. The query returns one row per appointment, with the correct patient name filled in from the Patients table.",
              "Inner joins return only records that have matches in both tables — the default join type. A query joining Patients and Appointments with an inner join returns only patients who have at least one appointment, and only appointments that are linked to a real patient. Patients with no appointments are excluded.",
              "Left outer joins return all records from the left table even if there is no match in the right table — useful for finding patients who have not had any appointments (the appointment fields show as blank for those patients). Change the join type by double-clicking the relationship line in Query Design view.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "The Relationships view in Access shows the structure of your entire database — which tables exist, which fields link them, and which integrity rules are enforced. This structural view is sensitive: anyone who can see it understands the complete data model of your patient management system. Do not share screenshots of the Relationships view or the database structure with external parties (vendors, consultants, visitors) without your IT department's approval. Database structure is proprietary operational information.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Explain Microsoft Access relationships and referential integrity to someone who has just started learning databases. Use an analogy from a physical medical records room (filing cabinet, patient folders, appointment slips) to explain tables, primary keys, foreign keys, and what happens when referential integrity is enforced. Then explain the difference between cascade delete and NOT enabling cascade delete in a medical office context.' Use this explanation to help a colleague understand the database concepts.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Referential integrity is enforced between the Patients and Appointments tables. A staff member tries to enter an appointment for PatientID 9999, but no patient with that ID exists. What happens?",
            options: [
              "Access saves the appointment and marks the PatientID as unverified",
              "Access refuses to save the record and shows an error — referential integrity prevents foreign key values with no matching primary key",
              "Access creates a new patient record with PatientID 9999 automatically",
              "Access saves the record but marks it as an orphaned record for later review",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Define and test the relationships between your Patients and Appointments tables.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Database Tools > Relationships. Add both the Patients and Appointments tables to the diagram. Drag PatientID from the Patients table to PatientID in the Appointments table. In the relationship dialog, check 'Enforce Referential Integrity' (do NOT check cascade delete). Click Create. Screenshot the completed Relationships diagram showing the relationship line with 1 and infinity symbols.",
          "Test referential integrity: in Datasheet View, try to enter an appointment with a PatientID that does not exist (e.g., 99999). Screenshot the error message Access displays.",
          "Test deletion restriction: try to delete a patient record that has related appointment records. Screenshot the error message.",
          "Create a simple select query using Query Design that joins both tables and returns: PatientID, LastName, FirstName (from Patients) and AppointmentDate, VisitType (from Appointments). Run the query and screenshot the result showing patient names next to their appointments.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Relationships diagram screenshot, two error message screenshots, and query result screenshot to your instructor. These exercises confirm that your database enforces data integrity through relationships — the defining feature that makes Access more reliable than a spreadsheet for multi-table data management.",
      },
    ],
  },
];
