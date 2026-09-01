import { Lesson } from "@/types/lesson";

export const excelModule1Lessons: Lesson[] = [

{
  slug: "getting-started-with-excel",
  title: "Getting Started with Excel",
  description:
    "Learn your way around the Excel interface, including the Ribbon, Backstage view, Quick Access Toolbar, workbook views, and zoom controls.",
  objectives: [
    "Identify the Ribbon, formula bar, Name Box, and status bar and say what each does",
    "Describe a cell address and how rows and columns are labeled",
    "Read the status bar's automatic sum, average, and count",
    "Move around a large worksheet efficiently with keyboard navigation",
  ],
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/lgIWIPDJuPo",

  practiceFiles: [],

  sections: [

    {
       heading: "A spreadsheet is a grid of addresses",
       blocks: [
         {
           type: "scenario",
           role: "You are taking over supply tracking at Lakeside Medical Associates.",
           text: "Your predecessor left a workbook with four sheets and about 900 rows. Your supervisor asks a simple question: what did we spend on medical supplies last quarter? You can see all the numbers. You just have no way to make the file answer the question.",
           task: "Learn how a worksheet is addressed and navigated, because every Excel skill after this depends on referring to cells precisely.",
         },
         {
           type: "paragraph",
           text: "Excel's power rests on one idea: every cell has an address. Columns are lettered, rows are numbered, and their intersection names the cell — C7 is column C, row 7. Because each cell has a stable address, a formula can refer to it, and when the value at that address changes, everything referring to it recalculates. That is the whole basis of a spreadsheet.",
         },
         {
           type: "paragraph",
           text: "The formula bar is the other thing to understand early. A cell shows you a result; the formula bar shows you what is actually in it. A cell displaying 1,240 might contain the number 1240 or the formula =SUM(C2:C15). Those are very different things, and only the formula bar tells you which. When a spreadsheet behaves unexpectedly, clicking a cell and reading the formula bar is nearly always the first diagnostic step.",
         },
         {
           type: "key-terms",
           terms: [
             {
               term: "Cell reference",
               definition: "A cell's address, formed from its column letter and row number — C7. Formulas use references rather than values so they update when the data changes.",
             },
             {
               term: "Range",
               definition: "A block of cells written with a colon. C2:C15 means every cell from C2 through C15.",
             },
             {
               term: "Formula bar",
               definition: "The bar above the grid showing the actual contents of the selected cell, as opposed to its displayed result.",
             },
             {
               term: "Name Box",
               definition: "The box left of the formula bar showing the selected cell's address. Type an address into it to jump straight there.",
             },
             {
               term: "Worksheet vs workbook",
               definition: "A workbook is the file. A worksheet is one tab inside it. One workbook can hold many worksheets.",
             },
           ],
         },
         {
           type: "table",
           caption: "Navigation worth learning on day one",
           columns: [
             "Keys",
             "Does",
             "Why it matters",
           ],
           rows: [
             [
               "Ctrl + Arrow",
               "Jumps to the edge of the current block of data",
               "Reaches the end of 900 rows instantly",
             ],
             [
               "Ctrl + Home",
               "Returns to A1",
               "Gets you back from anywhere",
             ],
             [
               "Ctrl + End",
               "Jumps to the last used cell",
               "Shows the true extent of a sheet, including stray data",
             ],
             [
               "Ctrl + Shift + Arrow",
               "Selects to the edge of the block",
               "Selects a whole column of data without dragging",
             ],
             [
               "F2",
               "Edits the active cell in place",
               "Faster than double-clicking, and shows the formula",
             ],
           ],
         },
         {
           type: "tip",
           text: "Select several numbers and look at the bottom-right of the status bar: Excel is already showing their sum, average, and count. For a quick total you never need a formula at all. Right-click the status bar to choose which statistics appear there.",
         },
       ],
     },

    {
      heading: "The Excel Interface",
      blocks: [
        {
          type: "paragraph",
          text:
            "When you open Excel, you’ll see a workbook made up of rows, columns, and cells. The active cell is highlighted and ready for data entry.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_interface_start.png",
          alt: "Excel interface overview",
        },
      ],
    },

    {
      heading: "Understanding the Ribbon",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Ribbon contains tabs like Home, Insert, Page Layout, Formulas, Data, Review, and View. Each tab contains groups of related commands.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_ribbon_tabs2.png",
          alt: "Excel ribbon tabs",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_ribbon_group.png",
          alt: "Ribbon command groups",
        },
      ],
    },

    {
      heading: "Backstage View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the File tab to open Backstage view. From here, you can save, open, print, share, and manage your workbook.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_backstage_file.png",
          alt: "File tab backstage view",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_backstage_view.png",
          alt: "Backstage view screen",
        },
      ],
    },

    {
      heading: "Quick Access Toolbar",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Quick Access Toolbar lets you quickly access frequently used commands like Save, Undo, and Redo. You can customize it to add more tools.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_quick_access_menu.png",
          alt: "Quick access customization menu",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_quick_access_added.png",
          alt: "Quick access toolbar with new command",
        },
      ],
    },

    {
      heading: "Using the Tell Me Box",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Tell Me box helps you quickly find commands. Simply type what you want to do, and Excel will suggest tools and actions.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_tell_me.png",
          alt: "Tell Me search box",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_tell_me_type.png",
          alt: "Typing into Tell Me",
        },
      ],
    },

    {
      heading: "Workbook Views & Zoom",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel includes different worksheet views, such as Normal view and Page Break view. You can also adjust zoom levels using the zoom slider.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_views_buttons.png",
          alt: "View buttons",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_views_normal.png",
          alt: "Normal view",
        },
        {
          type: "image",
          src: "/images/excel/module-1/getting-started/getting_started_views_page_break.png",
          alt: "Page break view",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Where are most Excel commands found?",
          options: [
            "The status bar at the bottom of the screen",
            "The formula bar above the worksheet",
            "The Ribbon at the top of the screen",
            "The Quick Access Toolbar",
          ],
          correctIndex: 2,
          explanation: "The Ribbon holds Excel's commands, grouped into tabs by task — Home for formatting, Formulas for functions, Data for sorting and filtering. The formula bar and status bar display information about your data rather than housing commands.",
          optionRationales: [
            "The status bar reports information — the sum of your selection, the zoom level, the current mode. It displays rather than commands.",
            "The formula bar shows and edits the contents of the active cell. It is essential, but it is not where commands live.",
            "Correct. The Ribbon organizes Excel's commands into task-based tabs.",
            "The Quick Access Toolbar holds a few shortcuts you choose. It is a convenience layer over the Ribbon, not the source of commands.",
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
        "Identify the active cell in a new workbook.",
        "Switch between Ribbon tabs.",
        "Open Backstage view and return to the workbook.",
        "Add a command to the Quick Access Toolbar.",
        "Use the Tell Me box to find a command.",
        "Switch between Normal view and Page Break view.",
        "Adjust the zoom level.",
      ],
    },
  ],
},

