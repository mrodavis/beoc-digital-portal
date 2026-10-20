import type { ExcelCell, SimDefinition } from "@/types/sim";
import { cells, colCells, column, DATE, grid, MONEY, serial, TITLE } from "./helpers";

/* ------------------------------------------------------------------ */
/* Practice data                                                       */
/* ------------------------------------------------------------------ */

/** Q3 supply spending, 20 rows: Date, Item, Category, Vendor, Amount. */
const SPENDING: [number, string, string, string, number][] = [
  [serial(7, 1), "Nitrile gloves (M)", "Medical", "McKesson", 217.5],
  [serial(7, 3), "Specimen cups", "Lab", "Cardinal Health", 224],
  [serial(7, 7), "Copy paper, case", "Office", "Staples Business", 257.94],
  [serial(7, 9), "Exam table paper", "Medical", "Medline Industries", 222],
  [serial(7, 14), "Disinfecting wipes", "Cleaning", "Henry Schein", 131.25],
  [serial(7, 18), "Urine test strips", "Lab", "McKesson", 125],
  [serial(7, 22), "Patient gowns", "Medical", "Medline Industries", 260],
  [serial(7, 28), "Toner cartridge", "Office", "Staples Business", 178],
  [serial(8, 4), "Gauze pads 4x4", "Medical", "McKesson", 176.4],
  [serial(8, 6), "Blood collection tubes", "Lab", "Medline Industries", 312.6],
  [serial(8, 11), "Hand sanitizer 1 L", "Cleaning", "Henry Schein", 100.8],
  [serial(8, 15), "Alcohol prep pads", "Medical", "Cardinal Health", 88],
  [serial(8, 20), "Sharps container", "Medical", "Medline Industries", 66],
  [serial(8, 26), "Printer labels", "Office", "Staples Business", 42.5],
  [serial(9, 2), "Pipette tips", "Lab", "Cardinal Health", 96.75],
  [serial(9, 8), "Floor cleaner", "Cleaning", "Henry Schein", 58.4],
  [serial(9, 12), "Tongue depressors", "Medical", "McKesson", 54],
  [serial(9, 17), "Glucose test strips", "Lab", "Medline Industries", 189.9],
  [serial(9, 22), "Exam gloves (L)", "Medical", "Medline Industries", 145],
  [serial(9, 29), "Trash liners", "Cleaning", "Henry Schein", 47.25],
];

/** Equipment loan log, 18 rows: ID, Type, Item Description, Checked Out, Due, Loan Value. */
const LOANS: [number, string, string, number, number, number][] = [
  [1001, "Laptop", "Dell Latitude 5440", serial(9, 8), serial(9, 22), 1150],
  [1002, "BP Monitor", "Omron 7 Series upper arm", serial(9, 10), serial(9, 24), 79.99],
  [1003, "Projector", "Epson PowerLite 119W", serial(9, 14), serial(9, 16), 649],
  [1004, "Tablet", "iPad 10th generation", serial(9, 21), serial(10, 5), 349],
  [1005, "BP Monitor", "Omron 10 Series wireless", serial(9, 25), serial(10, 9), 109.99],
  [1006, "Laptop", "Lenovo ThinkPad E14", serial(10, 1), serial(10, 15), 899],
  [1007, "Monitor", "Dell 24 inch P2425", serial(10, 2), serial(10, 30), 219],
  [1008, "Thermometer", "Braun ThermoScan 7", serial(10, 5), serial(10, 12), 59.95],
  [1009, "BP Monitor", "Omron 3 Series wrist", serial(10, 6), serial(10, 20), 39.99],
  [1010, "Laptop", "HP ProBook 450", serial(10, 7), serial(10, 21), 949],
  [1011, "Projector", "Epson Home Cinema 880", serial(10, 8), serial(10, 10), 799],
  [1012, "Tablet", "Samsung Galaxy Tab A9", serial(10, 9), serial(10, 23), 229],
  [1013, "Pulse Oximeter", "Masimo MightySat", serial(10, 12), serial(10, 26), 299],
  [1014, "Monitor", "LG 27 inch UltraFine", serial(10, 13), serial(11, 10), 329],
  [1015, "Thermometer", "Exergen TemporalScanner", serial(10, 14), serial(10, 21), 89],
  [1016, "BP Monitor", "Omron Platinum upper arm", serial(10, 15), serial(10, 29), 94.99],
  [1017, "Laptop", "Dell Latitude 3540", serial(10, 16), serial(10, 30), 879],
  [1018, "Pulse Oximeter", "Nonin Onyx Vantage", serial(10, 19), serial(11, 2), 249],
];

