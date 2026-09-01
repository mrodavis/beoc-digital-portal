import { Lesson } from "@/types/lesson";
import { accessModule1Lessons } from "./module1Lessons";
import { accessModule2Lessons } from "./module2Lessons";
import { accessModule3Lessons } from "./module3Lessons";
import { accessModule4Lessons } from "./module4Lessons";

export type AccessModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
};

export const accessModules: AccessModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Introduction to Access",
    emoji: "🗄️",
    description:
      "What a database does that a spreadsheet cannot, the four Access object types, and how to design tables before you build them.",
    lessons: accessModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 44,
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Tables & Relationships",
    emoji: "🔗",
    description:
      "Create tables with data types that reject bad entries, then link them so Access enforces the connections your design assumes.",
    lessons: accessModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 46,
  },
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Queries",
    emoji: "🔍",
    description:
      "Ask questions of your data with the query grid, read the SQL underneath it, and summarize with calculated fields and totals.",
    lessons: accessModule3Lessons,
    level: "Intermediate",
    estimatedMinutes: 44,
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Forms & Reports",
    emoji: "📋",
    description:
      "Build forms that make correct data entry fast and incorrect entry difficult, and reports that organize data for a reader.",
    lessons: accessModule4Lessons,
    level: "Intermediate",
    estimatedMinutes: 44,
  },
];
