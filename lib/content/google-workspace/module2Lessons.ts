import { Lesson } from "@/types/lesson";

/**
 * Google Workspace, Module 2: Google Drive: Organize and Share.
 * Scenario: Jordan Lee, office assistant at Parkview Property Management (fictional).
 */
const IMG = "/images/google-workspace/module-2";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const gwModule2Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "the-drive-screen-and-uploading",
    title: "The Drive Screen and Uploading Files",
    description:
      "Learn the parts of Google Drive, from New and Home to Shared with me and Trash, and upload files and folders from your computer.",
    objectives: [
      "Name what each part of Drive's left side shows: Home, My Drive, Shared drives, Shared with me, Recent, Starred, Spam, Trash, and Storage",
      "Upload files and folders with New and by dragging them into Drive",
      "Switch between list and grid layout and open a file's details",
      "Explain what happens when you upload a file with the same name as one already in Drive",
    ],
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/hoQbFkScHGk",
    slides: slides("the-drive-screen-and-uploading", [
      "Google Drive: every file in one place, on any computer",
      "The Drive screen: New, the left side, search, the file list, and details",
      "Home, My Drive, Shared with me: whose files are where",
      "Uploading: New, then File upload or Folder upload, or drag files in",
      "Same name? The upload becomes a new version, unless you keep both",
      "Quick check: where would you look?",
    ]),
    sections: [
      {
        heading: "Your files live in Drive",
        blocks: [
          {
            type: "scenario",
            role: "You keep Parkview's paperwork organized.",
            text: "Tenants drop off signed forms at the front desk, and you scan them on the office computer. Right now the scans pile up on the desktop, where nobody else can find them. Denise wants every form in Parkview's Drive folders, where the team can open them from either building.",
            task: "Find your way around Drive and upload files into the right folder.",
          },
          {
            type: "paragraph",
            text: "Google Drive is where every Google Doc, Sheet, and Slides file is saved, and where you can store any other file: PDFs, photos, Word and Excel files, videos. Go to drive.google.com (or choose Drive in the Google apps menu) and sign in.",
          },
          {
            type: "table",
            caption: "The left side of Drive",
            columns: ["Item", "What it shows"],
            rows: [
              ["New", "Make a folder, upload files or folders, or create a Google Doc, Sheet, Slides, or Form"],
              ["Home", "Files and folders you or others opened, shared, or edited recently, plus files for upcoming meetings"],
              ["Activity (work accounts)", "Recent comments, access requests, and approvals in one place"],
              ["My Drive", "Files and folders you created or uploaded, organized your way"],
              ["Shared drives (work accounts)", "Team drives whose files belong to the team, not to one person"],
              ["Computers", "Folders synced from a computer with Drive for desktop"],
              ["Shared with me", "Files other people shared with you"],
              ["Recent and Starred", "Files you opened lately, and files you marked with a star"],
              ["Spam and Trash", "Files you marked as spam, and files you deleted (kept for 30 days)"],
              ["Storage", "How much space you use, and which files use the most"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Drive opens to Home or My Drive. You can choose which one in Drive's Settings (the gear at the top right), under Start page.",
          },
        ],
      },
      {
        heading: "The file list and details",
        blocks: [
          {
            type: "list",
            items: [
              "Click a file once to select it. A bar appears above the list with Share, Download, Move, Move to trash, Copy link, and More actions.",
              "Double-click a file to open it. Google files open in their own browser tab; other files open in a preview.",
              "Right-click a file for every option, including Organize and Share.",
              "Use the List layout and Grid layout buttons at the top right of the list to switch views.",
              "Select a file and click View details (the i in a circle) to see its type, size, owner, who has access, and recent activity.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Where would you look?",
            prompt: "Match each question to the part of Drive that answers it.",
            items: [
              { id: "q1", text: "Kim shared the boiler inspection with you. Where is it?", match: "Shared with me" },
              { id: "q2", text: "You deleted a flyer by mistake yesterday.", match: "Trash" },
              { id: "q3", text: "Which files take up the most space?", match: "Storage" },
              { id: "q4", text: "The folders you made for each building.", match: "My Drive" },
              { id: "q5", text: "Who has access to this lease, and when was it changed?", match: "View details" },
            ],
            explanation: "My Drive holds what you own and organize. Shared with me holds what others shared. Trash holds deleted files for 30 days. Storage ranks files by size. Details shows a file's access and history.",
          },
        ],
      },
      {
        heading: "Uploading files and folders",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Open the Drive folder where the file belongs (double-click it).",
              "Click New, then File upload (or Folder upload for a whole folder).",
              "Choose the file on your computer and click Open. A box at the bottom right shows the upload's progress.",
              "Or drag files or folders from your computer's desktop or File Explorer straight into the open Drive folder in your browser.",
            ],
          },
          {
            type: "paragraph",
            text: "If you upload a file with the same name as one already in that folder, Drive saves it as a new version of the existing file. To keep both as separate files, click Keep both files in the upload box. Uploaded files use your Drive storage.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Uploaded Word and Excel files stay Office files, which you can still edit in Drive (Module 1). If you want uploads to become Google files automatically, turn on Convert uploads to Google Docs editor format in Drive's Settings. You can change that setting only on a computer.",
          },
          {
            type: "table",
            caption: "If you know OneDrive",
            columns: ["Google Drive", "OneDrive"],
            rows: [
              ["New › File upload", "Create or upload › Files upload"],
              ["My Drive", "My files"],
              ["Shared with me", "Shared › With you"],
              ["Shared drives", "SharePoint and Teams libraries"],
              ["Trash", "Recycle bin"],
            ],
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Andre shared a tenant's application with you. Where do you find it first?",
            options: ["My Drive", "Shared with me", "Trash", "Computers"],
            correctIndex: 1,
            explanation: "Files other people share with you appear in Shared with me (and often in Home and Recent). They stay in the owner's Drive.",
            optionRationales: [
              "My Drive holds files you created or uploaded. A shared file is not there unless you add a shortcut.",
              "Correct. Shared with me lists files others shared with you.",
              "Trash holds deleted files.",
              "Computers holds folders synced from a computer with Drive for desktop.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You upload Parking Permit Form.docx into a folder that already has a file with that exact name. What happens?",
            options: [
              "Drive refuses the upload",
              "The upload becomes a new version of the existing file, unless you choose Keep both files",
              "Both files are deleted",
              "The new file goes to Trash",
            ],
            correctIndex: 1,
            explanation: "Drive treats a same-name upload as a new version of the file. Keep both files in the upload box saves it as a separate file.",
            optionRationales: [
              "Drive accepts the upload.",
              "Correct. It is saved as a revision of the existing file unless you keep both.",
              "Nothing is deleted.",
              "Uploads never go to Trash.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice in your own Google Drive." },
      {
        type: "list",
        ordered: true,
        items: [
          "Go to drive.google.com and make a folder named Drive Practice (New › New folder).",
          "Open the folder and upload any file from your computer (New › File upload).",
          "Drag a second file from your desktop or File Explorer into the open folder.",
          "Switch to grid layout, then back to list layout.",
          "Select one of the files and open View details. Write down its size and owner.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your Drive Practice folder with the details pane open to your instructor or course folder. No Google account, or a computer that blocks uploads? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "organizing-files-and-folders",
    title: "Organizing Files and Folders",
    description:
      "Build a folder system your coworkers can follow: create folders, move and rename files, star and color what matters, add shortcuts, and make copies.",
    objectives: [
      "Create folders and folders inside folders",
      "Move files by dragging them or with Organize › Move, and rename them",
      "Star files and color-code folders so the important ones stand out",
      "Add a shortcut to a file in a second folder, and make a copy when you need a separate file",
      "Name files so anyone can find them",
    ],
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/07z6YD6f8bs",
    slides: slides("organizing-files-and-folders", [
      "Organizing Drive: folders, names, stars, colors, and shortcuts",
      "A folder system the whole office can follow",
      "Moving files: drag them, or Organize, then Move",
      "Stars and folder colors: only you see them",
      "Shortcut or copy? One file in two places, or two separate files",
      "Quick check: shortcut, copy, or move?",
    ]),
    sections: [
      {
        heading: "Folders the whole office can follow",
        blocks: [
          {
            type: "scenario",
            role: "You are cleaning up Parkview's My Drive.",
            text: "Files for both buildings sit loose in My Drive, one is still called Untitled document, and nobody can find the laundry schedule. Denise wants a folder for each building with a Maintenance folder inside, files named so anyone can search for them, and the files you use every day easy to reach.",
            task: "Organize the files into folders, rename them clearly, and mark the important ones.",
          },
          {
            type: "list",
            items: [
              "Create a folder: open the place it should go, click New › New folder, type a name, and click Create.",
              "Folders can hold folders: Elm Street Apartments › Maintenance › Boiler.",
              "Rename a file or folder: right-click it › Rename, or select it and press N. Inside an open file, click its name at the top left.",
              "Name files with what, where, and which: Elm Street Laundry Schedule, Lease - Elm 3B - Jordan Smith. Avoid names like Untitled document, scan001, or final final.",
            ],
          },
          {
            type: "worked-example",
            title: "Naming the boiler notes",
            task: "A file called Untitled document holds notes from the Elm Street boiler inspection.",
            steps: [
              { move: "Right-click it › Rename and type Elm Street Boiler Notes.", why: "Search finds words in names. Untitled document tells nobody what is inside." },
              { move: "Move it into Elm Street Apartments › Maintenance.", why: "A coworker who browses instead of searching finds it where they expect." },
              { move: "Leave dates and version words out of the name.", why: "Drive keeps the modified date and the version history for you." },
            ],
            result: "A file anyone at Parkview can find by searching or by browsing.",
            takeaway: "Name files for the next person: what it is, plus the building or tenant it belongs to.",
          },
        ],
      },
      {
        heading: "Moving files",
        blocks: [
          {
            type: "list",
            items: [
              "Drag the file onto the folder in the list, or onto a folder on the left side, and let go.",
              "Or right-click the file › Organize › Move, choose the folder, and click Move.",
              "Select several files first with Ctrl+click (or Shift+click for a range) to move them together.",
              "If you move a file into a shared folder, everyone who has access to that folder gets access to the file.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Move a file with Organize",
            prompt: "Put the steps in order.",
            items: [
              { id: "o1", text: "Right-click the file" },
              { id: "o2", text: "Point to Organize" },
              { id: "o3", text: "Click Move" },
              { id: "o4", text: "Choose the destination folder" },
              { id: "o5", text: "Click Move to confirm" },
            ],
            explanation: "Right-click, Organize, Move, pick the folder, confirm. Dragging does the same in one motion when the folder is on screen.",
          },
        ],
      },
      {
        heading: "Stars, colors, shortcuts, and copies",
        blocks: [
          {
            type: "table",
            caption: "Tools for finding what matters",
            columns: ["Tool", "How", "What it does"],
            rows: [
              ["Star", "Right-click › Organize › Add to starred (or select and press S)", "Puts the file under Starred on the left side"],
              ["Folder color", "Right-click a folder › Organize › choose a color", "Makes the folder stand out. Colors show only in your Drive"],
              ["Shortcut", "Right-click › Organize › Add shortcut, choose a folder, click Add shortcut", "A link to the same file in another folder. Edits show up in both places"],
              ["Make a copy", "Right-click a file › Make a copy (or File › Make a copy in the file)", "A separate file. Changes to one do not change the other"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Shortcut, copy, or move?",
            prompt: "Sort each request.",
            buckets: [
              { id: "shortcut", label: "Add a shortcut" },
              { id: "copy", label: "Make a copy" },
              { id: "move", label: "Move it" },
            ],
            items: [
              { id: "c1", text: "The vendor list should also appear in the Elm Street folder, and stay one list", bucket: "shortcut" },
              { id: "c2", text: "Riverside needs its own laundry schedule, starting from Elm Street's", bucket: "copy" },
              { id: "c3", text: "The laundry schedule belongs in the Elm Street folder, not loose in My Drive", bucket: "move" },
              { id: "c4", text: "Kim wants the boiler log in her Maintenance folder too, and wants to see your updates", bucket: "shortcut" },
              { id: "c5", text: "You want to try a new layout for the notice without changing the real one", bucket: "copy" },
            ],
            explanation: "A shortcut points to the one real file, so everyone sees the same updates. A copy is a new, separate file. Moving changes where the one file lives.",
          },
          {
            type: "callout",
            variant: "info",
            text: "A file can live in only one folder. When it needs to show up in a second folder, add a shortcut instead of a copy, so there is still only one version to keep up to date.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You colored the Elm Street folder green. What does Marcus see in his Drive?",
            options: ["A green folder", "The folder in its usual color", "A red folder", "Nothing, because coloring hides the folder"],
            correctIndex: 1,
            explanation: "Folder colors apply only to your view of Drive. Other people see their own colors.",
            optionRationales: [
              "Your colors are yours alone.",
              "Correct. Color changes apply only to your version of Drive.",
              "Colors are not shared, so he sees his own setting.",
              "Coloring never hides anything.",
            ],
          },
          {
            type: "knowledge-check",
            question: "The vendor contact list must appear in both the Elm Street and Riverside folders, and stay one list. What do you do?",
            options: ["Make a copy for each folder", "Add a shortcut to the list in the second folder", "Download it and upload it twice", "Email it to yourself"],
            correctIndex: 1,
            explanation: "A shortcut shows the same file in another folder. There is still one list to keep current.",
            optionRationales: [
              "Copies drift apart as people update one and not the other.",
              "Correct. The shortcut points to the one real list.",
              "Uploading twice makes two separate files.",
              "Emailing makes another copy outside Drive.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Organize a corner of your own Drive." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a folder named Job Search, and inside it two folders named Resumes and Cover Letters.",
          "Create or upload one file and move it into Resumes. Rename it Resume - your name.",
          "Star the Job Search folder and give it a color.",
          "Add a shortcut to your resume in the Cover Letters folder.",
          "Make a copy of the resume and name it Resume - your name - Practice.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of your Job Search folder showing the two folders, and one of the Resumes folder, to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "finding-files-fast",
    title: "Finding Files Fast",
    description:
      "Search Drive by name and by the words inside files, narrow results with the Type, People, Modified, and Location filters, and use Recent, Starred, and Shared with me.",
    objectives: [
      "Search Drive for words in file names and inside files",
      "Narrow results with the Type, People, Modified, and Location filter chips, and clear them",
      "Use search words such as owner:, type:, and before: for exact searches",
      "Choose between search, Recent, Starred, and Shared with me to find a file in seconds",
    ],
    duration: "15 min",
    slides: slides("finding-files-fast", [
      "Finding files: search first, browse second",
      "Search in Drive: type a word, press Enter",
      "Filter chips: Type, People, Modified, Location",
      "Search words for exact searches: owner:, type:, before:, after:",
      "Recent, Starred, Shared with me: shortcuts to your files",
      "Quick check: which search would you use?",
    ]),
    sections: [
      {
        heading: "Search first",
        blocks: [
          {
            type: "scenario",
            role: "You answer Denise's file requests all day.",
            text: "Denise calls from Riverside Commons: she needs the lease for apartment 210, the October rent tracker Priya keeps, and the water shutoff notice she remembers editing last week. Clicking through folders would take minutes. Search takes seconds.",
            task: "Find each file with search and filters.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Click Search in Drive at the top of the screen.",
              "Type a word from the file's name or from inside it, such as lease or shutoff, and press Enter.",
              "Results are sorted by relevance. Click a column heading to sort another way.",
              "To clear the search, click the X at the right end of the search box.",
            ],
          },
          {
            type: "tip",
            text: "Drive searches inside Google Docs, Sheets, and Slides and many other files, not only file names. Searching for a tenant's apartment number can find a letter that mentions it.",
          },
        ],
      },
      {
        heading: "Filter chips",
        blocks: [
          {
            type: "paragraph",
            text: "The filter chips under the search box narrow what you see. Use them with or without words in the search box. A chip turns blue when it is on. To remove one, open it and choose Clear; to remove them all, click Clear filters.",
          },
          {
            type: "table",
            caption: "Drive's filter chips",
            columns: ["Chip", "Narrows to", "Example"],
            rows: [
              ["Type", "Documents, Spreadsheets, Presentations, PDFs, Photos and images, Folders, and more", "Only PDFs, for scanned forms"],
              ["People", "Files owned by or shared with a person", "Files Priya owns"],
              ["Modified", "When the file last changed: Today, Last 7 days, Last 30 days, this year, last year", "What changed last week"],
              ["Location", "Where the file is: anywhere in Drive, My Drive, Shared with me, Starred, Trash", "Only files shared with you"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the chip",
            prompt: "Match each request to the chip that narrows it.",
            items: [
              { id: "f1", text: "Only the scanned forms (PDFs)", match: "Type" },
              { id: "f2", text: "Only files Kim Nguyen owns", match: "People" },
              { id: "f3", text: "Only files changed in the last 7 days", match: "Modified" },
              { id: "f4", text: "Only files other people shared with you", match: "Location" },
            ],
            explanation: "Type is what kind of file, People is whose file, Modified is when it changed, and Location is where it is.",
          },
        ],
      },
      {
        heading: "Search words for exact searches",
        blocks: [
          {
            type: "table",
            caption: "Search words you can type in Search in Drive",
            columns: ["Type this", "To find"],
            rows: [
              ["\"water shutoff\"", "Files with that exact phrase (use quotes)"],
              ["notice -draft", "Files with notice but not draft"],
              ["owner:pshah@parkviewpm.example", "Files Priya owns"],
              ["type:spreadsheet", "Spreadsheets only"],
              ["after:2026-10-01", "Files changed after a date (YYYY-MM-DD)"],
              ["is:starred", "Your starred files"],
            ],
          },
          {
            type: "paragraph",
            text: "When you know where to look, the left side is faster than search: Recent for what you opened lately, Starred for what you marked, and Shared with me for what others sent you. To find what is using your storage, open Storage and sort by Storage used.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Denise needs any spreadsheet Priya owns. What is the fastest way?",
            options: [
              "Open every folder and look",
              "Use the Type chip set to Spreadsheets and the People chip set to Priya Shah",
              "Search for spreadsheet",
              "Check Trash",
            ],
            correctIndex: 1,
            explanation: "Two chips together narrow Drive to exactly the spreadsheets Priya owns.",
            optionRationales: [
              "Browsing works but takes far longer.",
              "Correct. Chips combine, so Type plus People gives exactly what she needs.",
              "That finds files with the word spreadsheet in them, not all of Priya's spreadsheets.",
              "Trash holds deleted files.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which search finds files that contain the exact phrase water shutoff?",
            options: ["water shutoff", "\"water shutoff\"", "water -shutoff", "type:water"],
            correctIndex: 1,
            explanation: "Quotes match the exact phrase.",
            optionRationales: [
              "Without quotes, Drive finds files with either word in any order.",
              "Correct. Quotes find the exact phrase.",
              "The minus sign leaves out files that contain shutoff.",
              "type: searches by kind of file, not words.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Search your own Drive." },
      {
        type: "list",
        ordered: true,
        items: [
          "Search for a word you know is in one of your files and press Enter. Write down how many results you get.",
          "Add the Type chip to narrow the results to Documents (or another type you have).",
          "Clear the filters. Use the Modified chip to show files changed in the last 7 days.",
          "Type is:starred in the search box and press Enter. Compare the results with Starred on the left side.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your answers (the words you searched, the number of results, and what each chip changed) to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "sharing-files-and-folders",
    title: "Sharing Files and Folders",
    description:
      "Share with the right people and the right role, set general access, copy links, add expiration dates, and remove access when it is no longer needed.",
    objectives: [
      "Share a file or folder with specific people as Viewer, Commenter, or Editor",
      "Set General access to Restricted, your organization, or Anyone with the link, and explain the risk of each",
      "Copy a link to a file and change or remove someone's access",
      "Add an expiration date for a person outside your organization",
      "Explain that sharing a folder shares every file inside it",
    ],
    duration: "25 min",
    slides: slides("sharing-files-and-folders", [
      "Sharing: the right people, the right role",
      "Viewer, Commenter, Editor: what each can do",
      "General access: Restricted, your organization, or anyone with the link",
      "Sharing a folder shares everything inside it",
      "Clean up: change roles, remove access, add expiration dates",
      "Quick check: which role or access fits?",
    ]),
    sections: [
      {
        heading: "Share, do not attach",
        blocks: [
          {
            type: "scenario",
            role: "You manage access to Parkview's files.",
            text: "Marcus needs to edit the tenant handbook, Priya only needs to read it, Tony Russo from Russo Plumbing needs to see photos in the Maintenance folder for a few weeks, and the lobby notice should be readable by everyone at Parkview. You also find an old folder still open to anyone with the link, months after the painting contractor finished.",
            task: "Give each person the least access they need, and close access nobody needs anymore.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Select the file (or open it) and click Share.",
              "Type a name or email address and choose the person.",
              "Pick a role: Viewer, Commenter, or Editor.",
              "Leave Notify people checked to send an email, and add a message if it helps. Uncheck it to give access quietly.",
              "Click Send (or Share).",
            ],
          },
          {
            type: "table",
            caption: "Roles for a file in My Drive",
            columns: ["Role", "Can do", "Use it for"],
            rows: [
              ["Viewer", "View and download by default", "People who only need to read: Priya and the handbook"],
              ["Commenter", "View, comment, and suggest edits", "Reviewers: a manager checking a draft"],
              ["Editor", "View, comment, edit, and share by default", "People who work on the file with you: Marcus"],
              ["Owner", "Everything, including deleting the file", "You, for files you create"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Which role?",
            prompt: "Sort each person into the role they need.",
            buckets: [
              { id: "viewer", label: "Viewer" },
              { id: "commenter", label: "Commenter" },
              { id: "editor", label: "Editor" },
            ],
            items: [
              { id: "r1", text: "Priya needs to read the handbook", bucket: "viewer" },
              { id: "r2", text: "Denise will review the draft notice and leave notes", bucket: "commenter" },
              { id: "r3", text: "Marcus is writing half of the handbook with you", bucket: "editor" },
              { id: "r4", text: "Tony from Russo Plumbing needs to look at repair photos", bucket: "viewer" },
              { id: "r5", text: "Kim will suggest changes to the maintenance procedure for you to accept", bucket: "commenter" },
            ],
            explanation: "Give the smallest role that lets the person do the job. Editors can change and share the file, so save that role for people who truly work on it.",
          },
        ],
      },
      {
        heading: "General access and links",
        blocks: [
          {
            type: "paragraph",
            text: "Under General access in the Share box, you choose who can open the file with its link, besides the people you added by name.",
          },
          {
            type: "table",
            caption: "General access options",
            columns: ["Setting", "Who can open it", "Use it for"],
            rows: [
              ["Restricted", "Only people you added by name", "Most files. The safest choice"],
              ["Your organization (Parkview Property Management)", "Anyone signed in to a Parkview account who has the link (work accounts only)", "Notices and procedures for all staff"],
              ["Anyone with the link", "Anyone at all who gets the link, with no sign-in needed", "Public information only, never private details"],
            ],
          },
          {
            type: "list",
            items: [
              "Next to the general access setting, choose the role the link gives: Viewer, Commenter, or Editor.",
              "Click Copy link, then Done. Paste the link into an email or chat.",
              "Which options you see depends on your account. A personal account shows Restricted and Anyone with the link.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "An Anyone with the link file can be opened by whoever gets the link, including people it was forwarded to. Never use it for leases, applications, rent records, or anything with a tenant's personal information. Share those with specific people only.",
          },
          {
            type: "image",
            src: `${IMG}/sharing-files-and-folders/sharing-reference.png`,
            alt: "Quick reference: Drive sharing roles, general access options, how folder sharing works, cleaning up access, and a checklist before you click Send",
            caption: "Keep this sharing checklist handy.",
          },
        ],
      },
      {
        heading: "Folders, changes, and expiration dates",
        blocks: [
          {
            type: "paragraph",
            text: "When you share a folder, every file and folder inside it gets the same access, including files added later. You cannot give someone less access to a file than they have to the folder it is in. Keep private files out of widely shared folders.",
          },
          {
            type: "list",
            items: [
              "Change a role: open Share, click the arrow next to the person's role, and pick a new one.",
              "Remove someone: click the arrow next to their role, choose Remove access, and click Save.",
              "Turn off link sharing: under General access, choose Restricted, then click Done.",
              "Expiration (eligible work and school accounts): click the arrow next to a person's role, choose Add expiration, pick a date within one year, and click Save. Their access ends on that date.",
              "Stop editors from sharing: in Share, click Settings (the gear) and uncheck Editors can change permissions and share.",
            ],
          },
          {
            type: "worked-example",
            title: "Closing the old contractor folder",
            task: "The Bright Paint Co. folder is still set to Anyone with the link, and the painter still has edit access, months after the job ended.",
            steps: [
              { move: "Right-click the folder › Share › Share.", why: "The Share box shows every person and the general access in one place." },
              { move: "Under General access, choose Restricted.", why: "Anyone holding the old link loses access right away." },
              { move: "Next to the painter, choose Remove access, then Save.", why: "The job is over, so the access should be too." },
            ],
            result: "Only Parkview staff who were added by name can open the folder.",
            takeaway: "Review sharing when a job ends. Old links are one of the easiest ways for files to leak.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Denise needs to review a draft notice and leave notes, without changing the text herself. Which role do you give her?",
            options: ["Viewer", "Commenter", "Editor", "Owner"],
            correctIndex: 1,
            explanation: "Commenters can comment and suggest edits but cannot change the file directly.",
            optionRationales: [
              "Viewers cannot comment.",
              "Correct. Commenter lets her leave notes and suggestions.",
              "Editor lets her change the text directly, which she does not need.",
              "Ownership is never needed for a review.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You share the Maintenance folder with Tony Russo as a Viewer. What can he open?",
            options: ["Only the folder name", "Every file in the folder, including files added later", "Only files you share with him one by one", "Nothing until you send each file"],
            correctIndex: 1,
            explanation: "Files and folders inside a shared folder inherit its sharing.",
            optionRationales: [
              "Viewers of a folder can open the files in it.",
              "Correct. Everything inside inherits the folder's access, now and later.",
              "Folder sharing covers the files inside it.",
              "No extra step is needed. That is why you check what is in a folder before sharing it.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which file is safe to share with Anyone with the link?",
            options: ["A tenant's rental application", "The rent payment log", "The public flyer for an open apartment showing", "A lease with a tenant's signature"],
            correctIndex: 2,
            explanation: "Anyone with the link is for information you would post publicly. Personal and financial records are shared with specific people only.",
            optionRationales: [
              "Applications contain personal information.",
              "Rent records are private.",
              "Correct. A public flyer is meant for anyone.",
              "Signed leases contain personal details.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice sharing with a classmate, a family member, or a second account of your own. Use a practice file with no personal information." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Google Doc named Sharing Practice and type one sentence in it.",
          "Share it with the other person as a Commenter, with a short message.",
          "Ask them to add a comment. Then change their role to Viewer and ask them to try commenting again.",
          "Under General access, check that the file is Restricted.",
          "Remove the person's access.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of the Share box before you removed access, and two sentences on what changed when you switched the role from Commenter to Viewer, to your instructor or course folder. No one to share with? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "trash-storage-and-recovery",
    title: "Trash, Storage, and Getting Files Back",
    description:
      "Delete files safely, restore them from Trash within 30 days, know when a deletion is permanent, and keep an eye on your Google storage.",
    objectives: [
      "Move files to Trash and restore them",
      "Explain that Trash keeps files for 30 days and that Delete forever and Empty trash cannot be undone",
      "Explain what happens when you remove a file you do not own",
      "Check how much storage you use, what counts toward it, and which files use the most",
    ],
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/CgJZyoX4_ak",
    slides: slides("trash-storage-and-recovery", [
      "Trash and storage: delete safely, get files back",
      "Trash keeps files for 30 days",
      "Restore, Delete forever, Empty trash",
      "Files you do not own: you can remove them from your Drive, not delete them",
      "Storage: 15 GB free, shared by Gmail, Drive, and Photos",
      "Quick check: can you get it back?",
    ]),
    sections: [
      {
        heading: "Trash is a safety net",
        blocks: [
          {
            type: "scenario",
            role: "You are cleaning up Parkview's My Drive.",
            text: "My Drive is cluttered with copies of copies, an old flyer draft, and a huge lobby video. Yesterday someone deleted the Riverside pool rules by mistake, and Andre needs them back today.",
            task: "Clean up without losing anything Parkview needs, and recover the pool rules.",
          },
          {
            type: "list",
            items: [
              "Delete a file you own: select it and click Move to trash (the trash can) in the bar above the list, right-click › Move to trash, or press Delete.",
              "Files in Trash are deleted forever after 30 days.",
              "Restore: open Trash on the left side, right-click the file, and choose Restore. It goes back to where it was.",
              "Delete forever: in Trash, right-click › Delete forever. Empty trash deletes everything in Trash forever.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Delete forever and Empty trash cannot be undone from Drive. Before you empty the Trash, look through it for anything a coworker might still need.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Can you get it back?",
            prompt: "Sort each situation.",
            buckets: [
              { id: "yes", label: "Yes, restore it from Trash" },
              { id: "no", label: "No, it is gone from Drive" },
            ],
            items: [
              { id: "t1", text: "Moved to Trash yesterday", bucket: "yes" },
              { id: "t2", text: "Moved to Trash, then Delete forever", bucket: "no" },
              { id: "t3", text: "Moved to Trash two weeks ago", bucket: "yes" },
              { id: "t4", text: "Moved to Trash, then someone clicked Empty trash", bucket: "no" },
              { id: "t5", text: "Moved to Trash more than 30 days ago", bucket: "no" },
            ],
            explanation: "Trash holds files for 30 days. Delete forever, Empty trash, or the 30-day limit ends that.",
          },
        ],
      },
      {
        heading: "Files you do not own",
        blocks: [
          {
            type: "paragraph",
            text: "Only the owner can delete a file. If you remove a file someone else owns, it disappears from your Drive, but the owner and everyone else with access still have it. To get rid of a shared file for everyone, ask its owner.",
          },
          {
            type: "tip",
            text: "Need an earlier version of a file rather than a deleted one? Open the file and use version history (File › Version history › See version history). Module 3 shows how.",
          },
        ],
      },
      {
        heading: "Storage",
        blocks: [
          {
            type: "list",
            items: [
              "A free Google account has 15 GB of storage, shared by Gmail, Google Drive, and Google Photos. A work account's storage is set by the organization's plan.",
              "What counts: Gmail messages and attachments (including Spam and Trash), files in Drive such as PDFs, images, and videos, and items in Drive's Trash.",
              "Google Docs, Sheets, and Slides files created or edited after June 1, 2021 count too. Files someone shared with you count against the owner's storage, not yours.",
              "To see what uses the most space, click Storage on the left side of Drive, then click Storage used to sort by size.",
            ],
          },
          {
            type: "paragraph",
            text: "When an account runs out of storage, you cannot upload to Drive or create new Docs, Sheets, or Slides files, and Gmail may stop sending and receiving. Deleting large files you no longer need, and then emptying them from Trash, frees space.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Andre deleted the pool rules yesterday. What do you do?",
            options: ["Nothing can be done", "Open Trash, right-click the file, and choose Restore", "Ask Google to rebuild it", "Search the Recycle Bin on the computer"],
            correctIndex: 1,
            explanation: "Files stay in Trash for 30 days. Restore puts the file back where it was.",
            optionRationales: [
              "Files stay in Trash for 30 days, so it can be restored.",
              "Correct. Restore returns it to its folder.",
              "Restoring it from Trash takes seconds.",
              "Drive's Trash is in Drive, not on the computer.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You remove the Vendor Contact List, which Denise owns, from your Drive. What happens to Denise's copy?",
            options: ["It is deleted for everyone", "Nothing. Only the owner can delete it, so Denise and others still have it", "It moves to your Trash", "Denise loses edit access"],
            correctIndex: 1,
            explanation: "You cannot delete files you do not own. Removing one only takes it out of your Drive.",
            optionRationales: [
              "Only the owner can delete a file for everyone.",
              "Correct. The file stays for the owner and everyone else with access.",
              "It leaves your view; Denise's file is untouched.",
              "Her access does not change.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice in your own Drive with a file you do not need." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Google Doc named Delete Me and move it to Trash.",
          "Open Trash and find the message about how long files stay there. Write it down.",
          "Restore Delete Me. Check that it is back in My Drive.",
          "Open Storage on the left side. Write down how much storage you use and the name of your largest file.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit what you wrote down (the Trash message, your storage used, and your largest file) to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },
];
