import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { wordModule2Lessons } from "@/lib/content/ms-office/word/module2Lessons";

export default function Module2Page() {
  return (
    <ModuleIndexTemplate
        moduleNumber={2}
        title="Formatting & Styles"
        emoji="🎨"
        description="Master text formatting, paragraph controls, styles, and themes..."
        lessons={wordModule2Lessons}
        level="Intermediate"
        estimatedMinutes={40}
        prevModuleHref="/learning-paths/ms-office/word/module-1"
        prevModuleLabel="Module 1: Introduction to Word 2019"
        nextModuleHref="/learning-paths/ms-office/word/module-3"
        nextModuleLabel="Module 3: Tables, Graphics & Media"
    />

  );
}
