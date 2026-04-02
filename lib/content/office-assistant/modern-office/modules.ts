import { Lesson } from "@/types/lesson";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";
import { module6Lessons } from "./module6Lessons";
import { module7Lessons } from "./module7Lessons";
import { module8Lessons } from "./module8Lessons";

export type ModernOfficeModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
  whatYoullLearn: string[];
  scenario: string;
};

export const modernOfficeModules: ModernOfficeModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Digital Office Foundations",
    emoji: "🏢",
    description:
      "Understand how modern offices operate using digital systems and tools like email, cloud storage, and scheduling platforms.",
    lessons: module1Lessons,
    level: "Beginner",
    estimatedMinutes: 80,
    whatYoullLearn: [
      "How modern offices actually operate",
      "The core tools used in every workplace",
      "How to set up your own digital workspace",
      "How AI can assist your daily work",
    ],
    scenario:
      "You just got hired as an office assistant at TOR Tech. Your manager asks you to organize company files, respond to emails, and prepare documents. This module teaches you how to do exactly that.",
  },

  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Communication Systems",
    emoji: "📧",
    description:
      "Master professional email writing, workplace chat tools, and video meeting etiquette for the modern office.",
    lessons: module2Lessons,
    level: "Beginner",
    estimatedMinutes: 85,
    whatYoullLearn: [
      "How to write clear, professional emails",
      "Workplace chat etiquette on Slack and Teams",
      "How to run and participate in video meetings",
      "How to manage and organize a busy inbox",
    ],
    scenario:
      "It's your second week at TOR Tech. Your manager needs you to handle all incoming emails, join a client call, and keep the team updated in Teams. Communication is now your job.",
  },

  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Document & Data Workflows",
    emoji: "📄",
    description:
      "Create professional documents, use templates effectively, and manage data in spreadsheets for daily office operations.",
    lessons: module3Lessons,
    level: "Beginner",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "How to create and format professional documents",
      "How to use templates to maintain consistency",
      "Spreadsheet basics for tracking office data",
      "How to build a functional office tracking sheet",
    ],
    scenario:
      "TOR Tech needs a client summary document by Friday and a supply tracker by Monday. You're the one building both. This module shows you exactly how.",
  },

  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Scheduling & Meetings",
    emoji: "📅",
    description:
      "Manage digital calendars, book professional meetings, resolve scheduling conflicts, and coordinate a full office week.",
    lessons: module4Lessons,
    level: "Beginner",
    estimatedMinutes: 85,
    whatYoullLearn: [
      "How to use and manage a shared digital calendar",
      "How to book meetings professionally and efficiently",
      "How to resolve scheduling conflicts with confidence",
      "How to coordinate a full week of office meetings",
    ],
    scenario:
      "Your manager at TOR Tech is unavailable this week. You're responsible for every meeting on the calendar — booking, rescheduling, and making sure nothing falls through.",
  },

  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "Task & Project Management",
    emoji: "✅",
    description:
      "Use task management tools, prioritize work effectively, track deadlines, and keep projects organized across a team.",
    lessons: module5Lessons,
    level: "Intermediate",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "How to use tools like Trello and Asana for task tracking",
      "How to prioritize work using proven frameworks",
      "How to track deadlines and flag risks proactively",
      "How to build a project tracker used by a real team",
    ],
    scenario:
      "TOR Tech has 3 active projects running simultaneously and no one knows who's doing what. Your manager hands you the task board and says: 'Fix this.'",
  },

  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "CRM & Office Systems",
    emoji: "👥",
    description:
      "Learn how CRM systems work, manage client records, log interactions, and maintain professional follow-up communication.",
    lessons: module6Lessons,
    level: "Intermediate",
    estimatedMinutes: 85,
    whatYoullLearn: [
      "What a CRM is and why offices use it",
      "How to create and maintain accurate client records",
      "How to log client interactions professionally",
      "How to write effective follow-up communications",
    ],
    scenario:
      "TOR Tech's biggest client says they feel 'out of the loop.' Your manager asks you to audit all recent interactions and make sure every touchpoint is logged and followed up.",
  },

  {
    moduleNumber: 7,
    moduleSlug: "module-7",
    title: "AI Productivity",
    emoji: "🤖",
    description:
      "Learn how to use AI tools to write faster, automate repetitive tasks, and build a personal AI workflow for the modern office.",
    lessons: module7Lessons,
    level: "Intermediate",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "Which AI tools are most useful for office assistants",
      "How to automate repetitive daily tasks",
      "How to use AI for writing, research, and summaries",
      "How to build a personal AI workflow you'll actually use",
    ],
    scenario:
      "Your manager at TOR Tech challenges you: 'Using only AI tools, complete your Monday morning task list in half the time.' This module shows you how to win that challenge.",
  },

  {
    moduleNumber: 8,
    moduleSlug: "module-8",
    title: "Final Simulation",
    emoji: "🏆",
    description:
      "Apply all your skills in a realistic office simulation — scheduling, communication, documents, CRM, and AI — and build your professional portfolio.",
    lessons: module8Lessons,
    level: "Advanced",
    estimatedMinutes: 120,
    whatYoullLearn: [
      "How to manage a full day of office responsibilities",
      "How to integrate multiple digital tools in one workflow",
      "How to build and present a professional work portfolio",
      "How to demonstrate job-readiness to an employer",
    ],
    scenario:
      "This is it. You are the Office Assistant at TOR Tech. Over the next four lessons, you will complete a full simulated work week using every skill you've built in this program.",
  },
];
