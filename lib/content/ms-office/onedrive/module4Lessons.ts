import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/onedrive/module-4";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const onedriveModule4Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "version-history",
    title: "Restoring an Earlier Version",
    description:
      "Use version history to see earlier versions of a file, check what changed, and restore the right one, from OneDrive on the web or from inside Word.",
    objectives: [
      "Open version history from OneDrive on the web and from a Word document",
      "Open an earlier version to check it before restoring",
      "Restore an earlier version and explain what happens to the current one",
      "Explain how long versions are kept in personal and work or school accounts",
    ],
    duration: "15 min",
    slides: slides("version-history", [
      "Version history: every save is a step you can go back to",
      "Three ways to open version history",
      "Check the version before you restore it",
      "Restoring doesn't erase anything",
      "How long versions are kept",
    ]),
    sections: [
      {
        heading: "Someone typed over the schedule",
        blocks: [
          {
            type: "scenario",
            role: "You keep the staff schedule up to date at Lakeside.",
            text: "At 9:05 this morning, Kevin pasted October's shifts over the November staff schedule by mistake and saved. Half the office is looking at the wrong shifts. Nobody made a backup copy, and nobody needs to: OneDrive kept the earlier versions.",
            task: "Find yesterday's correct version, check it, and restore it, without losing anything.",
          },
          {
            type: "paragraph",
            text: "Version history is a list of earlier versions of a file that OneDrive keeps as people change it. Each version shows when it was saved and who saved it. You can open an earlier version to read it, and restore it to make it the current version again.",
          },
          {
            type: "table",
            caption: "Three ways to open version history",
            columns: ["From", "Steps"],
            rows: [
              ["OneDrive on the web", "Right-click the file (or select it and select More actions …) › Version history"],
              ["File Explorer (with the sync app)", "Right-click the file in your OneDrive folder › Version history"],
              ["Word, Excel, or PowerPoint (desktop)", "Select the file name in the title bar › Version History, or File › Info › Version History"],
            ],
          },
        ],
      },
      {
        heading: "Check, then restore",
        blocks: [
          {
            type: "worked-example",
            title: "Restoring yesterday's staff schedule",
            task: "Put back the version of Staff Schedule - November.xlsx that Maria saved yesterday afternoon.",
            steps: [
              { move: "Right-click Staff Schedule - November.xlsx and select Version history.", why: "The Version history panel lists every saved version with the date, time, and person." },
              { move: "Find the version Maria saved yesterday, before Kevin's change this morning.", why: "The Modified and Modified by columns tell you which version is the last good one." },
              { move: "Open that version and read it before you restore it.", why: "Opening it first lets you confirm it really has the November shifts. Restoring the wrong version just creates a new problem." },
              { move: "Select the ellipses (…) next to that version and select Restore.", why: "Restore makes that version the current version again. Kevin's version stays in the list, so nothing is lost." },
              { move: "Tell the team the schedule is fixed.", why: "People who opened the wrong shifts need to know to look again." },
            ],
            result: "The current version is November's schedule again, and Kevin's version is still in the history if anyone needs it.",
            takeaway: "Open it, check it, then restore. Restoring never erases the version you are replacing.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the restore steps in order",
            prompt: "Drag the steps for restoring an earlier version into order.",
            items: [
              { id: "1", text: "Right-click the file and select Version history" },
              { id: "2", text: "Find the last good version by date and person" },
              { id: "3", text: "Open the version to check it" },
              { id: "4", text: "Select the ellipses (…) next to it › Restore" },
              { id: "5", text: "Let the people who use the file know" },
            ],
          },
        ],
      },
      {
        heading: "How long versions are kept",
        blocks: [
          {
            type: "paragraph",
            text: "In a personal OneDrive, Microsoft keeps file version history for 30 days. In a work or school OneDrive, your organization's settings decide how many earlier versions are kept, and administrators can turn versioning off. Version history only helps with files that are in OneDrive, which is one more reason to save work files there instead of on the desktop.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Version history fixes changes inside one file. If many files were changed at once, for example by ransomware, Restore your OneDrive (later in this module) can roll back your whole OneDrive.",
          },
          {
            type: "image",
            src: `${IMG}/version-history/infographic.png`,
            alt: "Quick reference: version history for one changed file, the Recycle bin for deleted files, and Restore your OneDrive for many changed files",
            caption: "Quick reference: recover almost anything.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You restore version 4.0 of a file whose current version is 5.0. What happens to version 5.0?",
            options: ["It is deleted", "It stays in version history; the restored copy becomes the new current version", "It moves to the Recycle bin", "It is renamed with the word old"],
            correctIndex: 1,
            explanation: "Restoring makes a copy of the older version the new current version. The version you replaced stays in the history.",
            optionRationales: [
              "Restoring doesn't delete versions.",
              "Correct.",
              "Versions don't go to the Recycle bin; files do.",
              "OneDrive doesn't rename anything when you restore.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Why open an earlier version before restoring it?",
            options: ["It is required before Restore is available", "To confirm it is the right version, so you don't replace one mistake with another", "To make a backup copy", "To notify the other editors"],
            correctIndex: 1,
            explanation: "Checking first makes sure you restore the version you actually want.",
            optionRationales: [
              "Restore is available without opening the version first; checking is just smart.",
              "Correct.",
              "Opening a version doesn't make a copy.",
              "Opening a version doesn't notify anyone.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use version history on a practice file in your real OneDrive." },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Practice Notes (from Module 2) in Word for the web. Type a sentence, wait a few seconds, then type a second sentence. Close it.",
          "In OneDrive, right-click Practice Notes and select Version history. Take a screenshot of the list.",
          "Open an earlier version, then restore it.",
          "Open the file and confirm the second sentence is gone. Open Version history again and confirm the version you replaced is still listed.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your two screenshots of version history (before and after restoring) to your instructor or course folder. If you cannot sign in, submit this lesson's practice simulation results page instead." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "recycle-bin",
    title: "Recovering Deleted Files from the Recycle Bin",
    description:
      "Restore files and folders you deleted, permanently delete what you don't want, and know how long OneDrive keeps deleted items.",
    objectives: [
      "Open the OneDrive Recycle bin and restore one or several items",
      "Restore a deleted folder with everything in it",
      "Permanently delete items and empty the Recycle bin, and know when not to",
      "State how long work or school and personal accounts keep deleted items",
    ],
    duration: "12 min",
    slides: slides("recycle-bin", [
      "Deleted doesn't mean gone: the Recycle bin",
      "How long OneDrive keeps deleted items",
      "Restore one, several, or a whole folder",
      "Permanent delete: think twice",
      "Deleting on your PC deletes in OneDrive too",
    ]),
    sections: [
      {
        heading: "Oops",
        blocks: [
          {
            type: "scenario",
            role: "You cleaned up My files at the end of a long day.",
            text: "This morning the flu clinic team can't find the flyer. While tidying yesterday you selected one file too many and deleted it, along with the vendor contacts list and a folder of health fair photos.",
            task: "Get back what you deleted by mistake, and permanently remove only what you are sure nobody needs.",
          },
          {
            type: "paragraph",
            text: "When you delete a file or folder in OneDrive, it goes to the Recycle bin, not straight out of existence. Select Recycle bin in the left pane to see what you deleted, when, and where it came from (the Original location column). Select items with their check boxes and select Restore to put them back where they were.",
          },
          {
            type: "table",
            caption: "How long deleted items are kept",
            columns: ["Account", "Kept in the Recycle bin for"],
            rows: [
              ["Work or school", "93 days, unless your organization changed this"],
              ["Personal", "30 days"],
            ],
          },
        ],
      },
      {
        heading: "Restore, delete, or empty",
        blocks: [
          {
            type: "table",
            caption: "Recycle bin commands",
            columns: ["Command", "What it does"],
            rows: [
              ["Restore", "Puts the selected items back in their original location. Restoring a folder brings back everything that was in it"],
              ["Delete", "Permanently deletes the selected items. You can't restore them afterward"],
              ["Empty recycle bin", "Permanently deletes everything in the Recycle bin"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Files permanently deleted from the Recycle bin can't be restored, not with Restore your OneDrive and not with version history. In a work account, leave permanent deletion to the retention rules unless you have a reason, and never empty the Recycle bin to hide a mistake.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Restore it or delete it permanently?",
            prompt: "Sort each Recycle bin item.",
            buckets: [
              { id: "restore", label: "Restore" },
              { id: "purge", label: "Delete permanently" },
            ],
            items: [
              { id: "a", text: "The flu clinic flyer the team is looking for", bucket: "restore" },
              { id: "b", text: "A duplicate you made by accident: Old Fax Cover Sheet (copy)", bucket: "purge" },
              { id: "c", text: "A folder of health fair photos you deleted by mistake", bucket: "restore" },
              { id: "d", text: "A work file you found and removed from your personal OneDrive", bucket: "purge" },
            ],
            explanation: "Restore anything someone might need. Permanently delete only when you are sure, for example an accidental duplicate, or a copy that should never have been in that account.",
          },
        ],
      },
      {
        heading: "Deleting from File Explorer",
        blocks: [
          {
            type: "paragraph",
            text: "If you use the OneDrive sync app, the OneDrive folder in File Explorer is the same OneDrive. Deleting a file there deletes it from OneDrive everywhere, and it goes to the OneDrive Recycle bin online. To free up space on your PC without deleting anything, use Free up space instead (Module 5).",
          },
          {
            type: "callout",
            variant: "info",
            text: "You can only restore items from your own OneDrive. If a file someone shared with you disappears, the owner deleted it, and it is in the owner's Recycle bin. Ask them to restore it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You deleted a folder from your work OneDrive 10 days ago. Can you get it back?",
            options: ["No, deleted folders are gone immediately", "Yes, from the Recycle bin, with everything that was in it", "Only the folder, not the files inside", "Only if IT restores it"],
            correctIndex: 1,
            explanation: "Work or school OneDrive keeps deleted items for 93 days (unless your organization changed this). Restoring a folder restores its contents.",
            optionRationales: [
              "Deleted items go to the Recycle bin first.",
              "Correct.",
              "Restoring a folder brings back what was inside it.",
              "You can restore it yourself from the Recycle bin.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which action can't be undone?",
            options: ["Deleting a file in My files", "Restoring a file from the Recycle bin", "Deleting a file from the Recycle bin", "Moving a file to another folder"],
            correctIndex: 2,
            explanation: "Deleting from the Recycle bin is permanent.",
            optionRationales: [
              "That sends the file to the Recycle bin, where you can restore it.",
              "Restoring puts the file back; you could delete it again if needed.",
              "Correct. Permanent deletion can't be undone.",
              "Moving can be undone by moving it back.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice with files you don't need in your real OneDrive." },
      {
        type: "list",
        ordered: true,
        items: [
          "In your OneDrive Practice folder, create two small files (for example, Delete Me 1 and Delete Me 2).",
          "Delete both. Open the Recycle bin and take a screenshot showing them with their original location.",
          "Restore Delete Me 1. Confirm it is back in OneDrive Practice.",
          "Permanently delete Delete Me 2 from the Recycle bin.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your Recycle bin screenshot and one sentence explaining the difference between Delete in My files and Delete in the Recycle bin to your instructor or course folder. If you cannot sign in, submit this lesson's practice simulation results page instead." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "restore-your-onedrive",
    title: "Restore Your OneDrive and Ransomware Basics",
    description:
      "Recognize a ransomware attack on your files, report it the right way, and use Restore your OneDrive to roll back many files at once.",
    objectives: [
      "Recognize signs that ransomware or a bad sync changed many files",
      "Know who to tell first at work, and why you don't try to fix it alone",
      "Use Restore your OneDrive with a date preset or a custom activity",
      "Explain what restoring does to files created after the restore point",
    ],
    duration: "15 min",
    slides: slides("restore-your-onedrive", [
      "When many files go wrong at once",
      "Signs of ransomware",
      "At work: report first",
      "Restore your OneDrive, step by step",
      "Pick the restore point carefully",
      "Ransomware detection for Microsoft 365 subscribers",
    ]),
    sections: [
      {
        heading: "When many files go wrong at once",
        blocks: [
          {
            type: "scenario",
            role: "You open OneDrive first thing in the morning.",
            text: "Overnight, five front desk files were renamed to end in .locked, none of them open, and a new file called READ_ME_TO_RECOVER.txt is demanding payment. Luis in IT confirms it: an infected home laptop that was synced to a coworker's account reached shared files. He has cleaned the laptop and asks you to roll the files back.",
            task: "Report it, then use Restore your OneDrive to undo the attack without undoing more than necessary.",
          },
          {
            type: "paragraph",
            text: "Ransomware is malicious software that encrypts or scrambles files so they can't be opened, then demands money to unlock them. Signs include many files renamed with an unfamiliar extension, files that won't open, and a new note asking for payment. A sync accident (someone deleting or overwriting a whole folder) can look similar.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "At work, report it first. Tell your supervisor and IT immediately, don't pay anything, and don't try to fix it alone. Infected devices must be cleaned before you restore files, or they can be encrypted again. Microsoft's own steps start with confirming the files are infected and cleaning every device with antivirus software before restoring.",
          },
        ],
      },
      {
        heading: "Restore your OneDrive",
        blocks: [
          {
            type: "paragraph",
            text: "Restore your OneDrive rolls back everything that changed in your OneDrive after a point you choose, within the last 30 days. Work or school accounts have it; for personal accounts it needs a Microsoft 365 subscription.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Sign in to OneDrive on the web. Work or school account: select Settings (gear) › Restore OneDrive. Personal account: select Settings › Options › Restore your OneDrive.",
              "Under Select a date, choose a preset (Yesterday, One week ago, Three weeks ago) or Custom date and time.",
              "Use the activity chart and the activity feed to review what changed. With Custom date and time, select the earliest activity you want to undo; every activity after it is selected too.",
              "Select Restore and confirm.",
            ],
          },
          {
            type: "table",
            caption: "What restoring does",
            columns: ["Item", "After the restore"],
            rows: [
              ["Files changed after the restore point", "Go back to how they were"],
              ["Files deleted after the restore point", "Come back"],
              ["Files created after the restore point", "Move to the Recycle bin, where you can still restore them"],
              ["Files permanently deleted from the Recycle bin", "Can't be recovered"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Every activity after the restore point is undone, including good work. Pick the earliest bad activity, not an earlier date, and redo any legitimate changes afterward. If you restored to the wrong point, run Restore again and select the restore activity to undo it.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the response in order",
            prompt: "Drag these steps into the order you should do them after a ransomware attack at work.",
            items: [
              { id: "1", text: "Tell your supervisor and IT right away" },
              { id: "2", text: "IT cleans the infected devices" },
              { id: "3", text: "Open Settings › Restore OneDrive" },
              { id: "4", text: "Choose Custom date and time and select the earliest bad activity" },
              { id: "5", text: "Select Restore, then check your files" },
            ],
          },
        ],
      },
      {
        heading: "Ransomware detection for Microsoft 365 subscribers",
        blocks: [
          {
            type: "paragraph",
            text: "With a Microsoft 365 subscription on a personal account, Microsoft 365 can detect a ransomware attack on your OneDrive files. You get a notification on your device and an email, and when you go to restore, a suggested restore date is filled in for you. (Microsoft says non-subscribers get their first detection and recovery free.)",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You find dozens of front desk files renamed to end in .locked and a payment note. What do you do first?",
            options: ["Run Restore your OneDrive right away", "Pay the ransom so the files unlock quickly", "Tell your supervisor and IT immediately", "Delete the payment note and keep working"],
            correctIndex: 2,
            explanation: "Report it first. IT has to clean the infected devices before a restore, or the files can be encrypted again.",
            optionRationales: [
              "Restoring before the devices are cleaned can lead to a second attack.",
              "Never pay. It doesn't guarantee anything and rewards the attackers.",
              "Correct.",
              "Ignoring it lets the damage spread.",
            ],
          },
          {
            type: "knowledge-check",
            question: "After you restore your OneDrive to yesterday at 9 PM, what happens to a file you created this morning?",
            options: ["It is permanently deleted", "It stays exactly as it is", "It moves to the Recycle bin, where you can restore it", "It is renamed"],
            correctIndex: 2,
            explanation: "Files created after the restore point move to the Recycle bin, so you can still bring them back.",
            optionRationales: [
              "It isn't permanently deleted.",
              "Everything after the restore point is undone, including new files.",
              "Correct.",
              "Restore doesn't rename new files.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Don't restore your real OneDrive for practice; it would undo your real work. Look, then practice the restore in the Challenge Lab." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in to OneDrive on the web with your school account and open Settings › Restore OneDrive (personal accounts: Settings › Options › Restore your OneDrive).",
          "Choose One week ago under Select a date and look at the activity chart and feed. Take a screenshot. Then leave the page without selecting Restore.",
          "Do the full restore in the Challenge Lab below: report the attack, roll back to the earliest bad activity, and remove the ransom note.",
        ],
      },
      { type: "callout", variant: "success", text: "On a school computer, do this in the Challenge Lab below. Deliverable: Submit your Challenge Lab results page (Print or save results on the finish card), plus your screenshot from step 2 if you took it, to your instructor or course folder." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "account-security-and-personal-vault",
    title: "Protecting Your Account and Personal Vault",
    description:
      "Keep your OneDrive account safe with multifactor authentication and good sign-in habits, spot fake sharing emails, and use Personal Vault for your own most sensitive files.",
    objectives: [
      "Explain why multifactor authentication and signing out protect your files",
      "Spot a fake file-sharing email and check it safely",
      "Use Personal Vault in a personal OneDrive: unlock, add files, and lock",
      "Scan documents with the OneDrive mobile app now that Microsoft Lens is retired",
    ],
    duration: "15 min",
    slides: slides("account-security-and-personal-vault", [
      "Your account is the key to every file",
      "Spot a fake file-sharing email",
      "Personal Vault: a locked folder for your own sensitive files",
      "Unlock, add, lock",
      "Scanning with the OneDrive app (Microsoft Lens is retired)",
    ]),
    sections: [
      {
        heading: "Your account is the key",
        blocks: [
          {
            type: "scenario",
            role: "You use OneDrive at work and at home.",
            text: "An email says Maria Santos shared Payroll Update.pdf with you and asks you to sign in to view it. The sender's address is maria.santos@lakeside-files.example, not Lakeside's real domain. At home, you also want somewhere safer than a regular folder for scans of your own ID and insurance card.",
            task: "Protect your accounts, check suspicious sharing emails safely, and use Personal Vault for your own sensitive documents.",
          },
          {
            type: "list",
            items: [
              "Turn on multifactor authentication (MFA). With MFA, a stolen password alone isn't enough to get in. Work accounts usually require it; for a personal Microsoft account, turn on two-step verification in your account's security settings.",
              "Use a strong, unique password (or a passkey, if offered) for each account. Never reuse your work password.",
              "Sign out of OneDrive on any shared computer, and close the browser.",
              "Never give anyone your password, including a coworker who 'just needs one file.' Share the file instead.",
            ],
          },
        ],
      },
      {
        heading: "Spotting a fake sharing email",
        blocks: [
          {
            type: "paragraph",
            text: "Attackers copy the look of real sharing emails to trick people into typing their password on a fake sign-in page. Check before you click: Is the sender's address from the real organization? Did you expect this file? Point to the link (don't click) and look at where it really goes. The safest check is to skip the email: open OneDrive yourself and look in Shared. If the file was really shared with you, it is there.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Real or suspicious?",
            prompt: "Sort each sign.",
            buckets: [
              { id: "ok", label: "Normal" },
              { id: "sus", label: "Suspicious: check in OneDrive or report it" },
            ],
            items: [
              { id: "a", text: "The sender's address uses a look-alike domain", bucket: "sus" },
              { id: "b", text: "A file you were expecting from your manager, and it is also in Shared", bucket: "ok" },
              { id: "c", text: "The link goes to a web address that isn't Microsoft's or your organization's", bucket: "sus" },
              { id: "d", text: "The email says your account will be closed unless you sign in now", bucket: "sus" },
            ],
            explanation: "Look-alike addresses, unexpected urgency, and links that don't go where they claim are classic phishing signs. When in doubt, open OneDrive directly and report the email to IT.",
          },
        ],
      },
      {
        heading: "Personal Vault",
        blocks: [
          {
            type: "paragraph",
            text: "Personal Vault is a protected folder in a personal OneDrive (it isn't available in work or school accounts). To open it you verify your identity again, with a code sent by text or email or with the Microsoft Authenticator app. On the web it locks itself after 20 minutes of inactivity; in the mobile app it locks after 3 minutes by default. Without a Microsoft 365 subscription you can keep up to three files in it; with Microsoft 365 Basic, Personal, or Family you can keep as many as your storage allows. Use it for your own sensitive documents: a copy of your ID, insurance cards, tax forms. It is never a place for work files or patient information.",
          },
          {
            type: "worked-example",
            title: "Moving your ID scan into Personal Vault",
            task: "Protect the scans of your passport and car insurance card in your personal OneDrive.",
            steps: [
              { move: "In My files, open Personal Vault and select Unlock.", why: "The vault asks you to verify your identity, so a person who gets into your account still can't open it without your second factor." },
              { move: "Choose a verification method and enter the code.", why: "Text, email, or the Authenticator app all prove it is you." },
              { move: "Move the two scans into Personal Vault.", why: "Moving keeps one copy, now in the protected folder." },
              { move: "Delete any old copies from the Recycle bin, then select Lock.", why: "Old copies outside the vault would undo the point. Locking now means you don't wait 20 minutes for it to lock itself." },
            ],
            result: "Your sensitive scans are in a folder that needs a second verification to open.",
            takeaway: "Personal Vault is for your own most sensitive files. Lock it when you are done.",
          },
        ],
      },
      {
        heading: "Scanning documents with your phone",
        blocks: [
          {
            type: "callout",
            variant: "version",
            text: "Microsoft Lens, the old scanning app, was retired: it was removed from the app stores on February 9, 2026, and stopped creating new scans on March 9, 2026. Microsoft's recommended replacement is the OneDrive mobile app's built-in scanner: open OneDrive on your phone, tap the plus (+) button, choose the scan option, and save the scan to a OneDrive folder. In a personal OneDrive you can scan straight into Personal Vault.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "An email says a coworker shared a file and asks you to sign in. The sender's domain looks slightly wrong. What is the safest move?",
            options: ["Click the link and sign in quickly to check", "Forward it to the whole office as a warning", "Open OneDrive yourself and check Shared; report the email to IT", "Reply and ask if it's real"],
            correctIndex: 2,
            explanation: "If the share is real, the file is in Shared. Going to OneDrive directly avoids a fake sign-in page, and reporting helps IT protect everyone.",
            optionRationales: [
              "That is exactly what the attacker wants.",
              "Forwarding spreads the dangerous link. Report it to IT instead.",
              "Correct.",
              "Replying goes to the attacker.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which account can use Personal Vault?",
            options: ["Work or school accounts", "Personal Microsoft accounts", "Both", "Neither"],
            correctIndex: 1,
            explanation: "Personal Vault is a feature of personal OneDrive. Work or school accounts don't have it.",
            optionRationales: [
              "Work or school accounts don't have Personal Vault.",
              "Correct.",
              "Only personal accounts have it.",
              "Personal accounts have it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Check your own account security." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in at mysignins.microsoft.com/security-info with your school account and look at your sign-in methods. Write down which methods are set up (don't share codes or phone numbers).",
          "Find one phishing example online from Microsoft or your school's IT page, or describe a suspicious email you received, and list two warning signs.",
          "If you have a personal Microsoft account, open Personal Vault on your own device and look at how it locks. If you don't, describe in two sentences what you would put in it and why.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your written answers to your instructor or course folder. If you can't do step 3, complete this lesson's practice simulation and submit its results page." },
    ],
  },
];
