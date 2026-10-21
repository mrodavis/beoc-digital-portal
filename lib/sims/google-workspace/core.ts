import type { SimDefinition } from "@/types/sim";
import { gwModule1Sims } from "./core-m1";
import { gwModule2Sims } from "./core-m2";
import { gwModule3Sims } from "./core-m3";
import { gwModule4Sims } from "./core-m4";

/** Sims for Google Workspace modules 1-4, keyed "module-N::lesson-slug". */
export const gwCoreSims: Record<string, SimDefinition[]> = {
  ...gwModule1Sims,
  ...gwModule2Sims,
  ...gwModule3Sims,
  ...gwModule4Sims,
};
