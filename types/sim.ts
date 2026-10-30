/**
 * Click-through practice simulations ("sims").
 *
 * A sim is a small, faithful mock of an application (Word, Excel, PowerPoint,
 * and later File Explorer, a browser, Outlook) plus a list of tasks. The
 * learner works the mock the way they would work the real app: switch Ribbon
 * tabs, select text or cells, open dropdowns and dialogs, type, use keyboard
 * shortcuts. Only *committing* actions are checked against the current task —
 * opening a tab, selecting, or browsing a menu is free, exactly as in GMetrix.
 *
 * Everything in a SimDefinition is plain JSON (no functions), because the
 * definition is passed from a server component to the client player.
 */

export type SimApp = "word" | "excel" | "powerpoint" | "windows" | "outlook" | "teams" | "typing" | "assistant" | "access" | "google" | "ehr" | "onedrive" | "outlook-new" | "gmail";

/** Apps whose document model lives in their own folder (components/sim/apps/<app>/types.ts). */
export type ExtraSimApp = "windows" | "outlook" | "teams" | "typing" | "assistant" | "access" | "google" | "ehr" | "onedrive" | "outlook-new" | "gmail";

export type SimValue = string | number | boolean;

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

/**
 * A committing action. The app UI emits these; the player compares them with
 * the current step.
 *
 * - command: a Ribbon/backstage/context-menu command or keyboard shortcut,
 *   with an optional value (font size "14", style "Heading 1", layout
 *   "Two Content"). Keyboard shortcuts emit the same id as their button.
 * - dialog:  OK pressed in a dialog, with the field values.
 * - type:    text committed into a target (paragraph id, cell ref,
 *            placeholder such as "s2.title").
 * - click:   a click on a canvas object that is itself the task
 *            (a hyperlink, a slide in Slide Show, a file in Open).
 * - select:  not emitted by the UI; a step whose goal is a selection
 *            completes as soon as the selection matches.
 */
export type SimAction =
  | { kind: "command"; id: string; value?: SimValue | SimValue[] }
  | { kind: "dialog"; id: string; values?: Record<string, SimValue | SimValue[]> }
  | {
      kind: "type";
      target: string;
      value: string | string[];
      /**
       * exact     – whole text equal (case-insensitive, whitespace collapsed)
       * includes  – committed text contains the value
       * formula   – compare as an Excel formula (spaces and case ignored,
       *             "$" ignored unless `strictRefs`)
       * all       – committed text contains every string in `value`
       *             (prompt-writing and email tasks: "mentions the date,
       *             the time and the location")
       * similar   – close enough to the (first) value, by character
       *             similarity ≥ `threshold` (default 0.95): typing drills
       */
      match?: "exact" | "includes" | "formula" | "all" | "similar";
      strictRefs?: boolean;
      threshold?: number;
    }
  | { kind: "click"; target: string }
  | { kind: "select"; target: string | string[] };

/** What the UI actually emitted. */
export type SimCommit =
  | { kind: "command"; id: string; value?: SimValue }
  | { kind: "dialog"; id: string; values: Record<string, SimValue> }
  | { kind: "type"; target: string; value: string }
  | { kind: "click"; target: string };

/* ------------------------------------------------------------------ */
/* State edits                                                         */
/* ------------------------------------------------------------------ */

/**
 * Declarative edits applied after a step succeeds, for anything the app's
 * built-in command handling doesn't already do (insert a table with these
 * rows, add a comment, place a picture).
 *
 * Paths are dot-separated. A segment that names an array is resolved by
 * matching an element's `id` (or `name` for Excel sheets), falling back to a
 * numeric index: "paragraphs.p3.align", "sheets.Q1.cells.B6",
 * "slides.s2.objects".
 */
export type SimOp =
  | { op: "set"; path: string; value: unknown }
  | { op: "merge"; path: string; value: Record<string, unknown> }
  | {
      op: "insert";
      path: string;
      value: unknown;
      /** Insert after / before the element with this id; default appends. */
      after?: string;
      before?: string;
      index?: number;
    }
  | { op: "remove"; path: string; id: string };

/* ------------------------------------------------------------------ */
/* Tasks                                                               */
/* ------------------------------------------------------------------ */

