import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/teams/module-5";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const teamsModule5Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "schedule-meetings",
    title: "Schedule and Answer Meetings",
    description:
      "Schedule Teams meetings from the Teams calendar, from a chat, and in a channel, know how Outlook fits in, answer invitations, and join by link, from your calendar, or with a meeting ID.",
    objectives: [
      "Schedule a meeting with New event: title, required and optional attendees, date and time, repeat, and an agenda",
      "Schedule a meeting from a chat and a channel meeting from a channel",
      "Explain how Teams meetings scheduled in Outlook appear in Teams",
      "Accept or decline invitations, and join from the calendar, a chat, or Join with an ID",
    ],
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/7yorEAIxu40",
    slides: slides("schedule-meetings", [
      "Meetings start with a clear invitation",
      "Calendar › New event",
      "Schedule from a chat, or in a channel",
      "Teams meetings from Outlook",
      "Accept, Tentative, or Decline",
      "Ways to join: calendar, chat, link, or meeting ID",
    ]),
    sections: [
      {
        heading: "A good invitation does half the work",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Maria asks you to set up a planning meeting for Saturday's flu clinic. Last time, the invitation said only “Flu stuff,” two people came without the supply counts, and the meeting ran 40 minutes over.",
            task: "Schedule meetings with a clear title, the right people, the right time, and an agenda, and answer the invitations you receive.",
          },
          {
            type: "paragraph",
            text: "Teams calendar is the same calendar as your work Outlook calendar, so a meeting you schedule in either one appears in both. The current Teams calendar is the one Microsoft shares with the new Outlook; it is on by default, and the top-right toggle can switch back to the classic calendar if your organization still allows it.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select Calendar on the app bar, then New event (or select an open time slot).",
              "Add a title that says what the meeting is for.",
              "Invite required attendees. To invite someone as optional, open Response options and add optional attendees.",
              "Choose the date, start time, and end time. Set Repeat if the meeting happens every week or month. Check the Scheduling Assistant to see when people are free.",
              "Make sure Teams meeting is turned on, add an agenda in the details, and select Send. (With no attendees, you Save it to your own calendar.)",
            ],
          },
        ],
      },
      {
        heading: "Schedule from a chat, a channel, or Outlook",
        blocks: [
          {
            type: "table",
            caption: "Other places to schedule a Teams meeting",
            columns: ["From", "How", "Who is invited"],
            rows: [
              ["A chat", "More chat options (…) › Schedule a meeting", "The people in the chat are filled in"],
              ["A channel", "The arrow next to Meet now › Schedule a meeting", "Everyone on the team gets an invitation, and the meeting appears in the channel"],
              ["New Outlook or Outlook on the web", "New event, then turn on Teams meeting before Send", "The people you invite"],
              ["Classic Outlook", "New Teams Meeting in the Calendar", "The people you invite"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Channel meetings are good for team-wide meetings: everyone on the team can see the meeting in the channel and join. Channel meetings are not available in private channels. The Outlook course in this program covers scheduling from Outlook in detail.",
          },
          {
            type: "worked-example",
            title: "Scheduling the flu clinic planning meeting",
            task: "Get the right people together for 30 minutes with a clear agenda.",
            steps: [
              { move: "Calendar › New event. Title: “Flu Clinic Planning.”", why: "The title tells people what the meeting is for before they open it." },
              { move: "Required: Maria Santos and Tasha Greene. Optional: Omar Haddad.", why: "Maria and Tasha must decide; Omar can come if he is free. Marking him optional tells him so." },
              { move: "Thursday, 2:00 PM to 2:30 PM, after checking the Scheduling Assistant.", why: "Picking a time when everyone is free saves a round of reschedules." },
              { move: "Details: “1. Supplies 2. Volunteers 3. Signage.” Then Send.", why: "An agenda lets people bring what is needed and keeps the meeting to 30 minutes." },
            ],
            result: "An invitation people can prepare for, on everyone's Teams and Outlook calendar.",
            takeaway: "Clear title, the right people, a realistic time, and an agenda.",
          },
        ],
      },
      {
        heading: "Answer invitations and join",
        blocks: [
          {
            type: "paragraph",
            text: "Select a meeting on your calendar to see its details. Choose Accept, Tentative, or Decline so the organizer knows who is coming. When two meetings overlap, decide which one you will attend and decline the other, so nobody waits for you.",
          },
          {
            type: "table",
            caption: "Ways to join a Teams meeting",
            columns: ["From", "Do this"],
            rows: [
              ["Your calendar", "Select the meeting › Join"],
              ["The meeting chat", "Open the meeting's chat › Join (while the meeting is going on)"],
              ["An invitation link", "Select the meeting link in the invite"],
              ["A meeting ID", "Calendar › the arrow next to Meet now › Join with an ID; type the ID and passcode"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Where would you schedule it?",
            prompt: "Drag the best way to schedule each meeting.",
            items: [
              { id: "a", text: "A monthly review the whole Front Office team should see", match: "Channel meeting from Scheduling" },
              { id: "b", text: "A quick talk with the three people already in a group chat", match: "Schedule a meeting from the chat" },
              { id: "c", text: "A planning meeting with two required and one optional person", match: "Calendar › New event" },
              { id: "d", text: "A partner office gave you a meeting ID and passcode", match: "Join with an ID" },
            ],
            explanation: "Start from where the people already are: a chat for its members, a channel for the team, the calendar for a custom list, and Join with an ID when all you have is an ID.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want Omar invited to a meeting, but he does not have to attend. What should you do?",
            options: ["Leave him off the invitation", "Add him as an optional attendee under Response options", "Add him as required and tell him to ignore it", "Forward him the meeting chat"],
            correctIndex: 1,
            explanation: "Optional attendees get the invitation and know their attendance is not required.",
            optionRationales: ["Then he would not know about the meeting.", "Correct.", "Required tells him he must attend.", "The meeting chat is not an invitation."],
          },
          {
            type: "knowledge-check",
            question: "A partner office gives you only a meeting ID and passcode. How do you join?",
            options: ["Start a new chat with the ID", "Calendar › arrow next to Meet now › Join with an ID", "Search for the ID in Activity", "Create a New event with the ID as the title"],
            correctIndex: 1,
            explanation: "Join with an ID asks for the meeting ID and passcode and takes you to the pre-join screen.",
            optionRationales: ["A chat cannot join a meeting by ID.", "Correct.", "Activity lists notifications.", "That would schedule a new meeting."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Set up next week's meetings in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Schedule “Patient Portal Training” with Jen Cole and Omar Haddad on Friday, October 23, 2026, from 10:00 AM to 10:45 AM, with the details “Bring your login.” Send it.",
          "From your chat with Maria Santos, schedule “Weekly Check-in” on Monday, October 26, 2026, from 3:00 PM to 3:15 PM, repeating weekly.",
          "Accept “Privacy Training Refresher.”",
          "Decline “Vendor demo: Phone headsets.”",
          "Join the meeting with ID 245 381 907 6 and passcode Lk7x2P, then select Join now.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "The dates in the Challenge Lab are part of the practice scenario, not due dates for you.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "join-and-participate",
    title: "Join a Meeting and Take Part",
    description:
      "Set up your camera, microphone, and background on the pre-join screen, use the meeting controls (Mic, Camera, Chat, Raise, React, Share, Leave), share a single window safely, and follow meeting etiquette.",
    objectives: [
      "Use the pre-join screen to set your camera, microphone, and background before you join",
      "Use the meeting controls: Mic, Camera, Chat, People, Raise, React, View, Notes, and Leave",
      "Share a single window instead of your whole screen, and stop sharing",
      "Follow meeting etiquette, including keeping patient information off a shared screen",
    ],
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/OEXshseuW0s",
    slides: slides("join-and-participate", [
      "Join ready: camera, microphone, background",
      "The pre-join screen",
      "Meeting controls you will use every time",
      "Raise, React, and the meeting chat",
      "Share a window, not your whole screen",
      "Meeting etiquette",
    ]),
    sections: [
      {
        heading: "Before you join: the pre-join screen",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "The Front Office Huddle starts in one minute. You are at the check-in desk with patients in the background, a phone ringing, and the November schedule open on your screen next to the EHR. Last week someone joined unmuted and the whole huddle heard a patient give their date of birth at the window.",
            task: "Join the meeting ready: the right camera and microphone settings, a blurred background, and only the right window shared.",
          },
          {
            type: "paragraph",
            text: "When you select Join, Teams shows the pre-join screen first. It shows your camera preview and lets you turn your camera and microphone on or off before anyone sees or hears you. Select Effects and avatars to blur your background or choose a background image. If you are in a meeting room with Teams equipment, Teams may suggest Room audio. When everything is set, select Join now.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Change your background during a meeting with More actions (…) › Video effects and settings: choose an effect, select Preview to check it, then Apply.",
          },
        ],
      },
      {
        heading: "Meeting controls",
        blocks: [
          {
            type: "table",
            caption: "Controls at the top of the meeting window",
            columns: ["Control", "What it does", "Shortcut (Windows)"],
            rows: [
              ["Mic", "Mute or unmute yourself", "Ctrl+Shift+M"],
              ["Camera", "Turn your video on or off", "Ctrl+Shift+O"],
              ["Share", "Share your screen, a window, a PowerPoint file, or a whiteboard", "Ctrl+Shift+E opens the share tray"],
              ["Chat", "Open the meeting chat", ""],
              ["People", "See who is here and who is waiting", ""],
              ["Raise", "Raise or lower your hand", "Ctrl+Shift+K"],
              ["React", "Send a quick reaction (also has Raise hand)", ""],
              ["View", "Change how people appear, such as Gallery or Large gallery", ""],
              ["Notes", "Open shared meeting notes", ""],
              ["More (…)", "Recording, captions, video effects, and more", ""],
              ["Leave", "Leave the meeting (organizers can also End meeting)", "Ctrl+Shift+H"],
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Together mode was retired in June 2026 and no longer appears under View. Gallery is the main layout. Organizers and presenters can still Spotlight someone's video for everyone, and anyone can Pin a video for themselves.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which control?",
            prompt: "Drag each meeting control onto the job it does.",
            items: [
              { id: "a", text: "Raise", match: "Ask to speak without interrupting" },
              { id: "b", text: "Mic", match: "Stop the room's noise from reaching everyone" },
              { id: "c", text: "Chat", match: "Post a link or a question others can read" },
              { id: "d", text: "Share", match: "Show one window to the meeting" },
              { id: "e", text: "People", match: "See who is in the meeting and who is waiting" },
            ],
            explanation: "Each control has one job. Learning them means you never interrupt to ask how to do something.",
          },
        ],
      },
      {
        heading: "Share safely",
        blocks: [
          {
            type: "paragraph",
            text: "Select Share and choose what to show. Sharing your whole screen shows everything on it, including pop-up notifications and any other window you click by mistake. Sharing a single window shows only that program. At a medical office, share the specific window you need, close or minimize anything with patient information first, and select Stop sharing as soon as you are done. Teams turns on Do not disturb while you present, so chat pop-ups do not appear for everyone.",
          },
          {
            type: "worked-example",
            title: "Showing the November schedule in the huddle",
            task: "Maria asks you to show the schedule while the EHR is also open on your screen.",
            steps: [
              { move: "Select Share, and under Window choose Provider Schedule - November.xlsx - Excel.", why: "Only the schedule is visible. The EHR window stays private even if you click on it." },
              { move: "Talk through the schedule.", why: "Everyone sees the same thing, so there is no confusion about which day you mean." },
              { move: "Select Stop sharing at the top of the window.", why: "Ending the share right away means nothing else appears by accident." },
            ],
            result: "The team sees the schedule and nothing else.",
            takeaway: "Share a window, not your whole screen, and stop sharing the moment you are done.",
          },
          {
            type: "table",
            caption: "Meeting etiquette at Lakeside",
            columns: ["Do", "Don't"],
            rows: [
              ["Join on time and muted", "Join unmuted from a busy front desk"],
              ["Blur or choose a background in patient areas", "Show patients or screens behind you"],
              ["Raise your hand to speak", "Talk over the presenter"],
              ["Use the meeting chat for links and questions", "Paste patient details into the meeting chat"],
              ["Share one window, then stop sharing", "Share your whole screen with the EHR open"],
            ],
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which shortcut mutes and unmutes your microphone in a Teams meeting on Windows?",
            options: ["Ctrl+Shift+M", "Ctrl+M", "Ctrl+Shift+K", "Alt+M"],
            correctIndex: 0,
            explanation: "Ctrl+Shift+M toggles mute. Ctrl+Shift+K raises or lowers your hand.",
            optionRationales: ["Correct.", "That is not the Teams mute shortcut.", "Ctrl+Shift+K raises or lowers your hand.", "That is not the Teams mute shortcut."],
          },
          {
            type: "knowledge-check",
            question: "You need to show the schedule in a meeting, and the EHR is open on your screen. What should you share?",
            options: ["Your entire screen", "Only the schedule's window", "Nothing; read it out loud", "A photo of your screen"],
            correctIndex: 1,
            explanation: "Sharing one window keeps everything else, including patient information, off the meeting.",
            optionRationales: ["Your whole screen would show the EHR and any pop-ups.", "Correct.", "Sharing the schedule is fine when you share only its window.", "A photo could still capture patient information."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Attend Renee's privacy training in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "From the meeting chat “Privacy Training Refresher,” open the meeting's pre-join screen.",
          "Turn off your camera and your microphone.",
          "Join the meeting.",
          "Turn on live captions.",
          "Post your question in the meeting chat: “Does this training cover texting appointment reminders?”",
          "Raise your hand.",
          "Lower your hand, then leave the meeting.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "host-a-meeting",
    title: "Host a Meeting: Lobby, Roles, and Recording",
    description:
      "Run a meeting you organize: admit people from the lobby, set presenter and attendee roles, mute participants, record and transcribe with notice, use breakout rooms, and end the meeting for everyone.",
    objectives: [
      "Admit or deny people waiting in the lobby, and explain who can bypass the lobby",
      "Explain the organizer, co-organizer, presenter, and attendee roles and change a role during a meeting",
      "Mute participants, start and stop recording or transcription with notice, and end the meeting",
      "Describe what breakout rooms are for and who can manage them",
    ],
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/fGvVREwX33E",
    slides: slides("host-a-meeting", [
      "Hosting is a job: start, steer, and end the meeting",
      "The lobby: who gets in, and when",
      "Meeting roles",
      "Mute, record, and transcribe with notice",
      "Breakout rooms",
      "End the meeting for everyone",
    ]),
    sections: [
      {
        heading: "The organizer's job",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "You organize today's Front Desk Coverage Review. Dana Brooks from Riverside Imaging, an outside partner, is joining to explain their referral process, Omar is presenting the schedule, and Maria wants it recorded for the evening staff. Last month someone else's review ran 20 minutes over and a vendor sat in the lobby the whole time because nobody noticed.",
            task: "Use the host controls so the right people get in, the right people present, everyone knows about the recording, and the meeting ends on time.",
          },
          {
            type: "paragraph",
            text: "The lobby is a waiting area. Depending on the meeting's options, some people join directly and others wait in the lobby until someone admits them. Organizers, co-organizers, and presenters can admit people by default. When someone is waiting, a banner appears with Admit and View lobby; in People, under Waiting in the lobby, select the check mark to admit someone or the X to deny them. Admit all admits everyone waiting.",
          },
          {
            type: "paragraph",
            text: "Before the meeting, the organizer sets who can bypass the lobby in the meeting's options (Calendar › the meeting › View event › Options › Meeting access). Choices range from Only organizers and co-organizers to Everyone. For a meeting with outside partners, keeping guests in the lobby until you admit them is a sensible default.",
          },
        ],
      },
      {
        heading: "Roles",
        blocks: [
          {
            type: "table",
            caption: "What each role can do (from Microsoft's roles table)",
            columns: ["Can", "Organizer and co-organizer", "Presenter", "Attendee"],
            rows: [
              ["Speak, share video, chat", "Yes", "Yes", "Yes"],
              ["Share content", "Yes", "Yes", "No"],
              ["Mute others, admit from lobby, change roles", "Yes", "Yes", "No"],
              ["Start or stop recording and transcription", "Yes", "Yes", "No"],
              ["Manage breakout rooms, change meeting options", "Yes", "No", "No"],
            ],
          },
          {
            type: "paragraph",
            text: "To change someone's role during a meeting, select People, point to their name, select More options (…), and choose Make a presenter or Make an attendee. A role change made this way applies to this meeting only. For a meeting with outside guests, make guests attendees so they can listen and talk but not share their screen or remove people.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which role fits?",
            prompt: "Drag the role that fits each person in the coverage review.",
            items: [
              { id: "a", text: "Omar, who will share the schedule", match: "Presenter" },
              { id: "b", text: "Dana, an outside partner who will only talk", match: "Attendee" },
              { id: "c", text: "Maria, who should be able to change meeting options with you", match: "Co-organizer" },
              { id: "d", text: "You, who scheduled the meeting", match: "Organizer" },
            ],
            explanation: "Give each person the least access they need to do their part in the meeting.",
          },
        ],
      },
      {
        heading: "Recording, transcription, and breakout rooms",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Tell people first. A short note in the meeting chat (“This meeting will be recorded for staff who can't attend”) is a good habit.",
              "Select More (…) › Record. Check the spoken language and what to record (audio and video, or audio only), then select Confirm. Everyone in the meeting is notified that recording has started, and live transcription starts with it.",
              "To stop, select More (…) › Recording; this stops the recording and the transcript. Selecting Transcribing stops only the transcript and keeps recording. To get a transcript without a recording, select More (…) › Transcribe › Confirm.",
              "The recording is saved in the organizer's OneDrive for work or school (or SharePoint for a channel meeting) and a link appears in the meeting chat. Your organization may set recordings to expire after a period of time.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Only record when you have a business reason and people know about it. At Lakeside, do not record meetings where patient information will be discussed unless the practice has approved it, and never record a meeting with outside partners without telling them first.",
          },
          {
            type: "paragraph",
            text: "Breakout rooms split a meeting into smaller groups and bring everyone back afterward. The organizer, or a presenter the organizer appoints as breakout rooms manager, creates them with Rooms in the meeting controls (or More › Rooms), assigns people manually, randomly, or by letting them choose, then selects Open rooms. Close rooms brings everyone back to the main meeting.",
          },
          {
            type: "worked-example",
            title: "Running the coverage review",
            task: "Start on time, admit the partner, record with notice, and end on time.",
            steps: [
              { move: "Join, then Admit Dana Brooks from the lobby banner.", why: "An outside guest waits in the lobby; admitting her right away keeps the meeting on time." },
              { move: "People › Omar Haddad › More options › Make a presenter. Leave Dana as an attendee.", why: "Omar needs to share the schedule. Dana only needs to talk." },
              { move: "People › Mute all.", why: "Several people are in noisy areas; muting everyone keeps the audio clean. People can unmute to speak." },
              { move: "Post the recording notice in the meeting chat, then More › Record › Confirm.", why: "People know before it starts, and Teams notifies everyone too." },
              { move: "At the end, More › Recording to stop the recording, then the arrow next to Leave › End meeting.", why: "End meeting closes it for everyone, so nobody stays in an empty meeting." },
            ],
            result: "A meeting that started and ended on time, with a recording everyone knew about.",
            takeaway: "Admit promptly, give the least role needed, announce before recording, and end the meeting for everyone.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which role can share content but cannot manage breakout rooms or change meeting options?",
            options: ["Organizer", "Co-organizer", "Presenter", "Attendee"],
            correctIndex: 2,
            explanation: "Presenters have most controls, including sharing, but managing breakout rooms and meeting options is for organizers and co-organizers.",
            optionRationales: ["Organizers can do both.", "Co-organizers have the same capabilities as the organizer.", "Correct.", "Attendees cannot share content."],
          },
          {
            type: "knowledge-check",
            question: "What should you do before you start recording a meeting?",
            options: ["Nothing; Teams handles it", "Tell participants, and make sure there is a business reason and approval if patient information may come up", "Turn off everyone's camera", "Make everyone an attendee"],
            correctIndex: 1,
            explanation: "Teams notifies everyone when recording starts, but telling people first and having a reason (and approval for anything involving patient information) is part of doing it professionally.",
            optionRationales: [
              "Teams notifies people, but you are still responsible for having a reason and giving notice.",
              "Correct.",
              "Cameras have nothing to do with consent to record.",
              "Roles do not replace notice.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Run the Patient Experience Committee meeting in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Join “Patient Experience Committee,” the meeting you organize.",
          "Admit Jen Cole from the lobby.",
          "Mute all participants.",
          "Start transcription (without recording).",
          "In meeting Notes, add the note “Omar drafts a running-late text message.”",
          "Stop transcription and end the meeting for everyone.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "captions-recordings-and-follow-up",
    title: "Captions, Transcripts, Recordings, and Follow-Up",
    description:
      "Use live captions, understand the difference between captions, transcripts, and recordings, find a meeting's recording and notes afterward, and send a follow-up that turns a meeting into action.",
    objectives: [
      "Turn live captions on and off, and explain that captions are not saved",
      "Explain the difference between live captions, a transcript, and a recording",
      "Find a meeting's recording and notes in the meeting chat after it ends",
      "Post a follow-up with clear action items in the meeting chat",
    ],
    duration: "15 min",
    slides: slides("captions-recordings-and-follow-up", [
      "Captions, transcripts, and recordings",
      "Turn on live captions",
      "Captions vs. transcript vs. recording",
      "Meeting notes everyone can see",
      "After the meeting: the meeting chat",
      "A follow-up that turns talk into action",
    ]),
    sections: [
      {
        heading: "Captions help everyone follow along",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "You missed the second half of yesterday's Billing Workflow Check-in to help a patient at the window. Today's huddle is in the middle of the noisy front office, where you can barely hear Maria through your earbuds. By Friday, nobody will remember who agreed to cover what.",
            task: "Use captions to follow along, catch up from a recording, and send a follow-up that records the decisions.",
          },
          {
            type: "paragraph",
            text: "Live captions show what people say as text on your screen during a meeting. Turning captions on changes only your own screen. To turn them on, select More (…) › Captions. To turn them off, select More (…) › Captions again. Teams does not save captions; if you need a record, turn on transcription.",
          },
          {
            type: "table",
            caption: "Captions, transcripts, and recordings",
            columns: ["", "Live captions", "Transcript", "Recording"],
            rows: [
              ["What it is", "Text of what people say, on your screen", "A saved written record of the meeting", "Saved video and audio of the meeting"],
              ["Saved afterward?", "No", "Yes", "Yes"],
              ["Who turns it on", "Anyone, for themselves", "Organizer or presenter", "Organizer or presenter"],
              ["Others notified?", "No", "Yes", "Yes"],
            ],
          },
        ],
      },
      {
        heading: "Notes and the meeting chat",
        blocks: [
          {
            type: "paragraph",
            text: "Select Notes in the meeting controls to open shared meeting notes that people in the meeting can see and add to. Notes are a good place for decisions and action items as they happen. Every Teams meeting also has a meeting chat. It is available before, during, and after the meeting: messages posted during the meeting stay there, and when a meeting is recorded, a link to the recording appears in the meeting chat (or in the channel conversation for a channel meeting).",
          },
          {
            type: "worked-example",
            title: "Following up on the huddle",
            task: "Make sure Friday's coverage decisions do not get lost.",
            steps: [
              { move: "During the huddle, turn on live captions and add “Alex covers check-in 12:00 to 1:00 on Friday” in Notes.", why: "Captions help in a noisy room, and the note captures the decision at the moment it is made." },
              { move: "After you leave, open the Front Office Huddle meeting chat.", why: "Everyone who was invited can see the meeting chat, so it is the natural place for the follow-up." },
              { move: "Post “Action items:” with a bulleted list of who does what.", why: "A short list with names makes each person's task clear and easy to find later." },
            ],
            result: "Everyone has the decisions in writing, in the place they look for this meeting.",
            takeaway: "Capture decisions during the meeting, then post action items with names in the meeting chat.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the meeting in order",
            prompt: "Drag these steps into the order they happen.",
            items: [
              { id: "1", text: "Send an invitation with an agenda" },
              { id: "2", text: "Join from the pre-join screen with the right settings" },
              { id: "3", text: "Capture decisions in Notes during the meeting" },
              { id: "4", text: "Leave or end the meeting" },
              { id: "5", text: "Post action items in the meeting chat" },
            ],
            explanation: "A good meeting has a clear start (agenda), clear decisions during, and a clear finish (action items).",
          },
          {
            type: "callout",
            variant: "info",
            text: "Some organizations also have AI meeting features. AI-generated recaps (intelligent recap, such as AI meeting notes and recommended tasks) need a Teams Premium or Microsoft 365 Copilot license, and Copilot in Teams meetings needs a Microsoft 365 Copilot license, so you may not see them at work. Notes and a written follow-up work everywhere.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You turned on live captions during a meeting. What happens after the meeting ends?",
            options: ["The captions are saved as a transcript", "Teams does not save captions", "The captions are emailed to everyone", "The captions become the meeting notes"],
            correctIndex: 1,
            explanation: "Captions appear only during the meeting. For a saved record, the organizer or a presenter turns on transcription.",
            optionRationales: ["Captions and transcripts are different; captions are not saved.", "Correct.", "Teams does not email captions.", "Notes are separate and typed by people."],
          },
          {
            type: "knowledge-check",
            question: "Where do you usually find the recording of a meeting you were invited to?",
            options: ["In the meeting chat", "In your Recycle bin", "In Settings", "In the Apps page"],
            correctIndex: 0,
            explanation: "A link to the recording appears in the meeting chat (or the channel conversation for a channel meeting).",
            optionRationales: ["Correct.", "The Recycle bin holds deleted files.", "Settings holds preferences.", "Apps lists apps you can add."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Catch up and follow up in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open the recording in the Billing Workflow Check-in meeting chat.",
          "Close it and react to Kevin's message with a Like.",
          "Join the Front Office Huddle and turn on live captions.",
          "Add a note: “Tasha restocks Room 3 before 2:00 PM.”",
          "Leave, then post in the Front Office Huddle meeting chat: “Notes are in the meeting. Tasha restocks Room 3 before 2:00 PM.”",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },
];
