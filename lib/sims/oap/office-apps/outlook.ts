import type { SimDefinition } from "@/types/sim";
import { outlookDoc } from "@/components/sim/apps/outlook/types";
import type { OlEvent, OlMessage, OutlookDoc } from "@/components/sim/apps/outlook/types";
import { ACCEPT, autoRepliesStep, mentions, msg, person, recipients, signaturesStep } from "@/components/sim/apps/outlook/simkit";

/*
 * Office Productivity Applications, Module 6: Outlook & Integration.
 * Lakeside Medical Associates. Fictional people; example.com-style addresses.
 */

const ME = person("Casey Jordan", "casey.jordan@lakeside.example.com");
const KIM = person("Dr. Rachel Kim", "rachel.kim@lakeside.example.com");
const PATEL = person("Dr. Anil Patel", "anil.patel@lakeside.example.com");
const CHEN = person("Dr. Lisa Chen", "lisa.chen@lakeside.example.com");
const OKAFOR = person("Dr. Emeka Okafor", "emeka.okafor@lakeside.example.com");
const MONICA = person("Monica Reyes", "monica.reyes@lakeside.example.com");
const DEREK = person("Derek Simmons", "derek.simmons@lakeside.example.com");
const PAULA = person("Paula Grant", "paula.grant@lakeside.example.com");
const NGUYEN = person("Dr. Sarah Nguyen", "sarah.nguyen@riversidefp.example.org");
const BLUE = person("BlueCross Authorizations", "auth@bluecross.example.com");
const MARSH = person("Kevin Marsh", "kevin.marsh@auditservices.example.com");
const VENDOR = person("Jen Alvarez", "jen.alvarez@scanpro.example.com");
const SUPPLY = person("MedLine Supply", "billing@medlinesupply.example.com");
const MAILER = person("Medical Supply Monthly", "news@medsupplymonthly.example.com");
const CARLOS = person("Carlos Reyes", "carlos.reyes@example.net");
const MARIA = person("Maria Rodriguez", "maria.rodriguez@example.net");

const STAFF = [KIM, PATEL, CHEN, OKAFOR, MONICA, DEREK, PAULA];

function base(messages: OlMessage[], extra: Partial<OutlookDoc> = {}): Record<string, unknown> {
  return outlookDoc({
    account: ME,
    manager: MONICA,
    now: "2026-10-20T09:30",
    readingPane: "Right",
    directory: [...STAFF, NGUYEN, BLUE],
    contacts: [
      { id: "c1", name: "Dr. Sarah Nguyen", email: NGUYEN.email, company: "Riverside Family Practice", jobTitle: "Physician" },
      { id: "c2", name: "Maria Rodriguez", email: MARIA.email, company: "Patient" },
      { id: "c3", name: "Carlos Reyes", email: CARLOS.email, company: "Patient" },
    ],
    messages,
    ...extra,
  });
}

const CLINIC_EVENTS: OlEvent[] = [
  { id: "e1", title: "Patient appointments (Dr. Patel)", start: "2026-10-22T13:00", end: "2026-10-22T15:00", showAs: "Busy" },
  { id: "e2", title: "Front desk opening", start: "2026-10-20T08:00", end: "2026-10-20T08:30", recurrence: { freq: "daily", weekdays: true } },
  { id: "e3", title: "Provider Huddle", start: "2026-10-19T12:00", end: "2026-10-19T12:30", meeting: true, organizer: MONICA, required: [ME, PATEL, CHEN, OKAFOR], recurrence: { freq: "weekly", days: [1] }, location: "Break Room", response: "Accepted" },
  { id: "e4", title: "Lunch and Learn: HIPAA refresher", start: "2026-10-22T12:00", end: "2026-10-22T13:00", location: "Conference Room B" },
];

