import type { SimDefinition } from "@/types/sim";
import { teamsModule1Sims } from "./module1";
import { teamsModule2Sims } from "./module2";
import { teamsModule3Sims } from "./module3";
import { teamsModule4Sims } from "./module4";
import { teamsModule5Sims } from "./module5";
import { teamsModule6Sims } from "./module6";

/** Practice sims for the Microsoft Teams course, keyed "module-N::lesson-slug". Spread each moduleN.ts in here. */
export const teamsCourseSims: Record<string, SimDefinition[]> = {
  ...teamsModule1Sims,
  ...teamsModule2Sims,
  ...teamsModule3Sims,
  ...teamsModule4Sims,
  ...teamsModule5Sims,
  ...teamsModule6Sims,
};
