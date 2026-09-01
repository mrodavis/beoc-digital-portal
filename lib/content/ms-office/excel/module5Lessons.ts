import { Lesson } from "@/types/lesson";

export const excelModule5Lessons: Lesson[] = [

// ============================================================
// LESSON 1 – BASIC TIPS FOR WORKING WITH DATA
// ============================================================

{
  slug: "basic-tips-working-with-data",
  title: "Basic Tips for Working with Data",
  description:
    "Learn how Excel helps you organize, sort, filter, summarize, and visualize large amounts of information efficiently.",
  objectives: [
    "Structure a data range so Excel's data tools work correctly",
    "Explain why one row per record and one column per field matters",
    "Avoid the layout choices that break sorting and filtering",
    "Use Data Validation to prevent bad entries at the source",
  ],
  duration: "6 min",

  sections: [

    {
       heading: "Excel's data tools assume a shape",
       blocks: [
         {
           type: "scenario",
           role: "You inherit the supply log at Lakeside Medical Associates.",
           text: "The sheet has a title in A1, two blank rows, merged headings, a blank row separating each month, and totals in the middle of the data. Sorting scrambles it, filtering catches only the first month, and a PivotTable refuses to build at all.",
           task: "Learn the layout Excel's data tools expect, because every one of them assumes it.",
         },
         {
           type: "paragraph",
           text: "Sorting, filtering, subtotals, tables, and PivotTables all assume the same structure: one header row, one record per row, one field per column, and no blank rows or columns inside the data. Meet that and every tool works. Break it and each tool fails in its own confusing way.",
         },
         {
           type: "table",
           caption: "Layout rules that make the data tools work",
           columns: [
             "Rule",
             "Why",
             "Common violation",
           ],
           rows: [
             [
               "One header row",
               "Tools read row 1 as field names",
               "A title above the headers, or two header rows",
             ],
             [
               "One record per row",
               "Each row is treated as a unit when sorted",
               "One item's data split across two rows",
             ],
             [
               "No blank rows inside the data",
               "A blank row is read as the end of the range",
               "Blank rows used as visual separators",
             ],
             [
               "No merged cells",
               "Merging destroys the row and column grid",
               "Merged section headings",
             ],
             [
               "Totals outside the data",
               "A total inside the range sorts along with the data",
               "A subtotal row in the middle of the records",
             ],
             [
               "One type per column",
               "Mixed text and numbers break sorting and summing",
               "Notes typed into a numeric column",
             ],
           ],
         },
         {
           type: "tip",
           text: "Put titles and notes on a separate sheet, or above a blank row that sits outside the range you select. Keep the data region itself clean — a rectangle with a header row and nothing else. Presentation belongs on the output sheet, not in the data.",
         },
       ],
     },

    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------

    {
      heading: "Introduction",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel workbooks are designed to store a large amount of information. Whether you are working with 20 rows or 20,000, Excel includes powerful tools to help you organize your data and quickly find what you need.",
        },
        {
          type: "paragraph",
          text:
            "Instead of manually scanning thousands of cells, you can use built-in features like freezing panes, sorting, filtering, subtotals, tables, charts, and conditional formatting to work smarter.",
        },
      ],
    },

    // ------------------------------------------------------------
    // FREEZING PANES
    // ------------------------------------------------------------

    {
      heading: "Freezing Rows and Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "When working with large datasets, header rows can scroll off the screen. Freezing panes keeps important rows or columns visible while you scroll.",
        },
        {
          type: "paragraph",
          text:
            "This is especially useful for date headers, employee names, or product categories.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/basic-tips-data/basic-tips-data-freeze.png",
          alt: "Example of freezing top rows in Excel",
          caption:
            "Freezing panes allows header rows to remain visible while scrolling.",
        },
      ],
    },

    // ------------------------------------------------------------
    // SORTING
    // ------------------------------------------------------------

    {
      heading: "Sorting Data",
      blocks: [
        {
          type: "paragraph",
          text:
            "Sorting reorganizes your worksheet so that data appears in a specific order. You can sort alphabetically, numerically, by date, or even by color.",
        },
        {
          type: "paragraph",
          text:
            "For example, you might sort a customer list by last name or sales data from highest to lowest.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/basic-tips-data/basic-tips-data-sort.png",
          alt: "Sorting data example",
        },
      ],
    },

    // ------------------------------------------------------------
    // FILTERING
    // ------------------------------------------------------------

    {
      heading: "Filtering Data",
      blocks: [
        {
          type: "paragraph",
          text:
            "Filters allow you to narrow down a worksheet to display only the information that meets certain criteria.",
        },
        {
          type: "paragraph",
          text:
            "Instead of deleting rows, filtering temporarily hides data that does not match your selection.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/basic-tips-data/basic-tips-data-filter.png",
          alt: "Filtering dropdown menu example",
          caption:
            "Filtering shows only rows that match selected criteria.",
        },
      ],
    },

    // ------------------------------------------------------------
    // SUMMARIZING DATA
    // ------------------------------------------------------------

    {
      heading: "Summarizing Data with Subtotals",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Subtotal command automatically groups data and calculates totals for each category.",
        },
        {
          type: "paragraph",
          text:
            "This is useful when analyzing grouped information such as sales by region or inventory by category.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/basic-tips-data/basic-tips-data-summarize.png",
          alt: "Subtotal grouping example",
        },
      ],
    },

    // ------------------------------------------------------------
    // TABLES
    // ------------------------------------------------------------

    {
      heading: "Formatting Data as a Table",
      blocks: [
        {
          type: "paragraph",
          text:
            "Formatting data as a table improves both appearance and functionality. Tables include built-in filtering and sorting, and they automatically expand when new data is added.",
        },
        {
          type: "paragraph",
          text:
            "Excel includes predefined table styles that make formatting fast and consistent.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/basic-tips-data/basic-tips-data-formatting.png",
          alt: "Formatting data as a table example",
        },
      ],
    },

    // ------------------------------------------------------------
    // CHARTS
    // ------------------------------------------------------------

    {
      heading: "Visualizing Data with Charts",
      blocks: [
        {
          type: "paragraph",
          text:
            "Large datasets can be difficult to interpret at a glance. Charts transform raw numbers into visual comparisons and trends.",
        },
        {
          type: "paragraph",
          text:
            "Charts are useful for identifying patterns, growth, declines, and performance differences.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/basic-tips-data/basic-tips-data-visualize.png",
          alt: "Excel chart example",
        },
      ],
    },

    // ------------------------------------------------------------
    // CONDITIONAL FORMATTING
    // ------------------------------------------------------------

    {
      heading: "Conditional Formatting",
      blocks: [
        {
          type: "paragraph",
          text:
            "Conditional formatting automatically changes the appearance of cells based on their values.",
        },
        {
          type: "paragraph",
          text:
            "You can apply color scales, data bars, or icons to quickly highlight trends and outliers.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/basic-tips-data/basic-tips-data-conditional-format.png",
          alt: "Conditional formatting with icons example",
        },
      ],
    },

    // ------------------------------------------------------------
    // FIND AND REPLACE
    // ------------------------------------------------------------

    {
      heading: "Using Find and Replace",
      blocks: [
        {
          type: "paragraph",
          text:
            "When working with large worksheets, locating specific information can be time-consuming.",
        },
        {
          type: "paragraph",
          text:
            "The Find feature searches your workbook instantly. Replace allows you to modify multiple instances of text at once.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/basic-tips-data/basic-tips-data-find-replace.png",
          alt: "Find and Replace dialog box",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which Excel feature highlights cells based on rules you define?",
          options: [
            "Data Validation",
            "Sparklines",
            "Conditional Formatting",
            "Cell Styles",
          ],
          correctIndex: 2,
          explanation: "Conditional Formatting applies formatting automatically based on rules you define, so cells change appearance as their values change. It is dynamic — unlike manually applied formatting, which stays put.",
          optionRationales: [
            "Data Validation restricts what can be entered into a cell. It prevents bad input rather than highlighting it after the fact.",
            "Sparklines are miniature charts drawn inside a single cell. They visualize a trend rather than highlighting cells by rule.",
            "Correct. Conditional Formatting applies formatting automatically according to rules you define.",
            "Cell Styles apply saved formatting when you choose them. They are applied manually and do not respond to values.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text:
        "Using a worksheet with at least 20 rows of data, complete the following:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Freeze the top row so headers remain visible.",
        "Sort one column alphabetically or numerically.",
        "Apply a filter to display only specific rows.",
        "Format the dataset as a table.",
        "Create a chart to visualize one column of numeric data.",
        "Apply conditional formatting to highlight the highest values.",
        "Use Find and Replace to change one repeated value in the worksheet.",
      ],
    },
  ],
},

