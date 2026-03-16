import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { powerpointModule3Lessons } from "@/lib/content/ms-office/powerpoint/module3Lessons";

export default function Module3Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="powerpoint"
      courseTitle="PowerPoint 2019"
      moduleNumber={3}
      title="Slide Design & Themes"
      emoji="🎨"
      description="Learn how to improve the visual design of your slides using themes, transitions, and layout tools."
      lessons={powerpointModule3Lessons}
      level="Beginner"
      estimatedMinutes={35}
      nextModuleHref="/learning-paths/ms-office/powerpoint/module-4"
      nextModuleLabel="Module 4: Managing Slides & Presentations"
    />
  );
}