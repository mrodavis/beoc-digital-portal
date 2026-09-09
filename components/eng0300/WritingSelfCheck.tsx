"use client";

import { useId, useState } from "react";

/**
 * The self-check closing each Writing Lab tier. Tickable, visible state, and
 * not scored — the same treatment the Write It checklist uses, for the same
 * reason: it is a study aid, not an assessment.
 */
export default function WritingSelfCheck({ items }: { items: string[] }) {
  const baseId = useId();
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const done = checked.filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
      <p className="mb-4 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
        Tick what is true of your own writing right now. Anything left unticked
        is what to work on next — that is the whole purpose of this list, so
        leaving boxes empty is useful rather than a failure.
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => {
          const id = `${baseId}-${i}`;
          return (
            <li key={item} className="flex items-start gap-3">
              <input
                type="checkbox"
                id={id}
                checked={checked[i]}
                onChange={(e) =>
                  setChecked((prev) =>
                    prev.map((v, j) => (j === i ? e.target.checked : v))
                  )
                }
                className="mt-1 h-5 w-5 shrink-0 rounded border-eng-navy-300 text-eng-teal-700 focus:ring-2 focus:ring-eng-teal-600 focus:ring-offset-2"
              />
              <label
                htmlFor={id}
                className={`text-[0.9375rem] leading-relaxed ${
                  checked[i] ? "text-eng-navy-400 line-through" : "text-eng-navy-700"
                }`}
              >
                {item}
              </label>
            </li>
          );
        })}
      </ul>
      <p role="status" aria-live="polite" className="mt-4 text-sm font-medium text-eng-navy-600">
        {done} of {items.length} ticked. Not a score, and not recorded.
      </p>
    </div>
  );
}
