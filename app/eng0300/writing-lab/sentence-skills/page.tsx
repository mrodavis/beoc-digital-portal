import Link from "next/link";
import type { Metadata } from "next";
import SentenceSkillsEngine from "@/components/eng0300/SentenceSkillsEngine";
import BrightspaceReturn from "@/components/eng0300/BrightspaceReturn";
import {
  sentenceBankDifficulties,
  sentenceBankTotal,
  sentenceQuestions,
  sentenceSkills,
} from "@/lib/content/eng0300/writing/sentence-skills";
import { focusForWeek, skillsForWeek } from "@/lib/content/eng0300/writing/weeklyFocus";

export const metadata: Metadata = {
  title: "Sentence Skills | ENG0300 Writing Lab",
  description:
    "Filterable grammar and sentence practice for ENG0300, with an explanation for every choice. Ungraded.",
};

/**
 * The Sentence Skills engine page.
 *
 * Accepts ?skill=<bank skill id> and ?week=<rotation week> so Brightspace and
 * the tier pages can deep-link straight into a filtered set. Both are optional
 * and an unknown value simply falls back to the unfiltered bank.
 */
export default async function SentenceSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ skill?: string; week?: string }>;
}) {
  const params = await searchParams;

  const weekNumber = params.week ? Number(params.week) : NaN;
  const focus = Number.isFinite(weekNumber) ? focusForWeek(weekNumber) : undefined;

  // ?skill wins over ?week; both are validated against the bank before use.
  const requested =
    params.skill && sentenceSkills.some((s) => s.id === params.skill)
      ? params.skill
      : focus
        ? skillsForWeek(focus.week)[0]
        : undefined;

  return (
    <div>
      <header className="bg-gradient-to-br from-eng-navy-900 to-eng-navy-700">
        <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80">
            <Link href="/eng0300" className="hover:text-white">
              ENG0300
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/eng0300/writing-lab" className="hover:text-white">
              Writing Lab
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="font-medium text-white">Sentence Skills</span>
          </nav>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Sentence Skills
          </h1>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-white/90 sm:text-lg">
            {sentenceBankTotal} questions across {sentenceSkills.length} skills.
            Every question explains why each wrong answer is wrong — read those
            even when you answer correctly, because that is where the rule
            lives.
          </p>
          {focus && (
            <p className="mt-4 inline-block rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white">
              Week {focus.week} focus · {focus.label}
            </p>
          )}
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-10">
        <SentenceSkillsEngine
          skills={sentenceSkills}
          questions={sentenceQuestions}
          difficulties={sentenceBankDifficulties}
          initialSkill={requested}
          weekLabel={focus ? `Week ${focus.week} focus` : undefined}
        />

        <div className="mt-12">
          <BrightspaceReturn />
        </div>
      </div>
    </div>
  );
}
