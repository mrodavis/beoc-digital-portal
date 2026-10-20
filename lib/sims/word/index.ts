import type { SimDefinition } from "@/types/sim";
import { wordModule1Sims } from "./module1";
import { wordModule2Sims } from "./module2";
import { wordModule3Sims } from "./module3";
import { wordModule4Sims } from "./module4";
import { wordModule5Sims } from "./module5";
import { wordModule6Sims } from "./module6";
import { wordModule7Sims } from "./module7";
import { wordModule8Sims } from "./module8";

export const wordSims: Record<string, SimDefinition[]> = {
  ...wordModule1Sims,
  ...wordModule2Sims,
  ...wordModule3Sims,
  ...wordModule4Sims,
  ...wordModule5Sims,
  ...wordModule6Sims,
  ...wordModule7Sims,
  ...wordModule8Sims,
};
