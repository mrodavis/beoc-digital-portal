import { Lesson } from "@/types/lesson";

export const wordModule5Lessons: Lesson[] = [

/* ============================================================
LESSON 1 – INSERTING TABLES
============================================================ */

{
  slug: "inserting-tables",
  title: "Inserting Tables",
  description:
    "Learn how to insert tables in Microsoft Word, navigate cells, and understand the different methods for creating tables.",
  duration: "9 min",
  videoUrl: "https://www.youtube.com/embed/sOkNrU3JKUA",

  practiceFiles: [
    {
      name: "Inserting Tables Practice File",
      url: "/practice/word/module-5/tables/word_inserttables_practice.docx",
    },
  ],

  sections: [

    {
      heading: "Why Use Tables?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Tables organize information into rows and columns, making data easier to read and compare. Common uses include schedules, contact lists, comparison charts, and data summaries.",
        },
      ],
    },

    {
      heading: "Inserting a Table Using the Grid",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Insert → Table. Move your mouse over the grid to select the number of columns and rows, then click to insert the table.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_insert_grid.png",
          alt: "Insert Table grid selector",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_insert_grid_result.png",
          alt: "Blank table inserted in the document",
        },
      ],
    },

    {
      heading: "Inserting a Table Using the Dialog Box",
      blocks: [
        {
          type: "paragraph",
          text:
            "For precise control, go to Insert → Table → Insert Table. Enter the exact number of columns and rows in the dialog box, then click OK.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_insert_dialog.png",
          alt: "Insert Table dialog box with column and row fields",
        },
      ],
    },

    {
      heading: "Navigating a Table",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click any cell to position your cursor there. Press Tab to move to the next cell, or Shift + Tab to move to the previous cell. Pressing Tab in the last cell of the last row automatically adds a new row.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_navigation_tab.png",
          alt: "Tab key navigation through table cells",
        },
      ],
    },

    {
      heading: "Converting Text to a Table",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you have a list of text separated by tabs or commas, you can convert it to a table. Select the text, go to Insert → Table → Convert Text to Table, choose the separator, and click OK.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_convert_text_menu.png",
          alt: "Convert Text to Table menu option",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_convert_text_dialog.png",
          alt: "Convert Text to Table dialog box",
        },
      ],
    },

    {
      heading: "The Table Design and Layout Tabs",
      blocks: [
        {
          type: "paragraph",
          text:
            "When your cursor is inside a table, two contextual tabs appear: Table Design (for styles and borders) and Layout (for rows, columns, alignment, and cell size).",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_contextual_tabs.png",
          alt: "Table Design and Layout contextual tabs",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What happens when you press Tab in the very last cell of a table?",
          options: [
            "The cursor moves to the cell above",
            "Word inserts a new row at the end of the table",
            "The table is deleted and replaced with plain text",
            "A new column is added to the right",
          ],
          correctIndex: 1,
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
        "Insert a 4-column, 5-row table using the grid selector.",
        "Type a header label in each of the four columns in the first row.",
        "Fill in two additional rows of data using Tab to move between cells.",
        "Add a new row at the end of the table by pressing Tab in the last cell.",
        "Convert the comma-separated list in the practice file into a table.",
      ],
    },
  ],
},

/* ============================================================
LESSON 2 – MODIFYING TABLES
============================================================ */

