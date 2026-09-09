import Link from "next/link";
import { WritingTier } from "@/lib/content/eng0300/writing/tiers";
import SkillStage from "./SkillStage";
import LessonBlock from "./LessonBlock";
import WritingWorkedExampleBlock from "./WritingWorkedExampleBlock";
import WritingSelfCheck from "./WritingSelfCheck";
import WriteItBlock from "./WriteItBlock";
import BrightspaceReturn from "./BrightspaceReturn";
import { sentenceSkills } from "@/lib/content/eng0300/writing/sentence-skills";

/**
 * The shared template behind all three Writing Lab tiers.
 *
 * Deliberately built from the Reading Lab's own components — SkillStage,
 * LessonBlock, and WriteItBlock are the same modules the skill labs use, not
 * copies. The tier pages therefore inherit the Reading Lab's rhythm, spacing,
 * and accessibility behaviour for free, and a fix in one place fixes both.
 */
export default function WritingTierTemplate({
  tier,
  previous,
  next,
}: {
  tier: WritingTier;
  previous?: WritingTier;
  next?: WritingTier;
}) {
  return (
    <div>
      <header className={`bg-gradient-to-br ${tier.accent}`}>
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
            <span className="font-medium text-white">{tier.shortTitle}</span>
          </nav>

          <div className="flex items-start gap-4">
            <span className="text-5xl sm:text-6xl" aria-hidden="true">
              {tier.icon}
            </span>
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-white/70">
                Tier {tier.tier} · Writing Lab
              </p>
              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {tier.title}
              </h1>
              <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-white/90 sm:text-lg">
                {tier.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-10">
        <section className="mb-10 grid gap-6 rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6 md:grid-cols-2">
          <div>
            <h2 className="mb-3 font-display text-lg font-bold text-eng-navy-900">
              By the end of this tier you will be able to
            </h2>
            <ul className="space-y-2">
              {tier.objectives.map((objective) => (
                <li
                  key={objective}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-eng-navy-700"
                >
                  <span className="font-bold text-eng-teal-700" aria-hidden="true">✓</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-display text-lg font-bold text-eng-navy-900">
              What this tier covers
            </h2>
            <ul className="flex flex-wrap gap-2">
              {tier.covers.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full bg-eng-navy-50 px-3 py-1.5 text-sm text-eng-navy-700"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-eng-navy-400">
              About {tier.estimatedMinutes} minutes. Nothing here is graded.
            </p>
          </div>
        </section>

        <div className="space-y-12">
          <SkillStage
            id="learn"
            step={1}
            label="Learn"
            title="How this works"
            description="Read this first. Everything after it assumes these ideas."
          >
            <LessonBlock sections={tier.lesson} />
          </SkillStage>

          <SkillStage
            id="see-it"
            step={2}
            label="See It"
            title="A worked example"
            description="A real draft, improved one decision at a time. The order of the moves is the skill."
          >
            <WritingWorkedExampleBlock example={tier.workedExample} />
          </SkillStage>

          <SkillStage
            id="guided"
            step={3}
            label="Try It"
            title="Guided practice"
            description="Structured practice with support. Nothing here is graded."
          >
            <div className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
              <p className="max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-700">
                {tier.guided.intro}
              </p>

              {tier.guided.steps && (
                <ol className="mt-4 space-y-3">
                  {tier.guided.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-eng-navy-800 text-xs font-bold text-white"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-eng-navy-700">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              {tier.guided.bankSkills && (
                <div className="mt-5">
                  <p className="mb-3 text-sm font-bold uppercase tracking-wide text-eng-navy-500">
                    Drill a skill
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {tier.guided.bankSkills.map((id) => {
                      const skill = sentenceSkills.find((s) => s.id === id);
                      if (!skill) return null;
                      return (
                        <li key={id}>
                          <Link
                            href={`/eng0300/writing-lab/sentence-skills?skill=${id}`}
                            className="inline-block rounded-lg border-2 border-eng-navy-200 bg-white px-3 py-2 text-sm font-medium text-eng-navy-700 transition-colors hover:border-eng-teal-500 hover:bg-eng-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
                          >
                            {skill.label} →
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </SkillStage>

          <SkillStage
            id="independent"
            step={4}
            label="Practice"
            title="Independent practice"
            description="On your own now. Your draft stays in this browser until you copy it somewhere."
          >
            {tier.independent ? (
              <WriteItBlock writeIt={tier.independent} />
            ) : (
              <div className="rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6">
                <p className="max-w-[68ch] text-[0.9375rem] leading-relaxed text-eng-navy-700">
                  Independent practice for this tier is the Sentence Skills
                  engine. Filter to one skill, work a full set, and read the
                  reasoning on every question — including the ones you get
                  right.
                </p>
                <Link
                  href="/eng0300/writing-lab/sentence-skills"
                  className="mt-4 inline-block rounded-lg bg-eng-navy-800 px-5 py-3 font-semibold text-white hover:bg-eng-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-navy-800 focus-visible:ring-offset-2"
                >
                  Open Sentence Skills →
                </Link>
              </div>
            )}
          </SkillStage>

          <SkillStage
            id="self-check"
            step={5}
            label="Self-check"
            title="Check yourself"
            description="Not recorded, not a grade. Use it to decide whether to move on or go back."
          >
            <WritingSelfCheck items={tier.selfCheck} />
          </SkillStage>
        </div>

        <div className="mt-12">
          <BrightspaceReturn
            dropbox={tier.independent?.brightspace.dropbox}
            week={tier.independent?.brightspace.week}
          />
        </div>

        <nav
          aria-label="Writing Lab tiers"
          className="mt-10 flex flex-col gap-4 border-t border-eng-navy-200 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          {previous ? (
            <Link
              href={`/eng0300/writing-lab/${previous.slug}`}
              className="font-medium text-eng-navy-600 transition-colors hover:text-eng-navy-900"
            >
              ← Tier {previous.tier}: {previous.shortTitle}
            </Link>
          ) : (
            <Link
              href="/eng0300/writing-lab"
              className="font-medium text-eng-navy-600 transition-colors hover:text-eng-navy-900"
            >
              ← Writing Lab
            </Link>
          )}
          {next ? (
            <Link
              href={`/eng0300/writing-lab/${next.slug}`}
              className="font-medium text-eng-teal-700 transition-colors hover:text-eng-teal-900 sm:text-right"
            >
              Tier {next.tier}: {next.shortTitle} →
            </Link>
          ) : (
            <Link
              href="/eng0300/tabe/language"
              className="font-medium text-eng-teal-700 transition-colors hover:text-eng-teal-900 sm:text-right"
            >
              TABE Language Prep →
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
