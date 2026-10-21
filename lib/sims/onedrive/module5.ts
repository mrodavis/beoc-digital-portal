import type { SimDefinition } from "@/types/sim";
import type { OdItem, OdPc } from "@/components/sim/apps/onedrive/types";
import { baseItems, dlg, F, go, on, work } from "./lakeside";

const pcBase = (o: Partial<OdPc> = {}): OdPc => ({
  name: "LMA-FRONT-02",
  location: "This PC",
  paused: null,
  backup: {},
  free: "38.2 GB",
  local: {
    Desktop: [
      { name: "Lunch Order Form.docx", size: "22 KB", modified: "10/20/2026 11:02 AM" },
      { name: "Holiday Signup Sheet.xlsx", size: "31 KB", modified: "10/14/2026 3:40 PM" },
      { name: "Screenshot 2026-10-19 090412.png", size: "410 KB", modified: "10/19/2026 9:04 AM" },
    ],
    Documents: [
      { name: "Fax Log.xlsx", size: "54 KB", modified: "10/18/2026 4:15 PM" },
      { name: "Vendor Phone Numbers.docx", size: "19 KB", modified: "9/30/2026 10:11 AM" },
    ],
    Pictures: [{ name: "Office Holiday Party.jpg", size: "3.8 MB", modified: "12/18/2025 6:20 PM" }],
  },
  ...o,
});

function syncItems(): OdItem[] {
  return [
    ...baseItems().map((i) => (i.id === "f-training" ? { ...i, sync: "local" as const } : i)),
    F("training-video1", "Phone System Training.mp4", "f-training", { size: "212 MB", sync: "local", modified: "September 12" }),
    F("training-video2", "HIPAA Basics Training.mp4", "f-training", { size: "348 MB", sync: "local", modified: "September 12" }),
  ];
}

