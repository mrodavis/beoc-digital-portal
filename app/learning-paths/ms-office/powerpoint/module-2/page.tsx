import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { powerpointModule2Lessons } from "@/lib/content/ms-office/powerpoint/module2Lessons";

export default function Module2Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="powerpoint"
      courseTitle="PowerPoint 2019"
      moduleNumber={2}
      title="Working with Text and Slides"
      emoji="📝"
      description="Learn how to edit slide content, format text, organize slides, and work with lists in PowerPoint."
      lessons={powerpointModule2Lessons}
      level="Beginner"
      estimatedMinutes={46}
      nextModuleHref="/learning-paths/ms-office/powerpoint/module-3"
      nextModuleLabel="Module 3: Visual Design"
    />
  );
}