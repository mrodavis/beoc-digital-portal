import Link from "next/link";
import SkillCard from "@/components/eng0300/SkillCard";
import { eng0300Skills } from "@/lib/content/eng0300/skills";
import { eng0300Roadmap } from "@/lib/content/eng0300/roadmap";
import { practiceStats } from "@/lib/content/eng0300/practice";
import {
  brightspaceRelationship,
  eng0300Course,
} from "@/lib/content/eng0300/course";

const centers = [
  {
    href: "/eng0300/practice",
    icon: "🧪",
    title: "Practice Center",
    description:
      "Every practice set in the lab, filterable by skill, difficulty, and passage type. Ungraded, with instant feedback.",
    meta: `${practiceStats.setCount} sets · ${practiceStats.questionCount} questions`,
  },
  {
    href: "/eng0300/tabe",
    icon: "🎯",
    title: "TABE Prep",
    description:
      "What the Reading test asks, how each question type is worded, and the strategies that protect your score.",
    meta: "7 question-type guides",
  },
  {
    href: "/eng0300/resources",
    icon: "📚",
    title: "Resources",
    description:
      "Reading strategies, vocabulary tools, reference guides, and trustworthy outside practice.",
    meta: "6 categories",
  },
];

export default function Eng0300Dashboard() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <header className="mb-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-eng-teal-700">
          {eng0300Course.program} · {eng0300Course.courseTitle}
        </p>
        <h1 className="font-display text-4xl font-bold text-eng-navy-900 sm:text-5xl">
          {eng0300Course.title}
        </h1>
        <p className="mt-4 max-w-[42ch] font-display text-xl text-eng-teal-800 sm:text-2xl">
          {eng0300Course.subtitle}
        </p>
      </header>

      {/* Start Here + Reading Goal */}
      <div className="mb-14 grid gap-6 lg:grid-cols-3">
        <section
          id="start-here"
          className="scroll-mt-32 rounded-2xl border border-eng-navy-200 bg-white p-6 lg:col-span-2"
        >
          <h2 className="mb-4 font-display text-2xl font-bold text-eng-navy-900">
            Start here
          </h2>

          <div className="max-w-[68ch] space-y-4 text-[1.0625rem] leading-[1.75] text-eng-navy-800">
            <p>
              ENG0300 is a reading course. It is not about reading faster or
              reading more — it is about reading closely enough that you can say
              what a text means, point to the part that proves it, and judge
              whether the author actually made their case.
            </p>
            <p>
              {eng0300Course.description}
            </p>
            <p>
              The Reading Lab is where you learn and practice those skills between
              class meetings. Each of the seven skill labs follows the same
              sequence: read the lesson, watch a worked example, try a guided
              question, practice on a full passage, take on a harder challenge,
              review why each answer was right or wrong, then check yourself.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-eng-teal-50 p-4">
              <h3 className="mb-2 font-bold text-eng-navy-900">
                {brightspaceRelationship.here.label}
              </h3>
              <ul className="space-y-1.5 text-sm leading-relaxed text-eng-navy-700">
                {brightspaceRelationship.here.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-eng-teal-700" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-eng-navy-50 p-4">
              <h3 className="mb-2 font-bold text-eng-navy-900">
                {brightspaceRelationship.brightspace.label}
              </h3>
              <ul className="space-y-1.5 text-sm leading-relaxed text-eng-navy-700">
                {brightspaceRelationship.brightspace.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-eng-navy-400" aria-hidden="true">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 rounded-lg border-l-4 border-eng-gold-500 bg-eng-gold-50 p-4 text-[0.9375rem] leading-relaxed text-eng-navy-800">
            {brightspaceRelationship.note}
          </p>
        </section>

        {/* Reading Goal */}
        <section
          aria-labelledby="reading-goal"
          className="flex flex-col rounded-2xl bg-gradient-to-br from-eng-navy-800 to-eng-navy-900 p-6 text-white"
        >
          <h2
            id="reading-goal"
            className="text-sm font-bold uppercase tracking-widest text-white/70"
          >
            TABE Reading Goal
          </h2>
          <p className="mt-3 font-display text-6xl font-bold leading-none">
            {eng0300Course.tabeGoal}
            <span className="text-4xl">+</span>
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/85">
            You are building the reading comprehension skills required for
            Academic Bridge progression. A TABE Reading scale score of{" "}
            {eng0300Course.tabeGoal} or above is the benchmark this course is
            built around.
          </p>
          <p className="mt-4 rounded-lg bg-white/10 p-3 text-sm leading-relaxed text-white/85">
            <span className="font-semibold">Course completion requirement: </span>
            {eng0300Course.completionRequirement}
          </p>
          <Link
            href="/eng0300/tabe"
            className="mt-auto inline-block rounded-lg bg-white px-5 py-3 text-center font-semibold text-eng-navy-900 transition-colors hover:bg-eng-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-eng-navy-900"
          >
            Open TABE Prep
          </Link>
        </section>
      </div>

      {/* Skill Labs */}
      <section id="skills" className="mb-14 scroll-mt-32">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold text-eng-navy-900">
            Skill Labs
          </h2>
          <p className="mt-2 max-w-[68ch] text-lg leading-relaxed text-eng-navy-600">
            Seven skills, one per week of the course. Work through them in order,
            or jump to the one your instructor is covering.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eng0300Skills.map((skill) => (
            <li key={skill.id}>
              <SkillCard skill={skill} />
            </li>
          ))}
        </ul>
      </section>

      {/* Centers */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-3xl font-bold text-eng-navy-900">
          Practice, prep, and resources
        </h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {centers.map((center) => (
            <li key={center.href}>
              <Link
                href={center.href}
                className="group flex h-full flex-col rounded-2xl border border-eng-navy-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
              >
                <span className="text-4xl" aria-hidden="true">
                  {center.icon}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-eng-navy-900">
                  {center.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-eng-navy-600">
                  {center.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-eng-navy-100 pt-4 text-sm">
                  <span className="text-eng-navy-500">{center.meta}</span>
                  <span className="font-semibold text-eng-teal-700 group-hover:text-eng-teal-900">
                    Open →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="scroll-mt-32">
        <div className="mb-6">
          <h2 className="font-display text-3xl font-bold text-eng-navy-900">
            Course Roadmap
          </h2>
          <p className="mt-2 max-w-[68ch] text-lg leading-relaxed text-eng-navy-600">
            {eng0300Course.weeks} weeks, {eng0300Course.meetings} instructional
            meetings. Your instructor sets the calendar dates — this is the
            sequence.
          </p>
        </div>

        <ol className="space-y-4">
          {eng0300Roadmap.map((week) => {
            const skill = eng0300Skills.find((entry) => entry.id === week.skill);
            return (
              <li
                key={week.week}
                className="overflow-hidden rounded-2xl border border-eng-navy-200 bg-white"
              >
                <div className="flex flex-wrap items-center gap-3 border-b border-eng-navy-100 bg-eng-navy-50 px-5 py-3">
                  <span className="rounded-full bg-eng-navy-800 px-3 py-1 text-xs font-bold text-white">
                    Week {week.week}
                  </span>
                  <h3 className="font-display text-lg font-bold text-eng-navy-900">
                    {week.focus}
                  </h3>
                  {skill && (
                    <Link
                      href={`/eng0300/skills/${skill.slug}`}
                      className="ml-auto text-sm font-semibold text-eng-teal-700 hover:text-eng-teal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600"
                    >
                      Open skill lab →
                    </Link>
                  )}
                </div>

                <div className="grid gap-px bg-eng-navy-100 sm:grid-cols-2">
                  {week.meetings.map((meeting) => (
                    <div key={meeting.day} className="bg-white p-5">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-eng-teal-700">
                        Meeting {meeting.day}
                      </p>
                      <p className="font-semibold leading-snug text-eng-navy-900">
                        {meeting.topic}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-eng-navy-600">
                        <span className="font-semibold text-eng-navy-700">
                          In class:{" "}
                        </span>
                        {meeting.inClass}
                      </p>
                      <div className="mt-3 border-t border-eng-navy-100 pt-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-eng-navy-400">
                          Homework
                        </p>
                        <ul className="mt-1 space-y-1 text-sm text-eng-navy-600">
                          {meeting.homework.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 max-w-[68ch] rounded-xl border border-eng-navy-200 bg-white p-4 text-sm leading-relaxed text-eng-navy-600">
          Homework entries name the workbook and page range assigned in the
          syllabus. Those workbooks are copyrighted print materials distributed
          in class — they are not available for download here.
        </p>
      </section>
    </div>
  );
}
