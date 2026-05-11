import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "excel-data-table-structure",
    title: "Structuring a Data Table in Excel",
    description:
      "Learn the rules for building a properly structured Excel data table — consistent headers, clean data types, one-record-per-row discipline, and no merged cells.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The appointment tracking spreadsheet at Lakeside Medical Associates has 600 rows. The first 20 rows were entered by one staff member using consistent headers. The next 200 rows were added by a second person who spelled some column headers differently and occasionally merged two appointments into one cell. The last 380 rows are from a third person who added three new columns without headers. Sorting by date does not work, filtering by provider produces random results, and the whole file is a data management disaster. This lesson teaches you how to build the spreadsheet correctly from the start — and how to recognize and fix the most common structural errors.",
          },
        ],
      },
      {
        heading: "The Rules of a Proper Data Table",
        blocks: [
          {
            type: "paragraph",
            text: "A properly structured Excel data table follows specific rules that are non-negotiable if you want sorting, filtering, formulas, and PivotTables to work correctly:",
          },
          {
            type: "list",
            items: [
              "Rule 1 — One row per record: each row in the table should contain exactly one data record. A single cell should never contain multiple patients, multiple appointments, or multiple values separated by commas. If a patient has two phone numbers, the correct approach is either a second phone number column or a second row — not 'Cell: 555-1234 / Home: 555-5678' crammed into one cell.",
              "Rule 2 — One column per field: each column should contain one and only one type of information. 'First Name' and 'Last Name' should be separate columns, not combined in one 'Name' column. This allows you to sort by last name, search by first name, and format them independently. Never merge meaning into a single column.",
              "Rule 3 — Consistent headers in row 1 only: the first row should contain short, descriptive headers with no spaces, special characters, or merged cells. Use names like 'LastName', 'DOB', 'InsuranceID', 'ApptDate', 'ProviderID'. Do not repeat headers partway through the table. Do not leave row 1 blank and start headers in row 2.",
              "Rule 4 — Consistent data types per column: every cell in a given column should contain the same type of data. A column named 'Date of Birth' should contain only dates — not some dates, some text, and some blank cells with notes written in them. Inconsistent data types break every calculation and sort that uses that column.",
              "Rule 5 — No blank rows or columns within the data: blank rows inside the table break filtering, sorting, and any formula that tries to reference the whole table. A blank row signals to Excel that the table ends there. If you need visual separation, use conditional formatting or freeze panes instead.",
            ],
          },
        ],
      },
      {
        heading: "Converting a Range to an Excel Table",
        blocks: [
          {
            type: "paragraph",
            text: "Excel's built-in Table feature (Insert > Table) adds powerful functionality to any properly structured data range:",
          },
          {
            type: "list",
            items: [
              "Converting to a Table activates automatic filter dropdowns on every header — click any header's dropdown to sort or filter by that column instantly. This is one of the most useful features for data management tasks: filtering the appointment list by provider, date range, or visit type takes seconds.",
              "Tables auto-expand when you add new rows — when you type in the row directly below the table, Excel automatically extends the table to include the new row. This is significantly more reliable than manually selecting new rows to include in formulas and PivotTables.",
              "Table column references in formulas use names instead of cell addresses — instead of =SUM(D2:D500), a formula using a Table reference looks like =SUM(Table1[Total Cost]). This is readable, self-documenting, and automatically expands when new rows are added. It also does not break when rows are inserted or deleted.",
              "To create a Table: click any cell in your structured data range, press Ctrl+T (or Insert > Table), confirm the range and whether row 1 has headers, and click OK. Excel applies default formatting. Rename the table to something meaningful in the Table Design tab: 'Patients' or 'Appointments' instead of the default 'Table1.'",
            ],
          },
        ],
      },
      {
        heading: "Common Structural Errors to Fix",
        blocks: [
          {
            type: "paragraph",
            text: "When inheriting an existing spreadsheet, these are the most common structural problems to identify and correct before doing any analysis:",
          },
          {
            type: "list",
            items: [
              "Merged cells — merged cells are the enemy of data analysis. They prevent sorting, filtering, and formula referencing from working correctly. In a data table, never use merged cells. Unmerge all cells in the data area: select the data, Home > Alignment > Merge & Center dropdown > Unmerge Cells.",
              "Mixed data types in date columns — a Date of Birth column with some entries as dates (displaying in blue as 1/22/1978) and others as text (displaying in black as '01/22/1978' or 'January 22, 1978') will not sort correctly and cannot be used in date calculations. Select the entire column and apply a consistent date format: Home > Number > Short Date.",
              "Subtotals or summary rows mixed into the data — some spreadsheets have monthly subtotals inserted within the data range (a row saying 'January Total: $12,450' between January and February data). These rows break every analysis tool. Move summary rows below the main data table, or better, generate them with a PivotTable.",
              "Invisible leading or trailing spaces — text cells that look identical ('BlueCross' and 'BlueCross ' with a trailing space) are treated as different values by filtering, VLOOKUP, and sorting. Use the TRIM function to remove extra spaces: create a helper column with =TRIM(A2) and paste values over the original column.",
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
            text: "A shared data file that multiple staff members contribute to must have documented standards — what goes in each column, what format dates should be in, what abbreviations are acceptable. Without documented standards, structural erosion is inevitable: each new staff member adds data in a slightly different format, and within months the table is unusable for analysis. Before asking staff to enter data into a shared spreadsheet, write a one-page data entry guide that every contributor must follow. This is a front desk professional's responsibility, not just an IT task.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Design a properly structured Excel data table for tracking patient appointments at a small medical office. Include: all necessary column headers, recommended data types for each column, and a list of data entry rules that all staff contributing to this spreadsheet must follow. Format the column list as a table with three columns: Column Name, Data Type, and Entry Rule.' Use the design as the starting point for building a real appointment tracking spreadsheet.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A column in your patient spreadsheet shows some dates in blue (date format) and some in black (text format). When you sort by this column, the dates are not in chronological order. What is the problem and how do you fix it?",
            options: [
              "The sort direction is wrong — change from A to Z to Z to A",
              "The column has mixed data types (some dates, some text strings that look like dates). Select the column and apply a consistent Date format to convert all entries to true dates.",
              "The column needs to be converted to a Table before sorting works",
              "The dates in text format need to be moved to a separate column",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build and clean a properly structured Excel data table for Lakeside Medical Associates.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a new Excel workbook and build a patient appointment table with these columns: AppointmentID (Number), PatientLastName (Text), PatientFirstName (Text), DOB (Date), ProviderID (Text), AppointmentDate (Date), AppointmentTime (Text), VisitType (Text), InsurancePlan (Text), Notes (Text). Enter 15 fictional patient records, ensuring consistent data types in every column.",
          "Convert the range to an Excel Table (Ctrl+T). Rename the table 'Appointments' in the Table Design tab. Screenshot the table with filter dropdowns visible on the headers.",
          "Deliberately introduce two structural errors in a copy of the file: merge two cells in the header row, and add a blank row in the middle of the data. Then fix both errors and document what you did to fix them in a Word comment.",
          "Sort the table by AppointmentDate (ascending), then filter to show only one provider's appointments. Screenshot both the sorted and filtered views.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed Excel file (with the table named 'Appointments' and filters applied) and your two screenshots to your instructor. The table will be evaluated on structural correctness: correct data types, no merged cells, no blank rows, consistent headers, and proper Table conversion.",
      },
    ],
  },

  {
    slug: "sorting-filtering-searching",
    title: "Sorting, Filtering, and Finding Records",
    description:
      "Find any record in seconds using Excel's sort, filter, and search tools — the core data retrieval skills that make a well-structured table actually useful.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The practice manager at Lakeside Medical Associates needs three things from the appointment spreadsheet before her 2 PM meeting: all appointments for Dr. Walsh this month sorted by date, all patients with a BlueCross insurance plan, and the number of new patient appointments in April. Without knowing how to sort, filter, and use basic Excel functions, each of these takes 10 minutes of manual scanning. With the right skills, all three take under 60 seconds.",
          },
        ],
      },
      {
        heading: "Sorting Data",
        blocks: [
          {
            type: "paragraph",
            text: "Sorting rearranges all rows in a table based on the values in one or more columns — it does not delete or change any data, only the order in which rows appear:",
          },
          {
            type: "list",
            items: [
              "Single-column sort — click any cell in the column you want to sort by, then click the Sort A to Z (ascending) or Sort Z to A (descending) button in the Data tab. For a date column, Sort Oldest to Newest puts dates in chronological order. The fastest method: with an Excel Table, click the dropdown arrow in the column header and choose Sort A to Z from the dropdown menu.",
              "Multi-level sort — when you need to sort by more than one column (e.g., first by provider, then by appointment date within each provider), use Data > Sort to open the Sort dialog. Add a primary sort level (Provider), then click Add Level and add a secondary level (AppointmentDate). The table is sorted by provider first, then by date within each provider group.",
              "Custom sort order — for categorical data that has a logical order that is not alphabetical (e.g., January, February, March rather than alphabetical February, January, March), use Data > Sort > Order > Custom List. Excel includes months and days of the week as built-in custom lists, or you can create your own.",
              "Sorting does not affect the data — you can sort any way and then sort again in a different order. The original data is never changed by sorting. However, if you have a table with an autonumber ID column, sorting by ID always restores the original entry order.",
            ],
          },
        ],
      },
      {
        heading: "Filtering Data",
        blocks: [
          {
            type: "paragraph",
            text: "Filtering hides rows that do not match your criteria so you can focus on a specific subset of data — the hidden rows are not deleted, just temporarily invisible:",
          },
          {
            type: "list",
            items: [
              "Basic filter — with an Excel Table, click the dropdown arrow in any column header to see the filter options for that column. Uncheck 'Select All' and check only the values you want to see (e.g., 'Dr. Walsh' in the ProviderID column). All rows with other provider names are hidden; only Dr. Walsh's appointments are visible. A funnel icon appears in the header to indicate an active filter.",
              "Date filters — click the dropdown on a date column to see date-specific filter options: 'This Month,' 'Next Week,' 'Before [date],' 'After [date],' and custom date ranges. These are far faster than scrolling or manually specifying date values.",
              "Text filters — use 'Text Filters > Contains' to filter for any cell that contains a specific word or phrase. 'Text Filters > Begins With' finds entries starting with a specific string. These are useful for finding all records where the InsurancePlan field contains 'BlueCross' even if some are 'BlueCross PPO' and others are 'BlueCross HMO.'",
              "Clearing filters — to show all rows again, click the filter dropdown and choose 'Clear Filter from [column name],' or click the Clear button in the Data tab to clear all filters at once. Forgetting to clear filters before printing or sharing a spreadsheet is a common mistake — always check whether filters are active before finalizing a report.",
              "Multiple filters — you can apply filters on multiple columns simultaneously. For example, filter by ProviderID = 'Dr. Walsh' AND VisitType = 'New Patient' to see only Dr. Walsh's new patient appointments. Both filters are active at the same time.",
            ],
          },
        ],
      },
      {
        heading: "Finding and Replacing Data",
        blocks: [
          {
            type: "paragraph",
            text: "Find (Ctrl+F) and Find & Replace (Ctrl+H) are powerful tools for locating and updating specific values across a large dataset:",
          },
          {
            type: "list",
            items: [
              "Ctrl+F opens the Find dialog — type a value and press Enter to jump to the first cell containing that value. Press Find Next to move to the next occurrence. Use 'Find All' to see a list of all cells containing the search term at once.",
              "Ctrl+H opens Find & Replace — type the old value in 'Find what' and the new value in 'Replace with,' then click Replace All to update every instance in the spreadsheet simultaneously. This is how you fix a systemic data entry error: if 'BlueCross BlueShield' was consistently misspelled as 'BleuCross BlueShield' across 200 rows, Fix it in one Replace All action instead of 200 individual corrections.",
              "Use Find & Replace carefully with Replace All — always click 'Find All' first to review how many cells will be affected and confirm they are all the intended targets. A hasty Replace All on partial text can change values you did not intend to change.",
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
            text: "When sharing a filtered view of a spreadsheet (by email or screenshot), always note clearly that the data is filtered. A recipient who sees a filtered spreadsheet may believe they are seeing all the data when they are only seeing a subset. In a billing or patient management context, an incomplete view of the data could lead to incorrect decisions. Either clear all filters before sharing, or include a clear label: 'Filtered: Provider = Dr. Walsh, Month = May 2025.'",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a step-by-step guide for a medical office assistant on how to use Excel's sort and filter features to answer these specific questions from a practice manager: (1) How many new patient appointments did each provider have this month? (2) Which patients have a BlueCross insurance plan and an appointment next week? (3) What is the chronological order of all appointments on May 20? Provide exact steps for each question.' Follow each set of steps on your practice spreadsheet.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You apply a filter to show only appointments for Dr. Walsh. Then you print the spreadsheet and give it to your supervisor. She asks why the data only shows Dr. Walsh's patients and not everyone else. What most likely happened?",
            options: [
              "The print settings were wrong and only printed one page",
              "You forgot to clear the filter before printing — only the visible (filtered) rows printed",
              "The spreadsheet was saved with the filter permanently applied",
              "The printer skipped rows due to a paper jam",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice sorting, filtering, and finding data in your appointment spreadsheet.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Sort your appointment table by AppointmentDate ascending, then by PatientLastName within the same date. Screenshot the sorted result.",
          "Filter the table to show only appointments for one specific provider and one specific visit type (New Patient). Screenshot the filtered result showing the funnel icons in the header.",
          "Use Find & Replace to change one insurance plan name across all records (e.g., change 'BlueCross' to 'BCBS'). Confirm the change applied to all relevant rows. Screenshot before and after.",
          "Clear all filters and sort. Use Find (Ctrl+F) to locate one specific patient by last name. Screenshot the Find dialog and the highlighted result.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your four screenshots to your instructor. These exercises confirm you can answer the most common practice manager data questions in under 60 seconds — a key productivity skill for any data-facing role in a medical office.",
      },
    ],
  },

  {
    slug: "excel-data-functions",
    title: "Using Excel Functions for Data Analysis",
    description:
      "Write the data analysis functions — VLOOKUP, COUNTIF, SUMIF, and IFERROR — that transform raw appointment and billing data into actionable answers.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates asks for a quick analysis before the monthly meeting: how many appointments did each provider have in May, what is the total billed amount for BlueCross patients, and which patient IDs appear in the billing sheet but not in the patient registration sheet. Three questions, three functions — COUNTIF, SUMIF, and VLOOKUP. This lesson teaches you all three and adds IFERROR to handle the inevitable mismatches gracefully.",
          },
        ],
      },
      {
        heading: "COUNTIF: Count Records That Meet a Condition",
        blocks: [
          {
            type: "paragraph",
            text: "COUNTIF counts the number of cells in a range that meet a single condition — one of the most useful functions for generating quick summaries from a data table:",
          },
          {
            type: "list",
            items: [
              "Syntax: =COUNTIF(range, criteria) — range is the column to check, criteria is the condition to match. To count how many appointments belong to Dr. Walsh: =COUNTIF(Appointments[ProviderID], \"Dr. Walsh\"). To count appointments in May 2025 you would use COUNTIFS (plural) which supports multiple criteria.",
              "COUNTIFS extends COUNTIF to multiple conditions — =COUNTIFS(Appointments[ProviderID],\"Dr. Walsh\",Appointments[VisitType],\"New Patient\") counts only Dr. Walsh's new patient appointments. Each pair of arguments is a range + criteria combination, and all conditions must be true for a row to be counted.",
              "Use cell references instead of typed values for flexibility — =COUNTIF(Appointments[ProviderID],H2) where H2 contains 'Dr. Walsh' is more flexible than hardcoding the name in the formula. When you change the provider name in H2, the count updates automatically. This makes it easy to build a provider summary table where each row shows the count for a different provider.",
            ],
          },
        ],
      },
      {
        heading: "SUMIF: Sum Values That Meet a Condition",
        blocks: [
          {
            type: "paragraph",
            text: "SUMIF adds up numeric values in one column, but only for rows where another column meets a condition — the financial analysis companion to COUNTIF:",
          },
          {
            type: "list",
            items: [
              "Syntax: =SUMIF(range, criteria, sum_range) — range is the column to check against the condition, criteria is the condition, and sum_range is the column whose values you want to add. To find the total billed amount for BlueCross patients: =SUMIF(Appointments[InsurancePlan],\"BlueCross\",Appointments[BilledAmount]).",
              "SUMIFS extends to multiple conditions — =SUMIFS(Appointments[BilledAmount],Appointments[InsurancePlan],\"BlueCross\",Appointments[ProviderID],\"Dr. Walsh\") sums only BlueCross billings for Dr. Walsh specifically. Note the argument order changes: the sum range comes first in SUMIFS.",
              "Use SUMIF for monthly financial summaries — pair it with a list of insurance plans on the left and SUMIF formulas on the right to build an automatic monthly revenue summary by payer. Every time new appointment rows are added to the Table, the summary formulas update instantly.",
            ],
          },
        ],
      },
      {
        heading: "VLOOKUP: Look Up a Value in Another Table",
        blocks: [
          {
            type: "paragraph",
            text: "VLOOKUP retrieves a value from another table based on a matching key — the critical function for connecting data from two related tables (like patients and appointments):",
          },
          {
            type: "list",
            items: [
              "Syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]) — lookup_value is the key you are searching for, table_array is the range containing the lookup table, col_index_num is which column of that table to return, and range_lookup should almost always be FALSE (for exact match).",
              "Example: If the Appointments sheet has PatientIDs and you want the patient's last name from the Patients sheet — =VLOOKUP(A2,Patients!A:C,2,FALSE). This looks for the PatientID in column A2, searches the Patients sheet columns A through C, and returns the value from the 2nd column of that range (LastName).",
              "VLOOKUP only looks left-to-right — the lookup column must be the leftmost column in the table_array. If your key column is not on the left, use INDEX/MATCH instead. For most medical office tasks, VLOOKUP is sufficient.",
              "VLOOKUP returns #N/A when no match is found — this happens when a Patient ID in the Appointments sheet does not exist in the Patients sheet (a data integrity problem). Wrap VLOOKUP in IFERROR to handle these gracefully.",
            ],
          },
        ],
      },
      {
        heading: "IFERROR: Handle Errors Gracefully",
        blocks: [
          {
            type: "paragraph",
            text: "IFERROR wraps any formula and returns a custom value if that formula produces an error — essential for professional-looking spreadsheets that do not show #N/A or #VALUE! errors:",
          },
          {
            type: "list",
            items: [
              "Syntax: =IFERROR(formula, value_if_error) — if the formula returns any error (#N/A, #VALUE!, #DIV/0!, etc.), display value_if_error instead. For a VLOOKUP that might not find a match: =IFERROR(VLOOKUP(A2,Patients!A:C,2,FALSE),\"Patient Not Found\"). The error is suppressed and a meaningful message appears instead.",
              "Common error_if_value choices: empty string \"\" (shows blank cell instead of error), \"Not Found\", \"Missing\" (descriptive message), 0 (for numeric formulas where an error should be treated as zero). Choose based on what makes the most sense for the reader of the spreadsheet.",
              "Use IFERROR for diagnostic purposes too — if you want to find all the #N/A errors from a VLOOKUP to identify data mismatches, do not use IFERROR. Let the errors appear so you can see which rows have no match — then investigate those mismatches as data quality issues.",
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
            text: "Spreadsheet formulas that produce results can be wrong for reasons that are not visually obvious — a SUMIF that returns $0 is not necessarily correct if the criteria text does not exactly match the data. Before relying on formula results for financial decisions or reports, always do a manual spot check: pick 3–5 rows manually, verify they should or should not be included in the count or sum, and confirm the formula's result matches your manual count. Formula validation is part of responsible data management.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write Excel formulas for these specific tasks in a medical office appointment tracking spreadsheet with a Table named Appointments containing columns: PatientID, LastName, ProviderID, AppointmentDate, VisitType, InsurancePlan, BilledAmount: (1) Count appointments for Dr. Walsh in May 2025. (2) Sum total BilledAmount for all BlueCross patients. (3) Look up a patient's LastName from a Patients table using their PatientID, showing \"Not Found\" if no match. (4) Count all New Patient appointments across all providers.' Test each formula in your spreadsheet.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Your VLOOKUP formula returns #N/A for some rows in your appointment spreadsheet. What does this most likely mean?",
            options: [
              "The formula syntax is incorrect — rewrite it",
              "Those rows have a PatientID that does not exist in the Patients lookup table — a data integrity problem to investigate",
              "The column index number is too high",
              "Excel cannot process that many rows",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a data analysis summary using COUNTIF, SUMIF, VLOOKUP, and IFERROR.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Add a BilledAmount column to your Appointments table with fictional dollar values for each row ($75–$350 range). Add an InsurancePlan column if not already present.",
          "Create a new sheet called 'Summary.' Build a provider summary table with three columns: ProviderID (list your providers), Total Appointments (COUNTIF formula), and Total Billed (SUMIF formula). Each row should show the count and billed total for that provider automatically.",
          "Create a second summary table showing Total Appointments and Total Billed per InsurancePlan using COUNTIF and SUMIF.",
          "Add a VLOOKUP column to your Appointments sheet that retrieves the patient's last name from a small Patients reference table on a third sheet (create the Patients sheet with 5 fictional patients: PatientID and LastName). Wrap in IFERROR to show 'Not Found' for any unmatched IDs.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Excel workbook (with Appointments, Summary, and Patients sheets) to your instructor. The Summary sheet will be evaluated on whether the COUNTIF and SUMIF formulas return correct results for the data in your Appointments sheet. Spot-check three rows manually to verify accuracy before submitting.",
      },
    ],
  },

  {
    slug: "excel-reports",
    title: "Creating Simple Reports from Excel Data",
    description:
      "Turn a data table into a professional, printable report using PivotTables, formatting, and charts — the output that managers and practice owners actually read.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The practice manager at Lakeside Medical Associates needs a monthly appointment report every first Monday. It should show: total appointments by provider, total appointments by visit type, a breakdown by insurance plan, and a line chart of daily appointment volume for the month. She does not want to see raw data — she wants a clean, readable one-page summary she can bring to the providers' meeting. This lesson teaches you to build exactly that.",
          },
        ],
      },
      {
        heading: "PivotTables: Instant Summary Reports",
        blocks: [
          {
            type: "paragraph",
            text: "A PivotTable summarizes data from a large table into a compact, configurable summary report — it is the most powerful and time-saving analysis tool in Excel for data management tasks:",
          },
          {
            type: "list",
            items: [
              "Creating a PivotTable: click any cell in your data Table, then go to Insert > PivotTable. Excel suggests a new sheet. Click OK. The PivotTable Field List appears on the right — drag fields from the field list into the Rows, Columns, Values, and Filters areas to build your summary.",
              "Example: drag ProviderID to Rows and AppointmentID to Values (Excel will count the appointments). The result is a table showing total appointments per provider. Drag InsurancePlan to Columns to cross-tabulate by both provider and insurance plan in a single step.",
              "Change the value summary type — by default, PivotTable counts for text fields and sums for numeric fields. To change from Sum to Count, right-click any value cell in the PivotTable and choose Value Field Settings > Summarize Values By > Count. For a BilledAmount sum, choose Sum.",
              "Refresh the PivotTable when new data is added — PivotTables do not update automatically when new rows are added to the source table. Right-click anywhere in the PivotTable and choose Refresh, or go to PivotTable Analyze > Refresh. Set a habit of refreshing before presenting any PivotTable-based report.",
              "PivotTable slicers are visual filters — click PivotTable Analyze > Insert Slicer to add a visual filter button panel. Click a provider button to filter the PivotTable to that provider instantly. Slicers make PivotTables interactive for presentations.",
            ],
          },
        ],
      },
      {
        heading: "Creating Charts from Data",
        blocks: [
          {
            type: "paragraph",
            text: "Charts visualize trends and comparisons that are hard to see in raw numbers — the right chart type communicates insights instantly:",
          },
          {
            type: "list",
            items: [
              "Select the data to chart: click any cell in a summary table, select the entire table (Ctrl+Shift+End), then go to Insert > Charts and choose the chart type. Excel recommends appropriate chart types based on your data selection.",
              "Chart types for medical office reports: Bar/Column charts compare values across categories (appointments per provider, revenue by insurance plan). Line charts show trends over time (daily or weekly appointment volume). Pie charts show proportions (percentage of appointments per visit type) — use these sparingly as they become hard to read with more than 5 slices.",
              "Format charts for professional presentation: add a descriptive title (click the chart title and type), label the axes (Chart Design > Add Chart Element > Axis Titles), and remove unnecessary gridlines and legends when the chart is self-explanatory. A chart for a manager's report should tell its story immediately without the reader needing to study it.",
            ],
          },
        ],
      },
      {
        heading: "Formatting a Report for Printing",
        blocks: [
          {
            type: "paragraph",
            text: "A great analysis that prints badly — cut off, scattered across multiple pages, with tiny unreadable text — loses most of its value. Professional Excel reports are designed for the printed or PDF page:",
          },
          {
            type: "list",
            items: [
              "Set the print area: select the cells you want to print, go to Page Layout > Print Area > Set Print Area. Only the selected area will print — this prevents blank rows, extra columns, and the raw data table from appearing in the printed report.",
              "Fit to one page: in Page Layout > Scale to Fit, set Width to 1 page and Height to 1 page (or 'Automatic' for Height if the content is longer). This scales the content to fit one printed page without cutting off any columns.",
              "Add headers and footers: Page Layout > Page Setup > Header/Footer. Add the report name in the header center and the date and page number in the footer. In a professional setting, every printed report should be identifiable and dated without needing to open the file.",
              "Preview before printing: Ctrl+P opens the Print dialog with a live preview. Review every page of the preview before printing. A poorly formatted report that requires 12 reprints wastes paper and time — one careful preview prevents this.",
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
            text: "Reports derived from patient data — even aggregate reports that do not show individual patient names — may still constitute a use of PHI that requires authorization under HIPAA. A report showing 'number of patients with diagnosis X by provider' is potentially PHI if the numbers are small enough to identify individuals. Before distributing any report containing counts or aggregates from patient data, confirm with your supervisor that the report is approved for that distribution list and does not require de-identification under HIPAA Safe Harbor rules.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I need to build a monthly appointment summary report for a medical practice manager using Excel PivotTables. The report should show: (1) Total appointments by provider, (2) Total appointments by visit type, (3) Total billed amount by insurance plan, and (4) A column chart of appointments by provider. Walk me through the exact steps to build each component starting from a raw appointment Table.' Follow the steps on your practice spreadsheet.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You added 50 new appointment rows to your source table since creating the PivotTable report. The PivotTable still shows last month's totals. What do you need to do?",
            options: [
              "Delete the PivotTable and create a new one",
              "Manually add the new totals to the PivotTable",
              "Right-click the PivotTable and select Refresh to update it with the new data",
              "Sort the source table — PivotTables update automatically when the data is sorted",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build the complete monthly appointment summary report for Lakeside Medical Associates.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a new sheet called 'Monthly Report.' Build a PivotTable summarizing total appointments and total billed amount by ProviderID. Screenshot the completed PivotTable.",
          "Create a second PivotTable (or modify the first) to show appointment counts by InsurancePlan. Screenshot.",
          "Create a column chart from the Provider PivotTable showing appointment count per provider. Add a title: 'Appointments by Provider — May 2025.' Screenshot the chart.",
          "Set a print area covering both PivotTables and the chart. Format the print area to fit on one page with a header ('Lakeside Medical Associates — Monthly Appointment Summary') and footer (date + page number). Use Ctrl+P to preview and screenshot the print preview.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Excel workbook (all sheets), your four screenshots, and your print preview screenshot to your instructor. The monthly report will be evaluated for correct PivotTable data, a professional chart with title, and a print-ready layout. This is the exact deliverable a practice manager would expect on the first Monday of every month.",
      },
    ],
  },
];
