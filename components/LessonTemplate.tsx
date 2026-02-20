import SectionHeader from "./SectionHeader";
import Link from "next/link";
import { ContentBlock, LessonSection } from "@/types/lesson";

interface NavLesson {
  slug: string;
  title: string;
}

interface ModuleTemplateProps {
  title: string;
  description: string;

  appSlug: string;          // 👈 dynamic (word, excel, etc.)
  moduleSlug: string;

  videoUrl?: string;        // 👈 optional now
  videoUrls?: string[];

  sections?: LessonSection[];
  challenge?: ContentBlock[];
  practiceFiles?: {
    name: string;
    url: string;
  }[];

  prevLesson?: NavLesson;
  nextLesson?: NavLesson;

  backHref?: string;
  backLabel?: string;
}

export default function ModuleTemplate({
  title,
  description,
  appSlug,
  moduleSlug,
  videoUrl,
  videoUrls,
  sections = [],
  challenge = [],
  practiceFiles = [],
  prevLesson,
  nextLesson,
  backHref,
  backLabel = "Back",
}: ModuleTemplateProps) {

  const hasSections = sections.length > 0;
  const hasChallenge = challenge.length > 0;

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
          <div className="text-sm text-gray-500">Lesson</div>
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

    {/* Video(s) or Reading Badge */}
    {(videoUrl || (videoUrls && videoUrls.length > 0)) ? (
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
    ) : (
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

                  <div className="space-y-6">
                    {section.blocks.map((block, bIdx) => {
                      switch (block.type) {

                        case "paragraph":
                          return (
                            <p
                              key={bIdx}
                              className="text-gray-700 leading-relaxed"
                            >
                              {block.text}
                            </p>
                          );

                        case "image":
                          return (
                            <div key={bIdx}>
                              <img
                                src={block.src}
                                alt={block.alt}
                                className="rounded-xl border border-gray-200 shadow-sm"
                              />
                              {block.caption && (
                                <p className="text-sm text-gray-500 mt-2 italic">
                                  {block.caption}
                                </p>
                              )}
                            </div>
                          );

                        case "list":
                          return block.ordered ? (
                            <ol
                              key={bIdx}
                              className="list-decimal pl-6 space-y-3 text-gray-700"
                            >
                              {block.items?.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ol>
                          ) : (
                            <ul
                              key={bIdx}
                              className="list-disc pl-6 space-y-3 text-gray-700"
                            >
                              {block.items?.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          );

                        default:
                          return null;
                      }
                    })}
                  </div>
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

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-6">
            {challenge.map((block, idx) => {
              switch (block.type) {

                case "paragraph":
                  return (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {block.text}
                    </p>
                  );

                case "image":
                  return (
                    <div key={idx}>
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="rounded-xl border border-gray-200 shadow-sm"
                      />
                    </div>
                  );

                case "list":
                  return block.ordered ? (
                    <ol
                      key={idx}
                      className="list-decimal pl-6 space-y-3 text-gray-700"
                    >
                      {block.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul
                      key={idx}
                      className="list-disc pl-6 space-y-3 text-gray-700"
                    >
                      {block.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );

                default:
                  return null;
              }
            })}
          </div>
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        {prevLesson ? (
          <Link
            href={`/learning-paths/ms-office/${appSlug}/${moduleSlug}/${prevLesson.slug}`}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            ← {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/learning-paths/ms-office/${appSlug}/${moduleSlug}/${nextLesson.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {nextLesson.title} →
          </Link>
        ) : (
          <div />
        )}
      </div>

    </div>
  );
}