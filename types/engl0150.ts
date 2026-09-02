/**
 * ENGL0150 — Writing for the Workplace
 *
 * Content model for the ENGL0150 course site.
 *
 * SOURCE / SCOPE NOTE
 * -------------------
 * Course structure, essential questions, concept lists, grammar items, spelling
 * words, formative activities, and cumulative products come from the official
 * Instructor's Guide (Irene Dascher, 2026) and the ENGL0150 syllabus, which are
 * authoritative. Practice ITEMS inside the widgets — drill sentences, sorter
 * statements, scenarios — are authored to implement those specifications and
 * are constrained to the concepts and vocabulary the guide names.
 *
 * Everything here is UNGRADED practice. Grading lives in Brightspace. Every
 * scenario is fictional: no real patient data, names, or facilities appear
 * anywhere in this course's content, including fixtures.
 */

/** The five course-wide learning goals. Each topic declares which it advances. */
export type LearningGoalId =
  | "grammar-sentence"
  | "professional-writing"
  | "patient-centered"
  | "documentation"
  | "summarizing";

export interface LearningGoal {
  id: LearningGoalId;
  number: 1 | 2 | 3 | 4 | 5;
  title: string;
  /** NHA alignment or context note, where the guide supplies one. */
  qualifier?: string;
  outcomes: string[];
}

/**
 * A visible editorial placeholder.
 *
 * The build prompt forbids fabricating course content. Where the Instructor's
 * Guide does not supply something the template expects, the page renders this
 * instead of inventing it, and the build report lists every one.
 */
export interface PendingContent {
  /** What is missing, phrased for the instructor. */
  note: string;
}

export interface VocabWord {
  word: string;
  meaning: string;
  /** A healthcare sentence using the word correctly. */
  example: string;
  /**
   * A word this is commonly confused with — patient/patience,
   * precede/proceed, once/ones. Drives the "use it" card mode.
   */
  confusedWith?: string;
}

/** One numbered spelling and usage list. Lists spiral forward. */
export interface WordList {
  /** List number as students see it. List 1 belongs to Topic 1. */
  number: number;
  topicNumber: number;
  words: VocabWord[];
  /** True where the guide notes "+ spiral words from previous lists". */
  spirals: boolean;
}

export interface GrammarBlock {
  heading: string;
  points: string[];
}

/** One option in any multiple-choice widget. */
export interface Choice {
  text: string;
  correct: boolean;
  /** Why this option is right or wrong. Required on every option. */
  rationale: string;
}

export interface DrillItem {
  id: string;
  prompt: string;
  choices: Choice[];
  /** The grammar or communication principle the item teaches. */
  principle: string;
}

export interface SortItem {
  id: string;
  text: string;
  /** The bin this belongs in — bin ids are defined by the widget's data. */
  bin: string;
  /** Names the specific word or feature that decides it. */
  feedback: string;
}

export interface RewriteItem {
  id: string;
  /** The unacceptable original. */
  before: string;
  /** What makes it unacceptable. */
  problem: string;
  /** A model answer. Self-scored — never auto-graded. */
  model: string;
  /** Checklist the student scores their own rewrite against. */
  rubric: string[];
}

export interface MatchPair {
  id: string;
  /** The clinical term or jargon. */
  term: string;
  /** The plain-language equivalent a patient would understand. */
  plain: string;
  /** A model sentence explaining it to a patient. */
  explanation?: string;
}

export interface ToneSample {
  id: string;
  text: string;
  /** 0 blunt · 1 abrupt · 2 professional · 3 over-soft. */
  band: 0 | 1 | 2 | 3;
  feedback: string;
  /** A version in the professional band, for comparison. */
  professional?: string;
}

export interface RequiredElement {
  id: string;
  label: string;
  /** True when the sample already contains it. */
  present: boolean;
  /** Why it matters to the person receiving the request. */
  why: string;
}

export interface BuilderField {
  id: string;
  label: string;
  prompt: string;
  /** Words or ideas a complete answer should contain. Case-insensitive. */
  expects?: string[];
  /** Shown when `expects` is not satisfied. */
  missingHint?: string;
  rows?: number;
}

