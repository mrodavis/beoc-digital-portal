import type { SimDefinition, SimStep } from "@/types/sim";
import { winDoc, type WinItem, type WinRoot } from "@/components/sim/apps/windows/types";

/*
 * Modern Office sims that run in the Windows 11 engine.
 * Keys are "<moduleSlug>::<lessonSlug>" from modern-office/modules.ts
 * (Computer Basics through The Internet & Networking are module-1 to module-5;
 * Digital Office Foundations is module-8).
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
  onedrive?: WinItem[];
  onedriveLabel?: string;
  network?: { name: string; items: WinItem[] };
  gdrive?: WinItem[];
}): WinRoot[] {
  const r: WinRoot[] = [
    { name: "Desktop", root: "desktop", folder: true, children: o.desktop ?? [{ name: "Microsoft Edge", app: "edge" }] },
    { name: "Documents", root: "documents", folder: true, children: o.documents ?? [] },
    { name: "Downloads", root: "downloads", folder: true, children: o.downloads ?? [] },
    { name: "Pictures", root: "pictures", folder: true, children: [D("Screenshots")] },
    { name: "Music", root: "music", folder: true, children: [] },
    { name: "Videos", root: "videos", folder: true, children: [] },
  ];
  if (o.onedrive) r.push({ name: "OneDrive", root: "onedrive", label: o.onedriveLabel ?? "OneDrive - Personal", folder: true, children: o.onedrive });
  r.push({ name: "Local Disk (C:)", root: "drive", folder: true, capacity: "476 GB", free: "289 GB", children: [D("Program Files"), D("Users"), D("Windows")] });
  if (o.network) r.push({ name: o.network.name, root: "network", folder: true, capacity: "1.81 TB", free: "1.12 TB", children: o.network.items });
  if (o.gdrive) r.push({ name: "Google Drive", root: "gdrive", folder: true, children: o.gdrive });
  return r;
}

const cmd = (id: string, value?: string): SimStep => ({ action: { kind: "command", id, ...(value !== undefined ? { value } : {}) } });
const set = (kv: string): SimStep => cmd("settings.set", kv);
const onSel = (step: SimStep, selection: string, selectHint: string): SimStep => ({ ...step, requires: { selection }, selectHint });
const newFolder = (parent: string, name: string): SimStep[] => [cmd("fs.newFolder", parent), { action: { kind: "type", target: `${parent}/New folder`, value: name } }];
const ren = (path: string, value: string): SimStep => ({ action: { kind: "type", target: path, value } });
const mv = (src: string, dest: string, hint: string): SimStep => onSel(cmd("fs.move", dest), `file:${src}`, hint);
const cp = (src: string, dest: string, hint: string): SimStep => onSel(cmd("fs.copyTo", dest), `file:${src}`, hint);
const saveNote = (path: string, value: string): SimStep => ({ action: { kind: "type", target: `notepad:${path}`, value, match: "includes" } });
const form = (id: string, value: string): SimStep => ({ action: { kind: "type", target: `form:${id}`, value, match: "includes" } });
const click = (id: string): SimStep => ({ action: { kind: "click", target: `web:${id}` } });
const ONEDRIVE_WEB: SimStep = { action: { kind: "command", id: "edge.nav", value: ["onedrive.live.com", "onedrive.com"] } };

const TOR = { name: "Jordan Rivera", email: "jordan.rivera@tortech.com", org: "TOR Tech" };
const LMA = { name: "Dana Brooks", email: "dana.brooks@lakesidemedical.org", org: "Lakeside Medical Associates" };

/* ------------------------------------------------------------------ */
/* Sims                                                                */
/* ------------------------------------------------------------------ */

