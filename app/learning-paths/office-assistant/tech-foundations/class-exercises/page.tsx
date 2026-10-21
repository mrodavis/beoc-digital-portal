import Link from "next/link";
import type { Metadata } from "next";
import { techFoundationsModules } from "@/lib/content/office-assistant/tech-foundations";
import {
  classExerciseHref,
  techFoundationsClassExerciseCount,
  techFoundationsClassExercises,
} from "@/lib/content/class-exercises";

export const metadata: Metadata = {
  title: "Class Exercises | Technology Foundations",
  description:
    "Practice labs, simulators, and the Unit 1 review from Digital Literacy I, organized by topic. Self-paced.",
};

const kindStyles: Record<string, string> = {
  "Practice packet": "bg-primary-50 text-primary-700",
  "Interactive practice": "bg-green-50 text-green-700",
  "Skill lab": "bg-green-50 text-green-700",
  "TABE practice": "bg-yellow-50 text-yellow-800",
  Review: "bg-yellow-50 text-yellow-800",
};

export default function TechFoundationsClassExercisesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/office-assistant" className="hover:text-primary-600">
          Office Assistant
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/learning-paths/office-assistant/tech-foundations"
          className="hover:text-primary-600"
        >
          Technology Foundations
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Class Exercises</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl" aria-hidden="true">
            🧪
          </span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Class Exercises
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {techFoundationsClassExerciseCount} labs, simulators, and reviews,
              organized by topic. Work through a lab at your own pace, practice
              with the simulators, or get ready for the Unit 1 exam.
            </p>
          </div>
        </div>

        <div className="max-w-3xl bg-primary-50 border-l-4 border-primary-500 p-5 rounded-xl text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">
              Practice here, then submit.{" "}
            </span>
            The practice packets save your answers in this browser and build a
            packet you can download. Submit that packet to your instructor or
            course folder (BEOC students: the matching assignment folder in
            Brightspace). Nothing on these pages is graded or sent anywhere.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {techFoundationsClassExercises.map((group) => {
          const relatedModules = Array.from(
            new Set(group.exercises.flatMap((exercise) => exercise.modules ?? []))
          )
            .map((slug) => techFoundationsModules.find((m) => m.moduleSlug === slug))
            .filter((m): m is NonNullable<typeof m> => Boolean(m));

          return (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-bold text-white">
                  {group.label}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {group.title}
                </h2>
              </div>
              <p className="mb-2 max-w-3xl text-lg text-gray-600 leading-relaxed">
                {group.description}
              </p>
              {relatedModules.length > 0 && (
                <p className="mb-5 text-sm text-gray-600">
                  Lessons:{" "}
                  {relatedModules.map((m, i) => (
                    <span key={m.moduleSlug}>
                      {i > 0 && " · "}
                      <Link
                        href={`/learning-paths/office-assistant/tech-foundations/${m.moduleSlug}`}
                        className="font-semibold text-primary-600 hover:text-primary-800"
                      >
                        Module {m.moduleNumber}: {m.title}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
              {relatedModules.length === 0 && <div className="mb-5" />}

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.exercises.map((exercise) => (
                  <li key={exercise.slug}>
                    <a
                      href={classExerciseHref("info3020", exercise.slug)}
                      className="group flex h-full flex-col bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      <span
                        className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold ${kindStyles[exercise.kind]}`}
                      >
                        {exercise.kind}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-primary-700">
                        {exercise.title}
                      </h3>
                      <p className="mt-2 flex-1 text-gray-600 leading-relaxed">
                        {exercise.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 text-sm">
                        <span className="text-gray-500">
                          {exercise.time ? `${exercise.time} · ` : ""}
                          {exercise.features}
                        </span>
                        <span className="shrink-0 font-semibold text-primary-600 group-hover:text-primary-800">
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
