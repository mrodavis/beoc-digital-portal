import { Lesson } from "@/types/lesson";

export const excelModule3Lessons: Lesson[] = [

  // ============================================================
  // LESSON 10
  // ============================================================
  {
    slug: "working-with-multiple-worksheets",
    title: "Working with Multiple Worksheets",
    description:
      "Learn how to add, delete, copy, move, group, and organize worksheets within a workbook.",
    duration: "12 min",

    videoUrl: "https://www.youtube.com/embed/qRShQc-v3LI",

    practiceFiles: [
      {
        name: "Multiple Worksheets Practice File",
        url: "/practice/excel/module-3/multiple-worksheets/Excel_MultipleSheets_Practice.xlsx",
      },
    ],

    sections: [
      {
        heading: "Creating and Renaming Worksheets",
        blocks: [
          {
            type: "paragraph",
            text:
              "Click the New Sheet (+) button to insert a new worksheet. Rename sheets to reflect meaningful labels such as months or departments.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/multiple-worksheets/new-sheet.png",
            alt: "Insert new worksheet",
          },
          {
            type: "image",
            src: "/images/excel/module-3/multiple-worksheets/rename-sheet.png",
            alt: "Rename worksheet",
          },
        ],
      },
      {
        heading: "Moving and Copying Worksheets",
        blocks: [
          {
            type: "paragraph",
            text:
              "Worksheets can be reordered by dragging tabs or copied using the Move or Copy dialog box.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/multiple-worksheets/move-sheet.png",
            alt: "Moving worksheet tab",
          },
          {
            type: "image",
            src: "/images/excel/module-3/multiple-worksheets/copy-sheet.png",
            alt: "Copy worksheet dialog",
          },
        ],
      },
      {
        heading: "Grouping and Ungrouping Worksheets",
        blocks: [
          {
            type: "paragraph",
            text:
              "Hold Ctrl to select multiple sheets and group them. Changes made to one sheet will apply to all grouped sheets.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/multiple-worksheets/group-sheets.png",
            alt: "Grouped worksheets",
          },
        ],
      },
    ],

    challenge: [
      { type: "paragraph", text: "Complete the following tasks:" },
      {
        type: "list",
        ordered: true,
        items: [
          "Insert a new worksheet.",
          "Rename the worksheet to a month.",
          "Move the worksheet to a new position.",
          "Create a copy of a worksheet.",
          "Group two worksheets and apply formatting.",
          "Ungroup the worksheets.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 11
  // ============================================================
{
  slug: "find-and-replace",
  title: "Using Find & Replace",
  description:
    "Search for specific data and quickly correct or replace repeated content throughout a worksheet or workbook.",
  duration: "8 min",

  videoUrl: "https://www.youtube.com/embed/hmizmgOjNYo",

  practiceFiles: [
    {
      name: "Find and Replace Practice File",
      url: "/practice/excel/module-3/find-replace/Excel_FindReplace_Practice.xlsx",
    },
  ],

  sections: [

    // ------------------------------------------------------------
    // Introduction
    // ------------------------------------------------------------
    {
      heading: "Why Use Find & Replace?",
      blocks: [
        {
          type: "paragraph",
          text:
            "When working with large datasets, manually scanning for errors or repeated values can be time-consuming. Excel’s Find and Replace tools allow you to quickly locate and update content across a worksheet or an entire workbook.",
        },
      ],
    },

    // ------------------------------------------------------------
    // Using Find
    // ------------------------------------------------------------
    {
      heading: "Using the Find Command",
      blocks: [
        {
          type: "paragraph",
          text:
            "To locate specific content, go to the Home tab, click Find & Select, then choose Find. You can also press Ctrl + F on your keyboard.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/find-menu.png",
          alt: "Find command in Excel",
        },
        {
          type: "paragraph",
          text:
            "Enter the text you want to search for in the Find what field. Click Find Next to locate one instance at a time or Find All to display every match.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/find-dialog.png",
          alt: "Find dialog box",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/find-all-results.png",
          alt: "Find All results showing multiple matches",
        },
      ],
    },

    // ------------------------------------------------------------
    // Advanced Options
    // ------------------------------------------------------------
    {
      heading: "Advanced Search Options",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Options to expand advanced search settings such as Match Case, Match Entire Cell Contents, and choosing whether to search within the current sheet or the entire workbook.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/find-options.png",
          alt: "Find dialog expanded options",
        },
      ],
    },

    // ------------------------------------------------------------
    // Using Replace
    // ------------------------------------------------------------
    {
      heading: "Using Replace",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you need to correct repeated mistakes or update values, use Replace. From the Home tab, click Find & Select, then choose Replace.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/replace-menu.png",
          alt: "Replace option in Excel",
        },
        {
          type: "paragraph",
          text:
            "Enter the text to find in the Find what field and the replacement text in the Replace with field. Use Replace to update one instance at a time.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/replace-dialog.png",
          alt: "Replace dialog box",
        },
      ],
    },

    // ------------------------------------------------------------
    // Replace All
    // ------------------------------------------------------------
    {
      heading: "Using Replace All",
      blocks: [
        {
          type: "paragraph",
          text:
            "Replace All updates every matching instance automatically. Use this option carefully, as it does not allow you to review changes individually.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/replace-all-selected.png",
          alt: "Replace All button selected",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/replace-confirmation.png",
          alt: "Replacement confirmation message",
        },
        {
          type: "image",
          src: "/images/excel/module-3/find-replace/replace-before-after.png",
          alt: "Before and after comparison of replaced values",
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks using the practice workbook:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Change Crystal Lewis’s last name to Taylor using Find and Replace. Be careful to only change Crystal’s record.",
        "Replace Bio with Biology. Do NOT change Biomedical Engineering.",
        "Use Replace All to change Physics to Physical Science.",
        "Verify your worksheet matches the final expected result.",
      ],
    },
    {
      type: "image",
      src: "/images/excel/module-3/find-replace/challenge-final.png",
      alt: "Final challenge worksheet result",
    },
  ],
},

  // ============================================================
  // LESSON 12
  // ============================================================
  {
    slug: "checking-spelling",
    title: "Checking Spelling",
    description:
      "Use Excel's spell check tool to ensure worksheets are professional and error-free before sharing.",
    duration: "4 min",

    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER",

    practiceFiles: [
      {
        name: "Spell Check Practice File",
        url: "/practice/excel/module-3/spell-check/Excel_SpellCheck_Practice.xlsx",
      },
    ],

    sections: [
      {
        heading: "Running Spell Check",
        blocks: [
          {
            type: "paragraph",
            text:
              "Use the Spelling command under the Review tab to check for spelling errors in a worksheet.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/spell-check/spellcheck-dialog.png",
            alt: "Spell check dialog",
          },
        ],
      },
      {
        heading: "Spell Check Options",
        blocks: [
          {
            type: "paragraph",
            text:
              "Choose to Ignore, Change, or Add to Dictionary depending on the context of the word.",
          },
        ],
      },
    ],

    challenge: [
      { type: "paragraph", text: "Complete the following tasks:" },
      {
        type: "list",
        ordered: true,
        items: [
          "Run spell check on the worksheet.",
          "Correct identified spelling errors.",
          "Add an industry term to the dictionary.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 13
  // ============================================================
  {
    slug: "view-tools-for-reviewing",
    title: "View Tools for Reviewing Worksheets",
    description:
      "Use view options and navigation tools to review and manage large worksheets efficiently.",
    duration: "10 min",

    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER",

    practiceFiles: [
      {
        name: "View Tools Practice File",
        url: "/practice/excel/module-3/view-tools/Excel_ViewTools_Practice.xlsx",
      },
    ],

    sections: [
      {
        heading: "Worksheet Views",
        blocks: [
          {
            type: "paragraph",
            text:
              "Switch between Normal View, Page Layout View, and Page Break Preview to manage how content appears.",
          },
        ],
      },
      {
        heading: "Freeze Panes and Split",
        blocks: [
          {
            type: "paragraph",
            text:
              "Freeze Panes keeps specific rows or columns visible while scrolling. Split divides the worksheet into panes.",
          },
        ],
      },
      {
        heading: "Zoom and Window Tools",
        blocks: [
          {
            type: "paragraph",
            text:
              "Use Zoom and Arrange All to review multiple sheets or workbooks simultaneously.",
          },
        ],
      },
    ],

    challenge: [
      { type: "paragraph", text: "Complete the following tasks:" },
      {
        type: "list",
        ordered: true,
        items: [
          "Switch to Page Break Preview.",
          "Freeze the top row.",
          "Split the worksheet.",
          "Adjust the zoom level.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 14
  // ============================================================
  {
    slug: "page-layout-and-printing",
    title: "Page Layout and Printing",
    description:
      "Learn how to control margins, orientation, scaling, print area, and headers to produce professional printed reports.",
    duration: "12 min",

    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER",

    practiceFiles: [
      {
        name: "Printing Practice File",
        url: "/practice/excel/module-3/printing/Excel_Printing_Practice.xlsx",
      },
    ],

    sections: [
      {
        heading: "Setting Print Area and Orientation",
        blocks: [
          {
            type: "paragraph",
            text:
              "Define a Print Area to specify what should print. Choose Portrait or Landscape orientation based on layout.",
          },
        ],
      },
      {
        heading: "Margins and Scaling",
        blocks: [
          {
            type: "paragraph",
            text:
              "Adjust margins and use scaling options such as Fit Sheet on One Page to control layout.",
          },
        ],
      },
      {
        heading: "Headers, Footers, and Print Titles",
        blocks: [
          {
            type: "paragraph",
            text:
              "Add headers and footers for page numbers and document information. Use Print Titles to repeat header rows on each page.",
          },
        ],
      },
    ],

    challenge: [
      { type: "paragraph", text: "Complete the following tasks:" },
      {
        type: "list",
        ordered: true,
        items: [
          "Set a print area.",
          "Change orientation to Landscape.",
          "Fit worksheet to one page wide.",
          "Add a footer with page numbers.",
          "Repeat header rows on every printed page.",
        ],
      },
    ],
  },

];