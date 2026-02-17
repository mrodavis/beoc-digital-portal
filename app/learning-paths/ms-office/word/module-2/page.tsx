import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { wordModule2Lessons } from "@/lib/content/ms-office/word/module2Lessons";

export default function Module2Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/learning-paths/ms-office" className="hover:text-primary-600">
          Microsoft Office 2019
        </Link>
        <span className="mx-2">/</span>
        <Link href="/learning-paths/ms-office/word" className="hover:text-primary-600">
          Word 2019
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Module 2</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">🎨</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Module 2: Advanced Formatting & Styles
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Master text formatting, paragraph controls, styles, and themes to create
              professional, consistent documents used in real workplace environments.
            </p>
          </div>
        </div>
      </div>

      {/* Module Overview Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">
              {wordModule2Lessons.length}
            </div>
            <div className="text-sm text-gray-600">Lessons</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">~40</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">Practice</div>
            <div className="text-sm text-gray-600">Files Included</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">Intermediate</div>
            <div className="text-sm text-gray-600">Level</div>
          </div>
        </div>
      </div>

      {/* Lessons Section */}
      <SectionHeader
        title="Lessons"
        description="Complete each lesson in order. Watch the video, review the notes, and finish the challenge."
      />

      <div className="space-y-8 mb-16">
        {wordModule2Lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/learning-paths/ms-office/word/module-2/${lesson.slug}`}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                      Lesson {index + 1}
                    </span>
                    {lesson.duration && (
                      <span className="text-sm text-gray-500">
                        {lesson.duration}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {lesson.title}
                  </h3>

                  <p className="text-gray-600">
                    {lesson.description}
                  </p>

                  {lesson.practiceFiles && lesson.practiceFiles.length > 0 && (
                    <div className="mt-3 text-sm text-green-600 font-medium">
                      ✔ Includes Practice File
                    </div>
                  )}
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
        ))}
      </div>

      {/* Module Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        <Link
          href="/learning-paths/ms-office/word/module-1"
          className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          ← Back to Module 1
        </Link>

        <Link
          href="/learning-paths/ms-office/word"
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Back to Word Course →
        </Link>
      </div>

    </div>
  );
}
