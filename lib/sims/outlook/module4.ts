import type { SimDefinition, SimStep } from "@/types/sim";
import type { OlEvent } from "@/components/sim/apps/outlook/types";
import { ACCEPT, TENTATIVE, msg, recipients } from "@/components/sim/apps/outlook/simkit";
import { BRIGHT, DENISE, HILL, KEISHA, ME, OMAR, PATEL, PRIYA, lakeside } from "./fixtures";

/* Module 4: Calendar and Meetings (new Outlook for Windows). "Today" is Tuesday, October 20, 2026. */

const WEEK: OlEvent[] = [
  { id: "e1", title: "Provider schedule review", start: "2026-10-20T12:00", end: "2026-10-20T12:30", meeting: true, organizer: DENISE, required: [ME, PATEL, HILL], location: "Conference room", response: "Accepted" },
  { id: "e2", title: "Supply delivery window", start: "2026-10-22T10:00", end: "2026-10-22T11:00", location: "Back entrance" },
  { id: "e3", title: "Lunch and learn: phone etiquette", start: "2026-10-21T12:00", end: "2026-10-21T13:00", location: "Break room" },
  { id: "e4", title: "Front desk coverage", start: "2026-10-21T10:00", end: "2026-10-21T12:00", location: "Front desk" },
];

const NEXT_WEEK: OlEvent[] = [
  { id: "e1", title: "Vendor demo: check-in kiosk", start: "2026-10-28T14:00", end: "2026-10-28T15:00", meeting: true, organizer: ME, required: [OMAR, DENISE], location: "Front desk" },
  { id: "e2", title: "Billing workflow check-in", start: "2026-10-27T09:00", end: "2026-10-27T09:30", meeting: true, organizer: ME, required: [KEISHA], location: "Billing office" },
  { id: "e3", title: "Provider schedule review", start: "2026-10-27T12:00", end: "2026-10-27T12:30", meeting: true, organizer: DENISE, required: [ME, PATEL, HILL], location: "Conference room", response: "Accepted" },
];

const PACIFIC = "(UTC-08:00) Pacific Time (US & Canada)";

/** New Outlook has one New event button; adding attendees makes it a meeting. Opening a form is free. */
const NEW_EVENT: Pick<SimStep, "action" | "alt"> = {
  action: { kind: "command", id: "cal.newAppointment" },
  alt: [{ kind: "command", id: "item.new" }, { kind: "command", id: "cal.newTeamsMeeting" }, { kind: "command", id: "cal.newMeeting" }],
};

