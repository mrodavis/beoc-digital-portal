import type { PptDeck, PptObject, PptSlide, SimCommit, SimValue, TextProps } from "@/types/sim";
import type { SimUi } from "../../types";
import { applyCommonCommit } from "@/lib/sim/common";
import { clone } from "@/lib/sim/ops";
import {
  BACKGROUND_STYLES,
  COLOR_SETS,
  FONT_SETS,
  GRAPHIC_STYLES,
  ICONS,
  MEDIA_SECONDS,
  PICTURE_FORMATS,
  THESAURUS,
  bodyX,
  bulletStyleName,
  flagJson,
  isContentPart,
  isMasterKey,
  keepsAspect,
  layoutBoxes,
  masterX,
  mediaLength,
  numberFormatName,
  ox,
  readMaster,
  splitMasterKey,
  sx,
  type AnimMeta,
  type AnimStart,
  type ClipSource,
  type CommentX,
  type CustomShow,
  type DataLink,
  type LinkSource,
  type MediaOpts,
  type PptObjX,
  type TableOpts,
} from "./ext";

/* ------------------------------------------------------------------ */
/* Themes and layouts                                                  */
/* ------------------------------------------------------------------ */

export interface PptTheme {
  bg: string;
  title: string;
  body: string;
  font: string;
  titleFont: string;
  accent: string;
  /** Decorative band drawn on every slide. */
  band?: { side: "left" | "right" | "top" | "bottom"; color: string; size: number };
  dark?: boolean;
}

export const PPT_THEMES: Record<string, PptTheme> = {
  "Office Theme": { bg: "#ffffff", title: "#000000", body: "#000000", font: "Aptos", titleFont: "Aptos Display", accent: "#4472C4" },
  Facet: { bg: "#ffffff", title: "#2E7D32", body: "#333333", font: "Trebuchet MS", titleFont: "Trebuchet MS", accent: "#90C226", band: { side: "left", color: "#90C226", size: 3 } },
  Ion: { bg: "#1B5866", title: "#ffffff", body: "#E6F2F2", font: "Century Gothic", titleFont: "Century Gothic", accent: "#B4DE86", dark: true, band: { side: "right", color: "#0F3A44", size: 6 } },
  Retrospect: { bg: "#ffffff", title: "#3D3D3D", body: "#3D3D3D", font: "Calibri", titleFont: "Calibri Light", accent: "#E48312", band: { side: "bottom", color: "#E48312", size: 6 } },
  Slice: { bg: "#ffffff", title: "#052F61", body: "#333333", font: "Century Gothic", titleFont: "Century Gothic", accent: "#052F61", band: { side: "top", color: "#A5C249", size: 4 } },
  Wisp: { bg: "#F5EFE0", title: "#7B2410", body: "#444444", font: "Century Gothic", titleFont: "Century Gothic", accent: "#A53010", band: { side: "left", color: "#D9C9A3", size: 8 } },
  Integral: { bg: "#ffffff", title: "#1CADE4", body: "#333333", font: "Tw Cen MT", titleFont: "Tw Cen MT", accent: "#1CADE4", band: { side: "left", color: "#1CADE4", size: 2 } },
  Organic: { bg: "#FBF8F2", title: "#5F6F1E", body: "#3C3C3C", font: "Garamond", titleFont: "Garamond", accent: "#83992A" },
  Berlin: { bg: "#2A2A2A", title: "#ffffff", body: "#f2f2f2", font: "Trebuchet MS", titleFont: "Trebuchet MS", accent: "#F09415", dark: true, band: { side: "top", color: "#F09415", size: 3 } },
  Madison: { bg: "#ffffff", title: "#262626", body: "#404040", font: "Calibri", titleFont: "Calibri Light", accent: "#C0504D", band: { side: "bottom", color: "#C0504D", size: 10 } },
  Gallery: { bg: "#ffffff", title: "#9B2D1F", body: "#333333", font: "Gill Sans MT", titleFont: "Gill Sans MT", accent: "#B71E42" },
};
export const PPT_THEME_NAMES = Object.keys(PPT_THEMES);

const VARIANT_ACCENTS = ["", "#4472C4", "#70AD47", "#ED7D31", "#7030A0"];

export function themeOf(deck: PptDeck): PptTheme {
  let t = PPT_THEMES[deck.theme ?? "Office Theme"] ?? PPT_THEMES["Office Theme"];
  const v = deck.variant ?? 1;
  if (v > 1) {
    const accent = VARIANT_ACCENTS[v] ?? t.accent;
    t = { ...t, accent, band: t.band ? { ...t.band, color: accent } : { side: "bottom", color: accent, size: 4 } };
  }
  const colors = deck.flags?.themeColors;
  if (colors) {
    const custom = deck.flags?.customAccent;
    const accent = (typeof custom === "string" && colors === deck.flags?.customColorsName ? custom : undefined) ?? COLOR_SETS.find((c) => c.name === colors)?.accent;
    if (accent) t = { ...t, accent, band: t.band ? { ...t.band, color: accent } : undefined };
  }
  const bgs = BACKGROUND_STYLES.find((b) => b.name === deck.flags?.backgroundStyle);
  if (bgs) t = { ...t, bg: bgs.color, dark: Boolean(bgs.dark), title: bgs.dark ? "#FFFFFF" : t.dark ? "#262626" : t.title, body: bgs.dark ? "#F2F2F2" : t.dark ? "#404040" : t.body };
  return t;
}

export const LAYOUTS = ["Title Slide", "Title and Content", "Section Header", "Two Content", "Comparison", "Title Only", "Blank", "Content with Caption", "Picture with Caption"];

export const TRANSITIONS = ["None", "Morph", "Fade", "Push", "Wipe", "Split", "Reveal", "Cut", "Random Bars", "Shape", "Uncover", "Cover", "Flash", "Fall Over", "Curtains", "Wind", "Prestige", "Fracture", "Page Curl", "Airplane", "Origami", "Dissolve", "Checkerboard", "Blinds", "Clock", "Ripple", "Honeycomb", "Glitter", "Vortex", "Shred", "Switch", "Flip", "Gallery", "Cube", "Doors", "Box", "Comb", "Zoom", "Random"];
export const ANIMATIONS = ["None", "Appear", "Fade", "Fly In", "Float In", "Split", "Wipe", "Shape", "Wheel", "Random Bars", "Grow & Turn", "Zoom", "Swivel", "Bounce"];
export const EMPHASIS = ["Pulse", "Color Pulse", "Teeter", "Spin", "Grow/Shrink", "Desaturate", "Darken", "Lighten", "Transparency"];
export const EXITS = ["Disappear", "Fade Out", "Fly Out", "Float Out", "Split Out", "Wipe Out", "Zoom Out"];

/** Display name of a layout, after Slide Master › Rename. */
export function layoutName(deck: PptDeck, layout: string): string {
  return readMaster(deck).layoutNames?.[layout] ?? layout;
}

/* ------------------------------------------------------------------ */
/* Selection                                                           */
/* ------------------------------------------------------------------ */

export type PartKey = "title" | "subtitle" | "body" | "body2" | "notes" | "picture";
const PARTS: PartKey[] = ["title", "subtitle", "body", "body2", "notes", "picture"];

/**
 * What the selection key points at.
 *
 *  "s2"                 the slide thumbnail
 *  "s2.title"           a placeholder (title, subtitle, body, body2, notes, picture)
 *  "s2.body.3"          the third paragraph of a placeholder
 *  "s2.o1"              an object; "s2.o1,s2.o2" several ("s2.o1.o2" is the same thing)
 *  "s2.o1.r2c3"         a table cell; "s2.o1.r1c1,s2.o1.r1c2" a cell range
 *  "s2.title.anim"      an animation picked in the Animation Pane (also "s2.body.anim",
 *                       "s1.subtitle.anim", "s2.o3.anim"): the effect, not the text
 *  "master"             Slide Master view: the slide master thumbnail
 *  "master.title"       the master's title or body placeholder
 *  "master.o1"          an object on the slide master
 *  "layout:Title Only"  a layout thumbnail; "layout:Title Only.o1" an object on it,
 *                       "layout:Title Only.title" its title placeholder
 */
export interface PptSel {
  slide?: PptSlide;
  part?: PartKey;
  line?: number;
  objs: PptObject[];
  cells?: string[];
  master?: "title" | "body" | "slide";
  layout?: string;
  /** The placeholder of a layout ("layout:Title Only.title"). */
  layoutPart?: string;
  thumb: boolean;
  /** An Animation Pane item is selected: "title", "body" or an object id. */
  anim?: string;
}

export function activeSlide(deck: PptDeck, ui: SimUi): PptSlide | undefined {
  return deck.slides.find((s) => s.id === ui.slide) ?? deck.slides.find((s) => s.id === deck.active) ?? deck.slides[0];
}

export function parseSel(deck: PptDeck, ui: SimUi): PptSel {
  let sel = (ui.selection ?? "").trim();
  // Slide Master view: the master or layout thumbnail in view wins over a selection left from elsewhere.
  const shown = ui.slide ?? "";
  if (deck.view === "master" && (shown === "master" || shown.startsWith("layout:"))) {
    const inShown = sel === shown || sel.startsWith(`${shown}.`) || (shown === "master" && sel.startsWith("master."));
    if (!inShown) sel = shown;
  }
  if (sel === "master") return { master: "slide", objs: [], thumb: false };
  if (sel.startsWith("master.") || sel.startsWith("layout:")) {
    const parts = sel.split(",").map((s) => s.trim()).filter(Boolean);
    const first = parts[0];
    const m = readMaster(deck);
    if (first.startsWith("layout:")) {
      const [name, oid] = first.slice(7).split(".");
      const list = m.layoutObjects?.[name] ?? [];
      const objs = oid ? (parts.map((p) => p.split(".")[1]).map((id) => list.find((o) => o.id === id)).filter(Boolean) as PptObject[]) : [];
      return { layout: name, objs, thumb: false, layoutPart: oid && !objs.length && (PARTS as string[]).includes(oid) ? oid : undefined };
    }
    const rest = first.slice(7);
    if (rest === "title" || rest === "body") return { master: rest, objs: [], thumb: false };
    const objs = parts.map((p) => p.split(".")[1]).map((id) => m.objects?.find((o) => o.id === id)).filter(Boolean) as PptObject[];
    return { master: "slide", objs, thumb: false };
  }
  const parts = sel.split(",").map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return { slide: activeSlide(deck, ui), objs: [], thumb: false };
  let segs = parts[0].split(".");
  // "s2.title.anim": the Animation Pane item for the title, not the title text.
  const anim = parts.length === 1 && segs.length >= 3 && segs[segs.length - 1] === "anim";
  if (anim) segs = segs.slice(0, -1);
  const [sid, part, sub] = segs;
  // A selection on a slide other than the one in view is left over from before: the slide in view wins.
  const inView = ui.slide ? deck.slides.find((s) => s.id === ui.slide) : undefined;
  if (inView && inView.id !== sid && deck.slides.some((s) => s.id === sid)) return { slide: inView, objs: [], thumb: !part };
  if (!part) return { slide: inView ?? deck.slides.find((s) => s.id === sid) ?? activeSlide(deck, ui), objs: [], thumb: true };
  const slide = deck.slides.find((s) => s.id === sid) ?? activeSlide(deck, ui);
  if ((PARTS as string[]).includes(part)) return { slide, part: part as PartKey, line: sub && /^\d+$/.test(sub) ? Number(sub) : undefined, objs: [], thumb: false, anim: anim ? (part === "title" ? "title" : "body") : undefined };
  // "s4.o1.o2.o3" is shorthand for "s4.o1,s4.o2,s4.o3".
  const ids = parts.length === 1 && segs.length > 2 && segs.slice(1).every((x) => /^o\d+$/.test(x)) ? segs.slice(1) : Array.from(new Set(parts.map((p) => p.split(".")[1])));
  const objs = ids.map((oid) => slide?.objects?.find((o) => o.id === oid)).filter(Boolean) as PptObject[];
  const cells = parts.map((p) => p.split(".")[2]).filter((c): c is string => Boolean(c && /^r\d+c\d+$/.test(c)));
  return { slide, objs, cells: cells.length ? cells : undefined, thumb: false, anim: anim ? part : undefined };
}

/** Does a selection key point at something in the deck? (Used by the validator.) */
export function pptSelectionExists(deck: PptDeck, sel: string): boolean {
  if (!sel) return true;
  const m = readMaster(deck);
  return sel.split(",").every((raw) => {
    const p = raw.trim();
    if (isMasterKey(p)) {
      const [scope, part] = splitMasterKey(p);
      if (!part) return true;
      if ((PARTS as string[]).includes(part)) return true;
      const list = scope === "master" ? m.objects ?? [] : m.layoutObjects?.[scope.slice(7)] ?? [];
      return list.some((o) => o.id === part);
    }
    const segs = p.split(".").filter((x, i, a) => !(x === "anim" && i === a.length - 1 && a.length >= 3));
    const [sid, ...rest] = segs;
    const s = deck.slides.find((x) => x.id === sid);
    if (!s) return false;
    if (!rest.length || (PARTS as string[]).includes(rest[0])) return true;
    const objs = rest.filter((r) => !/^(r\d+c\d+|\d+|[A-Z]{1,2}\d+|title|legend|data|axis|text)$/.test(r));
    return objs.every((id) => s.objects?.some((o) => o.id === id));
  });
}

/** The list of objects the selection lives in: a slide, the slide master, or a layout. */
interface Scope {
  list: PptObject[];
  set: (l: PptObject[]) => void;
  prefix: string;
}
function scopeOf(deck: PptDeck, sel: PptSel, slide?: PptSlide): Scope | undefined {
  if (deck.view === "master" && sel.layout) {
    const m = masterX(deck);
    const lo = (m.layoutObjects = m.layoutObjects ?? {});
    const name = sel.layout;
    return { list: lo[name] ?? [], set: (l) => (lo[name] = l), prefix: `layout:${name}` };
  }
  if (deck.view === "master") {
    const m = masterX(deck);
    return { list: m.objects ?? [], set: (l) => (m.objects = l), prefix: "master" };
  }
  const s = slide ?? sel.slide;
  if (!s) return undefined;
  return { list: s.objects ?? [], set: (l) => (s.objects = l), prefix: s.id };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

let seq = 0;
function nextSlideId(deck: PptDeck): string {
  let n = deck.slides.length + 1;
  while (deck.slides.some((s) => s.id === `s${n}`)) n++;
  return `s${n}`;
}
function nextObjId(list: PptObject[] | undefined): string {
  let n = (list?.length ?? 0) + 1;
  while (list?.some((o) => o.id === `o${n}`)) n++;
  seq++;
  return `o${n}`;
}

type Target = TextProps & { align?: string };

/** The text-props bag the current selection formats. */
function targets(deck: PptDeck, ui: SimUi): Target[] {
  const s = parseSel(deck, ui);
  if (s.master === "title" || s.master === "body") return [];
  if (s.objs.length) return s.objs.map((o) => (o.props = o.props ?? {}));
  if (!s.slide) return [];
  if (s.part === "title") return [(s.slide.titleProps = s.slide.titleProps ?? {})];
  if (s.part === "subtitle") return [(s.slide.subtitleProps = s.slide.subtitleProps ?? {})];
  if (s.part === "body" || s.part === "body2") return [(s.slide.bodyProps = s.slide.bodyProps ?? {})];
  return [];
}

/** Set a text property on the selection; `undefined` clears it (Font Color › Automatic). */
function setProp(deck: PptDeck, ui: SimUi, key: keyof TextProps | "align", value: unknown) {
  const s = parseSel(deck, ui);
  if (s.master === "title" || s.master === "body") {
    const m = masterX(deck);
    if (key === "font" && value !== undefined) s.master === "title" ? (m.titleFont = String(value)) : (m.bodyFont = String(value));
    if (key === "color") {
      const prop = s.master === "title" ? "titleColor" : "bodyColor";
      if (value === undefined || value === null || value === "") delete m[prop];
      else m[prop] = String(value);
    }
    return;
  }
  for (const t of targets(deck, ui)) {
    if (value === undefined) delete (t as Record<string, unknown>)[key];
    else (t as Record<string, unknown>)[key] = value;
  }
}

function firstProps(deck: PptDeck, ui: SimUi): Target {
  const s = parseSel(deck, ui);
  if (s.objs.length) return s.objs[0]?.props ?? {};
  if (!s.slide) return {};
  if (s.part === "title") return s.slide.titleProps ?? {};
  if (s.part === "subtitle") return s.slide.subtitleProps ?? {};
  if (s.part === "body" || s.part === "body2") return s.slide.bodyProps ?? {};
  return {};
}

const SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 54, 60, 66, 72, 80, 96];

function defaultSize(part: string | undefined, layout: string) {
  if (part === "title") return layout === "Title Slide" || layout === "Section Header" ? 44 : 36;
  if (part === "subtitle") return 20;
  return 24;
}

/** "00:03.00", "03.00", "3", "1:30" → seconds. */
export function parseTime(v: unknown): number {
  const s = String(v ?? "").trim();
  if (!s) return 0;
  if (s.includes(":")) {
    const [m, rest] = s.split(":");
    return (Number(m) || 0) * 60 + (Number(rest) || 0);
  }
  return Number(s.replace(/[^0-9.]/g, "")) || 0;
}

function sampleChart(type: string): PptObject {
  const o: PptObjX = {
    id: "",
    kind: "chart",
    label: type,
    style: type,
    x: 12,
    y: 25,
    w: 76,
    h: 66,
    series: [{ label: "Category 1", value: 4.3 }, { label: "Category 2", value: 2.5 }, { label: "Category 3", value: 3.5 }, { label: "Category 4", value: 4.5 }],
    chart: { title: "Chart Title", showTitle: true, legend: "Bottom", seriesName: "Series 1", gridlines: true },
  };
  return o;
}

function shapeKind(name: string): PptObject["shape"] {
  if (/Oval|Circle/.test(name)) return "oval";
  if (/Arrow/.test(name)) return "arrow";
  if (/Star/.test(name)) return "star";
  if (/Callout|Speech/.test(name)) return "callout";
  if (/Rounded/.test(name)) return "rounded";
  return "rect";
}

function lines(slide: PptSlide, part: "body" | "body2"): string[] {
  return (part === "body" ? slide.body : slide.body2) ?? [];
}
function setLines(slide: PptSlide, part: "body" | "body2", l: string[]) {
  if (part === "body") slide.body = l;
  else slide.body2 = l;
}
function partEmpty(slide: PptSlide, part: string): boolean {
  if (part === "picture") return true;
  if (part === "body" || part === "body2") return !lines(slide, part).some((t) => t.trim());
  return false;
}
function partTaken(slide: PptSlide, part: string): boolean {
  return (slide.objects ?? []).some((o) => ox(o).placeholder === part);
}

