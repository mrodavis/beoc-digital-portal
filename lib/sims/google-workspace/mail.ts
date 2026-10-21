import type { SimDefinition } from "@/types/sim";
import { gwMailM6 } from "./mail-m6";

/** Sims for Google Workspace modules 5-8, keyed "module-N::lesson-slug". */
const parts: Record<string, SimDefinition[]>[] = [gwMailM6];
export const gwMailSims: Record<string, SimDefinition[]> = {};
for (const p of parts) for (const [k, v] of Object.entries(p)) gwMailSims[k] = [...(gwMailSims[k] ?? []), ...v];
