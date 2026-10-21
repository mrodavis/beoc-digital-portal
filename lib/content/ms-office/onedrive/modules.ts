import { Lesson } from "@/types/lesson";
import { onedriveModule1Lessons } from "./module1Lessons";
import { onedriveModule2Lessons } from "./module2Lessons";
import { onedriveModule3Lessons } from "./module3Lessons";
import { onedriveModule4Lessons } from "./module4Lessons";
import { onedriveModule5Lessons } from "./module5Lessons";
import { onedriveModule6Lessons } from "./module6Lessons";

export type OneDriveModule = {
  moduleNumber: number;
  moduleSlug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
  level: string;
  estimatedMinutes: number;
};

/** Microsoft OneDrive course modules. Module N's lessons live in moduleNLessons.ts. */
export const onedriveModules: OneDriveModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Getting Started with OneDrive",
    emoji: "☁️",
    description: "What OneDrive is, signing in, finding your way around OneDrive on the web, and work versus personal accounts.",
    lessons: onedriveModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 45,
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Organizing Your Files",
    emoji: "🗂️",
    description: "Upload files and folders, create folders and Office files, move, copy, rename and delete, and find any file fast with Search, Favorites, and shortcuts.",
    lessons: onedriveModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 45,
  },
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Sharing and Collaboration",
    emoji: "🤝",
    description: "Share with the right permission and the right kind of link, manage and remove access, and co-author with comments and @mentions. Patient information is never shared with an Anyone link.",
    lessons: onedriveModule3Lessons,
    level: "Beginner",
    estimatedMinutes: 50,
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Keeping Files Safe",
    emoji: "🛡️",
    description: "Restore earlier versions, recover deleted files, roll back your whole OneDrive after ransomware, protect your account, and use Personal Vault.",
    lessons: onedriveModule4Lessons,
    level: "Intermediate",
    estimatedMinutes: 55,
  },
  {
    moduleNumber: 5,
    moduleSlug: "module-5",
    title: "Syncing with Your PC",
    emoji: "🔄",
    description: "Use OneDrive from File Explorer with the sync app, read Files On-Demand status icons, keep files for offline work, free up space, and back up your Desktop and Documents.",
    lessons: onedriveModule5Lessons,
    level: "Intermediate",
    estimatedMinutes: 45,
  },
  {
    moduleNumber: 6,
    moduleSlug: "module-6",
    title: "OneDrive with Teams, Outlook, and Office",
    emoji: "🔗",
    description: "Know where Teams stores chat, channel, and meeting files, send links instead of attachments, and use AutoSave and version history in the Office apps.",
    lessons: onedriveModule6Lessons,
    level: "Intermediate",
    estimatedMinutes: 40,
  },
];
