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
];
