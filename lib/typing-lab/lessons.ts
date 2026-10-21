/**
 * Guided key lessons in the standard touch-typing order: home row, top row,
 * bottom row, number row, then Shift and punctuation. Every drill is built
 * from the keys learned so far and nothing else (scripts check this).
 */
import { HOME_KEY, keyFor } from "./keyboard";
import { pick, rng, shuffle } from "./rng";
import { WORDS } from "./words";

export type UnitId = "home" | "top" | "bottom" | "numbers" | "shift";

export interface Unit {
  id: UnitId;
  title: string;
  blurb: string;
}

export const UNITS: Unit[] = [
  { id: "home", title: "Home row", blurb: "Where your fingers rest: A S D F and J K L ; plus G and H." },
  { id: "top", title: "Top row", blurb: "Reach up from the home row for Q W E R T Y U I O P." },
  { id: "bottom", title: "Bottom row", blurb: "Reach down for Z X C V B N M, the comma, the period, and the slash." },
  { id: "numbers", title: "Number row", blurb: "Digits for dates, phone numbers, ZIP codes, and member IDs." },
  { id: "shift", title: "Shift and punctuation", blurb: "Capital letters, question marks, apostrophes, colons, hyphens, parentheses, and @." },
];

export type LessonKind = "letters" | "review" | "numbers" | "capitals" | "punctuation";

export interface KeyLesson {
  id: string;
  unit: UnitId;
  title: string;
  kind: LessonKind;
  /** Characters this lesson adds. Capitals lessons add A-Z. */
  newKeys: string[];
  /** What to do with your hands, in one or two sentences. */
  intro: string;
}

const CAPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const LESSONS: KeyLesson[] = [
  { id: "home-fj", unit: "home", title: "F and J", kind: "letters", newKeys: ["f", "j"], intro: "Find the small bumps on F and J with your index fingers. Rest your other fingers on A S D and K L ;, and let your thumbs hover over the space bar." },
  { id: "home-dk", unit: "home", title: "D and K", kind: "letters", newKeys: ["d", "k"], intro: "Your middle fingers rest on D and K, right next to your index fingers. Press each key without moving your hand." },
  { id: "home-sl", unit: "home", title: "S and L", kind: "letters", newKeys: ["s", "l"], intro: "Your ring fingers rest on S and L. Keep your wrists level and let only the finger move." },
  { id: "home-a-semicolon", unit: "home", title: "A and ;", kind: "letters", newKeys: ["a", ";"], intro: "Your pinkies rest on A and the semicolon (;). Now all eight fingers are on the home row." },
  { id: "home-gh", unit: "home", title: "G and H", kind: "letters", newKeys: ["g", "h"], intro: "Slide your left index finger one key right to G, and your right index finger one key left to H. Return to F and J after each one." },
  { id: "home-review", unit: "home", title: "Home row review", kind: "review", newKeys: [], intro: "Real words from the home row. Keep your eyes on the screen and feel for the bumps on F and J if you lose your place." },

  { id: "top-ei", unit: "top", title: "E and I", kind: "letters", newKeys: ["e", "i"], intro: "Reach up with your middle fingers: left middle from D to E, right middle from K to I. Come straight back down." },
  { id: "top-ru", unit: "top", title: "R and U", kind: "letters", newKeys: ["r", "u"], intro: "Your index fingers reach up: left index from F to R, right index from J to U." },
  { id: "top-ty", unit: "top", title: "T and Y", kind: "letters", newKeys: ["t", "y"], intro: "Index fingers again, reaching a little farther: left index up and right to T, right index up and left to Y." },
  { id: "top-wo", unit: "top", title: "W and O", kind: "letters", newKeys: ["w", "o"], intro: "Ring fingers reach up: left ring from S to W, right ring from L to O." },
  { id: "top-qp", unit: "top", title: "Q and P", kind: "letters", newKeys: ["q", "p"], intro: "Pinkies reach up: left pinky from A to Q, right pinky from ; to P. Keep the other fingers near home." },
  { id: "top-review", unit: "top", title: "Top row review", kind: "review", newKeys: [], intro: "Words that use the top row and the home row together. Accuracy first; speed comes later." },

  { id: "bottom-vm", unit: "bottom", title: "V and M", kind: "letters", newKeys: ["v", "m"], intro: "Index fingers reach down: left index from F down and right to V, right index from J down to M." },
  { id: "bottom-bn", unit: "bottom", title: "B and N", kind: "letters", newKeys: ["b", "n"], intro: "B belongs to your left index finger (reach down and to the right). N belongs to your right index finger (down and to the left)." },
  { id: "bottom-c-comma", unit: "bottom", title: "C and comma", kind: "letters", newKeys: ["c", ","], intro: "Middle fingers reach down: left middle from D to C, right middle from K to the comma." },
  { id: "bottom-x-period", unit: "bottom", title: "X and period", kind: "letters", newKeys: ["x", "."], intro: "Ring fingers reach down: left ring from S to X, right ring from L to the period." },
  { id: "bottom-z-slash", unit: "bottom", title: "Z and slash", kind: "letters", newKeys: ["z", "/"], intro: "Pinkies reach down: left pinky from A to Z, right pinky from ; to the slash (/)." },
  { id: "bottom-review", unit: "bottom", title: "Bottom row review", kind: "review", newKeys: [], intro: "Every letter on the keyboard is yours now. Type these words without looking down." },

  { id: "num-4567", unit: "numbers", title: "4, 5, 6 and 7", kind: "numbers", newKeys: ["4", "5", "6", "7"], intro: "Index fingers reach two rows up: left index for 4 and 5, right index for 6 and 7." },
  { id: "num-38", unit: "numbers", title: "3 and 8", kind: "numbers", newKeys: ["3", "8"], intro: "Middle fingers reach two rows up: left middle to 3, right middle to 8." },
  { id: "num-29", unit: "numbers", title: "2 and 9", kind: "numbers", newKeys: ["2", "9"], intro: "Ring fingers reach two rows up: left ring to 2, right ring to 9." },
  { id: "num-10", unit: "numbers", title: "1 and 0", kind: "numbers", newKeys: ["1", "0"], intro: "Pinkies reach two rows up: left pinky to 1, right pinky to 0 (zero, not the letter O)." },
  { id: "num-review", unit: "numbers", title: "Numbers at work", kind: "review", newKeys: [], intro: "Room numbers, ZIP codes, and quantities, the way they show up at a front desk. Check every digit." },

  { id: "shift-capitals", unit: "shift", title: "Shift for capital letters", kind: "capitals", newKeys: CAPS, intro: "Hold Shift with the pinky of the OTHER hand: right Shift for letters typed with your left hand, left Shift for letters typed with your right hand." },
  { id: "shift-question-apostrophe", unit: "shift", title: "Question mark and apostrophe", kind: "punctuation", newKeys: ["?", "'"], intro: "The question mark is Shift + / (right pinky, with left Shift). The apostrophe is the key right of ; (right pinky, no Shift)." },
  { id: "shift-colon-hyphen", unit: "shift", title: "Colon and hyphen", kind: "punctuation", newKeys: [":", "-"], intro: "The colon is Shift + ; (right pinky, with left Shift). The hyphen is right of 0 on the number row (right pinky)." },
  { id: "shift-parens-at", unit: "shift", title: "Parentheses and @", kind: "punctuation", newKeys: ["(", ")", "@"], intro: "Parentheses are Shift + 9 and Shift + 0 (right ring and right pinky, with left Shift). The @ sign is Shift + 2 (left ring, with right Shift)." },
  { id: "shift-review", unit: "shift", title: "Workplace sentences", kind: "review", newKeys: [], intro: "Full sentences from a medical office: capitals, numbers, and punctuation together." },
];

export function lessonById(id: string): KeyLesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function lessonIndex(id: string): number {
  return LESSONS.findIndex((l) => l.id === id);
}

/** Every character a student may be asked to type in a lesson (keys learned so far, plus Space). */
export function allowedChars(id: string): Set<string> {
  const i = lessonIndex(id);
  const s = new Set<string>([" "]);
  for (let j = 0; j <= i; j++) for (const k of LESSONS[j].newKeys) s.add(k);
  return s;
}

/** Keys learned in a unit, for review lessons. */
function unitKeys(unit: UnitId): string[] {
  return LESSONS.filter((l) => l.unit === unit).flatMap((l) => l.newKeys);
}

export interface Drill {
  title: string;
  text: string;
}

function fits(text: string, allowed: Set<string>): boolean {
  for (const ch of text) if (!allowed.has(ch)) return false;
  return true;
}

