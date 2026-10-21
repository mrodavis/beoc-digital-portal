import type { SimDefinition } from "@/types/sim";
import { onedriveModule1Sims } from "./module1";
import { onedriveModule2Sims } from "./module2";
import { onedriveModule3Sims } from "./module3";
import { onedriveModule4Sims } from "./module4";
import { onedriveModule5Sims } from "./module5";
import { onedriveModule6Sims } from "./module6";

/** Practice sims for the Microsoft OneDrive course, keyed "module-N::lesson-slug". Spread each moduleN.ts in here. */
export const onedriveCourseSims: Record<string, SimDefinition[]> = {
  ...onedriveModule1Sims,
  ...onedriveModule2Sims,
  ...onedriveModule3Sims,
  ...onedriveModule4Sims,
  ...onedriveModule5Sims,
  ...onedriveModule6Sims,
};
