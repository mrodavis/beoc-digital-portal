import Link from "next/link";
import type { Metadata } from "next";
import { eng0300Skills } from "@/lib/content/eng0300/skills";
import {
  classExerciseHref,
  eng0300ClassExerciseCount,
  eng0300ClassExercises,
} from "@/lib/content/class-exercises";

export const metadata: Metadata = {
  title: "Class Exercises | ENG0300 Reading Lab",
  description:
    "The in-class practice pages, skill labs, and TABE prep from ENG0300, organized by week and skill.",
};

const kindStyles: Record<string, string> = {
  "In-class packet": "bg-eng-navy-100 text-eng-navy-800",
  "Interactive practice": "bg-eng-teal-50 text-eng-teal-800",
  "Skill lab": "bg-eng-teal-50 text-eng-teal-800",
  "TABE practice": "bg-eng-gold-50 text-eng-gold-700",
  Review: "bg-eng-navy-100 text-eng-navy-800",
};

export default function Eng0300ClassExercisesPage() {
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
          <span className="font-medium text-eng-navy-900">Class Exercises</span>
        </nav>

        <h1 className="font-display text-4xl font-bold text-eng-navy-900">
          Class Exercises
        </h1>
        <p className="mt-3 max-w-[68ch] text-lg leading-relaxed text-eng-navy-600">
          {eng0300ClassExerciseCount} pages from class, organized by week. Use
          them to redo a session you missed, review before a quiz, or practice
          for the TABE. Each page opens on its own, keeps your score as you go,
          and links back here.
        </p>

        <p className="mt-4 max-w-[68ch] rounded-lg border-l-4 border-eng-teal-600 bg-eng-teal-50 p-4 text-[0.9375rem] leading-relaxed text-eng-navy-800">
          <span className="font-semibold">Practice here, submit in Brightspace. </span>
          Nothing on these pages is recorded or graded. When a page says to hand
          in your work, upload it to the matching Classwork or Writing box in
          Brightspace.
        </p>

        <nav aria-label="Weeks" className="mt-6 flex flex-wrap gap-2">
          {eng0300ClassExercises.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-eng-navy-200 bg-white px-4 py-1.5 text-sm font-semibold text-eng-navy-700 transition-colors hover:border-eng-teal-600 hover:text-eng-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600"
            >
              {group.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="space-y-12">
        {eng0300ClassExercises.map((group) => {
          const skillLinks = Array.from(
            new Set(group.exercises.flatMap((exercise) => exercise.skills ?? []))
          )
            .map((slug) => eng0300Skills.find((skill) => skill.slug === slug))
            .filter((skill): skill is NonNullable<typeof skill> => Boolean(skill));

          return (
            <section key={group.id} id={group.id} className="scroll-mt-32">
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="rounded-full bg-eng-navy-800 px-3 py-1 text-xs font-bold text-white">
                  {group.label}
                </span>
                <h2 className="font-display text-2xl font-bold text-eng-navy-900">
                  {group.title}
                </h2>
              </div>
              <p className="mb-3 max-w-[68ch] leading-relaxed text-eng-navy-600">
                {group.description}
              </p>
              {skillLinks.length > 0 && group.id !== "tabe" && (
                <p className="mb-5 text-sm text-eng-navy-500">
                  Skill Lab:{" "}
                  {skillLinks.map((skill, i) => (
                    <span key={skill.slug}>
                      {i > 0 && " · "}
                      <Link
                        href={`/eng0300/skills/${skill.slug}`}
                        className="font-semibold text-eng-teal-700 hover:text-eng-teal-900"
                      >
                        {skill.shortTitle}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
              {group.id === "tabe" && (
                <p className="mb-5 text-sm text-eng-navy-500">
                  More prep:{" "}
                  <Link
                    href="/eng0300/tabe"
                    className="font-semibold text-eng-teal-700 hover:text-eng-teal-900"
                  >
                    TABE Prep Center
                  </Link>
                </p>
              )}

              <ul className="grid gap-5 md:grid-cols-2">
                {group.exercises.map((exercise) => (
                  <li key={exercise.slug}>
                    <a
                      href={classExerciseHref("eng0300", exercise.slug)}
                      className="group flex h-full flex-col rounded-2xl border border-eng-navy-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
                    >
                      <span
                        className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold ${kindStyles[exercise.kind]}`}
                      >
                        {exercise.kind}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold text-eng-navy-900">
                        {exercise.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-eng-navy-600">
                        {exercise.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-4 border-t border-eng-navy-100 pt-4 text-sm">
                        <span className="text-eng-navy-500">
                          {exercise.time ? `${exercise.time} · ` : ""}
                          {exercise.features}
                        </span>
                        <span className="shrink-0 font-semibold text-eng-teal-700 group-hover:text-eng-teal-900">
                          Open →
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