/** Join tokens with spaces, stopping near `max` characters. */
function joinUpTo(tokens: string[], max: number, min = 1): string {
  const out: string[] = [];
  let len = 0;
  for (const t of tokens) {
    if (out.length >= min && len + t.length + 1 > max) break;
    out.push(t);
    len += t.length + 1;
  }
  return out.join(" ");
}

/** "ded kik ded kik" style anchor drill for the new keys. */
function keyDrill(lesson: KeyLesson, allowed: Set<string>, r: () => number): string {
  const keys = lesson.newKeys;
  const tokens: string[] = [];
  if (lesson.kind === "capitals") {
    const order = ["A", "S", "D", "F", "J", "K", "L", "G", "H", "E", "I", "R", "U", "T", "O"];
    for (const c of order) tokens.push(`${c}${c.toLowerCase()}`);
    return joinUpTo(tokens, 70);
  }
  for (const k of keys) {
    const home = HOME_KEY[keyFor(k).finger];
    const anchor = home && home !== k && allowed.has(home) ? `${home}${k}${home}` : `${k}${k}${k}`;
    tokens.push(anchor, anchor);
  }
  for (const k of keys) tokens.push(`${k}${k}`);
  if (keys.length >= 2) {
    for (let n = 0; n < 4; n++) tokens.push(shuffle(r, keys).slice(0, Math.min(3, keys.length)).join(""));
  }
  for (const k of keys) {
    const home = HOME_KEY[keyFor(k).finger];
    if (home && home !== k && allowed.has(home)) tokens.push(`${home}${k}${home}`);
  }
  return joinUpTo(tokens.filter((t) => fits(t, allowed)), 64);
}

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

/** Short practice groups (not real words) weighted toward the new keys. */
function mixDrill(lesson: KeyLesson, allowed: Set<string>, r: () => number): string {
  const letters = LETTERS.split("").filter((c) => allowed.has(c));
  const fresh = lesson.newKeys.filter((c) => LETTERS.includes(c));
  const tokens: string[] = [];
  for (let n = 0; n < 14; n++) {
    const len = 2 + Math.floor(r() * 3);
    let t = "";
    for (let i = 0; i < len; i++) t += fresh.length && r() < 0.5 ? pick(r, fresh) : pick(r, letters);
    if (lesson.newKeys.includes(";") && r() < 0.3) t += ";";
    if (lesson.newKeys.includes(",") && r() < 0.35) t += ",";
    if (lesson.newKeys.includes(".") && r() < 0.35) t += ".";
    if (lesson.newKeys.includes("/") && r() < 0.3) t = `${t}/${pick(r, letters)}`;
    tokens.push(t);
  }
  return joinUpTo(tokens.filter((t) => fits(t, allowed)), 60);
}

/** Real words that use only learned letters, with words containing the new keys first. */
function wordDrill(lesson: KeyLesson, allowed: Set<string>, r: () => number, focus: string[]): string | null {
  const ok = WORDS.filter((w) => fits(w, allowed));
  const withFocus = ok.filter((w) => focus.some((k) => w.includes(k)));
  const pool = withFocus.length >= 8 ? withFocus : ok;
  if (pool.length < 6) return null;
  const picked = shuffle(r, pool);
  let text = joinUpTo(picked, 62, 4);
  if (lesson.newKeys.includes(",")) text = text.replace(/ /g, (m, i: number) => (i % 3 === 0 ? ", " : m)).replace(/, ,/g, ",");
  if (lesson.newKeys.includes(".")) text = `${text}.`;
  return fits(text, allowed) ? text : null;
}

/** Phrases for the number lessons (lowercase: Shift comes later). */
const NUMBER_PHRASES = [
  "room 4", "room 14", "room 27", "suite 210", "suite 305", "page 3 of 8", "order 4590", "extension 207", "extension 316",
  "zip code 11201", "zip code 11226", "zip code 11373", "check in 15 minutes early", "bring 2 forms of id", "fill out 3 forms",
  "the visit takes 30 minutes", "call back in 10 minutes", "order 12 boxes of gloves", "print 25 copies", "file 48 charts",
  "the lab opens at 7", "refill 90 tablets", "the fee is 25 dollars", "floor 6", "box 1078", "aisle 9", "lot 56", "unit 4b",
  "47 patients today", "36 calls", "seat 18", "bus 64", "route 75", "dock 3",
];

