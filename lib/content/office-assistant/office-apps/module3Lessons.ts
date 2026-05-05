import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "intro-to-excel-2019",
    title: "Introduction to Microsoft Excel 2019",
    description:
      "Get oriented in the Excel 2019 interface, understand workbooks and worksheets, learn to navigate large spreadsheets efficiently, and manage your files professionally.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/lgIWIPDJuPo",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-01.jpg",
        alt: "Welcome to Microsoft Excel 2019 — the grid-based world of data organization and analysis",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-02.jpg",
        alt: "The Excel Interface — Ribbon, Name Box, Formula Bar, Sheet tabs, and column/row headers",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-03.jpg",
        alt: "Cells, Ranges, and Cell Addresses — understanding the A1 reference system",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-04.jpg",
        alt: "Workbooks vs Worksheets — multiple sheets within one file and how to manage them",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-05.jpg",
        alt: "Navigating Large Spreadsheets — keyboard shortcuts for moving efficiently through data",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-06.jpg",
        alt: "Freeze Panes and Split View — keeping headers visible while scrolling through data",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-07.jpg",
        alt: "File Formats — .xlsx vs .csv vs .pdf and when each is appropriate",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-08.jpg",
        alt: "AutoSave, Version History, and File Recovery in Excel 2019",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct Excel interface element for each task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your first week at Lakeside Medical Associates includes a request from the office manager: 'Can you pull up the supply tracker, find the entry for exam gloves, and tell me how many boxes we have in stock?' The file she gives you is an Excel workbook with six worksheet tabs and over 300 rows of data. If you do not know how to navigate Excel's interface or use its keyboard shortcuts to jump around a large spreadsheet, this simple task could take embarrassing minutes. This lesson gets you comfortable in Excel before you are thrown into a real spreadsheet under pressure.",
          },
        ],
      },
      {
        heading: "The Excel 2019 Interface",
        blocks: [
          {
            type: "paragraph",
            text: "Excel 2019's interface is fundamentally different from Word's — instead of a text canvas, it presents a grid of rows and columns where each intersection (a cell) can hold a value, a formula, or a label. Understanding the names of each interface element is essential for following instructions, reading documentation, and describing problems accurately:",
          },
          {
            type: "list",
            items: [
              "The Ribbon in Excel is organized into Home, Insert, Page Layout, Formulas, Data, Review, and View tabs — similar to Word's Ribbon but with Excel-specific command groups. The Formulas tab is particularly important and contains all of Excel's function categories. The Data tab is where you will find sorting, filtering, and data validation tools that are essential for managing lists and trackers.",
              "The Name Box is the small field at the far left of the formula bar that displays the address of the currently selected cell (e.g., A1, B12, or a range like A1:D10). You can type a cell address or range name directly into the Name Box and press Enter to navigate there instantly — this is the fastest way to jump to a specific cell in a large spreadsheet without scrolling.",
              "The Formula Bar is the wide field to the right of the Name Box that displays the content of the currently selected cell — either the value you see in the cell, or the full formula behind a calculated result. When you click a cell that shows '1,245' and the formula bar shows '=SUM(B2:B25)', you know the cell contains a formula, not a manually typed number. Always check the formula bar before editing a cell to confirm whether it contains a formula or static data.",
              "Sheet tabs at the bottom of the Excel window represent individual worksheets within the same workbook file — a workbook can contain many sheets, each acting as a separate data table or view. Right-click a sheet tab to rename it, change its color, move it, copy it, or delete it. For a supply tracker at Lakeside Medical Associates, you might have tabs named 'Medical Supplies,' 'Office Supplies,' 'Cleaning Supplies,' and 'Summary.'",
              "Column headers run across the top of the grid as letters (A, B, C … Z, AA, AB…) and row headers run down the left side as numbers (1, 2, 3…). Every cell is identified by its column letter and row number — the cell where column B meets row 7 is cell B7. Ranges are identified by the top-left and bottom-right cells separated by a colon — B2:D10 is the rectangular range from column B row 2 to column D row 10.",
            ],
          },
        ],
      },
      {
        heading: "Navigating Large Spreadsheets",
        blocks: [
          {
            type: "paragraph",
            text: "A spreadsheet with hundreds of rows and dozens of columns can feel overwhelming if you rely only on the mouse and scroll bar. These keyboard navigation techniques let you move through a large spreadsheet with precision and speed:",
          },
          {
            type: "list",
            items: [
              "Ctrl+Home jumps to cell A1 — the very beginning of the spreadsheet — from anywhere in the workbook. This is your 'reset' shortcut when you are lost in a large file. Ctrl+End jumps to the last cell in the spreadsheet that contains data or formatting — useful for finding out how far your data extends without scrolling.",
              "Ctrl+Arrow keys move to the edge of a contiguous data block in the direction of the arrow — Ctrl+Down jumps from the first filled cell in a column down to the last filled cell before the first empty cell. This is the fastest way to reach the bottom of a 300-row list. Ctrl+Right moves to the last filled cell in the current row. These shortcuts are essential for navigating large datasets quickly.",
              "Freeze Panes keeps row or column headers visible as you scroll — without freeze panes, scrolling down in a 300-row spreadsheet means your column headers (Item, Quantity, Cost, etc.) disappear off the top and you lose context. To freeze the header row, click on cell A2 (the cell below and to the right of everything you want frozen), then click View > Freeze Panes > Freeze Panes. Now row 1 remains visible no matter how far you scroll down. To freeze both the header row and the first column, click cell B2 before freezing.",
              "Ctrl+F opens the Find dialog — type any text or number to search the entire spreadsheet and jump to matching cells. For finding 'exam gloves' in a 300-row supply list, Ctrl+F is far faster than scrolling. Ctrl+G (Go To) with Ctrl+G > Special lets you navigate to cells with specific properties — cells with formulas, cells with errors, blank cells — which is invaluable when auditing a spreadsheet built by someone else.",
            ],
          },
        ],
      },
      {
        heading: "File Formats and AutoSave",
        blocks: [
          {
            type: "paragraph",
            text: "Saving Excel files in the correct format ensures compatibility, data integrity, and professional presentation. Understanding when to use each format is an essential part of working in a professional office environment:",
          },
          {
            type: "list",
            items: [
              "The .xlsx format is Excel's default and should be used for all working spreadsheets — it supports all formulas, formatting, multiple sheets, PivotTables, charts, and data validation. Always save your working files as .xlsx unless there is a specific reason to use another format. The older .xls format (Excel 97-2003) is rarely needed and should be avoided unless you are sharing with someone using an extremely outdated version of Excel.",
              "The .csv (Comma-Separated Values) format is a plain text file containing only the data from one worksheet — no formatting, no formulas (values only), no multiple sheets. CSV files are the universal data exchange format used to import/export data between different software systems. If Lakeside Medical Associates needs to import patient data into a practice management system, that system will likely accept a .csv file. Saving as .csv strips all formatting and formulas, so always keep an .xlsx backup.",
              "PDF format for Excel is used when you need to share a spreadsheet as a read-only, visually fixed document — for example, emailing a monthly expense report to a physician who does not need to edit the data. Use File > Export > Create PDF/XPS. In the export dialog, you can choose to export the active sheet, the entire workbook, or a specific print area.",
              "AutoSave (when using OneDrive or SharePoint) saves your file continuously in real time — the AutoSave toggle appears in the upper-left corner. Excel also has AutoRecover (File > Options > Save) that saves a backup every 10 minutes by default for locally saved files. Always save manually with Ctrl+S after major data entry sessions regardless of AutoSave status — it is a habit that protects your work.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Excel 2019 Interface",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-3/intro-to-excel-2019/infographic.png",
            alt: "Excel 2019 Interface Quick Reference — labeled diagram of the Ribbon tabs, Name Box, Formula Bar, Sheet tabs, Freeze Panes steps, navigation keyboard shortcuts, and file format comparison table",
            caption: "Excel 2019 Interface Quick Reference — navigating the grid with speed and confidence",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Excel spreadsheets at Lakeside Medical Associates may contain patient data (appointment counts, billing totals, provider caseloads) that is subject to HIPAA protections. Never email a spreadsheet containing identifiable patient information to an unencrypted external email address. Never save spreadsheets with patient data to a personal cloud drive (Google Drive, Dropbox, personal OneDrive). Use only the practice's approved network storage. If you accidentally save a file containing patient data to an incorrect location, report it to your supervisor immediately — do not attempt to quietly move and delete it on your own, as a breach may have already occurred that requires formal reporting.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I am new to Microsoft Excel 2019 and work in a medical office. What are the 12 most important keyboard shortcuts I should learn in my first week, covering navigation, data entry, and file saving? Give me a table with the shortcut, what it does, and a brief example of when I would use it in a medical office setting.' Save the response as a reference document and practice each shortcut in Excel while reviewing this lesson.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are in cell G300 of a large supply tracker spreadsheet and need to jump back to cell A1 immediately. Which keyboard shortcut does this instantly?",
            options: [
              "Ctrl+End",
              "Ctrl+Home",
              "Ctrl+Left",
              "Ctrl+Backspace",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Explore the Excel 2019 interface hands-on by building and navigating a small practice spreadsheet for Lakeside Medical Associates. This orientation challenge builds familiarity with every major interface element before you start entering real data.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Excel 2019 and create a new blank workbook. Rename Sheet1 to 'Medical Supplies,' add a second sheet named 'Office Supplies,' and a third named 'Summary.' Color the Medical Supplies tab blue, the Office Supplies tab green, and the Summary tab orange.",
          "On the Medical Supplies sheet, type column headers in row 1: Item, Category, Quantity, Unit Cost, Total Cost, Reorder Level, Status. In the Name Box, type A1 and press Enter to confirm navigation. Then use Ctrl+End to find where your data ends after entering 5 rows of sample data.",
          "Freeze the header row (row 1) on the Medical Supplies sheet using View > Freeze Panes. Scroll down beyond row 1 to confirm the header stays visible. Then unfreeze and re-freeze using cell B2 as the selected cell to freeze both the header row and the first column simultaneously.",
          "Use Ctrl+F to search for a specific item you entered (e.g., 'Gloves'). Navigate to the cell using the Find dialog. Then use the Name Box to navigate directly to cell D7 without scrolling.",
          "Save the workbook as 'Lakeside Medical Supply Tracker – Orientation.xlsx.' Then export the Medical Supplies sheet as a PDF using File > Export. Confirm both files are saved to your Documents folder.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your .xlsx workbook file to your instructor or course folder. The workbook should have three correctly named and colored sheet tabs, a medical supplies sheet with 5 data rows, a visible frozen header row, and evidence of your Name Box navigation. Take a screenshot of the frozen pane in action and include it with your submission.",
      },
    ],
  },

  {
    slug: "entering-and-formatting-data",
    title: "Entering and Formatting Data",
    description:
      "Master professional data entry techniques in Excel — entering different data types correctly, using AutoFill and Flash Fill, applying number formatting, and making spreadsheets look polished with cell formatting and conditional highlighting.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/9s0OdXiuqL0",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-01.jpg",
        alt: "Data Types in Excel — text, numbers, dates, and why the distinction matters for formulas",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-02.jpg",
        alt: "Efficient Data Entry — Tab, Enter, Flash Fill, and AutoFill techniques",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-03.jpg",
        alt: "Number Formatting — currency, percentage, dates, decimal places, and the Format Cells dialog",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-04.jpg",
        alt: "Cell Alignment and Text Wrapping — controlling how content appears within cells",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-05.jpg",
        alt: "Column Width and Row Height — adjusting dimensions for content visibility",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-06.jpg",
        alt: "Cell Borders and Fill Colors — adding visual structure to professional spreadsheets",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-07.jpg",
        alt: "Conditional Formatting Basics — highlighting cells based on their value automatically",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-08.jpg",
        alt: "Format as Table — converting a data range to a structured Excel table in one click",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct formatting approach for a given data scenario",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You have been asked to enter this month's office supply purchase data into Lakeside Medical Associates' supply tracker — 25 rows of items including product names, quantities, unit costs, and purchase dates. If you enter dates as text instead of date values, date-based sorting will not work. If you enter costs without currency formatting, the spreadsheet will look unprofessional in the monthly report. If you format costs as numbers when they should be dates, calculations will fail. This lesson teaches you how to enter data correctly the first time, format it professionally, and use Excel's productivity features to work faster.",
          },
        ],
      },
      {
        heading: "Data Types: Text, Numbers, and Dates",
        blocks: [
          {
            type: "paragraph",
            text: "Excel distinguishes between three fundamental data types — text, numbers (including currency and percentages), and dates. Entering data in the correct type is critical because Excel's formulas, sorting, filtering, and calculations work differently depending on whether a cell contains a number or text:",
          },
          {
            type: "list",
            items: [
              "Text values (labels) are strings of characters — item names like 'Exam Gloves Medium,' category labels like 'Medical,' and status values like 'In Stock' are all text. Text is automatically left-aligned in cells and cannot be used in arithmetic calculations. When Excel detects that an entry is not a valid number or date, it stores it as text. If a number is stored as text (a common data quality issue), SUM formulas will ignore it — always confirm that numeric columns contain actual numbers, not text-formatted numbers.",
              "Number values are numeric quantities that Excel can calculate — quantities (50), costs (12.99), and counts (200) are all numbers. Numbers are automatically right-aligned in cells. You can apply number formats to display the same underlying number in different ways: 12.99 displayed as $12.99 (currency), 0.15 displayed as 15% (percentage), or 12.99 displayed as 13 (no decimals) — the underlying value never changes, only the display.",
              "Date values are actually serial numbers that Excel stores internally (January 1, 1900 is serial number 1, today's date is approximately serial number 46000+) but displays as recognizable dates. Because dates are numbers, you can subtract one date from another to calculate elapsed days, use dates in IF formulas, and sort date columns chronologically. Always enter dates in a format Excel recognizes (5/5/2025, May 5 2025, or 2025-05-05) — if you type '5th of May' or 'May 5th' Excel may store it as text, breaking date-based calculations.",
              "Detecting data type issues: select a cell and look at the horizontal alignment (left = text, right = number or date). Check the formula bar for any text entry markers. Select a numeric column and look at the Sum display in the Status Bar at the bottom of the screen — if the Status Bar shows Sum: 0 for a column you expect to total, your numbers are stored as text. Select the column, use Data > Text to Columns, and click Finish to convert text-formatted numbers to actual numbers.",
            ],
          },
        ],
      },
      {
        heading: "Efficient Data Entry Techniques",
        blocks: [
          {
            type: "paragraph",
            text: "Excel provides several tools that dramatically speed up data entry — using them correctly means you spend less time typing repetitive data and more time doing productive work:",
          },
          {
            type: "list",
            items: [
              "Tab moves right across a row, Enter moves down a column — when entering data in a table, press Tab after each cell in a row to move right across all columns, then press Enter to jump to the first column of the next row (back to the starting column of your tab sequence). This is significantly faster than reaching for the mouse after every entry. Shift+Tab moves left, Shift+Enter moves up.",
              "AutoFill extends a pattern down a column — type the first two values in a series (January, February OR 1, 2 OR Monday, Tuesday), select both cells, then drag the small green square (the fill handle) at the bottom-right corner of the selection down as many rows as you need. Excel recognizes the pattern and continues it automatically. AutoFill also works for dates, fiscal quarters, and custom lists you define in File > Options > Advanced > Edit Custom Lists.",
              "Flash Fill is one of the most impressive Excel productivity features — it recognizes the pattern of what you are trying to create and fills the rest of the column automatically. For example: if your column A contains full names like 'Maria Rodriguez' and you want column B to contain only first names, type 'Maria' in B2. When you start typing 'Dr' in B3 for 'Dr. James Whitfield,' Flash Fill recognizes the first-name pattern and offers to fill B3:B100 instantly. Press Enter to accept. Flash Fill is accessed via Data > Flash Fill or by pressing Ctrl+E.",
              "AutoComplete suggests completions as you type — if you type 'Ex' in a column that already contains 'Exam Gloves,' Excel suggests 'Exam Gloves' as the completion. Press Enter to accept the suggestion, or keep typing to override it. AutoComplete is helpful for maintaining consistent text values (so 'Medical' is never entered as 'medical' or 'MEDICAL') but can slow you down if you are entering entirely new values — press Delete to clear the suggestion without accepting it.",
            ],
          },
        ],
      },
      {
        heading: "Number Formatting and Cell Appearance",
        blocks: [
          {
            type: "paragraph",
            text: "Number formatting makes spreadsheet data readable, professional, and appropriate for its purpose. The underlying numbers never change — only how they appear in the cell changes. All formatting is applied through the Home tab > Number group or the Format Cells dialog (Ctrl+1):",
          },
          {
            type: "list",
            items: [
              "Currency format displays numbers with a dollar sign (or other currency symbol) and two decimal places — for example, 12.5 displays as $12.50. Use Accounting format for financial reports (aligns currency symbols and decimal points for cleaner column alignment) or Currency format for standalone cost values. Apply via the '$' dropdown in the Number group or Ctrl+1 > Number > Currency.",
              "Percentage format multiplies the cell value by 100 and appends a percent sign — the value 0.15 displays as 15%. Always enter percentages as their decimal form (0.15) before applying percentage format, not as '15%' typed directly (Excel handles both, but the decimal form is more predictable). Apply via the '%' button in the Number group.",
              "Date format controls how a date serial number is displayed — 'MM/DD/YYYY' shows 05/05/2025, 'MMMM D, YYYY' shows May 5, 2025, and 'MMM-YY' shows May-25. Choose the format appropriate for your audience — internal trackers often use short dates (M/D/YY), while patient-facing documents use full written dates.",
              "Conditional formatting automatically applies cell colors, font colors, or icons based on cell values — without you having to manually review each row. Select a range, click Home > Conditional Formatting > Highlight Cells Rules, and set your rule: for example, 'Less Than' 10 with a red fill highlights any quantity below the reorder threshold. This is how supply tracker status columns automatically turn red when stock is low at Lakeside Medical Associates — the formatting updates dynamically as values change.",
              "Format as Table converts a plain data range into an Excel table with automatic alternating row colors, filter arrows in the header, and automatic formula expansion as you add rows — click anywhere in your data, press Ctrl+T, and click OK. Table formatting is the professional standard for data ranges that will be regularly updated, sorted, or filtered.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Data Entry and Formatting",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-3/entering-and-formatting-data/infographic.png",
            alt: "Data Entry and Formatting Quick Reference — data type identification guide, efficient entry shortcuts, number format examples, conditional formatting setup steps, and Format as Table button location",
            caption: "Data Entry and Formatting Quick Reference — building clean, professional spreadsheets",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Formatting errors in financial spreadsheets can create misleading information with real consequences. If a cost column is formatted to show no decimal places but the underlying data has decimals, the displayed total will look correct while the actual calculated total may differ significantly. Always use 'Show decimal places' (two places minimum for financial data) in any spreadsheet that feeds into financial reporting at Lakeside Medical Associates. Before sharing any financial data with the office manager or physician owner, have a second person verify that all totals match what would be expected — a formatting error that makes $1,234.50 appear as $1,234 may seem minor but can compound into significant discrepancies across a full year of reporting.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I need to set up conditional formatting rules in Excel for a medical office supply tracker. The tracker has a Quantity column and a Reorder Level column. What conditional formatting rules should I create to automatically highlight: (1) items at or below the reorder level in red, (2) items between 1–5 units above the reorder level in yellow, and (3) items well-stocked (more than 5 units above reorder level) in green? Give me the exact steps for creating each rule in Excel 2019.' Follow the steps to apply all three conditional formatting rules to your supply tracker.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You have a column of cost values (12.5, 34.75, 8.0) stored as numbers. You want them to display as $12.50, $34.75, and $8.00. What should you do?",
            options: [
              "Delete the values and retype them with dollar signs and decimal places",
              "Apply Currency or Accounting number format to the column",
              "Change the column header to include '($)' to indicate dollars",
              "Multiply each value by 100 and add a dollar sign as text",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a professionally formatted supply data entry sheet for Lakeside Medical Associates with 20 rows of realistic supply data, correct data types, number formatting, conditional formatting, and a table format. Every element must be done correctly — no text-formatted numbers, no manual color fills instead of conditional formatting.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a new Excel worksheet named 'Supply Log.' Enter column headers in row 1: Item Name, Category, Quantity, Unit Cost, Total Cost, Reorder Level, Status, Date Ordered. Enter 20 rows of realistic medical office supply data across all columns. Use at least 4 different categories (Medical, Office, Cleaning, Break Room). Include a mix of items where some quantities are below their reorder level.",
          "Apply correct data types: ensure Quantity and Reorder Level columns contain numbers (not text), Unit Cost and Total Cost contain numbers (not text), Date Ordered contains actual date values (formatted as MM/DD/YYYY), and Item Name and Category columns contain text.",
          "Apply number formatting: format Unit Cost and Total Cost as Currency with 2 decimal places, format Quantity and Reorder Level as Number with 0 decimal places, and format Date Ordered as a short date (MM/DD/YY).",
          "Apply conditional formatting to the Quantity column: red fill for any quantity at or below the Reorder Level value in the same row (use a formula-based rule: =C2<=F2 applied to the Quantity column), and green fill for quantities greater than double the reorder level. Verify the colors appear correctly for at least 3 items in each category.",
          "Convert the data range to an Excel Table (Ctrl+T) and apply a professional table style. Use AutoFill to fill a 'Date Ordered' pattern for rows 11–20 (continue a weekly sequence from row 10). Verify Filter arrows appear in all column headers.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed .xlsx workbook to your instructor or course folder. Your Supply Log sheet will be evaluated on: correct data types in all columns (verified by cell alignment and formula bar content), currency and date formatting, correct conditional formatting rules that respond dynamically to quantity changes, and proper Excel Table format with filter arrows. Make one of your items have a quantity of 0 — it should be highlighted in red by your conditional formatting rule.",
      },
    ],
  },

  {
    slug: "formulas-and-functions",
    title: "Formulas and Essential Functions",
    description:
      "Learn how Excel formulas work, master the most important built-in functions (SUM, AVERAGE, COUNT, IF, ROUND), and understand how to identify and fix common formula errors.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/J-W3thqtDpQ",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-01.jpg",
        alt: "How Formulas Work — the = sign, operators, and the order of operations in Excel",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-02.jpg",
        alt: "Cell References — relative vs absolute with the $ sign and when each is appropriate",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-03.jpg",
        alt: "SUM, AVERAGE, MIN, and MAX — the four core aggregation functions",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-04.jpg",
        alt: "COUNT and COUNTA — counting cells with numbers vs counting all non-empty cells",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-05.jpg",
        alt: "IF Function — building conditional logic into your spreadsheet",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-06.jpg",
        alt: "ROUND and TODAY() / NOW() — controlling decimal precision and inserting current date",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-07.jpg",
        alt: "Formula Auditing — tracing precedents, dependents, and evaluating formulas step by step",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-08.jpg",
        alt: "Common Formula Errors — #DIV/0!, #VALUE!, #REF!, #NAME? and how to fix each one",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/slide-09.jpg",
        alt: "Knowledge Check — writing the correct formula syntax for a given calculation task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The office manager at Lakeside Medical Associates needs the supply tracker to automatically calculate total cost for each item (Quantity × Unit Cost), display a running total of all supply expenses, show the average cost per item, and flag any item with a quantity below the reorder level as 'LOW' in the Status column. All of this requires formulas — and writing a formula incorrectly produces wrong numbers that look correct, which is more dangerous than an obvious error. This lesson teaches you to write formulas with confidence and verify they are calculating correctly.",
          },
        ],
      },
      {
        heading: "How Formulas Work",
        blocks: [
          {
            type: "paragraph",
            text: "Every formula in Excel begins with an equals sign (=) — this tells Excel to treat what follows as a calculation rather than text or a number. Understanding the fundamentals of formula construction prevents the errors that trip up beginners:",
          },
          {
            type: "list",
            items: [
              "Basic arithmetic formulas use standard operators: + (addition), - (subtraction), * (multiplication), / (division), ^ (exponentiation). The formula =B2*C2 multiplies the value in B2 by the value in C2 — in a supply tracker, this calculates Total Cost = Quantity × Unit Cost. Excel follows standard mathematical order of operations (PEMDAS): parentheses first, then exponentiation, then multiplication and division left to right, then addition and subtraction left to right. Use parentheses liberally to make the order explicit: =(B2+C2)*D2 is clearer and safer than =B2+C2*D2.",
              "Cell references make formulas dynamic — instead of typing the actual numbers (=50*12.99), write the formula using cell addresses (=B2*C2). When the quantity or cost changes, the formula recalculates automatically. This is the fundamental reason formulas are more powerful than manual calculations: update the source data and every formula that references it updates instantly.",
              "Relative cell references adjust automatically when a formula is copied to another cell — if =B2*C2 is in cell E2 and you copy it down to E3, Excel changes it to =B3*C3 automatically. This is the behavior you want when copying a total cost formula down 20 rows — each row's formula refers to that row's own data. This is why you write the formula once in E2 and copy it down, rather than writing a new formula in every row.",
              "Absolute cell references use the $ sign to lock a reference so it does not change when copied — =$B$1 always refers to B1 regardless of where the formula is copied. Use absolute references when all rows should reference the same cell — such as a tax rate in B1 that should be applied to every row: =B2*$B$1. Press F4 while typing a cell reference to cycle through relative, absolute, and mixed reference styles.",
            ],
          },
        ],
      },
      {
        heading: "Essential Functions: SUM, AVERAGE, COUNT, IF",
        blocks: [
          {
            type: "paragraph",
            text: "Excel's built-in functions are pre-written formulas that perform common calculations — you provide the input (the range of cells to work with) and the function returns the result. These core functions cover the vast majority of calculations you will perform in a medical office setting:",
          },
          {
            type: "list",
            items: [
              "SUM adds all values in a range — =SUM(E2:E25) adds all values in cells E2 through E25. This is the most-used function in Excel. The AutoSum button (Σ) in the Home tab inserts =SUM() and automatically suggests the range based on adjacent data — click a cell below a column of numbers and press Alt+= to insert a SUM formula instantly.",
              "AVERAGE calculates the arithmetic mean of a range — =AVERAGE(C2:C25) returns the average quantity across all supply items. AVERAGE ignores blank cells (it does not count them in the denominator), which is the correct behavior for most data analysis. MIN and MAX return the smallest and largest values in a range: =MIN(C2:C25) finds the item with the lowest quantity, =MAX(D2:D25) finds the most expensive unit cost.",
              "COUNT counts the number of cells that contain numbers — =COUNT(C2:C25) counts how many cells in the Quantity range have numeric values. COUNTA counts all non-empty cells regardless of data type — =COUNTA(A2:A25) counts how many rows have an item name (useful for knowing how many items are in the tracker). COUNTBLANK counts empty cells — useful for finding missing data.",
              "IF evaluates a condition and returns one value if true and another if false — =IF(C2<=F2,\"LOW\",\"OK\") checks whether the quantity in C2 is at or below the reorder level in F2 and returns 'LOW' if yes, 'OK' if no. This is exactly how a supply tracker Status column works. The syntax is =IF(logical_test, value_if_true, value_if_false). Nested IF allows chaining: =IF(C2=0,\"OUT\",IF(C2<=F2,\"LOW\",\"OK\")) returns 'OUT' for zero quantity, 'LOW' for below reorder level, and 'OK' for adequate stock.",
              "ROUND controls the number of decimal places in a result — =ROUND(B2*C2, 2) multiplies B2 by C2 and rounds to 2 decimal places, preventing floating-point calculation errors from appearing in financial totals. TODAY() returns the current date as a serial number that updates every time the file is opened — useful for 'Date Last Updated' fields. NOW() returns the current date and time.",
            ],
          },
        ],
      },
      {
        heading: "Common Errors and Formula Auditing",
        blocks: [
          {
            type: "paragraph",
            text: "Formula errors are a normal part of working in Excel — the key is recognizing what each error code means so you can fix it quickly rather than panicking or deleting the formula:",
          },
          {
            type: "list",
            items: [
              "#DIV/0! means the formula is attempting to divide by zero — this happens when the divisor cell is empty or contains zero. For example, =AVERAGE(C2:C5) returns #DIV/0! if all four cells are empty. Fix by either ensuring the divisor is not empty, or wrapping the formula in IFERROR: =IFERROR(C2/D2, 0) returns 0 instead of the error if D2 is zero.",
              "#VALUE! means the formula references a cell that contains the wrong type of data — for example, =B2*C2 returns #VALUE! if C2 contains text instead of a number. Check the referenced cells to confirm they contain the expected data type. This is often caused by numbers accidentally stored as text.",
              "#REF! means the formula references a cell that no longer exists — this happens when rows or columns referenced by the formula have been deleted. Click the cell with #REF!, look in the formula bar for #REF! markers in the formula, and update the reference to point to the correct current cells.",
              "#NAME? means Excel does not recognize a name in the formula — usually caused by a typo in a function name (=SUMM() instead of =SUM()), a reference to a named range that does not exist, or missing quotation marks around text in a formula. Read the formula carefully and correct the spelling or syntax.",
              "Formula Auditing tools help you understand how a formula works — Formulas > Trace Precedents draws arrows to show which cells the selected formula uses as inputs. Formulas > Evaluate Formula walks through the calculation step by step, showing how Excel computes the result. These tools are invaluable when you inherit a spreadsheet built by someone else and need to understand what the formulas are doing.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Formulas and Functions",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-3/formulas-and-functions/infographic.png",
            alt: "Formulas and Functions Quick Reference — syntax for SUM, AVERAGE, COUNT, IF, ROUND, TODAY; relative vs absolute reference guide; error code lookup table with causes and fixes; formula auditing tool locations",
            caption: "Formulas and Functions Quick Reference — writing correct formulas for medical office data",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Formulas that produce wrong answers but no visible error codes are the most dangerous type of spreadsheet mistake — a Total Cost formula that multiplies the wrong columns may produce a plausible-looking number that is completely wrong. At Lakeside Medical Associates, incorrect cost calculations in the supply tracker could lead to over-ordering (wasting budget) or under-ordering (running out of critical medical supplies mid-shift). Always verify every new formula by manually calculating the expected result for at least 2–3 sample rows before using the spreadsheet for real decision-making. If you are uncertain about a formula, ask your supervisor to review it before the spreadsheet is used operationally.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I am building a supply tracker in Excel for a medical office. I have these columns: A=Item Name, B=Category, C=Quantity, D=Unit Cost, E=Total Cost, F=Reorder Level, G=Status. Write the exact Excel formulas for: (1) Total Cost (E column), (2) Status column showing OUT/LOW/OK based on quantity vs reorder level, (3) a grand total SUM of all Total Costs, (4) the average unit cost across all items, and (5) a count of how many items are currently LOW or OUT.' Test each formula in your supply tracker and verify the results are correct.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In your supply tracker, cell E2 contains the formula =C2*D2 (Quantity × Unit Cost). When you copy this formula down to E3, what formula does Excel place in E3?",
            options: [
              "=C2*D2 (the same formula — Excel does not change it)",
              "=C3*D3 (Excel adjusts relative references to match the new row)",
              "=$C$2*$D$2 (Excel locks the references absolutely)",
              "=SUM(C3:D3) (Excel converts multiplication to SUM automatically)",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Add a complete formula layer to your Lakeside Medical Associates supply tracker — making it automatically calculate totals, identify low stock, and provide summary statistics. Every number in your summary section must come from a formula, not a manually typed value.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In the Total Cost column (E), write the formula =C2*D2 in E2 and copy it down all 20 rows. Verify each Total Cost is the product of that row's Quantity and Unit Cost. Apply Currency formatting to the Total Cost column.",
          "In the Status column (G), write a nested IF formula: =IF(C2=0,\"OUT\",IF(C2<=F2,\"LOW\",\"OK\")). Copy down all 20 rows. Verify that items with zero quantity show 'OUT,' items at or below reorder level show 'LOW,' and adequately stocked items show 'OK.'",
          "Create a summary section starting at row 23: add labels in column A for Grand Total Cost, Average Unit Cost, Minimum Quantity, Maximum Unit Cost, Total Items Tracked, and Items at LOW or OUT status. Write the corresponding formula in column B for each: =SUM(E2:E21), =AVERAGE(D2:D21), =MIN(C2:C21), =MAX(D2:D21), =COUNTA(A2:A21), and =COUNTIF(G2:G21,\"LOW\")+COUNTIF(G2:G21,\"OUT\").",
          "Add a 'Last Updated' field in your summary section using =TODAY() so the date updates automatically whenever the file is opened. Format it as a long date (MMMM D, YYYY).",
          "Deliberately create a #DIV/0! error in a test cell by typing =B2/0, take a screenshot showing the error, then fix it using IFERROR. Delete the test cell and save the completed workbook as 'Supply Tracker with Formulas – Lakeside Medical.xlsx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed .xlsx workbook to your instructor or course folder. Your work will be evaluated on: correct Total Cost formulas (all 20 rows), correct nested IF Status formulas responding accurately to stock levels, all 6 summary statistics calculated with the correct functions, the TODAY() date field, and IFERROR demonstration (in screenshot). A passing grade means the supply tracker is operationally ready for real use at Lakeside Medical Associates.",
      },
    ],
  },

  {
    slug: "sorting-filtering-tables",
    title: "Sorting, Filtering, and Data Tables",
    description:
      "Learn to organize and analyze data with Excel's sorting and filtering tools, convert data ranges to Excel Tables for powerful automatic features, and prepare spreadsheets for professional printing.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/_OdsZR_rL1U",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-01.jpg",
        alt: "Sorting by One Column vs Multiple Columns — alphabetical, numerical, and date sorting",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-02.jpg",
        alt: "Custom Sort Order — defining a non-alphabetical sort sequence for category columns",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-03.jpg",
        alt: "AutoFilter — activating and using filter dropdowns to show specific subsets of data",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-04.jpg",
        alt: "Text Filters, Number Filters, and Date Filters — filtering by content, ranges, and time periods",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-05.jpg",
        alt: "Excel Tables — converting a range to a Table with Ctrl+T and the Table advantages",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-06.jpg",
        alt: "Table Features — structured references, totals row, automatic expansion, and table styles",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-07.jpg",
        alt: "Remove Duplicates — finding and removing duplicate rows from a data set",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-08.jpg",
        alt: "Printing Spreadsheets — print area, page breaks, headers/footers, and fit to page settings",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/slide-09.jpg",
        alt: "Knowledge Check — selecting the correct sort or filter approach for a given data task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your office manager at Lakeside Medical Associates needs three things from the supply tracker right now: (1) the list sorted alphabetically by Category, then by Item Name within each category; (2) only the items currently showing 'LOW' or 'OUT' status filtered and visible for the reorder meeting; and (3) a printed version of the filtered list to post on the supply room whiteboard. All three tasks require the sorting, filtering, and printing skills in this lesson — and they need to be done in the next 15 minutes before the meeting starts.",
          },
        ],
      },
      {
        heading: "Sorting Data",
        blocks: [
          {
            type: "paragraph",
            text: "Sorting reorders your data rows based on the values in one or more columns. Excel's sort capabilities go far beyond simple alphabetical sorting — you can sort by multiple columns, sort dates chronologically, and even define a custom sort order for category values:",
          },
          {
            type: "list",
            items: [
              "To sort by a single column, click any cell in the column you want to sort by, then click Data > Sort A→Z (ascending) or Data > Sort Z→A (descending). For a text column like Category, A→Z sorts alphabetically. For a number column like Quantity, A→Z sorts smallest to largest. For a date column, A→Z sorts oldest to newest. This is the fastest sort method when you only need one level of sorting.",
              "To sort by multiple columns (multi-level sort), use Data > Sort to open the Sort dialog. Click 'Add Level' to add additional sort keys. For the office manager's request — sorted by Category first, then by Item Name within each category — set Level 1 to Column 'Category' (A→Z) and Level 2 to Column 'Item Name' (A→Z). Excel sorts by the first level, then uses the second level as a tiebreaker within groups with the same first-level value.",
              "Custom sort orders let you sort by a non-alphabetical sequence you define — for example, sorting supply categories in the order Medical, Cleaning, Office, Break Room rather than alphabetically. In the Sort dialog, click the Order dropdown for a column and choose 'Custom List.' You can use one of Excel's built-in custom lists (months, days of the week) or create your own by typing the values in the order you want them. This is very useful for status columns where you want 'OUT' first, then 'LOW,' then 'OK.'",
              "Always confirm your data has a header row and that 'My data has headers' is checked in the Sort dialog — if unchecked, Excel may sort your header row into the middle of the data as if it were a data row. After sorting, scroll up to confirm your header row is still in row 1 and that all data rows have moved correctly.",
            ],
          },
        ],
      },
      {
        heading: "Filtering with AutoFilter",
        blocks: [
          {
            type: "paragraph",
            text: "Filtering hides rows that do not meet your criteria while leaving the underlying data intact — it is not deletion. Filtered rows can be shown again at any time. AutoFilter is Excel's standard filtering tool and is activated for any data range or Excel Table:",
          },
          {
            type: "list",
            items: [
              "To activate AutoFilter on a plain data range, click any cell in your data and press Ctrl+Shift+L, or click Data > Filter. Dropdown arrows appear on each column header. To activate a filter, click the dropdown arrow in the column you want to filter — a menu appears showing all unique values in that column with checkboxes. Uncheck the values you do not want to see, or check only the ones you do. For the office manager's request, click the Status column dropdown and check only 'LOW' and 'OUT' — rows with 'OK' status immediately hide.",
              "Text filters let you filter for partial matches or complex text conditions — click the column header dropdown, hover over 'Text Filters,' and choose options like 'Contains,' 'Begins With,' 'Ends With,' or 'Does Not Contain.' For example, filtering Item Name for rows that contain 'Gloves' would show all types of gloves (exam gloves, nitrile gloves, latex gloves) while hiding all other items.",
              "Number filters let you show rows where values fall within a numeric range — click the dropdown on a number column, hover over 'Number Filters,' and choose 'Between,' 'Greater Than,' 'Less Than,' or 'Top 10.' To show only items where Quantity is less than 10, use Number Filters > Less Than > 10. This is useful for quickly identifying all low-count items without setting up conditional formatting.",
              "Date filters provide time-based filtering options — click the dropdown on a date column and hover over 'Date Filters' for options like 'This Week,' 'This Month,' 'Next Quarter,' 'Before,' and 'After.' These are particularly useful in an appointment log for filtering only appointments in the current month or week.",
              "To clear all filters and show all data again, click Data > Clear or press Ctrl+Shift+L twice (off then on). To clear the filter on one specific column, click that column's dropdown and choose 'Clear Filter From [Column Name].' Filtered rows are still in the spreadsheet — they are hidden, not deleted. The row numbers turn blue to indicate filtering is active and some rows are hidden.",
            ],
          },
        ],
      },
      {
        heading: "Excel Tables and Removing Duplicates",
        blocks: [
          {
            type: "paragraph",
            text: "Excel Tables are the professional standard for data ranges that are actively managed, updated, and analyzed. Converting your supply tracker to a Table provides automatic features that would otherwise require manual maintenance:",
          },
          {
            type: "list",
            items: [
              "Convert any data range to an Excel Table by pressing Ctrl+T with any cell in the range selected. Excel asks to confirm the range and whether your data has headers — click OK. The table immediately gains: alternating row colors for readability, dropdown filter arrows on all column headers, and a special Table Design tab in the Ribbon.",
              "The Totals Row is a key Table feature — click any cell in the table and go to Table Design > Table Style Options > check 'Total Row.' A summary row appears at the bottom of the table with dropdown selectors for each column — choose SUM, AVERAGE, COUNT, MIN, MAX, or other functions. The totals row automatically updates as you add, edit, or filter table rows, making it the easiest way to maintain a live running total.",
              "Structured references replace cell addresses with column names in table formulas — instead of =SUM(E2:E100), Excel writes =SUM(Table1[Total Cost]). Structured references are self-documenting and automatically expand when new rows are added to the table, so =SUM(Table1[Total Cost]) always sums all rows in the Total Cost column without needing to update the range manually.",
              "Remove Duplicates cleans data that may have been entered more than once — click any cell in the table or range, go to Table Design (or Data) > Remove Duplicates, and choose which columns to check for duplicates. If a row has the same value in all selected columns as another row, the duplicate is removed. This is important quality maintenance for supply trackers — if an item was entered twice by different staff members, the tracker will show double the quantity and generate incorrect totals.",
            ],
          },
        ],
      },
      {
        heading: "Printing Spreadsheets Professionally",
        blocks: [
          {
            type: "paragraph",
            text: "Printing an Excel spreadsheet requires more preparation than printing a Word document — by default, Excel prints whatever fits on a standard page, which can produce awkward page breaks in the middle of tables. These settings ensure a printed spreadsheet looks professional and is easy to read:",
          },
          {
            type: "list",
            items: [
              "Set a print area to print only the relevant portion of a large spreadsheet — select the cells you want to print, then click Page Layout > Print Area > Set Print Area. The print area is marked with a dashed border. In Print Preview (Ctrl+P), only the print area will appear. Clear the print area using Page Layout > Print Area > Clear Print Area.",
              "Fit to page forces the spreadsheet content to fit on a specific number of pages — in the Page Layout tab, the Scale to Fit group lets you set 'Fit Sheet on One Page,' 'Fit All Columns on One Page,' or specific page counts. For the office manager's filtered list, 'Fit All Columns on One Page' ensures the columns are not split across two sheets, which makes the printout readable.",
              "Print headers and footers for spreadsheets using Page Layout > Print Titles — under 'Rows to repeat at top,' select row 1 so the column headers print on every page. Add a footer with the date, page number, and file name via Page Layout > Page Setup > Header/Footer tab. A spreadsheet printout with no headers, no page numbers, and no date is unprofessional and hard to file correctly.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Sorting, Filtering, and Tables",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-3/sorting-filtering-tables/infographic.png",
            alt: "Sorting, Filtering, and Tables Quick Reference — multi-level sort dialog steps, AutoFilter activation and usage guide, Excel Table conversion checklist, Remove Duplicates steps, and print settings for professional spreadsheet output",
            caption: "Sorting, Filtering, and Tables Quick Reference — data analysis and presentation tools",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Sorting permanently reorders your data rows — if you sort a supply tracker and then realize you sorted by the wrong column, the undo (Ctrl+Z) may not work if you have saved and closed the file. Always save a backup copy of any spreadsheet before performing a major sort on a large dataset that you cannot easily reconstruct. When using Remove Duplicates, verify after running it that the data that was removed was truly duplicate — remove duplicates is a permanent operation that cannot be undone after saving. For critical medical office data, maintain a version history by saving dated copies (e.g., 'Supply Tracker – 2025-05-05.xlsx') before major cleanup operations.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'What is the best way to set up an Excel workbook for a medical office supply tracker that will be maintained by multiple staff members? Include recommendations for table structure, sorting defaults, filter views, print settings, and data validation to prevent entry errors. Also explain how Excel Tables with structured references make the tracker easier to maintain long-term.' Use the response to refine your supply tracker structure before presenting it to your supervisor.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You filter your 300-row supply tracker to show only items with 'LOW' status. The row count indicator at the bottom of the screen shows '12 of 300 records found.' What has happened to the other 288 rows?",
            options: [
              "They have been deleted permanently",
              "They have been moved to a different worksheet",
              "They are hidden by the filter but still exist in the spreadsheet",
              "They have been moved to a new workbook automatically",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Apply sorting, filtering, and professional printing to your Lakeside Medical Associates supply tracker to produce a reorder report for the office manager. Your report must be printable, filtered to show only items needing action, and clearly formatted.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Sort your supply tracker (20 rows) by two levels: first by Status (custom order: OUT first, then LOW, then OK), then by Category (A→Z) within each status group. Take a screenshot showing the Sort dialog with both levels configured, and another showing the sorted result.",
          "Apply an AutoFilter to show only rows where Status equals 'LOW' or 'OUT.' Take a screenshot of the filtered view showing only the items that need reordering, with the row count visible in the status bar (e.g., '5 of 20 records found').",
          "While the filter is active, set the print area to include only the visible filtered data and the header row. Add a page header with 'Lakeside Medical Associates — Supply Reorder Report' and a footer with the date and 'Page 1 of 1.' Use Fit to Page to ensure all columns fit on one printed page.",
          "Open Print Preview (Ctrl+P) and take a screenshot showing the print preview of the filtered, page-fitted reorder report. Confirm the column headers are visible, all filtered rows are present, and the header and footer appear.",
          "Clear all filters to restore the full 20-row dataset. Remove any duplicate rows if present using Data > Remove Duplicates. Save the final workbook as 'Supply Tracker – Complete – Lakeside Medical.xlsx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed .xlsx workbook and four screenshots (Sort dialog, sorted result, filtered view, and print preview) to your instructor or course folder. Your work will be evaluated on: correct multi-level sort execution, accurate filter showing only LOW/OUT items, professional print settings with header and footer visible in preview, and complete unduplicated dataset in the final saved file. This reorder report is ready to print and hand to the office manager right now.",
      },
    ],
  },

  {
    slug: "excel-essentials-capstone",
    title: "Hands-On: Build an Office Supply Tracker",
    description:
      "Apply every Excel Essentials skill in one complete project — design, build, and finalize a professional office supply tracker for Lakeside Medical Associates from scratch.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/iroIA8_3soo",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-01.jpg",
        alt: "Supply Tracker Design — choosing columns, data types, and layout before entering any data",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-02.jpg",
        alt: "Entering Sample Supply Data — 20 realistic rows with mixed categories and stock levels",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-03.jpg",
        alt: "Writing SUM and IF Formulas — Total Cost and Status column formulas",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-04.jpg",
        alt: "Applying Conditional Formatting — automatic red/yellow/green status highlighting",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-05.jpg",
        alt: "Converting to Excel Table — Ctrl+T and enabling the Totals Row",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-06.jpg",
        alt: "Sorting by Category and Filtering by Status — organizing the tracker for the reorder meeting",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-07.jpg",
        alt: "Creating a Summary Sheet — key statistics and the reorder count dashboard",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-08.jpg",
        alt: "Saving and Sharing — .xlsx for internal use, PDF for the office manager's report",
      },
      {
        src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/slide-09.jpg",
        alt: "Knowledge Check — reviewing the complete supply tracker build process",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your office manager at Lakeside Medical Associates has just promoted you from data entry to supply management. Your first project is to build the practice's supply tracker from scratch — the previous tracker was a messy, inconsistently formatted spreadsheet with no formulas, no conditional formatting, and no summary data. You have been given a list of 20 items currently in stock and asked to deliver a professional, fully functional tracker by end of day. Everything you learned in this module is required to make this happen.",
          },
        ],
      },
      {
        heading: "Designing the Tracker Before You Build",
        blocks: [
          {
            type: "paragraph",
            text: "Professional spreadsheet builders always plan their structure before typing a single cell — designing the columns, data types, and formula architecture in advance prevents rebuilds that waste time. For the Lakeside Medical Associates supply tracker, the design decisions are straightforward but important:",
          },
          {
            type: "list",
            items: [
              "Column layout and data types: the tracker needs seven core columns in this order — Item (text), Category (text), Quantity (number), Unit Cost (currency), Total Cost (currency formula), Reorder Level (number), Status (text formula). Adding an eighth column — Date Last Ordered (date) — provides valuable restocking history without cluttering the view. All column headers belong in row 1 in bold, frozen so they stay visible while scrolling.",
              "Formula architecture: Total Cost (column E) will always be =C*D (Quantity × Unit Cost) — a relative reference formula copied down all rows. Status (column G) will always be the nested IF formula =IF(C=0,'OUT',IF(C<=F,'LOW','OK')) — also copied down all rows. All other columns are manually entered data. No total row should use manually typed numbers — the summary section on a separate sheet will use SUM, AVERAGE, COUNT, and COUNTIF formulas referencing the main data table.",
              "Table vs plain range: converting to an Excel Table (Ctrl+T) is the right choice for a tracker that will be updated regularly by multiple staff members — it provides automatic filter dropdowns, the Totals Row feature, alternating row colors for readability, and automatic formula expansion as new items are added. The investment in table setup pays off with every future use.",
              "Color strategy for conditional formatting: use Excel's built-in color system rather than custom colors — red (standard Excel red) for OUT and below reorder level, yellow/orange for items within 2 of the reorder level, green for adequately stocked items. Stick to the standard colors because they are recognizable by all staff without needing a legend.",
            ],
          },
        ],
      },
      {
        heading: "Building and Populating the Tracker",
        blocks: [
          {
            type: "paragraph",
            text: "With the design planned, building the tracker is a systematic process — set up the structure, enter the data, write the formulas, apply the formatting, and convert to a table. Do these in order and the tracker builds cleanly without needing to go back and fix structural decisions mid-build:",
          },
          {
            type: "list",
            items: [
              "Set up the structure first: create a new workbook with two sheets — 'Supply Tracker' and 'Summary.' On the Supply Tracker sheet, type the 7 column headers in row 1, bold them, and freeze row 1. Set column widths so each header is fully visible without truncation — double-click the column border to auto-fit each column's width.",
              "Enter all 20 data rows before writing formulas — populate Item, Category, Quantity, Unit Cost, Reorder Level, and Date Last Ordered for all 20 items first. Include a realistic mix: at least 3 OUT items (Quantity = 0), at least 4 LOW items, and the rest adequately stocked. Use at least 3 categories (Medical, Office, Cleaning). Apply Currency formatting to Unit Cost immediately after entering all cost data.",
              "Write formulas after all data is entered — type =C2*D2 in E2, format E2 as Currency, then copy E2 down to E21 using Ctrl+D or the fill handle. Type the nested IF formula in G2 and copy down to G21. Verify that OUT items show 'OUT,' LOW items show 'LOW,' and stocked items show 'OK' — if any Status is wrong, check whether the Quantity or Reorder Level in that row was entered correctly.",
              "Apply conditional formatting after verifying formula accuracy — select the Quantity column (C2:C21) and apply a formula-based rule (=C2=0 → red fill; =AND(C2>0,C2<=F2) → yellow fill). This is more precise than simple value-based rules because it compares each quantity to that row's own reorder level. Apply a second rule to the Status column using 'Text Contains' rules for 'OUT' (red fill, bold) and 'LOW' (yellow fill).",
              "Convert to Excel Table and enable the Totals Row — select the data range A1:H21 and press Ctrl+T. Apply the 'Blue, Table Style Medium 2' or similar professional style. Enable the Totals Row via Table Design > Total Row. Set the Totals Row to show SUM for Total Cost, AVERAGE for Unit Cost, and COUNT for Item to give instant summary stats at the bottom of the table.",
            ],
          },
        ],
      },
      {
        heading: "The Summary Sheet",
        blocks: [
          {
            type: "paragraph",
            text: "The Summary sheet gives the office manager a one-stop view of the tracker's key metrics without needing to scroll through the full supply list. All values on the Summary sheet must come from formulas that reference the Supply Tracker sheet — never typed manually:",
          },
          {
            type: "list",
            items: [
              "The Summary sheet should include: Total Items Tracked (COUNTA referencing the Item column), Items OUT of Stock (COUNTIF referencing Status column for 'OUT'), Items LOW (COUNTIF for 'LOW'), Total Supply Value (SUM of Total Cost column), Average Unit Cost (AVERAGE of Unit Cost column), and Last Updated (TODAY() function). Label each metric clearly in column A and put the formula in column B.",
              "Cross-sheet references use the sheet name and an exclamation point — to reference cell E2 on the Supply Tracker sheet from the Summary sheet, the formula is ='Supply Tracker'!E2. To reference the entire Total Cost column, use =SUM('Supply Tracker'!E2:E21). When you click on a cell in the Summary sheet formula bar and then click over to the Supply Tracker sheet to select a range, Excel automatically builds the cross-sheet reference for you.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Supply Tracker Build Checklist",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-3/excel-essentials-capstone/infographic.png",
            alt: "Supply Tracker Build Checklist — step-by-step tracker construction sequence, formula cheat sheet for Total Cost and nested IF Status, conditional formatting rules, Table setup steps, and Summary sheet formula reference guide",
            caption: "Excel Essentials Capstone Quick Reference — building the supply tracker from scratch",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "The supply tracker you build will be used to make real purchasing decisions at Lakeside Medical Associates — ordering too little of a critical supply (exam gloves, sterile gauze, blood draw supplies) because the tracker shows incorrect quantities could affect patient care. After building the tracker, physically verify at least 5 items by counting actual stock and comparing it to the tracker values. Document this verification with a date and your name in a note on the Summary sheet. A tracker that has never been physically verified against actual inventory is not trustworthy — and unverified data used for procurement decisions is a professional liability.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Generate a realistic list of 20 office supply items for a small medical practice, organized into 4 categories: Medical Supplies, Office Supplies, Cleaning Supplies, and Break Room Supplies. For each item, provide a realistic quantity on hand (some should be at zero for out of stock), a realistic unit cost in dollars, and a recommended reorder level. Format the response as a table I can copy directly into Excel.' Use the response to populate your supply tracker rather than inventing data, then make any adjustments to create the right mix of OUT, LOW, and OK items for testing your formulas.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In your supply tracker, you need a formula in the Status column that shows 'OUT' when Quantity is 0, 'LOW' when Quantity is at or below the Reorder Level, and 'OK' otherwise. Which formula is correct?",
            options: [
              "=IF(C2=0,\"OUT\",\"LOW\",\"OK\")",
              "=IF(C2=0,\"OUT\",IF(C2<=F2,\"LOW\",\"OK\"))",
              "=IF(C2<=F2,\"LOW\",IF(C2=0,\"OUT\",\"OK\"))",
              "=COUNTIF(C2,0,\"OUT\",\"LOW\",\"OK\")",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build the complete Lakeside Medical Associates office supply tracker from scratch, incorporating every Excel Essentials skill from this module. Your finished tracker must be operationally ready — a real office could use it today.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a new workbook with two sheets: 'Supply Tracker' (main data) and 'Summary' (dashboard). On the Supply Tracker sheet, set up 8 columns (Item, Category, Quantity, Unit Cost, Total Cost, Reorder Level, Status, Date Last Ordered) with bold headers in row 1, frozen so they stay visible. Enter 20 realistic supply items with a mix of Medical, Office, and Cleaning categories. Include at least 2 items at zero stock and at least 4 items below their reorder level.",
          "Write and copy down the Total Cost formula (=C2*D2) for all 20 rows. Write and copy down the nested IF Status formula (=IF(C2=0,'OUT',IF(C2<=F2,'LOW','OK'))) for all 20 rows. Apply Currency formatting to Unit Cost and Total Cost. Verify all Status values are correct by checking 3 OUT items, 3 LOW items, and 3 OK items manually.",
          "Apply conditional formatting: red fill to the Quantity column when at or below Reorder Level (use formula rule =C2<=F2); green fill when above Reorder Level. Apply a separate conditional formatting rule to the Status column highlighting 'OUT' in red and 'LOW' in yellow. Convert the data range to an Excel Table, apply a professional table style, and enable the Totals Row showing SUM for Total Cost.",
          "Sort the tracker by Status (custom order: OUT first, then LOW, then OK), then by Category (A→Z). Filter to show only LOW and OUT items. Take a screenshot of the filtered reorder list, then clear the filter.",
          "On the Summary sheet, build a 6-row dashboard using cross-sheet formulas: Total Items (COUNTA), Items OUT (COUNTIF), Items LOW (COUNTIF), Total Supply Value (SUM), Average Unit Cost (AVERAGE), Last Updated (TODAY()). Format all monetary values as Currency. Save the workbook as 'Supply Tracker – Lakeside Medical – Capstone.xlsx' and export the Supply Tracker sheet as PDF.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your .xlsx workbook (both sheets complete), a screenshot of the filtered reorder view, and the PDF export to your instructor or course folder. Your tracker will be evaluated on: correct formula operation (Total Cost and Status for all 20 rows), working conditional formatting, properly configured Excel Table with Totals Row, correct sorted order, accurate Summary sheet with cross-sheet formulas, and professional overall appearance. A perfect score on this capstone means this tracker is ready for real use at Lakeside Medical Associates today.",
      },
    ],
  },
];