export interface SimRequires {
  /**
   * The selection that must be active when the action is committed.
   * Word: "p2", "p2,p3", "p2.r1", "all". Excel: "B6", "A1:D1".
   * PowerPoint: "s2", "s2.title", "s2.body", "s2.o1".
   * Several strings = any of them is fine.
   */
  selection?: string | string[];
  sheet?: string;
  slide?: string;
}

/** An alternative action, optionally with its own selection requirement. */
export type SimAlt = SimAction & { requires?: SimRequires };

export interface SimStep {
  action: SimAction;
  /**
   * Other ways to do the same thing that should also count (the Font dialog
   * instead of the Ribbon box, a right-click command instead of a button).
   * Effects still apply; built-in behavior runs for whichever was used.
   * An alternative may carry its own `requires` when it needs a different
   * selection (Ctrl+D needs the whole fill range, the Fill Handle only the
   * source cell); otherwise the step's `requires` applies.
   */
  alt?: SimAlt[];
  requires?: SimRequires;
  /** Shown when the right command is used with the wrong selection. */
  selectHint?: string;
  /** Extra state edits after the built-in behavior runs. */
  effects?: SimOp[];
  /**
   * Skip the app's built-in handling for this action and apply only
   * `effects`. Use when the built-in result isn't what the task produces.
   */
  replaceBuiltIn?: boolean;
}

export interface SimTask {
  /** What the learner sees, phrased like a GMetrix/MOS task. */
  instruction: string;
  /** The click path, revealed by Hint or after three misses. */
  hint: string;
  steps: SimStep[];
  /** Steps may be done in any order (e.g. apply Heading 1 to three titles). */
  anyOrder?: boolean;
  /**
   * Judge the app's free commands in this task too, so a wrong one counts as
   * a miss (a compliance task where opening the wrong chart is the mistake).
   */
  judgeFree?: boolean;
}

/* ------------------------------------------------------------------ */
/* App documents                                                       */
/* ------------------------------------------------------------------ */

export interface TextProps {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  font?: string;
  size?: number;
  color?: string;
  highlight?: string;
  caps?: "upper" | "lower" | "title" | "sentence";
  subscript?: boolean;
  superscript?: boolean;
}

/* ---------- Word ---------- */

export interface WordRun extends TextProps {
  /** Give a run an id to make it individually selectable ("p2.r1"). */
  id?: string;
  text: string;
  link?: string;
  /** Track Changes markup. */
  ins?: boolean;
  del?: boolean;
  /** Squiggle for spelling/grammar lessons. */
  misspelled?: boolean;
  /** Spelling suggestions offered by the Editor pane and right-click menu. */
  suggestions?: string[];
  /** Mail merge field shown as «Field». */
  field?: string;
}

export interface WordTable {
  rows: string[][];
  style?: string;
  headerRow?: boolean;
  bandedRows?: boolean;
  widths?: number[];
  align?: "left" | "center";
  /** Shading for the header row, e.g. "#1f4e79". */
  headerFill?: string;
}

export interface WordObject {
  label: string;
  /** Emoji or short glyph drawn in the placeholder. */
  glyph?: string;
  wrap?: "inline" | "square" | "tight" | "behind" | "front" | "topBottom";
  align?: "left" | "center" | "right";
  width?: number;
  style?: string;
  border?: string;
  shapeFill?: string;
  rotate?: number;
  text?: string;
}

export interface WordPara extends TextProps {
  id: string;
  /** Plain text paragraph; use `runs` for mixed formatting. */
  text?: string;
  runs?: WordRun[];
  kind?: "p" | "table" | "image" | "shape" | "textbox" | "chart" | "toc" | "pageBreak" | "sectionBreak" | "columnBreak";
  style?: string;
  align?: "left" | "center" | "right" | "justify";
  list?: "bullet" | "number" | null;
  listLevel?: number;
  bulletChar?: string;
  numberFormat?: string;
  indentLeft?: number;
  firstLine?: number;
  hanging?: number;
  lineSpacing?: number;
  spaceBefore?: number;
  spaceAfter?: number;
  shading?: string;
  border?: string;
  table?: WordTable;
  object?: WordObject;
  chart?: { type: string; title?: string; series: { label: string; value: number }[] };
  comment?: { author: string; text: string; resolved?: boolean; replies?: { author: string; text: string }[] };
  /** Placeholder shown in grey when the paragraph is empty. */
  placeholder?: string;
}

