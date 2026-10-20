import type { SimDefinition } from "@/types/sim";
import { colCells, fmtOnly, grid, MONEY } from "./helpers";

/* ------------------------------------------------------------------ */
/* Practice data                                                       */
/* ------------------------------------------------------------------ */

const SUPPLIES: [string, string, number, number, number][] = [
  ["Nitrile gloves (M)", "Medical", 8, 10, 7.25],
  ["Exam table paper", "Medical", 14, 6, 18.5],
  ["Specimen cups", "Lab", 22, 8, 22.4],
  ["Copy paper, case", "Office", 4, 3, 42.99],
  ["Sharps container", "Medical", 3, 4, 11],
  ["Disinfecting wipes", "Cleaning", 18, 12, 8.75],
  ["Urine test strips", "Lab", 2, 4, 31.25],
  ["Toner cartridge", "Office", 1, 2, 89],
  ["Gauze pads 4x4", "Medical", 15, 8, 9.8],
  ["Hand sanitizer 1 L", "Cleaning", 5, 6, 12.6],
  ["Blood collection tubes", "Lab", 60, 25, 6.5],
  ["Patient gowns", "Medical", 30, 20, 26],
  ["Printer labels", "Office", 9, 4, 8.5],
  ["Floor cleaner", "Cleaning", 7, 3, 14.6],
  ["Pipette tips", "Lab", 11, 5, 19.35],
];

const PRICE_LIST: [string, string, number][] = [
  ["McKesson", "Nitrile gloves (M)", 7.25],
  ["Medline Industries", "Exam table paper", 18.5],
  ["Cardinal Health", "Specimen cups", 22.4],
  ["Staples Business", "Copy paper, case", 42.99],
  ["Medline Industries", "Sharps container", 11],
  ["Henry Schein", "Disinfecting wipes", 8.75],
  ["McKesson", "Urine test strips", 31.25],
  ["Henry Schein", "Exam gloves (L)", 8.1],
  ["McKesson", "Gauze pads 4x4", 9.8],
  ["Henry Schein", "Hand sanitizer 1 L", 12.6],
  ["Medline Industries", "Blood collection tubes", 6.5],
  ["Medline Industries", "Patient gowns", 26],
  ["Cardinal Health", "Alcohol prep pads", 4.4],
  ["Staples Business", "Toner cartridge", 89],
];

/* ------------------------------------------------------------------ */
/* Module 8                                                            */
/* ------------------------------------------------------------------ */

