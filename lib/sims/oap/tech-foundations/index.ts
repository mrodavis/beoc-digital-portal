import type { SimDefinition } from "@/types/sim";
import { windowsSims } from "./windows";
import { outlookSims } from "./outlook";
import { teamsSims } from "./teams";
import { typingSims } from "./typing";
import { assistantSims } from "./assistant";
import { officeSims } from "./office";

/**
 * Lessons can have sims from several engines; arrays for the same lesson
 * are concatenated so a lesson can show, say, a Windows sim and an Outlook sim.
 */
const parts: Record<string, SimDefinition[]>[] = [windowsSims,  outlookSims,  teamsSims,  typingSims,  assistantSims,  officeSims, ];
export const sims: Record<string, SimDefinition[]> = {};
for (const p of parts) for (const [k, v] of Object.entries(p)) sims[k] = [...(sims[k] ?? []), ...v];
