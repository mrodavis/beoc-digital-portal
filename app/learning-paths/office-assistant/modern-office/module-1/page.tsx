import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { module1Lessons } from "@/lib/content/office-assistant/modern-office/module1Lessons";

export default function Module1Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="modern-office"
      courseTitle="Modern Office Operations with AI"
      basePath="office-assistant"
      breadcrumbRootLabel="Modern Office Operations with AI"
      breadcrumbRootHref="/learning-paths/office-assistant"
      moduleNumber={1}
      title="Digital Office Foundations"
      emoji="🏢"
      description="Understand how modern offices operate using digital systems and tools like email, cloud storage, and scheduling platforms."
      lessons={module1Lessons}
      level="Beginner"
      estimatedMinutes={80}
      nextModuleHref="#"
      nextModuleLabel="Module 2: Communication Systems"
      introContent={
        <div className="space-y-6 mb-10">
          {/* What You'll Learn */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What You&apos;ll Learn
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>How modern offices actually operate</li>
              <li>The core tools used in every workplace</li>
              <li>How to set up your own digital workspace</li>
              <li>How AI can assist your daily work</li>
            </ul>
          </div>

          {/* Real-World Scenario */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Real-World Scenario
            </h3>
            <p className="text-gray-700">
              You just got hired as an office assistant at TOR Tech. Your manager
              asks you to organize company files, respond to emails, and prepare
              documents. This module teaches you how to do exactly that.
            </p>
          </div>
        </div>
      }
    />
  );
}
