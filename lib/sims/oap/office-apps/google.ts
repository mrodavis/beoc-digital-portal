import type { SimDefinition, WordPara } from "@/types/sim";
import { googleDoc, type GPerson, type GRun } from "@/components/sim/apps/google/types";

/**
 * office-apps sims that run in the Google Workspace engine. Keys are "<moduleSlug>::<lessonSlug>".
 *
 * Module 7 (Google Docs, Sheets and Slides). Set at Lakeside Medical
 * Associates, with Renee Alvarez as the practice manager. All people and
 * addresses are fictional.
 */

const ORG = { name: "Lakeside Medical Associates", domain: "lakesidemedical.example" };
const PEOPLE: GPerson[] = [
  { name: "Renee Alvarez", email: "ralvarez@lakesidemedical.example", color: "#188038" },
  { name: "Dana Price", email: "dprice@lakesidemedical.example", color: "#e8710a" },
  { name: "Luis Ortega", email: "lortega@lakesidemedical.example", color: "#9334e6" },
  { name: "Tasha Morales", email: "tmorales@lakesidemedical.example", color: "#d93025" },
];
const TEAM_EDITORS = [
  { email: "ralvarez@lakesidemedical.example", role: "Editor" as const },
  { email: "dprice@lakesidemedical.example", role: "Editor" as const },
  { email: "lortega@lakesidemedical.example", role: "Editor" as const },
];

/* ---------- Google Docs: the new patient welcome letter ---------- */

const LETTER_INTRO = "Thank you for choosing Lakeside Medical Associates for your care. This letter explains what to expect at your first visit and how billing works.";
const LETTER_VISIT_REST = " Bring a photo ID, your insurance card, and a list of the medicines you take.";
const LETTER_BILLING = "We bill your insurance plan for you. Any copay is due at check-in. ";
const LETTER_PHONE = "If you have questions about a bill, call our billing office at (555) 234-5678.";

const DRAFT_LETTER: WordPara[] = [
  { id: "p1", text: "Welcome to Lakeside Medical Associates" },
  { id: "p2", text: LETTER_INTRO },
  { id: "p3", text: "Your First Visit" },
  { id: "p4", runs: [{ text: "Your first appointment takes about an hour. " }, { id: "r2", text: "Please arrive 15 minutes early." }, { text: LETTER_VISIT_REST }] },
  { id: "p5", text: "Our office is at 123 Lakeview Drive, Suite 200." },
  { id: "p6", text: "Billing and Insurance" },
  { id: "p7", text: LETTER_BILLING + LETTER_PHONE },
  { id: "p8", text: "We look forward to meeting you." },
  { id: "p9", text: "The Front Desk Team, Lakeside Medical Associates" },
];

const REVIEW_LETTER: WordPara[] = [
  { id: "p1", style: "Title", text: "Welcome to Lakeside Medical Associates" },
  { id: "p2", text: LETTER_INTRO },
  { id: "p3", style: "Heading 1", text: "Your First Visit" },
  { id: "p4", runs: [{ text: "Your first appointment takes about an hour. " }, { id: "r2", text: "Please arrive 15 minutes early.", bold: true }, { text: LETTER_VISIT_REST }] },
  {
    id: "p5",
    runs: [
      { text: "Our office is at 123 Lakeview Drive, Suite 200. " },
      { text: "Free parking is available in the garage behind the building.", ins: true, author: "Renee Alvarez" } as GRun,
    ],
  },
  { id: "p6", style: "Heading 1", text: "Billing and Insurance" },
  {
    id: "p7",
    runs: [
      { text: LETTER_BILLING },
      { text: LETTER_PHONE, del: true, author: "Dana Price" } as GRun,
    ],
  },
  { id: "p8", text: "We look forward to meeting you." },
  { id: "p9", text: "The Front Desk Team, Lakeside Medical Associates" },
];

/* ---------- Google Sheets: the shared supply log ---------- */

