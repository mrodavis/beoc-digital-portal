import type { SimDefinition, SimStep } from "@/types/sim";
import { winDoc, type WebPage, type WinItem, type WinRoot } from "@/components/sim/apps/windows/types";

/*
 * Tech Foundations sims that run in the Windows 11 engine.
 * Keys are "<moduleSlug>::<lessonSlug>". Scenarios use general office,
 * school and nonprofit settings (no medical records).
 */

/* ------------------------------------------------------------------ */
/* Helpers (they only build plain JSON)                                */
/* ------------------------------------------------------------------ */

const F = (name: string, modified = "10/14/2026 10:12 AM", size = "36 KB", extra: Partial<WinItem> = {}): WinItem => ({ name, modified, size, ...extra });
const D = (name: string, children: WinItem[] = [], extra: Partial<WinItem> = {}): WinItem => ({ name, folder: true, children, modified: "10/12/2026 9:05 AM", ...extra });

function pc(o: {
  desktop?: WinItem[];
  documents?: WinItem[];
  downloads?: WinItem[];
  pictures?: WinItem[];
  onedrive?: WinItem[];
  onedriveLabel?: string;
  usb?: WinItem[];
  network?: { name: string; items: WinItem[] };
}): WinRoot[] {
  const r: WinRoot[] = [
    { name: "Desktop", root: "desktop", folder: true, children: o.desktop ?? [{ name: "Microsoft Edge", app: "edge" }] },
    { name: "Documents", root: "documents", folder: true, children: o.documents ?? [] },
    { name: "Downloads", root: "downloads", folder: true, children: o.downloads ?? [] },
    { name: "Pictures", root: "pictures", folder: true, children: o.pictures ?? [D("Screenshots")] },
    { name: "Music", root: "music", folder: true, children: [] },
    { name: "Videos", root: "videos", folder: true, children: [] },
  ];
  if (o.onedrive) r.push({ name: "OneDrive", root: "onedrive", label: o.onedriveLabel ?? "OneDrive - Personal", folder: true, children: o.onedrive });
  r.push({ name: "Local Disk (C:)", root: "drive", folder: true, capacity: "476 GB", free: "289 GB", children: [D("Program Files"), D("Users"), D("Windows")] });
  if (o.usb) r.push({ name: "USB Drive (E:)", root: "usb", folder: true, capacity: "29.8 GB", free: "27.4 GB", children: o.usb });
  if (o.network) r.push({ name: o.network.name, root: "network", folder: true, capacity: "1.81 TB", free: "1.12 TB", children: o.network.items });
  return r;
}

const cmd = (id: string, value?: string): SimStep => ({ action: { kind: "command", id, ...(value !== undefined ? { value } : {}) } });
const set = (kv: string): SimStep => cmd("settings.set", kv);
const onSel = (step: SimStep, selection: string, selectHint: string): SimStep => ({ ...step, requires: { selection }, selectHint });
const newFolder = (parent: string, name: string): SimStep[] => [cmd("fs.newFolder", parent), { action: { kind: "type", target: `${parent}/New folder`, value: name } }];
const ren = (path: string, value: string): SimStep => ({ action: { kind: "type", target: path, value } });
const mv = (src: string, dest: string, hint: string): SimStep => onSel(cmd("fs.move", dest), `file:${src}`, hint);
const cp = (src: string, dest: string, hint: string): SimStep => onSel(cmd("fs.copyTo", dest), `file:${src}`, hint);
/** Notepad saved text that contains `value`. */
const saveNote = (path: string, value: string): SimStep => ({ action: { kind: "type", target: `notepad:${path}`, value, match: "includes" } });
/** A web form submitted with these values ("Label: value | Label: value", in field order). */
const form = (id: string, value: string): SimStep => ({ action: { kind: "type", target: `form:${id}`, value, match: "includes" } });
const click = (id: string): SimStep => ({ action: { kind: "click", target: `web:${id}` } });

