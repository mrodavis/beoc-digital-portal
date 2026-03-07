import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { excelModule5Lessons } from "@/lib/content/ms-office/excel/module5Lessons";

export default function Module5Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="excel"
      courseTitle="Excel 2019"
      moduleNumber={5}
      title="Working with Data"
      emoji="🧮"
      description="Sorting, filtering, tables, charts, and conditional formatting."
      lessons={excelModule5Lessons}
      level="Intermediate"
      estimatedMinutes={180}
      nextModuleHref="/learning-paths/ms-office/excel/module-6"
      nextModuleLabel="Module 6: Tables, Charts, & Pivot Tables"
    />
  );
}