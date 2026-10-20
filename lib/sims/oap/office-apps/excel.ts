import type { ExcelCell, ExcelPivot, ExcelSheet, SimDefinition, SimStep } from "@/types/sim";
import { cells, colCells, column, DATE, fmtOnly, grid, MONEY, serial, TITLE } from "@/lib/sims/excel/helpers";

/**
 * office-apps sims that run in the Excel engine. Keys are "<moduleSlug>::<lessonSlug>".
 *
 * Module 3 (Excel Essentials) and Module 4 (Excel Advanced) of the Office
 * Assistant Program, set at Lakeside Medical Associates with Renee Alvarez as
 * the practice manager. The workbooks are deliberately different from the
 * ms-office Excel sims. All people and vendors are fictional.
 */

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** The selection itself or any single cell inside it ("click a cell in the data"). */
const inData = (range: string): string[] => [range, ...cells(range)];

/**
 * A fill-handle step from `src` to `range`. Ctrl+D / Ctrl+R (Home › Fill) is
 * also accepted, but only with the whole range selected, the way Excel needs it.
 */
function fill(src: string, range: string, dir: "Down" | "Right" = "Down", sheet?: string): SimStep {
  const sh = sheet ? { sheet } : {};
  return {
    action: { kind: "command", id: "excel.fill", value: range },
    alt: [{ kind: "command", id: "home.fillSeries", value: dir, requires: { selection: range, ...sh } }],
    requires: { selection: src, ...sh },
    selectHint: `Select ${src} first (or select ${range} for ${dir === "Down" ? "Ctrl+D" : "Ctrl+R"}).`,
  };
}

/** Status the way the lesson's nested IF works it out. */
const statusOf = (qty: number, reorder: number) => (qty === 0 ? "OUT" : qty <= reorder ? "LOW" : "OK");

/* ------------------------------------------------------------------ */
/* Practice data                                                       */
/* ------------------------------------------------------------------ */

/** The Lakeside supply tracker used across Module 3: Item, Category, Quantity, Unit Cost, Reorder Level. */
const SUPPLIES: [string, string, number, number, number][] = [
  ["Exam gloves, nitrile, medium", "Medical", 18, 9.6, 12],
  ["Exam gloves, nitrile, large", "Medical", 6, 9.6, 10],
  ["Gauze sponges 2x2", "Medical", 0, 5.45, 8],
  ["Adhesive bandages, box", "Medical", 24, 3.2, 10],
  ["Thermometer probe covers", "Medical", 9, 4.85, 10],
  ["Blood pressure cuff, adult", "Medical", 3, 38.5, 2],
  ["Cotton-tipped applicators", "Medical", 14, 2.75, 6],
  ["Paper exam gowns", "Medical", 0, 21, 5],
  ["Printer paper, 10 reams", "Office", 4, 44.99, 3],
  ["Black ink pens, dozen", "Office", 2, 6.5, 4],
  ["Sticky notes, 12 pack", "Office", 7, 8.25, 3],
  ["File folders, box of 100", "Office", 1, 17.4, 2],
  ["Toner, front desk printer", "Office", 0, 92, 1],
  ["Surface disinfectant spray", "Cleaning", 11, 6.9, 6],
  ["Paper towels, case", "Cleaning", 3, 29.95, 4],
  ["Trash bags, 13 gallon", "Cleaning", 5, 15.25, 3],
  ["Hand soap refill", "Cleaning", 8, 7.8, 5],
  ["Coffee pods, 48 count", "Break Room", 2, 24.99, 3],
  ["Paper cups, 100 count", "Break Room", 6, 5.6, 4],
  ["Bottled water, case", "Break Room", 0, 4.99, 2],
];

/** Supply room inventory for the navigation sim: 20 items stocked in two places. */
const ROOM_ITEMS: [string, string, string, number][] = [
  ["Adhesive bandages, assorted", "Wound Care", "Box", 10],
  ["Alcohol prep pads", "Wound Care", "Box", 12],
  ["Gauze sponges 2x2", "Wound Care", "Pack", 8],
  ["Gauze rolls, 3 inch", "Wound Care", "Pack", 6],
  ["Paper medical tape", "Wound Care", "Box", 4],
  ["Exam gloves, nitrile, medium", "PPE", "Box", 12],
  ["Exam gloves, nitrile, large", "PPE", "Box", 10],
  ["Procedure face masks", "PPE", "Box", 8],
  ["Isolation gowns", "PPE", "Pack", 4],
  ["Face shields", "PPE", "Box", 2],
  ["Table paper, smooth", "Exam Room", "Case", 3],
  ["Paper exam gowns", "Exam Room", "Pack", 5],
  ["Disposable speculums", "Exam Room", "Box", 4],
  ["Tongue blades, wood", "Exam Room", "Box", 6],
  ["Otoscope tips", "Exam Room", "Box", 5],
  ["Urine specimen cups", "Lab", "Case", 4],
  ["Safety lancets", "Lab", "Box", 6],
  ["Pregnancy test kits", "Lab", "Box", 3],
  ["Swab transport tubes", "Lab", "Box", 4],
  ["Sharps containers, 2 gal", "Lab", "Each", 3],
];

function supplyRoomCells(): Record<string, ExcelCell> {
  const rows: (string | number)[][] = [["Item", "Category", "Storage Location", "On Hand", "Unit", "Reorder Level", "Last Counted"]];
  for (let i = 0; i < 40; i++) {
    const [item, cat, unit, reorder] = ROOM_ITEMS[i % 20];
    rows.push([item, cat, i < 20 ? "Main Supply Closet" : "Exam Room Cabinets", ((i * 7 + 5) % 23) + 1, unit, reorder, serial(10, 1 + (i % 15))]);
  }
  return grid("A1", rows, { header: true, colFmt: { G: DATE } });
}

/* Module 4 pivot data: April and May operating expenses. */
const EXPENSES: [string, string, string, string, number][] = [
  ["Apr", "Medical", "Supplies", "Harbor Medical Supply", 1240],
  ["Apr", "Nursing", "Supplies", "Harbor Medical Supply", 865],
  ["Apr", "Administration", "Supplies", "Northgate Office Products", 412],
  ["Apr", "Facilities", "Utilities", "Metro Power and Light", 1980],
  ["Apr", "Medical", "Equipment", "Pinecrest Equipment Co.", 2350],
  ["Apr", "Nursing", "Staff Training", "Summit Learning Group", 600],
  ["Apr", "Administration", "Services", "Crestview IT Solutions", 1150],
  ["Apr", "Facilities", "Services", "Clearwater Facility Services", 1425],
  ["Apr", "Medical", "Services", "Bayside Linen Service", 540],
  ["Apr", "Nursing", "Equipment", "Pinecrest Equipment Co.", 780],
  ["Apr", "Administration", "Staff Training", "Summit Learning Group", 450],
  ["Apr", "Facilities", "Supplies", "Clearwater Facility Services", 315],
  ["Apr", "Medical", "Supplies", "Harbor Medical Supply", 960],
  ["Apr", "Administration", "Utilities", "Metro Power and Light", 220],
  ["Apr", "Nursing", "Services", "Bayside Linen Service", 380],
  ["May", "Medical", "Supplies", "Harbor Medical Supply", 1385],
  ["May", "Nursing", "Supplies", "Harbor Medical Supply", 910],
  ["May", "Administration", "Supplies", "Northgate Office Products", 365],
  ["May", "Facilities", "Utilities", "Metro Power and Light", 2110],
  ["May", "Medical", "Equipment", "Pinecrest Equipment Co.", 1675],
  ["May", "Nursing", "Staff Training", "Summit Learning Group", 600],
  ["May", "Administration", "Services", "Crestview IT Solutions", 1150],
  ["May", "Facilities", "Services", "Clearwater Facility Services", 1390],
  ["May", "Medical", "Services", "Bayside Linen Service", 565],
  ["May", "Nursing", "Equipment", "Pinecrest Equipment Co.", 420],
  ["May", "Administration", "Staff Training", "Summit Learning Group", 300],
  ["May", "Facilities", "Equipment", "Pinecrest Equipment Co.", 2480],
  ["May", "Medical", "Staff Training", "Summit Learning Group", 750],
  ["May", "Administration", "Utilities", "Metro Power and Light", 235],
  ["May", "Nursing", "Services", "Bayside Linen Service", 395],
];

const EXPENSE_WIDTHS = { A: 56, B: 112, C: 104, D: 190, E: 84 };

function expenseCells(): Record<string, ExcelCell> {
  return grid("A1", [["Month", "Department", "Category", "Vendor", "Amount"], ...EXPENSES], { header: true, colFmt: { E: { numFmt: "Number", decimals: 2 } } });
}

/** June bills, so the PivotTable practice spans three months. */
const JUNE_EXPENSES: [string, string, string, string, number][] = [
  ["Jun", "Medical", "Supplies", "Harbor Medical Supply", 1310],
  ["Jun", "Nursing", "Supplies", "Harbor Medical Supply", 885],
  ["Jun", "Administration", "Services", "Crestview IT Solutions", 1150],
  ["Jun", "Facilities", "Utilities", "Metro Power and Light", 2240],
  ["Jun", "Medical", "Equipment", "Pinecrest Equipment Co.", 980],
  ["Jun", "Nursing", "Staff Training", "Summit Learning Group", 450],
  ["Jun", "Facilities", "Services", "Clearwater Facility Services", 1405],
  ["Jun", "Administration", "Supplies", "Northgate Office Products", 390],
];

/**
 * The spring expense log with real invoice dates (bills are posted on the
 * 5th, 15th and 25th), April through June, as an Excel Table named SpringExpenses.
 */
function datedExpenseSheet(): ExcelSheet {
  const month = { Apr: 4, May: 5, Jun: 6 } as Record<string, number>;
  const seen: Record<string, number> = {};
  const rows = [...EXPENSES, ...JUNE_EXPENSES].map(([m, d, c, v, a]) => {
    const k = (seen[m] = (seen[m] ?? -1) + 1);
    return [serial(month[m], [5, 15, 25][k % 3]), d, c, v, a];
  });
  return {
    name: "Expenses",
    colWidths: { ...EXPENSE_WIDTHS, A: 78 },
    rows: 40,
    table: { range: `A1:E${rows.length + 1}`, style: "Table Style Medium 2", name: "SpringExpenses" },
    filter: `A1:E${rows.length + 1}`,
    cells: grid("A1", [["Date", "Department", "Category", "Vendor", "Amount"], ...rows], { header: true, colFmt: { A: DATE, E: { numFmt: "Number", decimals: 2 } } }),
  };
}

/* Module 4 capstone: the May expense log. */
const DASH_EXPENSES: [string, string, string, string, number][] = [
  ["Apr", "Medical", "Supplies", "Lakeshore Surgical Supply", 1320],
  ["Apr", "Nursing", "Supplies", "Lakeshore Surgical Supply", 740],
  ["Apr", "Administration", "Services", "Brightway Office Supply", 285],
  ["Apr", "Facilities", "Utilities", "Northshore Electric Co-op", 1860],
  ["Apr", "Medical", "Equipment", "Lumen Diagnostics", 2240],
  ["Apr", "Nursing", "Staff Training", "Keystone Training Partners", 550],
  ["Apr", "Administration", "Equipment", "Lumen Diagnostics", 690],
  ["Apr", "Facilities", "Services", "Evergreen Building Services", 1275],
  ["Apr", "Medical", "Services", "Riverbend Laundry Service", 610],
  ["Apr", "Facilities", "Supplies", "Evergreen Building Services", 340],
  ["Apr", "Nursing", "Services", "Riverbend Laundry Service", 415],
  ["Apr", "Administration", "Staff Training", "Keystone Training Partners", 375],
  ["May", "Medical", "Supplies", "Lakeshore Surgical Supply", 1455],
  ["May", "Nursing", "Supplies", "Lakeshore Surgical Supply", 805],
  ["May", "Administration", "Supplies", "Brightway Office Supply", 310],
  ["May", "Facilities", "Utilities", "Northshore Electric Co-op", 1990],
  ["May", "Medical", "Equipment", "Lumen Diagnostics", 1180],
  ["May", "Nursing", "Equipment", "Lumen Diagnostics", 460],
  ["May", "Administration", "Services", "Brightway Office Supply", 295],
  ["May", "Facilities", "Services", "Evergreen Building Services", 1310],
  ["May", "Medical", "Services", "Riverbend Laundry Service", 640],
  ["May", "Nursing", "Staff Training", "Keystone Training Partners", 550],
  ["May", "Facilities", "Equipment", "Lumen Diagnostics", 2075],
  ["May", "Medical", "Staff Training", "Keystone Training Partners", 800],
  ["May", "Administration", "Utilities", "Northshore Electric Co-op", 245],
];

const DEPARTMENTS = ["Administration", "Facilities", "Medical", "Nursing"];

function dashExpenseSheet(): ExcelSheet {
  return {
    name: "Expense Data",
    colWidths: EXPENSE_WIDTHS,
    rows: 30,
    cells: grid("A1", [["Month", "Department", "Category", "Vendor", "Amount"], ...DASH_EXPENSES], { header: true, colFmt: { E: MONEY } }),
  };
}

/* Module 4 functions: the May appointment log and the provider rate table. */
const APPTS: [string, string, number, string, number][] = [
  ["A-2101", "Dr. Anika Patel", serial(5, 4), "New Patient", 420],
  ["A-2102", "Dr. Wei Chen", serial(5, 4), "Follow-Up", 185],
  ["A-2103", "Dr. Samuel Okafor", serial(5, 5), "Specialist Referral", 515],
  ["A-2104", "NP Lena Marsh", serial(5, 5), "Follow-Up", 140],
  ["A-2105", "Dr. Anika Patel", serial(5, 6), "Follow-Up", 195],
  ["A-2106", "Dr. Wei Chen", serial(5, 7), "New Patient", 360],
  ["A-2107", "Dr. Samuel Okafor", serial(5, 7), "Follow-Up", 210],
  ["A-2108", "NP Lena Marsh", serial(5, 8), "New Patient", 290],
  ["A-2109", "Dr. Anika Patel", serial(5, 11), "Specialist Referral", 480],
  ["A-2110", "Dr. Wei Chen", serial(5, 12), "Follow-Up", 175],
  ["A-2111", "Dr. Samuel Okafor", serial(5, 13), "New Patient", 445],
  ["A-2112", "Dr. Anika Patel", serial(5, 14), "New Patient", 395],
  ["A-2113", "NP Lena Marsh", serial(5, 15), "Follow-Up", 150],
  ["A-2114", "Dr. Wei Chen", serial(5, 18), "Specialist Referral", 530],
  ["A-2115", "Dr. Samuel Okafor", serial(5, 19), "Follow-Up", 200],
];

