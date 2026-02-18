import { Lesson } from "@/types/lesson";

export const wordModule2Lessons: Lesson[] = [
  {
    slug: "text-basics",
    title: "Text Basics",
    description:
      "Learn how to insert, delete, select, cut, copy, paste, and move text efficiently in Word.",
    duration: "9 min",
    videoUrl:
      "https://www.youtube.com/embed/vmEzxQfVj5c?si=FydXQ8y--1kuD0b1",

    practiceFiles: [
      {
        name: "Word Text Basics Practice File",
        url: "/practice/word/module-2/text-basics/word_textbasics_practice.docx",
      },
    ],

    sections: [
      {
        heading: "Selecting Text",
        blocks: [
          {
            type: "paragraph",
            text:
              "Before editing text, you must first select it. You can click and drag your mouse across text, double-click to select a word, triple-click to select a paragraph, or press Ctrl + A to select the entire document.",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_select.png",
            alt: "Selecting text in Word",
          },
        ],
      },

      {
        heading: "Cut, Copy, and Paste",
        blocks: [
          {
            type: "paragraph",
            text:
              "The Cut command removes selected text and places it on the clipboard. The Copy command duplicates selected text. Paste inserts the content from the clipboard.",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_copy_command.png",
            alt: "Copy command",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_copy_done.png",
            alt: "Copy result",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_cut_command.png",
            alt: "Cut command",
          },
        ],
      },

      {
        heading: "Moving Text",
        blocks: [
          {
            type: "paragraph",
            text:
              "To move text, select it, cut it, then paste it in the desired location.",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_cut_destination.png",
            alt: "Cut destination",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_cut_done.png",
            alt: "Cut complete",
          },
        ],
      },

      {
        heading: "Insertion Point",
        blocks: [
          {
            type: "paragraph",
            text:
              "The insertion point is the blinking vertical line that shows where text will appear when you type.",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_insertion_point.png",
            alt: "Insertion point",
          },
        ],
      },

      {
        heading: "Using Symbols",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can insert special symbols like ™ from the Insert tab by selecting Symbol.",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_symbol_command.png",
            alt: "Insert symbol command",
          },
          {
            type: "image",
            src: "/images/word/text-basics/text_symbol_done.png",
            alt: "Symbol inserted",
          },
        ],
      },

      {
        heading: "Real-World Example",
        blocks: [
          {
            type: "image",
            src: "/images/word/text-basics/word2016_textbasics2_img.png",
            alt: "Completed auto detailing flyer",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Using the provided practice file, complete the following tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Select and copy the 'H2O Signature Wash' section.",
          "Paste it below the 'Signature Interior' section.",
          "Cut the pricing line and move it to the correct section.",
          "Insert the ™ symbol after 'H2O Mobile Wash & Valet'.",
        ],
      },
    ],
  },

{
  slug: "formatting-text",
  title: "Formatting Text",
  description:
    "Learn how to change font, size, case, color, alignment, bold, italic, underline, and highlighting in Microsoft Word.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/pmAl-8Tf8Pg?si=ObAc154cTG0NXlLk",

  practiceFiles: [
    {
      name: "Word Formatting Text Practice File",
      url: "/practice/word/module-2/formatting-text/word_formattext_practice.docx",
    },
  ],

  sections: [

    // ---------------- ALIGNMENT ----------------
    {
      heading: "Text Alignment",
      blocks: [
        {
          type: "paragraph",
          text:
            "Alignment controls how text is positioned between the margins. You can align text to the left, center, right, or justify it.",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_alignment_select.png",
          alt: "Selecting text before alignment",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_alignment_command.png",
          alt: "Alignment command in Word",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_alignment_result.png",
          alt: "Aligned text result",
        },
      ],
    },

    // ---------------- CHANGE CASE ----------------
    {
      heading: "Changing Text Case",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Change Case command allows you to quickly convert text to uppercase, lowercase, or capitalize each word.",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_case_select.png",
          alt: "Selecting text before changing case",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_case_menu.png",
          alt: "Change case dropdown menu",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_case_result.png",
          alt: "Uppercase text result",
        },
      ],
    },

    // ---------------- FONT TYPE ----------------
    {
      heading: "Changing Font Type",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can change the font style from the Font dropdown menu in the Home tab.",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_font_select.png",
          alt: "Selecting text before changing font",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_font_menu.png",
          alt: "Font dropdown menu",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_font_result.png",
          alt: "Changed font result",
        },
      ],
    },

    // ---------------- FONT SIZE ----------------
    {
      heading: "Changing Font Size",
      blocks: [
        {
          type: "paragraph",
          text:
            "Adjust font size using the size dropdown menu or the Increase/Decrease Font Size buttons.",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_size_select.png",
          alt: "Selecting text before resizing",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_size_menu.png",
          alt: "Font size dropdown menu",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_size_grow_shrink.png",
          alt: "Grow and shrink font buttons",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_size_result.png",
          alt: "Resized text result",
        },
      ],
    },

    // ---------------- FONT COLOR ----------------
    {
      heading: "Changing Font Color",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the Font Color dropdown to apply theme colors or choose custom colors.",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_color_select.png",
          alt: "Selecting text before changing color",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_color_menu2.png",
          alt: "Font color dropdown menu",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_color_more_colors.png",
          alt: "More colors dialog",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_color_result2.png",
          alt: "Font color result",
        },
      ],
    },

    // ---------------- HIGHLIGHT ----------------
    {
      heading: "Text Highlighting",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Text Highlight tool allows you to emphasize important information.",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_highlight_select.png",
          alt: "Selecting text before highlighting",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_highlight_menu.png",
          alt: "Highlight color menu",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_highlight_result.png",
          alt: "Highlighted text result",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_highlight_no_color.png",
          alt: "Removing highlight",
        },
      ],
    },

    // ---------------- EMPHASIS ----------------
    {
      heading: "Bold, Italic, and Underline",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Bold, Italic, and Underline to emphasize text.",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_emphasis_select.png",
          alt: "Selecting text before applying emphasis",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_emphasis_command.png",
          alt: "Bold Italic Underline buttons",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/formatting_emphasis_result.png",
          alt: "Bold and italic result",
        },
      ],
    },

    // ---------------- FINAL RESULT ----------------
    {
      heading: "Final Result",
      blocks: [
        {
          type: "paragraph",
          text:
            "After applying alignment, case changes, font adjustments, color, highlighting, and emphasis, your completed document should look like this:",
        },
        {
          type: "image",
          src: "/images/word/formatting-text/word2016_format_text_img.png",
          alt: "Completed For Rent flyer example",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Using the provided practice file, complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Change the title to ALL CAPS.",
        "Center-align the main heading.",
        "Increase the font size of the title to 72pt.",
        "Change the font color of the title.",
        "Apply bold formatting to the price.",
        "Highlight the contact phone number.",
        "Modify the font style of the title.",
      ],
    },
  ],
},


  {
    slug: "paragraph-formatting",
    title: "Paragraph Formatting",
    description:
      "Control spacing, indentation, alignment, and paragraph layout.",
    duration: "10 min",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    sections: [
      {
        heading: "Alignment",
        blocks: [
          {
            type: "list",
            ordered: false,
            items: [
              "Left Align",
              "Center Align",
              "Right Align",
              "Justify",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "styles-and-themes",
    title: "Styles and Themes",
    description:
      "Use built-in styles and themes for consistent professional formatting.",
    duration: "12 min",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    sections: [
      {
        heading: "Using Styles",
        blocks: [
          {
            type: "paragraph",
            text:
              "Styles apply consistent formatting to headings and text.",
          },
        ],
      },
    ],
  },
  
];
