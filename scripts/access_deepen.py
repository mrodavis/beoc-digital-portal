import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M2 = {
"relationships-and-referential-integrity": {
  "workedExample": {
    "heading": "Building the relationship",
    "blocks": [
      {"type": "worked-example",
       "title": "Linking Appointments to Patients",
       "task": "Connect the two tables so Access refuses to accept an appointment for a patient who does not exist.",
       "steps": [
         {"move": "Open Database Tools > Relationships and add both tables.",
          "why": "The Relationships window is where links are defined for the whole database, not per-query. A join drawn inside one query applies only to that query; a relationship defined here is enforced everywhere, including direct table entry."},
         {"move": "Drag PatientID from Patients onto PatientID in Appointments.",
          "why": "Drag from the 'one' side to the 'many' side — from the primary key to the foreign key. Access reads the direction to decide which table is which, and dragging the wrong way produces a relationship that does not mean what you intended."},
         {"move": "Tick Enforce Referential Integrity before clicking Create.",
          "why": "This is the whole point of the exercise, and it is off by default. Without it you get a line on a diagram and no enforcement — Access will happily accept an appointment for PatientID 4471 when no such patient exists."},
         {"move": "Confirm Access reports the relationship as One-To-Many.",
          "why": "If it says One-To-One, the foreign key has a unique index on it and each patient could have only one appointment. If it says Indeterminate, the fields are different data types — usually a Number joined to a Short Text — and integrity cannot be enforced until you fix that."},
         {"move": "Test it: try to enter an appointment with a PatientID that does not exist.",
          "why": "A relationship you have not tested is a relationship you are assuming. Access should refuse the record. If it accepts it, integrity is not actually on."},
       ],
       "result": "Appointments can only reference real patients, and a patient with appointments on file cannot be deleted.",
       "takeaway": "Drag from the one side to the many side, and tick Enforce Referential Integrity — it is off by default, and without it the relationship is decorative."},
    ],
  },
},
}

M4 = {
"creating-reports": {
  "workedExample": {
    "heading": "Building the report",
    "blocks": [
      {"type": "worked-example",
       "title": "A grouped supply report that prints correctly",
       "task": "Produce a report grouped by category with subtotals, a grand total, and headings on every page.",
       "steps": [
         {"move": "Base the report on a query, not the table.",
          "why": "The query is where filtering, sorting, and calculated fields belong. A report built directly on a table has to do that work in the report itself, which is harder to change and cannot be reused."},
         {"move": "Use Group & Sort to group by Category, then sort by ItemName within it.",
          "why": "Grouping creates the Group Header and Group Footer sections you need for headings and subtotals. Without a group there is nowhere to put a subtotal, which is why people end up doing it by hand."},
         {"move": "Put the report title in the Report Header and the column headings in the Page Header.",
          "why": "This is the distinction people get wrong, and it only shows up on page two. The Report Header prints once; the Page Header prints on every page. Put headings in the Report Header and pages two onward are unlabeled columns of numbers."},
         {"move": "Add =Sum([TotalCost]) to the Group Footer, and the same expression to the Report Footer.",
          "why": "The identical expression means different things depending on which section it sits in — the Group Footer totals that group, the Report Footer totals everything. Nothing about the expression tells you which; only its position does."},
         {"move": "Set Force New Page on the Group Header if each category should start its own page.",
          "why": "Useful when the report is distributed by department, so each recipient gets whole pages. Leave it off for a report someone reads end to end, where it just wastes paper."},
         {"move": "Check it in Print Preview, not Report View.",
          "why": "Report View does not paginate. A report that looks correct there can still run a column off the page edge, and the only way to see that is Print Preview."},
       ],
       "result": "A report with headings on every page, subtotals per category, a grand total, and nothing running off the paper.",
       "takeaway": "Build on a query, group before you total, title in the Report Header and headings in the Page Header, and check in Print Preview."},
    ],
  },
},
}

M3 = {
"calculated-fields-and-totals": {
  "workedExample": {
    "heading": "Replacing a stored total",
    "blocks": [
      {"type": "worked-example",
       "title": "Removing a stored TotalCost column",
       "task": "A previous employee added a TotalCost field to the table and typed the values in. Replace it with a calculation that cannot go stale.",
       "steps": [
         {"move": "Before deleting anything, build a query with the calculation and compare it against the stored column.",
          "why": "The comparison tells you how far the stored values have already drifted, and it is worth knowing before you remove the evidence. If they all match, nothing has changed since they were typed. If dozens differ, the table has been quietly wrong and someone may have made decisions on it."},
         {"move": "In the query grid, add a new field: TotalCost: [Quantity]*[UnitCost].",
          "why": "The name before the colon becomes the column heading; the expression after it is evaluated per row, every time the query runs. Square brackets are how Access refers to a field, and they are required when a name contains a space."},
         {"move": "Format the calculated field as Currency in its property sheet.",
          "why": "A calculated field has no inherited format, so it displays as a raw number — 41.97 rather than $41.97. Setting the format on the query field fixes it everywhere the query is used, including any report built on it."},
         {"move": "Point any forms and reports at the query rather than the table.",
          "why": "This is the step that is easy to miss. Deleting the table field breaks every object still bound to it. Repoint them first, confirm they work, then delete."},
         {"move": "Delete the stored field from the table, on a copy of the database first.",
          "why": "Deleting a field deletes its data irreversibly. Work on a copy until you have confirmed nothing else referenced it — Access will not warn you about a report you forgot."},
       ],
       "result": "One calculation, always current, with nothing left in the table that can contradict it.",
       "takeaway": "Compare before you delete, repoint dependent objects first, and format the calculated field — an unformatted currency column looks broken."},
    ],
  },
},
}

apply("lib/content/ms-office/access/module2Lessons.ts", M2)
apply("lib/content/ms-office/access/module3Lessons.ts", M3)
apply("lib/content/ms-office/access/module4Lessons.ts", M4)
