import type { SimDefinition } from "@/types/sim";
import { outlookDoc } from "@/components/sim/apps/outlook/types";
import type { OlContact, OlEvent, OlMessage, OlTask, OutlookDoc } from "@/components/sim/apps/outlook/types";
import { ACCEPT, OPEN, activityStep, mentions, msg, person, recipients } from "@/components/sim/apps/outlook/simkit";

/*
 * Modern Office (Office Assistant Professional): Communication Systems
 * (module-9), Scheduling & Meetings (module-11), Task & Project Management
 * (module-12), CRM & Office Systems (module-13). TOR Tech scenarios in
 * Outlook Mail, Calendar, Tasks, and People. Fictional people;
 * example.com-style addresses.
 */

const ME = person("Riley Chen", "riley.chen@tortech.example.com");
const MORGAN = person("Morgan Ellis", "morgan.ellis@tortech.example.com");
const JORDAN = person("Jordan Reeves", "jordan.reeves@tortech.example.com");
const PRIYA = person("Priya Natarajan", "priya.natarajan@tortech.example.com");
const SAM = person("Sam Okoro", "sam.okoro@tortech.example.com");
const DEE = person("Dee Walker", "dee.walker@tortech.example.com");
const LEAH = person("Leah Park", "leah.park@tortech.example.com");
const FACILITIES = person("TOR Tech Facilities", "facilities@tortech.example.com");
const HELEN = person("Helen Ward", "helen.ward@acme.example.com");
const MARCUS = person("Marcus Webb", "marcus.webb@webblogistics.example.com");
const MARCUS_OLD = "mwebb@webbfreight.example.net";
const TANYA = person("Tanya Brooks", "tanya.brooks@brightlinedental.example.com");
const OMAR = person("Omar Hale", "omar.hale@brightlinedental.example.com");
const RAVI = person("Ravi Desai", "ravi.desai@cloudnest.example.com");
const SAAS = person("SaaS Weekly", "news@saasweekly.example.com");
const PROMO = person("StockPix Deals", "deals@stockpix.example.com");

const STAFF = [MORGAN, JORDAN, PRIYA, SAM, DEE, LEAH, FACILITIES];

function base(messages: OlMessage[], extra: Partial<OutlookDoc> = {}): Record<string, unknown> {
  return outlookDoc({
    account: ME,
    manager: MORGAN,
    now: "2026-10-20T09:30",
    readingPane: "Right",
    directory: [...STAFF, HELEN, RAVI],
    contacts: [
      { id: "c1", name: "Helen Ward", email: HELEN.email, company: "Acme Corp", jobTitle: "Operations Director", phone: "(555) 301-7720" },
      { id: "c2", name: "Tanya Brooks", email: TANYA.email, company: "Brightline Dental", jobTitle: "Practice Manager", phone: "(555) 867-0000" },
    ],
    messages,
    ...extra,
  });
}

const steps = {
  newEmail: OPEN.email,
  newMeeting: OPEN.meeting,
  newAppt: OPEN.appointment,
  newTask: OPEN.task,
  send: { action: { kind: "command" as const, id: "compose.send" } },
};

/* Calendar fixtures (week of October 19 and October 26, 2026). */
const TEAM_EVENTS: OlEvent[] = [
  { id: "e1", title: "Weekly Status Sync", start: "2026-10-20T15:00", end: "2026-10-20T15:30", meeting: true, organizer: ME, required: [JORDAN, PRIYA], recurrence: { freq: "weekly", days: [2] }, location: "Hudson Room" },
  { id: "e2", title: "Brightline Dental onboarding", start: "2026-10-21T10:00", end: "2026-10-21T11:00", meeting: true, organizer: ME, required: [TANYA], location: "Microsoft Teams Meeting", teams: true },
  { id: "e3", title: "Lunch", start: "2026-10-21T12:00", end: "2026-10-21T13:00", showAs: "Busy" },
];

const TASKS_BASE: OlTask[] = [
  { id: "t1", subject: "Prepare vendor comparison", due: "2026-10-22", status: "Not Started", priority: "Normal" },
  { id: "t2", subject: "Update client onboarding checklist", due: "2026-10-26", status: "Not Started", priority: "Normal" },
  { id: "t3", subject: "Send meeting notes to Jordan", due: "2026-10-20", status: "In Progress", priority: "Normal", percent: 50 },
  { id: "t4", subject: "Book room for November offsite", due: "2026-10-30", status: "Not Started", priority: "Low" },
];

const CRM_CONTACTS: OlContact[] = [
  { id: "c1", name: "Helen Ward", email: HELEN.email, company: "Acme Corp", jobTitle: "Operations Director", phone: "(555) 301-7720", notes: "Primary contact for the Acme account. Prefers morning calls.", activities: [{ id: "a1", type: "Email", date: "2026-10-12", summary: "Sent Q3 usage report.", next: "Helen to review with her team" }] },
  { id: "c2", name: "Tanya Brooks", email: TANYA.email, company: "Brightline Dental", jobTitle: "Practice Manager", phone: "(555) 867-0000", notes: "Renewal date 1/15/2027." },
  { id: "c3", name: "Marcus Webb", email: MARCUS.email, company: "Webb Logistics", jobTitle: "Director of Operations", phone: "(555) 410-2200" },
];

