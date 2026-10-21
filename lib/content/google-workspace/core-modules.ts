import type { GoogleWorkspaceModule } from "./modules";
import { gwModule1Lessons } from "./module1Lessons";
import { gwModule2Lessons } from "./module2Lessons";
import { gwModule3Lessons } from "./module3Lessons";
import { gwModule4Lessons } from "./module4Lessons";

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
  {
    moduleNumber: 3,
    moduleSlug: "module-3",
    title: "Google Docs",
    emoji: "📝",
    description:
      "Write, format, structure, review, and send professional documents in Google Docs: notices, handbooks, updates, and letters.",
    lessons: gwModule3Lessons,
    level: "Beginner",
    estimatedMinutes: 120,
    whatYoullLearn: [
      "How to start documents from blank pages and templates and format text, paragraphs, and lists",
      "How to structure long documents with headings, the tabs and outlines panel, a table of contents, headers, footers, page numbers, and page setup",
      "How to add tables, images, smart chips, and building blocks, and how to use voice typing",
      "How to review with comments, assignments, Suggesting mode, and version history",
      "How to proofread, print, download, email, and copy a finished document",
    ],
    scenario:
      "Parkview's documents are the office's voice: the water shutoff notice on the lobby board, the tenant handbook every new resident receives, the weekly maintenance update, the new pet policy, and the welcome letter for each move-in. You write and finish them all in Google Docs, working with Denise, Marcus, Kim, and Priya in the same files instead of emailing drafts back and forth.",
  },
  {
    moduleNumber: 4,
    moduleSlug: "module-4",
    title: "Google Sheets",
    emoji: "📊",
    description:
      "Enter and format data, calculate with formulas and functions, sort and filter, chart and summarize, and keep shared spreadsheets clean in Google Sheets.",
    lessons: gwModule4Lessons,
    level: "Beginner to Intermediate",
    estimatedMinutes: 135,
    whatYoullLearn: [
      "How to enter, edit, and format data, freeze rows, and work with sheet tabs",
      "How to write formulas, use SUM, AVERAGE, MAX, IF, and COUNTIF, and copy formulas with relative and absolute references",
      "How to sort, filter, save filter views, add conditional formatting rules, and convert data to a table",
      "How to build charts and pivot tables from your data",
      "How to add dropdowns and checkboxes, protect ranges, use notes and comments, and download as Excel or CSV",
    ],
    scenario:
      "Parkview runs on lists: the rent roll Priya keeps, the repair costs Kim tracks, the maintenance request log for both buildings, the numbers Marcus brings to the owners each month, and the supply order four people add to. You build and maintain these spreadsheets in Google Sheets so the numbers are right, easy to read, and safe from accidental changes while several people work in them at once.",
  },
];
