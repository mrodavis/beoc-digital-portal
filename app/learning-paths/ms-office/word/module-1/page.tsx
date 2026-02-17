import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { wordModule1Lessons } from "@/lib/content/ms-office/word/lessons";

export default function Module1Page() {
  return (
    <ModuleIndexTemplate
      moduleNumber={1}
      title="Introduction to Word 2019"
      emoji="📝"
      description="Learn the Word interface, document creation, file management, and essential formatting used in professional environments."
      lessons={wordModule1Lessons}
      level="Beginner"
      estimatedMinutes={30}
      nextModuleHref="/learning-paths/ms-office/word/module-2"
      nextModuleLabel="Module 2: Advanced Formatting & Styles"
    />

  );
}
