import type { WinApp, WinDevice, WinNet, WinPrinter, WinProcess, WinSpecs, WinStartup } from "./types";

/* ------------------------------------------------------------------ */
/* Apps                                                                */
/* ------------------------------------------------------------------ */

export type AppInfo = {
  id: string;
  name: string;
  /** Search keywords. */
  keys?: string;
  /** Shown in Start › All apps. */
  list?: boolean;
  /** Found by Search but not listed in All apps (Windows Tools such as Device Manager). */
  search?: boolean;
  /** File extensions it opens. */
  opens?: string[];
};

export const APPS: AppInfo[] = [
  { id: "explorer", name: "File Explorer", keys: "files folders explorer documents" , list: true },
  { id: "edge", name: "Microsoft Edge", keys: "browser internet web edge", list: true, opens: [".pdf", ".htm", ".html"] },
  { id: "settings", name: "Settings", keys: "settings control panel preferences", list: true },
  { id: "store", name: "Microsoft Store", keys: "store apps install", list: true },
  { id: "word", name: "Word", keys: "word document microsoft 365 office", list: true, opens: [".docx", ".doc", ".rtf"] },
  { id: "excel", name: "Excel", keys: "excel spreadsheet workbook microsoft 365 office", list: true, opens: [".xlsx", ".xls", ".csv"] },
  { id: "powerpoint", name: "PowerPoint", keys: "powerpoint presentation slides office", list: true, opens: [".pptx", ".ppt"] },
  { id: "outlook", name: "Outlook", keys: "outlook email mail calendar", list: true },
  { id: "teams", name: "Microsoft Teams", keys: "teams chat meeting", list: true },
  { id: "notepad", name: "Notepad", keys: "notepad text editor txt", list: true, opens: [".txt", ".log", ".csv"] },
  { id: "calculator", name: "Calculator", keys: "calculator calc math", list: true },
  { id: "snip", name: "Snipping Tool", keys: "snipping tool screenshot snip screen capture print screen", list: true },
  { id: "taskmgr", name: "Task Manager", keys: "task manager processes performance end task startup", list: true },
  { id: "cmd", name: "Command Prompt", keys: "command prompt cmd terminal console ipconfig ping", list: true },
  { id: "security", name: "Windows Security", keys: "windows security defender antivirus virus scan firewall", list: true },
  { id: "photos", name: "Photos", keys: "photos pictures images viewer", list: true, opens: [".png", ".jpg", ".jpeg", ".gif", ".bmp"] },
  { id: "paint", name: "Paint", keys: "paint draw image", list: true },
  { id: "clock", name: "Clock", keys: "clock alarm timer focus", list: true },
  { id: "camera", name: "Camera", keys: "camera webcam", list: true },
  { id: "onedrive", name: "OneDrive", keys: "onedrive cloud sync", list: true },
  { id: "devmgmt", name: "Device Manager", keys: "device manager drivers hardware usb keyboard mouse monitor yellow warning", search: true },
  { id: "scan", name: "Scan", keys: "windows scan scanner scanning flatbed feeder document", list: true },
  { id: "printqueue", name: "Print queue", keys: "print queue printer jobs" },
  { id: "edgeprivate", name: "InPrivate - Microsoft Edge" },
];

export const appInfo = (id: string): AppInfo =>
  APPS.find((a) => a.id === id) ?? (id.startsWith("webapp:") ? { id, name: id.slice(7) } : { id, name: id });

export const DEFAULT_TASKBAR = ["explorer", "edge", "store", "outlook", "word", "excel"];
export const DEFAULT_START_PINS = ["edge", "word", "excel", "powerpoint", "outlook", "teams", "store", "photos", "settings", "calculator", "notepad", "snip", "explorer", "paint", "clock", "security"];

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

