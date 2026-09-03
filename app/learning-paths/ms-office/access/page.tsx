import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import CourseProgress from "@/components/progress/CourseProgress";
import { accessModules } from "@/lib/content/ms-office/access/modules";

export default function AccessPage() {
  const moduleCount = accessModules.length;
  const lessonCount = accessModules.reduce((n, m) => n + m.lessons.length, 0);
  const hours = Math.round(
    accessModules.reduce((n, m) => n + m.estimatedMinutes, 0) / 60
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link
          href="/learning-paths/ms-office"
          className="hover:text-primary-600"
        >
          Microsoft Office
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Microsoft Access</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl" aria-hidden="true">
            🗄️
          </span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Microsoft Access
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Build a real database rather than a spreadsheet that has outgrown
              itself. Covers table design, relationships and referential
              integrity, queries and SQL, and the forms and reports people
              actually use.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { value: String(moduleCount), label: "Modules" },
          { value: String(lessonCount), label: "Lessons" },
          { value: `${hours}+`, label: "Hours" },
          { value: "SQL", label: "Included" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center"
          >
            <div className="text-2xl font-bold text-primary-600">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Platform note — Access is genuinely not available everywhere. */}
      <div className="bg-violet-50 border-l-4 border-violet-400 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Before you start
        </h2>
        <p className="text-gray-800 leading-relaxed">
          Access is Windows-only and is included in Microsoft 365 Apps for
          business and enterprise, and in Office Professional. There is no Mac
          version and no full browser version. Check which edition you have
          before assuming something is missing — and note that the Google
          Workspace half of this program has no Access equivalent for the same
          reason.
        </p>
      </div>

      <div className="mb-8">

        <CourseProgress

          courseId="ms-office/access"

          total={accessModules.reduce((n, m) => n + m.lessons.length, 0)}

        />

      </div>


      <SectionHeader
        title="Course Modules"
        description="Work through the modules in order — each builds directly on the last."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {accessModules.map((m) => (
          <ModuleCard
            key={m.moduleSlug}
            num={m.moduleNumber}
            slug={m.moduleSlug}
            emoji={m.emoji}
            title={m.title}
            description={m.description}
            href={`/learning-paths/ms-office/access/${m.moduleSlug}`}
          />
        ))}
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What You&apos;ll Need
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Microsoft Access (Microsoft 365 or Office 2024), Windows only</li>
          <li>• Roughly 3 hours across four modules</li>
          <li>• Paper for the design exercises — the first one is done away from the computer</li>
        </ul>
      </div>
    </div>
  );
}
