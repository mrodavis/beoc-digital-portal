import type { SimDefinition } from "@/types/sim";
import { excelModule1Sims } from "./module1";
import { excelModule2Sims } from "./module2";
import { excelModule3Sims } from "./module3";
import { excelModule4Sims } from "./module4";
import { excelModule5Sims } from "./module5";
import { excelModule6Sims } from "./module6";
import { excelModule7Sims } from "./module7";
import { excelModule8Sims } from "./module8";

export const excelSims: Record<string, SimDefinition[]> = {
  ...excelModule1Sims,
  ...excelModule2Sims,
  ...excelModule3Sims,
  ...excelModule4Sims,
  ...excelModule5Sims,
  ...excelModule6Sims,
  ...excelModule7Sims,
  ...excelModule8Sims,
};
