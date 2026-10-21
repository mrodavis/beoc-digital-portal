"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PASSAGES } from "@/lib/typing-lab/passages";
import { drillWpm, keystrokeAccuracy } from "@/lib/typing-lab/scoring";
import { freshSeed, pick, rng } from "@/lib/typing-lab/rng";
import { recordDrill } from "@/lib/typing-lab/storage";
import { useTyping } from "./useTyping";
import TypingView from "./TypingView";

const PACES = [20, 30, 40, 50, 60];

/** The first two or three sentences of a passage, about 150 to 260 characters. */
function raceText(seed: number): string {
  const p = pick(rng(seed), PASSAGES.filter((x) => x.topic !== "email"));
  const sentences = p.text.match(/[^.?!]+[.?!]+(\s|$)/g) ?? [p.text];
  let out = "";
  for (const s of sentences) {
    if (out.length >= 150) break;
    out += s;
  }
  return out.trim();
}

function Car({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 64 28" width="56" height="25" role="img" aria-label={label}>
      <rect x="4" y="9" width="56" height="12" rx="5" fill={color} />
      <path d="M16 9 L22 2 H40 L48 9 Z" fill={color} />
      <path d="M24 4 H38 L43 9 H20 Z" fill="#e0f2fe" />
      <circle cx="17" cy="22" r="5" fill="#111827" />
      <circle cx="47" cy="22" r="5" fill="#111827" />
    </svg>
  );
}

export default function PaceRace() {
  const [pace, setPace] = useState(30);
  const [seed, setSeed] = useState(3);
  const text = useMemo(() => raceText(seed), [seed]);
  const { state, onKey, onText, reset } = useTyping(text, "strict");
  const [now, setNow] = useState(0);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setSeed(freshSeed()), []);
  useEffect(() => {
    reset(text, "strict");
    setSaved(false);
  }, [text, reset]);
  useEffect(() => {
    if (state.startedAt === null || state.finishedAt !== null) return;
    const t = setInterval(() => setNow(Date.now()), 150);
    return () => clearInterval(t);
  }, [state.startedAt, state.finishedAt]);

  const started = state.startedAt !== null;
  const finished = state.finishedAt !== null;
  const secs = !started ? 0 : ((state.finishedAt ?? now) - (state.startedAt as number)) / 1000;
  const paceChars = (pace * 5 * secs) / 60;
  const pacePos = Math.min(1, paceChars / text.length);
  const youPos = state.typed.length / text.length;
  const paceDoneAt = (text.length / (pace * 5)) * 60;
  const won = finished && secs <= paceDoneAt;
  const wpm = finished ? drillWpm(text.length, secs) : started && secs > 2 ? drillWpm(state.typed.length, secs) : 0;
  const acc = keystrokeAccuracy(state.keystrokes, state.mistakes);

  useEffect(() => {
    if (!finished || saved) return;
    recordDrill({ at: new Date().toISOString(), drill: "race", score: `${wpm} WPM against a ${pace} WPM pace car (${won ? "won" : "pace car won"})`, accuracy: acc });
    setSaved(true);
  }, [finished, saved, wpm, pace, won, acc]);

  const again = (newPace?: number) => {
    if (newPace) setPace(newPace);
    setSeed(freshSeed());
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="space-y-5">
      <fieldset disabled={started && !finished} className="flex flex-wrap items-center gap-2">
        <legend className="mb-1.5 text-sm font-semibold text-gray-900">Pace car speed</legend>
        {PACES.map((p) => (
          <label key={p} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 ${pace === p ? "border-primary-700 bg-primary-700 text-white" : "border-gray-300 bg-white text-gray-800"}`}>
            <input type="radio" name="pace" className="sr-only" checked={pace === p} onChange={() => setPace(p)} />
            {p} WPM
          </label>
        ))}
      </fieldset>

      <div className="space-y-2 rounded-2xl border border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200 p-3" aria-label="Race track">
        {[
          { who: "You", pos: youPos, color: "#1d4ed8" },
          { who: `Pace car (${pace} WPM)`, pos: pacePos, color: "#b45309" },
        ].map((lane) => (
          <div key={lane.who} className="relative h-12 rounded-lg border-y-2 border-dashed border-white/80 bg-gray-500/80">
            <span className="absolute left-2 top-1 text-xs font-semibold text-white">{lane.who}</span>
            <div className="absolute right-3 top-0 h-full w-2 bg-[repeating-linear-gradient(0deg,#fff_0_6px,#111827_6px_12px)]" aria-hidden="true" />
            <div className="absolute bottom-0.5 motion-safe:transition-[left] motion-safe:duration-150 motion-safe:ease-linear" style={{ left: `calc(${lane.pos} * (100% - 76px) + 4px)` }}>
              <Car color={lane.color} label={lane.who} />
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {finished ? (won ? "You finished ahead of the pace car." : "The pace car finished first.") : ""}
      </p>

      {!finished && (
        <>
          <TypingView state={state} onKey={onKey} onText={onText} inputRef={inputRef} label={`Race against a ${pace} words per minute pace car. Type the text shown; a wrong key does not move your car.`} lines={3} />
          <p id="typing-status" className={`text-sm ${state.wrongKey !== null ? "font-semibold text-red-800" : "text-gray-700"}`}>
            {state.wrongKey !== null ? "Wrong key. Your car waits until you press the right one." : "Your car moves with every correct key. The pace car starts on your first key."}
          </p>
        </>
      )}

      {finished && (
        <div role="status" className={`rounded-2xl border-2 p-5 ${won ? "border-emerald-600 bg-emerald-50" : "border-amber-500 bg-amber-50"}`}>
          <p className="text-xl font-bold text-gray-900">{won ? "You beat the pace car!" : "The pace car got there first."}</p>
          <p className="mt-1 text-gray-800">
            You typed {wpm} WPM with {acc}% of your keys right the first time.
            {won ? " Try a faster pace car when you are ready." : " Keep your accuracy up and try again, or pick a slower pace car."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => again()} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              Race again
            </button>
            {won && PACES.find((p) => p > pace) && (
              <button type="button" onClick={() => again(PACES.find((p) => p > pace))} className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100">
                Race the {PACES.find((p) => p > pace)} WPM car
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
