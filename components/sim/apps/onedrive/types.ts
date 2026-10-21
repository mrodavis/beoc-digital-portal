/**
 * Microsoft OneDrive practice simulator: document model.
 *
 * One sim document holds a whole OneDrive session: the signed-in account,
 * every file and folder (with sharing, versions and Recycle bin state), which
 * surface is showing, and the PC the OneDrive sync app runs on.
 *
 * SURFACES (doc.surface)
 *   "web"       OneDrive on the web in a browser tab (work or school, or personal account)
 *   "viewer"    a file open in Word for the web, or in the Word desktop app (doc.viewer.app)
 *   "explorer"  File Explorer on the PC, with the OneDrive folder, the taskbar
 *               OneDrive icon (activity center) and OneDrive settings
 *
 * LOCATIONS (doc.view.location, changed with the free command od.go)
 *   "home" | "root" (My files) | <folder id> | "shared" | "favorites" | "people" | "person:<email>"
 *   | "meetings" | "meeting:<id>" | "media" | "photos" | "recycle" | "restore" (Restore your OneDrive)
 *   | "lib:<libraryId>" (a Quick access library) | "search"
 *   Explorer locations (doc.pc.location, free command od.exp.nav): "onedrive" | <folder id> |
 *   "Desktop" | "Documents" | "Pictures" | "This PC"
 *
 * SELECTION KEYS (ui.selection)
 *   "item:<id>"              a file or folder (web list, Recycle bin, File Explorer); "item:a,item:b" several
 *   "comment:<id>"           a comment thread in the viewer
 *   "para:<paraId>"          a paragraph in the viewer (where a new comment goes)
 *   ""                       nothing
 *   Commands that act on an item set the selection to it first, so a step can
 *   use `requires: { selection: "item:<id>" }` with a selectHint.
 *
 * JUDGED COMMITS: dialog commits with named values, so a task checks only the
 * values it cares about. File/folder values are item ids ("root" = My files).
 *   od.newFolder      { parent, name }
 *   od.newFile        { folder, kind: "Word document" | "Excel workbook" | "PowerPoint presentation", name }
 *   od.upload         { folder, file }            file = names chosen on the computer, sorted, "; "
 *   od.rename         { file, name }              full new name, extension included
 *   od.move / od.copy { file, folder }            file = ids sorted ","
 *   od.delete         { file }                    (to the Recycle bin)
 *   od.favorite       { file, on: true | false }
 *   od.download       { file }
 *   od.share          { file, people, permission, message }   Share › Send; people = emails sorted "; "
 *   od.link           { file, scope, permission, people, expiration, hasExpiration, password }   Copy (a link)
 *                     scope: "Anyone" | "Organization" | "Existing" | "People you choose"
 *                     permission: "Can edit" | "Can view" | "Can review" | "Can't download"
 *                     expiration: "" or "YYYY-MM-DD"; password: true | false
 *   od.access         { file, person, permission }   Manage access › People: "Can edit" | "Can view" | "Remove direct access"
 *   od.removeLink     { file, link }              link id
 *   od.stopSharing    { file }
 *   od.restoreVersion { file, version }           version id
 *   od.restore        { file }                    Recycle bin › Restore (ids sorted ",")
 *   od.purge          { file }                    Recycle bin › Delete (permanent)
 *   od.emptyBin       {}
 *   od.restoreOneDrive { date: "Yesterday" | "One week ago" | "Three weeks ago" | "Custom date and time", from }
 *   od.shortcut       { file }                    Add shortcut to My files (a shared folder)
 *   od.removeShortcut { file }
 *   od.vault          { action: "unlock" | "lock", method }
 *   od.keep / od.free { file }                    File Explorer: Always keep on this device / Free up space
 *   od.pause          { hours: 2 | 8 | 24 }       od.resume {}
 *   od.backup         { Desktop, Documents, Pictures }  (true/false each, Manage backup › Save changes)
 *   od.fod            { action: "Free up disk space" | "Download all files" }
 *   od.autosave       { file, on }                Word desktop AutoSave switch
 *   od.mode           { file, mode: "Editing" | "Reviewing" | "Viewing" }
 *   od.resolve        { comment }                 resolve a comment thread
 * TYPE COMMITS
 *   "comment:<fileId>.<paraId>"   a new comment on a paragraph (value: text, may contain "@Full Name")
 *   "reply:<commentId>"           a reply in a comment thread
 * FREE COMMANDS (navigation, never a miss)
 *   od.go (location), od.open (file id; Word for the web), od.openApp (file id; the Word app), od.close, od.layout ("list" | "tiles"), od.details,
 *   od.search (query), od.sort, od.surface ("web" | "explorer" | "viewer"), od.sharedTab ("with" | "by"),
 *   od.exp.nav (Explorer location), od.toast, od.help, od.pane (viewer pane: "comments" | "")
 */
import type { SimValue } from "@/types/sim";

export type OdKind = "folder" | "word" | "excel" | "powerpoint" | "pdf" | "image" | "video" | "text" | "onenote" | "zip" | "vault";
export type OdPerm = "Can edit" | "Can view" | "Can review" | "Can't download";
export type OdScope = "Anyone" | "Organization" | "Existing" | "People you choose";
export type OdSync = "cloud" | "local" | "always" | "syncing" | "error";

export type OdPerson = {
  name: string;
  email: string;
  title?: string;
  /** Avatar color; picked from the name when omitted. */
  color?: string;
};

