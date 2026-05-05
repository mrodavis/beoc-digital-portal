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
          <div className="text-2xl font-bold text-primary-600">32</div>
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
        {[
          { num: 1, slug: "module-1", title: "Digital Office Foundations", description: "Understand how modern offices operate using digital systems and tools like email, cloud storage, and scheduling platforms." },
          { num: 2, slug: "module-2", title: "Communication Systems", description: "Master professional email writing, workplace chat tools, and video meeting etiquette." },
          { num: 3, slug: "module-3", title: "Document & Data Workflows", description: "Create professional documents, use templates effectively, and manage data in spreadsheets." },
          { num: 4, slug: "module-4", title: "Scheduling & Meetings", description: "Manage digital calendars, book meetings professionally, and resolve scheduling conflicts." },
          { num: 5, slug: "module-5", title: "Task & Project Management", description: "Use task management tools, prioritize work, and keep projects organized across a team." },
          { num: 6, slug: "module-6", title: "CRM & Office Systems", description: "Learn how CRM systems work, manage client records, and maintain professional follow-up." },
          { num: 7, slug: "module-7", title: "AI Productivity", description: "Use AI tools to write faster, automate repetitive tasks, and build a personal AI workflow." },
          { num: 8, slug: "module-8", title: "Final Simulation", description: "Apply all your skills in a realistic office simulation and build your professional portfolio." },
        ].map(({ num, slug, title, description }) => (
          <Link
            key={num}
            href={`/learning-paths/office-assistant/modern-office/${slug}`}
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                    Module {num}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
                <span className="text-green-600 font-semibold text-sm flex-shrink-0 ml-6">
                  Available →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
