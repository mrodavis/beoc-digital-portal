import type { SimDefinition } from "@/types/sim";
import { teamsModule1Sims } from "./module1";
import { teamsModule2Sims } from "./module2";

/** Practice sims for the Microsoft Teams course, keyed "module-N::lesson-slug". Spread each moduleN.ts in here. */
export const teamsCourseSims: Record<string, SimDefinition[]> = {
  ...teamsModule1Sims,
  ...teamsModule2Sims,
};
