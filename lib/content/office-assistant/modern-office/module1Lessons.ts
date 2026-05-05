import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "what-is-a-modern-office",
    title: "What is a Modern Office?",
    description:
      "Understand how modern workplaces operate using digital systems and tools.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/un2QGNwEH00?si=4X5x6cVYBYMTTUmW",

    slides: [
      {
        src: "/images/office-assistant/module-1/what-is-a-modern-office/slide-1.jpg",
        alt: "Mastering the Digital Desk — course introduction",
      },
      {
        src: "/images/office-assistant/module-1/what-is-a-modern-office/slide-2.jpg",
        alt: "Your First Day at TOR Tech — onboarding checklist",
      },
      {
        src: "/images/office-assistant/module-1/what-is-a-modern-office/slide-3.jpg",
        alt: "The Office is a Connected System — physical vs digital workflows",
      },
      {
        src: "/images/office-assistant/module-1/what-is-a-modern-office/slide-4.jpg",
        alt: "Translating the Workplace — physical tools to digital ecosystem",
      },
      {
        src: "/images/office-assistant/module-1/what-is-a-modern-office/slide-5.jpg",
        alt: "Dematerializing the Filing Cabinet — cloud storage",
      },
      {
        src: "/images/office-assistant/module-1/what-is-a-modern-office/slide-6.jpg",
        alt: "The Modern Workflow Ecosystem — email, cloud, calendar, collaboration",
      },
      {
        src: "/images/office-assistant/module-1/what-is-a-modern-office/slide-7.jpg",
        alt: "Activating Your AI Assistant — AI task prompt",
      },
      {
        src: "/images/office-assistant/module-1/what-is-a-modern-office/slide-8.jpg",
        alt: "Your Integration Challenge",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You just started your first day at TOR Tech. Your manager expects you to navigate emails, access shared files, and assist with scheduling meetings. You quickly realize everything is digital — there are no paper forms, no physical filing cabinets, and no sticky notes on monitors. Understanding how the digital office works is not optional; it is the job.",
          },
        ],
      },
      {
        heading: "Why This Matters",
        blocks: [
          {
            type: "paragraph",
            text: "Modern offices run on digital systems. If you understand how these systems work together, you can operate effectively in almost any workplace — regardless of the industry, the company size, or the specific software they use. Here is why digital fluency is the most transferable skill an office professional can develop:",
          },
          {
            type: "list",
            items: [
              "Digital systems are universal — the same core tools (email, cloud storage, documents, calendars) appear in virtually every professional environment. Master the concepts and you can adapt to any platform your employer uses.",
              "Employers expect immediate readiness — hiring managers assume that office assistants arrive ready to send emails, manage files, and join shared documents on day one. Digital literacy is a baseline, not a bonus.",
              "Speed and accuracy are inseparable from digital skill — paper-based processes are slower and more error-prone than their digital equivalents. The faster and more accurately you navigate digital tools, the more value you deliver every single day.",
              "Remote and hybrid work has made digital fluency non-negotiable — even in offices where everyone comes in five days a week, work is coordinated digitally. Documents are shared in the cloud, decisions are made over chat, and schedules are managed in shared calendars.",
              "Understanding the system lets you problem-solve — when something goes wrong (a file is missing, a meeting invite is not working, a document was overwritten), a professional who understands how digital systems work can diagnose and resolve issues without waiting for IT.",
            ],
          },
        ],
      },
      {
        heading: "The Physical-to-Digital Translation",
        blocks: [
          {
            type: "paragraph",
            text: "Every digital tool in a modern office replaces something that used to exist in the physical world. Understanding this translation helps you learn new tools faster — because the underlying concept is always familiar even when the software interface is not. Here is how the modern office maps to what came before it:",
          },
          {
            type: "list",
            items: [
              "Email replaces memos and phone tag — instead of writing a paper memo and dropping it in someone's inbox tray, you compose a digital message that arrives instantly. Instead of playing telephone tag for hours, a reply takes seconds. Email also creates an automatic written record of every communication.",
              "Cloud storage replaces the filing cabinet — instead of physical folders in a locked cabinet, files live in digital folders on a shared server or cloud platform. Anyone with permission can access them from anywhere, search them instantly, and collaborate on them simultaneously.",
              "Digital calendars replace paper planners — instead of a paper day planner that only you can see, a digital calendar is shareable, searchable, and connected to every other system in the office. Meeting invitations, reminders, and scheduling are all automated.",
              "Collaboration tools replace in-person-only meetings — platforms like Microsoft Teams, Google Meet, and Slack allow teams to meet, chat, share screens, and collaborate on documents without being in the same room or even the same timezone.",
              "Digital documents replace paper forms and reports — instead of printing, distributing, and collecting paper forms, digital documents can be filled out, reviewed, signed, and filed without a single page being printed. Version history means you never lose a draft.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: The Modern Office Ecosystem",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-1/what-is-a-modern-office/modern-office-infograph.png",
            alt: "The Evolution of the Modern Office: From Physical to Digital — comparing traditional physical office tools to modern digital equivalents",
            caption: "The Evolution of the Modern Office: From Physical to Digital",
          },
        ],
      },
      {
        heading: "How Digital Offices Are Organized",
        blocks: [
          {
            type: "paragraph",
            text: "A modern office is not just a collection of software applications — it is an integrated ecosystem where every tool connects to every other tool. Understanding the structure of that ecosystem is what allows you to work efficiently rather than jumping between disconnected apps:",
          },
          {
            type: "list",
            items: [
              "Communication layer — email and chat tools (Outlook, Gmail, Teams, Slack) form the communication backbone. Every task, request, and update flows through this layer first. If you cannot manage your communication layer, nothing else in the office runs smoothly.",
              "Storage layer — cloud platforms (Google Drive, OneDrive, SharePoint) hold every document, spreadsheet, and file the organization produces. The storage layer is shared — every team member accesses the same files, which means organization and naming conventions matter for the entire team.",
              "Productivity layer — document editors, spreadsheet tools, and presentation software (Google Docs, Microsoft Office, Google Sheets) are where actual work gets produced. These tools live inside the storage layer — files you create here are automatically saved to cloud storage.",
              "Scheduling layer — calendar tools (Google Calendar, Outlook Calendar) manage time across the organization. Meeting invitations, deadlines, and recurring commitments all live here. The scheduling layer is interconnected with the communication layer — invites are sent by email and accepted with a click.",
              "Coordination layer — task management and project tools (Trello, Asana, Microsoft To Do) track who is doing what and when it is due. This layer sits on top of everything else and gives teams visibility into the current state of all open work.",
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
            text: "Everything you do in a digital office creates a permanent record. Emails you send, files you edit, calendar changes you make — all of it is logged and traceable. Never share files, forward emails, or access folders that have not been explicitly granted to you. Digital access comes with accountability: what you do with it reflects directly on your professionalism and your organization's trust in you.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the most important digital tools for an office assistant in 2024, and how does each one get used in a typical workday?\" Review the response and identify which tools you already recognize. Note which ones are new to you — those are your first targets for hands-on practice.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What digital tool replaced the traditional paper filing cabinet in a modern office?",
            options: [
              "Email",
              "Cloud storage",
              "Spreadsheet",
              "Digital calendar",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Reflect on a workplace you have visited, worked in, or learned about. Write a structured response that demonstrates your understanding of how digital systems operate in a real professional environment. Your response must meet all four specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Identify at least 3 specific digital tools used in that workplace (or that would be used in a typical modern office) and name what physical tool each one replaced",
          "Describe one task from that workplace — or one you would be expected to do as an office assistant — and explain which digital tool would be used to complete it and why",
          "Explain in 2–3 sentences why understanding digital systems makes an office assistant more valuable to their employer",
          "Identify one potential risk of working in a digital office (such as accidental file deletion or sharing the wrong document) and describe how a professional would avoid it",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your written response (minimum 150 words) to your instructor or post it in your course folder. Your response should demonstrate that you understand not just what digital tools are, but why they exist and how they change the way office work gets done.",
      },
    ],
  },

  {
    slug: "core-office-tools",
    title: "Core Office Tools",
    description:
      "Learn the essential tools used in every modern office environment.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/UnHOS8F4uO8",

    slides: [
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-1.jpg",
        alt: "Architecting the Modern Office — course introduction",
      },
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-2.jpg",
        alt: "The modern workflow demands seamless transitions between distinct digital tasks",
      },
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-3.jpg",
        alt: "Every modern office relies on a structured architecture of six core systems",
      },
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-4.jpg",
        alt: "Mastering the underlying function prepares you for any digital ecosystem — M365 vs Google Workspace",
      },
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-5.jpg",
        alt: "Cloud storage is the central hub that makes remote, asynchronous execution possible",
      },
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-6.jpg",
        alt: "The production triad powers the creation, tracking, and pitching of workplace value",
      },
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-7.jpg",
        alt: "AI serves as a strategic advisor for navigating workplace technology decisions",
      },
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-8.jpg",
        alt: "Matching the business problem to the correct digital tool — Scenario Wiring Map",
      },
      {
        src: "/images/office-assistant/module-1/core-office-tools/slide-9.jpg",
        alt: "Mastering core systems transforms software literacy into immediate employer value — Activation Curve",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech asks you to send a meeting invite, share a document, and update a spreadsheet — all before lunch. Knowing which tool to use for each task is the difference between confidence and confusion. An office assistant who hesitates at the tool-selection step wastes time and signals to their manager that they are not ready for independent work.",
          },
        ],
      },
      {
        heading: "The Six Essential Systems",
        blocks: [
          {
            type: "paragraph",
            text: "Every modern office relies on the same core set of tools. These six systems appear in virtually every professional environment — regardless of whether the organization uses Google Workspace or Microsoft 365. Master the underlying function of each and you can adapt to any software variant your employer uses:",
          },
          {
            type: "list",
            items: [
              "Email (Gmail / Outlook) — the primary communication channel of every professional office. Email is used for formal communication with clients and external partners, for sending documents and links, for creating a paper trail of decisions, and for coordinating tasks across the team. Every office assistant is expected to manage their inbox professionally: reading messages promptly, replying with clear and complete responses, and organizing received messages into labeled folders.",
              "Cloud Storage (Google Drive / OneDrive) — the central file repository where all organizational documents live. Cloud storage replaced the physical filing cabinet and made remote collaboration possible. Files saved to cloud storage are accessible from any device with an internet connection, can be shared with specific team members or external partners, and are automatically backed up. Every file you create or receive at work should be saved to the organization's cloud storage — never only to your personal computer.",
              "Documents (Google Docs / Microsoft Word) — the standard tool for writing, editing, and sharing text-based content. Documents are used for reports, meeting notes, proposals, procedure guides, client summaries, and any other deliverable that is primarily text. The key skill is not just typing — it is formatting documents correctly so they look professional and are easy to read.",
              "Spreadsheets (Google Sheets / Microsoft Excel) — the tool for organizing, tracking, and analyzing numerical or structured data. Spreadsheets are used for contact lists, budget trackers, inventory records, scheduling tables, and any task that involves managing rows and columns of information. Learning basic spreadsheet skills — entering data cleanly, formatting cells, and using simple formulas — is one of the highest-value investments an office assistant can make.",
              "Presentations (Google Slides / Microsoft PowerPoint) — the tool for creating visual content for meetings, pitches, training sessions, and client-facing communications. Presentations are not just slide decks — they are a structured argument or narrative built one idea at a time. A professional presentation is clear, consistent in design, and focused on what the audience needs to understand.",
              "Calendar & Scheduling (Google Calendar / Outlook Calendar) — the system for managing time across the organization. Calendars are used to schedule meetings, set reminders for deadlines, block time for focused work, and coordinate availability across multiple team members. An office assistant who manages their own calendar well — and can help manage others' — is immediately more valuable to any team.",
            ],
          },
        ],
      },
      {
        heading: "Google Workspace vs. Microsoft 365",
        blocks: [
          {
            type: "paragraph",
            text: "The two dominant office productivity ecosystems are Google Workspace and Microsoft 365. Most employers use one or the other — and the tools in each ecosystem are functionally equivalent even when they look different. What matters is understanding the underlying function, not memorizing one specific interface:",
          },
          {
            type: "list",
            items: [
              "Google Workspace — includes Gmail, Google Drive, Google Docs, Google Sheets, Google Slides, and Google Calendar. Google Workspace is browser-based, meaning files live in the cloud by default and can be accessed from any device without installing software. It is widely used by startups, small businesses, schools, and nonprofits.",
              "Microsoft 365 — includes Outlook, OneDrive, Word, Excel, PowerPoint, and Outlook Calendar, plus Microsoft Teams for communication. Microsoft 365 has both desktop applications (installed on your computer) and cloud-based versions. It is widely used in corporate environments, government agencies, and large organizations.",
              "Transferability of skills — if you learn to write a professional document in Google Docs, you can write one in Microsoft Word. If you learn to build a spreadsheet in Google Sheets, you can build one in Excel. The core skill transfers; only the interface changes. Never let unfamiliarity with one platform stop you from describing yourself as capable with both.",
              "When employers use both — some organizations use Microsoft 365 internally and Google Workspace for client collaboration, or vice versa. Being comfortable navigating both ecosystems is a genuine competitive advantage.",
            ],
          },
        ],
      },
      {
        heading: "Matching the Tool to the Task",
        blocks: [
          {
            type: "paragraph",
            text: "One of the most common mistakes new office assistants make is using the wrong tool for a task — writing a client report in an email, tracking a contact list in a document, or building a budget in a presentation. Each tool is designed for a specific type of work, and using the right one from the start saves significant time and rework. Here is how to make the right choice every time:",
          },
          {
            type: "list",
            items: [
              "If you are communicating — use email for formal or external messages that need a permanent record. Use chat (Teams, Slack) for quick internal questions that do not require documentation.",
              "If you are creating written content — use a document. Reports, summaries, proposals, meeting notes, procedure guides, and any text-primary deliverable belong in a document, not an email body or a slide deck.",
              "If you are organizing structured data — use a spreadsheet. Contact lists, budgets, schedules, inventory counts, and any information that has rows and columns of structured data belongs in a spreadsheet, not a document.",
              "If you are presenting information to an audience — use a presentation. Client pitches, training sessions, team briefings, and any situation where you are standing in front of people explaining something visual belongs in a presentation.",
              "If you are coordinating time — use a calendar. Meeting invitations, deadline reminders, out-of-office notices, and time blocks for focused work all belong on a calendar, not in an email thread.",
              "If you are storing files for shared access — use cloud storage. Every file that another team member might need — whether today, next week, or next year — should be saved in a clearly named folder in the organization's cloud storage.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Core Office Tools",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-1/core-office-tools/core-office-tools-infographic.png",
            alt: "Core Office Tools: Matching the Right System to Every Task — the six essential systems, Google Workspace vs Microsoft 365 comparison, and the tool-to-task decision framework",
            caption: "Core Office Tools: Matching the Right System to Every Task",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Using the wrong tool for a task is not just inefficient — it can create real problems. Sending confidential information in an email when it should be in a secured shared folder, or building a client-facing document in a tool that does not export cleanly, signals a lack of professional judgment. Before you start any task, ask: 'Is this the right tool for this job, and is this the right place for this information?' If you are unsure, ask your manager before proceeding.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Compare Google Workspace and Microsoft 365. Which tools in each suite are equivalent to each other, and what are the key differences between them?\" Use the response to build a side-by-side understanding of both ecosystems so you can speak confidently about both in a job interview.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which tool would you use to present quarterly results to a client?",
            options: [
              "Email",
              "Spreadsheet",
              "Presentation software",
              "Cloud storage",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Demonstrate your ability to match the right tool to the right task by completing the scenario exercise below. Your response must address all four specifications:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Match each of the following four tasks to the correct tool and write one sentence explaining why: (a) Sending a project update to your team, (b) Tracking client names and phone numbers, (c) Presenting quarterly results to a client, (d) Storing a signed contract for future access",
          "Describe a scenario where using the wrong tool would cause a real problem at work — explain what went wrong and what should have been used instead",
          "Name one tool from Google Workspace and its Microsoft 365 equivalent, and explain in one sentence what they are both used for",
          "Identify the tool you feel least confident with right now and write 2–3 sentences describing what you would do to build that skill before your first day of work",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed response to your instructor. Your answers should demonstrate not just what each tool is called, but why each tool is the right fit for each type of work.",
      },
    ],
  },

  {
    slug: "ai-in-the-workplace",
    title: "Using AI in the Workplace",
    description:
      "Learn how AI tools can support your daily tasks and increase productivity.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/zBQjwfEBkkM",

    slides: [
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-01.jpg",
        alt: "Your New Digital Co-Pilot — Demystifying AI for the Modern Workplace",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-02.jpg",
        alt: "The 10-Minute Screen vs. The 30-Second Draft — Traditional vs AI-Assisted Workflow",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-03.jpg",
        alt: "The Amplifier Effect — AI Tools and Your Skills Venn diagram",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-04.jpg",
        alt: "Core Capabilities of Your AI Assistant",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-05.jpg",
        alt: "Navigating the Division of Labor — AI vs Human Responsibilities",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-06.jpg",
        alt: "The Accountability Workflow — AI Generation, Human Review, Professional Edit, Final Submit",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-07.jpg",
        alt: "The Prompt Engineering Blueprint",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-08.jpg",
        alt: "Knowledge Check — What should you always do before sending AI-generated output?",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-09.jpg",
        alt: "Challenge: Enter the Sandbox",
      },
      {
        src: "/images/office-assistant/module-1/ai-in-the-workplace/slide-10.jpg",
        alt: "BEOC — Empowering Your Modern Workflow",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at TOR Tech asks you to draft a professional email to reschedule a client meeting. You have 10 minutes. Instead of staring at a blank screen trying to find the right words, you open ChatGPT, describe the situation in one sentence, and get a polished draft in 30 seconds. You spend the remaining nine and a half minutes refining the tone, adding specific details, and ensuring the message sounds like you — not a robot. That is how AI is supposed to work in a professional environment.",
          },
        ],
      },
      {
        heading: "What AI Tools Actually Do",
        blocks: [
          {
            type: "paragraph",
            text: "AI tools like ChatGPT, Microsoft Copilot, and Google Gemini are large language models — systems trained on enormous amounts of text that can generate, summarize, organize, and transform written content on demand. They are not search engines, calculators, or databases of facts. They are drafting and reasoning assistants. Here is what they can genuinely do well:",
          },
          {
            type: "list",
            items: [
              "Draft written content from a prompt — give an AI tool a description of what you need (a professional email, a meeting agenda, a one-paragraph summary) and it will produce a usable first draft in seconds. The draft is raw material, not a finished product, but it eliminates the blank-page problem entirely.",
              "Summarize long documents — paste a dense report, email chain, or article into an AI tool and ask for a three-bullet summary. In environments where you receive long documents that need to be condensed into briefings for your manager, this is a significant time-saver.",
              "Rewrite content for tone or clarity — paste a paragraph you have written and ask the AI to make it more professional, shorter, simpler, or more direct. AI is excellent at applying a consistent voice to rough content.",
              "Generate structured outlines — describe a topic or task and ask the AI for an outline. 'Give me a 5-section outline for a report on office supply costs' produces a usable structure immediately, which you then fill in with real data and context.",
              "Answer workplace questions — 'What is the difference between CC and BCC in email?', 'How do I freeze a row in Google Sheets?', 'What should be in a professional meeting agenda?' — AI tools answer these functional questions faster than a web search and with more context.",
              "Help with prompt engineering for other AI tasks — you can ask an AI to help you write a better prompt for a different task, refine a request you have already made, or suggest follow-up questions to get a more complete answer.",
            ],
          },
        ],
      },
      {
        heading: "The Division of Labor: AI vs. Human",
        blocks: [
          {
            type: "paragraph",
            text: "The most important concept in using AI professionally is understanding what the AI does versus what you do. This division of labor is non-negotiable — and misunderstanding it is the single most common mistake new AI users make:",
          },
          {
            type: "list",
            items: [
              "AI generates the draft — the AI produces a starting point based on your prompt. It works with the information you give it and the patterns it has learned. It does not know your specific client, your organization's tone, your manager's preferences, or the context behind the request.",
              "You supply the context — AI has no knowledge of your specific situation unless you explain it. The quality of the output is directly determined by the quality of your prompt. A vague prompt produces generic output; a specific, detailed prompt produces useful output.",
              "You review for accuracy — AI makes mistakes. It can state facts that are incorrect, include details that do not apply to your situation, or miss nuances that matter. Before any AI-generated content leaves your hands, you must verify that every factual claim is accurate.",
              "You edit for voice and professionalism — AI output tends to sound generic. It matches professional writing patterns but lacks your individual voice, the specific relationship context between you and your recipient, and the organizational tone your employer expects. Your editing is what makes the output yours.",
              "You take full accountability — when you send a document, email, or report, it has your name on it. If the AI-generated content contains an error, the professional responsibility belongs to you, not the AI. 'The AI wrote it' is not a defense in a professional environment.",
            ],
          },
        ],
      },
      {
        heading: "Writing Effective AI Prompts",
        blocks: [
          {
            type: "paragraph",
            text: "The difference between useful AI output and generic AI output is almost entirely the quality of the prompt. A well-constructed prompt gives the AI the context it needs to produce something specific and immediately useful. Here is the blueprint for a professional AI prompt:",
          },
          {
            type: "list",
            items: [
              "State the role — tell the AI who you are or who it should act as: 'I am an office assistant at a small tech company' or 'Act as a professional business writer.' This establishes the context and expected register of the response.",
              "Describe the task specifically — do not say 'write an email.' Say 'Write a professional email to a client informing them that their meeting has been rescheduled from Tuesday at 2pm to Thursday at 3pm.' Specificity produces specificity.",
              "Include the audience — who is this for? 'The recipient is an external client we have worked with for six months. The tone should be professional but warm.' This allows the AI to calibrate formality and relationship appropriate language.",
              "Set format expectations — how long should the response be? What structure? 'Keep the email to three short paragraphs' or 'Give me a bullet-point list with no more than five items' prevents the AI from producing walls of text when you need something concise.",
              "Iterate, do not start over — if the first output is not right, do not delete it and start with a new prompt. Reply to the AI with a correction: 'Make the opening more direct' or 'Remove the second paragraph and replace it with one sentence acknowledging the inconvenience.' Iterating within a conversation produces much better results than repeated fresh starts.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: AI in the Workplace",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-1/ai-in-the-workplace/ai-workplace-infographic.png",
            alt: "AI in the Modern Workplace: The Professional's Guide — what AI tools do well, the division of labor between AI and human, the accountability workflow, and the prompt engineering blueprint",
            caption: "AI in the Modern Workplace: The Professional's Guide",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never paste confidential client information, employee records, salary data, or proprietary business information into a public AI tool like ChatGPT. That information leaves your organization's control the moment you paste it. Many organizations have explicit policies about what can and cannot be shared with external AI tools — find out your employer's policy before using AI at work. When in doubt, describe the situation in general terms without including any specific names, numbers, or identifying details.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional email confirming a meeting with a client for next Tuesday at 2pm. The meeting is at our office and will cover the Q3 project status. Keep it to two short paragraphs.\" Once you receive the response, edit it so it sounds like you — change any phrasing that feels generic, add your name in the signature, and adjust the tone to match how you would actually write to a client.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What should you always do before sending or submitting AI-generated output?",
            options: [
              "Send it immediately to save time",
              "Review and edit it yourself",
              "Share it with your entire team first",
              "Delete it and start from scratch",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Use ChatGPT to complete a professional writing task and then demonstrate your understanding of the human-AI accountability workflow. Your submission must meet all four specifications below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Use ChatGPT to draft a professional email for the following situation: Your supervisor asked you to notify the team that Friday's all-hands meeting has been moved from 10am to 2pm in Conference Room B",
          "After receiving the AI draft, edit it so it sounds natural and professional — change at least 2–3 things from the original AI output and note what you changed and why",
          "Write 2–3 sentences explaining what the AI did well in the draft and what it missed or got wrong that required your correction",
          "Identify one type of information you should never paste into a public AI tool like ChatGPT, and explain why",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit both the final edited email and your written reflection to your instructor. The email should be ready to send — professional, accurate, and edited. The reflection should demonstrate that you understand why human review is non-negotiable, not optional.",
      },
    ],
  },

  {
    slug: "setup-digital-workspace",
    title: "Hands-On: Set Up Your Digital Workspace",
    description:
      "Create and organize your own digital office system from scratch.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/jgVLlC_FF5g",

    slides: [
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-01.jpg",
        alt: "Hands-On: Set Up Your Digital Workspace — BEOC Digital Fundamentals, Module 1: The Modern Office",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-02.jpg",
        alt: "The TOR Tech Day One Challenge — 'Get yourself set up digitally. I need you ready to receive, organize, and share files by end of day.'",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-03.jpg",
        alt: "The Disorganized Drive vs the Professional Workspace — chaos of unnamed files vs a clean, navigable folder structure",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-04.jpg",
        alt: "Phase 1: Planning Your Folder Architecture — decide the structure before you build it",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-05.jpg",
        alt: "Phase 1: Creating the Folder Structure — TOR Tech My Workspace with Clients, Internal Docs, and Projects subfolders",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-06.jpg",
        alt: "Phase 1: Professional File Naming Conventions — Date_Description format and what never to name a file",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-07.jpg",
        alt: "Phase 2: Uploading and Organizing Files — placing files in the correct subfolder and applying naming conventions",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-08.jpg",
        alt: "Phase 2: Sharing Folders with the Right Access Level — View, Comment, and Edit permissions explained",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-09.jpg",
        alt: "AI Assist — Ask ChatGPT for a professional folder structure for a small business",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-10.jpg",
        alt: "Knowledge Check — What is the correct professional file naming format?",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-11.jpg",
        alt: "The Capstone Challenge — Build, name, upload, and share your TOR Tech digital workspace",
      },
      {
        src: "/images/office-assistant/module-1/setup-digital-workspace/slide-12.jpg",
        alt: "Moving Forward — Next Up: Module 2 | Brooklyn Educational Opportunity Center",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is your first week at TOR Tech. Your manager tells you: 'Get yourself set up digitally — I need you ready to receive, organize, and share files by end of day.' This lesson is that moment. A disorganized digital workspace is not a minor inconvenience — it makes you slower, creates errors, and signals to your team that you are not operating professionally. A well-structured workspace, built right from day one, is the foundation everything else rests on.",
          },
        ],
      },
      {
        heading: "The Disorganized Drive vs. the Professional Workspace",
        blocks: [
          {
            type: "paragraph",
            text: "Most people's first instinct when they start a new job is to save files wherever is convenient and figure out organization later. Later never comes. Here is what separates a disorganized drive from a professional workspace — and why the difference matters to everyone who works with you:",
          },
          {
            type: "list",
            items: [
              "Disorganized drives use vague file names — files named 'document1', 'final', 'final_FINAL', or 'untitled' are impossible to identify without opening them. In a shared drive, this forces every team member to open multiple files just to find the right one, wasting time across the entire team.",
              "Disorganized drives have no folder structure — files dumped into the root level of a drive, or organized by whatever seemed logical at the time, become unsearchable as the volume grows. After six months, a flat drive is a 500-item list that nobody can navigate.",
              "Professional workspaces use a logical, consistent folder hierarchy — top-level folders represent major categories (Clients, Projects, Internal Docs), and subfolders within each category provide a second level of organization. Anyone on the team can navigate to any file in under 30 seconds.",
              "Professional workspaces use standardized file naming — every file name includes a date in YYYY-MM format and a descriptive title, making files instantly identifiable and automatically sortable. You never need to open a file to know what it is.",
              "Professional workspaces are maintained, not abandoned — the structure you build on day one stays functional because you commit to naming every new file and placing it in the correct folder from the moment you save it. Setup is a one-time investment; maintenance is a daily habit.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Planning Your Folder Architecture",
        blocks: [
          {
            type: "paragraph",
            text: "The most important step in building a digital workspace happens before you create a single folder: planning the structure. Folders added impulsively after files start accumulating create an inconsistent system that breaks down quickly. Plan the architecture first, then build:",
          },
          {
            type: "list",
            items: [
              "Start with a main workspace folder — create a single top-level folder that holds everything. Name it clearly using your organization name or role: 'TOR Tech – My Workspace'. This is your root. Nothing gets saved outside of it.",
              "Create three core subfolders — most office assistant roles require three primary organizational categories: Clients (anything related to external contacts and client deliverables), Internal Docs (internal memos, policies, templates, and company documents), and Projects (active project work organized by project name or deadline).",
              "Decide your second-level structure before you need it — within the Clients folder, will you create a subfolder per client, or organize by date? Decide this in advance and commit to it. Changing the structure mid-stream forces you to reorganize everything that already exists.",
              "Match your folder structure to how you search, not how you create — when you need to find a file, what is the first thing you know about it: the client it belongs to, the project it is part of, or the date it was created? Build your top-level folders around the most common search trigger.",
              "Keep the structure shallow — a folder two or three levels deep is navigable. A folder five levels deep creates structure for its own sake and slows everyone down. Flat and wide is easier to navigate than deep and narrow.",
            ],
          },
        ],
      },
      {
        heading: "Phase 1 — Professional File Naming Conventions",
        blocks: [
          {
            type: "paragraph",
            text: "Professional file naming is one of the most immediately impactful habits you can build as an office assistant. A file name is the first piece of information anyone sees before opening a document. A professional name communicates everything needed to identify a file in under two seconds:",
          },
          {
            type: "list",
            items: [
              "Use the format: YYYY-MM_Description — for example, '2025-04_ClientNotes_AcmeCorp'. The date goes first so files sort chronologically in any folder view. The description follows, using underscores or hyphens between words.",
              "Never use spaces in file names — spaces in file names cause errors when files are shared across systems, uploaded to web tools, or referenced in code. Use underscores (_) or hyphens (-) instead: '2025-04_MeetingNotes' not '2025-04 Meeting Notes'.",
              "Be specific, not generic — 'Report' is not a file name. '2025-03_Q1SalesReport_Draft1' is a file name. Include enough detail that you could identify the file from the name alone, without opening it.",
              "Use version numbers when iterating — when a file goes through multiple rounds of revision, append a version number: _v1, _v2, _v3. Never save over a previous version without incrementing the number. Never name a file '_FINAL' — it will never actually be final.",
              "Apply the same convention to every file, every time — consistency is more important than perfection. A team where everyone uses the same naming convention creates a searchable, navigable archive. A team where everyone names files differently creates a permanent organizational mess.",
            ],
          },
        ],
      },
      {
        heading: "Phase 2 — Uploading Files and Assigning Correct Permissions",
        blocks: [
          {
            type: "paragraph",
            text: "Building a folder structure is step one. Populating it correctly and sharing it appropriately is step two. In a professional environment, you will frequently be asked to upload documents and grant colleagues or clients access to specific folders. Doing this correctly protects information and ensures the right people can access what they need:",
          },
          {
            type: "list",
            items: [
              "Upload files to the correct subfolder immediately — do not save to the root folder and plan to organize later. The moment a file lands in the wrong place, the system starts to break. Every file gets placed in its designated subfolder the moment it is uploaded.",
              "Rename files before uploading — apply the professional naming convention to every file before it enters the drive. Uploading 'scan0047.pdf' and renaming it later is a step that almost never happens. Name it first.",
              "Understand the three permission levels — in Google Drive and OneDrive, sharing a file or folder gives the recipient one of three access levels: Viewer (can only read, cannot edit or comment), Commenter (can add comments but cannot change content), Editor (can make changes to the file or folder contents). Match the permission level to the recipient's actual role in the document.",
              "Share folders, not individual files — when a client or colleague needs ongoing access to a category of documents, share the relevant subfolder rather than individual files. This way, every new file you add to that folder is automatically accessible to the recipient without requiring another sharing action.",
              "Never share a folder with more access than the recipient needs — if a client only needs to review a document, give them Viewer access. Giving Editor access to someone who only needed to read a file is a common and preventable mistake.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Digital Workspace Setup",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/module-1/setup-digital-workspace/digital-workspace-infographic.png",
            alt: "Setting Up Your Professional Digital Workspace — Phase 1: Folder architecture and file naming conventions. Phase 2: Uploading files and assigning sharing permissions correctly.",
            caption: "Setting Up Your Professional Digital Workspace",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never share a folder or file with an external person without confirming with your manager first. Sharing the wrong folder — or sharing with the wrong permission level — can expose confidential client data, proprietary business information, or employee records to people who should not have access. Before clicking Share, ask yourself: 'Do I have authority to share this? Does this person need Editor access, or just Viewer? Am I sharing the right folder?' When in doubt, ask before sharing.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a professional folder structure for a small business with clients, active projects, and internal operations. Include a second level of organization within each top-level folder and a recommended file naming convention for each category.\" Review the response and compare it to the structure you are about to build. Adopt any elements that improve on your original plan.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which of the following is an example of a professional file naming format?",
            options: [
              "untitled_final",
              "2024-01_ClientNotes",
              "myfolder123",
              "docnew",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build and submit a complete professional digital workspace in Google Drive or OneDrive. This is your Module 1 capstone — it must demonstrate your ability to plan a folder structure, apply naming conventions, upload files, and manage sharing permissions. Your workspace must pass all five specifications below before you submit:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a main folder called 'TOR Tech – My Workspace' and add three subfolders inside it: Clients, Internal Docs, and Projects — each subfolder must be clearly labeled and placed inside the main workspace folder, not at the root level",
          "Upload at least 3 files distributed across at least 2 of the 3 subfolders — each file must be renamed using the professional naming convention: YYYY-MM_Description (for example, 2025-04_ClientNotes_v1)",
          "Share the 'Clients' subfolder with your instructor using Viewer access — do not share the entire workspace, only the Clients subfolder, and confirm the permission level is set to View only",
          "Take a screenshot of your Google Drive (or OneDrive) showing the open workspace folder with all three subfolders visible and correctly named",
          "Write 2–3 sentences below the screenshot explaining the naming convention you used for your files and why you chose to organize the subfolders the way you did",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your screenshot along with the sharing link to your Clients subfolder (view access) and your 2–3 sentence explanation. Verify before submitting: all three subfolders are named correctly, all files follow the naming convention, and the sharing permission on the Clients folder is set to Viewer — not Editor.",
      },
    ],
  },
];
