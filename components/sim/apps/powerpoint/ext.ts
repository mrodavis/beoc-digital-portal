/**
 * PowerPoint engine extensions.
 *
 * The deck model in types/sim.ts covers the common case. A few behaviors the
 * PowerPoint lessons need (per-object animation timing, media playback
 * options, table style options, chart elements, bullet styles, slide master
 * objects, comment replies) carry extra optional fields on the same plain
 * JSON objects. They are declared here so the engine stays typed; a deck
 * without them behaves exactly as before.
 */
import type { PptDeck, PptObject, PptSlide } from "@/types/sim";

/* ------------------------------------------------------------------ */
/* Extension fields                                                    */
/* ------------------------------------------------------------------ */

export type AnimStart = "On Click" | "With Previous" | "After Previous";

export interface AnimMeta {
  start?: AnimStart;
  effect?: string;
  duration?: number;
  delay?: number;
  /** Effect Options dialog: Text Animation › Group text. */
  sequence?: string;
  /** Effect Options dialog: Timing › Repeat. */
  repeat?: string;
  /** Effect Options dialog: Effect › Sound and After animation. */
  sound?: string;
  after?: string;
}

/** A chart or worksheet pasted with Paste Link (or a Link Data paste option). */
export interface DataLink {
  /** Source workbook file name, e.g. "Expense Dashboard - May 2026.xlsx". */
  file: string;
  /** Where the workbook lives, shown in the Links dialog. */
  path?: string;
  /** The linked item inside the workbook, e.g. "Sheet1!Chart 1". */
  item?: string;
  type?: "Chart" | "Worksheet";
  mode?: "Automatic" | "Manual";
  /** Set by Update Now / Update Link. */
  updated?: boolean;
}

/** Where a clipboard item came from (Office Clipboard icon, Paste Special source line). */
export interface ClipSource {
  app: string;
  file?: string;
  path?: string;
  item?: string;
}

/** Slide Show › Custom Slide Show › Custom Shows. */
export interface CustomShow {
  name: string;
  slides: string[];
}

/** The current content of a linked workbook, read by Update Now (flags.linkSources[file]). */
export interface LinkSource {
  series?: { label: string; value: number }[];
  title?: string;
  rows?: string[][];
}

export interface MediaOpts {
  start?: string;
  playAcross?: boolean;
  loop?: boolean;
  hide?: boolean;
  rewind?: boolean;
  fullScreen?: boolean;
  volume?: string;
  trimStart?: number;
  trimEnd?: number;
  fadeIn?: number;
  fadeOut?: number;
  position?: number;
  poster?: number | string | null;
  style?: string;
}

export interface TableOpts {
  headerRow?: boolean;
  totalRow?: boolean;
  bandedRows?: boolean;
  firstColumn?: boolean;
  lastColumn?: boolean;
  bandedColumns?: boolean;
  /** Merged ranges, "r1c1:r1c2". */
  merges?: string[];
  distributed?: boolean;
  /** Horizontal alignment per cell, "r1c1" → "center". */
  align?: Record<string, string>;
  valign?: string;
}

export interface ChartOpts {
  title?: string;
  showTitle?: boolean;
  dataLabels?: string | null;
  legend?: string | null;
  gridlines?: boolean;
  seriesName?: string;
  axisTitles?: boolean;
  layout?: string;
}

export interface PictureFx {
  style?: string;
  corrections?: string;
  color?: string;
  artistic?: string;
  border?: string;
  effects?: string;
  cropShape?: string;
  aspect?: string;
  compressed?: string;
}

export type PptObjX = PptObject & {
  anim?: AnimMeta;
  media?: MediaOpts;
  table?: TableOpts;
  chart?: ChartOpts;
  fx?: PictureFx;
  /** The content placeholder this object fills ("body", "body2", "picture"). */
  placeholder?: string;
  decorative?: boolean;
  outlineWeight?: number;
  effect?: string;
  link?: string;
  hidden?: boolean;
  flipH?: boolean;
  flipV?: boolean;
  /** Paste Link / Link Data: the source workbook. */
  dataLink?: DataLink;
  /** Pasted as an Excel object (Paste Special), not a native chart: no Chart Design tab. */
  ole?: string;
  /** Keep Source Formatting: draw with the source file's colors, not this theme's. */
  keepSource?: boolean;
  /** Size and Rotation › Lock aspect ratio, when the learner changed it. */
  lockAspect?: boolean;
};

