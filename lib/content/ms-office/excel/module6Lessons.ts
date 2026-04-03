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

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is one advantage of converting a data range to an Excel Table?",
          options: [
            "The table locks cells so no one can edit them",
            "New rows added at the bottom are automatically included in the table",
            "Formulas are converted to plain text for safety",
            "The table removes duplicate values automatically",
          ],
          correctIndex: 1,
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
  slug: "charts",
  title: "Creating Charts in Excel",
  description:
    "Learn how to visualize data in Excel using charts. Charts help transform raw numbers into visual insights that make trends, comparisons, and patterns easier to understand.",
  duration: "30 min",

  videoUrl: "https://www.youtube.com/embed/_Wu7jYTr1Pk",

  // OPTIONAL: if your Lesson type supports multiple videos, keep this.
  // If it doesn't, remove it.
  // videoUrl2: "https://www.youtube.com/embed/a1osBWySSvk",

  practiceFiles: [
    {
      name: "Download Practice Workbook",
      url: "/practice/excel/module-6/charts/Excel_Charts_Practice.xlsx",
    },
  ],

  sections: [
    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------
    {
      heading: "Why Charts Matter",
      blocks: [
        {
          type: "paragraph",
          text:
            "Charts turn raw numbers into something your brain can understand in two seconds. They help you spot trends, compare categories, and present data clearly in reports.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_final_result.png",
          alt: "Final chart example",
          caption:
            "A finished chart should clearly communicate the story your data is telling.",
        },
      ],
    },

    // ------------------------------------------------------------
    // COMMON CHART TYPES
    // ------------------------------------------------------------
    {
      heading: "Common Chart Types",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel offers many chart types. The key is choosing the one that matches your goal: compare categories, show change over time, or show parts of a whole.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_type_1.png",
          alt: "Types of charts overview",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_type_2.png",
          alt: "Column chart example",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_type_3.png",
          alt: "Line chart example",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_type_4.png",
          alt: "Pie chart example",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_type_5.png",
          alt: "Bar chart example",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_type_6.png",
          alt: "Area chart example",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_type_7b.png",
          alt: "Surface chart example",
        },
      ],
    },

    // ------------------------------------------------------------
    // STEP 1 – SELECT DATA
    // ------------------------------------------------------------
    {
      heading: "Step 1: Select Your Data",
      blocks: [
        {
          type: "paragraph",
          text:
            "Before inserting a chart, select the full range of data you want Excel to chart, including headings. Excel uses headings for the legend and axis labels.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_selected_cells.png",
          alt: "Selecting data before creating a chart",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_data_range.png",
          alt: "Highlighted data range used for chart",
        },
      ],
    },

    // ------------------------------------------------------------
    // STEP 2 – INSERT CHART
    // ------------------------------------------------------------
    {
      heading: "Step 2: Insert a Chart",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Insert tab. You can use Recommended Charts to let Excel suggest the best chart, or pick a chart type directly from the Charts group.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_recommended_charts.png",
          alt: "Recommended Charts button on the ribbon",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_inserted_chart.png",
          alt: "Chart inserted into the worksheet",
        },
      ],
    },

    // ------------------------------------------------------------
    // QUICK LAYOUTS
    // ------------------------------------------------------------
    {
      heading: "Quick Layout",
      blocks: [
        {
          type: "paragraph",
          text:
            "Quick Layout is the fastest way to make a chart look presentable. It adds titles, labels, and legend arrangements with one click.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_quick_layout.png",
          alt: "Quick Layout menu",
        },
      ],
    },

    // ------------------------------------------------------------
    // ADD CHART ELEMENTS
    // ------------------------------------------------------------
    {
      heading: "Add Chart Title and Elements",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the green + button (Chart Elements) to add a Chart Title, Axis Titles, Data Labels, and more.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_chart_element.png",
          alt: "Chart Elements button shown next to chart",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_add_elements.jpeg",
          alt: "Add Chart Element menu",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_chart_title.png",
          alt: "Adding a chart title",
        },
      ],
    },

    // ------------------------------------------------------------
    // CHANGE CHART TYPE
    // ------------------------------------------------------------
    {
      heading: "Change Chart Type",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you pick the wrong chart type, no problem. Select the chart → Chart Design → Change Chart Type.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_change_type.png",
          alt: "Change Chart Type command",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_chart_type.png",
          alt: "Change Chart Type dialog",
        },
      ],
    },

    // ------------------------------------------------------------
    // SWITCH ROW/COLUMN
    // ------------------------------------------------------------
    {
      heading: "Switch Row/Column",
      blocks: [
        {
          type: "paragraph",
          text:
            "If your chart looks backwards (wrong categories/series), use Switch Row/Column to flip how Excel reads the data.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_switch_row_column_command.png",
          alt: "Switch Row/Column command",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_switched_row_column.png",
          alt: "Chart after switching rows and columns",
        },
      ],
    },

    // ------------------------------------------------------------
    // MOVE CHART
    // ------------------------------------------------------------
    {
      heading: "Move Chart to a New Sheet",
      blocks: [
        {
          type: "paragraph",
          text:
            "To make charts cleaner and easier to present, move them onto their own chart sheet: Chart Design → Move Chart.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_move_chart.png",
          alt: "Move Chart command",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_choose_move.png",
          alt: "Move Chart dialog box",
        },
        {
          type: "image",
          src: "/images/excel/module-6/charts/chart_moved_chart.png",
          alt: "Chart on its own sheet",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which chart type is best for showing how individual parts make up a whole?",
          options: [
            "Bar chart",
            "Line chart",
            "Pie chart",
            "Area chart",
          ],
          correctIndex: 2,
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text:
        "Download and open the practice workbook. Complete the following:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Select the full dataset (including headings).",
        "Insert a Column chart using Recommended Charts.",
        "Add a Chart Title: Book Sales.",
        "Use Quick Layout to add labels/titles if needed.",
        "Change the chart type to Line.",
        "Use Switch Row/Column to compare how the data changes.",
        "Move the final chart to a new chart sheet named Chart1.",
      ],
    },
    {
      type: "image",
      src: "/images/excel/module-6/charts/chart_final_result.png",
      alt: "Final chart challenge result",
      caption:
        "Goal: clean chart with a proper title and a readable layout.",
    },
  ],
},
// ============================================================
// LESSON 3 – INTRO TO PIVOT TABLES
// ============================================================

