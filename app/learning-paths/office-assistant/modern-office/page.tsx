import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import { modernOfficeModules } from "@/lib/content/office-assistant/modern-office";

export default function ModernOfficePage() {
  // Derived from the module data so these figures cannot drift out of step
  // with the course, which is what happened when they were hardcoded.
  const moduleCount = modernOfficeModules.length;
  const lessonCount = modernOfficeModules.reduce((n, m) => n + m.lessons.length, 0);
  const hours = Math.round(
    modernOfficeModules.reduce((n, m) => n + m.estimatedMinutes, 0) / 60
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/office-assistant" className="hover:text-primary-600">
          Office Assistant
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Cloud Technology with AI</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">🏢</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cloud Technology with AI
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Understand where computing actually happens — on the machine in
              front of you and in someone else&apos;s data center — then work in
              a real modern office using cloud tools, email, scheduling, project
              management, CRM systems, and AI. Covers INFO 3035.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{moduleCount}</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{lessonCount}</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{hours}+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">AI</div>
          <div className="text-sm text-gray-600">Integrated</div>
        </div>
      </div>

      <SectionHeader
        title="Course Modules"
        description="Complete each module in order to build your modern office skill set."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {modernOfficeModules.map((m) => (
          <ModuleCard
            key={m.moduleSlug}
            num={m.moduleNumber}
            slug={m.moduleSlug}
            emoji={m.emoji}
            title={m.title}
            description={m.description}
            href={`/learning-paths/office-assistant/modern-office/${m.moduleSlug}`}
          />
        ))}
      </div>

    </div>
  );
}
