import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "intro-to-word-2019",
    title: "Introduction to Microsoft Word 2019",
    description:
      "Get oriented in the Word 2019 interface, learn to navigate its core features, and understand how to create, save, and manage documents in a professional office setting.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/j-ZAVHk5SaU",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-01.jpg",
        alt: "Welcome to Microsoft Word 2019 — course overview and what you will master",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-02.jpg",
        alt: "The Word 2019 Ribbon — tabs, groups, and commands organized by task",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-03.jpg",
        alt: "The Quick Access Toolbar — your personal shortcut bar above the Ribbon",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-04.jpg",
        alt: "Backstage View (File Menu) — creating, saving, printing, and sharing documents",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-05.jpg",
        alt: "Document Views — Print Layout, Read Mode, Web Layout, and when to use each",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-06.jpg",
        alt: "Zoom Controls and the Status Bar — navigating your document at the right size",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-07.jpg",
        alt: "AutoSave and AutoRecover — how Word protects your work automatically",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-08.jpg",
        alt: "File Formats Explained — .docx vs .doc vs .pdf and when each is appropriate",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct Word interface element for each task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is your first morning at Lakeside Medical Associates. Your supervisor, the practice manager, hands you a task list: draft a patient welcome letter, format a staff memo template, and save both as PDFs to send before noon. You open your computer and see Microsoft Word 2019 on the desktop. Before you can produce anything, you need to understand the landscape — where things live, how to navigate the interface, and how to save your work safely. This lesson gets you oriented so nothing slows you down.",
          },
        ],
      },
      {
        heading: "Why This Matters",
        blocks: [
          {
            type: "paragraph",
            text: "Microsoft Word 2019 is the document creation standard in medical offices, law firms, government agencies, schools, and virtually every other professional environment. Learning the interface thoroughly — not just the basics — means you can work quickly, confidently, and without interrupting colleagues to ask where things are. Here is why a solid foundation in Word matters from day one:",
          },
          {
            type: "list",
            items: [
              "Speed comes from knowing the interface — every second you spend hunting for a command is a second you are not being productive. Office assistants who know exactly where to find formatting tools, saving options, and view controls are measurably faster than those who explore menus one at a time.",
              "File format decisions affect whether documents reach recipients correctly — sending a .docx to a client whose computer does not have Word means they cannot open it. Knowing when to save as PDF and when to keep the editable .docx format prevents communication breakdowns before they happen.",
              "AutoSave and recovery features are safety nets you must understand before you need them — a power outage or application crash with an unsaved document can cost you hours of work. Understanding how Word's automatic protection features work means you are never caught off guard.",
              "Document views serve different purposes at different stages of work — knowing when to switch from Print Layout to Read Mode to Web Layout helps you review documents the way your recipient will see them, catching formatting errors that only appear in a specific view.",
            ],
          },
        ],
      },
      {
        heading: "The Word 2019 Interface",
        blocks: [
          {
            type: "paragraph",
            text: "The Word 2019 interface is organized into several distinct zones, each serving a specific purpose. Learning the name and function of each zone allows you to follow written instructions, watch tutorials, and ask for help effectively — because you will know exactly what to call what you are looking at:",
          },
          {
            type: "list",
            items: [
              "The Ribbon is the horizontal toolbar across the top of the window and is divided into tabs — Home, Insert, Design, Layout, References, Mailings, Review, and View. Each tab contains groups of related commands. The Home tab, for example, holds all your basic formatting tools: Font, Paragraph, Styles, and Clipboard. You will use the Ribbon for nearly every action you take in Word.",
              "The Quick Access Toolbar (QAT) sits above the Ribbon in the upper-left corner and displays a small set of frequently used commands — by default, Save, Undo, and Redo. You can customize the QAT by right-clicking any Ribbon command and choosing 'Add to Quick Access Toolbar,' making your most-used actions just one click away regardless of which Ribbon tab is currently active.",
              "The File menu (Backstage View) is accessed by clicking the blue 'File' tab at the far left of the Ribbon. Unlike other tabs, it opens a full-screen view called Backstage, which is where you handle document-level tasks: creating new documents, opening existing ones, saving, printing, sharing, exporting to PDF, and accessing document properties. Backstage is also where you find Word Options for customizing the application.",
              "The document canvas is the large white area in the center of the screen where you type and format your document. The ruler along the top and left edges of the canvas shows your margins and tab stops. The blinking text cursor shows where your next keystroke will appear — clicking anywhere on the canvas moves the cursor to that location.",
              "The Status Bar runs along the very bottom of the window and displays helpful document information: page number, total word count, language setting, and notifications. It also contains view-switching buttons on the right side and the zoom slider — allowing you to zoom in for fine detail or zoom out to see the whole page at once.",
            ],
          },
        ],
      },
      {
        heading: "Document Views and Navigation",
        blocks: [
          {
            type: "paragraph",
            text: "Word 2019 offers multiple ways to view your document, each optimized for a different task. Switching between views at the right moment makes your work faster and helps you catch errors before printing or sharing:",
          },
          {
            type: "list",
            items: [
              "Print Layout is the default view and shows exactly how your document will appear when printed — with visible margins, headers, footers, and page breaks. This is the view you will spend most of your time in when creating and formatting professional documents at Lakeside Medical Associates.",
              "Read Mode removes the Ribbon and displays your document in a two-column reader-style format optimized for comfortable reading on screen. Use Read Mode when you are reviewing a finished document for content, not editing it. You can highlight text and leave comments in Read Mode but cannot type directly into the document.",
              "Web Layout shows how your document would appear as a web page, with no visible page breaks — the content simply flows in one long column. This view is useful if you are creating content that will be published online or pasted into a website, but it is rarely needed in a medical office context.",
              "The Zoom slider at the bottom right of the screen (or in the View tab > Zoom group) lets you increase or decrease the display magnification without changing the document itself. Zooming to 100% shows normal size, while zooming to 150% or 200% is helpful when reviewing small text or fine formatting details. Ctrl+Scroll Wheel also adjusts zoom rapidly.",
            ],
          },
        ],
      },
      {
        heading: "Creating, Saving, and File Formats",
        blocks: [
          {
            type: "paragraph",
            text: "Knowing how to create, name, and save documents correctly — and in the right format — is a foundational professional skill. A document saved in the wrong format or the wrong location can cause real problems in a busy medical office:",
          },
          {
            type: "list",
            items: [
              "Creating a new document: Click File > New, then choose 'Blank Document' to start from scratch, or browse the template gallery to start with a pre-built layout. The keyboard shortcut Ctrl+N opens a new blank document instantly without navigating the Ribbon, which is the fastest method when you need a clean page quickly.",
              "Saving for the first time: Press Ctrl+S or click File > Save As to choose a file name and location. Always give your document a clear, descriptive name — not 'Document1' or 'Untitled.' A file named 'Patient Welcome Letter – Lakeside Medical – May 2025' is findable, professional, and self-explanatory to anyone who opens the shared drive.",
              "The .docx format is Word's default and keeps all formatting, styles, and editing features intact. Use .docx when you need to share a document with someone who will edit it, or when you are saving a working draft. This is the format to use for internal files like templates, drafts, and staff documents.",
              "PDF format locks the document's appearance so it looks identical on any device regardless of what software the recipient has. Use File > Export > Create PDF/XPS to save as PDF. Always save patient-facing letters, signed forms, and external communications as PDFs to ensure professional consistency — a letter that reflows or loses formatting because the recipient has a different version of Word reflects poorly on the practice.",
              "AutoSave and AutoRecover: Word automatically saves a recovery version of your document every 10 minutes by default (adjustable in File > Options > Save). If Word crashes or your computer loses power, AutoRecover will offer to restore your last auto-saved version when you reopen Word. You should still save manually with Ctrl+S frequently — AutoRecover is a backup, not a substitute for saving.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Word 2019 Interface",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-1/intro-to-word-2019/infographic.png",
            alt: "Word 2019 Interface Quick Reference — labeled diagram of the Ribbon, Quick Access Toolbar, Backstage View, document canvas, Status Bar, and view controls with keyboard shortcuts",
            caption: "Word 2019 Interface Quick Reference — key areas and essential shortcuts",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "In a medical office, every document you create may contain protected health information (PHI) subject to HIPAA regulations. Never save patient documents to a personal USB drive, email them from a personal account, or store them in a personal cloud folder. Always use the practice's designated network drives or approved cloud storage. When in doubt about where a file should be saved, ask your supervisor before creating or saving it — the consequence of a HIPAA breach is severe for both the practice and the patients it serves.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I am new to Microsoft Word 2019 and work in a medical office. What are the 10 most important keyboard shortcuts I should memorize in my first week, and what does each one do?' Review the list and practice each shortcut while your Word document is open. Knowing shortcuts by muscle memory will make you noticeably faster within days.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which file format should you use when sending a final patient letter to ensure it looks identical on the recipient's device regardless of their software?",
            options: [
              ".docx — because it preserves all Word formatting",
              ".doc — because it is compatible with older versions of Word",
              "PDF — because it locks the document's appearance on any device",
              ".txt — because it is the smallest and most universal format",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Practice navigating the Word 2019 interface by completing the orientation exercise below. This challenge is designed to build your muscle memory with the most important interface elements before you start creating real documents at Lakeside Medical Associates.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Microsoft Word 2019 and create a new blank document. Use the keyboard shortcut Ctrl+N — do not click through the menus. Type your name, today's date, and the line 'Lakeside Medical Associates — Office Assistant Orientation' as three separate lines.",
          "Customize your Quick Access Toolbar by adding at least two commands not there by default (suggestions: New, Print Preview, or Spelling & Grammar). Right-click a Ribbon command and choose 'Add to Quick Access Toolbar' for each.",
          "Switch through all three main document views — Print Layout, Read Mode, and Web Layout — using the View tab. Note one thing you observe that is different in each view, and type a one-sentence observation about each view at the bottom of your document.",
          "Save the document in two formats: first as a .docx file named 'Word Orientation – [Your Name]' in your Documents folder, then export it as a PDF using File > Export. Confirm both files appear in your Documents folder.",
          "Open File > Options > Save and note what the AutoRecover interval is set to. Change it to 5 minutes to protect your work more frequently, then click OK.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your saved .docx file and PDF to your instructor or course folder. Your files should be correctly named, contain your three orientation lines plus your three view observations, and your Quick Access Toolbar should show the two commands you added. This exercise confirms you can navigate Word's interface independently.",
      },
    ],
  },

  {
    slug: "document-formatting",
    title: "Creating and Formatting Documents",
    description:
      "Master the typography and paragraph formatting tools that make Word documents look professional — from font choices and spacing to page layout and the Format Painter.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/pmAl-8Tf8Pg?si=ObAc154cTG0NXlLk",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-01.jpg",
        alt: "Typography Basics — fonts, sizes, bold, italic, underline, and font color in Word 2019",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-02.jpg",
        alt: "Paragraph Alignment — left, center, right, and justified alignment and when to use each",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-03.jpg",
        alt: "Line Spacing and Paragraph Spacing — controlling vertical white space for readability",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-04.jpg",
        alt: "Indentation Controls — first-line indent, hanging indent, and left/right indents",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-05.jpg",
        alt: "Page Margins and Orientation — setting professional margins and portrait vs landscape",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-06.jpg",
        alt: "Page Breaks vs Section Breaks — controlling where pages end and new sections begin",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-07.jpg",
        alt: "Format Painter — copying formatting from one location and applying it elsewhere instantly",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-08.jpg",
        alt: "Clearing Formatting — removing all manual formatting and returning text to the default style",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-09.jpg",
        alt: "Professional Formatting Checklist for medical office documents",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/document-formatting/slide-10.jpg",
        alt: "Knowledge Check — identifying the correct formatting tool for a given task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates has asked you to reformat a patient welcome letter that was typed in a hurry — the font is inconsistent, the spacing looks cramped, and the margins are too narrow to look professional. Before you can print and mail 50 copies, the letter needs to look polished. In this lesson, you will learn every formatting tool you need to transform a sloppy draft into a document that represents the practice with professionalism.",
          },
        ],
      },
      {
        heading: "Typography: The Foundation of Readable Documents",
        blocks: [
          {
            type: "paragraph",
            text: "Typography is the art and science of arranging text so it is readable, appropriate for its purpose, and visually professional. In a medical office, every document you produce — letters, memos, forms, reports — reflects the credibility of the practice. Here is what you need to know to make every document look its best:",
          },
          {
            type: "list",
            items: [
              "Font choice conveys professionalism — serif fonts like Times New Roman and Georgia project formality and are traditional choices for letters and legal-style documents. Sans-serif fonts like Calibri (Word's default), Arial, and Helvetica project a cleaner, more modern appearance appropriate for internal memos and reports. In a medical office, Calibri 11pt or Times New Roman 12pt are both safe, professional choices. Avoid decorative or novelty fonts in any professional document — they undermine credibility immediately.",
              "Font size must match the document's purpose — body text in professional letters and reports should be 11pt or 12pt for comfortable reading. Headings should be 14pt to 16pt and bold. Never mix dramatically different font sizes in the same document body — inconsistency signals that the document was not carefully prepared. Use size to create visual hierarchy, not decoration.",
              "Bold, italic, and underline serve specific purposes and should not be overused — bold is for important terms, headings, and key information. Italic is for titles of documents, publications, and for gentle emphasis. Underline is typically reserved for hyperlinks in digital documents and should be avoided for emphasis in printed professional documents, where it can look dated. Using all three together is almost always a sign of overformatting.",
              "Font color should nearly always be black for body text in professional documents — colored text is appropriate for headings in branded documents or for highlighting specific data in reports, but patient letters and formal communications should use black text exclusively. When in doubt at Lakeside Medical Associates, use black on white for maximum legibility and professionalism.",
            ],
          },
        ],
      },
      {
        heading: "Paragraph Formatting and Spacing",
        blocks: [
          {
            type: "paragraph",
            text: "Paragraph formatting controls the space between lines and paragraphs, the alignment of text on the page, and the indentation of each paragraph. These settings have a dramatic effect on how readable and professional a document looks — and they are entirely separate from font formatting:",
          },
          {
            type: "list",
            items: [
              "Alignment determines how text lines up horizontally — Left alignment (Ctrl+L) is standard for body text in business letters and most professional documents. Justified alignment (Ctrl+J) aligns text at both the left and right margins, creating a neat block appearance common in formal reports and newsletters, but can create awkward spacing gaps in narrow columns. Center alignment is for headings, titles, and table cells. Right alignment is rarely used except for dates in headers and financial figures in tables.",
              "Line spacing controls the vertical space between each line of text within a paragraph — single spacing (1.0) is compact and appropriate for patient intake forms and tables where space is limited. 1.15 spacing (Word's default) is slightly more open and easy to read. 1.5 spacing is comfortable for long reports and policy documents. Double spacing (2.0) is required for academic papers and some formal reports where handwritten edits will be added. Access line spacing via the Paragraph group on the Home tab or press Ctrl+1 (single), Ctrl+5 (1.5), or Ctrl+2 (double).",
              "Paragraph spacing (Before and After) controls the extra space above and below each paragraph — this is separate from line spacing and is the professional way to create visual separation between paragraphs. Instead of pressing Enter twice between paragraphs (which creates inconsistent spacing), set 'After' spacing to 6pt–12pt in the Paragraph dialog box. This creates consistent, precise spacing throughout the document and is the mark of a professionally formatted document.",
              "Indentation controls how far text is set in from the left or right margin — a first-line indent (0.5 inch) is the traditional way to signal the start of a new paragraph in formal letters. A hanging indent (where the first line is flush left and subsequent lines are indented) is used for reference lists, bibliographies, and some bullet-style formats. Avoid indenting by pressing the Space bar — always use the indent controls in the Paragraph group or the ruler for precise, consistent results.",
            ],
          },
        ],
      },
      {
        heading: "Page Layout: Margins, Orientation, and Breaks",
        blocks: [
          {
            type: "paragraph",
            text: "Page layout settings determine how your content fills the physical page — and choosing the right settings from the start prevents frustrating reformatting work later. Access all layout settings in the Layout tab of the Ribbon:",
          },
          {
            type: "list",
            items: [
              "Margins define the white space border around all four sides of your content — Word's default margins are 1 inch on all sides, which is the professional standard for business letters and most office documents. Narrow margins (0.5 inch) should only be used when you have a large amount of content that must fit on fewer pages. Never reduce margins below 0.5 inch — content that runs too close to the page edge looks amateurish and can be cut off by some printers. For patient correspondence at Lakeside Medical Associates, use the 1-inch default unless your supervisor specifies otherwise.",
              "Page orientation is either Portrait (taller than wide, 8.5×11 inches) or Landscape (wider than tall, 11×8.5 inches) — Portrait is the default and correct choice for letters, memos, and reports. Landscape is appropriate for wide tables, spreadsheet printouts, and presentations that have more columns than can comfortably fit in portrait. Change orientation in the Layout tab > Orientation.",
              "Page breaks force Word to start a new page at a specific point in the document, regardless of how much space is left on the current page — press Ctrl+Enter to insert a manual page break. Use page breaks before major new sections, before appendices, or when you want a heading to always appear at the top of a new page. Never press Enter repeatedly to push content to the next page — that creates fragile formatting that breaks as soon as text is added or removed earlier in the document.",
              "Section breaks divide a document into independently formatted sections — for example, you can have one section with portrait orientation and the next section with landscape orientation, or one section with two columns and the next with one. Section breaks are inserted from the Layout tab > Breaks. For most basic documents at a medical office, you will use page breaks far more often than section breaks, but understanding section breaks is essential for more complex formatting tasks.",
            ],
          },
        ],
      },
      {
        heading: "Format Painter and Clearing Formatting",
        blocks: [
          {
            type: "paragraph",
            text: "Two of the most time-saving formatting tools in Word are the Format Painter and the Clear All Formatting button. Learning to use both expertly will save you significant time when working with existing documents that need to be cleaned up or standardized:",
          },
          {
            type: "list",
            items: [
              "The Format Painter copies all formatting from one piece of text — font, size, color, bold/italic, paragraph spacing, alignment — and applies it to another piece of text in a single click. Click on text whose formatting you want to copy, then click the paintbrush icon in the Home tab > Clipboard group. Your cursor becomes a paintbrush. Click (or click and drag) over the text you want to reformat. For applying to multiple non-contiguous areas, double-click the Format Painter to keep it active, then click each target location. Press Escape when done.",
              "Clearing formatting is the fastest way to fix a document that has accumulated inconsistent manual formatting — select the text you want to reset, then click the 'Clear All Formatting' button in the Home tab > Font group (it looks like an A with a red eraser). This removes all direct character and paragraph formatting and returns the text to the document's default Normal style. This is your best first step when a document has been through many editors and looks inconsistent.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Document Formatting",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-1/document-formatting/infographic.png",
            alt: "Document Formatting Quick Reference — typography guidelines, paragraph spacing controls, page layout settings, Format Painter steps, and professional formatting checklist for medical office documents",
            caption: "Document Formatting Quick Reference — professional formatting essentials",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Formatting choices in patient-facing documents affect how patients perceive Lakeside Medical Associates. Inconsistent fonts, cramped spacing, and misaligned text signal a lack of attention to detail — which patients may interpret as a reflection of the quality of care they will receive. Before sending or printing any patient communication, review it in Print Preview (Ctrl+P) and check that margins are consistent, fonts are uniform, and spacing is professional. Never rush a final review step — a moment of care in formatting protects the practice's reputation.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'What are the professional formatting standards for a business letter in a medical office? Give me specific settings for font, font size, margins, line spacing, and paragraph spacing.' Use the response to create a formatting checklist you can pin next to your workstation and refer to every time you produce a new patient letter or staff memo at Lakeside Medical Associates.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What is the correct professional way to create visual space between paragraphs in a Word document?",
            options: [
              "Press Enter twice at the end of each paragraph to add a blank line",
              "Set 'After' paragraph spacing (e.g., 6pt–12pt) in the Paragraph formatting settings",
              "Change the line spacing to double for the entire document",
              "Use the Tab key to indent each new paragraph",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Apply your formatting skills by transforming a rough draft into a professional patient communication for Lakeside Medical Associates. Your formatted letter must meet all of the specifications below before it is considered complete.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open a new blank Word document and type a patient welcome letter that includes: a date line, an inside address (to a fictional patient), a subject line, three body paragraphs (at least 3 sentences each), a closing, and a signature block with your name and title 'Office Assistant, Lakeside Medical Associates.'",
          "Apply professional typography throughout: use Calibri 11pt or Times New Roman 12pt for body text, 14pt bold for the subject line, and ensure no text uses decorative fonts, excessive colors, or bold/italic overuse.",
          "Set 1-inch margins on all sides, use 1.15 or 1.5 line spacing for the body, and configure 'After' paragraph spacing of 8pt so you are not pressing Enter twice between paragraphs.",
          "Use the Format Painter to ensure the formatting of all three body paragraphs is identical — same font, size, spacing, and alignment.",
          "Save the completed letter as a .docx and export it as a PDF. Name both files 'Patient Welcome Letter – Lakeside Medical – [Your Name].'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit both the .docx and PDF versions of your letter to your instructor or course folder. Your documents will be evaluated on consistent typography, correct margin and spacing settings, appropriate use of the Format Painter, and professional overall appearance. The letter should look like something that could be mailed to a real patient today.",
      },
    ],
  },

  {
    slug: "styles-and-themes",
    title: "Working with Styles and Themes",
    description:
      "Learn to use Word's Styles system to create consistently formatted professional documents faster, and understand how document themes control the overall visual identity of your files.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/vmEzxQfVj5c?si=FydXQ8y--1kuD0b1",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-01.jpg",
        alt: "What Are Styles? — the difference between direct formatting and style-based formatting",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-02.jpg",
        alt: "The Styles Gallery — built-in styles including Normal, Heading 1, Heading 2, Title, and Subtitle",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-03.jpg",
        alt: "Applying Styles — click to apply, keyboard shortcuts, and the Styles Pane",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-04.jpg",
        alt: "Modifying a Style — changing font, spacing, and color for all instances at once",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-05.jpg",
        alt: "Creating a Custom Style — saving your own formatting as a reusable named style",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-06.jpg",
        alt: "Document Themes — colors, fonts, and effects working together as a visual system",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-07.jpg",
        alt: "The Navigation Pane — using Heading styles to jump between sections instantly",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-08.jpg",
        alt: "Styles vs Manual Formatting — why styles win every time in a professional workflow",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/styles-and-themes/slide-09.jpg",
        alt: "Knowledge Check — identifying when to use Heading 1 vs Heading 2 vs Normal style",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates wants all staff memos to look identical: same header font, same body font, same spacing. Instead of manually reformatting every new memo, your supervisor wants you to set up a memo template with styles so anyone on the staff can type a memo and it automatically looks professional. This lesson teaches you how to do exactly that — and why every professional document creator works this way.",
          },
        ],
      },
      {
        heading: "Why Styles Beat Manual Formatting",
        blocks: [
          {
            type: "paragraph",
            text: "Most people format Word documents manually — they select text, pick a font, set a size, make it bold, adjust the spacing, and repeat those steps for every section heading. This approach is slow, inconsistent, and creates a maintenance nightmare when something needs to change. Styles solve all of these problems simultaneously:",
          },
          {
            type: "list",
            items: [
              "Styles apply consistent formatting in a single click — instead of setting font, size, bold, color, and spacing manually every time you type a heading, you click 'Heading 1' once and every setting is applied instantly. Every heading in your document automatically looks identical without any effort beyond the single click.",
              "Styles allow global changes in seconds — if Lakeside Medical Associates decides to change the heading font from Calibri to Georgia, modifying the Heading 1 style once updates every heading in the entire document simultaneously. Without styles, you would have to hunt for and manually reformat every heading one by one — a process that takes minutes and introduces errors.",
              "Styles enable automatic document features — Word's automatic Table of Contents, the Navigation Pane, and outline views all depend on Heading styles to know your document's structure. If you use manual formatting instead of styles, these features cannot recognize your headings and will not work correctly, which means you lose significant productivity tools.",
              "Styles create visual consistency that improves your professional reputation — documents formatted with consistent styles look like they were created by someone who knows what they are doing. Documents formatted manually by multiple people over time look chaotic and inconsistent, even if each individual section was carefully formatted. Style-based documents maintain their look automatically regardless of who adds content.",
            ],
          },
        ],
      },
      {
        heading: "Applying and Understanding Built-In Styles",
        blocks: [
          {
            type: "paragraph",
            text: "Word 2019 comes with a gallery of pre-built styles available in the Home tab > Styles group. These styles cover the most common formatting needs in professional documents, and learning when to use each one is the first step toward style-based formatting:",
          },
          {
            type: "list",
            items: [
              "Normal is the default body text style applied to every paragraph you type — it is the baseline from which all other styles are defined. In most professional documents, your ordinary paragraph text uses the Normal style. If a paragraph needs no special visual distinction, it should use Normal, not a heading style.",
              "Title is used for the main title of a document — it is typically larger and more visually prominent than any heading. In a Lakeside Medical Associates staff report, the Title style would be applied to the report's name at the very top of the first page. Use it once per document, at most.",
              "Heading 1 is the highest-level section heading — the major divisions of your document. In a multi-section report, Heading 1 would mark sections like 'Patient Summary,' 'Financial Overview,' and 'Staff Notes.' Heading 1 appears in the Navigation Pane and in an automatic Table of Contents.",
              "Heading 2 marks subsections within a Heading 1 section — for example, within 'Patient Summary,' you might have 'New Patients' and 'Returning Patients' as Heading 2 subsections. Word supports Heading 3 through Heading 9 for deeper nesting, though most professional documents rarely need more than two or three heading levels.",
              "To apply a style: click anywhere in the paragraph you want to format (no need to select all the text), then click the desired style in the Styles gallery on the Home tab. For quick keyboard access, open the Styles Pane by pressing Ctrl+Alt+Shift+S — this shows all available styles in a scrollable panel.",
            ],
          },
        ],
      },
      {
        heading: "Modifying Styles and Document Themes",
        blocks: [
          {
            type: "paragraph",
            text: "The built-in styles are a starting point — you can modify any style to match your organization's visual identity, and those modifications will automatically update every paragraph using that style throughout the document. Document themes provide an even higher-level system, controlling the coordinated color palette and font pairing across all styles at once:",
          },
          {
            type: "list",
            items: [
              "To modify an existing style: right-click the style in the Styles gallery and choose 'Modify.' The Modify Style dialog gives you full control over font, font size, color, alignment, spacing, and any other formatting attribute. When you click OK, every paragraph in the document using that style updates instantly to reflect your changes. Check 'New documents based on this template' to make your modification the default for all future documents created from the same template.",
              "To create a custom style: format a paragraph exactly the way you want the style to look, then open the Styles Pane (Ctrl+Alt+Shift+S), click the 'New Style' button, and give your style a descriptive name like 'Memo Subheading' or 'Patient Letter Body.' Your custom style is now available in the Styles gallery for that document, and you can save it to a template for use in future documents.",
              "Document themes control three coordinated visual elements: colors (a set of 10 coordinated accent colors used throughout the document), fonts (a heading font and a body font pair), and effects (the style applied to shapes and SmartArt). Change the document theme by clicking Design > Themes on the Ribbon. Switching themes updates the visual identity of the entire document instantly — it is the fastest way to give a document a new look without touching any individual styles.",
            ],
          },
        ],
      },
      {
        heading: "The Navigation Pane",
        blocks: [
          {
            type: "paragraph",
            text: "One of the most powerful benefits of using Heading styles is automatic access to the Navigation Pane — a panel that shows your document's heading structure as a clickable outline, allowing you to jump to any section instantly:",
          },
          {
            type: "list",
            items: [
              "Open the Navigation Pane by pressing Ctrl+F or clicking View > Navigation Pane. Click the 'Headings' tab at the top of the pane. Every paragraph formatted with a Heading style (Heading 1, 2, 3, etc.) appears in the pane as a clickable link — click any heading to jump there immediately, no matter how long the document is.",
              "The Navigation Pane also lets you reorganize document sections by dragging headings up or down in the pane — the content under each heading moves with it. This is dramatically faster than cutting and pasting large sections of text, especially in long reports or policy documents.",
              "In a long Lakeside Medical Associates report — such as a monthly operations summary — the Navigation Pane makes it easy to jump directly to 'Provider Schedules,' 'Supply Expenditures,' or 'Patient Volume' without scrolling through dozens of pages. This is only possible because those section headings were formatted with Heading styles rather than manually bolded text.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Styles and Themes",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-1/styles-and-themes/infographic.png",
            alt: "Styles and Themes Quick Reference — built-in style hierarchy diagram, how to modify a style step-by-step, document theme components, and Navigation Pane usage guide",
            caption: "Styles and Themes Quick Reference — from built-in styles to custom document branding",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "When you modify a style in a shared template at Lakeside Medical Associates, that change affects everyone who uses that template. Before modifying any style in a shared document or template, confirm with your supervisor that the change is intentional and organization-wide. Changing the Normal body text style from 11pt to 9pt to fit more content on a page, for example, would affect every document produced from that template — and could make patient communications harder to read for elderly patients. Style changes in shared environments require clear communication and approval.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Design a professional style guide for a small medical office's Word documents. What styles should they define (heading levels, body text, captions, etc.), what fonts should they use, and what colors would look professional for patient-facing communications?' Use the response to plan a style system for Lakeside Medical Associates documents that you could propose to your supervisor.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What is the fastest way to update the font for every section heading in a long Word document when your supervisor changes the organization's brand font?",
            options: [
              "Select each heading one at a time and manually change the font",
              "Use Find & Replace to find old font text and replace it",
              "Modify the Heading style — the change applies to every heading using that style instantly",
              "Delete the document and retype it with the new font",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a Lakeside Medical Associates memo template that uses Word's Styles system for consistent, professional formatting. Every formatting choice in your template must be style-based — no manual formatting of individual text.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open a new blank Word document and apply the Office theme (Design > Themes > Office). Set the document font pair to Calibri body / Calibri Light headings by selecting the 'Office' font set from Design > Fonts.",
          "Modify the Heading 1 style to be 14pt, dark blue (use theme color 'Dark Blue, Text 2'), bold, and with 12pt Before and 6pt After paragraph spacing. Verify your change by typing a test heading and confirming it applies correctly.",
          "Modify the Normal style to be Calibri 11pt, black, with 1.15 line spacing and 8pt After paragraph spacing. This will be the body text style for all memo content.",
          "Create a custom style called 'Memo Label' formatted as Calibri 11pt, bold, with all caps. This style will be used for the TO:, FROM:, DATE:, and SUBJECT: labels in the memo header.",
          "Build a complete memo structure: type a heading 'STAFF MEMO' (Title style), then a four-line memo header (TO, FROM, DATE, SUBJECT) using your Memo Label style, then two body paragraphs using Normal style, and a closing using Normal style. Open the Navigation Pane (Ctrl+F) and confirm your heading appears there. Save as 'Lakeside Medical Memo Template.dotx' (Word Template format).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your .dotx template file to your instructor or course folder. Your template will be evaluated to confirm that all formatting is style-based (no direct/manual formatting on the heading or body text), your custom Memo Label style exists and is correctly defined, and the Navigation Pane displays your heading. This template could be used by the entire Lakeside Medical Associates staff immediately.",
      },
    ],
  },

  {
    slug: "tables-and-lists",
    title: "Tables, Lists, and Page Layout",
    description:
      "Create and format professional tables, build organized lists, set up headers and footers, and manage page numbers in Word 2019 for polished multi-page documents.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/tyXahko-tX8",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-01.jpg",
        alt: "Inserting Tables — the Insert Table dialog and drawing a table manually",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-02.jpg",
        alt: "Table Formatting — adjusting column widths, row heights, cell alignment, and table styles",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-03.jpg",
        alt: "Merging and Splitting Cells — creating header rows and complex table structures",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-04.jpg",
        alt: "Bulleted Lists — creating, customizing, and controlling bullet styles",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-05.jpg",
        alt: "Numbered Lists and Multi-Level Lists — automatic numbering and hierarchical list structures",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-06.jpg",
        alt: "Tab Stops — controlling where the Tab key jumps for precise text alignment",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-07.jpg",
        alt: "Headers and Footers — inserting, editing, and setting different first-page headers",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-08.jpg",
        alt: "Page Numbers — inserting, formatting, and positioning automatic page numbers",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/tables-and-lists/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct table or list tool for a given formatting task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates needs three things before the end of the day: a formatted supply request table showing item, quantity, and cost; a numbered procedure list for patient check-in staff; and a multi-page report with the practice name in the header and page numbers in the footer. All three require the skills in this lesson — tables, lists, and page layout tools that most Word users never fully explore.",
          },
        ],
      },
      {
        heading: "Working with Tables",
        blocks: [
          {
            type: "paragraph",
            text: "Tables are one of the most powerful tools in Word for organizing information that has a row-and-column structure — supply lists, schedules, patient intake summaries, pricing sheets, and comparison charts all benefit from table formatting. Here is how to insert and work with tables professionally:",
          },
          {
            type: "list",
            items: [
              "To insert a table, click Insert > Table and drag across the grid to select the number of columns and rows you need, or click 'Insert Table' for a dialog where you can type exact dimensions. For most office tables at Lakeside Medical Associates — such as a supply list with Item, Category, Quantity, and Cost columns — a 4-column table with as many rows as you have items is the right starting point. You can always add or delete rows and columns later.",
              "Adjusting column widths is essential for making tables look right — drag the column border lines to resize manually, or right-click the column, choose 'Table Properties,' and set an exact width in inches. For a professional supply table, the Item column should be widest (to accommodate long product names), while numeric columns (Quantity, Cost) should be narrower. The 'AutoFit' options in the Table menu can automatically size columns to fit their content or the page width.",
              "Table styles give your table a professional, coordinated appearance in seconds — when your cursor is inside a table, the Table Design tab appears on the Ribbon with a gallery of pre-built table styles. The 'Grid Table 4 – Accent 1' and 'List Table 5 Dark' styles are popular choices for professional reports. After applying a style, you can customize individual elements like the header row shading or the border color without losing the overall style.",
              "Merging cells allows you to create header rows that span multiple columns, or label rows that serve as section dividers within a large table — select two or more adjacent cells, right-click, and choose 'Merge Cells.' This is commonly used to create a spanning header like 'Lakeside Medical Associates — Monthly Supply Order' at the top of a supply table. Splitting cells divides a single cell into multiple rows or columns and is done via the same right-click menu.",
            ],
          },
        ],
      },
      {
        heading: "Bulleted and Numbered Lists",
        blocks: [
          {
            type: "paragraph",
            text: "Lists are the clearest way to present sequential instructions, grouped items, and procedural steps in professional documents. Word provides powerful list tools that go far beyond simply pressing Enter and typing a dash:",
          },
          {
            type: "list",
            items: [
              "Bulleted lists present items where order does not matter — such as a list of required documents for a new patient packet or a group of office supplies needed for restocking. Click the bullet icon in the Home tab > Paragraph group to start a bulleted list. Click the dropdown arrow next to the bullet icon to choose from different bullet styles (filled circle, hollow circle, square, check mark). For professional medical office documents, simple filled circles (•) are the clearest and most appropriate choice.",
              "Numbered lists present items where order matters — step-by-step instructions, ranked priorities, or sequential procedures should always use numbered lists. Click the numbered list icon in the Home tab > Paragraph group. Word automatically numbers each item and renumbers the list if you add, remove, or reorder items. If your list continues after a paragraph of text, right-click the numbered list item where numbering should continue and choose 'Continue Numbering.'",
              "Multi-level lists create hierarchical structures — main items with sub-items beneath them, like a procedure guide with steps and sub-steps. Press Tab while in a list item to indent it to the next level (which gets a different bullet or number style automatically), or Shift+Tab to promote it back. The multi-level list format is ideal for policy documents with main sections and supporting points.",
              "Tab stops let you control exactly where text jumps when you press the Tab key — creating aligned columns of text without a full table. Click on the ruler to place tab stops (left, right, center, or decimal tab). Tab stops are useful for simple two-column lists like a phone directory or a key/value reference list where a full table would be visually heavy. Click the tab alignment selector at the far left of the ruler to switch between tab stop types before clicking.",
            ],
          },
        ],
      },
      {
        heading: "Headers, Footers, and Page Numbers",
        blocks: [
          {
            type: "paragraph",
            text: "Headers and footers appear at the top and bottom of every page and are essential for multi-page professional documents — they provide context (document title, organization name, date) and navigation aid (page numbers) that keep long documents organized and professional:",
          },
          {
            type: "list",
            items: [
              "To insert a header or footer, double-click at the very top or bottom of any page (above the top margin or below the bottom margin), or use Insert > Header or Insert > Footer from the Ribbon and choose from the built-in style gallery. The document content dims and a 'Header & Footer Tools' tab appears in the Ribbon. Type or insert content in the header/footer zone — it will repeat on every page of the document automatically.",
              "Different first page headers allow you to have a title page without a header and number, with the header starting on page 2 — check the 'Different First Page' box in the Header & Footer Tools > Options group. This is the professional standard for formal reports: the first page shows just the title and date, while pages 2 onward show the document title in the header and the page number in the footer.",
              "Automatic page numbers are inserted via Insert > Page Number from the Ribbon while in the header/footer area. Choose your position (bottom of page, top of page, or page margin), choose a number style (plain number, 'Page X of Y', Roman numerals), and Word inserts a field that updates automatically as pages are added or removed. Never type a page number manually — if pages are added later, manual numbers will be wrong.",
              "The header and footer zone has a depth of 0.5 inch from the edge by default — content you type in the header appears 0.5 inch from the top of the page. You can adjust this in Header & Footer Tools > Position. For most Lakeside Medical Associates documents, the default depth is appropriate. Make sure your header/footer content is concise — no more than one or two lines to avoid eating into the document's usable page area.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Tables, Lists, and Page Layout",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-1/tables-and-lists/infographic.png",
            alt: "Tables, Lists, and Page Layout Quick Reference — table insertion steps, list type guide, tab stop types, header/footer setup checklist, and page number insertion steps",
            caption: "Tables, Lists, and Page Layout Quick Reference — organizing documents like a professional",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Tables containing patient information — such as appointment lists, billing summaries, or intake data — must be handled with the same care as any other document containing PHI. Do not share a table with patient names and appointment dates in an email unless the email is sent through HIPAA-compliant channels approved by Lakeside Medical Associates. When printing tables with patient data, use the practice's secured printer and shred any misprints immediately rather than leaving them in the trash. Data organization tools like tables make information more accessible — which means they also make data breaches more impactful if documents are mishandled.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a formatted supply request table for a small medical office with columns for Item Name, Category (office/medical/cleaning), Quantity Needed, Unit Cost, and Total Cost. Include 10 realistic rows of sample data.' Use the response as a starting point for building an actual supply table in Word — practice inserting the data into a properly formatted Word table with a professional table style applied.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are creating a multi-page staff policy document. What is the correct way to add page numbers that automatically update if pages are added?",
            options: [
              "Type the page number manually at the bottom of each page",
              "Use Insert > Page Number to insert an automatic page number field in the footer",
              "Use a table in the footer and type the number in the last cell",
              "Use the Format Painter to copy the number from one page to the next",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a formatted multi-page document for Lakeside Medical Associates that demonstrates your mastery of tables, lists, headers, and footers. Your document must include all elements specified below.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Word document titled 'Lakeside Medical Associates — Office Supply Request & Staff Procedures' using the Title style. Add a header on pages 2 and onward (use 'Different First Page') containing the practice name left-aligned and the date right-aligned. Add a footer on all pages with 'Page X of Y' centered.",
          "Insert a supply request table with 5 columns (Item Name, Category, Quantity, Unit Cost, Total Cost) and at least 8 rows of realistic medical office supply data. Apply a professional table style, merge the top row into a single cell labeled 'Monthly Supply Request — Lakeside Medical Associates,' and bold all column headers.",
          "Below the table, add a section titled 'Patient Check-In Procedure' (Heading 1 style) with a numbered list of at least 6 steps describing how front desk staff should check in a patient.",
          "Add a second section titled 'Required Patient Documents' (Heading 1 style) with a bulleted list of at least 5 items patients must bring to their first appointment.",
          "Save the completed document as 'Supply Request and Procedures – Lakeside Medical.docx' and export as PDF. Confirm in Print Preview that headers, footers, and page numbers appear correctly on all pages.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit both the .docx and PDF files to your instructor or course folder. Your document will be evaluated on: correct table structure with merged header row and professional style, numbered and bulleted lists with no manual formatting, proper header (with different first page setting) and footer with automatic page numbers, and overall professional appearance. This document should look like something Lakeside Medical Associates could post in the break room or distribute to new staff today.",
      },
    ],
  },

  {
    slug: "word-essentials-capstone",
    title: "Hands-On: Build a Professional Business Letter",
    description:
      "Apply every Word Essentials skill in a single capstone project — create a perfectly formatted block-format business letter for Lakeside Medical Associates, save it as a PDF, and demonstrate professional document quality.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/aRvVeiWmFZk",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-01.jpg",
        alt: "Block Letter Format — the standard structure of a professional business letter",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-02.jpg",
        alt: "Letterhead Setup — placing the organization name, address, and logo at the top",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-03.jpg",
        alt: "Inside Address and Date Line — correct placement and professional formatting",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-04.jpg",
        alt: "Subject Line, Salutation, and Body — the core content sections of a business letter",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-05.jpg",
        alt: "Closing and Signature Block — professional closing phrases and multi-line signature format",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-06.jpg",
        alt: "Professional Formatting Checklist — 10-point review before printing or sending",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-07.jpg",
        alt: "Saving as PDF — the Export workflow and when PDF is required over .docx",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-08.jpg",
        alt: "Printing to Specific Pages — print range options for multi-page documents",
      },
      {
        src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/slide-09.jpg",
        alt: "Knowledge Check — reviewing the key elements of a correctly formatted business letter",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates has given you your most important task of the week: draft an official letter to a referring physician informing them about a mutual patient's upcoming procedure and requesting their medical records. This letter will leave the office on Lakeside Medical Associates letterhead and represent the practice to a professional colleague. It must be perfectly formatted, professionally written, and saved as a PDF before 4:00 PM. Everything you have learned in this module comes together right now.",
          },
        ],
      },
      {
        heading: "Block Letter Format: The Professional Standard",
        blocks: [
          {
            type: "paragraph",
            text: "The block format business letter is the standard in medical and professional offices — all text is left-aligned, there are no indentations, and paragraphs are separated by a blank line rather than a first-line indent. Learning this format thoroughly means you can produce a professional letter without hesitation in any workplace:",
          },
          {
            type: "list",
            items: [
              "The letterhead is the first element — it appears at the very top of the page and contains the organization's name, address, phone number, fax number if applicable, and website. In a professionally designed letter, the letterhead may include a logo image. At Lakeside Medical Associates, the letterhead is centered at the top and uses the practice's brand font. For a Word document, create the letterhead by typing the organization information and formatting it consistently — larger, bold text for the name, smaller normal text for the contact details.",
              "The date line appears two to four lines below the letterhead and uses the full written date format: May 5, 2025 (not 5/5/25). The full written format is more formal and unambiguous — it cannot be misread across date format conventions. The date line is left-aligned in block format.",
              "The inside address appears two to four lines below the date — it contains the full name, title, organization, and mailing address of the recipient, formatted exactly as it will appear on the envelope. This is left-aligned and uses the same font and size as the body text. In a letter to a referring physician, the inside address would include: Dr. [Full Name], [Specialty], [Practice Name], [Street Address], [City, State ZIP].",
              "The subject line (optional but professional) appears two lines below the inside address as 'Re:' followed by the letter's topic — for example, 'Re: Patient Maria Rodriguez — Referral Records Request.' The subject line makes it immediately clear what the letter is about before the recipient reads the body.",
              "The body of the letter begins two lines after the salutation and consists of clearly written paragraphs explaining your purpose, your request or information, and any next steps. In block format, paragraphs are separated by a blank line and begin at the left margin with no first-line indent. Each paragraph should address one main idea — the first paragraph states your purpose, the middle paragraphs provide details, and the final paragraph states the next step or call to action.",
              "The closing and signature block end the letter — use a professional closing phrase ('Sincerely,' 'Respectfully,' 'Best regards,') followed by four blank lines for a handwritten signature, then your typed name, title, organization, and contact information. In a block letter, the closing is left-aligned like everything else.",
            ],
          },
        ],
      },
      {
        heading: "Professional Formatting Checklist",
        blocks: [
          {
            type: "paragraph",
            text: "Before a business letter leaves Lakeside Medical Associates, every item on this checklist should be confirmed. Skipping this review step is how errors reach recipients — and in a medical office, errors in patient correspondence can have serious consequences:",
          },
          {
            type: "list",
            items: [
              "Margins are 1 inch on all sides and have not been reduced to fit content — if your letter is running long, shorten the content rather than shrinking the margins.",
              "Font is consistent throughout — one typeface for the entire body (Calibri 11pt or Times New Roman 12pt), with the letterhead in a slightly larger size or bolder weight only.",
              "All text is left-aligned in block format — no centered body paragraphs, no indented first lines.",
              "The date is in full written format (Month DD, YYYY), not abbreviated.",
              "The recipient's name, title, and organization in the inside address are spelled correctly — verify against the original source before printing.",
              "The subject line 'Re:' accurately describes the letter's purpose.",
              "Body paragraphs are separated by a single blank line (paragraph After spacing set to 12pt, or a single Enter key with 1.0 line spacing).",
              "The closing is followed by four blank lines before the typed name.",
              "The document has been reviewed in Print Preview (Ctrl+P) to confirm it looks correct on the printed page.",
              "The final version has been saved as a PDF before sending — not just as a .docx.",
            ],
          },
        ],
      },
      {
        heading: "Saving as PDF and Printing",
        blocks: [
          {
            type: "paragraph",
            text: "The final steps in producing a professional letter are saving the PDF and knowing how to print correctly when a hard copy is needed. Both require specific knowledge to do without errors:",
          },
          {
            type: "list",
            items: [
              "To save as PDF in Word 2019: click File > Export > Create PDF/XPS, choose a file name and location, and click 'Publish.' The resulting PDF is a pixel-perfect replica of your printed document — fonts, spacing, and layout are locked and will appear identically on any device. Always save the PDF from the final approved version of the .docx, not from a draft.",
              "To print: press Ctrl+P to open the Print dialog. The preview on the right side of the Backstage view shows exactly how the document will print. In the settings, you can choose to print all pages, a specific page range (type '1-3' or '5, 7, 9'), or only the current page. Select your printer from the dropdown at the top. For final patient letters at Lakeside Medical Associates, always use the secure practice printer — never a personal printer or a shared printer in an unsecured location.",
              "Print Preview is your mandatory last check — if the preview shows a letter that spills onto a second page with just a closing line, you have a formatting problem to fix before printing. Common causes are excessive paragraph spacing, overly large fonts, or margins that are narrower than they appear on screen. Fix the document, return to Print Preview, and confirm before committing to paper.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Business Letter Format",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-1/word-essentials-capstone/infographic.png",
            alt: "Professional Business Letter Quick Reference — annotated block format letter template showing the position and formatting of every element: letterhead, date, inside address, subject, salutation, body, closing, and signature block",
            caption: "Block Format Business Letter — complete annotated reference for Lakeside Medical Associates",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "A business letter sent on Lakeside Medical Associates letterhead is a legal document that represents the practice. Never send a letter on official letterhead without supervisor approval, even if the content seems routine. In a medical office, letters to referring physicians, insurance companies, and regulatory agencies carry legal and clinical implications that go beyond ordinary correspondence. Always have your supervisor review and approve any outgoing letter before it is printed, signed, or emailed. If you send a letter in error — wrong recipient, wrong content — notify your supervisor immediately so corrective action can be taken.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write a professional block-format business letter from a medical office assistant at Lakeside Medical Associates to a referring physician at Riverside Family Practice requesting medical records for a shared patient named James Whitfield who is scheduled for a procedure on June 15, 2025. The letter should be polite, formal, and include a specific records request with a response deadline of May 30, 2025.' Review the generated letter carefully, correct any content that does not match professional medical correspondence standards, and use it as the starting point for your capstone challenge below.',",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In a block-format business letter, how are body paragraphs separated?",
            options: [
              "Each paragraph begins with a 0.5-inch first-line indent",
              "Paragraphs are separated by a blank line and begin at the left margin with no indent",
              "Each paragraph is centered on the page",
              "Paragraphs are separated by a horizontal rule (line)",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Produce a complete, print-ready professional business letter for Lakeside Medical Associates using everything you have learned in this module. Your letter must pass every item on the professional formatting checklist before you submit it.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a block-format letter from Lakeside Medical Associates (123 Lakeview Drive, Suite 200, Lakeside, CA 90210 | Phone: (555) 234-5678) to Dr. Patricia Yuen, MD, Riverside Family Practice, 445 Riverside Ave, Suite 100, Riverside, CA 91501, dated today. The subject line should read 'Re: Patient James Whitfield — Medical Records Request.'",
          "Write a three-paragraph body: (1) Introduce yourself as the office assistant at Lakeside Medical Associates and state that Mr. James Whitfield (DOB: March 12, 1965) is scheduled for a procedure on June 15, 2025. (2) Request complete medical records from the past 24 months, specifically including lab results, imaging reports, and current medication list. (3) State a response deadline of May 30, 2025 and provide a fax number (555-234-5679) and mailing address for sending records.",
          "Format the letter using Calibri 11pt body text, 1-inch margins, left alignment throughout, and 1.0 line spacing with 12pt After paragraph spacing. Use a signature block that includes your name, 'Office Assistant,' 'Lakeside Medical Associates,' and the practice phone number.",
          "Apply the 10-point professional formatting checklist from this lesson — review every item and confirm it is correct before moving to the next step.",
          "Save the final letter as both 'Records Request – Whitfield – Lakeside Medical.docx' and as a PDF. Open the PDF to confirm it displays correctly, then submit both files.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit both the .docx and PDF versions to your instructor or course folder. Your letter will be graded on correct block format structure, consistent professional typography, proper paragraph separation, accurate formatting checklist compliance, and correct PDF export. A passing grade means this letter could be printed on Lakeside Medical Associates letterhead and mailed to Dr. Yuen today without any further edits.",
      },
    ],
  },
];
