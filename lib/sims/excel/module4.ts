import type { SimDefinition } from "@/types/sim";
import { column, fmtOnly, grid, MONEY, PCT, TITLE } from "./helpers";

/** Every order of the factors in a product, e.g. B4*C4*$E$2 written any way round. */
function products(...factors: string[]): string[] {
  if (factors.length <= 1) return factors;
  const out: string[] = [];
  factors.forEach((f, i) => {
    for (const rest of products(...factors.filter((_, j) => j !== i))) out.push(`${f}*${rest}`);
  });
  return out;
}

/** The same products as formulas. */
const productFormulas = (...factors: string[]) => products(...factors).map((x) => `=${x}`);

const STAFF: [string, number, number, number, number][] = [
  ["Aisha Bello", 92, 88, 95, 81],
  ["Carlos Mendez", 78, 85, 72, 90],
  ["Dana Whitfield", 88, 91, 84, 86],
  ["Evan Brooks", 65, 74, 80, 69],
  ["Fatima Noor", 97, 93, 90, 94],
  ["Grace Park", 83, 79, 88, 77],
  ["Hector Ruiz", 71, 68, 75, 82],
  ["Imani Carter", 90, 95, 87, 89],
  ["Jamal Wright", 76, 82, 70, 73],
  ["Kim Tran", 85, 87, 93, 80],
  ["Luis Ortega", 62, 70, 66, 71],
  ["Maya Singh", 94, 89, 91, 96],
  ["Nora Kelly", 80, 77, 83, 85],
  ["Omar Haddad", 73, 81, 78, 68],
  ["Priya Shah", 88, 84, 96, 90],
];

