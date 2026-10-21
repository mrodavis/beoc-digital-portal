import type { ExcelCell, SimDefinition } from "@/types/sim";
import { googleDoc } from "@/components/sim/apps/google/types";
import { EMAIL, GW_ME, GW_ORG, GW_PEOPLE } from "./people";

/**
 * Google Workspace, Module 4 (Google Sheets) sims. Keys are "module-4::<lessonSlug>".
 * Parkview Property Management; the learner is Jordan Lee. All fictional.
 */

const base = { me: GW_ME, org: GW_ORG, people: GW_PEOPLE };
type Cells = Record<string, ExcelCell>;
const COLS = "ABCDEFGHIJ";

/** Cells from a header row and data rows, starting at A1. */
function grid(header: string[], rows: (string | number)[][], bold = true): Cells {
  const cells: Cells = {};
  header.forEach((h, c) => (cells[`${COLS[c]}1`] = bold ? { v: h, fmt: { bold: true } } : { v: h }));
  rows.forEach((r, i) => r.forEach((v, c) => (cells[`${COLS[c]}${i + 2}`] = { v })));
  return cells;
}

const sheetFile = (id: string, name: string, sheets: { name: string; cells: Cells; colWidths?: Record<string, number> }[], extra: Record<string, unknown> = {}) => ({
  id,
  name,
  kind: "sheet" as const,
  parent: "root",
  modified: "Oct 19, 2026",
  content: { active: sheets[0].name, sheets },
  ...extra,
});
const open1 = (fileId: string) => ({ surface: "sheets" as const, open: fileId, tabs: [fileId] });

/* ---------- 4.1 rent roll ---------- */
const RENT = grid(
  ["Apartment", "Tenant", "Monthly Rent", "Bedrooms", "Lease Ends"],
  [
    ["Elm 1A", "Rosa Delgado", 1325, 1, "3/31/2027"],
    ["Elm 1B", "Sam Whitfield", 1450, 2, "6/30/2027"],
    ["Elm 2A", "Grace Lin", 1325, 1, "1/31/2027"],
    ["Elm 2B", "Omar Haddad", 1475, 2, "8/31/2027"],
    ["Elm 2C", "Tina Okafor", 1400, 2, "10/31/2027"],
    ["Elm 3A", "Luis Ortega", 1295, 1, "12/31/2026"],
    ["Elm 3B", "Hannah Price", 1500, 2, "5/31/2027"],
  ],
  false,
);

/* ---------- 4.2 repair costs ---------- */
const COSTS: Cells = {
  ...grid(
    ["Repair", "Apartment", "Parts", "Labor", "Total", "Limit check"],
    [
      ["Kitchen faucet", "Elm 3B", 42, 95],
      ["Heater fan", "River 210", 180, 160],
      ["Mailbox lock", "Elm 1A", 28, 45],
      ["Dishwasher pump", "River 114", 135, 190],
      ["Bathroom fan", "Elm 2C", 64, 80],
      ["Window latch", "River 305", 18, 40],
      ["Garbage disposal", "Elm 2A", 120, 110],
    ],
  ),
  A10: { v: "Total", fmt: { bold: true } },
  A11: { v: "Average", fmt: { bold: true } },
  A12: { v: "Highest", fmt: { bold: true } },
  F10: { v: "" },
  H1: { v: "Limit per repair", fmt: { bold: true } },
  H2: { v: 300, fmt: { numFmt: "Currency" } },
};

