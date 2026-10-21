import type { SimDefinition } from "@/types/sim";
import { outlookModule1Sims } from "./module1";
import { outlookModule2Sims } from "./module2";
import { outlookModule3Sims } from "./module3";
import { outlookModule4Sims } from "./module4";
import { outlookModule5Sims } from "./module5";
import { outlookModule6Sims } from "./module6";

/** Practice sims for the Microsoft Outlook course, keyed "module-N::lesson-slug". Spread each moduleN.ts in here. */
export const outlookCourseSims: Record<string, SimDefinition[]> = {
  ...outlookModule1Sims,
  ...outlookModule2Sims,
  ...outlookModule3Sims,
  ...outlookModule4Sims,
  ...outlookModule5Sims,
  ...outlookModule6Sims,
};
