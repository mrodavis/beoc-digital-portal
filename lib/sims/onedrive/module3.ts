import type { SimDefinition } from "@/types/sim";
import { baseItems, D, F, go, on, openFile, P, work } from "./lakeside";

export const onedriveModule3Sims: Record<string, SimDefinition[]> = {
  "module-3::sharing-with-the-right-permission": [
    {
      id: "onedrive-m3-sharing-1",
      app: "onedrive",
      title: "Share each file with the right permission",
      scenario:
        "Four requests came in before lunch at Lakeside: Maria wants to edit the flu clinic flyer, Kevin needs to read the staff schedule, the whole office needs the phone list, Tasha should review the new-patient phone script, and a community partner wants the public flyer for their website.",
      fileName: "OneDrive",
      minutes: 7,
      initial: work({
        items: [...baseItems(), F("root-public", "Flu Clinic Flyer (Public).pdf", "root", { modified: "October 18", size: "540 KB" })],
      }),
      tasks: [
        {
          instruction: "Share “Flu Clinic Flyer.docx” with Maria Santos so she can edit it.",
          hint: "Select Flu Clinic Flyer.docx › Share. Type Maria and pick Maria Santos, keep Can edit (the pencil), then select Send.",
          steps: [on("root-flyer", "od.share", { people: P.maria.email, permission: "Can edit" }, "Share Flu Clinic Flyer.docx.")],
        },
        {
          instruction: "Share “Staff Schedule - November.xlsx” with Kevin Patel so he can only view it.",
          hint: "Select the schedule › Share. Add Kevin Patel, select the permission button and choose Can view, then Send.",
          steps: [on("root-schedule", "od.share", { people: P.kevin.email, permission: "Can view" }, "Share Staff Schedule - November.xlsx.")],
        },
        {
          instruction: "Copy a link to “Office Phone List.docx” that works for people in Lakeside Medical Associates and only lets them view.",
          hint: "Select Office Phone List.docx › Copy link (or Share). Select the gear for Link settings, choose People in Lakeside Medical Associates, set the permission to Can view, select Apply, then Copy.",
          steps: [on("root-phones", "od.link", { scope: "Organization", permission: "Can view" }, "Copy a link to Office Phone List.docx.")],
        },
        {
          instruction: "Share “Phone Script - New Patients.docx” with Tasha Greene for review, so she can suggest changes and comment, but not edit directly.",
          hint: "Open the Front Desk folder, select Phone Script - New Patients.docx › Share. Add Tasha Greene, choose Can review, then Send.",
          steps: [on("frontdesk-script", "od.share", { people: P.tasha.email, permission: "Can review" }, "Share Phone Script - New Patients.docx.")],
        },
        {
          instruction: "Copy a view-only Anyone link to the public “Flu Clinic Flyer (Public).pdf” that expires (pick any date after today).",
          hint: "Select Flu Clinic Flyer (Public).pdf › Copy link › gear. Choose Anyone, set Can view, pick a date in Set expiration date, select Apply, then Copy.",
          steps: [on("root-public", "od.link", { scope: "Anyone", permission: "Can view", hasExpiration: true }, "Copy a link to Flu Clinic Flyer (Public).pdf.")],
        },
      ],
    },
    {
      id: "onedrive-m3-sharing-phi-2",
      app: "onedrive",
      title: "Share patient information the safe way",
      scenario:
        "Riverside Imaging's scheduler needs to read a patient's referral packet, and Dr. Shah needs to finish the referral letter. While you are in the Referrals folder, you notice someone shared a lab results summary with an Anyone link. Fix it and share everything with named people only.",
      fileName: "OneDrive",
      minutes: 6,
      initial: work({
        view: { location: "f-referrals" },
        items: [
          ...baseItems(),
          D("f-referrals", "Referrals", "root", { modified: "October 20" }),
          F("ref-packet", "Referral Packet - Patient 10482.pdf", "f-referrals", { modified: "October 20", size: "1.6 MB" }),
          F("ref-letter", "Referral Letter - Patient 10482.docx", "f-referrals", { modified: "October 20", size: "34 KB", text: ["Referral Letter", "Patient 10482 is referred for an MRI of the left knee.", "Clinical notes are attached."] }),
          F("ref-labs", "Lab Results Summary - Patient 20931.pdf", "f-referrals", { modified: "October 17", size: "220 KB", links: [{ id: "l-anyone", scope: "Anyone", perm: "Can view" }] }),
        ],
      }),
      tasks: [
        {
          instruction: "Share “Referral Packet - Patient 10482.pdf” with only scheduling@riversideimaging.example, view-only.",
          hint: "Select the referral packet › Share. Type scheduling@riversideimaging.example and press Enter, choose Can view, then Send.",
          steps: [on("ref-packet", "od.share", { people: P.riverside.email, permission: "Can view" }, "Share Referral Packet - Patient 10482.pdf.")],
        },
        {
          instruction: "Share “Referral Letter - Patient 10482.docx” with Dr. Priya Shah so she can edit it.",
          hint: "Select the referral letter › Share. Add Dr. Priya Shah, keep Can edit, then Send.",
          steps: [on("ref-letter", "od.share", { people: P.shah.email, permission: "Can edit" }, "Share Referral Letter - Patient 10482.docx.")],
        },
        {
          instruction: "Remove the Anyone link from “Lab Results Summary - Patient 20931.pdf”.",
          hint: "Right-click the lab results summary › Manage access › Links tab. Select Remove link (trash can), then Remove.",
          steps: [on("ref-labs", "od.removeLink", { link: "l-anyone" }, "Open Manage access for the lab results summary.")],
        },
        {
          instruction: "Copy a view-only link to the lab results summary that works only for Dr. Priya Shah.",
          hint: "Select the lab results summary › Share. Type Dr. Priya Shah in the box (don't select Send). Select the gear, choose People you choose, set Can view, Apply, then Copy.",
          steps: [on("ref-labs", "od.link", { scope: "People you choose", permission: "Can view", people: P.shah.email }, "Copy a link to Lab Results Summary - Patient 20931.pdf.")],
        },
      ],
    },
  ],

  "module-3::managing-access": [
    {
      id: "onedrive-m3-managing-1",
      app: "onedrive",
      title: "Clean up who has access",
      scenario:
        "Maria asked you to clean up sharing on the front desk's files: a temp's assignment ended, Kevin can edit a plan he should only read, someone made an Anyone link to the staff schedule, and the supply vendor's contract ended.",
      fileName: "OneDrive",
      minutes: 6,
      initial: work({
        items: [
          ...baseItems().map((i) =>
            i.id === "root-schedule"
              ? { ...i, links: [{ id: "l-sched", scope: "Anyone" as const, perm: "Can edit" as const }], access: [{ email: P.maria.email, perm: "Can edit" as const }] }
              : i.id === "root-supply"
                ? { ...i, access: [{ email: P.northwind.email, perm: "Can edit" as const }, { email: P.kevin.email, perm: "Can view" as const }], links: [{ id: "l-supply", scope: "Organization" as const, perm: "Can view" as const }] }
                : i,
          ),
          F("root-holiday", "Holiday Coverage Plan.docx", "root", { modified: "October 19", access: [{ email: P.maria.email, perm: "Can edit" }, { email: P.kevin.email, perm: "Can edit" }, { email: P.jen.email, perm: "Can edit" }] }),
        ],
      }),
      tasks: [
        {
          instruction: "See every file you have shared.",
          hint: "Select Shared in the left pane, then Shared by you.",
          steps: [{ action: { kind: "command", id: "od.sharedTab", value: "by" } }],
        },
        {
          instruction: "In “Holiday Coverage Plan.docx”, change Kevin Patel's access to Can view.",
          hint: "Right-click Holiday Coverage Plan.docx › Manage access. On the People tab, select Kevin Patel's Can edit and choose Can view.",
          steps: [on("root-holiday", "od.access", { person: P.kevin.email, permission: "Can view" }, "Open Manage access for Holiday Coverage Plan.docx.")],
        },
        {
          instruction: "Remove Jen Cole's access to “Holiday Coverage Plan.docx”.",
          hint: "In Manage access for the plan, select Jen Cole's Can edit › Remove direct access, then Remove.",
          steps: [on("root-holiday", "od.access", { person: P.jen.email, permission: "Remove direct access" }, "Open Manage access for Holiday Coverage Plan.docx.")],
        },
        {
          instruction: "Remove the Anyone link from “Staff Schedule - November.xlsx”.",
          hint: "Right-click the staff schedule › Manage access › Links tab › Remove link, then Remove.",
          steps: [on("root-schedule", "od.removeLink", { link: "l-sched" }, "Open Manage access for Staff Schedule - November.xlsx.")],
        },
        {
          instruction: "Stop sharing “Supply Order Log.xlsx” completely.",
          hint: "Right-click Supply Order Log.xlsx › Manage access › Stop sharing, then confirm Stop sharing.",
          steps: [on("root-supply", "od.stopSharing", {}, "Open Manage access for Supply Order Log.xlsx.")],
        },
      ],
    },
  ],

  "module-3::co-authoring-and-comments": [
    {
      id: "onedrive-m3-coauthoring-1",
      app: "onedrive",
      title: "Co-author the check-in procedures",
      scenario:
        "The front desk team is updating the Check-In Procedures together. Maria is editing right now, Kevin left a question in a comment, and Tasha finished her part. Work in the document with them instead of trading copies by email.",
      fileName: "OneDrive",
      minutes: 6,
      initial: work({
        items: [
          ...baseItems(),
          F("doc-checkin", "Check-In Procedures.docx", "root", {
            modified: "A few minutes ago",
            modifiedBy: P.maria.email,
            access: [{ email: P.maria.email, perm: "Can edit" }, { email: P.kevin.email, perm: "Can edit" }, { email: P.tasha.email, perm: "Can edit" }],
            text: [
              "Check-In Procedures",
              "Greet every patient within one minute of arrival.",
              "Ask the patient to confirm their full name and date of birth.",
              "Ask for the insurance card and a photo ID, and scan both sides of the card.",
              "Confirm the patient's phone number and address.",
              "Collect the copay before the visit.",
            ],
            coauthors: [{ email: P.maria.email, para: "p4" }],
            comments: [
              { id: "c-kevin", para: "p4", author: P.kevin.email, time: "9:12 AM", text: "Should we ask for a photo ID at every visit, or only the first one?" },
              { id: "c-tasha", para: "p2", author: P.tasha.email, time: "8:40 AM", text: "I changed this to one minute, as we discussed." },
            ],
          }),
        ],
      }),
      tasks: [
        {
          instruction: "Open “Check-In Procedures.docx” in Word for the web.",
          hint: "Select the file name Check-In Procedures.docx.",
          steps: [openFile("doc-checkin")],
        },
        {
          instruction: "Open the Comments pane.",
          hint: "Select Comments near the top right.",
          steps: [{ action: { kind: "command", id: "od.pane", value: "comments" } }],
        },
        {
          instruction: "Reply to Kevin's comment: “Yes, at every visit.”",
          hint: "In Kevin's comment, type in the Reply box, then select Reply (or press Ctrl+Enter).",
          steps: [{ action: { kind: "type", target: "reply:c-kevin", value: "every visit", match: "includes" } }],
        },
        {
          instruction: "Add a comment on “Confirm the patient's phone number and address.” that @mentions Maria Santos and asks whether to confirm the email address too.",
          hint: "Click that paragraph, then Review › New comment (or right-click › New comment). Type @Mar, pick Maria Santos, type your question, then select Post.",
          steps: [{ action: { kind: "type", target: "comment:doc-checkin.p5", value: ["@Maria Santos", "email"], match: "all" } }],
        },
        {
          instruction: "Resolve Tasha's comment; her change is done.",
          hint: "In Tasha's comment, select More thread actions (…) › Resolve thread.",
          steps: [{ action: { kind: "dialog", id: "od.resolve", values: { comment: "c-tasha" } } }],
        },
        {
          instruction: "Switch to Reviewing mode so your next edits show as suggestions.",
          hint: "Select the Editing button near the top right, then Reviewing.",
          steps: [{ action: { kind: "dialog", id: "od.mode", values: { mode: "Reviewing" } } }],
        },
      ],
    },
  ],
};

void go;
