import type { SimDefinition, SimStep } from "@/types/sim";
import type { OlContact, OlTask } from "@/components/sim/apps/outlook/types";
import { msg, recipients } from "@/components/sim/apps/outlook/simkit";
import { BRIGHT, DENISE, IMAGING, KEISHA, LAB, LUIS, ME, METRO, OMAR, PATEL, PRIYA, lakeside } from "./fixtures";

/* Module 5: People and To Do (new Outlook for Windows). */

const NEW_CONTACT: Pick<SimStep, "action" | "alt"> = { action: { kind: "command", id: "people.newContact" }, alt: [{ kind: "command", id: "item.new" }] };
const NEW_MAIL: Pick<SimStep, "action" | "alt"> = { action: { kind: "command", id: "mail.newEmail" }, alt: [{ kind: "command", id: "item.new" }] };

const VENDOR_CONTACTS: OlContact[] = [
  { id: "c1", name: "Riverside Imaging Scheduling", email: IMAGING.email, company: "Riverside Imaging", phone: "(555) 014-2200" },
  { id: "c2", name: "Metro Health Plan Claims", email: METRO.email, company: "Metro Health Plan", phone: "(555) 018-7700" },
  { id: "c3", name: "BrightPath Medical Supply", email: BRIGHT.email, company: "BrightPath Medical Supply", phone: "(555) 012-3344" },
  { id: "c4", name: "Valley Courier", email: "dispatch@valleycourier.example.com", company: "Valley Courier", phone: "(555) 016-0100", notes: "Contract ended in 2025." },
];

const STAFF_CONTACTS: OlContact[] = [
  ...VENDOR_CONTACTS.slice(0, 3),
  { id: "c4", name: LUIS.name, email: LUIS.email, company: "Lakeside Medical Associates", jobTitle: "Registered Nurse" },
  { id: "c5", name: PRIYA.name, email: PRIYA.email, company: "Lakeside Medical Associates", jobTitle: "Medical Assistant" },
  { id: "c6", name: OMAR.name, email: OMAR.email, company: "Lakeside Medical Associates", jobTitle: "Front Desk Associate" },
  { id: "c7", name: KEISHA.name, email: KEISHA.email, company: "Lakeside Medical Associates", jobTitle: "Billing Specialist" },
];

const TASKS: OlTask[] = [
  { id: "t1", subject: "Restock patient brochures", status: "Not Started", priority: "Normal", percent: 0, list: "Tasks" },
  { id: "t2", subject: "Call Metro Health Plan about claim 48190", status: "Not Started", priority: "Normal", percent: 0, list: "Tasks", due: "2026-10-21" },
  { id: "t3", subject: "Confirm Saturday flu clinic volunteers", status: "Not Started", priority: "Normal", percent: 0, list: "Tasks" },
];

