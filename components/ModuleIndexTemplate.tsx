import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { Lesson } from "@/types/lesson";
import { ReactNode } from "react";


interface ModuleIndexTemplateProps {
  courseSlug: string;
  courseTitle: string;
  moduleNumber: number;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
  basePath?: string;
  breadcrumbRootLabel?: string;
  breadcrumbRootHref?: string;

  prevModuleHref?: string;
  prevModuleLabel?: string;
  nextModuleHref?: string;
  nextModuleLabel?: string;
  introContent?: ReactNode;
}

export default function ModuleIndexTemplate({
  courseSlug,
  courseTitle,
  moduleNumber,
  title,
  emoji,
  description,
  lessons,
  level,
  estimatedMinutes,
  basePath = "ms-office",
  breadcrumbRootLabel = "Microsoft Office",
  breadcrumbRootHref = "/learning-paths/ms-office",
  prevModuleHref,
  prevModuleLabel,
  nextModuleHref,
  nextModuleLabel,
  introContent,
}: ModuleIndexTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href={breadcrumbRootHref} className="hover:text-primary-600">
          {breadcrumbRootLabel}
        </Link>
        <span className="mx-2">/</span>
      <Link
        href={`/learning-paths/${basePath}/${courseSlug}`}
        className="hover:text-primary-600"
      >
        {courseTitle}
      </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">
          Module {moduleNumber}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{emoji}</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Module {moduleNumber}: {title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">
              {lessons.length}
            </div>
            <div className="text-sm text-gray-600">Lessons</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">
              {estimatedMinutes}
            </div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">
              Practice
            </div>
            <div className="text-sm text-gray-600">Files Included</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">
              {level}
            </div>
            <div className="text-sm text-gray-600">Level</div>
          </div>
        </div>
      </div>

      {/* Optional intro content (e.g. What You'll Learn, Real-World Scenario) */}
      {introContent}

      {/* Lessons */}
      <SectionHeader
        title="Lessons"
        description="Complete each lesson in order. Watch the video, review the notes, and finish the challenge."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/learning-paths/${basePath}/${courseSlug}/module-${moduleNumber}/${lesson.slug}`}
            className="block h-full"
          >
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">

              {/* Gradient Header */}
              <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-5 flex flex-col justify-between min-h-[140px]">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full backdrop-blur-sm">
                    Lesson {index + 1}
                  </span>
                  {lesson.duration && (
                    <span className="text-white/80 text-sm">
                      ⏱ {lesson.duration}
                    </span>
                  )}
                </div>
                <span className="text-4xl mt-3 drop-shadow-sm">{emoji}</span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed flex-1">
                  {lesson.description}
                </p>
                {lesson.practiceFiles && lesson.practiceFiles.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-green-600 font-medium">
                    ✔ Includes Practice File
                  </div>
                )}
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        {prevModuleHref ? (
            <Link
            href={prevModuleHref}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
            ← {prevModuleLabel}
            </Link>
        ) : (
            <div />
        )}

        {nextModuleHref ? (
            <Link
            href={nextModuleHref}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
            {nextModuleLabel} →
            </Link>
        ) : (
            <div />
        )}
        </div>


    </div>
  );
}
