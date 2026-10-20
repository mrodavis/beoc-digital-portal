import type { SimCommit, SimValue, TextProps, WordDoc, WordObject, WordPara, WordRun, WordTable } from "@/types/sim";
import type { SimUi } from "../../types";
import { applyCommonCommit } from "@/lib/sim/common";
import { clone } from "@/lib/sim/ops";

/* ------------------------------------------------------------------ */
/* Runtime extensions                                                  */
/* ------------------------------------------------------------------ */

/*
 * Properties the Word engine keeps on documents that are not (yet) part of
 * types/sim.ts. Sims rarely need them in an initial document; when one does
 * (e.g. a numbered list that wrongly continues), assert the paragraph
 * `as WordPara`.
 */
export interface TabStop {
  pos: number;
  align: "left" | "center" | "right" | "decimal" | "bar";
  leader?: "dots" | "dashes" | "line";
}
export interface SectionProps {
  orientation?: "portrait" | "landscape";
  columns?: number;
  /** Space between columns, inches. */
  spacing?: number;
  /** Line between columns. */
  line?: boolean;
}
export type XPara = WordPara & {
  numberStart?: number;
  numberContinue?: boolean;
  bulletColor?: string;
  multi?: string;
  indentRight?: number;
  keepNext?: boolean;
  pageBreakBefore?: boolean;
  tabStops?: TabStop[];
  /** Layout of the section that starts after this section break. */
  section?: SectionProps;
  /** Table of contents entries as of the last insert/update. */
  entries?: { id: string; text: string; level: number }[];
};
export type XObject = WordObject & {
  flipH?: boolean;
  flipV?: boolean;
  crop?: string;
  aspect?: string;
  anchor?: "move" | "fixed";
  decorative?: boolean;
  effect?: string;
  group?: string;
  z?: number;
  textColor?: string;
};
export type XTable = WordTable & { merged?: number[]; repeatHeader?: boolean; autofit?: string };
export type XChart = NonNullable<WordPara["chart"]> & { elements?: string[]; style?: string; colors?: string; alt?: string; decorative?: boolean };
export interface Source {
  type?: string;
  author: string;
  title: string;
  year: string;
  publisher?: string;
  url?: string;
}
export type XDoc = WordDoc & {
  styleDefs?: Record<string, StyleDef>;
  customStyles?: Record<string, StyleDef & { basedOn?: string }>;
  sources?: Source[];
};

const xp = (p: WordPara) => p as XPara;
const xo = (o: WordObject) => o as XObject;
const xd = (d: WordDoc) => d as XDoc;

/* ------------------------------------------------------------------ */
/* Styles and themes                                                   */
/* ------------------------------------------------------------------ */

export interface ThemeDef {
  heading: string;
  headingFont: string;
  bodyFont: string;
  accent: string;
}

export const THEMES: Record<string, ThemeDef> = {
  Office: { heading: "#2F5496", headingFont: "Calibri Light", bodyFont: "Calibri", accent: "#4472C4" },
  "Office 2013 - 2022": { heading: "#2E74B5", headingFont: "Calibri Light", bodyFont: "Calibri", accent: "#5B9BD5" },
  Facet: { heading: "#5A8F29", headingFont: "Trebuchet MS", bodyFont: "Trebuchet MS", accent: "#90C226" },
  Ion: { heading: "#1F6E6E", headingFont: "Century Gothic", bodyFont: "Century Gothic", accent: "#0F6FC6" },
  Retrospect: { heading: "#B35E06", headingFont: "Calibri Light", bodyFont: "Calibri", accent: "#E48312" },
  Slice: { heading: "#052F61", headingFont: "Century Gothic", bodyFont: "Century Gothic", accent: "#052F61" },
  Integral: { heading: "#147DA4", headingFont: "Tw Cen MT", bodyFont: "Tw Cen MT", accent: "#1CADE4" },
  Wisp: { heading: "#7B2410", headingFont: "Century Gothic", bodyFont: "Century Gothic", accent: "#A53010" },
  Organic: { heading: "#5F6F1E", headingFont: "Garamond", bodyFont: "Garamond", accent: "#83992A" },
  Gallery: { heading: "#9B2D1F", headingFont: "Gill Sans MT", bodyFont: "Gill Sans MT", accent: "#B71E42" },
};

export const THEME_NAMES = Object.keys(THEMES);

/** Design › Colors: Accent 1 of each built-in palette. Headings use Accent 1, darker 25%. */
export const COLOR_SETS: Record<string, string> = {
  Office: "#4472C4",
  "Office 2007 - 2010": "#4F81BD",
  Grayscale: "#7F7F7F",
  "Blue Warm": "#4A66AC",
  Blue: "#0F6FC6",
  "Blue II": "#1CADE4",
  "Blue Green": "#3494BA",
  Green: "#549E39",
  "Green Yellow": "#99CB38",
  Yellow: "#FFCA08",
  "Yellow Orange": "#F0A22E",
  Orange: "#E48312",
  "Orange Red": "#D34817",
  "Red Orange": "#E84C22",
  Red: "#A5300F",
  "Red Violet": "#E32D91",
  Violet: "#AD84C6",
  "Violet II": "#92278F",
  Median: "#94B6D2",
  Paper: "#A5B592",
  Marquee: "#418AB3",
  Slipstream: "#4E67C8",
  Aspect: "#F07F09",
};

/** Design › Fonts: heading font / body font pairs. */
export const FONT_SETS: Record<string, [string, string]> = {
  Office: ["Calibri Light", "Calibri"],
  "Office 2007 - 2010": ["Cambria", "Calibri"],
  Calibri: ["Calibri", "Calibri"],
  Arial: ["Arial", "Arial"],
  Corbel: ["Corbel", "Corbel"],
  Candara: ["Candara", "Candara"],
  "Franklin Gothic": ["Franklin Gothic Medium", "Franklin Gothic Book"],
  "Century Gothic": ["Century Gothic", "Century Gothic"],
  "Tw Cen MT": ["Tw Cen MT", "Tw Cen MT"],
  Cambria: ["Cambria", "Cambria"],
  Georgia: ["Georgia", "Georgia"],
  Garamond: ["Garamond", "Garamond"],
  "Trebuchet MS": ["Trebuchet MS", "Trebuchet MS"],
  Verdana: ["Verdana", "Verdana"],
};

function shade(hex: string, f: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = (s: number) => Math.round(((n >> s) & 255) * f).toString(16).padStart(2, "0");
  return `#${ch(16)}${ch(8)}${ch(0)}`.toUpperCase();
}

export interface StyleDef extends TextProps {
  spaceBefore?: number;
  spaceAfter?: number;
  lineSpacing?: number;
  align?: WordPara["align"];
  indentLeft?: number;
  border?: string;
  shading?: string;
  /** Heading level for TOC and the Navigation pane. */
  level?: number;
  /** Uses the theme heading color/font. */
  themed?: boolean;
  letterSpacing?: number;
}

export const STYLES: Record<string, StyleDef> = {
  Normal: { size: 11, spaceAfter: 8, lineSpacing: 1.08 },
  "No Spacing": { size: 11, spaceAfter: 0, lineSpacing: 1 },
  Title: { size: 28, spaceAfter: 0, lineSpacing: 1, themed: false, font: "@heading", letterSpacing: -0.5 },
  Subtitle: { size: 11, color: "#5A5A5A", spaceAfter: 8, letterSpacing: 0.8 },
  "Heading 1": { size: 16, spaceBefore: 12, spaceAfter: 0, themed: true, level: 1 },
  "Heading 2": { size: 13, spaceBefore: 2, spaceAfter: 0, themed: true, level: 2 },
  "Heading 3": { size: 12, spaceBefore: 2, spaceAfter: 0, themed: true, level: 3 },
  Quote: { italic: true, color: "#404040", align: "center", spaceBefore: 10, spaceAfter: 8 },
  "Intense Quote": { italic: true, color: "@accent", align: "center", spaceBefore: 18, spaceAfter: 18, border: "@accent" },
  "List Paragraph": { indentLeft: 0.5, spaceAfter: 8 },
  "Book Title": { bold: true, italic: true, size: 11 },
};

export const PARA_STYLE_NAMES = ["Normal", "No Spacing", "Heading 1", "Heading 2", "Heading 3", "Title", "Subtitle", "Quote", "Intense Quote", "List Paragraph"];
export const CHAR_STYLE_NAMES = ["Strong", "Emphasis", "Subtle Emphasis", "Intense Emphasis", "Book Title"];

export const STYLE_SETS = ["Default", "Basic (Elegant)", "Basic (Simple)", "Basic (Stylish)", "Casual", "Centered", "Lines (Distinctive)", "Lines (Simple)", "Lines (Stylish)", "Minimalist", "Shaded"];

export function themeOf(doc: WordDoc): ThemeDef {
  const base = THEMES[doc.theme ?? "Office"] ?? THEMES.Office;
  const colors = doc.flags?.colors !== undefined ? COLOR_SETS[String(doc.flags.colors)] : undefined;
  const fonts = doc.flags?.fonts !== undefined ? FONT_SETS[String(doc.flags.fonts)] : undefined;
  if (!colors && !fonts) return base;
  return {
    heading: colors ? shade(colors, 0.75) : base.heading,
    accent: colors ?? base.accent,
    headingFont: fonts ? fonts[0] : base.headingFont,
    bodyFont: fonts ? fonts[1] : base.bodyFont,
  };
}

/** A style's effective definition: built-in or custom, plus any Modify/Update changes. */
export function styleDef(doc: WordDoc, name?: string): StyleDef {
  const n = name ?? "Normal";
  const d = xd(doc);
  const custom = d.customStyles?.[n];
  let st: StyleDef = custom ? { ...(STYLES[custom.basedOn ?? "Normal"] ?? STYLES.Normal), level: undefined, themed: false, ...custom } : STYLES[n] ?? STYLES.Normal;
  const isHeadingLike = Boolean(st.level) || n === "Title";
  const normalOv = d.styleDefs?.Normal;
  if (normalOv && n !== "Normal" && !isHeadingLike) {
    st = {
      ...st,
      font: st.font ?? normalOv.font,
      size: st.size === undefined || st.size === STYLES.Normal.size ? normalOv.size ?? st.size : st.size,
    };
  }
  const ov = d.styleDefs?.[n];
  if (ov) st = { ...st, ...ov, themed: ov.color ? false : st.themed };
  return st;
}

/** Effective paragraph-level look (style defaults, then theme, then direct formatting). */
export function paraLook(doc: WordDoc, p: WordPara) {
  const theme = themeOf(doc);
  const st = styleDef(doc, p.style);
  const set = doc.styleSet ?? "Default";
  const isHeading = Boolean(st.level);
  const font =
    p.font ??
    (st.font && st.font !== "@heading" ? st.font : st.font === "@heading" || isHeading ? theme.headingFont : theme.bodyFont);
  let color = p.color ?? (st.themed ? theme.heading : st.color === "@accent" ? theme.accent : st.color);
  let border = p.border ?? (st.border === "@accent" ? theme.accent : st.border);
  let shading = p.shading ?? st.shading;
  let caps = p.caps;
  let align = p.align ?? st.align;
  if (isHeading || p.style === "Title") {
    if (set.startsWith("Lines")) border = border ?? theme.accent;
    if (set === "Shaded" && st.level === 1) {
      shading = shading ?? theme.accent;
      color = p.color ?? "#ffffff";
    }
    if (set === "Casual" || set === "Basic (Stylish)" || set === "Lines (Stylish)") caps = caps ?? "upper";
    if (set === "Centered") align = align ?? "center";
    if (set === "Minimalist") color = p.color ?? "#404040";
  }
  return {
    font,
    size: p.size ?? st.size ?? 11,
    color,
    bold: p.bold ?? st.bold,
    italic: p.italic ?? st.italic,
    underline: p.underline ?? st.underline,
    strike: p.strike,
    highlight: p.highlight,
    caps,
    align: align ?? "left",
    spaceBefore: p.spaceBefore ?? st.spaceBefore ?? 0,
    spaceAfter: p.spaceAfter ?? st.spaceAfter ?? 8,
    lineSpacing: p.lineSpacing ?? st.lineSpacing ?? 1.08,
    indentLeft: p.indentLeft ?? st.indentLeft ?? 0,
    border,
    shading,
    letterSpacing: st.letterSpacing,
    level: st.level,
  };
}

export function runsOf(p: WordPara): WordRun[] {
  if (p.runs && p.runs.length) return p.runs;
  return [{ text: p.text ?? "" }];
}

export function paraText(p: WordPara): string {
  if (p.kind === "table" && p.table) return p.table.rows.map((r) => r.join(" ")).join(" ");
  return runsOf(p).filter((r) => !r.del).map((r) => r.field ? `«${r.field}»` : r.text).join("");
}

export function wordCount(doc: WordDoc): number {
  return doc.paragraphs.reduce((n, p) => n + (paraText(p).match(/\S+/g)?.length ?? 0), 0);
}

