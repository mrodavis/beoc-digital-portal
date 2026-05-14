import { Lesson } from "@/types/lesson";

export const wordModule7Lessons: Lesson[] = [

/* ============================================================
LESSON 1 – WORKING WITH STYLES
============================================================ */

{
  slug: "working-with-styles",
  title: "Working with Styles",
  description:
    "Learn how to apply and manage Word's built-in paragraph and character styles to format documents consistently and efficiently.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/fLmJV5RVJoM",

  practiceFiles: [
    {
      name: "Working with Styles Practice File",
      url: "/practice/word/module-7/styles/word_styles_practice.docx",
    },
  ],

  sections: [

    {
      heading: "What Are Styles?",
      blocks: [
        {
          type: "paragraph",
          text:
            "A style is a saved collection of formatting settings — font, size, color, spacing, and more — that can be applied to text in a single click. Using styles ensures consistent formatting throughout your document and makes updates fast and easy.",
        },
      ],
    },

    {
      heading: "The Styles Gallery",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Styles gallery is located on the Home tab in the Styles group. It displays a row of preset styles such as Normal, Heading 1, Heading 2, Title, and more. Hover over any style to see a live preview before applying it.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_gallery_home_tab.png",
          alt: "Styles gallery on the Home tab",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_gallery_expanded.png",
          alt: "Expanded styles gallery",
        },
      ],
    },

    {
      heading: "Applying a Style",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside the paragraph you want to format (or select specific text for a character style), then click the style name in the gallery. The formatting is applied instantly.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_apply_heading1.png",
          alt: "Applying Heading 1 style to a paragraph",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_apply_result.png",
          alt: "Paragraph formatted with Heading 1 style",
        },
      ],
    },

    {
      heading: "Paragraph vs. Character Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "Paragraph styles (marked with a ¶ symbol) apply formatting to an entire paragraph. Character styles (marked with an a symbol) apply formatting only to selected text within a paragraph.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_type_indicators.png",
          alt: "Paragraph and character style type indicators",
        },
      ],
    },

    {
      heading: "Opening the Styles Pane",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the small launcher arrow at the bottom-right corner of the Styles group to open the Styles pane. This gives you access to all available styles, not just those shown in the gallery.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_pane_launcher.png",
          alt: "Styles pane launcher arrow",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_pane_open.png",
          alt: "Styles pane showing all available styles",
        },
      ],
    },

    {
      heading: "Clearing a Style",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove formatting applied by a style, select the text and click Clear All in the Styles pane, or choose Normal from the Styles gallery to reset to the default paragraph style.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_clear_all.png",
          alt: "Clear All option in the Styles pane",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is the main advantage of using Styles in Word?",
          options: [
            "They automatically translate the document into other languages",
            "They let you apply consistent, saved formatting combinations with a single click",
            "They lock the document so no one else can edit it",
            "They convert a Word document into a PDF automatically",
          ],
          correctIndex: 1,
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
        "Open the practice document and apply the Heading 1 style to the first line.",
        "Apply Heading 2 to each section title in the document.",
        "Apply the Normal style to a body paragraph that was incorrectly formatted.",
        "Open the Styles pane and identify one character style and one paragraph style.",
        "Use Clear All to remove formatting from one heading and observe the result.",
      ],
    },
  ],
},

/* ============================================================
LESSON 2 – MODIFYING STYLES
============================================================ */

