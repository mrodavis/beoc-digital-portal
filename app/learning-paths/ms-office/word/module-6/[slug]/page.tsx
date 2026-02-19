import { notFound } from "next/navigation";
import { wordModule6Lessons } from "@/lib/content/ms-office/word/module6Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = wordModule6Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = wordModule6Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? wordModule6Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < wordModule6Lessons.length - 1
      ? wordModule6Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      moduleSlug="module-6"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/word/module-6"
      backLabel="Module 6"
    />
  );
}
