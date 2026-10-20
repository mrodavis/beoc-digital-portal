import type { SimDefinition } from "@/types/sim";
import { grid, MONEY, TITLE } from "./helpers";
import { PIVOT_WIDTHS, pivotSourceCells } from "./module6";

export const excelModule7Sims: Record<string, SimDefinition[]> = {
  "module-7::doing-more-with-pivottables": [
    {
      id: "excel-m7-more-pivottables-1",
      app: "excel",
      title: "Make the spending PivotTable easy to explore",
      scenario:
        "The practice manager wants to look at one department or vendor at a time without learning the PivotTable field list. Add a report filter, a slicer, a percentage view and a PivotChart.",
      fileName: "Spending Dashboard.xlsx",
      minutes: 6,
      initial: {
        active: "Spending Pivot",
        sheets: [
          {
            name: "Spending Pivot",
            colWidths: { A: 130, B: 120 },
            cells: {},
            pivot: { source: { sheet: "Spending", range: "A1:E21" }, rows: ["Category"], columns: [], values: [{ field: "Amount", fn: "Sum" }], filters: [], at: "A3" },
          },
          { name: "Spending", colWidths: PIVOT_WIDTHS, cells: pivotSourceCells() },
        ],
      },
      tasks: [
        {
          instruction: "Add Department to the Filters area of the PivotTable.",
          hint: "In the PivotTable Fields pane, drag Department into the Filters area (or use the arrow beside Department › Add to Report Filter).",
          steps: [{ action: { kind: "command", id: "pivot.area", value: "Department>Filters" }, requires: { sheet: "Spending Pivot" } }],
        },
        {
          instruction: "Filter the report to show only Family Medicine and Pediatrics.",
          hint: "Click the filter arrow in B1. Uncheck (All), check Family Medicine and Pediatrics, OK.",
          steps: [{ action: { kind: "command", id: "pivot.filter", value: "Department=Family Medicine|Pediatrics" }, requires: { sheet: "Spending Pivot" } }],
        },
        {
          instruction: "Clear the Department filter so every department shows again.",
          hint: "Click the filter arrow in B1, check (All), OK.",
          steps: [{ action: { kind: "command", id: "pivot.filter", value: "Department=*" }, requires: { sheet: "Spending Pivot" } }],
        },
        {
          instruction: "Insert a slicer for the Vendor field.",
          hint: "Click a cell in the PivotTable. PivotTable Analyze tab › Filter group › Insert Slicer (or Insert tab › Slicer). Choose Vendor, OK.",
          steps: [{ action: { kind: "dialog", id: "insertSlicer", values: { field: "Vendor" } }, requires: { sheet: "Spending Pivot" } }],
        },
        {
          instruction: "Use the slicer to show only Medline Industries.",
          hint: "Click Medline Industries in the Vendor slicer.",
          steps: [{ action: { kind: "command", id: "pivot.filter", value: "Vendor=Medline Industries" }, requires: { sheet: "Spending Pivot" } }],
        },
        {
          instruction: "Show the values as a percentage of the grand total.",
          hint: "Right-click a value in the PivotTable › Show Values As › % of Grand Total (or PivotTable Analyze › Field Settings › Show Values As tab).",
          steps: [
            {
              action: { kind: "command", id: "pivot.showAs", value: "% of Grand Total" },
              alt: [{ kind: "dialog", id: "valueFieldSettings", values: { showAs: "% of Grand Total" } }],
              requires: { sheet: "Spending Pivot" },
            },
          ],
        },
        {
          instruction: "Insert a Clustered Column PivotChart of the PivotTable.",
          hint: "Click a cell in the PivotTable. PivotTable Analyze tab › Tools group › PivotChart › Clustered Column, OK.",
          steps: [
            {
              action: { kind: "dialog", id: "insertChart", values: { type: "Clustered Column" } },
              alt: [{ kind: "command", id: "insert.chart", value: "Clustered Column" }],
              requires: { sheet: "Spending Pivot" },
            },
          ],
        },
      ],
    },
  ],

  "module-7::what-if-analysis": [
    {
      id: "excel-m7-what-if-1",
      app: "excel",
      title: "Hit the supply budget target",
      scenario:
        "Next year's supply budget must come in at $85,000, but the projection is higher. Let Goal Seek work backwards to the cost per visit you need, then find the June order that keeps the mid-year average on target.",
      fileName: "Supply Budget Model.xlsx",
      minutes: 5,
      initial: {
        active: "Budget Model",
        sheets: [
          {
            name: "Budget Model",
            colWidths: { A: 190, B: 100 },
            cells: {
              A1: { v: "FY27 Supply Budget Model", fmt: TITLE },
              A3: { v: "Projected patient visits" },
              B3: { v: 12000, fmt: { numFmt: "Number", decimals: 0 } },
              A4: { v: "Supply cost per visit" },
              B4: { v: 6.2, fmt: MONEY },
              A5: { v: "Fixed supply contracts" },
              B5: { v: 18000, fmt: MONEY },
              A7: { v: "Projected supply cost", fmt: { bold: true } },
              B7: { fmt: { numFmt: "Currency", bold: true } },
              A8: { v: "Budget target" },
              B8: { v: 85000, fmt: MONEY },
            },
          },
          {
            name: "Mid-Year",
            colWidths: { A: 120, B: 100 },
            cells: {
              ...grid("A1", [["Month", "Supply Orders"], ["January", 15820], ["February", 16240], ["March", 15410], ["April", 17080], ["May", 16650], ["June", null]], { header: true, colFmt: { B: MONEY } }),
              B7: { fmt: MONEY },
              A8: { v: "Average", fmt: { bold: true } },
              B8: { fmt: { numFmt: "Currency", bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In B7, calculate the projected supply cost: the visits in B3 times the cost per visit in B4, plus the fixed contracts in B5.",
          hint: "Click B7 and type =B3*B4+B5, then press Enter.",
          steps: [{ action: { kind: "type", target: "B7", value: ["=B3*B4+B5", "=B4*B3+B5", "=B5+B3*B4", "=B5+B4*B3", "=(B3*B4)+B5", "=B5+(B3*B4)"], match: "formula" } }],
        },
        {
          instruction: "Try a what-if by hand: visits may rise to 13,000. Type 13000 in B3.",
          hint: "Click B3, type 13000 and press Enter. The projection in B7 updates.",
          steps: [{ action: { kind: "type", target: "B3", value: ["13000", "13,000"] } }],
        },
        {
          instruction: "Use Goal Seek to find the cost per visit (B4) that brings the projected cost in B7 to 85000.",
          hint: "Data tab › Forecast group › What-If Analysis › Goal Seek. Set cell: B7. To value: 85000. By changing cell: B4. OK.",
          steps: [{ action: { kind: "dialog", id: "goalSeek", values: { setCell: ["B7", "$B$7"], toValue: "85000", byChanging: ["B4", "$B$4"] } } }],
        },
        {
          instruction: "On the Mid-Year sheet, in B8, calculate the average of the monthly orders in B2:B7.",
          hint: "Click the Mid-Year tab, click B8, type =AVERAGE(B2:B7) and press Enter.",
          steps: [
            {
              action: { kind: "type", target: "B8", value: "=AVERAGE(B2:B7)", match: "formula" },
              requires: { sheet: "Mid-Year" },
              selectHint: "Switch to the Mid-Year sheet first.",
            },
          ],
        },
        {
          instruction: "Use Goal Seek to find the June order amount (B7) that makes the average in B8 equal 16000.",
          hint: "Data tab › What-If Analysis › Goal Seek. Set cell: B8. To value: 16000. By changing cell: B7. OK.",
          steps: [
            {
              action: { kind: "dialog", id: "goalSeek", values: { setCell: ["B8", "$B$8"], toValue: "16000", byChanging: ["B7", "$B$7"] } },
              requires: { sheet: "Mid-Year" },
              selectHint: "Switch to the Mid-Year sheet first.",
            },
          ],
        },
      ],
    },
  ],

  "module-7::reference-styles": [
    {
      id: "excel-m7-reference-styles-1",
      app: "excel",
      title: "Read a workbook in R1C1 style",
      scenario:
        "A colleague's supply cost workbook opens with numbers instead of letters across the top, and formulas like =RC[-2]*RC[-1]. Nothing is broken: Excel is set to R1C1 reference style. Read it, then switch back.",
      fileName: "Supply Costs (shared).xlsx",
      minutes: 4,
      initial: {
        active: "Supply Costs",
        flags: { r1c1: true },
        sheets: [
          {
            name: "Supply Costs",
            colWidths: { A: 150, B: 48, C: 80, D: 90, E: 80, F: 70, G: 60 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Item", "Qty", "Unit Cost", "Line Total", "Tax"],
                  ["Nitrile gloves (M)", 30, 7.25, "=B2*C2", "=D2*$G$1"],
                  ["Exam table paper", 12, 18.5, "=B3*C3", "=D3*$G$1"],
                  ["Alcohol prep pads", 20, 4.4, "=B4*C4", "=D4*$G$1"],
                  ["Gauze pads 4x4", 18, 9.8, "=B5*C5", "=D5*$G$1"],
                  ["Specimen cups", 10, 22.4, "=B6*C6", "=D6*$G$1"],
                  ["Disinfecting wipes", 15, 8.75, "=B7*C7", "=D7*$G$1"],
                  ["Patient gowns", 10, 26, "=B8*C8", "=D8*$G$1"],
                  ["Urine test strips", 4, 31.25, "=B9*C9", "=D9*$G$1"],
                ],
                { header: true, colFmt: { C: MONEY, D: MONEY, E: MONEY } },
              ),
              F1: { v: "Tax Rate", fmt: { bold: true } },
              G1: { v: 0.08, fmt: { numFmt: "Percentage" } },
              A10: { v: "Total", fmt: { bold: true } },
              E10: { fmt: { numFmt: "Currency", bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In R1C1 style a cell is named by row number, then column number. Select the cell at R5C4.",
          hint: "Find row 5 and column 4 (the fourth column from the left), and click that cell. You can also type R5C4 in the Name Box and press Enter.",
          steps: [{ action: { kind: "select", target: "D5" } }],
        },
        {
          instruction: "The tax formula in R5C5 is =RC[-1]*R1C7. Select the cell that R1C7 refers to.",
          hint: "R1C7 has no brackets, so it is absolute: row 1, column 7. Click that cell (it holds the tax rate).",
          steps: [{ action: { kind: "select", target: "G1" } }],
        },
        {
          instruction: "Switch Excel back to the standard A1 reference style.",
          hint: "File tab › Options › (any category) › Formulas. Clear R1C1 reference style, then OK.",
          steps: [{ action: { kind: "command", id: "options.r1c1", value: "Off" } }],
        },
        {
          instruction: "Now in A1 style, total the Tax column: in E10, enter =SUM(E2:E9).",
          hint: "Click E10 and type =SUM(E2:E9), then press Enter (or use AutoSum).",
          steps: [
            {
              action: { kind: "type", target: "E10", value: "=SUM(E2:E9)", match: "formula" },
              alt: [{ kind: "command", id: "home.autosum", value: "Sum" }],
              requires: { selection: "E10" },
              selectHint: "Click E10 first.",
            },
          ],
        },
      ],
    },
  ],
};