const SUPPLIES: [string, string, number, number][] = [
  ["Nitrile gloves (box of 100)", "PPE", 12, 8.5],
  ["Surgical masks (box of 50)", "PPE", 10, 6.25],
  ["Copy paper (case)", "Office", 4, 38],
  ["Disinfectant wipes", "Cleaning", 15, 5.75],
  ["Exam table paper (roll)", "Exam Room", 6, 22],
  ["Hand sanitizer (12 oz)", "Cleaning", 20, 3.4],
  ["Printer toner", "Office", 2, 64],
  ["Tongue depressors (box)", "Exam Room", 5, 4.5],
];

function supplyCells() {
  const cells: Record<string, { v?: string | number; fmt?: { bold?: boolean; fill?: string; numFmt?: "Number"; decimals?: number } }> = {
    A1: { v: "Item", fmt: { bold: true, fill: "#d9ead3" } },
    B1: { v: "Category", fmt: { bold: true, fill: "#d9ead3" } },
    C1: { v: "Quantity", fmt: { bold: true, fill: "#d9ead3" } },
    D1: { v: "Unit Cost", fmt: { bold: true, fill: "#d9ead3" } },
    E1: { v: "Total Cost", fmt: { bold: true, fill: "#d9ead3" } },
    A10: { v: "Total", fmt: { bold: true } },
  };
  SUPPLIES.forEach(([item, cat, qty, cost], i) => {
    const r = i + 2;
    cells[`A${r}`] = { v: item };
    cells[`B${r}`] = { v: cat };
    cells[`C${r}`] = { v: qty };
    cells[`D${r}`] = { v: cost, fmt: { numFmt: "Number", decimals: 2 } };
  });
  return cells;
}

