import type { ExcelCell, ExcelSheet, SimDefinition } from "@/types/sim";
import { DATE, grid, HEAD, MONEY, serial, TITLE } from "./helpers";

/* ------------------------------------------------------------------ */
/* Shared practice data                                                */
/* ------------------------------------------------------------------ */

const ITEMS: [string, string, string, number][] = [
  ["Exam table paper", "Medical", "Medline Industries", 18.5],
  ["Nitrile gloves (M)", "Medical", "McKesson", 7.25],
  ["Alcohol prep pads", "Medical", "Cardinal Health", 4.4],
  ["Copy paper, case", "Office", "Staples Business", 42.99],
  ["Disinfecting wipes", "Cleaning", "Henry Schein", 8.75],
  ["Gauze pads 4x4", "Medical", "McKesson", 9.8],
  ["Specimen cups", "Lab", "Cardinal Health", 22.4],
  ["Toner cartridge", "Office", "Staples Business", 89],
  ["Hand sanitizer 1 L", "Cleaning", "Henry Schein", 12.6],
  ["Sharps container", "Medical", "Medline Industries", 11],
  ["Urine test strips", "Lab", "McKesson", 31.25],
  ["Patient gowns", "Medical", "Medline Industries", 26],
];
const QTY = [12, 30, 20, 6, 15, 18, 10, 2, 8, 6, 4, 10, 24, 30, 25, 5, 12, 20, 8, 3, 10, 5, 6, 12];

/** Q3 supply orders: Date, Item, Category, Vendor, Qty, Unit Cost, Total. */
function q3Orders(): Record<string, ExcelCell> {
  const rows: (string | number)[][] = [["Date", "Item", "Category", "Vendor", "Qty", "Unit Cost", "Total"]];
  for (let i = 0; i < 24; i++) {
    const [item, cat, vendor, cost] = ITEMS[i % ITEMS.length];
    const date = serial(7 + Math.floor(i / 8), 2 + (i % 8) * 3);
    const r = i + 2;
    rows.push([date, item, cat, vendor, QTY[i], cost, `=E${r}*F${r}`]);
  }
  return grid("A1", rows, { header: true, colFmt: { A: DATE, F: MONEY, G: MONEY } });
}

const ORDER_WIDTHS = { A: 78, B: 140, C: 78, D: 128, E: 48, F: 76, G: 82 };

