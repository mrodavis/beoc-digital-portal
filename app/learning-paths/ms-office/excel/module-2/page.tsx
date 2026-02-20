import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { excelModule2Lessons } from "@/lib/content/ms-office/excel/module2Lessons";

export default function Module2Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="excel"
      courseTitle="Excel 2019"
      moduleNumber={2}
      title="Cells, Formatting & Worksheets"
      emoji="💻"
      description="Learn how to modify cells, format data, manage worksheets, and structure professional spreadsheets."
      lessons={excelModule2Lessons}
      level="Beginner"
      estimatedMinutes={66}
      nextModuleHref="/learning-paths/ms-office/excel/module-3"
      nextModuleLabel="Module 3: Review & Printing Tools"
    />
  );
}