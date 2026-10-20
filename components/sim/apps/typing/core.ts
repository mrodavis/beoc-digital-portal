import type { SimCommit } from "@/types/sim";
import type { AppCore, SimUi } from "../../types";
import { clone } from "@/lib/sim/ops";
import type { TypingDoc, TypingFormExercise } from "./types";

function exerciseOf(doc: TypingDoc, sel: string) {
  const id = sel.startsWith("ex:") ? sel.slice(3) : doc.active ?? doc.exercises[0]?.id;
  return doc.exercises.find((e) => e.id === id);
}

export function formFields(ex: TypingFormExercise) {
  return ex.sections.flatMap((s) => s.fields);
}

/** Abbreviations whose period does not end a sentence ("Dr. Cole", "9 a.m. on Friday"). */
const ABBREV = /(?:^|[\s(])(?:dr|mr|mrs|ms|jr|sr|vs|e\.g|i\.e|a\.m|p\.m)\.$/i;

/**
 * Complete sentences in a text: runs that contain a word and end in . ! or ?
 * (closing quotes allowed) followed by a space or the end. "$18,000." and
 * "10/23/2026." end sentences; "$18.50" and "Dr." do not. Trailing words with
 * no end mark are not counted.
 */
export function countSentences(text: string): number {
  const t = text.replace(/\s+/g, " ").trim();
  let n = 0;
  let start = 0;
  for (const m of t.matchAll(/[.!?]+["'”’)\]]*(?=\s|$)/g)) {
    const body = t.slice(start, m.index);
    if (!/[A-Za-z]{2}/.test(body)) continue;
    if (m[0] === "." && ABBREV.test(`${body}.`)) continue;
    n++;
    start = (m.index ?? 0) + m[0].length;
  }
  return n;
}

function fieldDef(doc: TypingDoc, name: string) {
  for (const e of doc.exercises) if (e.kind === "form") for (const f of formFields(e)) if (f.name === name) return f;
  return undefined;
}

/** The text a field commit carries for the form (see `normalizeTyping`). */
function enteredText(c: Extract<SimCommit, { kind: "type" }>): string {
  return (c as { entered?: string }).entered ?? c.value;
}

/**
 * A field that needs N sentences gets an empty value when the entry has fewer,
 * so it cannot satisfy the step; `entered` keeps the real text for `apply`.
 */
function normalizeTyping(c: SimCommit, doc?: TypingDoc): SimCommit {
  if (c.kind !== "type" || !c.target.startsWith("field:") || !doc) return c;
  const min = fieldDef(doc, c.target.slice(6))?.minSentences;
  if (!min || countSentences(c.value) >= min) return c;
  return { ...c, value: "", entered: c.value } as SimCommit;
}

function applyTyping(input: TypingDoc, c: SimCommit, ui: SimUi): { doc: TypingDoc; ui?: Partial<SimUi> } {
  const doc = clone(input);
  const ex = exerciseOf(doc, ui.selection ?? "");
  if (c.kind === "type") {
    if (c.target.startsWith("field:")) {
      doc.values = { ...(doc.values ?? {}), [c.target.slice(6)]: enteredText(c) };
      if (ex) {
        doc.verified = { ...(doc.verified ?? {}), [ex.id]: false };
        doc.submitted = { ...(doc.submitted ?? {}), [ex.id]: false };
      }
      return { doc };
    }
    if ((c.target === "keys" || c.target === "passage") && ex) {
      doc.done = { ...(doc.done ?? {}), [ex.id]: true };
    }
    return { doc };
  }
  if (c.kind === "command" && ex) {
    if (c.id === "form.verify") doc.verified = { ...(doc.verified ?? {}), [ex.id]: c.value === undefined ? !doc.verified?.[ex.id] : String(c.value) !== "off" };
    if (c.id === "form.submit") {
      doc.submitted = { ...(doc.submitted ?? {}), [ex.id]: true };
      doc.done = { ...(doc.done ?? {}), [ex.id]: true };
    }
  }
  return { doc };
}

/**
 * Typing tutor (key drills and passage drills with live WPM and accuracy) and a
 * data-entry trainer (source document beside a form). Bare chrome.
 */
export const typingCore: AppCore<TypingDoc> = {
  name: "Typing Trainer",
  accent: "#0f766e",
  chrome: "bare",
  autosave: false,
  ribbon: [{ id: "home", label: "Home", groups: [] }],
  dialogs: {},
  backstage: { templates: [], recent: [], formats: [], ext: "" },
  shortcuts: {},
  canvasCommands: ["form.verify", "form.submit"],
  freeCommands: [],
  initialUi: (doc) => ({ selection: `ex:${doc.active ?? doc.exercises[0]?.id ?? ""}` }),
  normalize: normalizeTyping,
  apply: applyTyping,
  ribbonState: () => ({}),
  selectionExists: (doc, sel) => {
    if (!sel) return true;
    if (sel === "keys" || sel === "passage") return true;
    if (sel.startsWith("ex:")) return doc.exercises.some((e) => e.id === sel.slice(3));
    if (sel.startsWith("field:")) {
      const name = sel.slice(6);
      return doc.exercises.some((e) => e.kind === "form" && formFields(e).some((f) => f.name === name));
    }
    return false;
  },
  describeSelection: (doc, ui) => exerciseOf(doc, ui.selection ?? "")?.title ?? "",
};
