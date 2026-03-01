import { notFound } from "next/navigation";
import { excelModule5Lessons } from "@/lib/content/ms-office/excel/module5Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = excelModule5Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = excelModule5Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? excelModule5Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < excelModule5Lessons.length - 1
      ? excelModule5Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="excel"
      moduleSlug="module-5"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/excel/module-5"
      backLabel="Module 5"
    />
  );
}