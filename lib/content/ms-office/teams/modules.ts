import { Lesson } from "@/types/lesson";

export type TeamsModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
};

/** Microsoft Teams course modules (being written). Module N's lessons live in moduleNLessons.ts. */
export const teamsModules: TeamsModule[] = [];
