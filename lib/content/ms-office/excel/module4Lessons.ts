import { Lesson } from "@/types/lesson";

export const excelModule4Lessons: Lesson[] = [

// ============================================================
// LESSON 1 – COMPLEX FORMULAS
// ============================================================

{
  slug: "complex-formulas-order-of-operations",
  title: "Complex Formulas & Order of Operations",
  description:
    "Use PEMDAS and parentheses to control calculation order when building multi-step formulas such as subtotals and tax.",
  objectives: [
    "Predict the result of a formula using the order of operations",
    "Use parentheses to make evaluation order explicit",
    "Break a long formula into intermediate steps for auditability",
    "Use Evaluate Formula to see how Excel works through a calculation",
  ],
  duration: "12 min",

  videoUrl: "https://www.youtube.com/embed/J-W3thqtDpQ",

  practiceFiles: [
    {
      name: "Complex Formulas Practice File",
      url: "/practice/excel/module-4/complex-formulas/Excel_ComplexFormulas_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "Excel follows precedence, not reading order",
       blocks: [
         {
           type: "scenario",
           role: "You calculate supply costs with tax at Lakeside Medical Associates.",
           text: "You write =C2+D2*0.08 intending to add the item cost to the tax. Excel multiplies first, so it adds 8% of the shipping to the item price instead. Every line is wrong by a small amount, which is exactly the kind of error nobody notices for months.",
           task: "Know the order Excel evaluates in, and use parentheses so intent is never ambiguous.",
         },
         {
           type: "paragraph",
           text: "Excel evaluates in a fixed order regardless of how the formula reads left to right: parentheses first, then exponents, then multiplication and division, then addition and subtraction. Operators at the same level evaluate left to right. So =2+3*4 is 14, not 20 — the multiplication happens first.",
         },
         {
           type: "table",
           caption: "Order of operations",
           columns: [
             "Order",
             "Operators",
             "Example",
           ],
           rows: [
             [
               "1",
               "Parentheses ( )",
               "=(2+3)*4 gives 20",
             ],
             [
               "2",
               "Exponents ^",
               "=2^3*4 gives 32",
             ],
             [
               "3",
               "Multiplication and division * /",
               "=2+3*4 gives 14",
             ],
             [
               "4",
               "Addition and subtraction + -",
               "=2+3-1 gives 4",
             ],
             [
               "5",
               "Comparison = < > <= >= <>",
               "=A1>B1 gives TRUE or FALSE",
             ],
           ],
         },
         {
           type: "tip",
           text: "Add parentheses even where precedence already gives the right answer. =(C2*D2)+(E2*F2) and =C2*D2+E2*F2 produce the same number, but the first states its intent, and the next person to edit it — quite possibly you — will not have to work out whether the omission was deliberate.",
         },
         {
           type: "callout",
           variant: "info",
           text: "For a formula you cannot reason about, select the cell and use Formulas > Evaluate Formula. It steps through the calculation one operation at a time, showing intermediate results. It is the fastest way to find where a long formula diverges from what you intended.",
         },
       ],
     },

    // ------------------------------------------------------------
    // PEMDAS Overview
    // ------------------------------------------------------------

    {
      heading: "Order of Operations (PEMDAS)",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a formula includes multiple operators, Excel follows an order of operations. PEMDAS stands for Parentheses, Exponents, Multiplication, Division, Addition, and Subtraction.",
        },
        {
          type: "paragraph",
          text:
            "If a result looks incorrect, it is often because Excel evaluated a part of the formula in a different order than you expected.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_order1.png",
          alt: "Using the order of operations (PEMDAS) graphic",
          caption:
            "Excel evaluates formulas in this order unless parentheses change it.",
        },
        {
          type: "paragraph",
          text:
            "Excel evaluates expressions inside parentheses first before moving on to other operations.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_order2.png",
          alt: "Parentheses step highlighted",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_order3.png",
          alt: "Exponents step highlighted",
        },
        {
          type: "paragraph",
          text:
            "After parentheses, Excel evaluates exponents if present.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_order4.png",
          alt: "Multiplication and division step highlighted",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_order5.png",
          alt: "Division step result",
        },
        {
          type: "paragraph",
          text:
            "Multiplication and division are evaluated next, working from left to right.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_order6.png",
          alt: "Addition and subtraction step highlighted",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_order7.png",
          alt: "Final simplification step",
        },
        {
          type: "paragraph",
          text:
            "Finally, Excel performs addition and subtraction from left to right.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_order8.png",
          alt: "Final answer shown",
        },
      ],
    },

    // ------------------------------------------------------------
    // Subtotal Example
    // ------------------------------------------------------------

    {
      heading: "Building a Subtotal Formula",
      blocks: [
        {
          type: "paragraph",
          text:
            "A subtotal often involves adding multiple calculations together. In this example, we multiply Unit Price by Quantity for each item, then add the results.",
        },
        {
          type: "paragraph",
          text:
            "Click the subtotal cell first, then type an equals sign (=) to begin entering your formula.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_subtotal_cell.png",
          alt: "Subtotal cell selected",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_subtotal_formula.png",
          alt: "Subtotal formula entered",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_subtotal_parentheses.png",
          alt: "Subtotal formula improved with parentheses",
        },
        {
          type: "paragraph",
          text:
            "By adding parentheses, Excel performs the multiplication steps first before summing the results. If your subtotal seems too large or too small, check whether parentheses are controlling the order properly.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_subtotal_result.png",
          alt: "Subtotal result displayed",
        },
      ],
    },

    // ------------------------------------------------------------
    // Tax Formula Example
    // ------------------------------------------------------------

    {
      heading: "Calculating Tax Correctly",
      blocks: [
        {
          type: "paragraph",
          text:
            "To calculate tax, you typically add totals first, then multiply by the tax rate. Parentheses ensure Excel performs the addition before multiplying.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_tax_formula.png",
          alt: "Correct tax formula using parentheses",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_tax_incorrect.png",
          alt: "Incorrect tax formula without parentheses",
          caption:
            "Without parentheses, Excel multiplies before adding, which changes the result.",
        },
        {
          type: "paragraph",
          text:
            "If your tax calculation is incorrect, check whether Excel multiplied something before completing the addition.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/complex_tax_result.png",
          alt: "Correct tax result displayed",
        },
      ],
    },

    {
      heading: "Key Takeaways",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "Excel follows PEMDAS automatically.",
            "Use parentheses to control the order of calculations.",
            "Multiplication and division happen before addition and subtraction.",
            "If totals look wrong, check parentheses first.",
          ],
        },
      ],
    },
    {
      heading: "Understanding Excel's Order of Operations (PEMDAS)",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel calculates complex formulas using a specific hierarchy known as the Order of Operations. If you do not understand this hierarchy, your formulas may return unexpected results.",
        },
        {
          type: "paragraph",
          text:
            "Excel follows PEMDAS: Parentheses, Exponents, Multiplication, Division, Addition, and Subtraction.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/complex-formulas/pemdas-infographic.png",
          alt: "Excel Order of Operations PEMDAS infographic",
          caption:
            "Excel calculates formulas using PEMDAS. Multiplication and division are solved left-to-right, as are addition and subtraction.",
        },
        {
          type: "paragraph",
          text:
            "When operators share the same priority level—such as multiplication and division—Excel evaluates them from left to right.",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "In the formula =2+3*4, what is the result?",
          options: [
            "20",
            "14",
            "24",
            "11",
          ],
          correctIndex: 1,
          explanation: "Multiplication is evaluated before addition, so Excel computes 3*4 = 12 first and then adds 2, giving 14. Writing =(2+3)*4 would give 20.",
          optionRationales: [
            "20 is what you get from =(2+3)*4, where parentheses force the addition first.",
            "Correct. 3*4 is evaluated first, then 2 is added, giving 14.",
            "24 would require multiplying 2, 3, and 4 together, which the formula does not do.",
            "11 would result from 2+3*3 or a similar variation. The multiplication here yields 12, not 9.",
          ],
        },
      ],
    },
  ],

  // ------------------------------------------------------------
  // CHALLENGE
  // ------------------------------------------------------------

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks using the practice workbook:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Download the practice file above.",
        "Click the Challenge worksheet tab in the bottom-left of the workbook.",
      ],
    },
    {
      type: "paragraph",
      text:
        "Click cell D7 first. Type an equals sign (=) to begin your formula.",
    },
    {
      type: "paragraph",
      text:
        "In cell D7, create a formula that calculates the tax for the invoice. Use a sales tax rate of 7.5%. (You can enter 7.5% directly, or use 0.075.)",
    },
    {
      type: "paragraph",
      text:
        "In cell D8, calculate the total for the order. Use SUM to add cells D3:D7.",
    },
    {
      type: "paragraph",
      text:
        "In cell D9, calculate the total after a 10% discount. A 10% discount means you pay 90% of the total.",
    },
    {
      type: "paragraph",
      text:
        "If your totals look too high or too low, double-check your parentheses and percent formatting.",
    },
    {
      type: "paragraph",
      text:
        "When you are finished, your spreadsheet should look like this:",
    },
    {
      type: "image",
      src: "/images/excel/module-4/complex-formulas/intro-formulas-final-result.png",
      alt: "Final expected results for complex formulas challenge",
    },
  ],
},

