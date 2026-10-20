import type { SimDefinition } from "@/types/sim";
import { colCells, DATE, fmtOnly, grid, MONEY, serial } from "@/lib/sims/excel/helpers";

/**
 * modern-office sims that run in the Excel engine. Keys are "<moduleSlug>::<lessonSlug>".
 *
 * Module 10 (Document & Data Workflows) of the Modern Office course, set at
 * TOR Tech, a small technology services company. All clients, vendors and
 * staff are fictional.
 */

/** TOR Tech client list from the sticky note: name, phone, contract start date, contract value. */
const CLIENTS: [string, string, number, number][] = [
  ["Harborview Dental Group", "555-0142", serial(3, 15, 2025), 18500],
  ["Pinecrest Realty", "555-0178", serial(9, 1, 2024), 7200],
  ["Cobalt Bakery and Cafe", "555-0119", serial(1, 8, 2026), 3600],
  ["Meridian Family Law", "555-0164", serial(6, 22, 2025), 12400],
  ["Northgate Auto Repair", "555-0131", serial(11, 3, 2024), 5400],
  ["Silverline Accounting", "555-0187", serial(4, 30, 2026), 9800],
  ["Brightpath Tutoring", "555-0153", serial(2, 12, 2025), 4200],
  ["Redwood Veterinary Clinic", "555-0126", serial(8, 19, 2025), 15600],
  ["Lakeside Print Shop", "555-0195", serial(12, 1, 2025), 2900],
  ["Summit Physical Therapy", "555-0108", serial(7, 7, 2024), 11300],
];

/** TOR Tech office supply orders: item, quantity, cost per unit, date ordered, status. */
const ORDERS: [string, number, number, number, string | null][] = [
  ["Printer paper ream", 10, 6.49, serial(10, 1), "Received"],
  ["Black toner cartridge", 2, 84.99, serial(10, 2), "Ordered"],
  ["Ethernet cables, 10 ft", 12, 7.25, serial(10, 5), "Received"],
  ["Wireless mouse", 6, 18.5, serial(10, 7), "Out of Stock"],
  ["USB-C chargers", 4, 29.99, serial(10, 9), "Ordered"],
  ["Sticky notes, 12 pack", 3, 8.25, serial(10, 12), "Received"],
  ["Label maker tape", 5, 11.4, serial(10, 14), "Out of Stock"],
  ["Monitor cleaning kit", 4, 9.95, serial(10, 15), null],
];

