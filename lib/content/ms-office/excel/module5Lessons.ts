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
    "Learn how to filter lists and tables to show only the records you need. Use checkbox filters, search, text/number/date filters, and clear filters confidently.",
  duration: "14 min",

  videoUrl: "https://www.youtube.com/embed/_OdsZR_rL1U",

  sections: [

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