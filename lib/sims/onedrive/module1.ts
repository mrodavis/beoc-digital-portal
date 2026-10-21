import type { SimDefinition } from "@/types/sim";
import { baseItems, D, dlg, F, go, on, openFile, P, personal, work } from "./lakeside";

const sharedWithMe = [
  D("sh-procedures", "Front Desk Procedures", undefined, { owner: P.maria.email, modifiedBy: P.maria.email, modified: "October 15", sharedVia: "Shared by link", sync: "cloud" }),
  F("sh-billing", "Billing Codes Quick Reference.xlsx", undefined, { owner: P.kevin.email, modifiedBy: P.kevin.email, modified: "October 13", sharedVia: "Teams chat with Kevin Patel", sync: "cloud" }),
  F("sh-training", "New Hire Orientation Checklist.docx", undefined, { owner: P.renee.email, modifiedBy: P.renee.email, modified: "October 6", sharedVia: "Email from Renee Walker", sync: "cloud" }),
];

export const onedriveModule1Sims: Record<string, SimDefinition[]> = {
  "module-1::what-is-onedrive": [
    {
      id: "onedrive-m1-what-is-onedrive-1",
      app: "onedrive",
      title: "Take a first look at your work OneDrive",
      scenario:
        "It is your first morning using OneDrive at Lakeside Medical Associates. Maria Santos asked you to find the insurance checklist the front desk uses and to get to know where things are before patients arrive.",
      fileName: "OneDrive",
      minutes: 4,
      initial: work({
        items: [...baseItems(), ...sharedWithMe, F("bin-old", "Old Fax Cover Sheet.docx", "root", { deleted: { on: "October 17", by: "Alex Morgan" } })],
      }),
      tasks: [
        {
          instruction: "Open the “Patient Forms” folder.",
          hint: "In My files, select the folder name Patient Forms (or double-click its row).",
          steps: [go("f-forms")],
        },
        {
          instruction: "Open “Insurance Verification Checklist” in the browser.",
          hint: "Select the file name Insurance Verification Checklist. It opens in Word for the web in a new tab.",
          steps: [openFile("forms-insurance")],
        },
        {
          instruction: "Go back to your OneDrive.",
          hint: "Select the first browser tab, My files - OneDrive.",
          steps: [{ action: { kind: "command", id: "od.close" } }],
        },
        {
          instruction: "Open the “Front Desk” folder in My files.",
          hint: "Select My files in the left pane (or My files in the path at the top), then select Front Desk.",
          steps: [go("f-frontdesk")],
        },
        {
          instruction: "Look at the files other people have shared with you.",
          hint: "Select Shared in the left pane.",
          steps: [go("shared")],
        },
        {
          instruction: "Check what is waiting in the Recycle bin.",
          hint: "Select Recycle bin in the left pane.",
          steps: [go("recycle")],
        },
      ],
    },
  ],

  "module-1::the-onedrive-web-layout": [
    {
      id: "onedrive-m1-web-layout-1",
      app: "onedrive",
      title: "Find files fast on an unfamiliar computer",
      scenario:
        "You are covering the check-in window at Lakeside, and a patient needs the number for the billing office. Find the Office Phone List with Search, check who updated it, then learn the other ways to browse your files.",
      fileName: "OneDrive",
      minutes: 5,
      initial: work({
        view: { location: "home" },
        items: [
          ...baseItems().map((i) => (i.id === "root-phones" ? { ...i, modifiedBy: "msantos@lakesidemedical.example", modified: "Yesterday at 4:40 PM", access: [{ email: "msantos@lakesidemedical.example", perm: "Can edit" as const }] } : i)),
          ...sharedWithMe,
          F("root-holiday", "Holiday Coverage Plan.docx", "root", { modified: "October 19", access: [{ email: "msantos@lakesidemedical.example", perm: "Can edit" }] }),
          F("mt-agenda", "Staff Huddle Agenda.docx", undefined, { owner: "msantos@lakesidemedical.example", modifiedBy: "msantos@lakesidemedical.example", modified: "Monday", meeting: "m-huddle", sharedVia: "Monday Staff Huddle" }),
        ],
        meetings: [
          { id: "m-huddle", title: "Monday Staff Huddle", when: "Monday 8:00 AM", files: ["mt-agenda", "root-schedule"] },
          { id: "m-billing", title: "Billing Questions with Kevin", when: "October 16, 2:00 PM", files: ["sh-billing"] },
        ],
      }),
      tasks: [
        {
          instruction: "Search your OneDrive for “phone”.",
          hint: "Select the Search box at the top, type phone, and press Enter.",
          steps: [{ action: { kind: "command", id: "od.search", value: ["phone", "phone list", "office phone list"] } }],
        },
        {
          instruction: "Select “Office Phone List” and open the details pane to see who changed it last.",
          hint: "Select the Office Phone List row (not its name), then select the information (i) button at the top right.",
          steps: [{ action: { kind: "command", id: "od.details" }, requires: { selection: "item:root-phones" }, selectHint: "Select the Office Phone List row first, then open the details pane." }],
        },
        {
          instruction: "Open “Office Phone List”.",
          hint: "Select the file name Office Phone List.",
          steps: [openFile("root-phones")],
        },
        {
          instruction: "Go back to OneDrive and switch My files to tiles view.",
          hint: "Select the My files - OneDrive tab, select My files in the left pane, then select the view button at the top right of the list.",
          steps: [{ action: { kind: "command", id: "od.close" } }, { action: { kind: "command", id: "od.layout", value: "tiles" } }],
        },
        {
          instruction: "Use People to see the files you and Maria Santos share.",
          hint: "Under Browse files by in the left pane, select People, then select Maria Santos.",
          steps: [go("person:msantos@lakesidemedical.example")],
        },
        {
          instruction: "Use Meetings to open the files from the Monday Staff Huddle.",
          hint: "Under Browse files by, select Meetings, then select Monday Staff Huddle.",
          steps: [go("meeting:m-huddle")],
        },
      ],
    },
  ],

  "module-1::work-and-personal-accounts": [
    {
      id: "onedrive-m1-accounts-1",
      app: "onedrive",
      title: "Clean a work file out of your personal OneDrive",
      scenario:
        "At home, you find a copy of the Lakeside staff schedule in your personal OneDrive. The original is safe in your work OneDrive, so remove this copy completely from your personal account.",
      fileName: "OneDrive - Personal",
      minutes: 4,
      initial: personal({
        items: [
          D("p-docs", "Documents", "root", { modified: "October 18" }),
          D("p-pics", "Pictures", "root", { modified: "October 12" }),
          { id: "p-vault", name: "Personal Vault", kind: "vault", parent: "root", modified: "" },
          F("p-resume", "Resume - Alex Morgan.docx", "p-docs", { modified: "September 3" }),
          F("p-school", "School Supply List.pdf", "p-docs", { modified: "August 20" }),
          F("p-staffcopy", "Lakeside Staff Schedule - copy.xlsx", "p-docs", { modified: "June 7", size: "58 KB" }),
          F("p-beach", "Beach Day.jpg", "p-pics", { modified: "July 4", size: "3.2 MB", taken: "July 4" }),
          F("p-party", "Birthday Party.jpg", "p-pics", { modified: "August 11", size: "2.8 MB", taken: "August 11" }),
        ],
      }),
      tasks: [
        {
          instruction: "Open the “Documents” folder.",
          hint: "In My files, select Documents.",
          steps: [go("p-docs")],
        },
        {
          instruction: "Delete “Lakeside Staff Schedule - copy.xlsx”.",
          hint: "Select the file's row, select Delete in the command bar, then select Delete to confirm. (Or right-click it › Delete.)",
          steps: [on("p-staffcopy", "od.delete", {}, "Select Lakeside Staff Schedule - copy.xlsx first.")],
        },
        {
          instruction: "Open the Recycle bin.",
          hint: "Select Recycle bin in the left pane.",
          steps: [go("recycle")],
        },
        {
          instruction: "Permanently delete the staff schedule copy so no copy stays in your personal account.",
          hint: "In the Recycle bin, select Lakeside Staff Schedule - copy.xlsx, select Delete, then confirm.",
          steps: [on("p-staffcopy", "od.purge", {}, "Select Lakeside Staff Schedule - copy.xlsx in the Recycle bin first.")],
        },
        {
          instruction: "Open your photos.",
          hint: "Select Photos in the left pane.",
          steps: [go("photos")],
        },
      ],
    },
  ],
};

void dlg;