{
  slug: "modifying-styles",
  title: "Modifying Styles",
  description:
    "Learn how to customize existing Word styles so that formatting updates apply automatically throughout the entire document.",
  duration: "9 min",
  videoUrl: "https://www.youtube.com/embed/fLmJV5RVJoM",

  practiceFiles: [
    {
      name: "Modifying Styles Practice File",
      url: "/practice/word/module-7/modifying-styles/word_modifyingstyles_practice.docx",
    },
  ],

  sections: [

    {
      heading: "Why Modify Styles?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Instead of manually reformatting every heading or paragraph, you can modify the underlying style. Every paragraph using that style updates automatically — saving time and ensuring consistency throughout the document.",
        },
      ],
    },

    {
      heading: "Update a Style to Match Selection",
      blocks: [
        {
          type: "paragraph",
          text:
            "Apply manual formatting to one paragraph, then right-click the style name in the gallery and choose Update [Style Name] to Match Selection. All text using that style updates to match.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_update_to_match.png",
          alt: "Update Heading 1 to Match Selection option",
        },
      ],
    },

    {
      heading: "Modifying a Style with the Modify Dialog",
      blocks: [
        {
          type: "paragraph",
          text:
            "Right-click a style in the gallery or Styles pane and choose Modify. The Modify Style dialog box gives you complete control over font, paragraph settings, borders, numbering, and more.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_modify_rightclick.png",
          alt: "Right-click Modify option on a style",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_modify_dialog.png",
          alt: "Modify Style dialog box",
        },
      ],
    },

    {
      heading: "Formatting Options in the Modify Dialog",
      blocks: [
        {
          type: "paragraph",
          text:
            "Inside the Modify Style dialog, use the Format button at the bottom-left to access advanced settings like Font, Paragraph, Tabs, Borders, and Numbering.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_modify_format_button.png",
          alt: "Format dropdown in Modify Style dialog",
        },
      ],
    },

    {
      heading: "Updating Automatically vs. This Document Only",
      blocks: [
        {
          type: "paragraph",
          text:
            "In the Modify Style dialog you can choose whether to apply the change to this document only or to new documents based on the current template. For most cases, choose Only in this document.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_modify_scope_options.png",
          alt: "Scope options at the bottom of Modify Style dialog",
        },
      ],
    },

    {
      heading: "Creating a New Style",
      blocks: [
        {
          type: "paragraph",
          text:
            "To save a custom combination as a new style, format a paragraph the way you want, then open the Styles pane and click New Style (the first icon at the bottom). Give it a name and set the type to Paragraph or Character.",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_new_style_button.png",
          alt: "New Style button at the bottom of the Styles pane",
        },
        {
          type: "image",
          src: "/images/word/styles/styles_new_style_dialog.png",
          alt: "Create New Style from Formatting dialog",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What happens when you modify a style in Word?",
          options: [
            "Only the currently selected paragraph is changed",
            "All paragraphs in the document using that style update automatically",
            "The style is deleted and replaced with a new one",
            "Word creates a copy of the style with a new name",
          ],
          correctIndex: 1,
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
        "Apply bold and change the font color of one Heading 1 paragraph, then use Update Heading 1 to Match Selection.",
        "Open the Modify Style dialog for Normal and change the font to Calibri 12pt.",
        "Observe that all Normal-styled paragraphs updated to reflect the change.",
        "Use the Format → Paragraph option in the Modify dialog to add 6pt spacing after the Normal style.",
        "Create a brand new style named 'Callout' using blue 11pt italic text.",
      ],
    },
  ],
},

/* ============================================================
LESSON 3 – STYLE SETS
============================================================ */

{
  slug: "style-sets",
  title: "Style Sets",
  description:
    "Learn how to switch between Word's built-in Style Sets to instantly change the look and feel of headings and body text across your entire document.",
  duration: "7 min",
  videoUrl: "https://www.youtube.com/embed/CvnSSnm6bAc",

  practiceFiles: [
    {
      name: "Style Sets Practice File",
      url: "/practice/word/module-7/style-sets/word_stylesets_practice.docx",
    },
  ],

  sections: [

    {
      heading: "What Is a Style Set?",
      blocks: [
        {
          type: "paragraph",
          text:
            "A Style Set is a coordinated collection of heading, body, and paragraph style definitions. Switching Style Sets changes the fonts, sizes, and spacing used by all built-in styles at once — without removing the styles themselves.",
        },
      ],
    },

    {
      heading: "Accessing Style Sets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Design tab and look at the Document Formatting group. The row of thumbnails at the top represents the available Style Sets. Hover over any thumbnail to preview the effect on your document.",
        },
        {
          type: "image",
          src: "/images/word/style-sets/stylesets_design_tab.png",
          alt: "Style Sets row on the Design tab",
        },
        {
          type: "image",
          src: "/images/word/style-sets/stylesets_hover_preview.png",
          alt: "Live preview of a Style Set",
        },
      ],
    },

    {
      heading: "Applying a Style Set",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click a Style Set thumbnail to apply it. Word updates all heading and body styles throughout the document to match the new set.",
        },
        {
          type: "image",
          src: "/images/word/style-sets/stylesets_apply_result.png",
          alt: "Document after applying a different Style Set",
        },
      ],
    },

    {
      heading: "Restoring to the Default Style Set",
      blocks: [
        {
          type: "paragraph",
          text:
            "To return to Word's original default styles, click the first thumbnail (Default) or right-click the Style Set gallery and choose Reset to the Default Style Set.",
        },
        {
          type: "image",
          src: "/images/word/style-sets/stylesets_reset_default.png",
          alt: "Reset to Default Style Set option",
        },
      ],
    },

    {
      heading: "Saving a Custom Style Set",
      blocks: [
        {
          type: "paragraph",
          text:
            "After customizing styles, you can save them as a new Style Set. Click the More arrow in the Document Formatting group to expand the gallery, then choose Save as a New Style Set. Name it and click Save.",
        },
        {
          type: "image",
          src: "/images/word/style-sets/stylesets_save_new.png",
          alt: "Save as a New Style Set option",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does switching a Style Set do to your document?",
          options: [
            "It deletes all existing paragraphs and replaces them with placeholder text",
            "It changes the fonts, sizes, and spacing of all built-in styles across the entire document",
            "It applies a background color to every page in the document",
            "It locks the document formatting so no more changes can be made",
          ],
          correctIndex: 1,
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
        "Open the practice document and confirm headings are styled with Heading 1 and Heading 2.",
        "Go to the Design tab and hover over three different Style Sets to preview them.",
        "Apply the Lines (Stylish) Style Set and observe the changes.",
        "Try a second Style Set such as Centered.",
        "Reset the document to the Default Style Set.",
        "Modify one heading style, then save the result as a new Style Set named 'My Style Set'.",
      ],
    },
  ],
},

