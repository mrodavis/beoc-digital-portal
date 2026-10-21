import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/teams/module-1";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const teamsModule1Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "teams-at-work",
    title: "Teams at Work: What It Is and How It Is Organized",
    description:
      "Learn what Microsoft Teams is for, how chats, teams, channels, and meetings fit together, which version of Teams you will use at work, and the patient-information rule that comes with it.",
    objectives: [
      "Explain what Teams is for and name its main parts: Activity, Chat, teams and channels, Calendar, Calls, and OneDrive",
      "Tell the difference between a chat, a team, a channel, and a meeting",
      "Describe how a work or school account differs from Microsoft Teams (free), and why classic Teams no longer appears",
      "Apply Lakeside's rule for patient information in Teams",
    ],
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/vaeFzrIc9HU",
    slides: slides("teams-at-work", [
      "Microsoft Teams: one place for chat, meetings, calls, and shared files",
      "Chat, team, channel, meeting: four ways to talk at work",
      "Where a conversation belongs: a decision guide",
      "Work or school account versus Microsoft Teams (free)",
      "One Teams app: classic Teams is retired",
      "The patient information rule for Teams at Lakeside",
      "Quick check: chat or channel?",
    ]),
    sections: [
      {
        heading: "Why the office runs on Teams",
        blocks: [
          {
            type: "scenario",
            role: "You are a new front office assistant at Lakeside Medical Associates.",
            text: "On your first day, Maria Santos, the office manager, tells you that nobody at Lakeside sends quick questions by email anymore. Schedule changes go in the Scheduling channel, coverage questions come by chat, the morning huddle is a Teams meeting, and the intake packet lives in the Front Office team. Within an hour you have a chat from Maria, an @mention in a channel, and a meeting invitation, and you are not sure which one to answer first or where.",
            task: "Learn what each part of Teams is for, so every message you send lands in the right place.",
          },
          {
            type: "paragraph",
            text: "Microsoft Teams is the app many workplaces use to talk and work together. It brings chat, meetings, phone-style calls, and shared files into one window. The big idea is that conversations live next to the work they are about. Instead of an email thread that only some people can see, the front office has one Scheduling channel that everyone on the team can read, search, and reply to.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Chat", definition: "A private conversation with one person or a small group. Only the people in the chat can see it." },
              { term: "Team", definition: "A group of people who work together, such as the Front Office team. A team holds channels." },
              { term: "Channel", definition: "A topic area inside a team, such as Scheduling or Billing Questions. Everyone on the team can read a standard channel." },
              { term: "Post", definition: "A message in a channel. Replies stay together under the post." },
              { term: "Meeting", definition: "A scheduled or instant video or audio call, with its own meeting chat." },
              { term: "@mention", definition: "Typing @ and a name so that person gets a notification." },
              { term: "Activity", definition: "Your feed of notifications: @mentions, replies, reactions, and missed calls." },
            ],
          },
        ],
      },
      {
        heading: "Chat, team, channel, or meeting?",
        blocks: [
          {
            type: "paragraph",
            text: "Most mistakes new Teams users make are about place, not buttons: a question for one person posted where 40 people see it, or a schedule change sent in a private chat that the rest of the team never sees. Before you type, ask who needs to see this and whether they will need to find it again later.",
          },
          {
            type: "table",
            caption: "Choose the right place for the message",
            columns: ["Use", "When", "Lakeside example"],
            rows: [
              ["One-on-one chat", "Something only one person needs", "Asking Maria if you can leave 10 minutes early"],
              ["Group chat", "A short-term topic for a few people", "Three people coordinating a Room 3 supply restock today"],
              ["Channel post", "Team information others should see and find later", "Dr. Shah's Friday schedule change in Scheduling"],
              ["Meeting", "Something that needs a real-time conversation", "The 9:45 Front Office Huddle"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Where does it belong?",
            prompt: "Drag each message to the place it belongs in Teams.",
            buckets: [
              { id: "chat", label: "Chat (one person or a small group)" },
              { id: "channel", label: "Channel post (the whole team)" },
              { id: "meeting", label: "Meeting" },
            ],
            items: [
              { id: "a", text: "Asking Maria privately whether you can swap Friday shifts", bucket: "chat" },
              { id: "b", text: "Telling the front office that the copay reference sheet was updated", bucket: "channel" },
              { id: "c", text: "A 15-minute talk with the whole front desk about a new check-in process", bucket: "meeting" },
              { id: "d", text: "Letting everyone on the team know Dr. Shah is out Friday afternoon", bucket: "channel" },
              { id: "e", text: "Asking Tasha if she has a minute to help with the label printer", bucket: "chat" },
              { id: "f", text: "A video call with IT to walk through a new phone system", bucket: "meeting" },
            ],
            explanation: "Private and short-term goes in a chat. Information the team needs to see and find later goes in a channel. Something that needs everyone talking at the same time is a meeting.",
          },
        ],
      },
      {
        heading: "Which Teams you will use",
        blocks: [
          {
            type: "paragraph",
            text: "At work you sign in to Teams with the work or school account your employer gives you, such as amorgan@lakesidemedical.example. Your organization manages that account: it decides which teams exist, what apps are available, and settings such as how long chat messages are kept. You can use Teams as a desktop app, in a web browser, or on a phone, and your chats, teams, and meetings are the same on each one.",
          },
          {
            type: "table",
            caption: "Two kinds of Teams accounts",
            columns: ["", "Work or school account", "Microsoft Teams (free)"],
            rows: [
              ["Who manages it", "Your employer or school", "You (personal Microsoft account)"],
              ["Made for", "Teams, channels, meetings, and files at work", "Friends, family, and community groups"],
              ["Group meetings", "Set by your organization's plan", "Up to 60 minutes, up to 100 participants"],
              ["Cloud storage", "Work OneDrive and the team's SharePoint site", "5 GB per user"],
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "There is now one Teams app. Microsoft ended classic Teams: after July 1, 2025, the classic client no longer works, and people use the new Teams app or Teams on the web instead. If a guide tells you to download or switch to classic Teams, it is out of date. This course shows current Teams.",
          },
        ],
      },
      {
        heading: "Patient information in Teams",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Lakeside's rule: patient details (names with health information, dates of birth, diagnoses, insurance numbers) belong in the EHR, not in Teams channels or group chats. In Teams, refer to a patient the way the office allows (for example, by appointment time and room) and share only what the person you are messaging needs to do their job. Never post patient information in a channel, in a team with guests from outside Lakeside, or in a chat with someone who does not need it.",
          },
          {
            type: "worked-example",
            title: "Answering Maria's @mention the right way",
            task: "Maria @mentioned you in the Scheduling channel: can you cover the front desk Friday from 1:00 to 5:00 PM?",
            steps: [
              { move: "Open Activity and select Maria's mention.", why: "Activity takes you straight to the exact post. You do not have to remember which team or channel it was in." },
              { move: "Select Reply under her post, not Start a post.", why: "A reply keeps the answer attached to the question. A new post would start a separate conversation that others might miss." },
              { move: "Answer clearly: “Yes, I'm covering the front desk Friday from 1:00 to 5:00 PM.”", why: "Restating the day and times means nobody has to scroll up to know what you agreed to." },
            ],
            result: "Maria and the whole team can see the coverage is confirmed, right under the question.",
            takeaway: "Answer where you were asked. Reply in the thread for channel posts, and in the same chat for chat messages.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Dr. Shah will be out Friday afternoon, and the whole front office needs to reschedule her patients. Where should Maria share this?",
            options: ["In a one-on-one chat with each front desk worker", "As a post in the Front Office team's Scheduling channel", "In her Teams status message", "In a meeting chat for an old meeting"],
            correctIndex: 1,
            explanation: "A channel post reaches the whole team at once, keeps the replies together, and stays searchable for anyone who joins later.",
            optionRationales: [
              "Separate chats repeat the same message many times and nobody sees what the others did.",
              "Correct. Team information belongs in the team's channel, where everyone sees the same message and the replies.",
              "A status message is a short note about your own availability, not a place for team news.",
              "An old meeting chat only reaches the people who were invited to that meeting.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which statement about versions of Teams is true today?",
            options: ["You must install classic Teams to join work meetings", "Classic Teams stopped working after July 1, 2025; people use the new Teams app or Teams on the web", "Microsoft Teams (free) has no limit on meeting length", "A work account and a free account are managed the same way"],
            correctIndex: 1,
            explanation: "Microsoft's end of availability for classic Teams was July 1, 2025. The new Teams app and Teams on the web are what people use now.",
            optionRationales: [
              "Classic Teams no longer works; the new Teams app replaced it.",
              "Correct.",
              "Teams (free) group meetings are limited to 60 minutes.",
              "Your employer manages a work account. You manage a free account yourself.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Your school computer does not let you sign in to Teams, so you will complete this orientation in the Challenge Lab below, a working copy of Lakeside's Teams. Work through the checklist in order:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Activity and open the newest notification.",
          "In the Front Office team's General channel, reply to Maria's welcome post: “Hi everyone, I'm Alex, the new front office assistant.”",
          "Open your chat with Maria Santos and send: “Thanks, Maria. I'll see you at the huddle.”",
          "Accept the invitation “New Staff Orientation.”",
          "Open “New Hire Checklist.docx” from OneDrive.",
          "In a Word document or on paper, write two or three sentences explaining when you would use a chat and when you would use a channel post. Use one Lakeside example for each.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) and your chat-versus-channel sentences to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "find-your-way-around",
    title: "Find Your Way Around Teams",
    description:
      "Learn the parts of the Teams window: the app bar, the Chat list with Favorites, Chats, and Teams and channels, Search, Settings, and the two ways to arrange chats and channels.",
    objectives: [
      "Name the parts of the Teams window and what each one is for",
      "Find any chat, channel, or person with Search (Ctrl+E)",
      "Pin chats and channels so they appear in Favorites",
      "Switch between the Combined and Separate views and explain the difference",
    ],
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/sDb8Xu47xBM",
    slides: slides("find-your-way-around", [
      "A tour of the Teams window",
      "The app bar: Activity, Chat, Calendar, Calls, OneDrive, and Apps",
      "The Chat list: Favorites, Chats, and Teams and channels",
      "Search finds people, chats, and channels (Ctrl+E)",
      "Combined or Separate view: two ways to arrange chats and channels",
      "Keyboard shortcuts worth learning first",
    ]),
    sections: [
      {
        heading: "The Teams window",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Maria asks you to check the Safety and Compliance channel, pull up your chat with Kevin in billing, and open the provider schedule, all before the 9:45 huddle. Every one of those is two or three clicks away, if you know where they live.",
            task: "Learn the layout of Teams so you can get anywhere in a couple of clicks.",
          },
          {
            type: "paragraph",
            text: "The Teams window has the same layout everywhere you go. The app bar runs down the left side. Next to it is a list (your chats, your calendar's controls, your files), and the large area on the right shows whatever you picked from the list. Across the top are Search, Settings and more (…), and your profile picture, where you set your status.",
          },
          {
            type: "table",
            caption: "The app bar on the left",
            columns: ["Button", "What it opens"],
            rows: [
              ["Activity", "Notifications: @mentions, replies to your posts, reactions, and missed calls"],
              ["Chat", "Your chats, and in the default Combined view, your teams and channels too"],
              ["Calendar", "Your meetings and events, with New event and Meet now"],
              ["Calls", "Calling people by name, plus your call history"],
              ["OneDrive", "Your work files: My files, files shared with you, and the Recycle bin"],
              ["Apps", "Apps you can add, such as Planner and Approvals"],
            ],
          },
          {
            type: "image",
            src: "/images/ms-office/teams/module-1/find-your-way-around/infographic.png",
            alt: "Teams window quick reference: the app bar, the Chat list sections, Search, Settings and more, and the profile picture, with the first keyboard shortcuts to learn",
            caption: "Teams window quick reference",
          },
        ],
      },
      {
        heading: "The Chat list: Favorites, Chats, and Teams and channels",
        blocks: [
          {
            type: "paragraph",
            text: "In current Teams, chats and channels live together. Select Chat on the app bar and you see sections: Favorites (anything you pinned), Chats (your one-on-one and group chats, newest first), and Teams and channels (each team you belong to, with its channels underneath). Names in bold have something new. The Filter button at the top narrows the list to Unread, Chats, Channels, or Meetings.",
          },
          {
            type: "paragraph",
            text: "To keep what you use most at the top, pin it. Point to a chat or channel, select More options (…), and choose Pin. Pinned items move into Favorites. Pin the two or three places you check all day (for Alex, that is the Scheduling channel and the chat with Maria), not everything.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Prefer the older arrangement? Teams calls the default layout Combined. You can switch to Separate, which gives teams and channels their own Teams button on the app bar again. At the top of the chat list, select More list options (…) › Customize view, or go to Settings and more (…) › Settings › Chats and channels. Both views show the same chats and channels.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the part of Teams to its job",
            prompt: "Drag each description onto the part of Teams it describes.",
            items: [
              { id: "a", text: "Activity", match: "Shows your @mentions, replies, and reactions" },
              { id: "b", text: "Favorites", match: "Holds the chats and channels you pinned" },
              { id: "c", text: "Search (Ctrl+E)", match: "Finds a person, chat, or channel by name" },
              { id: "d", text: "Settings and more (…)", match: "Opens Settings, such as notifications and devices" },
              { id: "e", text: "Your profile picture", match: "Changes your status and status message" },
            ],
            explanation: "Activity tells you what needs you, Favorites keeps your daily places close, Search gets you anywhere, Settings and more holds your preferences, and your picture controls how others see your availability.",
          },
        ],
      },
      {
        heading: "Search and shortcuts",
        blocks: [
          {
            type: "paragraph",
            text: "The Search box at the top of Teams is the fastest way anywhere. Press Ctrl+E (or select the box), type part of a name, and pick the person, chat, or channel from the list. Choosing a person opens your chat with them. Search also finds messages, which helps when someone asks, “Where did Maria post the holiday schedule?”",
          },
          {
            type: "table",
            caption: "Keyboard shortcuts to learn first (Windows desktop app)",
            columns: ["Press", "To"],
            rows: [
              ["Ctrl+E", "Go to Search"],
              ["Ctrl+N", "Start a new chat"],
              ["Ctrl+. (period)", "See all keyboard shortcuts"],
              ["Ctrl+, (comma)", "Open Settings"],
              ["Ctrl+1, Ctrl+2, …", "Open the app in that position on the app bar"],
            ],
          },
          {
            type: "worked-example",
            title: "Setting up Favorites for a front desk day",
            task: "Make the Scheduling channel and the chat with Maria one click away.",
            steps: [
              { move: "In Chat, under Teams and channels › Front Office, point to Scheduling and select More options (…) › Pin.", why: "Scheduling is where coverage and schedule changes are posted. Pinning puts it in Favorites at the top of the list." },
              { move: "Point to Maria Santos in Chats and select More options (…) › Pin.", why: "Maria is the person you hear from most. A pinned chat never scrolls out of sight." },
              { move: "Mute the Front Desk Lunch Orders group chat (More options › Mute).", why: "Muting stops the notifications but keeps the chat in your list. You can still read it at lunchtime." },
            ],
            result: "The two places you check all day sit in Favorites, and the lunch chat stops interrupting you.",
            takeaway: "Pin what you use daily, mute what you only need sometimes, and search for everything else.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In current Teams with the default Combined view, where do you find the channels of the Front Office team?",
            options: ["Under a Teams button on the app bar", "In Chat, in the Teams and channels section", "In OneDrive", "In Calendar"],
            correctIndex: 1,
            explanation: "In the Combined view, teams and channels are listed in Chat under Teams and channels. The separate Teams button appears only if you switch to the Separate view.",
            optionRationales: [
              "That is the Separate view. In the default Combined view there is no Teams button.",
              "Correct.",
              "OneDrive shows your files, not channels.",
              "Calendar shows meetings and events.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which keyboard shortcut moves you to the Search box?",
            options: ["Ctrl+N", "Ctrl+E", "Ctrl+Shift+M", "Ctrl+,"],
            correctIndex: 1,
            explanation: "Ctrl+E goes to Search. Ctrl+N starts a new chat, Ctrl+Shift+M mutes you in a meeting, and Ctrl+, opens Settings.",
            optionRationales: ["Ctrl+N starts a new chat.", "Correct.", "Ctrl+Shift+M toggles your microphone in a meeting.", "Ctrl+, opens Settings."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Set up your Teams workspace in the Challenge Lab below, a working copy of Lakeside's Teams:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Pin the Scheduling channel.",
          "Pin your chat with Maria Santos.",
          "Mute the group chat “Front Desk Lunch Orders.”",
          "Use Search to open the Billing Questions channel.",
          "Switch to the Separate view.",
          "Switch back to the Combined view.",
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
    slug: "status-and-presence",
    title: "Status, Presence, and Status Messages",
    description:
      "Learn what each Teams status means, when Teams changes your status for you, and how to set a status message that tells coworkers when you will answer and who to contact instead.",
    objectives: [
      "Explain what Available, Busy, Do not disturb, Be right back, Appear away, and Appear offline tell other people",
      "Describe when Teams changes your status automatically",
      "Set, reset, and time a status, and set a status message that clears itself",
      "Write a status message that is useful to coworkers and does not include patient information",
    ],
    duration: "12 min",
    slides: slides("status-and-presence", [
      "Your status tells coworkers when to expect an answer",
      "The six statuses you can choose",
      "When Teams changes your status for you",
      "Status messages: what to say and when to clear it",
      "Change, time, and reset your status",
      "Quick check: which status fits?",
    ]),
    sections: [
      {
        heading: "Why your status matters at the front desk",
        blocks: [
          {
            type: "scenario",
            role: "You are covering the check-in window at Lakeside Medical Associates.",
            text: "Twice this morning, Kevin messaged you a billing question while you were checking in a line of patients, then walked over to ask why you had not answered. Your Teams status said Available the whole time, so as far as Kevin could tell, you were ignoring him.",
            task: "Use your status and a status message so coworkers know when you can answer and who to ask in the meantime.",
          },
          {
            type: "paragraph",
            text: "Your status (Teams also calls it presence) is the small colored dot on your picture. Everyone in your organization sees it next to your name in chats, channels, and meetings. It answers one question for them: can I expect a reply from this person right now? A status message adds a sentence of detail, such as when you will be back and who to contact instead.",
          },
          {
            type: "table",
            caption: "Statuses you can choose",
            columns: ["Status", "What it tells people", "Use it when"],
            rows: [
              ["Available", "You can respond", "You are at your desk and free"],
              ["Busy", "You are working on something; messages still notify you", "You are checking in patients but can glance at messages"],
              ["Do not disturb", "Only priority contacts get through; notifications are silenced", "Training, a meeting you are leading, or focused work"],
              ["Be right back", "You stepped away briefly", "A short break"],
              ["Appear away", "You are away from your desk", "Lunch or a longer break"],
              ["Appear offline", "You look offline, but you can still receive messages", "Rarely; use Do not disturb instead when you need quiet"],
            ],
          },
        ],
      },
      {
        heading: "Automatic status changes",
        blocks: [
          {
            type: "paragraph",
            text: "Teams also sets your status for you. During a meeting, Busy shows as In a meeting, and during a call as In a call, unless you chose Do not disturb. When you share your screen, Teams turns on Do not disturb so pop-up messages do not appear for everyone to see. If your computer locks or goes to sleep, Available changes to Away. When you pick a status yourself, it stays until you change it, until the duration you chose runs out, or until you select Reset status, which hands control back to Teams.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select your picture at the top right of Teams.",
              "Select your current status and pick a new one from the list.",
              "To set it for a limited time, choose Duration, pick the status, choose when to reset it, and select Done.",
              "To go back to automatic, select Reset status.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the right status",
            prompt: "Drag the status that fits each situation.",
            items: [
              { id: "a", text: "Annual privacy training for one hour", match: "Do not disturb" },
              { id: "b", text: "Stepping away for five minutes to restock clipboards", match: "Be right back" },
              { id: "c", text: "Checking in a line of patients, still glancing at messages", match: "Busy" },
              { id: "d", text: "Back at your desk with nothing urgent", match: "Available" },
              { id: "e", text: "Out to lunch for an hour", match: "Appear away" },
            ],
            explanation: "Choose the status that sets the right expectation: Busy when you are working but reachable, Do not disturb when you should not be interrupted, and Be right back or Appear away when you are not at your desk.",
          },
        ],
      },
      {
        heading: "Status messages that help",
        blocks: [
          {
            type: "paragraph",
            text: "A status message appears when people point to your name and, if you choose, when they start typing a message to you. Select your picture › Set status message, type the message, check Show when people message me, pick when it should clear under Clear status message after, and select Done. Choosing a clear time matters: a message that says “At lunch” is confusing at 4:00 PM.",
          },
          {
            type: "worked-example",
            title: "Writing a status message for a check-in shift",
            task: "Let coworkers know you are at the check-in window and who to call for something urgent.",
            steps: [
              { move: "Set your status to Busy.", why: "You can still glance at messages, but people should not expect an instant reply." },
              { move: "Type: “Covering the check-in window until 1:00 PM. For urgent schedule changes, call ext. 210.”", why: "It says what you are doing, when it ends, and gives a backup for anything urgent. That is everything someone needs to decide whether to wait." },
              { move: "Choose Today under Clear status message after, and select Done.", why: "The message disappears on its own, so you do not leave an out-of-date note for tomorrow." },
            ],
            result: "Kevin sees the note the moment he starts typing and calls ext. 210 for the urgent question instead of walking over.",
            takeaway: "A good status message answers three questions: what are you doing, until when, and who can help in the meantime.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Everyone in the organization can see your status message. Never include patient details, such as “With Mrs. ___ about her test results.” Describe your task, not the patient.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You picked Do not disturb for training and forgot to change it. Two hours later coworkers think you are still unavailable. What is the best way to hand your status back to Teams?",
            options: ["Restart your computer", "Select your picture › your status › Reset status", "Set a status message", "Choose Appear offline"],
            correctIndex: 1,
            explanation: "Reset status returns control to Teams, which sets your status automatically from your activity and calendar. Next time, choose Duration so it resets on its own.",
            optionRationales: [
              "Restarting does not change a status you chose yourself.",
              "Correct.",
              "A status message adds text; it does not change the status.",
              "Appear offline would make the problem worse.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which status message is the most useful and appropriate?",
            options: ["“Busy.”", "“With a patient about her lab results until 2.”", "“At the check-in window until 1:00 PM. For urgent questions, call ext. 210.”", "“Don't message me.”"],
            correctIndex: 2,
            explanation: "It tells people what you are doing, until when, and who to contact instead, without any patient information.",
            optionRationales: [
              "Your status already says Busy. The message should add detail.",
              "It includes patient health information that does not belong in a status message.",
              "Correct.",
              "It is unprofessional and gives no alternative.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "You are stepping away for lunch and Omar Haddad is covering check-in. Complete these steps in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Set your status to Be right back.",
          "Set the status message “At lunch until 1:00 PM. Omar Haddad is covering check-in.” Show it when people message you, and clear it after 1 hour.",
          "When you are back, set your status to Available.",
          "Clear your status message.",
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
    slug: "notifications-and-settings",
    title: "Notifications, Activity, and Settings",
    description:
      "Control which Teams notifications reach you and how, mute busy chats, set channel notifications, and set up and test your headset before your first call.",
    objectives: [
      "Use the Activity feed to catch up on what needs you",
      "Choose where each kind of notification appears in Settings › Notifications and activity",
      "Mute a chat and set channel notifications for the channels you follow",
      "Choose a speaker and microphone in Settings › Devices and make a test call",
    ],
    duration: "15 min",
    slides: slides("notifications-and-settings", [
      "Notifications: keep the alerts that matter, quiet the rest",
      "The Activity feed is your to-do list",
      "Notification settings: banner, feed, or off",
      "Mute a chat, set channel notifications",
      "Set up your headset and make a test call",
      "A notification plan for the front desk",
    ]),
    sections: [
      {
        heading: "Too many pings",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "By 10:00 AM you have had 26 pop-up banners: lunch orders, potluck sign-ups, and reactions to a message you sent yesterday. In the middle of them was Maria's question about Friday coverage, and you almost missed it. Your new headset also arrived, and your first call with IT is this afternoon.",
            task: "Set up notifications so the messages that need you stand out, and get your headset working before the call.",
          },
          {
            type: "paragraph",
            text: "Teams can tell you about something in two places: a banner (a pop-up on your screen) and the Activity feed. The Activity feed keeps a list of @mentions, replies to your posts, reactions, and missed calls. Banners interrupt you; the feed waits for you. A good notification plan sends the important things to both and the nice-to-know things to the feed only, or nowhere.",
          },
          {
            type: "list",
            items: [
              "Open Activity on the app bar to catch up. Unread items are bold; select one to jump to the exact message.",
              "Use the filters at the top of the feed (such as Unread and @Mentions) to see only what needs you.",
              "An @mention of your name is the clearest sign that someone needs an answer from you.",
            ],
          },
        ],
      },
      {
        heading: "Choose where each notification appears",
        blocks: [
          {
            type: "paragraph",
            text: "Select Settings and more (…) next to your picture › Settings › Notifications and activity. For each kind of notification you can choose where it appears or turn it off. You also set meeting notifications here, such as alerts when a meeting starts and notifications for meeting chats.",
          },
          {
            type: "table",
            caption: "A notification plan for the front desk (the kinds of notifications in Settings › Notifications and activity › Chats and channels and Meetings)",
            columns: ["Kind of notification", "Suggested setting", "Why"],
            rows: [
              ["Mentions of me", "Activity feed and banner", "Someone needs an answer from you"],
              ["Chat messages", "Activity feed and banner", "Most chats at work are questions for you"],
              ["Replies to my posts", "Activity feed and banner", "Follow-ups on what you started"],
              ["Reactions to my messages", "Off (or Activity feed only)", "Nice to see, rarely needs action"],
              ["Meeting chat", "Activity feed only", "Meeting chats can be busy; read them when you join"],
            ],
          },
          {
            type: "paragraph",
            text: "Two quicker controls handle individual conversations. To quiet one chat, point to it, select More options (…) › Mute. You stop getting notifications but can still read it. For a channel, point to it and select More options (…) › Channel notifications. You can turn notifications for new posts on or off and choose whether they appear as a banner and in the feed or only in the feed.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Banner, feed, or off?",
            prompt: "Sort each notification into the setting that fits a front office assistant.",
            buckets: [
              { id: "both", label: "Activity feed and banner" },
              { id: "feed", label: "Activity feed only" },
              { id: "off", label: "Off or muted" },
            ],
            items: [
              { id: "a", text: "Maria @mentions you about Friday coverage", bucket: "both" },
              { id: "b", text: "A new chat message from Dr. Shah", bucket: "both" },
              { id: "c", text: "Someone reacted with a thumbs up to your message", bucket: "off" },
              { id: "d", text: "Every new post in the Staff Events channel", bucket: "off" },
              { id: "e", text: "New messages in the chat for a meeting you are invited to", bucket: "feed" },
              { id: "f", text: "Lunch orders in the Front Desk Lunch Orders chat", bucket: "off" },
            ],
            explanation: "Interrupt yourself only for things that need you now. Everything else can wait in the feed or be muted.",
          },
        ],
      },
      {
        heading: "Set up your audio before the first call",
        blocks: [
          {
            type: "paragraph",
            text: "Plug in your headset, then open Settings and more (…) › Settings › Devices. Choose the headset in the Speaker list and in the Microphone list, check Noise suppression, and select Make a test call. Teams asks you to record a short message and plays it back, then shows the results for your microphone, speaker, camera, and network. Fixing a wrong microphone here takes ten seconds; fixing it in front of six people on a call takes much longer.",
          },
          {
            type: "worked-example",
            title: "Getting ready for the 2:00 PM call with IT",
            task: "Make sure the new headset works before the call starts.",
            steps: [
              { move: "Open Settings and more (…) › Settings › Devices.", why: "Devices is where Teams decides which speaker, microphone, and camera to use for every call and meeting." },
              { move: "Choose Headset Earphone (Jabra Evolve2 40) as the speaker and Headset Microphone (Jabra Evolve2 40) as the microphone.", why: "Teams may keep using the laptop's built-in speaker and microphone until you tell it otherwise. The built-in microphone also picks up the whole waiting room." },
              { move: "Select Make a test call and listen to the playback.", why: "Hearing yourself confirms that both directions work before anyone else is waiting on you." },
            ],
            result: "When the IT call starts, your audio works the first time.",
            takeaway: "Set up and test new audio equipment before the call, not during it.",
          },
          {
            type: "callout",
            variant: "info",
            text: "While you are in Settings, look at Appearance and accessibility: you can choose Follow operating system theme, Light, or Dark. You will see more accessibility settings in Module 6.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want to keep reading the Front Desk Lunch Orders group chat but stop it from interrupting you. What should you do?",
            options: ["Leave the chat", "Hide the chat", "Mute the chat", "Turn off all notifications in Settings"],
            correctIndex: 2,
            explanation: "Muting stops notifications for that chat but keeps it in your list so you can read it whenever you want.",
            optionRationales: [
              "Leaving removes you from the conversation entirely.",
              "Hiding moves it out of your list until a new message arrives; it does not stop the notifications for the next message.",
              "Correct.",
              "Turning everything off would also silence messages you need, like @mentions.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Where do you choose the speaker and microphone Teams uses and make a test call?",
            options: ["Settings › Devices", "Settings › Appearance and accessibility", "The Activity feed", "Calendar › New event"],
            correctIndex: 0,
            explanation: "Settings › Devices controls your speaker, microphone, camera, and noise suppression, and has Make a test call.",
            optionRationales: ["Correct.", "Appearance and accessibility controls the theme.", "Activity shows notifications.", "New event schedules a meeting."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Put a notification plan into practice in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Turn off notifications for the Staff Events channel.",
          "In Settings › Notifications and activity, turn off notifications for reactions to your messages.",
          "Set meeting chat notifications to Activity feed only.",
          "Set your speaker and microphone to the Jabra Evolve2 40 headset.",
          "Make a test call.",
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