{
  slug: "understanding-onedrive-for-excel",
  title: "Understanding OneDrive for Excel",
  description:
    "Learn how to sign in to Excel, connect to your Microsoft account, and use OneDrive to save and access workbooks from anywhere.",
  objectives: [
    "Save a workbook to OneDrive and open it from another device",
    "Explain what AutoSave requires and why it may be greyed out",
    "Use version history to recover an earlier state of a workbook",
    "Judge what data may and may not go into a personal cloud account",
  ],
  duration: "8 min",

  sections: [

    {
       heading: "Version history is the feature worth the move",
       blocks: [
         {
           type: "scenario",
           role: "You maintain the supply budget at Lakeside Medical Associates.",
           text: "You sort a 900-row sheet, but you select only one column instead of the whole range. Every name is now attached to the wrong number and you cannot tell which row was which. You saved ten minutes ago. Ctrl+Z has already been exhausted.",
           task: "Understand what cloud storage gives you beyond access from anywhere — specifically, the ability to go back.",
         },
         {
           type: "paragraph",
           text: "Saving to OneDrive puts the workbook on Microsoft's servers so it follows you between devices. That much matches Word. What matters more in Excel is version history: OneDrive keeps previous versions, and File > Info > Version History lets you open or restore any of them.",
         },
         {
           type: "paragraph",
           text: "Excel damage is often silent. A mis-sorted column, a formula overwritten with a typed number, a deleted row — none of these announce themselves, and you may not notice for days, long past what undo can reach. Version history is the only realistic recovery, and it exists only for cloud-stored files.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "AutoSave changes a habit you may rely on. With AutoSave on, every change is written immediately — there is no 'close without saving' to abandon an experiment. Before trying something drastic on a live workbook, use File > Save a Copy first and experiment on the copy.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "A spreadsheet holding patient names, dates of birth, or visit details is protected health information. It belongs only in systems your employer has assessed and covered by a business associate agreement — never in a personal OneDrive account. If you are unsure whether a workbook qualifies, ask before you save it.",
         },
       ],
     },

    {
      heading: "Signing In to Excel",
      blocks: [
        {
          type: "paragraph",
          text:
            "To use OneDrive features, sign in to Excel using your Microsoft account. Click the Sign In button in the upper-right corner.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/onedrive/2015-11-17_09-35-16.png",
          alt: "Excel sign in button",
        },
      ],
    },

    {
      heading: "Saving to OneDrive",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click File → Save As. If you are signed in, you will see OneDrive listed as a save location.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/onedrive/2015-11-16_13-50-49.png",
          alt: "Save As screen showing OneDrive",
        },
        {
          type: "paragraph",
          text:
            "Saving to OneDrive allows you to access your files from any device and protects against data loss.",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What allows you to access your Excel files from any device?",
          options: [
            "Enabling AutoRecover in Excel Options",
            "Saving your workbook to OneDrive",
            "Keeping Excel open in the background",
            "Using the Quick Access Toolbar",
          ],
          correctIndex: 1,
          explanation: "Saving to OneDrive stores the workbook on Microsoft's servers and syncs it to any device you sign in on. It is also the prerequisite for AutoSave, co-authoring, and version history.",
          optionRationales: [
            "AutoRecover keeps temporary local copies to survive a crash. It protects against Excel closing unexpectedly, not against being at a different machine.",
            "Correct. The workbook lives in the cloud and syncs to any device you sign in on, which also enables version history and co-authoring.",
            "Leaving Excel running has no effect on where the file is stored or who can reach it.",
            "The Quick Access Toolbar holds command shortcuts. It has nothing to do with file storage or access.",
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
        "Sign in to Excel with a Microsoft account.",
        "Save a workbook to OneDrive.",
        "Locate your file in OneDrive online.",
        "Use the Share button to generate a link.",
      ],
    },
  ],
},
{
  slug: "creating-and-opening-workbooks",
  title: "Creating and Opening Workbooks",
  description:
    "Learn how to create new workbooks, open existing files, use templates, pin recent files, and understand Compatibility Mode in Excel.",
  objectives: [
    "Create workbooks from blank files and from templates",
    "Open, pin, and manage recent workbooks",
    "Recognize the risks of opening workbooks from outside the practice",
    "Explain what CSV files lose compared with .xlsx",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/EBGrJckHadw",

  practiceFiles: [
    {
      name: "Creating & Opening Practice File",
      url: "/practice/excel/module-1/creating-opening/Excel_CreatingOpening_Practice.xls",
    },
  ],

  sections: [

    {
       heading: "Where a workbook comes from is a security question",
       blocks: [
         {
           type: "scenario",
           role: "You process vendor invoices at Lakeside Medical Associates.",
           text: "A supplier emails a price list as an .xlsm file. Excel opens it in Protected View with a yellow bar offering to enable content. Clicking that button on a file from outside the practice is one of the most common ways an organization gets compromised.",
           task: "Know what Protected View is protecting you from, and what the different file types mean.",
         },
         {
           type: "paragraph",
           text: "Protected View opens files from email, the internet, or unsafe locations in a read-only sandbox where macros and external links cannot run. The yellow bar asking you to enable editing or enable content is a genuine decision point, not a formality. Enable editing on a file you were expecting from a known sender; be far more cautious about enabling content, which permits macros to execute.",
         },
         {
           type: "table",
           caption: "Excel file types",
           columns: [
             "Extension",
             "What it is",
             "Note",
           ],
           rows: [
             [
               ".xlsx",
               "The standard workbook format",
               "Cannot contain macros, which makes it the safer default",
             ],
             [
               ".xlsm",
               "A macro-enabled workbook",
               "Can run code. Only enable content from a source you trust",
             ],
             [
               ".csv",
               "Plain comma-separated text",
               "Holds one sheet of values only — no formulas, formatting, or multiple tabs",
             ],
             [
               ".xltx",
               "A template",
               "Opening one creates a new workbook and leaves the template intact",
             ],
             [
               ".xls",
               "The pre-2007 format",
               "Limited to 65,536 rows; convert unless you must return it",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "Saving an .xlsx as .csv discards everything except the values on the current sheet — formulas become their results, formatting disappears, and other sheets are simply not saved. Excel warns you, and the warning is worth reading. CSV is an exchange format for moving data between systems, not a format to keep your work in.",
         },
       ],
     },

    {
      heading: "Creating a New Workbook",
      blocks: [
        {
          type: "paragraph",
          text:
            "To create a new workbook, click File → New. You can select a Blank Workbook or choose from available templates.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_new.png",
          alt: "New workbook screen",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_template_new.png",
          alt: "Template selection screen",
        },
      ],
    },

    {
      heading: "Searching for Templates",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel allows you to search for online templates. Simply type a keyword like 'budget' into the search bar.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_template_search.png",
          alt: "Searching templates",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_template_preview.png",
          alt: "Template preview",
        },
      ],
    },

    {
      heading: "Opening Existing Workbooks",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click File → Open to access recent workbooks, OneDrive files, or browse your computer.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_open_recent.png",
          alt: "Open recent files screen",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_open_dialog.png",
          alt: "Open dialog box",
        },
      ],
    },

    {
      heading: "Pinning Recent Files",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can pin frequently used workbooks so they always appear at the top of your Recent list.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_pin_pushpin.png",
          alt: "Pin icon",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_pin_open.png",
          alt: "Pinned file example",
        },
      ],
    },

    {
      heading: "Understanding Compatibility Mode",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you open an older Excel file, you may see Compatibility Mode in the title bar. Some newer features are disabled until the file is converted.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_compatibility_example.png",
          alt: "Compatibility mode example",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_compatibility_convert.png",
          alt: "Convert file option",
        },
        {
          type: "image",
          src: "/images/excel/module-1/creating-opening/creating_opening_compatibility_dialog.png",
          alt: "Compatibility dialog box",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is a template in Excel?",
          options: [
            "A locked workbook that cannot be edited",
            "A saved chart format you can reuse",
            "A pre-formatted workbook you can use as a starting point",
            "A file that contains only formulas",
          ],
          correctIndex: 2,
          explanation: "A template is a pre-built starting point holding layout, formatting, and often formulas. Opening one creates a new workbook from it, leaving the template itself unchanged so it can be reused.",
          optionRationales: [
            "Templates are fully editable. You are thinking of workbook protection, which is a separate feature under the Review tab.",
            "Chart formatting can be saved as a chart template, but an Excel template is a whole workbook rather than a chart style.",
            "Correct. A template is a pre-formatted workbook used as a starting point, and opening it produces a new copy.",
            "A template can contain formulas, data, formatting, and charts. There is no restriction to formulas alone.",
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
        "Create a new blank workbook.",
        "Search for and preview a template.",
        "Open a recent workbook.",
        "Pin a file to the Recent list.",
        "Open an older Excel file and convert it from Compatibility Mode.",
      ],
    },
  ],
},

