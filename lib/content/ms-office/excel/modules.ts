import { Lesson } from "@/types/lesson";

import { excelModule1Lessons } from "./module1Lessons";
import { excelModule2Lessons } from "./module2Lessons";
import { excelModule3Lessons } from "./module3Lessons";
import { excelModule4Lessons } from "./module4Lessons";
import { excelModule5Lessons } from "./module5Lessons";
import { excelModule6Lessons } from "./module6Lessons";
import { excelModule7Lessons } from "./module7Lessons";
// import { excelModule8Lessons } from "./module8Lessons";

export type ExcelModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
};

export const excelModules: ExcelModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Excel Fundamentals",
    emoji: "📊",
    description:
      "Interface navigation, workbook basics, formatting, and spreadsheet setup.",
    lessons: excelModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 40,
  },

  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Cells, Formatting & Basic Formulas",
    emoji: "🧮",
    description:
      "Cell formatting, number formats, worksheet structure, and basic formulas.",
    lessons: excelModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 45,
  },

  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Workbook Management, Printing & Basic Calculations",
    emoji: "📄",
    description:
      "Multiple worksheets, find & replace, spell check, view tools, professional printing, and introduction to formulas.",
    lessons: excelModule3Lessons,
    level: "Beginner",
    estimatedMinutes: 45,
  },

  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Complex Formulas, Functions & Cell References",
    emoji: "🧠",
    description:
      "Complex formulas, introduction to functions, and understanding absolute and relative cell references.",
    lessons: excelModule4Lessons,
    level: "Intermediate",
    estimatedMinutes: 50,
  },

  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "Working with Data",
    emoji: "📊",
    description:
      "Sorting, filtering, tables, charts, and conditional formatting.",
    lessons: excelModule5Lessons,
    level: "Intermediate",
    estimatedMinutes: 50,
  },

  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "Tables, Charts & PivotTables",
    emoji: "📈",
    description:
      "Structure data with tables, visualize insights with charts, and summarize information using PivotTables.",
    lessons: excelModule6Lessons,
    level: "Intermediate",
    estimatedMinutes: 55,
  },

  {
    moduleNumber: 7,
    moduleSlug: "module-7",
    title: "Data Analysis Tools",
    emoji: "🔍",
    description:
      "Advanced PivotTable techniques, What-If Analysis tools, and reference styles for deeper data analysis.",
    lessons: excelModule7Lessons,
    level: "Advanced",
    estimatedMinutes: 60,
  },

  // {
  //   moduleNumber: 8,
  //   moduleSlug: "module-8",
  //   title: "Modern Excel Features",
  //   emoji: "⚡",
  //   description:
  //     "Explore Microsoft 365 features, Intelligent Services, drawing tools, and icons to enhance modern Excel workflows.",
  //   lessons: excelModule8Lessons,
  //   level: "Advanced",
  //   estimatedMinutes: 45,
  // },
];