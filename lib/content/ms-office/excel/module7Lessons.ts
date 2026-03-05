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

  videoUrl: "https://www.youtube.com/embed/qERjkjK6p1M",

  practiceFiles: [
    {
      name: "Download Practice Workbook",
      url: "/practice/excel/module-7/pivotTables/Excel_PivotTables_Advanced_Practice.xlsx",
    },
  ],

  sections: [

    {
      heading: "Filtering PivotTables",
      blocks: [
        {
          type: "paragraph",
          text:
            "PivotTables allow you to filter data so you can focus on specific categories or values. Filters help you analyze subsets of your dataset quickly.",
        },
        {
          type: "image",
          src: "/images/excel/module-7/pivotTables/pivot_filter_dropdown.png",
          alt: "PivotTable filter dropdown",
        },
      ],
    },

    {
      heading: "Grouping Data in PivotTables",
      blocks: [
        {
          type: "paragraph",
          text:
            "Grouping allows you to combine similar values into categories. For example, dates can be grouped by months or years.",
        },
        {
          type: "image",
          src: "/images/excel/module-7/pivotTables/pivot_group_dates.png",
          alt: "Grouping data in PivotTables",
        },
      ],
    },

    {
      heading: "Refreshing PivotTables",
      blocks: [
        {
          type: "paragraph",
          text:
            "When the source data changes, the PivotTable must be refreshed so it reflects the updated data.",
        },
        {
          type: "image",
          src: "/images/excel/module-7/pivotTables/pivot_refresh.png",
          alt: "Refreshing a PivotTable",
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
        "Add Region to the Filters area.",
        "Add Salesperson to Rows.",
        "Add Order Amount to Values.",
        "Filter the PivotTable to display only one region.",
        "Refresh the PivotTable after changing the dataset.",
      ],
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