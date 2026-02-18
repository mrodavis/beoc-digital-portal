import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { wordModule3Lessons } from "@/lib/content/ms-office/word/module3Lessons";

export default function Module3Page() {
  return (
    <ModuleIndexTemplate
        moduleNumber={3}
        title="Advanced Formatting"
        emoji="🎨"
        description="Master text formatting, paragraph controls, lists, and links..."
        lessons={wordModule3Lessons}
        level="Intermediate"
        estimatedMinutes={40}
        prevModuleHref="/learning-paths/ms-office/word/module-2"
        prevModuleLabel="Module 2: Basic Formatting"
        nextModuleHref="/learning-paths/ms-office/word/module-4"
        nextModuleLabel="Module 4: Styles"
    />

  );
}
