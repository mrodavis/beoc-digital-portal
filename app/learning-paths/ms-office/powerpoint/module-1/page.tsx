import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { powerpointModule1Lessons } from "@/lib/content/ms-office/powerpoint/module1Lessons";

export default function Module1Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="powerpoint"
      courseTitle="PowerPoint 2019"
      moduleNumber={1}
      title="Getting Started with PowerPoint"
      emoji="🎨"
      description="Learn the PowerPoint interface, create presentations, save files, and understand how slides work."
      lessons={powerpointModule1Lessons}
      level="Beginner"
      estimatedMinutes={43}
      nextModuleHref="/learning-paths/ms-office/powerpoint/module-2"
      nextModuleLabel="Module 2: Working with Text"
    />
  );
}