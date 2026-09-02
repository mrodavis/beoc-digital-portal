"use client";

import { useState } from "react";
import { RequiredElement } from "@/types/engl0150";

/**
 * Read a request and identify what a reader would still need.
 *
 * The student marks which required elements are missing. Marking a present
 * element is also wrong, and gets its own feedback — over-reporting gaps is a
 * real failure mode, and a referral padded with information the reader already
 * has is its own problem.
 */
export default function MissingInfo({
  title,
  instructions,
  sample,
  elements,
}: {
  title: string;
  instructions?: string;
  sample: string;
  elements: RequiredElement[];
}) {
  const [flagged, setFlagged] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const toggle = (id: string) => {
    setFlagged((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
    setChecked(false);
  };

  const correct = elements.filter(
    (e) => flagged.includes(e.id) === !e.present
  ).length;

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}

      <div className="mt-3 rounded-2xl border border-engl-ink-200 bg-engl-ink-50 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-engl-ink-500">
          The request as written
        </p>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-engl-ink-800">
          {sample}
        </p>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-engl-ink-900">
          Check every element that is missing
        </legend>
        <ul className="mt-2 space-y-2">
          {elements.map((el) => {
            const isFlagged = flagged.includes(el.id);
            const isRight = checked && isFlagged === !el.present;
            const isWrong = checked && isFlagged !== !el.present;
            return (
              <li key={el.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                    isRight
                      ? "border-engl-care-500 bg-engl-care-50"
                      : isWrong
                        ? "border-red-400 bg-red-50"
                        : "border-engl-ink-200 bg-white hover:border-engl-care-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isFlagged}
                    onChange={() => toggle(el.id)}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-engl-ink-300 text-engl-care-600 focus:ring-engl-care-600"
                  />
                  <span className="flex-1">
                    <span className="block font-medium text-engl-ink-900">
                      {el.label}
                    </span>
                    {checked && (
                      <span
                        className={`mt-1 block text-sm ${
                          isRight ? "text-engl-care-800" : "text-red-800"
                        }`}
                      >
                        {el.present
                          ? "This one is already in the request. "
                          : "Missing. "}
                        {el.why}
                      </span>
                    )}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-lg bg-engl-care-700 px-5 py-2.5 font-medium text-white transition-colors hover:bg-engl-care-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600 focus-visible:ring-offset-2"
        >
          Check my answers
        </button>
        {checked && (
          <span role="status" className="font-medium text-engl-ink-800">
            {correct} of {elements.length} judged correctly.
          </span>
        )}
      </div>
    </div>
  );
}
