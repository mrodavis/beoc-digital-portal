import { notFound } from "next/navigation";
import LessonTemplate from "@/components/LessonTemplate";
import { introToEHRModules } from "@/lib/content/ehr/intro-to-ehr";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; slug: string }>;
}) {
  const { moduleSlug, slug } = await params;

  const module = introToEHRModules.find((m) => m.moduleSlug === moduleSlug);

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

  const moduleIndex = introToEHRModules.findIndex(
    (m) => m.moduleSlug === moduleSlug
  );
  const nextModule =
    lessonIndex === module.lessons.length - 1 &&
    moduleIndex < introToEHRModules.length - 1
      ? introToEHRModules[moduleIndex + 1]
      : undefined;

  return (
    <LessonTemplate
      basePath={`learning-paths/ehr/intro-to-ehr/${moduleSlug}`}
      appSlug=""
      moduleSlug=""
      title={lesson.title}
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
          ? `/learning-paths/ehr/intro-to-ehr/${nextModule.moduleSlug}`
          : undefined
      }
      nextModuleLabel={
        nextModule
          ? `Module ${nextModule.moduleNumber}: ${nextModule.title}`
          : undefined
      }
      backHref={`/learning-paths/ehr/intro-to-ehr/${moduleSlug}`}
      backLabel={`Module ${module.moduleNumber}: ${module.title}`}
    />
  );
}
