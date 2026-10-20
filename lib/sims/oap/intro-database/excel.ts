import type { ExcelCell, SimDefinition, SimStep } from "@/types/sim";
import { cells, colCells, DATE, fmtOnly, grid, MONEY, serial, TITLE } from "@/lib/sims/excel/helpers";

/**
 * intro-database sims that run in the Excel engine. Keys are "<moduleSlug>::<lessonSlug>".
 *
 * Module 2 (Excel as a Data Tool) of Introduction to Databases, set at
 * Lakeside Medical Associates. The appointment data here is its own and is
 * not shared with the ms-office Excel sims. All patients and staff are
 * fictional.
 */

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const inData = (range: string): string[] => [range, ...cells(range)];

/** Fill handle from `src` to `range`; Ctrl+D counts only with the whole range selected. */
function fill(src: string, range: string, sheet?: string): SimStep {
  const sh = sheet ? { sheet } : {};
  return {
    action: { kind: "command", id: "excel.fill", value: range },
    alt: [{ kind: "command", id: "home.fillSeries", value: "Down", requires: { selection: range, ...sh } }],
    requires: { selection: src, ...sh },
    selectHint: `Select ${src} first (or select ${range} for Ctrl+D).`,
  };
}

/* ------------------------------------------------------------------ */
/* Practice data                                                       */
/* ------------------------------------------------------------------ */

/** Appointment records for the sort and filter sim: ID, last, first, provider, date, visit type, plan. */
const APPTS: [number, string, string, string, number, string, string][] = [
  [4201, "Alvarado", "Rosa", "Dr. Nguyen", serial(5, 18), "Follow-Up", "Aetna"],
  [4202, "Brennan", "Liam", "Dr. Walsh", serial(5, 4), "New Patient", "BlueCross PPO"],
  [4203, "Castillo", "Marisol", "Dr. Haddad", serial(5, 12), "Annual Physical", "Medicaid"],
  [4204, "Dimitrov", "Pavel", "Dr. Walsh", serial(5, 21), "Follow-Up", "BlueCross HMO"],
  [4205, "Eze", "Adaeze", "Dr. Nguyen", serial(5, 6), "New Patient", "Self-pay"],
  [4206, "Fischer", "Hanna", "Dr. Walsh", serial(5, 27), "New Patient", "Aetna"],
  [4207, "Gutierrez", "Mateo", "Dr. Haddad", serial(5, 5), "Sick Visit", "BlueCross PPO"],
  [4208, "Holloway", "Dana", "Dr. Walsh", serial(5, 13), "Annual Physical", "Medicaid"],
  [4209, "Iwasaki", "Ren", "Dr. Nguyen", serial(5, 26), "Sick Visit", "BlueCross HMO"],
  [4210, "Jovanovic", "Mila", "Dr. Haddad", serial(5, 19), "New Patient", "Aetna"],
  [4211, "Kaur", "Simran", "Dr. Walsh", serial(5, 7), "Follow-Up", "Self-pay"],
  [4212, "Lindgren", "Oskar", "Dr. Nguyen", serial(5, 11), "Annual Physical", "BlueCross PPO"],
  [4213, "Mbeki", "Thandi", "Dr. Walsh", serial(5, 20), "New Patient", "BlueCross PPO"],
  [4214, "Novak", "Jana", "Dr. Haddad", serial(5, 28), "Follow-Up", "Medicaid"],
  [4215, "Oduya", "Femi", "Dr. Nguyen", serial(5, 14), "New Patient", "Aetna"],
  [4216, "Pereira", "Lucas", "Dr. Walsh", serial(5, 29), "Sick Visit", "BlueCross HMO"],
];

/** Billing records for the functions sim: patient, provider, date, visit type, plan, billed amount. */
const BILLING: [string, string, number, string, string, number][] = [
  ["P-1001", "Dr. Walsh", serial(5, 4), "New Patient", "BlueCross", 275],
  ["P-1002", "Dr. Nguyen", serial(5, 4), "Follow-Up", "Aetna", 140],
  ["P-1003", "Dr. Haddad", serial(5, 5), "Annual Physical", "Medicaid", 210],
  ["P-1004", "Dr. Walsh", serial(5, 6), "Follow-Up", "BlueCross", 135],
  ["P-1005", "Dr. Nguyen", serial(5, 7), "New Patient", "Self-pay", 250],
  ["P-1006", "Dr. Walsh", serial(5, 8), "New Patient", "Aetna", 260],
  ["P-1007", "Dr. Haddad", serial(5, 11), "Follow-Up", "BlueCross", 150],
  ["P-1008", "Dr. Nguyen", serial(5, 12), "Annual Physical", "BlueCross", 225],
  ["P-1001", "Dr. Walsh", serial(5, 13), "Follow-Up", "BlueCross", 130],
  ["P-1012", "Dr. Haddad", serial(5, 14), "New Patient", "Medicaid", 240],
  ["P-1003", "Dr. Nguyen", serial(5, 15), "Follow-Up", "Medicaid", 95],
  ["P-1005", "Dr. Walsh", serial(5, 18), "Annual Physical", "Self-pay", 200],
  ["P-1006", "Dr. Haddad", serial(5, 19), "Follow-Up", "Aetna", 145],
  ["P-1002", "Dr. Walsh", serial(5, 20), "New Patient", "BlueCross", 290],
  ["P-1007", "Dr. Nguyen", serial(5, 21), "New Patient", "BlueCross", 265],
  ["P-1004", "Dr. Haddad", serial(5, 22), "Annual Physical", "Aetna", 215],
];

