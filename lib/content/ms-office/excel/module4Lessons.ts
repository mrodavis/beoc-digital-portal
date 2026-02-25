import { Lesson } from "@/types/lesson";

export const excelModule4Lessons: Lesson[] = [

  // ============================================================
  // LESSON 1 – LOGICAL FUNCTIONS (IF)
  // ============================================================

  {
    slug: "logical-functions-if",
    title: "Logical Functions: IF",
    description:
      "Learn how to use the IF function to perform logical tests and return different results based on conditions.",
    duration: "25 min",

    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace later

    sections: [
      {
        heading: "Understanding Logical Tests",
        blocks: [
          {
            type: "paragraph",
            text:
              "The IF function allows Excel to make decisions. It evaluates a condition and returns one value if TRUE and another if FALSE.",
          },
          {
            type: "paragraph",
            text:
              "Syntax: =IF(logical_test, value_if_true, value_if_false)",
          },
        ],
      },
      {
        heading: "Example: Pass or Fail",
        blocks: [
          {
            type: "paragraph",
            text:
              "Example: =IF(A2>=70, \"Pass\", \"Fail\") will return Pass if the score is 70 or higher.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "list",
        ordered: true,
        items: [
          "Create an IF formula to classify scores as Pass or Fail.",
          "Modify the formula to label scores above 90 as Excellent.",
        ],
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