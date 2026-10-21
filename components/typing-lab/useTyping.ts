"use client";

import { useCallback, useReducer } from "react";

/**
 * Typing state for one piece of text.
 *
 * strict: a wrong key does not move forward (key lessons). The student sees
 *         the mistake right away and presses the right key to continue.
 * free:   every key moves forward and Backspace fixes mistakes (tests and
 *         drills), the way a real typing test works.
 */
export type TypingMode = "strict" | "free";

export interface TypingState {
  text: string;
  mode: TypingMode;
  typed: string;
  /** Printable keys pressed. */
  keystrokes: number;
  /** Wrong keys pressed, fixed or not. */
  mistakes: number;
  /** Expected character -> how many times a wrong key was pressed for it. */
  missByChar: Record<string, number>;
  /** Positions where at least one wrong key was pressed. */
  mistakeAt: number[];
  /** strict mode: the wrong key just pressed at the current position. */
  wrongKey: string | null;
  startedAt: number | null;
  finishedAt: number | null;
  capsLock: boolean;
}

type Action = { type: "char"; ch: string; now: number } | { type: "back"; word: boolean } | { type: "reset"; text: string; mode: TypingMode } | { type: "caps"; on: boolean };

function init(text: string, mode: TypingMode): TypingState {
  return { text, mode, typed: "", keystrokes: 0, mistakes: 0, missByChar: {}, mistakeAt: [], wrongKey: null, startedAt: null, finishedAt: null, capsLock: false };
}

function reducer(s: TypingState, a: Action): TypingState {
  switch (a.type) {
    case "reset":
      return init(a.text, a.mode);
    case "caps":
      return s.capsLock === a.on ? s : { ...s, capsLock: a.on };
    case "back": {
      if (s.mode === "strict" || s.finishedAt !== null || !s.typed.length) return s;
      let n = s.typed.length - 1;
      if (a.word) {
        while (n > 0 && s.typed[n - 1] === " ") n--;
        while (n > 0 && s.typed[n - 1] !== " ") n--;
      }
      return { ...s, typed: s.typed.slice(0, n) };
    }
    case "char": {
      if (s.finishedAt !== null) return s;
      const pos = s.typed.length;
      const expected = s.text[pos];
      if (expected === undefined) return s;
      const ok = a.ch === expected;
      const startedAt = s.startedAt ?? a.now;
      const next: TypingState = { ...s, startedAt, keystrokes: s.keystrokes + 1 };
      if (!ok) {
        next.mistakes = s.mistakes + 1;
        next.missByChar = { ...s.missByChar, [expected]: (s.missByChar[expected] ?? 0) + 1 };
        if (!s.mistakeAt.includes(pos)) next.mistakeAt = [...s.mistakeAt, pos];
      }
      if (s.mode === "strict") {
        if (!ok) return { ...next, wrongKey: a.ch };
        next.wrongKey = null;
      }
      next.typed = s.typed + a.ch;
      if (next.typed.length >= s.text.length) next.finishedAt = a.now;
      return next;
    }
  }
}

export function useTyping(text: string, mode: TypingMode) {
  const [state, dispatch] = useReducer(reducer, undefined, () => init(text, mode));

  const reset = useCallback((t: string, m: TypingMode = mode) => dispatch({ type: "reset", text: t, mode: m }), [mode]);

  /** Handles one keydown. Returns true when the key was used (the caller then prevents the default). */
  const onKey = useCallback((e: { key: string; ctrlKey: boolean; metaKey: boolean; altKey: boolean; getModifierState?: (k: string) => boolean }) => {
    if (e.getModifierState) dispatch({ type: "caps", on: Boolean(e.getModifierState("CapsLock")) });
    if (e.key === "Backspace") {
      if (e.metaKey || e.altKey) return false;
      dispatch({ type: "back", word: e.ctrlKey });
      return true;
    }
    // Leave every shortcut (Ctrl, Cmd, Alt combinations) to the browser.
    if (e.ctrlKey || e.metaKey || e.altKey) return false;
    if (e.key.length !== 1) return false;
    dispatch({ type: "char", ch: e.key, now: Date.now() });
    return true;
  }, []);

  /** Text that arrived without a usable keydown (some phone and tablet keyboards). */
  const onText = useCallback((t: string) => {
    for (const ch of t) dispatch({ type: "char", ch, now: Date.now() });
  }, []);

  return { state, onKey, onText, reset };
}