// ============================================================
// LESSON 2 – FREEZING PANES AND VIEW OPTIONS
// ============================================================

{
  slug: "freezing-panes-view-options",
  title: "Freezing Panes and View Options",
  description:
    "Learn how to freeze rows and columns, split worksheets, and open multiple windows to compare data more effectively.",
  objectives: [
    "Freeze rows and columns so headers stay visible while scrolling",
    "Split a window to view distant parts of a sheet at once",
    "Open a second window onto the same workbook",
    "Choose the right view tool for a given navigation problem",
  ],
  duration: "10 min",

  videoUrl: "https://www.youtube.com/embed/zuhsUNBeNHw",

  practiceFiles: [
    {
        name: "Download Practice Workbook",
        url: "/practice/excel/module-5/freezing/Excel_FreezePanes_Practice.xlsx",
    },
    ],


    sections: [


      {
          heading: "Losing the headers is a data-entry hazard",
          blocks: [
            {
              type: "scenario",
              role: "You update quantities in a 900-row tracker at Lakeside Medical Associates.",
              text: "At row 340 the headers are long gone. You are counting columns from the left to work out which is Reorder Level and which is Quantity on Hand. Eventually you miscount, and the entries go into the wrong column.",
              task: "Keep the headers on screen, so every row is entered against a visible label.",
            },
            {
              type: "paragraph",
              text: "Freeze Panes keeps chosen rows and columns fixed while the rest scrolls. The rule that catches everyone: Excel freezes everything above and to the left of the selected cell. To freeze row 1 and column A together, select B2 — not A1 — and then Freeze Panes.",
            },
            {
              type: "table",
              caption: "Which view tool to use",
              columns: [
                "You want",
                "Use",
                "How",
              ],
              rows: [
                [
                  "Headers visible while scrolling",
                  "Freeze Panes",
                  "Select the cell below and right of what should stay, then freeze",
                ],
                [
                  "To compare row 5 with row 400",
                  "Split",
                  "View > Split — each pane scrolls independently",
                ],
                [
                  "Two sheets side by side",
                  "New Window",
                  "View > New Window, then Arrange All",
                ],
                [
                  "To hide detail temporarily",
                  "Group",
                  "Data > Group creates collapsible sections",
                ],
              ],
            },
            {
              type: "tip",
              text: "View > New Window opens a second window onto the same workbook — not a copy. Edits in one appear instantly in the other, so you can watch a summary sheet update as you type into the data sheet. Arrange All tiles them side by side.",
            },
          ],
        },

    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------

    {
        heading: "Why Freeze Panes and View Tools Matter",
        blocks: [
        {
            type: "paragraph",
            text:
            "As spreadsheets grow larger, important information like headers and identifiers can disappear when scrolling. Excel provides Freeze Panes, Split, and New Window tools to improve navigation and comparison.",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_rows_example.png",
            alt: "Large dataset requiring freeze panes",
        },
        ],
    },

    // ------------------------------------------------------------
    // FREEZE TOP ROW
    // ------------------------------------------------------------

    {
        heading: "Freeze the Top Row",
        blocks: [
        {
            type: "paragraph",
            text:
            "If your headers are in Row 1, use Freeze Top Row to keep them visible while scrolling.",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_top_row.png",
            alt: "Freeze Top Row command",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_row.png",
            alt: "Top row frozen example",
            caption:
            "Row 1 remains visible even as you scroll down.",
        },
        ],
    },

    // ------------------------------------------------------------
    // FREEZE MULTIPLE ROWS
    // ------------------------------------------------------------

    {
        heading: "Freeze Multiple Rows",
        blocks: [
        {
            type: "paragraph",
            text:
            "To freeze more than one row, select the row below the rows you want frozen, then choose Freeze Panes.",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_panes.png",
            alt: "Freeze Panes dropdown",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_panes(1).png",
            alt: "Multiple rows frozen",
        },
        ],
    },

    // ------------------------------------------------------------
    // FREEZE COLUMNS
    // ------------------------------------------------------------

    {
        heading: "Freeze Columns",
        blocks: [
        {
            type: "paragraph",
            text:
            "To freeze columns, select the column to the right of the columns you want frozen.",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_columns.png",
            alt: "Freeze columns selection",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_column_frozen.png",
            alt: "Column frozen result",
            caption:
            "The first column stays visible while scrolling horizontally.",
        },
        ],
    },

    // ------------------------------------------------------------
    // UNFREEZE
    // ------------------------------------------------------------

    {
        heading: "Unfreeze Panes",
        blocks: [
        {
            type: "paragraph",
            text:
            "To remove any freeze settings, go to View → Freeze Panes → Unfreeze Panes.",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_unfreeze.png",
            alt: "Unfreeze command",
        },
        ],
    },

    // ------------------------------------------------------------
    // NEW WINDOW
    // ------------------------------------------------------------

    {
        heading: "Open a New Window",
        blocks: [
        {
            type: "paragraph",
            text:
            "Excel allows you to open a second window of the same workbook for comparison.",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_new_window.png",
            alt: "New Window command",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_new_window_compare.png",
            alt: "Two windows open side by side",
        },
        ],
    },

    // ------------------------------------------------------------
    // ARRANGE WINDOWS
    // ------------------------------------------------------------

    {
        heading: "Arrange All Windows",
        blocks: [
        {
            type: "paragraph",
            text:
            "Use Arrange All to automatically tile workbook windows for comparison.",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_arrange_all.png",
            alt: "Arrange All dialog",
        },
        ],
    },

    // ------------------------------------------------------------
    // SPLIT WORKSHEET
    // ------------------------------------------------------------

    {
        heading: "Split a Worksheet",
        blocks: [
        {
            type: "paragraph",
            text:
            "The Split command divides your worksheet into panes that scroll independently.",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_split_origin.png",
            alt: "Before split applied",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_split_command.png",
            alt: "Split command",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_split_done.png",
            alt: "Split applied",
        },
        {
            type: "image",
            src: "/images/excel/module-5/freezing/freezing_split_final_result.png",
            alt: "Final split view",
            caption:
            "Each pane scrolls independently for comparison.",
        },
        ],
    },

    {
        heading: "Knowledge Check",
        blocks: [
        {
            type: "knowledge-check",
            question: "What does freezing the top row in Excel do?",
            options: [
            "Prevents the row from being edited",
            "Locks the row so it cannot be deleted",
            "Keeps the header row visible when you scroll down",
            "Applies bold formatting to all cells in the row",
            ],
            correctIndex: 2,
            explanation: "Freezing keeps the top row fixed on screen while the rest of the sheet scrolls beneath it, so column headers stay visible at any row. It affects display only — nothing about the data changes.",
            optionRationales: [
              "Freezing does not restrict editing. Preventing edits is sheet protection, a separate feature.",
              "The row can still be deleted. Freezing is purely a viewing setting.",
              "Correct. The row stays visible while the rest of the sheet scrolls.",
              "Freezing applies no formatting. Bold headers are a separate, and worthwhile, choice.",
            ],
        },
        ],
    },

    ],

    challenge: [
    {
        type: "paragraph",
        text:
        "Within our example file, there is a LOT of sales data. For this challenge, we want to compare data for different years side by side. To do this:",
    },
    {
        type: "list",
        ordered: true,
        items: [
        "Download our practice workbook.",
        "Open a new window for your workbook.",
        "Freeze First Column and use the horizontal scroll bar to look at sales from 2015.",
        "Unfreeze the first column.",
        "Select cell G17 and click Split to split the worksheet into multiple panes. Hint: This should split the worksheet between rows 16 and 17 and columns F and G.",
        "Use the horizontal scroll bar in the bottom-right of the window to move the worksheet so Column N, which contains data for January 2015, is next to Column F.",
        "Open a new window for your workbook and select the 2012-2013 Sales tab.",
        "Move your windows so they are side by side. Now you’re able to compare data for similar months from several different years. Your screen should look something like this:",
        ],
    },
    {
        type: "image",
        src: "/images/excel/module-5/freezing/freezing_split_final_result.png",
        alt: "Two Excel windows side by side for comparing sales data across years",
        caption:
        "Goal: two workbook windows arranged side-by-side so you can compare the same months across different years.",
    },
    ],
},

