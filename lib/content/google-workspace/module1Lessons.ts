import { Lesson } from "@/types/lesson";

/**
 * Google Workspace, Module 1: Getting Started with Google Workspace.
 * Scenario: Jordan Lee, new office assistant at Parkview Property Management (fictional).
 */
const IMG = "/images/google-workspace/module-1";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const gwModule1Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "what-is-google-workspace",
    title: "What Google Workspace Is",
    description:
      "Meet the Google Workspace apps, learn how a personal Google account differs from a work account, and see how each Google app lines up with the Microsoft 365 app you may already know.",
    objectives: [
      "Name the main Google Workspace apps and what each one is used for at work",
      "Explain how a personal Google account differs from a work or school Google Workspace account",
      "Match each Google app to the Microsoft 365 app that does the same job",
      "Describe three habits of cloud apps: changes save on their own, you share a link instead of an attachment, and your files open on any computer",
    ],
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/chz7N054NAc",
    slides: slides("what-is-google-workspace", [
      "What Google Workspace is: Google's apps for work, all in the browser",
      "The apps you will use: Gmail and Calendar, Drive, Docs, Sheets, Slides, Meet and Chat",
      "Personal Google account or work account: who sets it up and what changes",
      "Google Workspace and Microsoft 365, app by app",
      "Three habits of cloud apps: automatic saving, sharing a link, any computer",
      "Quick check: which app would you open?",
    ]),
    sections: [
      {
        heading: "Your first day at Parkview",
        blocks: [
          {
            type: "scenario",
            role: "You are Jordan Lee, the new office assistant at Parkview Property Management.",
            text: "Parkview manages two apartment buildings, Elm Street Apartments and Riverside Commons. The office runs on Google Workspace: tenant letters are in Google Docs, the maintenance request log is a Google Sheet, and the staff talks over Gmail and Google Meet. Your manager, Denise Carter, set up your work account (jlee@parkviewpm.example) and wants you to know your way around before your first tenant walks in.",
            task: "Know what each Google Workspace app is for, what kind of account you have, and how the Google apps compare with Microsoft Office.",
          },
          {
            type: "paragraph",
            text: "Google Workspace is Google's set of apps for work and school: Gmail, Google Calendar, Google Drive, Google Docs, Google Sheets, Google Slides, Google Meet, Google Chat, Google Forms, and more. They run in a web browser, so there is nothing to install on the computer. You sign in with one Google account and every app is there.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Google Workspace was called G Suite until October 2020. If a coworker or a job posting says G Suite, they mean the same apps.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Google account", definition: "The sign-in you use for every Google app. It can be a personal account you create yourself or a work or school account your organization gives you." },
              { term: "Google Workspace", definition: "Google's apps for work and school (Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, Chat, Forms, and others), managed by an organization." },
              { term: "Cloud app", definition: "An app that runs in a web browser and keeps your files on the internet instead of on one computer." },
              { term: "Google Drive", definition: "Google's cloud storage. Every Doc, Sheet, and Slides file you make is saved in Drive." },
              { term: "Administrator (admin)", definition: "The person or IT team who manages your organization's Google Workspace accounts and settings." },
            ],
          },
        ],
      },
      {
        heading: "The apps you will use",
        blocks: [
          {
            type: "table",
            caption: "Google Workspace apps at Parkview Property Management",
            columns: ["App", "What it does", "At Parkview"],
            rows: [
              ["Gmail", "Email", "Answer tenant questions and send notices"],
              ["Google Calendar", "Schedules and meetings", "Book apartment showings and staff meetings"],
              ["Google Drive", "Stores and shares files", "Keep every lease form, letter, and log in shared folders"],
              ["Google Docs", "Word processing", "Write the tenant welcome letter and building notices"],
              ["Google Sheets", "Spreadsheets", "Track maintenance requests, rent payments, and supplies"],
              ["Google Slides", "Presentations", "Build the new-tenant orientation slideshow"],
              ["Google Meet and Google Chat", "Video meetings and team messaging", "Meet with the property manager who works at the other building"],
              ["Google Forms", "Forms and surveys", "Collect maintenance requests from tenants online"],
            ],
          },
          {
            type: "paragraph",
            text: "This course teaches Drive, Docs, and Sheets first, because almost every office task starts with a file. Later modules cover Slides, Gmail, Calendar and Meet, and working together across the apps.",
          },
        ],
      },
      {
        heading: "Personal account or work account?",
        blocks: [
          {
            type: "paragraph",
            text: "Anyone can create a free personal Google account (an address that ends in @gmail.com). A work or school account is created by an organization that pays for Google Workspace, and it usually uses the organization's own email address, like jlee@parkviewpm.example. The apps look almost the same. What changes is who is in charge of the account.",
          },
          {
            type: "table",
            caption: "Personal Google account compared with a work or school account",
            columns: ["", "Personal Google account", "Work or school account"],
            rows: [
              ["Who creates it", "You do", "Your organization's administrator"],
              ["Email address", "Usually ends in @gmail.com", "Usually the organization's address (@parkviewpm.example)"],
              ["Storage", "15 GB free, shared by Gmail, Drive, and Google Photos", "Set by the organization's plan"],
              ["Who controls settings", "You", "The administrator, who can turn features on or off"],
              ["Sharing", "With specific people or anyone with the link", "Also with everyone in the organization, and admins can limit outside sharing"],
              ["Who owns the files", "You", "The organization. When you leave the job, the account and its files stay with the company"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Personal or work account?",
            prompt: "Drag each statement to the kind of account it describes.",
            buckets: [
              { id: "personal", label: "Personal Google account" },
              { id: "work", label: "Work or school account" },
            ],
            items: [
              { id: "a", text: "Jordan created it at home with an @gmail.com address", bucket: "personal" },
              { id: "b", text: "The administrator turned off sharing outside the company", bucket: "work" },
              { id: "c", text: "Its 15 GB of free storage is shared by Gmail, Drive, and Photos", bucket: "personal" },
              { id: "d", text: "The files stay with the company when the employee leaves", bucket: "work" },
              { id: "e", text: "The address ends in @parkviewpm.example", bucket: "work" },
              { id: "f", text: "Only the account holder decides which features are on", bucket: "personal" },
            ],
            explanation: "Ask who set up the account. If you created it, it is personal and you control it. If your employer or school created it, it is a work or school account, the organization controls it, and work files belong there, not in your personal account.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Keep work files in your work account. Do not download company files to your personal Google account or share them from it, even to work from home. If you need access from home, ask how your employer wants you to sign in.",
          },
        ],
      },
      {
        heading: "Google Workspace and Microsoft 365",
        blocks: [
          {
            type: "paragraph",
            text: "Microsoft 365 (Word, Excel, PowerPoint, Outlook, OneDrive, and Teams) and Google Workspace do the same jobs. Many offices use one; plenty use both, for example Google Workspace for daily work and Word for a letter that must match a printed letterhead. If you already know a Microsoft app, most of what you know carries over.",
          },
          {
            type: "table",
            caption: "Which app does the same job",
            columns: ["Google Workspace", "Microsoft 365"],
            rows: [
              ["Google Drive", "OneDrive (and SharePoint for team files)"],
              ["Google Docs", "Word"],
              ["Google Sheets", "Excel"],
              ["Google Slides", "PowerPoint"],
              ["Gmail and Google Calendar", "Outlook"],
              ["Google Meet and Google Chat", "Microsoft Teams"],
              ["Google Forms", "Microsoft Forms"],
            ],
          },
          {
            type: "image",
            src: `${IMG}/what-is-google-workspace/google-and-microsoft.png`,
            alt: "Quick reference: Google Workspace apps and their Microsoft 365 matches, and the differences that matter at work",
            caption: "Quick reference you can keep: Google and Microsoft apps side by side.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the apps",
            prompt: "Drag each Microsoft 365 app onto the Google app that does the same job.",
            items: [
              { id: "m1", text: "Google Docs", match: "Word" },
              { id: "m2", text: "Google Sheets", match: "Excel" },
              { id: "m3", text: "Google Slides", match: "PowerPoint" },
              { id: "m4", text: "Google Drive", match: "OneDrive" },
              { id: "m5", text: "Google Meet", match: "Microsoft Teams" },
            ],
            explanation: "The pairs do the same job. In each pair, the Google app runs in the browser, saves on its own, and shares by link.",
          },
        ],
      },
      {
        heading: "Three habits of cloud apps",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Changes save on their own. Docs, Sheets, and Slides save every change to Google Drive as you type. There is no Save button. Version history keeps earlier versions in case you need to go back.",
              "You share a link, not an attachment. Instead of emailing a copy, you share the file, and everyone works in the same one at the same time. You decide who can view, comment, or edit.",
              "Your files open on any computer. Sign in on any computer with a web browser and your files are there. That is also why you must sign out on a shared computer.",
            ],
          },
          {
            type: "worked-example",
            title: "Why Denise never emails the maintenance log",
            task: "Three people update the maintenance request log during the day.",
            steps: [
              { move: "Keep one Google Sheet in the shared Maintenance folder in Drive.", why: "If each person emailed copies back and forth, nobody would know which copy is current." },
              { move: "Share the sheet with Kim and Marcus as editors.", why: "Sharing gives people access to the one real file instead of making new copies." },
              { move: "Let everyone type into it at the same time.", why: "Sheets saves every change for everyone, so the log is always up to date." },
            ],
            result: "One current log that the whole team can see and update from any computer.",
            takeaway: "In Google Workspace, keep one file and share it. Copies are for people outside the team who need a finished version.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Some Google accounts include Gemini, Google's AI assistant, which shows up as an Ask Gemini button in apps such as Docs. It needs an eligible Google Workspace or Google AI plan, and many employers turn it off or limit it. Nothing in this course requires it. If your job lets you use it, read and check everything it writes before you share it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Denise asks you to track tenant maintenance requests so three coworkers can update the list during the day. Which app fits best?",
            options: ["Google Docs", "Google Sheets", "Google Slides", "Google Meet"],
            correctIndex: 1,
            explanation: "A list with columns (date, apartment, problem, status) that several people update is a spreadsheet job. Google Sheets keeps one shared, current copy.",
            optionRationales: [
              "Docs is for letters and notices. A list that needs sorting and filtering belongs in a spreadsheet.",
              "Correct. Sheets is built for lists and logs, and several people can edit it at the same time.",
              "Slides is for presentations, not for a list people update all day.",
              "Meet is for video meetings. It does not store the list.",
            ],
          },
          {
            type: "knowledge-check",
            question: "What is true about saving in Google Docs?",
            options: [
              "Press Ctrl+S every few minutes or you lose your work",
              "Changes are saved to Google Drive automatically as you work",
              "You must download the file to save it",
              "Only the owner's changes are saved",
            ],
            correctIndex: 1,
            explanation: "Docs, Sheets, and Slides save every change to Drive as you work. There is no Save button, and version history keeps earlier versions.",
            optionRationales: [
              "That is a Word habit. Google's editors save on their own.",
              "Correct. Every change is saved to Drive automatically.",
              "Downloading makes a separate copy. The file in Drive is already saved.",
              "Every editor's changes are saved, and version history shows who changed what.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Your Parkview account is jlee@parkviewpm.example. Who controls which features it has?",
            options: ["You do", "Google support", "Parkview's Google Workspace administrator", "Anyone you share a file with"],
            correctIndex: 2,
            explanation: "A work account is managed by the organization. Its administrator can turn features on or off and set sharing rules.",
            optionRationales: [
              "You control a personal account. A work account is managed by your organization.",
              "Google provides the apps, but your organization's admin manages the account settings.",
              "Correct. The admin manages work accounts, including sharing rules and features.",
              "Sharing a file never gives someone control of your account.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Look around Google Workspace in your own account. A free personal Google account works for this." },
      {
        type: "list",
        ordered: true,
        items: [
          "Go to drive.google.com and sign in.",
          "Click the Google apps menu (the grid of dots at the top right). Write down six apps you see.",
          "Open Docs and then Sheets from the Google apps menu. Look at the home screen of each: Start a new document (or spreadsheet), the Template gallery, and your recent files.",
          "For each of these Parkview jobs, write the app you would use and one sentence why: a building notice for the lobby, a list of apartments due for smoke detector checks, a video call with the property manager at the other building.",
          "If you are on a shared computer, sign out: click your profile picture at the top right, then Sign out.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your list of six apps and your three app choices with reasons to your instructor or course folder. If you cannot sign in to a Google account, complete the practice simulation in this lesson and submit its results page (use Print or save results on the finish card).",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "signing-in-and-staying-secure",
    title: "Signing In and Keeping Your Account Safe",
    description:
      "Sign in to your Google account, approve a 2-Step Verification prompt, and sign out the right way on a shared or public computer.",
    objectives: [
      "Sign in to a Google account in a web browser",
      "Explain 2-Step Verification and approve, or block, a sign-in prompt on your phone",
      "Sign out when you finish on a shared computer, and use a private browsing window on a public one",
      "Find the Security & sign-in page in your Google Account and check whether 2-Step Verification is on",
    ],
    duration: "20 min",
    slides: slides("signing-in-and-staying-secure", [
      "Signing in: email, password, then a second step",
      "2-Step Verification: something you know plus something you have",
      "Second steps you can use: Google prompts, passkeys and security keys, authenticator codes, text codes, backup codes",
      "Never approve a sign-in you did not start",
      "Shared and public computers: sign out, or use a private window",
      "Quick check: safe or risky?",
    ]),
    sections: [
      {
        heading: "One account opens everything",
        blocks: [
          {
            type: "scenario",
            role: "You are covering the front desk at Parkview Property Management.",
            text: "The front desk computer is shared by everyone who covers the desk: you, Andre the leasing agent, and sometimes Kim from maintenance. Your Google account opens your email, every shared file, and the tenant contact list. If you leave it signed in, the next person at the desk is working as you.",
            task: "Sign in safely, understand the 2-Step Verification prompt, and always leave the shared computer signed out.",
          },
          {
            type: "paragraph",
            text: "Your Google account is the key to every app in Google Workspace. Because one account opens your email, your files, and your calendar, protecting it protects all of them. Two habits do most of the work: turning on 2-Step Verification and signing out of shared computers.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Open a web browser and go to drive.google.com (or any Google app, such as mail.google.com).",
              "In Email or phone, type your account address and click Next.",
              "Type your password and click Next.",
              "If 2-Step Verification is on, complete the second step, such as tapping Yes on your phone.",
              "The app opens. Your profile picture or initial at the top right shows which account you are using.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the sign-in steps in order",
            prompt: "Drag the steps into the order you do them.",
            items: [
              { id: "s1", text: "Go to drive.google.com in a browser" },
              { id: "s2", text: "Type your email address and click Next" },
              { id: "s3", text: "Type your password and click Next" },
              { id: "s4", text: "Tap Yes on the prompt on your phone" },
              { id: "s5", text: "Check the profile picture at the top right" },
            ],
            explanation: "Email first, then password, then the second step. Checking the profile picture confirms you are in the right account, which matters when a computer has been used by someone else.",
          },
        ],
      },
      {
        heading: "2-Step Verification",
        blocks: [
          {
            type: "paragraph",
            text: "With 2-Step Verification, signing in takes something you know (your password) and something you have (usually your phone). If someone steals or guesses your password, they still cannot get in without the second step.",
          },
          {
            type: "table",
            caption: "Second steps Google offers",
            columns: ["Second step", "How it works"],
            rows: [
              ["Google prompts", "A notification on your signed-in phone asks if you are trying to sign in. You tap Yes or No."],
              ["Passkeys and security keys", "Your phone, computer, or a small hardware key confirms it is you, often with your fingerprint, face, or screen lock."],
              ["Authenticator app", "An app such as Google Authenticator shows a one-time code. It works without internet or cell service."],
              ["Text message or call", "Google sends a 6-digit code to your phone number. Google notes these codes can be vulnerable to phone-number scams."],
              ["Backup codes", "A printed list of 8-digit codes for when you do not have your phone. Keep them private and somewhere safe."],
            ],
          },
          {
            type: "list",
            items: [
              "To turn it on in a personal account: go to myaccount.google.com, select Security & sign-in, and under How you sign in to Google, choose Turn on 2-Step Verification. Follow the steps on the screen.",
              "In a work or school account, your administrator may already require it or may manage it for you. If the steps do not work, contact your administrator.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "If a sign-in prompt appears on your phone and you are not signing in, tap No, it's not me. A prompt you did not start means someone may know your password. Change your password and tell your supervisor or IT. Never approve a prompt because a caller or a text message tells you to.",
          },
        ],
      },
      {
        heading: "Shared and public computers",
        blocks: [
          {
            type: "table",
            caption: "What to do on each kind of computer",
            columns: ["Computer", "What to do when you finish"],
            rows: [
              ["Your own computer", "You can stay signed in. Lock the screen when you step away (Windows key + L)."],
              ["A shared work computer, like the front desk", "Sign out: click your profile picture at the top right, then Sign out. Do not let the browser save your password."],
              ["A public computer, like a library", "Sign in only in a private browsing window (Incognito in Chrome, InPrivate in Edge). When you finish, close every private window and you are signed out."],
            ],
          },
          {
            type: "paragraph",
            text: "Forgot to sign out somewhere? Go to your Google Account, open Your devices, and use Manage devices to remove the computer you no longer use. If your password could have been saved on someone else's computer, change it.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Safe or risky?",
            prompt: "Sort each habit.",
            buckets: [
              { id: "safe", label: "Safe habit" },
              { id: "risky", label: "Risky habit" },
            ],
            items: [
              { id: "h1", text: "Signing out of the front desk computer before you go to lunch", bucket: "safe" },
              { id: "h2", text: "Clicking Save password on the shared front desk computer", bucket: "risky" },
              { id: "h3", text: "Tapping No, it's not me on a sign-in prompt you did not start", bucket: "safe" },
              { id: "h4", text: "Approving a sign-in prompt because a caller says he is from IT", bucket: "risky" },
              { id: "h5", text: "Using an Incognito window to check your account at the library", bucket: "safe" },
              { id: "h6", text: "Using the same password for your Google account and a shopping site", bucket: "risky" },
            ],
            explanation: "Safe habits keep other people from working as you: sign out, do not save passwords on shared computers, use private windows on public ones, and never approve a sign-in you did not start.",
          },
          {
            type: "tip",
            text: "Use a long password you do not use anywhere else. A short sentence of unrelated words is easier to remember and harder to guess than a short word with symbols.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are not signing in anywhere, and your phone shows a Google prompt: Are you trying to sign in? What should you do?",
            options: ["Tap Yes so the prompt goes away", "Ignore it", "Tap No, it's not me, then change your password and tell IT", "Turn off 2-Step Verification"],
            correctIndex: 2,
            explanation: "A prompt you did not start means someone has your password and is trying to get in. Block it, change your password, and report it.",
            optionRationales: [
              "Tapping Yes lets the other person into your account.",
              "Ignoring it leaves your password in someone else's hands.",
              "Correct. Block the sign-in, change the password, and report it.",
              "2-Step Verification just stopped the intruder. Turning it off makes things worse.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You checked the shared calendar on the front desk computer. What do you do before you leave the desk?",
            options: ["Close the browser tab", "Sign out: profile picture, then Sign out", "Minimize the browser", "Nothing, the next person uses the same account"],
            correctIndex: 1,
            explanation: "Closing a tab or minimizing the window can leave you signed in. Sign out from your profile picture so the next person cannot work as you.",
            optionRationales: [
              "Closing a tab often leaves you signed in for the next person.",
              "Correct. Signing out ends your session on that computer.",
              "Minimizing hides the window. You are still signed in.",
              "Everyone has their own account. Sharing one account hides who did what.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Check the security of your own Google account. Use a personal Google account, on your own device if you can." },
      {
        type: "list",
        ordered: true,
        items: [
          "Go to myaccount.google.com and sign in.",
          "Select Security & sign-in.",
          "Under How you sign in to Google, find 2-Step Verification. Write down whether it is on or off.",
          "Write down which second steps your account has (for example, Google prompts, an authenticator app, or backup codes). Do not write down any codes or phone numbers.",
          "If 2-Step Verification is off and this is your own account, turn it on and follow the steps on the screen.",
          "Sign out when you finish: profile picture at the top right, then Sign out.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a short note to your instructor or course folder: is 2-Step Verification on, which kinds of second step you have, and one thing you will do differently on shared computers. If you cannot use a Google account, complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "getting-around-the-apps",
    title: "Getting Around Drive, Docs, Sheets, and Slides",
    description:
      "Move between the Google apps, start a new file from a blank page or a template, and learn the parts of the screen that every Google editor shares.",
    objectives: [
      "Open Docs, Sheets, and Slides from the Google apps menu and from their home screens",
      "Start a new file from a blank page or a template, and give it a clear name",
      "Name the parts of a Google editor: title, menus, toolbar, document status, version history, comments, and Share",
      "Find any command with Search the menus (Alt+/)",
    ],
    duration: "20 min",
    slides: slides("getting-around-the-apps", [
      "Getting around: the Google apps menu and each app's home screen",
      "A home screen: Start a new file, Template gallery, Recent files",
      "Every editor has the same parts",
      "Name your file the moment you create it",
      "Search the menus: Alt+/ finds any command",
      "Quick check: where would you click?",
    ]),
    sections: [
      {
        heading: "Moving between apps",
        blocks: [
          {
            type: "scenario",
            role: "You are setting up your first files at Parkview Property Management.",
            text: "Denise asks you to start a letter to a vendor and a supply order spreadsheet. You know Word and Excel, but the Google apps are new, and you want to stop guessing where things are.",
            task: "Open the right app, start each file from a blank page or a template, name it, and find commands quickly.",
          },
          {
            type: "list",
            items: [
              "The Google apps menu is the grid of dots at the top right of Drive, Gmail, and the app home screens. Click it, then click an app. The order of the apps is set by Google; you cannot rearrange them.",
              "Each app also has its own address: docs.google.com, sheets.google.com, slides.google.com, drive.google.com, mail.google.com, calendar.google.com.",
              "In an open document, click the Docs (or Sheets or Slides) logo at the top left to go back to that app's home screen.",
              "Every file opens in its own browser tab, so you can keep Drive in one tab and your document in another.",
            ],
          },
        ],
      },
      {
        heading: "Home screens and templates",
        blocks: [
          {
            type: "paragraph",
            text: "Docs, Sheets, and Slides each open to a home screen. Across the top is Start a new document (or spreadsheet, or presentation) with a Blank option and a few templates. Template gallery at the top right shows more. Below that is a list of your recent files.",
          },
          {
            type: "table",
            caption: "Ways to start a new file",
            columns: ["From", "How", "Same as in Microsoft Office"],
            rows: [
              ["An app's home screen", "Click Blank, or click a template", "File › New in Word or Excel"],
              ["Drive", "New › Google Docs (or Sheets, Slides) › Blank document or From a template", "Creating a file in a OneDrive folder"],
              ["Inside Docs", "File › New › Document, or From a template", "File › New in Word"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "A file you start from a home screen is saved in My Drive. A file you start with New in a Drive folder is saved in that folder. Either way, you can move it later.",
          },
          {
            type: "paragraph",
            text: "A new file is named Untitled document (or Untitled spreadsheet). Rename it right away so you and your coworkers can find it: click the name at the top left, type a clear name such as Parkview Supply Order, and press Enter.",
          },
        ],
      },
      {
        heading: "The parts of every editor",
        blocks: [
          {
            type: "table",
            caption: "Parts of the Docs, Sheets, and Slides screen",
            columns: ["Part", "Where", "What it does"],
            rows: [
              ["App logo", "Top left", "Goes back to the app's home screen"],
              ["File name", "Next to the logo", "Click it to rename the file"],
              ["Star, Move, and document status", "Right of the file name", "Star the file, move it to a folder, and see that changes are saved to Drive"],
              ["Menus", "Under the file name", "File, Edit, View, Insert, Format, and more. Like Word's Ribbon tabs"],
              ["Toolbar", "Under the menus", "One-click formatting: undo, print, styles, font, bold, and more"],
              ["Version history", "Top right (the clock icon, Last edit)", "See and restore earlier versions"],
              ["Comments", "Top right", "Open the comment history"],
              ["Share", "Top right", "Give people access to the file"],
              ["Profile picture", "Top right", "Shows which account you are using, and signs you out"],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Where would you click?",
            prompt: "Match each job to the part of the screen that does it.",
            items: [
              { id: "p1", text: "Rename the file", match: "The file name at the top left" },
              { id: "p2", text: "Give Kim access to the file", match: "Share at the top right" },
              { id: "p3", text: "See an earlier version", match: "Version history (the clock icon)" },
              { id: "p4", text: "Make text bold", match: "The toolbar" },
              { id: "p5", text: "Go back to the Docs home screen", match: "The Docs logo at the top left" },
            ],
            explanation: "The editors share one layout: the name and status across the top, menus and toolbar below, and Share, comments, and version history at the top right.",
          },
        ],
      },
      {
        heading: "Find any command",
        blocks: [
          {
            type: "paragraph",
            text: "Can't find a command? Click Search the menus (the magnifying glass at the left end of the toolbar) or press Alt+/ and type what you want, like word count or page setup. Press Enter to run the first match. Ctrl+/ shows the keyboard shortcuts.",
          },
          {
            type: "table",
            caption: "Shortcuts that work like Microsoft Office",
            columns: ["Shortcut", "What it does"],
            rows: [
              ["Ctrl+B, Ctrl+I, Ctrl+U", "Bold, italic, underline"],
              ["Ctrl+Z, Ctrl+Y", "Undo, redo"],
              ["Ctrl+C, Ctrl+X, Ctrl+V", "Copy, cut, paste"],
              ["Ctrl+K", "Insert a link"],
              ["Ctrl+P", "Print"],
              ["Alt+/", "Search the menus"],
            ],
          },
          {
            type: "tip",
            text: "Ctrl+S does nothing harmful in Google's editors, but you never need it. Look for Saved to Drive by the document status icon if you want to be sure.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You started a document from the Docs home screen and it is called Untitled document. What is the fastest way to rename it?",
            options: ["File › Save as", "Click the name at the top left, type the new name, press Enter", "Download it with a new name", "Close the tab and rename it in File Explorer"],
            correctIndex: 1,
            explanation: "The file name at the top left is a box you can click and type in. The new name is saved right away.",
            optionRationales: [
              "Google's editors do not have Save as. Use the name box or File › Rename.",
              "Correct. Click the name, type, and press Enter.",
              "Downloading makes a copy on the computer. The file in Drive keeps the old name.",
              "Google files live in Drive, not in File Explorer.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You need Page setup but cannot find it. What is the quickest way?",
            options: ["Press Alt+/ and type page setup", "Look on every toolbar button", "Reinstall Google Docs", "Ask a coworker to do it"],
            correctIndex: 0,
            explanation: "Search the menus (Alt+/) finds any command by name.",
            optionRationales: [
              "Correct. Search the menus finds the command and runs it.",
              "Page setup is in the File menu, not on the toolbar. Searching is faster.",
              "Google Docs runs in the browser, so there is nothing to install.",
              "You can find it yourself in seconds with Search the menus.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice in your own Google account." },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Google Docs from the Google apps menu. Start a document from any template in the Template gallery.",
          "Rename it Template Practice - your first name.",
          "Use Search the menus (Alt+/) to open Word count. Write down the number of words.",
          "Click the Docs logo to go back to the home screen. Find your new document under Recent documents.",
          "Open Google Sheets from the Google apps menu and start a blank spreadsheet. Rename it Supply Order Practice.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the word count and a screenshot of your Docs home screen showing your renamed document to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "working-with-office-files",
    title: "Working with Microsoft Office Files",
    description:
      "Open and edit Word, Excel, and PowerPoint files without converting them, convert one to a Google file when you need to, and download Google files as Office files or PDFs.",
    objectives: [
      "Open and edit a Word, Excel, or PowerPoint file from Drive and keep it in its Office format",
      "Convert an Office file with File › Save as Google Docs, Sheets, or Slides, and explain why that makes a copy",
      "Download a Google file as a Microsoft Office file or a PDF",
      "Choose the right format to send to someone outside your company",
    ],
    duration: "20 min",
    slides: slides("working-with-office-files", [
      "Office files in Google Workspace: open, edit, convert, download",
      "Office editing: the .DOCX chip means it stays a Word file",
      "Save as Google Docs makes a Google copy; the Office file stays as it was",
      "File › Download: Word, Excel, PowerPoint, PDF",
      "Which format should you send?",
      "Quick check: edit, convert, or download?",
    ]),
    sections: [
      {
        heading: "Office files keep arriving",
        blocks: [
          {
            type: "scenario",
            role: "You handle the paperwork that comes into the Parkview office.",
            text: "Not everyone uses Google Workspace. Russo Plumbing emails its invoices as Excel files, the lease renewal notice came from the company lawyer as a Word file, and a tenant who uses Word asked for the move-in checklist in Word. Parkview's files live in Drive, so you need to handle all of these without retyping anything.",
            task: "Edit Office files in Drive, convert them when you need Google features, and send people the format they can use.",
          },
          {
            type: "paragraph",
            text: "Drive stores any kind of file. When you double-click a Word, Excel, or PowerPoint file in Drive, it opens in Google Docs, Sheets, or Slides. You can read it, edit it, and comment on it. Your changes are saved back to the original Office file.",
          },
        ],
      },
      {
        heading: "Office editing: keep the Office format",
        blocks: [
          {
            type: "list",
            items: [
              "An Office file shows its file type in a small chip next to the name at the top left, such as .DOCX, .XLSX, or .PPTX.",
              "Edits save automatically, in the Office format. Someone who downloads the file later gets a normal Word, Excel, or PowerPoint file.",
              "Drive's Office editing works with Word (.doc, .docx, .dot), Excel (.xls, .xlsx, .xlsm, .xlt), and PowerPoint (.ppt, .pptx, .pps, .pot) files.",
            ],
          },
          {
            type: "paragraph",
            text: "Some features work only in Google files, such as protected ranges in Sheets, add-ons, Apps Script, and translating a document. To use them, convert the file: open it, then choose File › Save as Google Docs (or Save as Google Sheets, Save as Google Slides).",
          },
          {
            type: "callout",
            variant: "info",
            text: "Converting makes a copy. The original Office file stays in Drive, unchanged, and the new Google file opens in a new tab. Rename or delete the one you do not need so coworkers do not edit the wrong copy.",
          },
        ],
      },
      {
        heading: "Download as Office or PDF",
        blocks: [
          {
            type: "paragraph",
            text: "To send someone a file they can open without Google, download it in another format: open the file and choose File › Download, then pick the format. The download goes to your computer's Downloads folder, and you can attach it to an email. The file in Drive does not change.",
          },
          {
            type: "table",
            caption: "Common File › Download formats",
            columns: ["App", "Format", "Use it when"],
            rows: [
              ["Docs", "Microsoft Word (.docx)", "The other person needs to edit it in Word"],
              ["Docs", "PDF Document (.pdf)", "The other person only needs to read, print, or sign it"],
              ["Sheets", "Microsoft Excel (.xlsx)", "The other person needs to work with the numbers in Excel"],
              ["Sheets", "Comma Separated Values (.csv)", "Another system needs the data (a CSV file holds one sheet of plain data)"],
              ["Slides", "Microsoft PowerPoint (.pptx)", "The presenter uses PowerPoint"],
              ["Slides", "PDF Document (.pdf)", "People only need to read the slides"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "What should you send?",
            prompt: "Sort each request.",
            buckets: [
              { id: "pdf", label: "Download a PDF" },
              { id: "office", label: "Download an Office file" },
              { id: "share", label: "Share the Google file" },
            ],
            items: [
              { id: "r1", text: "A tenant needs to print and sign the move-in checklist", bucket: "pdf" },
              { id: "r2", text: "The lawyer will edit the lease notice in Word", bucket: "office" },
              { id: "r3", text: "Marcus, at Parkview, needs to add notes to the notice", bucket: "share" },
              { id: "r4", text: "The accountant wants the rent totals in Excel", bucket: "office" },
              { id: "r5", text: "A building notice will be posted on the lobby board", bucket: "pdf" },
              { id: "r6", text: "Kim and Denise will update the maintenance log together", bucket: "share" },
            ],
            explanation: "Inside Parkview, share the one Google file. Outside, send a PDF when people only read or print, and an Office file when they need to edit in Microsoft Office.",
          },
          {
            type: "worked-example",
            title: "The lease renewal notice",
            task: "The lawyer sent Lease Renewal Notice.docx. Denise wants it styled like Parkview's other notices and kept as a Google Doc, and a tenant needs a copy to print.",
            steps: [
              { move: "Double-click the .docx file in Drive.", why: "It opens in Docs with the .DOCX chip, so you can check it right away without converting." },
              { move: "File › Save as Google Docs.", why: "Denise wants a Google Doc, and converting gives you a Google copy while the lawyer's original stays as it was." },
              { move: "Format the Google copy.", why: "Edits now go into Parkview's Google Doc, not the lawyer's file." },
              { move: "File › Download › PDF Document (.pdf) for the tenant.", why: "A PDF prints the same on any computer and cannot be changed by accident." },
            ],
            result: "A Google Doc for the office and a PDF for the tenant, with the lawyer's original untouched.",
            takeaway: "Edit Office files in place when you only need a quick change; convert when Parkview will keep and maintain the file.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You open Russo Plumbing Invoice.xlsx from Drive and fix a typo. What happens?",
            options: [
              "The change is lost because Sheets cannot edit Excel files",
              "The change is saved in the original Excel file",
              "Drive makes a Google Sheets copy automatically",
              "You must download the file to save the change",
            ],
            correctIndex: 1,
            explanation: "Office editing saves your changes back to the Office file in its original format.",
            optionRationales: [
              "Sheets edits Excel files directly with Office editing.",
              "Correct. The .XLSX chip shows it is still an Excel file, and your change is saved in it.",
              "A Google copy is made only when you choose File › Save as Google Sheets.",
              "Changes save automatically. Downloading is only for sending a copy.",
            ],
          },
          {
            type: "knowledge-check",
            question: "You chose File › Save as Google Docs on a Word file. What is in Drive now?",
            options: ["Only the Google Doc", "Only the Word file", "Both: the original Word file and a new Google Doc", "A PDF"],
            correctIndex: 2,
            explanation: "Converting makes a copy. The Word file stays, and the Google Doc opens in a new tab.",
            optionRationales: [
              "The original is not deleted when you convert.",
              "Converting adds a Google Doc next to the Word file.",
              "Correct. You now have two files. Remove or rename the one you do not need.",
              "PDF is a download format, not what Save as Google Docs makes.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Practice with your own Google account and any Word file (or download one of your Google Docs as Word first)." },
      {
        type: "list",
        ordered: true,
        items: [
          "Upload a Word file to My Drive (New › File upload), or create a Google Doc and download it with File › Download › Microsoft Word (.docx), then upload that .docx.",
          "Double-click the Word file in Drive. Find the .DOCX chip next to the name.",
          "Make one small change, then choose File › Save as Google Docs. Check that Drive now has both files.",
          "In the Google Doc, choose File › Download › PDF Document (.pdf). Open the PDF from your Downloads folder.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a screenshot of Drive showing both the Word file and the Google Doc, plus the PDF, to your instructor or course folder. No Google account? Complete the practice simulation and submit its results page.",
      },
    ],
  },
];
