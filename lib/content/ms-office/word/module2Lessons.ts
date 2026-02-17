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
      "Learn how to change font, size, color, bold, italic, underline, and alignment.",
    duration: "9 min",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    sections: [
      {
        heading: "Font and Size",
        blocks: [
          {
            type: "paragraph",
            text:
              "The Font group on the Home tab allows you to change font type and size.",
          },
        ],
      },
      {
        heading: "Text Emphasis",
        blocks: [
          {
            type: "list",
            ordered: false,
            items: [
              "Bold",
              "Italic",
              "Underline",
              "Text Color",
              "Highlight",
            ],
          },
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
