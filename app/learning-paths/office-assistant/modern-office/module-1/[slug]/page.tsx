import { notFound } from "next/navigation";
import LessonTemplate from "@/components/LessonTemplate";
import { module1Lessons } from "@/lib/content/office-assistant/modern-office/module1Lessons";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = module1Lessons.findIndex((l) => l.slug === slug);
  if (lessonIndex === -1) return notFound();

  const lesson = module1Lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? module1Lessons[lessonIndex - 1] : undefined;
  const nextLesson =
    lessonIndex < module1Lessons.length - 1
      ? module1Lessons[lessonIndex + 1]
      : undefined;

  return (
    <LessonTemplate
      basePath="learning-paths/office-assistant/modern-office/module-1"
      appSlug=""
      moduleSlug=""
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/office-assistant/modern-office/module-1"
      backLabel="Module 1: Digital Office Foundations"
    />
  );
}