export type BodyPropsX = NonNullable<PptSlide["bodyProps"]> & {
  bulletStyle?: string;
  numberFormat?: string;
  startAt?: number;
  bulletColor?: string;
  bulletSize?: number;
  indent?: number;
  hanging?: number;
  spaceBefore?: number;
  spaceAfter?: number;
};

export interface CommentX {
  author: string;
  text: string;
  replies?: { author: string; text: string }[];
  resolved?: boolean;
}

export type PptSlideX = PptSlide & {
  titleAnim?: AnimMeta;
  bodyAnim?: AnimMeta;
  titleOrder?: number;
  bodyOrder?: number;
  comments?: CommentX[];
  hideGraphics?: boolean;
  transitionOptions?: PptSlide["transitionOptions"] & { onClick?: boolean; sound?: string };
};

export type MasterX = NonNullable<PptDeck["master"]> & {
  objects?: PptObject[];
  layoutObjects?: Record<string, PptObject[]>;
  layoutNames?: Record<string, string>;
  customLayouts?: string[];
  hideOn?: string[];
  bodyColor?: string;
  /** Text typed into the slide master's title and text placeholders. */
  titleText?: string;
  bodyText?: string[];
  /** Prompt text typed into a layout's placeholders ("Click to add title"), by layout. */
  layoutText?: Record<string, Partial<Record<"title" | "subtitle" | "body" | "body2", string>>>;
};

export const ox = (o: PptObject) => o as PptObjX;
export const sx = (s: PptSlide) => s as PptSlideX;
export function bodyX(s: PptSlide): BodyPropsX {
  s.bodyProps = s.bodyProps ?? {};
  return s.bodyProps as BodyPropsX;
}
export function masterX(d: PptDeck): MasterX {
  d.master = d.master ?? {};
  return d.master as MasterX;
}
export const readMaster = (d: PptDeck) => (d.master ?? {}) as MasterX;

/* ------------------------------------------------------------------ */
/* Layout geometry (percent of the slide)                              */
/* ------------------------------------------------------------------ */

export type Part = "title" | "subtitle" | "body" | "body2";
export interface Box { x: number; y: number; w: number; h: number }

export function layoutBoxes(layout: string): Partial<Record<Part | "picture", Box>> {
  switch (layout) {
    case "Title Slide": return { title: { x: 10, y: 26, w: 80, h: 24 }, subtitle: { x: 15, y: 54, w: 70, h: 14 } };
    case "Section Header": return { title: { x: 8, y: 34, w: 84, h: 22 }, subtitle: { x: 8, y: 58, w: 84, h: 12 } };
    case "Two Content":
    case "Comparison": return { title: { x: 6, y: 5, w: 88, h: 16 }, body: { x: 6, y: 25, w: 43, h: 66 }, body2: { x: 51, y: 25, w: 43, h: 66 } };
    case "Title Only": return { title: { x: 6, y: 5, w: 88, h: 16 } };
    case "Blank": return {};
    case "Content with Caption": return { title: { x: 6, y: 8, w: 34, h: 18 }, body2: { x: 6, y: 28, w: 34, h: 60 }, body: { x: 44, y: 8, w: 50, h: 84 } };
    case "Picture with Caption": return { picture: { x: 6, y: 6, w: 88, h: 56 }, title: { x: 6, y: 65, w: 88, h: 12 }, body2: { x: 6, y: 78, w: 88, h: 12 } };
    default: return { title: { x: 6, y: 5, w: 88, h: 16 }, body: { x: 6, y: 25, w: 88, h: 66 } };
  }
}

/** Content placeholders that show the Insert icons when empty. */
export function isContentPart(layout: string, part: string): boolean {
  if (part === "picture") return layout === "Picture with Caption";
  if (part === "body") return ["Title and Content", "Two Content", "Comparison", "Content with Caption"].includes(layout) || !["Title Slide", "Section Header", "Title Only", "Blank", "Picture with Caption"].includes(layout);
  if (part === "body2") return layout === "Two Content" || layout === "Comparison";
  return false;
}

/* ------------------------------------------------------------------ */
/* Theme variations (Design › Variants › More)                         */
/* ------------------------------------------------------------------ */