export const excelSims: Record<string, SimDefinition[]> = {
  "module-10::spreadsheet-basics": [
    {
      id: "mo-excel-basics-1",
      app: "excel",
      title: "Turn the sticky-note client list into a spreadsheet",
      scenario:
        "Your manager at TOR Tech handed you a sticky note of client contracts and asked for a spreadsheet sorted by date. The data is typed in. Now make it readable, sort it, and add a client count, an average and a total that update by themselves.",
      fileName: "TOR Tech Clients.xlsx",
      minutes: 6,
      initial: {
        active: "Clients",
        sheets: [
          {
            name: "Clients",
            colWidths: { A: 120, B: 96, C: 120, D: 104 },
            cells: {
              ...grid("A1", [["Client Name", "Phone Number", "Contract Start Date", "Contract Value"], ...CLIENTS], { header: true, headerFmt: {} }),
              A13: { v: "Total Clients:", fmt: { bold: true } },
              A14: { v: "Average Contract Value:", fmt: { bold: true } },
              A15: { v: "Total Contract Value:", fmt: { bold: true } },
              ...fmtOnly("B14:B15", MONEY),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Make the header row A1:D1 stand out: bold it and give it the Blue, Accent 5 fill color (Theme Colors).",
          hint: "Select A1:D1. Home tab › Font group › Bold (Ctrl+B), then Fill Color arrow › Blue, Accent 5.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "command", id: "home.bold" },
              alt: [{ kind: "dialog", id: "formatCells", values: { bold: true } }],
              requires: { selection: ["A1:D1", "1:1"] },
              selectHint: "Select the header row, A1:D1, first.",
            },
            {
              action: { kind: "command", id: "home.fill", value: "#5B9BD5" },
              alt: [{ kind: "dialog", id: "formatCells", values: { fill: "#5B9BD5" } }],
              requires: { selection: ["A1:D1", "1:1"] },
              selectHint: "Select the header row, A1:D1, first.",
            },
          ],
        },
        {
          instruction: "Freeze the header row so it stays visible as the list grows.",
          hint: "View tab › Window group › Freeze Panes › Freeze Top Row.",
          steps: [{ action: { kind: "command", id: "view.freeze", value: "Freeze Top Row" } }],
        },
        {
          instruction: "The contract dates in C2:C11 show as numbers. Format them as Short Date.",
          hint: "Select C2:C11. Home tab › Number group › Number Format box › Short Date.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Short Date" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Short Date" } }],
              requires: { selection: "C2:C11" },
              selectHint: "Select the dates in C2:C11 first.",
            },
          ],
        },
        {
          instruction: "Format the contract values in D2:D11 as Currency.",
          hint: "Select D2:D11. Home tab › Number group › Number Format box › Currency (or Ctrl+Shift+$).",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Currency" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Currency" } }],
              requires: { selection: "D2:D11" },
              selectHint: "Select the contract values in D2:D11 first.",
            },
          ],
        },
        {
          instruction: "AutoFit column A so every client name fits.",
          hint: "Click the column A header. Home tab › Cells group › Format › AutoFit Column Width.",
          steps: [
            {
              action: { kind: "command", id: "home.format", value: "AutoFit Column Width" },
              requires: { selection: ["A:A", "A1:A11", "A2:A11"] },
              selectHint: "Click the column A header first.",
            },
          ],
        },
        {
          instruction: "Sort the clients by Contract Start Date from earliest to latest, keeping each client's row together.",
          hint: "Click one cell in the Contract Start Date column (not the whole column). Data tab › Sort & Filter group › Sort Oldest to Newest (Sort A to Z). Or Data tab › Sort, Sort by Contract Start Date, Smallest to Largest.",
          steps: [
            {
              action: { kind: "command", id: "data.sortAsc" },
              alt: [{ kind: "dialog", id: "sort", values: { sortBy: "Contract Start Date", order: "Smallest to Largest" } }],
              requires: { selection: colCells("C", 1, 11) },
              selectHint: "Click a single cell in the Contract Start Date column. Selecting only the column would scramble the records.",
            },
          ],
        },
        {
          instruction: "In B13, count the clients with =COUNT(C2:C11), which counts the cells in the date column that hold a value.",
          hint: "Click B13, type =COUNT(C2:C11) and press Enter.",
          steps: [
            {
              action: { kind: "type", target: "B13", value: "=COUNT(C2:C11)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "COUNT", args: "C2:C11" } }],
              requires: { selection: "B13" },
              selectHint: "Click B13 first.",
            },
          ],
        },
        {
          instruction: "In B14, enter =AVERAGE(D2:D11), and in B15 enter =SUM(D2:D11).",
          hint: "Click B14, type =AVERAGE(D2:D11), Enter. Then in B15 type =SUM(D2:D11), Enter. Both read whatever is in D2:D11, so they update when a value changes.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "type", target: "B14", value: "=AVERAGE(D2:D11)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "AVERAGE", args: "D2:D11" } }],
              requires: { selection: "B14" },
              selectHint: "Click B14 first.",
            },
            {
              action: { kind: "type", target: "B15", value: "=SUM(D2:D11)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "SUM", args: "D2:D11" } }],
              requires: { selection: "B15" },
              selectHint: "Click B15 first.",
            },
          ],
        },
      ],
    },
  ],

  "module-10::build-tracking-sheet": [
    {
      id: "mo-excel-tracker-1",
      app: "excel",
      title: "Build TOR Tech's supply order tracker",
      scenario:
        "TOR Tech needs a supply order tracker the whole team can use without breaking it. The orders are typed in. Finish the structure, lock the Status column to a drop-down list, add a total, make the status visible at a glance, and document the columns on a Notes tab.",
      fileName: "Office Supply Tracker.xlsx",
      minutes: 7,
      initial: {
        active: "Tracker",
        sheets: [
          {
            name: "Tracker",
            colWidths: { A: 160, B: 70, C: 96, D: 96, E: 96 },
            cells: {
              ...grid("A1", [["Item Name", "Quantity", "Cost Per Unit", "Date Ordered", null], ...ORDERS], { header: true, colFmt: { D: DATE } }),
              E1: { fmt: { bold: true, fill: "#D9E1F2", border: "bottom" } },
              C10: { fmt: { numFmt: "Currency", bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Finish the header row: type \"Status\" in E1, then freeze the top row.",
          hint: "Click E1, type Status and press Enter. Then View tab › Window group › Freeze Panes › Freeze Top Row.",
          steps: [{ action: { kind: "type", target: "E1", value: "Status" } }, { action: { kind: "command", id: "view.freeze", value: "Freeze Top Row" } }],
        },
        {
          instruction: "Format the costs in C2:C9 as Currency.",
          hint: "Select C2:C9. Home tab › Number group › Number Format box › Currency.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Currency" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Currency" } }],
              requires: { selection: ["C2:C9", "C2:C10"] },
              selectHint: "Select the costs in C2:C9 first.",
            },
          ],
        },
        {
          instruction: "Limit the Status cells E2:E9 to a drop-down list: Ordered, Received, Out of Stock.",
          hint: "Select E2:E9. Data tab › Data Tools group › Data Validation. Allow: List. Source: Ordered,Received,Out of Stock. OK.",
          steps: [
            {
              action: { kind: "dialog", id: "dataValidation", values: { allow: "List", source: ["Ordered,Received,Out of Stock", "Ordered, Received, Out of Stock"] } },
              requires: { selection: "E2:E9" },
              selectHint: "Select the Status cells, E2:E9, first.",
            },
          ],
        },
        {
          instruction: "The monitor cleaning kits arrived. Use the drop-down in E9 to set the status to Received.",
          hint: "Click E9, click the drop-down arrow that appears beside it, and choose Received.",
          steps: [{ action: { kind: "type", target: "E9", value: "Received" } }],
        },
        {
          instruction: "Type the label \"Total Cost:\" in B10, then total the Cost Per Unit column in C10 with =SUM(C2:C9).",
          hint: "Click B10, type Total Cost: and press Enter. Click C10, type =SUM(C2:C9) and press Enter (or use AutoSum).",
          steps: [
            { action: { kind: "type", target: "B10", value: "Total Cost:" } },
            {
              action: { kind: "type", target: "C10", value: "=SUM(C2:C9)", match: "formula" },
              alt: [{ kind: "command", id: "home.autosum", value: "Sum" }],
              requires: { selection: "C10" },
              selectHint: "Click C10 first.",
            },
          ],
        },
        {
          instruction: "Color the statuses in E2:E9: cells equal to \"Out of Stock\" get Light Red Fill, and cells equal to \"Received\" get Green Fill with Dark Green Text.",
          hint: "Select E2:E9. Home tab › Conditional Formatting › Highlight Cells Rules › Equal To. Type Out of Stock, choose Light Red Fill, OK. Repeat with Received and Green Fill with Dark Green Text.",
          anyOrder: true,
          steps: [
            {
              action: { kind: "dialog", id: "cfEqual", values: { value: "Out of Stock", format: "Light Red Fill" } },
              alt: [{ kind: "dialog", id: "cfText", values: { text: "Out of Stock", format: "Light Red Fill" } }],
              requires: { selection: "E2:E9" },
              selectHint: "Select the Status cells, E2:E9, first.",
            },
            {
              action: { kind: "dialog", id: "cfEqual", values: { value: "Received", format: "Green Fill with Dark Green Text" } },
              alt: [{ kind: "dialog", id: "cfText", values: { text: "Received", format: "Green Fill with Dark Green Text" } }],
              requires: { selection: "E2:E9" },
              selectHint: "Select the Status cells, E2:E9, first.",
            },
          ],
        },
        {
          instruction: "Add a second sheet after Tracker and name it \"Notes\".",
          hint: "Click New sheet (+) to the right of the Tracker tab. Double-click the new Sheet2 tab, type Notes and press Enter.",
          steps: [
            { action: { kind: "command", id: "sheet.add" }, requires: { sheet: "Tracker" }, selectHint: "Click the Tracker tab first: the new sheet is added after the active sheet." },
            { action: { kind: "type", target: "sheet:Sheet2", value: "Notes" } },
          ],
        },
        {
          instruction: "Start the data dictionary: in A1 on the Notes sheet, type \"Status: choose Ordered, Received or Out of Stock from the drop-down.\"",
          hint: "On the Notes sheet, click A1, type the sentence and press Enter.",
          steps: [
            {
              action: { kind: "type", target: "A1", value: "Status: choose Ordered, Received or Out of Stock from the drop-down.", match: "includes" },
              requires: { sheet: "Notes" },
              selectHint: "Work on the Notes sheet.",
            },
          ],
        },
      ],
    },
  ],
};
