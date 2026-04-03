import { Lesson } from "@/types/lesson";

export const module8Lessons: Lesson[] = [
  {
    slug: "simulation-overview",
    title: "The Final Simulation Overview",
    description:
      "Get oriented for the TOR Tech Final Simulation — understand the structure, expectations, and how you will be evaluated.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Congratulations — you have been hired as the Office Assistant at TOR Tech. This is your first real week on the job. Every task you complete, every communication you send, and every decision you make this week will be observed and evaluated by your manager. Welcome to the simulation.",
          },
        ],
      },
      {
        heading: "What the Simulation Involves",
        blocks: [
          {
            type: "paragraph",
            text: "The Final Simulation is not a test with right and wrong answers — it is a performance. You will be evaluated on whether you can apply what you have learned across all 7 modules in a realistic, connected workplace context.",
          },
          {
            type: "list",
            items: [
              "4 interconnected challenges that draw on skills from every module — digital workspace, communication, documents, scheduling, task management, CRM, and AI tools",
              "Each challenge builds on the previous one — your decisions and outputs carry forward through the week",
              "Your manager (your instructor) expects professionalism: correct formatting, accurate details, and timely delivery",
              "Evaluation criteria: accuracy, completeness, professional presentation, and evidence of AI-assisted workflow where appropriate",
              "How to approach it: treat every task as if a real client or supervisor will read it — because in this simulation, they will",
              "Ask for help the right way — if you are unsure about a task, draft a professional question to your manager rather than guessing or skipping it",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"I'm starting a new job as an office assistant. What are the top 10 things I should do in my first week to make a great impression?\" Review the list and think about which items apply to your approach in this simulation.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "How should you approach every task in the TOR Tech Final Simulation?",
            options: [
              "As a practice exercise where errors are acceptable",
              "By completing tasks as quickly as possible to show efficiency",
              "As if a real client or supervisor will read and evaluate every output",
              "By using AI for every task without reviewing the results",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Write a brief personal plan for how you will approach your first week at TOR Tech in the simulation. Use 5–7 bullet points. Address: what you will prioritize each day, which tools you plan to use, how you will stay organized, and one habit you will commit to maintaining throughout the week.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your personal first-week plan to your instructor or course folder before beginning the simulation challenges.",
      },
    ],
  },

  {
    slug: "multi-tool-challenge",
    title: "Multi-Tool Integration Challenge",
    description:
      "Complete a full Monday morning task list using scheduling, email, spreadsheet, and CRM skills — all at once.",
    duration: "30 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is Monday morning at TOR Tech. Your manager drops a task list on your desk at 8:30am: schedule 2 client meetings, send 3 emails, update the client tracker, and log a phone call in the CRM. Everything needs to be done before noon. The clock is running.",
          },
        ],
      },
      {
        heading: "Integrated Workflow: Four Tools, One Morning",
        blocks: [
          {
            type: "paragraph",
            text: "This challenge integrates skills from four separate modules into a single, realistic workflow. In a real office, you will rarely use just one tool at a time — you need to move between systems quickly and accurately.",
          },
          {
            type: "list",
            items: [
              "Scheduling (Module 4): send 2 meeting invites via calendar — include subject, attendees, date/time, location or video link, and a brief agenda",
              "Email (Module 2): send 3 professional emails — one to a client, one to a teammate, one to your manager. Each must have a clear subject line, correct greeting, and professional closing",
              "Spreadsheet (Module 3): open the client tracker and update at least 2 rows with new information — status change, contact update, or next action date",
              "CRM logging (Module 6): log a phone call interaction in the system — include date, client name, call summary, and next step",
              "Prioritization matters: complete the most time-sensitive task first — which of these four cannot wait?",
              "Accuracy over speed: a fast, sloppy calendar invite creates more work than it saves. Take the extra 60 seconds to get it right.",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Help me prioritize and plan this morning task list for an office assistant: schedule 2 meetings, send 3 emails, update a client tracker, and log a CRM entry. What order should I do them in and why?\" Use the suggested order as a starting point, then adjust based on your own context.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "When completing a multi-tool task list at work, what should you prioritize above speed?",
            options: [
              "Completing tasks in the order they were assigned",
              "Delegating as many tasks as possible to teammates",
              "Finishing the easiest tasks first to build momentum",
              "Accuracy and completeness in every output",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete all 4 tasks using real or fictional TOR Tech data: (1) create 2 calendar meeting invites, (2) draft and 'send' 3 professional emails, (3) update a client tracker with new data, (4) log one phone call interaction in a CRM log or mock CRM table. Use made-up but realistic names, dates, and details.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit evidence of all 4 completed tasks — screenshots, written outputs, or a summary document — to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "professional-portfolio",
    title: "Building Your Professional Portfolio",
    description:
      "Curate, organize, and present your best work from this course in a professional digital portfolio folder.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Before your final evaluation at TOR Tech, your manager stops by and says: \"I'd like to see examples of the work you have done over the past few weeks. Pull together your best pieces — documents, emails, trackers, whatever shows what you can do.\" This is your portfolio moment.",
          },
        ],
      },
      {
        heading: "What Belongs in a Professional Portfolio",
        blocks: [
          {
            type: "paragraph",
            text: "A portfolio is not just a collection of files — it is a curated presentation of your best work. For an office assistant, it shows employers that you can produce professional output across a range of real tasks.",
          },
          {
            type: "list",
            items: [
              "Sample documents: reports, memos, or formatted Word/Google Docs you created during the course",
              "Professional emails: polished email drafts that demonstrate your written communication skills",
              "Spreadsheets and trackers: client trackers, task lists, or any data organized in a clean, functional spreadsheet",
              "Schedules and calendar exports: evidence that you can manage scheduling professionally",
              "CRM logs: screenshots or exports of interaction logs showing your ability to maintain client records",
              "AI-assisted work samples: a before-and-after showing your original AI draft and your edited final version",
              "How to organize it in Google Drive or OneDrive: create one main folder named 'Office Assistant Portfolio — [Your Name]', then subfolders by category (Documents, Emails, Spreadsheets, etc.)",
              "File naming format: use professional names like '2024-04_ClientFollowUpEmail' or '2024-04_ClientTrackerV2' — never 'untitled' or 'draft1'",
              "Why a portfolio matters for job applications: it transforms 'I know how to do this' into 'here is proof that I can'",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What should an office assistant include in a professional portfolio when applying for jobs? Give me a structured list.\" Compare the response to the list in this lesson and identify anything you might have missed.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "What is the main advantage of having a professional portfolio when applying for office assistant roles?",
            options: [
              "It replaces the need for a resume or cover letter",
              "It guarantees you will receive a job offer",
              "It shows employers proof of real skills rather than just claiming to have them",
              "It allows you to skip the interview process entirely",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Create a professional portfolio folder in Google Drive or OneDrive. Include at least 5 work samples from this course — one from each of at least 3 different categories (documents, emails, spreadsheets, CRM logs, schedules, or AI work samples). Name every file professionally using the recommended naming format. Organize subfolders by category.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Share the portfolio folder link (with view access) or submit a screenshot of the organized folder structure showing all files and subfolders to your instructor.",
      },
    ],
  },

  {
    slug: "capstone-simulation",
    title: "Capstone: Complete the Office Simulation",
    description:
      "Complete the comprehensive final simulation that integrates every skill from this course — this is your proof that you are job ready.",
    duration: "40 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "This is your final day in the TOR Tech simulation. Your manager has handed you one last full-day task list — and it covers everything. Workspace, communication, documents, scheduling, task management, CRM, and AI assistance. Complete it with the same professionalism you would bring to a real job. When you are done, you are job ready.",
          },
        ],
      },
      {
        heading: "The Full Capstone Task",
        blocks: [
          {
            type: "paragraph",
            text: "This capstone integrates all skills from Modules 1 through 7 into a single comprehensive deliverable. Your instructor may provide a specific task list, or you may follow the self-guided version below.",
          },
          {
            type: "list",
            items: [
              "Digital workspace (Module 1): confirm your Google Drive or OneDrive workspace is organized and ready — all folders named, all prior work filed correctly",
              "Professional communication (Module 2): draft 2 polished emails — one internal team update and one external client communication",
              "Document creation (Module 3 / Module 5): produce 1 formatted summary document — could be a meeting recap, a project status update, or a client brief",
              "Scheduling (Module 4): schedule 3 meetings — include full details, an agenda for each, and confirmation that no time conflicts exist",
              "Task management (Module 5): build or update a task tracker showing all open items, owners, and due dates for this week",
              "CRM logging (Module 6): log 2 client interactions in a CRM table or log — include all required fields for each entry",
              "AI assistance (Module 7): use an AI tool to assist with at least 2 of the above tasks — document your prompt and your edited output",
              "Portfolio update: add all new capstone outputs to your professional portfolio folder",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Act as my office manager. Give me a realistic full-day task list for a junior office assistant at a mid-size company on a Tuesday. Include morning priorities, afternoon tasks, and one end-of-day wrap-up action.\" Use the output as a reference framework to plan your own capstone approach.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "When using AI to assist with a capstone task, what must you document as part of your submission?",
            options: [
              "The AI tool's brand logo and website URL",
              "The total number of words the AI generated",
              "A disclaimer confirming no AI was used",
              "Your prompt and your edited final output",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the full capstone task list — either the version your instructor provides or the self-guided version from this lesson. Every output must be professional, accurate, and clearly labeled. When all tasks are complete, add everything to your portfolio folder and prepare to submit your final work.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your complete capstone portfolio — all emails, documents, schedules, task tracker, CRM logs, and AI-assisted work samples — to your instructor. This is your graduation from the Office Assistant Professional program.",
      },
    ],
  },
];
