import Link from "next/link";
import type { Metadata } from "next";
import {
  eng0300ResourceCategories,
  withheldMaterials,
} from "@/lib/content/eng0300/resources";
import { brightspaceRelationship } from "@/lib/content/eng0300/course";

export const metadata: Metadata = {
  title: "Resources | ENG0300 Reading Lab",
  description:
    "Reading strategies, vocabulary tools, TABE practice, reference guides, and vetted external resources for ENG0300.",
};

const kindLabels = {
  internal: "In the Reading Lab",
  external: "Opens outside the portal",
  "in-class": "From your instructor",
} as const;

export default function ResourcesPage() {
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
          <span className="font-medium text-eng-navy-900">Resources</span>
        </nav>

        <h1 className="font-display text-4xl font-bold text-eng-navy-900">
          Resources
        </h1>
        <p className="mt-3 max-w-[68ch] text-lg leading-relaxed text-eng-navy-600">
          Everything that supports your reading work in one place — the lessons
          themselves, quick reference guides, and a short list of outside sites
          worth your time.
        </p>
      </header>

      <div className="space-y-10">
        {eng0300ResourceCategories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <div className="mb-5 flex items-start gap-3">
              <span className="text-3xl" aria-hidden="true">
                {category.icon}
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-eng-navy-900">
                  {category.title}
                </h2>
                <p className="mt-1 max-w-[68ch] leading-relaxed text-eng-navy-600">
                  {category.description}
                </p>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.resources.map((resource) => {
                const body = (
                  <>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          resource.kind === "internal"
                            ? "bg-eng-teal-50 text-eng-teal-800"
                            : resource.kind === "external"
                              ? "bg-eng-navy-100 text-eng-navy-700"
                              : "bg-eng-gold-100 text-eng-gold-700"
                        }`}
                      >
                        {kindLabels[resource.kind]}
                      </span>
                      {resource.tag && (
                        <span className="text-xs text-eng-navy-400">
                          {resource.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-base font-bold leading-snug text-eng-navy-900">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-eng-navy-600">
                      {resource.description}
                    </p>
                  </>
                );

                return (
                  <li key={resource.title}>
                    {resource.href ? (
                      <Link
                        href={resource.href}
                        target={
                          resource.kind === "external" ? "_blank" : undefined
                        }
                        rel={
                          resource.kind === "external"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex h-full flex-col rounded-2xl border border-eng-navy-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-eng-teal-600 focus-visible:ring-offset-2"
                      >
                        {body}
                        <span className="mt-4 border-t border-eng-navy-100 pt-3 text-sm font-semibold text-eng-teal-700 group-hover:text-eng-teal-900">
                          {resource.kind === "external" ? "Visit site ↗" : "Open →"}
                        </span>
                      </Link>
                    ) : (
                      <div className="flex h-full flex-col rounded-2xl border border-dashed border-eng-navy-300 bg-eng-navy-50/60 p-5">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* What is deliberately not here */}
      <section className="mt-12 rounded-2xl border border-eng-navy-200 bg-white p-6">
        <h2 className="font-display text-2xl font-bold text-eng-navy-900">
          {withheldMaterials.heading}
        </h2>
        <p className="mt-2 max-w-[68ch] leading-relaxed text-eng-navy-600">
          {withheldMaterials.intro}
        </p>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {withheldMaterials.items.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-eng-navy-100 bg-eng-navy-50 p-4"
            >
              <p className="font-semibold text-eng-navy-900">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-eng-navy-600">
                {item.note}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Brightspace reminder */}
      <section className="mt-8 rounded-2xl border-l-4 border-eng-gold-500 bg-eng-gold-50 p-6">
        <h2 className="font-display text-xl font-bold text-eng-navy-900">
          Where graded work goes
        </h2>
        <p className="mt-2 max-w-[68ch] leading-relaxed text-eng-navy-800">
          {brightspaceRelationship.note} Assignments, submissions, attendance,
          announcements, and grades are all in Brightspace.
        </p>
      </section>
    </div>
  );
}
