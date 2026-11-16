import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { Lesson } from "@/types/lesson";
import { ReactNode } from "react";
import ModuleLessonProgress from "@/components/progress/ModuleLessonProgress";
import Monogram, { MonogramTone } from "@/components/Monogram";

const LESSON_TONES: MonogramTone[] = ["blue", "green", "amber", "violet"];


interface ModuleIndexTemplateProps {
  /** Progress id for this course; omit to hide the progress strip. */
  courseId?: string;
  courseSlug: string;
  courseTitle: string;
  moduleNumber: number;
  title: string;
  /** Kept for older callers; no longer shown. */
  emoji?: string;
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
  courseId,
  courseSlug,
  courseTitle,
  moduleNumber,
  title,
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
          <Monogram text={`M${moduleNumber}`} size="lg" />
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
        {courseId && (
          <ModuleLessonProgress
            courseId={courseId}
            lessonIds={lessons.map((l) => `module-${moduleNumber}::${l.slug}`)}
            titles={lessons.map((l) => l.title)}
          />
        )}

        {lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/learning-paths/${basePath}/${courseSlug}/module-${moduleNumber}/${lesson.slug}`}
            className="block h-full"
          >
            <div className="flex h-full cursor-pointer flex-col rounded-[22px] border border-ink-line bg-white p-6 card-hover">
              <div className="flex items-center justify-between gap-3">
                <Monogram text={`L${index + 1}`} tone={LESSON_TONES[index % LESSON_TONES.length]} />
                <span className="rounded-full bg-[#F2F4F7] px-2.5 py-1 text-xs font-semibold text-ink-soft">
                  Lesson {index + 1}
                </span>
              </div>
              <h3 className="mt-5 line-clamp-2 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                {lesson.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
                {lesson.description}
              </p>
              {(lesson.duration || (lesson.practiceFiles && lesson.practiceFiles.length > 0)) && (
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-line pt-4 text-xs font-medium text-ink-soft">
                  {lesson.duration && <span className="rounded-full bg-ink-canvas px-2.5 py-1">{lesson.duration}</span>}
                  {lesson.practiceFiles && lesson.practiceFiles.length > 0 && (
                    <span className="rounded-full bg-[#E3F8EE] px-2.5 py-1 text-[#067647]">Practice file included</span>
                  )}
                </div>
              )}
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
