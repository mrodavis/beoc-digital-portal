"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MEDICAL_TERMS, termsText } from "@/lib/typing-lab/drills";
import { scoreTest } from "@/lib/typing-lab/scoring";
import { recordDrill } from "@/lib/typing-lab/storage";
import { useTyping } from "./useTyping";
import TypingView from "./TypingView";
import PrintPanel from "./PrintPanel";

function clock(sec: number) {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function TermsDrill() {
  const [rounds, setRounds] = useState<1 | 3>(3);
  const { text, spans } = useMemo(() => termsText(rounds), [rounds]);
  const { state, onKey, onText, reset } = useTyping(text, "free");
  const [now, setNow] = useState(0);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    reset(text, "free");
    setSaved(false);
  }, [text, reset]);
  useEffect(() => {
    if (state.startedAt === null || state.finishedAt !== null) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [state.startedAt, state.finishedAt]);

  const done = state.finishedAt !== null && state.startedAt !== null;
  const secs = state.startedAt === null ? 0 : ((state.finishedAt ?? now) - state.startedAt) / 1000;
  const score = done ? scoreTest(state.text, state.typed, secs, state.mistakes) : null;
  // A term "had errors" if any wrong key was pressed inside it, fixed or not.
  const missed = useMemo(() => {
    const set = new Map<string, number>();
    for (const pos of state.mistakeAt) {
      const s = spans.find((sp) => pos >= sp.start && pos < sp.end + 1);
      if (s) set.set(s.term, (set.get(s.term) ?? 0) + 1);
    }
    return [...set.entries()].sort((a, b) => b[1] - a[1]);
  }, [state.mistakeAt, spans]);

  useEffect(() => {
    if (!done || saved || !score) return;
    recordDrill({ at: new Date().toISOString(), drill: "medical-terms", score: `${MEDICAL_TERMS.length * rounds} terms in ${clock(secs)}, ${missed.length} with errors`, accuracy: score.accuracy });
    setSaved(true);
  }, [done, saved, score, rounds, secs, missed.length]);

  return (
    <div className="space-y-5">
      <fieldset disabled={state.startedAt !== null && !done} className="flex flex-wrap gap-2">
        <legend className="mb-1.5 text-sm font-semibold text-gray-900">How many times</legend>
        {([3, 1] as const).map((n) => (
          <label key={n} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 ${rounds === n ? "border-primary-700 bg-primary-50 text-primary-900" : "border-gray-300 bg-white text-gray-800"}`}>
            <input type="radio" name="terms-rounds" className="sr-only" checked={rounds === n} onChange={() => setRounds(n)} />
            {n === 3 ? "Each term three times (42 entries)" : "Each term once (14 entries)"}
          </label>
        ))}
      </fieldset>

      {!done && (
        <>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-800">
            <span>
              Time <strong className="tabular-nums">{clock(secs)}</strong>
            </span>
            <span>Wrong keys so far: {state.mistakes}</span>
            <span>Backspace fixes a mistake.</span>
          </div>
          <TypingView state={state} onKey={onKey} onText={onText} inputRef={inputRef} label="Medical terms drill. Type each term exactly, with a space between terms." lines={3} />
          <p id="typing-status" className="sr-only" aria-live="polite">
            {state.capsLock ? "Caps Lock is on." : ""}
          </p>
          <button type="button" onClick={() => { reset(text, "free"); setTimeout(() => inputRef.current?.focus(), 30); }} className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            Start over
          </button>
        </>
      )}

      {done && score && (
        <section aria-labelledby="terms-results" className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 id="terms-results" className="text-2xl font-bold text-gray-900">
            Medical terms results
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border-2 border-primary-700 bg-primary-50 p-4">
              <div className="text-sm font-semibold text-gray-700">Time</div>
              <div className="text-3xl font-bold text-gray-900">{clock(secs)}</div>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-700">Accuracy</div>
              <div className="text-3xl font-bold text-gray-900">{score.accuracy}%</div>
              <div className="text-sm text-gray-700">{score.uncorrected} left uncorrected</div>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-700">Net WPM</div>
              <div className="text-3xl font-bold text-gray-900">{score.net}</div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Terms where you made errors</h3>
            {missed.length ? (
              <ul className="flex flex-wrap gap-2">
                {missed.map(([t, n]) => (
                  <li key={t} className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-red-900">
                    {t} <span className="text-sm">({n})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800">None. Every term was typed without a wrong key.</p>
            )}
            <p className="mt-2 text-sm text-gray-700">This counts any wrong key inside a term, even one you fixed. Practice those terms again, slowly.</p>
          </div>
          <PrintPanel
            build={(studentName) => ({
              kind: "Typing Lab",
              title: "Medical Terminology Typing Drill",
              studentName,
              summary: `${MEDICAL_TERMS.length * rounds} terms in ${clock(secs)} at ${score.accuracy}% accuracy`,
              rows: [
                { label: "Entries", value: rounds === 3 ? "14 terms, three times each" : "14 terms, once each" },
                { label: "Time", value: clock(secs) },
                { label: "Accuracy", value: `${score.accuracy}%` },
                { label: "Net WPM", value: String(score.net) },
                { label: "Uncorrected errors", value: String(score.uncorrected) },
                { label: "Terms with errors", value: missed.length ? missed.map(([t, n]) => `${t} (${n})`).join(", ") : "None", ok: missed.length === 0 },
              ],
            })}
          />
          <button type="button" onClick={() => reset(text, "free")} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
            Type the list again
          </button>
        </section>
      )}
    </div>
  );
}
