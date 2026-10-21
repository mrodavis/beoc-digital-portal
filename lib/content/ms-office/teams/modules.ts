import { Lesson } from "@/types/lesson";
import { teamsModule1Lessons } from "./module1Lessons";

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

/** Microsoft Teams course modules. Module N's lessons live in moduleNLessons.ts; its sims in lib/sims/teams/moduleN.ts. */
export const teamsModules: TeamsModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Getting Started with Teams",
    emoji: "💬",
    description: "What Teams is for, the parts of the window, your status, and notifications that work for you instead of against you.",
    lessons: teamsModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 60,
  },
];