export const outlookModule5Sims: Record<string, SimDefinition[]> = {
  "module-5::contacts": [
    {
      id: "ol-m5-contacts-1",
      app: "outlook-new",
      title: "Keep the front desk contacts current",
      scenario:
        "The front desk calls the same outside offices every day. A new scheduler started at Riverside Imaging, BrightPath changed its phone number, the lab's results team keeps emailing you, and a courier service the practice stopped using is still in the list.",
      fileName: "People",
      minutes: 8,
      initial: lakeside(
        [
          msg("m1", LAB, "Results portal maintenance Saturday", "Our results portal will be offline Saturday from 6:00 to 8:00 AM. Call (555) 019-4400 for urgent results.", "2026-10-20T07:40", { to: [ME], external: true }),
        ],
        { module: "people", contacts: VENDOR_CONTACTS },
      ),
      tasks: [
        {
          instruction:
            'Add a contact for Dana Whitaker, Scheduling Coordinator at Riverside Imaging: email dana.whitaker@riversideimaging.example.com, phone (555) 014-2215.',
          hint: "People › Home tab › New contact. Type the first and last name, email, phone, company and job title, then select Save.",
          steps: [
            NEW_CONTACT,
            {
              action: {
                kind: "dialog",
                id: "contact.save",
                values: { name: "Dana Whitaker", email: "dana.whitaker@riversideimaging.example.com", phone: "(555) 014-2215", company: "Riverside Imaging", jobTitle: "Scheduling Coordinator" },
              },
            },
          ],
        },
        {
          instruction: "BrightPath Medical Supply has a new phone number: (555) 012-3399. Update the contact.",
          hint: "Select BrightPath Medical Supply, select Edit contact (or double-click it), change the phone number, and select Save.",
          steps: [{ action: { kind: "dialog", id: "contact.save", values: { phone: "(555) 012-3399" } }, requires: { selection: "contact:c3" }, selectHint: "Select the BrightPath Medical Supply contact first." }],
        },
        {
          instruction: "Add Northside Lab Services to your contacts straight from their message, with the phone number (555) 019-4400 from the message.",
          hint: "Go to Mail and select the Northside Lab message. Select the sender's name, then More options (…) › Add to contacts. Type the phone number and select Save.",
          steps: [
            { action: { kind: "command", id: "people.addSender", value: LAB.email }, requires: { selection: "msg:m1" }, selectHint: "Go to Mail and select the Northside Lab Services message first." },
            { action: { kind: "dialog", id: "contact.save", values: { email: LAB.email, phone: "(555) 019-4400" } } },
          ],
        },
        {
          instruction: 'The practice no longer uses Valley Courier. Delete the "Valley Courier" contact.',
          hint: "Go back to People, select Valley Courier, select Delete (or right-click it › Delete), and select Delete again to confirm.",
          steps: [{ action: { kind: "command", id: "item.delete" }, requires: { selection: "contact:c4" }, selectHint: "Select the Valley Courier contact first." }],
        },
        {
          instruction: 'Email Riverside Imaging Scheduling from their contact with the subject "Referral fax number" and send it.',
          hint: "Select Riverside Imaging Scheduling › Email. The To line is filled in. Type the subject and select Send.",
          steps: [
            { action: { kind: "command", id: "contact.emailTo" }, requires: { selection: "contact:c1" }, selectHint: "Select the Riverside Imaging Scheduling contact first." },
            { action: { kind: "type", target: "compose.to", value: recipients(IMAGING.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Referral fax number" } },
            { action: { kind: "command", id: "compose.send" }, alt: [{ kind: "command", id: "compose.requestSend" }] },
          ],
        },
      ],
    },
    {
      id: "ol-m5-contacts-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Build a contact list for the front desk",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: add the outside offices the front desk calls most, fix one that changed, and remove one that is out of date. When you finish, enter your name and print or save your results page to submit.",
      fileName: "People",
      minutes: 9,
      initial: lakeside(
        [msg("m1", IMAGING, "New scheduling line", "Riverside Imaging has a new direct scheduling line: (555) 014-2299.", "2026-10-20T08:00", { to: [ME], external: true })],
        { module: "people", contacts: VENDOR_CONTACTS },
      ),
      tasks: [
        {
          instruction: 'Add a contact for "Northside Lab Services" with the email results@northsidelab.example.com, phone (555) 019-4400, and company Northside Lab Services.',
          hint: "People › New contact. Type Northside in First name and Lab Services in Last name (or the whole name in First name), then the email, phone and company, and select Save.",
          steps: [NEW_CONTACT, { action: { kind: "dialog", id: "contact.save", values: { email: LAB.email, phone: "(555) 019-4400", company: "Northside Lab Services" } } }],
        },
        {
          instruction: 'Add a contact for Marco Ruiz, Account Manager at BrightPath Medical Supply: marco.ruiz@brightpathsupply.example.com, (555) 012-3350.',
          hint: "New contact › name, email, phone, company, job title › Save.",
          steps: [
            NEW_CONTACT,
            { action: { kind: "dialog", id: "contact.save", values: { name: "Marco Ruiz", email: "marco.ruiz@brightpathsupply.example.com", phone: "(555) 012-3350", company: "BrightPath Medical Supply", jobTitle: "Account Manager" } } },
          ],
        },
        {
          instruction: "Riverside Imaging has a new scheduling number, (555) 014-2299. Update the Riverside Imaging Scheduling contact.",
          hint: "Select the contact › Edit contact › change the phone › Save.",
          steps: [{ action: { kind: "dialog", id: "contact.save", values: { phone: "(555) 014-2299" } }, requires: { selection: "contact:c1" }, selectHint: "Select Riverside Imaging Scheduling first." }],
        },
        {
          instruction: "Delete the out-of-date Valley Courier contact.",
          hint: "Select Valley Courier › Delete › Delete.",
          steps: [{ action: { kind: "command", id: "item.delete" }, requires: { selection: "contact:c4" }, selectHint: "Select Valley Courier first." }],
        },
      ],
    },
  ],

  "module-5::contact-lists": [
    {
      id: "ol-m5-contact-lists-1",
      app: "outlook-new",
      title: "Contact lists for the clinic team",
      scenario:
        "You email the same groups of coworkers every week. Saturday's clinic needs its own list, Keisha now joins the front desk team meetings, and an old holiday party list is cluttering People.",
      fileName: "People",
      minutes: 7,
      initial: lakeside([], {
        module: "people",
        contacts: STAFF_CONTACTS,
        groups: [
          { id: "g1", name: "Front Desk Team", members: [OMAR.email, PRIYA.email] },
          { id: "g2", name: "Holiday Party 2025", members: [DENISE.email, OMAR.email, LUIS.email] },
        ],
      }),
      tasks: [
        {
          instruction: 'Create a contact list named "Saturday Clinic Staff" with Luis Ortega, Priya Nair and Omar Haddad. Start from Luis\'s contact.',
          hint: "Select Luis Ortega › Add to list › New contact list. Name it Saturday Clinic Staff, add Priya and Omar under Add email addresses, and select Create.",
          steps: [
            { action: { kind: "command", id: "people.addToList", value: "New contact list" }, requires: { selection: "contact:c4" }, selectHint: "Select Luis Ortega's contact first." },
            { action: { kind: "type", target: "group.members", value: recipients(LUIS.email, PRIYA.email, OMAR.email) } },
            { action: { kind: "dialog", id: "group.save", values: { name: "Saturday Clinic Staff" } } },
          ],
        },
        {
          instruction: 'Add Keisha Grant to the existing "Front Desk Team" list.',
          hint: "Select Keisha Grant › Add to list › Front Desk Team.",
          steps: [{ action: { kind: "command", id: "people.addToList", value: "Front Desk Team" }, requires: { selection: "contact:c7" }, selectHint: "Select Keisha Grant's contact first." }],
        },
        {
          instruction: 'Send a message to the "Saturday Clinic Staff" list with the subject "Saturday clinic: please arrive by 7:30 AM".',
          hint: "New mail (go to Mail first, or select New mail from the Home tab). Type Saturday in the To line and pick the list, type the subject, and select Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "type", target: "compose.to", value: recipients("Saturday Clinic Staff") } },
            { action: { kind: "type", target: "compose.subject", value: "Saturday clinic: please arrive by 7:30 AM" } },
            { action: { kind: "command", id: "compose.send" }, alt: [{ kind: "command", id: "compose.requestSend" }] },
          ],
        },
        {
          instruction: 'Delete the old "Holiday Party 2025" contact list. (The contacts in it stay.)',
          hint: "People › All contact lists › select Holiday Party 2025 › Delete › Delete.",
          steps: [{ action: { kind: "command", id: "item.delete" }, requires: { selection: "group:g2" }, selectHint: "Open All contact lists and select Holiday Party 2025 first." }],
        },
      ],
    },
    {
      id: "ol-m5-contact-lists-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Create and use a contact list",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: build a contact list, add someone to another list, and send a message to your new list. When you finish, enter your name and print or save your results page to submit.",
      fileName: "People",
      minutes: 7,
      initial: lakeside([], {
        module: "people",
        contacts: STAFF_CONTACTS,
        groups: [{ id: "g1", name: "Front Desk Team", members: [OMAR.email, PRIYA.email] }],
      }),
      tasks: [
        {
          instruction: 'Create a contact list named "Billing Questions" with Keisha Grant and Omar Haddad, starting from Keisha\'s contact.',
          hint: "Select Keisha Grant › Add to list › New contact list › name it › add Omar › Create.",
          steps: [
            { action: { kind: "command", id: "people.addToList", value: "New contact list" }, requires: { selection: "contact:c7" }, selectHint: "Select Keisha Grant's contact first." },
            { action: { kind: "type", target: "group.members", value: recipients(KEISHA.email, OMAR.email) } },
            { action: { kind: "dialog", id: "group.save", values: { name: "Billing Questions" } } },
          ],
        },
        {
          instruction: 'Add Luis Ortega to the "Front Desk Team" list.',
          hint: "Select Luis Ortega › Add to list › Front Desk Team.",
          steps: [{ action: { kind: "command", id: "people.addToList", value: "Front Desk Team" }, requires: { selection: "contact:c4" }, selectHint: "Select Luis Ortega's contact first." }],
        },
        {
          instruction: 'Send a message to the "Billing Questions" list with the subject "Copay questions this week".',
          hint: "New mail › To: Billing Questions › subject › Send.",
          steps: [
            NEW_MAIL,
            { action: { kind: "type", target: "compose.to", value: recipients("Billing Questions") } },
            { action: { kind: "type", target: "compose.subject", value: "Copay questions this week" } },
            { action: { kind: "command", id: "compose.send" }, alt: [{ kind: "command", id: "compose.requestSend" }] },
          ],
        },
      ],
    },
  ],

  "module-5::flags-to-do": [
    {
      id: "ol-m5-flags-to-do-1",
      app: "outlook-new",
      title: "Run the day from To Do",
      scenario:
        "Your follow-ups are scattered: a few tasks you typed, a few flagged messages, and things you promised to do today. Pull them together in To Do so nothing slips.",
      fileName: "To Do",
      minutes: 7,
      initial: lakeside(
        [
          msg("m1", METRO, "Prior authorization needed: MRI referral", "A prior authorization is needed before the MRI can be scheduled.", "2026-10-19T15:10", {
            to: [ME],
            external: true,
            read: true,
            flag: { due: "2026-10-20" },
          }),
          msg("m2", DENISE, "Supply closet inventory", "Please count the supply closet before Friday.", "2026-10-19T09:00", { to: [ME], read: true, flag: { due: "2026-10-23" } }),
          msg("m3", PATEL, "Flu clinic handout", "Please print 50 copies of the handout.", "2026-10-20T07:55", { to: [ME] }),
        ],
        { module: "tasks", todoList: "Tasks", tasks: TASKS },
      ),
      tasks: [
        {
          instruction: 'In the Tasks list, add a task named "Order exam table paper".',
          hint: "To Do › Tasks › select Add a task, type the name, and press Enter.",
          steps: [{ action: { kind: "type", target: "todo.new", value: "Order exam table paper" } }],
        },
        {
          instruction: "Give the new task a due date of tomorrow.",
          hint: "Select the task to open its details, select Add due date, and choose Tomorrow.",
          steps: [{ action: { kind: "command", id: "todo.due", value: "Tomorrow" }, requires: { selection: "task:t4" }, selectHint: 'Select "Order exam table paper" first.' }],
        },
        {
          instruction: 'Mark "Call Metro Health Plan about claim 48190" as important.',
          hint: "Select the star at the right end of the task.",
          steps: [{ action: { kind: "command", id: "todo.important" }, requires: { selection: "task:t2" }, selectHint: 'Select "Call Metro Health Plan about claim 48190" first.' }],
        },
        {
          instruction: 'Add "Confirm Saturday flu clinic volunteers" to My Day.',
          hint: "Select the task, then select Add to My Day in the details pane.",
          steps: [{ action: { kind: "command", id: "todo.myDay" }, requires: { selection: "task:t3" }, selectHint: 'Select "Confirm Saturday flu clinic volunteers" first.' }],
        },
        {
          instruction: 'Open the Flagged email list and mark "Prior authorization needed: MRI referral" complete. You sent the authorization this morning.',
          hint: "Select Flagged email in the To Do list pane, then select the circle next to the message.",
          steps: [
            {
              action: { kind: "command", id: "item.followUp", value: "Mark Complete" },
              requires: { selection: "msg:m1" },
              selectHint: 'Open Flagged email and select "Prior authorization needed: MRI referral" first.',
            },
          ],
        },
        {
          instruction: 'You restocked the brochures. Complete "Restock patient brochures" in the Tasks list.',
          hint: "Open the Tasks list and select the circle next to the task.",
          steps: [{ action: { kind: "command", id: "task.complete" }, requires: { selection: "task:t1" }, selectHint: 'Open Tasks and select "Restock patient brochures" first.' }],
        },
      ],
    },
    {
      id: "ol-m5-flags-to-do-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Plan your day in To Do",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: turn a message into a follow-up, add tasks, set due dates and importance, and build My Day. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 8,
      initial: lakeside(
        [
          msg("m1", KEISHA, "Copay list for October", "Can you check the copay list against the schedule before Thursday?", "2026-10-20T08:30", { to: [ME] }),
          msg("m2", PATEL, "Flu clinic handout", "Please print 50 copies of the handout for Saturday.", "2026-10-20T07:55", { to: [ME] }),
        ],
        { tasks: TASKS },
      ),
      tasks: [
        {
          instruction: "Flag Keisha's message \"Copay list for October\" for tomorrow.",
          hint: "Select the message › Home tab › the arrow next to Flag / Unflag, and choose tomorrow (or right-click › Flag).",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Tomorrow" }, requires: { selection: "msg:m1" }, selectHint: "Select Keisha's message first." }],
        },
        {
          instruction: 'Open To Do and add a task named "Print flu clinic handouts" to the Tasks list.',
          hint: "Select To Do in the navigation bar › Tasks › Add a task › type › Enter.",
          steps: [{ action: { kind: "type", target: "todo.new", value: "Print flu clinic handouts" } }],
        },
        {
          instruction: "Give that task a due date of today and add it to My Day.",
          hint: "Select the task › Add due date › Today, then Add to My Day.",
          steps: [
            { action: { kind: "command", id: "todo.due", value: "Today" }, requires: { selection: "task:t4" }, selectHint: 'Select "Print flu clinic handouts" first.' },
            { action: { kind: "command", id: "todo.myDay" }, requires: { selection: "task:t4" }, selectHint: 'Select "Print flu clinic handouts" first.' },
          ],
        },
        {
          instruction: 'Mark "Confirm Saturday flu clinic volunteers" as important.',
          hint: "Select the star next to the task.",
          steps: [{ action: { kind: "command", id: "todo.important" }, requires: { selection: "task:t3" }, selectHint: "Select the task first." }],
        },
        {
          instruction: "Open My Day to check your plan for today.",
          hint: "Select My Day at the top of the To Do list pane.",
          steps: [{ action: { kind: "command", id: "todo.list", value: "My Day" } }],
        },
      ],
    },
  ],
};
