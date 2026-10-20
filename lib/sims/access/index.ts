import type { SimDefinition } from "@/types/sim";
import { accessModule1Sims } from "./module1";
import { accessModule2Sims } from "./module2";
import { accessModule3Sims } from "./module3";
import { accessModule4Sims } from "./module4";

/** ms-office/access sims. Keys are "<moduleSlug>::<lessonSlug>". */
export const accessSims: Record<string, SimDefinition[]> = {
  ...accessModule1Sims,
  ...accessModule2Sims,
  ...accessModule3Sims,
  ...accessModule4Sims,
};
