import type { SimDefinition } from "@/types/sim";
import { gmailDoc, type GmCalendar, type GmEvent, type GmRoom, type GmailDoc } from "@/components/sim/apps/gmail/types";
import { ME, P, baseMail, cmd, form, msg } from "./mail-data";

const L = (n: string) => `module-7::${n}`;
const MEET = "kpr-tmwq-zse";

const CALS: GmCalendar[] = [
  { id: "main", name: "Jordan Lee", color: "#039be5", mine: true },
  { id: "leasing", name: "Leasing Showings", color: "#33b679", mine: true, description: "Apartment showings for all buildings" },
  { id: "holidays", name: "Holidays in United States", color: "#0b8043" },
  { id: "denise", name: "Denise Carter", color: "#8e24aa" },
];

function events(): GmEvent[] {
  return [
    { id: "c1", title: "Staff huddle", day: "2026-10-19", start: "09:00", end: "09:30", calendar: "main", organizer: P.denise.email, myResponse: "Yes", repeat: "Weekly on Monday", guests: [{ email: ME.email, response: "Yes" }, { email: P.luis.email, response: "Yes" }, { email: P.priya.email, response: "Yes" }, { email: P.marcus.email, response: "Yes" }] },
    { id: "c2", title: "Showing: 214 Elm St, Unit 2", day: "2026-10-22", start: "16:00", end: "16:30", calendar: "leasing", location: "214 Elm St" },
    { id: "c3", title: "Weekly leasing huddle", day: "2026-10-21", start: "14:00", end: "14:30", calendar: "main", organizer: P.luis.email, meet: MEET, description: "Agenda: showings this week, applications, renewals.", guests: [{ email: ME.email, response: "Awaiting" }, { email: P.denise.email, response: "Yes" }] },
    { id: "c4", title: "Owner call: Grace Kim", day: "2026-10-23", start: "11:00", end: "11:30", calendar: "main", organizer: P.denise.email, guests: [{ email: ME.email, response: "Awaiting" }, { email: P.grace.email, response: "Yes" }] },
    { id: "c5", title: "Lunch", day: "2026-10-21", start: "12:00", end: "13:00", calendar: "main" },
    { id: "c6", title: "Bank deposit run", day: "2026-10-20", start: "15:00", end: "15:30", calendar: "main" },
    { id: "c7", title: "Halloween", day: "2026-10-31", allDay: true, calendar: "holidays" },
  ];
}

function calDoc(extra: Partial<GmailDoc> = {}): GmailDoc {
  return baseMail({
    surface: "calendar",
    tabs: ["calendar"],
    calendars: CALS,
    events: events(),
    view: { folder: "inbox", calView: "Week", calDate: "2026-10-21" },
    busy: [
      { email: P.denise.email, day: "2026-10-22", start: "09:00", end: "11:00" },
      { email: P.denise.email, day: "2026-10-22", start: "13:00", end: "14:00" },
      { email: P.priya.email, day: "2026-10-22", start: "10:00", end: "12:00" },
      { email: P.priya.email, day: "2026-10-22", start: "15:00", end: "16:00" },
      { email: P.marcus.email, day: "2026-10-22", start: "08:00", end: "10:00" },
    ],
    ...extra,
  });
}

const ROOM: GmRoom = {
  code: MEET,
  title: "Weekly leasing huddle",
  event: "c3",
  participants: [{ email: P.luis.email, camera: true }, { email: P.denise.email, muted: true, camera: true }],
  chat: [{ from: P.luis.email, text: "Hi all! The agenda is in the invite.", time: "1:59 PM" }],
  captions: [
    { from: P.luis.email, text: "Let's start with the Elm Street showing on Thursday." },
    { from: P.denise.email, text: "Jordan, can you confirm the showing calendar is updated?" },
  ],
  canRecord: false,
};

