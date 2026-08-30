import {
  Activity,
  Difficulty,
  PassageType,
  PracticeSet,
  Skill,
} from "@/types/eng0300";
import { eng0300Skills } from "../skills";

export const difficultyOrder: Difficulty[] = [
  "Foundation",
  "Developing",
  "TABE Ready",
  "Challenge",
];

export const passageTypes: PassageType[] = [
  "Informational",
  "Workplace",
  "Science",
  "Health",
  "Technology",
  "History",
  "Biography",
  "Argument",
  "Data / Charts",
];

/** Which stage of a skill page an activity lives on, used to build its anchor link. */
const stageAnchors = {
  guided: "try-it",
  practice: "practice",
  challenge: "challenge",
  masteryCheck: "mastery-check",
} as const;

type Stage = keyof typeof stageAnchors;

const stageLabels: Record<Stage, string> = {
  guided: "Guided",
  practice: "Practice",
  challenge: "Challenge",
  masteryCheck: "Mastery Check",
};

/** The hardest difficulty present in a set — how the set is filed for filtering. */
function setDifficulty(activity: Activity): Difficulty {
  return activity.questions.reduce<Difficulty>((hardest, question) => {
    return difficultyOrder.indexOf(question.difficulty) >
      difficultyOrder.indexOf(hardest)
      ? question.difficulty
      : hardest;
  }, "Foundation");
}

function setPassageType(activity: Activity): PassageType {
  return activity.passages[0]?.type ?? "Informational";
}

/** Roughly one minute of reading per 120 words, plus a minute per question. */
function estimateMinutes(activity: Activity): number {
  const words = activity.passages.reduce(
    (total, passage) =>
      total + (passage.wordCount ?? passage.body.join(" ").split(/\s+/).length),
    0
  );
  return Math.max(3, Math.round(words / 120) + activity.questions.length);
}

function toPracticeSet(skill: Skill, stage: Stage, activity: Activity): PracticeSet {
  return {
    id: activity.id,
    title: activity.title,
    description:
      activity.intro ??
      `${stageLabels[stage]} activity from the ${skill.title} skill lab.`,
    skill: skill.id,
    difficulty: setDifficulty(activity),
    passageType: setPassageType(activity),
    href: `/eng0300/skills/${skill.slug}#${stageAnchors[stage]}`,
    questionCount: activity.questions.length,
    estimatedMinutes: estimateMinutes(activity),
  };
}

/**
 * Every practice activity across all seven skill labs, flattened into one
 * filterable catalog.
 *
 * Sets are derived from the skill content rather than listed separately, so
 * adding an activity to a skill file automatically adds it to the Practice
 * Center. To add a standalone set that is not part of a skill page, push a
 * `PracticeSet` onto `standalonePracticeSets` below.
 */
export const standalonePracticeSets: PracticeSet[] = [];

export const eng0300PracticeSets: PracticeSet[] = [
  ...eng0300Skills.flatMap((skill) =>
    (Object.keys(stageAnchors) as Stage[])
      .map((stage) => {
        const activity = skill[stage];
        return activity ? toPracticeSet(skill, stage, activity) : undefined;
      })
      .filter((set): set is PracticeSet => Boolean(set))
  ),
  ...standalonePracticeSets,
];

export const practiceStats = {
  setCount: eng0300PracticeSets.length,
  questionCount: eng0300PracticeSets.reduce(
    (total, set) => total + set.questionCount,
    0
  ),
};
