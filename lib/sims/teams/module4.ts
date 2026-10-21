import type { SimDefinition } from "@/types/sim";
import type { TeamsDoc } from "@/components/sim/apps/teams/types";
import { cmd, doc, lakeside, select, typeAll } from "./lakeside";

/* Module 4: Files and Collaboration */

/** Adds a team copy of the procedures in Front Office › General that Maria and Omar are editing, and Maria's post asking for a review. */
function coauthoring(d: TeamsDoc): TeamsDoc {
  return {
    ...d,
    files: [
      ...(d.files ?? []),
      {
        id: "f-team",
        name: "Front Desk Procedures - Team.docx",
        folder: "ch:ch-fo-gen",
        modified: "Just now",
        modifiedBy: "Maria Santos",
        editors: ["p-maria", "p-omar"],
        comments: [{ from: "p-omar", text: "I added the new phone script to step 5." }],
        preview: "1. Greet every patient within 30 seconds.\n2. Confirm the appointment and insurance.\n3. Collect the copay at check-in.\n4. Offer the privacy notice to new patients.\n5. Use the reminder call script for no-shows.",
      },
    ],
    teams: d.teams.map((t) =>
      t.id !== "t-front"
        ? t
        : {
            ...t,
            channels: t.channels.map((c) =>
              c.id !== "ch-fo-gen"
                ? c
                : { ...c, posts: [...c.posts, { id: "m-fo2", from: "p-maria", time: "9:10 AM", text: "I shared Front Desk Procedures - Team.docx on the Shared tab. Please review step 3 and the new step 5.", attachments: ["Front Desk Procedures - Team.docx"], replies: [] }] },
            ),
          },
    ),
  };
}

