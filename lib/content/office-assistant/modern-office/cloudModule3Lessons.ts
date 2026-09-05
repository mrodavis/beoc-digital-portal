import { Lesson } from "@/types/lesson";

/** INFO 3035 Module 3 — Windows navigation and file management. */
export const cloudModule3Lessons: Lesson[] = [
  {
    slug: "navigating-windows",
    title: "Navigating the Windows Environment",
    description:
      "Work confidently with the desktop, Start menu, taskbar, and window management, and customize the environment for how you actually work.",
    duration: "20 min",
    objectives: [
      "Navigate the desktop, Start menu, and taskbar",
      "Manage multiple windows using snapping and virtual desktops",
      "Customize the desktop and taskbar for your workflow",
      "Use search to find applications, files, and settings quickly",
    ],
    sections: [
      {
        heading: "Speed comes from the keyboard",
        blocks: [
          {
            type: "scenario",
            role: "You work the front desk at Lakeside Medical Associates.",
            text: "You move between the EHR, Outlook, a browser, and a spreadsheet constantly. Done with the mouse — minimize, find, click, restore — each switch costs several seconds. Across a day of hundreds of switches, that is a meaningful part of your time spent managing windows rather than doing work.",
            task: "Learn the navigation shortcuts that make window management nearly free.",
          },
          {
            type: "table",
            caption: "Shortcuts worth learning first",
            columns: ["Keys", "Does"],
            rows: [
              ["Windows key", "Opens the Start menu — then just type to search"],
              ["Windows + E", "Opens File Explorer"],
              ["Windows + D", "Shows the desktop; press again to restore"],
              ["Windows + L", "Locks the workstation immediately"],
              ["Alt + Tab", "Switches between open windows"],
              ["Windows + Arrow", "Snaps the window to half or a quarter of the screen"],
              ["Windows + Ctrl + D", "Creates a new virtual desktop"],
              ["Windows + Ctrl + Arrow", "Switches between virtual desktops"],
              ["Windows + number", "Opens or switches to that taskbar item"],
            ],
          },
          {
            type: "paragraph",
            text: "The Start menu's search is the fastest route to almost anything. Press the Windows key and start typing — applications, files, and settings all appear. Learning this one habit replaces most menu navigation entirely.",
          },
          {
            type: "paragraph",
            text: "Window snapping is the other high-value habit. Windows + Left and Windows + Right place two windows side by side instantly, which is how you compare the EHR against a spreadsheet without switching between them. Virtual desktops go further, letting you keep clinical applications on one desktop and administrative work on another.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Windows + L should become the most automatic keystroke you have. Every time you step away from a workstation — to the printer, to answer the phone, to help someone at the window — lock it first. A patient record visible on an unattended screen is a privacy exposure whether or not anyone actually reads it, and locking takes under a second.",
          },
          {
            type: "knowledge-check",
            question:
              "You need to compare a spreadsheet against a record in the EHR without switching back and forth. What is the fastest approach?",
            options: [
              "Print the spreadsheet and read it beside the screen",
              "Snap the two windows side by side with Windows + Left and Windows + Right",
              "Alt + Tab between them repeatedly",
              "Minimize everything and restore each window as needed",
            ],
            correctIndex: 1,
            explanation:
              "Snapping places both windows side by side so both are visible at once, which is precisely what comparing requires. Any approach involving switching means holding values in your head between views, which is slower and where transcription errors come from.",
            optionRationales: [
              "Printing works but wastes paper, and the printout is out of date the moment the data changes.",
              "Correct. Snapping shows both at once, which is what a comparison needs.",
              "Alt+Tab still shows one window at a time, so you are comparing from memory.",
              "This is the slowest option and still never shows both together.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build the habits rather than just reading the list.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "For one work session, open every application using the Windows key and typing, never by clicking an icon. Note how it feels by the end.",
          "Snap four windows into the four quadrants of your screen using Windows + Arrow combinations.",
          "Create two virtual desktops, place different applications on each, and switch between them with Windows + Ctrl + Arrow.",
          "Pin your five most-used applications to the taskbar in a deliberate order, then practice opening each with Windows + its number.",
        ],
      },
    ],
  },
  {
    slug: "file-explorer-and-folders",
    title: "File Explorer and Folder Organization",
    description:
      "Master File Explorer and design a folder structure and naming convention that stays findable as it grows.",
    duration: "22 min",
    objectives: [
      "Navigate File Explorer and use its view options",
      "Create, rename, move, and share folders",
      "Design a folder structure that scales",
      "Apply a file naming convention that sorts and searches well",
    ],
    sections: [
      {
        heading: "Organization is a decision made once",
        blocks: [
          {
            type: "scenario",
            role: "You inherit the shared drive at Lakeside Medical Associates.",
            text: "It contains 1,400 files across four levels of folders. Names include 'letter final.docx', 'letter final v2.docx', 'letter FINAL USE THIS.docx', and 'Copy of Copy of intake form.docx'. Nobody can find anything, so people save new copies rather than search — which makes it worse every week.",
            task: "Design a structure and naming convention that stays usable as it grows.",
          },
          {
            type: "paragraph",
            text: "Folder structure should mirror how people look for things, not how they were created. Most offices organize by function, then by year, then by type — because that is the order someone actually thinks in when searching: what kind of thing, from when.",
          },
          {
            type: "code",
            code: `Practice Documents/
  Administration/
    2026/
      Policies/
      Meeting Minutes/
      Staff Communications/
  Clinical Forms/
    Intake/
    Consent/
    Discharge/
  Billing/
    2026/
      Insurance Correspondence/
      Denials and Appeals/
  Templates/`,
          },
          {
            type: "paragraph",
            text: "Naming matters as much as structure, because search only works if names are predictable. A good file name contains the date in year-month-day order, a description, and a version if versions matter.",
          },
          {
            type: "table",
            caption: "Naming that works against naming that does not",
            columns: ["Poor", "Better", "Why"],
            rows: [
              [
                "letter final v2.docx",
                "2026-09-01_Insurance-Appeal_Ramirez_v2.docx",
                "Sorts by date, says what it is, versions unambiguous",
              ],
              [
                "Copy of intake form.docx",
                "Intake-Form_Template_v3.docx",
                "Names the purpose rather than its history",
              ],
              [
                "notes 9-1-26.docx",
                "2026-09-01_Staff-Meeting-Notes.docx",
                "Year-first dates sort chronologically in any file list",
              ],
              [
                "FINAL FINAL.pdf",
                "2026-08-15_Policy-Manual_v4-approved.pdf",
                "'Final' is not a version; a number and a status is",
              ],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Year-first dates — 2026-09-01 rather than 09-01-2026 — are the single highest-value naming habit. They sort chronologically in every file list automatically, with no effort and no special tooling. Once you have used them for a month, the alternative starts to look broken.",
          },
          {
            type: "knowledge-check",
            question:
              "Why should dates in file names be written as 2026-09-01 rather than 09-01-2026?",
            options: [
              "It is the required format in Windows",
              "Year-first dates sort chronologically when files are sorted by name",
              "It uses fewer characters",
              "Windows search cannot index the other format",
            ],
            correctIndex: 1,
            explanation:
              "Sorting a file list by name puts year-first dates in true chronological order automatically, because the most significant digits come first. Month-first dates group every January together across all years, which is almost never what you want.",
            optionRationales: [
              "Windows imposes no naming format. This is a convention, and a very useful one.",
              "Correct. Year-first dates sort chronologically by name, with no extra effort.",
              "Both formats use the same number of characters.",
              "Search indexes both. Sorting is the difference.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Fix a real mess, at small scale.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Design a folder structure for a small medical office covering administration, clinical forms, billing, and templates. Go no deeper than four levels.",
          "Write a one-page naming convention someone could follow without asking questions. Include at least three worked examples.",
          "Take a real folder on your own computer holding at least twenty files and reorganize it to your structure, renaming every file to your convention.",
          "Write three sentences on what made the reorganization hardest, and what rule would have prevented it.",
        ],
      },
    ],
  },
];