export const onedriveModule5Sims: Record<string, SimDefinition[]> = {
  "module-5::the-sync-app": [
    {
      id: "onedrive-m5-sync-app-1",
      app: "onedrive",
      title: "Work with OneDrive from File Explorer",
      scenario:
        "The OneDrive sync app is set up on the Lakeside front desk computer. Use your OneDrive from File Explorer, pause syncing during a video visit on a slow connection, and then open a folder on the web.",
      fileName: "File Explorer",
      minutes: 5,
      initial: work({ surface: "explorer", items: syncItems(), pc: pcBase() }),
      tasks: [
        {
          instruction: "Open your OneDrive folder in File Explorer.",
          hint: "In the navigation pane on the left, select OneDrive - Lakeside Medical Associates.",
          steps: [{ action: { kind: "command", id: "od.exp.nav", value: "onedrive" } }],
        },
        {
          instruction: "Create a folder named “Vaccine Clinic” in your OneDrive.",
          hint: "Select New › Folder, type Vaccine Clinic, and press Enter.",
          steps: [dlg("od.newFolder", { parent: "root", name: "Vaccine Clinic" })],
        },
        {
          instruction: "A video visit is starting on a slow connection. Pause syncing for 2 hours.",
          hint: "Right-click the OneDrive cloud icon at the bottom right (or select it, then Help & Settings), select Pause syncing › 2 hours.",
          steps: [dlg("od.pause", { hours: 2 })],
        },
        {
          instruction: "The visit is over. Resume syncing.",
          hint: "Select the OneDrive cloud icon, then the yellow Syncing is paused message (or Help & Settings › Resume syncing).",
          steps: [dlg("od.resume", {})],
        },
        {
          instruction: "Open the Patient Forms folder in OneDrive on the web, straight from File Explorer.",
          hint: "Right-click Patient Forms › View online.",
          steps: [go("f-forms")],
        },
      ],
    },
    {
      id: "onedrive-m5-sync-app-lab",
      app: "onedrive",
      role: "challenge",
      title: "Challenge Lab: The OneDrive sync app",
      scenario:
        "Challenge Lab. Do this lesson's challenge on a practice PC: open your OneDrive folder, create a practice folder, pause and resume syncing, and find the folder online.",
      fileName: "File Explorer",
      minutes: 5,
      initial: work({ surface: "explorer", items: syncItems(), pc: pcBase() }),
      tasks: [
        {
          instruction: "Open your OneDrive folder in File Explorer and look at the Status column.",
          hint: "Select OneDrive - Lakeside Medical Associates in the navigation pane.",
          steps: [{ action: { kind: "command", id: "od.exp.nav", value: "onedrive" } }],
        },
        {
          instruction: "Create a folder named “OneDrive Sync Practice” in your OneDrive folder.",
          hint: "New › Folder, type OneDrive Sync Practice, press Enter.",
          steps: [dlg("od.newFolder", { parent: "root", name: "OneDrive Sync Practice" })],
        },
        {
          instruction: "Pause syncing for 2 hours.",
          hint: "Right-click the OneDrive cloud icon › Pause syncing › 2 hours.",
          steps: [dlg("od.pause", { hours: 2 })],
        },
        {
          instruction: "Resume syncing.",
          hint: "Select the cloud icon, then the Syncing is paused message, or Help & Settings › Resume syncing.",
          steps: [dlg("od.resume", {})],
        },
        {
          instruction: "Open OneDrive Sync Practice on the web.",
          hint: "Right-click OneDrive Sync Practice › View online.",
          steps: [go("new1")],
        },
      ],
    },
  ],

  "module-5::files-on-demand": [
    {
      id: "onedrive-m5-files-on-demand-1",
      app: "onedrive",
      title: "Pack the laptop for the health fair",
      scenario:
        "The community health fair is in a gym with no reliable Wi-Fi, and the laptop's drive is nearly full of training videos. Keep the patient forms on the laptop for offline use and free up space everywhere else.",
      fileName: "File Explorer",
      minutes: 5,
      initial: work({ surface: "explorer", items: syncItems(), pc: pcBase({ location: "onedrive", name: "LMA-LAPTOP-04", free: "4.1 GB" }) }),
      tasks: [
        {
          instruction: "Make the whole “Patient Forms” folder always available on this device.",
          hint: "Right-click Patient Forms › Always keep on this device. Its status becomes a solid green circle.",
          steps: [on("f-forms", "od.keep", {}, "Right-click the Patient Forms folder.")],
        },
        {
          instruction: "Free up the space used by the “Training” folder.",
          hint: "Right-click Training › Free up space. The videos stay in OneDrive but become online-only.",
          steps: [on("f-training", "od.free", {}, "Right-click the Training folder.")],
        },
        {
          instruction: "Open “Office Phone List.docx”, then close it. (Opening an online-only file downloads it.)",
          hint: "Double-click Office Phone List.docx. When it opens, select the My files - OneDrive tab to close it.",
          steps: [{ action: { kind: "command", id: "od.open", value: "root-phones" } }, { action: { kind: "command", id: "od.close" } }],
        },
        {
          instruction: "In OneDrive settings, use Free up disk space for everything you haven't chosen to keep.",
          hint: "Right-click the OneDrive cloud icon › Settings › Sync and backup › Advanced settings › Free up disk space › Continue.",
          steps: [dlg("od.fod", { action: "Free up disk space" })],
        },
      ],
    },
    {
      id: "onedrive-m5-files-on-demand-lab",
      app: "onedrive",
      role: "challenge",
      title: "Challenge Lab: Always keep and free up space",
      scenario:
        "Challenge Lab. Do this lesson's challenge on a practice PC: check the status icons, keep a folder on the device, then free up its space.",
      fileName: "File Explorer",
      minutes: 4,
      initial: work({ surface: "explorer", items: [...syncItems(), { id: "sync-practice", name: "OneDrive Sync Practice", kind: "folder", parent: "root", modified: "Today", sync: "cloud" }, F("sync-practice-notes", "Practice Notes.docx", "sync-practice", { sync: "cloud" })], pc: pcBase({ location: "onedrive" }) }),
      tasks: [
        {
          instruction: "Open “Practice Notes.docx” in OneDrive Sync Practice so it becomes available on this device, then close it.",
          hint: "Double-click OneDrive Sync Practice, double-click Practice Notes.docx, then select the My files - OneDrive tab.",
          steps: [{ action: { kind: "command", id: "od.open", value: "sync-practice-notes" } }, { action: { kind: "command", id: "od.close" } }],
        },
        {
          instruction: "Go back to your OneDrive folder and make OneDrive Sync Practice always available on this device.",
          hint: "Select OneDrive - Lakeside Medical Associates, right-click OneDrive Sync Practice › Always keep on this device.",
          steps: [on("sync-practice", "od.keep", {}, "Right-click the OneDrive Sync Practice folder.")],
        },
        {
          instruction: "Now free up space on OneDrive Sync Practice.",
          hint: "Right-click OneDrive Sync Practice › Free up space.",
          steps: [on("sync-practice", "od.free", {}, "Right-click the OneDrive Sync Practice folder.")],
        },
      ],
    },
  ],

  "module-5::backing-up-pc-folders": [
    {
      id: "onedrive-m5-backup-1",
      app: "onedrive",
      title: "Back up the check-in PC's folders",
      scenario:
        "The new check-in computer at Lakeside has files on its desktop and in Documents. Back those two folders up to OneDrive (leave Pictures alone), then confirm the desktop is now in OneDrive.",
      fileName: "File Explorer",
      minutes: 4,
      initial: work({ surface: "explorer", items: baseItems(), pc: pcBase() }),
      tasks: [
        {
          instruction: "Back up the Desktop and Documents folders to OneDrive. Leave Pictures off.",
          hint: "Right-click the OneDrive cloud icon › Settings › Sync and backup › Manage backup. Turn on Desktop and Documents, then select Save changes.",
          steps: [dlg("od.backup", { Desktop: true, Documents: true, Pictures: false })],
        },
        {
          instruction: "Open the Desktop folder in File Explorer.",
          hint: "Close OneDrive settings, then select Desktop in the navigation pane. The address bar now shows it inside OneDrive.",
          steps: [{ action: { kind: "command", id: "od.exp.nav", value: "Desktop" }, alt: [{ kind: "command", id: "od.exp.nav", value: "bk-desktop" }] }],
        },
        {
          instruction: "Make “Lunch Order Form.docx” always available on this device.",
          hint: "Right-click Lunch Order Form.docx › Always keep on this device.",
          steps: [{ action: { kind: "dialog", id: "od.keep", values: {} }, requires: { selection: "item:new1" }, selectHint: "Right-click Lunch Order Form.docx." }],
        },
        {
          instruction: "Open the backed-up Desktop folder on the web.",
          hint: "Go to the OneDrive folder in File Explorer, right-click Desktop › View online.",
          steps: [go("bk-desktop")],
        },
      ],
    },
    {
      id: "onedrive-m5-backup-lab",
      app: "onedrive",
      role: "challenge",
      title: "Challenge Lab: Back up your Documents folder",
      scenario:
        "Challenge Lab. Do this lesson's challenge on a practice PC: open Manage backup, back up Documents, and find it on the web.",
      fileName: "File Explorer",
      minutes: 3,
      initial: work({ surface: "explorer", items: baseItems(), pc: pcBase({ location: "onedrive" }) }),
      tasks: [
        {
          instruction: "Turn on backup for Documents (and Desktop if you want), then save the changes.",
          hint: "Right-click the OneDrive cloud icon › Settings › Sync and backup › Manage backup. Turn on Documents, then Save changes.",
          steps: [dlg("od.backup", { Documents: true })],
        },
        {
          instruction: "Open the Documents folder in File Explorer to see that it is now in OneDrive.",
          hint: "Close settings and select Documents in the navigation pane.",
          steps: [{ action: { kind: "command", id: "od.exp.nav", value: "Documents" }, alt: [{ kind: "command", id: "od.exp.nav", value: "bk-documents" }] }],
        },
        {
          instruction: "Find the Documents folder on the web.",
          hint: "Go to your OneDrive folder, right-click Documents › View online.",
          steps: [go("bk-documents")],
        },
      ],
    },
  ],
};
