import type { SimDefinition } from "@/types/sim";
import { gwMailM5 } from "./mail-m5";
import { gwMailM6 } from "./mail-m6";
import { gwMailM7 } from "./mail-m7";
import { gwMailM8 } from "./mail-m8";

/** Sims for Google Workspace modules 5-8, keyed "module-N::lesson-slug". */
const parts: Record<string, SimDefinition[]>[] = [gwMailM5, gwMailM6, gwMailM7, gwMailM8];
export const gwMailSims: Record<string, SimDefinition[]> = {};
for (const p of parts) for (const [k, v] of Object.entries(p)) gwMailSims[k] = [...(gwMailSims[k] ?? []), ...v];
