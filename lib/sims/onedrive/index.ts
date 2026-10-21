import type { SimDefinition } from "@/types/sim";
import { onedriveModule1Sims } from "./module1";

/** Practice sims for the Microsoft OneDrive course, keyed "module-N::lesson-slug". Spread each moduleN.ts in here. */
export const onedriveCourseSims: Record<string, SimDefinition[]> = {
  ...onedriveModule1Sims,
};
