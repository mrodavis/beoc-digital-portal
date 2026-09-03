import { notFound } from "next/navigation";
import ModuleTemplate from "@/components/LessonTemplate";
import { officeApps } from "@/lib/content/ms-office";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ appSlug: string; moduleSlug: string; slug: string }>;
}) {
  const { appSlug, moduleSlug, slug } = await params;

  const modules = officeApps[appSlug as keyof typeof officeApps];

  if (!modules) return notFound();

  const module = modules.find((m) => m.moduleSlug === moduleSlug);

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

  const moduleIndex = modules.findIndex((m) => m.moduleSlug === moduleSlug);
  const nextModule =
    lessonIndex === module.lessons.length - 1 && moduleIndex < modules.length - 1
      ? modules[moduleIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug={appSlug}
      moduleSlug={module.moduleSlug}
      lessonSlug={lesson.slug}
      courseId={`ms-office/${appSlug}`}
      lessonId={`${module.moduleSlug}::${lesson.slug}`}
      title={lesson.title}
      objectives={lesson.objectives}
      duration={lesson.duration}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      nextModuleHref={nextModule ? `/learning-paths/ms-office/${appSlug}/${nextModule.moduleSlug}` : undefined}
      nextModuleLabel={nextModule ? `Module ${nextModule.moduleNumber}: ${nextModule.title}` : undefined}
      backHref={`/learning-paths/ms-office/${appSlug}/${module.moduleSlug}`}
      backLabel={`Module ${module.moduleNumber}`}
    />
  );
}