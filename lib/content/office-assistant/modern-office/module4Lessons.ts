import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "digital-calendar-fundamentals",
    title: "Digital Calendar Fundamentals",
    description:
      "Learn how to read, create, and manage events on a shared digital calendar without making costly mistakes.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "On your first week at TOR Tech, your manager adds you to the shared Google Calendar. You need to understand how to read it, add events, and not accidentally delete or move something important. The shared calendar is the heartbeat of the office — every meeting, deadline, and client commitment lives there. A missing event means a missed meeting. A deleted event means a broken commitment.",
          },
        ],
      },
      {
        heading: "Why Calendar Hygiene Matters Professionally",
        blocks: [
          {
            type: "paragraph",
            text: "A shared digital calendar is not a personal organizer — it is a coordination infrastructure that the entire team depends on. Poor calendar hygiene has real consequences that go far beyond inconvenience:",
          },
          {
            type: "list",
            items: [
              "A meeting without a location or video link forces attendees to send follow-up messages to find out where to go — creating unnecessary friction before the meeting even starts.",
              "An event without a clear title looks like dead space on the calendar. Other team members cannot tell if a time block is a real commitment or an old placeholder.",
              "Events created without checking attendee availability will overlap with existing commitments. Double-booking a manager's calendar makes the entire organization look disorganized to clients and partners.",
              "Missing reminders mean you or your attendees may simply forget to show up — no matter how well-crafted the invite was.",
              "A well-managed calendar communicates competence before you say a word. Managers notice when their schedule is organized, accurate, and reliable.",
            ],
          },
        ],
      },
      {
        heading: "Anatomy of a Professional Calendar Event",
        blocks: [
          {
            type: "paragraph",
            text: "Every calendar event is a container for information. An incomplete event is an unreliable event. Here is every field that must be filled in before an event is considered complete:",
          },
          {
            type: "list",
            items: [
              "Title — write a clear, specific event title that communicates purpose: 'Q2 Budget Review with Finance Team' is a professional title. 'Meeting' is not. A good title tells attendees exactly what to expect before they click.",
              "Date and time — always set a precise start and end time. An event without an end time forces attendees to guess how long to block their schedule. Match the duration to the actual purpose of the meeting.",
              "Location or video link — if the meeting is in person, include the room name or address. If it is virtual, paste the Zoom, Teams, or Google Meet link directly into the location field. Never make attendees hunt for the link.",
              "Attendees — add every required participant by email so the event appears on their calendar and they receive the invite notification. Mark optional attendees as optional so they can prioritize appropriately.",
              "Description — use the description field to add the meeting agenda, any pre-read materials, or context the attendees need to arrive prepared. Even two bullet points of agenda items transforms an ambiguous invite into a purposeful one.",
              "Reminders — set at least one email or pop-up reminder. For external meetings or high-stakes events, set two: one day before and 15 minutes before. The default reminder on shared calendars is often set to 10 minutes, which is rarely enough.",
            ],
          },
        ],
      },
      {
        heading: "Recurring Events",
        blocks: [
          {
            type: "paragraph",
            text: "Recurring events are one of the most valuable — and most misused — features in any calendar system. When configured correctly, they eliminate the need to manually create the same meeting week after week. When configured incorrectly, they create chaos across an entire team's schedule:",
          },
          {
            type: "list",
            items: [
              "When to use recurrence — any meeting that happens on a consistent schedule (daily standups, weekly team syncs, monthly reviews, quarterly business reviews) should be set as a recurring event. One setup, zero ongoing maintenance.",
              "Setting the recurrence rule — when creating or editing an event, look for the 'Does not repeat' dropdown and change it to your needed frequency: Daily, Weekly, Monthly, or Custom. For a meeting that happens every Monday, select 'Weekly on Monday'.",
              "Custom recurrence options — use custom settings for meetings that occur every two weeks, only on weekdays, or with a specific end date. Avoid leaving recurrence set to 'Never ends' unless the meeting is truly indefinite.",
              "Editing a recurring event — when you edit a recurring event, the calendar will ask whether you want to change 'This event', 'This and following events', or 'All events'. Choose carefully — changing all events affects every past and future instance.",
              "Canceling a single instance vs. the series — if a standup is cancelled for one week due to a holiday, cancel only that one occurrence, not the entire recurring series. Deleting the series removes every future meeting from every attendee's calendar.",
              "Never create a recurring event you do not own without explicit permission from the calendar owner — recurring events generate notifications for every attendee every time they occur.",
            ],
          },
        ],
      },
      {
        heading: "Sharing & Permission Levels",
        blocks: [
          {
            type: "paragraph",
            text: "Sharing a calendar is a trust and access decision. Giving someone the wrong permission level can expose private commitments or accidentally allow edits to events they should not touch. Understand each permission level before granting access:",
          },
          {
            type: "list",
            items: [
              "View only (free/busy) — the lowest level of access. Colleagues can see when you are busy but cannot read event titles or details. Use this for general scheduling purposes where you want to share availability without exposing content.",
              "View all details — colleagues can read event titles, descriptions, and attendees but cannot make any changes. Appropriate for assistants who need to see the full picture but should not be able to edit.",
              "Edit access — colleagues can create, modify, and delete events on your calendar. Grant this only to trusted assistants or team members whose job specifically requires managing your schedule. Edit access means they can inadvertently delete client commitments.",
              "Make changes and manage sharing — the highest permission level. Grants full control including the ability to share the calendar with others. Grant this only to a primary calendar manager and never to someone whose role does not require it.",
              "When receiving edit access — treat another person's calendar with the same care you would give your own financial accounts. You are managing their professional time, which is their most valuable resource.",
            ],
          },
        ],
      },
      {
        heading: "Color-Coding & Multi-Calendar Overlays",
        blocks: [
          {
            type: "paragraph",
            text: "When you are managing multiple calendars — your own, your team's, and the company's — a single color-coded view is the difference between clarity and chaos. Use these techniques to make the week view instantly readable:",
          },
          {
            type: "list",
            items: [
              "Color-code by event type — assign a consistent color to each category of commitment. A common professional system: green for client calls, blue for internal meetings, red for deadlines, yellow for personal blocks, and grey for tentative or informational events.",
              "Apply color consistently across the entire team — if your organization uses a shared calendar, standardize color meanings in a team document so every assistant reads the calendar the same way.",
              "Overlay multiple calendars — in Google Calendar, enable multiple calendars in the left panel to overlay them in one view. A manager's travel calendar, the team's project calendar, and your personal calendar can all coexist in a single week view with different colors.",
              "Use descriptive calendar names — name calendars clearly when creating them: 'TOR Tech Client Calls' is more useful than 'Calendar 2' when you are switching between views.",
              "The goal of color-coding is instant orientation — you should be able to scan a week view and immediately know what kind of week you are looking at before reading a single event title.",
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
            text: "When you have edit access to a shared calendar, you are operating in a high-trust environment. Deleting or moving an event affects every attendee — including external clients who may have already made travel arrangements or blocked their own teams. Always confirm with your manager before changing, canceling, or deleting any event you did not personally create. When in doubt, add a note to the event description and ask — never act unilaterally on someone else's commitments.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the most important best practices for managing a shared office calendar in Google Calendar? Include common mistakes and how to avoid them.\" Review the response and identify at least 3 specific practices you will apply immediately to your own calendar setup.",
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
              "Create a new event manually each Monday morning",
              "Set a recurring event with a weekly recurrence rule",
              "Send a reminder email to the team each week",
              "Add it to a shared spreadsheet as a weekly reminder",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create 5 events on a real or mock Google Calendar for next work week. Each event must be fully completed — title, date, start and end time, location or video link, and at least one reminder. Your 5 events must include all of the following types:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "1 recurring team standup set to repeat weekly (Monday or Tuesday, 15 minutes)",
          "1 client call with a placeholder Zoom link in the location field and a 2-item agenda in the description",
          "1 project deadline shown as an all-day event with a description explaining what is due",
          "1 personal focus block with a clear title indicating the task (e.g., 'Focus Block: Q2 Report Draft')",
          "1 canceled or rescheduled event — create it, then cancel only that one occurrence and leave a note in the description explaining why",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your calendar in week view showing all 5 events with titles visible. Color-code at least 3 of the 5 events using different category colors and include a brief note (2–3 sentences) explaining your color-coding system.",
      },
    ],
  },

  {
    slug: "booking-meetings",
    title: "Booking Meetings Professionally",
    description:
      "Learn how to check availability, write a proper meeting invite, and use scheduling tools to book meetings efficiently.",
    duration: "25 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech asks you to schedule a 30-minute strategy meeting between three people: a project manager, a client success lead, and an external vendor. All three are busy. You need to check everyone's availability, pick a time that works without going back and forth more than once, write a clear invite, and send it — all before end of day. This is a daily task for office assistants, and doing it poorly wastes everyone's time.",
          },
        ],
      },
      {
        heading: "Why Professional Meeting Booking Matters",
        blocks: [
          {
            type: "paragraph",
            text: "A poorly booked meeting is more expensive than most people realize. When a meeting invite is missing information, attendees arrive unprepared. When a meeting is double-booked, someone has to choose between two commitments. When an invite has no agenda, the meeting drifts and rarely accomplishes its purpose. Booking meetings professionally sends a clear signal about organizational competence:",
          },
          {
            type: "list",
            items: [
              "An ambiguous meeting title ('Quick sync', 'Chat', 'Follow-up') forces attendees to wonder what they are walking into — they arrive unprepared and the first 10 minutes of a 30-minute meeting are spent re-establishing context.",
              "An invite without an agenda is an invitation to ramble. Meetings without a declared purpose almost always run over time and end without a clear outcome.",
              "A meeting booked without checking availability creates double-booking conflicts and forces attendees to choose between commitments, which creates resentment before the meeting even begins.",
              "A professionally booked meeting with a clear title, agenda, and location tells every attendee exactly what to expect, what to prepare, and where to show up — and that reflects directly on the person who sent the invite.",
            ],
          },
        ],
      },
      {
        heading: "Step 1 — Checking Attendee Availability",
        blocks: [
          {
            type: "paragraph",
            text: "Never propose a meeting time before checking whether attendees are free. Proposing a time that conflicts with someone else's existing commitments is one of the most common and avoidable scheduling mistakes. Both major calendar platforms have built-in tools to eliminate this problem:",
          },
          {
            type: "list",
            items: [
              "Google Calendar — Find a Time: When creating a new event and adding attendees' email addresses, click the 'Find a Time' tab next to 'Event Details'. This overlays all attendee calendars and highlights times when everyone is free simultaneously. Blocked slots appear grey; open times are white.",
              "Microsoft Outlook — Scheduling Assistant: Open a new meeting invite, add attendees, and click the 'Scheduling Assistant' tab. It displays every attendee's calendar side-by-side and marks conflicts in blue. Outlook also provides automatic 'Suggested Times' based on shared availability.",
              "When the attendee is external — external guests may not be visible on your calendar system. Use a scheduling tool (Calendly, When2Meet) and send them a booking link so they self-select from your available windows.",
              "Check for existing conflicts before any proposal — even if a time looks open, scan for travel time, recurring meetings, and out-of-office blocks that may not be visible to you.",
              "Availability windows — propose meeting times during core business hours (9am–5pm) in the attendee's time zone. If attendees are in different time zones, verify the meeting time converts correctly before sending the invite.",
            ],
          },
        ],
      },
      {
        heading: "Step 2 — Choosing the Right Meeting Length",
        blocks: [
          {
            type: "paragraph",
            text: "Most meetings are scheduled for 60 minutes by default, regardless of how much needs to be discussed. This is one of the most widespread inefficiencies in office work. Matching meeting duration to meeting purpose is a professional skill that your colleagues will notice and appreciate:",
          },
          {
            type: "list",
            items: [
              "15 minutes — status updates, quick decision-making, daily standups. If the meeting only requires a decision or a brief update, 15 minutes protects everyone's schedule.",
              "30 minutes — focused working sessions, problem-solving conversations, introductory calls. This is the default for most professional meetings and forces attendees to stay on topic.",
              "60 minutes — strategy sessions, kickoff meetings, complex reviews requiring deliberation. Reserve 60-minute blocks for meetings that genuinely require extended discussion.",
              "90+ minutes — workshops, training sessions, extended presentations. Any meeting requiring 90+ minutes should have breaks built in and should be a deliberate choice, not a default.",
              "The shorter the meeting, the more prepared everyone must be — a 15-minute decision meeting requires an agenda sent 24 hours in advance so attendees arrive ready to act.",
              "Avoid booking meetings for the full hour when 45 minutes will suffice. The extra 15 minutes becomes wasted time if the work is done, or becomes buffer time if it is not.",
            ],
          },
        ],
      },
      {
        heading: "Step 3 — Writing a Professional Meeting Invite",
        blocks: [
          {
            type: "paragraph",
            text: "A meeting invite is a professional document. It communicates purpose, requires preparation, and creates a shared commitment between everyone on the invite. Every field in the invite exists for a reason — filling each one correctly is what separates a professional invite from an ambiguous block on someone's calendar:",
          },
          {
            type: "list",
            items: [
              "Title — write the meeting's purpose, not its format. 'TOR Tech Q3 Vendor Onboarding Kickoff' is a professional title. 'Meeting with vendor' is not. The title should tell anyone who sees it on the calendar exactly what that block of time is for.",
              "Date and time with time zone — always include the time zone when booking with external guests or cross-regional attendees. '2:00 PM EST' removes all ambiguity. '2:00 PM' does not.",
              "Location or video link — paste the full meeting link (Zoom, Teams, Google Meet) directly in the location field so attendees can join with one click. If the meeting is in person, include the room name, floor, and building address.",
              "Attendees — add required attendees explicitly so the invite appears on their calendar. Mark anyone whose attendance is optional as an optional invitee — this respects their time and lets them make an informed decision about whether to attend.",
              "Agenda in the description — include at least 2–3 agenda items in the description field. Write them as action-oriented questions or objectives: 'Review current vendor pricing structure', 'Agree on onboarding timeline', 'Assign next steps and owners'. A good agenda is a contract: it tells everyone what will be decided by end of meeting.",
              "Pre-read materials — if attendees need to review anything before the meeting, attach the document or paste a link in the description. Include a clear line: 'Please review the attached brief before the call.'",
            ],
          },
        ],
      },
      {
        heading: "Scheduling Tools: Eliminating Back-and-Forth",
        blocks: [
          {
            type: "paragraph",
            text: "The most time-consuming part of scheduling a meeting is often the coordination — the back-and-forth of 'does Tuesday work?' and 'no, how about Thursday?' Scheduling tools eliminate this problem entirely by letting attendees self-select from pre-approved time slots:",
          },
          {
            type: "list",
            items: [
              "Calendly — connect your Google Calendar or Outlook calendar, set your available hours, and generate a unique booking link. Send the link to anyone you want to meet with. They see only your open slots and pick one — the event is automatically added to both calendars.",
              "When2Meet — a lightweight alternative for group scheduling with no account required. Create a meeting window, share the link, and attendees mark their available hours. When2Meet highlights the times when the most people are free simultaneously.",
              "Google Calendar appointment schedules — available within Google Calendar under 'Create > Appointment schedule'. Works like Calendly without leaving your existing calendar platform.",
              "When to use a scheduling tool vs. booking manually — use a tool for external guests, executives with busy calendars, or any meeting requiring more than one round of coordination. Book manually only when you have direct access to all attendees' calendars and the scheduling is simple.",
              "The professional approach — never ask 'when are you free?' in an email. Instead, send a scheduling link or propose 2–3 specific times. Putting the burden on the other person to generate options is inefficient and signals disorganization.",
            ],
          },
        ],
      },
      {
        heading: "Step 4 — Confirmation and Pre-Meeting Communication",
        blocks: [
          {
            type: "paragraph",
            text: "Sending the calendar invite is not the final step. A professional booking workflow includes a brief confirmation that closes the loop and ensures everyone arrives prepared:",
          },
          {
            type: "list",
            items: [
              "Send a confirmation email once the invite is accepted — a short 2–3 line email confirming the meeting, restating the time and location, and noting any pre-read materials. This is especially important for external guests who may use a different calendar system.",
              "Send a reminder for high-stakes meetings — for client calls, executive reviews, or any meeting that required significant coordination, send a brief reminder the morning of. Keep it professional and concise: 'Reminder: We have our Q3 kickoff call today at 2:00 PM EST. Zoom link: [link]. Looking forward to it.'",
              "Update the invite if anything changes — if the meeting time, location, or link changes after the invite is sent, update the calendar event and resend it. Do not rely on a separate email to communicate changes — the calendar event is the source of truth.",
              "Include a cancellation window — if a meeting needs to be cancelled, do so with at least 24 hours' notice when possible. Cancel through the calendar event so every attendee's calendar is updated automatically.",
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
            text: "Never book a meeting on behalf of your manager without their explicit approval on the topic, attendees, and proposed time. Confirming a meeting creates a professional commitment — if the details are wrong, your manager is the one who has to reschedule and apologize to the attendees. Always confirm the meeting details with your manager before sending, especially for client-facing invites. A calendar invite sent prematurely is harder to walk back than one sent after a quick confirmation.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional calendar invite for a 30-minute vendor onboarding kickoff meeting between a project manager, a client success lead, and an external vendor. Include a meeting title, agenda, video link placeholder, and a short pre-read note.\" Use the structure as a model when writing your own invite in the challenge, then customize every detail for the specific scenario.",
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
              "Schedule it for Monday morning and adjust if anyone has a conflict",
              "Check attendee availability using shared calendars or the Find a Time feature",
              "Pick any open slot on your own calendar and send the invite",
              "Ask everyone in a group email when they are free this week",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Write a complete, professional meeting invite for a fictional client onboarding kickoff call at TOR Tech. The meeting involves a TOR Tech project manager, a client success lead, and two external client contacts. Your invite must meet all five requirements below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a professional meeting title that communicates the meeting's purpose — not just 'Meeting' or 'Call'",
          "Include a specific date, start time, end time, and time zone (e.g., Thursday, June 12 at 2:00–2:30 PM EST)",
          "List all four attendees with made-up names and roles (e.g., 'Jordan Reeves, Project Manager, TOR Tech')",
          "Write a 3-item agenda in the description using action-oriented language (each item should state what will be decided or accomplished)",
          "Include a placeholder Zoom link in the location field and a pre-read instruction in the description (e.g., 'Please review the attached onboarding brief before the call')",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed meeting invite as a written document or paste it into your course folder. It should be ready to send as-is — every field filled in, no placeholder text remaining except the Zoom link.",
      },
    ],
  },

  {
    slug: "managing-conflicts",
    title: "Managing Schedule Conflicts",
    description:
      "Learn how to identify, prioritize, and professionally resolve scheduling conflicts in a busy office.",
    duration: "25 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Two TOR Tech executives both requested meetings at 2:00 PM on Thursday: one is an internal strategy session with the leadership team, the other is a client product demonstration for a major account. You are the one responsible for the calendar, and you cannot cancel either meeting outright. You have to determine which one moves, who gets notified, what to say, and how to communicate the change without damaging any relationship — all before someone shows up to the wrong meeting.",
          },
        ],
      },
      {
        heading: "Why Schedule Conflicts Are a Leadership Test",
        blocks: [
          {
            type: "paragraph",
            text: "Schedule conflicts are not a sign of failure — they are a normal part of managing a busy professional calendar. How you resolve them, however, is a direct indicator of your judgment, professionalism, and organizational awareness. A poorly handled conflict can damage relationships that took months to build:",
          },
          {
            type: "list",
            items: [
              "An unresolved conflict — where you wait and hope someone else notices — is the worst possible outcome. Someone will show up to a cancelled meeting they were never told was moved, and you will be the one who failed to communicate it.",
              "A poorly communicated reschedule — where you cancel without explanation or propose a new time without context — signals disorganization and disrespect for the other party's time.",
              "A well-handled conflict — where you identify the priority, notify the affected party proactively, explain the situation professionally, and propose a new time — can actually strengthen a relationship by demonstrating courtesy and accountability.",
              "The skill is not avoiding conflicts — it is resolving them faster and more gracefully than the people around you expect.",
            ],
          },
        ],
      },
      {
        heading: "Step 1 — Triage: Identifying the Priority",
        blocks: [
          {
            type: "paragraph",
            text: "Before you can resolve a conflict, you need to determine which meeting takes the time slot and which one moves. This is a prioritization decision that should follow a clear framework, not personal preference:",
          },
          {
            type: "list",
            items: [
              "External commitments take priority over internal ones — a client call, external presentation, or vendor meeting almost always outranks an internal team session. External parties made arrangements based on the confirmed time and may not be able to reschedule easily.",
              "Revenue-generating activities take priority over administrative activities — a meeting tied directly to a sale, a client relationship, or a project delivery outranks a planning session or status update.",
              "Seniority of attendees matters for internal conflicts — if both meetings are internal, the one involving more senior stakeholders or a tighter decision deadline typically takes the slot.",
              "Deadlines break ties — if one meeting must happen by a specific date to keep a project on track, that deadline is the deciding factor regardless of internal vs. external status.",
              "Never make this decision alone — always confirm the prioritization with your manager before moving any meeting. Present your reasoning clearly: 'The client demo is external and the account is a major one. I recommend keeping the 2 PM slot for the demo and rescheduling the strategy session. Do you agree?'",
            ],
          },
        ],
      },
      {
        heading: "Step 2 — Urgent vs. Important",
        blocks: [
          {
            type: "paragraph",
            text: "Not every scheduling conflict is a crisis, and treating minor conflicts as emergencies creates unnecessary stress and wastes time. Before escalating or reshuffling a calendar, assess the true nature of each meeting using the urgent vs. important framework:",
          },
          {
            type: "list",
            items: [
              "Urgent AND Important — a client demo for a major account, a contract signing, a board presentation, or any meeting with a hard deadline attached. These must happen on time. Move everything else around them.",
              "Important but NOT Urgent — a strategy session, a quarterly review, a team planning meeting. These are significant but can typically be rescheduled within the same week without meaningful consequence.",
              "Urgent but NOT Important — a standing sync that was accidentally double-booked. The recurrence makes it feel urgent, but missing one instance rarely has real consequences. Cancel the instance, not the series.",
              "Neither Urgent nor Important — a social check-in, a low-stakes status update, or a recurring meeting that has drifted from its original purpose. These are the first to move when a genuine conflict arises.",
              "Applying this framework out loud — when presenting a conflict to your manager, name the urgency and importance of each meeting explicitly: 'Meeting A is both urgent and important because it is tied to the client's launch deadline. Meeting B is important but can move to Friday without affecting any deliverable.' This shows analytical judgment, not just task execution.",
            ],
          },
        ],
      },
      {
        heading: "Step 3 — Rescheduling Professionally",
        blocks: [
          {
            type: "paragraph",
            text: "Once you have determined which meeting moves, your communication approach determines whether the rescheduled party feels respected or dismissed. A professional reschedule follows a specific structure:",
          },
          {
            type: "list",
            items: [
              "Reach out to the internal party first — external guests should almost never be the ones asked to reschedule. Notify the internal team first, explain the conflict without oversharing, and give them advance notice as early as possible.",
              "Lead with the apology and the reason — open with a direct acknowledgment: 'I need to reschedule our Thursday 2:00 PM strategy session.' Follow immediately with a brief, professional reason: 'A client commitment has been confirmed for the same time that cannot move.'",
              "Propose 2–3 alternative times immediately — do not ask the other party to propose a new time. They have already been inconvenienced. The minimum courtesy is to give them options to choose from: 'Would Thursday at 4:00 PM, Friday at 10:00 AM, or Monday at 2:00 PM work for you?'",
              "Update the calendar event — once a new time is agreed, update the calendar invite immediately and resend it. Do not rely on a separate email — the calendar event is the authoritative record.",
              "Notify all attendees — every person on the invite must be notified of the change. A change email to only the original requester leaves other attendees with an outdated event on their calendar.",
              "Follow up to confirm — after the reschedule email is sent, send a brief calendar update through the original event so every attendee's calendar reflects the new time automatically.",
            ],
          },
        ],
      },
      {
        heading: "Preventing Future Conflicts",
        blocks: [
          {
            type: "paragraph",
            text: "The most efficient way to handle scheduling conflicts is to prevent them before they occur. A few proactive habits applied consistently to a shared calendar will dramatically reduce the frequency of conflicts:",
          },
          {
            type: "list",
            items: [
              "Buffer blocks — add 10–15 minute buffer events between back-to-back meetings on your manager's calendar. These make scheduling conflicts visible before they become problems and prevent the unrealistic expectation that someone can be in two places at once.",
              "Out-of-office blocks — when your manager is traveling, on vacation, or in a full-day offsite, create an all-day block showing them as unavailable. This stops new meeting requests from being booked into blocked time before anyone checks availability.",
              "End-of-week calendar audit — spend 5 minutes every Friday reviewing the following week's schedule for potential conflicts, missing video links, or incomplete event details. Fix problems before Monday, not on Monday morning when they become urgent.",
              "Hold blocks for recurring priorities — if your manager has recurring priorities that should never be interrupted (focus time, weekly report writing, team check-ins), book them as recurring calendar blocks so they are visible before anyone attempts to schedule over them.",
              "Communicate calendar conventions to the team — if you manage a shared team calendar, create a brief written guide documenting what each calendar color means, which event types take priority, and what the buffer block protocol is. A team that understands the system creates fewer conflicts.",
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
            text: "Never cancel, reschedule, or modify a meeting on behalf of your manager without their explicit approval — even if the decision seems obvious. Moving a client meeting without your manager's knowledge can damage a relationship they have spent months cultivating. Always present your analysis and recommendation, then wait for confirmation before touching any event on someone else's calendar. Your job is to make the decision easy for your manager, not to make the decision for them.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional email rescheduling an internal leadership strategy meeting that conflicts with a high-priority client product demonstration. Propose two alternative times and maintain a courteous, organized tone.\" Study the structure of the AI response — the opening acknowledgment, the brief reason, and the proposed alternatives — then adapt it for the specific conflict in your challenge.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "When a client meeting and an internal strategy session are scheduled at the same time, which generally takes priority?",
            options: [
              "The internal meeting — it was booked first",
              "The meeting with the most attendees",
              "The client meeting — external commitments take precedence",
              "Neither — reschedule both meetings and find a new time for each",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "You have three meetings overlapping on Thursday at 2:00 PM: a client product demo for TOR Tech's largest account, an internal budget review with the finance team, and a 1-on-1 check-in with your manager. Resolve the conflict and document your process. Your submission must include all three components below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a 3–5 sentence conflict resolution rationale explaining which meeting keeps the 2:00 PM slot and why — reference the prioritization framework (external vs. internal, urgent vs. important) in your explanation",
          "Draft a professional rescheduling email for the internal budget review that includes: an apology and brief reason for the change, 2 alternative meeting times, and a closing line confirming you will update the calendar invite once a new time is agreed",
          "Describe in 1–2 sentences what you would do about the manager 1-on-1 — would you cancel it, move it to another time that day, or handle it differently, and why",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your conflict resolution rationale, your drafted rescheduling email, and your plan for the manager 1-on-1 as a single written document. The email should be ready to send — professional tone, no placeholder names, and a clear proposed alternative time.",
      },
    ],
  },

  {
    slug: "schedule-a-full-week",
    title: "Hands-On: Schedule a Full Work Week",
    description:
      "Put your calendar management skills to the test by planning and managing an entire work week from scratch.",
    duration: "35 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech is going on a 5-day business trip and asks you to manage the office calendar for the full week. You have a list of meetings to schedule, deadlines to track, and reminders to set — and you need to make sure nothing falls through the cracks while they are away. A fragile week — one where events are missing information, conflicts are left unresolved, and team members are unnotified — creates chaos. A functional week runs on its own.",
          },
        ],
      },
      {
        heading: "The Fragile Week vs. The Functional Week",
        blocks: [
          {
            type: "paragraph",
            text: "Most people treat a calendar as a passive record of commitments. A professional treats it as active infrastructure. The difference between a fragile week and a functional week is visible the moment something unexpected happens:",
          },
          {
            type: "list",
            items: [
              "A fragile week has events without video links — someone sends a message 5 minutes before a virtual meeting asking for the Zoom link because it was never included in the invite.",
              "A fragile week has no buffer time — when a meeting runs long, the next meeting starts late, the next attendees are waiting, and the entire afternoon collapses.",
              "A fragile week has unresolved overlaps — two events at the same time with no documented resolution. Someone shows up to the wrong meeting.",
              "A fragile week has no out-of-office indication — the manager is traveling but the calendar shows them as available, so new meetings keep getting booked for times when they are on a plane.",
              "A functional week has fully built events — every invite has a title, attendees, video link, and agenda so no one needs to ask for details.",
              "A functional week has buffer blocks between meetings — they surface conflicts before they happen and give everyone transition time.",
              "A functional week documents every conflict resolution — when a meeting moves, the reason is logged and all affected parties are notified before anyone arrives at the wrong place.",
              "A functional week includes an out-of-office block — the manager's travel is visible on the calendar so no new meetings are booked into unavailable time.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Building the Weekly Structure",
        blocks: [
          {
            type: "paragraph",
            text: "Before placing any individual event, establish the structural elements that will hold the week together. Building structure first prevents conflicts before they arise:",
          },
          {
            type: "list",
            items: [
              "Create the out-of-office block first — mark the manager's travel as an all-day event from Monday through Friday, titled clearly: 'TOR Tech — Out of Office (Business Travel)'. This ensures no one books new meetings into unavailable time before you build the rest of the week.",
              "Place recurring events next — the weekly team standup and any other recurring commitments should be the fixed anchors of the week. These do not move. Build everything else around them.",
              "Add buffer blocks between meetings — after placing fixed meetings, insert 15-minute buffer blocks between any two meetings that are less than 30 minutes apart. A Tuesday schedule with a 10:00 AM call, an 11:00 AM presentation, and a 12:00 PM call needs buffers at 10:30 and 11:30.",
              "Block focus time — if your manager needs uninterrupted time to review materials, prepare for a presentation, or complete a deliverable, block it explicitly on the calendar before anyone else can schedule over it.",
              "Mark all-day deadline events — project deliverables, report submissions, and client milestones should appear as all-day events on the day they are due. Use a consistent naming convention: 'DEADLINE: Q2 Financial Report to CFO'.",
            ],
          },
        ],
      },
      {
        heading: "Phase 2 — Scheduling Meetings Completely",
        blocks: [
          {
            type: "paragraph",
            text: "Once the structural elements are in place, add the specific meetings to the week. Every event must be complete before you consider it done. An incomplete event is an unreliable event:",
          },
          {
            type: "list",
            items: [
              "Title — specific and purposeful. 'TOR Tech Q3 Client Check-In: Acme Corp' is complete. 'Meeting' is not.",
              "Attendees — add every person who needs to attend. Check their availability using the Find a Time feature before confirming the slot. If there is a conflict, resolve it before sending the invite.",
              "Location or video link — paste the full meeting URL directly into the location field. For in-person meetings, include the room name and floor. Never leave this field blank for a virtual meeting.",
              "Agenda in the description — even two or three bullets make the meeting purposeful. 'Review Q3 deliverables, Confirm next milestone dates, Assign open action items' is a complete agenda for a 30-minute check-in.",
              "Reminders — set at least one reminder per meeting. For external or high-stakes calls, set both a 24-hour and a 15-minute reminder.",
              "Verify every event before the week begins — scan the full week view on Friday afternoon. Every slot should have a title, a time, and a location or link. If any field is missing, fix it before Monday.",
            ],
          },
        ],
      },
      {
        heading: "Phase 3 — Resolving and Documenting Conflicts",
        blocks: [
          {
            type: "paragraph",
            text: "Even a well-built week will produce at least one conflict. Phase 3 is about identifying overlaps, resolving them using the prioritization framework, and documenting every decision so the record is clear:",
          },
          {
            type: "list",
            items: [
              "Scan for overlaps after placing all events — look at each day in the week view and visually identify any time blocks that overlap or sit back-to-back with no buffer.",
              "Apply the prioritization framework — external before internal, revenue-generating before administrative, urgent before important. Use this framework explicitly and document your reasoning.",
              "Move the lower-priority event — once you have confirmed the priority with your manager, move the lower-priority event and send a rescheduling email to all affected attendees with 2 alternative times.",
              "Log every conflict in the event description — add a brief note directly to the rescheduled event: 'Originally scheduled for Tuesday at 2:00 PM. Moved to Thursday at 3:00 PM due to client demo conflict.' This prevents confusion when attendees compare calendars.",
              "Confirm with all parties — do not consider a conflict resolved until every affected attendee has acknowledged the change. The calendar update alone is not enough for high-stakes meetings.",
            ],
          },
        ],
      },
      {
        heading: "Phase 4 — Handoff Documentation",
        blocks: [
          {
            type: "paragraph",
            text: "When you manage someone else's calendar for a full week, you are responsible for leaving a clear record of every decision you made. A handoff note ensures your manager returns to a calendar they understand and trust:",
          },
          {
            type: "list",
            items: [
              "Write a brief weekly summary — a short document (or email) covering: what meetings were scheduled, what conflicts were resolved and how, what deadlines are on the calendar, and any open items that need the manager's attention upon return.",
              "Flag unresolved items — if any meeting could not be scheduled due to persistent unavailability, note it explicitly in the handoff summary so the manager knows to follow up.",
              "Document any permissions granted — if you shared calendar access with a new team member or booked a meeting on behalf of an external party, note it in the summary so there are no surprises.",
              "Leave the calendar clean — delete any test events, draft holds, or tentative blocks that were not confirmed before the week starts. A cluttered calendar creates confusion.",
              "The professional standard — your manager should be able to read the handoff note and the calendar together and have a complete, accurate picture of the week without asking any follow-up questions.",
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
            text: "Managing a calendar for someone who is traveling means making judgment calls in real time without direct supervision. For any decision that involves canceling, rescheduling, or declining a meeting on your manager's behalf, document your reasoning and send a brief message to your manager at the earliest opportunity to confirm they agree. Never accept or decline a meeting invitation on someone else's behalf without authorization — an accepted invite creates a professional commitment that your manager will be expected to honor.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a sample Monday through Friday work schedule for an office assistant managing a 5-person team calendar. Include two client meetings with agendas, one recurring standup, three project deadlines, two internal reviews, and at least one scheduling conflict with a proposed resolution.\" Use the AI output as a structural reference, then build your actual week in Google Calendar applying every Phase 1 through 4 technique from this lesson.",
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
              "To make the calendar appear less busy to outside viewers",
              "To give yourself time to check personal messages between meetings",
              "To surface scheduling conflicts before they become problems and give attendees transition time",
              "To signal to others that the calendar owner is generally unavailable",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a complete, functional work week (Monday through Friday) on a real or mock Google Calendar for a fictional TOR Tech manager who is traveling. Your calendar must pass every check in the five specifications below before you submit it:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create an out-of-office all-day block for the full week titled clearly with the manager's name and travel reason, plus at least one recurring team standup set to repeat weekly",
          "Schedule 2 complete client meetings — each with a descriptive title, attendees (fictional names and roles), a placeholder video link, and a 2-item agenda in the description",
          "Add 3 project deadlines as all-day events using the naming convention 'DEADLINE: [Deliverable Name] — [Recipient]'",
          "Add 15-minute buffer blocks between any two meetings separated by less than 30 minutes, and one 60-minute focus block protecting time for deep work",
          "Identify and resolve at least 1 scheduling conflict — log your prioritization reasoning in the rescheduled event's description and describe in 2–3 sentences what moved and why",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your completed week view showing all events with titles visible, plus a brief handoff note (4–6 sentences) summarizing what meetings were scheduled, what conflict was resolved and how, and any items the returning manager should be aware of.",
      },
    ],
  },
];
