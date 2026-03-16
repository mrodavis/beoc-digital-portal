import { Lesson } from "@/types/lesson";
import { powerpointModule1Lessons } from "./module1Lessons";
import { powerpointModule2Lessons } from "./module2Lessons";
import { powerpointModule3Lessons } from "./module3Lessons";
import { powerpointModule4Lessons } from "./module4Lessons";
// import { powerpointModule5Lessons } from "./module5Lessons";
// import { powerpointModule6Lessons } from "./module6Lessons";
// import { powerpointModule7Lessons } from "./module7Lessons";
// import { powerpointModule8Lessons } from "./module8Lessons";

export type PowerPointModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
};

export const powerpointModules: PowerPointModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Getting Started with PowerPoint",
    emoji: "🎨",
    description:
      "Learn the PowerPoint interface, create presentations, save files, and understand how slides work.",
    lessons: powerpointModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 43,
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Working with Text",
    emoji: "📝",
    description:
      "Learn how to edit slide content, format text, organize slides, and work with lists in PowerPoint.",
    lessons: powerpointModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 46,
  },
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Slide Design & Themes",
    emoji: "🎨",
    description:
      "Learn how to improve the visual appearance of your presentation using themes and layouts.",
    lessons: powerpointModule3Lessons,
    level: "Beginner",
    estimatedMinutes: 35,
  },

  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Managing Slides & Presentations",
    emoji: "📂",
    description:
      "Organize slides, manage presentation structure, print slides, and present to an audience.",
    lessons: powerpointModule4Lessons,
    level: "Beginner",
    estimatedMinutes: 30,
  },
];