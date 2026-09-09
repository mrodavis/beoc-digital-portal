"use client";

import { useId, useMemo, useState } from "react";
import { RubricStrandId, WriteIt } from "@/types/eng0300";
import {
  writingRubric,
  writingRubricTotal,
  rubricSelfCheckPrompt,
} from "@/lib/content/eng0300/writing/rubric";
import { countSentences, countWords, useDraft } from "@/lib/eng0300/useDraft";

/**
 * WRITE IT — the writing task that closes a skill lab.
 *
 * Boundary this component exists to hold:
 *   beocdigital.org is where students practice.
 *   Brightspace is where points live.
 *
 * Consequences, all deliberate:
 *   - The draft never leaves the browser. No fetch, no analytics on the
 *     textarea, no third-party editor, no autosave to a server.
 *   - There is no AI feedback, scoring, or rewriting. The instructor needs
 *     the student's own unaided prose because these are placement-relevant
 *     writing samples.
 *   - The self-check is scored BY THE STUDENT and is not recorded.
 *   - Submission is a copy-paste into Brightspace, stated explicitly so no
 *     student believes this page submitted for them.
 */

const strandLabels: Record<RubricStrandId, string> = Object.fromEntries(
  writingRubric.map((strand) => [strand.id, strand.label])
) as Record<RubricStrandId, string>;

function SaveIndicator({
  state,
  storageAvailable,
}: {
  state: string;
  storageAvailable: boolean;
}) {
  if (!storageAvailable) {
    return (
      <span className="text-xs text-eng-navy-500">
        Autosave is unavailable in this browser — copy your work before you
        close the tab.
      </span>
    );
  }
  return (
    <span
      role="status"
      aria-live="polite"
      className="text-xs font-medium text-eng-navy-500"
    >
      {state === "saved"
        ? "Saved in this browser"
        : state === "saving"
          ? "Saving…"
          : ""}
    </span>
  );
}