// ============================================================
// LESSON 3 – SORTING DATA
// ============================================================

{
  slug: "sorting-data",
  title: "Sorting Data",
  description:
    "Learn how to sort text, numbers, and custom lists in Excel. Master basic sorting, multi-level sorting, and logical ordering using the Sort dialog box.",
  objectives: [
    "Sort by one column and by several columns in priority order",
    "Explain why selecting a single column before sorting corrupts data",
    "Use custom sort orders for non-alphabetical sequences",
    "Recognize when a sort has gone wrong and recover",
  ],
  duration: "12 min",

  videoUrl: "https://www.youtube.com/embed/Ep5q1cUhQas",

  practiceFiles: [
    {
        name: "Download Practice Workbook",
        url: "/practice/excel/module-5/sorting/Excel_Sorting_Practice.xlsx",
    },
    ],

  sections: [

    {
       heading: "The most destructive mistake in Excel",
       blocks: [
         {
           type: "scenario",
           role: "You organize the supply list at Lakeside Medical Associates.",
           text: "You click the Item Name column, select just that column, and sort A to Z. The names reorder. The quantities, prices, and vendors do not. Every row now pairs a name with another item's data, and there is no way to tell what belonged with what.",
           task: "Sort in a way that keeps each record intact, and know how to recover when it goes wrong.",
         },
         {
           type: "paragraph",
           text: "This is the error worth being genuinely careful about, because it is silent and often unrecoverable. Sorting one selected column reorders only that column. Every other column stays put, so the association between a name and its data is destroyed — and nothing on screen indicates anything is wrong.",
         },
         {
           type: "paragraph",
           text: "The safe method is to click a single cell inside the data and use Data > Sort. Excel then detects the whole contiguous range and sorts complete rows, keeping records together. If a warning offers to 'Expand the selection,' always accept it — that dialog is Excel catching this exact mistake.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "If you realize you have mis-sorted, press Ctrl+Z immediately and do nothing else first. Once you save and close, the original pairing is gone — there is no way to reconstruct which name belonged to which quantity. This is the strongest practical argument for storing working files in OneDrive, where version history can recover the previous state.",
         },
         {
           type: "tip",
           text: "Add an index column numbered 1, 2, 3 before you start sorting a data set. Sorting by that column returns the sheet to its original order at any point, which turns an irreversible operation into a reversible one.",
         },
       ],
     },

    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------

    {
      heading: "Understanding Sorting in Excel",
      blocks: [
        {
          type: "paragraph",
          text:
            "Sorting reorganizes your dataset based on the values in one or more columns. Instead of manually rearranging rows, Excel automatically moves entire records together so your data remains aligned.",
        },
        {
          type: "paragraph",
          text:
            "You can sort alphabetically, numerically, by date, or by a custom logical order such as T-shirt sizes.",
        },
      ],
    },

    // ------------------------------------------------------------
    // STEP 1 – SELECTING YOUR DATA
    // ------------------------------------------------------------

    {
      heading: "Step 1: Select a Cell Inside Your Dataset",
      blocks: [
        {
          type: "paragraph",
          text:
            "Before sorting, click anywhere inside your dataset. Excel will automatically detect the surrounding data range.",
        },
        {
          type: "paragraph",
          text:
            "If you select only one column instead of the entire dataset, you risk misaligning rows and corrupting your data.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_cell_range.png",
          alt: "Selecting a cell inside the dataset",
        },
      ],
    },

    // ------------------------------------------------------------
    // STEP 2 – LOCATING SORT TOOLS
    // ------------------------------------------------------------

    {
      heading: "Step 2: Locate the Sort Commands",
      blocks: [
        {
          type: "paragraph",
          text:
            "Sorting tools are located on the Data tab inside the Sort & Filter group.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_ribbon.png",
          alt: "Sort & Filter group on Data tab",
        },
        {
          type: "paragraph",
          text:
            "There are two quick-sort buttons (A–Z and Z–A) and a full Sort button for advanced options.",
        },
      ],
    },

    // ------------------------------------------------------------
    // BASIC SORTING – A TO Z
    // ------------------------------------------------------------

    {
      heading: "Basic Sorting: A to Z",
      blocks: [
        {
          type: "paragraph",
          text:
            "The A–Z button sorts text alphabetically (A to Z), numbers from smallest to largest, and dates from oldest to newest.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_a-z.png",
          alt: "A to Z sorting command",
        },
        {
          type: "paragraph",
          text:
            "After clicking A–Z, Excel reorganizes the entire dataset based on the selected column.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_a-z_done.png",
          alt: "Dataset sorted A to Z",
        },
      ],
    },

    // ------------------------------------------------------------
    // BASIC SORTING – Z TO A
    // ------------------------------------------------------------

    {
      heading: "Basic Sorting: Z to A",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Z–A button reverses the order. It sorts text from Z to A, numbers from largest to smallest, and dates from newest to oldest.",
        },
        {
          type: "paragraph",
          text:
            "This is useful when identifying top performers, highest values, or most recent entries.",
        },
      ],
    },

    // ------------------------------------------------------------
    // ADVANCED SORTING – USING THE SORT DIALOG
    // ------------------------------------------------------------

    {
      heading: "Using the Sort Dialog for More Control",
      blocks: [
        {
          type: "paragraph",
          text:
            "For advanced sorting, click the Sort button instead of the A–Z icons.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_sort_command.png",
          alt: "Sort command button",
        },
        {
          type: "paragraph",
          text:
            "The Sort dialog box allows you to choose specific columns and define custom sorting rules.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_dialog.png",
          alt: "Sort dialog box",
        },
        {
          type: "paragraph",
          text:
            "If your dataset includes headers, ensure 'My data has headers' is checked so Excel recognizes column names.",
        },
      ],
    },

    // ------------------------------------------------------------
    // MULTI-LEVEL SORTING
    // ------------------------------------------------------------

    {
      heading: "Multi-Level Sorting",
      blocks: [
        {
          type: "paragraph",
          text:
            "Multi-level sorting allows you to sort by more than one column. Excel sorts by the first column, then breaks ties using the second column.",
        },
        {
          type: "paragraph",
          text:
            "For example, you could sort by Homeroom number first, then by Last Name.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_add_level_dialog.png",
          alt: "Add Level in Sort dialog",
        },
        {
          type: "paragraph",
          text:
            "Use Add Level to introduce another sorting rule. You can adjust priority using Move Up or Move Down.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_add_level_move_up-down.png",
          alt: "Move Up and Move Down sorting levels",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_add_level_sorted.png",
          alt: "Multi-level sorted result",
        },
      ],
    },

    // ------------------------------------------------------------
    // CUSTOM LIST SORTING
    // ------------------------------------------------------------

    {
      heading: "Sorting with Custom Lists",
      blocks: [
        {
          type: "paragraph",
          text:
            "Alphabetical order is not always logical. For example, T-shirt sizes should follow Small, Medium, Large, X-Large — not alphabetical order.",
        },
        {
          type: "paragraph",
          text:
            "To create a logical order, use Custom Lists.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_dialog_order.png",
          alt: "Order dropdown showing Custom List option",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_custom_lists_dialog.png",
          alt: "Custom Lists dialog window",
        },
        {
          type: "paragraph",
          text:
            "Enter your logical sequence (Small, Medium, Large, X-Large) and click Add.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_custom_lists_selected.png",
          alt: "Custom list selected",
        },
        {
          type: "image",
          src: "/images/excel/module-5/sorting/sorting_custom_lists_sorted.png",
          alt: "Dataset sorted using custom list",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What type of sort would you use to organize a list from A to Z?",
          options: [
            "Descending sort",
            "Custom sort",
            "Ascending sort",
            "Multi-level sort",
          ],
          correctIndex: 2,
          explanation: "An ascending sort runs smallest to largest — A to Z for text, earliest to latest for dates, lowest to highest for numbers.",
          optionRationales: [
            "Descending is the reverse: Z to A, latest to earliest, highest to lowest.",
            "A custom sort defines a non-alphabetical order, such as Low, Medium, High. Useful, but not what A to Z means.",
            "Correct. Ascending sorts A to Z for text.",
            "A multi-level sort orders by several columns in priority. Each level is still ascending or descending.",
          ],
        },
      ],
    },

  ],

