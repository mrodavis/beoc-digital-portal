import type { SimDefinition, WordPara } from "@/types/sim";
import { googleDoc, type GRun } from "@/components/sim/apps/google/types";
import { EMAIL, GW_ME, GW_ORG, GW_PEOPLE } from "./people";

/**
 * Google Workspace, Module 3 (Google Docs) sims. Keys are "module-3::<lessonSlug>".
 * Parkview Property Management; the learner is Jordan Lee. All fictional.
 */

const base = { me: GW_ME, org: GW_ORG, people: GW_PEOPLE };
const docFile = (id: string, name: string, paragraphs: WordPara[], extra: Record<string, unknown> = {}) => ({ id, name, kind: "doc" as const, parent: "root", modified: "Oct 19, 2026", content: { paragraphs }, ...extra });
const open1 = (fileId: string) => ({ surface: "docs" as const, open: fileId, tabs: [fileId] });

const NOTICE: WordPara[] = [
  { id: "p1", text: "Water Shutoff Notice" },
  { id: "p2", runs: [{ text: "The city will shut off the water at Elm Street Apartments to repair a main pipe. " }, { id: "r2", text: "Water will be off on Thursday from 9:00 AM to 1:00 PM." }] },
  { id: "p3", text: "Before the shutoff:" },
  { id: "p4", text: "Fill a pitcher or pot with drinking water." },
  { id: "p5", text: "Run the dishwasher and washing machine the night before." },
  { id: "p6", text: "Keep faucets closed so water does not spray when it comes back on." },
  { id: "p7", runs: [{ text: "Questions? " }, { id: "r2", text: "Call the office at (555) 019-2400." }] },
  { id: "p8", text: "After the water is back on:" },
  { id: "p9", text: "Run cold water for one minute" },
  { id: "p10", text: "Report any leaks to the office" },
];

const HANDBOOK: WordPara[] = [
  { id: "p1", text: "Parkview Tenant Handbook" },
  { id: "p2", text: "" },
  { id: "p3", text: "Welcome" },
  { id: "p4", text: "This handbook explains how to reach the office, pay rent, report repairs, and use shared spaces." },
  { id: "p5", text: "Rent and Payments" },
  { id: "p6", text: "Rent is due on the first of each month. Pay online through the resident portal or at the office." },
  { id: "p7", text: "Repairs and Maintenance" },
  { id: "p8", text: "Report repairs with the maintenance request form or call the office. For a flood or no heat, call right away." },
  { id: "p9", text: "Parking" },
  { id: "p10", text: "Each apartment has one assigned space. Guests park in the spaces marked Visitor." },
];

const UPDATE: WordPara[] = [
  { id: "p1", style: "Title", text: "Maintenance Update - Elm Street" },
  { id: "p2", text: "Prepared by:" },
  { id: "p3", text: "Date:" },
  { id: "p4", style: "Heading 1", text: "Repairs this week" },
  { id: "p5", text: "Here are the repairs Kim's team finished:" },
  { id: "p6", style: "Heading 1", text: "Photos" },
  { id: "p7", text: "The repaired kitchen faucet in apartment 3B:" },
  { id: "p8", text: "For vendor phone numbers, see" },
];

const POLICY: WordPara[] = [
  { id: "p1", style: "Title", text: "Pet Policy (Draft)" },
  { id: "p2", text: "This policy applies to every apartment at Elm Street Apartments and Riverside Commons." },
  { id: "p3", runs: [{ text: "Each apartment may have up to " }, { id: "r2", text: "two pets" }, { text: ", with written approval from the office." }] },
  { id: "p4", style: "Heading 1", text: "Pet Fees" },
  { id: "p5", text: "A monthly pet fee applies to each pet." },
  { id: "p6", style: "Heading 1", text: "Rules for Shared Spaces" },
  { id: "p7", runs: [{ text: "Keep dogs on a leash in the hallways" }, { text: " and the courtyard", ins: true, author: "Marcus Reyes" } as GRun, { text: "." }] },
  { id: "p8", runs: [{ text: "Clean up after your pet. " }, { text: "Register every pet with the office.", del: true, author: "Marcus Reyes" } as GRun] },
];
const POLICY_V1: WordPara[] = [
  { id: "p1", style: "Title", text: "Pet Policy (Draft)" },
  { id: "p2", text: "This policy applies to every apartment." },
  { id: "p3", text: "Each apartment may have up to two pets, with written approval from the office." },
];

