import type { SimDefinition } from "@/types/sim";
import { wordSims } from "./word";
import { excelSims } from "./excel";
import { pptSims } from "./powerpoint";
import { accessSims } from "./access";
import { outlookCourseSims } from "./outlook";
import { teamsCourseSims } from "./teams";
import { onedriveCourseSims } from "./onedrive";
import { ehrSims } from "./ehr";
import { sims as techFoundationsSims } from "./oap/tech-foundations";
import { sims as officeAppsSims } from "./oap/office-apps";
import { sims as modernOfficeSims } from "./oap/modern-office";
import { sims as introDatabaseSims } from "./oap/intro-database";

/**
 * Practice simulations by course, keyed `${courseId}::${moduleSlug}::${lessonSlug}`
 * (courseId as the lesson routes pass it, e.g. "ms-office/word").
 */
export const REGISTRY: Record<string, Record<string, SimDefinition[]>> = {
  "ms-office/word": wordSims,
  "ms-office/excel": excelSims,
  "ms-office/powerpoint": pptSims,
  "ms-office/access": accessSims,
  "ms-office/outlook": outlookCourseSims,
  "ms-office/teams": teamsCourseSims,
  "ms-office/onedrive": onedriveCourseSims,
  "oap/tech-foundations": techFoundationsSims,
  "oap/office-apps": officeAppsSims,
  "oap/modern-office": modernOfficeSims,
  "oap/intro-database": introDatabaseSims,
  "ehr/intro-to-ehr": ehrSims,
};

export function simsFor(courseId: string, lessonId: string): SimDefinition[] {
  return REGISTRY[courseId]?.[lessonId] ?? [];
}

export function simCount(courseId?: string): number {
  const sets = courseId ? [REGISTRY[courseId] ?? {}] : Object.values(REGISTRY);
  return sets.reduce((n, s) => n + Object.values(s).reduce((m, a) => m + a.length, 0), 0);
}
