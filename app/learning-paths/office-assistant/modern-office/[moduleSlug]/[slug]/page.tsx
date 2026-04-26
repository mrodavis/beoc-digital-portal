import { notFound } from "next/navigation";
import LessonTemplate from "@/components/LessonTemplate";
import { modernOfficeModules } from "@/lib/content/office-assistant/modern-office";
import MicroExercise from "@/components/exercises/MicroExercise";
import EmailExercise from "@/components/exercises/EmailExercise";
import MessageRewriteExercise from "@/components/exercises/MessageRewriteExercise";
import MeetingExercise from "@/components/exercises/MeetingExercise";
import InboxExercise from "@/components/exercises/InboxExercise";
import SlackSimulator from "@/components/exercises/SlackSimulator";
import DocumentReviewExercise from "@/components/exercises/DocumentReviewExercise";
import StyleMatchExercise from "@/components/exercises/StyleMatchExercise";
import SpreadsheetAuditExercise from "@/components/exercises/SpreadsheetAuditExercise";

function getModule3Exercises(slug: string) {
  switch (slug) {
    case "creating-professional-documents":
      return (
        <>
          <MicroExercise
            question="What's wrong with using bold text instead of a Heading style for section headers?"
            options={[
              "Nothing — bold text and Heading styles look the same",
              "Bold text ruins document scannability and creates no navigable structure",
              "Heading styles only work in Microsoft Word",
              "Bold text makes the document harder to email",
            ]}
            correctIndex={1}
            explanation="Heading styles do more than change how text looks — they create a navigable document structure that screen readers, table-of-contents generators, and PDF viewers can all detect. Bold text is just a visual style with none of those benefits."
          />
          <DocumentReviewExercise />
        </>
      );

    case "using-templates":
      return (
        <>
          <MicroExercise
            question="What is the main advantage of modifying a built-in style (e.g., Heading 1) in the Styles panel?"
            options={[
              "It only changes the text you currently have selected",
              "It updates every instance of that style in the document automatically",
              "It saves the change as a new font on your computer",
              "It locks the document so no one else can edit it",
            ]}
            correctIndex={1}
            explanation="When you modify a style in the Styles panel, every piece of text using that style updates instantly — that is the power of styles over manual formatting. One change, document-wide consistency."
          />
          <StyleMatchExercise />
        </>
      );

    case "spreadsheet-basics":
      return (
        <>
          <MicroExercise
            question="You type the number 7500 directly into the total cell instead of writing a formula. What is the problem with this?"
            options={[
              "Nothing — typing the number is faster and just as accurate",
              "The cell will display an error message",
              "The total will not update if any of the underlying data changes",
              "Spreadsheets only accept formulas in the bottom row",
            ]}
            correctIndex={2}
            explanation="A typed number is a static value — it never changes no matter what happens to the data above it. If a contract value is updated, your total will silently be wrong. Always use =SUM() so the total recalculates automatically."
          />
          <SpreadsheetAuditExercise />
        </>
      );

    default:
      return undefined;
  }
}

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
    moduleSlug === "module-2"
      ? getModule2Exercises(slug)
      : moduleSlug === "module-3"
      ? getModule3Exercises(slug)
      : undefined;

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
