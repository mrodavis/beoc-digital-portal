import { Difficulty } from "@/types/eng0300";
import bankData from "./bank.json";

/**
 * Loader and validator for the Sentence Skills question bank.
 *
 * The bank is a plain JSON file so it can be extended without touching
 * component code. That freedom is only safe if a malformed bank fails loudly,
 * so this module validates on import and throws rather than shipping a broken
 * practice set. See README.md in this directory for the shape and the rules.
 */

export interface SentenceSkill {
  id: string;
  label: string;
  blurb: string;
}

export interface SentenceQuestion {
  id: string;
  skill: string;
  difficulty: Difficulty;
  stem: string;
  choices: string[];
  correct: number;
  /** One line per choice. Explaining the wrong answers is the point of the engine. */
  why: string[];
  teach: string;
}

const difficulties: Difficulty[] = [
  "Foundation",
  "Developing",
  "TABE Ready",
  "Challenge",
];

function validate(): {
  skills: SentenceSkill[];
  questions: SentenceQuestion[];
} {
  const skills = bankData.skills as SentenceSkill[];
  const questions = bankData.questions as SentenceQuestion[];

  const skillIds = new Set(skills.map((s) => s.id));
  const seen = new Set<string>();

  for (const q of questions) {
    const where = `sentence-skills bank: question "${q.id}"`;

    if (seen.has(q.id)) throw new Error(`${where} — duplicate id.`);
    seen.add(q.id);

    if (!skillIds.has(q.skill)) {
      throw new Error(
        `${where} — unknown skill "${q.skill}". Add it to skills[] in bank.json.`
      );
    }
    if (!difficulties.includes(q.difficulty)) {
      throw new Error(`${where} — unknown difficulty "${q.difficulty}".`);
    }
    if (q.choices.length < 2) {
      throw new Error(`${where} — needs at least two choices.`);
    }
    if (q.correct < 0 || q.correct >= q.choices.length) {
      throw new Error(
        `${where} — correct index ${q.correct} is outside choices.`
      );
    }
    if (q.why.length !== q.choices.length) {
      throw new Error(
        `${where} — why[] has ${q.why.length} entries for ${q.choices.length} choices. Every choice needs its own explanation.`
      );
    }
  }

  return { skills, questions };
}

const validated = validate();

export const sentenceSkills = validated.skills;
export const sentenceQuestions = validated.questions;

/** Item counts per skill, derived so the UI never hardcodes a number. */
export const sentenceSkillCounts: Record<string, number> =
  sentenceSkills.reduce<Record<string, number>>((acc, skill) => {
    acc[skill.id] = sentenceQuestions.filter((q) => q.skill === skill.id).length;
    return acc;
  }, {});

export const sentenceBankTotal = sentenceQuestions.length;

/** Difficulties actually present in the bank, in course order. */
export const sentenceBankDifficulties = difficulties.filter((d) =>
  sentenceQuestions.some((q) => q.difficulty === d)
);
