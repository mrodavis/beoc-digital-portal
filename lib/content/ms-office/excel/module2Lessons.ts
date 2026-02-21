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
    "Learn how to format fonts, apply colors, borders, alignment, cell styles, and enhance worksheet presentation.",
  duration: "20 min",

  videoUrls: [
    "https://www.youtube.com/embed/etAMC0KRuBE",
    "https://www.youtube.com/embed/LHSJJvkVrvA",
  ],

  practiceFiles: [
    {
      name: "Formatting Cells Practice File",
      url: "/practice/excel/module-2/formatting/Excel_FormattingCells_Practice.xlsx",
    },
  ],

  sections: [

    // ------------------------------------------------------------
    // Font Type
    // ------------------------------------------------------------
    {
      heading: "Changing Font Type",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can change the font type from the Font group on the Home tab.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font type select cells.png",
          alt: "Selecting cells for font change",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font type dropdown menu.png",
          alt: "Font dropdown menu",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font type after change.png",
          alt: "Font after change",
        },
      ],
    },

    // ------------------------------------------------------------
    // Font Size
    // ------------------------------------------------------------
    {
      heading: "Changing Font Size",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can choose a font size from the dropdown or use the Increase and Decrease Font Size buttons.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font-size-select-cells.png",
          alt: "Selecting cells for font size change",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font-size-dropdown-menu.png",
          alt: "Font size dropdown",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font-size-increase-and-decrease.png",
          alt: "Increase and decrease font size buttons",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font-size-after-size-change.png",
          alt: "Font size applied",
        },
      ],
    },

    // ------------------------------------------------------------
    // Bold Italic Underline
    // ------------------------------------------------------------
    {
      heading: "Bold, Italic, and Underline",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Bold, Italic, and Underline to emphasize important text.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font-biu-buttons.png",
          alt: "BIU buttons",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/biu-select-cells.png",
          alt: "Selecting cells for BIU",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/biu-after-change.png",
          alt: "BIU applied",
        },
      ],
    },

    // ------------------------------------------------------------
    // Font Color
    // ------------------------------------------------------------
    {
      heading: "Changing Font Color",
      blocks: [
        {
          type: "paragraph",
          text:
            "Font color can be changed using Theme Colors or Standard Colors.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font color select cells.png",
          alt: "Selecting cells for font color",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font color dropdown menu.png",
          alt: "Font color dropdown",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/font color after change.png",
          alt: "Font color applied",
        },
      ],
    },

    // ------------------------------------------------------------
    // Fill Color
    // ------------------------------------------------------------
    {
      heading: "Applying Fill Color",
      blocks: [
        {
          type: "paragraph",
          text:
            "Fill color changes the background color of selected cells.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/fill-color-select-cells2.png",
          alt: "Selecting cells for fill color",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/fill-color-after-change3.png",
          alt: "Fill color applied",
        },
      ],
    },

    // ------------------------------------------------------------
    // Borders
    // ------------------------------------------------------------
    {
      heading: "Applying Borders",
      blocks: [
        {
          type: "paragraph",
          text:
            "Borders help define data tables and improve readability.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/borders-select-cells2.png",
          alt: "Selecting cells for borders",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/borders-after-change2.png",
          alt: "Borders applied",
        },
      ],
    },

    // ------------------------------------------------------------
    // Cell Styles
    // ------------------------------------------------------------
    {
      heading: "Using Cell Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel provides built-in cell styles for quick formatting.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/cell-style-select-cells2.png",
          alt: "Selecting cells for cell style",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/cell-style-dropdown-menu.png",
          alt: "Cell style dropdown",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/cell-style-after-change.png",
          alt: "Cell style applied",
        },
      ],
    },

    // ------------------------------------------------------------
    // Horizontal Alignment
    // ------------------------------------------------------------
    {
      heading: "Horizontal Alignment",
      blocks: [
        {
          type: "paragraph",
          text:
            "Horizontal alignment positions text left, center, or right within a cell.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/horizontal-align-select-cells.png",
          alt: "Selecting cells for horizontal alignment",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/horizontal-align-after-change.png",
          alt: "Horizontal alignment applied",
        },
      ],
    },

    // ------------------------------------------------------------
    // Vertical Alignment
    // ------------------------------------------------------------
    {
      heading: "Vertical Alignment",
      blocks: [
        {
          type: "paragraph",
          text:
            "Vertical alignment positions text at the top, middle, or bottom of a cell.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/vertical-align-buttons.png",
          alt: "Vertical alignment buttons",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/vertical-align-select-cells.png",
          alt: "Selecting cells for vertical alignment",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formatting/vertical-align-after-change.png",
          alt: "Vertical alignment applied",
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
        "Change the font type and size of the worksheet title.",
        "Apply Bold formatting to the header row.",
        "Change the font color of the title.",
        "Apply fill color to the header row.",
        "Add borders to the entire data table.",
        "Center-align column headers horizontally.",
        "Apply Middle Align vertically.",
        "Apply a built-in cell style.",
      ],
    },
    {
      type: "image",
      src: "/images/excel/module-2/formatting/formatting cells challenge screenshot.png",
      alt: "Formatting challenge example",
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
    "Learn how to apply Date, Currency, Percentage, and Decimal number formats, and understand how formatting affects calculations.",
  duration: "18 min",

  videoUrls: [
    "https://www.youtube.com/embed/fjyOG7Ls7BA",
    "https://www.youtube.com/embed/LLmSAQ2PgVc",
  ],

  practiceFiles: [
    {
      name: "Number Formats Practice File",
      url: "/practice/excel/module-2/number-formats/Excel_NumberFormats_Practice.xlsx",
    },
  ],

  sections: [

    // ------------------------------------------------------------
    // Understanding General Format
    // ------------------------------------------------------------
    {
      heading: "General Format vs Specific Formats",
      blocks: [
        {
          type: "paragraph",
          text:
            "By default, Excel uses the General format. This does not apply any special formatting such as currency symbols, percentage signs, or date styling.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_date_general.png",
          alt: "General format example",
        },
      ],
    },

    // ------------------------------------------------------------
    // Date Formatting
    // ------------------------------------------------------------
    {
      heading: "Applying Date Formats",
      blocks: [
        {
          type: "paragraph",
          text:
            "Dates can be formatted as Short Date, Long Date, or customized through the Format Cells dialog box.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_date_format.png",
          alt: "Date dropdown menu",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_date_longdate.png",
          alt: "Long date example",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_date_dialog.png",
          alt: "Date format dialog box",
        },
      ],
    },

    // ------------------------------------------------------------
    // Currency Formatting
    // ------------------------------------------------------------
    {
      heading: "Currency and Accounting Formats",
      blocks: [
        {
          type: "paragraph",
          text:
            "Currency format adds a currency symbol and decimal places. Accounting format aligns currency symbols and decimal points for professional financial reports.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_formats_applying_menu_cropped.png",
          alt: "Currency from dropdown menu",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_formats_applying_currency_cropped.png",
          alt: "Currency formatting applied",
        },
      ],
    },

    // ------------------------------------------------------------
    // Decimal and Rounding
    // ------------------------------------------------------------
    {
      heading: "Decimal Places and Rounding",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Increase Decimal and Decrease Decimal to control how many decimal places are displayed.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_formats_decimal_commands.png",
          alt: "Decimal commands",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_format_decimal_rounding.png",
          alt: "Decimal rounding example",
        },
      ],
    },

    // ------------------------------------------------------------
    // Percentage Formatting
    // ------------------------------------------------------------
    {
      heading: "Understanding Percentage Format",
      blocks: [
        {
          type: "paragraph",
          text:
            "Percentage format multiplies a value by 100 and adds a percent symbol. For example, typing 0.05 and applying Percentage becomes 5%.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_percent_intro.png",
          alt: "Percentage format example",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_percent_compare_big.png",
          alt: "Percentage formatting comparison",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_tip_percent_after.png",
          alt: "Percentage applied correctly",
        },
      ],
    },

    // ------------------------------------------------------------
    // Formatting and Calculations
    // ------------------------------------------------------------
    {
      heading: "How Formatting Affects Calculations",
      blocks: [
        {
          type: "paragraph",
          text:
            "Formatting changes how data is displayed, but it does not change the underlying value. Understanding this is critical for accurate calculations.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_tip_carryover.png",
          alt: "Formatting does not change actual value",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/number_format_chart.png",
          alt: "Correct vs incorrect formatting comparison",
        },
      ],
    },

    // ------------------------------------------------------------
    // Real-World Invoice Example
    // ------------------------------------------------------------
    {
      heading: "Real-World Example: Customer Invoice",
      blocks: [
        {
          type: "paragraph",
          text:
            "In professional documents like invoices, proper number formatting ensures totals, tax rates, and currency values are displayed correctly.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/number-formats/invoice_final_example.png",
          alt: "Formatted invoice example",
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
        "Format a column as Short Date.",
        "Change a date to Long Date format.",
        "Apply Currency formatting to a price column.",
        "Adjust decimal places to two digits.",
        "Format a tax rate as Percentage.",
        "Create a properly formatted invoice total.",
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
    "Learn how to insert, rename, move, copy, group, ungroup, and organize worksheets within a workbook.",
  duration: "15 min",

  videoUrl: "https://www.youtube.com/embed/qRShQc-v3LI",

  practiceFiles: [
    {
      name: "Multiple Worksheets Practice File",
      url: "/practice/excel/module-2/multiple-sheets/Excel_MultipleSheets_Practice.xlsx",
    },
  ],

  sections: [

    // ------------------------------------------------------------
    // Creating New Worksheets
    // ------------------------------------------------------------
    {
      heading: "Creating a New Worksheet",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the New Sheet (+) button to insert a new worksheet into your workbook.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_new.png",
          alt: "New sheet button",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_new_done.png",
          alt: "New sheet created",
        },
      ],
    },

    // ------------------------------------------------------------
    // Renaming Worksheets
    // ------------------------------------------------------------
    {
      heading: "Renaming Worksheets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Right-click a worksheet tab and choose Rename to give the sheet a meaningful name.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_rename_rightclick.png",
          alt: "Right-click rename option",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_rename_done.png",
          alt: "Renamed worksheet",
        },
      ],
    },

    // ------------------------------------------------------------
    // Moving Worksheets
    // ------------------------------------------------------------
    {
      heading: "Moving Worksheets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click and drag a worksheet tab to reposition it within the workbook.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_move_icon.png",
          alt: "Dragging worksheet tab",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_move_done.png",
          alt: "Worksheet moved",
        },
      ],
    },

    // ------------------------------------------------------------
    // Copying Worksheets
    // ------------------------------------------------------------
    {
      heading: "Copying Worksheets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Move or Copy to duplicate a worksheet within the same workbook or another workbook.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_copy_rightclick.png",
          alt: "Right-click move or copy",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_copy_dialog.png",
          alt: "Move or Copy dialog box",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_copy_done.png",
          alt: "Copied worksheet result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Changing Tab Color
    // ------------------------------------------------------------
    {
      heading: "Changing Tab Color",
      blocks: [
        {
          type: "paragraph",
          text:
            "Right-click a worksheet tab and select Tab Color to visually organize related sheets.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_color_rightclick.png",
          alt: "Changing tab color",
        },
      ],
    },

    // ------------------------------------------------------------
    // Grouping Worksheets
    // ------------------------------------------------------------
    {
      heading: "Grouping Worksheets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Hold Ctrl and click multiple sheet tabs to group them. Changes made to one sheet will apply to all grouped sheets.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_group_select.png",
          alt: "Selecting multiple sheets",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_group_during.png",
          alt: "Grouped sheets indicator",
        },
      ],
    },

    // ------------------------------------------------------------
    // Ungrouping Worksheets
    // ------------------------------------------------------------
    {
      heading: "Ungrouping Worksheets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Right-click any grouped sheet and select Ungroup Sheets to stop applying changes across multiple sheets.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/multiple-sheets/sheets_ungroup_rightclick.png",
          alt: "Ungroup sheets option",
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
        "Rename a worksheet to a specific month.",
        "Move a worksheet to a new position.",
        "Create a copy of a worksheet.",
        "Change a worksheet tab color.",
        "Group two worksheets together.",
        "Ungroup the worksheets.",
      ],
    },
  ],
},
];