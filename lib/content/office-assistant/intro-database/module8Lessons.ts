import { Lesson } from "@/types/lesson";

/**
 * BUSI 3034 sessions 12-14 — Data Analysis and Automation.
 *
 * Syllabus objectives: understand macros and automation, create simple macros,
 * understand VBA, and build basic VBA procedures for data manipulation.
 */
export const module8Lessons: Lesson[] = [
  {
    slug: "macros-and-automation",
    title: "Automating Tasks with Macros",
    description:
      "Use Access macros to automate repetitive work without writing code, and understand where automation genuinely pays off.",
    duration: "22 min",
    objectives: [
      "Explain what an Access macro is and how it differs from VBA",
      "Build a macro that opens a form and applies a filter",
      "Attach a macro to a command button",
      "Judge which tasks are worth automating",
    ],
    sections: [
      {
        heading: "Automation earns its keep on repetition",
        blocks: [
          {
            type: "scenario",
            role: "You support daily operations at Lakeside Medical Associates.",
            text: "Every morning the front desk performs the same nine steps: open the database, open the appointments form, filter to today, sort by time, and open the check-in form. Nine steps, five staff, every day. Two of them do it slightly differently, and one regularly forgets the filter and works from yesterday's list.",
            task: "Reduce a nine-step routine to one button, so it is both faster and impossible to do inconsistently.",
          },
          {
            type: "paragraph",
            text: "An Access macro is a stored sequence of actions built from a list rather than written as code. You choose actions such as OpenForm, ApplyFilter, or GoToRecord and set their arguments, and Access performs them in order. No programming is required.",
          },
          {
            type: "paragraph",
            text: "The consistency benefit usually exceeds the time saving. A macro performs the same steps in the same order every time, so the staff member who forgets the filter no longer can. Automation that removes a category of human error is worth more than automation that saves thirty seconds.",
          },
          {
            type: "table",
            caption: "Commonly used macro actions",
            columns: ["Action", "Does"],
            rows: [
              ["OpenForm", "Opens a form, optionally filtered to specific records"],
              ["OpenReport", "Opens or prints a report"],
              ["ApplyFilter", "Filters the records shown"],
              ["GoToRecord", "Moves to a specific record — new, next, last"],
              ["SetValue", "Sets a control or field to a value"],
              ["MessageBox", "Displays a message to the user"],
              ["RunQuery", "Runs a stored query"],
              ["CloseWindow", "Closes a form or report"],
            ],
          },
          {
            type: "table",
            caption: "Macros or VBA?",
            columns: ["Consideration", "Macros", "VBA"],
            rows: [
              ["Learning curve", "Low — pick actions from a list", "Higher — a real programming language"],
              ["Conditional logic", "Basic If conditions", "Full control flow"],
              ["Error handling", "Very limited", "Proper error handling"],
              ["Looping through records", "Not practical", "Straightforward"],
              ["Best for", "Navigation, opening objects, simple automation", "Data manipulation, validation, complex logic"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Automate a process only once it is stable and correct. Automating a nine-step routine that has a mistake in step four means performing that mistake reliably, five times a day, without anyone noticing. Get the manual process right first, then automate it.",
          },
          {
            type: "knowledge-check",
            question:
              "A five-step daily routine is performed by five staff, two of whom do it slightly differently. What is the strongest argument for automating it with a macro?",
            options: [
              "It will save each person a few seconds every morning",
              "Everyone performs identical steps in identical order, removing an entire class of inconsistency and error",
              "Macros run faster than a person clicking",
              "It reduces the number of objects in the database",
            ],
            correctIndex: 1,
            explanation:
              "The time saved is trivial. The real value is consistency: a macro cannot forget the filter or reorder the steps, so the error one staff member keeps making becomes impossible rather than merely discouraged.",
            optionRationales: [
              "A few seconds a day rarely justifies building and maintaining anything. It is the weakest argument here.",
              "Correct. Consistency removes a class of error, which is worth far more than the time saved.",
              "Execution speed is real but marginal, and not why this routine is worth automating.",
              "A macro adds an object rather than removing any.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Automate something you actually repeat.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write down every step of a routine you perform in your database more than once a week. Number them.",
          "Build a macro reproducing those steps using OpenForm, ApplyFilter, and any others you need. Run it and compare the result against doing it manually.",
          "Add a command button to a form and attach the macro to its On Click event. Test it three times.",
          "Write two sentences on which step of the routine was most error-prone by hand, and how the macro removes that risk.",
        ],
      },
    ],
  },
  {
    slug: "introduction-to-vba",
    title: "Introduction to VBA",
    description:
      "Write your first VBA procedures, and understand when code is the right tool and when a macro or a query is better.",
    duration: "26 min",
    objectives: [
      "Explain what VBA is and where it lives in Access",
      "Write a simple Sub procedure and run it",
      "Use variables, an If statement, and a loop",
      "Judge when VBA is warranted over a macro or a query",
    ],
    sections: [
      {
        heading: "When the list of actions runs out",
        blocks: [
          {
            type: "scenario",
            role: "You extend the practice database at Lakeside Medical Associates.",
            text: "The manager wants a button that checks every supply item, finds those below their reorder level, builds a single order list grouped by vendor, and emails it. Macros can open forms and apply filters. They cannot loop through records making a decision about each one.",
            task: "Learn enough VBA to recognize when it is genuinely needed, and to write a simple procedure.",
          },
          {
            type: "paragraph",
            text: "VBA — Visual Basic for Applications — is the programming language built into Access, Excel, Word, and the rest of Office. It lives in the Visual Basic Editor, opened with Alt+F11, and it can do things the macro action list cannot: loop through records, handle errors properly, and express arbitrary logic.",
          },
          {
            type: "code",
            language: "vba",
            code: `Sub CountLowStock()
    Dim db As DAO.Database
    Dim rs As DAO.Recordset
    Dim lowCount As Integer

    Set db = CurrentDb
    Set rs = db.OpenRecordset("SELECT * FROM Supplies")

    lowCount = 0
    Do Until rs.EOF
        If rs!Quantity < rs!ReorderLevel Then
            lowCount = lowCount + 1
        End If
        rs.MoveNext
    Loop

    MsgBox lowCount & " items are below reorder level."

    rs.Close
    Set rs = Nothing
    Set db = Nothing
End Sub`,
          },
          {
            type: "paragraph",
            text: "Read it as a sequence. Dim declares variables. Set assigns object references. The Do Until loop walks through every record until it reaches the end of file. The If statement tests each record and increments a counter. MsgBox reports the result. The final lines release the objects, which matters because Access does not always clean them up promptly.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Sub",
                definition:
                  "A procedure that performs actions and returns nothing. Most VBA you write in Access is a Sub.",
              },
              {
                term: "Function",
                definition:
                  "A procedure that returns a value, so it can be used in a query or a control's expression.",
              },
              {
                term: "Dim",
                definition:
                  "Declares a variable and its type. Type declarations catch mistakes at compile time rather than at runtime.",
              },
              {
                term: "Recordset",
                definition:
                  "A set of records your code can move through one at a time — the object that makes looping possible.",
              },
              {
                term: "EOF",
                definition:
                  "End Of File. True when the recordset has passed its last record; the standard loop condition.",
              },
              {
                term: "Event procedure",
                definition:
                  "Code that runs in response to something happening — a button click, a form opening, a value changing.",
              },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Put Option Explicit at the top of every module, and turn on Tools > Options > Require Variable Declaration so it is added automatically. Without it, a mistyped variable name silently creates a new empty variable instead of raising an error, and the resulting bug is genuinely hard to find. This one setting prevents more wasted hours than any other habit in VBA.",
          },
          {
            type: "worked-example",
            title: "Choosing between a query, a macro, and VBA",
            task: "Decide the right tool for four tasks in the practice database.",
            steps: [
              {
                move: "'Show all items below reorder level' — use a query.",
                why: "This is a question about data with no action attached. A query answers it, is easier to maintain than code, and anyone can open it. Reaching for VBA here would be building a program to do a query's job.",
              },
              {
                move: "'Open the appointments form filtered to today' — use a macro.",
                why: "A fixed sequence of standard actions with no logic. The macro action list covers it, and a macro is far easier for the next person to read and modify than equivalent code.",
              },
              {
                move: "'Check every item, group by vendor, and email the order list' — use VBA.",
                why: "This requires looping through records, making a decision per record, building output, and calling another application. Macros cannot loop, so this is genuinely past what they can express.",
              },
              {
                move: "'Prevent saving a record with a quantity below zero' — use table validation first.",
                why: "The cheapest correct answer is often not code at all. A validation rule on the field enforces this everywhere the data is touched, including direct table entry, where form-level VBA would be bypassed entirely.",
              },
            ],
            result:
              "Each task solved with the simplest tool that can do it correctly.",
            takeaway:
              "Reach for the simplest tool that works: validation, then query, then macro, then VBA. Code is the most powerful option and the most expensive to maintain.",
          },
          {
            type: "knowledge-check",
            question:
              "Which task genuinely requires VBA rather than a macro?",
            options: [
              "Opening a report filtered to a chosen date range",
              "Looping through every record in a table and applying different logic depending on each record's values",
              "Displaying a message box when a form opens",
              "Running a saved query from a button",
            ],
            correctIndex: 1,
            explanation:
              "Macros perform a fixed sequence of actions and cannot iterate through records making per-record decisions. Looping with conditional logic is exactly the boundary where VBA becomes necessary.",
            optionRationales: [
              "The OpenReport macro action accepts a filter argument, so a macro handles this.",
              "Correct. Looping through records with per-record logic is beyond what macros can express.",
              "The MessageBox action does this, attached to the form's On Open event.",
              "The RunQuery action does this directly.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work on a copy of your database. Code that manipulates data deserves the same caution as an action query.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open the VBA editor with Alt+F11 and enable Require Variable Declaration. Confirm Option Explicit now appears at the top of new modules.",
          "Type the CountLowStock procedure from this lesson into a new module, adapting the table and field names to your database. Run it and confirm the count matches what a query returns.",
          "Modify it so that instead of counting, it builds a message listing each low-stock item's name. You will need to concatenate strings inside the loop.",
          "For each of the four tasks in the worked example, write one sentence justifying the tool chosen. Then add a fifth task from your own database and choose a tool for it.",
        ],
      },
    ],
  },
];
