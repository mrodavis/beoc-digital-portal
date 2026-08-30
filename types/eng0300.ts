/**
 * ENG0300 — Reading for Academics (Academic Bridge Reading Lab)
 *
 * Content model for the ENG0300 Reading Lab.
 *
 * SCOPE / SECURITY NOTE
 * ---------------------
 * Everything typed in this file is ORIGINAL, instructor-authored, student-facing
 * practice content. It is compiled into the client bundle, so it must never carry
 * official assessment items, diagnostic keys, or any material transcribed from the
 * commercial TABE workbooks or the Teacher's Manual.
 *
 * `correctAnswer` values that appear here belong to UNGRADED practice only, which
 * exists to give learners immediate feedback. Official, graded assessment stays in
 * Brightspace. See docs/ENG0300_SOURCE_AUDIT.md.
 */

/** The seven student-facing skill areas. */
export type SkillId =
  | "main-ideas"
  | "inferences"
  | "vocabulary"
  | "text-structure"
  | "point-of-view"
  | "evidence"
  | "visual-data";

export type Difficulty = "Foundation" | "Developing" | "TABE Ready" | "Challenge";

export type PassageType =
  | "Informational"
  | "Workplace"
  | "Science"
  | "Health"
  | "Technology"
  | "History"
  | "Biography"
  | "Argument"
  | "Data / Charts";

export type QuestionType =
  | "multiple-choice"
  | "multiple-select"
  | "short-response"
  | "evidence-selection"
  | "vocabulary-in-context"
  | "paired-text"
  | "chart-data";

/**
 * A simple, accessible figure. Rendered as an SVG bar chart plus an equivalent
 * data table so the same information is available to screen readers and to
 * anyone who finds the chart hard to read.
 */
export interface DataFigure {
  kind: "bar" | "table";
  title: string;
  /** Plain-language description of the figure for assistive technology. */
  summary: string;
  /** Column headings. For a bar chart: [category, value]. */
  columns: string[];
  rows: { label: string; values: (string | number)[] }[];
  /** Unit shown after numeric bar values, e.g. "%" or " min". */
  unit?: string;
  sourceNote?: string;
}

/**
 * An original reading passage. `body` holds paragraphs; when `numbered` is true
 * they render with paragraph numbers so questions can cite them the way TABE does.
 */
export interface Passage {
  id: string;
  title: string;
  type: PassageType;
  /** Attribution line. Original passages are credited to BEOC. */
  attribution: string;
  body: string[];
  numbered?: boolean;
  figure?: DataFigure;
  wordCount?: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  /** The stem shown to the learner. */
  question: string;
  /** Optional id of a passage defined in the same activity. */
  passageId?: string;
  choices?: string[];
  /**
   * Index into `choices` for single-answer items; an array of indexes for
   * multiple-select. Omitted for short-response items, which are self-checked
   * against `sampleResponse`.
   */
  correctAnswer?: number | number[];
  /** Shown after the learner answers: why the key is right. */
  explanation: string;
  /** Per-choice reasoning powering the Answer Review stage. */
  choiceRationales?: string[];
  /** For short-response items: a model answer to self-check against. */
  sampleResponse?: string;
  /** A nudge available before answering. */
  hint?: string;
  skill: SkillId;
  difficulty: Difficulty;
}

/** A passage plus the questions attached to it. */
export interface Activity {
  id: string;
  title: string;
  /** Optional framing shown above the passage. */
  intro?: string;
  passages: Passage[];
  questions: Question[];
}

/** The reasoning walkthrough in the SEE IT stage. */
export interface WorkedExample {
  title: string;
  passage: Passage;
  question: string;
  /** Ordered think-aloud steps, mirroring the modeling done in class. */
  steps: { move: string; thinking: string }[];
  answer: string;
  takeaway: string;
}

export interface LessonSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** A compact reference table, e.g. text-structure signal words. */
  table?: { columns: string[]; rows: string[][] };
  callout?: { label: string; text: string };
}

export interface SkillResource {
  label: string;
  detail: string;
  href?: string;
  /** External links open in a new tab and are marked as leaving the portal. */
  external?: boolean;
}

/**
 * How complete a skill's content is. Drives honest status labels in the UI —
 * we say plainly when a stage is still awaiting instructor content rather than
 * rendering an empty section.
 */
export type ContentStatus = "complete" | "starter";

export interface Skill {
  id: SkillId;
  slug: string;
  title: string;
  /** Short label for cards and navigation. */
  shortTitle: string;
  description: string;
  icon: string;
  /** Tailwind gradient classes used for the skill's header band. */
  accent: string;
  week: number;
  status: ContentStatus;
  /** Course outcomes from the ENG0300 syllabus that this skill covers. */
  outcomes: string[];
  objectives: string[];
  estimatedMinutes: number;

  /** LEARN */
  lesson: LessonSection[];
  /** SEE IT */
  workedExample?: WorkedExample;
  /** TRY IT */
  guided?: Activity;
  /** PRACTICE */
  practice?: Activity;
  /** CHALLENGE */
  challenge?: Activity;
  /** MASTERY CHECK */
  masteryCheck?: Activity;

  resources?: SkillResource[];
}

/** A registered practice set surfaced in the Practice Center. */
export interface PracticeSet {
  id: string;
  title: string;
  description: string;
  skill: SkillId;
  difficulty: Difficulty;
  passageType: PassageType;
  /** Where the set lives today. Sets authored inside a skill link to that stage. */
  href: string;
  questionCount: number;
  estimatedMinutes: number;
}

/** One instructional meeting from the syllabus course outline. */
export interface RoadmapMeeting {
  day: 1 | 2;
  topic: string;
  inClass: string;
  homework: string[];
}

export interface RoadmapWeek {
  week: number;
  focus: string;
  skill?: SkillId;
  meetings: RoadmapMeeting[];
}
