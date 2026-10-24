import { Lesson } from "@/types/lesson";
import { outlookSlides } from "./slides";

const IMG = "/images/ms-office/outlook/module-5";

export const outlookModule5Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "contacts",
    title: "Contacts in People",
    description:
      "Use People in new Outlook to add, find, update and remove contacts, add a sender straight from a message, and start an email from a contact.",
    objectives: [
      "Create a contact with the details a front desk needs",
      "Add a message's sender to your contacts from the profile card",
      "Find, edit and delete contacts",
      "Start an email from a contact",
    ],
    duration: "14 min",
    slides: outlookSlides["module-5/contacts"],
    sections: [
      {
        heading: "Why keep contacts?",
        blocks: [
          {
            type: "scenario",
            role: "You keep the Lakeside front desk's outside contacts.",
            text: "Every day the front desk calls the imaging center, the lab, the supply company and three insurance plans. Phone numbers are on sticky notes, and when a scheduler changes, nobody updates them. A wrong number costs a patient a missed referral.",
            task: "Move those numbers into Outlook contacts that anyone at the desk can use, and keep them current.",
          },
          {
            type: "paragraph",
            text: "Select People in the navigation bar on the left. All contacts lists your contacts; select one to see its details. Coworkers in your organization appear in Outlook's directory automatically, so contacts are most useful for outside offices, vendors and services.",
          },
          {
            type: "table",
            caption: "What to record for an outside office",
            columns: ["Field", "Example", "Why"],
            rows: [
              ["Name", "Dana Whitaker", "Who you ask for"],
              ["Email", "dana.whitaker@riversideimaging.example.com", "Outlook suggests it as you type"],
              ["Phone", "(555) 014-2215", "The direct line, not the main switchboard"],
              ["Company and job title", "Riverside Imaging, Scheduling Coordinator", "Find the contact by company later"],
              ["Notes", "Fax referrals before 3:00 PM", "Office habits that save time"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Contacts are for business contacts. Don't store patient information in Outlook contacts; patient demographics belong in the practice's EHR or practice management system.",
          },
        ],
      },
      {
        heading: "Add, find, edit, delete",
        blocks: [
          {
            type: "list",
            items: [
              "Add: People › Home tab › New contact. Type the name and details, then select Save.",
              "Add from a message: in Mail, select the sender's name to open the profile card, then More options (…) › Add to contacts. Add details such as a phone number and select Save.",
              "Find: type a name, phone number or company in the Search box.",
              "Edit: double-click the contact (or select it › Edit contact), make the change, and select Save.",
              "Delete: select the contact › Delete (or right-click › Delete), then select Delete again to confirm.",
              "Email a contact: select it and select Email. The To line is filled in for you.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/contact-details.png`,
            alt: "People in new Outlook: the All contacts list with Riverside Imaging Scheduling selected, and its details with Email, Add to list, Edit contact and Delete buttons, the email address, phone and company",
            caption: "Select a contact to see its details and actions.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: People (Ctrl+3) › Home tab › New Contact opens a Contact window; Save & Close saves it. To add a sender, right-click their name in the message › Add to Outlook Contacts.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Add the sender as a contact",
            prompt: "Put the steps for adding a message's sender to your contacts in order.",
            items: [
              { id: "a1", text: "Open the message in Mail" },
              { id: "a2", text: "Select the sender's name to open the profile card" },
              { id: "a3", text: "Select More options › Add to contacts" },
              { id: "a4", text: "Add the phone number and other details" },
              { id: "a5", text: "Select Save" },
            ],
            explanation: "The profile card fills in the name and email address, so you only add what's missing.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A new scheduler at the imaging center emailed you. What's the fastest way to add her as a contact?",
            options: [
              "Copy her address into Notepad",
              "Select her name in the message › More options › Add to contacts",
              "Forward the message to yourself",
              "Create a rule for her address",
            ],
            correctIndex: 1,
            explanation: "The profile card fills in her name and email address; you add the phone number and save.",
            optionRationales: [
              "That keeps the address outside Outlook, where nobody else can use it.",
              "Correct.",
              "Forwarding doesn't create a contact.",
              "Rules sort mail; they don't create contacts.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which of these belongs in an Outlook contact at a medical office?",
            options: ["A patient's diagnosis", "A vendor's direct phone line", "A patient's insurance ID", "A coworker's home address without permission"],
            correctIndex: 1,
            explanation: "Contacts are for business contacts like vendors and partner offices. Patient information belongs in the practice's systems.",
            optionRationales: [
              "Patient health information doesn't belong in Outlook contacts.",
              "Correct.",
              "Patient insurance details belong in the practice management system.",
              "Personal details need a business reason and permission.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a working contact list for a front desk.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List five outside offices a medical front desk calls often (for example an imaging center, a lab, a supply company, an insurance plan and a pharmacy). Use made-up names and example.com-style addresses.",
          "In your own Outlook (new Outlook or Outlook on the web), add at least three of them as contacts with a name, email, phone, company and a useful note. Edit one, then take a screenshot of People.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your list of five offices and either your People screenshot or your Challenge Lab results page (Print or save results) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "contact-lists",
    title: "Contact Lists",
    description:
      "Create contact lists so you can email a whole group with one name, add and remove members, send to a list privately, and know when a Microsoft 365 group is the better tool.",
    objectives: [
      "Create a contact list from a contact",
      "Add a contact to an existing list and edit a list",
      "Send a message to a contact list",
      "Delete a list without deleting its contacts",
    ],
    duration: "13 min",
    videoUrl: "https://www.youtube.com/embed/TrFVOn95pwM",
    slides: outlookSlides["module-5/contact-lists"],
    sections: [
      {
        heading: "One name for a group",
        blocks: [
          {
            type: "scenario",
            role: "You send the weekly clinic reminders at Lakeside.",
            text: "Every Thursday you type the same three or four names to remind the Saturday clinic staff, and last month you forgot Priya. Keisha now joins the front desk team meetings, and an old holiday party list keeps appearing when you type.",
            task: "Set up contact lists so one name reaches the right people every time, and clean up the old one.",
          },
          {
            type: "paragraph",
            text: "A contact list is a saved group of email addresses with a name. Type the name in To, Cc or Bcc and everyone on the list gets the message. Classic Outlook calls these contact groups. A contact list belongs to you; for a team that needs a shared inbox, calendar or files, your organization may use a Microsoft 365 group instead.",
          },
        ],
      },
      {
        heading: "Create, add, edit, delete",
        blocks: [
          {
            type: "list",
            items: [
              "Create: in People, select a contact who should be on the list, then Add to list › New contact list (on the Ribbon, or right-click the contact). Name the list, add more people under Add email addresses, and select Create.",
              "Add someone to a list you already have: select the contact › Add to list › the list's name.",
              "Edit: People › All contact lists › select the list › Edit. Rename it, add or remove people, or add a description, and select Save.",
              "Delete: All contact lists › select the list › Delete, then Delete again. The contacts themselves are not deleted.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/new-contact-list.png`,
            alt: "The New contact list form in new Outlook with the name Saturday Clinic Staff and three people under Add email addresses: Luis Ortega, Priya Nair and Omar Haddad",
            caption: "A new contact list started from Luis Ortega's contact.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: People › Home tab › New Contact Group, then Add Members. Save & Close saves the group.",
          },
        ],
      },
      {
        heading: "Sending to a list",
        blocks: [
          {
            type: "list",
            items: [
              "Start a new message and type the first letters of the list name in To, Cc or Bcc, then pick the list from the suggestions.",
              "For coworkers who work together, To is fine: they already know each other.",
              "For outside people who don't know each other (volunteers, patients' family members, vendors), put the list in Bcc so no one sees anyone else's address (Module 2).",
              "Check the list before an important message. A list is only as good as its last update.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "To or Bcc?",
            prompt: "Decide where each list belongs in the message.",
            buckets: [
              { id: "to", label: "To (members know each other)" },
              { id: "bcc", label: "Bcc (keep addresses private)" },
            ],
            items: [
              { id: "l1", text: "Front Desk Team: schedule change next week", bucket: "to" },
              { id: "l2", text: "Community flu clinic volunteers: Saturday reminder", bucket: "bcc" },
              { id: "l3", text: "Saturday Clinic Staff: arrive by 7:30 AM", bucket: "to" },
              { id: "l4", text: "Vendors list: holiday closure notice", bucket: "bcc" },
            ],
            explanation: "Coworkers can see each other's work addresses. Outside people on one list shouldn't see each other's addresses.",
          },
          {
            type: "worked-example",
            title: "Saturday clinic lists",
            task: "Make Thursday's reminder a one-name job.",
            steps: [
              { move: "Select Luis Ortega › Add to list › New contact list.", why: "Starting from a contact puts that person on the list right away." },
              { move: "Name it Saturday Clinic Staff, add Priya and Omar, select Create.", why: "A clear name is easy to find when you type." },
              { move: "Select Keisha › Add to list › Front Desk Team.", why: "Existing lists grow as the team changes." },
              { move: "New mail › To: Saturday Clinic Staff › subject › Send.", why: "One name reaches everyone, and nobody is forgotten." },
              { move: "Delete Holiday Party 2025.", why: "Old lists clutter suggestions and invite mistakes." },
            ],
            result: "Lists that match the real teams, and reminders that reach everyone.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You delete a contact list. What happens to the contacts that were on it?",
            options: ["They are deleted too", "They stay in your contacts", "They move to Deleted Items", "They are emailed a notice"],
            correctIndex: 1,
            explanation: "Deleting a list removes only the list. The contacts stay.",
            optionRationales: ["Contacts aren't deleted with the list.", "Correct.", "Contacts don't go to Deleted Items when a list is deleted.", "No one is notified."],
          },
          {
            type: "knowledge-check",
            question: "A list of community volunteers who don't know each other gets a reminder. Where does the list go?",
            options: ["To", "Cc", "Bcc", "The subject line"],
            correctIndex: 2,
            explanation: "Bcc keeps every volunteer's address private.",
            optionRationales: ["To shows every address to everyone.", "Cc also shows every address.", "Correct.", "Addresses don't go in the subject."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Create and use a contact list.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your own Outlook (new Outlook or Outlook on the web), create a contact list of at least three people (classmates, or yourself plus practice contacts). Give it a clear name.",
          "Send a short test message to the list. Decide whether the list belongs in To or Bcc, and write one sentence explaining why.",
          "Take a screenshot of the list's members.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your screenshot or your Challenge Lab results page (Print or save results), plus your To-or-Bcc sentence, to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "flags-to-do",
    title: "To Do, Flagged Email, and My Day",
    description:
      "Bring tasks and flagged email together in To Do, set due dates and importance, plan today with My Day, and close the loop when work is done.",
    objectives: [
      "Add tasks in To Do and give them due dates",
      "Mark tasks important and add them to My Day",
      "Use the Flagged email list to follow up on messages",
      "Complete tasks and flags when the work is done",
    ],
    duration: "15 min",
    slides: outlookSlides["module-5/flags-to-do"],
    sections: [
      {
        heading: "One place for follow-ups",
        blocks: [
          {
            type: "scenario",
            role: "You run the Lakeside front desk on a busy Tuesday.",
            text: "Your follow-ups are everywhere: a sticky note to restock brochures, a flagged prior authorization message, a promise to Dr. Patel to confirm volunteers, and a call to Metro Health Plan you keep putting off.",
            task: "Put every follow-up in To Do, decide what happens today, and mark things done as you finish them.",
          },
          {
            type: "paragraph",
            text: "Select To Do in the navigation bar on the left. The list pane shows smart lists that Outlook fills for you, plus Tasks and any lists you create.",
          },
          {
            type: "table",
            caption: "To Do lists",
            columns: ["List", "What's in it"],
            rows: [
              ["My Day", "Tasks you chose for today. It clears at midnight; the tasks stay in their lists."],
              ["Important", "Tasks you starred"],
              ["Planned", "Tasks with due dates"],
              ["Flagged email", "Messages you flagged in Mail"],
              ["Tasks", "Your default list; tasks you add in a smart list are saved here too"],
            ],
          },
        ],
      },
      {
        heading: "Tasks, due dates, importance",
        blocks: [
          {
            type: "list",
            items: [
              "Add a task: select a list, select Add a task, type it, and press Enter. Start with a verb: \"Call Metro about claim 48190\", not \"Metro\".",
              "Due date: select the task, then Add due date › Today, Tomorrow, Next week, or pick a date. Remind me sets a reminder time, and Repeat makes it recur.",
              "Important: select the star on the task. It also appears in the Important list.",
              "My Day: select the task and choose Add to My Day. You can also open My Day from the icon next to Notifications at the top of Outlook; it has Calendar and To Do tabs.",
              "Done: select the circle next to the task. Completed tasks move to the Completed section.",
              "Steps and notes: in the task details, use Add step for small parts of a bigger task and Add a note for details.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/to-do.png`,
            alt: "To Do in new Outlook showing the Tasks list with Add a task at the top, tasks with due dates and stars, and the details pane with Add to My Day and Add due date",
            caption: "To Do: lists on the left, tasks in the middle, details on the right.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Tasks (Ctrl+4) and the To-Do Bar hold tasks and flagged items. New Outlook uses To Do, the same service as the Microsoft To Do app.",
          },
        ],
      },
      {
        heading: "Flagged email and closing the loop",
        blocks: [
          {
            type: "list",
            items: [
              "Flag a message in Mail (Module 3) and it appears in To Do's Flagged email list, so message follow-ups sit next to your tasks.",
              "When the follow-up is done, select the circle next to the message in Flagged email, or mark its flag complete on the message in Mail.",
              "You can turn the Flagged email list on or off in Settings.",
              "End the day by reviewing My Day: finish, move to tomorrow, or delete. A list you trust is a list you keep up to date.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Where does it go?",
            prompt: "Match each follow-up to the To Do feature that handles it.",
            items: [
              { id: "t1", text: "Add to My Day", match: "Something you've decided to do today" },
              { id: "t2", text: "Star (Important)", match: "A call that must not slip, even if it isn't due today" },
              { id: "t3", text: "Add due date", match: "Count the supply closet by Friday" },
              { id: "t4", text: "Flagged email", match: "Reply to a prior authorization message later" },
            ],
            explanation: "My Day is today's plan, the star marks priority, due dates set deadlines, and flags turn messages into follow-ups.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What happens to tasks in My Day at midnight?",
            options: ["They are deleted", "My Day clears, but the tasks stay in their lists", "They are marked complete", "They move to Flagged email"],
            correctIndex: 1,
            explanation: "My Day is a daily plan. Unfinished tasks stay in their lists for you to plan again.",
            optionRationales: ["Nothing is deleted.", "Correct.", "Only you can complete a task.", "Flagged email holds flagged messages, not tasks."],
          },
          {
            type: "knowledge-check",
            question: "Where do flagged messages show up in To Do?",
            options: ["Important", "Planned only", "Flagged email", "Assigned to me"],
            correctIndex: 2,
            explanation: "Flag a message in Mail and it appears in the Flagged email list.",
            optionRationales: ["Important holds starred tasks.", "Planned shows items with due dates, but Flagged email holds every flagged message.", "Correct.", "Assigned to me is for tasks others assign you."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Plan one real day in To Do.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your own Outlook (new Outlook or Outlook on the web), add at least four tasks you really need to do this week (school, work or home). Give two of them due dates and star the most important one.",
          "Flag one message in your mailbox, then find it in Flagged email.",
          "Choose two tasks for My Day. At the end of the day, complete what you finished and take a screenshot of To Do.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
          "Write two or three sentences: what did you move to another day, and why?",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your To Do screenshot or your Challenge Lab results page (Print or save results), plus your reflection, to your instructor or course folder.",
      },
    ],
  },
];
