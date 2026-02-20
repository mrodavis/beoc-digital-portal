import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { wordModule6Lessons } from "@/lib/content/ms-office/word/module6Lessons";

export default function Module6Page() {
  return (
    <ModuleIndexTemplate
        courseSlug="word"
        courseTitle="Word 2019"
        moduleNumber={6}
        title="Advanced Formatting"
        emoji="🎨"
        description="Master text formatting, paragraph controls, lists, and links..."
        lessons={wordModule6Lessons}
        level="Intermediate"
        estimatedMinutes={40}
        prevModuleHref="/learning-paths/ms-office/word/module-5"
        prevModuleLabel="Module 5: References, Review, and Collaboration"
        nextModuleHref="/learning-paths/ms-office/word/module-7"
        nextModuleLabel="Module 7: Advanced Styles"
    />

  );
}
