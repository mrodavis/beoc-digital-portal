import type { SimDefinition } from "@/types/sim";

/** Word Module 6: Advanced Formatting (page layout, indents and tabs, spacing, breaks, columns). */

function anyCell(id: string, rows: number, cols: number): string[] {
  const out = [`${id}.r0c0`];
  for (let r = 1; r <= rows; r++) {
    out.push(`${id}.r${r}c0`);
    for (let c = 1; c <= cols; c++) out.push(`${id}.r${r}c${c}`);
  }
  for (let c = 1; c <= cols; c++) out.push(`${id}.r0c${c}`);
  return out;
}

const REMINDERS = ["p6", "p7", "p8", "p9", "p10"];

export const wordModule6Sims: Record<string, SimDefinition[]> = {
  "module-6::page-layout": [
    {
      id: "word-m6-page-layout-1",
      app: "word",
      title: "Set up the front desk coverage schedule",
      scenario:
        "The November front desk coverage schedule has seven day columns that don't fit on a portrait page. One copy hangs at the front desk; another goes into a three-ring binder, where the hole punch will cut into anything printed too close to the left edge.",
      fileName: "Front Desk Coverage - November.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Front Desk Coverage, November 2026" },
          { id: "p2", text: "Post at the front desk and file a copy in the staff binder. Swaps need the office manager's approval 48 hours ahead." },
          {
            id: "tbl1",
            kind: "table",
            table: {
              style: "Grid Table 4 - Accent 1",
              rows: [
                ["Shift", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                ["7:30 to 12:00", "G. Kim", "J. Ellis", "G. Kim", "A. Torres", "J. Ellis", "P. Shah"],
                ["12:00 to 4:30", "A. Torres", "G. Kim", "P. Shah", "J. Ellis", "G. Kim", "Closed"],
                ["4:30 to 6:00", "P. Shah", "A. Torres", "J. Ellis", "G. Kim", "A. Torres", "Closed"],
              ],
            },
          },
          { id: "p4", style: "Heading 1", text: "Coverage Rules" },
          { id: "p5", text: "Two people must be at the front desk from 8:00 to 10:00 AM, when most patients check in." },
          { id: "p6", text: "Lunch breaks are 30 minutes and are staggered so the phones are always answered." },
          { id: "p3", italic: true, text: "Questions about coverage? Contact Tasha Morales, Office Manager, extension 201." },
        ],
      },
      tasks: [
        {
          instruction: "Change the page orientation to Landscape so the seven-day table fits across the page.",
          hint: "Layout tab › Page Setup group › Orientation › Landscape.",
          steps: [
            {
              action: { kind: "command", id: "layout.orientation", value: "Landscape" },
              alt: [{ kind: "dialog", id: "pageSetup", values: { orientation: "Landscape" } }],
            },
          ],
        },
        {
          instruction: "Change the paper size to Legal.",
          hint: "Layout tab › Page Setup group › Size › Legal.",
          steps: [
            {
              action: { kind: "command", id: "layout.size", value: "Legal" },
              alt: [{ kind: "dialog", id: "pageSetup", values: { size: "Legal" } }],
            },
          ],
        },
        {
          instruction: "Apply Narrow margins to the front desk copy.",
          hint: "Layout tab › Page Setup group › Margins › Narrow.",
          steps: [
            {
              action: { kind: "command", id: "layout.margins", value: "Narrow" },
              alt: [
                { kind: "dialog", id: "customMargins", values: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5 } },
                { kind: "dialog", id: "pageSetup", values: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5 } },
              ],
            },
          ],
        },
        {
          instruction: "Now prepare the binder copy: set custom margins of 0.75 inch on the top, bottom, and right, and 1.25 inches on the left.",
          hint: "Layout tab › Page Setup group › Margins › Custom Margins… › Top 0.75, Bottom 0.75, Left 1.25, Right 0.75 › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "customMargins", values: { top: 0.75, bottom: 0.75, left: 1.25, right: 0.75 } },
              alt: [{ kind: "dialog", id: "pageSetup", values: { top: 0.75, bottom: 0.75, left: 1.25, right: 0.75 } }],
            },
          ],
        },
        {
          instruction: "Center the schedule vertically on the page.",
          hint: "Layout tab › Page Setup group › dialog box launcher (the small arrow) › Layout tab › Vertical alignment: Center › OK.",
          steps: [{ action: { kind: "dialog", id: "pageSetup", values: { vAlign: "Center" } } }],
        },
      ],
    },
  ],

  "module-6::indents-and-tabs": [
    {
      id: "word-m6-indents-tabs-1",
      app: "word",
      title: "Align the privacy training packet properly",
      scenario:
        "The privacy training packet was lined up with the space bar, and every alignment collapsed when someone changed the font. Rebuild the alignment with indents and tab stops so it survives any font change.",
      fileName: "Privacy Training Packet.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Staff Training: Patient Privacy at the Front Desk" },
          { id: "p2", style: "Heading 1", text: "Introduction" },
          {
            id: "p3",
            text: "Every member of the front desk team handles protected health information: names, birth dates, insurance numbers, and the reason for each visit. This packet explains how to protect it during check-in.",
          },
          { id: "p4", text: "Read each section, then complete the short quiz with your supervisor. Keep this packet at your workstation for reference." },
          { id: "p5", style: "Heading 1", text: "The Key Rule" },
          { id: "p6", italic: true, text: "Use or share only the minimum amount of patient information needed to do the job, and never more." },
          { id: "p7", style: "Heading 1", text: "On-Call Phone List" },
          { id: "p8", text: "Front desk supervisor\t(718) 555-0142" },
          { id: "p9", text: "Billing office\t(718) 555-0150" },
          { id: "p10", text: "After-hours provider\t(718) 555-0199" },
          { id: "p11", style: "Heading 1", text: "References" },
          { id: "p12", text: "Morales, T. (2025). Protecting patient information at check-in. Journal of Community Health Practice, 12(2), 44-51." },
          { id: "p13", text: "Lakeside Medical Associates. (2026). Front desk privacy procedures (Rev. 3). Internal policy manual." },
          { id: "p14", text: "National Health Education Institute. (2025). Privacy at the front desk: A practical guide for medical office staff." },
        ],
      },
      tasks: [
        {
          instruction: "Display the ruler so you can see the indent markers.",
          hint: "View tab › Show group › Ruler.",
          steps: [{ action: { kind: "command", id: "view.ruler" } }],
        },
        {
          instruction: "Indent the first line of both paragraphs under “Introduction” by 0.5 inch.",
          hint: "Select both paragraphs. Home tab › Paragraph group › dialog box launcher › Indentation: Special › First line, By 0.5\" › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "paragraph", values: { special: "First line", by: 0.5 } },
              requires: { selection: "p3,p4" },
              selectHint: "Select both Introduction paragraphs first: click the first, then Shift+click the second.",
            },
          ],
        },
        {
          instruction: "Give the three references a 0.5-inch hanging indent.",
          hint: "Select the three references. Home tab › Paragraph dialog box launcher › Special › Hanging, By 0.5\" › OK (or press Ctrl+T).",
          steps: [
            {
              action: { kind: "dialog", id: "paragraph", values: { special: "Hanging", by: 0.5 } },
              alt: [{ kind: "command", id: "home.hangingIndent" }],
              requires: { selection: "p12,p13,p14" },
              selectHint: "Select all three references first: click the first, then Shift+click the last.",
            },
          ],
        },
        {
          instruction: "Indent the Key Rule quote 0.5 inch from the left margin.",
          hint: "Click the quote. Layout tab › Paragraph group › Indent Left › 0.5 (or use the Paragraph dialog).",
          steps: [
            {
              action: { kind: "command", id: "layout.indentLeft", value: "0.5" },
              alt: [{ kind: "dialog", id: "paragraph", values: { indentLeft: 0.5 } }],
              requires: { selection: "p6" },
              selectHint: "Click the quote under “The Key Rule” first.",
            },
          ],
        },
        {
          instruction: "Indent the Key Rule quote 0.5 inch from the right margin as well.",
          hint: "With the quote selected: Layout tab › Paragraph group › Indent Right › 0.5.",
          steps: [
            {
              action: { kind: "command", id: "layout.indentRight", value: "0.5" },
              alt: [{ kind: "dialog", id: "paragraph", values: { indentRight: 0.5 } }],
              requires: { selection: "p6" },
              selectHint: "Click the quote under “The Key Rule” first.",
            },
          ],
        },
        {
          instruction: "For the three on-call phone lines, set a right tab stop at 6.5 inches with a dot leader so the phone numbers line up at the right margin.",
          hint: "Select the three phone lines. Home tab › Paragraph dialog box launcher › Tabs (in Word, the Tabs… button) › Tab stop position 6.5 › Alignment: Right › Leader: 2 ……. › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "paragraph", values: { tabPos: 6.5, tabAlign: "Right", tabLeader: "2 ......." } },
              requires: { selection: "p8,p9,p10" },
              selectHint: "Select all three phone lines first: click the first, then Shift+click the last.",
            },
          ],
        },
      ],
    },
  ],

  "module-6::line-paragraph-spacing": [
    {
      id: "word-m6-spacing-1",
      app: "word",
      title: "Fix the spacing in the waiting room policy",
      scenario:
        "The waiting room policy was spaced out by pressing Enter twice, so there is no single setting to adjust and blank lines end up at the tops of pages. Replace the empty paragraphs with real line and paragraph spacing.",
      fileName: "Waiting Room Policy.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Waiting Room Policy" },
          { id: "p2", style: "Heading 1", text: "Check-In" },
          { id: "p3", text: "Please check in at the front desk as soon as you arrive. If you are more than 15 minutes late, we may need to reschedule your visit." },
          { id: "p4", text: "" },
          { id: "p5", text: "Tell the front desk if your address, phone number, or insurance has changed since your last visit." },
          { id: "p6", text: "" },
          { id: "p7", style: "Heading 1", text: "Waiting Room" },
          { id: "p8", text: "Please keep phone calls brief, and use headphones for videos and music." },
          { id: "p9", text: "" },
          { id: "p10", text: "Food and drinks are not allowed in the waiting room, except water and baby bottles." },
          { id: "p11", style: "Heading 1", text: "Visitors" },
          { id: "p12", text: "Each patient may bring one adult visitor into the exam room. Children who are not patients must stay with an adult in the waiting room." },
        ],
      },
      tasks: [
        {
          instruction: "Delete the three empty paragraphs that were used to add space.",
          hint: "Home tab › Paragraph group › Show/Hide ¶ to see them. Click each empty line and press Delete.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "edit.delete" }, requires: { selection: "p4" }, selectHint: "Click one empty line at a time, then press Delete." },
            { action: { kind: "command", id: "edit.delete" }, requires: { selection: "p6" }, selectHint: "Click one empty line at a time, then press Delete." },
            { action: { kind: "command", id: "edit.delete" }, requires: { selection: "p9" }, selectHint: "Click one empty line at a time, then press Delete." },
          ],
        },
        {
          instruction: "Set the line spacing of the five body paragraphs to 1.5.",
          hint: "Click the first body paragraph and Ctrl+click the other four (or press Ctrl+A to select everything). Home tab › Paragraph group › Line and Paragraph Spacing › 1.5.",
          steps: [
            {
              action: { kind: "command", id: "home.lineSpacing", value: "1.5" },
              alt: [{ kind: "dialog", id: "paragraph", values: { lineSpacing: "1.5 lines" } }],
              requires: { selection: ["p3,p5,p8,p10,p12", "all"] },
              selectHint: "Select the five body paragraphs first (Ctrl+click each one), or press Ctrl+A to select the whole document.",
            },
          ],
        },
        {
          instruction: "Add 6 pt of spacing after each of the five body paragraphs.",
          hint: "With the body paragraphs selected: Layout tab › Paragraph group › Spacing After › 6 (or the Paragraph dialog › Spacing After: 6 pt).",
          steps: [
            {
              action: { kind: "command", id: "layout.spaceAfter", value: "6" },
              alt: [{ kind: "dialog", id: "paragraph", values: { spaceAfter: 6 } }],
              requires: { selection: ["p3,p5,p8,p10,p12", "all"] },
              selectHint: "Select the five body paragraphs first (Ctrl+click each one), or press Ctrl+A.",
            },
          ],
        },
        {
          instruction: "Add 12 pt of spacing before the heading “Waiting Room”.",
          hint: "Click the heading. Layout tab › Paragraph group › Spacing Before › 12.",
          steps: [
            {
              action: { kind: "command", id: "layout.spaceBefore", value: "12" },
              alt: [
                { kind: "dialog", id: "paragraph", values: { spaceBefore: 12 } },
                { kind: "command", id: "home.lineSpacing", value: "Add Space Before Paragraph" },
              ],
              requires: { selection: "p7" },
              selectHint: "Click the heading “Waiting Room” first.",
            },
          ],
        },
        {
          instruction: "Keep the heading “Visitors” on the same page as the paragraph that follows it.",
          hint: "Click the heading. Home tab › Paragraph dialog box launcher › Line and Page Breaks tab › check Keep with next › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "paragraph", values: { keepNext: true } },
              requires: { selection: "p11" },
              selectHint: "Click the heading “Visitors” first.",
            },
          ],
        },
      ],
    },
  ],

  "module-6::breaks": [
    {
      id: "word-m6-breaks-1",
      app: "word",
      title: "Fix the page flow in the annual report",
      scenario:
        "The annual report pushes a heading onto a new page with a stack of empty paragraphs, and the wide budget table needs a landscape page in the middle of a portrait document. Setting orientation rotates every page unless that part of the report is its own section.",
      fileName: "2026 Annual Report.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "2026 Annual Report" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Prepared for the board of directors" },
          { id: "p3", style: "Heading 1", text: "A Year in Review" },
          { id: "p4", text: "We cared for 6,240 patients this year, opened Saturday hours, and added a behavioral health provider. Patient satisfaction rose to 94 percent." },
          { id: "p5", text: "" },
          { id: "p6", text: "" },
          { id: "p7", text: "" },
          { id: "p8", style: "Heading 1", text: "Monthly Revenue" },
          { id: "p9", text: "Revenue grew in every quarter, led by preventive visits and the new Saturday clinic." },
          { id: "p10", style: "Heading 1", text: "Budget Detail" },
          {
            id: "tbl1",
            kind: "table",
            table: {
              style: "Grid Table 4 - Accent 1",
              rows: [
                ["Category", "Q1", "Q2", "Q3", "Q4", "Total", "Budget", "Variance"],
                ["Staff", "$412,000", "$418,500", "$421,000", "$430,200", "$1,681,700", "$1,700,000", "-$18,300"],
                ["Supplies", "$38,900", "$41,250", "$45,700", "$47,800", "$173,650", "$165,000", "+$8,650"],
              ],
            },
          },
          { id: "p11", style: "Heading 1", text: "Staff Recognition" },
          { id: "p12", text: "Thank you to every member of our team. Special thanks to Grace Kim, who trained six new front desk staff this year." },
        ],
      },
      tasks: [
        {
          instruction: "Show the formatting marks so you can see the empty paragraphs and the breaks.",
          hint: "Home tab › Paragraph group › Show/Hide ¶ (or press Ctrl+Shift+8).",
          steps: [{ action: { kind: "command", id: "home.showMarks" } }],
        },
        {
          instruction: "Delete the three empty paragraphs above the heading “Monthly Revenue”.",
          hint: "Click each empty line (each shows only a ¶ mark) and press Delete.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "edit.delete" }, requires: { selection: "p5" }, selectHint: "Click one empty line at a time, then press Delete." },
            { action: { kind: "command", id: "edit.delete" }, requires: { selection: "p6" }, selectHint: "Click one empty line at a time, then press Delete." },
            { action: { kind: "command", id: "edit.delete" }, requires: { selection: "p7" }, selectHint: "Click one empty line at a time, then press Delete." },
          ],
        },
        {
          instruction: "Make “Monthly Revenue” start at the top of a new page by inserting a page break before it.",
          hint: "Click at the start of the heading “Monthly Revenue”. Insert tab › Pages group › Page Break (or press Ctrl+Enter).",
          steps: [
            {
              action: { kind: "command", id: "insert.pageBreak" },
              alt: [{ kind: "command", id: "layout.breaks", value: "Page" }],
              requires: { selection: "p8" },
              selectHint: "Click the heading “Monthly Revenue” first.",
            },
          ],
        },
        {
          instruction: "Insert a Next Page section break before the heading “Budget Detail”.",
          hint: "Click at the start of the heading “Budget Detail”. Layout tab › Page Setup group › Breaks › Section Breaks › Next Page.",
          steps: [
            {
              action: { kind: "command", id: "layout.breaks", value: "Next Page" },
              requires: { selection: "p10" },
              selectHint: "Click the heading “Budget Detail” first.",
            },
          ],
        },
        {
          instruction: "Change only the Budget Detail section to Landscape orientation.",
          hint: "Click in the Budget Detail section (the heading or the table). Layout tab › Page Setup group › Orientation › Landscape. Only this section turns.",
          steps: [
            {
              action: { kind: "command", id: "layout.orientation", value: "Landscape" },
              alt: [{ kind: "dialog", id: "pageSetup", values: { orientation: "Landscape", applyTo: "This section" } }],
              requires: { selection: ["p10", ...anyCell("tbl1", 3, 8)] },
              selectHint: "Click the heading “Budget Detail” or the budget table first.",
            },
          ],
        },
        {
          instruction: "Insert a Next Page section break before “Staff Recognition”, then set that new section back to Portrait.",
          hint: "Click at the start of “Staff Recognition”. Layout tab › Breaks › Next Page. Then, with the insertion point still there, Layout tab › Orientation › Portrait.",
          steps: [
            {
              action: { kind: "command", id: "layout.breaks", value: "Next Page" },
              requires: { selection: "p11" },
              selectHint: "Click the heading “Staff Recognition” first.",
            },
            {
              action: { kind: "command", id: "layout.orientation", value: "Portrait" },
              alt: [{ kind: "dialog", id: "pageSetup", values: { orientation: "Portrait", applyTo: "This section" } }],
              requires: { selection: ["p11", "p12"] },
              selectHint: "Click in the Staff Recognition section, then choose Portrait.",
            },
          ],
        },
      ],
    },
  ],

  "module-6::columns": [
    {
      id: "word-m6-columns-1",
      app: "word",
      title: "Lay out the newsletter reminders in columns",
      scenario:
        "Patients say the winter newsletter feels like hard work to read. The lines run the full width of the page, so the eye keeps losing its place. Put the short community reminders into two columns and adjust them until the section reads easily.",
      fileName: "Community Newsletter - Winter.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Lakeside Community Newsletter" },
          { id: "p2", style: "Subtitle", text: "Winter 2026" },
          { id: "p3", style: "Heading 1", text: "A Note from Dr. Ortiz" },
          {
            id: "p4",
            text: "Winter brings colds, flu, and busy schedules. The best thing you can do for your family this season is to get a flu shot, wash your hands often, and stay home when you are sick. Our team is here six days a week if you need us.",
          },
          { id: "p5", style: "Heading 1", text: "Community Reminders" },
          { id: "p6", text: "Flu Shot Saturdays: walk in from 9:00 AM to 1:00 PM every Saturday in November." },
          { id: "p7", text: "Parking: use the Pine Street entrance until the Harbor Street repairs are finished." },
          { id: "p8", text: "Portal tip: request refills and see your test results any time in the patient portal." },
          { id: "p9", text: "Holiday hours: we close at noon on December 24 and December 31." },
          { id: "p10", text: "New phone line: call (718) 555-0150 for billing questions." },
          { id: "p11", style: "Heading 1", text: "Recipe Corner" },
          { id: "p12", text: "Try our dietitian's lentil soup: one cup of lentils, two carrots, an onion, a can of tomatoes, and six cups of low-sodium broth. Simmer for 40 minutes." },
        ],
      },
      tasks: [
        {
          instruction: "Format the five reminders, from “Flu Shot Saturdays” through “New phone line”, into two columns.",
          hint: "Select the five reminders (click the first, then Shift+click the last). Layout tab › Page Setup group › Columns › Two. Word adds section breaks around the selection for you.",
          steps: [
            {
              action: { kind: "command", id: "layout.columns", value: "Two" },
              alt: [{ kind: "dialog", id: "columns", values: { num: 2 } }, { kind: "dialog", id: "columns", values: { preset: "Two" } }],
              requires: { selection: REMINDERS.join(",") },
              selectHint: "Select all five reminders first: click “Flu Shot Saturdays…”, then Shift+click “New phone line…”.",
            },
          ],
        },
        {
          instruction: "Insert a column break before “Portal tip” so the second column starts with it.",
          hint: "Click at the start of “Portal tip”. Layout tab › Page Setup group › Breaks › Column.",
          steps: [
            {
              action: { kind: "command", id: "layout.breaks", value: "Column" },
              requires: { selection: "p8" },
              selectHint: "Click the reminder that begins “Portal tip” first.",
            },
          ],
        },
        {
          instruction: "Add a line between the two columns and set the spacing between them to 0.3 inch.",
          hint: "Click in the reminders. Layout tab › Page Setup group › Columns › More Columns… › Spacing 0.3\" › check Line between › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "columns", values: { line: true, spacing: 0.3 } },
              requires: { selection: [...REMINDERS, REMINDERS.join(",")] },
              selectHint: "Click in one of the reminders first, so the change applies to that section.",
            },
          ],
        },
        {
          instruction: "Remove the column break you added.",
          hint: "With Show/Hide ¶ on (Home tab › Paragraph group), click the Column Break line and press Delete.",
          steps: [
            {
              action: { kind: "command", id: "edit.delete" },
              requires: { selection: "br1" },
              selectHint: "Turn on Show/Hide ¶ so the column break shows, then click the Column Break line.",
            },
          ],
        },
        {
          instruction: "Change the reminders section back to one column.",
          hint: "Click in the reminders. Layout tab › Page Setup group › Columns › One.",
          steps: [
            {
              action: { kind: "command", id: "layout.columns", value: "One" },
              alt: [{ kind: "dialog", id: "columns", values: { num: 1 } }, { kind: "dialog", id: "columns", values: { preset: "One" } }],
              requires: { selection: [...REMINDERS, REMINDERS.join(",")] },
              selectHint: "Click in one of the reminders first.",
            },
          ],
        },
      ],
    },
  ],
};
