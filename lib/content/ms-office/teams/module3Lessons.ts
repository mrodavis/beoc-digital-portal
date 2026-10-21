import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/teams/module-3";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const teamsModule3Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "teams-and-channels",
    title: "Teams and Channels: Where Team Conversations Live",
    description:
      "Learn how teams and channels are organized, how to join a team, the difference between the Posts and Threads channel layouts, and when a conversation belongs in a channel instead of a chat.",
    objectives: [
      "Explain how a team, its channels, and the General channel are organized, and what team owners do",
      "Join a team with New items › Join team",
      "Describe the Posts and Threads channel layouts",
      "Decide whether a message belongs in a channel or a chat",
    ],
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/m3VLT084vik",
    slides: slides("teams-and-channels", [
      "Teams and channels: the team's shared conversations",
      "How a team is organized",
      "Join a team: New items › Join team",
      "Two channel layouts: Posts and Threads",
      "Channel or chat? Ask who needs it and for how long",
      "Being a good team member in channels",
    ]),
    sections: [
      {
        heading: "Teams, channels, and the people in them",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Maria asks you to join the Patient Experience Committee, a team of nine people from the front desk, clinical staff, and billing who meet monthly to make visits smoother. Between meetings, all of their ideas, decisions, and files live in the team's channels. If you post your ideas in a private chat with Maria, the rest of the committee never sees them.",
            task: "Join the team, find your way around its channels, and put each message where the team can use it.",
          },
          {
            type: "paragraph",
            text: "A team is a group of people who work together, such as the Front Office team or a committee. Every team has channels, and every team starts with a General channel for announcements and anything that does not fit elsewhere. Other channels are organized by topic: Scheduling, Billing Questions, Ideas. Members of the team can read and post in its standard channels, and a team can also have private channels for a smaller group of its members.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Team owner", definition: "Manages the team: who is a member, what channels exist, and team settings." },
              { term: "Team member", definition: "Can read and post in the team's standard channels." },
              { term: "General channel", definition: "The channel every team has, for team-wide announcements and general topics." },
              { term: "Standard channel", definition: "A channel every member of the team can see." },
              { term: "Private channel", definition: "A channel only some members of the team are added to." },
            ],
          },
          {
            type: "list",
            ordered: true,
            items: [
              "In Chat, select the arrow next to New message at the top of the list (New items) and choose Join team. In the Separate view, select Teams first.",
              "Type the team's name or topic in the search box.",
              "Point to the team's tile and select Join team. (Some teams are private; for those you ask the owner to add you, or join with a code the owner gives you.)",
            ],
          },
        ],
      },
      {
        heading: "Posts layout and Threads layout",
        blocks: [
          {
            type: "paragraph",
            text: "Channels come in two layouts, chosen when the channel is created (a channel owner can change it later in Edit channel). In the Posts layout, each conversation starts as a post, often with a subject, and replies are tucked under it; it works well for announcements and updates that many people need to see. In the Threads layout, the channel looks more like a group chat: you type at the bottom and press Send, and side conversations happen in threads with Reply in thread. This course practices the Posts layout; school accounts use it for every channel.",
          },
          {
            type: "table",
            caption: "Posts layout and Threads layout",
            columns: ["", "Posts layout", "Threads layout"],
            rows: [
              ["Start a conversation", "Start a post (add a subject), then Post", "Type in the box at the bottom, then Send"],
              ["Answer", "Reply under the post", "Reply in thread"],
              ["Feels like", "A bulletin board with comment threads", "A group chat with side threads"],
              ["Good for", "Announcements and updates for many people", "Fast back-and-forth discussion"],
            ],
          },
        ],
      },
      {
        heading: "Channel or chat?",
        blocks: [
          {
            type: "paragraph",
            text: "Two questions decide it. Who needs to see this? If it is the whole team, or people who are not in the conversation yet, use the channel. How long will it matter? If someone will need to find it next month, a channel post is searchable for everyone on the team. A private question, a personal request, or a quick check with one or two people goes in a chat.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Channel or chat?",
            prompt: "Sort each message for the Patient Experience Committee.",
            buckets: [
              { id: "channel", label: "Channel post" },
              { id: "chat", label: "Chat" },
            ],
            items: [
              { id: "a", text: "An idea for a wait-time sign at check-in", bucket: "channel" },
              { id: "b", text: "Asking Maria whether committee meetings count as work hours", bucket: "chat" },
              { id: "c", text: "The final agenda for next month's committee meeting", bucket: "channel" },
              { id: "d", text: "Telling Tasha you'll be two minutes late to walk over together", bucket: "chat" },
              { id: "e", text: "Survey results the whole committee will discuss", bucket: "channel" },
            ],
            explanation: "Team ideas, decisions, and documents go in the channel so every member sees them and can find them later. Personal questions and quick logistics go in a chat.",
          },
          {
            type: "worked-example",
            title: "First day on the committee",
            task: "Join the Patient Experience Committee and contribute without cluttering it.",
            steps: [
              { move: "New items › Join team › Patient Experience Committee › Join team.", why: "Joining gives you every channel's history, so you can read what the committee already decided." },
              { move: "Reply to Maria's welcome post in General instead of starting a new post.", why: "She asked new members to introduce themselves under her post. Replies keep every introduction in one place." },
              { move: "Start a post in Ideas with the subject “Wait-time sign.”", why: "Each idea gets its own post and subject, so the committee can discuss it in the replies and find it later." },
              { move: "Ask your work-hours question in a chat with Maria.", why: "It is about your own schedule. The other eight members do not need it." },
            ],
            result: "The committee sees your introduction and your idea; your personal question stays private.",
            takeaway: "Reply where you were asked, start a new post for a new topic, and keep personal questions in chat.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which channel does every team have?",
            options: ["Announcements", "General", "Ideas", "Files"],
            correctIndex: 1,
            explanation: "Every team starts with a General channel. Other channels are created by the team.",
            optionRationales: ["Some teams create an Announcements channel, but not every team.", "Correct.", "Ideas is a channel this committee created.", "Files are on each channel's Shared tab; Files is not a channel."],
          },
          {
            type: "knowledge-check",
            question: "In a Threads layout channel, how do you answer one specific message without adding to the main conversation?",
            options: ["Start a post", "Reply in thread", "Forward it", "Pin it"],
            correctIndex: 1,
            explanation: "Reply in thread starts or continues a side conversation under that message.",
            optionRationales: ["That starts a new conversation.", "Correct.", "Forwarding sends a copy somewhere else.", "Pinning keeps it visible; it does not answer it."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Join the committee and take part in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Join the team “Patient Experience Committee.”",
          "Reply to Maria's welcome post in the team's General channel: “Hi all, Alex here from the front desk.”",
          "In the Ideas channel, start a post with the subject “Clipboard station” and the message “A self-serve clipboard station would shorten the check-in line.”",
          "Reply to Omar's idea in the Ideas channel: “Great idea. Reminder texts could include a running-late notice.”",
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
    slug: "posts-and-replies",
    title: "Post, Reply, and Announce in Channels",
    description:
      "Start posts with clear subjects, keep answers in the thread, @mention the person you need, post announcements, and set channel notifications for the channels that matter to your job.",
    objectives: [
      "Start a post with a subject that tells people what it is about",
      "Reply in the thread and @mention the person who needs to act",
      "Post an announcement with a headline",
      "Choose channel notifications and pin the channels you use most",
    ],
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/ps7dDNrXI6E",
    slides: slides("posts-and-replies", [
      "Channel posts the whole team can use",
      "Start a post with a subject",
      "Reply in the thread",
      "Announcements for news that must stand out",
      "Channel notifications: hear about what matters",
      "Channel etiquette",
    ]),
    sections: [
      {
        heading: "Posts that people can scan",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "The Scheduling channel had 40 new posts last week. Five of them were answers to Maria's question about Dr. Shah's Friday patients, posted as new posts instead of replies, so Maria could not tell which patients were already called. Two people called the same patient.",
            task: "Post and reply so the team can see at a glance what is new, what is answered, and who is doing what.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Go to the channel and select Start a post (or Start a new post at the top of the Posts tab).",
              "Type a short subject that names the topic, such as “Printer fixed.”",
              "Type the message, and @mention anyone who needs to act.",
              "Select Post.",
            ],
          },
          {
            type: "paragraph",
            text: "Replies keep a conversation together. Select Reply under the post, type your answer, and press Enter. Everyone who reads the post sees your answer right under it. Start a new post only for a new topic.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "New post or reply?",
            prompt: "Sort each message for the Scheduling channel.",
            buckets: [
              { id: "post", label: "Start a new post" },
              { id: "reply", label: "Reply to an existing post" },
            ],
            items: [
              { id: "a", text: "“I'll call the 2:30 and 3:00 patients” (answering Maria's Dr. Shah post)", bucket: "reply" },
              { id: "b", text: "The provider schedule for December is ready", bucket: "post" },
              { id: "c", text: "“The packet looks complete” (about Omar's intake packet post)", bucket: "reply" },
              { id: "d", text: "The phone system will be down for an update tonight", bucket: "post" },
            ],
            explanation: "If it answers or adds to something already posted, reply under it. If it is a new topic, start a new post with a clear subject.",
          },
        ],
      },
      {
        heading: "@mentions and announcements",
        blocks: [
          {
            type: "paragraph",
            text: "In a channel, an @mention is how you make sure a specific person sees your message. Type @, a few letters of the name, and pick the person. They get a notification even if they have that channel's notifications turned off. Use it for the person who must act, not for everyone you can think of.",
          },
          {
            type: "paragraph",
            text: "An announcement is a post that stands out, with a large headline and an optional color scheme or background image. In a Posts layout channel, start a post and choose Announcement as the Post type (the exact button depends on how the channel orders posts). Type the headline, then the details, and post it. Use announcements for news that affects the whole team, such as new hours or an event, not for everyday updates.",
          },
          {
            type: "worked-example",
            title: "Announcing the staff flu shot clinic",
            task: "Make sure the whole front office knows about Saturday's flu shot clinic.",
            steps: [
              { move: "Go to Front Office › General and start a post.", why: "General reaches everyone on the team, and the clinic is not about any one topic channel." },
              { move: "Change the Post type to Announcement and type the headline “Flu Shot Clinic Saturday.”", why: "A large headline is easy to spot when people scroll the channel." },
              { move: "Type “Staff flu shots are 9:00 AM to noon in Room 5.” and post it.", why: "The details people need, the time and place, are in the first line." },
            ],
            result: "An eye-catching post the whole team can find later.",
            takeaway: "Use an announcement for team-wide news; keep everyday updates as normal posts.",
          },
        ],
      },
      {
        heading: "Channel notifications and favorites",
        blocks: [
          {
            type: "paragraph",
            text: "You decide how much each channel can interrupt you. Point to the channel, select More options (…) › Channel notifications. You can turn notifications for new posts on or off and choose whether they appear as a banner and in the Activity feed or only in the feed. Turn them on for channels your job depends on (for Alex, Scheduling) and off for channels you can read when you have time (Staff Events). @mentions of your name still reach you either way. Pin the channels you use most so they appear in Favorites.",
          },
          {
            type: "table",
            caption: "Channel etiquette at Lakeside",
            columns: ["Do", "Don't"],
            rows: [
              ["Give new posts a clear subject", "Post “Question” or “Help” as a subject"],
              ["Reply under the post you are answering", "Start a new post to answer an old one"],
              ["@mention the person who must act", "@mention everyone on every post"],
              ["Keep patient details in the EHR", "Post patient names with health information"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Everyone on the team can read a standard channel, and some teams include guests from outside Lakeside. Never post patient names with health details, dates of birth, or insurance numbers in a channel.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Maria posted asking who can call Dr. Shah's Friday patients. You can take two of the calls. What should you do?",
            options: ["Start a new post saying you'll take two calls", "Reply under Maria's post and @mention her or the person coordinating", "Send a private chat to every front desk worker", "Edit Maria's post"],
            correctIndex: 1,
            explanation: "A reply keeps the answer with the question, so everyone can see which calls are taken.",
            optionRationales: [
              "A separate post splits the conversation; this is how two people ended up calling the same patient.",
              "Correct.",
              "Private chats hide the answer from the rest of the team.",
              "You cannot edit someone else's post.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You turned off notifications for the Staff Events channel. Someone @mentions you in a post there. What happens?",
            options: ["You never find out", "You still get notified, because it is an @mention of you", "The post is deleted", "Teams turns channel notifications back on"],
            correctIndex: 1,
            explanation: "Channel notification settings control new posts. An @mention of you still notifies you.",
            optionRationales: ["Mentions of you still reach you.", "Correct.", "Notification settings never delete posts.", "Your channel setting stays the same."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Keep the team informed in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In the Billing Questions channel, start a post with the subject “Card reader” and the message “The card reader at window 2 is offline. Use window 1 for copays today.”",
          "In the Scheduling channel, reply to Omar's post about the intake packet and @mention him: “@Omar Haddad The packet looks complete. Thanks!”",
          "In the Front Office General channel, post an announcement with the headline “New Check-In Hours” and the message “Check-in opens at 7:30 AM starting Monday.”",
          "Turn off notifications for the Staff Events channel.",
          "Pin the Billing Questions channel.",
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
    slug: "shared-tab-and-tabs",
    title: "The Shared Tab and Channel Tabs",
    description:
      "Find, upload, pin, and link to a channel's files on its Shared tab, understand that channel files live in the team's SharePoint site, and add apps and files as tabs at the top of a channel.",
    objectives: [
      "Find a channel's files and links on its Shared tab",
      "Upload a file to a channel, pin it to the top, and copy a link to it",
      "Explain that channel files are stored in the team's SharePoint site",
      "Add an app such as Planner or Lists as a tab in a channel",
    ],
    duration: "15 min",
    slides: slides("shared-tab-and-tabs", [
      "Every channel has a Shared tab",
      "Channel files live in the team's SharePoint site",
      "Upload, pin to top, and copy a link",
      "Add a tab: put a tool at the top of the channel",
      "Where should this file go?",
      "Quick check",
    ]),
    sections: [
      {
        heading: "The Shared tab",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Omar asks for the provider schedule for the third time this week. It is in the Scheduling channel, but it was shared in a post two weeks ago and has scrolled out of sight. New hires keep using an old copy of the intake packet they saved to their desktops.",
            task: "Use the Shared tab so the team's files are easy to find, and keep the most-used ones at the top.",
          },
          {
            type: "paragraph",
            text: "At the top of every channel are tabs. Posts shows the conversation. Shared lists the files and links shared in that channel. (In January 2026 Microsoft renamed the channel's Files tab to Shared, so older guides may still say Files.) A file posted in a channel's conversation shows up on its Shared tab too, so nobody has to scroll back through posts to find it.",
          },
          {
            type: "paragraph",
            text: "Files you add to a channel are stored in the team's SharePoint site, in a folder for that channel. The team owns them: they stay when someone leaves Lakeside, and every member of the team can open them. That is the difference from chat files, which live in the sender's OneDrive (Module 2).",
          },
          {
            type: "table",
            caption: "On the Shared tab (point to a file › More options (…))",
            columns: ["Command", "What it does"],
            rows: [
              ["Upload › Files", "Adds a file from your computer to the channel"],
              ["Open", "Opens the file in Teams"],
              ["Pin to top", "Keeps the file at the top of the list"],
              ["Copy link", "Copies a link you can paste into a post or chat"],
              ["Share", "Shares the file with specific people"],
            ],
          },
        ],
      },
      {
        heading: "Add a tab",
        blocks: [
          {
            type: "paragraph",
            text: "Tabs put the tools a team uses every day one click away. Select Add a tab (+) at the top of the channel, choose an app such as Planner (a shared task plan), Lists (a tracker), or Forms (a survey), and select Add. To show a single file as a tab, first share the file in the channel, then add a tab for its app (for example, Excel), pick the file, and select Save. Posts and Shared are always there; your team owner may limit who can add or remove other tabs.",
          },
          {
            type: "worked-example",
            title: "Cleaning up the Scheduling channel",
            task: "Make the schedule and intake packet easy to find, and give the team one place for scheduling tasks.",
            steps: [
              { move: "Open Scheduling › Shared and upload Holiday Coverage Schedule.xlsx.", why: "Uploading to the channel stores the file in the team's SharePoint site, where everyone works on the same copy." },
              { move: "Point to New Patient Intake Packet.pdf › More options › Pin to top.", why: "The most-used file is first in the list for everyone." },
              { move: "Point to Provider Schedule - November.xlsx › More options › Copy link, and paste it in your reply to Omar.", why: "A link opens the one real file. Nobody saves another copy to their desktop." },
              { move: "Select Add a tab (+) › Planner › Add.", why: "Reschedule calls and coverage tasks get a shared plan at the top of the channel instead of getting lost in posts." },
            ],
            result: "The channel's key files are pinned and linkable, and the team has a shared task plan.",
            takeaway: "Put team files in the channel, pin the ones people use most, and share links, not copies.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Where should this file go?",
            prompt: "Sort each file.",
            buckets: [
              { id: "channel", label: "The team channel's Shared tab" },
              { id: "mine", label: "Your OneDrive or a chat" },
            ],
            items: [
              { id: "a", text: "The final provider schedule the whole front office uses", bucket: "channel" },
              { id: "b", text: "Your rough notes from a training session", bucket: "mine" },
              { id: "c", text: "The approved copay quick reference", bucket: "channel" },
              { id: "d", text: "A draft letter you want Maria to look at before anyone else sees it", bucket: "mine" },
            ],
            explanation: "Files the team relies on belong in the channel. Drafts and personal notes stay in your OneDrive or a small chat until they are ready.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where is a file stored when you upload it on a channel's Shared tab?",
            options: ["In your OneDrive", "In the team's SharePoint site", "On your computer only", "In your email"],
            correctIndex: 1,
            explanation: "Channel files are stored in the team's SharePoint site, so the whole team can use them and they stay when people leave.",
            optionRationales: ["Chat files go to your OneDrive; channel files do not.", "Correct.", "Uploading puts a copy in the cloud.", "Teams does not store channel files in email."],
          },
          {
            type: "knowledge-check",
            question: "Older instructions tell you to open a channel's Files tab. What is it called in current Teams?",
            options: ["Posts", "Shared", "Wiki", "Notes"],
            correctIndex: 1,
            explanation: "The channel Files tab became the Shared tab in January 2026. It lists files and links shared in the channel.",
            optionRationales: ["Posts is the conversation.", "Correct.", "There is no Wiki tab for files.", "Notes is not where channel files are listed."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Organize a channel's files in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Upload “Flu Clinic Flyer.pdf” to the Shared tab of the Front Office General channel.",
          "Pin “Flu Clinic Flyer.pdf” to the top.",
          "Copy a link to “Flu Clinic Flyer.pdf.”",
          "Open “Copay Quick Reference.pdf” on the Billing Questions channel's Shared tab.",
          "Close the file and add a Lists tab to the Billing Questions channel.",
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
