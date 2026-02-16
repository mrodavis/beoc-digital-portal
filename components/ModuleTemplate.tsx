import SectionHeader from "./SectionHeader";
import Link from "next/link";

interface PracticeFile {
  name: string;
  url: string;
}

interface ContentBlock {
  type: "paragraph" | "image" | "list";
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
  items?: string[];
  ordered?: boolean;
}

interface LessonSection {
  heading: string;
  blocks: ContentBlock[];
}

interface NavLesson {
  slug: string;
  title: string;
}

interface ModuleTemplateProps {
  title: string;
  description: string;
  videoUrl: string;

  // Old system (module-style)
  practiceFiles?: PracticeFile[];
  steps?: string[];
  checklist?: string[];

  // New system (lesson-style)
  sections?: LessonSection[];
  challenge?: ContentBlock[];

  prevLesson?: NavLesson;
  nextLesson?: NavLesson;

  // optional: where “Back” should go
  backHref?: string;
  backLabel?: string;
}

export default function ModuleTemplate({
  title,
  description,
  videoUrl,

  practiceFiles = [],
  steps = [],
  checklist = [],

  sections = [],
  challenge = [],

  prevLesson,
  nextLesson,

  backHref,
  backLabel = "Back",
}: ModuleTemplateProps) {
  const hasPracticeFiles = practiceFiles.length > 0;
  const hasGuidedPractice = steps.length > 0;
  const hasChecklist = checklist.length > 0;

  const hasSections = sections.length > 0;
  const hasChallenge = challenge.length > 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Top nav / back */}
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
        <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Video */}
      <div className="mb-12">
        <SectionHeader
          title="Video"
          description="Watch the lesson video, then complete the reading and challenge."
        />
        <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            width="100%"
            height="100%"
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* LearnFree-like reading sections */}
      {hasSections && (
        <div className="mb-12">
          <SectionHeader
            title="Lesson Notes"
            description="Read through the key concepts before you try the challenge."
          />

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <div className="space-y-10">
              {sections.map((s, idx) => (
                <div key={idx}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {s.heading}
                  </h3>

                  <div className="space-y-6">
                    {s.blocks.map((block, bIdx) => {
                      if (block.type === "paragraph") {
                        return (
                          <p
                            key={bIdx}
                            className="text-gray-700 leading-relaxed"
                          >
                            {block.text}
                          </p>
                        );
                      }

                      if (block.type === "image") {
                        return (
                          <div key={bIdx} className="my-6">
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
                      }

                      if (block.type === "list") {
                        return block.ordered ? (
                          <ol
                            key={bIdx}
                            className="list-decimal pl-6 space-y-2"
                          >
                            {block.items?.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ol>
                        ) : (
                          <ul
                            key={bIdx}
                            className="list-disc pl-6 space-y-2"
                          >
                            {block.items?.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      )}

      {/* Challenge (LearnFree vibe) */}
      {hasChallenge && (
        <div className="mb-12">
          <SectionHeader
            title="Challenge"
            description="Do these steps in Word to lock in the skill."
          />
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <div className="space-y-6">
              {challenge.map((block, index) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "image") {
                  return (
                    <div key={index} className="my-6">
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
                }

                if (block.type === "list") {
                  return block.ordered ? (
                    <ol key={index} className="list-decimal pl-6 space-y-3">
                      {block.items?.map((item, i) => (
                        <li key={i} className="text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul key={index} className="list-disc pl-6 space-y-3">
                      {block.items?.map((item, i) => (
                        <li key={i} className="text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return null;
              })}
            </div>

          </div>
        </div>
      )}

      {/* Old module blocks still supported */}
      {hasPracticeFiles && (
        <div className="mb-12">
          <SectionHeader
            title="Practice Files"
            description="Download these files to follow along with the exercises."
          />
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <div className="space-y-3">
              {practiceFiles.map((file, index) => (
                <a
                  key={index}
                  href={file.url}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-primary-50 hover:border-primary-200 border border-gray-200 transition-colors group"
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
                  <svg
                    className="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasGuidedPractice && (
        <div className="mb-12">
          <SectionHeader
            title="Guided Practice"
            description="Follow these steps to complete the hands-on exercises."
          />
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <ol className="space-y-6">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {hasChecklist && (
        <div className="mb-12">
          <SectionHeader
            title="Skill Checklist"
            description="Review these skills to ensure you've mastered the objectives."
          />
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <div className="space-y-4">
              {checklist.map((skill, index) => (
                <label
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-gray-700 leading-relaxed">{skill}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prev / Next */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        {prevLesson ? (
          <Link
            href={`/learning-paths/ms-office/word/module-1/${prevLesson.slug}`}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            ← {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/learning-paths/ms-office/word/module-1/${nextLesson.slug}`}
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
