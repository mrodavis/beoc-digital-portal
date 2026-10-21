import type { SimDefinition } from "@/types/sim";
import { baseItems, D, dlg, F, go, on, P, work } from "./lakeside";

export const onedriveModule2Sims: Record<string, SimDefinition[]> = {
  "module-2::uploading-and-creating": [
    {
      id: "onedrive-m2-uploading-1",
      app: "onedrive",
      title: "Set up a Referrals folder",
      scenario:
        "Referral paperwork at Lakeside is scattered across email, a USB drive, and printouts. Maria asked you to give it one home in OneDrive and to bring in the Health Fair materials a volunteer handed you.",
      fileName: "OneDrive",
      minutes: 6,
      initial: work({
        computer: [
          { name: "Referral Tracking Log.xlsx", size: "38 KB", modified: "10/19/2026 4:02 PM" },
          { name: "Referral Fax Cover Sheet.docx", size: "21 KB", modified: "10/16/2026 9:15 AM" },
          { name: "Lunch Order.docx", size: "12 KB", modified: "10/20/2026 11:30 AM" },
          { name: "Riverside Imaging Fax Numbers.pdf", size: "64 KB", modified: "10/2/2026 2:47 PM" },
          {
            name: "Health Fair Materials",
            folder: true,
            children: [
              { name: "Blood Pressure Handout.pdf", size: "210 KB" },
              { name: "Health Fair Sign-In Sheet.docx", size: "18 KB" },
              { name: "Table Banner.png", size: "1.4 MB" },
            ],
          },
          { name: "Old Scanner Drivers", folder: true, children: [{ name: "setup.txt", size: "2 KB" }] },
        ],
      }),
      tasks: [
        {
          instruction: "In My files, create a folder named “Referrals”.",
          hint: "Select Create or upload › Folder, type Referrals, then select Create.",
          steps: [dlg("od.newFolder", { parent: "root", name: "Referrals" })],
        },
        {
          instruction: "Open the Referrals folder.",
          hint: "Select Referrals in the file list.",
          steps: [go("new1")],
        },
        {
          instruction: "Upload “Referral Tracking Log.xlsx” and “Referral Fax Cover Sheet.docx” into Referrals in one step.",
          hint: "Create or upload › Files upload. Click Referral Tracking Log.xlsx, hold Ctrl and click Referral Fax Cover Sheet.docx, then select Open.",
          steps: [dlg("od.upload", { folder: "new1", file: "Referral Fax Cover Sheet.docx; Referral Tracking Log.xlsx" })],
        },
        {
          instruction: "In Referrals, create a new Word document.",
          hint: "Create or upload › Word document.",
          steps: [dlg("od.newFile", { folder: "new1", kind: "Word document" })],
        },
        {
          instruction: "Rename “Document.docx” to “Referral Phone Log.docx”.",
          hint: "Select the Document.docx row, select Rename in the command bar, type Referral Phone Log, then select Rename.",
          steps: [on("new4", "od.rename", { name: "Referral Phone Log.docx" }, "Rename the new Document.docx file.")],
        },
        {
          instruction: "Go back to My files and upload the whole “Health Fair Materials” folder there.",
          hint: "Select My files in the left pane, then Create or upload › Folder upload. Select Health Fair Materials, then Upload.",
          steps: [dlg("od.upload", { folder: "root", file: "Health Fair Materials" })],
        },
      ],
    },
  ],

  "module-2::moving-copying-renaming": [
    {
      id: "onedrive-m2-organizing-1",
      app: "onedrive",
      title: "Tidy up the front desk's My files",
      scenario:
        "After a busy week, My files is a mess: an unnamed scan, forms in the wrong place, a duplicate flyer, and a supply log with no folder. Tasha also needs her own copy of the reminder template for a training packet.",
      fileName: "OneDrive",
      minutes: 7,
      initial: work({
        items: [
          ...baseItems(),
          F("root-scan", "scan0042.pdf", "root", { modified: "October 19", size: "412 KB" }),
          F("root-release", "Medical Records Release Form.pdf", "root", { modified: "October 15", size: "92 KB" }),
          F("root-financial", "Financial Policy Form.pdf", "root", { modified: "October 15", size: "88 KB" }),
          F("root-telehealth", "Telehealth Consent Form.pdf", "root", { modified: "October 15", size: "79 KB" }),
          F("root-flyercopy", "Copy of Flu Clinic Flyer.docx", "root", { modified: "October 18", size: "220 KB" }),
        ],
      }),
      tasks: [
        {
          instruction: "Rename “scan0042.pdf” to “Northwind Supply Invoice - October.pdf”.",
          hint: "Select the scan0042.pdf row, select Rename, type the new name, and select Rename.",
          steps: [on("root-scan", "od.rename", { name: "Northwind Supply Invoice - October.pdf" }, "Select scan0042.pdf first.")],
        },
        {
          instruction: "Move “Medical Records Release Form”, “Financial Policy Form”, and “Telehealth Consent Form” into the Patient Forms folder in one step.",
          hint: "Select the round check box on each of the three forms, select Move to, select Patient Forms, then Move here. (You can also drag the selected files onto Patient Forms.)",
          steps: [dlg("od.move", { file: "root-financial,root-release,root-telehealth", folder: "f-forms" })],
        },
        {
          instruction: "Copy “Appointment Reminder Template.docx” from the Front Desk folder into the Training folder.",
          hint: "Open Front Desk, select Appointment Reminder Template.docx, select Copy to, open Training, then select Copy here.",
          steps: [dlg("od.copy", { file: "frontdesk-reminder", folder: "f-training" })],
        },
        {
          instruction: "Back in My files, delete the duplicate “Copy of Flu Clinic Flyer.docx”.",
          hint: "Select My files, select Copy of Flu Clinic Flyer.docx, select Delete, then confirm.",
          steps: [on("root-flyercopy", "od.delete", {}, "Select Copy of Flu Clinic Flyer.docx first.")],
        },
        {
          instruction: "Create a folder named “Supplies” in My files.",
          hint: "Create or upload › Folder, type Supplies, then Create.",
          steps: [dlg("od.newFolder", { parent: "root", name: "Supplies" })],
        },
        {
          instruction: "Move “Supply Order Log.xlsx” into Supplies.",
          hint: "Drag Supply Order Log.xlsx onto the Supplies folder, or select it, select Move to, select Supplies, then Move here.",
          steps: [dlg("od.move", { file: "root-supply", folder: "new2" })],
        },
      ],
    },
  ],

  "module-2::finding-files": [
    {
      id: "onedrive-m2-finding-1",
      app: "onedrive",
      title: "Make your everyday files one click away",
      scenario:
        "Every shift starts with the same files: the intake form, the phone list, and Maria's Front Desk Procedures folder. Set OneDrive up so you never have to dig for them again.",
      fileName: "OneDrive",
      minutes: 5,
      initial: work({
        view: { location: "home" },
        items: [
          ...baseItems(),
          D("sh-procedures", "Front Desk Procedures", undefined, { owner: P.maria.email, modifiedBy: P.maria.email, modified: "October 15", sharedVia: "Shared by link", sync: "cloud" }),
          F("sh-proc-checkin", "Check-In Steps.docx", "sh-procedures", { owner: P.maria.email, modifiedBy: P.maria.email, modified: "October 15" }),
          F("sh-proc-closing", "Closing Checklist.docx", "sh-procedures", { owner: P.maria.email, modifiedBy: P.maria.email, modified: "October 10" }),
          F("sh-billing", "Billing Codes Quick Reference.xlsx", undefined, { owner: P.kevin.email, modifiedBy: P.kevin.email, modified: "October 13", sharedVia: "Teams chat with Kevin Patel", sync: "cloud" }),
        ],
      }),
      tasks: [
        {
          instruction: "Search for “intake”.",
          hint: "Type intake in the Search box at the top and press Enter.",
          steps: [{ action: { kind: "command", id: "od.search", value: ["intake", "intake form", "new patient intake"] } }],
        },
        {
          instruction: "Add “New Patient Intake Form.pdf” to your favorites.",
          hint: "Right-click New Patient Intake Form.pdf (or select More actions …) and select Add to favorites.",
          steps: [on("forms-intake", "od.favorite", { on: true }, "Add New Patient Intake Form.pdf to favorites.")],
        },
        {
          instruction: "Add “Office Phone List.docx” to your favorites too.",
          hint: "Go to My files, right-click Office Phone List.docx, and select Add to favorites. (Or search for it.)",
          steps: [on("root-phones", "od.favorite", { on: true }, "Add Office Phone List.docx to favorites.")],
        },
        {
          instruction: "Open your Favorites.",
          hint: "Select Favorites in the left pane.",
          steps: [go("favorites")],
        },
        {
          instruction: "Add a shortcut to Maria's “Front Desk Procedures” folder to My files.",
          hint: "Select Shared, then right-click Front Desk Procedures (or select it) and select Add shortcut to My files.",
          steps: [on("sh-procedures", "od.shortcut", {}, "Add the shortcut for the Front Desk Procedures folder.")],
        },
        {
          instruction: "Open My files and use the new shortcut to open Front Desk Procedures.",
          hint: "Select My files, then select Front Desk Procedures (it has a small arrow on its icon).",
          steps: [go("sh-procedures")],
        },
      ],
    },
  ],
};