export const outlookModule4Sims: Record<string, SimDefinition[]> = {
  "module-4::calendar-basics": [
    {
      id: "ol-m4-calendar-basics-1",
      app: "outlook-new",
      title: "Set up the front desk week",
      scenario:
        "Denise wants the front desk calendar to show what is really happening this week: the Saturday flu clinic setup, Dr. Hill's day out, and a delivery that moved. Get the calendar right so anyone who checks it can trust it.",
      fileName: "Calendar",
      minutes: 7,
      initial: lakeside([], { module: "calendar", calView: "Work Week", calDate: "2026-10-20", events: WEEK }),
      tasks: [
        {
          instruction: "Switch the calendar to Month view so you can see the whole month at once.",
          hint: "Calendar › Home tab › Calendar view › Month.",
          steps: [{ action: { kind: "command", id: "cal.view", value: "Month" } }],
        },
        {
          instruction: 'Create an event named "Flu clinic setup" on Saturday, October 24 from 7:00 AM to 8:00 AM in the "Front lobby", with a reminder 1 day before.',
          hint: "Home tab › New event. Type the title, set the date to 10/24/2026 and the times, type the location, then open Reminder on the Event tab and choose one day before, and select Save.",
          steps: [
            NEW_EVENT,
            { action: { kind: "dialog", id: "event.save", values: { title: "Flu clinic setup", location: "Front lobby", startDate: "10/24/2026", startTime: "7:00 AM", endTime: "8:00 AM", reminder: "1 day" } } },
          ],
        },
        {
          instruction: 'Dr. Hill is out on Friday, October 23. Add an all-day event named "Dr. Hill out of office" that shows as Out of office.',
          hint: "New event › title › date 10/23/2026 › turn on All day › Event tab › Show as (the Busy button) › Out of office › Save.",
          steps: [
            NEW_EVENT,
            { action: { kind: "dialog", id: "event.save", values: { title: "Dr. Hill out of office", startDate: "10/23/2026", allDay: true, showAs: "Out of Office" } } },
          ],
        },
        {
          instruction: 'The "Supply delivery window" on Thursday, October 22 moved to the afternoon. Change it to start at 1:00 PM (it stays one hour long).',
          hint: "Switch back to Work week if you like. Double-click the event, change the start time to 1:00 PM, and select Save. You can also drag the event to 1:00 PM.",
          steps: [
            {
              action: { kind: "command", id: "event.move", value: "10/22/2026 1:00 PM" },
              alt: [{ kind: "dialog", id: "event.save", values: { startDate: "10/22/2026", startTime: "1:00 PM" } }],
              requires: { selection: "evt:e2" },
              selectHint: 'Select the "Supply delivery window" event on Thursday, October 22 first.',
            },
          ],
        },
        {
          instruction: 'The "Lunch and learn: phone etiquette" on Wednesday was postponed with no new date. Delete it from your calendar.',
          hint: "Select the event and press Delete, or right-click it and select Delete.",
          steps: [{ action: { kind: "command", id: "item.delete" }, requires: { selection: "evt:e3" }, selectHint: 'Select "Lunch and learn: phone etiquette" on Wednesday, October 21 first.' }],
        },
      ],
    },
    {
      id: "ol-m4-calendar-basics-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Plan a week in the calendar",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: put three real-looking items on the front desk calendar and fix one that changed. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Calendar",
      minutes: 8,
      initial: lakeside([], { module: "calendar", calView: "Work Week", calDate: "2026-10-26", now: "2026-10-23T16:00", events: NEXT_WEEK.slice(1) }),
      tasks: [
        {
          instruction: 'Create an event named "Insurance verification calls" on Monday, October 26 from 9:00 AM to 10:00 AM in the "Front desk" with a reminder 15 minutes before.',
          hint: "Home tab › New event › title, date, times, location › Event tab › Reminder, choose 15 minutes before › Save.",
          steps: [
            NEW_EVENT,
            { action: { kind: "dialog", id: "event.save", values: { title: "Insurance verification calls", location: "Front desk", startDate: "10/26/2026", startTime: "9:00 AM", endTime: "10:00 AM", reminder: "15 minutes" } } },
          ],
        },
        {
          instruction: 'Add an all-day event named "Office closed: staff training" on Friday, October 30 that shows as Out of office.',
          hint: "New event › title › date 10/30/2026 › All day on › Show as (the Busy button) › Out of office › Save.",
          steps: [
            NEW_EVENT,
            { action: { kind: "dialog", id: "event.save", values: { title: "Office closed: staff training", startDate: "10/30/2026", allDay: true, showAs: "Out of Office" } } },
          ],
        },
        {
          instruction: 'Create an event named "Order flu clinic supplies" on Wednesday, October 28 from 3:00 PM to 3:30 PM with no reminder.',
          hint: "New event › title, date, times › Reminder › Don't remind me › Save.",
          steps: [
            NEW_EVENT,
            { action: { kind: "dialog", id: "event.save", values: { title: "Order flu clinic supplies", startDate: "10/28/2026", startTime: "3:00 PM", endTime: "3:30 PM", reminder: "None" } } },
          ],
        },
        {
          instruction: 'Keisha asked to move the "Billing workflow check-in" on Tuesday, October 27 to 10:00 AM. Move it and send the update.',
          hint: "Double-click the meeting, change the start time to 10:00 AM, and select Send. You can also drag it to 10:00 AM.",
          steps: [
            {
              action: { kind: "command", id: "event.move", value: "10/27/2026 10:00 AM" },
              alt: [{ kind: "dialog", id: "event.save", values: { startDate: "10/27/2026", startTime: "10:00 AM" } }],
              requires: { selection: "evt:e2" },
              selectHint: 'Select "Billing workflow check-in" on Tuesday, October 27 first.',
            },
          ],
        },
        {
          instruction: "Switch to Month view to check the whole month.",
          hint: "Home tab › Calendar view › Month.",
          steps: [{ action: { kind: "command", id: "cal.view", value: "Month" } }],
        },
      ],
    },
  ],

  "module-4::meetings-invitations": [
    {
      id: "ol-m4-meetings-invitations-1",
      app: "outlook-new",
      title: "Answer invitations and book a meeting",
      scenario:
        "Three meeting invitations are waiting, and Dr. Patel asked you to set up a short flu clinic planning meeting with her and Denise on Thursday afternoon. Answer each invitation the right way, then use the Scheduling Assistant to find a time that works for everyone.",
      fileName: "Inbox",
      minutes: 8,
      initial: lakeside(
        [
          msg("m1", DENISE, "Quarterly safety training", "All front desk staff, please attend the quarterly safety training.", "2026-10-20T08:20", {
            to: [ME],
            invite: { title: "Quarterly safety training", start: "2026-10-27T14:00", end: "2026-10-27T15:00", location: "Conference room", organizer: DENISE, required: [ME, OMAR, PRIYA] },
          }),
          msg("m2", BRIGHT, "Vendor lunch: BrightPath supply demo", "Join us for lunch and a quick look at our new supply ordering portal.", "2026-10-20T07:45", {
            to: [ME],
            external: true,
            invite: { title: "Vendor lunch: BrightPath supply demo", start: "2026-10-23T12:00", end: "2026-10-23T13:00", location: "Break room", organizer: BRIGHT, required: [ME] },
          }),
          msg("m3", KEISHA, "Billing review", "Quick review of the October billing questions.", "2026-10-20T07:30", {
            to: [ME],
            invite: { title: "Billing review", start: "2026-10-21T11:00", end: "2026-10-21T11:30", location: "Billing office", organizer: KEISHA, required: [ME] },
          }),
        ],
        {
          events: WEEK,
          freeBusy: {
            [PATEL.email]: [{ start: "2026-10-22T13:00", end: "2026-10-22T15:00", title: "Patient appointments" }],
            [DENISE.email]: [{ start: "2026-10-22T15:30", end: "2026-10-22T16:30", title: "Budget call" }],
          },
        },
      ),
      tasks: [
        {
          instruction: 'Accept Denise\'s invitation "Quarterly safety training".',
          hint: "Select the invitation, then select Accept in the reading pane.",
          steps: [{ action: { kind: "command", id: "invite.respond", value: ACCEPT }, requires: { selection: "msg:m1" }, selectHint: 'Select the invitation "Quarterly safety training" first.' }],
        },
        {
          instruction: "You may not be able to leave the front desk for BrightPath's vendor lunch. Respond Tentative.",
          hint: "Select the invitation, then select Tentative in the reading pane.",
          steps: [{ action: { kind: "command", id: "invite.respond", value: TENTATIVE }, requires: { selection: "msg:m2" }, selectHint: 'Select "Vendor lunch: BrightPath supply demo" first.' }],
        },
        {
          instruction:
            'Keisha\'s "Billing review" on Wednesday at 11:00 AM is during your front desk coverage. Propose a new time of 2:00 PM to 2:30 PM the same day, and send the proposal.',
          hint: "Select the invitation › Propose new time › I might attend. Set 2:00 PM to 2:30 PM, select Done, then select Send.",
          steps: [
            { action: { kind: "dialog", id: "proposeTime", values: { start: "2:00 PM", end: "2:30 PM" } }, requires: { selection: "msg:m3" }, selectHint: 'Select Keisha\'s invitation "Billing review" first.' },
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction:
            'Set up a 30-minute meeting named "Flu clinic planning" in the "Break room" with Dr. Patel and Denise on Thursday, October 22. Use the Scheduling Assistant to find the first half hour after 1:00 PM when both of them are free, then send it.',
          hint: "Calendar › New event. Add Dr. Anita Patel and Denise Carter under Invite attendees, set the date to 10/22/2026, then open Scheduling Assistant: Dr. Patel is busy until 3:00 PM and Denise is busy from 3:30 PM, so choose 3:00 PM to 3:30 PM. Go back to the event, add the title and location, and select Send.",
          steps: [
            NEW_EVENT,
            { action: { kind: "type", target: "event.required", value: recipients(PATEL.email, DENISE.email) } },
            { action: { kind: "dialog", id: "event.save", values: { title: "Flu clinic planning", location: "Break room", startDate: "10/22/2026", startTime: "3:00 PM", endTime: "3:30 PM" } } },
          ],
        },
      ],
    },
    {
      id: "ol-m4-meetings-invitations-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Respond to invitations and schedule a meeting",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: answer two invitations, propose a better time for a third, and book a meeting with the Scheduling Assistant. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Inbox",
      minutes: 9,
      initial: lakeside(
        [
          msg("m1", PATEL, "Flu clinic volunteer briefing", "A short briefing for everyone working Saturday's flu clinic.", "2026-10-20T08:30", {
            to: [ME],
            invite: { title: "Flu clinic volunteer briefing", start: "2026-10-23T16:00", end: "2026-10-23T16:30", location: "Break room", organizer: PATEL, required: [ME, PRIYA, OMAR] },
          }),
          msg("m2", HILL, "Lunch talk: new referral portal", "Optional lunch talk about the new referral portal.", "2026-10-20T08:05", {
            to: [ME],
            invite: { title: "Lunch talk: new referral portal", start: "2026-10-22T12:00", end: "2026-10-22T13:00", location: "Conference room", organizer: HILL, required: [ME] },
          }),
          msg("m3", DENISE, "Front desk scripts review", "Let's go over the new phone scripts.", "2026-10-20T07:50", {
            to: [ME],
            invite: { title: "Front desk scripts review", start: "2026-10-21T10:30", end: "2026-10-21T11:00", location: "Denise's office", organizer: DENISE, required: [ME] },
          }),
        ],
        {
          events: WEEK,
          freeBusy: {
            [OMAR.email]: [{ start: "2026-10-23T08:00", end: "2026-10-23T10:00", title: "Front desk" }],
            [PRIYA.email]: [{ start: "2026-10-23T10:00", end: "2026-10-23T11:00", title: "Patient intake" }],
          },
        },
      ),
      tasks: [
        {
          instruction: 'Accept Dr. Patel\'s invitation "Flu clinic volunteer briefing".',
          hint: "Select the invitation › Accept.",
          steps: [{ action: { kind: "command", id: "invite.respond", value: ACCEPT }, requires: { selection: "msg:m1" }, selectHint: 'Select "Flu clinic volunteer briefing" first.' }],
        },
        {
          instruction: 'Respond Tentative to Dr. Hill\'s "Lunch talk: new referral portal".',
          hint: "Select the invitation › Tentative.",
          steps: [{ action: { kind: "command", id: "invite.respond", value: TENTATIVE }, requires: { selection: "msg:m2" }, selectHint: 'Select "Lunch talk: new referral portal" first.' }],
        },
        {
          instruction: 'Denise\'s "Front desk scripts review" is during your front desk coverage. Propose 1:00 PM to 1:30 PM the same day instead and send it.',
          hint: "Select the invitation › Propose new time › I might attend › 1:00 PM to 1:30 PM › Done › Send.",
          steps: [
            { action: { kind: "dialog", id: "proposeTime", values: { start: "1:00 PM", end: "1:30 PM" } }, requires: { selection: "msg:m3" }, selectHint: 'Select "Front desk scripts review" first.' },
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction:
            'Book a 30-minute meeting named "Saturday check-in plan" with Omar and Priya on Friday, October 23 in the "Front desk" area. Use the Scheduling Assistant to choose the first half hour from 8:00 AM on when both are free, then send it.',
          hint: "New event › Invite attendees: Omar Haddad and Priya Nair › date 10/23/2026 › Scheduling Assistant: Omar is busy until 10:00 AM and Priya from 10:00 to 11:00 AM, so 11:00 AM to 11:30 AM is the first open half hour › title, location › Send.",
          steps: [
            NEW_EVENT,
            { action: { kind: "type", target: "event.required", value: recipients(OMAR.email, PRIYA.email) } },
            { action: { kind: "dialog", id: "event.save", values: { title: "Saturday check-in plan", location: "Front desk", startDate: "10/23/2026", startTime: "11:00 AM", endTime: "11:30 AM" } } },
          ],
        },
      ],
    },
  ],

  "module-4::recurring-teams": [
    {
      id: "ol-m4-recurring-teams-1",
      app: "outlook-new",
      title: "Huddles, Teams links and a cancellation",
      scenario:
        "Next week the front desk starts a short Monday huddle, Keisha is working from home on Tuesday, and the kiosk vendor canceled their demo. Update the calendar so everyone gets the right invitations and updates.",
      fileName: "Calendar",
      minutes: 7,
      initial: lakeside([], { module: "calendar", calView: "Work Week", calDate: "2026-10-26", now: "2026-10-23T15:00", events: NEXT_WEEK }),
      tasks: [
        {
          instruction:
            'Create a meeting named "Front desk huddle" with Omar and Priya on Monday, October 26 from 8:30 AM to 8:45 AM that repeats every week on Monday and is a Teams meeting, then send it.',
          hint: "Home tab › New event. Invite Omar Haddad and Priya Nair, type the title, set 10/26/2026 8:30 AM to 8:45 AM, open the repeat options (Recurring) and choose weekly on Monday, save the repeat settings, turn on Teams meeting, and select Send.",
          steps: [
            NEW_EVENT,
            { action: { kind: "type", target: "event.required", value: recipients(OMAR.email, PRIYA.email) } },
            {
              action: {
                kind: "dialog",
                id: "event.save",
                values: { title: "Front desk huddle", startDate: "10/26/2026", startTime: "8:30 AM", endTime: "8:45 AM", recurrence: "Weekly on Monday", teams: true },
              },
            },
          ],
        },
        {
          instruction: 'Keisha is working from home on Tuesday. Open "Billing workflow check-in", turn on Teams meeting, and send the update.',
          hint: "Double-click the meeting on Tuesday, October 27, turn on the Teams meeting toggle, and select Send.",
          steps: [
            {
              action: { kind: "dialog", id: "event.save", values: { teams: true } },
              requires: { selection: "evt:e2" },
              selectHint: 'Select "Billing workflow check-in" on Tuesday, October 27 first.',
            },
          ],
        },
        {
          instruction: 'The vendor canceled. Cancel the meeting "Vendor demo: check-in kiosk" on Wednesday so Omar and Denise get a cancellation.',
          hint: "Right-click the meeting and select Cancel (or open it and select Cancel), then send the cancellation.",
          steps: [
            {
              action: { kind: "command", id: "event.cancelMeeting" },
              alt: [{ kind: "command", id: "item.delete" }],
              requires: { selection: "evt:e1" },
              selectHint: 'Select "Vendor demo: check-in kiosk" on Wednesday, October 28 first.',
            },
          ],
        },
      ],
    },
    {
      id: "ol-m4-recurring-teams-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Recurring meetings and Teams",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: set up a recurring Teams meeting, add Teams to an existing meeting, and cancel one you organized. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Calendar",
      minutes: 7,
      initial: lakeside([], { module: "calendar", calView: "Work Week", calDate: "2026-10-26", now: "2026-10-23T15:00", events: NEXT_WEEK }),
      tasks: [
        {
          instruction:
            'Create a meeting named "Billing and front desk sync" with Keisha on Thursday, October 29 from 4:00 PM to 4:15 PM that repeats weekly on Thursday as a Teams meeting, and send it.',
          hint: "New event › Invite attendees: Keisha Grant › title › 10/29/2026 4:00 PM to 4:15 PM › repeat options (Recurring): weekly on Thursday › save › Teams meeting on › Send.",
          steps: [
            NEW_EVENT,
            { action: { kind: "type", target: "event.required", value: recipients(KEISHA.email) } },
            {
              action: {
                kind: "dialog",
                id: "event.save",
                values: { title: "Billing and front desk sync", startDate: "10/29/2026", startTime: "4:00 PM", endTime: "4:15 PM", recurrence: "Weekly on Thursday", teams: true },
              },
            },
          ],
        },
        {
          instruction: 'Denise will join "Vendor demo: check-in kiosk" from another site. Turn on Teams meeting for it and send the update.',
          hint: "Double-click the meeting on Wednesday, October 28, turn on Teams meeting, and select Send.",
          steps: [{ action: { kind: "dialog", id: "event.save", values: { teams: true } }, requires: { selection: "evt:e1" }, selectHint: 'Select "Vendor demo: check-in kiosk" first.' }],
        },
        {
          instruction: 'Keisha no longer needs "Billing workflow check-in". Cancel it so she gets a cancellation.',
          hint: "Right-click the meeting on Tuesday, October 27 and select Cancel, or open it and select Cancel.",
          steps: [
            {
              action: { kind: "command", id: "event.cancelMeeting" },
              alt: [{ kind: "command", id: "item.delete" }],
              requires: { selection: "evt:e2" },
              selectHint: 'Select "Billing workflow check-in" first.',
            },
          ],
        },
      ],
    },
  ],

  "module-4::sharing-time-zones": [
    {
      id: "ol-m4-sharing-time-zones-1",
      app: "outlook-new",
      title: "Share calendars and add a second time zone",
      scenario:
        "Omar covers the front desk when you are out and needs to see where you are, Denise manages your calendar while you are at training, and Dr. Patel has shared her calendar with you. The billing service you call every week is on Pacific time.",
      fileName: "Calendar",
      minutes: 6,
      initial: lakeside(
        [
          msg("m1", PATEL, "Dr. Anita Patel has shared a calendar with you", "Dr. Anita Patel has shared her calendar with you. Accept to add it to your calendar list.", "2026-10-20T08:10", {
            to: [ME],
            shareInvite: { owner: PATEL, permission: "Can view all details", calendar: "Dr. Anita Patel" },
          }),
        ],
        { module: "calendar", calView: "Work Week", calDate: "2026-10-20", events: WEEK },
      ),
      tasks: [
        {
          instruction: "Share your calendar with Omar Haddad so he can see the titles and locations of your events, but not the details.",
          hint: "Calendar › Home tab › Share calendar. Type Omar's address (omar.haddad@lakesidemed.example.com), choose Can view titles and locations, and select Share.",
          steps: [{ action: { kind: "dialog", id: "shareCalendar", values: { person: [OMAR.email, "Omar Haddad"], permission: "Can view titles and locations" } } }],
        },
        {
          instruction: "Give Denise Carter delegate access to your calendar so she can manage your meetings while you are at training.",
          hint: "Home tab › Share calendar › Denise's address › Delegate › Share.",
          steps: [{ action: { kind: "dialog", id: "shareCalendar", values: { person: [DENISE.email, "Denise Carter"], permission: "Delegate" } } }],
        },
        {
          instruction: "Accept Dr. Patel's shared calendar so it appears in your calendar list.",
          hint: "Go to Mail, select the sharing invitation from Dr. Patel, and select Accept.",
          steps: [{ action: { kind: "command", id: "share.accept" }, requires: { selection: "msg:m1" }, selectHint: "Go to Mail and select Dr. Patel's sharing invitation first." }],
        },
        {
          instruction: 'Add Pacific Time as a second time zone labeled "Billing service" so you can see their hours next to yours.',
          hint: "Calendar › View tab › Calendar settings (or Settings › Calendar › View) › Add time zone › (UTC-08:00) Pacific Time (US & Canada) › label Billing service › Save.",
          steps: [{ action: { kind: "dialog", id: "settings.addTimeZone", values: { zone: PACIFIC, label: "Billing service" } } }],
        },
      ],
    },
    {
      id: "ol-m4-sharing-time-zones-lab",
      app: "outlook-new",
      role: "challenge",
      title: "Challenge Lab: Share a calendar and add a time zone",
      scenario:
        "Do the lesson Challenge in a working copy of new Outlook: share your calendar at two different permission levels, accept a shared calendar, and add a second time zone. When you finish, enter your name and print or save your results page to submit.",
      fileName: "Calendar",
      minutes: 6,
      initial: lakeside(
        [
          msg("m1", DENISE, "Denise Carter has shared a calendar with you", "Denise Carter has shared the Front Desk Schedule calendar with you.", "2026-10-20T08:00", {
            to: [ME],
            shareInvite: { owner: DENISE, permission: "Can view all details", calendar: "Front Desk Schedule" },
          }),
        ],
        { module: "calendar", calView: "Work Week", calDate: "2026-10-20", events: WEEK },
      ),
      tasks: [
        {
          instruction: "Share your calendar with Priya Nair so she can only see when you are busy.",
          hint: "Home tab › Share calendar › Priya's address › Can view when I'm busy › Share.",
          steps: [{ action: { kind: "dialog", id: "shareCalendar", values: { person: [PRIYA.email, "Priya Nair"], permission: "Can view when I'm busy" } } }],
        },
        {
          instruction: "Share your calendar with Omar Haddad so he can add and change events for you (edit access, not delegate).",
          hint: "Home tab › Share calendar › Omar's address › Can edit › Share.",
          steps: [{ action: { kind: "dialog", id: "shareCalendar", values: { person: [OMAR.email, "Omar Haddad"], permission: "Can edit" } } }],
        },
        {
          instruction: 'Accept Denise\'s shared "Front Desk Schedule" calendar.',
          hint: "Go to Mail, select Denise's sharing invitation, and select Accept.",
          steps: [{ action: { kind: "command", id: "share.accept" }, requires: { selection: "msg:m1" }, selectHint: "Go to Mail and select Denise's sharing invitation first." }],
        },
        {
          instruction: 'Add Central Time as a second time zone labeled "Imaging center".',
          hint: "View tab › Calendar settings › Add time zone › (UTC-06:00) Central Time (US & Canada) › label Imaging center › Save.",
          steps: [{ action: { kind: "dialog", id: "settings.addTimeZone", values: { zone: "(UTC-06:00) Central Time (US & Canada)", label: "Imaging center" } } }],
        },
      ],
    },
  ],
};
