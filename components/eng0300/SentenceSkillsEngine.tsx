"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Difficulty } from "@/types/eng0300";
import {
  SentenceQuestion,
  SentenceSkill,
} from "@/lib/content/eng0300/writing/sentence-skills";

/**
 * The Sentence Skills practice engine.
 *
 * Modeled on the Practice Center's filterable-set pattern, but per-question
 * rather than per-set: a student picks a skill, answers, and gets the reasoning
 * immediately. The per-choice explanation is the reason this exists — a bare
 * right/wrong would not be worth building.
 *
 * Nothing is graded, submitted, or ranked. Progress is a per-browser
 * convenience written with the same try/catch discipline as the Reading Lab's
 * progress store, and there is deliberately no leaderboard: this is practice,
 * and comparison would discourage exactly the students who need the reps.
 */

const STORAGE_KEY = "eng0300:sentence-skills:v1";

type Attempts = Record<string, { correct: boolean }>;

function readAttempts(): Attempts {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attempts) : {};
  } catch {
    // Private window or blocked storage — practice still works, it just
    // does not persist between visits.
    return {};
  }
}

function writeAttempts(next: Attempts) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Progress is a convenience, never a requirement.
  }
}

const difficultyStyles: Record<Difficulty, string> = {
  Foundation: "bg-eng-navy-100 text-eng-navy-700",
  Developing: "bg-eng-teal-50 text-eng-teal-800",
  "TABE Ready": "bg-eng-gold-100 text-eng-gold-700",
  Challenge: "bg-eng-navy-800 text-white",
};

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function SentenceSkillsEngine({
  skills,
  questions,
  difficulties,
  initialSkill,
  weekLabel,
}: {
  skills: SentenceSkill[];
  questions: SentenceQuestion[];
  difficulties: Difficulty[];
  /** Set from the weekly rotation so the live week opens pre-filtered. */
  initialSkill?: string;
  weekLabel?: string;
}) {
  const [skill, setSkill] = useState<string>(initialSkill ?? "all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");

  /** Answers given this session: question id → chosen index. */
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const filtered = useMemo(
    () =>
      questions.filter(
        (q) =>
          (skill === "all" || q.skill === skill) &&
          (difficulty === "all" || q.difficulty === difficulty)
      ),
    [questions, skill, difficulty]
  );

  /** Question order is fixed per filter selection, not reshuffled per render. */
  const ordered = useMemo(
    () => shuffle(filtered),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [skill, difficulty, filtered.length]
  );

  const current = ordered[index];
  const chosen = current ? answers[current.id] : undefined;
  const answered = chosen !== undefined;

  const skillLabel = useCallback(
    (id: string) => skills.find((s) => s.id === id)?.label ?? id,
    [skills]
  );

  function choose(choiceIndex: number) {
    if (!current || answered) return;
    const correct = choiceIndex === current.correct;
    setAnswers((prev) => ({ ...prev, [current.id]: choiceIndex }));
    const next = { ...readAttempts(), [current.id]: { correct } };
    writeAttempts(next);
  }

  function next() {
    if (index + 1 >= ordered.length) {
      setShowSummary(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  /** Clears the session without touching the filters. */
  function resetSession() {
    setAnswers({});
    setIndex(0);
    setShowSummary(false);
  }

  /** Jump to one skill and start a fresh session on it. */
  function restart(withSkill?: string) {
    if (withSkill) setSkill(withSkill);
    resetSession();
  }

  /* ---------- session summary ---------- */
  const sessionAnswered = ordered.filter((q) => answers[q.id] !== undefined);
  const sessionCorrect = sessionAnswered.filter(
    (q) => answers[q.id] === q.correct
  );

  const weakest = useMemo(() => {
    const bySkill = new Map<string, { right: number; total: number }>();
    for (const q of sessionAnswered) {
      const entry = bySkill.get(q.skill) ?? { right: 0, total: 0 };
      entry.total += 1;
      if (answers[q.id] === q.correct) entry.right += 1;
      bySkill.set(q.skill, entry);
    }
    let worstId: string | null = null;
    let worstRate = 1.1;
    for (const [id, { right, total }] of bySkill) {
      const rate = right / total;
      if (rate < worstRate) {
        worstRate = rate;
        worstId = id;
      }
    }
    return worstId && worstRate < 1 ? worstId : null;
  }, [sessionAnswered, answers]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-5 rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
        <fieldset>
          <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
            Skill
          </legend>
          <div className="flex flex-wrap gap-2">
            {["all", ...skills.map((s) => s.id)].map((option) => {
              const active = skill === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSkill(option);
                    resetSession();
                  }}
                  aria-pressed={active}
                  className={`min-h-[2.5rem] rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2 ${
                    active
                      ? "border-eng-navy-800 bg-eng-navy-800 text-white"
                      : "border-eng-navy-200 bg-white text-eng-navy-700 hover:border-eng-teal-500 hover:bg-eng-teal-50"
                  }`}
                >
                  {option === "all" ? "All skills" : skillLabel(option)}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
            Difficulty
          </legend>
          <div className="flex flex-wrap gap-2">
            {(["all", ...difficulties] as (Difficulty | "all")[]).map(
              (option) => {
                const active = difficulty === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setDifficulty(option);
                      resetSession();
                    }}
                    aria-pressed={active}
                    className={`min-h-[2.5rem] rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2 ${
                      active
                        ? "border-eng-navy-800 bg-eng-navy-800 text-white"
                        : "border-eng-navy-200 bg-white text-eng-navy-700 hover:border-eng-teal-500 hover:bg-eng-teal-50"
                    }`}
                  >
                    {option === "all" ? "All" : option}
                  </button>
                );
              }
            )}
          </div>
        </fieldset>

        <div className="border-t border-eng-navy-100 pt-4">
          <p className="text-sm font-medium text-eng-navy-700" aria-live="polite">
            {filtered.length}{" "}
            {filtered.length === 1 ? "question" : "questions"} in this set
            {skill !== "all" && ` · ${skillLabel(skill)}`}
            {weekLabel && skill === initialSkill && ` · ${weekLabel}`}
          </p>
          {skill !== "all" && (
            <p className="mt-1 text-sm leading-relaxed text-eng-navy-600">
              {skills.find((s) => s.id === skill)?.blurb}
            </p>
          )}
        </div>
      </div>

      {/* Summary */}
      {showSummary ? (
        <div className="rounded-2xl border border-eng-navy-200 bg-white p-6">
          <h3 className="font-display text-2xl font-bold text-eng-navy-900">
            Session complete
          </h3>
          <p className="mt-2 text-lg text-eng-navy-700">
            You answered{" "}
            <span className="font-bold text-eng-navy-900">
              {sessionCorrect.length} of {sessionAnswered.length}
            </span>{" "}
            correctly.
          </p>

          {weakest ? (
            <div className="mt-4 rounded-xl bg-eng-navy-50 p-4">
              <p className="font-semibold text-eng-navy-900">
                Weakest skill this session: {skillLabel(weakest)}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-eng-navy-600">
                {skills.find((s) => s.id === weakest)?.blurb}
              </p>
              <button
                type="button"
                onClick={() => restart(weakest)}
                className="mt-3 rounded-lg bg-eng-navy-800 px-4 py-2.5 font-semibold text-white hover:bg-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-800 focus-visible:ring-offset-2"
              >
                Practice {skillLabel(weakest)}
              </button>
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-eng-green-50 p-4 text-eng-green-700">
              No missed questions in this set. Try a harder difficulty, or a
              skill you have not practised yet.
            </p>
          )}

          <button
            type="button"
            onClick={() => restart()}
            className="mt-4 rounded-lg border-2 border-eng-navy-300 px-4 py-2.5 font-semibold text-eng-navy-700 hover:bg-eng-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-600 focus-visible:ring-offset-2"
          >
            Start over
          </button>

          <p className="mt-4 text-xs text-eng-navy-500">
            Nothing from this session is recorded or submitted. Your score is a
            study signal, not a grade.
          </p>
        </div>
      ) : !current ? (
        <div className="rounded-2xl border-2 border-dashed border-eng-navy-200 bg-white p-8 text-center">
          <p className="font-display text-lg font-bold text-eng-navy-900">
            No questions match those filters yet.
          </p>
          <p className="mx-auto mt-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
            The bank grows as the course develops. Try clearing the difficulty
            filter, or choose another skill.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-eng-navy-500">
              Question {index + 1} of {ordered.length}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyStyles[current.difficulty]}`}
            >
              {current.difficulty}
            </span>
            <span className="rounded-full bg-eng-navy-50 px-3 py-1 text-xs font-medium text-eng-navy-600">
              {skillLabel(current.skill)}
            </span>
          </div>

          <fieldset>
            <legend className="mb-4 font-display text-lg font-bold leading-snug text-eng-navy-900">
              {current.stem}
            </legend>

            <div className="space-y-2">
              {current.choices.map((choice, i) => {
                const isCorrect = i === current.correct;
                const isChosen = chosen === i;

                const state = !answered
                  ? "border-eng-navy-200 hover:border-eng-teal-500 hover:bg-eng-teal-50"
                  : isCorrect
                    ? "border-eng-green-600 bg-eng-green-50"
                    : isChosen
                      ? "border-red-400 bg-red-50"
                      : "border-eng-navy-200 opacity-60";

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={answered}
                    onClick={() => choose(i)}
                    className={`block w-full rounded-xl border-2 p-3 text-left text-[0.9375rem] leading-relaxed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2 disabled:cursor-default ${state}`}
                  >
                    <span className="font-semibold text-eng-navy-500">
                      {String.fromCharCode(65 + i)}.
                    </span>{" "}
                    <span className="text-eng-navy-900">{choice}</span>
                    {answered && (
                      <span className="mt-2 block text-sm text-eng-navy-600">
                        {current.why[i]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {answered && (
            <div role="status" aria-live="polite" className="mt-4">
              <p
                className={`font-semibold ${
                  chosen === current.correct
                    ? "text-eng-green-700"
                    : "text-eng-gold-700"
                }`}
              >
                {chosen === current.correct
                  ? "✓ Correct."
                  : "Not quite — read the reasoning above."}
              </p>
              <p className="mt-2 rounded-lg bg-eng-navy-50 p-3 text-sm leading-relaxed text-eng-navy-700">
                <span className="font-bold uppercase tracking-wide text-eng-teal-800">
                  Remember
                </span>{" "}
                — {current.teach}
              </p>
              <button
                type="button"
                onClick={next}
                className="mt-4 rounded-lg bg-eng-navy-800 px-5 py-3 font-semibold text-white hover:bg-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-800 focus-visible:ring-offset-2"
              >
                {index + 1 >= ordered.length
                  ? "See session summary"
                  : "Next question"}
              </button>
            </div>
          )}
        </div>
      )}

      <p className="mt-6 text-sm text-eng-navy-500">
        Practice here as often as you like. Nothing is recorded, ranked, or
        submitted — graded work is in Brightspace.{" "}
        <Link
          href="/eng0300/writing-lab"
          className="font-semibold text-eng-teal-800 underline underline-offset-4 hover:text-eng-teal-900"
        >
          Back to the Writing Lab
        </Link>
      </p>
    </div>
  );
}
