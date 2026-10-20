import type { PptDeck, PptObject, PptSlide, SimCommit, SimValue, TextProps } from "@/types/sim";
import type { SimUi } from "../../types";
import { applyCommonCommit } from "@/lib/sim/common";
import { clone } from "@/lib/sim/ops";

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
  const t = PPT_THEMES[deck.theme ?? "Office Theme"] ?? PPT_THEMES["Office Theme"];
  const v = deck.variant ?? 1;
  if (v <= 1) return t;
  const accent = VARIANT_ACCENTS[v] ?? t.accent;
  return { ...t, accent, band: t.band ? { ...t.band, color: accent } : { side: "bottom", color: accent, size: 4 } };
}

export const LAYOUTS = ["Title Slide", "Title and Content", "Section Header", "Two Content", "Comparison", "Title Only", "Blank", "Content with Caption", "Picture with Caption"];

export const TRANSITIONS = ["None", "Morph", "Fade", "Push", "Wipe", "Split", "Reveal", "Cut", "Random Bars", "Shape", "Uncover", "Cover", "Flash", "Fall Over", "Curtains", "Wind", "Prestige", "Fracture", "Page Curl", "Airplane", "Origami", "Dissolve", "Checkerboard", "Blinds", "Clock", "Ripple", "Honeycomb", "Glitter", "Vortex", "Shred", "Switch", "Flip", "Gallery", "Cube", "Doors", "Box", "Comb", "Zoom", "Random"];
export const ANIMATIONS = ["None", "Appear", "Fade", "Fly In", "Float In", "Split", "Wipe", "Shape", "Wheel", "Random Bars", "Grow & Turn", "Zoom", "Swivel", "Bounce"];
export const EMPHASIS = ["Pulse", "Color Pulse", "Teeter", "Spin", "Grow/Shrink", "Desaturate", "Darken", "Lighten", "Transparency"];
export const EXITS = ["Disappear", "Fade Out", "Fly Out", "Float Out", "Split Out", "Wipe Out", "Zoom Out"];

/* ------------------------------------------------------------------ */
/* Selection                                                           */
/* ------------------------------------------------------------------ */

export interface PptSel {
  slide?: PptSlide;
  part?: "title" | "subtitle" | "body" | "body2" | "notes";
  objs: PptObject[];
  master?: "title" | "body";
  thumb: boolean;
}

export function activeSlide(deck: PptDeck, ui: SimUi): PptSlide | undefined {
  return deck.slides.find((s) => s.id === (ui.slide ?? deck.active)) ?? deck.slides[0];
}

export function parseSel(deck: PptDeck, ui: SimUi): PptSel {
  const sel = ui.selection ?? "";
  if (sel.startsWith("master.")) return { master: sel.slice(7) as "title" | "body", objs: [], thumb: false };
  const parts = sel.split(",").map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return { slide: activeSlide(deck, ui), objs: [], thumb: false };
  const [sid, part] = parts[0].split(".");
  const slide = deck.slides.find((s) => s.id === sid) ?? activeSlide(deck, ui);
  if (!part) return { slide, objs: [], thumb: true };
  if (["title", "subtitle", "body", "body2", "notes"].includes(part)) return { slide, part: part as PptSel["part"], objs: [], thumb: false };
  const objs = parts.map((p) => p.split(".")[1]).map((oid) => slide?.objects?.find((o) => o.id === oid)).filter(Boolean) as PptObject[];
  return { slide, objs, thumb: false };
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
function nextObjId(slide: PptSlide): string {
  let n = (slide.objects?.length ?? 0) + 1;
  while (slide.objects?.some((o) => o.id === `o${n}`)) n++;
  seq++;
  return `o${n}`;
}

type Target = TextProps & { align?: string };

/** The text-props bag the current selection formats. */
function targets(deck: PptDeck, ui: SimUi): Target[] {
  const s = parseSel(deck, ui);
  if (s.master) {
    deck.master = deck.master ?? {};
    return [];
  }
  if (!s.slide) return [];
  if (s.part === "title") return [(s.slide.titleProps = s.slide.titleProps ?? {})];
  if (s.part === "subtitle") return [(s.slide.subtitleProps = s.slide.subtitleProps ?? {})];
  if (s.part === "body" || s.part === "body2") return [(s.slide.bodyProps = s.slide.bodyProps ?? {})];
  return s.objs.map((o) => (o.props = o.props ?? {}));
}

function setProp(deck: PptDeck, ui: SimUi, key: keyof TextProps | "align", value: unknown) {
  const s = parseSel(deck, ui);
  if (s.master) {
    deck.master = deck.master ?? {};
    if (key === "font") s.master === "title" ? (deck.master.titleFont = String(value)) : (deck.master.bodyFont = String(value));
    if (key === "color" && s.master === "title") deck.master.titleColor = String(value);
    return;
  }
  for (const t of targets(deck, ui)) (t as Record<string, unknown>)[key] = value;
}

function firstProps(deck: PptDeck, ui: SimUi): Target {
  const s = parseSel(deck, ui);
  if (!s.slide) return {};
  if (s.part === "title") return s.slide.titleProps ?? {};
  if (s.part === "subtitle") return s.slide.subtitleProps ?? {};
  if (s.part === "body" || s.part === "body2") return s.slide.bodyProps ?? {};
  return s.objs[0]?.props ?? {};
}

const SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 54, 60, 66, 72, 80, 96];

