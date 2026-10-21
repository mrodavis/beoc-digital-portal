import type { GoogleWorkspaceModule } from "./modules";
import { gwModule1Lessons } from "./module1Lessons";
import { gwModule2Lessons } from "./module2Lessons";

/**
 * Modules 1-4 (Getting Started, Google Drive, Google Docs, Google Sheets).
 *
 * Course scenario (shared with modules 5-8; constants in lib/sims/google-workspace/people.ts):
 * the learner is Jordan Lee, the new office assistant at Parkview Property Management, a
 * fictional company that manages Elm Street Apartments and Riverside Commons. Office manager
 * Denise Carter, property manager Marcus Reyes, maintenance coordinator Kim Nguyen,
 * bookkeeper Priya Shah, leasing agent Andre Wallace; outside vendor Tony Russo (Russo Plumbing).
 */
export const coreModules: GoogleWorkspaceModule[] = [
  {
    moduleNumber: 1,
    moduleSlug: "module-1",
    title: "Getting Started with Google Workspace",
    emoji: "🧭",
    description:
      "Learn what Google Workspace is, sign in safely, move between Drive, Docs, Sheets, and Slides, and work with the Microsoft Office files people send you.",
    lessons: gwModule1Lessons,
    level: "Beginner",
    estimatedMinutes: 80,
    whatYoullLearn: [
      "What each Google Workspace app is for, and which Microsoft 365 app does the same job",
      "How a personal Google account differs from a work or school account",
      "How to sign in with 2-Step Verification and sign out safely on a shared computer",
      "How to use the Google apps menu, app home screens, templates, and Search the menus",
      "How to edit, convert, and download Word, Excel, and PowerPoint files in Google Workspace",
    ],
    scenario:
      "You just started as the office assistant at Parkview Property Management, a small company that manages Elm Street Apartments and Riverside Commons. Everyone at Parkview works in Google Workspace. Your manager, Denise Carter, set up your account and wants you ready on day one: signing in on the shared front desk computer, finding the team's files, starting new ones, and handling the Word and Excel files that vendors and tenants still send.",
  },
  {
    moduleNumber: 2,
    moduleSlug: "module-2",
    title: "Google Drive: Organize and Share",
    emoji: "📁",
    description:
      "Upload, organize, find, share, and recover files in Google Drive so the whole office can find the current version of anything in seconds.",
    lessons: gwModule2Lessons,
    level: "Beginner",
    estimatedMinutes: 95,
    whatYoullLearn: [
      "The parts of Drive: Home, My Drive, Shared drives, Shared with me, Starred, Trash, and Storage",
      "How to upload files and folders and check a file's details",
      "How to build folders, move and rename files, and use stars, colors, shortcuts, and copies",
      "How to search Drive with words, filter chips, and search operators",
      "How to share with the right role and general access, set expiration dates, and remove access",
      "How Trash and storage work, and how to get a deleted file back",
    ],
    scenario:
      "Parkview's Drive grew without a plan: scans sit on the front desk desktop, files for both buildings are loose in My Drive, and nobody is sure who can see what. Denise asks you to fix it. You upload the scans, build a folder system the whole office can follow, find files on request while she is on the phone, share each file with the right people at the right level, and clean up without losing anything the team needs.",
  },
];
