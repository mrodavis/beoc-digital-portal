import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function CertificationPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Certification Preparation
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Prepare for industry-recognized certifications that validate your skills 
          and enhance your career opportunities. Our courses align with official 
          certification exam objectives.
        </p>
      </div>

      {/* Microsoft Office Specialist */}
      <div className="mb-12">
        <SectionHeader
          title="Microsoft Office Specialist (MOS)"
          description="Industry-standard certification for Microsoft Office proficiency."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Word Certification */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                📝
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  MOS: Word 2019
                </h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Exam MO-100
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Demonstrates competency in creating and editing professional documents 
              for a variety of purposes and situations.
            </p>
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-900 text-sm">Exam Topics:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Manage documents (20-25%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Insert and format text, paragraphs, and sections (20-25%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Manage tables and lists (15-20%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Create and manage references (15-20%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Insert and format graphic elements (20-25%)</span>
                </li>
              </ul>
            </div>
            <Link
              href="/learning-paths/ms-office/word"
              className="inline-block btn-primary w-full text-center"
            >
              Prepare with Word Modules
            </Link>
          </div>

          {/* Excel Certification - Coming Soon */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 opacity-60">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                📊
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  MOS: Excel 2019
                </h3>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Validates ability to create, edit, format, and share professional 
              spreadsheets with formulas, functions, and data analysis tools.
            </p>
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-900 text-sm">Exam Topics:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage worksheets and workbooks</li>
                <li>• Manage data cells and ranges</li>
                <li>• Manage tables and table data</li>
                <li>• Perform operations by using formulas and functions</li>
                <li>• Manage charts</li>
              </ul>
            </div>
            <button
              disabled
              className="inline-block w-full text-center px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
            >
              Excel Modules Coming Soon
            </button>
          </div>

          {/* PowerPoint Certification - Coming Soon */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 opacity-60">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
                🎨
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  MOS: PowerPoint 2019
                </h3>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Demonstrates competency in creating, editing, and enhancing presentations 
              using transitions, animations, and multimedia elements.
            </p>
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-900 text-sm">Exam Topics:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage presentations</li>
                <li>• Manage slides</li>
                <li>• Insert and format text, shapes, and images</li>
                <li>• Insert tables, charts, SmartArt, and media</li>
                <li>• Apply transitions and animations</li>
              </ul>
            </div>
            <button
              disabled
              className="inline-block w-full text-center px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
            >
              PowerPoint Modules Coming Soon
            </button>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Exam Preparation Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Before the Exam</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Complete all course modules thoroughly</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Practice with real Office 2019 software</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Review official Microsoft exam objectives</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Take practice tests to assess readiness</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">During the Exam</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Read all instructions carefully before starting</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Manage your time across all tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Use keyboard shortcuts for efficiency</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Review your work if time permits</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
