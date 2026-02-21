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
      "Learn how to search for specific data and replace values efficiently within a worksheet or workbook.",
    duration: "8 min",

    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER",

    practiceFiles: [
      {
        name: "Find and Replace Practice File",
        url: "/practice/excel/module-3/find-replace/Excel_FindReplace_Practice.xlsx",
      },
    ],

    sections: [
      {
        heading: "Using Find",
        blocks: [
          {
            type: "paragraph",
            text:
              "The Find feature helps locate specific words, numbers, or formatting within a worksheet or entire workbook.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/find-replace/find-dialog.png",
            alt: "Find dialog box",
          },
        ],
      },
      {
        heading: "Using Replace",
        blocks: [
          {
            type: "paragraph",
            text:
              "Replace allows you to substitute one value with another. Use Replace All carefully to avoid unintended changes.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/find-replace/replace-dialog.png",
            alt: "Replace dialog box",
          },
        ],
      },
      {
        heading: "Advanced Find Options",
        blocks: [
          {
            type: "paragraph",
            text:
              "Options such as Match Case and Match Entire Cell Contents help refine search results.",
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
          "Find all instances of a department name.",
          "Replace an abbreviation with a full department name.",
          "Use Match Case to refine search results.",
        ],
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