challenge: [
  {
    type: "paragraph",
    text:
      "Download and open the practice workbook provided for this lesson.",
  },
  {
    type: "list",
    ordered: true,
    items: [
      "Click the Challenge tab at the bottom of the workbook.",
      "For the main table, create a custom sort that sorts by Grade from Smallest to Largest and then by Camper Name from A to Z.",
      "Create a second sort for the Additional Information section. Sort by Counselor (Column H) from A to Z.",
      "Ensure the entire dataset moves together without misaligning rows.",
      "When finished, your workbook should match the example shown below.",
    ],
  },
  {
    type: "image",
    src: "/images/excel/module-5/sorting/sorting_final_result.png",
    alt: "Final sorted challenge result",
    caption:
      "Final result after applying multi-level sorting and sorting the Additional Information section.",
  },
],
},

// ============================================================
// LESSON 4 – FILTERING DATA
// ============================================================

{
  slug: "filtering-data",
  title: "Filtering Data",
  description:
    "Learn how to filter lists and tables to show only the records you need. Use checkbox filters, search, text/number/date filters, and clear filters confidently.",
  objectives: [
    "Apply and clear filters on one or more columns",
    "Use text, number, and date filters for specific criteria",
    "Explain what filtering hides and what it does not remove",
    "Recognize when filtered rows are affecting your totals",
  ],
  duration: "14 min",

  videoUrl: "https://www.youtube.com/embed/_OdsZR_rL1U",

  practiceFiles: [
        {
            name: "Download Practice Workbook",
            url: "/practice/excel/module-5/filtering/Excel_Filtering_Practice.xlsx",
        },
        ],

  sections: [

    {
       heading: "Filtered rows are hidden, not gone",
       blocks: [
         {
           type: "scenario",
           role: "You report on medical supply spending at Lakeside Medical Associates.",
           text: "You filter the sheet to Medical Supplies and read the total at the bottom: $18,400. That figure is the total of every row in the sheet, including the office and cleaning supplies currently hidden. You report it as the medical supply spend, and it is wrong by about two-thirds.",
           task: "Understand that filtering changes what you see, not what formulas calculate.",
         },
         {
           type: "paragraph",
           text: "Filtering hides rows that do not match. The data is entirely intact and returns when the filter is cleared — which is what makes it safe. But SUM and AVERAGE include hidden rows, because they operate on the range, not on what happens to be visible.",
         },
         {
           type: "paragraph",
           text: "=SUBTOTAL(109, E2:E900) is the fix: it sums only visible rows and updates as the filter changes. The 109 specifies sum-ignoring-hidden-rows. There is a parallel code for each function — 101 for average, 103 for count. Converting the range to an Excel Table gives you a Total Row that uses SUBTOTAL automatically.",
         },
         {
           type: "tip",
           text: "When a filter is active, Excel's status bar reports the count of visible rows, and the filtered column's dropdown arrow shows a funnel icon. If a sheet looks like it is missing data, check for that funnel before concluding anything was deleted — an unnoticed filter is a very common false alarm.",
         },
       ],
     },

    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------

    {
      heading: "Why Filters Matter",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a worksheet has a lot of rows, it’s hard (and honestly pointless) to scroll forever hunting for what you need. Filters let you temporarily hide rows that don’t match your criteria—without deleting anything.",
        },
        {
          type: "paragraph",
          text:
            "Filters are perfect for finding items by category, narrowing to specific dates, or showing only records that meet a numeric requirement (like loan amounts over $100).",
        },
      ],
    },

    // ------------------------------------------------------------
    // REQUIREMENT: HEADER ROW
    // ------------------------------------------------------------

    {
      heading: "Before You Filter: Make Sure You Have Headers",
      blocks: [
        {
          type: "paragraph",
          text:
            "Filtering works best when your data has a clear header row (column names like ID#, Type, Item Description, etc.). Excel uses these headers to label each filter dropdown.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_header.png",
          alt: "Dataset with header row and filter dropdown arrows",
          caption:
            "Headers identify each column so Excel can filter correctly.",
        },
      ],
    },

    // ------------------------------------------------------------
    // TURNING FILTER ON (DATA TAB)
    // ------------------------------------------------------------

    {
      heading: "Turn Filters On",
      blocks: [
        {
          type: "paragraph",
          text:
            "To enable filtering, go to the Data tab and click the Filter button. Excel adds a dropdown arrow to each header cell.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_data_tab_filter.png",
          alt: "Data tab Filter command",
        },
        {
          type: "paragraph",
          text:
            "Once filters are on, every column header gets a dropdown arrow you can click to filter that column.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_dropdown_arrow.png",
          alt: "Filter dropdown arrow in a table header",
        },
        {
          type: "paragraph",
          text:
            "You can also access Filter from the Home tab under Sort & Filter (different path, same tool).",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_sort_filter_alt.png",
          alt: "Home tab Sort & Filter menu showing Filter option",
        },
      ],
    },

    // ------------------------------------------------------------
    // BASIC CHECKBOX FILTER
    // ------------------------------------------------------------

    {
      heading: "Basic Filtering with Checkboxes",
      blocks: [
        {
          type: "paragraph",
          text:
            "The simplest filter is the checkbox list. You open the filter dropdown, uncheck everything, then check only what you want to see.",
        },
        {
          type: "paragraph",
          text:
            "Example: Filter the Type column to show only Laptop and Projector.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_menu.png",
          alt: "Filter menu dropdown showing checkbox list",
          caption:
            "The filter menu shows sorting at the top and checkbox filtering at the bottom.",
        },
        {
          type: "paragraph",
          text:
            "First, uncheck Select All so you can start from a clean slate.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_uncheck.png",
          alt: "Unchecking Select All in a filter menu",
        },
        {
          type: "paragraph",
          text:
            "Then check only the values you want and click OK. Excel hides everything else.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_filtered.png",
          alt: "Filtered dataset after choosing values",
          caption:
            "Only rows matching the selected values remain visible.",
        },
      ],
    },

    // ------------------------------------------------------------
    // MULTIPLE FILTERS (CUMULATIVE)
    // ------------------------------------------------------------

    {
      heading: "Applying Multiple Filters (Filters Stack)",
      blocks: [
        {
          type: "paragraph",
          text:
            "Filters are cumulative—meaning each new filter further narrows your results. This is how you go from “a lot of rows” to “exactly what I need.”",
        },
        {
          type: "paragraph",
          text:
            "Example: If you already filtered Type to Laptop + Projector, you can ALSO filter Checked Out to show only items checked out in August.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_multiple_filters.png",
          alt: "Applying another filter on a date column",
        },
        {
          type: "paragraph",
          text:
            "After applying that second filter, you’ll see a smaller subset that matches BOTH criteria.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_new_filter.png",
          alt: "New filter applied on top of an existing filter",
          caption:
            "Multiple filters narrow the list step-by-step.",
        },
      ],
    },

    // ------------------------------------------------------------
    // CLEARING FILTERS
    // ------------------------------------------------------------

    {
      heading: "Clearing a Filter (Without Turning Filters Off)",
      blocks: [
        {
          type: "paragraph",
          text:
            "When you’re done with a filter, don’t panic-scroll. Just clear it.",
        },
        {
          type: "paragraph",
          text:
            "Open the dropdown for the filtered column and choose Clear Filter From [Column Name]. That restores the hidden rows for that column’s filter.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_filter_menu.png",
          alt: "Clear Filter option in a filter dropdown",
        },
        {
          type: "paragraph",
          text:
            "If you want to remove ALL filters from the sheet at once, click Filter again on the Data tab to toggle filtering off.",
        },
      ],
    },

    // ------------------------------------------------------------
    // SEARCH FILTER (FAST)
    // ------------------------------------------------------------

    {
      heading: "Filtering with Search",
      blocks: [
        {
          type: "paragraph",
          text:
            "Search is the fastest way to filter when you’re looking for one brand, keyword, or repeated term.",
        },
        {
          type: "paragraph",
          text:
            "Open the filter dropdown for the column you want (like Equipment Detail), then type into the search box. Excel narrows the checkbox list automatically as you type.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_search.png",
          alt: "Filter search box inside dropdown",
        },
        {
          type: "paragraph",
          text:
            "Example: Type saris to show only Saris items.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_filtered_search.png",
          alt: "Search term applied inside the filter dropdown",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_laptop_search.png",
          alt: "Filtered results after search is applied",
          caption:
            "After clicking OK, the worksheet updates to show only matching rows.",
        },
      ],
    },

    // ------------------------------------------------------------
    // ADVANCED TEXT FILTER
    // ------------------------------------------------------------

    {
      heading: "Advanced Text Filters (Contains / Does Not Contain)",
      blocks: [
        {
          type: "paragraph",
          text:
            "When checkboxes and search aren’t specific enough, use Text Filters. These let you filter based on rules like Begins With, Ends With, Contains, or Does Not Contain.",
        },
        {
          type: "paragraph",
          text:
            "Example: Exclude items that contain the word laptop.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_does_not_contain.png",
          alt: "Text Filters menu showing Does Not Contain",
        },
        {
          type: "paragraph",
          text:
            "This opens a Custom AutoFilter box where you type the word or phrase and confirm.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_menu_between.png",
          alt: "Custom AutoFilter dialog for a text rule",
        },
      ],
    },

    // ------------------------------------------------------------
    // ADVANCED NUMBER FILTER
    // ------------------------------------------------------------

    {
      heading: "Advanced Number Filters (Greater Than / Between)",
      blocks: [
        {
          type: "paragraph",
          text:
            "Number Filters are used for columns with numeric values like ID numbers, quantities, prices, or loan amounts.",
        },
        {
          type: "paragraph",
          text:
            "You can filter values greater than, less than, between two numbers, top 10, above average, and more.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_number_filter.png",
          alt: "Number Filters menu showing Between option",
        },
        {
          type: "paragraph",
          text:
            "Example: Show only records with ID numbers between 3000 and 6000.",
        },
      ],
    },

    // ------------------------------------------------------------
    // ADVANCED DATE FILTER
    // ------------------------------------------------------------

    {
      heading: "Advanced Date Filters (This Month / Between Dates)",
      blocks: [
        {
          type: "paragraph",
          text:
            "Date filters are built for time-based data. You can filter by year, month, or use built-in ranges like Last Week, Next Month, or Between two dates.",
        },
        {
          type: "paragraph",
          text:
            "Example: Filter Checked Out to show only items checked out between two specific dates.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/filtering/filtering_date_filters.png",
          alt: "Date Filters menu showing Between option",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does applying a filter to a column do?",
          options: [
            "Permanently deletes rows that do not match the filter",
            "Sorts the column in ascending order automatically",
            "Shows only rows that match the selected criteria",
            "Highlights matching cells with a color",
          ],
          correctIndex: 2,
          explanation: "A filter temporarily hides rows that do not match your criteria. The data is untouched and returns the moment the filter is cleared — but be aware that ordinary SUM and AVERAGE still include the hidden rows.",
          optionRationales: [
            "Nothing is deleted. Clearing the filter brings every row back, which is what makes filtering safe to use freely.",
            "Filtering and sorting are independent. A filter changes which rows are visible, not their order.",
            "Correct. Only rows matching the criteria remain visible; the rest are hidden but intact.",
            "That describes Conditional Formatting, which changes appearance. Filtering changes visibility.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text:
        "Download and open the practice workbook.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Click the Challenge tab in the bottom-left of the workbook.",
        "Apply a filter to show only Electronics and Instruments.",
        "Use the Search feature to filter item descriptions that contain the word Sansei (you should see 6 entries).",
        "Clear the Item Description filter.",
        "Using a number filter, show loan amounts greater than or equal to $100.",
        "Filter to show only items that have deadlines in 2016.",
        "When you're finished, your workbook should look like the example below.",
      ],
    },
    {
      type: "image",
      src: "/images/excel/module-5/filtering/filtering_final_result.png",
      alt: "Final filtering challenge result",
      caption:
        "Final result after applying item type, search, number, and date filters.",
    },
  ],
},

