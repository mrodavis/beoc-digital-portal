/**
 * Windows 11 practice simulator: document model.
 *
 * Everything the learner can change lives in this JSON document, including
 * which windows are open and where each window is (folder, Settings page,
 * browser tab). Navigation is done with free commands, so exploring never
 * counts as a miss; changes (move, rename, delete, a setting) are judged.
 *
 * PATHS
 *   A file-system path starts with a root's `name` and uses "/":
 *   "Documents/Billing/Invoice 1042.pdf", "OneDrive/Cloud Practice",
 *   "USB Drive (E:)/Roster.xlsx". Special Explorer locations: "Home",
 *   "This PC", "Recycle Bin", "Network".
 *
 * SELECTION KEYS (ui.selection)
 *   file:<path>               an item selected in File Explorer, on the desktop
 *                             or in the OneDrive / Google Drive web view
 *   file:<a>,file:<b>         several items (Ctrl+click, Shift+click, Ctrl+A)
 *   bin:<name>                an item in the Recycle Bin
 *   proc:<name>               a row on Task Manager's Processes page
 *   startup:<name>            a startup app (Task Manager or Settings › Apps › Startup)
 *   job:<document>            a job in a printer's queue
 *   page:<url>                the page a browser command acts on (set by the
 *                             canvas just before Add to favorites, Report unsafe site)
 *
 * TYPE TARGETS (kind: "type")
 *   <path>                    rename in place; the value is the full new name
 *                             ("New folder (2)" is reported as "New folder")
 *   notepad:<path>            Notepad saved this text to that file (match "includes"/"all")
 *   form:<id>                 a web form was submitted; value is
 *                             "Label: value | Label: value" (use match "all")
 *
 * COMMANDS (all emitted by the canvas)
 *   Free (never a miss): win.open/focus/minimize/maximize/restore/close (value: app id),
 *   win.snap ("<app>:left|right|tl|tr|bl|br"), win.showDesktop, win.lock,
 *   win.unlock (PIN), win.taskView, vd.new, vd.switch (n), power.on,
 *   explorer.nav (path), explorer.back/forward/up/refresh, explorer.view, explorer.sort,
 *   explorer.sortDir, explorer.group, explorer.toggle (extensions|hidden|preview|details|checkboxes|navpane),
 *   explorer.search (query), fs.open (path), fs.cut, fs.copy, fs.undo, fs.selectAll,
 *   settings.nav (page id), settings.slide ("brightness=80" | "volume=40"), sec.nav,
 *   edge.nav (url), edge.search (query), edge.newTab, edge.closeTab (url), edge.tab (url),
 *   edge.back/forward/refresh, edge.pane (favorites|history|downloads|none), edge.siteInfo,
 *   edge.inPrivate, edge.smartBack, edge.favBar, cloud.open (path), cloud.view,
 *   taskmgr.tab, taskmgr.perf, cmd.run (text), snip.capture (mode), printer.queue (name),
 *   clip.open, notify.clear.
 *   Judged: fs.newFolder (parent path), fs.newFile (path of the new item),
 *   fs.move (destination), fs.copyTo (destination), fs.delete, fs.deletePermanent,
 *   fs.compress, fs.extract (destination), fs.pinQuick, fs.unpinQuick, fs.attr ("readonly=on"),
 *   od.keep, od.free, share.send ("email:view|edit|comment"), share.link ("anyone:view"),
 *   share.remove (email | "link"), share.perm ("email:edit"), share.expire ("email:7 days"),
 *   share.general ("restricted" | "anyone:view"), bin.restore, bin.restoreAll, bin.empty, bin.delete,
 *   settings.set ("key=value"), app.uninstall (name), startup.disable, startup.enable,
 *   taskmgr.endTask, printer.default/pause/resume/testPage/remove/add (printer name),
 *   printer.cancel (selection job:…), bt.add/remove/connect/disconnect (device),
 *   display.detect, net.connect/disconnect/forget (SSID), net.vpn/net.vpnOff (name),
 *   update.check, update.install, update.restart, acct.pin (new PIN), acct.password (new password),
 *   sec.scan (quick|full), sec.action (remove|quarantine|allow), edge.favorite (folder),
 *   edge.favFolder (name), edge.favRemove (url), edge.download (file), edge.dlKeep, edge.dlDelete,
 *   edge.dlOpen (file), edge.reportUnsafe, edge.smartContinue, edge.installApp (domain),
 *   edge.clearData (items), edge.historyDelete (url), web.set ("id=value"), cloud.restore (version),
 *   doc.accept / doc.reject (suggestion id), power.restart/sleep/shutdown/signout,
 *   taskbar.pin/unpin, start.pin/unpin (app id), snip.save (path).
 *   Clicks: { kind: "click", target: "web:<buttonId>" } for buttons on mock web pages.
 *
 * SETTINGS KEYS (settings.set "key=value"; see DEFAULT_SETTINGS in data.ts)
 *   display.scale, display.resolution, display.orientation, display.multi, display.main,
 *   nightlight, sound.output, sound.input, sound.mute, notifications.dnd, notifications.lock,
 *   power.screen, power.sleep, power.mode, wifi, bt, airplane, energySaver, theme, wallpaper,
 *   taskbar.align, taskbar.search, taskbar.taskview, taskbar.widgets, clipboard.history,
 *   access.textSize, access.magnifier, access.narrator, access.colorFilters, access.contrast,
 *   access.pointerSize, access.pointerStyle, privacy.encryption, privacy.location,
 *   privacy.camera, privacy.mic, privacy.findDevice, printer.manage, update.pause,
 *   update.otherProducts, update.notifyRestart, signin.away, signin.dynamic, time.auto,
 *   time.zone, time.region, sec.realtime, sec.cfa, sec.firewall.domain, sec.firewall.private,
 *   sec.firewall.public, sec.smartscreen, sec.tamper, mouse.primary, mouse.speed, mouse.scrollLines,
 *   net.profile, net.metered, edge.savePasswords, edge.popups, edge.trackers, od.backup.desktop,
 *   od.backup.documents, od.backup.pictures, default.browser, default.<.ext>, startup.<app>.
 */

