import type { ExcelSheet, SimDefinition } from "@/types/sim";
import { DATE, grid, MONEY, serial } from "./helpers";

/* ------------------------------------------------------------------ */
/* Practice data                                                       */
/* ------------------------------------------------------------------ */

function monthSheet(name: string, amounts: number[]): ExcelSheet {
  const cats = ["Exam room supplies", "Gloves and PPE", "Lab supplies", "Office supplies", "Cleaning supplies", "Linens and gowns"];
  return {
    name,
    colWidths: { A: 150, B: 90 },
    cells: {
      ...grid("A1", [["Category", "Amount"], ...cats.map((c, i) => [c, amounts[i]])], { header: true, colFmt: { B: MONEY } }),
      A8: { v: "Total", fmt: { bold: true } },
      B8: { f: "=SUM(B2:B7)", fmt: { numFmt: "Currency", bold: true } },
    },
  };
}

/** A wide 30-row report for the printing lesson. */
function printReport(): ExcelSheet {
  const depts = ["Family Medicine", "Pediatrics", "Cardiology", "Laboratory", "Front Desk"];
  const items: [string, string, string, number][] = [
    ["Nitrile gloves (M)", "McKesson", "MCK14-6852", 7.25],
    ["Exam table paper", "Medline Industries", "NON24327", 18.5],
    ["Alcohol prep pads", "Cardinal Health", "CAR5110", 4.4],
    ["Specimen cups", "Cardinal Health", "CAR2014", 22.4],
    ["Disinfecting wipes", "Henry Schein", "HS112-3366", 8.75],
    ["Copy paper, case", "Staples Business", "STP-1022", 42.99],
  ];
  const approvers = ["R. Alvarez", "T. Nguyen", "K. Brooks"];
  const rows: (string | number)[][] = [["Date", "Department", "Item", "Vendor", "Catalog #", "Qty", "Unit Cost", "Total", "Approved By"]];
  for (let i = 0; i < 30; i++) {
    const [item, vendor, cat, cost] = items[i % items.length];
    const r = i + 2;
    rows.push([serial(9, 1 + i), depts[i % depts.length], item, vendor, cat, 4 + ((i * 7) % 23), cost, `=F${r}*G${r}`, approvers[i % 3]]);
  }
  return {
    name: "Supply Report",
    rows: 34,
    colWidths: { A: 78, B: 112, C: 128, D: 124, E: 86, F: 42, G: 72, H: 82, I: 90 },
    cells: grid("A1", rows, { header: true, colFmt: { A: DATE, G: MONEY, H: MONEY } }),
  };
}

/* ------------------------------------------------------------------ */
/* Module 3                                                            */
/* ------------------------------------------------------------------ */