// ============================================================
// LESSON 2 – RELATIVE & ABSOLUTE CELL REFERENCES
// ============================================================

{
  slug: "relative-and-absolute-cell-references",
  title: "Relative & Absolute Cell References",
  description:
    "Learn how relative, absolute, and mixed references behave when formulas are copied, and how to reference cells across worksheets.",
  objectives: [
    "Explain how relative references shift when a formula is copied",
    "Use absolute references to anchor a formula to a fixed cell",
    "Use mixed references to lock only a row or only a column",
    "Cycle reference types with F4 while editing",
  ],
  duration: "25 min",

  videoUrl: "https://www.youtube.com/embed/iDg9s7BJ2m4",

  practiceFiles: [
    {
      name: "Cell References Practice File",
      url: "/practice/excel/module-4/relative-absolute/Excel_CellReferences_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "The dollar sign means 'do not move this'",
       blocks: [
         {
           type: "scenario",
           role: "You apply a tax rate across the supply sheet at Lakeside Medical Associates.",
           text: "The rate is in F1. You write =E2*F1 in the first row and fill down. Row 3 becomes =E3*F2, row 4 becomes =E4*F3 — the reference slid down with the formula, off the rate and into empty cells. Every row below the first is now wrong, and most show a plausible-looking zero.",
           task: "Control which parts of a reference move when a formula is copied.",
         },
         {
           type: "paragraph",
           text: "A relative reference like F1 is really an instruction about position: 'the cell one column right and one row up from me.' Copy the formula down and that instruction is re-evaluated from the new location, which is why it slides. This is exactly what you want for =C2*D2, and exactly what you do not want for a rate cell.",
         },
         {
           type: "paragraph",
           text: "A dollar sign freezes the part it precedes. $F$1 is fully absolute and never moves. F$1 locks the row but lets the column shift. $F1 locks the column but lets the row shift. These mixed forms are what let a single formula fill across a whole grid — a rate table where one axis is fixed by row and the other by column.",
         },
         {
           type: "table",
           caption: "Reference types",
           columns: [
             "Written",
             "Called",
             "When copied",
           ],
           rows: [
             [
               "F1",
               "Relative",
               "Both column and row shift",
             ],
             [
               "$F$1",
               "Absolute",
               "Never changes",
             ],
             [
               "F$1",
               "Mixed — row locked",
               "Column shifts, row stays at 1",
             ],
             [
               "$F1",
               "Mixed — column locked",
               "Row shifts, column stays at F",
             ],
           ],
         },
         {
           type: "tip",
           text: "While editing a formula, put the cursor in a reference and press F4 to cycle F1 → $F$1 → F$1 → $F1 → F1. It is far faster than typing dollar signs and is the standard way experienced users set reference types.",
         },
       ],
     },

    // ------------------------------------------------------------
    // RELATIVE REFERENCES
    // ------------------------------------------------------------

    {
      heading: "Understanding Relative References",
      blocks: [
        {
          type: "paragraph",
          text:
            "Relative references are Excel’s default behavior. When a formula is copied, the row and column references adjust automatically.",
        },
        {
          type: "paragraph",
          text:
            "Click cell D4 first, then type an equals sign (=) to begin entering your formula.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_relative_cell.png",
          alt: "Selecting first cell for relative reference formula",
        },
        {
          type: "paragraph",
          text:
            "Enter the formula =B4*C4 to multiply Unit Price by Quantity.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_relative_formula.png",
          alt: "Relative reference formula entered",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_relative_result.png",
          alt: "First relative reference result",
        },
        {
          type: "paragraph",
          text:
            "Use the fill handle to copy the formula downward.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_relative_handle.png",
          alt: "Dragging relative reference fill handle",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_relative_fill.png",
          alt: "Relative reference copied down",
        },
        {
          type: "paragraph",
          text:
            "Notice how each row now references the corresponding unit price and quantity automatically.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_relative_check_v2.png",
          alt: "Relative references updated correctly",
        },
        {
          type: "paragraph",
          text:
            "Because the references were relative, Excel adjusted the row numbers automatically as the formula was copied.",
        },
      ],
    },

    // ------------------------------------------------------------
    // ABSOLUTE REFERENCES
    // ------------------------------------------------------------

    {
      heading: "Locking a Cell with Absolute References",
      blocks: [
        {
          type: "paragraph",
          text:
            "If a formula uses a value that should not change — such as a tax rate — we must lock the reference.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_absolute_cell.png",
          alt: "Selecting cell for absolute reference formula",
        },
        {
          type: "paragraph",
          text:
            "Without locking the tax rate in E2, copying the formula causes incorrect results.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_absolute_error.png",
          alt: "Incorrect calculation without absolute reference",
        },
        {
          type: "paragraph",
          text:
            "Because the reference was not locked, Excel shifted the tax rate cell as the formula was copied.",
        },
        {
          type: "paragraph",
          text:
            "If you ever see your tax rate changing as you copy a formula, it usually means the reference was not locked.",
        },
        {
          type: "paragraph",
          text:
            "Add dollar signs to lock the reference. $E$2 locks both the column and row. You can also click the cell reference and press F4 to insert the dollar signs automatically.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_absolute_formula.png",
          alt: "Formula using $E$2 absolute reference",
        },
        {
          type: "paragraph",
          text:
            "Now copy the formula down using the fill handle.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_absolute_handle.png",
          alt: "Dragging absolute reference fill handle",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_absolute_fill.png",
          alt: "Absolute reference copied correctly",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_absolute_check_v2.png",
          alt: "Absolute reference remains locked",
        },
      ],
    },

    {
      heading: "Final Result with Absolute Reference Applied",
      blocks: [
        {
          type: "paragraph",
          text:
            "After locking the tax rate and copying the formula down, every row calculates correctly.",
        },
        {
          type: "paragraph",
          text:
            "The tax rate remains fixed while unit prices and quantities adjust normally.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references-absolute-final-result.png",
          alt: "Final correct results after applying absolute reference",
        },
      ],
    },

    // ------------------------------------------------------------
    // MIXED REFERENCES
    // ------------------------------------------------------------

    {
      heading: "Mixed References",
      blocks: [
        {
          type: "paragraph",
          text:
            "Excel allows partial locking of either rows or columns. This is called a mixed reference.",
        },
        {
          type: "paragraph",
          text:
            "Mixed references are commonly used when building structured financial models or multiplication tables.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_absolute_graphic.png",
          alt: "Graphic showing relative, absolute, and mixed references",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "$A$2 → Fully absolute (row and column locked)",
            "A$2 → Row locked, column relative",
            "$A2 → Column locked, row relative",
            "A2 → Fully relative",
          ],
        },
      ],
    },

    // ------------------------------------------------------------
    // CROSS-SHEET REFERENCES
    // ------------------------------------------------------------

    {
      heading: "Referencing Cells Across Worksheets",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can reference cells from another worksheet using the format SheetName!CellAddress.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_sheet_worksheet.png",
          alt: "Switching worksheets",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_sheet_cell.png",
          alt: "Selecting cell in another worksheet",
        },
        {
          type: "paragraph",
          text:
            "When referencing another worksheet, Excel automatically inserts the sheet name followed by an exclamation point.",
        },
        {
          type: "paragraph",
          text:
            "If the sheet name contains spaces, Excel will wrap it in single quotation marks. Example: ='Paper Goods'!E13",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_sheet2_formula.png",
          alt: "Cross-sheet formula entered",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_sheet2_result.png",
          alt: "Cross-sheet reference result",
        },
        {
          type: "paragraph",
          text:
            "If the sheet name or cell reference is incorrect, Excel will return a #REF! error.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/relative-absolute/references_sheet_error.png",
          alt: "Error when worksheet reference is incorrect",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which symbol makes a cell reference absolute in Excel?",
          options: [
            "Ampersand (&)",
            "Asterisk (*)",
            "Hash (#)",
            "Dollar sign ($)",
          ],
          correctIndex: 3,
          explanation: "The dollar sign locks the part of the reference that follows it. $F$1 is fully absolute and never shifts when copied; F$1 and $F1 lock only the row or only the column.",
          optionRationales: [
            "The ampersand joins text values together — =A1&\" \"&B1 concatenates. It has nothing to do with reference behavior.",
            "The asterisk is the multiplication operator, and also a wildcard in searches.",
            "The hash appears in error displays like ##### and in modern spill references, but it does not make a reference absolute.",
            "Correct. The dollar sign locks the column or row it precedes, so $F$1 never moves when copied.",
          ],
        },
      ],
    },

  ],

  // ------------------------------------------------------------
  // CHALLENGE
  // ------------------------------------------------------------

  challenge: [
    {
      type: "list",
      ordered: true,
      items: [
        "Download the Cell References practice workbook.",
        "Click the Paper Goods tab at the bottom-left of the workbook.",
      ],
    },
    {
      type: "paragraph",
      text:
        "Click cell D4 and begin your formula with =.",
    },
    {
      type: "paragraph",
      text:
        "In cell D4, enter a formula that multiplies the unit price in B4, the quantity in C4, and the tax rate in E2. Make sure to use an absolute reference for the tax rate ($E$2) because it must remain constant.",
    },
    {
      type: "paragraph",
      text:
        "Use the fill handle to copy the formula to cells D5:D12.",
    },
    {
      type: "paragraph",
      text:
        "Change the tax rate in cell E2 to 6.5%. If your totals did not update correctly, check whether E2 was locked properly using $E$2.",
    },
    {
      type: "paragraph",
      text:
        "When you're finished, your workbook should look like this:",
    },
    {
      type: "image",
      src: "/images/excel/module-4/relative-absolute/references-absolute-final-result.png",
      alt: "Completed Paper Goods worksheet with updated tax rate",
    },
    {
      type: "list",
      ordered: true,
      start: 6,
      items: [
        "Click the Catering Invoice tab.",
        "Delete the value in cell C5 and replace it with a reference to the total cost of the paper goods (cell E13 on the Paper Goods worksheet).",
        "Use the same steps to calculate the sales tax for each item on the Menu Order worksheet. The total in cell E14 should update.",
        "In cell C4 of the Catering Invoice worksheet, create a reference to the updated total.",
      ],
    },
    {
      type: "paragraph",
      text:
        "When you're finished, the Catering Invoice worksheet should look like this:",
    },
    {
      type: "image",
      src: "/images/excel/module-4/relative-absolute/excel_2016_cell_ref_challenge_edited.png",
      alt: "Completed Catering Invoice worksheet",
    },
  ],
},

