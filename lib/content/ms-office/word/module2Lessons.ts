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
    slug: "find-and-replace",
    title: "Using Find & Replace",
    description:
        "Learn how to search for text, navigate results, and replace words or phrases efficiently in Microsoft Word.",
    duration: "8 min",
    videoUrl: "https://www.youtube.com/embed/p3Ql9y3eEyo?si=ZQ4tqLb9hhar33zv",

    practiceFiles: [
        {
        name: "Word Find and Replace Practice File",
        url: "/practice/word/module-2/find-and-replace/word_findreplace_practice.docx",
        },
    ],

    sections: [
        // ---------------- FIND ----------------
        {
        heading: "Using Find (Ctrl + F)",
        blocks: [
            {
            type: "paragraph",
            text:
                "The Find command allows you to search for specific words or phrases in a document. Press Ctrl + F or click Find in the Editing group on the Home tab.",
            },
            {
            type: "image",
            src: "/images/word/find-replace/2016-01-05_12-20-50.png",
            alt: "Find command button",
            },
            {
            type: "image",
            src: "/images/word/find-replace/2016-01-05_12-22-01.png",
            alt: "Navigation pane showing results",
            },
            {
            type: "paragraph",
            text:
                "The Navigation pane displays all matching results. Click any result to jump directly to that location in the document.",
            },
        ],
        },

        // ---------------- ADVANCED FIND ----------------
        {
        heading: "Advanced Find Options",
        blocks: [
            {
            type: "paragraph",
            text:
                "Click the dropdown arrow in the Navigation pane to access Advanced Find. This allows you to refine your search or locate specific elements such as tables, graphics, or footnotes.",
            },
            {
            type: "image",
            src: "/images/word/find-replace/2016-01-05_12-23-11.png",
            alt: "Advanced find options menu",
            },
        ],
        },

        // ---------------- REPLACE ----------------
        {
        heading: "Using Replace (Ctrl + H)",
        blocks: [
            {
            type: "paragraph",
            text:
                "The Replace command allows you to search for text and automatically replace it with new text. Press Ctrl + H or click Replace in the Editing group.",
            },
            {
            type: "image",
            src: "/images/word/find-replace/2016-01-05_12-25-23.png",
            alt: "Replace command",
            },
            {
            type: "image",
            src: "/images/word/find-replace/2016-01-05_12-26-17.png",
            alt: "Find and Replace dialog box",
            },
            {
            type: "image",
            src: "/images/word/find-replace/2016-01-05_12-29-47.png",
            alt: "Replace example",
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
                "After using Replace All, every instance of the word is updated throughout the document instantly.",
            },
            {
            type: "image",
            src: "/images/word/find-replace/2016-01-11_08-48-30.png",
            alt: "Final replaced document result",
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
            "Use Find to search for the word 'fiction'.",
            "Navigate through all results using the arrows in the Navigation pane.",
            "Open Replace (Ctrl + H).",
            "Replace 'Sewanee Review' with 'SR'.",
            "Use Replace All to update the entire document.",
            "Verify that all instances were correctly replaced.",
        ],
        },
    ],
    },
  
{
  slug: "lists",
  title: "Lists (Bulleted, Numbered & Multilevel)",
  description:
    "Learn how to create, customize, and manage bulleted, numbered, and multilevel lists in Microsoft Word.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/tyXahko-tX8",

  practiceFiles: [
    {
      name: "Word Lists Practice File",
      url: "/practice/word/module-2/lists/word_lists_practice.docx",
    },
  ],

  sections: [

    {
      heading: "Creating a Bulleted List",
      blocks: [
        {
          type: "paragraph",
          text:
            "Bulleted lists are useful when order does not matter. Select your text, then click the Bullets button in the Paragraph group on the Home tab.",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_create_bulleted_select.png",
          alt: "Selecting text before applying bullets",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_create_bulleted_command.png",
          alt: "Bullets command button",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_create_bulleted_result2.png",
          alt: "Bulleted list result",
        },
      ],
    },

    {
      heading: "Customizing Bullets",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can customize bullets using symbols, fonts, or colors by selecting Define New Bullet from the dropdown menu.",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_bullet_symbol_define2.png",
          alt: "Define new bullet dialog",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_bullet_symbol_wingdings.png",
          alt: "Wingdings symbol selection",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_bullet_symbol_result.png",
          alt: "Custom bullet result",
        },
      ],
    },

    {
      heading: "Changing Bullet Color",
      blocks: [
        {
          type: "paragraph",
          text:
            "Bullet colors can be changed independently from text color using the Font option inside Define New Bullet.",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_bullet_color_menu.png",
          alt: "Bullet color menu",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_bullet_color_result.png",
          alt: "Green bullet result",
        },
      ],
    },

    {
      heading: "Creating a Numbered List",
      blocks: [
        {
          type: "paragraph",
          text:
            "Numbered lists are used when order matters. Select your text and click the Numbering button in the Paragraph group.",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_create_numbered_select.png",
          alt: "Selecting text for numbering",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_create_numbered_result.png",
          alt: "Numbered list result",
        },
      ],
    },

    {
      heading: "Restarting or Continuing Numbering",
      blocks: [
        {
          type: "paragraph",
          text:
            "Right-click a numbered list to restart numbering at 1 or continue numbering from a previous list.",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_restart_numbering_menu.png",
          alt: "Restart numbering menu",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_restart_numbering_result.png",
          alt: "Restart numbering result",
        },
      ],
    },

    {
      heading: "Multilevel Lists",
      blocks: [
        {
          type: "paragraph",
          text:
            "Multilevel lists allow sub-items under main items. Use the Increase Indent and Decrease Indent buttons to change levels.",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_multilevel_create_select2.png",
          alt: "Multilevel list dropdown",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_multilevel_level_increase2.png",
          alt: "Increase indent",
        },
        {
          type: "image",
          src: "/images/word/lists/lists_multilevel_level_style.png",
          alt: "Multilevel result",
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
        "Create a bulleted list.",
        "Customize the bullet symbol.",
        "Change the bullet color.",
        "Create a numbered list.",
        "Restart numbering.",
        "Create a multilevel list with at least two levels.",
      ],
    },
  ],
},

