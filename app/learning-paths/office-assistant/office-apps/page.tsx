import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import CourseProgress from "@/components/progress/CourseProgress";
import { officeAppsModules } from "@/lib/content/office-assistant/office-apps";

export default function OfficeAppsPage() {
  // Derived from the module data so the landing page cannot drift out of step
  // with the course, which is what happened when these counts were hardcoded.
  const moduleCount = officeAppsModules.length;
  const lessonCount = officeAppsModules.reduce((n, m) => n + m.lessons.length, 0);
  const hours = Math.round(
    officeAppsModules.reduce((n, m) => n + m.estimatedMinutes, 0) / 60
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/office-assistant" className="hover:text-primary-600">
          Office Assistant
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Office Productivity Applications</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">📊</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Office Productivity Applications
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Master Microsoft Office — Word, Excel, PowerPoint, and Outlook —
              with hands-on lessons built for real office environments.
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
          <div className="text-2xl font-bold text-primary-600">365</div>
          <div className="text-sm text-gray-600">Microsoft Office</div>
        </div>
      </div>

      <div className="mb-8">

        <CourseProgress

          courseId="oap/office-apps"

          total={officeAppsModules.reduce((n, m) => n + m.lessons.length, 0)}

        />

      </div>


      <SectionHeader
        title="Course Modules"
        description="Complete each module in order to build a complete Microsoft Office skill set."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {officeAppsModules.map((m) => (

          <ModuleCard
            key={m.moduleSlug}
            num={m.moduleNumber}
            slug={m.moduleSlug}
            emoji={m.emoji}
            title={m.title}
            description={m.description}
            href={`/learning-paths/office-assistant/office-apps/${m.moduleSlug}`}
          />
        ))}
      </div>

    </div>
  );
}
