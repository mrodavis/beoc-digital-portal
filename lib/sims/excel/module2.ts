import type { SimDefinition } from "@/types/sim";
import { cells, colCells, column, fmtOnly, grid, MONEY, serial, TITLE } from "./helpers";

/* ------------------------------------------------------------------ */
/* Practice data                                                       */
/* ------------------------------------------------------------------ */

const ORDER_ITEMS: [string, string, number, number][] = [
  ["03-4410", "Exam table paper", 12, 18.5],
  ["03-4412", "Nitrile gloves (M)", 30, 7.25],
  ["05-1180", "Alcohol prep pads", 20, 4.4],
  ["05-1192", "Gauze pads 4x4", 18, 9.8],
  ["07-2201", "Sharps container", 6, 11],
  ["07-2215", "Specimen cups", 10, 22.4],
  ["02-0930", "Patient gowns", 10, 26],
  ["02-0944", "Pillow covers", 24, 3.15],
  ["09-3307", "Thermometer covers", 40, 2.9],
  ["09-3321", "Tongue depressors", 15, 3.6],
  ["", "Urine test strips", 4, 31.25],
];

/** The intro-to-formulas cost sheet: Item, Vendor, Qty, Unit Price, Line Total (blank). */
const COST_ROWS: [string, string, number, number][] = [
  ["Exam table paper", "Medline Industries", 12, 18.5],
  ["Nitrile gloves (M)", "McKesson", 30, 8.25],
  ["Alcohol prep pads", "Cardinal Health", 20, 4.4],
  ["Gauze pads 4x4", "McKesson", 18, 9.8],
  ["Sharps container", "Medline Industries", 6, 11],
  ["Specimen cups", "Cardinal Health", 10, 22.4],
  ["Disinfecting wipes", "Henry Schein", 15, 8.75],
  ["Hand sanitizer 1 L", "Henry Schein", 8, 12.6],
  ["Patient gowns", "Medline Industries", 10, 26],
  ["Urine test strips", "McKesson", 4, 31.25],
];

/* ------------------------------------------------------------------ */
/* Module 2                                                            */
/* ------------------------------------------------------------------ */