/** Stock levels: Item, Category, On Hand, Reorder Level, Unit Cost (Stock Value is a formula). */
const STOCK: [string, string, number, number, number][] = [
  ["Nitrile gloves (M)", "Medical", 8, 10, 7.25],
  ["Exam table paper", "Medical", 14, 6, 18.5],
  ["Alcohol prep pads", "Medical", 42, 10, 4.4],
  ["Gauze pads 4x4", "Medical", 15, 8, 9.8],
  ["Sharps container", "Medical", 3, 4, 11],
  ["Specimen cups", "Lab", 22, 8, 22.4],
  ["Urine test strips", "Lab", 2, 4, 31.25],
  ["Blood collection tubes", "Lab", 60, 25, 6.5],
  ["Disinfecting wipes", "Cleaning", 18, 12, 8.75],
  ["Hand sanitizer 1 L", "Cleaning", 5, 6, 12.6],
  ["Copy paper, case", "Office", 4, 3, 42.99],
  ["Toner cartridge", "Office", 1, 2, 89],
  ["Patient gowns", "Medical", 30, 20, 26],
  ["Thermometer covers", "Medical", 120, 50, 2.9],
  ["Pulse oximeter probes", "Medical", 6, 4, 48.5],
];

function stockCells(): Record<string, ExcelCell> {
  return {
    ...grid("A1", [["Item", "Category", "On Hand", "Reorder Level", "Unit Cost", "Stock Value"], ...STOCK], { header: true, colFmt: { E: MONEY } }),
    ...column("F", 2, 16, "=C{r}*E{r}", MONEY),
  };
}

const STOCK_WIDTHS = { A: 150, B: 76, C: 64, D: 92, E: 72, F: 86, G: 70 };

/* ------------------------------------------------------------------ */
/* Module 5                                                            */
/* ------------------------------------------------------------------ */

