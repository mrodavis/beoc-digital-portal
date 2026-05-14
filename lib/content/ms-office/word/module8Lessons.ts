import { Lesson } from "@/types/lesson";

export const wordModule8Lessons: Lesson[] = [

/* ============================================================
LESSON 1 – USING WORD ONLINE
============================================================ */

{
  slug: "using-word-online",
  title: "Using Word Online",
  description:
    "Learn how to access and use Word Online through a browser, edit documents in the cloud, and understand the differences between Word Online and the desktop app.",
  duration: "8 min",
  videoUrl: "https://www.youtube.com/embed/oXCnZ0e-Vfo",

  sections: [

    {
      heading: "What Is Word Online?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word Online (also called Word for the web) is a free browser-based version of Microsoft Word available through Microsoft 365. It lets you create, view, and edit Word documents from any device with a browser — no software installation needed.",
        },
      ],
    },

    {
      heading: "Accessing Word Online",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to office.com and sign in with your Microsoft account. Click the Word icon to open Word Online. You can also open any .docx file stored in OneDrive directly in your browser.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_office_home.png",
          alt: "Microsoft 365 home page with Word icon",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_interface.png",
          alt: "Word Online editing interface in a browser",
        },
      ],
    },

    {
      heading: "Creating a New Document",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click New blank document on the Word Online start page to open a new, blank document. Files are saved automatically to OneDrive as you work.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_new_document.png",
          alt: "New blank document button in Word Online",
        },
      ],
    },

    {
      heading: "Editing Mode vs. Reading View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word Online opens documents in Editing view by default. Click View → Reading View to switch to a clean, non-editable layout. Switch back to Editing view to make changes.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_reading_view.png",
          alt: "Reading View in Word Online",
        },
      ],
    },

    {
      heading: "Opening in the Desktop App",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you need features not available in Word Online, click Edit in Desktop App (or Open in Desktop App) in the toolbar. This opens the file directly in the Word desktop application and syncs changes back to OneDrive automatically.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_open_desktop.png",
          alt: "Open in Desktop App button in Word Online",
        },
      ],
    },

    {
      heading: "Key Differences from the Desktop App",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word Online covers the most common tasks but lacks some advanced desktop features, including macros, certain advanced layout tools, and some reference and mail merge functions. For basic writing and editing, Word Online works seamlessly.",
        },
        {
          type: "image",
          src: "/images/word/word-online/wordonline_ribbon_comparison.png",
          alt: "Simplified Word Online ribbon compared to desktop",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is one key advantage of Word Online over the desktop app?",
          options: [
            "It supports macros and advanced automation features",
            "It can be accessed from any device with a browser without installing software",
            "It stores files locally on your hard drive instead of the cloud",
            "It offers more advanced layout tools than the desktop version",
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
        "Go to office.com and sign in with your Microsoft account.",
        "Open Word Online and create a new blank document.",
        "Type a short paragraph and add a heading using the Heading 1 style.",
        "Switch to Reading View and then back to Editing view.",
        "Open the document in the desktop app using the Edit in Desktop App button.",
      ],
    },
  ],
},

/* ============================================================
LESSON 2 – CO-AUTHORING IN WORD
============================================================ */

