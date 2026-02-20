import { notFound } from "next/navigation";
import { excelModule1Lessons } from "@/lib/content/ms-office/excel/module1Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = excelModule1Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = excelModule1Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? excelModule1Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < excelModule1Lessons.length - 1
      ? excelModule1Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="excel"
      moduleSlug="module-1"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/excel/module-1"
      backLabel="Module 1"
    />
  );
}