export type WinSync = "cloud" | "local" | "always" | "syncing" | "error";
export type WinPerm = "view" | "comment" | "edit" | "owner";

export type WinShare = { email: string; name?: string; perm: WinPerm; expires?: string };

export type WinItem = {
  name: string;
  folder?: boolean;
  children?: WinItem[];
  /** Display size, e.g. "24 KB". */
  size?: string;
  /** Display date, e.g. "10/14/2026 9:12 AM". */
  modified?: string;
  created?: string;
  /** OneDrive status icon. */
  sync?: WinSync;
  shared?: WinShare[];
  /** "Anyone with the link" access: "anyone:view", "anyone:edit", "org:view", or null. */
  link?: string | null;
  /** Text shown in Notepad or the web document editor. */
  text?: string;
  /** Contents of a .zip file. */
  zip?: WinItem[];
  /** Version history (newest first). */
  versions?: { label: string; by?: string; current?: boolean; text?: string }[];
  /** Suggested edits in the web document editor. */
  suggestions?: { id: string; by: string; text: string; status?: "accepted" | "rejected" }[];
  comments?: { by: string; text: string }[];
  /** A desktop shortcut that opens an app. */
  app?: string;
  readonly?: boolean;
  hidden?: boolean;
  owner?: string;
};

export type WinRootKind = "desktop" | "documents" | "downloads" | "pictures" | "music" | "videos" | "onedrive" | "drive" | "usb" | "network" | "gdrive";

export type WinRoot = WinItem & {
  root: WinRootKind;
  /** Shown instead of the name in the navigation pane ("OneDrive - TOR Tech"). */
  label?: string;
  /** Drives: "476 GB" and "289 GB free". */
  capacity?: string;
  free?: string;
};

export type WinBinItem = { item: WinItem; from: string; deleted: string };

export type WinTab = {
  id: string;
  url: string;
  back?: string[];
  fwd?: string[];
  /** OneDrive / Google Drive web view: the folder being shown. */
  cloud?: string;
  /** Web document editor: the file being shown. */
  file?: string;
  /** SmartScreen pages the learner chose to continue to. */
  bypass?: boolean;
  /** Web drive section: My files, Recent, Shared, Recycle bin. */
  section?: string;
};

