import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/onedrive/module-2";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const onedriveModule2Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "uploading-and-creating",
    title: "Uploading Files and Creating Folders",
    description:
      "Build a folder structure that makes sense to your team, upload files and whole folders, create new Office files in OneDrive, and name them so anyone can find them.",
    objectives: [
      "Create folders in My files and inside other folders",
      "Upload one or several files, and upload a whole folder",
      "Create a new Word, Excel, or PowerPoint file directly in OneDrive",
      "Name files and folders clearly and avoid characters OneDrive doesn't allow",
    ],
    duration: "15 min",
    slides: slides("uploading-and-creating", [
      "Create or upload: one button for folders, new files, and uploads",
      "Plan folders by the work, not by the person",
      "Files upload versus Folder upload",
      "New Office files start as Document, Book, or Presentation: rename them",
      "Names people can find: clear words, no forbidden characters",
    ]),
    sections: [
      {
        heading: "A place for everything",
        blocks: [
          {
            type: "scenario",
            role: "You track patient referrals at Lakeside Medical Associates.",
            text: "Referral paperwork lives in three places right now: an email folder, a USB drive, and a printout on Maria's desk. Maria asks you to set up a Referrals folder in OneDrive, put the tracking log and fax cover sheet in it, start a phone log, and upload the Health Fair materials a volunteer gave you on a flash drive.",
            task: "Create the folder, upload files and a folder, and start a new document, with names the whole team will understand.",
          },
          {
            type: "paragraph",
            text: "In OneDrive on the web, everything new starts from one button. In a work or school OneDrive it is Create or upload; in a personal OneDrive it is Add new. It creates a folder, a new Word document, Excel workbook, or PowerPoint presentation, or uploads files or a whole folder from your computer. Whatever you create goes into the folder you have open, so open the right folder first.",
          },
          {
            type: "table",
            caption: "The Create or upload menu",
            columns: ["Choice", "What it does"],
            rows: [
              ["Folder", "Asks for a folder name, then creates the folder where you are"],
              ["Word document, Excel workbook, PowerPoint presentation", "Creates a blank file and opens it in the web app. It starts with a name like Document or Book, so rename it"],
              ["Files upload", "Opens your computer's file picker. Hold Ctrl to pick several files"],
              ["Folder upload", "Uploads a whole folder, with everything inside it, in one step"],
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Microsoft is moving Create or upload from the top of the left pane to the right side of the page, near the command bar. Same button, same choices, new spot.",
          },
        ],
      },
      {
        heading: "Folders that make sense to everyone",
        blocks: [
          {
            type: "paragraph",
            text: "Organize by the work, not by the person. A folder called Referrals tells everyone what is inside; a folder called Alex's Stuff tells no one anything. Keep the structure shallow: two or three levels is easier to navigate than seven. And put a file in one folder only. Two copies in two folders means two versions, and soon nobody knows which one is current.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Good name or bad name?",
            prompt: "Sort each file name. A good name says what the file is and works in OneDrive.",
            buckets: [
              { id: "good", label: "Clear name" },
              { id: "bad", label: "Rename it" },
            ],
            items: [
              { id: "a", text: "Referral Tracking Log.xlsx", bucket: "good" },
              { id: "b", text: "scan0042.pdf", bucket: "bad" },
              { id: "c", text: "Flu Clinic Flyer.docx", bucket: "good" },
              { id: "d", text: "Document (3).docx", bucket: "bad" },
              { id: "e", text: "Fax: Riverside?.docx", bucket: "bad" },
              { id: "f", text: "Insurance Verification Checklist.docx", bucket: "good" },
            ],
            explanation: "A name should tell a coworker what the file is without opening it. OneDrive doesn't allow these characters in names: \" * : < > ? / \\ | so a name with a colon or question mark has to change.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Characters OneDrive doesn't allow in file or folder names: \" * : < > ? / \\ |. Some names aren't allowed at all, such as .lock, CON, PRN, AUX, NUL, desktop.ini, and any name that contains _vti_ or starts with ~$. A single file can be up to 250 GB.",
          },
        ],
      },
      {
        heading: "Uploading",
        blocks: [
          {
            type: "worked-example",
            title: "Uploading two referral files into the new folder",
            task: "Put Referral Tracking Log.xlsx and Referral Fax Cover Sheet.docx from your computer into the Referrals folder.",
            steps: [
              { move: "Open the Referrals folder first.", why: "Uploads land in the folder you have open. Uploading from My files and moving later is extra work." },
              { move: "Select Create or upload, then Files upload.", why: "Files upload opens your computer's file picker, the same Open window you use everywhere in Windows." },
              { move: "Click the first file, hold Ctrl, click the second, then select Open.", why: "Ctrl+click picks several files at once, so both upload in one step." },
              { move: "Watch for the upload message, then check that both files are in the list.", why: "Confirming takes a second and catches a file that was skipped or picked by mistake." },
            ],
            result: "Both files are in OneDrive, in the folder where the team will look for them.",
            takeaway: "Open the destination first, then upload. Use Folder upload when you have a whole folder to bring in.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the upload steps in order",
            prompt: "Drag the steps into the right order for uploading a file into a folder.",
            items: [
              { id: "1", text: "Open the folder where the file belongs" },
              { id: "2", text: "Select Create or upload" },
              { id: "3", text: "Select Files upload" },
              { id: "4", text: "Pick the file on your computer and select Open" },
              { id: "5", text: "Check that the file appears in the folder" },
            ],
          },
          {
            type: "tip",
            text: "On a work computer with the OneDrive sync app, you can also save straight into OneDrive from Word or Excel, or drag files into the OneDrive folder in File Explorer. Module 5 covers the sync app.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You select Create or upload › Word document in the Referrals folder. What should you do next?",
            options: [
              "Nothing; OneDrive names it for you",
              "Rename it from Document to a name that says what it is",
              "Download it so it is saved",
              "Move it to My files so it is easier to find",
            ],
            correctIndex: 1,
            explanation: "New files start with a generic name like Document. Give it a clear name right away so nobody ends up with Document (1), Document (2), and Document (3).",
            optionRationales: [
              "OneDrive gives it a generic name like Document. That name won't help anyone find it.",
              "Correct. Rename it right away with a clear name.",
              "Files in OneDrive are saved in the cloud already. Downloading makes an extra copy.",
              "It is already where it belongs, in the Referrals folder.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which file name will OneDrive refuse?",
            options: ["Referral Log - Riverside.xlsx", "Referral Log (Riverside).xlsx", "Referral Log: Riverside.xlsx", "Referral_Log_Riverside.xlsx"],
            correctIndex: 2,
            explanation: "A colon (:) is one of the characters OneDrive doesn't allow, along with \" * < > ? / \\ |. Hyphens, parentheses, and underscores are fine.",
            optionRationales: [
              "Hyphens are allowed.",
              "Parentheses are allowed.",
              "Correct. A colon isn't allowed in OneDrive file names.",
              "Underscores are allowed.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Organize a small set of your own practice files in your real OneDrive." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in at onedrive.com with your school account.",
          "In My files, create a folder named OneDrive Practice.",
          "Open it and upload two files from the computer (any class files, never patient information).",
          "Create a new Word document in the folder and rename it Practice Notes.",
          "Type one sentence in Practice Notes describing how you named your files and why.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit a screenshot of the OneDrive Practice folder showing all three files to your instructor or course folder. If you cannot sign in, submit this lesson's practice simulation results page instead." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "moving-copying-renaming",
    title: "Moving, Copying, Renaming, and Deleting",
    description:
      "Keep OneDrive tidy: rename unclear files, move files into the right folder, copy templates, and delete what you don't need, without losing anything.",
    objectives: [
      "Rename a file or folder",
      "Move one or several files with Move to or by dragging",
      "Copy a file to another folder with Copy to",
      "Delete files and know they go to the Recycle bin",
    ],
    duration: "15 min",
    slides: slides("moving-copying-renaming", [
      "Rename, Move to, Copy to, Delete: four commands that keep OneDrive tidy",
      "Move keeps one file; Copy makes a second, separate file",
      "Select several files with the check boxes or Ctrl+click",
      "Moving a shared file keeps its sharing",
      "Delete sends files to the Recycle bin",
    ]),
    sections: [
      {
        heading: "Clean up before it gets out of hand",
        blocks: [
          {
            type: "scenario",
            role: "You are tidying the front desk's OneDrive after a busy week.",
            text: "My files has a scanned invoice called scan0042.pdf, three patient forms that should be in Patient Forms, a Copy of Flu Clinic Flyer nobody needs, and a supply log with no folder. Tasha needs the reminder template for her training packet, but the original must stay with the front desk files.",
            task: "Rename, move, copy, and delete so every file has a clear name and one home.",
          },
          {
            type: "table",
            caption: "Four commands, and when to use each",
            columns: ["Command", "What happens", "Use it when"],
            rows: [
              ["Rename", "The same file gets a new name", "The name doesn't say what the file is"],
              ["Move to", "The same file goes to a new folder", "A file is in the wrong place"],
              ["Copy to", "A second, separate file is created in another folder", "You need a starting point for something new (a template)"],
              ["Delete", "The file goes to the Recycle bin", "A file is a duplicate or no longer needed"],
            ],
          },
          {
            type: "paragraph",
            text: "Select a file and these commands appear in the command bar. You can also right-click the file or select More actions (…) next to its name. To work on several files at once, select their round check boxes (or hold Ctrl and click each row), then choose the command once.",
          },
        ],
      },
      {
        heading: "Move or copy?",
        blocks: [
          {
            type: "paragraph",
            text: "Moving keeps one file; it just lives somewhere else. Its sharing, version history, and comments go with it. Copying makes a brand-new file with its own history. The copy is not shared with anyone, and changes to one don't change the other. That is exactly what you want for a template and exactly what you don't want for a schedule, where a copy quickly becomes the wrong version.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Move it or copy it?",
            prompt: "Sort each situation.",
            buckets: [
              { id: "move", label: "Move to" },
              { id: "copy", label: "Copy to" },
            ],
            items: [
              { id: "a", text: "A form was saved in My files instead of Patient Forms", bucket: "move" },
              { id: "b", text: "Tasha needs her own copy of the reminder template to customize", bucket: "copy" },
              { id: "c", text: "The supply log belongs in the new Supplies folder", bucket: "move" },
              { id: "d", text: "You want to start next month's flyer from this month's", bucket: "copy" },
              { id: "e", text: "The staff schedule is in the wrong folder and the team edits it daily", bucket: "move" },
            ],
            explanation: "If the same file should simply live somewhere else, move it. If you need a separate starting point that will change on its own, copy it.",
          },
          {
            type: "worked-example",
            title: "Moving three forms in one step",
            task: "Move Medical Records Release Form, Financial Policy Form, and Telehealth Consent Form from My files into Patient Forms.",
            steps: [
              { move: "Select the round check box on each of the three rows.", why: "Selecting all three first means one Move instead of three." },
              { move: "Select Move to in the command bar.", why: "Move to opens a panel where you choose a destination folder, which is more precise than dragging in a long list." },
              { move: "Select Patient Forms in the panel, then Move here.", why: "Move here puts the files inside the folder you opened in the panel." },
              { move: "Open Patient Forms to confirm.", why: "A quick look confirms all three arrived." },
            ],
            result: "All three forms are in Patient Forms, and My files is shorter.",
            takeaway: "Select everything first, then act once. You can also drag selected files onto a folder in the list.",
          },
        ],
      },
      {
        heading: "Deleting safely",
        blocks: [
          {
            type: "paragraph",
            text: "Delete sends a file to the OneDrive Recycle bin, not straight into oblivion. In a work or school account it stays there for 93 days unless your organization changed that; in a personal account, 30 days. Module 4 shows how to restore deleted files. Before you delete a file someone else might use, check the Sharing column or the details pane. If it is shared, ask first.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "You can only delete files you own or can edit. Files shared with you belong to their owner. If something shared with you is no longer needed, ask the owner, or remove it from your Shared list instead of trying to delete it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You move a shared staff schedule from My files into the Front Desk folder. What happens to the people it was shared with?",
            options: [
              "They lose access and you must share it again",
              "They keep access; moving keeps the same file and its sharing",
              "They get a new copy of the file",
              "They are notified and must accept the move",
            ],
            correctIndex: 1,
            explanation: "Moving keeps the same file, so its sharing, version history, and comments move with it.",
            optionRationales: [
              "Moving within your OneDrive keeps the file's sharing.",
              "Correct. It is the same file in a new folder.",
              "Copying makes a new file. Moving does not.",
              "No one has to accept anything when you move your own file.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Tasha wants to customize the appointment reminder template for her training packet without changing the front desk version. What should you do?",
            options: ["Move the template to her folder", "Copy the template to her folder", "Rename the template", "Share the template with Can edit"],
            correctIndex: 1,
            explanation: "Copy to makes a separate file. Tasha can change her copy and the original stays as it is.",
            optionRationales: [
              "Moving would take the template away from the front desk.",
              "Correct. A copy is a separate file she can change freely.",
              "Renaming doesn't give her a separate file.",
              "Sharing with Can edit lets her change the original, which is what you want to avoid.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use the OneDrive Practice folder from the previous lesson (or create it now) in your real OneDrive." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a folder named Archive inside OneDrive Practice.",
          "Rename one of your practice files so the name says exactly what it is.",
          "Copy Practice Notes into Archive with Copy to. Open both copies and change one word in the copy. Confirm the original didn't change.",
          "Move one practice file into Archive with Move to (or by dragging it onto the folder).",
          "Delete the copied Practice Notes in Archive, then open the Recycle bin and confirm it is there.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit screenshots of the OneDrive Practice folder, the Archive folder, and the Recycle bin to your instructor or course folder. If you cannot sign in, submit this lesson's practice simulation results page instead." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "finding-files",
    title: "Finding Files: Search, Favorites, and Shortcuts",
    description:
      "Find any file in seconds with Search, Home, Shared, and the People and Meetings views, keep the files you use every day in Favorites, and add shortcuts to shared folders.",
    objectives: [
      "Search OneDrive by file name",
      "Add files to Favorites and open them from the Favorites view",
      "Find files others shared with you in Shared, People, and Meetings",
      "Add a shortcut to a shared folder to My files, and remove it",
    ],
    duration: "15 min",
    slides: slides("finding-files", [
      "Four ways to find a file: Search, Home, Shared, and Browse files by",
      "Favorites: the files you use every day, one click away",
      "Shared with you: files that live in someone else's OneDrive",
      "Add shortcut to My files for a shared folder you use often",
    ]),
    sections: [
      {
        heading: "Stop clicking through folders",
        blocks: [
          {
            type: "scenario",
            role: "You start every shift at the Lakeside check-in desk.",
            text: "Every morning you open the same three files: the New Patient Intake Form, the Office Phone List, and the Front Desk Procedures folder that Maria shares with the team. Every morning you click through folders to reach them, while patients wait.",
            task: "Set up OneDrive so your everyday files are one click away, and learn the fastest way to find anything else.",
          },
          {
            type: "table",
            caption: "Where to look, depending on what you remember",
            columns: ["You remember…", "Look in"],
            rows: [
              ["Part of the name", "Search (type it and press Enter)"],
              ["You opened it recently", "Home"],
              ["Someone sent it to you", "Shared › Shared with you"],
              ["Who you worked on it with", "People"],
              ["It came up in a Teams meeting", "Meetings"],
              ["You use it all the time", "Favorites"],
            ],
          },
        ],
      },
      {
        heading: "Favorites and shortcuts",
        blocks: [
          {
            type: "paragraph",
            text: "In a work or school OneDrive, Add to favorites (right-click a file, or select More actions) puts a file in the Favorites view. Favorites doesn't move or copy the file; it is a bookmark. Remove from favorites takes the bookmark away.",
          },
          {
            type: "paragraph",
            text: "Files shared with you stay in their owner's OneDrive, so they are not in your My files. For a shared folder you use every day, select it in Shared and choose Add shortcut to My files. The shortcut appears in My files (and in File Explorer, if you use the sync app), but the folder still belongs to its owner, and their sharing still decides what you can do. Shortcuts work for folders, not single files. To remove one, select it in My files and choose Remove shortcut from My files; that doesn't affect the owner's folder.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the tool to the job",
            prompt: "Drag each job onto the OneDrive tool that does it.",
            items: [
              { id: "fav", text: "Add to favorites", match: "Keep a file you open daily one click away" },
              { id: "sc", text: "Add shortcut to My files", match: "Put a folder someone shared with you in your My files" },
              { id: "search", text: "Search", match: "Find a file when you remember part of its name" },
              { id: "people", text: "People", match: "Find files you share with one coworker" },
              { id: "home", text: "Home", match: "Reopen something you edited this morning" },
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Search looks through your OneDrive and the files shared with you. If you get too many results, add another word from the file's name.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Maria shared the Front Desk Procedures folder with you, and you want it in My files. What happens when you select Add shortcut to My files?",
            options: [
              "A copy of the folder is saved in your OneDrive",
              "The folder moves from Maria's OneDrive to yours",
              "A shortcut to Maria's folder appears in My files; the folder stays hers",
              "Maria gets ownership of your My files",
            ],
            correctIndex: 2,
            explanation: "A shortcut points to the shared folder. It still lives in Maria's OneDrive and her sharing settings still apply.",
            optionRationales: [
              "No copy is made, so there is still only one version.",
              "Nothing moves. The folder stays in Maria's OneDrive.",
              "Correct. You get a shortcut; the folder stays where it is.",
              "Shortcuts don't change ownership of anything.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You remove a file from Favorites. What happens to the file?",
            options: ["It is deleted", "It moves to the Recycle bin", "Nothing; only the bookmark is removed", "It is unshared"],
            correctIndex: 2,
            explanation: "Favorites is a list of bookmarks. Removing a favorite leaves the file exactly where it was.",
            optionRationales: [
              "Favorites never deletes files.",
              "Only Delete sends a file to the Recycle bin.",
              "Correct. The file is unchanged.",
              "Sharing isn't affected by Favorites.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Set up your real OneDrive for speed." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in at onedrive.com with your school account.",
          "Search for one of your practice files by typing part of its name.",
          "Add two files you use often to Favorites, then open the Favorites view.",
          "If anyone has shared a folder with you, open Shared, select it, and choose Add shortcut to My files. (If nothing is shared with you, skip this step.)",
          "Write two sentences: which way of finding files you will use most, and why.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit a screenshot of your Favorites view and your two sentences to your instructor or course folder. If you cannot sign in, submit this lesson's practice simulation results page instead." },
    ],
  },
];
