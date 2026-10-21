import type { SimDefinition } from "@/types/sim";
import { windowsSims } from "./windows";
import { outlookSims } from "./outlook";
import { teamsSims } from "./teams";
import { typingSims } from "./typing";
import { assistantSims } from "./assistant";
import { wordSims } from "./word";
import { excelSims } from "./excel";
import { powerpointSims } from "./powerpoint";
import { labsWindowsSims } from "./labs-windows";
import { labsTypingSims } from "./labs-typing";
import { labsCloudSims } from "./labs-cloud";
import { labsEmailSims } from "./labs-email";
import { labsSecuritySims } from "./labs-security";

/**
 * Lessons can have sims from several engines; arrays for the same lesson
 * are concatenated so a lesson can show, say, a Windows sim and an Outlook sim.
 */
const parts: Record<string, SimDefinition[]>[] = [windowsSims,  outlookSims,  teamsSims,  typingSims,  assistantSims,  wordSims, excelSims, powerpointSims, labsWindowsSims, labsSecuritySims, labsEmailSims, labsCloudSims, labsTypingSims];
export const sims: Record<string, SimDefinition[]> = {};
for (const p of parts) for (const [k, v] of Object.entries(p)) sims[k] = [...(sims[k] ?? []), ...v];
