/**
 * US QWERTY keyboard model shared by the Typing Lab and the typing sim engine:
 * key rows, which finger presses each key in standard touch typing, and how a
 * character maps to a key (plus which Shift key to hold).
 *
 * Pure data and functions, no React, so scripts and the sim core can load it.
 */

export type Finger = "lp" | "lr" | "lm" | "li" | "ri" | "rm" | "rr" | "rp" | "th";

export interface KeyDef {
  /** Key id: the unshifted character ("a", ";", "1", " ") or a name ("Tab", "ShiftL"). */
  k: string;
  /** Text printed on the key when it differs from the uppercase id. */
  label?: string;
  /** The character printed above, for keys with a shifted symbol. */
  shifted?: string;
  /** Width in key units (default 1). */
  w?: number;
  f: Finger;
}

export const ROWS: KeyDef[][] = [
  [
    { k: "`", shifted: "~", f: "lp" },
    { k: "1", shifted: "!", f: "lp" },
    { k: "2", shifted: "@", f: "lr" },
    { k: "3", shifted: "#", f: "lm" },
    { k: "4", shifted: "$", f: "li" },
    { k: "5", shifted: "%", f: "li" },
    { k: "6", shifted: "^", f: "ri" },
    { k: "7", shifted: "&", f: "ri" },
    { k: "8", shifted: "*", f: "rm" },
    { k: "9", shifted: "(", f: "rr" },
    { k: "0", shifted: ")", f: "rp" },
    { k: "-", shifted: "_", f: "rp" },
    { k: "=", shifted: "+", f: "rp" },
    { k: "Backspace", label: "Backspace", w: 2, f: "rp" },
  ],
  [
    { k: "Tab", label: "Tab", w: 1.5, f: "lp" },
    { k: "q", f: "lp" },
    { k: "w", f: "lr" },
    { k: "e", f: "lm" },
    { k: "r", f: "li" },
    { k: "t", f: "li" },
    { k: "y", f: "ri" },
    { k: "u", f: "ri" },
    { k: "i", f: "rm" },
    { k: "o", f: "rr" },
    { k: "p", f: "rp" },
    { k: "[", shifted: "{", f: "rp" },
    { k: "]", shifted: "}", f: "rp" },
    { k: "\\", shifted: "|", w: 1.5, f: "rp" },
  ],
  [
    { k: "CapsLock", label: "Caps Lock", w: 1.8, f: "lp" },
    { k: "a", f: "lp" },
    { k: "s", f: "lr" },
    { k: "d", f: "lm" },
    { k: "f", f: "li" },
    { k: "g", f: "li" },
    { k: "h", f: "ri" },
    { k: "j", f: "ri" },
    { k: "k", f: "rm" },
    { k: "l", f: "rr" },
    { k: ";", shifted: ":", f: "rp" },
    { k: "'", shifted: '"', f: "rp" },
    { k: "Enter", label: "Enter", w: 2.2, f: "rp" },
  ],
  [
    { k: "ShiftL", label: "Shift", w: 2.4, f: "lp" },
    { k: "z", f: "lp" },
    { k: "x", f: "lr" },
    { k: "c", f: "lm" },
    { k: "v", f: "li" },
    { k: "b", f: "li" },
    { k: "n", f: "ri" },
    { k: "m", f: "ri" },
    { k: ",", shifted: "<", f: "rm" },
    { k: ".", shifted: ">", f: "rr" },
    { k: "/", shifted: "?", f: "rp" },
    { k: "ShiftR", label: "Shift", w: 2.6, f: "rp" },
  ],
  [{ k: " ", label: "Space", w: 7, f: "th" }],
];

/** Pastel fill per finger, mirrored across hands. Dark text on all of them passes WCAG AA. */
export const FINGER_COLOR: Record<Finger, string> = {
  lp: "#fde68a",
  lr: "#bbf7d0",
  lm: "#bfdbfe",
  li: "#fbcfe8",
  ri: "#fbcfe8",
  rm: "#bfdbfe",
  rr: "#bbf7d0",
  rp: "#fde68a",
  th: "#e5e7eb",
};

