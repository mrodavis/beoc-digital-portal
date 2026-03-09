import { notFound } from "next/navigation";
import { powerpointModule1Lessons } from "@/lib/content/ms-office/powerpoint/module1Lessons";
import ModuleTemplate from "@/components/LessonTemplate";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lessonIndex = powerpointModule1Lessons.findIndex(
    (l) => l.slug === slug
  );

  if (lessonIndex === -1) return notFound();

  const lesson = powerpointModule1Lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0
      ? powerpointModule1Lessons[lessonIndex - 1]
      : undefined;

  const nextLesson =
    lessonIndex < powerpointModule1Lessons.length - 1
      ? powerpointModule1Lessons[lessonIndex + 1]
      : undefined;

  return (
    <ModuleTemplate
      appSlug="powerpoint"
      moduleSlug="module-1"
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      backHref="/learning-paths/ms-office/powerpoint/module-1"
      backLabel="Module 1"
    />
  );
}