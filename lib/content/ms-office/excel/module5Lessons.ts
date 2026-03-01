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
      "Organize worksheet data alphabetically, numerically, or by custom criteria.",
    duration: "12 min",

    sections: [
      {
        heading: "Sorting Information",
        blocks: [
          {
            type: "paragraph",
            text:
              "Sorting allows you to reorganize data for better readability and analysis.",
          },
          {
            type: "image",
            src: "/images/excel/module-5/basic-tips-data-sort.png",
            alt: "Sorting example",
          },
        ],
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