/* ---------- 4.3 request log ---------- */
const LOG = grid(
  ["Date", "Building", "Apartment", "Problem", "Priority", "Status"],
  [
    ["10/1", "Riverside Commons", "River 210", "Heater not working", "High", "Open"],
    ["10/3", "Elm Street Apartments", "Elm 3B", "Leaking kitchen faucet", "Medium", "Done"],
    ["10/6", "Riverside Commons", "River 114", "Dishwasher not draining", "Medium", "Open"],
    ["10/8", "Elm Street Apartments", "Elm 1A", "Broken mailbox lock", "Low", "Done"],
    ["10/9", "Riverside Commons", "River 305", "Window will not latch", "Low", "Open"],
    ["10/12", "Elm Street Apartments", "Elm 2C", "Bathroom fan noisy", "Low", "Open"],
    ["10/14", "Riverside Commons", "River 118", "No hot water", "High", "Done"],
    ["10/15", "Elm Street Apartments", "Elm 2A", "Garbage disposal stuck", "Medium", "Open"],
    ["10/17", "Riverside Commons", "River 220", "Smoke detector beeping", "High", "Open"],
    ["10/19", "Elm Street Apartments", "Elm 1B", "Closet door off track", "Low", "Open"],
  ],
);
const SUPPLIES = grid(
  ["Item", "Category", "On hand"],
  [
    ["Paper towels (case)", "Cleaning", 3],
    ["Light bulbs (pack)", "Maintenance", 12],
    ["Printer paper (case)", "Office", 2],
    ["Trash bags (box)", "Cleaning", 5],
    ["Furnace filters", "Maintenance", 8],
  ],
);

/* ---------- 4.4 charts and pivots ---------- */
const BY_MONTH = grid(["Month", "Repairs"], [["June", 14], ["July", 19], ["August", 23], ["September", 17], ["October", 26]]);
const ROLL: Cells = (() => {
  const rows: (string | number)[][] = [
    ["Elm Street", "Elm 1A", 1325, "Paid"],
    ["Elm Street", "Elm 1B", 1450, "Paid"],
    ["Elm Street", "Elm 2A", 1325, "Late"],
    ["Elm Street", "Elm 2B", 1475, "Paid"],
    ["Elm Street", "Elm 2C", 1400, "Paid"],
    ["Elm Street", "Elm 3A", 1295, "Late"],
    ["Riverside", "River 114", 1550, "Paid"],
    ["Riverside", "River 118", 1500, "Paid"],
    ["Riverside", "River 210", 1650, "Late"],
    ["Riverside", "River 220", 1625, "Paid"],
    ["Riverside", "River 305", 1700, "Paid"],
    ["Riverside", "River 310", 1700, "Late"],
  ];
  const cells = grid(["Building", "Apartment", "Rent", "Status"], rows);
  for (let r = 2; r <= rows.length + 1; r++) cells[`C${r}`] = { ...cells[`C${r}`], fmt: { numFmt: "Currency" } };
  return cells;
})();

/* ---------- 4.5 supply order ---------- */
const ORDER: Cells = (() => {
  const rows: (string | number)[][] = [
    ["Mop heads", "", 6, 7.5],
    ["Light bulbs (pack)", "", 4, 11.25],
    ["Printer paper (case)", "", 2, 42],
    ["Trash bags (box)", "", 5, 18],
    ["Furnace filters", "", 10, 9.4],
    ["Glass cleaner", "", 6, 4.25],
    ["Sticky notes", "", 12, 1.5],
  ];
  const cells = grid(["Item", "Category", "Quantity", "Unit Cost", "Total", "Ordered"], rows);
  for (let r = 2; r <= 8; r++) {
    cells[`D${r}`] = { ...cells[`D${r}`], fmt: { numFmt: "Currency" } };
    cells[`E${r}`] = { f: `=C${r}*D${r}`, fmt: { numFmt: "Currency" } };
    delete cells[`B${r}`];
  }
  cells.A9 = { v: "Order total", fmt: { bold: true } };
  cells.E9 = { f: "=SUM(E2:E8)", fmt: { numFmt: "Currency", bold: true } };
  return cells;
})();