export const outlookSims: Record<string, SimDefinition[]> = {
  /* ---------------------------------------------------------------- */
  "module-6::intro-to-outlook-2019": [
    {
      id: "oa-m6-intro-outlook-1",
      app: "outlook",
      title: "Set up Outlook for the Lakeside front desk",
      scenario:
        "It is your first morning managing communications at Lakeside Medical Associates. Before the first patient message needs an answer, set up the window so you can scan email fast, create the practice's two signatures, and find your way between Mail and Calendar.",
      fileName: "Inbox",
      minutes: 7,
      initial: base(
        [
          msg("m1", MONICA, "Welcome aboard", "Hi Casey,\n\nWelcome to Lakeside! Please set up your External and Internal signatures this morning. The practice address is 123 Lakeview Drive, Suite 200.\n\nMonica", "2026-10-20T08:02", { to: [ME] }),
          msg("m2", DEREK, "Billing calendar for November", "Casey, the November billing calendar is posted in the shared drive.", "2026-10-20T07:41", { to: [ME], read: true }),
          msg("m3", person("Lakeside IT", "it@lakeside.example.com"), "Lakeside staff portal password reset", "Your staff portal password reset link is ready. It expires at 5:00 PM today.", "2026-10-20T07:30", { to: [ME], other: true }),
          msg("m4", MAILER, "Medical Supply Monthly: October deals", "Save on exam table paper and gloves this month.", "2026-10-19T06:00", { to: [ME], other: true }),
        ],
        { readingPane: "Bottom", focused: false, events: CLINIC_EVENTS },
      ),
      tasks: [
        {
          instruction: "Show the Reading Pane on the right side of the window.",
          hint: "View tab › Layout group › Reading Pane › Right.",
          steps: [{ action: { kind: "command", id: "view.readingPane", value: "Right" } }],
        },
        {
          instruction: "Turn on the Focused Inbox.",
          hint: "View tab › Messages group › Show Focused Inbox.",
          steps: [{ action: { kind: "command", id: "view.focusedInbox" } }],
        },
        {
          instruction:
            'Create a signature named "Lakeside Medical - External" that reads "Casey Jordan, Office Assistant, Lakeside Medical Associates, 123 Lakeview Drive, Suite 200, (555) 234-5678", and make it the default for new messages.',
          hint: "File tab › Options › Mail › Signatures... › New › type the name › OK › type the signature › New messages: Lakeside Medical - External › OK.",
          steps: [
            signaturesStep(
              { sigs: [{ name: "Lakeside Medical - External", text: "Casey Jordan, Office Assistant, Lakeside Medical Associates, 123 Lakeview Drive, Suite 200, (555) 234-5678" }], defNew: "Lakeside Medical - External" },
              ["[Lakeside Medical - External]", "Casey Jordan", "Office Assistant", "Lakeside Medical Associates", "New messages: Lakeside Medical - External"],
            ),
          ],
        },
        {
          instruction: 'Create a second signature named "Lakeside Medical - Internal" that reads "Casey Jordan, Office Assistant, ext. 214", and make it the default for replies and forwards.',
          hint: "File tab › Options › Mail › Signatures... › New › type the name › OK › type the signature › Replies/forwards: Lakeside Medical - Internal › OK.",
          steps: [
            signaturesStep(
              {
                sigs: [
                  { name: "Lakeside Medical - External", text: "Casey Jordan, Office Assistant, Lakeside Medical Associates, 123 Lakeview Drive, Suite 200, (555) 234-5678" },
                  { name: "Lakeside Medical - Internal", text: "Casey Jordan, Office Assistant, ext. 214" },
                ],
                defNew: "Lakeside Medical - External",
                defReply: "Lakeside Medical - Internal",
              },
              ["[Lakeside Medical - Internal]", "ext. 214", "Replies/forwards: Lakeside Medical - Internal"],
            ),
          ],
        },
        {
          instruction: 'Reply to Monica Reyes\'s message "Welcome aboard" with "Thank you, Monica. Both signatures are set up." Your Internal signature should appear on its own.',
          hint: "Select the message › Home tab › Respond group › Reply (Ctrl+R). Type above the signature and click Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m1" }, selectHint: "Select Monica Reyes's message \"Welcome aboard\" first." },
            mentions("compose.body", "Thank you, Monica. Both signatures are set up.", ["Both signatures are set up"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Open the Other tab of the Focused Inbox and move "Lakeside staff portal password reset" to Focused so you do not miss it.',
          hint: "Click Other above the message list › right-click the message › Move to Focused.",
          steps: [{ action: { kind: "command", id: "mail.moveToFocused" }, requires: { selection: "msg:m3" }, selectHint: "Click the Other tab, then select the message \"Lakeside staff portal password reset\"." }],
        },
        {
          instruction: "Switch to the Calendar to check today's schedule.",
          hint: "Click Calendar in the Navigation Bar at the bottom of the Folder Pane (or press Ctrl+2).",
          steps: [{ action: { kind: "command", id: "nav.module", value: "Calendar" } }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  "module-6::email-management-outlook": [
    {
      id: "oa-m6-email-management-outlook-1",
      app: "outlook",
      title: "Compose with the right fields: To, Cc, Bcc, and attachments",
      scenario:
        "It is 9:00 AM at Lakeside Medical Associates. A referring physician is waiting on a records request, the flu clinic reminder has to go to fifty patients without exposing their addresses, and two messages need the right people in the loop.",
      fileName: "Inbox",
      minutes: 7,
      initial: base(
        [
          msg("m1", BLUE, "Prior authorization approved: Rodriguez", "Prior authorization #PA-77120 for Maria Rodriguez is approved through 01/31/2027.", "2026-10-20T08:44", { to: [ME], external: true }),
          msg("m2", PATEL, "Lab results needed today", "Casey, are the Henderson lab results in the chart yet? I need them before my 11:00 AM.\n\nDr. Patel", "2026-10-20T09:05", { to: [ME] }),
          msg("m3", MONICA, "Flu clinic reminder", "Please send the flu clinic reminder to the Flu Clinic Patients group today. Do not let patients see each other's addresses.", "2026-10-20T08:15", { to: [ME], read: true }),
        ],
        {
          files: [{ name: "Referral Request Form.docx", size: "44 KB" }, { name: "Referral Request Form OLD.docx", size: "40 KB" }, { name: "Scan0042.pdf", size: "220 KB" }],
          groups: [{ id: "g1", name: "Flu Clinic Patients", members: [MARIA.email, CARLOS.email, "james.whitfield@example.net", "ana.silva@example.net"] }],
        },
      ),
      tasks: [
        {
          instruction:
            'Create a new message to Dr. Sarah Nguyen. Attach "Referral Request Form.docx", use the subject "Referral Follow-Up: Records Request for James Whitfield", and begin with "Dear Dr. Nguyen, I am writing to request the medical records for James Whitfield before his November 12 procedure." Then send it.',
          hint: "Home tab › New Email (Ctrl+N) › Message tab › Attach File › Browse This PC... › Referral Request Form.docx › Insert. Fill in To, Subject, and the text, then click Send.",
          steps: [
            { action: { kind: "command", id: "mail.newEmail" }, alt: [{ kind: "command", id: "item.new" }] },
            { action: { kind: "dialog", id: "attachFile", values: { file: "Referral Request Form.docx" } } },
            { action: { kind: "type", target: "compose.to", value: recipients(NGUYEN.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Referral Follow-Up: Records Request for James Whitfield" } },
            mentions("compose.body", "Dear Dr. Nguyen, I am writing to request the medical records for James Whitfield before his November 12 procedure.", ["Dear Dr. Nguyen", "medical records", "November 12"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction:
            'Send the flu clinic reminder so patients cannot see each other\'s addresses: To yourself, the "Flu Clinic Patients" contact group in Bcc, subject "Reminder: Flu Shot Clinic on Saturday, October 24", and the text "Walk-ins are welcome from 9:00 AM to 12:00 PM."',
          hint: "New Email › Options tab › Show Fields › Bcc. Put your own address in To and the group in Bcc, type the subject and text, then click Send.",
          steps: [
            { action: { kind: "command", id: "mail.newEmail" }, alt: [{ kind: "command", id: "item.new" }] },
            { action: { kind: "type", target: "compose.to", value: recipients(ME.email) } },
            { action: { kind: "type", target: "compose.bcc", value: recipients("Flu Clinic Patients") } },
            { action: { kind: "type", target: "compose.subject", value: "Reminder: Flu Shot Clinic on Saturday, October 24" } },
            mentions("compose.body", "Walk-ins are welcome from 9:00 AM to 12:00 PM.", ["Walk-ins are welcome"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Forward "Prior authorization approved: Rodriguez" to Derek Simmons, the billing coordinator, with the note "Derek, please file this approval with the claim."',
          hint: "Select the message › Home tab › Respond group › Forward (Ctrl+F) › type Derek in To › type the note › Send.",
          steps: [
            { action: { kind: "command", id: "mail.forward" }, requires: { selection: "msg:m1" }, selectHint: "Select the BlueCross message \"Prior authorization approved: Rodriguez\" first." },
            { action: { kind: "type", target: "compose.to", value: recipients(DEREK.email) } },
            mentions("compose.body", "Derek, please file this approval with the claim.", ["file this approval"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: 'Dr. Patel needs an answer before his 11:00 AM. Reply to "Lab results needed today" with "The Henderson lab results are in the chart now.", and mark your reply High Importance.',
          hint: "Select the message › Reply (Ctrl+R) › Message tab › Tags group › High Importance › type the text › Send. Save High Importance for messages that really are urgent.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m2" }, selectHint: "Select Dr. Patel's message \"Lab results needed today\" first." },
            { action: { kind: "command", id: "message.importanceHigh" } },
            mentions("compose.body", "The Henderson lab results are in the chart now.", ["lab results are in the chart"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
      ],
    },
    {
      id: "oa-m6-email-management-outlook-2",
      app: "outlook",
      title: "Process the morning inbox with folders, Quick Steps, and rules",
      scenario:
        "Twenty-three messages arrived overnight. Appointment requests, insurance authorizations, invoices, and newsletters are all mixed together. Build the tools that sort them: a subfolder, a Quick Step, and a rule, then clear what is left.",
      fileName: "Inbox",
      minutes: 8,
      initial: base(
        [
          msg("m1", CARLOS, "Appointment request: Carlos Reyes", "I would like to schedule a follow-up visit next week, any morning.", "2026-10-20T08:51", { to: [ME], external: true }),
          msg("m2", BLUE, "Authorization request received: Silva", "We received your authorization request for Ana Silva. A decision is due in 3 business days.", "2026-10-20T08:20", { to: [ME], external: true }),
          msg("m3", BLUE, "Auth Request update: Whitfield", "The authorization for James Whitfield needs additional documentation.", "2026-10-20T07:45", { to: [ME], external: true }),
          msg("m4", SUPPLY, "Supply invoice due Friday", "Invoice #2231 for $1,284.50 is due Friday, October 23.", "2026-10-20T07:10", { to: [ME], external: true, attachments: [{ name: "Invoice_2231.pdf", size: "96 KB" }] }),
          msg("m5", MAILER, "Medical Supply Monthly: October deals", "Save on exam table paper and gloves this month.", "2026-10-20T06:00", { to: [ME] }),
          msg("m6", MARIA, "RE: Appointment request for next week", "Thursday at 10:00 AM works for me. Thank you!", "2026-10-19T17:30", { to: [ME], conversation: "maria-appt", external: true }),
          msg("m7", MARIA, "Appointment request for next week", "Can I come in next week for my blood pressure check?", "2026-10-19T10:02", { to: [ME], conversation: "maria-appt", external: true, read: true }),
        ],
        {
          folders: [
            { id: "f-appointments", name: "Appointments", parent: "inbox" },
            { id: "f-insurance", name: "Insurance", parent: "inbox" },
            { id: "f-billing", name: "Billing", parent: "inbox" },
            { id: "f-vendors", name: "Vendors", parent: "inbox" },
          ],
        },
      ),
      tasks: [
        {
          instruction: 'Create a folder named "Pending Authorization" inside the Insurance folder.',
          hint: "Right-click Insurance in the Folder Pane › New Folder... and type the name. Or Folder tab › New Folder › Name: Pending Authorization › select Insurance › OK.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Pending Authorization", parent: "Insurance" } } }],
        },
        {
          instruction: 'Create a Quick Step named "File as Appointment" that marks a message as read and then moves it to the Appointments folder.',
          hint: "Home tab › Quick Steps › Create New (or click the Quick Steps launcher). Name: File as Appointment › Action: Mark as read › next Action: Move to folder, Appointments › Finish.",
          steps: [
            {
              action: { kind: "dialog", id: "quickStep", values: { name: "File as Appointment", action1: "Mark as read", action2: "Move to folder", target2: "Appointments" } },
              alt: [{ kind: "dialog", id: "quickStep", values: { name: "File as Appointment", action1: "Move to folder", target1: "Appointments", action2: "Mark as read" } }],
            },
          ],
        },
        {
          instruction: 'Use your new File as Appointment Quick Step on the message "Appointment request: Carlos Reyes".',
          hint: "Right-click the message › Quick Steps › File as Appointment.",
          steps: [{ action: { kind: "command", id: "home.quickStep", value: "File as Appointment" }, requires: { selection: "msg:m1" }, selectHint: "Select Carlos Reyes's appointment request first." }],
        },
        {
          instruction: 'Create a rule that moves any message whose subject contains "Auth" to the Pending Authorization folder, and run it now on the Inbox.',
          hint: "Home tab › Move group › Rules › Create Rule... › check Subject contains and type Auth › check Move the item to folder › Pending Authorization › check Run this rule now › OK.",
          steps: [{ action: { kind: "dialog", id: "createRule", values: { subjectOn: true, subject: "Auth", moveOn: true, folder: "Pending Authorization", runNow: true } } }],
        },
        {
          instruction: 'Flag "Supply invoice due Friday" for follow-up this week so Monica sees it before Friday.',
          hint: "Select the message › Home tab › Tags group › Follow Up › This Week.",
          steps: [{ action: { kind: "command", id: "item.followUp", value: "This Week" }, requires: { selection: "msg:m4" }, selectHint: "Select the MedLine Supply invoice message first." }],
        },
        {
          instruction: "Group related messages together by showing the Inbox as conversations.",
          hint: "View tab › Messages group › Show as Conversations.",
          steps: [{ action: { kind: "command", id: "view.conversations" } }],
        },
        {
          instruction: 'Delete the newsletter "Medical Supply Monthly: October deals".',
          hint: "Select the message and press Delete, or Home tab › Delete group › Delete.",
          steps: [{ action: { kind: "command", id: "item.delete" }, requires: { selection: "msg:m5" }, selectHint: "Select the newsletter first." }],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  "module-6::calendar-and-meetings-outlook": [
    {
      id: "oa-m6-calendar-meetings-outlook-1",
      app: "outlook",
      title: "Schedule the providers' meeting with the Scheduling Assistant",
      scenario:
        "Your supervisor is traveling and you are running the clinic schedule. Set up the weekly supply reminder, find a time when all three providers are free next Tuesday, and answer two meeting requests waiting in the Inbox.",
      fileName: "Calendar",
      minutes: 8,
      initial: base(
        [
          msg("m1", MARSH, "Insurance audit preparation", "Please join a 30-minute call to prepare for the November audit.", "2026-10-20T08:10", {
            to: [ME],
            external: true,
            invite: { title: "Insurance audit preparation", start: "2026-10-21T10:00", end: "2026-10-21T10:30", location: "Microsoft Teams Meeting", organizer: MARSH, required: [ME], teams: true },
          }),
          msg("m2", VENDOR, "Vendor demo: new EHR scanner", "We would love to show the team our new document scanner.", "2026-10-20T07:40", {
            to: [ME],
            external: true,
            invite: { title: "Vendor demo: new EHR scanner", start: "2026-10-22T13:30", end: "2026-10-22T14:00", location: "Front Office", organizer: VENDOR, required: [ME] },
          }),
        ],
        {
          module: "calendar",
          calView: "Day",
          calDate: "2026-10-20",
          events: CLINIC_EVENTS,
          freeBusy: {
            [PATEL.email]: [{ start: "2026-10-27T08:00", end: "2026-10-27T09:00", title: "Hospital rounds" }, { start: "2026-10-27T11:00", end: "2026-10-27T12:00" }],
            [CHEN.email]: [{ start: "2026-10-27T09:00", end: "2026-10-27T10:00" }, { start: "2026-10-27T13:00", end: "2026-10-27T15:00" }],
            [OKAFOR.email]: [{ start: "2026-10-27T08:30", end: "2026-10-27T09:30" }, { start: "2026-10-27T10:30", end: "2026-10-27T11:00", status: "Tentative" }],
            [MONICA.email]: [{ start: "2026-10-27T14:00", end: "2026-10-27T15:00", status: "Out of Office" }],
          },
        },
      ),
      tasks: [
        {
          instruction: "Switch the calendar to Work Week view.",
          hint: "Home tab › Arrange group › Work Week (or Ctrl+Alt+2).",
          steps: [{ action: { kind: "command", id: "cal.view", value: "Work Week" } }],
        },
        {
          instruction: 'Create an appointment titled "Submit Weekly Supply Order" on Friday, October 23 from 2:00 PM to 2:30 PM with a 30-minute reminder, repeating every Friday.',
          hint: "Home tab › New Appointment (Ctrl+N). Type the title, set the date and times, Appointment tab › Options › Reminder: 30 minutes › Recurrence › Weekly, Friday › OK › Save & Close.",
          steps: [
            { action: { kind: "command", id: "cal.newAppointment" }, alt: [{ kind: "command", id: "item.new" }] },
            { action: { kind: "dialog", id: "event.save", values: { title: "Submit Weekly Supply Order", startDate: "10/23/2026", startTime: "2:00 PM", endTime: "2:30 PM", reminder: "30 minutes", recurrence: "Weekly on Friday" } } },
          ],
        },
        {
          instruction:
            'Schedule a meeting titled "Monthly Provider Staff Meeting" in "Conference Room A" on Tuesday, October 27. Invite Dr. Patel, Dr. Chen, and Dr. Okafor as required and Monica Reyes as optional. Add the agenda "1. Patient volume 2. Flu clinic staffing". Use the Scheduling Assistant to choose the first 30-minute time when all three providers are free, then send it.',
          hint: "Home tab › New Meeting. Add the doctors in Required and Monica in Optional. Click Scheduling Assistant to see busy times, click the first open half hour (or a Suggested time with no conflicts), then go back to Meeting, type the title, location, and agenda, and click Send.",
          steps: [
            { action: { kind: "command", id: "cal.newMeeting" } },
            { action: { kind: "type", target: "event.required", value: recipients(PATEL.email, CHEN.email, OKAFOR.email) } },
            { action: { kind: "type", target: "event.optional", value: recipients(MONICA.email) } },
            mentions("event.body", "1. Patient volume 2. Flu clinic staffing", ["Patient volume", "Flu clinic staffing"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "Monthly Provider Staff Meeting", location: "Conference Room A", startDate: "10/27/2026", startTime: "10:00 AM", endTime: "10:30 AM" } } },
          ],
        },
        {
          instruction: 'Accept the meeting request "Insurance audit preparation" from Kevin Marsh.',
          hint: "Go to Mail (Ctrl+1) › select the request › click Accept in the message (or Meeting tab › Accept) › Send the Response Now.",
          steps: [{ action: { kind: "command", id: "invite.respond", value: ACCEPT }, requires: { selection: "msg:m1" }, selectHint: "Open Mail and select the meeting request \"Insurance audit preparation\" first." }],
        },
        {
          instruction: 'The request "Vendor demo: new EHR scanner" conflicts with Dr. Patel\'s patient block. Tentatively accept it and propose 3:00 PM to 3:30 PM the same day instead, then send the proposal.',
          hint: "Select the request › Propose New Time › Tentative and Propose New Time... › set 3:00 PM to 3:30 PM › Propose Time › Send.",
          steps: [
            { action: { kind: "dialog", id: "proposeTime", values: { start: "3:00 PM", end: "3:30 PM" } }, requires: { selection: "msg:m2" }, selectHint: "Select the meeting request \"Vendor demo: new EHR scanner\" first." },
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: "Share your calendar with Monica Reyes so she can see all details of your appointments.",
          hint: "Calendar › Home tab › Share group › Share Calendar › type monica.reyes@lakeside.example.com › Permission: Can view all details › OK.",
          steps: [{ action: { kind: "dialog", id: "shareCalendar", values: { person: [MONICA.email, "Monica Reyes"], permission: "Can view all details" } } }],
        },
      ],
    },
    {
      id: "oa-m6-calendar-meetings-outlook-2",
      app: "outlook",
      title: "Recurring meetings, changes, and an out of office reply",
      scenario:
        "Next you set up the billing review and a weekly supply check-in, adjust two items on the calendar, and turn on an automatic reply for the two days you will be at a training.",
      fileName: "Calendar",
      minutes: 8,
      initial: base([msg("m1", MONICA, "Calendar to-dos", "Billing review with Derek and me, Friday supply check-in with Paula, and please move the HIPAA lunch and learn to Friday.", "2026-10-20T08:30", { to: [ME] })], {
        module: "calendar",
        calView: "Work Week",
        calDate: "2026-10-26",
        events: CLINIC_EVENTS,
      }),
      tasks: [
        {
          instruction:
            'Schedule a 60-minute meeting titled "Quarterly Billing Review" on Wednesday, November 4 at 9:00 AM with Monica Reyes and Derek Simmons as required attendees and the agenda "Review denied claims and payer trends." Then send it.',
          hint: "Home tab › New Meeting › Required: Monica Reyes; Derek Simmons › type the title › Start 11/4/2026 9:00 AM, End 10:00 AM › type the agenda › Send.",
          steps: [
            { action: { kind: "command", id: "cal.newMeeting" } },
            { action: { kind: "type", target: "event.required", value: recipients(MONICA.email, DEREK.email) } },
            mentions("event.body", "Review denied claims and payer trends.", ["denied claims"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "Quarterly Billing Review", startDate: "11/4/2026", startTime: "9:00 AM", endTime: "10:00 AM" } } },
          ],
        },
        {
          instruction: 'Set up a recurring 15-minute meeting titled "Friday Supply Check-In" with Paula Grant every Friday at 11:00 AM, starting Friday, October 23.',
          hint: "New Meeting › Required: Paula Grant › title › Start 10/23/2026 11:00 AM, End 11:15 AM › Meeting tab › Recurrence › Weekly, Friday › OK › Send.",
          steps: [
            { action: { kind: "command", id: "cal.newMeeting" } },
            { action: { kind: "type", target: "event.required", value: recipients(PAULA.email) } },
            { action: { kind: "dialog", id: "event.save", values: { title: "Friday Supply Check-In", startDate: "10/23/2026", startTime: "11:00 AM", endTime: "11:15 AM", recurrence: "Weekly on Friday" } } },
          ],
        },
        {
          instruction: 'Move the appointment "Lunch and Learn: HIPAA refresher" from Thursday to Friday, October 23 at 12:00 PM.',
          hint: "Go back one week (the arrow next to the dates) › drag the appointment to Friday at 12:00 PM. Or double-click it, change the start date to 10/23/2026, and click Save & Close.",
          steps: [
            {
              action: { kind: "command", id: "event.move", value: "10/23/2026 12:00 PM" },
              alt: [{ kind: "dialog", id: "event.save", values: { startDate: "10/23/2026", startTime: "12:00 PM" } }],
              requires: { selection: "evt:e4" },
              selectHint: "Click the appointment \"Lunch and Learn: HIPAA refresher\" on Thursday, October 22 first.",
            },
          ],
        },
        {
          instruction: 'Monday, October 26 is a holiday. Delete only that day\'s occurrence of the weekly "Provider Huddle" and keep the rest of the series.',
          hint: "Click the October 26 Provider Huddle › Meeting Occurrence tab › Delete › Delete Occurrence (or press Delete and choose Delete this occurrence).",
          steps: [{ action: { kind: "command", id: "item.delete", value: "Delete Occurrence" }, requires: { selection: "evt:e3@2026-10-26" }, selectHint: "Click the Provider Huddle on Monday, October 26 first." }],
        },
        {
          instruction:
            'You will be at training Thursday and Friday. Turn on automatic replies only from 10/22/2026 8:00 AM to 10/23/2026 5:00 PM with the message "I am out of the office Thursday and Friday. For scheduling help, call the front desk at (555) 234-5678."',
          hint: "File tab › Info › Automatic Replies › Send automatic replies › Only send during this time range › set the dates and times › type the message › OK.",
          steps: [
            autoRepliesStep(
              { start: ["10/22/2026", "8:00 AM"], end: ["10/23/2026", "5:00 PM"], inside: "I am out of the office Thursday and Friday. For scheduling help, call the front desk at (555) 234-5678." },
              ["Send automatic replies", "Time range: 10/22/2026 8:00 AM to 10/23/2026 5:00 PM", "(555) 234-5678"],
            ),
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  "module-6::working-across-office-apps": [
    {
      id: "oa-m6-working-across-apps-outlook-1",
      app: "outlook",
      title: "Deliver the monthly operations package from Outlook",
      scenario:
        "The Word report and PowerPoint summary are finished, and the Excel dashboard lives on OneDrive. Your last steps happen in Outlook: send the package to the physician owner with the right attachments and a link, share your calendar, and set up the review meeting with an agenda.",
      fileName: "Inbox",
      minutes: 7,
      initial: base([msg("m1", KIM, "Operations package", "Casey, please send me the May operations package and set up 30 minutes to review it with Monica next week.", "2026-10-20T08:12", { to: [ME] })], {
        files: [
          { name: "Monthly Report - May 2026 - Lakeside Medical.pdf", size: "412 KB" },
          { name: "Monthly Summary - May 2026 - Lakeside Medical.pptx", size: "1.8 MB" },
          { name: "Expense Dashboard - May 2026.xlsx", size: "96 KB", location: "OneDrive", cloud: true },
          { name: "Monthly Report - May 2026 - Lakeside Medical.docx", size: "88 KB" },
        ],
        events: CLINIC_EVENTS,
        freeBusy: { [KIM.email]: [{ start: "2026-10-27T09:00", end: "2026-10-27T12:00" }], [MONICA.email]: [{ start: "2026-10-27T13:00", end: "2026-10-27T14:00" }] },
      }),
      tasks: [
        {
          instruction:
            'Start a new message to Dr. Rachel Kim and attach the PDF "Monthly Report - May 2026 - Lakeside Medical.pdf" and the PowerPoint "Monthly Summary - May 2026 - Lakeside Medical.pptx". Do not send it yet.',
          hint: "Home tab › New Email › Message tab › Include group › Attach File › Browse This PC... › pick the PDF › Insert. Repeat for the PowerPoint.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "mail.newEmail" }, alt: [{ kind: "command", id: "item.new" }] },
            { action: { kind: "dialog", id: "attachFile", values: { file: "Monthly Report - May 2026 - Lakeside Medical.pdf" } } },
            { action: { kind: "dialog", id: "attachFile", values: { file: "Monthly Summary - May 2026 - Lakeside Medical.pptx" } } },
          ],
        },
        {
          instruction: 'Add the Excel dashboard "Expense Dashboard - May 2026.xlsx" from OneDrive as a share link, not a copy, so Dr. Kim always sees the current numbers.',
          hint: "Message tab › Attach File › Browse Web Locations... › Expense Dashboard - May 2026.xlsx › How do you want to attach this file? Share link › Insert.",
          steps: [{ action: { kind: "dialog", id: "attachFile", values: { file: "Expense Dashboard - May 2026.xlsx", attachAs: "Share link" } } }],
        },
        {
          instruction:
            'Finish the message: To Dr. Rachel Kim, subject "Monthly Operations Report: May 2026, Please Review Before June 1", and the text "Dear Dr. Kim, the May report and summary slides are attached, and the live expense dashboard is linked." Then send it.',
          hint: "Type Dr. Kim's name in To and pick her, type the subject and the text, and click Send.",
          steps: [
            { action: { kind: "type", target: "compose.to", value: recipients(KIM.email) } },
            { action: { kind: "type", target: "compose.subject", value: "Monthly Operations Report: May 2026, Please Review Before June 1" } },
            mentions("compose.body", "Dear Dr. Kim, the May report and summary slides are attached, and the live expense dashboard is linked.", ["Dear Dr. Kim", "attached", "dashboard"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: "Share your calendar with Dr. Rachel Kim so she can see titles and locations of your appointments.",
          hint: "Calendar (Ctrl+2) › Home tab › Share group › Share Calendar › type rachel.kim@lakeside.example.com › Permission: Can view titles and locations › OK.",
          steps: [{ action: { kind: "dialog", id: "shareCalendar", values: { person: [KIM.email, "Dr. Rachel Kim"], permission: "Can view titles and locations" } } }],
        },
        {
          instruction:
            'Send a meeting titled "May Operations Report Review" to Dr. Kim and Monica Reyes on Tuesday, October 27 from 2:00 PM to 2:30 PM in "Conference Room A", with the agenda "1. Expense trends 2. June priorities".',
          hint: "Calendar › Home tab › New Meeting › Required: Dr. Rachel Kim; Monica Reyes › title, location, date, and times › type the agenda › Send. The Scheduling Assistant shows that 2:00 PM is open for both.",
          steps: [
            { action: { kind: "command", id: "cal.newMeeting" } },
            { action: { kind: "type", target: "event.required", value: recipients(KIM.email, MONICA.email) } },
            mentions("event.body", "1. Expense trends 2. June priorities", ["Expense trends", "June priorities"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "May Operations Report Review", location: "Conference Room A", startDate: "10/27/2026", startTime: "2:00 PM", endTime: "2:30 PM" } } },
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  "module-6::outlook-integration-capstone": [
    {
      id: "oa-m6-capstone-outlook-1",
      app: "outlook",
      title: "Capstone: report email, review meeting, and a Quick Step",
      scenario:
        "The clinic director, Dr. Kim, asked for the monthly appointment activity report, a review meeting next Thursday, and a way to file her replies automatically. The Excel, Word, and PowerPoint files are done. Finish the Outlook side of the workflow.",
      fileName: "Inbox",
      minutes: 8,
      initial: base(
        [
          msg("m1", KIM, "Appointment activity report", "Casey, please send the May appointment activity report and book 45 minutes with me next Thursday morning.", "2026-10-20T08:12", { to: [ME] }),
          msg("m2", KIM, "RE: Appointment activity report", "Thanks Casey. I will review it before Thursday.\n\nDr. Kim", "2026-10-19T17:22", { to: [ME] }),
        ],
        {
          files: [
            { name: "Monthly Appointment Activity Report - May 2026.pdf", size: "502 KB" },
            { name: "Appointment Summary - May 2026.pptx", size: "1.6 MB" },
            { name: "Appointment Summary - May 2026 - Lakeside Medical.xlsx", size: "120 KB", location: "OneDrive", cloud: true },
          ],
          events: CLINIC_EVENTS,
          freeBusy: { [KIM.email]: [{ start: "2026-10-29T08:00", end: "2026-10-29T10:00", title: "Board call" }, { start: "2026-10-29T11:00", end: "2026-10-29T12:00" }] },
        },
      ),
      tasks: [
        {
          instruction: 'Start a new message and attach both "Monthly Appointment Activity Report - May 2026.pdf" and "Appointment Summary - May 2026.pptx". Do not send it yet.',
          hint: "Home tab › New Email › Message tab › Include group › Attach File › Browse This PC... (once for each file).",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "mail.newEmail" }, alt: [{ kind: "command", id: "item.new" }] },
            { action: { kind: "dialog", id: "attachFile", values: { file: "Monthly Appointment Activity Report - May 2026.pdf" } } },
            { action: { kind: "dialog", id: "attachFile", values: { file: "Appointment Summary - May 2026.pptx" } } },
          ],
        },
        {
          instruction:
            'Address the message to Dr. Rachel Kim, use the subject "May 2026 Appointment Activity Report: Please Review Before Thursday", type "Dear Dr. Kim, the May report and summary slides are attached for your review.", and send it.',
          hint: "Type Dr. Kim in To and pick her, type the subject and the text, and click Send. Leave Importance at Normal.",
          steps: [
            { action: { kind: "type", target: "compose.to", value: recipients(KIM.email) } },
            { action: { kind: "type", target: "compose.subject", value: "May 2026 Appointment Activity Report: Please Review Before Thursday" } },
            mentions("compose.body", "Dear Dr. Kim, the May report and summary slides are attached for your review.", ["Dear Dr. Kim", "attached"]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction:
            'Create a 45-minute meeting titled "Monthly Activity Report Review - May 2026" with Dr. Kim next Thursday, October 29, at 10:00 AM with a 15-minute reminder and the agenda "1. Volume by provider 2. Revenue 3. June goals". Check the Scheduling Assistant first, then send it.',
          hint: "Calendar › New Meeting › Required: Dr. Rachel Kim › Scheduling Assistant shows 10:00 AM is open › title › Start 10/29/2026 10:00 AM, End 10:45 AM › Reminder: 15 minutes › agenda › Send.",
          steps: [
            { action: { kind: "command", id: "cal.newMeeting" } },
            { action: { kind: "type", target: "event.required", value: recipients(KIM.email) } },
            mentions("event.body", "1. Volume by provider 2. Revenue 3. June goals", ["Volume by provider", "Revenue", "June goals"]),
            { action: { kind: "dialog", id: "event.save", values: { title: "Monthly Activity Report Review - May 2026", startDate: "10/29/2026", startTime: "10:00 AM", endTime: "10:45 AM", reminder: "15 minutes" } } },
          ],
        },
        {
          instruction: 'Create a folder named "Director Communications" inside the Inbox.',
          hint: "Right-click Inbox › New Folder... (or Folder tab › New Folder) › Director Communications.",
          steps: [{ action: { kind: "dialog", id: "newFolder", values: { name: "Director Communications", parent: "Inbox" } } }],
        },
        {
          instruction: 'Create a Quick Step named "File Director Reply" that flags the message for follow-up today, moves it to Director Communications, and marks it as read, in that order.',
          hint: "Home tab › Quick Steps › Create New. Name: File Director Reply › Action: Flag message, Today › Move to folder, Director Communications › Mark as read › Finish.",
          steps: [
            {
              action: {
                kind: "dialog",
                id: "quickStep",
                values: { name: "File Director Reply", action1: "Flag message", target1: "Today", action2: "Move to folder", target2: "Director Communications", action3: "Mark as read" },
              },
            },
          ],
        },
        {
          instruction: 'Run the File Director Reply Quick Step on Dr. Kim\'s message "RE: Appointment activity report".',
          hint: "Right-click the message › Quick Steps › File Director Reply.",
          steps: [{ action: { kind: "command", id: "home.quickStep", value: "File Director Reply" }, requires: { selection: "msg:m2" }, selectHint: "Select Dr. Kim's reply \"RE: Appointment activity report\" first." }],
        },
      ],
    },
  ],
};