/** Inches → percent of the slide (13.333 × 7.5 in widescreen, 10 × 7.5 in standard). */
function inchesToPct(deck: PptDeck, inches: number, axis: "w" | "h"): number {
  if (axis === "h") return (inches / 7.5) * 100;
  return (inches / (deck.size === "4:3" ? 10 : 13.333)) * 100;
}

/** A Picture with Caption slide whose picture placeholder already holds a picture. */
function pictureTaken(slide: PptSlide): boolean {
  return partTaken(slide, "picture") || (slide.objects ?? []).some((o) => o.kind === "image" && !ox(o).placeholder && slide.layout === "Picture with Caption" && o.x < 20);
}

/**
 * The empty content placeholder an inserted object goes into when nothing on the slide is
 * selected, the way PowerPoint fills the first empty "Click to add text" box.
 */
function emptyContentPart(slide: PptSlide, kind: PptObject["kind"]): string | undefined {
  if (kind === "image" && slide.layout === "Picture with Caption" && !pictureTaken(slide)) return "picture";
  return (["body", "body2"] as const).find((p) => isContentPart(slide.layout, p) && partEmpty(slide, p) && !partTaken(slide, p));
}

/**
 * Add an object to the current slide (or master / layout), filling an empty content placeholder
 * when one is selected, or (with `autoFill`) when nothing on the slide is selected.
 */
function addObject(deck: PptDeck, sel: PptSel, slide: PptSlide | undefined, o: PptObject, extra?: Partial<PptDeck>, opts?: { autoFill?: boolean }): { doc: PptDeck; ui?: Partial<SimUi> } {
  const sc = scopeOf(deck, sel, slide);
  if (!sc) return { doc: deck };
  o.id = nextObjId(sc.list);
  let part: string | undefined = sel.part;
  if (!part && opts?.autoFill && deck.view !== "master" && slide && !sel.objs.length && !sel.anim) part = emptyContentPart(slide, o.kind);
  const fits = (p: string) => (p === "picture" ? o.kind === "image" && !pictureTaken(slide!) : partEmpty(slide!, p) && !partTaken(slide!, p));
  if (deck.view !== "master" && slide && part && ["body", "body2", "picture"].includes(part) && isContentPart(slide.layout, part) && fits(part)) {
    const b = layoutBoxes(slide.layout)[part as "body"];
    if (b) {
      if (o.kind === "video") {
        // Keep the video 16:9 inside the placeholder (on a 16:9 slide that is equal percents).
        const side = Math.min(b.w, b.h);
        Object.assign(o, { x: b.x + (b.w - side) / 2, y: b.y + (b.h - side) / 2, w: side, h: side });
      } else if (o.kind === "icon") {
        // Icons are square: the largest square that fits, centered.
        const inches = Math.min((b.w / 100) * slideWidthIn(deck), (b.h / 100) * 7.5) * 0.8;
        const w = (inches / slideWidthIn(deck)) * 100, h = (inches / 7.5) * 100;
        Object.assign(o, { x: b.x + (b.w - w) / 2, y: b.y + (b.h - h) / 2, w, h });
      } else Object.assign(o, { x: b.x, y: b.y, w: b.w, h: b.h });
      ox(o).placeholder = part;
    }
  }
  sc.set([...sc.list, o]);
  Object.assign(deck, extra ?? {});
  return { doc: deck, ui: { selection: `${sc.prefix}.${o.id}` } };
}

const slideWidthIn = (deck: PptDeck) => (deck.size === "4:3" ? 10 : 13.333);

/* ---------- animations ---------- */

export interface AnimItem {
  key: string;
  /** "title", "body" or an object id. */
  target: string;
  label: string;
  name: string;
  order: number;
  start: AnimStart;
  meta: AnimMeta;
  /** Click number that reveals it (0 = plays automatically when the slide appears). */
  group: number;
}

/** Every animation on a slide, in play order, with its click group. */
export function animSequence(slide: PptSlide): AnimItem[] {
  const s = sx(slide);
  const items: Omit<AnimItem, "group">[] = [];
  if (slide.titleAnimation) items.push({ key: `${slide.id}.title`, target: "title", label: `Title: ${slide.title ?? ""}`, name: slide.titleAnimation, order: s.titleOrder ?? 1, start: s.titleAnim?.start ?? "On Click", meta: s.titleAnim ?? {} });
  if (slide.bodyAnimation) items.push({ key: `${slide.id}.${slide.layout === "Title Slide" ? "subtitle" : "body"}`, target: "body", label: slide.layout === "Title Slide" ? `Subtitle: ${slide.subtitle ?? ""}` : `Content Placeholder: ${(slide.body ?? [])[0] ?? ""}`, name: slide.bodyAnimation, order: s.bodyOrder ?? 2, start: s.bodyAnim?.start ?? "On Click", meta: s.bodyAnim ?? {} });
  for (const o of slide.objects ?? []) {
    if (!o.animation) continue;
    items.push({ key: `${slide.id}.${o.id}`, target: o.id, label: o.label ?? o.text ?? o.id, name: o.animation, order: o.animationOrder ?? 1, start: ox(o).anim?.start ?? "On Click", meta: ox(o).anim ?? {} });
  }
  items.sort((a, b) => a.order - b.order);
  let g = 0;
  return items.map((it) => {
    if (it.start === "On Click") g++;
    return { ...it, group: g };
  });
}

function setOrder(slide: PptSlide, target: string, order: number) {
  const s = sx(slide);
  if (target === "title") s.titleOrder = order;
  else if (target === "body") s.bodyOrder = order;
  else {
    const o = slide.objects?.find((x) => x.id === target);
    if (o) o.animationOrder = order;
  }
}
function renumber(slide: PptSlide, list: AnimItem[]) {
  list.forEach((it, i) => setOrder(slide, it.target, i + 1));
}
function maxOrder(slide: PptSlide): number {
  return Math.max(0, ...animSequence(slide).map((a) => a.order));
}

/** The animation targets the selection points at. */
function animTargets(sel: PptSel): ("title" | "body" | PptObject)[] {
  if (sel.objs.length) return sel.objs;
  if (sel.part === "title") return ["title"];
  if (sel.part === "body" || sel.part === "body2" || sel.part === "subtitle") return ["body"];
  return [];
}
function getMeta(slide: PptSlide, t: "title" | "body" | PptObject): { name?: string | null; meta: AnimMeta } {
  const s = sx(slide);
  if (t === "title") return { name: slide.titleAnimation, meta: (s.titleAnim = s.titleAnim ?? {}) };
  if (t === "body") return { name: slide.bodyAnimation, meta: (s.bodyAnim = s.bodyAnim ?? {}) };
  return { name: t.animation, meta: (ox(t).anim = ox(t).anim ?? {}) };
}

/** Remove an animation effect (Animation Pane › Remove, or Delete with the effect selected). */
function removeAnim(slide: PptSlide, t: "title" | "body" | PptObject) {
  const s = sx(slide);
  if (t === "title") { slide.titleAnimation = null; s.titleAnim = undefined; s.titleOrder = undefined; }
  else if (t === "body") { slide.bodyAnimation = null; s.bodyAnim = undefined; s.bodyOrder = undefined; }
  else { t.animation = null; t.animationOrder = undefined; ox(t).anim = undefined; }
  renumber(slide, animSequence(slide));
}

/** The Animation Pane selection key for an effect ("s2.title.anim"). */
export const animKey = (it: AnimItem) => `${it.key}.anim`;

/* ---------- slide show ---------- */

/** Custom shows defined in Slide Show › Custom Slide Show › Custom Shows. */
export function customShows(deck: PptDeck): CustomShow[] {
  return flagJson<CustomShow[]>(deck, "customShows", []).filter((c) => c && typeof c.name === "string" && Array.isArray(c.slides));
}

/** The slides a running custom show plays, in its order (hidden slides are skipped). */
function customSequence(deck: PptDeck, name: string): string[] | undefined {
  const cs = customShows(deck).find((c) => c.name === name);
  if (!cs) return undefined;
  return cs.slides.filter((id) => deck.slides.some((s) => s.id === id && !s.hidden));
}

/** The order the current slide show plays slides in (custom show, slide range or every visible slide). */
export function showSequence(deck: PptDeck): string[] {
  const custom = typeof deck.flags?.showCustom === "string" && deck.flags.showCustom ? customSequence(deck, deck.flags.showCustom) : undefined;
  if (custom) return custom;
  const range = deck.flags?.showRange;
  let list = deck.slides;
  if (typeof range === "string" && /^\d+-\d+$/.test(range)) {
    const [a, b] = range.split("-").map(Number);
    list = deck.slides.slice(a - 1, b);
  }
  return list.filter((s) => !s.hidden).map((s) => s.id);
}

/** The slide currently on screen in Slide Show view. */
export function showSlideId(deck: PptDeck): string | undefined {
  const id = deck.flags?.showId;
  if (typeof id === "string" && deck.slides.some((s) => s.id === id)) return id;
  const visible = deck.slides.filter((s) => !s.hidden);
  return visible[Math.min(Number(deck.flags?.showIndex ?? 0), visible.length - 1)]?.id;
}

function startShow(deck: PptDeck, fromId: string | undefined, from: string, extra: Record<string, SimValue> = {}) {
  const visible = deck.slides.filter((s) => !s.hidden);
  const id = fromId ?? visible[0]?.id ?? deck.slides[0]?.id;
  deck.view = "show";
  deck.flags = {
    ...(deck.flags ?? {}),
    showId: id ?? "",
    showIndex: Math.max(0, visible.findIndex((s) => s.id === id)),
    showFrom: from,
    showEnd: false,
    showSeeAll: false,
    showScreen: "",
    showPointer: "Arrow",
    presenter: Boolean(deck.flags?.["slideshow.presenterView"]),
    rehearsing: false,
    timingsPrompt: false,
    showCustom: "",
    ...extra,
  };
}

/** Start a custom show by name; false when there is no such show (or it has no visible slides). */
function startCustomShow(deck: PptDeck, name: string): boolean {
  const seq = customSequence(deck, name);
  if (!seq?.length) return false;
  startShow(deck, seq[0], "custom", { showCustom: name });
  return true;
}

function firstShowSlide(deck: PptDeck): string | undefined {
  const visible = deck.slides.filter((s) => !s.hidden);
  const range = deck.flags?.showRange;
  if (typeof range === "string" && /^\d+-\d+$/.test(range)) {
    const [a] = range.split("-").map(Number);
    return deck.slides.slice(a - 1).find((s) => !s.hidden)?.id ?? visible[0]?.id;
  }
  return visible[0]?.id;
}

function stepShow(deck: PptDeck, dir: 1 | -1): void {
  const f = (deck.flags = { ...(deck.flags ?? {}) });
  if (f.showSeeAll) f.showSeeAll = false;
  if (f.showScreen) { f.showScreen = ""; return; }
  const cur = showSlideId(deck);
  const i = deck.slides.findIndex((s) => s.id === cur);
  // A custom show plays its own list of slides, in its own order.
  const custom = typeof f.showCustom === "string" && f.showCustom ? customSequence(deck, f.showCustom) : undefined;
  if (custom) {
    const k = custom.indexOf(cur ?? "");
    if (dir > 0) {
      if (f.showEnd) { endShow(deck); return; }
      if (k >= 0 && k < custom.length - 1) { f.showId = custom[k + 1]; return; }
      if (f.loop || String(f.showType ?? "").includes("kiosk")) { f.showId = custom[0]; return; }
      f.showEnd = true;
      return;
    }
    if (f.showEnd) { f.showEnd = false; return; }
    if (k > 0) f.showId = custom[k - 1];
    return;
  }
  if (dir > 0) {
    if (f.showEnd) { endShow(deck); return; }
    let lastIdx = deck.slides.length - 1;
    const range = f.showRange;
    if (typeof range === "string" && /^\d+-\d+$/.test(range)) lastIdx = Math.min(lastIdx, Number(range.split("-")[1]) - 1);
    const next = deck.slides.findIndex((s, k) => k > i && k <= lastIdx && !s.hidden);
    if (next >= 0) { f.showId = deck.slides[next].id; return; }
    if (f.loop || String(f.showType ?? "").includes("kiosk")) { f.showId = firstShowSlide(deck) ?? cur ?? ""; return; }
    f.showEnd = true;
    return;
  }
  if (f.showEnd) { f.showEnd = false; return; }
  for (let k = i - 1; k >= 0; k--) if (!deck.slides[k].hidden) { f.showId = deck.slides[k].id; return; }
}

function endShow(deck: PptDeck) {
  const f = (deck.flags = { ...(deck.flags ?? {}) });
  if (f.rehearsing && !f.timingsPrompt) {
    f.timingsPrompt = true;
    f.showEnd = true;
    return;
  }
  deck.view = "normal";
  f.showEnd = false;
  f.showSeeAll = false;
  f.showScreen = "";
  f.presenter = false;
  f.rehearsing = false;
  f.timingsPrompt = false;
  f.showCustom = "";
}

/* ---------- sections ---------- */

function sectionRange(deck: PptDeck, index: number): [number, number] {
  const name = deck.slides[index]?.section;
  let a = index, b = index;
  while (a > 0 && deck.slides[a - 1].section === name) a--;
  while (b < deck.slides.length - 1 && deck.slides[b + 1].section === name) b++;
  return [a, b];
}

/* ---------- clipboard ---------- */

/**
 * What Copy or Cut put on the clipboard (flags.clip, JSON). `source` says where it came from
 * (Excel for a chart copied from a workbook), which Paste Special and Paste Link use. The
 * Office Clipboard keeps the last 24 items in flags.clipHistory (JSON, newest first).
 */
export type Clip =
  | { kind: "slide"; slides: PptSlide[]; source?: ClipSource; label?: string }
  | { kind: "obj"; objs: PptObject[]; source?: ClipSource; label?: string }
  | { kind: "text"; lines: string[]; source?: ClipSource; label?: string };

export function readClip(deck: PptDeck): Clip | null {
  const c = flagJson<Clip | null>(deck, "clip", null);
  if (c) return c;
  const legacy = deck.flags?.clipObj;
  if (typeof legacy === "string") {
    try {
      return { kind: "obj", objs: [JSON.parse(legacy) as PptObject] };
    } catch {
      return null;
    }
  }
  return null;
}

/** The Office Clipboard, newest item first. */
export function clipHistory(deck: PptDeck): Clip[] {
  const h = flagJson<Clip[]>(deck, "clipHistory", []);
  if (Array.isArray(h) && h.length) return h;
  const c = readClip(deck);
  return c ? [c] : [];
}

/** The text an Office Clipboard item shows (and the value clipboard.paste takes). */
export function clipLabel(c: Clip): string {
  if (c.label) return c.label;
  const cut = (t: string) => (t.length > 60 ? `${t.slice(0, 57).trimEnd()}...` : t);
  if (c.kind === "text") return cut(c.lines.map((l) => l.replace(/^\t+/, "")).join(" ").trim() || "(blank)");
  if (c.kind === "slide") return cut(`Slide: ${c.slides[0]?.title ?? "Untitled"}`);
  if (c.objs.length > 1) return `${c.objs.length} objects`;
  const o = c.objs[0] as PptObjX | undefined;
  if (!o) return "(empty)";
  if (o.kind === "chart") return cut(`Chart: ${o.chart?.title ?? o.label ?? "Chart"}`);
  if (o.kind === "table") return cut(`Table: ${(o.rows?.[0] ?? []).join(", ")}`);
  if (o.kind === "smartart") return cut(`SmartArt: ${(o.items ?? []).join(", ")}`);
  if (o.text) return cut(o.text.replace(/\n/g, " "));
  return o.label ?? "Picture";
}

/** The app an Office Clipboard item came from (its icon). */
export const clipApp = (c: Clip) => c.source?.app ?? "PowerPoint";

function writeClip(deck: PptDeck, clip: Clip, cut: boolean) {
  const history = clipHistory(deck);
  const json = JSON.stringify(clip);
  const next = [clip, ...history.filter((h, i) => !(i === 0 && JSON.stringify(h) === json))].slice(0, 24);
  deck.flags = { ...(deck.flags ?? {}), clip: json, clipCut: cut, clipHistory: JSON.stringify(next) };
  if (clip.kind === "slide") deck.flags.clipSlide = clip.slides[0]?.id ?? "";
  if (clip.kind === "obj") deck.flags.clipObj = JSON.stringify(clip.objs[0]);
}

/** The workbooks' current data, keyed by file name (what Update Now reads). */
export function linkSources(deck: PptDeck): Record<string, LinkSource> {
  return flagJson<Record<string, LinkSource>>(deck, "linkSources", {});
}

/** Every linked object in the deck, for the Links dialog. */
export function deckLinks(deck: PptDeck): { key: string; o: PptObject; link: DataLink }[] {
  const out: { key: string; o: PptObject; link: DataLink }[] = [];
  for (const s of deck.slides) for (const o of s.objects ?? []) { const l = ox(o).dataLink; if (l) out.push({ key: `${s.id}.${o.id}`, o, link: l }); }
  return out;
}

/** The text of a clipboard item, for pasting into a text placeholder or the Notes pane. */
function clipText(clip: Clip): string[] {
  if (clip.kind === "text") return clip.lines;
  if (clip.kind === "slide") return clip.slides.map((s) => s.title ?? "").filter(Boolean);
  return clip.objs.flatMap((o) => (o.text ? o.text.split("\n") : o.items ? o.items : o.rows ? o.rows.map((r) => r.join("\t")) : []));
}

/** A plain picture made from pasted content (Paste › Picture): no chart data, text or table left on it. */
function asPicture(src: PptObject): PptObject {
  const glyph = src.kind === "chart" ? "📊" : src.kind === "table" ? "▦" : src.kind === "smartart" ? "🔷" : src.kind === "image" ? src.glyph ?? "🖼️" : "🖼️";
  const pic: PptObject = { id: "", kind: "image", label: "Picture", glyph, x: src.x, y: src.y, w: src.w, h: src.h };
  if (src.rotate) pic.rotate = src.rotate;
  return pic;
}

/* ---------- stacking order ---------- */

