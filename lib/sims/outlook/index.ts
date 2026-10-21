import type { SimDefinition } from "@/types/sim";
import { outlookModule1Sims } from "./module1";
import { outlookModule2Sims } from "./module2";
import { outlookModule3Sims } from "./module3";

/** Practice sims for the Microsoft Outlook course, keyed "module-N::lesson-slug". Spread each moduleN.ts in here. */
export const outlookCourseSims: Record<string, SimDefinition[]> = {
  ...outlookModule1Sims,
  ...outlookModule2Sims,
  ...outlookModule3Sims,
};
