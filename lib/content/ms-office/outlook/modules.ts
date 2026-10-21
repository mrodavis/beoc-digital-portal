import { Lesson } from "@/types/lesson";
import { outlookModule1Lessons } from "./module1Lessons";
import { outlookModule2Lessons } from "./module2Lessons";
import { outlookModule3Lessons } from "./module3Lessons";

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

/** Microsoft Outlook course modules (being written). Module N's lessons live in moduleNLessons.ts. */
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
];
