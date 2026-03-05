import { notFound } from "next/navigation";
import { excelModule7Lessons } from "@/lib/content/ms-office/excel/module7Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = excelModule7Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = excelModule7Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? excelModule7Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < excelModule7Lessons.length - 1
      ? excelModule7Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="excel"
      moduleSlug="module-7"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/excel/module-7"
      backLabel="Module 7"
    />
  );
}