import { Lesson } from "@/types/lesson";

export const wordModule3Lessons: Lesson[] = [
{
  slug: "pictures-text-wrapping",
  title: "Pictures & Text Wrapping",
  description:
    "Learn how to insert images, resize them properly, and control how text wraps around pictures in Microsoft Word.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/sqkEDw99szg",

  practiceFiles: [
    {
      name: "Word Pictures & Text Wrapping Practice File",
      url: "/practice/word/module-3/pictures-text-wrapping/word_picturestextwrapping_practice.docx",
    },
  ],

  sections: [

    // ---------------- INSERT FROM DEVICE ----------------
    {
      heading: "Inserting a Picture from Your Computer",
      blocks: [
        {
          type: "paragraph",
          text:
            "To insert a picture from your computer, go to the Insert tab and click Pictures. Then choose This Device and select your image.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/pictures_insert.jpg",
          alt: "Insert picture from device",
        },
      ],
    },

    // ---------------- INSERT ONLINE ----------------
    {
      heading: "Inserting an Online Picture",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can also insert images from online sources. Click Insert → Online Pictures, search for a keyword, select an image, and click Insert.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/pictures_search.jpg",
          alt: "Online picture search window",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/pictures_onedrive.jpg",
          alt: "Online pictures category screen",
        },
      ],
    },

    // ---------------- RESIZING ----------------
    {
      heading: "Resizing a Picture",
      blocks: [
        {
          type: "paragraph",
          text:
            "To resize a picture, click the image and drag a corner handle. Dragging from the corner keeps the image proportional and prevents distortion.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/insert_picture_resize.png",
          alt: "Resize image using corner handles",
        },
      ],
    },

    // ---------------- WRAP TEXT INTRO ----------------
    {
      heading: "Understanding Text Wrapping",
      blocks: [
        {
          type: "paragraph",
          text:
            "By default, pictures are inserted In Line with Text. To freely move and position a picture, you must change its wrapping style.",
        },
        {
          type: "paragraph",
          text:
            "Select the image, then click the Layout Options icon or go to Picture Format → Wrap Text.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-23-34.png",
          alt: "Layout options button",
        },
      ],
    },

    // ---------------- WRAP OPTIONS ----------------
    {
      heading: "Wrap Text Options",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word provides several wrapping options: In Line with Text, Square, Tight, Through, Top and Bottom, Behind Text, and In Front of Text.",
        },
        {
          type: "paragraph",
          text:
            "Square wrapping is commonly used in newsletters because it allows text to flow neatly around the image.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-24-44.png",
          alt: "Wrap text menu options",
        },
      ],
    },

    // ---------------- SQUARE WRAP ----------------
    {
      heading: "Using Square Text Wrapping",
      blocks: [
        {
          type: "paragraph",
          text:
            "After selecting Square wrapping, drag the image to position it. The surrounding text will automatically adjust around the picture.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-26-17.png",
          alt: "Square wrapping applied",
        },
      ],
    },

    // ---------------- TOP AND BOTTOM ----------------
    {
      heading: "Using Top and Bottom Wrapping",
      blocks: [
        {
          type: "paragraph",
          text:
            "Top and Bottom wrapping places text above and below the image only. This is useful when separating content sections.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-27-19.png",
          alt: "Top and bottom wrapping example",
        },
      ],
    },

    // ---------------- MOVE VS FIX ----------------
    {
      heading: "Move with Text vs Fix Position",
      blocks: [
        {
          type: "paragraph",
          text:
            "When using wrapping styles, you can choose Move with Text or Fix Position on Page. Move with Text keeps the image connected to surrounding content.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-27-59.png",
          alt: "Move with text option",
        },
      ],
    },

    // ---------------- POSITION PRESETS ----------------
    {
      heading: "Using Position Presets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Instead of manually dragging images, use Picture Format → Position to choose preset layout options.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-50-34.png",
          alt: "Position preset menu",
        },
      ],
    },

    // ---------------- ALIGN TOOLS ----------------
    {
      heading: "Aligning Images",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Picture Format → Align to align images precisely. Alignment guides help create professional layouts.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-11_10-50-52.png",
          alt: "Align tools in picture format",
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
            "After inserting and wrapping images properly, your newsletter should have balanced spacing, clear structure, and professional image placement.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/word2016_pictureswrapping2_img.png",
          alt: "Completed newsletter with wrapped images",
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
        "Insert a picture from your computer.",
        "Apply Square text wrapping.",
        "Insert an online image.",
        "Apply Top and Bottom wrapping to one image.",
        "Use Position presets to adjust layout.",
        "Align the image using alignment tools.",
        "Ensure images are set to Move with Text.",
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
{
  slug: "columns",
  title: "Columns",
  description:
    "Learn how to create, customize, and remove columns in Microsoft Word, including how to use column breaks and adjust column spacing.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/X1n2VG1yxFs?si=WLrIc_XyiWiQtSBB",

  practiceFiles: [
    {
      name: "Word Columns Practice File",
      url: "/practice/word/module-3/columns/word_columns_practice.docx",
    },
  ],

  sections: [

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
