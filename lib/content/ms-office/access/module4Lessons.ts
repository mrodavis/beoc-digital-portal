import { Lesson } from "@/types/lesson";

export const accessModule4Lessons: Lesson[] = [
  {
    slug: "creating-forms",
    title: "Creating Forms for Data Entry",
    description:
      "Build forms that make correct data entry fast and incorrect entry difficult.",
    duration: "22 min",
    objectives: [
      "Generate a form and modify it in Layout and Design view",
      "Arrange fields in the order staff actually work",
      "Add controls including combo boxes and validation",
      "Explain why data entry should go through forms rather than tables",
    ],
    sections: [
      {
        heading: "Forms exist to protect the data",
        blocks: [
          {
            type: "scenario",
            role: "Three staff share the supply database at Lakeside Medical Associates.",
            text: "They enter records directly into the table. Every field of every record is visible and editable at once, and within a fortnight two rows have been overwritten by someone who tabbed into the wrong line. A form would have shown one record at a time, in a sensible order, with the calculated fields not editable at all.",
            task: "Build a form that makes correct entry the path of least resistance.",
          },
          {
            type: "paragraph",
            text: "A form shows one record at a time in a controlled layout. It can order fields to match the paper document someone is reading from, hide fields staff should not touch, label fields in plain language, and validate entries before they are committed.",
          },
          {
            type: "table",
            caption: "Form controls worth knowing",
            columns: ["Control", "Does", "Use for"],
            rows: [
              ["Text box", "Displays and edits a field", "Most fields"],
              ["Combo box", "Dropdown, optionally from another table", "Category, provider — anything with a fixed set of values"],
              ["List box", "Shows several options at once", "Short lists where seeing all options helps"],
              ["Check box", "A Yes/No field", "Flags and toggles"],
              ["Command button", "Runs a macro or VBA", "Save, find, open a related form"],
              ["Subform", "Shows related records from another table", "A patient's appointments inside the patient form"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "A combo box bound to a lookup table is the single most effective data quality control on a form. It makes 'Medical', 'medical', 'Med.', and 'Medcial' impossible, because the user picks from a list rather than typing. Anywhere a field has a known set of valid values, it should be a combo box.",
          },
          {
            type: "worked-example",
            title: "Building a usable supply entry form",
            task: "Create a form three staff will use daily to add and update supply records.",
            steps: [
              {
                move: "Select the table, then Create > Form to generate a starting point.",
                why: "The generated form is complete but laid out in table field order, which is rarely entry order. It is a scaffold to modify, not a finished product — and starting from it is far faster than building from blank.",
              },
              {
                move: "In Layout view, reorder fields to match the delivery note staff read from.",
                why: "Entry speed comes from not having to hunt. If the paper document lists item, quantity, then cost, the form should too — every mismatch between the document and the form is a place someone loses their position.",
              },
              {
                move: "Replace the Category text box with a combo box bound to a Categories table.",
                why: "This eliminates spelling variants entirely. Free-text categories are the most reliable way to make a database unsortable, because 'Medical' and 'medical' group separately in every report.",
              },
              {
                move: "Set calculated and key fields to Locked, or remove them from the form.",
                why: "Staff have no reason to edit ItemID or a computed total, and every editable field is a field that can be broken by a stray keystroke. Removing what is not needed is a design decision, not a limitation.",
              },
              {
                move: "Set the tab order to follow the visual order.",
                why: "Tab order does not update automatically when you rearrange fields. If it is wrong, tabbing jumps around the form unpredictably, which is both slow and a genuine cause of data landing in the wrong field.",
              },
            ],
            result:
              "A form that is faster than the table and makes the common mistakes impossible.",
            takeaway:
              "Match the form to the document staff work from, constrain what can be typed, and fix the tab order after every rearrangement.",
          },
          {
            type: "knowledge-check",
            question:
              "Why should staff enter data through a form rather than directly into the table?",
            options: [
              "Forms save records faster than tables do",
              "A form shows one record at a time in a controlled layout, and can hide, lock, and validate fields",
              "Tables cannot be edited once they contain records",
              "Forms store the data more efficiently",
            ],
            correctIndex: 1,
            explanation:
              "A table exposes every field of every record at once, which is how the wrong row gets edited. A form controls what is visible, what is editable, in what order, and what values are acceptable.",
            optionRationales: [
              "Both write to the same table at the same speed. Speed is not the reason.",
              "Correct. Forms control visibility, editability, order, and validation.",
              "Tables remain fully editable. That is precisely the problem.",
              "Forms store nothing. All data lives in tables regardless.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a form someone else could use without training.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Generate a form for your supplies table, then reorder the fields in Layout view to match a delivery note.",
          "Create a Categories table and replace the Category field with a combo box bound to it. Confirm free text is no longer possible.",
          "Lock or remove the ID and any calculated fields, then fix the tab order to follow the visual layout.",
          "Have someone else enter two records using only your form. Note every point where they hesitated, and fix one of them.",
        ],
      },
    ],
  },
  {
    slug: "creating-reports",
    title: "Creating Reports",
    description:
      "Build reports that organize data into groups with totals, and print correctly on the page.",
    duration: "22 min",
    objectives: [
      "Generate a report and adjust it for printing",
      "Group and sort report data",
      "Add totals in the correct report sections",
      "Place headers and page numbering where they belong",
    ],
    sections: [
      {
        heading: "A report is organized for a reader",
        blocks: [
          {
            type: "scenario",
            role: "You produce the quarterly supply report at Lakeside Medical Associates.",
            text: "Your first attempt is 340 rows in entry order across eleven pages, with column headings only on page one. It contains every fact the manager asked for and answers none of her questions, because nothing is organized and pages two onward are unlabeled columns of numbers.",
            task: "Use grouping, sorting, and totals to turn a list into something someone can use.",
          },
          {
            type: "table",
            caption: "Report sections and what belongs in each",
            columns: ["Section", "Prints", "Put here"],
            rows: [
              ["Report Header", "Once, at the very start", "Title, date range, practice name"],
              ["Page Header", "Top of every page", "Column headings"],
              ["Group Header", "Before each group", "The group's name"],
              ["Detail", "Once per record", "The record's fields"],
              ["Group Footer", "After each group", "Subtotals for that group"],
              ["Page Footer", "Bottom of every page", "Page numbers"],
              ["Report Footer", "Once, at the very end", "Grand totals"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The Page Header versus Report Header distinction is the one people get wrong. A title in the Page Header repeats on all eleven pages; column headings in the Report Header appear only on page one, leaving the rest unlabeled. Title goes in the Report Header, column headings in the Page Header.",
          },
          {
            type: "paragraph",
            text: "Totals are added by placing a text box containing an expression such as =Sum([TotalCost]) in the appropriate footer. In the Group Footer it totals that group; in the Report Footer it totals everything. The same expression means different things depending only on where it sits.",
          },
          {
            type: "knowledge-check",
            question:
              "Where should column headings go so they appear at the top of every printed page?",
            options: [
              "The Report Header, since they describe the whole report",
              "The Page Header, which prints at the top of every page",
              "The Group Header, so they appear with each group",
              "The Detail section, so they stay with the records",
            ],
            correctIndex: 1,
            explanation:
              "The Page Header prints at the top of every page, which is exactly what column headings need. The Report Header prints once, leaving later pages unlabeled.",
            optionRationales: [
              "The Report Header prints once at the beginning, so pages two onward would have no column labels.",
              "Correct. The Page Header repeats at the top of every page.",
              "The Group Header repeats per group, so headings would appear mid-page and be missing at page breaks.",
              "The Detail section prints once per record, repeating the headings on every row.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a report someone could take into a meeting.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Build a report on your supplies data grouped by category and sorted by item name within each group.",
          "Put a title in the Report Header, column headings in the Page Header, and page numbering in the Page Footer. Verify in Print Preview across at least two pages.",
          "Add a subtotal in the Group Footer and a grand total in the Report Footer. Confirm the subtotals sum to the grand total.",
          "Adjust the layout until nothing runs off the page, then write two sentences on what you changed.",
        ],
      },
    ],
  },
];