export interface ErrorHuntSpan {
  /** The exact text carrying the error, as it appears in the paragraph. */
  text: string;
  category: string;
  correction: string;
}

export interface OrderItem {
  id: string;
  text: string;
  /** Correct position, 1-based. */
  position: number;
  /** Why it belongs there. */
  reason: string;
}

/**
 * Formative practice widgets.
 *
 * Each is data-driven so items can be added without touching component code.
 * The union grows as topics are built; every variant carries `title` and an
 * optional `instructions` line.
 */
export type PracticeWidget =
  | { kind: "grammar-drill"; title: string; instructions?: string; items: DrillItem[] }
  | { kind: "word-bank"; title: string; instructions?: string; listNumber: number }
  | { kind: "sorter"; title: string; instructions?: string; bins: { id: string; label: string; hint?: string }[]; items: SortItem[] }
  | { kind: "rewrite"; title: string; instructions?: string; items: RewriteItem[] }
  | { kind: "sequencer"; title: string; instructions?: string; items: OrderItem[] }
  | { kind: "choose-best"; title: string; instructions?: string; scenario: string; items: DrillItem[] }
  | { kind: "matcher"; title: string; instructions?: string; pairs: MatchPair[] }
  | { kind: "tone"; title: string; instructions?: string; samples: ToneSample[] }
  | { kind: "missing-info"; title: string; instructions?: string; sample: string; elements: RequiredElement[] }
  | { kind: "builder"; title: string; instructions?: string; scenario: string; fields: BuilderField[]; storageKey: string }
  | { kind: "ai-lab"; title: string; instructions?: string; starter: string; badRevision: { text: string; problems: string[] } }
  | { kind: "error-hunt"; title: string; instructions?: string; paragraph: string; spans: ErrorHuntSpan[] };

export interface WorkplaceProduct {
  /** Short badge label, e.g. "Basic SOAP note". */
  label: string;
  /** What the student produces and what it must demonstrate. */
  description: string;
  /** The scenario the product is written from, where the guide supplies one. */
  scenario?: string;
}

/** Core topics run on the calendar; advanced topics are optional extensions. */
export type TopicTrack = "core" | "advanced";

export interface Topic {
  number: number;
  /** Defaults to "core" when omitted. */
  track?: TopicTrack;
  /** Programs an advanced topic is aimed at, e.g. ["MA", "PCT"]. */
  programs?: string[];
  slug: string;
  title: string;
  /** Unit number and title this topic sits in. */
  unit: { number: number; title: string };
  /** Session count as the guide states it, e.g. "1–2". */
  sessions: string;
  /** Set where the guide's summary table and detailed outline disagree. */
  sessionsNote?: PendingContent;
  goals: LearningGoalId[];

  /** 1. Essential Question. */
  essentialQuestion: string | PendingContent;
  /** 2. Teaching & Learning Concepts. */
  concepts: string[];
  /** 3. Grammar Focus. */
  grammar: GrammarBlock[] | PendingContent;
  /** 4. Healthcare Vocabulary — the list number this topic introduces. */
  wordListNumber: number | PendingContent;
  /** 5. Formative Practice. */
  practice: PracticeWidget[];
  /** 6. Cumulative Workplace Product. */
  product: WorkplaceProduct | PendingContent;
  /** 7. Revision & Reflection — extra prompts beyond the Communication Check. */
  reflection?: string[];

  /** Topic numbers whose grammar this topic revisits. Drives the spiral banner. */
  spiralsFrom?: number[];
  /** Rendered above the seven sections — orientation copy, where the guide has it. */
  intro?: string[];
  /** "Before You Leave" checklist. */
  beforeYouLeave?: string[];
  /** A line from the guide worth keeping verbatim. */
  closingLine?: string;
}

/** The five Communication Check criteria, used by topics and the Portfolio. */
export interface CommunicationCriterion {
  id: string;
  label: string;
  prompt: string;
}

/** One piece in the Writing Portfolio. */
export interface PortfolioPiece {
  icon: string;
  title: string;
  description: string;
  skills: string[];
}
