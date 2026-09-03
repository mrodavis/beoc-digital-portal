import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import CourseProgress from "@/components/progress/CourseProgress";
import { introDatabaseModules } from "@/lib/content/office-assistant/intro-database";

export default function IntroDatabasePage() {
  // Derived from the module data so these figures cannot drift out of
  // step with the course, which is what had happened when they were
  // hardcoded.
  const moduleCount = introDatabaseModules.length;
  const lessonCount = introDatabaseModules.reduce((n, m) => n + m.lessons.length, 0);

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
          <div className="text-2xl font-bold text-primary-600">{moduleCount}</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{lessonCount}</div>
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

      <div className="mb-8">

        <CourseProgress

          courseId="oap/intro-database"

          total={introDatabaseModules.reduce((n, m) => n + m.lessons.length, 0)}

        />

      </div>


      <SectionHeader
        title="Course Modules"
        description="Complete each module in order to build a practical data management skill set for professional office work."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { num: 1, slug: "module-1", emoji: "🗃️", title: "Introduction to Data & Databases", description: "Understand what data is, why organized records matter in a medical office, and how the concept of a database solves the problems that paper records and scattered files create." },
          { num: 2, slug: "module-2", emoji: "📊", title: "Excel as a Data Tool", description: "Use Microsoft Excel as a powerful data management tool — structure data tables correctly, sort and filter records, write lookup functions, and generate simple reports." },
          { num: 3, slug: "module-3", emoji: "🏛️", title: "Introduction to Microsoft Access", description: "Get started with Microsoft Access — understand what makes it different from Excel, build your first database tables, and enter and edit records in a structured environment." },
          { num: 4, slug: "module-4", emoji: "🔍", title: "Queries, Forms & Reports", description: "Build the three most powerful Access tools — queries that find and analyze data, forms that make data entry easy, and reports that present information professionally." },
          { num: 5, slug: "module-5", emoji: "🔒", title: "Data Integrity & Records Management", description: "Ensure your data stays accurate, consistent, and protected — with validation rules, backup strategies, records retention knowledge, and a complete office data management system." },
        ].map(({ num, slug, emoji, title, description }) => (
          <ModuleCard
            key={num}
            num={num}
            slug={slug}
            emoji={emoji}
            title={title}
            description={description}
            href={`/learning-paths/office-assistant/intro-database/${slug}`}
          />
        ))}
      </div>

    </div>
  );
}