export interface WordDoc {
  paragraphs: WordPara[];
  header?: string;
  footer?: string;
  pageNumbers?: string;
  page?: {
    orientation?: "portrait" | "landscape";
    margins?: string;
    size?: string;
    columns?: number;
  };
  theme?: string;
  styleSet?: string;
  watermark?: string;
  pageColor?: string;
  pageBorder?: boolean;
  trackChanges?: boolean;
  markup?: "simple" | "all" | "none" | "original";
  view?: "print" | "read" | "web" | "outline" | "draft";
  ruler?: boolean;
  navPane?: boolean;
  gridlines?: boolean;
  zoom?: number;
  showMarks?: boolean;
  ribbonCollapsed?: boolean;
  saved?: { name?: string; location?: string; format?: string; autosave?: boolean };
  /** Things the backstage and status bar show. */
  author?: string;
  wordCount?: boolean;
  /** Last result of a Find, Spelling, Accessibility, etc. pane, for display. */
  pane?: string | null;
  /** Free-form flags authors can set and the canvas can display (e.g. "printed": "2 copies"). */
  flags?: Record<string, SimValue>;
  /** Internal clipboard for cut/copy/paste. */
  clipboard?: { paras?: WordPara[]; text?: string; props?: TextProps } | null;
  /** Format Painter: formatting picked up and waiting to be applied. */
  painter?: (TextProps & { style?: string }) | null;
  /** Mail merge state. */
  merge?: {
    type?: string;
    recipients?: Record<string, string>[];
    source?: string;
    preview?: boolean;
    record?: number;
    finished?: string;
  };
  /** Footnotes added through References. */
  footnotes?: string[];
  /** Results of the last Replace All. */
  replaced?: number;
}

/* ---------- Excel ---------- */

export interface CellFormat {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  font?: string;
  size?: number;
  color?: string;
  fill?: string;
  numFmt?:
    | "General"
    | "Number"
    | "Currency"
    | "Accounting"
    | "Short Date"
    | "Long Date"
    | "Time"
    | "Percentage"
    | "Fraction"
    | "Scientific"
    | "Text"
    | "Comma";
  decimals?: number;
  align?: "left" | "center" | "right";
  valign?: "top" | "middle" | "bottom";
  wrap?: boolean;
  border?: "all" | "outside" | "bottom" | "thickBottom" | "top" | "none";
  indent?: number;
}

export interface ExcelCell {
  v?: string | number;
  /** Formula including the leading "=". */
  f?: string;
  fmt?: CellFormat;
  comment?: string;
  note?: string;
  /** Spelling suggestions when the cell's text is misspelled (F7, Review › Spelling). */
  spell?: string[];
}

export interface ExcelPivot {
  /** Source data, e.g. { sheet: "Visits", range: "A1:E40" }. */
  source: { sheet: string; range: string };
  rows: string[];
  columns: string[];
  values: { field: string; fn: "Sum" | "Count" | "Average" | "Max" | "Min" }[];
  filters: string[];
  /** Top-left cell of the report. */
  at?: string;
  style?: string;
}

export interface ExcelObject {
  id: string;
  kind: "image" | "shape" | "textbox" | "icon" | "smartart";
  label: string;
  glyph?: string;
  at: string;
  text?: string;
}

export interface ExcelChart {
  id: string;
  type: string;
  title?: string;
  range: string;
  /** Anchor cell for display, e.g. "F2". */
  at?: string;
  style?: string;
}

export interface ExcelCF {
  range: string;
  rule: string;
  value?: string | number;
  fill?: string;
  color?: string;
}

