import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function ExcelPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ms-office" className="hover:text-primary-600">
          Microsoft Office 2019
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Excel 2019</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">📊</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Excel 2019
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Master Excel from spreadsheet fundamentals to advanced data analysis,
              PivotTables, dashboards, and MOS certification readiness.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">7</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">1</div>
          <div className="text-sm text-gray-600">Assessment</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">8+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">MOS</div>
          <div className="text-sm text-gray-600">Cert Prep</div>
        </div>
      </div>

      {/* ================= FOUNDATION TRACK ================= */}
      <SectionHeader
        title="Excel Foundations (Modules 1–3)"
        description="Build strong spreadsheet fundamentals used in every office environment."
      />

      <div className="space-y-4 mb-8">

        {/* Module 1 */}
        <Link href="/learning-paths/ms-office/excel/module-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 1
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Excel Fundamentals
                </h3>
                <p className="text-gray-600">
                  Interface navigation, workbook basics, formatting, and spreadsheet setup.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br></br>

        {/* Module 2 */}
        <Link href="/learning-paths/ms-office/excel/module-2">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 2
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Cells & Formatting
                </h3>
                <p className="text-gray-600">
                  Cell formatting, number formats, and worksheet structure.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br></br>

        {/* Module 3 */}
        <Link href="/learning-paths/ms-office/excel/module-3">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 3
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Workbook Management & Printing
                </h3>
                <p className="text-gray-600">
                  Multiple worksheets, find & replace, spell check, view tools, and professional printing.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link>

      </div>

      {/* ================= ADVANCED TRACK ================= */}
      <SectionHeader
        title="Advanced Analysis (Modules 4–7)"
        description="Develop professional-level Excel skills for reporting and certification."
      />

      <div className="space-y-4 mb-8">

        {/* Module 4 */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
            Module 4
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2">
            Formulas & Functions
          </h3>
          <p className="text-gray-600">
            Logical functions, lookup functions, and advanced calculations.
          </p>
        </div>

        {/* Module 5 */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
            Module 5
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2">
            Working with Data
          </h3>
          <p className="text-gray-600">
            Sorting, filtering, tables, charts, and conditional formatting.
          </p>
        </div>

        {/* Module 6 */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
            Module 6
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2">
            PivotTables & Dashboards
          </h3>
          <p className="text-gray-600">
            Data summarization, PivotTables, PivotCharts, and executive dashboards.
          </p>
        </div>

        {/* Module 7 */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
            Module 7
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2">
            Advanced Excel & Modern Tools
          </h3>
          <p className="text-gray-600">
            Advanced analysis tools and Microsoft 365 features.
          </p>
        </div>

        {/* Assessment */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">
            🏆 Excel Certification Assessment
          </h3>
          <p className="text-gray-700">
            Covers Modules 1–7. MOS-style simulation and project-based evaluation.
          </p>
        </div>

      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-3">Prerequisites</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Basic computer literacy</li>
          <li>• Microsoft Excel 2019 or Microsoft 365 installed</li>
          <li>• Willingness to practice with real datasets</li>
        </ul>
      </div>

    </div>
  );
}