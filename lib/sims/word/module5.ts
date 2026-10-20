import type { SimDefinition } from "@/types/sim";

/** Word Module 5: Tables, Charts & Mail Merge. */

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

/** Selection keys inside one column of a table. */
function colCells(id: string, col: number, rows: number): string[] {
  return [`${id}.r0c${col}`, ...Array.from({ length: rows }, (_, i) => `${id}.r${i + 1}c${col}`)];
}

export const wordModule5Sims: Record<string, SimDefinition[]> = {
  "module-5::inserting-tables": [
    {
      id: "word-m5-inserting-tables-1",
      app: "word",
      title: "Build the provider schedule as a real table",
      scenario:
        "The weekly provider schedule at Lakeside Medical Associates was lined up with tabs and spaces, and it falls apart every time a name gets longer. Rebuild it as a table, and turn the exam room list into one too.",
      fileName: "Weekly Provider Schedule.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Weekly Provider Schedule" },
          { id: "p2", style: "Subtitle", text: "Week of November 2, 2026 · Lakeside Medical Associates" },
          { id: "p3", style: "Heading 1", text: "Clinic Hours by Provider" },
          { id: "p4", style: "Heading 1", text: "Exam Room Assignments" },
          { id: "p5", text: "Room, Provider, Medical Assistant" },
          { id: "p6", text: "Room 1, Dr. Lena Ortiz, Ana Torres" },
          { id: "p7", text: "Room 2, Dr. Samuel Greene, Jordan Ellis" },
          { id: "p8", text: "Room 3, Kim Nguyen NP, Priya Shah" },
          { id: "p9", italic: true, text: "Changes to this schedule must be approved by the office manager." },
        ],
      },
      tasks: [
        {
          instruction: "Insert a table with 4 columns and 3 rows directly below the heading “Clinic Hours by Provider”.",
          hint: "Click the heading “Clinic Hours by Provider”. Insert tab › Tables group › Table › drag across 4 columns and down 3 rows (4 × 3 Table). Insert Table… with 4 columns and 3 rows works too.",
          steps: [
            {
              action: { kind: "command", id: "insert.table", value: "4x3" },
              alt: [{ kind: "dialog", id: "insertTable", values: { cols: 4, rows: 3 } }],
              requires: { selection: "p3" },
              selectHint: "Click the heading “Clinic Hours by Provider” first, so the table goes right below it.",
            },
          ],
        },
        {
          instruction: "Type the column headings “Provider”, “Monday”, “Wednesday”, and “Friday” across the first row.",
          hint: "Click the first cell and type Provider. Press Tab to move to the next cell, type Monday, and so on.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "tbl1.r1c1", value: "Provider" } },
            { action: { kind: "type", target: "tbl1.r1c2", value: "Monday" } },
            { action: { kind: "type", target: "tbl1.r1c3", value: "Wednesday" } },
            { action: { kind: "type", target: "tbl1.r1c4", value: "Friday" } },
          ],
        },
        {
          instruction: "In the second row, type “Dr. Lena Ortiz” in the first cell and “8 AM to 4 PM” in the cell under Monday.",
          hint: "Click the first cell of the second row, type the name, press Tab, then type the hours.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "tbl1.r2c1", value: "Dr. Lena Ortiz" } },
            { action: { kind: "type", target: "tbl1.r2c2", value: ["8 AM to 4 PM", "8 am to 4 pm"] } },
          ],
        },
        {
          instruction: "Add a fourth row to the end of the table.",
          hint: "Click the last cell of the table (bottom right) and press Tab. (Or click in the last row, then Table Layout tab › Rows & Columns › Insert Below.)",
          steps: [
            {
              action: { kind: "command", id: "table.insertBelow" },
              requires: { selection: rowCells("tbl1", 3, 4) },
              selectHint: "Click in the last row of the table first (the bottom-right cell if you want to use Tab).",
            },
          ],
        },
        {
          instruction: "Convert the four comma-separated lines under “Exam Room Assignments” into a table.",
          hint: "Select the four lines (click “Room, Provider…”, then Shift+click “Room 3…”). Insert tab › Table › Convert Text to Table… › Separate text at: Commas › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "convertTextToTable", values: { separator: "Commas" } },
              requires: { selection: "p5,p6,p7,p8" },
              selectHint: "Select all four comma-separated lines first: click the first line, then Shift+click the last.",
            },
          ],
        },
        {
          instruction: "Set the first row of the room assignments table to repeat as a header row at the top of each page.",
          hint: "Click in the first row of the new table. Table Layout tab › Data group › Repeat Header Rows.",
          steps: [
            {
              action: { kind: "command", id: "table.repeatHeader" },
              requires: { selection: rowCells("tbl2", 1, 3) },
              selectHint: "Click in the first row of the room assignments table first.",
            },
          ],
        },
      ],
    },
  ],

  "module-5::modifying-tables": [
    {
      id: "word-m5-modifying-tables-1",
      app: "word",
      title: "Make the supply report table readable",
      scenario:
        "The quarterly supply report table is accurate, but nobody can read it: the title is stuck in one small cell, an old column no one uses takes up space, and every column is the same width. Fix the structure so the table does the reading work.",
      fileName: "Quarterly Supply Report.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Quarterly Supply Report" },
          { id: "p2", style: "Subtitle", text: "Third quarter, July through September 2026 · Prepared for the office manager" },
          { id: "p4", style: "Heading 1", text: "Spending by Item" },
          { id: "p5", text: "The table lists every supply ordered more than once this quarter. Costs are the quarter's totals." },
          {
            id: "tbl1",
            kind: "table",
            table: {
              style: "Table Grid",
              rows: [
                ["Q3 Supply Spending", "", "", "", ""],
                ["Item", "Old SKU", "Units Ordered", "Cost", "Notes"],
                ["Exam table paper", "EX-1102", "40 rolls", "$312.00", "Switched supplier in August"],
                ["Nitrile gloves (M)", "GL-2210", "60 boxes", "$540.00", "Price went up 8%"],
                ["Alcohol prep pads", "AP-0450", "30 boxes", "$96.00", ""],
                ["Specimen cups", "SC-7781", "500 cups", "$185.00", "Bought in bulk"],
              ],
            },
          },
          { id: "p3", text: "Totals do not include shipping. Gloves will be reordered in October." },
          { id: "p6", style: "Heading 1", text: "Next Steps" },
          { id: "p7", text: "Compare glove prices from two suppliers before the October order, and move specimen cups to a standing monthly order." },
        ],
      },
      tasks: [
        {
          instruction: "Insert a row directly below the “Nitrile gloves (M)” row.",
          hint: "Click in the “Nitrile gloves (M)” row. Table Layout tab › Rows & Columns group › Insert Below (or right-click › Insert Rows Below).",
          steps: [
            {
              action: { kind: "command", id: "table.insertBelow" },
              requires: { selection: rowCells("tbl1", 4, 5) },
              selectHint: "Click in the “Nitrile gloves (M)” row first.",
            },
          ],
        },
        {
          instruction: "In the first cell of the new row, type “Nitrile gloves (L)”.",
          hint: "Double-click the first cell of the empty row (or click it and start typing), type Nitrile gloves (L), and press Enter.",
          steps: [{ action: { kind: "type", target: "tbl1.r5c1", value: "Nitrile gloves (L)" } }],
        },
        {
          instruction: "Delete the “Old SKU” column.",
          hint: "Click in the Old SKU column. Table Layout tab › Rows & Columns group › Delete › Delete Columns (or right-click › Delete Column).",
          steps: [
            {
              action: { kind: "command", id: "table.delete", value: "Delete Columns" },
              requires: { selection: colCells("tbl1", 2, 7) },
              selectHint: "Click in the “Old SKU” column first.",
            },
          ],
        },
        {
          instruction: "Merge the cells of the first row so “Q3 Supply Spending” spans the whole table.",
          hint: "Click in the first row, then Table Layout tab › Table group › Select › Select Row. Then Table Layout tab › Merge group › Merge Cells.",
          steps: [
            {
              action: { kind: "command", id: "table.merge" },
              requires: { selection: "tbl1.r1c0" },
              selectHint: "Select the whole first row first: click in it, then Table Layout tab › Select › Select Row.",
            },
          ],
        },
        {
          instruction: "Resize every column of the table to fit its contents.",
          hint: "Click anywhere in the table. Table Layout tab › Cell Size group › AutoFit › AutoFit Contents.",
          steps: [
            {
              action: { kind: "command", id: "table.autofit", value: "AutoFit Contents" },
              requires: { selection: anyCell("tbl1", 7, 4) },
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
              requires: { selection: anyCell("tbl1", 7, 4) },
              selectHint: "Click anywhere inside the table first.",
            },
          ],
        },
      ],
    },
  ],

  "module-5::inserting-charts": [
    {
      id: "word-m5-inserting-charts-1",
      app: "word",
      title: "Chart the supply spending trend",
      scenario:
        "The quarterly operations report needs to show how supply spending changed over six months. A colleague used a pie chart, which shows parts of a whole and cannot show a trend. Fix that chart, then add a chart that compares visits across departments.",
      fileName: "Q3 Operations Report.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Q3 Operations Report" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Prepared October 2026" },
          { id: "p3", style: "Heading 1", text: "Supply Spending, April to September" },
          { id: "p4", text: "Supply spending rose through the summer as the practice prepared for flu season. The chart shows the monthly total in dollars." },
          {
            id: "ch1",
            kind: "chart",
            chart: {
              type: "Pie",
              title: "Supply Spending",
              series: [
                { label: "Apr", value: 4200 },
                { label: "May", value: 4350 },
                { label: "Jun", value: 4800 },
                { label: "Jul", value: 5100 },
                { label: "Aug", value: 5600 },
                { label: "Sep", value: 6150 },
              ],
            },
          },
          { id: "p5", style: "Heading 1", text: "Patient Visits by Department" },
          { id: "p6", text: "Primary care saw the most visits this quarter, followed by pediatrics and women's health." },
          { id: "p7", italic: true, text: "Prepared by the practice operations team." },
        ],
      },
      tasks: [
        {
          instruction: "Change the supply spending chart to a Line chart so it shows the trend over time.",
          hint: "Click the chart. Chart Design tab › Type group › Change Chart Type › Line.",
          steps: [
            {
              action: { kind: "command", id: "chart.type", value: "Line" },
              requires: { selection: "ch1" },
              selectHint: "Click the supply spending chart first.",
            },
          ],
        },
        {
          instruction: "Change the chart title to “Monthly Supply Spending, April to September 2026”.",
          hint: "Double-click the chart title, type the new title, and press Enter.",
          steps: [{ action: { kind: "type", target: "ch1", value: "Monthly Supply Spending, April to September 2026" } }],
        },
        {
          instruction: "Add data labels to the line chart so each month's total is shown.",
          hint: "Click the chart. Chart Design tab › Chart Layouts group › Add Chart Element › Data Labels.",
          steps: [
            {
              action: { kind: "command", id: "chart.addElement", value: "Data Labels" },
              requires: { selection: "ch1" },
              selectHint: "Click the line chart first.",
            },
          ],
        },
        {
          instruction: "Apply chart Style 4 to the line chart.",
          hint: "With the chart selected: Chart Design tab › Chart Styles gallery › Style 4.",
          steps: [
            {
              action: { kind: "command", id: "chart.style", value: "Style 4" },
              requires: { selection: "ch1" },
              selectHint: "Click the line chart first.",
            },
          ],
        },
        {
          instruction: "Below the paragraph that begins “Primary care saw”, insert a Clustered Column chart. (The department visit counts are filled in for you.)",
          hint: "Click the paragraph that begins “Primary care saw”. Insert tab › Illustrations group › Chart › Clustered Column › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "insertChart", values: { type: "Clustered Column" } },
              requires: { selection: "p6" },
              selectHint: "Click the paragraph that begins “Primary care saw” first.",
              effects: [
                {
                  op: "merge",
                  path: "paragraphs.ch2.chart",
                  value: {
                    title: "Patient Visits by Department, Q3 2026",
                    series: [
                      { label: "Primary Care", value: 2140 },
                      { label: "Pediatrics", value: 1385 },
                      { label: "Women's Health", value: 960 },
                      { label: "Behavioral Health", value: 610 },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          instruction: "Change the new chart to a Clustered Bar chart so the long department names are easier to read.",
          hint: "Click the new chart. Chart Design tab › Type group › Change Chart Type › Clustered Bar.",
          steps: [
            {
              action: { kind: "command", id: "chart.type", value: "Clustered Bar" },
              requires: { selection: "ch2" },
              selectHint: "Click the new department chart first.",
            },
          ],
        },
      ],
    },
  ],

  "module-5::mail-merge-basics": [
    {
      id: "word-m5-mail-merge-1",
      app: "word",
      title: "Send the annual recall letters",
      scenario:
        "Patients due for their annual wellness visit each need a letter with their own name, address, and appointment date. Typing them one by one would take days and guarantee a wrong name somewhere. Merge one letter with the patient reminder list instead, and check the results before anything prints.",
      fileName: "Annual Recall Letter.docx",
      minutes: 6,
      initial: {
        merge: {
          recipients: [
            { First_Name: "Rosa", Last_Name: "Ramirez", Address: "77 Fulton Street, Apt 4B", City: "Brooklyn", State: "NY", ZIP: "11201", Appointment_Date: "November 12, 2026" },
            { First_Name: "Marcus", Last_Name: "Reyes", Address: "1402 Bedford Avenue", City: "Brooklyn", State: "NY", ZIP: "11216", Appointment_Date: "November 13, 2026" },
            { First_Name: "Alicia", Last_Name: "Chen", Address: "18 Clinton Street", City: "Brooklyn", State: "NY", ZIP: "11201", Appointment_Date: "November 16, 2026" },
            { First_Name: "Daniel", Last_Name: "Whitaker", Address: "305 Ocean Parkway", City: "Brooklyn", State: "NY", ZIP: "11218", Appointment_Date: "November 18, 2026" },
          ],
        },
        paragraphs: [
          { id: "p1", bold: true, size: 14, color: "#1F4E79", spaceAfter: 0, text: "Lakeside Medical Associates" },
          { id: "p2", size: 9, color: "#595959", text: "418 Harbor Street, Suite 200 · Brooklyn, NY 11201 · (718) 555-0142" },
          { id: "p3", text: "October 20, 2026" },
          { id: "p4", runs: [{ id: "r1", text: "[Address block]" }] },
          { id: "p5", runs: [{ text: "Dear " }, { id: "r1", text: "[First name]" }, { text: "," }] },
          {
            id: "p6",
            runs: [
              { text: "Our records show that you are due for your annual wellness visit. We have reserved an appointment for you on " },
              { id: "r1", text: "[appointment date]" },
              { text: ". If that day does not work, please call us to choose another time." },
            ],
          },
          { id: "p7", text: "Annual visits help us catch problems early, keep your vaccines up to date, and review your medications with you." },
          { id: "p8", text: "Sincerely," },
          { id: "p9", text: "The Care Team at Lakeside Medical Associates" },
        ],
      },
      tasks: [
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
          instruction: "Replace “[Address block]” with an Address Block merge field.",
          hint: "Click “[Address block]”. Mailings tab › Write & Insert Fields group › Address Block › OK.",
          steps: [
            {
              action: { kind: "command", id: "mail.addressBlock" },
              requires: { selection: ["p4.r1", "p4"] },
              selectHint: "Click “[Address block]” first.",
            },
          ],
        },
        {
          instruction: "Replace “[First name]” in the greeting line with the First_Name merge field.",
          hint: "Click “[First name]”. Mailings tab › Write & Insert Fields group › Insert Merge Field › First_Name.",
          steps: [
            {
              action: { kind: "command", id: "mail.insertField", value: "First_Name" },
              requires: { selection: "p5.r1" },
              selectHint: "Click “[First name]” in the greeting line first.",
            },
          ],
        },
        {
          instruction: "Replace “[appointment date]” with the Appointment_Date merge field.",
          hint: "Click “[appointment date]”. Mailings tab › Insert Merge Field › Appointment_Date.",
          steps: [
            {
              action: { kind: "command", id: "mail.insertField", value: "Appointment_Date" },
              requires: { selection: "p6.r1" },
              selectHint: "Click “[appointment date]” first.",
            },
          ],
        },
        {
          instruction: "Preview the merged letters, then move to the next recipient to check a second letter.",
          hint: "Mailings tab › Preview Results group › Preview Results, then Next Record.",
          steps: [
            { action: { kind: "command", id: "mail.preview" } },
            { action: { kind: "command", id: "mail.next" } },
          ],
        },
        {
          instruction: "Finish the merge by creating the individual letters as a new document you can check before printing.",
          hint: "Mailings tab › Finish group › Finish & Merge › Edit Individual Documents…",
          steps: [{ action: { kind: "command", id: "mail.finish", value: "Edit Individual Documents..." } }],
        },
      ],
    },
  ],
};