/** Report data: appointment number, provider, date, visit type, plan, billed amount. */
const REPORT: [number, string, number, string, string, number][] = [
  [5001, "Dr. Walsh", serial(5, 4), "New Patient", "BlueCross", 275],
  [5002, "Dr. Nguyen", serial(5, 4), "Follow-Up", "Aetna", 140],
  [5003, "Dr. Haddad", serial(5, 5), "Annual Physical", "Medicaid", 210],
  [5004, "Dr. Walsh", serial(5, 6), "Follow-Up", "BlueCross", 135],
  [5005, "Dr. Walsh", serial(5, 7), "New Patient", "Self-pay", 250],
  [5006, "Dr. Nguyen", serial(5, 8), "New Patient", "Aetna", 260],
  [5007, "Dr. Haddad", serial(5, 11), "Follow-Up", "BlueCross", 150],
  [5008, "Dr. Nguyen", serial(5, 12), "Annual Physical", "BlueCross", 225],
  [5009, "Dr. Walsh", serial(5, 13), "Follow-Up", "Medicaid", 130],
  [5010, "Dr. Haddad", serial(5, 14), "New Patient", "Medicaid", 240],
  [5011, "Dr. Nguyen", serial(5, 15), "Follow-Up", "Self-pay", 95],
  [5012, "Dr. Walsh", serial(5, 18), "Annual Physical", "BlueCross", 200],
  [5013, "Dr. Haddad", serial(5, 19), "Follow-Up", "Aetna", 145],
  [5014, "Dr. Walsh", serial(5, 20), "New Patient", "BlueCross", 290],
  [5015, "Dr. Nguyen", serial(5, 21), "New Patient", "BlueCross", 265],
  [5016, "Dr. Haddad", serial(5, 22), "Annual Physical", "Aetna", 215],
  [5017, "Dr. Walsh", serial(5, 26), "Follow-Up", "Aetna", 140],
  [5018, "Dr. Nguyen", serial(5, 27), "Sick Visit", "Medicaid", 160],
];

function reportCells(): Record<string, ExcelCell> {
  return grid("A1", [["AppointmentID", "ProviderID", "AppointmentDate", "VisitType", "InsurancePlan", "BilledAmount"], ...REPORT], { header: true, colFmt: { C: DATE, F: MONEY } });
}

const REPORT_WIDTHS = { A: 100, B: 90, C: 112, D: 110, E: 104, F: 96 };

/* ------------------------------------------------------------------ */
/* Module 2: Excel as a Data Tool                                      */
/* ------------------------------------------------------------------ */

