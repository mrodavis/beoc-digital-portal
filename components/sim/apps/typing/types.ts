/**
 * Typing tutor and data-entry trainer.
 *
 * The doc is a short course: a list of exercises in the sidebar. Opening an
 * exercise is free navigation; finishing one is judged.
 *
 * Selection keys: "ex:<exerciseId>" is the open exercise. Steps that type into
 * an exercise use `requires: { selection: "ex:<id>" }` so typing the wrong
 * drill gets the selectHint.
 *
 * Type targets (commits):
 *   "keys"          key drill finished (value = the drill text as typed; key
 *                   drills only advance on the correct key, so it always matches)
 *   "passage"       passage drill finished (value = what was typed; use match
 *                   "similar" with a threshold, e.g. 0.95 for 95% accuracy)
 *   "field:<name>"  a form field, committed when it loses focus (Tab, Enter or a
 *                   click elsewhere) with a changed value; selects and radios
 *                   commit on change
 * Commands: "form.verify" (the read-back checkbox), "form.submit" (Save record),
 * both with selection "ex:<formExerciseId>".
 *
 * A field with `minSentences` (the CRM summary) is checked for length too: a
 * commit with fewer complete sentences is normalized to an empty value, so no
 * step on that field matches it, while the text the learner typed is still the
 * one the form keeps.
 */
import type { SimAction, SimStep, SimValue } from "@/types/sim";

export type TypingKeysExercise = {
  id: string;
  kind: "keys";
  title: string;
  subtitle?: string;
  /** Keys this drill introduces; they are highlighted on the keyboard. */
  keys?: string[];
  text: string;
  tip?: string;
};

export type TypingPassageExercise = {
  id: string;
  kind: "passage";
  title: string;
  subtitle?: string;
  text: string;
  /** Goals shown on the results card. */
  goalWpm?: number;
  goalAccuracy?: number;
  /** Allow Backspace (default true). */
  backspace?: boolean;
  /** Show the on-screen keyboard (default true). */
  keyboard?: boolean;
  tip?: string;
};

export type TypingSourceRow = { label: string; value: string; wide?: boolean };

export type TypingSource = {
  /** scan: a scanned paper form with handwriting (not selectable). digital: an email/PDF with selectable text. */
  kind: "scan" | "digital";
  title: string;
  /** Small print above the title, e.g. the organization name. */
  org?: string;
  /** For digital sources: From/To/Subject style header lines. */
  header?: TypingSourceRow[];
  sections: { heading?: string; rows: TypingSourceRow[] }[];
  /** Free text at the bottom (signature line, notes, email body). */
  footer?: string;
  stamp?: string;
};

export type TypingField = {
  name: string;
  label: string;
  type?: "text" | "date" | "tel" | "email" | "select" | "radio" | "textarea";
  options?: string[];
  placeholder?: string;
  /** Grid width in a 6-column row (default 3). */
  span?: 1 | 2 | 3 | 4 | 5 | 6;
  required?: boolean;
  /**
   * The field needs at least this many sentences (each ending in . ! or ?).
   * A shorter entry never matches a step on this field, so a fragment that
   * happens to contain every keyword still counts as a miss.
   */
  minSentences?: number;
};

export type TypingFormExercise = {
  id: string;
  kind: "form";
  title: string;
  subtitle?: string;
  /** The app the form lives in, shown in its header (e.g. "Student Information System"). */
  system?: string;
  /** Record label, e.g. "New Applicant" or "Invoice INV-20418". */
  record?: string;
  source: TypingSource;
  sections: { id: string; heading: string; fields: TypingField[] }[];
  /** Read-back checkbox label; omit to hide it. */
  verifyLabel?: string;
  submitLabel?: string;
};

export type TypingExercise = TypingKeysExercise | TypingPassageExercise | TypingFormExercise;

export type TypingDoc = {
  /** Brand line in the header (default "KeyPath Typing Trainer"). */
  product?: string;
  learner?: string;
  exercises: TypingExercise[];
  /** Exercise open at the start (default the first). */
  active?: string;
  /** Form field values by name (pre-filled values go here too). */
  values?: Record<string, string>;
  /** Exercises finished, by id. */
  done?: Record<string, boolean>;
  verified?: Record<string, boolean>;
  submitted?: Record<string, boolean>;
  flags?: Record<string, SimValue>;
};

export const typingDoc = (d: TypingDoc) => d as unknown as Record<string, unknown>;

/**
 * A typing step graded with match "all": the learner passes with any text that
 * contains every keyword (a keyword may be a list of alternatives, e.g.
 * ["3 bullets", "three bullets"]). `sample` is one complete answer; it is the
 * main action so the validator, which replays the main action, can play it.
 */
export function typeAll(target: string, sample: string, keywords: (string | string[])[], extra?: Omit<SimStep, "action" | "alt">): SimStep {
  const norm = (x: string) => x.toLowerCase().replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
  let combos: string[][] = [[]];
  for (const k of keywords) {
    const opts = Array.isArray(k) ? k : [k];
    combos = combos.flatMap((c) => opts.map((o) => [...c, o])).slice(0, 32);
  }
  const s = norm(sample);
  if (!combos.some((c) => c.every((k) => s.includes(norm(k))))) throw new Error(`typeAll sample for ${target} is missing a keyword: ${sample}`);
  const alt: SimAction[] = combos.map((c) => ({ kind: "type", target, value: c, match: "all" }));
  return { action: { kind: "type", target, value: sample, match: "includes" }, alt, ...(extra ?? {}) };
}
