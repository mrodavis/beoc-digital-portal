"use client";

import { useMemo, useState } from "react";
import { MatchPair } from "@/types/engl0150";

/**
 * Match a clinical term to the plain-language equivalent a patient would
 * understand, then practise explaining it in a sentence.
 *
 * Two modes because the skill has two halves: recognizing that "hypertension"
 * means "high blood pressure" is recall; saying it to a worried patient without
 * sounding condescending is the part that takes practice.
 */
function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function Matcher({
  title,
  instructions,
  pairs,
}: {
  title: string;
  instructions?: string;
  pairs: MatchPair[];
}) {
  const [mode, setMode] = useState<"match" | "explain">("match");
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<string[]>([]);

  const options = useMemo(() => shuffle(pairs.map((p) => p.plain)), [pairs]);
  const score = pairs.filter((p) => picked[p.id] === p.plain).length;
  const allPicked = pairs.every((p) => picked[p.id]);

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}

      <div role="tablist" aria-label="Practice mode" className="mt-3 flex flex-wrap gap-2">
        {(
          [
            { id: "match", label: "Match it" },
            { id: "explain", label: "Explain it" },
          ] as const
        ).map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600 focus-visible:ring-offset-2 ${
              mode === m.id
                ? "bg-engl-care-700 text-white"
                : "bg-engl-ink-100 text-engl-ink-700 hover:bg-engl-ink-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "match" ? (
        <>
          <ul className="mt-4 space-y-3">
            {pairs.map((pair) => {
              const choice = picked[pair.id];
              const right = checked && choice === pair.plain;
              const wrong = checked && choice && choice !== pair.plain;
              return (
                <li
                  key={pair.id}
                  className={`rounded-2xl border p-4 ${
                    right
                      ? "border-engl-care-500 bg-engl-care-50"
                      : wrong
                        ? "border-red-400 bg-red-50"
                        : "border-engl-ink-200 bg-white"
                  }`}
                >
                  <p className="font-semibold text-engl-ink-900">{pair.term}</p>
                  <label
                    htmlFor={`match-${pair.id}`}
                    className="mt-2 block text-sm text-engl-ink-600"
                  >
                    In plain language, this means
                  </label>
                  <select
                    id={`match-${pair.id}`}
                    value={choice ?? ""}
                    onChange={(e) => {
                      setPicked((p) => ({ ...p, [pair.id]: e.target.value }));
                      setChecked(false);
                    }}
                    className="mt-1 w-full rounded-lg border border-engl-ink-300 p-2 focus:border-engl-care-500 focus:outline-none focus:ring-1 focus:ring-engl-care-500"
                  >
                    <option value="">Choose…</option>
                    {options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {checked && wrong && (
                    <p className="mt-2 text-sm text-red-800">
                      {pair.term} means <strong>{pair.plain}</strong>.
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!allPicked}
              onClick={() => setChecked(true)}
              className="rounded-lg bg-engl-care-700 px-5 py-2.5 font-medium text-white transition-colors hover:bg-engl-care-800 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600 focus-visible:ring-offset-2"
            >
              Check my matches
            </button>
            {checked && (
              <span role="status" className="font-medium text-engl-ink-800">
                {score} of {pairs.length} correct.
              </span>
            )}
          </div>
        </>
      ) : (
        <ul className="mt-4 space-y-3">
          {pairs.map((pair) => (
            <li
              key={pair.id}
              className="rounded-2xl border border-engl-ink-200 bg-white p-4"
            >
              <p className="font-semibold text-engl-ink-900">{pair.term}</p>
              <label
                htmlFor={`explain-${pair.id}`}
                className="mt-2 block text-sm text-engl-ink-600"
              >
                Explain this to a patient in one sentence. No jargon, and no
                talking down.
              </label>
              <textarea
                id={`explain-${pair.id}`}
                value={drafts[pair.id] ?? ""}
                onChange={(e) =>
                  setDrafts((d) => ({ ...d, [pair.id]: e.target.value }))
                }
                rows={2}
                className="mt-1 w-full rounded-xl border border-engl-ink-300 p-3 focus:border-engl-care-500 focus:outline-none focus:ring-1 focus:ring-engl-care-500"
              />
              {pair.explanation && (
                <>
                  <button
                    type="button"
                    disabled={(drafts[pair.id] ?? "").trim().length === 0}
                    onClick={() => setRevealed((r) => [...r, pair.id])}
                    className="mt-2 rounded-lg bg-engl-ink-800 px-4 py-2 text-sm font-medium text-white hover:bg-engl-ink-900 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
                  >
                    Compare with a model
                  </button>
                  {revealed.includes(pair.id) && (
                    <p className="mt-2 rounded-xl border-l-4 border-engl-care-500 bg-engl-care-50 p-3 text-engl-ink-800">
                      {pair.explanation}
                    </p>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
