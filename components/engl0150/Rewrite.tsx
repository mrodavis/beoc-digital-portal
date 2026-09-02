"use client";

import { useState } from "react";
import { RewriteItem } from "@/types/engl0150";

/**
 * Rewrite an unacceptable passage, then compare against a model.
 *
 * Deliberately self-scored. Prose cannot be auto-graded honestly, and a wrong
 * "incorrect" on a defensible rewrite teaches the student to distrust the tool.
 * The rubric gives them something concrete to judge their own work against.
 */
function RewriteCard({ item, number }: { item: RewriteItem; number: number }) {
  const [draft, setDraft] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState<number[]>([]);

  return (
    <li className="rounded-2xl border border-engl-ink-200 bg-white p-5">
      <div className="mb-3 flex gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-engl-ink-800 text-sm font-bold text-white"
          aria-hidden="true"
        >
          {number}
        </span>
        <div className="flex-1">
          <div className="rounded-xl border-l-4 border-red-400 bg-red-50 p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-red-800">
              As written
            </p>
            <p className="mt-1 text-engl-ink-800">{item.before}</p>
          </div>
          <p className="mt-2 text-sm text-engl-ink-600">
            <span className="font-semibold">The problem: </span>
            {item.problem}
          </p>
        </div>
      </div>

      <label
        htmlFor={`rewrite-${item.id}`}
        className="block text-sm font-medium text-engl-ink-800"
      >
        Your rewrite
      </label>
      <textarea
        id={`rewrite-${item.id}`}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded-xl border border-engl-ink-300 p-3 focus:border-engl-care-500 focus:outline-none focus:ring-1 focus:ring-engl-care-500"
        placeholder="Write the objective version…"
      />

      <button
        type="button"
        onClick={() => setRevealed(true)}
        disabled={draft.trim().length === 0}
        className="mt-2 rounded-lg bg-engl-ink-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-engl-ink-900 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600 focus-visible:ring-offset-2"
      >
        Compare with a model answer
      </button>
      {draft.trim().length === 0 && (
        <p className="mt-1 text-sm text-engl-ink-500">
          Write your version first — comparing before you try teaches nothing.
        </p>
      )}

      {revealed && (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border-l-4 border-engl-care-500 bg-engl-care-50 p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-engl-care-800">
              One model answer
            </p>
            <p className="mt-1 text-engl-ink-800">{item.model}</p>
            <p className="mt-2 text-sm text-engl-ink-600">
              Yours does not have to match this. It has to meet the checklist.
            </p>
          </div>
          <fieldset className="rounded-xl border border-engl-ink-200 p-3">
            <legend className="px-1 text-sm font-semibold text-engl-ink-900">
              Score your own rewrite
            </legend>
            <ul className="space-y-1.5">
              {item.rubric.map((r, i) => (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-2 text-sm text-engl-ink-700">
                    <input
                      type="checkbox"
                      checked={checks.includes(i)}
                      onChange={() =>
                        setChecks((c) =>
                          c.includes(i) ? c.filter((x) => x !== i) : [...c, i]
                        )
                      }
                      className="mt-0.5 h-4 w-4 rounded border-engl-ink-300 text-engl-care-600 focus:ring-engl-care-600"
                    />
                    <span>{r}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      )}
    </li>
  );
}

export default function Rewrite({
  title,
  instructions,
  items,
}: {
  title: string;
  instructions?: string;
  items: RewriteItem[];
}) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}
      <p className="mt-1 text-sm text-engl-ink-500">
        Self-scored practice. Your writing stays in this browser.
      </p>
      <ul className="mt-4 space-y-4">
        {items.map((item, i) => (
          <RewriteCard key={item.id} item={item} number={i + 1} />
        ))}
      </ul>
    </div>
  );
}