export const googleSims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  /* Google Docs Essentials                                           */
  /* ================================================================ */

  "module-7::google-docs-essentials": [
    {
      id: "oa-google-docs-1",
      app: "google",
      title: "Set up the welcome letter in a shared Drive folder",
      scenario:
        "Renee Alvarez, the practice manager, asked you to draft the new patient welcome letter in the team's shared Front Desk folder so the practice owns it. Organize the folder, open the draft, name it clearly, and give it real heading styles before anyone reviews it.",
      fileName: "My Drive - Google Drive",
      minutes: 6,
      initial: googleDoc({
        surface: "drive",
        org: ORG,
        people: PEOPLE,
        drive: { location: "root", layout: "list" },
        files: [
          { id: "fd1", name: "Front Desk - Shared", kind: "folder", parent: "root", modified: "Oct 14, 2026", sharing: { people: TEAM_EDITORS } },
          { id: "fd2", name: "Training Notes", kind: "folder", parent: "root", modified: "Oct 2, 2026" },
          { id: "f1", name: "Clinic Hours - Both Sites", kind: "sheet", parent: "root", modified: "Oct 12, 2026" },
          { id: "f2", name: "Welcome Letter Draft", kind: "doc", parent: "fd1", modified: "Oct 19, 2026", modifiedBy: "ralvarez@lakesidemedical.example", sharing: { people: TEAM_EDITORS }, content: { paragraphs: DRAFT_LETTER } },
          { id: "f3", name: "Staff Phone List", kind: "doc", parent: "fd1", modified: "Sep 30, 2026", owner: "ralvarez@lakesidemedical.example", sharing: { people: TEAM_EDITORS } },
          { id: "f4", name: "Flu Clinic Flyer", kind: "slides", parent: "fd1", modified: "Oct 8, 2026", sharing: { people: TEAM_EDITORS } },
          { id: "f5", name: "Insurance Card Scanning Steps.pdf", kind: "pdf", parent: "fd1", modified: "Aug 21, 2026", size: "212 KB" },
        ],
      }),
      tasks: [
        {
          instruction: "In the Front Desk - Shared folder, create a new folder named “Patient Letters”.",
          hint: "Double-click Front Desk - Shared to open it. Then click New › New folder, type Patient Letters, and click Create.",
          steps: [{ action: { kind: "type", target: "newfolder:fd1", value: "Patient Letters" } }],
        },
        {
          instruction: "Move the document “Welcome Letter Draft” into the Patient Letters folder.",
          hint: "Right-click Welcome Letter Draft › Organize › Move, double-click your way to Patient Letters (or click it), and click Move. You can also drag the file onto the folder.",
          steps: [{ action: { kind: "dialog", id: "g.move", values: { file: "f2", folder: "Patient Letters" } } }],
        },
        {
          instruction: "Open “Welcome Letter Draft”.",
          hint: "Double-click the Patient Letters folder, then double-click Welcome Letter Draft. Right-click › Open with › Open works too. The document opens in a new browser tab.",
          steps: [{ action: { kind: "command", id: "g.open", value: "f2" } }],
        },
        {
          instruction: "Rename the document “New Patient Welcome - Lakeside Medical”.",
          hint: "Click the file name at the top left of the document (or File › Rename), type the new name, and press Enter.",
          steps: [{ action: { kind: "type", target: "rename:f2", value: "New Patient Welcome - Lakeside Medical" } }],
        },
        {
          instruction: "Apply the Title style to the first line, “Welcome to Lakeside Medical Associates”.",
          hint: "Click the first line. Then open the styles box on the toolbar (it shows Normal text) and pick Title, or use Format › Paragraph styles › Title › Apply 'Title'.",
          steps: [
            {
              action: { kind: "command", id: "home.style", value: "Title" },
              requires: { selection: "p1" },
              selectHint: "Click the line “Welcome to Lakeside Medical Associates” first.",
            },
          ],
        },
        {
          instruction: "Apply Heading 1 to the headings “Your First Visit” and “Billing and Insurance”.",
          hint: "Click each heading, then pick Heading 1 in the styles box, use Format › Paragraph styles › Heading 1 › Apply 'Heading 1', or press Ctrl+Alt+1.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p3" }, selectHint: "Click the heading “Your First Visit” first." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p6" }, selectHint: "Click the heading “Billing and Insurance” first." },
          ],
        },
        {
          instruction: "Show the document outline and check that both headings appear in it.",
          hint: "View › Show outline (Ctrl+Alt+A, then Ctrl+Alt+H). The outline opens on the left and lists the Title and both headings. (In the current Google Docs, the outline lives in the Show tabs & outlines panel at the top left of the document.)",
          steps: [{ action: { kind: "command", id: "g.view", value: "outline" } }],
        },
        {
          instruction: "Bold the sentence “Please arrive 15 minutes early.”",
          hint: "Click the sentence to select it. Then click Bold on the toolbar or press Ctrl+B. Format › Text › Bold works too.",
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              requires: { selection: "p4.r2" },
              selectHint: "Click the sentence “Please arrive 15 minutes early.” first.",
            },
          ],
        },
      ],
    },
    {
      id: "oa-google-docs-2",
      app: "google",
      title: "Run the review round on the welcome letter",
      scenario:
        "The welcome letter is drafted. Renee Alvarez needs to comment on it before Friday, and two colleagues have already left suggestions. Share it the right way, work through the feedback, mark the reviewed version, and download a Word copy for the final letterhead layout.",
      fileName: "New Patient Welcome - Lakeside Medical",
      minutes: 6,
      initial: googleDoc({
        surface: "docs",
        open: "f1",
        tabs: ["f1"],
        org: ORG,
        people: PEOPLE,
        files: [
          { id: "fd1", name: "Front Desk - Shared", kind: "folder", parent: "root", sharing: { people: TEAM_EDITORS } },
          { id: "fd2", name: "Patient Letters", kind: "folder", parent: "fd1" },
          {
            id: "f1",
            name: "New Patient Welcome - Lakeside Medical",
            kind: "doc",
            parent: "fd2",
            modified: "9:12 AM",
            content: { paragraphs: REVIEW_LETTER },
            comments: [{ id: "c1", anchor: "p3", author: "Renee Alvarez", time: "9:30 AM Today", text: "Can we tell patients where to park? People ask about it every day." }],
            current: { time: "October 20, 9:12 AM", author: "BEOC Student" },
            versions: [{ id: "v1", time: "October 19, 4:05 PM", author: "BEOC Student", name: "First draft", content: { paragraphs: DRAFT_LETTER } }],
          },
        ],
      }),
      tasks: [
        {
          instruction: "Share the letter with Renee Alvarez (ralvarez@lakesidemedical.example) as a Commenter.",
          hint: "Click Share at the top right. Type Renee's name or email and pick her, change the role on the right to Commenter, and click Send.",
          steps: [{ action: { kind: "dialog", id: "g.share", values: { file: "f1", email: "ralvarez@lakesidemedical.example", role: "Commenter" } } }],
        },
        {
          instruction: "Accept Renee's suggested edit about parking.",
          hint: "In the right margin, find Renee's suggestion (Add: “Free parking is available…”) and click its check mark. Tools › Review suggested edits lists it too.",
          steps: [
            {
              action: { kind: "command", id: "review.accept" },
              requires: { selection: "p5" },
              selectHint: "Click Renee's parking suggestion in the margin first.",
            },
          ],
        },
        {
          instruction: "Reject Dana Price's suggestion to delete the billing phone number sentence.",
          hint: "Find Dana's suggestion (Delete: “If you have questions about a bill…”) in the margin and click its X.",
          steps: [
            {
              action: { kind: "command", id: "review.reject" },
              requires: { selection: "p7" },
              selectHint: "Click Dana's suggestion about the billing phone number first.",
            },
          ],
        },
        {
          instruction: "Reply to Renee's comment on “Your First Visit” with “Added. Thanks for catching that.”",
          hint: "Click Renee's comment card in the right margin, type the reply in the Reply box, and press Enter (or click Reply).",
          steps: [{ action: { kind: "type", target: "reply:c1", value: "Added. Thanks for catching that." } }],
        },
        {
          instruction: "Resolve Renee's comment now that it has been handled.",
          hint: "Click the check mark at the top of Renee's comment card (Mark as done and hide discussion). The thread stays in the comment history.",
          steps: [{ action: { kind: "command", id: "g.comment.resolve", value: "c1" } }],
        },
        {
          instruction: "Name the current version “Reviewed by front desk”.",
          hint: "File › Version history › Name current version, type the name, and click Save.",
          steps: [
            {
              action: { kind: "dialog", id: "g.nameVersion", values: { name: "Reviewed by front desk" } },
              alt: [{ kind: "type", target: "vername:current", value: "Reviewed by front desk" }],
            },
          ],
        },
        {
          instruction: "Download the letter as a Microsoft Word file so you can finish the letterhead layout in Word.",
          hint: "File › Download › Microsoft Word (.docx).",
          steps: [{ action: { kind: "command", id: "g.download", value: "Microsoft Word (.docx)" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  /* Google Sheets Essentials                                         */
  /* ================================================================ */

  "module-7::google-sheets-essentials": [
    {
      id: "oa-google-sheets-1",
      app: "google",
      title: "Build the shared supply log",
      scenario:
        "Three staff update the supply log during the day, so it now lives in one Google Sheet instead of an Excel file that keeps opening read-only. Finish the formulas and protect them, add a Category dropdown, then sort and filter the list before you share it.",
      fileName: "Supply Log - Lakeside",
      minutes: 7,
      initial: googleDoc({
        surface: "sheets",
        open: "f1",
        tabs: ["f1"],
        org: ORG,
        people: PEOPLE,
        files: [
          {
            id: "f1",
            name: "Supply Log - Lakeside",
            kind: "sheet",
            parent: "root",
            modified: "Oct 19, 2026",
            content: { active: "Supply Log", sheets: [{ name: "Supply Log", cells: supplyCells(), colWidths: { A: 210, B: 110, C: 80, D: 90, E: 100 } }] },
          },
        ],
      }),
      tasks: [
        {
          instruction: "In cell E2, enter the formula “=C2*D2”.",
          hint: "Click E2, type =C2*D2, and press Enter. You can also type = and click C2, type *, and click D2.",
          steps: [{ action: { kind: "type", target: "E2", value: ["=C2*D2", "=D2*C2"], match: "formula" } }],
        },
        {
          instruction: "Fill the formula in E2 down through E9.",
          hint: "Click E2, then drag the small blue square at its bottom right corner down to E9. Or select E2:E9 and press Ctrl+D.",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "E2:E9" },
              requires: { selection: "E2" },
              selectHint: "Click E2, the cell with the formula, first.",
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down", requires: { selection: "E2:E9" } }],
            },
          ],
        },
        {
          instruction: "In cell E10, enter “=SUM(E2:E9)” to total the column.",
          hint: "Click E10 and type the formula, then press Enter. Insert › Function › SUM (or Functions on the toolbar) starts it for you.",
          steps: [{ action: { kind: "type", target: "E10", value: "=SUM(E2:E9)", match: "formula" } }],
        },
        {
          instruction: "Format D2:E10 as currency.",
          hint: "Select D2:E10, then click Format as currency ($) on the toolbar, or Format › Number › Currency. Ctrl+Shift+4 works too.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Currency" },
              requires: { selection: "D2:E10" },
              selectHint: "Select D2:E10 first: drag from D2 to E10.",
            },
          ],
        },
        {
          instruction: "Protect E2:E10 so that only you can edit the Total Cost formulas.",
          hint: "Select E2:E10, then Data › Protect sheets and ranges. Check the range, click Set permissions, keep Restrict who can edit this range with Only you, and click Done.",
          steps: [{ action: { kind: "dialog", id: "g.protect", values: { range: "E2:E10", mode: "Restrict who can edit this range" } } }],
        },
        {
          instruction: "Add a dropdown to B2:B9 with the options “PPE”, “Office”, “Cleaning”, and “Exam Room”, in that order.",
          hint: "Select B2:B9, then Data › Data validation. Keep Dropdown as the criteria, type each option in its own box (Add another item gives you a fourth box), and click Done.",
          steps: [{ action: { kind: "dialog", id: "g.validation", values: { range: "B2:B9", criteria: "Dropdown", items: "PPE, Office, Cleaning, Exam Room" } } }],
        },
        {
          instruction: "Sort the supply rows (A1:E9, which has a header row) by Total Cost from Z to A, so the most expensive items come first.",
          hint: "Select A1:E9. Data › Sort range › Advanced range sorting options, check Data has header row, sort by Total Cost, choose Z → A, and click Sort.",
          steps: [
            {
              action: { kind: "dialog", id: "g.sortRange", values: { range: "A1:E9", header: true, sortBy: "Total Cost", order: "Z to A" } },
              alt: [{ kind: "dialog", id: "g.sortRange", values: { range: "A2:E9", header: false, sortBy: "Column E", order: "Z to A" } }],
            },
          ],
        },
        {
          instruction: "Turn on a filter for A1:E9, then show only the PPE rows.",
          hint: "Select A1:E9 and click Create a filter on the toolbar (or Data › Create a filter). Then click the filter button in the Category header, click Clear, check PPE, and click OK.",
          steps: [
            {
              action: { kind: "command", id: "data.filter" },
              requires: { selection: "A1:E9" },
              selectHint: "Select A1:E9 first, so the Total row stays out of the filter.",
            },
            { action: { kind: "command", id: "filter.by", value: "B=PPE" } },
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  /* Google Slides Essentials                                         */
  /* ================================================================ */

  "module-7::google-slides-essentials": [
    {
      id: "oa-google-slides-1",
      app: "google",
      title: "Finish the hand hygiene in-service deck",
      scenario:
        "You are building the staff in-service presentation with two colleagues, and it will be shown from whichever conference room computer is free. Give the deck its theme, add a slide, write speaker notes, set transitions, hide a draft slide, keep a PowerPoint copy, and rehearse in presenter view.",
      fileName: "Hand Hygiene In-Service",
      minutes: 6,
      initial: googleDoc({
        surface: "slides",
        open: "f1",
        tabs: ["f1"],
        org: ORG,
        people: PEOPLE,
        files: [
          {
            id: "f1",
            name: "Hand Hygiene In-Service",
            kind: "slides",
            parent: "root",
            modified: "Oct 19, 2026",
            sharing: { people: [{ email: "lortega@lakesidemedical.example", role: "Editor" }, { email: "tmorales@lakesidemedical.example", role: "Editor" }] },
            content: {
              active: "s1",
              theme: "Simple Light",
              slides: [
                { id: "s1", layout: "Title slide", title: "Hand Hygiene In-Service", subtitle: "Lakeside Medical Associates · Staff training, October 2026" },
                { id: "s2", layout: "Title and body", title: "Why It Matters", body: ["Hands spread most clinic infections", "Clean hands protect patients and staff", "A good hand wash takes 20 seconds"] },
                { id: "s3", layout: "Title and body", title: "DRAFT - Ideas for later", body: ["Poster contest for the break room?", "Glow germ demonstration"] },
              ],
            },
          },
        ],
      }),
      tasks: [
        {
          instruction: "Apply the Streamline theme to the presentation.",
          hint: "Click Theme on the toolbar (or Slide › Change theme), then pick Streamline in the Themes panel on the right.",
          steps: [{ action: { kind: "command", id: "design.theme", value: "Streamline" } }],
        },
        {
          instruction: "After slide 2, add a new slide that uses the Title and body layout.",
          hint: "Click slide 2 in the filmstrip. Then click the arrow next to New slide (+) on the toolbar and pick Title and body. Slide › New slide or Ctrl+M also adds one.",
          steps: [
            {
              action: { kind: "command", id: "slides.new", value: "Title and body" },
              requires: { slide: "s2" },
              selectHint: "Click slide 2 in the filmstrip first, so the new slide goes after it.",
            },
          ],
        },
        {
          instruction: "On the new slide, type the title “Five Moments for Hand Hygiene”.",
          hint: "Click Click to add title on the new slide, type the title, and press Enter or click outside the box.",
          steps: [{ action: { kind: "type", target: "s4.title", value: "Five Moments for Hand Hygiene" } }],
        },
        {
          instruction: "Add the speaker note “Ask who washed their hands before this meeting.” to slide 2.",
          hint: "Click slide 2 in the filmstrip, click Click to add speaker notes under the slide, type the note, and press Enter.",
          steps: [{ action: { kind: "type", target: "s2.notes", value: "Ask who washed their hands before this meeting." } }],
        },
        {
          instruction: "Give every slide the Fade transition.",
          hint: "Click Transition on the toolbar (or Slide › Transition). In the Motion panel, pick Fade, then click Apply to all slides.",
          steps: [
            { action: { kind: "command", id: "transition.apply", value: "Fade" } },
            { action: { kind: "command", id: "transition.applyAll" } },
          ],
        },
        {
          instruction: "Skip the “DRAFT - Ideas for later” slide (now slide 4) so it does not appear when you present.",
          hint: "Right-click slide 4 in the filmstrip › Skip slide. Or click slide 4, then Slide › Skip slide.",
          steps: [
            {
              action: { kind: "command", id: "slides.hide" },
              requires: { slide: "s3" },
              selectHint: "Click slide 4 (DRAFT - Ideas for later) in the filmstrip first.",
            },
          ],
        },
        {
          instruction: "Download the presentation as a Microsoft PowerPoint file.",
          hint: "File › Download › Microsoft PowerPoint (.pptx).",
          steps: [{ action: { kind: "command", id: "g.download", value: "Microsoft PowerPoint (.pptx)" } }],
        },
        {
          instruction: "Start the presentation in presenter view.",
          hint: "Click the arrow next to Slideshow at the top right and choose Presenter view. Press Esc or click End show when you are done looking.",
          steps: [{ action: { kind: "command", id: "slideshow.presenterStart" } }],
        },
      ],
    },
  ],
};