export const gwMailM7: Record<string, SimDefinition[]> = {
  [L("calendar-basics")]: [
    {
      id: "gw-m7-calendar-basics-1",
      app: "gmail",
      title: "Set up your calendar for the week",
      scenario: "Denise asks you to keep the office's inspection dates in Google Calendar, with reminders, and to keep your own to-dos there too.",
      fileName: "Google Calendar",
      minutes: 7,
      initial: gmailDoc(calDoc()),
      tasks: [
        { instruction: "Switch the calendar to Day view.", hint: "At the top right, open the view menu (Week) and select Day.", steps: [cmd("cal.view", "Day")] },
        { instruction: "Switch back to Week view.", hint: "Open the view menu (Day) and select Week.", steps: [cmd("cal.view", "Week")] },
        {
          instruction: "Create an event named “Fire alarm inspection, 88 Maple Ave” on Thursday, October 22, from 9:00 to 10:00 AM.",
          hint: "In the grid, click 9:00 AM in the Thursday 22 column. Type the title in Add title and time, then select Save.",
          steps: [form("event:new", "Title: Fire alarm inspection, 88 Maple Ave\nDate: Thu, Oct 22, 2026\nStart: 9:00 AM\nEnd: 10:00 AM\nAll day: no\nRepeat: Does not repeat\nGoogle Meet: no\nNotification: 30 minutes before\nCalendar: Jordan Lee\nInvitations: none\nDescription: ", ["Title: Fire alarm inspection, 88 Maple Ave", "Date: Thu, Oct 22, 2026", "Start: 9:00 AM", "End: 10:00 AM"])],
        },
        {
          instruction: "Open the inspection and edit it: set the location to “88 Maple Ave” and add an email notification 1 day before (keep the 30-minute notification). Save.",
          hint: "Click the event › Edit event (pencil) › Add location › Add notification › change Notification to Email and the time to 1 day before › Save.",
          steps: [form("event:e1", "Title: Fire alarm inspection, 88 Maple Ave\nDate: Thu, Oct 22, 2026\nStart: 9:00 AM\nEnd: 10:00 AM\nAll day: no\nRepeat: Does not repeat\nGoogle Meet: no\nLocation: 88 Maple Ave\nNotification: 30 minutes before\nEmail: 1 day before\nCalendar: Jordan Lee\nInvitations: none\nDescription: ", ["Location: 88 Maple Ave", "Notification: 30 minutes before", "Email: 1 day before"])],
        },
        {
          instruction: "Add a task “Order lobby light bulbs” for Friday, October 23.",
          hint: "Create › Task. Type the title, set the date to Friday, October 23, and select Save.",
          steps: [form("task:new", "Title: Order lobby light bulbs\nDate: Fri, Oct 23, 2026\nList: My Tasks\nDescription: ", ["Title: Order lobby light bulbs", "Date: Fri, Oct 23, 2026"])],
        },
        {
          instruction: "Create a new calendar named “Building Inspections” so inspections can be shown or hidden together.",
          hint: "In the left panel, next to Other calendars, select Add other calendars (+) › Create new calendar. Type the name and select Create calendar.",
          steps: [form("newcal", "Name: Building Inspections\nDescription: ", ["Name: Building Inspections"])],
        },
        { instruction: "Back on the calendar, hide the Holidays in United States calendar by unchecking it.", hint: "Select Back to calendar (arrow) at the top left of Settings. In the left panel under Other calendars, uncheck Holidays in United States.", steps: [cmd("cal.show", "holidays|off")] },
      ],
    },
  ],

  [L("invite-and-find-a-time")]: [
    {
      id: "gw-m7-invite-and-find-a-time-1",
      app: "gmail",
      title: "Answer invitations and schedule the lease renewal review",
      scenario: "Luis and Denise sent you invitations, and Denise wants a lease renewal review with Priya this Thursday at the first hour everyone is free.",
      fileName: "Google Calendar",
      minutes: 8,
      initial: gmailDoc(calDoc()),
      tasks: [
        { instruction: "Open Luis Ortega's invitation “Weekly leasing huddle” (today at 2:00 PM) and answer Yes.", hint: "Click the event in the Wednesday 21 column. Next to Going?, select Yes.", steps: [cmd("cal.rsvp", "Yes", "evt:c3", "Click the Weekly leasing huddle event first.")] },
        { instruction: "Answer Maybe to “Owner call: Grace Kim” on Friday.", hint: "Close the open card, click the Friday 11:00 AM event, and select Maybe.", steps: [cmd("cal.rsvp", "Maybe", "evt:c4", "Click the Owner call: Grace Kim event first.")] },
        {
          instruction: "Create “Lease renewal review” on Thursday, October 22, with Denise Carter and Priya Shah as guests. Use Find a time to choose the first hour after 1:00 PM when all three of you are free. Add Google Meet video conferencing, save, and send the invitations.",
          hint: "Create › Event › type the title › set the date to Oct 22 › More options. Under Guests, add Denise and Priya. Open the Find a time tab and click the first free time after 1:00 PM (2:00 PM). Back on Event details, select Add Google Meet video conferencing. Save › Send.",
          steps: [form("event:new", `Title: Lease renewal review\nDate: Thu, Oct 22, 2026\nStart: 2:00 PM\nEnd: 3:00 PM\nAll day: no\nRepeat: Does not repeat\nGuest: ${P.denise.email}\nGuest: ${P.priya.email}\nGoogle Meet: yes\nNotification: 30 minutes before\nCalendar: Jordan Lee\nGuests can: see guest list\nInvitations: Send\nDescription: `, ["Title: Lease renewal review", "Date: Thu, Oct 22, 2026", "Start: 2:00 PM", "End: 3:00 PM", `Guest: ${P.denise.email}`, `Guest: ${P.priya.email}`, "Google Meet: yes", "Invitations: Send"])],
        },
        {
          instruction: "Grace Kim is in Los Angeles. Create “Roof estimate call with Grace” on Friday, October 23, from 1:00 to 1:30 PM in Grace's time zone, (GMT-07:00) Pacific Time - Los Angeles. Invite Grace and send the invitation.",
          hint: "Create › Event › title › date Oct 23 › More options. Set 1:00 PM to 1:30 PM, select Time zone and choose (GMT-07:00) Pacific Time - Los Angeles › OK. Add Grace under Guests › Save › Send.",
          steps: [form("event:new", `Title: Roof estimate call with Grace\nDate: Fri, Oct 23, 2026\nStart: 1:00 PM\nEnd: 1:30 PM\nAll day: no\nRepeat: Does not repeat\nTime zone: (GMT-07:00) Pacific Time - Los Angeles\nGuest: ${P.grace.email}\nGoogle Meet: no\nNotification: 30 minutes before\nCalendar: Jordan Lee\nGuests can: see guest list\nInvitations: Send\nDescription: `, ["Title: Roof estimate call with Grace", "Date: Fri, Oct 23, 2026", "Start: 1:00 PM", "End: 1:30 PM", "Time zone: (GMT-07:00) Pacific Time - Los Angeles", `Guest: ${P.grace.email}`, "Invitations: Send"])],
        },
        {
          instruction: "Show Pacific Time - Los Angeles as a secondary time zone on your calendar so you can see Grace's time next to yours.",
          hint: "Settings menu (gear) › Settings › General › Time zone. Check Show additional time zones, then choose (GMT-07:00) Pacific Time - Los Angeles as the Secondary time zone. Changes save automatically.",
          anyOrder: true,
          steps: [
            form("settings:timezone", "Show additional time zones: on", ["Show additional time zones: on"]),
            form("settings:timezone", "Secondary time zone: (GMT-07:00) Pacific Time - Los Angeles", ["Secondary time zone: (GMT-07:00) Pacific Time - Los Angeles"]),
          ],
        },
      ],
    },
  ],

  [L("share-calendars-and-booking")]: [
    {
      id: "gw-m7-share-calendars-and-booking-1",
      app: "gmail",
      title: "Share the showings calendar and open tenant office hours",
      scenario: "Luis needs to see every showing, Marcus needs to update them, and Denise wants tenants to book short office-hours calls without trading emails.",
      fileName: "Google Calendar",
      minutes: 7,
      initial: gmailDoc(calDoc()),
      tasks: [
        {
          instruction: "Share your Leasing Showings calendar with Luis Ortega so he can see event details.",
          hint: "In the left panel, point to Leasing Showings › Options (three dots) › Settings and sharing › Shared with › Add people and groups. Type Luis, pick him, choose See event details, and select Send.",
          steps: [form("calshare:leasing", `Share with: ${P.luis.email}\nPermission: See event details`, [`Share with: ${P.luis.email}`, "Permission: See event details"])],
        },
        {
          instruction: "Share the same calendar with Marcus Bell so he can make changes and see event details.",
          hint: "Add people and groups again › Marcus › Permissions: Make changes and see event details › Send.",
          steps: [form("calshare:leasing", `Share with: ${P.marcus.email}\nPermission: Make changes and see event details`, [`Share with: ${P.marcus.email}`, "Permission: Make changes and see event details"])],
        },
        { instruction: "Go back to the calendar.", hint: "At the top left of Settings, select Back to calendar (arrow).", steps: [cmd("cal.page", "close")] },
        {
          instruction: "Create an appointment schedule “Tenant office hours” with 30-minute appointments on Tuesdays and Thursdays from 2:00 to 4:00 PM only (turn the other days off). Use Google Meet video conferencing, add Phone number to the booking form, and save.",
          hint: "Create › Appointment schedule. Add the title, keep 30 minutes, uncheck Mon, Wed and Fri, and set Tue and Thu to 2:00 PM – 4:00 PM. Select Next, keep Google Meet video conferencing, check Phone number, then Save.",
          steps: [form("appointments:new", "Title: Tenant office hours\nDuration: 30 minutes\nAvailability: Tue 2:00 PM - 4:00 PM\nAvailability: Thu 2:00 PM - 4:00 PM\nScheduling window: 60 days in advance\nBuffer time: No buffer time\nLocation: Google Meet video conferencing\nBooking form: First name, Last name, Email address, Phone number\nRequire email verification: no\nDescription: ", ["Title: Tenant office hours", "Duration: 30 minutes", "Availability: Tue 2:00 PM - 4:00 PM", "Availability: Thu 2:00 PM - 4:00 PM", "Location: Google Meet video conferencing", "Phone number"])],
        },
      ],
    },
  ],

  [L("join-and-take-part-in-meet")]: [
    {
      id: "gw-m7-join-and-take-part-in-meet-1",
      app: "gmail",
      title: "Join the leasing huddle on Google Meet",
      scenario: "The weekly leasing huddle starts in two minutes. You're joining from your desk in a busy office.",
      fileName: "Google Calendar",
      minutes: 6,
      initial: gmailDoc(calDoc({ now: "13:58", rooms: [ROOM] })),
      tasks: [
        { instruction: "Join the “Weekly leasing huddle” from Google Calendar.", hint: "Click the 2:00 PM event on Wednesday the 21st › Join with Google Meet.", steps: [cmd("meet.open", MEET)] },
        { instruction: "Before you join, turn off your microphone.", hint: "On the camera preview, select Turn off microphone (the microphone button).", steps: [cmd("meet.mic", "off")] },
        { instruction: "Blur your background.", hint: "Select Apply visual effects (sparkle icon) on the preview › Blur your background.", steps: [cmd("meet.effects", "Blur")] },
        { instruction: "Join the meeting.", hint: "Select Join now.", steps: [cmd("meet.join")] },
        { instruction: "Turn on captions.", hint: "On the bar at the bottom, select Turn on captions (CC).", steps: [cmd("meet.captions", "on")] },
        { instruction: "In the meeting chat, send: “The showing calendar is updated.”", hint: "Select Chat with everyone (bottom right), type the message, and press Enter or select Send.", steps: [{ action: { kind: "type", target: "meetchat", value: "showing calendar is updated", match: "includes" } }] },
        { instruction: "Raise your hand so Luis knows you have a question.", hint: "On the bottom bar, select Raise hand (hand icon).", steps: [cmd("meet.hand", "raise")] },
      ],
    },
    {
      id: "gw-m7-join-and-take-part-in-meet-2",
      app: "gmail",
      title: "Present the lease renewal deck",
      scenario: "Denise asks you to walk the team through the lease renewal deck you made in Google Slides.",
      fileName: "Google Meet",
      minutes: 5,
      initial: gmailDoc(
        calDoc({
          surface: "meet",
          tabs: ["calendar", "meet"],
          now: "14:06",
          rooms: [ROOM],
          meeting: { code: MEET, stage: "in", mic: true, camera: true, effect: "None", layout: "Auto (dynamic)", chat: [...(ROOM.chat ?? [])], participants: ROOM.participants.map((p) => ({ ...p })) },
          browserTabs: ["Lease Renewal Deck - Google Slides", "Inbox - jlee@maplestreetpm.example - Gmail", "Maintenance Request Log - Google Sheets"],
          windows: ["File Explorer", "Calculator"],
        }),
      ),
      tasks: [
        { instruction: "Present only the browser tab with your Lease Renewal Deck.", hint: "Present now › A tab › Lease Renewal Deck - Google Slides › Share.", steps: [cmd("meet.present", "A tab: Lease Renewal Deck - Google Slides")] },
        { instruction: "You're done with the deck. Stop presenting.", hint: "Select Stop presenting on the “You are presenting” bar.", steps: [cmd("meet.stopPresent")] },
        { instruction: "React with a thumbs up to Denise's update.", hint: "Select Send a reaction (smiley face) on the bottom bar › Thumbs up.", steps: [cmd("meet.react", "Thumbs up")] },
        { instruction: "Change the layout to Sidebar.", hint: "More options (three dots) › Change layout › Sidebar.", steps: [cmd("meet.layout", "Sidebar")] },
        { instruction: "Open Meeting tools to see what's available, such as Recording.", hint: "Select Meeting tools (bottom right).", steps: [cmd("meet.panel", "tools")] },
        { instruction: "The huddle is over. Leave the call.", hint: "Select Leave call (red phone button).", steps: [cmd("meet.leave")] },
      ],
    },
  ],
};

export { msg };
