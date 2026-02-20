import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

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

      <div className="space-y-4 mb-8">

        {/* Module 1 */}
        <Link href="/learning-paths/ms-office/word/module-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 1
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Introduction to Word 2019
                </h3>
                <p className="text-gray-600">
                  Interface navigation, document creation, saving, and essential formatting.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br></br>

  {/* Module 2 - Available */}
  <Link href="/learning-paths/ms-office/word/module-2">
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
            Module 2
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2">
            Basic Formatting
          </h3>
          <p className="text-gray-600">
            Master paragraph styles, themes, advanced formatting options, and professional templates.
          </p>
        </div>
        <span className="text-green-600 font-semibold text-sm">
          Available →
        </span>
      </div>
    </div>
  </Link><br></br>

    {/* Module 3 - Available */}
  <Link href="/learning-paths/ms-office/word/module-3">
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
            Module 3
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2">
            Styles, Media, & Themes
          </h3>
          <p className="text-gray-600">
            Master paragraph styles, themes, advanced formatting options, and professional templates.
          </p>
        </div>
        <span className="text-green-600 font-semibold text-sm">
          Available →
        </span>
      </div>
    </div>
  </Link><br></br>

    {/* Module 4 - Available */}
  <Link href="/learning-paths/ms-office/word/module-4">
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
            Module 4
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2">
            References, Review, & Collaboration
          </h3>
          <p className="text-gray-600">
            Master headers, footers, track changes, and collaborate with others...
          </p>
        </div>
        <span className="text-green-600 font-semibold text-sm">
          Available →
        </span>
      </div>
    </div>
  </Link>

  {/* Modules 3–6 Locked */}
  {["5"].map((num) => (
    <div
      key={num}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
        Module {num}
      </span>
      <h3 className="text-xl font-bold mt-3 mb-2">
        {num === "5" && "Tables, Charts, & Mail Merge"}
      </h3>
      <p className="text-gray-600">
        Content unlocking soon.
      </p>
    </div>
  ))}


        {/* Workforce Assessment */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">
            🧪 Workforce Assessment
          </h3>
          <p className="text-gray-700">
            Covers Modules 1–5. Demonstrate job-ready proficiency in Word.
          </p>
        </div>

      </div>

      {/* ================= ADVANCED TRACK ================= */}
      <SectionHeader
        title="Advanced Certification Track (Modules 6–8)"
        description="Designed for MOS certification and advanced professional use."
      />
      {/* Module 6 - Available */}
        <Link href="/learning-paths/ms-office/word/module-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                  Module 6
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">
                  Advanced Formatting
                </h3>
                <p className="text-gray-600">
                  Master paragraph styles, themes, advanced formatting options, and professional templates.
                </p>
              </div>
              <span className="text-green-600 font-semibold text-sm">
                Available →
              </span>
            </div>
          </div>
        </Link><br></br>

      <div className="space-y-4 mb-8">

        {["7", "8"].map((num) => (
          <div
            key={num}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
          >
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
              Module {num}
            </span>
            <h3 className="text-xl font-bold mt-3 mb-2">
              {num === "7" && "Advanced Styles & Themes"}
              {num === "8" && "Office 365 and More"}
            </h3>
            <p className="text-gray-600">
              Certification-level content coming soon.
            </p>
          </div>
        ))}

        {/* Advanced Assessment */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">
            🏆 Advanced Assessment
          </h3>
          <p className="text-gray-700">
            Covers Modules 1–8. Certification-level simulation exam.
          </p>
        </div>

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
