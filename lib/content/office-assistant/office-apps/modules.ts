import { Lesson } from "@/types/lesson";
import { module1Lessons } from "./module1Lessons";
import { module2Lessons } from "./module2Lessons";
import { module3Lessons } from "./module3Lessons";
import { module4Lessons } from "./module4Lessons";
import { module5Lessons } from "./module5Lessons";
import { module6Lessons } from "./module6Lessons";

export type OfficeAppsModule = {
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

export const officeAppsModules: OfficeAppsModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Word Essentials",
    emoji: "📝",
    description:
      "Learn to create, format, and deliver professional documents in Microsoft Word 2019 — from your first letter to polished, print-ready reports.",
    lessons: module1Lessons,
    level: "Beginner",
    estimatedMinutes: 80,
    whatYoullLearn: [
      "How to navigate the Word 2019 interface confidently",
      "How to create and format professional documents",
      "How to use styles for consistent, professional appearance",
      "How to work with tables and page layout tools",
    ],
    scenario:
      "You just joined Lakeside Medical Associates as an office assistant. Your supervisor asks you to create a professional patient welcome letter, a staff memo, and a formatted supply list — all before end of day.",
  },

  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Word Advanced",
    emoji: "📋",
    description:
      "Master mail merge, document references, collaborative review with Track Changes, and reusable templates to handle high-volume communications at Lakeside Medical Associates.",
    lessons: module2Lessons,
    level: "Intermediate",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "How to create mail merge campaigns for bulk communications",
      "How to use headers, footers, and document references professionally",
      "How to collaborate using Track Changes and comments",
      "How to build reusable templates for consistent office communications",
    ],
    scenario:
      "Lakeside Medical Associates needs you to send appointment reminder letters to 200 patients, build a reusable template for staff reports, and use Track Changes to collaborate on a new office policy document.",
  },

  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Excel Essentials",
    emoji: "📊",
    description:
      "Build the foundational Excel skills every office professional needs — entering data, formatting worksheets, writing formulas, and organizing information in tables.",
    lessons: module3Lessons,
    level: "Beginner",
    estimatedMinutes: 85,
    whatYoullLearn: [
      "How to navigate Excel 2019 and enter data correctly",
      "How to format worksheets for professional presentation",
      "How to write formulas and use essential functions",
      "How to sort, filter, and organize data in tables",
    ],
    scenario:
      "Lakeside Medical Associates needs an office supply tracker, a patient appointment log, and a monthly expense report. Your manager hands you Excel and says: 'Set these up and keep them updated.'",
  },

  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Excel Advanced",
    emoji: "📈",
    description:
      "Elevate your Excel skills with charts, PivotTables, advanced functions, and data protection — building dashboards and analysis tools for real medical office workflows.",
    lessons: module4Lessons,
    level: "Intermediate",
    estimatedMinutes: 90,
    whatYoullLearn: [
      "How to create professional charts and data visualizations",
      "How to build PivotTables to analyze large datasets",
      "How to use advanced functions like VLOOKUP, IF, SUMIF, and COUNTIF",
      "How to protect data and validate entries to prevent errors",
    ],
    scenario:
      "Your supervisor at Lakeside Medical Associates wants a monthly dashboard showing expenses by department, a patient appointment analysis by provider, and automated alerts when supply costs exceed budget.",
  },

  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "PowerPoint",
    emoji: "🖥️",
    description:
      "Design and deliver professional presentations in PowerPoint 2019 — from staff orientation decks to patient education slide shows — with polish, confidence, and purpose.",
    lessons: module5Lessons,
    level: "Beginner",
    estimatedMinutes: 80,
    whatYoullLearn: [
      "How to navigate PowerPoint 2019 and build a slide deck",
      "How to design professional slides using themes and layouts",
      "How to add media, animations, and transitions effectively",
      "How to deliver a polished, professional presentation",
    ],
    scenario:
      "Your supervisor asks you to create a staff orientation presentation for new hires at Lakeside Medical Associates, a patient education slide deck about flu season, and a 5-minute pitch for a new scheduling system.",
  },

  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "Outlook & Integration",
    emoji: "📬",
    description:
      "Master professional email management, calendar coordination, and integrated Office workflows — connecting Word, Excel, and PowerPoint through Outlook for a seamless practice operation.",
    lessons: module6Lessons,
    level: "Intermediate",
    estimatedMinutes: 85,
    whatYoullLearn: [
      "How to manage professional email efficiently in Outlook 2019",
      "How to use Outlook Calendar for scheduling and meeting coordination",
      "How to work across Word, Excel, and PowerPoint in integrated workflows",
      "How to set up Outlook rules and automation for a high-volume inbox",
    ],
    scenario:
      "As the office assistant at Lakeside Medical Associates, you are responsible for managing the main clinic inbox, scheduling all provider appointments, coordinating between Word documents and Excel reports, and maintaining a professional communication system across the whole practice.",
  },
];
