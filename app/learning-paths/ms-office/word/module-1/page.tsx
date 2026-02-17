import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { wordModule1Lessons } from "@/lib/content/ms-office/word/lessons";

export default function Module1Page() {
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
        <span className="text-gray-900 font-medium">Module 1</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">📝</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Module 1: Introduction to Word 2019
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Learn the Word interface, document creation, file management,
              and essential formatting used in professional environments.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">
              {wordModule1Lessons.length}
            </div>
            <div className="text-sm text-gray-600">Lessons</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">~30</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">Practice</div>
            <div className="text-sm text-gray-600">Files Included</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">Beginner</div>
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
        {wordModule1Lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/learning-paths/ms-office/word/module-1/${lesson.slug}`}
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer">
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

      {/* Navigation */}
      <div className="flex justify-end pt-8 border-t border-gray-200">
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
