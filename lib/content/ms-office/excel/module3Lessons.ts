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
  
  videoUrl: "https://www.youtube.com/embed/qRShQc-v3LI",

    practiceFiles: [
      {
        name: "Multiple Worksheets Practice File",
        url: "/practice/excel/module-3/multiple-worksheets/Excel_MultipleSheets_Practice.xlsx",
      },
    ],
  sections: [
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
    duration: "4 min",

    practiceFiles: [
        {
        name: "Check Spelling Practice File",
        url: "/practice/excel/module-3/spelling/Excel_CheckSpelling_Practice.xlsx",
        },
    ],

    sections: [

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
    duration: "12 min",

    videoUrl: "https://www.youtube.com/embed/8XcFTeCu98k",

    practiceFiles: [
      {
        name: "Printing Practice File",
        url: "/practice/excel/module-3/page-layout-and-printing/Excel_PageLayoutPrint_Practice.xlsx",
      },
    ],

    sections: [

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
  duration: "11 min",

  videoUrl: "https://www.youtube.com/embed/eK23Fzttlyo",

  practiceFiles: [
    {
      name: "Comments & Track Changes Practice File",
      url: "/practice/excel/module-3/comments/Excel_TrackChangesComments_Practice.xlsx",
    },
  ],

  sections: [

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
  duration: "8 min",

  videoUrl: "https://www.youtube.com/embed/fsXS_VSuBvs",

  practiceFiles: [
    {
      name: "Inspect and Protect Practice File",
      url: "/practice/excel/module-3/inspect-protect/Excel_InspectProtect_Practice.xlsx",
    },
  ],

  sections: [

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