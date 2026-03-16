import { Lesson } from "@/types/lesson";

import { wordModule1Lessons } from "./module1Lessons";
import { wordModule2Lessons } from "./module2Lessons";
import { wordModule3Lessons } from "./module3Lessons";
import { wordModule4Lessons } from "./module4Lessons";
// import { wordModule5Lessons } from "./module5Lessons";
import { wordModule6Lessons } from "./module6Lessons";
// import { wordModule7Lessons } from "./module7Lessons";
// import { wordModule8Lessons } from "./module8Lessons";

export type WordModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
};

export const wordModules: WordModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Introduction to Word 2019",
    emoji: "📝",
    description:
      "Interface navigation, document creation, saving, and essential formatting.",
    lessons: wordModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 35,
  },

  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Basic Formatting",
    emoji: "✏️",
    description:
      "Master paragraph formatting, alignment, spacing, and essential document styling.",
    lessons: wordModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 40,
  },

  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Styles, Media & Themes",
    emoji: "🎨",
    description:
      "Use styles, themes, images, and media to create visually polished documents.",
    lessons: wordModule3Lessons,
    level: "Intermediate",
    estimatedMinutes: 40,
  },

  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "References, Review & Collaboration",
    emoji: "🤝",
    description:
      "Use headers, footers, track changes, comments, and collaboration tools for professional document workflows.",
    lessons: wordModule4Lessons,
    level: "Intermediate",
    estimatedMinutes: 45,
  },

//   {
//     moduleNumber: 5,
//     moduleSlug: "module-5",
//     title: "Tables, Charts & Mail Merge",
//     emoji: "📊",
//     description:
//       "Create tables, insert charts, and automate document creation using Mail Merge.",
//     lessons: wordModule5Lessons,
//     level: "Intermediate",
//     estimatedMinutes: 50,
//   },

  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "Advanced Formatting",
    emoji: "📄",
    description:
      "Master advanced document layout techniques including columns, page formatting, and structured documents.",
    lessons: wordModule6Lessons,
    level: "Advanced",
    estimatedMinutes: 50,
  },

//   {
//     moduleNumber: 7,
//     moduleSlug: "module-7",
//     title: "Advanced Styles & Themes",
//     emoji: "⚙️",
//     description:
//       "Deep dive into document styles, themes, and advanced formatting techniques used for certification-level workflows.",
//     lessons: wordModule7Lessons,
//     level: "Advanced",
//     estimatedMinutes: 55,
//   },

//   {
//     moduleNumber: 8,
//     moduleSlug: "module-8",
//     title: "Office 365 and More",
//     emoji: "☁️",
//     description:
//       "Explore modern Microsoft 365 features, cloud collaboration, and advanced Word productivity tools.",
//     lessons: wordModule8Lessons,
//     level: "Advanced",
//     estimatedMinutes: 45,
//   },
];