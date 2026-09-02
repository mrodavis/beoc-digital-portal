"use client";

import { useId, useState } from "react";
import { DrillItem } from "@/types/engl0150";

/**
 * Multiple-choice grammar and communication practice.
 *
 * Every option carries a rationale, right or wrong — a student who guesses
 * correctly still learns why the other three fail. Ungraded: the item can be
 * retried, and nothing is recorded anywhere.
 */
function DrillCard({ item, number }: { item: DrillItem; number: number }) {
  const groupId = useId();
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correctIndex = item.choices.findIndex((c) => c.correct);
  const gotIt = picked === correctIndex;

  return (
    <li className="rounded-2xl border border-engl-ink-200 bg-white p-5">
      <fieldset>
        <legend className="mb-4 flex gap-3 text-engl-ink-900">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-engl-ink-800 text-sm font-bold text-white"
            aria-hidden="true"
          >
            {number}
          </span>
          <span className="font-medium leading-relaxed">{item.prompt}</span>
        </legend>

        <div className="space-y-2">
          {item.choices.map((choice, i) => {
            const isPicked = picked === i;
            const state = !answered
              ? "border-engl-ink-200 hover:border-engl-care-400 hover:bg-engl-care-50"
              : choice.correct
                ? "border-engl-care-500 bg-engl-care-50"
                : isPicked
                  ? "border-red-400 bg-red-50"
                  : "border-engl-ink-200 opacity-60";

            return (
              <label
                key={i}
                className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors ${state} ${
                  answered ? "cursor-default" : ""
                }`}
              >
                <input
                  type="radio"
                  name={groupId}
                  checked={isPicked}
                  disabled={answered}
                  onChange={() => setPicked(i)}
                  className="mt-1 h-4 w-4 shrink-0 text-engl-care-600 focus:ring-engl-care-600"
                />
                <span className="flex-1">
                  <span className="text-engl-ink-800">{choice.text}</span>
                  {answered && (
                    <span
                      className={`mt-1 block text-sm ${
                        choice.correct ? "text-engl-care-800" : "text-engl-ink-600"
                      }`}
                    >
                      {choice.rationale}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {answered && (
        <div
          role="status"
          className={`mt-4 rounded-xl border-l-4 p-4 ${
            gotIt ? "border-engl-care-500 bg-engl-care-50" : "border-amber-500 bg-amber-50"
          }`}
        >
          <p className="font-semibold text-engl-ink-900">
            {gotIt ? "Correct." : "Not quite."}
          </p>
          <p className="mt-1 text-engl-ink-700">
            <span className="font-medium">The principle: </span>
            {item.principle}
          </p>
          <button
            type="button"
            onClick={() => setPicked(null)}
            className="mt-3 text-sm font-medium text-engl-care-700 underline hover:text-engl-care-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
          >
            Try again
          </button>
        </div>
      )}
    </li>
  );
}

export default function GrammarDrill({
  title,
  instructions,
  items,
}: {
  title: string;
  instructions?: string;
  items: DrillItem[];
}) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && (
        <p className="mt-1 text-engl-ink-600">{instructions}</p>
      )}
      <p className="mt-1 text-sm text-engl-ink-500">
        Practice only — nothing here is graded or recorded.
      </p>
      <ul className="mt-4 space-y-4">
        {items.map((item, i) => (
          <DrillCard key={item.id} item={item} number={i + 1} />
        ))}
      </ul>
    </div>
  );
}
