import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/teams/module-6";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const teamsModule6Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "calls",
    title: "Calls in Teams",
    description:
      "Make audio and video calls to coworkers from a chat or the Calls app, use the call controls, know when a call beats a message, and understand what calling phone numbers requires.",
    objectives: [
      "Start an audio or video call from a chat, or call someone from the Calls app",
      "Use the call controls: Mic, Camera, Share, and Leave, with their shortcuts",
      "Decide when a quick call works better than a chat, and follow up in writing",
      "Explain that calls between Teams users at work are built in, while calling phone numbers needs Teams Phone",
    ],
    duration: "12 min",
    slides: slides("calls", [
      "A quick call can save ten messages",
      "Call from a chat: Video call or Audio call",
      "The Calls app",
      "Call controls and shortcuts",
      "Teams calls and phone numbers",
      "Call, then confirm in writing",
    ]),
    sections: [
      {
        heading: "When a call beats a chat",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "The check-in label printer is jammed again. You and Luis in IT have traded nine chat messages (“Is the light blinking?” “Which light?”) while patients wait in line. A two-minute call would have fixed it.",
            task: "Know when to call instead of typing, place the call quickly, and confirm what you agreed in writing afterward.",
          },
          {
            type: "paragraph",
            text: "Teams calls are one-on-one or small-group audio or video conversations that you start right away, without scheduling a meeting. They work best for something urgent, something easier to show than to describe, or a back-and-forth that is going nowhere in chat. If the person's status is Busy or Do not disturb and it is not urgent, send a message instead.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "From a chat: open the chat and select Video call or Audio call at the top right. To call several people, start a group chat with them first (calls from a chat work for up to 20 people).",
              "From the Calls app: select Calls on the app bar, type a name in the box, and select the person to call. You can also call from someone's profile card.",
              "To answer an incoming call, choose video or audio on the call notification (Ctrl+Shift+A accepts with video, Ctrl+Shift+S with audio).",
            ],
          },
        ],
      },
      {
        heading: "Call controls",
        blocks: [
          {
            type: "table",
            caption: "Call controls work like meeting controls",
            columns: ["Control", "Shortcut (Windows)", "Use it to"],
            rows: [
              ["Mic", "Ctrl+Shift+M", "Mute while the front desk is noisy"],
              ["Camera", "Ctrl+Shift+O", "Turn on video to show something"],
              ["Share", "Ctrl+Shift+E", "Show one window, such as an error message"],
              ["Leave", "Ctrl+Shift+H", "Hang up"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Calls between Teams users in your organization are built into Teams. Calling regular phone numbers from Teams is different: your organization needs Teams Phone licenses and a phone service connected to Teams. If you see a dial pad in Calls, your organization has set that up for you.",
          },
          {
            type: "worked-example",
            title: "Fixing the printer with one call",
            task: "Get the label printer working before the next patient reaches the window.",
            steps: [
              { move: "In Calls, type Luis and select Luis Ortega to call him.", why: "Showing and talking is faster than describing lights in a chat." },
              { move: "Mute while Luis checks the printer log on his end.", why: "Your microphone would pick up the waiting room. Mute until you need to talk." },
              { move: "When it works, unmute, thank him, and hang up with Leave.", why: "Short calls end when the problem is solved." },
              { move: "Send a chat: “Printer fixed: Luis cleared the jam and replaced the roller.”", why: "A written note tells anyone who checks later what happened. Calls leave no record unless you write one." },
            ],
            result: "The printer works, and the fix is written down.",
            takeaway: "Call to solve, then write to confirm.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Call or message?",
            prompt: "Sort each situation.",
            buckets: [
              { id: "call", label: "Call" },
              { id: "msg", label: "Send a message" },
            ],
            items: [
              { id: "a", text: "The printer is jammed and patients are waiting", bucket: "call" },
              { id: "b", text: "Asking Kevin to update a spreadsheet by Friday", bucket: "msg" },
              { id: "c", text: "Tasha needs to see the supply shelf to know what to order", bucket: "call" },
              { id: "d", text: "Maria is in Do not disturb and the question is not urgent", bucket: "msg" },
              { id: "e", text: "Nine messages in, and you still don't understand each other", bucket: "call" },
            ],
            explanation: "Call when it is urgent, visual, or going in circles. Message when it can wait or needs a written record.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where do you start an audio call with someone you are already chatting with?",
            options: ["Calendar › New event", "Audio call at the top right of the chat", "Settings › Devices", "Activity"],
            correctIndex: 1,
            explanation: "Every chat has Video call and Audio call at the top right.",
            optionRationales: ["That schedules a meeting.", "Correct.", "Devices is for setting up audio and video.", "Activity lists notifications."],
          },
          {
            type: "knowledge-check",
            question: "Which is true about calling phone numbers from Teams at work?",
            options: ["Anyone can call any phone number for free", "It needs Teams Phone licenses and a phone service your organization sets up", "It only works on the mobile app", "It is the same as a Teams-to-Teams call"],
            correctIndex: 1,
            explanation: "Teams-to-Teams calls are built in. Calling regular phone numbers needs Teams Phone and a connected phone service.",
            optionRationales: ["Phone calls need setup and licenses.", "Correct.", "It is not limited to mobile.", "Phone calls go through a phone network; Teams-to-Teams calls do not."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Make two calls and follow up in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Start an audio call with Kevin Patel from your chat with him.",
          "Mute yourself while Kevin looks up the copay rule, then hang up.",
          "Send Kevin a written summary: “Confirmed: copays are collected at check-in.”",
          "In Calls, call Omar Haddad.",
          "Hang up.",
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
    slug: "apps-planner-and-approvals",
    title: "Apps in Teams: Planner, Approvals, and Copilot",
    description:
      "Add and pin apps, track team tasks with Planner, send approval requests with Approvals, know what Lists and Forms are for, and use Copilot in Teams responsibly if your organization provides it.",
    objectives: [
      "Open an app from Apps and pin it to the app bar",
      "Add, assign, and complete tasks in Planner (My Day, My Tasks, My Plans)",
      "Send an approval request with the Approvals app",
      "Describe what Copilot in Teams can do, what it requires, and how to use it responsibly",
    ],
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/KVYUPf3xETM",
    slides: slides("apps-planner-and-approvals", [
      "Apps bring your work into Teams",
      "Find and pin apps",
      "Planner: My Day, My Tasks, My Plans",
      "Approvals: ask, approve, and keep a record",
      "Lists, Forms, and channel tabs",
      "Copilot in Teams: optional, and only with your organization's approval",
    ]),
    sections: [
      {
        heading: "Apps bring your work into Teams",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "The flu clinic is Saturday. Tasks live on sticky notes, in three chats, and in Maria's head. You also need Maria to approve a $38 replacement roller for the label printer, and last time the request got lost in her email.",
            task: "Use Planner to track who is doing what, and Approvals to make a request that cannot get lost.",
          },
          {
            type: "paragraph",
            text: "Apps add tools to Teams. Select Apps on the app bar to browse, search for an app (such as Planner), and open or add it. An app you open appears on the app bar; to keep it there, right-click its icon and select Pin. Apps can also be added as tabs in channels and chats (Module 3). Your organization decides which apps are available.",
          },
        ],
      },
      {
        heading: "Planner",
        blocks: [
          {
            type: "paragraph",
            text: "Planner (called Tasks by Planner and To Do before 2024) collects your tasks in one place. My Day shows tasks due today and anything you add to it. My Tasks shows your private tasks, tasks assigned to you, and flagged emails. My Plans shows personal and shared plans. A shared plan can also be a Planner tab in a channel, so the whole team sees the same tasks.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Open Planner and go to My Tasks (or a plan).",
              "Type the task name in Add new task.",
              "Set a due date and assign it to the person who will do it.",
              "Select the circle next to a task to mark it complete.",
            ],
          },
          {
            type: "worked-example",
            title: "Tracking the flu clinic tasks",
            task: "Turn sticky notes into tasks with an owner and a due date.",
            steps: [
              { move: "Add “Order flu clinic signage,” due Friday, assigned to yourself.", why: "A task with one owner and a date gets done; “someone should order signs” does not." },
              { move: "Add “Confirm volunteer list,” due Thursday, assigned to Tasha.", why: "Tasha sees it in her own Planner, so nobody has to remind her in chat." },
              { move: "Mark “Restock intake clipboards” complete.", why: "Checking it off tells Maria it is done without another message." },
            ],
            result: "Everyone can see what is left, who owns it, and when it is due.",
            takeaway: "Every task gets one owner and a due date.",
          },
        ],
      },
      {
        heading: "Approvals, Lists, and Forms",
        blocks: [
          {
            type: "paragraph",
            text: "The Approvals app sends a request to one or more approvers and keeps a record of the request and the answer. Open Approvals, select New approval request, give it a clear name, add the approvers, add the details they need to decide (what, why, and how much), and select Send. You can see the status of requests you sent and received in the app. Approvals is available in Teams by default, but your organization can turn it off, and it runs on Power Automate behind the scenes.",
          },
          {
            type: "table",
            caption: "Other apps you may see in Teams",
            columns: ["App", "Use it for", "Lakeside example"],
            rows: [
              ["Lists", "Tracking information in rows and columns that a team updates", "Supply requests or equipment issues"],
              ["Forms", "Surveys, quizzes, and sign-up forms", "Staff lunch preferences or training sign-ups"],
              ["Planner tab", "A shared task plan in a channel", "Front Office tasks in the Scheduling channel"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Which app?",
            prompt: "Drag the app onto the job it fits.",
            items: [
              { id: "a", text: "Maria needs to OK a $38 purchase, with a record", match: "Approvals" },
              { id: "b", text: "Assign “Confirm volunteer list” to Tasha by Thursday", match: "Planner" },
              { id: "c", text: "Ask staff which training times work for them", match: "Forms" },
              { id: "d", text: "Track every broken piece of equipment and its status", match: "Lists" },
            ],
            explanation: "Planner tracks tasks, Approvals records decisions, Forms collects answers, and Lists tracks items over time.",
          },
        ],
      },
      {
        heading: "Copilot in Teams (optional)",
        blocks: [
          {
            type: "paragraph",
            text: "Some organizations turn on Copilot, Microsoft's AI assistant, in Teams. When it is turned on, Copilot appears at the top of Chat, where you can ask it questions or ask it to draft a message. Using Copilot in your chats, meetings, and calls (for example, to summarize what was discussed in a meeting or list follow-up tasks) needs a Microsoft 365 Copilot license. AI meeting recaps (intelligent recap) need a Teams Premium or Microsoft 365 Copilot license. Your organization decides whether you see Copilot and which licenses you have, so you may not see these features at work.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "AI can be wrong. Check Copilot's answers and the sources it shows before you rely on them or send them to anyone. Use only the AI tools your organization approves, and never paste patient information into an AI tool unless Lakeside has approved that tool for patient information.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You opened Planner from Apps and want it to stay on the app bar. What do you do?",
            options: ["Nothing; apps always stay", "Right-click Planner on the app bar and select Pin", "Add it as a status message", "Restart Teams"],
            correctIndex: 1,
            explanation: "Pinning keeps an app on the app bar after you leave it.",
            optionRationales: ["An app you open shows only while you use it unless you pin it.", "Correct.", "Status messages are about your availability.", "Restarting does not pin apps."],
          },
          {
            type: "knowledge-check",
            question: "Which is the most responsible way to use Copilot in Teams at a medical office?",
            options: ["Paste patient notes in to get a quick summary", "Use it only if your organization provides it, check its answers, and keep patient information out unless the tool is approved for it", "Send its drafts without reading them", "Use a personal AI app instead when Copilot is not available"],
            correctIndex: 1,
            explanation: "Approved tools, human review, and no patient information unless approved.",
            optionRationales: [
              "Patient information goes only into tools the practice has approved for it.",
              "Correct.",
              "AI drafts can contain mistakes; read before you send.",
              "Personal AI apps are not approved work tools.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Track the work and get the approval in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Pin Planner and Approvals to the app bar.",
          "In Planner, add “Print flu clinic sign-in sheets,” due Friday, October 23, assigned to Omar Haddad.",
          "Mark “Update the copay log” complete.",
          "In Approvals, send Renee Walker a request named “Headset for check-in window 2” with the details “Jabra Evolve2 40 headset, $89.”",
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
    slug: "loop-components",
    title: "Loop Components: Lists and Tables Everyone Can Edit",
    description:
      "Send a Loop component (a paragraph, checklist, or table) in a chat so everyone can edit the same content right in the conversation, and know where Loop components are stored and who can see them.",
    objectives: [
      "Send a Loop component in a chat with the Loop components button",
      "Add to a Loop component someone else sent",
      "Explain that Loop components are saved in the creator's OneDrive and editable by everyone in the chat",
      "Decide when a Loop component works better than a string of replies",
    ],
    duration: "12 min",
    slides: slides("loop-components", [
      "One list everyone edits, right in the chat",
      "Send a Loop component",
      "Edit together: everyone sees changes instantly",
      "Where Loop components live and who can see them",
      "Loop component or regular message?",
      "Quick check",
    ]),
    sections: [
      {
        heading: "One list instead of twenty replies",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Last year the flu clinic supply list was built from 23 chat replies (“also gloves,” “we have gloves,” “need more bandages”), and two boxes of the wrong supplies were ordered. This year Maria sent the list as a Loop component.",
            task: "Add to a shared Loop list and send your own Loop components so a group works on one up-to-date list.",
          },
          {
            type: "paragraph",
            text: "A Loop component is a small piece of content, such as a paragraph, a checklist, or a table, that you send in a chat. Everyone in the chat can edit it right in the conversation, and changes appear for everyone instantly. Instead of replying “add alcohol pads,” you add alcohol pads to the list.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Open the chat.",
              "In the compose box, select Loop components (the Loop icon).",
              "Choose a component type, such as Paragraph, Checklist, or Table.",
              "Add a title or a short message and any first items, then select Send.",
              "Others edit the component right in the chat. In a Loop component, typing / offers options such as @mentions and dates, and typing // adds a comment.",
            ],
          },
        ],
      },
      {
        heading: "Where Loop components live",
        blocks: [
          {
            type: "paragraph",
            text: "A Loop component you send in chat is saved automatically as a .loop file in your OneDrive, and people in the chat can edit it. The file also shows up in OneDrive and the Loop app, where it opens in a browser. You need a OneDrive to create Loop components; without one, you may still be able to edit components others send, but you can't create your own.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Treat a Loop component like any shared file: everyone in the chat can see and change it, and the link can be shared. Keep patient information out of Loop components in chats unless Lakeside has approved it.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Loop component or regular message?",
            prompt: "Sort each situation.",
            buckets: [
              { id: "loop", label: "Loop component" },
              { id: "msg", label: "Regular message" },
            ],
            items: [
              { id: "a", text: "A supply list several people will add to", bucket: "loop" },
              { id: "b", text: "Telling Tasha the 10:30 patient is ready", bucket: "msg" },
              { id: "c", text: "A table of Friday's reschedule calls and who is calling each", bucket: "loop" },
              { id: "d", text: "Thanking Luis for fixing the printer", bucket: "msg" },
              { id: "e", text: "Collecting everyone's lunch order", bucket: "loop" },
            ],
            explanation: "Use a Loop component when several people will add to or update the same content. Use a regular message for a one-time update.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "How do you send a Loop component in a Teams chat?",
            options: ["Settings › Loop", "Select Loop components in the compose box and pick a component type", "Attach a Word file", "Start a meeting"],
            correctIndex: 1,
            explanation: "The Loop components button in the compose box lets you choose a paragraph, checklist, table, or other component.",
            optionRationales: ["Loop is not a setting.", "Correct.", "A Word file is a separate document, not a Loop component.", "Meetings are a different tool."],
          },
          {
            type: "knowledge-check",
            question: "Who can edit a Loop component you send in a group chat?",
            options: ["Only you", "Everyone in the chat", "Only your manager", "Nobody; it is read-only"],
            correctIndex: 1,
            explanation: "Everyone in the chat can edit it inline, and the changes show for everyone.",
            optionRationales: ["Loop components are made to be edited together.", "Correct.", "Everyone in the chat can edit, not just one person.", "They are editable, not read-only."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Work on one list together in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Add “Ice packs” to Maria's flu clinic supplies checklist.",
          "Reply to Maria's checklist message: “Added ice packs. Everything else is in the supply closet.”",
          "In your chat with Tasha Greene, send a Checklist Loop component with the message “Room 2 restock list.”",
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
    slug: "accessibility-and-mobile",
    title: "Accessibility and Teams on Your Phone",
    description:
      "Use the accessibility tools built into Teams (Immersive Reader, live captions, themes, zoom, keyboard shortcuts, and screen reader support), and use the Teams mobile app safely at work.",
    objectives: [
      "Open a message in Immersive Reader and use its reading tools",
      "Change the Teams theme and zoom level, and use keyboard shortcuts",
      "Turn on live captions and set noise suppression so others can hear you",
      "Use the Teams mobile app safely, keeping patient information private",
    ],
    duration: "15 min",
    slides: slides("accessibility-and-mobile", [
      "Teams has accessibility tools built in",
      "Immersive Reader",
      "See it your way: theme and zoom",
      "Hear and be heard: captions and noise suppression",
      "Keyboard shortcuts and screen readers",
      "Teams on your phone",
    ]),
    sections: [
      {
        heading: "Accessibility tools are for everyone",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Renee posted a long list of new privacy steps for check-in. Omar, who has dyslexia, says long posts are hard to get through. The afternoon sun makes your screen hard to read, and the front desk is too loud to hear the huddle clearly.",
            task: "Use the tools built into Teams so everyone, including you, can read, hear, and take part.",
          },
          {
            type: "table",
            caption: "Accessibility tools in Teams",
            columns: ["Need", "Tool", "Where"],
            rows: [
              ["Reading long text", "Immersive Reader: read aloud, text size and spacing, line focus, translation", "Point to a message › More options (…) › Immersive Reader"],
              ["Seeing the screen", "Theme (Follow operating system theme, Light, Dark) and high contrast", "Settings and more (…) › Settings › Appearance and accessibility"],
              ["Seeing the screen", "Zoom in and out", "Ctrl+= and Ctrl+-"],
              ["Hearing meetings", "Live captions", "In a meeting: More (…) › Captions"],
              ["Being heard", "Noise suppression", "Settings › Devices"],
              ["Using the keyboard", "Keyboard shortcuts", "Ctrl+. shows them all"],
              ["Using a screen reader", "Support for Windows Narrator, JAWS, and NVDA", "Works with Teams on Windows"],
            ],
          },
          {
            type: "image",
            src: "/images/ms-office/teams/module-6/accessibility-and-mobile/infographic.png",
            alt: "Accessibility in Teams quick reference: Immersive Reader, theme and zoom, live captions and noise suppression, keyboard shortcuts and screen readers, and tips for posts that work for everyone",
            caption: "Accessibility in Teams quick reference",
          },
          {
            type: "paragraph",
            text: "Teams also has a Sign language mode for meetings with sign language interpreters. Your coworkers may use any of these tools. Writing clear posts with headings or numbered lists, and not relying on color alone, helps everyone who uses them.",
          },
        ],
      },
      {
        heading: "Use the tools",
        blocks: [
          {
            type: "worked-example",
            title: "Getting through Renee's privacy steps",
            task: "Read a long post comfortably and make sure you understood it.",
            steps: [
              { move: "Point to Renee's post › More options (…) › Immersive Reader.", why: "It opens the text full screen with larger, spaced-out text and can read it aloud." },
              { move: "Use the text size controls, and select Play to hear it read.", why: "Hearing and seeing the text together helps many readers, not only people with dyslexia." },
              { move: "Close Immersive Reader and reply to confirm what you changed at your desk.", why: "Replying shows Renee the steps were understood and done." },
            ],
            result: "You read the full post and confirmed it in the thread.",
            takeaway: "Use the reading tools whenever text is long or hard to read, and write posts that work well with them.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the need to the tool",
            prompt: "Drag the tool that helps each coworker.",
            items: [
              { id: "a", text: "Omar finds long posts hard to read", match: "Immersive Reader" },
              { id: "b", text: "Tasha can't hear the huddle over the waiting room", match: "Live captions" },
              { id: "c", text: "Screen glare makes text hard to see", match: "Theme or zoom" },
              { id: "d", text: "Kevin prefers not to use a mouse", match: "Keyboard shortcuts" },
              { id: "e", text: "The meeting can hear the front desk behind you", match: "Noise suppression" },
            ],
            explanation: "Each tool solves a specific barrier. Knowing them lets you help coworkers, not just yourself.",
          },
        ],
      },
      {
        heading: "Teams on your phone",
        blocks: [
          {
            type: "paragraph",
            text: "The Teams mobile app for iPhone and Android uses the same work account, so your chats, channels, meetings, and files are the same as on your computer. It is handy for checking a schedule change or joining a meeting away from your desk. Your organization may require you to install it a certain way or may not allow work apps on personal phones; follow Lakeside's mobile device policy.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "A phone is easy to lose and easy for others to see. Lock your phone, do not open patient information in public places, and remember that notifications can show message previews on your lock screen.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where do you open Immersive Reader for a Teams message?",
            options: ["Settings › Devices", "Point to the message › More options (…) › Immersive Reader", "Calendar", "The Apps page"],
            correctIndex: 1,
            explanation: "Immersive Reader opens from a message's More options menu.",
            optionRationales: ["Devices is for audio and video.", "Correct.", "Calendar is for meetings.", "Immersive Reader is not an app you add."],
          },
          {
            type: "knowledge-check",
            question: "Which shortcut shows all Teams keyboard shortcuts on Windows?",
            options: ["Ctrl+E", "Ctrl+. (period)", "Ctrl+Shift+M", "Ctrl+N"],
            correctIndex: 1,
            explanation: "Ctrl+. (period) shows the keyboard shortcuts list.",
            optionRationales: ["Ctrl+E goes to Search.", "Correct.", "Ctrl+Shift+M mutes in a meeting.", "Ctrl+N starts a new chat."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Try the accessibility tools in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Renee's post in Immersive Reader.",
          "Close Immersive Reader and change the theme to Light.",
          "Join the Front Office Huddle and turn on live captions.",
          "Raise your hand using the keyboard shortcut or the Raise button.",
          "In a Word document or on paper, name two accessibility tools in Teams and one coworker situation where each would help.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) and your two examples to your instructor or course folder.",
      },
    ],
  },
];
