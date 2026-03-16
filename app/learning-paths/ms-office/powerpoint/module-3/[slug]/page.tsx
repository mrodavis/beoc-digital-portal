import { notFound } from "next/navigation";
import { powerpointModule3Lessons } from "@/lib/content/ms-office/powerpoint/module3Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = powerpointModule3Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = powerpointModule3Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0
      ? powerpointModule3Lessons[lessonIndex - 1]
      : undefined;

  const nextLesson =
    lessonIndex < powerpointModule3Lessons.length - 1
      ? powerpointModule3Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="powerpoint"
      moduleSlug="module-3"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/powerpoint/module-3"
      backLabel="Module 3"
    />
  );
}