export const excelModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::cell-basics": [
    {
      id: "excel-m2-cell-basics-1",
      app: "excel",
      title: "Enter this week's supply orders",
      scenario:
        "You are entering supply orders at Lakeside Medical Associates. The order numbers need to continue, one catalog number keeps losing its leading zero, a cancelled order needs clearing, and the billing office wants a values-only copy of the totals.",
      fileName: "Weekly Supply Orders.xlsx",
      minutes: 6,
      initial: {
        active: "Orders",
        sheets: [
          {
            name: "Orders",
            colWidths: { A: 64, B: 76, C: 140, D: 48, E: 76, F: 82, H: 104 },
            cells: {
              ...grid("A1", [["Order #", "Catalog #", "Item", "Qty", "Unit Price", "Total"]], { header: true }),
              A2: { v: 5101 },
              A3: { v: 5102 },
              ...grid(
                "B2",
                ORDER_ITEMS.map(([cat, item, qty, price]) => [cat || null, item, qty, price]),
                { colFmt: { E: MONEY } },
              ),
              ...column("F", 2, 12, "=D{r}*E{r}", MONEY),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Continue the order number series in A2:A3 down through A12.",
          hint: "Select A2:A3, then drag the fill handle (the small square at the bottom-right corner of the selection) down to A12.",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "A2:A12" },
              requires: { selection: "A2:A3" },
              selectHint: "Select both A2 and A3 first, so Excel can see the pattern (5101, 5102).",
            },
          ],
        },
        {
          instruction: "In B12, enter the catalog number 03-4521 so Excel stores it as text, exactly as typed.",
          hint: "Click B12 and type an apostrophe first: '03-4521, then press Enter. The apostrophe tells Excel to keep the entry as text.",
          steps: [{ action: { kind: "type", target: "B12", value: "'03-4521" } }],
        },
        {
          instruction: "Order 5107 was cancelled. Clear the contents of its quantity and price in D8:E8 without deleting the cells.",
          hint: "Select D8:E8 and press Delete (or Home tab › Editing group › Clear › Clear Contents).",
          steps: [
            {
              action: { kind: "command", id: "edit.clearContents" },
              alt: [{ kind: "command", id: "home.clear", value: "Clear Contents" }],
              requires: { selection: "D8:E8" },
              selectHint: "Select D8:E8, the quantity and price for order 5107.",
            },
          ],
        },
        {
          instruction: "Insert a new blank row above row 6 for a rush order.",
          hint: "Right-click the row 6 header › Insert (or select row 6 and use Home tab › Cells group › Insert › Insert Sheet Rows).",
          steps: [
            {
              action: { kind: "command", id: "home.insert", value: "Insert Sheet Rows" },
              requires: { selection: ["6:6", ...cells("A6:F6")] },
              selectHint: "Click the row 6 header (or any cell in row 6) first.",
            },
          ],
        },
        {
          instruction: "Copy the order totals in F2:F13 and paste them as values only, starting in H2.",
          hint: "Select F2:F13 and press Ctrl+C. Click H2, then Home tab › Clipboard group › Paste arrow › Values (or right-click › Paste Values).",
          steps: [
            {
              action: { kind: "command", id: "home.copy" },
              requires: { selection: "F2:F13" },
              selectHint: "Select the totals in F2:F13 first.",
            },
            {
              action: { kind: "command", id: "home.paste", value: "Values" },
              requires: { selection: "H2" },
              selectHint: "Click H2, where the values should start.",
            },
          ],
        },
        {
          instruction: "In H1, type the label \"Billing Totals\".",
          hint: "Click H1, type Billing Totals and press Enter.",
          steps: [{ action: { kind: "type", target: "H1", value: "Billing Totals" } }],
        },
        {
          instruction: "Copy F1 and paste only its formatting onto H1, so the new label matches the other headers.",
          hint: "Click F1 and press Ctrl+C. Click H1, then Home tab › Clipboard group › Paste arrow › Formatting.",
          steps: [
            { action: { kind: "command", id: "home.copy" }, requires: { selection: "F1" }, selectHint: "Click F1, the header whose look you want to copy." },
            { action: { kind: "command", id: "home.paste", value: "Formatting" }, requires: { selection: "H1" }, selectHint: "Click H1 before you paste." },
          ],
        },
      ],
    },
  ],

  "module-2::modifying-columns-rows-and-cells": [
    {
      id: "excel-m2-columns-rows-1",
      app: "excel",
      title: "Make the supply tracker readable",
      scenario:
        "You inherited the supply tracker at Lakeside Medical Associates. Names are cut off, notes run off the screen, and the title was going to be merged. Fix the layout without merging anything.",
      fileName: "Supply Tracker.xlsx",
      minutes: 4,
      initial: {
        active: "Supply Tracker",
        sheets: [
          {
            name: "Supply Tracker",
            cells: {
              A1: { v: "Lakeside Medical Associates - Supply Tracker", fmt: TITLE },
              ...grid(
                "A3",
                [
                  ["Item", "Vendor", "Reorder Notes", "On Hand", "Reorder Level", "Unit"],
                  ["Nitrile exam gloves (M)", "McKesson", "Order 30 boxes when below 10; delivery takes 3 days.", 8, 10, "Box"],
                  ["Exam table paper rolls", "Medline Industries", "Case of 12. Check the back closet before ordering.", 14, 6, "Case"],
                  ["Alcohol prep pads", "Cardinal Health", "Front desk and lab both pull from this stock.", 22, 10, "Box"],
                  ["Sharps containers 1 qt", "Medline Industries", "Pickup service swaps full containers on Fridays.", 5, 4, "Each"],
                  ["Disinfecting wipes", "Henry Schein", "Use the canister refills, not new canisters.", 18, 12, "Canister"],
                  ["Specimen cups with lids", "Cardinal Health", "Lab manager approves orders over 20 cases.", 9, 8, "Case"],
                  ["Patient gowns, disposable", "Medline Industries", "Pediatric sizes are on a separate line item.", 30, 20, "Pack"],
                  ["Urine test strips", "McKesson", "Check expiration dates when the order arrives.", 3, 4, "Bottle"],
                  ["Hand sanitizer 1 L", "Henry Schein", "Refill pumps in all six exam rooms weekly.", 11, 6, "Bottle"],
                  ["Tongue depressors", "McKesson", "Adult and pediatric sizes ship together.", 16, 5, "Box"],
                ],
                { header: true },
              ),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Set the width of column A to 28.",
          hint: "Right-click the column A header › Column Width, type 28, OK (or Home tab › Cells group › Format › Column Width).",
          steps: [
            {
              action: { kind: "dialog", id: "columnWidth", values: { width: 28 } },
              requires: { selection: "A:A" },
              selectHint: "Click the column A header to select the whole column first.",
            },
          ],
        },
        {
          instruction: "AutoFit column B so every vendor name fits.",
          hint: "Select column B (click its header). Home tab › Cells group › Format › AutoFit Column Width.",
          steps: [
            {
              action: { kind: "command", id: "home.format", value: "AutoFit Column Width" },
              requires: { selection: ["B:B", "B3:B13", "B4:B13"] },
              selectHint: "Click the column B header first.",
            },
          ],
        },
        {
          instruction: "Wrap the text in the Reorder Notes cells C4:C13 so each note stays inside its column.",
          hint: "Select C4:C13. Home tab › Alignment group › Wrap Text.",
          steps: [
            {
              action: { kind: "command", id: "home.wrap" },
              alt: [{ kind: "dialog", id: "formatCells", values: { wrap: true } }],
              requires: { selection: ["C4:C13", "C:C"] },
              selectHint: "Select the notes in C4:C13 first.",
            },
          ],
        },
        {
          instruction: "Set the height of the header row (row 3) to 30.",
          hint: "Right-click the row 3 header › Row Height, type 30, OK (or Home tab › Cells group › Format › Row Height).",
          steps: [
            {
              action: { kind: "dialog", id: "rowHeight", values: { height: 30 } },
              requires: { selection: "3:3" },
              selectHint: "Click the row 3 header to select the row first.",
            },
          ],
        },
        {
          instruction: "Center the title in A1 across A1:F1 without merging the cells.",
          hint: "Select A1:F1 and press Ctrl+1. On the Alignment tab set Horizontal to Center Across Selection, then OK.",
          steps: [
            {
              action: { kind: "dialog", id: "formatCells", values: { horizontal: "Center Across Selection" } },
              requires: { selection: "A1:F1" },
              selectHint: "Select A1:F1, the cells the title should center across.",
            },
          ],
        },
      ],
    },
    {
      id: "excel-m2-columns-rows-2",
      app: "excel",
      title: "Restructure the supply list",
      scenario:
        "The supply list needs a column for vendor phone numbers, an obsolete code column removed, cost hidden for the front-desk printout, and two rows moved or removed.",
      fileName: "Supply List.xlsx",
      minutes: 6,
      initial: {
        active: "Supplies",
        sheets: [
          {
            name: "Supplies",
            colWidths: { A: 150, B: 76, C: 124, D: 76, E: 70, F: 64, G: 92 },
            cells: grid(
              "A1",
              [
                ["Item", "Category", "Vendor", "Unit Cost", "Old Code", "On Hand", "Reorder Level"],
                ["Nitrile gloves (M)", "Medical", "McKesson", 7.25, "G-114", 8, 10],
                ["Alcohol prep pads", "Medical", "Cardinal Health", 4.4, "A-201", 22, 10],
                ["Gauze pads 4x4", "Medical", "McKesson", 9.8, "G-310", 15, 8],
                ["Copy paper, case", "Office", "Staples Business", 42.99, "O-008", 4, 3],
                ["Disinfecting wipes", "Cleaning", "Henry Schein", 8.75, "C-112", 18, 12],
                ["Specimen cups", "Lab", "Cardinal Health", 22.4, "L-045", 9, 8],
                ["Exam table paper", "Medical", "Medline Industries", 18.5, "E-090", 14, 6],
                ["Toner cartridge", "Office", "Staples Business", 89, "O-061", 2, 2],
                ["Hand sanitizer 1 L", "Cleaning", "Henry Schein", 12.6, "C-130", 11, 6],
                ["Sharps container", "Medical", "Medline Industries", 11, "S-022", 5, 4],
                ["Urine test strips", "Lab", "McKesson", 31.25, "L-077", 3, 4],
                ["Mercury thermometer", "Medical", "Discontinued", 0, "M-001", 0, 0],
              ],
              { header: true, colFmt: { D: MONEY } },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Insert a new column before the Unit Cost column (column D).",
          hint: "Right-click the column D header › Insert (or select column D and use Home tab › Cells group › Insert › Insert Sheet Columns).",
          steps: [
            {
              action: { kind: "command", id: "home.insert", value: ["Insert Sheet Columns", "Insert Sheet Rows"] },
              requires: { selection: "D:D" },
              selectHint: "Click the column D header to select the whole column first.",
            },
          ],
        },
        {
          instruction: "In D1, type the header \"Vendor Phone\".",
          hint: "Click D1, type Vendor Phone and press Enter.",
          steps: [{ action: { kind: "type", target: "D1", value: "Vendor Phone" } }],
        },
        {
          instruction: "Delete the Old Code column (now column F) entirely.",
          hint: "Right-click the column F header › Delete (or select column F and use Home tab › Cells group › Delete › Delete Sheet Columns).",
          steps: [
            {
              action: { kind: "command", id: "home.delete", value: ["Delete Sheet Columns", "Delete Sheet Rows"] },
              requires: { selection: "F:F" },
              selectHint: "Click the column F header (Old Code) first.",
            },
          ],
        },
        {
          instruction: "Hide the Unit Cost column (column E) before the list is printed for the front desk.",
          hint: "Right-click the column E header › Hide (or Home tab › Cells group › Format › Hide Columns).",
          steps: [
            {
              action: { kind: "command", id: "home.format", value: "Hide Columns" },
              requires: { selection: ["E:E", ...colCells("E", 1, 13)] },
              selectHint: "Click the column E header first.",
            },
          ],
        },
        {
          instruction: "The office manager needs the costs back. Unhide column E.",
          hint: "Drag across the column D and F headers so the selection includes hidden column E, then right-click › Unhide (or Home tab › Format › Unhide Columns).",
          steps: [
            {
              action: { kind: "command", id: "home.format", value: "Unhide Columns" },
              requires: { selection: "D:F" },
              selectHint: "Select columns D through F (drag across the D and F headers) so the hidden column is inside the selection.",
            },
          ],
        },
        {
          instruction: "Move the Exam table paper row (row 8) so it sits above row 3, using cut and insert.",
          hint: "Right-click the row 8 header › Cut. Then right-click the row 3 header › Insert Cut Cells.",
          steps: [
            { action: { kind: "command", id: "home.cut" }, requires: { selection: "8:8" }, selectHint: "Click the row 8 header to select the whole row, then cut it." },
            {
              action: { kind: "command", id: "home.insertCut" },
              requires: { selection: ["3:3", "A3"] },
              selectHint: "Right-click the row 3 header, where the row should go.",
            },
          ],
        },
        {
          instruction: "Delete the discontinued item in row 13.",
          hint: "Right-click the row 13 header › Delete (or Home tab › Cells group › Delete › Delete Sheet Rows).",
          steps: [
            {
              action: { kind: "command", id: "home.delete", value: "Delete Sheet Rows" },
              requires: { selection: ["13:13", ...cells("A13:G13")] },
              selectHint: "Click the row 13 header (Mercury thermometer) first.",
            },
          ],
        },
      ],
    },
  ],

  "module-2::formatting-cells": [
    {
      id: "excel-m2-formatting-cells-1",
      app: "excel",
      title: "Format the monthly budget review",
      scenario:
        "You prepare the October budget review for the Lakeside board. It will be printed in black and white, so every highlight needs a word next to it, and the table should look consistent.",
      fileName: "October Budget Review.xlsx",
      minutes: 6,
      initial: {
        active: "Budget Review",
        sheets: [
          {
            name: "Budget Review",
            colWidths: { A: 150, B: 86, C: 86, D: 86, E: 100 },
            cells: {
              A1: { v: "October Budget Review" },
              ...grid(
                "A3",
                [
                  ["Department", "Budget", "Actual", "Variance", "Status"],
                  ["Family Medicine", 18500, 17920.4, "=B4-C4", "On track"],
                  ["Pediatrics", 12400, 13105.75, "=B5-C5", { v: "Over budget", fmt: { bold: true, color: "#9C0006", fill: "#FFC7CE" } }],
                  ["Cardiology", 9800, 9640, "=B6-C6", "On track"],
                  ["Laboratory", 7600, 8012.3, "=B7-C7", null],
                  ["Front Desk", 4200, 3985.1, "=B8-C8", "On track"],
                  ["Billing Office", 5100, 4870, "=B9-C9", "On track"],
                  ["Radiology", 11250, 11980.6, "=B10-C10", { v: "Over budget", fmt: { bold: true, color: "#9C0006", fill: "#FFC7CE" } }],
                  ["Facilities", 6300, 6115.45, "=B11-C11", "On track"],
                  ["IT Support", 3900, 3720, "=B12-C12", "On track"],
                  ["Total", "=SUM(B4:B12)", "=SUM(C4:C12)", "=SUM(D4:D12)", null],
                ],
                { header: true, headerFmt: {}, colFmt: { B: MONEY, C: MONEY, D: MONEY } },
              ),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Change the title in A1 to the Cambria font at size 16.",
          hint: "Click A1. Home tab › Font group › Font box › Cambria, then Font Size box › 16.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "home.fontName", value: "Cambria" }, requires: { selection: "A1" }, selectHint: "Click the title in A1 first." },
            { action: { kind: "command", id: "home.fontSize", value: "16" }, requires: { selection: "A1" }, selectHint: "Click the title in A1 first." },
          ],
        },
        {
          instruction: "Change the title's font color to Dark Blue (Standard Colors).",
          hint: "Click A1. Home tab › Font group › Font Color arrow › Dark Blue under Standard Colors.",
          steps: [{ action: { kind: "command", id: "home.fontColor", value: "#002060" }, requires: { selection: "A1" }, selectHint: "Click the title in A1 first." }],
        },
        {
          instruction: "Bold the column headers in A3:E3.",
          hint: "Select A3:E3. Home tab › Font group › Bold (or Ctrl+B).",
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              alt: [{ kind: "dialog", id: "formatCells", values: { bold: true } }],
              requires: { selection: "A3:E3" },
              selectHint: "Select the headers in A3:E3 first.",
            },
          ],
        },
        {
          instruction: "Give the headers in A3:E3 a Gray fill (top row of Theme Colors).",
          hint: "Select A3:E3. Home tab › Font group › Fill Color arrow › Gray in the first row of Theme Colors.",
          steps: [{ action: { kind: "command", id: "home.fill", value: "#E7E6E6" }, requires: { selection: "A3:E3" }, selectHint: "Select the headers in A3:E3 first." }],
        },
        {
          instruction: "Center the headers in A3:E3 horizontally and align them to the middle vertically.",
          hint: "Select A3:E3. Home tab › Alignment group › Center, then Middle Align.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "home.alignCenter" },
              alt: [{ kind: "dialog", id: "formatCells", values: { horizontal: "Center" } }],
              requires: { selection: "A3:E3" },
              selectHint: "Select the headers in A3:E3 first.",
            },
            {
              action: { kind: "command", id: "home.alignMiddle" },
              alt: [{ kind: "dialog", id: "formatCells", values: { vertical: "Center" } }],
              requires: { selection: "A3:E3" },
              selectHint: "Select the headers in A3:E3 first.",
            },
          ],
        },
        {
          instruction: "Add All Borders to the whole table, A3:E13.",
          hint: "Select A3:E13. Home tab › Font group › Borders arrow › All Borders.",
          steps: [{ action: { kind: "command", id: "home.borders", value: "All Borders" }, requires: { selection: "A3:E13" }, selectHint: "Select the whole table, A3:E13, first." }],
        },
        {
          instruction: "Apply the Total cell style to the totals row, A13:E13.",
          hint: "Select A13:E13. Home tab › Styles group › Cell Styles › Total.",
          steps: [{ action: { kind: "command", id: "home.cellStyle", value: "Total" }, requires: { selection: "A13:E13" }, selectHint: "Select the totals row, A13:E13, first." }],
        },
        {
          instruction: "Laboratory is over budget. Type \"Over budget\" in E7, then use Format Painter to copy the formatting from E5 to E7.",
          hint: "Click E7, type Over budget, press Enter. Click E5, Home tab › Clipboard group › Format Painter, then click E7.",
          steps: [
            { action: { kind: "type", target: "E7", value: "Over budget" } },
            { action: { kind: "command", id: "home.formatPainter" }, requires: { selection: "E5" }, selectHint: "Click E5, the formatted status you want to copy, first." },
            { action: { kind: "command", id: "home.formatPainter.apply" }, requires: { selection: "E7" }, selectHint: "With Format Painter on, click E7." },
          ],
        },
      ],
    },
  ],

  "module-2::understanding-number-formats": [
    {
      id: "excel-m2-number-formats-1",
      app: "excel",
      title: "Format the invoice register",
      scenario:
        "You reconcile invoices at Lakeside Medical Associates. The register was exported with no formatting: dates show as serial numbers, money has no symbols, and discounts show as decimals.",
      fileName: "Invoice Register.xlsx",
      minutes: 5,
      initial: {
        active: "Invoices",
        sheets: [
          {
            name: "Invoices",
            colWidths: { A: 86, B: 150, C: 86, D: 86, E: 76, F: 96 },
            cells: {
              A1: { v: "Report date:", fmt: { bold: true } },
              B1: { v: serial(10, 20) },
              ...grid(
                "A3",
                [
                  ["Invoice #", "Payer", "Invoice Date", "Charge", "Discount", "Net"],
                  ["INV-30411", "Empire BlueCross", serial(9, 2), 1240.45, 0.05, "=D4*(1-E4)"],
                  ["INV-30412", "Fidelis Care", serial(9, 3), 315, 0.075, "=D5*(1-E5)"],
                  ["INV-30413", "Medicare Part B", serial(9, 5), 2875.1, 0, "=D6*(1-E6)"],
                  ["INV-30414", "Aetna", serial(9, 8), 640.8, 0.1, "=D7*(1-E7)"],
                  ["INV-30415", "Self-pay", serial(9, 9), 185, 0.125, "=D8*(1-E8)"],
                  ["INV-30416", "Healthfirst", serial(9, 12), 920.25, 0.05, "=D9*(1-E9)"],
                  ["INV-30417", "UnitedHealthcare", serial(9, 15), 1510.6, 0.075, "=D10*(1-E10)"],
                  ["INV-30418", "Medicaid", serial(9, 18), 455.4, 0, "=D11*(1-E11)"],
                  ["INV-30419", "Cigna", serial(9, 22), 788.95, 0.05, "=D12*(1-E12)"],
                  ["INV-30420", "Empire BlueCross", serial(9, 26), 1102.3, 0.075, "=D13*(1-E13)"],
                ],
                { header: true },
              ),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Format the invoice dates in C4:C13 as Short Date.",
          hint: "Select C4:C13. Home tab › Number group › Number Format box › Short Date.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Short Date" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Short Date" } }],
              requires: { selection: "C4:C13" },
              selectHint: "Select the dates in C4:C13 first.",
            },
          ],
        },
        {
          instruction: "Format the report date in B1 as Long Date.",
          hint: "Click B1. Home tab › Number group › Number Format box › Long Date.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Long Date" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Long Date" } }],
              requires: { selection: "B1" },
              selectHint: "Click B1 first.",
            },
          ],
        },
        {
          instruction: "Format the charges in D4:D13 as Currency.",
          hint: "Select D4:D13. Home tab › Number group › Number Format box › Currency.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Currency" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Currency" } }],
              requires: { selection: "D4:D13" },
              selectHint: "Select the charges in D4:D13 first.",
            },
          ],
        },
        {
          instruction: "Format the net amounts in F4:F13 in Accounting format.",
          hint: "Select F4:F13. Home tab › Number group › Accounting Number Format ($).",
          steps: [
            {
              action: { kind: "command", id: "home.accounting" },
              alt: [
                { kind: "command", id: "home.numberFormat", value: "Accounting" },
                { kind: "dialog", id: "formatCells", values: { category: "Accounting" } },
              ],
              requires: { selection: "F4:F13" },
              selectHint: "Select the net amounts in F4:F13 first.",
            },
          ],
        },
        {
          instruction: "Format the discount rates in E4:E13 as percentages.",
          hint: "Select E4:E13. Home tab › Number group › Percent Style (%).",
          steps: [
            {
              action: { kind: "command", id: "home.percent" },
              alt: [
                { kind: "command", id: "home.numberFormat", value: "Percentage" },
                { kind: "dialog", id: "formatCells", values: { category: "Percentage", decimals: 0 } },
              ],
              requires: { selection: "E4:E13" },
              selectHint: "Select the discount rates in E4:E13 first.",
            },
          ],
        },
        {
          instruction: "Two discounts now read 8% and 13%, but they are really 7.5% and 12.5%. Show one decimal place in E4:E13.",
          hint: "Keep E4:E13 selected. Home tab › Number group › Increase Decimal (once).",
          steps: [
            {
              action: { kind: "command", id: "home.decInc" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Percentage", decimals: 1 } }],
              requires: { selection: "E4:E13" },
              selectHint: "Select the discount rates in E4:E13 first.",
            },
          ],
        },
      ],
    },
    {
      id: "excel-m2-number-formats-2",
      app: "excel",
      title: "Find the reconciliation gap",
      scenario:
        "The payment batch total does not match the payer's statement. The amounts show as whole dollars, but they were stored with cents, and one account number keeps losing its leading zeros.",
      fileName: "Payment Batch.xlsx",
      minutes: 5,
      initial: {
        active: "Batch",
        sheets: [
          {
            name: "Batch",
            colWidths: { A: 90, B: 150, C: 90, D: 90 },
            cells: {
              A1: { v: "Payment batch 1027", fmt: TITLE },
              ...grid(
                "A3",
                [
                  ["Account #", "Payer", "Amount", "Rounded"],
                  [{ v: "004102", fmt: { numFmt: "Text" } }, "Empire BlueCross", 142.38, null],
                  [{ v: "004118", fmt: { numFmt: "Text" } }, "Fidelis Care", 89.45, null],
                  [{ v: "004131", fmt: { numFmt: "Text" } }, "Medicare Part B", 310.62, null],
                  [{ v: "004157", fmt: { numFmt: "Text" } }, "Aetna", 57.49, null],
                  [{ v: "004163", fmt: { numFmt: "Text" } }, "Healthfirst", 224.71, null],
                  [{ v: "004190", fmt: { numFmt: "Text" } }, "Cigna", 118.36, null],
                  [{ v: "004204", fmt: { numFmt: "Text" } }, "Medicaid", 76.58, null],
                  [{ v: "004266", fmt: { numFmt: "Text" } }, "UnitedHealthcare", 403.44, null],
                  [null, "Self-pay", 65.47, null],
                ],
                { header: true, colFmt: { C: { numFmt: "Number", decimals: 0 } } },
              ),
              A13: { v: "Total", fmt: { bold: true } },
              C13: { f: "=SUM(C4:C12)", fmt: { numFmt: "Number", decimals: 0, bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Show two decimal places in the amounts C4:C13 so the cents are visible.",
          hint: "Select C4:C13 and press Ctrl+1. On the Number tab keep Number and set Decimal places to 2, then OK. (Or click Increase Decimal twice.)",
          steps: [
            {
              action: { kind: "dialog", id: "formatCells", values: { decimals: 2 } },
              alt: [{ kind: "command", id: "home.numberFormat", value: "Number" }, { kind: "command", id: "home.comma" }],
              requires: { selection: "C4:C13" },
              selectHint: "Select the amounts in C4:C13 first.",
            },
          ],
        },
        {
          instruction: "In D4, enter a formula that rounds the amount in C4 to the nearest whole dollar.",
          hint: "Click D4, type =ROUND(C4,0) and press Enter. ROUND changes the stored value; formatting only changes what you see.",
          steps: [{ action: { kind: "type", target: "D4", value: "=ROUND(C4,0)", match: "formula" } }],
        },
        {
          instruction: "Copy the formula in D4 down through D12.",
          hint: "Select D4 and drag the fill handle down to D12 (or select D4:D12 and press Ctrl+D). Stop at D12: row 13 is the total.",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "D4:D12" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["D4", "D4:D12"] },
              selectHint: "Start from D4, the cell with the formula (or select D4:D12 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "In D13, total the rounded amounts in D4:D12.",
          hint: "Click D13. Home tab › Editing group › AutoSum (or Alt+=), then Enter. Or type =SUM(D4:D12).",
          steps: [
            {
              action: { kind: "command", id: "home.autosum", value: "Sum" },
              alt: [{ kind: "type", target: "D13", value: "=SUM(D4:D12)", match: "formula" }],
              requires: { selection: "D13" },
              selectHint: "Click D13 first.",
            },
          ],
        },
        {
          instruction: "Format A12 as Text so the account number you enter keeps its leading zeros.",
          hint: "Click A12. Home tab › Number group › Number Format box › Text.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Text" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Text" } }],
              requires: { selection: "A12" },
              selectHint: "Click A12 first.",
            },
          ],
        },
        {
          instruction: "Type the self-pay account number 004417 in A12.",
          hint: "Click A12, type 004417 and press Enter. Because A12 is formatted as Text, the zeros stay.",
          steps: [{ action: { kind: "type", target: "A12", value: "004417" } }],
        },
      ],
    },
  ],

  "module-2::intro-to-formulas": [
    {
      id: "excel-m2-intro-to-formulas-1",
      app: "excel",
      title: "Build a supply cost sheet that maintains itself",
      scenario:
        "Your predecessor typed the supply totals by hand, so a price change never updated them. Rebuild the sheet with formulas that reference cells, including the tax rate in G1, so any change flows through.",
      fileName: "Supply Costs.xlsx",
      minutes: 6,
      initial: {
        active: "Supply Costs",
        sheets: [
          {
            name: "Supply Costs",
            colWidths: { A: 140, B: 124, C: 48, D: 80, E: 90, F: 70, G: 60 },
            cells: {
              ...grid("A1", [["Item", "Vendor", "Qty", "Unit Price", "Line Total"], ...COST_ROWS], { header: true, colFmt: { D: MONEY } }),
              F1: { v: "Tax Rate", fmt: { bold: true } },
              G1: { v: 0.08, fmt: { numFmt: "Percentage" } },
              ...fmtOnly("E2:E11", MONEY),
              A12: { v: "Subtotal", fmt: { bold: true } },
              A13: { v: "Tax", fmt: { bold: true } },
              A14: { v: "Order Total", fmt: { bold: true } },
              E12: { fmt: MONEY },
              E13: { fmt: MONEY },
              E14: { fmt: { numFmt: "Currency", bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In E2, enter a formula that multiplies the quantity in C2 by the unit price in D2.",
          hint: "Click E2, type =C2*D2 and press Enter. (You can also type = and click C2, type *, click D2.)",
          steps: [{ action: { kind: "type", target: "E2", value: ["=C2*D2", "=D2*C2"], match: "formula" } }],
        },
        {
          instruction: "Copy the formula in E2 down through E11.",
          hint: "Select E2 and double-click the fill handle (or drag it down to E11).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "E2:E11" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["E2", "E2:E11"] },
              selectHint: "Start from E2, the cell that holds the formula (or select E2:E11 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "In E12, total the line totals in E2:E11.",
          hint: "Click E12. Home tab › Editing group › AutoSum (or Alt+=), then Enter. Or type =SUM(E2:E11).",
          steps: [
            {
              action: { kind: "command", id: "home.autosum", value: "Sum" },
              alt: [{ kind: "type", target: "E12", value: "=SUM(E2:E11)", match: "formula" }],
              requires: { selection: "E12" },
              selectHint: "Click E12 first.",
            },
          ],
        },
        {
          instruction: "In E13, calculate the tax: the subtotal in E12 times the tax rate in G1.",
          hint: "Click E13, type =E12*G1 and press Enter. Referencing G1 means a rate change updates the tax automatically.",
          steps: [{ action: { kind: "type", target: "E13", value: ["=E12*G1", "=G1*E12"], match: "formula" } }],
        },
        {
          instruction: "In E14, add the subtotal and the tax to get the order total.",
          hint: "Click E14, type =E12+E13 and press Enter.",
          steps: [{ action: { kind: "type", target: "E14", value: ["=E12+E13", "=E13+E12", "=SUM(E12:E13)"], match: "formula" } }],
        },
        {
          instruction: "McKesson raised the glove price. Change the unit price in D3 to 9.75 and watch the totals update.",
          hint: "Click D3, type 9.75 and press Enter.",
          steps: [{ action: { kind: "type", target: "D3", value: ["9.75", "$9.75"] } }],
        },
        {
          instruction: "Show every formula on the sheet to check your work, then switch back to showing results.",
          hint: "Press Ctrl+` (grave accent) twice, or Formulas tab › Formula Auditing group › Show Formulas, then click it again.",
          steps: [{ action: { kind: "command", id: "formulas.showFormulas" } }, { action: { kind: "command", id: "formulas.showFormulas" } }],
        },
      ],
    },
  ],
};
