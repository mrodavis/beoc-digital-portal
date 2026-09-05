import { Lesson } from "@/types/lesson";

export const wordModule6Lessons: Lesson[] = [
   {
        slug: "page-layout",
        title: "Page Layout",
        description:
            "Learn how to adjust margins, orientation, paper size, and use the Page Setup dialog box in Microsoft Word.",
        objectives: [
          "Set margins, orientation, and paper size for a specific purpose",
          "Explain when landscape orientation is genuinely the right choice",
          "Use the Page Setup dialog for settings not on the Ribbon",
          "Account for binding and hole-punching when setting margins",
        ],
        duration: "12 min",
        videoUrl: "https://www.youtube.com/embed/aRvVeiWmFZk",

        practiceFiles: [
            {
            name: "Word Page Layout Practice File",
            url: "/practice/word/module-6/page-layout/word_pagelayout_practice.docx",
            },
        ],

        sections: [

          {
             heading: "Margins are a reading decision",
             blocks: [
               {
                 type: "scenario",
                 role: "You are producing the staff handbook at Lakeside Medical Associates.",
                 text: "To save paper you set every margin to half an inch. The handbook is then three-hole punched for binders, and the punch removes the first character of every line on odd pages. Sixty pages, reprinted.",
                 task: "Set margins for how the document will physically be used, not only for how it looks on screen.",
               },
               {
                 type: "paragraph",
                 text: "Margins do three jobs: they leave room for hands and binding, they give the eye a rest at the end of each line, and they control line length. Very wide text is genuinely harder to read, because the eye loses its place traveling back to the start of the next line. The one-inch default is a reasonable compromise for most documents, not an arbitrary number.",
               },
               {
                 type: "paragraph",
                 text: "Orientation should follow the content. Portrait suits text, because it produces comfortable line lengths. Landscape suits wide tables, timelines, and charts that do not fit across a portrait page. A landscape page of body text has lines so long they are tiring to read — if you are reaching for landscape to fit text, the real fix is usually columns.",
               },
               {
                 type: "table",
                 caption: "Margin settings by purpose",
                 columns: [
                   "Purpose",
                   "Setting",
                   "Note",
                 ],
                 rows: [
                   [
                     "Standard letter or report",
                     "1 inch all round",
                     "Word's default; safe for any printer",
                   ],
                   [
                     "Bound or hole-punched",
                     "Gutter margin 0.5 in, left",
                     "Page Setup > Margins > Gutter adds space for binding without shifting the text block",
                   ],
                   [
                     "Double-sided binding",
                     "Mirror margins",
                     "Inside margins face each other so binding space lands correctly on both sides",
                   ],
                   [
                     "Maximum content per page",
                     "0.5 in",
                     "Only for documents that stay flat and unbound",
                   ],
                 ],
               },
               {
                 type: "tip",
                 text: "Almost every printer has an unprintable edge, typically a quarter inch. Margins narrower than that will have content clipped, regardless of what the screen shows. If you must go narrow, print one test page before running the job.",
               },
             ],
           },

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
            {
            heading: "Knowledge Check",
            blocks: [
                {
                type: "knowledge-check",
                question: "Which page orientation makes the page wider than it is tall?",
                options: [
                    "Portrait",
                    "Landscape",
                    "Custom",
                    "Letter",
                ],
                correctIndex: 1,
                explanation: "Landscape rotates the page so the long edge runs horizontally, making it wider than tall. It suits wide tables and charts; portrait suits body text because it produces more comfortable line lengths.",
                optionRationales: [
                  "Portrait is the taller-than-wide default, right for most text documents.",
                  "Correct. Landscape orients the page so it is wider than it is tall, which suits wide tables and charts.",
                  "Custom refers to a user-defined paper size, not an orientation.",
                  "Letter is a paper size, 8.5 by 11 inches. Size and orientation are independent settings.",
                ],
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
    objectives: [
      "Set first-line and hanging indents using the ruler and the Paragraph dialog",
      "Explain what a hanging indent is for and where it is required",
      "Set and clear tab stops, including decimal and right-aligned tabs",
      "Recognize why spaces are never a substitute for tabs or indents",
    ],
    duration: "8 min",
    videoUrl: "https://www.youtube.com/embed/vJGYWVe52T4?si=P2fE667vh32d5DfJ",

    practiceFiles: [
        {
        name: "Word Indents & Tabs Practice File",
        url: "/practice/word/module-6/indents-tabs/word_indentstabs_practice.docx",
        },
    ],

    sections: [

      {
         heading: "Never align with the space bar",
         blocks: [
           {
             type: "scenario",
             role: "You are compiling a reference list for a staff training packet at Lakeside Medical Associates.",
             text: "You align the second line of each reference with spaces until it looks right. You then change the font from Calibri to Times New Roman, and every alignment collapses, because the new font's space character is a different width. Forty references, all wrong.",
             task: "Use indents and tab stops, so alignment is a property of the paragraph and survives every font change.",
           },
           {
             type: "paragraph",
             text: "The distinction is worth stating plainly. A space is a character whose width depends on the font. An indent is a measured property of the paragraph. A tab stop is a defined position on the ruler. Indents and tab stops are exact and stable; spaces are approximate and break the moment anything changes.",
           },
           {
             type: "paragraph",
             text: "A hanging indent puts the first line at the margin and indents every subsequent line. It is what citation styles require for reference lists, because it makes the author surnames line up down the left edge so a reader can scan them. Set it in Paragraph > Indentation > Special > Hanging, or by dragging the lower triangle on the ruler.",
           },
           {
             type: "table",
             caption: "Tab stop types",
             columns: [
               "Type",
               "Aligns text",
               "Use for",
             ],
             rows: [
               [
                 "Left",
                 "Left edge at the stop",
                 "Ordinary columns of text",
               ],
               [
                 "Center",
                 "Centered on the stop",
                 "Column headings",
               ],
               [
                 "Right",
                 "Right edge at the stop",
                 "Page numbers in a contents list",
               ],
               [
                 "Decimal",
                 "Decimal points at the stop",
                 "Columns of currency or measurements",
               ],
               [
                 "Bar",
                 "Draws a vertical line",
                 "A visual divider between columns",
               ],
             ],
           },
           {
             type: "tip",
             text: "Decimal tabs are the reason a column of prices lines up on the decimal point regardless of how many digits each number has. Click the tab selector at the left end of the ruler until it shows the decimal tab, then click on the ruler where the decimal points should sit.",
           },
         ],
       },

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
        {
        heading: "Knowledge Check",
        blocks: [
            {
            type: "knowledge-check",
            question: "What is a hanging indent?",
            options: [
                "All lines of a paragraph are indented equally",
                "Only the first line is indented; remaining lines stay at the margin",
                "All lines except the first are indented",
                "The paragraph is indented from the right margin only",
            ],
            correctIndex: 2,
            explanation: "A hanging indent leaves the first line at the margin and indents all following lines. Reference lists use it so the author surnames align down the left edge and can be scanned quickly.",
            optionRationales: [
              "Indenting every line equally is a block indent, used for long quotations.",
              "That is a first-line indent, the traditional way to mark the start of a paragraph in continuous prose. A hanging indent is its mirror image.",
              "Correct. The first line sits at the margin and every subsequent line is indented.",
              "Indenting from the right is a right indent, which is usually combined with a left indent for block quotations.",
            ],
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
    objectives: [
      "Set line spacing and space before and after paragraphs",
      "Explain why blank paragraphs are a poor way to create vertical space",
      "Choose spacing appropriate to the document's purpose",
      "Use Keep with next to stop headings being stranded at the foot of a page",
    ],
    duration: "10 min",
    videoUrl: "https://www.youtube.com/embed/mXWvKHWe2Co?si=ALpc88kNziEZhfGI",

    practiceFiles: [
      {
        name: "Word Line and Paragraph Spacing Practice File",
        url: "/practice/word/module-6/line-paragraph-spacing/word_lineparagraphspacing_practice.docx",
      },
    ],

    sections: [

      {
         heading: "Press Enter twice and you have made a formatting problem",
         blocks: [
           {
             type: "scenario",
             role: "You are formatting a twelve-page policy document at Lakeside Medical Associates.",
             text: "You separate paragraphs by pressing Enter twice throughout. Your supervisor asks for slightly tighter spacing. There is no setting to change — the spacing is made of empty paragraphs, so you must find and delete a hundred and forty of them by hand, and some of them are now stranded at the tops of pages.",
             task: "Create vertical space with paragraph spacing settings, so it can be adjusted everywhere in one action.",
           },
           {
             type: "paragraph",
             text: "Space Before and Space After are properties of a paragraph, set in the Paragraph dialog or under Layout > Spacing. Because they are properties, they can be changed globally — or built into a style, so every paragraph using that style updates at once. Blank paragraphs are content, and content has to be edited one instance at a time.",
           },
           {
             type: "paragraph",
             text: "Empty paragraphs cause a second problem: they land at page boundaries. A blank paragraph pushed to the top of a page leaves an unexplained gap, and screen readers announce empty paragraphs, so a document padded this way is read aloud with meaningless pauses.",
           },
           {
             type: "table",
             caption: "Spacing conventions",
             columns: [
               "Document",
               "Line spacing",
               "Paragraph spacing",
             ],
             rows: [
               [
                 "Business letter",
                 "Single",
                 "6-12 pt after",
               ],
               [
                 "Academic paper",
                 "Double",
                 "0 pt, first-line indent instead",
               ],
               [
                 "Document for review",
                 "1.5 lines",
                 "Extra room for handwritten notes",
               ],
               [
                 "Dense reference table",
                 "Single",
                 "Minimal — the structure does the separating",
               ],
             ],
           },
           {
             type: "tip",
             text: "Paragraph > Line and Page Breaks > Keep with next binds a paragraph to the one after it, so a heading can never be left alone at the bottom of a page. Setting it on your heading styles fixes the problem permanently across the whole document.",
           },
         ],
       },
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
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which spacing setting adds extra space between paragraphs without using blank lines?",
            options: [
              "Line spacing set to Double",
              "Spacing Before or After paragraphs",
              "Increase Indent",
              "Column spacing",
            ],
            correctIndex: 1,
            explanation: "Space Before and Space After are paragraph properties, so they can be adjusted document-wide in one action or built into a style. Blank paragraphs are content, which must be found and deleted individually.",
            optionRationales: [
              "Double line spacing increases the gap between every line inside a paragraph, not the gap between paragraphs.",
              "Correct. Space Before and After are paragraph properties, adjustable everywhere at once and safe at page boundaries.",
              "Increase Indent moves the paragraph horizontally. It has no effect on vertical space.",
              "Column spacing controls the gutter between columns in a multi-column layout — horizontal, not vertical.",
            ],
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
  objectives: [
    "Insert page, column, and section breaks and explain how they differ",
    "Choose the right section break type for a layout change",
    "Reveal breaks with Show/Hide to diagnose layout problems",
    "Replace repeated Enter presses with a proper page break",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/78fvQ9Ks8DA",

  practiceFiles: [
    {
      name: "Word Breaks Practice File",
      url: "/practice/word/module-6/breaks/word_breaks_practice.docx",
    },
  ],

  sections: [

    {
       heading: "The difference between a page break and a section break",
       blocks: [
         {
           type: "scenario",
           role: "You are assembling the annual report at Lakeside Medical Associates.",
           text: "The report is portrait, but the budget table in the middle needs a landscape page. You set orientation to landscape and every page in the document rotates. You undo, try again, and get the same result.",
           task: "Learn which break creates an independent region of the document, because orientation applies to sections, not pages.",
         },
         {
           type: "paragraph",
           text: "A page break simply moves the following content to the next page. Everything stays in the same section, so it keeps the same margins, orientation, headers, and page numbering. It is the right tool for starting a new chapter on a fresh page.",
         },
         {
           type: "paragraph",
           text: "A section break creates a genuinely independent region that can have its own orientation, margins, columns, headers, and page numbering. That is why the landscape budget table needs section breaks before and after it: only then can that one region rotate while the rest of the report stays portrait.",
         },
         {
           type: "table",
           caption: "Break types",
           columns: [
             "Break",
             "Effect",
             "Use for",
           ],
           rows: [
             [
               "Page",
               "Content continues on the next page",
               "Starting a chapter on a new page",
             ],
             [
               "Column",
               "Content continues in the next column",
               "Controlling where a column ends in a newsletter",
             ],
             [
               "Section: Next Page",
               "New section starting on a new page",
               "A landscape page inside a portrait document",
             ],
             [
               "Section: Continuous",
               "New section on the same page",
               "Changing column count partway down a page",
             ],
             [
               "Section: Even/Odd Page",
               "New section on the next even or odd page",
               "Chapters that must always start on a right-hand page",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "Never create a page break by pressing Enter repeatedly. Those empty paragraphs stay where they are while the text around them reflows, so adding one sentence earlier in the document pushes your heading to the middle of the next page. Ctrl+Enter inserts a real page break that always starts a new page regardless of what changes above it.",
         },
         {
           type: "tip",
           text: "Turn on Show/Hide (¶ on the Home tab, or Ctrl+Shift+8) to see breaks as labeled dotted lines. When a document's layout is misbehaving in a way you cannot explain, this is the first diagnostic — an unexpected section break is one of the most common causes.",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What type of break forces content to start on a new page?",
          options: [
            "Page break",
            "Column break",
            "Continuous section break",
            "Next Page section break",
          ],
          correctIndex: 0,
          explanation: "A page break moves subsequent content to the next page while keeping it in the same section, so margins, orientation, and headers are unchanged. Ctrl+Enter inserts one.",
          optionRationales: [
            "Correct. A page break starts a new page while leaving the section — and therefore the layout settings — unchanged.",
            "A column break moves content to the top of the next column, which only reaches a new page in the last column of a page.",
            "A continuous section break starts a new section without starting a new page, so it deliberately does not force a page change.",
            "A Next Page section break does start a new page, but it also creates a new section. When you only need a new page, that is more than you want — the extra section can cause header and numbering surprises later.",
          ],
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
{
  slug: "columns",
  title: "Columns",
  description:
    "Learn how to create, customize, and remove columns in Microsoft Word, including how to use column breaks and adjust column spacing.",
  objectives: [
    "Apply a multi-column layout to a whole document or a selection",
    "Control where a column ends with a column break",
    "Choose a column count and width appropriate to the page",
    "Explain why columns are a readability tool",
  ],
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/X1n2VG1yxFs?si=WLrIc_XyiWiQtSBB",

  practiceFiles: [
    {
      name: "Word Columns Practice File",
      url: "/practice/word/module-6/columns/word_columns_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Columns exist to shorten the line",
       blocks: [
         {
           type: "scenario",
           role: "You are laying out the patient newsletter at Lakeside Medical Associates.",
           text: "Your first draft runs the text full width across the page. Readers report it feels like hard work, though they cannot say why. The sentences are fine. The lines are simply too long — the eye keeps losing its place traveling back to the start of the next one.",
           task: "Use columns to bring the line length into the range people read comfortably.",
         },
         {
           type: "paragraph",
           text: "Typographers generally aim for roughly 50 to 75 characters per line. Beyond that, the return sweep from the end of one line to the start of the next becomes unreliable and readers lose their place. On a letter-size page at 11 point, full-width text runs closer to 100 characters, which is why newsletters and magazines are almost always set in columns.",
         },
         {
           type: "paragraph",
           text: "Apply columns from Layout > Columns. Applied with nothing selected, it affects the whole section; with text selected, Word adds continuous section breaks around the selection so only that part becomes multi-column. This is how a newsletter has a full-width masthead above two-column body text.",
         },
         {
           type: "tip",
           text: "A column break (Ctrl+Shift+Enter) pushes the following text to the top of the next column. Use it to stop an article ending with one stranded line, or to make two columns end level at the foot of the page.",
         },
         {
           type: "callout",
           variant: "info",
           text: "Two columns suit letter-size portrait pages. Three is workable for short items such as listings but gets tight for body text — narrow columns force awkward hyphenation and ragged spacing. If a three-column layout looks cramped, the answer is usually two columns or a smaller font, not narrower gutters.",
         },
       ],
     },

    // ---------------- INTRO TO COLUMNS ----------------
    {
      heading: "Adding Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "Columns allow text to flow from top to bottom in one column, then continue at the top of the next column—similar to newspapers or newsletters.",
        },
        {
          type: "paragraph",
          text:
            "To add columns, select your text, go to the Layout tab, and click Columns. Then choose Two, Three, or another preset option.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_add_select.png",
          alt: "Selecting text before applying columns",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_add_menu.png",
          alt: "Columns dropdown menu",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_add_result.png",
          alt: "Text displayed in two columns",
        },
      ],
    },

    // ---------------- COLUMN BREAKS ----------------
    {
      heading: "Inserting a Column Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "A column break forces text to move to the top of the next column immediately.",
        },
        {
          type: "paragraph",
          text:
            "Place your insertion point where you want the new column to begin. Then go to Layout → Breaks → Column.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_break_menu.png",
          alt: "Breaks menu showing column break",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_break_insert_callout.png",
          alt: "Inserting a column break",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_break_result.png",
          alt: "Column break result",
        },
      ],
    },

    // ---------------- CUSTOMIZING COLUMNS ----------------
    {
      heading: "Customizing Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "To adjust column width or spacing, click Columns and choose More Columns.",
        },
        {
          type: "paragraph",
          text:
            "From the Columns dialog box, you can change the number of columns, adjust spacing, and add a line between columns.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_more_columns.png",
          alt: "More Columns dialog box",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_indent_markers.png",
          alt: "Column spacing and indent markers",
        },
      ],
    },

    // ---------------- REMOVING COLUMNS ----------------
    {
      heading: "Removing Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove columns, select the text and go to Layout → Columns → One.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_remove_menu.png",
          alt: "Columns menu showing One column",
        },
      ],
    },

    // ---------------- REMOVING COLUMN BREAKS ----------------
    {
      heading: "Removing a Column Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "To delete a column break, turn on Show/Hide (¶) to reveal formatting marks. Then place your insertion point before the break and press Delete.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_remove_breaks_showhide.png",
          alt: "Show/Hide formatting marks",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_remove_breaks_insertion.png",
          alt: "Selecting column break",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_remove_breaks_result.png",
          alt: "Column break removed",
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
            "After applying columns and adjusting spacing properly, your newsletter should look clean, balanced, and professionally formatted.",
        },
        {
          type: "image",
          src: "/images/word/columns/word2016_columns2_img.png",
          alt: "Completed newsletter with two columns",
        },
      ],
    },
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is a column break used for?",
          options: [
            "To remove all columns and return to a single-column layout",
            "To add a line between two columns",
            "To force text to the top of the next column",
            "To change the number of columns in the document",
          ],
          correctIndex: 2,
          explanation: "A column break forces the following text to the top of the next column. Use it to control where a column ends rather than letting the text break wherever it happens to fall.",
          optionRationales: [
            "Returning to a single column is done from Layout > Columns > One, which changes the layout rather than inserting a break.",
            "The line between columns is the 'Line between' option in the Columns dialog, a formatting setting rather than a break.",
            "Correct. The text after the break moves to the top of the next column.",
            "The number of columns is set in the Columns dialog. A column break works within whatever layout is already applied.",
          ],
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
        "Convert the Community Reminders section into two columns.",
        "Insert a column break after the first bullet.",
        "Adjust spacing between columns using More Columns.",
        "Add a line between columns.",
        "Remove the column break.",
        "Return the section to one column.",
      ],
    },
  ],
}


  
];