{
  slug: "hyperlinks",
  title: "Links (Hyperlinks)",
  description:
    "Learn how to insert, edit, follow, and remove hyperlinks in Microsoft Word.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/mNJZo8ESMp0",

  practiceFiles: [
    {
      name: "Word Hyperlinks Practice File",
      url: "/practice/word/module-2/hyperlinks/word_hyperlinks_practice.docx",
    },
  ],

  sections: [

    // ---------------- INSERTING A HYPERLINK ----------------
    {
      heading: "Inserting a Hyperlink",
      blocks: [
        {
          type: "paragraph",
          text:
            "To insert a hyperlink, select the text you want to turn into a link. Then go to the Insert tab and click the Link button.",
        },
        {
          type: "image",
          src: "/images/word/hyperlinks/hyperlinks_format_select.png",
          alt: "Selecting text before inserting hyperlink",
        },
        {
          type: "image",
          src: "/images/word/hyperlinks/hyperlinks_format_insert.png",
          alt: "Insert hyperlink command",
        },
        {
          type: "image",
          src: "/images/word/hyperlinks/hyperlinks_format_result.png",
          alt: "Hyperlink result in document",
        },
      ],
    },

    // ---------------- FOLLOWING A HYPERLINK ----------------
    {
      heading: "Following a Hyperlink",
      blocks: [
        {
          type: "paragraph",
          text:
            "To follow a hyperlink in Word, hold the Ctrl key and click the link. This opens the webpage in your browser.",
        },
        {
          type: "image",
          src: "/images/word/hyperlinks/hyperlinks_understanding_ctrl_follow.png",
          alt: "Ctrl + Click to follow link",
        },
        {
          type: "image",
          src: "/images/word/hyperlinks/hyperlinks_understanding_website_example.png",
          alt: "Website example after clicking hyperlink",
        },
      ],
    },

    // ---------------- EDITING A HYPERLINK ----------------
    {
      heading: "Editing a Hyperlink",
      blocks: [
        {
          type: "paragraph",
          text:
            "To edit an existing hyperlink, right-click the link and choose Edit Hyperlink. You can change the display text or the web address.",
        },
        {
          type: "image",
          src: "/images/word/hyperlinks/hyperlinks_format_edit.png",
          alt: "Edit hyperlink option",
        },
      ],
    },

    // ---------------- REMOVING A HYPERLINK ----------------
    {
      heading: "Removing a Hyperlink",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove a hyperlink but keep the text, right-click the link and select Remove Hyperlink.",
        },
        {
          type: "image",
          src: "/images/word/hyperlinks/hyperlinks_format_remove.png",
          alt: "Remove hyperlink option",
        },
      ],
    },

    // ---------------- AUTO HYPERLINKS ----------------
    {
      heading: "Automatic Hyperlinks",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word automatically converts web addresses (like www.poolsafely.gov) into clickable hyperlinks when you press Enter or Space.",
        },
        {
          type: "image",
          src: "/images/word/hyperlinks/hyperlink_link.jpg",
          alt: "Automatic hyperlink example",
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
                "When you are finished, your page should look something like this.",
            },
        {
          type: "image",
          src: "/images/word/hyperlinks/word2016_hyperlink_img2.png",
          alt: "Insert Hyperlink dialog box",
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
        "Insert a hyperlink for 'City of Orlando'.",
        "Verify the link using Ctrl + Click.",
        "Edit the hyperlink address.",
        "Remove a hyperlink but keep the text.",
        "Create a hyperlink from a typed web address.",
      ],
    },
  ],
}

];
