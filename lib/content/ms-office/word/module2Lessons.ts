import { Lesson } from "@/types/lesson";

export const wordModule2Lessons: Lesson[] = [
  {
    slug: "text-basics",
    title: "Text Basics",
    description:
      "Learn how to insert, delete, select, cut, copy, paste, and move text efficiently in Word.",
    objectives: [
      "Select text precisely with the mouse, keyboard, and click shortcuts",
      "Explain the difference between cut, copy, and the clipboard",
      "Use Paste Special to bring in text without importing its formatting",
      "Insert symbols and special characters that are not on the keyboard",
    ],
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
         heading: "Selection is the skill underneath everything else",
         blocks: [
           {
             type: "scenario",
             role: "You are assembling a patient handout at Lakeside Medical Associates.",
             text: "A nurse sends you three paragraphs pasted from a manufacturer's website. You drop them into your handout and the text arrives in blue Arial 14 with a grey background, nothing like the rest of your document. You spend eleven minutes manually re-formatting it. There is a keystroke that would have prevented all eleven.",
             task: "Learn to control what comes along when text moves — and to select exactly the text you mean, the first time.",
           },
           {
             type: "paragraph",
             text: "Every edit in Word begins with a selection. Word applies commands to whatever is selected, so imprecise selection is the root cause of a surprising share of formatting problems — the stray space that gets bolded, the paragraph mark that carries its formatting into the next paragraph. Learning to select with intent removes a whole category of mistakes before it starts.",
           },
           {
             type: "table",
             caption: "Selection shortcuts worth committing to memory",
             columns: [
               "To select",
               "Do this",
               "Use it when",
             ],
             rows: [
               [
                 "A word",
                 "Double-click it",
                 "Replacing a single term",
               ],
               [
                 "A sentence",
                 "Ctrl + click anywhere in it",
                 "Rewriting one sentence in a dense paragraph",
               ],
               [
                 "A paragraph",
                 "Triple-click in it",
                 "Restyling or moving a whole block",
               ],
               [
                 "A block of text",
                 "Click at the start, Shift + click at the end",
                 "Any span too long to drag comfortably",
               ],
               [
                 "The whole document",
                 "Ctrl + A",
                 "Applying a font or spacing change everywhere",
               ],
               [
                 "A vertical block",
                 "Hold Alt and drag",
                 "Stripping a column of numbers out of pasted text",
               ],
             ],
           },
           {
             type: "paragraph",
             text: "The clipboard is the second idea. Cut removes text and holds it; copy duplicates it and holds it; paste places what is held. What most people never learn is that paste has options. Pasting normally brings the source formatting with it, which is why website text arrives looking like a website. Ctrl+Shift+V, or Paste Special > Keep Text Only, brings the words and leaves the formatting behind — and it is the single most useful keystroke in this lesson.",
           },
           {
             type: "callout",
             variant: "version",
             text: "In Microsoft 365, Word can be set to default to Keep Text Only for pasted content: File > Options > Advanced > Cut, copy, and paste, and set 'Pasting from other programs' to 'Keep Text Only.' If you paste from the web frequently, changing this once saves the cleanup every time. Office 2019 and Office 2024 have the same setting in the same place.",
           },
         ],
       },
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
      {
        heading: "Bringing in outside text cleanly",
        blocks: [
          {
            type: "worked-example",
            title: "Pasting three paragraphs from a website into a formatted handout",
            task: "Add manufacturer instructions to a patient handout so they match the handout's existing fonts and spacing rather than the website's.",
            steps: [
              {
                move: "Select the source text on the web page and copy it with Ctrl+C.",
                why: "Standard so far. The problem is not the copy — it is that the clipboard is carrying HTML formatting along with the words, and a normal paste will honor it.",
              },
              {
                move: "In Word, place the insertion point where the text belongs, then press Ctrl+Shift+V.",
                why: "This is Paste Text Only. Word discards the source fonts, colors, and background shading and inserts plain characters, which immediately take on the formatting of the paragraph they land in. The eleven minutes of cleanup never happen.",
              },
              {
                move: "If you already pasted normally, press Ctrl+Z and redo it — do not clean up by hand.",
                why: "Manually stripping formatting almost always leaves something behind: a hidden style, a character-level color, a residual background. Undoing and re-pasting correctly takes two seconds and leaves nothing.",
              },
              {
                move: "Turn on Show/Hide (¶) and check what actually arrived.",
                why: "Pasted web text often carries line breaks where paragraph marks belong, which breaks spacing and list numbering later. Seeing the marks lets you fix the structure now rather than wondering later why a style will not apply correctly.",
              },
            ],
            result: "Three paragraphs that match the handout exactly, with no residual web formatting and no manual cleanup.",
            takeaway: "Ctrl+Shift+V is the difference between importing words and importing someone else's design. Make it the default reflex for anything from outside your document.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which keyboard shortcut copies selected text?",
            options: [
              "Ctrl + X",
              "Ctrl + V",
              "Ctrl + C",
              "Ctrl + Z",
            ],
            correctIndex: 2,
            explanation: "Ctrl+C copies the selection to the clipboard, leaving the original in place. Its neighbors are worth learning together: Ctrl+X cuts (removes and holds), Ctrl+V pastes, and Ctrl+Z undoes.",
            optionRationales: [
              "Ctrl+X is cut — it removes the selected text and holds it on the clipboard rather than leaving it in place.",
              "Ctrl+V pastes whatever is currently on the clipboard. It is the other half of the operation, not the copy itself.",
              "Correct. Ctrl+C copies the selection to the clipboard and leaves the original text untouched.",
              "Ctrl+Z is undo, which reverses your last action. Useful, but unrelated to the clipboard.",
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
  objectives: [
    "Apply font, size, color, and emphasis deliberately rather than decoratively",
    "Explain why bold, italic, and underline carry different conventional meanings",
    "Use Format Painter to copy formatting from one passage to another",
    "Recognize when direct formatting should be replaced by a style",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/pmAl-8Tf8Pg?si=ObAc154cTG0NXlLk",

  practiceFiles: [
    {
      name: "Word Formatting Text Practice File",
      url: "/practice/word/module-2/formatting-text/word_formattext_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Formatting is communication, not decoration",
       blocks: [
         {
           type: "scenario",
           role: "You are producing a discharge instruction sheet at Lakeside Medical Associates.",
           text: "A patient needs to know two things above all: take the medication with food, and call immediately if a fever passes 101°F. You have written both. They sit in the middle of a wall of identical grey text, and the patient will read neither.",
           task: "Use formatting to make the most important information impossible to miss — and to make everything else recede.",
         },
         {
           type: "paragraph",
           text: "Emphasis works by contrast, which means it is a budget. If you bold six things on a page, you have bolded nothing — the reader's eye has no landing place. A page with two bold phrases directs attention exactly where you want it. The discipline is not learning what the buttons do; it is restraint about how often you press them.",
         },
         {
           type: "paragraph",
           text: "Conventions matter too, because readers have absorbed them. Bold signals importance and survives scanning. Italic signals a title, a term being defined, or a mild emphasis, and it is harder to read in long runs. Underline, on screen, reads as a hyperlink — underlining ordinary text is the fastest way to make readers click something that is not there. Use bold for emphasis and reserve underline for links.",
         },
         {
           type: "table",
           caption: "What each treatment conventionally means",
           columns: [
             "Treatment",
             "Conventional meaning",
             "Avoid",
           ],
           rows: [
             [
               "Bold",
               "This is critical; do not skip it",
               "More than two or three per page",
             ],
             [
               "Italic",
               "Title of a work, a defined term, or light emphasis",
               "Long passages — it slows reading",
             ],
             [
               "Underline",
               "A hyperlink",
               "Ordinary emphasis, on screen especially",
             ],
             [
               "ALL CAPS",
               "Short labels and warnings only",
               "Sentences — capitals remove word shape and slow reading",
             ],
             [
               "Color",
               "Category or status, when there is a legend",
               "Color alone as the only signal — it fails for colorblind readers",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "Never let color be the only thing carrying meaning. Roughly one in twelve men has some form of color vision deficiency, and a red 'urgent' line that is otherwise identical to the rest of the text is invisible to them. Pair color with bold, an icon, or a word — 'Urgent: call the office' works for everyone.",
         },
         {
           type: "tip",
           text: "Format Painter (the paintbrush on the Home tab) copies formatting rather than text. Click inside text formatted the way you want, click Format Painter, then drag across the target. Double-click the paintbrush to keep it active for multiple targets, and press Esc when you are done.",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which formatting option makes text appear slanted?",
          options: [
            "Bold",
            "Italic",
            "Underline",
            "Strikethrough",
          ],
          correctIndex: 1,
          explanation: "Italic slants the letterforms. It conventionally marks titles, defined terms, or light emphasis — but it is harder to read in long passages, so keep italic runs short.",
          optionRationales: [
            "Bold thickens the strokes to signal importance. It does not slant the letters.",
            "Correct. Italic slants the letterforms, conventionally marking titles, defined terms, or gentle emphasis.",
            "Underline draws a line beneath the text without changing its shape. On screen it reads as a hyperlink, so use it sparingly.",
            "Strikethrough draws a line through the text, marking it as deleted or superseded rather than slanting it.",
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
    objectives: [
      "Find text quickly and navigate results with the Navigation pane",
      "Use Replace All safely, and know when to replace one at a time instead",
      "Apply Match case and Find whole words only to avoid unintended matches",
      "Find and replace formatting, not just words",
    ],
    duration: "8 min",
    videoUrl: "https://www.youtube.com/embed/p3Ql9y3eEyo?si=ZQ4tqLb9hhar33zv",

    practiceFiles: [
        {
        name: "Word Find and Replace Practice File",
        url: "/practice/word/module-2/find-and-replace/word_findreplace_practice.docx",
        },
    ],

    sections: [

      {
         heading: "The command that saves an hour and the mistake that costs one",
         blocks: [
           {
             type: "scenario",
             role: "You maintain practice documents at Lakeside Medical Associates.",
             text: "The practice's billing contact changes and you must update the name in a forty-page policy manual. You open Replace, type the old surname, type the new one, and click Replace All. Word reports 63 replacements. The name appeared 61 times — the other two were inside the words 'Manning' and 'planning,' which are now nonsense.",
             task: "Learn the two checkboxes that turn Replace All from a risk into a reliable tool.",
           },
           {
             type: "paragraph",
             text: "Find (Ctrl+F) opens the Navigation pane and lists every match, letting you jump between them. Replace (Ctrl+H) swaps one string for another. The power of Replace All is genuine — it does in one second what would take forty minutes by hand — and so is its danger, because it does exactly what you asked across the entire document, including places you did not think about.",
           },
           {
             type: "paragraph",
             text: "Two options in the More menu prevent nearly every Replace accident. Find whole words only stops 'Ann' from matching inside 'Manning' and 'planning.' Match case stops 'IT' from matching inside 'it,' 'with,' and 'admit.' Together they narrow the search to what you actually meant.",
           },
           {
             type: "worked-example",
             title: "Replacing a name across a long document without breaking words",
             task: "Change every occurrence of the billing contact's surname in a forty-page manual, without touching words that merely contain those letters.",
             steps: [
               {
                 move: "Press Ctrl+H, then click More to expand the options.",
                 why: "The default Replace dialog hides the settings that make it safe. Expanding it first is the habit that prevents the mistake, because the checkboxes are not visible in the collapsed view.",
               },
               {
                 move: "Check 'Find whole words only' and 'Match case.'",
                 why: "Whole words stops the match from landing inside a longer word. Match case ensures you replace the proper noun and not a lowercase coincidence. These two settings account for the overwhelming majority of Replace All accidents.",
               },
               {
                 move: "Click Find Next two or three times before replacing anything.",
                 why: "This is the step that separates a careful operator from a hopeful one. Stepping through a few matches shows you what the search is actually catching. If the first three look right, the remaining sixty almost certainly are.",
               },
               {
                 move: "Click Replace All, then read the count Word reports.",
                 why: "The count is a free verification. If you expected about sixty and Word says sixty-one, that is plausible. If it says two hundred, something matched far more broadly than you intended — press Ctrl+Z immediately, before doing anything else.",
               },
             ],
             result: "Sixty-one accurate replacements and no corrupted words, verified by a count that matched expectation.",
             takeaway: "Expand More, restrict the match, spot-check with Find Next, then read the count. Replace All is safe when you have told it precisely what you mean.",
           },
           {
             type: "tip",
             text: "Replace also works on formatting. With the cursor in the Find field, click Format > Font to search for, say, all red text and replace it with black — useful for stripping the editing marks out of a draft that circulated for comment.",
           },
         ],
       },
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
        {
        heading: "Knowledge Check",
        blocks: [
            {
            type: "knowledge-check",
            question: "Which keyboard shortcut opens Find & Replace?",
            options: [
                "Ctrl + F",
                "Ctrl + G",
                "Ctrl + H",
                "Ctrl + R",
            ],
            correctIndex: 2,
            explanation: "Ctrl+H opens Find and Replace with the Replace tab active. Ctrl+F opens Find alone in the Navigation pane, which is what you want when you only need to locate something rather than change it.",
            optionRationales: [
              "Ctrl+F opens Find in the Navigation pane. It locates text but offers no way to replace it.",
              "Ctrl+G opens Go To, which jumps to a specific page, section, or bookmark rather than searching for text.",
              "Correct. Ctrl+H opens the dialog with the Replace tab active, ready to swap one string for another.",
              "Ctrl+R right-aligns the current paragraph. It is a formatting shortcut, unrelated to searching.",
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
  objectives: [
    "Choose between a bulleted and a numbered list based on whether order matters",
    "Build a multilevel list and promote or demote items with Tab and Shift+Tab",
    "Restart or continue numbering when Word guesses wrong",
    "Explain why manually typed numbers cause problems that list formatting avoids",
  ],
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
       heading: "The choice between bullets and numbers is a meaning choice",
       blocks: [
         {
           type: "scenario",
           role: "You are writing front-desk procedures at Lakeside Medical Associates.",
           text: "You document the check-in process as a bulleted list. A new hire reads it, verifies insurance before confirming the patient's identity, and discloses coverage details to the wrong person. The steps were all correct. Nothing told the reader they had to happen in order.",
           task: "Use list type to communicate whether sequence matters — because readers genuinely read it that way.",
         },
         {
           type: "paragraph",
           text: "Numbers mean sequence: do this, then this, then this. Bullets mean membership: these items belong to a set, in no particular order. Readers process that distinction automatically, which is exactly why using the wrong one misleads them. Any procedure where doing step three before step two causes a problem must be numbered.",
         },
         {
           type: "paragraph",
           text: "There is also a mechanical reason to use Word's list formatting rather than typing numbers yourself. A real numbered list renumbers itself when you insert or delete an item. A list of hand-typed numbers does not — insert a step in the middle and you must retype everything below it, and sooner or later a document goes out with two step fours. Let Word own the numbering.",
         },
         {
           type: "table",
           caption: "Which list type to use",
           columns: [
             "Content",
             "List type",
             "Reason",
           ],
           rows: [
             [
               "Check-in procedure",
               "Numbered",
               "Order is required; doing them out of sequence causes harm",
             ],
             [
               "Documents to bring to an appointment",
               "Bulleted",
               "All are needed; order is irrelevant",
             ],
             [
               "Policy manual with sections and subsections",
               "Multilevel",
               "Hierarchy is part of the meaning and cross-references depend on it",
             ],
             [
               "Ranked priorities",
               "Numbered",
               "The numbers carry the ranking, not just the sequence",
             ],
           ],
         },
         {
           type: "tip",
           text: "Inside a list, Tab demotes an item to the next level and Shift+Tab promotes it. This is far faster than the Multilevel List menu, and it works while you are typing, so you never have to break your rhythm to restructure.",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What type of list should you use when the order of items matters?",
          options: [
            "Bulleted list",
            "Multilevel list",
            "Numbered list",
            "Custom symbol list",
          ],
          correctIndex: 2,
          explanation: "Numbers signal sequence, so numbered lists are correct whenever the steps must happen in order. Bullets signal membership in a set, which tells the reader that order does not matter — a genuinely misleading signal on a procedure.",
          optionRationales: [
            "Bullets tell the reader the items form a set with no required order, which is precisely the wrong signal for a sequence.",
            "Multilevel lists express hierarchy — sections and subsections. They can be numbered, but the hierarchy is what they are for.",
            "Correct. Numbers communicate sequence, and Word renumbers automatically when you insert or remove a step.",
            "Custom symbols change how a bullet looks. That is decoration; it does not convey order.",
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
  objectives: [
    "Insert, edit, and remove hyperlinks, including links to places within the document",
    "Write link text that makes sense to someone reading it out of context",
    "Explain why 'click here' is a problem for screen reader users",
    "Control Word's automatic hyperlink formatting",
  ],
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/mNJZo8ESMp0",

  practiceFiles: [
    {
      name: "Word Hyperlinks Practice File",
      url: "/practice/word/module-2/hyperlinks/word_hyperlinks_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Link text is read out loud",
       blocks: [
         {
           type: "scenario",
           role: "You are publishing the patient resources page at Lakeside Medical Associates.",
           text: "Your document has nine links, and every one says 'click here.' A patient using a screen reader asks it to list the links on the page — a standard way to navigate. The software reads: click here, click here, click here, nine times. The page is unusable, and nothing about it looks wrong on screen.",
           task: "Write link text that says where the link goes, so the document works for everyone reading it.",
         },
         {
           type: "paragraph",
           text: "Screen readers can extract a list of every link in a document, and many people navigate that way rather than reading linearly. That means link text has to make sense standing alone. 'Click here' conveys nothing out of context. 'Download the new patient intake form' conveys everything, and it reads better on screen too.",
         },
         {
           type: "paragraph",
           text: "The rule is simple: put the destination in the link text itself. Instead of 'For directions, click here,' write 'See directions to our Lakeside office.' Instead of 'Our hours are listed here,' write 'View our current office hours.' The sentence gets shorter and the document gets more accessible at the same time.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Printed documents cannot be clicked. If a document will be printed as well as read on screen, write the destination so it survives on paper — 'visit lakesidemedical.example/forms' — or add the address in parentheses after a descriptive link. A printed page full of blue underlined 'click here' is a dead end.",
         },
         {
           type: "tip",
           text: "Ctrl+K inserts or edits a hyperlink on the selected text. In the same dialog, the ScreenTip button sets the tooltip that appears on hover, which is a good place for a note like 'opens in a new window' or 'PDF, 400 KB.'",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "How do you follow a hyperlink in a Word document?",
          options: [
            "Double-click the link",
            "Hold Ctrl and click the link",
            "Right-click and select Open Hyperlink",
            "Press Enter while the link is selected",
          ],
          correctIndex: 1,
          explanation: "In the Word desktop app, links are Ctrl+click by default so that a normal click can place your cursor for editing without launching a browser. In Word Online and in Reading view, a plain click follows the link.",
          optionRationales: [
            "Double-clicking selects the word under the cursor. It edits the link text rather than following the link.",
            "Correct. Ctrl+click follows the link, while a plain click places the insertion point so you can edit the text.",
            "Right-click does offer Open Hyperlink on its menu, so this works — but it is three actions where Ctrl+click is one, and it is not the standard method.",
            "Pressing Enter with a link selected replaces the selected text with a new paragraph. That deletes the link rather than following it.",
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
        "Insert a hyperlink for 'City of Orlando'.",
        "Verify the link using Ctrl + Click.",
        "Edit the hyperlink address.",
        "Remove a hyperlink but keep the text.",
        "Create a hyperlink from a typed web address.",
      ],
    },
  ],
},

{
  slug: "printing-documents",
  title: "Printing Documents",
  description:
    "Learn how to access the Print pane, select a printer, adjust print settings, and print specific pages in Microsoft Word.",
  objectives: [
    "Preview a document accurately before committing it to paper",
    "Print a specific page range, selection, or set of pages",
    "Choose duplex, collation, and scaling settings appropriately",
    "Diagnose the common causes of a document that prints differently than it appears",
  ],
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/7bLQFTCsH8Y",

  practiceFiles: [
    {
      name: "Word Printing Practice File",
      url: "/practice/word/module-2/printing/word_printing_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Print preview is a proofreading tool",
       blocks: [
         {
           type: "scenario",
           role: "You are preparing packets for tomorrow's new-patient orientation at Lakeside Medical Associates.",
           text: "You send forty copies of a six-page packet to the printer. Two hundred and forty sheets later, you discover a seventh page containing one orphaned line — 'Thank you for choosing Lakeside.' Forty extra sheets, forty stapling errors, and a recycling bin full of paper.",
           task: "Use the print pane to catch layout problems before they become physical objects.",
         },
         {
           type: "paragraph",
           text: "The print pane in Backstage view shows the document as the printer will produce it, including margins the screen view can hide. Check the page count first — a document that shows six pages on screen and seven in preview has an orphaned line, a stray page break, or an empty paragraph at the end. Deleting that is thirty seconds of work that saves forty sheets.",
         },
         {
           type: "table",
           caption: "Print settings worth understanding before a large job",
           columns: [
             "Setting",
             "What it does",
             "When it matters",
           ],
           rows: [
             [
               "Print Range",
               "Prints specific pages, e.g. 1-3, 7",
               "Reprinting one corrected page instead of the whole packet",
             ],
             [
               "Print Selection",
               "Prints only the highlighted text",
               "Pulling one section out of a long document",
             ],
             [
               "Collated",
               "Produces complete sets in order",
               "Any multi-page document you will hand out as packets",
             ],
             [
               "Print on Both Sides",
               "Duplex printing",
               "Halves the paper for anything over two pages",
             ],
             [
               "Scale to Paper Size",
               "Fits the layout to the loaded paper",
               "A document laid out for Letter printing on A4, or the reverse",
             ],
           ],
         },
         {
           type: "tip",
           text: "If a document prints with different line breaks than it shows on screen, the usual cause is a font the printer does not have, or a printer driver substituting one. Exporting to PDF and printing that instead embeds the fonts and guarantees the output matches what you designed.",
         },
       ],
     },

    // ---------------- OPENING PRINT ----------------
    {
      heading: "Opening the Print Pane",
      blocks: [
        {
          type: "paragraph",
          text:
            "To print a document, click the File tab and then select Print. This opens the Print pane where you can preview and adjust settings before printing.",
        },
        {
          type: "image",
          src: "/images/word/printing/printing_pane_file_tab.png",
          alt: "Clicking the File tab",
        },
        {
          type: "image",
          src: "/images/word/printing/printing_pane_print_tab.png",
          alt: "Print pane in Word",
        },
      ],
    },

    // ---------------- SELECTING PRINTER ----------------
    {
      heading: "Selecting a Printer",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the Printer dropdown menu to choose which printer to send your document to. Word displays the printer status (Ready, Offline, etc.).",
        },
        {
          type: "image",
          src: "/images/word/printing/printing_to_print_1.png",
          alt: "Printer dropdown menu",
        },
      ],
    },

    // ---------------- COPIES ----------------
    {
      heading: "Choosing the Number of Copies",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the Copies box to specify how many copies of the document you want to print.",
        },
        {
          type: "image",
          src: "/images/word/printing/printing_to_print_2.png",
          alt: "Copies selection box",
        },
      ],
    },

    // ---------------- PRINT SETTINGS ----------------
    {
      heading: "Adjusting Print Settings",
      blocks: [
        {
          type: "paragraph",
          text:
            "Under Settings, you can choose to print all pages, specific pages, one-sided or double-sided, portrait or landscape orientation, margins, and more.",
        },
        {
          type: "image",
          src: "/images/word/printing/printing_to_print_3.png",
          alt: "Print settings options",
        },
        {
          type: "image",
          src: "/images/word/printing/printing_to_print_4.png",
          alt: "More print settings",
        },
      ],
    },

    // ---------------- CUSTOM PRINT ----------------
    {
      heading: "Printing Specific Pages",
      blocks: [
        {
          type: "paragraph",
          text:
            "To print specific pages, select Custom Print and enter page numbers separated by commas (e.g., 2,5) or ranges (e.g., 1-3).",
        },
        {
          type: "image",
          src: "/images/word/printing/printing_custom_print_pages.png",
          alt: "Custom print page selection",
        },
        {
          type: "image",
          src: "/images/word/printing/printing_custom_print_print.png",
          alt: "Print button in custom print",
        },
      ],
    },

    // ---------------- PRINT PREVIEW ----------------
    {
      heading: "Print Preview",
      blocks: [
        {
          type: "paragraph",
          text:
            "The preview pane shows exactly how your document will look when printed. Use the zoom slider to adjust the view before printing.",
        },
        {
          type: "image",
          src: "/images/word/printing/word2016_printing_img_2.png",
          alt: "Print preview example",
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
            "After selecting your printer, adjusting settings, and reviewing the preview, click the Print button to send your document to the printer.",
        },
        {
          type: "image",
          src: "/images/word/printing/download.png",
          alt: "Print button highlighted",
        },
      ],
    },
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Where can you preview how your document will look before printing?",
          options: [
            "The View tab",
            "The Home tab",
            "The Print pane in Backstage view",
            "The Page Layout dialog box",
          ],
          correctIndex: 2,
          explanation: "File > Print opens Backstage view with a live preview beside the settings, so you can check pagination and margins and adjust settings in the same place before committing to paper.",
          optionRationales: [
            "The View tab changes how you see the document while editing — Read Mode, zoom, multiple pages. It is not the print preview.",
            "The Home tab holds text formatting commands. Nothing there previews printed output.",
            "Correct. File > Print shows a live preview next to the print settings, so you can catch and fix problems before printing.",
            "The Page Layout dialog sets margins, orientation, and paper size. It changes the layout but does not preview the printed result.",
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
        "Open the Print pane.",
        "Select your printer from the dropdown list.",
        "Print 2 copies of the document.",
        "Print only pages 1–3 and page 5.",
        "Change the orientation to Landscape.",
        "Review the print preview before printing.",
      ],
    },
  ],
},


];
