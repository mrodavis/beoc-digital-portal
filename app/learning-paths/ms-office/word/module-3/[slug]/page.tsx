import { notFound } from "next/navigation";
import { wordModule3Lessons } from "@/lib/content/ms-office/word/module3Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = wordModule3Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = wordModule3Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? wordModule3Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < wordModule3Lessons.length - 1
      ? wordModule3Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/word/module-3"
      backLabel="Module 3"
    />
  );
}
