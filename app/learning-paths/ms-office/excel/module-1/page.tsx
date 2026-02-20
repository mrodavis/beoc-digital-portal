import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { excelModule1Lessons } from "@/lib/content/ms-office/excel/module1Lessons";

export default function Module1Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="excel"
      courseTitle="Excel 2019"
      moduleNumber={1}
      title="Introduction to Excel 2019"
      emoji="📊"
      description="Learn the fundamentals of Excel"
      lessons={excelModule1Lessons}
      level="Beginner"
      estimatedMinutes={30}
      nextModuleHref="/learning-paths/ms-office/excel/module-2"
      nextModuleLabel="Module 2: Formulas & Functions"
    />

  );
}