/** Headings that a table of contents or the Navigation pane lists. */
export function headingsOf(doc: WordDoc): { id: string; text: string; level: number }[] {
  return doc.paragraphs
    .filter((p) => (!p.kind || p.kind === "p") && paraLook(doc, p).level && paraText(p).trim())
    .map((p) => ({ id: p.id, text: paraText(p), level: paraLook(doc, p).level ?? 1 }));
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

/** Index of the section a paragraph is in (0 = before the first section break). */
export function sectionIndex(doc: WordDoc, pid: string): number {
  let n = 0;
  for (const p of doc.paragraphs) {
    if (p.id === pid) return n;
    if (p.kind === "sectionBreak") n++;
  }
  return n;
}

export function sectionBreaks(doc: WordDoc): XPara[] {
  return doc.paragraphs.filter((p) => p.kind === "sectionBreak") as XPara[];
}

/** Layout of section `i`. Section 0 lives on doc.page; later sections on the break that starts them. */
export function sectionProps(doc: WordDoc, i: number): Required<Pick<SectionProps, "orientation" | "columns">> & SectionProps {
  const first: SectionProps = {
    orientation: doc.page?.orientation ?? "portrait",
    columns: doc.page?.columns ?? 1,
    spacing: doc.flags?.colSpacing !== undefined ? Number(doc.flags.colSpacing) : undefined,
    line: doc.flags?.colLine !== undefined ? Boolean(doc.flags.colLine) : undefined,
  };
  if (i <= 0) return { ...first, orientation: first.orientation ?? "portrait", columns: first.columns ?? 1 };
  const b = sectionBreaks(doc)[i - 1];
  const s = { ...first, ...(b?.section ?? {}) };
  return { ...s, orientation: s.orientation ?? "portrait", columns: s.columns ?? 1 };
}

function setSectionProps(doc: WordDoc, i: number, patch: SectionProps) {
  if (i <= 0) {
    doc.page = { ...(doc.page ?? {}) };
    if (patch.orientation) doc.page.orientation = patch.orientation;
    if (patch.columns !== undefined) doc.page.columns = patch.columns;
    if (patch.spacing !== undefined || patch.line !== undefined) {
      doc.flags = { ...(doc.flags ?? {}) };
      if (patch.spacing !== undefined) doc.flags.colSpacing = patch.spacing;
      if (patch.line !== undefined) doc.flags.colLine = patch.line;
    }
    return;
  }
  const b = sectionBreaks(doc)[i - 1];
  if (b) b.section = { ...sectionProps(doc, i), ...patch };
}

/** Sections the current selection touches. */
function selectedSections(doc: WordDoc, ui: SimUi): number[] {
  const s = parseSel(doc, ui.selection);
  if (ui.selection === "all") return Array.from({ length: sectionBreaks(doc).length + 1 }, (_, i) => i);
  const ids = s.paras.length ? s.paras : [doc.paragraphs[0]?.id ?? ""];
  return Array.from(new Set(ids.map((id) => sectionIndex(doc, id))));
}

/* ------------------------------------------------------------------ */
/* Selection                                                           */
/* ------------------------------------------------------------------ */

export interface ParsedSel {
  paras: string[];
  run?: { para: string; run: string };
  /** A table cell. r = 0 means a whole column, c = 0 a whole row, both 0 the whole table. */
  cell?: { para: string; r: number; c: number };
  header?: "header" | "footer";
}

export function parseSel(doc: WordDoc, sel: string): ParsedSel {
  if (!sel) return { paras: [] };
  if (sel === "all") return { paras: doc.paragraphs.map((p) => p.id) };
  if (sel === "header" || sel === "footer") return { paras: [], header: sel };
  const cellM = /^([^.,]+)\.r(\d+)c(\d+)$/.exec(sel);
  if (cellM) return { paras: [cellM[1]], cell: { para: cellM[1], r: Number(cellM[2]), c: Number(cellM[3]) } };
  if (sel.includes(",")) return { paras: sel.split(",").map((s) => s.trim()).filter(Boolean) };
  const runM = /^([^.]+)\.(.+)$/.exec(sel);
  if (runM) return { paras: [runM[1]], run: { para: runM[1], run: runM[2] } };
  return { paras: [sel] };
}

/** Paragraph ids between two ids, inclusive, in document order. */
export function paraRange(doc: WordDoc, a: string, b: string): string[] {
  const ids = doc.paragraphs.map((p) => p.id);
  let i = ids.indexOf(a), j = ids.indexOf(b);
  if (i < 0 || j < 0) return [b];
  if (i > j) [i, j] = [j, i];
  return ids.slice(i, j + 1);
}

/* ------------------------------------------------------------------ */
/* Editing helpers                                                     */
/* ------------------------------------------------------------------ */

type CharKey = keyof TextProps;
const CHAR_KEYS: CharKey[] = ["bold", "italic", "underline", "strike", "font", "size", "color", "highlight", "caps", "subscript", "superscript"];

function editTargets(doc: WordDoc, ui: SimUi, fn: (t: TextProps & { runs?: WordRun[] }, isRun: boolean) => void) {
  const s = parseSel(doc, ui.selection);
  if (s.header) return;
  if (s.run) {
    const p = doc.paragraphs.find((x) => x.id === s.run!.para);
    if (!p) return;
    if (!p.runs) p.runs = [{ text: p.text ?? "" }];
    const r = p.runs.find((x) => x.id === s.run!.run);
    if (r) fn(r, true);
    return;
  }
  for (const id of s.paras) {
    const p = doc.paragraphs.find((x) => x.id === id);
    if (p) fn(p, false);
  }
}

function setChar(doc: WordDoc, ui: SimUi, key: CharKey, value: unknown) {
  editTargets(doc, ui, (t, isRun) => {
    (t as unknown as Record<string, unknown>)[key] = value;
    // Direct paragraph formatting overrides run formatting of the same property.
    if (!isRun && (t as WordPara).runs) (t as WordPara).runs!.forEach((r) => delete (r as unknown as Record<string, unknown>)[key]);
  });
}

function firstTarget(doc: WordDoc, ui: SimUi): (TextProps & { style?: string }) | undefined {
  const s = parseSel(doc, ui.selection);
  if (s.run) {
    const p = doc.paragraphs.find((x) => x.id === s.run!.para);
    const r = p?.runs?.find((x) => x.id === s.run!.run);
    if (p && r) {
      const look = paraLook(doc, p);
      return { ...look, ...stripUndef(r), style: p.style };
    }
  }
  const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
  if (!p) return undefined;
  const look = paraLook(doc, p);
  return { ...look, style: p.style ?? "Normal" };
}

function stripUndef<T extends object>(o: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(o)) if (v !== undefined) (out as Record<string, unknown>)[k] = v;
  return out;
}

function charProps(r: WordRun): Partial<WordRun> {
  const out: Partial<WordRun> = {};
  for (const k of ["bold", "italic", "underline", "font", "size", "color", "highlight", "caps"] as CharKey[]) if (r[k] !== undefined) (out as Record<string, unknown>)[k] = r[k];
  return out;
}

function toggleChar(doc: WordDoc, ui: SimUi, key: "bold" | "italic" | "underline" | "strike" | "subscript" | "superscript") {
  const cur = firstTarget(doc, ui);
  const next = !(cur && cur[key]);
  setChar(doc, ui, key, next);
}

function selectedParas(doc: WordDoc, ui: SimUi): WordPara[] {
  const s = parseSel(doc, ui.selection);
  return s.paras.map((id) => doc.paragraphs.find((p) => p.id === id)).filter(Boolean) as WordPara[];
}

let uid = 0;
/**
 * Id for a newly inserted paragraph or object. With a document, ids are
 * deterministic: the first free `${prefix}1`, `${prefix}2`, … so a sim can
 * target what a command inserts ("tbl1", "img1", "tb1", "shp1", "ch1",
 * "br1", "sb1", "toc1").
 */
export function newId(prefix: string, doc?: WordDoc, taken?: Set<string>): string {
  if (!doc) {
    uid += 1;
    return `${prefix}${Date.now().toString(36).slice(-4)}${uid}`;
  }
  const ids = new Set(doc.paragraphs.map((p) => p.id));
  taken?.forEach((t) => ids.add(t));
  let n = 1;
  while (ids.has(`${prefix}${n}`)) n++;
  taken?.add(`${prefix}${n}`);
  return `${prefix}${n}`;
}

function insertAfterSelection(doc: WordDoc, ui: SimUi, para: WordPara, before = false) {
  const s = parseSel(doc, ui.selection);
  const anchor = before ? s.paras[0] : s.paras[s.paras.length - 1];
  const idx = doc.paragraphs.findIndex((p) => p.id === anchor);
  if (idx < 0) doc.paragraphs.push(para);
  else doc.paragraphs.splice(before ? idx : idx + 1, 0, para);
}

/** Insert text at the insertion point: after a selected run, into a cell or header, or at the end of the paragraph. */
function insertInline(doc: WordDoc, ui: SimUi, text: string, sep = "") {
  const s = parseSel(doc, ui.selection);
  if (s.header) {
    const cur = s.header === "header" ? doc.header : doc.footer;
    const v = cur && cur !== "[Type here]" ? `${cur}${sep}${text}` : text;
    if (s.header === "header") doc.header = v;
    else doc.footer = v;
    return;
  }
  if (s.cell) {
    const p = doc.paragraphs.find((x) => x.id === s.cell!.para);
    if (p?.table && s.cell.r > 0 && s.cell.c > 0) {
      const cur = p.table.rows[s.cell.r - 1]?.[s.cell.c - 1] ?? "";
      p.table.rows[s.cell.r - 1][s.cell.c - 1] = cur ? `${cur}${sep}${text}` : text;
    }
    return;
  }
  if (s.run) {
    const p = doc.paragraphs.find((x) => x.id === s.run!.para);
    const idx = p?.runs?.findIndex((r) => r.id === s.run!.run) ?? -1;
    if (p?.runs && idx >= 0) p.runs.splice(idx + 1, 0, { ...charProps(p.runs[idx]), text: `${sep}${text}` });
    return;
  }
  const p = selectedParas(doc, ui)[0];
  if (p && (!p.kind || p.kind === "p")) {
    const has = paraText(p).length > 0;
    p.runs = [...runsOf(p), { text: (has ? sep : "") + text }];
    p.text = undefined;
  }
}

const SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

function changeCase(text: string, mode: string): string {
  switch (mode) {
    case "UPPERCASE": return text.toUpperCase();
    case "lowercase": return text.toLowerCase();
    case "Capitalize Each Word": return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    case "Sentence case.": return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case "tOGGLE cASE": return text.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("");
  }
  return text;
}

function replaceAll(doc: WordDoc, find: string, repl: string, matchCase: boolean, whole: boolean): number {
  if (!find) return 0;
  const esc = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(whole ? `(?<![A-Za-z0-9_])${esc}(?![A-Za-z0-9_])` : esc, matchCase ? "g" : "gi");
  let n = 0;
  for (const p of doc.paragraphs) {
    if (p.kind === "table" && p.table) {
      p.table.rows = p.table.rows.map((r) => r.map((c) => c.replace(re, () => { n++; return repl; })));
      continue;
    }
    if (p.runs) {
      for (const r of p.runs) r.text = r.text.replace(re, () => { n++; return repl; });
    } else if (p.text) {
      p.text = p.text.replace(re, () => { n++; return repl; });
    }
  }
  return n;
}

/* ---------- Links ---------- */

const LINK_RE = /(https?:\/\/[^\s]+|www\.[^\s]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

/** The address Word's AutoFormat As You Type gives typed text, if it is a web or email address. */
export function autoLinkAddress(s: string): string | undefined {
  const t = s.trim().replace(/[.,;:!?)]+$/, "");
  if (/^https?:\/\/\S+$/i.test(t)) return t;
  if (/^www\.\S+$/i.test(t)) return `http://${t}`;
  if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(t)) return `mailto:${t}`;
  return undefined;
}

function linkify(text: string, base: Partial<WordRun>): WordRun[] {
  const out: WordRun[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    let url = m[0];
    const trail = /[.,;:!?)]+$/.exec(url)?.[0] ?? "";
    url = url.slice(0, url.length - trail.length);
    const start = m.index ?? 0;
    if (start > last) out.push({ ...base, text: text.slice(last, start) });
    out.push({ ...base, text: url, link: autoLinkAddress(url) });
    last = start + url.length;
  }
  if (last < text.length || !out.length) out.push({ ...base, text: text.slice(last) });
  return out;
}

/* ---------- Tables ---------- */

function tableAt(doc: WordDoc, ui: SimUi): { p: WordPara; t: XTable; cell?: ParsedSel["cell"] } | null {
  const s = parseSel(doc, ui.selection);
  const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
  if (!p?.table) return null;
  return { p, t: p.table as XTable, cell: s.cell };
}

function tableFromText(lines: string[], sep: string, cols?: number): string[][] {
  const split = (l: string) => (sep === "Paragraphs" ? [l] : l.split(sep === "Tabs" ? "\t" : sep === "Commas" ? "," : sep).map((c) => c.trim()));
  const rows = lines.map(split);
  const n = Math.max(cols ?? 0, ...rows.map((r) => r.length));
  return rows.map((r) => Array.from({ length: n }, (_, i) => r[i] ?? ""));
}

/* ---------- Charts ---------- */

function chartOf(p: WordPara | undefined): XChart | undefined {
  return p?.chart as XChart | undefined;
}

/* ---------- Citations ---------- */

