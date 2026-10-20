import type { SimDefinition, WordPara } from "@/types/sim";
import type { XDoc } from "@/components/sim/apps/word/model";

/**
 * office-apps sims that run in the Word engine. Keys are "<moduleSlug>::<lessonSlug>".
 *
 * Module 1 (Word Essentials) and Module 2 (Word Advanced) of the Office
 * Assistant Program. The course is set at Lakeside Medical Associates
 * (123 Lakeview Drive, Lakeside, CA), with Renee Alvarez as the practice
 * manager. The documents here are deliberately different from the ms-office
 * Word sims. All people are fictional.
 */

/** Every selection key that puts the insertion point somewhere in a table (cells, whole rows, whole columns, whole table). */
function anyCell(id: string, rows: number, cols: number): string[] {
  const out = [`${id}.r0c0`];
  for (let r = 1; r <= rows; r++) {
    out.push(`${id}.r${r}c0`);
    for (let c = 1; c <= cols; c++) out.push(`${id}.r${r}c${c}`);
  }
  for (let c = 1; c <= cols; c++) out.push(`${id}.r0c${c}`);
  return out;
}

/** Selection keys inside one row of a table. */
function rowCells(id: string, row: number, cols: number): string[] {
  return [`${id}.r${row}c0`, ...Array.from({ length: cols }, (_, i) => `${id}.r${row}c${i + 1}`)];
}

const LETTERHEAD: WordPara[] = [
  { id: "p1", bold: true, size: 16, color: "#1F4E79", spaceAfter: 0, text: "Lakeside Medical Associates" },
  { id: "p2", size: 9, color: "#595959", text: "123 Lakeview Drive, Suite 200, Lakeside, CA 90210 · Phone: (555) 234-5678 · Fax: (555) 234-5679" },
];

/* ---------- Module 1 capstone: the records request letter ---------- */

const RECORDS_BODY_1 =
  "I am the office assistant at Lakeside Medical Associates. Our mutual patient, Mr. James Whitfield (DOB: March 12, 1965), is scheduled for a procedure at our office on November 19, 2026.";
const RECORDS_BODY_3 =
  "Please send the records by November 6, 2026. You can fax them to (555) 234-5679 or mail them to the address above. Thank you for your help.";

const RECORDS_DRAFT_IDS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17"];

/* ---------- Module 2: templates ---------- */

const FAX_TEMPLATE: WordPara[] = [
  { id: "p1", style: "Title", text: "FAX" },
  { id: "p2", bold: true, size: 14, spaceAfter: 0, runs: [{ id: "r1", text: "[Company Name]" }] },
  { id: "p3", runs: [{ text: "Phone: " }, { id: "r1", text: "[Phone]" }, { text: "    Fax: " }, { id: "r2", text: "[Fax]" }] },
  { id: "p4", text: "Date:" },
  { id: "p5", runs: [{ text: "To: " }, { id: "r1", text: "[Recipient Name]" }] },
  { id: "p6", runs: [{ text: "Fax number: " }, { id: "r1", text: "[Recipient Fax]" }] },
  { id: "p7", runs: [{ text: "From: " }, { id: "r1", text: "[Your Name]" }] },
  { id: "p8", runs: [{ text: "Pages, including cover: " }, { id: "r1", text: "[Number]" }] },
  { id: "p9", runs: [{ text: "Re: " }, { id: "r1", text: "[Subject]" }] },
  { id: "p10", runs: [{ id: "r1", text: "[Comments]" }] },
];

const FAX_NOTICE =
  "CONFIDENTIAL: This fax may contain protected health information. If you received it in error, call (555) 234-5678 and destroy all copies.";

/* ---------- Module 2 capstone: the fall newsletter ---------- */

const NEWSLETTER_FLU =
  "Flu shots are available now for everyone 6 months and older. Walk in Monday through Friday, 9:00 AM to 4:00 PM, or book a time through the patient portal. Most insurance plans cover the shot at no cost to you.";
const NEWSLETTER_HOURS =
  "Starting November 2, we are open Monday through Friday, 8:00 AM to 6:00 PM, and Saturday, 9:00 AM to 1:00 PM. We will close at 2:00 PM on December 24 and December 31.";
const NEWSLETTER_WELLNESS =
  "Dress in layers, wash your hands often for at least 20 seconds, and stay home when you are sick. Call us before you visit if you have a fever.";

