import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { module1Lessons } from "@/lib/content/office-assistant/modern-office/module1Lessons";

export default function Module1Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="modern-office"
      courseTitle="Modern Office Operations with AI"
      basePath="office-assistant"
      breadcrumbRootLabel="Modern Office Operations with AI"
      breadcrumbRootHref="/learning-paths/office-assistant"
      moduleNumber={1}
      title="Digital Office Foundations"
      emoji="🏢"
      description="Understand how modern offices operate using digital systems and tools like email, cloud storage, and scheduling platforms."
      lessons={module1Lessons}
      level="Beginner"
      estimatedMinutes={80}
      nextModuleHref="#"
      nextModuleLabel="Module 2: Communication Systems"
    />
  );
}
