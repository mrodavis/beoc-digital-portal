import type { SimDefinition, SimStep } from "@/types/sim";
import { winDoc, type WebPage, type WinItem, type WinRoot } from "@/components/sim/apps/windows/types";
import { teamsDoc } from "@/components/sim/apps/teams/types";

/**
 * Challenge Labs (role: "challenge") for Tech Foundations, keyed "module-N::lesson-slug".
 * See docs/SIMULATIONS.md, Challenge Labs. Each lab mirrors its lesson's Challenge, step
 * by step, for students on locked-down school computers. The house scenario is the front
 * desk at Lakeside Medical Associates (fictional).
 */

/* ------------------------------------------------------------------ */
/* Helpers (plain JSON builders)                                       */
/* ------------------------------------------------------------------ */

const F = (name: string, modified = "10/14/2026 10:12 AM", size = "24 KB", extra: Partial<WinItem> = {}): WinItem => ({ name, modified, size, ...extra });
const D = (name: string, children: WinItem[] = [], extra: Partial<WinItem> = {}): WinItem => ({ name, folder: true, children, modified: "10/12/2026 9:05 AM", ...extra });

function pc(o: { desktop?: WinItem[]; documents?: WinItem[]; pictures?: WinItem[]; downloads?: WinItem[] }): WinRoot[] {
  return [
    { name: "Desktop", root: "desktop", folder: true, children: o.desktop ?? [{ name: "Microsoft Edge", app: "edge" }] },
    { name: "Documents", root: "documents", folder: true, children: o.documents ?? [] },
    { name: "Downloads", root: "downloads", folder: true, children: o.downloads ?? [] },
    { name: "Pictures", root: "pictures", folder: true, children: o.pictures ?? [D("Screenshots")] },
    { name: "Music", root: "music", folder: true, children: [] },
    { name: "Videos", root: "videos", folder: true, children: [] },
    { name: "Local Disk (C:)", root: "drive", folder: true, capacity: "476 GB", free: "289 GB", children: [D("Program Files"), D("Users"), D("Windows")] },
  ];
}

const USER = { name: "Maya Torres", email: "maya.torres@lakesidemedical.example" };

const cmd = (id: string, value?: string): SimStep => ({ action: { kind: "command", id, ...(value !== undefined ? { value } : {}) } });
const set = (kv: string): SimStep => cmd("settings.set", kv);
const onSel = (step: SimStep, selection: string, selectHint: string): SimStep => ({ ...step, requires: { selection }, selectHint });
const newFolder = (parent: string, name: string): SimStep[] => [cmd("fs.newFolder", parent), { action: { kind: "type", target: `${parent}/New folder`, value: name } }];
const newFile = (parent: string, blank: string, name: string): SimStep[] => [cmd("fs.newFile", `${parent}/${blank}`), { action: { kind: "type", target: `${parent}/${blank}`, value: name } }];
const ren = (path: string, value: string): SimStep => ({ action: { kind: "type", target: path, value } });
const mv = (src: string, dest: string, hint: string): SimStep => onSel(cmd("fs.move", dest), `file:${src}`, hint);
const cp = (src: string, dest: string, hint: string): SimStep => onSel(cmd("fs.copyTo", dest), `file:${src}`, hint);
/** Notepad saved text that contains every one of `values`. */
const note = (path: string, ...values: string[]): SimStep => ({ action: { kind: "type", target: `notepad:${path}`, value: values.length === 1 ? values[0] : values, match: values.length === 1 ? "includes" : "all" } });

/** The practice drive from Module 2 (Lakeside Medical Practice Drive). */
const DRIVE = "Documents/Lakeside Medical Practice Drive";

const page = (title: string, site: string, color: string, blocks: WebPage["blocks"], extra: Partial<WebPage> = {}): WebPage => ({ title, site, color, blocks, ...extra });

/* ------------------------------------------------------------------ */
/* Labs                                                                */
/* ------------------------------------------------------------------ */

