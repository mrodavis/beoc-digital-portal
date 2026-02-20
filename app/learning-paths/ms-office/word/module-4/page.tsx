import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { wordModule4Lessons } from "@/lib/content/ms-office/word/module4Lessons";

export default function Module3Page() {
  return (
    <ModuleIndexTemplate
        moduleNumber={4}
        title="References, Reviews, & Collaboration"
        emoji="🎨"
        description="Master headers, footers, track changes, and collaborate with others..."
        lessons={wordModule4Lessons}
        level="Intermediate"
        estimatedMinutes={40}
        prevModuleHref="/learning-paths/ms-office/word/module-3"
        prevModuleLabel="Module 3: Styes, Media, & Themes"
        nextModuleHref="/learning-paths/ms-office/word/module-5"
        nextModuleLabel="Module 5: Tables, Charts & Mail Merge"
    />

  );
}
