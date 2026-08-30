import Link from "next/link";
import type { Metadata } from "next";
import PracticeBrowser from "@/components/eng0300/PracticeBrowser";
import { eng0300Skills } from "@/lib/content/eng0300/skills";
import {
  difficultyOrder,
  eng0300PracticeSets,
  passageTypes,
  practiceStats,
} from "@/lib/content/eng0300/practice";
import { SkillId } from "@/types/eng0300";

export const metadata: Metadata = {
  title: "Practice Center | ENG0300 Reading Lab",
  description:
    "Filter ENG0300 reading practice by skill, difficulty, and passage type. Ungraded practice with instant feedback.",
};

export default async function PracticeCenterPage({
  searchParams,
}: {
  searchParams: Promise<{ skill?: string }>;
}) {
  const { skill } = await searchParams;

  // Deep links such as /eng0300/practice?skill=vocabulary preselect a filter.
  const initialSkill = eng0300Skills.find((entry) => entry.id === skill)?.id as
    | SkillId
    | undefined;

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
          <span className="font-medium text-eng-navy-900">Practice Center</span>
        </nav>

        <h1 className="font-display text-4xl font-bold text-eng-navy-900">
          Practice Center
        </h1>
        <p className="mt-3 max-w-[68ch] text-lg leading-relaxed text-eng-navy-600">
          {practiceStats.setCount} practice sets and {practiceStats.questionCount}{" "}
          questions across all seven skills. Choose by what you want to work on,
          how hard you want it, or the kind of passage you want to read.
        </p>

        <p className="mt-4 max-w-[68ch] rounded-lg border-l-4 border-eng-teal-600 bg-eng-teal-50 p-4 text-[0.9375rem] leading-relaxed text-eng-navy-800">
          <span className="font-semibold">Nothing here is graded. </span>
          Practice as often as you like — answers and explanations are available
          immediately, and no results are recorded or submitted. Graded work is
          in Brightspace.
        </p>
      </header>

      <PracticeBrowser
        sets={eng0300PracticeSets}
        skills={eng0300Skills}
        initialSkill={initialSkill}
        difficulties={difficultyOrder}
        passageTypes={passageTypes}
      />

      <section className="mt-12 rounded-2xl border border-eng-navy-200 bg-white p-6">
        <h2 className="font-display text-xl font-bold text-eng-navy-900">
          How to use practice well
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Attempt the question before checking. A wrong answer you thought about teaches more than a right answer you guessed.",
            "Read the review for every choice, not just the one you picked.",
            "Work at Foundation and Developing until the reasoning feels automatic, then move to TABE Ready.",
            "Come back to a set a few days later. Recognizing an answer is not the same as being able to find it.",
          ].map((tip) => (
            <li
              key={tip}
              className="flex gap-3 text-[0.9375rem] leading-relaxed text-eng-navy-700"
            >
              <span className="font-bold text-eng-teal-700" aria-hidden="true">
                →
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