export const DEFAULT_SETTINGS: Record<string, string> = {
  "display.brightness": "70",
  "display.scale": "100%",
  "display.resolution": "1920 × 1080",
  "display.orientation": "Landscape",
  "display.multi": "Extend these displays",
  "display.main": "1",
  nightlight: "off",
  "sound.output": "Speakers (Realtek(R) Audio)",
  "sound.input": "Microphone Array (Realtek(R) Audio)",
  volume: "50",
  "sound.mute": "off",
  "sound.inputVolume": "80",
  "notifications.dnd": "off",
  "notifications.all": "on",
  "notifications.lock": "on",
  "power.screen": "10 minutes",
  "power.sleep": "30 minutes",
  "power.mode": "Balanced",
  wifi: "on",
  bt: "on",
  airplane: "off",
  energySaver: "off",
  theme: "Light",
  wallpaper: "Bloom",
  "taskbar.align": "Center",
  "taskbar.search": "Search box",
  "taskbar.taskview": "on",
  "taskbar.widgets": "on",
  "clipboard.history": "off",
  "access.textSize": "100%",
  "access.magnifier": "off",
  "access.narrator": "off",
  "access.colorFilters": "off",
  "access.contrast": "None",
  "access.pointerSize": "1",
  "access.pointerStyle": "White",
  "access.captions": "off",
  "privacy.encryption": "off",
  "privacy.location": "on",
  "privacy.camera": "on",
  "privacy.mic": "on",
  "privacy.findDevice": "off",
  "printer.manage": "on",
  "update.pause": "",
  "update.otherProducts": "off",
  "update.notifyRestart": "off",
  "update.activeHours": "8:00 AM to 5:00 PM",
  "signin.away": "When PC wakes up from sleep",
  "signin.dynamic": "off",
  "time.auto": "on",
  "time.zone": "(UTC-05:00) Eastern Time (US & Canada)",
  "time.region": "United States",
  "time.language": "English (United States)",
  "sec.realtime": "on",
  "sec.cfa": "off",
  "sec.firewall.domain": "on",
  "sec.firewall.private": "on",
  "sec.firewall.public": "on",
  "sec.smartscreen": "on",
  "sec.tamper": "on",
  "mouse.primary": "Left",
  "mouse.speed": "10",
  "mouse.scrollLines": "3",
  "mouse.scrollInactive": "on",
  "net.profile": "Public",
  "net.metered": "off",
  "edge.savePasswords": "on",
  "edge.popups": "on",
  "edge.trackers": "Balanced",
  "od.backup.desktop": "off",
  "od.backup.documents": "off",
  "od.backup.pictures": "off",
  "default.browser": "Microsoft Edge",
  "multitasking.snap": "on",
  "start.recent": "on",
  "start.recentApps": "on",
  screensaver: "(None)",
  "screensaver.wait": "1",
  "screensaver.secure": "off",
  "storage.sense": "off",
  "gaming.mode": "on",
  "update.latest": "off",
  "transparency": "on",
  "time.autoZone": "off",
  "time.dst": "on",
  "bt.swiftPair": "on",
  "wifi.random": "off",
  "signin.helloOnly": "off",
  "signin.showEmail": "off",
  "notifications.sounds": "on",
  "explorer.navpane": "on",
};

export const OPTIONS: Record<string, string[]> = {
  "display.scale": ["100%", "125%", "150%", "175%"],
  "display.resolution": ["1920 × 1080", "1680 × 1050", "1600 × 900", "1440 × 900", "1366 × 768", "1280 × 1024", "1280 × 720", "1024 × 768"],
  "display.orientation": ["Landscape", "Portrait", "Landscape (flipped)", "Portrait (flipped)"],
  "display.multi": ["Duplicate these displays", "Extend these displays", "Show only on 1", "Show only on 2"],
  "power.screen": ["1 minute", "3 minutes", "5 minutes", "10 minutes", "15 minutes", "30 minutes", "1 hour", "Never"],
  "power.sleep": ["5 minutes", "10 minutes", "15 minutes", "30 minutes", "1 hour", "2 hours", "Never"],
  "power.mode": ["Best power efficiency", "Balanced", "Best performance"],
  "signin.away": ["Never", "Every time", "1 minute", "3 minutes", "5 minutes", "15 minutes", "When PC wakes up from sleep"],
  "time.zone": [
    "(UTC-10:00) Hawaii",
    "(UTC-09:00) Alaska",
    "(UTC-08:00) Pacific Time (US & Canada)",
    "(UTC-07:00) Mountain Time (US & Canada)",
    "(UTC-06:00) Central Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-04:00) Atlantic Time (Canada)",
    "(UTC+00:00) Dublin, Edinburgh, Lisbon, London",
  ],
  "time.region": ["United States", "Canada", "Mexico", "Puerto Rico", "Dominican Republic", "United Kingdom"],
  "time.language": ["English (United States)", "Español (Estados Unidos)", "Français (Canada)"],
  "net.profile": ["Public", "Private"],
  "mouse.primary": ["Left", "Right"],
  "mouse.scrollLines": ["1", "2", "3", "4", "5", "6", "8", "10"],
  theme: ["Light", "Dark"],
  wallpaper: ["Bloom", "Glow", "Captured Motion", "Sunrise", "Flow"],
  "taskbar.align": ["Center", "Left"],
  "taskbar.search": ["Hide", "Search icon only", "Search icon and label", "Search box"],
  "access.contrast": ["None", "Aquatic", "Desert", "Dusk", "Night sky"],
  "access.pointerStyle": ["White", "Black", "Inverted", "Custom"],
  "edge.trackers": ["Basic", "Balanced", "Strict"],
  "update.pause": ["Pause for 1 week", "Pause for 2 weeks", "Pause for 3 weeks", "Pause for 4 weeks", "Pause for 5 weeks"],
};