{
  slug: "co-authoring-in-word",
  title: "Co-Authoring in Word",
  description:
    "Learn how to share a Word document and collaborate with others in real time using Microsoft 365 co-authoring features.",
  duration: "9 min",
  videoUrl: "https://www.youtube.com/embed/WCROca-WFiI",

  sections: [

    {
      heading: "What Is Co-Authoring?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Co-authoring lets multiple people edit the same Word document at the same time. Changes from each author appear in real time without requiring anyone to check the file in or out.",
        },
      ],
    },

    {
      heading: "Sharing a Document for Co-Authoring",
      blocks: [
        {
          type: "paragraph",
          text:
            "The document must be saved to OneDrive or SharePoint to enable co-authoring. Click Share in the top-right corner, enter the email addresses of your collaborators, choose their permission level (can edit or can view), and click Send.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_share_button.png",
          alt: "Share button in the top-right corner of Word",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_share_dialog.png",
          alt: "Share document dialog with email entry",
        },
      ],
    },

    {
      heading: "Seeing Other Authors in Real Time",
      blocks: [
        {
          type: "paragraph",
          text:
            "When another person is editing the document, their cursor and a colored flag with their name appear in the document. Each co-author is assigned a unique color so you can see exactly where they are working.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_presence_flag.png",
          alt: "Author presence flag showing another user's location",
        },
      ],
    },

    {
      heading: "Viewing Who Has the File Open",
      blocks: [
        {
          type: "paragraph",
          text:
            "Profile pictures or initials appear in the top-right corner for everyone currently in the document. Click an icon to see the person's name and jump to where they are editing.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_author_icons.png",
          alt: "Co-author icons in the top right corner of Word",
        },
      ],
    },

    {
      heading: "AutoSave and Co-Authoring",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a file is stored on OneDrive, AutoSave turns on automatically and saves your changes every few seconds. This ensures other co-authors always see the most recent version of the document.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_autosave_toggle.png",
          alt: "AutoSave toggle turned on in Word",
        },
      ],
    },

    {
      heading: "Managing Sharing Permissions",
      blocks: [
        {
          type: "paragraph",
          text:
            "To change or remove someone's access, click Share → Manage Access. From here you can change a collaborator's permission level to View Only or remove their access entirely.",
        },
        {
          type: "image",
          src: "/images/word/co-authoring/coauthor_manage_access.png",
          alt: "Manage Access panel showing collaborator permissions",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Where does a Word document need to be saved to enable co-authoring?",
          options: [
            "On a USB flash drive shared between users",
            "In a local folder on your desktop",
            "On OneDrive or SharePoint",
            "Emailed as an attachment to all collaborators",
          ],
          correctIndex: 2,
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
        "Save a document to OneDrive and confirm AutoSave is on.",
        "Click Share and invite a classmate or colleague with Edit permissions.",
        "Ask them to open the document and make a change — observe their cursor flag.",
        "Locate their author icon in the top-right corner and click it to jump to their position.",
        "Open Manage Access and change their permission to View Only.",
      ],
    },
  ],
},

/* ============================================================
LESSON 3 – SMART LOOKUP & RESEARCHER
============================================================ */

{
  slug: "smart-lookup-and-researcher",
  title: "Smart Lookup & Researcher",
  description:
    "Use Word's built-in research tools to look up definitions, find background information, and insert properly cited content without leaving the document.",
  duration: "7 min",
  videoUrl: "https://www.youtube.com/embed/lX6sMD5BXLY",

  sections: [

    {
      heading: "What Is Smart Lookup?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Smart Lookup uses Bing to search for definitions, Wikipedia articles, and web results for any word or phrase in your document. Results appear in a side panel so you can research without switching to a browser.",
        },
      ],
    },

    {
      heading: "Using Smart Lookup",
      blocks: [
        {
          type: "paragraph",
          text:
            "Right-click a word or selected phrase and choose Smart Lookup from the context menu. The Insights pane opens on the right with definitions, related web results, and images.",
        },
        {
          type: "image",
          src: "/images/word/smart-lookup/smartlookup_rightclick_menu.png",
          alt: "Smart Lookup option in the right-click context menu",
        },
        {
          type: "image",
          src: "/images/word/smart-lookup/smartlookup_insights_pane.png",
          alt: "Smart Lookup Insights pane with search results",
        },
      ],
    },

    {
      heading: "What Is Researcher?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Researcher is a more advanced tool designed for writing essays and reports. It finds credible sources from the web, lets you explore topics in depth, and allows you to insert quotes and citations directly into your document.",
        },
      ],
    },

    {
      heading: "Opening Researcher",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the References tab and click Researcher. Type a topic in the search box. Word returns a list of articles and sources. Click any result to read a summary and see available content to insert.",
        },
        {
          type: "image",
          src: "/images/word/smart-lookup/researcher_references_tab.png",
          alt: "Researcher button on the References tab",
        },
        {
          type: "image",
          src: "/images/word/smart-lookup/researcher_search_results.png",
          alt: "Researcher pane with topic search results",
        },
      ],
    },

    {
      heading: "Adding Content and Citations",
      blocks: [
        {
          type: "paragraph",
          text:
            "Inside a Researcher source, click Add to add a quote or passage to your document. Word automatically inserts a footnote citation. You can also click the plus (+) icon next to a heading to add it as a topic outline entry.",
        },
        {
          type: "image",
          src: "/images/word/smart-lookup/researcher_add_citation.png",
          alt: "Add button inserting a citation from Researcher",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is the main difference between Smart Lookup and Researcher?",
          options: [
            "Smart Lookup is only available in Word Online; Researcher works only in the desktop app",
            "Smart Lookup provides quick definitions and web results, while Researcher is designed for deeper research with citations",
            "Researcher searches your local files; Smart Lookup searches the internet",
            "There is no difference — they both do the same thing",
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
        "Right-click a word in your document and select Smart Lookup. Read the definition that appears.",
        "Close Smart Lookup and go to References → Researcher.",
        "Search for a topic related to your document's subject.",
        "Open one of the source articles in the Researcher pane.",
        "Insert a passage from the source into your document using the Add button.",
        "Observe the automatically inserted citation.",
      ],
    },
  ],
},

