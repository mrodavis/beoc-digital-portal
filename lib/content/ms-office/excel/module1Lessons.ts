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

];