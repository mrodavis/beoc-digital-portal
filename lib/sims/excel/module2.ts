import type { SimDefinition } from "@/types/sim";

export const excelModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::intro-to-formulas": [
    {
      id: "excel-m2-intro-to-formulas-1",
      app: "excel",
      title: "Total the weekly supply order",
      scenario: "You manage supplies for the Lakeside Medical front office. The weekly order sheet lists quantities and unit prices, but nothing is calculated yet.",
      fileName: "Supply Order.xlsx",
      minutes: 5,
      initial: {
        active: "Order",
        sheets: [
          {
            name: "Order",
            colWidths: { A: 150, B: 70, C: 80, D: 90 },
            cells: {
              A1: { v: "Item", fmt: { bold: true } },
              B1: { v: "Qty", fmt: { bold: true } },
              C1: { v: "Unit Price", fmt: { bold: true } },
              D1: { v: "Line Total", fmt: { bold: true } },
              A2: { v: "Exam table paper" }, B2: { v: 12 }, C2: { v: 18.5 },
              A3: { v: "Nitrile gloves (box)" }, B3: { v: 30 }, C3: { v: 7.25 },
              A4: { v: "Sharps container" }, B4: { v: 6 }, C4: { v: 11 },
              A5: { v: "Alcohol prep pads" }, B5: { v: 20 }, C5: { v: 4.4 },
              A6: { v: "Order Total", fmt: { bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In cell D2, enter a formula that multiplies the quantity in B2 by the unit price in C2.",
          hint: "Click D2, type =B2*C2 and press Enter.",
          steps: [{ action: { kind: "type", target: "D2", value: ["=B2*C2", "=C2*B2"], match: "formula" } }],
        },
        {
          instruction: "Copy the formula in D2 down to D5 with the fill handle.",
          hint: "Select D2, then drag the small square at its bottom-right corner down to D5 (or select D2:D5 and press Ctrl+D).",
          steps: [{ action: { kind: "command", id: "excel.fill", value: "D2:D5" }, requires: { selection: "D2" }, alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }], selectHint: "Start from D2, the cell that holds the formula." }],
        },
        {
          instruction: "In D6, use AutoSum to total the line totals.",
          hint: "Click D6. Home tab › Editing group › AutoSum (or press Alt+=), then press Enter.",
          steps: [{ action: { kind: "command", id: "home.autosum", value: "Sum" }, requires: { selection: "D6" }, selectHint: "Click D6 first.", alt: [{ kind: "type", target: "D6", value: "=SUM(D2:D5)", match: "formula" }] }],
        },
        {
          instruction: "Format C2:D6 as Currency.",
          hint: "Select C2:D6. Home tab › Number group › Number Format box › Currency.",
          steps: [{ action: { kind: "command", id: "home.numberFormat", value: "Currency" }, requires: { selection: "C2:D6" }, selectHint: "Drag from C2 to D6 to select the price and total cells." }],
        },
        {
          instruction: "Sort the items from A to Z by item name.",
          hint: "Click any cell in A2:A5. Data tab › Sort A to Z.",
          steps: [{ action: { kind: "command", id: "data.sortAsc" }, requires: { selection: ["A2", "A3", "A4", "A5", "A1"] }, selectHint: "Click a cell in the Item column first." }],
        },
      ],
    },
  ],
};
