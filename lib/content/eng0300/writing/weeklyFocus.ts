/**
 * The Sentence Skills weekly focus rotation.
 *
 * One config object drives the landing page banner, the default filter, and the
 * "this week" badge — nothing about the rotation is hardcoded in markup, so
 * moving a week means editing this array and nothing else.
 *
 * `skill` must match an id in the sentence-skills bank (`bank.json` → skills[]).
 */
export interface WeeklyFocus {
  week: number;
  /** Bank skill id this week practises. */
  skill: string;
  label: string;
  /** Why this skill, this week — shown under the banner heading. */
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