/** Built-in Researcher results, keyed by topic words. */
export const RESEARCH_TOPICS: { keys: string[]; sources: (Source & { snippet: string; kind: string })[] }[] = [
  {
    keys: ["blood pressure", "hypertension"],
    sources: [
      { kind: "Journal", type: "Journal Article", author: "Alvarez, M.", title: "Home Blood Pressure Monitoring in Adults: A Review", year: "2024", publisher: "Journal of Community Health Practice", snippet: "Readings taken at home at the same time each day give a more reliable picture than a single office reading." },
      { kind: "Website", type: "Web site", author: "National Health Education Institute", title: "Understanding High Blood Pressure", year: "2025", publisher: "National Health Education Institute", snippet: "A reading of 130/80 mm Hg or higher is considered high blood pressure for most adults." },
      { kind: "Website", type: "Web site", author: "Miracle Cures Daily", title: "Cure Your Blood Pressure in 7 Days With This One Trick", year: "2019", publisher: "Miracle Cures Daily (blog)", snippet: "Doctors don't want you to know this one simple trick." },
    ],
  },
  {
    keys: ["flu", "influenza", "vaccine"],
    sources: [
      { kind: "Website", type: "Web site", author: "National Health Education Institute", title: "Seasonal Flu Vaccines: Who Should Get One", year: "2025", publisher: "National Health Education Institute", snippet: "Everyone 6 months and older should get a flu vaccine every season, with rare exceptions." },
      { kind: "Journal", type: "Journal Article", author: "Okafor, A.", title: "Flu Vaccination Rates in Urban Primary Care", year: "2023", publisher: "Journal of Community Health Practice", snippet: "Reminder letters raised vaccination rates by 12 percentage points." },
      { kind: "Website", type: "Web site", author: "Natural Immunity Now", title: "Why You Never Need a Flu Shot", year: "2018", publisher: "Natural Immunity Now (blog)", snippet: "Skip the shot and boost immunity with our supplement." },
    ],
  },
];

export function researchResults(query: string) {
  const q = query.toLowerCase();
  return (RESEARCH_TOPICS.find((t) => t.keys.some((k) => q.includes(k))) ?? RESEARCH_TOPICS[0]).sources;
}

function citationText(doc: WordDoc, s: Source): string {
  const style = String(doc.flags?.citationStyle ?? "APA");
  const last = s.author.split(",")[0].trim();
  if (style === "MLA") return `(${last})`;
  if (style === "Chicago") return `(${last} ${s.year})`;
  if (style === "IEEE") return `[${(xd(doc).sources ?? []).indexOf(s) + 1}]`;
  return `(${last}, ${s.year})`;
}

function addCitation(doc: WordDoc, ui: SimUi, s: Source) {
  const d = xd(doc);
  d.sources = [...(d.sources ?? []).filter((x) => x.title !== s.title), s];
  const src = d.sources[d.sources.length - 1];
  insertInline(doc, ui, citationText(doc, src), " ");
}

function bibEntry(doc: WordDoc, s: Source): string {
  const style = String(doc.flags?.citationStyle ?? "APA");
  if (style === "MLA") return `${s.author}. "${s.title}." ${s.publisher ?? ""}, ${s.year}.`.replace(" , ", " ");
  return `${s.author} (${s.year}). ${s.title}. ${s.publisher ?? ""}.${s.url ? ` ${s.url}` : ""}`.replace(" .", ".");
}

/* ---------- Dictation ---------- */

/** What Dictate types for a spoken phrase: spoken punctuation becomes symbols. */
export function dictationText(spoken: string): string {
  let t = ` ${spoken.trim()} `;
  const marks: [RegExp, string][] = [
    [/\s+(period|full stop)(?=\s)/gi, "."],
    [/\s+comma(?=\s)/gi, ","],
    [/\s+question mark(?=\s)/gi, "?"],
    [/\s+exclamation (point|mark)(?=\s)/gi, "!"],
    [/\s+semicolon(?=\s)/gi, ";"],
    [/\s+colon(?=\s)/gi, ":"],
    [/\s+open parenthesis\s+/gi, " ("],
    [/\s+close parenthesis(?=\s)/gi, ")"],
  ];
  for (const [re, s] of marks) t = t.replace(re, s);
  t = t.trim().replace(/\s+/g, " ");
  return t.replace(/(^|[.!?]\s+)([a-z])/g, (_, a, b) => a + b.toUpperCase());
}

/* ---------- Dialog helpers ---------- */

function changed(val: Record<string, SimValue>, defs: Record<string, SimValue>, k: string): boolean {
  if (val[k] === undefined || val[k] === "") return false;
  return String(val[k]) !== String(defs[k]);
}

function marginsLabel(t: number, b: number, l: number, r: number, gutter = 0): string {
  const presets: Record<string, number[]> = { Normal: [1, 1, 1, 1], Narrow: [0.5, 0.5, 0.5, 0.5], Moderate: [1, 1, 0.75, 0.75], Wide: [1, 1, 2, 2] };
  if (!gutter) for (const [k, v] of Object.entries(presets)) if (v[0] === t && v[1] === b && v[2] === l && v[3] === r) return k;
  return `Custom (T ${t}" B ${b}" L ${l}" R ${r}"${gutter ? ` G ${gutter}"` : ""})`;
}