/** Reorder objects front-to-back the way Bring Forward / Send Backward do, then renumber z. */
function restack(list: PptObject[], ids: Set<string>, op: "bringForward" | "bringToFront" | "sendBackward" | "sendToBack") {
  let order = list.map((o, i) => ({ o, i })).sort((a, b) => (a.o.z ?? 0) - (b.o.z ?? 0) || a.i - b.i).map((x) => x.o);
  const picked = (o: PptObject) => ids.has(o.id);
  if (op === "bringToFront") order = [...order.filter((o) => !picked(o)), ...order.filter(picked)];
  if (op === "sendToBack") order = [...order.filter(picked), ...order.filter((o) => !picked(o))];
  if (op === "bringForward") for (let k = order.length - 2; k >= 0; k--) if (picked(order[k]) && !picked(order[k + 1])) [order[k], order[k + 1]] = [order[k + 1], order[k]];
  if (op === "sendBackward") for (let k = 1; k < order.length; k++) if (picked(order[k]) && !picked(order[k - 1])) [order[k], order[k - 1]] = [order[k - 1], order[k]];
  order.forEach((o, k) => (o.z = k));
}

/* ---------- tables ---------- */

function cellRC(c: string): [number, number] {
  const m = /^r(\d+)c(\d+)$/.exec(c);
  return m ? [Number(m[1]), Number(m[2])] : [1, 1];
}
function tableOpts(o: PptObject): TableOpts {
  const x = ox(o);
  x.table = x.table ?? {};
  return x.table;
}
function mediaOpts(o: PptObject): MediaOpts {
  const x = ox(o);
  x.media = x.media ?? {};
  return x.media;
}

/* ---------- text replace ---------- */

