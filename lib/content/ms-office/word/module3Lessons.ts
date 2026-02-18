import { Lesson } from "@/types/lesson";

export const wordModule3Lessons: Lesson[] = [
   {
    slug: "indents-and-tabs",
    title: "Indents and Tabs",
    description:
        "Learn how to use the ruler, tab selector, and indentation tools to control paragraph layout in Microsoft Word.",
    duration: "8 min",
    videoUrl: "https://www.youtube.com/embed/vJGYWVe52T4?si=P2fE667vh32d5DfJ",

    practiceFiles: [
        {
        name: "Word Indents & Tabs Practice File",
        url: "/practice/word/module-3/indents-tabs/word_indentstabs_practice.docx",
        },
    ],

    sections: [

        // ---------------- SHOW RULER ----------------
        {
        heading: "Using the Ruler",
        blocks: [
            {
            type: "paragraph",
            text:
                "The ruler allows you to visually control indents and tab stops. If it is not visible, go to the View tab and check Ruler.",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/2016-01-05_15-15-13.png",
            alt: "Enabling the ruler in Word",
            },
        ],
        },

        // ---------------- INDENTS ----------------
        {
        heading: "Adjusting Indents",
        blocks: [
            {
            type: "paragraph",
            text:
                "Indentation moves text inward from the margin. You can adjust the left indent, right indent, first-line indent, or hanging indent using the ruler or the Layout tab.",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/indent_commands_before.png",
            alt: "Indent controls before adjustment",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/indent_commands_after.png",
            alt: "Indent controls after adjustment",
            },
        ],
        },

        // ---------------- FIRST LINE INDENT ----------------
        {
        heading: "First-Line Indent",
        blocks: [
            {
            type: "paragraph",
            text:
                "A first-line indent moves only the first line of a paragraph inward. This is commonly used in essays and formal writing.",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/tabs_inline_first.png",
            alt: "First line indent example",
            },
        ],
        },

        // ---------------- HANGING INDENT ----------------
        {
        heading: "Hanging Indent",
        blocks: [
            {
            type: "paragraph",
            text:
                "A hanging indent moves all lines except the first inward. This format is commonly used for Works Cited or reference pages.",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/indent_hanging_example2.png",
            alt: "Hanging indent example",
            },
        ],
        },

        // ---------------- TABS ----------------
        {
        heading: "Using Tab Stops",
        blocks: [
            {
            type: "paragraph",
            text:
                "Tab stops allow you to align text precisely. You can set left, center, right, or decimal tabs using the tab selector and ruler.",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/tabs_inline_center.png",
            alt: "Center tab example",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/tabs_inline_left_indent.png",
            alt: "Left tab example",
            },
        ],
        },

        // ---------------- FINAL EXAMPLE ----------------
        {
        heading: "Real-World Example",
        blocks: [
            {
            type: "paragraph",
            text:
                "Below is an example of a professionally formatted resume section using indents and tab stops.",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/word2016_indents2_img1.png",
            alt: "Completed resume example",
            },
            {
            type: "image",
            src: "/images/word/indents-tabs/word2016_indents2_img2.png",
            alt: "Completed resume layout",
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
            "Enable the ruler.",
            "Apply a first-line indent to the body paragraph.",
            "Create a hanging indent for the Works Cited section.",
            "Use tab stops to align dates to the right margin.",
            "Adjust left and right indents for the Skills section.",
        ],
        },
    ],
    },

  {
    slug: "line-paragraph-spacing",
    title: "Line and Paragraph Spacing",
    description:
      "Learn how to adjust line spacing and paragraph spacing for professional document formatting.",
    duration: "10 min",
    videoUrl: "https://www.youtube.com/embed/mXWvKHWe2Co?si=ALpc88kNziEZhfGI",

    practiceFiles: [
      {
        name: "Word Line and Paragraph Spacing Practice File",
        url: "/practice/word/module-3/line-paragraph-spacing/word_lineparagraphspacing_practice.docx",
      },
    ],

    sections: [
      {
        heading: "Using the Line Spacing Menu",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can quickly change line spacing from the Line and Paragraph Spacing button in the Paragraph group on the Home tab.",
          },
          {
            type: "image",
            src: "/images/word/line-paragraph-spacing/2016-01-11_09-49-05.png",
            alt: "Line spacing dropdown menu",
          },
          {
            type: "image",
            src: "/images/word/line-paragraph-spacing/2016-01-11_13-03-40.png",
            alt: "Line spacing applied result",
          },
        ],
      },

      {
        heading: "Opening Line Spacing Options",
        blocks: [
          {
            type: "paragraph",
            text:
              "For advanced spacing control, open the Paragraph dialog box and use the Line spacing dropdown menu.",
          },
          {
            type: "image",
            src: "/images/word/line-paragraph-spacing/2016-01-08_10-58-38.png",
            alt: "Paragraph dialog box with line spacing options",
          },
        ],
      },

      {
        heading: "Spacing Before and After Paragraphs",
        blocks: [
          {
            type: "paragraph",
            text:
              "Paragraph spacing adds space before or after entire paragraphs. This creates cleaner documents without using extra blank lines.",
          },
          {
            type: "image",
            src: "/images/word/line-paragraph-spacing/2016-01-08_10-42-20.png",
            alt: "Before and After spacing settings",
          },
          {
            type: "image",
            src: "/images/word/line-paragraph-spacing/2016-01-11_09-51-32.png",
            alt: "Paragraph spacing result example",
          },
        ],
      },

      {
        heading: "Professional Example",
        blocks: [
          {
            type: "paragraph",
            text:
              "Proper spacing improves readability and gives letters and resumes a clean, professional look.",
          },
          {
            type: "image",
            src: "/images/word/line-paragraph-spacing/2016-01-08_10-34-42.png",
            alt: "Letter before spacing adjustment",
          },
          {
            type: "image",
            src: "/images/word/line-paragraph-spacing/word2016_linespacing_img3.png",
            alt: "Letter after spacing adjustment",
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
          "Change the body text to 1.5 line spacing.",
          "Add spacing after each paragraph.",
          "Remove unnecessary blank lines created using Enter.",
          "Adjust the document to look professionally formatted.",
        ],
      },
    ],
},
  
];