/** Settings navigation: category id → label, and its pages. */
export type SettingsPage = { id: string; title: string; desc?: string; keys?: string };
export type SettingsCat = { id: string; label: string; icon: string; pages: SettingsPage[] };

export const SETTINGS_CATS: SettingsCat[] = [
  { id: "home", label: "Home", icon: "home", pages: [] },
  {
    id: "system",
    label: "System",
    icon: "system",
    pages: [
      { id: "system/display", title: "Display", desc: "Monitors, brightness, night light, display profile", keys: "display monitor screen brightness resolution scale night light second monitor" },
      { id: "system/sound", title: "Sound", desc: "Volume levels, output, input, sound devices", keys: "sound volume speakers headset microphone audio output input" },
      { id: "system/notifications", title: "Notifications", desc: "Alerts from apps and system, do not disturb", keys: "notifications alerts do not disturb focus" },
      { id: "system/power", title: "Power & battery", desc: "Sleep, battery usage, battery saver", keys: "power sleep screen timeout battery energy" },
      { id: "system/storage", title: "Storage", desc: "Storage space, drives, configuration rules", keys: "storage disk space drive ssd cleanup" },
      { id: "system/multitasking", title: "Multitasking", desc: "Snap windows, desktops, task switching", keys: "multitasking snap windows virtual desktops" },
      { id: "system/clipboard", title: "Clipboard", desc: "Cut and copy history, sync, clear", keys: "clipboard history copy paste win+v" },
      { id: "system/about", title: "About", desc: "Device specifications, rename PC, Windows specifications", keys: "about specs specifications processor ram memory device name pc name windows version system info" },
    ],
  },
  {
    id: "bluetooth",
    label: "Bluetooth & devices",
    icon: "bluetooth",
    pages: [
      { id: "bluetooth/devices", title: "Devices", desc: "Mouse, keyboard, pen, audio, displays and docks, other devices", keys: "devices bluetooth keyboard mouse headset pair add device" },
      { id: "bluetooth/printers", title: "Printers & scanners", desc: "Preferences, troubleshoot", keys: "printers scanners printer default print queue add printer" },
      { id: "bluetooth/mouse", title: "Mouse", desc: "Buttons, mouse pointer speed, scrolling", keys: "mouse primary button pointer speed scroll left handed" },
      { id: "bluetooth/phone", title: "Mobile devices", desc: "Instantly access your mobile device's photos, texts, and more", keys: "phone link mobile android iphone" },
    ],
  },
  {
    id: "network",
    label: "Network & internet",
    icon: "network",
    pages: [
      { id: "network/wifi", title: "Wi-Fi", desc: "Connect, manage known networks, metered network", keys: "wifi wi-fi wireless network ssid known networks" },
      { id: "network/ethernet", title: "Ethernet", desc: "Authentication, IP and DNS settings, metered network", keys: "ethernet wired lan ip address dns network profile" },
      { id: "network/vpn", title: "VPN", desc: "Add, connect, manage", keys: "vpn virtual private network remote office" },
      { id: "network/airplane", title: "Airplane mode", desc: "Stop all wireless communication", keys: "airplane mode wireless off" },
      { id: "network/advanced", title: "Advanced network settings", desc: "View all network adapters, network reset", keys: "advanced network adapters reset hardware properties" },
    ],
  },
  {
    id: "personalization",
    label: "Personalization",
    icon: "personalization",
    pages: [
      { id: "personalization/background", title: "Background", desc: "Background image, color, slideshow", keys: "background wallpaper desktop picture" },
      { id: "personalization/colors", title: "Colors", desc: "Accent color, transparency effects, color theme", keys: "colors dark mode light mode theme accent" },
      { id: "personalization/lockscreen", title: "Lock screen", desc: "Lock screen images, apps, animations", keys: "lock screen" },
      { id: "personalization/start", title: "Start", desc: "Recent apps and items, folders", keys: "start menu recommended" },
      { id: "personalization/taskbar", title: "Taskbar", desc: "Taskbar behaviors, system pins", keys: "taskbar alignment search box task view widgets" },
    ],
  },
  {
    id: "apps",
    label: "Apps",
    icon: "apps",
    pages: [
      { id: "apps/installed", title: "Installed apps", desc: "Uninstall and manage apps on your PC", keys: "installed apps uninstall programs remove software add remove programs" },
      { id: "apps/default", title: "Default apps", desc: "Defaults for file and link types, other defaults", keys: "default apps browser pdf open with file type" },
      { id: "apps/startup", title: "Startup", desc: "Apps that start automatically when you sign in", keys: "startup apps start automatically boot" },
    ],
  },
  {
    id: "accounts",
    label: "Accounts",
    icon: "accounts",
    pages: [
      { id: "accounts/info", title: "Your info", desc: "Accounts used by email, calendar, and contacts", keys: "your info account picture microsoft account" },
      { id: "accounts/signin", title: "Sign-in options", desc: "Windows Hello, security key, password, dynamic lock", keys: "sign-in options pin password windows hello face fingerprint dynamic lock" },
      { id: "accounts/email", title: "Email & accounts", desc: "Accounts used by email, calendar, and contacts", keys: "email accounts work school" },
      { id: "accounts/backup", title: "Windows backup", desc: "Back up your files, apps, preferences", keys: "backup onedrive folders" },
    ],
  },
  {
    id: "time",
    label: "Time & language",
    icon: "time",
    pages: [
      { id: "time/datetime", title: "Date & time", desc: "Time zones, automatic clock settings, calendar display", keys: "date time zone clock" },
      { id: "time/language", title: "Language & region", desc: "Windows and some apps format dates and time based on your region", keys: "language region format keyboard" },
    ],
  },
  { id: "gaming", label: "Gaming", icon: "gaming", pages: [{ id: "gaming/gamemode", title: "Game Mode", desc: "Optimize your PC for play", keys: "game mode" }] },
  {
    id: "accessibility",
    label: "Accessibility",
    icon: "accessibility",
    pages: [
      { id: "accessibility/textsize", title: "Text size", desc: "Text size that appears throughout Windows and your apps", keys: "text size bigger larger font accessibility" },
      { id: "accessibility/pointer", title: "Mouse pointer and touch", desc: "Mouse pointer color, size", keys: "mouse pointer size color cursor" },
      { id: "accessibility/magnifier", title: "Magnifier", desc: "Magnifier view, zoom level, smoothing", keys: "magnifier zoom" },
      { id: "accessibility/colorfilters", title: "Color filters", desc: "Colorblindness filters, grayscale, inverted", keys: "color filters colorblind grayscale" },
      { id: "accessibility/contrast", title: "Contrast themes", desc: "Color themes for low vision, light sensitivity", keys: "contrast themes high contrast" },
      { id: "accessibility/narrator", title: "Narrator", desc: "Voice, verbosity, keyboard, braille", keys: "narrator screen reader" },
    ],
  },
  {
    id: "privacy",
    label: "Privacy & security",
    icon: "privacy",
    pages: [
      { id: "privacy/security", title: "Windows Security", desc: "Antivirus, browser, firewall, and network protection for your device", keys: "windows security defender antivirus virus firewall" },
      { id: "privacy/encryption", title: "Device encryption", desc: "Help protect your data", keys: "encryption bitlocker device encryption" },
      { id: "privacy/finddevice", title: "Find my device", desc: "Track your device if you think you've lost it", keys: "find my device lost" },
      { id: "privacy/location", title: "Location", desc: "App permissions", keys: "location privacy" },
      { id: "privacy/camera", title: "Camera", desc: "App permissions", keys: "camera privacy webcam" },
      { id: "privacy/microphone", title: "Microphone", desc: "App permissions", keys: "microphone privacy mic" },
    ],
  },
  {
    id: "update",
    label: "Windows Update",
    icon: "update",
    pages: [
      { id: "update/advanced", title: "Advanced options", desc: "Delivery optimization, optional updates, active hours", keys: "advanced update options other microsoft products" },
      { id: "update/history", title: "Update history", desc: "", keys: "update history installed updates" },
    ],
  },
];

