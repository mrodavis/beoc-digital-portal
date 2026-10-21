import { Lesson } from "@/types/lesson";

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
export const outlookModules: OutlookModule[] = [];