export interface ExcelSheet {
  name: string;
  cells: Record<string, ExcelCell>;
  /** Visible grid size. */
  cols?: number;
  rows?: number;
  colWidths?: Record<string, number>;
  rowHeights?: Record<string, number>;
  freeze?: string | null;
  filter?: string | null;
  /** Filter criteria by column letter: values to show. */
  filterValues?: Record<string, string[]>;
  sortedBy?: string | null;
  tabColor?: string;
  merges?: string[];
  hiddenRows?: number[];
  hiddenCols?: string[];
  charts?: ExcelChart[];
  cf?: ExcelCF[];
  table?: { range: string; style: string; name?: string; totalRow?: boolean } | null;
  printArea?: string | null;
  printTitles?: string | null;
  orientation?: "portrait" | "landscape";
  margins?: string;
  gridlines?: boolean;
  headings?: boolean;
  showFormulas?: boolean;
  protected?: boolean;
  zoom?: number;
  groups?: { rows: string; collapsed?: boolean }[];
  pageBreakPreview?: boolean;
  view?: "normal" | "pageLayout" | "pageBreak";
  header?: string;
  footer?: string;
  pivot?: ExcelPivot | null;
  objects?: ExcelObject[];
  validation?: Record<string, { type: string; list?: string[]; min?: number; max?: number; message?: string }>;
  sparklines?: { range: string; at: string; type: string }[];
  fitTo?: string;
  split?: boolean;
  printHeadings?: boolean;
  printGridlines?: boolean;
}

export interface ExcelBook {
  sheets: ExcelSheet[];
  active: string;
  /** Defined names (Formulas › Define Name), name → reference. */
  names?: Record<string, string>;
  clipboard?: { sheet: string; range: string; cells: Record<string, ExcelCell>; cut?: boolean } | null;
  painter?: CellFormat | null;
  theme?: string;
  saved?: { name?: string; location?: string; format?: string; autosave?: boolean };
  pane?: string | null;
  flags?: Record<string, SimValue>;
  ribbonCollapsed?: boolean;
}

/* ---------- PowerPoint ---------- */

export interface PptObject {
  id: string;
  kind: "image" | "shape" | "textbox" | "table" | "chart" | "smartart" | "video" | "audio" | "icon";
  label?: string;
  glyph?: string;
  text?: string;
  /** Position and size in percent of the slide. */
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  color?: string;
  style?: string;
  rotate?: number;
  animation?: string | null;
  animationOrder?: number;
  rows?: string[][];
  series?: { label: string; value: number }[];
  items?: string[];
  props?: TextProps & { align?: "left" | "center" | "right" };
  /** Alt text for accessibility lessons. */
  alt?: string;
  crop?: boolean;
  shape?: "rect" | "rounded" | "oval" | "arrow" | "star" | "callout";
  group?: string | null;
  z?: number;
}

export interface PptSlide {
  id: string;
  layout: string;
  title?: string;
  subtitle?: string;
  body?: string[];
  body2?: string[];
  notes?: string;
  transition?: string | null;
  titleProps?: TextProps & { align?: "left" | "center" | "right" };
  bodyProps?: TextProps & { align?: "left" | "center" | "right" | "justify"; bullets?: boolean; numbered?: boolean; lineSpacing?: number };
  subtitleProps?: TextProps & { align?: "left" | "center" | "right" };
  /** Misspelled words on the slide, for Review › Spelling. */
  spell?: { word: string; suggestions: string[] }[];
  /** Transition options. */
  transitionOptions?: { effect?: string; duration?: number; advanceAfter?: number | null };
  /** Animation on the title or body placeholder. */
  titleAnimation?: string | null;
  bodyAnimation?: string | null;
  objects?: PptObject[];
  background?: string;
  hidden?: boolean;
  section?: string;
  comments?: { author: string; text: string }[];
}

export interface PptDeck {
  slides: PptSlide[];
  active: string;
  theme?: string;
  variant?: number;
  size?: "16:9" | "4:3";
  view?: "normal" | "outline" | "sorter" | "notes" | "reading" | "master" | "show";
  master?: { titleFont?: string; titleColor?: string; bodyFont?: string; footer?: string };
  footer?: { text?: string; slideNumber?: boolean; date?: boolean };
  saved?: { name?: string; location?: string; format?: string; autosave?: boolean };
  pane?: string | null;
  flags?: Record<string, SimValue>;
  ribbonCollapsed?: boolean;
}

/* ------------------------------------------------------------------ */
/* Definitions                                                         */
/* ------------------------------------------------------------------ */

interface SimBase {
  /** Unique across the site, e.g. "word-m2-formatting-text-1". */
  id: string;
  title: string;
  /** One or two sentences putting the learner in a job situation. */
  scenario: string;
  /** Shown in the title bar, e.g. "Referral Letter.docx". */
  fileName: string;
  tasks: SimTask[];
  /** Estimated minutes, shown on the start card. */
  minutes?: number;
  /**
   * "practice" (default) renders under Practice Simulation, right after the
   * lesson. "challenge" renders as a Challenge Lab after the lesson's
   * Challenge section: a simulated stand-in for a challenge students cannot
   * do on a locked-down school computer, with a printable results card as
   * the deliverable.
   */
  role?: "practice" | "challenge";
}

