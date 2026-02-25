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
    duration: "12 min",

    videoUrl: "https://www.youtube.com/embed/J-W3thqtDpQ",

    practiceFiles: [
      {
        name: "Complex Formulas Practice File",
        url: "/practice/excel/module-4/complex-formulas/Excel_ComplexFormulas_Practice.xlsx",
      },
    ],

    sections: [

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
            type: "image",
            src: "/images/excel/module-4/complex-formulas/complex_order1.png",
            alt: "Using the order of operations (PEMDAS) graphic",
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
              "By adding parentheses, Excel performs the multiplication steps first before summing the results.",
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
          },
          {
            type: "paragraph",
            text:
              "Without parentheses, Excel multiplies before adding, which produces an incorrect total.",
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
              "When totals look wrong, parentheses are usually the culprit.",
            ],
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the following tasks using the practice workbook:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Use a formula to calculate Subtotal for the invoice items.",
          "Modify your formula to include parentheses where appropriate.",
          "Create a tax formula that adds totals first, then multiplies by the tax rate.",
          "Identify the incorrect tax formula example and explain why it’s wrong.",
          "Verify your final totals match the expected results.",
        ],
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
        heading: "Understanding Relative References",
        blocks: [
          {
            type: "paragraph",
            text:
              "Relative references are Excel’s default behavior. When a formula is copied, the row and column references adjust automatically.",
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
              "Notice how the row numbers changed automatically as the formula was copied.",
          },
        ],
      },

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
              "Add dollar signs to lock the reference. $E$2 locks both the column and row.",
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

      {
        heading: "Mixed References",
        blocks: [
          {
            type: "paragraph",
            text:
              "Excel allows partial locking of either rows or columns.",
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
              "$A$2 → Fully absolute",
              "A$2 → Row locked",
              "$A2 → Column locked",
              "A2 → Fully relative",
            ],
          },
        ],
      },

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

    ],

    challenge: [
      {
        type: "paragraph",
        text: "Challenge!",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Download the Cell References practice workbook.",
          "Click the Paper Goods tab at the bottom-left of the workbook.",
          "In cell D4, enter a formula that multiplies the unit price in B4, the quantity in C4, and the tax rate in E2. Make sure to use an absolute cell reference for the tax rate because it will be the same in every cell.",
          "Use the fill handle to copy the formula you just created to cells D5:D12.",
          "Change the tax rate in cell E2 to 6.5%. Notice that all of your cells have updated. When you're finished, your workbook should look like this:",
        ],
      },
      {
        type: "image",
        src: "/images/excel/module-4/relative-absolute/references-absolute-final-result.png",
        alt: "Completed Paper Goods worksheet with updated tax rate",
      },
      {
        type: "list",
        ordered: true,
        start:6,
        items: [
          "Click the Catering Invoice tab.",
          "Delete the value in cell C5 and replace it with a reference to the total cost of the paper goods. Hint: The cost of the paper goods is in cell E13 on the Paper Goods worksheet.",
          "Use the same steps from above to calculate the sales tax for each item on the Menu Order worksheet. The total cost in cell E14 should update. Then, in cell C4 of the Catering Invoice worksheet, create a cell reference to the total you just calculated.",
          "When you're finished, the Catering Invoice worksheet should look something like this:",
        ],
      },
      {
        type: "image",
        src: "/images/excel/module-4/relative-absolute/excel_2016_cell_ref_challenge_edited.png",
        alt: "Completed Catering Invoice worksheet",
      },
    ],
  },

  // ============================================================
  // LESSON 3 – LOOKUP FUNCTIONS
  // ============================================================

  {
    slug: "lookup-functions",
    title: "Lookup Functions (VLOOKUP & XLOOKUP)",
    description:
      "Retrieve data from tables using VLOOKUP and modern XLOOKUP techniques.",
    duration: "35 min",

    sections: [
      {
        heading: "VLOOKUP Basics",
        blocks: [
          {
            type: "paragraph",
            text:
              "VLOOKUP searches for a value in the first column of a table and returns a corresponding value.",
          },
          {
            type: "paragraph",
            text:
              "Syntax: =VLOOKUP(lookup_value, table_array, col_index_num, FALSE)",
          },
        ],
      },
      {
        heading: "Modern Alternative: XLOOKUP",
        blocks: [
          {
            type: "paragraph",
            text:
              "XLOOKUP is more flexible and does not require column index numbers.",
          },
          {
            type: "paragraph",
            text:
              "Syntax: =XLOOKUP(lookup_value, lookup_array, return_array)",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Use VLOOKUP to retrieve a product price.",
          "Rebuild the same lookup using XLOOKUP.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 4 – ERROR HANDLING
  // ============================================================

  {
    slug: "error-handling",
    title: "Handling Errors with IFERROR",
    description:
      "Prevent formula errors from displaying by using IFERROR and understanding common Excel error types.",
    duration: "20 min",

    sections: [
      {
        heading: "Common Errors",
        blocks: [
          {
            type: "paragraph",
            text:
              "Common Excel errors include #N/A, #DIV/0!, #VALUE!, and #REF!.",
          },
        ],
      },
      {
        heading: "Using IFERROR",
        blocks: [
          {
            type: "paragraph",
            text:
              "Syntax: =IFERROR(formula, value_if_error)",
          },
          {
            type: "paragraph",
            text:
              "Example: =IFERROR(VLOOKUP(A2, Table, 2, FALSE), \"Not Found\")",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Wrap a VLOOKUP formula inside IFERROR.",
          "Display 'Not Found' instead of #N/A.",
        ],
      },
    ],
  },

  // ============================================================
  // LESSON 5 – NESTED LOGIC & PRACTICAL MODEL
  // ============================================================

  {
    slug: "nested-logic-and-modeling",
    title: "Nested Logic & Practical Modeling",
    description:
      "Combine multiple logical functions to build structured decision-making formulas used in professional spreadsheet models.",
    duration: "40 min",

    sections: [
      {
        heading: "Nested IF Statements",
        blocks: [
          {
            type: "paragraph",
            text:
              "Nested IF statements allow multiple conditions within a single formula.",
          },
          {
            type: "paragraph",
            text:
              "Example: =IF(A2>90,\"A\",IF(A2>80,\"B\",IF(A2>70,\"C\",\"D\")))",
          },
        ],
      },
      {
        heading: "Real-World Example",
        blocks: [
          {
            type: "paragraph",
            text:
              "Use nested logic to categorize employees, commissions, or performance tiers.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Create a 3-level grading system using nested IF.",
          "Build a commission calculator based on sales tiers.",
        ],
      },
    ],
  },

];