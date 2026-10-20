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

function applyTyping(input: TypingDoc, c: SimCommit, ui: SimUi): { doc: TypingDoc; ui?: Partial<SimUi> } {
  const doc = clone(input);
  const ex = exerciseOf(doc, ui.selection ?? "");
  if (c.kind === "type") {
    if (c.target.startsWith("field:")) {
      doc.values = { ...(doc.values ?? {}), [c.target.slice(6)]: c.value };
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
