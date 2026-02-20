import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { excelModule1Lessons } from "@/lib/content/ms-office/excel/module1Lessons";

export default function Module1Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="excel"
      courseTitle="Excel 2019"
      moduleNumber={1}
      title="Excel Foundations: Interface & File Management"
      emoji="📊"
      description="Master Excel navigation, workbook creation, saving, exporting, and OneDrive integration."
      lessons={excelModule1Lessons}
      level="Beginner"
      estimatedMinutes={44}
      nextModuleHref="/learning-paths/ms-office/excel/module-2"
      nextModuleLabel="Module 2: Cells & Formatting"
    />
  );
}