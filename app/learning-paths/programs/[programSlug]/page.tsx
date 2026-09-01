import Link from "next/link";
import { notFound } from "next/navigation";
import { programs, programList } from "@/lib/content/programs";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";

export function generateStaticParams() {
  return programList.map((p) => ({ programSlug: p.slug }));
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ programSlug: string }>;
}) {
  const { programSlug } = await params;
  const program = programs[programSlug];
  if (!program) return notFound();

  const totalLessons = program.modules.reduce(
    (n, m) => n + m.lessons.length,
    0
  );
  const totalHours = Math.round(
    program.modules.reduce((n, m) => n + m.estimatedMinutes, 0) / 60
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{program.shortTitle}</span>
      </div>

      {/* Header */}
      <div
        className={`rounded-2xl bg-gradient-to-r ${program.accent} text-white p-8 md:p-12 mb-10`}
      >
        <div className="text-5xl mb-4" aria-hidden="true">
          {program.icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-white/90">
          {program.description}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { value: String(program.modules.length), label: "Modules" },
          { value: String(totalLessons), label: "Lessons" },
          { value: `${totalHours}+`, label: "Hours" },
          { value: String(program.outcomes.length), label: "Outcomes" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center"
          >
            <div className="text-2xl font-bold text-primary-600">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Overview + outcomes */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            About This Program
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {program.overview}
          </p>
          <h3 className="font-semibold text-gray-900 mb-2">
            By the end of this program you can
          </h3>
          <ul className="space-y-2">
            {program.outcomes.map((o, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span
                  className="flex-shrink-0 text-primary-600 font-bold"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">
              Roles This Prepares You For
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              {program.careerRoles.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {program.relatedCertifications && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                Related Certifications
              </h3>
              <ul className="space-y-3 text-sm">
                {program.relatedCertifications.map((c, i) => (
                  <li key={i}>
                    <div className="font-medium text-gray-900">{c.name}</div>
                    <div className="text-gray-600">{c.body}</div>
                    {c.note && (
                      <div className="text-gray-500 text-xs mt-1">{c.note}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Scope of this coursework — deliberately prominent. */}
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          What This Coursework Is
        </h2>
        <p className="text-gray-800 leading-relaxed">
          {program.credentialNote}
        </p>
      </div>

      {/* Modules */}
      <SectionHeader
        title="Course Modules"
        description="Work through the modules in order — each one builds on the last."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {program.modules.map((m) => (
          <ModuleCard
            key={m.moduleSlug}
            num={m.moduleNumber}
            slug={m.moduleSlug}
            emoji={m.emoji}
            title={m.title}
            description={m.description}
            href={`/learning-paths/programs/${program.slug}/${m.moduleSlug}`}
          />
        ))}
      </div>
    </div>
  );
}
