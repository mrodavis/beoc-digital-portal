import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function IntroDatabasePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/office-assistant" className="hover:text-primary-600">
          Office Assistant
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Managing Office Data</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">🗄️</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Managing Office Data
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Learn to organize, manage, and protect the data that keeps a medical office running —
              from Excel data tables to Microsoft Access databases, queries, forms, and reports.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">5</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">20</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">6+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">Excel</div>
          <div className="text-sm text-gray-600">& Access</div>
        </div>
      </div>

      <SectionHeader
        title="Course Modules"
        description="Complete each module in order to build a practical data management skill set for professional office work."
      />

      <div className="space-y-4 mb-12">
        {[
          {
            num: 1,
            slug: "module-1",
            emoji: "🗃️",
            title: "Introduction to Data & Databases",
            description:
              "Understand what data is, why organized records matter in a medical office, and how the concept of a database solves the problems that paper records and scattered files create.",
          },
          {
            num: 2,
            slug: "module-2",
            emoji: "📊",
            title: "Excel as a Data Tool",
            description:
              "Use Microsoft Excel as a powerful data management tool — structure data tables correctly, sort and filter records, write lookup functions, and generate simple reports.",
          },
          {
            num: 3,
            slug: "module-3",
            emoji: "🏛️",
            title: "Introduction to Microsoft Access",
            description:
              "Get started with Microsoft Access — understand what makes it different from Excel, build your first database tables, and enter and edit records in a structured environment.",
          },
          {
            num: 4,
            slug: "module-4",
            emoji: "🔍",
            title: "Queries, Forms & Reports",
            description:
              "Build the three most powerful Access tools — queries that find and analyze data, forms that make data entry easy, and reports that present information professionally.",
          },
          {
            num: 5,
            slug: "module-5",
            emoji: "🔒",
            title: "Data Integrity & Records Management",
            description:
              "Ensure your data stays accurate, consistent, and protected — with validation rules, backup strategies, records retention knowledge, and a complete office data management system.",
          },
        ].map(({ num, slug, emoji, title, description }) => (
          <Link
            key={num}
            href={`/learning-paths/office-assistant/intro-database/${slug}`}
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                      Module {num}
                    </span>
                    <h3 className="text-xl font-bold mt-3 mb-2">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                  </div>
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
