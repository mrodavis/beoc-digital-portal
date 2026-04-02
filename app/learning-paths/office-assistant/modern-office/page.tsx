import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function ModernOfficePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/office-assistant" className="hover:text-primary-600">
          Office Assistant
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Modern Office Operations</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">🏢</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Modern Office Operations with AI
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Learn how to operate in a real modern office using email, cloud tools,
              scheduling, project management systems, CRM tools, and AI.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">8</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">20+</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">5+</div>
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

      <div className="space-y-4 mb-12">

        {/* Module 1 — Available */}
        <Link href="/learning-paths/office-assistant/modern-office/module-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 1
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Digital Office Foundations
                </h3>
                <p className="text-gray-600">
                  Understand how modern offices operate using digital systems and tools.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">Available →</span>
            </div>
          </div>
        </Link><br />

        {/* Modules 2–8 — Coming Soon */}
        {[
          { num: 2, title: "Communication Systems" },
          { num: 3, title: "Document & Data Workflows" },
          { num: 4, title: "Scheduling & Meetings" },
          { num: 5, title: "Task & Project Management" },
          { num: 6, title: "CRM & Office Systems" },
          { num: 7, title: "AI Productivity" },
          { num: 8, title: "Final Simulation" },
        ].map(({ num, title }) => (
          <div
            key={num}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
          >
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
              Module {num}
            </span>
            <h3 className="text-xl font-bold mt-3 mb-2">{title}</h3>
            <p className="text-gray-600">Content unlocking soon.</p>
          </div>
        ))}
      </div>

    </div>
  );
}
