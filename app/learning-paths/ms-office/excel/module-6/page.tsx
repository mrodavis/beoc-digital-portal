import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { excelModule6Lessons } from "@/lib/content/ms-office/excel/module6Lessons";

export default function Module6Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="excel"
      courseTitle="Excel 2019"
      moduleNumber={6}
      title="Tables, Charts & PivotTables"
      emoji="📊"
      description="Learn how to structure data with tables, visualize insights with charts, and summarize information using PivotTables."
      lessons={excelModule6Lessons}
      level="Intermediate"
      estimatedMinutes={150}
      nextModuleHref="/learning-paths/ms-office/excel/module-7"
      nextModuleLabel="Module 7: Advanced Data Analysis"
    />
  );
}