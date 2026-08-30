import Link from "next/link";
import { Activity, Skill } from "@/types/eng0300";
import SkillStage from "./SkillStage";
import LessonBlock from "./LessonBlock";
import WorkedExampleBlock from "./WorkedExampleBlock";
import ActivityBlock from "./ActivityBlock";
import AnswerReviewBlock from "./AnswerReviewBlock";
import PendingContent from "./PendingContent";
import SkillProgressControl from "./SkillProgressControl";

/**
 * The shared template behind all seven skill labs.
 *
 * Every skill renders the same instructional sequence — Learn, See It, Try It,
 * Practice, Challenge, Answer Review, Mastery Check — from its content file.
 * Adding a skill means adding data, not a page.
 */
export default function SkillPageTemplate({
  skill,
  previous,
  next,
}: {
  skill: Skill;
  previous?: Skill;
  next?: Skill;
}) {
  const reviewable: { label: string; activity: Activity }[] = [
    skill.practice ? { label: "Practice set", activity: skill.practice } : null,
    skill.challenge ? { label: "Challenge", activity: skill.challenge } : null,
  ].filter((entry): entry is { label: string; activity: Activity } =>
    Boolean(entry)
  );

  return (
    <div>
      {/* Header */}
      <header className={`bg-gradient-to-br ${skill.accent}`}>
        <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80">
            <Link href="/eng0300" className="hover:text-white">
              ENG0300 Reading Lab
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="font-medium text-white">{skill.shortTitle}</span>
          </nav>

          <div className="flex items-start gap-4">
            <span className="text-5xl sm:text-6xl" aria-hidden="true">
              {skill.icon}
            </span>
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-white/70">
                Week {skill.week} · Skill Lab
              </p>
              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {skill.title}
              </h1>
              <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-white/90 sm:text-lg">
                {skill.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Objectives */}
        <section className="mb-10 grid gap-6 rounded-2xl border border-eng-navy-200 bg-white p-5 sm:p-6 md:grid-cols-2">
          <div>
            <h2 className="mb-3 font-display text-lg font-bold text-eng-navy-900">
              By the end of this lab you will be able to
            </h2>
            <ul className="space-y-2">
              {skill.objectives.map((objective) => (
                <li
                  key={objective}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-eng-navy-700"
                >
                  <span className="font-bold text-eng-teal-700" aria-hidden="true">
                    ✓
                  </span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-display text-lg font-bold text-eng-navy-900">
              Course outcomes covered
            </h2>
            <ul className="space-y-2">
              {skill.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="rounded-lg bg-eng-navy-50 p-3 text-sm leading-relaxed text-eng-navy-700"
                >
                  {outcome}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-eng-navy-400">
              From the ENG0300 course syllabus.
            </p>
          </div>
        </section>

        <div className="space-y-12">
          <SkillStage
            id="learn"
            step={1}
            label="Learn"
            title="How this skill works"
            description="Read this first. Everything after it assumes these ideas."
          >
            <LessonBlock sections={skill.lesson} />
          </SkillStage>

          <SkillStage
            id="see-it"
            step={2}
            label="See It"
            title="A worked example"
            description="Watch the reasoning before you try it. Notice the order of the moves — that order is the skill."
          >
            {skill.workedExample ? (
              <WorkedExampleBlock example={skill.workedExample} />
            ) : (
              <PendingContent stage="worked example" skillTitle={skill.title} />
            )}
          </SkillStage>

          <SkillStage
            id="try-it"
            step={3}
            label="Try It"
            title="Your turn, with support"
            description="One question, with a hint available. Nothing here is graded."
          >
            {skill.guided ? (
              <ActivityBlock activity={skill.guided} />
            ) : (
              <PendingContent stage="guided question" skillTitle={skill.title} />
            )}
          </SkillStage>

          <SkillStage
            id="practice"
            step={4}
            label="Practice"
            title="Practice on a full passage"
            description="A longer passage with several questions. Check each answer as you go."
          >
            {skill.practice ? (
              <ActivityBlock activity={skill.practice} />
            ) : (
              <PendingContent stage="practice set" skillTitle={skill.title} />
            )}
          </SkillStage>

          <SkillStage
            id="challenge"
            step={5}
            label="Challenge"
            title="A harder, TABE-style set"
            description="Denser text and less obvious answers — closer to what the test will ask of you."
          >
            {skill.challenge ? (
              <ActivityBlock activity={skill.challenge} />
            ) : (
              <PendingContent stage="challenge set" skillTitle={skill.title} />
            )}
          </SkillStage>

          <SkillStage
            id="answer-review"
            step={6}
            label="Answer Review"
            title="Why each answer is right or wrong"
            description="The reasoning behind every choice, including the ones designed to catch you."
          >
            {reviewable.length > 0 ? (
              <AnswerReviewBlock activities={reviewable} />
            ) : (
              <PendingContent stage="answer review" skillTitle={skill.title} />
            )}
          </SkillStage>

          <SkillStage
            id="mastery-check"
            step={7}
            label="Mastery Check"
            title="Check yourself"
            description="A short formative check. It is not recorded — use it to decide whether to move on or review."
          >
            {skill.masteryCheck ? (
              <ActivityBlock activity={skill.masteryCheck} />
            ) : (
              <PendingContent stage="mastery check" skillTitle={skill.title} />
            )}
          </SkillStage>
        </div>

        {/* Progress + resources */}
        <div className="mt-12 space-y-6">
          <SkillProgressControl skillId={skill.id} skillTitle={skill.title} />

          {skill.resources && skill.resources.length > 0 && (
            <section className="rounded-xl border border-eng-navy-200 bg-white p-5 sm:p-6">
              <h2 className="mb-4 font-display text-lg font-bold text-eng-navy-900">
                Keep going
              </h2>
              <ul className="space-y-3">
                {skill.resources.map((resource) => (
                  <li key={resource.label}>
                    {resource.href ? (
                      <Link
                        href={resource.href}
                        target={resource.external ? "_blank" : undefined}
                        rel={resource.external ? "noopener noreferrer" : undefined}
                        className="group block rounded-lg p-3 transition-colors hover:bg-eng-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600"
                      >
                        <span className="font-semibold text-eng-teal-800 group-hover:text-eng-teal-900">
                          {resource.label}
                          {resource.external && (
                            <span className="ml-1 text-xs font-normal text-eng-navy-400">
                              (opens outside the portal)
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-eng-navy-600">
                          {resource.detail}
                        </span>
                      </Link>
                    ) : (
                      <div className="p-3">
                        <span className="font-semibold text-eng-navy-900">
                          {resource.label}
                        </span>
                        <span className="mt-1 block text-sm text-eng-navy-600">
                          {resource.detail}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Prev / next */}
        <nav
          aria-label="Skill labs"
          className="mt-10 flex flex-col gap-4 border-t border-eng-navy-200 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          {previous ? (
            <Link
              href={`/eng0300/skills/${previous.slug}`}
              className="font-medium text-eng-navy-600 transition-colors hover:text-eng-navy-900"
            >
              ← Week {previous.week}: {previous.shortTitle}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/eng0300/skills/${next.slug}`}
              className="font-medium text-eng-teal-700 transition-colors hover:text-eng-teal-900 sm:text-right"
            >
              Week {next.week}: {next.shortTitle} →
            </Link>
          ) : (
            <Link
              href="/eng0300/tabe"
              className="font-medium text-eng-teal-700 transition-colors hover:text-eng-teal-900 sm:text-right"
            >
              TABE Prep Center →
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
