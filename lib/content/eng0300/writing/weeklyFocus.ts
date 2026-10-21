/**
 * The Sentence Skills suggested order.
 *
 * One config object drives the Writing Lab list, the default filter, and the
 * "Step N focus" badge. beocdigital is self-paced, so students see a step in a
 * sequence, never a calendar week. `week` is kept only as the stable id behind
 * the ?week= deep links (it matches the reading skill the step pairs with).
 * Nothing about the order is hardcoded in markup.
 *
 * `skill` must match an id in the sentence-skills bank (`bank.json` → skills[]).
 */
export interface WeeklyFocus {
  week: number;
  /** Bank skill id this step practices. */
  skill: string;
  label: string;
  /** Why this skill, at this point in the order — shown under the heading. */
  why: string;
}

export const sentenceSkillsRotation: WeeklyFocus[] = [
  {
    week: 3,
    skill: "fragments",
    label: "Fragments",
    why: "Start where every other sentence error starts: knowing when a group of words is finished.",
  },
  {
    week: 4,
    skill: "run-ons",
    label: "Run-ons & comma splices",
    why: "The opposite problem. Once you can spot a complete sentence, you can spot two of them stuck together.",
  },
  {
    week: 5,
    skill: "subject-verb",
    label: "Subject-verb agreement",
    why: "Now that you can find a subject reliably, make the verb match it.",
  },
  {
    week: 6,
    skill: "punctuation",
    label: "Punctuation & capitalization",
    why: "The marks that show a reader where your sentences begin, end, and pause.",
    },
  {
    week: 7,
    skill: "confused-words",
    label: "Usage & confused words",
    why: "The errors a spell-check will never catch, because both spellings are real words.",
  },
];

/** Week 6 pairs two bank skills; the rotation names one, this lists both. */
export const weeklyFocusExtraSkills: Record<number, string[]> = {
  6: ["punctuation", "capitalization"],
  7: ["confused-words", "usage"],
};

/** Every bank skill a given week covers. */
export function skillsForWeek(week: number): string[] {
  const entry = sentenceSkillsRotation.find((f) => f.week === week);
  if (!entry) return [];
  return weeklyFocusExtraSkills[week] ?? [entry.skill];
}

export function focusForWeek(week: number): WeeklyFocus | undefined {
  return sentenceSkillsRotation.find((f) => f.week === week);
}

/** 1-based position of a rotation entry in the suggested order. */
export function focusStep(week: number): number {
  return sentenceSkillsRotation.findIndex((f) => f.week === week) + 1;
}