export type WinWindow = {
  /** One window per app; id === app. */
  id: string;
  app: string;
  min?: boolean;
  max?: boolean;
  snap?: string | null;
  desk?: number;
  /* File Explorer */
  loc?: string;
  back?: string[];
  fwd?: string[];
  view?: string;
  sort?: string;
  dir?: "asc" | "desc";
  search?: string;
  group?: string;
  /* Settings and Windows Security */
  page?: string;
  pback?: string[];
  /* Edge */
  tabs?: WinTab[];
  tab?: string;
  pane?: string | null;
  /* Task Manager */
  tm?: string;
  perf?: string;
  /* Notepad, Office apps, print queue, Photos */
  file?: string;
  text?: string;
  /* Command Prompt */
  out?: string[];
};

export type WinDownload = { name: string; size?: string; danger?: "unsafe" | "uncommon" };
export type WebResult = { title: string; url: string; snippet?: string; ad?: boolean; display?: string };
export type WebField = {
  name: string;
  label: string;
  type?: "text" | "password" | "email" | "select" | "checkbox" | "number";
  options?: string[];
  value?: string;
  placeholder?: string;
};

export type WebBlock =
  | { t: "h1" | "h2" | "h3" | "p" | "small"; text: string }
  | { t: "link"; text: string; href: string; download?: WinDownload; note?: string }
  | { t: "button"; id: string; text: string; goto?: string; toast?: string; style?: "primary" | "danger" | "default"; download?: WinDownload }
  | { t: "form"; id: string; title?: string; fields: WebField[]; submit: string; goto?: string; toast?: string }
  | { t: "toggle"; id: string; label: string; on?: boolean; note?: string }
  | { t: "select"; id: string; label: string; options: string[]; value?: string }
  | { t: "results"; items: WebResult[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "alert"; tone?: "info" | "warn" | "bad" | "ok"; text: string }
  | { t: "list"; items: string[]; ordered?: boolean }
  | { t: "product"; id: string; name: string; price: string; specs: string[]; button?: string; href?: string; badge?: string }
  | { t: "image"; label: string; glyph?: string }
  | { t: "hr" }
  | { t: "cols"; cols: WebBlock[][] };

export type WebPage = {
  title: string;
  /** false shows "Not secure" in the address bar. Default true. */
  secure?: boolean;
  /** Microsoft Defender SmartScreen blocks the page until the learner continues. */
  unsafe?: boolean;
  /** Brand shown in the page header. */
  site?: string;
  /** Header color. */
  color?: string;
  nav?: { text: string; href: string }[];
  blocks: WebBlock[];
};

export type WinSpecs = {
  deviceName: string;
  processor: string;
  ram: string;
  deviceId: string;
  productId: string;
  systemType: string;
  pen: string;
  edition: string;
  version: string;
  installedOn: string;
  osBuild: string;
  model: string;
  storage: string;
  storageUsed: string;
  diskModel: string;
  diskType: string;
  gpu: string;
  gpuMemory: string;
  cores: string;
  logical: string;
  baseSpeed: string;
  memSpeed: string;
  memSlots: string;
  battery: string;
};

export type WinNet = {
  /** How this PC is connected. */
  type: "ethernet" | "wifi";
  /** Connected Wi-Fi network. */
  ssid: string;
  ip: string;
  subnet: string;
  gateway: string;
  dns: string;
  mac: string;
  linkSpeed: string;
  publicIp: string;
  /** Wi-Fi networks in range. `key` makes the connect dialog ask for it. */
  networks: { ssid: string; secure?: boolean; key?: string; signal?: number; note?: string }[];
  vpns: { name: string; server: string; connected?: boolean }[];
  /** Name → IP for ping, nslookup and tracert. */
  hosts: Record<string, string>;
  /** Hosts that time out (ping) or don't resolve (nslookup). */
  down?: string[];
  nxdomain?: string[];
  connected?: boolean;
};

export type WinApp = { name: string; publisher?: string; version?: string; size?: string; installed?: string; id?: string };
export type WinStartup = { name: string; publisher?: string; on: boolean; impact?: string };
export type WinProcess = { name: string; cpu?: string; mem?: string; status?: string; app?: string; background?: boolean };
export type WinPrinter = {
  name: string;
  kind?: "printer" | "scanner" | "pdf" | "fax" | "mfp";
  status?: string;
  default?: boolean;
  paused?: boolean;
  jobs?: { name: string; owner?: string; pages?: number; status?: string; size?: string; submitted?: string }[];
};
export type WinDevice = {
  name: string;
  kind: "keyboard" | "mouse" | "headset" | "phone" | "speaker" | "watch" | "earbuds" | "camera" | "monitor" | "usb" | "printer" | "other";
  connected?: boolean;
  battery?: string;
  bt?: boolean;
};

export type WinDoc = {
  user?: { name: string; email?: string; org?: string };
  locked?: boolean;
  /** Sign-in PIN (default "2468"). */
  pin?: string;
  password?: string;
  power?: "on" | "off" | "sleep";
  fs: WinRoot[];
  recycle?: WinBinItem[];
  clipboard?: { mode: "cut" | "copy"; paths: string[] } | null;
  /** Clipboard history (Win+V), newest first. */
  clips?: string[];
  windows: WinWindow[];
  /** Focused window id, or null for the desktop. */
  focus?: string | null;
  /** Virtual desktops: current and count. */
  desk?: number;
  desks?: number;
  /** Pinned taskbar apps, left to right. */
  taskbar?: string[];
  startPins?: string[];
  /** Recommended files in Start and Recent in File Explorer (paths). */
  recent?: string[];
  /** Pinned to Quick access (paths). */
  quick?: string[];
  /** Overrides of DEFAULT_SETTINGS. */
  settings?: Record<string, string>;
  specs?: Partial<WinSpecs>;
  net?: Partial<WinNet>;
  /** Installed apps (Settings › Apps › Installed apps); defaults are added. */
  apps?: WinApp[];
  startup?: WinStartup[];
  processes?: WinProcess[];
  printers?: WinPrinter[];
  devices?: WinDevice[];
  /** Bluetooth devices that show up in Add a device. */
  nearby?: string[];
  /** Second monitor connected (Display shows 1 and 2). */
  displays?: number;
  updates?: { name: string; kind?: string; status?: string }[];
  security?: { threats?: { name: string; file: string; severity: string; status?: string }[]; scanned?: string; history?: string[] };
  /** Mock web pages, keyed by URL without protocol or "www." ("irs.gov/forms"). */
  web?: Record<string, WebPage>;
  /** Search results by query (lowercase). */
  search?: Record<string, WebResult[]>;
  favorites?: { name: string; url: string; folder?: string }[];
  favFolders?: string[];
  showFavBar?: boolean;
  history?: { title: string; url: string; when: string }[];
  downloads?: { name: string; size?: string; danger?: string; status?: string; url?: string }[];
  /** Web drives shown in Edge: onedrive.live.com and/or drive.google.com. */
  clouds?: { host: string; provider: "onedrive" | "gdrive"; root: string }[];
  /** Installed web apps (Edge › Apps › Install this site as an app). */
  webApps?: { name: string; url: string }[];
  /** Key → value for toggles, selects and forms on mock web pages. */
  webState?: Record<string, string>;
  notifications?: { app: string; title: string; text: string; time?: string }[];
  toast?: { title: string; text: string; n?: number } | null;
  /** Free-form flags the canvas shows (reported pages, last scan, etc.). */
  flags?: Record<string, string | number | boolean>;
  /** The item just created (it opens in rename mode). */
  fresh?: string | null;
  undo?: { fs: WinRoot[]; recycle: WinBinItem[] }[];
  /** Items hidden by Show desktop, restored when it is pressed again. */
  peek?: string[] | null;
  /** The last snip taken. */
  snip?: { mode: string; of: string } | null;
};

/** Use in sim files: `initial: winDoc({ ... })`. */
export const winDoc = (d: WinDoc) => d as unknown as Record<string, unknown>;
