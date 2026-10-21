/**
 * Google Workspace (Drive, Docs, Sheets, Slides) document model.
 *
 * One sim document holds the whole browser session: the Drive tree, which
 * surface is showing, and the file open in the editor. A file's `content` is
 * a WordDoc (Docs), ExcelBook (Sheets) or PptDeck (Slides), so the Word,
 * Excel and PowerPoint models do the editing.
 *
 * Selection keys (ui.selection)
 *   Drive    "file:<id>"            a file or folder in the list ("file:f1,file:f2" several)
 *   Docs     Word keys              "p3", "p3.r1", "p2,p3", "all", "tbl1.r2c1", "header", "footer"
 *   Sheets   Excel keys             "B4", "A1:D1", "B:B", "3:3", "chart:c1" (ui.sheet is the tab in view)
 *   Slides   PowerPoint keys        "s2", "s2.title", "s2.body", "s2.notes", "s2.o1" (ui.slide is the slide in view)
 *   any      "comment:<id>"         a comment card (margin or Comments panel)
 *            "ver:<id>"             a version in Version history ("ver:current" is the current version)
 *   Suggestions are accepted or rejected from their margin card, which selects
 *   the paragraph the suggestion is in ("p4"), then commits review.accept /
 *   review.reject (Tools › Review suggested edits › Accept all: value "Accept all").
 *
 * Type targets (text committed with Enter or a button)
 *   "p3", "p3.r1", "tbl1.r1c2", "header", "footer"   Docs text (Word engine)
 *   "B4", "sheet:Sheet1", "chart:c1.title"           Sheets (Excel engine)
 *   "s2.title", "s2.body", "s2.notes", "s2.o1"       Slides (PowerPoint engine)
 *   "rename:<fileId>"       renaming a file (title box in an editor, or Drive › Rename)
 *   "newfolder:<parentId>"  New › New folder ("root" is My Drive)
 *   "comment"               a new comment on the current selection
 *   "assign:<email>"        a new comment with "Assign to" checked for that person
 *   "reply:<commentId>"     a reply in a comment thread
 *   "vername:<versionId>"   naming a version in Version history ("vername:current" names the current version)
 *   "filterview:<id>"       renaming a filter view
 *   "note:<cell>"           a note on a cell (Insert › Note)
 *   "signin:email"          the Email or phone box on the sign-in page
 *   "signin:password"       the Enter your password box
 *   "signin:code"           a 2-Step Verification code (Try another way › Get a verification code)
 *
 * Smart chips in Docs are runs with `chip` (see GRun): `@` on a selected paragraph or
 * Insert › Smart chips opens a picker that commits the g.chip dialog
 * ({ kind: "person" | "date" | "file", value: email | date label | file id }).
 * The chip is added at the end of the selected paragraph (or after the selected run).
 *
 * Commands and dialogs are listed in core.ts.
 */
import type { ExcelBook, PptDeck, SimValue, WordDoc, WordRun } from "@/types/sim";

/**
 * "home" is an app's home screen (docs.google.com, sheets.google.com, slides.google.com:
 * Start a new …, the template strip and recent files), shown in the first browser tab
 * in place of Drive; `GoogleDoc.homeApp` says which app. "signin" is the Google
 * sign-in page (accounts.google.com), shown after Sign out or when a sim starts
 * signed out; `flags.signin` is the step ("chooser" | "email" | "password" | "2sv" | "code").
 */
export type GSurface = "drive" | "docs" | "sheets" | "slides" | "home" | "signin";
export type GHomeApp = "docs" | "sheets" | "slides";
export type GRole = "Viewer" | "Commenter" | "Editor";
export type GAccess = "Restricted" | "Organization" | "Anyone with the link";
export type GMode = "Editing" | "Suggesting" | "Viewing";

export type GKind =
  | "folder"
  | "doc"
  | "sheet"
  | "slides"
  | "form"
  | "pdf"
  | "image"
  | "word"
  | "excel"
  | "powerpoint"
  | "text"
  | "video"
  | "shortcut";

export type GPerson = {
  name: string;
  email: string;
  /** Avatar color; picked from the name when omitted. */
  color?: string;
};

export type GShare = {
  email: string;
  role: GRole;
  /** Access expiry, YYYY-MM-DD. */
  expires?: string;
};

export type GSharing = {
  people?: GShare[];
  /** General access. "Organization" means everyone in `GoogleDoc.org`. */
  access?: GAccess;
  /** What the general access grants. */
  linkRole?: GRole;
};