function budgetSheet(): ExcelSheet {
  return {
    name: "Supply Budget",
    colWidths: { A: 170, B: 96, C: 96, D: 90 },
    cells: {
      A1: { v: "Lakeside Medical Associates - Supply Budget", fmt: TITLE },
      ...grid(
        "A3",
        [
          ["Category", "FY26 Actual", "FY27 Budget", "Change"],
          ["Exam room supplies", 18420, 19200, "=C4-B4"],
          ["Gloves and PPE", 9650, 10400, "=C5-B5"],
          ["Paper goods", 1310, 1380, "=C6-B6"],
          ["Lab supplies", 7240, 7600, "=C7-B7"],
          ["Cleaning supplies", 3880, 4000, "=C8-B8"],
          ["Office supplies", 2915, 2800, "=C9-B9"],
          ["Linens and gowns", 4105, 4300, "=C10-B10"],
          ["Vaccine storage", 2230, 2400, "=C11-B11"],
          ["Total", "=SUM(B4:B11)", "=SUM(C4:C11)", "=C12-B12"],
        ],
        { header: true, colFmt: { B: MONEY, C: MONEY, D: MONEY } },
      ),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Module 1                                                            */
/* ------------------------------------------------------------------ */

export const excelModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::getting-started-with-excel": [
    {
      id: "excel-m1-getting-started-1",
      app: "excel",
      title: "Find your way around the supply tracker",
      scenario:
        "You just took over supply tracking at Lakeside Medical Associates. Before you change anything, get comfortable moving around the Q3 Supplies sheet and reading what Excel already tells you.",
      fileName: "Q3 Supply Tracker.xlsx",
      minutes: 4,
      initial: {
        active: "Q3 Supplies",
        sheets: [
          { name: "Q3 Supplies", colWidths: ORDER_WIDTHS, rows: 28, cells: q3Orders() },
          { name: "Notes", colWidths: { A: 320 }, cells: { A1: { v: "Reorder notes", fmt: HEAD }, A2: { v: "Gloves run low by mid-month. Order 30 boxes." } } },
        ],
      },
      tasks: [
        {
          instruction: "Go to cell G25, the last order total on the sheet.",
          hint: "Click the Name Box at the left end of the formula bar, type G25 and press Enter. (Or click G1 and press Ctrl+Down Arrow.)",
          steps: [{ action: { kind: "select", target: "G25" } }],
        },
        {
          instruction: "Jump back to cell A1 using the keyboard.",
          hint: "Press Ctrl+Home. (You can also type A1 in the Name Box.)",
          steps: [{ action: { kind: "select", target: "A1" } }],
        },
        {
          instruction: "Select the order totals in G2:G25 so the status bar shows their sum.",
          hint: "Click G2, then Shift+click G25 (or drag from G2 to G25). Look at Average, Count and Sum at the bottom right.",
          steps: [{ action: { kind: "select", target: "G2:G25" } }],
        },
        {
          instruction: "Switch the worksheet to Page Break Preview.",
          hint: "View tab › Workbook Views group › Page Break Preview (or the Page Break Preview button on the status bar).",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Page Break Preview" } }],
        },
        {
          instruction: "Return the worksheet to Normal view.",
          hint: "View tab › Workbook Views group › Normal (or the Normal button on the status bar).",
          steps: [{ action: { kind: "command", id: "view.mode", value: "Normal" } }],
        },
        {
          instruction: "Set the zoom level to 120%.",
          hint: "View tab › Zoom group › Zoom, type 120 in Custom, OK. (Or drag the zoom slider on the status bar to 120%.)",
          steps: [{ action: { kind: "dialog", id: "zoom", values: { percent: 120 } }, alt: [{ kind: "command", id: "view.zoom", value: "120" }] }],
        },
        {
          instruction: "Use the Search box on the title bar to find and apply the command that keeps row 1 visible while you scroll.",
          hint: "Click Search (Alt+Q), type freeze, and choose Freeze Top Row. (Ribbon path: View tab › Window group › Freeze Panes › Freeze Top Row.)",
          steps: [{ action: { kind: "command", id: "view.freeze", value: "Freeze Top Row" } }],
        },
      ],
    },
  ],

  "module-1::understanding-onedrive-for-excel": [
    {
      id: "excel-m1-onedrive-1",
      app: "excel",
      title: "Move the supply budget to OneDrive",
      scenario:
        "The FY27 supply budget lives only on the front-desk PC. Your supervisor wants it in OneDrive so it keeps version history and the billing office can open it. The budget holds no patient information, so a cloud copy is appropriate.",
      fileName: "Supply Budget.xlsx",
      minutes: 4,
      initial: { active: "Supply Budget", sheets: [budgetSheet()] },
      tasks: [
        {
          instruction: "Save the workbook to OneDrive - Personal with the file name \"Lakeside Supply Budget FY27\".",
          hint: "File tab › Save As › OneDrive - Personal. Type Lakeside Supply Budget FY27 in File name and click Save. (F12 opens Save As.)",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "OneDrive - Personal", name: "Lakeside Supply Budget FY27" } } }],
        },
        {
          instruction: "Turn on AutoSave so every change is saved to OneDrive as you work.",
          hint: "Click the AutoSave switch at the left end of the title bar.",
          steps: [{ action: { kind: "command", id: "qat.autosave" } }],
        },
        {
          instruction: "The paper goods budget was approved at a new amount. Type 1450 in cell C6.",
          hint: "Click C6, type 1450 and press Enter. AutoSave saves the change for you.",
          steps: [{ action: { kind: "type", target: "C6", value: "1450" } }],
        },
        {
          instruction: "Open the workbook's version history to see the earlier versions OneDrive keeps.",
          hint: "File tab › Info › Version History.",
          steps: [{ action: { kind: "command", id: "file.versionHistory" } }],
        },
        {
          instruction: "Share the workbook with the practice manager, dana.whitfield@lakesidemedical.example, so she can edit it.",
          hint: "File tab › Share. Type her address under Invite people, leave the permission at Can edit, and click Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "dana.whitfield@lakesidemedical.example", permission: "Can edit" } } }],
        },
        {
          instruction: "Copy a sharing link you can paste into a message to the billing office.",
          hint: "File tab › Share › Copy link.",
          steps: [{ action: { kind: "command", id: "file.copyLink" } }],
        },
      ],
    },
  ],

  "module-1::creating-and-opening-workbooks": [
    {
      id: "excel-m1-creating-opening-1",
      app: "excel",
      title: "Start the week's workbooks",
      scenario:
        "It is Monday at the Lakeside front desk. A supplier sent this price list in the old .xls format, so it opened in Compatibility Mode. You also need a fresh appointment tracker, a blank workbook for notes, and last quarter's visit log.",
      fileName: "Vendor Price List.xls",
      minutes: 4,
      initial: {
        active: "Price List",
        saved: { name: "Vendor Price List.xls", location: "This PC" },
        sheets: [
          {
            name: "Price List",
            colWidths: { A: 130, B: 150, C: 80, D: 80 },
            cells: grid(
              "A1",
              [
                ["Vendor", "Item", "Catalog #", "Unit Price"],
                ["Medline Industries", "Exam table paper", "NON24327", 18.5],
                ["Medline Industries", "Patient gowns", "NON21420", 26],
                ["McKesson", "Nitrile gloves (M)", "MCK14-6852", 7.25],
                ["McKesson", "Gauze pads 4x4", "MCK16-4252", 9.8],
                ["Cardinal Health", "Alcohol prep pads", "CAR5110", 4.4],
                ["Cardinal Health", "Specimen cups", "CAR2014", 22.4],
                ["Henry Schein", "Disinfecting wipes", "HS112-3366", 8.75],
                ["Henry Schein", "Hand sanitizer 1 L", "HS112-0911", 12.6],
              ],
              { header: true, colFmt: { D: MONEY } },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Convert the price list out of Compatibility Mode: save it on This PC as an Excel Workbook (*.xlsx) named \"Vendor Price List 2026\".",
          hint: "File tab › Save As › This PC. Type the name, set File type to Excel Workbook (*.xlsx), and click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "This PC", name: "Vendor Price List 2026", format: "Excel Workbook (*.xlsx)" } } }],
        },
        {
          instruction: "Create a new workbook from the Appointment tracker template.",
          hint: "File tab › New › Appointment tracker.",
          steps: [
            {
              action: { kind: "command", id: "file.new", value: "Appointment tracker" },
              effects: [
                {
                  op: "set",
                  path: "sheets",
                  value: [
                    {
                      name: "Appointments",
                      colWidths: { A: 90, B: 140, C: 100, D: 160, E: 90 },
                      cells: {
                        A1: { v: "Appointment Tracker", fmt: { bold: true, size: 18, color: "#70AD47" } },
                        A3: { v: "Provider:", fmt: { bold: true } },
                        B3: { v: "Provider Name", fmt: { italic: true, color: "#7F7F7F" } },
                        ...grid("A5", [["Date", "Time", "Patient ID", "Reason", "Status"]], { header: true }),
                      },
                    },
                  ],
                },
                { op: "set", path: "active", value: "Appointments" },
                { op: "set", path: "saved", value: { name: "Appointment tracker1" } },
              ],
            },
          ],
        },
        {
          instruction: "In the new tracker, replace the placeholder in B3 with \"Dr. Amara Okafor\".",
          hint: "Click B3, type Dr. Amara Okafor and press Enter.",
          steps: [{ action: { kind: "type", target: "B3", value: "Dr. Amara Okafor" } }],
        },
        {
          instruction: "Create a new blank workbook for your weekly notes.",
          hint: "File tab › New › Blank workbook (or press Ctrl+N).",
          steps: [
            {
              action: { kind: "command", id: "file.new", value: "Blank workbook" },
              effects: [
                { op: "set", path: "sheets", value: [{ name: "Sheet1", cells: {} }] },
                { op: "set", path: "active", value: "Sheet1" },
                { op: "set", path: "saved", value: { name: "Book1" } },
              ],
            },
          ],
        },
        {
          instruction: "Open the recent workbook \"Patient Visits Q3.xlsx\".",
          hint: "File tab › Open › Recent, then click Patient Visits Q3.xlsx (or File tab › Home › Recent).",
          steps: [
            {
              action: { kind: "command", id: "file.open", value: "Patient Visits Q3.xlsx" },
              effects: [
                {
                  op: "set",
                  path: "sheets",
                  value: [
                    {
                      name: "Visits",
                      colWidths: { A: 80, B: 80, C: 130, D: 120 },
                      cells: grid(
                        "A1",
                        [
                          ["Visit Date", "Patient ID", "Provider", "Visit Type"],
                          [serial(7, 6), "P-10234", "Dr. Amara Okafor", "Annual physical"],
                          [serial(7, 6), "P-10871", "Dr. Luis Reyes", "Follow-up"],
                          [serial(7, 7), "P-11406", "Dr. Hannah Kim", "Sick visit"],
                          [serial(7, 8), "P-10955", "Dr. Amara Okafor", "Vaccination"],
                          [serial(7, 9), "P-11702", "Dr. Luis Reyes", "Annual physical"],
                          [serial(7, 10), "P-10388", "Dr. Hannah Kim", "Follow-up"],
                          [serial(7, 13), "P-11590", "Dr. Amara Okafor", "Sick visit"],
                          [serial(7, 14), "P-10612", "Dr. Luis Reyes", "Lab review"],
                        ],
                        { header: true, colFmt: { A: DATE } },
                      ),
                    },
                  ],
                },
                { op: "set", path: "active", value: "Visits" },
                { op: "set", path: "saved", value: { name: "Patient Visits Q3.xlsx", location: "This PC" } },
              ],
            },
          ],
        },
      ],
    },
  ],

  "module-1::saving-exporting-and-sharing": [
    {
      id: "excel-m1-saving-exporting-1",
      app: "excel",
      title: "Send the quarterly supply summary safely",
      scenario:
        "The practice manager wants the Q3 supply spending summary. The workbook also holds your working notes and the detailed orders, so you will inspect it, export only the summary, and share it the right way.",
      fileName: "Q3 Supply Summary.xlsx",
      minutes: 5,
      initial: {
        active: "Summary",
        sheets: [
          {
            name: "Summary",
            colWidths: { A: 150, B: 86, C: 86, D: 86, E: 92 },
            cells: {
              A1: { v: "Q3 Supply Spending Summary", fmt: TITLE },
              ...grid(
                "A3",
                [
                  ["Category", "July", "August", "September", "Q3 Total"],
                  ["Medical", 4210.4, 3985.15, 4620.8, "=SUM(B4:D4)"],
                  ["Lab", 1180.25, 1402.6, 1255.9, "=SUM(B5:D5)"],
                  ["Office", 642.1, 588.75, 701.3, "=SUM(B6:D6)"],
                  ["Cleaning", 455.8, 498.2, 512.65, "=SUM(B7:D7)"],
                  ["Linens", 310, 295.5, 342.25, "=SUM(B8:D8)"],
                  ["Equipment repair", 0, 1250, 380, "=SUM(B9:D9)"],
                  ["Total", "=SUM(B4:B9)", "=SUM(C4:C9)", "=SUM(D4:D9)", "=SUM(E4:E9)"],
                ],
                { header: true, colFmt: { B: MONEY, C: MONEY, D: MONEY, E: MONEY } },
              ),
              A13: { v: "Working note: vendor rebate still pending. Do not send.", fmt: { italic: true, color: "#C00000" } },
            },
          },
          { name: "Orders", colWidths: ORDER_WIDTHS, cells: q3Orders() },
        ],
      },
      tasks: [
        {
          instruction: "Check the workbook for hidden data and personal information with the Document Inspector.",
          hint: "File tab › Info › Inspect Workbook › Inspect Workbook.",
          steps: [{ action: { kind: "command", id: "file.inspect", value: "Inspect Workbook" } }],
        },
        {
          instruction: "Set the print area of the Summary sheet to A1:E10 so the working note in row 13 is left out.",
          hint: "Select A1:E10. Page Layout tab › Page Setup group › Print Area › Set Print Area.",
          steps: [
            {
              action: { kind: "command", id: "layout.printArea", value: "Set Print Area" },
              requires: { selection: "A1:E10", sheet: "Summary" },
              selectHint: "Select A1:E10 on the Summary sheet first.",
            },
          ],
        },
        {
          instruction: "Export the summary as a PDF named \"Q3 Supply Summary\".",
          hint: "File tab › Export › Create PDF/XPS Document. Check the file name and click Create PDF/XPS.",
          steps: [{ action: { kind: "dialog", id: "file.exportPdf", values: { name: "Q3 Supply Summary" } } }],
        },
        {
          instruction: "Save a copy for the billing system on This PC as CSV (Comma delimited) named \"Q3 Supply Summary Data\".",
          hint: "File tab › Save As › This PC. Type the name, set File type to CSV (Comma delimited) (*.csv), and click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "This PC", name: "Q3 Supply Summary Data", format: "CSV (Comma delimited) (*.csv)" } } }],
        },
        {
          instruction: "Save the workbook again as an Excel Workbook named \"Q3 Supply Summary\" in OneDrive - Personal, so it can be shared.",
          hint: "File tab › Save As › OneDrive - Personal. Type the name, set File type to Excel Workbook (*.xlsx), and click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "OneDrive - Personal", name: "Q3 Supply Summary", format: "Excel Workbook (*.xlsx)" } } }],
        },
        {
          instruction: "Share the workbook with marcus.bell@lakesidemedical.example so he can view it but not edit it.",
          hint: "File tab › Share. Type his address, change the permission to Can view, and click Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "marcus.bell@lakesidemedical.example", permission: "Can view" } } }],
        },
      ],
    },
  ],
};