function eachText(deck: PptDeck, fn: (t: string | undefined) => string | undefined, notes = false) {
  for (const s of deck.slides) {
    s.title = fn(s.title);
    s.subtitle = fn(s.subtitle);
    s.body = s.body?.map((b) => fn(b) ?? "");
    s.body2 = s.body2?.map((b) => fn(b) ?? "");
    if (notes) s.notes = fn(s.notes);
    s.objects?.forEach((o) => {
      o.text = fn(o.text);
      if (o.items) o.items = o.items.map((i) => fn(i) ?? "");
      if (o.rows) o.rows = o.rows.map((r) => r.map((c) => fn(c) ?? ""));
    });
  }
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** New, empty presentation from File › New. */
function newPresentation(prev: PptDeck, template: string): { doc: PptDeck; ui?: Partial<SimUi> } {
  const theme = PPT_THEMES[template] ? template : "Office Theme";
  const n = Number(prev.flags?.newCount ?? 1) + 1;
  const doc: PptDeck = {
    slides: [{ id: "s1", layout: "Title Slide" }],
    active: "s1",
    theme,
    variant: 1,
    size: "16:9",
    view: "normal",
    saved: { name: `Presentation${n}.pptx` },
    flags: { newFrom: template, newCount: n, lastAction: "new" },
  };
  return { doc, ui: { slide: "s1", selection: "s1" } };
}

/* ------------------------------------------------------------------ */
/* Pasting                                                             */
/* ------------------------------------------------------------------ */

/**
 * How a paste lands. dest: Use Destination Theme (Ctrl+V); keep: Keep Source Formatting;
 * picture: a plain picture; text: Keep Text Only. `link` keeps a live link to the source
 * workbook (Paste Link, Link Data); `ole` marks an Excel object from Paste Special.
 */
interface PasteMode {
  as: "dest" | "keep" | "picture" | "text";
  link?: boolean;
  ole?: string;
}

function pasteMode(sv: string): PasteMode {
  switch (sv) {
    case "Keep Source Formatting":
    case "Keep Source Formatting & Embed Workbook":
      return { as: "keep" };
    case "Use Destination Theme & Link Data":
      return { as: "dest", link: true };
    case "Keep Source Formatting & Link Data":
      return { as: "keep", link: true };
    case "Picture":
      return { as: "picture" };
    case "Keep Text Only":
      return { as: "text" };
    default:
      return { as: "dest" };
  }
}

/** Paste one clipboard item at the selection (a slide, a placeholder, the Notes pane, a text box). */
function pasteClip(deck: PptDeck, selIn: PptSel, slide: PptSlide, clip: Clip, mode: PasteMode): { doc: PptDeck; ui?: Partial<SimUi> } {
  // With an Animation Pane effect selected, the paste lands on the slide, not in that text.
  const sel: PptSel = selIn.anim ? { ...selIn, part: undefined, line: undefined, objs: [], anim: undefined } : selIn;
  // The Notes pane takes text only, whatever was copied.
  if (sel.part === "notes") {
    const add = clipText(clip).join("\n").trim();
    if (!add) return { doc: deck };
    const cur = slide.notes ?? "";
    slide.notes = cur && !/\s$/.test(cur) ? `${cur} ${add}` : `${cur}${add}`;
    return { doc: deck, ui: { selection: `${slide.id}.notes` } };
  }
  if (clip.kind === "slide" && !(mode.as === "picture" && !sel.thumb)) {
    const i = deck.slides.findIndex((s) => s.id === slide.id);
    let last = slide.id;
    clip.slides.forEach((s, k) => {
      const cp = clone(s);
      cp.id = nextSlideId(deck);
      if (mode.as === "dest") cp.background = s.background;
      deck.slides.splice(i + 1 + k, 0, cp);
      last = cp.id;
    });
    deck.active = last;
    return { doc: deck, ui: { slide: last, selection: last } };
  }
  if (clip.kind === "slide") {
    return addObject(deck, { ...sel, part: undefined }, slide, { id: "", kind: "image", label: "Picture", glyph: "🖼️", x: 25, y: 25, w: 50, h: 50 });
  }
  if (clip.kind === "text" || mode.as === "text") {
    const textLines = clip.kind === "text" ? clip.lines : clipText(clip);
    if (mode.as === "picture") return addObject(deck, { ...sel, part: undefined }, slide, { id: "", kind: "image", label: "Picture", glyph: "🖼️", x: 30, y: 40, w: 40, h: 14 });
    if (!textLines.length) return { doc: deck };
    if (sel.part === "body" || sel.part === "body2") {
      const l = lines(slide, sel.part).slice();
      const at = sel.line ? sel.line - 1 : l.length;
      l.splice(at, 0, ...textLines);
      setLines(slide, sel.part, l);
      return { doc: deck, ui: { selection: `${slide.id}.${sel.part}.${at + 1}` } };
    }
    if (sel.part === "title") { slide.title = `${slide.title ?? ""}${textLines.join(" ")}`; return { doc: deck }; }
    if (sel.part === "subtitle") { slide.subtitle = `${slide.subtitle ?? ""}${textLines.join(" ")}`; return { doc: deck }; }
    const tb = sel.objs.find((o) => o.kind === "textbox" || o.kind === "shape");
    if (tb) { tb.text = `${tb.text ?? ""}${textLines.join("\n")}`; return { doc: deck }; }
    return addObject(deck, { ...sel, part: undefined }, slide, { id: "", kind: "textbox", label: "Text Box", text: textLines.join("\n"), x: 30, y: 40, w: 40, h: 14 });
  }
  const sc = scopeOf(deck, sel, slide);
  if (!sc) return { doc: deck };
  const added: string[] = [];
  let list = sc.list;
  for (const src of clip.objs) {
    const o = (mode.as === "picture" ? asPicture(src) : clone(src)) as PptObjX;
    o.id = nextObjId(list);
    // Pasted where an identical copy already sits, the copy is offset so you can see it.
    if (list.some((x) => x.x === o.x && x.y === o.y && x.w === o.w && x.h === o.h)) {
      o.x = Math.min(80, o.x + 3);
      o.y = Math.min(80, o.y + 3);
    }
    delete o.placeholder;
    if (mode.as !== "picture") {
      const src2 = clip.source;
      if (mode.link && src2?.file && (o.kind === "chart" || o.kind === "table")) {
        o.dataLink = { file: src2.file, path: src2.path, item: src2.item ?? (o.kind === "chart" ? "Chart 1" : "Sheet1"), type: o.kind === "chart" ? "Chart" : "Worksheet", mode: "Automatic" };
      }
      if (mode.ole && src2?.file) o.ole = mode.ole;
      if (mode.as === "keep") o.keepSource = true;
      else if (src2) delete o.keepSource;
    }
    list = [...list, o];
    added.push(`${sc.prefix}.${o.id}`);
  }
  sc.set(list);
  return { doc: deck, ui: { selection: added.join(",") } };
}

/** Update Now / Update Link / Refresh Data: read the linked workbook's current data into the object. */
function updateLink(deck: PptDeck, o: PptObject) {
  const link = ox(o).dataLink;
  if (!link) return;
  const src = linkSources(deck)[link.file];
  if (src?.series && o.kind === "chart") o.series = clone(src.series);
  if (src?.title && o.kind === "chart") ox(o).chart = { ...(ox(o).chart ?? {}), title: src.title };
  if (src?.rows && o.kind === "table") o.rows = clone(src.rows);
  link.updated = true;
  deck.flags = { ...(deck.flags ?? {}), lastAction: "link updated" };
}

/** The icons an Icons dialog commit asks for: "icons" (a list), "icon", or checked "icon:<name>" boxes. */
function iconNames(val: Record<string, SimValue>): string[] {
  if (typeof val.icons === "string" && val.icons.trim()) return val.icons.split(",").map((s) => s.trim()).filter(Boolean);
  const checked = ICONS.filter((i) => val[`icon:${i.name}`] === true).map((i) => i.name);
  if (checked.length) return checked;
  return val.icon ? [String(val.icon)] : [];
}

/* ------------------------------------------------------------------ */
/* Built-in command handling                                           */
/* ------------------------------------------------------------------ */

export function applyPpt(input: PptDeck, c: SimCommit, ui: SimUi): { doc: PptDeck; ui?: Partial<SimUi> } {
  if (c.kind === "command" && c.id === "file.new") return newPresentation(input, String(c.value ?? "Blank Presentation"));
  const common = applyCommonCommit(input, c, ".pptx");
  if (common) {
    if (c.kind === "dialog" && c.id === "file.print") {
      common.flags = { ...(common.flags ?? {}), printLayout: String(c.values.layout ?? "Full Page Slides"), printRange: String(c.values.range ?? ""), printSlides: String(c.values.pages ?? "") };
    }
    if (common.pane === "Check Accessibility") common.pane = "Accessibility";
    if (common.pane === "Check Compatibility") common.pane = "Compatibility";
    return { doc: common };
  }

  const deck = clone(input);
  const sel = parseSel(deck, ui);
  const slide = sel.slide ?? activeSlide(deck, ui);
  const v = c.kind === "command" ? c.value : undefined;
  const sv = v === undefined ? "" : String(v);
  const flag = (patch: Record<string, SimValue | undefined>) => (deck.flags = { ...(deck.flags ?? {}), ...(patch as Record<string, SimValue>) });

  /* ================================================================ */
  if (c.kind === "type") {
    const typeInto = (o: PptObject, sub: string | undefined) => {
      if (o.kind === "table" && sub && /^r\d+c\d+$/.test(sub)) {
        const [r, col] = cellRC(sub);
        o.rows = o.rows ?? [];
        while (o.rows.length < r) o.rows.push(Array.from({ length: o.rows[0]?.length ?? col }, () => ""));
        while (o.rows[r - 1].length < col) o.rows[r - 1].push("");
        o.rows[r - 1][col - 1] = c.value;
      } else if (o.kind === "chart" && sub === "title") {
        ox(o).chart = { ...(ox(o).chart ?? {}), title: c.value, showTitle: true };
      } else if (o.kind === "chart" && sub && /^[A-Z]\d+$/.test(sub)) {
        const col = sub[0];
        const row = Number(sub.slice(1));
        const series = (o.series = o.series ?? []);
        if (row === 1) {
          if (col === "B") ox(o).chart = { ...(ox(o).chart ?? {}), seriesName: c.value };
        } else {
          while (series.length < row - 1) series.push({ label: "", value: 0 });
          const item = series[row - 2];
          if (col === "A") item.label = c.value;
          if (col === "B") item.value = Number(String(c.value).replace(/[$,\s]/g, "")) || 0;
        }
      } else if (o.kind === "smartart") {
        o.items = c.value.split("\n").map((t) => t.trim()).filter((t) => t !== "");
      } else o.text = c.value;
    };
    // Slide Master view: "master.o1", "master.title", "layout:Title Only.o2", "layout:Title Only.title".
    if (isMasterKey(c.target)) {
      const [scope, part, sub] = splitMasterKey(c.target);
      const m = masterX(deck);
      const layout = scope.startsWith("layout:") ? scope.slice(7) : "";
      if (part === "title" || part === "subtitle" || part === "body" || part === "body2") {
        if (!layout) {
          if (part === "title") m.titleText = c.value;
          else if (part === "body") m.bodyText = c.value.split("\n");
        } else {
          const lt = (m.layoutText = { ...(m.layoutText ?? {}) });
          lt[layout] = { ...(lt[layout] ?? {}), [part]: c.value };
        }
        return { doc: deck };
      }
      const list = layout ? m.layoutObjects?.[layout] ?? [] : m.objects ?? [];
      const o = list.find((x) => x.id === part);
      if (o) typeInto(o, sub);
      return { doc: deck };
    }
    const [sid, part, sub] = c.target.split(".");
    const sl = deck.slides.find((s) => s.id === sid);
    if (!sl) return { doc: deck };
    if (part === "title") sl.title = c.value;
    else if (part === "subtitle") sl.subtitle = c.value;
    else if (part === "body") sl.body = c.value.split("\n").filter((l, i, a) => l.trim() !== "" || i < a.length - 1);
    else if (part === "body2") sl.body2 = c.value.split("\n");
    else if (part === "notes") sl.notes = c.value;
    else {
      const o = sl.objects?.find((x) => x.id === part);
      if (o) typeInto(o, sub);
    }
    // Typing fixes misspellings it replaces.
    if (sl.spell) sl.spell = sl.spell.filter((w) => [sl.title, sl.subtitle, ...(sl.body ?? []), ...(sl.body2 ?? []), ...(sl.objects ?? []).map((o) => o.text)].some((t) => t?.includes(w.word)));
    return { doc: deck };
  }

  if (c.kind === "click") return { doc: deck };

  /* ================================================================ */
  if (c.kind === "dialog") {
    const val = c.values;
    switch (c.id) {
      case "insertPicture":
      case "stockImages":
      case "onlinePictures":
        return addObject(deck, sel, slide, { id: "", kind: "image", label: String(val.file ?? val.image ?? "Picture").replace(/ \(Creative Commons\)$/, ""), glyph: "🖼️", x: 32, y: 28, w: 36, h: 48 }, undefined, { autoFill: true });
      case "insertVideo":
      case "onlineVideo": {
        const label = c.id === "onlineVideo" ? String(val.address || "Online video") : String(val.file ?? "Video");
        return addObject(deck, sel, slide, { id: "", kind: "video", label, glyph: "▶", x: 26, y: 28, w: 48, h: 48 }, undefined, { autoFill: true });
      }
      case "insertAudio":
        return addObject(deck, sel, slide, { id: "", kind: "audio", label: String(val.file ?? "Audio"), glyph: "🔊", x: 46, y: 44, w: 8, h: 12 });
      case "insertIcons": {
        // One icon or several picked together (the Icons dialog allows a multiple selection).
        const names = iconNames(val);
        const icons = names.map((n) => ICONS.find((i) => i.name === n)).filter(Boolean) as typeof ICONS;
        if (!icons.length) return { doc: deck };
        const make = (ic: (typeof ICONS)[number]): PptObject => ({ id: "", kind: "icon", label: ic.name, glyph: ic.glyph, x: 44, y: 38, w: 12, h: 20, color: themeOf(deck).accent });
        if (icons.length === 1) return addObject(deck, sel, slide, make(icons[0]), undefined, { autoFill: true });
        const sc = scopeOf(deck, sel, slide);
        if (!sc) return { doc: deck };
        const gap = 4, w = 12;
        const total = icons.length * w + (icons.length - 1) * gap;
        let list = sc.list;
        const added: string[] = [];
        icons.forEach((ic, k) => {
          const o = make(ic);
          o.id = nextObjId(list);
          o.x = Math.max(2, (100 - total) / 2 + k * (w + gap));
          list = [...list, o];
          added.push(`${sc.prefix}.${o.id}`);
        });
        sc.set(list);
        return { doc: deck, ui: { selection: added.join(",") } };
      }
      case "changeGraphic": {
        const ic = ICONS.find((i) => i.name === String(val.icon));
        if (ic) for (const o of sel.objs) if (o.kind === "icon") { o.label = ic.name; o.glyph = ic.glyph; }
        return { doc: deck };
      }
      case "changePicture": {
        for (const o of sel.objs) if (o.kind === "image") o.label = String(val.file ?? o.label);
        return { doc: deck };
      }
      case "insertChart": {
        const o = sampleChart(String(val.type ?? "Clustered Column"));
        const r = addObject(deck, sel, slide, o, undefined, { autoFill: true });
        flag({ chartData: r.ui?.selection ?? "" });
        deck.pane = "Chart Data";
        return r;
      }
      case "pasteSpecial": {
        const clip = readClip(deck);
        if (!clip || !slide) return { doc: deck };
        const as = String(val.as ?? "");
        const link = String(val.mode ?? "Paste") === "Paste link" && Boolean(clip.source?.file);
        const isTable = clip.kind === "obj" && clip.objs[0]?.kind === "table";
        const mode: PasteMode = link
          ? { as: "keep", link: true, ole: isTable ? "Microsoft Excel Worksheet Object" : "Microsoft Excel Chart Object" }
          : PICTURE_FORMATS.includes(as) ? { as: "picture" }
          : as === "Unformatted Text" ? { as: "text" }
          : /^Microsoft Excel/.test(as) ? { as: "keep", ole: as }
          : { as: "dest" };
        return pasteClip(deck, sel, slide, clip, mode);
      }
      case "officeClipboard": {
        // Fallback for the Clipboard launcher when it opens as a dialog: paste the item and dock the pane.
        deck.pane = "Clipboard";
        const item = clipHistory(deck).find((h) => clipLabel(h) === String(val.item ?? ""));
        if (!item || !slide) return { doc: deck };
        return pasteClip(deck, sel, slide, item, { as: "dest" });
      }
      case "defineCustomShow": {
        const name = String(val.name ?? "").trim() || "Custom Show 1";
        const slides = String(val.slides ?? "").split(",").map((x) => x.trim()).filter((id) => deck.slides.some((s) => s.id === id));
        const original = String(val.original ?? "");
        const list = customShows(deck).filter((cs) => cs.name !== name && (!original || cs.name !== original));
        const at = original ? customShows(deck).findIndex((cs) => cs.name === original) : -1;
        const next = list.slice();
        next.splice(at >= 0 ? Math.min(at, next.length) : next.length, 0, { name, slides });
        flag({ customShows: JSON.stringify(next), customShowFocus: name, pptDialog: "customShows" });
        return { doc: deck };
      }
      case "animEffect":
      case "animTiming": {
        if (!slide) return { doc: deck };
        for (const t of animTargets(sel)) {
          const { name, meta } = getMeta(slide, t);
          if (!name) continue;
          if (val.direction !== undefined && val.direction !== "") meta.effect = String(val.direction);
          if (val.sound !== undefined) meta.sound = String(val.sound);
          if (val.after !== undefined) meta.after = String(val.after);
          if (val.groupText !== undefined) meta.sequence = String(val.groupText);
          if (val.start !== undefined && ["On Click", "With Previous", "After Previous"].includes(String(val.start))) meta.start = String(val.start) as AnimStart;
          if (val.delay !== undefined && val.delay !== "") meta.delay = Math.max(0, Number(val.delay) || 0);
          if (val.duration !== undefined && val.duration !== "") meta.duration = Math.max(0.01, Number(val.duration) || 0.5);
          if (val.repeat !== undefined) meta.repeat = String(val.repeat);
        }
        return { doc: deck };
      }
      case "changeChartType":
        for (const o of sel.objs) if (o.kind === "chart") { o.label = String(val.type ?? o.label); o.style = o.label; }
        return { doc: deck };
      case "insertSmartArt":
      case "convertSmartArt": {
        if (!slide) return { doc: deck };
        const convert = c.id === "convertSmartArt" || Boolean(val.convert);
        const fromPart: "body" | "body2" = sel.part === "body2" ? "body2" : "body";
        const src = convert ? lines(slide, fromPart).map((t) => t.replace(/^\t+/, "")).filter((t) => t.trim()) : [];
        const items = convert && src.length ? src : ["[Text]", "[Text]", "[Text]"];
        const graphic = String(val.graphic ?? "Basic Block List");
        const o: PptObjX = { id: "", kind: "smartart", label: graphic, style: graphic, items, x: 8, y: 26, w: 84, h: 62 };
        if (convert) {
          const b = layoutBoxes(slide.layout)[fromPart];
          if (b) Object.assign(o, { x: b.x, y: b.y, w: b.w, h: b.h, placeholder: fromPart });
          setLines(slide, fromPart, []);
          const sc = scopeOf(deck, sel, slide)!;
          o.id = nextObjId(sc.list);
          sc.set([...sc.list, o]);
          deck.pane = "Text Pane";
          return { doc: deck, ui: { selection: `${slide.id}.${o.id}` } };
        }
        const r = addObject(deck, sel, slide, o, undefined, { autoFill: true });
        deck.pane = "Text Pane";
        return r;
      }
      case "insertTable": {
        const cols = Math.max(1, Number(val.cols ?? 3)), rows = Math.max(1, Number(val.rows ?? 3));
        const o: PptObjX = { id: "", kind: "table", label: "Table", rows: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")), x: 8, y: 26, w: 84, h: Math.min(66, 9 * rows), table: { headerRow: true, bandedRows: true } };
        const r = addObject(deck, sel, slide, o, undefined, { autoFill: true });
        if (o.placeholder) o.h = Math.min(o.h, 9 * rows);
        return r.ui?.selection ? { ...r, ui: { selection: `${r.ui.selection}.r1c1` } } : r;
      }
      case "headerFooter": {
        deck.footer = { text: val.footer ? String(val.footerText ?? "") : undefined, slideNumber: Boolean(val.slideNumber), date: Boolean(val.date) };
        flag({ dontShowOnTitle: Boolean(val.dontShowOnTitle), footerApplyAll: String(val.apply ?? "Apply to All") });
        return { doc: deck };
      }
      case "formatBackground": {
        const color = String(val.color ?? slide?.background ?? themeOf(deck).bg);
        if (deck.view === "master" && sel.layout) deck.slides.filter((s) => s.layout === sel.layout).forEach((s) => (s.background = color));
        else if (deck.view === "master" || val.applyToAll) deck.slides.forEach((s) => (s.background = color));
        else if (slide) slide.background = color;
        if (val.hideGraphics !== undefined && slide && deck.view !== "master") sx(slide).hideGraphics = Boolean(val.hideGraphics);
        return { doc: deck };
      }
      case "addSection": {
        if (!slide) return { doc: deck };
        const i = deck.slides.findIndex((s) => s.id === slide.id);
        const name = String(val.name || "Untitled Section");
        const old = deck.slides[i].section;
        const hadSections = deck.slides.some((s) => s.section);
        if (!hadSections && i > 0) for (let k = 0; k < i; k++) deck.slides[k].section = "Default Section";
        for (let k = i; k < deck.slides.length; k++) {
          if (k > i && deck.slides[k].section !== old) break;
          deck.slides[k].section = name;
        }
        return { doc: deck };
      }
      case "renameSection": {
        if (!slide) return { doc: deck };
        const i = deck.slides.findIndex((s) => s.id === slide.id);
        if (!deck.slides[i].section) return { doc: deck };
        const [a, b] = sectionRange(deck, i);
        const name = String(val.name || "Untitled Section");
        for (let k = a; k <= b; k++) deck.slides[k].section = name;
        return { doc: deck };
      }
      case "newComment":
        if (slide) sx(slide).comments = [...(sx(slide).comments ?? []), { author: "BEOC Student", text: String(val.text ?? "") }];
        deck.pane = "Comments";
        return { doc: deck };
      case "link": {
        for (const t of targets(deck, ui)) Object.assign(t, { color: "#0563C1", underline: true });
        for (const o of sel.objs) ox(o).link = String(val.address ?? "");
        flag({ link: String(val.address ?? "") });
        return { doc: deck };
      }
      case "altText": {
        const o = sel.objs[0];
        if (o) {
          o.alt = String(val.text ?? "");
          ox(o).decorative = Boolean(val.decorative);
        }
        return { doc: deck };
      }
      case "find": {
        const q = String(val.find ?? "");
        if (!q) return { doc: deck };
        const re = new RegExp(val.wholeWords ? `\\b${escapeRe(q)}\\b` : escapeRe(q), val.matchCase ? "" : "i");
        const start = Math.max(0, deck.slides.findIndex((s) => s.id === slide?.id));
        const order = [...deck.slides.slice(start + (deck.flags?.findLast === q ? 1 : 0)), ...deck.slides.slice(0, start + (deck.flags?.findLast === q ? 1 : 0))];
        for (const s of order) {
          const hit = ([["title", s.title], ["subtitle", s.subtitle], ["body", (s.body ?? []).join("\n")], ["body2", (s.body2 ?? []).join("\n")]] as const).find(([, t]) => t && re.test(t));
          const objHit = !hit ? (s.objects ?? []).find((o) => [o.text, ...(o.items ?? []), ...(o.rows ?? []).flat()].some((t) => t && re.test(t))) : undefined;
          if (hit || objHit) {
            deck.active = s.id;
            deck.pane = null;
            flag({ findLast: q, found: `Slide ${deck.slides.indexOf(s) + 1}` });
            return { doc: deck, ui: { slide: s.id, selection: hit ? `${s.id}.${hit[0]}` : `${s.id}.${objHit!.id}` } };
          }
        }
        deck.pane = "Find: PowerPoint has finished searching the presentation. The search item wasn't found.";
        flag({ findLast: q, found: "" });
        return { doc: deck };
      }
      case "replace": {
        const find = String(val.find ?? "");
        const repl = String(val.replace ?? "");
        let n = 0;
        if (find) {
          const re = new RegExp(val.wholeWords ? `\\b${escapeRe(find)}\\b` : escapeRe(find), val.matchCase ? "g" : "gi");
          eachText(deck, (t) => (t ? t.replace(re, () => { n++; return repl; }) : t));
          for (const s of deck.slides) if (s.spell) s.spell = s.spell.filter((w) => !(new RegExp(escapeRe(find), "i").test(w.word)));
        }
        deck.pane = `Replace: ${n} replacement${n === 1 ? "" : "s"}`;
        return { doc: deck };
      }
      case "replaceFonts": {
        const from = String(val.replace ?? ""), to = String(val.with ?? "");
        if (!from || !to) return { doc: deck };
        const th = themeOf(deck);
        const m = masterX(deck);
        if ((m.titleFont ?? th.titleFont) === from) m.titleFont = to;
        if ((m.bodyFont ?? th.font) === from) m.bodyFont = to;
        const fix = (p?: TextProps) => { if (p && p.font === from) p.font = to; };
        for (const s of deck.slides) {
          fix(s.titleProps); fix(s.subtitleProps); fix(s.bodyProps);
          s.objects?.forEach((o) => fix(o.props));
        }
        return { doc: deck };
      }
      case "slideSize":
        deck.size = String(val.size ?? "16:9").includes("4:3") ? "4:3" : "16:9";
        return { doc: deck };
      case "setupShow": {
        // Fields left out of the commit keep their current setting.
        const has = (k: string) => val[k] !== undefined;
        const showType = has("showType") ? String(val.showType) : String(deck.flags?.showType ?? "");
        if (has("showType")) flag({ showType });
        if (has("loop") || has("showType")) flag({ loop: Boolean(val.loop ?? deck.flags?.loop) || showType.includes("kiosk") });
        if (has("noNarration")) flag({ noNarration: Boolean(val.noNarration) });
        if (has("noAnimation")) flag({ noAnimation: Boolean(val.noAnimation) });
        if (val.showSlides === "Custom show:") {
          flag({ showRange: "", showCustomSetup: String(val.customShow || customShows(deck)[0]?.name || "") });
        } else if (has("showSlides") || has("from") || has("to")) {
          const all = val.showSlides === "All" || (!has("showSlides") && !deck.flags?.showRange && !has("from") && !has("to"));
          flag({ showRange: all ? "" : `${Number(val.from) || 1}-${Number(val.to) || deck.slides.length}`, showCustomSetup: "" });
        }
        if (has("advance")) flag({ advance: String(val.advance) });
        if (has("presenterView")) flag({ "slideshow.presenterView": Boolean(val.presenterView) });
        return { doc: deck };
      }
      case "zoom":
        flag({ zoom: Number(val.percent ?? 100) || 100 });
        return { doc: deck };
      case "renameLayout": {
        const name = String(val.name ?? "");
        if (sel.layout) {
          const m = masterX(deck);
          m.layoutNames = { ...(m.layoutNames ?? {}), [sel.layout]: name };
        }
        flag({ layoutName: name });
        return { doc: deck };
      }
      case "paragraph": {
        const a = ({ Left: "left", Centered: "center", Center: "center", Right: "right", Justified: "justify" } as Record<string, string>)[String(val.alignment ?? "")];
        if (a) for (const t of targets(deck, ui)) t.align = a;
        if (slide && (sel.part === "body" || sel.part === "body2" || !sel.part)) {
          const bp = bodyX(slide);
          const ls = String(val.lineSpacing ?? "");
          if (ls) bp.lineSpacing = ({ Single: 1, "1.5 lines": 1.5, Double: 2 } as Record<string, number>)[ls] ?? (ls === "Multiple" ? Number(val.at) || 1 : ls === "Exactly" ? Math.max(0.6, (Number(val.at) || 24) / 24) : 1);
          if (val.before !== undefined && val.before !== "") bp.spaceBefore = Number(val.before) || 0;
          if (val.after !== undefined && val.after !== "") bp.spaceAfter = Number(val.after) || 0;
          if (val.indentBefore !== undefined && val.indentBefore !== "") bp.indent = Number(val.indentBefore) || 0;
          if (val.special !== undefined) bp.hanging = val.special === "Hanging" ? Number(val.by) || 0 : val.special === "First line" ? -(Number(val.by) || 0) : 0;
        }
        return { doc: deck };
      }
      case "font":
        if (val.font) setProp(deck, ui, "font", String(val.font));
        if (val.size) setProp(deck, ui, "size", Number(val.size));
        // Automatic clears the color so the text follows the theme again.
        if (val.color) setProp(deck, ui, "color", val.color === "Automatic" ? undefined : String(val.color));
        if (val.style) {
          setProp(deck, ui, "bold", String(val.style).includes("Bold"));
          setProp(deck, ui, "italic", String(val.style).includes("Italic"));
        }
        if (val.underline !== undefined) setProp(deck, ui, "underline", val.underline !== "(none)" && Boolean(val.underline));
        if (val.strike !== undefined) setProp(deck, ui, "strike", Boolean(val.strike));
        return { doc: deck };
      case "bullets": {
        if (!slide) return { doc: deck };
        const bp = bodyX(slide);
        const style = val.style === undefined ? (bp.bullets === false && !bp.numbered ? "None" : bp.bulletStyle ?? "Filled Round Bullets") : String(val.style);
        if (style === "None") { bp.bullets = false; bp.numbered = false; }
        else { bp.bullets = true; bp.numbered = false; bp.bulletStyle = style; }
        if (val.size) bp.bulletSize = Number(val.size) || 100;
        if (val.color === "Automatic") delete bp.bulletColor;
        else if (val.color) bp.bulletColor = String(val.color);
        return { doc: deck };
      }
      case "numbering": {
        if (!slide) return { doc: deck };
        const bp = bodyX(slide);
        const style = val.style === undefined ? bp.numberFormat ?? "1. 2. 3." : String(val.style);
        if (style === "None") { bp.numbered = false; bp.bullets = false; }
        else { bp.numbered = true; bp.bullets = true; bp.numberFormat = style; }
        if (val.startAt !== undefined) bp.startAt = Math.max(1, Number(val.startAt) || 1);
        if (val.size) bp.bulletSize = Number(val.size) || 100;
        if (val.color === "Automatic") delete bp.bulletColor;
        else if (val.color) bp.bulletColor = String(val.color);
        return { doc: deck };
      }
      case "saveTheme":
        flag({ savedTheme: `${String(val.name || "Theme1").replace(/\.thmx$/i, "")}.thmx`, lastAction: "theme saved" });
        return { doc: deck };
      case "customizeColors": {
        const name = String(val.name || "Custom 1");
        flag({ themeColors: name, customColorsName: name, customAccent: String(val.accent1 ?? themeOf(deck).accent) });
        return { doc: deck };
      }
      case "customizeFonts": {
        const m = masterX(deck);
        if (val.heading) m.titleFont = String(val.heading);
        if (val.body) m.bodyFont = String(val.body);
        flag({ themeFonts: String(val.name || "Custom 1") });
        return { doc: deck };
      }
      case "compressPictures": {
        const res = String(val.resolution ?? "Use default resolution");
        const pics = val.applyOnly === false ? deck.slides.flatMap((s) => (s.objects ?? []).filter((o) => o.kind === "image")) : sel.objs.filter((o) => o.kind === "image");
        for (const o of pics) ox(o).fx = { ...(ox(o).fx ?? {}), compressed: res };
        flag({ compressed: res, deleteCropped: Boolean(val.deleteCropped) });
        return { doc: deck };
      }
      case "rotation":
        if (val.degrees !== undefined && val.degrees !== "") for (const o of sel.objs) o.rotate = (((Number(val.degrees) || 0) % 360) + 360) % 360;
        for (const o of sel.objs) {
          // Lock aspect ratio (on by default for pictures): a new width scales the height too, like Width on the Ribbon.
          if (val.lockAspect !== undefined) ox(o).lockAspect = Boolean(val.lockAspect);
          const lock = keepsAspect(o);
          const curW = o.w / inchesToPct(deck, 1, "w"), curH = o.h / inchesToPct(deck, 1, "h");
          const wIn = Number(val.width) || 0, hIn = Number(val.height) || 0;
          const changedW = wIn > 0 && Math.abs(wIn - curW) > 0.005;
          const changedH = hIn > 0 && Math.abs(hIn - curH) > 0.005;
          if (lock && changedW) { const w = inchesToPct(deck, wIn, "w"); o.h = o.h * (w / o.w); o.w = w; }
          else if (lock && changedH) { const h = inchesToPct(deck, hIn, "h"); o.w = o.w * (h / o.h); o.h = h; }
          else {
            if (changedW) o.w = inchesToPct(deck, wIn, "w");
            if (changedH) o.h = inchesToPct(deck, hIn, "h");
          }
        }
        return { doc: deck };
      case "trimAudio":
      case "trimVideo":
        for (const o of sel.objs) {
          if (o.kind !== "audio" && o.kind !== "video") continue;
          const m = mediaOpts(o);
          const len = mediaLength(o);
          m.trimStart = Math.max(0, Math.min(len, Number(val.start) || 0));
          m.trimEnd = Math.max(m.trimStart, Math.min(len, val.end === undefined || val.end === "" ? len : Number(val.end)));
        }
        return { doc: deck };
    }
    return { doc: deck };
  }

  if (c.kind !== "command") return { doc: deck };

  /* ================================================================ */
  switch (c.id) {
    /* -------- slides -------- */
    case "slides.new": {
      const id = nextSlideId(deck);
      const layout = sv || "Title and Content";
      const i = deck.slides.findIndex((s) => s.id === (slide?.id ?? deck.active));
      const ns: PptSlide = { id, layout, section: slide?.section };
      deck.slides.splice(i + 1, 0, ns);
      deck.active = id;
      return { doc: deck, ui: { slide: id, selection: id } };
    }
    case "slides.duplicate": {
      if (!slide) return { doc: deck };
      const cp = clone(slide);
      cp.id = nextSlideId(deck);
      deck.slides.splice(deck.slides.findIndex((s) => s.id === slide.id) + 1, 0, cp);
      deck.active = cp.id;
      return { doc: deck, ui: { slide: cp.id, selection: cp.id } };
    }
    case "slides.delete": {
      if (!slide || deck.slides.length <= 1) return { doc: deck };
      const i = deck.slides.findIndex((s) => s.id === slide.id);
      deck.slides.splice(i, 1);
      const next = deck.slides[Math.max(0, i - 1)];
      deck.active = next.id;
      return { doc: deck, ui: { slide: next.id, selection: next.id } };
    }
    case "slides.layout": if (slide) slide.layout = sv; return { doc: deck };
    case "slides.reset":
      if (slide) { slide.titleProps = undefined; slide.bodyProps = undefined; slide.subtitleProps = undefined; }
      return { doc: deck };
    case "slides.hide":
    case "slideshow.hideSlide":
      if (slide) slide.hidden = !slide.hidden;
      return { doc: deck };
    case "slides.move": {
      // "s4@2" puts slide s4 at position 2; "s4@5|Results" also files it under the Results section
      // (a drop on a section heading lands at the end of the section above it).
      const [move, section] = sv.split("|");
      const [id, pos] = move.split("@");
      const i = deck.slides.findIndex((s) => s.id === id);
      if (i >= 0) {
        const p = Math.max(1, Math.min(deck.slides.length, Number(pos) || 1));
        const target = deck.slides[p - 1];
        const [s] = deck.slides.splice(i, 1);
        if (section !== undefined) s.section = section || undefined;
        else if (target && target.id !== s.id && deck.slides.some((x) => x.section)) s.section = target.section;
        deck.slides.splice(p - 1, 0, s);
      }
      return { doc: deck };
    }
    case "slides.section": {
      const i = deck.slides.findIndex((s) => s.id === slide?.id);
      if (sv === "Remove All Sections") deck.slides.forEach((s) => (s.section = undefined));
      else if (sv === "Collapse All") flag({ sections: sv, collapsed: JSON.stringify(Array.from(new Set(deck.slides.map((s) => s.section).filter(Boolean)))) });
      else if (sv === "Expand All") flag({ sections: sv, collapsed: "[]" });
      else if ((sv === "Remove Section" || sv === "Remove Section & Slides") && i >= 0 && deck.slides[i].section) {
        const [a, b] = sectionRange(deck, i);
        if (sv === "Remove Section & Slides" && b - a + 1 < deck.slides.length) {
          deck.slides.splice(a, b - a + 1);
          const n = deck.slides[Math.max(0, a - 1)];
          deck.active = n.id;
          return { doc: deck, ui: { slide: n.id, selection: n.id } };
        }
        const into = a > 0 ? deck.slides[a - 1].section : deck.slides[b + 1]?.section;
        for (let k = a; k <= b; k++) deck.slides[k].section = into;
      } else if ((sv === "Move Section Up" || sv === "Move Section Down") && i >= 0 && deck.slides[i].section) {
        const [a, b] = sectionRange(deck, i);
        const block = deck.slides.splice(a, b - a + 1);
        if (sv === "Move Section Up" && a > 0) {
          const [pa] = sectionRange(deck, a - 1);
          deck.slides.splice(pa, 0, ...block);
        } else if (sv === "Move Section Down" && a < deck.slides.length) {
          const [, nb] = sectionRange(deck, a);
          deck.slides.splice(nb + 1, 0, ...block);
        } else deck.slides.splice(a, 0, ...block);
      }
      return { doc: deck };
    }
    case "section.toggle": {
      const list = flagJson<string[]>(deck, "collapsed", []);
      const next = list.includes(sv) ? list.filter((x) => x !== sv) : [...list, sv];
      flag({ collapsed: JSON.stringify(next) });
      return { doc: deck };
    }

    /* -------- clipboard -------- */
    case "home.cut":
    case "home.copy": {
      const cut = c.id === "home.cut";
      // An Animation Pane item is an effect, not content: there is nothing to copy.
      if (sel.anim) return { doc: deck };
      if (slide && sel.part === "notes") {
        if (!slide.notes) return { doc: deck };
        writeClip(deck, { kind: "text", lines: slide.notes.split("\n") }, cut);
        if (cut) slide.notes = "";
        return { doc: deck };
      }
      if (sel.thumb && slide) {
        writeClip(deck, { kind: "slide", slides: [clone(slide)] }, cut);
        if (cut && deck.slides.length > 1) return applyPpt(deck, { kind: "command", id: "slides.delete" }, ui);
        return { doc: deck };
      }
      if (sel.objs.length) {
        writeClip(deck, { kind: "obj", objs: clone(sel.objs) }, cut);
        if (cut) {
          const sc = scopeOf(deck, sel, slide);
          sc?.set(sc.list.filter((o) => !sel.objs.some((x) => x.id === o.id)));
          return { doc: deck, ui: { selection: slide?.id ?? "" } };
        }
        return { doc: deck };
      }
      if (slide && (sel.part === "body" || sel.part === "body2")) {
        const l = lines(slide, sel.part);
        const taken = sel.line ? l.slice(sel.line - 1, sel.line) : l.slice();
        writeClip(deck, { kind: "text", lines: taken }, cut);
        if (cut) {
          setLines(slide, sel.part, sel.line ? l.filter((_, k) => k !== sel.line! - 1) : []);
          return { doc: deck, ui: { selection: `${slide.id}.${sel.part}` } };
        }
        return { doc: deck };
      }
      if (slide && (sel.part === "title" || sel.part === "subtitle")) {
        writeClip(deck, { kind: "text", lines: [(sel.part === "title" ? slide.title : slide.subtitle) ?? ""] }, cut);
        if (cut) sel.part === "title" ? (slide.title = "") : (slide.subtitle = "");
      }
      return { doc: deck };
    }
    case "home.paste": {
      const clip = readClip(deck);
      if (!clip || !slide) return { doc: deck };
      return pasteClip(deck, sel, slide, clip, pasteMode(sv));
    }

    /* -------- Office Clipboard (Home › Clipboard launcher) -------- */
    case "home.clipboardPane":
      deck.pane = deck.pane === "Clipboard" ? null : "Clipboard";
      return { doc: deck };
    case "clipboard.paste": {
      const history = clipHistory(deck);
      const item = history.find((h) => clipLabel(h) === sv) ?? (/^\d+$/.test(sv) ? history[Number(sv) - 1] : undefined);
      if (!item || !slide) return { doc: deck };
      return pasteClip(deck, sel, slide, item, { as: "dest" });
    }
    case "clipboard.pasteAll": {
      if (!slide) return { doc: deck };
      let out: { doc: PptDeck; ui?: Partial<SimUi> } = { doc: deck };
      for (const item of clipHistory(deck).slice().reverse()) {
        const r = pasteClip(deck, parseSel(deck, ui), slide, item, { as: "dest" });
        out = { doc: deck, ui: { ...(out.ui ?? {}), ...(r.ui ?? {}) } };
      }
      return out;
    }
    case "clipboard.clear":
      flag({ clipHistory: "[]", clip: undefined, clipObj: undefined, clipSlide: undefined });
      return { doc: deck };
    case "clipboard.delete": {
      const history = clipHistory(deck);
      const i = history.findIndex((h) => clipLabel(h) === sv);
      if (i >= 0) {
        const next = history.filter((_, k) => k !== i);
        flag({ clipHistory: JSON.stringify(next) });
        if (i === 0) flag({ clip: next[0] ? JSON.stringify(next[0]) : undefined });
      }
      return { doc: deck };
    }

    /* -------- linked charts (Paste Link, Edit Links to Files) -------- */
    case "links.edit":
      flag({ pptDialog: "links", linkFocus: sv || deckLinks(deck)[0]?.key || "" });
      return { doc: deck };
    case "links.update":
    case "links.openSource":
    case "links.break":
    case "links.mode":
    case "links.changeSource": {
      // value: "s2.o1" (one link), "s2.o1|Manual" / "s2.o1|Other.xlsx" (with an argument), or empty for every link.
      const [key, arg] = sv.includes("|") ? sv.split("|") : /^s\d+\.o\d+$/.test(sv) ? [sv, ""] : ["", sv];
      const all = deckLinks(deck);
      const picked = key ? all.filter((l) => l.key === key) : sel.objs.some((o) => ox(o).dataLink) ? all.filter((l) => sel.objs.includes(l.o)) : all;
      for (const { o, link } of picked) {
        if (c.id === "links.update") updateLink(deck, o);
        if (c.id === "links.openSource") flag({ openedSource: link.file, lastAction: `opened ${link.file} in Excel` });
        if (c.id === "links.break") { delete ox(o).dataLink; flag({ linkBroken: true, lastAction: "link broken" }); }
        if (c.id === "links.mode") link.mode = arg === "Manual" ? "Manual" : "Automatic";
        if (c.id === "links.changeSource" && arg) { link.file = arg; updateLink(deck, o); }
      }
      return { doc: deck };
    }
    case "modal.close":
      flag({ pptDialog: "" });
      return { doc: deck };
    case "text.move": {
      // "s4.body.3@5": move paragraph 3 so it lands before paragraph 5.
      const [from, to] = sv.split("@");
      const [sid, part, ln] = from.split(".");
      const s = deck.slides.find((x) => x.id === sid);
      if (!s || (part !== "body" && part !== "body2")) return { doc: deck };
      const l = lines(s, part).slice();
      const a = Number(ln) - 1;
      let b = Number(to) - 1;
      if (a < 0 || a >= l.length || Number.isNaN(b)) return { doc: deck };
      const [item] = l.splice(a, 1);
      if (b > a) b--;
      l.splice(Math.max(0, Math.min(l.length, b)), 0, item);
      setLines(s, part, l);
      return { doc: deck, ui: { slide: s.id, selection: `${s.id}.${part}.${Math.max(0, Math.min(l.length - 1, b)) + 1}` } };
    }
    case "home.formatPainter":
      flag({ painter: JSON.stringify(firstProps(deck, ui)) });
      return { doc: deck };
    case "home.formatPainter.apply": {
      const p = deck.flags?.painter;
      if (p) for (const t of targets(deck, ui)) Object.assign(t, JSON.parse(String(p)));
      flag({ painter: undefined });
      return { doc: deck };
    }
    case "home.selectAll": {
      if (!slide) return { doc: deck };
      // Inside a text placeholder, Select All selects all of its text.
      if (sel.part && sel.part !== "picture") return { doc: deck, ui: { selection: `${slide.id}.${sel.part}` } };
      const objs = (slide.objects ?? []).map((o) => `${slide.id}.${o.id}`);
      return { doc: deck, ui: { selection: objs.length ? objs.join(",") : slide.id } };
    }
    case "home.select":
      if (sv === "Selection Pane...") deck.pane = deck.pane === "Selection" ? null : "Selection";
      if (sv === "Select All") return applyPpt(deck, { kind: "command", id: "home.selectAll" }, ui);
      return { doc: deck };
    case "view.selectionPane":
      deck.pane = deck.pane === "Selection" ? null : "Selection";
      return { doc: deck };

    /* -------- font -------- */
    case "home.bold":
    case "home.italic":
    case "home.underline":
    case "home.strike":
    case "home.shadow": {
      const k = c.id.split(".")[1] as "bold" | "italic" | "underline" | "strike";
      const cur = (firstProps(deck, ui) as Record<string, unknown>)[k];
      setProp(deck, ui, k as keyof TextProps, !cur);
      return { doc: deck };
    }
    case "home.fontName": setProp(deck, ui, "font", sv); return { doc: deck };
    case "home.fontSize": setProp(deck, ui, "size", Number(sv) || 18); return { doc: deck };
    case "home.growFont":
    case "home.shrinkFont": {
      const p = firstProps(deck, ui);
      const cur = p.size ?? defaultSize(sel.part, slide?.layout ?? "");
      const i = SIZES.findIndex((s) => s >= cur);
      const next = c.id === "home.growFont" ? SIZES[Math.min(SIZES.length - 1, SIZES[i] === cur ? i + 1 : i)] : SIZES[Math.max(0, (i < 0 ? SIZES.length : i) - 1)];
      setProp(deck, ui, "size", next);
      return { doc: deck };
    }
    case "home.fontColor": setProp(deck, ui, "color", sv === "Automatic" ? undefined : sv || "#C00000"); return { doc: deck };
    case "home.clearFormatting":
      for (const t of targets(deck, ui)) for (const k of Object.keys(t)) if (!["bullets", "numbered", "bulletStyle", "numberFormat", "startAt", "lineSpacing"].includes(k)) delete (t as Record<string, unknown>)[k];
      return { doc: deck };
    case "home.changeCase": {
      const conv = (t?: string) => !t ? t : sv === "UPPERCASE" ? t.toUpperCase() : sv === "lowercase" ? t.toLowerCase() : sv === "Capitalize Each Word" ? t.toLowerCase().replace(/\b\w/g, (x) => x.toUpperCase()) : sv === "Sentence case." ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : sv === "tOGGLE cASE" ? t.replace(/./g, (ch) => (ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase())) : t;
      if (slide) {
        if (sel.part === "title") slide.title = conv(slide.title);
        else if (sel.part === "subtitle") slide.subtitle = conv(slide.subtitle);
        else if (sel.part === "body" || sel.part === "body2") {
          const l = lines(slide, sel.part);
          setLines(slide, sel.part, l.map((b, k) => (!sel.line || k === sel.line - 1 ? conv(b)! : b)));
        } else sel.objs.forEach((o) => (o.text = conv(o.text)));
      }
      return { doc: deck };
    }

    /* -------- paragraph -------- */
    case "home.bullets": {
      if (!slide) return { doc: deck };
      const bp = bodyX(slide);
      if (sv === "None") { bp.bullets = false; bp.numbered = false; }
      else if (sv) { bp.bullets = true; bp.numbered = false; bp.bulletStyle = bulletStyleName(sv) ?? sv; }
      else { const on = bp.bullets !== false && !bp.numbered; bp.bullets = !on; bp.numbered = false; }
      return { doc: deck };
    }
    case "home.numbering": {
      if (!slide) return { doc: deck };
      const bp = bodyX(slide);
      if (sv === "None") { bp.numbered = false; bp.bullets = false; }
      else if (sv) { bp.numbered = true; bp.bullets = true; bp.numberFormat = numberFormatName(sv) ?? sv; }
      else { bp.numbered = !bp.numbered; bp.bullets = bp.numbered; }
      return { doc: deck };
    }
    case "home.alignLeft":
    case "home.alignCenter":
    case "home.alignRight":
    case "home.justify": {
      const a = ({ "home.alignLeft": "left", "home.alignCenter": "center", "home.alignRight": "right", "home.justify": "justify" } as const)[c.id];
      for (const t of targets(deck, ui)) t.align = a;
      return { doc: deck };
    }
    case "home.lineSpacing":
      if (slide) bodyX(slide).lineSpacing = Number(sv) || 1;
      return { doc: deck };
    case "home.indentInc":
    case "home.indentDec": {
      if (!slide || (sel.part !== "body" && sel.part !== "body2")) return { doc: deck };
      const inc = c.id === "home.indentInc";
      const shift = (b: string) => (inc ? (/^\t{4}/.test(b) ? b : `\t${b}`) : b.replace(/^\t/, ""));
      setLines(slide, sel.part, lines(slide, sel.part).map((b, k) => (!sel.line || k === sel.line - 1 ? shift(b) : b)));
      return { doc: deck };
    }
    case "home.convertSmartArt":
      return applyPpt(deck, { kind: "dialog", id: "convertSmartArt", values: { graphic: sv || "Basic Block List" } }, ui);

    /* -------- drawing / objects -------- */
    case "insert.shape":
    case "insert.textBox":
    case "insert.icons":
    case "insert.3d":
    case "insert.wordArt": {
      const kind: PptObject["kind"] = c.id === "insert.shape" ? "shape" : c.id === "insert.icons" ? "icon" : "textbox";
      const o: PptObject =
        kind === "shape" ? { id: "", kind, label: sv || "Rectangle", shape: shapeKind(sv), x: 35, y: 35, w: 30, h: 25, fill: themeOf(deck).accent } :
        kind === "icon" ? { id: "", kind, label: sv || "Icon", glyph: "★", x: 44, y: 38, w: 12, h: 20, color: themeOf(deck).accent } :
        { id: "", kind: "textbox", label: c.id === "insert.wordArt" ? "WordArt" : "Text Box", text: c.id === "insert.wordArt" ? "Your text here" : "", x: 30, y: 40, w: 40, h: 14, props: c.id === "insert.wordArt" ? { size: 40, bold: true, color: themeOf(deck).accent } : undefined };
      return addObject(deck, { ...sel, part: undefined }, slide, o);
    }
    case "insert.table": {
      const m = /^(\d+)\s*x\s*(\d+)/i.exec(sv);
      return applyPpt(deck, { kind: "dialog", id: "insertTable", values: { cols: m ? Number(m[1]) : 3, rows: m ? Number(m[2]) : 3 } }, ui);
    }
    case "insert.onlinePictures":
    case "insert.screenshot":
      return applyPpt(deck, { kind: "dialog", id: "insertPicture", values: { file: sv || "Stock image" } }, ui);
    case "insert.slideNumber":
      deck.footer = { ...(deck.footer ?? {}), slideNumber: true };
      return { doc: deck };
    case "insert.dateTime":
      deck.footer = { ...(deck.footer ?? {}), date: true };
      return { doc: deck };
    case "shape.fill":
      // An icon is filled by its color (Graphics Fill); other objects by their fill.
      for (const o of sel.objs) {
        if (o.kind === "icon") o.color = sv === "No Fill" ? "transparent" : sv;
        else o.fill = sv === "No Fill" ? "transparent" : sv;
      }
      return { doc: deck };
    case "graphics.fill":
      for (const o of sel.objs) if (o.kind === "icon") o.color = sv === "No Fill" ? "transparent" : sv;
      return { doc: deck };
    case "graphics.outline":
      for (const o of sel.objs) {
        if (o.kind !== "icon") continue;
        if (/^Weight: /.test(sv)) ox(o).outlineWeight = parseFloat(sv.replace("Weight: ", "").replace("¼", "0.25").replace("½", "0.5")) || 1;
        else ox(o).fx = { ...(ox(o).fx ?? {}), border: sv === "No Outline" ? undefined : sv };
      }
      return { doc: deck };
    case "graphics.effects":
      for (const o of sel.objs) if (o.kind === "icon") { ox(o).effect = sv; ox(o).fx = { ...(ox(o).fx ?? {}), effects: sv }; }
      return { doc: deck };
    case "graphics.style":
      for (const o of sel.objs) {
        if (o.kind !== "icon" || !GRAPHIC_STYLES.includes(sv)) continue;
        const m = /Accent (\d)/.exec(sv);
        const accent = m ? ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47"][Number(m[1]) - 1] : "#000000";
        o.style = `graphics:${sv}`;
        if (/Outline/.test(sv) && !/Colored Fill/.test(sv)) { ox(o).fx = { ...(ox(o).fx ?? {}), border: accent }; o.color = "transparent"; }
        else { o.color = sv === "Black Outline, Colored Fill" ? themeOf(deck).accent : accent; ox(o).fx = { ...(ox(o).fx ?? {}), border: /Black Outline/.test(sv) ? "#000000" : undefined }; }
      }
      return { doc: deck };
    case "shape.outline":
      for (const o of sel.objs) {
        if (/^Weight: /.test(sv)) ox(o).outlineWeight = parseFloat(sv.replace("Weight: ", "").replace("¼", "0.25").replace("½", "0.5")) || 1;
        else if (sv === "No Outline") o.color = "transparent";
        else o.color = sv;
      }
      return { doc: deck };
    case "shape.change":
      for (const o of sel.objs) if (o.kind === "shape" || o.kind === "textbox") { o.kind = "shape"; o.label = sv; o.shape = shapeKind(sv); if (!o.fill) o.fill = themeOf(deck).accent; }
      return { doc: deck };
    case "shape.effects":
    case "picture.effects":
      for (const o of sel.objs) { ox(o).effect = sv; ox(o).fx = { ...(ox(o).fx ?? {}), effects: sv }; o.style = `${c.id.split(".")[1]}:${sv}`; }
      return { doc: deck };
    case "shape.style":
      for (const o of sel.objs) {
        o.style = `style:${sv}`;
        const m = /Accent (\d)/.exec(sv);
        o.fill = m ? ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47"][Number(m[1]) - 1] ?? themeOf(deck).accent : themeOf(deck).accent;
        if (/Intense/.test(sv)) ox(o).effect = "Shadow";
      }
      return { doc: deck };
    case "picture.style":
    case "picture.border":
    case "picture.corrections":
    case "picture.color":
    case "picture.artistic":
    case "video.style":
    case "video.border":
    case "video.effects":
    case "video.shape": {
      const key = c.id.split(".")[1] as "style" | "border" | "corrections" | "color" | "artistic" | "effects" | "shape";
      for (const o of sel.objs) {
        const fx = (ox(o).fx = { ...(ox(o).fx ?? {}) });
        if (key === "shape") fx.cropShape = sv;
        else (fx as Record<string, string>)[key] = sv;
        o.style = `${key}:${sv}`;
        if (c.id === "video.style") mediaOpts(o).style = sv;
      }
      return { doc: deck };
    }
    case "table.style":
    case "chart.style":
    case "chart.colors":
    case "smartart.style":
    case "smartart.colors":
      for (const o of sel.objs) {
        const key = c.id.split(".")[1] as "style" | "colors";
        const fx = (ox(o).fx = { ...(ox(o).fx ?? {}) });
        if (key === "colors") fx.color = sv;
        else fx.style = sv;
        o.style = `${key}:${sv}`;
      }
      return { doc: deck };
    case "smartart.layout":
    case "chart.type":
      for (const o of sel.objs) o.label = sv;
      return { doc: deck };
    case "picture.crop": for (const o of sel.objs) o.crop = !o.crop; return { doc: deck };
    case "picture.cropShape": for (const o of sel.objs) { ox(o).fx = { ...(ox(o).fx ?? {}), cropShape: sv }; } return { doc: deck };
    case "picture.aspect": for (const o of sel.objs) { ox(o).fx = { ...(ox(o).fx ?? {}), aspect: sv }; o.crop = true; } return { doc: deck };
    case "picture.fill":
    case "picture.fit":
      for (const o of sel.objs) o.crop = c.id === "picture.fill";
      return { doc: deck };
    case "picture.removeBackground": for (const o of sel.objs) { o.style = "removeBackground"; ox(o).fx = { ...(ox(o).fx ?? {}), artistic: "Background Removed" }; } return { doc: deck };
    case "picture.reset": for (const o of sel.objs) { o.style = undefined; ox(o).fx = undefined; o.crop = false; } return { doc: deck };
    case "object.bringForward":
    case "object.bringToFront":
    case "object.sendBackward":
    case "object.sendToBack": {
      const sc = scopeOf(deck, sel, slide);
      if (!sc || !sel.objs.length) return { doc: deck };
      restack(sc.list, new Set(sel.objs.map((o) => o.id)), c.id.split(".")[1] as "bringForward");
      return { doc: deck };
    }
    case "object.align": {
      if (sv === "Align to Slide" || sv === "Align Selected Objects") {
        flag({ alignTo: sv === "Align to Slide" ? "slide" : "selected" });
        return { doc: deck };
      }
      const objs = sel.objs;
      if (!objs.length) return { doc: deck };
      const relSlide = objs.length === 1 || deck.flags?.alignTo === "slide";
      const minX = relSlide ? 0 : Math.min(...objs.map((o) => o.x));
      const maxX = relSlide ? 100 : Math.max(...objs.map((o) => o.x + o.w));
      const minY = relSlide ? 0 : Math.min(...objs.map((o) => o.y));
      const maxY = relSlide ? 100 : Math.max(...objs.map((o) => o.y + o.h));
      for (const o of objs) {
        if (sv === "Align Left") o.x = minX;
        if (sv === "Align Center") o.x = (minX + maxX) / 2 - o.w / 2;
        if (sv === "Align Right") o.x = maxX - o.w;
        if (sv === "Align Top") o.y = minY;
        if (sv === "Align Middle") o.y = (minY + maxY) / 2 - o.h / 2;
        if (sv === "Align Bottom") o.y = maxY - o.h;
      }
      const spread = (axis: "x" | "y") => {
        const size = axis === "x" ? "w" : "h";
        const lo = axis === "x" ? minX : minY, hi = axis === "x" ? maxX : maxY;
        if (objs.length < (relSlide ? 2 : 3)) return;
        const sorted = objs.slice().sort((a, b) => a[axis] - b[axis]);
        const total = sorted.reduce((t, o) => t + o[size], 0);
        const gap = (hi - lo - total) / (sorted.length - 1);
        let p = lo;
        sorted.forEach((o) => { o[axis] = p; p += o[size] + gap; });
      };
      if (sv === "Distribute Horizontally") spread("x");
      if (sv === "Distribute Vertically") spread("y");
      return { doc: deck };
    }
    case "object.group": {
      if (sel.objs.length < 2) return { doc: deck };
      const g = `g-${sel.objs.map((o) => o.id).join("-")}`;
      for (const o of sel.objs) o.group = g;
      return { doc: deck };
    }
    case "object.ungroup": for (const o of sel.objs) o.group = null; return { doc: deck };
    case "object.rotate":
      for (const o of sel.objs) {
        if (sv === "Flip Horizontal") ox(o).flipH = !ox(o).flipH;
        else if (sv === "Flip Vertical") ox(o).flipV = !ox(o).flipV;
        else o.rotate = ((((o.rotate ?? 0) + (sv.includes("Left") ? -90 : 90)) % 360) + 360) % 360;
      }
      return { doc: deck };
    case "object.size":
    case "object.height":
      for (const o of sel.objs) {
        const n = parseFloat(sv);
        if (!n) continue;
        const keep = keepsAspect(o);
        if (c.id === "object.size") {
          const w = Math.min(98, inchesToPct(deck, n, "w"));
          if (keep) o.h = o.h * (w / o.w);
          o.w = w;
        } else {
          const h = Math.min(98, inchesToPct(deck, n, "h"));
          if (keep) o.w = o.w * (h / o.h);
          o.h = h;
        }
      }
      return { doc: deck };
    case "edit.delete": {
      // Delete with an Animation Pane item selected removes that effect, never the text or object.
      if (sel.anim) {
        if (!slide) return { doc: deck };
        const t = sel.anim === "title" || sel.anim === "body" ? sel.anim : slide.objects?.find((o) => o.id === sel.anim);
        if (t && getMetaRead(slide, t).name) {
          const before = animSequence(slide);
          const at = before.findIndex((a) => a.target === (typeof t === "string" ? t : t.id));
          removeAnim(slide, t);
          const after = animSequence(slide);
          const next = after[Math.min(Math.max(0, at), after.length - 1)];
          if (next) return { doc: deck, ui: { selection: animKey(next) } };
        }
        return { doc: deck };
      }
      if (sel.objs.length) {
        if (sel.cells?.length && sel.objs[0]?.kind === "table") {
          const t = sel.objs[0];
          for (const cell of sel.cells) { const [r, col] = cellRC(cell); if (t.rows?.[r - 1]) t.rows[r - 1][col - 1] = ""; }
          return { doc: deck };
        }
        const sc = scopeOf(deck, sel, slide);
        sc?.set(sc.list.filter((o) => !sel.objs.some((x) => x.id === o.id)));
        return { doc: deck, ui: { selection: sc?.prefix === slide?.id ? slide?.id ?? "" : sc?.prefix ?? "" } };
      }
      if (!slide) return { doc: deck };
      if (sel.part === "title") slide.title = "";
      else if (sel.part === "subtitle") slide.subtitle = "";
      else if (sel.part === "body" || sel.part === "body2") {
        if (sel.line) {
          setLines(slide, sel.part, lines(slide, sel.part).filter((_, k) => k !== sel.line! - 1));
          return { doc: deck, ui: { selection: `${slide.id}.${sel.part}` } };
        }
        setLines(slide, sel.part, []);
      } else if (sel.part === "notes") slide.notes = "";
      else if (sel.thumb) return applyPpt(deck, { kind: "command", id: "slides.delete" }, ui);
      return { doc: deck };
    }

    /* -------- design -------- */
    case "design.theme": deck.theme = sv; deck.variant = 1; flag({ themeColors: undefined, backgroundStyle: undefined }); return { doc: deck };
    case "design.variant": deck.variant = Number(sv) || 1; flag({ themeColors: undefined }); return { doc: deck };
    case "design.colors":
    case "master.colors":
      flag({ themeColors: sv });
      return { doc: deck };
    case "design.fonts":
    case "master.fonts": {
      const fs = FONT_SETS.find((f) => f.name === sv);
      if (fs) {
        const m = masterX(deck);
        m.titleFont = fs.heading;
        m.bodyFont = fs.body;
      }
      flag({ themeFonts: sv });
      return { doc: deck };
    }
    case "design.effects":
    case "master.effects":
      flag({ themeEffects: sv });
      return { doc: deck };
    case "design.backgroundStyle":
      deck.slides.forEach((s) => (s.background = undefined));
      flag({ backgroundStyle: sv });
      return { doc: deck };
    case "design.slideSize":
      deck.size = sv.includes("4:3") ? "4:3" : "16:9";
      return { doc: deck };
    case "design.idea":
      deck.variant = ((deck.variant ?? 1) % 4) + 1;
      if (slide) slide.background = undefined;
      flag({ designIdea: sv });
      deck.pane = null;
      return { doc: deck };
    case "design.designer": deck.pane = "Designer"; return { doc: deck };

    /* -------- transitions -------- */
    case "transition.apply":
      if (slide) {
        if ((slide.transition ?? null) !== (sv === "None" ? null : sv) && slide.transitionOptions?.effect) slide.transitionOptions = { ...slide.transitionOptions, effect: undefined };
        slide.transition = sv === "None" ? null : sv;
      }
      return { doc: deck };
    case "transition.applyAll": {
      const t = slide?.transition ?? null;
      const opts = slide?.transitionOptions;
      deck.slides.forEach((s) => { s.transition = t; s.transitionOptions = opts ? clone(opts) : opts; });
      return { doc: deck };
    }
    case "transition.effect":
      if (slide) slide.transitionOptions = { ...(slide.transitionOptions ?? {}), effect: sv };
      return { doc: deck };
    case "transition.duration":
      if (slide) slide.transitionOptions = { ...(slide.transitionOptions ?? {}), duration: parseTime(sv) || 1 };
      return { doc: deck };
    case "transition.advanceAfter":
      if (slide) slide.transitionOptions = { ...(slide.transitionOptions ?? {}), advanceAfter: parseTime(sv) || null };
      return { doc: deck };
    case "transition.onClick":
      if (slide) {
        const o = (sx(slide).transitionOptions = { ...(sx(slide).transitionOptions ?? {}) });
        o.onClick = o.onClick === false;
      }
      return { doc: deck };
    case "transition.sound":
      if (slide) sx(slide).transitionOptions = { ...(sx(slide).transitionOptions ?? {}), sound: sv };
      return { doc: deck };
    case "transition.preview":
      flag({ preview: Date.now() });
      return { doc: deck };

    /* -------- animations -------- */
    case "animation.apply":
    case "animation.add": {
      if (!slide) return { doc: deck };
      const none = sv === "None";
      for (const t of animTargets(sel)) {
        const was = getMeta(slide, t).name;
        const order = was ? undefined : maxOrder(slide) + 1;
        if (t === "title") {
          slide.titleAnimation = none ? null : sv;
          if (none) { sx(slide).titleAnim = undefined; sx(slide).titleOrder = undefined; }
          else if (order) sx(slide).titleOrder = order;
        } else if (t === "body") {
          slide.bodyAnimation = none ? null : sv;
          if (none) { sx(slide).bodyAnim = undefined; sx(slide).bodyOrder = undefined; }
          else if (order) sx(slide).bodyOrder = order;
        } else {
          t.animation = none ? null : sv;
          if (none) { t.animationOrder = undefined; ox(t).anim = undefined; }
          else if (order) t.animationOrder = order;
        }
      }
      renumber(slide, animSequence(slide));
      return { doc: deck };
    }
    case "animation.earlier":
    case "animation.later": {
      if (!slide) return { doc: deck };
      const list = animSequence(slide);
      const t = animTargets(sel)[0];
      const key = t === undefined ? "" : typeof t === "string" ? t : t.id;
      const i = list.findIndex((it) => it.target === key);
      const j = c.id === "animation.earlier" ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= list.length) return { doc: deck };
      [list[i], list[j]] = [list[j], list[i]];
      renumber(slide, list);
      return { doc: deck };
    }
    case "animation.start":
    case "animation.duration":
    case "animation.delay":
    case "animation.effect": {
      flag({ [c.id]: sv || true });
      if (!slide) return { doc: deck };
      for (const t of animTargets(sel)) {
        const { name, meta } = getMeta(slide, t);
        if (!name) continue;
        if (c.id === "animation.start") meta.start = (["On Click", "With Previous", "After Previous"].includes(sv) ? sv : "On Click") as AnimStart;
        if (c.id === "animation.duration") meta.duration = parseTime(sv) || 0.5;
        if (c.id === "animation.delay") meta.delay = parseTime(sv);
        if (c.id === "animation.effect") meta.effect = sv;
      }
      return { doc: deck };
    }
    case "animation.pane": deck.pane = deck.pane === "Animation Pane" ? null : "Animation Pane"; return { doc: deck };
    case "animation.remove": {
      if (!slide) return { doc: deck };
      for (const t of animTargets(sel)) if (getMetaRead(slide, t).name) removeAnim(slide, t);
      return { doc: deck };
    }
    case "animation.playFrom":
      flag({ preview: Date.now(), playFrom: sv || ui.selection });
      return { doc: deck };
    case "animation.painter": {
      if (!slide) return { doc: deck };
      const t = animTargets(sel)[0];
      if (!t) return { doc: deck };
      const { name, meta } = getMeta(slide, t);
      flag({ "animation.painter": true, animPainter: name ? JSON.stringify({ name, meta }) : "" });
      return { doc: deck };
    }
    case "animation.painter.apply": {
      const p = flagJson<{ name: string; meta: AnimMeta } | null>(deck, "animPainter", null);
      if (p && slide) {
        const after = applyPpt(deck, { kind: "command", id: "animation.apply", value: p.name }, ui).doc;
        const s2 = after.slides.find((s) => s.id === slide.id)!;
        for (const t of animTargets(parseSel(after, ui))) Object.assign(getMeta(s2, t).meta, p.meta);
        after.flags = { ...(after.flags ?? {}), animPainter: "" };
        return { doc: after };
      }
      return { doc: deck };
    }
    case "animation.trigger":
      flag({ [c.id]: sv || true });
      return { doc: deck };

    /* -------- slide show -------- */
    case "slideshow.fromBeginning": {
      // Set Up Show › Custom show: From Beginning plays that custom show.
      const setup = deck.flags?.showCustomSetup;
      if (typeof setup === "string" && setup && startCustomShow(deck, setup)) return { doc: deck };
      startShow(deck, firstShowSlide(deck), "beginning");
      return { doc: deck };
    }
    case "slideshow.custom":
      // The Custom Slide Show menu: "Custom Shows..." opens the dialog; a show's name plays it.
      if (sv && sv !== "Custom Shows..." && startCustomShow(deck, sv)) { flag({ pptDialog: "" }); return { doc: deck }; }
      flag({ pptDialog: "customShows" });
      return { doc: deck };
    case "slideshow.customShow":
      flag({ pptDialog: "" });
      startCustomShow(deck, sv || customShows(deck)[0]?.name || "");
      return { doc: deck };
    case "customShow.remove":
      flag({ customShows: JSON.stringify(customShows(deck).filter((cs) => cs.name !== sv)), customShowFocus: "" });
      return { doc: deck };
    case "customShow.copy": {
      const list = customShows(deck);
      const src = list.find((cs) => cs.name === sv);
      if (!src) return { doc: deck };
      let name = `Copy of ${src.name}`;
      let n = 2;
      while (list.some((cs) => cs.name === name)) name = `Copy (${n++}) of ${src.name}`;
      flag({ customShows: JSON.stringify([...list, { name, slides: src.slides.slice() }]), customShowFocus: name });
      return { doc: deck };
    }
    case "slideshow.fromCurrent":
      startShow(deck, slide?.id, "current");
      return { doc: deck };
    case "slideshow.presenterStart":
      startShow(deck, slide?.id, "current", { presenter: true });
      return { doc: deck };
    case "slideshow.rehearse":
      startShow(deck, firstShowSlide(deck), "beginning", { rehearsing: true, rehearsalTimes: "{}" });
      return { doc: deck };
    case "slideshow.end":
      endShow(deck);
      return { doc: deck };
    case "slideshow.next":
    case "slideshow.prev":
      if (deck.view !== "show") return { doc: deck };
      stepShow(deck, c.id === "slideshow.next" ? 1 : -1);
      return { doc: deck };
    case "slideshow.goto": {
      const n = Number(sv);
      const target = Number.isFinite(n) && n >= 1 ? deck.slides[n - 1] : deck.slides.find((s) => s.id === sv);
      if (target) flag({ showId: target.id, showEnd: false, showSeeAll: false, showScreen: "" });
      return { doc: deck };
    }
    case "slideshow.seeAll": flag({ showSeeAll: !deck.flags?.showSeeAll }); return { doc: deck };
    case "slideshow.pointer": flag({ showPointer: sv || "Arrow" }); return { doc: deck };
    case "slideshow.erase": flag({ inkErased: Number(deck.flags?.inkErased ?? 0) + 1, inked: false }); return { doc: deck };
    case "slideshow.ink": flag({ inked: true }); return { doc: deck };
    case "slideshow.screen": flag({ showScreen: deck.flags?.showScreen === sv ? "" : sv }); return { doc: deck };
    case "slideshow.showPresenter": flag({ presenter: !deck.flags?.presenter }); return { doc: deck };
    case "slideshow.recordTimings": {
      const prev = flagJson<Record<string, number>>(deck, "rehearsalTimes", {});
      const add = (() => { try { return JSON.parse(sv) as Record<string, number>; } catch { return {}; } })();
      flag({ rehearsalTimes: JSON.stringify({ ...prev, ...add }) });
      return { doc: deck };
    }
    case "slideshow.keepTimings": {
      const times = flagJson<Record<string, number>>(deck, "rehearsalTimes", {});
      if (sv === "Yes") {
        deck.slides.forEach((s) => {
          if (s.hidden) return;
          const t = Math.max(1, Math.round(times[s.id] ?? s.transitionOptions?.advanceAfter ?? 5));
          s.transitionOptions = { ...(s.transitionOptions ?? {}), advanceAfter: t };
        });
        flag({ advance: "Using timings, if present", timingsSaved: true });
      }
      deck.view = sv === "Yes" ? "sorter" : "normal";
      flag({ rehearsing: false, timingsPrompt: false, showEnd: false, presenter: false });
      return { doc: deck };
    }
    case "slideshow.presenterView":
      flag({ "slideshow.presenterView": !deck.flags?.["slideshow.presenterView"] });
      return { doc: deck };
    case "slideshow.record":
    case "slideshow.captions":
    case "slideshow.online":
      flag({ [c.id]: sv || true });
      return { doc: deck };

    /* -------- review -------- */
    case "review.spelling": {
      const s = deck.slides.find((x) => x.spell?.length);
      deck.pane = s ? "Spelling" : "Spelling: done";
      if (s) deck.active = s.id;
      return { doc: deck, ui: s ? { slide: s.id, selection: s.id } : undefined };
    }
    case "spelling.change":
    case "spelling.ignore":
    case "spelling.ignoreAll": {
      // A suggestion from the right-click menu names its word through the suggestion itself.
      const pool = [slide, ...deck.slides].filter(Boolean) as PptSlide[];
      let s: PptSlide | undefined;
      let wi = 0;
      if (c.id === "spelling.change" && sv) {
        for (const x of pool) {
          const k = (x.spell ?? []).findIndex((w) => w.suggestions.includes(sv));
          if (k >= 0) { s = x; wi = k; break; }
        }
      } else if (c.id !== "spelling.change" && sv) {
        for (const x of pool) {
          const k = (x.spell ?? []).findIndex((w) => w.word === sv);
          if (k >= 0) { s = x; wi = k; break; }
        }
      }
      if (!s) { s = deck.pane === "Spelling" ? deck.slides.find((x) => x.spell?.length) : slide?.spell?.length ? slide : deck.slides.find((x) => x.spell?.length); wi = 0; }
      if (s && s.spell?.length) {
        const w = s.spell[wi];
        if (c.id === "spelling.change") {
          const to = sv || w.suggestions[0] || w.word;
          const rep = (t?: string) => t?.split(w.word).join(to);
          s.title = rep(s.title);
          s.subtitle = rep(s.subtitle);
          s.body = s.body?.map((b) => rep(b)!);
          s.body2 = s.body2?.map((b) => rep(b)!);
          s.objects?.forEach((o) => (o.text = rep(o.text)));
        }
        s.spell = s.spell.filter((_, k) => k !== wi);
        if (c.id === "spelling.ignoreAll") deck.slides.forEach((x) => (x.spell = x.spell?.filter((y) => y.word !== w.word)));
      }
      if (deck.pane === "Spelling" || deck.pane === "Spelling: done") {
        const next = deck.slides.find((x) => x.spell?.length);
        deck.pane = next ? "Spelling" : "Spelling: done";
        if (next) deck.active = next.id;
        return { doc: deck, ui: next ? { slide: next.id, selection: next.id } : undefined };
      }
      return { doc: deck };
    }
    case "review.accessibility": deck.pane = "Accessibility"; return { doc: deck };
    case "review.thesaurus": {
      const text = sel.part === "title" ? slide?.title : sel.part === "subtitle" ? slide?.subtitle : sel.part === "body" || sel.part === "body2" ? (slide ? lines(slide, sel.part) : []).join(" ") : sel.objs[0]?.text;
      const word = (text ?? "").split(/[^A-Za-z']+/).find((w) => THESAURUS[w.toLowerCase()]);
      deck.pane = "Thesaurus";
      flag({ thesaurusWord: word ?? "", thesaurusTarget: word ? ui.selection : "" });
      return { doc: deck };
    }
    case "thesaurus.insert": {
      const word = String(deck.flags?.thesaurusWord ?? "");
      const target = String(deck.flags?.thesaurusTarget ?? "");
      if (!word || !sv) return { doc: deck };
      const [sid, part] = target.split(".");
      const s = deck.slides.find((x) => x.id === sid);
      const re = new RegExp(`\\b${escapeRe(word)}\\b`);
      const swap = (t?: string) => t?.replace(re, sv);
      if (s) {
        if (part === "title") s.title = swap(s.title);
        else if (part === "subtitle") s.subtitle = swap(s.subtitle);
        else if (part === "body") s.body = s.body?.map((b) => swap(b)!);
        else if (part === "body2") s.body2 = s.body2?.map((b) => swap(b)!);
        else { const o = s.objects?.find((x) => x.id === part); if (o) o.text = swap(o.text); }
      }
      flag({ thesaurusWord: THESAURUS[sv.toLowerCase()] ? sv : "", thesaurusInserted: sv });
      return { doc: deck };
    }
    case "review.smartLookup": deck.pane = "Search"; return { doc: deck };
    case "review.translate": deck.pane = "Translator"; return { doc: deck };
    case "review.showComments": deck.pane = deck.pane === "Comments" ? null : "Comments"; return { doc: deck };
    case "review.compare": flag({ compare: true }); return { doc: deck };
    case "review.deleteComment": {
      if (sv === "Delete All Comments in This Presentation") deck.slides.forEach((s) => (s.comments = []));
      else if (slide && sv === "Delete All Comments on This Slide") slide.comments = [];
      else if (slide) {
        const i = Math.min(Number(deck.flags?.commentFocus ?? 0), Math.max(0, (slide.comments ?? []).length - 1));
        slide.comments = (slide.comments ?? []).filter((_, k) => k !== i);
      }
      flag({ commentFocus: 0 });
      return { doc: deck };
    }
    case "comment.focus": flag({ commentFocus: Number(sv) || 0 }); return { doc: deck };
    case "comment.reply": {
      if (!slide || !sv.trim()) return { doc: deck };
      const list = (sx(slide).comments ?? []) as CommentX[];
      const i = Math.min(Number(deck.flags?.commentFocus ?? 0), list.length - 1);
      if (i >= 0) list[i] = { ...list[i], replies: [...(list[i].replies ?? []), { author: "BEOC Student", text: sv }] };
      deck.pane = "Comments";
      return { doc: deck };
    }
    case "comment.resolve": {
      if (!slide) return { doc: deck };
      const list = (sx(slide).comments ?? []) as CommentX[];
      const i = Math.min(Number(sv || deck.flags?.commentFocus || 0), list.length - 1);
      if (i >= 0) list[i] = { ...list[i], resolved: !list[i].resolved };
      return { doc: deck };
    }
    case "review.nextComment":
    case "review.prevComment": {
      const ids = deck.slides.filter((s) => s.comments?.length).map((s) => s.id);
      if (!ids.length) return { doc: deck };
      const cur = ids.indexOf(slide?.id ?? "");
      const nx = c.id === "review.nextComment" ? ids[(cur + 1) % ids.length] : ids[(cur - 1 + ids.length) % ids.length];
      deck.active = nx;
      deck.pane = "Comments";
      return { doc: deck, ui: { slide: nx, selection: nx } };
    }
    case "inspector.remove": {
      if (sv === "Comments") deck.slides.forEach((s) => (s.comments = []));
      if (sv === "Presentation Notes") deck.slides.forEach((s) => (s.notes = ""));
      if (sv === "Off-Slide Content") deck.slides.forEach((s) => (s.objects = s.objects?.filter((o) => o.x < 100 && o.y < 100 && o.x + o.w > 0 && o.y + o.h > 0)));
      flag({ [`removed:${sv}`]: true });
      return { doc: deck };
    }

    /* -------- view -------- */
    case "view.mode": {
      const map: Record<string, PptDeck["view"]> = { Normal: "normal", "Outline View": "outline", "Slide Sorter": "sorter", "Notes Page": "notes", "Reading View": "reading" };
      const wasMaster = deck.view === "master";
      deck.view = map[sv] ?? "normal";
      if (wasMaster) {
        const back = deck.slides.find((s) => s.id === deck.active) ?? deck.slides[0];
        return { doc: deck, ui: { slide: back.id, selection: back.id } };
      }
      return { doc: deck };
    }
    case "view.master": deck.view = "master"; return { doc: deck, ui: { slide: "master", selection: "master" } };
    case "master.close": {
      deck.view = "normal";
      const back = deck.slides.find((s) => s.id === deck.active) ?? deck.slides[0];
      return { doc: deck, ui: { slide: back.id, selection: back.id } };
    }
    case "master.insertLayout": {
      const m = masterX(deck);
      const list = m.customLayouts ?? [];
      let name = "Custom Layout";
      let n = 1;
      while (list.includes(name)) name = `${n++}_Custom Layout`;
      m.customLayouts = [...list, name];
      return { doc: deck, ui: { slide: `layout:${name}`, selection: `layout:${name}` } };
    }
    case "master.hideBackground": {
      const layout = sel.layout;
      if (!layout) return { doc: deck };
      const m = masterX(deck);
      const list = m.hideOn ?? [];
      m.hideOn = list.includes(layout) ? list.filter((x) => x !== layout) : [...list, layout];
      return { doc: deck };
    }
    case "master.insertMaster":
    case "master.preserve":
    case "master.delete":
      flag({ [c.id]: true });
      return { doc: deck };
    case "view.notes": flag({ hideNotes: !deck.flags?.hideNotes }); return { doc: deck };
    case "view.ruler":
    case "view.gridlines":
    case "view.guides":
      flag({ [c.id]: !deck.flags?.[c.id] });
      return { doc: deck };
    case "view.zoom": flag({ zoom: Number(String(sv).replace("%", "")) || 100 }); return { doc: deck };
    case "view.fit": flag({ zoom: 100 }); return { doc: deck };
    case "view.handoutMaster":
    case "view.notesMaster":
    case "view.grayscale":
    case "view.newWindow":
    case "view.arrangeAll":
    case "view.macros":
    case "help.help":
    case "home.dictate":
    case "home.find":
      flag({ [c.id]: sv || true });
      if (c.id === "help.help") deck.pane = "Help";
      if (c.id === "home.find") deck.pane = "Find";
      return { doc: deck };

    /* -------- media (Playback, Video Format) -------- */
    case "media.play": flag({ mediaPlaying: deck.flags?.mediaPlaying === ui.selection ? "" : ui.selection }); return { doc: deck };
    case "media.seek":
      for (const o of sel.objs) if (o.kind === "video" || o.kind === "audio") mediaOpts(o).position = Math.max(0, Math.min(mediaLength(o), Number(sv) || 0));
      return { doc: deck };
    case "media.start":
      for (const o of sel.objs) if (o.kind === "video" || o.kind === "audio") mediaOpts(o).start = sv || "In Click Sequence";
      return { doc: deck };
    case "media.loop":
    case "media.hide":
    case "media.rewind":
    case "media.playAcross":
    case "media.fullScreen": {
      const k = c.id.split(".")[1] as "loop" | "hide" | "rewind" | "playAcross" | "fullScreen";
      for (const o of sel.objs) if (o.kind === "video" || o.kind === "audio") { const m = mediaOpts(o); m[k] = !m[k]; }
      return { doc: deck };
    }
    case "media.volume":
      for (const o of sel.objs) if (o.kind === "video" || o.kind === "audio") mediaOpts(o).volume = sv;
      return { doc: deck };
    case "media.fadeIn":
    case "media.fadeOut":
      for (const o of sel.objs) if (o.kind === "video" || o.kind === "audio") mediaOpts(o)[c.id === "media.fadeIn" ? "fadeIn" : "fadeOut"] = parseTime(sv);
      return { doc: deck };
    case "media.playInBackground":
      for (const o of sel.objs) if (o.kind === "audio") Object.assign(mediaOpts(o), { start: "Automatically", playAcross: true, loop: true, hide: true });
      return { doc: deck };
    case "media.noStyle":
      for (const o of sel.objs) if (o.kind === "audio") Object.assign(mediaOpts(o), { start: "In Click Sequence", playAcross: false, loop: false, hide: false });
      return { doc: deck };
    case "media.bookmark":
    case "media.trim":
      flag({ [c.id]: sv || true });
      return { doc: deck };
    case "video.posterFrame":
      for (const o of sel.objs) if (o.kind === "video") mediaOpts(o).poster = sv === "Reset" ? null : sv === "Current Frame" ? mediaOpts(o).position ?? 0 : "Image from File";
      return { doc: deck };

    /* -------- tables -------- */
    case "table.headerRow":
    case "table.totalRow":
    case "table.bandedRows":
    case "table.firstColumn":
    case "table.lastColumn":
    case "table.bandedColumns": {
      const k = c.id.split(".")[1] as keyof TableOpts;
      const defOn = k === "headerRow" || k === "bandedRows";
      for (const o of sel.objs) if (o.kind === "table") { const t = tableOpts(o) as Record<string, unknown>; t[k] = !(t[k] ?? defOn); }
      return { doc: deck };
    }
    case "table.insertAbove":
    case "table.insertBelow":
    case "table.insertLeft":
    case "table.insertRight": {
      const t = sel.objs.find((o) => o.kind === "table");
      if (!t || !t.rows) return { doc: deck };
      const [r, col] = cellRC(sel.cells?.[0] ?? `r${t.rows.length}c${t.rows[0]?.length ?? 1}`);
      const cols = t.rows[0]?.length ?? 1;
      if (c.id === "table.insertAbove" || c.id === "table.insertBelow") {
        const at = c.id === "table.insertAbove" ? r - 1 : r;
        t.rows.splice(at, 0, Array.from({ length: cols }, () => ""));
        t.h = Math.min(90 - t.y, t.h + t.h / Math.max(1, t.rows.length - 1));
        return { doc: deck, ui: { selection: `${slide?.id}.${t.id}.r${at + 1}c${col}` } };
      }
      const at = c.id === "table.insertLeft" ? col - 1 : col;
      t.rows.forEach((row) => row.splice(at, 0, ""));
      return { doc: deck, ui: { selection: `${slide?.id}.${t.id}.r${r}c${at + 1}` } };
    }
    case "table.delete": {
      const t = sel.objs.find((o) => o.kind === "table");
      if (!t || !t.rows || !slide) return { doc: deck };
      const [r, col] = cellRC(sel.cells?.[0] ?? "r1c1");
      if (sv === "Delete Table" || (sv === "Delete Rows" && t.rows.length <= 1) || (sv === "Delete Columns" && (t.rows[0]?.length ?? 0) <= 1)) {
        slide.objects = slide.objects?.filter((o) => o.id !== t.id);
        return { doc: deck, ui: { selection: slide.id } };
      }
      if (sv === "Delete Rows") {
        const rs = new Set((sel.cells ?? [`r${r}c1`]).map((x) => cellRC(x)[0]));
        t.rows = t.rows.filter((_, k) => !rs.has(k + 1));
      }
      if (sv === "Delete Columns") {
        const cs = new Set((sel.cells ?? [`r1c${col}`]).map((x) => cellRC(x)[1]));
        t.rows = t.rows.map((row) => row.filter((_, k) => !cs.has(k + 1)));
      }
      return { doc: deck, ui: { selection: `${slide.id}.${t.id}.r1c1` } };
    }
    case "table.merge": {
      const t = sel.objs.find((o) => o.kind === "table");
      if (!t || !t.rows || !sel.cells || sel.cells.length < 2) return { doc: deck };
      const rc = sel.cells.map(cellRC);
      const r1 = Math.min(...rc.map((x) => x[0])), r2 = Math.max(...rc.map((x) => x[0]));
      const c1 = Math.min(...rc.map((x) => x[1])), c2 = Math.max(...rc.map((x) => x[1]));
      const texts: string[] = [];
      for (let r = r1; r <= r2; r++) for (let k = c1; k <= c2; k++) { const v2 = t.rows[r - 1]?.[k - 1]; if (v2) texts.push(v2); if (r !== r1 || k !== c1) t.rows[r - 1][k - 1] = ""; }
      t.rows[r1 - 1][c1 - 1] = texts.join(" ");
      const opts = tableOpts(t);
      opts.merges = [...(opts.merges ?? []).filter((m) => !m.startsWith(`r${r1}c${c1}:`)), `r${r1}c${c1}:r${r2}c${c2}`];
      return { doc: deck, ui: { selection: `${slide?.id}.${t.id}.r${r1}c${c1}` } };
    }
    case "table.split": {
      const t = sel.objs.find((o) => o.kind === "table");
      if (!t) return { doc: deck };
      const opts = tableOpts(t);
      const cell = sel.cells?.[0] ?? "";
      opts.merges = (opts.merges ?? []).filter((m) => !m.startsWith(`${cell}:`));
      return { doc: deck };
    }
    case "table.distributeRows":
    case "table.distributeColumns":
      for (const o of sel.objs) if (o.kind === "table") tableOpts(o).distributed = true;
      return { doc: deck };
    case "table.align":
      for (const o of sel.objs) if (o.kind === "table") {
        const opts = tableOpts(o);
        const a = ({ "Align Left": "left", Center: "center", "Align Right": "right" } as Record<string, string>)[sv] ?? "left";
        const cells = sel.cells ?? (o.rows ?? []).flatMap((row, r) => row.map((_, k) => `r${r + 1}c${k + 1}`));
        opts.align = { ...(opts.align ?? {}), ...Object.fromEntries(cells.map((x) => [x, a])) };
      }
      return { doc: deck };
    case "table.valign":
      for (const o of sel.objs) if (o.kind === "table") tableOpts(o).valign = sv;
      return { doc: deck };
    case "table.tabRow": {
      const t = sel.objs.find((o) => o.kind === "table");
      if (!t || !t.rows || !slide) return { doc: deck };
      t.rows.push(Array.from({ length: t.rows[0]?.length ?? 1 }, () => ""));
      t.h = Math.min(92 - t.y, t.h + t.h / Math.max(1, t.rows.length - 1));
      return { doc: deck, ui: { selection: `${slide.id}.${t.id}.r${t.rows.length}c1` } };
    }

    /* -------- charts -------- */
    case "chart.addElement":
      for (const o of sel.objs) {
        if (o.kind !== "chart") continue;
        const ch = (ox(o).chart = { ...(ox(o).chart ?? {}) });
        const [el, opt] = sv.split(": ");
        if (el === "Chart Title") ch.showTitle = opt ? opt !== "None" : true;
        if (el === "Data Labels") ch.dataLabels = !opt ? "Outside End" : opt === "None" ? null : opt;
        if (el === "Legend") ch.legend = !opt ? "Right" : opt === "None" ? null : opt;
        if (el === "Gridlines") ch.gridlines = opt ? opt !== "None" : !ch.gridlines;
        if (el === "Axis Titles") ch.axisTitles = opt ? opt !== "None" : !ch.axisTitles;
      }
      return { doc: deck };
    case "chart.quickLayout":
      for (const o of sel.objs) {
        if (o.kind !== "chart") continue;
        const n = Number(sv.replace(/\D/g, "")) || 1;
        ox(o).chart = { ...(ox(o).chart ?? {}), layout: sv, showTitle: n !== 4, legend: n === 1 ? "Right" : n === 2 || n === 4 ? "Bottom" : n === 3 ? "Top" : null, dataLabels: n === 2 || n === 4 || n === 5 ? "Outside End" : null, gridlines: n !== 2 };
      }
      return { doc: deck };
    case "chart.editData":
      if (sel.objs[0]?.kind === "chart") {
        flag({ chartData: ui.selection.split(",")[0] });
        deck.pane = "Chart Data";
      }
      return { doc: deck };
    case "chart.refresh":
      // Refresh Data reads a linked chart's workbook again.
      for (const o of sel.objs) if (o.kind === "chart") updateLink(deck, o);
      flag({ [c.id]: true });
      return { doc: deck };
    case "chart.switchRowColumn":
    case "chart.selectData":
      flag({ [c.id]: true });
      return { doc: deck };

    /* -------- SmartArt -------- */
    case "smartart.addShape":
      for (const o of sel.objs) if (o.kind === "smartart") {
        const items = o.items ?? [];
        o.items = sv === "Add Shape Before" || sv === "Add Shape Above" ? ["[Text]", ...items] : [...items, "[Text]"];
      }
      return { doc: deck };
    case "smartart.textPane": deck.pane = deck.pane === "Text Pane" ? null : "Text Pane"; return { doc: deck };
    case "smartart.rightToLeft":
      for (const o of sel.objs) if (o.kind === "smartart") o.items = (o.items ?? []).slice().reverse();
      return { doc: deck };
    case "smartart.promote":
    case "smartart.demote":
    case "smartart.moveUp":
    case "smartart.moveDown":
      flag({ [c.id]: true });
      return { doc: deck };
    case "smartart.reset":
      for (const o of sel.objs) if (o.kind === "smartart") { ox(o).fx = undefined; o.style = o.label; }
      return { doc: deck };
    case "smartart.convert": {
      const o = sel.objs.find((x) => x.kind === "smartart");
      if (!o || !slide) return { doc: deck };
      if (sv === "Convert to Text") {
        slide.body = (o.items ?? []).slice();
        slide.objects = slide.objects?.filter((x) => x.id !== o.id);
        return { doc: deck, ui: { selection: `${slide.id}.body` } };
      }
      if (sv === "Convert to Shapes") {
        const items = o.items ?? [];
        const w = o.w / Math.max(1, items.length);
        slide.objects = [...(slide.objects ?? []).filter((x) => x.id !== o.id), ...items.map((t, k) => ({ id: "", kind: "shape" as const, label: "Rectangle: Rounded Corners", shape: "rounded" as const, text: t, x: o.x + k * w + 1, y: o.y + o.h / 3, w: w - 2, h: o.h / 3, fill: themeOf(deck).accent }))];
        let n = 1;
        for (const x of slide.objects) if (!x.id) { while (slide.objects.some((y) => y.id === `o${n}`)) n++; x.id = `o${n}`; }
      }
      return { doc: deck };
    }

    /* -------- misc insert -------- */
    case "insert.photoAlbum":
    case "insert.cameo":
    case "insert.action":
    case "insert.equation":
    case "insert.symbol":
    case "insert.object":
    case "insert.screenRecording":
    case "insert.video":
    case "insert.audio":
      flag({ [c.id]: sv || true });
      return { doc: deck };
  }
  return { doc: deck };
}

/* ------------------------------------------------------------------ */

export function pptRibbonState(deck: PptDeck, ui: SimUi): Record<string, SimValue | undefined> {
  const p = firstProps(deck, ui);
  const s = parseSel(deck, ui);
  const slide = s.slide ?? activeSlide(deck, ui);
  const theme = themeOf(deck);
  const o = s.objs[0];
  const media = o && (o.kind === "video" || o.kind === "audio") ? ox(o).media ?? {} : {};
  const table = o && o.kind === "table" ? ox(o).table ?? {} : {};
  const anim = slide ? animTargets(s).map((t) => getMetaRead(slide, t))[0] : undefined;
  const bp = (slide?.bodyProps ?? {}) as ReturnType<typeof bodyX>;
  const m = readMaster(deck);
  return {
    "home.fontName": p.font ?? (s.part === "title" || s.master === "title" ? m.titleFont ?? theme.titleFont : m.bodyFont ?? theme.font),
    "home.fontSize": p.size ?? defaultSize(s.part, slide?.layout ?? ""),
    "home.bold": Boolean(p.bold),
    "home.italic": Boolean(p.italic),
    "home.underline": Boolean(p.underline),
    "home.strike": Boolean(p.strike),
    "home.shadow": Boolean((p as { shadow?: boolean }).shadow),
    "home.alignLeft": (p.align ?? "left") === "left",
    "home.alignCenter": p.align === "center",
    "home.alignRight": p.align === "right",
    "home.justify": p.align === "justify",
    "home.bullets": s.part === "body" || s.part === "body2" ? bp.bullets !== false && !bp.numbered : false,
    "home.numbering": Boolean(bp.numbered),
    "transition.apply": slide?.transition ?? "None",
    "animation.apply": o?.animation ?? (s.part === "title" ? slide?.titleAnimation : s.part === "body" || s.part === "subtitle" ? slide?.bodyAnimation : undefined) ?? "None",
    "design.theme": deck.theme ?? "Office Theme",
    "design.variant": String(deck.variant ?? 1),
    "slideshow.hideSlide": Boolean(slide?.hidden),
    "slideshow.presenterView": Boolean(deck.flags?.["slideshow.presenterView"]),
    "view.ruler": Boolean(deck.flags?.["view.ruler"]),
    "view.gridlines": Boolean(deck.flags?.["view.gridlines"]),
    "view.guides": Boolean(deck.flags?.["view.guides"]),
    "view.notes": !deck.flags?.hideNotes,
    "view.normal": (deck.view ?? "normal") === "normal",
    "view.outline": deck.view === "outline",
    "view.sorter": deck.view === "sorter",
    "view.notesPage": deck.view === "notes",
    "view.reading": deck.view === "reading",
    "view.selectionPane": deck.pane === "Selection",
    "transition.duration": (slide?.transitionOptions?.duration ?? 1).toFixed(2).padStart(5, "0"),
    "transition.sound": (slide ? sx(slide).transitionOptions?.sound : undefined) ?? "[No Sound]",
    "transition.advanceAfter": slide?.transitionOptions?.advanceAfter ? `${String(Math.floor(slide.transitionOptions.advanceAfter / 60)).padStart(2, "0")}:${(slide.transitionOptions.advanceAfter % 60).toFixed(2).padStart(5, "0")}` : "00:00.00",
    "transition.onClick": (slide ? sx(slide).transitionOptions?.onClick : undefined) !== false,
    "animation.start": anim?.name ? anim.meta.start ?? "On Click" : "",
    "animation.duration": anim?.name ? (anim.meta.duration ?? 0.5).toFixed(2).padStart(5, "0") : "",
    "animation.delay": anim?.name ? (anim.meta.delay ?? 0).toFixed(2).padStart(5, "0") : "",
    "animation.pane": deck.pane === "Animation Pane",
    "animation.painter": Boolean(deck.flags?.animPainter),
    "review.showComments": deck.pane === "Comments",
    "smartart.textPane": deck.pane === "Text Pane",
    "media.start": media.start ?? (o?.kind === "video" || o?.kind === "audio" ? "In Click Sequence" : ""),
    "media.loop": Boolean(media.loop),
    "media.hide": Boolean(media.hide),
    "media.rewind": Boolean(media.rewind),
    "media.playAcross": Boolean(media.playAcross),
    "media.fullScreen": Boolean(media.fullScreen),
    "media.fadeIn": (media.fadeIn ?? 0).toFixed(2).padStart(5, "0"),
    "media.fadeOut": (media.fadeOut ?? 0).toFixed(2).padStart(5, "0"),
    "table.headerRow": table.headerRow ?? true,
    "table.totalRow": Boolean(table.totalRow),
    "table.bandedRows": table.bandedRows ?? true,
    "table.firstColumn": Boolean(table.firstColumn),
    "table.lastColumn": Boolean(table.lastColumn),
    "table.bandedColumns": Boolean(table.bandedColumns),
    "master.hideBackground": Boolean(s.layout && m.hideOn?.includes(s.layout)),
    "object.size": o ? (o.w / inchesToPct(deck, 1, "w")).toFixed(2).replace(/\.?0+$/, "") + '"' : "",
    "object.height": o ? (o.h / inchesToPct(deck, 1, "h")).toFixed(2).replace(/\.?0+$/, "") + '"' : "",
  };
}

function getMetaRead(slide: PptSlide, t: "title" | "body" | PptObject): { name?: string | null; meta: AnimMeta } {
  const s = sx(slide);
  if (t === "title") return { name: slide.titleAnimation, meta: s.titleAnim ?? {} };
  if (t === "body") return { name: slide.bodyAnimation, meta: s.bodyAnim ?? {} };
  return { name: t.animation, meta: ox(t).anim ?? {} };
}

export function pptContextual(deck: PptDeck, ui: SimUi): string[] {
  const s = parseSel(deck, ui);
  const out: string[] = deck.view === "master" ? ["master"] : [];
  if (!s.objs.length) {
    if (deck.view !== "master" && (s.part === "body" || s.part === "body2" || s.part === "title" || s.part === "subtitle")) out.push("shape");
    return out;
  }
  for (const o of s.objs) {
    // An Excel object from Paste Special is an embedded object, not a native chart or table: Shape Format only.
    const k = ox(o).ole ? "shape" : o.kind === "image" ? "picture" : o.kind === "table" ? "table" : o.kind === "chart" ? "chart" : o.kind === "smartart" ? "smartart" : o.kind === "video" ? "video" : o.kind === "audio" ? "audio" : o.kind === "icon" ? "graphics" : "shape";
    if (!out.includes(k)) out.push(k);
  }
  return out;
}

export function pptDialogDefaults(deck: PptDeck, ui: SimUi, id: string): Record<string, SimValue> {
  const slide = activeSlide(deck, ui);
  const sel = parseSel(deck, ui);
  const o = sel.objs[0];
  switch (id) {
    case "headerFooter":
      return { slideNumber: Boolean(deck.footer?.slideNumber), date: Boolean(deck.footer?.date), footer: Boolean(deck.footer?.text), footerText: deck.footer?.text ?? "", dontShowOnTitle: Boolean(deck.flags?.dontShowOnTitle) };
    case "formatBackground":
      return { color: slide?.background ?? themeOf(deck).bg.toUpperCase(), applyToAll: false, hideGraphics: Boolean(slide && sx(slide).hideGraphics) };
    case "altText":
      return { text: o?.alt ?? "", decorative: Boolean(o && ox(o).decorative) };
    case "paragraph": {
      const p = firstProps(deck, ui);
      const bp = (slide?.bodyProps ?? {}) as ReturnType<typeof bodyX>;
      const ls = bp.lineSpacing ?? 1;
      return {
        alignment: ({ left: "Left", center: "Centered", right: "Right", justify: "Justified" } as Record<string, string>)[p.align ?? "left"] ?? "Left",
        indentBefore: bp.indent ?? 0,
        special: bp.hanging ? (bp.hanging > 0 ? "Hanging" : "First line") : "(none)",
        by: Math.abs(bp.hanging ?? 0),
        before: bp.spaceBefore ?? 0,
        after: bp.spaceAfter ?? 0,
        lineSpacing: ls === 1 ? "Single" : ls === 1.5 ? "1.5 lines" : ls === 2 ? "Double" : "Multiple",
        at: ls,
      };
    }
    case "font": {
      const p = firstProps(deck, ui);
      const st = pptRibbonState(deck, ui);
      const mm = readMaster(deck);
      const color = sel.master === "title" ? mm.titleColor : sel.master === "body" ? mm.bodyColor : p.color;
      return { font: String(st["home.fontName"] ?? "Aptos"), size: String(st["home.fontSize"] ?? 18), style: p.bold && p.italic ? "Bold Italic" : p.bold ? "Bold" : p.italic ? "Italic" : "Regular", color: color ? color.toUpperCase() : "Automatic", underline: p.underline ? "Single" : "(none)", strike: Boolean(p.strike) };
    }
    case "bullets": {
      const bp = (slide?.bodyProps ?? {}) as ReturnType<typeof bodyX>;
      return { style: bp.bullets === false && !bp.numbered ? "None" : bp.bulletStyle ?? "Filled Round Bullets", size: bp.bulletSize ?? 100, color: bp.bulletColor ?? "Automatic" };
    }
    case "numbering": {
      const bp = (slide?.bodyProps ?? {}) as ReturnType<typeof bodyX>;
      return { style: bp.numbered ? bp.numberFormat ?? "1. 2. 3." : "1. 2. 3.", size: bp.bulletSize ?? 100, color: bp.bulletColor ?? "Automatic", startAt: bp.startAt ?? 1 };
    }
    case "renameSection":
    case "addSection":
      return { name: id === "renameSection" ? slide?.section ?? "Untitled Section" : "Untitled Section" };
    case "renameLayout":
      return { name: sel.layout ? layoutName(deck, sel.layout) : "" };
    case "zoom":
      return { percent: Number(deck.flags?.zoom ?? 100), preset: "Fit" };
    case "setupShow": {
      const range = String(deck.flags?.showRange ?? "");
      return {
        showType: String(deck.flags?.showType || "Presented by a speaker (full screen)"),
        loop: Boolean(deck.flags?.loop),
        noNarration: Boolean(deck.flags?.noNarration),
        noAnimation: Boolean(deck.flags?.noAnimation),
        showSlides: deck.flags?.showCustomSetup ? "Custom show:" : range ? "From:" : "All",
        from: range ? Number(range.split("-")[0]) : 1,
        to: range ? Number(range.split("-")[1]) : deck.slides.length,
        customShow: String(deck.flags?.showCustomSetup || customShows(deck)[0]?.name || ""),
        advance: String(deck.flags?.advance || "Using timings, if present"),
        presenterView: Boolean(deck.flags?.["slideshow.presenterView"]),
      };
    }
    case "trimAudio":
    case "trimVideo": {
      const m = o ? ox(o).media ?? {} : {};
      const len = o ? mediaLength(o) : 0;
      return { start: m.trimStart ?? 0, end: m.trimEnd ?? len };
    }
    case "customizeFonts": {
      const th = themeOf(deck);
      const mm = readMaster(deck);
      return { heading: mm.titleFont ?? th.titleFont, body: mm.bodyFont ?? th.font, name: "Custom 1" };
    }
    case "customizeColors":
      return { accent1: themeOf(deck).accent.toUpperCase(), name: "Custom 1" };
    case "compressPictures":
      return { applyOnly: true, deleteCropped: true, resolution: "Use default resolution" };
    case "rotation": {
      const inch = (v: number) => Math.round(v * 100) / 100;
      return o
        ? { degrees: o.rotate ?? 0, height: inch(o.h / inchesToPct(deck, 1, "h")), width: inch(o.w / inchesToPct(deck, 1, "w")), lockAspect: keepsAspect(o) }
        : { degrees: 0 };
    }
    case "pasteSpecial":
      return { mode: "Paste", as: pasteSpecialInfo(deck).paste[0] ?? "" };
    case "officeClipboard": {
      const h = clipHistory(deck);
      return { item: h[0] ? clipLabel(h[0]) : "" };
    }
    case "animEffect":
    case "animTiming": {
      const t = slide ? animTargets(sel)[0] : undefined;
      const meta = slide && t ? getMetaRead(slide, t).meta : {};
      return {
        direction: meta.effect ?? "From Bottom",
        sound: meta.sound ?? "[No Sound]",
        after: meta.after ?? "Don't Dim",
        groupText: meta.sequence ?? "By 1st Level Paragraphs",
        start: meta.start ?? "On Click",
        delay: meta.delay ?? 0,
        duration: meta.duration ?? 0.5,
        repeat: meta.repeat ?? "(none)",
      };
    }
    case "changeGraphic":
      return { icon: o?.kind === "icon" ? o.label ?? "" : "" };
    case "link":
      return { text: o?.text ?? (sel.part === "title" ? slide?.title ?? "" : ""), address: "" };
    case "changeChartType":
      return { type: o?.label ?? "Clustered Column" };
  }
  return {};
}

/**
 * What Paste Special offers for the clipboard's content: the Source line, the Paste formats and
 * the Paste link formats (empty when the content cannot be linked).
 */
export function pasteSpecialInfo(deck: PptDeck): { source: string; paste: string[]; link: string[] } {
  const clip = readClip(deck);
  if (!clip) return { source: "The Clipboard is empty.", paste: [], link: [] };
  const src = clip.source;
  const where = src?.file ? `${src.path ? `${src.path} › ` : ""}${src.file}${src.item ? `!${src.item}` : ""}` : "";
  const pics = ["Picture (PNG)", "Picture (Enhanced Metafile)", "Picture (GIF)", "Picture (JPEG)"];
  if (clip.kind === "text") return { source: `Source: ${src?.app === "Word" ? "Microsoft Word Document" : src?.app === "Excel" ? "Microsoft Excel Worksheet" : "Microsoft PowerPoint"}${where ? `  ${where}` : ""}`, paste: ["HTML Format", "Formatted Text (RTF)", "Unformatted Text", "Picture (Enhanced Metafile)", "Picture (PNG)"], link: [] };
  if (clip.kind === "slide") return { source: "Source: Microsoft PowerPoint Slide", paste: ["Microsoft PowerPoint Slide Object", ...pics], link: [] };
  const first = clip.objs[0];
  if (src?.app === "Excel" && first?.kind === "chart") return { source: `Source: Microsoft Excel Chart  ${where}`, paste: ["Microsoft Excel Chart Object", ...pics, "Microsoft Office Graphic Object"], link: src.file ? ["Microsoft Excel Chart Object"] : [] };
  if (src?.app === "Excel" && first?.kind === "table") return { source: `Source: Microsoft Excel Worksheet  ${where}`, paste: ["Microsoft Excel Worksheet Object", "HTML Format", "Formatted Text (RTF)", "Unformatted Text", ...pics, "Bitmap"], link: src.file ? ["Microsoft Excel Worksheet Object"] : [] };
  return { source: `Source: ${src?.app ? `Microsoft ${src.app}` : "Microsoft PowerPoint"}${where ? `  ${where}` : ""}`, paste: ["Microsoft Office Graphic Object", ...pics], link: [] };
}

/** Every text string on a slide, for search and accessibility. */
export function slideText(s: PptSlide): string {
  return [s.title, s.subtitle, ...(s.body ?? []), ...(s.body2 ?? []), ...(s.objects ?? []).map((o) => o.text ?? "")].filter(Boolean).join(" ");
}

export { MEDIA_SECONDS };
