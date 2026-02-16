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
              Master Microsoft Word from basic document creation to advanced 
              formatting, templates, and collaboration features. Perfect for 
              professional document preparation.
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
          <div className="text-2xl font-bold text-primary-600">8+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">15+</div>
          <div className="text-sm text-gray-600">Practice Files</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">MOS</div>
          <div className="text-sm text-gray-600">Cert Prep</div>
        </div>
      </div>

      {/* Modules */}
      <SectionHeader
        title="Course Modules"
        description="Work through each module sequentially to build your skills progressively."
      />

      <div className="space-y-4 mb-12">
        {/* Module 1 - Available */}
        <Link href="/learning-paths/ms-office/word/module-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                    Module 1
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    Available
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Introduction to Word 2019
                </h3>
                <p className="text-gray-600 mb-3">
                  Learn interface navigation, basic formatting, document creation, 
                  and essential features for professional documents.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    90 min
                  </span>
                  <span>•</span>
                  <span>10 Skills</span>
                  <span>•</span>
                  <span>Beginner</span>
                </div>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>

        {/* Module 2 - Placeholder */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 opacity-60">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-bold rounded-full">
                  Module 2
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Advanced Formatting & Styles
              </h3>
              <p className="text-gray-600 mb-3">
                Master paragraph styles, themes, advanced formatting options, 
                and document templates for consistent professional layouts.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>120 min</span>
                <span>•</span>
                <span>12 Skills</span>
                <span>•</span>
                <span>Intermediate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Module 3 - Placeholder */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 opacity-60">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-bold rounded-full">
                  Module 3
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Tables, Graphics & Media
              </h3>
              <p className="text-gray-600 mb-3">
                Create professional tables, insert and format images, work with 
                SmartArt, charts, and multimedia elements.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>100 min</span>
                <span>•</span>
                <span>10 Skills</span>
                <span>•</span>
                <span>Intermediate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Module 4 - Placeholder */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 opacity-60">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-bold rounded-full">
                  Module 4
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Document References & Citations
              </h3>
              <p className="text-gray-600 mb-3">
                Learn footnotes, endnotes, table of contents, citations, 
                bibliographies, and index creation for academic documents.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>90 min</span>
                <span>•</span>
                <span>8 Skills</span>
                <span>•</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Module 5 - Placeholder */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 opacity-60">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-bold rounded-full">
                  Module 5
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Mail Merge & Collaboration
              </h3>
              <p className="text-gray-600 mb-3">
                Master mail merge for bulk documents, track changes, comments, 
                document protection, and collaborative editing features.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>110 min</span>
                <span>•</span>
                <span>11 Skills</span>
                <span>•</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Prerequisites</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Basic computer skills (keyboard, mouse, file management)</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Microsoft Word 2019 installed on your computer</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Willingness to practice and complete hands-on exercises</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
