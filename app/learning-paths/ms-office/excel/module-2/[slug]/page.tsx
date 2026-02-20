import { notFound } from "next/navigation";
import { excelModule2Lessons } from "@/lib/content/ms-office/excel/module2Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = excelModule2Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = excelModule2Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? excelModule2Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < excelModule2Lessons.length - 1
      ? excelModule2Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="excel"
      moduleSlug="module-2"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/excel/module-2"
      backLabel="Module 2"
    />
  );
}
