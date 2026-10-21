import type { SimDefinition } from "@/types/sim";
import { baseItems, D, F, go, on, openFile, P, work } from "./lakeside";

const CHECKIN_TEXT = [
  "Check-In Procedures",
  "Greet every patient within one minute of arrival.",
  "Ask the patient to confirm their full name and date of birth.",
  "Ask for the insurance card and a photo ID, and scan both sides of the card.",
  "Confirm the patient's phone number and address.",
  "Collect the copay before the visit.",
];

export const onedriveModule6Sims: Record<string, SimDefinition[]> = {
  "module-6::onedrive-sharepoint-and-teams": [
    {
      id: "onedrive-m6-teams-files-1",
      app: "onedrive",
      title: "Find the files Teams saved for you",
      scenario:
        "You need three things from Teams today: a spreadsheet you sent Kevin in a chat, the files from Monday's huddle, and the Front Desk channel's files. You only have OneDrive open, and that is enough.",
      fileName: "OneDrive",
      minutes: 5,
      initial: work({
        items: [
          ...baseItems(),
          D("f-chatfiles", "Microsoft Teams Chat Files", "root", { modified: "October 16" }),
          F("chat-claims", "Claim Follow-Up List.xlsx", "f-chatfiles", { modified: "October 16", access: [{ email: P.kevin.email, perm: "Can edit" }], sharedVia: "Teams chat with Kevin Patel" }),
          D("f-recordings", "Recordings", "root", { modified: "Monday" }),
          F("rec-huddle", "Monday Staff Huddle - Meeting Recording.mp4", "f-recordings", { modified: "Monday", size: "212 MB", meeting: "m-huddle" }),
          F("mt-agenda", "Staff Huddle Agenda.docx", undefined, { owner: P.maria.email, modifiedBy: P.maria.email, modified: "Monday", sharedVia: "Monday Staff Huddle" }),
          D("lib-ch-general", "General", "lib:frontdesk", { owner: P.maria.email, modifiedBy: P.maria.email, modified: "October 2" }),
          D("lib-ch-frontdesk", "Front Desk", "lib:frontdesk", { owner: P.maria.email, modifiedBy: P.maria.email, modified: "October 19" }),
          F("lib-proc", "Front Desk Procedures.docx", "lib-ch-frontdesk", { owner: P.maria.email, modifiedBy: P.maria.email, modified: "October 19" }),
          F("lib-cover", "Holiday Coverage Calendar.xlsx", "lib-ch-frontdesk", { owner: P.maria.email, modifiedBy: P.tasha.email, modified: "October 18" }),
        ],
        libraries: [{ id: "frontdesk", name: "Lakeside Front Desk", kind: "Team" }],
        meetings: [{ id: "m-huddle", title: "Monday Staff Huddle", when: "Monday 8:00 AM", files: ["mt-agenda", "rec-huddle"] }],
      }),
      tasks: [
        {
          instruction: "Open the folder where Teams saved the files you sent in chats.",
          hint: "In My files, select Microsoft Teams Chat Files.",
          steps: [go("f-chatfiles")],
        },
        {
          instruction: "See the files from the Monday Staff Huddle meeting.",
          hint: "Under Browse files by, select Meetings, then Monday Staff Huddle.",
          steps: [go("meeting:m-huddle")],
        },
        {
          instruction: "Open the Lakeside Front Desk team library.",
          hint: "Under Quick access in the left pane, select Lakeside Front Desk.",
          steps: [go("lib:frontdesk")],
        },
        {
          instruction: "Add a shortcut to the library's “Front Desk” channel folder to My files.",
          hint: "Right-click the Front Desk folder in the library (or select it) and select Add shortcut to My files.",
          steps: [on("lib-ch-frontdesk", "od.shortcut", {}, "Add the shortcut for the Front Desk channel folder.")],
        },
        {
          instruction: "Play the Monday Staff Huddle recording from your Recordings folder.",
          hint: "Select My files › Recordings, then select Monday Staff Huddle - Meeting Recording.mp4.",
          steps: [openFile("rec-huddle")],
        },
      ],
    },
  ],

  "module-6::sending-links-not-attachments": [
    {
      id: "onedrive-m6-links-1",
      app: "onedrive",
      title: "Send links, not attachments",
      scenario:
        "Last month the supply report turned into five emailed copies. This month, send everyone a link to the one real file, with the right permission, and share the health fair photos with the community center the safe way.",
      fileName: "OneDrive",
      minutes: 5,
      initial: work({
        items: [
          ...baseItems(),
          F("root-report", "Monthly Supply Report.xlsx", "root", { modified: "October 20", size: "58 KB" }),
          D("root-photos", "Health Fair Photos", "root", { modified: "October 12" }),
          F("photo-1", "Blood Pressure Table.jpg", "root-photos", { size: "2.9 MB" }),
          F("photo-2", "Volunteer Team.jpg", "root-photos", { size: "3.4 MB" }),
        ],
      }),
      tasks: [
        {
          instruction: "Send Renee Walker a view-only link to “Monthly Supply Report.xlsx” with a short message.",
          hint: "Select the report › Share. Add Renee Walker, choose Can view, type a message, then select Send.",
          steps: [on("root-report", "od.share", { people: P.renee.email, permission: "Can view" }, "Share Monthly Supply Report.xlsx.")],
        },
        {
          instruction: "Kevin Patel and Maria Santos both update the report. Share it with both of them at once so they can edit.",
          hint: "Select the report › Share. Add Kevin Patel and Maria Santos, keep Can edit, then Send.",
          steps: [on("root-report", "od.share", { people: `${P.kevin.email}; ${P.maria.email}`, permission: "Can edit" }, "Share Monthly Supply Report.xlsx.")],
        },
        {
          instruction: "Copy a link to “Flu Clinic Flyer.docx” that anyone at Lakeside can view, to paste into a Teams post.",
          hint: "Select the flyer › Copy link › gear. Choose People in Lakeside Medical Associates and Can view, Apply, then Copy.",
          steps: [on("root-flyer", "od.link", { scope: "Organization", permission: "Can view" }, "Copy a link to Flu Clinic Flyer.docx.")],
        },
        {
          instruction: "Copy a view-only link to the “Health Fair Photos” folder that works only for events@harborcommunity.example.",
          hint: "Select Health Fair Photos › Share. Type events@harborcommunity.example in the box and press Enter (don't select Send). Select the gear, choose People you choose and Can view, Apply, then Copy.",
          steps: [on("root-photos", "od.link", { scope: "People you choose", permission: "Can view", people: P.harbor.email }, "Copy a link to the Health Fair Photos folder.")],
        },
      ],
    },
  ],

  "module-6::autosave-and-office-apps": [
    {
      id: "onedrive-m6-autosave-1",
      app: "onedrive",
      title: "Open in the app and keep AutoSave on",
      scenario:
        "You need the desktop version of Word to finish the Check-In Procedures. Open it in the app, make sure AutoSave is on, leave Kevin a question, and put back yesterday's wording that someone replaced.",
      fileName: "OneDrive",
      minutes: 5,
      initial: work({
        items: [
          ...baseItems(),
          F("doc-checkin", "Check-In Procedures.docx", "root", {
            modified: "Today at 8:15 AM",
            modifiedBy: P.omar.email,
            version: "3.0",
            access: [{ email: P.kevin.email, perm: "Can edit" }, { email: P.maria.email, perm: "Can edit" }],
            text: [...CHECKIN_TEXT.slice(0, 5), "Ask for payment."],
            versions: [
              { id: "ck2", label: "2.0", modified: "Yesterday at 3:30 PM", by: P.maria.email, size: "34 KB", text: CHECKIN_TEXT },
              { id: "ck1", label: "1.0", modified: "October 14 at 9:00 AM", by: "amorgan@lakesidemedical.example", size: "28 KB", text: CHECKIN_TEXT.slice(0, 3) },
            ],
          }),
        ],
      }),
      tasks: [
        {
          instruction: "Open “Check-In Procedures.docx” in the Word app.",
          hint: "Right-click Check-In Procedures.docx › Open › Open in app.",
          steps: [{ action: { kind: "command", id: "od.openApp", value: "doc-checkin" } }],
        },
        {
          instruction: "Turn on AutoSave.",
          hint: "Select the AutoSave switch at the top left of the Word window.",
          steps: [{ action: { kind: "dialog", id: "od.autosave", values: { on: true } } }],
        },
        {
          instruction: "Restore yesterday's version 2.0 from Word's title bar.",
          hint: "Select the file name in the title bar › Version History. Next to 2.0, select the ellipses (…) › Restore.",
          steps: [on("doc-checkin", "od.restoreVersion", { version: "ck2" }, "Open Version History for Check-In Procedures.")],
        },
        {
          instruction: "Add a comment on “Collect the copay before the visit.” that @mentions Kevin Patel and asks if the card reader is fixed.",
          hint: "Click that paragraph, then Review › New comment. Type @Kev, pick Kevin Patel, type your question, then Post.",
          steps: [{ action: { kind: "type", target: "comment:doc-checkin.p6", value: ["@Kevin Patel", "card reader"], match: "all" } }],
        },
        {
          instruction: "Close Word.",
          hint: "Select the X at the top right of the Word window.",
          steps: [{ action: { kind: "command", id: "od.close" } }],
        },
      ],
    },
  ],
};
