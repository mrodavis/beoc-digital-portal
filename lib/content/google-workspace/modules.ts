import { Lesson } from "@/types/lesson";
import { coreModules } from "./core-modules";
import { mailModules } from "./mail-modules";

/**
 * Google Workspace course (/learning-paths/google-workspace, course id
 * "google-workspace", sims keyed "module-N::lesson-slug").
 *
 * Two files feed it so two authors can work at once:
 *   core-modules.ts  modules 1-4: Getting Started, Google Drive, Google Docs, Google Sheets
 *   mail-modules.ts  modules 5-8: Google Slides, Gmail, Google Calendar & Meet, Working Together
 */
export type GoogleWorkspaceModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
  whatYoullLearn: string[];
  scenario: string;
};

export const googleWorkspaceModules: GoogleWorkspaceModule[] = [...coreModules, ...mailModules].sort(
  (a, b) => a.moduleNumber - b.moduleNumber,
);