{
  slug: "modifying-tables",
  title: "Modifying Tables",
  description:
    "Learn how to add and delete rows and columns, merge and split cells, resize columns, and apply table styles in Microsoft Word.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/sOkNrU3JKUA",

  practiceFiles: [
    {
      name: "Modifying Tables Practice File",
      url: "/practice/word/module-5/tables/word_modifytables_practice.docx",
    },
  ],

  sections: [

    {
      heading: "Adding Rows and Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "Right-click a cell and choose Insert to add rows above or below, or columns to the left or right. You can also hover over the edge of a row or column to see the quick-insert (+) button.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_insert_row_rightclick.png",
          alt: "Insert row options in right-click menu",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_insert_plus_button.png",
          alt: "Quick-insert plus button on table edge",
        },
      ],
    },

    {
      heading: "Deleting Rows, Columns, and the Table",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select the row or column you want to remove, right-click, and choose Delete Rows or Delete Columns. To delete the entire table, right-click and choose Delete Table.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_delete_row_menu.png",
          alt: "Delete Rows option in right-click menu",
        },
      ],
    },

    {
      heading: "Merging Cells",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select two or more adjacent cells, go to the Layout tab, and click Merge Cells. The selected cells combine into one, which is useful for spanning a header across multiple columns.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_merge_cells_select.png",
          alt: "Cells selected for merging",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_merge_cells_result.png",
          alt: "Merged cell spanning multiple columns",
        },
      ],
    },

    {
      heading: "Splitting Cells",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select a cell, go to the Layout tab, and click Split Cells. Enter the number of columns and rows to divide the cell into, then click OK.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_split_cells_dialog.png",
          alt: "Split Cells dialog box",
        },
      ],
    },

    {
      heading: "Resizing Columns and Rows",
      blocks: [
        {
          type: "paragraph",
          text:
            "Drag the column or row border to resize manually. For precise sizing, select a column and use the Width field in the Layout tab's Cell Size group. Click AutoFit → AutoFit Contents to resize all columns to fit their content automatically.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_resize_drag.png",
          alt: "Dragging a column border to resize",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_autofit_menu.png",
          alt: "AutoFit Contents option in Layout tab",
        },
      ],
    },

    {
      heading: "Applying Table Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside the table, go to the Table Design tab, and browse the Table Styles gallery. Hover over any style to preview it on your table, then click to apply.",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_style_gallery.png",
          alt: "Table Styles gallery on the Table Design tab",
        },
        {
          type: "image",
          src: "/images/word/tables/tables_style_applied.png",
          alt: "Table with a formatted style applied",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does the Merge Cells command do in a Word table?",
          options: [
            "Combines selected adjacent cells into a single cell",
            "Copies the content of one cell into all selected cells",
            "Automatically fills cells with sequential numbers",
            "Removes the borders between all cells in the table",
          ],
          correctIndex: 0,
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
        "Open the practice table and add a new row at the bottom.",
        "Delete the third column from the table.",
        "Merge the cells in the first row across all columns to create a spanning header.",
        "Use AutoFit Contents to resize all columns to fit their text.",
        "Apply a Table Style of your choice from the Table Design tab.",
      ],
    },
  ],
},

/* ============================================================
LESSON 3 – INSERTING CHARTS
============================================================ */

{
  slug: "inserting-charts",
  title: "Inserting Charts",
  description:
    "Learn how to insert and customize charts in Microsoft Word to visually represent data from a built-in spreadsheet editor.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/Jqa9A3FuUss",

  practiceFiles: [
    {
      name: "Inserting Charts Practice File",
      url: "/practice/word/module-5/charts/word_charts_practice.docx",
    },
  ],

  sections: [

    {
      heading: "Inserting a Chart",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Insert → Chart. The Insert Chart dialog opens with a list of chart types on the left. Select the type you want (such as Column, Bar, Pie, or Line), choose a subtype, and click OK.",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_insert_command.png",
          alt: "Chart button on the Insert tab",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_insert_dialog.png",
          alt: "Insert Chart dialog with chart types",
        },
      ],
    },

    {
      heading: "Editing Chart Data",
      blocks: [
        {
          type: "paragraph",
          text:
            "After inserting a chart, a small Excel-style spreadsheet opens next to it. Edit the sample data in this window — the chart updates automatically as you type. Close the data window when you are done.",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_data_spreadsheet.png",
          alt: "Chart data spreadsheet editor",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_data_result.png",
          alt: "Chart updated to reflect new data",
        },
      ],
    },

    {
      heading: "Changing the Chart Type",
      blocks: [
        {
          type: "paragraph",
          text:
            "Right-click the chart and choose Change Chart Type to switch to a different visualization. You can switch between column, bar, line, pie, and many other types.",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_change_type_menu.png",
          alt: "Change Chart Type option in right-click menu",
        },
      ],
    },

    {
      heading: "Chart Design and Format Tabs",
      blocks: [
        {
          type: "paragraph",
          text:
            "Clicking a chart reveals two contextual tabs: Chart Design (for layouts, styles, and data) and Format (for shapes, fills, and text formatting). Use these to customize the appearance of your chart.",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_contextual_tabs.png",
          alt: "Chart Design and Format contextual tabs",
        },
      ],
    },

    {
      heading: "Adding Chart Titles and Labels",
      blocks: [
        {
          type: "paragraph",
          text:
            "On the Chart Design tab, click Add Chart Element to add or adjust chart titles, axis titles, data labels, legends, and gridlines.",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_add_element_menu.png",
          alt: "Add Chart Element menu",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_title_added.png",
          alt: "Chart with a title and data labels",
        },
      ],
    },

    {
      heading: "Applying a Chart Style",
      blocks: [
        {
          type: "paragraph",
          text:
            "In the Chart Design tab, browse the Chart Styles gallery to quickly apply a coordinated color scheme and style to the entire chart.",
        },
        {
          type: "image",
          src: "/images/word/charts/charts_style_gallery.png",
          alt: "Chart Styles gallery on the Chart Design tab",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What opens automatically when you insert a chart in Word?",
          options: [
            "A file browser to import chart data from a CSV file",
            "A small spreadsheet editor where you enter the chart data",
            "A wizard that asks you to choose colors and fonts",
            "The Format Cells dialog from Microsoft Excel",
          ],
          correctIndex: 1,
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
        "Insert a Column chart into the practice document.",
        "Replace the sample data with your own values (at least 3 categories, 2 series).",
        "Add a chart title.",
        "Add data labels to the chart.",
        "Change the chart type to a Bar chart.",
        "Apply a chart style from the Chart Design tab.",
      ],
    },
  ],
},

