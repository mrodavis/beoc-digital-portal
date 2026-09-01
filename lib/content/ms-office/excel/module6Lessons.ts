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
  objectives: [
    "Convert a range to an Excel Table and explain what changes",
    "Use structured references in formulas",
    "Add a total row that respects filtering",
    "Judge when a Table helps and when a plain range is fine",
  ],
  duration: "12 min",

  videoUrl: "https://www.youtube.com/embed/iroIA8_3soo",

  practiceFiles: [
    {
      name: "Download Practice Workbook",
      url: "/practice/excel/module-6/tables/Excel_Tables_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "A Table knows where its data ends",
       blocks: [
         {
           type: "scenario",
           role: "You maintain the supply tracker at Lakeside Medical Associates.",
           text: "Your chart and PivotTable are built on A1:F200. Twelve new rows are added at row 201. The chart does not include them, the PivotTable does not include them, and both look completely normal. Nobody notices for a month.",
           task: "Use a Table so the range grows with the data and everything built on it follows.",
         },
         {
           type: "paragraph",
           text: "Insert > Table converts a range into a named object that tracks its own extent. Type into the row below and the Table absorbs it — and so does every chart, PivotTable, and formula referencing the Table. This is the single feature that prevents the silent staleness above.",
         },
         {
           type: "paragraph",
           text: "Tables also change how formulas read. =SUM(Orders[Cost]) says what it means, where =SUM(E2:E200) requires you to go and look. Structured references make formulas self-documenting, and they cannot drift out of alignment with the data the way fixed ranges do.",
         },
         {
           type: "table",
           caption: "What converting to a Table gives you",
           columns: [
             "Feature",
             "Effect",
           ],
           rows: [
             [
               "Auto-expanding range",
               "New rows and columns are included automatically everywhere",
             ],
             [
               "Structured references",
               "=SUM(Orders[Cost]) instead of =SUM(E2:E200)",
             ],
             [
               "Filter buttons",
               "Added to every header automatically",
             ],
             [
               "Total row",
               "Uses SUBTOTAL, so it respects filtering",
             ],
             [
               "Banded rows",
               "Readability that survives sorting and inserting",
             ],
             [
               "Formula fill",
               "A formula entered in one cell fills the whole column",
             ],
           ],
         },
         {
           type: "tip",
           text: "Name the Table as soon as you create it — Table Design > Table Name. 'Orders' reads far better in formulas than 'Table1', and in a workbook with several tables the default names become impossible to keep straight.",
         },
       ],
     },

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
          explanation: "A Table tracks its own extent, so rows added at the bottom are absorbed automatically — and every chart, PivotTable, and formula referencing the Table picks them up without being updated.",
          optionRationales: [
            "Tables do not lock cells. Protection is a separate feature on the Review tab.",
            "Correct. The Table expands to include new rows, and everything referencing it follows.",
            "Formulas stay formulas. Tables actually make formulas more readable through structured references.",
            "Removing duplicates is a separate command on the Data tab. Converting to a Table does not alter your data.",
          ],
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
  objectives: [
    "Choose a chart type that matches the question the data answers",
    "Create and format a chart with clear titles and labels",
    "Explain how axis choices can mislead a reader",
    "Decide when a table communicates better than a chart",
  ],
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

    {
       heading: "The chart type is a claim about the data",
       blocks: [
         {
           type: "scenario",
           role: "You present supply spending to the board at Lakeside Medical Associates.",
           text: "You build a pie chart with eleven slices to show spending by category. Four slices are under 3% and their labels overlap into an unreadable tangle. A board member asks which of two similar slices is larger, and nobody can tell by looking.",
           task: "Match the chart to the question, and recognize when a table would serve better.",
         },
         {
           type: "paragraph",
           text: "Human perception judges length far more accurately than angle or area. That single fact explains most chart guidance: bar and column charts are read accurately, pie charts poorly. A pie chart works only for parts of one whole, with few enough slices that the comparison is obvious — five or fewer is the usual advice.",
         },
         {
           type: "table",
           caption: "Choosing a chart type",
           columns: [
             "The question",
             "Chart",
             "Why",
           ],
           rows: [
             [
               "How did this change over time?",
               "Line",
               "A continuous line is read as continuity",
             ],
             [
               "How do these categories compare?",
               "Column or bar",
               "Length is judged accurately",
             ],
             [
               "What share is each part of the whole?",
               "Pie",
               "Only for parts of one whole, five or fewer slices",
             ],
             [
               "Are these two measures related?",
               "Scatter",
               "Shows the relationship directly",
             ],
             [
               "How does this distribute?",
               "Histogram",
               "Shows shape and spread",
             ],
             [
               "Exact values matter more than shape",
               "A table",
               "Charts show patterns; tables give precision",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "On a column or bar chart, always start the value axis at zero. Readers compare bar lengths, so truncating the axis makes a 3% difference look like a doubling. Excel sometimes chooses a non-zero start automatically, which means a misleading chart can be produced entirely by accident — check the axis before you present it.",
         },
         {
           type: "tip",
           text: "Title the chart with the finding, not the subject. 'Medical supply spending rose 18% in Q3' does the interpretive work for the reader. 'Supply Spending by Quarter' leaves them to work it out, and some will reach the wrong conclusion.",
         },
       ],
     },
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
          explanation: "A pie chart shows parts of a single whole. Keep it to five or fewer slices — beyond that, differences in angle become hard to judge and a bar chart communicates far better.",
          optionRationales: [
            "Bar charts compare values across categories, which readers judge accurately — but the bars do not inherently represent shares of a whole.",
            "Line charts show change over a continuous variable, usually time.",
            "Correct. Pie charts show each category's share of a single total.",
            "Area charts show change over time with the area filled beneath. They emphasize magnitude over time rather than composition at a moment.",
          ],
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
  objectives: [
    "Build a PivotTable from a clean data range",
    "Arrange fields across Rows, Columns, Values, and Filters",
    "Change how values are summarized",
    "Refresh a PivotTable when the source data changes",
  ],
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
       heading: "Answering four questions in three minutes",
       blocks: [
         {
           type: "scenario",
           role: "You are asked for a spending breakdown at Lakeside Medical Associates.",
           text: "Your supervisor asks: what did we spend per department last month, what are the top categories, which vendors got the most, and how does May compare with April? Answered with formulas and manual summary tables, that is most of an afternoon. Answered with one PivotTable, it is about three minutes.",
           task: "Learn to summarize a large data set by rearranging fields rather than writing formulas.",
         },
         {
           type: "paragraph",
           text: "A PivotTable summarizes a data set by whatever fields you drag into it, without altering the source in any way. Drag Department to Rows and Amount to Values and you have spending per department. Drag Month to Columns as well and you have a full cross-tab. Each rearrangement is a new question answered, and the underlying data is never touched.",
         },
         {
           type: "table",
           caption: "The four areas",
           columns: [
             "Area",
             "Field goes here to",
             "Example",
           ],
           rows: [
             [
               "Rows",
               "Become the row labels",
               "Department, one per row",
             ],
             [
               "Columns",
               "Become the column headings",
               "Month, one per column",
             ],
             [
               "Values",
               "Be summarized — summed, counted, averaged",
               "Amount, summed",
             ],
             [
               "Filters",
               "Filter the whole table",
               "Year, to show one year at a time",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "PivotTables do not update automatically when the source data changes. You must click Refresh on the PivotTable Analyze tab, and forgetting is one of the most common ways a stale figure reaches a report. Building the PivotTable on an Excel Table rather than a fixed range at least ensures new rows are included when you do refresh.",
         },
         {
           type: "tip",
           text: "If Excel summarizes a numeric column with Count instead of Sum, that column contains text somewhere — often a stray note or a number stored as text. The PivotTable is telling you about a data quality problem worth fixing at the source.",
         },
       ],
     },

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
          explanation: "A PivotTable summarizes and reorganizes a large data set — totalling, counting, and cross-tabulating by whatever fields you choose — without altering the source data at all. Rearranging fields answers a new question in seconds.",
          optionRationales: [
            "Charts are created from Insert > Chart. A PivotChart can be built on a PivotTable, but summarizing is what the PivotTable itself does.",
            "Conditional Formatting is a separate feature and works on ranges rather than being a PivotTable function.",
            "Correct. It summarizes and reorganizes large data sets while leaving the source data untouched.",
            "PivotTables do not repair formulas. Error checking is under the Formulas tab.",
          ],
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