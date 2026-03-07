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
        }
    ],
},

/* ============================================================
LESSON 2 – WHAT-IF ANALYSIS
============================================================ */

{
  slug: "what-if-analysis",
  title: "What-If Analysis",
  description:
    "Learn how to use What-If Analysis tools like Goal Seek and Scenario Manager to test different outcomes in Excel.",
  duration: "8 min",

  videoUrl: "https://www.youtube.com/embed/0E0M4oT7R2g",

  practiceFiles: [
    {
      name: "Download Practice Workbook",
      url: "/practice/excel/module-7/what-if-analysis/Excel_WhatIf_Practice.xlsx",
    },
  ],

  sections: [

    {
      heading: "What-If Analysis Overview",
      blocks: [
        {
          type: "paragraph",
          text:
            "What-If Analysis allows you to test different scenarios in Excel without changing your original formulas. It helps answer questions like 'What happens if sales increase by 10%?'",
        },
      ],
    },

    {
      heading: "Using Goal Seek",
      blocks: [
        {
          type: "paragraph",
          text:
            "Goal Seek allows Excel to calculate the input needed to reach a specific result. For example, you can determine what sales amount is required to reach a profit target.",
        },
        {
          type: "image",
          src: "/images/excel/module-7/what-if-analysis/goal_seek.png",
          alt: "Goal Seek dialog box",
        },
      ],
    },

    {
      heading: "Scenario Manager",
      blocks: [
        {
          type: "paragraph",
          text:
            "Scenario Manager allows you to store and compare different sets of values for your worksheet variables.",
        },
        {
          type: "image",
          src: "/images/excel/module-7/what-if-analysis/scenario_manager.png",
          alt: "Scenario Manager dialog",
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
        "Use Goal Seek to determine the sales value needed to reach the target profit.",
        "Create two different scenarios using Scenario Manager.",
        "Compare the results.",
      ],
    },
  ],
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