/* ============================================================
LESSON 4 – DICTATION & VOICE FEATURES
============================================================ */

{
  slug: "dictation-and-voice",
  title: "Dictation & Voice Features",
  description:
    "Use Word's Dictation feature to type hands-free using your voice, and learn how to use voice commands to edit, format, and punctuate as you speak.",
  duration: "7 min",
  videoUrl: "https://www.youtube.com/embed/cC3IOqrHMFU",

  sections: [

    {
      heading: "What Is Dictation?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Dictation converts your spoken words into typed text in Word. It works with a microphone connected to your computer and uses Microsoft's speech recognition service. Dictation is available on both the desktop app and Word Online.",
        },
      ],
    },

    {
      heading: "Starting Dictation",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside your document where you want to start typing, then go to Home → Dictate. The microphone icon turns red and a listening indicator appears. Speak clearly and Word types your words in real time.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_home_tab_button.png",
          alt: "Dictate button on the Home tab",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_listening_indicator.png",
          alt: "Red microphone icon showing Dictation is active",
        },
      ],
    },

    {
      heading: "Adding Punctuation by Voice",
      blocks: [
        {
          type: "paragraph",
          text:
            "Speak punctuation marks aloud as you dictate. For example, say 'comma', 'period', 'question mark', or 'new paragraph' and Word will insert them automatically.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_punctuation_example.png",
          alt: "Example of punctuation inserted by voice",
        },
      ],
    },

    {
      heading: "Voice Commands for Editing",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can use voice commands to make edits while dictating. Say 'delete that' to remove the last word, 'undo that' to undo the last action, or 'select [word]' to select a specific word for formatting.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_voice_commands.png",
          alt: "List of supported voice commands in Dictation",
        },
      ],
    },

    {
      heading: "Changing Dictation Language",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the dropdown arrow on the Dictate button to select a different spoken language. Word supports dozens of languages and regional accents for dictation.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_language_menu.png",
          alt: "Dictation language dropdown menu",
        },
      ],
    },

    {
      heading: "Stopping Dictation",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the Dictate button again or press the keyboard shortcut (Alt + `) to stop dictation. The microphone icon turns back to its normal color.",
        },
        {
          type: "image",
          src: "/images/word/dictation/dictation_stop.png",
          alt: "Dictate button deactivated after stopping",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "How do you insert a period (full stop) when using Dictation in Word?",
          options: [
            "Press the period key on your keyboard",
            "Pause for two seconds and Word adds the period automatically",
            "Say the word 'period' while dictating",
            "Click the Punctuation button in the Dictation toolbar",
          ],
          correctIndex: 2,
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
        "Open a blank document and click Home → Dictate.",
        "Dictate a two-sentence paragraph, speaking punctuation marks aloud.",
        "Use the voice command 'new paragraph' to start a new paragraph.",
        "Say 'undo that' to undo your last dictated word.",
        "Stop dictation and review the text for accuracy.",
        "Correct any misrecognized words by typing normally.",
      ],
    },
  ],
},

/* ============================================================
LESSON 5 – ACCESSIBILITY FEATURES
============================================================ */

{
  slug: "accessibility-features",
  title: "Accessibility Features",
  description:
    "Learn how to use Word's Accessibility Checker to identify and fix issues that make documents difficult to use for people with disabilities.",
  duration: "8 min",
  videoUrl: "https://www.youtube.com/embed/aRvMDhDNB4o",

  sections: [

    {
      heading: "Why Accessibility Matters",
      blocks: [
        {
          type: "paragraph",
          text:
            "An accessible document can be read and navigated by people who use screen readers, keyboard-only navigation, or other assistive technologies. Word includes tools that help you catch common accessibility issues before sharing your document.",
        },
      ],
    },

    {
      heading: "Running the Accessibility Checker",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to Review → Check Accessibility. The Accessibility pane opens on the right, listing Errors, Warnings, and Tips. Click any issue to jump directly to the problem in the document.",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_checker_command.png",
          alt: "Check Accessibility button on the Review tab",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_checker_pane.png",
          alt: "Accessibility Checker pane with errors and warnings",
        },
      ],
    },

    {
      heading: "Adding Alt Text to Images",
      blocks: [
        {
          type: "paragraph",
          text:
            "Alt text describes an image for screen readers. Right-click an image and choose Edit Alt Text. Type a brief, descriptive sentence that explains what the image shows. Avoid vague descriptions like 'image 1'.",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_alttext_rightclick.png",
          alt: "Edit Alt Text option in right-click menu",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_alttext_pane.png",
          alt: "Alt Text pane with description field",
        },
      ],
    },

    {
      heading: "Using Meaningful Heading Structure",
      blocks: [
        {
          type: "paragraph",
          text:
            "Screen readers use heading styles to help users navigate long documents. Use Heading 1 for main sections, Heading 2 for subsections, and so on — never skip levels (e.g., going from Heading 1 directly to Heading 3).",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_heading_structure.png",
          alt: "Correct heading hierarchy example",
        },
      ],
    },

    {
      heading: "Making Tables Accessible",
      blocks: [
        {
          type: "paragraph",
          text:
            "Data tables should have a header row that labels each column. Select your table, go to Table Design → check Header Row, and confirm the first row is formatted as a header so screen readers can announce column names.",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_table_header_row.png",
          alt: "Header Row checkbox in Table Design tab",
        },
      ],
    },

    {
      heading: "Using Meaningful Hyperlink Text",
      blocks: [
        {
          type: "paragraph",
          text:
            "Avoid hyperlinks that only show the raw URL or phrases like 'click here'. Instead, use descriptive link text such as 'Visit the Microsoft 365 support page' so screen reader users understand the link's destination.",
        },
        {
          type: "image",
          src: "/images/word/accessibility/accessibility_link_text_example.png",
          alt: "Example of descriptive vs. vague hyperlink text",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is the purpose of alt text on images in a Word document?",
          options: [
            "It appears as a caption below the image when printed",
            "It describes the image for screen readers so visually impaired users understand the content",
            "It compresses the image file size for faster sharing",
            "It locks the image so it cannot be moved or resized",
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
        "Open a document that contains at least one image and a table.",
        "Run Check Accessibility from the Review tab.",
        "Fix any missing alt text by right-clicking each image and entering a description.",
        "Check that your heading structure does not skip levels.",
        "Review any hyperlinks in the document and update generic 'click here' text with descriptive link labels.",
        "Re-run the Accessibility Checker and confirm the errors are resolved.",
      ],
    },
  ],
},

];
