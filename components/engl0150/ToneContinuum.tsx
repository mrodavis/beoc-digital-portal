"use client";

import { useState } from "react";
import { ToneSample } from "@/types/engl0150";

const BANDS = [
  { value: 0, label: "Blunt", hint: "Reads as cold or accusing" },
  { value: 1, label: "Abrupt", hint: "Correct but curt" },
  { value: 2, label: "Professional", hint: "Warm, clear, and appropriate" },
  { value: 3, label: "Over-soft", hint: "So hedged the message is lost" },
];

/**
 * Place a message on a tone continuum, then rewrite it into the professional
 * band.
 *
 * The over-soft end matters as much as the blunt end. Students are usually
 * warned about sounding rude and rarely warned that "I was just wondering if
 * you might possibly be able to…" leaves the reader unsure anything was asked.
 */
function ToneCard({ sample, number }: { sample: ToneSample; number: number }) {
  const [placed, setPlaced] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [revealed, setRevealed] = useState(false);
  const answered = placed !== null;
  const right = placed === sample.band;

  return (
    <li className="rounded-2xl border border-engl-ink-200 bg-white p-5">
      <div className="mb-3 flex gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-engl-ink-800 text-sm font-bold text-white"
          aria-hidden="true"
        >
          {number}
        </span>
        <p className="flex-1 rounded-xl bg-engl-ink-50 p-3 text-engl-ink-800">
          {sample.text}
        </p>
      </div>

      <label
        htmlFor={`tone-${sample.id}`}
        className="block text-sm font-medium text-engl-ink-800"
      >
        Where does this message sit?
      </label>
      <input
        id={`tone-${sample.id}`}
        type="range"
        min={0}
        max={3}
        step={1}
        value={placed ?? 2}
        onChange={(e) => setPlaced(Number(e.target.value))}
        aria-valuetext={BANDS[placed ?? 2].label}
        className="mt-2 w-full accent-engl-care-600"
      />
      <div className="mt-1 flex justify-between text-xs text-engl-ink-500">
        {BANDS.map((b) => (
          <span key={b.value} className="flex-1 text-center">
            {b.label}
          </span>
        ))}
      </div>

      {answered && (
        <>
          <p
            role="status"
            className={`mt-3 rounded-xl border-l-4 p-3 ${
              right
                ? "border-engl-care-500 bg-engl-care-50 text-engl-care-900"
                : "border-amber-500 bg-amber-50 text-amber-900"
            }`}
          >
            {right ? "That is where it sits. " : `This one is ${BANDS[sample.band].label}. `}
            {sample.feedback}
          </p>

          {sample.band !== 2 && (
            <div className="mt-3">
              <label
                htmlFor={`tone-rewrite-${sample.id}`}
                className="block text-sm font-medium text-engl-ink-800"
              >
                Rewrite it into the professional band
              </label>
              <textarea
                id={`tone-rewrite-${sample.id}`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl border border-engl-ink-300 p-3 focus:border-engl-care-500 focus:outline-none focus:ring-1 focus:ring-engl-care-500"
              />
              {sample.professional && (
                <>
                  <button
                    type="button"
                    disabled={draft.trim().length === 0}
                    onClick={() => setRevealed(true)}
                    className="mt-2 rounded-lg bg-engl-ink-800 px-4 py-2 text-sm font-medium text-white hover:bg-engl-ink-900 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-engl-care-600"
                  >
                    Compare with a model
                  </button>
                  {revealed && (
                    <p className="mt-2 rounded-xl border-l-4 border-engl-care-500 bg-engl-care-50 p-3 text-engl-ink-800">
                      {sample.professional}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </li>
  );
}

export default function ToneContinuum({
  title,
  instructions,
  samples,
}: {
  title: string;
  instructions?: string;
  samples: ToneSample[];
}) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-engl-ink-900">{title}</h3>
      {instructions && <p className="mt-1 text-engl-ink-600">{instructions}</p>}
      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        {BANDS.map((b) => (
          <div key={b.value} className="rounded-xl bg-engl-ink-50 p-3">
            <p className="text-sm font-bold text-engl-ink-900">{b.label}</p>
            <p className="text-xs text-engl-ink-600">{b.hint}</p>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-4">
        {samples.map((s, i) => (
          <ToneCard key={s.id} sample={s} number={i + 1} />
        ))}
      </ul>
    </div>
  );
}