/** Top/bottom/left/right/gutter for a margins label. */
export function marginsOf(label?: string): { t: number; b: number; l: number; r: number; g: number } {
  switch (label ?? "Normal") {
    case "Normal": return { t: 1, b: 1, l: 1, r: 1, g: 0 };
    case "Narrow": return { t: 0.5, b: 0.5, l: 0.5, r: 0.5, g: 0 };
    case "Moderate": return { t: 1, b: 1, l: 0.75, r: 0.75, g: 0 };
    case "Wide": return { t: 1, b: 1, l: 2, r: 2, g: 0 };
    case "Mirrored": return { t: 1, b: 1, l: 1.25, r: 1, g: 0 };
  }
  const m = /T ([\d.]+)" B ([\d.]+)" L ([\d.]+)" R ([\d.]+)"(?: G ([\d.]+)")?/.exec(label ?? "");
  if (m) return { t: Number(m[1]), b: Number(m[2]), l: Number(m[3]), r: Number(m[4]), g: Number(m[5] ?? 0) };
  const top = /Custom \(([\d.]+)"/.exec(label ?? "");
  return { t: top ? Number(top[1]) : 1, b: 1, l: 1, r: 1, g: 0 };
}

const LEADERS: Record<string, TabStop["leader"]> = { "2 .......": "dots", "3 -------": "dashes", "4 _______": "line" };

/* ------------------------------------------------------------------ */
/* Built-in command handling                                           */
/* ------------------------------------------------------------------ */

export function applyWord(input: WordDoc, c: SimCommit, ui: SimUi): { doc: WordDoc; ui?: Partial<SimUi> } {
  const common = applyCommonCommit(input, c, ".docx");
  if (common) return { doc: common };

  const doc = clone(input);
  const v = c.kind === "command" ? c.value : undefined;
  const sv = v === undefined ? "" : String(v);
  const sel = parseSel(doc, ui.selection);

  if (c.kind === "type") {
    return applyType(doc, c.target, c.value);
  }

  if (c.kind === "click") {
    if (c.target.startsWith("link:")) doc.flags = { ...(doc.flags ?? {}), followed: c.target.slice(5) };
    if (c.target.startsWith("toc:")) return { doc, ui: { selection: c.target.slice(4) } };
    return { doc };
  }

  if (c.kind === "dialog") {
    const val = c.values;
    switch (c.id) {
      case "font": {
        const defs = wordDialogDefaults(input, ui, "font");
        const ch = (k: string) => changed(val, defs, k);
        if (ch("font")) setChar(doc, ui, "font", String(val.font));
        if (ch("size")) setChar(doc, ui, "size", Number(val.size));
        if (ch("style")) {
          const st = String(val.style);
          setChar(doc, ui, "bold", st.includes("Bold"));
          setChar(doc, ui, "italic", st.includes("Italic"));
        }
        if (ch("color")) setChar(doc, ui, "color", val.color === "Automatic" ? undefined : String(val.color));
        if (ch("underline")) setChar(doc, ui, "underline", val.underline !== "(none)" && val.underline !== false);
        if (ch("strike")) setChar(doc, ui, "strike", Boolean(val.strike));
        if (ch("superscript")) setChar(doc, ui, "superscript", Boolean(val.superscript));
        if (ch("subscript")) setChar(doc, ui, "subscript", Boolean(val.subscript));
        if (ch("allCaps")) setChar(doc, ui, "caps", val.allCaps ? "upper" : undefined);
        return { doc };
      }
      case "paragraph": {
        const defs = wordDialogDefaults(input, ui, "paragraph");
        const ch = (k: string) => changed(val, defs, k);
        for (const p0 of selectedParas(doc, ui)) {
          const p = xp(p0);
          if (ch("alignment")) p.align = ({ Left: "left", Centered: "center", Right: "right", Justified: "justify" } as const)[String(val.alignment) as "Left"] ?? "left";
          if (ch("indentLeft")) p.indentLeft = Number(val.indentLeft);
          if (ch("indentRight")) p.indentRight = Number(val.indentRight);
          if (ch("special") || ch("by")) {
            const sp = String(val.special ?? defs.special);
            if (sp === "First line") { p.firstLine = Number(val.by ?? 0.5); p.hanging = undefined; }
            if (sp === "Hanging") { p.hanging = Number(val.by ?? 0.5); p.firstLine = undefined; }
            if (sp === "(none)") { p.hanging = undefined; p.firstLine = undefined; }
          }
          if (ch("spaceBefore")) p.spaceBefore = Number(val.spaceBefore);
          if (ch("spaceAfter")) p.spaceAfter = Number(val.spaceAfter);
          if (ch("lineSpacing") || ch("at")) {
            const map: Record<string, number> = { Single: 1, "1.5 lines": 1.5, Double: 2, Multiple: Number(val.at ?? 1.15) };
            const ls = String(val.lineSpacing ?? defs.lineSpacing);
            p.lineSpacing = map[ls] ?? (Number(ls) || p.lineSpacing);
          }
          if (ch("keepNext")) p.keepNext = Boolean(val.keepNext);
          if (ch("pageBreakBefore")) p.pageBreakBefore = Boolean(val.pageBreakBefore);
          if (val.clearTabs) p.tabStops = [];
          const pos = Number(val.tabPos);
          if (pos > 0) {
            const align = String(val.tabAlign ?? "Left").toLowerCase() as TabStop["align"];
            const leader = LEADERS[String(val.tabLeader ?? "")];
            p.tabStops = [...(p.tabStops ?? []).filter((t) => t.pos !== pos), { pos, align, ...(leader ? { leader } : {}) }].sort((a, b) => a.pos - b.pos);
          }
        }
        return { doc };
      }
      case "replace": {
        const n = replaceAll(doc, String(val.find ?? ""), String(val.replace ?? ""), Boolean(val.matchCase), Boolean(val.wholeWords));
        doc.replaced = n;
        doc.pane = `Replace: ${n} replacement${n === 1 ? "" : "s"}`;
        return { doc };
      }
      case "link": {
        let addr = String(val.address ?? "");
        if (val.linkTo === "E-mail Address" && addr && !addr.startsWith("mailto:")) addr = `mailto:${addr}`;
        const text = String(val.text ?? "");
        if (sel.run) {
          const p = doc.paragraphs.find((x) => x.id === sel.run!.para)!;
          const r = p.runs?.find((x) => x.id === sel.run!.run);
          if (r) {
            r.link = addr || undefined;
            if (text) r.text = text;
          }
        } else {
          for (const p of selectedParas(doc, ui)) {
            if (!p.runs) p.runs = [{ text: text || p.text || addr }];
            else if (text && p.runs.length === 1) p.runs[0].text = text;
            p.runs.forEach((r) => (r.link = addr || undefined));
            p.text = undefined;
          }
        }
        return { doc };
      }
      case "newComment": {
        const p = selectedParas(doc, ui)[0];
        if (p) p.comment = { author: "BEOC Student", text: String(val.text ?? "") };
        return { doc };
      }
      case "insertPicture": {
        const file = String(val.file ?? "Picture");
        insertAfterSelection(doc, ui, { id: newId("img", doc), kind: "image", object: { label: file, glyph: "🖼️", wrap: "inline", width: 45 } });
        return { doc };
      }
      case "onlinePictures": {
        const img = String(val.image ?? "Online picture");
        insertAfterSelection(doc, ui, { id: newId("img", doc), kind: "image", object: { label: img, glyph: "🌐", wrap: "inline", width: 40 } });
        return { doc };
      }
      case "insertChart": {
        insertAfterSelection(doc, ui, {
          id: newId("ch", doc),
          kind: "chart",
          chart: { type: String(val.type ?? "Clustered Column"), title: "Chart Title", series: [{ label: "Category 1", value: 4.3 }, { label: "Category 2", value: 2.5 }, { label: "Category 3", value: 3.5 }, { label: "Category 4", value: 4.5 }] },
        });
        return { doc };
      }
      case "insertTable": {
        const cols = Number(val.cols ?? 3), rows = Number(val.rows ?? 2);
        const id = newId("tbl", doc);
        insertAfterSelection(doc, ui, { id, kind: "table", table: { rows: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")), style: "Table Grid" } });
        return { doc, ui: { selection: `${id}.r1c1` } };
      }
      case "convertTextToTable": {
        const ps = selectedParas(doc, ui).filter((p) => !p.kind || p.kind === "p");
        if (!ps.length) return { doc };
        const id = newId("tbl", doc);
        const rows = tableFromText(ps.map(paraText), String(val.separator ?? "Commas"), Number(val.cols) || undefined);
        const first = doc.paragraphs.findIndex((p) => p.id === ps[0].id);
        const ids = ps.map((p) => p.id);
        doc.paragraphs = doc.paragraphs.filter((p) => !ids.includes(p.id));
        doc.paragraphs.splice(first, 0, { id, kind: "table", table: { rows, style: "Table Grid" } });
        return { doc, ui: { selection: `${id}.r1c1` } };
      }
      case "altText": {
        const p = selectedParas(doc, ui)[0];
        const decorative = Boolean(val.decorative);
        const text = decorative ? "" : String(val.text ?? "");
        if (p?.object) p.object = { ...p.object, text, ...(decorative ? { decorative: true } : { decorative: undefined }) } as XObject;
        else if (p?.chart) Object.assign(p.chart as XChart, { alt: text, decorative: decorative || undefined });
        doc.flags = { ...(doc.flags ?? {}), altText: decorative ? "(decorative)" : text };
        return { doc };
      }
      case "pageBorders":
        doc.pageBorder = String(val.setting ?? "Box") !== "None";
        return { doc };
      case "watermark":
        doc.watermark = val.kind === "No watermark" ? undefined : String(val.text ?? "");
        return { doc };
      case "zoom": {
        const presets: Record<string, number> = { "200%": 200, "100%": 100, "75%": 75, "Page width": 120, "Whole page": 60 };
        const defs = wordDialogDefaults(input, ui, "zoom");
        doc.zoom = changed(val, defs, "percent") || !val.preset ? Number(val.percent ?? 100) : presets[String(val.preset)] ?? Number(val.percent ?? 100);
        return { doc };
      }
      case "dateTime":
        insertInline(doc, ui, String(val.format ?? "10/20/2026"), " ");
        if (val.update) doc.flags = { ...(doc.flags ?? {}), dateField: true };
        return { doc };
      case "symbol":
        insertInline(doc, ui, String(val.symbol ?? "©"));
        return { doc };
      case "sort": {
        const ps = selectedParas(doc, ui);
        const ids = ps.map((p) => p.id);
        const sorted = ps.slice().sort((a, b) => paraText(a).localeCompare(paraText(b)));
        if (String(val.order ?? "Ascending") === "Descending") sorted.reverse();
        const first = doc.paragraphs.findIndex((p) => p.id === ids[0]);
        doc.paragraphs = doc.paragraphs.filter((p) => !ids.includes(p.id));
        doc.paragraphs.splice(first, 0, ...sorted);
        return { doc };
      }
      case "selectRecipients":
        doc.merge = { ...(doc.merge ?? {}), source: String(val.file ?? "") };
        return { doc };
      case "properties":
        doc.flags = { ...(doc.flags ?? {}), title: String(val.title ?? ""), tags: String(val.tags ?? "") };
        return { doc };
      case "encrypt":
        doc.flags = { ...(doc.flags ?? {}), protect: "Encrypt with Password", password: String(val.password ?? "") ? "set" : "" };
        return { doc };
      case "pageSetup":
      case "customMargins": {
        const defs = wordDialogDefaults(input, ui, c.id);
        const num = (k: string) => Number(val[k] ?? defs[k]);
        doc.page = { ...(doc.page ?? {}), margins: marginsLabel(num("top"), num("bottom"), num("left"), num("right"), num("gutter") || 0) };
        if (c.id === "pageSetup") {
          if (changed(val, defs, "size")) doc.page.size = String(val.size);
          if (changed(val, defs, "orientation") || changed(val, defs, "applyTo")) {
            const o = String(val.orientation ?? defs.orientation).toLowerCase() as "portrait" | "landscape";
            const applyTo = String(val.applyTo ?? defs.applyTo);
            const secs = applyTo === "Whole document" ? Array.from({ length: sectionBreaks(doc).length + 1 }, (_, i) => i) : applyTo === "This point forward" ? Array.from({ length: sectionBreaks(doc).length + 1 }, (_, i) => i).filter((i) => i >= selectedSections(doc, ui)[0]) : selectedSections(doc, ui);
            for (const i of secs) setSectionProps(doc, i, { orientation: o });
          }
          if (changed(val, defs, "vAlign")) doc.flags = { ...(doc.flags ?? {}), vAlign: String(val.vAlign) };
        }
        return { doc };
      }
      case "columns": {
        const defs = wordDialogDefaults(input, ui, "columns");
        const presets: Record<string, number> = { One: 1, Two: 2, Three: 3, Left: 2, Right: 2 };
        const n = changed(val, defs, "num") ? Number(val.num) : changed(val, defs, "preset") ? presets[String(val.preset)] ?? 1 : Number(defs.num);
        const patch: SectionProps = { columns: Math.max(1, Math.min(6, n || 1)) };
        if (val.spacing !== undefined && val.spacing !== "") patch.spacing = Number(val.spacing);
        if (val.line !== undefined) patch.line = Boolean(val.line);
        const applyTo = String(val.applyTo ?? defs.applyTo);
        const all = Array.from({ length: sectionBreaks(doc).length + 1 }, (_, i) => i);
        const secs = applyTo === "Whole document" ? all : applyTo === "This point forward" ? all.filter((i) => i >= selectedSections(doc, ui)[0]) : selectedSections(doc, ui);
        for (const i of secs) setSectionProps(doc, i, patch);
        return { doc };
      }
      case "defineBullet":
        for (const p of selectedParas(doc, ui)) {
          p.list = "bullet";
          p.bulletChar = String(val.symbol ?? "•");
          xp(p).bulletColor = val.color && val.color !== "Automatic" ? String(val.color) : undefined;
        }
        return { doc };
      case "setNumbering":
        for (const [i, p] of selectedParas(doc, ui).entries()) {
          if (i > 0) break;
          if (String(val.mode ?? "Start new list") === "Continue from previous list") {
            delete xp(p).numberStart;
            xp(p).numberContinue = true;
          } else {
            xp(p).numberStart = Number(val.start ?? 1) || 1;
            delete xp(p).numberContinue;
          }
        }
        return { doc };
      case "compressPictures":
        for (const p of doc.paragraphs) {
          if (p.kind !== "image" || !p.object) continue;
          if (val.onlyThis && !sel.paras.includes(p.id)) continue;
          p.object = { ...p.object, style: `${(p.object.style ?? "").replace(/\s*compress:[^ ]*/g, "")} compress:${String(val.resolution ?? "default").replace(/\s+/g, "_")}`.trim() };
        }
        doc.flags = { ...(doc.flags ?? {}), compressed: String(val.resolution ?? "") };
        return { doc };
      case "modifyStyle": {
        // Only the fields changed in the dialog become part of the style.
        const defs = wordDialogDefaults(input, ui, "modifyStyle");
        const ch = (k: string) => changed(val, defs, k);
        const name = String(val.style ?? defs.style ?? "Normal");
        const d = xd(doc);
        const ov: StyleDef = { ...(d.styleDefs?.[name] ?? {}) };
        if (ch("font")) ov.font = String(val.font);
        if (ch("size")) ov.size = Number(val.size);
        if (ch("color")) { if (val.color === "Automatic") delete ov.color; else ov.color = String(val.color); }
        if (ch("bold")) ov.bold = Boolean(val.bold);
        if (ch("italic")) ov.italic = Boolean(val.italic);
        if (ch("spaceAfter")) ov.spaceAfter = Number(val.spaceAfter);
        if (ch("align")) ov.align = ({ Left: "left", Center: "center", Right: "right", Justify: "justify" } as const)[String(val.align) as "Left"];
        d.styleDefs = { ...(d.styleDefs ?? {}), [name]: ov };
        if (val.scope === "New documents based on this template") doc.flags = { ...(doc.flags ?? {}), [`template:${name}`]: true };
        return { doc };
      }
      case "createStyle": {
        const name = String(val.name ?? "").trim() || "Style1";
        const d = xd(doc);
        const def: StyleDef & { basedOn?: string } = { basedOn: String(val.basedOn ?? "Normal") };
        if (val.font) def.font = String(val.font);
        if (val.size) def.size = Number(val.size);
        if (val.color && val.color !== "Automatic") def.color = String(val.color);
        if (val.bold) def.bold = true;
        if (val.italic) def.italic = true;
        d.customStyles = { ...(d.customStyles ?? {}), [name]: def };
        for (const p of selectedParas(doc, ui)) {
          p.style = name;
          for (const k of CHAR_KEYS) delete (p as unknown as Record<string, unknown>)[k];
        }
        return { doc };
      }
      case "saveStyleSet":
        doc.flags = { ...(doc.flags ?? {}), savedStyleSet: String(val.name ?? "") };
        return { doc };
      case "saveTheme":
        doc.flags = { ...(doc.flags ?? {}), savedTheme: String(val.name ?? "") };
        return { doc };
      case "updateToc":
        return { doc: updateToc(doc, String(val.mode ?? "Update entire table") !== "Update page numbers only") };
      case "createSource": {
        const s: Source = {
          type: String(val.type ?? "Web site"),
          author: String(val.author ?? "").trim() || "Anonymous",
          title: String(val.title ?? "").trim(),
          year: String(val.year ?? "").trim() || "n.d.",
          publisher: String(val.publisher ?? "").trim() || undefined,
          url: String(val.url ?? "").trim() || undefined,
        };
        addCitation(doc, ui, s);
        return { doc };
      }
    }
    return { doc };
  }

  if (c.kind !== "command") return { doc };

  switch (c.id) {
    /* ---------------- Clipboard ---------------- */
    case "home.cut":
    case "home.copy": {
      if (sel.run) {
        const p = doc.paragraphs.find((x) => x.id === sel.run!.para)!;
        const r = p.runs?.find((x) => x.id === sel.run!.run);
        doc.clipboard = { text: r?.text ?? "" };
        if (c.id === "home.cut" && r) r.text = "";
      } else {
        const ps = selectedParas(doc, ui);
        doc.clipboard = { paras: clone(ps) };
        if (c.id === "home.cut") {
          const ids = ps.map((p) => p.id);
          const idx = doc.paragraphs.findIndex((p) => p.id === ids[0]);
          doc.paragraphs = doc.paragraphs.filter((p) => !ids.includes(p.id));
          const next = doc.paragraphs[Math.min(idx, doc.paragraphs.length - 1)];
          return { doc, ui: { selection: next?.id ?? "" } };
        }
      }
      return { doc };
    }
    case "home.paste": {
      const cb = doc.clipboard;
      if (!cb) return { doc };
      if (cb.text !== undefined && sel.run) {
        const p = doc.paragraphs.find((x) => x.id === sel.run!.para)!;
        const r = p.runs?.find((x) => x.id === sel.run!.run);
        if (r) r.text = cb.text;
        return { doc };
      }
      if (cb.paras) {
        const taken = new Set<string>();
        const copies = cb.paras.map((p) => {
          const cp = clone(p);
          if (doc.paragraphs.some((x) => x.id === cp.id) || taken.has(cp.id)) cp.id = newId(`${cp.id}-`, doc, taken);
          else taken.add(cp.id);
          if (sv === "Keep Text Only" || sv === "Merge Formatting") {
            return { id: cp.id, text: paraText(cp) } as WordPara;
          }
          return cp;
        });
        const anchor = sel.paras[0];
        const idx = doc.paragraphs.findIndex((p) => p.id === anchor);
        doc.paragraphs.splice(idx < 0 ? doc.paragraphs.length : idx, 0, ...copies);
        return { doc, ui: { selection: copies.map((p) => p.id).join(",") } };
      }
      if (cb.text !== undefined) insertInline(doc, ui, cb.text);
      return { doc };
    }
    case "home.formatPainter": {
      const t = firstTarget(doc, ui);
      if (t) doc.painter = { bold: t.bold, italic: t.italic, underline: t.underline, font: t.font, size: t.size, color: t.color, highlight: t.highlight, style: t.style };
      return { doc };
    }
    case "home.formatPainter.apply": {
      const pt = doc.painter;
      if (pt) {
        editTargets(doc, ui, (t) => {
          for (const k of ["bold", "italic", "underline", "font", "size", "color", "highlight"] as CharKey[]) {
            if (pt[k] !== undefined) (t as unknown as Record<string, unknown>)[k] = pt[k];
          }
        });
        for (const p of selectedParas(doc, ui)) if (pt.style && !sel.run) p.style = pt.style;
      }
      doc.painter = null;
      return { doc };
    }

    case "edit.delete": {
      if (sel.run) {
        const p = doc.paragraphs.find((x) => x.id === sel.run!.para);
        const r = p?.runs?.find((x) => x.id === sel.run!.run);
        if (r) {
          if (doc.trackChanges) r.del = true;
          else r.text = "";
        }
        return { doc };
      }
      if (sel.cell) {
        const p = doc.paragraphs.find((x) => x.id === sel.cell!.para);
        if (p?.table) {
          p.table.rows = p.table.rows.map((row, ri) => row.map((cell, ci) => ((sel.cell!.r === 0 || sel.cell!.r === ri + 1) && (sel.cell!.c === 0 || sel.cell!.c === ci + 1) ? "" : cell)));
        }
        return { doc };
      }
      const ids = sel.paras;
      if (doc.trackChanges) {
        for (const p of selectedParas(doc, ui)) { p.runs = runsOf(p).map((r) => ({ ...r, del: true })); p.text = undefined; }
        return { doc };
      }
      const idx = doc.paragraphs.findIndex((p) => p.id === ids[0]);
      doc.paragraphs = doc.paragraphs.filter((p) => !ids.includes(p.id));
      const next = doc.paragraphs[Math.min(Math.max(0, idx), doc.paragraphs.length - 1)];
      return { doc, ui: { selection: next?.id ?? "" } };
    }

    /* ---------------- Font ---------------- */
    case "home.bold": toggleChar(doc, ui, "bold"); return { doc };
    case "home.italic": toggleChar(doc, ui, "italic"); return { doc };
    case "home.underline":
      if (sv && sv !== "Underline") setChar(doc, ui, "underline", true);
      else toggleChar(doc, ui, "underline");
      return { doc };
    case "home.strike": toggleChar(doc, ui, "strike"); return { doc };
    case "home.subscript": toggleChar(doc, ui, "subscript"); return { doc };
    case "home.superscript": toggleChar(doc, ui, "superscript"); return { doc };
    case "home.fontName": setChar(doc, ui, "font", sv); return { doc };
    case "home.fontSize": setChar(doc, ui, "size", Number(sv.replace(/[^0-9.]/g, "")) || 11); return { doc };
    case "home.growFont":
    case "home.shrinkFont": {
      const cur = firstTarget(doc, ui)?.size ?? 11;
      const i = SIZES.findIndex((s) => s >= cur);
      const next = c.id === "home.growFont" ? SIZES[Math.min(SIZES.length - 1, (SIZES[i] === cur ? i + 1 : i))] : SIZES[Math.max(0, (i < 0 ? SIZES.length : i) - 1)];
      setChar(doc, ui, "size", next);
      return { doc };
    }
    case "home.fontColor": setChar(doc, ui, "color", sv === "Automatic" ? undefined : sv || "#C00000"); return { doc };
    case "home.highlight": setChar(doc, ui, "highlight", sv === "No Color" ? undefined : sv || "#FFFF00"); return { doc };
    case "home.clearFormatting":
      editTargets(doc, ui, (t, isRun) => {
        for (const k of CHAR_KEYS) delete (t as unknown as Record<string, unknown>)[k];
        if (!isRun) {
          (t as WordPara).style = "Normal";
          (t as WordPara).runs?.forEach((r) => {
            for (const k of CHAR_KEYS) delete (r as unknown as Record<string, unknown>)[k];
          });
        }
      });
      return { doc };
    case "home.changeCase":
      editTargets(doc, ui, (t, isRun) => {
        if (isRun) (t as WordRun).text = changeCase((t as WordRun).text, sv);
        else {
          const p = t as WordPara;
          if (p.runs) p.runs.forEach((r) => (r.text = changeCase(r.text, sv)));
          else p.text = changeCase(p.text ?? "", sv);
        }
      });
      return { doc };
    case "home.textEffects":
      setChar(doc, ui, "color", "#4472C4");
      return { doc };

    /* ---------------- Paragraph ---------------- */
    case "home.bullets":
    case "home.numbering": {
      const kind = c.id === "home.bullets" ? "bullet" : "number";
      const ps = selectedParas(doc, ui);
      const allOn = ps.every((p) => p.list === kind);
      for (const p of ps) {
        if (sv === "None") { p.list = null; continue; }
        p.list = allOn && !sv ? null : kind;
        if (kind === "bullet" && sv) { p.bulletChar = sv; delete xp(p).bulletColor; }
        if (kind === "number" && sv) p.numberFormat = sv;
      }
      return { doc };
    }
    case "home.multilevel":
      for (const p of selectedParas(doc, ui)) { p.list = "number"; p.numberFormat = sv.startsWith("Article") ? "I." : "1."; xp(p).multi = sv || "1. a. i."; }
      return { doc };
    case "list.restart":
    case "list.continue":
      for (const p of selectedParas(doc, ui).slice(0, 1)) {
        if (c.id === "list.restart") { xp(p).numberStart = 1; delete xp(p).numberContinue; }
        else { delete xp(p).numberStart; xp(p).numberContinue = true; }
      }
      return { doc };
    case "home.indentInc":
    case "home.indentDec":
      for (const p of selectedParas(doc, ui)) {
        if (p.list) p.listLevel = Math.max(0, Math.min(3, (p.listLevel ?? 0) + (c.id === "home.indentInc" ? 1 : -1)));
        else p.indentLeft = Math.max(0, (p.indentLeft ?? 0) + (c.id === "home.indentInc" ? 0.5 : -0.5));
      }
      return { doc };
    case "home.hangingIndent":
    case "home.hangingIndentDec":
      for (const p of selectedParas(doc, ui)) {
        const h = Math.max(0, (p.hanging ?? 0) + (c.id === "home.hangingIndent" ? 0.5 : -0.5));
        p.hanging = h || undefined;
        if (h) p.firstLine = undefined;
      }
      return { doc };
    case "home.alignLeft":
    case "home.alignCenter":
    case "home.alignRight":
    case "home.justify": {
      const a = ({ "home.alignLeft": "left", "home.alignCenter": "center", "home.alignRight": "right", "home.justify": "justify" } as const)[c.id];
      for (const p of selectedParas(doc, ui)) p.align = a;
      if (sel.cell) for (const p of selectedParas(doc, ui)) if (p.table) p.table.align = a === "center" ? "center" : "left";
      return { doc };
    }
    case "home.lineSpacing": {
      if (sv.startsWith("Add Space Before")) { for (const p of selectedParas(doc, ui)) p.spaceBefore = 12; return { doc }; }
      if (sv.startsWith("Remove Space After")) { for (const p of selectedParas(doc, ui)) p.spaceAfter = 0; return { doc }; }
      if (sv.startsWith("Add Space After")) { for (const p of selectedParas(doc, ui)) p.spaceAfter = 8; return { doc }; }
      if (sv.startsWith("Remove Space Before")) { for (const p of selectedParas(doc, ui)) p.spaceBefore = 0; return { doc }; }
      const n = Number(sv);
      if (!Number.isNaN(n)) for (const p of selectedParas(doc, ui)) p.lineSpacing = n;
      return { doc };
    }
    case "home.shading": for (const p of selectedParas(doc, ui)) p.shading = sv === "No Color" ? undefined : sv || "#D9E2F3"; return { doc };
    case "home.borders": for (const p of selectedParas(doc, ui)) p.border = sv === "No Border" ? undefined : "#000000"; return { doc };
    case "home.showMarks": doc.showMarks = !doc.showMarks; return { doc };
    case "home.style": {
      if (CHAR_STYLE_NAMES.includes(sv)) {
        if (sv === "Strong" || sv === "Book Title") setChar(doc, ui, "bold", true);
        if (sv === "Emphasis" || sv === "Subtle Emphasis" || sv === "Intense Emphasis") setChar(doc, ui, "italic", true);
        return { doc };
      }
      for (const p of selectedParas(doc, ui)) {
        p.style = sv;
        // Applying a style replaces direct paragraph formatting of the same kind.
        delete p.size; delete p.font; delete p.color; delete p.bold;
      }
      return { doc };
    }
    case "home.updateStyle": {
      const p = selectedParas(doc, ui)[0];
      if (!p) return { doc };
      const name = sv || p.style || "Normal";
      const d = xd(doc);
      const ov: StyleDef = { ...(d.styleDefs?.[name] ?? {}) };
      const rs = runsOf(p);
      for (const k of ["font", "size", "color", "bold", "italic", "underline"] as CharKey[]) {
        const direct = (p as unknown as Record<string, unknown>)[k] ?? (rs.every((r) => r[k] !== undefined && r[k] === rs[0][k]) ? rs[0][k] : undefined);
        if (direct !== undefined) (ov as Record<string, unknown>)[k] = direct;
      }
      for (const k of ["align", "spaceBefore", "spaceAfter", "lineSpacing", "indentLeft"] as const) if (p[k] !== undefined) (ov as Record<string, unknown>)[k] = p[k];
      d.styleDefs = { ...(d.styleDefs ?? {}), [name]: ov };
      for (const k of [...CHAR_KEYS, "align", "spaceBefore", "spaceAfter", "lineSpacing", "indentLeft"]) delete (p as unknown as Record<string, unknown>)[k];
      p.runs?.forEach((r) => { for (const k of CHAR_KEYS) delete (r as unknown as Record<string, unknown>)[k]; });
      return { doc };
    }
    case "home.find":
      doc.navPane = true;
      doc.pane = "Navigation";
      return { doc };
    case "home.selectAll":
      return { doc, ui: { selection: "all" } };
    case "home.dictate":
      doc.pane = doc.pane === "Dictation" ? null : "Dictation";
      return { doc };
    case "home.dictateLanguage":
      doc.flags = { ...(doc.flags ?? {}), dictationLanguage: sv };
      return { doc };
    case "home.editor":
    case "review.spelling": {
      doc.pane = "Editor";
      const first = doc.paragraphs.flatMap((p) => (p.runs ?? []).filter((r) => r.misspelled && r.id).map((r) => `${p.id}.${r.id}`))[0];
      return { doc, ui: first ? { selection: first } : undefined };
    }
    case "spelling.change":
    case "spelling.ignore": {
      if (sel.run) {
        const p = doc.paragraphs.find((x) => x.id === sel.run!.para)!;
        const r = p.runs?.find((x) => x.id === sel.run!.run);
        if (r) {
          if (c.id === "spelling.change") r.text = sv || r.suggestions?.[0] || r.text;
          r.misspelled = false;
        }
      }
      const next = doc.paragraphs.flatMap((p) => (p.runs ?? []).filter((r) => r.misspelled && r.id).map((r) => `${p.id}.${r.id}`))[0];
      if (!next) doc.pane = "Editor: done";
      return { doc, ui: next ? { selection: next } : undefined };
    }

    /* ---------------- Insert ---------------- */
    case "insert.coverPage": {
      const taken = new Set<string>();
      doc.paragraphs.unshift(
        { id: newId("cv", doc, taken), style: "Title", text: "[Document title]", size: 36, color: themeOf(doc).heading },
        { id: newId("cv", doc, taken), style: "Subtitle", text: "[Document subtitle]" },
        { id: newId("cvb", doc, taken), kind: "pageBreak" },
      );
      doc.flags = { ...(doc.flags ?? {}), coverPage: sv };
      return { doc };
    }
    case "insert.blankPage": {
      const taken = new Set<string>();
      insertAfterSelection(doc, ui, { id: newId("br", doc, taken), kind: "pageBreak" }, true);
      insertAfterSelection(doc, ui, { id: newId("br", doc, taken), kind: "pageBreak" }, true);
      return { doc };
    }
    case "insert.pageBreak":
    case "layout.breaks": {
      if (sv === "Text Wrapping") {
        doc.flags = { ...(doc.flags ?? {}), textWrappingBreak: ui.selection };
        return { doc };
      }
      const kind: WordPara["kind"] = c.id === "layout.breaks" ? (sv.startsWith("Column") ? "columnBreak" : sv === "Page" || sv === "" ? "pageBreak" : "sectionBreak") : "pageBreak";
      const para: XPara = { id: newId(kind === "sectionBreak" ? "sb" : "br", doc), kind, text: sv || "Page" };
      if (kind === "sectionBreak") {
        // A new section starts with the layout of the section it splits.
        const first = sel.paras[0] ?? doc.paragraphs[0]?.id ?? "";
        const sp = sectionProps(doc, sectionIndex(doc, first));
        para.section = { orientation: sp.orientation, columns: sp.columns, spacing: sp.spacing, line: sp.line };
      }
      insertAfterSelection(doc, ui, para, true);
      return { doc };
    }
    case "insert.table": {
      const m = /^(\d+)\s*x\s*(\d+)/i.exec(sv);
      const cols = m ? Number(m[1]) : 3, rows = m ? Number(m[2]) : 3;
      const id = newId("tbl", doc);
      insertAfterSelection(doc, ui, { id, kind: "table", table: { rows: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")), style: "Table Grid" } });
      return { doc, ui: { selection: `${id}.r1c1` } };
    }
    case "insert.shape": {
      const id = newId("shp", doc);
      insertAfterSelection(doc, ui, { id, kind: "shape", object: { label: sv || "Rectangle", wrap: "front", width: 30, shapeFill: themeOf(doc).accent } });
      return { doc, ui: { selection: id } };
    }
    case "insert.textBox": {
      const id = newId("tb", doc);
      insertAfterSelection(doc, ui, { id, kind: "textbox", object: { label: sv || "Simple Text Box", wrap: "square", width: 40, text: "[Grab your reader's attention with a great quote from the document.]" } });
      return { doc, ui: { selection: id } };
    }
    case "insert.icons":
    case "insert.smartArt":
    case "insert.onlinePictures":
    case "insert.screenshot":
      insertAfterSelection(doc, ui, { id: newId("img", doc), kind: "image", object: { label: sv || c.id.split(".")[1], glyph: c.id === "insert.icons" ? "★" : "🖼️", wrap: "inline", width: 30 } });
      return { doc };
    case "insert.pageNumber":
      doc.pageNumbers = sv || "Bottom of Page - Plain Number 2";
      return { doc };
    case "insert.header":
      if (sv === "Remove Header") doc.header = undefined;
      else doc.header = doc.header ?? (sv === "Blank (Three Columns)" ? "[Type here]    [Type here]    [Type here]" : "[Type here]");
      return { doc, ui: sv === "Remove Header" ? undefined : { selection: "header" } };
    case "insert.footer":
      if (sv === "Remove Footer") doc.footer = undefined;
      else doc.footer = doc.footer ?? (sv === "Blank (Three Columns)" ? "[Type here]    [Type here]    [Type here]" : "[Type here]");
      return { doc, ui: sv === "Remove Footer" ? undefined : { selection: "footer" } };
    case "header.close":
      return { doc, ui: { selection: doc.paragraphs[0]?.id ?? "" } };
    case "header.gotoHeader":
      doc.header = doc.header ?? "[Type here]";
      return { doc, ui: { selection: "header" } };
    case "header.gotoFooter":
      doc.footer = doc.footer ?? "[Type here]";
      return { doc, ui: { selection: "footer" } };
    case "header.differentFirst":
    case "header.differentOddEven": {
      const k = c.id.split(".")[1];
      doc.flags = { ...(doc.flags ?? {}), [k]: !doc.flags?.[k] };
      return { doc };
    }
    case "insert.dropCap":
      doc.flags = { ...(doc.flags ?? {}), dropCap: sv };
      return { doc };
    case "insert.wordArt":
      for (const p of selectedParas(doc, ui)) { p.size = 36; p.color = themeOf(doc).accent; p.bold = true; }
      return { doc };
    case "insert.symbol":
      insertInline(doc, ui, sv || "©");
      return { doc };
    case "insert.footnote":
    case "references.footnote": {
      doc.footnotes = [...(doc.footnotes ?? []), sv || "Footnote text."];
      const p = selectedParas(doc, ui)[0];
      if (p) { p.runs = [...runsOf(p), { text: String(doc.footnotes.length), superscript: true }]; p.text = undefined; }
      return { doc };
    }
    case "link.remove": {
      if (sel.run) {
        const r = doc.paragraphs.find((x) => x.id === sel.run!.para)?.runs?.find((x) => x.id === sel.run!.run);
        if (r) delete r.link;
      } else for (const p of selectedParas(doc, ui)) p.runs?.forEach((r) => delete r.link);
      return { doc };
    }

    /* ---------------- Design ---------------- */
    case "design.theme":
      if (sv === "Reset to Theme from Template") {
        doc.theme = undefined;
      } else doc.theme = sv;
      if (doc.flags) { delete doc.flags.colors; delete doc.flags.fonts; delete doc.flags.effects; }
      return { doc };
    case "design.styleSet":
      if (sv === "Reset to the Default Style Set") { doc.styleSet = "Default"; delete xd(doc).styleDefs; return { doc }; }
      doc.styleSet = sv;
      return { doc };
    case "design.watermark": doc.watermark = sv === "Remove Watermark" ? undefined : sv.replace(/ \d$/, ""); return { doc };
    case "design.pageColor": doc.pageColor = sv === "No Color" ? undefined : sv; return { doc };
    case "design.paragraphSpacing": {
      const map: Record<string, [number, number]> = { "No Paragraph Space": [0, 1], Compact: [4, 1], Tight: [6, 1.15], Open: [10, 1.15], Relaxed: [6, 1.5], Double: [8, 2] };
      const m = map[sv];
      if (m) for (const p of doc.paragraphs) { p.spaceAfter = m[0]; p.lineSpacing = m[1]; }
      return { doc };
    }
    case "design.colors":
    case "design.fonts":
    case "design.effects":
    case "design.setDefault":
      doc.flags = { ...(doc.flags ?? {}), [c.id.split(".")[1]]: sv || true };
      return { doc };

    /* ---------------- Layout ---------------- */
    case "layout.margins": doc.page = { ...(doc.page ?? {}), margins: sv }; return { doc };
    case "layout.orientation": {
      const o = sv.toLowerCase() as "portrait" | "landscape";
      if (!sectionBreaks(doc).length) doc.page = { ...(doc.page ?? {}), orientation: o };
      else for (const i of selectedSections(doc, ui)) setSectionProps(doc, i, { orientation: o });
      return { doc };
    }
    case "layout.size": doc.page = { ...(doc.page ?? {}), size: sv }; return { doc };
    case "layout.columns": {
      const n = sv === "Two" ? 2 : sv === "Three" ? 3 : sv === "One" ? 1 : sv === "Left" || sv === "Right" ? 2 : Number(sv) || 1;
      const ids = sel.paras;
      const whole = ui.selection === "all" || ids.length >= doc.paragraphs.length;
      if (whole) {
        doc.page = { ...(doc.page ?? {}), columns: n };
        for (const b of sectionBreaks(doc)) b.section = { ...(b.section ?? {}), columns: n };
        return { doc };
      }
      if (ids.length > 1) {
        // Columns on a selection: Word wraps the selection in continuous section breaks.
        const firstIdx = doc.paragraphs.findIndex((p) => p.id === ids[0]);
        const lastIdx = doc.paragraphs.findIndex((p) => p.id === ids[ids.length - 1]);
        const orig = sectionProps(doc, sectionIndex(doc, ids[0]));
        const keep: SectionProps = { orientation: orig.orientation, columns: orig.columns, spacing: orig.spacing, line: orig.line };
        const taken = new Set<string>();
        const prev = doc.paragraphs[firstIdx - 1];
        const needBefore = firstIdx > 0 && prev?.kind !== "sectionBreak";
        const next = doc.paragraphs[lastIdx + 1];
        const needAfter = Boolean(next) && next.kind !== "sectionBreak";
        // Ids in document order: the break before the selection, then the one after it.
        const beforeId = needBefore ? newId("sb", doc, taken) : "";
        const afterId = needAfter ? newId("sb", doc, taken) : "";
        if (needAfter) doc.paragraphs.splice(lastIdx + 1, 0, { id: afterId, kind: "sectionBreak", text: "Continuous", section: keep } as XPara);
        if (needBefore) {
          doc.paragraphs.splice(firstIdx, 0, { id: beforeId, kind: "sectionBreak", text: "Continuous", section: { ...keep, columns: n } } as XPara);
          return { doc };
        }
        setSectionProps(doc, sectionIndex(doc, ids[0]), { columns: n });
        return { doc };
      }
      for (const i of selectedSections(doc, ui)) setSectionProps(doc, i, { columns: n });
      return { doc };
    }
    case "layout.indentLeft": for (const p of selectedParas(doc, ui)) p.indentLeft = Number(sv); return { doc };
    case "layout.indentRight": for (const p of selectedParas(doc, ui)) xp(p).indentRight = Number(sv); return { doc };
    case "layout.spaceBefore": for (const p of selectedParas(doc, ui)) p.spaceBefore = Number(sv); return { doc };
    case "layout.spaceAfter": for (const p of selectedParas(doc, ui)) p.spaceAfter = Number(sv); return { doc };
    case "layout.hyphenation": doc.flags = { ...(doc.flags ?? {}), hyphenation: sv }; return { doc };
    case "layout.lineNumbers": doc.flags = { ...(doc.flags ?? {}), lineNumbers: sv }; return { doc };

    /* ---------------- Objects (contextual) ---------------- */
    case "picture.wrap":
    case "shape.wrap": {
      if (sv === "Move with Text" || sv === "Fix Position on Page") {
        for (const p of selectedParas(doc, ui)) if (p.object) xo(p.object).anchor = sv === "Move with Text" ? "move" : "fixed";
        return { doc };
      }
      const map: Record<string, NonNullable<WordPara["object"]>["wrap"]> = { "In Line with Text": "inline", Square: "square", Tight: "tight", Through: "tight", "Top and Bottom": "topBottom", "Behind Text": "behind", "In Front of Text": "front" };
      for (const p of selectedParas(doc, ui)) if (p.object) p.object.wrap = map[sv] ?? "square";
      return { doc };
    }
    case "picture.style": for (const p of selectedParas(doc, ui)) if (p.object) p.object.style = sv; return { doc };
    case "picture.border": for (const p of selectedParas(doc, ui)) if (p.object) p.object.border = sv === "No Outline" ? undefined : sv; return { doc };
    case "picture.position":
    case "shape.position":
    case "object.align": {
      if (/Top|Middle|Bottom|Distribute/.test(sv) && c.id === "object.align") {
        doc.flags = { ...(doc.flags ?? {}), [`align:${sv}`]: ui.selection };
        return { doc };
      }
      const a = sv.toLowerCase().includes("right") ? "right" : sv.toLowerCase().includes("center") ? "center" : "left";
      for (const p of selectedParas(doc, ui)) {
        if (!p.object) continue;
        if (sv === "In Line with Text") { p.object.wrap = "inline"; continue; }
        p.object.align = a;
        if (c.id !== "object.align" && p.object.wrap === "inline") p.object.wrap = "square";
      }
      return { doc };
    }
    case "picture.rotate":
    case "shape.rotate":
      for (const p of selectedParas(doc, ui)) {
        if (!p.object) continue;
        const o = xo(p.object);
        if (sv === "Flip Horizontal") o.flipH = !o.flipH;
        else if (sv === "Flip Vertical") o.flipV = !o.flipV;
        else o.rotate = (((o.rotate ?? 0) + (sv.includes("Left") ? -90 : 90)) % 360 + 360) % 360;
      }
      return { doc };
    case "picture.width":
    case "shape.width": for (const p of selectedParas(doc, ui)) if (p.object) p.object.width = Math.max(10, Math.min(100, Number(sv) * 10)); return { doc };
    case "picture.crop":
      for (const p of selectedParas(doc, ui)) {
        if (!p.object) continue;
        const o = xo(p.object);
        if (/^\d+:\d+$/.test(sv)) o.aspect = sv;
        else if (sv && sv !== "Crop" && sv !== "Fill" && sv !== "Fit") o.crop = sv;
        o.style = `${(o.style ?? "").replace(/\s*crop(:[^ ]*)?/g, "")} crop${sv && sv !== "Crop" ? `:${sv.replace(/\s+/g, "_")}` : ""}`.trim();
      }
      return { doc };
    case "picture.removeBackground":
    case "picture.corrections":
    case "picture.color":
    case "picture.artistic":
    case "picture.compress":
    case "picture.reset":
      for (const p of selectedParas(doc, ui)) {
        if (!p.object) continue;
        if (c.id === "picture.reset") { p.object = { label: p.object.label, glyph: p.object.glyph, wrap: p.object.wrap, align: p.object.align, width: p.object.width, text: p.object.text }; continue; }
        const key = c.id.split(".")[1];
        const cleaned = (p.object.style ?? "").replace(new RegExp(`\\s*${key}(:[^ ]*)?`, "g"), "");
        p.object = { ...p.object, style: `${cleaned} ${key}${sv ? `:${sv.replace(/\s+/g, "_")}` : ""}`.trim() };
      }
      return { doc };
    case "picture.effects":
    case "shape.effects":
      for (const p of selectedParas(doc, ui)) if (p.object) xo(p.object).effect = sv;
      return { doc };
    case "shape.fill": for (const p of selectedParas(doc, ui)) if (p.object) p.object.shapeFill = sv; return { doc };
    case "shape.outline": for (const p of selectedParas(doc, ui)) if (p.object) p.object.border = sv === "No Outline" ? undefined : sv; return { doc };
    case "shape.textFill": for (const p of selectedParas(doc, ui)) if (p.object) xo(p.object).textColor = sv; return { doc };
    case "shape.change": for (const p of selectedParas(doc, ui)) if (p.object && sv) p.object.label = sv; return { doc };
    case "shape.style": {
      const accents: Record<string, string> = { "Accent 1": themeOf(doc).accent, "Accent 2": "#ED7D31", "Accent 3": "#A5A5A5", "Accent 4": "#FFC000", "Accent 5": "#5B9BD5", "Accent 6": "#70AD47" };
      const k = /Accent \d/.exec(sv)?.[0] ?? "Accent 1";
      for (const p of selectedParas(doc, ui)) if (p.object) { p.object.style = sv; p.object.shapeFill = accents[k]; }
      return { doc };
    }
    case "object.bringForward":
    case "object.sendBackward": {
      const objs = doc.paragraphs.filter((p) => p.object).map((p) => xo(p.object!));
      const zs = objs.map((o) => o.z ?? 0);
      for (const p of selectedParas(doc, ui)) {
        if (!p.object) continue;
        const o = xo(p.object);
        if (sv === "Bring to Front") o.z = Math.max(0, ...zs) + 1;
        else if (sv === "Send to Back") o.z = Math.min(0, ...zs) - 1;
        else if (sv === "Send Behind Text") o.wrap = "behind";
        else if (sv === "Bring in Front of Text") o.wrap = "front";
        else o.z = (o.z ?? 0) + (c.id === "object.bringForward" ? 1 : -1);
      }
      doc.flags = { ...(doc.flags ?? {}), [c.id.split(".")[1]]: ui.selection };
      return { doc };
    }
    case "object.group":
    case "object.ungroup": {
      const ps = selectedParas(doc, ui).filter((p) => p.object);
      if (c.id === "object.group" && ps.length > 1) {
        const g = `g${ps[0].id}`;
        for (const p of ps) xo(p.object!).group = g;
      }
      if (c.id === "object.ungroup") for (const p of ps) delete xo(p.object!).group;
      doc.flags = { ...(doc.flags ?? {}), [c.id.split(".")[1]]: ui.selection };
      return { doc };
    }
    case "object.selectionPane":
      doc.pane = doc.pane === "Selection" ? null : "Selection";
      return { doc };

    /* ---------------- Tables ---------------- */
    case "table.select": {
      const t = tableAt(doc, ui);
      if (!t) return { doc };
      const r = t.cell?.r || 1, cc = t.cell?.c || 1;
      const key = sv === "Select Row" ? `r${r}c0` : sv === "Select Column" ? `r0c${cc}` : sv === "Select Table" ? "r0c0" : `r${r}c${cc}`;
      return { doc, ui: { selection: `${t.p.id}.${key}` } };
    }
    case "table.style": for (const p of selectedParas(doc, ui)) if (p.table) p.table.style = sv; return { doc };
    case "table.headerRow": for (const p of selectedParas(doc, ui)) if (p.table) p.table.headerRow = p.table.headerRow === false; return { doc };
    case "table.bandedRows": for (const p of selectedParas(doc, ui)) if (p.table) p.table.bandedRows = !p.table.bandedRows; return { doc };
    case "table.repeatHeader":
      for (const p of selectedParas(doc, ui)) {
        if (!p.table) continue;
        const t = p.table as XTable;
        t.repeatHeader = !t.repeatHeader;
        if (t.repeatHeader) t.headerRow = true;
      }
      return { doc };
    case "table.shading": for (const p of selectedParas(doc, ui)) if (p.table) p.table.headerFill = sv; return { doc };
    case "table.insertAbove":
    case "table.insertBelow": {
      const t = tableAt(doc, ui);
      if (!t) return { doc };
      const r = t.cell && t.cell.r > 0 ? t.cell.r - 1 : t.t.rows.length - 1;
      const at = c.id === "table.insertAbove" ? r : r + 1;
      t.t.rows.splice(at, 0, t.t.rows[0].map(() => ""));
      if (t.t.merged) t.t.merged = t.t.merged.map((m) => (m > at ? m + 1 : m));
      if (sv === "Tab") return { doc, ui: { selection: `${t.p.id}.r${at + 1}c1` } };
      return { doc };
    }
    case "table.insertLeft":
    case "table.insertRight": {
      const t = tableAt(doc, ui);
      if (!t) return { doc };
      const col = t.cell && t.cell.c > 0 ? t.cell.c - 1 : t.t.rows[0].length - 1;
      t.t.rows = t.t.rows.map((row) => {
        const r = row.slice();
        r.splice(c.id === "table.insertLeft" ? col : col + 1, 0, "");
        return r;
      });
      return { doc };
    }
    case "table.delete": {
      const t = tableAt(doc, ui);
      if (!t) return { doc };
      if (sv === "Delete Table" || (t.cell && t.cell.r === 0 && t.cell.c === 0 && sv !== "Delete Cells...")) {
        const at = doc.paragraphs.findIndex((x) => x.id === t.p.id);
        doc.paragraphs = doc.paragraphs.filter((x) => x.id !== t.p.id);
        const next = doc.paragraphs[Math.min(Math.max(0, at), doc.paragraphs.length - 1)];
        return { doc, ui: { selection: next?.id ?? "" } };
      }
      if (sv === "Delete Rows" && t.cell && t.cell.r > 0) {
        t.t.rows.splice(t.cell.r - 1, 1);
        if (t.t.merged) t.t.merged = t.t.merged.filter((m) => m !== t.cell!.r).map((m) => (m > t.cell!.r ? m - 1 : m));
        if (!t.t.rows.length) doc.paragraphs = doc.paragraphs.filter((x) => x.id !== t.p.id);
        const r = Math.min(t.cell.r, t.t.rows.length);
        return { doc, ui: { selection: t.t.rows.length ? `${t.p.id}.r${r}c${t.cell.c || 1}` : doc.paragraphs[0]?.id ?? "" } };
      }
      if (sv === "Delete Columns" && t.cell && t.cell.c > 0) {
        t.t.rows = t.t.rows.map((r) => r.filter((_, i) => i !== t.cell!.c - 1));
        const cc = Math.min(t.cell.c, t.t.rows[0]?.length ?? 1);
        return { doc, ui: { selection: `${t.p.id}.r${t.cell.r || 1}c${cc}` } };
      }
      return { doc };
    }
    case "table.merge": {
      const t = tableAt(doc, ui);
      if (t?.cell && t.cell.r > 0 && t.cell.c === 0) {
        const row = t.t.rows[t.cell.r - 1];
        const text = row.filter(Boolean).join(" ");
        t.t.rows[t.cell.r - 1] = row.map((_, i) => (i === 0 ? text : ""));
        t.t.merged = Array.from(new Set([...(t.t.merged ?? []), t.cell.r]));
        return { doc, ui: { selection: `${t.p.id}.r${t.cell.r}c1` } };
      }
      doc.flags = { ...(doc.flags ?? {}), "table.merge": sv || true };
      return { doc };
    }
    case "table.split": {
      const t = tableAt(doc, ui);
      if (t?.cell && t.t.merged?.includes(t.cell.r)) t.t.merged = t.t.merged.filter((m) => m !== t.cell!.r);
      doc.flags = { ...(doc.flags ?? {}), "table.split": sv || true };
      return { doc };
    }
    case "table.autofit":
      for (const p of selectedParas(doc, ui)) if (p.table) (p.table as XTable).autofit = sv;
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      return { doc };
    case "table.distributeColumns":
    case "table.alignment":
    case "table.borders":
      for (const p of selectedParas(doc, ui)) if (p.table) p.table = { ...p.table, ...(c.id === "table.alignment" ? { align: sv.includes("Center") ? "center" : "left" } : {}) };
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      return { doc };
    case "table.sort": {
      const p = selectedParas(doc, ui)[0];
      if (p?.table) {
        const [head, ...rest] = p.table.rows;
        rest.sort((a, b) => a[0].localeCompare(b[0]));
        if (sv === "Descending") rest.reverse();
        p.table.rows = p.table.headerRow === false ? [head, ...rest].sort((a, b) => a[0].localeCompare(b[0])) : [head, ...rest];
      }
      return { doc };
    }
    case "table.convertToText":
      for (const p of selectedParas(doc, ui)) if (p.table) { p.text = p.table.rows.map((r) => r.join("\t")).join(" "); p.kind = "p"; p.table = undefined; }
      return { doc };

    /* ---------------- Chart ---------------- */
    case "chart.type": for (const p of selectedParas(doc, ui)) if (p.chart) p.chart.type = sv; return { doc };
    case "chart.addElement":
      for (const p of selectedParas(doc, ui)) {
        const ch = chartOf(p);
        if (!ch) continue;
        ch.elements = Array.from(new Set([...(ch.elements ?? []), sv]));
        if (sv === "Chart Title" && !ch.title) ch.title = "Chart Title";
      }
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      return { doc };
    case "chart.style":
    case "chart.colors":
    case "chart.layout":
      for (const p of selectedParas(doc, ui)) {
        const ch = chartOf(p);
        if (!ch) continue;
        if (c.id === "chart.style") ch.style = sv;
        if (c.id === "chart.colors") ch.colors = sv;
        if (c.id === "chart.layout") ch.elements = Array.from(new Set([...(ch.elements ?? []), "Chart Title", "Legend", ...(sv === "Layout 5" ? ["Data Table"] : sv === "Layout 2" ? ["Data Labels"] : [])]));
      }
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      return { doc };

    /* ---------------- References ---------------- */
    case "references.toc": {
      if (sv === "Remove Table of Contents") { doc.paragraphs = doc.paragraphs.filter((p) => p.kind !== "toc"); return { doc }; }
      if (doc.paragraphs.some((p) => p.kind === "toc")) return { doc: updateToc(doc, true) };
      const s = parseSel(doc, ui.selection);
      const idx = Math.max(0, doc.paragraphs.findIndex((p) => p.id === s.paras[0]));
      const toc: XPara = { id: newId("toc", doc), kind: "toc", text: sv || "Automatic Table 1", entries: headingsOf(doc) };
      doc.paragraphs.splice(idx, 0, toc);
      return { doc };
    }
    case "references.updateToc":
      return { doc: updateToc(doc, true) };
    case "references.addText":
    case "references.citation":
    case "references.bibliography":
    case "references.caption":
    case "references.markEntry":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      if (c.id === "references.addText") for (const p of selectedParas(doc, ui)) p.style = sv === "Do Not Show in Table of Contents" ? "Normal" : `Heading ${sv.replace(/\D/g, "") || 1}`;
      if (c.id === "references.bibliography") {
        const srcs = xd(doc).sources ?? [];
        const taken = new Set<string>();
        const paras: WordPara[] = [
          { id: newId("bib", doc, taken), style: "Heading 1", text: sv || "Bibliography" },
          ...srcs
            .slice()
            .sort((a, b) => a.author.localeCompare(b.author))
            .map((s) => ({ id: newId("bib", doc, taken), text: bibEntry(doc, s), hanging: 0.5 }) as WordPara),
        ];
        const s = parseSel(doc, ui.selection);
        const last = s.paras[s.paras.length - 1];
        const idx = doc.paragraphs.findIndex((p) => p.id === last);
        doc.paragraphs.splice(idx < 0 ? doc.paragraphs.length : idx + 1, 0, ...paras);
      }
      return { doc };
    case "references.citationStyle":
      doc.flags = { ...(doc.flags ?? {}), citationStyle: sv };
      return { doc };
    case "researcher.add": {
      const all = RESEARCH_TOPICS.flatMap((t) => t.sources);
      const s = all.find((x) => x.title === sv);
      if (s) addCitation(doc, ui, { type: s.type, author: s.author, title: s.title, year: s.year, publisher: s.publisher });
      return { doc };
    }

    /* ---------------- Mailings ---------------- */
    case "mail.start": doc.merge = { ...(doc.merge ?? {}), type: sv }; return { doc };
    case "mail.recipients": doc.merge = { ...(doc.merge ?? {}), source: sv }; return { doc };
    case "mail.insertField": {
      if (sel.run) {
        const p = doc.paragraphs.find((x) => x.id === sel.run!.para)!;
        const r = p.runs?.find((x) => x.id === sel.run!.run);
        if (r) { r.field = sv; r.text = ""; }
      } else {
        const p = selectedParas(doc, ui)[0];
        if (p) { p.runs = [...runsOf(p), { text: "", field: sv }]; p.text = undefined; }
      }
      return { doc };
    }
    case "mail.addressBlock":
    case "mail.greetingLine": {
      const p = selectedParas(doc, ui)[0];
      if (p) { p.runs = [{ text: "", field: c.id === "mail.addressBlock" ? "AddressBlock" : "GreetingLine" }]; p.text = undefined; }
      return { doc };
    }
    case "mail.preview": doc.merge = { ...(doc.merge ?? {}), preview: !doc.merge?.preview, record: doc.merge?.record ?? 0 }; return { doc };
    case "mail.next":
    case "mail.prev": {
      const n = doc.merge?.recipients?.length ?? 1;
      const r = (doc.merge?.record ?? 0) + (c.id === "mail.next" ? 1 : -1);
      doc.merge = { ...(doc.merge ?? {}), record: Math.max(0, Math.min(n - 1, r)) };
      return { doc };
    }
    case "mail.finish": doc.merge = { ...(doc.merge ?? {}), finished: sv }; return { doc };
    case "mail.editRecipients":
    case "mail.highlightFields":
    case "mail.envelopes":
    case "mail.labels":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      return { doc };

    /* ---------------- Review ---------------- */
    case "review.trackChanges": doc.trackChanges = !doc.trackChanges; return { doc };
    case "review.markup": {
      const map: Record<string, WordDoc["markup"]> = { "Simple Markup": "simple", "All Markup": "all", "No Markup": "none", Original: "original" };
      doc.markup = map[sv] ?? "all";
      return { doc };
    }
    case "review.accept":
    case "review.reject": {
      const accept = c.id === "review.accept";
      const all = sv.includes("All");
      const targets = all ? doc.paragraphs : selectedParas(doc, ui);
      for (const p of targets) {
        if (!p.runs) continue;
        p.runs = p.runs
          .filter((r) => (accept ? !r.del : !r.ins))
          .map((r) => ({ ...r, ins: undefined, del: undefined }));
      }
      if (all && sv.includes("Stop Tracking")) doc.trackChanges = false;
      if (sv.includes("Move to Next")) {
        const next = doc.paragraphs.find((p) => p.runs?.some((r) => r.ins || r.del));
        if (next) return { doc, ui: { selection: next.id } };
      }
      return { doc };
    }
    case "review.nextChange":
    case "review.prevChange": {
      const ids = doc.paragraphs.filter((p) => p.runs?.some((r) => r.ins || r.del)).map((p) => p.id);
      if (!ids.length) return { doc };
      const cur = ids.indexOf(sel.paras[0]);
      const next = c.id === "review.nextChange" ? ids[(cur + 1) % ids.length] : ids[(cur - 1 + ids.length) % ids.length];
      return { doc, ui: { selection: next } };
    }
    case "review.deleteComment":
      if (sv === "Delete All Comments in Document") doc.paragraphs.forEach((p) => (p.comment = undefined));
      else for (const p of selectedParas(doc, ui)) p.comment = undefined;
      return { doc };
    case "review.resolveComment":
      for (const p of selectedParas(doc, ui)) if (p.comment) p.comment = { ...p.comment, resolved: !p.comment.resolved };
      return { doc };
    case "comment.reply": {
      const p = selectedParas(doc, ui)[0];
      if (p?.comment && sv.trim()) p.comment = { ...p.comment, replies: [...(p.comment.replies ?? []), { author: "BEOC Student", text: sv.trim() }] };
      return { doc };
    }
    case "review.nextComment":
    case "review.prevComment": {
      const ids = doc.paragraphs.filter((p) => p.comment).map((p) => p.id);
      if (!ids.length) return { doc };
      const cur = ids.indexOf(sel.paras[0]);
      const next = c.id === "review.nextComment" ? ids[(cur + 1) % ids.length] : ids[(cur - 1 + ids.length) % ids.length];
      return { doc, ui: { selection: next } };
    }
    case "review.wordCount": doc.pane = "Word Count"; return { doc };
    case "review.accessibility": doc.pane = "Accessibility"; return { doc };
    case "review.thesaurus": doc.pane = "Thesaurus"; return { doc };
    case "review.readAloud": doc.pane = doc.pane === "Read Aloud" ? null : "Read Aloud"; return { doc };
    case "review.translate": doc.pane = "Translator"; return { doc };
    case "review.smartLookup":
    case "references.smartLookup": doc.pane = "Search"; return { doc };
    case "references.researcher": doc.pane = "Researcher"; return { doc };
    case "review.restrict":
    case "review.compare":
    case "review.language":
    case "review.showComments":
    case "review.reviewingPane":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      if (c.id === "review.reviewingPane") doc.pane = "Revisions";
      return { doc };

    /* ---------------- View ---------------- */
    case "view.mode": {
      const map: Record<string, WordDoc["view"]> = { "Read Mode": "read", "Print Layout": "print", "Web Layout": "web", Outline: "outline", Draft: "draft" };
      doc.view = map[sv] ?? "print";
      return { doc };
    }
    case "view.ruler": doc.ruler = !doc.ruler; return { doc };
    case "view.gridlines": doc.gridlines = !doc.gridlines; return { doc };
    case "view.navPane": doc.navPane = !doc.navPane; if (doc.navPane) doc.pane = "Navigation"; else if (doc.pane === "Navigation") doc.pane = null; return { doc };
    case "view.zoom":
    case "view.zoomTo": doc.zoom = Number(sv.replace("%", "")) || 100; return { doc };
    case "view.onePage": doc.zoom = 60; return { doc };
    case "view.multiplePages": doc.zoom = 40; return { doc };
    case "view.pageWidth": doc.zoom = 120; return { doc };
    case "view.focus":
    case "view.immersive":
    case "view.newWindow":
    case "view.arrangeAll":
    case "view.split":
    case "view.sideBySide":
    case "view.macros":
    case "help.help":
    case "help.feedback":
    case "help.training":
      doc.flags = { ...(doc.flags ?? {}), [c.id]: sv || true };
      if (c.id === "help.help") doc.pane = "Help";
      return { doc };
  }
  return { doc };
}

function updateToc(doc: WordDoc, entire: boolean): WordDoc {
  const heads = headingsOf(doc);
  for (const p of doc.paragraphs) {
    if (p.kind !== "toc") continue;
    if (entire) xp(p).entries = heads;
  }
  doc.flags = { ...(doc.flags ?? {}), tocUpdated: entire ? "entire" : "pages" };
  return doc;
}

function applyType(doc: WordDoc, target: string, value: string): { doc: WordDoc; ui?: Partial<SimUi> } {
  if (target === "header") { doc.header = value; return { doc }; }
  if (target === "footer") { doc.footer = value; return { doc }; }
  if (target === "find") {
    doc.navPane = true;
    doc.pane = `Find:${value}`;
    return { doc };
  }
  const s = parseSel(doc, target);
  if (s.cell) {
    const p = doc.paragraphs.find((x) => x.id === s.cell!.para);
    if (p?.table && s.cell.r > 0 && s.cell.c > 0) {
      while (p.table.rows.length < s.cell.r) p.table.rows.push(p.table.rows[0].map(() => ""));
      p.table.rows[s.cell.r - 1][s.cell.c - 1] = value;
    }
    return { doc };
  }
  if (s.run) {
    const p = doc.paragraphs.find((x) => x.id === s.run!.para);
    const r = p?.runs?.find((x) => x.id === s.run!.run);
    if (p && r) {
      if (doc.trackChanges && r.text && r.text !== value) {
        const idx = p.runs!.indexOf(r);
        p.runs!.splice(idx, 1, { ...r, del: true, id: undefined }, { ...r, text: value, ins: true });
      } else {
        r.text = value;
        r.misspelled = false;
        if (!r.link && !r.field) {
          const addr = autoLinkAddress(value);
          if (addr && value.trim() === value.trim().replace(/[.,;:!?)]+$/, "")) r.link = addr;
        }
      }
    }
    return { doc };
  }
  const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
  if (p) {
    if (p.object && (p.kind === "textbox" || p.kind === "shape")) {
      p.object.text = value;
      return { doc };
    }
    if (p.kind === "chart" && p.chart) {
      p.chart.title = value;
      return { doc };
    }
    const keep: TextProps = {};
    const r0 = p.runs?.[0];
    if (r0) for (const k of ["bold", "italic", "underline", "font", "size", "color"] as CharKey[]) if (r0[k] !== undefined) (keep as Record<string, unknown>)[k] = r0[k];
    if (doc.trackChanges && paraText(p)) {
      p.runs = [...runsOf(p).map((r) => ({ ...r, del: true })), { ...keep, text: value, ins: true }];
    } else {
      p.runs = linkify(value, keep);
    }
    p.text = undefined;
  }
  return { doc };
}

/* ------------------------------------------------------------------ */
/* Ribbon state                                                        */
/* ------------------------------------------------------------------ */

export function wordRibbonState(doc: WordDoc, ui: SimUi): Record<string, SimValue | undefined> {
  const t = firstTarget(doc, ui);
  const p = selectedParas(doc, ui)[0];
  const align = p ? paraLook(doc, p).align : "left";
  return {
    "home.fontName": t?.font ?? themeOf(doc).bodyFont,
    "home.fontSize": t?.size ?? 11,
    "home.bold": Boolean(t?.bold),
    "home.italic": Boolean(t?.italic),
    "home.underline": Boolean(t?.underline),
    "home.strike": Boolean(t?.strike),
    "home.subscript": Boolean(t?.subscript),
    "home.superscript": Boolean(t?.superscript),
    "home.alignLeft": align === "left",
    "home.alignCenter": align === "center",
    "home.alignRight": align === "right",
    "home.justify": align === "justify",
    "home.bullets": p?.list === "bullet",
    "home.numbering": p?.list === "number",
    "home.style": t?.style ?? "Normal",
    "home.showMarks": Boolean(doc.showMarks),
    "home.formatPainter": Boolean(doc.painter),
    "review.trackChanges": Boolean(doc.trackChanges),
    "view.ruler": Boolean(doc.ruler),
    "view.gridlines": Boolean(doc.gridlines),
    "view.navPane": Boolean(doc.navPane),
    "view.print": (doc.view ?? "print") === "print",
    "view.web": doc.view === "web",
    "view.read": doc.view === "read",
    "view.outline": doc.view === "outline",
    "view.draft": doc.view === "draft",
    "design.styleSet": doc.styleSet ?? "Default",
    "review.markupLabel": ({ simple: "Simple Markup", all: "All Markup", none: "No Markup", original: "Original" } as const)[doc.markup ?? "all"],
    "table.headerRow": p?.table ? p.table.headerRow !== false : false,
    "table.bandedRows": Boolean(p?.table?.bandedRows),
    "table.repeatHeader": Boolean((p?.table as XTable | undefined)?.repeatHeader),
    "mail.preview": Boolean(doc.merge?.preview),
    "header.differentFirst": Boolean(doc.flags?.differentFirst),
    "header.differentOddEven": Boolean(doc.flags?.differentOddEven),
    "layout.indentLeft": p?.indentLeft ?? 0,
    "layout.indentRight": p ? xp(p).indentRight ?? 0 : 0,
    "layout.spaceBefore": p ? paraLook(doc, p).spaceBefore : 0,
    "layout.spaceAfter": p ? paraLook(doc, p).spaceAfter : 8,
  };
}

export function wordContextual(doc: WordDoc, ui: SimUi): string[] {
  const s = parseSel(doc, ui.selection);
  if (s.header) return ["header"];
  const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
  if (!p) return [];
  if (p.kind === "table") return ["table"];
  if (p.kind === "image") return ["picture"];
  if (p.kind === "shape" || p.kind === "textbox") return ["shape"];
  if (p.kind === "chart") return ["chart"];
  return [];
}

export function wordDialogDefaults(doc: WordDoc, ui: SimUi, id: string): Record<string, SimValue> {
  const t = firstTarget(doc, ui);
  const p = selectedParas(doc, ui)[0];
  const look = p ? paraLook(doc, p) : undefined;
  switch (id) {
    case "font":
      return {
        font: t?.font ?? "Calibri",
        style: t?.bold && t?.italic ? "Bold Italic" : t?.bold ? "Bold" : t?.italic ? "Italic" : "Regular",
        size: t?.size ?? 11,
        color: t?.color ?? "Automatic",
        underline: t?.underline ? "Single" : "(none)",
        strike: Boolean(t?.strike),
        superscript: Boolean(t?.superscript),
        subscript: Boolean(t?.subscript),
        allCaps: t?.caps === "upper",
      };
    case "paragraph":
      return {
        alignment: ({ left: "Left", center: "Centered", right: "Right", justify: "Justified" } as const)[look?.align ?? "left"],
        indentLeft: look?.indentLeft ?? 0,
        indentRight: p ? xp(p).indentRight ?? 0 : 0,
        special: p?.firstLine ? "First line" : p?.hanging ? "Hanging" : "(none)",
        by: p?.firstLine ?? p?.hanging ?? 0.5,
        spaceBefore: look?.spaceBefore ?? 0,
        spaceAfter: look?.spaceAfter ?? 8,
        lineSpacing: look?.lineSpacing === 1 ? "Single" : look?.lineSpacing === 1.5 ? "1.5 lines" : look?.lineSpacing === 2 ? "Double" : "Multiple",
        at: look?.lineSpacing ?? 1.08,
        widow: true,
        keepNext: Boolean(p && xp(p).keepNext),
        pageBreakBefore: Boolean(p && xp(p).pageBreakBefore),
        tabPos: 0,
        tabAlign: "Left",
        tabLeader: "1 None",
        clearTabs: false,
      };
    case "link": {
      const s = parseSel(doc, ui.selection);
      if (s.run) {
        const r = doc.paragraphs.find((x) => x.id === s.run!.para)?.runs?.find((x) => x.id === s.run!.run);
        return { text: r?.text ?? "", address: r?.link ?? "", linkTo: r?.link?.startsWith("mailto:") ? "E-mail Address" : "Existing File or Web Page" };
      }
      return { text: p ? paraText(p) : "", address: p?.runs?.find((r) => r.link)?.link ?? "" };
    }
    case "zoom":
      return { percent: doc.zoom ?? 100 };
    case "pageSetup":
    case "customMargins": {
      const m = marginsOf(doc.page?.margins);
      const secs = sectionBreaks(doc).length;
      const sp = sectionProps(doc, selectedSections(doc, ui)[0] ?? 0);
      return {
        top: m.t,
        bottom: m.b,
        left: m.l,
        right: m.r,
        gutter: m.g,
        orientation: sp.orientation === "landscape" ? "Landscape" : "Portrait",
        size: doc.page?.size ?? "Letter",
        vAlign: String(doc.flags?.vAlign ?? "Top"),
        applyTo: secs ? "This section" : "Whole document",
      };
    }
    case "columns": {
      const sp = sectionProps(doc, selectedSections(doc, ui)[0] ?? 0);
      return {
        preset: ({ 1: "One", 2: "Two", 3: "Three" } as Record<number, string>)[sp.columns] ?? "One",
        num: sp.columns,
        spacing: sp.spacing ?? 0.5,
        line: Boolean(sp.line),
        equal: true,
        applyTo: sectionBreaks(doc).length ? "This section" : "Whole document",
      };
    }
    case "modifyStyle": {
      const name = p?.style && PARA_STYLE_NAMES.includes(p.style) ? p.style : "Normal";
      const st = styleDef(doc, name);
      const lk = paraLook(doc, { id: "_", style: name });
      return {
        style: name,
        font: st.font && st.font !== "@heading" ? st.font : lk.font,
        size: st.size ?? 11,
        color: st.color && !st.color.startsWith("@") && !st.themed ? st.color : "Automatic",
        bold: Boolean(st.bold),
        italic: Boolean(st.italic),
        spaceAfter: st.spaceAfter ?? 8,
        align: ({ left: "Left", center: "Center", right: "Right", justify: "Justify" } as const)[st.align ?? "left"],
        scope: "Only in this document",
      };
    }
    case "createStyle":
      return { name: "Style1", basedOn: p?.style && PARA_STYLE_NAMES.includes(p.style) ? p.style : "Normal", font: look?.font ?? "Calibri", size: look?.size ?? 11, color: "Automatic", bold: Boolean(look?.bold), italic: Boolean(look?.italic) };
    case "defineBullet":
      return { symbol: p?.bulletChar ?? "•", color: p ? xp(p).bulletColor ?? "Automatic" : "Automatic" };
    case "setNumbering":
      return { mode: "Start new list", start: p ? xp(p).numberStart ?? 1 : 1 };
    case "altText": {
      const o = p?.object as XObject | undefined;
      const ch = chartOf(p);
      return { text: o?.text ?? ch?.alt ?? "", decorative: Boolean(o?.decorative ?? ch?.decorative) };
    }
  }
  return {};
}