const LETTER: WordPara[] = [
  { id: "p1", style: "Title", text: "Welcome to Elm Street Apartments" },
  { id: "p2", text: "Dear Tina Okafor," },
  { id: "p3", runs: [{ text: "Welcome to Elm St. Apartments! Your apartment, 2C, is ready for you. Parkview Property " }, { id: "r2", text: "Managment", misspelled: true, suggestions: ["Management"] }, { text: " is here to help." }] },
  { id: "p4", text: "The Elm St. laundry room is on the first floor. Parking is behind the building." },
  { id: "p5", text: "Please bring this letter to the office when you pick up your keys." },
  { id: "p6", text: "Sincerely," },
  { id: "p7", text: "Jordan Lee, Office Assistant" },
];

export const gwModule3Sims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  "module-3::creating-and-formatting-documents": [
    {
      id: "gw-m3-format-notice",
      app: "google",
      title: "Format the water shutoff notice",
      scenario:
        "Marcus typed the water shutoff notice as plain text. Tenants will skim it on the lobby board, so format it until the time and the instructions jump out.",
      fileName: "Water Shutoff Notice",
      minutes: 6,
      initial: googleDoc({ ...open1("f1"), ...base, files: [docFile("f1", "Water Shutoff Notice", NOTICE)] }),
      tasks: [
        {
          instruction: "Center the title “Water Shutoff Notice”.",
          hint: "Click in the title. Then click Align on the toolbar and choose Center align, or press Ctrl+Shift+E.",
          steps: [{ action: { kind: "command", id: "home.alignCenter" }, requires: { selection: "p1" }, selectHint: "Click in the title “Water Shutoff Notice” first." }],
        },
        {
          instruction: "Make the title 24 point.",
          hint: "With the title selected, click the font size box on the toolbar (it shows 11), type 24, and press Enter.",
          steps: [{ action: { kind: "command", id: "home.fontSize", value: "24" }, requires: { selection: "p1" }, selectHint: "Click in the title first." }],
        },
        {
          instruction: "Bold the sentence “Water will be off on Thursday from 9:00 AM to 1:00 PM.”",
          hint: "Click the sentence to select it, then click Bold on the toolbar or press Ctrl+B.",
          steps: [{ action: { kind: "command", id: "home.bold" }, requires: { selection: "p2.r2" }, selectHint: "Click the sentence “Water will be off on Thursday…” first." }],
        },
        {
          instruction: "Change the color of “Call the office at (555) 019-2400.” to red.",
          hint: "Click the sentence. Click Text color (the A with a colored bar) on the toolbar, then click red in the second row of colors.",
          steps: [{ action: { kind: "command", id: "home.fontColor", value: "#ff0000" }, requires: { selection: "p7.r2" }, selectHint: "Click the sentence “Call the office at (555) 019-2400.” first." }],
        },
        {
          instruction: "Turn the three lines under “Before the shutoff:” into a bulleted list.",
          hint: "Click “Fill a pitcher or pot…”, then Shift+click “Keep faucets closed…” to select all three lines. Click Bulleted list on the toolbar (or press Ctrl+Shift+8).",
          steps: [{ action: { kind: "command", id: "home.bullets" }, requires: { selection: "p4,p5,p6" }, selectHint: "Select the three lines from “Fill a pitcher…” to “Keep faucets closed…” first (click the first, Shift+click the last)." }],
        },
        {
          instruction: "Turn the two lines under “After the water is back on:” into a checklist.",
          hint: "Click “Run cold water for one minute”, Shift+click “Report any leaks to the office”, then click Checklist on the toolbar.",
          steps: [{ action: { kind: "command", id: "g.checklist" }, requires: { selection: "p9,p10" }, selectHint: "Select the last two lines first (click the first, Shift+click the second)." }],
        },
        {
          instruction: "Set the whole notice to 1.5 line spacing.",
          hint: "Press Ctrl+A to select everything. Then click Line & paragraph spacing on the toolbar and choose 1.5.",
          steps: [{ action: { kind: "command", id: "home.lineSpacing", value: "1.5" }, requires: { selection: "all" }, selectHint: "Select the whole document first (Ctrl+A)." }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-3::headings-outline-and-page-setup": [
    {
      id: "gw-m3-structure-handbook",
      app: "google",
      title: "Structure the tenant handbook",
      scenario:
        "The tenant handbook's section titles are plain text, so there is no outline or table of contents. Give it real headings, a table of contents, page numbers, a header with the company name, and a page break before it is printed for new tenants.",
      fileName: "Tenant Handbook",
      minutes: 8,
      initial: googleDoc({ ...open1("f1"), ...base, files: [docFile("f1", "Tenant Handbook", HANDBOOK)] }),
      tasks: [
        {
          instruction: "Apply the Title style to the first line, “Parkview Tenant Handbook”.",
          hint: "Click the first line, open the styles box on the toolbar (it shows Normal text), and choose Title.",
          steps: [{ action: { kind: "command", id: "home.style", value: "Title" }, requires: { selection: "p1" }, selectHint: "Click the first line first." }],
        },
        {
          instruction: "Apply Heading 1 to the four section titles: “Welcome”, “Rent and Payments”, “Repairs and Maintenance”, and “Parking”.",
          hint: "Click each section title and choose Heading 1 in the styles box, or press Ctrl+Alt+1.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p3" }, selectHint: "Click “Welcome” first." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p5" }, selectHint: "Click “Rent and Payments” first." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p7" }, selectHint: "Click “Repairs and Maintenance” first." },
            { action: { kind: "command", id: "home.style", value: "Heading 1" }, requires: { selection: "p9" }, selectHint: "Click “Parking” first." },
          ],
        },
        {
          instruction: "Open the tabs and outlines panel and check that the four headings are listed.",
          hint: "At the top left of the document, click Show tabs & outlines (the list icon). The outline of headings shows under the tab.",
          steps: [{ action: { kind: "command", id: "g.view", value: "outline" } }],
        },
        {
          instruction: "In the empty line under the title, insert a table of contents whose entries are links to the headings.",
          hint: "Click the empty line under the title. Then Insert › Page elements › Table of contents, and choose the style with links (Links).",
          steps: [{ action: { kind: "command", id: "references.toc", value: "Links" }, requires: { selection: "p2" }, selectHint: "Click the empty line under the title first." }],
        },
        {
          instruction: "Add page numbers at the bottom right of every page.",
          hint: "Insert › Page elements › Page number › Bottom right, all pages.",
          steps: [{ action: { kind: "command", id: "insert.pageNumber", value: "Bottom right, all pages" } }],
        },
        {
          instruction: "Add a header that says “Parkview Property Management”.",
          hint: "Insert › Page elements › Header. Type Parkview Property Management in the header and press Enter.",
          steps: [
            { action: { kind: "command", id: "insert.header" } },
            { action: { kind: "type", target: "header", value: "Parkview Property Management" } },
          ],
        },
        {
          instruction: "Start the Parking section on a new page: insert a page break after the paragraph that begins “Report repairs”.",
          hint: "Click the paragraph that begins Report repairs. Then Insert › Break › Page break, or press Ctrl+Enter.",
          steps: [{ action: { kind: "command", id: "insert.pageBreak" }, requires: { selection: "p8" }, selectHint: "Click the paragraph that begins “Report repairs” first." }],
        },
        {
          instruction: "In Page setup, set all four margins to 0.75 inch.",
          hint: "File › Page setup. Keep Pages selected, set Top, Bottom, Left, and Right to 0.75, and click OK.",
          steps: [{ action: { kind: "dialog", id: "g.pageSetup", values: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75 } } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-3::tables-images-and-smart-chips": [
    {
      id: "gw-m3-update",
      app: "google",
      title: "Build the Elm Street maintenance update",
      scenario:
        "Kim sent this week's repairs in a text message. Turn the update draft into something Denise can scan in seconds: who prepared it, today's date, a table of repairs, a photo, a link to the vendor list, and a place for meeting notes.",
      fileName: "Maintenance Update - Elm Street",
      minutes: 7,
      initial: googleDoc({
        ...open1("f1"),
        ...base,
        files: [
          docFile("f1", "Maintenance Update - Elm Street", UPDATE),
          { id: "f2", name: "Vendor Contact List", kind: "sheet", parent: "root", owner: EMAIL.denise, modified: "Sep 28, 2026" },
          { id: "f3", name: "Faucet Repair - Elm 3B.jpg", kind: "image", parent: "root", modified: "Oct 18, 2026", size: "1.6 MB" },
          { id: "f4", name: "Lobby Light Fixture.jpg", kind: "image", parent: "root", modified: "Oct 17, 2026", size: "1.2 MB" },
        ],
      }),
      tasks: [
        {
          instruction: "At the end of “Prepared by:”, insert a people smart chip for Kim Nguyen.",
          hint: "Click the line Prepared by:, then type @ (or choose Insert › Smart chips › People). Type Kim and click Kim Nguyen.",
          steps: [{ action: { kind: "dialog", id: "g.chip", values: { kind: "person", value: EMAIL.kim } }, requires: { selection: "p2" }, selectHint: "Click the line “Prepared by:” first." }],
        },
        {
          instruction: "At the end of “Date:”, insert a date chip for today.",
          hint: "Click the line Date:, type @ (or Insert › Smart chips › Date), and click Today under Dates.",
          steps: [{ action: { kind: "dialog", id: "g.chip", values: { kind: "date", value: "Oct 20, 2026" } }, requires: { selection: "p3" }, selectHint: "Click the line “Date:” first." }],
        },
        {
          instruction: "Under “Here are the repairs Kim's team finished:”, insert a table with 3 columns and 3 rows.",
          hint: "Click the line Here are the repairs…, then Insert › Table and click the box 3 x 3 (three across, three down).",
          steps: [{ action: { kind: "command", id: "insert.table", value: "3 x 3" }, requires: { selection: "p5" }, selectHint: "Click the line “Here are the repairs Kim's team finished:” first." }],
        },
        {
          instruction: "Type “Apartment” in the first cell of the table.",
          hint: "Double-click the top left cell of the new table, type Apartment, and press Enter.",
          steps: [{ action: { kind: "type", target: "tbl1.r1c1", value: "Apartment" } }],
        },
        {
          instruction: "Under “The repaired kitchen faucet in apartment 3B:”, insert the photo “Faucet Repair - Elm 3B.jpg” from Drive.",
          hint: "Click that line, then Insert › Image › Drive & Photos. Click Faucet Repair - Elm 3B.jpg and click Insert.",
          steps: [{ action: { kind: "dialog", id: "g.image", values: { source: "Drive & Photos", file: "Faucet Repair - Elm 3B.jpg" } }, requires: { selection: "p7" }, selectHint: "Click the line “The repaired kitchen faucet in apartment 3B:” first." }],
        },
        {
          instruction: "At the end of “For vendor phone numbers, see”, insert a file chip for “Vendor Contact List”.",
          hint: "Click the last line, type @ (or Insert › Smart chips › Files), and click Vendor Contact List under Files.",
          steps: [{ action: { kind: "dialog", id: "g.chip", values: { kind: "file", value: "f2" } }, requires: { selection: "p8" }, selectHint: "Click the line “For vendor phone numbers, see” first." }],
        },
        {
          instruction: "Below the last line, insert the Meeting notes building block for Friday's maintenance meeting.",
          hint: "With the last line still selected, choose Insert › Building blocks and pick Meeting notes (in Google Docs it may be under View more). Typing @ on an empty line and picking Meeting notes works too.",
          steps: [{ action: { kind: "command", id: "g.block", value: "Meeting notes" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-3::comments-suggestions-and-version-history": [
    {
      id: "gw-m3-review",
      app: "google",
      title: "Work through the pet policy review",
      scenario:
        "You own the draft pet policy. Denise left a comment, Marcus suggested two changes, and Priya still has to confirm the pet fee. Handle the feedback, assign the open question, and name the reviewed version so you can always get back to it.",
      fileName: "Pet Policy (Draft)",
      minutes: 7,
      initial: googleDoc({
        ...open1("f1"),
        ...base,
        files: [
          {
            ...docFile("f1", "Pet Policy (Draft)", POLICY),
            modified: "9:05 AM",
            sharing: { people: [{ email: EMAIL.denise, role: "Commenter" }, { email: EMAIL.marcus, role: "Commenter" }, { email: EMAIL.priya, role: "Commenter" }] },
            comments: [{ id: "c1", anchor: "p3", author: "Denise Carter", time: "8:40 AM Today", text: "Two pets seems like a lot for our one-bedroom units. Can we change it?" }],
            current: { time: "October 20, 9:05 AM", author: "Marcus Reyes" },
            versions: [{ id: "v1", time: "October 12, 3:15 PM", author: "Jordan Lee", name: "First draft", content: { paragraphs: POLICY_V1 } }],
          },
        ],
      }),
      tasks: [
        {
          instruction: "Switch to Suggesting mode.",
          hint: "Click the mode button at the right end of the toolbar (it shows Editing) and choose Suggesting. View › Mode › Suggesting works too.",
          steps: [{ action: { kind: "command", id: "g.mode", value: "Suggesting" } }],
        },
        {
          instruction: "Suggest changing the words “two pets” to “one pet”.",
          hint: "Double-click the words two pets, type one pet, and press Enter. The change shows as a suggestion in the margin.",
          steps: [{ action: { kind: "type", target: "p3.r2", value: "one pet" } }],
        },
        {
          instruction: "Reply to Denise's comment with “Suggested one pet instead.”",
          hint: "Click Denise's comment card in the right margin, type in the reply box, and click Reply (or press Enter).",
          steps: [{ action: { kind: "type", target: "reply:c1", value: "Suggested one pet instead." } }],
        },
        {
          instruction: "Resolve Denise's comment.",
          hint: "Click Resolve, the check mark in the top corner of Denise's comment card.",
          steps: [{ action: { kind: "command", id: "g.comment.resolve", value: "c1" } }],
        },
        {
          instruction: "Comment on the heading “Pet Fees” with “@Priya Shah please confirm the monthly pet fee.” and assign it to Priya.",
          hint: "Click the heading Pet Fees and press Ctrl+Alt+M (or click Add comment). Type @Pri and pick Priya Shah, finish the comment, check Assign to Priya Shah, and click Assign.",
          steps: [{ action: { kind: "type", target: `assign:${EMAIL.priya}`, value: "@Priya Shah please confirm the monthly pet fee." }, requires: { selection: "p4" }, selectHint: "Click the heading “Pet Fees” first, so the comment is attached to it." }],
        },
        {
          instruction: "Accept Marcus's suggestion to add “and the courtyard”.",
          hint: "Find Marcus's suggestion (Add: and the courtyard) in the margin and click its check mark.",
          steps: [{ action: { kind: "command", id: "review.accept" }, requires: { selection: "p7" }, selectHint: "Click Marcus's suggestion about the courtyard in the margin first." }],
        },
        {
          instruction: "Reject Marcus's suggestion to delete “Register every pet with the office.” The rule stays.",
          hint: "Find Marcus's suggestion (Delete: Register every pet…) in the margin and click its X.",
          steps: [{ action: { kind: "command", id: "review.reject" }, requires: { selection: "p8" }, selectHint: "Click Marcus's suggestion about registering pets in the margin first." }],
        },
        {
          instruction: "Name the current version “Reviewed by office”.",
          hint: "File › Version history › Name current version. Type Reviewed by office and click Save.",
          steps: [
            {
              action: { kind: "dialog", id: "g.nameVersion", values: { name: "Reviewed by office" } },
              alt: [{ kind: "type", target: "vername:current", value: "Reviewed by office" }],
            },
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-3::proofreading-printing-and-sending": [
    {
      id: "gw-m3-finish",
      app: "google",
      title: "Proofread and send the move-in letter",
      scenario:
        "Tina Okafor moves into Elm Street apartment 2C this week. Her welcome letter has a typo and inconsistent street names. Proofread it, then print it for the move-in packet, email her a PDF, and keep a copy to reuse for the next tenant.",
      fileName: "Move-In Letter - Elm 2C",
      minutes: 6,
      initial: googleDoc({ ...open1("f1"), ...base, files: [docFile("f1", "Move-In Letter - Elm 2C", LETTER)] }),
      tasks: [
        {
          instruction: "Fix the misspelled word “Managment”.",
          hint: "Right-click the word with the red underline and click Management. Or click Spelling and grammar check on the toolbar and click Change.",
          steps: [{ action: { kind: "command", id: "spelling.change", value: "Management" }, requires: { selection: "p3.r2" }, selectHint: "Right-click the misspelled word “Managment” first." }],
        },
        {
          instruction: "Replace every “Elm St.” with “Elm Street”.",
          hint: "Edit › Find and replace (Ctrl+H). Type Elm St. in Find and Elm Street in Replace with, then click Replace all.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Elm St.", replace: "Elm Street" } } }],
        },
        {
          instruction: "Check the letter's word count.",
          hint: "Tools › Word count, or press Ctrl+Shift+C. Click OK when you have read it.",
          steps: [{ action: { kind: "command", id: "g.pane", value: "Word count" } }],
        },
        {
          instruction: "Print 2 copies on the Front Desk Printer for the move-in packet.",
          hint: "File › Print (Ctrl+P). Keep Front Desk Printer as the destination, change Copies to 2, and click Print.",
          steps: [{ action: { kind: "dialog", id: "g.print", values: { destination: "Front Desk Printer", copies: 2 } } }],
        },
        {
          instruction: "Email the letter to Tina (tokafor@example.com) as a PDF attachment.",
          hint: "File › Email › Email this file. Type tokafor@example.com in To, keep PDF under Attach as, and click Send.",
          steps: [{ action: { kind: "dialog", id: "g.email", values: { to: "tokafor@example.com", format: "PDF" } } }],
        },
        {
          instruction: "Make a copy of the letter named “Move-In Letter - Template” to reuse for the next tenant.",
          hint: "File › Make a copy. Type Move-In Letter - Template as the name and click Make a copy.",
          steps: [{ action: { kind: "dialog", id: "g.makeCopy", values: { name: "Move-In Letter - Template" } } }],
        },
      ],
    },
  ],
};
