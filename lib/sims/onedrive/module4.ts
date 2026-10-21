import type { SimDefinition } from "@/types/sim";
import type { OdActivity, OdItem } from "@/components/sim/apps/onedrive/types";
import { baseItems, D, dlg, F, go, on, P, personal, work } from "./lakeside";

/* ---------------- Version history ---------------- */

const SCHEDULE_V5 = ["Staff Schedule - November", "Shifts: October 1 to October 31 (pasted by mistake)", "Front desk: Alex, Omar", "Billing: Kevin"];
const SCHEDULE_V4 = ["Staff Schedule - November", "Shifts: November 2 to November 27", "Front desk: Alex, Omar, Jen", "Billing: Kevin", "Holiday coverage: see the Holiday Coverage Plan"];

function versionItems(): OdItem[] {
  return baseItems().map((i) => {
    if (i.id === "root-schedule")
      return {
        ...i,
        version: "5.0",
        modified: "Today at 9:05 AM",
        modifiedBy: P.kevin.email,
        text: SCHEDULE_V5,
        versions: [
          { id: "sv4", label: "4.0", modified: "Yesterday at 4:12 PM", by: P.maria.email, size: "64 KB", text: SCHEDULE_V4 },
          { id: "sv3", label: "3.0", modified: "October 16 at 10:30 AM", by: P.maria.email, size: "61 KB", text: ["Staff Schedule - November", "Draft shifts (not final)"] },
          { id: "sv2", label: "2.0", modified: "October 14 at 2:05 PM", by: P.maria.email, size: "40 KB", text: ["Staff Schedule - November", "Template only"] },
        ],
      };
    if (i.id === "frontdesk-script")
      return {
        ...i,
        version: "3.0",
        modified: "Today at 8:51 AM",
        modifiedBy: P.omar.email,
        text: ["Phone Script - New Patients", "Hi, Lakeside.", "What do you want?"],
        versions: [
          { id: "ps2", label: "2.0", modified: "October 2 at 11:20 AM", by: "amorgan@lakesidemedical.example", size: "27 KB", text: ["Phone Script - New Patients", "Thank you for calling Lakeside Medical Associates. This is Alex. How can I help you?", "Ask for the caller's name, date of birth, and insurance."] },
          { id: "ps1", label: "1.0", modified: "September 29 at 3:00 PM", by: "amorgan@lakesidemedical.example", size: "20 KB", text: ["Phone Script - New Patients", "Draft"] },
        ],
      };
    if (i.id === "frontdesk-huddle")
      return {
        ...i,
        version: "3.0",
        modified: "Today at 7:58 AM",
        modifiedBy: P.tasha.email,
        text: ["Daily Huddle Notes", "(notes deleted by mistake)"],
        versions: [
          { id: "hn2", label: "2.0", modified: "Yesterday at 8:12 AM", by: "amorgan@lakesidemedical.example", size: "31 KB", text: ["Daily Huddle Notes", "Two providers out Friday afternoon. Move walk-ins to Dr. Shah.", "The fax line is fixed.", "Reminder: verify insurance at every visit."] },
          { id: "hn1", label: "1.0", modified: "October 19 at 8:05 AM", by: "amorgan@lakesidemedical.example", size: "18 KB", text: ["Daily Huddle Notes"] },
        ],
      };
    return i;
  });
}

/* ---------------- Restore your OneDrive ---------------- */

function attackItems(): OdItem[] {
  const locked = (i: OdItem): OdItem => ({ ...i, name: `${i.name}.locked`, modified: "Yesterday at 11:52 PM", modifiedBy: P.omar.email, text: ["(This file can't be opened.)"] });
  const hit = new Set(["frontdesk-huddle", "frontdesk-script", "frontdesk-reminder", "forms-insurance", "root-phones"]);
  return [
    ...baseItems().map((i) => (hit.has(i.id) ? locked(i) : i.id === "root-schedule" ? { ...i, modified: "Today at 8:40 AM", modifiedBy: P.maria.email } : i)),
    F("ransom-note", "READ_ME_TO_RECOVER.txt", "root", { modified: "Yesterday at 11:58 PM", modifiedBy: P.omar.email, size: "2 KB" }),
  ];
}

const ORIGINAL_TEXT: Record<string, string[] | undefined> = Object.fromEntries(baseItems().map((i) => [i.id, i.text]));
const renamed = (file: string, name: string) => ({ op: "rename" as const, name, ...(ORIGINAL_TEXT[file] ? { text: ORIGINAL_TEXT[file] } : {}) });

