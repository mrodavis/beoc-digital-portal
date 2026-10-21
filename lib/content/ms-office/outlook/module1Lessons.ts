import { Lesson } from "@/types/lesson";
import { outlookSlides } from "./slides";

const IMG = "/images/ms-office/outlook/module-1";

export const outlookModule1Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "which-outlook",
    title: "Which Outlook Are You Using?",
    description:
      "Outlook comes in several versions that open the same mailbox. Learn to tell new Outlook for Windows, classic Outlook, Outlook on the web and the mobile app apart, and why this course teaches new Outlook first.",
    objectives: [
      "Name the versions of Outlook you will meet at work and at school: new Outlook for Windows, classic Outlook, Outlook on the web, and the Outlook mobile app",
      "Tell new Outlook from classic Outlook in a few seconds by looking for the Settings button and the File tab",
      "Explain why this course teaches new Outlook first and when you still need the classic Outlook steps",
      "Describe the Microsoft Office Specialist (MOS) exam that currently covers Outlook",
    ],
    duration: "12 min",
    slides: outlookSlides["module-1/which-outlook"],
    sections: [
      {
        heading: "Same mailbox, different windows",
        blocks: [
          {
            type: "scenario",
            role: "You are the new front desk coordinator at Lakeside Medical Associates.",
            text: "On your first morning, Denise Carter, the office manager, emails you the front desk training binder. Every screenshot in it shows a File tab. Your desk computer shows no File tab at all, just Home, View and Help, and a switch at the top that says New Outlook. That evening you check the same mailbox in a web browser at home, and it looks almost like your desk computer. Same messages, three different windows.",
            task: "Figure out which Outlook you are looking at, so you know which set of instructions to follow.",
          },
          {
            type: "paragraph",
            text: "Outlook is not one program. When your employer or school uses Microsoft 365, your mail, calendar and contacts live in your organization's mailbox on Microsoft's servers. Each version of Outlook is a different window onto that same mailbox. A message you file in a folder on your desk computer is already in that folder when you open Outlook on your phone, because you moved it on the server, not on the computer.",
          },
          {
            type: "table",
            caption: "The versions of Outlook you are most likely to meet",
            columns: ["Version", "Where it runs", "How to recognize it"],
            rows: [
              ["New Outlook for Windows", "An app on Windows 11 and Windows 10 computers", "A Settings button (gear) at the top right. Ribbon tabs Home, View and Help. No File tab."],
              ["Classic Outlook", "The desktop app that comes with Microsoft 365 Apps or Office", "A File tab at the left end of the Ribbon. May show a Try the new Outlook switch."],
              ["Outlook on the web", "Any web browser, after you sign in with a work or school account", "Looks almost the same as new Outlook, inside a browser tab."],
              ["Outlook mobile", "The Outlook app for iPhone and Android phones", "Built for a small screen. Covered in the last module."],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Microsoft built new Outlook for Windows from Outlook on the web. The two share the same layout, the same Settings pages and most of the same features. If you learn one, you can use the other.",
          },
        ],
      },
      {
        heading: "How to tell which one you have",
        blocks: [
          {
            type: "paragraph",
            text: "Microsoft's own test is simple. Look at the top right corner of the window. If you see a Settings button, the gear icon, you have the new Outlook. If the Settings button is missing, you are in classic Outlook. The Ribbon gives you a second clue: new Outlook shows the tabs Home, View and Help, and classic Outlook has a File tab at the left end of the Ribbon.",
          },
          {
            type: "image",
            src: `${IMG}/new-outlook-window.png`,
            alt: "The new Outlook for Windows window: Search box at the top center, Settings and My Day buttons at the top right, Home, View and Help tabs, the navigation bar on the left with Mail, Calendar, People and To Do, the folder pane, the message list and the reading pane",
            caption: "New Outlook: Settings at the top right, Home, View and Help tabs, and no File tab.",
          },
          {
            type: "table",
            caption: "Where to find version details",
            columns: ["In this version", "Go to"],
            rows: [
              ["New Outlook for Windows", "Settings › General › About Outlook"],
              ["Classic Outlook", "File › Office Account (or File › Help on some installations)"],
            ],
          },
          {
            type: "worked-example",
            title: "Helping a coworker over the phone",
            task: "Omar calls from the back office: \"Denise told me to change my signature, but I can't find File › Options.\" Work out which Outlook he has before giving directions.",
            steps: [
              {
                move: "Ask him to look at the top right corner of the Outlook window and tell you whether there is a gear icon.",
                why: "The gear is the quickest test Microsoft gives. It does not depend on window size or on which tab is open.",
              },
              {
                move: "He says yes, there is a gear, and the tabs say Home, View and Help.",
                why: "Two clues agree: that is new Outlook. File › Options is a classic Outlook path, which is why he can't find it.",
              },
              {
                move: "Give him the new Outlook path: Settings › Accounts › Signatures.",
                why: "Directions only help if they match the version on the screen. Most confusion with Outlook help articles comes from following classic steps in new Outlook, or the other way around.",
              },
            ],
            result: "Omar finds the Signatures page in under a minute.",
            takeaway: "Before you give or follow Outlook directions, check for the Settings gear. It tells you which set of steps applies.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "New Outlook or classic Outlook?",
            prompt: "Sort each clue into the version of Outlook it points to.",
            buckets: [
              { id: "new", label: "New Outlook for Windows" },
              { id: "classic", label: "Classic Outlook" },
            ],
            items: [
              { id: "i1", text: "A Settings button (gear) at the top right", bucket: "new" },
              { id: "i2", text: "A File tab at the left end of the Ribbon", bucket: "classic" },
              { id: "i3", text: "Only Home, View and Help tabs when you are reading mail", bucket: "new" },
              { id: "i4", text: "A Try the new Outlook switch at the top right", bucket: "classic" },
              { id: "i5", text: "Version details under Settings › General › About Outlook", bucket: "new" },
              { id: "i6", text: "AutoArchive, which moves old mail on a schedule", bucket: "classic" },
              { id: "i7", text: "A Sweep button for clearing out mail from one sender", bucket: "new" },
            ],
            explanation:
              "The gear and the Home, View and Help tabs mean new Outlook. A File tab means classic Outlook. Microsoft's feature comparison lists Sweep as a new Outlook feature and says AutoArchive is not available in new Outlook.",
          },
        ],
      },
      {
        heading: "Why this course teaches new Outlook first",
        blocks: [
          {
            type: "paragraph",
            text: "Microsoft is moving organizations from classic Outlook to new Outlook in stages. Recent versions of Windows 11 already include the new Outlook app. In organizations that use Microsoft 365, new Outlook is being turned on by default, while people can still switch back to classic Outlook during the move. Microsoft has said it will keep supporting classic Outlook until at least 2029, so you will see both for years. New Outlook is where Microsoft is adding new features, and it matches Outlook on the web, which is what many schools and clinics give staff and students in a browser.",
          },
          {
            type: "list",
            items: [
              "Every lesson teaches the new Outlook steps first. The practice simulations are copies of the new Outlook window.",
              "Where classic Outlook works differently, you will see a Classic Outlook note with the classic steps, so you can follow along on either version.",
              "Some features exist in only one version. For example, Undo send and Sweep are new Outlook features, while AutoArchive is classic Outlook only. The lessons point these out.",
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: if your computer shows a File tab, you are using classic Outlook. The ideas in this course are the same. Look for the Classic Outlook notes for the click paths that differ, such as File › Options, File › Automatic Replies and Home › Rules.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Mailbox", definition: "Your organization's copy of your mail, calendar, contacts and tasks, stored on the mail server. Every Outlook app shows the same mailbox." },
              { term: "Work or school account", definition: "The Microsoft 365 account your employer or school gives you. Shared mailboxes, Teams meetings and encryption need one." },
              { term: "New Outlook for Windows", definition: "The current Outlook app for Windows, built from Outlook on the web. It has a Settings button and no File tab." },
              { term: "Classic Outlook", definition: "The long-standing desktop Outlook with a File tab. Still supported and still common in offices." },
              { term: "Outlook on the web", definition: "Outlook in a web browser. Nearly identical to new Outlook for Windows." },
            ],
          },
        ],
      },
      {
        heading: "Certification: the MOS Outlook exam",
        blocks: [
          {
            type: "paragraph",
            text: "Microsoft Office Specialist (MOS) certifications are run by Certiport. The Microsoft 365 Apps series of MOS exams covers Word, Excel and PowerPoint, but it has no Outlook exam. The Outlook exam Certiport currently lists is Outlook Associate (Office 2019), exam MO-400, and Microsoft's exam page shows no retirement date for it.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "MO-400 is based on classic Outlook 2019, not new Outlook. If you plan to take it, practice the classic Outlook steps in the Classic Outlook notes, and check Certiport's current exam list before you register, because exams are added and retired over time.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A coworker's Outlook window has a File tab at the left end of the Ribbon and no gear icon at the top right. Which Outlook is it?",
            options: ["New Outlook for Windows", "Classic Outlook", "Outlook on the web", "Outlook mobile"],
            correctIndex: 1,
            explanation: "A File tab and no Settings button are the signs of classic Outlook. New Outlook and Outlook on the web have a Settings gear and no File tab.",
            optionRationales: [
              "New Outlook has a Settings gear at the top right and no File tab.",
              "Correct. The File tab is classic Outlook's home for options, accounts and automatic replies.",
              "Outlook on the web runs in a browser and, like new Outlook, uses a Settings gear.",
              "The mobile app is built for a phone screen and has no Ribbon at all.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Why can you follow most of this course in Outlook on the web as well as in new Outlook for Windows?",
            options: [
              "Outlook on the web is a copy of classic Outlook",
              "New Outlook for Windows was built from Outlook on the web, so they share the same layout and settings",
              "Both versions store mail only on your own computer",
              "Outlook on the web has more features than any other version",
            ],
            correctIndex: 1,
            explanation: "Microsoft built new Outlook for Windows from Outlook on the web. The Settings pages, Ribbon tabs and most features match.",
            optionRationales: [
              "Outlook on the web looks like new Outlook, not classic Outlook.",
              "Correct. They share the same design, so the same steps work in both.",
              "Your mail is stored in your organization's mailbox on the server, which is why every version shows the same messages.",
              "This isn't the reason. The two versions match because they share the same design.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which Microsoft Office Specialist exam currently covers Outlook?",
            options: [
              "An Outlook exam in the Microsoft 365 Apps series",
              "Outlook Associate (Office 2019), exam MO-400",
              "There has never been an Outlook MOS exam",
              "The Word Associate exam, which includes email",
            ],
            correctIndex: 1,
            explanation: "Certiport lists Outlook Associate (Office 2019), exam MO-400. The Microsoft 365 Apps series has no Outlook exam.",
            optionRationales: [
              "The Microsoft 365 Apps series covers Word, Excel and PowerPoint, but not Outlook.",
              "Correct. MO-400 is based on classic Outlook 2019.",
              "There have been Outlook MOS exams for several Office versions. MO-400 is the one listed now.",
              "Word Associate tests Word skills only.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Find out which Outlook you have, and write directions a coworker could follow.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Outlook on a computer you use (a school computer is fine), or sign in to Outlook on the web with your school account. If you can't open Outlook at all, use the practice simulation in this lesson.",
          "Decide which version it is. Write down the two clues you used (for example, the Settings gear and the Ribbon tabs).",
          "Find where the version details are (Settings › General › About Outlook in new Outlook, or File › Office Account in classic Outlook) and write down what you see. Do not include your email address.",
          "Write three or four sentences to a new Lakeside coworker explaining how to tell new Outlook from classic Outlook, and why it matters when they follow help articles.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your notes (version, two clues, what About Outlook or Office Account shows) and your three or four sentences to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "outlook-window",
    title: "Finding Your Way Around Outlook",
    description:
      "Learn the parts of the new Outlook window, move between Mail, Calendar, People and To Do, and arrange the window so the front desk inbox is easy to work through.",
    objectives: [
      "Identify the title bar, Ribbon, navigation bar, folder pane, message list and reading pane in new Outlook",
      "Switch between Mail, Calendar, People and To Do",
      "Show or hide the folder pane and move the reading pane",
      "Use the Search box, the Settings button and My Day",
    ],
    duration: "14 min",
    slides: outlookSlides["module-1/outlook-window"],
    sections: [
      {
        heading: "A window built for scanning",
        blocks: [
          {
            type: "scenario",
            role: "You share the front desk computer at Lakeside Medical Associates.",
            text: "Omar works the early shift and likes the reading pane at the bottom and the folder list hidden. When you sit down at 10:00, the window looks nothing like yours, a patient is waiting, and you can't find the Junk Email folder.",
            task: "Learn what each part of the window is for, so you can put it back the way you work in a few clicks.",
          },
          {
            type: "paragraph",
            text: "New Outlook arranges everything from left to right in the order you use it: pick an app, pick a folder, pick a message, read it. Knowing the names of the parts matters, because help articles and coworkers use them: \"select the folder pane,\" \"open the reading pane.\"",
          },
          {
            type: "table",
            caption: "Parts of the new Outlook window",
            columns: ["Part", "Where", "What it does"],
            rows: [
              ["Title bar", "Very top", "The Search box in the center. Settings, My Day and Notifications on the right."],
              ["Ribbon", "Below the title bar", "Tabs (Home, View, Help) and one row of commands. When you write a message, Message, Insert, Format text and Options tabs appear."],
              ["Navigation bar", "Far left edge", "Switches between Mail, Calendar, People and To Do. Also has icons for other Microsoft 365 apps."],
              ["Folder pane", "Left, next to the navigation bar", "Favorites, then your folders: Inbox, Drafts, Sent Items, Deleted Items, Junk Email, Archive and any folders you make."],
              ["Message list", "Center", "The messages in the folder you chose, newest first, with Focused and Other tabs in the Inbox."],
              ["Reading pane", "Right (or bottom)", "Shows the selected message, and is where replies and new messages open."],
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match each part to its job",
            prompt: "Drag each job onto the part of the Outlook window that does it.",
            items: [
              { id: "p1", text: "Navigation bar", match: "Switch from Mail to Calendar" },
              { id: "p2", text: "Folder pane", match: "Open the Junk Email folder" },
              { id: "p3", text: "Message list", match: "See every message in the Inbox, newest first" },
              { id: "p4", text: "Reading pane", match: "Read the selected message without opening a window" },
              { id: "p5", text: "Search box", match: "Find every message that mentions a claim number" },
              { id: "p6", text: "Settings button", match: "Change your signature or automatic replies" },
            ],
            explanation: "The window reads left to right: navigation bar (which app), folder pane (which folder), message list (which message), reading pane (the message itself). Search and Settings sit in the title bar so they are always in the same place.",
          },
        ],
      },
      {
        heading: "The Ribbon in new Outlook",
        blocks: [
          {
            type: "paragraph",
            text: "When you are reading mail, the Ribbon has three tabs: Home for working with messages (New mail, Delete, Archive, Report, Sweep, Move to, Reply, Flag and more), View for arranging the window and opening View settings, and Help. New Outlook shows commands in a single row. When the window is too narrow for all of them, the rest move under More options, the three dots (…) at the right end of the row.",
          },
          {
            type: "list",
            items: [
              "When you start writing a message, new tabs appear: Message, Insert, Format text and Options. They disappear again when you send or discard the message.",
              "In Calendar and People, the Home tab changes to show the commands for that app, such as New event or New contact.",
              "Hover over a command to see its name. Commands with a small arrow open a menu.",
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: the Ribbon has more tabs (File, Home, Send / Receive, Folder, View, Help) and groups commands in labeled boxes. The navigation bar may be on the left edge or under the folder pane, depending on the version.",
          },
        ],
      },
      {
        heading: "Arranging the window",
        blocks: [
          {
            type: "list",
            items: [
              "Show or hide the folder pane with the button with three lines at the left end of the Ribbon tab row. Hiding it gives the message list more room on a small screen.",
              "Move the reading pane with View tab › Layout: show it on the right, on the bottom, or hide it. On a wide screen, the right side lets you see more messages at once.",
              "My Day, at the top right next to Notifications, opens a pane with today's calendar and your To Do tasks, so you can see your schedule while you read mail.",
              "Settings, the gear at the top right, opens every setting in one place, grouped as Accounts, General, Mail, Calendar and People. View tab › View settings opens the same page.",
            ],
          },
          {
            type: "tip",
            text: "Search sits at the top of the window no matter which app you are in. Type a name, a subject word or a claim number and press Enter. You will learn search filters in Module 3.",
          },
          {
            type: "worked-example",
            title: "Putting the front desk window back the way you work",
            task: "Omar left the reading pane at the bottom and the folder pane hidden. Restore your layout before the next patient arrives.",
            steps: [
              { move: "Select the three-line button at the left end of the Ribbon tab row.", why: "That button shows or hides the folder pane. You need it to reach Junk Email and your own folders." },
              { move: "On the View tab, open Layout and choose to show the reading pane on the right.", why: "Side by side, you can scan the list and read the selected message at the same time, which is faster on a wide monitor." },
              { move: "Open My Day from the top right.", why: "The front desk runs on the schedule. My Day keeps today's appointments in view while you work through the inbox." },
            ],
            result: "Folder pane showing, reading pane on the right, today's calendar in My Day. About four clicks.",
            takeaway: "Shared computers drift. Learn where the layout controls are so you can reset a window in seconds instead of working around it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Where do you switch from Mail to Calendar in new Outlook?",
            options: ["The File tab", "The navigation bar at the far left", "The Help tab", "The reading pane"],
            correctIndex: 1,
            explanation: "The navigation bar on the left edge switches between Mail, Calendar, People and To Do.",
            optionRationales: [
              "New Outlook has no File tab.",
              "Correct. Select Calendar on the navigation bar.",
              "The Help tab has help, support and feedback commands.",
              "The reading pane shows the selected message.",
            ],
          },
          {
            type: "knowledge-check",
            question: "A command you need isn't showing on the Home tab because the window is narrow. Where do you look?",
            options: ["Settings › General", "More options (…) at the right end of the command row", "The Help tab", "Restart Outlook"],
            correctIndex: 1,
            explanation: "New Outlook shows one row of commands. Commands that don't fit move under More options, the three dots at the right end.",
            optionRationales: [
              "Settings changes how Outlook behaves; it doesn't hold Ribbon commands.",
              "Correct. The three dots show the commands that didn't fit.",
              "The Help tab only has help commands.",
              "Restarting won't make a narrow window wider.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Write a one-page \"map\" of the Outlook window for a new Lakeside front desk worker.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Use your own Outlook (new Outlook or Outlook on the web) or the practice simulation in this lesson.",
          "List the six parts of the window (title bar, Ribbon, navigation bar, folder pane, message list, reading pane) and write one sentence about what each is for.",
          "Write the steps to show the reading pane on the right, to hide and show the folder pane, and to open Settings.",
          "Add one tip of your own that would help someone who shares a computer with another shift.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your one-page map (Word or Google Docs) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "reading-mail",
    title: "Reading and Managing Messages",
    description:
      "Read messages efficiently, use Focused and Other, delete, recover and archive messages, and group replies into conversations.",
    objectives: [
      "Mark messages as read or unread on purpose, so bold means \"still needs me\"",
      "Use the Focused and Other tabs and move a sender between them",
      "Delete, recover from Deleted Items, and archive messages",
      "Turn conversation grouping on or off in Settings",
    ],
    duration: "16 min",
    slides: outlookSlides["module-1/reading-mail"],
    sections: [
      {
        heading: "Every message gets a decision",
        blocks: [
          {
            type: "scenario",
            role: "You are covering the Lakeside front desk inbox this week.",
            text: "Denise's rule is simple: the Inbox holds only messages that still need action. On Monday morning there are a referral confirmation, a handout to print, two newsletters, a fridge temperature log the practice must keep, and an IT notice that is already out of date.",
            task: "Read each message once and decide right away: act, keep, or let it go.",
          },
          {
            type: "paragraph",
            text: "Reading mail is not the job; deciding is. A message that you read and leave in the Inbox will be read again tomorrow, and the day after. Make one decision per message the first time you open it.",
          },
          {
            type: "table",
            caption: "One decision per message",
            columns: ["If the message...", "Do this", "Where it goes"],
            rows: [
              ["Needs action you can't finish now", "Leave it in the Inbox, mark it unread or flag it", "Inbox"],
              ["Must be kept (records, logs, confirmations)", "Archive it, or move it to a folder", "Archive or a folder"],
              ["Is no longer useful", "Delete it", "Deleted Items"],
              ["Is a newsletter or promotion", "Read later in Other, or delete", "Other tab"],
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Act, keep, or let it go?",
            prompt: "Sort the front desk messages by what you should do with them after reading.",
            buckets: [
              { id: "act", label: "Act: keep in Inbox" },
              { id: "keep", label: "Keep: Archive or folder" },
              { id: "go", label: "Let go: Delete" },
            ],
            items: [
              { id: "a1", text: "Dr. Patel asks you to print 50 flu clinic handouts for Saturday", bucket: "act" },
              { id: "a2", text: "October vaccine fridge temperature log (practice must keep it)", bucket: "keep" },
              { id: "a3", text: "IT notice about badge readers that were replaced last week", bucket: "go" },
              { id: "a4", text: "Imaging center asks you to confirm you received a referral", bucket: "act" },
              { id: "a5", text: "Shipping confirmation for a supply order that already arrived", bucket: "keep" },
              { id: "a6", text: "Expired webinar invitation from a newsletter", bucket: "go" },
            ],
            explanation: "Messages that still need you stay in the Inbox. Records and confirmations the practice may need later are archived or filed. Anything with no future value is deleted. When you aren't sure whether a message is a record, archive it instead of deleting it.",
          },
        ],
      },
      {
        heading: "Read, unread, and opening messages",
        blocks: [
          {
            type: "list",
            items: [
              "Unread messages show in bold with a blue bar at the left edge. When you select a message and then move to another one, Outlook marks the first one as read.",
              "To keep a message bold as a reminder, select it and choose Read / Unread on the Home tab, or right-click it and choose Mark as unread.",
              "Point to a message in the list to see quick buttons for Delete, Mark as read or unread, Flag and Pin.",
              "Double-click a message to open it in its own window, which helps when you need to compare two messages.",
              "Attachments show as tiles above the message text. Never open an attachment you weren't expecting; you will learn why in Module 6.",
            ],
          },
        ],
      },
      {
        heading: "Focused Inbox: Focused and Other",
        blocks: [
          {
            type: "paragraph",
            text: "Focused Inbox splits the Inbox into two tabs. Focused holds the messages Outlook thinks matter most to you; Other holds the rest, such as newsletters and automated notices. You can teach it: right-click a message, choose Move, and pick Move to Other inbox or Move to Focused inbox. Choose Always move to Other inbox (or to Focused inbox) and future messages from that sender go there too.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Turn Focused Inbox on or off in Settings › Mail › Message list with the option Sort messages into Focused and Other. Microsoft notes that Focused Inbox doesn't work with shared mailboxes.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: turn Focused Inbox on or off on the View tab with Show Focused Inbox. Moving messages between Focused and Other works the same way, from the right-click menu.",
          },
        ],
      },
      {
        heading: "Delete, recover, and archive",
        blocks: [
          {
            type: "list",
            items: [
              "Delete moves a message to Deleted Items. It isn't gone yet: open Deleted Items, select the message, and use Move to › Inbox (or drag it back) to recover it.",
              "Archive moves a message to the Archive folder. Use it for mail you are finished with but must keep, such as logs and confirmations. Archived mail is still searchable.",
              "Archive is a filing step, not a storage saver: Microsoft notes that archiving doesn't reduce your mailbox size.",
              "Deleting from Deleted Items removes a message for good, depending on your organization's retention settings. When in doubt, archive instead of deleting.",
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: the Archive button is in the Delete group on the Home tab and works the same way. Classic Outlook also has AutoArchive, which new Outlook does not have.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "In a medical office, email about appointments, claims and referrals can be part of the practice's records. Never empty Deleted Items or delete groups of messages to make room without checking your practice's retention policy with your supervisor.",
          },
        ],
      },
      {
        heading: "Conversations",
        blocks: [
          {
            type: "paragraph",
            text: "With conversation grouping on, Outlook shows a message and all its replies as one item in the message list, so a long back-and-forth about one referral takes one line instead of eight. Change it in Settings › Mail › Reading pane, under Message organization: Group messages by conversation, Group messages by branches within conversations, or Do not group messages.",
          },
          {
            type: "callout",
            variant: "version",
            text: "Classic Outlook: turn conversations on or off on the View tab with Show as Conversations.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You deleted a message by mistake. Where do you find it?",
            options: ["Junk Email", "Archive", "Deleted Items", "It is gone"],
            correctIndex: 2,
            explanation: "Delete moves a message to Deleted Items. Open that folder and move the message back to the Inbox.",
            optionRationales: [
              "Junk Email holds messages Outlook thinks are spam or that came from blocked senders.",
              "Archive holds messages you chose to archive, not deleted ones.",
              "Correct. Deleted Items keeps deleted messages until the folder is emptied.",
              "A deleted message stays in Deleted Items until it is removed from there.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Every newsletter from Healthcare Admin Weekly lands in Focused. What is the best fix?",
            options: [
              "Delete each one when it arrives",
              "Right-click one › Move › Always move to Other inbox",
              "Turn off Focused Inbox",
              "Mark each one as read",
            ],
            correctIndex: 1,
            explanation: "Always move to Other inbox moves this message and sends future messages from the same sender to Other.",
            optionRationales: [
              "That works but you have to do it every week.",
              "Correct. Outlook remembers the sender from now on.",
              "Turning off Focused Inbox puts everything back into one list, which makes the problem worse.",
              "Marking as read hides the bold text but leaves the newsletters mixed in with patient mail.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Which message should you archive instead of delete?",
            options: ["An expired webinar invitation", "A duplicate copy of a message", "A referral confirmation from an imaging center", "A promotion from a vendor you don't use"],
            correctIndex: 2,
            explanation: "A referral confirmation may be needed later to show that the office received it. Archive keeps it out of the Inbox but keeps it searchable.",
            optionRationales: [
              "An expired invitation has no future value.",
              "A duplicate has no extra value; keep one copy.",
              "Correct. Confirmations and records are kept.",
              "Unwanted promotions can be deleted.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice the one-decision rule on a real list of messages.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Look at the first ten messages in your own Inbox (school or personal). If you don't have mail to use, use the ten messages from this lesson's practice simulation.",
          "For each message, write the subject (or a short description, without private details) and your decision: act (keep in Inbox), keep (archive or folder), or let go (delete). Add one sentence explaining each decision.",
          "If you are using your own mailbox, carry out the decisions. If you are using a school computer that limits your mailbox, do the practice simulation again instead.",
          "Write two sentences about which messages were hardest to decide and why.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your ten-message decision table and your two sentences to your instructor or course folder.",
      },
    ],
  },
];
