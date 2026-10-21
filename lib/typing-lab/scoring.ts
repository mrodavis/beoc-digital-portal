/**
 * Standard typing-test scoring.
 *
 *   A "word" is 5 characters, counting letters, numbers, spaces and punctuation.
 *   Gross WPM = (characters typed / 5) / minutes
 *   Net WPM   = Gross WPM - (uncorrected errors / minutes)      (never below 0)
 *   Accuracy  = correct characters / characters typed x 100
 *
 * "Characters typed" are the characters in the student's text at the end of
 * the test. A mistake fixed with Backspace is a corrected error: it costs time
 * (which lowers both WPM numbers) but is not subtracted again. A mistake left
 * in the text is an uncorrected error.
 */

export interface TestScore {
  /** Characters in the typed text. */
  chars: number;
  /** Typed characters that match the passage. */
  correct: number;
  /** Typed characters that do not match the passage. */
  uncorrected: number;
  /** Wrong keystrokes the student fixed before the end. */
  corrected: number;
  minutes: number;
  /** Unrounded values; round only for display. */
  grossRaw: number;
  netRaw: number;
  accuracyRaw: number;
  gross: number;
  net: number;
  /** Accuracy for display: one decimal place at most, never shown as 100 when there is an error. */
  accuracy: number;
}

/** Positions where `typed` differs from `target` (only up to typed.length). */
export function countUncorrected(target: string, typed: string): number {
  let n = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] !== target[i]) n++;
  return n;
}

export function displayAccuracy(raw: number, hasErrors: boolean): number {
  const oneDecimal = Math.floor(raw * 10) / 10;
  if (hasErrors && oneDecimal >= 100) return 99.9;
  return oneDecimal;
}

/**
 * Scores a test. `seconds` is the test length when time ran out, or the time
 * taken when the student finished the text early. `mistakes` is every wrong
 * keystroke during the test (fixed or not); corrected = mistakes - uncorrected.
 */
export function scoreTest(target: string, typed: string, seconds: number, mistakes: number): TestScore {
  const chars = typed.length;
  const uncorrected = countUncorrected(target, typed);
  const correct = chars - uncorrected;
  const minutes = Math.max(seconds, 1) / 60;
  const grossRaw = chars / 5 / minutes;
  const netRaw = Math.max(0, grossRaw - uncorrected / minutes);
  const accuracyRaw = chars ? (correct / chars) * 100 : 100;
  return {
    chars,
    correct,
    uncorrected,
    corrected: Math.max(0, mistakes - uncorrected),
    minutes,
    grossRaw,
    netRaw,
    accuracyRaw,
    gross: Math.round(grossRaw),
    net: Math.round(netRaw),
    accuracy: displayAccuracy(accuracyRaw, uncorrected > 0),
  };
}

/** Keystroke accuracy for lessons, where a wrong key does not advance: right presses / all presses. */
export function keystrokeAccuracy(keystrokes: number, mistakes: number): number {
  if (!keystrokes) return 100;
  return displayAccuracy(((keystrokes - mistakes) / keystrokes) * 100, mistakes > 0);
}

/** Speed for a lesson drill (every character ends up correct, so gross = net). */
export function drillWpm(chars: number, seconds: number): number {
  if (seconds < 1) return 0;
  return Math.round(chars / 5 / (seconds / 60));
}

/** Formats a number for the "show the math" line: at most one decimal place. */
export function fmt1(n: number): string {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

/** The worked calculation, in plain words, for the results screen and the printout. */
export function explainScore(s: TestScore): string[] {
  const min = fmt1(s.minutes);
  const minWord = s.minutes === 1 ? "minute" : "minutes";
  return [
    `Gross WPM = (${s.chars} characters ÷ 5) ÷ ${min} ${minWord} = ${fmt1(s.grossRaw)}, shown as ${s.gross}.`,
    `Net WPM = ${fmt1(s.grossRaw)} − (${s.uncorrected} uncorrected ${s.uncorrected === 1 ? "error" : "errors"} ÷ ${min} ${minWord}) = ${fmt1(s.netRaw)}, shown as ${s.net}.`,
    `Accuracy = ${s.correct} correct ÷ ${s.chars} typed × 100 = ${s.accuracy}%.`,
  ];
}

export const TEST_LENGTHS = [1, 2, 3, 5] as const;
export type TestLength = (typeof TEST_LENGTHS)[number];
