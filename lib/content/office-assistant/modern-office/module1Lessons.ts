import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "what-is-a-modern-office",
    title: "What is a Modern Office?",
    description:
      "Understand how modern workplaces operate using digital systems and tools.",
    duration: "15 min",

    sections: [
      {
        heading: "Why This Matters",
        blocks: [
          {
            type: "paragraph",
            text: "Modern offices run on digital systems. If you understand how these systems work together, you can operate effectively in almost any workplace.",
          },
        ],
      },
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You just started your first day at TOR Tech. Your manager expects you to navigate emails, access shared files, and assist with scheduling meetings. You quickly realize everything is digital.",
          },
        ],
      },
      {
        heading: "Core Idea",
        blocks: [
          {
            type: "paragraph",
            text: "A modern office operates through connected systems: email, cloud storage, documents, and scheduling tools.",
          },
          {
            type: "list",
            items: [
              "Email replaces memos and phone tag",
              "Cloud storage replaces filing cabinets",
              "Digital calendars replace paper planners",
              "Collaboration tools replace in-person-only meetings",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"What are the most important digital tools for an office assistant in 2024?\" Review the response and note which tools you already recognize.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Think about a workplace you have visited or worked in. Write 3–5 sentences describing how digital tools were used there. If you have never worked in an office, describe how you would expect a modern office to operate based on what you learned.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Share your response with your instructor or post it in your course folder.",
      },
    ],
  },

  {
    slug: "core-office-tools",
    title: "Core Office Tools",
    description:
      "Learn the essential tools used in every modern office environment.",
    duration: "20 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your manager at TOR Tech asks you to send a meeting invite, share a document, and update a spreadsheet — all before lunch. Knowing which tool to use for each task is the difference between confidence and confusion.",
          },
        ],
      },
      {
        heading: "Essential Systems",
        blocks: [
          {
            type: "paragraph",
            text: "Every modern office relies on the same core set of tools. Learn these and you can work in almost any environment:",
          },
          {
            type: "list",
            items: [
              "Email (Gmail / Outlook) — communication",
              "Cloud Storage (Google Drive / OneDrive) — file management",
              "Documents (Google Docs / Microsoft Word) — writing and reports",
              "Spreadsheets (Google Sheets / Excel) — data and tracking",
              "Presentations (Slides / PowerPoint) — meetings and pitches",
              "Calendar & Scheduling — appointments and deadlines",
            ],
          },
        ],
      },
      {
        heading: "Why These Matter",
        blocks: [
          {
            type: "paragraph",
            text: "These tools allow teams to communicate, organize, and execute work without being in the same room. Mastering them makes you immediately useful to any employer.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Compare Google Workspace and Microsoft 365. Which is better for a small business?\" Use the answer to understand which tools you may encounter on the job.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Match each task to the correct tool: (1) Sending a project update to your team, (2) Tracking client names and phone numbers, (3) Presenting quarterly results, (4) Storing a signed contract.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Email",
          "Spreadsheet",
          "Presentation",
          "Cloud Storage",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your completed match exercise to your instructor.",
      },
    ],
  },

  {
    slug: "ai-in-the-workplace",
    title: "Using AI in the Workplace",
    description:
      "Learn how AI tools can support your daily tasks and increase productivity.",
    duration: "15 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at TOR Tech asks you to draft a professional email to reschedule a client meeting. You have 10 minutes. Instead of staring at a blank screen, you open ChatGPT and get a polished draft in 30 seconds.",
          },
        ],
      },
      {
        heading: "AI as Your Assistant",
        blocks: [
          {
            type: "paragraph",
            text: "AI tools can help you complete tasks faster and with more confidence. They are not a replacement for your skills — they amplify them.",
          },
          {
            type: "list",
            items: [
              "Draft and refine professional emails",
              "Summarize long documents quickly",
              "Generate ideas for reports or presentations",
              "Organize and structure information",
              "Answer workplace questions instantly",
            ],
          },
        ],
      },
      {
        heading: "Using AI Responsibly",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Always review AI output before sending or submitting. AI can make mistakes. Your judgment, accuracy, and professionalism are still your responsibility.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Write a professional email confirming a meeting with a client for next Tuesday at 2pm.\" Edit the result so it sounds like you.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Use ChatGPT to draft a professional email for the following situation: Your supervisor asked you to notify the team that Friday's all-hands meeting has been moved from 10am to 2pm.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the email you drafted (after editing it yourself) to your course folder or instructor.",
      },
    ],
  },

  {
    slug: "setup-digital-workspace",
    title: "Hands-On: Set Up Your Digital Workspace",
    description:
      "Create and organize your own digital office system from scratch.",
    duration: "30 min",

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is your first week at TOR Tech. Your manager tells you: \"Get yourself set up digitally — I need you ready to receive, organize, and share files by end of day.\" This lesson is that moment.",
          },
        ],
      },
      {
        heading: "Your Task",
        blocks: [
          {
            type: "paragraph",
            text: "Build your digital workspace in Google Drive (or OneDrive). Follow these steps in order:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Create a main folder called \"TOR Tech – My Workspace\"",
              "Add three subfolders inside it: Clients, Internal Docs, Projects",
              "Upload at least 2 files (can be documents, PDFs, or images)",
              "Rename each file using a professional naming format: Date_Description (e.g., 2024-01_ClientNotes)",
              "Share the \"Clients\" subfolder with your instructor (view access)",
            ],
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — \"Create a professional folder structure for a small business with clients, projects, and internal operations.\" Use the response as inspiration to improve your own setup.",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Once your workspace is set up, take a screenshot of your Google Drive (or OneDrive) showing the folder structure you created.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your screenshot to your instructor. Make sure all folders are visible and named professionally.",
      },
    ],
  },
];
