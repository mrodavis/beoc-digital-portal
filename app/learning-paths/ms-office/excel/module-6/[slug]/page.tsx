import { notFound } from "next/navigation";
import { excelModule6Lessons } from "@/lib/content/ms-office/excel/module6Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = excelModule6Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = excelModule6Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? excelModule6Lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < excelModule6Lessons.length - 1
      ? excelModule6Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="excel"
      moduleSlug="module-6"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/excel/module-6"
      backLabel="Module 6"
    />
  );
}