const SEC_INFO: Record<string, WebPage> = {
  "mysignins.microsoft.com/security-info": {
    title: "My Sign-Ins | Security info",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    nav: [
      { text: "Overview", href: "mysignins.microsoft.com" },
      { text: "Security info", href: "mysignins.microsoft.com/security-info" },
      { text: "Recent activity", href: "mysignins.microsoft.com/activity" },
    ],
    blocks: [
      { t: "h1", text: "Security info" },
      { t: "p", text: "These are the methods you use to sign in to your account or reset your password." },
      { t: "table", head: ["Method", "Detail", ""], rows: [["Password", "Last updated: 6 months ago", "Change"]] },
      { t: "link", text: "+ Add sign-in method", href: "mysignins.microsoft.com/security-info/add", button: true },
      { t: "small", text: "Lost device? Sign out everywhere" },
    ],
  },
  "mysignins.microsoft.com/security-info/add": {
    title: "My Sign-Ins | Add a method",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    blocks: [
      { t: "h1", text: "Add a method" },
      { t: "p", text: "Which method would you like to add? An authenticator app gives you a notification or code to approve each sign-in." },
      { t: "form", id: "add-method", title: "Add a sign-in method", fields: [{ name: "method", label: "Method", type: "select", options: ["Choose a method", "Authenticator app", "Phone", "Alternate email", "Security key"] }], submit: "Add", goto: "mysignins.microsoft.com/security-info/added" },
    ],
  },
  "mysignins.microsoft.com/security-info/added": {
    title: "My Sign-Ins | Security info",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    blocks: [
      { t: "alert", tone: "ok", text: "Microsoft Authenticator was registered. You'll approve sign-ins with a notification on your phone." },
      { t: "table", head: ["Method", "Detail"], rows: [["Password", "Last updated: 6 months ago"], ["Microsoft Authenticator", "Push multi-factor authentication (MFA)"]] },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Sims                                                                */
/* ------------------------------------------------------------------ */

export const windowsSims: Record<string, SimDefinition[]> = {
  /* ============================ Module 1 ============================ */
  "module-1::hardware-basics": [
    {
      id: "win-tf-m1-hardware-basics-1",
      app: "windows",
      title: "Gather the front desk PC's specs for the IT vendor",
      scenario:
        "You are the office assistant at Maple Street Community Center. The IT vendor is replacing the slow front desk computer and is on the phone asking for its processor, memory, and drive type. Find them in Task Manager and Settings, record them in the vendor ticket, and restart the PC, the first step for any slowdown.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Dana Brooks", email: "dana.brooks@maplestreetcc.org" },
        specs: {
          deviceName: "MSCC-FRONTDESK",
          processor: "Intel(R) Core(TM) i5-8500 CPU @ 3.00GHz   3.00 GHz",
          ram: "8.00 GB (7.85 GB usable)",
          model: "Fabrikam OptiDesk 3060",
          storage: "932 GB",
          storageUsed: "611 GB",
          diskModel: "Fabrikam 1TB HDD 7200 RPM",
          diskType: "HDD",
          gpu: "Intel(R) UHD Graphics 630",
          cores: "6",
          logical: "6",
          memSpeed: "2666 MT/s",
          memSlots: "1 of 2",
          installedOn: "8/9/2019",
        },
        fs: pc({ documents: [F("Vendor Ticket.txt", "10/20/2026 9:02 AM", "1 KB", { text: "Front desk PC specs for the IT vendor\nProcessor: \nRAM: \nDrive type: \n" }), D("Programs")] }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Vendor Ticket.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Open Task Manager.",
          hint: "Right-click the taskbar (or the Start button) › Task Manager. Shortcut: Ctrl+Shift+Esc on the keyboard button in the taskbar.",
          steps: [cmd("win.open", "taskmgr")],
        },
        {
          instruction: "Show the Performance page in Task Manager.",
          hint: "In Task Manager, select Performance in the left pane.",
          steps: [cmd("taskmgr.tab", "performance")],
        },
        {
          instruction: "Display the details for Disk 0 (C:) to see what type of drive this PC has.",
          hint: "Performance › Disk 0 (C:) in the list on the left. The Type line says SSD or HDD.",
          steps: [cmd("taskmgr.perf", "disk")],
        },
        {
          instruction: "Open the About page in Settings to see the processor and installed RAM.",
          hint: "Start › Settings › System › About (or Start button right-click › System).",
          steps: [cmd("settings.nav", "system/about")],
        },
        {
          instruction: "In Vendor Ticket.txt, type \"8 GB\" after RAM, then save the file.",
          hint: "Switch to the Notepad window, click at the end of the RAM line, type 8 GB, then press Ctrl+S (or File › Save).",
          steps: [saveNote("Documents/Vendor Ticket.txt", "RAM: 8 GB")],
        },
        {
          instruction: "Type \"HDD\" after Drive type in the ticket, then save the file again.",
          hint: "Click at the end of the Drive type line, type HDD, then press Ctrl+S.",
          steps: [saveNote("Documents/Vendor Ticket.txt", "Drive type: HDD")],
        },
        {
          instruction: "Restart the computer.",
          hint: "Start › Power › Restart.",
          steps: [cmd("power.restart")],
        },
      ],
    },
  ],

  "module-1::navigating-windows": [
    {
      id: "win-tf-m1-navigating-windows-1",
      app: "windows",
      title: "Find your way around Windows on day one",
      scenario:
        "It is your first day at the front desk of Brightway Learning Center. Practice the moves you will make all day: open programs from the taskbar and Start, switch between windows, snap a window, find a setting with search, make a folder for your practice files, and pin a program you will use often.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Luis Ortega", email: "luis.ortega@brightwaylearning.org" },
        fs: pc({
          desktop: [{ name: "Microsoft Edge", app: "edge" }, F("Welcome Packet.pdf", "10/19/2026 4:30 PM", "1.4 MB")],
          documents: [D("Class Schedules", [F("Fall 2026 Schedule.xlsx")]), D("Front Desk"), F("Visitor Log.xlsx")],
        }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open File Explorer from the taskbar.",
          hint: "Select the File Explorer (folder) icon on the taskbar.",
          steps: [cmd("win.open", "explorer")],
        },
        {
          instruction: "Open Word from the Start menu.",
          hint: "Select Start › Word in the Pinned section.",
          steps: [cmd("win.open", "word")],
        },
        {
          instruction: "Switch back to the File Explorer window.",
          hint: "Select File Explorer on the taskbar (or use Alt+Tab on the keyboard button in the taskbar).",
          steps: [cmd("win.focus", "explorer")],
        },
        {
          instruction: "Snap File Explorer to the left half of the screen.",
          hint: "Hover over File Explorer's Maximize button and choose the left box of the snap layout (or Windows key + Left Arrow on the keyboard button).",
          steps: [cmd("win.snap", "explorer:left")],
        },
        {
          instruction: "Use search on the taskbar to find and open the Printers & scanners settings.",
          hint: "Select Search on the taskbar, type printers, then select Printers & scanners.",
          steps: [cmd("settings.nav", "bluetooth/printers")],
        },
        {
          instruction: "In Documents, create a folder named \"Brightway Practice Files\".",
          hint: "In File Explorer, open Documents, then New › Folder (or right-click › New › Folder), type the name and press Enter.",
          steps: newFolder("Documents", "Brightway Practice Files"),
        },
        {
          instruction: "Pin Notepad to the taskbar.",
          hint: "Start › right-click Notepad › Pin to taskbar.",
          steps: [cmd("taskbar.pin", "notepad")],
        },
      ],
    },
  ],

  "module-1::managing-programs": [
    {
      id: "win-tf-m1-managing-programs-1",
      app: "windows",
      title: "Fix a frozen program and clean up a slow PC",
      scenario:
        "At Harbor Point Insurance Agency, Word froze with a client letter open, and the front desk PC starts slowly. Your supervisor approved ending the frozen task, turning off a startup app, removing one unwanted program, and installing updates outside work hours.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Keisha Grant", email: "keisha.grant@harborpointins.com" },
        fs: pc({ documents: [F("Client Letter - Ramos.docx"), D("Quotes")] }),
        windows: [{ id: "word", app: "word", file: "Documents/Client Letter - Ramos.docx" }],
        focus: "word",
        processes: [{ name: "Microsoft Word", app: "word", cpu: "0%", mem: "412.6 MB", status: "Not responding" }],
        apps: [
          { name: "Contoso Coupon Toolbar", publisher: "Contoso Ltd.", version: "4.2.0", size: "38.2 MB", installed: "9/28/2026" },
          { name: "Fabrikam Deals Helper", publisher: "Fabrikam Inc.", version: "1.0.7", size: "64.9 MB", installed: "9/28/2026" },
        ],
        startup: [
          { name: "Contoso Coupon Toolbar", publisher: "Contoso Ltd.", on: true, impact: "High" },
          { name: "Fabrikam Deals Helper", publisher: "Fabrikam Inc.", on: true, impact: "Medium" },
        ],
        updates: [
          { name: "2026-10 Cumulative Update for Windows 11 Version 24H2 for x64-based Systems (KB5066835)", kind: "Security" },
          { name: "Intel Corporation - Display - 31.0.101.5594", kind: "Driver" },
        ],
        settings: { "update.activeHours": "Automatically" },
      }),
      tasks: [
        {
          instruction: "Open Task Manager and end the frozen Microsoft Word task.",
          hint: "Right-click the taskbar › Task Manager › Processes › select Microsoft Word (Not responding) › End task.",
          steps: [onSel(cmd("taskmgr.endTask"), "proc:Microsoft Word", "Select Microsoft Word (Not responding) in the Processes list first.")],
        },
        {
          instruction: "Stop \"Contoso Coupon Toolbar\" from starting automatically when you sign in.",
          hint: "Task Manager › Startup apps › select Contoso Coupon Toolbar › Disable (or Settings › Apps › Startup › turn it off).",
          steps: [onSel(cmd("startup.disable"), "startup:Contoso Coupon Toolbar", "Select Contoso Coupon Toolbar in the Startup apps list first.")],
        },
        {
          instruction: "Uninstall the app \"Fabrikam Deals Helper\".",
          hint: "Start › Settings › Apps › Installed apps › … next to Fabrikam Deals Helper › Uninstall › Uninstall.",
          steps: [cmd("app.uninstall", "Fabrikam Deals Helper")],
        },
        {
          instruction: "Check for Windows updates.",
          hint: "Start › Settings › Windows Update › Check for updates.",
          steps: [cmd("update.check")],
        },
        {
          instruction: "Download and install the available updates.",
          hint: "Settings › Windows Update › Download & install all.",
          steps: [cmd("update.install")],
        },
        {
          instruction: "Set active hours to \"8:00 AM to 5:00 PM\" so Windows won't restart during the workday.",
          hint: "Settings › Windows Update › Advanced options › Active hours › 8:00 AM to 5:00 PM.",
          steps: [set("update.activeHours=8:00 AM to 5:00 PM")],
        },
      ],
    },
  ],

  "module-1::system-settings": [
    {
      id: "win-tf-m1-system-settings-1",
      app: "windows",
      title: "Make the reception workstation comfortable and current",
      scenario:
        "You share a reception workstation at Northgate Adult Learning Center. Adjust the display, sound, notifications, power, and text size for comfort, then check that Windows is up to date, as your supervisor asked.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Aisha Bello", email: "aisha.bello@northgatealc.org" },
        devices: [
          { name: "USB Keyboard", kind: "keyboard", connected: true },
          { name: "USB Optical Mouse", kind: "mouse", connected: true },
          { name: "Contoso USB Headset", kind: "headset", connected: true },
        ],
        fs: pc({ documents: [D("Registration"), F("Front Desk Checklist.docx")] }),
        windows: [{ id: "settings", app: "settings", page: "home" }],
        focus: "settings",
      }),
      tasks: [
        {
          instruction: "Change the display scale to 125%.",
          hint: "Settings › System › Display › Scale › 125%.",
          steps: [set("display.scale=125%")],
        },
        {
          instruction: "Turn on Night light.",
          hint: "Settings › System › Display › Night light (or Quick settings › Night light).",
          steps: [set("nightlight=on")],
        },
        {
          instruction: "Set the sound output to \"Headphones (Contoso USB Headset)\".",
          hint: "Settings › System › Sound › Output › Headphones (Contoso USB Headset). You can also use Quick settings › arrow next to the volume slider.",
          steps: [set("sound.output=Headphones (Contoso USB Headset)")],
        },
        {
          instruction: "Turn on Do not disturb so alerts don't interrupt student registration.",
          hint: "Settings › System › Notifications › Do not disturb (or select the clock and the bell icon).",
          steps: [set("notifications.dnd=on")],
        },
        {
          instruction: "Set the screen to turn off after 15 minutes when plugged in.",
          hint: "Settings › System › Power & battery › When plugged in, turn off my screen after › 15 minutes.",
          steps: [set("power.screen=15 minutes")],
        },
        {
          instruction: "Increase the text size to 125% and apply it.",
          hint: "Settings › Accessibility › Text size › drag the slider to 125% › Apply.",
          steps: [set("access.textSize=125%")],
        },
        {
          instruction: "Check for Windows updates.",
          hint: "Settings › Windows Update › Check for updates.",
          steps: [cmd("update.check")],
        },
      ],
    },
  ],

  /* ============================ Module 2 ============================ */
  "module-2::files-folders-drives": [
    {
      id: "win-tf-m2-files-folders-drives-1",
      app: "windows",
      title: "Build the After-School Program folders",
      scenario:
        "Maple Street Community Center keeps each program's files in Documents › Programs. Build the folders for the new After-School Program, turn on file name extensions so you can tell file types apart, and bring the roster and permission slip in from the USB drive a volunteer handed you.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Dana Brooks", email: "dana.brooks@maplestreetcc.org" },
        fs: pc({
          documents: [D("Programs", [D("Food Pantry", [F("Pantry Hours.docx")]), D("Senior Lunch", [F("Menu October.docx")])]), F("Staff Contacts.xlsx")],
          usb: [F("After-School Roster.xlsx", "10/18/2026 6:40 PM", "18 KB"), F("Permission Slip.docx", "10/18/2026 6:42 PM", "22 KB"), F("Volunteer Photo.jpg", "10/18/2026 6:45 PM", "2.3 MB")],
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "Documents", view: "large" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "Inside Documents › Programs, create a folder named \"After-School\".",
          hint: "Open Programs, then New › Folder (or Ctrl+Shift+N), type After-School and press Enter.",
          steps: newFolder("Documents/Programs", "After-School"),
        },
        {
          instruction: "Inside the After-School folder, create two folders named \"Rosters\" and \"Forms\".",
          hint: "Open After-School, then New › Folder for each one. Type the name and press Enter before making the next folder.",
          anyOrder: true,
          steps: [...newFolder("Documents/Programs/After-School", "Rosters"), ...newFolder("Documents/Programs/After-School", "Forms")],
        },
        {
          instruction: "Turn on file name extensions so you can see each file's type.",
          hint: "View › Show › File name extensions.",
          steps: [cmd("explorer.toggle", "extensions")],
        },
        {
          instruction: "Open USB Drive (E:) and change the view to Details.",
          hint: "Select This PC › USB Drive (E:) in the navigation pane, then View › Details.",
          steps: [cmd("explorer.nav", "USB Drive (E:)"), cmd("explorer.view", "Details")],
        },
        {
          instruction: "Copy \"After-School Roster.xlsx\" from the USB drive into the Rosters folder.",
          hint: "Select the file › Copy (Ctrl+C), open Documents › Programs › After-School › Rosters › Paste (Ctrl+V). Dragging to another drive also copies.",
          steps: [cp("USB Drive (E:)/After-School Roster.xlsx", "Documents/Programs/After-School/Rosters", "Select After-School Roster.xlsx on the USB drive first.")],
        },
        {
          instruction: "Copy \"Permission Slip.docx\" from the USB drive into the Forms folder.",
          hint: "Select the file › Copy (Ctrl+C), open the Forms folder › Paste (Ctrl+V).",
          steps: [cp("USB Drive (E:)/Permission Slip.docx", "Documents/Programs/After-School/Forms", "Select Permission Slip.docx on the USB drive first.")],
        },
      ],
    },
  ],

  "module-2::file-operations": [
    {
      id: "win-tf-m2-file-operations-1",
      app: "windows",
      title: "Archive last month's billing files",
      scenario:
        "At Harbor Point Insurance Agency, September's billing files are cluttering the Billing folder. Make an Archive folder, move the September files into it, give the office manager a copy of the payment schedule, and fix a badly named scan.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Keisha Grant", email: "keisha.grant@harborpointins.com" },
        fs: pc({
          documents: [
            D("Billing", [
              F("2026-09 Invoice Summary.xlsx", "9/30/2026 4:55 PM", "48 KB"),
              F("2026-09 Late Notices.docx", "9/29/2026 2:10 PM", "31 KB"),
              F("2026-09 Payment Schedule.pdf", "9/30/2026 5:02 PM", "112 KB"),
              F("2026-10 Invoice Summary.xlsx", "10/19/2026 3:20 PM", "41 KB"),
              F("scan0047.pdf", "10/16/2026 11:48 AM", "640 KB"),
            ]),
            D("Office Manager", [F("Vendor List.xlsx")]),
            D("Quotes"),
          ],
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "Documents/Billing", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "In the Billing folder, create a folder named \"Archive\".",
          hint: "New › Folder (or right-click an empty area › New › Folder), type Archive and press Enter.",
          steps: newFolder("Documents/Billing", "Archive"),
        },
        {
          instruction: "Move the three files whose names start with \"2026-09\" into the Archive folder.",
          hint: "Ctrl+click the three 2026-09 files, then drag them onto Archive (or Cut with Ctrl+X, open Archive, Paste with Ctrl+V).",
          anyOrder: true,
          steps: [
            mv("Documents/Billing/2026-09 Invoice Summary.xlsx", "Documents/Billing/Archive", "Select the 2026-09 files (hold Ctrl and click each one)."),
            mv("Documents/Billing/2026-09 Late Notices.docx", "Documents/Billing/Archive", "Select the 2026-09 files (hold Ctrl and click each one)."),
            mv("Documents/Billing/2026-09 Payment Schedule.pdf", "Documents/Billing/Archive", "Select the 2026-09 files (hold Ctrl and click each one)."),
          ],
        },
        {
          instruction: "Copy \"2026-09 Payment Schedule\" from the Archive folder into the Office Manager folder.",
          hint: "Open Archive, select the file › Copy (Ctrl+C), open Documents › Office Manager › Paste (Ctrl+V).",
          steps: [cp("Documents/Billing/Archive/2026-09 Payment Schedule.pdf", "Documents/Office Manager", "Select 2026-09 Payment Schedule in the Archive folder first.")],
        },
        {
          instruction: "Rename \"scan0047\" in the Billing folder to \"2026-10 Signed Policy Change\".",
          hint: "Select scan0047 › Rename (or F2), type the new name and press Enter.",
          steps: [ren("Documents/Billing/scan0047.pdf", "2026-10 Signed Policy Change.pdf")],
        },
        {
          instruction: "Pin the Archive folder to Quick access.",
          hint: "Right-click the Archive folder › Pin to Quick access.",
          steps: [onSel(cmd("fs.pinQuick"), "file:Documents/Billing/Archive", "Select the Archive folder first.")],
        },
      ],
    },
    {
      id: "win-tf-m2-file-operations-2",
      app: "windows",
      title: "Delete safely and recover a mistake",
      scenario:
        "You are cleaning up the shared desktop at Harbor Point Insurance Agency. Delete files nobody needs, recover the holiday schedule a coworker deleted by mistake, and permanently remove a duplicate client list.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Keisha Grant", email: "keisha.grant@harborpointins.com" },
        fs: pc({
          desktop: [
            { name: "Microsoft Edge", app: "edge" },
            F("Old Flyer Draft.docx", "6/2/2026 10:15 AM", "1.1 MB"),
            F("Meeting Notes (copy).docx", "10/2/2026 9:40 AM", "24 KB"),
            F("Client List - DUPLICATE.xlsx", "10/7/2026 1:05 PM", "86 KB"),
            F("Quote Template.docx", "9/14/2026 3:30 PM", "40 KB"),
          ],
          documents: [D("Policies", [F("Office Hours.docx")]), F("Meeting Notes.docx")],
        }),
        recycle: [{ item: F("Holiday Schedule 2026.pdf", "10/1/2026 8:30 AM", "210 KB"), from: "Documents/Policies", deleted: "10/19/2026 4:48 PM" }],
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Delete \"Old Flyer Draft\" from the desktop.",
          hint: "Select Old Flyer Draft on the desktop and press Delete (or right-click › Delete).",
          steps: [onSel(cmd("fs.delete"), "file:Desktop/Old Flyer Draft.docx", "Select Old Flyer Draft on the desktop first.")],
        },
        {
          instruction: "Open the Recycle Bin and restore \"Holiday Schedule 2026\".",
          hint: "Double-click Recycle Bin on the desktop, select Holiday Schedule 2026 › Restore the selected items (or right-click › Restore).",
          steps: [onSel(cmd("bin.restore"), "bin:Holiday Schedule 2026.pdf", "Select Holiday Schedule 2026 in the Recycle Bin first.")],
        },
        {
          instruction: "Permanently delete \"Client List - DUPLICATE\" from the desktop without sending it to the Recycle Bin.",
          hint: "Select the file on the desktop, press Shift+Delete, then choose Yes.",
          steps: [onSel(cmd("fs.deletePermanent"), "file:Desktop/Client List - DUPLICATE.xlsx", "Select Client List - DUPLICATE on the desktop first.")],
        },
        {
          instruction: "Delete \"Meeting Notes (copy)\" from the desktop, then empty the Recycle Bin.",
          hint: "Select the file and press Delete. Then open Recycle Bin › Empty Recycle Bin › Yes.",
          steps: [onSel(cmd("fs.delete"), "file:Desktop/Meeting Notes (copy).docx", "Select Meeting Notes (copy) on the desktop first."), cmd("bin.empty")],
        },
        {
          instruction: "Open the Policies folder in Documents to confirm the holiday schedule is back.",
          hint: "In File Explorer, open Documents › Policies.",
          steps: [cmd("explorer.nav", "Documents/Policies")],
        },
      ],
    },
  ],

  "module-2::file-search-naming": [
    {
      id: "win-tf-m2-file-search-naming-1",
      app: "windows",
      title: "Find a student's files and rename them by the convention",
      scenario:
        "At Brightway Learning Center, enrollment files are named inconsistently. Search for one student's files, rename them to the office convention LastName_FirstName_DocumentType_YYYY-MM, and use sorting and Windows search to find files fast.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Luis Ortega", email: "luis.ortega@brightwaylearning.org" },
        fs: pc({
          documents: [
            D("Enrollment", [
              D("2026-08", [F("okafor enrollment form.pdf", "8/21/2026 10:04 AM", "220 KB"), F("Lin_David_Enrollment_2026-08.pdf", "8/22/2026 1:15 PM")]),
              D("2026-09", [F("Okafor_Grace_ProofOfAddress_2026-09.pdf", "9/3/2026 9:20 AM"), F("Lin_David_Enrollment_2026-09.pdf", "9/12/2026 2:40 PM"), F("Patel_Ria_Enrollment_2026-09.pdf", "9/18/2026 11:10 AM")]),
              D("2026-10", [F("grace okafor transcript.pdf", "10/6/2026 3:30 PM", "1.2 MB"), F("Patel_Ria_Transcript_2026-10.pdf", "10/15/2026 10:45 AM"), F("Nguyen_Tam_Enrollment_2026-10.pdf", "10/19/2026 4:05 PM")]),
            ]),
            D("Front Desk"),
          ],
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "Documents/Enrollment", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "Search the Enrollment folder for \"okafor\".",
          hint: "Click the search box at the top right of File Explorer, type okafor and press Enter.",
          steps: [cmd("explorer.search", "okafor")],
        },
        {
          instruction: "Rename \"okafor enrollment form\" to \"Okafor_Grace_Enrollment_2026-08\".",
          hint: "Select the file in the search results › Rename (or F2), type the new name, press Enter.",
          steps: [ren("Documents/Enrollment/2026-08/okafor enrollment form.pdf", "Okafor_Grace_Enrollment_2026-08.pdf")],
        },
        {
          instruction: "Rename \"grace okafor transcript\" to \"Okafor_Grace_Transcript_2026-10\".",
          hint: "Select the file › Rename (or F2), type the new name, press Enter.",
          steps: [ren("Documents/Enrollment/2026-10/grace okafor transcript.pdf", "Okafor_Grace_Transcript_2026-10.pdf")],
        },
        {
          instruction: "Open the 2026-10 folder and sort it by Date modified so the newest file is on top.",
          hint: "Clear the search, open Enrollment › 2026-10, then Sort › Date modified (or click the Date modified column heading).",
          steps: [cmd("explorer.nav", "Documents/Enrollment/2026-10"), cmd("explorer.sort", "Date modified")],
        },
        {
          instruction: "Use search on the taskbar to find \"Lin_David_Enrollment_2026-09\" and open its file location.",
          hint: "Select Search on the taskbar, type Lin_David, then select Open file location in the panel on the right.",
          steps: [cmd("explorer.nav", "Documents/Enrollment/2026-09")],
        },
        {
          instruction: "In the 2026-09 folder, create a text document named \"Okafor_Grace_Notes_2026-09\".",
          hint: "New › Text Document (or right-click › New › Text Document), type the name and press Enter.",
          steps: [cmd("fs.newFile", "Documents/Enrollment/2026-09/New Text Document.txt"), ren("Documents/Enrollment/2026-09/New Text Document.txt", "Okafor_Grace_Notes_2026-09.txt")],
        },
      ],
    },
  ],

  "module-2::file-management-best-practices": [
    {
      id: "win-tf-m2-file-management-best-practices-1",
      app: "windows",
      title: "Archive the drafts and back up the approved handbook",
      scenario:
        "Northgate Adult Learning Center just approved its updated Student Handbook. Give the approved file a clear name, archive the drafts in a dated folder, compress the archive for long-term storage, and make sure the approved copy is backed up to OneDrive.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Aisha Bello", email: "aisha.bello@northgatealc.org" },
        fs: pc({
          documents: [
            D("Policies", [
              F("StudentHandbook_2026-08-Draft.docx", "8/28/2026 3:12 PM", "88 KB"),
              F("StudentHandbook_2026-09-Draft.docx", "9/24/2026 11:40 AM", "91 KB"),
              F("Handbook FINAL use this one.docx", "10/16/2026 2:05 PM", "94 KB"),
              F("Attendance Policy_2026-01-Approved.docx", "1/12/2026 9:30 AM", "40 KB"),
            ]),
          ],
          onedrive: [D("Policies", [F("Attendance Policy_2026-01-Approved.docx", "1/12/2026 9:30 AM", "40 KB", { sync: "cloud" })], { sync: "local" }), F("Board Meeting Notes.docx", "10/9/2026 6:15 PM", "28 KB", { sync: "cloud" })],
          onedriveLabel: "OneDrive - Northgate",
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "Documents/Policies", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "Rename \"Handbook FINAL use this one\" to \"StudentHandbook_2026-10-Approved\".",
          hint: "Select the file › Rename (or F2), type the new name, press Enter.",
          steps: [ren("Documents/Policies/Handbook FINAL use this one.docx", "StudentHandbook_2026-10-Approved.docx")],
        },
        {
          instruction: "In the Policies folder, create a folder named \"Archive_2026\".",
          hint: "New › Folder, type Archive_2026 and press Enter.",
          steps: newFolder("Documents/Policies", "Archive_2026"),
        },
        {
          instruction: "Move both StudentHandbook draft files into Archive_2026.",
          hint: "Ctrl+click both Draft files and drag them onto Archive_2026 (or Cut, open the folder, Paste).",
          anyOrder: true,
          steps: [
            mv("Documents/Policies/StudentHandbook_2026-08-Draft.docx", "Documents/Policies/Archive_2026", "Select the draft files first."),
            mv("Documents/Policies/StudentHandbook_2026-09-Draft.docx", "Documents/Policies/Archive_2026", "Select the draft files first."),
          ],
        },
        {
          instruction: "Compress the Archive_2026 folder into a ZIP file.",
          hint: "Right-click Archive_2026 › Compress to ZIP file, then press Enter to keep the name.",
          steps: [onSel(cmd("fs.compress"), "file:Documents/Policies/Archive_2026", "Select the Archive_2026 folder first.")],
        },
        {
          instruction: "Copy the approved handbook into the Policies folder in OneDrive so it is backed up.",
          hint: "Select StudentHandbook_2026-10-Approved › Copy (Ctrl+C), open OneDrive - Northgate › Policies › Paste (Ctrl+V).",
          steps: [cp("Documents/Policies/StudentHandbook_2026-10-Approved.docx", "OneDrive/Policies", "Select StudentHandbook_2026-10-Approved first.")],
        },
        {
          instruction: "Make the OneDrive copy of the approved handbook always available on this device.",
          hint: "In OneDrive › Policies, right-click StudentHandbook_2026-10-Approved › Always keep on this device.",
          steps: [onSel(cmd("od.keep"), "file:OneDrive/Policies/StudentHandbook_2026-10-Approved.docx", "Select the handbook in OneDrive › Policies first.")],
        },
      ],
    },
  ],

  /* ============================ Module 3 ============================ */
  "module-3::how-the-internet-works": [
    {
      id: "win-tf-m3-how-the-internet-works-1",
      app: "windows",
      title: "Troubleshoot \"the internet is down\"",
      scenario:
        "A teacher at Brightway Learning Center says the internet is down on the front desk PC. Check the connection step by step: look up the PC's address, ping the router and a website, reset the wireless connection, and confirm a site loads.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Luis Ortega", email: "luis.ortega@brightwaylearning.org" },
        net: {
          type: "wifi",
          ssid: "Brightway-Staff",
          ip: "192.168.1.57",
          gateway: "192.168.1.1",
          dns: "192.168.1.1",
          networks: [{ ssid: "Brightway-Staff", secure: true, signal: 4 }, { ssid: "Brightway-Guest", secure: true, signal: 3 }],
          hosts: { "brightwaylearning.org": "198.51.100.24" },
        },
        web: {
          "brightwaylearning.org": {
            title: "Brightway Learning Center",
            site: "Brightway Learning Center",
            color: "#1d4f8c",
            nav: [{ text: "Programs", href: "brightwaylearning.org" }, { text: "Contact", href: "brightwaylearning.org" }],
            blocks: [
              { t: "h1", text: "Learning that works around your life" },
              { t: "p", text: "Evening and weekend classes in computer skills, English, and high school equivalency preparation." },
              { t: "alert", tone: "info", text: "Fall registration is open through November 6." },
            ],
          },
        },
        fs: pc({ documents: [D("Front Desk")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open Command Prompt.",
          hint: "Select Search on the taskbar, type cmd, then select Command Prompt.",
          steps: [cmd("win.open", "cmd")],
        },
        {
          instruction: "Run ipconfig to see this PC's IP address and default gateway.",
          hint: "In Command Prompt, type ipconfig and press Enter.",
          steps: [cmd("cmd.run", "ipconfig")],
        },
        {
          instruction: "Ping the router (the default gateway) at 192.168.1.1.",
          hint: "Type ping 192.168.1.1 and press Enter. Replies mean the local network works.",
          steps: [cmd("cmd.run", "ping 192.168.1.1")],
        },
        {
          instruction: "Ping google.com to test the internet connection.",
          hint: "Type ping google.com and press Enter.",
          steps: [cmd("cmd.run", "ping google.com")],
        },
        {
          instruction: "Turn Airplane mode on, then off again to reset the wireless connection.",
          hint: "Select the network and volume icons on the taskbar › Airplane mode, then select it again.",
          steps: [set("airplane=on"), set("airplane=off")],
        },
        {
          instruction: "Open Microsoft Edge and go to \"brightwaylearning.org\".",
          hint: "Open Edge from the taskbar, click the address bar, type brightwaylearning.org and press Enter.",
          steps: [cmd("edge.nav", "brightwaylearning.org")],
        },
      ],
    },
  ],

  "module-3::web-browsing": [
    {
      id: "win-tf-m3-web-browsing-1",
      app: "windows",
      title: "Build a favorites folder of official forms",
      scenario:
        "Your supervisor at Maple Street Community Center wants quick links to the official hiring forms. Use a search operator to get the official source, organize favorites in a folder, and manage your tabs.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Dana Brooks", email: "dana.brooks@maplestreetcc.org" },
        search: {
          "w-4 form site:irs.gov": [
            { title: "About Form W-4, Employee's Withholding Certificate | Internal Revenue Service", url: "irs.gov/forms-pubs/about-form-w-4", snippet: "Information about Form W-4, Employee's Withholding Certificate, including recent updates, related forms and instructions on how to file." },
            { title: "Forms & Instructions | Internal Revenue Service", url: "irs.gov/forms-instructions", snippet: "Access IRS forms, instructions and publications in electronic and print media." },
          ],
          "w-4 form": [
            { title: "Fill Out Your W-4 Online in Minutes - Fast & Easy", url: "w4-instant-forms.net", snippet: "Skip the IRS website. Enter your SSN and we'll complete your W-4 for you.", ad: true },
            { title: "About Form W-4, Employee's Withholding Certificate | Internal Revenue Service", url: "irs.gov/forms-pubs/about-form-w-4", snippet: "Information about Form W-4, Employee's Withholding Certificate." },
          ],
        },
        web: {
          "irs.gov/forms-pubs/about-form-w-4": {
            title: "About Form W-4, Employee's Withholding Certificate | Internal Revenue Service",
            site: "IRS",
            color: "#1e3f5a",
            blocks: [
              { t: "h1", text: "About Form W-4, Employee's Withholding Certificate" },
              { t: "p", text: "Complete Form W-4 so that your employer can withhold the correct federal income tax from your pay." },
              { t: "h2", text: "Current revision" },
              { t: "link", text: "Form W-4 PDF", href: "irs.gov/forms-pubs/about-form-w-4" },
            ],
          },
          "irs.gov/forms-instructions": { title: "Forms & Instructions | Internal Revenue Service", site: "IRS", color: "#1e3f5a", blocks: [{ t: "h1", text: "Forms & Instructions" }, { t: "p", text: "Find the forms and instructions you need." }] },
          "uscis.gov/i-9": {
            title: "I-9, Employment Eligibility Verification | USCIS",
            site: "U.S. Citizenship and Immigration Services",
            color: "#003366",
            blocks: [
              { t: "h1", text: "I-9, Employment Eligibility Verification" },
              { t: "p", text: "Use Form I-9 to verify the identity and employment authorization of individuals hired for employment in the United States." },
            ],
          },
          "w4-instant-forms.net": { title: "W-4 Instant Forms", secure: false, site: "W4 Instant Forms", color: "#7a2e8e", blocks: [{ t: "h1", text: "Get your W-4 done now!" }, { t: "alert", tone: "warn", text: "Enter your Social Security number to begin." }] },
        },
        fs: pc({ documents: [D("HR Forms")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Search for \"w-4 form site:irs.gov\" from the address bar.",
          hint: "Click the address bar, type w-4 form site:irs.gov and press Enter. The site: operator limits results to irs.gov.",
          steps: [cmd("edge.search", "w-4 form site:irs.gov")],
        },
        {
          instruction: "Open the \"About Form W-4\" result from irs.gov.",
          hint: "Select the About Form W-4, Employee's Withholding Certificate result.",
          steps: [cmd("edge.nav", "irs.gov/forms-pubs/about-form-w-4")],
        },
        {
          instruction: "Create a favorites folder named \"Office Forms\".",
          hint: "Favorites button (star with lines) › Add folder › type Office Forms › Enter.",
          steps: [cmd("edge.favFolder", "Office Forms")],
        },
        {
          instruction: "Add the About Form W-4 page to favorites in the Office Forms folder.",
          hint: "Select the star in the address bar (or Ctrl+D), choose Office Forms as the folder, then Done.",
          steps: [onSel(cmd("edge.favorite", "Office Forms"), "page:irs.gov/forms-pubs/about-form-w-4", "Go to the About Form W-4 page first.")],
        },
        {
          instruction: "Open a new tab and go to \"uscis.gov/i-9\".",
          hint: "Select + next to the tabs, type uscis.gov/i-9 in the address bar and press Enter.",
          steps: [cmd("edge.newTab"), cmd("edge.nav", "uscis.gov/i-9")],
        },
        {
          instruction: "Add the I-9 page to the Office Forms folder too.",
          hint: "Select the star in the address bar (or Ctrl+D), choose Office Forms, then Done.",
          steps: [onSel(cmd("edge.favorite", "Office Forms"), "page:uscis.gov/i-9", "Go to the I-9 page first.")],
        },
        {
          instruction: "Show the favorites bar so the Office Forms folder is one click away.",
          hint: "Favorites button › … (More options) › Show favorites bar (or Ctrl+Shift+B).",
          steps: [cmd("edge.favBar")],
        },
      ],
    },
  ],

  "module-3::safe-browsing": [
    {
      id: "win-tf-m3-safe-browsing-1",
      app: "windows",
      title: "Spot the fake payroll page and the dangerous download",
      scenario:
        "An email at Harbor Point Insurance Agency asks you to \"update your payroll login.\" Check where the link really goes, report the fake site, reach the real one by typing its address, heed a SmartScreen warning, and get rid of a blocked download.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Keisha Grant", email: "keisha.grant@harborpointins.com" },
        web: {
          "mail.harborpointins.com/inbox": {
            title: "Inbox - Harbor Point Mail",
            site: "Harbor Point Mail",
            color: "#2b4c7e",
            blocks: [
              { t: "h2", text: "Action required: payroll account verification" },
              { t: "small", text: "From: Payroll Services <alerts@contoso-payroll.account-verify.net>   To: Keisha Grant" },
              { t: "p", text: "Your payroll account will be suspended in 24 hours unless you confirm your login. Use the secure link below." },
              { t: "link", text: "Update your payroll login", href: "contoso-payroll.account-verify.net/login" },
              { t: "p", text: "Thank you, Payroll Services Team" },
              { t: "hr" },
              { t: "h3", text: "Invoice ready to view" },
              { t: "link", text: "View invoice", href: "invoice-viewer-secure.net" },
            ],
          },
          "contoso-payroll.account-verify.net/login": {
            title: "Contoso Payroll | Sign in",
            secure: false,
            site: "Contoso Payroll",
            color: "#0b6a5a",
            blocks: [
              { t: "alert", tone: "warn", text: "Your account will be suspended in 24 hours. Sign in to keep access." },
              { t: "form", id: "fake-login", title: "Sign in", fields: [{ name: "email", label: "Work email" }, { name: "pw", label: "Password", type: "password" }], submit: "Sign in", toast: "Signed in." },
            ],
          },
          "payroll.contoso.com": {
            title: "Contoso Payroll | Employer sign in",
            site: "Contoso Payroll",
            color: "#0b6a5a",
            blocks: [{ t: "h1", text: "Employer sign in" }, { t: "p", text: "Sign in with your company account. Contoso Payroll will never email you a link to verify your password." }],
          },
          "invoice-viewer-secure.net": { title: "Invoice Viewer", unsafe: true, blocks: [{ t: "h1", text: "Download the viewer to see your invoice" }] },
        },
        downloads: [{ name: "Invoice_Oct2026.pdf.exe", size: "2.4 MB", danger: "unsafe", status: "warn", url: "invoice-viewer-secure.net" }],
        fs: pc({ documents: [D("Billing")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "mail.harborpointins.com/inbox" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Open the email's \"Update your payroll login\" link, then view the site information for the page that opens.",
          hint: "Hover over the link to see the real address at the bottom left, select it, then select the Not secure label at the left of the address bar.",
          steps: [cmd("edge.nav", "contoso-payroll.account-verify.net/login"), cmd("edge.siteInfo")],
        },
        {
          instruction: "Report this page to Microsoft as an unsafe site.",
          hint: "Settings and more (…) › Help and feedback › Report unsafe site.",
          steps: [onSel(cmd("edge.reportUnsafe"), "page:contoso-payroll.account-verify.net/login", "Report it while the fake payroll page is showing.")],
        },
        {
          instruction: "Reach the real payroll site by typing \"payroll.contoso.com\" in the address bar instead of using the email link.",
          hint: "Click the address bar, type payroll.contoso.com and press Enter.",
          steps: [cmd("edge.nav", "payroll.contoso.com")],
        },
        {
          instruction: "Return to the inbox, open the \"View invoice\" link, and leave the site when Microsoft Defender SmartScreen warns you.",
          hint: "Select Back until the inbox shows (or type mail.harborpointins.com/inbox), select View invoice, then select Go back on the red warning page.",
          steps: [cmd("edge.nav", "invoice-viewer-secure.net"), cmd("edge.smartBack")],
        },
        {
          instruction: "Open the Downloads list and delete the blocked file \"Invoice_Oct2026.pdf.exe\".",
          hint: "Select Downloads on the toolbar (or Ctrl+J) › … next to the file › Delete.",
          steps: [cmd("edge.dlDelete", "Invoice_Oct2026.pdf.exe")],
        },
        {
          instruction: "This PC is shared, so turn off \"Offer to save passwords\" in Edge.",
          hint: "Settings and more (…) › Passwords, then turn Offer to save passwords off.",
          steps: [set("edge.savePasswords=off")],
        },
      ],
    },
  ],

  /* ============================ Module 5 ============================ */
  "module-5::keyboard-shortcuts": [
    {
      id: "win-tf-m5-keyboard-shortcuts-1",
      app: "windows",
      title: "Back up the volunteer hours using only shortcuts",
      scenario:
        "Your supervisor at Maple Street Community Center wants routine file work done from the keyboard. Use the shortcut for each step. The keyboard button on the taskbar stands in for the Windows key, which your own computer keeps for itself.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Dana Brooks", email: "dana.brooks@maplestreetcc.org" },
        fs: pc({
          documents: [D("Volunteer Hours", [F("Week 1 Hours.xlsx", "10/5/2026 5:10 PM", "14 KB"), F("Week 2 Hours.xlsx", "10/12/2026 5:22 PM", "15 KB"), F("Week 3 Hours.xlsx", "10/19/2026 5:04 PM", "15 KB")]), D("Programs")],
          usb: [D("Backups")],
        }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open File Explorer with Windows key + E.",
          hint: "Select the keyboard button on the taskbar, then ⊞+E (File Explorer).",
          steps: [cmd("win.open", "explorer")],
        },
        {
          instruction: "Open Documents › Volunteer Hours and select all three files with Ctrl+A.",
          hint: "Double-click Documents, then Volunteer Hours. Click an empty spot in the file list, then press Ctrl+A.",
          steps: [{ action: { kind: "select", target: "file:Documents/Volunteer Hours/Week 1 Hours.xlsx,file:Documents/Volunteer Hours/Week 2 Hours.xlsx,file:Documents/Volunteer Hours/Week 3 Hours.xlsx" } }],
        },
        {
          instruction: "Copy the three files with Ctrl+C and paste them into USB Drive (E:) with Ctrl+V.",
          hint: "Press Ctrl+C, open This PC › USB Drive (E:) in the navigation pane, click the file list and press Ctrl+V.",
          anyOrder: true,
          steps: [
            cp("Documents/Volunteer Hours/Week 1 Hours.xlsx", "USB Drive (E:)", "Copy the three Volunteer Hours files first."),
            cp("Documents/Volunteer Hours/Week 2 Hours.xlsx", "USB Drive (E:)", "Copy the three Volunteer Hours files first."),
            cp("Documents/Volunteer Hours/Week 3 Hours.xlsx", "USB Drive (E:)", "Copy the three Volunteer Hours files first."),
          ],
        },
        {
          instruction: "On the USB drive, rename \"Week 1 Hours\" to \"October Week 1 Hours\" with F2.",
          hint: "Select Week 1 Hours on the USB drive, press F2, type the new name and press Enter.",
          steps: [ren("USB Drive (E:)/Week 1 Hours.xlsx", "October Week 1 Hours.xlsx")],
        },
        {
          instruction: "Undo the rename with Ctrl+Z.",
          hint: "Click the file list and press Ctrl+Z.",
          steps: [cmd("fs.undo")],
        },
        {
          instruction: "Show the desktop with Windows key + D.",
          hint: "Keyboard button on the taskbar › ⊞+D (Show desktop).",
          steps: [cmd("win.showDesktop")],
        },
        {
          instruction: "Lock the computer with Windows key + L, then sign back in with PIN 2468.",
          hint: "Keyboard button › ⊞+L. Click the lock screen and type 2468.",
          steps: [cmd("win.lock"), cmd("win.unlock", "2468")],
        },
        {
          instruction: "Open Task Manager with Ctrl+Shift+Esc.",
          hint: "Keyboard button on the taskbar › Ctrl+Shift+Esc (Task Manager).",
          steps: [cmd("win.open", "taskmgr")],
        },
      ],
    },
  ],

  /* ============================ Module 6 ============================ */
  "module-6::printers-scanners-copiers": [
    {
      id: "win-tf-m6-printers-scanners-copiers-1",
      app: "windows",
      title: "Clear the stuck printer before class starts",
      scenario:
        "It is 8:55 AM at Brightway Learning Center. The front office printer is paused with a stuck registration job, new staff keep printing to the back office by mistake, and the network scanner was never added to this PC.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Luis Ortega", email: "luis.ortega@brightwaylearning.org" },
        printers: [
          {
            name: "Front Office Printer",
            kind: "mfp",
            status: "Error",
            paused: true,
            jobs: [
              { name: "Registration Forms.pdf", owner: "Keisha Grant", pages: 12, status: "Error - Printing", size: "1.8 MB", submitted: "8:41 AM" },
              { name: "Class Schedule.docx", owner: "Luis Ortega", pages: 2, status: "Paused", size: "96 KB", submitted: "8:47 AM" },
            ],
          },
          { name: "Back Office Printer", kind: "mfp", status: "Idle", default: true },
        ],
        flags: { addable: "Front Office Scanner" },
        fs: pc({ documents: [F("Registration Forms.pdf"), F("Class Schedule.docx")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open the Printers & scanners page in Settings.",
          hint: "Start › Settings › Bluetooth & devices › Printers & scanners (or search for printers).",
          steps: [cmd("settings.nav", "bluetooth/printers")],
        },
        {
          instruction: "Turn off \"Let Windows manage my default printer\".",
          hint: "Printers & scanners › Printer preferences › Let Windows manage my default printer › Off.",
          steps: [set("printer.manage=off")],
        },
        {
          instruction: "Set \"Front Office Printer\" as the default printer.",
          hint: "Printers & scanners › Front Office Printer › Set as default.",
          steps: [cmd("printer.default", "Front Office Printer")],
        },
        {
          instruction: "Open the print queue for Front Office Printer and cancel the stuck \"Registration Forms.pdf\" job.",
          hint: "Front Office Printer › Open print queue › select Registration Forms.pdf › Cancel (or right-click › Cancel).",
          steps: [onSel(cmd("printer.cancel"), "job:Registration Forms.pdf", "Select Registration Forms.pdf in the print queue first.")],
        },
        {
          instruction: "Resume printing on Front Office Printer.",
          hint: "In the print queue, select Resume.",
          steps: [cmd("printer.resume", "Front Office Printer")],
        },
        {
          instruction: "Print a test page on Front Office Printer.",
          hint: "Settings › Bluetooth & devices › Printers & scanners › Front Office Printer › Print test page.",
          steps: [cmd("printer.testPage", "Front Office Printer")],
        },
        {
          instruction: "Add the network scanner \"Front Office Scanner\" to this PC.",
          hint: "Printers & scanners › Add device, then Add device next to Front Office Scanner.",
          steps: [cmd("printer.add", "Front Office Scanner")],
        },
      ],
    },
  ],

  "module-6::monitors-peripherals-ergonomics": [
    {
      id: "win-tf-m6-monitors-peripherals-ergonomics-1",
      app: "windows",
      title: "Set up a dual-monitor desk for a left-handed coworker",
      scenario:
        "You are setting up a new workstation at Harbor Point Insurance Agency. A second monitor is plugged in but not showing, the resolution is wrong, and the coworker who shares this desk is left-handed and finds the pointer hard to see.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Keisha Grant", email: "keisha.grant@harborpointins.com" },
        displays: 1,
        flags: { monitor2: true },
        settings: { "display.multi": "Duplicate these displays", "display.resolution": "1366 × 768" },
        fs: pc({ documents: [D("Quotes")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "The second monitor isn't showing. Use Display settings to detect it.",
          hint: "Right-click the desktop › Display settings › Multiple displays › Detect.",
          steps: [cmd("display.detect")],
        },
        {
          instruction: "Set the displays to \"Extend these displays\".",
          hint: "Settings › System › Display › Multiple displays box at the top › Extend these displays.",
          steps: [set("display.multi=Extend these displays")],
        },
        {
          instruction: "Make display 2 the main display.",
          hint: "Settings › System › Display › check Make this my main display.",
          steps: [set("display.main=2")],
        },
        {
          instruction: "Set the display resolution to \"1920 × 1080\".",
          hint: "Settings › System › Display › Display resolution › 1920 × 1080 (Recommended).",
          steps: [set("display.resolution=1920 × 1080")],
        },
        {
          instruction: "Switch the primary mouse button to Right for your left-handed coworker.",
          hint: "Settings › Bluetooth & devices › Mouse › Primary mouse button › Right.",
          steps: [set("mouse.primary=Right")],
        },
        {
          instruction: "Make the mouse pointer larger: set its size to 3.",
          hint: "Settings › Accessibility › Mouse pointer and touch › Size slider › 3 (click the slider and use the arrow keys).",
          steps: [cmd("settings.slide", "access.pointerSize=3")],
        },
      ],
    },
  ],

  "module-6::hardware-troubleshooting": [
    {
      id: "win-tf-m6-hardware-troubleshooting-1",
      app: "windows",
      title: "Friday afternoon fixes: keyboard and sound",
      scenario:
        "At 2 PM on a Friday at Northgate Adult Learning Center, the wireless keyboard stopped responding and the headset has no sound. IT is off-site until Monday, so work through the simple fixes first: power, connection, settings, then a restart.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Aisha Bello", email: "aisha.bello@northgatealc.org" },
        settings: { bt: "off", "sound.mute": "on" },
        devices: [
          { name: "Contoso Wireless Keyboard", kind: "keyboard", bt: true, connected: false, battery: "60%" },
          { name: "USB Optical Mouse", kind: "mouse", connected: true },
          { name: "Contoso USB Headset", kind: "headset", connected: true },
        ],
        nearby: ["Contoso Wireless Keyboard"],
        fs: pc({ documents: [D("Registration")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Turn Bluetooth on.",
          hint: "Select the network and volume icons on the taskbar › Bluetooth (or Settings › Bluetooth & devices › Bluetooth).",
          steps: [set("bt=on")],
        },
        {
          instruction: "The keyboard still won't connect. Remove the device \"Contoso Wireless Keyboard\".",
          hint: "Settings › Bluetooth & devices › … next to Contoso Wireless Keyboard › Remove device › Yes.",
          steps: [cmd("bt.remove", "Contoso Wireless Keyboard")],
        },
        {
          instruction: "Pair \"Contoso Wireless Keyboard\" again.",
          hint: "Settings › Bluetooth & devices › Add device › Bluetooth › Contoso Wireless Keyboard.",
          steps: [cmd("bt.add", "Contoso Wireless Keyboard")],
        },
        {
          instruction: "Unmute the sound.",
          hint: "Select the network and volume icons on the taskbar, then the speaker icon next to the volume slider.",
          steps: [set("sound.mute=off")],
        },
        {
          instruction: "Set the sound output to \"Headphones (Contoso USB Headset)\".",
          hint: "Quick settings › arrow next to the volume slider › Headphones (Contoso USB Headset), or Settings › System › Sound.",
          steps: [set("sound.output=Headphones (Contoso USB Headset)")],
        },
        {
          instruction: "Restart the computer to finish the fixes.",
          hint: "Start › Power › Restart.",
          steps: [cmd("power.restart")],
        },
      ],
    },
  ],

  /* ============================ Module 7 ============================ */
  "module-7::cloud-storage-onedrive": [
    {
      id: "win-tf-m7-cloud-storage-onedrive-1",
      app: "windows",
      title: "Move work into OneDrive and manage sync",
      scenario:
        "Maple Street Community Center moved to Microsoft 365. Files belong in OneDrive, not only on one desktop. Make a practice folder, move a local file into it, control which files stay on this PC, and confirm the folder appears online.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Dana Brooks", email: "dana.brooks@maplestreetcc.org", org: "Maple Street Community Center" },
        fs: pc({
          desktop: [{ name: "Microsoft Edge", app: "edge" }, F("Volunteer Schedule.xlsx", "10/19/2026 3:15 PM", "29 KB")],
          onedrive: [
            F("Board Minutes 2026-09.docx", "9/30/2026 7:40 PM", "54 KB", { sync: "cloud" }),
            D("Event Photos", [F("Harvest Fair 01.jpg", "10/4/2026 1:12 PM", "3.1 MB", { sync: "local" }), F("Harvest Fair 02.jpg", "10/4/2026 1:13 PM", "2.9 MB", { sync: "local" })], { sync: "local" }),
            F("Grant Budget.xlsx", "10/15/2026 10:20 AM", "64 KB", { sync: "cloud" }),
            F("Newsletter October.docx", "10/18/2026 9:05 AM", "120 KB", { sync: "local" }),
          ],
          onedriveLabel: "OneDrive - Maple Street",
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "OneDrive", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "In OneDrive, create a folder named \"Cloud Practice\".",
          hint: "In File Explorer › OneDrive - Maple Street, New › Folder, type Cloud Practice, press Enter.",
          steps: newFolder("OneDrive", "Cloud Practice"),
        },
        {
          instruction: "Move \"Volunteer Schedule\" from the desktop into Cloud Practice.",
          hint: "Drag Volunteer Schedule from the desktop onto the Cloud Practice folder (or Cut it, open Cloud Practice, Paste).",
          steps: [mv("Desktop/Volunteer Schedule.xlsx", "OneDrive/Cloud Practice", "Select Volunteer Schedule on the desktop first.")],
        },
        {
          instruction: "Make \"Grant Budget\" always available on this device.",
          hint: "Right-click Grant Budget › Always keep on this device. The status icon becomes a solid green check.",
          steps: [onSel(cmd("od.keep"), "file:OneDrive/Grant Budget.xlsx", "Select Grant Budget first.")],
        },
        {
          instruction: "Free up space used by the \"Event Photos\" folder.",
          hint: "Right-click Event Photos › Free up space. The files stay in the cloud.",
          steps: [onSel(cmd("od.free"), "file:OneDrive/Event Photos", "Select the Event Photos folder first.")],
        },
        {
          instruction: "Open OneDrive on the web and open the Cloud Practice folder there.",
          hint: "Select the OneDrive cloud icon on the taskbar › View online (globe), then select Cloud Practice. You can also type onedrive.com in Edge.",
          steps: [{ action: { kind: "command", id: "edge.nav", value: ["onedrive.live.com", "onedrive.com"] } }, cmd("cloud.open", "OneDrive/Cloud Practice")],
        },
      ],
    },
  ],

  "module-7::sharing-collaborating": [
    {
      id: "win-tf-m7-sharing-collaborating-1",
      app: "windows",
      title: "Share each document with the right permission",
      scenario:
        "At Brightway Learning Center, three people need documents in different ways: your supervisor edits the newsletter, a partner school only views the enrollment form, and a former volunteer still has access she no longer needs. Share from OneDrive without attaching files to email.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Luis Ortega", email: "luis.ortega@brightwaylearning.org", org: "Brightway Learning Center" },
        fs: pc({
          onedrive: [
            F("Parent Newsletter Draft.docx", "10/19/2026 4:10 PM", "86 KB", {
              sync: "local",
              text: "Brightway Parent Newsletter, November\nFall registration closes [[s1]] November 6.\nFamily computer night is on Thursday at 6 PM.",
              suggestions: [{ id: "s1", by: "Maria Lopez", text: "on Friday," }],
            }),
            F("Monthly Expense Report.xlsx", "10/18/2026 11:22 AM", "52 KB", { sync: "local" }),
            F("Enrollment Form.pdf", "9/2/2026 9:00 AM", "140 KB", { sync: "cloud" }),
            F("Old Fundraiser Plan.docx", "4/14/2026 3:45 PM", "61 KB", { sync: "cloud", shared: [{ email: "j.carter@brightwaylearning.org", name: "Jenna Carter", perm: "edit" }] }),
          ],
          onedriveLabel: "OneDrive - Brightway",
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "OneDrive", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "Share \"Parent Newsletter Draft\" with your supervisor, maria.lopez@brightwaylearning.org, so she can edit it.",
          hint: "Right-click the file › Share, type the email, keep Can edit, then Send.",
          steps: [onSel(cmd("share.send", "maria.lopez@brightwaylearning.org:edit"), "file:OneDrive/Parent Newsletter Draft.docx", "Share Parent Newsletter Draft (right-click it › Share).")],
        },
        {
          instruction: "Share \"Monthly Expense Report\" with the bookkeeper, tom.becker@brightwaylearning.org, so he can edit it.",
          hint: "Right-click the file › Share, type the email, keep Can edit, then Send.",
          steps: [onSel(cmd("share.send", "tom.becker@brightwaylearning.org:edit"), "file:OneDrive/Monthly Expense Report.xlsx", "Share Monthly Expense Report (right-click it › Share).")],
        },
        {
          instruction: "Share \"Enrollment Form\" with the partner school, office@eastsideprep.org, so they can only view it.",
          hint: "Right-click the file › Share, type the email, change the permission to Can view, then Send.",
          steps: [onSel(cmd("share.send", "office@eastsideprep.org:view"), "file:OneDrive/Enrollment Form.pdf", "Share Enrollment Form (right-click it › Share).")],
        },
        {
          instruction: "Copy a view-only link to \"Enrollment Form\" that anyone with the link can open.",
          hint: "Right-click Enrollment Form › Share › Copy link section: Anyone with the link, Can view › Copy.",
          steps: [onSel(cmd("share.link", "anyone:view"), "file:OneDrive/Enrollment Form.pdf", "Open the Share window for Enrollment Form first.")],
        },
        {
          instruction: "Remove j.carter@brightwaylearning.org's access to \"Old Fundraiser Plan\".",
          hint: "Right-click Old Fundraiser Plan › Manage access, then change Jenna Carter's permission to Remove access.",
          steps: [onSel(cmd("share.remove", "j.carter@brightwaylearning.org"), "file:OneDrive/Old Fundraiser Plan.docx", "Open Manage access for Old Fundraiser Plan first.")],
        },
        {
          instruction: "Open \"Parent Newsletter Draft\" in OneDrive on the web and accept Maria's suggested edit.",
          hint: "Right-click the file › View online (or open onedrive.com in Edge and select the file), then select the check mark on Maria's suggestion.",
          steps: [onSel(cmd("doc.accept", "s1"), "file:OneDrive/Parent Newsletter Draft.docx", "Open Parent Newsletter Draft online first.")],
        },
      ],
    },
  ],

  "module-7::cloud-security": [
    {
      id: "win-tf-m7-cloud-security-1",
      app: "windows",
      title: "Lock down your cloud account on public Wi-Fi",
      scenario:
        "After a nearby nonprofit's account was taken over on public Wi-Fi, Maple Street Community Center asked staff to tighten cloud security. You are working from a coffee shop on the office laptop. Protect the connection, add a second sign-in factor, review sign-ins, close an open link, and sign out.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Dana Brooks", email: "dana.brooks@maplestreetcc.org", org: "Maple Street Community Center" },
        specs: { battery: "64%", model: "Fabrikam Laptop 14", deviceName: "MSCC-LAPTOP-03" },
        net: {
          type: "wifi",
          ssid: "Bean There Free WiFi",
          networks: [{ ssid: "Bean There Free WiFi", secure: false, signal: 3, note: "Open network" }, { ssid: "BeanThere-Staff", secure: true, signal: 2 }],
          vpns: [{ name: "Maple Street VPN", server: "vpn.maplestreetcc.org" }],
        },
        web: {
          ...SEC_INFO,
          "mysignins.microsoft.com/activity": {
            title: "My Sign-Ins | Recent activity",
            site: "My Sign-Ins",
            color: "#0f6cbd",
            nav: [{ text: "Security info", href: "mysignins.microsoft.com/security-info" }, { text: "Recent activity", href: "mysignins.microsoft.com/activity" }],
            blocks: [
              { t: "h1", text: "Recent activity" },
              { t: "table", head: ["When", "Location", "App", "Result"], rows: [["Today 9:12 AM", "Brooklyn, New York, US", "Office 365", "Successful"], ["Yesterday 11:47 PM", "Unknown location, overseas", "Office 365", "Successful"], ["Yesterday 8:55 AM", "Brooklyn, New York, US", "Outlook", "Successful"]] },
              { t: "p", text: "Don't recognize the overseas sign-in from yesterday at 11:47 PM?" },
              { t: "button", id: "not-me", text: "This wasn't me", style: "danger", toast: "Thanks. We'll ask you to change your password and secure the account." },
              { t: "hr" },
              { t: "button", id: "sign-out", text: "Sign out", style: "default", goto: "login.microsoftonline.com/logout" },
            ],
          },
          "login.microsoftonline.com/logout": { title: "Sign out", site: "Microsoft", color: "#2f2f2f", blocks: [{ t: "h1", text: "You signed out of your account" }, { t: "p", text: "It's a good idea to close all browser windows." }] },
        },
        fs: pc({
          onedrive: [F("Donor List.xlsx", "10/10/2026 2:30 PM", "88 KB", { sync: "cloud", link: "anyone:edit" }), F("Grant Budget.xlsx", "10/15/2026 10:20 AM", "64 KB", { sync: "cloud" })],
          onedriveLabel: "OneDrive - Maple Street",
        }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "You are on open public Wi-Fi. Connect the \"Maple Street VPN\" before working with cloud files.",
          hint: "Start › Settings › Network & internet › VPN › Connect next to Maple Street VPN.",
          steps: [cmd("net.vpn", "Maple Street VPN")],
        },
        {
          instruction: "In Edge, open your Security info page at \"mysignins.microsoft.com/security-info\".",
          hint: "Click the address bar, type mysignins.microsoft.com/security-info and press Enter.",
          steps: [cmd("edge.nav", "mysignins.microsoft.com/security-info")],
        },
        {
          instruction: "Add the Authenticator app as a sign-in method.",
          hint: "Select + Add sign-in method, choose Authenticator app in the Method box, then select Add.",
          steps: [form("add-method", "Method: Authenticator app")],
        },
        {
          instruction: "Open Recent activity and report the overseas sign-in as \"This wasn't me\".",
          hint: "Select Recent activity at the top of the page, then This wasn't me.",
          steps: [click("not-me")],
        },
        {
          instruction: "In OneDrive, remove the \"Anyone with the link\" link that gives edit access to \"Donor List\".",
          hint: "Open File Explorer › OneDrive - Maple Street, right-click Donor List › Share › Remove link.",
          steps: [onSel(cmd("share.remove", "link"), "file:OneDrive/Donor List.xlsx", "Open the Share window for Donor List first.")],
        },
        {
          instruction: "Sign out of your Microsoft account in Edge when you are done.",
          hint: "On the Recent activity page, select Sign out.",
          steps: [click("sign-out")],
        },
      ],
    },
  ],

  /* ============================ Module 8 ============================ */
  "module-8::cybersecurity-threats": [
    {
      id: "win-tf-m8-cybersecurity-threats-1",
      app: "windows",
      title: "Respond to a malware alert",
      scenario:
        "A coworker at Harbor Point Insurance Agency opened an attachment called Invoice_Oct.zip and the computer started acting strangely. Follow the incident response steps: disconnect, scan, remove the threat, protect files from ransomware, and remove the attachment.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Keisha Grant", email: "keisha.grant@harborpointins.com" },
        net: { type: "wifi", ssid: "HarborPoint-Staff", networks: [{ ssid: "HarborPoint-Staff", secure: true, signal: 4 }] },
        security: { threats: [{ name: "Trojan:Win32/Wacatac.B!ml", file: "Downloads/Invoice_Oct/invoice_viewer.exe", severity: "Severe" }] },
        notifications: [{ app: "security", title: "Windows Security", text: "Threats found. Microsoft Defender Antivirus found threats. Get details.", time: "9:38 AM" }],
        fs: pc({
          downloads: [F("Invoice_Oct.zip", "10/20/2026 9:31 AM", "1.9 MB", { zip: [F("invoice_viewer.exe", "10/20/2026 9:31 AM", "2.2 MB")] }), D("Invoice_Oct", [F("invoice_viewer.exe", "10/20/2026 9:33 AM", "2.2 MB")]), F("Rate Sheet 2026.pdf")],
          documents: [D("Quotes"), D("Policies")],
        }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "First, disconnect from the network by turning Wi-Fi off.",
          hint: "Select the network and volume icons on the taskbar › Wi-Fi tile (or Settings › Network & internet › Wi-Fi › Off).",
          steps: [{ action: { kind: "command", id: "settings.set", value: "wifi=off" }, alt: [{ kind: "command", id: "settings.set", value: "airplane=on" }] }],
        },
        {
          instruction: "Open Windows Security and run a quick scan.",
          hint: "Start › Windows Security › Virus & threat protection › Quick scan.",
          steps: [cmd("sec.scan", "quick")],
        },
        {
          instruction: "Remove the threat the scan found.",
          hint: "Virus & threat protection › Current threats › choose Remove › Start actions.",
          steps: [cmd("sec.action", "remove")],
        },
        {
          instruction: "Turn on Controlled folder access to protect files from ransomware.",
          hint: "Virus & threat protection › Manage ransomware protection › Controlled folder access › On.",
          steps: [set("sec.cfa=on")],
        },
        {
          instruction: "Delete the \"Invoice_Oct\" ZIP attachment from Downloads.",
          hint: "Open File Explorer › Downloads, select Invoice_Oct (the zipped folder) and press Delete.",
          steps: [onSel(cmd("fs.delete"), "file:Downloads/Invoice_Oct.zip", "Select the zipped Invoice_Oct file in Downloads first.")],
        },
        {
          instruction: "Open Protection history in Windows Security to confirm the threat was removed.",
          hint: "Windows Security › Protection history.",
          steps: [cmd("sec.nav", "history")],
        },
      ],
    },
  ],

  "module-8::password-security-mfa": [
    {
      id: "win-tf-m8-password-security-mfa-1",
      app: "windows",
      title: "Strengthen your sign-in",
      scenario:
        "Northgate Adult Learning Center's new policy requires a long passphrase, a PIN that isn't a simple pattern, sign-in every time you return, no passwords saved in the browser on shared PCs, and two-step verification on your account.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Aisha Bello", email: "aisha.bello@northgatealc.org" },
        pin: "1234",
        password: "Spring2026!",
        web: {
          ...SEC_INFO,
          "mysignins.microsoft.com/security-info/add": {
            title: "My Sign-Ins | Add a sign-in method",
            site: "My Sign-Ins",
            color: "#0f6cbd",
            blocks: [
              { t: "h1", text: "Add a sign-in method" },
              { t: "form", id: "add-method", title: "Which method would you like to add?", fields: [{ name: "method", label: "Method", type: "select", options: ["Choose a method", "Passkey in Microsoft Authenticator", "Microsoft Authenticator", "Security key", "Phone", "Email"] }], submit: "Add", goto: "mysignins.microsoft.com/security-info/added" },
            ],
          },
        },
        fs: pc({ documents: [D("Registration")] }),
        windows: [{ id: "settings", app: "settings", page: "accounts" }],
        focus: "settings",
      }),
      tasks: [
        {
          instruction: "Change your Windows password from \"Spring2026!\" to the passphrase \"Copper-Lantern-River-42\".",
          hint: "Settings › Accounts › Sign-in options › Password › Change. Enter the current password, then the new one twice.",
          steps: [cmd("acct.password", "Copper-Lantern-River-42")],
        },
        {
          instruction: "Change your PIN from 1234 to 582917.",
          hint: "Settings › Accounts › Sign-in options › PIN (Windows Hello) › Change PIN.",
          steps: [cmd("acct.pin", "582917")],
        },
        {
          instruction: "Require Windows to ask you to sign in \"Every time\" you've been away.",
          hint: "Sign-in options › If you've been away, when should Windows require you to sign in again? › Every time.",
          steps: [set("signin.away=Every time")],
        },
        {
          instruction: "This PC is shared, so turn off \"Offer to save passwords\" in Microsoft Edge.",
          hint: "Open Edge › Settings and more (…) › Settings › Passwords › Offer to save passwords › Off.",
          steps: [set("edge.savePasswords=off")],
        },
        {
          instruction: "Go to \"mysignins.microsoft.com/security-info\" and add Microsoft Authenticator as a sign-in method.",
          hint: "In Edge, type the address and press Enter. Select + Add sign-in method, choose Microsoft Authenticator, then Add.",
          steps: [cmd("edge.nav", "mysignins.microsoft.com/security-info"), form("add-method", "Method: Microsoft Authenticator")],
        },
        {
          instruction: "Lock the computer, then sign back in with your new PIN.",
          hint: "Start › your name › Lock (or ⊞+L on the keyboard button). Click the lock screen and type 582917.",
          steps: [cmd("win.lock"), cmd("win.unlock", "582917")],
        },
      ],
    },
  ],

  "module-8::hipaa-data-security": [
    {
      id: "win-tf-m8-hipaa-data-security-1",
      app: "windows",
      title: "Protect confidential client records",
      scenario:
        "Maple Street Community Center keeps confidential client intake records. The privacy habits that protect patients in a medical office under HIPAA apply here too: keep records only in the restricted folder, remove stray copies, hide previews on the lock screen, and lock the screen whenever you step away.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Dana Brooks", email: "dana.brooks@maplestreetcc.org" },
        settings: { "power.screen": "Never", "notifications.lock": "on" },
        fs: pc({
          desktop: [{ name: "Microsoft Edge", app: "edge" }, F("Client Intake - R Alvarez.pdf", "10/19/2026 2:44 PM", "380 KB"), F("Food Pantry Flyer.docx")],
          downloads: [F("Client List export.csv", "10/18/2026 4:12 PM", "62 KB"), F("Volunteer Handbook.pdf")],
          documents: [D("Client Records (Restricted)", [F("Client Intake - M Chen.pdf"), F("Client Intake - T Johnson.pdf")]), D("Programs")],
        }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Move \"Client Intake - R Alvarez\" from the desktop into the Client Records (Restricted) folder.",
          hint: "Open File Explorer › Documents, then drag the file from the desktop onto Client Records (Restricted) (or Cut and Paste).",
          steps: [mv("Desktop/Client Intake - R Alvarez.pdf", "Documents/Client Records (Restricted)", "Select Client Intake - R Alvarez on the desktop first.")],
        },
        {
          instruction: "Permanently delete the stray \"Client List export\" file in Downloads.",
          hint: "File Explorer › Downloads, select the file, press Shift+Delete, then Yes.",
          steps: [onSel(cmd("fs.deletePermanent"), "file:Downloads/Client List export.csv", "Select Client List export in Downloads first.")],
        },
        {
          instruction: "Turn off notifications on the lock screen so message previews can't be read by visitors.",
          hint: "Settings › System › Notifications › clear Show notifications on the lock screen.",
          steps: [set("notifications.lock=off")],
        },
        {
          instruction: "Set the screen to turn off after 5 minutes when plugged in.",
          hint: "Settings › System › Power & battery › When plugged in, turn off my screen after › 5 minutes.",
          steps: [set("power.screen=5 minutes")],
        },
        {
          instruction: "Set the screen saver to Blank and check \"On resume, display logon screen\".",
          hint: "Settings › Personalization › Lock screen › Screen saver. Choose Blank, check On resume, display logon screen, then OK.",
          anyOrder: true,
          steps: [set("screensaver=Blank"), set("screensaver.secure=on")],
        },
        {
          instruction: "Turn on Device encryption.",
          hint: "Settings › Privacy & security › Device encryption › On.",
          steps: [set("privacy.encryption=on")],
        },
        {
          instruction: "Lock your workstation before you step away from the desk.",
          hint: "Start › your name › Lock (or ⊞+L on the keyboard button).",
          steps: [cmd("win.lock")],
        },
      ],
    },
  ],

  /* ============================ Module 9 ============================ */
  "module-9::evolution-of-computing-devices": [
    {
      id: "win-tf-m9-evolution-of-computing-devices-1",
      app: "windows",
      title: "Inventory the computers around the front desk",
      scenario:
        "The director of Harbor Point Insurance Agency is deciding whether to replace the front desk desktop. Before you weigh in, list what this PC is and what connects to it: phones, a smartwatch, and earbuds are computers too. One of them hasn't been approved for work use yet.",
      fileName: "Windows",
      minutes: 4,
      initial: winDoc({
        user: { name: "Keisha Grant", email: "keisha.grant@harborpointins.com" },
        specs: { model: "Fabrikam OptiDesk 3060", processor: "Intel(R) Core(TM) i5-8500 CPU @ 3.00GHz   3.00 GHz", ram: "8.00 GB (7.85 GB usable)", installedOn: "8/9/2019" },
        devices: [
          { name: "USB Keyboard", kind: "keyboard", connected: true },
          { name: "USB Optical Mouse", kind: "mouse", connected: true },
          { name: "Contoso Phone 12", kind: "phone", bt: true, connected: true, battery: "78%" },
          { name: "Fabrikam Band 4", kind: "watch", bt: true, connected: true, battery: "51%" },
          { name: "Contoso Earbuds", kind: "earbuds", bt: true, connected: true, battery: "90%" },
        ],
        fs: pc({ documents: [F("Device Inventory.txt", "10/20/2026 8:55 AM", "1 KB", { text: "Front desk device inventory\nThis PC (model): \nBluetooth devices: \n" })] }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Device Inventory.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Open the About page in Settings to see this PC's model and processor.",
          hint: "Start › Settings › System › About.",
          steps: [cmd("settings.nav", "system/about")],
        },
        {
          instruction: "Open the Devices page to see what is connected to this PC.",
          hint: "Settings › Bluetooth & devices › Devices.",
          steps: [cmd("settings.nav", "bluetooth/devices")],
        },
        {
          instruction: "In Device Inventory.txt, type \"Fabrikam OptiDesk 3060\" after This PC (model), then save.",
          hint: "Switch to Notepad, click at the end of the This PC (model) line, type the model, then press Ctrl+S.",
          steps: [saveNote("Documents/Device Inventory.txt", "Fabrikam OptiDesk 3060")],
        },
        {
          instruction: "After Bluetooth devices, type \"Contoso Phone 12, Fabrikam Band 4, Contoso Earbuds\", then save.",
          hint: "Click at the end of the Bluetooth devices line, type the three names separated by commas, then press Ctrl+S.",
          steps: [saveNote("Documents/Device Inventory.txt", "Contoso Phone 12, Fabrikam Band 4, Contoso Earbuds")],
        },
        {
          instruction: "The smartwatch isn't approved for work use yet. Disconnect \"Fabrikam Band 4\".",
          hint: "Settings › Bluetooth & devices › … next to Fabrikam Band 4 › Disconnect (or Quick settings › Bluetooth arrow).",
          steps: [cmd("bt.disconnect", "Fabrikam Band 4")],
        },
      ],
    },
  ],

  /* ============================ Module 10 =========================== */
  "module-10::apps-and-how-software-is-built": [
    {
      id: "win-tf-m10-apps-and-how-software-is-built-1",
      app: "windows",
      title: "Native apps, web apps, and OEM software",
      scenario:
        "The new laptops at Harbor Point Insurance Agency came with extra manufacturer (OEM) software. Remove the unsupported deals app, install the web-based scheduling tool as an app, make Edge the PDF viewer, and keep Microsoft software patched.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Keisha Grant", email: "keisha.grant@harborpointins.com" },
        apps: [
          { name: "Fabrikam Support Assistant", publisher: "Fabrikam Inc.", version: "9.2.1", size: "148 MB", installed: "3/12/2025" },
          { name: "Fabrikam Deals Hub", publisher: "Fabrikam Inc.", version: "1.0.3", size: "62.4 MB", installed: "3/12/2025" },
          { name: "Fabrikam PDF Viewer", publisher: "Fabrikam Inc.", version: "2.4.0", size: "88.0 MB", installed: "3/12/2025" },
        ],
        settings: { "default.pdf": "Fabrikam PDF Viewer" },
        web: {
          "app.contososcheduling.com": {
            title: "Contoso Scheduling | Today",
            site: "Contoso Scheduling",
            color: "#5b3fa8",
            blocks: [
              { t: "h1", text: "Today's appointments" },
              { t: "table", head: ["Time", "Client", "Agent"], rows: [["9:30 AM", "R. Ramos", "Keisha"], ["11:00 AM", "T. Nguyen", "Marcus"], ["2:15 PM", "A. Patel", "Keisha"]] },
              { t: "small", text: "Contoso Scheduling is a web app. It runs in your browser and updates itself on the server." },
            ],
          },
        },
        fs: pc({ documents: [D("Quotes")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Uninstall \"Fabrikam Deals Hub\", an OEM app the manufacturer no longer supports.",
          hint: "Start › Settings › Apps › Installed apps › … next to Fabrikam Deals Hub › Uninstall › Uninstall.",
          steps: [cmd("app.uninstall", "Fabrikam Deals Hub")],
        },
        {
          instruction: "Open the web scheduling app at \"app.contososcheduling.com\" in Microsoft Edge.",
          hint: "Open Edge, click the address bar, type app.contososcheduling.com and press Enter.",
          steps: [cmd("edge.nav", "app.contososcheduling.com")],
        },
        {
          instruction: "Install the site as an app so staff can open it from Start.",
          hint: "Settings and more (…) › Apps › Install this site as an app.",
          steps: [cmd("edge.installApp", "app.contososcheduling.com")],
        },
        {
          instruction: "Set Microsoft Edge as the default app for .pdf files.",
          hint: "Settings › Apps › Default apps › type .pdf in Set a default for a file type, select the current app, choose Microsoft Edge › Set default.",
          steps: [set("default.pdf=Microsoft Edge")],
        },
        {
          instruction: "Turn on \"Receive updates for other Microsoft products\".",
          hint: "Settings › Windows Update › Advanced options › Receive updates for other Microsoft products › On.",
          steps: [set("update.otherProducts=on")],
        },
        {
          instruction: "Check for updates.",
          hint: "Settings › Windows Update › Check for updates.",
          steps: [cmd("update.check")],
        },
      ],
    },
  ],

  "module-10::internet-of-things": [
    {
      id: "win-tf-m10-internet-of-things-1",
      app: "windows",
      title: "Secure the office's smart devices",
      scenario:
        "Riverside Print & Copy added a smart thermostat and a lobby camera. Each is a small computer on the network. Move them off the network the work computers use, replace the camera's default password, turn off a feature you don't use, and check for firmware updates.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Marcus Reed", email: "marcus.reed@riversideprint.com" },
        web: {
          "192.168.1.1": {
            title: "Contoso Router | Connected devices",
            secure: false,
            site: "Contoso Router",
            color: "#334155",
            nav: [{ text: "Connected devices", href: "192.168.1.1" }, { text: "Wireless", href: "192.168.1.1" }],
            blocks: [
              { t: "h1", text: "Connected devices" },
              { t: "p", text: "Put smart devices on the IoT network so a compromised device can't reach the work computers." },
              { t: "table", head: ["Device", "IP address", "Type"], rows: [["FRONT-PC-01", "192.168.1.21", "Computer"], ["Counter Printer", "192.168.1.30", "Printer"], ["Lobby Camera", "192.168.1.60", "Camera"], ["Smart Thermostat", "192.168.1.61", "Thermostat"]] },
              { t: "select", id: "net-camera", label: "Lobby Camera network", options: ["Main network", "IoT network", "Guest network"], value: "Main network" },
              { t: "select", id: "net-thermostat", label: "Smart Thermostat network", options: ["Main network", "IoT network", "Guest network"], value: "Main network" },
              { t: "link", text: "Open the Lobby Camera settings (192.168.1.60)", href: "192.168.1.60" },
            ],
          },
          "192.168.1.60": {
            title: "Lobby Camera | Settings",
            secure: false,
            site: "Fabrikam Cam 2",
            color: "#0f766e",
            blocks: [
              { t: "alert", tone: "warn", text: "You are using the default password. Change it now." },
              { t: "form", id: "cam-password", title: "Change password", fields: [{ name: "cur", label: "Current password", type: "password" }, { name: "new", label: "New password", type: "password" }, { name: "confirm", label: "Confirm new password", type: "password" }], submit: "Save password", toast: "Camera password updated." },
              { t: "toggle", id: "cam-remote", label: "Remote access from the internet", on: true, note: "Lets anyone with the app view the camera from outside the office." },
              { t: "toggle", id: "cam-motion", label: "Motion alerts", on: true },
              { t: "button", id: "fw-check", text: "Check for firmware update", style: "default", toast: "Firmware 3.1.2 is available. Install it after hours." },
            ],
          },
        },
        fs: pc({ documents: [D("Orders")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Open the router's admin page at 192.168.1.1.",
          hint: "Click the address bar in Edge, type 192.168.1.1 and press Enter.",
          steps: [cmd("edge.nav", "192.168.1.1")],
        },
        {
          instruction: "Move \"Lobby Camera\" to the IoT network.",
          hint: "On the Connected devices page, set Lobby Camera network to IoT network.",
          steps: [cmd("web.set", "net-camera=IoT network")],
        },
        {
          instruction: "Move \"Smart Thermostat\" to the IoT network.",
          hint: "Set Smart Thermostat network to IoT network.",
          steps: [cmd("web.set", "net-thermostat=IoT network")],
        },
        {
          instruction: "Open the camera's settings at 192.168.1.60 and change its default password \"admin\" to \"Rv-Lobby-Cam-7351\".",
          hint: "Select the camera settings link (or type 192.168.1.60). Enter admin as the current password, the new password twice, then Save password.",
          steps: [cmd("edge.nav", "192.168.1.60"), form("cam-password", "Current password: admin | New password: Rv-Lobby-Cam-7351 | Confirm new password: Rv-Lobby-Cam-7351")],
        },
        {
          instruction: "Turn off \"Remote access from the internet\" on the camera.",
          hint: "On the camera settings page, switch Remote access from the internet off.",
          steps: [cmd("web.set", "cam-remote=off")],
        },
        {
          instruction: "Check the camera for a firmware update.",
          hint: "Select Check for firmware update.",
          steps: [click("fw-check")],
        },
      ],
    },
  ],

  "module-10::designing-a-soho-network": [
    {
      id: "win-tf-m10-designing-a-soho-network-1",
      app: "windows",
      title: "Set up the second location's network",
      scenario:
        "Riverside Print & Copy is opening a second location. Find the router from this PC, use the strongest Wi-Fi security, create a guest network that can't reach the work computers, change the default admin password, and set this PC's network profile.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: { name: "Marcus Reed", email: "marcus.reed@riversideprint.com" },
        net: { type: "ethernet", ip: "192.168.10.23", gateway: "192.168.10.1", dns: "192.168.10.1" },
        web: {
          "192.168.10.1": {
            title: "Contoso Router | Wireless",
            secure: false,
            site: "Contoso Router",
            color: "#334155",
            nav: [{ text: "Status", href: "192.168.10.1" }, { text: "Wireless", href: "192.168.10.1" }, { text: "Administration", href: "192.168.10.1" }],
            blocks: [
              { t: "h1", text: "Wireless settings" },
              { t: "table", head: ["Network", "Name (SSID)", "Clients"], rows: [["Main (staff)", "Riverside-Staff", "6"], ["Guest", "(not set up)", "0"]] },
              { t: "select", id: "wifi-security", label: "Main network security mode", options: ["None", "WEP", "WPA2-Personal", "WPA2/WPA3-Personal", "WPA3-Personal"], value: "WPA2-Personal" },
              { t: "h2", text: "Guest network" },
              { t: "form", id: "guest-net", title: "Create a guest network", fields: [{ name: "ssid", label: "Network name" }, { name: "pw", label: "Password", type: "password" }, { name: "lan", label: "Allow guests to see each other and access my local network", type: "checkbox", value: "on" }], submit: "Save guest network", toast: "Guest network saved." },
              { t: "h2", text: "Administration" },
              { t: "form", id: "admin-pw", title: "Router admin password", fields: [{ name: "cur", label: "Current password", type: "password" }, { name: "new", label: "New password", type: "password" }, { name: "confirm", label: "Confirm new password", type: "password" }], submit: "Change password", toast: "Router password changed." },
            ],
          },
        },
        fs: pc({ documents: [D("Orders")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open Command Prompt and run ipconfig to find the default gateway (the router's address).",
          hint: "Search on the taskbar › cmd › Command Prompt, then type ipconfig and press Enter.",
          steps: [cmd("cmd.run", "ipconfig")],
        },
        {
          instruction: "In Edge, go to the router at 192.168.10.1.",
          hint: "Open Edge, type 192.168.10.1 in the address bar and press Enter.",
          steps: [cmd("edge.nav", "192.168.10.1")],
        },
        {
          instruction: "Set the main network's security mode to WPA3-Personal.",
          hint: "Main network security mode › WPA3-Personal.",
          steps: [cmd("web.set", "wifi-security=WPA3-Personal")],
        },
        {
          instruction: "Create a guest network named \"Riverside-Guest\" with the password \"Welcome-Riverside-26\", and don't let guests access the local network.",
          hint: "Fill in Network name and Password, clear Allow guests to see each other and access my local network, then Save guest network.",
          steps: [form("guest-net", "Network name: Riverside-Guest | Password: Welcome-Riverside-26 | Allow guests to see each other and access my local network: off")],
        },
        {
          instruction: "Change the router's admin password from \"admin\" to \"Rv2-Router-Admin-88\".",
          hint: "Under Administration, enter admin, then the new password twice, and select Change password.",
          steps: [form("admin-pw", "Current password: admin | New password: Rv2-Router-Admin-88 | Confirm new password: Rv2-Router-Admin-88")],
        },
        {
          instruction: "Set this PC's Ethernet network profile to Private so it can use the office printer and file sharing.",
          hint: "Start › Settings › Network & internet › Ethernet › Network profile type › Private network.",
          steps: [set("net.profile=Private")],
        },
      ],
    },
  ],
};
