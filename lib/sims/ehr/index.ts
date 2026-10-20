import type { SimDefinition } from "@/types/sim";
import { ehrModule1Sims } from "./module1";
import { ehrModule2Sims } from "./module2";
import { ehrModule3Sims } from "./module3";
import { ehrModule4Sims } from "./module4";
import { ehrModule5Sims } from "./module5";
import { ehrModule6Sims } from "./module6";
import { ehrModule7Sims } from "./module7";
import { ehrModule8Sims } from "./module8";
import { ehrModule9Sims } from "./module9";

/** ehr/intro-to-ehr sims. Keys are "<moduleSlug>::<lessonSlug>". */
export const ehrSims: Record<string, SimDefinition[]> = {
  ...ehrModule1Sims,
  ...ehrModule2Sims,
  ...ehrModule3Sims,
  ...ehrModule4Sims,
  ...ehrModule5Sims,
  ...ehrModule6Sims,
  ...ehrModule7Sims,
  ...ehrModule8Sims,
  ...ehrModule9Sims,
};
