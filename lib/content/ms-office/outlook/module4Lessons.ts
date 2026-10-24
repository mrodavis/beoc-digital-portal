import { Lesson } from "@/types/lesson";
import { outlookSlides } from "./slides";

const IMG = "/images/ms-office/outlook/module-4";

export const outlookModule4Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "calendar-basics",
    title: "Calendar Basics: Views, Events, and Reminders",
    description:
      "Move around the Outlook calendar, switch views, create events with locations and reminders, block whole days, and change or delete events when plans change.",
    objectives: [
      "Switch between Day, Work week, Week and Month views",
      "Create an event with a title, date, time, location and reminder",
      "Add an all-day event and set how it shows on your calendar (Show as)",
      "Move, change or delete an event when plans change",
    ],
    duration: "16 min",
    videoUrl: "https://www.youtube.com/embed/FNVhO49_2zs",
    slides: outlookSlides["module-4/calendar-basics"],
    sections: [
      {
        heading: "A calendar people can trust",
        blocks: [
          {
            type: "scenario",
            role: "You keep the Lakeside Medical Associates front desk calendar.",
            text: "Coworkers check your calendar before they ask you to cover a phone line or help with a patient. Last week a supply delivery moved and nobody updated the calendar, so the delivery driver waited at a locked back door for twenty minutes.",
            task: "Learn to keep the calendar accurate: the right view for the question, events with useful details, and quick updates when something changes.",
          },
          {
            type: "paragraph",
            text: "Select Calendar in the navigation bar at the far left. The calendar has the same parts as Mail: a Ribbon at the top, a pane on the left with a small month calendar and your list of calendars, and the main grid where your events appear.",
          },
          {
            type: "table",
            caption: "Calendar views (Calendar › Home tab)",
            columns: ["View", "Best for"],
            rows: [
              ["Day", "A busy day hour by hour, such as a clinic day with back-to-back appointments"],
              ["Work week", "Monday through Friday at a glance; the most common view at a front desk"],
              ["Week", "All seven days, including weekend events like a Saturday flu clinic"],
              ["Month", "Planning ahead: time off, trainings, deadlines across the month"],
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Home tab › Arrange group has Day, Work Week, Week, Month and Schedule View. Schedule view, List view and Calendar Peek are not available in new Outlook.",
          },
        ],
      },
      {
        heading: "Create an event",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "In Calendar, select New event on the Home tab. (You can also double-click an empty time on the grid.)",
              "Type a short, specific title, such as \"Flu clinic setup\".",
              "Set the date, start time and end time. For something that lasts all day, such as time off, turn on All day.",
              "Type a location, such as \"Front lobby\".",
              "On the Event tab, open Reminder and choose how long before the event Outlook should remind you, or choose Don't remind me. Use Show as (the Busy button) to choose how that time appears to others, such as Free, Busy or Out of office.",
              "Select Save. An event with no invited attendees is just yours, so there is nothing to send.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/event-form.png`,
            alt: "A new event in new Outlook with the title Flu clinic setup, the date and times, the All day switch, a location, and the Reminder and Show as buttons on the Event tab",
            caption: "The new event form. Reminder and Show as are on the Event tab.",
          },
          {
            type: "tip",
            text: "Show as tells everyone who checks your availability what that time means. Use Out of office for time off so the Scheduling Assistant (next lesson) shows coworkers that you're away, not just busy.",
          },
          {
            type: "callout",
            variant: "info",
            text: "To set the reminder Outlook uses for every new event, go to Settings › Calendar › Events and invitations, and under Events you create, choose a Default reminder.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Home tab › New Appointment opens an Appointment window. Reminder and Show As are in the Options group of the Appointment tab; Save & Close saves it.",
          },
        ],
      },
      {
        heading: "When plans change",
        blocks: [
          {
            type: "list",
            items: [
              "Move an event: drag it to the new time, or double-click it, change the date or time, and select Save. Changing the start time keeps the same length.",
              "Change a meeting you organized: double-click it, make the change, and select Send so attendees get the update.",
              "Delete an event that is only yours: select it and press Delete, or right-click it and select Delete.",
              "For a meeting you organized, use Cancel instead of Delete so the attendees are told (Lesson 3).",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the view",
            prompt: "Match each question to the calendar view that answers it fastest.",
            items: [
              { id: "v1", text: "Day", match: "What does Dr. Patel's afternoon look like, hour by hour?" },
              { id: "v2", text: "Work week", match: "Which weekday this week has the fewest meetings?" },
              { id: "v3", text: "Week", match: "Is anything scheduled for Saturday's flu clinic?" },
              { id: "v4", text: "Month", match: "Which days are staff out later this month?" },
            ],
            explanation: "Pick the narrowest view that still shows everything you need: Day for detail, Month for planning.",
          },
          {
            type: "worked-example",
            title: "Fixing the front desk week",
            task: "Make the calendar match what is really happening this week.",
            steps: [
              { move: "Switch to Month view.", why: "Saturday's flu clinic and Friday's time off are easier to see across the whole month." },
              { move: "Create \"Flu clinic setup\" on Saturday, 7:00 to 8:00 AM, Front lobby, reminder 1 day before.", why: "A reminder the day before gives time to gather supplies." },
              { move: "Add an all-day \"Dr. Hill out of office\" event on Friday that shows as Out of office.", why: "Coworkers checking the calendar see the day is blocked." },
              { move: "Drag the supply delivery to 1:00 PM.", why: "The calendar now matches the new delivery time." },
              { move: "Delete the postponed lunch and learn.", why: "An event that isn't happening only causes confusion." },
            ],
            result: "A calendar that answers \"what's happening and where?\" correctly for anyone who checks it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which view shows Monday through Friday without the weekend?",
            options: ["Day", "Work week", "Week", "Month"],
            correctIndex: 1,
            explanation: "Work week shows the working days only. Week includes Saturday and Sunday.",
            optionRationales: ["Day shows one day.", "Correct.", "Week shows all seven days.", "Month shows the whole month."],
          },
          {
            type: "knowledge-check",
            question: "You are taking Friday off. What is the best way to show it on your calendar?",
            options: [
              "A 9:00 AM event titled \"Off\" with Show as Free",
              "An all-day event with Show as Out of office",
              "A note in the Friday event's description",
              "Nothing; automatic replies are enough",
            ],
            correctIndex: 1,
            explanation: "An all-day event shown as Out of office blocks the whole day, and anyone checking your availability sees you're away.",
            optionRationales: [
              "Free tells people you're available, which is the opposite of what you want.",
              "Correct.",
              "Coworkers checking availability won't see a description.",
              "Automatic replies answer email (Module 6), but they don't block your calendar.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Where do you choose a reminder for one event in new Outlook?",
            options: ["File › Options › Calendar", "The Reminder button on the Event tab", "View tab › Reminders window", "Right-click the date in the month calendar"],
            correctIndex: 1,
            explanation: "Open the event and use Reminder on the Event tab. The default for all new events is in Settings › Calendar › Events and invitations.",
            optionRationales: [
              "New Outlook has no File tab; File › Options is classic Outlook.",
              "Correct.",
              "There is no Reminders window on the View tab in new Outlook.",
              "Right-clicking a date doesn't set reminders.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Plan one week of front desk work in a calendar.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your own Outlook calendar (new Outlook or Outlook on the web), create three events for a real or practice week: one with a location and a reminder, one all-day event shown as Out of office, and one with no reminder.",
          "Move one of the events to a different time, then switch to Month view and take a screenshot.",
          "On a school computer, do this in the Challenge Lab below instead of your own calendar.",
          "Write two or three sentences: which calendar view would you use most at a front desk, and why?",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Month view screenshot or your Challenge Lab results page (Print or save results), plus your short answer, to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "meetings-invitations",
    title: "Meeting Invitations and the Scheduling Assistant",
    description:
      "Respond to meeting invitations the professional way, propose a new time when you can't make it, and use the Scheduling Assistant to find a time that works for everyone you invite.",
    objectives: [
      "Accept, decline, or tentatively accept a meeting invitation",
      "Propose a new time for a meeting you can't attend",
      "Invite required and optional attendees to a meeting",
      "Use the Scheduling Assistant to find a time when everyone is free",
    ],
    duration: "17 min",
    videoUrl: "https://www.youtube.com/embed/jMQTx_qlOGg",
    slides: outlookSlides["module-4/meetings-invitations"],
    sections: [
      {
        heading: "Every invitation needs an answer",
        blocks: [
          {
            type: "scenario",
            role: "You are the Lakeside front desk coordinator.",
            text: "Three invitations are waiting: a required safety training from Denise, a vendor lunch you may not be able to attend, and a billing review that lands in the middle of your front desk shift. Dr. Patel also wants a short flu clinic planning meeting with Denise on Thursday afternoon.",
            task: "Answer each invitation in a way that helps the organizer plan, then book the planning meeting at a time that works for everyone.",
          },
          {
            type: "paragraph",
            text: "A meeting invitation arrives in your Inbox like a message, with response buttons in the reading pane. Your answer updates the organizer's attendee list and puts the meeting on your calendar (Tentative shows it as tentative). Answering promptly is part of being professional: the organizer may be booking a room or ordering lunch based on the count.",
          },
          {
            type: "table",
            caption: "Choosing a response",
            columns: ["Response", "When to use it", "What happens"],
            rows: [
              ["Accept", "You will attend", "The meeting is added to your calendar as busy"],
              ["Tentative", "You might attend but can't promise", "The meeting is added as tentative; the organizer sees a maybe"],
              ["Decline", "You can't or shouldn't attend", "The organizer sees a no; add a short reason if it helps"],
              ["Propose new time", "You want to attend, but the time doesn't work", "The organizer gets your suggested time and can accept it or not"],
            ],
          },
        ],
      },
      {
        heading: "Respond and propose a new time",
        blocks: [
          {
            type: "list",
            items: [
              "Select the invitation, then select Accept, Tentative or Decline in the reading pane. The organizer gets your answer, and Accept or Tentative puts the meeting on your calendar.",
              "To suggest another time, select Propose new time and choose I might attend or No, I won't attend. Pick the new time and select Done, then add a short message and select Send.",
              "The organizer decides. Your proposal doesn't move the meeting until the organizer accepts it.",
              "Propose new time works with work or school accounts, and it isn't available for recurring meetings; reply to the organizer with a message instead.",
            ],
          },
          {
            type: "tip",
            text: "A short note helps the organizer: \"I can attend the first 30 minutes\" is more useful than a silent Tentative. Reply to the invitation, or use Propose new time, to add one.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: the response buttons are on the Meeting tab of the invitation, and Propose New Time offers Tentative and Propose New Time or Decline and Propose New Time.",
          },
        ],
      },
      {
        heading: "Schedule a meeting with the Scheduling Assistant",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "In Calendar, select New event.",
              "Type a title, then add people under Invite attendees. Add anyone who doesn't have to come as optional.",
              "Select Scheduling Assistant. Each attendee's free and busy times appear in a row, so you can see where everyone is open. You can also add required or optional attendees here.",
              "Choose a time when everyone is free, or pick one of Outlook's suggested times. Return to the event.",
              "Add a location (or turn on Teams meeting, Lesson 3) and a short agenda in the body.",
              "Select Send.",
            ],
          },
          {
            type: "image",
            src: `${IMG}/scheduling-assistant.png`,
            alt: "The Scheduling Assistant in new Outlook showing free and busy rows for Taylor Brooks, Dr. Anita Patel and Denise Carter on Thursday, with 3:00 to 3:30 PM open for everyone",
            caption: "Busy time is shaded. Look for a column where everyone is free.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Book the meeting",
            prompt: "Put the steps for scheduling a meeting in order.",
            items: [
              { id: "s1", text: "Select New event in Calendar" },
              { id: "s2", text: "Type a title and invite attendees" },
              { id: "s3", text: "Open the Scheduling Assistant and find a time everyone is free" },
              { id: "s4", text: "Add the location and a short agenda" },
              { id: "s5", text: "Select Send" },
            ],
            explanation: "Invite people before you open the Scheduling Assistant, so their free and busy times are there when you look.",
          },
          {
            type: "callout",
            variant: "info",
            text: "What you can see in the Scheduling Assistant depends on your organization. Inside one Microsoft 365 organization you usually see coworkers' free and busy times; people outside it usually don't appear.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Organizer", definition: "The person who sent the invitation. Only the organizer can change or cancel the meeting." },
              { term: "Required attendee", definition: "Someone the meeting needs. Listed under Invite attendees." },
              { term: "Optional attendee", definition: "Someone who is welcome but not needed, such as a person who only needs to know it's happening." },
              { term: "Free/busy", definition: "The availability Outlook shares for scheduling: free, busy, tentative, out of office or working elsewhere." },
            ],
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A billing review is scheduled during your front desk shift, but you need to attend. What's the best response?",
            options: ["Decline without a message", "Ignore it", "Propose new time with a short note", "Accept and skip your shift"],
            correctIndex: 2,
            explanation: "Propose new time keeps you in the meeting and gives the organizer a time that works.",
            optionRationales: [
              "Declining silently leaves the organizer guessing why.",
              "Ignoring an invitation leaves the organizer without a count.",
              "Correct.",
              "Leaving the desk uncovered causes a bigger problem.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Where do you see when every attendee is free before you send a meeting?",
            options: ["The Scheduling Assistant", "The Sent Items folder", "The People module", "My Day"],
            correctIndex: 0,
            explanation: "The Scheduling Assistant shows each attendee's free and busy times side by side.",
            optionRationales: ["Correct.", "Sent Items shows what you sent, not availability.", "People shows contact details, not schedules.", "My Day shows your own day."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice answering and organizing meetings.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "With a classmate or coworker, send each other one meeting invitation from your own Outlook (new Outlook or Outlook on the web). Accept one, respond Tentative to another (and reply with a short note if it helps), or propose a new time.",
          "Schedule a 30-minute meeting with at least two people. Open the Scheduling Assistant first and pick a time when everyone is free. Take a screenshot of the Scheduling Assistant before you send.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
          "Write one or two sentences explaining why you chose the time you did.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your screenshot or your Challenge Lab results page (Print or save results), plus your explanation, to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "recurring-teams",
    title: "Recurring Meetings, Teams Meetings, and Cancellations",
    description:
      "Set up meetings that repeat, add a Microsoft Teams link so people can join from anywhere, change one occurrence or the whole series, and cancel a meeting the right way.",
    objectives: [
      "Create a meeting that repeats on a schedule",
      "Turn a meeting into a Teams meeting, including one already on the calendar",
      "Choose whether to change one occurrence or the whole series",
      "Cancel a meeting you organized so attendees are told",
    ],
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/aqtyuHID-i0",
    slides: outlookSlides["module-4/recurring-teams"],
    sections: [
      {
        heading: "Meetings that repeat",
        blocks: [
          {
            type: "scenario",
            role: "You organize meetings for the Lakeside front desk team.",
            text: "Starting next week, Denise wants a 15-minute huddle every Monday morning before the doors open. Keisha works from home on Tuesdays and needs to join your check-in online. The kiosk vendor just canceled Wednesday's demo.",
            task: "Set up the weekly huddle once, add a Teams link where it's needed, and cancel the demo so everyone knows.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Create the event as usual: New event, title, attendees, date and time.",
              "Make the event repeat: open the repeat options on the event, choose how often it repeats (for example, weekly on Monday) and when the series ends, and save that choice.",
              "The event now shows how it repeats. Select Send.",
            ],
          },
          {
            type: "paragraph",
            text: "A meeting in a series can be changed one occurrence at a time or as a whole. Opening one meeting from your calendar works on just that date; to change every occurrence, open the series (new Outlook shows View series for this). Choose carefully: moving the whole series when you meant to move one Monday changes everyone's calendar for months.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: select Make Recurring next to the start and end times, pick the pattern in the Appointment Recurrence box, set the range of recurrence, and select OK.",
          },
        ],
      },
      {
        heading: "Teams meetings",
        blocks: [
          {
            type: "paragraph",
            text: "Turn on Teams meeting in the event form and Outlook adds a Microsoft Teams link and join details to the invitation when you send it. Attendees join with one click from the invitation or their calendar. Teams meetings are built into new Outlook for work and school accounts; your organization decides whether they are available.",
          },
          {
            type: "list",
            items: [
              "New meeting: turn on Teams meeting before you select Send.",
              "Existing meeting you organized: double-click it, turn on Teams meeting, and select Send to send the update with the link.",
              "In-person and online: keep the room in the location and turn on Teams meeting so remote people can join.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Anyone who has a Teams meeting link can try to join. Send meeting invitations only to the people who need them, and don't paste the link into public places.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "One occurrence or the series?",
            prompt: "Sort each change by what you should edit.",
            buckets: [
              { id: "one", label: "Change just that occurrence" },
              { id: "series", label: "Change the whole series" },
            ],
            items: [
              { id: "c1", text: "Monday, November 9 is a holiday; skip that huddle", bucket: "one" },
              { id: "c2", text: "From now on, every huddle moves to the break room", bucket: "series" },
              { id: "c3", text: "This Monday only, start at 8:45 because of a delivery", bucket: "one" },
              { id: "c4", text: "Add Keisha to every future huddle", bucket: "series" },
            ],
            explanation: "One-time changes go on that one occurrence. Changes that should stick go on the series.",
          },
        ],
      },
      {
        heading: "Cancel a meeting the right way",
        blocks: [
          {
            type: "list",
            items: [
              "Right-click a meeting you organized and select Cancel, or open it and select Cancel. Add a short note, such as the reason or what happens next, and send the cancellation.",
              "Attendees get a cancellation message that lets them remove the meeting from their calendars.",
              "Don't just delete a meeting you organized and say nothing. Attendees would still show up.",
              "Only the organizer can cancel. If you were invited, Decline instead.",
            ],
          },
          {
            type: "worked-example",
            title: "Next week's calendar changes",
            task: "Set up the huddle, add Teams for Keisha, and cancel the vendor demo.",
            steps: [
              { move: "New event \"Front desk huddle\" with Omar and Priya, Monday 8:30 to 8:45 AM, repeating weekly on Monday, Teams meeting on, Send.", why: "One series replaces fifty separate invitations." },
              { move: "Open \"Billing workflow check-in\", turn on Teams meeting, Send.", why: "Keisha gets an update with a join link for her day at home." },
              { move: "Right-click \"Vendor demo\" › Cancel, add \"The vendor canceled; we'll reschedule\", send.", why: "Omar and Denise are told, and the time comes off their calendars." },
            ],
            result: "Every attendee's calendar is correct, and nobody waits for a meeting that isn't happening.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Next Monday's huddle has to move to 9:00 AM, but every other Monday stays at 8:30. What do you edit?",
            options: ["The whole series", "Just next Monday's occurrence", "Next Monday's occurrence and every one after it", "Delete the series and start over"],
            correctIndex: 1,
            explanation: "A one-time change goes on that one occurrence. The rest of the series stays the same.",
            optionRationales: [
              "Changing the series would move every Monday.",
              "Correct.",
              "That would move every huddle after next Monday too.",
              "Starting over is slower and sends everyone extra messages.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You organized a meeting that's no longer needed. What should you do?",
            options: ["Delete it from your calendar", "Cancel it so attendees get a cancellation", "Decline it", "Change its Show as to Free"],
            correctIndex: 1,
            explanation: "Cancel sends a cancellation, so the meeting comes off attendees' calendars too.",
            optionRationales: [
              "Deleting without telling anyone leaves the meeting on attendees' calendars.",
              "Correct.",
              "Decline is how an invitee responds; the organizer cancels.",
              "Show as only changes how the time appears on your calendar.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Set up a team routine.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your own Outlook (new Outlook or Outlook on the web), create a recurring Teams meeting for a real or practice team: a short check-in that repeats weekly. Invite at least one classmate or coworker.",
          "Change one occurrence only (for example, move one week to a different time) and leave the rest of the series alone. Take a screenshot of the calendar showing the change.",
          "Cancel the series when you're done and include a short note.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your screenshot or your Challenge Lab results page (Print or save results) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "sharing-time-zones",
    title: "Sharing Calendars, Delegates, and Time Zones",
    description:
      "Share your calendar at the right permission level, open calendars others share with you, understand what a delegate can do, and add a second time zone for people you work with in other places.",
    objectives: [
      "Share your calendar and choose the right permission level",
      "Explain the difference between edit access and delegate access",
      "Accept a calendar someone shares with you",
      "Add a second time zone to your calendar",
    ],
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/EcFNNJ1LA3o",
    slides: outlookSlides["module-4/sharing-time-zones"],
    sections: [
      {
        heading: "Who needs to see what?",
        blocks: [
          {
            type: "scenario",
            role: "You are the Lakeside front desk coordinator.",
            text: "Omar covers the front desk when you're away and needs to know where you are. Denise manages your meetings while you're at a training. Dr. Patel shared her calendar so you can book around her clinic hours. The billing service you call every Thursday is three hours behind you.",
            task: "Give each person exactly the access they need, open Dr. Patel's calendar, and show the billing service's time next to yours.",
          },
          {
            type: "paragraph",
            text: "In Calendar, select Share calendar on the Home tab. Type the person's name or email address, choose a permission level, and select Share. They get an invitation by email and accept it to add your calendar to their list. To change or remove someone's access later, open the same sharing window and change their permission.",
          },
          {
            type: "image",
            src: `${IMG}/sharing-time-zones/infographic.png`,
            alt: "Quick reference: calendar sharing permission levels from Can view when I'm busy to Delegate, with what each lets the other person do",
            caption: "Calendar permissions, from least to most access.",
          },
          {
            type: "table",
            caption: "Calendar permission levels in new Outlook",
            columns: ["Permission", "What the other person can do"],
            rows: [
              ["Can view when I'm busy", "See the times you're busy, with no titles or details"],
              ["Can view titles and locations", "See the times, titles and locations of your events"],
              ["Can view all details", "See everything about your events"],
              ["Can edit", "Create, change and delete events on your calendar"],
              ["Delegate", "Edit your calendar, and receive and respond to meeting invitations for you"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Event titles are visible to anyone who can view titles. Keep patient names and health details out of event titles and locations; use something like \"New patient intake\" instead of a patient's name.",
          },
        ],
      },
      {
        heading: "Delegates and shared calendars",
        blocks: [
          {
            type: "list",
            items: [
              "A delegate can create meetings and respond to meeting invitations on your behalf. Depending on the options you choose, invitations can go to your delegate as well as to you.",
              "Use Can edit when someone only needs to manage events on your calendar. Use Delegate when they also need to handle your meeting invitations, such as an office manager covering for you.",
              "When someone shares a calendar with you, open the sharing invitation in Mail and select Accept. The calendar appears under your calendar list, where you can turn it on or off.",
              "Delegate and sharing options depend on your organization's settings and account type.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Right access for the job",
            prompt: "Match each person to the permission that gives them what they need and no more.",
            items: [
              { id: "p1", text: "Can view when I'm busy", match: "A coworker in another department who only books meetings with you" },
              { id: "p2", text: "Can view titles and locations", match: "Omar, who needs to know where you are when he covers for you" },
              { id: "p3", text: "Can edit", match: "A teammate who adds front desk events to your calendar" },
              { id: "p4", text: "Delegate", match: "Denise, who answers your meeting invitations while you are at training" },
            ],
            explanation: "Give the least access that still lets each person do their job. You can always raise it later.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: Calendar › Home tab › Share Calendar opens Calendar Properties, where you add people and choose permissions. Delegates are added under File › Account Settings › Delegate Access.",
          },
        ],
      },
      {
        heading: "A second time zone",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "In Calendar, select the View tab › Calendar settings (or Settings › Calendar › View).",
              "Under time zones, select Add time zone and choose the time zone, for example (UTC-08:00) Pacific Time (US & Canada).",
              "Type a label, such as \"Billing service\", so you remember why it's there.",
              "Select Save. Day, Work week and Week views now show both times side by side.",
            ],
          },
          {
            type: "paragraph",
            text: "The same settings page has Display my calendar in time zone, which changes your own time zone. Use it if you move or travel; use Add time zone when you just need to see someone else's time.",
          },
          {
            type: "worked-example",
            title: "Before you call the billing service",
            task: "Avoid calling Seattle at 8:30 AM Eastern, when their office is still closed.",
            steps: [
              { move: "Add (UTC-08:00) Pacific Time with the label \"Billing service\".", why: "Their time appears next to yours on every day." },
              { move: "Check the column: 8:30 AM for you is 5:30 AM for them.", why: "Seeing both times prevents a call before they open." },
              { move: "Book the call for 1:00 PM Eastern (10:00 AM Pacific).", why: "It's well inside both offices' hours." },
            ],
            result: "Calls and meetings land inside everyone's working hours.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Omar needs to see where you are when he covers the desk, but not the details of your meetings. Which permission fits?",
            options: ["Can view when I'm busy", "Can view titles and locations", "Can view all details", "Delegate"],
            correctIndex: 1,
            explanation: "Titles and locations tell him where you are without sharing descriptions or attachments.",
            optionRationales: [
              "He would see only busy times, not where you are.",
              "Correct.",
              "More access than he needs.",
              "Delegate lets him act for you, which is far more than he needs.",
            ],
          },
          {
            type: "knowledge-check",
            question: "What can a delegate do that someone with Can edit can't?",
            options: ["See your event titles", "Create events on your calendar", "Receive and respond to meeting invitations for you", "Change the color of your calendar"],
            correctIndex: 2,
            explanation: "Both can manage events, but a delegate also handles meeting invitations on your behalf.",
            optionRationales: ["Both can see titles.", "Both can create events.", "Correct.", "Calendar colors are each person's own view setting."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Plan and set up calendar sharing for a small team.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a short sharing plan for the Lakeside front desk: list three people from this module (for example Omar, Denise and Priya), the permission you would give each, and one sentence explaining why.",
          "In your own Outlook (new Outlook or Outlook on the web), share your calendar with a classmate at Can view titles and locations and add a second time zone with a label. Take a screenshot of the calendar showing both time zones.",
          "On a school computer, do this in the Challenge Lab below instead of your own mailbox.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your sharing plan and either your screenshot or your Challenge Lab results page (Print or save results) to your instructor or course folder.",
      },
    ],
  },
];