export type OdLink = {
  id: string;
  scope: OdScope;
  perm: OdPerm;
  /** For "People you choose" links. */
  people?: string[];
  /** YYYY-MM-DD */
  expires?: string;
  password?: boolean;
};

export type OdVersion = {
  id: string;
  /** "3.0" */
  label: string;
  /** "October 19, 2026 4:12 PM" */
  modified: string;
  /** Email or display name. */
  by: string;
  size?: string;
  /** The document's paragraphs at that version. */
  text?: string[];
};

export type OdComment = {
  id: string;
  /** Paragraph id ("p2") the comment is attached to. */
  para?: string;
  author: string;
  time?: string;
  text: string;
  replies?: { author: string; time?: string; text: string }[];
  resolved?: boolean;
};

export type OdItem = {
  id: string;
  name: string;
  kind: OdKind;
  /** "root" (My files), a folder id, or "lib:<id>" (a library). Omitted: someone else's item shared with you. */
  parent?: string;
  /** Owner's email; you when omitted. */
  owner?: string;
  /** Display date: "October 19", "Yesterday at 4:12 PM", "2 hours ago". */
  modified?: string;
  modifiedBy?: string;
  size?: string;
  favorite?: boolean;
  /** People with direct access (besides the owner). */
  access?: { email: string; perm: OdPerm }[];
  links?: OdLink[];
  /** In the Recycle bin. */
  deleted?: { on: string; by?: string };
  /** Permanently deleted (kept so Restore your OneDrive cannot bring it back). */
  purged?: boolean;
  /** Version label of the current version ("4.0"). */
  version?: string;
  /** Earlier versions, newest first. */
  versions?: OdVersion[];
  /** Document paragraphs for the viewer (ids p1, p2, …). */
  text?: string[];
  comments?: OdComment[];
  /** People editing the file right now (presence in the viewer). */
  coauthors?: { email: string; para?: string }[];
  /** OneDrive sync status in File Explorer. */
  sync?: OdSync;
  /** Why a file has a sync problem (shown in the activity center). */
  syncError?: string;
  /** A shortcut in My files to a shared folder. */
  shortcutTo?: string;
  /** Where it was shared with you ("Teams chat with Ana Ruiz", "Email from …"). */
  sharedVia?: string;
  /** Meetings view: the meeting it was shared in. */
  meeting?: string;
  /** Photos/Media: date taken. */
  taken?: string;
  /** Explorer: this item came from a PC folder backed up to OneDrive. */
  backedUpFrom?: string;
};

export type OdActivity = {
  id: string;
  /** "Today 9:42 AM" */
  time: string;
  /** Days before today (0 = today); used by the date presets. */
  daysAgo: number;
  text: string;
  file: string;
  /** How Restore your OneDrive undoes it. */
  undo: { op: "rename"; name: string; text?: string[] } | { op: "undelete" } | { op: "remove" } | { op: "text"; text: string[] };
};

export type OdLibrary = {
  id: string;
  name: string;
  /** "SharePoint site" or "Team" */
  kind?: string;
};

export type OdMeeting = { id: string; title: string; when: string; files: string[] };

export type OdLocalFile = { name: string; size?: string; modified?: string; folder?: boolean; children?: OdLocalFile[] };

export type OdPc = {
  name?: string;
  /** Explorer location. */
  location?: string;
  /** Sync paused for this many hours (null: syncing). */
  paused?: number | null;
  backup?: { Desktop?: boolean; Documents?: boolean; Pictures?: boolean };
  /** Files On-Demand choice under Advanced settings. */
  fod?: "Free up disk space" | "Download all files";
  /** Files in the PC's own folders (before backup). */
  local?: { Desktop?: OdLocalFile[]; Documents?: OdLocalFile[]; Pictures?: OdLocalFile[] };
  /** Disk space shown in This PC. */
  free?: string;
};

export type OneDriveDoc = {
  surface: "web" | "viewer" | "explorer";
  account: "work" | "personal";
  me: OdPerson;
  /** Work or school organization. */
  org?: {
    name: string;
    domain: string;
    /** Admins allow "Anyone" links (default true). */
    anyone?: boolean;
    /** Link type a new link starts with (default "Organization" for work, "Anyone" for personal). */
    defaultScope?: OdScope;
    defaultPerm?: OdPerm;
  };
  /** Directory for the Share box and @mentions. */
  people?: OdPerson[];
  items: OdItem[];
  libraries?: OdLibrary[];
  meetings?: OdMeeting[];
  activities?: OdActivity[];
  /** Files and folders on the computer, offered by Files upload / Folder upload. */
  computer?: OdLocalFile[];
  view?: {
    location?: string;
    layout?: "list" | "tiles";
    details?: boolean;
    sharedTab?: "with" | "by";
    search?: string;
    sort?: string;
  };
  viewer?: {
    file: string;
    /** "web" (Word for the web, default) or "desktop" (Word app). */
    app?: "web" | "desktop";
    mode?: "Editing" | "Reviewing" | "Viewing";
    autosave?: boolean;
    pane?: string | null;
  };
  /** Personal Vault (personal accounts). */
  vault?: { locked: boolean };
  storage?: { used: string; total: string; percent?: number };
  pc?: OdPc;
  /** Short confirmation at the bottom ("Link copied"). */
  toast?: string | null;
  /** Restore your OneDrive finished. */
  restored?: string | null;
  seq?: number;
  flags?: Record<string, SimValue>;
};

/** Type helper for sim files: `initial: odDoc({ ... })`. */
export const odDoc = (d: OneDriveDoc) => d as unknown as Record<string, unknown>;
