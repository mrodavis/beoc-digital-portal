import SectionHeader from "./SectionHeader";
import Link from "next/link";
import { ContentBlock, LessonSection } from "@/types/lesson";
import { BlockList } from "./ContentBlocks";
import Slideshow from "./Slideshow";
import LessonProgress from "./LessonProgress";
import { ReactNode } from "react";

interface NavLesson {
  slug: string;
  title: string;
}

interface ModuleTemplateProps {
  title: string;
  description: string;

  appSlug: string;          // 👈 dynamic (word, excel, etc.)
  moduleSlug: string;
  /** The lesson's own slug — the stable half of its progress key. */
  lessonSlug: string;
  basePath?: string;

  /** "By the end of this lesson you can…" */
  objectives?: string[];
  duration?: string;

  videoUrl?: string;        // 👈 optional now
  videoUrls?: string[];
  slides?: { src: string; alt: string }[];

  sections?: LessonSection[];
  challenge?: ContentBlock[];
  practiceFiles?: {
    name: string;
    url: string;
  }[];

  prevLesson?: NavLesson;
  nextLesson?: NavLesson;

  nextModuleHref?: string;
  nextModuleLabel?: string;

  backHref?: string;
  backLabel?: string;

  exercises?: ReactNode;
}

export default function ModuleTemplate({
  title,
  description,
  appSlug,
  moduleSlug,
  lessonSlug,
  basePath = "learning-paths/ms-office",
  objectives = [],
  duration,
  videoUrl,
  videoUrls,
  slides,
  sections = [],
  challenge = [],
  practiceFiles = [],
  prevLesson,
  nextLesson,
  nextModuleHref,
  nextModuleLabel,
  backHref,
  backLabel = "Back",
  exercises,
}: ModuleTemplateProps) {

  const hasSections = sections.length > 0;
  const hasChallenge = challenge.length > 0;
  const hasObjectives = objectives.length > 0;

  // Stable id for progress: the course + module + lesson this page represents.
  const courseId = [basePath, appSlug].filter(Boolean).join("/");
  const lessonId = `${moduleSlug}::${lessonSlug}`;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">

      {/* Top Navigation */}
      {(backHref || prevLesson || nextLesson) && (
        <div className="mb-8 flex items-center justify-between">
          <div>
            {backHref ? (
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="text-xl">←</span>
                <span className="font-medium">{backLabel}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="text-sm text-gray-500">
            {duration ? `Lesson · ${duration}` : "Lesson"}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Objectives — what the learner should be able to do afterwards. */}
      {hasObjectives && (
        <div className="mb-12 rounded-2xl border border-primary-200 bg-primary-50 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-800 mb-3">
            By the end of this lesson you can
          </h2>
          <ul className="space-y-2">
            {objectives.map((objective, i) => (
              <li key={i} className="flex gap-3 text-gray-800 leading-relaxed">
                <span className="flex-shrink-0 text-primary-600 font-bold" aria-hidden="true">
                  ✓
                </span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    {/* Video — renders independently if present */}
    {(videoUrl || (videoUrls && videoUrls.length > 0)) && (
      <div className="mb-12">
        <SectionHeader
          title="Video"
          description="Watch the lesson video, then complete the reading and challenge."
        />

        <div className="space-y-8">
          {/* Multiple Videos */}
          {videoUrls && videoUrls.length > 0 &&
            videoUrls.map((url, index) => (
              <div
                key={index}
                className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
                <iframe
                  src={url}
                  title={`${title} - Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ))}

          {/* Single Video Fallback */}
          {videoUrl && (!videoUrls || videoUrls.length === 0) && (
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src={videoUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    )}

    {/* Slides — renders independently if present */}
    {slides && slides.length > 0 && (
      <div className="mb-12">
        <SectionHeader
          title="Presentation Slides"
          description="Review the slides below, then complete the reading and challenge."
        />
        <Slideshow slides={slides} />
      </div>
    )}

    {/* Reading badge — only when neither video nor slides present */}
    {!videoUrl && !(videoUrls && videoUrls.length > 0) && !(slides && slides.length > 0) && (
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-medium text-sm">
          📘 Reading Lesson
        </div>
      </div>
    )}
      {/* Lesson Notes */}
      {hasSections && (
        <div className="mb-12">
          <SectionHeader
            title="Lesson Notes"
            description="Read through the key concepts before you try the challenge."
          />

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <div className="space-y-12">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {section.heading}
                  </h3>
                  <BlockList blocks={section.blocks} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Practice Files */}
      {practiceFiles.length > 0 && (
        <div className="mb-12">
          <SectionHeader
            title="Practice File"
            description="Download this file and follow along with the lesson."
          />

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            {practiceFiles.map((file, index) => (
              <a
                key={index}
                href={file.url}
                download
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-primary-50 hover:border-primary-200 transition-colors group"
              >
                <svg
                  className="w-6 h-6 text-primary-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="font-medium text-gray-700 group-hover:text-primary-700">
                  {file.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Challenge */}
      {hasChallenge && (
        <div className="mb-12">
          <SectionHeader
            title="Challenge"
            description="Apply what you've learned in this lesson."
          />

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <BlockList blocks={challenge} />
          </div>
        </div>
      )}

      {/* Exercises */}
      {exercises && (
        <div className="mb-4">
          <div className="border-t border-gray-200 pt-12 mb-8">
            <SectionHeader
              title="Practice Exercises"
              description="Apply what you've learned — complete the quick check and hands-on exercise below."
            />
          </div>
          {exercises}
        </div>
      )}

      {/* Mark complete */}
      <LessonProgress courseId={courseId} lessonId={lessonId} title={title} />

      {/* Prev / Next Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200 gap-4">
        {prevLesson ? (
          <Link
            href={`/${basePath}/${[appSlug, moduleSlug, prevLesson.slug].filter(Boolean).join("/")}`}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            ← {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/${basePath}/${[appSlug, moduleSlug, nextLesson.slug].filter(Boolean).join("/")}`}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors text-right"
          >
            {nextLesson.title} →
          </Link>
        ) : nextModuleHref ? (
          <Link
            href={nextModuleHref}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors text-right"
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
