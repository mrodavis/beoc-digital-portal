"use client";

import { memo, useLayoutEffect, useRef, useState } from "react";
import type { KeyLike, TypingState } from "./useTyping";

/**
 * The text to type, with the cursor, mistakes marked in place, and a hidden
 * input that receives the keys. Only keys pressed while this input has focus
 * are used, and browser shortcuts (Ctrl, Cmd, Alt) always pass through.
 * Tab moves focus on as usual, so the page stays keyboard-friendly.
 */
export default function TypingView({
  state,
  onKey,
  onText,
  label,
  locked = false,
  variant = "passage",
  lines = 3,
  inputRef,
}: {
  state: TypingState;
  onKey: (e: KeyLike) => boolean;
  onText: (t: string) => void;
  /** Accessible name for the typing box. */
  label: string;
  locked?: boolean;
  variant?: "passage" | "drill";
  lines?: number;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}) {
  const ownRef = useRef<HTMLTextAreaElement>(null);
  const input = inputRef ?? ownRef;
  const box = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const lineHeight = variant === "drill" ? 52 : 40;

  // Keep the line with the cursor in view without scrolling the page.
  useLayoutEffect(() => {
    const el = box.current;
    const cur = el?.querySelector<HTMLElement>('[data-cur="1"]');
    if (!el || !cur) return;
    const top = cur.offsetTop;
    el.scrollTop = Math.max(0, top - (lines > 2 ? lineHeight : 0));
  }, [state.typed.length, lines, lineHeight]);

  const done = state.finishedAt !== null;
  const strictWrong = state.mode === "strict" && state.wrongKey !== null;

  return (
    <div className="relative">
      <textarea
        ref={input}
        aria-label={label}
        aria-describedby="typing-status"
        className="absolute left-0 top-0 h-px w-px resize-none overflow-hidden opacity-0"
        value=""
        readOnly={locked || done}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        onKeyDown={(e) => {
          if (locked || done) return;
          if (onKey(e)) e.preventDefault();
        }}
        onChange={(e) => {
          if (!locked && !done && e.target.value) onText(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div
        ref={box}
        onClick={() => input.current?.focus()}
        className={`relative cursor-text overflow-hidden rounded-xl border-2 bg-white px-4 py-2 sm:px-6 ${
          focused ? "border-primary-600 ring-4 ring-primary-200" : "border-gray-300"
        } ${variant === "drill" ? "font-mono text-2xl tracking-wide sm:text-[28px]" : "text-lg sm:text-xl"}`}
        style={{ height: lines * lineHeight + 16, lineHeight: `${lineHeight}px`, fontFamily: variant === "drill" ? "Consolas, 'Cascadia Mono', Menlo, 'Courier New', monospace" : undefined }}
      >
        <Chars text={state.text} typed={state.typed} strictWrong={strictWrong} done={done} />
      </div>
      {!focused && !done && !locked && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => input.current?.focus()}
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 text-base font-semibold text-primary-800"
        >
          {state.typed.length ? "Click here (or press Tab) to keep typing" : "Click here (or press Tab), then start typing"}
        </button>
      )}
    </div>
  );
}

/** Characters are memoized on what changes them, so a 3,000-character test stays fast. */
const Chars = memo(function Chars({ text, typed, strictWrong, done }: { text: string; typed: string; strictWrong: boolean; done: boolean }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const isTyped = i < typed.length;
    const wrong = isTyped && typed[i] !== ch;
    const cur = i === typed.length && !done;
    let cls = "text-gray-900";
    if (isTyped) cls = wrong ? "rounded-sm bg-red-100 text-red-700 underline decoration-red-600 decoration-2 underline-offset-4" : "text-emerald-800";
    if (cur) cls = strictWrong ? "rounded-sm bg-red-100 text-red-800 outline outline-2 outline-red-600" : "rounded-sm bg-primary-100 text-gray-900 shadow-[inset_0_-3px_0_#1d4ed8]";
    out.push(
      <span key={i} data-cur={cur ? "1" : undefined} className={cls}>
        {ch === " " && (wrong || (cur && strictWrong)) ? " " : ch}
      </span>,
    );
  }
  return <>{out}</>;
});