export const excelModule5Sims: Record<string, SimDefinition[]> = {
  "module-5::basic-tips-working-with-data": [
    {
      id: "excel-m5-data-tips-1",
      app: "excel",
      title: "Clean up the inherited supply log",
      scenario:
        "The supply log you inherited has merged section headings, a subtotal in the middle of the data and a blank separator row, so sorting and filtering misbehave. Reshape it into one clean block, then protect the Category column from bad entries.",
      fileName: "Supply Log Q3.xlsx",
      minutes: 6,
      initial: {
        active: "Supply Log",
        sheets: [
          {
            name: "Supply Log",
            colWidths: { A: 78, B: 150, C: 80, D: 48, E: 82 },
            merges: ["A3:C3", "D3:E3"],
            cells: {
              A1: { v: "Supply Log - Q3", fmt: TITLE },
              A3: { v: "Order Details", fmt: { bold: true, align: "center", fill: "#FCE4D6" } },
              D3: { v: "Cost", fmt: { bold: true, align: "center", fill: "#FCE4D6" } },
              ...grid(
                "A4",
                [
                  ["Date", "Item", "Category", "Qty", "Cost"],
                  [serial(7, 1), "Nitrile gloves (M)", "Medical", 30, 217.5],
                  [serial(7, 3), "Specimen cups", "Lab", 10, 224],
                  [serial(7, 7), "Copy paper, case", "Office", 6, 257.94],
                  [serial(7, 14), "Disinfecting wipes", "Cleaning", 15, 131.25],
                  [serial(7, 22), "Patient gowns", "Medical", 10, 260],
                  [serial(7, 28), "Toner cartridge", "Office", 2, 178],
                ],
                { header: true, colFmt: { A: DATE, E: MONEY } },
              ),
              B11: { v: "July subtotal", fmt: { bold: true, italic: true } },
              E11: { f: "=SUM(E5:E10)", fmt: { numFmt: "Currency", bold: true } },
              ...grid(
                "A13",
                [
                  [serial(8, 4), "Gauze pads 4x4", "Medical", 18, 176.4],
                  [serial(8, 6), "Blood collection tubes", "Lab", 48, 312.6],
                  [serial(8, 11), "Hand sanitizer 1 L", "Cleaning", 8, 100.8],
                  [serial(8, 15), "Alcohol prep pads", "Medical", 20, 88],
                  [serial(8, 20), "Sharps container", "Medical", 6, 66],
                  [serial(8, 26), "Printer labels", "Office", 4, 42.5],
                ],
                { colFmt: { A: DATE, E: MONEY } },
              ),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Delete row 3, which holds the merged section headings above the real header row.",
          hint: "Right-click the row 3 header › Delete (or select row 3 and use Home tab › Cells group › Delete › Delete Sheet Rows).",
          steps: [
            {
              action: { kind: "command", id: "home.delete", value: "Delete Sheet Rows" },
              requires: { selection: ["3:3", ...cells("A3:E3")] },
              selectHint: "Click the row 3 header first.",
            },
          ],
        },
        {
          instruction: "Delete the July subtotal row (now row 10) so no totals sit inside the data.",
          hint: "Right-click the row 10 header › Delete.",
          steps: [
            {
              action: { kind: "command", id: "home.delete", value: "Delete Sheet Rows" },
              requires: { selection: ["10:10", ...cells("A10:E10")] },
              selectHint: "Click the row 10 header (July subtotal) first.",
            },
          ],
        },
        {
          instruction: "Delete the blank separator row (now row 10) so the data is one continuous block.",
          hint: "Right-click the row 10 header › Delete.",
          steps: [
            {
              action: { kind: "command", id: "home.delete", value: "Delete Sheet Rows" },
              requires: { selection: ["10:10", ...cells("A10:E10")] },
              selectHint: "Click the row 10 header (the empty row) first.",
            },
          ],
        },
        {
          instruction: "Limit the Category cells C4:C15 to a drop-down list of Medical, Lab, Office, Cleaning.",
          hint: "Select C4:C15. Data tab › Data Tools group › Data Validation. Allow: List. Source: Medical,Lab,Office,Cleaning. OK.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "dataValidation",
                values: { allow: "List", source: ["Medical,Lab,Office,Cleaning", "Medical, Lab, Office, Cleaning"] },
              },
              requires: { selection: "C4:C15" },
              selectHint: "Select the Category cells C4:C15 first.",
            },
          ],
        },
        {
          instruction: "Freeze the panes so the title and header rows (rows 1 to 3) stay visible as you scroll.",
          hint: "Click A4. View tab › Window group › Freeze Panes › Freeze Panes. Excel freezes everything above the selected cell.",
          steps: [
            {
              action: { kind: "command", id: "view.freeze", value: "Freeze Panes" },
              requires: { selection: "A4" },
              selectHint: "Click A4, the first cell below the rows you want to keep visible.",
            },
          ],
        },
        {
          instruction: "Format the data in A3:E15 as a table that has headers.",
          hint: "Click any cell in the data. Insert tab › Tables group › Table (or Ctrl+T), check My table has headers, OK. (Home › Format as Table also works.)",
          steps: [
            {
              action: { kind: "dialog", id: "createTable", values: { headers: true } },
              alt: [{ kind: "command", id: "home.formatAsTable" }],
              requires: { selection: ["A3:E15", ...cells("A3:E15")] },
              selectHint: "Click a cell inside the data (A3:E15) first.",
            },
          ],
        },
      ],
    },
  ],

  "module-5::freezing-panes-view-options": [
    {
      id: "excel-m5-freeze-panes-1",
      app: "excel",
      title: "Keep the visit headers in view",
      scenario:
        "You are updating a wide monthly visit report: sixteen providers across twelve months. Without the header row and provider column on screen, it is easy to type a number into the wrong month.",
      fileName: "Monthly Visits 2026.xlsx",
      minutes: 4,
      initial: {
        active: "Monthly Visits",
        sheets: [
          {
            name: "Monthly Visits",
            cols: 15,
            rows: 24,
            colWidths: { A: 130 },
            cells: (() => {
              const providers = [
                "Dr. Amara Okafor", "Dr. Luis Reyes", "Dr. Hannah Kim", "Dr. Priya Shah", "Dr. Marcus Bell", "Dr. Elena Petrova", "Dr. Samuel Osei", "Dr. Rachel Stein",
                "NP Jordan Lee", "NP Tasha Grant", "NP Victor Ramos", "PA Noelle Park", "PA Brian Walsh", "Dr. Farah Aziz", "Dr. Owen Burke", "Dr. Lucia Moreno",
              ];
              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const rows: (string | number)[][] = [["Provider", ...months, "Total"]];
              providers.forEach((p, i) => rows.push([p, ...months.map((_, m) => 180 + ((i * 37 + m * 23) % 140)), `=SUM(B${i + 2}:M${i + 2})`]));
              return grid("A1", rows, { header: true });
            })(),
          },
        ],
      },
      tasks: [
        {
          instruction: "Freeze the top row so the month headers stay visible.",
          hint: "View tab › Window group › Freeze Panes › Freeze Top Row.",
          steps: [{ action: { kind: "command", id: "view.freeze", value: "Freeze Top Row" } }],
        },
        {
          instruction: "Unfreeze the panes.",
          hint: "View tab › Window group › Freeze Panes › Unfreeze Panes.",
          steps: [{ action: { kind: "command", id: "view.freeze", value: "Unfreeze Panes" } }],
        },
        {
          instruction: "Freeze row 1 and column A at the same time.",
          hint: "Click B2, then View tab › Window group › Freeze Panes › Freeze Panes. Excel freezes everything above and to the left of the selected cell.",
          steps: [
            {
              action: { kind: "command", id: "view.freeze", value: "Freeze Panes" },
              requires: { selection: "B2" },
              selectHint: "Click B2 first: rows above it and columns left of it will stay put.",
            },
          ],
        },
        {
          instruction: "Open a second window onto this same workbook.",
          hint: "View tab › Window group › New Window.",
          steps: [{ action: { kind: "command", id: "view.newWindow" } }],
        },
        {
          instruction: "Arrange the open windows so you can see both at once.",
          hint: "View tab › Window group › Arrange All (Tiled or Vertical), OK.",
          steps: [{ action: { kind: "command", id: "view.arrangeAll" }, alt: [{ kind: "command", id: "view.sideBySide" }] }],
        },
        {
          instruction: "Split the worksheet at cell G12 so you can compare distant months and providers.",
          hint: "Click G12. View tab › Window group › Split.",
          steps: [{ action: { kind: "command", id: "view.split" }, requires: { selection: "G12" }, selectHint: "Click G12 first: the split appears above and to the left of it." }],
        },
      ],
    },
  ],

  "module-5::sorting-data": [
    {
      id: "excel-m5-sorting-1",
      app: "excel",
      title: "Sort the supply order list",
      scenario:
        "The supply order list needs to be read several ways today: by item, by cost, by department, and by urgency. The Row # column lets you put it back in its original order at any time.",
      fileName: "Supply Orders.xlsx",
      minutes: 5,
      initial: {
        active: "Orders",
        sheets: [
          {
            name: "Orders",
            colWidths: { A: 50, B: 150, C: 116, D: 64, E: 44, F: 80 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Row #", "Item", "Department", "Priority", "Qty", "Cost"],
                  [1, "Nitrile gloves (M)", "Family Medicine", "Routine", 30, 217.5],
                  [2, "Defibrillator pads", "Cardiology", "Stat", 2, 189],
                  [3, "Specimen cups", "Laboratory", "Urgent", 10, 224],
                  [4, "Exam table paper", "Pediatrics", "Routine", 6, 111],
                  [5, "Vaccine cooler packs", "Pediatrics", "Urgent", 4, 98.25],
                  [6, "ECG electrodes", "Cardiology", "Routine", 8, 93.6],
                  [7, "Blood collection tubes", "Laboratory", "Stat", 48, 312.6],
                  [8, "Alcohol prep pads", "Family Medicine", "Routine", 20, 88],
                  [9, "Infant scale liners", "Pediatrics", "Routine", 3, 42.75],
                  [10, "Glucose test strips", "Laboratory", "Urgent", 12, 189.9],
                  [11, "Gauze pads 4x4", "Family Medicine", "Urgent", 18, 176.4],
                  [12, "Holter monitor batteries", "Cardiology", "Routine", 16, 118.4],
                  [13, "Sharps container", "Family Medicine", "Stat", 6, 66],
                  [14, "Tongue depressors", "Pediatrics", "Routine", 10, 36],
                  [15, "Pipette tips", "Laboratory", "Routine", 5, 96.75],
                ],
                { header: true, colFmt: { F: MONEY } },
              ),
              E18: { v: "Total", fmt: { bold: true } },
              F18: { f: "=SUM(F2:F16)", fmt: { numFmt: "Currency", bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Sort the orders by Item from A to Z.",
          hint: "Click any cell in the Item column (B2:B16). Data tab › Sort & Filter group › Sort A to Z.",
          steps: [
            {
              action: { kind: "command", id: "data.sortAsc" },
              requires: { selection: colCells("B", 1, 16) },
              selectHint: "Click one cell in the Item column. Do not select the whole column: Excel needs to sort complete rows.",
            },
          ],
        },
        {
          instruction: "Sort the orders by Cost from largest to smallest.",
          hint: "Click any cell in the Cost column (F2:F16). Data tab › Sort & Filter group › Sort Z to A (Largest to Smallest).",
          steps: [
            {
              action: { kind: "command", id: "data.sortDesc" },
              requires: { selection: colCells("F", 1, 16) },
              selectHint: "Click one cell in the Cost column first.",
            },
          ],
        },
        {
          instruction: "In one sort, sort by Department from A to Z, then by Cost from largest to smallest.",
          hint: "Click a cell in the data. Data tab › Sort. Sort by Department, A to Z. Then by Cost, Largest to Smallest. OK.",
          steps: [
            {
              action: { kind: "dialog", id: "sort", values: { sortBy: "Department", order: "A to Z", thenBy: "Cost", thenOrder: "Largest to Smallest" } },
              requires: { selection: cells("A1:F16") },
              selectHint: "Click a single cell inside the order data (A1:F16) first.",
            },
          ],
        },
        {
          instruction: "Sort by Priority in the order Stat, Urgent, Routine using a custom list.",
          hint: "Click a cell in the data. Data tab › Sort. Sort by Priority, Order: Custom List..., enter Stat, Urgent, Routine. Set Then by to (none). OK.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "sort",
                values: { sortBy: "Priority", order: "Custom List...", customList: ["Stat, Urgent, Routine", "Stat,Urgent,Routine"] },
              },
              requires: { selection: cells("A1:F16") },
              selectHint: "Click a single cell inside the order data (A1:F16) first.",
            },
          ],
        },
        {
          instruction: "Put the list back in its original order by sorting on the Row # column, smallest to largest.",
          hint: "Click any cell in the Row # column (A2:A16). Data tab › Sort A to Z (Smallest to Largest).",
          steps: [
            {
              action: { kind: "command", id: "data.sortAsc" },
              alt: [{ kind: "dialog", id: "sort", values: { sortBy: "Row #", order: "Smallest to Largest" } }],
              requires: { selection: colCells("A", 1, 16) },
              selectHint: "Click one cell in the Row # column first.",
            },
          ],
        },
      ],
    },
  ],

  "module-5::filtering-data": [
    {
      id: "excel-m5-filtering-1",
      app: "excel",
      title: "Report the medical and lab spending",
      scenario:
        "The practice manager asks how much went to medical and lab supplies in Q3, and how much of that came from Medline Industries. Filter the log, and make the total respect the filter.",
      fileName: "Q3 Spending Log.xlsx",
      minutes: 5,
      initial: {
        active: "Spending",
        sheets: [
          {
            name: "Spending",
            colWidths: { A: 78, B: 150, C: 76, D: 124, E: 84 },
            cells: {
              ...grid("A1", [["Date", "Item", "Category", "Vendor", "Amount"], ...SPENDING], { header: true, colFmt: { A: DATE, E: MONEY } }),
              D23: { v: "Total", fmt: { bold: true } },
              E23: { f: "=SUM(E2:E21)", fmt: { numFmt: "Currency", bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Turn on filter buttons for the spending data.",
          hint: "Click any cell in the data. Data tab › Sort & Filter group › Filter (or Ctrl+Shift+L).",
          steps: [{ action: { kind: "command", id: "data.filter" }, requires: { selection: cells("A1:E21") }, selectHint: "Click a cell inside the data (A1:E21) first." }],
        },
        {
          instruction: "Filter the Category column to show only Lab and Medical.",
          hint: "Click the Category filter arrow. Uncheck (Select All), check Lab and Medical, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "C=Lab|Medical" } }],
        },
        {
          instruction: "E23 still totals every row. Replace it with a SUBTOTAL formula that adds only the visible rows of E2:E21.",
          hint: "Click E23, type =SUBTOTAL(109,E2:E21) and press Enter. Code 109 sums visible rows only.",
          steps: [{ action: { kind: "type", target: "E23", value: ["=SUBTOTAL(109,E2:E21)", "=SUBTOTAL(9,E2:E21)"], match: "formula" } }],
        },
        {
          instruction: "Add a second filter: show only orders from Medline Industries.",
          hint: "Click the Vendor filter arrow. Uncheck (Select All), check Medline Industries, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "D=Medline Industries" } }],
        },
        {
          instruction: "Clear the filter from the Vendor column only, keeping the Category filter.",
          hint: "Click the Vendor filter arrow › Clear Filter From \"Vendor\".",
          steps: [{ action: { kind: "command", id: "filter.by", value: "D=*" } }],
        },
        {
          instruction: "Turn the filter buttons off, which also shows every row again.",
          hint: "Data tab › Sort & Filter group › Filter (or Ctrl+Shift+L).",
          steps: [{ action: { kind: "command", id: "data.filter" } }],
        },
      ],
    },
    {
      id: "excel-m5-filtering-2",
      app: "excel",
      title: "Narrow the equipment loan log",
      scenario:
        "The equipment loan log tracks laptops, monitors and clinical devices lent to staff. Use search, number, date and text filters to answer the IT coordinator's questions.",
      fileName: "Equipment Loans.xlsx",
      minutes: 6,
      initial: {
        active: "Loans",
        sheets: [
          {
            name: "Loans",
            colWidths: { A: 50, B: 104, C: 170, D: 86, E: 80, F: 84 },
            cells: grid("A1", [["ID", "Type", "Item Description", "Checked Out", "Due", "Loan Value"], ...LOANS], { header: true, colFmt: { D: DATE, E: DATE, F: MONEY } }),
          },
        ],
      },
      tasks: [
        {
          instruction: "Turn on filter buttons for the loan log.",
          hint: "Click any cell in the data. Data tab › Filter (or Ctrl+Shift+L).",
          steps: [{ action: { kind: "command", id: "data.filter" }, requires: { selection: cells("A1:F19") }, selectHint: "Click a cell inside the data (A1:F19) first." }],
        },
        {
          instruction: "Use the search box in the Item Description filter to show only items containing \"Omron\".",
          hint: "Click the Item Description filter arrow, type Omron in the Search box, OK. (Text Filters › Contains also works.)",
          steps: [
            {
              action: { kind: "command", id: "filter.by", value: "C=Omron 10 Series wireless|Omron 3 Series wrist|Omron 7 Series upper arm|Omron Platinum upper arm" },
              alt: [{ kind: "command", id: "filter.by", value: "C~contains Omron" }],
            },
          ],
        },
        {
          instruction: "Clear the Item Description filter.",
          hint: "Click the Item Description filter arrow › Clear Filter From \"Item Description\".",
          steps: [{ action: { kind: "command", id: "filter.by", value: "C=*" } }],
        },
        {
          instruction: "Show only loans with a Loan Value greater than or equal to $100.",
          hint: "Click the Loan Value filter arrow › Number Filters › Greater Than Or Equal To..., type 100, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "F~>=100" } }],
        },
        {
          instruction: "Add a date filter: show only items checked out after 9/30/2026.",
          hint: "Click the Checked Out filter arrow › Date Filters › After..., type 9/30/2026, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: `D~>${serial(9, 30)}` } }],
        },
        {
          instruction: "Finally, hide the laptops: filter the Type column to show every type except Laptop.",
          hint: "Click the Type filter arrow › Text Filters › Does Not Equal..., type Laptop, OK. (Or uncheck Laptop in the list.)",
          steps: [
            {
              action: { kind: "command", id: "filter.by", value: "B~<>Laptop" },
              alt: [{ kind: "command", id: "filter.by", value: "B=Monitor|Projector|Pulse Oximeter|Tablet" }],
            },
          ],
        },
      ],
    },
  ],

  "module-5::groups-and-subtotals": [
    {
      id: "excel-m5-subtotals-1",
      app: "excel",
      title: "Subtotal supply spending by department",
      scenario:
        "The practice manager wants four numbers, one per department, and the details behind each. Sort first so each department is one block, then let Subtotal build the outline.",
      fileName: "Department Spending.xlsx",
      minutes: 5,
      initial: {
        active: "Spending",
        sheets: [
          {
            name: "Spending",
            rows: 24,
            colWidths: { A: 120, B: 170, C: 124, D: 84 },
            cells: grid(
              "A1",
              [
                ["Department", "Item", "Vendor", "Amount"],
                ["Pediatrics", "Nitrile gloves (S)", "McKesson", 145],
                ["Cardiology", "ECG electrodes", "McKesson", 93.6],
                ["Family Medicine", "Exam table paper", "Medline Industries", 222],
                ["Radiology", "Lead apron cleaner", "Henry Schein", 64.5],
                ["Pediatrics", "Tongue depressors", "McKesson", 54],
                ["Family Medicine", "Alcohol prep pads", "Cardinal Health", 88],
                ["Cardiology", "Holter monitor batteries", "Cardinal Health", 118.4],
                ["Radiology", "Ultrasound gel", "Medline Industries", 76.8],
                ["Family Medicine", "Patient gowns", "Medline Industries", 260],
                ["Pediatrics", "Infant scale liners", "Medline Industries", 42.75],
                ["Cardiology", "Defibrillator pads", "Cardinal Health", 189],
                ["Family Medicine", "Gauze pads 4x4", "McKesson", 176.4],
                ["Pediatrics", "Vaccine cooler packs", "Henry Schein", 98.25],
                ["Radiology", "Positioning sponges", "Henry Schein", 133],
              ],
              { header: true, colFmt: { D: MONEY } },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Sort the data by Department from A to Z.",
          hint: "Click any cell in the Department column. Data tab › Sort & Filter group › Sort A to Z.",
          steps: [{ action: { kind: "command", id: "data.sortAsc" }, requires: { selection: colCells("A", 1, 15) }, selectHint: "Click one cell in the Department column first." }],
        },
        {
          instruction: "Add subtotals: at each change in Department, use the Sum function, and add the subtotal to Amount.",
          hint: "Click a cell in the data. Data tab › Outline group › Subtotal. At each change in: Department. Use function: Sum. Add subtotal to: Amount. OK.",
          steps: [
            {
              action: { kind: "dialog", id: "subtotal", values: { atEachChange: "Department", fn: "Sum", addTo: "Amount" } },
              requires: { selection: cells("A1:D15") },
              selectHint: "Click a cell inside the data first.",
            },
          ],
        },
        {
          instruction: "Show only the department subtotals and the grand total.",
          hint: "Click the 2 outline level button above the row numbers.",
          steps: [{ action: { kind: "command", id: "outline.level", value: "2" } }],
        },
        {
          instruction: "Expand just the Pediatrics group to see its detail rows.",
          hint: "Click the + button beside the Pediatrics Total row in the outline bar.",
          steps: [{ action: { kind: "command", id: "outline.toggle", value: "11:14" } }],
        },
        {
          instruction: "Show every detail row again.",
          hint: "Click the 3 outline level button above the row numbers.",
          steps: [{ action: { kind: "command", id: "outline.level", value: "3" } }],
        },
      ],
    },
    {
      id: "excel-m5-groups-1",
      app: "excel",
      title: "Group the budget by quarter",
      scenario:
        "The annual supply budget lists every month with a quarter total under each set of three. Group the months so the board can collapse the sheet to quarter totals.",
      fileName: "Supply Budget by Month.xlsx",
      minutes: 4,
      initial: {
        active: "Budget",
        sheets: [
          {
            name: "Budget",
            colWidths: { A: 110, B: 90, C: 90 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Month", "Budget", "Actual"],
                  ["January", 7800, 7655.2],
                  ["February", 7800, 7920.4],
                  ["March", 8100, 8012.9],
                  ["Q1 Total", "=SUM(B2:B4)", "=SUM(C2:C4)"],
                  ["April", 8100, 7988.15],
                  ["May", 8100, 8240.6],
                  ["June", 8300, 8195],
                  ["Q2 Total", "=SUM(B6:B8)", "=SUM(C6:C8)"],
                ],
                { header: true, colFmt: { B: MONEY, C: MONEY } },
              ),
              A5: { v: "Q1 Total", fmt: { bold: true } },
              A9: { v: "Q2 Total", fmt: { bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Group rows 2 through 4 (January to March).",
          hint: "Select rows 2:4 (drag across the row headers). Data tab › Outline group › Group (or Shift+Alt+Right Arrow).",
          steps: [{ action: { kind: "command", id: "data.group" }, requires: { selection: ["2:4", "A2:C4", "A2:A4"] }, selectHint: "Select rows 2 through 4 first." }],
        },
        {
          instruction: "Group rows 6 through 8 (April to June).",
          hint: "Select rows 6:8. Data tab › Outline group › Group.",
          steps: [{ action: { kind: "command", id: "data.group" }, requires: { selection: ["6:8", "A6:C8", "A6:A8"] }, selectHint: "Select rows 6 through 8 first." }],
        },
        {
          instruction: "Collapse the January to March group so only the Q1 Total shows.",
          hint: "Click the minus (−) button beside the Q1 Total row in the outline bar.",
          steps: [{ action: { kind: "command", id: "outline.toggle", value: "2:4" } }],
        },
        {
          instruction: "Collapse every group at once with the outline level buttons.",
          hint: "Click the 1 outline level button above the row numbers.",
          steps: [{ action: { kind: "command", id: "outline.level", value: "1" } }],
        },
        {
          instruction: "Expand every group again.",
          hint: "Click the 2 outline level button above the row numbers.",
          steps: [{ action: { kind: "command", id: "outline.level", value: "2" } }],
        },
      ],
    },
  ],

  "module-5::conditional-formatting": [
    {
      id: "excel-m5-conditional-formatting-1",
      app: "excel",
      title: "Flag stock levels at a glance",
      scenario:
        "You monitor stock levels at Lakeside. Highlighting low items by hand goes stale within a week, so set up rules that follow the numbers as they change.",
      fileName: "Stock Levels.xlsx",
      minutes: 5,
      initial: { active: "Stock", sheets: [{ name: "Stock", colWidths: STOCK_WIDTHS, cells: stockCells() }] },
      tasks: [
        {
          instruction: "Highlight On Hand values in C2:C16 that are less than 25 with Light Red Fill with Dark Red Text.",
          hint: "Select C2:C16. Home tab › Styles group › Conditional Formatting › Highlight Cells Rules › Less Than. Type 25, keep Light Red Fill with Dark Red Text, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "cfLess", values: { value: "25", format: "Light Red Fill with Dark Red Text" } },
              requires: { selection: "C2:C16" },
              selectHint: "Select the On Hand values in C2:C16 first.",
            },
          ],
        },
        {
          instruction: "Add blue data bars to the Stock Value cells F2:F16.",
          hint: "Select F2:F16. Home tab › Conditional Formatting › Data Bars › Blue Data Bar.",
          steps: [{ action: { kind: "command", id: "home.conditionalFormatting", value: "Blue Data Bar" }, requires: { selection: "F2:F16" }, selectHint: "Select F2:F16 first." }],
        },
        {
          instruction: "Apply the Green - Yellow - Red color scale to the Unit Cost cells E2:E16.",
          hint: "Select E2:E16. Home tab › Conditional Formatting › Color Scales › Green - Yellow - Red Color Scale.",
          steps: [{ action: { kind: "command", id: "home.conditionalFormatting", value: "Green - Yellow - Red Color Scale" }, requires: { selection: "E2:E16" }, selectHint: "Select E2:E16 first." }],
        },
        {
          instruction: "Highlight the top 3 Stock Values in F2:F16 with Green Fill with Dark Green Text.",
          hint: "Select F2:F16. Home tab › Conditional Formatting › Top/Bottom Rules › Top 10 Items. Change 10 to 3, choose Green Fill with Dark Green Text, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "cfTop10", values: { count: 3, format: "Green Fill with Dark Green Text" } },
              requires: { selection: "F2:F16" },
              selectHint: "Select F2:F16 first.",
            },
          ],
        },
        {
          instruction: "Apply the 3 Symbols (Circled) icon set to the On Hand values in C2:C16.",
          hint: "Select C2:C16. Home tab › Conditional Formatting › Icon Sets › 3 Symbols (Circled).",
          steps: [{ action: { kind: "command", id: "home.conditionalFormatting", value: "3 Symbols (Circled)" }, requires: { selection: "C2:C16" }, selectHint: "Select C2:C16 first." }],
        },
      ],
    },
    {
      id: "excel-m5-conditional-formatting-2",
      app: "excel",
      title: "Highlight whole rows that need reordering",
      scenario:
        "A red On Hand cell is easy to miss on a long sheet. Make the entire row turn yellow when stock falls below its reorder level, add a status column driven by the same test, and tidy up old rules.",
      fileName: "Stock Levels.xlsx",
      minutes: 5,
      initial: {
        active: "Stock",
        sheets: [
          {
            name: "Stock",
            colWidths: STOCK_WIDTHS,
            cells: { ...stockCells(), G1: { v: "Status", fmt: { bold: true, fill: "#D9E1F2", border: "bottom" } } },
            cf: [
              { range: "C2:C16", rule: "Less Than", value: "25", fill: "#FFC7CE", color: "#9C0006" },
              { range: "E2:E16", rule: "Greater Than", value: "40", fill: "#FFEB9C", color: "#9C5700" },
              { range: "F2:F16", rule: "Blue Data Bar" },
            ],
          },
        ],
      },
      tasks: [
        {
          instruction: "Select A2:F16 and add a formula rule, =$C2<$D2, that formats whole rows with Yellow Fill with Dark Yellow Text.",
          hint: "Select A2:F16. Home tab › Conditional Formatting › New Rule › Use a formula to determine which cells to format. Type =$C2<$D2, choose Yellow Fill with Dark Yellow Text, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "cfNewRule", values: { formula: ["=$C2<$D2", "$C2<$D2", "=$D2>$C2"], format: "Yellow Fill with Dark Yellow Text" } },
              requires: { selection: "A2:F16" },
              selectHint: "Select A2:F16, starting from A2, so the formula is written for row 2.",
            },
          ],
        },
        {
          instruction: "In G2, enter a formula that shows \"Reorder\" when On Hand (C2) is below the Reorder Level (D2), and \"OK\" otherwise.",
          hint: "Click G2 and type =IF(C2<D2,\"Reorder\",\"OK\"), then press Enter.",
          steps: [
            {
              action: { kind: "type", target: "G2", value: ['=IF(C2<D2,"Reorder","OK")', '=IF(D2>C2,"Reorder","OK")', '=IF(C2>=D2,"OK","Reorder")'], match: "formula" },
            },
          ],
        },
        {
          instruction: "Copy the formula in G2 down through G16.",
          hint: "Select G2 and double-click the fill handle (or drag it down to G16).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "G2:G16" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down", requires: { selection: "G2:G16" } }],
              requires: { selection: ["G2", "G2:G16"] },
              selectHint: "Start from G2 (or select G2:G16 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "Use the Rules Manager to delete the outdated rule on Unit Cost (Cell Value > 40 on E2:E16).",
          hint: "Home tab › Conditional Formatting › Manage Rules. Select Cell Value > 40 (applies to E2:E16) and click Delete Rule.",
          steps: [{ action: { kind: "dialog", id: "cfManage", values: { rule: "Cell Value > 40 (applies to E2:E16)" } } }],
        },
        {
          instruction: "Clear all conditional formatting rules from the Stock Value cells F2:F16.",
          hint: "Select F2:F16. Home tab › Conditional Formatting › Clear Rules from Selected Cells.",
          steps: [
            {
              action: { kind: "command", id: "home.conditionalFormatting", value: "Clear Rules from Selected Cells" },
              requires: { selection: "F2:F16" },
              selectHint: "Select F2:F16 first.",
            },
          ],
        },
      ],
    },
  ],
};