export const excelModule8Sims: Record<string, SimDefinition[]> = {
  "module-8::dynamic-arrays-and-xlookup": [
    {
      id: "excel-m8-dynamic-arrays-1",
      app: "excel",
      title: "Build a live reorder list",
      scenario:
        "Your supervisor wants a list of every supply below its reorder level, sorted by category, that updates itself. One dynamic array formula can do it, as long as nothing blocks the cells it spills into.",
      fileName: "Supply Tracker.xlsx",
      minutes: 5,
      initial: {
        active: "Supplies",
        sheets: [
          {
            name: "Supplies",
            cols: 11,
            colWidths: { A: 150, B: 70, C: 64, D: 92, E: 72, F: 24, G: 90, H: 24, I: 150, J: 80 },
            cells: {
              ...grid("A1", [["Item", "Category", "On Hand", "Reorder Level", "Unit Cost"], ...SUPPLIES], { header: true, colFmt: { E: MONEY } }),
              G1: { v: "Categories", fmt: { bold: true, fill: "#E2EFDA" } },
              I1: { v: "Reorder List", fmt: { bold: true, fill: "#E2EFDA" } },
              J1: { v: "Category", fmt: { bold: true, fill: "#E2EFDA" } },
              J5: { v: "check", fmt: { italic: true, color: "#7F7F7F" } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In G2, list every distinct category from B2:B16 with one formula.",
          hint: "Click G2 and type =UNIQUE(B2:B16), then press Enter. The results spill down automatically.",
          steps: [{ action: { kind: "type", target: "G2", value: "=UNIQUE(B2:B16)", match: "formula" } }],
        },
        {
          instruction: "In I2, use FILTER to list the item and category (A2:B16) for every row where On Hand (C2:C16) is less than the Reorder Level (D2:D16). Show \"None\" if nothing matches.",
          hint: "Click I2 and type =FILTER(A2:B16,C2:C16<D2:D16,\"None\"), then press Enter.",
          steps: [{ action: { kind: "type", target: "I2", value: '=FILTER(A2:B16,C2:C16<D2:D16,"None")', match: "formula" } }],
        },
        {
          instruction: "I2 shows #SPILL! because a stray note in J5 is in the way. Clear J5.",
          hint: "Click J5 and press Delete (or Home tab › Editing group › Clear › Clear Contents).",
          steps: [
            {
              action: { kind: "command", id: "edit.clearContents" },
              alt: [{ kind: "command", id: "home.clear", value: "Clear Contents" }, { kind: "command", id: "home.clear", value: "Clear All" }],
              requires: { selection: "J5" },
              selectHint: "Click J5, the cell blocking the spill range.",
            },
          ],
        },
        {
          instruction: "Wrap the formula in I2 in SORT so the list is ordered by its second column (Category), A to Z: =SORT(FILTER(A2:B16,C2:C16<D2:D16,\"None\"),2,1).",
          hint: "Click I2 and type =SORT(FILTER(A2:B16,C2:C16<D2:D16,\"None\"),2,1), then press Enter.",
          steps: [
            {
              action: {
                kind: "type",
                target: "I2",
                value: ['=SORT(FILTER(A2:B16,C2:C16<D2:D16,"None"),2,1)', '=SORT(FILTER(A2:B16,C2:C16<D2:D16,"None"),2)'],
                match: "formula",
              },
            },
          ],
        },
      ],
    },
    {
      id: "excel-m8-xlookup-1",
      app: "excel",
      title: "Look up prices and vendors with XLOOKUP",
      scenario:
        "You are filling in this week's order form. The price list has the vendor to the left of each item, which VLOOKUP cannot reach, so use XLOOKUP. The names Items, Prices and Vendors already point at the Price List columns.",
      fileName: "Weekly Order Form.xlsx",
      minutes: 5,
      initial: {
        active: "Order Form",
        names: { Vendors: "'Price List'!$A$2:$A$15", Items: "'Price List'!$B$2:$B$15", Prices: "'Price List'!$C$2:$C$15" },
        sheets: [
          {
            name: "Order Form",
            colWidths: { A: 160, B: 44, C: 84, D: 130 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Item", "Qty", "Unit Cost", "Vendor"],
                  ["Nitrile gloves (M)", 30],
                  ["Specimen cups", 10],
                  ["Patient gowns", 10],
                  ["Hand sanitizer 1 L", 8],
                  ["Exam glovs (L)", 12],
                  ["Toner cartridge", 2],
                  ["Alcohol prep pads", 20],
                ],
                { header: true },
              ),
              ...fmtOnly("C2:C8", MONEY),
            },
          },
          {
            name: "Price List",
            colWidths: { A: 130, B: 160, C: 80 },
            cells: grid("A1", [["Vendor", "Item", "Unit Cost"], ...PRICE_LIST], { header: true, colFmt: { C: MONEY } }),
          },
        ],
      },
      tasks: [
        {
          instruction: "In C2, look up the unit cost of the item in A2: =XLOOKUP(A2,Items,Prices,\"Not found\").",
          hint: "Click C2 and type =XLOOKUP(A2,Items,Prices,\"Not found\"), then press Enter. The fourth argument is what shows when there is no match.",
          steps: [{ action: { kind: "type", target: "C2", value: '=XLOOKUP(A2,Items,Prices,"Not found")', match: "formula" } }],
        },
        {
          instruction: "Copy the formula in C2 down through C8.",
          hint: "Select C2 and double-click the fill handle (or drag it down to C8).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "C2:C8" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["C2", "C2:C8"] },
              selectHint: "Start from C2 (or select C2:C8 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "In D2, look up the vendor, which sits to the left of the item on the price list: =XLOOKUP(A2,Items,Vendors,\"Not found\").",
          hint: "Click D2 and type =XLOOKUP(A2,Items,Vendors,\"Not found\"), then press Enter.",
          steps: [{ action: { kind: "type", target: "D2", value: '=XLOOKUP(A2,Items,Vendors,"Not found")', match: "formula" } }],
        },
        {
          instruction: "Copy the formula in D2 down through D8.",
          hint: "Select D2 and double-click the fill handle (or drag it down to D8).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "D2:D8" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["D2", "D2:D8"] },
              selectHint: "Start from D2 (or select D2:D8 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "Row 6 shows \"Not found\" because of a typo. Correct A6 to \"Exam gloves (L)\".",
          hint: "Click A6, type Exam gloves (L) and press Enter. Both lookups in row 6 fill in.",
          steps: [{ action: { kind: "type", target: "A6", value: "Exam gloves (L)" } }],
        },
      ],
    },
  ],

  "module-8::intelligent-services-and-data-types": [
    {
      id: "excel-m8-data-types-1",
      app: "excel",
      title: "Add facts about the practice locations",
      scenario:
        "For the facilities report you need the population of each city where Lakeside has a site, and a quick chart of visits by site. Linked data types and Analyze Data can do both, as long as you check what they return.",
      fileName: "Facilities Report.xlsx",
      minutes: 5,
      initial: {
        active: "Locations",
        sheets: [
          {
            name: "Locations",
            colWidths: { A: 110, B: 96, C: 140 },
            cells: {
              ...grid("A1", [["City", "Population", "Practice Site"], ["Albany", null, "Lakeside Capital Region"], ["Buffalo", null, "Lakeside Western NY"], ["Rochester", null, "Lakeside Finger Lakes"]], { header: true }),
              ...fmtOnly("B2:B4", { numFmt: "Comma", decimals: 0 }),
            },
          },
          {
            name: "Visits",
            colWidths: { A: 96, B: 64, C: 64 },
            cells: grid(
              "A1",
              [
                ["Site", "Month", "Visits"],
                ["Albany", "Jul", 1240],
                ["Buffalo", "Jul", 1685],
                ["Rochester", "Jul", 1402],
                ["Albany", "Aug", 1198],
                ["Buffalo", "Aug", 1730],
                ["Rochester", "Aug", 1366],
                ["Albany", "Sep", 1311],
                ["Buffalo", "Sep", 1652],
                ["Rochester", "Sep", 1429],
                ["Albany", "Oct", 1287],
                ["Buffalo", "Oct", 1704],
                ["Rochester", "Oct", 1455],
              ],
              { header: true },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Convert the city names in A2:A4 to the Geography data type.",
          hint: "Select A2:A4. Data tab › Data Types group › Geography. A map icon appears in each cell.",
          steps: [{ action: { kind: "command", id: "data.geography" }, requires: { selection: "A2:A4" }, selectHint: "Select the city names, A2:A4, first." }],
        },
        {
          instruction: "In B2, pull the population from the data type with the formula =A2.Population.",
          hint: "Click B2 and type =A2.Population, then press Enter.",
          steps: [{ action: { kind: "type", target: "B2", value: "=A2.Population", match: "formula" } }],
        },
        {
          instruction: "Copy the formula in B2 down through B4.",
          hint: "Select B2 and double-click the fill handle (or drag it down to B4).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "B2:B4" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["B2", "B2:B4"] },
              selectHint: "Start from B2 (or select B2:B4 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "On the Visits sheet, click a cell in the table and open Analyze Data.",
          hint: "Click the Visits tab and any cell in A1:C13. Home tab › Analysis group › Analyze Data.",
          steps: [
            {
              action: { kind: "command", id: "home.analyzeData" },
              requires: { sheet: "Visits", selection: ["A1:C13", ...colCells("A", 1, 13), ...colCells("B", 1, 13), ...colCells("C", 1, 13)] },
              selectHint: "Click a cell inside the Visits table first.",
            },
          ],
        },
        {
          instruction: "Insert the suggested PivotChart titled 'Visits' by 'Site'.",
          hint: "In the Analyze Data pane, find 'Visits' by 'Site' and click Insert PivotChart.",
          steps: [
            {
              action: { kind: "command", id: "analyze.insert", value: "'Visits' by 'Site'" },
              requires: { sheet: "Visits", selection: ["A1:C13", ...colCells("A", 1, 13), ...colCells("B", 1, 13), ...colCells("C", 1, 13)] },
              selectHint: "Keep a cell inside the Visits table selected so Analyze Data can read it.",
            },
          ],
        },
      ],
    },
  ],

  "module-8::icons-drawing-and-collaboration": [
    {
      id: "excel-m8-icons-1",
      app: "excel",
      title: "Make the quarterly summary readable",
      scenario:
        "The Q3 supply summary is correct but hard to scan. Add a status column that does the real work, then one icon, with alt text, to point the practice manager at it.",
      fileName: "Q3 Supply Summary.xlsx",
      minutes: 4,
      initial: {
        active: "Q3 Summary",
        sheets: [
          {
            name: "Q3 Summary",
            colWidths: { A: 150, B: 90, C: 90, D: 64, E: 52 },
            cells: grid(
              "A1",
              [
                ["Category", "Q3 Spend", "Budget", "Status"],
                ["Medical Supplies", 14540, 13500],
                ["Lab Supplies", 3860, 4200],
                ["Office Supplies", 1950, 2100],
                ["Cleaning", 1510, 1400],
                ["Linens", 945, 1000],
                ["Vaccine Storage", 610, 650],
                ["Equipment Repair", 1630, 1200],
              ],
              { header: true, colFmt: { B: MONEY, C: MONEY } },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "In D2, enter a formula that shows \"Over\" when Q3 Spend (B2) is greater than the Budget (C2), and \"OK\" otherwise.",
          hint: "Click D2 and type =IF(B2>C2,\"Over\",\"OK\"), then press Enter.",
          steps: [
            {
              action: { kind: "type", target: "D2", value: ['=IF(B2>C2,"Over","OK")', '=IF(C2<B2,"Over","OK")', '=IF(B2<=C2,"OK","Over")'], match: "formula" },
            },
          ],
        },
        {
          instruction: "Copy the formula in D2 down through D8.",
          hint: "Select D2 and double-click the fill handle (or drag it down to D8).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "D2:D8" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["D2", "D2:D8"] },
              selectHint: "Start from D2 (or select D2:D8 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "Click E1 and insert the Warning icon next to the Status header.",
          hint: "Click E1. Insert tab › Illustrations group › Icons. Search or scroll to Warning, select it, and click Insert.",
          steps: [
            {
              action: { kind: "dialog", id: "insertIcons", values: { icon: "Warning" } },
              requires: { selection: "E1" },
              selectHint: "Click E1 first: the icon is placed at the active cell.",
            },
          ],
        },
        {
          instruction: "Give the icon the alt text \"Over budget warning\".",
          hint: "With the icon selected, Graphics Format tab › Accessibility group › Alt Text. Type the description, OK.",
          steps: [{ action: { kind: "dialog", id: "altText", values: { text: "Over budget warning" } } }],
        },
        {
          instruction: "Recolor the icon Dark Red (Standard Colors).",
          hint: "With the icon selected, Graphics Format tab › Graphics Styles group › Graphics Fill › Dark Red.",
          steps: [{ action: { kind: "command", id: "graphics.fill", value: "#C00000" } }],
        },
      ],
    },
    {
      id: "excel-m8-coauthoring-1",
      app: "excel",
      title: "Share the summary for co-authoring",
      scenario:
        "Lena from the billing office will edit the Q3 summary with you. Put it in OneDrive so AutoSave and co-authoring work, share it, and use a Sheet View so your sorting does not rearrange her screen.",
      fileName: "Q3 Supply Summary.xlsx",
      minutes: 5,
      initial: {
        active: "Q3 Summary",
        sheets: [
          {
            name: "Q3 Summary",
            colWidths: { A: 150, B: 90, C: 90, D: 64 },
            cells: grid(
              "A1",
              [
                ["Category", "Q3 Spend", "Budget", "Status"],
                ["Medical Supplies", 14540, 13500, "=IF(B2>C2,\"Over\",\"OK\")"],
                ["Lab Supplies", 3860, 4200, "=IF(B3>C3,\"Over\",\"OK\")"],
                ["Office Supplies", 1950, 2100, "=IF(B4>C4,\"Over\",\"OK\")"],
                ["Cleaning", 1510, 1400, "=IF(B5>C5,\"Over\",\"OK\")"],
                ["Linens", 945, 1000, "=IF(B6>C6,\"Over\",\"OK\")"],
                ["Vaccine Storage", 610, 650, "=IF(B7>C7,\"Over\",\"OK\")"],
                ["Equipment Repair", 1630, 1200, "=IF(B8>C8,\"Over\",\"OK\")"],
              ],
              { header: true, colFmt: { B: MONEY, C: MONEY } },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Save the workbook to OneDrive - Personal as \"Q3 Supply Summary\".",
          hint: "File tab › Save As › OneDrive - Personal. Keep the name Q3 Supply Summary and click Save.",
          steps: [{ action: { kind: "dialog", id: "file.saveAs", values: { location: "OneDrive - Personal", name: "Q3 Supply Summary" } } }],
        },
        {
          instruction: "Turn on AutoSave, which co-authoring needs.",
          hint: "Click the AutoSave switch at the left end of the title bar.",
          steps: [{ action: { kind: "command", id: "qat.autosave" } }],
        },
        {
          instruction: "Share the workbook with lena.ortiz@lakesidemedical.example as an editor.",
          hint: "File tab › Share. Type her address, keep Can edit, and click Send.",
          steps: [{ action: { kind: "dialog", id: "file.share", values: { email: "lena.ortiz@lakesidemedical.example", permission: "Can edit" } } }],
        },
        {
          instruction: "Start a new Sheet View so your sorting and filtering stay private.",
          hint: "View tab › Sheet View group › New.",
          steps: [{ action: { kind: "command", id: "view.sheetViewNew" } }],
        },
        {
          instruction: "In your Sheet View, sort the summary by Category from A to Z.",
          hint: "Click any cell in the Category column. Data tab › Sort & Filter group › Sort A to Z.",
          steps: [{ action: { kind: "command", id: "data.sortAsc" }, requires: { selection: colCells("A", 1, 8) }, selectHint: "Click one cell in the Category column first." }],
        },
        {
          instruction: "Exit the Sheet View and return to the default view everyone shares.",
          hint: "View tab › Sheet View group › Exit.",
          steps: [{ action: { kind: "command", id: "view.sheetViewExit" } }],
        },
        {
          instruction: "Open Version History, the place to recover the file if a shared edit goes wrong.",
          hint: "File tab › Info › Version History.",
          steps: [{ action: { kind: "command", id: "file.versionHistory" } }],
        },
      ],
    },
  ],
};
