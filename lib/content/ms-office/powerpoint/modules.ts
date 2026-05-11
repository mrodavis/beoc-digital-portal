import { Lesson } from "@/types/lesson";
import { powerpointModule1Lessons } from "./module1Lessons";
import { powerpointModule2Lessons } from "./module2Lessons";
import { powerpointModule3Lessons } from "./module3Lessons";
import { powerpointModule4Lessons } from "./module4Lessons";
import { powerpointModule5Lessons } from "./module5Lessons";
import { powerpointModule6Lessons } from "./module6Lessons";
import { powerpointModule7Lessons } from "./module7Lessons";
import { powerpointModule8Lessons } from "./module8Lessons";

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
  {
  moduleNumber: 5,
  moduleSlug: "module-5",
  title: "Images & Objects",
  emoji: "🖼️",
  description:
    "Insert pictures, format images, work with shapes, and align objects to create visually engaging slides.",
  lessons: powerpointModule5Lessons,
  level: "Beginner",
  estimatedMinutes: 50,
},
{
  moduleNumber: 6,
  moduleSlug: "module-6",
  title: "Animations & Multimedia",
  emoji: "🎬",
  description:
    "Apply slide transitions, animate text and objects, and embed audio and video into your presentation.",
  lessons: powerpointModule6Lessons,
  level: "Intermediate",
  estimatedMinutes: 38,
},
{
  moduleNumber: 7,
  moduleSlug: "module-7",
  title: "Tables, Charts & SmartArt",
  emoji: "📊",
  description:
    "Create and format tables, insert data-driven charts, and build professional diagrams using SmartArt.",
  lessons: powerpointModule7Lessons,
  level: "Intermediate",
  estimatedMinutes: 30,
},
{
  moduleNumber: 8,
  moduleSlug: "module-8",
  title: "Review & Presenting",
  emoji: "🎤",
  description:
    "Spell-check your work, collaborate with comments, deliver your presentation using Presenter View, and share or export your file.",
  lessons: powerpointModule8Lessons,
  level: "Intermediate",
  estimatedMinutes: 27,
},
];