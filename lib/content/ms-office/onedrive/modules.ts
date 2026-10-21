import { Lesson } from "@/types/lesson";
import { onedriveModule1Lessons } from "./module1Lessons";

export type OneDriveModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
};

/** Microsoft OneDrive course modules. Module N's lessons live in moduleNLessons.ts. */
export const onedriveModules: OneDriveModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Getting Started with OneDrive",
    emoji: "☁️",
    description: "What OneDrive is, signing in, finding your way around OneDrive on the web, and work versus personal accounts.",
    lessons: onedriveModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 45,
  },
];
