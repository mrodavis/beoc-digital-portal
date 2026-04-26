import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "creating-professional-documents",
    title: "Creating Professional Documents",
    description:
      "Learn how to produce clean, well-structured documents that represent your organization professionally.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/JQjyWXj2OJU",
    slides: [
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-01.jpg",
        alt: "Creating Professional Documents — Digital Fundamentals: Document & Data Workflows",
      },
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-02.jpg",
        alt: "Structure signals competence before a single word is read — The Scenario and The Stakes",
      },
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-03.jpg",
        alt: "The physical anatomy of a professional page — margins, title, line spacing, and labeled sections",
      },
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-04.jpg",
        alt: "Designing text for scannability and professional impact — Amateur vs Professional typography",
      },
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-05.jpg",
        alt: "Overcoming the blank page with the drafting loop — AI Task, Raw Content, Human Application",
      },
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-06.jpg",
        alt: "Protect your formatting when sharing externally — Working File vs Presentation File",
      },
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-07.jpg",
        alt: "A consistent architecture for file naming — Date_DocumentName_Version convention",
      },
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-08.jpg",
        alt: "The BEOC Challenge: Put it into practice — create a one-page professional summary document",
      },
      {
        src: "/images/office-assistant/module-3/creating-professional-documents/slide-09.jpg",
        alt: "Continued learning and platform support — About BEOC, Quick Links, Support Desk",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech asks you to create a one-page summary document for an upcoming client presentation. It needs to look clean and professional — because this document is what the client sees before they ever meet the team.",
          },
        ],
      },
      {
        heading: "Document Structure & Formatting",
        blocks: [
          {
            type: "paragraph",
            text: "A professional document communicates clearly before anyone reads a single word. Structure and formatting signal competence — a well-formatted page tells the reader you are organized, detail-oriented, and take your work seriously. Here is the anatomy of every professional document:",
          },
          {
            type: "list",
            items: [
              "Every document needs a title, clearly labeled sections, and a logical flow from top to bottom — readers should never have to hunt for what they are looking for",
              "Use heading styles (Heading 1, Heading 2) from the Styles panel — not just bold text — so the document is scannable and navigable",
              "Professional fonts only: stick to Calibri, Arial, or Georgia. Use one font for headings and a different complementary font for body text",
              "Standard 1-inch margins on all four sides and 1.15 to 1.5 line spacing for optimal readability and professional white space",
              "Never mix more than two fonts in a single document — inconsistent typography is one of the most common signals of an amateur document",
              "Always start from structure: set your title and section headers first, then fill in body content — never start with a wall of text",
            ],
          },
        ],
      },
      {
        heading: "Working Files vs. Delivery Files",
        blocks: [
          {
            type: "paragraph",
            text: "Two file formats serve two distinct purposes in professional document work. Knowing when to use each is a non-negotiable workplace skill:",
          },
          {
            type: "list",
            items: [
              ".docx / .gdoc — The Working File: Save in this format while you are drafting and editing. It remains fully editable and is what you keep in your files.",
              ".pdf — The Presentation File: Always export to PDF before sharing a document externally. This locks the layout and preserves your deliberate formatting exactly as designed, no matter what software the recipient uses.",
              "Never send a raw .docx to a client unless they specifically request an editable version — an editable file exposes your drafting process and can be accidentally modified.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: The Professional Document Checklist",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-3/creating-professional-documents/checklist-infographic.png",
            alt: "The Professional Document Checklist: From Draft to Delivery — covering heading styles, margins, font pairings, PDF export, and file naming conventions",
            caption: "The Professional Document Checklist: From Draft to Delivery",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "A document sent externally represents your entire organization. Never share unfinished drafts, documents with tracked changes visible, or files with inconsistent formatting. Always do a final format review — check margins, font consistency, and heading styles — before exporting and sending.",
          },
        ],
      },
      {
        heading: "Professional File Naming",
        blocks: [
          {
            type: "paragraph",
            text: "Professionalism extends to the file directory. A consistent naming convention gives every document instant context — who made it, what it is, and which version — without opening the file:",
          },
          {
            type: "list",
            items: [
              "Use the format: Date_DocumentName_Version — for example, 2025-04_ClientSummary_v1",
              "Use YYYY-MM date format so files sort chronologically in any folder view",
              "Increment version numbers when making significant revisions (v1 → v2 → v3)",
              "Never use spaces in file names — use underscores or hyphens instead, which prevents errors when files are shared across systems",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a one-paragraph executive summary for a company that sells office management software.\" Use the AI response as raw starter material, then apply structure, heading styles, margins, and typography rules to turn it into a professional artifact. The formatting you apply is what makes it yours.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What format should you use when sharing a professional document externally?",
            options: [
              ".docx to allow the recipient to edit",
              "PDF to preserve formatting and layout",
              ".txt for simplicity",
              "A shared Google Doc with full edit access",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create a one-page professional summary document on any workplace topic of your choice (for example: 'Benefits of Cloud Storage' or 'Why Organized Communication Matters'). Your document must meet all five specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Include a main title using a proper Title or Heading 1 style — not bold text",
          "Include at least 2 clearly labeled sections using proper Heading styles",
          "Format body text with 1-inch margins and 1.15 to 1.5 line spacing",
          "Apply a consistent font pairing (e.g., Calibri for headings, Arial for body text)",
          "Name the file using the convention: YYYY-MM_TopicName_v1",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Export and submit your document as a PDF. A raw .docx or .gdoc file does not count as a final submission.",
      },
    ],
  },

  {
    slug: "using-templates",
    title: "Using Templates & Styles",
    description:
      "Learn how to use and create document templates to produce consistent, on-brand workplace documents.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/95UCS-485xY",
    slides: [
      {
        src: "/images/office-assistant/module-3/using-templates/slide-01.jpg",
        alt: "Digital Fundamentals: Document Workflows — Using templates and styles to engineer consistent workplace documents",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-02.jpg",
        alt: "Never start from a blank page — templates maintain brand and save time",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-03.jpg",
        alt: "The organizational value of pre-built documents — Saves Time, Ensures Consistency, Reduces Errors",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-04.jpg",
        alt: "Stop formatting text manually — Manual Formatting vs Built-In Styles comparison",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-05.jpg",
        alt: "Anatomy of a professional template — Pre-set Fonts, Locked-in Colors, Consistent Formatting, Placeholders",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-06.jpg",
        alt: "Leverage built-in template galleries — Google Docs Gallery and Microsoft Word Gallery",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-07.jpg",
        alt: "How to capture and save a custom structure — Step 1: Configure, Step 2: Export .dotx, Step 3: Deploy",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-08.jpg",
        alt: "Accelerate drafting with AI assist — ChatGPT prompt for professional memo template",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-09.jpg",
        alt: "Knowledge check — What is the recommended way to format section headers in a professional document?",
      },
      {
        src: "/images/office-assistant/module-3/using-templates/slide-10.jpg",
        alt: "Execute the workflow challenge — open a blank document and apply built-in styles throughout",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech needs every document — every memo, report, and letter — to look like it came from the same organization. Your manager opens a file and says: 'Always start from this. Never start from a blank page.' You are now responsible for knowing how to use the company template, apply styles correctly, and save your own reusable structures for future documents.",
          },
        ],
      },
      {
        heading: "Why Professionals Never Start from Scratch",
        blocks: [
          {
            type: "paragraph",
            text: "Starting from a blank page is one of the most common inefficiencies in office work. Professional organizations use templates to eliminate guesswork, protect their brand, and ensure every document produced — regardless of who makes it — looks like it came from the same team. Templates deliver three direct benefits:",
          },
          {
            type: "list",
            items: [
              "Saves time — eliminates the need to rebuild document structures, set margins, and choose fonts from scratch on every new file",
              "Ensures consistency — locks in exact fonts, colors, and layouts across every person on the team so every document looks cohesive",
              "Reduces errors — removes the risk of accidental formatting mistakes that happen when everyone manually styles their own documents",
            ],
          },
        ],
      },
      {
        heading: "Anatomy of a Professional Template",
        blocks: [
          {
            type: "paragraph",
            text: "A professional template is more than a blank page with a logo. It is a pre-engineered document structure with four built-in components that do the formatting work for you:",
          },
          {
            type: "list",
            items: [
              "Pre-set fonts — heading and body fonts are defined in advance so every contributor uses the same typeface automatically",
              "Locked-in colors — brand colors are embedded in the theme so accent colors, header backgrounds, and borders are always consistent",
              "Consistent formatting — margins, line spacing, and paragraph styles are already configured to professional standards",
              "Placeholders — marked fields like '<Insert text here>' guide the user to fill in the right content in the right location without breaking the structure",
            ],
          },
        ],
      },
      {
        heading: "Built-In Styles vs. Manual Formatting",
        blocks: [
          {
            type: "paragraph",
            text: "The most critical skill in document workflow is knowing the difference between manually styling text and applying a built-in style. They look similar on screen but behave completely differently:",
          },
          {
            type: "list",
            items: [
              "Manual formatting (bold + font size increase) is prone to inconsistencies — each person applies it slightly differently and there is no global control",
              "Built-in styles (Heading 1, Heading 2, Normal/Body Text) from the Styles panel are instant, uniform, and structurally locked to the template",
              "Modifying a style updates every instance — change Heading 1's font size in the Styles panel and every Heading 1 in the document updates automatically",
              "Built-in styles also power the document's navigable structure — table-of-contents generators, screen readers, and PDF viewers all detect them",
              "The rule: never bold and resize text to fake a heading — click the style in the Styles panel instead",
            ],
          },
        ],
      },
      {
        heading: "Template Galleries & Saving Custom Templates",
        blocks: [
          {
            type: "paragraph",
            text: "You do not need to build every template from scratch. Both major platforms include pre-built foundations ready for immediate use, and both allow you to save your own custom structures for reuse.",
          },
          {
            type: "list",
            items: [
              "Google Docs gallery — access via File > New from template; includes memos, resumes, reports, and project plans ready to customize",
              "Microsoft Word gallery — access via File > New; same document types with additional corporate and academic formats",
              "Saving a custom template in Word — configure your document exactly as you want it, then File > Save As > Word Template (.dotx)",
              "Saving a custom template in Google Docs — open the template gallery, click Submit template, and your document becomes available to your organization",
              "Once saved, open the template file for future projects to guarantee an exact structural and visual match every time",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Mastering Document Consistency",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-3/using-templates/consistency-infographic.png",
            alt: "Mastering Document Consistency: The Power of Templates & Styles — covering why professionals use templates, applying styles, and saving reusable templates",
            caption: "Mastering Document Consistency: The Power of Templates & Styles",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never modify your organization's master template file directly. Always create a copy before making changes. A damaged or inconsistently edited master template can break formatting across dozens of documents and undermine your organization's brand standards. If you are unsure whether a template is the master file, ask before editing.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a professional memo template for internal business communication. Include placeholders for To, From, Date, Subject, and a body section with an introduction and action items.\" Use the AI output as your raw content, then apply Title and Heading 1 styles from the Styles panel to turn it into a properly structured template document.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What is the recommended way to format section headers in a professional document?",
            options: [
              "Manually bold and increase the font size",
              "Underline the text and add a border",
              "Use built-in heading styles from the Styles panel",
              "Use a different font for each section",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build and save a reusable professional memo template from scratch. Use only built-in styles — no manual bold or font-size changes. Your finished template must meet all five requirements below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open a blank document in Google Docs or Microsoft Word",
          "Apply the Title style for the main document heading",
          "Apply Heading 1 style to at least two clearly labeled sections",
          "Apply Normal or Body Text style to all paragraph content",
          "Save the finished file as a reusable template (.dotx in Word or via Google Docs template gallery)",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed template document showing the Styles panel open with your applied styles visible on the page.",
      },
    ],
  },

  {
    slug: "spreadsheet-basics",
    title: "Spreadsheet Basics for Office Work",
    description:
      "Learn how to enter, format, and organize data in a spreadsheet for everyday office tasks.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech hands you a sticky note with 15 client names, phone numbers, and contract dates scrawled on it. 'Enter these into a spreadsheet and sort them by date,' they say, walking away. This is a daily reality in office work — and knowing spreadsheets is what separates a capable assistant from a great one.",
          },
        ],
      },
      {
        heading: "Spreadsheet Fundamentals",
        blocks: [
          {
            type: "paragraph",
            text: "Spreadsheets are the backbone of office data management. They turn raw information into organized, searchable, and analyzable records. Master these fundamentals and you can handle most data tasks with confidence:",
          },
          {
            type: "list",
            items: [
              "Cells, rows, and columns — a cell is the intersection of a row (numbered 1, 2, 3...) and a column (lettered A, B, C...). All data lives in cells. Cell A1 is column A, row 1.",
              "Entering and formatting data — type directly into a cell; use Format > Cells (or right-click) to apply number formats, date formats, currency symbols, and text alignment",
              "Formatting numbers and dates — use Format > Number to ensure currency shows as $1,000.00 and dates display consistently (MM/DD/YYYY) across all rows",
              "Basic formulas — =SUM(A1:A10) adds up a range; =COUNT(A1:A10) counts how many entries exist; =AVERAGE(A1:A10) calculates the mean of the range",
              "Cell references vs. static values — always use cell references in formulas (=SUM(A1:A10)) rather than typing numbers directly, so totals update automatically when data changes",
              "Sorting and filtering — select your data range, use Data > Sort to sort by any column, and use Filter to show only rows matching a specific condition",
              "Freezing header rows — use View > Freeze > 1 Row so your column headers stay visible as you scroll down through hundreds of rows",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never delete source data from a spreadsheet without creating a backup first. If you are working in a shared spreadsheet, check with your team before adding formulas, sorting data, or restructuring columns — your changes affect everyone with access and can break formulas others are relying on.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the 5 most useful Excel or Google Sheets formulas for an office assistant, and how do I use each one?\" Review the response and try at least 2 of the formulas in a practice spreadsheet before starting the challenge.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which formula adds up all values in the range A1 through A10?",
            options: [
              "=COUNT(A1:A10)",
              "=TOTAL(A1:A10)",
              "=ADD(A1:A10)",
              "=SUM(A1:A10)",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create a spreadsheet with at least 10 rows of fictional client data. Include columns for Client Name, Phone Number, and Contract Start Date. Complete all four requirements below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Sort the data by Contract Start Date (earliest to latest)",
          "Format the header row so it stands out — bold text and a background color",
          "Add a row count below the data using the =COUNT formula",
          "Add an =AVERAGE formula to a fourth column of your choice (e.g., Contract Value or Years Active) and write a 1–2 sentence note below the spreadsheet explaining what each formula you used does",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed spreadsheet showing the sorted data, the formatted header row, and both formula results visible.",
      },
    ],
  },

  {
    slug: "build-tracking-sheet",
    title: "Hands-On: Build a Tracking Sheet",
    description:
      "Apply your spreadsheet skills to build a functional office supply tracker from scratch.",
    duration: "30 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech needs a way to track which office supplies have been ordered, when they were ordered, and how much was spent. You are asked to build the tracker. There is no template — just a blank spreadsheet and a clear goal. A well-built tracker will be used by the entire team.",
          },
        ],
      },
      {
        heading: "Building a Functional Tracker",
        blocks: [
          {
            type: "paragraph",
            text: "A good tracker captures the right data, makes it easy to update, gives a clear status at a glance, and stays accurate as more data is added. Here is how to build one that actually gets used:",
          },
          {
            type: "list",
            items: [
              "Plan your tracker first — decide what data you need to capture before you type anything. For an office supply tracker: item name, quantity, cost per unit, date ordered, and status.",
              "Build the column structure — label each column in Row 1 using a frozen header so the labels stay visible as the sheet grows",
              "Using dropdowns for status — use Data Validation to create a dropdown menu (e.g., Ordered, Received, Out of Stock) so status entries are consistent and never misspelled",
              "Adding totals with SUM — use =SUM() at the bottom of your cost column for an automatic running total that updates as new rows are added",
              "Color-coding with conditional formatting — highlight rows red for Out of Stock and green for Received so status is visible at a glance without reading every cell",
              "Testing your tracker — enter a few rows of test data before sharing. Verify all formulas calculate correctly, dropdowns work, and conditional formatting triggers as expected.",
              "Documentation — add a second tab named Notes that explains what each column means and any special rules for the tracker. This is called a data dictionary and is standard practice in professional spreadsheet work.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "If you are sharing a tracker with your team, protect important formula cells to prevent accidental edits. Use Format > Protect range in Google Sheets or Review > Protect Sheet in Excel. A broken formula in a shared tracker can corrupt data for everyone using it.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Build me a simple office supply tracking spreadsheet with columns for item, quantity, cost per unit, date ordered, and status. Include a SUM formula for total cost and a dropdown for status values.\" Use the suggested structure as a starting point, then customize it for TOR Tech's needs.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What spreadsheet feature should you use to keep status entries consistent across all rows?",
            options: [
              "A SUM formula",
              "Conditional formatting",
              "Data validation with a dropdown list",
              "Freezing the header row",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a completed Office Supply Tracker spreadsheet with at least 8 rows of data. Your tracker must meet all five specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Include columns for: Item Name, Quantity, Cost Per Unit, Date Ordered, and Status",
          "Add a total cost formula using =SUM at the bottom of the Cost Per Unit column",
          "Apply conditional formatting to the Status column (e.g., red for Out of Stock, green for Received)",
          "Freeze the header row so it stays visible when scrolling",
          "Add a second tab named Notes with a brief description (1 sentence each) of what every column in the tracker means",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed tracker showing the data, formula results, and conditional formatting — or share the link to your Google Sheet with view access granted to your instructor.",
      },
    ],
  },
];