/** Sentences for capitals, punctuation, and the final review. Each lesson keeps only those it can type. */
const SENTENCES = [
  "Lakeside Medical Associates opens at 8 a.m. on weekdays.",
  "Dr. Patel sees new patients on Mondays and Thursdays.",
  "Please bring your insurance card and a photo ID.",
  "The front desk is in Suite 210 on the second floor.",
  "Ms. Rivera needs a follow-up visit in two weeks.",
  "Mr. Chen asked to move his visit to Friday.",
  "Grace Kim checked in at the front desk.",
  "The billing office is next to Room 4.",
  "Thank you for calling Lakeside Medical Associates.",
  "Our office is closed on Saturday and Sunday.",
  "Is the patient in Room 6 ready for the nurse?",
  "Can you confirm your date of birth for me?",
  "Would you like a reminder by text or by phone?",
  "Dr. Patel's schedule is full on Monday.",
  "The patient's insurance card is on file.",
  "We'll call you when the lab results are in.",
  "I'm sorry, the doctor is running late today.",
  "Your appointment is at 10:30 a.m. on Tuesday.",
  "Office hours: Monday to Friday, 8:00 a.m. to 5:00 p.m.",
  "Please arrive 15 minutes early to fill out your forms.",
  "Her follow-up visit is a two-week check-in.",
  "The walk-in clinic closes at 4:30 p.m.",
  "Call the front desk at (718) 555-0142.",
  "The fax number is (718) 555-0177.",
  "Send the referral to referrals@lakesidemed.example today.",
  "Email billing@lakesidemed.example with any questions.",
  "Patient portal help: portal@lakesidemed.example",
  "The member ID (on the front of the card) starts with LMA.",
  "Dr. Okafor (internal medicine) is in Suite 305.",
  "Can I get a callback number? Is (347) 555-0186 still good?",
  "Hi Ms. Thomas, your forms are ready at the front desk.",
  "Please call us if you need to cancel or reschedule.",
  "The new patient form is two pages long.",
  "Mr. Lopez paid his copay of 25 dollars.",
  "Room 3 is ready, and Dr. Patel is on her way.",
  "Keep your eyes on the screen and your fingers on the home row.",
];

function numberDrillMix(lesson: KeyLesson, allowed: Set<string>, r: () => number): string {
  const digits = "0123456789".split("").filter((d) => allowed.has(d));
  const fresh = lesson.newKeys.filter((k) => /\d/.test(k));
  const tokens: string[] = [];
  for (let n = 0; n < 12; n++) {
    const len = 2 + Math.floor(r() * 3);
    let t = "";
    for (let i = 0; i < len; i++) t += fresh.length && r() < 0.55 ? pick(r, fresh) : pick(r, digits);
    tokens.push(t);
  }
  return joinUpTo(tokens, 56);
}

function phraseDrill(pool: string[], allowed: Set<string>, r: () => number, mustHave: string[], max: number, sep: string): string | null {
  const ok = pool.filter((p) => fits(p, allowed));
  const focused = mustHave.length ? ok.filter((p) => mustHave.some((k) => p.includes(k))) : ok;
  const use = focused.length >= 2 ? focused : ok;
  if (!use.length) return null;
  const picked = shuffle(r, use);
  const out: string[] = [];
  let len = 0;
  for (const p of picked) {
    if (out.length && len + p.length + sep.length > max) break;
    out.push(p);
    len += p.length + sep.length;
  }
  const text = out.join(sep);
  return fits(text, allowed) ? text : null;
}

