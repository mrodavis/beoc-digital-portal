import { Lesson } from "@/types/lesson";

const IMG = "/images/ms-office/teams/module-4";
const slides = (slug: string, alts: string[]) => alts.map((alt, i) => ({ src: `${IMG}/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const teamsModule4Lessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "where-files-live",
    title: "Where Your Files Live: OneDrive, Chats, and Channels",
    description:
      "Learn where Teams stores every file you share, find your files with OneDrive in Teams, and keep your own files organized with folders, Move to, and Rename.",
    objectives: [
      "Explain where Teams stores files shared in chats, in channels, and in your own OneDrive",
      "Use OneDrive in Teams: Home, My files, Shared, Favorites, and the Recycle bin",
      "Create folders, upload, move, and rename files in OneDrive",
      "Choose the right home for a file based on who owns it",
    ],
    duration: "15 min",
    slides: slides("where-files-live", [
      "Where your files live in Microsoft 365",
      "Three homes for files: your OneDrive, a chat, a channel",
      "OneDrive in Teams: Home, My files, Shared, Favorites, Recycle bin",
      "Folders, Move to, and Rename keep My files tidy",
      "Who owns the file decides where it lives",
      "Quick check",
    ]),
    sections: [
      {
        heading: "Three homes for a file",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Three weeks into the job, your OneDrive has eleven files with no folders, a Microsoft Teams Chat Files folder you never created, and two copies of the reminder call script. Maria asks for the latest version and you are not sure which one it is.",
            task: "Understand where Teams puts every file, and organize your own files so you can always find the right one.",
          },
          {
            type: "paragraph",
            text: "Teams does not have its own separate file storage. Every file you see in Teams lives in one of two Microsoft 365 places: your OneDrive (files that belong to you) or a team's SharePoint site (files that belong to the team). Where a file ends up depends on where you share it.",
          },
          {
            type: "table",
            caption: "Where Teams stores files",
            columns: ["You add a file to", "It is stored in", "Who can open it"],
            rows: [
              ["Your OneDrive (OneDrive on the app bar)", "Your OneDrive › My files", "You, plus anyone you share it with"],
              ["A one-on-one or group chat", "Your OneDrive › Microsoft Teams Chat Files", "The people in that chat"],
              ["A channel (post or Shared tab)", "The team's SharePoint site, in the channel's folder", "Members of the team"],
            ],
          },
          {
            type: "image",
            src: "/images/ms-office/teams/module-4/where-files-live/infographic.png",
            alt: "Where files live in Teams: your OneDrive for your own files and chat files, the team's SharePoint site for channel files, with who can open each and how to find them",
            caption: "Where files live in Teams",
          },
        ],
      },
      {
        heading: "OneDrive in Teams",
        blocks: [
          {
            type: "paragraph",
            text: "Select OneDrive on the app bar to see your work files without leaving Teams. Home lists files you recently opened or edited. My files is your OneDrive, with your folders. Shared shows files others shared with you and files you shared. Favorites holds files you starred, and the Recycle bin holds files you deleted, so you can restore them. You can also browse files by People, Meetings, or Media type, and Quick access takes you to files in your teams' channels.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "To create a folder: in My files, select Add new › Folder, type a name, and select Create.",
              "To upload: open the folder, select Upload, choose the file, and select Open.",
              "To move a file: point to it › More options (…) › Move to, choose the folder, and select Move here.",
              "To rename a file: point to it › More options (…) › Rename, type the new name, and press Enter.",
            ],
          },
          {
            type: "worked-example",
            title: "Cleaning up My files",
            task: "Put three weeks of files in order so the right version is easy to find.",
            steps: [
              { move: "Open OneDrive › My files and look inside Microsoft Teams Chat Files.", why: "That folder holds every file you uploaded in a chat. Knowing it exists explains files you do not remember saving." },
              { move: "Create a folder named Front Desk Training.", why: "One folder per kind of work beats eleven loose files." },
              { move: "Move Reminder Call Script.docx into the folder, and rename files so the name says what they are.", why: "A clear name and place mean you open the right file the first time, and so does anyone you share it with." },
            ],
            result: "Your files are in named folders, and the latest script is the one in Front Desk Training.",
            takeaway: "Keep one copy, in one place, with a name that says what it is.",
          },
        ],
      },
      {
        heading: "Choose the right home",
        blocks: [
          {
            type: "drag-drop",
            mode: "sort",
            title: "Where should this file live?",
            prompt: "Sort each file to its best home.",
            buckets: [
              { id: "od", label: "Your OneDrive" },
              { id: "chat", label: "A chat with a few people" },
              { id: "channel", label: "A team channel" },
            ],
            items: [
              { id: "a", text: "Your notes from phone system training", bucket: "od" },
              { id: "b", text: "A draft letter you want Maria to look at first", bucket: "chat" },
              { id: "c", text: "The final provider schedule the front office uses", bucket: "channel" },
              { id: "d", text: "Your personal checklist of tasks for this week", bucket: "od" },
              { id: "e", text: "The copay quick reference everyone follows", bucket: "channel" },
              { id: "f", text: "A spreadsheet for the three people planning holiday coverage", bucket: "chat" },
            ],
            explanation: "Your own work stays in your OneDrive. Files for a few people can go in their chat. Files the whole team relies on, and that must stay after you leave, belong in the team's channel.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Lakeside's rule for files with patient information: keep them only in locations the practice approves and share them only with people who need them. Never move patient files into a personal OneDrive or a personal email account, and never upload them to a channel that includes people who do not need them.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You find a folder named Microsoft Teams Chat Files in your OneDrive. What is in it?",
            options: ["Files other people sent you by email", "Files you uploaded in Teams chats", "Every file in every channel", "Teams settings"],
            correctIndex: 1,
            explanation: "When you upload a file in a chat, Teams stores it in your OneDrive in Microsoft Teams Chat Files and shares it with the people in that chat.",
            optionRationales: ["Email attachments are not saved there.", "Correct.", "Channel files are stored in each team's SharePoint site.", "Settings are not stored as files there."],
          },
          {
            type: "knowledge-check",
            question: "You deleted a file from your OneDrive by mistake. Where do you look first?",
            options: ["The Recycle bin in OneDrive", "Activity", "The Calendar", "A new chat"],
            correctIndex: 0,
            explanation: "Deleted OneDrive files go to the Recycle bin, where you can restore them.",
            optionRationales: ["Correct.", "Activity shows notifications.", "Calendar shows events.", "A chat cannot restore a deleted file."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Organize your files in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In OneDrive › My files, create a folder named “Committee Work.”",
          "Open Committee Work and upload “Flu Clinic Flyer.pdf” from your device.",
          "Move “New Hire Checklist.docx” into Committee Work.",
          "Rename “Reminder Call Script.docx” to “Reminder Call Script - Draft 2.docx.”",
          "Open “Copay Quick Reference.pdf” from the Billing Questions channel's Shared tab.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "share-with-the-right-people",
    title: "Share Files with the Right People and Permissions",
    description:
      "Share a file from Teams with specific people or a link, choose who the link works for and whether people can edit or only view, and apply least access to anything that touches patient information.",
    objectives: [
      "Share a file from OneDrive in Teams or a channel's Shared tab and send or copy the link",
      "Choose who a link works for: Anyone, People in your organization, People with existing access, or People you choose",
      "Choose Can edit or Can view, and know that Can review and Can't download may also be offered",
      "Apply least access: the narrowest link and permission that lets people do the job",
    ],
    duration: "18 min",
    slides: slides("share-with-the-right-people", [
      "Share the one real file with the right access",
      "Share: pick people, settings, then Send or Copy link",
      "Who the link works for",
      "Can edit or Can view",
      "Least access, every time",
      "Quick check: which link would you choose?",
    ]),
    sections: [
      {
        heading: "Who needs this file, and what will they do with it?",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Jen Cole, the temporary receptionist, needs to read her new-hire checklist. The whole office should be able to read the procedures, but not change them. Maria needs to edit your reminder call script. Last month a coworker sent a link that let anyone in the organization edit the copay sheet, and someone changed a price by mistake.",
            task: "Give each person exactly the access they need, and no more.",
          },
          {
            type: "paragraph",
            text: "Sharing a file gives people a link to the one real file instead of a copy. Two decisions control what happens next: who the link works for, and whether those people can edit or only view. Microsoft sets a default for your organization, so always check the link settings before you send.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "In OneDrive in Teams (or on a channel's Shared tab), point to the file and select Share (or More options (…) › Share).",
              "Type the names of the people to share with.",
              "Open the link settings (the line that says who the link works for) and choose who it works for and whether they can edit or view. Select Apply.",
              "Add a short message, and select Send. Or select Copy link to paste the link into a chat or email yourself.",
            ],
          },
        ],
      },
      {
        heading: "Link types and permissions",
        blocks: [
          {
            type: "table",
            caption: "Who the link works for",
            columns: ["Link setting", "Works for", "Use it for"],
            rows: [
              ["Anyone", "Anyone who has the link, including people outside the practice", "Public flyers only; never patient information (your organization may turn this off)"],
              ["People in your organization", "Anyone signed in to a Lakeside account", "Procedures and forms everyone at the practice may read"],
              ["People with existing access", "Only people who already have access", "Reminding a coworker where a file is, without giving anyone new access"],
              ["People you choose", "Only the people you name", "Anything sensitive, and most files you share with one or two people"],
            ],
          },
          {
            type: "paragraph",
            text: "Then choose the permission. Can edit lets people change the file. Can view lets them open and read it but not change it. Depending on the file and your organization, you may also see Can review (people can suggest changes and comment in Word) and Can't download (view in the browser without downloading a copy).",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Pick the link",
            prompt: "Drag the best link setting onto each situation.",
            items: [
              { id: "a", text: "Jen must read her new-hire checklist", match: "People you choose, Can view" },
              { id: "b", text: "Every Lakeside employee should be able to read the procedures", match: "People in your organization, Can view" },
              { id: "c", text: "Maria needs to edit your draft script", match: "People you choose, Can edit" },
              { id: "d", text: "Reminding Omar where the schedule is (he already has access)", match: "People with existing access" },
            ],
            explanation: "Name the people when you can, give view access unless they need to edit, and only widen the link when everyone in the organization truly needs it.",
          },
        ],
      },
      {
        heading: "Least access, every time",
        blocks: [
          {
            type: "worked-example",
            title: "Sharing the procedures without letting everyone edit them",
            task: "Let the whole office read Front Desk Procedures.docx without being able to change it.",
            steps: [
              { move: "Point to Front Desk Procedures.docx › More options (…) › Share.", why: "Share opens the link settings for this one file." },
              { move: "Open the link settings, choose People in Lakeside Medical Associates, and change the permission to Can view. Select Apply.", why: "Everyone at the practice needs to read it; nobody but the owner should change it. That is how the copay price mistake happened." },
              { move: "Select Copy link and paste it into the Front Office General channel.", why: "The team gets one link to the one real file, read-only." },
            ],
            result: "Everyone can read the procedures; only you and the people you choose can change them.",
            takeaway: "Start from the narrowest link and the lowest permission, and widen only if someone truly needs more.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "For anything that contains patient information: share only with the specific people who need it (People you choose), give view access unless editing is required, keep it in a location Lakeside approves, and never use an Anyone link.",
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which link setting works for whoever has the link, even people outside Lakeside?",
            options: ["People you choose", "People in your organization", "People with existing access", "Anyone"],
            correctIndex: 3,
            explanation: "An Anyone link does not check who is opening it, so it can be forwarded to anyone. Never use it for patient information.",
            optionRationales: ["This works only for the people you name.", "This works only for people signed in to Lakeside accounts.", "This works only for people who already had access.", "Correct."],
          },
          {
            type: "knowledge-check",
            question: "Jen needs to read the copay quick reference but must not change it. What permission do you give her?",
            options: ["Can edit", "Can view", "Owner", "No permission; email her a copy"],
            correctIndex: 1,
            explanation: "Can view lets her open and read the file without changing it.",
            optionRationales: ["Can edit lets her change it.", "Correct.", "There is no reason to make her an owner.", "An emailed copy goes out of date and spreads extra copies."],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Share three files with least access in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Share “Front Desk Procedures.docx” with Omar Haddad and Jen Cole, using People you choose and Can view, and send it.",
          "Copy a link to “Reminder Call Script.docx” that works only for people who already have access.",
          "From the Billing Questions channel's Shared tab, share “Copay Quick Reference.pdf” with Jen Cole, view only, and send it.",
          "In a Word document or on paper, explain in two or three sentences why you would never share a file with patient information using an Anyone link.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) and your explanation to your instructor or course folder.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "co-authoring",
    title: "Co-Authoring: Edit Files Together in Teams",
    description:
      "Open Word, Excel, and PowerPoint files inside Teams, work on the same file at the same time as coworkers, use comments and @mentions to review, and open a file in the desktop app or browser when you need more tools.",
    objectives: [
      "Open an Office file in Teams and recognize when others are editing it with you",
      "Add a comment and @mention the person who should act on it",
      "Open a file in the desktop app or in the browser",
      "Explain why co-authoring one shared file beats emailing copies",
    ],
    duration: "15 min",
    slides: slides("co-authoring", [
      "One file, many editors, no copies",
      "Open a file in Teams",
      "See who is editing with you",
      "Comments and @mentions for review",
      "Desktop app or browser when you need more",
      "Co-authoring etiquette",
    ]),
    sections: [
      {
        heading: "One file, many editors",
        blocks: [
          {
            type: "scenario",
            role: "You are the front office assistant at Lakeside Medical Associates.",
            text: "Maria shared the team copy of the front desk procedures in the General channel and asked everyone to review step 3. Last year the same review happened by email: five people sent back five edited copies, and it took Maria an afternoon to combine them.",
            task: "Review the document in the one shared copy, with your coworkers, and leave clear comments instead of a sixth copy.",
          },
          {
            type: "paragraph",
            text: "Co-authoring means several people work in the same Word, Excel, or PowerPoint file at the same time. When a file is stored in OneDrive or a team's SharePoint site and shared with you, you can open it and edit it while others do. You see their pictures or initials at the top of the file and their changes as they make them. There is only one file, so there is nothing to combine afterward.",
          },
          {
            type: "list",
            items: [
              "Select a file on a channel's or chat's Shared tab, in the message where it was attached, or in OneDrive. By default it opens inside Teams with the usual Office tools at the top.",
              "Select Close to go back to where you were in Teams.",
              "To work in the full app, open the file's Open menu and choose Desktop app or Open in browser. On the Shared tab you can also right-click the file and choose Open in. You can change the default for all files in Settings › Files and links.",
            ],
          },
        ],
      },
      {
        heading: "Review with comments",
        blocks: [
          {
            type: "paragraph",
            text: "A comment is a note attached to the document, not a change to its text. Use comments to ask a question or suggest something the owner should decide. Type @ and a name in a comment to notify that person. The comment stays with the document, so everyone reviewing sees it in one place.",
          },
          {
            type: "worked-example",
            title: "Reviewing step 3",
            task: "Check step 3 of the team procedures against the new copay rule.",
            steps: [
              { move: "Open Front Desk Procedures - Team.docx from the General channel's Shared tab.", why: "Opening the shared file, not a downloaded copy, means everyone sees the same document." },
              { move: "Notice Maria's and Omar's initials at the top of the file.", why: "They are editing too. Avoid rewriting the paragraph someone else is working on right now." },
              { move: "Open Comments and add: “@Maria Santos Step 3 now matches the new copay rule.”", why: "Maria owns the document. The @mention notifies her, and the comment stays with step 3." },
              { move: "Reply to Maria's post: “Reviewed. I left a comment on step 3.”", why: "The rest of the team can see the review is done without opening the file." },
            ],
            result: "One document with everyone's input, and no copies to combine.",
            takeaway: "Edit the shared file, use comments for questions, and @mention the person who decides.",
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the review in order",
            prompt: "Drag these steps into the order you would do them.",
            items: [
              { id: "1", text: "Open the file from the channel's Shared tab" },
              { id: "2", text: "Check who else is editing" },
              { id: "3", text: "Add a comment and @mention the owner" },
              { id: "4", text: "Close the file" },
              { id: "5", text: "Reply to the post to say the review is done" },
            ],
            explanation: "Open the shared copy, be aware of others, comment where it matters, and close the loop in the channel.",
          },
        ],
      },
      {
        heading: "Co-authoring etiquette",
        blocks: [
          {
            type: "table",
            caption: "Working in a shared file",
            columns: ["Do", "Don't"],
            rows: [
              ["Edit the shared copy", "Download it, edit, and upload a second copy"],
              ["Use comments for questions and suggestions", "Rewrite someone else's section without asking"],
              ["@mention the person who must decide", "Leave a comment nobody is notified about"],
              ["Close the file when you are done", "Leave it open for days on a shared computer"],
            ],
          },
        ],
      },
      {
        heading: "Knowledge check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You open the team procedures and see Maria's and Omar's initials at the top. What does that mean?",
            options: ["They are editing the same file right now", "They deleted the file", "You opened a copy", "The file is locked"],
            correctIndex: 0,
            explanation: "Co-authoring shows the people working in the file with you.",
            optionRationales: ["Correct.", "A deleted file would not open.", "Copies do not show other editors.", "Co-authored files are not locked; everyone can edit."],
          },
          {
            type: "knowledge-check",
            question: "You have a question about step 5 for Omar. What is the best way to ask it?",
            options: ["Rewrite step 5 the way you think it should be", "Add a comment on the document with @Omar Haddad", "Download a copy and email it with your question", "Post the question in Staff Events"],
            correctIndex: 1,
            explanation: "A comment with an @mention notifies Omar and keeps the question with the text it is about.",
            optionRationales: [
              "Changing someone else's work without asking causes confusion.",
              "Correct.",
              "A downloaded copy splits the document.",
              "Staff Events is for events, and the question belongs with the document.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Review a shared document in the Challenge Lab below:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open “Front Desk Procedures - Team.docx” from the General channel's Shared tab.",
          "Add a comment for Omar: “@Omar Haddad Step 5 looks good. Should we add the voicemail script too?”",
          "Close the file and reply to Maria's post: “Done. I left a question for Omar about step 5.”",
          "Copy a link to the file.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (print it or save it as a PDF) to your instructor or course folder.",
      },
    ],
  },
];
