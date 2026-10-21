import { Lesson } from "@/types/lesson";

/**
 * Google Workspace, Module 4: Google Sheets.
 * Scenario: Jordan Lee, office assistant at Parkview Property Management (fictional).
 */
const IMG = "/images/google-workspace/module-4";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const gwModule4Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "sheets-basics-and-formatting",
    title: "Spreadsheet Basics: Entering and Formatting Data",
    description:
      "Learn the Sheets screen, enter and edit data, format cells and numbers, freeze the header row, and work with sheet tabs.",
    objectives: [
      "Name the parts of the Sheets screen: cells, rows, columns, the name box, the formula bar, and sheet tabs",
      "Enter, edit, and clear data, and move between cells with Enter and Tab",
      "Format cells: bold, fill color, borders, and number formats such as currency and dates",
      "Freeze the header row, and add and rename sheets",
    ],
    duration: "25 min",
    slides: slides("sheets-basics-and-formatting", [
      "Spreadsheet basics in Google Sheets",
      "The Sheets screen: cells, name box, formula bar, sheet tabs",
      "Entering data: Enter moves down, Tab moves right",
      "Formatting cells and number formats",
      "Freeze the header row; add and rename sheets",
      "Quick check: which tool fits?",
    ]),
    sections: [
      {
        heading: "The Sheets screen",
        blocks: [
          {
            type: "scenario",
            role: "You keep Parkview's rent roll.",
            text: "Priya, the bookkeeper, keeps the rent roll for Elm Street Apartments in a Google Sheet. It is hard to read: the headers look like the data, the rents have no dollar signs, and the header row scrolls away when you look at the bottom of the list. A new tenant also needs to be added.",
            task: "Add the new tenant and format the sheet so anyone can read it.",
          },
          {
            type: "table",
            caption: "Parts of a Google Sheet",
            columns: ["Part", "What it is", "Same in Excel?"],
            rows: [
              ["Cell", "One box, named by column letter and row number, like B4", "Yes"],
              ["Name box", "Left of the formula bar; shows the selected cell and lets you jump to one", "Yes"],
              ["Formula bar (fx)", "Shows what is really in the cell: text, a number, or a formula", "Yes"],
              ["Sheet tabs", "At the bottom; one spreadsheet can hold many sheets. + adds a sheet", "Yes (worksheets)"],
              ["Toolbar", "Undo, print, number formats, font, bold, fill color, borders, and more", "Like the Home tab"],
            ],
          },
          {
            type: "list",
            items: [
              "Click a cell and type. Press Enter to save the entry and move down, or Tab to move right.",
              "To change a cell, click it and type over it, or double-click it (or press F2) to edit part of it.",
              "To clear cells, select them and press Delete.",
              "Like Docs, Sheets saves every change to Drive. There is no Save button.",
            ],
          },
        ],
      },
      {
        heading: "Formatting cells and numbers",
        blocks: [
          {
            type: "list",
            items: [
              "Select the cells first: click and drag, or click a column letter or row number to select the whole column or row.",
              "Bold, text color, Fill color, Borders, and Merge cells are on the toolbar.",
              "Number formats: Format as currency ($) and Format as percent (%) are on the toolbar. More formats (123) and Format › Number list the rest: Number, Date, Time, Accounting, and more.",
              "Shortcuts: Ctrl+Shift+4 currency, Ctrl+Shift+5 percent, Ctrl+Shift+1 number with decimals.",
              "Decrease or increase decimal places with the .0 and .00 buttons.",
              "Widen a column: drag the line at the right edge of its letter, or double-click that line to fit the longest entry.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "A number format changes how a number looks, not the number. 1450 formatted as currency shows $1,450.00, and formulas still use 1450.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the format",
            prompt: "Match each column to the number format it needs.",
            items: [
              { id: "n1", text: "Monthly rent", match: "Currency" },
              { id: "n2", text: "Share of apartments rented", match: "Percent" },
              { id: "n3", text: "Lease end", match: "Date" },
              { id: "n4", text: "Number of bedrooms", match: "Number (no decimals)" },
            ],
            explanation: "Choose the format readers expect: dollar signs for money, a percent sign for shares, and a date format for dates.",
          },
        ],
      },
      {
        heading: "Freeze rows and work with sheets",
        blocks: [
          {
            type: "list",
            items: [
              "View › Freeze › 1 row keeps the header row on screen while you scroll. Choose No rows to unfreeze.",
              "Add a sheet with + at the bottom left (or Shift+F11). Double-click a sheet tab to rename it.",
              "Right-click a tab to duplicate, delete, color, hide, or protect a sheet.",
            ],
          },
          {
            type: "worked-example",
            title: "Making the rent roll readable",
            task: "Turn a plain list into a rent roll anyone can read.",
            steps: [
              { move: "Bold the header row and give it a light fill color.", why: "Readers instantly tell the labels from the data." },
              { move: "Format the rent column as currency.", why: "Dollar signs and two decimals show it is money." },
              { move: "View › Freeze › 1 row.", why: "The labels stay visible at the bottom of a long list." },
              { move: "Rename the tab Elm Street.", why: "When Riverside gets its own tab, everyone knows which is which." },
            ],
            result: "A rent roll that is easy to scan and hard to misread.",
            takeaway: "Format the header, the numbers, and the tabs before you share a sheet.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "C4 shows $1,450.00. What does the formula bar show when you click C4?",
            options: ["$1,450.00", "1450", "C4", "Currency"],
            correctIndex: 1,
            explanation: "The formula bar shows the value in the cell. Currency is only how it is displayed.",
            optionRationales: [
              "That is the display. The formula bar shows the stored value.",
              "Correct. The value is 1450; the format adds the dollar sign and decimals.",
              "C4 is the cell's name, shown in the name box.",
              "Currency is the format, not the content.",
            ],
          },
          {
            type: "knowledge-check",
            question: "The header row disappears when you scroll to row 80. What fixes it?",
            options: ["Bold the header row", "View › Freeze › 1 row", "Sort the sheet", "Insert a new sheet"],
            correctIndex: 1,
            explanation: "Freezing keeps rows on screen while the rest scrolls.",
            optionRationales: [
              "Bold makes the header stand out but does not keep it on screen.",
              "Correct. Freeze 1 row keeps the header visible.",
              "Sorting reorders data; it does not keep the header visible.",
              "A new sheet does not change scrolling.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Build a small list in your own Google account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a spreadsheet named Budget Practice. In row 1, type Item, Category, Cost, and Date.",
          "Enter at least five rows of practice expenses (use Tab to move right and Enter to move down).",
          "Bold the header row and give it a fill color. Format the Cost column as currency and the Date column as a date.",
          "Freeze the header row. Rename the sheet tab Expenses.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Share the spreadsheet with your instructor as a Viewer, or submit a screenshot, to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "formulas-and-functions",
    title: "Formulas and Functions",
    description:
      "Calculate with formulas, use SUM, AVERAGE, MIN, MAX, COUNT, IF, and COUNTIF, copy formulas with the fill handle, and lock a reference with a dollar sign.",
    objectives: [
      "Write formulas that start with = and use cell references",
      "Use SUM, AVERAGE, MIN, MAX, COUNT, and COUNTA",
      "Copy a formula with the fill handle or Ctrl+D, and explain relative and absolute references",
      "Make decisions with IF and count matches with COUNTIF",
    ],
    duration: "30 min",
    slides: slides("formulas-and-functions", [
      "Formulas and functions in Google Sheets",
      "Every formula starts with =",
      "Functions you will use every week",
      "The fill handle copies formulas; references adjust",
      "Lock a reference with $ (F4)",
      "Quick check: which formula?",
    ]),
    sections: [
      {
        heading: "Formulas",
        blocks: [
          {
            type: "scenario",
            role: "You track repair costs for Kim Nguyen.",
            text: "Kim keeps the cost of every repair in a sheet: parts and labor. Denise wants the total for each repair, the totals for the month, and a flag on any repair that went over Parkview's $300 limit, without anyone adding numbers on a calculator.",
            task: "Let the sheet do the math.",
          },
          {
            type: "list",
            items: [
              "A formula starts with an equals sign: =C2+D2 adds the values in C2 and D2.",
              "Operators: + add, - subtract, * multiply, / divide, and parentheses for order: =(C2+D2)*1.08.",
              "Type the formula and press Enter. The cell shows the result; the formula bar shows the formula.",
              "Instead of typing a reference, you can click the cell while you type the formula.",
              "When a referenced cell changes, the result updates by itself.",
            ],
          },
        ],
      },
      {
        heading: "Functions",
        blocks: [
          {
            type: "table",
            caption: "Functions you will use every week",
            columns: ["Function", "What it does", "Example"],
            rows: [
              ["SUM", "Adds a range", "=SUM(E2:E8)"],
              ["AVERAGE", "The average of a range", "=AVERAGE(E2:E8)"],
              ["MIN and MAX", "The smallest and largest value", "=MAX(E2:E8)"],
              ["COUNT and COUNTA", "Counts cells with numbers; counts cells that are not empty", "=COUNTA(A2:A8)"],
              ["IF", "One result if a test is true, another if not", "=IF(E2>300,\"Over\",\"OK\")"],
              ["COUNTIF", "Counts cells that match a condition", "=COUNTIF(F2:F8,\"Over\")"],
            ],
          },
          {
            type: "list",
            items: [
              "Insert › Function, or Functions (Σ) on the toolbar, starts a function for you.",
              "As you type =SU, Sheets suggests matching functions and shows a help box with what each part means.",
              "Select a range of numbers and look at the bottom right: Sheets shows their sum without a formula.",
              "If you know Excel: these functions, and many more such as VLOOKUP and XLOOKUP, work the same way.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which function?",
            prompt: "Match each question to the function that answers it.",
            items: [
              { id: "fx1", text: "What did all the repairs cost together?", match: "SUM" },
              { id: "fx2", text: "What does a typical repair cost?", match: "AVERAGE" },
              { id: "fx3", text: "What was the most expensive repair?", match: "MAX" },
              { id: "fx4", text: "Was this repair over the limit?", match: "IF" },
              { id: "fx5", text: "How many repairs went over the limit?", match: "COUNTIF" },
            ],
            explanation: "SUM adds, AVERAGE finds the typical value, MAX finds the largest, IF makes a yes-or-no decision, and COUNTIF counts how many match.",
          },
        ],
      },
      {
        heading: "Copying formulas: relative and absolute references",
        blocks: [
          {
            type: "list",
            items: [
              "Click the cell with the formula and drag the small blue square at its bottom right corner (the fill handle) down the column. Or select the cell and the cells below and press Ctrl+D.",
              "References change as the formula is copied: =C2+D2 in row 2 becomes =C3+D3 in row 3. These are relative references.",
              "To keep a reference from changing, add dollar signs: $H$2 always points to H2. Press F4 while typing a reference to add them.",
            ],
          },
          {
            type: "worked-example",
            title: "Flagging repairs over the limit",
            task: "The $300 limit is in H2. Flag each repair in column F.",
            steps: [
              { move: "In F2, type =IF(E2>$H$2,\"Over\",\"OK\").", why: "E2 should change row by row, but every row must compare with the same limit in H2." },
              { move: "Fill F2 down to F8.", why: "Each row gets its own test: E3, E4, and so on, always against $H$2." },
              { move: "In F10, type =COUNTIF(F2:F8,\"Over\").", why: "Denise wants one number: how many went over." },
            ],
            result: "Every repair is flagged, and the count updates when Kim changes a cost or Denise changes the limit.",
            takeaway: "Put values that may change, like a limit or a tax rate, in their own cell and point to it with $.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You copy =C2+D2 from E2 down to E3. What is the formula in E3?",
            options: ["=C2+D2", "=C3+D3", "=$C$3+$D$3", "=E2"],
            correctIndex: 1,
            explanation: "Relative references move with the formula: one row down, so row 2 becomes row 3.",
            optionRationales: [
              "That would happen only with absolute references ($C$2).",
              "Correct. Relative references adjust to the new row.",
              "Copying does not add dollar signs.",
              "The fill handle copies the formula, not a reference to the cell above.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Every row must compare its total with the limit in H2. Which reference do you use for the limit?",
            options: ["H2", "$H$2", "H$", "=H2"],
            correctIndex: 1,
            explanation: "$H$2 stays the same in every row when the formula is copied.",
            optionRationales: [
              "H2 would become H3, H4, and so on as you fill down.",
              "Correct. The dollar signs lock both the column and the row.",
              "That is not a valid reference.",
              "The equals sign starts a formula; it does not lock a reference.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Add formulas to the Budget Practice sheet from the last lesson (or make a new list of five costs)." },
      {
        type: "list",
        ordered: true,
        items: [
          "Below the costs, use SUM for the total, AVERAGE for the average, and MAX for the highest cost.",
          "Type a spending limit in a cell to the right, such as 50.",
          "In a new column, use IF with an absolute reference to the limit to show Over or OK, and fill it down.",
          "Use COUNTIF to count how many items are Over.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Share the spreadsheet with your instructor as a Viewer, or submit a screenshot showing the formula bar for your IF formula. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "sort-filter-and-conditional-formatting",
    title: "Sorting, Filtering, and Conditional Formatting",
    description:
      "Sort a range, filter rows, save a filter view that only changes your view, highlight what matters with conditional formatting, and turn a list into a table.",
    objectives: [
      "Sort a range with a header row using Data › Sort range",
      "Filter rows with Data › Create a filter",
      "Create and save a filter view that does not change what others see",
      "Highlight cells with conditional formatting rules",
      "Convert a range to a table with Format › Convert to table",
    ],
    duration: "30 min",
    slides: slides("sort-filter-and-conditional-formatting", [
      "Sorting, filtering, and conditional formatting",
      "Sort range: include the header row, choose the column",
      "Filters change what everyone sees; filter views change only your view",
      "Conditional formatting: rules that color cells for you",
      "Tables: Format, then Convert to table",
      "Quick check: filter, filter view, or rule?",
    ]),
    sections: [
      {
        heading: "Sorting",
        blocks: [
          {
            type: "scenario",
            role: "You keep the maintenance request log with Kim.",
            text: "The log has dozens of requests from both buildings. Kim wants the requests grouped by building, Denise wants to see only what is still open, Marcus wants his own Riverside view without changing anyone else's, and the high-priority requests should stand out at a glance.",
            task: "Sort, filter, and highlight the log for each person's needs.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select the data, including the header row.",
              "Data › Sort range › Advanced range sorting options.",
              "Check Data has header row, choose the column to sort by, and choose A to Z or Z to A. Add another sort column for a second level.",
              "Click Sort.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Select every column of the data before you sort. If you sort only one column, it no longer lines up with the rest of its row, and the log is scrambled. If that happens, press Ctrl+Z right away.",
          },
        ],
      },
      {
        heading: "Filters and filter views",
        blocks: [
          {
            type: "list",
            items: [
              "Filter: select the data and choose Data › Create a filter (or right-click › Create a filter). Click the filter button in a header to filter by values, by condition, or by color. Data › Remove filter turns it off.",
              "A filter changes the sheet for everyone who has it open, and anyone who can edit can change it.",
              "Filter view: Data › Create filter view. Filter or sort, then click Save view at the top right, name it, and click Save. It changes only your view, so several people can use different views at the same time.",
              "Find saved views later with Data › Change view.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Filter or filter view?",
            prompt: "Sort each situation.",
            buckets: [
              { id: "filter", label: "Filter (everyone sees it)" },
              { id: "view", label: "Filter view (only your view)" },
            ],
            items: [
              { id: "v1", text: "Marcus wants to see only Riverside requests while Kim works on Elm Street", bucket: "view" },
              { id: "v2", text: "You are alone in the sheet and want a quick look at open requests", bucket: "filter" },
              { id: "v3", text: "Denise wants a saved view of high-priority requests she can reopen every morning", bucket: "view" },
              { id: "v4", text: "Three people are editing at once and each needs a different list", bucket: "view" },
            ],
            explanation: "When others are working in the same sheet, use a filter view so you do not change their screen. Save it if you will want it again.",
          },
        ],
      },
      {
        heading: "Conditional formatting and tables",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select the cells, then Format › Conditional formatting. The Conditional format rules panel opens on the right.",
              "Under Format cells if…, choose a condition, such as Text is exactly, Greater than, or Is empty, and type the value.",
              "Under Formatting style, choose how matching cells look.",
              "Click Done. The rule keeps working as data changes.",
            ],
          },
          {
            type: "paragraph",
            text: "A table turns a range into a structured list: select the data and choose Format › Convert to table. The table gets a header style and a name, and you can set a type for each column (such as number, date, dropdown, or checkbox) so entries that do not fit are flagged.",
          },
          {
            type: "table",
            caption: "If you know Excel",
            columns: ["Google Sheets", "Excel"],
            rows: [
              ["Data › Sort range", "Data › Sort"],
              ["Data › Create a filter", "Data › Filter"],
              ["Data › Create filter view", "Sheet views (in shared workbooks)"],
              ["Format › Conditional formatting", "Home › Conditional Formatting"],
              ["Format › Convert to table", "Insert › Table"],
            ],
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Kim and Marcus are both in the log. Marcus wants to see only Riverside rows without changing Kim's screen. What should he use?",
            options: ["Data › Create a filter", "Data › Create filter view", "Sort the sheet by building", "Delete the Elm Street rows"],
            correctIndex: 1,
            explanation: "A filter view changes only Marcus's view.",
            optionRationales: [
              "A filter changes the sheet for everyone, including Kim.",
              "Correct. A filter view affects only the person using it.",
              "Sorting reorders the rows for everyone and still shows Elm Street.",
              "Deleting data is never the way to hide it.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You want every High priority cell to turn red automatically, now and when new requests are added. What do you use?",
            options: ["Fill color on each cell", "A conditional formatting rule", "A filter", "Bold"],
            correctIndex: 1,
            explanation: "A conditional formatting rule checks the cells for you and keeps working as data changes.",
            optionRationales: [
              "Manual fill must be redone for every new request.",
              "Correct. Text is exactly High with a red fill keeps working automatically.",
              "A filter hides rows; it does not color them.",
              "Bold is manual formatting too.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use your Budget Practice sheet (add more rows if it has fewer than eight)." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sort the data by Category, A to Z, with Data has header row checked.",
          "Create a filter and show only one category. Then remove the filter.",
          "Create a filter view that shows only costs over a number you choose. Save it with a name.",
          "Add a conditional formatting rule that colors costs greater than your limit.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Share the spreadsheet with your instructor as a Viewer and tell them the name of your saved filter view, or submit screenshots. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "charts-and-pivot-tables",
    title: "Charts and Pivot Tables",
    description:
      "Turn numbers into a chart with Insert › Chart and the chart editor, and summarize a long list with a pivot table.",
    objectives: [
      "Insert a chart from selected data and change its type in the chart editor's Setup tab",
      "Add a chart title in the Customize tab",
      "Create a pivot table on a new sheet and add rows, columns, and values",
      "Explain when a chart or a pivot table is the better tool",
    ],
    duration: "25 min",
    slides: slides("charts-and-pivot-tables", [
      "Charts and pivot tables",
      "Insert, then Chart: select the data first",
      "The chart editor: Setup and Customize",
      "Pick the chart that fits the question",
      "Pivot tables summarize long lists",
      "Quick check: chart or pivot table?",
    ]),
    sections: [
      {
        heading: "Charts",
        blocks: [
          {
            type: "scenario",
            role: "You prepare numbers for the monthly owners' meeting.",
            text: "Marcus presents to the building owners each month. He wants a chart of repair requests by month, and a summary of rent by building from the 40-row rent roll, without retyping any numbers.",
            task: "Make the chart and the summary from the data you already have.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select the data, including the labels (for example, Month and Repairs).",
              "Insert › Chart. Sheets picks a chart type and opens the chart editor on the right.",
              "On the Setup tab, choose a different Chart type if you need one, and check the data range.",
              "On the Customize tab, open Chart & axis title to type a title and change its font.",
              "Drag the chart to move it; drag the blue markers to resize it. Double-click it to reopen the chart editor.",
            ],
          },
          {
            type: "table",
            caption: "Pick the chart that fits the question",
            columns: ["Question", "Chart"],
            rows: [
              ["How do the months compare?", "Column chart"],
              ["Is it going up or down over time?", "Line chart"],
              ["What share does each part make up?", "Pie chart (a few parts only)"],
              ["Which of many items is biggest?", "Bar chart"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the chart",
            prompt: "Match each question to the best chart.",
            items: [
              { id: "c1", text: "Are repair requests rising month by month?", match: "Line chart" },
              { id: "c2", text: "Which building had more requests in October?", match: "Column chart" },
              { id: "c3", text: "What share of apartments are one-bedroom units?", match: "Pie chart" },
            ],
            explanation: "Lines show change over time, columns compare amounts, and pies show parts of a whole when there are only a few parts.",
          },
        ],
      },
      {
        heading: "Pivot tables",
        blocks: [
          {
            type: "paragraph",
            text: "A pivot table summarizes a long list: total rent by building, number of repairs by type, average cost by vendor. You do not write formulas; you choose which column to group by and which to add up.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select the data. Every column needs a header.",
              "Insert › Pivot table. Check the data range, choose New sheet, and click Create.",
              "In the pivot table editor on the right, next to Rows, click Add and pick a column to group by (Building).",
              "Next to Values, click Add and pick the column to summarize (Rent). Sheets adds it up with SUM; choose another way, like AVERAGE or COUNTA, under Summarize by.",
              "Add a field under Columns to split the summary across the top (Status).",
              "The pivot table updates when the source data changes. Click it and choose Edit to reopen the editor.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Sheets may show Suggested pivot tables in the editor. They can be a good start; check that they answer your question.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Marcus needs total rent for each building from a 40-row rent roll. What is fastest?",
            options: ["Add the rents on a calculator", "A pivot table with Building in Rows and Rent in Values", "A pie chart", "Sort the sheet"],
            correctIndex: 1,
            explanation: "A pivot table groups the rows by building and adds the rents for you.",
            optionRationales: [
              "Slow, and the result would not update.",
              "Correct. Rows group by building; Values sums the rent.",
              "A chart shows numbers; it does not compute the totals by building table.",
              "Sorting groups rows but does not total them.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Where do you change a chart's title?",
            options: ["Setup tab", "Customize tab › Chart & axis title", "Format › Number", "Data › Sort range"],
            correctIndex: 1,
            explanation: "Titles and fonts are on the Customize tab of the chart editor.",
            optionRationales: [
              "Setup is for the chart type and the data range.",
              "Correct. Customize › Chart & axis title.",
              "Number formats change cells, not the chart title.",
              "Sorting changes the data order.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use your Budget Practice sheet." },
      {
        type: "list",
        ordered: true,
        items: [
          "Select the Category and Cost columns and insert a chart. Change it to a column chart and give it a title.",
          "Create a pivot table on a new sheet with Category in Rows and Cost in Values.",
          "Change one cost in your data and check that the pivot table and chart update.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Share the spreadsheet with your instructor as a Viewer, or submit a screenshot of your chart and pivot table. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "dropdowns-protection-and-sharing-sheets",
    title: "Dropdowns, Protected Ranges, and Sharing Sheets",
    description:
      "Keep shared sheets clean with dropdowns and checkboxes, protect formulas from accidental edits, leave notes and comments, and download a sheet as Excel or CSV.",
    objectives: [
      "Add a dropdown with Insert › Dropdown or Data › Data validation, and add checkboxes",
      "Protect a range so only you can edit it, and explain why protection is not a security measure",
      "Choose between a note and a comment",
      "Share a sheet and download it as Microsoft Excel or CSV",
    ],
    duration: "25 min",
    slides: slides("dropdowns-protection-and-sharing-sheets", [
      "Dropdowns, protected ranges, and sharing sheets",
      "Dropdowns keep entries consistent",
      "Checkboxes: Insert, then Checkbox",
      "Protect sheets and ranges",
      "Notes or comments?",
      "Quick check: which tool fits?",
    ]),
    sections: [
      {
        heading: "Dropdowns and checkboxes",
        blocks: [
          {
            type: "scenario",
            role: "You manage the shared supply order sheet.",
            text: "Four people add items to the monthly supply order. Categories are typed five different ways (cleaning, Cleaning, cleaning supplies), someone typed over the Total formulas last month, and Priya needs a copy in Excel for the accounting system.",
            task: "Make the sheet hard to break, then share and download it.",
          },
          {
            type: "list",
            items: [
              "Select the cells, then Insert › Dropdown (or Data › Data validation › Add rule, or right-click › Dropdown). The Data validation rules panel opens.",
              "Under Criteria, keep Dropdown and type each option, clicking Add another item for more. Choose Dropdown from a range to use a list already in the sheet.",
              "Advanced options: under If the data is invalid, entries that are not on the list are rejected by default; choose Show a warning to allow them with a warning. Display style can be Chip, Arrow, or Plain text.",
              "Click Done. A dropdown appears in each cell.",
              "Checkboxes: select the cells and choose Insert › Checkbox. A checked box is TRUE and an unchecked box is FALSE, so formulas can count them.",
            ],
          },
        ],
      },
      {
        heading: "Protecting formulas",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select the cells, then Data › Protect sheets and ranges. A panel opens on the right.",
              "Click Add a sheet or range. Check the Range (or choose Sheet), and type a description.",
              "Click Set permissions. Choose Restrict who can edit this range and pick Only you (or Custom to add people), or choose Show a warning when editing this range.",
              "Click Done.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Protection prevents accidents; it is not a security measure. People who can view the sheet can still print, copy, paste, and export protected content. Share sheets only with people who should see what is in them.",
          },
          {
            type: "table",
            caption: "Notes or comments?",
            columns: ["", "Note", "Comment"],
            rows: [
              ["Add it", "Right-click › Insert note, or Shift+F2", "Right-click › Comment, or Ctrl+Alt+M"],
              ["Looks like", "A small black triangle in the cell's corner", "A yellow triangle, with the discussion in a card"],
              ["Use it for", "A quiet explanation, like Price went up in October", "A question or task for someone, with replies and @mentions"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Which tool fits?",
            prompt: "Sort each request.",
            buckets: [
              { id: "dropdown", label: "Dropdown" },
              { id: "protect", label: "Protected range" },
              { id: "note", label: "Note" },
              { id: "comment", label: "Comment" },
            ],
            items: [
              { id: "d1", text: "Everyone must pick the category from the same three choices", bucket: "dropdown" },
              { id: "d2", text: "Nobody but you should change the Total formulas", bucket: "protect" },
              { id: "d3", text: "Explain that a price is higher because the vendor changed", bucket: "note" },
              { id: "d4", text: "Ask Priya whether the order needs approval", bucket: "comment" },
            ],
            explanation: "Dropdowns control what people enter, protection stops accidental edits, notes explain, and comments start a conversation.",
          },
        ],
      },
      {
        heading: "Sharing and downloading",
        blocks: [
          {
            type: "list",
            items: [
              "Share a sheet the same way as any file: Share at the top right, add people, pick Viewer, Commenter, or Editor.",
              "File › Download › Microsoft Excel (.xlsx) downloads every sheet as an Excel workbook.",
              "File › Download › Comma Separated Values (.csv) downloads only the sheet you are on, as plain data for another system.",
              "File › Version history shows earlier versions. Restoring a spreadsheet version clears the cell-by-cell edit history for earlier changes; make a copy instead if you need to keep that history.",
            ],
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You protected the Total column so only you can edit it. Can a coworker who can view the sheet copy those cells into another file?",
            options: ["No, protection blocks copying", "Yes. Protection stops edits, not copying, printing, or exporting", "Only if they are an Editor", "Only on a phone"],
            correctIndex: 1,
            explanation: "Protection prevents accidental changes. It is not a way to keep data private.",
            optionRationales: [
              "Copying is still possible.",
              "Correct. Share only with people who should see the data.",
              "Viewers can copy too.",
              "Device does not matter.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Priya's accounting system needs the current sheet as plain data. Which download?",
            options: ["PDF", "Comma Separated Values (.csv)", "Microsoft Excel (.xlsx)", "Web page"],
            correctIndex: 1,
            explanation: "A CSV file is plain data that most systems can import. It holds only the current sheet.",
            optionRationales: [
              "A PDF is a picture of the page, not data a system can import.",
              "Correct. CSV is plain data for other systems.",
              "Excel keeps formatting and every sheet; use it when the person works in Excel.",
              "A web page is for publishing, not importing.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Finish your Budget Practice sheet." },
      {
        type: "list",
        ordered: true,
        items: [
          "Add a dropdown to the Category column with three or four categories.",
          "Add a column named Paid with checkboxes.",
          "Protect the cells with your SUM and AVERAGE formulas so only you can edit them.",
          "Add a note to one cost explaining it.",
          "Download the spreadsheet as Microsoft Excel (.xlsx) and open it to check it.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the .xlsx file to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },
];
