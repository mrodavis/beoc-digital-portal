import { Lesson } from "@/types/lesson";

const IMG = "/images/google-workspace/module-7";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

/** Module 7: Google Calendar and Google Meet. Scenario: Parkview Property Management (fictional). */
export const gwModule7Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "calendar-basics",
    title: "Plan Your Week in Google Calendar",
    description:
      "Move around Google Calendar, create events and tasks, add notifications, and use separate calendars so the office's schedule stays easy to read.",
    objectives: [
      "Move around Google Calendar with Today, the arrows, the mini calendar, and the Day, Week, and Month views",
      "Create an event by clicking a time or with Create, and add details with More options",
      "Add a location and notifications, including an email notification, to an event",
      "Add a task with a date and mark it complete",
      "Create a new calendar and show or hide calendars",
    ],
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/wOgGpQLMbjg",
    slides: slides("calendar-basics", [
      "Google Calendar: the office's shared schedule",
      "The Calendar screen: Create, Today, views, My calendars",
      "Create an event in three clicks",
      "Notifications: a pop-up, an email, or both",
      "Tasks and separate calendars",
      "Quick check: event, task, or appointment schedule?",
    ]),
    sections: [
      {
        heading: "Your calendar at Parkview",
        blocks: [
          {
            type: "scenario",
            role: "You are the office assistant at Parkview Property Management.",
            text: "Denise Carter wants every inspection, showing, and vendor visit on a calendar, with reminders, so nothing depends on someone's memory. You also have your own to-dos, like ordering light bulbs for the Riverside Commons lobby.",
            task: "Set up Google Calendar so you can see the week at a glance and get reminded before anything starts.",
          },
          {
            type: "paragraph",
            text: "Google Calendar opens at calendar.google.com, or from the Google apps menu in Gmail. Like Gmail, it works the same with a personal Google Account and a work account on Google Workspace. Your main calendar has your name, and you can add more calendars for different kinds of events.",
          },
          {
            type: "table",
            caption: "The Google Calendar screen",
            columns: ["Part", "What it does"],
            rows: [
              ["Create (top left)", "Make a new Event, Task, or Appointment schedule"],
              ["Mini calendar", "Jump to any date"],
              ["My calendars / Other calendars", "Your calendars and ones shared with you. Check or uncheck a calendar to show or hide its events"],
              ["Today and the arrows", "Go back to today, or move to the previous or next day, week, or month"],
              ["View menu (top right)", "Switch between Day, Week, Month, and other views"],
              ["Settings menu (gear)", "Settings for time zones, notifications, and each calendar"],
            ],
          },
          {
            type: "key-terms",
            terms: [
              { term: "Event", definition: "Something at a set time, such as a meeting, a showing, or an inspection." },
              { term: "Task", definition: "A to-do with a date (and optionally a time) that you check off when it's done." },
              { term: "Notification", definition: "A reminder before an event: a pop-up notification or an email." },
              { term: "Calendar", definition: "A group of events with its own color, such as Leasing Showings. You can show, hide, and share each one." },
            ],
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
              "Click an empty time on the calendar (or select Create, then Event, or press Shift + C).",
              "Type a title in Add title and time and check the date and time.",
              "Select Save. To add more details first, select More options.",
              "For an event that lasts all day, such as a building's moving day, check All day.",
            ],
          },
          {
            type: "paragraph",
            text: "More options opens the full event page. There you can set the time, check All day, choose whether it repeats, add Google Meet video conferencing, add a location, set notifications, pick which calendar it belongs to, write a description, and add guests. Select Save at the top when you're done.",
          },
          {
            type: "worked-example",
            title: "Booking the fire alarm inspection",
            task: "Put Thursday's fire alarm inspection at Riverside Commons on the calendar, with reminders.",
            steps: [
              { move: "Click 9:00 AM on Thursday, type “Fire alarm inspection, Riverside Commons”, and select Save.", why: "Clicking the time fills in the date and a one-hour slot, so only the title is left to type." },
              { move: "Open the event, select Edit event, and add the location.", why: "Anyone who opens the event sees where to go without asking." },
              { move: "Add an email notification 1 day before, and keep the 30-minute pop-up.", why: "The email gives a day to notify tenants; the pop-up is the last reminder before the inspector arrives." },
              { move: "Select Save.", why: "Changes on the event page aren't kept until you save." },
            ],
            result: "The inspection is on the calendar with a location and two reminders.",
            takeaway: "Put everything with a time on the calendar, and add the reminders you'd need if you forgot it completely.",
          },
        ],
      },
      {
        heading: "Notifications",
        blocks: [
          {
            type: "paragraph",
            text: "To change the reminders on one event, open it, select Edit event, and under the notifications choose a notification (a pop-up on your screen or phone) or an email, and how long before. Select Add notification for another one, then Save. To change the reminders Calendar adds to every new event, open Settings, choose your calendar under Settings for my calendars, and edit Event notifications.",
          },
          {
            type: "tip",
            text: "If pop-up notifications never appear on your computer, your browser may be blocking them. Allow notifications for calendar.google.com in your browser's site settings.",
          },
        ],
      },
      {
        heading: "Tasks and separate calendars",
        blocks: [
          {
            type: "paragraph",
            text: "A task is a to-do with a date. Select Create, then Task (or click a time and choose Task), type a title, set the date and an optional time, and select Save. Tasks with a date show on your calendar when Tasks is checked under My calendars. When you finish, open the task and mark it completed. You can also open Tasks from the side panel in Gmail and Calendar.",
          },
          {
            type: "paragraph",
            text: "Separate calendars keep different kinds of events apart. To make one, next to Other calendars select Add other calendars (+), then Create new calendar. Give it a name and description, and select Create calendar. Each calendar gets its own color, and you can check or uncheck it to show or hide its events. To remove one from the list entirely, point to it and choose Options, then Hide from list.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Event, task, or appointment schedule?",
            prompt: "Drag each item to what you'd create in Google Calendar.",
            buckets: [
              { id: "event", label: "Event" },
              { id: "task", label: "Task" },
              { id: "appt", label: "Appointment schedule" },
            ],
            items: [
              { id: "a", text: "Fire alarm inspection Thursday 9:00 to 10:00 AM", bucket: "event" },
              { id: "b", text: "Order lobby light bulbs by Friday", bucket: "task" },
              { id: "c", text: "Times tenants can book a 30-minute call with the office", bucket: "appt" },
              { id: "d", text: "Weekly staff huddle every Monday at 9:00 AM", bucket: "event" },
              { id: "e", text: "Renew the office's domain name before the end of the month", bucket: "task" },
              { id: "f", text: "Open slots for applicants to book apartment tours", bucket: "appt" },
            ],
            explanation: "Events happen at a time. Tasks are things you check off by a date. Appointment schedules offer open times that other people book.",
          },
          {
            type: "callout",
            variant: "info",
            text: "If you also use Outlook, its calendar works much the same way. Google Calendar's Tasks play the role that Microsoft To Do plays next to Outlook.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want an email reminder the day before an inspection. Where do you set it?",
            options: ["In Gmail's Settings", "On the event: Edit event › notifications › Email, 1 day before › Save", "In the mini calendar", "You can't; Calendar only shows pop-ups"],
            correctIndex: 1,
            explanation: "Each event can have several notifications, and each one can be a pop-up notification or an email.",
            optionRationales: ["Gmail settings don't control event reminders.", "Correct.", "The mini calendar is for moving between dates.", "Calendar offers email notifications too."],
          },
          {
            type: "knowledge-check",
            question: "What's the difference between hiding a calendar by unchecking it and choosing Hide from list?",
            options: ["There's no difference", "Unchecking hides its events for now; Hide from list removes it from the left panel", "Unchecking deletes the calendar", "Hide from list deletes its events"],
            correctIndex: 1,
            explanation: "Unchecking is a quick on/off switch. Hide from list takes the calendar out of the list; you can bring it back from Settings.",
            optionRationales: ["They do different things.", "Correct.", "Unchecking never deletes anything.", "Hiding doesn't delete events."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use Google Calendar with your own Google Account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create an event called “Study session” for a time this week, with the location “BEOC”.",
          "Edit it to add an email notification 1 day before. Save.",
          "Create a task called “Finish Module 7 challenge” with a date.",
          "Create a new calendar named “BEOC Classes” and move the study session to it (Edit event › choose the calendar › Save).",
          "Take a screenshot of the week view showing the event in its new color and the task.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your screenshot to your instructor or course folder. If you can't use Google Calendar on your computer, complete the practice simulation and submit its results page (Print or save results on the finish card)." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "invite-and-find-a-time",
    title: "Invite Guests, Find a Time, and Answer Invitations",
    description:
      "Invite coworkers and clients, pick a time everyone is free with Find a time, add a Google Meet link, answer invitations, and schedule across time zones.",
    objectives: [
      "Add guests to an event, mark a guest optional, choose guest permissions, and send invitations",
      "Use Find a time to choose a time when your guests are free",
      "Add Google Meet video conferencing to an event",
      "Answer an invitation with Yes, No, or Maybe, and know where to add a note or propose a new time",
      "Schedule an event in another time zone and show a secondary time zone on your calendar",
    ],
    duration: "25 min",
    slides: slides("invite-and-find-a-time", [
      "Invite guests: Guests panel, optional guests, permissions",
      "Find a time: everyone's busy times side by side",
      "Add Google Meet video conferencing",
      "Answer an invitation: Yes, No, or Maybe",
      "Time zones: the event's zone and your secondary zone",
      "Quick check: which answer or setting?",
    ]),
    sections: [
      {
        heading: "Invite guests",
        blocks: [
          {
            type: "scenario",
            role: "You schedule meetings for Parkview's office.",
            text: "Denise wants a lease renewal review with Priya on Thursday, at the first hour all three of you are free. Grace Holloway, the owner of Riverside Commons, lives in Los Angeles and needs a call at a time that makes sense for her. And two invitations are waiting for your answer.",
            task: "Schedule meetings people can actually attend, and answer invitations so organizers know who's coming.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Open the event's full page (create the event and select More options, or open an event and select Edit event).",
              "On the right, under Guests, start typing a name or email and choose the person.",
              "To make someone optional, select Mark optional next to their name.",
              "Under Guest permissions, choose whether guests can modify the event, invite others, or see the guest list.",
              "Select Save. Calendar asks whether to send invitation emails to the guests; choose Send to email them.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Guests answer Yes, No, or Maybe from the invitation email or from their own calendar. You'll see their answers on the event.",
          },
        ],
      },
      {
        heading: "Find a time",
        blocks: [
          {
            type: "paragraph",
            text: "After you add guests on the event page, open the Find a time tab. It shows your calendar and your guests' calendars side by side for that day, with busy times blocked out. Click a time when everyone is free and the event moves there. You can only see someone's busy times if they share their calendar with you or their calendar is shared within your organization; if not, you can ask them to share it.",
          },
          {
            type: "worked-example",
            title: "Scheduling the lease renewal review",
            task: "Find the first free hour after 1:00 PM on Thursday for you, Denise, and Priya.",
            steps: [
              { move: "Create the event, name it, set Thursday, and select More options.", why: "Find a time is on the full event page." },
              { move: "Add Denise and Priya under Guests.", why: "Find a time can only show people who are on the guest list." },
              { move: "Open Find a time and look at the three columns after 1:00 PM.", why: "Denise is busy 1:00 to 2:00 and Priya is busy 3:00 to 4:00, so 2:00 to 3:00 is the first hour everyone is free." },
              { move: "Click 2:00 PM, add Google Meet video conferencing, and select Save, then Send.", why: "The Meet link lets anyone join from wherever they are, and the invitation puts it on their calendars." },
            ],
            result: "A one-hour review on Thursday at 2:00 PM that everyone can attend, with a Meet link.",
            takeaway: "Add guests first, then use Find a time instead of trading emails about availability.",
          },
          {
            type: "paragraph",
            text: "To add a video call to any event, select Add Google Meet video conferencing on the event. Calendar creates a meeting link that every guest can use; it appears on the event and in the invitation.",
          },
        ],
      },
      {
        heading: "Answer an invitation",
        blocks: [
          {
            type: "paragraph",
            text: "Open the event on your calendar and choose Yes, No, or Maybe next to Going?. You can also answer from the invitation email in Gmail. To explain your answer, select the arrow next to Maybe and choose Add note; your note is visible to all invitees. If the time doesn't work, choose Propose a new time from the same menu, pick a different time, and select Send proposal. (Propose a new time isn't available for all-day events or events with more than 200 guests.)",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "How would you answer?",
            prompt: "Drag the best response onto each invitation.",
            items: [
              { id: "a", text: "The weekly leasing huddle, and you're free", match: "Yes" },
              { id: "b", text: "An owner call that may overlap with a showing you can't move", match: "Maybe, with a note" },
              { id: "c", text: "A vendor demo during your vacation", match: "No" },
              { id: "d", text: "A meeting you must attend, but the time conflicts with a doctor's appointment", match: "Propose a new time" },
            ],
            explanation: "Answer every invitation so the organizer can plan. A note or a proposed time saves a round of emails.",
          },
        ],
      },
      {
        heading: "Time zones",
        blocks: [
          {
            type: "paragraph",
            text: "Calendar shows events in your time zone, and each guest sees the event in their own time zone. When you schedule with someone in another zone, you can set the event in their zone: on the event page, select Time zone next to the time and choose theirs. To keep another zone in view, open Settings › General › Time zone, check Show additional time zones, and choose a Secondary time zone. It appears as a second column of times next to yours.",
          },
          {
            type: "table",
            caption: "One call, two clocks",
            columns: ["Grace Holloway in Los Angeles sees", "You in New York see"],
            rows: [["1:00 PM to 1:30 PM Pacific Time", "4:00 PM to 4:30 PM Eastern Time"]],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Before you send an invitation across time zones, check the time on your own calendar. A call set for 1:00 PM in Los Angeles is 4:00 PM in New York.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Find a time shows Priya's whole day as unknown instead of free or busy. Why?",
            options: ["Priya hasn't shared her calendar with you", "Priya is on vacation", "Find a time only works on Mondays", "You forgot to add Google Meet"],
            correctIndex: 0,
            explanation: "You can only see busy times on calendars shared with you or within your organization. You can ask Priya to share hers.",
            optionRationales: ["Correct.", "Vacation would show as busy if you could see her calendar.", "Find a time works any day.", "A Meet link doesn't affect availability."],
          },
          {
            type: "knowledge-check",
            question: "You can attend an owner call but might be 10 minutes late. What's the best answer?",
            options: ["No", "Ignore the invitation", "Yes, with a note that you may be 10 minutes late", "Delete the event"],
            correctIndex: 2,
            explanation: "Answer and add a note (arrow next to Maybe › Add note) so the organizer knows what to expect.",
            optionRationales: ["You can attend, so No is misleading.", "Organizers rely on answers to plan.", "Correct.", "Deleting the event doesn't tell the organizer anything."],
          },
          {
            type: "knowledge-check",
            question: "Where do you add a second column of times for Pacific Time?",
            options: ["Settings › General › Time zone › Show additional time zones", "On every event's page", "In Gmail's settings", "In the mini calendar"],
            correctIndex: 0,
            explanation: "A secondary time zone is a Calendar setting, and it shows on every day and week view.",
            optionRationales: ["Correct.", "The event page sets one event's zone, not your view.", "Gmail doesn't control Calendar's view.", "The mini calendar only picks dates."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use your own Google Calendar." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create an event called “Practice video call” and select Add Google Meet video conferencing. Save it.",
          "If a classmate or family member agrees, add their email as a guest and send the invitation. (Otherwise, skip this step.)",
          "Open Settings › General › Time zone and add a secondary time zone for a city where someone you know lives.",
          "Take a screenshot of your week view showing both time columns and the event with its Meet link open.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your screenshot and one sentence explaining when you'd use Find a time. If you can't use Google Calendar, complete the practice simulation and submit its results page." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "share-calendars-and-booking",
    title: "Share Calendars and Offer Bookable Appointments",
    description:
      "Share a calendar with coworkers at the right permission level, understand the risk of a public calendar, and set up an appointment schedule so people can book time with you.",
    objectives: [
      "Share a calendar with specific people and choose the right permission level",
      "Explain what making a calendar public does and when not to",
      "Create an appointment schedule with a duration, weekly availability, and a booking form",
      "Copy a booking page link to share",
    ],
    duration: "20 min",
    slides: slides("share-calendars-and-booking", [
      "Share a calendar: Settings and sharing › Shared with",
      "Five permission levels, from free/busy to manage sharing",
      "Public calendars: visible to the world",
      "Appointment schedules: open times others can book",
      "Share your booking page",
      "Quick check: which permission?",
    ]),
    sections: [
      {
        heading: "Share a calendar",
        blocks: [
          {
            type: "scenario",
            role: "You keep the Leasing Showings calendar for Parkview.",
            text: "Andre Wallace, the leasing agent, needs to see every showing. Kim Nguyen needs to add and change showings when maintenance work moves them. And Denise is tired of tenants emailing back and forth to set up quick calls with the office.",
            task: "Give each person exactly the access they need, and let tenants book their own times.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "In the left panel under My calendars, point to the calendar and select Options (three dots), then Settings and sharing.",
              "On the left, select Shared with, then Add people and groups.",
              "Type the person's email address or name.",
              "Choose a permission level, then select Send.",
            ],
          },
          {
            type: "table",
            caption: "Permission levels",
            columns: ["Permission", "They can"],
            rows: [
              ["See only free/busy (hide details)", "See when you're busy, but not what the events are"],
              ["See event details", "See every event's details, but not change them"],
              ["Make changes (see private events as free/busy)", "Add and change events; private events show only as busy"],
              ["Make changes and see event details", "Add and change events and see all details"],
              ["Make changes and manage sharing", "Everything you can do, including sharing the calendar with others"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the permission",
            prompt: "Drag the permission each person needs onto their situation.",
            items: [
              { id: "a", text: "Andre needs to see what each showing is and where, but shouldn't change them.", match: "See event details" },
              { id: "b", text: "Kim moves and adds showings when repairs run long.", match: "Make changes and see event details" },
              { id: "c", text: "A vendor only needs to know when the office is busy.", match: "See only free/busy (hide details)" },
              { id: "d", text: "Denise, as office manager, decides who else gets access.", match: "Make changes and manage sharing" },
            ],
            explanation: "Give each person the least access that lets them do their job. You can always raise it later.",
          },
        ],
      },
      {
        heading: "Public calendars",
        blocks: [
          {
            type: "paragraph",
            text: "In Settings and sharing, under Access permissions for events, Make available to public lets anyone see the calendar, including through Google search. That suits something like a community room's open hours. It doesn't suit a calendar with tenants' names, unit numbers, or anyone's personal appointments.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never make a calendar public if it holds names, addresses, phone numbers, or other personal details. Share it with specific people instead.",
          },
        ],
      },
      {
        heading: "Appointment schedules",
        blocks: [
          {
            type: "paragraph",
            text: "An appointment schedule offers open times that other people book on a booking page, so nobody has to email back and forth. You can create one with a personal Google Account or a Google Workspace account on a computer (not in the Calendar phone app). Some features need an eligible Google Workspace or Google One subscription, and a work account's administrator may need to turn it on.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select Create, then Appointment schedule.",
              "In the Bookable appointment schedule panel, add a title and choose the Appointment duration.",
              "Under General availability, set the days and hours you're available each week.",
              "Optionally set the Scheduling window (how far ahead people can book; the shortest notice is 4 hours by default) and Booked appointment settings such as buffer time and a daily limit.",
              "Select Next. Choose the location or video conferencing, add a description, and set up the booking form. First name, last name, and email are always required; you can add items such as a phone number and require email verification.",
              "Select Save.",
            ],
          },
          {
            type: "paragraph",
            text: "To share it, find it under Booking pages on the left side of Calendar, point to it, and select Copy link. Paste the link into an email or your website. A booking page is always public: anyone with the link can see the booking page, your profile photo, and your account name.",
          },
          {
            type: "tip",
            text: "Give the schedule a title tenants will understand, such as “Tenant office hours”, and keep the description short: what the call is for and what to have ready.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A coworker should be able to add events to your calendar but not share it with anyone else. Which permission?",
            options: ["See only free/busy (hide details)", "See event details", "Make changes and see event details", "Make changes and manage sharing"],
            correctIndex: 2,
            explanation: "Make changes and see event details lets them edit events; only manage sharing lets them share the calendar.",
            optionRationales: ["They couldn't add events.", "They could only look.", "Correct.", "That would let them share the calendar too."],
          },
          {
            type: "knowledge-check",
            question: "Who can see your appointment schedule's booking page?",
            options: ["Only people in your organization", "Anyone who has the link", "Only your Contacts", "Nobody until you approve them"],
            correctIndex: 1,
            explanation: "Booking pages are always public. Anyone with the link sees the page, your profile photo, and your account name.",
            optionRationales: ["Booking pages aren't limited to your organization.", "Correct.", "There's no Contacts-only option.", "People book directly from the page."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use your own Google Calendar on a computer." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create an appointment schedule called “Study help” with 30-minute appointments on two weekday afternoons.",
          "Add a phone number field to the booking form and save.",
          "Under Booking pages, copy the link, paste it into a new browser tab, and take a screenshot of your booking page.",
          "Optional: delete the schedule afterward if you don't want to keep it.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit the screenshot of your booking page. If you can't create one, complete the practice simulation and submit its results page." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "join-and-take-part-in-meet",
    title: "Join and Take Part in a Google Meet Call",
    description:
      "Join Google Meet calls from Calendar, a link, or a code; check your camera and microphone; use captions, chat, reactions, and raise hand; present a tab or window; and leave cleanly.",
    objectives: [
      "Join a Google Meet call from Google Calendar, a link, or a meeting code",
      "Check your microphone, camera, and visual effects before you join",
      "Use captions, chat, reactions, and raise hand during a call",
      "Present a tab, a window, or your entire screen, and stop presenting",
      "Change the layout, find Meeting tools, explain when recording is available, and leave the call",
    ],
    duration: "25 min",
    videoUrl: "https://www.youtube.com/embed/9Y8BRUKQmqY",
    slides: slides("join-and-take-part-in-meet", [
      "Three ways to join a Google Meet call",
      "Before you join: microphone, camera, effects",
      "The Meet controls at the bottom of the screen",
      "Present now: a tab, a window, or your entire screen",
      "Layouts, Meeting tools, and recording",
      "Quick check: which control?",
    ]),
    sections: [
      {
        heading: "Join a call",
        blocks: [
          {
            type: "scenario",
            role: "You join Parkview's weekly leasing huddle from a busy front office.",
            text: "The huddle starts in two minutes. Coworkers are talking behind you, Andre will ask you about the showing calendar, and Denise wants you to share the lease renewal slides.",
            task: "Join on time, sound and look professional, take part without interrupting, and share only what you mean to share.",
          },
          {
            type: "table",
            caption: "Three ways to join",
            columns: ["From", "Do this"],
            rows: [
              ["Google Calendar", "Open the event and select Join with Google Meet"],
              ["A link in an email or chat", "Click the meet.google.com link"],
              ["A meeting code", "Go to meet.google.com, type the code in Enter a code or nickname, and select Join"],
            ],
          },
          {
            type: "paragraph",
            text: "You see a preview screen before you join. If you're on the invitation and signed in, select Join now. If you aren't on the invitation, or you aren't signed in to a Google Account, select Ask to join; someone in the meeting has to let you in.",
          },
        ],
      },
      {
        heading: "Before you join",
        blocks: [
          {
            type: "list",
            items: [
              "Use the microphone and camera buttons on the preview to turn each one on or off. A red button means it's off.",
              "Select Apply visual effects to blur your background or choose a background image, which hides a busy office or a home.",
              "Use More options › Settings to pick a different microphone, speaker, or camera, and to test your speakers.",
              "Then select Join now (or Ask to join).",
            ],
          },
          {
            type: "tip",
            text: "Join with your microphone off in a noisy place, and turn it on when you speak. Keyboard shortcut: Ctrl + D turns the microphone on or off and Ctrl + E does the same for the camera.",
          },
        ],
      },
      {
        heading: "During the call",
        blocks: [
          {
            type: "image",
            src: `${IMG}/join-and-take-part-in-meet/infographic.png`,
            alt: "Quick reference: Google Meet controls for joining, getting ready, taking part, presenting, and leaving.",
            caption: "Google Meet controls at a glance.",
          },
          {
            type: "table",
            caption: "Meet controls",
            columns: ["Control", "What it does"],
            rows: [
              ["Microphone and camera", "Turn your audio and video on or off"],
              ["Turn on captions (CC)", "Shows live captions at the bottom. Change their font and size in More options › Settings › Captions"],
              ["Send a reaction", "Shows an emoji such as a thumbs up for a moment, without interrupting"],
              ["Present now", "Share a tab, a window, or your entire screen"],
              ["Raise hand (hand icon)", "Lets the speaker know you have a question. It lowers when you speak, or select Lower hand"],
              ["More options (three dots)", "Change layout, full screen, visual effects, and settings"],
              ["Leave call (red)", "Leaves the meeting"],
              ["Bottom right", "Meeting details (joining info), People, Chat, and Meeting tools"],
            ],
          },
          {
            type: "paragraph",
            text: "Select Chat at the bottom right to send messages to everyone in the call. Unless your organization uses continuous meeting chat, people who join late don't see earlier messages, and the messages disappear when the call ends, so don't put anything there that needs to be kept.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which control?",
            prompt: "Drag the control onto what you need to do.",
            items: [
              { id: "a", text: "You have a question but don't want to interrupt the speaker.", match: "Raise hand" },
              { id: "b", text: "It's hard to hear the speaker over the office noise.", match: "Turn on captions" },
              { id: "c", text: "You want to show your slides to everyone.", match: "Present now" },
              { id: "d", text: "You agree with Denise's point without speaking.", match: "Send a reaction" },
              { id: "e", text: "You need to post the link to the showing calendar.", match: "Chat" },
            ],
            explanation: "Meet gives you quiet ways to take part: captions to follow along, reactions and chat to respond, and raise hand to get a turn.",
          },
        ],
      },
      {
        heading: "Present your screen",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select Present now.",
              "Choose A tab, A window, or Your entire screen.",
              "Pick the tab or window and select Share.",
              "When you're done, select Stop presenting.",
            ],
          },
          {
            type: "paragraph",
            text: "Presenting a tab shares that tab's sound too. For a window or your entire screen, turn on Also share system audio in the sharing window if people need to hear it. A meeting allows up to 10 presentations at the same time, and your organization's settings or the meeting host can turn presenting off.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Share a tab or a window, not your entire screen, whenever you can. Your entire screen shows everything, including email notifications and any tenant information that pops up.",
          },
        ],
      },
      {
        heading: "Layouts, Meeting tools, and recording",
        blocks: [
          {
            type: "paragraph",
            text: "To change how people appear, select More options › Change layout. Auto (dynamic) is the default and adjusts to the meeting. Tiled (legacy) shows people in a grid. Spotlight fills the window with the speaker or the presentation. Sidebar shows the speaker or presentation large with others at the side.",
          },
          {
            type: "paragraph",
            text: "Meeting tools at the bottom right holds features such as Recording. Recording is only available with certain Google Workspace editions (and Google One plans with 2 TB or more), and an administrator has to allow it; a free personal account can't record. When a meeting is recorded, the recording is saved to the organizer's Google Drive in a Google Meet folder.",
          },
          {
            type: "callout",
            variant: "info",
            text: "If you use Microsoft Teams, the ideas carry over: Teams also has raise hand, reactions, live captions, chat, and sharing a window or screen.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You're joining from a loud front office. What should you do on the preview screen?",
            options: ["Join with your microphone on", "Turn off your microphone, consider blurring your background, then join", "Turn off your camera and microphone and never turn them on", "Leave and rejoin later"],
            correctIndex: 1,
            explanation: "Start muted in a noisy place and turn the microphone on when you speak. A blurred background hides the busy office.",
            optionRationales: ["Background noise disrupts the call.", "Correct.", "You'll need to speak when it's your turn.", "Joining late isn't necessary."],
          },
          {
            type: "knowledge-check",
            question: "Which is the safest way to show one slide deck?",
            options: ["Present now › Your entire screen", "Present now › A tab, and choose the slides' tab", "Email the slides during the call", "Hold your phone up to the camera"],
            correctIndex: 1,
            explanation: "Sharing one tab shows only that tab, so notifications and other windows stay private.",
            optionRationales: ["Everything on your screen would be visible, including pop-ups.", "Correct.", "That doesn't let you walk people through it live.", "That's hard to see and unprofessional."],
          },
          {
            type: "knowledge-check",
            question: "Can you record a Google Meet call with a free personal Google Account?",
            options: ["Yes, always", "No; recording needs an eligible Google Workspace edition or a Google One plan with 2 TB or more", "Only on Mondays", "Only if you're presenting"],
            correctIndex: 1,
            explanation: "Recording depends on your edition and your administrator's settings.",
            optionRationales: ["Recording isn't included with free personal accounts.", "Correct.", "Days don't matter.", "Presenting doesn't affect recording."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Try Google Meet with your own Google Account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Go to meet.google.com, select New meeting, then Start an instant meeting. (You'll be the only one in it.)",
          "Turn your microphone off and on, and blur your background with Apply visual effects or More options.",
          "Turn on captions and say a sentence to see them appear.",
          "Select Present now › A tab and share any tab. Then select Stop presenting.",
          "Change the layout to Spotlight, take a screenshot, and leave the call.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your screenshot and one sentence about which Meet control you'll use most at work. If you can't use a camera or Meet on your computer, complete the practice simulations and submit their results pages." },
    ],
  },
];
