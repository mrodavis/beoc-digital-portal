import ModuleIndexTemplate from "@/components/ModuleIndexTemplate";
import { excelModule7Lessons } from "@/lib/content/ms-office/excel/module7Lessons";

export default function Module7Page() {
  return (
    <ModuleIndexTemplate
      courseSlug="excel"
      courseTitle="Excel 2019"
      moduleNumber={7}
      title="Data Analysis Tools"
      emoji="📊"
      description="Learn how to perform deeper data analysis in Excel using advanced PivotTable tools, What-If Analysis, and reference styles."
      lessons={excelModule7Lessons}
      level="Intermediate"
      estimatedMinutes={40}
      nextModuleHref="/learning-paths/ms-office/excel/module-8"
      nextModuleLabel="Module 8: Advanced Excel Tools"
    />
  );
}