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
    }

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
    }

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
    "Learn the difference between A1 and R1C1 reference styles and how Excel uses cell references in formulas.",
  duration: "2 min",

  videoUrl: "https://www.youtube.com/embed/IkH9k0cQJ2Y",

  sections: [

    {
      heading: "A1 Reference Style",
      blocks: [
        {
          type: "paragraph",
          text:
            "The A1 reference style is the default reference system used in Excel. Columns are labeled with letters and rows are labeled with numbers.",
        },
        {
          type: "image",
          src: "/images/excel/module-7/reference-styles/a1_reference.png",
          alt: "A1 reference style example",
        },
      ],
    },

    {
      heading: "R1C1 Reference Style",
      blocks: [
        {
          type: "paragraph",
          text:
            "R1C1 reference style uses numbers for both rows and columns. For example, R1C1 refers to Row 1 Column 1.",
        },
        {
          type: "image",
          src: "/images/excel/module-7/reference-styles/r1c1_reference.png",
          alt: "R1C1 reference style example",
        },
      ],
    },

    {
      heading: "Switching Reference Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can switch between reference styles in Excel Options under the Formulas category.",
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text:
        "Open Excel Options and locate the R1C1 reference style setting. Enable it and observe how cell references change.",
    },
  ],
},

];