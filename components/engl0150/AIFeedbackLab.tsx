"use client";

import { useState } from "react";
import { useTopicState } from "@/lib/engl0150/useTopicState";

/**
 * The four-panel AI workflow: original → AI feedback → your evaluation →
 * revised final.
 *
 * The third panel is the point of the exercise. Pasting AI feedback and
 * accepting it is not what this teaches; deciding which suggestions are right
 * is. The panel cannot be skipped and the export includes it.
 *
 * Nothing here calls an AI service. Students use whatever tool they have and
 * paste the result, which also keeps every keystroke in this browser.
 */
const PANELS = [
  {
    id: "original",
    step: 1,
    label: "Your original",
    prompt:
      "Paste one piece of healthcare writing you produced earlier in this course.",
  },
  {
    id: "feedback",
    step: 2,
    label: "AI feedback",
    prompt:
      "Ask an AI tool for feedback and paste its response here. Ask it to identify unclear wording, grammar problems, and tone — not to rewrite it for you.",
  },
  {
    id: "evaluation",
    step: 3,
    label: "Your evaluation",
    prompt:
      "Which suggestions are right, and which are wrong or would make it worse? Say why for each. This is the part that is yours.",
  },
  {
    id: "revised",
    step: 4,
    label: "Your revised version",
    prompt:
      "Rewrite it, using the suggestions you accepted and ignoring the ones you rejected.",
  },
] as const;

export default function AIFeedbackLab({
  topicNumber,
  title,
  instructions,
  starter,
  badRevision,
}: {
  topicNumber: number;
  title: string;
  instructions?: string;
  starter: string;
  badRevision: { text: string; problems: string[] };
}) {
  const { value, update, clear, ready } = useTopicState<Record<string, string>>(
    topicNumber,
    "ai-lab",
    {}
  );
  const [spotted, setSpotted] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  const done = PANELS.filter((p) => (value[p.id] ?? "").trim().length > 0).length;

  const exportAll = () => {
    const text = PANELS.map(
      (p) => `${p.step}. ${p.label.toUpperCase()}\n${value[p.id] ?? ""}`
    ).join("\n\n");
    navigator.clipboard?.writeText(text);
  };

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}

      <div className="mt-3 rounded-2xl border border-engl-plum-300 bg-engl-plum-50 p-4">
        <p className="font-display text-lg font-bold text-engl-plum-900">
          AI can suggest. You decide.
        </p>
        <p className="mt-1 text-sm text-engl-ink-800">
          Never paste patient information into an AI tool — no names, no dates of
          birth, no identifiable details. Use the practice text below or your own
          work with every identifier removed.
        </p>
      </div>

      <details className="mt-3 rounded-2xl border border-engl-ink-200 bg-white p-4">
        <summary className="cursor-pointer font-semibold text-engl-ink-900">
          Need something to work with? Use this draft.
        </summary>
        <p className="mt-2 whitespace-pre-line text-engl-ink-700">{starter}</p>
      </details>

      <div className="mt-4 space-y-4">
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            className="rounded-2xl border border-engl-ink-200 bg-white p-4"
          >
            <label
              htmlFor={`ai-${panel.id}`}
              className="flex items-center gap-3 font-semibold text-engl-ink-900"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                  panel.id === "evaluation" ? "bg-engl-plum-700" : "bg-engl-ink-800"
                }`}
                aria-hidden="true"
              >
                {panel.step}
              </span>
              {panel.label}
            </label>
            <p className="mb-1 mt-1 text-sm text-engl-ink-600">{panel.prompt}</p>
            <textarea
              id={`ai-${panel.id}`}
              value={value[panel.id] ?? ""}
              onChange={(e) => update({ ...value, [panel.id]: e.target.value })}
              rows={panel.id === "evaluation" ? 5 : 4}
              disabled={!ready}
              className="w-full rounded-xl border border-engl-ink-300 p-3 focus:border-engl-care-500 focus:outline-none focus:ring-1 focus:ring-engl-care-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span role="status" className="text-sm font-medium text-engl-ink-700">
          {done} of 4 panels complete.
        </span>
        {done === 4 && (
          <button
            type="button"
            onClick={exportAll}
            className="rounded-lg border border-engl-ink-300 px-4 py-2 text-sm font-medium text-engl-ink-700 hover:bg-engl-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
          >
            Copy all four for submission
          </button>
        )}
        {done > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-sm font-medium text-engl-ink-600 underline hover:text-engl-ink-900"
          >
            Clear
          </button>
        )}
      </div>

      {/* Spot the bad AI revision */}
      <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <h4 className="font-display text-lg font-bold text-engl-ink-900">
          Spot the bad AI revision
        </h4>
        <p className="mt-1 text-sm text-engl-ink-700">
          An AI tool produced the revision below. It reads well. Check every
          problem you can find before revealing the answers.
        </p>
        <p className="mt-3 whitespace-pre-line rounded-xl border border-amber-200 bg-white p-4 text-engl-ink-800">
          {badRevision.text}
        </p>
        <fieldset className="mt-3">
          <legend className="text-sm font-semibold text-engl-ink-900">
            What is wrong with it?
          </legend>
          <ul className="mt-2 space-y-1.5">
            {badRevision.problems.map((p, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-2 text-sm text-engl-ink-800">
                  <input
                    type="checkbox"
                    checked={spotted.includes(i)}
                    onChange={() =>
                      setSpotted((s) =>
                        s.includes(i) ? s.filter((x) => x !== i) : [...s, i]
                      )
                    }
                    className="mt-0.5 h-4 w-4 rounded border-engl-ink-300 text-engl-care-600 focus:ring-engl-care-600"
                  />
                  <span className={revealed ? "" : "blur-sm select-none"}>{p}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mt-3 rounded-lg bg-engl-ink-800 px-4 py-2 text-sm font-medium text-white hover:bg-engl-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
        >
          Reveal the problems
        </button>
        {revealed && (
          <p role="status" className="mt-3 text-sm font-medium text-amber-900">
            Every one of these was invented or introduced by the AI. It sounded
            confident about all of them — which is exactly why you check.
          </p>
        )}
      </div>
    </div>
  );
}
