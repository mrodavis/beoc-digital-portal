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
  objectives: [
    "Insert a table using the grid, the dialog box, or by converting existing text",
    "Navigate a table with Tab and Shift+Tab without reaching for the mouse",
    "Choose a table over tabs when data has real rows and columns",
    "Mark a header row so the table stays readable across pages and for screen readers",
  ],
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
       heading: "Tables are for data, not for layout",
       blocks: [
         {
           type: "scenario",
           role: "You maintain the provider schedule at Lakeside Medical Associates.",
           text: "You build the weekly schedule using tabs and spaces to line up the columns. It looks correct. Then a provider's name gets one character longer, and every row below shifts out of alignment. You spend twenty minutes nudging tab stops that will break again next week.",
           task: "Use a real table so alignment is structural and survives editing.",
         },
         {
           type: "paragraph",
           text: "Anything with genuine rows and columns belongs in a table. Cells hold their alignment no matter what you type into them, columns resize as a unit, and the structure carries meaning that spaces and tabs cannot. Spaces produce alignment that is accidental — it holds only until the content changes.",
         },
         {
           type: "paragraph",
           text: "There is an accessibility dimension too. A screen reader announces a real table's structure — 'row 3, column 2, Dr. Okafor' — so a blind user can navigate it. Columns faked with tabs are read as one long run of words with no relationships at all.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "On any table that might run past one page, select the first row and turn on Table Layout > Repeat Header Rows. The headings then reprint at the top of every page, so page two is not an unlabeled grid of numbers. In Table Properties > Row, also uncheck 'Allow row to break across pages' to stop a single row splitting across a page boundary.",
         },
         {
           type: "tip",
           text: "Tab moves to the next cell and Shift+Tab moves back. Pressing Tab in the last cell adds a new row — which is the fastest way to build a table, since you never need to decide the row count in advance. To insert an actual tab character inside a cell, press Ctrl+Tab.",
         },
       ],
     },

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
          explanation: "Tab in the final cell adds a new row and puts the cursor in its first cell, so you can keep typing without breaking rhythm. This is why you never need to know the row count when you insert a table.",
          optionRationales: [
            "Shift+Tab moves backwards to the previous cell. Tab alone always moves forward.",
            "Correct. Word adds a new row and moves the cursor into it, letting you keep typing continuously.",
            "Converting a table to text is a deliberate command under Table Layout > Convert to Text. Tab never does this.",
            "Tab never adds columns. Columns are added from the Table Layout tab or by right-clicking and choosing Insert.",
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
  objectives: [
    "Add and delete rows and columns precisely",
    "Merge and split cells to build headers that span columns",
    "Resize columns to fit content using AutoFit",
    "Apply table styles that aid reading rather than decorate",
  ],
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
       heading: "Table formatting should make data easier to read",
       blocks: [
         {
           type: "scenario",
           role: "You are formatting the quarterly supply report at Lakeside Medical Associates.",
           text: "The table is accurate and nobody can read it. Every cell has a heavy border, the header row looks identical to the data, and the columns are all the same width whether they hold a date or a paragraph. The reader has to work to find anything.",
           task: "Format the table so its structure does the reading work — headers that announce themselves, columns sized to their content.",
         },
         {
           type: "paragraph",
           text: "Merging cells combines adjacent cells into one, which is how you build a header spanning several columns — a single 'Q3 Expenses' cell above three month columns. Splitting does the reverse. Both are on the Table Layout tab, and both operate on whatever you have selected.",
         },
         {
           type: "paragraph",
           text: "For column widths, AutoFit to Contents (Table Layout > AutoFit) sizes each column to what it actually holds, so the date column stops being as wide as the description column. It is one click and it fixes most of what makes a table look amateurish.",
         },
         {
           type: "table",
           caption: "Table formatting that helps, and formatting that hurts",
           columns: [
             "Do",
             "Instead of",
             "Because",
           ],
           rows: [
             [
               "Bold header row with a fill",
               "Headers styled like data",
               "The reader needs to see where the labels are",
             ],
             [
               "Light horizontal rules or banded rows",
               "A full grid of heavy borders",
               "Borders on every cell compete with the data for attention",
             ],
             [
               "Right-align numbers",
               "Left-align everything",
               "Aligned decimal points make columns of figures comparable at a glance",
             ],
             [
               "AutoFit to Contents",
               "Equal-width columns",
               "Column width should reflect what the column holds",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "Merged cells complicate screen reader navigation and can break sorting. Use them for genuine spanning headers, and avoid them inside the data area of a table someone may need to sort or read with assistive technology.",
         },
       ],
     },

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
          explanation: "Merge Cells combines the selected adjacent cells into one larger cell, keeping the contents of each. Its main use is a header that spans several columns.",
          optionRationales: [
            "Correct. Selected adjacent cells become a single cell, which is how you build a spanning header.",
            "That describes copying and pasting. Merging changes the structure of the table, not the contents of cells.",
            "Sequential numbering is not a Word table feature at all — that is Excel's fill handle. Merging alters structure only.",
            "Removing borders is a formatting change under Table Design > Borders. The cells remain separate; merging genuinely combines them.",
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
  objectives: [
    "Insert a chart in Word and edit its underlying data",
    "Choose a chart type that matches the question the data answers",
    "Add titles and labels so the chart is readable without explanation",
    "Decide when to build the chart in Excel and link it instead",
  ],
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
       heading: "The chart type is an argument about the data",
       blocks: [
         {
           type: "scenario",
           role: "You are preparing the quarterly report at Lakeside Medical Associates.",
           text: "You need to show how supply spending changed across six months. You choose a pie chart because it looks good. A pie chart cannot show change over time — it shows composition at one moment. The reader sees six slices and no trend, and asks you to redo it.",
           task: "Match the chart type to the question, so the picture answers what the reader is actually asking.",
         },
         {
           type: "paragraph",
           text: "Inserting a chart in Word opens a small spreadsheet window holding the chart's data. Replace the sample values with yours and the chart redraws. That data lives inside the Word file, which is convenient for a small static chart and a poor choice for figures that update — for those, build the chart in Excel and paste it as a link, so refreshing the workbook updates the document.",
         },
         {
           type: "table",
           caption: "Choosing a chart type",
           columns: [
             "The question",
             "Chart",
             "Why",
           ],
           rows: [
             [
               "How did this change over time?",
               "Line",
               "A continuous line is read as continuity — the shape is the trend",
             ],
             [
               "How do these categories compare?",
               "Column or bar",
               "Length is the easiest visual quantity to compare accurately",
             ],
             [
               "What share of the total is each part?",
               "Pie",
               "Only for parts of one whole, and only with five or fewer slices",
             ],
             [
               "Are these two things related?",
               "Scatter",
               "Shows the relationship between two measures directly",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "A column chart whose value axis does not start at zero exaggerates differences, because the reader compares bar lengths and those lengths no longer represent the values. Truncating the axis on a column chart is a well-known way to mislead, including by accident. Line charts may start elsewhere when the variation matters more than the absolute level, but say so in the axis label.",
         },
         {
           type: "tip",
           text: "Give every chart a title that states the finding, not the subject. 'Supply spending rose 18% in Q3' tells the reader what to see. 'Supply Spending' makes them work it out for themselves, and some will not bother.",
         },
       ],
     },

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
          explanation: "Word opens a small embedded spreadsheet holding the chart's data, prefilled with sample values. Replace them with your own and the chart redraws immediately. That data is stored inside the Word file.",
          optionRationales: [
            "Word does not prompt for a CSV. You can paste data into the embedded sheet, but no file browser opens.",
            "Correct. A small spreadsheet window opens with sample data for you to replace.",
            "There is no color-and-font wizard. You pick the chart type first, then style it afterwards from the Chart Design tab.",
            "Format Cells is an Excel dialog for number formatting. Inserting a chart in Word does not open it.",
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
  objectives: [
    "Explain the roles of the main document and the data source",
    "Run a mail merge from start to finish using the Mailings tab",
    "Preview merged results and catch data problems before printing",
    "Judge when mail merge saves time and when it is overkill",
  ],
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
       heading: "One letter, many recipients, no retyping",
       blocks: [
         {
           type: "scenario",
           role: "You handle recall notices at Lakeside Medical Associates.",
           text: "Two hundred and forty patients are due for an annual visit. Each needs a letter with their name, address, and appointment date. Typed individually, that is two full days of work and a guarantee that at least one letter carries the wrong name.",
           task: "Produce all 240 personalized letters from one template and one list, in about fifteen minutes.",
         },
         {
           type: "paragraph",
           text: "Mail merge combines two things. The main document is the letter — everything that stays the same, plus merge fields marking where personal data belongs. The data source is the list — a Word table, an Excel sheet, or Outlook contacts — with one row per recipient and one column per field. Merging produces one output letter per row.",
         },
         {
           type: "paragraph",
           text: "Most merge failures are data problems, not Word problems. Your data source needs a clean header row where every column has a distinct name, no blank rows in the middle, and consistent formatting — because whatever is in the cell is what appears in the letter. A date stored as text as '3/4' will print as '3/4', not as March 4.",
         },
         {
           type: "worked-example",
           title: "Producing 240 recall letters",
           task: "Merge a recall letter template with a patient list, verifying the output before anything reaches the printer.",
           steps: [
             {
               move: "Prepare the data source first, and open it to check it.",
               why: "The merge inherits every flaw in the list. Confirm one header row, distinct column names, no blank rows, and dates formatted the way they should appear. Fixing this after generating 240 letters means generating them again.",
             },
             {
               move: "Mailings > Start Mail Merge > Letters, then Select Recipients > Use an Existing List.",
               why: "This binds the letter to the data. Choosing Letters as the type tells Word to produce one page per record, as opposed to labels or envelopes, which lay out several records per sheet.",
             },
             {
               move: "Insert merge fields where personal data belongs, including the address block.",
               why: "Fields appear in chevrons as «FirstName». Use Address Block rather than assembling address lines from individual fields — it handles missing second address lines correctly instead of leaving a blank line in the middle of the address.",
             },
             {
               move: "Click Preview Results and step through several records, including the last one.",
               why: "This is the step that catches everything: a missing surname, a date that came through as a serial number, a patient whose name overflows the line. Check the first, a few in the middle, and the last — the last record is where truncated data sources reveal themselves.",
             },
             {
               move: "Finish & Merge > Edit Individual Documents, not straight to print.",
               why: "This produces a single document containing all 240 letters, which you can scroll and check before committing paper. Printing directly from the merge means the first sign of a problem is a stack of wrong letters.",
             },
           ],
           result: "240 verified personalized letters produced in one pass, checked before printing.",
           takeaway: "Clean the data first, preview several records including the last, and merge to a document before merging to the printer.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "A merged recall letter contains patient names and appointment details. Merge output is protected information: do not leave the merged document on a shared drive, do not email it as one file to anyone, and shred any misprints rather than binning them. The convenience of generating 240 letters at once is also the risk of exposing 240 patients at once.",
         },
       ],
     },

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
          explanation: "The data source is the list — one row per recipient, one column per field. The main document holds the letter and the merge fields. Word combines them to produce one output letter per row of the data source.",
          optionRationales: [
            "That describes the main document, which holds the letter text and the field placeholders.",
            "Correct. The data source is the recipient list, with one row per person and one column per piece of information.",
            "Page layout and print settings belong to the main document and the print dialog, not to the data source.",
            "Styles and themes come from the main document. The data source supplies only content.",
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