function apptCells(extraHeads: string[] = []): Record<string, ExcelCell> {
  return grid("A1", [["Appt ID", "Provider", "Date", "Type", "Revenue", ...extraHeads], ...APPTS], { header: true, colFmt: { C: DATE, E: MONEY } });
}

const APPT_WIDTHS = { A: 64, B: 130, C: 78, D: 128, E: 74, F: 110, G: 120, H: 110 };

/* ------------------------------------------------------------------ */
/* Module 3: Excel Essentials                                          */
/* ------------------------------------------------------------------ */

const m3Sims: Record<string, SimDefinition[]> = {
  "module-3::intro-to-excel-2019": [
    {
      id: "oa-excel-m3-intro-1",
      app: "excel",
      title: "Find the glove count in a long supply list",
      scenario:
        "Renee Alvarez, the practice manager at Lakeside Medical Associates, asks how many boxes of medium exam gloves are in the exam room cabinets. The supply room workbook has 40 rows, so move around it with the Name Box and the keyboard instead of scrolling.",
      fileName: "Supply Room Inventory.xlsx",
      minutes: 5,
      initial: {
        active: "Medical Supplies",
        sheets: [
          { name: "Medical Supplies", rows: 44, colWidths: { A: 190, B: 84, C: 140, D: 64, E: 48, F: 92, G: 86 }, cells: supplyRoomCells() },
          { name: "Office Supplies", colWidths: { A: 170 }, cells: grid("A1", [["Item", "On Hand"], ["Printer paper, 10 reams", 4], ["Black ink pens, dozen", 2]], { header: true }) },
          { name: "Cleaning Supplies", colWidths: { A: 170 }, cells: grid("A1", [["Item", "On Hand"], ["Surface disinfectant spray", 11], ["Paper towels, case", 3]], { header: true }) },
        ],
      },
      tasks: [
        {
          instruction: "Go to cell D27, the On Hand count for the medium exam gloves in the exam room cabinets.",
          hint: "Click the Name Box at the left end of the formula bar, type D27 and press Enter.",
          steps: [{ action: { kind: "select", target: "D27" } }],
        },
        {
          instruction: "Jump to the last item in the Item column, cell A41, using the keyboard.",
          hint: "Click A1, then press Ctrl+Down Arrow. Excel stops at the last filled cell before an empty one.",
          steps: [{ action: { kind: "select", target: "A41" } }],
        },
        {
          instruction: "Jump to the last cell on the sheet that contains data.",
          hint: "Press Ctrl+End. Excel jumps to G41, the bottom-right corner of the data.",
          steps: [{ action: { kind: "select", target: "G41" } }],
        },
        {
          instruction: "Return to cell A1 using the keyboard.",
          hint: "Press Ctrl+Home from anywhere on the sheet.",
          steps: [{ action: { kind: "select", target: "A1" } }],
        },
        {
          instruction: "Find every cell on the sheet that contains \"gauze\".",
          hint: "Press Ctrl+F (or Home tab › Editing group › Find & Select › Find). Type gauze and click Find All.",
          steps: [{ action: { kind: "dialog", id: "find", values: { find: "gauze" } } }],
        },
        {
          instruction: "Split the window at cell E21 so you can see the top and the bottom of the list at the same time.",
          hint: "Click E21. View tab › Window group › Split.",
          steps: [{ action: { kind: "command", id: "view.split" }, requires: { selection: "E21" }, selectHint: "Click E21 first: the split appears above and to the left of it." }],
        },
        {
          instruction: "Remove the split.",
          hint: "View tab › Window group › Split (click it again to turn it off).",
          steps: [{ action: { kind: "command", id: "view.split" } }],
        },
        {
          instruction: "Freeze row 1 and column A so the headers and item names stay on screen as you scroll.",
          hint: "Click B2. View tab › Window group › Freeze Panes › Freeze Panes. Excel freezes everything above and to the left of the selected cell.",
          steps: [
            {
              action: { kind: "command", id: "view.freeze", value: "Freeze Panes" },
              requires: { selection: "B2" },
              selectHint: "Click B2 first: rows above it and columns to the left of it stay put.",
            },
          ],
        },
      ],
    },
    {
      id: "oa-excel-m3-intro-2",
      app: "excel",
      title: "Set up the supply tracker workbook",
      scenario:
        "You are starting the new supply tracker for Lakeside Medical Associates. The counts are typed on Sheet1. Give the workbook one clearly named, color-coded tab per supply area, then save it as a working file and as a PDF for Renee Alvarez.",
      fileName: "Book1.xlsx",
      minutes: 5,
      initial: {
        active: "Sheet1",
        sheets: [
          {
            name: "Sheet1",
            colWidths: { A: 190, B: 76, C: 64, D: 76 },
            cells: grid("A1", [["Item", "Category", "Quantity", "Unit Cost"], ...SUPPLIES.slice(0, 8).map(([i, c, q, u]) => [i, c, q, u])], { header: true, colFmt: { D: MONEY } }),
          },
        ],
      },
      tasks: [
        {
          instruction: "Rename the Sheet1 tab \"Medical Supplies\".",
          hint: "Double-click the Sheet1 tab (or right-click it › Rename), type Medical Supplies and press Enter.",
          steps: [{ action: { kind: "type", target: "sheet:Sheet1", value: "Medical Supplies" } }],
        },
        {
          instruction: "Insert a new worksheet after Medical Supplies and name it \"Office Supplies\".",
          hint: "With the Medical Supplies tab active, click New sheet (+) to the right of the tabs. Then double-click the new Sheet2 tab, type Office Supplies and press Enter.",
          steps: [
            { action: { kind: "command", id: "sheet.add" }, requires: { sheet: "Medical Supplies" }, selectHint: "Click the Medical Supplies tab first: the new sheet is added after the active sheet." },
            { action: { kind: "type", target: "sheet:Sheet2", value: "Office Supplies" } },
          ],
        },
        {
          instruction: "Insert another worksheet after Office Supplies and name it \"Summary\".",
          hint: "With the Office Supplies tab active, click New sheet (+). Double-click the new Sheet3 tab, type Summary and press Enter.",
          steps: [
            { action: { kind: "command", id: "sheet.add" }, requires: { sheet: "Office Supplies" }, selectHint: "Click the Office Supplies tab first." },
            { action: { kind: "type", target: "sheet:Sheet3", value: "Summary" } },
          ],
        },
        {
          instruction: "Color the tabs: Medical Supplies Blue, Office Supplies Green, and Summary Orange.",
          hint: "Right-click each tab › Tab Color and pick the color. (Or Home tab › Cells group › Format › Tab Color.)",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "sheet.tabColor", value: "Blue" }, alt: [{ kind: "command", id: "home.format", value: "Tab Color: Blue" }], requires: { sheet: "Medical Supplies" }, selectHint: "Right-click the Medical Supplies tab to color it Blue." },
            { action: { kind: "command", id: "sheet.tabColor", value: "Green" }, alt: [{ kind: "command", id: "home.format", value: "Tab Color: Green" }], requires: { sheet: "Office Supplies" }, selectHint: "Right-click the Office Supplies tab to color it Green." },
            { action: { kind: "command", id: "sheet.tabColor", value: "Orange" }, alt: [{ kind: "command", id: "home.format", value: "Tab Color: Orange" }], requires: { sheet: "Summary" }, selectHint: "Right-click the Summary tab to color it Orange." },
          ],
        },
        {
          instruction: "Save the workbook on This PC as an Excel Workbook named \"Lakeside Supply Tracker - Orientation\".",
          hint: "File tab › Save As › This PC. Type the name, keep File type as Excel Workbook (*.xlsx), and click Save. (F12 opens Save As.)",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "This PC", name: "Lakeside Supply Tracker - Orientation", format: "Excel Workbook (*.xlsx)" } } }],
        },
        {
          instruction: "Save a copy for the ordering system on This PC in CSV (Comma delimited) format, named \"Medical Supplies Export\".",
          hint: "File tab › Save As › This PC. Type the name, set File type to CSV (Comma delimited) (*.csv), and click Save. A CSV keeps only the values of one sheet, so keep the .xlsx as your working file.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "This PC", name: "Medical Supplies Export", format: "CSV (Comma delimited) (*.csv)" } } }],
        },
        {
          instruction: "Export the workbook as a PDF named \"Medical Supplies Count\" for Renee Alvarez.",
          hint: "File tab › Export › Create PDF/XPS Document. Type the file name and click Create PDF/XPS.",
          steps: [{ action: { kind: "dialog", id: "file.exportPdf", values: { name: "Medical Supplies Count" } } }],
        },
      ],
    },
  ],

  "module-3::entering-and-formatting-data": [
    {
      id: "oa-excel-m3-entering-1",
      app: "excel",
      title: "Enter this month's supply purchases",
      scenario:
        "You are entering October's supply purchases for Lakeside Medical Associates. The quantities were pasted in from an email as text, one date was typed as words, and the purchase log still needs a new order, a first-name column and next month's delivery schedule.",
      fileName: "October Supply Purchases.xlsx",
      minutes: 6,
      initial: {
        active: "Purchases",
        sheets: [
          {
            name: "Purchases",
            colWidths: { A: 92, B: 180, C: 80, D: 44, E: 72, F: 110, G: 80, I: 96 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Date Ordered", "Item", "Category", "Qty", "Unit Cost", "Ordered By", "First Name"],
                  [serial(10, 1), "Exam gloves, nitrile, medium", "Medical", "20", 9.6, "Keisha Morgan"],
                  [serial(10, 2), "Printer paper, 10 reams", "Office", "3", 44.99, "Daniel Okoro"],
                  [serial(10, 5), "Surface disinfectant spray", "Cleaning", "12", 6.9, "Priya Raman"],
                  [serial(10, 7), "Gauze sponges 2x2", "Medical", "15", 5.45, "Keisha Morgan"],
                  [serial(10, 9), "Coffee pods, 48 count", "Break Room", "4", 24.99, "Marcus Webb"],
                  ["Oct 14th", "Paper exam gowns", "Medical", "6", 21, "Daniel Okoro"],
                  [serial(10, 16), "Black ink pens, dozen", "Office", "5", 6.5, "Lucia Ferrante"],
                  [serial(10, 20), "Paper towels, case", "Cleaning", "4", 29.95, "Priya Raman"],
                  [serial(10, 22), "Adhesive bandages, box", "Medical", "10", 3.2, "Marcus Webb"],
                  [serial(10, 23), "Sticky notes, 12 pack", "Office", "2", 8.25, "Lucia Ferrante"],
                ],
                { header: true, colFmt: { A: DATE, E: MONEY } },
              ),
              I1: { v: "Units Ordered", fmt: { bold: true } },
              I2: { f: "=SUM(D2:D20)", fmt: { bold: true } },
            },
          },
          {
            name: "Delivery Schedule",
            colWidths: { A: 70, B: 110, C: 200 },
            cells: {
              ...grid("A1", [["Week", "Delivery Date", "Standing Order"], ["Week 1", serial(11, 2), "Harbor Medical Supply"], [null, serial(11, 9), "Northgate Office Products"]], { header: true, colFmt: { B: DATE } }),
              ...grid("C4", [["Harbor Medical Supply"], ["Northgate Office Products"], ["Harbor Medical Supply"], ["Northgate Office Products"], ["Harbor Medical Supply"], ["Northgate Office Products"]]),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "The quantities in D2:D11 are stored as text, so Units Ordered in I2 shows 0. Convert D2:D11 to real numbers with Text to Columns.",
          hint: "Select D2:D11. Data tab › Data Tools group › Text to Columns, then click Finish. Notice the numbers move to the right side of their cells.",
          steps: [
            {
              action: { kind: "dialog", id: "textToColumns" },
              requires: { selection: "D2:D11" },
              selectHint: "Select the quantities in D2:D11 first.",
            },
          ],
        },
        {
          instruction: "A7 holds the date as words (\"Oct 14th\"), which Excel cannot sort. Replace it with the date 10/14/2026.",
          hint: "Click A7, type 10/14/2026 and press Enter. Excel recognizes the date and stores it as a date value.",
          steps: [{ action: { kind: "type", target: "A7", value: ["10/14/2026", "10/14/26"] } }],
        },
        {
          instruction: "Enter a new order in row 12, pressing Tab between cells: 10/28/2026 in A12, \"Blood pressure cuff, adult\" in B12, \"Medical\" in C12, and 4 in D12.",
          hint: "Click A12 and type 10/28/2026, press Tab, type the item, press Tab, type Medical, press Tab, type 4 and press Enter.",
          steps: [
            { action: { kind: "type", target: "A12", value: ["10/28/2026", "10/28/26"] } },
            { action: { kind: "type", target: "B12", value: "Blood pressure cuff, adult" } },
            { action: { kind: "type", target: "C12", value: "Medical" } },
            { action: { kind: "type", target: "D12", value: "4" } },
          ],
        },
        {
          instruction: "Log one more order in row 13: 10/30/2026 in A13, \"Hand soap refill\" in B13, Cleaning in C13 and 6 in D13. In C13, type only Cl and let AutoComplete finish the word.",
          hint: "Click A13 and type 10/30/2026, press Tab, type Hand soap refill, press Tab. In C13 type Cl: Excel suggests Cleaning from the entries above, so press Tab to accept it. Type 6 in D13 and press Enter.",
          steps: [
            { action: { kind: "type", target: "A13", value: ["10/30/2026", "10/30/26"] } },
            { action: { kind: "type", target: "B13", value: "Hand soap refill" } },
            { action: { kind: "type", target: "C13", value: "Cleaning" } },
            { action: { kind: "type", target: "D13", value: "6" } },
          ],
        },
        {
          instruction: "Type \"Keisha\" in G2, then use Flash Fill to fill in the rest of the first names.",
          hint: "Click G2, type Keisha and press Enter. With G3 selected, Data tab › Data Tools group › Flash Fill (or press Ctrl+E). Flash Fill sees that Keisha is the first word of Keisha Morgan and does the same for every row.",
          steps: [
            { action: { kind: "type", target: "G2", value: "Keisha" } },
            {
              action: { kind: "command", id: "data.flashFill" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Flash Fill" }],
              requires: { selection: ["G3", "G2", "G2:G11", "G3:G11", "G2:G12", "G3:G12", "G2:G13", "G3:G13"] },
              selectHint: "Click G3, the first empty cell under your example, first.",
            },
          ],
        },
        {
          instruction: "Show the order dates in A2:A13 with the custom format mm/dd/yyyy, so every date has two-digit months and days (10/01/2026).",
          hint: "Select A2:A13 and press Ctrl+1. On the Number tab pick Custom, type mm/dd/yyyy in the Type box and click OK.",
          steps: [
            {
              action: { kind: "dialog", id: "formatCells", values: { category: "Custom", custom: "mm/dd/yyyy" } },
              requires: { selection: "A2:A13" },
              selectHint: "Select the order dates in A2:A13 first.",
            },
          ],
        },
        {
          instruction: "On the Delivery Schedule sheet, A2 holds \"Week 1\". Fill it down through A9 so Excel numbers the weeks.",
          hint: "Click the Delivery Schedule tab and click A2. Drag the fill handle (the small square at the bottom-right corner) down to A9.",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "A2:A9" },
              requires: { selection: "A2", sheet: "Delivery Schedule" },
              selectHint: "Click A2 on the Delivery Schedule sheet first.",
            },
          ],
        },
        {
          instruction: "Deliveries come every Monday. Use AutoFill to continue the weekly dates in B2:B3 down through B9.",
          hint: "Select B2:B3 so Excel can see the 7-day pattern, then drag the fill handle down to B9. (Or select B2:B9, Home tab › Editing group › Fill › Series, choose Date, Day and a Step value of 7.) Ctrl+D would only copy the first date.",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "B2:B9" },
              alt: [{ kind: "dialog", id: "series", values: { type: "Date", dateUnit: "Day", step: "7" }, requires: { selection: "B2:B9", sheet: "Delivery Schedule" } }],
              requires: { selection: "B2:B3", sheet: "Delivery Schedule" },
              selectHint: "Select both B2 and B3 first, so Excel can see the pattern.",
            },
          ],
        },
      ],
    },
    {
      id: "oa-excel-m3-entering-2",
      app: "excel",
      title: "Format the supply log for the monthly report",
      scenario:
        "The supply log is correct but hard to read: costs have no dollar signs, dates show as serial numbers, and nothing stands out. Format it so Renee Alvarez can scan it in the monthly report, and make low quantities flag themselves.",
      fileName: "Supply Log.xlsx",
      minutes: 6,
      initial: {
        active: "Supply Log",
        sheets: [
          {
            name: "Supply Log",
            colWidths: { A: 120, B: 80, C: 64, D: 70, E: 70, F: 64, G: 76 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Item Name", "Category", "Quantity", "Unit Cost", "Total Cost", "Reorder Level", "Date Ordered"],
                  ...[0, 1, 3, 4, 6, 8, 9, 11, 13, 14, 16, 18].map((i, k) => {
                    const [item, cat, q, cost, reorder] = SUPPLIES[i];
                    return [item, cat, q + 4, cost, `=C${k + 2}*D${k + 2}`, reorder, serial(10, 2 + k * 2)];
                  }),
                ],
                { header: true, headerFmt: {} },
              ),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Format the costs in D2:E13 as Currency.",
          hint: "Select D2:E13. Home tab › Number group › Number Format box › Currency (or Ctrl+Shift+$).",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Currency" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Currency" } }],
              requires: { selection: "D2:E13" },
              selectHint: "Select the Unit Cost and Total Cost cells, D2:E13, first.",
            },
          ],
        },
        {
          instruction: "Format the order dates in G2:G13 as Short Date.",
          hint: "Select G2:G13. Home tab › Number group › Number Format box › Short Date.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Short Date" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Short Date" } }],
              requires: { selection: "G2:G13" },
              selectHint: "Select the dates in G2:G13 first.",
            },
          ],
        },
        {
          instruction: "Bold the headers in A1:G1 and wrap their text.",
          hint: "Select A1:G1. Home tab › Font group › Bold (Ctrl+B), then Home tab › Alignment group › Wrap Text.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              alt: [{ kind: "dialog", id: "formatCells", values: { bold: true } }],
              requires: { selection: ["A1:G1", "1:1"] },
              selectHint: "Select the headers in A1:G1 first.",
            },
            {
              action: { kind: "command", id: "home.wrap" },
              alt: [{ kind: "dialog", id: "formatCells", values: { wrap: true } }],
              requires: { selection: ["A1:G1", "1:1"] },
              selectHint: "Select the headers in A1:G1 first.",
            },
          ],
        },
        {
          instruction: "Give the headers in A1:G1 the Blue, Accent 5 fill color (Theme Colors).",
          hint: "Select A1:G1. Home tab › Font group › Fill Color arrow › Blue, Accent 5 in the top row of Theme Colors.",
          steps: [
            {
              action: { kind: "command", id: "home.fill", value: "#5B9BD5" },
              alt: [{ kind: "dialog", id: "formatCells", values: { fill: "#5B9BD5" } }],
              requires: { selection: ["A1:G1", "1:1"] },
              selectHint: "Select the headers in A1:G1 first.",
            },
          ],
        },
        {
          instruction: "AutoFit column A so every item name fits.",
          hint: "Click the column A header. Home tab › Cells group › Format › AutoFit Column Width. (Or double-click the right border of the column A header.)",
          steps: [
            {
              action: { kind: "command", id: "home.format", value: "AutoFit Column Width" },
              requires: { selection: ["A:A", "A1:A13", "A2:A13"] },
              selectHint: "Click the column A header first.",
            },
          ],
        },
        {
          instruction: "Add All Borders to the whole log, A1:G13.",
          hint: "Select A1:G13. Home tab › Font group › Borders arrow › All Borders.",
          steps: [
            {
              action: { kind: "command", id: "home.borders", value: "All Borders" },
              requires: { selection: "A1:G13" },
              selectHint: "Select the whole log, A1:G13, first.",
            },
          ],
        },
        {
          instruction: "Highlight the quantities in C2:C13 that are less than 10 with Light Red Fill with Dark Red Text.",
          hint: "Select C2:C13. Home tab › Styles group › Conditional Formatting › Highlight Cells Rules › Less Than. Type 10, keep Light Red Fill with Dark Red Text, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "cfLess", values: { value: "10", format: "Light Red Fill with Dark Red Text" } },
              requires: { selection: "C2:C13" },
              selectHint: "Select the quantities in C2:C13 first.",
            },
          ],
        },
        {
          instruction: "Format the log in A1:G13 as an Excel table that has headers.",
          hint: "Click any cell in the log and press Ctrl+T (or Insert tab › Tables group › Table). Check My table has headers, OK. (Home › Format as Table also works.)",
          steps: [
            {
              action: { kind: "dialog", id: "createTable", values: { headers: true } },
              alt: [{ kind: "command", id: "home.formatAsTable" }],
              requires: { selection: inData("A1:G13") },
              selectHint: "Click a cell inside the log (A1:G13) first.",
            },
          ],
        },
      ],
    },
  ],

  "module-3::formulas-and-functions": [
    {
      id: "oa-excel-m3-formulas-1",
      app: "excel",
      title: "Add the formula layer to the supply tracker",
      scenario:
        "Renee Alvarez wants the supply tracker to calculate itself: a total cost for every item, a status that flags LOW and OUT stock, and a summary block where every number comes from a formula.",
      fileName: "Supply Tracker.xlsx",
      minutes: 7,
      initial: {
        active: "Supply Tracker",
        sheets: [
          {
            name: "Supply Tracker",
            rows: 30,
            colWidths: { A: 190, B: 80, C: 64, D: 72, E: 80, F: 88, G: 60 },
            cells: {
              ...grid("A1", [["Item", "Category", "Quantity", "Unit Cost", "Total Cost", "Reorder Level", "Status"], ...SUPPLIES.map(([i, c, q, u, r]) => [i, c, q, u, null, r])], {
                header: true,
                colFmt: { D: MONEY },
              }),
              ...fmtOnly("E2:E21", MONEY),
              ...grid("A23", [["Grand Total Cost"], ["Average Unit Cost"], ["Lowest Quantity"], ["Highest Unit Cost"], ["Items Tracked"], ["Items LOW or OUT"]], { colFmt: { A: { bold: true } } }),
              B23: { fmt: MONEY },
              B24: { fmt: MONEY },
              B26: { fmt: MONEY },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In E2, enter a formula that multiplies the quantity in C2 by the unit cost in D2.",
          hint: "Click E2, type =C2*D2 and press Enter.",
          steps: [{ action: { kind: "type", target: "E2", value: ["=C2*D2", "=D2*C2"], match: "formula" } }],
        },
        {
          instruction: "Copy the formula in E2 down through E21.",
          hint: "Select E2 and double-click the fill handle (or drag it down to E21).",
          steps: [fill("E2", "E2:E21")],
        },
        {
          instruction: "In G2, enter a nested IF formula that shows \"OUT\" when C2 is 0, \"LOW\" when C2 is at or below the reorder level in F2, and \"OK\" otherwise: =IF(C2=0,\"OUT\",IF(C2<=F2,\"LOW\",\"OK\")).",
          hint: "Click G2, type =IF(C2=0,\"OUT\",IF(C2<=F2,\"LOW\",\"OK\")) and press Enter. Excel checks the first test, and only if it is false moves on to the second.",
          steps: [
            {
              action: {
                kind: "type",
                target: "G2",
                value: ['=IF(C2=0,"OUT",IF(C2<=F2,"LOW","OK"))', '=IF(C2=0,"OUT",IF(F2>=C2,"LOW","OK"))', '=IF(C2=0,"OUT",IF(C2>F2,"OK","LOW"))'],
                match: "formula",
              },
            },
          ],
        },
        {
          instruction: "Copy the formula in G2 down through G21.",
          hint: "Select G2 and double-click the fill handle (or drag it down to G21).",
          steps: [fill("G2", "G2:G21")],
        },
        {
          instruction: "In B23, total the Total Cost column, E2:E21.",
          hint: "Click B23, type =SUM(E2:E21) and press Enter.",
          steps: [
            {
              action: { kind: "type", target: "B23", value: "=SUM(E2:E21)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "SUM", args: "E2:E21" } }],
              requires: { selection: "B23" },
              selectHint: "Click B23 first.",
            },
          ],
        },
        {
          instruction: "In B24, calculate the average unit cost of D2:D21.",
          hint: "Click B24, type =AVERAGE(D2:D21) and press Enter.",
          steps: [
            {
              action: { kind: "type", target: "B24", value: "=AVERAGE(D2:D21)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "AVERAGE", args: "D2:D21" } }],
              requires: { selection: "B24" },
              selectHint: "Click B24 first.",
            },
          ],
        },
        {
          instruction: "In B25, find the lowest quantity in C2:C21, and in B26 the highest unit cost in D2:D21.",
          hint: "Click B25 and type =MIN(C2:C21), Enter. Then in B26 type =MAX(D2:D21), Enter.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "type", target: "B25", value: "=MIN(C2:C21)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "MIN", args: "C2:C21" } }],
              requires: { selection: "B25" },
              selectHint: "Click B25 first.",
            },
            {
              action: { kind: "type", target: "B26", value: "=MAX(D2:D21)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "MAX", args: "D2:D21" } }],
              requires: { selection: "B26" },
              selectHint: "Click B26 first.",
            },
          ],
        },
        {
          instruction: "In B27, count the items listed in A2:A21 with COUNTA. In B28, count the LOW and OUT items: =COUNTIF(G2:G21,\"LOW\")+COUNTIF(G2:G21,\"OUT\").",
          hint: "Click B27, type =COUNTA(A2:A21), Enter. Then in B28 type =COUNTIF(G2:G21,\"LOW\")+COUNTIF(G2:G21,\"OUT\"), Enter.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "type", target: "B27", value: "=COUNTA(A2:A21)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "COUNTA", args: "A2:A21" } }],
              requires: { selection: "B27" },
              selectHint: "Click B27 first.",
            },
            {
              action: { kind: "type", target: "B28", value: ['=COUNTIF(G2:G21,"LOW")+COUNTIF(G2:G21,"OUT")', '=COUNTIF(G2:G21,"OUT")+COUNTIF(G2:G21,"LOW")'], match: "formula" },
            },
          ],
        },
      ],
    },
    {
      id: "oa-excel-m3-formulas-2",
      app: "excel",
      title: "Fix the errors in the copay summary",
      scenario:
        "The weekly copay summary goes to Renee Alvarez this afternoon, but it shows #NAME? and #DIV/0! errors and the card fees are not calculated yet. Fix each error, add the fees with an absolute reference to the rate, and date the report.",
      fileName: "Weekly Copay Summary.xlsx",
      minutes: 6,
      initial: {
        active: "Copays",
        sheets: [
          {
            name: "Copays",
            colWidths: { A: 150, B: 70, C: 120, D: 104, E: 86 },
            cells: {
              A1: { v: "Weekly Copay Summary", fmt: TITLE },
              A2: { v: "Card fee rate", fmt: { bold: true } },
              B2: { v: 0.029, fmt: { numFmt: "Percentage", decimals: 1 } },
              A3: { v: "Report date", fmt: { bold: true } },
              B3: { fmt: DATE },
              ...grid(
                "A5",
                [
                  ["Provider", "Visits", "Copays Collected", "Average Copay", "Card Fees"],
                  ["Dr. Imani Brooks", 42, 1260, "=C6/B6"],
                  ["Dr. Tomas Lindqvist", 38, 1140, "=C7/B7"],
                  ["NP Grace Adeyemi", 0, 0, "=C8/B8"],
                  ["Dr. Rafael Ortiz", 51, 1580, "=C9/B9"],
                  ["PA Simone Hart", 27, 845, "=C10/B10"],
                ],
                { header: true, colFmt: { C: MONEY, D: MONEY } },
              ),
              ...fmtOnly("E6:E10", MONEY),
              A11: { v: "Total", fmt: { bold: true } },
              B11: { f: "=SUM(B6:B10)", fmt: { bold: true } },
              C11: { f: "=SUMM(C6:C10)", fmt: { numFmt: "Currency", bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "C11 shows #NAME? because the function name is misspelled. Enter =SUM(C6:C10) in C11.",
          hint: "Click C11 and look at the formula bar: SUMM is not a function. Type =SUM(C6:C10) and press Enter.",
          steps: [
            {
              action: { kind: "type", target: "C11", value: "=SUM(C6:C10)", match: "formula" },
              alt: [{ kind: "command", id: "home.autosum", value: "Sum" }],
              requires: { selection: "C11" },
              selectHint: "Click C11 first.",
            },
          ],
        },
        {
          instruction: "D8 shows #DIV/0! because NP Grace Adeyemi had no visits this week. In D6, enter =IFERROR(C6/B6,0) so a zero-visit row shows 0 instead of an error.",
          hint: "Click D6, type =IFERROR(C6/B6,0) and press Enter. You will copy it down in the next task.",
          steps: [{ action: { kind: "type", target: "D6", value: "=IFERROR(C6/B6,0)", match: "formula" } }],
        },
        {
          instruction: "Copy the formula in D6 down through D10.",
          hint: "Select D6 and drag the fill handle down to D10 (or select D6:D10 and press Ctrl+D). Stop at D10: row 11 is the total.",
          steps: [fill("D6", "D6:D10")],
        },
        {
          instruction: "In E6, calculate the card fee rounded to 2 decimal places: the copays in C6 times the rate in B2, with B2 as an absolute reference. Type =ROUND(C6*$B$2,2).",
          hint: "Click E6 and type =ROUND(C6*$B$2,2) (type B2, then press F4 to add the dollar signs), then press Enter.",
          steps: [{ action: { kind: "type", target: "E6", value: ["=ROUND(C6*$B$2,2)", "=ROUND($B$2*C6,2)"], match: "formula", strictRefs: true } }],
        },
        {
          instruction: "Copy the formula in E6 down through E10.",
          hint: "Select E6 and drag the fill handle down to E10 (or select E6:E10 and press Ctrl+D). $B$2 stays locked on the rate.",
          steps: [fill("E6", "E6:E10")],
        },
        {
          instruction: "Show the cells that feed the card fee in E6.",
          hint: "Click E6. Formulas tab › Formula Auditing group › Trace Precedents. Arrows point from C6 and B2.",
          steps: [{ action: { kind: "command", id: "formulas.tracePrecedents" }, requires: { selection: "E6" }, selectHint: "Click E6, the card fee formula, first." }],
        },
        {
          instruction: "In B3, enter =TODAY() so the report date updates by itself, then format B3 as Long Date.",
          hint: "Click B3, type =TODAY() and press Enter. Click B3 again, then Home tab › Number group › Number Format box › Long Date.",
          steps: [
            {
              action: { kind: "type", target: "B3", value: "=TODAY()", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "TODAY" } }, { kind: "command", id: "formulas.function", value: "TODAY" }],
              requires: { selection: "B3" },
              selectHint: "Click B3 first.",
            },
            {
              action: { kind: "command", id: "home.numberFormat", value: "Long Date" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Long Date" } }],
              requires: { selection: "B3" },
              selectHint: "Click B3 first.",
            },
          ],
        },
      ],
    },
  ],

  "module-3::sorting-filtering-tables": [
    {
      id: "oa-excel-m3-sort-filter-1",
      app: "excel",
      title: "Get the reorder list ready for the meeting",
      scenario:
        "Renee Alvarez's reorder meeting starts in 15 minutes. Clean a duplicate out of the supply tracker, sort it so OUT and LOW items come first, and filter it down to the items that need action.",
      fileName: "Supply Tracker.xlsx",
      minutes: 6,
      initial: {
        active: "Supply Tracker",
        sheets: [
          {
            name: "Supply Tracker",
            rows: 26,
            colWidths: { A: 190, B: 80, C: 64, D: 72, E: 88, F: 60 },
            cells: grid(
              "A1",
              [
                ["Item", "Category", "Quantity", "Unit Cost", "Reorder Level", "Status"],
                ...SUPPLIES.map(([i, c, q, u, r]) => [i, c, q, u, r, statusOf(q, r)]),
                (() => {
                  const [i, c, q, u, r] = SUPPLIES[9];
                  return [i, c, q, u, r, statusOf(q, r)];
                })(),
              ],
              { header: true, colFmt: { D: MONEY } },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Black ink pens were entered twice. Remove the duplicate row from the tracker.",
          hint: "Click any cell in the data. Data tab › Data Tools group › Remove Duplicates. Keep every column checked and My data has headers checked, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "removeDuplicates", values: { headers: true } },
              requires: { selection: inData("A1:F22") },
              selectHint: "Click a cell inside the tracker data first.",
            },
          ],
        },
        {
          instruction: "Sort the tracker by Item from A to Z.",
          hint: "Click any cell in the Item column (A2:A21). Data tab › Sort & Filter group › Sort A to Z.",
          steps: [
            {
              action: { kind: "command", id: "data.sortAsc" },
              alt: [{ kind: "dialog", id: "sort", values: { sortBy: "Item", order: "A to Z" } }],
              requires: { selection: colCells("A", 1, 21) },
              selectHint: "Click one cell in the Item column. Do not select the whole column: Excel needs to sort complete rows.",
            },
          ],
        },
        {
          instruction: "In one sort, sort by Status in the custom order OUT, LOW, OK, then by Category from A to Z.",
          hint: "Click a cell in the data. Data tab › Sort. Sort by Status, Order: Custom List..., enter OUT, LOW, OK. Add Level: Then by Category, A to Z. OK.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "sort",
                values: { sortBy: "Status", order: "Custom List...", customList: ["OUT, LOW, OK", "OUT,LOW,OK"], thenBy: "Category", thenOrder: "A to Z" },
              },
              requires: { selection: cells("A1:F21") },
              selectHint: "Click a single cell inside the tracker data (A1:F21) first.",
            },
          ],
        },
        {
          instruction: "Turn on filter buttons for the tracker.",
          hint: "Click any cell in the data. Data tab › Sort & Filter group › Filter (or Ctrl+Shift+L).",
          steps: [{ action: { kind: "command", id: "data.filter" }, requires: { selection: inData("A1:F21") }, selectHint: "Click a cell inside the tracker data first." }],
        },
        {
          instruction: "Filter the Status column to show only LOW and OUT items.",
          hint: "Click the Status filter arrow. Uncheck (Select All), check LOW and OUT, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "F=LOW|OUT" } }],
        },
        {
          instruction: "Narrow the list further: show only items with a Quantity less than 5.",
          hint: "Click the Quantity filter arrow › Number Filters › Less Than..., type 5, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "C~<5" } }],
        },
        {
          instruction: "Clear all the filters at once so every row shows again, keeping the filter buttons on.",
          hint: "Data tab › Sort & Filter group › Clear.",
          steps: [{ action: { kind: "command", id: "data.clearFilter" } }],
        },
      ],
    },
    {
      id: "oa-excel-m3-sort-filter-2",
      app: "excel",
      title: "Print the reorder report from a table",
      scenario:
        "Renee Alvarez wants the reorder list printed for the supply room whiteboard. Turn the tracker into an Excel Table with a total, filter it to the items that need action, and set up the page so it prints as a labeled, one-page report.",
      fileName: "Supply Tracker.xlsx",
      minutes: 6,
      initial: {
        active: "Supply Tracker",
        sheets: [
          {
            name: "Supply Tracker",
            rows: 24,
            colWidths: { A: 190, B: 80, C: 64, D: 88, E: 60, F: 72, G: 80, I: 80, J: 50 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Item", "Category", "Quantity", "Reorder Level", "Status", "Unit Cost", "Total Cost"],
                  ...SUPPLIES.slice(0, 18).map(([i, c, q, u, r], k) => [i, c, q, r, statusOf(q, r), u, `=C${k + 2}*F${k + 2}`]),
                ],
                { header: true, colFmt: { F: MONEY, G: MONEY } },
              ),
              I1: { v: "LOW items", fmt: { bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Convert the tracker data in A1:G19 into an Excel Table that has headers.",
          hint: "Click any cell in the data and press Ctrl+T (or Insert tab › Tables group › Table). Confirm the range and My table has headers, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createTable", values: { headers: true } },
              alt: [{ kind: "command", id: "home.formatAsTable" }],
              requires: { selection: inData("A1:G19") },
              selectHint: "Click a cell inside the tracker data (A1:G19) first.",
            },
          ],
        },
        {
          instruction: "Turn on the table's Total Row so it totals the Total Cost column.",
          hint: "Click a cell in the table. Table Design tab › Table Style Options group › Total Row. Excel adds row 20 with Total in A20 and a SUBTOTAL sum under Total Cost.",
          steps: [{ action: { kind: "command", id: "table.totalRow" }, requires: { selection: cells("A1:G19") }, selectHint: "Click a cell inside the table so the Table Design tab appears." }],
        },
        {
          instruction: "Use the Total Row drop-down to show the average Unit Cost in F20.",
          hint: "Click F20 in the Total Row. Click the drop-down arrow that appears beside the cell and pick Average. Excel writes =SUBTOTAL(101,Table1[Unit Cost]).",
          steps: [{ action: { kind: "command", id: "table.totalFn", value: "Average" }, requires: { selection: "F20" }, selectHint: "Click F20, the Total Row cell under Unit Cost, first." }],
        },
        {
          instruction: "In J1, count the LOW items with a structured reference: =COUNTIF(Table1[Status],\"LOW\").",
          hint: "Click J1, type =COUNTIF(Table1[Status],\"LOW\") and press Enter. Table1[Status] always covers the whole Status column, however long the table gets.",
          steps: [{ action: { kind: "type", target: "J1", value: '=COUNTIF(Table1[Status],"LOW")', match: "formula" } }],
        },
        {
          instruction: "Filter the table to show only LOW and OUT items.",
          hint: "Click the Status filter arrow in the header row. Uncheck (Select All), check LOW and OUT, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "E=LOW|OUT" } }],
        },
        {
          instruction: "Set the print area to the table and its total row, A1:G20.",
          hint: "Select A1:G20. Page Layout tab › Page Setup group › Print Area › Set Print Area.",
          steps: [{ action: { kind: "command", id: "layout.printArea", value: "Set Print Area" }, requires: { selection: "A1:G20" }, selectHint: "Select A1:G20 first." }],
        },
        {
          instruction: "Repeat row 1 at the top of every printed page.",
          hint: "Page Layout tab › Page Setup group › Print Titles. On the Sheet tab, type $1:$1 in Rows to repeat at top, then OK.",
          steps: [{ action: { kind: "dialog", id: "pageSetupSheet", values: { printTitles: ["$1:$1", "1:1", "$1:1", "1:$1"] } } }],
        },
        {
          instruction: "Add the page header \"Lakeside Medical Associates - Supply Reorder Report\".",
          hint: "Insert tab › Text group › Header & Footer. Excel switches to Page Layout view with the cursor in the header: type the text, then click any cell. (Or Page Layout tab › Page Setup group launcher › Header/Footer tab, type it in Header, OK.)",
          steps: [
            {
              action: { kind: "type", target: "header", value: "Lakeside Medical Associates - Supply Reorder Report" },
              alt: [{ kind: "dialog", id: "pageSetupSheet", values: { header: "Lakeside Medical Associates - Supply Reorder Report" } }],
            },
          ],
        },
        {
          instruction: "Add a footer that numbers the pages as Page 1 of 1.",
          hint: "With the header open, Header & Footer tab › Navigation group › Go to Footer. Then Header & Footer group › Footer › Page 1 of ?. (Or type Page 1 of 1 in Footer on the Page Setup Header/Footer tab.)",
          steps: [
            {
              action: { kind: "command", id: "hf.footer", value: "Page &[Page] of &[Pages]" },
              alt: [
                { kind: "type", target: "footer", value: ["Page &[Page] of &[Pages]", "Page 1 of 1"] },
                { kind: "dialog", id: "pageSetupSheet", values: { footer: ["Page &[Page] of &[Pages]", "Page 1 of 1"] } },
              ],
            },
          ],
        },
        {
          instruction: "Print one copy with all columns fit on one page.",
          hint: "File tab › Print (Ctrl+P). Change No Scaling to Fit All Columns on One Page, check the preview, then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { scaling: "Fit All Columns on One Page" } } }],
        },
      ],
    },
  ],

  "module-3::excel-essentials-capstone": [
    {
      id: "oa-excel-m3-capstone-1",
      app: "excel",
      title: "Build the Lakeside supply tracker",
      scenario:
        "You have been promoted from data entry to supply management. The 20 items are typed in; now turn the sheet into a working tracker: readable headers, a Status and Total Cost for every row, automatic highlighting, a table with a total, and a reorder view for Renee Alvarez.",
      fileName: "Supply Tracker - Capstone.xlsx",
      minutes: 8,
      initial: {
        active: "Supply Tracker",
        sheets: [
          {
            name: "Supply Tracker",
            rows: 26,
            colWidths: { A: 190, B: 80, C: 64, D: 72, E: 88, F: 60, G: 80 },
            cells: {
              ...grid("A1", [["Item", "Category", "Quantity", "Unit Cost", "Reorder Level", "Status", "Total Cost"], ...SUPPLIES.map(([i, c, q, u, r]) => [i, c, q, u, r])], {
                header: true,
                headerFmt: {},
                colFmt: { D: MONEY },
              }),
              ...fmtOnly("G2:G21", MONEY),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Bold the headers in A1:G1 and freeze the top row so they stay visible as you scroll.",
          hint: "Select A1:G1 and press Ctrl+B (Home tab › Font group › Bold). Then View tab › Window group › Freeze Panes › Freeze Top Row.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              alt: [{ kind: "dialog", id: "formatCells", values: { bold: true } }],
              requires: { selection: ["A1:G1", "1:1"] },
              selectHint: "Select the headers in A1:G1 first.",
            },
            { action: { kind: "command", id: "view.freeze", value: "Freeze Top Row" } },
          ],
        },
        {
          instruction: "In F2, enter the status formula =IF(C2=0,\"OUT\",IF(C2<=E2,\"LOW\",\"OK\")) and copy it down through F21.",
          hint: "Click F2, type the formula and press Enter. Then select F2 and double-click the fill handle (or drag it down to F21).",
          steps: [
            { action: { kind: "type", target: "F2", value: ['=IF(C2=0,"OUT",IF(C2<=E2,"LOW","OK"))', '=IF(C2=0,"OUT",IF(E2>=C2,"LOW","OK"))'], match: "formula" } },
            fill("F2", "F2:F21"),
          ],
        },
        {
          instruction: "In G2, enter =C2*D2 for the total cost and copy it down through G21.",
          hint: "Click G2, type =C2*D2 and press Enter. Then select G2 and double-click the fill handle (or drag it down to G21).",
          steps: [{ action: { kind: "type", target: "G2", value: ["=C2*D2", "=D2*C2"], match: "formula" } }, fill("G2", "G2:G21")],
        },
        {
          instruction: "Select C2:C21 and add a formula rule, =C2<=E2, that gives quantities at or below their reorder level a Light Red Fill.",
          hint: "Select C2:C21. Home tab › Conditional Formatting › New Rule › Use a formula to determine which cells to format. Type =C2<=E2, choose Light Red Fill, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "cfNewRule", values: { formula: ["=C2<=E2", "C2<=E2", "=$C2<=$E2", "$C2<=$E2", "=E2>=C2"], format: "Light Red Fill" } },
              requires: { selection: "C2:C21" },
              selectHint: "Select C2:C21, starting from C2, so the formula is written for row 2.",
            },
          ],
        },
        {
          instruction: "Convert the tracker in A1:G21 into an Excel Table that has headers.",
          hint: "Click any cell in the data and press Ctrl+T (or Insert tab › Tables group › Table). Check My table has headers, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createTable", values: { headers: true } },
              alt: [{ kind: "command", id: "home.formatAsTable" }],
              requires: { selection: inData("A1:G21") },
              selectHint: "Click a cell inside the tracker (A1:G21) first.",
            },
          ],
        },
        {
          instruction: "Turn on the table's Total Row so the Total Cost column is summed.",
          hint: "Click a cell in the table. Table Design tab › Table Style Options group › Total Row.",
          steps: [{ action: { kind: "command", id: "table.totalRow" }, requires: { selection: cells("A1:G21") }, selectHint: "Click a cell inside the table so the Table Design tab appears." }],
        },
        {
          instruction: "Finish the Total Row: show the AVERAGE of Unit Cost in D22 and a COUNT of the items in A22.",
          hint: "Click D22, click its drop-down arrow and pick Average. Then click A22, click its drop-down arrow and pick Count (it replaces the word Total).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "table.totalFn", value: "Average" }, requires: { selection: "D22" }, selectHint: "Click D22, the Total Row cell under Unit Cost, first." },
            { action: { kind: "command", id: "table.totalFn", value: "Count" }, requires: { selection: "A22" }, selectHint: "Click A22, the Total Row cell under Item, first." },
          ],
        },
        {
          instruction: "Sort the table by Status in the custom order OUT, LOW, OK, then by Category from A to Z.",
          hint: "Click a cell in the table. Data tab › Sort. Sort by Status, Order: Custom List..., enter OUT, LOW, OK. Add Level: Then by Category, A to Z. OK.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "sort",
                values: { sortBy: "Status", order: "Custom List...", customList: ["OUT, LOW, OK", "OUT,LOW,OK"], thenBy: "Category", thenOrder: "A to Z" },
              },
              requires: { selection: cells("A1:G21") },
              selectHint: "Click a single cell inside the table first.",
            },
          ],
        },
        {
          instruction: "Filter the table to show only OUT and LOW items for the reorder meeting.",
          hint: "Click the Status filter arrow in the header row. Uncheck (Select All), check LOW and OUT, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "F=LOW|OUT" } }],
        },
      ],
    },
    {
      id: "oa-excel-m3-capstone-2",
      app: "excel",
      title: "Build the summary sheet and deliver the tracker",
      scenario:
        "Renee Alvarez does not want to scroll the tracker to know where things stand. Build the Summary sheet with cross-sheet formulas that read the Supply Tracker, then save the workbook and export a PDF for her.",
      fileName: "Supply Tracker - Capstone.xlsx",
      minutes: 7,
      initial: {
        active: "Summary",
        sheets: [
          {
            name: "Supply Tracker",
            rows: 26,
            freeze: "A2",
            colWidths: { A: 190, B: 80, C: 64, D: 72, E: 88, F: 60, G: 80 },
            table: { range: "A1:G21", style: "Table Style Medium 2", name: "Table1", totalRow: true },
            filter: "A1:G21",
            cells: {
              ...grid("A1", [["Item", "Category", "Quantity", "Unit Cost", "Reorder Level", "Status", "Total Cost"], ...SUPPLIES.map(([i, c, q, u, r]) => [i, c, q, u, r])], {
                header: true,
                colFmt: { D: MONEY },
              }),
              ...column("F", 2, 21, '=IF(C{r}=0,"OUT",IF(C{r}<=E{r},"LOW","OK"))'),
              ...column("G", 2, 21, "=C{r}*D{r}", MONEY),
            },
          },
          {
            name: "Summary",
            colWidths: { A: 170, B: 220 },
            cells: {
              A1: { v: "Supply Summary", fmt: TITLE },
              ...grid("A3", [["Total Items"], ["Items OUT"], ["Items LOW"], ["Total Supply Value"], ["Average Unit Cost"], ["Last Updated"]], { colFmt: { A: { bold: true } } }),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In B3 on the Summary sheet, count the items on the tracker: =COUNTA('Supply Tracker'!A2:A21).",
          hint: "Click B3 and type =COUNTA('Supply Tracker'!A2:A21), then press Enter. The quotes are needed because the sheet name has a space. (You can also type =COUNTA( and click over to select A2:A21 on the tracker.)",
          steps: [{ action: { kind: "type", target: "B3", value: "=COUNTA('Supply Tracker'!A2:A21)", match: "formula" }, requires: { sheet: "Summary" }, selectHint: "Work on the Summary sheet." }],
        },
        {
          instruction: "In B4, count the OUT items with =COUNTIF('Supply Tracker'!F2:F21,\"OUT\"), and in B5 count the LOW items the same way.",
          hint: "Click B4, type =COUNTIF('Supply Tracker'!F2:F21,\"OUT\") and press Enter. In B5 type =COUNTIF('Supply Tracker'!F2:F21,\"LOW\") and press Enter.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "B4", value: "=COUNTIF('Supply Tracker'!F2:F21,\"OUT\")", match: "formula" }, requires: { sheet: "Summary" }, selectHint: "Work on the Summary sheet." },
            { action: { kind: "type", target: "B5", value: "=COUNTIF('Supply Tracker'!F2:F21,\"LOW\")", match: "formula" }, requires: { sheet: "Summary" }, selectHint: "Work on the Summary sheet." },
          ],
        },
        {
          instruction: "In B6, total the Total Cost column on the tracker: =SUM('Supply Tracker'!G2:G21).",
          hint: "Click B6, type =SUM('Supply Tracker'!G2:G21) and press Enter.",
          steps: [{ action: { kind: "type", target: "B6", value: "=SUM('Supply Tracker'!G2:G21)", match: "formula" }, requires: { sheet: "Summary" }, selectHint: "Work on the Summary sheet." }],
        },
        {
          instruction: "In B7, calculate the average unit cost: =AVERAGE('Supply Tracker'!D2:D21).",
          hint: "Click B7, type =AVERAGE('Supply Tracker'!D2:D21) and press Enter.",
          steps: [{ action: { kind: "type", target: "B7", value: "=AVERAGE('Supply Tracker'!D2:D21)", match: "formula" }, requires: { sheet: "Summary" }, selectHint: "Work on the Summary sheet." }],
        },
        {
          instruction: "Format B6:B7 as Currency.",
          hint: "Select B6:B7. Home tab › Number group › Number Format box › Currency.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Currency" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Currency" } }],
              requires: { selection: "B6:B7", sheet: "Summary" },
              selectHint: "Select B6:B7 on the Summary sheet first.",
            },
          ],
        },
        {
          instruction: "In B8, enter =TODAY() and format B8 as Long Date.",
          hint: "Click B8, type =TODAY() and press Enter. Click B8 again, then Home tab › Number group › Number Format box › Long Date.",
          steps: [
            {
              action: { kind: "type", target: "B8", value: "=TODAY()", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "TODAY" } }, { kind: "command", id: "formulas.function", value: "TODAY" }],
              requires: { selection: "B8", sheet: "Summary" },
              selectHint: "Click B8 on the Summary sheet first.",
            },
            {
              action: { kind: "command", id: "home.numberFormat", value: "Long Date" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Long Date" } }],
              requires: { selection: "B8", sheet: "Summary" },
              selectHint: "Click B8 on the Summary sheet first.",
            },
          ],
        },
        {
          instruction: "Save the workbook on This PC as an Excel Workbook named \"Supply Tracker - Lakeside Medical - Capstone\".",
          hint: "File tab › Save As › This PC. Type the name, keep Excel Workbook (*.xlsx), and click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "This PC", name: "Supply Tracker - Lakeside Medical - Capstone", format: "Excel Workbook (*.xlsx)" } } }],
        },
        {
          instruction: "Export a PDF named \"Supply Summary\" for Renee Alvarez.",
          hint: "File tab › Export › Create PDF/XPS Document. Type the file name and click Create PDF/XPS.",
          steps: [{ action: { kind: "dialog", id: "file.exportPdf", values: { name: "Supply Summary" } } }],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Module 4: Excel Advanced                                            */
/* ------------------------------------------------------------------ */

const m4Sims: Record<string, SimDefinition[]> = {
  "module-4::charts-and-visualization": [
    {
      id: "oa-excel-m4-charts-1",
      app: "excel",
      title: "Chart supply expenses by department",
      scenario:
        "Renee Alvarez is presenting six months of supply expenses at Thursday's provider meeting. Build a labeled column chart on its own sheet, save its look as a template for next month, and add sparklines under the data so each department's trend shows at a glance.",
      fileName: "Quarterly Charts.xlsx",
      minutes: 6,
      initial: {
        active: "Data",
        sheets: [
          {
            name: "Data",
            colWidths: { A: 70, B: 84, C: 84, D: 100, E: 84 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Month", "Medical", "Nursing", "Administration", "Facilities"],
                  ["Jan", 4250, 2180, 1640, 2950],
                  ["Feb", 3980, 2240, 1580, 3120],
                  ["Mar", 4620, 2310, 1710, 2870],
                  ["Apr", 4410, 2050, 1690, 3340],
                  ["May", 4890, 2420, 1755, 3010],
                  ["Jun", 5120, 2380, 1820, 3260],
                ],
                { header: true, colFmt: { B: MONEY, C: MONEY, D: MONEY, E: MONEY } },
              ),
              A9: { v: "Trend", fmt: { bold: true, italic: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Select A1:E7 and insert a Clustered Column chart.",
          hint: "Select A1:E7. Insert tab › Charts group › Insert Column or Bar Chart › Clustered Column (or Recommended Charts › Clustered Column, OK).",
          steps: [
            {
              action: { kind: "command", id: "insert.chart", value: "Clustered Column" },
              alt: [{ kind: "dialog", id: "insertChart", values: { type: "Clustered Column" } }],
              requires: { selection: inData("A1:E7") },
              selectHint: "Select the whole table, A1:E7, including the headings.",
            },
          ],
        },
        {
          instruction: "Change the chart title to \"Supply Expenses by Department, January to June\".",
          hint: "Double-click the chart title, type the new title and press Enter.",
          steps: [{ action: { kind: "type", target: "chart:c1.title", value: "Supply Expenses by Department, January to June" } }],
        },
        {
          instruction: "Add axis titles to the chart.",
          hint: "Click the chart. Chart Design tab › Chart Layouts group › Add Chart Element › Axis Titles.",
          steps: [{ action: { kind: "command", id: "chart.addElement", value: "Axis Titles" } }],
        },
        {
          instruction: "Move the legend to the bottom of the chart.",
          hint: "Click the chart. Chart Design tab › Add Chart Element › Legend › Bottom.",
          steps: [{ action: { kind: "command", id: "chart.addElement", value: "Legend: Bottom" } }],
        },
        {
          instruction: "Apply chart Style 2, a clean flat style.",
          hint: "Click the chart. Chart Design tab › Chart Styles gallery › Style 2.",
          steps: [{ action: { kind: "command", id: "chart.style", value: "Style 2" } }],
        },
        {
          instruction: "Show data labels on the Medical columns only, so the largest department's exact amounts are visible.",
          hint: "Click the chart, then click one of the blue Medical columns: all six Medical columns are selected and nothing else. Chart Design tab › Add Chart Element › Data Labels. (Or right-click a Medical column › Add Data Labels.)",
          steps: [
            {
              action: { kind: "command", id: "chart.addElement", value: "Data Labels" },
              requires: { selection: "chart:c1.s1" },
              selectHint: "Click the chart, then click a Medical (blue) column so only that series is selected.",
            },
          ],
        },
        {
          instruction: "Save the formatted chart as a chart template named \"Lakeside Monthly Report\" for next month's report.",
          hint: "Right-click the chart (not a column) and choose Save as Template. Type Lakeside Monthly Report as the file name and click Save. Next time, Insert tab › Recommended Charts › All Charts › Templates applies the same look.",
          steps: [
            {
              action: { kind: "dialog", id: "saveChartTemplate", values: { name: "Lakeside Monthly Report" } },
              requires: { selection: ["chart:c1", "chart:c1.s1", "chart:c1.s2", "chart:c1.s3", "chart:c1.s4"] },
              selectHint: "Right-click the chart itself.",
            },
          ],
        },
        {
          instruction: "Move the chart to a new chart sheet named \"Department Chart\".",
          hint: "Click the chart. Chart Design tab › Location group › Move Chart. Choose New sheet, type Department Chart, OK.",
          steps: [{ action: { kind: "dialog", id: "moveChart", values: { location: "New sheet", name: "Department Chart" } } }],
        },
        {
          instruction: "On the Data sheet, add Line sparklines in B9:E9, one under each department, from the data in B2:E7.",
          hint: "Click the Data tab and select B9:E9. Insert tab › Sparklines group › Line. Data Range: B2:E7. Location Range: B9:E9. OK. Excel draws one sparkline per column and groups them.",
          steps: [
            {
              action: { kind: "dialog", id: "sparklines", values: { type: "Line", dataRange: ["B2:E7", "$B$2:$E$7"], location: ["B9:E9", "$B$9:$E$9"] } },
              requires: { sheet: "Data" },
              selectHint: "Switch to the Data sheet first.",
            },
          ],
        },
        {
          instruction: "Mark the high point on the sparklines so each department's best month stands out.",
          hint: "Click any sparkline in B9:E9. Sparkline tab › Show group › High Point. The whole group changes together.",
          steps: [
            {
              action: { kind: "command", id: "sparkline.high" },
              requires: { selection: ["B9", "C9", "D9", "E9", "B9:E9"], sheet: "Data" },
              selectHint: "Click one of the sparklines in B9:E9 first.",
            },
          ],
        },
      ],
    },
    {
      id: "oa-excel-m4-charts-2",
      app: "excel",
      title: "Show appointment trends and the spending mix",
      scenario:
        "The quarterly report needs two more visuals: how each provider's appointment volume moved over six months, and what share of supply spending went to each category. Each question calls for a different chart type.",
      fileName: "Quarterly Report Charts.xlsx",
      minutes: 6,
      initial: {
        active: "Appointments",
        sheets: [
          {
            name: "Appointments",
            colWidths: { A: 64, B: 110, C: 100, D: 120 },
            cells: grid(
              "A1",
              [
                ["Month", "Dr. Anika Patel", "Dr. Wei Chen", "Dr. Samuel Okafor"],
                ["Jan", 312, 288, 251],
                ["Feb", 298, 301, 263],
                ["Mar", 335, 296, 279],
                ["Apr", 341, 318, 284],
                ["May", 356, 322, 297],
                ["Jun", 349, 335, 305],
              ],
              { header: true },
            ),
          },
          {
            name: "Spending",
            colWidths: { A: 140, B: 90 },
            cells: grid(
              "A1",
              [["Category", "Q2 Total"], ["Medical Supplies", 14420], ["Office Supplies", 3260], ["Cleaning Supplies", 2185], ["Break Room", 940], ["Equipment Repair", 1870]],
              { header: true, colFmt: { B: MONEY } },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Select A1:D7 and insert a Line with Markers chart to show each provider's trend over time.",
          hint: "Select A1:D7. Insert tab › Charts group › Insert Line or Area Chart › Line with Markers.",
          steps: [
            {
              action: { kind: "command", id: "insert.chart", value: "Line with Markers" },
              alt: [{ kind: "dialog", id: "insertChart", values: { type: "Line with Markers" } }],
              requires: { selection: inData("A1:D7"), sheet: "Appointments" },
              selectHint: "Select the appointment table, A1:D7, on the Appointments sheet.",
            },
          ],
        },
        {
          instruction: "Change the chart title to \"Appointment Volume by Provider, January to June\".",
          hint: "Double-click the chart title, type the new title and press Enter.",
          steps: [{ action: { kind: "type", target: "chart:c1.title", value: "Appointment Volume by Provider, January to June" } }],
        },
        {
          instruction: "Move the line chart to a new chart sheet named \"Appointment Chart\".",
          hint: "Click the chart. Chart Design tab › Location group › Move Chart. Choose New sheet, type Appointment Chart, OK.",
          steps: [{ action: { kind: "dialog", id: "moveChart", values: { location: "New sheet", name: "Appointment Chart" } } }],
        },
        {
          instruction: "On the Spending sheet, select A1:B6 and insert a Pie chart to show each category's share of spending.",
          hint: "Click the Spending tab and select A1:B6. Insert tab › Charts group › Insert Pie or Doughnut Chart › Pie.",
          steps: [
            {
              action: { kind: "command", id: "insert.chart", value: "Pie" },
              alt: [{ kind: "dialog", id: "insertChart", values: { type: "Pie" } }],
              requires: { selection: inData("A1:B6"), sheet: "Spending" },
              selectHint: "Select A1:B6 on the Spending sheet first.",
            },
          ],
        },
        {
          instruction: "Add data labels to the pie chart.",
          hint: "Click the chart. Chart Design tab › Chart Layouts group › Add Chart Element › Data Labels.",
          steps: [{ action: { kind: "command", id: "chart.addElement", value: "Data Labels" } }],
        },
        {
          instruction: "Change the pie chart's title to \"Supply Spending by Category, Q2 2026\".",
          hint: "Double-click the chart title, type the new title and press Enter.",
          steps: [{ action: { kind: "type", target: "chart:c1.title", value: "Supply Spending by Category, Q2 2026" }, requires: { sheet: "Spending" }, selectHint: "Edit the title of the pie chart on the Spending sheet." }],
        },
      ],
    },
  ],

  "module-4::pivottables": [
    {
      id: "oa-excel-m4-pivot-1",
      app: "excel",
      title: "Answer the spending questions with a PivotTable",
      scenario:
        "Renee Alvarez asks what each department spent in April, May and June. The expense log has 38 dated bills, so instead of writing formulas, build one PivotTable from the SpringExpenses table and shape it to answer her questions.",
      fileName: "Spring Expenses.xlsx",
      minutes: 7,
      initial: { active: "Expenses", sheets: [datedExpenseSheet()] },
      tasks: [
        {
          instruction: "Create a PivotTable from the SpringExpenses table on a new worksheet.",
          hint: "Click any cell in the table. Insert tab › Tables group › PivotTable. Table/Range already shows SpringExpenses; keep New Worksheet and click OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createPivot", values: { location: "New Worksheet" } },
              requires: { selection: inData("A1:E39") },
              selectHint: "Click a cell inside the expense table first.",
            },
          ],
        },
        {
          instruction: "Show total Amount by Department: put Department in Rows and Amount in Values.",
          hint: "In the PivotTable Fields pane, check Department (it goes to Rows) and Amount (it goes to Values). You can also drag them into the areas.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "pivot.field", value: "Department" }, alt: [{ kind: "command", id: "pivot.area", value: "Department>Rows" }], requires: { sheet: "Sheet2" } },
            { action: { kind: "command", id: "pivot.field", value: "Amount" }, alt: [{ kind: "command", id: "pivot.area", value: "Amount>Values" }], requires: { sheet: "Sheet2" } },
          ],
        },
        {
          instruction: "Add Date to the Columns area.",
          hint: "Drag Date from the field list into the Columns area (or use the arrow beside Date › Add to Column Labels). Each invoice date gets its own column for now.",
          steps: [{ action: { kind: "command", id: "pivot.area", value: "Date>Columns" }, requires: { sheet: "Sheet2" } }],
        },
        {
          instruction: "Group the dates by Months so April, May and June sit side by side.",
          hint: "Right-click any date in the column labels (row 4) › Group. Select Months (clear Days if it is selected), OK. (Or PivotTable Analyze tab › Group › Group Field.) The months list in calendar order, not A to Z.",
          steps: [
            {
              action: { kind: "dialog", id: "pivotGroup", values: { months: true, days: false } },
              requires: { sheet: "Sheet2" },
            },
          ],
        },
        {
          instruction: "Format the values as Currency with Value Field Settings, so the format stays when the PivotTable changes.",
          hint: "Right-click any amount › Value Field Settings › Number Format › Currency, OK, OK. (Formatting B5:E9 with Home › Number Format also works until the layout changes.)",
          steps: [
            {
              action: { kind: "dialog", id: "valueFieldSettings", values: { numberFormat: "Currency" } },
              alt: [{ kind: "command", id: "home.numberFormat", value: "Currency", requires: { selection: ["B5:E9", "B:E"], sheet: "Sheet2" } }],
              requires: { sheet: "Sheet2" },
            },
          ],
        },
        {
          instruction: "Sort the departments by their totals, largest to smallest.",
          hint: "Right-click a department's Grand Total amount (E5:E8) › Sort › Sort Largest to Smallest. (Or click one and use Data tab › Sort Z to A.)",
          steps: [
            {
              action: { kind: "command", id: "pivot.sort", value: "Largest to Smallest" },
              alt: [{ kind: "command", id: "data.sortDesc" }],
              requires: { selection: cells("E5:E8"), sheet: "Sheet2" },
              selectHint: "Click one of the departments' Grand Total amounts, E5:E8, first.",
            },
          ],
        },
        {
          instruction: "The April 5 utilities bill for Facilities was entered wrong. On the Expenses sheet, change E5 to 2080.",
          hint: "Click the Expenses tab, click E5, type 2080 and press Enter. Back on Sheet2 the PivotTable still shows the old total: it reads a saved copy of the data until you refresh it.",
          steps: [{ action: { kind: "type", target: "E5", value: ["2080", "2,080", "2080.00"] }, requires: { sheet: "Expenses" }, selectHint: "Switch to the Expenses sheet first." }],
        },
        {
          instruction: "Go back to the PivotTable and refresh it so it picks up the corrected amount.",
          hint: "Click the Sheet2 tab and a cell in the PivotTable. PivotTable Analyze tab › Data group › Refresh (or right-click › Refresh).",
          steps: [{ action: { kind: "command", id: "data.refresh" }, requires: { sheet: "Sheet2" }, selectHint: "Switch to the PivotTable sheet (Sheet2) first." }],
        },
      ],
    },
    {
      id: "oa-excel-m4-pivot-2",
      app: "excel",
      title: "Turn the PivotTable into a mini dashboard",
      scenario:
        "Renee Alvarez wants to explore the spending herself during the meeting without touching the field list. Add slicers she can click, a PivotChart that follows them, and a percentage view of each category's share.",
      fileName: "Spring Expenses.xlsx",
      minutes: 6,
      initial: {
        active: "PT Analysis",
        sheets: [
          {
            name: "PT Analysis",
            colWidths: { A: 130, B: 120 },
            cells: {},
            pivot: { source: { sheet: "Expense Data", range: "A1:E31" }, rows: ["Category"], columns: [], values: [{ field: "Amount", fn: "Sum" }], filters: [], at: "A3" },
          },
          { name: "Expense Data", colWidths: EXPENSE_WIDTHS, rows: 32, cells: expenseCells() },
        ],
      },
      tasks: [
        {
          instruction: "Insert a slicer for the Department field.",
          hint: "Click a cell in the PivotTable. PivotTable Analyze tab › Filter group › Insert Slicer (or Insert tab › Slicer). Choose Department, OK.",
          steps: [{ action: { kind: "dialog", id: "insertSlicer", values: { field: "Department" } }, requires: { sheet: "PT Analysis" } }],
        },
        {
          instruction: "Use the slicer to show only the Medical department.",
          hint: "Click Medical in the Department slicer.",
          steps: [{ action: { kind: "command", id: "pivot.filter", value: "Department=Medical" }, requires: { sheet: "PT Analysis" } }],
        },
        {
          instruction: "Clear the Department slicer so every department shows again.",
          hint: "Click the Clear Filter button (the funnel with an X) at the top right of the Department slicer.",
          steps: [{ action: { kind: "command", id: "pivot.filter", value: "Department=*" }, requires: { sheet: "PT Analysis" } }],
        },
        {
          instruction: "Insert a slicer for Month and use it to show only May.",
          hint: "PivotTable Analyze tab › Insert Slicer › Month, OK. Then click May in the Month slicer.",
          steps: [
            { action: { kind: "dialog", id: "insertSlicer", values: { field: "Month" } }, requires: { sheet: "PT Analysis" } },
            { action: { kind: "command", id: "pivot.filter", value: "Month=May" }, requires: { sheet: "PT Analysis" } },
          ],
        },
        {
          instruction: "Insert a Clustered Column PivotChart of the PivotTable.",
          hint: "Click a cell in the PivotTable. PivotTable Analyze tab › Tools group › PivotChart › Clustered Column, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "insertChart", values: { type: "Clustered Column" } },
              alt: [{ kind: "command", id: "insert.chart", value: "Clustered Column" }],
              requires: { sheet: "PT Analysis" },
            },
          ],
        },
        {
          instruction: "Change the PivotChart title to \"May Spending by Category\".",
          hint: "Double-click the chart title, type the new title and press Enter.",
          steps: [{ action: { kind: "type", target: "chart:c1.title", value: "May Spending by Category" }, requires: { sheet: "PT Analysis" } }],
        },
        {
          instruction: "Show the PivotTable values as a percentage of the grand total.",
          hint: "Right-click a value in the PivotTable › Show Values As › % of Grand Total (or PivotTable Analyze › Field Settings › Show Values As tab).",
          steps: [
            {
              action: { kind: "command", id: "pivot.showAs", value: "% of Grand Total" },
              alt: [{ kind: "dialog", id: "valueFieldSettings", values: { showAs: "% of Grand Total" } }],
              requires: { sheet: "PT Analysis" },
            },
          ],
        },
      ],
    },
  ],

  "module-4::advanced-functions": [
    {
      id: "oa-excel-m4-functions-1",
      app: "excel",
      title: "Look up rates and label each appointment",
      scenario:
        "The May appointment log needs three new columns before billing reviews it: each provider's billing rate from the Rates sheet, a High, Medium or Low revenue label, and a flag for visit types that need an insurance check.",
      fileName: "May Appointment Log.xlsx",
      minutes: 6,
      initial: {
        active: "Appointments",
        sheets: [
          { name: "Appointments", colWidths: APPT_WIDTHS, rows: 20, cells: apptCells(["Lookup Rate", "Revenue Category", "Insurance Check"]) },
          {
            name: "Rates",
            colWidths: { A: 140, B: 90 },
            cells: grid("A1", [["Provider", "Billing Rate"], ["Dr. Anika Patel", 185], ["Dr. Wei Chen", 210], ["Dr. Samuel Okafor", 195], ["PA Jordan Ellis", 150], ["NP Carmen Vega", 160]], { header: true, colFmt: { B: MONEY } }),
          },
        ],
      },
      tasks: [
        {
          instruction: "In F2, look up the provider's billing rate on the Rates sheet, showing \"Rate Not Found\" when the provider is missing: =IFERROR(VLOOKUP(B2,Rates!$A$2:$B$6,2,FALSE),\"Rate Not Found\").",
          hint: "Click F2, type =IFERROR(VLOOKUP(B2,Rates!$A$2:$B$6,2,FALSE),\"Rate Not Found\") and press Enter. The $ signs keep the table in place when you copy the formula down.",
          steps: [
            {
              action: {
                kind: "type",
                target: "F2",
                value: ['=IFERROR(VLOOKUP(B2,Rates!$A$2:$B$6,2,FALSE),"Rate Not Found")', '=IFERROR(VLOOKUP(B2,Rates!$A$2:$B$6,2,0),"Rate Not Found")'],
                match: "formula",
                strictRefs: true,
              },
            },
          ],
        },
        {
          instruction: "Copy the formula in F2 down through F16.",
          hint: "Select F2 and double-click the fill handle (or drag it down to F16). The NP Lena Marsh rows show Rate Not Found because she is not on the Rates sheet yet.",
          steps: [fill("F2", "F2:F16")],
        },
        {
          instruction: "In G2, label the revenue in E2: \"High\" above 400, \"Medium\" from 200 to 400, and \"Low\" below 200. Type =IF(E2>400,\"High\",IF(E2>=200,\"Medium\",\"Low\")).",
          hint: "Click G2, type =IF(E2>400,\"High\",IF(E2>=200,\"Medium\",\"Low\")) and press Enter.",
          steps: [
            {
              action: {
                kind: "type",
                target: "G2",
                value: ['=IF(E2>400,"High",IF(E2>=200,"Medium","Low"))', '=IF(E2<200,"Low",IF(E2<=400,"Medium","High"))'],
                match: "formula",
              },
            },
          ],
        },
        {
          instruction: "Copy the formula in G2 down through G16.",
          hint: "Select G2 and double-click the fill handle (or drag it down to G16).",
          steps: [fill("G2", "G2:G16")],
        },
        {
          instruction: "In H2, flag the visit for an insurance check when the type in D2 is \"New Patient\" or \"Specialist Referral\": =IF(OR(D2=\"New Patient\",D2=\"Specialist Referral\"),\"Verify\",\"OK\").",
          hint: "Click H2, type =IF(OR(D2=\"New Patient\",D2=\"Specialist Referral\"),\"Verify\",\"OK\") and press Enter. OR is true when either test is true.",
          steps: [
            {
              action: {
                kind: "type",
                target: "H2",
                value: ['=IF(OR(D2="New Patient",D2="Specialist Referral"),"Verify","OK")', '=IF(OR(D2="Specialist Referral",D2="New Patient"),"Verify","OK")'],
                match: "formula",
              },
            },
          ],
        },
        {
          instruction: "Copy the formula in H2 down through H16.",
          hint: "Select H2 and double-click the fill handle (or drag it down to H16).",
          steps: [fill("H2", "H2:H16")],
        },
      ],
    },
    {
      id: "oa-excel-m4-functions-2",
      app: "excel",
      title: "Summarize May revenue by provider",
      scenario:
        "Renee Alvarez wants a provider summary under the appointment log: how many appointments each provider had, their total revenue, and how much of it came from new patients. Build it with COUNTIF, SUMIF, SUMIFS and COUNTIFS so it updates itself.",
      fileName: "May Appointment Log.xlsx",
      minutes: 7,
      initial: {
        active: "Appointments",
        sheets: [
          {
            name: "Appointments",
            colWidths: { ...APPT_WIDTHS, B: 130, C: 96, D: 134, E: 120 },
            rows: 26,
            cells: {
              ...apptCells(),
              A18: { v: "Provider Summary", fmt: { bold: true, size: 12 } },
              ...grid("A19", [["Provider", "Appointments", "Total Revenue", "New Patient Revenue", "New Patient Visits"], ["Dr. Anika Patel"], ["Dr. Wei Chen"], ["Dr. Samuel Okafor"], ["NP Lena Marsh"]], { header: true }),
              ...fmtOnly("C20:D23", MONEY),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In B20, count the appointments for the provider in A20: =COUNTIF($B$2:$B$16,A20). Then copy it down through B23.",
          hint: "Click B20, type =COUNTIF($B$2:$B$16,A20) and press Enter. Select B20 and double-click the fill handle (or drag it to B23). The $ signs keep the range fixed; A20 changes on each row.",
          steps: [{ action: { kind: "type", target: "B20", value: "=COUNTIF($B$2:$B$16,A20)", match: "formula", strictRefs: true } }, fill("B20", "B20:B23")],
        },
        {
          instruction: "In C20, total each provider's revenue: =SUMIF($B$2:$B$16,A20,$E$2:$E$16). Copy it down through C23.",
          hint: "Click C20, type =SUMIF($B$2:$B$16,A20,$E$2:$E$16) and press Enter. Then fill C20 down to C23.",
          steps: [{ action: { kind: "type", target: "C20", value: "=SUMIF($B$2:$B$16,A20,$E$2:$E$16)", match: "formula", strictRefs: true } }, fill("C20", "C20:C23")],
        },
        {
          instruction: "In D20, total only New Patient revenue for each provider: =SUMIFS($E$2:$E$16,$B$2:$B$16,A20,$D$2:$D$16,\"New Patient\"). Copy it down through D23.",
          hint: "Click D20, type the formula and press Enter. In SUMIFS the range to add comes first, then each range and criteria pair. Fill D20 down to D23.",
          steps: [
            {
              action: {
                kind: "type",
                target: "D20",
                value: ['=SUMIFS($E$2:$E$16,$B$2:$B$16,A20,$D$2:$D$16,"New Patient")', '=SUMIFS($E$2:$E$16,$D$2:$D$16,"New Patient",$B$2:$B$16,A20)'],
                match: "formula",
                strictRefs: true,
              },
            },
            fill("D20", "D20:D23"),
          ],
        },
        {
          instruction: "In E20, count each provider's New Patient visits: =COUNTIFS($B$2:$B$16,A20,$D$2:$D$16,\"New Patient\"). Copy it down through E23.",
          hint: "Click E20, type the formula and press Enter. Then fill E20 down to E23.",
          steps: [
            {
              action: {
                kind: "type",
                target: "E20",
                value: ['=COUNTIFS($B$2:$B$16,A20,$D$2:$D$16,"New Patient")', '=COUNTIFS($D$2:$D$16,"New Patient",$B$2:$B$16,A20)'],
                match: "formula",
                strictRefs: true,
              },
            },
            fill("E20", "E20:E23"),
          ],
        },
        {
          instruction: "Bold the summary headers in A19:E19 and wrap their text.",
          hint: "Select A19:E19. Home tab › Font group › Bold, then Home tab › Alignment group › Wrap Text.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              alt: [{ kind: "dialog", id: "formatCells", values: { bold: true } }],
              requires: { selection: "A19:E19" },
              selectHint: "Select the summary headers in A19:E19 first.",
            },
            {
              action: { kind: "command", id: "home.wrap" },
              alt: [{ kind: "dialog", id: "formatCells", values: { wrap: true } }],
              requires: { selection: "A19:E19" },
              selectHint: "Select the summary headers in A19:E19 first.",
            },
          ],
        },
      ],
    },
  ],

  "module-4::data-validation-protection": [
    {
      id: "oa-excel-m4-validation-1",
      app: "excel",
      title: "Make the shared supply tracker error-proof",
      scenario:
        "Three staff members now update the supply tracker. Last week someone typed \"office\" instead of \"Office\", someone entered a negative quantity, and a Total Cost formula was deleted. Add validation to the entry columns, then hide and lock the formulas, give the nurse manager her own editable range, and protect the sheet and the workbook structure.",
      fileName: "Shared Supply Tracker.xlsx",
      minutes: 7,
      initial: {
        active: "Supply Tracker",
        sheets: [
          {
            name: "Supply Tracker",
            rows: 20,
            colWidths: { A: 190, B: 80, C: 64, D: 72, E: 88, F: 92, G: 80, H: 60 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Item", "Category", "Quantity", "Unit Cost", "Reorder Level", "Date Ordered", "Total Cost", "Status"],
                  ...SUPPLIES.slice(0, 15).map(([i, c, q, u, r], k) => [i, c, q, u, r, serial(10, 1 + k)]),
                ],
                { header: true, colFmt: { D: MONEY, F: DATE } },
              ),
              ...column("G", 2, 16, "=C{r}*D{r}", MONEY),
              ...column("H", 2, 16, '=IF(C{r}=0,"OUT",IF(C{r}<=E{r},"LOW","OK"))'),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Limit the Category cells B2:B16 to a drop-down list of Medical, Office, Cleaning, Break Room.",
          hint: "Select B2:B16. Data tab › Data Tools group › Data Validation. Allow: List. Source: Medical,Office,Cleaning,Break Room. OK.",
          steps: [
            {
              action: { kind: "dialog", id: "dataValidation", values: { allow: "List", source: ["Medical,Office,Cleaning,Break Room", "Medical, Office, Cleaning, Break Room"] } },
              requires: { selection: "B2:B16" },
              selectHint: "Select the Category cells, B2:B16, first.",
            },
          ],
        },
        {
          instruction: "For B2:B16, add an input message titled \"Category Entry\" that says \"Select a category for this supply item.\", and a Stop error alert that says \"Category must be selected from the dropdown list only.\"",
          hint: "Keep B2:B16 selected and open Data Validation again. On the Input Message tab type the title and the message. On the Error Alert tab keep Style: Stop and type the error message. OK.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "dataValidation",
                values: { inputTitle: "Category Entry", inputMessage: "Select a category for this supply item.", errorStyle: "Stop", errorMessage: "Category must be selected from the dropdown list only." },
              },
              requires: { selection: "B2:B16" },
              selectHint: "Select B2:B16 first.",
            },
          ],
        },
        {
          instruction: "Restrict the quantities in C2:C16 to whole numbers between 0 and 9999, with a Stop alert that says \"Quantity cannot be negative. Enter 0 for out-of-stock items.\"",
          hint: "Select C2:C16. Data tab › Data Validation. Settings tab: Allow: Whole number, Data: between, Minimum 0, Maximum 9999. Error Alert tab: Style Stop and the message. OK.",
          steps: [
            {
              action: { kind: "dialog", id: "dataValidation", values: { allow: "Whole number", data: "between", min: "0", max: "9999", errorMessage: "Quantity cannot be negative. Enter 0 for out-of-stock items." } },
              requires: { selection: "C2:C16" },
              selectHint: "Select the quantities in C2:C16 first.",
            },
          ],
        },
        {
          instruction: "Restrict the unit costs in D2:D16 to decimals greater than or equal to 0.01, with a Warning error alert so staff can override it.",
          hint: "Select D2:D16. Data tab › Data Validation. Allow: Decimal, Data: greater than or equal to, Minimum 0.01. On the Error Alert tab set Style to Warning. OK. A Warning asks Continue? and lets the entry stand if you click Yes.",
          steps: [
            {
              action: { kind: "dialog", id: "dataValidation", values: { allow: "Decimal", data: "greater than or equal to", min: ["0.01", ".01"], errorStyle: "Warning" } },
              requires: { selection: "D2:D16" },
              selectHint: "Select the unit costs in D2:D16 first.",
            },
          ],
        },
        {
          instruction: "Unlock the everyday entry cells so staff can still type in them after the sheet is protected: A2:D16 and F2:F16. Leave the Reorder Levels in column E locked.",
          hint: "Select A2:D16 and press Ctrl+1. On the Protection tab, clear Locked, OK. Do the same for F2:F16.",
          anyOrder: true,
          steps: [
            { action: { kind: "dialog", id: "formatCells", values: { locked: false } }, requires: { selection: "A2:D16" }, selectHint: "Select A2:D16 first." },
            { action: { kind: "dialog", id: "formatCells", values: { locked: false } }, requires: { selection: "F2:F16" }, selectHint: "Select F2:F16 first." },
          ],
        },
        {
          instruction: "Let the nurse manager change the Reorder Levels with her own password: add an editable range titled \"Reorder Levels\" for E2:E16 with the password \"Nurse2026\".",
          hint: "Select E2:E16. Review tab › Protect group › Allow Edit Ranges › New. Title: Reorder Levels, Refers to cells: =$E$2:$E$16, Range password: Nurse2026. OK.",
          steps: [
            {
              action: { kind: "dialog", id: "allowEditRanges", values: { title: "Reorder Levels", refersTo: ["=$E$2:$E$16", "$E$2:$E$16", "E2:E16", "=E2:E16"], password: "Nurse2026" } },
              requires: { selection: ["E2:E16", ...cells("E2:E16")] },
              selectHint: "Select the Reorder Levels, E2:E16, first.",
            },
          ],
        },
        {
          instruction: "Hide the formulas in G2:H16 so the formula bar shows only results once the sheet is protected.",
          hint: "Select G2:H16 and press Ctrl+1. On the Protection tab, check Hidden, then OK.",
          steps: [
            {
              action: { kind: "dialog", id: "formatCells", values: { hidden: true } },
              requires: { selection: "G2:H16" },
              selectHint: "Select the formula cells, G2:H16, first.",
            },
          ],
        },
        {
          instruction: "Protect the Supply Tracker sheet with the password \"Lakeside2026\", leaving Select locked cells and Select unlocked cells allowed.",
          hint: "Review tab › Protect group › Protect Sheet. Type Lakeside2026 as the password, keep both Select options checked, and click OK.",
          steps: [{ action: { kind: "dialog", id: "protectSheet", values: { password: "Lakeside2026", selectLocked: true, selectUnlocked: true } } }],
        },
        {
          instruction: "Protect the workbook structure so no one can rename, delete or add sheets. Do not use a password.",
          hint: "Review tab › Protect group › Protect Workbook. Keep Structure checked, leave the password blank, OK.",
          steps: [{ action: { kind: "dialog", id: "protectWorkbook", values: { structure: true } } }],
        },
      ],
    },
  ],

  "module-4::excel-advanced-capstone": [
    {
      id: "oa-excel-m4-capstone-1",
      app: "excel",
      title: "Set up the expense log and the analysis sheet",
      scenario:
        "The physician owner of Lakeside Medical Associates will review April and May expenses at next month's leadership meeting. Start the dashboard: make the expense log a validated table, then build the Analysis sheet with a cross-tab PivotTable and chart.",
      fileName: "Monthly Expense Dashboard.xlsx",
      minutes: 8,
      initial: { active: "Expense Data", sheets: [dashExpenseSheet()] },
      tasks: [
        {
          instruction: "Convert the expense records in A1:E26 into an Excel Table that has headers.",
          hint: "Click any cell in the data and press Ctrl+T (or Insert tab › Tables group › Table). Check My table has headers, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createTable", values: { headers: true } },
              alt: [{ kind: "command", id: "home.formatAsTable" }],
              requires: { selection: inData("A1:E26") },
              selectHint: "Click a cell inside the expense records first.",
            },
          ],
        },
        {
          instruction: "Name the table \"ExpenseData\".",
          hint: "Click a cell in the table. Table Design tab › Properties group › Table Name box, type ExpenseData and press Enter.",
          steps: [{ action: { kind: "command", id: "table.name", value: "ExpenseData" }, requires: { selection: cells("A1:E26") }, selectHint: "Click a cell inside the table so the Table Design tab appears." }],
        },
        {
          instruction: "Limit the Department cells B2:B26 to a drop-down list of Medical, Nursing, Administration, Facilities.",
          hint: "Select B2:B26. Data tab › Data Validation. Allow: List. Source: Medical,Nursing,Administration,Facilities. OK.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "dataValidation",
                values: { allow: "List", source: ["Medical,Nursing,Administration,Facilities", "Medical, Nursing, Administration, Facilities"] },
              },
              requires: { selection: "B2:B26" },
              selectHint: "Select the Department cells, B2:B26, first.",
            },
          ],
        },
        {
          instruction: "Allow only whole numbers greater than 0 in the Amount cells E2:E26.",
          hint: "Select E2:E26. Data tab › Data Validation. Allow: Whole number, Data: greater than, Minimum: 0. OK.",
          steps: [
            {
              action: { kind: "dialog", id: "dataValidation", values: { allow: "Whole number", data: "greater than", min: "0" } },
              requires: { selection: "E2:E26" },
              selectHint: "Select the Amount cells, E2:E26, first.",
            },
          ],
        },
        {
          instruction: "Create a PivotTable from the ExpenseData table on a new worksheet.",
          hint: "Click a cell in the table. Insert tab › Tables group › PivotTable (or Table Design › Summarize with PivotTable). Table/Range shows ExpenseData, so rows added to the table are included at the next refresh. Keep New Worksheet, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createPivot", values: { location: "New Worksheet" } },
              requires: { selection: inData("A1:E26") },
              selectHint: "Click a cell inside the expense table first.",
            },
          ],
        },
        {
          instruction: "Rename the new PivotTable sheet \"Analysis\".",
          hint: "Double-click the Sheet2 tab, type Analysis and press Enter.",
          steps: [{ action: { kind: "type", target: "sheet:Sheet2", value: "Analysis" } }],
        },
        {
          instruction: "Build the spending matrix: Department in Rows, Category in Columns, and Amount in Values.",
          hint: "In the PivotTable Fields pane, check Department and Amount, then drag Category into the Columns area.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "pivot.field", value: "Department" }, alt: [{ kind: "command", id: "pivot.area", value: "Department>Rows" }], requires: { sheet: "Analysis" } },
            { action: { kind: "command", id: "pivot.area", value: "Category>Columns" }, requires: { sheet: "Analysis" } },
            { action: { kind: "command", id: "pivot.field", value: "Amount" }, alt: [{ kind: "command", id: "pivot.area", value: "Amount>Values" }], requires: { sheet: "Analysis" } },
          ],
        },
        {
          instruction: "Format all the PivotTable values as Currency through Value Field Settings.",
          hint: "Right-click any amount in the PivotTable › Value Field Settings › Number Format › Currency, OK, OK. The format belongs to the Sum of Amount field, so it stays when the PivotTable is refreshed or rearranged.",
          steps: [
            {
              action: { kind: "dialog", id: "valueFieldSettings", values: { numberFormat: "Currency" } },
              alt: [{ kind: "command", id: "home.numberFormat", value: "Currency", requires: { selection: ["B5:G9", "B:G"], sheet: "Analysis" } }],
              requires: { sheet: "Analysis" },
            },
          ],
        },
        {
          instruction: "Insert a Clustered Column PivotChart of the spending matrix.",
          hint: "Click a cell in the PivotTable. PivotTable Analyze tab › Tools group › PivotChart › Clustered Column, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "insertChart", values: { type: "Clustered Column" } },
              alt: [{ kind: "command", id: "insert.chart", value: "Clustered Column" }],
              requires: { sheet: "Analysis" },
            },
          ],
        },
        {
          instruction: "Add data labels to the PivotChart so each bar shows its amount.",
          hint: "Click the chart. Chart Design tab › Chart Layouts group › Add Chart Element › Data Labels.",
          steps: [{ action: { kind: "command", id: "chart.addElement", value: "Data Labels" }, requires: { sheet: "Analysis" } }],
        },
      ],
    },
    {
      id: "oa-excel-m4-capstone-2",
      app: "excel",
      title: "Finish and lock the expense dashboard",
      scenario:
        "The Analysis sheet is built. Now add a Month slicer, a formula summary the physician owner can read without touching the PivotTable, the Dashboard numbers, and a test entry to prove everything updates. Then protect the Dashboard and export it.",
      fileName: "Monthly Expense Dashboard.xlsx",
      minutes: 8,
      initial: {
        active: "Analysis",
        sheets: [
          {
            name: "Analysis",
            rows: 22,
            colWidths: { A: 120, B: 84, C: 84, D: 84, E: 84, F: 100, G: 92 },
            pivot: {
              source: { sheet: "Expense Data", range: "ExpenseData" },
              rows: ["Department"],
              columns: ["Category"],
              // Currency from Value Field Settings › Number Format (set in the first capstone sim).
              values: [{ field: "Amount", fn: "Sum", numFmt: "Currency" } as ExcelPivot["values"][number]],
              filters: [],
              at: "A3",
            },
            charts: [{ id: "c1", type: "Clustered Column", title: "Expenses by Department", range: "PIVOT", at: "I3" }],
            cells: {
              A12: { v: "Department Summary", fmt: { bold: true, size: 12 } },
              ...grid("A13", [["Department", "Total Spend"], ...DEPARTMENTS.map((d) => [d])], { header: true }),
              ...fmtOnly("B14:B17", MONEY),
            },
          },
          {
            ...dashExpenseSheet(),
            table: { range: "A1:E26", style: "Table Style Medium 2", name: "ExpenseData" },
            filter: "A1:E26",
            validation: {
              "B2:B26": { type: "List", list: ["Medical", "Nursing", "Administration", "Facilities"] },
              "C2:C26": { type: "List", list: ["Supplies", "Equipment", "Services", "Utilities", "Staff Training"] },
              "E2:E26": { type: "Whole number", min: 1 },
            },
          },
          {
            name: "Dashboard",
            colWidths: { A: 200, B: 120 },
            cells: {
              A1: { v: "Lakeside Medical Associates - Monthly Expense Report", fmt: TITLE },
              A2: { v: "April and May 2026", fmt: { italic: true } },
              ...grid("A4", [["Grand Total Spend"], ["Average Transaction"], ["Highest Category Spend"], ["Number of Transactions"]], { colFmt: { A: { bold: true } } }),
              ...fmtOnly("B4:B6", MONEY),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "On the Analysis sheet, insert a slicer for the Month field.",
          hint: "Click a cell in the PivotTable. PivotTable Analyze tab › Filter group › Insert Slicer. Choose Month, OK.",
          steps: [{ action: { kind: "dialog", id: "insertSlicer", values: { field: "Month" } }, requires: { sheet: "Analysis" } }],
        },
        {
          instruction: "In B14, total the spending for the department in A14 with structured references: =SUMIF(ExpenseData[Department],A14,ExpenseData[Amount]). Copy it down through B17.",
          hint: "Click B14, type the formula and press Enter. Select B14 and double-click the fill handle (or drag it to B17).",
          steps: [
            {
              action: { kind: "type", target: "B14", value: "=SUMIF(ExpenseData[Department],A14,ExpenseData[Amount])", match: "formula" },
              requires: { sheet: "Analysis" },
              selectHint: "Work on the Analysis sheet.",
            },
            fill("B14", "B14:B17", "Down", "Analysis"),
          ],
        },
        {
          instruction: "On the Dashboard sheet, in B4 total the department summary with =SUM(Analysis!B14:B17). In B6, find the highest category total from the PivotTable's Grand Total row with =MAX(Analysis!B9:F9).",
          hint: "Click the Dashboard tab. In B4 type =SUM(Analysis!B14:B17), Enter. In B6 type =MAX(Analysis!B9:F9), Enter: B9:F9 is the Grand Total row of the PivotTable, one total per category. (For B4, =GETPIVOTDATA(\"Amount\",Analysis!$A$3) reads the PivotTable's grand total instead.)",
          anyOrder: true,
          steps: [
            {
              action: { kind: "type", target: "B4", value: ["=SUM(Analysis!B14:B17)", '=GETPIVOTDATA("Amount",Analysis!$A$3)', '=GETPIVOTDATA("Sum of Amount",Analysis!$A$3)', "=Analysis!G9"], match: "formula" },
              requires: { sheet: "Dashboard" },
              selectHint: "Switch to the Dashboard sheet first.",
            },
            { action: { kind: "type", target: "B6", value: ["=MAX(Analysis!B9:F9)", "=MAX(Analysis!$B$9:$F$9)"], match: "formula" }, requires: { sheet: "Dashboard" }, selectHint: "Switch to the Dashboard sheet first." },
          ],
        },
        {
          instruction: "In B5, calculate the average transaction with =AVERAGE(ExpenseData[Amount]), and in B7 count the transactions with =COUNT(ExpenseData[Amount]).",
          hint: "In B5 type =AVERAGE(ExpenseData[Amount]), Enter. In B7 type =COUNT(ExpenseData[Amount]), Enter.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "B5", value: "=AVERAGE(ExpenseData[Amount])", match: "formula" }, requires: { sheet: "Dashboard" }, selectHint: "Switch to the Dashboard sheet first." },
            { action: { kind: "type", target: "B7", value: ["=COUNT(ExpenseData[Amount])", "=COUNTA(ExpenseData[Amount])"], match: "formula" }, requires: { sheet: "Dashboard" }, selectHint: "Switch to the Dashboard sheet first." },
          ],
        },
        {
          instruction: "Test the dashboard: on the Expense Data sheet, add a new record directly below the table in row 27: May, Nursing, Supplies, Lakeshore Surgical Supply, 425.",
          hint: "Click the Expense Data tab and click A27. Type May, Tab, Nursing, Tab, Supplies, Tab, Lakeshore Surgical Supply, Tab, 425, Enter. The table grows to include the row.",
          steps: [
            { action: { kind: "type", target: "A27", value: "May" }, requires: { sheet: "Expense Data" }, selectHint: "Switch to the Expense Data sheet first." },
            { action: { kind: "type", target: "B27", value: "Nursing" }, requires: { sheet: "Expense Data" } },
            { action: { kind: "type", target: "C27", value: "Supplies" }, requires: { sheet: "Expense Data" } },
            { action: { kind: "type", target: "D27", value: "Lakeshore Surgical Supply" }, requires: { sheet: "Expense Data" } },
            { action: { kind: "type", target: "E27", value: "425" }, requires: { sheet: "Expense Data" } },
          ],
        },
        {
          instruction: "Refresh the PivotTable on the Analysis sheet so it includes the new record.",
          hint: "Click the Analysis tab and a cell in the PivotTable. PivotTable Analyze tab › Data group › Refresh (or Data tab › Refresh All). The SUMIF table already counted the new row; the PivotTable and Highest Category Spend change only after Refresh.",
          steps: [{ action: { kind: "command", id: "data.refresh" }, requires: { sheet: "Analysis" }, selectHint: "Switch to the Analysis sheet first." }],
        },
        {
          instruction: "Protect the Dashboard sheet so it is read-only. Do not use a password.",
          hint: "Click the Dashboard tab. Review tab › Protect group › Protect Sheet, leave the password blank, OK.",
          steps: [{ action: { kind: "dialog", id: "protectSheet" }, requires: { sheet: "Dashboard" }, selectHint: "Switch to the Dashboard sheet first." }],
        },
        {
          instruction: "Export a PDF named \"Executive Expense Report - May 2026\".",
          hint: "File tab › Export › Create PDF/XPS Document. Type the file name and click Create PDF/XPS.",
          steps: [{ action: { kind: "dialog", id: "file.exportPdf", values: { name: "Executive Expense Report - May 2026" } } }],
        },
      ],
    },
  ],
};

export const excelSims: Record<string, SimDefinition[]> = { ...m3Sims, ...m4Sims };