// ============================================================
// LESSON 5 – GROUPS AND SUBTOTALS
// ============================================================

{
  slug: "groups-and-subtotals",
  title: "Groups and Subtotals",
  description:
    "Learn how to organize large datasets using grouping and automatically summarize data with the Subtotal command.",
  objectives: [
    "Group rows and columns into collapsible outlines",
    "Apply automatic subtotals to a sorted data set",
    "Explain why data must be sorted before subtotalling",
    "Remove subtotals and return to a clean data range",
  ],
  duration: "15 min",

  videoUrl: "https://www.youtube.com/embed/7JJOBFSHbZk",

  practiceFiles: [
    {
        name: "Download Practice Workbook",
        url: "/files/excel/Excel_Subtotals_Practice.xlsx",
    },
    ],

  sections: [

    {
       heading: "Subtotals require a sort first",
       blocks: [
         {
           type: "scenario",
           role: "You summarize spending by category at Lakeside Medical Associates.",
           text: "You run Data > Subtotal on the supply sheet without sorting it first. Excel inserts a subtotal every time the category changes from one row to the next — producing forty-one subtotals across a sheet with four categories.",
           task: "Sort by the grouping column first, so each category occupies one contiguous block.",
         },
         {
           type: "paragraph",
           text: "The Subtotal command inserts a summary row whenever the value in your chosen column changes. It has no memory of categories it has already seen, so if the categories are scattered it dutifully subtotals each run. Sorting by that column first gathers each category into one block, and you get one subtotal per category.",
         },
         {
           type: "paragraph",
           text: "Subtotals add an outline down the left edge with numbered buttons. Clicking 1 shows the grand total alone, 2 shows category subtotals, and 3 shows every row. That collapsibility is the real benefit — the same sheet serves both a manager wanting four numbers and an analyst wanting all 900 rows.",
         },
         {
           type: "callout",
           variant: "info",
           text: "Subtotals insert real rows into your data, which means the range is no longer a clean data set — sorting it again will scramble the subtotal rows in with the data. Remove them with Data > Subtotal > Remove All before doing anything else with the range. For repeated analysis, a PivotTable is the better tool, because it summarizes without altering the source at all.",
         },
       ],
     },

    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------

    {
      heading: "Why Groups and Subtotals Matter",
      blocks: [
        {
          type: "paragraph",
          text:
            "Large datasets can quickly become overwhelming. Groups and Subtotals allow you to organize data into collapsible sections and automatically calculate summaries such as totals, counts, or averages.",
        },
        {
          type: "paragraph",
          text:
            "When subtotals are applied, Excel creates an outline structure that lets you expand or collapse levels of detail.",
        },
      ],
    },

    // ------------------------------------------------------------
    // GROUPING ROWS OR COLUMNS
    // ------------------------------------------------------------

    {
      heading: "Grouping Rows or Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can manually group selected rows or columns to create collapsible sections.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Select the rows or columns you want to group.",
            "Go to the Data tab.",
            "Click the Group command in the Outline group.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_group_command.png",
          alt: "Group command on Data tab",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_grouped_range.png",
          alt: "Grouped columns example",
          caption:
            "Selected columns are grouped and can now be collapsed.",
        },
      ],
    },

    // ------------------------------------------------------------
    // HIDE AND SHOW DETAIL
    // ------------------------------------------------------------

    {
      heading: "Hide and Show Detail",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once data is grouped, minus (-) and plus (+) buttons appear to the left of the worksheet.",
        },
        {
          type: "paragraph",
          text:
            "Click the minus sign to collapse (hide) detail. Click the plus sign to expand (show) detail.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_hide.png",
          alt: "Hide detail button",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_hidden.png",
          alt: "Collapsed group view",
        },
      ],
    },

    // ------------------------------------------------------------
    // IMPORTANT: SORT BEFORE SUBTOTAL
    // ------------------------------------------------------------

    {
      heading: "Important: Sort Before Using Subtotal",
      blocks: [
        {
          type: "paragraph",
          text:
            "Before creating subtotals, you must sort your data by the column you plan to group by.",
        },
        {
          type: "paragraph",
          text:
            "For example, if you want to subtotal by T-Shirt Size, sort the worksheet by T-Shirt Size first.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_sort.png",
          alt: "Sorting data before subtotaling",
        },
      ],
    },

    // ------------------------------------------------------------
    // CREATING A SUBTOTAL
    // ------------------------------------------------------------

    {
      heading: "Creating a Subtotal",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Sort your worksheet by the column you want to subtotal.",
            "Go to the Data tab.",
            "Click Subtotal.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_subtotal_command.png",
          alt: "Subtotal command on Data tab",
        },
        {
          type: "paragraph",
          text:
            "In the Subtotal dialog box:",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_subtotal_count_fx.png",
          alt: "Subtotal dialog showing Count function",
        },
        {
          type: "paragraph",
          text:
            "• At each change in: Select the grouping column (e.g., T-Shirt Size)\n• Use function: Choose COUNT, SUM, AVERAGE, etc.\n• Add subtotal to: Select the column to calculate",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_t-shirt_size.png",
          alt: "Subtotal dialog selecting T-Shirt Size",
        },
      ],
    },

    // ------------------------------------------------------------
    // OUTLINE LEVELS
    // ------------------------------------------------------------

    {
      heading: "Understanding Outline Levels",
      blocks: [
        {
          type: "paragraph",
          text:
            "After applying subtotals, Excel creates outline levels on the left side of the worksheet.",
        },
        {
          type: "paragraph",
          text:
            "Level 1 shows only the Grand Total.\nLevel 2 shows subtotal rows.\nLevel 3 shows all detailed data.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_group_level_1.png",
          alt: "Level 1 outline",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_group_level_2.png",
          alt: "Level 2 outline",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_group_level_3.png",
          alt: "Level 3 outline",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_result_full_view.png",
          alt: "Full subtotal result",
        },
      ],
    },

    // ------------------------------------------------------------
    // REMOVING SUBTOTALS
    // ------------------------------------------------------------

    {
      heading: "Removing Subtotals",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove subtotals entirely:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Go to Data → Subtotal.",
            "Click Remove All.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_subtotal_remove_all.png",
          alt: "Remove All in Subtotal dialog",
        },
      ],
    },

    // ------------------------------------------------------------
    // CLEAR OUTLINE (UNGROUP ONLY)
    // ------------------------------------------------------------

    {
      heading: "Clearing Groups Without Removing Data",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you want to remove grouping but keep the data, use Clear Outline.",
        },
        {
          type: "image",
          src: "/images/excel/module-5/groups-subtotals/groups-subtotals_ungroup_clear_outline.png",
          alt: "Clear Outline option",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does the Subtotal command do?",
          options: [
            "Sorts the dataset alphabetically before calculating",
            "Removes duplicate rows from the dataset",
            "Automatically calculates summary values (sum, average, etc.) for grouped data",
            "Converts a data range into an Excel Table",
          ],
          correctIndex: 2,
          explanation: "Subtotal inserts summary rows into a sorted data set, calculating a sum, average, count, or similar for each group, and adds a collapsible outline so you can move between summary and detail.",
          optionRationales: [
            "Subtotal does not sort — which is exactly the trap. You must sort by the grouping column yourself first, or you get a subtotal at every change of value.",
            "Removing duplicates is a separate command on the Data tab.",
            "Correct. It calculates summary values for each group and adds an outline for collapsing detail.",
            "Converting to a Table is Insert > Table, a different feature. Subtotal inserts summary rows into the existing range.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text:
        "Download the practice workbook and complete the following:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Click the Challenge tab.",
        "Sort the worksheet by Grade from Smallest to Largest.",
        "Use Subtotal to group at each change in Grade.",
        "Use the SUM function.",
        "Add subtotals to Amount Raised.",
        "Select outline Level 2 so only subtotals and the grand total appear.",
      ],
    },
    {
      type: "image",
      src: "/images/excel/module-5/groups-subtotals/groups-subtotals_group_level_2.png",
      alt: "Challenge final subtotal view",
      caption:
        "Final result should display subtotal rows and the grand total only.",
    },
  ],
},

  // ============================================================
  // LESSON 6 – CONDITIONAL FORMATTING
  // ============================================================

    {
    slug: "conditional-formatting",
    title: "Conditional Formatting",
    description:
        "Automatically highlight patterns, trends, and performance using Conditional Formatting rules, color scales, data bars, and icon sets.",
    objectives: [
      "Apply highlight rules, data bars, color scales, and icon sets",
      "Write a formula-based conditional formatting rule",
      "Manage rule precedence when several rules apply",
      "Use conditional formatting to surface data problems",
    ],
    duration: "15 min",

    videoUrl: "https://www.youtube.com/embed/zfQ8uOBoIj8",

    practiceFiles: [
        {
            name: "Download Practice Workbook",
            url: "/practice/excel/module-5/conditional-formatting/Excel_ConditionalFormatting_Practice.xlsx",
        },
        ],

    sections: [

      {
         heading: "Formatting that keeps itself up to date",
         blocks: [
           {
             type: "scenario",
             role: "You monitor stock levels at Lakeside Medical Associates.",
             text: "You highlight the below-reorder items in red by hand. A week later the quantities have all changed, but the red highlights have not — they are still marking the items that were low last week. The colour is now actively misleading.",
             task: "Make the formatting a rule about the data, so it can never go stale.",
           },
           {
             type: "paragraph",
             text: "Conditional formatting applies formatting according to a rule evaluated continuously. Set 'highlight cells less than the value in the reorder column' and the highlights follow the data as it changes, with no maintenance at all.",
           },
           {
             type: "table",
             caption: "Rule types and what each is for",
             columns: [
               "Type",
               "Shows",
               "Best for",
             ],
             rows: [
               [
                 "Highlight Cells Rules",
                 "Formatting when a condition is met",
                 "Flagging exceptions — below reorder, over budget",
               ],
               [
                 "Top/Bottom Rules",
                 "The highest or lowest values",
                 "Finding the ten largest expenses",
               ],
               [
                 "Data Bars",
                 "An in-cell bar proportional to the value",
                 "Comparing magnitudes across a column at a glance",
               ],
               [
                 "Color Scales",
                 "A color gradient across the range",
                 "Seeing the distribution — where the highs and lows cluster",
               ],
               [
                 "Icon Sets",
                 "Arrows, flags, or traffic lights",
                 "Status at a glance, with a legend",
               ],
               [
                 "Formula rule",
                 "Formatting driven by any formula",
                 "Highlighting a whole row based on one cell's value",
               ],
             ],
           },
           {
             type: "worked-example",
             title: "Highlighting an entire row when stock is low",
             task: "Make the whole row turn amber when Quantity on Hand falls below Reorder Level, so a scan down the sheet shows what needs ordering.",
             steps: [
               {
                 move: "Select the full data range, A2:F900, starting from the top-left data cell.",
                 why: "A formula rule is evaluated relative to the active cell in your selection, so where the selection starts determines how the formula is interpreted. Selecting from A2 means the rule is written as though it lives in A2.",
               },
               {
                 move: "New Rule > Use a formula to determine which cells to format, and enter =$D2<$E2.",
                 why: "The dollar signs before D and E lock the columns, so every cell in the row tests the same two columns. Leaving the row number relative lets it advance down the sheet. This mixed reference is precisely what makes whole-row formatting work.",
               },
               {
                 move: "Set the format to an amber fill, and confirm.",
                 why: "Amber rather than red leaves red available for something genuinely urgent, such as out of stock. Reserving intensity for severity keeps the sheet readable.",
               },
               {
                 move: "Add a status column reading 'Reorder' driven by the same condition.",
                 why: "Color alone fails in greyscale printing and for colorblind readers, and it cannot be filtered on. A text column can be filtered, sorted, and counted — the color becomes a helpful accent rather than the only signal.",
               },
             ],
             result: "Rows that flag themselves as stock falls, with a text status that also works on paper and can be filtered.",
             takeaway: "Lock the column, leave the row relative, and always pair color with something non-visual.",
           },
         ],
       },

        // ------------------------------------------------------------
        // INTRODUCTION
        // ------------------------------------------------------------

        {
        heading: "Why Conditional Formatting Matters",
        blocks: [
            {
            type: "paragraph",
            text:
                "When working with large datasets, it can be difficult to identify trends and performance issues just by reading numbers. Conditional Formatting automatically applies visual styling based on cell values so patterns become instantly visible.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_example.png",
            alt: "Example of conditional formatting applied to sales data",
            },
        ],
        },

        // ------------------------------------------------------------
        // STEP 1 – SELECT RANGE
        // ------------------------------------------------------------

        {
        heading: "Step 1: Select the Desired Cells",
        blocks: [
            {
            type: "paragraph",
            text:
                "Before applying Conditional Formatting, select the range of cells you want to evaluate.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_selected_range.png",
            alt: "Selecting cells before applying conditional formatting",
            },
        ],
        },

        // ------------------------------------------------------------
        // HIGHLIGHT CELLS RULES – GREATER THAN
        // ------------------------------------------------------------

        {
        heading: "Highlight Cells Greater Than a Value",
        blocks: [
            {
            type: "paragraph",
            text:
                "To highlight values greater than a specific number, use the Highlight Cells Rules option.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_highlight_greater_than.png",
            alt: "Highlight Cells Rules Greater Than option",
            },
            {
            type: "paragraph",
            text:
                "Enter the comparison value (e.g., 4000) and choose a preset style such as Green Fill with Dark Green Text.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_green_fill.png",
            alt: "Greater Than dialog box with 4000 entered",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_green_fill_done.png",
            alt: "Cells highlighted with green formatting",
            caption:
                "Values above the threshold are automatically highlighted.",
            },
        ],
        },

        // ------------------------------------------------------------
        // COLOR SCALES
        // ------------------------------------------------------------

        {
        heading: "Using Color Scales",
        blocks: [
            {
            type: "paragraph",
            text:
                "Color Scales apply a gradient based on cell values. Highest values receive one color, lowest receive another, and middle values are blended between them.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_color_scales.png",
            alt: "Color scale preset applied to dataset",
            },
        ],
        },

        // ------------------------------------------------------------
        // DATA BARS
        // ------------------------------------------------------------

        {
        heading: "Using Data Bars",
        blocks: [
            {
            type: "paragraph",
            text:
                "Data Bars visually represent values inside each cell using horizontal bars, similar to a mini bar chart.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_data_bar.png",
            alt: "Data bars applied to dataset",
            },
        ],
        },

        // ------------------------------------------------------------
        // ICON SETS
        // ------------------------------------------------------------

        {
        heading: "Using Icon Sets",
        blocks: [
            {
            type: "paragraph",
            text:
                "Icon Sets add symbols such as arrows, circles, or indicators based on value ranges. These are useful for performance dashboards.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_icon_sets.png",
            alt: "Icon Sets menu",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_icon_done.png",
            alt: "Icon set applied to dataset",
            },
        ],
        },

        // ------------------------------------------------------------
        // MANAGING RULES
        // ------------------------------------------------------------

        {
        heading: "Managing and Editing Rules",
        blocks: [
            {
            type: "paragraph",
            text:
                "Use Manage Rules to edit, delete, or prioritize formatting rules applied to a worksheet.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_delete_rule.png",
            alt: "Conditional Formatting Rules Manager",
            },
        ],
        },

        // ------------------------------------------------------------
        // CLEARING RULES
        // ------------------------------------------------------------

        {
        heading: "Clearing Conditional Formatting",
        blocks: [
            {
            type: "paragraph",
            text:
                "To remove formatting, click Conditional Formatting → Clear Rules, then choose whether to clear from selected cells or the entire sheet.",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_clear_rules.png",
            alt: "Clear Rules menu",
            },
            {
            type: "image",
            src: "/images/excel/module-5/conditional-formatting/conditional-formatting_removed.png",
            alt: "Worksheet after conditional formatting removed",
            },
        ],
        },

        {
        heading: "Knowledge Check",
        blocks: [
        {
            type: "knowledge-check",
            question: "Which Conditional Formatting option fills cells with a color gradient based on their value?",
            options: [
            "Highlight Cells Rules",
            "Icon Sets",
            "Data Bars",
            "Color Scales",
            ],
            correctIndex: 3,
            explanation: "Color Scales apply a gradient across the range, so each cell's color reflects its value relative to the others. It is the fastest way to see how values are distributed.",
            optionRationales: [
              "Highlight Cells Rules apply one fixed format when a condition is met, rather than a gradient across values.",
              "Icon Sets place a symbol in the cell — an arrow or traffic light — instead of shading it.",
              "Data Bars draw a bar inside each cell proportional to its value. Close, but the bar is a shape rather than a color gradient.",
              "Correct. Color Scales shade cells along a gradient according to their values.",
            ],
        },
        ],
        },

    ],

    challenge: [
        {
        type: "paragraph",
        text:
            "Download and open the practice workbook. Then complete the following:",
        },
        {
        type: "list",
        ordered: true,
        items: [
            "Click the Challenge worksheet tab.",
            "Select cells B3:J17.",
            "Apply Conditional Formatting to highlight values Less Than 70 using a light red fill.",
            "Apply the Icon Set called 3 Symbols (Circled).",
            "Use Manage Rules to remove the light red fill rule but keep the icon set.",
            "Your worksheet should match the example shown below.",
        ],
        },
        {
        type: "image",
        src: "/images/excel/module-5/conditional-formatting/conditional-formatting_final_result.png",
        alt: "Final conditional formatting challenge result",
        caption:
            "Final result showing icon set applied while red fill rule has been removed.",
        },
    ],
    },

    ];