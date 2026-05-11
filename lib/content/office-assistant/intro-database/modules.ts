import { Lesson } from "@/types/lesson";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";

export type IntroDatabaseModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
  whatYoullLearn: string[];
  scenario: string;
};

export const introDatabaseModules: IntroDatabaseModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Introduction to Data & Databases",
    emoji: "🗃️",
    description:
      "Understand what data is, why organized records matter in a medical office, and how the concept of a database solves the problems that paper records and scattered files create.",
    lessons: module1Lessons,
    level: "Beginner",
    estimatedMinutes: 65,
    whatYoullLearn: [
      "What data is and why structured data management matters in a medical office",
      "The types of office records and how they are categorized and used",
      "The core concepts of databases: tables, records, fields, and relationships",
      "When to use Excel vs. Microsoft Access for different data management needs",
    ],
    scenario:
      "Lakeside Medical Associates has been managing patient records in a mix of paper files, scattered spreadsheets, and a notes folder on the shared drive. The billing team cannot reconcile payments without manually checking three different places. Your supervisor asks you to help design a better system — and to understand why a database approach would solve problems that spreadsheets alone cannot.",
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Excel as a Data Tool",
    emoji: "📊",
    description:
      "Use Microsoft Excel as a powerful data management tool — structure data tables correctly, sort and filter records, write lookup functions, and generate simple reports.",
    lessons: module2Lessons,
    level: "Beginner",
    estimatedMinutes: 75,
    whatYoullLearn: [
      "How to structure a properly formatted data table in Excel",
      "How to sort, filter, and search records efficiently",
      "How to use VLOOKUP, COUNTIF, and other data functions",
      "How to create simple summary reports from Excel data",
    ],
    scenario:
      "Lakeside Medical Associates tracks patient appointments in a spreadsheet, but it is disorganized — no consistent headers, mixed data types, and no way to quickly find how many appointments a specific provider has this month. Your supervisor asks you to restructure the spreadsheet and create a simple monthly summary report.",
  },
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Introduction to Microsoft Access",
    emoji: "🏛️",
    description:
      "Get started with Microsoft Access — understand what makes it different from Excel, build your first database tables, and enter and edit records in a structured environment.",
    lessons: module3Lessons,
    level: "Intermediate",
    estimatedMinutes: 75,
    whatYoullLearn: [
      "What Microsoft Access is and how it differs from Excel for data management",
      "How to create database tables and define field types correctly",
      "How to enter, edit, and navigate records in an Access table",
      "How to define relationships between tables using primary and foreign keys",
    ],
    scenario:
      "The practice manager at Lakeside Medical Associates decides that patient and billing data has grown too complex for spreadsheets and needs to move to a proper database. You are asked to help set up the initial tables in Microsoft Access for patient records and appointment tracking, and to link them together so that each appointment record automatically connects to the correct patient.",
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Queries, Forms & Reports",
    emoji: "🔍",
    description:
      "Build the three most powerful Access tools — queries that find and analyze data, forms that make data entry easy, and reports that present information professionally.",
    lessons: module4Lessons,
    level: "Intermediate",
    estimatedMinutes: 80,
    whatYoullLearn: [
      "How to create basic and filtered queries to find specific records",
      "How to design data entry forms that reduce errors and improve efficiency",
      "How to build professional reports for printing and sharing",
      "How to export Access data to Excel or PDF for distribution",
    ],
    scenario:
      "The billing manager at Lakeside Medical Associates needs three things: a query that shows all patients who had appointments in April but have not yet been billed, a data entry form for front desk staff that prevents data errors during patient registration, and a monthly appointment report formatted for the practice manager's review. You will build all three.",
  },
  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "Data Integrity & Records Management",
    emoji: "🔒",
    description:
      "Ensure your data stays accurate, consistent, and protected — with validation rules, backup strategies, records retention knowledge, and a complete office data management system.",
    lessons: module5Lessons,
    level: "Intermediate",
    estimatedMinutes: 70,
    whatYoullLearn: [
      "How to apply data validation rules that prevent common data entry errors",
      "How to back up and protect database files from loss or corruption",
      "What records retention requirements apply to medical office data",
      "How to build a complete, practical data management system for an office",
    ],
    scenario:
      "After six months of using the new database system at Lakeside Medical Associates, three problems have emerged: staff keep entering dates in different formats, a database file was lost when a workstation crashed, and the practice manager needs to know how long to keep billing records before archiving them. This module gives you the tools and knowledge to solve all three.",
  },
];