export const teamsModule4Sims: Record<string, SimDefinition[]> = {
  "module-4::where-files-live": [
    {
      id: "teams-m4-where-files-live-1",
      app: "teams",
      title: "Find and organize your files in Teams",
      scenario:
        "Your OneDrive is filling up with files from your first weeks. See where Teams put the files you shared in chat, give your training files a folder, and find a team file on a channel's Shared tab.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(lakeside({ start: { view: "onedrive", folder: "root" } })),
      tasks: [
        {
          instruction: "In OneDrive, open the folder “Microsoft Teams Chat Files.”",
          hint: "OneDrive on the app bar › My files › Microsoft Teams Chat Files.",
          steps: [select("folder:teams-chat-files")],
        },
        {
          instruction: "Go back to My files and create a folder named “Front Desk Training.”",
          hint: "Select My files. Select Add new › Folder, type Front Desk Training, and select Create.",
          steps: [typeAll("newfolder:root", "Front Desk Training", ["front desk training"])],
        },
        {
          instruction: "Open the Front Desk Training folder and upload “Lobby Wait Times - October.xlsx” from your device.",
          hint: "Select Front Desk Training, then Upload. Choose Lobby Wait Times - October.xlsx and select Open.",
          steps: [cmd("files.upload", "Lobby Wait Times - October.xlsx", "folder:front-desk-training", "Upload it inside the Front Desk Training folder.")],
        },
        {
          instruction: "Move “Reminder Call Script.docx” from My files into the Front Desk Training folder.",
          hint: "Select My files. Point to Reminder Call Script.docx › More options (…) › Move to. Select Front Desk Training › Move here.",
          steps: [cmd("files.move", "front-desk-training", "file:f-script", "Move Reminder Call Script.docx.")],
        },
        {
          instruction: "Rename “New Hire Checklist.docx” to “New Hire Checklist - Front Office.docx.”",
          hint: "Point to New Hire Checklist.docx › More options (…) › Rename. Type the new name and press Enter.",
          steps: [typeAll("rename:f-hire", "New Hire Checklist - Front Office.docx", ["new hire checklist - front office"])],
        },
        {
          instruction: "Open “Provider Schedule - November.xlsx” from the Scheduling channel's Shared tab.",
          hint: "Chat › Front Office › Scheduling › Shared › Provider Schedule - November.xlsx.",
          judgeFree: true,
          steps: [cmd("files.open", "f-sched", "file:f-sched", "Open Provider Schedule - November.xlsx from the Scheduling channel.")],
        },
      ],
    },
    {
      id: "teams-m4-where-files-live-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Put your files in order",
      scenario:
        "Organize your work files in OneDrive and find a team file in its channel. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ start: { view: "onedrive", folder: "root" } })),
      tasks: [
        {
          instruction: "In OneDrive › My files, create a folder named “Committee Work.”",
          hint: "OneDrive › My files › Add new › Folder › Committee Work › Create.",
          steps: [typeAll("newfolder:root", "Committee Work", ["committee work"])],
        },
        {
          instruction: "Open Committee Work and upload “Flu Clinic Flyer.pdf” from your device.",
          hint: "Committee Work › Upload › Flu Clinic Flyer.pdf › Open.",
          steps: [cmd("files.upload", "Flu Clinic Flyer.pdf", "folder:committee-work", "Upload it inside the Committee Work folder.")],
        },
        {
          instruction: "Move “New Hire Checklist.docx” into Committee Work.",
          hint: "My files › point to New Hire Checklist.docx › More options (…) › Move to › Committee Work › Move here.",
          steps: [cmd("files.move", "committee-work", "file:f-hire", "Move New Hire Checklist.docx.")],
        },
        {
          instruction: "Rename “Reminder Call Script.docx” to “Reminder Call Script - Draft 2.docx.”",
          hint: "Point to Reminder Call Script.docx › More options (…) › Rename. Type the new name and press Enter.",
          steps: [typeAll("rename:f-script", "Reminder Call Script - Draft 2.docx", ["reminder call script - draft 2"])],
        },
        {
          instruction: "Open “Copay Quick Reference.pdf” from the Billing Questions channel's Shared tab.",
          hint: "Chat › Front Office › Billing Questions › Shared › Copay Quick Reference.pdf.",
          judgeFree: true,
          steps: [cmd("files.open", "f-copay", "file:f-copay", "Open Copay Quick Reference.pdf from the Billing Questions channel.")],
        },
      ],
    },
  ],

  "module-4::share-with-the-right-people": [
    {
      id: "teams-m4-share-with-the-right-people-1",
      app: "teams",
      title: "Share files with the right people and permissions",
      scenario:
        "Jen Cole needs to read her new-hire checklist, the whole office should be able to read the procedures, and Maria needs to edit your reminder call script. Give each person exactly the access they need, and no more.",
      fileName: "Microsoft Teams",
      minutes: 6,
      initial: doc(lakeside({ start: { view: "onedrive", folder: "root" } })),
      tasks: [
        {
          instruction: "Share “New Hire Checklist.docx” with Jen Cole only, so she can view but not edit it. Add the message “Here is your checklist.” and send it.",
          hint: "OneDrive › point to New Hire Checklist.docx › More options (…) › Share. Add Jen Cole. Select the link settings, choose People you choose and Can view, select Apply, type the message, and select Send.",
          steps: [typeAll("share:f-hire", "People: Jen Cole\nLink: People you choose\nPermission: Can view\nMessage: Here is your checklist.\nAction: Send", ["people: jen cole", "link: people you choose", "permission: can view", "action: send"])],
        },
        {
          instruction: "Copy a link to “Front Desk Procedures.docx” that works for people in Lakeside Medical Associates and lets them view only.",
          hint: "Point to Front Desk Procedures.docx › More options (…) › Share › link settings › People in Lakeside Medical Associates › Can view › Apply › Copy link.",
          steps: [typeAll("share:f-proc", "People: \nLink: People in Lakeside Medical Associates\nPermission: Can view\nMessage: \nAction: Copy link", ["link: people in lakeside medical associates", "permission: can view", "action: copy link"])],
        },
        {
          instruction: "Share “Reminder Call Script.docx” with Maria Santos so she can edit it, and send it.",
          hint: "Point to Reminder Call Script.docx › More options (…) › Share. Add Maria Santos, check that the link settings say Can edit, and select Send.",
          steps: [typeAll("share:f-script", "People: Maria Santos\nLink: People in Lakeside Medical Associates\nPermission: Can edit\nMessage: \nAction: Send", ["people: maria santos", "permission: can edit", "action: send"])],
        },
        {
          instruction: "From the Scheduling channel's Shared tab, share “Provider Schedule - November.xlsx” with Tasha Greene, view only.",
          hint: "Chat › Front Office › Scheduling › Shared. Point to the file › More options (…) › Share. Add Tasha Greene, set the link settings to Can view, Apply, and Send.",
          steps: [typeAll("share:f-sched", "People: Tasha Greene\nLink: People you choose\nPermission: Can view\nMessage: \nAction: Send", ["people: tasha greene", "permission: can view", "action: send"])],
        },
      ],
    },
    {
      id: "teams-m4-share-with-the-right-people-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Least access, every time",
      scenario:
        "Share three files, each with the narrowest access that still lets people do their work. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(lakeside({ start: { view: "onedrive", folder: "root" } })),
      tasks: [
        {
          instruction: "Share “Front Desk Procedures.docx” with Omar Haddad and Jen Cole, using People you choose and Can view, and send it.",
          hint: "OneDrive › Front Desk Procedures.docx › More options (…) › Share. Add both people, set link settings to People you choose and Can view, Apply, and Send.",
          steps: [typeAll("share:f-proc", "People: Jen Cole; Omar Haddad\nLink: People you choose\nPermission: Can view\nMessage: \nAction: Send", ["jen cole", "omar haddad", "link: people you choose", "permission: can view", "action: send"])],
        },
        {
          instruction: "Copy a link to “Reminder Call Script.docx” that works only for people who already have access.",
          hint: "Reminder Call Script.docx › More options (…) › Share › link settings › People with existing access › Apply › Copy link.",
          steps: [typeAll("share:f-script", "People: \nLink: People with existing access\nPermission: Can edit\nMessage: \nAction: Copy link", ["link: people with existing access", "action: copy link"])],
        },
        {
          instruction: "From the Billing Questions channel's Shared tab, share “Copay Quick Reference.pdf” with Jen Cole, view only, and send it.",
          hint: "Chat › Front Office › Billing Questions › Shared › point to the file › More options (…) › Share. Add Jen Cole, set Can view, Apply, and Send.",
          steps: [typeAll("share:f-copay", "People: Jen Cole\nLink: People you choose\nPermission: Can view\nMessage: \nAction: Send", ["people: jen cole", "permission: can view", "action: send"])],
        },
      ],
    },
  ],

  "module-4::co-authoring": [
    {
      id: "teams-m4-co-authoring-1",
      app: "teams",
      title: "Co-author the team's procedures",
      scenario:
        "Maria shared the team copy of the front desk procedures and asked everyone to review step 3. Open it in Teams, see who else is working in it, leave a comment for Maria, and answer her post.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(coauthoring(lakeside({ start: { view: "chat", conv: "ch-fo-gen", tab: "posts" } }))),
      tasks: [
        {
          instruction: "Open “Front Desk Procedures - Team.docx” from the Front Office General channel's Shared tab.",
          hint: "Front Office › General › Shared › Front Desk Procedures - Team.docx.",
          judgeFree: true,
          steps: [cmd("files.open", "f-team", "file:f-team", "Open Front Desk Procedures - Team.docx.")],
        },
        {
          instruction: "Open Comments and add a comment: “@Maria Santos Step 3 now matches the new copay rule.”",
          hint: "Select Comments at the top of the file. Type the comment, starting with @Maria Santos, and select Post.",
          steps: [typeAll("comment:f-team", "@Maria Santos Step 3 now matches the new copay rule.", ["@maria santos", "step 3"])],
        },
        {
          instruction: "Open the file in the Word desktop app.",
          hint: "Select Open › Open in Word desktop app.",
          judgeFree: true,
          steps: [cmd("files.openIn", "Desktop app", "file:f-team", "Use Open › Open in Word desktop app.")],
        },
        {
          instruction: "Close the file. Reply to Maria's post in General: “Reviewed. I left a comment on step 3.”",
          hint: "Select Close. Select the Posts tab, then Reply under Maria's post, type, and press Enter.",
          steps: [typeAll("reply:m-fo2", "Reviewed. I left a comment on step 3.", ["reviewed", "step 3"])],
        },
        {
          instruction: "Copy a link to “Front Desk Procedures - Team.docx” so you can send it to Jen later.",
          hint: "Shared › point to the file › More options (…) › Copy link.",
          steps: [cmd("files.copyLink", undefined, "file:f-team", "Copy the link to Front Desk Procedures - Team.docx.")],
        },
      ],
    },
    {
      id: "teams-m4-co-authoring-lab",
      app: "teams",
      role: "challenge",
      title: "Challenge Lab: Review a shared document",
      scenario:
        "Review the team's procedures with your coworkers, in the one shared copy. Print or save your results page when you finish.",
      fileName: "Microsoft Teams",
      minutes: 5,
      initial: doc(coauthoring(lakeside({ start: { view: "chat", conv: "ch-fo-gen", tab: "posts" } }))),
      tasks: [
        {
          instruction: "Open “Front Desk Procedures - Team.docx” from the General channel's Shared tab.",
          hint: "Front Office › General › Shared › Front Desk Procedures - Team.docx.",
          judgeFree: true,
          steps: [cmd("files.open", "f-team", "file:f-team", "Open Front Desk Procedures - Team.docx.")],
        },
        {
          instruction: "Add a comment for Omar: “@Omar Haddad Step 5 looks good. Should we add the voicemail script too?”",
          hint: "Comments › type the comment starting with @Omar Haddad › Post.",
          steps: [typeAll("comment:f-team", "@Omar Haddad Step 5 looks good. Should we add the voicemail script too?", ["@omar haddad", "step 5"])],
        },
        {
          instruction: "Close the file and reply to Maria's post: “Done. I left a question for Omar about step 5.”",
          hint: "Close › Posts › Reply under Maria's post.",
          steps: [typeAll("reply:m-fo2", "Done. I left a question for Omar about step 5.", ["step 5"])],
        },
        {
          instruction: "Copy a link to the file.",
          hint: "Shared › point to Front Desk Procedures - Team.docx › More options (…) › Copy link.",
          steps: [cmd("files.copyLink", undefined, "file:f-team", "Copy the link to Front Desk Procedures - Team.docx.")],
        },
      ],
    },
  ],
};