export const windowsSims: Record<string, SimDefinition[]> = {
  /* ===================== Module 8: Digital Office Foundations ===================== */
  "module-8::what-is-a-modern-office": [
    {
      id: "win-mo-m8-what-is-a-modern-office-1",
      app: "windows",
      title: "Your first morning in a digital office",
      scenario:
        "It's your first day at TOR Tech. There are no filing cabinets: shared files live in OneDrive, news is on the company intranet, and the team chats in Teams. Sign in and find your way to each layer of the digital office.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: TOR,
        locked: true,
        pin: "1357",
        web: {
          "intranet.tortech.com": {
            title: "TOR Tech Intranet | Home",
            site: "TOR Tech Intranet",
            color: "#7c2d12",
            nav: [{ text: "News", href: "intranet.tortech.com" }, { text: "People", href: "intranet.tortech.com" }, { text: "Policies", href: "intranet.tortech.com" }],
            blocks: [
              { t: "h1", text: "Welcome to TOR Tech, Jordan!" },
              { t: "p", text: "Start with the Welcome Packet in the Shared with Team folder, then join the #new-hires channel in Teams." },
              { t: "list", items: ["Email and calendar: Outlook", "Files: OneDrive and SharePoint", "Chat and meetings: Microsoft Teams"] },
            ],
          },
        },
        fs: pc({
          onedrive: [
            D("Shared with Team", [F("Welcome Packet.pdf", "10/16/2026 9:00 AM", "1.2 MB", { sync: "cloud", text: "Welcome to TOR Tech\nYour first week: set up your workspace, meet your team, and review the IT security policy." }), F("Team Directory.xlsx", "10/12/2026 2:10 PM", "44 KB", { sync: "cloud" })], { sync: "cloud" }),
            F("Getting Started.docx", "10/19/2026 4:00 PM", "28 KB", { sync: "cloud" }),
          ],
          onedriveLabel: "OneDrive - TOR Tech",
        }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Sign in to Windows with your PIN, 1357.",
          hint: "Click the lock screen (or press any key), then type 1357 in the PIN box.",
          steps: [cmd("win.unlock", "1357")],
        },
        {
          instruction: "Open File Explorer and go to the \"Shared with Team\" folder in OneDrive.",
          hint: "Open File Explorer from the taskbar, select OneDrive - TOR Tech in the navigation pane, then double-click Shared with Team.",
          steps: [cmd("explorer.nav", "OneDrive/Shared with Team")],
        },
        {
          instruction: "Open the \"Welcome Packet\" PDF.",
          hint: "Double-click Welcome Packet. PDFs open in Microsoft Edge.",
          steps: [cmd("fs.open", "OneDrive/Shared with Team/Welcome Packet.pdf")],
        },
        {
          instruction: "Go to the company intranet at \"intranet.tortech.com\".",
          hint: "In Edge, select + for a new tab (or use the current tab), type intranet.tortech.com in the address bar and press Enter.",
          steps: [cmd("edge.nav", "intranet.tortech.com")],
        },
        {
          instruction: "Add the intranet page to the favorites bar.",
          hint: "Select the star in the address bar (or Ctrl+D), keep Favorites bar as the folder, then Done.",
          steps: [onSel(cmd("edge.favorite", "Favorites bar"), "page:intranet.tortech.com", "Go to the intranet page first.")],
        },
        {
          instruction: "Pin Microsoft Teams to the taskbar.",
          hint: "Start › right-click Microsoft Teams › Pin to taskbar.",
          steps: [cmd("taskbar.pin", "teams")],
        },
      ],
    },
  ],

  "module-8::core-office-tools": [
    {
      id: "win-mo-m8-core-office-tools-1",
      app: "windows",
      title: "Use the right tool for each request",
      scenario:
        "Before lunch, your manager at TOR Tech asks you to update the client contact list, store a signed contract where the team can find it, give the team editing access to the project update, and send a meeting invite. Choose the right tool for each job.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: TOR,
        fs: pc({
          downloads: [F("Signed Contract - Apex Logistics.pdf", "10/20/2026 9:20 AM", "480 KB")],
          onedrive: [
            D("Clients", [D("Contracts", [F("Signed Contract - Birchwood Dental.pdf", "9/18/2026 1:00 PM", "410 KB", { sync: "local" })], { sync: "local" })], { sync: "local" }),
            F("Client Contacts.xlsx", "10/19/2026 5:12 PM", "72 KB", { sync: "local" }),
            F("Project Update - Q4.docx", "10/20/2026 8:40 AM", "56 KB", { sync: "local" }),
          ],
          onedriveLabel: "OneDrive - TOR Tech",
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "OneDrive", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "Open the spreadsheet you would use to update client names and phone numbers.",
          hint: "Double-click Client Contacts in OneDrive - TOR Tech. Rows and columns of data belong in a spreadsheet.",
          steps: [cmd("fs.open", "OneDrive/Client Contacts.xlsx")],
        },
        {
          instruction: "Store \"Signed Contract - Apex Logistics\" from Downloads in the shared Clients › Contracts folder in OneDrive.",
          hint: "Open Downloads, drag the contract onto OneDrive - TOR Tech › Clients › Contracts in the navigation pane (or Cut and Paste).",
          steps: [mv("Downloads/Signed Contract - Apex Logistics.pdf", "OneDrive/Clients/Contracts", "Select Signed Contract - Apex Logistics in Downloads first.")],
        },
        {
          instruction: "Share \"Project Update - Q4\" with team@tortech.com so the team can edit it.",
          hint: "Right-click Project Update - Q4 › Share, type team@tortech.com, keep Can edit, then Send.",
          steps: [onSel(cmd("share.send", "team@tortech.com:edit"), "file:OneDrive/Project Update - Q4.docx", "Share Project Update - Q4 (right-click it › Share).")],
        },
        {
          instruction: "Open the app TOR Tech uses for email and meeting invitations.",
          hint: "Start › Outlook (or select Outlook on the taskbar).",
          steps: [cmd("win.open", "outlook")],
        },
        {
          instruction: "Open the app the team uses for quick chat messages and video meetings.",
          hint: "Start › Microsoft Teams.",
          steps: [cmd("win.open", "teams")],
        },
      ],
    },
  ],

  "module-8::setup-digital-workspace": [
    {
      id: "win-mo-m8-setup-digital-workspace-1",
      app: "windows",
      title: "Build your workspace folders in OneDrive",
      scenario:
        "Your manager at TOR Tech says: \"Get yourself set up digitally. I need you ready to receive, organize, and share files by end of day.\" Build your workspace in OneDrive with the three core folders, name files YYYY-MM_Description before filing them, and share only the Clients folder, view-only.",
      fileName: "Windows",
      minutes: 7,
      initial: winDoc({
        user: TOR,
        fs: pc({
          desktop: [{ name: "Microsoft Edge", app: "edge" }, F("notes final.docx", "10/19/2026 3:40 PM", "22 KB")],
          downloads: [F("scan0047.pdf", "10/20/2026 8:55 AM", "690 KB")],
          onedrive: [F("Getting Started.docx", "10/19/2026 4:00 PM", "28 KB", { sync: "cloud" })],
          onedriveLabel: "OneDrive - TOR Tech",
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "OneDrive", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "In OneDrive, create a folder named \"TOR Tech - My Workspace\".",
          hint: "In File Explorer › OneDrive - TOR Tech, New › Folder, type the name and press Enter.",
          steps: newFolder("OneDrive", "TOR Tech - My Workspace"),
        },
        {
          instruction: "Inside it, create the folders \"Clients\", \"Internal Docs\", and \"Projects\".",
          hint: "Open TOR Tech - My Workspace, then New › Folder for each one. Name each folder and press Enter before making the next.",
          anyOrder: true,
          steps: [
            ...newFolder("OneDrive/TOR Tech - My Workspace", "Clients"),
            ...newFolder("OneDrive/TOR Tech - My Workspace", "Internal Docs"),
            ...newFolder("OneDrive/TOR Tech - My Workspace", "Projects"),
          ],
        },
        {
          instruction: "Rename \"scan0047\" in Downloads to \"2026-10_ClientIntake_AcmeCorp\", then move it into the Clients folder.",
          hint: "Open Downloads, select scan0047 › Rename (F2), type the name, press Enter. Then drag it onto Clients (or Cut and Paste).",
          steps: [ren("Downloads/scan0047.pdf", "2026-10_ClientIntake_AcmeCorp.pdf"), mv("Downloads/2026-10_ClientIntake_AcmeCorp.pdf", "OneDrive/TOR Tech - My Workspace/Clients", "Select 2026-10_ClientIntake_AcmeCorp in Downloads first.")],
        },
        {
          instruction: "Rename \"notes final\" on the desktop to \"2026-10_MeetingNotes_v1\", then move it into Internal Docs.",
          hint: "Select notes final on the desktop › F2, type the name, press Enter. Then drag it onto Internal Docs in File Explorer (or Cut and Paste).",
          steps: [ren("Desktop/notes final.docx", "2026-10_MeetingNotes_v1.docx"), mv("Desktop/2026-10_MeetingNotes_v1.docx", "OneDrive/TOR Tech - My Workspace/Internal Docs", "Select 2026-10_MeetingNotes_v1 on the desktop first.")],
        },
        {
          instruction: "Share only the Clients folder with your trainer, k.wallace@tortech.com, with view-only access.",
          hint: "Right-click Clients › Share, type the email, change the permission to Can view, then Send.",
          steps: [onSel(cmd("share.send", "k.wallace@tortech.com:view"), "file:OneDrive/TOR Tech - My Workspace/Clients", "Share the Clients folder (right-click it › Share).")],
        },
        {
          instruction: "Pin \"TOR Tech - My Workspace\" to Quick access.",
          hint: "Right-click TOR Tech - My Workspace › Pin to Quick access.",
          steps: [onSel(cmd("fs.pinQuick"), "file:OneDrive/TOR Tech - My Workspace", "Select TOR Tech - My Workspace first.")],
        },
      ],
    },
    {
      id: "win-mo-m8-setup-digital-workspace-2",
      app: "windows",
      title: "Set up your desktop, taskbar, and OneDrive backup",
      scenario:
        "Finish your TOR Tech setup by making the desktop and taskbar work for you: put the apps you use daily in reach, clear what you don't use, and make sure the files you save on the desktop and in Documents back up to OneDrive automatically.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: TOR,
        fs: pc({ onedrive: [D("TOR Tech - My Workspace", [D("Clients"), D("Internal Docs"), D("Projects")], { sync: "local" })], onedriveLabel: "OneDrive - TOR Tech" }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Align the taskbar icons to the left.",
          hint: "Right-click an empty part of the taskbar › Taskbar settings › Taskbar behaviors › Taskbar alignment › Left.",
          steps: [set("taskbar.align=Left")],
        },
        {
          instruction: "Turn off the Widgets button on the taskbar.",
          hint: "Settings › Personalization › Taskbar › Widgets › Off.",
          steps: [set("taskbar.widgets=off")],
        },
        {
          instruction: "Pin Microsoft Teams to the taskbar.",
          hint: "Start › right-click Microsoft Teams › Pin to taskbar.",
          steps: [cmd("taskbar.pin", "teams")],
        },
        {
          instruction: "Unpin Microsoft Store from the taskbar.",
          hint: "Right-click the Microsoft Store icon on the taskbar › Unpin from taskbar.",
          steps: [cmd("taskbar.unpin", "store")],
        },
        {
          instruction: "Turn on OneDrive backup for the Desktop and Documents folders.",
          hint: "Settings › Accounts › Windows backup › OneDrive folder syncing (or the OneDrive icon on the taskbar › Settings), then turn on Desktop and Documents.",
          anyOrder: true,
          steps: [set("od.backup.desktop=on"), set("od.backup.documents=on")],
        },
        {
          instruction: "Change the desktop background to the \"Glow\" picture.",
          hint: "Right-click the desktop › Personalize › Background › Recent images › Glow.",
          steps: [set("wallpaper=Glow")],
        },
      ],
    },
  ],

  /* ===================== Module 1: Computer Basics ===================== */
  "module-1::what-a-computer-is": [
    {
      id: "win-mo-m1-what-a-computer-is-1",
      app: "windows",
      title: "Find input, processing, output, and storage on this PC",
      scenario:
        "In the Cloud Technology with AI course at BEOC, you start with the machine in front of you. The cloud is somebody else's computers, built from the same parts. Find this PC's processor, memory, storage, and connected devices, and record them in your spec worksheet.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: { name: "Jordan Rivera", email: "jordan.rivera@student.example.org" },
        devices: [
          { name: "USB Keyboard", kind: "keyboard", connected: true },
          { name: "USB Optical Mouse", kind: "mouse", connected: true },
          { name: "Contoso 24-inch Monitor", kind: "monitor", connected: true },
          { name: "Contoso USB Headset", kind: "headset", connected: true },
        ],
        fs: pc({ documents: [F("Spec Worksheet.txt", "10/20/2026 9:00 AM", "1 KB", { text: "Spec worksheet: this PC\nProcessing (CPU): \nMemory (RAM): \nStorage: \n" })] }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Spec Worksheet.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Open the About page in Settings to see the processor and installed RAM.",
          hint: "Start › Settings › System › About.",
          steps: [cmd("settings.nav", "system/about")],
        },
        {
          instruction: "Open Storage settings to see how much of the drive is in use.",
          hint: "Settings › System › Storage.",
          steps: [cmd("settings.nav", "system/storage")],
        },
        {
          instruction: "In Task Manager, show the Performance page for Memory.",
          hint: "Right-click the taskbar › Task Manager › Performance › Memory.",
          steps: [cmd("taskmgr.tab", "performance"), cmd("taskmgr.perf", "memory")],
        },
        {
          instruction: "Open Bluetooth & devices to see the input and output devices connected to this PC.",
          hint: "Settings › Bluetooth & devices.",
          steps: [{ action: { kind: "command", id: "settings.nav", value: ["bluetooth", "bluetooth/devices"] } }],
        },
        {
          instruction: "In Spec Worksheet.txt, type \"16 GB\" after Memory (RAM), then save.",
          hint: "Switch to Notepad, click at the end of the Memory (RAM) line, type 16 GB, then press Ctrl+S.",
          steps: [saveNote("Documents/Spec Worksheet.txt", "Memory (RAM): 16 GB")],
        },
        {
          instruction: "Type \"SSD\" after Storage, then save again.",
          hint: "Click at the end of the Storage line, type SSD, then press Ctrl+S.",
          steps: [saveNote("Documents/Spec Worksheet.txt", "Storage: SSD")],
        },
      ],
    },
  ],

  "module-1::building-a-virtual-computer": [
    {
      id: "win-mo-m1-building-a-virtual-computer-1",
      app: "windows",
      title: "Spec a $900 front desk workstation",
      scenario:
        "Lakeside Medical Associates is replacing four front desk workstations at about $900 each. They run an EHR, Office, and a browser with a dozen tabs, all day, for five years. Start from the workload, not the price list: check the current machine, then shop the vendor's site.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: LMA,
        specs: { processor: "Intel(R) Core(TM) i3-7100 CPU @ 3.90GHz   3.91 GHz", ram: "8.00 GB (7.88 GB usable)", diskType: "HDD", diskModel: "Fabrikam 500GB HDD", storage: "466 GB", storageUsed: "301 GB", model: "Fabrikam OptiDesk 3050" },
        web: {
          "adventureworks-tech.com/business-desktops": {
            title: "Business Desktops | Adventure Works Tech",
            site: "Adventure Works Tech",
            color: "#1f3a5f",
            nav: [{ text: "Business desktops", href: "adventureworks-tech.com/business-desktops" }, { text: "Monitors", href: "adventureworks-tech.com/monitors" }, { text: "Cart", href: "adventureworks-tech.com/cart" }],
            blocks: [
              { t: "h1", text: "Business desktops" },
              { t: "p", text: "Prices include Windows 11 Pro and a 1-year limited warranty." },
              { t: "product", id: "p1", name: "AW Office Mini", price: "$529", specs: ["Intel Core i3 (current generation)", "8 GB RAM", "1 TB HDD (7200 RPM)", "Integrated graphics"] },
              { t: "product", id: "p2", name: "AW ProDesk 5", price: "$779", badge: "Business pick", specs: ["Intel Core i5 (current generation)", "16 GB RAM", "512 GB SSD", "Integrated graphics"] },
              { t: "product", id: "p3", name: "AW Gamer X", price: "$1,249", specs: ["Intel Core i7", "16 GB RAM", "1 TB SSD", "Gaming graphics card"] },
              { t: "product", id: "p4", name: "AW Creator Tower", price: "$1,899", specs: ["Intel Core i9", "32 GB RAM", "2 TB SSD", "Workstation graphics card"] },
            ],
          },
          "adventureworks-tech.com/monitors": {
            title: "Monitors | Adventure Works Tech",
            site: "Adventure Works Tech",
            color: "#1f3a5f",
            nav: [{ text: "Business desktops", href: "adventureworks-tech.com/business-desktops" }, { text: "Monitors", href: "adventureworks-tech.com/monitors" }, { text: "Cart", href: "adventureworks-tech.com/cart" }],
            blocks: [
              { t: "h1", text: "Monitors" },
              { t: "product", id: "m1", name: "AW 24-inch Full HD Monitor", price: "$129", specs: ["1920 × 1080", "Height-adjustable stand", "HDMI and DisplayPort"] },
              { t: "product", id: "m2", name: "AW 32-inch 4K Creator Monitor", price: "$449", specs: ["3840 × 2160", "Color-calibrated", "USB-C"] },
            ],
          },
          "adventureworks-tech.com/cart": {
            title: "Cart | Adventure Works Tech",
            site: "Adventure Works Tech",
            color: "#1f3a5f",
            nav: [{ text: "Business desktops", href: "adventureworks-tech.com/business-desktops" }, { text: "Monitors", href: "adventureworks-tech.com/monitors" }, { text: "Cart", href: "adventureworks-tech.com/cart" }],
            blocks: [
              { t: "h1", text: "Your cart" },
              { t: "p", text: "Review your order. Business support covers parts, labor, and next-day on-site service." },
              { t: "select", id: "warranty", label: "Warranty", options: ["1-year limited warranty", "3-year business support (+$59)"], value: "1-year limited warranty" },
              { t: "form", id: "order-note", title: "Order note for your manager", fields: [{ name: "note", label: "Justification" }], submit: "Submit for approval", toast: "Order submitted for approval." },
            ],
          },
        },
        fs: pc({ documents: [D("Purchasing")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Check the current machine first: open the About page in Settings.",
          hint: "Start › Settings › System › About. Note the RAM and processor.",
          steps: [cmd("settings.nav", "system/about")],
        },
        {
          instruction: "In Edge, open the vendor's Business desktops page at \"adventureworks-tech.com/business-desktops\".",
          hint: "Click Edge's address bar, type the address, press Enter.",
          steps: [cmd("edge.nav", "adventureworks-tech.com/business-desktops")],
        },
        {
          instruction: "Add the desktop with an SSD, 16 GB of RAM, and a current mid-range processor to the cart, staying under $900.",
          hint: "Compare the specs: the AW ProDesk 5 has an SSD, 16 GB RAM and a Core i5 for $779. Select its Add to cart button.",
          steps: [click("p2")],
        },
        {
          instruction: "Open the Monitors page and add one 24-inch monitor as a second display.",
          hint: "Select Monitors at the top of the page, then Add to cart on the AW 24-inch Full HD Monitor.",
          steps: [click("m1")],
        },
        {
          instruction: "In the cart, choose the 3-year business support warranty.",
          hint: "Select Cart, then set Warranty to 3-year business support (+$59).",
          steps: [cmd("web.set", "warranty=3-year business support (+$59)")],
        },
        {
          instruction: "Type the justification \"SSD and 16 GB RAM for the EHR and many tabs\" and submit it for approval.",
          hint: "In the Order note box, type the text exactly, then select Submit for approval.",
          steps: [form("order-note", "Justification: SSD and 16 GB RAM for the EHR and many tabs")],
        },
      ],
    },
  ],

  /* ===================== Module 2: Cloud Computing Basics ===================== */
  "module-2::what-cloud-technology-is": [
    {
      id: "win-mo-m2-what-cloud-technology-is-1",
      app: "windows",
      title: "Move the closet server's files to the cloud",
      scenario:
        "Lakeside Medical Associates is retiring the server in the closet. Copy the shared folders from the old server drive to OneDrive, turn on backup for your own Documents folder, and confirm the files are reachable from the web on any device.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: LMA,
        fs: pc({
          network: {
            name: "Practice Server (S:)",
            items: [
              D("Policies", [F("Privacy Policy 2026.docx"), F("Office Hours.docx"), F("Phone Script.docx")]),
              D("Forms", [F("New Patient Intake.pdf"), F("Records Release.pdf")]),
              D("Old Backups", [F("backup_2023.bak", "1/4/2024 2:00 AM", "4.1 GB")]),
            ],
          },
          documents: [D("Front Desk"), F("Supply Order.xlsx")],
          onedrive: [F("Getting Started.docx", "10/19/2026 4:00 PM", "28 KB", { sync: "cloud" })],
          onedriveLabel: "OneDrive - Lakeside Medical",
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "This PC", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "Open the Practice Server (S:) drive in File Explorer.",
          hint: "In This PC, double-click Practice Server (S:).",
          steps: [cmd("explorer.nav", "Practice Server (S:)")],
        },
        {
          instruction: "Copy the Policies folder to OneDrive.",
          hint: "Select Policies › Copy (Ctrl+C), select OneDrive - Lakeside Medical in the navigation pane › Paste (Ctrl+V). Dragging to OneDrive from the server also copies.",
          steps: [cp("Practice Server (S:)/Policies", "OneDrive", "Select the Policies folder on the server first.")],
        },
        {
          instruction: "Copy the Forms folder to OneDrive too.",
          hint: "Select Forms on the server › Copy, open OneDrive - Lakeside Medical › Paste.",
          steps: [cp("Practice Server (S:)/Forms", "OneDrive", "Select the Forms folder on the server first.")],
        },
        {
          instruction: "Turn on OneDrive backup for your Documents folder.",
          hint: "Settings › Accounts › Windows backup › Documents › On (or the OneDrive icon on the taskbar › Settings).",
          steps: [set("od.backup.documents=on")],
        },
        {
          instruction: "Open OneDrive on the web and open the Policies folder to confirm it's reachable online.",
          hint: "OneDrive icon on the taskbar › View online (globe), or type onedrive.live.com in Edge. Then select Policies.",
          steps: [ONEDRIVE_WEB, cmd("cloud.open", "OneDrive/Policies")],
        },
      ],
    },
  ],

  "module-2::iaas-paas-saas": [
    {
      id: "win-mo-m2-iaas-paas-saas-1",
      app: "windows",
      title: "Who manages what: IaaS, PaaS, and SaaS",
      scenario:
        "You review cloud proposals at Lakeside Medical Associates. Classify each product by service model, then do the jobs that stay with the practice: patching the operating system on a rented IaaS server, and controlling who has access in a SaaS app.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: LMA,
        web: {
          "training.lakesidemedical.org/cloud-models": {
            title: "Cloud service models worksheet",
            site: "Lakeside Training",
            color: "#0f766e",
            blocks: [
              { t: "h1", text: "Classify each product" },
              { t: "p", text: "IaaS: you rent servers and manage the OS. PaaS: you build apps on a managed platform. SaaS: you use a finished app in the browser." },
              {
                t: "form",
                id: "models",
                title: "Service model worksheet",
                fields: [
                  { name: "docs", label: "Google Docs", type: "select", options: ["Choose", "IaaS", "PaaS", "SaaS"] },
                  { name: "ec2", label: "Amazon EC2", type: "select", options: ["Choose", "IaaS", "PaaS", "SaaS"] },
                  { name: "appsvc", label: "Azure App Service", type: "select", options: ["Choose", "IaaS", "PaaS", "SaaS"] },
                  { name: "m365", label: "Microsoft 365", type: "select", options: ["Choose", "IaaS", "PaaS", "SaaS"] },
                ],
                submit: "Submit worksheet",
                toast: "Worksheet submitted.",
              },
            ],
          },
          "portal.contoso-cloud.com/vms": {
            title: "Virtual machines | Contoso Cloud",
            site: "Contoso Cloud portal",
            color: "#1e293b",
            nav: [{ text: "Virtual machines", href: "portal.contoso-cloud.com/vms" }, { text: "App services", href: "portal.contoso-cloud.com/apps" }],
            blocks: [
              { t: "h1", text: "Virtual machines (IaaS)" },
              { t: "table", head: ["Name", "Operating system", "Status"], rows: [["lma-files-01", "Windows Server 2022", "Running"]] },
              { t: "alert", tone: "warn", text: "lma-files-01: 3 operating system updates are available. With IaaS, patching the OS is the customer's job." },
              { t: "button", id: "vm-patch", text: "Install OS updates on lma-files-01", toast: "Updates installed on lma-files-01. The server will restart at 2:00 AM." },
            ],
          },
          "portal.contoso-cloud.com/apps": {
            title: "App services | Contoso Cloud",
            site: "Contoso Cloud portal",
            color: "#1e293b",
            nav: [{ text: "Virtual machines", href: "portal.contoso-cloud.com/vms" }, { text: "App services", href: "portal.contoso-cloud.com/apps" }],
            blocks: [{ t: "h1", text: "App services (PaaS)" }, { t: "p", text: "Platform updates for the runtime and OS are applied by Contoso Cloud. You manage your code and data." }],
          },
          "admin.contososcheduler.com/users": {
            title: "Users | Contoso Scheduler Admin",
            site: "Contoso Scheduler Admin",
            color: "#5b3fa8",
            blocks: [
              { t: "h1", text: "Users (SaaS)" },
              { t: "p", text: "The vendor runs the app. Your practice still decides who can sign in." },
              { t: "table", head: ["Name", "Role", "Status"], rows: [["Dana Brooks", "Front desk", "Active"], ["Priya Shah", "Manager", "Active"], ["Morgan Ellis", "Front desk (left in August)", "Active"]] },
              { t: "button", id: "remove-mellis", text: "Remove Morgan Ellis", style: "danger", toast: "Morgan Ellis no longer has access." },
              { t: "toggle", id: "saas-mfa", label: "Require multi-factor authentication for all users", on: false },
            ],
          },
        },
        fs: pc({ documents: [D("Vendor Proposals")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Open the worksheet at \"training.lakesidemedical.org/cloud-models\".",
          hint: "Type the address in Edge's address bar and press Enter.",
          steps: [cmd("edge.nav", "training.lakesidemedical.org/cloud-models")],
        },
        {
          instruction: "Classify Google Docs, Amazon EC2, Azure App Service, and Microsoft 365, then submit the worksheet.",
          hint: "Google Docs and Microsoft 365 are finished apps (SaaS), EC2 rents servers (IaaS), App Service hosts your code on a managed platform (PaaS). Then Submit worksheet.",
          steps: [form("models", "Google Docs: SaaS | Amazon EC2: IaaS | Azure App Service: PaaS | Microsoft 365: SaaS")],
        },
        {
          instruction: "Go to \"portal.contoso-cloud.com/vms\" and install the OS updates on the lma-files-01 server.",
          hint: "Type the address, press Enter, then select Install OS updates on lma-files-01.",
          steps: [cmd("edge.nav", "portal.contoso-cloud.com/vms"), click("vm-patch")],
        },
        {
          instruction: "In the scheduling app's admin page at \"admin.contososcheduler.com/users\", remove former employee Morgan Ellis.",
          hint: "Type the address, press Enter, then select Remove Morgan Ellis.",
          steps: [cmd("edge.nav", "admin.contososcheduler.com/users"), click("remove-mellis")],
        },
        {
          instruction: "Turn on \"Require multi-factor authentication for all users\".",
          hint: "On the same page, switch the toggle on.",
          steps: [cmd("web.set", "saas-mfa=on")],
        },
      ],
    },
  ],

  /* ===================== Module 3: Windows & File Management ===================== */
  "module-3::navigating-windows": [
    {
      id: "win-mo-m3-navigating-windows-1",
      app: "windows",
      title: "Snap windows and use virtual desktops",
      scenario:
        "At the Lakeside Medical front desk you move between Outlook, the EHR in Edge, and a spreadsheet all day. Set up snapping and a second desktop so switching costs nothing, then lock up when you step away.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: LMA,
        web: { "ehr.lakesidemedical.org": { title: "Lakeside EHR | Schedule", site: "Lakeside EHR", color: "#0f766e", blocks: [{ t: "h1", text: "Today's schedule" }, { t: "table", head: ["Time", "Patient", "Provider"], rows: [["9:00 AM", "Appointment 1", "Dr. Patel"], ["9:30 AM", "Appointment 2", "Dr. Kim"]] }] } },
        fs: pc({ documents: [F("Daily Schedule.xlsx")] }),
        windows: [
          { id: "excel", app: "excel", file: "Documents/Daily Schedule.xlsx" },
          { id: "edge", app: "edge", tabs: [{ id: "t1", url: "ehr.lakesidemedical.org" }], tab: "t1" },
          { id: "outlook", app: "outlook" },
        ],
        focus: "outlook",
      }),
      tasks: [
        {
          instruction: "Snap Outlook to the left half of the screen.",
          hint: "Hover over Outlook's Maximize button and choose the left box (or ⊞+Left Arrow on the keyboard button).",
          steps: [cmd("win.snap", "outlook:left")],
        },
        {
          instruction: "Snap Microsoft Edge to the right half of the screen.",
          hint: "Select Edge, hover over its Maximize button and choose the right box (or ⊞+Right Arrow).",
          steps: [cmd("win.snap", "edge:right")],
        },
        {
          instruction: "Create a new virtual desktop.",
          hint: "Select Task View on the taskbar › New desktop (or ⊞+Ctrl+D on the keyboard button).",
          steps: [cmd("vd.new")],
        },
        {
          instruction: "On the new desktop, open Excel.",
          hint: "Select Excel on the taskbar. It moves to the desktop you are on.",
          steps: [cmd("win.open", "excel")],
        },
        {
          instruction: "Switch back to Desktop 1.",
          hint: "Task View › Desktop 1 (or ⊞+Ctrl+Left Arrow).",
          steps: [cmd("vd.switch", "1")],
        },
        {
          instruction: "Open Calculator by searching for it from Start.",
          hint: "Select Start, type calc, then press Enter.",
          steps: [cmd("win.open", "calculator")],
        },
        {
          instruction: "Lock the workstation.",
          hint: "⊞+L on the keyboard button (or Start › your name › Lock).",
          steps: [cmd("win.lock")],
        },
      ],
    },
  ],

  "module-3::file-explorer-and-folders": [
    {
      id: "win-mo-m3-file-explorer-and-folders-1",
      app: "windows",
      title: "Fix the shared drive's naming mess",
      scenario:
        "You inherited the shared drive at Lakeside Medical Associates. Names like \"letter final v2\" make files impossible to find, so people save new copies instead. Reorganize the Front Desk folder with year-first dates and clear names.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: LMA,
        fs: pc({
          network: {
            name: "Shared Drive (S:)",
            items: [
              D("Front Desk", [
                F("letter final v2.docx", "9/1/2026 3:20 PM", "34 KB"),
                F("letter FINAL USE THIS.docx", "9/2/2026 9:05 AM", "34 KB"),
                F("Copy of intake form.docx", "8/14/2026 11:30 AM", "48 KB"),
                F("notes 9-1-26.docx", "9/1/2026 5:10 PM", "19 KB"),
                F("2026-08-15_Policy-Manual_v4-approved.pdf", "8/15/2026 10:00 AM", "1.6 MB"),
              ]),
              D("Billing"),
            ],
          },
        }),
        windows: [{ id: "explorer", app: "explorer", loc: "Shared Drive (S:)/Front Desk", view: "large", sort: "date", dir: "desc" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "Switch the view to Details and sort by Name.",
          hint: "View › Details, then Sort › Name (or click the Name column heading).",
          steps: [cmd("explorer.view", "Details"), cmd("explorer.sort", "Name")],
        },
        {
          instruction: "Create a folder named \"Templates\" in the Front Desk folder.",
          hint: "New › Folder, type Templates, press Enter.",
          steps: newFolder("Shared Drive (S:)/Front Desk", "Templates"),
        },
        {
          instruction: "Rename \"Copy of intake form\" to \"Intake-Form_Template_v3\", then move it into Templates.",
          hint: "Select the file › Rename (F2), type the name, press Enter. Then drag it onto Templates (or Cut and Paste).",
          steps: [ren("Shared Drive (S:)/Front Desk/Copy of intake form.docx", "Intake-Form_Template_v3.docx"), mv("Shared Drive (S:)/Front Desk/Intake-Form_Template_v3.docx", "Shared Drive (S:)/Front Desk/Templates", "Select Intake-Form_Template_v3 first.")],
        },
        {
          instruction: "Rename \"notes 9-1-26\" to \"2026-09-01_Staff-Meeting-Notes\".",
          hint: "Select the file › Rename (F2), type the name, press Enter.",
          steps: [ren("Shared Drive (S:)/Front Desk/notes 9-1-26.docx", "2026-09-01_Staff-Meeting-Notes.docx")],
        },
        {
          instruction: "Rename \"letter final v2\" to \"2026-09-01_Insurance-Appeal_Ramirez_v2\".",
          hint: "Select the file › Rename (F2), type the name, press Enter.",
          steps: [ren("Shared Drive (S:)/Front Desk/letter final v2.docx", "2026-09-01_Insurance-Appeal_Ramirez_v2.docx")],
        },
        {
          instruction: "Delete the duplicate \"letter FINAL USE THIS\".",
          hint: "Select it and press Delete. Files on a network drive are deleted permanently, so choose Yes to confirm.",
          steps: [onSel(cmd("fs.delete"), "file:Shared Drive (S:)/Front Desk/letter FINAL USE THIS.docx", "Select letter FINAL USE THIS first.")],
        },
        {
          instruction: "Pin the Templates folder to Quick access.",
          hint: "Right-click Templates › Pin to Quick access.",
          steps: [onSel(cmd("fs.pinQuick"), "file:Shared Drive (S:)/Front Desk/Templates", "Select the Templates folder first.")],
        },
      ],
    },
  ],

  /* ===================== Module 4: SaaS in Action & Document Sharing ===================== */
  "module-4::google-cloud-applications": [
    {
      id: "win-mo-m4-google-cloud-applications-1",
      app: "windows",
      title: "Organize Google Drive and recover an earlier version",
      scenario:
        "You work across two Lakeside Medical locations, so your working documents live in the practice's Google Workspace Drive instead of being emailed back and forth. Organize the Drive, then use version history to recover the staff meeting notes someone overwrote.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: LMA,
        fs: pc({
          gdrive: [
            F("Staff Meeting Notes", "10/20/2026 9:12 AM", "12 KB", {
              text: "Staff meeting notes\n(Notes deleted by mistake.)",
              versions: [
                { label: "October 20, 9:12 AM", by: "Dana Brooks" },
                { label: "October 14, 3:40 PM", by: "Priya Shah", text: "Staff meeting notes, October 14\nFlu clinic moves to Saturday mornings.\nNew phone script starts Monday." },
                { label: "September 28, 2:15 PM", by: "Priya Shah", text: "Staff meeting notes, September 28\n1. Front desk coverage for the second location.\n2. Holiday schedule draft is due October 1.\n3. Badge readers go live October 5." },
              ],
            }),
            F("Supply Order Form", "10/18/2026 11:45 AM", "9 KB", { text: "Supply order form\nItem, quantity, cost center" }),
            F("Second Location Opening Plan", "10/10/2026 4:30 PM", "21 KB", { text: "Second location opening plan" }),
            D("Templates", [F("Fax Cover Sheet", "6/3/2026 10:00 AM", "6 KB")]),
          ],
        }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "drive.google.com" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "In My Drive, create a folder named \"2026 Admin\".",
          hint: "Select + New › New folder, type 2026 Admin, then Create.",
          steps: newFolder("Google Drive", "2026 Admin"),
        },
        {
          instruction: "Move \"Supply Order Form\" into the 2026 Admin folder.",
          hint: "Right-click Supply Order Form › Move, choose 2026 Admin, then Move here (or drag the file onto the folder).",
          steps: [mv("Google Drive/Supply Order Form", "Google Drive/2026 Admin", "Select Supply Order Form first.")],
        },
        {
          instruction: "Open \"Staff Meeting Notes\".",
          hint: "Double-click Staff Meeting Notes (or select its name).",
          steps: [cmd("cloud.open", "Google Drive/Staff Meeting Notes")],
        },
        {
          instruction: "Restore the September 28, 2:15 PM version from version history.",
          hint: "File › Version history › See version history (or the clock icon), select September 28, 2:15 PM, then Restore this version.",
          steps: [onSel(cmd("cloud.restore", "September 28, 2:15 PM"), "file:Google Drive/Staff Meeting Notes", "Open Staff Meeting Notes first.")],
        },
        {
          instruction: "Rename the document to \"2026-09-28_Staff-Meeting-Notes\".",
          hint: "Select the document title at the top left, type the new name, press Enter.",
          steps: [ren("Google Drive/Staff Meeting Notes", "2026-09-28_Staff-Meeting-Notes")],
        },
        {
          instruction: "Go back to My Drive, open the 2026 Admin folder, and create a new Google Docs document there.",
          hint: "Select Back (or My Drive), double-click 2026 Admin, then + New › Google Docs.",
          steps: [cmd("fs.newFile", "Google Drive/2026 Admin/Untitled document")],
        },
      ],
    },
  ],

  "module-4::document-creation-and-sharing": [
    {
      id: "win-mo-m4-document-creation-and-sharing-1",
      app: "windows",
      title: "Share the draft policy safely",
      scenario:
        "You manage shared documents at Lakeside Medical Associates. Months ago someone shared the draft privacy policy as \"anyone with the link can edit\" for a contractor who has since left. Share it the right way for this review round, then close the old access.",
      fileName: "Windows",
      minutes: 7,
      initial: winDoc({
        user: LMA,
        fs: pc({
          gdrive: [
            F("Draft Privacy Policy", "10/19/2026 2:30 PM", "18 KB", {
              link: "anyone:edit",
              shared: [{ email: "contractor@quickdocs-services.com", perm: "edit" }],
              text: "Draft privacy policy\nPatients may request a copy of their records [[s1]].\nRequests are answered in writing[[s2]].",
              suggestions: [
                { id: "s1", by: "Priya Shah", text: "within 30 days" },
                { id: "s2", by: "Luis Ortega", text: " or by fax to any number the patient gives" },
              ],
            }),
            F("Front Desk Phone Script", "10/1/2026 9:00 AM", "9 KB"),
            D("Policies"),
          ],
        }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "drive.google.com" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Share \"Draft Privacy Policy\" with priya.shah@lakesidemedical.org as a Commenter.",
          hint: "Select the file › Share (or right-click › Share), type the email, set the role to Commenter, then Send.",
          steps: [onSel(cmd("share.send", "priya.shah@lakesidemedical.org:comment"), "file:Google Drive/Draft Privacy Policy", "Open the Share window for Draft Privacy Policy first.")],
        },
        {
          instruction: "Share it with luis.ortega@lakesidemedical.org as a Commenter too.",
          hint: "In the Share window, type the email, set Commenter, then Send.",
          steps: [onSel(cmd("share.send", "luis.ortega@lakesidemedical.org:comment"), "file:Google Drive/Draft Privacy Policy", "Open the Share window for Draft Privacy Policy first.")],
        },
        {
          instruction: "Give the outside consultant, r.adams@complianceworks.com, Viewer access.",
          hint: "Type the email, keep the role as Viewer, then Send.",
          steps: [onSel(cmd("share.send", "r.adams@complianceworks.com:view"), "file:Google Drive/Draft Privacy Policy", "Open the Share window for Draft Privacy Policy first.")],
        },
        {
          instruction: "Make the consultant's access expire in 30 days.",
          hint: "In People with access, open r.adams@complianceworks.com's role list › Add expiration › 30 days.",
          steps: [onSel(cmd("share.expire", "r.adams@complianceworks.com:30 days"), "file:Google Drive/Draft Privacy Policy", "Open the Share window for Draft Privacy Policy first.")],
        },
        {
          instruction: "Remove the old contractor's access (contractor@quickdocs-services.com).",
          hint: "In People with access, open the contractor's role list › Remove access.",
          steps: [onSel(cmd("share.remove", "contractor@quickdocs-services.com"), "file:Google Drive/Draft Privacy Policy", "Open the Share window for Draft Privacy Policy first.")],
        },
        {
          instruction: "Change General access from \"Anyone with the link\" to \"Restricted\".",
          hint: "Under General access, change Anyone with the link to Restricted.",
          steps: [onSel(cmd("share.general", "restricted"), "file:Google Drive/Draft Privacy Policy", "Open the Share window for Draft Privacy Policy first.")],
        },
        {
          instruction: "Open the document, accept Priya's suggestion, and reject Luis's.",
          hint: "Close the Share window, open Draft Privacy Policy, then select the check mark on Priya's suggestion and the X on Luis's.",
          anyOrder: true,
          steps: [
            onSel(cmd("doc.accept", "s1"), "file:Google Drive/Draft Privacy Policy", "Open Draft Privacy Policy first."),
            onSel(cmd("doc.reject", "s2"), "file:Google Drive/Draft Privacy Policy", "Open Draft Privacy Policy first."),
          ],
        },
      ],
    },
  ],

  /* ===================== Module 5: The Internet & Networking ===================== */
  "module-5::understanding-the-internet": [
    {
      id: "win-mo-m5-understanding-the-internet-1",
      app: "windows",
      title: "Diagnose \"the internet is down\"",
      scenario:
        "A Lakeside colleague says the internet is down: the EHR won't load, but Outlook still receives mail. Walk the request steps (DNS lookup, connection, request) with Command Prompt and Edge to find which one is failing, then check the vendor's status page.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: LMA,
        net: { type: "ethernet", ip: "192.168.1.42", gateway: "192.168.1.1", dns: "192.168.1.1", nxdomain: ["ehr.lakesidemedical.org"], hosts: { "status.contosohealth.com": "198.51.100.77" } },
        web: {
          "203.0.113.50": {
            title: "Lakeside EHR | Sign in",
            site: "Lakeside EHR",
            color: "#0f766e",
            blocks: [{ t: "h1", text: "Sign in" }, { t: "p", text: "The EHR server is up. Reaching it by IP address works, so the problem is the name lookup (DNS)." }],
          },
          "status.contosohealth.com": {
            title: "Contoso Health Status",
            site: "Contoso Health",
            color: "#334155",
            blocks: [
              { t: "h1", text: "System status" },
              { t: "table", head: ["Service", "Status"], rows: [["EHR application servers", "Operational"], ["DNS for customer domains", "Degraded: some names not resolving"], ["E-prescribing", "Operational"]] },
              { t: "alert", tone: "warn", text: "We are investigating DNS issues affecting customer domains. Workaround: use the IP address your IT team provided." },
            ],
          },
        },
        fs: pc({ documents: [D("Front Desk")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "ehr.lakesidemedical.org" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Open Command Prompt and ping google.com to show the internet connection itself works.",
          hint: "Search › cmd › Command Prompt, then type ping google.com and press Enter.",
          steps: [cmd("cmd.run", "ping google.com")],
        },
        {
          instruction: "Run \"nslookup ehr.lakesidemedical.org\" to test the DNS lookup for the EHR.",
          hint: "Type nslookup ehr.lakesidemedical.org and press Enter. Non-existent domain means DNS can't find it.",
          steps: [cmd("cmd.run", "nslookup ehr.lakesidemedical.org")],
        },
        {
          instruction: "Run \"tracert google.com\" and look for the hop with the largest delay.",
          hint: "Type tracert google.com and press Enter.",
          steps: [cmd("cmd.run", "tracert google.com")],
        },
        {
          instruction: "Run \"ipconfig /all\" to find this PC's DNS server.",
          hint: "Type ipconfig /all and press Enter. Look for DNS Servers.",
          steps: [{ action: { kind: "command", id: "cmd.run", value: ["ipconfig /all", "ipconfig/all"] } }],
        },
        {
          instruction: "In Edge, try the EHR by its IP address, 203.0.113.50.",
          hint: "Click the address bar, type 203.0.113.50 and press Enter.",
          steps: [cmd("edge.nav", "203.0.113.50")],
        },
        {
          instruction: "Check the vendor's status page at \"status.contosohealth.com\".",
          hint: "Type status.contosohealth.com in the address bar and press Enter.",
          steps: [cmd("edge.nav", "status.contosohealth.com")],
        },
      ],
    },
  ],

  "module-5::lan-wan-and-networking": [
    {
      id: "win-mo-m5-lan-wan-and-networking-1",
      app: "windows",
      title: "Connect the second office to the main office",
      scenario:
        "Lakeside Medical Associates has two offices. Each has its own LAN, and the two share systems over the internet through a VPN. From the second location, check your LAN connection, show that the main office server can't be reached until the VPN is up, then connect and confirm.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: LMA,
        net: { type: "ethernet", ip: "192.168.20.31", gateway: "192.168.20.1", dns: "192.168.20.1", publicIp: "198.51.100.140", vpns: [{ name: "Lakeside Main Office", server: "vpn.lakesidemedical.org" }], hosts: { "files.lakeside.local": "10.20.0.15" } },
        web: {
          "192.168.20.1": {
            title: "Contoso Router | Status",
            secure: false,
            site: "Contoso Router (Second location)",
            color: "#334155",
            blocks: [
              { t: "h1", text: "Status" },
              { t: "h2", text: "LAN (inside this office)" },
              { t: "table", head: ["Setting", "Value"], rows: [["Router address", "192.168.20.1"], ["Connected devices", "11 wired, 6 wireless"], ["Link speed", "1 Gbps"]] },
              { t: "h2", text: "WAN (internet)" },
              { t: "table", head: ["Setting", "Value"], rows: [["Status", "Connected"], ["Public IP address", "198.51.100.140"], ["Service", "Business fiber, 300 Mbps"], ["VPN tunnel to main office", "Client VPN only"]] },
            ],
          },
        },
        fs: pc({ documents: [D("Front Desk")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open the Ethernet page in Settings and check the link speed.",
          hint: "Start › Settings › Network & internet › Ethernet. Link speed is near the bottom.",
          steps: [cmd("settings.nav", "network/ethernet")],
        },
        {
          instruction: "Open Command Prompt and run ipconfig to see your LAN IP address and default gateway.",
          hint: "Search › cmd › Command Prompt, type ipconfig and press Enter.",
          steps: [cmd("cmd.run", "ipconfig")],
        },
        {
          instruction: "Ping the main office file server at 10.20.0.15.",
          hint: "Type ping 10.20.0.15 and press Enter. Timeouts mean there is no path to the other office yet.",
          steps: [cmd("cmd.run", "ping 10.20.0.15")],
        },
        {
          instruction: "Connect the \"Lakeside Main Office\" VPN.",
          hint: "Settings › Network & internet › VPN › Connect next to Lakeside Main Office.",
          steps: [cmd("net.vpn", "Lakeside Main Office")],
        },
        {
          instruction: "Ping 10.20.0.15 again to confirm the main office server now responds.",
          hint: "Switch to Command Prompt, type ping 10.20.0.15 and press Enter (or press the Up Arrow to reuse it).",
          steps: [cmd("cmd.run", "ping 10.20.0.15")],
        },
        {
          instruction: "Open the router's status page at 192.168.20.1 to compare the LAN and WAN sections.",
          hint: "Open Edge, type 192.168.20.1 and press Enter.",
          steps: [cmd("edge.nav", "192.168.20.1")],
        },
      ],
    },
  ],
};