export const COLOR_SETS: { name: string; accent: string }[] = [
  { name: "Office", accent: "#4472C4" },
  { name: "Office 2007 - 2010", accent: "#4F81BD" },
  { name: "Grayscale", accent: "#7F7F7F" },
  { name: "Blue Warm", accent: "#4A66AC" },
  { name: "Blue", accent: "#0F6FC6" },
  { name: "Blue II", accent: "#1CADE4" },
  { name: "Blue Green", accent: "#3494BA" },
  { name: "Green", accent: "#549E39" },
  { name: "Green Yellow", accent: "#99CB38" },
  { name: "Yellow", accent: "#FFCA08" },
  { name: "Yellow Orange", accent: "#F0A22E" },
  { name: "Orange", accent: "#E48312" },
  { name: "Orange Red", accent: "#D34817" },
  { name: "Red Orange", accent: "#E84C22" },
  { name: "Red", accent: "#A5300F" },
  { name: "Red Violet", accent: "#E32D91" },
  { name: "Violet", accent: "#AD84C6" },
  { name: "Violet II", accent: "#92278F" },
  { name: "Median", accent: "#94B6D2" },
  { name: "Paper", accent: "#A5B592" },
  { name: "Marquee", accent: "#418AB3" },
  { name: "Slipstream", accent: "#4E67C8" },
  { name: "Aspect", accent: "#F07F09" },
];

/** Design › Variants › Fonts: name → [Headings, Body]. */
export const FONT_SETS: { name: string; heading: string; body: string }[] = [
  { name: "Office", heading: "Aptos Display", body: "Aptos" },
  { name: "Office 2007 - 2010", heading: "Cambria", body: "Calibri" },
  { name: "Calibri", heading: "Calibri Light", body: "Calibri" },
  { name: "Arial", heading: "Arial", body: "Arial" },
  { name: "Corbel", heading: "Corbel", body: "Corbel" },
  { name: "Candara", heading: "Candara", body: "Candara" },
  { name: "Franklin Gothic", heading: "Franklin Gothic Medium", body: "Franklin Gothic Book" },
  { name: "Century Gothic", heading: "Century Gothic", body: "Century Gothic" },
  { name: "Tw Cen MT", heading: "Tw Cen MT", body: "Tw Cen MT" },
  { name: "Cambria", heading: "Cambria", body: "Cambria" },
  { name: "Garamond", heading: "Garamond", body: "Garamond" },
  { name: "Georgia", heading: "Georgia", body: "Georgia" },
  { name: "Gill Sans MT", heading: "Gill Sans MT", body: "Gill Sans MT" },
  { name: "Trebuchet MS", heading: "Trebuchet MS", body: "Trebuchet MS" },
  { name: "Verdana", heading: "Verdana", body: "Verdana" },
];

export const EFFECT_SETS = ["Office", "Office 2007 - 2010", "Subtle Solids", "Banded Edge", "Smokey Glass", "Glow Edge", "Grunge Texture", "Frosted Glass", "Top Shadow", "Inset", "Milk Glass", "Riblet", "Reflection", "Extreme Shadow", "Glossy"];

/** Design › Variants › Background Styles. Styles 9 to 12 are dark. */
export const BACKGROUND_STYLES: { name: string; color: string; dark?: boolean }[] = [
  { name: "Style 1", color: "#FFFFFF" },
  { name: "Style 2", color: "#F2F2F2" },
  { name: "Style 3", color: "#E7E6E6" },
  { name: "Style 4", color: "#D0CECE" },
  { name: "Style 5", color: "#DEEBF7" },
  { name: "Style 6", color: "#BDD7EE" },
  { name: "Style 7", color: "#9DC3E6" },
  { name: "Style 8", color: "#D6DCE5" },
  { name: "Style 9", color: "#000000", dark: true },
  { name: "Style 10", color: "#262626", dark: true },
  { name: "Style 11", color: "#44546A", dark: true },
  { name: "Style 12", color: "#1F3864", dark: true },
];

/* ------------------------------------------------------------------ */
/* Lists                                                               */
/* ------------------------------------------------------------------ */