export default function WriteItBlock({ writeIt }: { writeIt: WriteIt }) {
  const storageKey = `eng0300:writeit:${
    writeIt.storageId ?? `lab${writeIt.lab}`
  }`;
  const {
    text,
    update,
    ready,
    saveState,
    recovered,
    restore,
    startFresh,
    storageAvailable,
  } = useDraft(storageKey);

  const baseId = useId();
  const textareaId = `${baseId}-draft`;

  const [checked, setChecked] = useState<boolean[]>(() =>
    writeIt.checklist.map(() => false)
  );
  const [scores, setScores] = useState<Partial<Record<RubricStrandId, number>>>(
    {}
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const sentences = useMemo(() => countSentences(text), [text]);
  const words = useMemo(() => countWords(text), [text]);

  const scored = writingRubric.filter((s) => scores[s.id] !== undefined);
  const selfTotal = scored.reduce((sum, s) => sum + (scores[s.id] ?? 0), 0);
  const allScored = scored.length === writingRubric.length;

  /** The strand with the largest gap from full marks — where to revise. */
  const weakest = useMemo(() => {
    if (!allScored) return null;
    let worst = writingRubric[0];
    let worstGap = -1;
    for (const strand of writingRubric) {
      const gap = strand.points - (scores[strand.id] ?? 0);
      if (gap > worstGap) {
        worstGap = gap;
        worst = strand;
      }
    }
    return worstGap > 0 ? worst : null;
  }, [allScored, scores]);

  async function copyDraft() {
    // The ONLY place the draft leaves the textarea, and it goes to the
    // student's own clipboard — never to a network destination.
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className="space-y-6">
      {/* 1. The prompt */}
      <div className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-eng-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-eng-gold-700">
            {writeIt.taskName}
          </span>
          <span className="rounded-full bg-eng-navy-50 px-3 py-1 text-xs font-medium text-eng-navy-600">
            Based on “{writeIt.passageTitle}”
          </span>
        </div>
        {writeIt.prompt.map((paragraph) => (
          <p
            key={paragraph}
            className="mb-3 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-700 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* 2. Requirements checklist — state visible, never scored */}
      <fieldset className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
        <legend className="px-1 font-display text-lg font-bold text-eng-navy-900">
          Before you submit, check each one
        </legend>
        <p className="mb-4 text-sm text-eng-navy-600">
          Ticking these is for your own tracking. Nothing here is scored or
          recorded.
        </p>
        <ul className="space-y-3">
          {writeIt.checklist.map((item, i) => {
            const id = `${baseId}-check-${i}`;
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
                    checked[i]
                      ? "text-eng-navy-400 line-through"
                      : "text-eng-navy-700"
                  }`}
                >
                  {item}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* 3. Sentence frames */}
      <div className="rounded-2xl border-2 border-dashed border-eng-teal-400 bg-eng-teal-50/60 p-5 sm:p-6">
        <h3 className="mb-1 font-display text-lg font-bold text-eng-navy-900">
          Sentence frames
        </h3>
        <p className="mb-4 text-sm text-eng-navy-600">
          Starters, not a template. Fill one in, change the wording to sound
          like you, or write past it entirely.
        </p>
        <ul className="space-y-3">
          {writeIt.frames.map((frame) => (
            <li
              key={frame}
              className="rounded-lg border border-eng-teal-200 bg-white p-3 text-[0.9375rem] leading-relaxed text-eng-navy-800"
            >
              {frame}
            </li>
          ))}
        </ul>
      </div>

      {/* 4-5. Writing area, counts, autosave */}
      <div className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <label
            htmlFor={textareaId}
            className="font-display text-lg font-bold text-eng-navy-900"
          >
            Your paragraph
          </label>
          <SaveIndicator
            state={saveState}
            storageAvailable={storageAvailable}
          />
        </div>

        {/* Restore / start fresh — offered, never forced */}
        {ready && recovered !== null && (
          <div className="mb-3 rounded-lg border border-eng-gold-300 bg-eng-gold-50 p-3">
            <p className="text-sm font-medium text-eng-navy-800">
              You have a saved draft in this browser from an earlier visit.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={restore}
                className="rounded-lg bg-eng-navy-800 px-3 py-2 text-sm font-semibold text-white hover:bg-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-800 focus-visible:ring-offset-2"
              >
                Restore it
              </button>
              <button
                type="button"
                onClick={startFresh}
                className="rounded-lg border-2 border-eng-navy-300 px-3 py-2 text-sm font-semibold text-eng-navy-700 hover:bg-eng-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-600 focus-visible:ring-offset-2"
              >
                Start fresh
              </button>
            </div>
          </div>
        )}

        <textarea
          id={textareaId}
          value={text}
          onChange={(e) => {
            update(e.target.value);
            setCopyState("idle");
          }}
          rows={10}
          spellCheck
          aria-describedby={`${baseId}-counts ${baseId}-privacy`}
          placeholder="Write your paragraph here."
          className="w-full resize-y rounded-lg border border-eng-navy-300 p-3 text-[0.9375rem] leading-relaxed text-eng-navy-900 focus:border-eng-teal-600 focus:outline-none focus:ring-1 focus:ring-eng-teal-600"
        />

        <p
          id={`${baseId}-counts`}
          role="status"
          aria-live="polite"
          className="mt-2 text-sm text-eng-navy-600"
        >
          <span className="font-semibold">{words}</span>{" "}
          {words === 1 ? "word" : "words"} ·{" "}
          <span className="font-semibold">{sentences}</span>{" "}
          {sentences === 1 ? "sentence" : "sentences"}
          <span className="ml-2 text-eng-navy-400">
            (a rough count from end punctuation — a guide, not a rule)
          </span>
        </p>

        <p id={`${baseId}-privacy`} className="mt-2 text-xs text-eng-navy-500">
          What you type stays in this browser. It is not sent anywhere, not
          scored by software, and not seen by anyone until you paste it into
          Brightspace yourself.
        </p>
      </div>

      {/* 6. Self-check against the course rubric */}
      <div className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold text-eng-navy-900">
          Score your own draft
        </h3>
        <p className="mb-4 max-w-[68ch] text-sm leading-relaxed text-eng-navy-600">
          This is the same {writingRubricTotal}-point rubric attached to the
          Brightspace dropbox. Scoring yourself first is the fastest way to find
          what to fix. Your score here is yours alone — it is not recorded and
          it is not your grade.
        </p>

        <div className="space-y-4">
          {writingRubric.map((strand) => (
            <fieldset
              key={strand.id}
              className="rounded-xl border border-eng-navy-100 bg-eng-navy-50/50 p-4"
            >
              <legend className="px-1 text-sm font-bold uppercase tracking-wide text-eng-navy-800">
                {strand.label} — {strand.points}{" "}
                {strand.points === 1 ? "point" : "points"}
              </legend>
              <p className="mb-3 text-sm leading-relaxed text-eng-navy-600">
                {strand.lookFor}
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: strand.points + 1 }, (_, value) => {
                  const id = `${baseId}-${strand.id}-${value}`;
                  const active = scores[strand.id] === value;
                  return (
                    <span key={value}>
                      <input
                        type="radio"
                        id={id}
                        name={`${baseId}-${strand.id}`}
                        checked={active}
                        onChange={() =>
                          setScores((prev) => ({ ...prev, [strand.id]: value }))
                        }
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={id}
                        className={`inline-flex min-h-[2.5rem] cursor-pointer items-center rounded-lg border-2 px-4 py-1.5 text-sm font-semibold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-eng-teal-600 peer-focus-visible:ring-offset-2 ${
                          active
                            ? "border-eng-navy-800 bg-eng-navy-800 text-white"
                            : "border-eng-navy-200 bg-white text-eng-navy-700 hover:border-eng-teal-500"
                        }`}
                      >
                        {value}
                      </label>
                    </span>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div
          role="status"
          aria-live="polite"
          className="mt-4 rounded-xl bg-eng-navy-800 p-4 text-white"
        >
          {allScored ? (
            <>
              <p className="font-display text-lg font-bold">
                You scored your draft {selfTotal} out of {writingRubricTotal}.
              </p>
              <p className="mt-1 text-sm text-white/80">
                {weakest
                  ? `${rubricSelfCheckPrompt} You marked yourself lowest on ${strandLabels[weakest.id]}.`
                  : "You gave yourself full marks on every strand. Read it aloud once more before you submit — that catches what silent reading misses."}
              </p>
            </>
          ) : (
            <p className="text-sm text-white/85">
              Score all four strands to see your total.{" "}
              {scored.length > 0 &&
                `${scored.length} of ${writingRubric.length} scored so far.`}
            </p>
          )}
        </div>
      </div>

      {/* 7. Model paragraph, collapsed so it cannot be copied before writing */}
      <details className="group rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
        <summary className="cursor-pointer list-none font-display text-lg font-bold text-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2">
          <span className="text-eng-teal-700 group-open:hidden">
            ▸ Show a strong example
          </span>
          <span className="hidden text-eng-teal-700 group-open:inline">
            ▾ Hide the example
          </span>
        </summary>
        <div className="mt-4">
          <p className="mb-4 max-w-[68ch] text-sm leading-relaxed text-eng-navy-600">
            {writeIt.model.intro}
          </p>

          {/* The paragraph read straight through, before the annotations. */}
          <blockquote className="mb-5 rounded-xl border-l-4 border-eng-teal-600 bg-eng-teal-50/50 p-4 text-[0.9375rem] leading-relaxed text-eng-navy-800">
            {writeIt.model.sentences.map((s) => s.text).join(" ")}
          </blockquote>

          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
            Which sentence earns which strand
          </h4>
          <ol className="space-y-3">
            {writeIt.model.sentences.map((sentence, i) => (
              <li
                key={i}
                className="rounded-xl border border-eng-navy-100 bg-eng-navy-50/50 p-4"
              >
                <p className="text-[0.9375rem] leading-relaxed text-eng-navy-800">
                  {sentence.text}
                </p>
                <p className="mt-2 text-sm text-eng-navy-600">
                  <span className="font-bold uppercase tracking-wide text-eng-teal-800">
                    {strandLabels[sentence.strand]}
                  </span>{" "}
                  — {sentence.note}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </details>

      {/* 8. Hand off to Brightspace */}
      <div className="rounded-2xl border-2 border-eng-navy-800 bg-eng-navy-50 p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold text-eng-navy-900">
          Turn it in
        </h3>
        <p className="mt-1 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-700">
          Copy your paragraph, then paste it into{" "}
          <span className="font-semibold">{writeIt.brightspace.dropbox}</span> in
          Brightspace (Week {writeIt.brightspace.week}).
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyDraft}
            disabled={text.trim().length === 0}
            className="rounded-lg bg-eng-navy-800 px-5 py-3 font-semibold text-white transition-colors hover:bg-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-eng-navy-300"
          >
            Copy My Paragraph
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            disabled={text.trim().length === 0}
            className="rounded-lg border-2 border-eng-navy-300 px-5 py-3 font-semibold text-eng-navy-700 transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-eng-navy-300"
          >
            Print / Save as PDF
          </button>
        </div>

        <p role="status" aria-live="polite" className="mt-3 text-sm">
          {copyState === "copied" && (
            <span className="font-semibold text-eng-green-700">
              ✓ Copied. Now paste this into the Brightspace dropbox for this
              week. Your work is not submitted from this page.
            </span>
          )}
          {copyState === "failed" && (
            <span className="font-semibold text-eng-gold-700">
              This browser blocked the clipboard. Select your paragraph above
              and copy it manually (Ctrl+C, or Cmd+C on a Mac), or use Print /
              Save as PDF.
            </span>
          )}
        </p>

        {text.trim().length === 0 && (
          <p className="mt-3 text-sm text-eng-navy-500">
            Write your paragraph first — then these buttons turn on.
          </p>
        )}
      </div>
    </div>
  );
}
