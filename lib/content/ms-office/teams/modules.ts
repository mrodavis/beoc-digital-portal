import { Lesson } from "@/types/lesson";
import { teamsModule1Lessons } from "./module1Lessons";
import { teamsModule2Lessons } from "./module2Lessons";

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
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Chat",
    emoji: "🗨️",
    description: "One-on-one and group chats, clear messages with formatting and @mentions, reactions and replies, and sharing files safely.",
    lessons: teamsModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 70,
  },
];
