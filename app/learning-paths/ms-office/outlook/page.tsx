import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import CourseProgress from "@/components/progress/CourseProgress";
import { outlookModules } from "@/lib/content/ms-office/outlook/modules";
import { simCount } from "@/lib/sims";

export default function OutlookPage() {
  // Derived from the module data so the figures stay in step with the course.
  const moduleCount = outlookModules.length;
  const lessonCount = outlookModules.reduce((n, m) => n + m.lessons.length, 0);
  const hours = Math.max(1, Math.round(outlookModules.reduce((n, m) => n + m.estimatedMinutes, 0) / 60));
  const sims = simCount("ms-office/outlook");

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ms-office" className="hover:text-primary-600">
          Microsoft Office
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Microsoft Outlook</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl" aria-hidden="true">
            📧
          </span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Microsoft Outlook</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Email, calendar, contacts and tasks the way a busy medical office uses them: writing professional messages, keeping a shared inbox
              under control, scheduling meetings across a team, and protecting patient information.
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
          { value: String(sims), label: "Practice simulations" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Which Outlook */}
      <div className="bg-sky-50 border-l-4 border-sky-400 rounded-xl p-6 mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Which Outlook does this course teach?</h2>
        <p className="text-gray-800 leading-relaxed mb-2">
          This course teaches the new Outlook for Windows, which looks and works almost the same as Outlook on the web. The practice simulations
          are copies of the new Outlook window. Where classic Outlook (the desktop app with a File tab) works differently, the lesson tells you,
          so you can follow along on either one.
        </p>
        <p className="text-gray-800 leading-relaxed">
          Certification: Microsoft does not offer an Outlook exam in its Microsoft 365 Apps series. The Microsoft Office Specialist Outlook exam
          that Certiport currently lists is Outlook Associate (Office 2019), exam MO-400, which is based on classic Outlook.
        </p>
      </div>

      <div className="mb-8">
        <CourseProgress courseId="ms-office/outlook" total={lessonCount} />
      </div>

      <SectionHeader title="Course Modules" description="Work through the modules in order. Each module ends with practice in a working copy of Outlook." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {outlookModules.map((m) => (
          <ModuleCard
            key={m.moduleSlug}
            num={m.moduleNumber}
            slug={m.moduleSlug}
            emoji={m.emoji}
            title={m.title}
            description={m.description}
            href={`/learning-paths/ms-office/outlook/${m.moduleSlug}`}
          />
        ))}
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;ll Need</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Nothing to install: every lesson has practice simulations you can do on a school computer</li>
          <li>• Optional: the new Outlook for Windows, classic Outlook, or Outlook on the web with a work or school account</li>
          <li>• Never practice with real patient information. Use the fictional Lakeside Medical Associates examples</li>
        </ul>
      </div>
    </div>
  );
}
