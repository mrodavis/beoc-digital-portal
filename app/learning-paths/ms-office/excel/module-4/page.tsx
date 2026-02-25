import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { excelModule4Lessons } from "@/lib/content/ms-office/excel/module4Lessons";

export default function Module4Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="excel"
      courseTitle="Excel 2019"
      moduleNumber={4}
      title="Advanced Functions & Logical Tools"
      emoji="🧮"
      description="Develop advanced Excel calculation skills using logical functions, lookup tools, conditional formulas, and error handling techniques essential for professional spreadsheet modeling and MOS certification."
      lessons={excelModule4Lessons}
      level="Intermediate"
      estimatedMinutes={180}
      nextModuleHref="/learning-paths/ms-office/excel/module-5"
      nextModuleLabel="Module 5: Working with Data"
    />
  );
}