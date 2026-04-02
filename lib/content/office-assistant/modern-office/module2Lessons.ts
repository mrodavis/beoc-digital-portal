import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "professional-email-writing",
    title: "Professional Email Writing",
    description:
      "Learn how to write clear, professional, and effective workplace emails.",
    duration: "20 min",

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
