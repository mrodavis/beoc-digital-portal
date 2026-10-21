import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/onedrive/module-5";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const onedriveModule5Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "the-sync-app",
    title: "The OneDrive Sync App and File Explorer",
    description:
      "Use OneDrive from File Explorer: the OneDrive folder, the cloud icon and activity center, pausing and resuming sync, and what to do about sync problems.",
    objectives: [
      "Find your OneDrive folder in File Explorer and save files into it",
      "Open the activity center from the OneDrive cloud icon and read its status",
      "Pause syncing for 2, 8, or 24 hours and resume it",
      "Recognize a sync problem and know where to look for the cause",
    ],
    duration: "15 min",
    slides: slides("the-sync-app", [
      "The sync app puts OneDrive in File Explorer",
      "The cloud icon and the activity center",
      "Pause and resume syncing",
      "When something won't sync",
      "Work and school computers are managed by IT",
    ]),
    sections: [
      {
        heading: "OneDrive without a browser",
        blocks: [
          {
            type: "scenario",
            role: "You work at the front desk computer at Lakeside.",
            text: "You have been opening OneDrive in a browser all morning. Maria points to the cloud icon at the bottom right of your screen: the OneDrive sync app is already set up on this computer. Your OneDrive is right there in File Explorer, and anything you save into it is in OneDrive everywhere.",
            task: "Use OneDrive from File Explorer, check that files are synced, and pause syncing when the network is busy.",
          },
          {
            type: "paragraph",
            text: "The OneDrive sync app comes with Windows 11. Once you sign in, it adds a folder to File Explorer named for your account: OneDrive - Lakeside Medical Associates for a work account, or OneDrive - Personal. That folder is your OneDrive. Files you save there upload automatically, and changes made on another device download automatically. You can also save into it from any app with File › Save As and the OneDrive location.",
          },
          {
            type: "table",
            caption: "The OneDrive cloud icon and activity center",
            columns: ["Part", "What it is for"],
            rows: [
              ["Cloud icon (notification area, bottom right)", "Select it to open the activity center. A paused symbol or a red mark on it means syncing is paused or has a problem"],
              ["Activity center", "Recent uploads, sync status, and sync problems"],
              ["Open folder", "Opens your OneDrive folder in File Explorer"],
              ["View online", "Opens OneDrive on the web"],
              ["Help & Settings (gear)", "Settings, Pause syncing, and Quit OneDrive"],
            ],
          },
        ],
      },
      {
        heading: "Pausing and resuming",
        blocks: [
          {
            type: "paragraph",
            text: "Syncing uses your network connection. If you need all of it for a moment, for example during a video visit on a slow connection, pause syncing. Right-click the OneDrive cloud icon (or open the activity center and select Help & Settings), select Pause syncing, and choose 2 hours, 8 hours, or 24 hours. The cloud icon shows that syncing is paused. To start again before the time is up, open the activity center and select the paused message (or Help & Settings › Resume syncing).",
          },
          {
            type: "callout",
            variant: "warning",
            text: "While syncing is paused, your changes are only on this computer. Resume as soon as you can, and never shut down a computer that is uploading important files.",
          },
        ],
      },
      {
        heading: "When something won't sync",
        blocks: [
          {
            type: "paragraph",
            text: "A file with a problem shows a red circle with an X in File Explorer, and the cloud icon shows a red mark. Open the activity center to see which file and why. Common causes are a name OneDrive doesn't allow (it can't contain \" * : < > ? / \\ |), not enough space in your OneDrive, or a file that is open in another app. Fix the cause (rename the file, free up space, or close the file) and OneDrive tries again. At work, if you can't tell what is wrong, contact IT before moving or deleting anything.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Read the cloud icon",
            prompt: "Drag each meaning onto what you see.",
            items: [
              { id: "a", text: "Cloud icon with a pause symbol", match: "Syncing is paused" },
              { id: "b", text: "Cloud icon with a red mark", match: "Something can't sync; open the activity center" },
              { id: "c", text: "Activity center says your files are synced", match: "Everything is up to date" },
              { id: "d", text: "Activity center lists a file as Uploaded to OneDrive", match: "That file just finished syncing" },
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Work and school computers are usually set up by IT. They may sign you in to the sync app automatically, back up your folders for you, or lock some settings. If a setting is greyed out, that is why. On BEOC classroom computers the sync app settings may be blocked, so this lesson's challenge has a Challenge Lab.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You save a file into the OneDrive - Lakeside Medical Associates folder in File Explorer. Where is it?",
            options: ["Only on this computer", "In your OneDrive, available on the web and your other devices", "In the team's SharePoint library", "In your email"],
            correctIndex: 1,
            explanation: "That folder is your OneDrive. The sync app uploads what you save there.",
            optionRationales: [
              "The sync app uploads it to OneDrive automatically.",
              "Correct.",
              "Your OneDrive folder is yours, not the team's library.",
              "Saving to a folder doesn't email anything.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which pause lengths does OneDrive offer?",
            options: ["15 minutes, 1 hour, or 4 hours", "2 hours, 8 hours, or 24 hours", "Until you restart", "1 day or 1 week"],
            correctIndex: 1,
            explanation: "Pause syncing offers 2, 8, or 24 hours. You can resume sooner.",
            optionRationales: ["Those aren't the options.", "Correct.", "Pausing is for a set time.", "Those aren't the options."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "On your own Windows 11 computer, use the real sync app. On a school computer, the sync app settings may be blocked by IT." },
      {
        type: "list",
        ordered: true,
        items: [
          "Open File Explorer and select your OneDrive folder in the navigation pane. Take a screenshot showing the Status column.",
          "Create a folder named OneDrive Sync Practice in your OneDrive folder.",
          "Select the OneDrive cloud icon to open the activity center. Pause syncing for 2 hours, take a screenshot of the paused cloud icon or message, then resume syncing.",
          "From the activity center, select View online and find OneDrive Sync Practice on the web.",
        ],
      },
      { type: "callout", variant: "success", text: "On a school computer, do this in the Challenge Lab below. Deliverable: Submit your screenshots, or your Challenge Lab results page (Print or save results on the finish card), to your instructor or course folder." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "files-on-demand",
    title: "Files On-Demand: Online-Only and Always Available",
    description:
      "Read the status icons in File Explorer, keep important files on your PC for offline work, free up disk space, and use OneDrive when you are offline.",
    objectives: [
      "Identify online-only, locally available, and always available files by their icons",
      "Use Always keep on this device and Free up space",
      "Use Free up disk space and Download all files in OneDrive settings",
      "Prepare files for work without an internet connection",
    ],
    duration: "15 min",
    slides: slides("files-on-demand", [
      "Files On-Demand: see everything, store only what you need",
      "Three status icons",
      "Always keep on this device, and Free up space",
      "Settings: Free up disk space or Download all files",
      "Working offline",
    ]),
    sections: [
      {
        heading: "All your files, without filling the drive",
        blocks: [
          {
            type: "scenario",
            role: "You are packing the laptop for the community health fair.",
            text: "The health fair is in a gym with no reliable Wi-Fi. You need the patient forms on the laptop, but the laptop's drive is almost full, mostly with old training videos you rarely watch.",
            task: "Make sure the forms are on the laptop for offline use, and free up space from files that can stay in the cloud.",
          },
          {
            type: "paragraph",
            text: "Files On-Demand lets File Explorer show every file in your OneDrive without downloading all of them. A file can be online-only (it takes no space and downloads when you open it), locally available (downloaded because you opened it), or always available (kept on the device on purpose). Starting with OneDrive build 23.066, Files On-Demand is turned on by default.",
          },
          {
            type: "table",
            caption: "Status icons in File Explorer's Status column",
            columns: ["Icon", "Status", "Means"],
            rows: [
              ["Blue cloud outline", "Online-only", "Takes no space on this PC. Opens only when you are connected to the internet"],
              ["Green check in a white circle", "Available on this device", "Downloaded when you opened it. Opens offline. Free up space can make it online-only again"],
              ["White check in a solid green circle", "Always available", "You chose Always keep on this device. Stays on the PC and opens offline"],
              ["Blue circular arrows", "Syncing", "Uploading or downloading now"],
              ["Red circle with an X", "Sync problem", "Open the activity center to see why"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the icon to its meaning",
            prompt: "Drag each meaning onto its status icon.",
            items: [
              { id: "a", text: "Blue cloud outline", match: "Online-only: needs internet to open" },
              { id: "b", text: "Green check in a white circle", match: "Downloaded because you opened it" },
              { id: "c", text: "White check in a solid green circle", match: "Always kept on this device" },
              { id: "d", text: "Red circle with an X", match: "Has a sync problem" },
            ],
          },
        ],
      },
      {
        heading: "Choosing what stays on the PC",
        blocks: [
          {
            type: "list",
            items: [
              "Always keep on this device: right-click a file or folder in your OneDrive folder and select it. Everything inside downloads and stays, so you can open it offline.",
              "Free up space: right-click a file or folder and select it. The files become online-only and stop taking space, but they stay in OneDrive and in File Explorer.",
              "For everything at once, open OneDrive settings (cloud icon › Help & Settings › Settings) › Sync and backup › Advanced settings. Free up disk space (the recommended choice) makes files online-only; Download all files keeps everything on the device.",
            ],
          },
          {
            type: "worked-example",
            title: "Packing for the health fair",
            task: "Keep the patient forms on the laptop and reclaim space from training videos.",
            steps: [
              { move: "Right-click the Patient Forms folder › Always keep on this device.", why: "Every form downloads now and stays on the laptop, so it opens in a gym with no Wi-Fi." },
              { move: "Watch the Status column until each form shows the solid green circle.", why: "The icon confirms the files are really on the laptop before you leave the office." },
              { move: "Right-click the Training folder › Free up space.", why: "The videos become online-only. They still appear in File Explorer and download if someone opens them later." },
            ],
            result: "The forms work offline and the drive has room again.",
            takeaway: "Always keep what you need offline; free up space on what can wait for the internet.",
          },
          {
            type: "callout",
            variant: "info",
            text: "OneDrive on the web also has an offline mode for work or school accounts on Windows and Mac computers with the sync app. It is on by default, and while you are offline you can still view, rename, move, and copy files and create folders in the OneDrive web app.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Free up space isn't Delete. Deleting a file in your OneDrive folder deletes it from OneDrive everywhere (it goes to the OneDrive Recycle bin). Use Free up space when the goal is disk space.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A file shows a blue cloud outline. What happens if you try to open it with no internet connection?",
            options: ["It opens normally", "It can't open until you are connected", "It opens read-only", "It is deleted"],
            correctIndex: 1,
            explanation: "Online-only files aren't stored on the PC, so they need the internet to download when you open them.",
            optionRationales: ["Online-only files aren't on the PC yet.", "Correct.", "There is nothing local to open, read-only or otherwise.", "Nothing is deleted."],
          },
          {
            type: "knowledge-check",
            question: "Your laptop is low on space. Which choice keeps every file in OneDrive but stops them from taking space on the laptop?",
            options: ["Delete the files", "Free up space", "Always keep on this device", "Pause syncing"],
            correctIndex: 1,
            explanation: "Free up space makes files online-only. They stay in OneDrive and still show in File Explorer.",
            optionRationales: [
              "Deleting removes them from OneDrive everywhere.",
              "Correct.",
              "That does the opposite: it keeps files on the device.",
              "Pausing stops syncing but doesn't free any space.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "On your own computer with the OneDrive sync app, try Files On-Demand. On a school computer, use the Challenge Lab." },
      {
        type: "list",
        ordered: true,
        items: [
          "In File Explorer, open your OneDrive folder and find one file with each status: online-only, available on this device, and always available (you may need to create them in the next steps). Take a screenshot.",
          "Right-click your OneDrive Sync Practice folder (or any practice folder) and select Always keep on this device. Take a screenshot when the icon is a solid green circle.",
          "Right-click the same folder and select Free up space. Take a screenshot of the cloud icon.",
        ],
      },
      { type: "callout", variant: "success", text: "On a school computer, do this in the Challenge Lab below. Deliverable: Submit your three screenshots, or your Challenge Lab results page (Print or save results), to your instructor or course folder." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "backing-up-pc-folders",
    title: "Backing Up Your Desktop, Documents, and Pictures",
    description:
      "Turn on OneDrive folder backup so the files people keep on the desktop and in Documents are protected and available on other devices.",
    objectives: [
      "Explain what folder backup does to your Desktop, Documents, and Pictures folders",
      "Turn folder backup on with Manage backup",
      "Explain what happens when you stop backing up a folder",
      "Recognize when your organization manages folder backup for you",
    ],
    duration: "12 min",
    slides: slides("backing-up-pc-folders", [
      "The desktop is the riskiest place to keep files",
      "Folder backup moves Desktop, Documents, and Pictures into OneDrive",
      "Turn it on: Settings › Sync and backup › Manage backup",
      "Stopping backup: choose where the files stay",
      "Your organization may manage this for you",
    ]),
    sections: [
      {
        heading: "Files on the desktop aren't backed up",
        blocks: [
          {
            type: "scenario",
            role: "You are setting up a replacement PC at the check-in window.",
            text: "When the old check-in computer died, everything on its desktop died with it: the lunch order form, the holiday signup sheet, a dozen screenshots. Maria wants the new PC set up so that never happens again.",
            task: "Back up the Desktop and Documents folders to OneDrive so they survive a broken computer.",
          },
          {
            type: "paragraph",
            text: "Folder backup (IT departments may call it Known Folder Move) makes your PC's Desktop, Documents, and Pictures folders part of OneDrive. Files in them sync like any other OneDrive file: they are backed up, they open on your other devices, and they get version history and the Recycle bin. You keep working exactly where you always did; the desktop simply lives in OneDrive now.",
          },
        ],
      },
      {
        heading: "Turning it on",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Select the OneDrive cloud icon in the notification area, then Help & Settings › Settings.",
              "Select the Sync and backup tab, then Manage backup.",
              "Turn on the toggle for each folder marked Not backed up.",
              "Select Save changes. The folders start syncing.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the backup steps in order",
            prompt: "Drag the steps for turning on folder backup into order.",
            items: [
              { id: "1", text: "Select the OneDrive cloud icon" },
              { id: "2", text: "Select Help & Settings › Settings" },
              { id: "3", text: "Open Sync and backup › Manage backup" },
              { id: "4", text: "Turn on the folders you want to back up" },
              { id: "5", text: "Select Save changes" },
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "To stop backing up a folder, turn its toggle off. OneDrive asks where the files should stay: only in OneDrive (they leave the PC) or only on this PC (they leave OneDrive). If some files are online-only, OneDrive asks you to download them first with Always keep on this device.",
          },
        ],
      },
      {
        heading: "When IT is in charge",
        blocks: [
          {
            type: "paragraph",
            text: "On work and school computers, IT often turns folder backup on for everyone or blocks it. If Manage backup is greyed out or the folders already show Backed up, that is your organization's setting. A personal Microsoft account can't back up folders on a PC that is joined to an organization's domain; talk to IT there.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Backing up the desktop doesn't make it the right place for patient information. Patient files still belong in the approved location your office uses.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "After you turn on backup for Desktop, where are the files on your desktop stored?",
            options: ["Only on the PC", "In OneDrive, and they still show on the desktop", "In the Recycle bin", "In a ZIP file"],
            correctIndex: 1,
            explanation: "The Desktop folder becomes part of OneDrive. You keep using it the same way, but the files are synced and backed up.",
            optionRationales: ["That was the risk before backup.", "Correct.", "Nothing is deleted.", "No ZIP file is made."],
          },
          {
            type: "knowledge-check",
            question: "Manage backup is greyed out on your work computer. What does that most likely mean?",
            options: ["OneDrive is broken", "Your organization manages folder backup", "You need a personal account", "Your desktop is empty"],
            correctIndex: 1,
            explanation: "IT can turn folder backup on for everyone or prevent changes. Ask IT if you need it changed.",
            optionRationales: ["A managed setting isn't a broken app.", "Correct.", "A personal account can't back up folders on a domain-joined work PC.", "An empty desktop can still be backed up."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "On your own Windows computer, back up a folder. School computers usually block this, so use the Challenge Lab there." },
      {
        type: "list",
        ordered: true,
        items: [
          "Open OneDrive settings (cloud icon › Help & Settings › Settings) › Sync and backup › Manage backup. Take a screenshot.",
          "Turn on backup for Documents (and Desktop if you like), then select Save changes.",
          "Open OneDrive on the web and find the Documents folder there. Take a screenshot.",
        ],
      },
      { type: "callout", variant: "success", text: "On a school computer, do this in the Challenge Lab below. Deliverable: Submit your two screenshots, or your Challenge Lab results page (Print or save results), to your instructor or course folder." },
    ],
  },
];
