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

    videoUrls: [
      "https://www.youtube.com/embed/6mSKsaquTAM",
      "https://www.youtube.com/embed/Ww56q-BSSXw",
    ],
    practiceFiles: [
      {
        name: "Cell Basics Practice File",
        url: "/practice/excel/Excel_CellBasics_Practice.xlsx",
      },
    ],
    sections: [
      {
        heading: "Understanding Cells and Ranges",
        blocks: [
          {
            type: "paragraph",
            text:
              "A cell is the intersection of a row and column. A range is a group of selected cells.",
          },
          {
            type: "image",
            src: "/images/excel/module-2/cell-basics/cellb_intro_cell.png",
            alt: "Excel cell example",
          },
          {
            type: "image",
            src: "/images/excel/module-2/cell-basics/cellb_select_range.png",
            alt: "Selecting a range in Excel",
          },
        ],
      },
      {
        heading: "Insert and Delete Cells",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can insert new cells or delete existing ones to reorganize worksheet data.",
          },
          {
            type: "image",
            src: "/images/excel/module-2/cell-basics/cellb_insert_select.png",
            alt: "Insert cells",
          },
          {
            type: "image",
            src: "/images/excel/module-2/cell-basics/cellb_delete_select.png",
            alt: "Delete cells",
          },
        ],
      },
      {
        heading: "Cut, Copy & Paste",
        blocks: [
          {
            type: "paragraph",
            text:
              "Use Cut, Copy, and Paste to move or duplicate data.",
          },
          {
            type: "image",
            src: "/images/excel/module-2/cell-basics/cellb_copy_command.png",
            alt: "Copy command in Excel",
          },
          {
            type: "image",
            src: "/images/excel/module-2/cell-basics/cellb_paste_done.png",
            alt: "Pasting in Excel",
          },
        ],
      },
      {
        heading: "Using the Fill Handle",
        blocks: [
          {
            type: "paragraph",
            text:
              "The fill handle allows you to quickly copy data or create series.",
          },
          {
            type: "image",
            src: "/images/excel/module-2/cell-basics/cellb_fill_select.png",
            alt: "Fill handle selection",
          },
          {
            type: "image",
            src: "/images/excel/module-2/cell-basics/cellb_fill_done.png",
            alt: "Fill handle result",
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
          "Insert a new row.",
          "Delete a selected cell.",
          "Copy and paste data.",
          "Use the fill handle to extend a series.",
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
      "Learn how to resize, insert, delete, hide, and unhide rows and columns.",
    duration: "13 min",

    sections: [
      {
        heading: "Resizing Rows and Columns",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can manually resize rows and columns or use AutoFit to automatically adjust size.",
          },
        ],
      },
      {
        heading: "Inserting and Deleting",
        blocks: [
          {
            type: "paragraph",
            text:
              "Rows and columns can be inserted or deleted to restructure worksheet data.",
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
          "Resize a column using AutoFit.",
          "Insert a new row.",
          "Delete a column.",
          "Hide and unhide rows.",
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
      "Learn how to format text, alignment, borders, and cell styles.",
    duration: "17 min",

    sections: [
      {
        heading: "Font and Alignment",
        blocks: [
          {
            type: "paragraph",
            text:
              "Change font style, size, color, alignment, and apply bold or italic formatting.",
          },
        ],
      },
      {
        heading: "Cell Styles and Borders",
        blocks: [
          {
            type: "paragraph",
            text:
              "Apply borders and built-in styles to enhance readability.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Format text in bold.",
          "Center-align content.",
          "Apply borders.",
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
      "Learn how to apply and customize number formats.",
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
        heading: "Custom Formats",
        blocks: [
          {
            type: "paragraph",
            text:
              "Create custom formats to control how numbers are displayed.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Format values as currency.",
          "Apply percentage format.",
          "Change date format.",
          "Create a custom format.",
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
              "Worksheets can be inserted, renamed, deleted, and rearranged.",
          },
        ],
      },
      {
        heading: "Grouping Worksheets",
        blocks: [
          {
            type: "paragraph",
            text:
              "Grouping allows you to apply changes across multiple sheets at once.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Insert a worksheet.",
          "Rename a worksheet.",
          "Move or copy a worksheet.",
          "Group and ungroup worksheets.",
        ],
      },
    ],
  },
];