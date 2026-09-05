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
    objectives: [
      "Enter, edit, and clear cell content, and distinguish clearing from deleting",
      "Use the fill handle to copy values and extend patterns",
      "Use Paste Special to paste values, formats, or formulas selectively",
      "Explain why Excel treats some entries as text and others as numbers",
    ],
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
        heading: "Excel is always deciding what you typed",
        blocks: [
          {
            type: "scenario",
            role: "You are entering supply orders at Lakeside Medical Associates.",
            text: "You type a catalog number as 03-4521 and Excel displays a date. You type another as 1/2 and get January 2nd. Your totals column will not sum, because half its values are text that merely looks numeric.",
            task: "Understand how Excel interprets what you type, so your data behaves as data.",
          },
          {
            type: "paragraph",
            text: "Every entry is classified the moment you press Enter: number, date, or text. That classification governs everything afterwards — whether it sums, how it sorts, whether a formula can use it. Numbers align right by default and text aligns left, which gives you a free visual check: a column of right-aligned figures with one left-aligned entry has one text value hiding in it.",
          },
          {
            type: "paragraph",
            text: "To force text, format the cells as Text before typing, or begin the entry with an apostrophe: '03-4521. The apostrophe is not stored — it tells Excel to keep what follows verbatim. This is the standard fix for catalog numbers, account codes, and any identifier with leading zeros.",
          },
          {
            type: "table",
            caption: "The fill handle's behaviors",
            columns: [
              "You enter and drag",
              "Excel produces",
              "Why",
            ],
            rows: [
              [
                "One cell containing 5",
                "5, 5, 5, 5",
                "A single value is copied",
              ],
              [
                "Two cells containing 5 and 10",
                "15, 20, 25",
                "Two cells establish a pattern — a step of 5",
              ],
              [
                "A cell containing Monday",
                "Tuesday, Wednesday…",
                "Excel knows built-in lists for days and months",
              ],
              [
                "A cell containing =A1+B1",
                "=A2+B2, =A3+B3",
                "Relative references shift as the formula moves down",
              ],
              [
                "Ctrl held while dragging",
                "Copies instead of extending",
                "Overrides Excel's pattern detection",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Delete clears a cell's contents but leaves the cell in place. Right-click > Delete removes the cell itself and shifts its neighbors, which will break formulas that referred to the shifted cells. When you mean to empty cells, press Delete; when you mean to remove rows, select the whole row.",
          },
        ],
      },
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
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What does the fill handle do in Excel?",
            options: [
              "Deletes the contents of selected cells",
              "Formats cells with a fill color",
              "Copies content or continues a pattern into adjacent cells",
              "Inserts a new row below the selected cell",
            ],
            correctIndex: 2,
            explanation: "The fill handle — the small square at the bottom-right of a selection — copies content into adjacent cells or continues a pattern. Select two cells that establish a step and it extends the series rather than repeating the value.",
            optionRationales: [
              "Clearing contents is done with the Delete key or Home > Clear. The fill handle adds content rather than removing it.",
              "Fill color is applied from the Home tab's paint bucket. The fill handle fills cells with content, not with color — an easy confusion given the name.",
              "Correct. It copies a value or continues a detected pattern into the cells you drag across.",
              "Inserting rows is done by right-clicking a row header and choosing Insert. The fill handle does not change the structure of the sheet.",
            ],
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
  objectives: [
    "Adjust column width and row height, including AutoFit",
    "Insert, delete, hide, and unhide rows and columns",
    "Explain why merged cells cause problems in data ranges",
    "Wrap text so long entries stay readable",
  ],
  duration: "15 min",

  videoUrl: "https://www.youtube.com/embed/9s0OdXiuqL0",

  practiceFiles: [
    {
      name: "Modifying Columns and Rows Practice File",
      url: "/practice/excel/module-2/modifying/excel_modifyingcells_practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "Merged cells break more than they fix",
       blocks: [
         {
           type: "scenario",
           role: "You inherit the supply tracker at Lakeside Medical Associates.",
           text: "Your predecessor merged cells across the top of each section to make headings look centered. Now sorting throws an error, filtering behaves unpredictably, and selecting a column selects far more than you asked for.",
           task: "Learn the layout tools that make a sheet readable without damaging its structure.",
         },
         {
           type: "paragraph",
           text: "Merging combines cells into one, which destroys the grid the merged region covered. Sorting, filtering, and many formulas depend on every row having the same shape, so a merged range breaks them. In a data table, merged cells are close to always the wrong tool.",
         },
         {
           type: "paragraph",
           text: "'Center Across Selection' gives the same visual result without the damage. Select the cells, open Format Cells > Alignment, and set Horizontal to Center Across Selection. The text appears centered across the range while every cell remains individually addressable — so sorting and filtering keep working.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Hiding a column does not remove its data. Hidden columns are fully present in the file and unhide in two clicks, so hiding is never a way to withhold information from someone you send the workbook to. If data should not travel, delete it from a copy.",
         },
         {
           type: "tip",
           text: "Double-clicking the boundary between two column headers AutoFits that column to its widest entry. Select every column first and one double-click sizes them all — the fastest way to make an inherited sheet readable.",
         },
       ],
     },

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

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does AutoFit do to a column?",
          options: [
            "Applies a preset width of 10 characters",
            "Hides the column from view",
            "Adjusts the column width to fit the widest content",
            "Merges the column with the one to its right",
          ],
          correctIndex: 2,
          explanation: "AutoFit sizes a column to exactly fit its widest entry, so nothing is cut off and no space is wasted. Double-clicking the boundary in the column header is the fastest way to apply it.",
          optionRationales: [
            "AutoFit measures the actual content rather than applying any fixed width. Excel's default width is about 8.43 characters, but AutoFit ignores it.",
            "Hiding is a separate command on the right-click menu. AutoFit changes width, and never to zero.",
            "Correct. The column is sized to fit its widest entry.",
            "Merging is a separate command on the Home tab, and it is best avoided in data ranges. AutoFit only changes width.",
          ],
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
  objectives: [
    "Apply fonts, borders, and fill colors purposefully",
    "Use cell styles for consistency across a workbook",
    "Explain why formatting should never be the only carrier of meaning",
    "Use Format Painter to copy formatting across ranges",
  ],
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

    {
       heading: "Formatting should help someone read the numbers",
       blocks: [
         {
           type: "scenario",
           role: "You prepare the monthly budget review at Lakeside Medical Associates.",
           text: "You shade the over-budget rows red. The report is printed in black and white for the board meeting, where every row is now identical gray. The one thing the report existed to communicate is invisible.",
           task: "Format so the meaning survives printing, photocopying, and colorblind readers.",
         },
         {
           type: "paragraph",
           text: "The rule is that color may reinforce meaning but must never be the only thing carrying it. Add a status column reading 'Over budget,' or a symbol, or bold. Then the red shading is a helpful accent rather than the sole signal — and the report still works in greyscale.",
         },
         {
           type: "paragraph",
           text: "Cell Styles (Home > Cell Styles) are Excel's equivalent of Word's styles: named formatting you apply by reference. Using the built-in Heading, Total, and Input styles means a workbook stays consistent, and restyling it later is one change rather than a hunt through every sheet.",
         },
         {
           type: "tip",
           text: "A widely used convention marks input cells — the ones a person types into — in one distinct color, and leaves calculated cells unshaded. Anyone opening the workbook then knows immediately which cells are safe to change and which contain formulas they would break.",
         },
       ],
     },

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

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which formatting option applies color to the background of a cell?",
          options: [
            "Font Color",
            "Cell Style",
            "Fill Color",
            "Border Color",
          ],
          correctIndex: 2,
          explanation: "Fill Color sets the background of the cell. Font Color changes the text itself, and Border Color affects only the cell's outline.",
          optionRationales: [
            "Font Color changes the color of the characters, leaving the cell background unchanged.",
            "Cell Styles apply a saved combination of formatting, which may include a fill — but the specific control for the background is Fill Color.",
            "Correct. Fill Color sets the cell's background color.",
            "Border Color affects the lines around the cell, not the area inside it.",
          ],
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
  objectives: [
    "Apply currency, percentage, date, and accounting formats appropriately",
    "Explain the difference between a displayed value and a stored value",
    "Diagnose why a percentage or date displays unexpectedly",
    "Use custom number formats for identifiers with leading zeros",
  ],
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

    {
       heading: "What you see is not always what is stored",
       blocks: [
         {
           type: "scenario",
           role: "You reconcile invoices at Lakeside Medical Associates.",
           text: "A column of costs displays as whole dollars and the total is off by four dollars against the vendor statement. Nothing looks wrong. The cells actually contain cents, and the display is rounding each one for you while the total sums the real values.",
           task: "Separate what a cell displays from what it stores, because formulas always use the stored value.",
         },
         {
           type: "paragraph",
           text: "Number formatting changes appearance only. A cell holding 1240.4567 formatted to no decimals displays 1240, but every formula referring to it uses 1240.4567. This is why a column of rounded-looking numbers produces a total that appears not to add up — the total is correct, and the display is what is lying.",
         },
         {
           type: "paragraph",
           text: "If you need the value itself rounded, use the ROUND function: =ROUND(A1,2). Formatting is for presentation; ROUND is for changing the number. Confusing the two is one of the most common sources of reconciliation discrepancies.",
         },
         {
           type: "table",
           caption: "Formats and their traps",
           columns: [
             "Format",
             "Displays 0.25 as",
             "Watch out for",
           ],
           rows: [
             [
               "General",
               "0.25",
               "No formatting applied",
             ],
             [
               "Percentage",
               "25%",
               "Excel multiplies by 100 to display — typing 25 into a percent cell gives 2500%",
             ],
             [
               "Currency",
               "$0.25",
               "Places the symbol next to the number",
             ],
             [
               "Accounting",
               "$   0.25",
               "Aligns symbols and decimals in a column; shows zero as a dash",
             ],
             [
               "Text",
               "0.25",
               "Excel stops treating it as a number — it will not sum",
             ],
           ],
         },
         {
           type: "callout",
           variant: "info",
           text: "Dates are stored as serial numbers counting from 1 January 1900, which is why a date can suddenly display as 45,292 if the format is reset to General. The data is intact — apply a date format and it returns. It is also why dates can be used in arithmetic: subtracting one date from another gives the number of days between them.",
         },
       ],
     },

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

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "If a cell is formatted as Percentage, what does the value 0.25 display as?",
          options: [
            "0.25%",
            "2.5%",
            "25%",
            "250%",
          ],
          correctIndex: 2,
          explanation: "Percentage format multiplies the stored value by 100 for display and adds a percent sign, so 0.25 displays as 25%. This is also the trap: typing 25 into a cell already formatted as percentage gives 2500%.",
          optionRationales: [
            "That would be the result of formatting 0.0025. Percentage format multiplies the stored value by 100 for display.",
            "That would be the result of formatting 0.025.",
            "Correct. 0.25 multiplied by 100 displays as 25%.",
            "That would be the result of formatting 2.5. It is what you get by typing 25 into a cell already formatted as percentage.",
          ],
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
// LESSON – INTRO TO FORMULAS
// ============================================================

{
  slug: "intro-to-formulas",
  title: "Intro to Formulas",
  description:
    "Learn how to create basic formulas in Excel using cell references, mathematical operators, and the fill handle.",
  objectives: [
    "Write formulas using cell references rather than typed values",
    "Explain why references make a spreadsheet maintainable",
    "Use the fill handle to copy a formula down a column",
    "Recognize and interpret Excel's common error values",
  ],
  duration: "15 min",

  videoUrl: "https://www.youtube.com/embed/xc14gFFyiTw",

  practiceFiles: [
    {
      name: "Intro to Formulas Practice File",
      url: "/practice/excel/module-2/formulas/Excel_IntroFormulas_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "Never type a number a formula could calculate",
       blocks: [
         {
           type: "scenario",
           role: "You maintain the supply budget at Lakeside Medical Associates.",
           text: "The totals row contains typed numbers your predecessor calculated by hand. A price correction arrives for one item. The item's cost updates, the totals do not, and the workbook now quietly disagrees with itself — with nothing on screen indicating a problem.",
           task: "Build formulas that recalculate, so the workbook can never fall out of step with its own data.",
         },
         {
           type: "paragraph",
           text: "Every formula begins with an equals sign, which is how Excel knows to calculate rather than store what you typed. =C2*D2 multiplies whatever is currently in those two cells and updates the instant either changes.",
         },
         {
           type: "paragraph",
           text: "The discipline is to reference rather than embed. =C2*0.08 for tax works until the rate changes, and then it is wrong in every cell that used it, invisibly. Put the rate in its own labeled cell and write =C2*$F$1. When the rate changes you edit one cell, and the entire workbook is correct again.",
         },
         {
           type: "table",
           caption: "Error values and what they actually mean",
           columns: [
             "Error",
             "Means",
             "Usual cause",
           ],
           rows: [
             [
               "#####",
               "The column is too narrow to display the value",
               "Widen the column — the value is fine",
             ],
             [
               "#DIV/0!",
               "Division by zero or by an empty cell",
               "A divisor cell is empty or zero",
             ],
             [
               "#VALUE!",
               "The formula received the wrong type of data",
               "Text where a number was expected",
             ],
             [
               "#REF!",
               "A reference points at a cell that no longer exists",
               "A row or column the formula used was deleted",
             ],
             [
               "#NAME?",
               "Excel does not recognize a name in the formula",
               "A misspelled function name, or text without quotation marks",
             ],
             [
               "#N/A",
               "A lookup found no match",
               "The value being looked up is not present in the lookup range",
             ],
           ],
         },
         {
           type: "worked-example",
           title: "Building a supply cost sheet that maintains itself",
           task: "Calculate line totals, a subtotal, and tax so that any price change updates everything automatically.",
           steps: [
             {
               move: "Put the tax rate in its own labeled cell, say F1, rather than inside formulas.",
               why: "A rate typed into thirty formulas has to be found and changed thirty times, and any one you miss stays wrong silently. A rate in a labeled cell is changed once, and it is visible to anyone opening the workbook.",
             },
             {
               move: "In E2 enter =C2*D2 for quantity times unit price.",
               why: "References rather than numbers. If the quantity in C2 changes, the line total follows immediately — the sheet can never disagree with its own inputs.",
             },
             {
               move: "Select E2 and double-click the fill handle to copy down the column.",
               why: "Double-clicking fills down to the extent of the adjacent data, which is far more reliable than dragging on a 900-row sheet. The relative references shift as the formula moves, so row 3 gets =C3*D3.",
             },
             {
               move: "Subtotal with =SUM(E2:E30), then tax with =E31*$F$1.",
               why: "The dollar signs make F1 absolute, so copying the formula never shifts it off the rate cell. SUM over a range also keeps working when rows are inserted inside it, which typed addition does not.",
             },
           ],
           result: "A sheet where changing any quantity, price, or the tax rate updates every dependent figure instantly.",
           takeaway: "Put every input in its own labeled cell and reference it. Numbers buried inside formulas are the single most common cause of spreadsheets that are quietly wrong.",
         },
       ],
     },

    // ------------------------------------------------------------
    // What Is a Formula?
    // ------------------------------------------------------------
    {
      heading: "What Is a Formula?",
      blocks: [
        {
          type: "paragraph",
          text:
            "A formula is an equation that performs calculations in a worksheet. All formulas in Excel must begin with an equals sign (=).",
        },
        {
          type: "paragraph",
          text:
            "Excel can add, subtract, multiply, divide, and calculate exponents using standard mathematical operators.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/simpform_graphic_operators4.png",
          alt: "Excel mathematical operators",
        },
      ],
    },

    // ------------------------------------------------------------
    // Understanding Cell References
    // ------------------------------------------------------------
    {
      heading: "Understanding Cell References",
      blocks: [
        {
          type: "paragraph",
          text:
            "Instead of typing numbers directly into formulas, Excel typically uses cell references. A cell reference identifies the location of data in the worksheet, such as A1 or D10.",
        },
        {
          type: "paragraph",
          text:
            "Using references allows formulas to automatically update when the referenced data changes.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_understanding_1.png",
          alt: "Simple numbers in cells",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_understanding_2.png",
          alt: "Formula using cell references",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_understanding_3.png",
          alt: "Formula recalculated result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Example Formulas
    // ------------------------------------------------------------
    {
      heading: "Common Formula Examples",
      blocks: [
        {
          type: "image",
          src: "/images/excel/module-2/formulas/simpform_graphic_formulas5.png",
          alt: "Common formula examples table",
        },
      ],
    },

    // ------------------------------------------------------------
    // Creating a Basic Formula
    // ------------------------------------------------------------
    {
      heading: "Creating a Basic Formula",
      blocks: [
        {
          type: "paragraph",
          text:
            "To create a formula, select the cell where you want the result to appear, type an equals sign (=), then enter the cell references and operator.",
        },
        {
          type: "paragraph",
          text:
            "In this example, we calculate a total budget by adding two cells together.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_create_equals_sign.png",
          alt: "Typing equals sign in Excel",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_create_cell_reference.png",
          alt: "Selecting first cell reference",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_create_operator.png",
          alt: "Typing operator in formula",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_create_result.png",
          alt: "Final calculated result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Editing a Formula
    // ------------------------------------------------------------
    {
      heading: "Editing a Formula",
      blocks: [
        {
          type: "paragraph",
          text:
            "To modify a formula, select the cell and click inside the formula bar, or double-click the cell to edit directly.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_edit_click.png",
          alt: "Clicking formula bar",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_edit_edit.png",
          alt: "Editing formula reference",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_edit_enter.png",
          alt: "Press Enter to confirm formula",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_edit_result.png",
          alt: "Updated formula result",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_edit_cancel.png",
          alt: "Cancel formula edit",
        },
      ],
    },

    // ------------------------------------------------------------
    // Point-and-Click Method
    // ------------------------------------------------------------
    {
      heading: "Using the Point-and-Click Method",
      blocks: [
        {
          type: "paragraph",
          text:
            "Instead of typing cell addresses manually, you can click the cells you want to include in the formula. This reduces errors and increases accuracy.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_pnc_select.png",
          alt: "Selecting first cell",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_pnc_click_1.png",
          alt: "Selecting second cell",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_pnc_click_2.png",
          alt: "Completing multiplication",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_pnc_result.png",
          alt: "Point and click result",
        },
      ],
    },

    // ------------------------------------------------------------
    // Copying with the Fill Handle
    // ------------------------------------------------------------
    {
      heading: "Copying Formulas with the Fill Handle",
      blocks: [
        {
          type: "paragraph",
          text:
            "Formulas can be copied to adjacent cells using the fill handle. This small square appears in the bottom-right corner of a selected cell.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_fill_select2.png",
          alt: "Selecting cell with formula",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/formulas_fill_result.png",
          alt: "Formula copied using fill handle",
        },
      ],
    },

    // ------------------------------------------------------------
    // Practical Invoice Example
    // ------------------------------------------------------------
    {
      heading: "Practical Invoice Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "In real-world spreadsheets, formulas are often used to calculate totals such as invoices, budgets, or payroll.",
        },
        {
          type: "image",
          src: "/images/excel/module-2/formulas/screen shot 2015-11-24 at 3.27.57 pm.png",
          alt: "Invoice example with calculated totals",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "How must every Excel formula begin?",
          options: [
            "With a plus sign (+)",
            "With a cell reference like A1",
            "With an equals sign (=)",
            "With a function name like SUM",
          ],
          correctIndex: 2,
          explanation: "Every formula begins with an equals sign. Without it Excel stores what you typed as text, which is why a 'formula' sometimes just sits in the cell displaying itself.",
          optionRationales: [
            "Excel accepts a leading + for compatibility with old Lotus habits and converts it to =, but the equals sign is the actual rule.",
            "Starting with a cell reference produces text. A1+B1 typed without an equals sign is stored as the literal characters.",
            "Correct. The equals sign tells Excel to calculate rather than store the text.",
            "Even a function needs the equals sign. SUM(A1:A10) without it is text; =SUM(A1:A10) calculates.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks in the practice workbook:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Create a formula in cell D4 that multiplies Quantity by Price per Unit.",
        "Use the fill handle to copy the formula to remaining rows.",
        "Edit one price value and verify that totals update automatically.",
        "Create a formula that adds two budget values together.",
        "Show all formulas using Ctrl + ` and then return to normal view.",
      ],
    },
  ],
},

];