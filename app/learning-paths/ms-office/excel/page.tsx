import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";

export default function ExcelPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ms-office" className="hover:text-primary-600">
          Microsoft Office
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Microsoft Excel</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">📊</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Microsoft Excel
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
        title="Excel Foundations (Modules 1–4)"
        description="Build strong spreadsheet fundamentals used in every office environment."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ModuleCard num={1} slug="module-1" emoji="📊" title="Excel Fundamentals" description="Interface navigation, workbook basics, formatting, and spreadsheet setup." href="/learning-paths/ms-office/excel/module-1" />
        <ModuleCard num={2} slug="module-2" emoji="🔢" title="Cells, Formatting & Basic Formulas" description="Cell formatting, number formats, worksheet structure and basic formulas." href="/learning-paths/ms-office/excel/module-2" />
        <ModuleCard num={3} slug="module-3" emoji="🖨️" title="Workbook Management, Printing & Basic Calculations" description="Multiple worksheets, find & replace, spell check, view tools, professional printing, intro to formulas." href="/learning-paths/ms-office/excel/module-3" />
        <ModuleCard num={4} slug="module-4" emoji="🧮" title="Complex Formulas, Functions & Cell References" description="Complex formulas, intro to functions, and absolute and relative cell references." href="/learning-paths/ms-office/excel/module-4" />
      </div>

      {/* ================= ADVANCED TRACK ================= */}
      <SectionHeader
        title="Advanced Analysis (Modules 5–8)"
        description="Develop professional-level Excel skills for reporting and certification."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ModuleCard num={5} slug="module-5" emoji="📈" title="Working with Data" description="Sorting, filtering, tables, charts, and conditional formatting." href="/learning-paths/ms-office/excel/module-5" />
        <ModuleCard num={6} slug="module-6" emoji="📉" title="Tables, Charts & PivotTables" description="Structure data with tables, visualize insights with charts, and summarize information using PivotTables." href="/learning-paths/ms-office/excel/module-6" />
        <ModuleCard num={7} slug="module-7" emoji="🔍" title="Data Analysis Tools" description="Learn advanced PivotTable techniques, What-If Analysis tools, and reference styles used for deeper data analysis." href="/learning-paths/ms-office/excel/module-7" />
        <ModuleCard num={8} slug="module-8" emoji="✨" title="Modern Excel Features" description="Explore Microsoft 365 features, Intelligent Services, drawing tools, and icons to enhance modern Excel workflows." href="/learning-paths/ms-office/excel/module-8" />
      </div>

      {/* Assessment */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-2">
          🏆 Excel Certification Assessment
        </h3>
        <p className="text-gray-700">
          Covers Modules 1–7. MOS-style simulation and project-based evaluation.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-3">Prerequisites</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Basic computer literacy</li>
          <li>• Microsoft Excel (Microsoft 365 or Office 2019)</li>
          <li>• Willingness to practice with real datasets</li>
        </ul>
      </div>

    </div>
  );
}