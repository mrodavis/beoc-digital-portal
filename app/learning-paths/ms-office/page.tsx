import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function MicrosoftOfficePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Microsoft Office 2019
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Master the essential productivity tools used in modern workplaces.
          Structured workforce-ready curriculum covering Word, Excel,
          and presentation software from beginner to certification level.
        </p>
      </div>

      {/* Course Overview */}
      <div className="mb-12 bg-primary-50 border border-primary-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Program Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              15+
            </div>
            <div className="font-semibold">Structured Modules</div>
            <div className="text-sm text-gray-600">
              Across Word & Excel
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              20+
            </div>
            <div className="font-semibold">Hours of Content</div>
            <div className="text-sm text-gray-600">
              Video lessons & practice projects
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              MOS
            </div>
            <div className="font-semibold">Certification Focused</div>
            <div className="text-sm text-gray-600">
              Designed for official exam prep
            </div>
          </div>
        </div>
      </div>

      {/* Applications */}
      <SectionHeader
        title="Applications"
        description="Choose an application to begin your structured learning path."
      />

      <div className="grid md:grid-cols-3 gap-8 mb-12">

        {/* WORD */}
        <Link href="/learning-paths/ms-office/word">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">📝</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Word 2019
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Professional document creation, formatting mastery,
              collaboration tools, and certification-level training.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                Live
              </span>
              <span>•</span>
              <span>8 Modules</span>
            </div>
          </div>
        </Link>

        {/* EXCEL */}
        <Link href="/learning-paths/ms-office/excel">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">📊</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Excel 2019
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Data analysis, formulas, PivotTables, dashboards,
              and real-world spreadsheet skills.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                In Progress
              </span>
              <span>•</span>
              <span>7 Modules Planned</span>
            </div>
          </div>
        </Link>

        {/* POWERPOINT */}
        <Link href="/learning-paths/ms-office/powerpoint">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover h-full">
            <div className="text-5xl mb-4">🎨</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              PowerPoint 2019
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Slide design, storytelling, visual communication,
              and presentation mastery.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                Planned
              </span>
              <span>•</span>
              <span>5 Modules</span>
            </div>
          </div>
        </Link>

      </div>

      {/* Recommended Path */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recommended Learning Path
        </h2>

        <div className="space-y-4">

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Start with Word
              </h3>
              <p className="text-sm text-gray-600">
                Build strong document formatting and collaboration skills.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Move to Excel
              </h3>
              <p className="text-sm text-gray-600">
                Develop data literacy and spreadsheet confidence.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">
                Add PowerPoint
              </h3>
              <p className="text-sm text-gray-600">
                Communicate insights professionally.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}