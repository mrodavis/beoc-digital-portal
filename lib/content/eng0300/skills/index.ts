import { Skill, SkillId } from "@/types/eng0300";

import { mainIdeasSkill } from "./mainIdeas";
import { inferencesSkill } from "./inferences";
import { vocabularySkill } from "./vocabulary";
import { textStructureSkill } from "./textStructure";
import { pointOfViewSkill } from "./pointOfView";
import { evidenceSkill } from "./evidence";
import { visualDataSkill } from "./visualData";

/**
 * The seven skill labs, in course sequence.
 *
 * To add a skill: create a file in this directory exporting a `Skill`, import it
 * here, and add it to the array. Routes, dashboard cards, the roadmap, and the
 * Practice Center all read from this list — no page components need editing.
 */
export const eng0300Skills: Skill[] = [
  mainIdeasSkill,
  inferencesSkill,
  vocabularySkill,
  textStructureSkill,
  pointOfViewSkill,
  evidenceSkill,
  visualDataSkill,
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return eng0300Skills.find((skill) => skill.slug === slug);
}

export function getSkillById(id: SkillId): Skill | undefined {
  return eng0300Skills.find((skill) => skill.id === id);
}

/** Previous/next skill in course order, for in-page navigation. */
export function getAdjacentSkills(slug: string) {
  const index = eng0300Skills.findIndex((skill) => skill.slug === slug);
  return {
    previous: index > 0 ? eng0300Skills[index - 1] : undefined,
    next:
      index >= 0 && index < eng0300Skills.length - 1
        ? eng0300Skills[index + 1]
        : undefined,
  };
}