function defaultSize(part: string | undefined, layout: string) {
  if (part === "title") return layout === "Title Slide" || layout === "Section Header" ? 44 : 36;
  if (part === "subtitle") return 20;
  return 24;
}

function sampleChart(type: string): PptObject {
  return { id: "", kind: "chart", label: type, x: 15, y: 25, w: 70, h: 60, series: [{ label: "Q1", value: 42 }, { label: "Q2", value: 55 }, { label: "Q3", value: 48 }, { label: "Q4", value: 61 }], style: type };
}

/* ------------------------------------------------------------------ */
/* Built-in command handling                                           */
/* ------------------------------------------------------------------ */

export function applyPpt(input: PptDeck, c: SimCommit, ui: SimUi): { doc: PptDeck; ui?: Partial<SimUi> } {
  const common = applyCommonCommit(input, c, ".pptx");
  if (common) return { doc: common };

  const deck = clone(input);
  const sel = parseSel(deck, ui);
  const slide = sel.slide ?? activeSlide(deck, ui);
  const v = c.kind === "command" ? c.value : undefined;
  const sv = v === undefined ? "" : String(v);

  if (c.kind === "type") {
    const [sid, part] = c.target.split(".");
    const sl = deck.slides.find((s) => s.id === sid);
    if (!sl) return { doc: deck };
    if (part === "title") sl.title = c.value;
    else if (part === "subtitle") sl.subtitle = c.value;
    else if (part === "body") sl.body = c.value.split("\n").filter((l, i, a) => l.trim() !== "" || i < a.length - 1);
    else if (part === "body2") sl.body2 = c.value.split("\n");
    else if (part === "notes") sl.notes = c.value;
    else {
      const o = sl.objects?.find((x) => x.id === part);
      if (o) {
        if (o.kind === "table" && /^r\d+c\d+$/.test(c.target.split(".")[2] ?? "")) {
          const m = /^r(\d+)c(\d+)$/.exec(c.target.split(".")[2])!;
          o.rows = o.rows ?? [];
          o.rows[Number(m[1]) - 1][Number(m[2]) - 1] = c.value;
        } else o.text = c.value;
      }
    }
    // Typing fixes misspellings it replaces.
    if (sl.spell) sl.spell = sl.spell.filter((w) => [sl.title, sl.subtitle, ...(sl.body ?? []), ...(sl.body2 ?? [])].some((t) => t?.includes(w.word)));
    return { doc: deck };
  }

  if (c.kind === "click") {
    return { doc: deck };
  }

  if (c.kind === "dialog") {
    const val = c.values;
    switch (c.id) {
      case "insertPicture":
      case "insertVideo":
      case "insertAudio": {
        if (!slide) return { doc: deck };
        const kind = c.id === "insertPicture" ? "image" : c.id === "insertVideo" ? "video" : "audio";
        const id = nextObjId(slide);
        const o: PptObject = kind === "audio"
          ? { id, kind, label: String(val.file ?? "Audio"), glyph: "🔊", x: 46, y: 44, w: 8, h: 12 }
          : { id, kind, label: String(val.file ?? (kind === "image" ? "Picture" : "Video")), glyph: kind === "image" ? "🖼️" : "▶", x: 30, y: 25, w: 40, h: 55 };
        slide.objects = [...(slide.objects ?? []), o];
        return { doc: deck, ui: { selection: `${slide.id}.${id}` } };
      }
      case "insertChart": {
        if (!slide) return { doc: deck };
        const id = nextObjId(slide);
        slide.objects = [...(slide.objects ?? []), { ...sampleChart(String(val.type ?? "Clustered Column")), id }];
        return { doc: deck, ui: { selection: `${slide.id}.${id}` } };
      }
      case "insertSmartArt": {
        if (!slide) return { doc: deck };
        const id = nextObjId(slide);
        const items = slide.body && slide.body.length ? slide.body.slice(0, 6) : ["[Text]", "[Text]", "[Text]"];
        slide.objects = [...(slide.objects ?? []), { id, kind: "smartart", label: String(val.graphic ?? "Basic Block List"), style: String(val.graphic ?? "Basic Block List"), items, x: 8, y: 26, w: 84, h: 62 }];
        if (val.convert) slide.body = [];
        return { doc: deck, ui: { selection: `${slide.id}.${id}` } };
      }
      case "insertTable": {
        if (!slide) return { doc: deck };
        const cols = Number(val.cols ?? 3), rows = Number(val.rows ?? 3);
        const id = nextObjId(slide);
        slide.objects = [...(slide.objects ?? []), { id, kind: "table", label: "Table", rows: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")), x: 10, y: 28, w: 80, h: 10 * rows }];
        return { doc: deck, ui: { selection: `${slide.id}.${id}` } };
      }
      case "headerFooter": {
        deck.footer = { text: val.footer ? String(val.footerText ?? "") : undefined, slideNumber: Boolean(val.slideNumber), date: Boolean(val.date) };
        deck.flags = { ...(deck.flags ?? {}), dontShowOnTitle: Boolean(val.dontShowOnTitle), footerApplyAll: String(val.apply ?? "Apply to All") };
        return { doc: deck };
      }
      case "formatBackground": {
        const color = String(val.color ?? "#ffffff");
        if (val.applyToAll) deck.slides.forEach((s) => (s.background = color));
        else if (slide) slide.background = color;
        return { doc: deck };
      }
      case "addSection": {
        if (!slide) return { doc: deck };
        const i = deck.slides.findIndex((s) => s.id === slide.id);
        const name = String(val.name ?? "Untitled Section");
        for (let k = i; k < deck.slides.length; k++) {
          if (k > i && deck.slides[k].section && deck.slides[k].section !== deck.slides[i].section) break;
          deck.slides[k].section = name;
        }
        return { doc: deck };
      }
      case "newComment":
        if (slide) slide.comments = [...(slide.comments ?? []), { author: "BEOC Student", text: String(val.text ?? "") }];
        deck.pane = "Comments";
        return { doc: deck };
      case "link": {
        const o = sel.objs[0];
        if (o) o.props = { ...(o.props ?? {}), color: "#0563C1", underline: true };
        deck.flags = { ...(deck.flags ?? {}), link: String(val.address ?? "") };
        return { doc: deck };
      }
      case "altText": {
        const o = sel.objs[0];
        if (o) o.alt = String(val.text ?? "");
        return { doc: deck };
      }
      case "replace": {
        const find = String(val.find ?? "");
        const repl = String(val.replace ?? "");
        let n = 0;
        if (find) {
          const re = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), val.matchCase ? "g" : "gi");
          const rep = (t?: string) => (t ? t.replace(re, () => { n++; return repl; }) : t);
          for (const s of deck.slides) {
            s.title = rep(s.title);
            s.subtitle = rep(s.subtitle);
            s.body = s.body?.map((b) => rep(b)!);
            s.body2 = s.body2?.map((b) => rep(b)!);
            s.objects?.forEach((o) => (o.text = rep(o.text)));
          }
        }
        deck.pane = `Replace: ${n} replacement${n === 1 ? "" : "s"}`;
        return { doc: deck };
      }
      case "slideSize":
        deck.size = String(val.size ?? "16:9").includes("4:3") ? "4:3" : "16:9";
        return { doc: deck };
      case "setupShow":
        deck.flags = { ...(deck.flags ?? {}), showType: String(val.showType ?? ""), loop: Boolean(val.loop) };
        return { doc: deck };
      case "zoom":
        deck.flags = { ...(deck.flags ?? {}), zoom: Number(val.percent ?? 100) };
        return { doc: deck };
      case "renameLayout":
        deck.flags = { ...(deck.flags ?? {}), layoutName: String(val.name ?? "") };
        return { doc: deck };
      case "paragraph": {
        const a = ({ Left: "left", Centered: "center", Right: "right", Justified: "justify" } as Record<string, string>)[String(val.alignment ?? "")];
        if (a) for (const t of targets(deck, ui)) t.align = a;
        if (val.lineSpacing && slide) slide.bodyProps = { ...(slide.bodyProps ?? {}), lineSpacing: ({ Single: 1, "1.5 lines": 1.5, Double: 2 } as Record<string, number>)[String(val.lineSpacing)] ?? 1 };
        return { doc: deck };
      }
      case "font":
        if (val.font) setProp(deck, ui, "font", String(val.font));
        if (val.size) setProp(deck, ui, "size", Number(val.size));
        if (val.color && val.color !== "Automatic") setProp(deck, ui, "color", String(val.color));
        if (val.style) {
          setProp(deck, ui, "bold", String(val.style).includes("Bold"));
          setProp(deck, ui, "italic", String(val.style).includes("Italic"));
        }
        return { doc: deck };
    }
    return { doc: deck };
  }

  if (c.kind !== "command") return { doc: deck };

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
      const [id, pos] = sv.split("@");
      const i = deck.slides.findIndex((s) => s.id === id);
      if (i >= 0) {
        const [s] = deck.slides.splice(i, 1);
        deck.slides.splice(Math.max(0, Number(pos) - 1), 0, s);
      }
      return { doc: deck };
    }
    case "slides.section": {
      if (sv === "Remove All Sections") deck.slides.forEach((s) => (s.section = undefined));
      else if (sv === "Collapse All" || sv === "Expand All") deck.flags = { ...(deck.flags ?? {}), sections: sv };
      return { doc: deck };
    }

    /* -------- clipboard -------- */
    case "home.cut":
    case "home.copy": {
      if (sel.thumb && slide) {
        deck.flags = { ...(deck.flags ?? {}), clipSlide: slide.id, clipCut: c.id === "home.cut" };
        if (c.id === "home.cut" && deck.slides.length > 1) {
          return applyPpt(deck, { kind: "command", id: "slides.delete" }, ui);
        }
        return { doc: deck };
      }
      if (sel.objs.length && slide) {
        deck.flags = { ...(deck.flags ?? {}), clipObj: JSON.stringify(sel.objs[0]) };
        if (c.id === "home.cut") slide.objects = slide.objects?.filter((o) => !sel.objs.includes(o));
      }
      return { doc: deck };
    }
    case "home.paste": {
      const clip = deck.flags?.clipObj;
      if (clip && slide) {
        const o = JSON.parse(String(clip)) as PptObject;
        o.id = nextObjId(slide);
        o.x = Math.min(80, o.x + 3);
        o.y = Math.min(80, o.y + 3);
        slide.objects = [...(slide.objects ?? []), o];
        return { doc: deck, ui: { selection: `${slide.id}.${o.id}` } };
      }
      return { doc: deck };
    }
    case "home.formatPainter":
      deck.flags = { ...(deck.flags ?? {}), painter: JSON.stringify(firstProps(deck, ui)) };
      return { doc: deck };
    case "home.formatPainter.apply": {
      const p = deck.flags?.painter;
      if (p) for (const t of targets(deck, ui)) Object.assign(t, JSON.parse(String(p)));
      deck.flags = { ...(deck.flags ?? {}), painter: undefined as unknown as SimValue };
      return { doc: deck };
    }

    /* -------- font -------- */
    case "home.bold":
    case "home.italic":
    case "home.underline":
    case "home.strike":
    case "home.shadow": {
      const k = c.id.split(".")[1] as "bold" | "italic" | "underline" | "strike";
      const cur = firstProps(deck, ui)[k as "bold"];
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
      for (const t of targets(deck, ui)) for (const k of Object.keys(t)) delete (t as Record<string, unknown>)[k];
      return { doc: deck };
    case "home.changeCase": {
      const conv = (t?: string) => !t ? t : sv === "UPPERCASE" ? t.toUpperCase() : sv === "lowercase" ? t.toLowerCase() : sv === "Capitalize Each Word" ? t.toLowerCase().replace(/\b\w/g, (x) => x.toUpperCase()) : sv === "Sentence case." ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : t;
      if (slide) {
        if (sel.part === "title") slide.title = conv(slide.title);
        else if (sel.part === "subtitle") slide.subtitle = conv(slide.subtitle);
        else if (sel.part === "body") slide.body = slide.body?.map((b) => conv(b)!);
        else sel.objs.forEach((o) => (o.text = conv(o.text)));
      }
      return { doc: deck };
    }

    /* -------- paragraph -------- */
    case "home.bullets":
    case "home.numbering": {
      if (!slide) return { doc: deck };
      const bp = (slide.bodyProps = slide.bodyProps ?? {});
      if (c.id === "home.bullets") {
        if (sv === "None") bp.bullets = false;
        else if (sv) bp.bullets = true;
        else bp.bullets = !(bp.bullets ?? true) || Boolean(bp.numbered);
        bp.numbered = false;
      }
      else { bp.numbered = sv === "None" ? false : !bp.numbered; if (bp.numbered) bp.bullets = true; }
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
      if (slide) slide.bodyProps = { ...(slide.bodyProps ?? {}), lineSpacing: Number(sv) || 1 };
      return { doc: deck };
    case "home.indentInc":
    case "home.indentDec":
      if (slide?.body && sel.part === "body") {
        slide.body = slide.body.map((b, i) => (i === 0 ? b : c.id === "home.indentInc" ? `\t${b}` : b.replace(/^\t/, "")));
      }
      return { doc: deck };
    case "home.convertSmartArt":
      return applyPpt(deck, { kind: "dialog", id: "insertSmartArt", values: { graphic: sv || "Basic Block List", convert: true } }, ui);

    /* -------- drawing / objects -------- */
    case "insert.shape":
    case "insert.textBox":
    case "insert.icons":
    case "insert.3d":
    case "insert.wordArt": {
      if (!slide) return { doc: deck };
      const id = nextObjId(slide);
      const kind: PptObject["kind"] = c.id === "insert.shape" ? "shape" : c.id === "insert.icons" ? "icon" : "textbox";
      const shape: PptObject["shape"] = /Oval|Circle/.test(sv) ? "oval" : /Arrow/.test(sv) ? "arrow" : /Star/.test(sv) ? "star" : /Callout|Speech/.test(sv) ? "callout" : /Rounded/.test(sv) ? "rounded" : "rect";
      const o: PptObject =
        kind === "shape" ? { id, kind, label: sv || "Rectangle", shape, x: 35, y: 35, w: 30, h: 25, fill: themeOf(deck).accent } :
        kind === "icon" ? { id, kind, label: sv || "Icon", glyph: "★", x: 44, y: 38, w: 12, h: 20, color: themeOf(deck).accent } :
        { id, kind: "textbox", label: c.id === "insert.wordArt" ? "WordArt" : "Text Box", text: c.id === "insert.wordArt" ? "Your text here" : "", x: 30, y: 40, w: 40, h: 14, props: c.id === "insert.wordArt" ? { size: 40, bold: true, color: themeOf(deck).accent } : undefined };
      slide.objects = [...(slide.objects ?? []), o];
      return { doc: deck, ui: { selection: `${slide.id}.${id}` } };
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
    case "shape.fill": for (const o of sel.objs) o.fill = sv === "No Fill" ? "transparent" : sv; return { doc: deck };
    case "shape.outline": for (const o of sel.objs) o.color = sv; return { doc: deck };
    case "shape.style":
    case "picture.style":
    case "picture.border":
    case "picture.effects":
    case "picture.corrections":
    case "picture.color":
    case "picture.artistic":
    case "shape.effects":
    case "table.style":
    case "chart.style":
    case "chart.colors":
    case "smartart.style":
    case "smartart.colors":
      for (const o of sel.objs) o.style = `${c.id.split(".")[1]}:${sv}`;
      if (c.id === "shape.style") for (const o of sel.objs) o.fill = themeOf(deck).accent;
      return { doc: deck };
    case "smartart.layout":
    case "chart.type":
      for (const o of sel.objs) o.label = sv;
      return { doc: deck };
    case "picture.crop": for (const o of sel.objs) o.crop = !o.crop; return { doc: deck };
    case "picture.removeBackground": for (const o of sel.objs) o.style = "removeBackground"; return { doc: deck };
    case "picture.reset": for (const o of sel.objs) o.style = undefined; return { doc: deck };
    case "object.bringForward":
    case "object.bringToFront":
      for (const o of sel.objs) o.z = (o.z ?? 0) + (c.id === "object.bringToFront" ? 10 : 1);
      return { doc: deck };
    case "object.sendBackward":
    case "object.sendToBack":
      for (const o of sel.objs) o.z = (o.z ?? 0) - (c.id === "object.sendToBack" ? 10 : 1);
      return { doc: deck };
    case "object.align": {
      const objs = sel.objs;
      if (!objs.length) return { doc: deck };
      const relSlide = objs.length === 1;
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
      if (sv === "Distribute Horizontally" && objs.length > 2) {
        const sorted = objs.slice().sort((a, b) => a.x - b.x);
        const total = sorted.reduce((t, o) => t + o.w, 0);
        const gap = (maxX - minX - total) / (sorted.length - 1);
        let x = minX;
        sorted.forEach((o) => { o.x = x; x += o.w + gap; });
      }
      return { doc: deck };
    }
    case "object.group": {
      const g = `g${seq++}`;
      for (const o of sel.objs) o.group = g;
      return { doc: deck };
    }
    case "object.ungroup": for (const o of sel.objs) o.group = null; return { doc: deck };
    case "object.rotate": for (const o of sel.objs) o.rotate = ((o.rotate ?? 0) + (sv.includes("Left") ? -90 : sv.includes("Flip") ? 180 : 90)) % 360; return { doc: deck };
    case "object.size": for (const o of sel.objs) { const n = Number(sv); if (n) { const r = o.h / o.w; o.w = Math.min(95, n * 7.5); o.h = o.w * r; } } return { doc: deck };
    case "edit.delete": {
      if (!slide) return { doc: deck };
      if (sel.objs.length) {
        slide.objects = slide.objects?.filter((o) => !sel.objs.some((x) => x.id === o.id));
        return { doc: deck, ui: { selection: slide.id } };
      }
      if (sel.part === "title") slide.title = "";
      else if (sel.part === "subtitle") slide.subtitle = "";
      else if (sel.part === "body") slide.body = [];
      else if (sel.thumb) return applyPpt(deck, { kind: "command", id: "slides.delete" }, ui);
      return { doc: deck };
    }

    /* -------- design -------- */
    case "design.theme": deck.theme = sv; deck.variant = 1; return { doc: deck };
    case "design.variant": deck.variant = Number(sv) || 1; return { doc: deck };
    case "design.slideSize":
      deck.size = sv.includes("4:3") ? "4:3" : "16:9";
      return { doc: deck };
    case "design.idea":
      deck.variant = ((deck.variant ?? 1) % 4) + 1;
      if (slide) slide.background = undefined;
      deck.flags = { ...(deck.flags ?? {}), designIdea: sv };
      deck.pane = null;
      return { doc: deck };
    case "design.designer": deck.pane = "Designer"; return { doc: deck };

    /* -------- transitions -------- */
    case "transition.apply":
      if (slide) slide.transition = sv === "None" ? null : sv;
      return { doc: deck };
    case "transition.applyAll": {
      const t = slide?.transition ?? null;
      const opts = slide?.transitionOptions;
      deck.slides.forEach((s) => { s.transition = t; s.transitionOptions = opts; });
      return { doc: deck };
    }
    case "transition.effect":
      if (slide) slide.transitionOptions = { ...(slide.transitionOptions ?? {}), effect: sv };
      return { doc: deck };
    case "transition.duration":
      if (slide) slide.transitionOptions = { ...(slide.transitionOptions ?? {}), duration: Number(String(sv).replace(/[^0-9.]/g, "")) || 1 };
      return { doc: deck };
    case "transition.advanceAfter":
      if (slide) slide.transitionOptions = { ...(slide.transitionOptions ?? {}), advanceAfter: Number(String(sv).replace(/[^0-9.]/g, "")) || null };
      return { doc: deck };
    case "transition.preview":
      deck.flags = { ...(deck.flags ?? {}), preview: Date.now() };
      return { doc: deck };

    /* -------- animations -------- */
    case "animation.apply":
    case "animation.add": {
      if (!slide) return { doc: deck };
      const max = Math.max(0, ...(slide.objects ?? []).map((o) => o.animationOrder ?? 0), slide.titleAnimation ? 1 : 0, slide.bodyAnimation ? 2 : 0);
      const none = sv === "None";
      if (sel.part === "title") slide.titleAnimation = none ? null : sv;
      else if (sel.part === "body" || sel.part === "subtitle") slide.bodyAnimation = none ? null : sv;
      for (const o of sel.objs) {
        o.animation = none ? null : sv;
        o.animationOrder = none ? undefined : o.animationOrder ?? max + 1;
      }
      return { doc: deck };
    }
    case "animation.earlier":
    case "animation.later":
      for (const o of sel.objs) o.animationOrder = Math.max(1, (o.animationOrder ?? 1) + (c.id === "animation.earlier" ? -1 : 1));
      return { doc: deck };
    case "animation.pane": deck.pane = deck.pane === "Animation Pane" ? null : "Animation Pane"; return { doc: deck };
    case "animation.start":
    case "animation.duration":
    case "animation.delay":
    case "animation.effect":
    case "animation.trigger":
    case "animation.painter":
      deck.flags = { ...(deck.flags ?? {}), [c.id]: sv || true };
      return { doc: deck };

    /* -------- slide show -------- */
    case "slideshow.fromBeginning":
      deck.view = "show";
      deck.flags = { ...(deck.flags ?? {}), showIndex: 0, showFrom: "beginning" };
      return { doc: deck };
    case "slideshow.fromCurrent":
      deck.view = "show";
      deck.flags = { ...(deck.flags ?? {}), showIndex: Math.max(0, deck.slides.findIndex((s) => s.id === slide?.id)), showFrom: "current" };
      return { doc: deck };
    case "slideshow.end":
      deck.view = "normal";
      return { doc: deck };
    case "slideshow.next":
    case "slideshow.prev": {
      const visible = deck.slides.filter((s) => !s.hidden);
      const i = Number(deck.flags?.showIndex ?? 0) + (c.id === "slideshow.next" ? 1 : -1);
      if (i >= visible.length) { deck.view = "normal"; return { doc: deck }; }
      deck.flags = { ...(deck.flags ?? {}), showIndex: Math.max(0, i) };
      return { doc: deck };
    }
    case "slideshow.presenterView":
    case "slideshow.rehearse":
    case "slideshow.record":
    case "slideshow.custom":
    case "slideshow.captions":
    case "slideshow.online":
      deck.flags = { ...(deck.flags ?? {}), [c.id]: c.id === "slideshow.presenterView" ? !deck.flags?.[c.id] : sv || true };
      return { doc: deck };

    /* -------- review -------- */
    case "review.spelling": {
      const s = deck.slides.find((x) => x.spell?.length);
      deck.pane = s ? "Spelling" : "Spelling: done";
      if (s) deck.active = s.id;
      return { doc: deck, ui: s ? { slide: s.id, selection: s.id } : undefined };
    }
    case "spelling.change":
    case "spelling.ignore": {
      const s = deck.slides.find((x) => x.spell?.length);
      if (s && s.spell) {
        const w = s.spell[0];
        if (c.id === "spelling.change") {
          const to = sv || w.suggestions[0] || w.word;
          const rep = (t?: string) => t?.split(w.word).join(to);
          s.title = rep(s.title);
          s.subtitle = rep(s.subtitle);
          s.body = s.body?.map((b) => rep(b)!);
          s.body2 = s.body2?.map((b) => rep(b)!);
          s.objects?.forEach((o) => (o.text = rep(o.text)));
        }
        s.spell = s.spell.slice(1);
      }
      const next = deck.slides.find((x) => x.spell?.length);
      deck.pane = next ? "Spelling" : "Spelling: done";
      return { doc: deck, ui: next ? { slide: next.id, selection: next.id } : undefined };
    }
    case "review.accessibility": deck.pane = "Accessibility"; return { doc: deck };
    case "review.thesaurus": deck.pane = "Thesaurus"; return { doc: deck };
    case "review.smartLookup": deck.pane = "Search"; return { doc: deck };
    case "review.translate": deck.pane = "Translator"; return { doc: deck };
    case "review.showComments": deck.pane = deck.pane === "Comments" ? null : "Comments"; return { doc: deck };
    case "review.deleteComment":
      if (slide) slide.comments = sv === "Delete All Comments in This Presentation" ? [] : (slide.comments ?? []).slice(1);
      if (sv === "Delete All Comments in This Presentation") deck.slides.forEach((s) => (s.comments = []));
      return { doc: deck };
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

    /* -------- view -------- */
    case "view.mode": {
      const map: Record<string, PptDeck["view"]> = { Normal: "normal", "Outline View": "outline", "Slide Sorter": "sorter", "Notes Page": "notes", "Reading View": "reading" };
      deck.view = map[sv] ?? "normal";
      return { doc: deck };
    }
    case "view.master": deck.view = "master"; return { doc: deck, ui: { selection: "master.title" } };
    case "master.close": deck.view = "normal"; return { doc: deck, ui: { selection: slide?.id ?? deck.slides[0].id } };
    case "view.notes": deck.flags = { ...(deck.flags ?? {}), hideNotes: !deck.flags?.hideNotes }; return { doc: deck };
    case "view.ruler":
    case "view.gridlines":
    case "view.guides":
      deck.flags = { ...(deck.flags ?? {}), [c.id]: !deck.flags?.[c.id] };
      return { doc: deck };
    case "view.zoom": deck.flags = { ...(deck.flags ?? {}), zoom: Number(String(sv).replace("%", "")) || 100 }; return { doc: deck };
    case "view.fit": deck.flags = { ...(deck.flags ?? {}), zoom: 100 }; return { doc: deck };
    case "view.grayscale":
    case "view.newWindow":
    case "view.arrangeAll":
    case "view.macros":
    case "help.help":
    case "home.dictate":
    case "home.find":
      deck.flags = { ...(deck.flags ?? {}), [c.id]: sv || true };
      if (c.id === "help.help") deck.pane = "Help";
      if (c.id === "home.find") deck.pane = "Find";
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
  return {
    "home.fontName": p.font ?? (s.part === "title" ? deck.master?.titleFont ?? theme.titleFont : deck.master?.bodyFont ?? theme.font),
    "home.fontSize": p.size ?? defaultSize(s.part, slide?.layout ?? ""),
    "home.bold": Boolean(p.bold),
    "home.italic": Boolean(p.italic),
    "home.underline": Boolean(p.underline),
    "home.strike": Boolean(p.strike),
    "home.alignLeft": (p.align ?? "left") === "left",
    "home.alignCenter": p.align === "center",
    "home.alignRight": p.align === "right",
    "home.justify": p.align === "justify",
    "home.bullets": s.part === "body" ? slide?.bodyProps?.bullets !== false && !slide?.bodyProps?.numbered : false,
    "home.numbering": Boolean(slide?.bodyProps?.numbered),
    "transition.apply": slide?.transition ?? "None",
    "animation.apply": s.objs[0]?.animation ?? (s.part === "title" ? slide?.titleAnimation : s.part === "body" ? slide?.bodyAnimation : undefined) ?? "None",
    "design.theme": deck.theme ?? "Office Theme",
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
    "transition.duration": (slide?.transitionOptions?.duration ?? 1).toFixed(2).padStart(5, "0"),
    "transition.sound": "[No Sound]",
    "transition.advanceAfter": slide?.transitionOptions?.advanceAfter ? `00:${String(slide.transitionOptions.advanceAfter).padStart(2, "0")}.00` : "00:00.00",
    "transition.onClick": true,
    "animation.start": "On Click",
    "animation.duration": "00.50",
    "animation.delay": "00.00",
    "animation.pane": deck.pane === "Animation Pane",
    "review.showComments": deck.pane === "Comments",
  };
}

export function pptContextual(deck: PptDeck, ui: SimUi): string[] {
  if (deck.view === "master") return ["master"];
  const s = parseSel(deck, ui);
  const o = s.objs[0];
  if (!o) return s.part === "body" || s.part === "title" || s.part === "subtitle" ? ["shape"] : [];
  if (o.kind === "image") return ["picture"];
  if (o.kind === "table") return ["table"];
  if (o.kind === "chart") return ["chart"];
  if (o.kind === "smartart") return ["smartart"];
  if (o.kind === "video" || o.kind === "audio") return ["media"];
  return ["shape"];
}

export function pptDialogDefaults(deck: PptDeck, ui: SimUi, id: string): Record<string, SimValue> {
  const slide = activeSlide(deck, ui);
  switch (id) {
    case "headerFooter":
      return { slideNumber: Boolean(deck.footer?.slideNumber), date: Boolean(deck.footer?.date), footer: Boolean(deck.footer?.text), footerText: deck.footer?.text ?? "" };
    case "formatBackground":
      return { color: slide?.background ?? "#FFFFFF" };
    case "altText":
      return { text: parseSel(deck, ui).objs[0]?.alt ?? "" };
  }
  return {};
}

/** Every text string on a slide, for search and accessibility. */
export function slideText(s: PptSlide): string {
  return [s.title, s.subtitle, ...(s.body ?? []), ...(s.body2 ?? []), ...(s.objects ?? []).map((o) => o.text ?? "")].filter(Boolean).join(" ");
}