export const excelSims: Record<string, SimDefinition[]> = {
  "module-2::excel-data-table-structure": [
    {
      id: "db-excel-structure-1",
      app: "excel",
      title: "Repair the shared appointment sheet",
      scenario:
        "Three staff members have added to the May appointment sheet at Lakeside Medical Associates, and sorting and filtering no longer work. Fix the structural errors one rule at a time, then turn the clean range into a named Excel Table.",
      fileName: "May Appointments.xlsx",
      minutes: 7,
      initial: {
        active: "May Appointments",
        sheets: [
          {
            name: "May Appointments",
            rows: 20,
            colWidths: { A: 104, B: 130, C: 116, D: 86, E: 116, F: 110, G: 110 },
            merges: ["D5:D6"],
            cells: {
              ...grid(
                "A1",
                [
                  ["AppointmentID", "PatientName", "PatientFirstName", "ProviderID", "AppointmentDate", "VisitType", "InsurancePlan"],
                  [3101, "Rivera, Ana", null, "Dr. Walsh", { v: serial(5, 4), fmt: DATE }, "New Patient", "BlueCross PPO"],
                  [3102, "Chen, Marcus", null, "Dr. Nguyen", serial(5, 4), "Follow-Up", "Aetna"],
                  [3103, "Okonkwo, Grace", null, "Dr. Haddad", { v: serial(5, 5), fmt: DATE }, "Annual Physical", "Medicaid"],
                  [3104, "Patel, Ravi", null, "Dr. Walsh", { v: serial(5, 5), fmt: DATE }, "Follow-Up", "BlueCross HMO"],
                  [3105, "Lindqvist, Erik", null, null, serial(5, 6), "Sick Visit", "Self-pay"],
                  [3106, "Moreau, Celine", null, "Dr. Nguyen", { v: serial(5, 6), fmt: DATE }, "New Patient", "BlueCross PPO"],
                  [3107, "Santos, Diego", null, "Dr. Haddad", { v: serial(5, 7), fmt: DATE }, "Follow-Up", "Aetna"],
                  [{ v: "Week 1 Total: 7 appointments", fmt: { bold: true, italic: true } }],
                  [3108, "Yamamoto, Kenji", null, "Dr. Walsh", serial(5, 11), "Annual Physical", "BlueCross PPO"],
                  [3109, "Abara, Chidi", null, "Dr. Nguyen", { v: serial(5, 11), fmt: DATE }, "Sick Visit", "Medicaid"],
                  [3110, "Kowalski, Anna", null, "Dr. Haddad", { v: serial(5, 12), fmt: DATE }, "New Patient", "Aetna"],
                  [],
                  [3111, "Brennan, Siobhan", null, "Dr. Walsh", "May 21st", "Follow-Up", "BlueCross HMO"],
                  [3112, "Nakamura, Hiro", null, "Dr. Nguyen", { v: serial(5, 21), fmt: DATE }, "New Patient", "Self-pay"],
                  [3113, "Dubois, Amelie", null, "Dr. Haddad", serial(5, 22), "Follow-Up", "BlueCross PPO"],
                  [3114, "Mensah, Kwame", null, "Dr. Walsh", { v: serial(5, 22), fmt: DATE }, "Sick Visit", "Aetna"],
                ],
                { header: true },
              ),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Two appointments share one merged ProviderID cell, D5:D6. Unmerge it, then type \"Dr. Walsh\" in D6 so every row has its own value.",
          hint: "Click the merged cell D5. Home tab › Alignment group › Merge & Center arrow › Unmerge Cells. Then click D6, type Dr. Walsh and press Enter.",
          steps: [
            {
              action: { kind: "command", id: "home.merge", value: "Unmerge Cells" },
              alt: [
                { kind: "command", id: "home.merge", value: "Merge & Center" },
                { kind: "dialog", id: "formatCells", values: { merge: false }, requires: { selection: "D5:D6" } },
              ],
              requires: { selection: ["D5:D6", "D5"] },
              selectHint: "Click the merged cell D5:D6 first.",
            },
            { action: { kind: "type", target: "D6", value: "Dr. Walsh" } },
          ],
        },
        {
          instruction: "Row 9 is a weekly subtotal typed into the middle of the data. Delete row 9.",
          hint: "Right-click the row 9 header › Delete (or Home tab › Cells group › Delete › Delete Sheet Rows).",
          steps: [
            {
              action: { kind: "command", id: "home.delete", value: "Delete Sheet Rows" },
              requires: { selection: ["9:9", ...cells("A9:G9")] },
              selectHint: "Click the row 9 header (Week 1 Total) first.",
            },
          ],
        },
        {
          instruction: "Delete the blank row inside the data (now row 12), so the records form one continuous block.",
          hint: "Right-click the row 12 header › Delete.",
          steps: [
            {
              action: { kind: "command", id: "home.delete", value: "Delete Sheet Rows" },
              requires: { selection: ["12:12", ...cells("A12:G12")] },
              selectHint: "Click the row 12 header (the empty row) first.",
            },
          ],
        },
        {
          instruction: "Some dates in E2:E15 show as numbers such as 46146. Format E2:E15 as Short Date so the column is consistent.",
          hint: "Select E2:E15. Home tab › Number group › Number Format box › Short Date.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Short Date" },
              alt: [{ kind: "dialog", id: "formatCells", values: { category: "Short Date" } }],
              requires: { selection: ["E2:E15", "E:E"] },
              selectHint: "Select the dates in E2:E15 first.",
            },
          ],
        },
        {
          instruction: "E12 still reads \"May 21st\" because it was typed as text, which no format can fix. Retype it as the date 5/21/2026.",
          hint: "Click E12, type 5/21/2026 and press Enter.",
          steps: [{ action: { kind: "type", target: "E12", value: ["5/21/2026", "5/21/26"] } }],
        },
        {
          instruction: "Split PatientName into two fields: use Text to Columns on B2:B15 with a Comma delimiter, then rename B1 \"PatientLastName\".",
          hint: "Select B2:B15. Data tab › Data Tools group › Text to Columns. Choose Delimited, check Comma, Finish. Then click B1, type PatientLastName and press Enter.",
          steps: [
            {
              action: { kind: "dialog", id: "textToColumns", values: { delimiter: "Comma" } },
              requires: { selection: "B2:B15" },
              selectHint: "Select the names in B2:B15 (not the header) first.",
            },
            { action: { kind: "type", target: "B1", value: "PatientLastName" } },
          ],
        },
        {
          instruction: "Convert the clean range A1:G15 into an Excel Table that has headers.",
          hint: "Click any cell in the data and press Ctrl+T (or Insert tab › Tables group › Table). Check My table has headers, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createTable", values: { headers: true } },
              alt: [{ kind: "command", id: "home.formatAsTable" }],
              requires: { selection: inData("A1:G15") },
              selectHint: "Click a cell inside the data (A1:G15) first.",
            },
          ],
        },
        {
          instruction: "Rename the table \"Appointments\".",
          hint: "Click a cell in the table. Table Design tab › Properties group › Table Name box, type Appointments and press Enter.",
          steps: [{ action: { kind: "command", id: "table.name", value: "Appointments" }, requires: { selection: cells("A1:G15") }, selectHint: "Click a cell inside the table so the Table Design tab appears." }],
        },
      ],
    },
  ],

  "module-2::sorting-filtering-searching": [
    {
      id: "db-excel-sort-filter-1",
      app: "excel",
      title: "Answer the practice manager's questions",
      scenario:
        "The practice manager needs answers from the May appointment table before her 2 PM meeting: the schedule in date order, Dr. Walsh's new patients, the BlueCross patients, and the second half of the month. Sort and filter the table to answer each one.",
      fileName: "May Appointments.xlsx",
      minutes: 6,
      initial: {
        active: "Appointments",
        sheets: [
          {
            name: "Appointments",
            rows: 20,
            colWidths: { A: 104, B: 120, C: 116, D: 86, E: 116, F: 110, G: 110 },
            table: { range: "A1:G17", style: "Table Style Medium 2", name: "Appointments" },
            filter: "A1:G17",
            cells: grid("A1", [["AppointmentID", "PatientLastName", "PatientFirstName", "ProviderID", "AppointmentDate", "VisitType", "InsurancePlan"], ...APPTS], {
              header: true,
              colFmt: { E: DATE },
            }),
          },
        ],
      },
      tasks: [
        {
          instruction: "Sort the table by AppointmentDate from oldest to newest.",
          hint: "Click any cell in the AppointmentDate column. Data tab › Sort & Filter group › Sort Oldest to Newest (Sort A to Z). Or use the AppointmentDate filter arrow › Sort Oldest to Newest.",
          steps: [
            {
              action: { kind: "command", id: "data.sortAsc" },
              alt: [{ kind: "command", id: "filter.sort", value: "E:asc" }],
              requires: { selection: colCells("E", 1, 17) },
              selectHint: "Click one cell in the AppointmentDate column first.",
            },
          ],
        },
        {
          instruction: "In one sort, sort by ProviderID from A to Z, then by AppointmentDate from oldest to newest.",
          hint: "Click a cell in the table. Data tab › Sort. Sort by ProviderID, A to Z. Add Level: Then by AppointmentDate, Oldest to Newest. OK. (For a date column the Order list offers Oldest to Newest.)",
          steps: [
            {
              action: { kind: "dialog", id: "sort", values: { sortBy: "ProviderID", order: "A to Z", thenBy: "AppointmentDate", thenOrder: ["Oldest to Newest", "Smallest to Largest"] } },
              requires: { selection: cells("A1:G17") },
              selectHint: "Click a single cell inside the table first.",
            },
          ],
        },
        {
          instruction: "Filter the table to show only Dr. Walsh's appointments.",
          hint: "Click the ProviderID filter arrow. Uncheck (Select All), check Dr. Walsh, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "D=Dr. Walsh" } }],
        },
        {
          instruction: "Add a second filter so only Dr. Walsh's New Patient appointments show.",
          hint: "Click the VisitType filter arrow. Uncheck (Select All), check New Patient, OK. Both filters stay on.",
          steps: [{ action: { kind: "command", id: "filter.by", value: "F=New Patient" } }],
        },
        {
          instruction: "Clear all filters at once.",
          hint: "Data tab › Sort & Filter group › Clear.",
          steps: [{ action: { kind: "command", id: "data.clearFilter" } }],
        },
        {
          instruction: "Show only patients whose InsurancePlan contains \"BlueCross\".",
          hint: "Click the InsurancePlan filter arrow › Text Filters › Contains..., type BlueCross, OK. (Typing BlueCross in the filter's Search box also works.)",
          steps: [
            {
              action: { kind: "command", id: "filter.by", value: "G~contains BlueCross" },
              alt: [{ kind: "command", id: "filter.by", value: "G=BlueCross HMO|BlueCross PPO" }],
            },
          ],
        },
        {
          instruction: "Add a date filter: show only appointments after 5/15/2026.",
          hint: "Click the AppointmentDate filter arrow › Date Filters › After..., type 5/15/2026, OK.",
          steps: [{ action: { kind: "command", id: "filter.by", value: `E~>${serial(5, 15)}` } }],
        },
        {
          instruction: "Clear the filter from the InsurancePlan column only, keeping the date filter.",
          hint: "Click the InsurancePlan filter arrow › Clear Filter From \"InsurancePlan\".",
          steps: [{ action: { kind: "command", id: "filter.by", value: "G=*" } }],
        },
      ],
    },
    {
      id: "db-excel-sort-filter-2",
      app: "excel",
      title: "Find and fix records before the meeting",
      scenario:
        "A patient is on the phone, an insurance name was misspelled across the patient list, and the monthly visit counts are in random order. Use Find, Replace and a custom sort to get the workbook ready.",
      fileName: "Patient Records.xlsx",
      minutes: 5,
      initial: {
        active: "Patients",
        sheets: [
          {
            name: "Patients",
            colWidths: { A: 80, B: 110, C: 96, D: 160, E: 96 },
            cells: grid(
              "A1",
              [
                ["PatientID", "LastName", "FirstName", "InsurancePlan", "Phone"],
                ["P-2101", "Achebe", "Ngozi", "BleuCross BlueShield", "555-0141"],
                ["P-2102", "Bergstrom", "Nils", "Aetna", "555-0187"],
                ["P-2103", "Carvalho", "Ines", "Medicade", "555-0112"],
                ["P-2104", "Delacroix", "Paul", "BleuCross BlueShield", "555-0153"],
                ["P-2105", "Esposito", "Gia", "Self-pay", "555-0176"],
                ["P-2106", "Farouk", "Omar", "Aetna", "555-0128"],
                ["P-2107", "Nakamura", "Yui", "BleuCross BlueShield", "555-0164"],
                ["P-2108", "Halvorsen", "Ingrid", "Medicade", "555-0139"],
                ["P-2109", "Ibarra", "Sofia", "BlueCross BlueShield", "555-0195"],
                ["P-2110", "Jensen", "Mads", "Aetna", "555-0108"],
              ],
              { header: true },
            ),
          },
          {
            name: "Billing Notes",
            colWidths: { A: 80, B: 320 },
            cells: grid("A1", [["PatientID", "Note"], ["P-2103", "Medicade card on file, renewal due in June"], ["P-2106", "Copay collected at check-in"]], { header: true }),
          },
          {
            name: "Monthly Visits",
            colWidths: { A: 96, B: 70 },
            cells: grid("A1", [["Month", "Visits"], ["March", 612], ["January", 584], ["June", 655], ["April", 598], ["February", 571], ["May", 640]], { header: true }),
          },
        ],
      },
      tasks: [
        {
          instruction: "A patient named Nakamura is on the phone. Find her record on the Patients sheet.",
          hint: "Press Ctrl+F (or Home tab › Editing group › Find & Select › Find). Type Nakamura and click Find All.",
          steps: [{ action: { kind: "dialog", id: "find", values: { find: "Nakamura" } } }],
        },
        {
          instruction: "Before replacing anything, find all the cells that contain the misspelling \"BleuCross\".",
          hint: "Press Ctrl+F, type BleuCross and click Find All. The list shows how many cells a Replace All would change.",
          steps: [{ action: { kind: "dialog", id: "find", values: { find: "BleuCross" } } }],
        },
        {
          instruction: "Replace every \"BleuCross\" on the Patients sheet with \"BlueCross\".",
          hint: "Press Ctrl+H (or Home tab › Editing group › Find & Select › Replace). Find what: BleuCross. Replace with: BlueCross. Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "BleuCross", replace: "BlueCross" } } }],
        },
        {
          instruction: "\"Medicade\" is misspelled on two sheets. Replace it with \"Medicaid\" everywhere in the workbook.",
          hint: "Press Ctrl+H. Find what: Medicade. Replace with: Medicaid. Set Within to Workbook, then Replace All.",
          steps: [{ action: { kind: "dialog", id: "replace", values: { find: "Medicade", replace: "Medicaid", within: "Workbook" } } }],
        },
        {
          instruction: "On the Monthly Visits sheet, sort the months in calendar order (January to June) with a custom list.",
          hint: "Click the Monthly Visits tab and a cell in the data. Data tab › Sort. Sort by Month, Order: Custom List..., enter January, February, March, April, May, June. OK.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "sort",
                values: {
                  sortBy: "Month",
                  order: "Custom List...",
                  customList: ["January, February, March, April, May, June", "January,February,March,April,May,June"],
                },
              },
              requires: { selection: cells("A1:B7"), sheet: "Monthly Visits" },
              selectHint: "Click a single cell inside the Monthly Visits data first.",
            },
          ],
        },
      ],
    },
  ],

  "module-2::excel-data-functions": [
    {
      id: "db-excel-functions-1",
      app: "excel",
      title: "Build the provider and payer summary",
      scenario:
        "Before the monthly meeting, your supervisor wants appointment counts and billed totals by provider and by insurance plan, two specific Dr. Walsh figures, and patient last names pulled in from the registration sheet. Every answer should come from a formula that reads the Appointments table.",
      fileName: "May Billing Analysis.xlsx",
      minutes: 7,
      initial: {
        active: "Summary",
        sheets: [
          {
            name: "Summary",
            colWidths: { A: 190, B: 130, C: 100, D: 24, E: 110, F: 100 },
            cells: {
              ...grid("A1", [["ProviderID", "Total Appointments", "Total Billed"], ["Dr. Walsh"], ["Dr. Nguyen"], ["Dr. Haddad"]], { header: true }),
              ...grid("E1", [["InsurancePlan", "Total Billed"], ["BlueCross"], ["Aetna"], ["Medicaid"], ["Self-pay"]], { header: true }),
              ...fmtOnly("C2:C4", MONEY),
              ...fmtOnly("F2:F5", MONEY),
              A7: { v: "Dr. Walsh new patient visits", fmt: { bold: true } },
              A8: { v: "Dr. Walsh BlueCross billed", fmt: { bold: true } },
              B8: { fmt: MONEY },
            },
          },
          {
            name: "Appointments",
            rows: 20,
            colWidths: { A: 76, B: 100, C: 90, D: 112, E: 110, F: 96, G: 96 },
            table: { range: "A1:G17", style: "Table Style Medium 9", name: "Appointments" },
            filter: "A1:G17",
            cells: grid("A1", [["PatientID", "LastName", "ProviderID", "AppointmentDate", "VisitType", "InsurancePlan", "BilledAmount"], ...BILLING.map(([p, ...rest]) => [p, null, ...rest])], {
              header: true,
              colFmt: { D: DATE, G: MONEY },
            }),
          },
          {
            name: "Patients",
            colWidths: { A: 76, B: 110 },
            cells: grid(
              "A1",
              [["PatientID", "LastName"], ["P-1001", "Okafor"], ["P-1002", "Lindqvist"], ["P-1003", "Ramirez"], ["P-1004", "Haddad"], ["P-1005", "Brennan"], ["P-1006", "Tanaka"], ["P-1007", "Osei"], ["P-1008", "Petrova"]],
              { header: true },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "In B2 on the Summary sheet, count each provider's appointments: =COUNTIF(Appointments[ProviderID],A2). Copy it down through B4.",
          hint: "Click B2, type =COUNTIF(Appointments[ProviderID],A2) and press Enter. Select B2 and double-click the fill handle (or drag it to B4). A2 changes to A3 and A4 as it copies.",
          steps: [
            { action: { kind: "type", target: "B2", value: "=COUNTIF(Appointments[ProviderID],A2)", match: "formula" }, requires: { sheet: "Summary" }, selectHint: "Work on the Summary sheet." },
            fill("B2", "B2:B4", "Summary"),
          ],
        },
        {
          instruction: "In C2, total each provider's billed amount: =SUMIF(Appointments[ProviderID],A2,Appointments[BilledAmount]). Copy it down through C4.",
          hint: "Click C2, type the formula and press Enter. Then fill C2 down to C4.",
          steps: [
            { action: { kind: "type", target: "C2", value: "=SUMIF(Appointments[ProviderID],A2,Appointments[BilledAmount])", match: "formula" }, requires: { sheet: "Summary" }, selectHint: "Work on the Summary sheet." },
            fill("C2", "C2:C4", "Summary"),
          ],
        },
        {
          instruction: "In F2, total the billed amount for the plan in E2: =SUMIF(Appointments[InsurancePlan],E2,Appointments[BilledAmount]). Copy it down through F5.",
          hint: "Click F2, type the formula and press Enter. Then fill F2 down to F5.",
          steps: [
            { action: { kind: "type", target: "F2", value: "=SUMIF(Appointments[InsurancePlan],E2,Appointments[BilledAmount])", match: "formula" }, requires: { sheet: "Summary" }, selectHint: "Work on the Summary sheet." },
            fill("F2", "F2:F5", "Summary"),
          ],
        },
        {
          instruction: "In B7, count Dr. Walsh's New Patient visits with two conditions: =COUNTIFS(Appointments[ProviderID],\"Dr. Walsh\",Appointments[VisitType],\"New Patient\").",
          hint: "Click B7, type the formula and press Enter. Each pair is a range followed by what it must match; a row counts only when both match.",
          steps: [
            {
              action: {
                kind: "type",
                target: "B7",
                value: ['=COUNTIFS(Appointments[ProviderID],"Dr. Walsh",Appointments[VisitType],"New Patient")', '=COUNTIFS(Appointments[VisitType],"New Patient",Appointments[ProviderID],"Dr. Walsh")'],
                match: "formula",
              },
              requires: { sheet: "Summary" },
              selectHint: "Work on the Summary sheet.",
            },
          ],
        },
        {
          instruction: "In B8, total Dr. Walsh's BlueCross billing: =SUMIFS(Appointments[BilledAmount],Appointments[InsurancePlan],\"BlueCross\",Appointments[ProviderID],\"Dr. Walsh\").",
          hint: "Click B8, type the formula and press Enter. In SUMIFS the column to add comes first.",
          steps: [
            {
              action: {
                kind: "type",
                target: "B8",
                value: [
                  '=SUMIFS(Appointments[BilledAmount],Appointments[InsurancePlan],"BlueCross",Appointments[ProviderID],"Dr. Walsh")',
                  '=SUMIFS(Appointments[BilledAmount],Appointments[ProviderID],"Dr. Walsh",Appointments[InsurancePlan],"BlueCross")',
                ],
                match: "formula",
              },
              requires: { sheet: "Summary" },
              selectHint: "Work on the Summary sheet.",
            },
          ],
        },
        {
          instruction: "On the Appointments sheet, in B2, look up each patient's last name on the Patients sheet and show \"Not Found\" when there is no match: =IFERROR(VLOOKUP(A2,Patients!$A$2:$B$9,2,FALSE),\"Not Found\").",
          hint: "Click the Appointments tab, click B2, type the formula and press Enter. Because B is a table column, Excel fills the formula down the whole column for you.",
          steps: [
            {
              action: {
                kind: "type",
                target: "B2",
                value: [
                  '=IFERROR(VLOOKUP(A2,Patients!$A$2:$B$9,2,FALSE),"Not Found")',
                  '=IFERROR(VLOOKUP(A2,Patients!$A$2:$B$9,2,0),"Not Found")',
                  '=IFERROR(VLOOKUP([@PatientID],Patients!$A$2:$B$9,2,FALSE),"Not Found")',
                  '=IFERROR(VLOOKUP([@PatientID],Patients!$A$2:$B$9,2,0),"Not Found")',
                ],
                match: "formula",
                strictRefs: true,
              },
              requires: { sheet: "Appointments" },
              selectHint: "Switch to the Appointments sheet first.",
            },
          ],
        },
      ],
    },
  ],

  "module-2::excel-reports": [
    {
      id: "db-excel-reports-1",
      app: "excel",
      title: "Build the monthly appointment report",
      scenario:
        "Every first Monday the practice manager wants a one-page summary of last month's appointments: how many each provider saw, shown as a table and a chart. Build it from the Appointments table with a PivotTable instead of counting by hand.",
      fileName: "May Appointment Report.xlsx",
      minutes: 6,
      initial: {
        active: "Appointments",
        sheets: [
          {
            name: "Appointments",
            rows: 22,
            colWidths: REPORT_WIDTHS,
            table: { range: "A1:F19", style: "Table Style Medium 2", name: "Appointments" },
            filter: "A1:F19",
            cells: reportCells(),
          },
        ],
      },
      tasks: [
        {
          instruction: "Create a PivotTable from the Appointments table on a new worksheet.",
          hint: "Click any cell in the table. Insert tab › Tables group › PivotTable (or Table Design › Summarize with PivotTable). Keep New Worksheet, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createPivot", values: { location: "New Worksheet" } },
              requires: { selection: inData("A1:F19") },
              selectHint: "Click a cell inside the Appointments table first.",
            },
          ],
        },
        {
          instruction: "Put ProviderID in Rows and AppointmentID in Values.",
          hint: "In the PivotTable Fields pane, check ProviderID (it goes to Rows) and AppointmentID (it goes to Values). You can also drag them into the areas.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "pivot.field", value: "ProviderID" }, alt: [{ kind: "command", id: "pivot.area", value: "ProviderID>Rows" }], requires: { sheet: "Sheet2" } },
            { action: { kind: "command", id: "pivot.field", value: "AppointmentID" }, alt: [{ kind: "command", id: "pivot.area", value: "AppointmentID>Values" }], requires: { sheet: "Sheet2" } },
          ],
        },
        {
          instruction: "Excel is adding up the ID numbers. Change the value field so it counts appointments instead.",
          hint: "Click a value in the PivotTable. PivotTable Analyze tab › Active Field group › Summarize Values By › Count (or right-click › Value Field Settings › Count).",
          steps: [
            {
              action: { kind: "command", id: "pivot.summarize", value: "Count" },
              alt: [{ kind: "dialog", id: "valueFieldSettings", values: { fn: "Count" } }],
              requires: { sheet: "Sheet2" },
            },
          ],
        },
        {
          instruction: "Rename the PivotTable sheet \"Monthly Report\".",
          hint: "Double-click the Sheet2 tab, type Monthly Report and press Enter.",
          steps: [{ action: { kind: "type", target: "sheet:Sheet2", value: "Monthly Report" } }],
        },
        {
          instruction: "Insert a Clustered Column PivotChart of the appointment counts.",
          hint: "Click a cell in the PivotTable. PivotTable Analyze tab › Tools group › PivotChart › Clustered Column, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "insertChart", values: { type: "Clustered Column" } },
              alt: [{ kind: "command", id: "insert.chart", value: "Clustered Column" }],
              requires: { sheet: "Monthly Report" },
            },
          ],
        },
        {
          instruction: "Change the chart title to \"Appointments by Provider - May 2026\".",
          hint: "Double-click the chart title, type the new title and press Enter.",
          steps: [{ action: { kind: "type", target: "chart:c1.title", value: "Appointments by Provider - May 2026" }, requires: { sheet: "Monthly Report" } }],
        },
        {
          instruction: "Insert a slicer for VisitType so the practice manager can filter the report by visit type.",
          hint: "Click a cell in the PivotTable. PivotTable Analyze tab › Filter group › Insert Slicer. Choose VisitType, OK.",
          steps: [{ action: { kind: "dialog", id: "insertSlicer", values: { field: "VisitType" } }, requires: { sheet: "Monthly Report" } }],
        },
      ],
    },
    {
      id: "db-excel-reports-2",
      app: "excel",
      title: "Get the monthly report ready to print",
      scenario:
        "The PivotTable and chart are done, but printed as is the report would spill onto a second page with no title. Set it up as a dated, one-page report and print it for the providers' meeting.",
      fileName: "May Appointment Report.xlsx",
      minutes: 5,
      initial: {
        active: "Monthly Report",
        sheets: [
          {
            name: "Monthly Report",
            colWidths: { A: 120, B: 150 },
            cells: { A1: { v: "May 2026", fmt: TITLE } },
            pivot: { source: { sheet: "Appointments", range: "A1:F19" }, rows: ["ProviderID"], columns: [], values: [{ field: "AppointmentID", fn: "Count" }], filters: [], at: "A3" },
            charts: [{ id: "c1", type: "Clustered Column", title: "Appointments by Provider - May 2026", range: "PIVOT", at: "D3" }],
          },
          {
            name: "Appointments",
            rows: 22,
            colWidths: REPORT_WIDTHS,
            table: { range: "A1:F19", style: "Table Style Medium 2", name: "Appointments" },
            filter: "A1:F19",
            cells: reportCells(),
          },
        ],
      },
      tasks: [
        {
          instruction: "Set the print area to A1:K20 so it covers the PivotTable and the chart.",
          hint: "Select A1:K20. Page Layout tab › Page Setup group › Print Area › Set Print Area.",
          steps: [{ action: { kind: "command", id: "layout.printArea", value: "Set Print Area" }, requires: { selection: "A1:K20", sheet: "Monthly Report" }, selectHint: "Select A1:K20 on the Monthly Report sheet first." }],
        },
        {
          instruction: "Change the page orientation to Landscape.",
          hint: "Page Layout tab › Page Setup group › Orientation › Landscape.",
          steps: [
            {
              action: { kind: "command", id: "layout.orientation", value: "Landscape" },
              alt: [{ kind: "dialog", id: "pageSetupSheet", values: { orientation: "Landscape" } }],
              requires: { sheet: "Monthly Report" },
            },
          ],
        },
        {
          instruction: "Scale the report to fit 1 page wide by 1 page tall.",
          hint: "Page Layout tab › Scale to Fit group: set Width to 1 page and Height to 1 page.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "layout.fitWidth", value: "1 page" }, requires: { sheet: "Monthly Report" } },
            { action: { kind: "command", id: "layout.fitHeight", value: "1 page" }, requires: { sheet: "Monthly Report" } },
          ],
        },
        {
          instruction: "Add the header \"Lakeside Medical Associates - Monthly Appointment Summary\".",
          hint: "Page Layout tab › Page Setup group launcher (the small arrow) › Header/Footer tab. Type the text in Header, then OK. (Or Insert tab › Text group › Header & Footer, type in the header area and click a cell.)",
          steps: [
            {
              action: { kind: "dialog", id: "pageSetupSheet", values: { header: "Lakeside Medical Associates - Monthly Appointment Summary" } },
              alt: [{ kind: "type", target: "header", value: "Lakeside Medical Associates - Monthly Appointment Summary" }],
              requires: { sheet: "Monthly Report" },
            },
          ],
        },
        {
          instruction: "Add the footer \"Prepared by the Front Desk\".",
          hint: "Page Layout tab › Page Setup group launcher › Header/Footer tab. Type the text in Footer, then OK. (Or, in Page Layout view, click the footer area at the bottom of the page and type it.)",
          steps: [
            {
              action: { kind: "dialog", id: "pageSetupSheet", values: { footer: "Prepared by the Front Desk" } },
              alt: [{ kind: "type", target: "footer", value: "Prepared by the Front Desk" }],
              requires: { sheet: "Monthly Report" },
            },
          ],
        },
        {
          instruction: "Preview the report and print 2 copies on the Front Desk HP LaserJet.",
          hint: "File tab › Print (Ctrl+P). Check the preview, set Copies to 2, choose Front Desk HP LaserJet as the printer, then click Print.",
          steps: [{ action: { kind: "dialog", id: "file.print", values: { copies: 2, printer: "Front Desk HP LaserJet" } } }],
        },
      ],
    },
  ],
};
