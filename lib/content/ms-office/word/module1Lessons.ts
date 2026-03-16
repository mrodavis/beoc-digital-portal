import { Lesson } from "@/types/lesson";

export const wordModule1Lessons: Lesson[] = [
  {
    slug: "getting-started",
    title: "Getting Started with Word",
    description:
      "Learn how to navigate the Word interface and understand the Ribbon, Quick Access Toolbar, and Backstage view.",
    videoUrl: "https://www.youtube.com/embed/j-ZAVHk5SaU",
    duration: "8 min",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          {
            type: "paragraph",
            text:
              "Microsoft Word is a word processing application that allows you to create a variety of documents, including letters, resumes, and more. In this lesson, you'll learn how to navigate the Word interface and become familiar with important features such as the Ribbon, Quick Access Toolbar, and Backstage view.",
          },
        ],
      },
      {
        heading: "About This Tutorial",
        blocks: [
          {
            type: "paragraph",
            text:
              "The procedures in this tutorial will work for all recent versions of Microsoft Word, including Word 2019, Word 2016, and Microsoft 365. There may be slight differences, but for the most part these versions are very similar.",
          },
        ],
      },
      {
        heading: "The Word Interface",
        blocks: [
          {
            type: "paragraph",
            text:
              "When you open Word for the first time, the Start Screen appears. From here, you can create a new document, choose a template, or access recently edited documents. Select Blank Document to access the Word interface.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/create_new_blank.png",
            alt: "Word Start Screen",
            caption: "Select Blank Document from the Start Screen.",
          },
        ],
      },
      {
        heading: "Working with the Word Environment",
        blocks: [
          {
            type: "paragraph",
            text:
              "All recent versions of Word include the Ribbon and the Quick Access Toolbar, where you'll find commands to perform common tasks in Word, as well as Backstage view.",
          },
        ],
      },
      {
        heading: "The Ribbon",
        blocks: [
          {
            type: "paragraph",
            text:
              "Word uses a tabbed Ribbon system instead of traditional menus. The Ribbon contains multiple tabs near the top of the Word window. Each tab contains groups of related commands.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_ribbon_tabs.png",
            alt: "Microsoft Word Ribbon Tabs",
            caption: "The Ribbon contains multiple tabs and command groups.",
          },
          {
            type: "paragraph",
            text:
              "Some groups have a small arrow in the bottom-right corner that opens additional options.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_ribbon_arrow.png",
            alt: "Dialog Box Launcher Arrow",
            caption: "Click the small arrow for additional formatting options.",
          },
        ],
      },
      {
        heading: "Showing and Hiding the Ribbon",
        blocks: [
          {
            type: "paragraph",
            text:
              "If the Ribbon takes up too much space, you can hide it. Click the Ribbon Display Options button in the upper-right corner of the window.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_ribbon_minimize.png",
            alt: "Ribbon Display Options",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "Auto-hide Ribbon – Completely hides the Ribbon.",
              "Show Tabs – Shows only the tab names.",
              "Show Tabs and Commands – Shows the full Ribbon (default).",
            ],
          },
        ],
      },
      {
        heading: "Using the Tell Me Feature",
        blocks: [
          {
            type: "paragraph",
            text:
              "If you're having trouble finding a command, use the Tell Me feature. Type what you're looking for in the Tell Me bar and select a result from the dropdown.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_ribbon_tellme.png",
            alt: "Tell Me Search Bar",
          },
        ],
      },
      {
        heading: "The Quick Access Toolbar",
        blocks: [
          {
            type: "paragraph",
            text:
              "Located above the Ribbon, the Quick Access Toolbar provides quick access to Save, Undo, and Redo. You can customize it with additional commands.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_quick_print.png",
            alt: "Quick Access Toolbar Menu",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Click the drop-down arrow next to the Quick Access Toolbar.",
              "Select the command you want to add.",
              "The command will appear on the toolbar.",
            ],
          },
        ],
      },
      {
        heading: "The Ruler",
        blocks: [
          {
            type: "paragraph",
            text:
              "The Ruler appears at the top and left of the document and helps you adjust margins and alignment precisely.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_ruler_tab.png",
            alt: "View Tab with Ruler Option",
          },
          {
            type: "paragraph",
            text:
              "To show or hide the Ruler, click the View tab and check or uncheck the Ruler box.",
          },
        ],
      },
      {
        heading: "Backstage View",
        blocks: [
          {
            type: "paragraph",
            text:
              "Backstage view provides options for saving, printing, sharing, and managing documents. Click the File tab to open Backstage view.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_backstage_file.png",
            alt: "Backstage View File Tab",
          },
                    {
            type: "image",
            src: "/images/word/getting-started/start_backstage_lg.png",
            alt: "Backstage View Large",
          },
        ],
      },
      {
        heading: "Document Views and Zooming",
        blocks: [
          {
            type: "paragraph",
            text:
              "Word offers several document views: Read Mode, Print Layout, and Web Layout. These views change how your document appears.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_view_print.png",
            alt: "Print Layout View",
          },
          {
            type: "paragraph",
            text:
              "You can zoom in or out using the zoom slider in the bottom-right corner of the window.",
          },
          {
            type: "image",
            src: "/images/word/getting-started/start_zoom.png",
            alt: "Zoom Slider",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Open Word and create a blank document.",
          "Change Ribbon Display Options to Show Tabs.",
          "Using Customize Quick Access Toolbar, add New, Quick Print, and Spelling & Grammar.",
          "In the Tell Me bar, type Shape and press Enter.",
          "Choose a shape and double-click somewhere in the document.",
          "Show the Ruler if it is not already visible.",
          "Zoom the document to 120%.",
          "Change the Document view to Web Layout.",
          "When finished, your document should look something like this.",
          "Change Ribbon Display Options back to Show Tabs and Commands, and change view back to Print Layout."
        ]
      },
      {
        type: "image",
        src: "/images/word/getting-started/word2016_gettingtoknow3_img.png",
        alt: "Completed Word Challenge Document"
      }
    ]
    ,
  },
  {
  slug: "understanding-onedrive",
  title: "Understanding OneDrive (Word)",
  description:
    "Learn how to sign in, save files to OneDrive, and share documents online.",
  videoUrl: "https://www.youtube.com/embed/OR_RjjqF1qc", // replace later if needed
  duration: "2 min",

  sections: [
    {
      heading: "Introduction",
      blocks: [
        {
          type: "paragraph",
          text:
            "Many of the features in Microsoft Office are designed for saving and sharing files online. OneDrive is Microsoft’s cloud storage space that allows you to save, edit, and share your documents from any device.",
        },
        {
          type: "paragraph",
          text:
            "You can access OneDrive from your computer, smartphone, or tablet. To get started, you’ll need a free Microsoft account.",
        },
        {
          type: "paragraph",
          text:
            "Once you have a Microsoft account, click Sign in in the upper-right corner of the Word window to connect your account.",
        },
        {
          type: "image",
          src: "/images/word/understanding-onedrive/onedrive_signin.png", // save the screenshot from page 1
          alt: "Sign in to Microsoft Account in Word",
          caption: "Click Sign in in the upper-right corner of Word.",
        },
      ],
    },

    {
      heading: "Benefits of Using OneDrive",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "Access your files anywhere – Open documents from any device with an Internet connection.",
            "Back up your files – Protect your documents even if something happens to your computer.",
            "Share files – Allow others to view or edit your documents for collaboration.",
          ],
        },
      ],
    },

    {
      heading: "Saving and Opening Files",
      blocks: [
        {
          type: "paragraph",
          text:
            "When signed in, OneDrive appears as a save location whenever you click Save or Save As.",
        },
        {
          type: "paragraph",
          text:
            "You can choose between saving to OneDrive or saving locally to This PC.",
        },
        {
          type: "image",
          src: "/images/word/understanding-onedrive/onedrive_saveas.png", // save screenshot from page 2
          alt: "Save As Screen with OneDrive Option",
          caption:
            "Choose OneDrive to save online or This PC to save locally.",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "list",
      ordered: true,
      items: [
        "Click Sign in in Word.",
        "Sign in with a Microsoft account.",
        "Click File → Save As.",
        "Select OneDrive as the save location.",
        "Save a document to OneDrive.",
      ],
    },
  ],
},
{
  slug: "creating-and-opening-documents",
  title: "Creating and Opening Documents",
  description:
    "Learn how to create new documents from templates, open existing files, pin documents, and convert older Word files.",
  videoUrl: "https://www.youtube.com/embed/PafCMUVH_OA",
  duration: "8 min",

  practiceFiles: [
    {
      name: "Creating and Opening Documents Practice File",
      url: "/practice/word/module-1/creating-and-opening-documents/word_createopen_practice.doc",
    },
  ],
  sections: [
    {
      heading: "Creating a New Document",
      blocks: [
        {
          type: "paragraph",
          text:
            "To create a new document, click the File tab to open Backstage view, then select New. You can choose Blank document or search for a template.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_template_start.png",
          alt: "New document screen",
        },
        {
          type: "paragraph",
          text:
            "You can type a keyword such as flyer in the search bar to find matching templates.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_template_search_.jpg",
          alt: "Searching for flyer template",
        },
        {
          type: "paragraph",
          text:
            "Templates are also organized by category. Select a category such as Flyers to browse available designs.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_template_category_splat.png",
          alt: "Template categories",
        },
        {
          type: "paragraph",
          text:
            "Click a template preview, then select Create to open the new document.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_template_create.jpg",
          alt: "Create template button",
        },
      ],
    },

    {
      heading: "Opening an Existing Document",
      blocks: [
        {
          type: "paragraph",
          text:
            "To open an existing file, click File, then select Open. You can choose from Recent documents, OneDrive, or This PC.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/create_open_command.png",
          alt: "Open command in Backstage view",
        },
        {
          type: "paragraph",
          text:
            "Select Browse to locate a file stored on your computer.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_open_browse.png",
          alt: "Browse option",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_open_select.png",
          alt: "Selecting a document",
        },
      ],
    },

    {
      heading: "Pinning and Unpinning Documents",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can pin frequently used documents so they stay at the top of your Recent list.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_pin_start.png",
          alt: "Pinned document",
        },
        {
          type: "paragraph",
          text:
            "Click the pushpin icon again to unpin the document.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_pin_unpin.png",
          alt: "Unpin document",
        },
      ],
    },

    {
      heading: "Compatibility Mode and Converting Files",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you open a document created in an older version of Word, it may open in Compatibility Mode. Some features may be limited.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_convert_compare_crop.png",
          alt: "Compatibility Mode label",
        },
        {
          type: "paragraph",
          text:
            "To upgrade the file to the latest format, click File, then select Convert.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_convert_command.png",
          alt: "Convert command",
        },
        {
          type: "paragraph",
          text:
            "Click OK to confirm the conversion.",
        },
        {
          type: "image",
          src: "/images/word/creating-and-opening-documents/new_convert_ok.png",
          alt: "Convert confirmation dialog",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "list",
      ordered: true,
      items: [
        "Create a new document using a flyer template.",
        "Search for a template using a keyword.",
        "Open an existing document from This PC.",
        "Pin a document to the Recent list.",
        "Unpin the document.",
        "Open a file in Compatibility Mode (if available).",
        "Convert the file to the newest format.",
      ],
    },
  ],
},
  {
    slug: "saving-and-sharing-documents",
    title: "Saving and Sharing Documents",
    description:
      "Learn how to save documents, use AutoRecover, change file types, export to PDF, and share documents with others.",
    videoUrl: "https://www.youtube.com/embed/iHuFzz7Wvt4",
    duration: "8 min",

    practiceFiles: [
      {
        name: "Saving and Sharing Practice File",
        url: "/practice/word/module-1/saving-and-sharing/word_saveshare_practice.docx",
      },
    ],

    sections: [
      {
        heading: "Saving a Document",
        blocks: [
          {
            type: "paragraph",
            text:
              "To save a document, click the File tab, then select Save or Save As. If it is your first time saving the file, you will be prompted to choose a location.",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_command.png",
            alt: "Save command in Backstage view",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_dialog.png",
            alt: "Save dialog box",
          },
        ],
      },

      {
        heading: "Using AutoRecover",
        blocks: [
          {
            type: "paragraph",
            text:
              "Word automatically saves temporary versions of your document using AutoRecover. If Word closes unexpectedly, you may see the Document Recovery pane when you reopen it.",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_autosave_recover.png",
            alt: "Document Recovery pane",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_autosave_splat.png",
            alt: "Recover Unsaved Documents option",
          },
        ],
      },

      {
        heading: "Changing Default Save Options",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can change how Word saves documents by going to File → Options → Save. From here, you can adjust AutoRecover timing and default save locations.",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_default_options.png",
            alt: "Word Save options",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_default_dialog.png",
            alt: "Default save location dialog",
          },
        ],
      },

      {
        heading: "Using Save As and Browsing",
        blocks: [
          {
            type: "paragraph",
            text:
              "Select Save As to save a copy of your document in a different location or under a different name.",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_saveas.png",
            alt: "Save As screen",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_browse.png",
            alt: "Browse option",
          },
        ],
      },

      {
        heading: "Changing File Types and Exporting",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can change the file type by selecting File → Export → Change File Type.",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_export_file_command.png",
            alt: "Export and Change File Type",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_export_file_splat.png",
            alt: "Change File Type options",
          },
          {
            type: "paragraph",
            text:
              "To create a PDF, choose File → Export → Create PDF/XPS Document.",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_export_pdf_command.png",
            alt: "Create PDF command",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_export_pdf_dialog.png",
            alt: "Publish as PDF dialog",
          },
        ],
      },

      {
        heading: "Sharing a Document",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can share documents directly from Word by selecting File → Share.",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/save_share_command.png",
            alt: "Share command",
          },
          {
            type: "image",
            src: "/images/word/saving-and-sharing/share_menu.jpg",
            alt: "Share menu",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text:
          "Download the practice file and complete the following steps:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open the practice file.",
          "Use Save As to save a copy to a new location.",
          "Change the file type to Word 97-2003 Document.",
          "Export the document as a PDF.",
          "Recover an unsaved document (if available).",
          "Open File → Options and review the Save settings.",
          "Use the Share feature to generate a share link (if signed in).",
        ],
      },
    ],
  },

];
