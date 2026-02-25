import { Lesson } from "@/types/lesson";

export const excelModule4Lessons: Lesson[] = [

  // ============================================================
  // LESSON 1 – LOGICAL FUNCTIONS (IF)
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
            type: "image",
            src: "/images/excel/module-4/complex-formulas/complex_tax_result.png",
            alt: "Correct tax result displayed",
          },
        ],
      },

      // ------------------------------------------------------------
      // Wrap-Up
      // ------------------------------------------------------------
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
  // LESSON 2 – CONDITIONAL FUNCTIONS
  // ============================================================

  {
    slug: "conditional-functions",
    title: "Conditional Functions (SUMIF & COUNTIF)",
    description:
      "Use SUMIF and COUNTIF to perform calculations based on specific criteria.",
    duration: "30 min",

    sections: [
      {
        heading: "COUNTIF",
        blocks: [
          {
            type: "paragraph",
            text:
              "COUNTIF counts the number of cells that meet a specific condition.",
          },
          {
            type: "paragraph",
            text:
              "Example: =COUNTIF(A2:A20, \"Yes\")",
          },
        ],
      },
      {
        heading: "SUMIF",
        blocks: [
          {
            type: "paragraph",
            text:
              "SUMIF adds values that meet a condition.",
          },
          {
            type: "paragraph",
            text:
              "Example: =SUMIF(A2:A20, \"East\", B2:B20)",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Count how many employees are in the Sales department.",
          "Sum total revenue for the East region.",
        ],
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