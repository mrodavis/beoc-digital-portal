import { Lesson } from "@/types/lesson";

export const wordModule3Lessons: Lesson[] = [
   {
        slug: "page-layout",
        title: "Page Layout",
        description:
            "Learn how to adjust margins, orientation, paper size, and use the Page Setup dialog box in Microsoft Word.",
        duration: "12 min",
        videoUrl: "https://www.youtube.com/embed/aRvVeiWmFZk",

        practiceFiles: [
            {
            name: "Word Page Layout Practice File",
            url: "/practice/word/module-3/page-layout/word_pagelayout_practice.docx",
            },
        ],

        sections: [

            // ---------------- MARGINS ----------------
            {
            heading: "Changing Margins",
            blocks: [
                {
                type: "paragraph",
                text:
                    "Margins control the space between your text and the edge of the page. To change margins, go to the Layout tab and click Margins.",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_margins_command.png",
                alt: "Margins command button",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_margins_menu.png",
                alt: "Margins dropdown menu",
                },
            ],
            },

            // ---------------- CUSTOM MARGINS ----------------
            {
            heading: "Custom Margins",
            blocks: [
                {
                type: "paragraph",
                text:
                    "For precise control, click Custom Margins to open the Page Setup dialog box. Here you can manually adjust top, bottom, left, and right margins.",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_custom_margins_menu.png",
                alt: "Custom margins option",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_custom_margins_page_setup.png",
                alt: "Page setup margins dialog",
                },
            ],
            },

            // ---------------- ORIENTATION ----------------
            {
            heading: "Changing Page Orientation",
            blocks: [
                {
                type: "paragraph",
                text:
                    "Orientation determines whether your document prints vertically (Portrait) or horizontally (Landscape).",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_orientation_command.png",
                alt: "Orientation command",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_orientation_menu.png",
                alt: "Orientation dropdown menu",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_orientation_landscape.png",
                alt: "Landscape orientation result",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_orientation_portrait.png",
                alt: "Portrait orientation result",
                },
            ],
            },

            // ---------------- PAPER SIZE ----------------
            {
            heading: "Changing Paper Size",
            blocks: [
                {
                type: "paragraph",
                text:
                    "You can change the paper size from the Layout tab by clicking Size. Word provides preset sizes such as Letter, Legal, and A4.",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_size_command.png",
                alt: "Size command button",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_size_menu.png",
                alt: "Paper size dropdown menu",
                },
            ],
            },

            // ---------------- CUSTOM SIZE ----------------
            {
            heading: "Custom Paper Size",
            blocks: [
                {
                type: "paragraph",
                text:
                    "To define a custom paper size, click More Paper Sizes to open the Page Setup dialog box and manually enter width and height.",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_custom_size_menu.png",
                alt: "More paper sizes option",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_custom_size_page_setup.png",
                alt: "Custom paper size dialog",
                },
            ],
            },

            // ---------------- PAGE SETUP DIALOG ----------------
            {
            heading: "Using the Page Setup Dialog Box",
            blocks: [
                {
                type: "paragraph",
                text:
                    "The Page Setup launcher provides full control over margins, paper size, orientation, and layout options in one place.",
                },
                {
                type: "image",
                src: "/images/word/page-layout/layout_page_setup.png",
                alt: "Page setup launcher",
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
                    "After adjusting margins, orientation, and paper size, your completed document should look like this:",
                },
                {
                type: "image",
                src: "/images/word/page-layout/word2016_page_layout_img.png",
                alt: "Completed page layout example",
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
                "Change the margins to Narrow.",
                "Set orientation to Landscape.",
                "Change the paper size to Legal.",
                "Create custom margins of 0.75 inches on all sides.",
                "Open the Page Setup dialog box and review all layout settings.",
            ],
            },
        ],
    },

   
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

{
  slug: "breaks",
  title: "Breaks (Page, Column & Section)",
  description:
    "Learn how to insert, manage, and delete page breaks, column breaks, and section breaks in Microsoft Word.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/78fvQ9Ks8DA",

  practiceFiles: [
    {
      name: "Word Breaks Practice File",
      url: "/practice/word/module-3/breaks/word_breaks_practice.docx",
    },
  ],

  sections: [

    // ---------------- INTRO TO BREAKS ----------------
    {
      heading: "Understanding Breaks",
      blocks: [
        {
          type: "paragraph",
          text:
            "Breaks allow you to control how content flows in your document. You can force text onto a new page, start a new column, or create a new section with different formatting.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_section_intro.png",
          alt: "Break types overview",
        },
      ],
    },

    // ---------------- PAGE BREAK ----------------
    {
      heading: "Inserting a Page Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "A page break forces content to begin on the next page. Go to the Insert tab and click Page Break, or press Ctrl + Enter.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_page_command.png",
          alt: "Insert page break command",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_page_done.png",
          alt: "Page break result",
        },
      ],
    },

    // ---------------- SECTION BREAK ----------------
    {
      heading: "Inserting a Section Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "Section breaks allow different formatting in different parts of the document, such as changing columns, margins, or orientation.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_section_command.png",
          alt: "Section break menu",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_section_added.png",
          alt: "Section break added",
        },
      ],
    },

    // ---------------- TYPES OF SECTION BREAKS ----------------
    {
      heading: "Types of Section Breaks",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word provides several types of section breaks: Next Page, Continuous, Even Page, and Odd Page. Continuous section breaks are useful when changing formatting without starting a new page.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_section_start.png",
          alt: "Section break options",
        },
      ],
    },

    // ---------------- COLUMN BREAK ----------------
    {
      heading: "Column Breaks",
      blocks: [
        {
          type: "paragraph",
          text:
            "A column break forces text to move to the next column. This is useful when working with multi-column layouts.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_other_intro.png",
          alt: "Column break option",
        },
      ],
    },

    // ---------------- SHOW HIDE ----------------
    {
      heading: "Viewing Breaks with Show/Hide",
      blocks: [
        {
          type: "paragraph",
          text:
            "Breaks are invisible by default. Click the Show/Hide ¶ button on the Home tab to display formatting marks and see where breaks are located.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_delete_showhide.png",
          alt: "Show hide formatting marks",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_page_splat_showhide.png",
          alt: "Visible page break",
        },
      ],
    },

    // ---------------- DELETING BREAKS ----------------
    {
      heading: "Deleting a Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "To delete a break, place your cursor directly before it and press Delete. Removing a section break may change formatting in your document.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_delete_placeinsertion.png",
          alt: "Placing insertion point before break",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_delete_done.png",
          alt: "Break removed result",
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
            "After inserting and managing breaks correctly, your document should have clean page transitions and properly formatted sections.",
        },
        {
          type: "image",
          src: "/images/word/breaks/word2016_breaks_img_combined.png",
          alt: "Completed breaks example",
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
        "Insert a page break before the 'Monthly Revenue' section.",
        "Insert a section break before the 'Clients Overview' section.",
        "Change one section to a two-column layout.",
        "Use Show/Hide to display formatting marks.",
        "Delete an unnecessary page or section break.",
      ],
    },
  ],
},

  
];
