import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/onedrive/module-1";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const onedriveModule1Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "what-is-onedrive",
    title: "What OneDrive Is and When to Use It",
    description:
      "Learn what cloud storage is, what OneDrive does for you at work, how it relates to SharePoint and Teams, and where patient information is and is not allowed to go.",
    objectives: [
      "Explain cloud storage and what OneDrive adds: access anywhere, sharing, version history, the Recycle bin, and syncing",
      "Tell the difference between your OneDrive and a shared team library in SharePoint or Teams",
      "Describe how much storage free, Microsoft 365, and work accounts include",
      "Apply the rule that patient information stays in approved work locations and is never shared with an Anyone link",
    ],
    duration: "15 min",
    slides: slides("what-is-onedrive", [
      "What OneDrive is: Microsoft's cloud storage for your files",
      "Five things OneDrive does for you at the front desk",
      "OneDrive, SharePoint, and Teams: whose files live where",
      "How much storage each kind of account includes",
      "The patient information rule: approved places only, never an Anyone link",
      "Quick check: OneDrive or a team library?",
    ]),
    sections: [
      {
        heading: "Your files, wherever you sign in",
        blocks: [
          {
            type: "scenario",
            role: "You are a front office assistant at Lakeside Medical Associates.",
            text: "Last month the computer at the second check-in window stopped starting. Everything saved on its desktop, including the only copy of the new-patient phone script, was gone. Lakeside has now moved everyone to Microsoft 365, and your office manager, Maria Santos, has a new rule: work files are saved to OneDrive or the shared team library, not to one computer's desktop or a USB drive.",
            task: "Understand what OneDrive is, what it protects you from, and which of your files belong in it.",
          },
          {
            type: "paragraph",
            text: "Cloud storage keeps your files on servers that you reach over the internet instead of only on the hard drive inside one computer. OneDrive is Microsoft's cloud storage. You sign in with an account, and your files are there on any computer, phone, or tablet where you sign in with that same account. If a computer breaks, is replaced, or is stolen, the files are still in OneDrive.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Cloud storage", definition: "Saving files on internet servers so you can reach them from any device you sign in on." },
              { term: "OneDrive", definition: "Microsoft's cloud storage. Each person has their own OneDrive." },
              { term: "Work or school account", definition: "The account your employer or school gives you (for example, amorgan@lakesidemedical.example). The organization manages it." },
              { term: "Microsoft account", definition: "A personal account you create yourself (often an Outlook.com address). It comes with a personal OneDrive." },
              { term: "Sync", definition: "Keeping the copy on your PC and the copy in OneDrive the same, automatically." },
              { term: "SharePoint", definition: "Microsoft's shared storage for teams and whole organizations. Files in a Teams channel are stored in SharePoint." },
            ],
          },
        ],
      },
      {
        heading: "What OneDrive does for you",
        blocks: [
          {
            type: "table",
            caption: "OneDrive features and what they mean at the front desk",
            columns: ["Feature", "What it does", "Front desk example"],
            rows: [
              ["Access anywhere", "Your files open on any device where you sign in", "Open the phone script at any check-in window, not only the one where you wrote it"],
              ["Share with a link", "People open the one real file instead of an email copy", "Maria edits the staff schedule you started, and everyone sees the same version"],
              ["Version history", "Earlier versions of a file are kept so you can go back", "Someone typed over the November schedule; restore yesterday's version"],
              ["Recycle bin", "Deleted files can be restored for a period of time", "You deleted the wrong flyer; restore it in seconds"],
              ["Sync with your PC", "Your OneDrive appears as a folder in File Explorer", "Save from Word straight into OneDrive without a browser"],
            ],
          },
          {
            type: "paragraph",
            text: "All of these work because there is one copy of the file, in one place, that everyone with permission opens. That is the habit OneDrive asks you to build: save to OneDrive, then share the file, instead of saving to the desktop and emailing copies around.",
          },
        ],
      },
      {
        heading: "OneDrive, SharePoint, and Teams at a glance",
        blocks: [
          {
            type: "paragraph",
            text: "Microsoft 365 has two main places for files. OneDrive is yours: files you are working on, drafts, and files that belong to your job. A SharePoint site or a Teams team is shared: the front desk team's procedures, the forms everyone uses, and files the whole team owns. When you share a file in a Teams chat, Teams stores it in your OneDrive, in a folder named Microsoft Teams Chat Files. When you add a file to a Teams channel, it is stored in that team's SharePoint site.",
          },
          {
            type: "table",
            caption: "Where a file usually belongs",
            columns: ["Put it in", "When", "Who owns it"],
            rows: [
              ["Your OneDrive", "Drafts, your own work files, files you share with a few people", "You"],
              ["A SharePoint site or Teams channel", "Files the whole team uses and keeps, even if you leave", "The team"],
              ["A Teams chat", "A quick file for the people in that chat (it is saved in your OneDrive)", "You"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "OneDrive or the team library?",
            prompt: "Drag each file to where it belongs at Lakeside.",
            buckets: [
              { id: "od", label: "Your OneDrive" },
              { id: "team", label: "Shared team library (SharePoint or Teams)" },
            ],
            items: [
              { id: "a", text: "Your first draft of a new reminder-call script", bucket: "od" },
              { id: "b", text: "The front desk procedures binder everyone follows", bucket: "team" },
              { id: "c", text: "Your notes from training on the phone system", bucket: "od" },
              { id: "d", text: "The approved New Patient Intake Form the whole office prints", bucket: "team" },
              { id: "e", text: "A spreadsheet you are building before you share it with your manager", bucket: "od" },
              { id: "f", text: "The holiday coverage schedule the whole team edits", bucket: "team" },
            ],
            explanation: "Ask who owns the file. If it is your work in progress, it belongs in your OneDrive. If the whole team uses it and it must stay when people change jobs, it belongs in the team's library.",
          },
        ],
      },
      {
        heading: "How much storage you have",
        blocks: [
          {
            type: "paragraph",
            text: "Storage depends on the account. A free Microsoft account includes 5 GB. Microsoft 365 Basic includes 100 GB, Microsoft 365 Personal includes 1 TB, and the Family and Premium plans share storage among up to six people. Work and school accounts get the storage their organization sets; for most Microsoft 365 business plans the default is 1 TB per person. You can see how much you have used at the bottom of the left pane in OneDrive on the web.",
          },
          {
            type: "callout",
            variant: "info",
            text: "One file can be as large as 250 GB in OneDrive. Plans and storage amounts change from time to time, so check Microsoft's OneDrive plans page before you buy anything for yourself.",
          },
        ],
      },
      {
        heading: "Patient information stays in approved places",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Lakeside's rule (and the rule at most medical offices): patient information (PHI) goes only in locations your organization approved, such as your work OneDrive or the practice's SharePoint library, and it is shared only with the specific people who need it. Never put patient information in a personal OneDrive, and never share it with an Anyone link. An Anyone link works for whoever gets it, including people outside the practice.",
          },
          {
            type: "paragraph",
            text: "OneDrive makes sharing easy, which is exactly why the rule matters. In Module 3 you will practice choosing the right kind of link. For now, remember the order of questions: Is this patient information? Is this the approved place for it? Who exactly needs it?",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "The computer at a check-in window fails. Which files can you still open from another computer?",
            options: [
              "Files saved on that computer's desktop",
              "Files saved in your OneDrive",
              "Files saved on a USB drive left in that computer",
              "None of them until IT repairs the computer",
            ],
            correctIndex: 1,
            explanation: "OneDrive keeps your files in the cloud, so you sign in on any computer and they are there. Files that were only on the broken computer are only as safe as that computer.",
            optionRationales: [
              "The desktop of a computer is stored on that computer's drive. If the computer fails, so does that copy.",
              "Correct. Files in OneDrive are stored in the cloud and open on any device where you sign in.",
              "A USB drive is one physical copy. It can be lost, damaged, or left behind.",
              "You don't need to wait for the repair. Files in OneDrive are reachable from any computer you sign in on.",
            ],
          },
          {
            type: "knowledge-check",
            question: "A coworker suggests sharing a patient's referral packet with an Anyone link because it is faster. What is the right response?",
            options: [
              "Agree, as long as the link has an expiration date",
              "Agree, because only the person you send it to will know the link",
              "Decline: patient information is shared only with the specific people who need it, never with an Anyone link",
              "Decline, and email the packet as an attachment to everyone on the care team instead",
            ],
            correctIndex: 2,
            explanation: "An Anyone link works for whoever has it, so it can be forwarded, guessed from a shared screen, or opened by the wrong person. Patient information is shared only with named people, from an approved location.",
            optionRationales: [
              "An expiration date limits how long the link works, but anyone who gets it before then can open the file.",
              "Links get forwarded and pasted. An Anyone link does not check who is opening it.",
              "Correct. Share PHI only with the specific people who need it, from an approved work location.",
              "Emailing copies to everyone spreads extra copies of PHI. Share the one file with the named people who need it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Look at your own OneDrive. BEOC classroom computers let you sign in to OneDrive with your school account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Go to onedrive.com and sign in with your school account (or open microsoft365.com, select the app launcher, then OneDrive).",
          "Find how much storage you have used and how much you have. It is at the bottom of the left pane.",
          "Write down three files or folders in your My files. For each, decide: does it belong in your OneDrive or in a shared team library? Write one sentence explaining why.",
          "Sign out when you are done (select your picture or initials at the top right, then Sign out).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your storage numbers and your three sentences to your instructor or course folder. If you cannot sign in, complete the practice simulation in this lesson and submit its results page (use Print or save results on the finish card).",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "the-onedrive-web-layout",
    title: "Signing In and Finding Your Way Around",
    description:
      "Sign in to OneDrive on the web and learn the layout: the left pane, the Create or upload button, the command bar, views, search, and the details pane.",
    objectives: [
      "Sign in to OneDrive on the web and sign out on a shared computer",
      "Name what each part of the left pane shows: Home, My files, Shared, Favorites, Recycle bin, People, Meetings, and Media",
      "Use the command bar, the details pane, and the list and tiles views",
      "Search for a file by name",
    ],
    duration: "15 min",
    slides: slides("the-onedrive-web-layout", [
      "Two ways to sign in: onedrive.com or the Microsoft 365 app launcher",
      "The OneDrive layout: header, left pane, command bar, file list, details pane",
      "The left pane: Home, My files, Shared, Favorites, Recycle bin",
      "Browse files by People, Meetings, and Media",
      "Select a file and the command bar changes",
      "Shared computer? Always sign out",
    ]),
    sections: [
      {
        heading: "Signing in",
        blocks: [
          {
            type: "scenario",
            role: "You are covering the check-in window at Lakeside Medical Associates.",
            text: "A patient is waiting while you look for the Office Phone List. You know it is in OneDrive somewhere, but you are on a computer you have never used, and every click feels like a guess.",
            task: "Learn the OneDrive layout well enough to find any file in a few seconds, on any computer.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Open a browser and go to onedrive.com. Sign in with your work or school account (at Lakeside, your lakesidemedical.example address).",
              "Or go to microsoft365.com, sign in, select the app launcher (the grid of dots at the top left), and select OneDrive.",
              "Your OneDrive opens. A work or school OneDrive shows your name at the top of the left pane.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "On a shared or public computer, always sign out when you finish: select your picture or initials at the top right, then Sign out, and close the browser. Closing only the tab can leave you signed in for the next person.",
          },
        ],
      },
      {
        heading: "The parts of the screen",
        blocks: [
          {
            type: "table",
            caption: "OneDrive on the web, from top to bottom and left to right",
            columns: ["Part", "What it is for"],
            rows: [
              ["Header", "The app launcher, the search box, Settings (gear), Help (?), and your account picture"],
              ["Create or upload", "Makes a new folder or Office file, or uploads files and folders. (A personal account shows Add new.)"],
              ["Left pane", "Home, My files, Shared, Favorites, Recycle bin, then Browse files by People, Meetings, and Media, and Quick access"],
              ["Command bar", "Commands for whatever you select: Share, Copy link, Download, Delete, Move to, Copy to, Rename, and More actions (…)"],
              ["File list", "Your files and folders. Switch between list and tiles views at the top right"],
              ["Details pane", "Select the information (i) button to see who has access, the file's path, size, and version"],
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Microsoft is moving the Create or upload button from the top of the left pane to the right side of the page, next to the command bar. If you don't see it on the left, look at the top right of the file list. The choices in it are the same.",
          },
        ],
      },
      {
        heading: "The left pane, view by view",
        blocks: [
          {
            type: "paragraph",
            text: "Home lists files you opened or edited recently, with filters for Word, Excel, PowerPoint, and PDF. My files is your own OneDrive: your folders and files. Shared shows files others shared with you, and files you shared. Favorites holds files you marked with Add to favorites. Recycle bin holds files you deleted, so you can restore them. Under Browse files by, People groups files by the person you shared them with, Meetings shows files shared in your Teams meetings, and Media gathers your photos and videos. Quick access lists shared team libraries you use often.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match each view to what it shows",
            prompt: "Drag each description onto the view it belongs to.",
            items: [
              { id: "home", text: "Home", match: "Files you opened or edited recently" },
              { id: "myfiles", text: "My files", match: "Your own folders and files" },
              { id: "shared", text: "Shared", match: "Files others shared with you, and files you shared" },
              { id: "bin", text: "Recycle bin", match: "Files you deleted, ready to restore" },
              { id: "people", text: "People", match: "Files grouped by the person you share them with" },
              { id: "meetings", text: "Meetings", match: "Files shared in your Teams meetings" },
            ],
            explanation: "When you can't find a file, think about how you last touched it: you opened it (Home), you own it (My files), someone sent it (Shared), it came up in a meeting (Meetings).",
          },
        ],
      },
      {
        heading: "Selecting, the command bar, and the details pane",
        blocks: [
          {
            type: "paragraph",
            text: "Click a file's row to select it. A round check box appears at the left of the row; select more check boxes (or hold Ctrl and click) to select several files. The command bar above the list changes to show what you can do with what is selected. Right-clicking a file, or selecting More actions (…) next to its name, shows the same commands in a menu. Select the file's name to open it.",
          },
          {
            type: "worked-example",
            title: "Finding the phone list in a hurry",
            task: "Open the Office Phone List and check who last changed it, on a computer you have never used.",
            steps: [
              { move: "Type phone in the Search box at the top and press Enter.", why: "Search looks through your OneDrive and the files shared with you, so you don't have to remember which folder it is in." },
              { move: "Select the row for Office Phone List, not the name.", why: "Selecting a row picks the file without opening it, so the command bar and details pane show its information." },
              { move: "Select the information (i) button at the top right.", why: "The details pane shows who modified the file and when, and who has access, which tells you whether this copy is current." },
              { move: "Select the file name to open it.", why: "Now you know it is the right file, so opening it is the last step, not a guess." },
            ],
            result: "The current phone list is open, and you know who updated it last.",
            takeaway: "Search first, select to check, then open. It is faster than clicking through folders.",
          },
          {
            type: "tip",
            text: "Switch to tiles view (the button at the top right of the list) when you are looking for photos or scanned documents. Switch back to list view to see dates, sizes, and sharing.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Your manager shared a training document with you yesterday, but it isn't in My files. Where should you look first?",
            options: ["Recycle bin", "Shared", "Media", "Favorites"],
            correctIndex: 1,
            explanation: "Files other people share with you stay in their OneDrive, so they show up under Shared, not in your My files.",
            optionRationales: [
              "The Recycle bin holds files you deleted. A file someone shared with you isn't there.",
              "Correct. Shared lists files others shared with you.",
              "Media shows your photos and videos, not documents others shared.",
              "Favorites shows only files you marked as favorites yourself.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You finished checking the schedule on the computer in the patient education room. What should you do before you walk away?",
            options: [
              "Close the OneDrive tab",
              "Minimize the browser",
              "Select your picture or initials, select Sign out, then close the browser",
              "Nothing; OneDrive signs you out automatically",
            ],
            correctIndex: 2,
            explanation: "Closing a tab can leave you signed in. Sign out, then close the browser, so the next person can't open your OneDrive.",
            optionRationales: [
              "Closing the tab doesn't sign you out; reopening OneDrive could open your files.",
              "Minimizing leaves everything open for the next person.",
              "Correct. Sign out, then close the browser.",
              "Don't count on that. Sign out yourself on any shared computer.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice the layout in your real OneDrive (BEOC classroom computers allow OneDrive sign-in)." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in at onedrive.com with your school account.",
          "Open each view in the left pane: Home, My files, Shared, Favorites, and Recycle bin. In one sentence each, write what you found (it is fine if a view is empty).",
          "Use Search to find any file by typing part of its name. Select it and open the details pane with the information (i) button. Write down its path and when it was last modified.",
          "Switch between list and tiles view and write which one you prefer for documents, and why.",
          "Sign out and close the browser.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your notes to your instructor or course folder. If you cannot sign in, complete this lesson's practice simulation and submit its results page instead.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "work-and-personal-accounts",
    title: "Work or School Accounts and Personal Accounts",
    description:
      "Know which OneDrive you are in, what differs between a work or school account and a personal Microsoft account, and why work files never go in personal storage.",
    objectives: [
      "Tell a work or school OneDrive from a personal OneDrive by its sign-in, address, and labels",
      "List features that differ: Personal Vault, Photos, Recycle bin retention, and organization sharing rules",
      "Keep work files, and especially patient information, out of personal storage",
      "Remove a work file that ended up in a personal OneDrive",
    ],
    duration: "12 min",
    slides: slides("work-and-personal-accounts", [
      "Two kinds of OneDrive: work or school, and personal",
      "How to tell which one you are in",
      "What is different: Personal Vault, Photos, the Recycle bin, sharing rules",
      "Work files stay in the work account",
      "Quick check: which account?",
    ]),
    sections: [
      {
        heading: "Two kinds of OneDrive",
        blocks: [
          {
            type: "scenario",
            role: "You use OneDrive at Lakeside and at home.",
            text: "At home you open your personal OneDrive to print your child's school form and notice a file you don't remember saving there: Lakeside Staff Schedule - copy.xlsx. Months ago you saved it there to look at on the weekend. It lists every staff member's phone number and shifts, and it doesn't belong in your personal account.",
            task: "Learn to tell the two OneDrives apart and keep work files where they belong.",
          },
          {
            type: "paragraph",
            text: "A work or school account is created and managed by your organization. Its OneDrive belongs to the organization's Microsoft 365, follows its security and sharing rules, and your IT team can help recover it. A personal Microsoft account is one you created yourself, often with an Outlook.com address. Its OneDrive is yours, with your own storage plan, and your employer has no control over it.",
          },
          {
            type: "table",
            caption: "How to tell which OneDrive you are in",
            columns: ["Clue", "Work or school", "Personal"],
            rows: [
              ["The account you signed in with", "Your work address (amorgan@lakesidemedical.example)", "Your own address (for example, an Outlook.com address)"],
              ["The web address", "Usually ends in -my.sharepoint.com", "onedrive.live.com"],
              ["The button at the top of the left pane", "Create or upload", "Add new"],
              ["File Explorer folder name", "OneDrive - Lakeside Medical Associates", "OneDrive - Personal"],
            ],
          },
        ],
      },
      {
        heading: "What is different",
        blocks: [
          {
            type: "table",
            caption: "Features that differ by account",
            columns: ["Feature", "Work or school", "Personal"],
            rows: [
              ["Recycle bin", "Deleted items are kept 93 days, unless your organization changed this", "Deleted items are kept 30 days"],
              ["Personal Vault", "Not available", "A protected folder that needs identity verification to open"],
              ["Photos", "Photos appear under Media", "A Photos view for your camera pictures"],
              ["Sharing rules", "Your organization decides which link types you can use", "You decide (some options need a Microsoft 365 subscription)"],
              ["Can't download permission", "Available", "Not available"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Because your organization manages your work account, your work OneDrive can change when your job changes. When people leave an organization, their work account is usually closed. That is another reason team files belong in a team library, not in one person's OneDrive.",
          },
        ],
      },
      {
        heading: "Work files stay in the work account",
        blocks: [
          {
            type: "paragraph",
            text: "Copying work files into a personal account feels harmless, but it moves the file outside every protection your organization set up: its security rules, its retention, its ability to remove access when you leave. For a medical office, a work file in a personal account can also be a privacy problem. If you need a work file at home, open it in your work OneDrive by signing in with your work account (if your organization allows it), and don't save a copy anywhere else.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Which account?",
            prompt: "Sort each file into the OneDrive where it belongs.",
            buckets: [
              { id: "work", label: "Work OneDrive" },
              { id: "personal", label: "Personal OneDrive" },
            ],
            items: [
              { id: "a", text: "Lakeside staff schedule with phone numbers", bucket: "work" },
              { id: "b", text: "Your own resume", bucket: "personal" },
              { id: "c", text: "Insurance verification checklist for the front desk", bucket: "work" },
              { id: "d", text: "Photos from your family's vacation", bucket: "personal" },
              { id: "e", text: "A patient's scanned insurance card", bucket: "work" },
              { id: "f", text: "Your car insurance card", bucket: "personal" },
            ],
            explanation: "Anything about the practice, its staff, or its patients stays in the work account. Your own documents and photos go in your personal account.",
          },
          {
            type: "worked-example",
            title: "Cleaning a work file out of your personal OneDrive",
            task: "Remove Lakeside Staff Schedule - copy.xlsx from your personal OneDrive.",
            steps: [
              { move: "Check that the original is in your work OneDrive or the team library.", why: "You are deleting a copy, not the only copy. Confirm the real file is safe first." },
              { move: "In your personal OneDrive, select the file and select Delete, then confirm.", why: "Delete moves it to the personal Recycle bin, where it would still sit for 30 days." },
              { move: "Open the Recycle bin, select the file, and select Delete again to delete it permanently.", why: "The goal is no copy in personal storage. Permanently deleting it from the Recycle bin finishes the job." },
              { move: "Tell your supervisor if the file had patient information in it.", why: "Medical offices have a process for possible privacy problems. Reporting it is part of fixing it." },
            ],
            result: "The work file exists only in the work account.",
            takeaway: "One work file, in one work location. Copies in personal storage are risks, not backups.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In File Explorer you see two OneDrive folders: OneDrive - Personal and OneDrive - Lakeside Medical Associates. Where should you save the new appointment reminder template you made for work?",
            options: ["OneDrive - Personal", "OneDrive - Lakeside Medical Associates", "Either one; they sync to the same place", "The Desktop, so it is easy to find"],
            correctIndex: 1,
            explanation: "The folder named for your organization is your work OneDrive. Work files go there.",
            optionRationales: [
              "That is your personal account. Work files don't belong there.",
              "Correct. The organization's name marks your work OneDrive.",
              "They are two separate accounts that sync to two separate places.",
              "The desktop isn't backed up to the cloud unless your organization set that up. Save work files in the work OneDrive.",
            ],
          },
          {
            type: "knowledge-check",
            question: "How long does a personal OneDrive keep a file you delete before it is removed for good?",
            options: ["7 days", "30 days", "93 days", "Forever"],
            correctIndex: 1,
            explanation: "Personal accounts keep deleted files in the Recycle bin for 30 days. Work or school accounts keep them 93 days unless the organization changed that.",
            optionRationales: [
              "It is longer than a week.",
              "Correct. Personal OneDrive keeps deleted items for 30 days.",
              "93 days is the usual setting for work or school accounts.",
              "Deleted items are removed after the retention period.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Compare the two kinds of accounts." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in to OneDrive with your school account. Write down the web address in the browser's address bar and the name of the button at the top of the left pane.",
          "If you have a personal Microsoft account, sign in to it at home or on your own device (not on a shared computer) and write down the same two things. If you don't have one, use the table in this lesson.",
          "Write three sentences: one file type that belongs only in the work account, one that belongs only in a personal account, and what you would do if you found a work file in a personal account.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your notes and three sentences to your instructor or course folder.",
      },
    ],
  },
];
