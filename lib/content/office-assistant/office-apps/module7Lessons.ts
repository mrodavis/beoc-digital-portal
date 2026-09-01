import { Lesson } from "@/types/lesson";

/**
 * INFO 3033 Module 2 (Google half) — Google Docs.
 *
 * The syllabus pairs a Google Workspace application with every Microsoft one.
 * This module covers the Docs half of "MS Word / Google Docs" (sessions 8-14).
 */
export const module7Lessons: Lesson[] = [
  {
    slug: "google-docs-essentials",
    title: "Google Docs Essentials",
    description:
      "Create, format, and share documents in Google Docs, and understand how a browser-based word processor differs from Word in ways that matter at work.",
    duration: "25 min",
    objectives: [
      "Create, name, and organize documents in Google Drive",
      "Apply text and paragraph formatting, and use styles for structure",
      "Explain how Docs saves work and how to recover an earlier version",
      "Choose between Google Docs and Microsoft Word for a given task",
    ],
    sections: [
      {
        heading: "Why the practice uses both",
        blocks: [
          {
            type: "scenario",
            role: "You handle correspondence at Lakeside Medical Associates.",
            text: "The practice manager asks you to draft the new patient welcome letter so that three people can comment on it before Friday. She also asks for the finished version as a formatted PDF on practice letterhead. One of those jobs suits Google Docs. The other suits Word. Choosing wrongly means either a week of emailed attachments or a letter whose letterhead shifts on the page.",
            task: "Learn Docs well enough to know when it is the better tool and when it is not.",
          },
          {
            type: "paragraph",
            text: "Google Docs is a word processor that lives in a browser. The document is stored in Google Drive rather than on your computer, which changes three things fundamentally: it saves continuously rather than when you press Ctrl+S, several people can genuinely type in it at the same time, and every version is kept so you can go back to any earlier state.",
          },
          {
            type: "paragraph",
            text: "Those three properties make Docs excellent for drafting and collaboration. Word remains stronger for precise page layout, long structured documents, mail merge, and anything that must print exactly as designed. A practice that uses both is not being indecisive — it is matching the tool to the job.",
          },
          {
            type: "table",
            caption: "Choosing between Docs and Word",
            columns: ["Task", "Better tool", "Why"],
            rows: [
              [
                "A draft three people must comment on",
                "Google Docs",
                "Real-time editing and threaded comments with no emailed versions",
              ],
              [
                "A letter that must print exactly on letterhead",
                "Microsoft Word",
                "Finer control over margins, sections, and page layout",
              ],
              [
                "240 personalized recall letters",
                "Microsoft Word",
                "Mail merge; Docs has no equivalent built in",
              ],
              [
                "A form several staff fill in weekly",
                "Google Docs",
                "Always current, reachable from any machine, no version confusion",
              ],
              [
                "A document with complex tables and precise pagination",
                "Microsoft Word",
                "Section breaks and layout control Docs does not match",
              ],
            ],
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Google Drive",
                definition:
                  "The storage service where Docs, Sheets, and Slides files live. The document has no copy on your own computer unless you export one.",
              },
              {
                term: "Version history",
                definition:
                  "The complete record of changes to a document, with named contributors. File > Version history lets you view or restore any earlier state.",
              },
              {
                term: "Suggesting mode",
                definition:
                  "An editing mode where your changes appear as proposals the owner can accept or reject — the Docs counterpart to Word's Track Changes.",
              },
              {
                term: "Sharing permission",
                definition:
                  "What a person may do with the file: Viewer, Commenter, or Editor. Set per person or per link.",
              },
            ],
          },
        ],
      },
      {
        heading: "Working in the document",
        blocks: [
          {
            type: "paragraph",
            text: "Most formatting works the way it does in Word, and the keyboard shortcuts are deliberately the same — Ctrl+B for bold, Ctrl+I for italic, Ctrl+K for a link. What differs is where things live and what the application assumes.",
          },
          {
            type: "table",
            caption: "Where to find things in Docs",
            columns: ["To do this", "Go to"],
            rows: [
              ["Apply a heading style", "The styles dropdown on the toolbar, left of the font name"],
              ["Change margins and orientation", "File > Page setup"],
              ["Insert a table, image, or link", "The Insert menu"],
              ["Check spelling and grammar", "Tools > Spelling and grammar"],
              ["See the document outline", "View > Show outline"],
              ["Export as .docx or PDF", "File > Download"],
            ],
          },
          {
            type: "paragraph",
            text: "Heading styles matter here for the same reasons they matter in Word. They build the document outline in the left pane, they let you generate a table of contents, and they let screen reader users navigate by section. Text made large and bold is not a heading, in either application.",
          },
          {
            type: "worked-example",
            title: "Drafting a letter three people will review",
            task: "Produce the new patient welcome letter as a Docs draft the manager and two nurses can comment on, then deliver a final PDF.",
            steps: [
              {
                move: "Create the document in a shared Drive folder rather than your own My Drive.",
                why: "A file in your personal Drive belongs to you, and if you leave the practice it can become inaccessible. A shared folder means the practice owns it and the right people already have access without anyone requesting it.",
              },
              {
                move: "Structure it with real heading styles before writing the body.",
                why: "The outline pane then shows the letter's structure as you draft, and reviewers can jump to a section rather than scrolling. This costs nothing at the start and is tedious to retrofit.",
              },
              {
                move: "Share with the three reviewers as Commenter, not Editor.",
                why: "Commenters can raise points and suggest, but cannot silently change the text. For a review round this is what you want — you keep authorship, and every suggestion is something you actively accept or reject.",
              },
              {
                move: "Resolve each comment thread as you address it.",
                why: "Resolving keeps the thread in the history while clearing it from view, so at a glance you can see what is still outstanding. Deleting comments loses the record of why the letter says what it says.",
              },
              {
                move: "For the final letterhead version, File > Download > Microsoft Word, then finish in Word.",
                why: "Docs is the right tool for the review and the wrong one for precise letterhead layout. Moving to Word for the final pass gives you the page control the printed letter needs, and the PDF comes from there.",
              },
            ],
            result:
              "A reviewed letter with the discussion preserved, and a final PDF laid out correctly on letterhead.",
            takeaway:
              "Draft and review where collaboration is easy; finish where layout control is precise. Sharing as Commenter rather than Editor is the small choice that keeps a review orderly.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "A personal Google account is not an approved place for protected health information. Patient names, dates of birth, and visit details belong only in systems your employer has assessed and covered by a business associate agreement. Google Workspace can be configured to meet those requirements, but a personal gmail.com account is not — and 'anyone with the link can edit' on a document containing patient data is a reportable breach, not a convenience.",
          },
          {
            type: "knowledge-check",
            question:
              "You share a draft with three colleagues and want them to raise points without altering your text. Which permission should you give them?",
            options: [
              "Editor, so they can fix problems directly",
              "Commenter, so they can comment and suggest but not change the text",
              "Viewer, so the document stays exactly as written",
              "Owner, so responsibility is shared",
            ],
            correctIndex: 1,
            explanation:
              "Commenter allows comments and suggested edits while leaving the text under your control — every suggestion is something you accept or reject. Editor would let them change the document directly, and Viewer would prevent them from giving feedback in the document at all.",
            optionRationales: [
              "Editor permits direct changes to the text, which is exactly what you said you did not want for this review round.",
              "Correct. Commenters can comment and suggest; the author decides what is accepted.",
              "Viewers can read but cannot comment, so you would lose the feedback the review exists to gather.",
              "Ownership controls the file itself, including deletion and permissions. Transferring it is far more than a review requires.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "You will need a Google account. The syllabus requires one for this course.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Google Doc named 'New Patient Welcome — Lakeside Medical'. Structure it with a Title, two Heading 1 sections, and body text under each. Confirm all three appear in View > Show outline.",
          "Share it with a classmate as Commenter and ask them to suggest one change. Accept it, then open File > Version history and identify the version before their suggestion.",
          "Download the document as both .docx and PDF. Open the .docx in Word and note every formatting difference you can find — there will be some.",
          "Write three sentences on when you would draft in Docs and finish in Word, using a specific task from a medical office as your example.",
        ],
      },
    ],
  },
  {
    slug: "google-sheets-essentials",
    title: "Google Sheets Essentials",
    description:
      "Build and share spreadsheets in Google Sheets, use its formulas, and understand where it differs from Excel in practice.",
    duration: "25 min",
    objectives: [
      "Enter and format data, and build formulas using cell references",
      "Use functions shared with Excel, and the ones unique to Sheets",
      "Sort, filter, and protect ranges in a shared spreadsheet",
      "Choose between Sheets and Excel for a given task",
    ],
    sections: [
      {
        heading: "The same grid, a different set of trade-offs",
        blocks: [
          {
            type: "scenario",
            role: "You track supply orders at Lakeside Medical Associates.",
            text: "Three staff need to update the supply log during the day. The Excel file on the shared drive keeps opening read-only because someone left it open at lunch, and two people have started keeping their own copies. Within a fortnight there are three versions and none of them is right.",
            task: "Use a shared spreadsheet where simultaneous editing is the normal case rather than a conflict.",
          },
          {
            type: "paragraph",
            text: "Google Sheets uses the same fundamental model as Excel: a grid of addressed cells, formulas beginning with an equals sign, and functions like SUM, AVERAGE, IF, and VLOOKUP that work the same way. Almost everything you learned about Excel formulas transfers directly.",
          },
          {
            type: "paragraph",
            text: "What differs is the collaboration model. Sheets was built for many people in one file at once, which is exactly the supply-log problem. Excel is stronger for large data sets, PivotTables, advanced analysis, and anything involving macros. Sheets slows noticeably on very large files where Excel is still comfortable.",
          },
          {
            type: "table",
            caption: "Sheets and Excel compared",
            columns: ["Capability", "Google Sheets", "Microsoft Excel"],
            rows: [
              [
                "Several people editing at once",
                "Built for it; the normal case",
                "Possible via OneDrive, but less fluid",
              ],
              [
                "Very large data sets",
                "Slows down well before Excel does",
                "Handles far more rows comfortably",
              ],
              [
                "PivotTables",
                "Yes, simpler",
                "Yes, considerably more capable",
              ],
              [
                "Pulling live web or sheet data",
                "IMPORTRANGE, IMPORTHTML, GOOGLEFINANCE",
                "Requires Power Query or add-ins",
              ],
              [
                "Macros and automation",
                "Apps Script (JavaScript)",
                "VBA, more mature for desktop automation",
              ],
              [
                "Working offline",
                "Requires setup; limited",
                "Fully offline",
              ],
            ],
          },
        ],
      },
      {
        heading: "Formulas, and the functions Sheets adds",
        blocks: [
          {
            type: "paragraph",
            text: "Every formula begins with an equals sign, cell references work identically, and the dollar sign makes a reference absolute exactly as it does in Excel. SUM, AVERAGE, COUNT, MIN, MAX, IF, and the lookup functions all behave the same way.",
          },
          {
            type: "table",
            caption: "Functions with no direct Excel equivalent",
            columns: ["Function", "Does", "Use for"],
            rows: [
              [
                "IMPORTRANGE",
                "Pulls a range from another Google Sheet",
                "A summary sheet drawing from several department logs",
              ],
              [
                "QUERY",
                "Runs a SQL-like query against a range",
                "Filtering and summarizing without building a PivotTable",
              ],
              [
                "ARRAYFORMULA",
                "Applies one formula down a whole column",
                "A calculated column that covers new rows automatically",
              ],
              [
                "GOOGLETRANSLATE",
                "Translates text in a cell",
                "Rough first-pass translation — never for clinical content",
              ],
              [
                "SPARKLINE",
                "Draws a miniature chart in a cell",
                "A trend indicator beside each supply category",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Protect the formula columns before sharing a spreadsheet several people will edit. Data > Protect sheets and ranges lets you restrict specific ranges to specific people while leaving the data entry columns open. Without it, the most common outcome is exactly what happens in Excel — someone tabs into a formula cell and types over it, and the sheet is quietly wrong from then on.",
          },
          {
            type: "knowledge-check",
            question:
              "Three staff need to update the same supply log throughout the day, and the total row must never be overwritten. What is the appropriate setup?",
            options: [
              "Email the file each morning and consolidate the copies at night",
              "Use one Google Sheet, share it with all three as Editors, and protect the formula ranges",
              "Give all three view-only access and enter their updates yourself",
              "Keep separate sheets for each person and merge them weekly",
            ],
            correctIndex: 1,
            explanation:
              "One shared sheet removes the version problem entirely, and range protection keeps the formulas safe while leaving the data entry columns editable. This is precisely the situation Sheets is built for.",
            optionRationales: [
              "Emailing copies recreates the version conflict the shared sheet is meant to eliminate.",
              "Correct. One file, three editors, protected formula ranges.",
              "Routing every update through one person creates a bottleneck and delays the data without improving accuracy.",
              "Separate sheets merged weekly means the log is out of date for most of the week and the merge is manual work that will eventually be skipped.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a working shared tracker rather than a static sheet.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Google Sheet named 'Supply Log — Lakeside'. Add columns for Item, Category, Quantity, Unit Cost, and Total Cost. Enter eight rows of sample data.",
          "In Total Cost, write a formula multiplying Quantity by Unit Cost, and fill it down. Add a total row using SUM.",
          "Use Data > Protect sheets and ranges to protect the Total Cost column and the total row, leaving the other columns editable. Share the sheet with a classmate as Editor and confirm they cannot alter the protected cells.",
          "Add a Category dropdown using Data > Data validation with four options, then write two sentences explaining what validation prevents that protection does not.",
        ],
      },
    ],
  },
  {
    slug: "google-slides-essentials",
    title: "Google Slides Essentials",
    description:
      "Build and deliver presentations in Google Slides, and apply the same design discipline that governs any presentation tool.",
    duration: "20 min",
    objectives: [
      "Create a presentation using layouts and the theme system",
      "Collaborate on a deck and use speaker notes",
      "Present with Slides, including presenter view",
      "Move a deck between Slides and PowerPoint",
    ],
    sections: [
      {
        heading: "Same principles, browser-based",
        blocks: [
          {
            type: "scenario",
            role: "You build the staff in-service presentation at Lakeside Medical Associates.",
            text: "Two colleagues are contributing slides and the deck must be presentable from whichever machine is free in the conference room. Emailing a .pptx between three people produces three partial decks and a scramble on the morning.",
            task: "Build the deck where all three can work in it, and present it from any machine with a browser.",
          },
          {
            type: "paragraph",
            text: "Everything in the PowerPoint modules about presentation design applies here without modification. The audience still cannot read and listen at once, text-heavy slides still fail, layouts still keep a deck consistent, and speaker notes still belong in the notes pane rather than on the slide.",
          },
          {
            type: "paragraph",
            text: "What Slides changes is access. The deck lives in Drive, several people can build it simultaneously, and it presents from any browser — which removes the most common presentation failure, which is the file being on the wrong computer.",
          },
          {
            type: "table",
            caption: "Slides terminology against PowerPoint",
            columns: ["PowerPoint", "Google Slides", "Note"],
            rows: [
              ["Slide Master", "Theme builder (Slide > Edit theme)", "Same inheritance idea"],
              ["Layout", "Layout", "Identical concept"],
              ["Design tab themes", "Theme panel", "Applies colors and fonts deck-wide"],
              ["Presenter View", "Presenter view", "Notes, timer, and audience Q&A"],
              ["Save As .pptx", "File > Download > Microsoft PowerPoint", "For handing to someone using PowerPoint"],
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Converting between Slides and PowerPoint is reliable for text, layouts, and images, and less so for animations, transitions, and embedded video. If a deck must be delivered in PowerPoint, build it in PowerPoint. If it must be built collaboratively, build it in Slides and accept that a conversion may need tidying. Deciding this before you start saves rebuilding the deck the night before.",
          },
          {
            type: "knowledge-check",
            question:
              "Three staff must build one deck over two weeks, and it will be presented from whichever conference room machine is free. What is the strongest reason to use Google Slides here?",
            options: [
              "Slides offers more animation options than PowerPoint",
              "One shared deck removes version conflicts, and it presents from any browser without the file being on that machine",
              "Slides produces higher quality printed handouts",
              "Slides automatically writes speaker notes",
            ],
            correctIndex: 1,
            explanation:
              "The two problems here are collaboration and machine availability. A single Drive-hosted deck solves both: everyone edits the same file, and it opens in any browser without needing to be transferred.",
            optionRationales: [
              "PowerPoint has the more extensive animation and transition tooling. That is not why Slides fits this situation.",
              "Correct. One shared file eliminates versions, and browser presentation removes the file-transfer failure.",
              "Print output is not a Slides strength, and it is not what this scenario needs.",
              "No tool writes speaker notes for you. Notes are yours to write, in either application.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a short deck collaboratively and check that it survives conversion.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a six-slide Google Slides deck on a workplace topic. Use a title slide and at least three different layouts. Put your talking points in speaker notes, not on the slides.",
          "Share it with a classmate as Editor and have them add one slide using an existing layout. Confirm their slide matches the deck's design.",
          "Download the deck as .pptx and open it in PowerPoint. List every difference you find between the two versions.",
          "Present the deck in presenter view and note what you can see that the audience cannot. Write two sentences on why that matters for how you deliver it.",
        ],
      },
    ],
  },
];
