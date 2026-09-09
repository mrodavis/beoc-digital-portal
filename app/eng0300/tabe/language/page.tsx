import Link from "next/link";
import type { Metadata } from "next";
import BrightspaceReturn from "@/components/eng0300/BrightspaceReturn";
import {
  tabeLanguageChecklist,
  tabeLanguageDomains,
  tabeLanguageGuides,
  tabeLanguageOverview,
} from "@/lib/content/eng0300/tabe/language";

export const metadata: Metadata = {
  title: "TABE Language Prep | ENG0300",
  description:
    "Seven question-type guides for the TABE 11/12 Language subtest, with worked examples. Original strategy content for BEOC Academic Bridge.",
};

/**
 * TABE Language Prep — sibling to the TABE Reading prep section.
 *
 * Same layout and tone as the Reading guides, but the content is built on the
 * Language blueprint rather than translated from the Reading side: four
 * reporting domains with their own Level M weights, and seven question types
 * that follow from those domains. See lib/content/eng0300/tabe/language.ts.
 */
export default function TabeLanguagePage() {
  return (
    <div>
      <header className="bg-gradient-to-br from-eng-navy-900 to-eng-navy-700">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80">
            <Link href="/eng0300" className="hover:text-white">
              ENG0300
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/eng0300/tabe" className="hover:text-white">
              TABE Prep
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="font-medium text-white">Language</span>
          </nav>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            TABE Language Prep
          </h1>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-white/90 sm:text-lg">
            {tabeLanguageOverview.paragraphs[0]}
          </p>
          <Link
            href="/eng0300/tabe"
            className="mt-5 inline-block rounded-lg bg-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-eng-navy-800"
          >
            ← TABE Reading Prep
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Overview */}
        <section className="mb-12 rounded-2xl border border-eng-navy-200 bg-white p-6">
          <h2 className="font-display text-2xl font-bold text-eng-navy-900">
            {tabeLanguageOverview.heading}
          </h2>
          {tabeLanguageOverview.paragraphs.slice(1).map((paragraph) => (
            <p
              key={paragraph}
              className="mt-3 max-w-[70ch] text-[0.9375rem] leading-relaxed text-eng-navy-700"
            >
              {paragraph}
            </p>
          ))}
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {tabeLanguageOverview.facts.map((fact) => (
              <div key={fact.label} className="rounded-xl bg-eng-navy-50 p-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-eng-navy-500">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-semibold text-eng-navy-900">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-eng-navy-500">
            {tabeLanguageOverview.note}
          </p>
        </section>

        {/* Domain weights */}
        <section className="mb-12">
          <h2 className="mb-2 font-display text-2xl font-bold text-eng-navy-900 sm:text-3xl">
            What the test is made of
          </h2>
          <p className="mb-6 max-w-[70ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
            Four reporting domains, with the share each one takes at Level M —
            the level this course prepares you for. The weights are worth
            knowing: nearly half your Language score comes from conventions, so
            an hour spent on sentence structure moves the number more than an
            hour spent anywhere else.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {tabeLanguageDomains.map((domain) => (
              <li
                key={domain.domain}
                className="rounded-2xl border border-eng-navy-200 bg-white p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-base font-bold text-eng-navy-900">
                    {domain.domain}
                  </h3>
                  <span className="shrink-0 rounded-full bg-eng-gold-100 px-3 py-1 text-sm font-bold text-eng-gold-700">
                    {domain.weight}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-eng-navy-400">
                  {domain.category} strand
                </p>
                <p className="mt-2 text-sm leading-relaxed text-eng-navy-600">
                  {domain.covers}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-eng-navy-400">
            Domains and Level M weights confirmed against Data Recognition
            Corporation&rsquo;s published TABE 11&amp;12 domain structure and
            Level M Language blueprint. Weights differ by test level.
          </p>
        </section>

        {/* Seven guides */}
        <section id="question-types" className="mb-12 scroll-mt-32">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-eng-navy-900 sm:text-3xl">
              Question strategies
            </h2>
            <p className="mt-2 max-w-[70ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
              Seven question types: how each one is usually worded, the trap it
              sets, the move that answers it, and two worked examples.
            </p>
          </div>

          <div className="space-y-5">
            {tabeLanguageGuides.map((guide, index) => (
              <article
                key={guide.id}
                id={guide.id}
                className="scroll-mt-32 overflow-hidden rounded-2xl border border-eng-navy-200 bg-white"
              >
                <div className="flex flex-wrap items-center gap-3 border-b border-eng-navy-100 bg-eng-navy-50 px-5 py-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-eng-navy-800 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-eng-navy-900">
                      {guide.title}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-eng-navy-400">
                      {guide.domain}
                    </p>
                  </div>
                  <Link
                    href={guide.practiceHref}
                    className="ml-auto text-sm font-semibold text-eng-teal-700 hover:text-eng-teal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600"
                  >
                    {guide.practiceLabel} →
                  </Link>
                </div>

                <div className="grid gap-6 p-5 lg:grid-cols-2">
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

                    <h4 className="mb-2 mt-5 text-sm font-bold uppercase tracking-wide text-eng-gold-700">
                      The trap
                    </h4>
                    <p className="rounded-lg bg-eng-gold-50 p-3 text-sm leading-relaxed text-eng-navy-700">
                      {guide.trap}
                    </p>
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
                </div>

                <div className="border-t border-eng-navy-100 bg-eng-navy-50/50 p-5">
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
                    Two worked examples
                  </h4>
                  <ol className="grid gap-4 md:grid-cols-2">
                    {guide.examples.map((example, i) => (
                      <li
                        key={i}
                        className="rounded-xl border border-eng-navy-200 bg-white p-4"
                      >
                        <p className="text-sm font-semibold leading-relaxed text-eng-navy-900">
                          {example.item}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-eng-navy-600">
                          <span className="font-bold uppercase tracking-wide text-eng-navy-400">
                            Thinking
                          </span>{" "}
                          — {example.thinking}
                        </p>
                        <p className="mt-2 rounded-lg bg-eng-green-50 p-2.5 text-sm leading-relaxed text-eng-green-700">
                          <span className="font-bold uppercase tracking-wide">
                            Answer
                          </span>{" "}
                          — {example.answer}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Readiness checklist */}
        <section id="readiness" className="mb-12 scroll-mt-32">
          <h2 className="mb-2 font-display text-2xl font-bold text-eng-navy-900 sm:text-3xl">
            Readiness check
          </h2>
          <p className="mb-5 max-w-[70ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
            Anything you cannot say yes to is where your next practice session
            should go. This is not recorded and it is not a grade.
          </p>
          <ul className="grid gap-3 rounded-2xl border border-eng-navy-200 bg-white p-5 sm:grid-cols-2">
            {tabeLanguageChecklist.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg bg-eng-navy-50 p-3 text-sm leading-relaxed text-eng-navy-700"
              >
                <span className="font-bold text-eng-teal-700" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-2xl border-2 border-dashed border-eng-navy-300 bg-white p-5">
          <h2 className="font-display text-base font-bold text-eng-navy-900">
            What this section does not contain
          </h2>
          <p className="mt-1 max-w-[70ch] text-sm leading-relaxed text-eng-navy-600">
            Every example above was written for this course. Nothing here is
            reproduced from the TABE test, the Scoreboost workbooks, the TABE
            Mastery books, or any answer key. This is TABE-aligned preparation,
            not TABE content.
          </p>
        </div>

        <div className="mt-8">
          <BrightspaceReturn />
        </div>
      </div>
    </div>
  );
}