export const gwModule4Sims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  "module-4::sheets-basics-and-formatting": [
    {
      id: "gw-m4-rent-roll",
      app: "google",
      title: "Clean up the Elm Street rent roll",
      scenario:
        "Priya's rent roll for Elm Street Apartments is hard to read, and a new tenant just signed a lease. Add the tenant, then format the sheet so the labels, the rents, and the tabs are clear.",
      fileName: "Parkview Rent Roll",
      minutes: 6,
      initial: googleDoc({ ...open1("f1"), ...base, files: [sheetFile("f1", "Parkview Rent Roll", [{ name: "Sheet1", cells: RENT, colWidths: { A: 90, B: 130, C: 110, D: 80, E: 100 } }], { owner: EMAIL.priya, sharing: { people: [{ email: EMAIL.jordan, role: "Editor" }] } })] }),
      tasks: [
        {
          instruction: "In row 9, add the new tenant: type “Elm 3C” in A9, then “Kevin Brooks” in B9.",
          hint: "Click A9, type Elm 3C, and press Tab to move to B9. Type Kevin Brooks and press Enter.",
          anyOrder: false,
          steps: [
            { action: { kind: "type", target: "A9", value: "Elm 3C" } },
            { action: { kind: "type", target: "B9", value: "Kevin Brooks" } },
          ],
        },
        {
          instruction: "Bold the header row, A1 through E1.",
          hint: "Click row number 1 (or drag from A1 to E1), then click Bold on the toolbar or press Ctrl+B.",
          steps: [{ action: { kind: "command", id: "home.bold" }, requires: { selection: ["A1:E1", "1:1"] }, selectHint: "Select A1:E1 (or all of row 1) first." }],
        },
        {
          instruction: "Give the header row the fill color light gray 2.",
          hint: "With row 1 selected, click Fill color (the paint bucket) and choose light gray 2 in the top row of colors.",
          steps: [{ action: { kind: "command", id: "home.fill", value: "#efefef" }, requires: { selection: ["A1:E1", "1:1"] }, selectHint: "Select A1:E1 (or all of row 1) first." }],
        },
        {
          instruction: "Format the rents in C2:C9 as currency.",
          hint: "Select C2:C9, then click Format as currency ($) on the toolbar, or press Ctrl+Shift+4.",
          steps: [{ action: { kind: "command", id: "home.numberFormat", value: "Currency" }, requires: { selection: ["C2:C9", "C:C"] }, selectHint: "Select C2:C9 first (drag from C2 to C9)." }],
        },
        {
          instruction: "Freeze the header row so it stays visible when you scroll.",
          hint: "View › Freeze › 1 row.",
          steps: [{ action: { kind: "command", id: "g.freeze", value: "1 row" } }],
        },
        {
          instruction: "Rename the sheet tab “Sheet1” to “Elm Street”.",
          hint: "Double-click the Sheet1 tab at the bottom (or right-click it › Rename), type Elm Street, and press Enter.",
          steps: [{ action: { kind: "type", target: "sheet:Sheet1", value: "Elm Street" } }],
        },
        {
          instruction: "Add a new sheet and name it “Riverside Commons”.",
          hint: "Click + (Add Sheet) at the bottom left. Then double-click the new Sheet2 tab, type Riverside Commons, and press Enter.",
          steps: [
            { action: { kind: "command", id: "sheet.add" } },
            { action: { kind: "type", target: "sheet:Sheet2", value: "Riverside Commons" } },
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-4::formulas-and-functions": [
    {
      id: "gw-m4-formulas",
      app: "google",
      title: "Let the repair cost sheet do the math",
      scenario:
        "Kim tracks the parts and labor cost of every repair. Add the totals, the monthly summary, and a flag on any repair over Parkview's limit in H2, so nobody needs a calculator.",
      fileName: "October Repair Costs",
      minutes: 8,
      initial: googleDoc({ ...open1("f1"), ...base, files: [sheetFile("f1", "October Repair Costs", [{ name: "Repairs", cells: COSTS, colWidths: { A: 140, B: 90, C: 70, D: 70, E: 80, F: 100, H: 130 } }], { owner: EMAIL.kim, sharing: { people: [{ email: EMAIL.jordan, role: "Editor" }] } })] }),
      tasks: [
        {
          instruction: "In E2, enter a formula that adds the parts and labor: “=C2+D2”.",
          hint: "Click E2, type =C2+D2, and press Enter. You can click C2 and D2 while typing instead of typing the references.",
          steps: [{ action: { kind: "type", target: "E2", value: ["=C2+D2", "=D2+C2", "=SUM(C2:D2)"], match: "formula" } }],
        },
        {
          instruction: "Fill the formula in E2 down through E8.",
          hint: "Click E2 and drag the small blue square at its bottom right corner down to E8. Or select E2:E8 and press Ctrl+D.",
          steps: [{ action: { kind: "command", id: "excel.fill", value: "E2:E8" }, requires: { selection: "E2" }, selectHint: "Click E2, the cell with the formula, first.", alt: [{ kind: "command", id: "home.fillSeries", value: "Down", requires: { selection: "E2:E8" } }] }],
        },
        {
          instruction: "In E10, total the repair costs with SUM.",
          hint: "Click E10, type =SUM(E2:E8), and press Enter.",
          steps: [{ action: { kind: "type", target: "E10", value: "=SUM(E2:E8)", match: "formula" } }],
        },
        {
          instruction: "In E11, find the average repair cost.",
          hint: "Click E11, type =AVERAGE(E2:E8), and press Enter.",
          steps: [{ action: { kind: "type", target: "E11", value: "=AVERAGE(E2:E8)", match: "formula" } }],
        },
        {
          instruction: "In E12, find the highest repair cost.",
          hint: "Click E12, type =MAX(E2:E8), and press Enter.",
          steps: [{ action: { kind: "type", target: "E12", value: "=MAX(E2:E8)", match: "formula" } }],
        },
        {
          instruction: "In F2, enter “=IF(E2>$H$2,\"Over\",\"OK\")” so the limit in H2 stays locked when you copy the formula.",
          hint: "Click F2 and type =IF(E2>$H$2,\"Over\",\"OK\") exactly, with the dollar signs (press F4 after typing H2 to add them). Press Enter.",
          steps: [{ action: { kind: "type", target: "F2", value: "=IF(E2>$H$2,\"Over\",\"OK\")", match: "formula", strictRefs: true } }],
        },
        {
          instruction: "Fill the formula in F2 down through F8.",
          hint: "Click F2 and drag its fill handle (the blue square) down to F8, or select F2:F8 and press Ctrl+D.",
          steps: [{ action: { kind: "command", id: "excel.fill", value: "F2:F8" }, requires: { selection: "F2" }, selectHint: "Click F2 first.", alt: [{ kind: "command", id: "home.fillSeries", value: "Down", requires: { selection: "F2:F8" } }] }],
        },
        {
          instruction: "In F10, count how many repairs are over the limit with COUNTIF.",
          hint: "Click F10, type =COUNTIF(F2:F8,\"Over\"), and press Enter.",
          steps: [{ action: { kind: "type", target: "F10", value: "=COUNTIF(F2:F8,\"Over\")", match: "formula" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-4::sort-filter-and-conditional-formatting": [
    {
      id: "gw-m4-sort-filter",
      app: "google",
      title: "Sort, filter, and highlight the request log",
      scenario:
        "The maintenance request log covers both buildings. Group it by building for Kim, show Denise only the open requests, save a Riverside view for Marcus that does not change anyone else's screen, make high-priority requests stand out, and turn the supply list into a table.",
      fileName: "Maintenance Request Log",
      minutes: 8,
      initial: googleDoc({
        ...open1("f1"),
        ...base,
        files: [sheetFile("f1", "Maintenance Request Log", [
          { name: "Requests", cells: LOG, colWidths: { A: 60, B: 170, C: 90, D: 190, E: 70, F: 70 } },
          { name: "Supplies", cells: SUPPLIES, colWidths: { A: 170, B: 110, C: 80 } },
        ], { owner: EMAIL.kim, sharing: { people: [{ email: EMAIL.jordan, role: "Editor" }, { email: EMAIL.marcus, role: "Editor" }, { email: EMAIL.denise, role: "Editor" }] } })],
      }),
      tasks: [
        {
          instruction: "Sort the requests (A1:F11, which has a header row) by Building, A to Z.",
          hint: "Select A1:F11. Data › Sort range › Advanced range sorting options. Check Data has header row, sort by Building, choose A → Z, and click Sort.",
          steps: [{ action: { kind: "dialog", id: "g.sortRange", values: { range: "A1:F11", header: true, sortBy: "Building", order: "A to Z" } }, alt: [{ kind: "dialog", id: "g.sortRange", values: { range: "A2:F11", header: false, sortBy: "Column B", order: "A to Z" } }] }],
        },
        {
          instruction: "Create a filter on A1:F11, then show only the requests whose Status is Open.",
          hint: "Select A1:F11 and choose Data › Create a filter. Click the filter button in the Status header, click Clear, check Open, and click OK.",
          steps: [
            { action: { kind: "command", id: "data.filter" }, requires: { selection: "A1:F11" }, selectHint: "Select A1:F11 first." },
            { action: { kind: "command", id: "filter.by", value: "F=Open" } },
          ],
        },
        {
          instruction: "Create a filter view that shows only Riverside Commons, and save it as “Riverside open requests”.",
          hint: "Data › Create filter view. In the Building header, click the filter button, Clear, check Riverside Commons, OK. Then click Save view in the dark bar, type Riverside open requests, and click Save.",
          steps: [
            { action: { kind: "command", id: "g.filterView" } },
            { action: { kind: "command", id: "filter.by", value: "B=Riverside Commons" } },
            { action: { kind: "type", target: "filterview:fv1", value: "Riverside open requests" } },
          ],
        },
        {
          instruction: "Close the filter view. Then add a conditional formatting rule that gives Priority cells (E2:E11) that say “High” a red fill.",
          hint: "Close the filter view with the X at the right of the dark bar. Select E2:E11, then Format › Conditional formatting. Choose Text is exactly, type High, pick Red fill, and click Done.",
          steps: [{ action: { kind: "dialog", id: "g.cf", values: { range: "E2:E11", condition: "Text is exactly", value: "High", style: "Red fill" } } }],
        },
        {
          instruction: "On the Supplies sheet, convert the supply list to a table.",
          hint: "Click the Supplies tab at the bottom. Click any cell in the list (or select A1:C6), then Format › Convert to table.",
          steps: [{ action: { kind: "command", id: "g.convertTable" }, requires: { sheet: "Supplies", selection: ["A1:C6", "A1", "A2", "B1", "B2"] }, selectHint: "Open the Supplies sheet and click a cell in the list first." }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-4::charts-and-pivot-tables": [
    {
      id: "gw-m4-chart-pivot",
      app: "google",
      title: "Chart the repairs and summarize the rent",
      scenario:
        "Marcus presents to the building owners this month. Make a chart of repair requests by month, then a pivot table of rent by building and payment status from the rent roll.",
      fileName: "Owners Meeting Numbers",
      minutes: 7,
      initial: googleDoc({
        ...open1("f1"),
        ...base,
        files: [sheetFile("f1", "Owners Meeting Numbers", [
          { name: "Repairs by Month", cells: BY_MONTH, colWidths: { A: 110, B: 90 } },
          { name: "Rent Roll", cells: ROLL, colWidths: { A: 110, B: 100, C: 90, D: 80 } },
        ], { owner: EMAIL.marcus, sharing: { people: [{ email: EMAIL.jordan, role: "Editor" }] } })],
      }),
      tasks: [
        {
          instruction: "Select A1:B6 on the Repairs by Month sheet and insert a chart.",
          hint: "Drag from A1 to B6, then Insert › Chart (or click Insert chart on the toolbar). The chart editor opens on the right.",
          steps: [{ action: { kind: "command", id: "insert.chart" }, requires: { sheet: "Repairs by Month", selection: "A1:B6" }, selectHint: "Select A1:B6 on the Repairs by Month sheet first." }],
        },
        {
          instruction: "Change the chart to a line chart, so the trend over the months shows.",
          hint: "In the chart editor, on the Setup tab, open Chart type and choose Line chart. (Double-click the chart if the editor closed.)",
          steps: [{ action: { kind: "command", id: "chart.type", value: "Line chart" }, requires: { selection: "chart:c1" }, selectHint: "Click the chart first." }],
        },
        {
          instruction: "Give the chart the title “Repair requests by month”.",
          hint: "In the chart editor, click the Customize tab. Under Chart & axis title, type Repair requests by month in Title text and press Enter.",
          steps: [{ action: { kind: "type", target: "chart:c1.title", value: "Repair requests by month" } }],
        },
        {
          instruction: "Go to the Rent Roll sheet and create a pivot table from A1:D13 on a new sheet.",
          hint: "Click the Rent Roll tab and select A1:D13 (or click any cell in the data). Insert › Pivot table, keep New sheet, and click Create.",
          steps: [{ action: { kind: "dialog", id: "g.pivot", values: { insert: "New sheet" } }, requires: { sheet: "Rent Roll" } }],
        },
        {
          instruction: "In the pivot table editor, add Building to Rows.",
          hint: "Next to Rows, click Add and choose Building.",
          steps: [{ action: { kind: "command", id: "pivot.area", value: "Building>Rows" } }],
        },
        {
          instruction: "Add Rent to Values, so the pivot table totals the rent for each building.",
          hint: "Next to Values, click Add and choose Rent. It is summarized with SUM.",
          steps: [{ action: { kind: "command", id: "pivot.area", value: "Rent>Values" } }],
        },
        {
          instruction: "Add Status to Columns, so paid and late rent show side by side.",
          hint: "Next to Columns, click Add and choose Status.",
          steps: [{ action: { kind: "command", id: "pivot.area", value: "Status>Columns" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-4::dropdowns-protection-and-sharing-sheets": [
    {
      id: "gw-m4-protect-share",
      app: "google",
      title: "Make the supply order sheet hard to break",
      scenario:
        "Four people add items to the monthly supply order. Categories get typed in different ways, and someone typed over the Total formulas last month. Add a dropdown and checkboxes, protect the formulas, leave a note, share it with Priya, and download a copy for her accounting system.",
      fileName: "Supply Order - November",
      minutes: 7,
      initial: googleDoc({ ...open1("f1"), ...base, files: [sheetFile("f1", "Supply Order - November", [{ name: "Order", cells: ORDER, colWidths: { A: 170, B: 110, C: 80, D: 90, E: 90, F: 80 } }])] }),
      tasks: [
        {
          instruction: "Add a dropdown to B2:B8 with the options “Cleaning”, “Maintenance”, and “Office”, in that order.",
          hint: "Select B2:B8, then Insert › Dropdown (or Data › Data validation › Add rule). Keep Dropdown as the criteria, type each option in its own box (Add another item gives you a third), and click Done.",
          steps: [{ action: { kind: "dialog", id: "g.validation", values: { range: "B2:B8", criteria: "Dropdown", items: "Cleaning, Maintenance, Office" } } }],
        },
        {
          instruction: "Insert checkboxes in F2:F8, so people can check off what has been ordered.",
          hint: "Select F2:F8, then Insert › Checkbox.",
          steps: [{ action: { kind: "command", id: "g.checkbox" }, requires: { selection: "F2:F8" }, selectHint: "Select F2:F8 first." }],
        },
        {
          instruction: "Protect the Total formulas in E2:E9 so that only you can edit them.",
          hint: "Select E2:E9, then Data › Protect sheets and ranges. Click Add a sheet or range, check the range, click Set permissions, keep Restrict who can edit this range with Only you, and click Done.",
          steps: [{ action: { kind: "dialog", id: "g.protect", values: { range: "E2:E9", mode: "Restrict who can edit this range" } } }],
        },
        {
          instruction: "Add the note “Price went up in October.” to D6.",
          hint: "Right-click D6 › Insert note (or click D6 and press Shift+F2). Type the note and click Done.",
          steps: [{ action: { kind: "type", target: "note:D6", value: "Price went up in October." } }],
        },
        {
          instruction: "Share the spreadsheet with Priya Shah as a Commenter.",
          hint: "Click Share at the top right. Add Priya Shah, change the role to Commenter, and click Send.",
          steps: [{ action: { kind: "dialog", id: "g.share", values: { file: "f1", email: EMAIL.priya, role: "Commenter" } } }],
        },
        {
          instruction: "Download the order sheet as a CSV file for Priya's accounting system.",
          hint: "File › Download › Comma Separated Values (.csv). Only the sheet you are on is downloaded.",
          steps: [{ action: { kind: "command", id: "g.download", value: "Comma Separated Values (.csv)" } }],
        },
      ],
    },
  ],
};
