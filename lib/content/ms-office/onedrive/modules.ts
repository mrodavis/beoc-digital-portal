import { Lesson } from "@/types/lesson";

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

/** Microsoft OneDrive course modules (being written). Module N's lessons live in moduleNLessons.ts. */
export const onedriveModules: OneDriveModule[] = [];
