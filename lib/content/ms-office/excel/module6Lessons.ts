import { Lesson } from "@/types/lesson";

export const excelModule6Lessons: Lesson[] = [

  // ============================================================
  // LESSON 1 – INTRODUCTION TO TABLES
  // ============================================================

{
  slug: "working-with-tables",
  title: "Working with Tables",
  description:
    "Learn how to convert datasets into Excel tables, apply styles, add rows automatically, and manage structured data more efficiently.",
  duration: "12 min",

  videoUrl: "https://www.youtube.com/embed/iroIA8_3soo",

  practiceFiles: [
    {
      name: "Download Practice Workbook",
      url: "/practice/excel/module-6/tables/Excel_Tables_Practice.xlsx",
    },
  ],

  sections: [

    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------

    {
      heading: "Why Tables Matter",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel tables transform ordinary cell ranges into structured datasets. Once data is converted into a table, Excel automatically enables sorting, filtering, and consistent formatting.",
        },
        {
          type: "paragraph",
          text:
            "Tables are widely used in financial reports, inventory lists, employee records, and sales tracking because they keep large datasets organized.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_cells.png",
          alt: "Dataset before converting to table",
        },
      ],
    },

    // ------------------------------------------------------------
    // FORMAT AS TABLE
    // ------------------------------------------------------------

    {
      heading: "Formatting Data as a Table",
      blocks: [
        {
          type: "paragraph",
          text:
            "To create a table, first select any cell inside your dataset. Excel will automatically detect the surrounding data range.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_cells.png",
          alt: "Selecting a cell within dataset",
        },
        {
          type: "paragraph",
          text:
            "Next, go to the Home tab and click Format as Table.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_format_as_table.png",
          alt: "Format as Table command",
        },
        {
          type: "paragraph",
          text:
            "Choose one of the available table styles from the gallery.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_select_table_style.png",
          alt: "Selecting a table style",
        },
      ],
    },

    // ------------------------------------------------------------
    // CREATE TABLE DIALOG
    // ------------------------------------------------------------

    {
      heading: "Confirm the Table Range",
      blocks: [
        {
          type: "paragraph",
          text:
            "After selecting a table style, Excel displays the Create Table dialog box where you confirm the selected range.",
        },
        {
          type: "paragraph",
          text:
            "If your dataset contains column headers, make sure the My Table Has Headers option is checked.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_dialog.png",
          alt: "Create Table dialog box",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_headers.png",
          alt: "Table headers enabled",
        },
      ],
    },

    // ------------------------------------------------------------
    // TABLE STYLE RESULT
    // ------------------------------------------------------------

    {
      heading: "Table Style Applied",
      blocks: [
        {
          type: "paragraph",
          text:
            "After confirming the dialog box, Excel converts the dataset into a formatted table.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_table_style_selected.png",
          alt: "Dataset formatted as a table",
        },
        {
          type: "paragraph",
          text:
            "Table styles include alternating row colors, filter dropdowns, and consistent formatting across the dataset.",
        },
      ],
    },

    // ------------------------------------------------------------
    // TABLE DESIGN TAB
    // ------------------------------------------------------------

    {
      heading: "Using the Table Design Tab",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once a table is created, Excel adds a Table Design tab to the ribbon. This tab contains tools for customizing the table.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_design_tab.png",
          alt: "Table Design tab",
        },
        {
          type: "paragraph",
          text:
            "You can use the Table Styles section to quickly apply a new visual style.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_design_tab_style.png",
          alt: "Table styles inside design tab",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_more.png",
          alt: "More table styles menu",
        },
      ],
    },

    // ------------------------------------------------------------
    // ADDING ROWS
    // ------------------------------------------------------------

    {
      heading: "Adding New Rows",
      blocks: [
        {
          type: "paragraph",
          text:
            "One powerful feature of Excel tables is automatic expansion. When you add new rows directly below the table, Excel automatically includes them in the table structure.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_new_row.png",
          alt: "Adding new row to table",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_new_rows_columns.png",
          alt: "Table expanding with new rows",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_new_content.png",
          alt: "New data added to table",
        },
      ],
    },

    // ------------------------------------------------------------
    // DELETE ROW
    // ------------------------------------------------------------

    {
      heading: "Deleting Rows from a Table",
      blocks: [
        {
          type: "paragraph",
          text:
            "Rows inside a table can be deleted just like normal rows. Excel automatically adjusts the table size after deletion.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_deleted_row.png",
          alt: "Row deleted from table",
        },
      ],
    },

    // ------------------------------------------------------------
    // CONVERT TO RANGE
    // ------------------------------------------------------------

    {
      heading: "Convert Table Back to a Range",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you no longer need table functionality, you can convert the table back to a standard cell range.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_convert_to_range.png",
          alt: "Convert table to range command",
        },
        {
          type: "image",
          src: "/images/excel/module-6/tables/tables_clear.png",
          alt: "Table formatting removed",
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text:
        "Download the practice workbook and complete the following steps:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Open the Challenge worksheet.",
        "Select the entire dataset.",
        "Format the data as a table using a Medium style.",
        "Add a new row at the bottom of the table.",
        "Enter sample data for the new row.",
        "Delete one row from the table.",
        "Change the table style using the Table Design tab.",
        "When finished, your table should look similar to the example below.",
      ],
    },
    {
      type: "image",
      src: "/images/excel/module-6/tables/tables_final_result.png",
      alt: "Completed Excel table example",
      caption:
        "Final result after formatting the dataset as a table and modifying rows.",
    },
  ],
},

  // ============================================================
  // LESSON 2 – CREATING CHARTS
  // ============================================================

  {
    slug: "creating-charts",
    title: "Creating Charts",
    description:
      "Learn how to visualize data using Excel charts such as column charts, line charts, and pie charts.",
    duration: "14 min",

    sections: [
      {
        heading: "Why Charts Matter",
        blocks: [
          {
            type: "paragraph",
            text:
              "Charts transform raw numbers into visual insights. Instead of scanning rows of data, charts allow you to quickly identify patterns, comparisons, and trends.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text:
          "Create a chart that visualizes sales data from your worksheet.",
      },
    ],
  },


  // ============================================================
  // LESSON 3 – INTRODUCTION TO PIVOT TABLES
  // ============================================================

  {
    slug: "pivot-tables-introduction",
    title: "Introduction to PivotTables",
    description:
      "Learn how PivotTables summarize large datasets and allow you to analyze information dynamically.",
    duration: "16 min",

    sections: [
      {
        heading: "What is a PivotTable?",
        blocks: [
          {
            type: "paragraph",
            text:
              "A PivotTable summarizes large datasets by grouping and aggregating values such as totals, counts, and averages.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text:
          "Create a PivotTable that summarizes totals by category.",
      },
    ],
  },

];