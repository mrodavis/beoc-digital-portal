import { Lesson } from "@/types/lesson";

/**
 * BUSI 3034 sessions 8-9 — Querying Data.
 *
 * Syllabus objectives: understand SQL statements, write basic SQL queries in
 * Access, design/create/edit queries, and create parameter queries and
 * calculated fields.
 */
export const module6Lessons: Lesson[] = [
  {
    slug: "understanding-sql",
    title: "Understanding SQL Statements",
    description:
      "Learn the language underneath every query, and read a SELECT statement well enough to know what a query actually does.",
    duration: "25 min",
    objectives: [
      "Explain what SQL is and where it runs",
      "Read and write a basic SELECT statement",
      "Filter rows with WHERE and order results with ORDER BY",
      "Switch between Access's Design view and SQL view for the same query",
    ],
    sections: [
      {
        heading: "The language behind the grid",
        blocks: [
          {
            type: "scenario",
            role: "You maintain the practice database at Lakeside Medical Associates.",
            text: "A query built by a previous employee returns the wrong patients, and its Design view grid spans four tables with criteria scattered across a dozen columns. Read as SQL it is eight lines, and the error — a filter on the wrong table — is visible in about twenty seconds.",
            task: "Learn to read SQL, because it is often the fastest way to understand what a query is doing.",
          },
          {
            type: "paragraph",
            text: "SQL — Structured Query Language — is the standard language for asking questions of a relational database. Access's Design view is a visual builder that writes SQL for you. Every query you build in the grid exists as a SQL statement, viewable at any time through View > SQL View.",
          },
          {
            type: "paragraph",
            text: "Learning to read it is worth the effort for two reasons. Complex queries are far easier to understand as text than as a sprawling grid, and SQL transfers: the same fundamentals work in SQL Server, MySQL, PostgreSQL, and every other relational database, so this is one of the most portable skills in the course.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "SELECT",
                definition: "Names which fields you want returned.",
              },
              {
                term: "FROM",
                definition: "Names the table or tables the data comes from.",
              },
              {
                term: "WHERE",
                definition: "Filters which rows are returned.",
              },
              {
                term: "ORDER BY",
                definition: "Sorts the results. ASC is ascending, DESC descending.",
              },
              {
                term: "JOIN",
                definition:
                  "Combines rows from two tables using a matching value, normally a primary key and its foreign key.",
              },
              {
                term: "GROUP BY",
                definition:
                  "Collapses rows into groups so aggregate functions like COUNT and SUM can be applied per group.",
              },
            ],
          },
          {
            type: "code",
            language: "sql",
            code: `SELECT LastName, FirstName, DateOfBirth
FROM Patients
WHERE City = 'Brooklyn'
ORDER BY LastName ASC;`,
          },
          {
            type: "paragraph",
            text: "Read that as a sentence: return the last name, first name, and date of birth, from the Patients table, for rows where the city is Brooklyn, sorted by last name. The order of the clauses is fixed — SELECT, FROM, WHERE, ORDER BY — and Access will reject a statement that puts them in another order.",
          },
          {
            type: "table",
            caption: "Operators used in WHERE",
            columns: ["Operator", "Means", "Example"],
            rows: [
              ["=", "Equal to", "WHERE City = 'Brooklyn'"],
              ["<> ", "Not equal to", "WHERE Status <> 'Inactive'"],
              ["> <  >= <=", "Comparison", "WHERE Quantity < 10"],
              ["BETWEEN", "Within a range, inclusive", "WHERE VisitDate BETWEEN #1/1/2026# AND #3/31/2026#"],
              ["LIKE", "Pattern match", "WHERE LastName LIKE 'Sm*'"],
              ["IN", "Matches any value in a list", "WHERE Category IN ('Medical','Nursing')"],
              ["IS NULL", "Field is empty", "WHERE Phone IS NULL"],
              ["AND / OR", "Combine conditions", "WHERE City = 'Brooklyn' AND Status = 'Active'"],
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Access uses the asterisk as its wildcard in LIKE, where most other SQL databases use the percent sign. Access also wraps dates in hash marks (#1/1/2026#) where standard SQL uses quotes. If you move to SQL Server or MySQL later, these are the two differences most likely to trip you up first.",
          },
          {
            type: "worked-example",
            title: "Finding the query's actual bug",
            task: "A query is meant to list active Brooklyn patients with appointments this quarter, but returns patients from every city.",
            steps: [
              {
                move: "Open View > SQL View instead of studying the Design grid.",
                why: "Eight lines of text are far easier to reason about than a grid spanning four tables. The grid hides the logical structure in its layout; SQL states it directly.",
              },
              {
                move: "Read the WHERE clause and check which table each condition applies to.",
                why: "This is where filter bugs live. A condition written against the Appointments table's city field rather than the Patients table's will filter the wrong thing — and in the grid, the two look nearly identical because the column header shows only the field name.",
              },
              {
                move: "Check how AND and OR are combined, and whether parentheses are present.",
                why: "WHERE A AND B OR C does not mean what most people assume, because AND binds more tightly than OR. Missing parentheses around an OR group is the second most common query bug, and it produces exactly this symptom — far more rows than expected.",
              },
              {
                move: "Fix it in SQL view, then switch back to Design view to confirm.",
                why: "The two views are the same query. Editing the SQL and seeing the grid update confirms your change did what you meant, and it is a good way to build fluency in reading between the two.",
              },
            ],
            result:
              "The filter is corrected to reference the Patients table, and the OR group is parenthesized.",
            takeaway:
              "When a query returns the wrong rows, read its SQL. Filter bugs and operator precedence are visible in the text and nearly invisible in the grid.",
          },
          {
            type: "knowledge-check",
            question:
              "Which SQL clause determines which rows are returned by a query?",
            options: [
              "SELECT, because it names what the query returns",
              "WHERE, because it filters rows against a condition",
              "FROM, because it names the source table",
              "ORDER BY, because it arranges the results",
            ],
            correctIndex: 1,
            explanation:
              "WHERE filters rows. SELECT chooses which columns appear, FROM names the source, and ORDER BY sorts what survives the filter. A useful way to hold it: SELECT picks columns, WHERE picks rows.",
            optionRationales: [
              "SELECT determines which fields (columns) are returned, not which records.",
              "Correct. WHERE evaluates a condition against each row and keeps those that satisfy it.",
              "FROM identifies the table or tables the data is drawn from.",
              "ORDER BY sorts the result set; it never changes which rows are in it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Write SQL by hand before letting the grid write it for you.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your Access database, create a query in Design view, then open SQL View and copy the statement it generated. Annotate each clause with what it does.",
          "Write a SELECT statement by hand, in SQL View, that returns all supply items with a quantity below their reorder level, sorted by category. Run it.",
          "Write a statement using LIKE to find every item whose name begins with 'Glove'. Then rewrite it using IN to match three specific categories.",
          "Write a statement combining AND and OR with parentheses, then remove the parentheses and run it again. Record how many rows each returns and explain the difference.",
        ],
      },
    ],
  },
  {
    slug: "parameter-queries-and-calculated-fields",
    title: "Parameter Queries and Calculated Fields",
    description:
      "Build queries that prompt for input and that compute values on the fly, so one query answers many questions.",
    duration: "22 min",
    objectives: [
      "Create a parameter query that prompts the user for a value",
      "Build a calculated field using an expression",
      "Explain why calculated values should not be stored in tables",
      "Use aggregate functions to summarize grouped data",
    ],
    sections: [
      {
        heading: "One query instead of twelve",
        blocks: [
          {
            type: "scenario",
            role: "You support reporting at Lakeside Medical Associates.",
            text: "The practice manager wants supply usage by month. You build a query for January. Then February. By June you have six nearly identical queries in the Navigation Pane, differing only in a date, and each one is a thing that can fall out of date independently of the others.",
            task: "Build one query that asks which month you want, rather than one query per month.",
          },
          {
            type: "paragraph",
            text: "A parameter query prompts for a value when it runs and uses the response as a criterion. Instead of hard-coding a date, you put a prompt in square brackets in the criteria row, and Access asks the user for it each time.",
          },
          {
            type: "code",
            language: "sql",
            code: `SELECT ItemName, Category, Quantity, OrderDate
FROM Supplies
WHERE OrderDate BETWEEN [Enter start date:] AND [Enter end date:]
ORDER BY OrderDate;`,
          },
          {
            type: "paragraph",
            text: "The bracketed text is not a field name — Access recognizes that and treats it as a prompt, showing it to the user as a dialog. One query now covers every date range anyone will ever ask for.",
          },
          {
            type: "paragraph",
            text: "A calculated field computes a value from other fields rather than storing it. In the query grid you write it as a new field: TotalCost: [Quantity]*[UnitCost]. The name before the colon becomes the column heading, and the expression after it is evaluated for every row.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never store a calculated value in a table when you can compute it in a query. A stored TotalCost becomes wrong the moment someone edits Quantity or UnitCost, and nothing warns you — the table now contains a number that contradicts its own inputs. Calculate it in the query and it is correct by construction, every time it runs.",
          },
          {
            type: "table",
            caption: "Aggregate functions in a Totals query",
            columns: ["Function", "Returns"],
            rows: [
              ["Sum", "The total of a numeric field across the group"],
              ["Avg", "The mean value"],
              ["Count", "How many records are in the group"],
              ["Min / Max", "The smallest or largest value"],
              ["Group By", "The field to group the results by"],
              ["Where", "A filter applied before grouping"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "Why should a supply item's total cost be calculated in a query rather than stored in the table?",
            options: [
              "Stored calculations make the database file too large",
              "A stored value becomes wrong when quantity or unit cost changes, with no warning; a calculated field is always current",
              "Access does not permit numeric fields to be edited once saved",
              "Queries run faster than tables",
            ],
            correctIndex: 1,
            explanation:
              "A stored total is a snapshot that silently goes stale the moment one of its inputs changes. A calculated field is evaluated each time the query runs, so it cannot contradict the data it is derived from.",
            optionRationales: [
              "The file size difference is negligible. Correctness is the reason.",
              "Correct. Stored calculations go stale silently; calculated fields are always derived from current data.",
              "Access permits editing numeric fields freely, which is precisely why a stored total is risky.",
              "Speed is not the issue, and a query reading a table cannot be faster than the table itself.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Replace repetitive queries with one flexible query.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Build a parameter query on your supplies table that prompts for a category and returns all items in it. Test it with three different categories.",
          "Add a calculated field TotalCost multiplying quantity by unit cost. Then change a unit cost in the table and re-run the query to confirm the total updates.",
          "Build a Totals query grouping by category, with Sum of TotalCost and Count of items. Note which rows are grouped and which are aggregated.",
          "Write two sentences explaining to a colleague why you removed the stored TotalCost column from the table.",
        ],
      },
    ],
  },
];
