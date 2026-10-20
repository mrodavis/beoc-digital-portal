import type { ExcelCell, SimDefinition } from "@/types/sim";
import { cells, column, grid, MONEY } from "./helpers";

/* ------------------------------------------------------------------ */
/* Practice data                                                       */
/* ------------------------------------------------------------------ */

const PO_ROWS: [string, string, string, number, number][] = [
  ["PO-1001", "Nitrile gloves (M)", "Family Medicine", 30, 7.25],
  ["PO-1002", "Defibrillator pads", "Cardiology", 2, 94.5],
  ["PO-1003", "Specimen cups", "Laboratory", 10, 22.4],
  ["PO-1004", "Exam table paper", "Pediatrics", 6, 18.5],
  ["PO-1005", "ECG electrodes", "Cardiology", 8, 11.7],
  ["PO-1006", "Blood collection tubes", "Laboratory", 48, 6.5],
  ["PO-1007", "Alcohol prep pads", "Family Medicine", 20, 4.4],
  ["PO-1008", "Infant scale liners", "Pediatrics", 3, 14.25],
  ["PO-1009", "Glucose test strips", "Laboratory", 12, 15.8],
  ["PO-1010", "Gauze pads 4x4", "Family Medicine", 18, 9.8],
  ["PO-1011", "Holter monitor batteries", "Cardiology", 16, 7.4],
  ["PO-1012", "Sharps container", "Family Medicine", 6, 11],
  ["PO-1013", "Tongue depressors", "Pediatrics", 10, 3.6],
  ["PO-1014", "Pipette tips", "Laboratory", 5, 19.35],
];

/** April and May supply spending, 20 rows: Month, Department, Vendor, Category, Amount. */
export const PIVOT_ROWS: [string, string, string, string, number][] = [
  ["Apr", "Family Medicine", "McKesson", "Medical", 217.5],
  ["Apr", "Cardiology", "Cardinal Health", "Medical", 189],
  ["Apr", "Laboratory", "Medline Industries", "Lab", 312.6],
  ["Apr", "Pediatrics", "Medline Industries", "Medical", 111],
  ["Apr", "Laboratory", "Cardinal Health", "Lab", 224],
  ["Apr", "Family Medicine", "Henry Schein", "Cleaning", 131.25],
  ["Apr", "Pediatrics", "Henry Schein", "Medical", 98.25],
  ["Apr", "Cardiology", "McKesson", "Medical", 93.6],
  ["Apr", "Family Medicine", "Medline Industries", "Medical", 260],
  ["Apr", "Laboratory", "McKesson", "Lab", 125],
  ["May", "Family Medicine", "McKesson", "Medical", 176.4],
  ["May", "Cardiology", "Cardinal Health", "Medical", 118.4],
  ["May", "Laboratory", "Medline Industries", "Lab", 189.9],
  ["May", "Pediatrics", "McKesson", "Medical", 54],
  ["May", "Family Medicine", "Cardinal Health", "Medical", 88],
  ["May", "Laboratory", "Cardinal Health", "Lab", 96.75],
  ["May", "Pediatrics", "Medline Industries", "Medical", 42.75],
  ["May", "Family Medicine", "Henry Schein", "Cleaning", 100.8],
  ["May", "Cardiology", "Medline Industries", "Medical", 145],
  ["May", "Pediatrics", "Henry Schein", "Cleaning", 58.4],
];

export function pivotSourceCells(): Record<string, ExcelCell> {
  return grid("A1", [["Month", "Department", "Vendor", "Category", "Amount"], ...PIVOT_ROWS], { header: true, colFmt: { E: MONEY } });
}

export const PIVOT_WIDTHS = { A: 56, B: 116, C: 124, D: 76, E: 84 };

/* ------------------------------------------------------------------ */
/* Module 6                                                            */
/* ------------------------------------------------------------------ */