/* ============================================================
LESSON 4 – MAIL MERGE BASICS
============================================================ */

{
  slug: "mail-merge-basics",
  title: "Mail Merge Basics",
  description:
    "Learn how to use Mail Merge in Word to automatically generate personalized letters, envelopes, and labels from a data source.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/Xh_gWMqF17c",

  practiceFiles: [
    {
      name: "Mail Merge Letter Template",
      url: "/practice/word/module-5/mail-merge/word_mailmerge_letter.docx",
    },
    {
      name: "Mail Merge Data Source",
      url: "/practice/word/module-5/mail-merge/word_mailmerge_data.xlsx",
    },
  ],

  sections: [

    {
      heading: "What Is Mail Merge?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Mail Merge combines a letter template (the main document) with a list of recipients (the data source) to automatically produce personalized copies. It is commonly used for form letters, address labels, and name badges.",
        },
      ],
    },

    {
      heading: "Step 1 – Start the Mail Merge",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Mailings → Start Mail Merge and choose the document type: Letters, Envelopes, Labels, or Email Messages. For this lesson, select Letters.",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_start_command.png",
          alt: "Start Mail Merge button on Mailings tab",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_start_menu.png",
          alt: "Mail merge document type options",
        },
      ],
    },

    {
      heading: "Step 2 – Select Recipients",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Select Recipients on the Mailings tab. Choose Use an Existing List to connect an Excel spreadsheet or CSV file as your data source. Navigate to the file and click Open, then select the correct sheet.",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_select_recipients.png",
          alt: "Select Recipients menu options",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_select_sheet_dialog.png",
          alt: "Select Table dialog to choose the data sheet",
        },
      ],
    },

    {
      heading: "Step 3 – Insert Merge Fields",
      blocks: [
        {
          type: "paragraph",
          text:
            "Place your cursor in the document where you want personalized data (such as the recipient's name). Click Insert Merge Field on the Mailings tab and choose the field from your data source, such as FirstName or City.",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_insert_field_button.png",
          alt: "Insert Merge Field button on Mailings tab",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_field_inserted.png",
          alt: "Merge field inserted in the letter template",
        },
      ],
    },

    {
      heading: "Step 4 – Preview Results",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Preview Results on the Mailings tab to see how the first recipient's data fills in. Use the arrow buttons to cycle through all records and confirm the merge looks correct.",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_preview_button.png",
          alt: "Preview Results button",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_preview_result.png",
          alt: "Letter preview with real recipient data filled in",
        },
      ],
    },

    {
      heading: "Step 5 – Finish & Merge",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Finish & Merge on the Mailings tab. Choose Edit Individual Documents to create a new document with all personalized copies combined, or Print Documents to send them directly to the printer.",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_finish_merge_menu.png",
          alt: "Finish & Merge options menu",
        },
        {
          type: "image",
          src: "/images/word/mail-merge/mailmerge_merged_document.png",
          alt: "Final merged document with multiple personalized letters",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is the role of the data source in a Mail Merge?",
          options: [
            "It stores the letter template with the merge fields",
            "It contains the list of recipients and their personalized information",
            "It controls the page layout and print settings",
            "It defines the styles and themes applied to each letter",
          ],
          correctIndex: 1,
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
        "Open the letter template practice file and start a Letters mail merge.",
        "Connect the provided Excel data source file as your recipient list.",
        "Insert merge fields for FirstName, LastName, and City in the appropriate places in the letter.",
        "Use Preview Results to check that the first three records display correctly.",
        "Use Finish & Merge → Edit Individual Documents to produce the complete set of letters.",
      ],
    },
  ],
},

];
