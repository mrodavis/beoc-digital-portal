"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { allowedChars, LESSONS, lessonById, lessonDrills, lessonIndex, PASS_ACCURACY, UNITS } from "@/lib/typing-lab/lessons";
import { describeKey, displayChar, keyLabel } from "@/lib/typing-lab/keyboard";
import { drillWpm, keystrokeAccuracy } from "@/lib/typing-lab/scoring";
import { freshSeed } from "@/lib/typing-lab/rng";
import { recordLesson } from "@/lib/typing-lab/storage";
import { useTyping } from "./useTyping";
import TypingView from "./TypingView";
import KeyboardView, { FingerLegend } from "./KeyboardView";
import HandsGuide from "./HandsGuide";

interface StepResult {
  accuracy: number;
  wpm: number;
  passed: boolean;
}

export default function LessonRunner({ lessonId }: { lessonId: string }) {
  const lesson = lessonById(lessonId)!;
  const idx = lessonIndex(lessonId);
  const unit = UNITS.find((u) => u.id === lesson.unit)!;
  const nextLesson = LESSONS[idx + 1];
  const learned = useMemo(() => allowedChars(lessonId), [lessonId]);
  const [seed, setSeed] = useState(1);
  const drills = useMemo(() => lessonDrills(lessonId, seed), [lessonId, seed]);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<(StepResult | undefined)[]>([]);
  const [saved, setSaved] = useState(false);
  const { state, onKey, onText, reset } = useTyping(drills[0]?.text ?? "", "strict");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const drill = drills[step];
  useEffect(() => {
    if (drill) reset(drill.text, "strict");
  }, [drill, reset]);

  const finishedResult = useMemo<StepResult | null>(() => {
    if (state.finishedAt === null || state.startedAt === null || state.text !== drill?.text) return null;
    const accuracy = keystrokeAccuracy(state.keystrokes, state.mistakes);
    return { accuracy, wpm: drillWpm(state.text.length, (state.finishedAt - state.startedAt) / 1000), passed: accuracy >= PASS_ACCURACY };
  }, [state.finishedAt, state.startedAt, state.keystrokes, state.mistakes, state.text, drill?.text]);

  useEffect(() => {
    if (!finishedResult) return;
    setResults((r) => {
      const n = [...r];
      n[step] = finishedResult;
      return n;
    });
  }, [finishedResult, step]);

  const allPassed = drills.length > 0 && drills.every((_, i) => results[i]?.passed);
  useEffect(() => {
    if (!allPassed || saved) return;
    const rs = results.filter(Boolean) as StepResult[];
    recordLesson(lessonId, true, Math.min(...rs.map((r) => r.accuracy)), Math.round(rs.reduce((n, r) => n + r.wpm, 0) / rs.length));
    setSaved(true);
  }, [allPassed, saved, results, lessonId]);

  const focusInput = () => setTimeout(() => inputRef.current?.focus(), 30);
  const retry = () => {
    reset(drill.text, "strict");
    focusInput();
  };
  const goStep = (i: number) => {
    setStep(i);
    focusInput();
  };
  const newText = () => {
    setSeed(freshSeed());
    focusInput();
  };

  const next = state.finishedAt === null ? state.text[state.typed.length] ?? null : null;
  const live = keystrokeAccuracy(state.keystrokes, state.mistakes);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-primary-800">
          {unit.title} · Lesson {idx + 1} of {LESSONS.length}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">{lesson.title}</h1>
        <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-800">{lesson.intro}</p>
        {lesson.newKeys.length > 0 && lesson.kind !== "capitals" && (
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-700">
            New keys:
            {lesson.newKeys.map((k) => (
              <kbd key={k} className="rounded-md border border-gray-400 bg-white px-2 py-0.5 font-mono text-base font-bold text-gray-900 shadow-[0_2px_0_#9ca3af]">
                {keyLabel(k)}
              </kbd>
            ))}
          </p>
        )}
      </header>

      <ol className="flex flex-wrap gap-2" aria-label="Drills in this lesson">
        {drills.map((d, i) => {
          const r = results[i];
          const on = i === step;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => goStep(i)}
                aria-current={on ? "step" : undefined}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  on ? "border-primary-700 bg-primary-700 text-white" : r?.passed ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-gray-300 bg-white text-gray-800 hover:border-gray-500"
                }`}
              >
                <span aria-hidden="true">{r?.passed ? "✓" : i + 1}</span>
                {d.title}
                {r?.passed && <span className="sr-only">(passed)</span>}
              </button>
            </li>
          );
        })}
      </ol>

      {drill && (
        <section aria-label={`Drill: ${drill.title}`} className="space-y-3">
          <TypingView state={state} onKey={onKey} onText={onText} inputRef={inputRef} variant="drill" lines={2} label={`Drill ${step + 1}: ${drill.title}. Type the letters shown. A wrong key does not move you forward.`} />
          <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-3">
            <p id="typing-status" aria-live="polite" className={`text-base ${state.wrongKey !== null ? "font-semibold text-red-800" : "text-gray-800"}`}>
              {state.capsLock && "Caps Lock is on. Turn it off first. "}
              {state.wrongKey !== null && next !== null
                ? `You pressed ${displayChar(state.wrongKey)}. ${describeKey(next)}.`
                : next !== null
                  ? `${describeKey(next)}.`
                  : ""}
            </p>
            <p className="text-sm text-gray-700">
              Accuracy so far: <strong className="tabular-nums">{live}%</strong> (pass at {PASS_ACCURACY}%)
            </p>
          </div>
        </section>
      )}

      {finishedResult && (
        <div role="status" className={`rounded-2xl border-2 p-5 ${finishedResult.passed ? "border-emerald-600 bg-emerald-50" : "border-amber-500 bg-amber-50"}`}>
          <p className="text-lg font-bold text-gray-900">
            {finishedResult.passed ? `Passed: ${finishedResult.accuracy}% accuracy at ${finishedResult.wpm} WPM.` : `${finishedResult.accuracy}% accuracy. Aim for ${PASS_ACCURACY}% before moving on.`}
          </p>
          <p className="mt-1 text-gray-800">
            {finishedResult.passed
              ? "Accuracy first, then speed. Your speed will grow on its own as the right finger finds the right key."
              : "Slow down a little. Say each letter in your head, and let the finger shown on the hands find the key without looking down."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {!finishedResult.passed && (
              <button type="button" onClick={retry} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                Try this drill again
              </button>
            )}
            {finishedResult.passed && step < drills.length - 1 && (
              <button type="button" onClick={() => goStep(step + 1)} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                Next drill: {drills[step + 1].title}
              </button>
            )}
            {finishedResult.passed && <button type="button" onClick={retry} className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">Repeat it</button>}
          </div>
        </div>
      )}

      {allPassed && (
        <div className="rounded-2xl border-2 border-primary-700 bg-primary-50 p-5">
          <p className="text-xl font-bold text-gray-900">Lesson complete: {lesson.title}</p>
          <p className="mt-1 text-gray-800">It is saved in My Progress on this browser.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {nextLesson ? (
              <Link href={`/typing-lab/lessons/${nextLesson.id}`} className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                Next lesson: {nextLesson.title}
              </Link>
            ) : (
              <Link href="/typing-lab/tests" className="rounded-lg bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800">
                Take a timed test
              </Link>
            )}
            <button type="button" onClick={newText} className="rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
              Practice again with new text
            </button>
          </div>
        </div>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
        <HandsGuide next={next} />
        <div>
          <KeyboardView next={next} learned={learned} focus={lesson.kind === "capitals" ? [] : lesson.newKeys} />
          <FingerLegend />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4 text-sm">
        {idx > 0 ? (
          <Link href={`/typing-lab/lessons/${LESSONS[idx - 1].id}`} className="font-semibold text-primary-700 hover:underline">
            ‹ {LESSONS[idx - 1].title}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/typing-lab/lessons" className="font-semibold text-primary-700 hover:underline">
          All lessons
        </Link>
        {nextLesson ? (
          <Link href={`/typing-lab/lessons/${nextLesson.id}`} className="font-semibold text-primary-700 hover:underline">
            {nextLesson.title} ›
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