export type GComment = {
  id: string;
  /** Editor selection key the comment is anchored to ("p3", "p3.r2", "B4", "s2", "s2.o1"). */
  anchor: string;
  author: string;
  time?: string;
  text: string;
  replies?: { author: string; time?: string; text: string }[];
  resolved?: boolean;
  /** Email of the person the comment is assigned to. */
  assignee?: string;
};

export type GContent = WordDoc | ExcelBook | PptDeck;

/** A smart chip in a Docs paragraph. `ref` is the person's email, the file id, or the date text. */
export type GChip = { kind: "person" | "date" | "file"; label: string; ref?: string };

/** A Docs run that is a suggestion (`ins` or `del`) records who suggested it; a smart chip carries `chip`. */
export type GRun = WordRun & { author?: string; time?: string; chip?: GChip };

export type GVersion = {
  id: string;
  /** "October 18, 2:14 PM" */
  time: string;
  author: string;
  name?: string;
  /** The file's content at that version. */
  content: GContent;
};

export type GProtected = {
  id: string;
  sheet: string;
  range: string;
  description?: string;
  /** "warning" shows a warning before an edit; "restricted" limits editing to `editors`. */
  mode: "warning" | "restricted";
  editors?: string[];
};

export type GFilterView = {
  id: string;
  name: string;
  sheet: string;
  range: string;
  /** Criteria by column letter, in the Excel engine's filterValues syntax. */
  values?: Record<string, string[]>;
  /** A new filter view is temporary until Save view (then it is named and kept). */
  saved?: boolean;
};

/** A shared drive (Workspace accounts). Files inside it have `parent` = the drive id. */
export type GSharedDrive = { id: string; name: string };

export type GFile = {
  id: string;
  name: string;
  kind: GKind;
  /** Folder id, "root" for My Drive. Omitted: in Shared with me only (someone else's file you have not added to your Drive). */
  parent?: string;
  /** Owner's email; you when omitted. */
  owner?: string;
  /** Shown in Drive's Last modified column, e.g. "Oct 14, 2026" or "10:42 AM". */
  modified?: string;
  modifiedBy?: string;
  size?: string;
  starred?: boolean;
  trashed?: boolean;
  /** For kind "shortcut": the file it points to. */
  shortcutTo?: string;
  sharing?: GSharing;
  /** WordDoc for "doc", ExcelBook for "sheet", PptDeck for "slides". Created empty when missing. */
  content?: GContent;
  comments?: GComment[];
  /** Earlier versions, newest first. The current version is `content`. */
  versions?: GVersion[];
  /** Name and time of the current version (File › Version history › Name current version). */
  current?: { name?: string; time?: string; author?: string };
  protected?: GProtected[];
  filterViews?: GFilterView[];
  description?: string;
  /** Folder color. */
  color?: string;
};

export type GoogleDoc = {
  surface: GSurface;
  /** The signed-in account. Default: BEOC Student. */
  me?: GPerson;
  /** Directory used by the Share box and @mentions. */
  people?: GPerson[];
  /** The Workspace organization (General access › <org name>). */
  org?: { name: string; domain: string };
  /** Every folder and file in the session. */
  files: GFile[];
  /** Id of the file open in the editor. */
  open?: string;
  /** Editor tabs open in the browser, by file id. */
  tabs?: string[];
  drive?: {
    /** Folder id, shared drive id, or a section: "root" (My Drive), "home", "shareddrives", "shared", "recent", "starred", "spam", "trash", "storage", "computers". */
    location?: string;
    layout?: "list" | "grid";
    details?: boolean;
    /** The search committed with Enter in Search in Drive (g.search). */
    query?: string;
    /** Filter chips under the search box (g.filter "Type=Spreadsheets", "People=<email>", "Modified=Last 7 days", "Location=My Drive"). */
    chips?: { type?: string; people?: string; modified?: string; location?: string };
  };
  /** Which app's home screen is showing when surface is "home". */
  homeApp?: GHomeApp;
  /** Shared drives (Workspace accounts only). */
  sharedDrives?: GSharedDrive[];
  /** Files on this computer, offered by File upload. */
  computer?: string[];
  /** Docs editing mode. */
  mode?: GMode;
  /** Editor side panel ("Explore", "Comments", "Themes", "Motion", "Chart editor", …) or dialog shown by the canvas. */
  pane?: string | null;
  /** Full-window view over the editor: "history" (Version history). */
  overlay?: string | null;
  /** Short confirmation shown at the bottom left ("Link copied"). */
  toast?: string | null;
  flags?: Record<string, SimValue>;
};

/** Type helper for sim files: `initial: googleDoc({ ... })`. */
export const googleDoc = (d: GoogleDoc) => d as unknown as Record<string, unknown>;