export const excelModule3Sims: Record<string, SimDefinition[]> = {
  "module-3::working-with-multiple-worksheets": [
    {
      id: "excel-m3-multiple-worksheets-1",
      app: "excel",
      title: "Organize the quarterly supply workbook",
      scenario:
        "You are rebuilding the Q1 supply workbook at Lakeside Medical Associates so each sheet has one job: monthly data sheets, a summary, and no leftover notes.",
      fileName: "Q1 Supply Spending.xlsx",
      minutes: 6,
      initial: {
        active: "January",
        sheets: [
          monthSheet("January", [4210.4, 1965.25, 1180.25, 642.1, 455.8, 310]),
          monthSheet("February", [3985.15, 2104.6, 1402.6, 588.75, 498.2, 295.5]),
          monthSheet("March", [4620.8, 2230.45, 1255.9, 701.3, 512.65, 342.25]),
          {
            name: "Expenses Summary",
            colWidths: { A: 120, B: 100 },
            cells: {
              ...grid("A1", [["Month", "Total"], ["January", null], ["February", "=February!B8"], ["March", "=March!B8"]], { header: true, colFmt: { B: MONEY } }),
              A5: { v: "Q1 Total", fmt: { bold: true } },
              B5: { f: "=SUM(B2:B4)", fmt: { numFmt: "Currency", bold: true } },
            },
          },
          { name: "Old Notes", colWidths: { A: 300 }, cells: { A1: { v: "Draft totals from last year. Superseded." } } },
        ],
      },
      tasks: [
        {
          instruction: "Insert a new worksheet directly after the March sheet.",
          hint: "Click the March tab, then click New sheet (+) to the right of the tabs: the new sheet goes after the active one. (Shift+F11 and Home › Insert › Insert Sheet put the new sheet in front of the active one, so use them with the Expenses Summary tab active.)",
          steps: [
            {
              action: { kind: "command", id: "sheet.add" },
              alt: [{ kind: "command", id: "home.insert", value: "Insert Sheet", requires: { sheet: "Expenses Summary" } }],
              requires: { sheet: "March" },
              selectHint: "Click the March tab first: a new sheet is added after the active sheet.",
            },
          ],
        },
        {
          instruction: "Rename the new sheet \"Q1 Summary\".",
          hint: "Double-click the Sheet6 tab (or right-click › Rename), type Q1 Summary and press Enter.",
          steps: [{ action: { kind: "type", target: "sheet:Sheet6", value: "Q1 Summary" } }],
        },
        {
          instruction: "On the Expenses Summary sheet, in B2, enter a formula that shows the January total from cell B8 of the January sheet.",
          hint: "Click the Expenses Summary tab, click B2, type =January!B8 and press Enter.",
          steps: [
            {
              action: { kind: "type", target: "B2", value: ["=January!B8", "='January'!B8"], match: "formula" },
              requires: { sheet: "Expenses Summary" },
              selectHint: "Switch to the Expenses Summary sheet first.",
            },
          ],
        },
        {
          instruction: "Move the Expenses Summary sheet so it is the last sheet in the workbook.",
          hint: "Drag the Expenses Summary tab to the right of Old Notes (or right-click it › Move or Copy, keep Before sheet as (move to end), OK).",
          steps: [
            {
              action: { kind: "command", id: "sheet.move", value: "Expenses Summary@6" },
              alt: [{ kind: "dialog", id: "moveCopySheet", values: { before: "(move to end)", copy: false } }],
              requires: { sheet: "Expenses Summary" },
              selectHint: "Click the Expenses Summary tab first.",
            },
          ],
        },
        {
          instruction: "Use Move or Copy to make a copy of the Expenses Summary sheet at the end of the workbook.",
          hint: "Right-click the Expenses Summary tab › Move or Copy. Leave Before sheet as (move to end), check Create a copy, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "moveCopySheet", values: { before: "(move to end)", copy: true } },
              alt: [{ kind: "command", id: "sheet.duplicate" }],
              requires: { sheet: "Expenses Summary" },
              selectHint: "Click the Expenses Summary tab first.",
            },
          ],
        },
        {
          instruction: "Color the January tab Blue and the February tab Red.",
          hint: "Right-click the January tab › Tab Color › Blue. Then right-click the February tab › Tab Color › Red. (Or Home tab › Format › Tab Color.)",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "sheet.tabColor", value: "Blue" },
              alt: [{ kind: "command", id: "home.format", value: "Tab Color: Blue" }],
              requires: { sheet: "January" },
              selectHint: "Right-click the January tab to color it.",
            },
            {
              action: { kind: "command", id: "sheet.tabColor", value: "Red" },
              alt: [{ kind: "command", id: "home.format", value: "Tab Color: Red" }],
              requires: { sheet: "February" },
              selectHint: "Right-click the February tab to color it.",
            },
          ],
        },
        {
          instruction: "Delete the Old Notes sheet.",
          hint: "Right-click the Old Notes tab › Delete (or Home tab › Cells group › Delete › Delete Sheet).",
          steps: [
            {
              action: { kind: "command", id: "sheet.delete" },
              alt: [{ kind: "command", id: "home.delete", value: "Delete Sheet" }],
              requires: { sheet: "Old Notes" },
              selectHint: "Right-click the Old Notes tab (or click it first).",
            },
          ],
        },
      ],
    },
  ],

  "module-3::find-and-replace": [
    {
      id: "excel-m3-find-replace-1",
      app: "excel",
      title: "Standardize names in the supply log",
      scenario:
        "Vendor and department names in the supply log were typed five different ways. Clean them up with Find and Replace, constraining each search so nothing else changes.",
      fileName: "Supply Log.xlsx",
      minutes: 5,
      initial: {
        active: "Supply Log",
        sheets: [
          {
            name: "Supply Log",
            colWidths: { A: 78, B: 150, C: 124, D: 120, E: 104, F: 80 },
            cells: grid(
              "A1",
              [
                ["Date", "Item", "Vendor", "Department", "Ordered By", "Amount"],
                [serial(9, 2), "BD syringe 3 mL", "Med", "Family Medicine", "Mark Lewis", 84.5],
                [serial(9, 3), "Abdominal pads", "MedSupply Co", "Physical Therapy", "Crystal Lewis", 62.4],
                [serial(9, 4), "Nitrile gloves (M)", "McKesson", "Pediatrics", "Tanya Reed", 217.5],
                [serial(9, 8), "BD insulin syringe", "Med", "Family Medicine", "Mark Lewis", 145],
                [serial(9, 9), "Disinfecting wipes", "Henry Schein", "Facilities", "Omar Haddad", 131.25],
                [serial(9, 10), "Exam table paper", "Medline Industries", "Pediatrics", "Tanya Reed", 222],
                [serial(9, 11), "Specimen cups", "Cardinal Health", "Laboratory", "Grace Park", 224],
                [serial(9, 14), "Gauze pads 4x4", "Med", "Physical Therapy", "Mark Lewis", 176.4],
                [serial(9, 15), "Hand sanitizer 1 L", "Henry Schein", "Facilities", "Omar Haddad", 100.8],
                [serial(9, 16), "Patient gowns", "Medline Industries", "Family Medicine", "Tanya Reed", 260],
                [serial(9, 17), "Urine test strips", "McKesson", "Laboratory", "Grace Park", 125],
                [serial(9, 18), "Alcohol prep pads", "MedSupply Co", "Pediatrics", "Crystal Kim", 88],
                [serial(9, 21), "Sharps container", "Cardinal Health", "Family Medicine", "Mark Lewis", 66],
                [serial(9, 22), "Exam gloves (L)", "Henry Schein", "Cardiology", "Omar Haddad", 145],
                [serial(9, 23), "ECG electrodes", "McKesson", "Cardiology", "Grace Park", 93.6],
              ],
              { header: true, colFmt: { A: DATE, F: MONEY } },
            ),
          },
          {
            name: "Budget",
            colWidths: { A: 140, B: 90 },
            cells: grid("A1", [["Department", "Q4 Budget"], ["Family Medicine", 18500], ["Pediatrics", 12400], ["Physical Therapy", 6800], ["Laboratory", 7600], ["Cardiology", 9800], ["Facilities", 6300]], { header: true, colFmt: { B: MONEY } }),
          },
        ],
      },
      tasks: [
        {
          instruction: "Find every cell on the sheet that contains \"Henry Schein\".",
          hint: "Press Ctrl+F (or Home tab › Editing group › Find & Select › Find). Type Henry Schein and click Find All.",
          steps: [{ action: { kind: "dialog", id: "find", values: { find: "Henry Schein" } } }],
        },
        {
          instruction: "Replace the vendor abbreviation \"Med\" with \"Medline Industries\" only in cells that contain exactly \"Med\", so \"MedSupply Co\" is not changed.",
          hint: "Press Ctrl+H. Find what: Med. Replace with: Medline Industries. Check Match entire cell contents, then Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Med", replace: "Medline Industries", entireCell: true } } }],
        },
        {
          instruction: "Replace \"BD\" with \"Becton Dickinson\" so the syringe names change but \"Abdominal pads\" does not.",
          hint: "Press Ctrl+H. Find what: BD. Replace with: Becton Dickinson. Check Match case (uppercase BD only), then Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "BD", replace: "Becton Dickinson", matchCase: true } } }],
        },
        {
          instruction: "Crystal Lewis changed her last name. Replace \"Crystal Lewis\" with \"Crystal Taylor\" without changing Mark Lewis or Crystal Kim.",
          hint: "Press Ctrl+H. Find what: Crystal Lewis (the full name). Replace with: Crystal Taylor. Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Crystal Lewis", replace: "Crystal Taylor" } } }],
        },
        {
          instruction: "Replace \"Physical Therapy\" with \"Rehab Services\" on every sheet in the workbook.",
          hint: "Press Ctrl+H. Find what: Physical Therapy. Replace with: Rehab Services. Set Within to Workbook, then Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Physical Therapy", replace: "Rehab Services", within: "Workbook" } } }],
        },
      ],
    },
  ],

  "module-3::checking-spelling": [
    {
      id: "excel-m3-checking-spelling-1",
      app: "excel",
      title: "Proof the supply request before it goes out",
      scenario:
        "The quarterly supply request goes to the vendor today. Spell check the item names, keep correct drug names from being flagged again, and add a rule that stops impossible quantities at entry.",
      fileName: "Supply Request.xlsx",
      minutes: 5,
      initial: {
        active: "Request",
        sheets: [
          {
            name: "Request",
            colWidths: { A: 140, B: 80, C: 70, D: 90 },
            cells: grid(
              "A1",
              [
                ["Item", "Category", "Unit", "Qty Requested"],
                ["Nitrile gloves", "Medical", "Box", 30],
                [{ v: "Sryinges", spell: ["Syringes", "Syringe"] }, "Medical", "Box", 12],
                ["Gauze pads", "Medical", "Box", 18],
                [{ v: "Mupirocin", spell: ["Mupirocins", "Muirocin"] }, "Pharmacy", "Tube", 24],
                ["Alcohol prep pads", "Medical", "Box", 20],
                [{ v: "Bandges", spell: ["Bandages", "Bandage"] }, "Medical", "Box", 15],
                [{ v: "Mupirocin", spell: ["Mupirocins", "Muirocin"] }, "Pharmacy", "Tube", 12],
                ["Specimen cups", "Lab", "Case", 10],
                ["Exam table paper", "Medical", "Case", 6],
                ["Lidocaine", "Pharmacy", "Vial", 20],
                ["Disinfecting wipes", "Cleaning", "Canister", 18],
                ["Hand sanitizer", "Cleaning", "Bottle", 8],
                ["Urine test strips", "Lab", "Bottle", 4],
                ["Patient gowns", "Medical", "Pack", 10],
              ],
              { header: true },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Run spell check on the request sheet.",
          hint: "Review tab › Proofing group › Spelling (or press F7).",
          steps: [{ action: { kind: "command", id: "review.spelling" } }],
        },
        {
          instruction: "Correct \"Sryinges\" to \"Syringes\".",
          hint: "In the Spelling pane, select Syringes in Suggestions and click Change.",
          steps: [{ action: { kind: "command", id: "spelling.change", value: "Syringes" } }],
        },
        {
          instruction: "Mupirocin is a correct drug name that appears more than once. Add it to the dictionary so it is not flagged again.",
          hint: "In the Spelling pane, click Add to Dictionary.",
          steps: [{ action: { kind: "command", id: "spelling.ignore", value: "Add to Dictionary" } }],
        },
        {
          instruction: "Correct \"Bandges\" to \"Bandages\" to finish the spell check.",
          hint: "In the Spelling pane, select Bandages in Suggestions and click Change.",
          steps: [{ action: { kind: "command", id: "spelling.change", value: "Bandages" } }],
        },
        {
          instruction: "Restrict the quantities in D2:D15 to whole numbers between 1 and 500.",
          hint: "Select D2:D15. Data tab › Data Tools group › Data Validation. Allow: Whole number, Data: between, Minimum 1, Maximum 500, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "dataValidation", values: { allow: "Whole number", data: "between", min: "1", max: "500" } },
              requires: { selection: "D2:D15" },
              selectHint: "Select the quantities in D2:D15 first.",
            },
          ],
        },
        {
          instruction: "Add the input message \"Enter a quantity from 1 to 500.\" to the same cells.",
          hint: "Keep D2:D15 selected. Data tab › Data Validation › Input Message tab, type the message, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "dataValidation", values: { inputMessage: "Enter a quantity from 1 to 500." } },
              requires: { selection: "D2:D15" },
              selectHint: "Select D2:D15 first.",
            },
          ],
        },
        {
          instruction: "Write your own error alert for D2:D15: a Stop alert titled \"Invalid Quantity\" that says \"Quantities must be whole numbers from 1 to 500.\"",
          hint: "Keep D2:D15 selected. Data tab › Data Validation › Error Alert tab. Keep Style: Stop, type the Title and the Error message, OK. Typing 1200 in D2 now shows your message.",
          steps: [
            {
              action: { kind: "dialog", id: "dataValidation", values: { errorStyle: "Stop", errorTitle: "Invalid Quantity", errorMessage: "Quantities must be whole numbers from 1 to 500." } },
              requires: { selection: "D2:D15" },
              selectHint: "Select D2:D15 first.",
            },
          ],
        },
      ],
    },
  ],

  "module-3::page-layout-and-printing": [
    {
      id: "excel-m3-page-layout-1",
      app: "excel",
      title: "Make the supply report print properly",
      scenario:
        "Printed as is, the September supply report splits its columns across pages and loses the headers after page one. Set it up so it reads as a document on paper.",
      fileName: "September Supply Report.xlsx",
      minutes: 6,
      initial: { active: "Supply Report", sheets: [printReport()] },
      tasks: [
        {
          instruction: "Set the print area to A1:I31.",
          hint: "Select A1:I31. Page Layout tab › Page Setup group › Print Area › Set Print Area.",
          steps: [{ action: { kind: "command", id: "layout.printArea", value: "Set Print Area" }, requires: { selection: "A1:I31" }, selectHint: "Select A1:I31 first." }],
        },
        {
          instruction: "Repeat row 1 at the top of every printed page.",
          hint: "Page Layout tab › Page Setup group › Print Titles. On the Sheet tab, type $1:$1 in Rows to repeat at top, then OK.",
          steps: [{ action: { kind: "dialog", id: "pageSetupSheet", values: { printTitles: ["$1:$1", "1:1", "$1:1", "1:$1"] } } }],
        },
        {
          instruction: "Change the page orientation to Landscape.",
          hint: "Page Layout tab › Page Setup group › Orientation › Landscape.",
          steps: [
            {
              action: { kind: "command", id: "layout.orientation", value: "Landscape" },
              alt: [{ kind: "dialog", id: "pageSetupSheet", values: { orientation: "Landscape" } }],
            },
          ],
        },
        {
          instruction: "Set the margins to Narrow.",
          hint: "Page Layout tab › Page Setup group › Margins › Narrow.",
          steps: [{ action: { kind: "command", id: "layout.margins", value: "Narrow" } }],
        },
        {
          instruction: "Insert a page break so that rows 1 through 20 print on the first page.",
          hint: "Click A21 (or select row 21). Page Layout tab › Page Setup group › Breaks › Insert Page Break.",
          steps: [
            {
              action: { kind: "command", id: "layout.breaks", value: "Insert Page Break" },
              requires: { selection: ["A21", "21:21"] },
              selectHint: "Select A21 or the row 21 header: the break goes above the selection.",
            },
          ],
        },
        {
          instruction: "Check the pages in Page Break Preview.",
          hint: "View tab › Workbook Views group › Page Break Preview (or the status bar button).",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Page Break Preview" } }],
        },
        {
          instruction: "Print 2 copies with all columns fit on one page.",
          hint: "File tab › Print (Ctrl+P). Set Copies to 2, change No Scaling to Fit All Columns on One Page, then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 2, scaling: "Fit All Columns on One Page" } } }],
        },
      ],
    },
  ],

  "module-3::comments-and-coauthoring": [
    {
      id: "excel-m3-comments-1",
      app: "excel",
      title: "Explain the numbers in the supply forecast",
      scenario:
        "Your FY27 supply forecast has a few figures that will look like errors in six months unless the reasoning is recorded next to them. Annotate it, then share it with the lab manager for review.",
      fileName: "FY27 Supply Forecast.xlsx",
      minutes: 5,
      initial: {
        active: "Forecast",
        sheets: [
          {
            name: "Forecast",
            colWidths: { A: 150, B: 96, C: 104, D: 86 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Category", "FY26 Actual", "FY27 Forecast", "Change"],
                  ["Exam room supplies", 18420, 19200, "=C2/B2-1"],
                  ["Office supplies", 2915, 2800, "=C3/B3-1"],
                  ["Linens and gowns", 4105, 4300, "=C4/B4-1"],
                  ["Gloves and PPE", 9650, 13510, "=C5/B5-1"],
                  ["Cleaning supplies", 3880, 4000, "=C6/B6-1"],
                  ["Vaccine storage", 2230, 2400, "=C7/B7-1"],
                  ["Lab supplies", 7240, 8100, "=C8/B8-1"],
                  ["Paper goods", 1310, 1380, "=C9/B9-1"],
                  ["Equipment repair", 1630, 1800, "=C10/B10-1"],
                ],
                { header: true, colFmt: { B: MONEY, C: MONEY, D: { numFmt: "Percentage", decimals: 1 } } },
              ),
              D4: { f: "=C4/B4-1", fmt: { numFmt: "Percentage", decimals: 1 }, comment: "Is this right? Check with Sam." },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Add a comment to C5 that reads \"New vendor contract costs 40% more.\"",
          hint: "Click C5. Review tab › Comments group › New Comment (or right-click › New Comment), type the text, and click Post.",
          steps: [
            {
              action: { kind: "dialog", id: "newComment", values: { text: "New vendor contract costs 40% more." } },
              requires: { selection: "C5" },
              selectHint: "Click C5, the gloves forecast, first.",
            },
          ],
        },
        {
          instruction: "Add a note to B2 that reads \"Source: vendor invoice 4471\".",
          hint: "Click B2. Review tab › Notes › New Note (or Shift+F2), type the text, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "newNote", values: { text: "Source: vendor invoice 4471" } },
              requires: { selection: "B2" },
              selectHint: "Click B2 first.",
            },
          ],
        },
        {
          instruction: "Add a comment to C8 that mentions the lab manager: \"@Maria Lopez please confirm the lab order.\"",
          hint: "Click C8. Review tab › New Comment, type the text starting with @Maria Lopez, and click Post.",
          steps: [
            {
              action: { kind: "dialog", id: "newComment", values: { text: "@Maria Lopez please confirm the lab order." } },
              requires: { selection: "C8" },
              selectHint: "Click C8, the lab supplies forecast, first.",
            },
          ],
        },
        {
          instruction: "Delete the outdated comment in D4.",
          hint: "Click D4. Review tab › Comments group › Delete.",
          steps: [{ action: { kind: "command", id: "review.deleteComment" }, requires: { selection: "D4" }, selectHint: "Click D4, the cell with the old comment, first." }],
        },
        {
          instruction: "Show all notes on the sheet.",
          hint: "Review tab › Notes › Show All Notes.",
          steps: [{ action: { kind: "command", id: "review.showNotes" } }],
        },
        {
          instruction: "Share the workbook with maria.lopez@lakesidemedical.example so she can edit it.",
          hint: "File tab › Share. Type her address, keep Can edit, and click Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "maria.lopez@lakesidemedical.example", permission: "Can edit" } } }],
        },
        {
          instruction: "Open Version History to see the earlier versions of the forecast.",
          hint: "File tab › Info › Version History.",
          steps: [{ action: { kind: "command", id: "file.versionHistory" } }],
        },
      ],
    },
  ],

  "module-3::inspecting-and-protecting-workbooks": [
    {
      id: "excel-m3-inspect-protect-1",
      app: "excel",
      title: "Lock the formulas in the shared supply tracker",
      scenario:
        "Three staff members type quantities and prices into this tracker every day, and two formula cells have already been typed over. Unlock the entry cells, protect the sheet, and finalize the file before sharing.",
      fileName: "Shared Supply Tracker.xlsx",
      minutes: 5,
      initial: {
        active: "Tracker",
        sheets: [
          {
            name: "Tracker",
            colWidths: { A: 150, B: 60, C: 84, D: 92 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Item", "Qty", "Unit Price", "Line Total"],
                  ["Nitrile gloves (M)", 30, 7.25, "=B2*C2"],
                  ["Exam table paper", 12, 18.5, "=B3*C3"],
                  ["Alcohol prep pads", 20, 4.4, "=B4*C4"],
                  ["Gauze pads 4x4", 18, 9.8, "=B5*C5"],
                  ["Sharps container", 6, 11, "=B6*C6"],
                  ["Specimen cups", 10, 22.4, "=B7*C7"],
                  ["Disinfecting wipes", 15, 8.75, "=B8*C8"],
                  ["Hand sanitizer 1 L", 8, 12.6, "=B9*C9"],
                  ["Patient gowns", 10, 26, "=B10*C10"],
                  ["Urine test strips", 4, 31.25, "=B11*C11"],
                  ["Thermometer covers", 40, 2.9, "=B12*C12"],
                  ["Tongue depressors", 15, 3.6, "=B13*C13"],
                ],
                { header: true, colFmt: { C: MONEY, D: MONEY } },
              ),
              A14: { v: "Total", fmt: { bold: true } },
              D14: { f: "=SUM(D2:D13)", fmt: { numFmt: "Currency", bold: true } },
              B5: { v: 18, comment: "Who changed this? -T" },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Unlock the data entry cells B2:C13 so staff can still type in them after the sheet is protected.",
          hint: "Select B2:C13 and press Ctrl+1. On the Protection tab, clear Locked, then OK.",
          steps: [
            {
              action: { kind: "dialog", id: "formatCells", values: { locked: false } },
              requires: { selection: "B2:C13" },
              selectHint: "Select the quantity and price cells, B2:C13, first.",
            },
          ],
        },
        {
          instruction: "Give B2:C13 a Yellow fill (Standard Colors) so everyone can see which cells are for typing.",
          hint: "Keep B2:C13 selected. Home tab › Font group › Fill Color arrow › Yellow under Standard Colors.",
          steps: [{ action: { kind: "command", id: "home.fill", value: "#FFFF00" }, requires: { selection: "B2:C13" }, selectHint: "Select B2:C13 first." }],
        },
        {
          instruction: "Protect the Tracker sheet without a password, leaving Select unlocked cells allowed.",
          hint: "Review tab › Protect group › Protect Sheet. Leave the password blank, keep Select unlocked cells checked, OK.",
          steps: [{ action: { kind: "dialog", id: "protectSheet", values: { password: "", selectUnlocked: true } } }],
        },
        {
          instruction: "Check that entry still works: change the quantity in B6 to 8.",
          hint: "Click B6, type 8 and press Enter. Unlocked cells accept typing; the Line Total cells do not.",
          steps: [{ action: { kind: "type", target: "B6", value: "8" } }],
        },
        {
          instruction: "Run the Document Inspector to find the stray comment and personal information before you share the file.",
          hint: "File tab › Info › Inspect Workbook › Inspect Workbook.",
          steps: [{ action: { kind: "command", id: "file.inspect", value: "Inspect Workbook" } }],
        },
        {
          instruction: "Mark the workbook as final.",
          hint: "File tab › Info › Protect Workbook › Mark as Final.",
          steps: [{ action: { kind: "command", id: "file.protect", value: "Mark as Final" } }],
        },
      ],
    },
  ],
};
