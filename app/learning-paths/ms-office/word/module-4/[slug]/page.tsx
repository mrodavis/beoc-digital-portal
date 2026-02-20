import { notFound } from "next/navigation";
import { wordModule4Lessons } from "@/lib/content/ms-office/word/module4Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = wordModule4Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = wordModule4Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? wordModule4Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < wordModule4Lessons.length - 1
      ? wordModule4Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="word"
      moduleSlug="module-4"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/word/module-4"
      backLabel="Module 4"
    />
  );
}
