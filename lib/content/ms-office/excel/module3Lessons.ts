import { Lesson } from "@/types/lesson";

export const excelModule3Lessons: Lesson[] = [

  // ============================================================
  // LESSON 10
  // ============================================================
{
  slug: "working-with-multiple-worksheets",
  title: "Working with Multiple Worksheets",
  description:
    "Learn how to insert, rename, move, copy, group, and organize worksheets within a workbook.",
  objectives: [
    "Add, rename, reorder, color, and delete worksheets",
    "Reference a cell on another sheet in a formula",
    "Group sheets to edit several at once",
    "Structure a workbook so data, calculations, and output are separated",
  ],
  
  videoUrl: "https://www.youtube.com/embed/qRShQc-v3LI",

    practiceFiles: [
      {
        name: "Multiple Worksheets Practice File",
        url: "/practice/excel/module-3/multiple-worksheets/Excel_MultipleSheets_Practice.xlsx",
      },
    ],
  sections: [
    {
      heading: "One sheet per purpose",
      blocks: [
        {
          type: "scenario",
          role: "You rebuild the supply tracker at Lakeside Medical Associates.",
          text: "The current workbook has everything on one sheet: raw orders, a summary, notes, and three abandoned attempts at a chart, side by side. Nobody can tell which region is authoritative, and every sort risks scrambling something unrelated.",
          task: "Separate the workbook into sheets with distinct jobs, so each region has one purpose.",
        },
        {
          type: "paragraph",
          text: "A durable convention is three kinds of sheet: raw data that is only ever added to, calculations that read from it, and output that people actually look at. Keeping them apart means a change to a formula cannot corrupt source data, and a person reading the summary never has to scroll past 900 rows to find it.",
        },
        {
          type: "paragraph",
          text: "Cross-sheet references use the sheet name and an exclamation mark: =Data!C7, or ='Q3 Orders'!C7 when the name contains a space. Rather than typing them, start the formula, then click the other sheet's tab and the cell — Excel writes the reference correctly, including quoting names that need it.",
        },
        {
          type: "callout",
          variant: "warning",
          text: "Grouping sheets — clicking one tab, then Ctrl+clicking others — applies every edit to all of them at once. It is efficient for building twelve identical monthly sheets and dangerous afterwards, because it is easy to forget the group is active and overwrite eleven sheets with one change. Right-click and Ungroup Sheets the moment you are finished, and check the title bar, which says [Group] while grouping is on.",
        },
        {
          type: "tip",
          text: "Right-click a tab to set a Tab Color. Coloring input sheets one color and output sheets another gives anyone opening the workbook an immediate sense of its structure, without a word of documentation.",
        },
      ],
    },
    {
      heading: "Introduction",
      blocks: [
        {
          type: "paragraph",
          text:
            "Every workbook contains at least one worksheet by default. When working with large amounts of data, you can create multiple worksheets to better organize your information and make it easier to manage.",
        },
        {
          type: "paragraph",
          text:
            "You can also group worksheets together to make changes to multiple sheets at the same time.",
        },
      ],
    },

    {
      heading: "Insert a New Worksheet",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Locate and select the New Sheet (+) button near the bottom-right corner of the Excel window.",
            "A new blank worksheet will appear.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_new.png",
          alt: "New worksheet button",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_new_done.png",
          alt: "New worksheet inserted",
        },
      ],
    },

    {
      heading: "Copy a Worksheet",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel allows you to duplicate an existing worksheet without copying and pasting content manually.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Right-click the worksheet you want to copy.",
            "Select Move or Copy.",
            "Choose where the sheet should appear.",
            "Check Create a copy and click OK.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_copy_rightclick.png",
          alt: "Right-click move or copy",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_copy_dialog.png",
          alt: "Move or copy dialog box",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_copy_done.png",
          alt: "Copied worksheet",
        },
      ],
    },

    {
      heading: "Rename a Worksheet",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Right-click the worksheet tab.",
            "Select Rename.",
            "Type the desired name and press Enter.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_rename_rightclick.png",
          alt: "Rename worksheet option",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_rename_done.png",
          alt: "Worksheet renamed",
        },
      ],
    },

    {
      heading: "Move a Worksheet",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Click and drag the worksheet tab.",
            "Release when the black arrow appears in the desired location.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_move_icon.png",
          alt: "Drag worksheet tab",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_move_done.png",
          alt: "Worksheet moved",
        },
      ],
    },

    {
      heading: "Change Worksheet Tab Color",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Right-click the worksheet tab.",
            "Hover over Tab Color.",
            "Select the desired color.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_color_rightclick.png",
          alt: "Tab color menu",
        },
      ],
    },

    {
      heading: "Delete a Worksheet",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Right-click the worksheet tab.",
            "Select Delete.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_delete_rightclick.png",
          alt: "Delete worksheet option",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_delete_done.png",
          alt: "Delete worksheet done",
        },
      ],
    },

    {
      heading: "Switching Between Worksheets",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can click worksheet tabs to switch between sheets. For large workbooks, right-click the scroll arrows in the lower-left corner to see a list of all worksheets.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_scroll_list.png",
          alt: "Worksheet navigation list",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_scroll_list_dialog.png",
          alt: "Worksheet navigation list",
        },
      ],
    },

    {
      heading: "Grouping and Ungrouping Worksheets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Grouping worksheets allows you to make changes to multiple sheets at the same time.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Hold the Ctrl key.",
            "Click each worksheet tab you want to group.",
            "Release Ctrl once selected.",
          ],
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_group_select.png",
          alt: "Grouped worksheets selected",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_group_during.png",
          alt: "Grouped worksheets active",
        },
        {
          type: "paragraph",
          text:
            "To ungroup worksheets, right-click any grouped tab and select Ungroup Sheets.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/multiple-worksheets/sheets_ungroup_rightclick.png",
          alt: "Ungroup sheets option",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "How do you rename a worksheet tab in Excel?",
          options: [
            "Go to File → Rename Sheet",
            "Press F2 while the sheet is selected",
            "Double-click the tab and type a new name",
            "Use the Format menu on the Home tab",
          ],
          correctIndex: 2,
          explanation: "Double-clicking a sheet tab puts its name into edit mode so you can type a new one. Right-click > Rename does the same thing.",
          optionRationales: [
            "There is no Rename Sheet command in Backstage view. Sheet operations live on the tab's own context menu.",
            "F2 edits the active cell's contents, not the sheet name.",
            "Correct. Double-click the tab and type the new name.",
            "The Home tab's Format menu does include Rename Sheet, but double-clicking the tab is the direct method and the one people actually use.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a new worksheet and rename it Q1 Summary.",
        "Move the Expenses Summary worksheet to the far right.",
        "Move the Q1 Summary worksheet so it appears between March and April.",
        "Create a copy of the Expenses Summary worksheet using Move or Copy.",
        "Change the January tab color to blue and the February tab color to red.",
        "Group the worksheets September, October, and November.",
      ],
    },
    {
      type: "paragraph",
      text:
        "When you're finished, your workbook should resemble the example below:",
    },
    {
      type: "image",
      src: "/images/excel/module-3/multiple-worksheets/sheets_group_done.png",
      alt: "Completed worksheet layout",
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
  objectives: [
    "Find values and formulas across a worksheet or workbook",
    "Use Replace All safely with Match case and whole-cell matching",
    "Search within formulas as well as displayed values",
    "Recognize when Find and Replace is the wrong tool for a data problem",
  ],
  duration: "8 min",

  videoUrl: "https://www.youtube.com/embed/hmizmgOjNYo",

  practiceFiles: [
    {
      name: "Find and Replace Practice File",
      url: "/practice/excel/module-3/find-replace/Excel_FindReplace_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "Replace All reaches further than you think",
       blocks: [
         {
           type: "scenario",
           role: "You standardize vendor names in the supply tracker at Lakeside Medical Associates.",
           text: "You replace 'Med' with 'Medical' across the sheet. 'MedSupply Co' becomes 'MedicalSupply Co', 'Medline' becomes 'Medicalline', and a formula referencing a defined name called MedRate breaks entirely. One click, several hundred cells.",
           task: "Constrain the search before running it, and know what Replace can reach.",
         },
         {
           type: "paragraph",
           text: "Excel's Find and Replace has an option Word does not: 'Match entire cell contents.' It requires the whole cell to equal your search term rather than merely containing it, and it is the single most effective protection against a runaway replacement in a data column.",
         },
         {
           type: "paragraph",
           text: "The Options button also exposes 'Look in,' which decides whether Excel searches Values, Formulas, or Comments. Searching Formulas is how you find every cell referencing a particular sheet or hard-coded number — genuinely useful when auditing an inherited workbook. It is also how a careless replacement damages formulas rather than data.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Before any Replace All on a workbook you cannot easily rebuild, save a copy. Replace All is a single undo step in principle, but if you save, close, or run several operations before noticing the damage, undo will not reach it. Ten seconds for a copy is cheap against rebuilding a data set.",
         },
       ],
     },

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

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which keyboard shortcut opens the Replace dialog in Excel?",
          options: [
            "Ctrl + F",
            "Ctrl + G",
            "Ctrl + H",
            "Ctrl + R",
          ],
          correctIndex: 2,
          explanation: "Ctrl+H opens Find and Replace with the Replace tab active. Ctrl+F opens Find alone, which is what you want when locating data rather than changing it.",
          optionRationales: [
            "Ctrl+F opens Find, which locates values but does not replace them.",
            "Ctrl+G opens Go To, which jumps to a specified reference or named range.",
            "Correct. Ctrl+H opens the Replace tab, ready to substitute one value for another.",
            "Ctrl+R fills right, copying the leftmost cell of a selection across it — a fill command, not a search.",
          ],
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
// ============================================================
// LESSON – CHECKING SPELLING
// ============================================================

{
    slug: "checking-spelling",
    title: "Checking Spelling in Excel",
    description:
        "Learn how to use Excel’s Spell Check tool to identify and correct spelling errors before sharing a workbook.",
    objectives: [
      "Run spell check across a worksheet and a whole workbook",
      "Use Add to Dictionary and AutoCorrect appropriately",
      "Explain why spell check cannot catch the errors that matter most in Excel",
      "Build validation that catches data errors spell check never will",
    ],
    duration: "4 min",

    practiceFiles: [
        {
        name: "Check Spelling Practice File",
        url: "/practice/excel/module-3/spelling/Excel_CheckSpelling_Practice.xlsx",
        },
    ],

    sections: [

      {
         heading: "Spell check does not check your numbers",
         blocks: [
           {
             type: "scenario",
             role: "You prepare the quarterly supply report at Lakeside Medical Associates.",
             text: "Spell check reports no errors. The report goes to the board with a quantity entered as 1200 instead of 120, which inflates the supply forecast by nine thousand dollars. Every word in the workbook is spelled correctly.",
             task: "Use spell check for what it can do, and build separate checks for the errors that actually cost money.",
           },
           {
             type: "paragraph",
             text: "Spell check examines text in cells, headers, and comments. It cannot evaluate whether a number is plausible, whether a formula references the right range, or whether a value landed in the right row. In a spreadsheet, those are the errors with consequences.",
           },
           {
             type: "paragraph",
             text: "Data Validation (Data > Data Validation) is the tool that does catch them. Restrict a quantity column to whole numbers between 1 and 500 and Excel rejects 1200 at the moment of entry, with a message you write yourself. Catching an error at entry is far cheaper than finding it in a board report.",
           },
           {
             type: "tip",
             text: "Add to Dictionary is right for terms that are genuinely correct and recur — drug names, vendor names, clinical abbreviations. Adding a word you are not certain about teaches Excel to stop flagging a real mistake, so verify the spelling before adding it.",
           },
         ],
       },

        // ------------------------------------------------------------
        // Why Spell Check Matters
        // ------------------------------------------------------------
        {
        heading: "Why Use Spell Check?",
        blocks: [
            {
            type: "paragraph",
            text:
                "Before sharing a workbook, it’s important to check for spelling errors. Excel includes a built-in Spell Check tool that scans your worksheet for misspelled words.",
            },
            {
            type: "paragraph",
            text:
                "Unlike Microsoft Word, Excel does not check grammar or spelling as you type. Spell Check must be run manually.",
            },
        ],
        },

        // ------------------------------------------------------------
        // Running Spell Check
        // ------------------------------------------------------------
        {
        heading: "Running Spell Check",
        blocks: [
            {
            type: "paragraph",
            text:
                "To begin spell check, go to the Review tab and click Spelling.",
            },
            {
            type: "image",
            src: "/images/excel/module-3/spelling/spelling-review-tab.png",
            alt: "Spelling command on Review tab",
            },
            {
            type: "paragraph",
            text:
                "The Spelling dialog box will appear. Excel will highlight words that are not found in the dictionary and provide suggestions.",
            },
            {
            type: "image",
            src: "/images/excel/module-3/spelling/spelling-dialog.png",
            alt: "Spelling dialog box with suggestions",
            },
        ],
        },

        // ------------------------------------------------------------
        // Correcting Errors
        // ------------------------------------------------------------
        {
        heading: "Correcting Spelling Errors",
        blocks: [
            {
            type: "paragraph",
            text:
                "Select the correct spelling from the Suggestions list and click Change to fix the error. Use Change All to correct every instance of that word in the worksheet.",
            },

        ],
        },

        // ------------------------------------------------------------
        // Ignoring Words
        // ------------------------------------------------------------
        {
        heading: "Ignoring or Adding Words",
        blocks: [
            {
            type: "paragraph",
            text:
                "Spell Check may flag names or brand terms that are actually correct. You can choose Ignore Once, Ignore All, or Add to Dictionary.",
            },
            {
            type: "list",
            ordered: false,
            items: [
                "Ignore Once – Skips this instance.",
                "Ignore All – Skips all instances in the worksheet.",
                "Add to Dictionary – Saves the word so Excel won’t flag it again.",
            ],
            },
        ],
        },

        // ------------------------------------------------------------
        // Completion Message
        // ------------------------------------------------------------
        {
        heading: "Spell Check Complete",
        blocks: [
            {
            type: "paragraph",
            text:
                "After Excel finishes reviewing the worksheet, a confirmation message will appear.",
            },
            {
            type: "image",
            src: "/images/excel/module-3/spelling/spelling-complete.png",
            alt: "Spell check complete message",
            },
        ],
        },

        {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What happens when you click 'Add to Dictionary' in Spell Check?",
            options: [
              "The word is deleted from the worksheet",
              "The word is automatically corrected to the nearest suggestion",
              "The word is saved so Excel won't flag it as an error again",
              "All instances of the word are replaced with the first suggestion",
            ],
            correctIndex: 2,
            explanation: "Add to Dictionary stores the word in your custom dictionary so Excel accepts it from then on, in this and every future workbook. Use it for correct terms that recur — and verify the spelling first, because you are switching off future warnings.",
            optionRationales: [
              "Nothing is deleted. The word stays exactly as you typed it.",
              "That describes Change, which applies the selected suggestion. Add to Dictionary accepts your spelling as correct.",
              "Correct. The word is saved to your custom dictionary and will not be flagged again.",
              "That describes Change All. Add to Dictionary changes nothing in the worksheet.",
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
            "Run Spell Check from the Review tab.",
            "Correct the misspelled words 'coffe' and 'medum'.",
            "Ignore the spelling suggestion for the word 'Amanecer'.",
            "Finish spell check and confirm the completion message appears.",
        ],
        },
        {
        type: "image",
        src: "/images/excel/module-3/spelling/spelling-challenge-final.png",
        alt: "Final invoice after spell check",
        },
    ],
},

  // ============================================================
  // LESSON 13
  // ============================================================
  {
    slug: "page-layout-and-printing",
    title: "Page Layout and Printing",
    description:
      "Learn how to control margins, orientation, scaling, print area, print titles, and page breaks to produce professional printed reports.",
    objectives: [
      "Set a print area and control what appears on each page",
      "Repeat header rows on every printed page",
      "Use Page Break Preview to control pagination",
      "Fit a wide worksheet onto a sensible number of pages",
    ],
    duration: "12 min",

    videoUrl: "https://www.youtube.com/embed/8XcFTeCu98k",

    practiceFiles: [
      {
        name: "Printing Practice File",
        url: "/practice/excel/module-3/page-layout-and-printing/Excel_PageLayoutPrint_Practice.xlsx",
      },
    ],

    sections: [

      {
         heading: "Spreadsheets print badly by default",
         blocks: [
           {
             type: "scenario",
             role: "You print the supply report for a meeting at Lakeside Medical Associates.",
             text: "You press print. Fourteen pages emerge: columns A through F on pages one to seven, columns G through J on pages eight to fourteen, with no headers on any page but the first. Nobody can reassemble it into anything readable.",
             task: "Configure the print setup so a spreadsheet becomes a document someone can read on paper.",
           },
           {
             type: "paragraph",
             text: "The default assumes you want everything at full size, which almost never suits a worksheet wider than a page. Four settings fix nearly every printing problem, and they take about a minute.",
           },
           {
             type: "table",
             caption: "The four settings that fix spreadsheet printing",
             columns: [
               "Setting",
               "Where",
               "What it does",
             ],
             rows: [
               [
                 "Print Area",
                 "Page Layout > Print Area > Set",
                 "Prints only the selected range, not every stray cell",
               ],
               [
                 "Print Titles",
                 "Page Layout > Print Titles > Rows to repeat at top",
                 "Repeats the header row on every page",
               ],
               [
                 "Fit All Columns on One Page",
                 "File > Print > Scaling",
                 "Stops columns splitting across separate pages",
               ],
               [
                 "Orientation",
                 "Page Layout > Orientation",
                 "Landscape suits most worksheets, which are wider than tall",
               ],
             ],
           },
           {
             type: "tip",
             text: "Page Break Preview (View tab) shows blue lines marking where pages will break, and you can drag them. It is far more direct than adjusting scaling percentages and guessing — you see the pagination and set it explicitly.",
           },
           {
             type: "callout",
             variant: "warning",
             text: "'Fit Sheet on One Page' will shrink a large worksheet until it is genuinely unreadable — six-point type is common. If a sheet will not fit legibly, print it in sections with repeated headers, or reconsider whether the recipient needs all the columns.",
           },
         ],
       },

      // ------------------------------------------------------------
      // Accessing the Print Pane
      // ------------------------------------------------------------
      {
        heading: "Accessing the Print Pane",
        blocks: [
          {
            type: "paragraph",
            text:
              "To begin printing in Excel, select the File tab to open Backstage View, then choose Print. The Print pane allows you to preview and configure all print settings.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_pane_file_tab.png",
            alt: "File tab in Excel",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_pane_print_pane.png",
            alt: "Excel Print pane",
          },
        ],
      },

      // ------------------------------------------------------------
      // Choosing What to Print
      // ------------------------------------------------------------
      {
        heading: "Choosing What to Print",
        blocks: [
          {
            type: "paragraph",
            text:
              "From the Settings section, you can choose to print Active Sheets, the Entire Workbook, or a Selection. Always verify the preview before printing.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_print_active_select.png",
            alt: "Print active sheets option",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_print_entire_workbook.png",
            alt: "Print entire workbook option",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_print_selection_select.png",
            alt: "Print selection option",
          },
        ],
      },

      // ------------------------------------------------------------
      // Setting a Print Area
      // ------------------------------------------------------------
      {
        heading: "Setting a Print Area",
        blocks: [
          {
            type: "paragraph",
            text:
              "To define exactly what prints, select the desired cells, go to the Page Layout tab, click Print Area, and choose Set Print Area.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_print_area.png",
            alt: "Set print area command",
          },
        ],
      },

      // ------------------------------------------------------------
      // Orientation
      // ------------------------------------------------------------
      {
        heading: "Changing Page Orientation",
        blocks: [
          {
            type: "paragraph",
            text:
              "Excel offers Portrait (vertical) and Landscape (horizontal) orientation. Landscape is best for wide data tables.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_orientation_preview.png",
            alt: "Landscape orientation preview",
          },
        ],
      },

      // ------------------------------------------------------------
      // Scaling
      // ------------------------------------------------------------
      {
        heading: "Using Scaling Options",
        blocks: [
          {
            type: "paragraph",
            text:
              "If your worksheet content is cut off, use scaling options such as 'Fit All Columns on One Page' or 'Fit Sheet on One Page'. Be aware that scaling reduces text size.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_fit_preview.png",
            alt: "Fit columns to one page preview",
          },
        ],
      },

      // ------------------------------------------------------------
      // Margins
      // ------------------------------------------------------------
      {
        heading: "Adjusting Margins",
        blocks: [
          {
            type: "paragraph",
            text:
              "Margins control the spacing between your worksheet content and the page edge. Choose presets like Normal, Wide, or Narrow, or manually adjust margins in the preview pane.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_margins_preview.png",
            alt: "Margins dropdown",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_margins_show.png",
            alt: "Show margins in preview",
          },
        ],
      },

      // ------------------------------------------------------------
      // Print Titles
      // ------------------------------------------------------------
      {
        heading: "Using Print Titles",
        blocks: [
          {
            type: "paragraph",
            text:
              "Use Print Titles to repeat header rows or columns on every printed page. Go to Page Layout → Print Titles and specify rows to repeat at top and columns to repeat at left.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_print_titles_ribbon.png",
            alt: "Print titles ribbon command",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_print_titles_setup_rows_callout.png",
            alt: "Rows to repeat at top field",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_print_titles_setup_ok.png",
            alt: "Print titles setup confirmation",
          },
        ],
      },

      // ------------------------------------------------------------
      // Page Break Preview
      // ------------------------------------------------------------
      {
        heading: "Adjusting Page Breaks",
        blocks: [
          {
            type: "paragraph",
            text:
              "Switch to Page Break Preview to manually control where printed pages divide. Drag the blue lines to reposition page breaks.",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_break_view.png",
            alt: "Page break preview mode",
          },
          {
            type: "image",
            src: "/images/excel/module-3/page-layout-and-printing/layout_break_drag1.png",
            alt: "Dragging page break line",
          },
        ],
      },

      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What does setting a print area do in Excel?",
            options: [
              "Adds a colored border around the selected cells",
              "Saves the selected cells as a separate file",
              "Limits printing to only the selected cells",
              "Automatically fits all columns to one page",
            ],
            correctIndex: 2,
            explanation: "The print area defines the range Excel will print, so everything outside it is ignored. This is how you print a summary without also printing the 900 rows of source data beside it.",
            optionRationales: [
              "The print area shows as a thin dashed line on screen, but that is an indicator rather than the point of the feature.",
              "Nothing is saved as a separate file. The print area is a setting stored in the workbook.",
              "Correct. Only the cells inside the print area are printed.",
              "Fitting columns to a page is a scaling setting under File > Print. The print area controls what prints, not how it is scaled.",
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
          "Open the East Coast worksheet.",
          "Repeat row 1 at the top and column A at the left.",
          "Move the page break so rows 1–40 print on the first page.",
          "Change orientation to Landscape.",
          "Set margins to Narrow.",
          "Use Fit All Columns on One Page.",
          "Verify the preview matches the expected layout.",
        ],
      },
      {
        type: "image",
        src: "/images/excel/module-3/page-layout-and-printing/printing and page layout challenge.png",
        alt: "Final expected print preview",
      },
    ],
  },
  // ============================================================
// LESSON 14
// ============================================================

{
  slug: "comments-and-coauthoring",
  title: "Comments and Co-authoring",
  description:
    "Learn how to add, edit, delete, and manage comments, collaborate in real time, and restore previous versions of a workbook.",
  objectives: [
    "Add threaded comments and notes, and explain the difference",
    "Co-author a workbook stored in OneDrive or SharePoint",
    "Manage sharing permissions on a workbook",
    "Judge what should never be written in a comment",
  ],
  duration: "11 min",

  videoUrl: "https://www.youtube.com/embed/eK23Fzttlyo",

  practiceFiles: [
    {
      name: "Comments & Track Changes Practice File",
      url: "/practice/excel/module-3/comments/Excel_TrackChangesComments_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "Comments explain the reasoning behind a number",
       blocks: [
         {
           type: "scenario",
           role: "You forecast supply needs at Lakeside Medical Associates.",
           text: "One line in the budget is 40% above last year. You know why — a vendor contract ended and the replacement costs more. Six months later, nobody remembers, and the figure looks like an error to everyone reviewing it.",
           task: "Record the reasoning where the number lives, so the workbook explains itself.",
         },
         {
           type: "paragraph",
           text: "A spreadsheet shows what, rarely why. Comments attach the reasoning to the exact cell, so the explanation is found by whoever questions the number — including you, later. This is one of the highest-value habits in spreadsheet work and one of the least practiced.",
         },
         {
           type: "paragraph",
           text: "Modern Excel distinguishes threaded Comments, which support replies and are built for discussion, from Notes, which are the older single-author annotations. Use Comments for conversation and Notes for standing documentation such as 'source: vendor invoice 4471.'",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Comments travel with the file. A frank remark about a colleague or a vendor is visible to everyone the workbook is ever sent to, and comments are among the most common things people forget to remove before sharing. Write every comment as though the subject will read it, and run Document Inspector before the file leaves the practice.",
         },
       ],
     },

    // ------------------------------------------------------------
    // Sharing a Workbook
    // ------------------------------------------------------------
    {
      heading: "Sharing a Workbook",
      blocks: [
        {
          type: "paragraph",
          text:
            "To collaborate with others, click the Share button in the top-right corner of Excel.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_share_button.png",
          alt: "Share button in Excel",
        },
        {
          type: "paragraph",
          text:
            "Upload the workbook to OneDrive if prompted. Then enter the recipient’s email address and choose whether they Can edit or Can view.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_share_onedrive.png",
          alt: "Upload to OneDrive prompt",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_share_email.png",
          alt: "Entering email address in Share pane",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_share_can_edit.png",
          alt: "Can Edit dropdown option",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_share_share.png",
          alt: "Click Share button",
        },
      ],
    },

    // ------------------------------------------------------------
    // Adding Comments
    // ------------------------------------------------------------
    {
      heading: "Adding Comments",
      blocks: [
        {
          type: "paragraph",
          text:
            "Comments allow you to leave feedback without changing the contents of a cell. Select a cell, go to the Review tab, and click New Comment.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_comment_new.png",
          alt: "New Comment button on Review tab",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_comment_type.png",
          alt: "Typing a comment",
        },
        {
          type: "paragraph",
          text:
            "Cells with comments display a red indicator in the corner. Select the cell to view the comment.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_comment_indicator_close.png",
          alt: "Cell with comment indicator",
        },
      ],
    },

    // ------------------------------------------------------------
    // Editing Comments
    // ------------------------------------------------------------
    {
      heading: "Editing Comments",
      blocks: [
        {
          type: "paragraph",
          text:
            "To edit a comment, select the cell and click Edit Comment on the Review tab.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_edit_click.png",
          alt: "Edit Comment button",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_edit_type.png",
          alt: "Editing comment text",
        },
      ],
    },

    // ------------------------------------------------------------
    // Showing and Hiding Comments
    // ------------------------------------------------------------
    {
      heading: "Showing and Hiding Comments",
      blocks: [
        {
          type: "paragraph",
          text:
            "To display every comment at once, click Show All Comments on the Review tab.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_show_click.png",
          alt: "Show All Comments button",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_show_comments.png",
          alt: "All comments displayed",
        },
        {
          type: "paragraph",
          text:
            "You can also show or hide a single comment by selecting the cell and clicking Show/Hide Comment.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_show_one.png",
          alt: "Show or hide individual comment",
        },
      ],
    },

    // ------------------------------------------------------------
    // Deleting Comments
    // ------------------------------------------------------------
    {
      heading: "Deleting Comments",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove a comment, select the cell and click Delete in the Comments group on the Review tab.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_delete_select.png",
          alt: "Selecting comment to delete",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_delete_click.png",
          alt: "Delete comment button",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/track_delete_deleted.png",
          alt: "Comment deleted",
        },
      ],
    },

    // ------------------------------------------------------------
    // Co-authoring
    // ------------------------------------------------------------
    {
      heading: "Real-Time Co-authoring",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a workbook is shared through OneDrive, multiple users can edit at the same time. Each collaborator appears with a unique color indicator.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_coauthor_hover.png",
          alt: "Co-author hover indicator",
        },
      ],
    },

    // ------------------------------------------------------------
    // Version History
    // ------------------------------------------------------------
    {
      heading: "Restoring a Previous Version",
      blocks: [
        {
          type: "paragraph",
          text:
            "If changes were made that you want to undo, click the clock icon next to the Share button to open Version History.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_restore_clock.png",
          alt: "Version history clock icon",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_restore_version.png",
          alt: "Version history pane",
        },
        {
          type: "image",
          src: "/images/excel/module-3/comments/comments_restore_restore.png",
          alt: "Restore previous version",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What allows multiple people to edit an Excel file at the same time?",
          options: [
            "Enabling Track Changes from the Review tab",
            "Saving the file as a CSV and emailing it",
            "Sharing via OneDrive and using co-authoring",
            "Using the Protect Workbook feature",
          ],
          correctIndex: 2,
          explanation: "Co-authoring requires the workbook to be stored in OneDrive or SharePoint, which provides the sync channel that lets several people edit at once and see each other's changes.",
          optionRationales: [
            "Track Changes in Excel is a legacy feature for a different sharing model. It does not enable simultaneous editing.",
            "CSV files hold plain text with no collaboration support, and emailing copies creates the version conflicts co-authoring exists to prevent.",
            "Correct. Cloud storage in OneDrive or SharePoint is what makes co-authoring possible.",
            "Protect Workbook restricts what people can change. It limits editing rather than enabling shared editing.",
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
        "Add four comments to different cells.",
        "Edit one of the comments.",
        "Delete one comment.",
        "Use Show All Comments to display every comment.",
        "Open Version History and review a previous version.",
      ],
    },
    {
      type: "image",
      src: "/images/excel/module-3/comments/comments_challenge.png",
      alt: "Final challenge worksheet with comments",
    },
  ],
},

