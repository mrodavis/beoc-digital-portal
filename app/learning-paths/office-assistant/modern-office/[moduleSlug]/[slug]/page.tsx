import { notFound } from "next/navigation";
import LessonTemplate from "@/components/LessonTemplate";
import { modernOfficeModules } from "@/lib/content/office-assistant/modern-office";
import MicroExercise from "@/components/exercises/MicroExercise";
import EmailExercise from "@/components/exercises/EmailExercise";
import MessageRewriteExercise from "@/components/exercises/MessageRewriteExercise";
import MeetingExercise from "@/components/exercises/MeetingExercise";
import InboxExercise from "@/components/exercises/InboxExercise";
import SlackSimulator from "@/components/exercises/SlackSimulator";

function getModule2Exercises(slug: string) {
  switch (slug) {
    case "professional-email-writing":
      return (
        <>
          <MicroExercise
            question="Which of these is the most professional email subject line?"
            options={[
              "hey!",
              "URGENT READ NOW",
              "Project Update: Q2 Report Ready for Review",
              "email from me",
            ]}
            correctIndex={2}
            explanation="A strong subject line is specific and professional — it tells the reader exactly what the email is about before they open it."
          />
          <EmailExercise />
        </>
      );

    case "slack-teams-etiquette":
      return (
        <>
          <MicroExercise
            question="A teammate posts a project update. What's the most professional way to acknowledge it?"
            options={[
              "Send them a DM saying 'k'",
              "Ignore it — it doesn't affect you",
              "React with a relevant emoji (✅ or 👍) or reply in-thread",
              "Post a new message in a different channel",
            ]}
            correctIndex={2}
            explanation="In-thread reactions or replies keep channels organized and show your teammates their updates are seen and valued."
          />
          <MessageRewriteExercise />
          <SlackSimulator />
        </>
      );

    case "video-meetings":
      return (
        <>
          <MicroExercise
            question="According to the 24-hour rule, when should you send a meeting recap email?"
            options={[
              "Within 1 week",
              "Only when your manager asks",
              "Within 24 hours of the meeting ending",
              "At the start of the next meeting",
            ]}
            correctIndex={2}
            explanation="Sending the recap within 24 hours keeps action items fresh, gives attendees a chance to correct errors, and signals professionalism."
          />
          <MeetingExercise />
        </>
      );

    case "manage-your-inbox":
      return (
        <>
          <MicroExercise
            question="What does the 'Inbox Zero' philosophy recommend you do with every email?"
            options={[
              "Leave them all unread until you have time",
              "Forward every email to your manager",
              "Process each email: reply, delegate, archive, or delete",
              "Delete everything older than a week",
            ]}
            correctIndex={2}
            explanation="Inbox Zero isn't about having zero emails — it's about making a deliberate decision on every email so nothing gets lost or forgotten."
          />
          <InboxExercise />
        </>
      );

    default:
      return undefined;
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; slug: string }>;
}) {
  const { moduleSlug, slug } = await params;

  const module = modernOfficeModules.find((m) => m.moduleSlug === moduleSlug);

  if (!module) return notFound();

  const lessonIndex = module.lessons.findIndex((l) => l.slug === slug);

  if (lessonIndex === -1) return notFound();

  const lesson = module.lessons[lessonIndex];

  const prevLesson =
    lessonIndex > 0 ? module.lessons[lessonIndex - 1] : undefined;

  const nextLesson =
    lessonIndex < module.lessons.length - 1
      ? module.lessons[lessonIndex + 1]
      : undefined;

  const moduleIndex = modernOfficeModules.findIndex(
    (m) => m.moduleSlug === moduleSlug
  );
  const nextModule =
    lessonIndex === module.lessons.length - 1 &&
    moduleIndex < modernOfficeModules.length - 1
      ? modernOfficeModules[moduleIndex + 1]
      : undefined;

  const exercises =
    moduleSlug === "module-2" ? getModule2Exercises(slug) : undefined;

  return (
    <LessonTemplate
      basePath={`learning-paths/office-assistant/modern-office/${moduleSlug}`}
      appSlug=""
      moduleSlug=""
      title={lesson.title}
      description={lesson.description}
      videoUrl={lesson.videoUrl}
      videoUrls={lesson.videoUrls}
      slides={lesson.slides}
      sections={lesson.sections ?? []}
      challenge={lesson.challenge ?? []}
      practiceFiles={lesson.practiceFiles}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      nextModuleHref={
        nextModule
          ? `/learning-paths/office-assistant/modern-office/${nextModule.moduleSlug}`
          : undefined
      }
      nextModuleLabel={
        nextModule
          ? `Module ${nextModule.moduleNumber}: ${nextModule.title}`
          : undefined
      }
      backHref={`/learning-paths/office-assistant/modern-office/${moduleSlug}`}
      backLabel={`Module ${module.moduleNumber}: ${module.title}`}
      exercises={exercises}
    />
  );
}