export const wordSims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  /* Module 1: Word Essentials                                         */
  /* ================================================================ */

  "module-1::intro-to-word-2019": [
    {
      id: "oa-word-m1-intro-1",
      app: "word",
      title: "Find your way around Word on your first morning",
      scenario:
        "It is your first morning at Lakeside Medical Associates. Renee Alvarez, the practice manager, left a task list open on your computer. Work through it: start a new document, look at it in each view, and save it in the two formats the office uses.",
      fileName: "Morning Task List.docx",
      minutes: 5,
      initial: {
        saved: { name: "Morning Task List.docx", location: "OneDrive - Personal" },
        paragraphs: [
          { id: "p1", style: "Title", text: "Your First Morning" },
          { id: "p2", style: "Subtitle", text: "From Renee Alvarez, Practice Manager · Lakeside Medical Associates" },
          { id: "p3", style: "Heading 1", text: "Before Noon" },
          { id: "p4", list: "number", text: "Start a new document for your orientation notes." },
          { id: "p5", list: "number", text: "Look at the page in Web Layout, Read Mode, and Print Layout, and zoom in to read the small print." },
          { id: "p6", list: "number", text: "Save your notes with a clear name, as a Word document and as a PDF." },
          { id: "p7", list: "number", text: "Find out how often Word saves AutoRecover information." },
          { id: "p8", style: "Heading 1", text: "One Rule to Remember" },
          {
            id: "p9",
            text: "Save practice documents only to the practice's network drive or its approved OneDrive. Never use a personal USB drive or a personal cloud folder.",
          },
        ],
      },
      tasks: [
        {
          instruction: "Create a new blank document.",
          hint: "Press Ctrl+N, or File tab › New › Blank document.",
          steps: [
            {
              action: { kind: "command", id: "file.new", value: "Blank document" },
              effects: [
                { op: "set", path: "paragraphs", value: [{ id: "p1", text: "" }] },
                { op: "set", path: "saved", value: { name: "Document2.docx" } },
              ],
            },
          ],
        },
        {
          instruction: "On the first line of the new document, type “Lakeside Medical Associates - Office Assistant Orientation”.",
          hint: "Click the first line of the blank page, type the text, and press Enter.",
          steps: [{ action: { kind: "type", target: "p1", value: "Lakeside Medical Associates - Office Assistant Orientation" } }],
        },
        {
          instruction: "Look at the document in Web Layout view, then in Read Mode, and then return to Print Layout view.",
          hint: "View tab › Views group › Web Layout, then Read Mode. To leave Read Mode, press Esc or click Edit Document. The view buttons near the right end of the status bar work too.",
          steps: [
            { action: { kind: "command", id: "view.mode", value: "Web Layout" } },
            { action: { kind: "command", id: "view.mode", value: "Read Mode" } },
            { action: { kind: "command", id: "view.mode", value: "Print Layout" } },
          ],
        },
        {
          instruction: "Zoom the document to 150%.",
          hint: "View tab › Zoom group › Zoom › type 150 in the Percent box › OK. You can also drag the zoom slider at the right end of the status bar to 150%.",
          steps: [
            {
              action: { kind: "dialog", id: "zoom", values: { percent: 150 } },
              alt: [{ kind: "command", id: "view.zoom", value: "150" }],
            },
          ],
        },
        {
          instruction: "Save the document to This PC as a Word document named “Office Assistant Orientation - October 2026”.",
          hint: "File tab › Save As (or press F12) › This PC › type the file name › keep the file type Word Document (*.docx) › Save.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "file.saveAs",
                values: { location: "This PC", name: "Office Assistant Orientation - October 2026", format: "Word Document (*.docx)" },
              },
            },
          ],
        },
        {
          instruction: "Export the document as a PDF named “Office Assistant Orientation - October 2026”.",
          hint: "File tab › Export › Create PDF/XPS Document › Create PDF/XPS. (Save As with the PDF file type works too.)",
          steps: [
            {
              action: { kind: "dialog", id: "file.exportPdf", values: { name: "Office Assistant Orientation - October 2026" } },
              alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Office Assistant Orientation - October 2026", format: "PDF (*.pdf)" } }],
            },
          ],
        },
        {
          instruction: "Open the Save settings in Word Options to check how often Word saves AutoRecover information.",
          hint: "File tab › Options › Save. The AutoRecover setting is at the top of that page.",
          steps: [{ action: { kind: "command", id: "file.options", value: "Save" } }],
        },
      ],
    },
  ],

  "module-1::document-formatting": [
    {
      id: "oa-word-m1-formatting-1",
      app: "word",
      title: "Polish the new patient welcome letter",
      scenario:
        "Renee Alvarez needs 50 copies of the new patient welcome letter this afternoon. It was typed in a hurry: the margins are too narrow, two paragraphs came from older letters in other fonts, and the body text is cramped. Make it look like it came from one careful office.",
      fileName: "New Patient Welcome Letter.docx",
      minutes: 5,
      initial: {
        page: { margins: "Narrow" },
        paragraphs: [
          ...LETTERHEAD,
          { id: "p3", text: "October 20, 2026" },
          { id: "p4", spaceAfter: 0, text: "Ms. Denise Carter" },
          { id: "p5", text: "88 Willow Lane, Lakeside, CA 90211" },
          { id: "p6", text: "Re: Welcome to Lakeside Medical Associates" },
          { id: "p7", text: "Dear Ms. Carter:" },
          {
            id: "p8",
            lineSpacing: 1,
            spaceAfter: 0,
            text: "Thank you for choosing Lakeside Medical Associates for your care. Your first appointment is with Dr. Sarah Chen on Tuesday, November 3, at 10:00 AM. Please arrive 15 minutes early so we can complete your registration.",
          },
          {
            id: "p9",
            font: "Comic Sans MS",
            size: 10,
            color: "#7030A0",
            lineSpacing: 1,
            spaceAfter: 0,
            text: "Bring your insurance card, a photo ID, and a list of the medications you take, including vitamins and supplements. If you have records from another doctor, bring those as well.",
          },
          {
            id: "p10",
            font: "Times New Roman",
            size: 12,
            lineSpacing: 1,
            spaceAfter: 0,
            text: "Free parking is available in the lot behind the building. If you need to reschedule, call our front desk at (555) 234-5678 at least 24 hours before your visit.",
          },
          { id: "p11", text: "Sincerely," },
          { id: "p12", spaceAfter: 0, text: "Grace Liu" },
          { id: "p13", text: "Office Assistant, Lakeside Medical Associates" },
        ],
      },
      tasks: [
        {
          instruction: "Change the page margins to 1 inch on all four sides.",
          hint: "Layout tab › Page Setup group › Margins › Normal (1\"). Custom Margins… with 1\" on every side works too.",
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
          instruction: "Remove all of the formatting from the paragraph that begins “Bring your insurance card”.",
          hint: "Click the paragraph. Home tab › Font group › Clear All Formatting (or press Ctrl+Space).",
          steps: [
            {
              action: { kind: "command", id: "home.clearFormatting" },
              alt: [{ kind: "command", id: "home.style", value: "Normal" }],
              requires: { selection: "p9" },
              selectHint: "Click the paragraph that begins “Bring your insurance card” first.",
            },
          ],
        },
        {
          instruction: "Copy the formatting of the paragraph that begins “Thank you for choosing” to the paragraph that begins “Free parking”.",
          hint: "Click the paragraph that begins “Thank you for choosing”. Home tab › Clipboard group › Format Painter (or Ctrl+Shift+C). Then click the paragraph that begins “Free parking”.",
          steps: [
            {
              action: { kind: "command", id: "home.formatPainter" },
              requires: { selection: "p8" },
              selectHint: "Start from the source: click the paragraph that begins “Thank you for choosing” first.",
            },
            {
              action: { kind: "command", id: "home.formatPainter.apply" },
              requires: { selection: "p10" },
              selectHint: "With the paintbrush pointer, click the paragraph that begins “Free parking”.",
            },
          ],
        },
        {
          instruction: "Set the line spacing of the three body paragraphs to 1.15.",
          hint: "Click “Thank you for choosing”, then Shift+click “Free parking” to select all three. Home tab › Paragraph group › Line and Paragraph Spacing › 1.15.",
          steps: [
            {
              action: { kind: "command", id: "home.lineSpacing", value: "1.15" },
              alt: [{ kind: "dialog", id: "paragraph", values: { lineSpacing: "Multiple", at: 1.15 } }],
              requires: { selection: "p8,p9,p10" },
              selectHint: "Select all three body paragraphs first: click the one that begins “Thank you for choosing”, then Shift+click the one that begins “Free parking”.",
            },
          ],
        },
        {
          instruction: "Add 8 pt of spacing after each of the three body paragraphs.",
          hint: "With the three body paragraphs selected: Layout tab › Paragraph group › Spacing After › 8 (or Paragraph dialog › Spacing after: 8 pt).",
          steps: [
            {
              action: { kind: "command", id: "layout.spaceAfter", value: "8" },
              alt: [{ kind: "dialog", id: "paragraph", values: { spaceAfter: 8 } }],
              requires: { selection: "p8,p9,p10" },
              selectHint: "Select all three body paragraphs first: click the first one, then Shift+click the third.",
            },
          ],
        },
        {
          instruction: "Change the font size of the subject line, “Re: Welcome to Lakeside Medical Associates”, to 14.",
          hint: "Click the subject line. Home tab › Font group › Font Size box › 14.",
          steps: [
            {
              action: { kind: "command", id: "home.fontSize", value: "14" },
              alt: [{ kind: "dialog", id: "font", values: { size: 14 } }],
              requires: { selection: "p6" },
              selectHint: "Click the subject line that begins “Re:” first.",
            },
          ],
        },
        {
          instruction: "Bold the subject line.",
          hint: "With the subject line selected: Home tab › Font group › Bold (or Ctrl+B).",
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              alt: [{ kind: "dialog", id: "font", values: { style: ["Bold", "Bold Italic"] } }],
              requires: { selection: "p6" },
              selectHint: "Click the subject line that begins “Re:” first.",
            },
          ],
        },
      ],
    },
  ],

  "module-1::styles-and-themes": [
    {
      id: "oa-word-m1-styles-themes-1",
      app: "word",
      title: "Build the staff memo on styles",
      scenario:
        "Every staff memo at Lakeside Medical Associates looks a little different because each person formats the headings by hand. Renee Alvarez wants one memo built on styles and the office theme, saved as a template so anyone can type a memo that looks right automatically.",
      fileName: "Staff Memo - Flu Season Coverage.docx",
      minutes: 6,
      initial: {
        theme: "Retrospect",
        paragraphs: [
          { id: "p1", bold: true, size: 20, text: "Staff Memo" },
          { id: "p2", spaceAfter: 0, text: "TO: All front desk and billing staff" },
          { id: "p3", spaceAfter: 0, text: "FROM: Renee Alvarez, Practice Manager" },
          { id: "p4", spaceAfter: 0, text: "DATE: October 20, 2026" },
          { id: "p5", text: "SUBJECT: Flu season coverage plan" },
          { id: "p6", bold: true, size: 14, text: "Walk-In Flu Clinic Hours" },
          { id: "p7", text: "Walk-in flu shots start Monday, November 2. The clinic runs Monday through Friday from 9:00 AM to 4:00 PM in Exam Rooms 5 and 6." },
          { id: "p8", bold: true, size: 14, text: "Coverage Requests" },
          { id: "p9", text: "Each front desk shift needs two people during clinic hours. Submit shift swap requests in the scheduling app at least one week ahead." },
          { id: "p10", style: "Heading 1", text: "Questions" },
          { id: "p11", text: "Contact Renee Alvarez at extension 201." },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Title style to “Staff Memo”.",
          hint: "Click “Staff Memo”. Home tab › Styles gallery › Title (use the More arrow if you don't see it).",
          steps: [
            {
              action: { kind: "command", id: "home.style", value: "Title" },
              requires: { selection: "p1" },
              selectHint: "Click the first line, “Staff Memo”, first.",
            },
          ],
        },
        {
          instruction: "Apply the Heading 1 style to “Walk-In Flu Clinic Hours” and to “Coverage Requests”.",
          hint: "Click each heading, then Home tab › Styles gallery › Heading 1 (or press Ctrl+Alt+1).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p6" }, selectHint: "Click “Walk-In Flu Clinic Hours”, then apply Heading 1." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p8" }, selectHint: "Click “Coverage Requests”, then apply Heading 1." },
          ],
        },
        {
          instruction: "Modify the Heading 1 style so that it is 14 point, bold, and Dark Blue, Text 2.",
          hint: "Home tab › Styles gallery › More arrow › Modify Style… › Name: Heading 1 › Size: 14 › check Bold › Font color: Dark Blue, Text 2 › OK. (In Word you can also right-click Heading 1 in the gallery › Modify.)",
          steps: [{ action: { kind: "dialog", id: "modifyStyle", values: { style: "Heading 1", size: 14, bold: true, color: "#44546A" } } }],
        },
        {
          instruction: "Create a new style named “Memo Label” with bold text from the “TO:” line.",
          hint: "Click the “TO:” line. Home tab › Styles gallery › More arrow › Create a Style › Name: Memo Label › check Bold › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createStyle", values: { name: "Memo Label", bold: true } },
              requires: { selection: "p2" },
              selectHint: "Click the “TO:” line first, so the new style is built from it.",
            },
          ],
        },
        {
          instruction: "Apply the Memo Label style to the “FROM:”, “DATE:”, and “SUBJECT:” lines.",
          hint: "Click the “FROM:” line, then Shift+click the “SUBJECT:” line. Home tab › Styles gallery › More arrow › Memo Label. (The Styles pane, from the Styles group's dialog launcher, lists it too.)",
          steps: [
            {
              action: { kind: "command", id: "home.customStyle", value: "Memo Label" },
              requires: { selection: "p3,p4,p5" },
              selectHint: "Select the three lines first: click the “FROM:” line, then Shift+click the “SUBJECT:” line.",
            },
          ],
        },
        {
          instruction: "Apply the Office theme so the memo uses the practice's standard colors and fonts.",
          hint: "Design tab › Document Formatting group › Themes › Office.",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Office" } }],
        },
        {
          instruction: "Open the Navigation pane and use it to jump to the “Coverage Requests” heading.",
          hint: "View tab › Show group › Navigation Pane (or press Ctrl+F). Click “Coverage Requests” in the Headings list.",
          steps: [
            { action: { kind: "command", id: "view.navPane" }, alt: [{ kind: "command", id: "home.find" }] },
            { action: { kind: "select", target: "p8" } },
          ],
        },
        {
          instruction: "Save the memo as a Word Template named “Lakeside Medical Memo Template”.",
          hint: "File tab › Save As › This PC › File name: Lakeside Medical Memo Template › File type: Word Template (*.dotx) › Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Lakeside Medical Memo Template", format: "Word Template (*.dotx)" } } }],
        },
      ],
    },
  ],

  "module-1::tables-and-lists": [
    {
      id: "oa-word-m1-tables-1",
      app: "word",
      title: "Build the November supply order table",
      scenario:
        "Renee Alvarez needs the November supply order on her desk by the end of the day. The order sheet lists each item, its category, the quantity, and the unit cost. Put it in a table that is easy to read and labeled across the top.",
      fileName: "November Supply Order.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "November Supply Order" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Prepared October 20, 2026" },
          { id: "p3", text: "Please place this order by Friday, October 30. Questions about any item go to Renee Alvarez, Practice Manager, at extension 201." },
          { id: "p4", style: "Heading 1", text: "Items to Order" },
          { id: "p5", style: "Heading 1", text: "Approval" },
          { id: "p6", text: "Approved by: ______________________   Date: ____________" },
        ],
      },
      tasks: [
        {
          instruction: "Insert a table with 4 columns and 4 rows directly below the heading “Items to Order”. (The three items from the order sheet are filled in for you.)",
          hint: "Click the heading “Items to Order”. Insert tab › Tables group › Table › drag across 4 columns and down 4 rows (4 × 4 Table). Insert Table… with 4 columns and 4 rows works too.",
          steps: [
            {
              action: { kind: "command", id: "insert.table", value: "4x4" },
              alt: [{ kind: "dialog", id: "insertTable", values: { cols: 4, rows: 4 } }],
              requires: { selection: "p4" },
              selectHint: "Click the heading “Items to Order” first, so the table goes right below it.",
              effects: [
                {
                  op: "set",
                  path: "paragraphs.tbl1.table.rows",
                  value: [
                    ["", "", "", ""],
                    ["Exam table paper rolls", "Medical", "12 cases", "$38.50"],
                    ["Nitrile gloves, medium", "Medical", "20 boxes", "$9.25"],
                    ["Copy paper, letter size", "Office", "10 reams", "$6.75"],
                  ],
                },
              ],
            },
          ],
        },
        {
          instruction: "Type the column headings “Item”, “Category”, “Quantity”, and “Unit Cost” across the first row.",
          hint: "Click the first cell and type Item. Press Tab to move to the next cell and type the next heading.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "tbl1.r1c1", value: "Item" } },
            { action: { kind: "type", target: "tbl1.r1c2", value: "Category" } },
            { action: { kind: "type", target: "tbl1.r1c3", value: "Quantity" } },
            { action: { kind: "type", target: "tbl1.r1c4", value: "Unit Cost" } },
          ],
        },
        {
          instruction: "Insert a new row above the column headings to hold the table title.",
          hint: "Click in the row of column headings. Table Layout tab › Rows & Columns group › Insert Above (or right-click › Insert Rows Above).",
          steps: [
            {
              action: { kind: "command", id: "table.insertAbove" },
              requires: { selection: rowCells("tbl1", 1, 4) },
              selectHint: "Click in the row of column headings first.",
            },
          ],
        },
        {
          instruction: "In the first cell of the new top row, type “Lakeside Medical Associates - Monthly Supply Order”.",
          hint: "Double-click the first cell of the empty top row (or click it and start typing), type the title, and press Enter.",
          steps: [{ action: { kind: "type", target: "tbl1.r1c1", value: "Lakeside Medical Associates - Monthly Supply Order" } }],
        },
        {
          instruction: "Merge the cells of the top row so the title spans the whole table.",
          hint: "Click in the top row, then Table Layout tab › Table group › Select › Select Row. Then Table Layout tab › Merge group › Merge Cells (or right-click › Merge Cells).",
          steps: [
            {
              action: { kind: "command", id: "table.merge" },
              requires: { selection: "tbl1.r1c0" },
              selectHint: "Select the whole top row first: click in it, then Table Layout tab › Select › Select Row.",
            },
          ],
        },
        {
          instruction: "Resize the columns of the table to fit their contents.",
          hint: "Click anywhere in the table. Table Layout tab › Cell Size group › AutoFit › AutoFit Contents.",
          steps: [
            {
              action: { kind: "command", id: "table.autofit", value: "AutoFit Contents" },
              requires: { selection: anyCell("tbl1", 5, 4) },
              selectHint: "Click anywhere inside the table first.",
            },
          ],
        },
        {
          instruction: "Apply the Grid Table 4 - Accent 1 table style.",
          hint: "Click in the table. Table Design tab › Table Styles gallery › Grid Table 4 - Accent 1.",
          steps: [
            {
              action: { kind: "command", id: "table.style", value: "Grid Table 4 - Accent 1" },
              requires: { selection: anyCell("tbl1", 5, 4) },
              selectHint: "Click anywhere inside the table first.",
            },
          ],
        },
      ],
    },
    {
      id: "oa-word-m1-lists-1",
      app: "word",
      title: "Format the records release procedure",
      scenario:
        "New front desk staff keep asking how to handle a request for medical records. The procedure is written, but it is all plain text: the steps aren't numbered, the checklist isn't a list, and nothing identifies a page that gets separated from the rest. Fix all three.",
      fileName: "Records Release Procedure.docx",
      minutes: 7,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Medical Records Release Procedure" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Front Desk and Records Office · Revised October 2026" },
          { id: "p3", kind: "pageBreak" },
          { id: "p4", style: "Heading 1", text: "Processing a Records Request" },
          { id: "p5", text: "Ask the requester to complete and sign the Authorization for Release form." },
          { id: "p6", text: "Check the requester's photo ID against the name on the form." },
          { id: "p7", text: "Log the request in the records tracking sheet with today's date." },
          { id: "p8", text: "Pull only the records listed on the form." },
          { id: "p9", italic: true, text: "If the form is not signed, stop here and return it to the requester. Do not release any records." },
          { id: "p10", text: "Make the copies and have the records supervisor initial the log." },
          { id: "p11", text: "Mail or hand the copies to the requester within 15 business days." },
          { id: "p12", style: "Heading 1", text: "What the Requester Must Provide" },
          { id: "p13", text: "Signed authorization form" },
          { id: "p14", text: "Signature of the patient or legal guardian" },
          { id: "p15", text: "Date the form was signed" },
          { id: "p16", text: "Valid photo ID" },
          { id: "p17", text: "Payment for copies, if the request is more than 50 pages" },
        ],
      },
      tasks: [
        {
          instruction: "Format the four steps under “Processing a Records Request”, from “Ask the requester” through “Pull only the records”, as a numbered list that uses the 1. 2. 3. format.",
          hint: "Click “Ask the requester…”, then Shift+click “Pull only the records…”. Home tab › Paragraph group › Numbering (or Numbering arrow › 1. 2. 3.).",
          steps: [
            {
              action: { kind: "command", id: "home.numbering", value: ["1.", ""] },
              requires: { selection: "p5,p6,p7,p8" },
              selectHint: "Select all four steps first: click “Ask the requester…”, then Shift+click “Pull only the records…”.",
            },
          ],
        },
        {
          instruction: "Number the two steps after the italic note so that they continue the list as steps 5 and 6.",
          hint: "Select “Make the copies…” and “Mail or hand the copies…”, then Home tab › Numbering. Word starts them at 1, so right-click “Make the copies…” › Continue Numbering. (Or Numbering arrow › Set Numbering Value… › Continue from previous list.)",
          steps: [
            {
              action: { kind: "command", id: "home.numbering", value: ["1.", ""] },
              requires: { selection: "p10,p11" },
              selectHint: "Select both steps first: click “Make the copies…”, then Shift+click “Mail or hand the copies…”.",
            },
            {
              action: { kind: "command", id: "list.continue" },
              alt: [{ kind: "dialog", id: "setNumbering", values: { mode: "Continue from previous list" } }],
              requires: { selection: ["p10", "p10,p11"] },
              selectHint: "Right-click the step that begins “Make the copies”, the one that should become step 5.",
            },
          ],
        },
        {
          instruction: "Format the five lines under “What the Requester Must Provide” as a bulleted list with solid round bullets (•).",
          hint: "Click “Signed authorization form”, then Shift+click “Payment for copies…”. Home tab › Paragraph group › Bullets (or Bullets arrow › • Solid round).",
          steps: [
            {
              action: { kind: "command", id: "home.bullets", value: ["•", ""] },
              requires: { selection: "p13,p14,p15,p16,p17" },
              selectHint: "Select all five lines first: click “Signed authorization form”, then Shift+click “Payment for copies…”.",
            },
          ],
        },
        {
          instruction: "Demote the two lines under “Signed authorization form” one level, so they sit under it as sub-items.",
          hint: "Click “Signature of the patient…”, Shift+click “Date the form was signed”, and press Tab (or Home tab › Paragraph group › Increase Indent).",
          steps: [
            {
              action: { kind: "command", id: "home.indentInc" },
              requires: { selection: "p14,p15" },
              selectHint: "Select both lines first: click “Signature of the patient or legal guardian”, then Shift+click “Date the form was signed”.",
            },
          ],
        },
        {
          instruction: "Insert a Blank header that reads “Lakeside Medical Associates - Records Release Procedure”.",
          hint: "Insert tab › Header & Footer group › Header › Blank. Then click [Type here] in the header, type the text, and press Enter.",
          steps: [
            { action: { kind: "command", id: "insert.header", value: "Blank" } },
            { action: { kind: "type", target: "header", value: ["Lakeside Medical Associates - Records Release Procedure", "Lakeside Medical Associates · Records Release Procedure"] } },
          ],
        },
        {
          instruction: "The cover page should not show the header. Give the document a different first page.",
          hint: "With the header open: Header & Footer tab › Options group › check Different First Page.",
          steps: [
            {
              action: { kind: "command", id: "header.differentFirst" },
              requires: { selection: ["header", "footer"] },
              selectHint: "Double-click the header area first so the Header & Footer tab appears.",
            },
          ],
        },
        {
          instruction: "Add a page number to the bottom center of every page.",
          hint: "Header & Footer tab (or Insert tab) › Page Number › Bottom of Page › Plain Number 2.",
          steps: [{ action: { kind: "command", id: "insert.pageNumber", value: "Bottom of Page - Plain Number 2" } }],
        },
      ],
    },
  ],

  "module-1::word-essentials-capstone": [
    {
      id: "oa-word-m1-capstone-1",
      app: "word",
      title: "Format the records request to Dr. Yuen",
      scenario:
        "Your supervisor asked you to request James Whitfield's records from Dr. Patricia Yuen at Riverside Family Practice before his procedure. The draft has every part of a block-format letter, but it fails the practice's formatting checklist. Fix each item so the letter can go out on letterhead today.",
      fileName: "Records Request - Whitfield (draft).docx",
      minutes: 6,
      initial: {
        page: { margins: 'Custom (T 0.6" B 0.6" L 0.6" R 0.6")' },
        paragraphs: [
          { ...LETTERHEAD[0], font: "Cambria" },
          { ...LETTERHEAD[1], font: "Cambria" },
          { id: "p3", text: "10/20/26" },
          { id: "p4", font: "Cambria", spaceAfter: 0, text: "Dr. Patricia Yuen, MD" },
          { id: "p5", font: "Cambria", spaceAfter: 0, text: "Riverside Family Practice" },
          { id: "p6", font: "Cambria", spaceAfter: 0, text: "445 Riverside Ave, Suite 100" },
          { id: "p7", font: "Cambria", text: "Riverside, CA 91501" },
          { id: "p8", text: "Re: Patient James Whitfield - Medical Records Request" },
          { id: "p9", text: "Dear Dr. Yuen:" },
          { id: "p10", font: "Cambria", lineSpacing: 1.5, spaceAfter: 0, text: RECORDS_BODY_1 },
          {
            id: "p11",
            font: "Cambria",
            lineSpacing: 1.5,
            spaceAfter: 0,
            text: "To prepare for his procedure, please send his complete medical records from the past 24 months, including lab results, imaging reports, and a current medication list.",
          },
          { id: "p12", font: "Cambria", lineSpacing: 1.5, spaceAfter: 0, text: RECORDS_BODY_3 },
          { id: "p13", text: "Sincerely," },
          { id: "p14", spaceAfter: 0, text: "Maya Brooks" },
          { id: "p15", spaceAfter: 0, text: "Office Assistant" },
          { id: "p16", spaceAfter: 0, text: "Lakeside Medical Associates" },
          { id: "p17", text: "(555) 234-5678" },
        ],
      },
      tasks: [
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
          instruction: "The letter mixes Calibri and Cambria. Change the font of the entire letter to Calibri.",
          hint: "Press Ctrl+A to select the whole letter. Home tab › Font group › Font box › Calibri.",
          steps: [
            {
              action: { kind: "command", id: "home.fontName", value: "Calibri" },
              alt: [{ kind: "dialog", id: "font", values: { font: "Calibri" } }],
              requires: { selection: ["all", RECORDS_DRAFT_IDS.join(",")] },
              selectHint: "Select the entire letter first: press Ctrl+A (or Home tab › Editing group › Select › Select All).",
            },
          ],
        },
        {
          instruction: "Center the two letterhead lines at the top of the letter.",
          hint: "Click “Lakeside Medical Associates”, then Shift+click the address line below it. Home tab › Paragraph group › Center (or Ctrl+E).",
          steps: [
            {
              action: { kind: "command", id: "home.alignCenter" },
              alt: [{ kind: "dialog", id: "paragraph", values: { alignment: "Centered" } }],
              requires: { selection: "p1,p2" },
              selectHint: "Select both letterhead lines first: click the practice name, then Shift+click the address line.",
            },
          ],
        },
        {
          instruction: "Change the date “10/20/26” to the full written format, “October 20, 2026”.",
          hint: "Double-click the date line, type October 20, 2026, and press Enter.",
          steps: [{ action: { kind: "type", target: "p3", value: "October 20, 2026" } }],
        },
        {
          instruction: "Set the line spacing of the three body paragraphs to 1.0.",
          hint: "Click the paragraph that begins “I am the office assistant”, then Shift+click the one that begins “Please send the records”. Home tab › Line and Paragraph Spacing › 1.0 (or press Ctrl+1).",
          steps: [
            {
              action: { kind: "command", id: "home.lineSpacing", value: "1.0" },
              alt: [{ kind: "dialog", id: "paragraph", values: { lineSpacing: "Single" } }],
              requires: { selection: "p10,p11,p12" },
              selectHint: "Select the three body paragraphs first: click the first one, then Shift+click the third.",
            },
          ],
        },
        {
          instruction: "Add 12 pt of spacing after each of the three body paragraphs.",
          hint: "With the body paragraphs selected: Layout tab › Paragraph group › Spacing After › 12 (or Paragraph dialog › Spacing after: 12 pt).",
          steps: [
            {
              action: { kind: "command", id: "layout.spaceAfter", value: "12" },
              alt: [{ kind: "dialog", id: "paragraph", values: { spaceAfter: 12 } }],
              requires: { selection: "p10,p11,p12" },
              selectHint: "Select the three body paragraphs first: click the first one, then Shift+click the third.",
            },
          ],
        },
        {
          instruction: "Bold the subject line, “Re: Patient James Whitfield - Medical Records Request”.",
          hint: "Click the subject line. Home tab › Font group › Bold (or Ctrl+B).",
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              alt: [{ kind: "dialog", id: "font", values: { style: ["Bold", "Bold Italic"] } }],
              requires: { selection: "p8" },
              selectHint: "Click the subject line that begins “Re:” first.",
            },
          ],
        },
      ],
    },
    {
      id: "oa-word-m1-capstone-2",
      app: "word",
      title: "Proof, save, and send the records request",
      scenario:
        "The records request to Dr. Yuen is formatted. Before it leaves the office, finish the checklist: spelling, the recipient's name, and a page break that strands the signature on page 2. Then save the letter in both formats and print the office copy on the secure front desk printer.",
      fileName: "Records Request - Whitfield (draft).docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { ...LETTERHEAD[0], align: "center" },
          { ...LETTERHEAD[1], align: "center" },
          { id: "p3", text: "October 20, 2026" },
          { id: "p4", spaceAfter: 0, text: "Dr. Patricia Yeun, MD" },
          { id: "p5", spaceAfter: 0, text: "Riverside Family Practice" },
          { id: "p6", spaceAfter: 0, text: "445 Riverside Ave, Suite 100" },
          { id: "p7", text: "Riverside, CA 91501" },
          { id: "p8", bold: true, text: "Re: Patient James Whitfield - Medical Records Request" },
          { id: "p9", text: "Dear Dr. Yeun:" },
          { id: "p10", lineSpacing: 1, spaceAfter: 12, text: RECORDS_BODY_1 },
          {
            id: "p11",
            lineSpacing: 1,
            spaceAfter: 12,
            runs: [
              { text: "To prepare for his procedure, please send his complete medical " },
              { id: "r1", text: "reccords", misspelled: true, suggestions: ["records", "recorders", "recodes"] },
              { text: " from the past 24 months, including lab results, imaging reports, and a current medication list." },
            ],
          },
          { id: "p12", lineSpacing: 1, spaceAfter: 12, text: RECORDS_BODY_3 },
          { id: "p13", kind: "pageBreak" },
          { id: "p14", text: "Sincerely," },
          { id: "p15", spaceAfter: 0, text: "Maya Brooks" },
          { id: "p16", spaceAfter: 0, text: "Office Assistant" },
          { id: "p17", spaceAfter: 0, text: "Lakeside Medical Associates" },
          { id: "p18", text: "(555) 234-5678" },
        ],
      },
      tasks: [
        {
          instruction: "Check the spelling of the entire letter.",
          hint: "Review tab › Proofing group › Spelling & Grammar (or press F7). The Editor pane opens at the first misspelled word.",
          steps: [{ action: { kind: "command", id: "review.spelling" }, alt: [{ kind: "command", id: "home.editor" }] }],
        },
        {
          instruction: "Correct the misspelled word “reccords” to “records”.",
          hint: "In the Editor pane, click the suggestion records. (You can also right-click the word and choose records.)",
          steps: [
            {
              action: { kind: "command", id: "spelling.change", value: "records" },
              alt: [{ kind: "type", target: "p11.r1", value: "records" }],
              requires: { selection: "p11.r1" },
              selectHint: "Click the misspelled word “reccords” first.",
            },
          ],
        },
        {
          instruction: "The doctor's last name is misspelled “Yeun” in the inside address and in the greeting. Replace every “Yeun” in the letter with “Yuen”.",
          hint: "Home tab › Editing group › Replace (or Ctrl+H). Find what: Yeun. Replace with: Yuen. Replace All. Word should report 2 replacements.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Yeun", replace: "Yuen" } } }],
        },
        {
          instruction: "Print Preview shows “Sincerely,” and the signature block alone on page 2. Delete the manual page break above “Sincerely,”.",
          hint: "Home tab › Paragraph group › Show/Hide ¶ to see the break. Click the Page Break line just above “Sincerely,” and press Delete.",
          steps: [
            {
              action: { kind: "command", id: "edit.delete" },
              alt: [{ kind: "command", id: "home.cut" }],
              requires: { selection: "p13" },
              selectHint: "Turn on Show/Hide ¶ so the break shows, then click the Page Break line just above “Sincerely,”.",
            },
          ],
        },
        {
          instruction: "Save the letter to This PC as a Word document named “Records Request - Whitfield - Lakeside Medical”.",
          hint: "File tab › Save As (or F12) › This PC › type the file name › keep the file type Word Document (*.docx) › Save.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "file.saveAs",
                values: { location: "This PC", name: "Records Request - Whitfield - Lakeside Medical", format: "Word Document (*.docx)" },
              },
            },
          ],
        },
        {
          instruction: "Export the letter as a PDF named “Records Request - Whitfield - Lakeside Medical”.",
          hint: "File tab › Export › Create PDF/XPS Document › Create PDF/XPS. (Save As with the PDF file type works too.)",
          steps: [
            {
              action: { kind: "dialog", id: "file.exportPdf", values: { name: "Records Request - Whitfield - Lakeside Medical" } },
              alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Records Request - Whitfield - Lakeside Medical", format: "PDF (*.pdf)" } }],
            },
          ],
        },
        {
          instruction: "Print one copy of the letter for the office file on the secure Front Desk HP LaserJet.",
          hint: "File tab › Print (Ctrl+P) › Copies: 1 › Printer: Front Desk HP LaserJet › Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 1, printer: "Front Desk HP LaserJet" } } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  /* Module 2: Word Advanced                                           */
  /* ================================================================ */

  "module-2::mail-merge": [
    {
      id: "oa-word-m2-mail-merge-1",
      app: "word",
      title: "Send the flu shot appointment reminders",
      scenario:
        "Lakeside Medical Associates is mailing flu shot appointment reminders. Each letter needs the patient's first name, provider, appointment date, and time. Dr. Sarah Chen asked for her patients' reminders to go out today; the other providers' letters go out next week. Connect this one letter to the flu clinic sign-up list, let mail merge fill in the details, merge only Dr. Chen's patients, and check the results before anything prints.",
      fileName: "Flu Shot Reminder Letter.docx",
      minutes: 6,
      initial: {
        merge: {
          recipients: [
            { First_Name: "Angela", Last_Name: "Brooks", Address: "14 Maple Court", City: "Lakeside", State: "CA", ZIP: "90211", Appointment_Date: "November 2, 2026", Appointment_Time: "9:30 AM", Provider: "Dr. Ravi Patel" },
            { First_Name: "Luis", Last_Name: "Ortega", Address: "302 Cedar Street", City: "Lakeside", State: "CA", ZIP: "90210", Appointment_Date: "November 2, 2026", Appointment_Time: "11:00 AM", Provider: "Dr. Sarah Chen" },
            { First_Name: "Mei", Last_Name: "Tanaka", Address: "57 Harbor View Road", City: "Lakeside", State: "CA", ZIP: "90212", Appointment_Date: "November 3, 2026", Appointment_Time: "2:15 PM", Provider: "Dr. Femi Okafor" },
            { First_Name: "Robert", Last_Name: "Haynes", Address: "9 Orchard Lane", City: "Lakeside", State: "CA", ZIP: "90211", Appointment_Date: "November 4, 2026", Appointment_Time: "10:45 AM", Provider: "Dr. Sarah Chen" },
            { First_Name: "Nadia", Last_Name: "Nwosu", Address: "1200 Lakeview Drive, Apt 3", City: "Lakeside", State: "CA", ZIP: "90210", Appointment_Date: "November 5, 2026", Appointment_Time: "3:30 PM", Provider: "Dr. Ravi Patel" },
          ],
        },
        paragraphs: [
          { id: "p1", bold: true, size: 14, color: "#1F4E79", spaceAfter: 0, text: "Lakeside Medical Associates" },
          { id: "p2", size: 9, color: "#595959", text: "123 Lakeview Drive, Suite 200 · Lakeside, CA 90210 · (555) 234-5678" },
          { id: "p3", text: "October 20, 2026" },
          { id: "p4", runs: [{ text: "Dear " }, { id: "r1", text: "[First name]" }, { text: "," }] },
          {
            id: "p5",
            runs: [
              { text: "This letter is a reminder of your flu shot appointment with " },
              { id: "r1", text: "[provider]" },
              { text: " on " },
              { id: "r2", text: "[appointment date]" },
              { text: " at " },
              { id: "r3", text: "[appointment time]" },
              { text: "." },
            ],
          },
          { id: "p6", text: "Please arrive 10 minutes early and bring your insurance card. Free parking is available in the lot behind the building." },
          { id: "p7", text: "To confirm or reschedule, call our front desk at (555) 234-5678 by October 30, 2026." },
          { id: "p8", text: "Sincerely," },
          { id: "p9", text: "The Front Desk Team at Lakeside Medical Associates" },
        ],
      },
      tasks: [
        {
          instruction: "Start a Letters mail merge.",
          hint: "Mailings tab › Start Mail Merge group › Start Mail Merge › Letters.",
          steps: [{ action: { kind: "command", id: "mail.start", value: "Letters" } }],
        },
        {
          instruction: "Use the existing list “Flu Clinic Signups.xlsx” as the recipient list.",
          hint: "Mailings tab › Select Recipients › Use an Existing List… › Flu Clinic Signups.xlsx › Open.",
          steps: [{ action: { kind: "dialog", id: "selectRecipients", values: { file: "Flu Clinic Signups.xlsx" } } }],
        },
        {
          instruction: "Replace “[First name]” in the greeting with the First_Name merge field.",
          hint: "Click “[First name]”. Mailings tab › Write & Insert Fields group › Insert Merge Field › First_Name.",
          steps: [
            {
              action: { kind: "command", id: "mail.insertField", value: "First_Name" },
              requires: { selection: "p4.r1" },
              selectHint: "Click “[First name]” in the greeting first.",
            },
          ],
        },
        {
          instruction: "Replace “[provider]” with the Provider merge field.",
          hint: "Click “[provider]”. Mailings tab › Insert Merge Field › Provider.",
          steps: [
            {
              action: { kind: "command", id: "mail.insertField", value: "Provider" },
              requires: { selection: "p5.r1" },
              selectHint: "Click “[provider]” first.",
            },
          ],
        },
        {
          instruction: "Replace “[appointment date]” with the Appointment_Date merge field and “[appointment time]” with the Appointment_Time merge field.",
          hint: "Click “[appointment date]”, then Mailings tab › Insert Merge Field › Appointment_Date. Then click “[appointment time]” and insert Appointment_Time.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "mail.insertField", value: "Appointment_Date" },
              requires: { selection: "p5.r2" },
              selectHint: "Click “[appointment date]” before you insert the Appointment_Date field.",
            },
            {
              action: { kind: "command", id: "mail.insertField", value: "Appointment_Time" },
              requires: { selection: "p5.r3" },
              selectHint: "Click “[appointment time]” before you insert the Appointment_Time field.",
            },
          ],
        },
        {
          instruction: "Filter the recipient list so the merge includes only Dr. Sarah Chen's patients: the records whose Provider is “Dr. Sarah Chen”.",
          hint: "Mailings tab › Start Mail Merge group › Edit Recipient List › Filter Records tab › Field: Provider › Comparison: Equal to › Compare to: Dr. Sarah Chen › OK. (Clearing the checkboxes of the other patients on the Recipients tab works too.)",
          steps: [
            {
              action: { kind: "dialog", id: "editRecipients", values: { filterField: "Provider", filterOp: "Equal to", filterValue: "Dr. Sarah Chen" } },
              alt: [
                { kind: "dialog", id: "editRecipients", values: { filterField: "Provider", filterOp: "Contains", filterValue: ["Chen", "Sarah Chen", "Dr. Sarah Chen"] } },
                { kind: "dialog", id: "editRecipients", values: { r1: false, r2: true, r3: false, r4: true, r5: false } },
              ],
            },
          ],
        },
        {
          instruction: "Preview the merged letters, then move to the next recipient to check Dr. Chen's second patient.",
          hint: "Mailings tab › Preview Results group › Preview Results, then Next Record. The status bar shows Record 1 of 2.",
          steps: [{ action: { kind: "command", id: "mail.preview" } }, { action: { kind: "command", id: "mail.next" } }],
        },
        {
          instruction: "Finish the merge by creating the individual letters as a new document that you can spot-check before printing.",
          hint: "Mailings tab › Finish group › Finish & Merge › Edit Individual Documents…",
          steps: [{ action: { kind: "command", id: "mail.finish", value: "Edit Individual Documents..." } }],
        },
      ],
    },
  ],

  "module-2::headers-footers-references": [
    {
      id: "oa-word-m2-references-1",
      app: "word",
      title: "Finish the front desk operations manual",
      scenario:
        "The front desk operations manual is written. Before Renee Alvarez gives it to new staff, it needs the practice name on every page except the cover, page numbers, an automatic table of contents that stays current, and a footnote that cites the privacy rule behind one of the procedures.",
      fileName: "Front Desk Operations Manual.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Front Desk Operations Manual" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · October 2026" },
          { id: "p3", kind: "pageBreak" },
          { id: "p4", text: "" },
          { id: "p5", kind: "pageBreak" },
          { id: "p6", style: "Heading 1", text: "Patient Check-In Procedures" },
          { id: "p7", text: "Greet each patient within 30 seconds of arrival, confirm their name and date of birth, and check that their address and insurance are current." },
          { id: "p8", style: "Heading 2", text: "Verifying Insurance" },
          { id: "p9", text: "Verify coverage in the practice management system before the patient is roomed. If coverage is inactive, ask the patient to speak with billing." },
          { id: "p10", style: "Heading 1", text: "Phone Calls" },
          { id: "p11", text: "Answer by the third ring with the practice name and your first name. Never leave test results or a diagnosis in a voicemail." },
          { id: "p12", style: "Heading 1", text: "Records Management" },
          {
            id: "p13",
            runs: [{ text: "Log every records request on the day it arrives. " }, { id: "r1", text: "Release only the minimum information needed for the purpose of the request." }],
          },
          { id: "p14", style: "Heading 2", text: "Storing Paper Records" },
          { id: "p15", text: "Paper records stay in the locked records room. Return any chart you take out before the end of your shift." },
          { id: "p16", style: "Heading 1", text: "Appointment Scheduling" },
          { id: "p17", text: "Book new patients for 40 minutes and returning patients for 20 minutes. Leave two open slots each afternoon for same-day sick visits." },
        ],
      },
      tasks: [
        {
          instruction: "Insert a Blank header that reads “Lakeside Medical Associates - Front Desk Operations Manual”.",
          hint: "Insert tab › Header & Footer group › Header › Blank. Then click [Type here] in the header, type the text, and press Enter.",
          steps: [
            { action: { kind: "command", id: "insert.header", value: "Blank" } },
            { action: { kind: "type", target: "header", value: ["Lakeside Medical Associates - Front Desk Operations Manual", "Lakeside Medical Associates · Front Desk Operations Manual"] } },
          ],
        },
        {
          instruction: "Keep the header off the cover page by giving the manual a different first page.",
          hint: "With the header open: Header & Footer tab › Options group › check Different First Page.",
          steps: [
            {
              action: { kind: "command", id: "header.differentFirst" },
              requires: { selection: ["header", "footer"] },
              selectHint: "Double-click the header area first so the Header & Footer tab appears.",
            },
          ],
        },
        {
          instruction: "Add page numbers in the format “Page 1 of 3” to the bottom center of every page.",
          hint: "Header & Footer tab (or Insert tab) › Page Number › Bottom of Page › Page X of Y, Bold Numbers 2.",
          steps: [{ action: { kind: "command", id: "insert.pageNumber", value: "Bottom of Page - Bold Numbers 2" } }],
        },
        {
          instruction: "In the empty line on page 2, insert a custom table of contents that shows two heading levels, with right-aligned page numbers and dot leaders.",
          hint: "Click the empty line on page 2, right after the cover page. References tab › Table of Contents › Custom Table of Contents… › keep Show page numbers, Right align page numbers and the dotted Tab leader › Show levels: 2 › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "customToc", values: { levels: 2, pageNumbers: true, rightAlign: true, leader: "......." } },
              requires: { selection: "p4" },
              selectHint: "Click the empty line on page 2 first, so the table of contents goes there.",
            },
          ],
        },
        {
          instruction: "Insert a footnote at the end of the sentence “Release only the minimum information needed for the purpose of the request.” In the footnote, type “45 CFR 164.502(b), the HIPAA minimum necessary standard.”",
          hint: "Click the sentence. References tab › Footnotes group › Insert Footnote (or press Alt+Ctrl+F). Word puts the cursor in the new footnote at the bottom of the page: type the citation and press Enter.",
          steps: [
            {
              action: { kind: "command", id: "references.footnote" },
              requires: { selection: ["p13.r1", "p13"] },
              selectHint: "Click the sentence that begins “Release only the minimum information” first.",
            },
            {
              action: {
                kind: "type",
                target: "footnote:1",
                value: [
                  "45 CFR 164.502(b), the HIPAA minimum necessary standard.",
                  "45 CFR 164.502(b), the HIPAA minimum necessary standard",
                  "45 CFR § 164.502(b), the HIPAA minimum necessary standard.",
                  "45 CFR § 164.502(b), the HIPAA minimum necessary standard",
                ],
              },
            },
          ],
        },
        {
          instruction: "Rename the heading “Phone Calls” to “Telephone Communication Standards”.",
          hint: "Double-click the heading “Phone Calls”, type Telephone Communication Standards, and press Enter.",
          steps: [{ action: { kind: "type", target: "p10", value: "Telephone Communication Standards" } }],
        },
        {
          instruction: "Update the entire table of contents so it shows the new heading.",
          hint: "Click the table of contents. References tab › Table of Contents group › Update Table › Update entire table › OK. (Right-click › Update Field, or F9, works too.)",
          steps: [
            {
              action: { kind: "dialog", id: "updateToc", values: { mode: "Update entire table" } },
              alt: [{ kind: "command", id: "references.updateToc" }],
            },
          ],
        },
      ],
    },
  ],

  "module-2::track-changes-review": [
    {
      id: "oa-word-m2-track-changes-1",
      app: "word",
      title: "Review the patient confidentiality policy",
      scenario:
        "Renee Alvarez sent her draft of the patient confidentiality policy to the office manager and to Victor Osei, the compliance officer. Both tracked their edits. Make your own two edits with tracking on, then act as the document owner: decide each change and finalize the rest.",
      fileName: "Patient Confidentiality Policy - Draft 2.docx",
      minutes: 6,
      initial: {
        markup: "simple",
        paragraphs: [
          { id: "p1", style: "Title", text: "Patient Confidentiality Policy" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Draft 2, reviewed by the office manager and the compliance officer" },
          { id: "p3", style: "Heading 1", text: "Conversations" },
          {
            id: "p4",
            runs: [
              { text: "Discuss patient information only in a private area" },
              { text: ", such as an exam room or the records office", ins: true },
              { text: ". Lower your voice at the front desk, and never discuss a patient in the waiting room or the break room." },
            ],
          },
          { id: "p5", style: "Heading 1", text: "Records Requests" },
          {
            id: "p6",
            runs: [{ text: "Patients receive copies of their records within " }, { text: "30", del: true }, { text: "60", ins: true }, { text: " days of a written request." }],
          },
          { id: "p7", style: "Heading 1", text: "Screens and Computers" },
          {
            id: "p8",
            runs: [
              { text: "Lock your computer whenever you leave your workstation for more than " },
              { id: "r1", text: "five" },
              { text: " minutes. Never share your password, even with a coworker." },
            ],
          },
          { id: "p9", style: "Heading 1", text: "Disposal" },
          {
            id: "p10",
            runs: [
              { text: "Shred any paper with patient information in the locked shred bin." },
              { id: "r1", text: " Envelopes that show only a patient's name may go in the recycling bin." },
            ],
          },
          { id: "p11", style: "Heading 1", text: "Questions" },
          {
            id: "p12",
            runs: [
              { text: "Questions about this policy go to the " },
              { text: "practice manager", del: true },
              { text: "compliance officer", ins: true },
              { text: ", Victor Osei, at extension 215." },
            ],
          },
        ],
      },
      tasks: [
        {
          instruction: "Display all of the reviewers' markup so you can see every change.",
          hint: "Review tab › Tracking group › Display for Review box › All Markup.",
          steps: [{ action: { kind: "command", id: "review.markup", value: "All Markup" } }],
        },
        {
          instruction: "Turn on Track Changes so your own edits are recorded.",
          hint: "Review tab › Tracking group › Track Changes (or press Ctrl+Shift+E).",
          steps: [{ action: { kind: "command", id: "review.trackChanges" } }],
        },
        {
          instruction: "In the Screens and Computers section, change “five” to “two”.",
          hint: "Double-click the word “five”, type two, and press Enter. Word marks the old word as deleted and the new word as inserted.",
          steps: [{ action: { kind: "type", target: "p8.r1", value: "two" } }],
        },
        {
          instruction: "In the Disposal section, delete the sentence “Envelopes that show only a patient's name may go in the recycling bin.”",
          hint: "Click the sentence and press Delete. With Track Changes on, Word strikes it through instead of removing it.",
          steps: [
            {
              action: { kind: "command", id: "edit.delete" },
              requires: { selection: "p10.r1" },
              selectHint: "Click just the sentence that begins “Envelopes that show only” first.",
            },
          ],
        },
        {
          instruction: "Your edits are done. Turn off Track Changes before you decide on the reviewers' changes.",
          hint: "Review tab › Tracking group › Track Changes (or press Ctrl+Shift+E) so the button is no longer highlighted.",
          steps: [{ action: { kind: "command", id: "review.trackChanges" } }],
        },
        {
          instruction: "Accept the inserted phrase “, such as an exam room or the records office” in the Conversations section.",
          hint: "Click in the paragraph that begins “Discuss patient information”. Review tab › Changes group › Accept arrow › Accept This Change.",
          steps: [
            {
              action: { kind: "command", id: "review.accept", value: ["Accept This Change", "Accept and Move to Next"] },
              requires: { selection: "p4" },
              selectHint: "Click in the paragraph that begins “Discuss patient information” first.",
            },
          ],
        },
        {
          instruction: "Reject the change from “30” to “60” days in the Records Requests section. Practice policy is to answer records requests within 30 days.",
          hint: "Click in the paragraph that begins “Patients receive copies”. Review tab › Changes group › Reject arrow › Reject Change.",
          steps: [
            {
              action: { kind: "command", id: "review.reject", value: ["Reject Change", "Reject and Move to Next"] },
              requires: { selection: "p6" },
              selectHint: "Click in the paragraph that begins “Patients receive copies” first.",
            },
          ],
        },
        {
          instruction: "Accept all of the remaining changes in the policy.",
          hint: "Review tab › Changes group › Accept arrow › Accept All Changes.",
          steps: [{ action: { kind: "command", id: "review.accept", value: ["Accept All Changes", "Accept All Changes and Stop Tracking"] } }],
        },
      ],
    },
    {
      id: "oa-word-m2-comments-1",
      app: "word",
      title: "Comment on and finalize the privacy notice",
      scenario:
        "Renee Alvarez and Victor Osei, the compliance officer, left comments on the draft Notice of Privacy Practices. Add your own question, answer and close out theirs, compare the notice with a copy someone edited without tracking, and then prepare the clean version that will be posted for patients.",
      fileName: "Notice of Privacy Practices - Draft 3.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Notice of Privacy Practices" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Draft 3" },
          { id: "p3", style: "Heading 1", text: "How We Use Your Information" },
          {
            id: "p4",
            text: "We use your health information to treat you, to bill for your care, and to run our practice.",
            comment: { author: "Renee Alvarez", text: "Should we give patients an example of what “run our practice” means?" },
          },
          { id: "p5", style: "Heading 1", text: "Your Rights" },
          {
            id: "p6",
            text: "You may ask for a copy of your records, ask us to correct them, and ask for a list of the people and organizations we have shared them with.",
            comment: { author: "Victor Osei", text: "Added the right to a list of disclosures, as we discussed. Done." },
          },
          { id: "p7", style: "Heading 1", text: "Contact Us" },
          { id: "p8", runs: [{ text: "Questions about this notice go to our privacy officer at " }, { id: "r1", text: "(555) 234-5678" }, { text: "." }] },
        ],
      },
      tasks: [
        {
          instruction: "Add a comment to the phone number “(555) 234-5678” that says “Is this the privacy officer's direct line or the main number?”",
          hint: "Click the phone number. Review tab › Comments group › New Comment (or Ctrl+Alt+M) › type the comment › Post.",
          steps: [
            {
              action: { kind: "dialog", id: "newComment", values: { text: "Is this the privacy officer's direct line or the main number?" } },
              requires: { selection: ["p8.r1", "p8"] },
              selectHint: "Click the phone number in the Contact Us section first.",
            },
          ],
        },
        {
          instruction: "Reply to Renee Alvarez's comment with “Yes. I will add two examples in Draft 4.”",
          hint: "Click Renee Alvarez's comment card in the margin, type the reply in its Reply box, and press Enter.",
          steps: [
            {
              action: { kind: "command", id: "comment.reply", value: "Yes. I will add two examples in Draft 4." },
              requires: { selection: "p4" },
              selectHint: "Click Renee Alvarez's comment about “run our practice” first.",
            },
          ],
        },
        {
          instruction: "Mark Victor Osei's comment about the list of disclosures as resolved.",
          hint: "Click Victor Osei's comment. Review tab › Comments group › Resolve (or the comment's ⋯ menu › Resolve thread).",
          steps: [
            {
              action: { kind: "command", id: "review.resolveComment" },
              requires: { selection: "p6" },
              selectHint: "Click Victor Osei's comment first.",
            },
          ],
        },
        {
          instruction: "A coworker edited an older copy of the notice without turning on Track Changes. Compare the original notice with the revised copy to see what changed.",
          hint: "Review tab › Compare group › Compare › Compare… (In Word you then choose the original and the revised document and click OK.)",
          steps: [{ action: { kind: "command", id: "review.compare", value: "Compare..." } }],
        },
        {
          instruction: "The notice is final. Delete every comment in the document.",
          hint: "Review tab › Comments group › Delete arrow › Delete All Comments in Document.",
          steps: [{ action: { kind: "command", id: "review.deleteComment", value: "Delete All Comments in Document" } }],
        },
        {
          instruction: "Inspect the notice for hidden information, such as reviewer names, before it is posted.",
          hint: "File tab › Info › Inspect Document (Check for Issues) › Inspect Document.",
          steps: [{ action: { kind: "command", id: "file.inspect", value: "Inspect Document" } }],
        },
        {
          instruction: "Protect the notice so that staff who open it from the shared drive can read it but can't change it by accident.",
          hint: "Review tab › Protect group › Restrict Editing (File tab › Info › Protect Document › Restrict Editing works too). In the pane, check Allow only this type of editing in the document, choose No changes (Read only), click Yes, Start Enforcing Protection, and click OK. A password is optional.",
          steps: [
            {
              action: { kind: "command", id: "review.restrict" },
              alt: [{ kind: "command", id: "file.protect", value: "Restrict Editing" }],
            },
            { action: { kind: "command", id: "review.enforce", value: "No changes (Read only)" } },
          ],
        },
      ],
    },
  ],

  "module-2::templates-automation": [
    {
      id: "oa-word-m2-templates-1",
      app: "word",
      title: "Build the practice fax cover sheet template",
      scenario:
        "The front desk faxes insurers and specialists every day, and each person builds the cover sheet differently. Start from Word's fax cover sheet, fill in what is the same on every fax, add the practice's saved confidentiality notice, turn the recipient lines into form fields, and protect and save it as a template so no one can overwrite it by accident.",
      fileName: "Document1.docx",
      minutes: 7,
      initial: {
        paragraphs: [{ id: "p1", text: "" }],
        // Building blocks saved in Word's Normal template, offered by Insert › Quick Parts › AutoText.
        autoText: [
          {
            name: "Fax Confidentiality Notice",
            gallery: "AutoText",
            paras: [{ id: "at1", italic: true, size: 9, text: FAX_NOTICE }],
          },
          { name: "Lakeside Address", gallery: "AutoText", text: "123 Lakeview Drive, Suite 200, Lakeside, CA 90210" },
        ],
      } as XDoc,
      tasks: [
        {
          instruction: "Create a new document from the Fax cover sheet template.",
          hint: "File tab › New › Fax cover sheet.",
          steps: [
            {
              action: { kind: "command", id: "file.new", value: "Fax cover sheet" },
              effects: [
                { op: "set", path: "paragraphs", value: FAX_TEMPLATE },
                { op: "set", path: "saved", value: { name: "Document2.docx" } },
              ],
            },
          ],
        },
        {
          instruction: "Replace “[Company Name]” with “Lakeside Medical Associates”, “[Phone]” with “(555) 234-5678”, and “[Fax]” with “(555) 234-5679”.",
          hint: "Double-click each placeholder, type the new text, and press Enter.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "p2.r1", value: "Lakeside Medical Associates" } },
            { action: { kind: "type", target: "p3.r1", value: "(555) 234-5678" } },
            { action: { kind: "type", target: "p3.r2", value: "(555) 234-5679" } },
          ],
        },
        {
          instruction: "After “Date:”, insert today's date in the format “October 20, 2026”, set to update automatically so each fax shows the day it is sent.",
          hint: "Click the “Date:” line. Insert tab › Text group › Date & Time › October 20, 2026 › check Update automatically › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "dateTime", values: { format: "October 20, 2026", update: true } },
              requires: { selection: "p4" },
              selectHint: "Click the “Date:” line first, so the date goes there.",
            },
          ],
        },
        {
          instruction: "Below the “[Comments]” placeholder, insert the practice's saved AutoText entry “Fax Confidentiality Notice”.",
          hint: "Click “[Comments]”. Insert tab › Text group › Quick Parts › AutoText › Fax Confidentiality Notice › Insert.",
          steps: [
            {
              action: { kind: "dialog", id: "autoText", values: { entry: "Fax Confidentiality Notice" } },
              requires: { selection: ["p10.r1", "p10"] },
              selectHint: "Click the “[Comments]” placeholder first, so the notice goes below it.",
            },
          ],
        },
        {
          instruction: "Turn the “[Recipient Name]” and “[Recipient Fax]” placeholders into plain text content controls, so staff can fill them in once the form is protected.",
          hint: "Click “[Recipient Name]”. Developer tab › Controls group › Plain Text Content Control. Do the same for “[Recipient Fax]”. (In Word, turn the Developer tab on first: File › Options › Customize Ribbon › check Developer.)",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "developer.plainText" },
              requires: { selection: "p5.r1" },
              selectHint: "Click the “[Recipient Name]” placeholder first, then insert the control.",
            },
            {
              action: { kind: "command", id: "developer.plainText" },
              requires: { selection: "p6.r1" },
              selectHint: "Click the “[Recipient Fax]” placeholder first, then insert the control.",
            },
          ],
        },
        {
          instruction: "Protect the cover sheet so that staff can only fill in its form fields. Don't set a password.",
          hint: "Review tab › Protect group › Restrict Editing (Developer tab › Restrict Editing works too). In the pane, check Allow only this type of editing in the document, choose Filling in forms, click Yes, Start Enforcing Protection, leave both password boxes blank, and click OK.",
          steps: [
            { action: { kind: "command", id: "review.restrict" }, alt: [{ kind: "command", id: "file.protect", value: "Restrict Editing" }] },
            { action: { kind: "command", id: "review.enforce", value: "Filling in forms" } },
          ],
        },
        {
          instruction: "Save the cover sheet as a Word Template named “Lakeside Fax Cover Sheet”.",
          hint: "File tab › Save As › This PC › File name: Lakeside Fax Cover Sheet › File type: Word Template (*.dotx) › Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Lakeside Fax Cover Sheet", format: "Word Template (*.dotx)" } } }],
        },
        {
          instruction: "Open the Proofing settings in Word Options, where you set up AutoCorrect shortcuts such as “lma” for Lakeside Medical Associates.",
          hint: "File tab › Options › Proofing. (In Word, click AutoCorrect Options… on that page to add an entry.)",
          steps: [{ action: { kind: "command", id: "file.options", value: "Proofing" } }],
        },
      ],
    },
  ],

  "module-2::word-advanced-capstone": [
    {
      id: "oa-word-m2-capstone-1",
      app: "word",
      title: "Review the fall newsletter draft",
      scenario:
        "The fall issue of Patient Health Quarterly came back from Renee Alvarez with tracked changes and a comment. Set up the headings and the contents list, act on each of her changes, answer her question, and make sure the contents list matches the final headings.",
      fileName: "Patient Health Quarterly - Fall 2026 (draft).docx",
      minutes: 7,
      initial: {
        paragraphs: [
          {
            id: "p1",
            bold: true,
            size: 24,
            color: "#1F4E79",
            spaceAfter: 0,
            runs: [{ text: "Patient Health Quarterly" }, { text: " · Fall 2026 · Volume 3", ins: true }],
          },
          { id: "p2", size: 10, color: "#595959", text: "Lakeside Medical Associates · 123 Lakeview Drive, Lakeside, CA 90210 · (555) 234-5678" },
          { id: "p3", runs: [{ text: "Dear " }, { id: "r1", text: "[First name]" }, { text: "," }] },
          { id: "p4", text: "" },
          { id: "p5", bold: true, size: 14, text: "Flu Season Reminders" },
          {
            id: "p6",
            text: NEWSLETTER_FLU,
            comment: { author: "Renee Alvarez", text: "Has a provider approved this clinical content? We can't send health advice without that." },
          },
          {
            id: "p7",
            bold: true,
            size: 14,
            runs: [{ text: "Winter Office Hours", del: true }, { text: "Holiday Office Hours", ins: true }],
          },
          {
            id: "p8",
            runs: [
              { text: "Starting November 2, we are open Monday through Friday, 8:00 AM to 6:00 PM, and Saturday, 9:00 AM to 1:00 PM." },
              { text: " We will close at 2:00 PM on December 24 and December 31.", ins: true },
            ],
          },
          { id: "p9", bold: true, size: 14, text: "Winter Wellness Tip" },
          {
            id: "p10",
            runs: [
              { text: "Dress in layers, wash your hands often" },
              { text: " for at least 20 seconds", ins: true },
              { text: ", and stay home when you are sick. Call us before you visit if you have a fever." },
            ],
          },
          { id: "p11", italic: true, text: "Questions? Call the front desk at (555) 234-5678." },
        ],
      },
      tasks: [
        {
          instruction: "Apply the Heading 1 style to the three article titles: “Flu Season Reminders”, the office hours title, and “Winter Wellness Tip”.",
          hint: "Click each article title, then Home tab › Styles gallery › Heading 1 (or press Ctrl+Alt+1).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p5" }, selectHint: "Click “Flu Season Reminders”, then apply Heading 1." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p7" }, selectHint: "Click the office hours title, then apply Heading 1." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p9" }, selectHint: "Click “Winter Wellness Tip”, then apply Heading 1." },
          ],
        },
        {
          instruction: "In the empty line below the greeting, insert the Automatic Table 1 table of contents.",
          hint: "Click the empty line under “Dear [First name],”. References tab › Table of Contents group › Table of Contents › Automatic Table 1.",
          steps: [
            {
              action: { kind: "command", id: "references.toc", value: "Automatic Table 1" },
              requires: { selection: "p4" },
              selectHint: "Click the empty line just below the greeting first.",
            },
          ],
        },
        {
          instruction: "Accept Renee's change to the newsletter title at the top of the page.",
          hint: "Click the title “Patient Health Quarterly”. Review tab › Changes group › Accept arrow › Accept This Change.",
          steps: [
            {
              action: { kind: "command", id: "review.accept", value: ["Accept This Change", "Accept and Move to Next"] },
              requires: { selection: "p1" },
              selectHint: "Click the newsletter title at the top of the page first.",
            },
          ],
        },
        {
          instruction: "Reject Renee's change to the office hours title. The article covers all of the winter hours, not just the holidays.",
          hint: "Click the office hours title. Review tab › Changes group › Reject arrow › Reject Change.",
          steps: [
            {
              action: { kind: "command", id: "review.reject", value: ["Reject Change", "Reject and Move to Next"] },
              requires: { selection: "p7" },
              selectHint: "Click the office hours article title first.",
            },
          ],
        },
        {
          instruction: "Reply to Renee's comment on the flu article with “Yes. Dr. Sarah Chen approved this article on October 19.”",
          hint: "Click Renee's comment card in the margin, type the reply in its Reply box, and press Enter.",
          steps: [
            {
              action: { kind: "command", id: "comment.reply", value: "Yes. Dr. Sarah Chen approved this article on October 19." },
              requires: { selection: "p6" },
              selectHint: "Click Renee's comment about provider approval first.",
            },
          ],
        },
        {
          instruction: "Accept all of the remaining changes in the newsletter.",
          hint: "Review tab › Changes group › Accept arrow › Accept All Changes.",
          steps: [{ action: { kind: "command", id: "review.accept", value: ["Accept All Changes", "Accept All Changes and Stop Tracking"] } }],
        },
        {
          instruction: "The table of contents still shows the rejected title. Update the entire table of contents.",
          hint: "Click the table of contents. References tab › Table of Contents group › Update Table › Update entire table › OK. (Right-click › Update Field, or F9, works too.)",
          steps: [
            {
              action: { kind: "dialog", id: "updateToc", values: { mode: "Update entire table" } },
              alt: [{ kind: "command", id: "references.updateToc" }],
            },
          ],
        },
      ],
    },
    {
      id: "oa-word-m2-capstone-2",
      app: "word",
      title: "Merge and deliver the fall newsletter",
      scenario:
        "The fall newsletter is approved. Lay the articles out in newsletter columns, personalize the greeting for each patient with mail merge, check the results, and deliver a PDF. Then save the layout as a template for the winter issue.",
      fileName: "Patient Health Quarterly - Fall 2026.docx",
      minutes: 7,
      initial: {
        merge: {
          recipients: [
            { First_Name: "Carmen", Last_Name: "Delgado", Address: "41 Birch Street", City: "Lakeside", State: "CA", ZIP: "90210" },
            { First_Name: "Samuel", Last_Name: "Price", Address: "780 Shoreline Drive", City: "Lakeside", State: "CA", ZIP: "90211" },
            { First_Name: "Hana", Last_Name: "Kim", Address: "16 Juniper Way", City: "Lakeside", State: "CA", ZIP: "90212" },
            { First_Name: "Oscar", Last_Name: "Bennett", Address: "233 Pine Avenue, Apt 2B", City: "Lakeside", State: "CA", ZIP: "90210" },
            { First_Name: "Tamara", Last_Name: "Wells", Address: "5 Lighthouse Road", City: "Lakeside", State: "CA", ZIP: "90211" },
          ],
        },
        paragraphs: [
          { id: "p1", bold: true, size: 24, color: "#1F4E79", spaceAfter: 0, text: "Patient Health Quarterly · Fall 2026 · Volume 3" },
          { id: "p2", size: 10, color: "#595959", text: "Lakeside Medical Associates · 123 Lakeview Drive, Lakeside, CA 90210 · (555) 234-5678" },
          { id: "p3", runs: [{ text: "Dear " }, { id: "r1", text: "[First name]" }, { text: "," }] },
          {
            id: "toc1",
            kind: "toc",
            text: "Automatic Table 1",
            entries: [
              { id: "p5", text: "Flu Season Reminders", level: 1 },
              { id: "p7", text: "Winter Office Hours", level: 1 },
              { id: "p9", text: "Winter Wellness Tip", level: 1 },
            ],
          } as WordPara,
          { id: "p5", style: "Heading 1", text: "Flu Season Reminders" },
          { id: "p6", text: NEWSLETTER_FLU },
          { id: "p7", style: "Heading 1", text: "Winter Office Hours" },
          { id: "p8", text: NEWSLETTER_HOURS },
          { id: "p9", style: "Heading 1", text: "Winter Wellness Tip" },
          { id: "p10", text: NEWSLETTER_WELLNESS },
          { id: "p11", italic: true, text: "Questions? Call the front desk at (555) 234-5678." },
        ],
      },
      tasks: [
        {
          instruction: "Format the three articles, from “Flu Season Reminders” through the paragraph that begins “Dress in layers”, in two columns.",
          hint: "Click “Flu Season Reminders”, then Shift+click the paragraph that begins “Dress in layers”. Layout tab › Page Setup group › Columns › Two. Word adds section breaks around the selection.",
          steps: [
            {
              action: { kind: "command", id: "layout.columns", value: "Two" },
              requires: { selection: "p5,p6,p7,p8,p9,p10" },
              selectHint: "Select all three articles first: click “Flu Season Reminders”, then Shift+click the paragraph that begins “Dress in layers”.",
            },
          ],
        },
        {
          instruction: "Start a Letters mail merge.",
          hint: "Mailings tab › Start Mail Merge group › Start Mail Merge › Letters.",
          steps: [{ action: { kind: "command", id: "mail.start", value: "Letters" } }],
        },
        {
          instruction: "Use the existing list “Patient Reminder List.xlsx” as the recipient list.",
          hint: "Mailings tab › Select Recipients › Use an Existing List… › Patient Reminder List.xlsx › Open.",
          steps: [{ action: { kind: "dialog", id: "selectRecipients", values: { file: "Patient Reminder List.xlsx" } } }],
        },
        {
          instruction: "Replace “[First name]” in the greeting with the First_Name merge field.",
          hint: "Click “[First name]”. Mailings tab › Write & Insert Fields group › Insert Merge Field › First_Name.",
          steps: [
            {
              action: { kind: "command", id: "mail.insertField", value: "First_Name" },
              requires: { selection: "p3.r1" },
              selectHint: "Click “[First name]” in the greeting first.",
            },
          ],
        },
        {
          instruction: "Preview the merged newsletter, then move to the next recipient to check a second greeting.",
          hint: "Mailings tab › Preview Results group › Preview Results, then Next Record.",
          steps: [{ action: { kind: "command", id: "mail.preview" } }, { action: { kind: "command", id: "mail.next" } }],
        },
        {
          instruction: "Finish the merge by creating the individual newsletters as a new document.",
          hint: "Mailings tab › Finish group › Finish & Merge › Edit Individual Documents…",
          steps: [{ action: { kind: "command", id: "mail.finish", value: "Edit Individual Documents..." } }],
        },
        {
          instruction: "Export the newsletter as a PDF named “Patient Newsletter - Fall 2026 - Lakeside Medical”.",
          hint: "File tab › Export › Create PDF/XPS Document › type the file name › Create PDF/XPS. (Save As with the PDF file type works too.)",
          steps: [
            {
              action: { kind: "dialog", id: "file.exportPdf", values: { name: "Patient Newsletter - Fall 2026 - Lakeside Medical" } },
              alt: [{ kind: "dialog", id: "file.saveAs", values: { name: "Patient Newsletter - Fall 2026 - Lakeside Medical", format: "PDF (*.pdf)" } }],
            },
          ],
        },
        {
          instruction: "Save the newsletter as a Word Template named “Patient Health Quarterly Template” for next quarter.",
          hint: "File tab › Save As › This PC › File name: Patient Health Quarterly Template › File type: Word Template (*.dotx) › Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { name: "Patient Health Quarterly Template", format: "Word Template (*.dotx)" } } }],
        },
      ],
    },
  ],
};
