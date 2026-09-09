import Link from "next/link";
import type { Metadata } from "next";
import { writingTiers } from "@/lib/content/eng0300/writing/tiers";
import {
  sentenceBankTotal,
  sentenceSkillCounts,
  sentenceSkills,
} from "@/lib/content/eng0300/writing/sentence-skills";
import {
  sentenceSkillsRotation,
  skillsForWeek,
} from "@/lib/content/eng0300/writing/weeklyFocus";
import { writingRubric, writingRubricTotal } from "@/lib/content/eng0300/writing/rubric";
import BrightspaceReturn from "@/components/eng0300/BrightspaceReturn";

export const metadata: Metadata = {
  title: "Writing Lab | ENG0300",
  description:
    "Three tiers — sentence, paragraph, and short response — plus the Sentence Skills practice engine. Ungraded practice for ENG0300 Reading and Writing for Academics.",
};

export default function WritingLabPage() {
  return (
    <div>
      <header className="bg-gradient-to-br from-eng-navy-900 to-eng-teal-800">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80">
            <Link href="/eng0300" className="hover:text-white">
              ENG0300
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="font-medium text-white">Writing Lab</span>
          </nav>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Writing Lab
          </h1>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-white/90 sm:text-lg">
            The writing half of ENG0300. Build up from the sentence, to the
            paragraph, to a short response that answers the question actually
            asked. Practise here as much as you like — nothing on this page is
            graded, and nothing is submitted from it.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Weekly focus — driven entirely by the rotation config */}
        <section className="mb-12 rounded-2xl border-2 border-eng-gold-300 bg-eng-gold-50 p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold text-eng-navy-900">
            Sentence Skills — weekly focus
          </h2>
          <p className="mt-1 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-700">
            One skill per week, in the order that makes each one easier than the
            last. Every question explains why the wrong answers are wrong.
          </p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sentenceSkillsRotation.map((focus) => {
              const covered = skillsForWeek(focus.week);
              const count = covered.reduce(
                (sum, id) => sum + (sentenceSkillCounts[id] ?? 0),
                0
              );
              return (
                <li key={focus.week}>
                  <Link
                    href={`/eng0300/writing-lab/sentence-skills?week=${focus.week}`}
                    className="group flex h-full flex-col rounded-xl border border-eng-navy-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-eng-navy-400">
                      Week {focus.week}
                    </span>
                    <span className="mt-1 font-display text-base font-bold text-eng-navy-900">
                      {focus.label}
                    </span>
                    <span className="mt-1 flex-1 text-sm leading-relaxed text-eng-navy-600">
                      {focus.why}
                    </span>
                    <span className="mt-3 text-xs font-semibold text-eng-teal-700 group-hover:text-eng-teal-900">
                      {count} {count === 1 ? "question" : "questions"} →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Three tiers */}
        <section className="mb-12">
          <h2 className="mb-2 font-display text-2xl font-bold text-eng-navy-900 sm:text-3xl">
            The three tiers
          </h2>
          <p className="mb-6 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
            Work them in order. Each tier assumes the one before it, and the
            short-response tier is where the Reading Lab and the Writing Lab
            finally meet.
          </p>
          <ul className="grid gap-5 md:grid-cols-3">
            {writingTiers.map((tier) => (
              <li key={tier.slug}>
                <Link
                  href={`/eng0300/writing-lab/${tier.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-eng-navy-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
                >
                  <span className="text-4xl" aria-hidden="true">
                    {tier.icon}
                  </span>
                  <span className="mt-3 text-xs font-bold uppercase tracking-widest text-eng-navy-400">
                    Tier {tier.tier}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-eng-navy-900">
                    {tier.shortTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-eng-navy-600">
                    {tier.description}
                  </p>
                  <span className="mt-4 border-t border-eng-navy-100 pt-3 text-xs text-eng-navy-500">
                    {tier.covers.length} topics · ~{tier.estimatedMinutes} min
                    <span className="ml-2 font-semibold text-eng-teal-700 group-hover:text-eng-teal-900">
                      Open →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Sentence Skills engine */}
        <section className="mb-12 rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
          <h2 className="font-display text-2xl font-bold text-eng-navy-900">
            Sentence Skills practice
          </h2>
          <p className="mt-2 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
            {sentenceBankTotal} questions across {sentenceSkills.length} skills,
            filterable by skill and difficulty. Every answer comes with the
            reasoning for all four choices — the explanation is the point, not
            the score.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {sentenceSkills.map((skill) => (
              <li key={skill.id}>
                <Link
                  href={`/eng0300/writing-lab/sentence-skills?skill=${skill.id}`}
                  className="inline-block rounded-lg border-2 border-eng-navy-200 bg-white px-3 py-2 text-sm font-medium text-eng-navy-700 transition-colors hover:border-eng-teal-500 hover:bg-eng-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
                >
                  {skill.label}{" "}
                  <span className="text-eng-navy-400">
                    ({sentenceSkillCounts[skill.id]})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/eng0300/writing-lab/sentence-skills"
            className="mt-5 inline-block rounded-lg bg-eng-navy-800 px-5 py-3 font-semibold text-white hover:bg-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-800 focus-visible:ring-offset-2"
          >
            Open Sentence Skills →
          </Link>
        </section>

        {/* The rubric, stated once, publicly */}
        <section className="mb-12 rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
          <h2 className="font-display text-2xl font-bold text-eng-navy-900">
            How writing is scored — the {writingRubricTotal}-point rubric
          </h2>
          <p className="mt-2 max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-600">
            This is the rubric attached to every writing dropbox in Brightspace.
            It is printed here so you can score your own draft before you submit
            it. Scoring yourself is not a grade and is never recorded.
          </p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {writingRubric.map((strand) => (
              <div
                key={strand.id}
                className="rounded-xl border border-eng-navy-100 bg-eng-navy-50/50 p-4"
              >
                <dt className="font-display text-base font-bold text-eng-navy-900">
                  {strand.label}{" "}
                  <span className="text-eng-teal-700">
                    · {strand.points} {strand.points === 1 ? "point" : "points"}
                  </span>
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-eng-navy-600">
                  {strand.lookFor}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <BrightspaceReturn />
      </div>
    </div>
  );
}