const ATTACK: OdActivity[] = [
  { id: "a9", time: "Today 8:40 AM", daysAgo: 0, text: "Maria Santos edited Staff Schedule - November.xlsx", file: "root-schedule", undo: { op: "text", text: ["Staff Schedule - November"] } },
  { id: "a8", time: "Yesterday 11:58 PM", daysAgo: 1, text: "READ_ME_TO_RECOVER.txt was created", file: "ransom-note", undo: { op: "remove" } },
  { id: "a7", time: "Yesterday 11:55 PM", daysAgo: 1, text: "Office Phone List.docx was renamed to Office Phone List.docx.locked", file: "root-phones", undo: renamed("root-phones", "Office Phone List.docx") },
  { id: "a6", time: "Yesterday 11:54 PM", daysAgo: 1, text: "Insurance Verification Checklist.docx was renamed to Insurance Verification Checklist.docx.locked", file: "forms-insurance", undo: renamed("forms-insurance", "Insurance Verification Checklist.docx") },
  { id: "a5", time: "Yesterday 11:53 PM", daysAgo: 1, text: "Appointment Reminder Template.docx was renamed to Appointment Reminder Template.docx.locked", file: "frontdesk-reminder", undo: renamed("frontdesk-reminder", "Appointment Reminder Template.docx") },
  { id: "a4", time: "Yesterday 11:52 PM", daysAgo: 1, text: "Phone Script - New Patients.docx was renamed to Phone Script - New Patients.docx.locked", file: "frontdesk-script", undo: renamed("frontdesk-script", "Phone Script - New Patients.docx") },
  { id: "a3", time: "Yesterday 11:52 PM", daysAgo: 1, text: "Daily Huddle Notes.docx was renamed to Daily Huddle Notes.docx.locked", file: "frontdesk-huddle", undo: renamed("frontdesk-huddle", "Daily Huddle Notes.docx") },
  { id: "a2", time: "Yesterday 4:12 PM", daysAgo: 1, text: "You edited Flu Clinic Flyer.docx", file: "root-flyer", undo: { op: "text", text: ["Flu Shot Clinic"] } },
  { id: "a1", time: "October 16 10:30 AM", daysAgo: 5, text: "You uploaded Supply Order Log.xlsx", file: "root-supply", undo: { op: "remove" } },
];