export const labsWindowsSims: Record<string, SimDefinition[]> = {
  /* ============================ Module 1 ============================ */
  "module-1::hardware-basics": [
    {
      id: "tf-m1-hardware-basics-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Gather the front desk computer's specifications",
      scenario:
        "The IT vendor for Lakeside Medical Associates is replacing the slow front desk computer and needs its specifications. Find them in Task Manager and Settings, record each one in Workstation Summary.txt (already open in Notepad), then see which program uses the most memory.",
      fileName: "Windows",
      minutes: 8,
      initial: winDoc({
        user: USER,
        specs: {
          deviceName: "LMA-FRONTDESK-01",
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
          installedOn: "6/3/2024",
        },
        fs: pc({
          documents: [
            F("Workstation Summary.txt", "10/20/2026 9:02 AM", "1 KB", { text: "Front desk workstation summary\nCPU: \nRAM: \nStorage type: \nWindows version: \nApp using the most memory: \n" }),
            D("Front Desk"),
          ],
        }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Workstation Summary.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Open Task Manager and go to the Performance page.",
          hint: "Right-click the Start button (or an empty part of the taskbar) › Task Manager. Then select Performance on the left. Shortcut: Ctrl+Shift+Esc on the keyboard button in the taskbar.",
          steps: [cmd("win.open", "taskmgr"), cmd("taskmgr.tab", "performance")],
        },
        {
          instruction: "Look at the Memory page, then the Disk 0 (C:) page, to see the total RAM and the type of drive.",
          hint: "On the Performance page, select Memory, then Disk 0 (C:). The drive type (SSD or HDD) shows under Disk 0 (C:) and on the Type line.",
          steps: [cmd("taskmgr.perf", "memory"), cmd("taskmgr.perf", "disk")],
        },
        {
          instruction: "In Workstation Summary.txt, type the processor's model number after \"CPU:\" (Task Manager shows it on the CPU page), then save the file.",
          hint: "Select CPU in Task Manager. The model is in the top right, for example Intel Core i5-... . Switch to Notepad, click after CPU:, type the model, then press Ctrl+S.",
          steps: [note("Documents/Workstation Summary.txt", "i5-8500")],
        },
        {
          instruction: "Type the total RAM after \"RAM:\" and the drive type (SSD or HDD) after \"Storage type:\", then save.",
          hint: "Memory shows the total in GB; Disk 0 (C:) shows SSD or HDD. Type them in Notepad and press Ctrl+S.",
          steps: [note("Documents/Workstation Summary.txt", "RAM: 8", "Storage type: HDD")],
        },
        {
          instruction: "Open the About page in Settings to check the processor and installed RAM against Task Manager.",
          hint: "Start › Settings › System › About (or right-click Start › System).",
          steps: [cmd("settings.nav", "system/about")],
        },
        {
          instruction: "Type the Windows version shown under Windows specifications after \"Windows version:\", then save.",
          hint: "On the About page, find Windows specifications › Version (for example 23H2 or 24H2). Type it in Notepad and press Ctrl+S.",
          steps: [note("Documents/Workstation Summary.txt", "24H2")],
        },
        {
          instruction: "Open Word and Microsoft Edge so that three programs (with Notepad) are running.",
          hint: "Select Word and Microsoft Edge on the taskbar (or find them in Start).",
          anyOrder: true,
          steps: [cmd("win.open", "word"), cmd("win.open", "edge")],
        },
        {
          instruction: "In Task Manager, show the Processes page.",
          hint: "Switch to Task Manager (taskbar or Alt+Tab) and select Processes on the left. Select the Memory column heading to sort by memory use.",
          steps: [cmd("taskmgr.tab", "processes")],
        },
        {
          instruction: "Type the name of the app that uses the most memory after \"App using the most memory:\", then save.",
          hint: "Sort the Processes page by Memory (select the Memory heading). The top app in the Apps group uses the most. Type its name in Notepad and press Ctrl+S.",
          steps: [note("Documents/Workstation Summary.txt", "Edge")],
        },
      ],
    },
  ],

  "module-1::navigating-windows": [
    {
      id: "tf-m1-navigating-windows-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Navigate Windows like a front desk pro",
      scenario:
        "It is your first morning at the Lakeside Medical Associates front desk. Open the programs you will use all day, switch and arrange their windows, check the default printer, make a folder for your practice files, and pin the apps you use most.",
      fileName: "Windows",
      minutes: 7,
      initial: winDoc({
        user: USER,
        printers: [
          { name: "Front Desk Printer", kind: "mfp", status: "Idle", default: true },
          { name: "Billing Office Printer", kind: "printer", status: "Idle" },
        ],
        fs: pc({ documents: [D("Front Desk", [F("Phone List.docx")]), F("Welcome Packet.pdf", "10/19/2026 4:30 PM", "1.4 MB")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open Outlook, Word, Microsoft Edge, and File Explorer.",
          hint: "Select each one on the taskbar. You can also open them from Start.",
          anyOrder: true,
          steps: [cmd("win.open", "outlook"), cmd("win.open", "word"), cmd("win.open", "edge"), cmd("win.open", "explorer")],
        },
        {
          instruction: "Use Alt+Tab to switch to each of the four windows at least once.",
          hint: "Open the keyboard button on the taskbar and select Alt+Tab (Switch windows). Select it again to move to the next window; the switcher picks the highlighted window when you stop. Selecting a window on the taskbar also switches to it.",
          anyOrder: true,
          steps: [cmd("win.focus", "outlook"), cmd("win.focus", "word"), cmd("win.focus", "edge"), cmd("win.focus", "explorer")],
        },
        {
          instruction: "Snap File Explorer to the left half of the screen and Word to the right half.",
          hint: "Hover over a window's Maximize button and pick a half in the snap layout (or drag the title bar to the screen edge, or use Windows key + Left/Right arrow on the keyboard button).",
          anyOrder: true,
          steps: [cmd("win.snap", "explorer:left"), cmd("win.snap", "word:right")],
        },
        {
          instruction: "Use Search on the taskbar to find and open the Printers & scanners settings.",
          hint: "Select Search on the taskbar, type printer, then select Printers & scanners.",
          steps: [cmd("settings.nav", "bluetooth/printers")],
        },
        {
          instruction: "Open the settings page of the printer marked Default to confirm it, then close Settings.",
          hint: "In Printers & scanners, the default printer says Default under its name. Select it, then close the Settings window with the X.",
          steps: [cmd("settings.nav", "bluetooth/printers/Front Desk Printer"), cmd("win.close", "settings")],
        },
        {
          instruction: "In File Explorer, open Documents and create a folder named \"Lakeside Medical - Practice Files\".",
          hint: "Select Documents in the navigation pane, then New › Folder (or right-click › New › Folder). Type the name and press Enter.",
          steps: newFolder("Documents", "Lakeside Medical - Practice Files"),
        },
        {
          instruction: "Pin Notepad, Calculator, and Snipping Tool to the taskbar.",
          hint: "Start › All › right-click the app › More › Pin to taskbar (or search for it, right-click, Pin to taskbar). Right-click its taskbar button afterward: the menu now says Unpin from taskbar.",
          anyOrder: true,
          steps: [cmd("taskbar.pin", "notepad"), cmd("taskbar.pin", "calculator"), cmd("taskbar.pin", "snip")],
        },
      ],
    },
  ],

  "module-1::managing-programs": [
    {
      id: "tf-m1-managing-programs-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Check the programs on a workstation",
      scenario:
        "Your supervisor at Lakeside Medical Associates asked for a quick health check of the front desk computer. Look through the installed apps and startup apps, check Windows Update, and see how much memory Word uses. Record each finding in Program Check.txt. Do not uninstall or disable anything.",
      fileName: "Windows",
      minutes: 8,
      initial: winDoc({
        user: USER,
        apps: [{ name: "Fabrikam Coupon Assistant", publisher: "Fabrikam Inc.", version: "2.4.1", size: "48.6 MB", installed: "9/28/2026" }],
        startup: [{ name: "Fabrikam Coupon Assistant", publisher: "Fabrikam Inc.", on: true, impact: "High" }],
        updates: [{ name: "2026-10 Cumulative Update for Windows 11 Version 24H2 for x64-based Systems (KB5066835)", kind: "Security" }],
        fs: pc({
          documents: [
            F("Program Check.txt", "10/20/2026 9:05 AM", "1 KB", { text: "Workstation program check\nProgram I don't recognize: \nStartup apps enabled: \nWindows Update status: \nWord memory use: \n" }),
            F("Patient Reminder Letter.docx", "10/19/2026 3:40 PM", "28 KB", { text: "Lakeside Medical Associates\nAppointment reminder\nThis letter is a reminder of your upcoming appointment." }),
          ],
        }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Program Check.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Open the list of installed apps in Settings.",
          hint: "Start › Settings › Apps › Installed apps (or right-click Start › Installed apps).",
          steps: [cmd("settings.nav", "apps/installed")],
        },
        {
          instruction: "Find the one app in the list that is not published by Microsoft. Type its name after \"Program I don't recognize:\" in Program Check.txt and save. Do not uninstall it.",
          hint: "Each app shows its version and publisher under its name. Look for a publisher other than Microsoft Corporation. Type the app name in Notepad and press Ctrl+S.",
          steps: [note("Documents/Program Check.txt", "Fabrikam")],
        },
        {
          instruction: "Open Task Manager and go to the Startup apps page.",
          hint: "Right-click the Start button › Task Manager › Startup apps.",
          steps: [cmd("win.open", "taskmgr"), cmd("taskmgr.tab", "startup")],
        },
        {
          instruction: "Count the startup apps whose status is Enabled. Type the number after \"Startup apps enabled:\" and save. Do not disable any.",
          hint: "Read the Status column on the Startup apps page. Type the count in Notepad and press Ctrl+S.",
          steps: [note("Documents/Program Check.txt", "Startup apps enabled: 4")],
        },
        {
          instruction: "Open Windows Update in Settings and check for updates.",
          hint: "Start › Settings › Windows Update › Check for updates.",
          steps: [cmd("update.check")],
        },
        {
          instruction: "Type the status shown at the top of the Windows Update page after \"Windows Update status:\" and save.",
          hint: "The heading at the top of Windows Update says the status, for example You're up to date. Type it in Notepad and press Ctrl+S.",
          steps: [note("Documents/Program Check.txt", "Updates available")],
        },
        {
          instruction: "Open \"Patient Reminder Letter\" from Documents and save it.",
          hint: "In File Explorer, open Documents and double-click Patient Reminder Letter. In Word, press Ctrl+S (or select Save at the top left).",
          steps: [cmd("office.save", "Documents/Patient Reminder Letter.docx")],
        },
        {
          instruction: "With Word still open, find Word on Task Manager's Processes page. Type its Memory value after \"Word memory use:\" and save.",
          hint: "Switch to Task Manager › Processes. Read the Memory column on the Word row (for example 150.2 MB). Type it in Notepad and press Ctrl+S.",
          steps: [note("Documents/Program Check.txt", "186.9")],
        },
      ],
    },
  ],

  "module-1::system-settings": [
    {
      id: "tf-m1-system-settings-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Set up a comfortable, up-to-date workstation",
      scenario:
        "You share the reception workstation at Lakeside Medical Associates. Make the screen easier to read, set up the headset you use for patient calls and test its microphone, enlarge the text, and handle the waiting Windows updates the way your supervisor asked: install now, restart after clinic hours.",
      fileName: "Windows",
      minutes: 7,
      initial: winDoc({
        user: USER,
        devices: [
          { name: "USB Keyboard", kind: "keyboard", connected: true },
          { name: "USB Optical Mouse", kind: "mouse", connected: true },
          { name: "Contoso USB Headset", kind: "headset", connected: true },
        ],
        updates: [
          { name: "2026-10 Cumulative Update for Windows 11 Version 24H2 for x64-based Systems (KB5066835)", kind: "Security" },
          { name: "Intel Corporation - Display - 31.0.101.5594", kind: "Driver" },
        ],
        fs: pc({ documents: [D("Front Desk")] }),
        windows: [{ id: "settings", app: "settings", page: "home" }],
        focus: "settings",
      }),
      tasks: [
        {
          instruction: "Change the display scale to 125%.",
          hint: "Settings › System › Display › Scale & layout › Scale › 125%.",
          steps: [set("display.scale=125%")],
        },
        {
          instruction: "Set the sound output to \"Headphones (Contoso USB Headset)\".",
          hint: "Settings › System › Sound › Output › Headphones (Contoso USB Headset).",
          steps: [set("sound.output=Headphones (Contoso USB Headset)")],
        },
        {
          instruction: "Set the sound input to \"Headset Microphone (Contoso USB Headset)\".",
          hint: "Settings › System › Sound › Input › Headset Microphone (Contoso USB Headset).",
          steps: [set("sound.input=Headset Microphone (Contoso USB Headset)")],
        },
        {
          instruction: "Open the headset microphone's properties and test it: start the test, then stop it.",
          hint: "In Sound › Input, select > at the right of the headset microphone. Under Input settings, select Start test, then Stop test (and Play to hear the sample).",
          steps: [cmd("sound.micTest", "Headset Microphone (Contoso USB Headset)")],
        },
        {
          instruction: "Increase the text size to 110% and apply it.",
          hint: "Settings › Accessibility › Text size. Drag the slider (or click it and press the Right arrow key) to 110%, then select Apply.",
          steps: [set("access.textSize=110%")],
        },
        {
          instruction: "Check for Windows updates.",
          hint: "Settings › Windows Update › Check for updates.",
          steps: [cmd("update.check")],
        },
        {
          instruction: "Your supervisor approved the updates. Download and install them.",
          hint: "Settings › Windows Update › Download & install all.",
          steps: [cmd("update.install")],
        },
        {
          instruction: "Schedule the restart for 6:00 PM today, after clinic hours.",
          hint: "Settings › Windows Update › Schedule the restart. Pick a time: 6:00 PM, Pick a day: Today, then Schedule.",
          steps: [cmd("update.schedule", "Today 6:00 PM")],
        },
      ],
    },
  ],

  /* ============================ Module 2 ============================ */
  "module-2::files-folders-drives": [
    {
      id: "tf-m2-files-folders-drives-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Build the Lakeside Medical Practice Drive",
      scenario:
        "Lakeside Medical Associates wants a practice version of its shared drive so new staff can learn the folder structure. Build it in Documents, then save three blank patient documents in the right monthly folders using the office naming convention LastName_FirstName_DocumentType_YYYY-MM.",
      fileName: "Windows",
      minutes: 8,
      initial: winDoc({
        user: USER,
        fs: pc({ documents: [D("Front Desk", [F("Phone List.docx")]), F("Staff Schedule.xlsx")] }),
        windows: [{ id: "explorer", app: "explorer", loc: "Documents", view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "In Documents, create a folder named \"Lakeside Medical Practice Drive\".",
          hint: "In File Explorer, with Documents open, select New › Folder (or right-click an empty area › New › Folder, or Ctrl+Shift+N). Type the name and press Enter.",
          steps: newFolder("Documents", "Lakeside Medical Practice Drive"),
        },
        {
          instruction: "Inside Lakeside Medical Practice Drive, create four folders: \"Patient Files\", \"Billing\", \"Staff\", and \"Policies\".",
          hint: "Double-click Lakeside Medical Practice Drive to open it. Make each folder with New › Folder, typing its name and pressing Enter before making the next.",
          anyOrder: true,
          steps: [...newFolder(DRIVE, "Patient Files"), ...newFolder(DRIVE, "Billing"), ...newFolder(DRIVE, "Staff"), ...newFolder(DRIVE, "Policies")],
        },
        {
          instruction: "Inside Patient Files, create two folders: \"2025\" and \"2026\".",
          hint: "Open Patient Files, then New › Folder for each one.",
          anyOrder: true,
          steps: [...newFolder(`${DRIVE}/Patient Files`, "2025"), ...newFolder(`${DRIVE}/Patient Files`, "2026")],
        },
        {
          instruction: "Inside 2026, create three folders: \"January\", \"February\", and \"March\".",
          hint: "Open 2026, then New › Folder for each month.",
          anyOrder: true,
          steps: [...newFolder(`${DRIVE}/Patient Files/2026`, "January"), ...newFolder(`${DRIVE}/Patient Files/2026`, "February"), ...newFolder(`${DRIVE}/Patient Files/2026`, "March")],
        },
        {
          instruction: "In January, create a blank Word document named \"Rivera_Ana_Intake_2026-01\".",
          hint: "Open January, then New › Microsoft Word Document (or right-click › New › Microsoft Word Document). Type the name and press Enter.",
          steps: newFile(`${DRIVE}/Patient Files/2026/January`, "New Microsoft Word Document.docx", "Rivera_Ana_Intake_2026-01.docx"),
        },
        {
          instruction: "In February, create a blank Word document named \"Chen_David_Referral_2026-02\".",
          hint: "Open February, then New › Microsoft Word Document. Type the name and press Enter.",
          steps: newFile(`${DRIVE}/Patient Files/2026/February`, "New Microsoft Word Document.docx", "Chen_David_Referral_2026-02.docx"),
        },
        {
          instruction: "In March, create a blank Word document named \"Okafor_Grace_LabResult_2026-03\".",
          hint: "Open March, then New › Microsoft Word Document. Type the name and press Enter.",
          steps: newFile(`${DRIVE}/Patient Files/2026/March`, "New Microsoft Word Document.docx", "Okafor_Grace_LabResult_2026-03.docx"),
        },
      ],
    },
  ],

  "module-2::file-operations": [
    {
      id: "tf-m2-file-operations-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Archive, copy, rename, and delete safely",
      scenario:
        "It is the end of the month at Lakeside Medical Associates. In the practice drive, archive January's billing files, give Billing and Staff their own copy of the supply order template, and clean up a duplicate invoice file without losing anything by accident.",
      fileName: "Windows",
      minutes: 8,
      initial: winDoc({
        user: USER,
        fs: pc({
          documents: [
            D("Lakeside Medical Practice Drive", [
              D("Billing", [
                F("Invoices_2026-01.txt", "1/31/2026 4:55 PM", "12 KB"),
                F("Late_Notices_2026-01.txt", "1/30/2026 2:10 PM", "8 KB"),
                F("Invoices_2026-02.txt", "2/27/2026 5:02 PM", "13 KB"),
                F("Invoices_2026-01 - Copy.txt", "2/3/2026 9:14 AM", "12 KB"),
              ]),
              D("Patient Files", [D("2025"), D("2026", [D("January"), D("February"), D("March")])]),
              D("Policies", [F("Supply_Order_Template.txt", "1/6/2026 11:20 AM", "4 KB")]),
              D("Staff"),
            ]),
          ],
        }),
        windows: [{ id: "explorer", app: "explorer", loc: `${DRIVE}/Billing`, view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "In Billing, create a folder named \"Archive\".",
          hint: "With Billing open, select New › Folder (or right-click an empty area › New › Folder). Type Archive and press Enter.",
          steps: newFolder(`${DRIVE}/Billing`, "Archive"),
        },
        {
          instruction: "Move the two January files, \"Invoices_2026-01\" and \"Late_Notices_2026-01\", into Archive.",
          hint: "Hold Ctrl and click both files, then drag them onto Archive (or Cut with Ctrl+X, open Archive, and Paste with Ctrl+V). They should no longer be in Billing.",
          anyOrder: true,
          steps: [
            mv(`${DRIVE}/Billing/Invoices_2026-01.txt`, `${DRIVE}/Billing/Archive`, "Select the January files in Billing first."),
            mv(`${DRIVE}/Billing/Late_Notices_2026-01.txt`, `${DRIVE}/Billing/Archive`, "Select the January files in Billing first."),
          ],
        },
        {
          instruction: "Copy \"Supply_Order_Template\" from Policies into Billing and into Staff. The original stays in Policies.",
          hint: "Open Policies, select the template, Copy (Ctrl+C). Open Billing and Paste (Ctrl+V), then open Staff and Paste again.",
          anyOrder: true,
          steps: [
            cp(`${DRIVE}/Policies/Supply_Order_Template.txt`, `${DRIVE}/Billing`, "Select Supply_Order_Template in Policies and copy it first."),
            cp(`${DRIVE}/Policies/Supply_Order_Template.txt`, `${DRIVE}/Staff`, "Select Supply_Order_Template in Policies and copy it first."),
          ],
        },
        {
          instruction: "Rename the Billing copy to \"Supply_Order_Template_Billing\" and the Staff copy to \"Supply_Order_Template_Staff\".",
          hint: "Select a copy and press F2 (or right-click › Rename). Type the new name and press Enter.",
          anyOrder: true,
          steps: [ren(`${DRIVE}/Billing/Supply_Order_Template.txt`, "Supply_Order_Template_Billing.txt"), ren(`${DRIVE}/Staff/Supply_Order_Template.txt`, "Supply_Order_Template_Staff.txt")],
        },
        {
          instruction: "Delete the duplicate \"Invoices_2026-01 - Copy\" from Billing so that it goes to the Recycle Bin.",
          hint: "Select the file and press Delete (or right-click › Delete). Do not use Shift+Delete yet.",
          steps: [onSel(cmd("fs.delete"), `file:${DRIVE}/Billing/Invoices_2026-01 - Copy.txt`, "Select Invoices_2026-01 - Copy in Billing first.")],
        },
        {
          instruction: "Open the Recycle Bin, confirm the file is there, and restore it.",
          hint: "Double-click Recycle Bin on the desktop (or type Recycle Bin in the File Explorer address bar). Select the file › Restore the selected items (or right-click › Restore).",
          steps: [onSel(cmd("bin.restore"), "bin:Invoices_2026-01 - Copy.txt", "Select the file in the Recycle Bin first.")],
        },
        {
          instruction: "Back in Billing, permanently delete \"Invoices_2026-01 - Copy\" with Shift+Delete.",
          hint: "Open Billing, select the file, press Shift+Delete, then choose Yes.",
          steps: [onSel(cmd("fs.deletePermanent"), `file:${DRIVE}/Billing/Invoices_2026-01 - Copy.txt`, "Select Invoices_2026-01 - Copy in Billing first.")],
        },
        {
          instruction: "Open the Recycle Bin again to confirm the file is not there.",
          hint: "Double-click Recycle Bin on the desktop, or select it in File Explorer.",
          steps: [cmd("explorer.nav", "Recycle Bin")],
        },
      ],
    },
  ],

  "module-2::file-search-naming": [
    {
      id: "tf-m2-file-search-naming-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Rename by the convention and find a patient's files",
      scenario:
        "A provider at Lakeside Medical Associates needs every document for patient Ana Rivera. Some of her files were saved with careless names. Fix them using the convention LastName_FirstName_DocumentType_YYYY-MM, add two new files, then search the practice drive and sort the results.",
      fileName: "Windows",
      minutes: 7,
      initial: winDoc({
        user: USER,
        fs: pc({
          documents: [
            D("Lakeside Medical Practice Drive", [
              D("Billing", [F("Rivera_Ana_Statement_2026-02.pdf", "2/26/2026 3:30 PM", "88 KB")]),
              D("Patient Files", [
                D("2025"),
                D("2026", [
                  D("January", [F("rivera intake.docx", "1/14/2026 9:20 AM", "36 KB"), F("Chen_David_Referral_2026-01.docx", "1/22/2026 2:05 PM", "31 KB")]),
                  D("February", [F("scan0042.pdf", "2/9/2026 10:48 AM", "640 KB"), F("Okafor_Grace_LabResult_2026-02.pdf", "2/17/2026 1:12 PM", "212 KB")]),
                  D("March", [F("Rivera_Ana_LabResult_2026-03.pdf", "3/18/2026 11:40 AM", "198 KB"), F("Patel_Ria_Intake_2026-03.docx", "3/24/2026 9:02 AM", "35 KB")]),
                ]),
              ]),
              D("Policies"),
              D("Staff"),
            ]),
          ],
        }),
        windows: [{ id: "explorer", app: "explorer", loc: `${DRIVE}/Patient Files/2026/January`, view: "details" }],
        focus: "explorer",
      }),
      tasks: [
        {
          instruction: "In January, rename \"rivera intake\" to \"Rivera_Ana_Intake_2026-01\".",
          hint: "Select the file and press F2 (or right-click › Rename). Type the new name and press Enter.",
          steps: [ren(`${DRIVE}/Patient Files/2026/January/rivera intake.docx`, "Rivera_Ana_Intake_2026-01.docx")],
        },
        {
          instruction: "In February, \"scan0042\" is Ana Rivera's insurance card. Rename it to \"Rivera_Ana_InsuranceCard_2026-02\".",
          hint: "Open February (navigation pane or address bar), select scan0042, press F2, type the new name and press Enter.",
          steps: [ren(`${DRIVE}/Patient Files/2026/February/scan0042.pdf`, "Rivera_Ana_InsuranceCard_2026-02.pdf")],
        },
        {
          instruction: "In March, create a text document named \"Rivera_Ana_VisitNotes_2026-03\".",
          hint: "Open March, then New › Text Document (or right-click › New › Text Document). Type the name and press Enter.",
          steps: newFile(`${DRIVE}/Patient Files/2026/March`, "New Text Document.txt", "Rivera_Ana_VisitNotes_2026-03.txt"),
        },
        {
          instruction: "In Billing, create a text document named \"Rivera_Ana_PaymentPlan_2026-03\".",
          hint: "Open Billing, then New › Text Document. Type the name and press Enter.",
          steps: newFile(`${DRIVE}/Billing`, "New Text Document.txt", "Rivera_Ana_PaymentPlan_2026-03.txt"),
        },
        {
          instruction: "Open Lakeside Medical Practice Drive and search it for \"Rivera\".",
          hint: "Select Lakeside Medical Practice Drive in the navigation pane (or the address bar). Click the search box at the top right, type Rivera and press Enter. Files from several folders appear.",
          steps: [cmd("explorer.search", "Rivera")],
        },
        {
          instruction: "Sort the search results by Date modified.",
          hint: "Select the Date modified column heading (or Sort › Date modified on the command bar).",
          steps: [cmd("explorer.sort", "Date modified")],
        },
        {
          instruction: "Now sort the results by Name.",
          hint: "Select the Name column heading (or Sort › Name).",
          steps: [cmd("explorer.sort", "Name")],
        },
      ],
    },
  ],

  /* ============================ Module 3 ============================ */
  "module-3::how-the-internet-works": [
    {
      id: "tf-m3-how-the-internet-works-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Check the front desk computer's connection",
      scenario:
        "Before you write an internet troubleshooting checklist for Lakeside Medical Associates, gather real information: look up the computer's IP address with ipconfig, then test which websites load. Record what you find in Network Check.txt.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: USER,
        net: { type: "ethernet", ip: "192.168.1.57", gateway: "192.168.1.1", dns: "192.168.1.1", hosts: { "cdc.gov": "198.246.102.39", "cms.gov": "104.103.70.65" }, nxdomain: ["billing.lakesidemedical.example"] },
        web: {
          "cdc.gov": page("Centers for Disease Control and Prevention | CDC", "CDC", "#005eaa", [
            { t: "h1", text: "Centers for Disease Control and Prevention" },
            { t: "p", text: "Health information and guidance from the U.S. public health agency." },
          ]),
          "cms.gov": page("Centers for Medicare & Medicaid Services | CMS", "CMS.gov", "#0b4778", [
            { t: "h1", text: "Centers for Medicare & Medicaid Services" },
            { t: "p", text: "Medicare, Medicaid, and the Health Insurance Marketplace information for providers and patients." },
          ]),
        },
        fs: pc({ documents: [F("Network Check.txt", "10/20/2026 9:10 AM", "1 KB", { text: "Network check\nIPv4 address: \nStarts with 192.168 (yes or no): \nSites that loaded: \nSite that did not load: \n" })] }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Network Check.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Open Command Prompt.",
          hint: "Select Search on the taskbar, type cmd, then select Command Prompt.",
          steps: [cmd("win.open", "cmd")],
        },
        {
          instruction: "Run ipconfig to see this computer's IP address.",
          hint: "In Command Prompt, type ipconfig and press Enter. Look for the IPv4 Address line.",
          steps: [{ action: { kind: "command", id: "cmd.run", value: ["ipconfig", "ipconfig /all"] } }],
        },
        {
          instruction: "In Network Check.txt, type the IPv4 address after \"IPv4 address:\" and yes or no after \"Starts with 192.168 (yes or no):\", then save.",
          hint: "Switch to Notepad, type the address exactly as ipconfig shows it, then yes or no on the next line, and press Ctrl+S.",
          steps: [note("Documents/Network Check.txt", "192.168.1.57", "(yes or no): yes")],
        },
        {
          instruction: "Open Microsoft Edge and go to \"cdc.gov\".",
          hint: "Open Edge from the taskbar, click the address bar, type cdc.gov and press Enter.",
          steps: [cmd("edge.nav", "cdc.gov")],
        },
        {
          instruction: "Open a new tab and go to \"cms.gov\".",
          hint: "Select + next to the tabs, type cms.gov in the address bar and press Enter.",
          steps: [cmd("edge.newTab"), cmd("edge.nav", "cms.gov")],
        },
        {
          instruction: "Open a new tab and go to the clinic's billing portal, \"billing.lakesidemedical.example\".",
          hint: "Select + next to the tabs, type billing.lakesidemedical.example and press Enter. Read what Edge shows.",
          steps: [cmd("edge.newTab"), cmd("edge.nav", "billing.lakesidemedical.example")],
        },
        {
          instruction: "In Network Check.txt, list the sites that loaded after \"Sites that loaded:\" and the address that did not load after \"Site that did not load:\", then save.",
          hint: "Switch to Notepad, type cdc.gov and cms.gov on the first line and the billing portal's address on the second, then press Ctrl+S.",
          steps: [note("Documents/Network Check.txt", "cdc.gov", "cms.gov", "load: billing.lakesidemedical")],
        },
      ],
    },
  ],

  "module-3::web-browsing": [
    {
      id: "tf-m3-web-browsing-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Build and export a favorites library",
      scenario:
        "Your supervisor at Lakeside Medical Associates wants a shared set of trusted links for new staff. Organize favorites into folders by category, find the official HIPAA Privacy Rule summary with a site: search, and export the favorites to a file you could share with a colleague.",
      fileName: "Windows",
      minutes: 7,
      initial: winDoc({
        user: USER,
        web: {
          "cdc.gov": page("Centers for Disease Control and Prevention | CDC", "CDC", "#005eaa", [
            { t: "h1", text: "Centers for Disease Control and Prevention" },
            { t: "p", text: "Health information and guidance from the U.S. public health agency." },
          ]),
          "medlineplus.gov": page("MedlinePlus - Health Information from the National Library of Medicine", "MedlinePlus", "#20558a", [
            { t: "h1", text: "MedlinePlus" },
            { t: "p", text: "Trusted health information for you, from the National Library of Medicine." },
          ]),
          "hhs.gov/hipaa/for-professionals/privacy/laws-regulations": page("Summary of the HIPAA Privacy Rule | HHS.gov", "HHS.gov", "#1f3d6b", [
            { t: "h1", text: "Summary of the HIPAA Privacy Rule" },
            { t: "p", text: "An overview of the standards for how covered entities may use and disclose individuals' protected health information." },
          ]),
          "hipaa-quick-guide.net": page("HIPAA Rules Explained Fast", "HIPAA Quick Guide", "#7a2e8e", [{ t: "h1", text: "HIPAA in 5 minutes" }, { t: "p", text: "Sponsored content. Buy our compliance kit." }]),
        },
        search: {
          "hipaa privacy rule summary site:hhs.gov": [
            { title: "Summary of the HIPAA Privacy Rule | HHS.gov", url: "hhs.gov/hipaa/for-professionals/privacy/laws-regulations", snippet: "This is a summary of key elements of the Privacy Rule including who is covered, what information is protected, and how protected health information can be used and disclosed." },
            { title: "The HIPAA Privacy Rule | HHS.gov", url: "hhs.gov/hipaa/for-professionals/privacy", snippet: "The HIPAA Privacy Rule establishes national standards to protect individuals' medical records and other individually identifiable health information." },
          ],
          "hipaa privacy rule summary": [
            { title: "HIPAA Rules Explained Fast - Get Compliant Today", url: "hipaa-quick-guide.net", snippet: "Skip the government website. Our 5-minute guide covers everything.", ad: true },
            { title: "Summary of the HIPAA Privacy Rule | HHS.gov", url: "hhs.gov/hipaa/for-professionals/privacy/laws-regulations", snippet: "This is a summary of key elements of the Privacy Rule." },
          ],
        },
        fs: pc({ documents: [D("Front Desk")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Create four favorites folders: \"Government & Regulatory\", \"Insurance Portals\", \"Medical References\", and \"Practice Tools\".",
          hint: "Select Favorites (the star with lines) on the toolbar › Add folder. Type the name and press Enter. Repeat for each folder.",
          anyOrder: true,
          steps: [cmd("edge.favFolder", "Government & Regulatory"), cmd("edge.favFolder", "Insurance Portals"), cmd("edge.favFolder", "Medical References"), cmd("edge.favFolder", "Practice Tools")],
        },
        {
          instruction: "Go to \"cdc.gov\" and add it to the Government & Regulatory folder.",
          hint: "Type cdc.gov in the address bar and press Enter. Select the star in the address bar (or Ctrl+D), choose Government & Regulatory as the folder, then Done.",
          steps: [cmd("edge.nav", "cdc.gov"), onSel(cmd("edge.favorite", "Government & Regulatory"), "page:cdc.gov", "Add the favorite while cdc.gov is showing.")],
        },
        {
          instruction: "Go to \"medlineplus.gov\" and add it to the Medical References folder.",
          hint: "Type medlineplus.gov in the address bar and press Enter. Select the star (or Ctrl+D), choose Medical References, then Done.",
          steps: [cmd("edge.nav", "medlineplus.gov"), onSel(cmd("edge.favorite", "Medical References"), "page:medlineplus.gov", "Add the favorite while medlineplus.gov is showing.")],
        },
        {
          instruction: "From the address bar, search for \"HIPAA Privacy Rule summary site:hhs.gov\".",
          hint: "Click the address bar, type HIPAA Privacy Rule summary site:hhs.gov and press Enter. The site: operator limits the results to hhs.gov.",
          steps: [cmd("edge.search", "HIPAA Privacy Rule summary site:hhs.gov")],
        },
        {
          instruction: "Open the official \"Summary of the HIPAA Privacy Rule\" page and add it to Government & Regulatory.",
          hint: "Select the Summary of the HIPAA Privacy Rule | HHS.gov result. Then select the star (or Ctrl+D), choose Government & Regulatory, then Done.",
          steps: [
            cmd("edge.nav", "hhs.gov/hipaa/for-professionals/privacy/laws-regulations"),
            onSel(cmd("edge.favorite", "Government & Regulatory"), "page:hhs.gov/hipaa/for-professionals/privacy/laws-regulations", "Add the favorite while the HHS summary page is showing."),
          ],
        },
        {
          instruction: "Export your favorites to Documents as a file named \"LMA_Favorites\".",
          hint: "Favorites › More options (…) › Export favorites. In the Save As box, keep Documents, type LMA_Favorites as the file name, then Save.",
          steps: [cmd("edge.favExport", "Documents/LMA_Favorites.html")],
        },
      ],
    },
  ],

  "module-3::safe-browsing": [
    {
      id: "tf-m3-safe-browsing-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Check suspicious links safely",
      scenario:
        "Two emails in the Lakeside Medical Associates front desk inbox ask you to sign in. In this practice browser, follow each link only to inspect it: read the address and the site information, report the fake page, heed the Microsoft Defender SmartScreen warning, and reach the real sites by typing their addresses. Never test suspicious links on a real computer.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: USER,
        web: {
          "mail.lakesidemedical.example/inbox": page("Inbox - Lakeside Medical Mail", "Lakeside Medical Mail", "#2b4c7e", [
            { t: "h2", text: "Action required: revalidate your Medicare provider enrollment" },
            { t: "small", text: "From: CMS Provider Services <alerts@cms-medicare-update.net>   To: Front Desk" },
            { t: "p", text: "Your enrollment will be deactivated in 24 hours unless you sign in and confirm your details." },
            { t: "link", text: "Revalidate your enrollment", href: "cms-medicare-update.net/login" },
            { t: "hr" },
            { t: "h2", text: "Contoso Health Plan: update your provider portal password" },
            { t: "small", text: "From: Contoso Health Plan <no-reply@contoso-provider-portal.com>   To: Front Desk" },
            { t: "p", text: "We upgraded our security. Update your credentials to keep submitting claims." },
            { t: "link", text: "Update credentials", href: "contoso-provider-portal.com/update-credentials" },
          ]),
          "cms-medicare-update.net/login": page("CMS | Provider Sign In", "CMS Provider Services", "#0b4778", [
            { t: "alert", tone: "warn", text: "Your enrollment will be deactivated in 24 hours. Sign in to keep billing privileges." },
            { t: "form", id: "fake-cms", title: "Sign in", fields: [{ name: "npi", label: "NPI" }, { name: "pw", label: "Password", type: "password" }], submit: "Sign in", toast: "Signed in." },
          ], { secure: false }),
          "cms.gov": page("Centers for Medicare & Medicaid Services | CMS", "CMS.gov", "#0b4778", [
            { t: "h1", text: "Centers for Medicare & Medicaid Services" },
            { t: "p", text: "Official information for providers and patients. CMS does not ask you to sign in through a link in an email." },
          ]),
          "contoso-provider-portal.com/update-credentials": page("Contoso Health Plan | Update credentials", "Contoso Health Plan", "#0b6a5a", [{ t: "h1", text: "Update your credentials" }], { unsafe: true }),
          "providers.contoso.com": page("Contoso Health Plan | Provider portal", "Contoso Health Plan", "#0b6a5a", [
            { t: "h1", text: "Provider portal" },
            { t: "p", text: "Sign in with your provider account. Contoso Health Plan never emails you a link to change your password." },
          ]),
        },
        fs: pc({ documents: [D("Front Desk")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "mail.lakesidemedical.example/inbox" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Open the \"Revalidate your enrollment\" link and view the site information for the page that opens.",
          hint: "Hover over the link first to see the real address at the bottom left. Select the link, then select Not secure at the left of the address bar.",
          steps: [cmd("edge.nav", "cms-medicare-update.net/login"), cmd("edge.siteInfo")],
        },
        {
          instruction: "Report this page to Microsoft as an unsafe site. Do not sign in.",
          hint: "Settings and more (…) › Help and feedback › Report unsafe site.",
          steps: [onSel(cmd("edge.reportUnsafe"), "page:cms-medicare-update.net/login", "Report it while the fake sign-in page is showing.")],
        },
        {
          instruction: "Reach the real CMS website by typing \"cms.gov\" in the address bar.",
          hint: "Click the address bar, type cms.gov and press Enter.",
          steps: [cmd("edge.nav", "cms.gov")],
        },
        {
          instruction: "Go back to the inbox, open the \"Update credentials\" link, and leave the site when Microsoft Defender SmartScreen warns you.",
          hint: "Select Back until the inbox shows (or type mail.lakesidemedical.example/inbox). Select Update credentials, then select Go back on the red warning page.",
          steps: [cmd("edge.nav", "contoso-provider-portal.com/update-credentials"), cmd("edge.smartBack")],
        },
        {
          instruction: "Reach the real Contoso Health Plan portal by typing \"providers.contoso.com\".",
          hint: "Click the address bar, type providers.contoso.com and press Enter.",
          steps: [cmd("edge.nav", "providers.contoso.com")],
        },
      ],
    },
  ],

  /* ============================ Module 6 ============================ */
  "module-6::printers-scanners-copiers": [
    {
      id: "tf-m6-printers-scanners-copiers-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Printer and scanner assessment",
      scenario:
        "You are assessing the front desk equipment at Lakeside Medical Associates. Check which printer is the default, fix it so intake forms print at the front desk, print a form and find it in the print queue, then scan a document and check the size of the file. Record findings in Equipment Check.txt.",
      fileName: "Windows",
      minutes: 8,
      initial: winDoc({
        user: USER,
        printers: [
          { name: "Front Desk Printer", kind: "mfp", status: "Idle" },
          { name: "Billing Office Printer", kind: "printer", status: "Idle", default: true },
        ],
        fs: pc({
          documents: [
            F("Equipment Check.txt", "10/20/2026 9:12 AM", "1 KB", { text: "Printer and scanner check\nDefault printer: \nScan file size: \n" }),
            F("Intake Form.docx", "10/15/2026 8:30 AM", "42 KB", { text: "Lakeside Medical Associates\nNew Patient Intake Form\nName: ____________  Date of birth: ________" }),
          ],
          pictures: [D("Screenshots")],
        }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Equipment Check.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Open Printers & scanners in Settings.",
          hint: "Start › Settings › Bluetooth & devices › Printers & scanners (or search for printers).",
          steps: [cmd("settings.nav", "bluetooth/printers")],
        },
        {
          instruction: "In Equipment Check.txt, type the name of the current default printer after \"Default printer:\", then save.",
          hint: "On Printers & scanners, the default printer says Default under its name. Type that name in Notepad and press Ctrl+S.",
          steps: [note("Documents/Equipment Check.txt", "Default printer: Billing Office Printer")],
        },
        {
          instruction: "Intake forms should print at the front desk. Turn off \"Let Windows manage my default printer\" and set Front Desk Printer as the default.",
          hint: "Printers & scanners › Printer preferences › Let Windows manage my default printer › Off. Then select Front Desk Printer › Set as default.",
          steps: [set("printer.manage=off"), cmd("printer.default", "Front Desk Printer")],
        },
        {
          instruction: "Open \"Intake Form\" from Documents and print it on Front Desk Printer.",
          hint: "In File Explorer, open Documents and double-click Intake Form. In Word press Ctrl+P (or File › Print), check that Front Desk Printer is selected, then select Print.",
          steps: [cmd("office.print", "Front Desk Printer")],
        },
        {
          instruction: "Open the print queue for Front Desk Printer and find your print job.",
          hint: "Settings › Bluetooth & devices › Printers & scanners › Front Desk Printer › Open print queue. A job stays in the queue only while it waits or prints.",
          steps: [cmd("printer.queue", "Front Desk Printer")],
        },
        {
          instruction: "Open the Scan app and scan the intake form from Front Desk Printer using the Flatbed as the source and TIFF as the file type.",
          hint: "Search for scan and open the Scan app. Scanner: Front Desk Printer, Source: Flatbed, File type: TIFF. Select Show more to see where it saves (Scans), then select Scan.",
          steps: [cmd("scan.run", "Front Desk Printer|Flatbed|TIFF")],
        },
        {
          instruction: "Open Pictures › Scans in File Explorer, check the size of the scanned file, and type it after \"Scan file size:\" in Equipment Check.txt. Save the file.",
          hint: "In File Explorer, open Pictures › Scans in Details view and read the Size column. Type the size in Notepad (for example 2.15 MB) and press Ctrl+S.",
          steps: [note("Documents/Equipment Check.txt", "6.84 MB")],
        },
      ],
    },
  ],

  "module-6::monitors-peripherals-ergonomics": [
    {
      id: "tf-m6-monitors-peripherals-ergonomics-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Set up the display for comfortable viewing",
      scenario:
        "After adjusting the front desk chair and monitor at Lakeside Medical Associates, finish the setup in Windows: use the monitor's recommended resolution, make everything a little larger so you can read from a comfortable distance instead of leaning in, and bring up the second monitor that is plugged in but dark.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: USER,
        displays: 1,
        flags: { monitor2: true },
        settings: { "display.resolution": "1366 × 768", "display.multi": "Duplicate these displays" },
        fs: pc({ documents: [D("Front Desk")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open Display settings.",
          hint: "Right-click an empty part of the desktop › Display settings (or Start › Settings › System › Display).",
          steps: [cmd("settings.nav", "system/display")],
        },
        {
          instruction: "Set the display resolution to the recommended 1920 × 1080.",
          hint: "Settings › System › Display › Display resolution › 1920 × 1080 (Recommended).",
          steps: [set("display.resolution=1920 × 1080")],
        },
        {
          instruction: "Change the scale to 125% so text and apps are larger.",
          hint: "Settings › System › Display › Scale › 125%.",
          steps: [set("display.scale=125%")],
        },
        {
          instruction: "The second monitor is plugged in but dark. Detect it.",
          hint: "Settings › System › Display › Multiple displays › Detect other display › Detect.",
          steps: [cmd("display.detect")],
        },
        {
          instruction: "Set the displays to \"Extend these displays\".",
          hint: "At the top of Display settings, open the Multiple displays box and choose Extend these displays.",
          steps: [set("display.multi=Extend these displays")],
        },
        {
          instruction: "Increase the text size to 115% and apply it.",
          hint: "Settings › Accessibility › Text size. Move the slider to 115% (click it and use the arrow keys), then select Apply.",
          steps: [set("access.textSize=115%")],
        },
      ],
    },
  ],

  "module-6::hardware-troubleshooting": [
    {
      id: "tf-m6-hardware-troubleshooting-lab",
      role: "challenge",
      app: "windows",
      title: "Challenge Lab: Troubleshoot a dead keyboard and a dark monitor",
      scenario:
        "At Lakeside Medical Associates, the front desk USB keyboard stopped typing after it was moved to another port, and the second monitor is dark. Use the five-step method without unplugging anything: check the device's status, find the error in Device Manager, reinstall the device, restart, and test. Record the error in Incident Report.txt.",
      fileName: "Windows",
      minutes: 8,
      initial: winDoc({
        user: USER,
        devices: [
          { name: "USB Keyboard", kind: "keyboard", connected: false },
          { name: "USB Optical Mouse", kind: "mouse", connected: true },
        ],
        hardware: [{ cat: "Keyboards", name: "HID Keyboard Device", problem: "Windows has stopped this device because it has reported problems. (Code 43)", device: "USB Keyboard", location: "Port_#0003.Hub_#0001" }],
        displays: 1,
        flags: { monitor2: true },
        settings: { "display.multi": "Duplicate these displays" },
        specs: { deviceName: "LMA-FRONTDESK-01" },
        fs: pc({ documents: [F("Incident Report.txt", "10/20/2026 2:02 PM", "1 KB", { text: "Hardware incident report\nDevice: USB keyboard at the front desk\nSymptom: Keyboard does not type\nError code: \nSteps taken: \nResult: \n" })] }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Incident Report.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Check the keyboard's status in Settings › Bluetooth & devices.",
          hint: "Start › Settings › Bluetooth & devices. Find USB Keyboard in the Devices list and read its status.",
          steps: [{ action: { kind: "command", id: "settings.nav", value: ["bluetooth", "bluetooth/devices"] } }],
        },
        {
          instruction: "Open Device Manager.",
          hint: "Right-click the Start button › Device Manager (or search for Device Manager).",
          steps: [cmd("win.open", "devmgmt")],
        },
        {
          instruction: "Find the keyboard with the warning icon. In Incident Report.txt, type the error code number from its status after \"Error code:\", then save.",
          hint: "Keyboards opens by itself because a device in it has a problem. Select HID Keyboard Device and read the status at the bottom (or right-click › Properties). Type the code number in Notepad and press Ctrl+S.",
          steps: [note("Documents/Incident Report.txt", "43")],
        },
        {
          instruction: "Uninstall the device \"HID Keyboard Device\".",
          hint: "In Device Manager, right-click HID Keyboard Device › Uninstall device › Uninstall.",
          steps: [onSel(cmd("devmgr.uninstall"), "dev:HID Keyboard Device", "Select HID Keyboard Device in Device Manager first.")],
        },
        {
          instruction: "Restart the computer so that Windows reinstalls the keyboard.",
          hint: "Start › Power › Restart (or right-click Start › Shut down or sign out › Restart). In Device Manager, Action › Scan for hardware changes also reinstalls it.",
          steps: [{ action: { kind: "command", id: "power.restart" }, alt: [{ kind: "command", id: "devmgr.scan" }] }],
        },
        {
          instruction: "Sign in again if needed and confirm that USB Keyboard now shows as Connected in Bluetooth & devices.",
          hint: "If the lock screen shows, click it and type the practice PIN 2468. Then open Start › Settings › Bluetooth & devices.",
          steps: [{ action: { kind: "command", id: "settings.nav", value: ["bluetooth", "bluetooth/devices"] } }],
        },
        {
          instruction: "Now the dark monitor: in Display settings, detect the second display.",
          hint: "Start › Settings › System › Display › Multiple displays › Detect other display › Detect.",
          steps: [cmd("display.detect")],
        },
        {
          instruction: "Set the displays to \"Extend these displays\".",
          hint: "At the top of Display settings, open the Multiple displays box and choose Extend these displays.",
          steps: [set("display.multi=Extend these displays")],
        },
      ],
    },
  ],

  "module-6::video-conferencing": [
    {
      id: "tf-m6-video-conferencing-lab",
      role: "challenge",
      app: "teams",
      title: "Challenge Lab: Test your setup and practice screen sharing",
      scenario:
        "Before the staff meeting at Lakeside Medical Associates, set up and test the headset you use for calls, schedule a short practice meeting with only yourself, check your video preview, and practice sharing a single window instead of your whole screen.",
      fileName: "Microsoft Teams",
      minutes: 7,
      initial: teamsDoc({
        org: "Lakeside Medical Associates",
        today: "2026-10-20",
        now: "10:02 AM",
        me: { name: "Maya Torres", title: "Front Desk Assistant", email: "maya.torres@lakesidemedical.example", presence: "Available" },
        people: [
          { id: "p-rosa", name: "Rosa Delgado", title: "Office Manager", presence: "Available" },
          { id: "p-ken", name: "Ken Watanabe", title: "Billing Specialist", presence: "Busy" },
        ],
        chats: [
          { id: "c-rosa", members: ["p-rosa"], messages: [{ id: "m-r1", from: "p-rosa", time: "9:40 AM", text: "Please test your headset and practice sharing a window before the staff meeting." }] },
        ],
        teams: [{ id: "t-lma", name: "Lakeside Front Office", color: "#0f6cbd", channels: [{ id: "ch-gen", name: "General", posts: [] }] }],
        files: [],
        devices: {
          speakers: ["Speakers (Realtek(R) Audio)", "Headset Earphone (Contoso USB Headset)"],
          microphones: ["Microphone Array (Realtek(R) Audio)", "Headset Microphone (Contoso USB Headset)"],
          cameras: ["Integrated Webcam"],
          speaker: "Speakers (Realtek(R) Audio)",
          microphone: "Microphone Array (Realtek(R) Audio)",
          camera: "Integrated Webcam",
          noise: "Auto",
        },
        av: { camera: true, mic: true },
        windows: ["Front Desk Procedures.docx - Word", "Lakeside EHR - Patient Chart", "Inbox - Maya Torres - Outlook", "Microsoft Edge"],
        events: [],
        seq: 100,
        start: { view: "calendar" },
      }),
      tasks: [
        {
          instruction: "Open Settings › Devices and set the speaker to \"Headset Earphone (Contoso USB Headset)\" and the microphone to \"Headset Microphone (Contoso USB Headset)\".",
          hint: "Select Settings and more (…) next to your picture › Settings › Devices. Choose the headset in the Speaker list and in the Microphone list.",
          anyOrder: true,
          steps: [
            { action: { kind: "command", id: "av.speaker", value: "Headset Earphone (Contoso USB Headset)" }, requires: { selection: ["settings", "prejoin:ev101"] }, selectHint: "Choose the speaker in Settings › Devices." },
            { action: { kind: "command", id: "av.microphone", value: "Headset Microphone (Contoso USB Headset)" }, requires: { selection: ["settings", "prejoin:ev101"] }, selectHint: "Choose the microphone in Settings › Devices." },
          ],
        },
        {
          instruction: "Make a test call to check the headset.",
          hint: "Settings › Devices › Make a test call. Wait for the results.",
          steps: [{ action: { kind: "command", id: "settings.testCall" }, requires: { selection: "settings" }, selectHint: "Make the test call from Settings › Devices." }],
        },
        {
          instruction: "Schedule a Teams meeting titled \"Video Practice\" with no other attendees.",
          hint: "Close Settings with the back arrow. Select Calendar › New event. Type Video Practice in Add a title, leave the attendee box empty and Teams meeting turned on, then select Save.",
          steps: [{ action: { kind: "type", target: "schedule", value: ["Title: Video Practice", "Teams meeting: On"], match: "all" } }],
        },
        {
          instruction: "Open Video Practice from the calendar and select Join. On the pre-join screen, check your video preview and blur your background.",
          hint: "Select the Video Practice meeting in the calendar › Join. On the pre-join screen make sure the camera is on, then select Effects and avatars › Blur.",
          steps: [{ action: { kind: "command", id: "av.background", value: "Blur" }, requires: { selection: "prejoin:ev101" }, selectHint: "Do this on the pre-join screen of Video Practice." }],
        },
        {
          instruction: "Join the meeting.",
          hint: "Select Join now on the pre-join screen.",
          steps: [{ action: { kind: "command", id: "meeting.joinNow" }, requires: { selection: "prejoin:ev101" }, selectHint: "Select Join now on the Video Practice pre-join screen." }],
        },
        {
          instruction: "Share only the Word window \"Front Desk Procedures.docx - Word\", not your entire screen or the patient chart.",
          hint: "Select Share in the meeting toolbar. Under Window, choose Front Desk Procedures.docx - Word.",
          steps: [{ action: { kind: "command", id: "meeting.share", value: "Front Desk Procedures.docx - Word" }, requires: { selection: "meeting:ev101" }, selectHint: "Share from the meeting toolbar." }],
        },
        {
          instruction: "Stop sharing, then leave the meeting.",
          hint: "Select Stop sharing at the top of the shared window, then Leave in the meeting toolbar.",
          steps: [
            { action: { kind: "command", id: "meeting.stopShare" }, requires: { selection: "meeting:ev101" }, selectHint: "Stop sharing in the meeting window." },
            { action: { kind: "command", id: "meeting.leave" }, requires: { selection: "meeting:ev101" }, selectHint: "Leave from the meeting toolbar." },
          ],
        },
      ],
    },
  ],
};
