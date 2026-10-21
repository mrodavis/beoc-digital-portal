import { Lesson } from "@/types/lesson";
import { outlookModule1Lessons } from "./module1Lessons";

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
];