// ============================================================
// LESSON 3 – FUNCTIONS
// ============================================================

{
  slug: "excel-functions",
  title: "Working with Functions",
  description:
    "Learn how to use Excel functions including SUM, AVERAGE, COUNT, MAX, MIN, COUNTA, and NETWORKDAYS. Understand syntax, arguments, and how to insert functions using AutoSum and the Function Library.",
  objectives: [
    "Use SUM, AVERAGE, COUNT, MIN, and MAX correctly",
    "Explain what COUNT counts and how COUNTA differs",
    "Use IF to return different values based on a condition",
    "Read a function's arguments from the ScreenTip while typing",
  ],
  duration: "35 min",

  videoUrls: [
    "https://www.youtube.com/embed/-9d4m79twdA",
    "https://www.youtube.com/embed/4MxeY2m-hcI",
  ],

  practiceFiles: [
    {
      name: "Functions Practice Workbook",
      url: "/practice/excel/module-4/functions/Excel_Functions_Practice.xlsx",
    },
  ],

  sections: [

    {
       heading: "Functions are named calculations that survive editing",
       blocks: [
         {
           type: "scenario",
           role: "You total supply costs at Lakeside Medical Associates.",
           text: "You write =E2+E3+E4+E5+E6 to total five items. A sixth item is added on a new row inside that range, and the total silently ignores it. The number looks entirely reasonable, so the omission is never questioned.",
           task: "Use range-based functions, which absorb inserted rows instead of ignoring them.",
         },
         {
           type: "paragraph",
           text: "=SUM(E2:E6) refers to a region rather than a list of cells. Insert a row inside that region and Excel expands the range automatically, so the new value is included. This is the practical reason to prefer functions over chains of arithmetic, quite apart from the typing they save.",
         },
         {
           type: "table",
           caption: "The functions worth knowing first",
           columns: [
             "Function",
             "Returns",
             "Note",
           ],
           rows: [
             [
               "=SUM(A1:A10)",
               "The total",
               "Ignores text and empty cells",
             ],
             [
               "=AVERAGE(A1:A10)",
               "The mean",
               "Skips empty cells but includes zeros — these give different answers",
             ],
             [
               "=COUNT(A1:A10)",
               "How many cells hold numbers",
               "Text and blanks are not counted",
             ],
             [
               "=COUNTA(A1:A10)",
               "How many cells are not empty",
               "Counts text as well as numbers",
             ],
             [
               "=MIN / =MAX(A1:A10)",
               "The smallest or largest value",
               "Useful for range checks on entered data",
             ],
             [
               "=IF(A1>100,\"Over\",\"OK\")",
               "One of two values, by condition",
               "The basis of every status column",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "AVERAGE ignores empty cells but includes zeros, and the difference matters. Ten items where two are genuinely zero average differently from ten items where two were never filled in. If blanks mean 'not yet recorded,' leave them blank; if they mean zero, enter 0. The distinction changes the answer.",
         },
         {
           type: "tip",
           text: "As you type =SUM( Excel shows a ScreenTip listing the arguments, with the current one in bold. Reading it is faster than looking a function up, and clicking an argument name in the tip selects that part of the formula.",
         },
       ],
     },

    // ------------------------------------------------------------
    // INTRODUCTION
    // ------------------------------------------------------------

    {
      heading: "What Is a Function?",
      blocks: [
        {
          type: "paragraph",
          text:
            "A function is a predefined formula that performs calculations using specific values in a particular order.",
        },
        {
          type: "paragraph",
          text:
            "Excel includes many common functions that can quickly calculate totals, averages, counts, maximum values, and minimum values.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_create.png",
          alt: "Basic SUM function example showing equals sign, function name, and argument",
        },
      ],
    },

    // ------------------------------------------------------------
    // PARTS OF A FUNCTION
    // ------------------------------------------------------------

    {
      heading: "Understanding Function Syntax",
      blocks: [
        {
          type: "paragraph",
          text:
            "Functions must follow proper syntax: an equals sign (=), the function name, and one or more arguments inside parentheses.",
        },
        {
          type: "paragraph",
          text:
            "Example: =SUM(A1:A20)",
        },
        {
          type: "paragraph",
          text:
            "Arguments can refer to individual cells or cell ranges. Multiple arguments are separated by commas.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_arguments.png",
          alt: "AVERAGE function example with cell range argument",
        },
      ],
    },

    // ------------------------------------------------------------
    // AUTOSUM
    // ------------------------------------------------------------

    {
      heading: "Using the AutoSum Command",
      blocks: [
        {
          type: "paragraph",
          text:
            "The AutoSum command automatically inserts common functions such as SUM, AVERAGE, COUNT, MAX, and MIN.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_autosum.png",
          alt: "AutoSum command dropdown on Ribbon",
        },
        {
          type: "paragraph",
          text:
            "Select the cell that will contain the function, choose AutoSum, and Excel will automatically suggest a range.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_autosum_done.png",
          alt: "SUM function inserted and calculated",
        },
        {
          type: "paragraph",
          text:
            "You can also press Alt + = as a shortcut to quickly insert AutoSum.",
        },
      ],
    },

    // ------------------------------------------------------------
    // MANUAL ENTRY
    // ------------------------------------------------------------

    {
      heading: "Entering a Function Manually",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you know the function name, you can type it directly.",
        },
        {
          type: "paragraph",
          text:
            "Click a cell, type =AVERAGE, and enter the range inside parentheses.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_average.png",
          alt: "Typing AVERAGE function manually",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_average_range.png",
          alt: "Selecting range C3:C9 inside AVERAGE",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_average_done.png",
          alt: "AVERAGE result displayed",
        },
      ],
    },

    // ------------------------------------------------------------
    // FUNCTION LIBRARY
    // ------------------------------------------------------------

    {
      heading: "The Function Library",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Function Library on the Formulas tab organizes functions into categories such as Financial, Logical, Text, Date & Time, Lookup & Reference, and Math & Trig.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_formulas_tab.png",
          alt: "Formulas tab showing Function Library group",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_library.png",
          alt: "Function Library categories dropdown",
        },
      ],
    },

    // ------------------------------------------------------------
    // COUNTA
    // ------------------------------------------------------------

    {
      heading: "Using COUNTA",
      blocks: [
        {
          type: "paragraph",
          text:
            "COUNTA counts the number of non-empty cells in a range. Unlike COUNT, it counts text as well as numbers.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_counta.png",
          alt: "Selecting COUNTA from Function Library",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_arguments_dialog.png",
          alt: "Function Arguments dialog for COUNTA",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_counta_done.png",
          alt: "COUNTA formula result",
        },
      ],
    },

    // ------------------------------------------------------------
    // INSERT FUNCTION + NETWORKDAYS
    // ------------------------------------------------------------

    {
      heading: "Using Insert Function & NETWORKDAYS",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Insert Function command allows you to search for functions using keywords.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_insert_function_command.png",
          alt: "Insert Function button",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_insert_dialog.png",
          alt: "Insert Function search dialog",
        },
        {
          type: "paragraph",
          text:
            "In this example, we use NETWORKDAYS to calculate business days between two dates.",
        },
        {
          type: "image",
          src: "/images/excel/module-4/functions/functions_arguments_done.png",
          alt: "NETWORKDAYS function arguments completed",
        },

      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which function adds all values in the range A1:A10?",
          options: [
            "=ADD(A1:A10)",
            "=TOTAL(A1:A10)",
            "=SUM(A1:A10)",
            "=COUNT(A1:A10)",
          ],
          correctIndex: 2,
          explanation: "=SUM(A1:A10) adds every numeric value in the range. Because it refers to a range rather than individual cells, inserting a row inside it extends the range automatically.",
          optionRationales: [
            "There is no ADD function in Excel. This returns #NAME?, the error meaning Excel does not recognize a name in the formula.",
            "There is no TOTAL function either. It also returns #NAME?.",
            "Correct. SUM adds all numeric values in the specified range.",
            "COUNT returns how many cells contain numbers — it would give 10, not the total of the values.",
          ],
        },
      ],
    },

  ],

  // ------------------------------------------------------------
  // CHALLENGE
  // ------------------------------------------------------------

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks using the practice workbook:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Download the Functions practice workbook.",
        "Click the Challenge worksheet tab.",
        "In cell F3, insert a function to calculate the average of the four scores in cells B3:E3.",
        "Use the fill handle to copy the function from F3 to cells F4:F17.",
        "In cell B18, use AutoSum to calculate the lowest score in B3:B17.",
        "In cell B19, use the Function Library (More Functions > Statistical) to calculate the median of B3:B17.",
        "In cell B20, create a function to calculate the highest score in B3:B17.",
        "Copy the functions in B18:B20 across to C18:F20 using the fill handle.",
      ],
    },
    {
        type: "image",
        src: "/images/excel/module-4/functions/functions_final_result.png",
        alt: "Final practice result shown in worksheet",
    },
  ],
},

];