{
  slug: "saving-exporting-and-sharing",
  title: "Saving, Exporting & Sharing Workbooks",
  description:
    "Learn how to save workbooks, use AutoRecover, export to PDF, change file types, and share files using OneDrive.",
  objectives: [
    "Choose a save format that matches how the workbook will be used",
    "Export a worksheet to PDF with sensible page setup",
    "Share a workbook by link with appropriate permissions",
    "Explain what a recipient can still see in a shared workbook",
  ],
  duration: "14 min",

  practiceFiles: [
    {
      name: "Saving & Sharing Practice File",
      url: "/practice/excel/module-1/saving-sharing/Excel_SavingSharing_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "Sending a workbook sends more than you can see",
       blocks: [
         {
           type: "scenario",
           role: "You report supply spending to the practice manager at Lakeside Medical Associates.",
           text: "You email the quarterly summary as an .xlsx. It also contains a hidden sheet with staff salary assumptions, a filtered-out set of rows, and the vendor's confidential pricing. All of it travels with the file, and the recipient can unhide it in two clicks.",
           task: "Understand what actually leaves with a workbook, and choose a format that shares only what you intend.",
         },
         {
           type: "paragraph",
           text: "A workbook carries everything: hidden sheets, hidden rows and columns, filtered-out data, comments, defined names, cell formulas revealing your method, and file metadata naming the author. Hiding is a display setting, not a security control — hidden data is fully present in the file.",
         },
         {
           type: "paragraph",
           text: "This is the practical case for exporting to PDF. A PDF contains only what was visible when you exported it, and cannot be unhidden or reverse-engineered. Send the PDF when the recipient needs the numbers; send the workbook only when they genuinely need to work with the data.",
         },
         {
           type: "worked-example",
           title: "Sending a quarterly summary safely",
           task: "Share the supply spending summary with the practice manager without exposing hidden sheets, source pricing, or underlying formulas.",
           steps: [
             {
               move: "Run File > Info > Check for Issues > Inspect Document.",
               why: "The Document Inspector reports hidden worksheets, hidden rows and columns, comments, and personal metadata. It surfaces things you have genuinely forgotten about — which is exactly the category of information that causes problems.",
             },
             {
               move: "Decide what the recipient actually needs: numbers, or data to work with.",
               why: "This determines the format, and it is a decision most people skip. A manager reading a summary needs a PDF. An analyst continuing the work needs the workbook. Sending the workbook by default is how source pricing reaches people who should not have it.",
             },
             {
               move: "For numbers only, set the print area and export with File > Export > Create PDF/XPS.",
               why: "Setting the print area first is what keeps the PDF to the summary rather than 900 rows of source data. The PDF then contains only what was visible — nothing hidden travels with it.",
             },
             {
               move: "If you must send the workbook, save a copy and delete what should not travel.",
               why: "Delete the hidden sheets in the copy rather than re-hiding them. Hiding is reversible by the recipient; deletion is not. Never edit the original for this — work on the copy so your own source data stays intact.",
             },
           ],
           result: "The manager receives exactly the summary, with no hidden sheets, no vendor pricing, and no formulas exposing the method.",
           takeaway: "Inspect first, then match the format to the actual need. Hidden is not the same as removed.",
         },
       ],
     },

    {
      heading: "Saving a Workbook",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click File → Save or Save As to store your workbook. You can save to OneDrive, your computer, or another location.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_onedrive.png",
          alt: "Saving to OneDrive",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_save_dialog.png",
          alt: "Save dialog box",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_save_quick_access.png",
          alt: "Quick access save button",
        },
      ],
    },

    {
      heading: "Changing Save Locations & Options",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can adjust default save locations and other settings in File → Options → Save.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_change_location_options.png",
          alt: "Excel save options",
        },
      ],
    },

    {
      heading: "Recovering Unsaved Workbooks",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel uses AutoRecover to save temporary versions of your work. If Excel closes unexpectedly, you can recover unsaved files.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_autorecover_manage.png",
          alt: "Recover unsaved workbooks",
        },
      ],
    },

    {
      heading: "Exporting as PDF or Other File Types",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can export your workbook as a PDF or change the file type using File → Export.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_export_menu.png",
          alt: "Export menu",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_export_publish.png",
          alt: "Publish as PDF",
        },
                {
          type: "paragraph",
          text:
            "Excel by default will only export active worksheet. If you have multiple worksheets and want them saved to the same PDF file, click Options in the Save As dialog box. Select Entire Workbook, then click Ok",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_export_entire_wb.png",
          alt: "Publish as PDF",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_export_types_change.png",
          alt: "Change file type",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_export_types_file_type.png",
          alt: "Workbook file types",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_export_types_type.png",
          alt: "Selecting file type",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_export_types_save_as.png",
          alt: "Save as different file type",
        },
      ],
    },

    {
      heading: "Sharing Workbooks",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use File → Share to send your workbook through OneDrive. You can generate links and control permissions.",
        },
        {
          type: "image",
          src: "/images/excel/module-1/saving-sharing/saving_sharing_share_pane.png",
          alt: "Share option",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What format should you use to share a workbook that others cannot edit?",
          options: [
            "CSV (.csv)",
            "Excel Macro-Enabled Workbook (.xlsm)",
            "PDF (.pdf)",
            "Excel 97-2003 Workbook (.xls)",
          ],
          correctIndex: 2,
          explanation: "PDF captures only what is visible and cannot be casually edited, which makes it right for distributing figures. It also leaves behind hidden sheets, filtered rows, and formulas that an .xlsx would carry along.",
          optionRationales: [
            "CSV is plain text and fully editable. It also discards formatting, formulas, and every sheet but the active one.",
            "A macro-enabled workbook is more editable, not less, and macro files raise security concerns for recipients.",
            "Correct. A PDF preserves the visible layout, is not casually editable, and does not carry hidden sheets or formulas.",
            "The legacy .xls format is fully editable and imposes old row limits. It addresses compatibility, not editing control.",
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
        "Save a workbook to OneDrive.",
        "Change the default save location in Options.",
        "Recover an unsaved workbook.",
        "Export a workbook as a PDF.",
        "Save a workbook as a CSV file.",
        "Share a workbook using OneDrive.",
      ],
    },
  ],
}
];