/* ============================================================
LESSON 4 – USING THEMES
============================================================ */

{
  slug: "using-themes",
  title: "Using Themes",
  description:
    "Learn how to apply and customize document themes to control the color palette, fonts, and graphic effects used throughout your Word document.",
  duration: "9 min",
  videoUrl: "https://www.youtube.com/embed/CvnSSnm6bAc",

  practiceFiles: [
    {
      name: "Themes Practice File",
      url: "/practice/word/module-7/themes/word_themes_practice.docx",
    },
  ],

  sections: [

    {
      heading: "What Is a Theme?",
      blocks: [
        {
          type: "paragraph",
          text:
            "A theme is a coordinated set of colors, fonts, and graphic effects applied to a document. Themes are different from Style Sets — a theme defines the color palette and typefaces available, while a Style Set defines how those elements are used in headings and body text.",
        },
      ],
    },

    {
      heading: "Applying a Theme",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Design tab and click the Themes button (far left in the Document Formatting group). A gallery of built-in themes appears. Hover over any theme to preview it live, then click to apply.",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_button_design_tab.png",
          alt: "Themes button on the Design tab",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_gallery.png",
          alt: "Themes gallery",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_apply_preview.png",
          alt: "Live preview of a theme on the document",
        },
      ],
    },

    {
      heading: "Changing Theme Colors",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Colors in the Document Formatting group to choose a different color palette independently of the full theme. This lets you mix colors from one theme with fonts from another.",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_colors_button.png",
          alt: "Colors button on Design tab",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_colors_gallery.png",
          alt: "Theme color palette gallery",
        },
      ],
    },

    {
      heading: "Changing Theme Fonts",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Fonts in the Document Formatting group to choose a different font pairing. Each entry shows a Heading font and Body font combination.",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_fonts_button.png",
          alt: "Fonts button on Design tab",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_fonts_gallery.png",
          alt: "Theme font pairing gallery",
        },
      ],
    },

    {
      heading: "Changing Theme Effects",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Effects to apply a different visual style to shapes, SmartArt, and charts in the document. Effects control shadows, reflections, and 3D formatting.",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_effects_gallery.png",
          alt: "Theme effects gallery",
        },
      ],
    },

    {
      heading: "Saving a Custom Theme",
      blocks: [
        {
          type: "paragraph",
          text:
            "After mixing colors, fonts, and effects to your liking, save the combination as a custom theme: click Themes → Save Current Theme. Give it a name so it is available for future documents.",
        },
        {
          type: "image",
          src: "/images/word/themes/themes_save_current.png",
          alt: "Save Current Theme option",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What three elements does a Word theme control?",
          options: [
            "Page margins, line spacing, and tab stops",
            "Colors, fonts, and graphic effects",
            "Header text, footer text, and page numbers",
            "Document language, currency format, and date format",
          ],
          correctIndex: 1,
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
        "Open the practice document and apply the Office theme.",
        "Change the theme to Ion and observe how heading colors change.",
        "Switch the Colors palette to Blue Warm without changing the rest of the theme.",
        "Switch the Fonts pairing to Calibri - Calibri.",
        "Save the current combination as a custom theme named 'My Theme'.",
      ],
    },
  ],
},

