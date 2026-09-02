import Link from "next/link";
import {
  coursePolicy,
  engl0150Course,
  learningGoals,
  sessionSequence,
} from "@/lib/content/engl0150/course";
import { advancedTopics, courseMap } from "@/lib/content/engl0150/topics";

export default function Engl0150Home() {
  const units = Array.from(new Set(courseMap.map((t) => t.unit)));

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      {/* Hero */}
      <header className="rounded-3xl bg-gradient-to-br from-engl-care-800 to-engl-ink-900 p-8 text-white sm:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-engl-care-200">
          {engl0150Course.code} · Section {engl0150Course.section}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
          {engl0150Course.title}
        </h1>
        <p className="mt-4 max-w-[70ch] leading-relaxed text-white/90">
          {engl0150Course.positioning}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/engl0150/topics/1"
            className="rounded-xl bg-white px-5 py-3 font-semibold text-engl-ink-900 transition-colors hover:bg-engl-care-50"
          >
            Start with Topic 1
          </Link>
          <Link
            href="/engl0150/word-bank"
            className="rounded-xl border border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Healthcare Word Bank
          </Link>
        </div>
      </header>

      {/* Course facts */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-engl-ink-200 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-engl-ink-900">
            Course details
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            {[
              ["Term", engl0150Course.term],
              ["Dates", engl0150Course.dates],
              ["Delivery", engl0150Course.delivery],
              ["For", engl0150Course.audience],
              ["Institution", engl0150Course.institution],
            ].map(([k, v]) => (
              <div key={k} className="sm:flex sm:gap-3">
                <dt className="font-semibold text-engl-ink-900 sm:w-24 sm:shrink-0">
                  {k}
                </dt>
                <dd className="text-engl-ink-700">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-engl-ink-200 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-engl-ink-900">
            Your instructors
          </h2>
          <ul className="mt-3 space-y-3 text-sm">
            {engl0150Course.instructors.map((i) => (
              <li key={i.name}>
                <p className="font-semibold text-engl-ink-900">{i.name}</p>
                <p className="text-engl-ink-700">{i.officeHours}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-engl-ink-600">
            All materials are distributed through Brightspace. Assignments are
            submitted there — this site is for learning and practice.
          </p>
        </div>
      </section>

      {/* Five learning goals */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          What you will be able to do
        </h2>
        <p className="mt-1 text-engl-ink-600">
          Five goals run through every topic. Each topic page names the ones it
          advances.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {learningGoals.map((goal) => (
            <div
              key={goal.id}
              className="rounded-2xl border border-engl-ink-200 bg-white p-5"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-engl-care-700">
                  {goal.number}
                </span>
                <h3 className="font-display text-lg font-bold text-engl-ink-900">
                  {goal.title}
                </h3>
              </div>
              {goal.qualifier && (
                <p className="mt-0.5 text-sm font-medium text-engl-plum-700">
                  {goal.qualifier}
                </p>
              )}
              <ul className="mt-3 space-y-1.5">
                {goal.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-2 text-sm text-engl-ink-700">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-engl-care-600" aria-hidden="true" />
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Course map */}
      <section id="topics" className="mt-10 scroll-mt-32">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          Course map
        </h2>
        <p className="mt-1 text-engl-ink-600">
          Ten topics across five units, then the final assessment. Every topic
          produces something you would actually write at work.
        </p>

        <div className="mt-5 space-y-6">
          {units.map((unitNumber) => {
            const rows = courseMap.filter((t) => t.unit === unitNumber);
            return (
              <div key={unitNumber}>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-engl-ink-500">
                  {unitNumber === 6
                    ? "Final"
                    : `Unit ${unitNumber} — ${rows[0].unitTitle}`}
                </h3>
                <ul className="space-y-2">
                  {rows.map((t) => {
                    const body = (
                      <>
                        <div className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-display font-bold text-engl-ink-900">
                            {t.number === "final"
                              ? "Final"
                              : `Topic ${t.number}`}
                          </span>
                          <span className="text-engl-ink-800">{t.title}</span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                          <span className="rounded bg-engl-ink-100 px-2 py-0.5 text-engl-ink-700">
                            {t.sessions}{" "}
                            {t.sessions === "1" ? "session" : "sessions"}
                          </span>
                          <span className="text-engl-ink-600">{t.product}</span>
                          {!t.built && (
                            <span className="rounded bg-amber-100 px-2 py-0.5 font-medium text-amber-800">
                              In development
                            </span>
                          )}
                        </div>
                      </>
                    );

                    return (
                      <li key={String(t.number)}>
                        {t.built ? (
                          <Link
                            href={t.number === "final" ? "/engl0150/final" : `/engl0150/topics/${t.number}`}
                            className="block rounded-2xl border border-engl-ink-200 bg-white p-4 transition-colors hover:border-engl-care-400 hover:bg-engl-care-50"
                          >
                            {body}
                          </Link>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-engl-ink-300 bg-engl-ink-50/50 p-4">
                            {body}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Advanced topics */}
      <section id="advanced" className="mt-10 scroll-mt-32">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          Advanced topics
        </h2>
        <p className="mt-1 max-w-[70ch] text-engl-ink-600">
          Optional extensions beyond the ten core topics. These are not on the
          Fall 1 calendar — take them if your program calls for them, or work
          through them on your own.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {advancedTopics.map((t) => (
            <li key={t.number}>
              <Link
                href={`/engl0150/topics/${t.number}`}
                className="flex h-full flex-col rounded-2xl border border-engl-plum-200 bg-white p-4 transition-colors hover:border-engl-plum-500 hover:bg-engl-plum-50"
              >
                <span className="font-display font-bold text-engl-ink-900">
                  {t.title}
                </span>
                <span className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded bg-engl-plum-100 px-2 py-0.5 text-xs font-semibold text-engl-plum-800">
                    Advanced
                  </span>
                  {t.programs?.map((prog) => (
                    <span
                      key={prog}
                      className="rounded bg-engl-care-100 px-2 py-0.5 text-xs font-semibold text-engl-care-800"
                    >
                      {prog}
                    </span>
                  ))}
                </span>
                <span className="mt-2 text-sm text-engl-ink-600">
                  {typeof t.essentialQuestion === "string"
                    ? t.essentialQuestion
                    : t.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How a topic runs */}
      <section className="mt-10 rounded-2xl border border-engl-ink-200 bg-white p-6">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          How a topic runs
        </h2>
        <p className="mt-1 text-engl-ink-600">
          Every topic follows the same seven-part shape. That repetition is
          deliberate — once you know the pattern, you can spend your attention on
          the writing instead of on the format.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-engl-ink-900">Session 1</h3>
            <ol className="mt-2 space-y-1 text-sm text-engl-ink-700">
              {sessionSequence.one.map((s, i) => (
                <li key={i}>
                  {i + 1}. {s}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-engl-ink-900">Session 2</h3>
            <ol className="mt-2 space-y-1 text-sm text-engl-ink-700">
              {sessionSequence.two.map((s, i) => (
                <li key={i}>
                  {i + 7}. {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* AI stance */}
      <section className="mt-6 rounded-2xl border border-engl-plum-300 bg-engl-plum-50 p-6">
        <h2 className="font-display text-2xl font-bold text-engl-plum-900">
          {engl0150Course.aiStance}
        </h2>
        <p className="mt-2 leading-relaxed text-engl-ink-800">
          {engl0150Course.aiDetail}
        </p>
      </section>

      {/* Policy */}
      <section className="mt-6 rounded-2xl border border-engl-ink-200 bg-white p-6">
        <h2 className="font-display text-2xl font-bold text-engl-ink-900">
          Grading and course policy
        </h2>
        <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-engl-ink-200">
              <th className="pb-2 font-semibold text-engl-ink-900">Category</th>
              <th className="pb-2 font-semibold text-engl-ink-900">Weight</th>
            </tr>
          </thead>
          <tbody>
            {coursePolicy.grading.map((g) => (
              <tr key={g.category} className="border-b border-engl-ink-100">
                <td className="py-2 text-engl-ink-800">
                  {g.category}
                  {g.note && (
                    <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      {g.note}
                    </span>
                  )}
                </td>
                <td className="py-2 font-medium text-engl-ink-900">{g.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          {[
            ["Late work", coursePolicy.lateWork],
            ["Quizzes", coursePolicy.quizzes],
            ["Major tests", coursePolicy.majorTests],
            ["Attendance", coursePolicy.attendance],
            ["Supplies", coursePolicy.supplies],
            ["Accommodations", coursePolicy.accommodations],
            ["Brightspace support", coursePolicy.brightspaceSupport],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-semibold text-engl-ink-900">{k}</dt>
              <dd className="leading-relaxed text-engl-ink-700">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 rounded-xl bg-engl-ink-50 p-4 text-sm text-engl-ink-600">
          The course syllabus is the authoritative source for all policy. If
          anything on this page disagrees with the syllabus, the syllabus is
          correct and this page will be updated.
        </p>
      </section>

      <p className="mt-8 text-center text-sm text-engl-ink-500">
        {engl0150Course.curriculumCredit}
      </p>
    </div>
  );
}