export const BULLET_STYLES: { value: string; glyph: string }[] = [
  { value: "Filled Round Bullets", glyph: "•" },
  { value: "Hollow Round Bullets", glyph: "○" },
  { value: "Filled Square Bullets", glyph: "■" },
  { value: "Hollow Square Bullets", glyph: "□" },
  { value: "Star Bullets", glyph: "✱" },
  { value: "Arrow Bullets", glyph: "➢" },
  { value: "Checkmark Bullets", glyph: "✓" },
];
/** Older glyph values still accepted by home.bullets. */
const BULLET_ALIASES: Record<string, string> = { "•": "Filled Round Bullets", "■": "Filled Square Bullets", "✓": "Checkmark Bullets" };
export function bulletStyleName(v: string): string | undefined {
  if (BULLET_STYLES.some((b) => b.value === v)) return v;
  return BULLET_ALIASES[v];
}
export function bulletGlyph(style?: string): string {
  return BULLET_STYLES.find((b) => b.value === style)?.glyph ?? "•";
}

export const NUMBER_FORMATS = ["1. 2. 3.", "1) 2) 3)", "I. II. III.", "A. B. C.", "a) b) c)", "a. b. c.", "i. ii. iii."];
const NUMBER_ALIASES: Record<string, string> = { "1.": "1. 2. 3.", "A.": "A. B. C." };
export function numberFormatName(v: string): string | undefined {
  if (NUMBER_FORMATS.includes(v)) return v;
  return NUMBER_ALIASES[v];
}

