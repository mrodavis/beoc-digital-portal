import { Lesson } from "@/types/lesson";

const IMG = "/images/google-workspace/module-8";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

/** Module 8: Working Together. Scenario: Parkview Property Management (fictional). */
export const gwModule8Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "google-chat-and-spaces",
    title: "Message Your Team in Google Chat",
    description:
      "Use Google Chat for quick team conversations: direct messages, spaces, @mentions, reactions, and sharing Drive files with the right access.",
    objectives: [
      "Open Google Chat in Gmail and start a direct message or a group message",
      "Create a space and add people to it",
      "Mention someone with @, and decide whether to add them to the space",
      "Share a Google Drive file in a message and choose the access people get",
      "Decide when a message belongs in Chat and when it belongs in email",
    ],
    duration: "25 min",
    slides: slides("google-chat-and-spaces", [
      "Google Chat: quick conversations for your team",
      "Direct messages and group messages",
      "Spaces: a home for a team or project",
      "@mentions: get one person's attention",
      "Share a Drive file in Chat",
      "Chat or email?",
    ]),
    sections: [
      {
        heading: "Quick questions, without the email thread",
        blocks: [
          {
            type: "scenario",
            role: "You're coordinating the Riverside Commons lobby repaint.",
            text: "The repaint starts next week. Kim needs to check the lobby lights, Andre needs to know prospects should use the side door, and everyone needs the repaint schedule. Ten short emails would bury the office. Parkview uses Google Chat for quick team conversations like these.",
            task: "Send a direct message, post updates in the team space, share the schedule, and set up a new space.",
          },
          {
            type: "paragraph",
            text: "Google Chat is Google's messaging app. You can use it at chat.google.com or inside Gmail: select Chat on the far left of Gmail. Chat has direct messages (DMs) between two or more people, and spaces, where a team or project keeps its conversation, files, and members in one place.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Direct message (DM)", definition: "A private conversation with one person, or a group DM with a few people." },
              { term: "Space", definition: "A named place for a team or project conversation. People can be added or leave, and new members see the conversation." },
              { term: "@mention", definition: "Typing @ and a name in a message so that person gets a notification." },
              { term: "Reaction", definition: "An emoji you add to a message to answer without writing a new one." },
              { term: "Shortcuts", definition: "Home, Mentions, and Starred at the top of Chat's left side. Mentions lists messages where someone mentioned you." },
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Microsoft Teams users: Google Chat's direct messages are like Teams chats, and spaces are like channels in a team.",
          },
        ],
      },
      {
        heading: "Direct messages",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "In Gmail, select Chat on the far left (or open chat.google.com).",
              "Select New chat at the top left.",
              "Enter a name or email address. For a group message, add more names.",
              "Select Start chat, type your message in the box at the bottom, and select Send (or press Enter).",
            ],
          },
          {
            type: "tip",
            text: "The first time you message someone, they may need to accept your message request before you can chat. If your work account allows chatting with people outside your organization, their names show an External badge, so you always know when a conversation includes outsiders.",
          },
        ],
      },
      {
        heading: "Spaces for teams and projects",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select New chat › Create a space.",
              "Enter a space name. You can also choose an emoji for the space's picture.",
              "Select Create.",
              "In the space, select Add people, pick the people, and select Add.",
            ],
          },
          {
            type: "paragraph",
            text: "A space keeps a project together: the conversation, the files people share, and the list of members. When the lobby repaint is over, the space still holds the whole history. With a personal Google Account you can create spaces for collaborating with others; work accounts may have more kinds of spaces, depending on your organization.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Direct message or space?",
            prompt: "Sort each conversation into the best place.",
            buckets: [
              { id: "dm", label: "Direct message" },
              { id: "space", label: "Space" },
            ],
            items: [
              { id: "a", text: "Asking Kim whether she can check the lobby lights today", bucket: "dm" },
              { id: "b", text: "Daily updates about the lobby repaint for everyone working on it", bucket: "space" },
              { id: "c", text: "Telling Priya, privately, that a tenant's check bounced", bucket: "dm" },
              { id: "d", text: "A home for everything about Elm Street move-ins this fall", bucket: "space" },
              { id: "e", text: "Sharing the repaint schedule so the whole team can find it later", bucket: "space" },
            ],
            explanation: "A direct message is for a quick or private exchange with one or a few people. A space is for a team or project, where new members can catch up and files stay together.",
          },
        ],
      },
      {
        heading: "Mentions, reactions, and files",
        blocks: [
          {
            type: "table",
            caption: "Everyday Chat actions",
            columns: ["To", "Do this"],
            rows: [
              ["Get one person's attention", "Type @ and their name, and pick them from the list. They get a notification."],
              ["Mention someone who isn't in the space", "Chat asks: Add member and send (adds them and notifies them) or Send message only."],
              ["Notify everyone in the space", "Type @all. Use it only when everyone really needs to see the message."],
              ["Answer with an emoji", "Point to the message and add a reaction."],
              ["Share a Drive file", "Type @ and part of the file name, and pick the file under Files. If someone can't open it, Chat asks you to select the type of access."],
              ["Share a file from your computer", "Upload file, or drag the file into the message box (up to 200 MB)."],
            ],
          },
          {
            type: "worked-example",
            title: "Sharing the repaint schedule",
            task: "Get the schedule to everyone in the Riverside Commons Team space.",
            steps: [
              { move: "Type “Here's the repaint schedule.” then @Lobby, and pick Lobby Repaint Schedule under Files.", why: "The message carries a link to the one current file, not a copy." },
              { move: "Press Enter. Chat says some members can't open the file and asks for the type of access.", why: "Sharing in Chat also shares the file in Drive." },
              { move: "Choose Viewer and select Send.", why: "The team needs to read the schedule, not change it. Give the least access that does the job." },
            ],
            result: "Everyone in the space can open the schedule, and it stays up to date when Denise changes it.",
            takeaway: "Share the Drive file, not a downloaded copy, and pick the access level on purpose.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Chat is still work communication. Don't post tenants' private information, such as bank details or Social Security numbers, in a space, and remember that people added later can read the space's history.",
          },
        ],
      },
      {
        heading: "Chat or email?",
        blocks: [
          {
            type: "drag-drop",
            mode: "sort",
            title: "Which tool fits?",
            prompt: "Sort each message into Chat or email.",
            buckets: [
              { id: "chat", label: "Google Chat" },
              { id: "email", label: "Gmail" },
            ],
            items: [
              { id: "a", text: "“Is the side door unlocked?” to a coworker", bucket: "chat" },
              { id: "b", text: "A formal lease renewal offer to a tenant", bucket: "email" },
              { id: "c", text: "A quick “Done!” when you finish a task for the team", bucket: "chat" },
              { id: "d", text: "An invoice question to Russo Plumbing", bucket: "email" },
              { id: "e", text: "Today's lobby repaint progress for the project team", bucket: "chat" },
              { id: "f", text: "A notice that every tenant must keep as a record", bucket: "email" },
            ],
            explanation: "Chat is for quick, informal talk inside the team. Email is for people outside the company, formal messages, and anything someone needs to keep as a record.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You @mention Andre in a space he isn't in yet, and you want him to see the conversation. Which option do you choose?",
            options: ["Send message only", "Add member and send", "Delete the message", "Start a new email"],
            correctIndex: 1,
            explanation: "Add member and send adds Andre to the space and notifies him.",
            optionRationales: [
              "That sends the message without adding Andre, so he won't be in the space.",
              "Correct.",
              "You don't need to delete anything; Chat asks what to do.",
              "Email would split the conversation into two places.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Where should a project's ongoing team conversation go?",
            options: ["A group email that everyone replies all to", "A space with the project's team", "A direct message with each person separately", "A comment in a spreadsheet"],
            correctIndex: 1,
            explanation: "A space keeps the conversation, members, and shared files together, and new members can catch up.",
            optionRationales: [
              "Reply-all threads get long and people drop off them.",
              "Correct.",
              "Separate messages mean everyone sees a different part of the story.",
              "Comments are for a specific part of a file, not a whole project.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You share a Drive file in Chat, and Chat says some members can't open it. What does that mean?",
            options: [
              "The file is broken",
              "You need to choose the type of access to give them, or they won't be able to open it",
              "Chat can only share files from your computer",
              "Members must request access by email first",
            ],
            correctIndex: 1,
            explanation: "Chat checks the file's sharing and asks you to select the type of access for people who don't have it.",
            optionRationales: [
              "The file is fine; it just isn't shared with everyone yet.",
              "Correct.",
              "Chat can share Drive files and files from your computer.",
              "You can give access right from Chat.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice with a classmate or a second Google Account of your own. Personal Google Accounts can use Google Chat at chat.google.com or in Gmail." },
      {
        type: "list",
        ordered: true,
        items: [
          "Start a direct message with your partner and send a short hello.",
          "Create a space named “Study Group” and add your partner.",
          "In the space, @mention your partner with a question, and add a reaction to their answer.",
          "Share a Google Doc from your Drive in the space, giving your partner Commenter access.",
          "Write two sentences: one message you'd send in Chat and one you'd send by email, and why.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your space showing the mention, the reaction, and the shared file, plus your two sentences, to your instructor or course folder. If you can't use Google Chat, complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "comments-and-tasks-in-shared-files",
    title: "Comment, Assign, and Recover Work in Shared Files",
    description:
      "Work in the same Sheets and Slides files as your team: answer and resolve comments, assign action items, and use version history to recover from mistakes.",
    objectives: [
      "Explain what happens when several people edit a Google file at the same time",
      "Comment on a cell or slide, reply, and resolve a comment when it's handled",
      "Assign an action item to a person with an @mention",
      "Restore an earlier version and name versions at milestones",
      "Choose between a comment, a suggestion, and a direct edit",
    ],
    duration: "20 min",
    slides: slides("comments-and-tasks-in-shared-files", [
      "One file, many editors",
      "Comments in Sheets and Slides",
      "Assign an action item",
      "Version history: undo a team mistake",
      "Comment, suggest, or edit?",
      "Quick check",
    ]),
    sections: [
      {
        heading: "One file, many editors",
        blocks: [
          {
            type: "scenario",
            role: "You keep Parkview's Elm Street move-in tracker, a Google Sheets file the whole office edits.",
            text: "Priya asked a question in a comment. This morning someone cleared the Walkthrough column by mistake. And one new tenant still has no walkthrough on the schedule.",
            task: "Answer and resolve the comment, recover the lost dates, assign the open item, and mark the checked version.",
          },
          {
            type: "paragraph",
            text: "When a file is shared with editors, everyone works in the same copy at the same time. Changes save automatically, and you can see who else has the file open by their pictures or initials at the top right. There's no “latest version” to email around: the file in Drive is always the latest.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Module 2 covered sharing and access levels, and Module 3 covered comments, suggestions, and version history in Google Docs. This lesson uses the same tools in Sheets and Slides, the way a team uses them day to day.",
          },
        ],
      },
      {
        heading: "Comments and action items",
        blocks: [
          {
            type: "list",
            items: [
              "Select a cell (Sheets), or an object or slide (Slides), then select Insert › Comment or press Ctrl+Alt+M. Type and select Comment.",
              "A cell with a comment shows a small mark in its corner. Select the cell to read the comment and reply.",
              "To assign an action item, type @ and the person's name in the comment, check Assign to, and select Assign. They get an email, and they select Done on the comment when the task is finished.",
              "When a comment is handled, select Resolve (the check mark in the top corner of the comment) to close it. Closed comments are listed under Comments at the top of the window, and Re-open brings one back.",
              "People you mention need access to the file. Share it with them, or make sure it's already shared.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Assign the walkthrough to Kim",
            prompt: "Put the steps in order.",
            items: [
              { id: "1", text: "Select cell E5, Marisol Vega's Walkthrough cell" },
              { id: "2", text: "Insert › Comment (or Ctrl+Alt+M)" },
              { id: "3", text: "Type @Kim and pick Kim Nguyen, then finish the comment" },
              { id: "4", text: "Check Assign to Kim Nguyen" },
              { id: "5", text: "Select Assign" },
            ],
            explanation: "The comment stays attached to the exact cell, and Kim gets an email about the action item.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Microsoft 365 has the same idea: in Word, Excel, and PowerPoint you can @mention someone in a comment, and in many versions you can assign it to them as a task. The habit carries over between the two.",
          },
        ],
      },
      {
        heading: "Version history: undo a team mistake",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Open version history: File › Version history › See version history, or select Last edit (the clock) at the top right.",
              "Select a version on the right to see what the file looked like then, and who changed what.",
              "Select Restore this version at the top, then select Restore.",
              "At a milestone, name the version: File › Version history › Name current version. A spreadsheet can have up to 15 named versions; a document up to 40.",
            ],
          },
          {
            type: "tip",
            text: "Restoring an older version undoes every change made since then, not just the mistake. Check the newer versions first; if a coworker added something important after that point, copy it before you restore, or fix the mistake by hand instead.",
          },
          {
            type: "worked-example",
            title: "Recovering the walkthrough dates",
            task: "Get back the Walkthrough column that was cleared at 9:40 AM.",
            steps: [
              { move: "Open version history and select October 20, 4:10 PM.", why: "That version still has every walkthrough date." },
              { move: "Check the 9:40 AM version.", why: "It shows the only change since then was clearing the column, so restoring loses nothing else." },
              { move: "Select Restore this version, then Restore.", why: "The tracker goes back to how it was on October 20, so the dates come back." },
              { move: "Name the current version “Checked by office”.", why: "If something goes wrong later, you can find this good version by name." },
            ],
            result: "The tracker is back to normal in a minute, without retyping anything.",
            takeaway: "Before you restore, look at what changed since that version.",
          },
        ],
      },
      {
        heading: "Comment, suggest, or edit?",
        blocks: [
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the right way to give feedback",
            prompt: "Drag the best choice onto each situation.",
            items: [
              { id: "a", text: "You're not sure a move-in date in Andre's sheet is right", match: "Comment and @mention Andre" },
              { id: "b", text: "You'd reword a paragraph in Denise's Google Doc", match: "Suggesting mode" },
              { id: "c", text: "Your own tracker has a typo", match: "Edit directly" },
              { id: "d", text: "Kim must book a walkthrough", match: "Assign a comment to Kim" },
            ],
            explanation: "Comments ask and discuss, assigned comments hand off a task, Suggesting mode (in Google Docs) proposes changes for the owner to accept, and you edit your own work directly.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "How do you hand Kim a task about one cell in a shared sheet?",
            options: ["Email her a screenshot", "Comment on the cell with @Kim Nguyen and check Assign to", "Type her name in the cell", "Make a copy of the sheet for her"],
            correctIndex: 1,
            explanation: "An assigned comment stays on the cell and emails Kim, and she marks it Done when the task is finished.",
            optionRationales: [
              "A screenshot gets out of date and isn't linked to the cell.",
              "Correct.",
              "Kim won't get a notification, and it changes the data.",
              "A copy splits the work into two files.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Someone deleted a column in a shared sheet an hour ago. What's the best way to get it back?",
            options: ["Ask everyone to retype it", "Restore the version from before the deletion in version history", "Undo (Ctrl+Z) on your computer", "Download an old copy from your email"],
            correctIndex: 1,
            explanation: "Version history keeps earlier versions of the file. Check what changed since then, then restore.",
            optionRationales: [
              "Version history makes retyping unnecessary.",
              "Correct.",
              "Undo only reverses your own recent changes, not a coworker's.",
              "An emailed copy may be older and wouldn't be the shared file.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice with a classmate or a second Google Account of your own." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Google Sheets file with a short list (for example, five tasks and who does each one). Share it with your partner as an Editor.",
          "Comment on one cell, @mention your partner, check Assign to, and select Assign. Ask your partner to reply and mark it done.",
          "Name the current version “Version 1”. Then delete a row, and restore Version 1 from version history.",
          "Write two sentences: when you'd restore a version, and when you'd fix a mistake by hand instead.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of the resolved, assigned comment and a screenshot of version history showing Version 1, plus your two sentences, to your instructor or course folder. No partner? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "run-a-team-project",
    title: "Bring It Together: Run a Team Project",
    description:
      "Combine Gmail, Chat, Drive, Calendar, and Meet to start and run a small team project, choosing the right tool for each job.",
    objectives: [
      "Choose the right Google Workspace tool for each kind of message or task",
      "Start a project: reply by email, set up a Chat space, share the plan, and schedule a kickoff call",
      "Name the Microsoft 365 tool that matches each Google Workspace app",
      "Decide whether an AI assistant such as Gemini is available and appropriate for a task",
    ],
    duration: "20 min",
    slides: slides("run-a-team-project", [
      "The right tool for each job",
      "Kick off a project in four moves",
      "Keep it running: habits that help the team",
      "Google Workspace and Microsoft 365, side by side",
      "AI helpers: check before you use",
      "Project kickoff checklist",
    ]),
    sections: [
      {
        heading: "The right tool for each job",
        blocks: [
          {
            type: "scenario",
            role: "Denise asks you to coordinate the Riverside Commons lobby repaint.",
            text: "Kim and Marcus will work on it with you. Denise wants a Chat space for the three of you, the Lobby Repaint Plan shared so they can comment on it, and a short kickoff call on Thursday morning.",
            task: "Answer Denise, set up the space, share the plan, and schedule the kickoff, each in the right tool.",
          },
          {
            type: "image",
            src: `${IMG}/run-a-team-project/infographic.png`,
            alt: "Quick reference: which Google Workspace tool to use for each kind of team work, how to kick off a project, and the matching Microsoft 365 tools.",
            caption: "Working together in Google Workspace at a glance.",
          },
          {
            type: "table",
            caption: "Which tool for what",
            columns: ["Tool", "Best for", "At Parkview"],
            rows: [
              ["Gmail", "Formal messages, people outside the company, anything that needs a record", "Notices to tenants, vendor invoices, owner reports"],
              ["Google Chat", "Quick, informal talk inside a team", "“The side door is unlocked,” daily repaint updates"],
              ["Comments", "Feedback about one part of a file", "A question on one cell of the move-in tracker"],
              ["Google Drive", "One shared copy of every file", "The Lobby Repaint Plan everyone edits"],
              ["Calendar and Meet", "Meetings and decisions that need discussion", "The Thursday kickoff call"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the need to the tool",
            prompt: "Drag the best tool onto each need.",
            items: [
              { id: "a", text: "Tell Russo Plumbing the repaint dates", match: "Gmail" },
              { id: "b", text: "Ask Kim if the paint arrived", match: "Google Chat" },
              { id: "c", text: "Point out a wrong date on slide 3 of the plan", match: "A comment" },
              { id: "d", text: "Decide the color with Denise and Marcus together", match: "A Google Meet call" },
              { id: "e", text: "Give Kim and Marcus the latest plan", match: "Share the Drive file" },
            ],
            explanation: "Outside people and records go by email; quick team questions go in Chat; feedback on a file goes in a comment; decisions that need discussion go to a meeting; and files are shared, not attached.",
          },
        ],
      },
      {
        heading: "Kick off a project",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Reply to the request so the person knows you're on it. Reply, not Reply all, unless everyone needs your answer.",
              "Create a space for the project and add the team (Chat › New chat › Create a space, then Add people).",
              "Share the plan in the space as a Drive file, with the access people need (Commenter if they should only comment).",
              "Schedule the kickoff in Google Calendar: invite the team, use Find a time if needed, add Google Meet video conferencing, and send the invitations.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the kickoff in order",
            prompt: "Drag the steps into a sensible order.",
            items: [
              { id: "1", text: "Reply to Denise: “I'm on it.”" },
              { id: "2", text: "Create the Lobby Repaint space and add Kim and Marcus" },
              { id: "3", text: "Share the Lobby Repaint Plan in the space with Commenter access" },
              { id: "4", text: "Create the kickoff event with Google Meet and send the invitations" },
              { id: "5", text: "After the call, post the decisions in the space" },
            ],
            explanation: "Confirm first, give the team a place to talk, share the plan, then meet. Posting decisions afterward keeps everyone, including people who missed the call, on the same page.",
          },
        ],
      },
      {
        heading: "Keep it running",
        blocks: [
          {
            type: "list",
            items: [
              "Keep one conversation in one place. If a topic starts in email and moves to the space, say so in the email.",
              "Mention people only when you need them, and use @all rarely.",
              "Link to Drive files instead of attaching copies, so everyone has the latest version.",
              "After a meeting, write down decisions and who does what, and assign comments or tasks for the open items.",
              "When the project ends, name the final versions of its files.",
            ],
          },
          {
            type: "table",
            caption: "Google Workspace and Microsoft 365, side by side",
            columns: ["Google Workspace", "Microsoft 365"],
            rows: [
              ["Gmail and Google Calendar", "Outlook mail and calendar"],
              ["Google Chat (DMs and spaces)", "Microsoft Teams (chats and channels)"],
              ["Google Meet", "Microsoft Teams meetings"],
              ["Google Drive and shared drives", "OneDrive and SharePoint"],
              ["Google Docs, Sheets, and Slides", "Word, Excel, and PowerPoint"],
            ],
          },
        ],
      },
      {
        heading: "AI helpers: check before you use",
        blocks: [
          {
            type: "paragraph",
            text: "Some Google accounts include Gemini, Google's AI assistant. In Gmail it can summarize a long conversation, suggest replies, and help write a draft. Which features you get depends on your account: on personal accounts without a paid plan, some Gmail features (such as summaries, Help me write, and suggested replies) are available only in the United States, while paid Google AI plans and eligible Google Workspace editions include more. Your employer may turn these features off.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Nothing in this course requires Gemini. If your job allows it, follow your company's rules about what information you may use with it, and read and check everything it writes before you send it. You are responsible for the message, not the tool.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You need to tell a vendor the repaint dates and keep a record. Which tool fits best?",
            options: ["Google Chat", "Gmail", "A comment in the plan", "A Meet call"],
            correctIndex: 1,
            explanation: "Email is best for people outside the company and for anything that needs a record.",
            optionRationales: [
              "Chat is for quick talk inside the team.",
              "Correct.",
              "The vendor doesn't work in Parkview's files.",
              "A call leaves no written record of the dates.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Kim and Marcus should be able to comment on the plan but not change it. How do you share it in the space?",
            options: ["Attach a PDF", "Share the Drive file with Commenter access", "Share the Drive file with Editor access", "Paste the plan into a message"],
            correctIndex: 1,
            explanation: "Commenter access lets them add comments without changing the plan.",
            optionRationales: [
              "A PDF is a copy that can't take comments in the shared file.",
              "Correct.",
              "Editors can change the plan.",
              "Pasted text becomes a copy that won't update.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which Microsoft 365 tool matches Google Chat spaces?",
            options: ["Outlook", "Microsoft Teams channels", "OneNote", "Excel"],
            correctIndex: 1,
            explanation: "Teams channels, like Chat spaces, hold a team's ongoing conversation and files.",
            optionRationales: [
              "Outlook matches Gmail and Google Calendar.",
              "Correct.",
              "OneNote is a notebook app.",
              "Excel matches Google Sheets.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Run a mini project with a classmate (or a second Google Account of your own), such as planning a study session." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Google Doc with a short plan and a space named after the project. Add your partner to the space.",
          "Share the plan in the space with Commenter access, and ask your partner to add one comment.",
          "Create a Google Calendar event for a 15-minute call, invite your partner, add Google Meet video conferencing, and send the invitation.",
          "After the call, post a two-line summary of the decisions in the space.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit screenshots of the space (with the shared plan and your summary) and of the calendar event to your instructor or course folder. No partner? Complete the practice simulation and submit its results page.",
      },
    ],
  },
];
