import { Lesson } from "@/types/lesson";

export const wordModule2Lessons: Lesson[] = [
  {
    slug: "text-basics",
    title: "Text Basics",
    description:
      "Learn how to insert, delete, select, cut, copy, paste, and move text efficiently in Word.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    duration: "9 min",

    sections: [
      {
        heading: "Selecting Text",
        blocks: [
          {
            type: "paragraph",
            text:
              "Before you can format or move text, you must select it. Click and drag your mouse across text to highlight it.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Double-click to select a word.",
              "Triple-click to select a paragraph.",
              "Press Ctrl + A to select the entire document.",
            ],
          },
        ],
      },
      {
        heading: "Cut, Copy, and Paste",
        blocks: [
          {
            type: "paragraph",
            text:
              "Use Cut to remove text and move it elsewhere. Use Copy to duplicate text.",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "Cut: Ctrl + X",
              "Copy: Ctrl + C",
              "Paste: Ctrl + V",
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
          "Type a short paragraph about your career goals.",
          "Copy the paragraph and paste it below.",
          "Cut the second paragraph and move it above the first.",
          "Use Ctrl + A to select all text.",
        ],
      },
    ],
  },

  {
    slug: "formatting-text",
    title: "Formatting Text",
    description:
      "Learn how to change font, size, color, bold, italic, underline, and alignment.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    duration: "9 min",

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

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Create a document titled 'Professional Summary'.",
          "Make the title 20pt and bold.",
          "Change the font color.",
          "Center-align the title.",
        ],
      },
    ],
  },

  {
    slug: "paragraph-formatting",
    title: "Paragraph Formatting",
    description:
      "Control spacing, indentation, alignment, and paragraph layout.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    duration: "10 min",

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
      {
        heading: "Indentation",
        blocks: [
          {
            type: "paragraph",
            text:
              "Use the ruler or Paragraph dialog box to adjust indentation.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Write two paragraphs.",
          "Justify the first paragraph.",
          "Add a first-line indent to the second.",
          "Increase spacing between paragraphs.",
        ],
      },
    ],
  },

  {
    slug: "styles-and-themes",
    title: "Styles and Themes",
    description:
      "Use built-in styles and themes for consistent professional formatting.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    duration: "12 min",

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
      {
        heading: "Applying Themes",
        blocks: [
          {
            type: "paragraph",
            text:
              "Themes change fonts, colors, and effects across the entire document.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Apply Heading 1 to a title.",
          "Apply Heading 2 to a subtitle.",
          "Change the document theme.",
          "Modify a style and observe changes.",
        ],
      },
    ],
  },
];