export const excelModule6Sims: Record<string, SimDefinition[]> = {
  "module-6::working-with-tables": [
    {
      id: "excel-m6-tables-1",
      app: "excel",
      title: "Turn the purchase orders into a table",
      scenario:
        "Your chart and totals on the purchase order list keep missing new rows. Convert the list to an Excel Table so everything built on it grows with the data, and use a structured reference for the total.",
      fileName: "Purchase Orders.xlsx",
      minutes: 6,
      initial: {
        active: "Orders",
        sheets: [
          {
            name: "Orders",
            colWidths: { A: 70, B: 160, C: 116, D: 44, E: 76, F: 82, H: 90 },
            cells: {
              ...grid("A1", [["PO #", "Item", "Department", "Qty", "Unit Cost", "Cost"], ...PO_ROWS], { header: true, colFmt: { E: MONEY } }),
              ...column("F", 2, 15, "=D{r}*E{r}", MONEY),
              H1: { v: "Total Cost", fmt: { bold: true } },
              H2: { fmt: MONEY },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "Convert the purchase order data in A1:F15 into a table that has headers.",
          hint: "Click any cell in the data. Insert tab › Tables group › Table (or Ctrl+T). Confirm the range and My table has headers, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createTable", values: { headers: true } },
              alt: [{ kind: "command", id: "home.formatAsTable" }],
              requires: { selection: ["A1:F15", ...cells("A1:F15")] },
              selectHint: "Click a cell inside the data (A1:F15) first.",
            },
          ],
        },
        {
          instruction: "Apply Table Style Medium 9 to the table.",
          hint: "Click a cell in the table. Table Design tab › Table Styles gallery › Medium 9.",
          steps: [
            {
              action: { kind: "command", id: "table.style", value: "Table Style Medium 9" },
              alt: [{ kind: "command", id: "home.formatAsTable", value: "Table Style Medium 9" }],
              requires: { selection: cells("A1:F15") },
              selectHint: "Click a cell inside the table so the Table Design tab appears.",
            },
          ],
        },
        {
          instruction: "Name the table \"Orders\".",
          hint: "Click a cell in the table. Table Design tab › Properties group › Table Name box, type Orders and press Enter.",
          steps: [
            {
              action: { kind: "command", id: "table.name", value: "Orders" },
              requires: { selection: cells("A1:F15") },
              selectHint: "Click a cell inside the table so the Table Design tab appears.",
            },
          ],
        },
        {
          instruction: "Add a new purchase order directly below the table: type \"PO-1015\" in A16.",
          hint: "Click A16, type PO-1015 and press Enter. The table grows to include row 16.",
          steps: [{ action: { kind: "type", target: "A16", value: "PO-1015" } }],
        },
        {
          instruction: "PO-1007 was cancelled. Delete its row (row 8) from the table.",
          hint: "Right-click the row 8 header › Delete (or Home tab › Cells group › Delete › Delete Sheet Rows).",
          steps: [
            {
              action: { kind: "command", id: "home.delete", value: "Delete Sheet Rows" },
              requires: { selection: ["8:8", ...cells("A8:F8")] },
              selectHint: "Click the row 8 header (PO-1007) first.",
            },
          ],
        },
        {
          instruction: "Turn on the table's Total Row.",
          hint: "Click a cell in the table. Table Design tab › Table Style Options group › Total Row.",
          steps: [
            {
              action: { kind: "command", id: "table.totalRow" },
              requires: { selection: cells("A1:F15") },
              selectHint: "Click a cell inside the table so the Table Design tab appears.",
            },
          ],
        },
        {
          instruction: "In H2, total the Cost column with a structured reference: =SUM(Orders[Cost]).",
          hint: "Click H2 and type =SUM(Orders[Cost]), then press Enter. The reference grows when the table does.",
          steps: [{ action: { kind: "type", target: "H2", value: "=SUM(Orders[Cost])", match: "formula" } }],
        },
      ],
    },
  ],

  "module-6::charts": [
    {
      id: "excel-m6-charts-1",
      app: "excel",
      title: "Chart quarterly supply spending",
      scenario:
        "The board wants to see how supply spending moved over the year. Build a chart, title it with the finding, and put it on its own sheet for the meeting.",
      fileName: "Supply Spending by Quarter.xlsx",
      minutes: 5,
      initial: {
        active: "Spending",
        sheets: [
          {
            name: "Spending",
            colWidths: { A: 130, B: 72, C: 72, D: 72, E: 72 },
            cells: grid(
              "A1",
              [
                ["Category", "Q1", "Q2", "Q3", "Q4"],
                ["Medical Supplies", 11800, 12350, 14540, 12900],
                ["Lab Supplies", 3980, 4120, 3860, 4210],
                ["Office Supplies", 1890, 2010, 1950, 2240],
                ["Cleaning", 1405, 1380, 1510, 1460],
                ["Linens", 980, 1010, 945, 1025],
              ],
              { header: true, colFmt: { B: MONEY, C: MONEY, D: MONEY, E: MONEY } },
            ),
          },
        ],
      },
      tasks: [
        {
          instruction: "Select A1:E6 and insert a Clustered Column chart from Recommended Charts.",
          hint: "Select A1:E6. Insert tab › Charts group › Recommended Charts › Clustered Column, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "insertChart", values: { type: "Clustered Column" } },
              alt: [{ kind: "command", id: "insert.chart", value: "Clustered Column" }],
              requires: { selection: ["A1:E6", ...cells("A1:E6")] },
              selectHint: "Select the whole table, A1:E6, including the headings.",
            },
          ],
        },
        {
          instruction: "Change the chart title to \"Medical Supply Spending Peaked in Q3\".",
          hint: "Double-click the chart title, type the new title and press Enter.",
          steps: [{ action: { kind: "type", target: "chart:c1.title", value: "Medical Supply Spending Peaked in Q3" } }],
        },
        {
          instruction: "Apply Quick Layout 3 to the chart.",
          hint: "Click the chart. Chart Design tab › Chart Layouts group › Quick Layout › Layout 3.",
          steps: [{ action: { kind: "command", id: "chart.layout", value: "Layout 3" } }],
        },
        {
          instruction: "Switch rows and columns so the quarters run along the horizontal axis.",
          hint: "Click the chart. Chart Design tab › Data group › Switch Row/Column.",
          steps: [{ action: { kind: "command", id: "chart.switchRowCol" } }],
        },
        {
          instruction: "Change the chart type to Line with Markers.",
          hint: "Click the chart. Chart Design tab › Type group › Change Chart Type › Line with Markers.",
          steps: [{ action: { kind: "command", id: "chart.type", value: "Line with Markers" } }],
        },
        {
          instruction: "Add data labels to the chart.",
          hint: "Click the chart. Chart Design tab › Chart Layouts group › Add Chart Element › Data Labels.",
          steps: [{ action: { kind: "command", id: "chart.addElement", value: "Data Labels" } }],
        },
        {
          instruction: "Move the chart to a new chart sheet named \"Spending Chart\".",
          hint: "Click the chart. Chart Design tab › Location group › Move Chart. Choose New sheet, type Spending Chart, OK.",
          steps: [{ action: { kind: "dialog", id: "moveChart", values: { location: "New sheet", name: "Spending Chart" } } }],
        },
      ],
    },
  ],

  "module-6::pivot-tables": [
    {
      id: "excel-m6-pivot-tables-1",
      app: "excel",
      title: "Break down spending with a PivotTable",
      scenario:
        "Your supervisor asks what each vendor was paid in April and May. Instead of writing formulas, build a PivotTable and rearrange its fields until it answers the question.",
      fileName: "Spring Supply Spending.xlsx",
      minutes: 6,
      initial: { active: "Spending", sheets: [{ name: "Spending", colWidths: PIVOT_WIDTHS, cells: pivotSourceCells() }] },
      tasks: [
        {
          instruction: "Create a PivotTable from the spending data on a new worksheet.",
          hint: "Click any cell in the data. Insert tab › Tables group › PivotTable. Keep New Worksheet and click OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createPivot", values: { location: "New Worksheet" } },
              requires: { selection: ["A1:E21", ...cells("A1:E21")] },
              selectHint: "Click a cell inside the spending data first.",
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
          instruction: "Replace Department in the Rows area with Vendor.",
          hint: "In the PivotTable Fields pane, uncheck Department and check Vendor.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "pivot.field", value: "Department" }, requires: { sheet: "Sheet2" } },
            { action: { kind: "command", id: "pivot.field", value: "Vendor" }, alt: [{ kind: "command", id: "pivot.area", value: "Vendor>Rows" }], requires: { sheet: "Sheet2" } },
          ],
        },
        {
          instruction: "Add Month to the Columns area.",
          hint: "Drag Month from the field list into the Columns area (or use the arrow beside Month › Add to Column Labels).",
          steps: [{ action: { kind: "command", id: "pivot.area", value: "Month>Columns" }, requires: { sheet: "Sheet2" } }],
        },
        {
          instruction: "Format the PivotTable values in B4:D8 as Currency.",
          hint: "Select B4:D8. Home tab › Number group › Number Format box › Currency.",
          steps: [
            {
              action: { kind: "command", id: "home.numberFormat", value: "Currency" },
              requires: { selection: ["B4:D8", "B:D"], sheet: "Sheet2" },
              selectHint: "Select the values, B4:D8, on the PivotTable sheet first.",
            },
          ],
        },
        {
          instruction: "An invoice was entered wrong. On the Spending sheet, change the amount in E5 to 412.50.",
          hint: "Click the Spending tab, click E5, type 412.50 and press Enter.",
          steps: [{ action: { kind: "type", target: "E5", value: ["412.50", "412.5", "$412.50"] }, requires: { sheet: "Spending" }, selectHint: "Switch to the Spending sheet first." }],
        },
        {
          instruction: "Go back to the PivotTable and refresh it so it picks up the corrected amount.",
          hint: "Click the Sheet2 tab and a cell in the PivotTable. PivotTable Analyze tab › Data group › Refresh (or Data tab › Refresh All).",
          steps: [{ action: { kind: "command", id: "data.refresh" }, requires: { sheet: "Sheet2" }, selectHint: "Switch to the PivotTable sheet (Sheet2) first." }],
        },
      ],
    },
  ],
};
