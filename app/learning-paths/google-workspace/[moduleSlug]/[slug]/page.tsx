import { notFound } from "next/navigation";
import LessonTemplate from "@/components/LessonTemplate";
import { googleWorkspaceModules } from "@/lib/content/google-workspace/modules";

const COURSE = "/learning-paths/google-workspace";

export function generateStaticParams() {
  return googleWorkspaceModules.flatMap((m) => m.lessons.map((l) => ({ moduleSlug: m.moduleSlug, slug: l.slug })));
}

export default async function GoogleWorkspaceLessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; slug: string }>;
}) {
  const { moduleSlug, slug } = await params;
  const modules = googleWorkspaceModules;

  const moduleIndex = modules.findIndex((m) => m.moduleSlug === moduleSlug);
  if (moduleIndex === -1) return notFound();
  const module = modules[moduleIndex];

  const lessonIndex = module.lessons.findIndex((l) => l.slug === slug);
  if (lessonIndex === -1) return notFound();
  const lesson = module.lessons[lessonIndex];

  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : undefined;
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : undefined;
  const nextModule =
    lessonIndex === module.lessons.length - 1 && moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : undefined;

  return (
    <LessonTemplate
      basePath={`learning-paths/google-workspace/${moduleSlug}`}
      appSlug=""
      moduleSlug=""
      lessonSlug={lesson.slug}
      courseId="google-workspace"
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
      nextModuleHref={nextModule ? `${COURSE}/${nextModule.moduleSlug}` : undefined}
      nextModuleLabel={nextModule ? `Module ${nextModule.moduleNumber}: ${nextModule.title}` : undefined}
      backHref={`${COURSE}/${moduleSlug}`}
      backLabel={`Module ${module.moduleNumber}: ${module.title}`}
    />
  );
}
