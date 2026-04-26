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
    videoUrl: "https://www.youtube.com/embed/NuCSU0iLHuk",
    slides: [
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-01.jpg",
        alt: "Spreadsheet Basics for Office Work — Module 3: Document & Data Workflows | Microsoft Office 2019 Certification",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-02.jpg",
        alt: "15 client names, phone numbers, and contract dates — spreadsheets turn raw, chaotic information into organized, searchable, and analyzable records",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-03.jpg",
        alt: "Cells, rows, and columns — Cell A1 is the intersection of Column A and Row 1. All data lives in cells, the building blocks of office data management.",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-04.jpg",
        alt: "Formatting the Grid for Clarity — Raw Data vs Polished Data using Format > Cells for currency, dates, and text alignment",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-05.jpg",
        alt: "The Power of Dynamic References — Static Values break when data changes; Dynamic References like =SUM(A1:A10) update totals automatically",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-06.jpg",
        alt: "Demystifying Formula Anatomy — The Trigger (=), The Action (SUM), and The Range (A1:A10) explained",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-07.jpg",
        alt: "Your Daily Formula Toolbelt — =SUM (The Adder), =COUNT (The Counter), =AVERAGE (The Balancer) with syntax and visual output",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-08.jpg",
        alt: "Quick Knowledge Check — Which formula adds up all values in the range A1 through A10? Answer: =SUM(A1:A10)",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-09.jpg",
        alt: "Taming Large Datasets — Freeze Headers with View > Freeze > 1 Row, Filter rows by condition, Sort with Data > Sort",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-10.jpg",
        alt: "Rules of the Shared Workspace — Risky Behavior (deleting source data, restructuring blindly) vs Safe Behavior (duplicate before edits, communicate with team)",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-11.jpg",
        alt: "Leveraging the AI Assistant — Ask ChatGPT for the 5 most useful Excel or Google Sheets formulas for an office assistant, then try at least 2 in a practice spreadsheet",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-12.jpg",
        alt: "The Mastery Challenge — Build a functional tracking sheet: sort by date, format headers, add =COUNT row count, and add =AVERAGE to a 4th column",
      },
      {
        src: "/images/office-assistant/module-3/spreadsheet-basics/slide-13.jpg",
        alt: "Brooklyn Educational Opportunity Center — dedicated to providing accessible, high-quality digital skills training for the modern workplace",
      },
    ],

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
        heading: "The Anatomy of a Spreadsheet",
        blocks: [
          {
            type: "paragraph",
            text: "Before you can do anything useful in a spreadsheet, you need to understand how it is structured. Every spreadsheet — whether in Microsoft Excel or Google Sheets — is built on the same three-part grid system:",
          },
          {
            type: "list",
            items: [
              "Columns — lettered vertically across the top of the sheet (A, B, C...). Each column holds one category of data — for example, column A might be Client Name and column B might be Phone Number.",
              "Rows — numbered horizontally down the left side of the sheet (1, 2, 3...). Each row holds one complete record — for example, row 2 might be all the information for a single client.",
              "Cells — the intersection of a column and a row. Cell A1 is column A, row 1. Cell C4 is column C, row 4. All data lives in cells — every piece of text, every number, every date, every formula.",
              "Row 1 is always your header row — label each column clearly in row 1 before entering any data. Headers like 'Client Name', 'Phone Number', and 'Contract Date' tell anyone reading the sheet exactly what they are looking at.",
              "Never leave row 1 blank or use it for data — a missing header row makes sorting, filtering, and formula-writing significantly harder and is a hallmark of an unstructured spreadsheet.",
            ],
          },
        ],
      },
      {
        heading: "Formatting the Grid for Clarity",
        blocks: [
          {
            type: "paragraph",
            text: "Raw data entered into a spreadsheet is not always readable or professional. Formatting transforms a messy grid of numbers and dates into a polished, scannable record that anyone can read at a glance. Three formatting rules apply to every professional spreadsheet:",
          },
          {
            type: "list",
            items: [
              "Currency formatting — select any column holding dollar amounts, then use Format > Number > Currency. This converts raw numbers like 1000 into professionally displayed values like $1,000.00. Inconsistent currency display (some cells showing '1000', others '$1,000') is a sign of an unfinished spreadsheet.",
              "Date formatting — select any date column and apply Format > Number > Date to lock in a consistent format like MM/DD/YYYY or YYYY-MM-DD across all rows. Without explicit formatting, dates may display differently depending on how they were typed — 01/05/2024 vs 1/5/24 vs January 5, 2024 — which breaks sorting.",
              "Text alignment — left-align all text columns and right-align all number and currency columns. This is standard spreadsheet convention and makes columns visually scannable without having to read every cell. Apply alignment from the toolbar or Format > Cells > Alignment.",
              "Column width — double-click any column border in the header to auto-fit its width to the longest entry. Columns that are too narrow cut off text and hide data; columns that are too wide waste screen space and make the sheet harder to scan.",
              "Header row formatting — bold the text in row 1 and apply a background color (blue or grey are standard). This visually separates headers from data and makes the structure obvious at first glance.",
            ],
          },
        ],
      },
      {
        heading: "Dynamic Cell References",
        blocks: [
          {
            type: "paragraph",
            text: "The most important concept in spreadsheet formulas is the difference between typing a number directly and referencing a cell. This distinction determines whether your spreadsheet stays accurate when data changes — or silently breaks:",
          },
          {
            type: "list",
            items: [
              "Static values — typing a number directly into a formula, like =150+200, is a static value. If the underlying data changes, the formula does not update. You must manually retype it every time, which introduces errors.",
              "Dynamic cell references — using a cell address in a formula, like =SUM(B2:B4), means the formula reads whatever is currently in those cells. Change a number in B3 and the total updates instantly with zero manual work.",
              "Always use cell references, never typed numbers — write =SUM(B2:B15) not =300. This is the single most important habit that separates spreadsheets that stay accurate from spreadsheets that lie.",
              "Range notation — A1:A10 means every cell from A1 down to A10. The colon (:) is read as 'through'. You can also reference a single cell (A1), two separate cells (A1,A5), or an entire column (A:A).",
              "Formula anatomy — every formula starts with an equals sign (=), which tells the spreadsheet you are calculating, not typing. Then comes the function name (SUM, COUNT, AVERAGE), then the range in parentheses: =SUM(A1:A10).",
            ],
          },
        ],
      },
      {
        heading: "The Big Three Formulas",
        blocks: [
          {
            type: "paragraph",
            text: "Three formulas cover the majority of everyday office data tasks. Learn these three and you can handle totals, counts, and averages — the building blocks of almost every tracking sheet, budget, and report you will encounter:",
          },
          {
            type: "list",
            items: [
              "=SUM(A1:A10) — The Adder. Adds up all values in the specified range. Use it to total a column of costs, quantities, hours, or any numeric data. Example: =SUM(C2:C16) totals all contract values from rows 2 through 16.",
              "=COUNT(A1:A10) — The Counter. Counts how many cells in the range contain a numeric value. Use it to find how many entries exist in a column — for example, how many clients are in a list, or how many invoices have been entered. Note: COUNT only counts numbers, not text; use COUNTA to count text entries.",
              "=AVERAGE(A1:A10) — The Balancer. Calculates the mean average of all numeric values in the range. Use it to find the average contract value, average hours worked, or average cost per item. It adds all values and divides by the count automatically.",
              "Placement — always place your formula results in a row below the last row of data, clearly labeled. For example, in cell A12 type 'Total:' and in B12 enter =SUM(B2:B11). This keeps formulas visually separated from raw data and easy to find.",
              "Extending formulas — once you write a formula in one cell, you can drag the small blue square at the bottom-right corner of the cell across adjacent cells to apply the same formula to neighboring columns automatically.",
            ],
          },
        ],
      },
      {
        heading: "Organizational Tools: Sort, Filter & Freeze",
        blocks: [
          {
            type: "paragraph",
            text: "As your spreadsheet grows from 10 rows to 100 or 1,000, three organizational tools become essential for keeping the data manageable and navigable:",
          },
          {
            type: "list",
            items: [
              "Sort — select your entire data range (including headers), then use Data > Sort to reorganize rows by any column in ascending or descending order. Always select the full range before sorting — sorting a single column while leaving others in place will scramble your records and corrupt your data.",
              "Filter — apply a filter via Data > Filter (or Data > Create a Filter in Google Sheets). This adds dropdown arrows to each header. Click a dropdown to show only rows that match a specific condition — for example, show only clients with a 'Pending' status, or only contracts from a specific month.",
              "Freeze Panes — as you scroll down through a long sheet, your header row disappears and you lose track of which column is which. Use View > Freeze > 1 Row (Google Sheets) or View > Freeze Panes > Freeze Top Row (Excel) to lock row 1 in place so it stays visible no matter how far you scroll.",
              "The correct order of operations — always set up your header row and freeze it first, then enter data, then sort. Sorting before freezing is a common mistake that produces confusing results.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Mastering the Grid",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-3/spreadsheet-basics/mastering-the-grid-infographic.png",
            alt: "Mastering the Grid: Spreadsheet Basics for Office Success — covering spreadsheet anatomy, dynamic cell references, the Big Three formulas, organizational tools, professional formatting, and responsible data habits",
            caption: "Mastering the Grid: Spreadsheet Basics for Office Success",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never delete source data from a shared spreadsheet without creating a backup first — duplicate the sheet tab before making any major changes. If you are working in a shared file, communicate with your team before sorting, restructuring columns, or adding formulas. Your changes affect everyone with access and can silently break formulas that others rely on. When in doubt, make your edits on a duplicate tab and share the result for review before touching the original.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the 5 most useful Excel or Google Sheets formulas for an office assistant, and how do I use each one?\" Review the response and try at least 2 of the generated formulas in a practice spreadsheet to expand your toolbelt before starting the challenge.",
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
        text: "Apply everything you have learned to build a functional client tracking spreadsheet from scratch. Your spreadsheet must have at least 10 rows of fictional client data with all four required columns, and meet every specification below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create columns for Client Name, Phone Number, Contract Start Date, and a fourth column of your choice — for example, Contract Value or Years Active",
          "Format the header row to stand out — bold text and a background color — and freeze it so it stays visible when scrolling",
          "Apply proper date formatting (MM/DD/YYYY) to the Contract Start Date column, then sort all data by that column from earliest to latest",
          "Add a row count below your data using =COUNT referencing your date column, clearly labeled 'Total Clients:'",
          "Add an =AVERAGE formula below your fourth column, clearly labeled, and write a 1–2 sentence note below the spreadsheet explaining what both formulas you used actually calculate",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed spreadsheet showing the sorted data, formatted and frozen header row, and both formula results visible — or share your Google Sheet link with view access granted to your instructor.",
      },
    ],
  },

  {
    slug: "build-tracking-sheet",
    title: "Hands-On: Build a Tracking Sheet",
    description:
      "Apply your spreadsheet skills to build a functional office supply tracker from scratch.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/EUTMg8y8Pkw",
    slides: [
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-01.jpg",
        alt: "Constructing a Functional Tracking Sheet — BEOC Digital Fundamentals, Module 3: Document & Data Workflows, Hands-On: Build a Tracking Sheet",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-02.jpg",
        alt: "The TOR Tech Blank Canvas Problem — The Scenario: track office supply orders, expenditures, and delivery timelines. No template. Goal: build a robust tool the entire team can use.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-03.jpg",
        alt: "Distinguishing the Fragile from the Functional — Fragile Tracker: inconsistent data, typos, breaks when rows are added. Functional Tracker: exact data, consistent status, updates effortlessly.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-04.jpg",
        alt: "Architecting the Column Structure — Plan your tracker first. Decide what data you need before you type anything. Planning Phase: Item Name, Quantity, Cost Per Unit, Date Ordered, Status.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-05.jpg",
        alt: "The Anatomy of a Professional Tracker — Structural Integrity (Frozen Headers), Data Guardrails (Validation Dropdowns), Visual Status (Conditional Formatting), Automated Intelligence (=SUM Formula).",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-06.jpg",
        alt: "Locking the Foundation with Frozen Headers — BEFORE: Unstable Foundation (headers disappear when scrolling). AFTER: Locked Structure (Row 1 stays permanently visible as the sheet grows).",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-07.jpg",
        alt: "Data Validation Acts as a Strategic Guardrail — Use Data Validation to create strict dropdown menus for the Status column. Ensures status entries are perfectly consistent and eliminates misspelled data.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-08.jpg",
        alt: "Scaling Calculations with Automated Intelligence — =SUM() engine placed at the bottom of the cost column creates an automatic running total that updates instantly as new rows of office supplies are added.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-09.jpg",
        alt: "Communicating Status Instantly via Color — Apply Conditional Formatting to trigger specific colors based on cell text. Status becomes visible at a single glance without requiring the user to read every individual cell.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-10.jpg",
        alt: "Establishing the Data Dictionary — Add a second tab named Notes to serve as your Data Dictionary, explaining what each column means and outlining special rules for team members using the tracker.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-11.jpg",
        alt: "Responsible Use Requires Cell Protection — When sharing a tracker with a team, protect important formula cells to prevent accidental edits. Google Sheets: Format > Protect range. Excel: Review > Protect Sheet.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-12.jpg",
        alt: "Accelerating the Build with AI — Use ChatGPT to generate a structural starting point, then customize it for TOR Tech. Prompt Recipe: The Request, The Columns, The Features.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-13.jpg",
        alt: "Knowledge Check — What spreadsheet feature should you use to keep status entries consistent across all rows? Answer: Data validation with a dropdown list.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-14.jpg",
        alt: "The Capstone Challenge — Build a completed Office Supply Tracker with at least 8 rows of data meeting 5 specifications: all 5 columns, =SUM formula, conditional formatting, frozen header, and a Notes tab.",
      },
      {
        src: "/images/office-assistant/module-3/build-tracking-sheet/slide-15.jpg",
        alt: "Moving Forward — Next Up: Module 4: Scheduling & Meetings. Brooklyn Educational Opportunity Center: dedicated to providing accessible, high-quality digital skills training.",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech needs a system to track office supply orders, expenditures, and delivery timelines. There is no template — you are starting with a blank spreadsheet. Your goal: build a robust tool that the entire team can use reliably without breaking it. A fragile tracker that breaks when new rows are added helps no one. A functional tracker stays accurate as the data grows.",
          },
        ],
      },
      {
        heading: "The Fragile Tracker vs. The Functional Tracker",
        blocks: [
          {
            type: "paragraph",
            text: "Most people build spreadsheet trackers by typing data into cells and calling it done. The result is a fragile tracker that falls apart the moment anyone uses it. A functional tracker is deliberately engineered. Here is what separates them:",
          },
          {
            type: "list",
            items: [
              "Fragile trackers capture inconsistent data — no rules mean every person types status values differently: 'received', 'Received', 'recieved', 'got it'. Filtering and sorting become useless.",
              "Fragile trackers suffer from typos and misspelled entries — a single inconsistent value breaks every filter that depends on it.",
              "Fragile trackers break when new rows are added — formulas that reference a fixed range like =SUM(B2:B8) silently stop counting the moment row 9 is added.",
              "Functional trackers capture exactly the right data — every column is planned in advance with a clear purpose and a defined format.",
              "Functional trackers enforce consistency through dropdowns — Data Validation limits status entries to a pre-approved list so no typo is ever possible.",
              "Functional trackers stay accurate as data grows — formulas reference complete columns rather than fixed ranges, and frozen headers keep orientation intact no matter how long the sheet becomes.",
              "Functional trackers provide clear status at a single glance — conditional formatting communicates every row's status visually so no one needs to read every cell to get the picture.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Architecting the Column Structure",
        blocks: [
          {
            type: "paragraph",
            text: "The most important step in building any tracker happens before you type a single value: planning what data you actually need to capture. Columns added impulsively mid-project break existing formulas and create structural debt. Plan first, build second:",
          },
          {
            type: "list",
            items: [
              "Item Name (Column A) — a short, clear name for the supply being ordered. Keep it concise: 'Printer Paper Ream', not 'the big box of paper from the store'.",
              "Quantity (Column B) — the number of units ordered. This is always a plain number — no units or labels in the cell, just the numeric value.",
              "Cost Per Unit (Column C) — the cost of a single unit formatted as currency ($). This column is the source for your =SUM formula.",
              "Date Ordered (Column D) — the order date formatted consistently as YYYY-MM-DD across every row. A consistent date format enables reliable chronological sorting.",
              "Status (Column E) — the current state of the order. This column gets a Data Validation dropdown: Ordered, Received, Out of Stock. No free-text entry allowed.",
              "Build the column structure by labeling each column in Row 1, then immediately apply a frozen header so the labels stay permanently visible as the sheet grows.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Locking the Foundation with Frozen Headers",
        blocks: [
          {
            type: "paragraph",
            text: "A header row that disappears when you scroll is not a header row — it is just a label that becomes useless the moment your tracker grows past the screen. Freeze it immediately after labeling your columns:",
          },
          {
            type: "list",
            items: [
              "Google Sheets — click View > Freeze > 1 Row. Row 1 locks in place and stays visible at the top of the screen no matter how far down you scroll.",
              "Excel — click View > Freeze Panes > Freeze Top Row. Same result: the header row is now permanently anchored.",
              "Always freeze the header row before entering any data — this ensures the structure is locked before the sheet grows.",
              "Verify it works: enter 20+ rows of test data and scroll to the bottom. The header row should remain fully visible at the top of the window.",
              "A frozen header is non-negotiable for any tracker shared with a team — without it, users scrolling through long lists have no way to know which column they are editing.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Data Guardrails: Validation Dropdowns",
        blocks: [
          {
            type: "paragraph",
            text: "The Status column is the most dangerous column in any tracker because it relies entirely on free-text entry — and humans are unreliable typists. Data Validation eliminates the problem by replacing the free-text field with a strict dropdown menu:",
          },
          {
            type: "list",
            items: [
              "Select the entire Status column (Column E), then navigate to Data > Data Validation (Google Sheets) or Data > Data Validation > Allow: List (Excel).",
              "Enter your allowed values: Ordered, Received, Out of Stock — separated by commas. These are the only values the column will accept.",
              "Set the validation to reject invalid data — in Google Sheets, choose 'Reject input' under On invalid data. This means typing anything outside the approved list will be blocked entirely.",
              "The result: every status entry is perfectly consistent. Filtering by 'Ordered' will find every ordered item because no one can type 'ordered', 'Orderd', or 'in progress' into that column.",
              "Data Validation also speeds up entry — users select from the dropdown instead of typing, which is faster and eliminates all possibility of error.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Automated Intelligence: The =SUM Formula",
        blocks: [
          {
            type: "paragraph",
            text: "A running total at the bottom of your cost column is the most essential formula in any supply tracker. Typing the total manually is not acceptable — a static number will silently become wrong the moment any cost value changes. Use =SUM:",
          },
          {
            type: "list",
            items: [
              "Place your =SUM formula in the first empty cell below your last row of data in the Cost Per Unit column. For example, if your data runs from C2 to C9, place your formula in C10.",
              "Write the formula as =SUM(C2:C9) — this adds every value in the Cost Per Unit column from row 2 to row 9 and displays the running total.",
              "Label the formula clearly — type 'Total Cost:' in the cell directly to the left (B10 in this example) so anyone reading the sheet immediately knows what the number represents.",
              "The formula updates automatically whenever any cost value in the range changes — no manual recalculation, no risk of a stale number.",
              "If you add new rows of data between your last data row and the formula row, update your =SUM range to include the new rows. For example, expand =SUM(C2:C9) to =SUM(C2:C12) after adding more items.",
              "Format the total cell as Currency ($) to match the values above it — a plain number in the total row looks inconsistent and unfinished.",
            ],
          },
        ],
      },
      {
        heading: "Phase 2 — Visual Status via Conditional Formatting",
        blocks: [
          {
            type: "paragraph",
            text: "A tracker with 50 rows of supply orders is useless if you have to read every Status cell to find which items are out of stock. Conditional Formatting makes status visible at a glance by automatically coloring cells based on their content:",
          },
          {
            type: "list",
            items: [
              "Select the entire Status column (Column E), then navigate to Format > Conditional Formatting (Google Sheets) or Home > Conditional Formatting > New Rule (Excel).",
              "Create a rule for 'Out of Stock' — set the condition to 'Text is exactly: Out of Stock' and choose a red background fill. Every cell containing 'Out of Stock' will turn red automatically.",
              "Create a second rule for 'Received' — set the condition to 'Text is exactly: Received' and choose a green background fill. Every delivered item will show green instantly.",
              "Leave 'Ordered' uncolored (white/default) so it is visually neutral — pending orders do not need a color signal until their status changes.",
              "The result: scanning a 50-row tracker for urgent items takes two seconds instead of two minutes. Red cells demand attention; green cells confirm completion.",
              "Conditional formatting applies automatically to every new row added to the column — you never need to manually reformat cells as the tracker grows.",
            ],
          },
        ],
      },
      {
        heading: "Phase 2 — Establishing the Data Dictionary",
        blocks: [
          {
            type: "paragraph",
            text: "A tracker shared with a team needs documentation. Without it, team members guess what each column means, enter data inconsistently, and break the structure you built. A Data Dictionary tab eliminates this problem:",
          },
          {
            type: "list",
            items: [
              "Add a second tab to your spreadsheet — right-click the sheet tab at the bottom and select 'Insert sheet'. Name it 'Notes'.",
              "Document every column in the Tracker tab with one clear entry in the Notes tab: the column name, what it means, and any formatting or entry rules.",
              "Example entries: 'Column A (Item Name): Short descriptive name of the supply item. Max 30 characters.' | 'Column C (Cost Per Unit): Cost of one unit in USD. Format as Currency. Do not include total costs.' | 'Column E (Status): Select from dropdown only. Options: Ordered, Received, Out of Stock.'",
              "Include the date the tracker was created and the name of the person who built it at the top of the Notes tab — this helps teammates know who to ask questions.",
              "A Data Dictionary is standard professional practice. It is what separates a personal spreadsheet from a team tool that anyone can maintain without breaking it.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Pro-Level Spreadsheets",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-3/build-tracking-sheet/building-functional-tracker-infographic.png",
            alt: "Pro-Level Spreadsheets: Building a Functional Office Supply Tracker — Phase 1: Structure & Automation (frozen headers, validation dropdowns, =SUM formula), Phase 2: Visibility & Protection (conditional formatting, data dictionary, formula cell protection)",
            caption: "Pro-Level Spreadsheets: Building a Functional Office Supply Tracker",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "When sharing a tracker with a team, protect important formula cells to prevent accidental edits. A single broken =SUM formula in a shared tracker can corrupt cost data for everyone. In Google Sheets: Format > Protect range — select your formula cells and restrict editing to yourself. In Excel: Review > Protect Sheet. Protect formulas before you share, not after someone accidentally deletes one.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Build me a simple office supply tracking spreadsheet with columns for item, quantity, cost per unit, date ordered, and status. Include a SUM formula for total cost and a dropdown for status values.\" Use the AI-generated structure as a starting point, then apply every technique from this lesson — frozen headers, Data Validation dropdowns, conditional formatting, and a Notes tab — to turn the raw structure into a professional, team-ready tool.",
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
          "Include all 5 columns: Item Name, Quantity, Cost Per Unit, Date Ordered, and Status",
          "Add a total cost formula using =SUM at the bottom of the Cost Per Unit column, clearly labeled 'Total Cost:'",
          "Apply conditional formatting to the Status column — red background for 'Out of Stock', green background for 'Received'",
          "Freeze the header row so it stays visible when scrolling through the full list",
          "Add a second tab named Notes with a 1-sentence description of every column in the tracker",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed tracker showing the data, =SUM formula result, and conditional formatting active — or share your Google Sheet link with view access granted to your instructor. Test before sharing: enter a few rows of data, verify the formulas calculate correctly, and confirm the dropdown rejects free-text entries.",
      },
    ],
  },
];