export function settingsTitle(page: string): string {
  if (page === "home") return "Home";
  for (const c of SETTINGS_CATS) {
    if (c.id === page) return c.label;
    const p = c.pages.find((x) => x.id === page);
    if (p) return p.title;
  }
  if (page.startsWith("bluetooth/printers/")) return page.split("/")[2];
  if (page.startsWith("apps/default/")) return page.split("/").slice(2).join("/");
  if (page === "network/wifi/networks") return "Manage known networks";
  if (page === "network/wifi/props" || page === "network/ethernet/props") return "Hardware properties";
  if (page === "system/sound/input") return "Properties";
  return page;
}

export const catOf = (page: string) => page.split("/")[0];

/* ------------------------------------------------------------------ */
/* Defaults for hardware, network, apps                                */
/* ------------------------------------------------------------------ */

export const DEFAULT_SPECS: WinSpecs = {
  deviceName: "OFFICE-PC-07",
  processor: "12th Gen Intel(R) Core(TM) i5-12500   3.00 GHz",
  ram: "16.0 GB (15.7 GB usable)",
  deviceId: "5D2E8A41-7C3B-4E19-9A6F-2B71C0D4E833",
  productId: "00330-80000-00000-AA412",
  systemType: "64-bit operating system, x64-based processor",
  pen: "No pen or touch input is available for this display",
  edition: "Windows 11 Pro",
  version: "24H2",
  installedOn: "3/12/2025",
  osBuild: "26100.4061",
  model: "Fabrikam ProDesk 400 G9",
  storage: "477 GB",
  storageUsed: "186 GB",
  diskModel: "Fabrikam NVMe SSD 512GB",
  diskType: "SSD (NVMe)",
  gpu: "Intel(R) UHD Graphics 770",
  gpuMemory: "7.9 GB",
  cores: "6",
  logical: "12",
  baseSpeed: "3.00 GHz",
  memSpeed: "3200 MT/s",
  memSlots: "2 of 2",
  battery: "",
};