// ============================================================
// LESSON 15
// ============================================================

{
  slug: "inspecting-and-protecting-workbooks",
  title: "Inspecting and Protecting Workbooks",
  description:
    "Learn how to inspect your workbook for hidden information and protect it before sharing by using Document Inspector and Protect Workbook tools.",
  objectives: [
    "Use Document Inspector to find hidden and personal data",
    "Protect a worksheet so formulas cannot be overwritten",
    "Explain the difference between protecting a sheet and protecting a workbook",
    "Understand the limits of Excel's password protection",
  ],
  duration: "8 min",

  videoUrl: "https://www.youtube.com/embed/fsXS_VSuBvs",

  practiceFiles: [
    {
      name: "Inspect and Protect Practice File",
      url: "/practice/excel/module-3/inspect-protect/Excel_InspectProtect_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "Protect the formulas, not the people",
       blocks: [
         {
           type: "scenario",
           role: "You built the supply tracker three staff members use daily at Lakeside Medical Associates.",
           text: "Within a fortnight, two formula cells have been overwritten with typed numbers. Nobody did it deliberately — they tabbed into the wrong cell and typed. The tracker now reports figures that are simply wrong, and nothing on screen indicates it.",
           task: "Lock the calculated cells and leave the data entry cells open, so the tool survives daily use.",
         },
         {
           type: "paragraph",
           text: "Sheet protection works in two stages, and the order surprises people. Every cell is marked Locked by default, but locking has no effect until the sheet is protected. So you first unlock the cells people should edit, then protect the sheet — which activates the lock on everything you did not unlock.",
         },
         {
           type: "worked-example",
           title: "Protecting a shared tracker",
           task: "Let three staff enter quantities and prices while making the formula columns impossible to overwrite by accident.",
           steps: [
             {
               move: "Select the data entry cells, then Format Cells > Protection and uncheck Locked.",
               why: "This is the step that feels backwards. You are unlocking the cells you want editable, because protection will lock everything else. Skipping straight to Protect Sheet locks the entire sheet and nobody can enter anything.",
             },
             {
               move: "Give the unlocked cells a distinct fill color.",
               why: "People should be able to see where they may type before they try. A consistent color for input cells prevents most of the confused clicking that protection would otherwise produce.",
             },
             {
               move: "Review > Protect Sheet, and leave 'Select unlocked cells' checked.",
               why: "This activates the locks. Leaving selection of unlocked cells enabled means staff can still tab through the sheet normally — protection should stop mistakes without making the tool awkward.",
             },
             {
               move: "Set a password only if you will still have it in a year, and record it somewhere durable.",
               why: "Sheet protection is designed to prevent accidents, not to resist attack — the passwords are trivially removable with freely available tools. Its real value is stopping honest mistakes, and a lost password locks you out of your own workbook for no security benefit.",
             },
           ],
           result: "A tracker three people use daily where the formulas cannot be overwritten by a stray keystroke.",
           takeaway: "Unlock first, then protect. And treat Excel protection as accident prevention rather than security.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Excel's worksheet and workbook passwords are not real security. They stop accidents and casual curiosity. If a workbook genuinely must be confidential, use File > Info > Protect Workbook > Encrypt with Password, which encrypts the file contents — and rely primarily on where the file is stored and who has access to it.",
         },
       ],
     },

    // ------------------------------------------------------------
    // Introduction
    // ------------------------------------------------------------
    {
      heading: "Why Inspect and Protect a Workbook?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Before sharing a workbook, you should remove hidden personal information and discourage unwanted editing. Excel provides tools such as Document Inspector and Protect Workbook to help finalize your file.",
        },
      ],
    },

    // ------------------------------------------------------------
    // Using Document Inspector
    // ------------------------------------------------------------
    {
      heading: "Using Document Inspector",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the File tab to open Backstage view. From the Info pane, select Check for Issues and then click Inspect Document.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_inspector_info.png",
          alt: "Check for Issues and Inspect Document option",
        },
        {
          type: "paragraph",
          text:
            "Excel may prompt you to save your file before continuing. Click Yes to proceed.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_inspector_warning.png",
          alt: "Save confirmation before running Document Inspector",
        },
        {
          type: "paragraph",
          text:
            "Leave all inspection options selected and click Inspect.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_inspector_inspect.png",
          alt: "Document Inspector options window",
        },
      ],
    },

    // ------------------------------------------------------------
    // Removing Hidden Information
    // ------------------------------------------------------------
    {
      heading: "Removing Hidden Information",
      blocks: [
        {
          type: "paragraph",
          text:
            "If the inspector finds comments or personal information, click Remove All next to each category.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_inspector_results.png",
          alt: "Document Inspector results showing removable content",
        },
        {
          type: "paragraph",
          text:
            "When finished, click Close to return to your workbook.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_inspector_close2.png",
          alt: "Close Document Inspector",
        },
      ],
    },

    // ------------------------------------------------------------
    // Protecting the Workbook
    // ------------------------------------------------------------
    {
      heading: "Protecting the Workbook",
      blocks: [
        {
          type: "paragraph",
          text:
            "To discourage editing, go to File → Info → Protect Workbook and choose Mark as Final.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_protect_info.png",
          alt: "Protect Workbook menu",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_protect_save_dialog.png",
          alt: "Mark as Final confirmation dialog",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_protect_message_dialog.png",
          alt: "Workbook marked as final message",
        },
        {
          type: "paragraph",
          text:
            "When a workbook is marked as final, a banner appears indicating that editing is discouraged.",
        },
        {
          type: "image",
          src: "/images/excel/module-3/inspect-protect/inspecting_protect_final.png",
          alt: "Workbook marked as final banner",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does Document Inspector help you do?",
          options: [
            "Check formulas for calculation errors",
            "Fix spelling mistakes throughout the workbook",
            "Find and remove hidden or personal data before sharing",
            "Verify that all cells have the correct number format",
          ],
          correctIndex: 2,
          explanation: "Document Inspector scans for hidden worksheets, hidden rows and columns, comments, personal metadata, and other content that would travel with the file unnoticed. Run it before any workbook leaves the practice.",
          optionRationales: [
            "Formula auditing is done with Formulas > Error Checking and the trace tools. Document Inspector looks for hidden content, not calculation errors.",
            "Spelling is handled by Review > Spelling. The Inspector does not read text for correctness.",
            "Correct. It finds hidden and personal information so you can remove it before sharing.",
            "Number formats are not part of the inspection. The Inspector reports hidden content and metadata.",
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
        "Open the Inspect and Protect practice workbook.",
        "Run Document Inspector and remove any comments or personal information found.",
        "Close the inspector after removing issues.",
        "Protect the workbook by selecting Mark as Final.",
        "Verify that the 'Marked as Final' banner appears.",
      ],
    },
    {
      type: "image",
      src: "/images/excel/module-3/inspect-protect/inspecting_protect_final.png",
      alt: "Final workbook marked as final example",
    },
  ],
},
];