/** The three drills for a lesson. A seed gives new text for each attempt. */
export function lessonDrills(id: string, seed: number): Drill[] {
  const lesson = lessonById(id);
  if (!lesson) return [];
  const allowed = allowedChars(id);
  const r = rng(seed * 7919 + lessonIndex(id) * 104729 + 1);
  const drills: Drill[] = [];

  if (lesson.kind === "letters") {
    drills.push({ title: "Learn the keys", text: keyDrill(lesson, allowed, r) });
    drills.push({ title: "Mix it up", text: mixDrill(lesson, allowed, r) });
    const words = wordDrill(lesson, allowed, r, lesson.newKeys);
    drills.push(words ? { title: "Real words", text: words } : { title: "More practice", text: mixDrill(lesson, allowed, r) });
  } else if (lesson.kind === "numbers") {
    drills.push({ title: "Learn the keys", text: keyDrill(lesson, allowed, r) });
    drills.push({ title: "Number groups", text: numberDrillMix(lesson, allowed, r) });
    const phrases = phraseDrill(NUMBER_PHRASES, allowed, r, lesson.newKeys, 70, ", ");
    drills.push({ title: "Numbers at the front desk", text: phrases ?? numberDrillMix(lesson, allowed, r) });
  } else if (lesson.kind === "capitals") {
    drills.push({ title: "Learn the Shift keys", text: keyDrill(lesson, allowed, r) });
    const words = WORDS.filter((w) => fits(w, allowed) && w.length > 2);
    const caps = shuffle(r, words)
      .slice(0, 12)
      .map((w, i) => (i % 2 === 0 ? w[0].toUpperCase() + w.slice(1) : w));
    const names = ["Lakeside", "Medical", "Associates", "Brooklyn", "Monday", "Friday", "Maria", "James", "Keisha", "Omar", "Priya", "Luis"];
    drills.push({ title: "Capital letters", text: joinUpTo(shuffle(r, [...names.slice(0, 6), ...caps]), 64) });
    drills.push({ title: "Sentences", text: phraseDrill(SENTENCES, allowed, r, CAPS, 110, " ") ?? "Lakeside Medical Associates." });
  } else if (lesson.kind === "punctuation") {
    const anchors = lesson.newKeys.map((k) => {
      if (k === "?") return "/?/ ?";
      if (k === "'") return ";'; '";
      if (k === ":") return ";:; :";
      if (k === "-") return ";-; -";
      if (k === "(") return "l(l (";
      if (k === ")") return ";); )";
      if (k === "@") return "s@s @";
      return `${k}${k}`;
    });
    const examples: Record<string, string[]> = {
      "?": ["Ready?", "Is it Monday?", "Who is next?", "Can I help?"],
      "'": ["it's", "we'll", "I'm", "Dr. Patel's", "don't", "patient's"],
      ":": ["Note:", "Time: 9:15", "Room: 4", "10:30 a.m.", "Re: Visit"],
      "-": ["follow-up", "check-in", "walk-in", "two-week", "555-0142"],
      "(": ["(718)", "(347)", "(212)"],
      ")": ["(Room 4)", "(new)"],
      "@": ["info@lakesidemed.example", "billing@lakesidemed.example"],
    };
    const ex = lesson.newKeys.flatMap((k) => examples[k] ?? []).filter((t) => fits(t, allowed));
    drills.push({ title: "Learn the keys", text: [...anchors, ...anchors].join(" ") });
    drills.push({ title: "Short examples", text: joinUpTo(shuffle(r, [...ex, ...ex]), 64) });
    drills.push({ title: "Sentences", text: phraseDrill(SENTENCES, allowed, r, lesson.newKeys, 120, " ") ?? ex.join(" ") });
  } else {
    // review
    if (lesson.unit === "numbers") {
      drills.push({ title: "Front desk numbers", text: phraseDrill(NUMBER_PHRASES, allowed, r, [], 70, ", ") ?? "" });
      drills.push({ title: "More numbers", text: phraseDrill(NUMBER_PHRASES, allowed, r, [], 70, ", ") ?? "" });
      drills.push({ title: "Number groups", text: numberDrillMix({ ...lesson, newKeys: [] }, allowed, r) });
    } else if (lesson.unit === "shift") {
      drills.push({ title: "Front desk sentences", text: phraseDrill(SENTENCES, allowed, r, [], 120, " ") ?? "" });
      drills.push({ title: "Phone and email", text: phraseDrill(SENTENCES, allowed, r, ["(", "@", ":"], 120, " ") ?? "" });
      drills.push({ title: "Questions and replies", text: phraseDrill(SENTENCES, allowed, r, ["?", "'"], 120, " ") ?? "" });
    } else {
      const focus = unitKeys(lesson.unit);
      for (const title of ["Review words", "More review words", "Final round"]) {
        drills.push({ title, text: wordDrill({ ...lesson, newKeys: focus }, allowed, r, focus) ?? mixDrill({ ...lesson, newKeys: focus }, allowed, r) });
      }
    }
  }
  return drills.filter((d) => d.text.trim().length > 0);
}

/** Accuracy a drill needs to count as passed. Accuracy before speed. */
export const PASS_ACCURACY = 95;
