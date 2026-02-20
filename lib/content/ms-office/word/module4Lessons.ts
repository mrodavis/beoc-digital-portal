import { Lesson } from "@/types/lesson";

export const wordModule4Lessons: Lesson[] = [ 

{
  slug: "headers-and-footers",
  title: "Headers & Footers",
  description:
    "Create, edit, and customize headers and footers in Microsoft Word. Insert preset headers, add dates, page numbers, and format different first pages.",
  duration: "7 min",
  videoUrl: "https://www.youtube.com/embed/hxSGN6IJAFc?si=lsvChAnjpi3Hb-kj",

  practiceFiles: [
    {
      name: "Headers & Footers Practice File",
      url: "/practice/word/module-4/headers/word_headersfooters_practice.docx",
    },
  ],

  sections: [

    {
      heading: "Creating a Header",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Insert → Header. Choose a built-in style or select Blank to create your own header.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_preset_command.png",
          alt: "Header preset command",
        },
        {
          type: "image",
          src: "/images/word/headers/header_preset_menu3.png",
          alt: "Header preset gallery",
        },
        {
          type: "image",
          src: "/images/word/headers/header_preset_type.png",
          alt: "Typing inside preset header placeholder",
        },
      ],
    },

    {
      heading: "Working with Preset Header Placeholders",
      blocks: [
        {
          type: "paragraph",
          text:
            "Built-in headers include content controls such as [Document Title]. Click inside the placeholder to replace it with your own text.",
        },
        {
          type: "paragraph",
          text:
            "To remove the placeholder entirely, right-click the field and choose Remove Content Control.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_preset_remove_content.png",
          alt: "Remove content control option",
        },
      ],
    },

    {
      heading: "Editing a Header",
      blocks: [
        {
          type: "paragraph",
          text:
            "Double-click at the top of the page to open the header area. The Header & Footer Tools Design tab will appear.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_create_click_callout.png",
          alt: "Double-click header area",
        },
        {
          type: "image",
          src: "/images/word/headers/header_create_design_tab.png",
          alt: "Header design tab",
        },
      ],
    },

    {
      heading: "Inserting Date & Time",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Date & Time inside the header. Choose a format and check Update automatically if needed.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_datetime_command.png",
          alt: "Date and time command",
        },
        {
          type: "image",
          src: "/images/word/headers/header_datetime_dialog.png",
          alt: "Date dialog box",
        },
        {
          type: "image",
          src: "/images/word/headers/header_datetime_result.png",
          alt: "Date inserted in header",
        },
      ],
    },

    {
      heading: "Adding Page Numbers",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Insert → Page Number and choose placement and alignment.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_design_page_number.png",
          alt: "Page number menu",
        },
      ],
    },

    {
      heading: "Different First Page",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select Different First Page from the Design tab to remove the header from the first page only.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_design_first_page.png",
          alt: "Different first page option",
        },
      ],
    },

    {
      heading: "Removing a Header",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove the header entirely, go to Insert → Header → Remove Header.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_design_remove_header2.png",
          alt: "Remove header option",
        },
      ],
    },

    {
      heading: "Closing the Header Area",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Close Header and Footer to return to the main document.",
        },
        {
          type: "image",
          src: "/images/word/headers/header_create_close.png",
          alt: "Close header button",
        },
      ],
    },

    {
      heading: "Completed Example",
      blocks: [
        {
          type: "image",
          src: "/images/word/headers/header_create_result.png",
          alt: "Completed header example",
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
        "Insert a preset header.",
        "Replace the placeholder text with your name.",
        "Remove any remaining content control boxes.",
        "Insert today’s date and set it to update automatically.",
        "Add page numbers to the bottom right.",
        "Make the first page header different.",
        "Close the Header & Footer tools properly.",
      ],
    },
  ],
},

];