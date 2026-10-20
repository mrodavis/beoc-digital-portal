import type { SimDefinition } from "@/types/sim";
import { excelModule2Sims } from "./module2";

export const excelSims: Record<string, SimDefinition[]> = {
  ...excelModule2Sims,
};
