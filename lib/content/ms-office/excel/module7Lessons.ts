import { Lesson } from "@/types/lesson";

export const excelModule7Lessons: Lesson[] = [

/* ============================================================
LESSON 1 – DOING MORE WITH PIVOTTABLES
============================================================ */

{
  slug: "doing-more-with-pivottables",
  title: "Doing More with PivotTables",
  description:
    "Learn how to perform deeper analysis with PivotTables by filtering, grouping, and refreshing summarized data.",
  objectives: [
    "Add slicers and timelines as visual filters",
    "Group dates and numeric values into meaningful bands",
    "Change value calculations to show percentages and running totals",
    "Connect one slicer to several PivotTables",
  ],
  duration: "10 min",

  videoUrl: "https://www.youtube.com/embed/FVzX4I88DBs",

    practiceFiles: [
    {
    name: "Download Practice Workbook",
    url: "/practice/excel/module-7/advanced-pivotTables/Excel_MorePivotTables_Practice.xlsx",
    }
    ],

    sections: [

      {
         heading: "Making a PivotTable usable by someone else",
         blocks: [
           {
             type: "scenario",
             role: "You build the spending dashboard at Lakeside Medical Associates.",
             text: "The practice manager needs to look at one department at a time. Explaining the PivotTable field list means explaining Rows, Columns, Values, and Filters. Adding a slicer means saying 'click the department you want.'",
             task: "Add controls that let a non-Excel user explore the data without instruction.",
           },
           {
             type: "paragraph",
             text: "A slicer is a filter with buttons. It does exactly what the Filters area does, but visibly — and crucially, it shows the current filter state, so nobody misreads a filtered table as the full picture. That failure mode is common enough with the Filters dropdown to justify slicers on its own.",
           },
           {
             type: "paragraph",
             text: "A timeline is the equivalent for dates: a slider for choosing months, quarters, or years. Both can be connected to several PivotTables at once through Report Connections, so one click filters an entire dashboard consistently.",
           },
           {
             type: "tip",
             text: "Show Values As (right-click a value > Show Values As) reframes numbers without any formula work: % of Grand Total, % of Parent Row, Running Total, or Difference From the previous period. 'Medical supplies are 46% of spending' often lands better than the raw dollar figure.",
           },
           {
             type: "callout",
             variant: "info",
             text: "Right-click a date field and choose Group to band dates by month, quarter, or year; the same command bands numbers into ranges. This is how a thousand individual transaction dates become a readable twelve-row monthly summary.",
           },
         ],
       },

    {
    heading: "Filtering PivotTables",
    blocks: [
    {
    type: "paragraph",
    text:
    "PivotTables allow you to filter data to focus on specific information. You can filter by fields such as Salesperson, Region, or Month to quickly analyze subsets of your dataset."
    },
    {
    type: "paragraph",
    text:
    "To filter a PivotTable, drag a field such as Salesperson into the Filters area of the PivotTable Fields panel."
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_add_filter.png",
    alt: "Adding a field to the PivotTable filter area"
    }
    ]
    },

    {
    heading: "Filtering Multiple Items",
    blocks: [
    {
    type: "paragraph",
    text:
    "You can filter multiple values from a PivotTable field. Select the filter dropdown, enable Select Multiple Items, and choose the items you want to analyze."
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_multiple_items.png",
    alt: "Selecting multiple filter items in PivotTable"
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_uncheck.png",
    alt: "Unchecking filter options in PivotTable"
    }
    ]
    },

    {
    heading: "Using Slicers for Visual Filtering",
    blocks: [
    {
    type: "paragraph",
    text:
    "Slicers provide a visual way to filter PivotTable data. Instead of dropdown menus, slicers use clickable buttons that allow you to filter data quickly."
    },
    {
    type: "paragraph",
    text:
    "To insert a slicer, select the PivotTable and go to PivotTable Analyze → Insert Slicer."
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_add_slicer.png",
    alt: "Insert slicer button in Excel"
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_slicer_view.png",
    alt: "Slicer interface in Excel"
    }
    ]
    },

    {
    heading: "Filtering with Slicers",
    blocks: [
    {
    type: "paragraph",
    text:
    "You can click individual buttons in the slicer to filter the PivotTable instantly. Hold Ctrl to select multiple items."
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_slicer_select.png",
    alt: "Selecting slicer filters"
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_slicer_view_select_item.png",
    alt: "Filtering data with slicers"
    }
    ]
    },

    {
    heading: "Creating PivotCharts",
    blocks: [
    {
    type: "paragraph",
    text:
    "PivotCharts allow you to visualize PivotTable data in a chart format. When the PivotTable changes, the chart updates automatically."
    },
    {
    type: "paragraph",
    text:
    "Select the PivotTable and go to Insert → PivotChart."
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_insert_chart.png",
    alt: "Insert PivotChart menu"
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_create_pivotChart.png",
    alt: "PivotChart creation dialog"
    }
    ]
    },

    {
    heading: "Interacting with PivotCharts",
    blocks: [
    {
    type: "paragraph",
    text:
    "PivotCharts remain connected to their PivotTables. When filters or slicers change, the chart updates automatically."
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_pivotChart_appear.png",
    alt: "PivotChart appearing in Excel"
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_pivotChart_switch_view.png",
    alt: "PivotChart switching views"
    }
    ]
    },

    {
    heading: "Final Result",
    blocks: [
    {
    type: "paragraph",
    text:
    "After applying filters, slicers, and charts, you can quickly analyze patterns in your dataset. PivotTables and PivotCharts together provide powerful tools for summarizing and visualizing data."
    },
    {
    type: "image",
    src: "/images/excel/module-7/advanced-pivotTables/advanced_pivotTables_final_result.png",
    alt: "Final PivotTable and PivotChart result"
    }
    ]
    },

    {
    heading: "Knowledge Check",
    blocks: [
    {
      type: "knowledge-check",
      question: "What does a Slicer do in a PivotTable?",
      options: [
        "Splits the PivotTable into two separate tables",
        "Deletes rows that do not match a selected value",
        "Provides a visual, clickable filter to quickly narrow PivotTable results",
        "Converts PivotTable data into a regular cell range",
      ],
      correctIndex: 2,
      explanation: "A slicer is a visual filter: clickable buttons for each value in a field. Its advantage over the Filters dropdown is that the current filter state is always visible, so nobody mistakes a filtered table for the whole data set.",
      optionRationales: [
        "Slicers filter a PivotTable. They never split it into separate tables.",
        "Nothing is deleted. Slicers filter what is displayed, leaving the source data untouched.",
        "Correct. A slicer provides visible, clickable filter buttons, with the current selection always on screen.",
        "Converting a PivotTable to a range is a separate operation. A slicer only filters.",
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
        "Open the practice workbook.",
        "Create a PivotTable from the dataset.",
        "Add Salesperson to Filters.",
        "Filter the PivotTable to show only two salespeople.",
        "Insert a Slicer for Salesperson.",
        "Use the slicer to change which salespeople appear.",
        "Create a PivotChart to visualize the sales totals."
        ]
        },
    ],
},

/* ============================================================
LESSON 2 – WHAT-IF ANALYSIS
============================================================ */

{
    slug: "what-if-analysis",
    title: "What-If Analysis",
    description:
    "Learn how to experiment with data using Excel’s What-If Analysis tools. In this lesson you will use Goal Seek to determine unknown values, explore Scenario Manager, and understand how Data Tables allow you to test multiple possibilities at once.",
    objectives: [
      "Use Goal Seek to find the input needed for a target result",
      "Compare alternatives with Scenario Manager",
      "Use a Data Table to see results across many input values",
      "Explain what What-If tools can and cannot tell you",
    ],
    duration: "35 min",

    videoUrl: "https://www.youtube.com/embed/STTYxT6iFio",

    practiceFiles: [
    {
    name: "Download Practice Workbook",
    url: "/practice/excel/module-7/what-if-analysis/Excel_WhatIfAnalysis_Practice.xlsx"
    }
    ],

    sections: [

      {
         heading: "Working backwards from the answer you need",
         blocks: [
           {
             type: "scenario",
             role: "You plan next year's supply budget at Lakeside Medical Associates.",
             text: "The budget must come in at $85,000. Current projections say $92,400. The question is not what the total is — it is how much the per-visit supply cost would have to fall to reach the target. Guessing and re-checking is slow and imprecise.",
             task: "Let Excel solve for the input value that produces the result you need.",
           },
           {
             type: "paragraph",
             text: "Goal Seek (Data > What-If Analysis > Goal Seek) reverses a calculation. You name the formula cell, the result you want, and the input cell to vary. Excel adjusts that input until the formula produces the target. It answers 'what would this need to be?' rather than 'what is this?'",
           },
           {
             type: "table",
             caption: "The three What-If tools",
             columns: [
               "Tool",
               "Answers",
               "Varies",
             ],
             rows: [
               [
                 "Goal Seek",
                 "What input gives me this exact result?",
                 "One input",
               ],
               [
                 "Data Table",
                 "What happens across a range of inputs?",
                 "One or two inputs, many values",
               ],
               [
                 "Scenario Manager",
                 "How do named alternatives compare?",
                 "Several inputs, saved as named sets",
               ],
             ],
           },
           {
             type: "callout",
             variant: "warning",
             text: "Goal Seek finds the arithmetic answer, not the achievable one. It may report that the per-visit supply cost needs to fall 31%, which is a real number and possibly an impossible operational target. The tool tells you what the model requires; whether that is attainable is a judgment it cannot make. Always state the required change to a decision-maker rather than presenting it as a plan.",
           },
         ],
       },

    {
    heading: "Understanding What-If Analysis",
    blocks: [
    {
    type: "paragraph",
    text:
    "What-If Analysis is a powerful Excel feature that allows you to experiment with different values in formulas to see how the results change. Instead of manually changing numbers repeatedly, Excel can automatically calculate the impact of different inputs."
    },
    {
    type: "paragraph",
    text:
    "This is extremely useful in business, finance, and data analysis. For example, you may want to know how many units must be sold to reach a target revenue, what grade you need on a final exam to pass a class, or how many guests you can invite to an event while staying within a fixed budget."
    },
    {
    type: "paragraph",
    text:
    "Excel provides three primary What-If Analysis tools:"
    },
    {
    type: "list",
    ordered: false,
    items: [
    "Goal Seek – finds the required input value needed to reach a desired result.",
    "Scenario Manager – compares multiple sets of values for different scenarios.",
    "Data Tables – shows the results of formulas when one or two variables change."
    ]
    }
    ]
    },

    {
    heading: "Example: Calculating a Final Grade",
    blocks: [
    {
    type: "paragraph",
    text:
    "In this example, we want to determine the grade needed on a final exam to achieve a passing average in a course."
    },
    {
    type: "paragraph",
    text:
    "The worksheet contains grades for four assignments: Paper 1, Paper 2, Quiz, and Lab. The final exam grade has not yet been entered, but we already created a formula to calculate the overall average."
    },
    {
    type: "paragraph",
    text:
    "The formula used is:"
    },
    {
    type: "paragraph",
    text:
    "=AVERAGE(B2:B6)"
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_average_function.png",
    alt: "Average formula used to calculate final grade"
    },
    {
    type: "paragraph",
    text:
    "Because the final exam grade has not yet been entered, the calculated final grade currently shows 65."
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_average_result.png",
    alt: "Average formula result before using Goal Seek"
    }
    ]
    },

    {
    heading: "Opening Goal Seek",
    blocks: [
    {
    type: "paragraph",
    text:
    "Goal Seek allows Excel to calculate what value must be entered into a specific cell in order to produce a desired result."
    },
    {
    type: "paragraph",
    text:
    "To open Goal Seek:"
    },
    {
    type: "list",
    ordered: true,
    items: [
    "Click the Data tab on the Excel ribbon.",
    "Locate the Forecast or Data Tools section.",
    "Click What-If Analysis.",
    "Select Goal Seek from the dropdown menu."
    ]
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_goal_seek_command.png",
    alt: "Opening Goal Seek from the What If Analysis menu"
    }
    ]
    },

    {
    heading: "Using the Goal Seek Dialog Box",
    blocks: [
    {
    type: "paragraph",
    text:
    "When Goal Seek opens, a dialog box will appear with three input fields that define the calculation."
    },
    {
    type: "list",
    ordered: true,
    items: [
    "Set Cell – the cell containing the formula result you want to control.",
    "To Value – the target value you want the formula to equal.",
    "By Changing Cell – the input value Excel will modify to reach the target."
    ]
    },
    {
    type: "paragraph",
    text:
    "In our example we want the Final Grade to equal 70."
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_goal_seek_dialog.png",
    alt: "Goal Seek dialog box"
    },
    {
    type: "paragraph",
    text:
    "We set the dialog as follows:"
    },
    {
    type: "list",
    ordered: false,
    items: [
    "Set cell: B7 (Final Grade)",
    "To value: 70",
    "By changing cell: B6 (Final Exam)"
    ]
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_goal_seek_dialog_2.png",
    alt: "Goal Seek dialog example with values filled in"
    }
    ]
    },

    {
    heading: "Goal Seek Finds the Required Grade",
    blocks: [
    {
    type: "paragraph",
    text:
    "After clicking OK, Excel automatically adjusts the value in the Final Exam cell until the average grade becomes exactly 70."
    },
    {
    type: "paragraph",
    text:
    "A confirmation dialog appears indicating that Goal Seek successfully found a solution."
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_goal_seek.png",
    alt: "Goal Seek confirmation message"
    },
    {
    type: "paragraph",
    text:
    "In this case, Excel determines that a score of 90 is required on the final exam in order to reach the target average of 70."
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_goal_seek_result.png",
    alt: "Goal Seek calculated final exam score"
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_goal_seek_result_2.png",
    alt: "Final grade after Goal Seek"
    }
    ]
    },

    {
    heading: "Example 2: Event Budget Planning",
    blocks: [
    {
    type: "paragraph",
    text:
    "Goal Seek can also be used in financial and planning scenarios."
    },
    {
    type: "paragraph",
    text:
    "In this example, we are planning an event with a reservation fee and a cost per guest."
    },
    {
    type: "paragraph",
    text:
    "The formula used to calculate the total cost is:"
    },
    {
    type: "paragraph",
    text:
    "=B2 + B3 * B4"
    },
    {
    type: "paragraph",
    text:
    "This formula adds the fixed reservation fee and the variable cost per guest."
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_example_2.png",
    alt: "Event budget example worksheet"
    },
    {
    type: "paragraph",
    text:
    "We want to determine how many guests we can invite while keeping the total cost under $500."
    },
    {
    type: "paragraph",
    text:
    "Using Goal Seek, we set:"
    },
    {
    type: "list",
    ordered: false,
    items: [
    "Set Cell: B5 (Total Budget)",
    "To Value: 500",
    "By Changing Cell: B4 (Number of Guests)"
    ]
    },
    {
    type: "paragraph",
    text:
    "Excel calculates that approximately 18.62 guests can be invited."
    },
    {
    type: "paragraph",
    text:
    "Since the number of guests must be a whole number, the value must be rounded down to 18 guests to stay within budget."
    },

    ]
    },

    {
    heading: "Scenario Manager",
    blocks: [
    {
    type: "paragraph",
    text:
    "Scenario Manager allows you to compare different possible situations by storing multiple sets of values."
    },
    {
    type: "paragraph",
    text:
    "For example, you might compare different venues for an event, each with a different reservation fee and price per guest."
    },
    {
    type: "paragraph",
    text:
    "Each scenario stores a different combination of input values that can be applied to the worksheet instantly."
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_scenarios.png",
    alt: "Scenario manager example"
    }
    ]
    },

    {
    heading: "Using Data Tables",
    blocks: [
    {
    type: "paragraph",
    text:
    "Data Tables allow you to evaluate formulas using many different input values at the same time."
    },
    {
    type: "paragraph",
    text:
    "In the example below, Excel calculates loan payments for multiple combinations of interest rates and loan terms."
    },
    {
    type: "paragraph",
    text:
    "This allows analysts to quickly see how different financial conditions impact the payment amount."
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_data_tables.png",
    alt: "Excel data table example"
    }
    ]
    },

    {
    heading: "Knowledge Check",
    blocks: [
    {
      type: "knowledge-check",
      question: "Which What-If Analysis tool finds the input value needed to reach a specific result?",
      options: [
        "Scenario Manager",
        "Data Tables",
        "Solver",
        "Goal Seek",
      ],
      correctIndex: 3,
      explanation: "Goal Seek works backwards from a target: you specify the result you want and which input may change, and Excel finds the input value that produces it.",
      optionRationales: [
        "Scenario Manager compares named sets of input values. It shows how alternatives differ rather than solving for a target.",
        "A Data Table shows results across a range of input values in a grid. It surveys outcomes rather than finding one specific input.",
        "Solver handles complex problems with multiple variables and constraints. It is the heavier tool; Goal Seek is the right one for a single input and a single target.",
        "Correct. Goal Seek finds the input value needed to reach a specified result.",
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
    "Download and open the practice workbook.",
    "Navigate to the Challenge worksheet.",
    "Create a formula that calculates the average sales for cells B2 through B7.",
    "Use Goal Seek to determine how much must be sold in June to reach a $200,000 mid-year average.",
    "Verify that the result updates the average correctly."
    ],
    },
    {
    type: "image",
    src: "/images/excel/module-7/what-if-analysis/what-if-analysis_final_result.png",
    alt: "Goal Seek result showing number of guests"
    },
    ]
},

/* ============================================================
LESSON 3 – REFERENCE STYLES
============================================================ */

{
    slug: "reference-styles",
    title: "What are Reference Styles?",
    description:
    "Learn the difference between A1 and R1C1 reference styles in Excel and how to switch between them using the Excel Options menu.",
    objectives: [
      "Explain the difference between A1 and R1C1 reference styles",
      "Switch between reference styles in Excel Options",
      "Read an R1C1 formula and recognize relative offsets",
      "Recognize when R1C1 is genuinely useful",
    ],
    duration: "10 min",

    sections: [

      {
         heading: "The same cell, described two ways",
         blocks: [
           {
             type: "scenario",
             role: "You audit an inherited workbook at Lakeside Medical Associates.",
             text: "You open a colleague's file and the column headers are numbers instead of letters. Formulas read =RC[-1]*R1C6. Nothing is broken — the workbook is simply using the other reference style, and R1C1 is not something most people ever see.",
             task: "Recognize R1C1 notation, know how to switch it off, and understand why it exists.",
           },
           {
             type: "paragraph",
             text: "A1 style names a cell by column letter and row number. R1C1 style names it by row and column number, so row 3 column 2 is R3C2 — the same cell A1 style calls B3. Both describe an identical grid; only the notation differs.",
           },
           {
             type: "paragraph",
             text: "R1C1's real utility is that it makes relative references explicit. In R1C1, brackets mean an offset from the current cell: RC[-1] is 'the cell one column to my left,' whatever row it is in. Copy that formula anywhere and it still reads RC[-1] — which makes it obvious that every cell in a column holds the same logic, something A1 style hides behind changing addresses.",
           },
           {
             type: "tip",
             text: "To switch, go to File > Options > Formulas and check or uncheck 'R1C1 reference style.' It is a per-application setting rather than a property of the file, so a workbook that looks wrong to you looks normal to whoever created it.",
           },
         ],
       },

    {
    heading: "Understanding Reference Styles",
    blocks: [
    {
    type: "paragraph",
    text:
    "Every Excel spreadsheet is organized into rows and columns. Rows are identified by numbers (1, 2, 3, etc.), while columns are typically identified by letters (A, B, C, etc.). This common labeling system is known as the A1 reference style."
    },
    {
    type: "paragraph",
    text:
    "In the A1 reference style, the column letter appears first and the row number appears second. For example, the cell located in column A and row 1 is called A1."
    },
    {
    type: "paragraph",
    text:
    "Excel also supports an alternative reference format called R1C1 reference style. In this format, both rows and columns are identified by numbers. The letter R represents the row number, while C represents the column number."
    },
    {
    type: "paragraph",
    text:
    "For example, the cell that would normally be called A1 becomes R1C1 when using this reference system."
    }
    ]
    },

    {
    heading: "A1 vs R1C1 Reference Styles",
    blocks: [
    {
    type: "paragraph",
    text:
    "The A1 reference style is the default format used in Excel and is the style most people are familiar with. However, some advanced users prefer the R1C1 reference style when working with complex formulas because it makes relative references easier to understand in certain situations."
    },
    {
    type: "paragraph",
    text:
    "The image below shows the difference between the two reference styles."
    },
    {
    type: "image",
    src: "/images/excel/module-7/reference-styles/reference-styles_example.png",
    alt: "Comparison of R1C1 reference style and A1 reference style"
    },
    {
    type: "paragraph",
    text:
    "In the image on the left, the column headers are numbered instead of labeled with letters. This indicates that the worksheet is using the R1C1 reference style."
    },
    {
    type: "paragraph",
    text:
    "In the image on the right, the columns are labeled with letters such as A, B, and C. This is the standard A1 reference style that Excel uses by default."
    },
    {
    type: "paragraph",
    text:
    "In most situations you will want to use the A1 reference style because it is easier to read and matches the way Excel tutorials and documentation describe cell references."
    }
    ]
    },

    {
    heading: "Accessing Excel Options",
    blocks: [
    {
    type: "paragraph",
    text:
    "If your spreadsheet is currently using the R1C1 reference style, you can switch back to the standard A1 style using Excel Options."
    },
    {
    type: "paragraph",
    text:
    "To access the Excel Options menu, begin by clicking the File tab located in the top-left corner of the Excel window."
    },
    {
    type: "image",
    src: "/images/excel/module-7/reference-styles/reference-styles_file_tab.png",
    alt: "Click the File tab in Excel"
    },
    {
    type: "paragraph",
    text:
    "Clicking the File tab will open the Backstage view. This screen contains several options for managing your workbook, including saving, printing, exporting, and accessing account settings."
    },
    {
    type: "image",
    src: "/images/excel/module-7/reference-styles/reference-styles_backstage_options.png",
    alt: "Backstage view options menu"
    },
    {
    type: "paragraph",
    text:
    "At the bottom of the Backstage view menu, click Options. This will open the Excel Options dialog box where you can customize many settings related to formulas, calculations, and interface preferences."
    }
    ]
    },

    {
    heading: "Turning Off R1C1 Reference Style",
    blocks: [
    {
    type: "paragraph",
    text:
    "Once the Excel Options dialog box appears, select the Formulas category from the list on the left side of the window."
    },
    {
    type: "image",
    src: "/images/excel/module-7/reference-styles/reference-styles_excel_options_formulas.png",
    alt: "Excel Options formulas settings"
    },
    {
    type: "paragraph",
    text:
    "Inside the Formulas section, you will see an option labeled R1C1 reference style."
    },
    {
    type: "paragraph",
    text:
    "If this box is checked, Excel will display columns as numbers instead of letters. To switch back to the standard reference style, simply uncheck the R1C1 reference style box."
    },
    {
    type: "paragraph",
    text:
    "After unchecking the box, click OK. Excel will immediately return to the standard A1 reference style."
    },
    {
    type: "paragraph",
    text:
    "You will now see column letters again at the top of the worksheet, such as A, B, C, and D, instead of numbers."
    }
    ]
    },

    {
    heading: "Knowledge Check",
    blocks: [
    {
      type: "knowledge-check",
      question: "In R1C1 reference style, how is the cell in row 3, column 2 identified?",
      options: [
        "B3",
        "C2R3",
        "R3C2",
        "3B",
      ],
      correctIndex: 2,
      explanation: "R1C1 style names the row first and the column second, so row 3 column 2 is R3C2 — the cell that A1 style calls B3.",
      optionRationales: [
        "B3 is the A1-style name for the same cell. The question asks for the R1C1 form.",
        "This reverses the order. R1C1 style always puts the row before the column, which is what the name itself indicates.",
        "Correct. R3C2 means row 3, column 2.",
        "This mixes the two notations and is not valid in either style.",
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
    "Open Excel and create a new blank workbook.",
    "Navigate to the File tab and open Excel Options.",
    "Click the Formulas category.",
    "Locate the R1C1 reference style checkbox.",
    "Toggle the checkbox on and off to observe how the column labels change.",
    "Return the setting to the standard A1 reference style."
    ]
    }
    ]
},

];