export const excelModule4Sims: Record<string, SimDefinition[]> = {
  "module-4::complex-formulas-order-of-operations": [
    {
      id: "excel-m4-order-of-operations-1",
      app: "excel",
      title: "Calculate the supply invoice correctly",
      scenario:
        "You are finishing a supply invoice for Lakeside Medical Associates. Excel multiplies before it adds, so every formula below the line items needs parentheses in the right place.",
      fileName: "Supply Invoice.xlsx",
      minutes: 5,
      initial: {
        active: "Invoice",
        sheets: [
          {
            name: "Invoice",
            colWidths: { A: 250, B: 48, C: 80, D: 96 },
            cells: {
              A1: { v: "Lakeside Medical Associates - Supply Invoice", fmt: TITLE },
              ...grid(
                "A2",
                [
                  ["Item", "Qty", "Unit Price", "Line Total"],
                  ["Nitrile gloves (M), box", 30, 7.25, "=B3*C3"],
                  ["Exam table paper, case", 6, 18.5, "=B4*C4"],
                  ["Specimen cups, case", 4, 22.4, "=B5*C5"],
                  ["Disinfecting wipes, canister", 12, 8.75, "=B6*C6"],
                ],
                { header: true, colFmt: { C: MONEY, D: MONEY } },
              ),
              A7: { v: "Sales tax (7.5%)" },
              A8: { v: "Order total", fmt: { bold: true } },
              A9: { v: "Total after 10% discount", fmt: { bold: true } },
              A10: { v: "Handling fee" },
              A11: { v: "Shipping: 4% of (order total + handling fee)" },
              D7: { fmt: MONEY },
              D8: { fmt: { numFmt: "Currency", bold: true } },
              D9: { fmt: { numFmt: "Currency", bold: true } },
              D10: { v: 15, fmt: MONEY },
              D11: { f: "=D8+D10*4%", fmt: MONEY },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In D7, calculate the sales tax: the sum of the line totals in D3:D6 times 7.5%.",
          hint: "Click D7 and type =SUM(D3:D6)*7.5% (or =SUM(D3:D6)*0.075), then press Enter.",
          steps: [
            {
              action: {
                kind: "type",
                target: "D7",
                value: ["=SUM(D3:D6)*7.5%", "=SUM(D3:D6)*0.075", "=SUM(D3:D6)*.075", "=(D3+D4+D5+D6)*7.5%", "=(D3+D4+D5+D6)*0.075", "=7.5%*SUM(D3:D6)", "=0.075*SUM(D3:D6)"],
                match: "formula",
              },
            },
          ],
        },
        {
          instruction: "In D8, total the order: use SUM to add D3:D7.",
          hint: "Click D8 and type =SUM(D3:D7), then Enter (or use AutoSum and check that the range is D3:D7).",
          steps: [
            {
              action: { kind: "type", target: "D8", value: "=SUM(D3:D7)", match: "formula" },
              alt: [{ kind: "command", id: "home.autosum", value: "Sum" }],
              requires: { selection: "D8" },
              selectHint: "Click D8 first.",
            },
          ],
        },
        {
          instruction: "In D9, calculate the total after a 10% discount. With 10% off, the practice pays 90% of D8.",
          hint: "Click D9 and type =D8*90% (or =D8*(1-10%)), then press Enter.",
          steps: [
            {
              action: {
                kind: "type",
                target: "D9",
                value: ["=D8*90%", "=D8*0.9", "=D8*.9", "=D8*(1-10%)", "=D8*(1-0.1)", "=D8*(1-.1)", "=D8-D8*10%", "=D8-D8*0.1", "=D8-(D8*10%)", "=D8-(D8*0.1)", "=0.9*D8", "=90%*D8"],
                match: "formula",
              },
            },
          ],
        },
        {
          instruction: "The shipping formula in D11 multiplies before it adds. Replace it so shipping is 4% of the sum of the order total (D8) and the handling fee (D10).",
          hint: "Click D11 and type =(D8+D10)*4%, then press Enter. The parentheses make Excel add first.",
          steps: [
            {
              action: {
                kind: "type",
                target: "D11",
                value: ["=(D8+D10)*4%", "=(D8+D10)*0.04", "=(D8+D10)*.04", "=(D10+D8)*4%", "=(D10+D8)*0.04", "=4%*(D8+D10)", "=0.04*(D8+D10)", "=SUM(D8,D10)*4%", "=SUM(D8,D10)*0.04"],
                match: "formula",
              },
            },
          ],
        },
        {
          instruction: "Step through the shipping formula in D11 to see how Excel calculates it.",
          hint: "Click D11. Formulas tab › Formula Auditing group › Evaluate Formula, then click Evaluate.",
          steps: [{ action: { kind: "command", id: "formulas.evaluate" }, requires: { selection: "D11" }, selectHint: "Click D11, the shipping formula, first." }],
        },
      ],
    },
  ],

  "module-4::relative-and-absolute-cell-references": [
    {
      id: "excel-m4-cell-references-1",
      app: "excel",
      title: "Lock the tax rate before you copy",
      scenario:
        "You are calculating sales tax on the paper goods order for the staff appreciation lunch. The rate sits in E2, so the formula must lock onto E2 when it is copied down.",
      fileName: "Staff Lunch Order.xlsx",
      minutes: 5,
      initial: {
        active: "Paper Goods",
        sheets: [
          {
            name: "Paper Goods",
            colWidths: { A: 150, B: 80, C: 48, D: 80, E: 90 },
            cells: {
              A1: { v: "Paper Goods Order", fmt: TITLE },
              D2: { v: "Tax Rate:", fmt: { bold: true, align: "right" } },
              E2: { v: 0.08, fmt: { numFmt: "Percentage", decimals: 1 } },
              ...grid(
                "A3",
                [
                  ["Item", "Unit Price", "Qty", "Sales Tax", "Line Total"],
                  ["Paper plates, 100 ct", 6.49, 4, null, null],
                  ["Napkins, 250 ct", 4.25, 3, null, null],
                  ["Paper cups, 50 ct", 3.99, 6, null, null],
                  ["Plastic cutlery set", 8.75, 2, null, null],
                  ["Paper towels, 6 rolls", 11.2, 2, null, null],
                  ["Table covers", 2.5, 5, null, null],
                  ["Tissue boxes, 3 pack", 7.4, 2, null, null],
                  ["Serving trays", 5.6, 3, null, null],
                  ["Trash bags, 40 ct", 9.15, 1, null, null],
                ],
                { header: true, colFmt: { B: MONEY, D: MONEY } },
              ),
              ...column("E", 4, 12, "=B{r}*C{r}+D{r}", MONEY),
              A13: { v: "Total", fmt: { bold: true } },
              E13: { f: "=SUM(E4:E12)", fmt: { numFmt: "Currency", bold: true } },
            },
          },
          {
            name: "Catering Invoice",
            colWidths: { A: 150, B: 20, C: 96 },
            cells: {
              A1: { v: "Staff Appreciation Lunch", fmt: TITLE },
              ...grid("A3", [["Food", null, 450], ["Beverages", null, 120], ["Paper goods", null, 0], ["Delivery", null, 35]], { colFmt: { C: MONEY } }),
              A7: { v: "Total", fmt: { bold: true } },
              C7: { f: "=SUM(C3:C6)", fmt: { numFmt: "Currency", bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In D4, calculate the sales tax: the unit price in B4 times the quantity in C4 times the tax rate in E2. Use an absolute reference for E2.",
          hint: "Click D4 and type =B4*C4*$E$2 (type E2, then press F4 to add the dollar signs), then press Enter.",
          steps: [{ action: { kind: "type", target: "D4", value: productFormulas("B4", "C4", "$E$2"), match: "formula", strictRefs: true } }],
        },
        {
          instruction: "Copy the formula in D4 down through D12.",
          hint: "Select D4 and double-click the fill handle (or drag it down to D12).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "D4:D12" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["D4", "D4:D12"] },
              selectHint: "Start from D4 (or select D4:D12 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "The tax rate changed. Type 6.5% in E2 and check that every tax amount updates.",
          hint: "Click E2, type 6.5% and press Enter. Because each formula points at $E$2, they all recalculate.",
          steps: [{ action: { kind: "type", target: "E2", value: ["6.5%", "0.065"] } }],
        },
        {
          instruction: "On the Catering Invoice sheet, replace the 0 in C5 with a reference to the paper goods total in cell E13 of the Paper Goods sheet.",
          hint: "Click the Catering Invoice tab, click C5, type ='Paper Goods'!E13 and press Enter. The quotes are needed because the sheet name has a space.",
          steps: [
            {
              action: { kind: "type", target: "C5", value: "='Paper Goods'!E13", match: "formula" },
              requires: { sheet: "Catering Invoice" },
              selectHint: "Switch to the Catering Invoice sheet first.",
            },
          ],
        },
      ],
    },
    {
      id: "excel-m4-cell-references-2",
      app: "excel",
      title: "Build the payer fee grid with mixed references",
      scenario:
        "The billing office wants expected payments for each visit type and payer. One formula, filled across and down, can build the whole grid if it locks the right row and column.",
      fileName: "Payer Fee Grid.xlsx",
      minutes: 4,
      initial: {
        active: "Fee Grid",
        sheets: [
          {
            name: "Fee Grid",
            colWidths: { A: 140, B: 76, C: 82, D: 82, E: 90, F: 82 },
            cells: {
              A1: { v: "Expected Payment by Visit Type and Payer", fmt: TITLE },
              ...grid("A2", [["Visit Type", "Base Fee", "Medicare", "Medicaid", "Commercial", "Self-pay"]], { header: true }),
              A3: { v: "Payer rate", fmt: { italic: true } },
              ...grid("C3", [[0.82, 0.7, 1.1, 0.9]], { colFmt: { C: PCT, D: PCT, E: PCT, F: PCT } }),
              ...fmtOnly("C4:F10", MONEY),
              ...grid(
                "A4",
                [
                  ["New patient visit", 180],
                  ["Established visit", 120],
                  ["Annual physical", 210],
                  ["Flu shot", 45],
                  ["Lab draw", 30],
                  ["ECG", 85],
                  ["Telehealth visit", 95],
                ],
                { colFmt: { B: MONEY } },
              ),
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In C4, multiply the base fee in B4 by the Medicare rate in C3. Lock column B in the fee and row 3 in the rate so the formula can be filled across and down.",
          hint: "Click C4 and type =$B4*C$3 (press F4 to cycle through $B$4, B$4, $B4), then press Enter.",
          steps: [
            {
              action: { kind: "type", target: "C4", value: ["=$B4*C$3", "=C$3*$B4"], match: "formula", strictRefs: true },
            },
          ],
        },
        {
          instruction: "Fill the formula in C4 right through F4.",
          hint: "Select C4 and drag the fill handle right to F4 (or select C4:F4 and press Ctrl+R).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "C4:F4" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Right" }],
              requires: { selection: ["C4", "C4:F4"] },
              selectHint: "Start from C4 (or select C4:F4 for Ctrl+R).",
            },
          ],
        },
        {
          instruction: "Fill C4:F4 down through row 10 to complete the grid.",
          hint: "Select C4:F4 and drag the fill handle down to row 10 (or select C4:F10 and press Ctrl+D).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "C4:F10" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["C4:F4", "C4:F10"] },
              selectHint: "Select C4:F4, the filled row, first (or C4:F10 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "Medicare updated its rate. Type 85% in C3 and watch the whole Medicare column update.",
          hint: "Click C3, type 85% and press Enter.",
          steps: [{ action: { kind: "type", target: "C3", value: ["85%", "0.85"] } }],
        },
      ],
    },
  ],

  "module-4::excel-functions": [
    {
      id: "excel-m4-functions-1",
      app: "excel",
      title: "Summarize the skills check scores",
      scenario:
        "You track competency scores for the medical assistants at Lakeside. Build each person's average, then the lowest, median and highest score for every skill.",
      fileName: "MA Skills Check.xlsx",
      minutes: 6,
      initial: {
        active: "Skills Check",
        sheets: [
          {
            name: "Skills Check",
            rows: 22,
            colWidths: { A: 120, B: 64, C: 72, D: 72, E: 82, F: 72 },
            cells: {
              A1: { v: "MA Skills Check - Fall Cohort", fmt: TITLE },
              ...grid("A2", [["Staff Member", "Vitals", "Injections", "EHR Entry", "Phlebotomy", "Average"], ...STAFF], { header: true }),
              A18: { v: "Lowest", fmt: { bold: true } },
              A19: { v: "Median", fmt: { bold: true } },
              A20: { v: "Highest", fmt: { bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In F3, calculate the average of the four scores in B3:E3.",
          hint: "Click F3 and type =AVERAGE(B3:E3), then Enter. (Or Home tab › AutoSum arrow › Average.)",
          steps: [
            {
              action: { kind: "type", target: "F3", value: "=AVERAGE(B3:E3)", match: "formula" },
              alt: [
                { kind: "command", id: "home.autosum", value: "Average" },
                { kind: "dialog", id: "insertFunction", values: { fn: "AVERAGE", args: "B3:E3" } },
              ],
              requires: { selection: "F3" },
              selectHint: "Click F3 first.",
            },
          ],
        },
        {
          instruction: "Copy the formula in F3 down through F17.",
          hint: "Select F3 and double-click the fill handle (or drag it down to F17).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "F3:F17" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["F3", "F3:F17"] },
              selectHint: "Start from F3 (or select F3:F17 for Ctrl+D).",
            },
          ],
        },
        {
          instruction: "In B18, use AutoSum to find the lowest Vitals score in B3:B17.",
          hint: "Click B18. Home tab › Editing group › AutoSum arrow › Min, then Enter.",
          steps: [
            {
              action: { kind: "command", id: "home.autosum", value: "Min" },
              alt: [{ kind: "type", target: "B18", value: "=MIN(B3:B17)", match: "formula" }],
              requires: { selection: "B18" },
              selectHint: "Click B18 first.",
            },
          ],
        },
        {
          instruction: "In B19, use the Function Library to find the median of B3:B17.",
          hint: "Click B19. Formulas tab › Function Library › More Functions › MEDIAN. Make sure the argument is B3:B17, then OK.",
          steps: [
            {
              action: { kind: "type", target: "B19", value: "=MEDIAN(B3:B17)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "MEDIAN", args: "B3:B17" } }],
              requires: { selection: "B19" },
              selectHint: "Click B19 first.",
            },
          ],
        },
        {
          instruction: "In B20, enter a function that finds the highest score in B3:B17.",
          hint: "Click B20 and type =MAX(B3:B17), then press Enter.",
          steps: [
            {
              action: { kind: "type", target: "B20", value: "=MAX(B3:B17)", match: "formula" },
              alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "MAX", args: "B3:B17" } }],
              requires: { selection: "B20" },
              selectHint: "Click B20 first.",
            },
          ],
        },
        {
          instruction: "Copy B18:B20 across through column F.",
          hint: "Select B18:B20 and drag the fill handle right to column F (or select B18:F20 and press Ctrl+R).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "B18:F20" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Right" }],
              requires: { selection: ["B18:B20", "B18:F20"] },
              selectHint: "Select B18:B20, the three summary formulas, first.",
            },
          ],
        },
      ],
    },
    {
      id: "excel-m4-functions-2",
      app: "excel",
      title: "Count the stock and flag reorders",
      scenario:
        "Half-way through the monthly stock count, the supervisor wants to know how many items are counted, how many are listed, and which ones need reordering.",
      fileName: "Stock Count.xlsx",
      minutes: 5,
      initial: {
        active: "Stock",
        sheets: [
          {
            name: "Stock",
            colWidths: { A: 150, B: 70, C: 92, D: 76, F: 110, G: 70 },
            cells: {
              ...grid(
                "A1",
                [
                  ["Item", "On Hand", "Reorder Level", "Status"],
                  ["Nitrile gloves (M)", 8, 10, null],
                  ["Exam table paper", 14, 6, null],
                  ["Alcohol prep pads", null, 10, null],
                  ["Gauze pads 4x4", 15, 8, null],
                  ["Sharps container", 3, 4, null],
                  ["Specimen cups", 9, 8, null],
                  ["Disinfecting wipes", null, 12, null],
                  ["Hand sanitizer 1 L", 11, 6, null],
                  ["Patient gowns", 30, 20, null],
                  ["Urine test strips", 2, 4, null],
                  ["Thermometer covers", 40, 25, null],
                  ["Tongue depressors", null, 5, null],
                  ["Copy paper, case", 4, 3, null],
                ],
                { header: true },
              ),
              F2: { v: "Items counted", fmt: { bold: true } },
              F3: { v: "Items listed", fmt: { bold: true } },
              F4: { v: "Units on hand", fmt: { bold: true } },
            },
          },
        ],
      },
      tasks: [
        {
          instruction: "In G2, count how many items already have an On Hand number in B2:B14.",
          hint: "Click G2 and type =COUNT(B2:B14), then Enter. COUNT counts only cells that contain numbers.",
          steps: [{ action: { kind: "type", target: "G2", value: "=COUNT(B2:B14)", match: "formula" }, alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "COUNT", args: "B2:B14" } }], requires: { selection: "G2" }, selectHint: "Click G2 first." }],
        },
        {
          instruction: "In G3, count how many items are listed in A2:A14.",
          hint: "Click G3 and type =COUNTA(A2:A14), then Enter. COUNTA counts any cell that is not empty, text included.",
          steps: [{ action: { kind: "type", target: "G3", value: "=COUNTA(A2:A14)", match: "formula" }, alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "COUNTA", args: "A2:A14" } }], requires: { selection: "G3" }, selectHint: "Click G3 first." }],
        },
        {
          instruction: "In G4, total the units on hand in B2:B14.",
          hint: "Click G4 and type =SUM(B2:B14), then press Enter.",
          steps: [{ action: { kind: "type", target: "G4", value: "=SUM(B2:B14)", match: "formula" }, alt: [{ kind: "dialog", id: "insertFunction", values: { fn: "SUM", args: "B2:B14" } }], requires: { selection: "G4" }, selectHint: "Click G4 first." }],
        },
        {
          instruction: "In D2, enter a formula that shows \"Reorder\" when On Hand (B2) is less than the Reorder Level (C2), and \"OK\" otherwise.",
          hint: "Click D2 and type =IF(B2<C2,\"Reorder\",\"OK\"), then press Enter.",
          steps: [
            {
              action: {
                kind: "type",
                target: "D2",
                value: ['=IF(B2<C2,"Reorder","OK")', '=IF(C2>B2,"Reorder","OK")', '=IF(B2>=C2,"OK","Reorder")', '=IF(C2<=B2,"OK","Reorder")'],
                match: "formula",
              },
            },
          ],
        },
        {
          instruction: "Copy the formula in D2 down through D14.",
          hint: "Select D2 and double-click the fill handle (or drag it down to D14).",
          steps: [
            {
              action: { kind: "command", id: "excel.fill", value: "D2:D14" },
              alt: [{ kind: "command", id: "home.fillSeries", value: "Down" }],
              requires: { selection: ["D2", "D2:D14"] },
              selectHint: "Start from D2 (or select D2:D14 for Ctrl+D).",
            },
          ],
        },
      ],
    },
  ],
};