/* ============================================================
LESSON 5 – TABLE OF CONTENTS
============================================================ */

{
  slug: "table-of-contents",
  title: "Table of Contents",
  description:
    "Learn how to insert an automatic Table of Contents in Word using heading styles, and how to update it as your document changes.",
  duration: "8 min",
  videoUrl: "https://www.youtube.com/embed/eiStMVS9ooQ",

  practiceFiles: [
    {
      name: "Table of Contents Practice File",
      url: "/practice/word/module-7/table-of-contents/word_toc_practice.docx",
    },
  ],

  sections: [

    {
      heading: "How an Automatic TOC Works",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word builds an automatic Table of Contents by reading the heading styles (Heading 1, Heading 2, Heading 3) applied throughout your document. Each heading becomes a TOC entry with a page number. You must apply heading styles before inserting the TOC.",
        },
      ],
    },

    {
      heading: "Applying Heading Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside each section title and apply the appropriate heading style from the Home tab. Use Heading 1 for main sections, Heading 2 for subsections, and Heading 3 for sub-subsections.",
        },
        {
          type: "image",
          src: "/images/word/table-of-contents/toc_apply_headings.png",
          alt: "Applying heading styles to document sections",
        },
      ],
    },

    {
      heading: "Inserting a Table of Contents",
      blocks: [
        {
          type: "paragraph",
          text:
            "Place your cursor at the location where you want the TOC (typically the beginning of the document). Go to References → Table of Contents and choose from the built-in Automatic Table styles.",
        },
        {
          type: "image",
          src: "/images/word/table-of-contents/toc_references_command.png",
          alt: "Table of Contents button on References tab",
        },
        {
          type: "image",
          src: "/images/word/table-of-contents/toc_gallery.png",
          alt: "Table of Contents gallery options",
        },
        {
          type: "image",
          src: "/images/word/table-of-contents/toc_inserted_result.png",
          alt: "Inserted Table of Contents in the document",
        },
      ],
    },

    {
      heading: "Navigating the Document Using the TOC",
      blocks: [
        {
          type: "paragraph",
          text:
            "Hold Ctrl and click any entry in the TOC to jump directly to that section. This works in both editing mode and read-only view.",
        },
        {
          type: "image",
          src: "/images/word/table-of-contents/toc_ctrl_click_navigate.png",
          alt: "Ctrl+click navigation in the Table of Contents",
        },
      ],
    },

    {
      heading: "Updating the Table of Contents",
      blocks: [
        {
          type: "paragraph",
          text:
            "After editing your document, click anywhere inside the TOC and click Update Table. Choose Update page numbers only to refresh page numbers, or Update entire table to rebuild the TOC with any new headings.",
        },
        {
          type: "image",
          src: "/images/word/table-of-contents/toc_update_button.png",
          alt: "Update Table button above the TOC",
        },
        {
          type: "image",
          src: "/images/word/table-of-contents/toc_update_dialog.png",
          alt: "Update Table of Contents dialog",
        },
      ],
    },

    {
      heading: "Removing the Table of Contents",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to References → Table of Contents → Remove Table of Contents to delete it from the document. This does not remove the heading styles from your text.",
        },
        {
          type: "image",
          src: "/images/word/table-of-contents/toc_remove_option.png",
          alt: "Remove Table of Contents option",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What must you do before inserting an automatic Table of Contents?",
          options: [
            "Save the document in PDF format",
            "Apply heading styles (Heading 1, 2, 3) to your section titles",
            "Insert page breaks before each section",
            "Enable Track Changes so Word can find the headings",
          ],
          correctIndex: 1,
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
        "Open the practice document and apply Heading 1 to three main section titles.",
        "Apply Heading 2 to at least two subsection titles.",
        "Place your cursor on the first page and insert an Automatic Table 1 TOC.",
        "Ctrl+click a TOC entry to navigate to that section.",
        "Add a new heading in the body text, then update the entire TOC to reflect it.",
      ],
    },
  ],
},

];
