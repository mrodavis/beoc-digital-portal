/** Content for the workplace drills: 10-key entries, medical terms, and email punctuation. */
import { pick, rng } from "./rng";

/* ------------------------------------------------------------------ */
/* 10-key (numeric keypad)                                             */
/* ------------------------------------------------------------------ */

export type TenKeyMode = "whole" | "amounts" | "mixed";

export const TEN_KEY_MODES: { id: TenKeyMode; label: string; blurb: string }[] = [
  { id: "whole", label: "Whole numbers", blurb: "ZIP codes, chart numbers, quantities" },
  { id: "amounts", label: "Dollar amounts", blurb: "Copays and charges with a decimal point" },
  { id: "mixed", label: "Mixed", blurb: "Both, the way a billing day really goes" },
];

/** A round of entries. Amounts use a decimal point and two places (no $ sign: the keypad has none). */
export function tenKeyEntries(mode: TenKeyMode, seed: number, count = 15): string[] {
  const r = rng(seed * 13 + 5);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const kind = mode === "mixed" ? (r() < 0.5 ? "whole" : "amounts") : mode;
    if (kind === "amounts") {
      const dollars = r() < 0.6 ? 5 + Math.floor(r() * 95) : 100 + Math.floor(r() * 1900);
      const cents = pick(r, [0, 0, 25, 50, 75, Math.floor(r() * 100)]);
      out.push(`${dollars}.${String(cents).padStart(2, "0")}`);
    } else {
      const shape = pick(r, ["zip", "chart", "qty", "code"]);
      if (shape === "zip") out.push(pick(r, ["11201", "11212", "11226", "11203", "11236", "11373", "10301", "11432", "11691", "11208"]));
      else if (shape === "chart") out.push(String(100000 + Math.floor(r() * 899999)));
      else if (shape === "qty") out.push(String(1 + Math.floor(r() * 250)));
      else out.push(String(1000 + Math.floor(r() * 8999)));
    }
  }
  return out;
}

/** Keypad layout: [key, label, finger]. Right hand; 4-5-6 is the home row, with a bump on 5. */
export const KEYPAD: { k: string; label?: string; f: "ri" | "rm" | "rr" | "rp" | "th"; w?: number; h?: number }[][] = [
  [{ k: "NumLock", label: "Num", f: "ri" }, { k: "/", f: "rm" }, { k: "*", f: "rr" }, { k: "-", f: "rp" }],
  [{ k: "7", f: "ri" }, { k: "8", f: "rm" }, { k: "9", f: "rr" }, { k: "+", f: "rp", h: 2 }],
  [{ k: "4", f: "ri" }, { k: "5", f: "rm" }, { k: "6", f: "rr" }],
  [{ k: "1", f: "ri" }, { k: "2", f: "rm" }, { k: "3", f: "rr" }, { k: "Enter", f: "rp", h: 2 }],
  [{ k: "0", f: "th", w: 2 }, { k: ".", f: "rr" }],
];

export const KEYPAD_FINGER: Record<string, "ri" | "rm" | "rr" | "rp" | "th"> = Object.fromEntries(KEYPAD.flat().map((k) => [k.k, k.f]));

/* ------------------------------------------------------------------ */
/* Medical terms (the Module 5 list)                                    */
/* ------------------------------------------------------------------ */

export const MEDICAL_TERMS = [
  "hypertension",
  "hyperlipidemia",
  "gastroesophageal",
  "myocardial infarction",
  "electrocardiogram",
  "pharmaceutical",
  "immunization",
  "ophthalmology",
  "otolaryngology",
  "endocrinology",
  "orthopedic",
  "neurological",
  "cardiovascular",
  "gastrointestinal",
];