export type SimDefinition =
  | (SimBase & { app: "word"; initial: WordDoc })
  | (SimBase & { app: "excel"; initial: ExcelBook })
  | (SimBase & { app: "powerpoint"; initial: PptDeck })
  | (SimBase & { app: ExtraSimApp; initial: Record<string, unknown> });

export type SimDoc = WordDoc | ExcelBook | PptDeck | Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* Ribbon definition (used by the shared Ribbon renderer)              */
/* ------------------------------------------------------------------ */

export type RibbonControl =
  | {
      type: "button";
      id: string;
      label: string;
      icon?: string;
      size?: "large" | "small";
      /** Show label next to a small icon. */
      showLabel?: boolean;
      /** Keyboard shortcut shown in the tooltip. */
      shortcut?: string;
      tip?: string;
      /** Opens this dialog instead of committing. */
      dialog?: string;
    }
  | {
      type: "toggle";
      id: string;
      label: string;
      icon?: string;
      size?: "large" | "small";
      showLabel?: boolean;
      shortcut?: string;
      tip?: string;
      /** Key into the app's "active" map used to draw it pressed. */
      stateKey?: string;
    }
  | {
      type: "dropdown";
      id: string;
      label: string;
      icon?: string;
      size?: "large" | "small";
      showLabel?: boolean;
      tip?: string;
      /** Render as a combo box (font name/size) instead of a button. */
      combo?: boolean;
      width?: number;
      /** Value shown in a combo, from the app's "active" map. */
      stateKey?: string;
      options: RibbonOption[];
      /** Split button: clicking the face commits `faceValue` directly. */
      split?: boolean;
      faceValue?: string;
      /** Columns for a gallery-style menu (e.g. colors, styles). */
      gallery?: "list" | "grid" | "swatches" | "symbols";
    }
  | {
      type: "gallery";
      id: string;
      label: string;
      options: RibbonOption[];
      width?: number;
    }
  | { type: "separator" };

export interface RibbonOption {
  value: string;
  label?: string;
  icon?: string;
  /** Swatch color or preview style. */
  color?: string;
  /** Opens this dialog instead of committing. */
  dialog?: string;
  /** A sub-heading inside the menu. */
  heading?: boolean;
  /** Commit a different command id than the parent. */
  command?: string;
  preview?: TextProps;
}

export interface RibbonGroup {
  label: string;
  controls: RibbonControl[];
  /** Dialog launcher arrow in the group's corner. */
  launcher?: string;
  /** Lay small controls out in rows (font group). */
  rows?: RibbonControl[][];
}

export interface RibbonTab {
  id: string;
  label: string;
  groups: RibbonGroup[];
  /** Contextual tabs (Table Design, Picture Format) appear only when relevant. */
  contextual?: string;
  /**
   * Shown only when its `contextual` key is active, but drawn like a normal
   * tab (no amber marker): Outlook's per-module Home and View tabs, and the
   * tabs of a pop-out form window.
   */
  plain?: boolean;
}

/* ------------------------------------------------------------------ */
/* Dialog definition (shared Dialog renderer)                          */
/* ------------------------------------------------------------------ */

export type DialogField =
  | { type: "select"; key: string; label: string; options: string[]; default?: string }
  | { type: "number"; key: string; label: string; default?: number; min?: number; max?: number; step?: number; suffix?: string }
  | { type: "text"; key: string; label: string; default?: string; placeholder?: string; password?: boolean }
  | { type: "checkbox"; key: string; label: string; default?: boolean }
  | { type: "radio"; key: string; label: string; options: string[]; default?: string }
  | { type: "color"; key: string; label: string; options: string[]; default?: string }
  | { type: "note"; text: string }
  | { type: "list"; key: string; label: string; options: string[]; default?: string; height?: number };

export interface DialogDef {
  id: string;
  title: string;
  /** Optional tabs inside the dialog (Font / Advanced). */
  tabs?: { label: string; fields: DialogField[] }[];
  fields?: DialogField[];
  okLabel?: string;
  width?: number;
}
