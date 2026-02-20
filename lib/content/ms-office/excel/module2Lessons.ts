import { Lesson } from "@/types/lesson";

export const excelModule2Lessons: Lesson[] = [

  // ============================================================
  // LESSON 5
  // ============================================================
  {
    slug: "cell-basics",
    title: "Cell Basics",
    description:
      "Learn how to insert and delete cells and cell content, drag and drop cells, use the fill handle, and use cut, copy, and paste.",
    duration: "12 min",

    sections: [
      {
        heading: "Understanding Cells",
        blocks: [
          {
            type: "paragraph",
            text:
              "Cells are the building blocks of an Excel worksheet. Each cell is identified by a column letter and row number.",
          },
        ],
      },
      {
        heading: "Using the Fill Handle",
        blocks: [
          {
            type: "paragraph",
            text:
              "The fill handle allows you to quickly copy or extend data patterns across cells.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the following tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Insert and delete cells.",
          "Use drag and drop to move cell data.",
          "Use the fill handle to extend a series.",
          "Copy and paste data using keyboard shortcuts.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 6
  // ============================================================
  {
    slug: "modifying-columns-rows-and-cells",
    title: "Modifying Columns, Rows, and Cells",
    description:
      "Learn how to modify rows, columns, and cells in Excel.",
    duration: "13 min",

    sections: [
      {
        heading: "Resizing Rows and Columns",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can manually resize or use AutoFit to automatically adjust row height and column width.",
          },
        ],
      },
      {
        heading: "Inserting and Deleting Rows & Columns",
        blocks: [
          {
            type: "paragraph",
            text:
              "Rows and columns can be inserted or deleted to reorganize worksheet data.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the following tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Resize columns using AutoFit.",
          "Insert a new row.",
          "Delete a column.",
          "Hide and unhide rows or columns.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 7
  // ============================================================
  {
    slug: "formatting-cells",
    title: "Formatting Cells in Excel",
    description:
      "Learn how to format text, alignment, borders, and apply cell styles.",
    duration: "17 min",

    sections: [
      {
        heading: "Font and Text Formatting",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can change font type, size, color, and apply bold, italic, and underline formatting.",
          },
        ],
      },
      {
        heading: "Alignment and Cell Styles",
        blocks: [
          {
            type: "paragraph",
            text:
              "Excel provides alignment tools and built-in cell styles to enhance readability.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the following tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Format text using bold and font color.",
          "Center-align data.",
          "Apply borders to a data table.",
          "Use a built-in cell style.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 8
  // ============================================================
  {
    slug: "understanding-number-formats",
    title: "Understanding Number Formats in Excel",
    description:
      "Learn how to apply and customize number formats in Excel.",
    duration: "12 min",

    sections: [
      {
        heading: "Common Number Formats",
        blocks: [
          {
            type: "paragraph",
            text:
              "Excel includes formats such as General, Currency, Percentage, Date, and Number.",
          },
        ],
      },
      {
        heading: "Custom Number Formats",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can create custom formats to control how numeric data is displayed.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the following tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Format values as currency.",
          "Apply percentage formatting.",
          "Change date formats.",
          "Create a simple custom format.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 9
  // ============================================================
  {
    slug: "working-with-multiple-worksheets",
    title: "Working with Multiple Worksheets",
    description:
      "Learn how to add, delete, copy, move, group, and ungroup worksheets.",
    duration: "12 min",

    sections: [
      {
        heading: "Managing Worksheets",
        blocks: [
          {
            type: "paragraph",
            text:
              "Worksheets can be added, deleted, renamed, and rearranged within a workbook.",
          },
        ],
      },
      {
        heading: "Grouping Worksheets",
        blocks: [
          {
            type: "paragraph",
            text:
              "Grouping allows you to apply changes across multiple worksheets at once.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the following tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Insert a new worksheet.",
          "Rename a worksheet.",
          "Move or copy a worksheet.",
          "Group and ungroup worksheets.",
        ],
      },
    ],
  },

];