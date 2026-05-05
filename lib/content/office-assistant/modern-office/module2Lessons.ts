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
        heading: "Why Email Still Dominates Professional Communication",
        blocks: [
          {
            type: "paragraph",
            text: "Despite the rise of chat tools and video meetings, email remains the primary channel for external communication, formal requests, and any message that needs a written record. Understanding why email carries this weight helps you write every message with the right level of care:",
          },
          {
            type: "list",
            items: [
              "Email is the universal professional channel — it works across organizations, industries, and countries regardless of what internal tools each party uses. It is the only communication system you can rely on with every external contact.",
              "Every email is a permanent written record — unlike a chat message or a phone call, an email can be forwarded, archived, and referenced for months or years. You are always writing for an audience larger than just the current recipient.",
              "Email sets tone before you speak — in many professional relationships, your first email is your first impression. A well-written message signals that you are organized, articulate, and detail-oriented before anyone has met you.",
              "Formal decisions are documented over email — approvals, project updates, scope changes, and client commitments all belong in email so there is no dispute about what was agreed and when.",
              "Email etiquette is closely observed by managers and senior colleagues — how you write externally reflects on your team and organization. Sloppy emails get noticed for the wrong reasons; polished ones build your professional reputation quietly over time.",
            ],
          },
        ],
      },
      {
        heading: "The Anatomy of a Professional Email",
        blocks: [
          {
            type: "paragraph",
            text: "Every professional email has the same six-part structure. Mastering this structure lets you write confidently in any workplace situation — because you always know what goes where:",
          },
          {
            type: "list",
            items: [
              "Subject line — specific, clear, and action-oriented. The subject line must tell the recipient exactly what the email is about before they open it. 'Project Update: Q2 Report Ready for Review' is a professional subject line. 'Update' is not. A vague subject line wastes time and signals disorganization.",
              "Greeting — address the recipient by name whenever possible. 'Hi Sarah,' is appropriate for most workplace emails. 'Dear Mr. Chen,' works for formal external communications. 'Hey' and 'To Whom It May Concern' are both extremes to avoid — one is too casual, the other too impersonal.",
              "Opening sentence — state your purpose in the very first sentence. Do not build up to your point or lead with pleasantries. 'I am writing to share the Q2 report for your review' is a strong opener. 'Hope you are having a great day! I wanted to reach out...' is not.",
              "Body — provide the details, context, or action items your opening sentence promised. Keep paragraphs short — no more than three to four sentences each. Use bullet points for lists of items, steps, or deliverables. Every sentence should earn its place.",
              "Closing — wrap up with a clear next step or call to action before your sign-off. 'Please review and let me know if you have any questions by Friday.' is a strong close. Then use a professional sign-off: 'Best regards,' 'Thank you,' or 'Sincerely,' depending on the formality of the relationship.",
              "Signature — every professional email ends with a full signature block: your name, job title, company name, phone number, and any relevant links. A proper signature makes it easy for the recipient to contact you and signals that you represent a real professional organization.",
            ],
          },
        ],
      },
      {
        heading: "Subject Lines: The First Battle for Attention",
        blocks: [
          {
            type: "paragraph",
            text: "The subject line determines whether your email gets opened, skimmed, or ignored. In a busy inbox, recipients make split-second decisions about priority. Your subject line does the work before the body ever gets read:",
          },
          {
            type: "list",
            items: [
              "Be specific and descriptive — include the project name, the action needed, and the timeline when relevant. 'Action Required: Sign Off on Client Proposal by Thursday' is far more effective than 'Proposal'.",
              "Lead with the action when a response is needed — starting with 'Action Required:', 'For Your Review:', or 'Decision Needed:' immediately signals what you need from the recipient and by when.",
              "Keep it under 60 characters — longer subject lines get cut off on mobile devices and in busy inboxes. If your subject line needs more than 60 characters to be clear, your email probably needs restructuring.",
              "Never leave the subject line blank — a blank subject line sends your email directly to spam filters or to the bottom of the inbox. It also signals that you did not take the time to frame your message.",
              "Avoid vague filler words — 'Important', 'Quick Question', 'Follow Up', and 'Hi' are the most common subject line mistakes. They tell the recipient nothing and train them to ignore your messages.",
            ],
          },
        ],
      },
      {
        heading: "Tone Register: Matching Your Language to the Situation",
        blocks: [
          {
            type: "paragraph",
            text: "Professional email tone is not about using stiff, formal language — it is about matching your register to the relationship and the context. The same workplace message can be written at three different registers, and choosing the wrong one damages your credibility:",
          },
          {
            type: "list",
            items: [
              "Formal register — used for external clients, senior leadership, legal communications, and first-contact messages. Uses full names, complete sentences, no contractions, and a respectful distance. Example: 'I am writing to confirm our meeting scheduled for Thursday, April 10th at 2:00 PM.'",
              "Semi-formal register — used for most internal workplace emails, known contacts, and ongoing professional relationships. Conversational but still structured and correct. Uses contractions, first names, and a warmer but professional tone. Example: 'Just confirming our Thursday meeting — see you at 2 PM.'",
              "Common tone mistakes to avoid — do not use emojis in external emails, do not open with 'Hey', do not use texting abbreviations, and do not end without a clear close. These signal a lack of professional awareness.",
              "Urgency and frustration — never write an email when you are frustrated or under pressure without reviewing it first. Reread every email from the recipient's perspective before hitting send. If the tone reads as curt, impatient, or passive-aggressive, revise it before it damages the relationship.",
              "Proofread every single time — a single spelling or grammar error in a professional email erodes credibility disproportionately to its size. Use spell-check, reread before sending, and when in doubt, read it out loud — errors that slip past the eye are often caught by the ear.",
            ],
          },
        ],
      },
      {
        heading: "CC, BCC, and Reply All: The Most Dangerous Buttons",
        blocks: [
          {
            type: "paragraph",
            text: "Most professional email disasters are caused not by bad writing but by misuse of the recipient fields. Understanding exactly when to use CC, BCC, and Reply All is one of the most critical professional skills in email communication:",
          },
          {
            type: "list",
            items: [
              "To: — the primary recipient. The person or people you are directly communicating with. Whoever is in the To: field is expected to respond or take action.",
              "CC (Carbon Copy) — use CC to loop in stakeholders who need to be informed but are not expected to respond or act. Your manager, a project lead, or a client contact who needs visibility but is not the main audience. Everyone on the thread can see who is CC'd.",
              "BCC (Blind Carbon Copy) — use BCC to send to a recipient without revealing their address to other recipients. Use this when sending a mass update to a group and you do not want to expose every recipient's email address to the others. Misusing BCC to secretly copy your manager on a message is an ethical gray area — use it with care.",
              "Reply All — the most dangerous button in any inbox. Only use Reply All when everyone on the original thread genuinely needs to see your response. Using Reply All to reply 'Thanks!' to a group of 20 people is one of the most common and most resented email mistakes in any office environment.",
              "Never reply all to a company-wide email — if you accidentally send an 'Unsubscribe me' or 'Got it!' reply to 200 coworkers, the damage is immediate and memorable. Before hitting Reply All, ask: does every person on this thread need to read what I am about to say? If the answer is no, use Reply instead.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: The Professional Email Framework",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-2/professional-email-writing/email-framework-infographic.png",
            alt: "The Professional Email Framework: From Subject Line to Signature — covering anatomy, subject line tactics, tone register, and CC/BCC protocol",
            caption: "The Professional Email Framework: From Subject Line to Signature",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never send confidential client information, personally identifiable data, or sensitive business details over email without confirming it is the appropriate channel. Always double-check the recipient's address before hitting send — misdirected emails are a serious professional and potential legal issue. If the email contains sensitive information, use a secure file-sharing platform and send only the link.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional email to a client letting them know their order has been delayed by 2 days. Keep it under 100 words, use a semi-formal tone, and include a clear subject line.\" Review the result critically: Does the subject line tell you exactly what the email is about? Does the opening sentence state the purpose immediately? Then edit it to add your own name, title, and a full signature block.",
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
        text: "Draft a professional email to a client rescheduling a meeting that was originally set for Tuesday. The new time is Thursday at 3:00 PM. Your email must meet all five specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a subject line that clearly communicates what the email is about and any action required — it should not be vague",
          "Open with a purpose statement in the first sentence — do not lead with pleasantries",
          "Include a polite, brief explanation for the change and confirm the new date, time, and meeting location or video link",
          "End with a clear confirmation request — ask the recipient to reply confirming whether Thursday at 3:00 PM works for them",
          "Close with a professional sign-off and a full signature block including your name, title, and contact information",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the final email you drafted to your instructor or course folder. It should be ready to send — proofread, properly structured, and formatted as a real workplace email.",
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
            text: "TOR Tech uses Microsoft Teams for internal communication. Your manager sends you a message asking you to respond to a teammate's question in the #projects channel. You are new to the platform and need to know the rules before you type anything public. What you write in that channel is visible to the entire team — and possibly to management and HR.",
          },
        ],
      },
      {
        heading: "Why Workplace Chat is Not Casual Texting",
        blocks: [
          {
            type: "paragraph",
            text: "Slack and Microsoft Teams are fast, but speed does not equal informality. Workplace chat platforms carry the same professional weight as email — the difference is that messages are even more visible because they appear in shared channels in real time. Your communication habits on these platforms directly shape your professional reputation:",
          },
          {
            type: "list",
            items: [
              "Every message is searchable and archived — unlike a spoken conversation, everything you type in a workplace chat platform is logged, searchable, and retrievable by the organization. Messages sent months ago can be pulled up in a dispute, a review, or an audit.",
              "Your tone in chat is read by everyone in the channel — a message sent in a moment of frustration, a careless joke, or an overly casual comment in a client-facing channel can damage relationships that took months to build.",
              "Chat behavior is noticed by managers — how you communicate in team channels is a direct reflection of your professionalism. Clear, organized, appropriately timed messages signal that you understand how to function in a professional environment.",
              "Chat platforms are not a substitute for email — a chat message is not the right format for formal requests, external communications, legal confirmations, or complex information that needs a permanent record. Know when to shift to email.",
              "Fast does not mean careless — re-read every message before sending, especially in public channels. A typo in a DM is forgettable; a typo in the #announcements channel stays visible to the whole organization.",
            ],
          },
        ],
      },
      {
        heading: "Channel Strategy: Where Every Message Belongs",
        blocks: [
          {
            type: "paragraph",
            text: "Choosing the right channel for each message is the foundation of professional chat etiquette. Posting in the wrong space wastes people's attention, creates clutter, and signals that you do not understand how the organization is structured:",
          },
          {
            type: "list",
            items: [
              "Public channels — used for project updates, team-wide announcements, status reports, and any information the entire team needs visibility into. The default should always be public: if you are not sure whether to post publicly or privately, public is usually correct because it keeps information accessible and the organization transparent.",
              "Direct Messages (DMs) — used for private conversations, sensitive topics, one-on-one clarifications, or information that is relevant only to one or two people. DMs are not the right channel for information the team needs to see — putting project updates in DMs instead of channels creates information silos.",
              "Chat vs. email — use chat for quick real-time questions, status updates, and internal collaboration. Switch to email for formal communications, external contacts, approvals that need a paper trail, and messages longer than a short paragraph.",
              "Do not create a DM where a channel message would serve the whole team — when you route a question to a DM that could have been answered publicly, you deprive the rest of the team of the same information and force repeated questions.",
              "When in doubt, ask — if you are new to an organization, ask your manager or a senior teammate: 'Which channel should I post project updates to?' Getting this right early prevents a pattern of misrouted communication.",
            ],
          },
        ],
      },
      {
        heading: "Threading, Reactions, and Message Formatting",
        blocks: [
          {
            type: "paragraph",
            text: "Three mechanics of professional chat communication make the difference between a readable, organized channel and a chaotic noise feed. Mastering them keeps the team's shared workspace functional:",
          },
          {
            type: "list",
            items: [
              "Thread your replies — when responding to a specific message, always reply in the thread (click 'Reply in thread' rather than sending a new message to the main channel). Threading keeps the conversation organized, prevents unrelated messages from being buried, and allows team members to follow only the conversations relevant to them.",
              "Never send a new top-level message in response to a specific post — a new message in the main channel breaks the conversation flow, disconnects context, and forces everyone in the channel to read a message without knowing what it is responding to.",
              "Emoji reactions for acknowledgment — a thumbs-up, a checkmark, or an eyes emoji is a professional way to acknowledge a message, confirm receipt, or signal that you saw something without cluttering the channel with 'Got it!' and 'Thanks!' messages. Use reactions for acknowledgments; use text replies when your response adds information.",
              "Formatting for clarity — use bold text (**text** in Slack, **text** in Teams) to highlight key information, action items, or deadlines in longer messages. Use numbered lists for steps and instructions. A wall of unformatted text in a chat message is hard to scan and easy to misread.",
              "Mentions and tags — use @name to direct a message to a specific person so they receive a notification. Use @channel or @here sparingly and only when a message is genuinely urgent and relevant to everyone. Overusing group mentions trains the team to ignore notifications.",
            ],
          },
        ],
      },
      {
        heading: "Status Management and Notification Hygiene",
        blocks: [
          {
            type: "paragraph",
            text: "Your chat status tells the team when you are available, away, or unavailable — and respecting that system for both yourself and your colleagues is a core component of professional digital communication:",
          },
          {
            type: "list",
            items: [
              "Set your status accurately — use 'Available' when you are at your desk and able to respond in a reasonable timeframe. Use 'Away' or 'Busy' when you are in a meeting, on a call, or stepped away. Use 'Do Not Disturb' during focused work blocks to signal that you should not be interrupted except for genuine urgencies.",
              "Update your status when you leave for lunch, go to a meeting, or work off-hours — leaving your status as 'Available' when you are unreachable for two hours trains your teammates not to trust your status signal at all.",
              "Respect others' statuses — if someone's status is 'Do Not Disturb' or 'In a Meeting', do not send a follow-up message three minutes later. DMs with 'Did you see my message?' sent to someone in DND mode are one of the most common sources of workplace frustration.",
              "Configure your own notifications intentionally — disable notifications from non-essential channels during focused work so you are not pulled out of deep work every time someone posts in #general. Use custom notification words to only get notified when your name or key project terms are mentioned.",
              "Set your working hours in Teams or Slack to match your actual schedule — this prevents colleagues in different time zones from sending urgent messages when you are not working and expecting an immediate response.",
            ],
          },
        ],
      },
      {
        heading: "Writing Messages That Get Read and Understood",
        blocks: [
          {
            type: "paragraph",
            text: "Most communication failures in workplace chat are not about what someone said — they are about how it was written. These are the most common writing mistakes in workplace chat, and how to fix each one:",
          },
          {
            type: "list",
            items: [
              "Avoid all-caps — typing in ALL CAPS reads as shouting regardless of intent. Even 'PLEASE SEE THIS' in a professional context creates unnecessary alarm and comes across as aggressive.",
              "Avoid excessive punctuation and exclamation points — 'This is urgent!!!' reads as unprofessional panic. 'This is urgent — please review before 3 PM' says the same thing with the tone of a competent professional.",
              "Avoid vague opener messages — sending 'Hey' or 'Can I ask you something?' as a standalone message is a productivity trap. It interrupts the recipient, forces them to respond before knowing if the question is worth their attention, and delays the actual conversation. Lead with the question: 'Hey — quick question about the Q2 report. Do you have the final numbers for the April contracts?'",
              "Be concise and direct — get to the point in the first sentence. If your message requires three paragraphs of context, it probably belongs in an email. Chat messages should be short enough to read in a single glance without scrolling.",
              "Avoid slang and abbreviations with new contacts — 'lmk' and 'ty' are fine in established casual work relationships, but using them with someone you have just started working with signals low professional awareness. Default to full words until you understand the relationship.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: The Digital Etiquette Summary",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-2/slack-teams-etiquette/digital-etiquette-infographic.png",
            alt: "The Digital Etiquette Summary: Choose the Right Space, Format for Clarity, Assume Visibility — covering channel strategy, threading, reactions, status management, and message clarity",
            caption: "The Digital Etiquette Summary: Choose the Right Space, Format for Clarity, Assume Visibility",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Workplace chat platforms are monitored and archived by employers. Every message you send — including DMs — may be reviewed by HR, legal, or management under certain circumstances. Treat every message the way you would treat a written email. Do not say anything in a DM or channel that you would not be comfortable with your manager, HR, or a client reading. Confidential business information, personal complaints about colleagues, and sensitive discussions belong in private meetings — not in chat.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the top 5 rules for professional communication in a workplace Slack or Microsoft Teams channel?\" Review the response carefully and identify which rules you might already break without realizing it. Then ask a follow-up: \"Give me 3 examples of unprofessional chat messages and rewrite each one professionally.\" Use the examples to calibrate your own writing standard.",
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
        text: "Write 3 example workplace chat messages that demonstrate professional communication. Each message must meet the specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Message 1 — Ask a teammate a specific question about a project deadline. Do not use a vague opener like 'Hey' alone. Lead with the question and include enough context for them to answer without follow-up.",
          "Message 2 — Update the team in a public project channel that a task has been completed. Tag the relevant person, reference the specific task by name, and indicate if any action is needed from others.",
          "Message 3 — Respond professionally to constructive feedback from your manager posted in a public channel. Your reply should be posted as a thread reply (not a new message), acknowledge the feedback, and state your next action.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit all 3 chat messages to your instructor. Each message should be 1–3 sentences, professionally worded, and free of slang, abbreviations, or casual tone. Label each message clearly: Message 1, Message 2, Message 3.",
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
            text: "You are asked to join and take notes in a TOR Tech client video call. Your camera and mic must be ready, and you need to project professionalism. A blurry background, background noise, or forgotten mute button can undermine the meeting before it even starts — and the follow-up recap email is what determines whether the meeting produces actual results.",
          },
        ],
      },
      {
        heading: "Why Every Video Meeting is a Broadcast",
        blocks: [
          {
            type: "paragraph",
            text: "A video meeting is not a phone call with a camera turned on — it is a broadcast. Every participant can see your environment, your lighting, your posture, and your level of preparation in real time. Understanding the stakes helps you treat every meeting with the professionalism it deserves:",
          },
          {
            type: "list",
            items: [
              "Your video frame is your professional environment — a cluttered background, poor lighting, or a camera angle pointing up at your ceiling communicates disorganization before you say a word. Your physical setup is a reflection of your professional standards.",
              "Audio quality matters more than video quality — a frozen video is tolerable; garbled audio stops the meeting entirely. Background noise from a loud environment, an unmuted fan, or a barking dog disrupts the entire group and shifts attention from the content to the distraction.",
              "Lateness to a video meeting is highly visible — joining three minutes late to a video call is more disruptive than being three minutes late to a physical meeting, because every other participant is sitting in silence watching the attendee list waiting for you.",
              "Your attention is tracked — looking at your phone, typing on a different tab, or talking to someone off-camera signals disrespect. In video meetings, your engagement is visible in real time and remembered by the people on the call.",
              "Clients and stakeholders judge the organization by how meetings are run — a technically smooth, well-prepared, on-schedule video meeting signals operational competence. A chaotic, audio-problem-plagued, unstructured meeting suggests the same about how the organization is run.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Before the Meeting: Studio Setup and Agenda Prep",
        blocks: [
          {
            type: "paragraph",
            text: "Everything that matters in a video meeting is decided before you click 'Join.' The 10 minutes before a meeting starts are the most valuable investment you can make in its success:",
          },
          {
            type: "list",
            items: [
              "Camera position — position your camera at eye level so you appear to be making direct eye contact. A camera positioned below eye level (like a laptop on a desk) makes you appear to be looking down at participants. Use books, a stand, or an elevated surface to raise it to face height.",
              "Lighting — sit facing a light source, not with it behind you. A window behind you turns you into a silhouette. A lamp or monitor in front of you gives even, flattering illumination. If you look dark or shadowed on screen, move to face the light.",
              "Background — use a clean, uncluttered background. A blank wall, a tidy bookshelf, or a professional virtual background are all acceptable. If you use a virtual background, test it before the meeting — low-quality virtual backgrounds that flicker around your face look more distracting than a slightly messy room.",
              "Test your audio and video — join the meeting 2–3 minutes early and run the pre-join audio/video check every platform provides. Confirm your microphone works, your camera is on, and your speakers are correctly set. A technical issue discovered during the check is a minor inconvenience; the same issue discovered mid-meeting is a disruption.",
              "Prepare an agenda — if you are facilitating the meeting, build an agenda before the call. Use a simple structure: meeting goal, topic list with time allocations, and names of who is leading each section. Even a 3-item agenda transforms an unfocused discussion into a productive one.",
            ],
          },
        ],
      },
      {
        heading: "Phase 2 — During the Meeting: Presence, Audio, and Screen Sharing",
        blocks: [
          {
            type: "paragraph",
            text: "Once the meeting begins, your role shifts from preparation to execution. Three mechanics govern professional conduct during an active video meeting:",
          },
          {
            type: "list",
            items: [
              "The mute rule — join every meeting muted by default. Unmute only when you are actively speaking, then mute immediately after. This is the single most important audio etiquette rule in any virtual environment. Even ambient noise from your environment — typing, traffic, HVAC — disrupts the call for everyone if your microphone is open.",
              "Raise your hand or use the reaction system — do not speak over others. Most platforms have a 'raise hand' feature or reaction system. Use it to signal that you want to speak, then wait to be called on. Interrupting in a video meeting is more disruptive than interrupting in person because audio processing often causes participants to cut each other off entirely.",
              "Screen sharing protocol — when sharing your screen, close all unneeded browser tabs, personal files, email, and notifications before sharing. Share only the specific window or tab you intend to show — not your entire desktop. A careless screen share that exposes personal messages, confidential data, or an embarrassing browser history is a preventable professional disaster.",
              "Engagement signals — use the chat panel, reaction buttons, and verbal affirmations ('Makes sense,' 'I agree') to show you are actively engaged. Sitting in silent, unmoving video presence for an hour signals that you are not fully present even if you are.",
              "Note-taking during the call — if you are assigned to take notes, open your notes document before the meeting starts. Capture attendees, key discussion points, decisions made, and action items with assigned owners and due dates in real time. Do not try to reconstruct notes from memory after the call — critical details disappear within minutes.",
            ],
          },
        ],
      },
      {
        heading: "Phase 3 — After the Meeting: The Follow-Up System",
        blocks: [
          {
            type: "paragraph",
            text: "The follow-up email is where meetings either produce results or dissolve into forgotten commitments. Most meetings fail not because the discussion was poor, but because no one documented what was decided and who agreed to do what by when:",
          },
          {
            type: "list",
            items: [
              "Send the recap within 24 hours — the 24-hour rule is the professional standard. Waiting longer than a day means decisions fade from memory and action items lose urgency. The longer you wait, the less value the recap delivers.",
              "Address the recap to all attendees — reply to the original meeting invite or send a new email to every person who attended. CC anyone who was expected to attend but missed the call so they are caught up without requiring a separate conversation.",
              "Lead with decisions, not summaries — the most valuable section of any meeting recap is not a transcript of what was discussed, but a clear list of every decision made. 'We decided to move the client presentation to Thursday' is actionable. 'We discussed options for the client presentation' is not.",
              "Assign every action item with a name and a deadline — each next step must have an owner (who is responsible) and a due date (when it is due). Unassigned action items and undated tasks do not get done. Format these clearly: 'Sarah will send the revised proposal to the client by Friday, May 9th.'",
              "Keep it concise — a recap email is not a transcript. It is a decision log. The ideal recap fits in one or two short sections: decisions made and next steps. If your recap is five paragraphs long, it will not get read carefully enough to be useful.",
            ],
          },
        ],
      },
      {
        heading: "Anatomy of a Professional Meeting Recap",
        blocks: [
          {
            type: "paragraph",
            text: "A meeting recap email has a standard professional structure. Knowing this structure lets you produce a clean, useful recap in under 10 minutes every time — regardless of how complex the meeting was:",
          },
          {
            type: "list",
            items: [
              "Subject line — use a specific, recognizable format: 'Meeting Recap — [Meeting Name] — [Date]'. For example: 'Meeting Recap — Q2 Planning Session — May 6, 2025'. This makes the email instantly findable when someone searches their inbox weeks later.",
              "Opening line — state the meeting date, duration, and attendees in a single sentence. 'This recap covers the Q2 Planning Session held on May 6th, attended by Sarah, Marcus, and Jordan.'",
              "Decisions made — a numbered or bulleted list of every concrete decision that came out of the meeting. Each entry should be one sentence: clear, specific, and past tense.",
              "Next steps — a numbered list of action items, each with an assigned owner and a specific due date. Format: '[Owner] will [action] by [date].' For example: 'Marcus will finalize the vendor shortlist by Friday, May 9th.'",
              "Closing — invite corrections within a set window: 'Please reply by end of day Thursday if I have missed anything or if any details are incorrect.' This gives attendees the opportunity to catch errors before the recap becomes the permanent record.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: The VM-OS Master Checklist",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-2/video-meetings/vm-os-checklist-infographic.png",
            alt: "The VM-OS Master Checklist: Before (studio setup, agenda prep, audio test), During (mute rule, engagement, screen sharing), After (24-hour recap, decisions, action items)",
            caption: "The VM-OS Master Checklist: Before, During, and After",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a meeting agenda template for a 30-minute client check-in meeting. Include a clear goal statement, three agenda items with time allocations, and a section for action items.\" Use the template as your starting point the next time you prepare for or facilitate a meeting. Then ask ChatGPT — \"Now write a post-meeting recap email based on this agenda with fictional attendees, two decisions, and three action items.\" Compare the AI output to the anatomy checklist above.",
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
        text: "Write a complete post-meeting recap email for a fictional 20-minute team meeting about planning a company event. Your recap must meet all five specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a professional subject line using the standard format: 'Meeting Recap — [Meeting Name] — [Date]'",
          "Include an opening line stating the meeting date, approximate duration, and at least 3 fictional attendee names",
          "List at least 3 specific decisions made during the meeting — write each as a clear, one-sentence past-tense statement",
          "List at least 3 next steps, each with a named owner from your fictional attendee list and a specific due date",
          "Close with an invitation for attendees to reply with corrections within a stated deadline",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your post-meeting recap email to your instructor. It should be formatted clearly and ready to send as a real follow-up email — with a subject line, structured sections, and professional tone throughout.",
      },
    ],
  },

  {
    slug: "manage-your-inbox",
    title: "Hands-On: Manage Your Inbox",
    description:
      "Apply inbox organization strategies to triage and manage a high-volume email inbox.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/r4scpulRalE",
    slides: [
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-01.jpg", alt: "The Inbox Rescue Framework: A tactical guide to triaging high-volume email and conquering digital overwhelm" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-02.jpg", alt: "The Monday Morning Scenario: 47 unread emails — the problem and the solution" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-03.jpg", alt: "The Inbox Zero Philosophy: Triage Funnel — Reply, Delegate, Archive, Delete" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-04.jpg", alt: "The Command Center Toolbelt: Folders & Labels, Filters, Flags, and Unsubscribe" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-05.jpg", alt: "Routing Logistics: Manual vs. Automated — Flags & Labels vs. Filters" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-06.jpg", alt: "Responsible Use of Automation: Be careful with filters and auto-archive rules" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-07.jpg", alt: "The AI Assist Workflow: Context + AI Generation + Human Refinement = Professional out-of-office communication" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-08.jpg", alt: "The System in Motion: Five steps from unsubscribe firewall to Inbox Zero processed safe zone" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-09.jpg", alt: "The Triage Quadrant: A visual rubric — Follow-Up Needed, Urgent Respond Today, Archive, Delete" },
      { src: "/images/office-assistant/module-2/manage-your-inbox/slide-10.jpg", alt: "Hands-On Challenge: Execute the Rescue — sort emails into Triage Quadrant categories" },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You arrive at TOR Tech on Monday to find 47 unread emails. Your manager expects you to identify and respond to urgent ones and have the rest organized before noon. Without a system, this is overwhelming. With one, it is a 20-minute task. The difference between a buried inbox and a managed one is not time — it is method.",
          },
        ],
      },
      {
        heading: "Why an Unmanaged Inbox is a Professional Liability",
        blocks: [
          {
            type: "paragraph",
            text: "An unmanaged inbox is not just a personal inconvenience — it is a risk to your professional reliability. When emails pile up without a system, missed deadlines and dropped responsibilities follow:",
          },
          {
            type: "list",
            items: [
              "Buried emails mean missed commitments — a client request lost under 50 unread messages is indistinguishable from an ignored one. Whether you meant to respond or not is irrelevant to the person waiting for your reply.",
              "A disorganized inbox signals disorganization — when a manager cc'd on an email thread notices you have not responded to a client for three days, it reflects directly on your competence and professionalism regardless of the reason.",
              "The longer you let it pile up, the harder it gets — a backlog of 200 unread emails feels impossible to process, so most people avoid it. The avoidance makes the pile larger. The larger pile increases the anxiety. A system breaks this cycle before it starts.",
              "Search is not a substitute for organization — relying entirely on inbox search to find emails is a reactive strategy. It works until you need to find an email with a vague subject line or from an unfamiliar sender. A structured folder system is faster and more reliable than keyword searches.",
              "Your inbox is a representation of your professional systems — managers who observe how you handle your email often draw conclusions about how you would handle more complex responsibilities. An organized inbox is evidence of broader organizational discipline.",
            ],
          },
        ],
      },
      {
        heading: "The Triage Funnel: Reply, Delegate, Archive, Delete",
        blocks: [
          {
            type: "paragraph",
            text: "The Inbox Zero philosophy is not about having zero emails — it is about having zero unprocessed emails. Every email in your inbox is a decision waiting to be made. The triage funnel gives you four clear options so no email ever sits in limbo:",
          },
          {
            type: "list",
            items: [
              "Reply — if the email requires your response and the response takes less than two minutes, respond immediately and archive the email. Leaving a quick-response email sitting unread so you can reply to it 'later' is one of the primary drivers of inbox accumulation.",
              "Delegate — if the email requires action that someone else should take, forward it to the appropriate person with a clear instruction ('Please follow up on this by Thursday') and move the original to a 'Waiting' or 'Delegated' folder to track it.",
              "Archive — if the email requires no action and no response but may be useful for reference later, move it to the relevant archive folder immediately. Archived does not mean deleted — it means processed and filed where it can be found if needed.",
              "Delete — if the email requires no action, no response, and will never need to be referenced again, delete it immediately. Newsletters you will not read, promotional messages, and automated notifications you have already seen all belong in the trash. Do not archive everything — archiving low-value emails dilutes your ability to find high-value ones.",
              "The rule: never leave an email in your inbox with no action taken — if an email has been opened and read, it must be assigned to one of these four categories before you move on. An email in your inbox is a task still in progress.",
            ],
          },
        ],
      },
      {
        heading: "Building Your Command Center: Folders, Labels, and Filters",
        blocks: [
          {
            type: "paragraph",
            text: "A well-designed folder structure and a set of automated filters transform your inbox from a chaotic feed into an organized command center. These tools do the routing work so you do not have to:",
          },
          {
            type: "list",
            items: [
              "Folder structure — create folders organized by project, client, or category. A simple, flat structure is better than a complex hierarchy. Recommended starting folders: one folder per active client or project, a 'Waiting/Delegated' folder for emails you are tracking, and an 'Archive' folder for processed correspondence.",
              "Labels and color coding — in Gmail, use labels to categorize emails with multiple tags (an email can be in both 'Client: TOR Tech' and 'Urgent' simultaneously). In Outlook, use categories with color coding to visually flag email types at a glance without moving emails to folders.",
              "Filters — create automatic rules that route incoming emails before they hit your inbox. For example: 'Emails from client@tortech.com → apply label Client: TOR Tech and mark as important.' Filters eliminate the manual sorting step for recurring email types.",
              "Newsletter and subscription management — create a filter that routes all newsletters, promotional emails, and subscription digests to a dedicated 'Newsletters' folder that bypasses your inbox entirely. You can read them during a designated time rather than having them interrupt your primary inbox.",
              "Building your filter system — start with your 3–5 most frequent email senders or types and create one filter for each. A small set of well-targeted filters reduces inbox noise by 40–60% for most professionals. Add filters over time as new recurring patterns emerge.",
            ],
          },
        ],
      },
      {
        heading: "Flagging Priority Emails and Scheduling Your Inbox Time",
        blocks: [
          {
            type: "paragraph",
            text: "Not every email needs an immediate response — but every important email needs a clear signal that it will be addressed. Two habits prevent important emails from falling through the cracks and protect your focus throughout the workday:",
          },
          {
            type: "list",
            items: [
              "Flagging for follow-up — use the flag or star feature in your email client to mark emails that require action but not immediately. A flagged email stays in your inbox as a visible reminder that it is still in progress. Clear flags as soon as the action is complete.",
              "The 'Waiting' folder system — when you send an email that requires a response, move a copy of it or the original thread to your 'Waiting' folder with the expected response date noted. Check your Waiting folder every two days and send polite follow-ups on overdue threads.",
              "Scheduled inbox time — checking your inbox continuously throughout the day is one of the most significant productivity destroyers in office work. Instead, schedule two or three dedicated inbox processing windows — for example, 9 AM, 12 PM, and 4 PM — and close your email outside those windows. Let your auto-reply or voicemail handle urgent contacts who need an immediate response.",
              "The two-minute rule — if responding to or processing an email takes fewer than two minutes, do it immediately when you encounter it. If it takes longer, flag it or add it to your task list and return to it during your next scheduled processing window.",
              "Never use your inbox as a to-do list — emails sitting in your inbox as unread task reminders create visual clutter and anxiety. Move action items to a dedicated task manager and archive the triggering email. Your inbox is a communication channel, not a project tracker.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: The Triage Quadrant",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-2/manage-your-inbox/triage-quadrant-infographic.png",
            alt: "The Inbox Triage Quadrant: Urgent — Respond Today (high urgency, action required), Follow-Up Needed (low urgency, action required), Archive (no action, keep for reference), Delete (no action, no reference value)",
            caption: "The Inbox Triage Quadrant: A Visual Decision Framework",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Be careful when creating filters or auto-archive rules — important messages can get buried or skipped if your rules are too broad. A filter that routes all emails from a specific domain to a low-priority folder could hide a critical client message. Always review your filtered and labeled folders regularly. Before setting a filter to auto-delete or auto-archive, test it in monitor mode for one week to confirm it only catches the emails you intend.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a polite out-of-office auto-reply email for someone who is away from their desk for the afternoon and will return tomorrow morning. Include their name, return time, and a contact for urgent matters.\" Review the result: Does it set clear expectations? Is the tone professional? Edit it to include your own name, return time, and a real or fictional emergency contact. Then ask: \"What are the 5 best practices for managing a high-volume work inbox?\" Compare the AI's list to what you learned in this lesson.",
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
        text: "Organize a mock inbox by triaging a list of 10 fictional emails using the Inbox Zero method. Your challenge must meet all five specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a list of 10 fictional emails — for each one, provide: Sender name, Subject line, and a one-sentence description of the email content (what it is about and what, if anything, it requires from you)",
          "Assign each email to exactly one triage category: Urgent — Respond Today, Follow-Up Needed, Archive, or Delete",
          "Write a one-sentence reason for each sorting decision that explains why that category is correct for that email",
          "For every email in the 'Urgent — Respond Today' or 'Follow-Up Needed' categories, identify what folder or label it should be moved to after you action it",
          "Identify at least one email from your list that you would create a filter for — describe the filter rule and what it would do automatically",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your sorted list of 10 emails with each triage category labeled, your reasoning included for every entry, and your folder/filter plan. If you choose to organize your real inbox instead of a mock one, submit a before-and-after screenshot showing the inbox state and your folder structure.",
      },
    ],
  },
];
