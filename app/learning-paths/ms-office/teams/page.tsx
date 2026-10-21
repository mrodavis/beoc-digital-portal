import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import CourseProgress from "@/components/progress/CourseProgress";
import { teamsModules } from "@/lib/content/ms-office/teams/modules";

export default function TeamsPage() {
  // Derived from the module data so the figures cannot drift from the course.
  const moduleCount = teamsModules.length;
  const lessonCount = teamsModules.reduce((n, m) => n + m.lessons.length, 0);
  const hours = Math.max(1, Math.round(teamsModules.reduce((n, m) => n + m.estimatedMinutes, 0) / 60));

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ms-office" className="hover:text-primary-600">
          Microsoft Office
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Microsoft Teams</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl" aria-hidden="true">
            💬
          </span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Microsoft Teams</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Work the way a modern office does: chat with coworkers, keep team conversations in channels, share files with the
              right people, and run meetings people are glad they joined. Every lesson ends with hands-on practice in a working
              copy of Teams.
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
          { value: "Sims", label: "Every lesson" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Practice note: school computers cannot sign in to Teams. */}
      <div className="bg-violet-50 border-l-4 border-violet-400 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">How you will practice</h2>
        <p className="text-gray-800 leading-relaxed">
          You do not need a Teams account for this course. Every lesson has a practice simulation and a Challenge Lab: a working
          copy of Teams at Lakeside Medical Associates, a fictional medical office. Your Challenge Lab results page is what you
          submit. If you have Teams through work or school, try the same steps there too.
        </p>
      </div>

      <div className="mb-8">
        <CourseProgress courseId="ms-office/teams" total={lessonCount} />
      </div>

      <SectionHeader title="Course Modules" description="Work through the modules in order. Each one builds on the last." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {teamsModules.map((m) => (
          <ModuleCard
            key={m.moduleSlug}
            num={m.moduleNumber}
            slug={m.moduleSlug}
            emoji={m.emoji}
            title={m.title}
            description={m.description}
            href={`/learning-paths/ms-office/teams/${m.moduleSlug}`}
          />
        ))}
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;ll Need</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• A computer with a web browser (the simulations run in the browser)</li>
          <li>• Optional: Microsoft Teams through a work or school account, or Microsoft Teams (free) for personal use</li>
          <li>• Word or paper for the short written parts of some challenges</li>
        </ul>
      </div>
    </div>
  );
}
