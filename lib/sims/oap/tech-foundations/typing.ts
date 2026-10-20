import type { SimDefinition } from "@/types/sim";
import { typeAll, typingDoc } from "@/components/sim/apps/typing/types";

/** tech-foundations sims that run in the typing engine. Keys are "<moduleSlug>::<lessonSlug>". */

const PHONE_KEISHA = ["(347) 555-0186", "347-555-0186", "347 555 0186", "3475550186", "(347)555-0186", "347.555.0186"];
const PHONE_DANIEL = ["(347) 555-0123", "347-555-0123", "347 555 0123", "3475550123", "(347)555-0123", "347.555.0123"];

export const typingSims: Record<string, SimDefinition[]> = {
  /* ---------------------------------------------------------------- */
  /* Module 5: Touch Typing Fundamentals                               */
  /* ---------------------------------------------------------------- */
  "module-5::touch-typing-fundamentals": [
    {
      id: "tf-m5-touch-typing-1",
      app: "typing",
      title: "Home row warm-up before the fall rush",
      scenario:
        "You work the front desk at the Kestrel Point Community College admissions office. Every check-in means typing a name, a date, and an appointment type, and your supervisor wants you typing by touch before the fall rush. Warm up on the home row, then type two short front desk phrases without looking down.",
      fileName: "Home Row Warm-Up",
      minutes: 6,
      initial: typingDoc({
        learner: "Jordan Rivera",
        active: "k1",
        exercises: [
          {
            id: "k1",
            kind: "keys",
            title: "Home Row: F and J",
            subtitle: "Find the bumps on F and J with your index fingers.",
            keys: ["f", "j"],
            text: "fff jjj fff jjj fj fj jf jf ffj jjf fjf jfj",
            tip: "Rest your fingers lightly on A S D F and J K L ;. Your thumbs hover over the space bar.",
          },
          {
            id: "k2",
            kind: "keys",
            title: "Home Row: All Eight Keys",
            subtitle: "Left hand A S D F, right hand J K L ;",
            keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
            text: "asdf jkl; asdf jkl; fdsa ;lkj adsf jlk; a;sldkfj",
            tip: "After every key, let the finger come back to its home key.",
          },
          {
            id: "k3",
            kind: "keys",
            title: "Home Row Words",
            subtitle: "Real words that use only home row keys.",
            keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
            text: "a sad lad; ask dad; all fall; a flask; salad; lads ask; dad falls; add salsa",
            tip: "Keep your eyes on the screen. If you feel lost, find F and J by feel.",
          },
          {
            id: "p1",
            kind: "passage",
            title: "Front Desk Phrases",
            subtitle: "Phrases you type every day at the admissions desk.",
            text: "Kestrel Point Community College. Appointment confirmed for October 22, 2026.",
            goalAccuracy: 95,
            tip: "Accuracy first. Speed comes once the right finger finds the right key every time.",
          },
          {
            id: "p2",
            kind: "passage",
            title: "Eyes on the Screen",
            subtitle: "A reminder you type, so it sticks.",
            text: "Keep your eyes on the screen. Feel for the bumps on F and J, and return to the home row after every key.",
            goalAccuracy: 95,
          },
        ],
      }),
      tasks: [
        {
          instruction: "Complete the drill “Home Row: F and J.” Keep your index fingers on the F and J bumps.",
          hint: "Click in the drill text, rest your index fingers on F and J, and type each letter shown. Press the space bar with your thumb. The drill only moves forward when you press the right key.",
          steps: [{ action: { kind: "type", target: "keys", value: "fff jjj fff jjj fj fj jf jf ffj jjf fjf jfj", match: "exact" }, requires: { selection: "ex:k1" }, selectHint: "Open “Home Row: F and J” in the Exercises list first." }],
        },
        {
          instruction: "Open the drill “Home Row: All Eight Keys” and complete it.",
          hint: "Select “Home Row: All Eight Keys” in the Exercises list on the left. Click in the drill text, rest your fingers on A S D F and J K L ;, and type each key shown.",
          steps: [{ action: { kind: "type", target: "keys", value: "asdf jkl; asdf jkl; fdsa ;lkj adsf jlk; a;sldkfj", match: "exact" }, requires: { selection: "ex:k2" }, selectHint: "Open “Home Row: All Eight Keys” in the Exercises list first." }],
        },
        {
          instruction: "Open “Home Row Words” and complete it without looking at the keyboard.",
          hint: "Select “Home Row Words” in the Exercises list. Keep your eyes on the text and return each finger to the home row after every key.",
          steps: [{ action: { kind: "type", target: "keys", value: "a sad lad; ask dad; all fall; a flask; salad; lads ask; dad falls; add salsa", match: "exact" }, requires: { selection: "ex:k3" }, selectHint: "Open “Home Row Words” in the Exercises list first." }],
        },
        {
          instruction: "Open the passage “Front Desk Phrases” and type it with at least 95% accuracy.",
          hint: "Select “Front Desk Phrases” in the Exercises list. Click in the text and type it exactly, including capital letters, commas and periods. Use Backspace to fix a mistake.",
          steps: [
            {
              action: { kind: "type", target: "passage", value: "Kestrel Point Community College. Appointment confirmed for October 22, 2026.", match: "similar", threshold: 0.95 },
              requires: { selection: "ex:p1" },
              selectHint: "Open “Front Desk Phrases” in the Exercises list first.",
            },
          ],
        },
        {
          instruction: "Open the passage “Eyes on the Screen” and type it with at least 95% accuracy.",
          hint: "Select “Eyes on the Screen” in the Exercises list and type the passage. Hold Shift with the opposite pinky for the capital letters.",
          steps: [
            {
              action: { kind: "type", target: "passage", value: "Keep your eyes on the screen. Feel for the bumps on F and J, and return to the home row after every key.", match: "similar", threshold: 0.95 },
              requires: { selection: "ex:p2" },
              selectHint: "Open “Eyes on the Screen” in the Exercises list first.",
            },
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 5: Data Entry Best Practices                               */
  /* ---------------------------------------------------------------- */
  "module-5::data-entry-accuracy": [
    {
      id: "tf-m5-data-entry-1",
      app: "typing",
      title: "Enter a scanned enrollment form",
      scenario:
        "You are an office assistant in the Kestrel Point Community College admissions office. A new applicant dropped off a paper enrollment form, and it has been scanned. Enter it into the Student Information System exactly as written, read every entry back against the form, and save the record.",
      fileName: "New Applicant",
      minutes: 7,
      initial: typingDoc({
        product: "KeyPath Data Entry Trainer",
        learner: "Jordan Rivera",
        active: "f1",
        exercises: [
          {
            id: "f1",
            kind: "form",
            title: "New Applicant Record",
            system: "Student Information System",
            record: "Admissions › New Applicant",
            verifyLabel: "I read back every field against the source form.",
            submitLabel: "Save record",
            source: {
              kind: "scan",
              org: "Kestrel Point Community College · Office of Admissions",
              title: "Student Enrollment Form",
              stamp: "Received\nOct 19 2026",
              sections: [
                {
                  heading: "Applicant Information",
                  rows: [
                    { label: "Last name", value: "Okafor-Bennett" },
                    { label: "First name", value: "Keisha" },
                    { label: "Date of birth (MM/DD/YYYY)", value: "03/14/1997" },
                    { label: "Phone", value: "(347) 555-0186" },
                    { label: "Email", value: "keisha.okafor.b@mailbox.example", wide: true },
                  ],
                },
                {
                  heading: "Mailing Address",
                  rows: [
                    { label: "Street address", value: "1458 Linden Blvd, Apt 3C", wide: true },
                    { label: "City", value: "Brooklyn" },
                    { label: "State / ZIP", value: "NY   11212" },
                  ],
                },
                {
                  heading: "Program",
                  rows: [
                    { label: "Program of study", value: "Business Office Technology", wide: true },
                    { label: "Start term", value: "Spring 2027" },
                    { label: "Enrollment (check one)", value: "☐ Full-time   ☑ Part-time" },
                  ],
                },
                {
                  heading: "Emergency Contact",
                  rows: [
                    { label: "Name", value: "Daniel Bennett" },
                    { label: "Relationship", value: "Brother" },
                    { label: "Phone", value: "(347) 555-0123" },
                  ],
                },
              ],
              footer: "Applicant signature: K. Okafor-Bennett        Date: 10/19/2026",
            },
            sections: [
              {
                id: "s1",
                heading: "Applicant",
                fields: [
                  { name: "firstName", label: "First Name", required: true },
                  { name: "lastName", label: "Last Name", required: true },
                  { name: "dob", label: "Date of Birth", type: "date", span: 2, required: true },
                  { name: "phone", label: "Phone", type: "tel", span: 2 },
                  { name: "email", label: "Email", type: "email", span: 2 },
                ],
              },
              {
                id: "s2",
                heading: "Mailing Address",
                fields: [
                  { name: "street", label: "Street Address", span: 6 },
                  { name: "city", label: "City", span: 2 },
                  { name: "state", label: "State", type: "select", options: ["CT", "NJ", "NY", "PA"], span: 2 },
                  { name: "zip", label: "ZIP Code", span: 2 },
                ],
              },
              {
                id: "s3",
                heading: "Program",
                fields: [
                  { name: "program", label: "Program of Study", type: "select", options: ["Accounting", "Business Office Technology", "Computer Information Systems", "Early Childhood Education", "Liberal Arts"], span: 4 },
                  { name: "term", label: "Start Term", type: "select", options: ["Fall 2026", "Spring 2027", "Summer 2027"], span: 2 },
                  { name: "status", label: "Enrollment Status", type: "radio", options: ["Full-time", "Part-time"], span: 6 },
                ],
              },
              {
                id: "s4",
                heading: "Emergency Contact",
                fields: [
                  { name: "ecName", label: "Contact Name", span: 2 },
                  { name: "ecRelationship", label: "Relationship", type: "select", options: ["Parent", "Sibling", "Spouse or Partner", "Friend", "Other"], span: 2 },
                  { name: "ecPhone", label: "Contact Phone", type: "tel", span: 2 },
                ],
              },
            ],
          },
        ],
      }),
      tasks: [
        {
          // One any-order task for the whole Applicant section: a learner who fills it top to bottom
          // (names, then date of birth and phone, then email) never types ahead of the task.
          instruction: "Enter the applicant's first name, last name, date of birth, phone number, and email address exactly as they are written on the scanned form. Read each number back against the form before you move on.",
          hint: "Click First Name and type “Keisha”, press Tab, and type “Okafor-Bennett” (with the hyphen). Press Tab and type “03/14/1997” in Date of Birth, then “(347) 555-0186” in Phone, then the email address. Tab moves to the next field and saves the one you left.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "field:firstName", value: "Keisha" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:lastName", value: "Okafor-Bennett" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:dob", value: ["03/14/1997", "3/14/1997"] }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:phone", value: PHONE_KEISHA }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:email", value: "keisha.okafor.b@mailbox.example" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
          ],
        },
        {
          instruction: "Enter the mailing address: street, city, state, and ZIP code.",
          hint: "Type “1458 Linden Blvd, Apt 3C” in Street Address and press Tab. Type “Brooklyn”, choose NY in the State list, and type “11212” in ZIP Code.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "field:street", value: ["1458 Linden Blvd, Apt 3C", "1458 Linden Blvd Apt 3C", "1458 Linden Blvd., Apt 3C", "1458 Linden Blvd. Apt 3C"] }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:city", value: "Brooklyn" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:state", value: "NY" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:zip", value: "11212" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
          ],
        },
        {
          instruction: "Select the program of study, the start term, and the enrollment status the applicant checked.",
          hint: "Program of Study list › Business Office Technology. Start Term list › Spring 2027. Enrollment Status › Part-time (the box checked on the form).",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "field:program", value: "Business Office Technology" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:term", value: "Spring 2027" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:status", value: "Part-time" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
          ],
        },
        {
          instruction: "Enter the emergency contact's name and phone number, and choose the relationship that matches “Brother.”",
          hint: "Type “Daniel Bennett” in Contact Name. Relationship list › Sibling. Type “(347) 555-0123” in Contact Phone.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "field:ecName", value: "Daniel Bennett" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:ecRelationship", value: "Sibling" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "type", target: "field:ecPhone", value: PHONE_DANIEL }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
          ],
        },
        {
          instruction: "Read back every field against the scanned form, confirm that you did, and save the record.",
          hint: "Compare each field with the form, top to bottom. Then check “I read back every field against the source form” and select Save record.",
          steps: [
            { action: { kind: "command", id: "form.verify", value: "on" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
            { action: { kind: "command", id: "form.submit" }, requires: { selection: "ex:f1" }, selectHint: "Work in the New Applicant Record form." },
          ],
        },
      ],
    },
    {
      id: "tf-m5-data-entry-2",
      app: "typing",
      title: "Enter a vendor invoice and fix a coworker's typo",
      scenario:
        "You are an office assistant in the accounts payable office at Northbeam Logistics. A vendor emailed an invoice, and a coworker started the entry before going to lunch. Copy the long codes instead of retyping them, check the coworker's work against the email, document the correction, and save the invoice.",
      fileName: "Vendor Invoice Entry",
      minutes: 7,
      initial: typingDoc({
        product: "KeyPath Data Entry Trainer",
        learner: "Jordan Rivera",
        active: "f2",
        values: { amount: "$1,248.60" },
        exercises: [
          {
            id: "f2",
            kind: "form",
            title: "Vendor Invoice Entry",
            system: "Northbeam Finance Portal",
            record: "Accounts Payable › New Invoice",
            verifyLabel: "I compared every field with the vendor's invoice.",
            submitLabel: "Save invoice",
            source: {
              kind: "digital",
              org: "Email · Outlook",
              title: "Invoice CRS-2026-0048917",
              header: [
                { label: "From", value: "Crestline Office Supply Billing <billing@crestline-supply.example>" },
                { label: "To", value: "ap@northbeam.example" },
                { label: "Date", value: "Mon 10/19/2026 4:12 PM" },
              ],
              sections: [
                {
                  heading: "Invoice details",
                  rows: [
                    { label: "Invoice number", value: "CRS-2026-0048917" },
                    { label: "Invoice date", value: "10/16/2026" },
                    { label: "Purchase order", value: "PO-55190-NB" },
                    { label: "Vendor account", value: "NB-7731-0045" },
                  ],
                },
                {
                  heading: "Amount",
                  rows: [
                    { label: "Items", value: "Copy paper, toner cartridges, binders" },
                    { label: "Amount due", value: "$1,284.60" },
                    { label: "Payment terms", value: "Net 30" },
                    { label: "Due date", value: "11/15/2026" },
                  ],
                },
              ],
              footer: "Please include the invoice number and PO number with your payment.\nThank you for your business.\nCrestline Office Supply, Accounts Receivable",
            },
            sections: [
              {
                id: "s1",
                heading: "Invoice",
                fields: [
                  { name: "invoiceNumber", label: "Invoice Number", required: true },
                  { name: "invoiceDate", label: "Invoice Date", type: "date", required: true },
                  { name: "poNumber", label: "PO Number" },
                  { name: "vendorAccount", label: "Vendor Account" },
                ],
              },
              {
                id: "s2",
                heading: "Amounts",
                fields: [
                  { name: "amount", label: "Amount Due", required: true },
                  { name: "dueDate", label: "Due Date", type: "date" },
                  { name: "terms", label: "Payment Terms", type: "select", options: ["Due on receipt", "Net 15", "Net 30", "Net 45", "Net 60"] },
                  { name: "category", label: "Expense Category", type: "select", options: ["Equipment", "Facilities", "Office Supplies", "Software", "Travel"] },
                ],
              },
              { id: "s3", heading: "Notes", fields: [{ name: "note", label: "Notes for approver", type: "textarea", span: 6 }] },
            ],
          },
        ],
      }),
      tasks: [
        {
          instruction: "Copy the invoice number from the email into Invoice Number. Paste it instead of retyping the long code.",
          hint: "In the email, select “CRS-2026-0048917” and press Ctrl+C. Click Invoice Number, press Ctrl+V, then press Tab.",
          steps: [{ action: { kind: "type", target: "field:invoiceNumber", value: "CRS-2026-0048917" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." }],
        },
        {
          instruction: "Enter the invoice date, the PO number, and the vendor account number from the email.",
          hint: "Type “10/16/2026” in Invoice Date. Copy and paste “PO-55190-NB” into PO Number and “NB-7731-0045” into Vendor Account, pressing Tab after each one.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "field:invoiceDate", value: "10/16/2026" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." },
            { action: { kind: "type", target: "field:poNumber", value: "PO-55190-NB" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." },
            { action: { kind: "type", target: "field:vendorAccount", value: "NB-7731-0045" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." },
          ],
        },
        {
          instruction: "A coworker already entered the Amount Due. Compare it with the email and correct it.",
          hint: "The email says $1,284.60, but the field shows $1,248.60 (two digits are swapped). Select the Amount Due text, type “$1,284.60”, and press Tab.",
          steps: [{ action: { kind: "type", target: "field:amount", value: ["$1,284.60", "1,284.60", "1284.60", "$1284.60"] }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." }],
        },
        {
          instruction: "Enter the due date, then select the payment terms and the expense category for copy paper, toner, and binders.",
          hint: "Type “11/15/2026” in Due Date. Payment Terms list › Net 30. Expense Category list › Office Supplies.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "field:dueDate", value: "11/15/2026" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." },
            { action: { kind: "type", target: "field:terms", value: "Net 30" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." },
            { action: { kind: "type", target: "field:category", value: "Office Supplies" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." },
          ],
        },
        {
          instruction: "In Notes for approver, document the correction: “Corrected amount due from $1,248.60 to $1,284.60 per vendor email.”",
          hint: "Click Notes for approver, type the note, then click outside the box (or press Tab) to save it.",
          steps: [
            typeAll("field:note", "Corrected amount due from $1,248.60 to $1,284.60 per vendor email.", ["correct", ["1,248.60", "1248.60"], ["1,284.60", "1284.60"]], { requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." }),
          ],
        },
        {
          instruction: "Read back every field against the invoice email, confirm that you did, and save the invoice.",
          hint: "Compare each field with the email. Check “I compared every field with the vendor's invoice,” then select Save invoice.",
          steps: [
            { action: { kind: "command", id: "form.verify", value: "on" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." },
            { action: { kind: "command", id: "form.submit" }, requires: { selection: "ex:f2" }, selectHint: "Work in the Vendor Invoice Entry form." },
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 5: Speed and Accuracy                                      */
  /* ---------------------------------------------------------------- */
  "module-5::typing-speed-practice": [
    {
      id: "tf-m5-typing-speed-1",
      app: "typing",
      title: "Deliberate practice: weak keys, speed, then accuracy",
      scenario:
        "Your office tracks how long each customer registration takes, and your goal is 45 words per minute at 95% accuracy or better. Run today's deliberate practice session: drill your two weakest key groups, do a speed burst, practice real office phrases and vocabulary, then finish with an accuracy check.",
      fileName: "Daily Practice Session",
      minutes: 8,
      initial: typingDoc({
        learner: "Jordan Rivera",
        active: "k1",
        exercises: [
          { id: "k1", kind: "keys", title: "Weak Keys: Q W E R", subtitle: "Upper row reaches for the left hand.", keys: ["q", "w", "e", "r"], text: "qq ww ee rr were were wear wear rear rear query query", tip: "Reach up from the home row, then come straight back down." },
          { id: "k2", kind: "keys", title: "Number Row", subtitle: "Dates, ZIP codes and phone numbers.", keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], text: "10 20 30 2026 1458 347 555 0186 11212", tip: "Numbers are the easiest to transpose. Say each digit in your head as you type it." },
          { id: "p1", kind: "passage", title: "Speed Burst", subtitle: "Push your speed. Small errors are fine here.", text: "Thank you for calling. How can I help you today? Let me check the schedule for you.", goalAccuracy: 85, keyboard: false },
          { id: "p2", kind: "passage", title: "Office Phrases", subtitle: "Phrases you type all day.", text: "Appointment confirmed for Tuesday at 10:30 AM. Payment received. Please call our office to reschedule.", goalWpm: 35, goalAccuracy: 95 },
          { id: "p3", kind: "passage", title: "Office Vocabulary", subtitle: "Words people misspell at work.", text: "accommodate correspondence reimbursement questionnaire confidential maintenance receipt separate occurrence schedule", goalAccuracy: 95 },
          { id: "p4", kind: "passage", title: "Accuracy Check", subtitle: "Slow down to about 90% of your top speed and aim for zero errors.", text: "Accuracy matters more than raw speed. At 45 words per minute with 99 percent accuracy, you make fewer errors and redo less work.", goalWpm: 40, goalAccuracy: 97, keyboard: false },
        ],
      }),
      tasks: [
        {
          instruction: "Complete the key drill “Weak Keys: Q W E R.”",
          hint: "Click in the drill text and type each key shown. Reach up from the home row with the correct finger (Q left pinky, W left ring, E left middle, R left index), then return.",
          steps: [{ action: { kind: "type", target: "keys", value: "qq ww ee rr were were wear wear rear rear query query", match: "exact" }, requires: { selection: "ex:k1" }, selectHint: "Open “Weak Keys: Q W E R” in the Exercises list first." }],
        },
        {
          instruction: "Open the drill “Number Row” and complete it.",
          hint: "Select “Number Row” in the Exercises list. Type each number shown, checking every digit as you go.",
          steps: [{ action: { kind: "type", target: "keys", value: "10 20 30 2026 1458 347 555 0186 11212", match: "exact" }, requires: { selection: "ex:k2" }, selectHint: "Open “Number Row” in the Exercises list first." }],
        },
        {
          instruction: "Open “Speed Burst” and type it as fast as you can, with at least 85% accuracy.",
          hint: "Select “Speed Burst” in the Exercises list and type the passage at your top speed. This round pushes your ceiling, so do not stop for small mistakes.",
          steps: [{ action: { kind: "type", target: "passage", value: "Thank you for calling. How can I help you today? Let me check the schedule for you.", match: "similar", threshold: 0.85 }, requires: { selection: "ex:p1" }, selectHint: "Open “Speed Burst” in the Exercises list first." }],
        },
        {
          instruction: "Open “Office Phrases” and type it with at least 95% accuracy.",
          hint: "Select “Office Phrases” in the Exercises list. Type the passage exactly, including “10:30 AM” and the periods.",
          steps: [{ action: { kind: "type", target: "passage", value: "Appointment confirmed for Tuesday at 10:30 AM. Payment received. Please call our office to reschedule.", match: "similar", threshold: 0.95 }, requires: { selection: "ex:p2" }, selectHint: "Open “Office Phrases” in the Exercises list first." }],
        },
        {
          instruction: "Open “Office Vocabulary” and type the word list with at least 95% accuracy.",
          hint: "Select “Office Vocabulary” in the Exercises list. Watch the double letters in accommodate, correspondence, and occurrence.",
          steps: [{ action: { kind: "type", target: "passage", value: "accommodate correspondence reimbursement questionnaire confidential maintenance receipt separate occurrence schedule", match: "similar", threshold: 0.95 }, requires: { selection: "ex:p3" }, selectHint: "Open “Office Vocabulary” in the Exercises list first." }],
        },
        {
          instruction: "Finish with “Accuracy Check”: type it with at least 97% accuracy.",
          hint: "Select “Accuracy Check” in the Exercises list. Slow down a little from your speed burst and focus on hitting every key correctly.",
          steps: [{ action: { kind: "type", target: "passage", value: "Accuracy matters more than raw speed. At 45 words per minute with 99 percent accuracy, you make fewer errors and redo less work.", match: "similar", threshold: 0.97 }, requires: { selection: "ex:p4" }, selectHint: "Open “Accuracy Check” in the Exercises list first." }],
        },
      ],
    },
  ],
};
