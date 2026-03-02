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
  duration: "6 min",

  sections: [

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
  duration: "10 min",

  videoUrl: "https://www.youtube.com/embed/zuhsUNBeNHw",

  sections: [

    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------

    {
      heading: "Why View Options Matter",
      blocks: [
        {
          type: "paragraph",
          text:
            "When working with large spreadsheets, it becomes difficult to compare information across different sections of a worksheet.",
        },
        {
          type: "paragraph",
          text:
            "Excel includes powerful view tools such as Freeze Panes, Split, and New Window to help you compare and navigate large datasets efficiently.",
        },
      ],
    },

    // ------------------------------------------------------------
    // FREEZING ROWS
    // ------------------------------------------------------------

    {
      heading: "Freezing Rows",
      blocks: [
        {
          type: "paragraph",
          text:
            "Freezing rows allows you to keep header rows visible while scrolling down through large datasets.",
        },
        {
          type: "paragraph",
          text:
            "To freeze rows:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Select the row below the row(s) you want to freeze.",
            "Go to the View tab.",
            "Click Freeze Panes.",
            "Choose Freeze Panes from the dropdown.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-5/freezing/freezing_row.png",
          alt: "Freezing rows example",
          caption:
            "Select the row below the rows you want frozen before choosing Freeze Panes.",
        },
      ],
    },

    // ------------------------------------------------------------
    // FREEZING COLUMNS
    // ------------------------------------------------------------

    {
      heading: "Freezing Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "Freezing columns keeps important identifiers—such as employee names or product IDs—visible while scrolling horizontally.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Select the column to the right of the column(s) you want to freeze.",
            "Go to View → Freeze Panes.",
            "Choose Freeze Panes.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-5/freezing/freezing_columns.png",
          alt: "Freezing column example",
        },
        {
          type: "paragraph",
          text:
            "If you only need the first row or first column, use Freeze Top Row or Freeze First Column.",
        },
      ],
    },

    // ------------------------------------------------------------
    // UNFREEZING PANES
    // ------------------------------------------------------------

    {
      heading: "Unfreezing Panes",
      blocks: [
        {
          type: "paragraph",
          text:
            "To reset your worksheet view:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Go to the View tab.",
            "Click Freeze Panes.",
            "Select Unfreeze Panes.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-5/freezing/freezing_unfreeze.png",
          alt: "Unfreeze panes command",
        },
      ],
    },

    // ------------------------------------------------------------
    // OPENING A NEW WINDOW
    // ------------------------------------------------------------

    {
      heading: "Opening a New Window",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel allows multiple windows of the same workbook to be open at once.",
        },
        {
          type: "paragraph",
          text:
            "This is useful for comparing different worksheets or different sections of the same worksheet.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Go to the View tab.",
            "Click New Window.",
            "Use Arrange All to position windows side by side.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-5/freezing/freezing_new_window_command.png",
          alt: "New Window command",
        },
      ],
    },

    // ------------------------------------------------------------
    // SPLITTING A WORKSHEET
    // ------------------------------------------------------------

    {
      heading: "Splitting a Worksheet",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Split command divides a worksheet into multiple panes that scroll independently.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Select the cell where you want the split.",
            "Go to View → Split.",
            "Scroll each pane independently to compare data.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-5/freezing/freezing_split_command.png",
          alt: "Split worksheet command",
        },
        {
          type: "paragraph",
          text:
            "Click Split again to remove the split.",
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
        "Open a new window for the workbook.",
        "Freeze the first column and scroll horizontally to view later months.",
        "Unfreeze the first column.",
        "Select cell G17 and use Split to divide the worksheet.",
        "Arrange two windows side by side to compare different years.",
      ],
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
  duration: "12 min",

  videoUrl: "https://www.youtube.com/embed/Ep5q1cUhQas",

  sections: [

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
      "Display only the rows that meet specific criteria using Excel filters.",
    duration: "14 min",

    sections: [
      {
        heading: "Using Filters",
        blocks: [
          {
            type: "paragraph",
            text:
              "Filtering narrows your worksheet to show only the data that matches selected criteria.",
          },
          {
            type: "image",
            src: "/images/excel/module-5/basic-tips-data-filter.png",
            alt: "Filtering example with dropdown menu",
          },
        ],
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
      "Group related rows and summarize data using the Subtotal command.",
    duration: "12 min",

    sections: [
      {
        heading: "Creating Subtotals",
        blocks: [
          {
            type: "paragraph",
            text:
              "The Subtotal command allows you to automatically calculate totals for grouped categories.",
          },
          {
            type: "image",
            src: "/images/excel/module-5/basic-tips-data-summarize.png",
            alt: "Subtotal summary example",
          },
        ],
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
      "Highlight patterns and trends automatically using Excel's conditional formatting tools.",
    duration: "11 min",

    sections: [
      {
        heading: "Applying Conditional Formatting",
        blocks: [
          {
            type: "paragraph",
            text:
              "Conditional formatting automatically changes the appearance of cells based on their values.",
          },
          {
            type: "image",
            src: "/images/excel/module-5/basic-tips-data-conditional-format.png",
            alt: "Conditional formatting example",
          },
        ],
      },
    ],
  },

];