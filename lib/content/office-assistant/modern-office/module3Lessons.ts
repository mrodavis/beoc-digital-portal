import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "creating-professional-documents",
    title: "Creating Professional Documents",
    description:
      "Learn how to produce clean, well-structured documents that represent your organization professionally.",
    duration: "20 min",

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
            text: "A professional document communicates clearly before anyone reads a single word. Structure and formatting signal competence. Here is what to focus on:",
          },
          {
            type: "list",
            items: [
              "Document structure — every document needs a title, clearly labeled sections, and a logical flow from top to bottom",
              "Headers — use heading styles (not just bold text) to organize sections so the document is scannable",
              "Font choices — stick to professional, readable fonts (Calibri, Arial, or Georgia). Use one font for headings and one for body text.",
              "Margins and spacing — use standard 1-inch margins and 1.15 or 1.5 line spacing for readability",
              "Saving vs exporting — save your working file in its native format (.docx or .gdoc), then export to PDF before sharing externally",
              "Naming files professionally — use a consistent format: Date_DocumentName_Version (e.g., 2025-04_ClientSummary_v1)",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a one-paragraph executive summary for a company that sells office management software.\" Use the response as starter content to practice your formatting skills in this lesson's challenge.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create a one-page professional summary document on any workplace topic of your choice (for example: 'Benefits of Cloud Storage' or 'Why Organized Communication Matters'). Your document must include a title, at least 2 clearly labeled sections with headers, properly formatted body text, and must be exported as a PDF before submission.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your one-page document as a PDF to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "using-templates",
    title: "Using Templates & Styles",
    description:
      "Learn how to use and create document templates to produce consistent, on-brand workplace documents.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech needs you to produce consistent documents — every memo, report, and letter must look the same. Your manager shows you the company template and says: \"Always start from this. Never start from a blank page.\" Templates are how professional organizations maintain their brand and save time.",
          },
        ],
      },
      {
        heading: "Templates & Document Styles",
        blocks: [
          {
            type: "paragraph",
            text: "Templates remove guesswork and ensure every document looks like it came from the same organization. Here is how they work and why they matter:",
          },
          {
            type: "list",
            items: [
              "What templates are — pre-built documents with consistent formatting, fonts, colors, and placeholders already set up",
              "Why offices use them — saves time, ensures brand consistency, and reduces formatting errors",
              "Applying styles — use built-in styles (Heading 1, Heading 2, Normal/Body Text) instead of manually bolding or sizing text",
              "Creating your own template — set up a document exactly how you want it, then save it as a .dotx (Word) or use Google Docs template gallery",
              "Using the templates gallery — both Google Docs and Microsoft Word have pre-built templates for memos, resumes, reports, and more",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a professional memo template for internal business communication.\" Use the result as the content to populate the template you build in this lesson's challenge.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Open a blank document in Google Docs or Microsoft Word. Apply consistent heading styles from the built-in Styles panel: use a Title style for the document title, Heading 1 for at least two section headers, and Normal or Body Text for paragraph content. Save the finished file as a reusable template.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed template document showing the Styles panel open with the styles applied visibly on the page.",
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
            text: "Your manager at TOR Tech hands you a sticky note with 15 client names, phone numbers, and contract dates scrawled on it. \"Enter these into a spreadsheet and sort them by date,\" they say, walking away. This is a daily reality in office work — and knowing spreadsheets is what separates a capable assistant from a great one.",
          },
        ],
      },
      {
        heading: "Spreadsheet Fundamentals",
        blocks: [
          {
            type: "paragraph",
            text: "Spreadsheets are the backbone of office data management. Master these fundamentals and you can handle most data tasks with confidence:",
          },
          {
            type: "list",
            items: [
              "Cells, rows, and columns — a cell is the intersection of a row (number) and column (letter). All data lives in cells.",
              "Entering and formatting data — type directly into cells; use Format > Cells (or right-click) to adjust number formats, dates, and text alignment",
              "Basic formulas — =SUM(A1:A10) adds a range; =COUNT(A1:A10) counts entries; =AVERAGE(A1:A10) calculates the mean",
              "Sorting and filtering — select your data range, then use Data > Sort to sort by any column; use Filter to show only rows that meet a condition",
              "Freezing header rows — use View > Freeze > 1 Row so your column headers stay visible as you scroll down through data",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the 5 most useful Excel or Google Sheets formulas for an office assistant?\" Review the response and try at least 2 of the formulas in a practice spreadsheet.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create a spreadsheet with at least 10 rows of fictional client data. Include columns for: Client Name, Phone Number, and Contract Start Date. Sort the data by Contract Start Date (earliest to latest), add a row count below the data using the COUNT formula, and format the header row so it stands out (bold text and a background color).",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed spreadsheet showing the sorted data, the formatted header row, and the COUNT formula result.",
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
            text: "TOR Tech needs a way to track which office supplies have been ordered, when they were ordered, and how much was spent. You are asked to build the tracker. There is no template — just a blank spreadsheet and a clear goal.",
          },
        ],
      },
      {
        heading: "Building a Functional Tracker",
        blocks: [
          {
            type: "paragraph",
            text: "A good tracker captures the right data, makes it easy to update, and gives a clear status at a glance. Here is how to build one that actually gets used:",
          },
          {
            type: "list",
            items: [
              "Plan your tracker — decide what data you need to capture before you type anything. For supplies: item name, quantity, cost per unit, date ordered, and status.",
              "Build the column structure — label each column in Row 1 with a frozen header so it stays visible as the sheet grows",
              "Using dropdowns for status — use Data Validation to create a dropdown menu (e.g., Ordered, Received, Out of Stock) so status entries are consistent",
              "Adding totals with SUM — use =SUM() at the bottom of your cost column to get an automatic running total",
              "Color-coding with conditional formatting — highlight rows red for Out of Stock and green for Received so status is visible at a glance without reading every cell",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Build me a simple office supply tracking spreadsheet with columns for item, quantity, cost, date ordered, and status.\" Use the suggested structure as a starting point, then customize it for TOR Tech's needs.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a completed Office Supply Tracker spreadsheet with at least 8 rows of data. Your tracker must include: item name, quantity, cost per unit, date ordered, and status columns. Add a total cost formula using SUM, apply conditional formatting to the Status column, and freeze the header row.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed tracker or share the link to your Google Sheet with view access granted to your instructor.",
      },
    ],
  },
];
