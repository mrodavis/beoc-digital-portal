"use client";

import { useMemo, useState } from "react";
import { SortItem } from "@/types/engl0150";

/**
 * Sort statements into labeled bins.
 *
 * Covers Fact/Opinion (Topic 3), S/O/A/P sorting (Topic 4), and the HIPAA
 * scenario sort in the advanced track. Tap-to-assign rather than drag-and-drop:
 * dragging is unusable by keyboard and awkward on a phone, and this course is
 * taught in a computer lab and read on phones.
 */
export default function Sorter({
  title,
  instructions,
  bins,
  items,
}: {
  title: string;
  instructions?: string;
  bins: { id: string; label: string; hint?: string }[];
  items: SortItem[];
}) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPlaced = items.every((i) => placed[i.id]);
  const score = useMemo(
    () => items.filter((i) => placed[i.id] === i.bin).length,
    [items, placed]
  );

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}
      <p className="mt-1 text-sm text-engl-ink-500">
        Practice only — nothing here is graded or recorded.
      </p>

      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const choice = placed[item.id];
          const right = checked && choice === item.bin;
          const wrong = checked && choice && choice !== item.bin;

          return (
            <li
              key={item.id}
              className={`rounded-2xl border p-4 ${
                right
                  ? "border-engl-care-500 bg-engl-care-50"
                  : wrong
                    ? "border-red-400 bg-red-50"
                    : "border-engl-ink-200 bg-white"
              }`}
            >
              <p className="text-engl-ink-800">{item.text}</p>
              <fieldset className="mt-3">
                <legend className="sr-only">Sort this statement</legend>
                <div className="flex flex-wrap gap-2">
                  {bins.map((bin) => (
                    <label
                      key={bin.id}
                      className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        choice === bin.id
                          ? "border-engl-ink-800 bg-engl-ink-800 text-white"
                          : "border-engl-ink-300 bg-white text-engl-ink-700 hover:border-engl-care-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name={item.id}
                        checked={choice === bin.id}
                        onChange={() => {
                          setPlaced((p) => ({ ...p, [item.id]: bin.id }));
                          setChecked(false);
                        }}
                        className="sr-only"
                      />
                      {bin.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              {checked && choice && (
                <p
                  className={`mt-3 text-sm ${
                    right ? "text-engl-care-800" : "text-red-800"
                  }`}
                >
                  {right ? "Correct. " : `This one is ${bins.find((b) => b.id === item.bin)?.label}. `}
                  {item.feedback}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!allPlaced}
          onClick={() => setChecked(true)}
          className="rounded-lg bg-engl-care-700 px-5 py-2.5 font-medium text-white transition-colors hover:bg-engl-care-800 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600 focus-visible:ring-offset-2"
        >
          Check my sorting
        </button>
        {!allPlaced && (
          <span className="text-sm text-engl-ink-500">
            Sort all {items.length} first.
          </span>
        )}
        {checked && (
          <>
            <span role="status" className="font-medium text-engl-ink-800">
              {score} of {items.length} correct.
            </span>
            <button
              type="button"
              onClick={() => {
                setPlaced({});
                setChecked(false);
              }}
              className="text-sm font-medium text-engl-care-700 underline hover:text-engl-care-900"
            >
              Start over
            </button>
          </>
        )}
      </div>
    </div>
  );
}
