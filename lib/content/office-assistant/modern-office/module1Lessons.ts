import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "what-is-a-modern-office",
    title: "What is a Modern Office?",
    description:
      "Understand how today's workplaces operate using digital systems and tools.",
    duration: "15 min",

    sections: [
      {
        heading: "The Modern Office System",
        blocks: [
          {
            type: "paragraph",
            text:
              "Modern offices no longer rely on paper and physical storage. Instead, they operate through interconnected digital systems such as email, cloud storage, and scheduling platforms.",
          },
          {
            type: "paragraph",
            text:
              "As an office assistant, your role is to manage and operate these systems efficiently.",
          },
        ],
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
        heading: "Key Systems",
        blocks: [
          {
            type: "paragraph",
            text:
              "Every modern office uses a set of core tools to function effectively:",
          },
          {
            type: "list",
            items: [
              "Email (Gmail / Outlook)",
              "Cloud Storage (Google Drive / OneDrive)",
              "Documents (Docs / Word)",
              "Spreadsheets (Sheets / Excel)",
              "Presentations (Slides / PowerPoint)",
              "Calendar & Scheduling",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "introduction-to-ai",
    title: "Introduction to AI in the Workplace",
    description:
      "Understand how AI tools can assist you in daily office tasks.",
    duration: "15 min",

    sections: [
      {
        heading: "AI as Your Assistant",
        blocks: [
          {
            type: "paragraph",
            text:
              "Artificial Intelligence (AI) tools can help you write emails, organize information, summarize documents, and generate reports.",
          },
          {
            type: "paragraph",
            text:
              "In this course, you will learn how to use AI responsibly to improve your productivity.",
          },
        ],
      },
    ],
  },

  {
    slug: "hands-on-office-setup",
    title: "Hands-On: Setting Up Your Digital Workspace",
    description:
      "Create your own structured digital office environment.",
    duration: "30 min",

    sections: [
      {
        heading: "Activity",
        blocks: [
          {
            type: "paragraph",
            text:
              "Create a folder in Google Drive called 'TOR Tech – My Workspace'.",
          },
          {
            type: "list",
            items: [
              "Create subfolders: Clients, Internal Docs, Projects",
              "Upload at least 2 files",
              "Rename files professionally",
              "Share a folder with your instructor",
            ],
          },
        ],
      },
    ],
  },
];