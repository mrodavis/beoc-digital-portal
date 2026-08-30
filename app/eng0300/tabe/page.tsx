import Link from "next/link";
import type { Metadata } from "next";
import {
  tabeOverview,
  tabeQuestionGuides,
  tabeReadinessChecklist,
  testTakingStrategies,
} from "@/lib/content/eng0300/tabe";
import { eng0300Course } from "@/lib/content/eng0300/course";
import { eng0300Skills } from "@/lib/content/eng0300/skills";

export const metadata: Metadata = {
  title: "TABE Prep Center | ENG0300 Reading Lab",
  description:
    "TABE Reading overview, question-type strategies, and test-taking guidance for ENG0300 Academic Bridge students.",
};

export default function TabePrepPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-eng-navy-500">
          <Link href="/eng0300" className="hover:text-eng-navy-900">
            ENG0300 Reading Lab
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="font-medium text-eng-navy-900">TABE Prep</span>
        </nav>

        <h1 className="font-display text-4xl font-bold text-eng-navy-900">
          TABE Prep Center
        </h1>
        <p className="mt-3 max-w-[68ch] text-lg leading-relaxed text-eng-navy-600">
          What the TABE Reading test asks, how each question type is worded, and
          the strategies that keep an avoidable mistake from costing you a point.
        </p>
      </header>

      {/* Overview */}
      <section className="mb-12 rounded-2xl border border-eng-navy-200 bg-white p-6">
        <h2 className="mb-4 font-display text-2xl font-bold text-eng-navy-900">
          {tabeOverview.heading}
        </h2>

        <div className="max-w-[68ch] space-y-4 text-[1.0625rem] leading-[1.75] text-eng-navy-800">
          {tabeOverview.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tabeOverview.facts.map((fact) => (
            <div key={fact.label} className="rounded-xl bg-eng-navy-50 p-4">
              <dt className="text-xs font-bold uppercase tracking-wide text-eng-navy-500">
                {fact.label}
              </dt>
              <dd className="mt-1 font-semibold leading-snug text-eng-navy-900">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 rounded-lg border-l-4 border-eng-gold-500 bg-eng-gold-50 p-4 text-[0.9375rem] leading-relaxed text-eng-navy-800">
          {tabeOverview.note}
        </p>
      </section>

      {/* Question type guides */}
      <section id="question-types" className="mb-12 scroll-mt-32">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold text-eng-navy-900">
            Question strategies
          </h2>
          <p className="mt-2 max-w-[68ch] text-lg leading-relaxed text-eng-navy-600">
            Seven question types, how each one is usually worded, the approach
            that works, and what the wrong answers tend to look like.
          </p>
        </div>

        <div className="space-y-5">
          {tabeQuestionGuides.map((guide, index) => {
            const skill = eng0300Skills.find((entry) => entry.id === guide.skill);
            return (
              <article
                key={guide.skill}
                className="overflow-hidden rounded-2xl border border-eng-navy-200 bg-white"
              >
                <div className="flex flex-wrap items-center gap-3 border-b border-eng-navy-100 bg-eng-navy-50 px-5 py-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-eng-navy-800 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <h3 className="font-display text-xl font-bold text-eng-navy-900">
                    {guide.title}
                  </h3>
                  {skill && (
                    <Link
                      href={guide.skillHref}
                      className="ml-auto text-sm font-semibold text-eng-teal-700 hover:text-eng-teal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600"
                    >
                      {skill.shortTitle} lab →
                    </Link>
                  )}
                </div>

                <div className="grid gap-6 p-5 lg:grid-cols-3">
                  <div>
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
                      It usually sounds like
                    </h4>
                    <ul className="space-y-2">
                      {guide.soundsLike.map((phrasing) => (
                        <li
                          key={phrasing}
                          className="rounded-lg bg-eng-navy-50 p-3 text-sm italic leading-relaxed text-eng-navy-700"
                        >
                          &ldquo;{phrasing}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-eng-teal-700">
                      What to do
                    </h4>
                    <ol className="space-y-2">
                      {guide.approach.map((step, stepIndex) => (
                        <li
                          key={step}
                          className="flex gap-2 text-sm leading-relaxed text-eng-navy-700"
                        >
                          <span
                            className="font-bold text-eng-teal-700"
                            aria-hidden="true"
                          >
                            {stepIndex + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-eng-gold-700">
                      Wrong answers to expect
                    </h4>
                    <ul className="space-y-2">
                      {guide.distractors.map((distractor) => (
                        <li
                          key={distractor}
                          className="flex gap-2 text-sm leading-relaxed text-eng-navy-700"
                        >
                          <span className="text-eng-gold-600" aria-hidden="true">
                            ✕
                          </span>
                          <span>{distractor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Test-taking strategies */}
      <section id="strategies" className="mb-12 scroll-mt-32">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold text-eng-navy-900">
            Test-taking strategies
          </h2>
          <p className="mt-2 max-w-[68ch] text-lg leading-relaxed text-eng-navy-600">
            These apply to every passage, regardless of the question type.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testTakingStrategies.map((strategy) => (
            <article
              key={strategy.title}
              className="rounded-2xl border border-eng-navy-200 bg-white p-5"
            >
              <h3 className="font-display text-lg font-bold text-eng-navy-900">
                {strategy.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-eng-navy-700">
                {strategy.body}
              </p>
              {strategy.steps && (
                <ul className="mt-4 space-y-2 border-t border-eng-navy-100 pt-4">
                  {strategy.steps.map((step) => (
                    <li
                      key={step}
                      className="flex gap-3 text-sm leading-relaxed text-eng-navy-700"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-eng-teal-600"
                        aria-hidden="true"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Readiness checklist */}
      <section
        id="readiness"
        className="scroll-mt-32 rounded-2xl bg-gradient-to-br from-eng-navy-800 to-eng-navy-900 p-6 text-white sm:p-8"
      >
        <h2 className="font-display text-2xl font-bold">
          Readiness checklist
        </h2>
        <p className="mt-2 max-w-[68ch] leading-relaxed text-white/85">
          Before a progress assessment, read through these. Any one you cannot
          honestly say yes to tells you which skill lab to revisit — and the
          Practice Center has sets for each of them.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {tabeReadinessChecklist.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl bg-white/10 p-4 text-[0.9375rem] leading-relaxed"
            >
              <span className="font-bold text-eng-teal-300" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/eng0300/practice"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-eng-navy-900 transition-colors hover:bg-eng-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-eng-navy-900"
          >
            Go to the Practice Center
          </Link>
          <Link
            href="/eng0300#skills"
            className="rounded-lg border-2 border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-eng-navy-900"
          >
            Back to the skill labs
          </Link>
        </div>

        <p className="mt-6 border-t border-white/20 pt-4 text-sm leading-relaxed text-white/70">
          Goal for this course: a TABE Reading scale score of{" "}
          {eng0300Course.tabeGoal} or above. The TABE itself is administered by
          your program — this page prepares you for it and does not replace it.
        </p>
      </section>
    </div>
  );
}
