import { Lesson } from "@/types/lesson";

export const excelModule1Lessons: Lesson[] = [

{
  slug: "getting-started-with-excel",
  title: "Getting Started with Excel",
  description:
    "Learn your way around the Excel interface, including the Ribbon, Backstage view, Quick Access Toolbar, workbook views, and zoom controls.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/lgIWIPDJuPo",

  practiceFiles: [],

  sections: [

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
          src: "/images/excel/module1/getting-started/getting_started_interface_start.png",
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
          src: "/images/excel/module1/getting-started/getting_started_ribbon_tabs2.png",
          alt: "Excel ribbon tabs",
        },
        {
          type: "image",
          src: "/images/excel/module1/getting-started/getting_started_ribbon_group.png",
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
          src: "/images/excel/module1/getting-started/getting_started_backstage_file.png",
          alt: "File tab backstage view",
        },
        {
          type: "image",
          src: "/images/excel/module1/getting-started/getting_started_backstage_view.png",
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
          src: "/images/excel/module1/getting-started/getting_started_quick_access_menu.png",
          alt: "Quick access customization menu",
        },
        {
          type: "image",
          src: "/images/excel/module1/getting-started/getting_started_quick_access_added.png",
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
          src: "/images/excel/module1/getting-started/getting_started_tell_me.png",
          alt: "Tell Me search box",
        },
        {
          type: "image",
          src: "/images/excel/module1/getting-started/getting_started_tell_me_type.png",
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
          src: "/images/excel/module1/getting-started/getting_started_views_buttons.png",
          alt: "View buttons",
        },
        {
          type: "image",
          src: "/images/excel/module1/getting-started/getting_started_views_normal.png",
          alt: "Normal view",
        },
        {
          type: "image",
          src: "/images/excel/module1/getting-started/getting_started_views_page_break.png",
          alt: "Page break view",
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
  duration: "8 min",

  sections: [

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
  duration: "14 min",

  practiceFiles: [
    {
      name: "Saving & Sharing Practice File",
      url: "/practice/excel/module-1/saving-sharing/Excel_SavingSharing_Practice.xlsx",
    },
  ],

  sections: [

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