export const outlookSims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  /* Module 9: Communication Systems                                  */
  /* ================================================================ */
  "module-9::professional-email-writing": [
    {
      id: "mo-m9-professional-email-outlook-1",
      app: "outlook",
      title: "Write client emails that get read and answered",
      scenario:
        "At TOR Tech, your manager Morgan Ellis asks you to handle this morning's client email. A client meeting has to move, a report is ready to share, and a company-wide message needs a careful answer. Every message needs a specific subject, a purpose in the first sentence, and the right recipients.",
      fileName: "Inbox",
      minutes: 8,
      initial: base(
        [
          msg("m1", HELEN, "Tuesday check-in", "Hi Riley,\n\nLooking forward to our check-in on Tuesday at 11:00 AM. Same Zoom link as last time?\n\nHelen", "2026-10-20T08:40", { to: [ME], external: true }),
          msg("m2", FACILITIES, "Office closed Monday for maintenance", "Hello TOR Tech,\n\nThe office will be closed Monday, October 26 for electrical maintenance. Send questions to Facilities only. Please do not reply all.\n\nFacilities", "2026-10-20T08:05", { to: [...STAFF, ME] }),
          msg("m3", MARCUS, "Introduction from TOR Tech", "Hello,\n\nI just signed with TOR Tech and was told you would schedule my onboarding call. What happens next?\n\nMarcus Webb\nWebb Logistics", "2026-10-20T07:52", { to: [ME], external: true, firstTime: true }),
        ],
        { groups: [{ id: "g1", name: "Client Contacts", members: [HELEN.email, TANYA.email, MARCUS.email] }] },
      ),
      tasks: [
        {
          instruction:
            'Your Tuesday meeting with Helen Ward must move to Thursday at 3:00 PM. Reply to "Tuesday check-in", change the subject to "Rescheduled: Acme Check-In Moved to Thursday at 3:00 PM", and write a reply that gives the new day and time, says the Zoom link stays the same, and asks her to confirm.',
          hint: "Select the message › Reply (Ctrl+R) › replace the Subject › type the reply › Send. Lead with the purpose: the meeting is moving.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Helen Ward's message \"Tuesday check-in\" first." },
            { action: { kind: "type", target: "compose.subject", value: "Rescheduled: Acme Check-In Moved to Thursday at 3:00 PM" } },
            mentions("compose.body", "Hi Helen, I need to move our check-in to Thursday at 3:00 PM. The Zoom link stays the same. Please confirm that Thursday at 3:00 PM works for you.", ["Thursday", "3:00 PM", "Zoom", "confirm"]),
            steps.send,
          ],
        },
        {
          instruction:
            'Send the Q2 report notice to Helen Ward with your manager, Morgan Ellis, as Cc. Use the subject "For Your Review: Q2 Report Ready" and start with "I am writing to share the Q2 report for your review."',
          hint: "Home tab › New Email › To: Helen Ward › Cc: Morgan Ellis › Subject › first sentence › Send.",
          steps: [
            steps.newEmail,
            { action: { kind: "type", target: "compose.to", value: recipients(HELEN.email) } },
            { action: { kind: "type", target: "compose.cc", value: recipients(MORGAN.email) } },
            { action: { kind: "type", target: "compose.subject", value: "For Your Review: Q2 Report Ready" } },
            mentions("compose.body", "I am writing to share the Q2 report for your review.", ["I am writing to share the Q2 report"]),
            steps.send,
          ],
        },
        {
          instruction: 'Facilities sent "Office closed Monday for maintenance" to the whole company and asked for questions to come to them only. Ask "Will the parking garage be open on Monday?" without replying to everyone.',
          hint: "Select the message › Home tab › Reply (not Reply All), or Ctrl+R › type the question › Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m2" }, selectHint: "Select the Facilities message first." },
            mentions("compose.body", "Will the parking garage be open on Monday?", ["parking garage"]),
            steps.send,
          ],
        },
        {
          instruction: 'Reply to new client Marcus Webb\'s "Introduction from TOR Tech" in a formal register: start with "Dear Mr. Webb," and tell him his onboarding call is "Thursday, October 22 at 10:00 AM".',
          hint: "Select the message › Reply › use a formal greeting, full sentences, and no emojis › Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m3" }, selectHint: "Select Marcus Webb's message first." },
            mentions("compose.body", "Dear Mr. Webb, welcome to TOR Tech. Your onboarding call is scheduled for Thursday, October 22 at 10:00 AM.", ["Dear Mr. Webb", "October 22", "10:00 AM"]),
            steps.send,
          ],
        },
        {
          instruction:
            'Send a holiday hours notice to the "Client Contacts" group without exposing their addresses: To yourself, the group in Bcc, subject "Holiday Hours: TOR Tech Support Closed November 26", and the text "Support will be closed Thursday, November 26 and will reopen Friday at 8:00 AM."',
          hint: "New Email › Options tab › Show Fields › Bcc › To: your own address › Bcc: Client Contacts › subject and text › Send.",
          steps: [
            steps.newEmail,
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.bcc", value: recipients("Client Contacts") } },
            { action: { kind: "type", target: "compose.subject", value: "Holiday Hours: TOR Tech Support Closed November 26" } },
            mentions("compose.body", "Support will be closed Thursday, November 26 and will reopen Friday at 8:00 AM.", ["November 26", "reopen"]),
            steps.send,
          ],
        },
      ],
    },
  ],

  "module-9::manage-your-inbox": [
    {
      id: "mo-m9-manage-inbox-outlook-1",
      app: "outlook",
      title: "Triage a Monday inbox: reply, delegate, archive, delete",
      scenario:
        "You arrive at TOR Tech on Monday to a full inbox, and Morgan expects the urgent messages handled before noon. Use the triage funnel on every message: reply if it takes two minutes, delegate what belongs to someone else, archive what you may need later, and delete what you will never need.",
      fileName: "Inbox",
      minutes: 8,
      initial: base(
        [
          msg("m1", LEAH, "Is the 2:00 PM design review still on?", "Quick check: is the 2:00 PM design review still on today?", "2026-10-20T09:12", { to: [ME] }),
          msg("m2", TANYA, "Invoice question from Brightline Dental", "Hi Riley, our October invoice shows two charges for the same license. Can someone check?\n\nTanya", "2026-10-20T08:58", { to: [ME], external: true }),
          msg("m3", HELEN, "Contract renewal questions", "Riley, before we renew I have three questions about pricing tiers. Can we talk this week?", "2026-10-20T08:31", { to: [ME], external: true }),
          msg("m4", JORDAN, "Q3 kickoff notes", "Notes from the Q3 kickoff are below for reference. No action needed.", "2026-10-19T17:05", { to: [ME, PRIYA, SAM] }),
          msg("m5", PROMO, "Flash sale: 50% off stock photos", "Today only! 50% off every stock photo plan.", "2026-10-19T12:00", { to: [ME], external: true }),
          msg("m6", SAAS, "SaaS Weekly: 7 onboarding mistakes", "This week's newsletter: onboarding mistakes and how to avoid them.", "2026-10-19T07:00", { to: [ME] }),
          msg("m7", SAAS, "SaaS Weekly: pricing page teardown", "This week: what great pricing pages have in common.", "2026-10-16T07:00", { to: [ME], read: true }),
        ],
        { folders: [{ id: "f-newsletters", name: "Newsletters", parent: "inbox" }, { id: "f-clients", name: "Clients", parent: "inbox" }] },
      ),
      tasks: [
        {
          instruction: 'Create a folder named "Waiting" inside the Inbox to track messages you delegate.',
          hint: "Right-click Inbox › New Folder... › Waiting (or Folder tab › New Folder).",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Waiting", parent: "Inbox" } } }],
        },
        {
          instruction: 'Two-minute rule: reply to Leah Park\'s "Is the 2:00 PM design review still on?" with "Yes, still on at 2:00 PM in the Hudson Room."',
          hint: "Select the message › Reply (Ctrl+R) › type › Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Leah Park's message first." },
            mentions("compose.body", "Yes, still on at 2:00 PM in the Hudson Room.", ["still on", "Hudson Room"]),
            steps.send,
          ],
        },
        {
          instruction: 'Delegate "Invoice question from Brightline Dental" to Dee Walker in Finance: forward it with "Dee, can you take this one? Please reply to Tanya by Thursday."',
          hint: "Select the message › Forward (Ctrl+F) › To: Dee Walker › type the instruction › Send.",
          steps: [
            { action: { kind: "command", id: "mail.forward" }, requires: { selection: "msg:m2" }, selectHint: "Select Tanya Brooks's invoice question first." },
            { action: { kind: "type", target: "compose.to", value: recipients(DEE.email) } },
            mentions("compose.body", "Dee, can you take this one? Please reply to Tanya by Thursday.", ["Please reply to Tanya", "Thursday"]),
            steps.send,
          ],
        },
        {
          instruction: 'Move the original "Invoice question from Brightline Dental" to the Waiting folder so you can check on it.',
          hint: "Drag the message to Waiting, or right-click › Move › Waiting.",
          steps: [{ action: { kind: "command", id: "mail.move", value: "Waiting" }, requires: { selection: "msg:m2" }, selectHint: "Select the invoice question first." }],
        },
        {
          instruction: 'Flag Helen Ward\'s "Contract renewal questions" for follow-up tomorrow. It needs more than two minutes.',
          hint: "Select the message › Home tab › Follow Up › Tomorrow.",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Tomorrow" }, requires: { selection: "msg:m3" }, selectHint: "Select Helen Ward's message first." }],
        },
        {
          instruction: '"Q3 kickoff notes" needs no action, but you may want it later. File it out of the Inbox without deleting it.',
          hint: "Select the message › Home tab › Archive (or Backspace).",
          steps: [{ action: { kind: "command", id: "mail.archive" }, alt: [{ kind: "command", id: "mail.move", value: "Archive" }], requires: { selection: "msg:m4" }, selectHint: "Select Jordan Reeves's \"Q3 kickoff notes\" first." }],
        },
        {
          instruction: 'Delete the promotional message "Flash sale: 50% off stock photos".',
          hint: "Select it and press Delete, or Home tab › Delete.",
          steps: [{ action: { kind: "command", id: "item.delete" }, requires: { selection: "msg:m5" }, selectHint: "Select the StockPix message first." }],
        },
        {
          instruction: "Create a rule that moves every message from SaaS Weekly (news@saasweekly.example.com) to the Newsletters folder, and run it now on the Inbox.",
          hint: "Select a SaaS Weekly message › Home tab › Rules › Create Rule... › From SaaS Weekly › Move the item to folder: Newsletters › Run this rule now › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "createRule", values: { fromOn: true, moveOn: true, folder: "Newsletters", runNow: true } },
              alt: [{ kind: "dialog", id: "alwaysMove", values: { folder: "Newsletters" } }],
              requires: { selection: ["msg:m6", "msg:m7"] },
              selectHint: "Select one of the SaaS Weekly messages first.",
            },
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  /* Module 11: Scheduling & Meetings                                 */
  /* ================================================================ */
  "module-11::digital-calendar-fundamentals": [
    {
      id: "mo-m11-calendar-fundamentals-outlook-1",
      app: "outlook",
      title: "Add complete events to the team calendar",
      scenario:
        "Morgan added you to the TOR Tech team calendar. Add this week's events the professional way: clear titles, the right times, links, agendas, and color, and change one recurring event without touching the rest of the series.",
      fileName: "Calendar",
      minutes: 8,
      initial: base([], { module: "calendar", calView: "Work Week", calDate: "2026-10-20", events: TEAM_EVENTS, categoryNames: { "Green Category": "Client Calls", "Blue Category": "Internal" } }),
      tasks: [
        {
          instruction: 'Create a recurring 15-minute meeting titled "Team Standup" with Jordan Reeves and Sam Okoro every Monday at 9:00 AM, starting Monday, October 26.',
          hint: "Home tab › New Meeting › Required: Jordan Reeves; Sam Okoro › title › Start 10/26/2026 9:00 AM, End 9:15 AM › Meeting tab › Recurrence › Weekly, Monday › OK › Send.",
          steps: [
            steps.newMeeting,
            { action: { kind: "type", target: "event.required", value: recipients(JORDAN.email, SAM.email) } },
            { action: { kind: "dialog", id: "event.save", values: { title: "Team Standup", startDate: "10/26/2026", startTime: "9:00 AM", endTime: "9:15 AM", recurrence: "Weekly on Monday" } } },
          ],
        },
        {
          instruction:
            'Create a Teams meeting titled "Acme Corp Q4 Planning Call" with Helen Ward on Thursday, October 22 from 2:00 PM to 2:30 PM, with the agenda "1. Review Q3 results 2. Agree on Q4 goals".',
          hint: "Home tab › New Teams Meeting (or New Meeting › Teams Meeting) › Required: Helen Ward › title › date and times › type the agenda › Send.",
          steps: [
            steps.newMeeting,
            { action: { kind: "type", target: "event.required", value: recipients(HELEN.email) } },
            mentions("event.body", "1. Review Q3 results 2. Agree on Q4 goals", ["Review Q3 results", "Q4 goals"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "Acme Corp Q4 Planning Call", startDate: "10/22/2026", startTime: "2:00 PM", endTime: "2:30 PM", teams: true } } },
          ],
        },
        {
          instruction: 'Add the project deadline "DEADLINE: Q3 Report - Acme Corp" as an all-day event on Friday, October 30 with the note "Final Q3 report due to Helen Ward."',
          hint: "Home tab › New Appointment › title › Start 10/30/2026 › check All day event › type the note › Save & Close. All-day events show as Free so they do not block meetings.",
          steps: [
            steps.newAppt,
            mentions("event.body", "Final Q3 report due to Helen Ward.", ["Final Q3 report"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "DEADLINE: Q3 Report - Acme Corp", startDate: "10/30/2026", allDay: true } } },
          ],
        },
        {
          instruction: 'Block focus time: add an appointment titled "Focus Block: Q2 Report Draft" on Wednesday, October 21 from 1:00 PM to 3:00 PM.',
          hint: "Double-click Wednesday at 1:00 PM (or Home tab › New Appointment) › title › End 3:00 PM › Save & Close.",
          steps: [steps.newAppt, { action: { kind: "dialog", id: "event.save", values: { title: "Focus Block: Q2 Report Draft", startDate: "10/21/2026", startTime: "1:00 PM", endTime: "3:00 PM" } } }],
        },
        {
          instruction: 'Color-code "Brightline Dental onboarding" on Wednesday as a client call by assigning the Client Calls category.',
          hint: "Click the event › Meeting tab (Calendar Tools) › Categorize › Client Calls (green), or right-click › Categorize.",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Green Category" }, requires: { selection: "evt:e2" }, selectHint: "Click \"Brightline Dental onboarding\" on Wednesday first." }],
        },
        {
          instruction: 'Next Tuesday\'s "Weekly Status Sync" (October 27) is canceled for a team offsite. Delete only that occurrence.',
          hint: "Go forward one week › click the October 27 Weekly Status Sync › Meeting Occurrence tab › Delete › Delete Occurrence (or press Delete and choose Delete this occurrence).",
          steps: [{ action: { kind: "command", id: "item.delete", value: "Delete Occurrence" }, requires: { selection: "evt:e1@2026-10-27" }, selectHint: "Go to next week and click the Weekly Status Sync on Tuesday, October 27." }],
        },
        {
          instruction: "Share your calendar with new teammate Sam Okoro so he can see when you are busy, but not the details.",
          hint: "Home tab › Share group › Share Calendar › Add: sam.okoro@tortech.example.com › Permission: Can view when I'm busy › OK.",
          steps: [{ action: { kind: "dialog", id: "shareCalendar", values: { person: [SAM.email, "Sam Okoro"], permission: "Can view when I'm busy" } } }],
        },
      ],
    },
  ],

  "module-11::booking-meetings": [
    {
      id: "mo-m11-booking-meetings-outlook-1",
      app: "outlook",
      title: "Book a kickoff for three busy people",
      scenario:
        "Morgan asks you to book a 30-minute vendor onboarding kickoff with Jordan Reeves, Priya Natarajan, and Ravi Desai from CloudNest, an outside vendor. Jordan and Priya are busy most of Thursday, and Ravi's calendar is not visible to you.",
      fileName: "Calendar",
      minutes: 8,
      initial: base(
        [msg("m1", MARCUS, "Can we find time next week?", "Hi Riley, can we find 30 minutes next week to go over the rollout plan?\n\nMarcus", "2026-10-20T08:20", { to: [ME], external: true })],
        {
          module: "calendar",
          calView: "Work Week",
          calDate: "2026-10-20",
          events: TEAM_EVENTS,
          files: [{ name: "Onboarding Brief.pdf", size: "240 KB" }, { name: "Onboarding Brief DRAFT.pdf", size: "236 KB" }],
          freeBusy: {
            [JORDAN.email]: [{ start: "2026-10-22T08:00", end: "2026-10-22T12:00", title: "Sprint planning" }, { start: "2026-10-22T12:00", end: "2026-10-22T13:00" }, { start: "2026-10-22T14:00", end: "2026-10-22T16:00" }],
            [PRIYA.email]: [{ start: "2026-10-22T09:00", end: "2026-10-22T11:00" }, { start: "2026-10-22T13:00", end: "2026-10-22T13:30" }, { start: "2026-10-22T15:00", end: "2026-10-22T17:00", status: "Out of Office" }],
          },
        },
      ),
      tasks: [
        {
          instruction:
            'Book "TOR Tech Q3 Vendor Onboarding Kickoff" on Thursday, October 22 with Jordan Reeves and Priya Natarajan as required and Ravi Desai (ravi.desai@cloudnest.example.com) as optional. Use the Scheduling Assistant to find the first 30-minute slot when Jordan and Priya are both free, make it a Teams meeting, add the agenda "1. Review vendor pricing 2. Agree on onboarding dates 3. Assign next steps", and send it.',
          hint: "Home tab › New Teams Meeting (or New Meeting › Teams Meeting) › add the attendees › Scheduling Assistant › pick the first open half hour (1:30 PM) › back to Meeting › title and agenda › Send.",
          steps: [
            steps.newMeeting,
            { action: { kind: "type", target: "event.required", value: recipients(JORDAN.email, PRIYA.email) } },
            { action: { kind: "type", target: "event.optional", value: recipients(RAVI.email) } },
            mentions("event.body", "1. Review vendor pricing 2. Agree on onboarding dates 3. Assign next steps", ["vendor pricing", "onboarding dates", "next steps"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "TOR Tech Q3 Vendor Onboarding Kickoff", startDate: "10/22/2026", startTime: "1:30 PM", endTime: "2:00 PM", teams: true } } },
          ],
        },
        {
          instruction: 'Change the reminder on "TOR Tech Q3 Vendor Onboarding Kickoff" to 1 day so everyone has time to read the brief.',
          hint: "Click the meeting in the calendar › Meeting tab (Calendar Tools) › Options group › Reminder › 1 day.",
          steps: [{ action: { kind: "command", id: "evtsel.reminder", value: "1 day" }, requires: { selection: "evt:e4" }, selectHint: "Click the kickoff meeting on Thursday at 1:30 PM first." }],
        },
        {
          instruction: 'Leah Park should attend too. Add her to the kickoff as an optional attendee and send the update.',
          hint: "Double-click the kickoff meeting › type Leah Park in Optional › Send Update.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "evt:e4" }, selectHint: "Double-click the kickoff meeting on Thursday to open it." },
            { action: { kind: "type", target: "event.optional", value: recipients(RAVI.email, LEAH.email) } },
            { action: { kind: "dialog", id: "event.save", values: { title: "TOR Tech Q3 Vendor Onboarding Kickoff" } } },
          ],
        },
        {
          instruction:
            'Send Ravi Desai a confirmation: attach "Onboarding Brief.pdf", use the subject "Confirmed: Vendor Onboarding Kickoff, Thursday, October 22 at 1:30 PM ET", and type "Thank you for confirming. Please review the attached onboarding brief before the call."',
          hint: "Mail › New Email › Message tab › Attach File › Onboarding Brief.pdf › To: Ravi Desai › subject and text › Send.",
          steps: [
            steps.newEmail,
            { action: { kind: "dialog", id: "attachFile", values: { file: "Onboarding Brief.pdf" } } },
            { action: { kind: "type", target: "compose.to", value: recipients(RAVI.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Confirmed: Vendor Onboarding Kickoff, Thursday, October 22 at 1:30 PM ET" } },
            mentions("compose.body", "Thank you for confirming. Please review the attached onboarding brief before the call.", ["attached onboarding brief"]),
            steps.send,
          ],
        },
        {
          instruction: 'Do not ask "when are you free?" Reply to Marcus Webb\'s "Can we find time next week?" and offer two specific times: "Tuesday at 10:00 AM" or "Wednesday at 2:00 PM".',
          hint: "Mail (Ctrl+1) › select the message › Reply › propose both times › Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Go to Mail and select Marcus Webb's message first." },
            mentions("compose.body", "Would Tuesday at 10:00 AM or Wednesday at 2:00 PM work for you?", ["Tuesday at 10:00 AM", "Wednesday at 2:00 PM"]),
            steps.send,
          ],
        },
      ],
    },
  ],

  "module-11::managing-conflicts": [
    {
      id: "mo-m11-managing-conflicts-outlook-1",
      app: "outlook",
      title: "Two meetings, one 2:00 PM slot",
      scenario:
        "A client product demo and your internal budget review both want Thursday at 2:00 PM. Morgan agrees the external, revenue-tied demo keeps the slot. Accept the demo, move the internal meeting, tell the attendees why, and protect the rest of the afternoon.",
      fileName: "Calendar",
      minutes: 8,
      initial: base(
        [
          msg("m1", HELEN, "Acme Corp Product Demo", "Riley, please join our product demo for the Acme leadership team.", "2026-10-20T08:15", {
            to: [ME],
            external: true,
            invite: { title: "Acme Corp Product Demo", start: "2026-10-22T14:00", end: "2026-10-22T15:00", location: "Microsoft Teams Meeting", organizer: HELEN, required: [ME], teams: true },
          }),
        ],
        {
          module: "calendar",
          calView: "Work Week",
          calDate: "2026-10-20",
          events: [
            { id: "e1", title: "Q4 Budget Review", start: "2026-10-22T14:00", end: "2026-10-22T15:00", meeting: true, organizer: ME, required: [DEE, MORGAN], location: "Hudson Room" },
            { id: "e2", title: "1:1 with Morgan", start: "2026-10-22T14:30", end: "2026-10-22T15:00", meeting: true, organizer: MORGAN, required: [ME], recurrence: { freq: "weekly", days: [4] }, location: "Morgan's office", response: "Accepted" },
            { id: "e3", title: "Client call: Brightline Dental", start: "2026-10-22T15:15", end: "2026-10-22T15:45", meeting: true, organizer: ME, required: [TANYA] },
          ],
          freeBusy: { [DEE.email]: [{ start: "2026-10-23T09:00", end: "2026-10-23T10:00" }], [MORGAN.email]: [{ start: "2026-10-23T11:00", end: "2026-10-23T12:00" }] },
        },
      ),
      tasks: [
        {
          instruction: 'Accept the client\'s meeting request "Acme Corp Product Demo". The external demo keeps the Thursday 2:00 PM slot.',
          hint: "Mail (Ctrl+1) › select the request › Accept › Send the Response Now. The request shows the conflict with your budget review.",
          steps: [{ action: { kind: "command", id: "invite.respond", value: ACCEPT }, requires: { selection: "msg:m1" }, selectHint: "Go to Mail and select the request \"Acme Corp Product Demo\" first." }],
        },
        {
          instruction: 'Move your internal "Q4 Budget Review" from Thursday at 2:00 PM to Friday, October 23 at 10:00 AM, when Dee and Morgan are both free.',
          hint: "Calendar › drag the meeting to Friday at 10:00 AM. Or double-click it, change the start to 10/23/2026 10:00 AM, and click Send Update.",
          steps: [
            {
              action: { kind: "command", id: "event.move", value: "10/23/2026 10:00 AM" },
              alt: [{ kind: "dialog", id: "event.save", values: { startDate: "10/23/2026", startTime: "10:00 AM" } }],
              requires: { selection: "evt:e1" },
              selectHint: "Click \"Q4 Budget Review\" on Thursday first.",
            },
          ],
        },
        {
          instruction: 'Log the change in the meeting: open "Q4 Budget Review" and add the note "Originally Thursday 2:00 PM. Moved to Friday 10:00 AM for the Acme client demo." Then send the update.',
          hint: "Double-click the meeting on Friday › click in the notes box › type the note › Send Update.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "evt:e1" }, selectHint: "Double-click \"Q4 Budget Review\" on Friday to open it." },
            mentions("event.body", "Originally Thursday 2:00 PM. Moved to Friday 10:00 AM for the Acme client demo.", ["Originally Thursday 2:00 PM", "Acme"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "Q4 Budget Review" } } },
          ],
        },
        {
          instruction:
            'Email Dee Walker and Morgan Ellis about the change. Use the subject "Rescheduled: Q4 Budget Review Moved to Friday at 10:00 AM" and write a message that apologizes, gives the reason (a client demo), and offers Monday at 9:00 AM as a backup.',
          hint: "Mail › New Email › To: Dee Walker; Morgan Ellis › subject › lead with the apology and the reason, then the backup time › Send.",
          steps: [
            steps.newEmail,
            { action: { kind: "type", target: "compose.to", value: recipients(DEE.email, MORGAN.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Rescheduled: Q4 Budget Review Moved to Friday at 10:00 AM" } },
            mentions("compose.body", "I am sorry for the change. A client demo needed the Thursday 2:00 PM slot, so the budget review is now Friday at 10:00 AM. If that does not work, Monday at 9:00 AM is open.", ["sorry", "client demo", "Monday at 9:00 AM"]),
            steps.send,
          ],
        },
        {
          instruction: 'The demo may run long, so decline only this Thursday\'s occurrence of the recurring "1:1 with Morgan". Keep the rest of the series.',
          hint: "Calendar › click the October 22 \"1:1 with Morgan\" › Meeting Occurrence tab › Respond › Decline (or right-click › Decline).",
          steps: [{ action: { kind: "command", id: "evtsel.respond", value: "Decline" }, requires: { selection: "evt:e2@2026-10-22" }, selectHint: "Click Thursday's \"1:1 with Morgan\" first." }],
        },
        {
          instruction: 'Add a 15-minute buffer between the demo and the Brightline client call: an appointment titled "Buffer" on Thursday, October 22 from 3:00 PM to 3:15 PM.',
          hint: "Double-click Thursday at 3:00 PM (or New Appointment) › title Buffer › End 3:15 PM › Save & Close.",
          steps: [steps.newAppt, { action: { kind: "dialog", id: "event.save", values: { title: "Buffer", startDate: "10/22/2026", startTime: "3:00 PM", endTime: "3:15 PM" } } }],
        },
      ],
    },
  ],

  "module-11::schedule-a-full-week": [
    {
      id: "mo-m11-full-week-outlook-1",
      app: "outlook",
      title: "Build a functional week while Morgan travels",
      scenario:
        "Morgan Ellis is on a business trip from October 26 to 30, and you manage the team calendar. Turn a fragile week into a functional one: block the travel, schedule complete client meetings, mark deadlines, add buffers and focus time, and resolve one overlap with a note that explains it.",
      fileName: "Calendar",
      minutes: 8,
      initial: base([], {
        module: "calendar",
        calView: "Work Week",
        calDate: "2026-10-26",
        events: [
          { id: "e1", title: "Team Standup", start: "2026-10-26T09:00", end: "2026-10-26T09:15", meeting: true, organizer: ME, required: [JORDAN, SAM], recurrence: { freq: "weekly", days: [1] } },
          { id: "e2", title: "Planning Review", start: "2026-10-27T11:45", end: "2026-10-27T12:30", meeting: true, organizer: ME, required: [JORDAN, PRIYA] },
          { id: "e3", title: "Brightline Dental Renewal Call", start: "2026-10-29T14:00", end: "2026-10-29T14:30", meeting: true, organizer: ME, required: [TANYA], teams: true },
          { id: "e4", title: "Design Sync", start: "2026-10-29T14:00", end: "2026-10-29T14:45", meeting: true, organizer: ME, required: [LEAH, SAM], location: "Hudson Room" },
        ],
      }),
      tasks: [
        {
          instruction: 'Block the travel week: create an all-day event "Morgan Ellis - Out of Office (Business Travel)" from Monday, October 26 through Friday, October 30, shown as Out of Office.',
          hint: "New Appointment › title › check All day event › Start 10/26/2026, End 10/30/2026 › Appointment tab › Show As › Out of Office › Save & Close.",
          steps: [steps.newAppt, { action: { kind: "dialog", id: "event.save", values: { title: "Morgan Ellis - Out of Office (Business Travel)", allDay: true, startDate: "10/26/2026", endDate: "10/30/2026", showAs: "Out of Office" } } }],
        },
        {
          instruction:
            'Schedule "TOR Tech Q3 Client Check-In: Acme Corp" with Helen Ward on Tuesday, October 27 from 11:00 AM to 11:30 AM as a Teams meeting with the agenda "1. Review Q3 deliverables 2. Confirm next milestone dates".',
          hint: "New Teams Meeting › Required: Helen Ward › title › date and times › agenda › Send.",
          steps: [
            steps.newMeeting,
            { action: { kind: "type", target: "event.required", value: recipients(HELEN.email) } },
            mentions("event.body", "1. Review Q3 deliverables 2. Confirm next milestone dates", ["Review Q3 deliverables", "milestone dates"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "TOR Tech Q3 Client Check-In: Acme Corp", startDate: "10/27/2026", startTime: "11:00 AM", endTime: "11:30 AM", teams: true } } },
          ],
        },
        {
          instruction: 'The check-in ends at 11:30 AM and the Planning Review starts at 11:45 AM. Add a 15-minute appointment titled "Buffer" on Tuesday, October 27 from 11:30 AM to 11:45 AM.',
          hint: "New Appointment › title Buffer › Start 11:30 AM, End 11:45 AM › Save & Close.",
          steps: [steps.newAppt, { action: { kind: "dialog", id: "event.save", values: { title: "Buffer", startDate: "10/27/2026", startTime: "11:30 AM", endTime: "11:45 AM" } } }],
        },
        {
          instruction: 'Add the deadline "DEADLINE: Q3 Report - Acme Corp" as an all-day event on Thursday, October 29.',
          hint: "New Appointment › title › check All day event › Start 10/29/2026 › Save & Close.",
          steps: [steps.newAppt, { action: { kind: "dialog", id: "event.save", values: { title: "DEADLINE: Q3 Report - Acme Corp", allDay: true, startDate: "10/29/2026" } } }],
        },
        {
          instruction: 'Protect deep work: add a 60-minute appointment titled "Focus Block: Board Deck Review" on Wednesday, October 28 at 9:00 AM.',
          hint: "Double-click Wednesday at 9:00 AM › title › End 10:00 AM › Save & Close.",
          steps: [steps.newAppt, { action: { kind: "dialog", id: "event.save", values: { title: "Focus Block: Board Deck Review", startDate: "10/28/2026", startTime: "9:00 AM", endTime: "10:00 AM" } } }],
        },
        {
          instruction: 'On Thursday the external "Brightline Dental Renewal Call" and the internal "Design Sync" overlap at 2:00 PM. The client call keeps its time. Move "Design Sync" to Thursday, October 29 at 4:00 PM.',
          hint: "Drag Design Sync to Thursday at 4:00 PM, or double-click it, change the start time to 4:00 PM, and click Send Update.",
          steps: [
            {
              action: { kind: "command", id: "event.move", value: "10/29/2026 4:00 PM" },
              alt: [{ kind: "dialog", id: "event.save", values: { startDate: "10/29/2026", startTime: "4:00 PM" } }],
              requires: { selection: "evt:e4" },
              selectHint: "Click \"Design Sync\" on Thursday first.",
            },
          ],
        },
        {
          instruction: 'Document the change: open "Design Sync" and add the note "Originally Thursday 2:00 PM. Moved to 4:00 PM for the Brightline renewal call." Then send the update.',
          hint: "Double-click Design Sync › type the note in the notes box › Send Update.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "evt:e4" }, selectHint: "Double-click \"Design Sync\" to open it." },
            mentions("event.body", "Originally Thursday 2:00 PM. Moved to 4:00 PM for the Brightline renewal call.", ["Originally Thursday 2:00 PM", "Brightline"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "Design Sync" } } },
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  /* Module 12: Task & Project Management                             */
  /* ================================================================ */
  "module-12::task-management-tools": [
    {
      id: "mo-m12-task-tools-outlook-1",
      app: "outlook",
      title: "Set up your task list in Outlook",
      scenario:
        "TOR Tech tracks personal work in Outlook Tasks, the same list Microsoft To Do uses. Morgan wants every task to have a clear title, a due date, a priority, and an honest status, and wants email requests turned into tasks instead of sitting in the Inbox.",
      fileName: "Tasks",
      minutes: 7,
      initial: base(
        [msg("m1", PRIYA, "Need the logo files by Thursday", "Hi Riley, can you send me the final logo files by Thursday? The client asked for them.", "2026-10-20T08:50", { to: [ME] })],
        { module: "tasks", tasksFolder: "To-Do List", tasks: TASKS_BASE, categoryNames: { "Blue Category": "Acme Project" } },
      ),
      tasks: [
        {
          instruction: 'Create a task titled "Draft Q3 client report" due Friday, October 23 with High priority.',
          hint: "Home tab › New Task (Ctrl+N) › Subject › Due date 10/23/2026 › Priority: High › Save & Close.",
          steps: [steps.newTask, { action: { kind: "dialog", id: "task.save", values: { subject: "Draft Q3 client report", dueDate: "10/23/2026", priority: "High" } } }],
        },
        {
          instruction: 'Quickly add a task "Order replacement laptop charger" by typing it in the To-Do List.',
          hint: "Click Type a new task at the top of the To-Do List, type the title, and press Enter.",
          steps: [{ action: { kind: "type", target: "tasks.new", value: "Order replacement laptop charger" } }],
        },
        {
          instruction: 'You started "Update client onboarding checklist". Open it and set its status to In Progress and 25% complete.',
          hint: "Double-click the task › Status: In Progress › % Complete: 25% › Save & Close.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "task:t2" }, selectHint: "Double-click \"Update client onboarding checklist\" to open it." },
            { action: { kind: "dialog", id: "task.save", values: { status: "In Progress", percent: 25 } } },
          ],
        },
        {
          instruction: 'Mark "Send meeting notes to Jordan" as complete.',
          hint: "Select the task › Home tab › Manage Task › Mark Complete (or click its flag or checkbox).",
          steps: [{ action: { kind: "command", id: "task.complete" }, requires: { selection: "task:t3" }, selectHint: "Select \"Send meeting notes to Jordan\" first." }],
        },
        {
          instruction: 'Label "Prepare vendor comparison" with the Acme Project category.',
          hint: "Select the task › Home tab › Tags › Categorize › Acme Project (blue), or right-click › Categorize.",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Blue Category" }, requires: { selection: "task:t1" }, selectHint: "Select \"Prepare vendor comparison\" first." }],
        },
        {
          instruction: 'Turn an email into a task: flag Priya Natarajan\'s message "Need the logo files by Thursday" for follow-up tomorrow.',
          hint: "Mail (Ctrl+1) › select the message › Home tab › Follow Up › Tomorrow. It appears in your To-Do List.",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Tomorrow" }, requires: { selection: "msg:m1" }, selectHint: "Go to Mail and select Priya's message first." }],
        },
        {
          instruction: "Back in Tasks, switch to the Detailed view so you can see status and % complete for every task.",
          hint: "Tasks (Ctrl+4) › Home tab › Current View › Detailed (or View tab › Change View › Detailed).",
          steps: [{ action: { kind: "command", id: "tasks.view", value: "Detailed" } }],
        },
      ],
    },
  ],

  "module-12::prioritizing-work": [
    {
      id: "mo-m12-prioritizing-outlook-1",
      app: "outlook",
      title: "Sort Monday's tasks with the Eisenhower Matrix",
      scenario:
        "You start Monday with a long task list. Morgan needs the client report by noon. Your categories are already named for the four Eisenhower quadrants. Do the urgent and important work first, schedule what matters, delegate what someone else can do, and drop what does not matter.",
      fileName: "Tasks",
      minutes: 7,
      initial: base([], {
        module: "tasks",
        tasksFolder: "Tasks",
        tasksView: "Detailed",
        tasks: [
          { id: "t1", subject: "Finish client report for noon", due: "2026-10-20", status: "In Progress", priority: "Normal", percent: 60 },
          { id: "t2", subject: "Send client email by 2:00 PM", due: "2026-10-20", status: "Not Started", priority: "Normal" },
          { id: "t3", subject: "Reorganize shared drive", status: "Not Started", priority: "Normal" },
          { id: "t4", subject: "Order office supplies", due: "2026-10-21", status: "Not Started", priority: "Normal" },
          { id: "t5", subject: "Answer vendor newsletter survey", due: "2026-10-21", status: "Not Started", priority: "Low" },
          { id: "t6", subject: "Prepare Q4 training plan", due: "2026-11-06", status: "Not Started", priority: "Normal" },
        ],
        categoryNames: { "Red Category": "Q1 Do Now", "Yellow Category": "Q2 Schedule", "Blue Category": "Q3 Delegate", "Purple Category": "Q4 Eliminate" },
        events: [{ id: "e1", title: "Team Standup", start: "2026-10-20T09:00", end: "2026-10-20T09:15" }],
      }),
      tasks: [
        {
          instruction: 'Assign the Q1 Do Now category to "Finish client report for noon".',
          hint: "Select the task › Home tab › Tags › Categorize › Q1 Do Now (red), or right-click › Categorize.",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Red Category" }, requires: { selection: "task:t1" }, selectHint: "Select \"Finish client report for noon\" first." }],
        },
        {
          instruction: 'Mark "Finish client report for noon" as High priority.',
          hint: "With the task selected › Home tab › Tags group › High Importance.",
          steps: [{ action: { kind: "command", id: "task.priority", value: "High" }, requires: { selection: "task:t1" }, selectHint: "Select \"Finish client report for noon\" first." }],
        },
        {
          instruction: 'Time-block the report: add an appointment titled "Focus: Client Report" today, October 20, from 10:00 AM to 12:00 PM.',
          hint: "Home tab › New Items › Appointment (or Ctrl+Shift+A) › title › Start 10/20/2026 10:00 AM, End 12:00 PM › Save & Close.",
          steps: [steps.newAppt, { action: { kind: "dialog", id: "event.save", values: { title: "Focus: Client Report", startDate: "10/20/2026", startTime: "10:00 AM", endTime: "12:00 PM" } } }],
        },
        {
          instruction: 'Schedule the Q2 task "Reorganize shared drive" for next week.',
          hint: "Select the task › Home tab › Follow Up group › Next Week.",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Next Week" }, requires: { selection: "task:t3" }, selectHint: "Select \"Reorganize shared drive\" first." }],
        },
        {
          instruction: 'Delegate "Order office supplies": open it, assign it to Sam Okoro, and send the task request.',
          hint: "Double-click the task › Task tab › Manage Task › Assign Task › To: Sam Okoro › Send.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "task:t4" }, selectHint: "Double-click \"Order office supplies\" to open it." },
            { action: { kind: "type", target: "task.to", value: recipients(SAM.email) } },
            { action: { kind: "dialog", id: "task.save", values: { subject: "Order office supplies" } } },
          ],
        },
        {
          instruction: 'Eliminate the Q4 task "Answer vendor newsletter survey" by deleting it.',
          hint: "Select the task and press Delete, or Home tab › Delete.",
          steps: [{ action: { kind: "command", id: "item.delete" }, requires: { selection: "task:t5" }, selectHint: "Select \"Answer vendor newsletter survey\" first." }],
        },
      ],
    },
  ],

  "module-12::tracking-deadlines": [
    {
      id: "mo-m12-tracking-deadlines-outlook-1",
      app: "outlook",
      title: "Keep six deliverables on track",
      scenario:
        "A TOR Tech client project has six deliverables due over three weeks. Your job is to keep Outlook Tasks honest: every status current, risks flagged early with a note, reminders set before deadlines, and a short status summary for Morgan.",
      fileName: "Tasks",
      minutes: 7,
      initial: base(
        [msg("m1", JORDAN, "Need the vendor contract back", "Riley, I need the signed vendor contract back by Wednesday, October 28.", "2026-10-20T08:40", { to: [ME] })],
        {
          module: "tasks",
          tasksFolder: "Tasks",
          tasksView: "Detailed",
          categoryNames: { "Red Category": "At Risk", "Green Category": "On Track" },
          tasks: [
            { id: "t1", subject: "Q3 client report - final draft", due: "2026-10-23", status: "In Progress", priority: "High", percent: 40 },
            { id: "t2", subject: "Collect finance data export", due: "2026-10-21", status: "Not Started", priority: "High" },
            { id: "t3", subject: "Kickoff deck shared with client", due: "2026-10-19", status: "In Progress", priority: "Normal", percent: 90 },
            { id: "t4", subject: "User training schedule", due: "2026-10-30", status: "Not Started", priority: "Normal", categories: ["Green Category"] },
            { id: "t5", subject: "Data migration test", due: "2026-11-04", status: "Not Started", priority: "Normal" },
            { id: "t6", subject: "Go-live checklist", due: "2026-11-06", status: "Not Started", priority: "Normal" },
          ],
        },
      ),
      tasks: [
        {
          instruction: 'The finance export is late. Open "Collect finance data export", set its status to "Waiting on someone else", and add the note "Finance export delayed 2 days. Expected Wednesday."',
          hint: "Double-click the task › Status: Waiting on someone else › type the note in the notes box › Save & Close.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "task:t2" }, selectHint: "Double-click \"Collect finance data export\" to open it." },
            mentions("form.notes", "Finance export delayed 2 days. Expected Wednesday.", ["delayed", "Wednesday"]),
            { action: { kind: "dialog", id: "task.save", values: { status: "Waiting on someone else" } } },
          ],
        },
        {
          instruction: 'Flag the risk early: assign the At Risk category to "Q3 client report - final draft", which depends on the late export.',
          hint: "Select the task › Home tab › Categorize › At Risk (red).",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Red Category" }, requires: { selection: "task:t1" }, selectHint: "Select \"Q3 client report - final draft\" first." }],
        },
        {
          instruction: 'Mark "Kickoff deck shared with client" complete. It went out this morning.',
          hint: "Select the task › Home tab › Mark Complete (or check its box).",
          steps: [{ action: { kind: "command", id: "task.complete" }, requires: { selection: "task:t3" }, selectHint: "Select \"Kickoff deck shared with client\" first." }],
        },
        {
          instruction: 'Flag Jordan Reeves\'s message "Need the vendor contract back" with a due date of 10/28/2026 and a reminder on 10/27/2026 at 9:00 AM, one day ahead.',
          hint: "Mail › select the message › Home tab › Follow Up › Custom... › Due date 10/28/2026 › check Reminder › 10/27/2026, 9:00 AM › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "customFlag", values: { dueDate: "10/28/2026", reminder: true, reminderDate: "10/27/2026", reminderTime: "9:00 AM" } },
              requires: { selection: "msg:m1" },
              selectHint: "Go to Mail and select Jordan's message first.",
            },
          ],
        },
        {
          instruction: "Back in Tasks, switch to the Overdue view to see anything past its due date.",
          hint: "Tasks (Ctrl+4) › Home tab › Current View › Overdue.",
          steps: [{ action: { kind: "command", id: "tasks.view", value: "Overdue" } }],
        },
        {
          instruction:
            'Send Morgan Ellis a three-sentence status summary with the subject "Weekly Status: Acme Client Project" that says what is "on track", what is "at risk", and the "decision" you need.',
          hint: "Home tab › New Email › To: Morgan Ellis › subject › summary › Send.",
          steps: [
            steps.newEmail,
            { action: { kind: "type", target: "compose.to", value: recipients(MORGAN.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Weekly Status: Acme Client Project" } },
            mentions(
              "compose.body",
              "The training schedule is on track. The Q3 report is at risk because the finance export is two days late. Decision needed: can we move the report deadline to Monday?",
              ["on track", "at risk", "decision"],
            ),
            steps.send,
          ],
        },
      ],
    },
  ],

  "module-12::build-project-tracker": [
    {
      id: "mo-m12-project-tracker-outlook-1",
      app: "outlook",
      title: "Turn Outlook Tasks into a project tracker",
      scenario:
        "Morgan says half the team's tasks have no owner and nobody knows what is overdue. Use Outlook Tasks as a shared tracker: categories for projects and risk, one owner per task, priorities, statuses, and a Detailed view everyone can scan.",
      fileName: "Tasks",
      minutes: 7,
      initial: base([], {
        module: "tasks",
        tasksFolder: "Tasks",
        tasksView: "Simple List",
        categoryNames: { "Blue Category": "Website Refresh", "Green Category": "Client Onboarding", "Red Category": "At Risk" },
        tasks: [
          { id: "t1", subject: "Redesign homepage hero section", due: "2026-10-28", status: "In Progress", priority: "High", owner: "Leah Park", percent: 30 },
          { id: "t2", subject: "Send welcome packet to Brightline Dental", due: "2026-10-22", status: "Not Started", priority: "Normal", owner: "Priya Natarajan" },
          { id: "t3", subject: "Collect brand assets from client", due: "2026-10-19", status: "In Progress", priority: "Normal", owner: "Leah Park", percent: 80 },
          { id: "t4", subject: "Migrate blog posts", due: "2026-10-23", status: "Not Started", priority: "Normal", owner: "Sam Okoro" },
        ],
      }),
      tasks: [
        {
          instruction: 'Create a task "Submit Q3 client report to finance team" due 10/30/2026, High priority, status In Progress, and assign it to Dee Walker.',
          hint: "Home tab › New Task › Subject › Due date › Priority: High › Status: In Progress › Task tab › Assign Task › To: Dee Walker › Send.",
          steps: [
            steps.newTask,
            { action: { kind: "type", target: "task.to", value: recipients(DEE.email) } },
            { action: { kind: "dialog", id: "task.save", values: { subject: "Submit Q3 client report to finance team", dueDate: "10/30/2026", priority: "High", status: "In Progress" } } },
          ],
        },
        {
          instruction: 'Tag "Redesign homepage hero section" with the Website Refresh project category.',
          hint: "Select the task › Home tab › Categorize › Website Refresh (blue).",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Blue Category" }, requires: { selection: "task:t1" }, selectHint: "Select \"Redesign homepage hero section\" first." }],
        },
        {
          instruction: 'Tag "Send welcome packet to Brightline Dental" with the Client Onboarding project category.',
          hint: "Select the task › Home tab › Categorize › Client Onboarding (green).",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Green Category" }, requires: { selection: "task:t2" }, selectHint: "Select \"Send welcome packet to Brightline Dental\" first." }],
        },
        {
          instruction: 'Mark "Collect brand assets from client" complete.',
          hint: "Select the task › Home tab › Mark Complete (or check its box).",
          steps: [{ action: { kind: "command", id: "task.complete" }, requires: { selection: "task:t3" }, selectHint: "Select \"Collect brand assets from client\" first." }],
        },
        {
          instruction: '"Migrate blog posts" is behind. Assign it the At Risk category.',
          hint: "Select the task › Home tab › Categorize › At Risk (red).",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Red Category" }, requires: { selection: "task:t4" }, selectHint: "Select \"Migrate blog posts\" first." }],
        },
        {
          instruction: "Show the tracker in the Detailed view so status, % complete, and owner are visible.",
          hint: "Home tab › Current View › Detailed (or View tab › Change View › Detailed).",
          steps: [{ action: { kind: "command", id: "tasks.view", value: "Detailed" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  /* Module 13: CRM & Office Systems                                  */
  /* ================================================================ */
  "module-13::what-is-a-crm": [
    {
      id: "mo-m13-what-is-crm-outlook-1",
      app: "outlook",
      title: "Use Outlook People as a simple CRM",
      scenario:
        "TOR Tech uses a full CRM for big accounts, but small accounts live in Outlook People. Each contact card holds the client's details, notes, a follow-up flag, and an activity history. If it is not in the record, it did not happen.",
      fileName: "Contacts",
      minutes: 6,
      initial: base([], { module: "people", contacts: CRM_CONTACTS, categoryNames: { "Green Category": "Active Client" } }),
      tasks: [
        {
          instruction: 'Log today\'s phone call on Helen Ward\'s record: type Phone Call, summary "Helen asked about adding two user licenses. Sent pricing by email."',
          hint: "Select Helen Ward › Home tab › Communicate › Log Activity (or + Log activity on her card) › Activity type: Phone Call › type the summary › Save.",
          steps: [activityStep("c1", { type: "Phone Call", date: "10/20/2026", summary: "Helen asked about adding two user licenses. Sent pricing by email." }, ["Phone Call", "two user licenses"])],
        },
        {
          instruction: "Flag Helen Ward's contact for follow-up tomorrow so the pricing question does not fall through the cracks.",
          hint: "Select Helen Ward › Home tab › Tags › Follow Up › Tomorrow (or right-click › Follow Up).",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "Tomorrow" }, requires: { selection: "contact:c1" }, selectHint: "Select Helen Ward in the contact list first." }],
        },
        {
          instruction: 'Tanya Brooks has a new work phone. Open her record, change Business phone to "(555) 867-5309", and add to Notes: "Phone updated 10/20/2026 per client email."',
          hint: "Double-click Tanya Brooks (or Edit on her card) › Business... phone › click in Notes and add the line › Save & Close.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "contact:c2" }, selectHint: "Open Tanya Brooks's record: double-click her name or click Edit." },
            mentions("form.notes", "Renewal date 1/15/2027. Phone updated 10/20/2026 per client email.", ["Phone updated 10/20/2026"]),
            { action: { kind: "dialog", id: "contact.save", values: { phone: "(555) 867-5309" } } },
          ],
        },
        {
          instruction: "Mark Marcus Webb as an active client with the Active Client category.",
          hint: "Select Marcus Webb › Home tab › Categorize › Active Client (green).",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Green Category" }, requires: { selection: "contact:c3" }, selectHint: "Select Marcus Webb first." }],
        },
        {
          instruction: 'Email Marcus Webb from his contact card with the subject "Welcome to TOR Tech" and the text "Hi Marcus, welcome aboard. Your onboarding call is Thursday at 10:00 AM."',
          hint: "Select Marcus Webb › Email (on his card or Home tab › Communicate › Email) › type the subject and text › Send.",
          steps: [
            steps.newEmail,
            { action: { kind: "type", target: "compose.to", value: recipients(MARCUS.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Welcome to TOR Tech" } },
            mentions("compose.body", "Hi Marcus, welcome aboard. Your onboarding call is Thursday at 10:00 AM.", ["welcome aboard", "Thursday at 10:00 AM"]),
            steps.send,
          ],
        },
      ],
    },
  ],

  "module-13::managing-client-records": [
    {
      id: "mo-m13-client-records-outlook-1",
      app: "outlook",
      title: "Get Marcus Webb set up before his onboarding call",
      scenario:
        'New client Marcus Webb signed with TOR Tech. Morgan says: "Get Marcus set up in the system before tomorrow." Search first: Marcus is already in your contacts from an earlier inquiry, so update that record instead of creating a duplicate, then add his colleague and a group.',
      fileName: "Contacts",
      minutes: 7,
      initial: base([], {
        module: "people",
        contacts: [
          { id: "c1", name: "Marcus Webb", email: MARCUS_OLD, company: "Webb Freight", phone: "(555) 410-2200", notes: "Inquiry in June 2026 about IT support." },
          { id: "c2", name: "Helen Ward", email: HELEN.email, company: "Acme Corp", jobTitle: "Operations Director" },
          { id: "c3", name: "Tanya Brooks", email: TANYA.email, company: "Brightline Dental", jobTitle: "Practice Manager", notes: "Renewal date 1/15/2027." },
        ],
        categoryNames: { "Green Category": "Active Client" },
      }),
      tasks: [
        {
          instruction:
            'Open Marcus Webb\'s existing record and update it: Company "Webb Logistics", Job title "Director of Operations", E-mail "marcus.webb@webblogistics.example.com". Add to Notes: "Goes by Marc. Prefers text over email. Contract 11/2/2026 to 11/1/2027. Rep: Riley Chen."',
          hint: "Search Contacts for Webb › double-click Marcus Webb › update Company, Job title, and E-mail › add the line in Notes › Save & Close.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "contact:c1" }, selectHint: "Open Marcus Webb's record: double-click it or click Edit." },
            mentions("form.notes", "Inquiry in June 2026 about IT support. Goes by Marc. Prefers text over email. Contract 11/2/2026 to 11/1/2027. Rep: Riley Chen.", ["Goes by Marc", "11/1/2027", "Riley Chen"]),
            { action: { kind: "dialog", id: "contact.save", values: { company: "Webb Logistics", jobTitle: "Director of Operations", email: MARCUS.email } } },
          ],
        },
        {
          instruction:
            'Create a new contact for his colleague: Full Name "Ana Ruiz", Company "Webb Logistics", Job title "Accounts Payable Manager", E-mail "ana.ruiz@webblogistics.example.com", Business phone "(555) 410-2290".',
          hint: "Home tab › New Contact (Ctrl+N) › fill in each field › Save & Close.",
          steps: [
            OPEN.contact,
            { action: { kind: "dialog", id: "contact.save", values: { name: "Ana Ruiz", company: "Webb Logistics", jobTitle: "Accounts Payable Manager", email: "ana.ruiz@webblogistics.example.com", phone: "(555) 410-2290" } } },
          ],
        },
        {
          instruction: 'Create a contact group named "Webb Logistics Team" with Marcus Webb and Ana Ruiz.',
          hint: "Home tab › New Contact Group › Name › Add Members › From Outlook Contacts › pick both › OK › Save & Close.",
          steps: [
            OPEN.group,
            { action: { kind: "type", target: "group.members", value: recipients(MARCUS.email, "ana.ruiz@webblogistics.example.com") } },
            { action: { kind: "dialog", id: "group.save", values: { name: "Webb Logistics Team" } } },
          ],
        },
        {
          instruction: "Categorize Marcus Webb as an Active Client.",
          hint: "Select Marcus Webb › Home tab › Categorize › Active Client (green).",
          steps: [{ action: { kind: "command", id: "item.categorize", value: "Green Category" }, requires: { selection: "contact:c1" }, selectHint: "Select Marcus Webb first." }],
        },
        {
          instruction: 'Tanya Brooks left Brightline Dental. Do not delete her record. Add to her Notes: "Left Brightline Dental 10/2026. New contact: Omar Hale."',
          hint: "Open Tanya Brooks's record › add the line in Notes › Save & Close. Keeping old records preserves the history.",
          steps: [
            { action: { kind: "command", id: "item.open" }, requires: { selection: "contact:c3" }, selectHint: "Open Tanya Brooks's record first." },
            mentions("form.notes", "Renewal date 1/15/2027. Left Brightline Dental 10/2026. New contact: Omar Hale.", ["Left Brightline Dental", "Omar Hale"]),
            { action: { kind: "dialog", id: "contact.save", values: { name: "Tanya Brooks" } } },
          ],
        },
      ],
    },
  ],

  "module-13::professional-follow-up": [
    {
      id: "mo-m13-follow-up-outlook-1",
      app: "outlook",
      title: "Log the call and follow up before end of day",
      scenario:
        'After a 45-minute call with Helen Ward at Acme Corp, Morgan says: "Log that call and send her our next steps before end of day." Log first, then write the follow-up from your log, then set a reminder that fires before the deadline.',
      fileName: "Contacts",
      minutes: 7,
      initial: base([], {
        module: "people",
        contacts: CRM_CONTACTS,
        tasks: [{ id: "t1", subject: "Send pricing sheet to Helen Ward", due: "2026-10-20", status: "In Progress", priority: "Normal" }],
      }),
      tasks: [
        {
          instruction:
            'Log the call on Helen Ward\'s record: type Phone Call, summary "Discussed Q3 contract renewal, revised proposal timeline, and two new user licenses.", next step "Riley to send revised proposal", follow-up date 10/23/2026.',
          hint: "Select Helen Ward › Log Activity › Phone Call › summary › Next step › Follow-up due date 10/23/2026 › Save. The follow-up date also flags the contact.",
          steps: [
            activityStep(
              "c1",
              { type: "Phone Call", date: "10/20/2026", summary: "Discussed Q3 contract renewal, revised proposal timeline, and two new user licenses.", next: "Riley to send revised proposal", due: "10/23/2026" },
              ["Phone Call", "contract renewal", "revised proposal", "Follow-up: 10/23/2026"],
            ),
          ],
        },
        {
          instruction:
            'Send Helen the follow-up: subject "Follow-Up: Q3 Contract Renewal Call, Next Steps". Thank her for "today\'s call", state the next step "revised proposal by Friday", and invite corrections with "Please let me know if I missed anything."',
          hint: "With Helen Ward selected, click Email on her card (or Mail › New Email) › subject › thank you, recap, next step, and the correction line › Send.",
          steps: [
            steps.newEmail,
            { action: { kind: "type", target: "compose.to", value: recipients(HELEN.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Follow-Up: Q3 Contract Renewal Call, Next Steps" } },
            mentions(
              "compose.body",
              "Hi Helen, thank you for today's call. Next step: I will send the revised proposal by Friday. Please let me know if I missed anything.",
              ["today's call", "revised proposal by Friday", "Please let me know if I missed anything"],
            ),
            steps.send,
          ],
        },
        {
          instruction: 'Set a reminder that fires before the deadline: create a task "Send revised proposal to Helen Ward" due 10/23/2026 with a reminder on 10/21/2026 at 9:00 AM.',
          hint: "New Items › Task (or Tasks › New Task) › Subject › Due date 10/23/2026 › check Reminder › 10/21/2026, 9:00 AM › Save & Close.",
          steps: [
            steps.newTask,
            { action: { kind: "dialog", id: "task.save", values: { subject: "Send revised proposal to Helen Ward", dueDate: "10/23/2026", reminder: true, reminderDate: "10/21/2026", reminderTime: "9:00 AM" } } },
          ],
        },
        {
          instruction: 'Close the loop on finished work: mark "Send pricing sheet to Helen Ward" complete.',
          hint: "Tasks (Ctrl+4) › select the task › Home tab › Mark Complete.",
          steps: [{ action: { kind: "command", id: "task.complete" }, requires: { selection: "task:t1" }, selectHint: "Go to Tasks and select \"Send pricing sheet to Helen Ward\" first." }],
        },
      ],
    },
  ],

  "module-13::log-client-interaction": [
    {
      id: "mo-m13-log-interaction-outlook-1",
      app: "outlook",
      title: "Log a week of client touchpoints",
      scenario:
        "TOR Tech had four client touchpoints this week: a prospect call, an email thread about a contract revision, an in-person meeting, and a signed agreement. Each type needs a different log entry, and every entry ends with what happens next.",
      fileName: "Contacts",
      minutes: 8,
      initial: base([], {
        module: "people",
        contacts: [
          ...CRM_CONTACTS,
          { id: "c4", name: "Omar Hale", email: OMAR.email, company: "Brightline Dental", jobTitle: "Office Director" },
        ],
      }),
      tasks: [
        {
          instruction:
            'Log the prospect call on Marcus Webb\'s record: type Phone Call, date 10/19/2026, summary "Prospect inquiry about IT support services for 40 users.", next step "Riley to send service proposal", follow-up 10/27/2026.',
          hint: "Select Marcus Webb › Log Activity › Phone Call › Date 10/19/2026 › summary › next step › follow-up date › Save.",
          steps: [
            activityStep(
              "c3",
              { type: "Phone Call", date: "10/19/2026", summary: "Prospect inquiry about IT support services for 40 users.", next: "Riley to send service proposal", due: "10/27/2026" },
              ["Phone Call", "10/19/2026", "IT support", "Follow-up: 10/27/2026"],
            ),
          ],
        },
        {
          instruction: 'Log the email thread on Helen Ward\'s record. Summarize the outcome, not the emails: type Email, summary "Contract revision approved by client; v2.1 to be sent for signature."',
          hint: "Select Helen Ward › Log Activity › Activity type: Email › summary › Save.",
          steps: [activityStep("c1", { type: "Email", date: "10/20/2026", summary: "Contract revision approved by client; v2.1 to be sent for signature." }, ["Email", "revision approved"])],
        },
        {
          instruction:
            'Log the in-person meeting on Tanya Brooks\'s record: type Meeting, summary "Discussed three pricing models; client agreed to the mid-tier plan.", next step "Riley to send the mid-tier quote by Friday".',
          hint: "Select Tanya Brooks › Log Activity › Meeting › summary › next step › Save. Separate what was discussed from what was decided.",
          steps: [
            activityStep("c2", { type: "Meeting", date: "10/20/2026", summary: "Discussed three pricing models; client agreed to the mid-tier plan.", next: "Riley to send the mid-tier quote by Friday" }, ["Meeting", "mid-tier", "Next step: Riley to send"]),
          ],
        },
        {
          instruction: 'Log the signed agreement on Omar Hale\'s record: type Document, summary "TOR Tech Services Agreement v2.1 signed via DocuSign; filed in Clients > Brightline > Contracts."',
          hint: "Select Omar Hale › Log Activity › Document › summary › Save. Name the exact version and where it is filed.",
          steps: [activityStep("c4", { type: "Document", date: "10/20/2026", summary: "TOR Tech Services Agreement v2.1 signed via DocuSign; filed in Clients > Brightline > Contracts." }, ["Document", "v2.1"])],
        },
        {
          instruction:
            'Send Tanya Brooks a meeting recap with the subject "Recap: Pricing Meeting and Next Steps" that recaps the "mid-tier plan", lists the next step "quote by Friday", and ends with "Please let me know if I missed anything."',
          hint: "Select Tanya Brooks › Email (or Mail › New Email) › subject › recap and next step › correction line › Send.",
          steps: [
            steps.newEmail,
            { action: { kind: "type", target: "compose.to", value: recipients(TANYA.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Recap: Pricing Meeting and Next Steps" } },
            mentions(
              "compose.body",
              "Hi Tanya, thank you for meeting with us. You chose the mid-tier plan. Next step: I will send the quote by Friday. Please let me know if I missed anything.",
              ["mid-tier plan", "quote by Friday", "Please let me know if I missed anything"],
            ),
            steps.send,
          ],
        },
      ],
    },
  ],
};
