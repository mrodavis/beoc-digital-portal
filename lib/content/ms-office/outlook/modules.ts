import { Lesson } from "@/types/lesson";
import { outlookModule1Lessons } from "./module1Lessons";
import { outlookModule2Lessons } from "./module2Lessons";
import { outlookModule3Lessons } from "./module3Lessons";
import { outlookModule4Lessons } from "./module4Lessons";
import { outlookModule5Lessons } from "./module5Lessons";
import { outlookModule6Lessons } from "./module6Lessons";

export type OutlookModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
};

/** Microsoft Outlook course modules. Module N's lessons live in moduleNLessons.ts. */
export const outlookModules: OutlookModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Getting Started with Outlook",
    emoji: "📧",
    description: "Which Outlook you are using, how the new Outlook window is laid out, and reading and managing messages.",
    lessons: outlookModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 45,
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Writing Professional Email",
    emoji: "✍️",
    description: "Addressing and structuring messages, replying and forwarding, attachments and cloud links, signatures, and Schedule send, Undo send and recall.",
    lessons: outlookModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 80,
  },
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Organizing Your Inbox",
    emoji: "🗂️",
    description: "Folders and Favorites, categories, flags, pins and snooze, rules and Sweep, search and filters, quick steps and Focused Inbox.",
    lessons: outlookModule3Lessons,
    level: "Intermediate",
    estimatedMinutes: 80,
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Calendar and Meetings",
    emoji: "📅",
    description: "Calendar views, events and reminders, answering invitations, the Scheduling Assistant, recurring and Teams meetings, calendar sharing, delegates and time zones.",
    lessons: outlookModule4Lessons,
    level: "Intermediate",
    estimatedMinutes: 65,
  },
  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "People and To Do",
    emoji: "👥",
    description: "Contacts and contact lists in People, and To Do with due dates, importance, My Day and the Flagged email list.",
    lessons: outlookModule5Lessons,
    level: "Intermediate",
    estimatedMinutes: 42,
  },
  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "Working Smarter and Safely",
    emoji: "🛡️",
    description: "Automatic replies, shared mailboxes, phishing and junk email, sensitivity labels, encryption and accessible messages, and Copilot and Outlook on other devices.",
    lessons: outlookModule6Lessons,
    level: "Intermediate",
    estimatedMinutes: 71,
  },
];
