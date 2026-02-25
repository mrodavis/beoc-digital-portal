import { notFound } from "next/navigation";
import { excelModule4Lessons } from "@/lib/content/ms-office/excel/module4Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = excelModule4Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = excelModule4Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? excelModule4Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < excelModule4Lessons.length - 1
      ? excelModule4Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="excel"
      moduleSlug="module-4"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/excel/module-4"
      backLabel="Module 4"
    />
  );
}