import { notFound } from "next/navigation";
import ModuleTemplate from "@/components/LessonTemplate";
import { programs, programList } from "@/lib/content/programs";

export function generateStaticParams() {
  return programList.flatMap((p) =>
    p.modules.flatMap((m) =>
      m.lessons.map((l) => ({
        programSlug: p.slug,
        moduleSlug: m.moduleSlug,
        slug: l.slug,
      }))
    )
  );
}

export default async function ProgramLessonPage({
  params,
}: {
  params: Promise<{ programSlug: string; moduleSlug: string; slug: string }>;
}) {
  const { programSlug, moduleSlug, slug } = await params;
  const program = programs[programSlug];
  if (!program) return notFound();

  const moduleIndex = program.modules.findIndex(
    (m) => m.moduleSlug === moduleSlug
  );
  if (moduleIndex === -1) return notFound();
  const module = program.modules[moduleIndex];

  const lessonIndex = module.lessons.findIndex((l) => l.slug === slug);
  if (lessonIndex === -1) return notFound();
  const lesson = module.lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? module.lessons[lessonIndex - 1] : undefined;
  const nextLesson =
    lessonIndex < module.lessons.length - 1
      ? module.lessons[lessonIndex + 1]
      : undefined;
  const nextModule =
    lessonIndex === module.lessons.length - 1 &&
    moduleIndex < program.modules.length - 1
      ? program.modules[moduleIndex + 1]
      : undefined;

  const base = `/learning-paths/programs/${program.slug}`;

  return (
    <ModuleTemplate
      basePath="learning-paths/programs"
      appSlug={program.slug}
      moduleSlug={module.moduleSlug}
      lessonSlug={lesson.slug}
      title={lesson.title}
      description={lesson.description}
      objectives={lesson.objectives}
      duration={lesson.duration}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      slides={lesson.slides}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      nextModuleHref={nextModule ? `${base}/${nextModule.moduleSlug}` : undefined}
      nextModuleLabel={
        nextModule
          ? `Module ${nextModule.moduleNumber}: ${nextModule.title}`
          : undefined
      }
      backHref={`${base}/${module.moduleSlug}`}
      backLabel={`Module ${module.moduleNumber}`}
    />
  );
}
