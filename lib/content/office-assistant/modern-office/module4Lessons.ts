import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "digital-calendar-fundamentals",
    title: "Digital Calendar Fundamentals",
    description:
      "Learn how to read, create, and manage events on a shared digital calendar without making costly mistakes.",
    duration: "15 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "On your first week at TOR Tech, your manager adds you to the shared Google Calendar. You need to understand how to read it, add events, and not accidentally delete or move something important. The shared calendar is the heartbeat of the office — everyone depends on it.",
          },
        ],
      },
      {
        heading: "Calendar Management Fundamentals",
        blocks: [
          {
            type: "paragraph",
            text: "A digital calendar is more than a schedule — it is a coordination tool for your entire team. Here is what you need to know to use it effectively:",
          },
          {
            type: "list",
            items: [
              "Creating events — click any time slot to create an event; always include a title, date, start/end time, and location or video link",
              "Setting reminders — add email or pop-up reminders so you and attendees never miss an event",
              "Recurring events — for meetings that repeat (weekly standups, monthly reviews), set the recurrence rule once instead of creating events manually",
              "Sharing calendars — share your calendar with teammates and set their permission level: view only, or edit access",
              "Viewing multiple calendars — overlay your personal calendar, team calendar, and company calendar to see conflicts at a glance",
              "Color-coding by category — assign a color to each calendar or event type (e.g., green for client calls, blue for internal meetings, red for deadlines)",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "When you have edit access to a shared calendar, be careful. Deleting or moving an event affects every attendee. Always confirm with your manager before changing an event you did not create.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are best practices for managing a shared office calendar in Google Calendar?\" Review the response and identify at least 2 practices you will apply to your own calendar this week.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What is the best way to add a weekly team standup that repeats every Monday?",
            options: [
              "Create a new event manually each Monday",
              "Set a recurring event with a weekly recurrence rule",
              "Send a reminder email to the team each week",
              "Add it to a spreadsheet as a weekly reminder",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create 5 events on a real or mock calendar for next work week. Your 5 events must include: 1 recurring team meeting, 1 client call, 1 project deadline, 1 lunch break or personal block, and 1 task reminder. Color-code at least 3 of the 5 events by category.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your calendar in week view showing all 5 events. Make sure the event titles are visible in the screenshot.",
      },
    ],
  },

  {
    slug: "booking-meetings",
    title: "Booking Meetings Professionally",
    description:
      "Learn how to check availability, write a proper meeting invite, and use scheduling tools to book meetings efficiently.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech asks you to schedule a 30-minute meeting between 3 team members for sometime next week. You need to check everyone's availability, choose a time that works, write a clear invite, and send it — all without going back and forth more than once.",
          },
        ],
      },
      {
        heading: "Booking Meetings the Right Way",
        blocks: [
          {
            type: "paragraph",
            text: "Scheduling a meeting professionally means more than picking a time. It means making it easy for attendees to show up prepared:",
          },
          {
            type: "list",
            items: [
              "Checking attendee availability — view shared calendars or use the 'Find a Time' feature in Google Calendar before proposing a time",
              "Choosing meeting length — match the duration to the purpose; most check-ins need 15–30 minutes, not an hour",
              "Writing a clear meeting invite — include a descriptive title, the agenda (even 2–3 bullet points), the location or video link, and who is expected to attend",
              "Sending confirmations — once accepted, send a brief confirmation email with any materials attendees should review beforehand",
              "Using scheduling tools — Calendly and When2Meet let attendees self-select a time from your available slots, reducing back-and-forth entirely",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional calendar invite for a 30-minute project kickoff meeting with 3 team members.\" Use the structure as a model for the invite you write in the challenge.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What should you do before proposing a meeting time to attendees?",
            options: [
              "Schedule it for Monday morning and adjust if needed",
              "Check attendee availability using shared calendars or 'Find a Time'",
              "Pick any open slot on your own calendar",
              "Send an email asking everyone when they are free",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Write a complete meeting invite for a fictional client onboarding call. Your invite must include: a descriptive meeting title, the date and time, a list of attendees (use made-up names and roles), a short agenda with at least 3 bullet points, and a placeholder Zoom link (e.g., zoom.us/j/example).",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed meeting invite as a written document or copy-paste it into your course folder. It should be ready to send as-is.",
      },
    ],
  },

  {
    slug: "managing-conflicts",
    title: "Managing Schedule Conflicts",
    description:
      "Learn how to identify, prioritize, and professionally resolve scheduling conflicts in a busy office.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Two TOR Tech executives both requested meetings at the same time on the same day and you are the one who has to fix it. One is an internal strategy session. The other is a client presentation. You cannot cancel either — you have to figure out which one moves and how to communicate the change without damaging any relationship.",
          },
        ],
      },
      {
        heading: "Resolving Schedule Conflicts",
        blocks: [
          {
            type: "paragraph",
            text: "Schedule conflicts are inevitable in any busy office. The skill is resolving them quickly, professionally, and with the right priorities in mind:",
          },
          {
            type: "list",
            items: [
              "How to prioritize — external client meetings almost always take precedence over internal meetings. When both are internal, urgency and seniority of attendees guide the decision.",
              "Urgent vs important — not every conflict is a crisis. Decide if the meeting is time-sensitive (urgent) or just significant (important) before escalating.",
              "How to professionally reschedule — always reach out to the internal party first; be honest, apologetic, and proactive about proposing a new time",
              "Communicating changes to all parties — notify every attendee promptly when a time changes; never let someone show up to a cancelled meeting",
              "Preventing conflicts with buffer time — add 10–15 minute buffer blocks between meetings on shared calendars so back-to-back scheduling errors are visible before they become problems",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never cancel or reschedule a meeting on behalf of a manager without their explicit approval first. Always confirm with the person whose calendar you manage before making changes that affect their commitments.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional email rescheduling an internal team meeting that conflicts with a client call.\" Review the tone and structure, then adapt it for the conflict scenario in the challenge.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "When a client meeting and an internal meeting are scheduled at the same time, which generally takes priority?",
            options: [
              "The internal meeting — it was booked first",
              "The meeting with the most attendees",
              "The client meeting — external commitments take precedence",
              "Neither — reschedule both and start fresh",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "You have 3 meetings that all overlap on Thursday at 2:00 PM: a client product demo, an internal budget review, and a 1-on-1 check-in with your manager. Write a brief explanation of how you would resolve the conflict — which meeting keeps the 2pm slot and why. Then draft one professional rescheduling email for one of the meetings that must move.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit both your written conflict resolution reasoning and your drafted rescheduling email to your instructor.",
      },
    ],
  },

  {
    slug: "schedule-a-full-week",
    title: "Hands-On: Schedule a Full Week",
    description:
      "Put your calendar management skills to the test by planning and managing an entire work week from scratch.",
    duration: "30 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech is going on vacation and asks you to manage the office calendar for the week. You have a list of meetings to schedule, deadlines to track, and reminders to set — and you need to make sure nothing falls through the cracks while they are gone.",
          },
        ],
      },
      {
        heading: "Putting It All Together",
        blocks: [
          {
            type: "paragraph",
            text: "This lesson is an applied exercise that builds on every skill from this module. You are not learning a new concept — you are proving you can apply what you know in a realistic scenario:",
          },
          {
            type: "list",
            items: [
              "Calendar management — create properly formatted events with titles, times, and locations or links",
              "Meeting booking — schedule meetings that respect attendee availability and include agendas",
              "Conflict resolution — if two events overlap, resolve the conflict and document your reasoning",
              "Recurring events — set at least one recurring event so it appears each week automatically",
              "Out-of-office blocks — add a block to show when the manager is unavailable so no one books over their vacation",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a sample Monday through Friday work schedule for an office assistant managing a 5-person team.\" Use the response as inspiration for how to structure your week view in the challenge.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Why should you add buffer blocks between meetings on a shared office calendar?",
            options: [
              "To make the calendar appear less busy",
              "To give yourself time to check personal messages",
              "To surface scheduling conflicts before they become problems",
              "To signal to others that the calendar owner is unavailable",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Plan a full work week (Monday through Friday) on a real or mock calendar. Your week must include: 2 client meetings (with agendas), 1 recurring team standup (set it to repeat weekly), 3 task deadlines shown as all-day events or reminders, and 1 out-of-office block. Resolve any scheduling conflicts that arise and note how you resolved them.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed week view showing all events. Include a brief note (2–3 sentences) describing any conflict you encountered and how you resolved it.",
      },
    ],
  },
];
