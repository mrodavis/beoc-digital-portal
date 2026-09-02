import { Lesson } from "@/types/lesson";

/**
 * MODULE 8 — Modern Excel Features
 *
 * The features here are the reason to be on a current release. Dynamic arrays,
 * XLOOKUP, and the Intelligent Services do not exist in Office 2019, so this
 * module carries version callouts throughout — a student on a 2019 lab machine
 * needs to know why a formula they read about returns #NAME? rather than
 * concluding they typed it wrong.
 */
export const excelModule8Lessons: Lesson[] = [

/* ============================================================
LESSON 1 – DYNAMIC ARRAYS AND XLOOKUP
============================================================ */
{
  slug: "dynamic-arrays-and-xlookup",
  title: "Dynamic Arrays & XLOOKUP",
  description:
    "Use the modern formula engine: one formula that returns many results, and the lookup function that replaces VLOOKUP.",
  duration: "15 min",
  objectives: [
    "Explain what a dynamic array is and what 'spill' means",
    "Use FILTER, SORT, and UNIQUE to build a live list from a data set",
    "Write an XLOOKUP and say why it is safer than VLOOKUP",
    "Recognize the #SPILL! and #NAME? errors and know what each one means",
  ],

  sections: [
    {
      heading: "One formula, many answers",
      blocks: [
        {
          type: "scenario",
          role: "You maintain the supply tracker at Lakeside Medical Associates.",
          text: "Your supervisor wants a live list of every item below its reorder level, sorted by category, on its own sheet. The old way is a helper column, a filter, and a copy-paste every time the data changes — which means it is stale within a day and someone eventually forgets to redo it.",
          task: "Write one formula that produces the whole list and updates itself.",
        },
        {
          type: "paragraph",
          text: "A dynamic array formula returns more than one result. You write it in a single cell and Excel fills — spills — the results into the cells beneath and beside it automatically. The spilled range has a blue border when you select the formula cell, and you cannot type into it; it belongs to the formula.",
        },
        {
          type: "paragraph",
          text: "This changes how you build a spreadsheet. Where you would previously have copied a formula down 900 rows, one formula now covers the range and grows or shrinks as the source data changes. Nothing to re-copy, and no risk of a row at the bottom being missed.",
        },
        {
          type: "table",
          caption: "The dynamic array functions worth learning first",
          columns: ["Function", "Returns", "Example"],
          rows: [
            ["FILTER", "Only the rows meeting a condition", "=FILTER(A2:E900, D2:D900<E2:E900)"],
            ["SORT", "A range sorted by a column you choose", "=SORT(A2:E900, 2, 1)"],
            ["UNIQUE", "The distinct values in a range", "=UNIQUE(B2:B900)"],
            ["SEQUENCE", "A list of numbers", "=SEQUENCE(12) for 1 to 12"],
            ["XLOOKUP", "A matching value from another range", "=XLOOKUP(A2, Items, Prices)"],
          ],
        },
        {
          type: "callout",
          variant: "version",
          text: "Dynamic arrays and XLOOKUP require Microsoft 365, Excel 2021, or Excel 2024. They do not exist in Excel 2019. If you type =XLOOKUP( on a 2019 machine and get #NAME?, the formula is not wrong — the function is not there. Opening a 365 workbook in 2019 shows the same formula as _xlfn.XLOOKUP with a #NAME? error, which is Excel telling you it does not recognize a function the file was built with.",
        },
      ],
    },
    {
      heading: "XLOOKUP, and why VLOOKUP was worth replacing",
      blocks: [
        {
          type: "paragraph",
          text: "VLOOKUP has three long-standing problems. It can only look to the right of the lookup column. It refers to the return column by position number, so inserting a column silently breaks it. And it defaults to an approximate match, which means a typo returns a wrong answer rather than an error.",
        },
        {
          type: "paragraph",
          text: "XLOOKUP fixes all three. It takes the lookup range and the return range as separate arguments, so direction does not matter and inserting a column cannot break it. It defaults to an exact match. And it has a built-in argument for what to return when nothing is found.",
        },
        {
          type: "table",
          caption: "The same lookup, both ways",
          columns: ["", "VLOOKUP", "XLOOKUP"],
          rows: [
            ["Formula", "=VLOOKUP(A2, Items!A:D, 4, FALSE)", "=XLOOKUP(A2, Items[Name], Items[Price])"],
            ["Can look left", "No", "Yes"],
            ["Breaks if a column is inserted", "Yes — the position number is now wrong", "No — the return range moves with it"],
            ["Default match type", "Approximate, unless you add FALSE", "Exact"],
            ["Handles 'not found'", "Returns #N/A; needs IFERROR wrapped around it", "Fourth argument: =XLOOKUP(A2, names, prices, \"Not found\")"],
          ],
        },
        {
          type: "worked-example",
          title: "Building the live reorder list",
          task: "Produce a self-updating list of every supply item below its reorder level, sorted by category.",
          steps: [
            {
              move: "Start with FILTER alone and check what it returns.",
              why: "=FILTER(A2:E900, D2:D900<E2:E900) returns the matching rows and nothing else. Building one function at a time is how you find which part is wrong when something misbehaves — nesting first and debugging afterwards is much harder.",
            },
            {
              move: "Add a message for the case where nothing matches.",
              why: "=FILTER(A2:E900, D2:D900<E2:E900, \"All items in stock\") — without the third argument, a fully stocked week returns #CALC!, which looks like a broken spreadsheet rather than good news.",
            },
            {
              move: "Wrap it in SORT to order by category.",
              why: "=SORT(FILTER(...), 2, 1) sorts the filtered result by its second column, ascending. Sorting the output rather than the source means the underlying data is never rearranged, so nothing can be scrambled.",
            },
            {
              move: "Leave the cells below and to the right of the formula empty.",
              why: "The result needs room to spill. Anything already sitting in the spill range produces #SPILL!, and the fix is to clear those cells — not to change the formula.",
            },
          ],
          result:
            "One formula that produces the full reorder list and updates the moment any quantity changes.",
          takeaway:
            "Build dynamic array formulas one function at a time, always give FILTER an if-empty argument, and keep the spill range clear.",
        },
        {
          type: "table",
          caption: "The two errors you will meet",
          columns: ["Error", "Means", "Fix"],
          rows: [
            ["#SPILL!", "Something is blocking the range the result needs", "Clear the cells in the spill range"],
            ["#NAME?", "Excel does not recognize the function name", "Check the spelling — or check whether your version has it"],
            ["#CALC!", "A dynamic array returned an empty result", "Add the if-empty argument to FILTER"],
          ],
        },
        {
          type: "knowledge-check",
          question:
            "You write =XLOOKUP(A2, Items, Prices) and Excel returns #NAME?. What is the most likely cause?",
          options: [
            "The lookup value in A2 does not exist in the Items range",
            "Your version of Excel does not have XLOOKUP — it requires Microsoft 365, Excel 2021, or 2024",
            "The Items and Prices ranges are different sizes",
            "The formula needs an equals sign",
          ],
          correctIndex: 1,
          explanation:
            "#NAME? means Excel does not recognize a name in the formula — a misspelled function, or a function this version does not have. XLOOKUP was introduced with Microsoft 365 and is absent from Excel 2019, so on a 2019 machine the formula is correct and unavailable.",
          optionRationales: [
            "A missing lookup value returns #N/A, not #NAME?. That is the error that means 'not found'.",
            "Correct. #NAME? means the function name is unrecognized, and XLOOKUP does not exist in Excel 2019.",
            "Mismatched range sizes produce #VALUE!, not #NAME?.",
            "Without an equals sign Excel would store the text rather than showing an error at all.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Build a live summary sheet that needs no maintenance.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "In a workbook with a supply table, use UNIQUE to produce a list of every distinct category on a new sheet. Add a category to the source data and confirm the list grows on its own.",
        "Beside it, use XLOOKUP to pull each category's reorder threshold from a lookup table. Include a fourth argument so a missing category shows a message rather than #N/A.",
        "Write a FILTER formula returning every item below its reorder level, sorted by category with SORT. Give it an if-empty message.",
        "Deliberately type something into a cell inside the spill range. Record the error you get and what you had to do to clear it.",
      ],
    },
  ],
},

/* ============================================================
LESSON 2 – INTELLIGENT SERVICES: DATA TYPES AND ANALYZE DATA
============================================================ */
{
  slug: "intelligent-services-and-data-types",
  title: "Intelligent Services: Data Types & Analyze Data",
  description:
    "Use Excel's connected data types and its automated analysis, and learn where both need checking.",
  duration: "15 min",
  objectives: [
    "Convert text into a linked data type and pull fields from it",
    "Use Analyze Data to generate charts and summaries from a table",
    "Explain what a linked data type depends on and when it breaks",
    "Judge when an automated suggestion should be trusted",
  ],

  sections: [
    {
      heading: "Cells that know what they contain",
      blocks: [
        {
          type: "scenario",
          role: "You are preparing a facilities report at Lakeside Medical Associates.",
          text: "You have a column of city names for the practice's three locations, and you need population and state for each. You could look all six values up by hand, or Excel can attach them to the cells and keep them there.",
          task: "Use linked data types where they save real work, and understand what they depend on.",
        },
        {
          type: "paragraph",
          text: "A linked data type turns a cell's text into a record with fields behind it. Select a column of city names, choose Data > Geography, and Excel matches each to a place. A small icon appears in the cell, and clicking it opens a card of fields — population, area, leader, and so on. You pull a field into a neighbouring cell with the dot operator: =A2.Population.",
        },
        {
          type: "table",
          caption: "The two data types you are most likely to use",
          columns: ["Type", "Attaches", "Reached from"],
          rows: [
            ["Geography", "Cities, states, countries, regions", "Data tab > Geography"],
            ["Stocks", "Companies, funds, and currencies", "Data tab > Stocks"],
          ],
        },
        {
          type: "callout",
          variant: "version",
          text: "Linked data types and Analyze Data require a Microsoft 365 subscription and an internet connection. They are not in Excel 2019, and they are not in the perpetual-licence Office 2024 either — these are subscription services, not local features. On a machine without them, the Data tab simply will not show Geography and Stocks.",
        },
        {
          type: "callout",
          variant: "warning",
          text: "A linked data type is a live connection to an external service, which has three consequences. The values change when the source updates, so a figure in a report you saved last month may not be the figure someone sees today. The cells go stale or error without a connection. And ambiguous names get matched wrongly — a city name that exists in four states will be matched to one of them, and Excel does not ask which. Always check what it matched before you rely on it.",
        },
      ],
    },
    {
      heading: "Analyze Data, and what it is actually doing",
      blocks: [
        {
          type: "paragraph",
          text: "Analyze Data — previously called Ideas — examines a table and proposes charts, patterns, and summaries. Select any cell in a well-formed table, click Analyze Data on the Home tab, and a pane offers visualizations you can insert with one click. You can also type a question in plain language, such as 'total cost by category'.",
        },
        {
          type: "paragraph",
          text: "It works well on clean data and poorly on messy data, which makes it a reasonable test of your table. If Analyze Data cannot find anything useful, the usual cause is the layout rules from Module 5: merged cells, blank rows inside the range, more than one header row, or a column mixing text and numbers.",
        },
        {
          type: "callout",
          variant: "warning",
          text: "Analyze Data finds correlations, and a correlation is not a cause. It may report that supply spending rises with appointment volume, which is unsurprising, or that two unrelated columns move together, which is coincidence. It has no knowledge of your practice and cannot tell the difference. Treat every suggestion as a question to investigate, never as a finding to report.",
        },
        {
          type: "worked-example",
          title: "Using an automated suggestion responsibly",
          task: "Analyze Data reports that costs in one supply category rose sharply in Q3.",
          steps: [
            {
              move: "Check the underlying numbers before repeating the claim.",
              why: "The tool read your table. If the table has a data problem — a duplicated row, a decimal error, a category typo splitting one thing into two — the pattern is real in the data and false in the world.",
            },
            {
              move: "Ask whether anything changed that would explain it.",
              why: "A vendor contract ending, a price increase, a new service line. A rise with a known cause is a fact; a rise with no known cause is a question for someone who would know.",
            },
            {
              move: "Look at what the chart is not showing.",
              why: "A category can rise in dollars while falling as a share of spending, and a chart of one category alone will not tell you that. Ask what the denominator is.",
            },
            {
              move: "Report it as a question rather than a conclusion.",
              why: "'Category X is up 31% in Q3 — I have checked the data and it looks correct, and I don't know why' is genuinely useful. Presenting it as a finding invites a decision built on an unverified number.",
            },
          ],
          result:
            "A verified observation handed to a decision-maker as a question, not an unchecked chart presented as analysis.",
          takeaway:
            "Automated analysis is good at spotting patterns and has no idea what they mean. Verify the data, look for the cause, and report honestly what you do not know.",
        },
        {
          type: "knowledge-check",
          question:
            "Analyze Data returns no useful suggestions for your table. What is the most likely cause?",
          options: [
            "The table has too few rows for the feature to work",
            "The data layout breaks the rules — merged cells, blank rows, multiple header rows, or mixed data types in a column",
            "Analyze Data only works on data imported from an external source",
            "The workbook needs to be saved before the feature runs",
          ],
          correctIndex: 1,
          explanation:
            "Analyze Data expects the same structure every other Excel data tool expects: one header row, one record per row, no blanks or merged cells inside the range, and one data type per column. When it finds nothing, the table is usually the problem — which makes it a quick check on your own layout.",
          optionRationales: [
            "It works on small tables. Very few rows limit what patterns exist, but that is not why it returns nothing.",
            "Correct. Layout problems are the usual cause, and they are the same ones that break sorting, filtering, and PivotTables.",
            "It works on any well-formed table regardless of where the data came from.",
            "Saving is unrelated to whether the feature can read your table.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "These features need a Microsoft 365 account. If your machine does not have them, do the written parts — the judgment matters more than the clicking.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Enter four city names, convert them to the Geography data type, and pull population and state into adjacent columns using the dot operator.",
        "Find a city name that exists in more than one state. Convert it and record which one Excel matched it to, and how you would have known if it were wrong.",
        "Run Analyze Data on a clean table and note the three suggestions it makes. Then break the table deliberately — merge two header cells — and run it again. Record the difference.",
        "For one suggestion it produced, write three sentences: what it claims, what you would verify before repeating it, and what you still would not know.",
      ],
    },
  ],
},

/* ============================================================
LESSON 3 – ICONS, DRAWING TOOLS, AND MODERN COLLABORATION
============================================================ */
{
  slug: "icons-drawing-and-collaboration",
  title: "Icons, Drawing Tools & Modern Collaboration",
  description:
    "Add scalable icons and annotations to a workbook, and work in a shared file without getting in anyone's way.",
  duration: "15 min",
  objectives: [
    "Insert and recolour scalable icons",
    "Use the Draw tab to annotate a sheet",
    "Co-author a workbook and explain what co-authoring requires",
    "Use Sheet View to sort and filter without disturbing other people",
  ],

  sections: [
    {
      heading: "Icons and annotation",
      blocks: [
        {
          type: "scenario",
          role: "You are preparing the quarterly supply summary for a meeting.",
          text: "The numbers are correct and the sheet is a wall of grey. Three icons and a status column would let the practice manager find the two categories that need attention in about four seconds.",
          task: "Add visual signals that speed up reading, without decorating for its own sake.",
        },
        {
          type: "paragraph",
          text: "Insert > Icons opens a searchable library of scalable graphics. Because they are vector images rather than pictures, they stay sharp at any size and can be recoloured from the Graphics Format tab. Insert > Illustrations also offers stock images and, on some builds, 3D models.",
        },
        {
          type: "callout",
          variant: "info",
          text: "An icon should carry meaning, not fill space. A warning triangle beside a below-reorder row helps; a decorative flourish in a corner costs the reader a moment of attention and returns nothing. And an icon must never be the only signal — pair it with a word, because an icon alone is not readable by a screen reader unless you give it alt text, and its meaning may not be obvious to everyone.",
        },
        {
          type: "table",
          caption: "The Draw tab",
          columns: ["Tool", "Use for"],
          rows: [
            ["Pen and highlighter", "Marking up a sheet for discussion in a review meeting"],
            ["Ink to Shape", "Converting a rough drawn shape into a clean one"],
            ["Ink to Math", "Converting handwritten equations into typed ones"],
            ["Eraser", "Removing ink strokes without touching cell contents"],
          ],
        },
        {
          type: "callout",
          variant: "version",
          text: "The Draw tab appears by default on touch devices and can be turned on elsewhere through File > Options > Customize Ribbon. Icons are available in Excel 2019 and later. The 3D model and some stock content features are Microsoft 365 only, so what you see under Insert > Illustrations depends on your build.",
        },
      ],
    },
    {
      heading: "Working in a file with other people",
      blocks: [
        {
          type: "paragraph",
          text: "Co-authoring lets several people edit one workbook at the same time, with each person's selection visible and labelled. It requires the file to be stored in OneDrive or SharePoint, and it requires AutoSave to be on — which is the same requirement, since AutoSave only works on cloud-stored files.",
        },
        {
          type: "callout",
          variant: "warning",
          text: "If AutoSave is greyed out, the file is not in OneDrive or SharePoint. That is also the first thing to check when a colleague says they cannot see your changes — almost always someone is working on a downloaded copy rather than the shared file, and two divergent versions are being created.",
        },
        {
          type: "paragraph",
          text: "Sheet View solves the problem co-authoring creates. In a shared workbook, sorting or filtering normally changes the view for everyone — so one person looking for a vendor rearranges the sheet under a colleague who is mid-entry. Sheet View gives you a private sort and filter that nobody else sees. Find it on the View tab, and note that it changes only what you see, never the underlying data.",
        },
        {
          type: "table",
          caption: "Collaboration features and what each needs",
          columns: ["Feature", "Requires", "Note"],
          rows: [
            ["AutoSave", "File in OneDrive or SharePoint", "Saves continuously — there is no 'close without saving'"],
            ["Co-authoring", "File in OneDrive or SharePoint", "Each editor's selection is shown and named"],
            ["Sheet View", "Microsoft 365", "Private sorting and filtering in a shared file"],
            ["Version History", "File in OneDrive or SharePoint", "File > Info > Version History; the only real recovery from a bad edit"],
            ["Comments", "Any workbook", "Threaded and repliable; Notes are the older single-author kind"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          text: "With AutoSave on, every change is written immediately and there is no unsaved state to abandon. Before trying something drastic on a shared workbook — a large sort, a bulk delete, a restructure — use File > Save a Copy and experiment on the copy. Version History can recover the previous state, but only if you notice in time and know where to look.",
        },
        {
          type: "knowledge-check",
          question:
            "You are working in a shared workbook and need to sort by vendor to find something, but a colleague is entering data at the same time. What should you use?",
          options: [
            "Sort normally — the workbook will resolve any conflict",
            "Sheet View, which gives you a private sort that nobody else sees",
            "Download a copy, sort it, then upload it again",
            "Ask your colleague to stop working while you sort",
          ],
          correctIndex: 1,
          explanation:
            "Sorting a shared workbook normally rearranges it for everyone, which is genuinely disruptive to someone mid-entry and is how data lands in the wrong row. Sheet View gives you a private sort and filter that leaves everyone else's view untouched.",
          optionRationales: [
            "A sort is not a conflict to resolve — it applies to everyone immediately, which is exactly the problem.",
            "Correct. Sheet View is built for this: a private view in a shared file.",
            "Downloading creates a second version, and re-uploading overwrites whatever your colleague did in the meantime.",
            "This works but stops someone else's work for something that has a built-in solution.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Finish the module by making one sheet genuinely easier to read, then sharing it properly.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Add a status column to your supply tracker using a formula, then place an icon beside the header. Give the icon alt text and explain in one sentence why the column matters more than the icon.",
        "Save the workbook to OneDrive and confirm AutoSave turns on. Note what the AutoSave toggle looked like before and after.",
        "Share it with a classmate as an editor. While they have it open, use Sheet View to sort by category and confirm their view does not change.",
        "Make a deliberate bad edit — delete a column — then recover it through File > Info > Version History. Write down the steps, because this is the one you will need under pressure someday.",
      ],
    },
  ],
},

];
