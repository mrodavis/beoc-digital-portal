import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/onedrive/module-6";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const onedriveModule6Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "onedrive-sharepoint-and-teams",
    title: "Where Files Live: OneDrive, SharePoint, and Teams",
    description:
      "Know where Teams stores the files you share in chats, channels, and meetings, find them in OneDrive, and add team folders to My files.",
    objectives: [
      "Explain where files shared in a Teams chat, a channel, and a meeting are stored",
      "Find Teams files in OneDrive: Microsoft Teams Chat Files, Recordings, Meetings, and Quick access",
      "Add a shortcut to a team library folder in My files",
      "Decide whether a file belongs in your OneDrive or in a team's library",
    ],
    duration: "15 min",
    slides: slides("onedrive-sharepoint-and-teams", [
      "One set of files, many doorways",
      "Teams chats: your OneDrive",
      "Teams channels: the team's SharePoint site",
      "Meeting recordings",
      "Find Teams files in OneDrive",
    ]),
    sections: [
      {
        heading: "Where did that Teams file go?",
        blocks: [
          {
            type: "scenario",
            role: "You use Teams and OneDrive every day at Lakeside.",
            text: "Kevin sent you a billing spreadsheet in a Teams chat last week. Maria posted the updated procedures in the Front Desk channel. And the Monday huddle was recorded. Today you need all three, and you only have OneDrive open.",
            task: "Know where Teams put each file and find it from OneDrive.",
          },
          {
            type: "table",
            caption: "Where Teams stores files",
            columns: ["You share a file…", "It is stored in…", "Who can open it"],
            rows: [
              ["In a Teams chat (one-on-one or group)", "The sender's OneDrive, in the folder Microsoft Teams Chat Files", "The people in that chat (Teams sets the permissions)"],
              ["In a standard Teams channel", "The team's SharePoint site, in that channel's folder of the Documents library", "The members of the team"],
              ["A meeting recording (not a channel meeting)", "The organizer's OneDrive, in the Recordings folder", "Meeting participants, as the organizer's settings allow"],
              ["A channel meeting recording", "The team's SharePoint site, in a Recordings folder in the channel's files", "The members of the team"],
            ],
          },
          {
            type: "callout",
            variant: "version",
            text: "In current Teams, a channel's files are on its Shared tab (it used to be called the Files tab). See the Microsoft Teams course for working with files inside Teams.",
          },
        ],
      },
      {
        heading: "Finding Teams files from OneDrive",
        blocks: [
          {
            type: "list",
            items: [
              "Files you sent in chats: My files › Microsoft Teams Chat Files.",
              "Files others sent you in chats: Shared › Shared with you (the Shared in column says which chat).",
              "Files from a meeting: Browse files by › Meetings, then the meeting.",
              "A team's library: Quick access in the left pane lists team libraries you use often. Open one to see the team's files.",
              "A team folder you use every day: select it and choose Add shortcut to My files.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Where is it stored?",
            prompt: "Sort each file by where Teams stored it.",
            buckets: [
              { id: "mine", label: "Your OneDrive" },
              { id: "team", label: "The team's SharePoint site" },
            ],
            items: [
              { id: "a", text: "A spreadsheet you sent Kevin in a one-on-one chat", bucket: "mine" },
              { id: "b", text: "Procedures Maria posted in the Front Desk channel", bucket: "team" },
              { id: "c", text: "The recording of a meeting you organized from your calendar", bucket: "mine" },
              { id: "d", text: "The recording of a meeting held in the Front Desk channel", bucket: "team" },
              { id: "e", text: "A photo you shared in a group chat you started", bucket: "mine" },
            ],
            explanation: "Chats and the meetings you organize use your OneDrive. Channels use the team's SharePoint site.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "When people leave an organization, their OneDrive is usually removed after a while, and the chat files and recordings in it go with it. Files the team must keep belong in the team's channel or library, not in one person's chat.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You shared a schedule with two coworkers in a Teams group chat you started. Where is the file?",
            options: ["In the team's SharePoint site", "In your OneDrive, in Microsoft Teams Chat Files", "In each coworker's OneDrive", "Only inside Teams, not in OneDrive"],
            correctIndex: 1,
            explanation: "Chat files are stored in the sender's OneDrive, in Microsoft Teams Chat Files, and shared with the people in the chat.",
            optionRationales: [
              "Channels use SharePoint; chats don't.",
              "Correct.",
              "There is one copy, in the sender's OneDrive.",
              "Teams stores it in OneDrive, so you can find it there.",
            ],
          },
          {
            type: "knowledge-check",
            question: "The front desk team's procedures must stay available even if the person who wrote them leaves. Where should they be?",
            options: ["In a Teams chat", "In the writer's My files", "In the team's channel or library", "On the front desk computer's desktop"],
            correctIndex: 2,
            explanation: "A team library belongs to the team, so the file stays when people come and go.",
            optionRationales: [
              "Chat files live in one person's OneDrive.",
              "One person's OneDrive leaves with them.",
              "Correct.",
              "A desktop is one computer, with none of OneDrive's protection.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Explore your real OneDrive (OneDrive on the web works on BEOC classroom computers)." },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in at onedrive.com. In My files, look for a Microsoft Teams Chat Files folder or a Recordings folder. Write down what you find (it is fine if they don't exist yet).",
          "Open Browse files by › Meetings and People. Write one sentence about what each shows for your account.",
          "If Quick access lists any libraries, open one and write down its name.",
          "Write two sentences: which of your files belong in your OneDrive, and which would belong in a team library if you worked at Lakeside.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your notes to your instructor or course folder. If you cannot sign in, submit this lesson's practice simulation results page instead." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "sending-links-not-attachments",
    title: "Sending Files as Links Instead of Attachments",
    description:
      "Send coworkers a link to the one real file instead of an attached copy, choose what the link allows, and know when a copy (or a secure method) is the right call.",
    objectives: [
      "Explain why a link beats an attachment for files people work on",
      "Send a file from OneDrive with Invite and a message, or with Copy link",
      "Choose link permissions when attaching a OneDrive file in the new Outlook",
      "Recognize when to attach a copy or use your office's secure method instead",
    ],
    duration: "12 min",
    slides: slides("sending-links-not-attachments", [
      "Attachments make copies. Links share the file",
      "Send from OneDrive: Invite or Copy link",
      "Attaching a OneDrive file in the new Outlook",
      "When a copy is the right call",
    ]),
    sections: [
      {
        heading: "Five copies of one report",
        blocks: [
          {
            type: "scenario",
            role: "You send the monthly supply report to the practice administrator.",
            text: "Last month you attached the supply report to an email for Renee. She forwarded it to Kevin, who made changes and sent it back, while Maria edited her own copy. By the end of the week there were five versions and nobody knew which was right.",
            task: "Send links to the one real file, with the right permission, and know when a copy is actually what you want.",
          },
          {
            type: "table",
            caption: "Link or attachment?",
            columns: ["", "Link to a OneDrive file", "Attached copy"],
            rows: [
              ["How many versions", "One, always current", "One per person, out of date the moment it is sent"],
              ["Email size", "Small", "Large files can be too big to send"],
              ["Who can open it", "Only people the link works for", "Anyone the email reaches, including forwards"],
              ["Changing your mind", "Remove access or stop sharing anytime", "You can't take a copy back"],
            ],
          },
        ],
      },
      {
        heading: "Sending a link",
        blocks: [
          {
            type: "list",
            items: [
              "From OneDrive: select the file › Share, add people, choose the permission, type a message, and select Invite. OneDrive emails them a link.",
              "Or select Copy link, check who the link works for (the gear), select Copy, and paste the link in your email or Teams message.",
              "In the new Outlook for Windows: in a new message, select Attach file and pick a file from OneDrive (or Suggested files). You choose whether to send a link or a copy. For a link, select the arrow on the attachment to change permissions: Organization can Edit, Organization can View, Recipients can Edit, or Recipients can View. In a business account the default lets everyone in your organization edit, so check it before you send.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The Microsoft Outlook course covers attachments in classic Outlook and Outlook on the web. The idea is the same everywhere: a link shares the one real file, and its permission decides what people can do.",
          },
        ],
      },
      {
        heading: "When a copy is right",
        blocks: [
          {
            type: "paragraph",
            text: "Send a copy (often a PDF) when the other person needs a fixed record that shouldn't change, such as a signed form or a final invoice, or when they can't sign in to see a link. And for patient information, follow your office's approved secure method; sometimes that is a link shared with one named person, and sometimes it is a secure messaging or fax system. Never attach patient information to a regular email because it is faster.",
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Link, copy, or secure method?",
            prompt: "Sort each situation.",
            buckets: [
              { id: "link", label: "Send a link" },
              { id: "copy", label: "Send a copy (PDF)" },
              { id: "secure", label: "Use the office's approved secure method" },
            ],
            items: [
              { id: "a", text: "Kevin and Maria both need to update the supply report", bucket: "link" },
              { id: "b", text: "A vendor needs the final signed W-9 form for their records", bucket: "copy" },
              { id: "c", text: "A specialist's office asks for a patient's records", bucket: "secure" },
              { id: "d", text: "The office manager should review the draft flyer", bucket: "link" },
              { id: "e", text: "An outside partner who can't sign in needs the final event program", bucket: "copy" },
            ],
            explanation: "Use links for files people work on together, copies for fixed records, and your office's approved process for anything with patient information.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You attach a OneDrive file as a link in the new Outlook at work and don't change anything. Who can edit it by default?",
            options: ["Only you", "Only the recipients", "Everyone in your organization", "Anyone on the internet"],
            correctIndex: 2,
            explanation: "In a business account, the default link lets everyone in your organization edit. Change it with the arrow on the attachment if that is too much access.",
            optionRationales: [
              "The link gives access to others, not only you.",
              "Recipients can Edit is an option you can choose, but it isn't the default.",
              "Correct.",
              "The default stays inside your organization.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Why is a link better than an attachment for a report several coworkers update?",
            options: ["Links are always more secure", "Everyone works in the one current file instead of separate copies", "Attachments can't be opened on phones", "Links make the file smaller"],
            correctIndex: 1,
            explanation: "A link points everyone to the same file, so there is one current version.",
            optionRationales: [
              "A link is only as safe as its settings. Choose who it works for.",
              "Correct.",
              "Attachments open on phones too.",
              "The file is the same size; the email is smaller.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Send a link instead of an attachment in your real accounts." },
      {
        type: "list",
        ordered: true,
        items: [
          "In OneDrive on the web, select a practice file and select Share. Invite your instructor or a classmate with Can view and a one-line message. Take a screenshot before you select Invite.",
          "Select Copy link for another practice file and paste the link into an email to yourself from your school email. Take a screenshot of the email showing the link.",
          "Write one sentence about a time a link would have been better than an attachment, and one about a time a copy would be better.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your two screenshots and two sentences to your instructor or course folder. If you cannot sign in, submit this lesson's practice simulation results page instead." },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "autosave-and-office-apps",
    title: "AutoSave and Office Apps with OneDrive",
    description:
      "Open OneDrive files in the Office desktop apps, keep AutoSave on, save new files to OneDrive, and use version history from inside Word, Excel, and PowerPoint.",
    objectives: [
      "Open a OneDrive file in the browser or in the desktop app",
      "Explain AutoSave and turn it on for a file stored in OneDrive",
      "Save a new file to OneDrive from an Office app",
      "Open version history from the file name in an Office app's title bar",
    ],
    duration: "12 min",
    slides: slides("autosave-and-office-apps", [
      "Open in browser, or open in app",
      "AutoSave: on for files in OneDrive",
      "Save new files to OneDrive from the start",
      "Version history from the title bar",
    ]),
    sections: [
      {
        heading: "The browser or the app",
        blocks: [
          {
            type: "scenario",
            role: "You are finishing the Check-In Procedures in Word.",
            text: "You need a feature that is only in the desktop version of Word, so you open the file in the app. Halfway through, you notice AutoSave in the corner is off. If the computer restarts for an update, your last hour of work could be gone.",
            task: "Open the file in the app, turn AutoSave on, and know how to get back to an earlier version.",
          },
          {
            type: "paragraph",
            text: "Selecting a Word, Excel, or PowerPoint file's name in OneDrive opens it in the browser (Word for the web, and so on), which works on any computer. For features that only the desktop apps have, right-click the file in OneDrive and select Open › Open in app. Either way, you are working in the same file in OneDrive, so co-authors, comments, and version history all still apply.",
          },
        ],
      },
      {
        heading: "AutoSave",
        blocks: [
          {
            type: "paragraph",
            text: "AutoSave, in the top left corner of the Microsoft 365 desktop apps, saves your changes to OneDrive every few seconds. It is turned on by default for files stored in OneDrive or SharePoint, and it is what lets co-authors see your changes. The title bar shows the file name and whether it is saved. Files saved only on your computer can't use AutoSave. The web apps always save as you work and don't have an AutoSave switch.",
          },
          {
            type: "callout",
            variant: "info",
            text: "When AutoSave is on, the desktop apps call File › Save As by a different name, Save a Copy, because the original is already saving itself. Use Save a Copy when you want a separate file, such as a template's starting point.",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match the situation to what to do",
            prompt: "Drag each action onto the situation it fits.",
            items: [
              { id: "a", text: "AutoSave is off on a file in OneDrive", match: "Turn AutoSave on in the title bar" },
              { id: "b", text: "You need a separate starting copy", match: "File › Save a Copy" },
              { id: "c", text: "You need yesterday's version back", match: "Select the file name in the title bar › Version History" },
              { id: "d", text: "A brand-new document", match: "Save it to OneDrive first, so AutoSave can work" },
            ],
          },
        ],
      },
      {
        heading: "Saving new files to OneDrive",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "In a new document, select File › Save As (or press Ctrl+S).",
              "Choose OneDrive - Lakeside Medical Associates (or OneDrive - Personal for your own files).",
              "Pick the folder, type a clear name, and select Save.",
              "AutoSave turns on, and the title bar shows that the file is saved to OneDrive.",
            ],
          },
          {
            type: "tip",
            text: "Select the file name in the title bar of a desktop app to see where the file is saved, rename it, or open Version History.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "AutoSave is greyed out for a document you just created on the desktop. What is the most likely reason?",
            options: ["AutoSave is broken", "The document isn't saved to OneDrive or SharePoint yet", "You opened it in the browser", "Someone else is editing it"],
            correctIndex: 1,
            explanation: "AutoSave works for files stored in OneDrive or SharePoint. Save the file there first.",
            optionRationales: ["It's a matter of where the file is saved.", "Correct.", "Web apps save automatically and don't show the switch.", "Co-authoring doesn't disable AutoSave."],
          },
          {
            type: "knowledge-check",
            question: "With AutoSave on, why does the File menu show Save a Copy instead of Save As?",
            options: ["Save As was removed from Office", "The original is already saving itself, so the command makes a separate copy", "You need a different subscription", "It only appears in Excel"],
            correctIndex: 1,
            explanation: "AutoSave keeps saving the original, so the command for a separate file is called Save a Copy.",
            optionRationales: ["It is renamed, not removed.", "Correct.", "It's about AutoSave, not your subscription.", "It appears in Word, Excel, and PowerPoint."],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Use AutoSave and version history with a practice file." },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a new Word document on the computer, type one sentence, and save it to OneDrive with a clear name. Take a screenshot of the title bar showing AutoSave on.",
          "Type a second sentence and wait a few seconds for AutoSave.",
          "Select the file name in the title bar and open Version History. Take a screenshot of the versions.",
          "If the computer doesn't have the Word desktop app, do the same in Word for the web: File › Info › Version History.",
        ],
      },
      { type: "callout", variant: "success", text: "Deliverable: Submit your two screenshots to your instructor or course folder. If you cannot sign in or save to OneDrive, submit this lesson's practice simulation results page instead." },
    ],
  },
];
