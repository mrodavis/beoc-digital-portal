import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import CourseProgress from "@/components/progress/CourseProgress";
import { onedriveModules } from "@/lib/content/ms-office/onedrive/modules";

export default function OneDrivePage() {
  // Derived from the module data so the figures can't drift from the course.
  const moduleCount = onedriveModules.length;
  const lessonCount = onedriveModules.reduce((n, m) => n + m.lessons.length, 0);
  const minutes = onedriveModules.reduce((n, m) => n + m.estimatedMinutes, 0);
  const hours = Math.max(1, Math.round(minutes / 60));

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ms-office" className="hover:text-primary-600">
          Microsoft Office
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Microsoft OneDrive</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">☁️</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Microsoft OneDrive</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Store, organize, share, and protect work files in the cloud. Learn to share with the right
              permission, recover anything you delete or overwrite, keep files in sync with your PC, and use
              OneDrive with Teams, Outlook, and Office, all in the setting of a busy medical office.
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
          <div className="text-2xl font-bold text-primary-600">Hands-on</div>
          <div className="text-sm text-gray-600">Practice simulations</div>
        </div>
      </div>

      <div className="mb-8">
        <CourseProgress courseId="ms-office/onedrive" total={lessonCount} />
      </div>

      <SectionHeader
        title="Workforce Readiness Track"
        description="Job-ready OneDrive skills for a professional office, at your own pace."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {onedriveModules.map((m) => (
          <ModuleCard
            key={m.moduleSlug}
            num={m.moduleNumber}
            slug={m.moduleSlug}
            emoji={m.emoji}
            title={m.title}
            description={m.description}
            href={`/learning-paths/ms-office/onedrive/${m.moduleSlug}`}
            level={m.level}
            estimatedMinutes={m.estimatedMinutes}
            lessonCount={m.lessons.length}
          />
        ))}
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-3">Before you start</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Basic computer and web browser skills</li>
          <li>• A school or work Microsoft 365 account for the real-OneDrive challenges (practice simulations work without one)</li>
          <li>• Patient information in this course is always fictional. Never practice with real patient data.</li>
        </ul>
      </div>
    </div>
  );
}
