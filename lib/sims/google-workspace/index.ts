import type { SimDefinition } from "@/types/sim";
import { gwCoreSims } from "./core";
import { gwMailSims } from "./mail";

const parts = [gwCoreSims, gwMailSims];
export const googleWorkspaceSims: Record<string, SimDefinition[]> = {};
for (const p of parts) for (const [k, v] of Object.entries(p)) googleWorkspaceSims[k] = [...(googleWorkspaceSims[k] ?? []), ...v];
