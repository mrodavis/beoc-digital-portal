"use client";

import { communicationCheck } from "@/lib/content/engl0150/course";
import { useTopicState } from "@/lib/engl0150/useTopicState";

/**
 * The course's five quality criteria, as an interactive self-check.
 *
 * Used on every topic page and on the Portfolio hub. State is per-topic and
 * stays in this browser. Nothing is graded — this is a self-edit prompt, and
 * the labels say so.
 */
export default function CommunicationCheck({
  topicNumber,
  heading = "Communication Check",
}: {
  topicNumber: number;
  heading?: string;
}) {
  const { value, update, clear, ready } = useTopicState<string[]>(
    topicNumber,
    "communication-check",
    []
  );

  const toggle = (id: string) =>
    update(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);

  const complete = value.length === communicationCheck.length;

  return (
    <div className="rounded-2xl border border-engl-care-200 bg-engl-care-50 p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-engl-ink-900">
            {heading}
          </h3>
          <p className="text-sm text-engl-ink-600">
            Check your own writing against all five. Not graded — saved in this
            browser only.
          </p>
        </div>
        {ready && value.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-engl-ink-600 underline hover:text-engl-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
          >
            Reset
          </button>
        )}
      </div>

      <fieldset>
        <legend className="sr-only">
          {heading} — check each criterion your writing meets
        </legend>
        <ul className="space-y-2">
        {communicationCheck.map((c) => {
          const checked = ready && value.includes(c.id);
          return (
            <li key={c.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-engl-care-200 bg-white p-3 transition-colors hover:border-engl-care-400">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(c.id)}
                  disabled={!ready}
                  className="mt-1 h-5 w-5 shrink-0 rounded border-engl-ink-300 text-engl-care-600 focus:ring-engl-care-600"
                />
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wide text-engl-care-800">
                    {c.label}
                  </span>
                  <span className="text-engl-ink-700">{c.prompt}</span>
                </span>
              </label>
            </li>
          );
        })}
        </ul>
      </fieldset>

      {complete && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-medium text-engl-care-800"
        >
          All five checked. Read your draft once more out loud before you submit
          it — it catches what the eye skips.
        </p>
      )}
    </div>
  );
}
