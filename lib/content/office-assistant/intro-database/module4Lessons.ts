import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "creating-queries",
    title: "Creating Queries in Microsoft Access",
    description:
      "Build Access queries to find, filter, and analyze data — from simple select queries to multi-table joins and calculated fields.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The billing manager at Lakeside Medical Associates pulls you aside with a problem: 'I need a list of all patients who had appointments in April 2025 but haven't been billed yet. I have to cross-reference the Appointments table and the Billing table by hand every month — it takes hours.' You recognize this immediately as a query problem. This lesson shows you how to build that query and many others like it.",
          },
        ],
      },
      {
        heading: "What Is a Query?",
        blocks: [
          {
            type: "paragraph",
            text: "A query is a saved question that Access answers by searching through your tables and returning a matching set of records. Unlike filtering a table (which is temporary), a saved query runs on demand against the latest data:",
          },
          {
            type: "list",
            items: [
              "Select queries retrieve records matching your criteria — the most common query type. 'Show all appointments for Dr. Rivera in May' is a select query. Access searches the Appointments table, returns only the matching rows, and displays them in a results grid called the Query Datasheet.",
              "Calculated fields let you derive new values — a query can calculate values that are not stored in the table. Calculating a patient's age from their Date of Birth field, or computing the total balance owed by subtracting Amount Paid from Amount Billed, are both calculated field examples.",
              "Multi-table queries pull data from related tables simultaneously — because Access tables are related (Appointments is linked to Patients), a query can show PatientName from the Patients table alongside AppointmentDate from the Appointments table in a single results grid. This is the real power of a relational database.",
              "Queries are always live — unlike a spreadsheet snapshot, a saved query re-runs against current table data every time you open it. If a new appointment is added this morning, a query for today's schedule will include it automatically.",
            ],
          },
        ],
      },
      {
        heading: "Building a Query in Design View",
        blocks: [
          {
            type: "paragraph",
            text: "Access provides two ways to build queries — the Query Wizard (step-by-step) and Query Design View (direct, more powerful). Design View is the one professional users rely on:",
          },
          {
            type: "list",
            items: [
              "Open Query Design: On the Create tab on the Ribbon, click Query Design. The Show Table dialog appears. Select the table(s) you want to query and click Add. Then click Close.",
              "Add fields to the query grid: The upper half of Design View shows a field list for each table you added. Double-click a field name to add it to the grid at the bottom, or drag it down. Each column in the grid represents one field that will appear in the query results.",
              "Set criteria for filtering: In the Criteria row under any field, type what you want to filter by. To find appointments on a specific date, click the Criteria row under AppointmentDate and type: #04/01/2025# (Access requires date values enclosed in # symbols). To find a specific provider, type the name in quotes: \"Rivera\" under ProviderLastName.",
              "Run the query: Click the red exclamation mark Run button (!) on the Design tab. Access immediately searches all records and displays only the matches. If the results are wrong, switch back to Design View (View button) and adjust your criteria.",
            ],
          },
          {
            type: "tip",
            text: "Use the Datasheet View / Design View toggle frequently. Design View is where you build; Datasheet View is where you see results. Switching back and forth quickly — build a little, check results, adjust — is how experienced Access users work.",
          },
        ],
      },
      {
        heading: "Filtering with Criteria",
        blocks: [
          {
            type: "paragraph",
            text: "Access query criteria use a specific syntax. These patterns cover most real medical office scenarios:",
          },
          {
            type: "list",
            items: [
              "Exact match: Type the value directly. For text: \"Smith\" — for numbers: 100 — for dates: #05/15/2025#. Access uses double-quotes for text and # symbols for dates.",
              "Range with Between: Between #04/01/2025# And #04/30/2025# returns all records in April. This is the standard way to filter by a date range — much cleaner than using >= and <=.",
              "Blank and not blank: Is Null finds records where the field is empty (useful for finding appointments with no bill entered). Is Not Null finds records where the field has any value.",
              "Multiple criteria on the same row are AND conditions — if you put criteria on the same Criteria row under two different fields, Access requires both conditions to be true. To find Dr. Rivera's appointments in April, put \"Rivera\" under ProviderLastName AND Between #04/01/2025# And #04/30/2025# under AppointmentDate — both on the same row.",
              "Multiple criteria on different rows are OR conditions — criteria in the Or row below create alternative conditions. To find appointments for either Dr. Rivera or Dr. Walsh, put \"Rivera\" in the Criteria row and \"Walsh\" in the Or row under the same field.",
            ],
          },
        ],
      },
      {
        heading: "Querying Across Multiple Tables",
        blocks: [
          {
            type: "paragraph",
            text: "One of Access's most powerful features is combining data from related tables in a single query. Because the Appointments table and the Patients table share a PatientID field, Access can join them automatically:",
          },
          {
            type: "list",
            items: [
              "Add both tables to Design View: When you open Query Design, use Show Table to add both the Patients table and the Appointments table. Access draws a line (a join line) between the two tables at the shared key field, indicating they are related.",
              "Add fields from either table: Now you can pull fields from both tables into the grid — PatientFirstName and PatientLastName from Patients, plus AppointmentDate and ProviderLastName from Appointments. When you run the query, Access automatically matches each appointment record to its corresponding patient record using the join.",
              "The join does the work: Without the relationship and join, you would have to manually cross-reference two tables. With the join, Access handles the matching instantly across thousands of records.",
            ],
          },
          {
            type: "callout",
            variant: "success",
            text: "The billing manager's problem — finding April appointments with no billing record — is solved by a query that joins Appointments to Billing and filters for Is Null in the BillingDate field. In less than five minutes, Access can generate a list that previously took hours of manual comparison.",
          },
        ],
      },
      {
        heading: "Saving and Reusing Queries",
        blocks: [
          {
            type: "paragraph",
            text: "A query that you build once can be run again and again. Save it with a descriptive name and it appears in the Queries section of the Navigation Pane:",
          },
          {
            type: "list",
            items: [
              "Save with Ctrl+S or the save icon — give the query a clear name that describes what it does: AprilUnbilledAppointments, TodayScheduleDrWalsh, PatientsByInsurance. Avoid names like Query1 or New Query.",
              "Double-click to run — from the Navigation Pane, any user with access to the database can double-click a saved query to run it instantly against the current data. No need to rebuild the query each time.",
              "Modify as needed — right-click a saved query and choose Design View to open it for editing. You can change criteria, add fields, or remove conditions without rebuilding from scratch.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You want to find all patient appointments scheduled between January 1, 2025 and March 31, 2025 that were seen by Dr. Walsh. Which criteria setup accomplishes this?",
            options: [
              "AppointmentDate criteria: >01/01/2025, ProviderLastName criteria: Walsh",
              "AppointmentDate criteria: Between #01/01/2025# And #03/31/2025#, ProviderLastName criteria: \"Walsh\" — both on the same Criteria row",
              "AppointmentDate criteria: Between #01/01/2025# And #03/31/2025#, ProviderLastName in a separate Or row: \"Walsh\"",
              "Run two separate queries and combine the results in Excel",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "designing-forms",
    title: "Designing Data Entry Forms",
    description:
      "Build Access forms that make data entry fast, consistent, and error-resistant — replacing raw table editing with a professional interface for front-desk staff.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "After the billing manager's query success, the front desk supervisor at Lakeside Medical Associates asks for help with a different problem: 'When new patients register, three different staff members enter their information directly into the table. Dates get typed in five different formats. Phone numbers have no consistent format. Can you make something easier for staff to use?' She is describing a Form — the Access object designed exactly for this purpose.",
          },
        ],
      },
      {
        heading: "Why Forms Instead of Direct Table Entry",
        blocks: [
          {
            type: "paragraph",
            text: "Entering data directly into an Access table's Datasheet View is like filling out a spreadsheet — you can do it, but it is error-prone and unfriendly for staff who are not database users. Forms solve this:",
          },
          {
            type: "list",
            items: [
              "Forms present one record at a time — instead of a grid of 500 rows, the staff member sees a clean screen with labeled fields for one patient. This reduces the chance of accidentally editing the wrong record.",
              "Forms can guide data entry — dropdowns for common values (like InsurancePlan or State), required field indicators, and tab order that moves logically through the form all reduce the cognitive load on the person entering data.",
              "Forms can show data from related tables — a patient registration form can show a patient's recent appointments at the bottom, even though that data lives in a separate Appointments table. The form combines data from multiple sources into a single, useful screen.",
              "Forms protect the underlying table structure — a well-designed form only shows the fields relevant to the task. Staff filling out a patient registration form do not need to see or accidentally modify the PatientID (primary key) field — the form simply does not show it.",
            ],
          },
        ],
      },
      {
        heading: "Creating a Form with the Form Wizard",
        blocks: [
          {
            type: "paragraph",
            text: "Access includes a Form Wizard that builds a working form from a table or query in under two minutes. Use it as a starting point, then customize in Design View:",
          },
          {
            type: "list",
            items: [
              "Open the Form Wizard: On the Create tab, click Form Wizard. The wizard asks which table or query the form is based on — select the Patients table.",
              "Select fields: Move only the fields relevant to data entry from Available Fields to Selected Fields. For a registration form, include PatientFirstName, PatientLastName, DateOfBirth, PhoneNumber, Email, InsurancePlan, and PrimaryProviderID. Leave PatientID out — Access manages the primary key automatically.",
              "Choose a layout: The wizard offers Columnar (one field per row — best for detailed forms), Tabular (all fields on one row, multiple records — similar to a spreadsheet), and Datasheet (like a grid). Choose Columnar for a patient registration form.",
              "Name and finish: Give the form a descriptive name (PatientRegistrationForm) and click Finish. Access generates the form and opens it in Form View — the live, working version that data entry staff will use.",
            ],
          },
        ],
      },
      {
        heading: "Customizing Forms in Design View",
        blocks: [
          {
            type: "paragraph",
            text: "The wizard creates a functional form, but Design View lets you improve it — rearranging fields, improving labels, setting tab order, and adding professional formatting:",
          },
          {
            type: "list",
            items: [
              "Switch to Design View: Right-click the form tab or use the View button. Design View shows the form as a canvas with a grid. Fields appear as text boxes with associated labels. Click any control to select it, then drag to move or resize.",
              "Improve labels: The label to the left of each field defaults to the field name (PatientFirstName). Double-click the label box and change it to something staff will recognize: 'First Name'. Use sentence case, not camelCase or underscores.",
              "Set the tab order: When staff press Tab to move between fields, Access should move in a logical order — not the order fields were added. On the Design tab, click Tab Order and drag field names into the correct sequence: First Name → Last Name → Date of Birth → Phone Number → Email → Insurance Plan.",
              "Add combo boxes for controlled data entry: Instead of a plain text box for InsurancePlan (where someone might type 'Blue Cross' vs 'BlueCross' vs 'blue cross'), convert it to a Combo Box. In Design View, right-click the InsurancePlan text box and choose Change To > Combo Box. Set the Row Source to the list of valid insurance plan names. Now staff pick from a dropdown instead of typing freehand.",
              "Mark required fields visually: Add an asterisk (*) to the labels of required fields, or use the form's header section to add a note: '* Required fields'. This is a visual convention that staff will recognize immediately.",
            ],
          },
        ],
      },
      {
        heading: "Navigation and Record Controls",
        blocks: [
          {
            type: "paragraph",
            text: "At the bottom of every Access form in Form View is the Record Navigation Bar — the controls staff use to move through records:",
          },
          {
            type: "list",
            items: [
              "The navigation arrows move between records: |< goes to the first record, < goes back one, > goes forward one, >| goes to the last record. The record counter in the middle shows the current record number and total count.",
              "The New Record button (the > with an asterisk: >*) moves to a blank record for entering a new patient. Train staff to always use this button rather than typing in an empty-looking record — occasionally an apparently blank record has an existing primary key.",
              "The Search box at the bottom lets staff type part of a name to jump to matching records. This is faster than using the arrow keys to scroll through hundreds of patients.",
              "Always save before navigating away: Access saves the current record automatically when you move to a different record or close the form. But if you make changes and want to discard them, press Escape before moving away.",
            ],
          },
          {
            type: "tip",
            text: "Create a separate form for each major data entry task — one for new patient registration, one for appointment scheduling, one for billing entries. A focused form is easier to use and harder to misuse than a single form that tries to do everything.",
          },
        ],
      },
      {
        heading: "Subforms: Showing Related Data",
        blocks: [
          {
            type: "paragraph",
            text: "A subform is a form embedded inside another form, showing related records from a linked table. This is one of Access's most useful features for medical office work:",
          },
          {
            type: "list",
            items: [
              "Main form / subform relationship: The main form shows one patient record. The subform at the bottom shows all appointments for that patient — fetched automatically based on the PatientID. As you move to a different patient in the main form, the subform updates instantly to show that patient's appointments.",
              "Building a subform: In Design View, use the Subform/Subreport control on the Controls panel (or run the Subform Wizard from the Design tab). Select the Appointments table as the data source, choose the fields to display (AppointmentDate, ProviderLastName, AppointmentType), and Access handles the linking automatically.",
              "Read-only vs editable subforms: For a registration form, the appointments subform might be set to read-only (so front desk staff can see a patient's history but not accidentally change appointment records). For a scheduling form, the appointments subform would be editable.",
            ],
          },
          {
            type: "knowledge-check",
            question: "A staff member reports that when she presses Tab to move between fields on the patient registration form, it jumps from First Name to Insurance Plan instead of going to Last Name next. What should you fix?",
            options: [
              "Delete the Insurance Plan field and re-add it",
              "Change the Tab Order in Form Design View to sequence fields correctly",
              "Turn off the Tab key in Access settings",
              "Rename the fields so they sort alphabetically in the correct order",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "building-reports",
    title: "Building Reports in Microsoft Access",
    description:
      "Create professional Access reports that present data clearly for managers, print neatly on paper, and can be exported as PDFs for sharing.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The practice manager at Lakeside Medical Associates reviews a monthly summary of appointments, grouped by provider and week, at the first staff meeting of each month. Currently, the office manager exports the Appointments table to Excel, manually formats it, adds subtotals, and prints it — a process that takes most of a Monday afternoon. You offer to build an Access report that generates this summary in under 30 seconds. The practice manager is immediately interested.",
          },
        ],
      },
      {
        heading: "What Reports Are For",
        blocks: [
          {
            type: "paragraph",
            text: "Reports are the 'output' side of Access — they take data from tables or queries and present it in a formatted, printable layout. Unlike queries (which show raw data in a grid) or forms (which are designed for data entry), reports are designed for reading and sharing:",
          },
          {
            type: "list",
            items: [
              "Reports are formatted for printing — margins, fonts, headers, footers, and page numbers are all designed to produce professional printed output. A report looks the same every time it prints.",
              "Reports can group and summarize — an appointment report grouped by Provider shows each provider's appointments together, with a subtotal of appointment count for each provider and a grand total at the end. Access calculates these totals automatically.",
              "Reports can be exported to PDF — with one click, any Access report can be saved as a PDF file, making it easy to email to a manager or attach to a billing submission without printing.",
              "Reports do not let you edit data — by design, reports are read-only. You cannot accidentally modify a patient record by viewing a report. This makes reports safe to share with anyone who needs information but should not change data.",
            ],
          },
        ],
      },
      {
        heading: "Creating a Report with the Report Wizard",
        blocks: [
          {
            type: "paragraph",
            text: "The Report Wizard is the fastest way to build a structured report. Like the Form Wizard, it generates a working report you can then customize:",
          },
          {
            type: "list",
            items: [
              "Start the wizard: On the Create tab, click Report Wizard. Select your data source — either a table or a saved query. For the monthly appointment summary, select the query you built earlier that joins Appointments and Patients and filters by date range.",
              "Choose fields: Select only the fields that belong in the report. For a monthly appointment summary: ProviderLastName, AppointmentDate, PatientLastName, PatientFirstName, AppointmentType. Avoid including internal ID fields that would confuse readers.",
              "Set grouping: The wizard asks whether to group records. Click ProviderLastName and add it as a grouping level. Access will now organize the report with each provider's name as a section heading, and all that provider's appointments listed beneath it.",
              "Set sort order: Within each provider group, sort by AppointmentDate ascending so dates appear in chronological order.",
              "Choose layout and finish: Select Stepped layout (most professional for grouped reports) and name the report: MonthlyAppointmentSummary. Click Finish and Access generates the report in Print Preview.",
            ],
          },
        ],
      },
      {
        heading: "Editing Reports in Design View",
        blocks: [
          {
            type: "paragraph",
            text: "Report Design View works similarly to Form Design View but has additional sections specific to grouped, multi-page output:",
          },
          {
            type: "list",
            items: [
              "Report sections: Access divides a report into sections — Report Header (appears once at the top), Page Header (repeats at the top of every page), Group Header (appears at the start of each provider group), Detail (repeats for every record), Group Footer (appears at the end of each provider group), Page Footer (repeats at the bottom of every page), and Report Footer (appears once at the end).",
              "Adding a title: Click in the Report Header section and add a label control. Type the report title: 'Monthly Appointment Summary — Lakeside Medical Associates'. Increase the font size to 16pt and make it bold.",
              "Adding the report date: In the Page Footer section, use the Date() function to insert today's date automatically. On the Design tab, click Date and Time — Access inserts a text box with =Date() that displays the current date every time the report is printed.",
              "Adding subtotals to group footers: Click in the ProviderLastName Footer section and add a text box. In the Control Source property, type: =Count([AppointmentDate]). This counts appointments for each provider group and displays the count in the footer row. Label it 'Total Appointments:'.",
              "Adjusting column widths: If fields overlap or get cut off, drag the right edge of the field control to resize. Preview the report frequently with Print Preview to see exactly how it will look when printed.",
            ],
          },
        ],
      },
      {
        heading: "Print Preview and Page Setup",
        blocks: [
          {
            type: "paragraph",
            text: "Before printing or exporting, use Print Preview to confirm the report looks exactly right:",
          },
          {
            type: "list",
            items: [
              "Access Print Preview via the View button or by double-clicking the report in the Navigation Pane. The report renders exactly as it will print, with page breaks, headers, and footers visible.",
              "Check page orientation: Long reports with many columns often need Landscape orientation. In Print Preview, click Page Setup and change Orientation to Landscape if needed.",
              "Check that nothing is cut off: A common report problem is that a field's text is wider than the column, so it shows as '####' or is simply truncated. Switch to Design View, widen the field control, and check again.",
              "Navigate pages: Use the navigation arrows at the bottom of Print Preview to move through all pages. Check the first page, last page, and at least one middle page to confirm consistency.",
            ],
          },
          {
            type: "tip",
            text: "If the report data should be filtered to a specific date range (like 'only April'), build that filter into the source query rather than in the report. Keep reports display-only and let queries handle data selection. This makes both objects simpler and more reusable.",
          },
        ],
      },
      {
        heading: "Exporting Reports to PDF",
        blocks: [
          {
            type: "paragraph",
            text: "Exporting an Access report to PDF is a one-step process that makes the report shareable without requiring the recipient to have Access installed:",
          },
          {
            type: "list",
            items: [
              "With the report open (in any view), go to the External Data tab on the Ribbon. Click PDF or XPS in the Export group.",
              "Choose a save location: Navigate to the shared network folder or the specific staff member's folder. Name the file descriptively: MonthlyAppointmentSummary_April2025.pdf.",
              "Click Publish: Access exports the complete report as a PDF file. The formatting, groupings, headers, and totals are all preserved exactly as they appear in Print Preview.",
              "Email the PDF: The resulting PDF file can be attached to an email or saved to a shared drive. Anyone with a PDF viewer (which every computer has by default) can open it — no Access required.",
            ],
          },
          {
            type: "knowledge-check",
            question: "The monthly appointment report needs to show a count of appointments for each provider at the bottom of their section. Where in Report Design View do you add the count control?",
            options: [
              "In the Report Header section",
              "In the Detail section, below the last record",
              "In the Group Footer section for the ProviderLastName group",
              "In the Page Footer section",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    slug: "exporting-access-data",
    title: "Exporting Access Data",
    description:
      "Move data out of Access into Excel, CSV, or PDF formats so you can share reports, support staff who do not have Access, and integrate with other office systems.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The billing contractor for Lakeside Medical Associates does not have Microsoft Access and cannot open the database file directly. She needs a monthly export of all appointment records in a format she can open in her own billing software. At the same time, the office manager wants appointment data in Excel so she can create a custom chart. And the practice manager wants a formatted PDF summary for the monthly board meeting. Three different recipients, three different formats — this lesson covers all three.",
          },
        ],
      },
      {
        heading: "When to Export vs. When to Print",
        blocks: [
          {
            type: "paragraph",
            text: "Access gives you two ways to share data: export (creating a separate file in a different format) and print (sending formatted output directly to a printer or PDF). Choosing the right method depends on what the recipient needs:",
          },
          {
            type: "list",
            items: [
              "Export to Excel when the recipient needs to work with the data — sort it, filter it, chart it, or run their own calculations. Excel is the right choice when the data is an input to further work, not a finished product.",
              "Export to CSV when the recipient uses software other than Excel — billing platforms, EHR systems, and other business applications typically accept CSV as a universal import format. CSV (Comma-Separated Values) is plain text — no formatting, no formulas, just raw data that any software can read.",
              "Export to PDF when you want the output to look exactly right — tables, charts, and reports exported as PDF are fixed-format documents. The recipient sees exactly what you created. Use PDF for board meeting summaries, compliance documents, and any output where formatting matters.",
              "Print directly when you need physical paper — for documents that need to be physically signed, filed in a paper chart, or posted on a bulletin board, printing directly from Access is the right choice.",
            ],
          },
        ],
      },
      {
        heading: "Exporting a Table or Query to Excel",
        blocks: [
          {
            type: "paragraph",
            text: "Exporting a table or query to Excel takes four clicks and is the most common export operation in a medical office that uses both Access and Excel:",
          },
          {
            type: "list",
            items: [
              "Select the object to export: In the Navigation Pane, click once on the table or query you want to export — for example, the AprilAppointments query.",
              "Open the External Data tab: On the Ribbon, click the External Data tab. In the Export group, click Excel.",
              "Choose the destination: In the Export dialog, click Browse and navigate to the shared drive folder where the file should be saved. Name the file descriptively: AprilAppointments_Export.xlsx. Check Export data with formatting and layout if you want Access to preserve column widths and number formatting.",
              "Click OK: Access creates the Excel file immediately. If you checked Open the destination file after the export operation is complete, the file opens in Excel automatically so you can confirm it looks correct.",
            ],
          },
          {
            type: "tip",
            text: "Export queries, not raw tables, when the recipient only needs a subset of data. A query that already filters for April 2025 appointments produces a smaller, cleaner Excel file than exporting the entire Appointments table and asking the recipient to filter it themselves.",
          },
        ],
      },
      {
        heading: "Exporting to CSV",
        blocks: [
          {
            type: "paragraph",
            text: "CSV export works the same way as Excel export, but uses the Text File option in the Export group:",
          },
          {
            type: "list",
            items: [
              "Select the table or query in the Navigation Pane, then on the External Data tab click Text File in the Export group.",
              "In the Export Text Wizard, choose Delimited as the format (this creates CSV format) and comma as the delimiter. Make sure Include Field Names on First Row is checked — most importing software expects the first row to be a header row with field names.",
              "Name the file with a .csv extension: AprilAppointments.csv. Click Finish.",
              "Verify the output: Open the CSV file in Notepad (right-click the file, choose Open with > Notepad) to confirm it looks right — each line is one record, fields are separated by commas, and the first line is the header row.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never export patient data to CSV and email it as an attachment without encryption. CSV files are plain text — anyone who intercepts the email can read every patient name, date of birth, and insurance number. For transmitting patient data to the billing contractor, use an encrypted file transfer method or a secure portal, not regular email.",
          },
        ],
      },
      {
        heading: "Saving Exports for Reuse",
        blocks: [
          {
            type: "paragraph",
            text: "When you perform the same export every month, Access can save the export steps so you do not have to repeat the configuration each time:",
          },
          {
            type: "list",
            items: [
              "At the final step of any export wizard, check Save export steps before clicking Close. Access asks you to name the saved export (AprilAppointmentsToExcel) and optionally create an Outlook task to remind you when to run it.",
              "Run a saved export: On the External Data tab, click Saved Exports. Select the export you want to re-run and click Run. Access re-runs the entire export — same source query, same destination, same format — in one click.",
              "Update the destination file name: If you save monthly exports with date-specific names (April2025.xlsx, May2025.xlsx), you will need to either edit the saved export each month or use a consistent file name that gets overwritten (Appointments_Current.xlsx). Decide on a naming convention before automating exports.",
            ],
          },
        ],
      },
      {
        heading: "Linking Access and Excel (Advanced Option)",
        blocks: [
          {
            type: "paragraph",
            text: "For teams that heavily use both Access and Excel, there is an alternative to manual exports — linking an Excel workbook to an Access query so the Excel file updates automatically:",
          },
          {
            type: "list",
            items: [
              "In Excel, on the Data tab, click Get Data > From Database > From Microsoft Access Database. Navigate to the .accdb file and select the query you want to link.",
              "Excel creates a live connection — the data appears in the Excel sheet. When the Access query data changes (new appointments added), the Excel user can click Refresh on the Data tab to pull the latest data without any export step.",
              "Use cases: This approach works well for a standing monthly report that the office manager builds in Excel using Access data. The template stays in Excel; the data source is always current from Access.",
              "Limitations: This approach requires the user to have network access to the Access database file. It does not work for sharing with external parties like billing contractors who are not on the office network.",
            ],
          },
          {
            type: "knowledge-check",
            question: "The billing contractor asks for a monthly patient appointment file she can import into her billing software. What export format should you use?",
            options: [
              "PDF — it is the most professional format",
              "Excel — everyone uses Excel",
              "CSV — it is a universal format that most software can import, and billing platforms typically expect it",
              "Access database file — share the entire .accdb file",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];