/** A stronger shade of the same hue, for the active finger in the hands guide. */
export const FINGER_STRONG: Record<Finger, string> = {
  lp: "#d97706",
  lr: "#16a34a",
  lm: "#2563eb",
  li: "#db2777",
  ri: "#db2777",
  rm: "#2563eb",
  rr: "#16a34a",
  rp: "#d97706",
  th: "#4b5563",
};

export const FINGER_NAME: Record<Finger, string> = {
  lp: "left pinky",
  lr: "left ring finger",
  lm: "left middle finger",
  li: "left index finger",
  ri: "right index finger",
  rm: "right middle finger",
  rr: "right ring finger",
  rp: "right pinky",
  th: "thumb",
};

/** Home-row key each finger rests on. */
export const HOME_KEY: Record<Finger, string> = { lp: "a", lr: "s", lm: "d", li: "f", ri: "j", rm: "k", rr: "l", rp: ";", th: " " };

/** Shifted character -> the key it is on. */
export const SHIFTED: Record<string, string> = Object.fromEntries(
  ROWS.flat()
    .filter((r) => r.shifted)
    .map((r) => [r.shifted as string, r.k]),
);

export const KEY_FINGER: Record<string, Finger> = Object.fromEntries(ROWS.flat().map((r) => [r.k, r.f]));

export interface KeyFor {
  /** The key id to press. */
  key: string;
  /** Which Shift to hold (the one on the other hand), or null. */
  shift: "ShiftL" | "ShiftR" | null;
  finger: Finger;
}

/** The key (and Shift) that types a character. Unknown characters fall back to the thumb. */
export function keyFor(ch: string): KeyFor {
  if (ch === " ") return { key: " ", shift: null, finger: "th" };
  if (ch === "\n") return { key: "Enter", shift: null, finger: "rp" };
  let base = ch;
  let shifted = false;
  if (SHIFTED[ch]) {
    base = SHIFTED[ch];
    shifted = true;
  } else if (/^[A-Z]$/.test(ch)) {
    base = ch.toLowerCase();
    shifted = true;
  }
  const finger = KEY_FINGER[base] ?? "th";
  const leftHand = finger.startsWith("l");
  return { key: base, shift: shifted ? (leftHand ? "ShiftR" : "ShiftL") : null, finger };
}

/** "J with your right index finger", "Shift + 2 (left Shift is wrong; use right)". Plain words for a hint line. */
export function describeKey(ch: string): string {
  if (ch === " ") return "Press the space bar with your thumb";
  const kf = keyFor(ch);
  if (!kf.shift) return `Press ${displayChar(ch)} with your ${FINGER_NAME[kf.finger]}`;
  const shiftHand = kf.shift === "ShiftL" ? "left" : "right";
  return `Hold the ${shiftHand} Shift with your ${shiftHand} pinky, then press ${displayChar(kf.key)} with your ${FINGER_NAME[kf.finger]}`;
}

/** How to show a character in instructions. */
export function displayChar(ch: string): string {
  if (ch === " ") return "Space";
  if (ch === ";") return "; (semicolon)";
  if (ch === ":") return ": (colon)";
  if (ch === ",") return ", (comma)";
  if (ch === ".") return ". (period)";
  if (ch === "/") return "/ (slash)";
  if (ch === "'") return "' (apostrophe)";
  if (ch === "-") return "- (hyphen)";
  if (/^[a-z]$/.test(ch)) return ch.toUpperCase();
  if (/^[A-Z]$/.test(ch)) return `capital ${ch}`;
  return ch;
}

/** Short label for a key in lists ("Space", "J", ";"). */
export function keyLabel(ch: string): string {
  if (ch === " ") return "Space";
  if (/^[a-z]$/.test(ch)) return ch.toUpperCase();
  return ch;
}
