import { Lesson } from "@/types/lesson";

export const module2Lessons: Lesson[] = [
  {
    slug: "files-folders-drives",
    title: "Files, Folders, and Drives Explained",
    description:
      "Understand how a computer organizes data into files, folders, and drives — and how that structure maps to the real-world filing systems you already know.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A new patient at Lakeside Medical Associates filled out paperwork that needs to be scanned and saved to the correct folder on the network drive. A billing invoice arrived by email and needs to be downloaded into the Billing folder for this month. And a staff member accidentally saved a file to the Desktop instead of the proper network location. All three tasks require you to understand how files, folders, and drives work — and this lesson gives you exactly that foundation.",
          },
        ],
      },
      {
        heading: "What Is a File?",
        blocks: [
          {
            type: "paragraph",
            text: "A file is a named container of data stored on a computer — every document, photo, spreadsheet, email attachment, and program is a file. Understanding files means understanding how they are named, what type they are, and where they live:",
          },
          {
            type: "list",
            items: [
              "Every file has a name and an extension — the extension is the three or four letters after the period in the file name, and it tells Windows (and you) what type of data the file contains. .docx is a Word document. .xlsx is an Excel spreadsheet. .pdf is a PDF document. .jpg is a photo. .mp4 is a video. At a medical office, you will work primarily with .docx, .xlsx, .pdf, and scanned image files (.pdf or .tif from the scanner).",
              "File names should be descriptive and consistent — a file named 'Document1' or 'Scan001.pdf' is nearly impossible to find later. A file named 'Rodriguez_Maria_NewPatient_Intake_2025-05.pdf' is immediately identifiable by anyone who needs it. Good file naming is a professional habit that saves significant time during records retrieval.",
              "File size matters for storage and email — small text documents (.docx files) are typically 20–100 KB. PDFs with scanned images can be 1–5 MB each. Photos are usually 2–8 MB. Large files take longer to open, save, and email. When a scanned patient form is unexpectedly large, it is usually because the scanner was set to too high a resolution — 200–300 DPI is appropriate for office documents.",
              "Hidden files and system files exist on every computer but are not visible by default — they are hidden to prevent accidental deletion. You should never need to access hidden files in a normal office workflow. If you search for a file and cannot find it, check that you are looking in the right folder rather than assuming the file is hidden.",
            ],
          },
        ],
      },
      {
        heading: "Folders and Folder Structure",
        blocks: [
          {
            type: "paragraph",
            text: "Folders are containers that hold files — and other folders (called subfolders). A well-organized folder structure is the difference between a filing system that anyone can navigate and one that only the person who created it can find their way through:",
          },
          {
            type: "list",
            items: [
              "Think of folder structure like a physical filing cabinet — the drives are the cabinet, the top-level folders are the drawers, and subfolders are the hanging folders and manila folders inside. At Lakeside Medical Associates, the network drive might be organized as: Network Drive (Z:) > Patient Files > 2025 > January > Rodriguez_Maria. Every level of that hierarchy serves a navigation purpose.",
              "Nesting too deep creates friction — a folder structure that is more than four or five levels deep becomes difficult to navigate. If you find yourself clicking through seven subfolders to reach a file, the structure has become too granular. A good rule is: if you can describe the path in one clear sentence, the structure is about right.",
              "Top-level folders should reflect major categories of work — for a medical office, top-level folders might be: Patient Files, Billing, Staff, Vendor Contracts, Policies & Procedures, and Marketing. Everything else lives inside these categories. Do not create new top-level folders without discussing with your supervisor — shared drives require organizational agreement to stay consistent.",
              "Subfolder naming conventions should match parent folders — if patient file folders are named 'LastName_FirstName,' subfolder names should follow a consistent pattern too. Inconsistency makes search and sorting harder. Agree on naming conventions with your team before creating a new folder hierarchy.",
            ],
          },
        ],
      },
      {
        heading: "Local Drives vs. Network Drives vs. Cloud",
        blocks: [
          {
            type: "paragraph",
            text: "In a modern office, files can live in three different types of locations — and knowing where they are affects whether colleagues can access them, whether they are backed up, and what happens if your computer fails:",
          },
          {
            type: "list",
            items: [
              "Local drives (C: drive) store files on your own computer — files saved here are only accessible from your workstation. This is appropriate for personal notes, draft documents you have not finished, or temporary files. It is NOT appropriate for patient records, billing files, or any file that needs to be accessed by a colleague or survive if your computer fails. At Lakeside Medical Associates, saving patient records locally is also a potential HIPAA violation.",
              "Network drives (mapped drives like Z: or P:) store files on a central server — any authorized staff member can access them from their own workstation. Files here are typically backed up automatically by IT. This is the correct location for all practice-related documents: patient files, billing records, staff communications, and templates. Always confirm with your supervisor which network drive is the correct location for a new type of file.",
              "Cloud storage (OneDrive, SharePoint) works like a network drive but is accessible from anywhere with an internet connection — it is increasingly common in medical offices that use Microsoft 365. OneDrive files sync automatically between your computer and the cloud, so you can work on a document from home or on a different workstation if needed. In an office with proper IT setup, the network drive and OneDrive may be the same location — SharePoint drives can be mapped like network drives.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Never save patient records, insurance information, or any Protected Health Information to your local C: drive, personal USB drive, personal cloud account (personal Google Drive, Dropbox, iCloud), or personal email. These locations are not backed up by IT, not monitored for security, and not covered by the clinic's HIPAA safeguards. If the practice is ever audited for a HIPAA breach, files in unauthorized locations are a serious compliance violation. When in doubt about where to save a file, ask your supervisor before saving — not after.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Design a professional folder structure for a small medical office's shared network drive. The practice has 3 providers, handles billing, employs front desk and clinical staff, and stores patient documents, scanned intake forms, and billing records. Create a folder tree with up to 4 levels deep and suggest a file naming convention for patient documents.' Compare the suggested structure to the one your office uses and identify any improvements.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A newly scanned patient intake form needs to be saved for the patient's record. Where should it be saved?",
            options: [
              "The C: drive (local storage) for fastest access",
              "The Desktop for easy access",
              "Your personal OneDrive or Google Drive for safekeeping",
              "The designated network drive folder for patient records",
            ],
            correctIndex: 3,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a practice folder structure and apply consistent file naming conventions.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your Documents folder, create a top-level folder called 'Lakeside Medical Practice Drive.' Inside it, create four subfolders: Patient Files, Billing, Staff, and Policies.",
          "Inside Patient Files, create subfolders for 2024 and 2025. Inside 2025, create a subfolder for each month from January through June.",
          "Create three practice files (blank Word documents) with professional names following this convention: LastName_FirstName_DocumentType_YYYY-MM. Save each file in the correct monthly subfolder within 2025.",
          "Open File Explorer, navigate to your Lakeside Medical Practice Drive, and take a screenshot showing the full folder tree expanded. Submit this screenshot as your deliverable.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your screenshot showing the complete folder tree. Your structure will be evaluated for correct hierarchy, logical naming, and consistent conventions. A well-organized folder structure you design today demonstrates the organizational skill that employers in medical offices value most.",
      },
    ],
  },

  {
    slug: "file-operations",
    title: "Creating, Moving, Copying, and Deleting Files",
    description:
      "Master the hands-on file operations — create, rename, copy, move, and safely delete files and folders — that office professionals perform dozens of times every day.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is end-of-month at Lakeside Medical Associates. You need to move all of January's billing files into an archive folder, copy the updated supply order template to three different department folders, rename last year's policy documents to include the year in the file name, and permanently delete 20 duplicate files that have been cluttering the network drive. Each of these tasks requires a different file operation — and knowing exactly which one to use prevents mistakes that can be costly to undo.",
          },
        ],
      },
      {
        heading: "Creating and Renaming Files and Folders",
        blocks: [
          {
            type: "paragraph",
            text: "Creating new files and folders and renaming existing ones are the most basic file operations — but doing them correctly requires attention to naming conventions and location:",
          },
          {
            type: "list",
            items: [
              "To create a new folder in File Explorer: navigate to the location where the folder should live, right-click in an empty area of the right panel, select New > Folder, type the folder name, and press Enter. Alternatively, use the New Folder button in the File Explorer ribbon at the top. Always name folders before pressing Enter — changing a folder name after files have been saved inside it does not affect the files, but links or shortcuts pointing to the old path may break.",
              "To rename a file or folder: click it once to select it, then press F2 (the rename keyboard shortcut), type the new name, and press Enter. Alternatively, right-click and choose Rename. When renaming files, be careful not to accidentally change or delete the file extension — if you rename 'Report.docx' to 'Report' (removing .docx), Windows may not know how to open it until you add the extension back.",
              "File name characters to avoid: Windows does not allow the following characters in file names: / \\ : * ? \" < > | — using any of these will produce an error. Hyphens (-), underscores (_), and periods (.) are safe. Spaces are technically allowed but can cause problems when files are accessed by programs or shared with other systems. Many offices prefer underscores instead of spaces for maximum compatibility.",
            ],
          },
        ],
      },
      {
        heading: "Copying vs. Moving Files",
        blocks: [
          {
            type: "paragraph",
            text: "Copying and moving are different operations with very different outcomes — choosing the wrong one can leave you with duplicate files in the wrong places or files missing from where they should be:",
          },
          {
            type: "list",
            items: [
              "Copying a file creates a duplicate — the original stays in its current location AND a copy appears in the new location. Use Copy when you need the file to exist in two places simultaneously: for example, copying a template to each department folder so all departments have their own editable version. Keyboard shortcut: Ctrl+C to copy, navigate to the destination, Ctrl+V to paste.",
              "Moving a file transfers the file to a new location — the original is removed from its old location and now exists only in the new location. Use Move when you want to reorganize: for example, moving last month's billing files into an archive folder. In File Explorer, you can drag a file while holding nothing to move it (within the same drive), or use Ctrl+X to cut, navigate to the destination, and Ctrl+V to paste.",
              "An important distinction: dragging between different drives (e.g., from C: to Z:) copies by default, not moves. To move across drives, hold Shift while dragging, or use Cut (Ctrl+X) and Paste (Ctrl+V). If you drag and end up with duplicates when you wanted a move, undo the action immediately with Ctrl+Z before doing anything else.",
              "To move or copy multiple files at once: select the first file, then hold Shift and click the last file to select a continuous range, or hold Ctrl and click individual files to select non-adjacent ones. Then cut or copy the selection. This is much faster than moving files one at a time when reorganizing large folders.",
            ],
          },
        ],
      },
      {
        heading: "Deleting Files Safely",
        blocks: [
          {
            type: "paragraph",
            text: "Deleting files is permanent once the Recycle Bin is emptied — and in a professional setting, accidentally deleting the wrong file can mean losing work that cannot be recreated. Here is how to delete responsibly:",
          },
          {
            type: "list",
            items: [
              "Sending files to the Recycle Bin is the default delete — select the file and press Delete (or right-click > Delete). The file is moved to the Recycle Bin and is NOT immediately deleted. You can restore it from the Recycle Bin at any time until the Recycle Bin is emptied. This is your safety net for accidental deletions.",
              "Permanently deleting files bypasses the Recycle Bin — press Shift+Delete to delete a file without sending it to the Recycle Bin first. Only use Shift+Delete when you are completely certain you want the file gone immediately. For routine file cleanup, always use the normal Delete key so the Recycle Bin provides a recovery window.",
              "Empty the Recycle Bin deliberately, not automatically — right-click the Recycle Bin icon on the Desktop and choose 'Empty Recycle Bin' when you are sure none of the files inside are needed. Never set Windows to auto-empty the Recycle Bin on a schedule if you manage important files, because an accidental deletion discovered the next day cannot be recovered from an emptied Recycle Bin without IT backup restoration.",
              "For patient records, deleting files may require authorization — at Lakeside Medical Associates, you should never permanently delete patient records without explicit supervisor authorization, even if the records appear to be duplicates. Patient records may have legal retention requirements. If you are unsure whether a file should be deleted, archive it in a 'Review for Deletion' folder and consult your supervisor.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Moving or deleting files on a shared network drive affects everyone who accesses that drive. Before reorganizing any shared folder structure, confirm the plan with your supervisor and any colleagues who regularly use those folders. Give advance notice (such as an email the day before) if you plan to move a large number of files so that colleagues are not left searching for files that have moved. Unannounced changes to shared folder structures are one of the most common sources of frustration in collaborative office environments.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I need to archive all files from January–March 2024 on a shared medical office network drive without disrupting current access. What is the safest step-by-step process, and what should I communicate to my colleagues before and after?' Use the response to plan a real archiving task you need to do at your office.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You need to make the supply order template available in three different department folders so each department can edit their own version. Which file operation should you use?",
            options: [
              "Move the file three times — once per department folder",
              "Copy the file and paste it into each of the three folders",
              "Rename the file three times",
              "Delete the original and create three new blank files",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice essential file operations using the folder structure you created in the previous lesson.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your 'Lakeside Medical Practice Drive' folder, create a new subfolder called 'Archive' inside the Billing folder. Move your three practice files from their current locations into the Archive folder. Confirm they are no longer in their original locations.",
          "Copy one of the files from Archive into both the Patient Files > 2025 > March folder and the Staff folder. Confirm the original in Archive is still there — you should now have three copies of this file across different folders.",
          "Rename all three copies of the file to follow this format: LastName_FirstName_Type_Archive_2025. Each copy should have a slightly different name (e.g., different document type).",
          "Delete one of the three copies by pressing Delete (not Shift+Delete). Open the Recycle Bin, confirm the file is there, then restore it. Now delete it again with Shift+Delete and confirm it no longer appears in the Recycle Bin.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit two screenshots — one showing the Archive folder with the moved files, and one showing the Recycle Bin confirmation that the permanently deleted file is not there. These exercises confirm you can perform all critical file operations (copy, move, rename, delete, and restore) accurately and safely.",
      },
    ],
  },

  {
    slug: "file-search-naming",
    title: "Searching Files and Professional Naming Conventions",
    description:
      "Find any file in seconds using Windows Search and File Explorer, and build the naming habits that make an office's filing system reliable for everyone.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A provider at Lakeside Medical Associates needs the consultation notes from a patient visit in September. It is now May. The file could be on the network drive, in Outlook, or on a backup. You have three minutes to find it before the provider's next appointment. Without knowing how to search effectively — and without a consistent naming convention for the file — you are guessing. With the right search skills and naming system, you find it in 30 seconds.",
          },
        ],
      },
      {
        heading: "Searching for Files in Windows",
        blocks: [
          {
            type: "paragraph",
            text: "Windows offers multiple ways to search for files — learning each one lets you choose the fastest approach based on what you know about the file:",
          },
          {
            type: "list",
            items: [
              "The File Explorer search bar (top-right corner) searches the current folder and all subfolders for files matching your search term. Type any part of the file name, and results appear in real time. This is best when you know roughly where the file is — for example, searching inside the Patient Files folder for a specific patient's last name.",
              "The Windows Search bar (Windows key + S or the taskbar search) searches your entire computer — every drive, folder, and indexed location. Type the file name or a word you remember from inside the file. Results are grouped by Apps, Documents, Email, and Web — click 'Documents' to narrow to files only. This is fastest when you have no idea where the file is saved.",
              "Search filters in File Explorer add precision — after searching, use the Search tab that appears in the Ribbon to filter by Date Modified, Kind (Document, PDF, Spreadsheet), or Size. For example, if you are searching for 'Rodriguez' and there are 50 results, filter by Date Modified > This Month to narrow it to recent files. This is an underused feature that dramatically speeds up document retrieval in large shared drives.",
              "Searching inside file content: by default, Windows searches file names only, not the text inside files. To search inside file content, go to File Explorer's Search Options and enable 'Always search file names and contents.' Note that this search is slower than name-only search. Alternatively, use the search inside programs like Outlook's built-in search to find emails containing specific patient names or topics.",
            ],
          },
        ],
      },
      {
        heading: "Professional File Naming Conventions",
        blocks: [
          {
            type: "paragraph",
            text: "A file naming convention is an agreed-upon format for naming files consistently across an organization. Good naming conventions are one of the highest-leverage habits in office work — they save hours of searching over time and enable any staff member to find any file without asking the person who created it:",
          },
          {
            type: "list",
            items: [
              "Include identifying information first — the most important identifiers should appear at the start of the file name so they are visible even when file names are truncated. For patient documents, last name first: 'Rodriguez_Maria_' makes all documents for this patient sort together alphabetically and appear in the name when the full name is cut off in a column view.",
              "Include a date in YYYY-MM-DD or YYYY-MM format at the end — dates in this format sort chronologically when files are sorted alphabetically, because year comes before month and month before day. A file named 'Rodriguez_Maria_Intake_2025-05' will automatically appear above 'Rodriguez_Maria_Intake_2025-06' in alphabetical sort, giving you natural chronological order without extra effort.",
              "Include the document type — what kind of document is it? Intake, ConsultNotes, LabResult, Invoice, Contract, Policy. Adding the document type in the middle of the name makes file lists scannable at a glance. 'Smith_James_LabResult_2025-03' is immediately recognizable without opening it.",
              "Avoid vague names — 'Final,' 'Updated,' 'New,' 'Revised,' and 'v2' are temporary labels that become meaningless over time. If a document goes through multiple revisions, use dates to distinguish versions: 'PolicyHandbook_2025-01' is clearer than 'PolicyHandbook_Final_v2.' When a final approved version replaces a draft, delete or archive the draft rather than keeping both with confusing names.",
              "Keep names reasonable in length — file names longer than 60 characters become difficult to read in file lists. Abbreviate when necessary (e.g., LMA for Lakeside Medical Associates) as long as the abbreviation is documented and consistently used by all staff.",
            ],
          },
        ],
      },
      {
        heading: "Sorting and Organizing Within Folders",
        blocks: [
          {
            type: "paragraph",
            text: "Beyond naming, how you sort and view files in File Explorer affects how quickly you can find what you need:",
          },
          {
            type: "list",
            items: [
              "Sort by Date Modified to find recently changed files — right-click any column header in File Explorer's Details view and choose 'Sort by' > 'Date Modified.' The most recently saved file appears at the top, which is useful when you know you just worked on something but cannot remember exactly what it was named.",
              "Sort by Name for alphabetical browsing — this is the most useful sort when looking for a specific patient's files in a folder organized by last name. Alphabetical sort with consistent naming means you can scan to 'R' for Rodriguez in seconds.",
              "Group files by type to distinguish documents from spreadsheets from PDFs at a glance — right-click in the folder and choose Group by > Type. All PDFs appear together, all Word documents together, making it easy to find a specific format when you know you are looking for, for example, a PDF form.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "File names on a shared network drive are visible to all staff with access to that folder. Never include sensitive clinical details in a file name — for example, 'Rodriguez_Maria_HIVPositive_2025.docx' is a HIPAA violation in the file name alone. File names should identify the document (patient, date, type) without revealing clinical content. Keep clinical details inside the document, where access is controlled, not in the file name where it is visible to anyone who can see the folder listing.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a comprehensive file naming convention guide for a small medical office's shared network drive. Include separate conventions for patient documents, billing records, staff files, and vendor contracts. Each convention should be clear enough that any new employee could follow it on their first day.' Bring the guide to your supervisor and discuss whether it matches your current office convention or could be adopted as an improvement.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which file name follows professional naming conventions for a patient intake form?",
            options: [
              "intake final.docx",
              "Rodriguez_Maria_IntakeForm_2025-05.pdf",
              "New Patient - Maria - HIVTest - 2025.pdf",
              "ScanDocument042.pdf",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Apply professional naming conventions and practice file search techniques.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your Lakeside Medical Practice Drive folder, rename all existing files to follow this convention: LastName_FirstName_DocumentType_YYYY-MM. Each file should have a unique, meaningful name. Screenshot the renamed files in File Explorer's Details view.",
          "Create 5 new files (blank documents or PDFs — you can right-click > New > Text Document and rename to .txt) with correctly formatted names across different subfolders.",
          "Use the File Explorer search bar to search for one patient's last name across your entire Lakeside Medical Practice Drive folder. Screenshot the results showing files from multiple subfolders appearing in one search.",
          "Sort the results by Date Modified, then by Name. Screenshot both sort orders. Write a one-sentence note on which sort would be more useful for finding a specific patient's most recent document.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your three screenshots (renamed files, search results, and both sort orders) along with your one-sentence note to your instructor. This exercise confirms that you can apply professional naming conventions and find any file quickly — two skills that every medical office employer values highly.",
      },
    ],
  },

  {
    slug: "file-management-best-practices",
    title: "File Management Best Practices for the Office",
    description:
      "Bring together file organization, naming, search, and version control into a complete professional file management system for a real office environment.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates is expanding and adding two new front desk staff. Your supervisor asks you to document the office's file management system so the new hires can follow it from day one. You need to write a simple guide covering: where to save files, how to name them, when to archive old files, and how to avoid creating duplicate or orphaned files. This lesson gives you everything you need to build that system — and follow it yourself.",
          },
        ],
      },
      {
        heading: "Version Control: Managing Document Revisions",
        blocks: [
          {
            type: "paragraph",
            text: "Version control is the practice of managing changes to documents over time so you always know which version is current, what changed between versions, and who made changes. Without version control, offices end up with folders full of files named 'Final,' 'Final2,' 'REAL Final,' and 'ActualFinal_USETHIS' — a situation that causes real errors:",
          },
          {
            type: "list",
            items: [
              "Use dates, not version numbers, to distinguish drafts — 'StaffPolicy_2025-04-Draft.docx' and 'StaffPolicy_2025-05-Approved.docx' are immediately understandable in any order. 'StaffPolicy_v3_Final.docx' requires context to interpret and becomes meaningless when a v4 exists.",
              "When a document is finalized and approved, delete or move drafts to an Archive folder — keeping both the draft and the final version in the same working folder creates confusion. Move drafts to a 'Drafts' or 'Archive' subfolder so the working folder contains only the current, active version.",
              "Track Changes in Word (Review > Track Changes) is the correct tool for collaborative editing — it records every change made to a document, who made it, and when. Use Track Changes when multiple people need to edit the same document rather than creating a new copy for each reviewer. When the final version is approved, Accept All Changes (Review > Accept > Accept All Changes in Document) to create a clean final copy.",
              "OneDrive and SharePoint maintain automatic version history — if your files are saved in Microsoft 365 cloud storage, you can right-click any file and choose 'Version History' to see and restore any previous version from the past 30+ days. This is a powerful safety net that eliminates the need for manual 'save as v2' copies when cloud storage is properly configured.",
            ],
          },
        ],
      },
      {
        heading: "Archiving and Housekeeping",
        blocks: [
          {
            type: "paragraph",
            text: "Archiving means moving inactive files out of working folders into a designated archive location — it keeps working directories uncluttered without deleting files that may still be needed later. Good housekeeping is a monthly habit:",
          },
          {
            type: "list",
            items: [
              "Archive on a schedule — at the end of each month or quarter, move all closed or completed files from the active working folders into an Archive folder organized by year and month. This keeps working folders showing only current, active documents and reduces search time dramatically.",
              "Do not archive and delete at the same time — when moving files to an archive, leave them in the archive for at least 90 days before considering deletion, in case they are needed for a follow-up task, audit, or records request. Patient records have specific legal retention periods — in most states, medical records must be retained for at least 7–10 years. Never delete patient records without explicit authorization from your supervisor and confirmation of legal retention requirements.",
              "Identify and remove duplicates regularly — search for files with the same or very similar names in the same folder. If you find duplicates, confirm which is the latest version before deleting the others. A monthly 10-minute housekeeping session prevents the accumulation of hundreds of duplicate files that slow down search and create confusion.",
              "Empty deleted items regularly — the Recycle Bin (on the desktop) and Deleted Items folder (in Outlook) accumulate deleted content until manually emptied. Empty the Recycle Bin monthly after confirming you do not need any of its contents. In Outlook, configure Deleted Items to empty automatically when Outlook closes: File > Options > Advanced > 'Empty Deleted Items folders when exiting Outlook.'",
            ],
          },
        ],
      },
      {
        heading: "Backup Awareness",
        blocks: [
          {
            type: "paragraph",
            text: "Understanding how your organization's backup system works — and what it does not cover — helps you avoid losing work and ensures you make safe decisions about where to save files:",
          },
          {
            type: "list",
            items: [
              "Network drives are typically backed up by IT on a daily or nightly schedule — files saved to the network drive before midnight are included in that day's backup. Files you save to the local C: drive are NOT backed up unless IT has specifically configured backup for local drives. This is the most important backup concept: local storage is not backed up.",
              "Cloud storage in Microsoft 365 (OneDrive/SharePoint) includes version history as a form of backup — but it is not a substitute for a formal IT-managed backup. Ransomware attacks can encrypt cloud-synced files too, which is why enterprise Microsoft 365 plans include additional backup and recovery features. You do not need to manage these, but you should know they exist.",
              "Ask your supervisor or IT: 'What is our backup schedule and retention period, and what drives or locations are included?' The answer determines how you should behave in a storage emergency — how far back IT can restore, and what locations are safe to use for important files.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Proper file management at a medical office is not just an organizational preference — it is a compliance requirement. HIPAA requires that patient records be stored securely, accessible to authorized staff, and retained for a minimum period defined by state law. Poor file management that results in lost patient records, unauthorized access, or accidental deletion is a potential compliance violation with serious legal consequences. Treat every patient file you manage with the same care you would expect your own medical records to receive.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Write a one-page File Management Guide for new front desk staff at a small medical office. It should cover: where to save files (network drive vs. local), our file naming convention (LastName_FirstName_DocumentType_YYYY-MM), when to archive old files, how to handle duplicates, and a reminder about not saving patient files to personal storage. Format it as a simple numbered list that can be printed and kept at the desk.' Review and customize the output to match your actual office's systems.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "At end of month, you find three copies of a policy document in the working folder: 'StaffPolicy_Final.docx', 'StaffPolicy_v2.docx', and 'StaffPolicy_2025-05-Approved.docx'. What should you do?",
            options: [
              "Keep all three in case each version is needed later",
              "Delete all three and ask your supervisor to resend the document",
              "Confirm which is the official current version, move the others to an Archive subfolder, and keep only the current version in the working folder",
              "Rename all three to 'Final' so they are consistent",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Create a simple, practical File Management Quick Reference guide that could be used by a new hire on their first day at Lakeside Medical Associates.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In a new Word document, write a File Management Guide for Lakeside Medical Associates. Include five sections: Where to Save Files, File Naming Convention, Archiving Policy (when and how to archive), Duplicate File Handling, and What to Never Do (local storage, personal cloud, PHI in file names).",
          "Format the guide using Heading styles (Heading 1 for each section title) and bulleted lists for each section's content. The guide should be printable on one page (use narrow margins if needed).",
          "Save the document as 'LMA_FileManagementGuide_2025-05.docx' in your practice folder, then export it as a PDF.",
          "Ask a classmate or family member to read your guide and tell you whether they could follow it on their first day. Make any revisions based on their feedback and save the updated version with the same name.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit both the .docx and PDF versions of your File Management Guide to your instructor. It will be evaluated on whether a new employee could follow it without additional explanation — clear instructions, complete coverage of all five sections, and professional formatting. This capstone exercise demonstrates that you have not only learned file management but can teach it.",
      },
    ],
  },
];