/** The list in order, once or three times each (the Module 5 challenge asks for three). */
export function termsText(rounds: 1 | 3): { text: string; spans: { term: string; start: number; end: number }[] } {
  const list = rounds === 1 ? MEDICAL_TERMS : MEDICAL_TERMS.flatMap((t) => [t, t, t]);
  const spans: { term: string; start: number; end: number }[] = [];
  let text = "";
  for (const t of list) {
    if (text) text += " ";
    spans.push({ term: t, start: text.length, end: text.length + t.length });
    text += t;
  }
  return { text, spans };
}

/* ------------------------------------------------------------------ */
/* Email punctuation and capitalization                                 */
/* ------------------------------------------------------------------ */

export interface FixItem {
  id: string;
  wrong: string;
  /** Accepted answers (compared after collapsing spaces; curly quotes count as straight). */
  right: string[];
  rule: string;
}

export const EMAIL_FIXES: FixItem[] = [
  { id: "greeting-caps", wrong: "hi ms. lopez,", right: ["Hi Ms. Lopez,"], rule: "Capitalize the first word of a greeting, a person's title, and their name. Put a comma after the greeting." },
  { id: "day-caps", wrong: "your appointment is on tuesday at 10:30 a.m.", right: ["Your appointment is on Tuesday at 10:30 a.m.", "Your appointment is on Tuesday at 10:30 AM."], rule: "Start every sentence with a capital letter, and capitalize days of the week." },
  { id: "end-period", wrong: "Please bring your insurance card", right: ["Please bring your insurance card."], rule: "A sentence that gives information or an instruction ends with a period." },
  { id: "question", wrong: "Can you call us back today.", right: ["Can you call us back today?"], rule: "A direct question ends with a question mark." },
  { id: "closing", wrong: "best regards", right: ["Best regards,"], rule: "In a closing, capitalize only the first word and end it with a comma." },
  { id: "dr-title", wrong: "Dear dr patel", right: ["Dear Dr. Patel,", "Dear Dr. Patel:"], rule: "Dr. is capitalized and takes a period. End the greeting with a comma (or a colon in a formal letter)." },
  { id: "org-name", wrong: "lakeside medical associates is open until 5:00 p.m.", right: ["Lakeside Medical Associates is open until 5:00 p.m.", "Lakeside Medical Associates is open until 5:00 PM."], rule: "Capitalize every main word in the name of an organization." },
  { id: "pronoun-i", wrong: "i will send the form today.", right: ["I will send the form today."], rule: "The word I is always a capital letter." },
  { id: "its", wrong: "Its time to schedule your yearly physical.", right: ["It's time to schedule your yearly physical."], rule: "It's means it is. Its (no apostrophe) means belonging to it." },
  { id: "possessive", wrong: "The patients chart is ready.", right: ["The patient's chart is ready."], rule: "Add an apostrophe and s to show that something belongs to one person." },
  { id: "your", wrong: "We received you're forms.", right: ["We received your forms."], rule: "Your means belonging to you. You're means you are." },
  { id: "series", wrong: "We need your name date of birth and phone number.", right: ["We need your name, date of birth, and phone number.", "We need your name, date of birth and phone number."], rule: "Use commas to separate three or more items in a list." },
  { id: "however", wrong: "Your results are ready however the doctor would like to talk with you.", right: ["Your results are ready; however, the doctor would like to talk with you.", "Your results are ready. However, the doctor would like to talk with you."], rule: "Join two complete sentences with a semicolon before however and a comma after it, or split them into two sentences." },
  { id: "all-caps", wrong: "PLEASE BRING YOUR CARD TO EVERY VISIT.", right: ["Please bring your card to every visit."], rule: "Writing in all capital letters reads as shouting. Use normal capitalization." },
  { id: "exclaim", wrong: "Thank you for your patience!!!", right: ["Thank you for your patience.", "Thank you for your patience!"], rule: "In professional email, use one exclamation point at most, and use it rarely." },
  { id: "hi-comma", wrong: "Hi Mr. Chen I hope you are doing well.", right: ["Hi Mr. Chen, I hope you are doing well."], rule: "Put a comma after the name in a greeting." },
];

export function normalizeAnswer(s: string): string {
  return s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
}
