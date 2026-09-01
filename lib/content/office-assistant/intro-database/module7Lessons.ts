import { Lesson } from "@/types/lesson";

/**
 * BUSI 3034 sessions 10-11 — Advanced Queries and Reports.
 */
export const module7Lessons: Lesson[] = [
  {
    slug: "advanced-query-types",
    title: "Crosstab, Action, and Append Queries",
    description:
      "Move beyond SELECT: summarize data in a grid, and use queries that change data rather than just returning it.",
    duration: "24 min",
    objectives: [
      "Build a crosstab query to summarize data across two dimensions",
      "Distinguish the four action query types and what each does",
      "Use an append query to add records from one table to another",
      "Apply the safety practices that action queries require",
    ],
    sections: [
      {
        heading: "Queries that summarize, and queries that change things",
        blocks: [
          {
            type: "scenario",
            role: "You produce management reports at Lakeside Medical Associates.",
            text: "The practice manager wants supply spending shown as departments down the side and months across the top — the shape of a spreadsheet cross-tab. She also wants last year's records moved out of the active table into an archive, because the active table has grown slow.",
            task: "Learn the query types that summarize across two dimensions, and the ones that modify data.",
          },
          {
            type: "paragraph",
            text: "A crosstab query summarizes data in a grid: one field supplies the row headings, another supplies the column headings, and a third is aggregated at each intersection. It is Access's equivalent of a PivotTable, and it answers 'how much of X by Y' in one object.",
          },
          {
            type: "table",
            caption: "Crosstab query components",
            columns: ["Setting", "Supplies", "Example"],
            rows: [
              ["Row Heading", "The labels down the left", "Department"],
              ["Column Heading", "The labels across the top", "Month"],
              ["Value", "What is aggregated at each cell", "Sum of TotalCost"],
            ],
          },
          {
            type: "paragraph",
            text: "Action queries are different in kind: they change data rather than returning it. There are four, and each is genuinely destructive in its own way, so they require a different level of care than a SELECT query.",
          },
          {
            type: "table",
            caption: "The four action queries",
            columns: ["Type", "Does", "Typical use"],
            rows: [
              [
                "Make Table",
                "Creates a new table from query results",
                "Snapshotting data at a point in time",
              ],
              [
                "Append",
                "Adds query results as records in an existing table",
                "Moving last year's records into an archive table",
              ],
              [
                "Update",
                "Changes values in existing records",
                "Applying a price increase across a category",
              ],
              [
                "Delete",
                "Removes records matching the criteria",
                "Clearing archived records from the active table",
              ],
            ],
          },
          {
            type: "worked-example",
            title: "Archiving last year's records safely",
            task: "Move records older than one year from the active Supplies table into SuppliesArchive, then remove them from the active table.",
            steps: [
              {
                move: "Back up the database file before doing anything else.",
                why: "Action queries cannot be undone. There is no Ctrl+Z after an append or delete, and no confirmation beyond a single dialog. A copy of the .accdb file is the only real safety net, and it takes seconds.",
              },
              {
                move: "Build it as a SELECT query first and examine the results.",
                why: "This is the discipline that prevents disasters. Run it as a SELECT and you see exactly which records the criteria match. If the count or the contents look wrong, you have learned that harmlessly rather than after deleting them.",
              },
              {
                move: "Convert it to an Append query and target SuppliesArchive.",
                why: "Access converts the query type while keeping your verified criteria, so the records that are appended are precisely the ones you just inspected. Check that the source and destination field names line up — mismatches silently drop data into the wrong column.",
              },
              {
                move: "Run the append, then verify the archive table before deleting anything.",
                why: "Confirm the row count in the archive matches what the SELECT returned. Deleting from the active table before confirming the copy arrived is how a year of records is lost permanently.",
              },
              {
                move: "Only then convert a copy of the same query to a Delete query and run it.",
                why: "Using the same criteria guarantees you delete exactly what you archived. Writing fresh criteria for the delete step risks a subtle difference between the two sets — and the difference would be records deleted but never archived.",
              },
            ],
            result:
              "Last year's records safely in the archive table and removed from the active one, with a backup if anything went wrong.",
            takeaway:
              "Back up, build as SELECT, verify, then convert. Every action query gets this treatment — there is no undo.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Action queries do not have an undo. A Delete query that runs with the wrong criteria removes records permanently, and Access asks only once before doing it. Treat every action query as irreversible: back up first, always build it as a SELECT to see what it will touch, and never run one you did not write yourself without reading its criteria.",
          },
          {
            type: "knowledge-check",
            question:
              "What is the most important step before running a Delete query?",
            options: [
              "Compacting the database to reclaim space",
              "Backing up the file and running it as a SELECT query first to verify exactly which records match",
              "Closing all forms and reports that use the table",
              "Adding an index to the criteria field to speed it up",
            ],
            correctIndex: 1,
            explanation:
              "Action queries cannot be undone. Running the same criteria as a SELECT shows precisely which records will be removed, and a backup means a mistake is recoverable. Both take seconds; recovering deleted records without them is impossible.",
            optionRationales: [
              "Compacting is routine maintenance and offers no protection against deleting the wrong records.",
              "Correct. Verify with a SELECT and back up the file — an action query is irreversible.",
              "Reasonable housekeeping, but it does nothing to protect against faulty criteria.",
              "Indexing affects speed, not safety.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work on a copy of your database. Do not run action queries against anything you cannot afford to lose.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Copy your database file before starting. Confirm the copy opens.",
          "Build a crosstab query with category as rows, order month as columns, and sum of total cost as the value. Describe what question it answers that a normal Totals query does not.",
          "Create an archive table matching your supplies table's structure. Build a SELECT query for records older than a chosen date, verify the results, then convert it to an Append query and run it.",
          "Write the five-step safety procedure for action queries in your own words, as you would give it to a new colleague.",
        ],
      },
    ],
  },
  {
    slug: "designing-reports",
    title: "Designing Reports with Grouping and Sorting",
    description:
      "Build reports that organize data into meaningful groups, with headers, footers, page numbering, and totals that print correctly.",
    duration: "22 min",
    objectives: [
      "Create a report with grouping and sorting",
      "Add headers, footers, and page numbering",
      "Add group and report totals",
      "Prepare a report so it prints legibly",
    ],
    sections: [
      {
        heading: "Grouping is what makes a report a report",
        blocks: [
          {
            type: "scenario",
            role: "You produce the quarterly supply report at Lakeside Medical Associates.",
            text: "Your first attempt is 340 rows printed in entry order across eleven pages, with column headings only on page one. It contains every fact the manager asked for and answers none of her questions, because nothing is organized.",
            task: "Use grouping, sorting, and totals so the report answers questions instead of listing data.",
          },
          {
            type: "paragraph",
            text: "A report differs from a datasheet by being organized for a reader. Grouping collects records under headings; sorting orders them within each group; group totals summarize each section. Those three things turn a list into something someone can actually use.",
          },
          {
            type: "table",
            caption: "Report sections and what belongs in each",
            columns: ["Section", "Prints", "Put here"],
            rows: [
              ["Report Header", "Once, at the very start", "Title, date range, practice name"],
              ["Page Header", "At the top of every page", "Column headings"],
              ["Group Header", "Before each group", "The group's name, e.g. the category"],
              ["Detail", "Once per record", "The record's fields"],
              ["Group Footer", "After each group", "Subtotals for that group"],
              ["Page Footer", "At the bottom of every page", "Page numbers"],
              ["Report Footer", "Once, at the very end", "Grand totals"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The distinction between Page Header and Report Header is the one people get wrong. A title in the Page Header repeats on all eleven pages; column headings in the Report Header appear only on page one, leaving pages two onward as unlabeled columns of numbers. Title goes in the Report Header, column headings in the Page Header.",
          },
          {
            type: "paragraph",
            text: "Totals are added by placing a text box with an expression such as =Sum([TotalCost]) in the appropriate footer. Placed in the Group Footer it totals that group; placed in the Report Footer it totals everything. The same expression means different things depending only on where it sits, which is why understanding the sections matters.",
          },
          {
            type: "knowledge-check",
            question:
              "Where should column headings be placed so they appear at the top of every printed page?",
            options: [
              "The Report Header, since they describe the whole report",
              "The Page Header, which prints at the top of every page",
              "The Group Header, so they appear with each group",
              "The Detail section, so they stay with the records",
            ],
            correctIndex: 1,
            explanation:
              "The Page Header prints at the top of every page, which is exactly what column headings need. The Report Header prints only once, leaving later pages unlabeled.",
            optionRationales: [
              "The Report Header prints once at the beginning, so pages two onward would have no column labels.",
              "Correct. The Page Header repeats at the top of every page.",
              "The Group Header repeats per group rather than per page, so headings would appear mid-page and be missing at page breaks.",
              "The Detail section prints once per record, which would repeat the headings on every single row.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a report someone could actually take into a meeting.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Build a report on your supplies data grouped by category and sorted by item name within each group.",
          "Add a report title in the Report Header, column headings in the Page Header, and page numbering in the Page Footer. Confirm in Print Preview that each appears where you expect across at least two pages.",
          "Add a subtotal of total cost in the Group Footer and a grand total in the Report Footer. Verify the subtotals sum to the grand total.",
          "Adjust the layout until it prints without any column running off the page, then write two sentences on what you had to change.",
        ],
      },
    ],
  },
];
