import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { excelModule3Lessons } from "@/lib/content/ms-office/excel/module3Lessons";

export default function Module3Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="excel"
      courseTitle="Excel 2019"
      moduleNumber={3}
      title="Data Analysis & Visualization"
      emoji="📊"
      description="Develop advanced Excel skills including logical functions, lookup tools, data validation, PivotTables, and professional data visualization techniques."
      lessons={excelModule3Lessons}
      level="Intermediate"
      estimatedMinutes={450}
      nextModuleHref="/learning-paths/ms-office/excel/module-4"
      nextModuleLabel="Module 4: Advanced Data Management"
    />
  );
}