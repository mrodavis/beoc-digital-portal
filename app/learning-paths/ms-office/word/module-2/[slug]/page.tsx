import { notFound } from "next/navigation";
import { wordModule2Lessons } from "@/lib/content/ms-office/word/module2Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = wordModule2Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = wordModule2Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? wordModule2Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < wordModule2Lessons.length - 1
      ? wordModule2Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="word"
      moduleSlug="module-2"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/word/module-2"
      backLabel="Module 2"
    />
  );
}
