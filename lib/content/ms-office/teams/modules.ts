import { Lesson } from "@/types/lesson";
import { teamsModule1Lessons } from "./module1Lessons";
import { teamsModule2Lessons } from "./module2Lessons";
import { teamsModule3Lessons } from "./module3Lessons";
import { teamsModule4Lessons } from "./module4Lessons";

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
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Teams and Channels",
    emoji: "👥",
    description: "Join a team, post and reply in channels, make announcements, set channel notifications, and use the Shared tab and channel tabs.",
    lessons: teamsModule3Lessons,
    level: "Beginner",
    estimatedMinutes: 50,
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Files and Collaboration",
    emoji: "📁",
    description: "Where Teams stores files, sharing with the right people and permissions, and co-authoring one shared file with comments.",
    lessons: teamsModule4Lessons,
    level: "Intermediate",
    estimatedMinutes: 50,
  },
];
