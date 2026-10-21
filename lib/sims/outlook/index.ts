import type { SimDefinition } from "@/types/sim";
import { outlookModule1Sims } from "./module1";

/** Practice sims for the Microsoft Outlook course, keyed "module-N::lesson-slug". Spread each moduleN.ts in here. */
export const outlookCourseSims: Record<string, SimDefinition[]> = {
  ...outlookModule1Sims,
};
