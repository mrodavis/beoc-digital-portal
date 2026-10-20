import type { SimDefinition } from "@/types/sim";

/**
 * modern-office sims that run in the Word engine. Keys are "<moduleSlug>::<lessonSlug>".
 *
 * Module 10 (Document & Data Workflows) is set at TOR Tech, a technology
 * services company. All people and clients are fictional.
 */
export const wordSims: Record<string, SimDefinition[]> = {
  "module-10::creating-professional-documents": [
    {
      id: "mo-word-m10-professional-docs-1",
      app: "word",
      title: "Polish the client summary before the presentation",
      scenario:
        "Your manager at TOR Tech needs a one-page summary for Harborview Dental Group before the November 4 client presentation. The content is right, but the headings are only bold text, one paragraph is in a different font, and the page is cramped. Make it professional, then save the working file and the file you will send.",
      fileName: "Client Summary Draft.docx",
      minutes: 6,
      initial: {
        page: { margins: "Narrow" },
        paragraphs: [
          { id: "p1", bold: true, size: 20, text: "Client Summary: Harborview Dental Group" },
          { id: "p2", italic: true, color: "#595959", text: "Prepared by TOR Tech for the November 4, 2026 client presentation" },
          { id: "p3", bold: true, size: 13, text: "Who They Are" },
          {
            id: "p4",
            text: "Harborview Dental Group is a dental practice with four offices and 38 employees. Each office keeps its own schedule and files, and staff share information by email.",
          },
          { id: "p5", bold: true, size: 13, text: "What They Need" },
          {
            id: "p6",
            text: "The practice wants one shared calendar for all four offices, secure file storage that staff can reach from any location, and a simple way to track equipment orders.",
          },
          { id: "p7", bold: true, size: 13, text: "Our Proposal" },
          {
            id: "p8",
            font: "Comic Sans MS",
            size: 12,
            color: "#7030A0",
            text: "TOR Tech will set up a cloud workspace with shared calendars and storage in the first month, then train the front desk team at each office on site. Support is included for the first year.",
          },
        ],
      },
      tasks: [
        {
          instruction: "The title was made with bold text. Apply the Title style to “Client Summary: Harborview Dental Group”.",
          hint: "Click the title. Home tab › Styles gallery › Title (use the More arrow if you don't see it).",
          steps: [
            {
              action: { kind: "command", id: "home.style", value: "Title" },
              requires: { selection: "p1" },
              selectHint: "Click the title at the top of the page first.",
            },
          ],
        },
        {
          instruction: "Apply the Heading 1 style to the three section labels: “Who They Are”, “What They Need”, and “Our Proposal”.",
          hint: "Click each section label, then Home tab › Styles gallery › Heading 1 (or press Ctrl+Alt+1).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p3" }, selectHint: "Click “Who They Are”, then apply Heading 1." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p5" }, selectHint: "Click “What They Need”, then apply Heading 1." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p7" }, selectHint: "Click “Our Proposal”, then apply Heading 1." },
          ],
        },
        {
          instruction: "The paragraph under “Our Proposal” was pasted in Comic Sans MS. Remove all of its formatting so it matches the rest of the body text.",
          hint: "Click the paragraph that begins “TOR Tech will set up”. Home tab › Font group › Clear All Formatting (or press Ctrl+Space).",
          steps: [
            {
              action: { kind: "command", id: "home.clearFormatting" },
              alt: [{ kind: "command", id: "home.style", value: "Normal" }],
              requires: { selection: "p8" },
              selectHint: "Click the paragraph that begins “TOR Tech will set up” first.",
            },
          ],
        },
        {
          instruction: "Change the page margins to 1 inch on all four sides.",
          hint: "Layout tab › Page Setup group › Margins › Normal (1\").",
          steps: [
            {
              action: { kind: "command", id: "layout.margins", value: "Normal" },
              alt: [
                { kind: "dialog", id: "customMargins", values: { top: 1, bottom: 1, left: 1, right: 1 } },
                { kind: "dialog", id: "pageSetup", values: { top: 1, bottom: 1, left: 1, right: 1 } },
              ],
            },
          ],
        },
        {
          instruction: "Set the line spacing of the entire document to 1.15.",
          hint: "Press Ctrl+A to select everything. Home tab › Paragraph group › Line and Paragraph Spacing › 1.15.",
          steps: [
            {
              action: { kind: "command", id: "home.lineSpacing", value: "1.15" },
              alt: [{ kind: "dialog", id: "paragraph", values: { lineSpacing: "Multiple", at: 1.15 } }],
              requires: { selection: ["all", "p1,p2,p3,p4,p5,p6,p7,p8"] },
              selectHint: "Select the whole document first: press Ctrl+A (or Home tab › Editing group › Select › Select All).",
            },
          ],
        },
        {
          instruction: "Save the working file as a Word document named “2026-10_ClientSummary_v1”.",
          hint: "File tab › Save As (or F12) › choose a location › type 2026-10_ClientSummary_v1 › keep the file type Word Document (*.docx) › Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "2026-10_ClientSummary_v1", format: "Word Document (*.docx)" } } }],
        },
        {
          instruction: "Create the file you will send to the client: export the document as a PDF named “2026-10_ClientSummary_v1”.",
          hint: "File tab › Export › Create PDF/XPS Document › Create PDF/XPS. (Save As with the PDF file type works too.)",
          steps: [
            {
              action: { kind: "dialog", id: "file.exportPdf", values: { name: "2026-10_ClientSummary_v1" } },
              alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "2026-10_ClientSummary_v1", format: "PDF (*.pdf)" } }],
            },
          ],
        },
      ],
    },
  ],

  "module-10::using-templates": [
    {
      id: "mo-word-m10-templates-1",
      app: "word",
      title: "Update the TOR Tech memo template safely",
      scenario:
        "Your manager asked you to clean up TOR Tech's memo template: its headings were faked with bold text, and they should use the company's dark blue. You opened the master template itself, so protect it first by saving your own copy, then make every change with styles.",
      fileName: "TOR Tech Memo Template.dotx",
      minutes: 5,
      initial: {
        saved: { name: "TOR Tech Memo Template.dotx", location: "OneDrive - Personal", format: "Word Template (*.dotx)" },
        paragraphs: [
          { id: "p1", bold: true, size: 22, text: "Internal Memo" },
          { id: "p2", spaceAfter: 0, text: "To: <Insert names here>" },
          { id: "p3", spaceAfter: 0, text: "From: <Insert your name here>" },
          { id: "p4", spaceAfter: 0, text: "Date: <Insert date here>" },
          { id: "p5", text: "Subject: <Insert subject here>" },
          { id: "p6", bold: true, size: 14, text: "Purpose" },
          { id: "p7", text: "<Insert one or two sentences that explain why you are writing.>" },
          { id: "p8", bold: true, size: 14, text: "Action Items" },
          { id: "p9", font: "Arial", size: 12, bold: true, text: "<List each action item, who owns it, and the due date.>" },
        ],
      },
      tasks: [
        {
          instruction: "Before you change anything, save a copy of the template as a Word Template named “TOR Tech Memo Template v2”.",
          hint: "File tab › Save As › choose a location › File name: TOR Tech Memo Template v2 › File type: Word Template (*.dotx) › Save. The master template stays untouched.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "TOR Tech Memo Template v2", format: "Word Template (*.dotx)" } } }],
        },
        {
          instruction: "Apply the Title style to “Internal Memo”.",
          hint: "Click “Internal Memo”. Home tab › Styles gallery › Title (use the More arrow if you don't see it).",
          steps: [
            {
              action: { kind: "command", id: "home.style", value: "Title" },
              requires: { selection: "p1" },
              selectHint: "Click “Internal Memo” at the top of the page first.",
            },
          ],
        },
        {
          instruction: "Apply the Heading 1 style to the section labels “Purpose” and “Action Items”.",
          hint: "Click each label, then Home tab › Styles gallery › Heading 1 (or press Ctrl+Alt+1).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p6" }, selectHint: "Click “Purpose”, then apply Heading 1." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p8" }, selectHint: "Click “Action Items”, then apply Heading 1." },
          ],
        },
        {
          instruction: "The placeholder under “Action Items” was formatted by hand in Arial bold. Apply the Normal style to it so it matches the other body text.",
          hint: "Click the placeholder that begins “<List each action item”. Home tab › Styles gallery › Normal (or press Ctrl+Shift+N).",
          steps: [
            {
              action: { kind: "command", id: "home.style", value: "Normal" },
              alt: [{ kind: "command", id: "home.clearFormatting" }],
              requires: { selection: "p9" },
              selectHint: "Click the placeholder under “Action Items” first.",
            },
          ],
        },
        {
          instruction: "Modify the Heading 1 style to use the company color, Dark Blue, so both section labels change at once.",
          hint: "Home tab › Styles gallery › More arrow › Modify Style… › Name: Heading 1 › Font color: Dark Blue › OK. (In Word you can also right-click Heading 1 in the gallery › Modify.)",
          steps: [{ action: { kind: "dialog", id: "modifyStyle", values: { style: "Heading 1", color: "#002060" } } }],
        },
        {
          instruction: "Save your changes to the copy.",
          hint: "Press Ctrl+S, or click Save on the title bar (File tab › Save). Save updates the copy you made, not the master template.",
          steps: [{ action: { kind: "command", id: "file.save" } }],
        },
      ],
    },
  ],
};