{
  slug: "pivot-tables",
  title: "Introduction to PivotTables",
  description:
    "PivotTables allow you to summarize large datasets instantly and reorganize your data to answer questions quickly.",
  videoUrl: "https://www.youtube.com/embed/N4K3xjM76kI",
  duration: "35 min",

  practiceFiles: [
    {
      name: "Download Practice Workbook",
      url: "/practice/excel/module-6/pivotTables/Excel_IntroPivotTables_Practice.xlsx",
    },
  ],

  sections: [

    {
      heading: "Why PivotTables Are Powerful",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a worksheet contains many rows of data, calculating totals manually becomes difficult. PivotTables automatically summarize and analyze large datasets.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_example.png",
          alt: "Dataset used to create a PivotTable",
        },
      ],
    },

    {
      heading: "Step 1: Select Your Data",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select the entire dataset including the column headers. These headers will become the fields used in the PivotTable.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_create.png",
          alt: "Selecting dataset before creating PivotTable",
        },
      ],
    },

    {
      heading: "Step 2: Insert the PivotTable",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Insert tab and click PivotTable.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_ribbon_command.png",
          alt: "PivotTable command in Excel ribbon",
        },
        {
          type: "paragraph",
          text:
            "Excel will open the Create PivotTable dialog box.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_dialog_box.png",
          alt: "Create PivotTable dialog box",
        },
      ],
    },

    {
      heading: "Step 3: Understanding the PivotTable Fields Panel",
      blocks: [
        {
          type: "paragraph",
          text:
            "A blank PivotTable and the PivotTable Fields panel will appear in a new worksheet.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_field_list.png",
          alt: "PivotTable fields panel",
        },
      ],
    },

    {
      heading: "Step 4: Add Fields to Build the PivotTable",
      blocks: [
        {
          type: "paragraph",
          text:
            "To calculate total sales by salesperson:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Add Salesperson to the Rows area",
            "Add Order Amount to the Values area"
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_add_fields.png",
          alt: "Adding fields to PivotTable",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_summarized.png",
          alt: "PivotTable summarizing sales by salesperson",
        },
      ],
    },

    {
      heading: "Adding Columns to Analyze More Data",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can analyze the data further by dragging the Month field into the Columns area.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_add_column.png",
          alt: "Adding month to PivotTable columns",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_multiple_columns.png",
          alt: "PivotTable showing monthly totals",
        },
      ],
    },

    {
      heading: "Changing the PivotTable Perspective",
      blocks: [
        {
          type: "paragraph",
          text:
            "PivotTables allow you to reorganize (pivot) the data to answer different questions.",
        },
        {
          type: "paragraph",
          text:
            "For example, remove Salesperson and instead add Region to see total sales by region.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_newField_region.png",
          alt: "Adding Region field",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_sold_by_each_region.png",
          alt: "Sales totals by region",
        },
      ],
    },

    {
      heading: "Sorting and Filtering",
      blocks: [
        {
          type: "paragraph",
          text:
            "PivotTables allow sorting and filtering so you can analyze your data more easily.",
        },
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_sort_filter.png",
          alt: "Sorting PivotTable data",
        },
      ],
    },

    {
      heading: "Final PivotTable Example",
      blocks: [
        {
          type: "image",
          src: "/images/excel/module-6/pivotTables/pivotTable_done_example.png",
          alt: "Completed PivotTable example",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does a PivotTable allow you to do?",
          options: [
            "Create a chart from a selected cell range",
            "Apply conditional formatting across the entire workbook",
            "Summarize and reorganize large datasets without changing the original data",
            "Automatically correct formulas that return errors",
          ],
          correctIndex: 2,
        },
      ],
    },

  ],

challenge: [
  {
    type: "list",
    ordered: true,
    items: [
      "Open our practice workbook.",
      "Create a PivotTable in a separate sheet.",
      "We want to answer the question What is the total amount sold in each region? To do this, select Region and Order Amount."
    ]
  },

  {
    type: "image",
    src: "/images/excel/module-6/pivotTables/pivotTable_challenge_example.png",
    alt: "PivotTable showing total amount sold by region"
  },

  {
    type: "list",
    ordered: true,
    start: 4,
    items: [
      "In the Rows area, remove Region and replace it with Salesperson.",
      "Add Month to the Columns area.",
      "Change the number format of cells B5:E13 to Currency. Note: You might have to make columns C and D wider to see the values."
    ]
  },

  {
    type: "paragraph",
    text: "When you're finished, your workbook should look like this:"
  },

  {
    type: "image",
    src: "/images/excel/module-6/pivotTables/pivotTable_final_result.png",
    alt: "Completed PivotTable showing sales by salesperson and month"
  }

  ],

},

];