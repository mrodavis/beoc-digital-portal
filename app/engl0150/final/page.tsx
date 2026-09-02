"use client";

import { useState } from "react";
import CommunicationCheck from "@/components/engl0150/CommunicationCheck";
import Builder from "@/components/engl0150/Builder";
import GrammarDrill from "@/components/engl0150/GrammarDrill";
import WordBankDeck from "@/components/engl0150/WordBankDeck";
import { wordLists } from "@/lib/content/engl0150/wordLists";
import { finalAssessment } from "@/lib/content/engl0150/final";

/** Final assessment key, outside the topic range. */
const FINAL_KEY = 99;

export default function FinalPage() {
  const [chosen, setChosen] = useState<string[]>([]);

  const toggle = (id: string) =>
    setChosen((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : c.length < 4 ? [...c, id] : c
    );

  const enough = chosen.length >= 3;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full bg-engl-ink-100 px-3 py-1 font-semibold text-engl-ink-700">
          Final
        </span>
        <span className="rounded-full bg-engl-ink-100 px-3 py-1 font-semibold text-engl-ink-700">
          1 session
        </span>
      </div>

      <h1 className="font-display text-3xl font-bold text-engl-ink-900 sm:text-4xl">
        Integrated Healthcare Communication &amp; Grammar
      </h1>

      <blockquote className="mt-6 rounded-2xl border-l-4 border-engl-plum-600 bg-engl-plum-50 p-6">
        <p className="font-display text-xl font-semibold leading-relaxed text-engl-ink-900 sm:text-2xl">
          {finalAssessment.essentialQuestion}
        </p>
      </blockquote>

      {/* The case */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          Part 1 — the integrated case
        </h2>
        <div className="mt-3 rounded-2xl border border-engl-ink-200 bg-white p-6">
          <p className="leading-relaxed text-engl-ink-800">
            {finalAssessment.caseText}
          </p>
          <ul className="mt-4 space-y-2">
            {finalAssessment.caseDetail.map((d, i) => (
              <li key={i} className="flex gap-3 text-engl-ink-700">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-engl-care-600"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product selection */}
      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          Choose three or four products
        </h2>
        <p className="mt-1 text-engl-ink-600">
          Each one uses skills from a different part of the course. Pick the ones
          this case genuinely calls for.
        </p>

        <fieldset className="mt-4">
          <legend className="sr-only">Select the products you will write</legend>
          <ul className="grid gap-3 sm:grid-cols-2">
            {finalAssessment.products.map((p) => {
              const picked = chosen.includes(p.id);
              const full = chosen.length >= 4 && !picked;
              return (
                <li key={p.id}>
                  <label
                    className={`flex h-full cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                      picked
                        ? "border-engl-care-500 bg-engl-care-50"
                        : full
                          ? "border-engl-ink-200 bg-engl-ink-50 opacity-50"
                          : "border-engl-ink-200 bg-white hover:border-engl-care-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={picked}
                      disabled={full}
                      onChange={() => toggle(p.id)}
                      className="mt-1 h-5 w-5 shrink-0 rounded border-engl-ink-300 text-engl-care-600 focus:ring-engl-care-600"
                    />
                    <span>
                      <span className="block font-semibold text-engl-ink-900">
                        {p.label}
                      </span>
                      <span className="mt-1 block text-sm text-engl-ink-600">
                        {p.prompt}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <p role="status" className="mt-3 text-sm font-medium text-engl-ink-700">
          {chosen.length} selected.{" "}
          {enough
            ? "Draft each one below."
            : `Choose at least ${3 - chosen.length} more.`}
        </p>
      </section>

      {/* Drafting surfaces */}
      {chosen.length > 0 && (
        <section className="mt-8 space-y-10">
          {finalAssessment.products
            .filter((p) => chosen.includes(p.id))
            .map((p) => (
              <Builder
                key={p.id}
                topicNumber={FINAL_KEY}
                storageKey={`final-${p.id}`}
                title={p.label}
                instructions={p.prompt}
                scenario={finalAssessment.caseText}
                fields={p.fields}
              />
            ))}
        </section>
      )}

      {/* Part 2 */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          Part 2 — grammar and spelling
        </h2>
        <p className="mt-1 max-w-[70ch] text-engl-ink-600">
          {finalAssessment.quizIntro}
        </p>

        <div className="mt-5">
          <GrammarDrill
            title="Grammar review — the spiraling error checklist"
            instructions="Three items from each category: agreements, fragments and run-ons, punctuation and capitalization, and word choice."
            items={finalAssessment.quizItems}
          />
        </div>

        <div className="mt-10">
          <h3 className="font-display text-xl font-bold text-engl-ink-900">
            Spelling review
          </h3>
          <p className="mt-1 text-engl-ink-600">
            Every word from the course. Use Spell it mode and work through the
            ones you miss.
          </p>
          <div className="mt-4">
            <WordBankDeck
              list={wordLists[wordLists.length - 1]}
              spiralLists={wordLists.slice(0, -1)}
              title="Full course review"
            />
          </div>
          <p className="mt-3 text-sm text-engl-ink-500">
            Turn on &ldquo;Include earlier lists&rdquo; to review all{" "}
            {wordLists.reduce((n, l) => n + l.words.length, 0)} words.
          </p>
        </div>

        <p className="mt-6 rounded-2xl bg-engl-ink-50 p-4 text-sm text-engl-ink-600">
          This review is practice and is not recorded. The graded grammar and
          spelling assessment is administered in class through Brightspace.
        </p>
      </section>

      {/* Integrated concepts */}
      <section className="mt-10 rounded-2xl border border-engl-ink-200 bg-white p-6">
        <h2 className="font-display text-xl font-bold text-engl-ink-900">
          What is being assessed
        </h2>
        <ul className="mt-3 space-y-2">
          {finalAssessment.integrated.map((c, i) => (
            <li key={i} className="flex gap-3 text-engl-ink-700">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-engl-plum-500"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <CommunicationCheck
          topicNumber={FINAL_KEY}
          heading="Check every product before you submit"
        />
      </section>

      <p className="mt-8 rounded-2xl bg-engl-ink-50 p-4 text-sm text-engl-ink-600">
        This page is for drafting. The final assessment is completed and
        submitted through Brightspace, in class.
      </p>
    </div>
  );
}