export const DEFAULT_NET: WinNet = {
  type: "ethernet",
  ssid: "Office-Staff",
  ip: "192.168.1.42",
  subnet: "255.255.255.0",
  gateway: "192.168.1.1",
  dns: "192.168.1.1",
  mac: "3C-52-82-4A-19-7E",
  linkSpeed: "1000/1000 (Mbps)",
  publicIp: "203.0.113.24",
  networks: [
    { ssid: "Office-Staff", secure: true, signal: 4 },
    { ssid: "Office-Guest", secure: true, signal: 3 },
    { ssid: "DIRECT-7A-Printer", secure: true, signal: 2 },
  ],
  vpns: [],
  hosts: {
    "google.com": "142.250.80.46",
    "www.google.com": "142.250.80.100",
    "bing.com": "13.107.21.200",
    "www.bing.com": "13.107.21.200",
    "microsoft.com": "20.70.246.20",
    "office.com": "13.107.6.156",
    "outlook.office.com": "52.96.165.18",
    "onedrive.live.com": "13.107.42.13",
    "cnn.com": "151.101.3.5",
  },
  down: [],
  nxdomain: [],
  connected: true,
};

export const DEFAULT_APPS: WinApp[] = [
  { name: "Microsoft Edge", publisher: "Microsoft Corporation", version: "141.0.3537.71", size: "", installed: "10/16/2026" },
  { name: "Microsoft 365 Apps for business - en-us", publisher: "Microsoft Corporation", version: "16.0.19127.20154", size: "2.41 GB", installed: "9/30/2026" },
  { name: "Microsoft OneDrive", publisher: "Microsoft Corporation", version: "25.170.0907.0003", size: "421 MB", installed: "10/2/2026" },
  { name: "Microsoft Teams", publisher: "Microsoft Corporation", version: "25255.703.3961.6290", size: "312 MB", installed: "9/21/2026" },
  { name: "Notepad", publisher: "Microsoft Corporation", version: "11.2507.26.0", size: "3.24 MB", installed: "8/14/2026" },
  { name: "Calculator", publisher: "Microsoft Corporation", version: "11.2502.2.0", size: "88.0 KB", installed: "3/12/2025" },
  { name: "Snipping Tool", publisher: "Microsoft Corporation", version: "11.2508.24.0", size: "4.71 MB", installed: "9/2/2026" },
  { name: "Microsoft Photos", publisher: "Microsoft Corporation", version: "2025.11080.21001.0", size: "62.3 MB", installed: "9/12/2026" },
  { name: "Paint", publisher: "Microsoft Corporation", version: "11.2508.361.0", size: "2.27 MB", installed: "9/2/2026" },
  { name: "Windows Security", publisher: "Microsoft Corporation", version: "1000.26100.1.0", size: "", installed: "3/12/2025" },
  { name: "Microsoft Store", publisher: "Microsoft Corporation", version: "22508.1401.11.0", size: "31.7 MB", installed: "9/18/2026" },
];

