import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "professional-email-writing",
    title: "Professional Email Writing",
    description:
      "Learn how to write clear, professional, and effective workplace emails.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/zNwhn7aOM4A",
    slides: [
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-01.jpg", alt: "Digital Communication Architecture: Mastering the Professional Email Framework" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-02.jpg", alt: "The Anatomy of a First Impression" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-03.jpg", alt: "Winning the Inbox View" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-04.jpg", alt: "The Blueprint of Professional Correspondence" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-05.jpg", alt: "Framing the Intent" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-06.jpg", alt: "Execution and Sign-Off" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-07.jpg", alt: "Communication Diagnostic Matrix" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-08.jpg", alt: "Pre-Flight Security Protocol" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-09.jpg", alt: "The AI Assist Workflow" },
      { src: "/images/office-assistant/module-2/professional-email-writing/slide-10.jpg", alt: "Synthesis Challenge: The Reschedule" },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "At TOR Tech, your manager asks you to send an update email to a client. The email must be clear, professional, and timely. First impressions in writing matter — a poorly written email can damage a client relationship before a conversation even happens.",
          },
        ],
      },
      {
        heading: "Email Structure & Professional Tone",
        blocks: [
          {
            type: "paragraph",
            text: "Every professional email has the same basic structure. Mastering this structure lets you write confidently in any workplace situation:",
          },
          {
            type: "list",
            items: [
              "Subject line — specific, clear, and action-oriented (e.g., 'Project Update: Q2 Report Ready for Review')",
              "Greeting — use the recipient's name when possible ('Hi Sarah,' or 'Dear Mr. Chen,')",
              "Body — state your purpose in the first sentence, then provide details concisely",
              "Closing — use professional sign-offs: 'Best regards,' 'Thank you,' or 'Sincerely,'",
              "Signature — include your full name, title, and contact information",
              "Common mistakes to avoid: reply-all accidents, vague subject lines, overly casual language, and missing context",
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
            text: "Never send confidential client information over email without confirming it is the appropriate channel. Always double-check the recipient's address before hitting send — misdirected emails can be a serious professional and legal issue.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional email to a client letting them know their order has been delayed by 2 days. Keep it under 100 words.\" Review the result, then edit it to add your own name and signature.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which part of a professional email sets expectations before the reader even opens it?",
            options: [
              "The greeting",
              "The subject line",
              "The body paragraph",
              "The closing signature",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Draft a professional email to a client rescheduling a meeting that was originally set for Tuesday. The new time is Thursday at 3:00 PM. Include a clear subject line, a polite explanation, a confirmation request, and a professional signature.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the final email you drafted to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "slack-teams-etiquette",
    title: "Slack & Teams Etiquette",
    description:
      "Master professional communication standards for workplace messaging platforms.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/MztgIsUDDl4",
    slides: [
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-01.jpg", alt: "The Modern Communicator: Mastering Slack & Teams Etiquette in the Digital Workspace" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-02.jpg", alt: "Fast ≠ Casual: Workplace messaging and your digital reputation" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-03.jpg", alt: "Where to Communicate: Public Channels, Direct Messages, and Email" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-04.jpg", alt: "Anatomy of a Public Channel: Default to public for organizational transparency" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-05.jpg", alt: "The Mechanics of Threading: Keep channels readable with threaded replies" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-06.jpg", alt: "Reaction Etiquette: Use emoji reactions to acknowledge messages professionally" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-07.jpg", alt: "Keep Messages Professional: Avoid all-caps, excessive punctuation, and slang" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-08.jpg", alt: "Manage Notification Settings: Available, Away, and Do Not Disturb statuses" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-09.jpg", alt: "Responsible Use: Treat every message as you would a company email" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-10.jpg", alt: "AI as a Communication Coach: Use AI to audit your professional habits" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-11.jpg", alt: "Real-World Scenario: TOR Tech — applying your training in Microsoft Teams" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-12.jpg", alt: "Knowledge Check: Where should you post a project update for your entire team?" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-13.jpg", alt: "Challenge Application: Direct tagging and clear updates in public channels" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-14.jpg", alt: "Responding to Managerial Feedback: Professional, non-defensive thread replies" },
      { src: "/images/office-assistant/module-2/slack-teams-etiquette/slide-15.jpg", alt: "The Digital Etiquette Summary: Choose the Right Space, Format for Clarity, Assume Visibility" },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "TOR Tech uses Microsoft Teams for internal communication. Your manager sends you a message asking you to respond to a teammate's question in the #projects channel. You are new to the platform and need to know the rules before you type anything public.",
          },
        ],
      },
      {
        heading: "Professional Messaging in the Workplace",
        blocks: [
          {
            type: "paragraph",
            text: "Workplace chat tools like Slack and Microsoft Teams are fast, but fast does not mean casual. How you communicate here shapes how coworkers and managers perceive you:",
          },
          {
            type: "list",
            items: [
              "Channels vs DMs — use public channels for team updates and project discussions; use DMs for private or sensitive conversations",
              "Chat vs email — use chat for quick questions and real-time updates; use email for formal communications and external contacts",
              "Reaction etiquette — a thumbs-up or checkmark reaction is a professional way to acknowledge a message without cluttering the channel",
              "Notification settings — set your status (available, away, do not disturb) so teammates know when you can respond",
              "Keeping messages professional — avoid all-caps, excessive exclamation points, and slang that could be misread",
              "Thread your replies — respond inside a thread to keep channels readable and organized",
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
            text: "Workplace chat platforms are monitored by employers. Treat every message the way you would treat an email — do not say anything in a channel or DM that you would not be comfortable with your manager reading.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the top 5 rules for professional communication in a workplace Slack or Teams channel?\" Review the response and think about which rules you might already break without realizing it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where should you post a project update that is relevant to your entire team?",
            options: [
              "In a direct message to your manager",
              "In a private group chat",
              "In a public team channel",
              "Over email only",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Write 3 example workplace chat messages: (1) asking a teammate a question about a project deadline, (2) updating the team that a task has been completed, and (3) responding professionally to feedback from your manager in a public channel.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit all 3 chat messages to your instructor. Each message should be 1–3 sentences and professionally worded.",
      },
    ],
  },

  {
    slug: "video-meetings",
    title: "Running Video Meetings Professionally",
    description:
      "Learn how to show up, participate, and follow up on video meetings with confidence.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/Io7dhwJUV50",
    slides: [
      { src: "/images/office-assistant/module-2/video-meetings/slide-01.jpg", alt: "The Virtual Meeting Operating System: Mastering professional video communication, AI workflows, and flawless follow-ups" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-02.jpg", alt: "Every Meeting is a Broadcast: The Glitch vs. The Pro — camera, mic, and etiquette" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-03.jpg", alt: "The Platform Matrix: Choosing Your Tool — Microsoft Teams, Zoom, Google Meet, Slack Huddles" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-04.jpg", alt: "The Timeline of a Flawless Meeting: Setup (Before), Broadcast (During), Impact (After)" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-05.jpg", alt: "Phase 1: Orchestrate Your Studio — eye level, front lighting, and clean background" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-06.jpg", alt: "The AI Agenda Co-Pilot: Use AI to generate objectives and time-boxed topics" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-07.jpg", alt: "The Golden Rule of Virtual Audio: Join muted by default, unmute only to speak" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-08.jpg", alt: "Screen Sharing Mastery: Share specific windows only, close unneeded tabs" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-09.jpg", alt: "Note-Taking & The AI Revolution: AI note assistants combined with human synthesis" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-10.jpg", alt: "The 24-Hour Follow-Up Rule: Dispatch your recap with key decisions, action items, and owners" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-11.jpg", alt: "Anatomy of a Perfect Recap: Subject, date, attendees, decisions made, and next steps table" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-12.jpg", alt: "The VM-OS Master Checklist: Before, During, and After meeting actions" },
      { src: "/images/office-assistant/module-2/video-meetings/slide-13.jpg", alt: "Up Next in Your Digital Journey: Continue building your modern communication system" },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You are asked to join and take notes in a TOR Tech client video call. Your camera and mic must be ready, and you need to project professionalism. A blurry background, background noise, or forgotten mute button can undermine the entire meeting.",
          },
        ],
      },
      {
        heading: "Before, During & After the Meeting",
        blocks: [
          {
            type: "paragraph",
            text: "A professional video meeting starts before you click 'Join.' Use this checklist to prepare and follow through:",
          },
          {
            type: "list",
            items: [
              "Camera setup — position camera at eye level, ensure your face is well-lit from the front, use a clean or blurred background",
              "Muting etiquette — join muted by default, unmute only when speaking, re-mute immediately after",
              "Taking meeting notes — capture attendees, key discussion points, decisions made, and action items with owners and due dates",
              "Screen sharing — test sharing before the meeting, close unneeded tabs, share only the specific window or tab needed",
              "Following up — send a recap email within 24 hours with decisions and next steps clearly listed",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a meeting agenda template for a 30-minute client check-in meeting.\" Use the template as your starting point the next time you need to prepare for or facilitate a meeting.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "When should you send a meeting recap email after a video call?",
            options: [
              "Only if attendees request it",
              "At the start of the next meeting",
              "Within 24 hours",
              "Within one week",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Write a post-meeting summary for a fictional 20-minute team meeting about planning a company event. Include the meeting date, attendees (use made-up names), at least 3 key decisions made during the meeting, and at least 3 next steps with an owner assigned to each.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your post-meeting summary to your instructor. It should be formatted clearly and ready to send as a follow-up email.",
      },
    ],
  },

  {
    slug: "manage-your-inbox",
    title: "Hands-On: Manage Your Inbox",
    description:
      "Apply inbox organization strategies to triage and manage a high-volume email inbox.",
    duration: "30 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You arrive at TOR Tech on Monday to find 47 unread emails. Your manager expects you to respond to urgent ones and organize the rest before noon. Without a system, this is overwhelming. With one, it is manageable.",
          },
        ],
      },
      {
        heading: "Inbox Organization Strategies",
        blocks: [
          {
            type: "paragraph",
            text: "A well-managed inbox is a professional asset. These strategies will help you go from buried to in control:",
          },
          {
            type: "list",
            items: [
              "Inbox zero approach — process every email: reply, delegate, archive, or delete. Never leave it sitting unread with no action taken.",
              "Creating folders or labels — organize by project, client, or urgency so emails are easy to find later",
              "Using filters — automatically sort incoming emails into folders based on sender, subject, or keywords",
              "Flagging priority emails — mark messages that require a response or action so they stand out",
              "Unsubscribing from clutter — remove yourself from newsletters and promotional emails that waste your time and attention",
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
            text: "Be careful when using filters or auto-archive rules — important messages can get buried if your rules are too broad. Always review your filtered folders regularly.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a polite auto-reply email for when I'm away from my desk until 2pm.\" Edit the result to include your name and your return time.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What does the 'inbox zero' approach recommend you do with every email?",
            options: [
              "Leave unread emails until the end of the week",
              "Process each email: reply, delegate, archive, or delete",
              "Only respond to emails from your manager",
              "Auto-archive everything older than 24 hours",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Organize your actual email inbox OR a mock inbox. If using a mock inbox, create a list of 10 fictional emails (include sender, subject, and a one-sentence description of the content). Sort every email into one of these four categories: Urgent — Respond Today, Follow-Up Needed, Archive, Delete. Provide a brief one-sentence reason for each sorting decision.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your sorted list of 10 emails with each category labeled and your reasoning included. If you organized your real inbox, submit a before-and-after screenshot.",
      },
    ],
  },
];
