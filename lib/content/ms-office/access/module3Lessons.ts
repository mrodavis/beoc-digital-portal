import { Lesson } from "@/types/lesson";

export const accessModule3Lessons: Lesson[] = [
  {
    slug: "building-queries",
    title: "Building Select Queries",
    description:
      "Ask questions of your data using the query grid, and understand the SQL Access writes underneath it.",
    duration: "24 min",
    objectives: [
      "Create a select query using the query design grid",
      "Filter with criteria and sort results",
      "Query across related tables using a join",
      "Read the SQL behind a query you built visually",
    ],
    sections: [
      {
        heading: "A query is a saved question",
        blocks: [
          {
            type: "scenario",
            role: "You answer questions from the practice manager at Lakeside Medical Associates.",
            text: "'Which supplies are below reorder level?' 'Which patients saw Dr. Okafor last month?' 'What did we spend by category?' Each is a question about data you already hold. Scrolling the tables to answer them by eye is slow and gets a different answer each time.",
            task: "Build queries that answer a question correctly every time they run.",
          },
          {
            type: "paragraph",
            text: "A query does not store data. It stores a question, and runs it against current table data each time you open it. Add a record tomorrow that matches the criteria and it appears in the query results without anyone editing the query.",
          },
          {
            type: "table",
            caption: "The query design grid",
            columns: ["Row", "Sets"],
            rows: [
              ["Field", "Which field this column shows"],
              ["Table", "Which table it comes from"],
              ["Sort", "Ascending or descending"],
              ["Show", "Whether the column appears in results — uncheck to filter on a field without displaying it"],
              ["Criteria", "The condition a record must meet"],
              ["or", "An alternative condition"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Criteria on the same row are combined with AND — every condition must be true. Criteria on different rows are combined with OR — any one may be true. This is the single most common source of queries that return far too many or far too few records, and it is entirely a matter of which row you typed in.",
          },
          {
            type: "table",
            caption: "Criteria expressions",
            columns: ["Expression", "Matches"],
            rows: [
              ['"Medical"', "Exactly that text"],
              ["<10", "Values below 10"],
              ["Between #1/1/2026# And #3/31/2026#", "Dates in that range, inclusive"],
              ['Like "Glove*"', "Text starting with Glove"],
              ["Is Null", "Empty fields"],
              ["Not \"Inactive\"", "Anything except that value"],
              ["[Enter category:]", "Prompts the user — a parameter query"],
            ],
          },
          {
            type: "paragraph",
            text: "Every query you build in the grid exists as SQL, viewable through View > SQL View. Reading it is worth learning: a complex query is far easier to understand as eight lines of text than as a grid spanning four tables, and the same SQL fundamentals work in every other relational database you will ever meet.",
          },
          {
            type: "code",
            language: "sql",
            code: `SELECT ItemName, Category, Quantity, ReorderLevel
FROM Supplies
WHERE Quantity < ReorderLevel
ORDER BY Category ASC;`,
          },
          {
            type: "worked-example",
            title: "Answering 'which supplies are below reorder level?'",
            task: "Build a query listing every item whose quantity on hand has fallen below its reorder level, grouped sensibly for ordering.",
            steps: [
              {
                move: "Create > Query Design, and add only the Supplies table.",
                why: "Add only the tables you need. Extra tables without a defined relationship produce a cross join, which multiplies every row against every other and returns nonsense — usually thousands of rows where you expected twelve.",
              },
              {
                move: "Add ItemName, Category, Quantity, and ReorderLevel to the grid.",
                why: "Include the fields the person reading the result needs to act. A list of item names alone tells them what to order but not how urgently or from which category.",
              },
              {
                move: "In the Quantity column's Criteria row, enter <[ReorderLevel].",
                why: "Comparing one field to another is what makes this a real rule rather than a fixed threshold. A hard-coded <10 would be wrong for every item whose reorder level is not 10, and would silently go stale as levels changed.",
              },
              {
                move: "Set Sort to Ascending on Category.",
                why: "Sorting groups the results the way the person ordering will work through them — by supplier category. Sort order is part of making a result usable rather than merely correct.",
              },
              {
                move: "Switch to SQL View and read what Access wrote.",
                why: "Confirming the generated SQL matches your intent builds the fluency that makes complex queries debuggable later. It takes five seconds and is the fastest way to learn to read SQL.",
              },
            ],
            result:
              "A query that answers the reorder question correctly every time it runs, against current data.",
            takeaway:
              "Compare fields to fields rather than to fixed numbers, add only the tables you need, and read the SQL to confirm intent.",
          },
          {
            type: "knowledge-check",
            question:
              "You enter criteria in two different columns on the same Criteria row. How does Access combine them?",
            options: [
              "With OR — a record matching either condition is returned",
              "With AND — a record must satisfy both conditions",
              "It uses whichever is more restrictive",
              "It returns an error, since only one criterion is allowed per query",
            ],
            correctIndex: 1,
            explanation:
              "Criteria on the same row are combined with AND, so every condition on that row must be true. Putting the second condition on the 'or' row below would combine them with OR instead. Which row you type in is the whole difference.",
            optionRationales: [
              "OR is what the 'or' row below does. Same row means AND.",
              "Correct. Same row means every condition must be satisfied.",
              "Access applies both conditions as written; it does not choose between them.",
              "Multiple criteria are normal and expected. There is no error.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Answer real questions with saved queries.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Build a query listing supplies below their reorder level, sorted by category. Open SQL View and copy the statement Access generated.",
          "Build a query across two related tables — for example, appointments with the patient's name. Confirm the join line appears in the design view.",
          "Build a parameter query prompting for a category, and test it with three categories.",
          "Deliberately put two criteria on the same row, note the row count, then move one to the 'or' row and note it again. Explain the difference.",
        ],
      },
    ],
  },
  {
    slug: "calculated-fields-and-totals",
    title: "Calculated Fields and Totals Queries",
    description:
      "Compute values in queries rather than storing them, and summarize grouped data with aggregate functions.",
    duration: "20 min",
    objectives: [
      "Build a calculated field using an expression",
      "Explain why calculated values do not belong in tables",
      "Use a Totals query with Group By and aggregate functions",
      "Choose the right aggregate for a question",
    ],
    sections: [
      {
        heading: "Calculate, do not store",
        blocks: [
          {
            type: "scenario",
            role: "You maintain the supply database at Lakeside Medical Associates.",
            text: "Someone added a TotalCost column to the table and typed the values in. A unit price changes. The quantity changes. TotalCost does not, because it is a number someone typed six weeks ago. The table now contradicts itself, and nothing on screen indicates it.",
            task: "Compute derived values in queries so they cannot go stale.",
          },
          {
            type: "paragraph",
            text: "A calculated field computes a value from other fields each time the query runs. In the query grid you write it as a new field: TotalCost: [Quantity]*[UnitCost]. The name before the colon becomes the column heading, and the expression after it is evaluated per row.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never store a value you can calculate. A stored TotalCost is a snapshot that goes wrong the moment someone edits Quantity or UnitCost, silently and with no warning. A calculated field is derived from current data every time, so it cannot contradict its own inputs.",
          },
          {
            type: "table",
            caption: "Aggregate functions in a Totals query",
            columns: ["Function", "Returns", "Answers"],
            rows: [
              ["Group By", "The field to group on", "Per what? — per category, per provider"],
              ["Sum", "The total across the group", "How much altogether?"],
              ["Avg", "The mean", "What is typical?"],
              ["Count", "How many records", "How many are there?"],
              ["Min / Max", "Smallest or largest", "What is the range?"],
              ["Where", "A filter applied before grouping", "Which records should count at all?"],
            ],
          },
          {
            type: "paragraph",
            text: "A Totals query collapses many rows into one per group. Click the Totals button on the Design tab and a Total row appears in the grid. Set the field you are grouping by to Group By, and the field you are summarizing to Sum, Count, or whichever aggregate answers the question.",
          },
          {
            type: "knowledge-check",
            question:
              "Why should an item's total cost be calculated in a query rather than stored in the table?",
            options: [
              "Stored calculations make the database file too large",
              "A stored value goes wrong when quantity or unit cost changes, with no warning; a calculated field is always current",
              "Access does not permit numeric fields to be edited once saved",
              "Queries run faster than tables",
            ],
            correctIndex: 1,
            explanation:
              "A stored total is a snapshot that silently goes stale the moment one of its inputs changes. A calculated field is evaluated each time the query runs, so it cannot contradict the data it derives from.",
            optionRationales: [
              "The file size difference is negligible. Correctness is the reason.",
              "Correct. Stored calculations go stale silently; calculated fields are always current.",
              "Access permits editing numeric fields freely, which is precisely why a stored total is risky.",
              "Speed is not the issue, and a query reading a table cannot outrun the table itself.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Replace stored values with computed ones.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Add a calculated field TotalCost multiplying quantity by unit cost. Change a unit cost in the table and confirm the query result updates.",
          "Build a Totals query grouping by category with Sum of TotalCost and Count of items.",
          "Add a Where condition so the totals include only items ordered this year, and confirm the numbers change.",
          "Write two sentences explaining to a colleague why you removed the stored TotalCost column from the table.",
        ],
      },
    ],
  },
];
