import { notFound } from "next/navigation";
import { wordModule1Lessons } from "@/lib/content/ms-office/word/lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = wordModule1Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = wordModule1Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? wordModule1Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < wordModule1Lessons.length - 1
      ? wordModule1Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="word"
      moduleSlug="module-1"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/word/module-1"
      backLabel="Module 1"
    />
  );
}
