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
        url: "/practice/excel/module-2/cell-basics/Excel_CellBasics_Practice.xlsx",
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
    "Learn how to resize, insert, delete, hide, move, and format rows and columns in Excel.",
  duration: "15 min",

  videoUrl: "https://www.youtube.com/embed/9s0OdXiuqL0",

  practiceFiles: [
    {
      name: "Modifying Columns and Rows Practice File",
      url: "/practice/excel/module-2/modifying/excel_modifyingcells_practice.xlsx",
    },
  ],

  sections: [

    // ------------------------------------------------------------
    // Resizing Columns
    // ------------------------------------------------------------
    {
      heading: "Resizing Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can manually resize columns by dragging the boundary between column headers or use AutoFit to automatically adjust the width.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_colwidth_select.png",
          alt: "Selecting column boundary",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_colwidth_during.png",
          alt: "Dragging to resize column",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_colwidth_auto_start.png",
          alt: "AutoFit column width option",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_colwidth_auto_done.png",
          alt: "AutoFit result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Resizing Rows
    // ------------------------------------------------------------
    {
      heading: "Resizing Rows",
      blocks: [
        {
          type: "paragraph",
          text:
            "Row height can be adjusted manually or through the Row Height command.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_rowheight_start.png",
          alt: "Selecting row boundary",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_rowheight_during.png",
          alt: "Dragging to resize row",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_rowheight_done.png",
          alt: "Resized row",
        },
      ],
    },

    // ------------------------------------------------------------
    // Wrap Text
    // ------------------------------------------------------------
    {
      heading: "Wrap Text",
      blocks: [
        {
          type: "paragraph",
          text:
            "Wrap Text allows content to appear on multiple lines within a single cell instead of expanding the column width.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_wrap_command.png",
          alt: "Wrap Text command",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_wrap_done.png",
          alt: "Wrapped text result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Inserting Rows and Columns
    // ------------------------------------------------------------
    {
      heading: "Inserting Rows and Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can insert new rows or columns using the Insert command from the Home tab.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_insertrow_select.png",
          alt: "Selecting row before inserting",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_insertrow_command.png",
          alt: "Insert row command",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_insertrow_done.png",
          alt: "Inserted row result",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_insertcol_command.png",
          alt: "Insert column command",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_insertcol_done.png",
          alt: "Inserted column result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Deleting Rows and Columns
    // ------------------------------------------------------------
    {
      heading: "Deleting Rows and Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "Rows and columns can be deleted using the Delete command or right-click menu.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_delete_select.png",
          alt: "Selecting row to delete",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_delete_command.png",
          alt: "Delete command",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_delete_done.png",
          alt: "Deleted row result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Hiding and Unhiding
    // ------------------------------------------------------------
    {
      heading: "Hiding and Unhiding Rows and Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "Rows and columns can be hidden to temporarily remove them from view without deleting data.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_hide_command.png",
          alt: "Hide command",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_hide_hidden.png",
          alt: "Hidden column",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_hide_unhidden.png",
          alt: "Unhidden column",
        },
      ],
    },

    // ------------------------------------------------------------
    // Moving Rows and Columns
    // ------------------------------------------------------------
    {
      heading: "Moving Rows and Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "Rows and columns can be moved using Cut and Insert Cut Cells.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_move_select.png",
          alt: "Selecting row to move",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_move_cut.png",
          alt: "Cut command",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_move_done.png",
          alt: "Moved row result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Merge & Center vs Center Across Selection
    // ------------------------------------------------------------
    {
      heading: "Merge & Center vs Center Across Selection",
      blocks: [
        {
          type: "paragraph",
          text:
            "Merge & Center combines cells into one. Center Across Selection centers text without merging cells.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_merge_select.png",
          alt: "Merge select",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_merge_more.png",
          alt: "Merge options",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_centeracross_dialog.png",
          alt: "Center Across Selection dialog",
        },
      ],
    },

    // ------------------------------------------------------------
    // Select All
    // ------------------------------------------------------------
    {
      heading: "Selecting All Cells",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the Select All button to highlight the entire worksheet at once.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_selectall.png",
          alt: "Select All button",
        },
        {
          type: "image",
          src: "/images/excel/module-2/modifying/mod_selectall_done.png",
          alt: "Entire worksheet selected",
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
        "AutoFit a column width.",
        "Resize a row manually.",
        "Insert a new row.",
        "Delete a column.",
        "Hide and unhide a column.",
        "Move a row using Cut.",
        "Use Wrap Text on a long address.",
        "Use Center Across Selection on a title.",
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