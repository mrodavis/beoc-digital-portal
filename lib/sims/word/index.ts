import type { SimDefinition } from "@/types/sim";
import { wordModule1Sims } from "./module1";
import { wordModule2Sims } from "./module2";

export const wordSims: Record<string, SimDefinition[]> = {
  ...wordModule1Sims,
  ...wordModule2Sims,
};