export const DEFAULT_STARTUP: WinStartup[] = [
  { name: "Microsoft OneDrive", publisher: "Microsoft Corporation", on: true, impact: "High" },
  { name: "Microsoft Teams", publisher: "Microsoft", on: true, impact: "High" },
  { name: "Windows Security notification icon", publisher: "Microsoft Corporation", on: true, impact: "Low" },
  { name: "Microsoft Edge", publisher: "Microsoft Corporation", on: false, impact: "Not measured" },
];

export const BACKGROUND_PROCESSES: WinProcess[] = [
  { name: "Antimalware Service Executable", cpu: "0.4%", mem: "142.6 MB", background: true },
  { name: "Microsoft OneDrive", cpu: "0%", mem: "38.2 MB", background: true },
  { name: "Microsoft Teams (work or school)", cpu: "0.2%", mem: "211.4 MB", background: true },
  { name: "Windows Explorer", cpu: "0.6%", mem: "96.1 MB", background: true },
  { name: "Desktop Window Manager", cpu: "1.1%", mem: "58.7 MB", background: true },
  { name: "Service Host: Network Service", cpu: "0%", mem: "9.4 MB", background: true },
  { name: "Spooler SubSystem App", cpu: "0%", mem: "6.8 MB", background: true },
];

export const APP_MEM: Record<string, string> = {
  explorer: "64.2 MB",
  edge: "412.8 MB",
  edgeprivate: "188.3 MB",
  settings: "41.5 MB",
  word: "186.9 MB",
  excel: "164.3 MB",
  powerpoint: "201.7 MB",
  outlook: "238.4 MB",
  teams: "286.1 MB",
  notepad: "21.6 MB",
  calculator: "18.2 MB",
  taskmgr: "38.9 MB",
  cmd: "6.1 MB",
  snip: "44.7 MB",
  security: "29.3 MB",
  photos: "92.5 MB",
  paint: "37.8 MB",
  store: "71.4 MB",
  clock: "24.0 MB",
  camera: "51.2 MB",
  printqueue: "14.6 MB",
  onedrive: "38.2 MB",
  devmgmt: "12.4 MB",
  scan: "33.9 MB",
};

export const DEFAULT_PRINTERS: WinPrinter[] = [
  { name: "Microsoft Print to PDF", kind: "pdf", status: "Idle" },
  { name: "OneNote (Desktop)", kind: "printer", status: "Idle" },
];

export const DEFAULT_DEVICES: WinDevice[] = [
  { name: "USB Keyboard", kind: "keyboard", connected: true },
  { name: "USB Optical Mouse", kind: "mouse", connected: true },
];

export const WALLPAPERS: Record<string, string> = {
  Bloom: "radial-gradient(ellipse at 62% 58%, #a9d4ff 0%, #4f8fe8 22%, #1d5bd6 42%, #0f3a9c 64%, #0a2466 100%)",
  Glow: "radial-gradient(circle at 50% 60%, #fbd3ff 0%, #b98cf7 25%, #6a5ee8 50%, #2c2c8f 80%, #15154d 100%)",
  "Captured Motion": "linear-gradient(135deg, #0c1c3a 0%, #1f4f7a 35%, #3fa1c8 60%, #f0b27a 85%, #f7d9a6 100%)",
  Sunrise: "linear-gradient(180deg, #f6c6a0 0%, #f39a7a 30%, #c86a8a 55%, #5b4b8a 80%, #24305e 100%)",
  Flow: "linear-gradient(160deg, #e8f4ff 0%, #b9dcf7 30%, #7fb8e8 55%, #4a8fd1 80%, #2d6bb5 100%)",
};

/** Default dates for the clock (sims are fixed to Tuesday, October 20, 2026). */
export const NOW = { time: "9:41 AM", date: "10/20/2026", long: "Tuesday, October 20" };