export const onedriveModule4Sims: Record<string, SimDefinition[]> = {
  "module-4::version-history": [
    {
      id: "onedrive-m4-version-history-1",
      app: "onedrive",
      title: "Undo the overwrites with version history",
      scenario:
        "Three files went wrong this morning at Lakeside: Kevin pasted October's shifts over the November schedule, the new-patient phone script was replaced with a rough draft, and the huddle notes were wiped. OneDrive kept the earlier versions.",
      fileName: "OneDrive",
      minutes: 6,
      initial: work({ items: versionItems() }),
      tasks: [
        {
          instruction: "Restore version 4.0 of “Staff Schedule - November.xlsx”, the one Maria saved yesterday.",
          hint: "Right-click Staff Schedule - November.xlsx › Version history. Select the date of version 4.0 to read it first, then select the ellipses (…) next to 4.0 › Restore.",
          steps: [on("root-schedule", "od.restoreVersion", { version: "sv4" }, "Open the version history of Staff Schedule - November.xlsx.")],
        },
        {
          instruction: "In the Front Desk folder, restore version 2.0 of “Phone Script - New Patients.docx”.",
          hint: "Open Front Desk, right-click Phone Script - New Patients.docx › Version history › the ellipses (…) next to 2.0 › Restore.",
          steps: [on("frontdesk-script", "od.restoreVersion", { version: "ps2" }, "Open the version history of Phone Script - New Patients.docx.")],
        },
        {
          instruction: "Open “Daily Huddle Notes.docx” in the Word app.",
          hint: "Right-click Daily Huddle Notes.docx › Open › Open in app.",
          steps: [{ action: { kind: "command", id: "od.openApp", value: "frontdesk-huddle" } }],
        },
        {
          instruction: "From inside Word, restore yesterday's version 2.0 of the huddle notes.",
          hint: "Select the file name in Word's title bar › Version History (or File › Info › Version History). Next to 2.0, select the ellipses (…) › Restore.",
          steps: [on("frontdesk-huddle", "od.restoreVersion", { version: "hn2" }, "Open Version History for Daily Huddle Notes.")],
        },
        {
          instruction: "Close Word.",
          hint: "Select the X at the top right of the Word window.",
          steps: [{ action: { kind: "command", id: "od.close" } }],
        },
      ],
    },
  ],

  "module-4::recycle-bin": [
    {
      id: "onedrive-m4-recycle-bin-1",
      app: "onedrive",
      title: "Get back what you deleted by mistake",
      scenario:
        "While tidying up yesterday, you deleted one file too many: the flu clinic team can't find their flyer, the vendor contacts and training video are gone, and so is a folder of health fair photos. Restore what people need and permanently remove only the duplicate.",
      fileName: "OneDrive",
      minutes: 5,
      initial: work({
        items: [
          ...baseItems().map((i) => (i.id === "root-flyer" ? { ...i, deleted: { on: "Yesterday at 5:41 PM", by: "Alex Morgan" } } : i)),
          F("bin-vendors", "Vendor Contacts.xlsx", "root", { deleted: { on: "Yesterday at 5:42 PM", by: "Alex Morgan" } }),
          F("bin-video", "Front Desk Training Video.mp4", "f-training", { size: "84 MB", deleted: { on: "Yesterday at 5:42 PM", by: "Alex Morgan" } }),
          D("bin-photos", "Health Fair Photos", "root", { deleted: { on: "Yesterday at 5:43 PM", by: "Alex Morgan" } }),
          F("bin-photo1", "Blood Pressure Table.jpg", "bin-photos", { size: "2.9 MB" }),
          F("bin-photo2", "Volunteer Team.jpg", "bin-photos", { size: "3.4 MB" }),
          F("bin-faxcopy", "Old Fax Cover Sheet (copy).docx", "root", { deleted: { on: "October 17", by: "Alex Morgan" } }),
        ],
      }),
      tasks: [
        {
          instruction: "Open the Recycle bin.",
          hint: "Select Recycle bin in the left pane.",
          steps: [go("recycle")],
        },
        {
          instruction: "Restore “Flu Clinic Flyer.docx”.",
          hint: "Select the flyer's row, then select Restore.",
          steps: [on("root-flyer", "od.restore", {}, "Select Flu Clinic Flyer.docx in the Recycle bin first.")],
        },
        {
          instruction: "Restore “Vendor Contacts.xlsx” and “Front Desk Training Video.mp4” in one step.",
          hint: "Select both check boxes, then select Restore.",
          steps: [dlg("od.restore", { file: "bin-vendors,bin-video" })],
        },
        {
          instruction: "Restore the “Health Fair Photos” folder with everything in it.",
          hint: "Select Health Fair Photos, then select Restore.",
          steps: [on("bin-photos", "od.restore", {}, "Select the Health Fair Photos folder first.")],
        },
        {
          instruction: "Permanently delete the duplicate “Old Fax Cover Sheet (copy).docx”.",
          hint: "Select it, select Delete, then confirm Delete.",
          steps: [on("bin-faxcopy", "od.purge", {}, "Select Old Fax Cover Sheet (copy).docx first.")],
        },
        {
          instruction: "Open the restored Health Fair Photos folder from My files.",
          hint: "Select My files, then select Health Fair Photos.",
          steps: [go("bin-photos")],
        },
      ],
    },
  ],

  "module-4::restore-your-onedrive": [
    {
      id: "onedrive-m4-restore-1",
      app: "onedrive",
      title: "Roll back a ransomware attack",
      scenario:
        "Overnight, five front desk files were renamed to end in .locked and a ransom note appeared. You reported it, and Luis in IT has cleaned the infected laptop. Now roll your OneDrive back to just before the attack.",
      fileName: "OneDrive",
      minutes: 5,
      initial: work({ items: attackItems(), activities: ATTACK }),
      tasks: [
        {
          instruction: "Open Restore your OneDrive.",
          hint: "Select Settings (the gear at the top right), then Restore OneDrive.",
          steps: [go("restore")],
        },
        {
          instruction: "Restore your OneDrive to just before the first .locked rename, using Custom date and time.",
          hint: "Under Select a date, choose Custom date and time. In the activity feed, select the earliest .locked activity (Yesterday 11:52 PM, Daily Huddle Notes). Select Restore, then Restore again to confirm.",
          steps: [dlg("od.restoreOneDrive", { date: "Custom date and time", from: "a3" })],
        },
        {
          instruction: "Go to My files to check the restored files.",
          hint: "Select Go to My files, or My files in the left pane.",
          steps: [go("root")],
        },
        {
          instruction: "The ransom note was moved to the Recycle bin. Permanently delete it.",
          hint: "Select Recycle bin, select READ_ME_TO_RECOVER.txt, select Delete, then confirm.",
          steps: [on("ransom-note", "od.purge", {}, "Select READ_ME_TO_RECOVER.txt in the Recycle bin.")],
        },
      ],
    },
    {
      id: "onedrive-m4-restore-lab",
      app: "onedrive",
      role: "challenge",
      title: "Challenge Lab: Restore your OneDrive after an attack",
      scenario:
        "Challenge Lab. A ransomware attack renamed five front desk files overnight. IT has cleaned the infected device. Review the activity, roll back to the earliest bad activity, confirm the files are back, and remove the ransom note.",
      fileName: "OneDrive",
      minutes: 6,
      initial: work({ items: attackItems(), activities: ATTACK }),
      tasks: [
        {
          instruction: "Open Settings › Restore OneDrive.",
          hint: "Select Settings (the gear at the top right), then Restore OneDrive.",
          steps: [go("restore")],
        },
        {
          instruction: "Choose Custom date and time, select the earliest bad activity, and restore.",
          hint: "Select a date › Custom date and time. Select the activity at Yesterday 11:52 PM for Daily Huddle Notes.docx (the first .locked rename), then Restore › Restore.",
          steps: [dlg("od.restoreOneDrive", { date: "Custom date and time", from: "a3" })],
        },
        {
          instruction: "Open the Front Desk folder and confirm the files have their normal names.",
          hint: "Select My files, then Front Desk.",
          steps: [go("f-frontdesk")],
        },
        {
          instruction: "Open “Daily Huddle Notes.docx” to confirm it opens.",
          hint: "Select the file name Daily Huddle Notes.docx.",
          steps: [{ action: { kind: "command", id: "od.open", value: "frontdesk-huddle" } }],
        },
        {
          instruction: "Return to OneDrive and permanently delete READ_ME_TO_RECOVER.txt from the Recycle bin.",
          hint: "Select the first browser tab, select Recycle bin, select READ_ME_TO_RECOVER.txt, select Delete, then confirm.",
          steps: [on("ransom-note", "od.purge", {}, "Select READ_ME_TO_RECOVER.txt in the Recycle bin.")],
        },
      ],
    },
  ],

  "module-4::account-security-and-personal-vault": [
    {
      id: "onedrive-m4-vault-1",
      app: "onedrive",
      title: "Lock your ID scans in Personal Vault",
      scenario:
        "At home, you keep scans of your passport and car insurance card in your personal OneDrive's Documents folder. Move them into Personal Vault, clean out an old copy, and lock the vault.",
      fileName: "OneDrive - Personal",
      minutes: 5,
      initial: personal({
        items: [
          D("p-docs", "Documents", "root", { modified: "October 18" }),
          D("p-pics", "Pictures", "root", { modified: "October 12" }),
          { id: "p-vault", name: "Personal Vault", kind: "vault", parent: "root", modified: "" },
          F("p-taxes", "Tax Return.pdf", "p-vault", { modified: "April 10", size: "880 KB" }),
          F("p-passport", "Passport Scan.pdf", "p-docs", { modified: "September 9", size: "1.2 MB" }),
          F("p-carins", "Car Insurance Card.jpg", "p-docs", { modified: "August 30", size: "2.1 MB" }),
          F("p-resume", "Resume - Alex Morgan.docx", "p-docs", { modified: "September 3" }),
          F("p-oldpass", "Passport Scan - old copy.pdf", "p-docs", { modified: "June 2", size: "1.1 MB", deleted: { on: "October 18", by: "Alex Morgan" } }),
        ],
      }),
      tasks: [
        {
          instruction: "Open Personal Vault and verify your identity to unlock it.",
          hint: "In My files, select Personal Vault › Unlock. Choose a method, select Next, type the practice code shown, and select Verify.",
          steps: [dlg("od.vault", { action: "unlock" })],
        },
        {
          instruction: "Move “Passport Scan.pdf” and “Car Insurance Card.jpg” from Documents into Personal Vault in one step.",
          hint: "Go to My files › Documents, select both check boxes, select Move to, select Personal Vault, then Move here.",
          steps: [dlg("od.move", { file: "p-carins,p-passport", folder: "p-vault" })],
        },
        {
          instruction: "Permanently delete the old passport copy that is still in the Recycle bin.",
          hint: "Select Recycle bin, select Passport Scan - old copy.pdf, select Delete, then confirm.",
          steps: [on("p-oldpass", "od.purge", {}, "Select Passport Scan - old copy.pdf in the Recycle bin.")],
        },
        {
          instruction: "Open Personal Vault again, then lock it.",
          hint: "Select My files › Personal Vault (verify again if it asks), then select Lock next to the folder name.",
          steps: [dlg("od.vault", { action: "lock" })],
        },
      ],
    },
  ],
};
