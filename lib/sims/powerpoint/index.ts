import type { SimDefinition } from "@/types/sim";
import { pptModule1Sims } from "./module1";
import { pptModule2Sims } from "./module2";
import { pptModule3Sims } from "./module3";
import { pptModule4Sims } from "./module4";
import { pptModule5Sims } from "./module5";
import { pptModule6Sims } from "./module6";
import { pptModule7Sims } from "./module7";
import { pptModule8Sims } from "./module8";

export const pptSims: Record<string, SimDefinition[]> = {
  ...pptModule1Sims,
  ...pptModule2Sims,
  ...pptModule3Sims,
  ...pptModule4Sims,
  ...pptModule5Sims,
  ...pptModule6Sims,
  ...pptModule7Sims,
  ...pptModule8Sims,
};
