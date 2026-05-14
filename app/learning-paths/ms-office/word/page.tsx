import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";

export default function WordPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ms-office" className="hover:text-primary-600">
          Microsoft Office 2019
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Word 2019</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">📝</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Word 2019
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Master Microsoft Word from workforce-ready fundamentals to
              certification-level proficiency. Designed for career readiness
              and MOS exam preparation.
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
          <div className="text-2xl font-bold text-primary-600">2</div>
          <div className="text-sm text-gray-600">Assessments</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">10+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">MOS</div>
          <div className="text-sm text-gray-600">Cert Prep</div>
        </div>
      </div>

      {/* ================= WORKFORCE TRACK ================= */}
      <SectionHeader
        title="Workforce Readiness Track (Modules 1–6)"
        description="Develop job-ready Word skills for professional office environments."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <ModuleCard num={1} slug="module-1" emoji="📝" title="Introduction to Word 2019" description="Interface navigation, document creation, saving, and essential formatting." href="/learning-paths/ms-office/word/module-1" />
        <ModuleCard num={2} slug="module-2" emoji="🖋️" title="Basic Formatting" description="Master paragraph styles, themes, advanced formatting options, and professional templates." href="/learning-paths/ms-office/word/module-2" />
        <ModuleCard num={3} slug="module-3" emoji="🎨" title="Styles, Media, & Themes" description="Master paragraph styles, themes, advanced formatting options, and professional templates." href="/learning-paths/ms-office/word/module-3" />
        <ModuleCard num={4} slug="module-4" emoji="🤝" title="References, Review, & Collaboration" description="Master headers, footers, track changes, and collaborate with others." href="/learning-paths/ms-office/word/module-4" />
        <ModuleCard num={5} slug="module-5" emoji="📋" title="Tables, Charts, & Mail Merge" description="Content unlocking soon." href="/learning-paths/ms-office/word/module-5" locked />
      </div>

      {/* Workforce Assessment */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6 mb-12">
        <h3 className="text-xl font-bold mb-2">🧪 Workforce Assessment</h3>
        <p className="text-gray-700">Covers Modules 1–5. Demonstrate job-ready proficiency in Word.</p>
      </div>

      {/* ================= ADVANCED TRACK ================= */}
      <SectionHeader
        title="Advanced Certification Track (Modules 6–8)"
        description="Designed for MOS certification and advanced professional use."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <ModuleCard num={6} slug="module-6" emoji="⚙️" title="Advanced Formatting" description="Master paragraph styles, themes, advanced formatting options, and professional templates." href="/learning-paths/ms-office/word/module-6" />
        <ModuleCard num={7} slug="module-7" emoji="🏅" title="Advanced Styles & Themes" description="Certification-level content coming soon." href="/learning-paths/ms-office/word/module-7" locked />
        <ModuleCard num={8} slug="module-8" emoji="☁️" title="Office 365 and More" description="Certification-level content coming soon." href="/learning-paths/ms-office/word/module-8" locked />
      </div>

      {/* Advanced Assessment */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 mb-12">
        <h3 className="text-xl font-bold mb-2">🏆 Advanced Assessment</h3>
        <p className="text-gray-700">Covers Modules 1–8. Certification-level simulation exam.</p>
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-3">Prerequisites</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Basic computer literacy</li>
          <li>• Microsoft Word 2019 or Microsoft 365 installed</li>
          <li>• Willingness to practice and complete hands-on exercises</li>
        </ul>
      </div>

    </div>
  );
}