function roman(n: number): string {
  const map: [number, string][] = [[1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"], [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]];
  let out = "";
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}
function letters(n: number): string {
  let s = "";
  while (n > 0) { n--; s = String.fromCharCode(97 + (n % 26)) + s; n = Math.floor(n / 26); }
  return s;
}
/** The marker for list item n (1-based) in a numbering format. */
export function numberMarker(format: string | undefined, n: number): string {
  switch (format) {
    case "1) 2) 3)": return `${n})`;
    case "I. II. III.": return `${roman(n).toUpperCase()}.`;
    case "A. B. C.": return `${letters(n).toUpperCase()}.`;
    case "a) b) c)": return `${letters(n)})`;
    case "a. b. c.": return `${letters(n)}.`;
    case "i. ii. iii.": return `${roman(n)}.`;
    default: return `${n}.`;
  }
}

/* ------------------------------------------------------------------ */
/* Insert sources                                                       */
/* ------------------------------------------------------------------ */

export const PICTURE_FILES = ["clinic-lobby.jpg", "handwashing.png", "care-team.jpg", "flu-shot.jpg", "lakeside-logo.png", "map-to-clinic.png", "front-desk.jpg", "treadmill-room.jpg", "healthy-plate.jpg", "parking-garage.jpg"];
export const STOCK_IMAGES = ["Nurse taking blood pressure", "Clinic waiting room", "Healthy food plate", "Person jogging in a park", "Hands washing at a sink", "Doctor with a tablet", "Group yoga class", "Person riding a bicycle"];
export const ONLINE_PICTURES = ["walking-for-health.jpg (Creative Commons)", "stretching-routine.jpg (Creative Commons)", "fresh-vegetables.jpg (Creative Commons)", "swimming-laps.jpg (Creative Commons)"];
export const SCREEN_WINDOWS = ["Lakeside Patient Portal - Microsoft Edge", "Fitness.gov - Microsoft Edge", "Clinic Schedule.xlsx - Excel"];
export const ICONS: { name: string; glyph: string }[] = [
  { name: "Stethoscope", glyph: "🩺" },
  { name: "Heart", glyph: "❤️" },
  { name: "Calendar", glyph: "📅" },
  { name: "Telephone", glyph: "📞" },
  { name: "Soap", glyph: "🧼" },
  { name: "Syringe", glyph: "💉" },
  { name: "Clock", glyph: "🕒" },
  { name: "Checkmark", glyph: "✔️" },
  { name: "Hospital", glyph: "🏥" },
  { name: "Group", glyph: "👥" },
  { name: "Warning", glyph: "⚠️" },
  { name: "Lock", glyph: "🔒" },
  { name: "Computer", glyph: "💻" },
  { name: "Email", glyph: "✉️" },
];

/** Paste Special and Paste Options formats. */
export const PASTE_OPTIONS = [
  "Use Destination Theme",
  "Keep Source Formatting",
  "Use Destination Theme & Embed Workbook",
  "Keep Source Formatting & Embed Workbook",
  "Use Destination Theme & Link Data",
  "Keep Source Formatting & Link Data",
  "Picture",
  "Keep Text Only",
];
export const PICTURE_FORMATS = ["Picture (PNG)", "Picture (Enhanced Metafile)", "Picture (Windows Metafile)", "Picture (GIF)", "Picture (JPEG)", "Bitmap", "Device Independent Bitmap"];
export const PASTE_SPECIAL_FORMATS = [
  "Microsoft Excel Chart Object",
  "Microsoft Excel Worksheet Object",
  "Microsoft Office Graphic Object",
  "Microsoft PowerPoint Slide Object",
  "HTML Format",
  "Formatted Text (RTF)",
  "Unformatted Text",
  ...PICTURE_FORMATS,
];

/** Graphics Format › Graphics Styles gallery. */
export const GRAPHIC_STYLES = ["Black Fill", "Colored Fill - Accent 1", "Colored Fill - Accent 2", "Colored Fill - Accent 6", "Colored Outline - Accent 1", "Colored Outline - Accent 2", "Black Outline, Colored Fill"];

/** Objects whose Lock aspect ratio is on by default, so resizing keeps their proportions. */
export function keepsAspect(o: PptObject): boolean {
  const x = o as PptObjX;
  if (x.lockAspect !== undefined) return x.lockAspect;
  return o.kind === "image" || o.kind === "video" || o.kind === "icon" || o.kind === "chart" || o.kind === "smartart";
}

/** "layout:Title Only.o1" → ["layout:Title Only", "o1"]; "master.title" → ["master", "title"]. */
export function splitMasterKey(key: string): [string, string, string | undefined] {
  const from = key.startsWith("layout:") ? 7 : 0;
  const dot = key.indexOf(".", from);
  if (dot < 0) return [key, "", undefined];
  const [part, sub] = key.slice(dot + 1).split(".");
  return [key.slice(0, dot), part, sub];
}
export const isMasterKey = (key: string) => key === "master" || key.startsWith("master.") || key.startsWith("layout:");
export const VIDEO_FILES = ["handwashing-steps.mp4", "welcome-message.mp4", "check-in-kiosk.mp4", "flu-shot-what-to-expect.mp4"];
export const AUDIO_FILES = ["waiting-room-music.mp3", "intro-music.mp3", "narration-slide1.m4a", "chime.wav"];

/** Clip lengths in seconds, for Trim and the playback bar. */
export const MEDIA_SECONDS: Record<string, number> = {
  "handwashing-steps.mp4": 45,
  "welcome-message.mp4": 75,
  "check-in-kiosk.mp4": 30,
  "flu-shot-what-to-expect.mp4": 60,
  "waiting-room-music.mp3": 150,
  "intro-music.mp3": 95,
  "narration-slide1.m4a": 40,
  "chime.wav": 2,
};
export function mediaLength(o: PptObject): number {
  return MEDIA_SECONDS[o.label ?? ""] ?? (o.kind === "audio" ? 60 : 45);
}
export function clock(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/* Thesaurus                                                           */
/* ------------------------------------------------------------------ */

export const THESAURUS: Record<string, string[]> = {
  important: ["Essential", "Vital", "Key", "Critical"],
  good: ["Strong", "Excellent", "Solid", "Positive"],
  help: ["Assist", "Support", "Aid"],
  big: ["Major", "Large", "Significant"],
  tips: ["Pointers", "Advice", "Guidelines"],
  changes: ["Updates", "Revisions", "Adjustments"],
  quick: ["Fast", "Rapid", "Brief"],
  easy: ["Simple", "Straightforward", "Effortless"],
  keep: ["Maintain", "Retain", "Preserve"],
  clean: ["Sanitize", "Disinfect", "Wash"],
  start: ["Begin", "Launch", "Open"],
  results: ["Outcomes", "Findings"],
  goals: ["Targets", "Objectives", "Aims"],
  improve: ["Enhance", "Strengthen", "Boost"],
  safe: ["Secure", "Protected"],
};

/* ------------------------------------------------------------------ */
/* Misc                                                                 */
/* ------------------------------------------------------------------ */

/** Parse JSON stored in a flag, falling back when it is missing or broken. */
export function flagJson<T>(deck: PptDeck, key: string, fallback: T): T {
  const raw = deck.flags?.[key];
  if (typeof raw !== "string") return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
