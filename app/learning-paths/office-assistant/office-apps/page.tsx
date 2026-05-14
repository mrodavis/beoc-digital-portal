import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";

export default function OfficeAppsPage() {
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
              Master Microsoft Office 2019 — Word, Excel, PowerPoint, and Outlook —
              with hands-on lessons built for real office environments.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">6</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">30</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">8+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">2019</div>
          <div className="text-sm text-gray-600">Microsoft Office</div>
        </div>
      </div>

      <SectionHeader
        title="Course Modules"
        description="Complete each module in order to build a complete Microsoft Office 2019 skill set."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { num: 1, slug: "module-1", emoji: "📝", title: "Word Essentials", description: "Navigate the Word 2019 interface and create professionally formatted documents, styles, tables, and page layouts." },
          { num: 2, slug: "module-2", emoji: "📋", title: "Word Advanced", description: "Master mail merge, headers and footers, Track Changes collaboration, and reusable document templates." },
          { num: 3, slug: "module-3", emoji: "📊", title: "Excel Essentials", description: "Enter and format data, write formulas and functions, and organize data with sorting, filtering, and tables." },
          { num: 4, slug: "module-4", emoji: "📈", title: "Excel Advanced", description: "Build charts, create PivotTables, use advanced functions like VLOOKUP and SUMIF, and protect shared workbooks." },
          { num: 5, slug: "module-5", emoji: "🖥️", title: "PowerPoint", description: "Design professional presentations, add media and animations, and deliver confidently using Presenter View." },
          { num: 6, slug: "module-6", emoji: "📬", title: "Outlook & Integration", description: "Manage email and calendar in Outlook 2019 and build integrated workflows across all Office applications." },
        ].map(({ num, slug, emoji, title, description }) => (
          <ModuleCard
            key={num}
            num={num}
            slug={slug}
            emoji={emoji}
            title={title}
            description={description}
            href={`/learning-paths/office-assistant/office-apps/${slug}`}
          />
        ))}
      </div>

    </div>
  );
}
