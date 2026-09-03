import { notFound } from "next/navigation";
import LessonTemplate from "@/components/LessonTemplate";
import { introDatabaseModules } from "@/lib/content/office-assistant/intro-database";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; slug: string }>;
}) {
  const { moduleSlug, slug } = await params;

  const module = introDatabaseModules.find((m) => m.moduleSlug === moduleSlug);

  if (!module) return notFound();

  const lessonIndex = module.lessons.findIndex((l) => l.slug === slug);

  if (lessonIndex === -1) return notFound();

  const lesson = module.lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? module.lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < module.lessons.length - 1
      ? module.lessons[lessonIndex + 1]
      : undefined;

  const moduleIndex = introDatabaseModules.findIndex(
    (m) => m.moduleSlug === moduleSlug
  );
  const nextModule =
    lessonIndex === module.lessons.length - 1 &&
    moduleIndex < introDatabaseModules.length - 1
      ? introDatabaseModules[moduleIndex + 1]
      : undefined;

  return (
    <LessonTemplate
      basePath={`learning-paths/office-assistant/intro-database/${moduleSlug}`}
      appSlug=""
      moduleSlug=""
      lessonSlug={lesson.slug}
      courseId="oap/intro-database"
      lessonId={`${moduleSlug}::${lesson.slug}`}
      title={lesson.title}
      objectives={lesson.objectives}
      duration={lesson.duration}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      slides={lesson.slides}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      nextModuleHref={
        nextModule
          ? `/learning-paths/office-assistant/intro-database/${nextModule.moduleSlug}`
          : undefined
      }
      nextModuleLabel={
        nextModule
          ? `Module ${nextModule.moduleNumber}: ${nextModule.title}`
          : undefined
      }
      backHref={`/learning-paths/office-assistant/intro-database/${moduleSlug}`}
      backLabel={`Module ${module.moduleNumber}: ${module.title}`}
    />
  );
}
