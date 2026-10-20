"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PptDeck, PptObject, PptSlide, TextProps } from "@/types/sim";
import type { CanvasProps, MenuItem, StatusBarProps } from "../../types";
import { Icon } from "../../chrome/icons";
import { activeSlide, LAYOUTS, parseSel, slideText, themeOf, type PptTheme } from "./model";

type Part = "title" | "subtitle" | "body" | "body2";
interface Box { x: number; y: number; w: number; h: number }

function layoutBoxes(layout: string): Partial<Record<Part | "picture", Box>> {
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

const PLACEHOLDER: Record<Part, string> = { title: "Click to add title", subtitle: "Click to add subtitle", body: "Click to add text", body2: "Click to add text" };

function textStyle(p: (TextProps & { align?: string }) | undefined, base: { font: string; size: number; color: string; align?: string }): React.CSSProperties {
  return {
    fontFamily: `'${p?.font ?? base.font}', Aptos, Calibri, 'Segoe UI', sans-serif`,
    fontSize: (p?.size ?? base.size) * 1.333,
    color: p?.color ?? base.color,
    fontWeight: p?.bold ? 700 : undefined,
    fontStyle: p?.italic ? "italic" : undefined,
    textDecoration: [p?.underline ? "underline" : "", p?.strike ? "line-through" : ""].filter(Boolean).join(" ") || undefined,
    textAlign: (p?.align ?? base.align ?? "left") as React.CSSProperties["textAlign"],
    textShadow: (p as { shadow?: boolean } | undefined)?.shadow ? "1px 1px 2px rgba(0,0,0,.4)" : undefined,
  };
}

function shapeCss(o: PptObject): React.CSSProperties {
  switch (o.shape) {
    case "oval": return { borderRadius: "50%" };
    case "rounded": return { borderRadius: 18 };
    case "arrow": return { clipPath: "polygon(0 25%, 65% 25%, 65% 0, 100% 50%, 65% 100%, 65% 75%, 0 75%)" };
    case "star": return { clipPath: "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" };
    case "callout": return { borderRadius: 12 };
    default: return /Triangle/.test(o.label ?? "") ? { clipPath: "polygon(50% 0,100% 100%,0 100%)" } : {};
  }
}

const PAL = ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47"];

function ObjectBody({ o, theme }: { o: PptObject; theme: PptTheme }) {
  const style = o.style ?? "";
  if (o.kind === "image") {
    const shadow = /Shadow|Reflected/.test(style);
    const rounded = /Rounded|Oval/.test(style);
    const frame = /Frame/.test(style);
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sky-200 to-emerald-200 text-center"
        style={{
          boxShadow: shadow ? "0 10px 22px rgba(0,0,0,.4)" : undefined,
          borderRadius: rounded ? (/Oval/.test(style) ? "50%" : 22) : undefined,
          border: frame ? "10px solid #fff" : /border:/.test(style) ? `4px solid ${style.split(":")[1]}` : undefined,
          outline: frame ? "1px solid #bbb" : undefined,
          filter: /Grayscale/.test(style) ? "grayscale(1)" : /Sepia/.test(style) ? "sepia(1)" : /Washout/.test(style) ? "opacity(.5)" : /Blur/.test(style) ? "blur(1.5px)" : undefined,
          clipPath: o.crop ? "inset(8% 8% 8% 8%)" : undefined,
        }}
      >
        <span style={{ fontSize: 44 }}>{o.glyph ?? "🖼️"}</span>
        <span className="px-2 text-[15px] text-gray-700">{o.label}</span>
      </div>
    );
  }
  if (o.kind === "video") return <div className="flex h-full w-full items-center justify-center bg-black text-5xl text-white/80">▶<span className="ml-3 text-sm text-white/70">{o.label}</span></div>;
  if (o.kind === "audio") return <div className="flex h-full w-full items-center justify-center text-5xl">🔊</div>;
  if (o.kind === "icon") return <div className="flex h-full w-full items-center justify-center" style={{ fontSize: 60, color: o.color ?? theme.accent }}>{o.glyph ?? "★"}</div>;
  if (o.kind === "table") {
    const rows = o.rows ?? [];
    return (
      <table className="h-full w-full border-collapse text-[18px]" style={{ fontFamily: `'${theme.font}', sans-serif` }}>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="border border-white px-2 py-1" style={{ background: i === 0 ? theme.accent : i % 2 ? "#D9E2F3" : "#E9EFF7", color: i === 0 ? "#fff" : "#000", fontWeight: i === 0 ? 700 : 400 }}>
                  {c || " "}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (o.kind === "chart") {
    const s = o.series ?? [];
    const max = Math.max(1, ...s.map((x) => x.value));
    const type = o.label ?? "";
    if (/Pie|Doughnut/.test(type)) {
      const total = s.reduce((a, b) => a + b.value, 0) || 1;
      let acc = 0;
      const stops = s.map((x, i) => { const a = (acc / total) * 100; acc += x.value; return `${PAL[i % PAL.length]} ${a}% ${(acc / total) * 100}%`; }).join(",");
      return (
        <div className="flex h-full w-full items-center justify-center gap-6 bg-white">
          <div className="relative aspect-square h-[80%] rounded-full" style={{ background: `conic-gradient(${stops})` }}>
            {/Doughnut/.test(type) && <div className="absolute inset-[28%] rounded-full bg-white" />}
          </div>
          <div className="space-y-1 text-[14px]">{s.map((x, i) => <div key={i} className="flex items-center gap-2"><span className="h-3 w-3" style={{ background: PAL[i % PAL.length] }} />{x.label}</div>)}</div>
        </div>
      );
    }
    return (
      <div className="flex h-full w-full flex-col bg-white p-3">
        <div className="mb-1 text-center text-[16px] text-gray-600">Chart Title</div>
        <div className="flex flex-1 items-end gap-4 border-b border-l border-gray-300 px-4">
          {s.map((x, i) =>
            /Line/.test(type) ? null : (
              <div key={i} className="flex flex-1 flex-col items-center justify-end">
                <div className="w-3/5" style={{ height: `${(x.value / max) * 100}%`, background: PAL[0] }} />
              </div>
            ),
          )}
          {/Line/.test(type) && (
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline fill="none" stroke={PAL[0]} strokeWidth="2" points={s.map((x, i) => `${(i + 0.5) * (100 / s.length)},${100 - (x.value / max) * 95}`).join(" ")} />
            </svg>
          )}
        </div>
        <div className="flex justify-around px-4 pt-1 text-[13px] text-gray-600">{s.map((x, i) => <span key={i}>{x.label}</span>)}</div>
      </div>
    );
  }
  if (o.kind === "smartart") {
    const items = o.items ?? [];
    const layout = o.label ?? o.style ?? "";
    const colorful = /Colorful/.test(style);
    const fill = (i: number) => (colorful ? PAL[i % PAL.length] : theme.accent);
    if (/Process/.test(layout)) {
      return (
        <div className="flex h-full w-full items-center justify-center gap-2">
          {items.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex h-24 w-36 items-center justify-center rounded p-2 text-center text-[17px] text-white" style={{ background: fill(i) }}>{t}</div>
              {i < items.length - 1 && <span className="text-3xl" style={{ color: theme.accent }}>➜</span>}
            </div>
          ))}
        </div>
      );
    }
    if (/Cycle/.test(layout)) {
      return (
        <div className="relative h-full w-full">
          {items.map((t, i) => {
            const a = (i / Math.max(1, items.length)) * Math.PI * 2 - Math.PI / 2;
            return (
              <div key={i} className="absolute flex h-20 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-2 text-center text-[15px] text-white" style={{ left: `${50 + 34 * Math.cos(a)}%`, top: `${50 + 38 * Math.sin(a)}%`, background: fill(i) }}>
                {t}
              </div>
            );
          })}
        </div>
      );
    }
    if (/Vertical/.test(layout)) {
      return (
        <div className="flex h-full w-full flex-col justify-center gap-2">
          {items.map((t, i) => <div key={i} className="rounded px-4 py-2 text-[18px] text-white" style={{ background: fill(i) }}>{t}</div>)}
        </div>
      );
    }
    if (/Hierarchy/.test(layout)) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6">
          <div className="rounded px-6 py-3 text-[18px] text-white" style={{ background: fill(0) }}>{items[0]}</div>
          <div className="flex gap-4">{items.slice(1).map((t, i) => <div key={i} className="rounded px-4 py-2 text-[16px] text-white" style={{ background: fill(i + 1) }}>{t}</div>)}</div>
        </div>
      );
    }
    return (
      <div className="grid h-full w-full grid-cols-3 content-center gap-3">
        {items.map((t, i) => <div key={i} className="flex h-24 items-center justify-center rounded p-2 text-center text-[17px] text-white" style={{ background: fill(i) }}>{t}</div>)}
      </div>
    );
  }
  // shape / textbox
  const isShape = o.kind === "shape";
  return (
    <div
      className="flex h-full w-full items-center justify-center p-2 text-center"
      style={{
        background: isShape ? (o.fill === "transparent" ? "transparent" : o.fill ?? theme.accent) : undefined,
        border: o.color ? `3px solid ${o.color}` : undefined,
        color: isShape ? "#fff" : theme.body,
        ...shapeCss(o),
        ...textStyle(o.props, { font: theme.font, size: isShape ? 18 : 20, color: isShape ? "#fff" : theme.body, align: isShape ? "center" : "left" }),
        justifyContent: o.props?.align === "left" ? "flex-start" : o.props?.align === "right" ? "flex-end" : "center",
        boxShadow: /Shadow|Intense/.test(style) ? "0 6px 12px rgba(0,0,0,.35)" : undefined,
      }}
    >
      {o.text}
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface SlideViewProps {
  deck: PptDeck;
  slide: PptSlide;
  width: number;
  index: number;
  interactive?: boolean;
  selection?: string;
  editing?: { key: string; text: string } | null;
  onPart?: (key: string, e: React.MouseEvent) => void;
  onEditStart?: (key: string) => void;
  onEditChange?: (text: string) => void;
  onEditCommit?: () => void;
  onEditCancel?: () => void;
  onContext?: (e: React.MouseEvent, key: string) => void;
  showBadges?: boolean;
  /** Slide Show build step: only animated items with order <= step are shown. */
  buildStep?: number;
  masterMode?: boolean;
}

export function SlideView(props: SlideViewProps) {
  const { deck, slide, width, index, interactive, selection, editing } = props;
  const theme = themeOf(deck);
  const W = deck.size === "4:3" ? 720 : 960;
  const H = 540;
  const scale = width / W;
  const boxes = layoutBoxes(slide.layout);
  const sel = new Set((selection ?? "").split(",").map((s) => s.trim()));
  const titleFont = deck.master?.titleFont ?? theme.titleFont;
  const bodyFont = deck.master?.bodyFont ?? theme.font;
  const titleColor = deck.master?.titleColor ?? theme.title;
  const isTitle = slide.layout === "Title Slide";
  const visible = (order?: number) => props.buildStep === undefined || !order || order <= props.buildStep;

  const spellWords = (slide.spell ?? []).map((s) => s.word);
  const marked = (t: string) => {
    if (!spellWords.length || !interactive) return t;
    const parts = t.split(new RegExp(`(${spellWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`));
    return parts.map((p, i) => (spellWords.includes(p) ? <span key={i} className="underline decoration-red-600 decoration-wavy">{p}</span> : p));
  };

  const placeholder = (part: Part) => {
    const b = boxes[part];
    if (!b) return null;
    const key = `${slide.id}.${part}`;
    const isSel = sel.has(key);
    const editingThis = editing?.key === key;
    const props_ = part === "title" ? slide.titleProps : part === "subtitle" ? slide.subtitleProps : slide.bodyProps;
    const base =
      part === "title"
        ? { font: titleFont, size: isTitle || slide.layout === "Section Header" ? 48 : slide.layout === "Content with Caption" ? 28 : 36, color: titleColor, align: isTitle ? "center" : "left" }
        : part === "subtitle"
          ? { font: bodyFont, size: 20, color: theme.body, align: isTitle ? "center" : "left" }
          : { font: bodyFont, size: slide.layout === "Content with Caption" && part === "body2" ? 16 : 24, color: theme.body };
    const text = part === "title" ? slide.title : part === "subtitle" ? slide.subtitle : part === "body" ? slide.body : slide.body2;
    const empty = !text || (Array.isArray(text) && text.every((t) => !t.trim()));
    if (empty && !interactive && !editingThis) return null;
    const anim = part === "title" ? slide.titleAnimation : slide.bodyAnimation;
    const bullets = (part === "body" || part === "body2") && slide.bodyProps?.bullets !== false;
    const numbered = (part === "body" || part === "body2") && slide.bodyProps?.numbered;
    if (!visible(anim ? (part === "title" ? 1 : 2) : undefined)) return null;
    return (
      <div
        key={part}
        data-part={key}
        onMouseDown={interactive ? (e) => { e.stopPropagation(); props.onPart?.(key, e); } : undefined}
        onDoubleClick={interactive ? (e) => { e.stopPropagation(); props.onEditStart?.(key); } : undefined}
        onContextMenu={interactive ? (e) => props.onContext?.(e, key) : undefined}
        className={`absolute ${interactive ? "cursor-text" : ""} ${interactive && (isSel || empty) ? (isSel ? "outline outline-1 outline-[#888]" : "outline-dashed outline-1 outline-[#bbb]") : ""}`}
        style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, display: "flex", flexDirection: "column", justifyContent: part === "title" && !isTitle ? "center" : part === "title" ? "flex-end" : "flex-start", padding: 8, ...textStyle(props_, base), lineHeight: (part === "body" || part === "body2") ? 1.2 * (slide.bodyProps?.lineSpacing ?? 1) : 1.05 }}
      >
        {props.showBadges && anim && <span className="absolute -left-7 top-1 bg-gray-200 px-1 text-[16px] text-gray-700">{part === "title" ? 1 : 2}</span>}
        {editingThis ? (
          <PartEditor multiline={part === "body" || part === "body2"} value={editing!.text} onChange={(t) => props.onEditChange?.(t)} onCommit={() => props.onEditCommit?.()} onCancel={() => props.onEditCancel?.()} />
        ) : empty ? (
          <span style={{ color: "#8a8a8a" }}>{PLACEHOLDER[part]}</span>
        ) : Array.isArray(text) ? (
          <ul className="space-y-[0.35em]">
            {text.map((line, i) => {
              const lvl = (/^\t+/.exec(line)?.[0].length ?? 0);
              return (
                <li key={i} className="flex gap-3" style={{ paddingLeft: lvl * 36, fontSize: lvl ? "0.83em" : undefined }}>
                  {bullets && <span style={{ color: theme.accent }}>{numbered ? `${i + 1}.` : lvl ? "–" : "•"}</span>}
                  <span>{marked(line.replace(/^\t+/, ""))}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <span>{marked(text)}</span>
        )}
      </div>
    );
  };

  const footer = deck.footer;
  const hideFooter = isTitle && deck.flags?.dontShowOnTitle;
  return (
    <div className="relative overflow-hidden" style={{ width, height: H * scale }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})`, background: slide.background ?? theme.bg }}
        onMouseDown={interactive ? () => props.onPart?.(slide.id, {} as React.MouseEvent) : undefined}
      >
        {theme.band && (
          <div
            className="absolute"
            style={{
              background: theme.band.color,
              ...(theme.band.side === "left" ? { left: 0, top: 0, bottom: 0, width: `${theme.band.size}%` } : theme.band.side === "right" ? { right: 0, top: 0, bottom: 0, width: `${theme.band.size}%` } : theme.band.side === "top" ? { left: 0, right: 0, top: 0, height: `${theme.band.size}%` } : { left: 0, right: 0, bottom: 0, height: `${theme.band.size}%` }),
            }}
          />
        )}
        {props.masterMode && (
          <div className="absolute inset-x-[6%] top-[5%] text-[13px] text-gray-500">Click to edit Master title style</div>
        )}
        {boxes.picture && !(slide.objects ?? []).some((o) => o.kind === "image") && interactive && (
          <div className="absolute flex flex-col items-center justify-center border border-dashed border-gray-400 text-gray-500" style={{ left: `${boxes.picture.x}%`, top: `${boxes.picture.y}%`, width: `${boxes.picture.w}%`, height: `${boxes.picture.h}%` }}>
            <Icon name="picture" size={40} />
            <span className="text-[16px]">Click icon to add picture</span>
          </div>
        )}
        {(["title", "subtitle", "body", "body2"] as Part[]).map(placeholder)}
        {(slide.objects ?? [])
          .slice()
          .sort((a, b) => (a.z ?? 0) - (b.z ?? 0))
          .map((o) => {
            if (!visible(o.animation ? o.animationOrder : undefined)) return null;
            const key = `${slide.id}.${o.id}`;
            const isSel = sel.has(key);
            return (
              <div
                key={o.id}
                data-obj={key}
                onMouseDown={interactive ? (e) => { e.stopPropagation(); props.onPart?.(key, e); } : undefined}
                onDoubleClick={interactive && (o.kind === "textbox" || o.kind === "shape") ? (e) => { e.stopPropagation(); props.onEditStart?.(key); } : undefined}
                onContextMenu={interactive ? (e) => props.onContext?.(e, key) : undefined}
                className={`absolute ${interactive ? "cursor-move" : ""}`}
                style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%`, transform: o.rotate ? `rotate(${o.rotate}deg)` : undefined, outline: isSel ? "1.5px solid #6b6b6b" : o.kind === "textbox" && !o.text && interactive ? "1px dashed #bbb" : undefined, outlineOffset: 2 }}
              >
                {editing?.key === key ? (
                  <PartEditor multiline value={editing.text} onChange={(t) => props.onEditChange?.(t)} onCommit={() => props.onEditCommit?.()} onCancel={() => props.onEditCancel?.()} />
                ) : (
                  <ObjectBody o={o} theme={theme} />
                )}
                {props.showBadges && o.animation && <span className="absolute -left-7 top-0 bg-gray-200 px-1 text-[16px] text-gray-700">{o.animationOrder ?? 1}</span>}
                {isSel && ["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map((c) => <span key={c} className={`absolute ${c} h-3 w-3 rounded-full border border-gray-500 bg-white`} />)}
              </div>
            );
          })}
        {footer && !hideFooter && (
          <div className="absolute inset-x-[4%] bottom-[2%] flex items-center justify-between text-[14px]" style={{ color: theme.dark ? "#ddd" : "#7f7f7f", fontFamily: `'${bodyFont}', sans-serif` }}>
            <span>{footer.date ? "10/20/2026" : ""}</span>
            <span>{footer.text ?? ""}</span>
            <span>{footer.slideNumber ? index + 1 : ""}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function PartEditor({ value, onChange, onCommit, onCancel, multiline }: { value: string; onChange: (v: string) => void; onCommit: () => void; onCancel: () => void; multiline?: boolean }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);
  return (
    <textarea
      ref={ref}
      aria-label="Type here"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter" && (!multiline || e.ctrlKey)) { e.preventDefault(); onCommit(); }
        if (e.key === "Escape") { e.preventDefault(); if (e.shiftKey) onCancel(); else onCommit(); }
        if (e.key === "Tab" && multiline) {
          e.preventDefault();
          const el = e.currentTarget;
          const start = el.value.lastIndexOf("\n", el.selectionStart - 1) + 1;
          onChange(e.shiftKey ? el.value.slice(0, start) + el.value.slice(start).replace(/^\t/, "") : el.value.slice(0, start) + "\t" + el.value.slice(start));
        }
      }}
      onBlur={onCommit}
      className="h-full w-full resize-none border-0 bg-white/80 p-0 outline-none"
      style={{ font: "inherit", color: "inherit", textAlign: "inherit", lineHeight: "inherit", tabSize: 2 }}
    />
  );
}

/* ------------------------------------------------------------------ */

export function PptCanvas({ doc: deck, ui, onSelect, onCommit, onContextMenu, openDialog }: CanvasProps<PptDeck>) {
  const slide = activeSlide(deck, ui)!;
  const idx = deck.slides.findIndex((s) => s.id === slide.id);
  const [editing, setEditingState] = useState<{ key: string; text: string } | null>(null);
  const editRef = useRef<{ key: string; text: string } | null>(null);
  const setEditing = (v: { key: string; text: string } | null) => { editRef.current = v; setEditingState(v); };
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainW, setMainW] = useState(640);
  const [mainH, setMainH] = useState(360);
  const focusRef = useRef<HTMLDivElement>(null);
  const [build, setBuild] = useState(0);
  const [dragFrom, setDragFrom] = useState<string | null>(null);
  const view = deck.view ?? "normal";

  useEffect(() => { editRef.current = null; setEditingState(null); }, [deck]);
  useEffect(() => { setBuild(0); }, [deck.flags?.showIndex, view]);
  useEffect(() => {
    if (view === "show" || view === "reading") focusRef.current?.focus({ preventScroll: true });
  }, [view]);
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { setMainW(el.clientWidth); setMainH(el.clientHeight); });
    ro.observe(el);
    setMainW(el.clientWidth);
    setMainH(el.clientHeight);
    return () => ro.disconnect();
  }, [view]);

  const textOf = (key: string): string => {
    const [sid, part] = key.split(".");
    const s = deck.slides.find((x) => x.id === sid);
    if (!s) return "";
    if (part === "title") return s.title ?? "";
    if (part === "subtitle") return s.subtitle ?? "";
    if (part === "body") return (s.body ?? []).join("\n");
    if (part === "body2") return (s.body2 ?? []).join("\n");
    if (part === "notes") return s.notes ?? "";
    return s.objects?.find((o) => o.id === part)?.text ?? "";
  };
  const editable = (key: string) => {
    const [sid, part] = key.split(".");
    if (!part) return false;
    if (["title", "subtitle", "body", "body2", "notes"].includes(part)) return true;
    const o = deck.slides.find((x) => x.id === sid)?.objects?.find((x) => x.id === part);
    return o?.kind === "textbox" || o?.kind === "shape";
  };

  const commitEdit = () => {
    const e = editRef.current;
    if (!e) return;
    setEditing(null);
    if (e.text !== textOf(e.key)) onCommit({ kind: "type", target: e.key, value: e.text });
    focusRef.current?.focus({ preventScroll: true });
  };

  const selectPart = (key: string, e: React.MouseEvent) => {
    if (editRef.current && editRef.current.key !== key) commitEdit();
    let next = key;
    if ((e.shiftKey || e.ctrlKey || e.metaKey) && key.includes(".") && ui.selection.includes(".")) {
      const set = new Set(ui.selection.split(","));
      set.has(key) ? set.delete(key) : set.add(key);
      next = Array.from(set).join(",");
    }
    onSelect({ selection: next, slide: key.split(".")[0] });
    if (deck.flags?.painter) onCommit({ kind: "command", id: "home.formatPainter.apply" });
    focusRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (editing) return;
    const k = e.key;
    if (view === "show" || view === "reading") {
      if (k === "Escape") { e.preventDefault(); onCommit({ kind: "command", id: view === "show" ? "slideshow.end" : "view.mode", value: view === "show" ? undefined : "Normal" }); return; }
      if (["ArrowRight", "ArrowDown", " ", "Enter", "PageDown", "n"].includes(k)) { e.preventDefault(); advance(1); return; }
      if (["ArrowLeft", "ArrowUp", "Backspace", "PageUp", "p"].includes(k)) { e.preventDefault(); advance(-1); return; }
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (k === "Delete" || k === "Backspace") {
      e.preventDefault();
      onCommit({ kind: "command", id: ui.selection.includes(".") ? "edit.delete" : "slides.delete" });
      return;
    }
    if (!ui.selection.includes(".") && (k === "ArrowDown" || k === "ArrowUp")) {
      e.preventDefault();
      const n = deck.slides[Math.max(0, Math.min(deck.slides.length - 1, idx + (k === "ArrowDown" ? 1 : -1)))];
      onSelect({ slide: n.id, selection: n.id });
      return;
    }
    if (!ui.selection.includes(".") && k === "Enter") {
      e.preventDefault();
      onCommit({ kind: "command", id: "slides.new", value: "Title and Content" });
      return;
    }
    if (k === "F2" || k === "Enter") {
      if (editable(ui.selection)) { e.preventDefault(); setEditing({ key: ui.selection, text: textOf(ui.selection) }); }
      return;
    }
    if (k.length === 1 && editable(ui.selection)) {
      e.preventDefault();
      setEditing({ key: ui.selection, text: k });
    }
  };

  const ratio = deck.size === "4:3" ? 4 / 3 : 16 / 9;
  const fitW = (padW: number, padH: number, max = 1100) => Math.max(240, Math.min(mainW - padW, (mainH - padH) * ratio, max));
  const visibleSlides = deck.slides.filter((s) => !s.hidden);
  const showIndex = Number(deck.flags?.showIndex ?? 0);
  const advance = (dir: number) => {
    if (view === "show") {
      const s = visibleSlides[showIndex];
      const maxStep = Math.max(0, ...(s?.objects ?? []).filter((o) => o.animation).map((o) => o.animationOrder ?? 1), s?.titleAnimation ? 1 : 0, s?.bodyAnimation ? 2 : 0);
      if (dir > 0 && build < maxStep) { setBuild(build + 1); return; }
      onCommit({ kind: "command", id: dir > 0 ? "slideshow.next" : "slideshow.prev" });
      return;
    }
    const n = deck.slides[Math.max(0, Math.min(deck.slides.length - 1, idx + dir))];
    onSelect({ slide: n.id, selection: n.id });
  };

  const thumbMenu = (e: React.MouseEvent, s: PptSlide) => {
    e.preventDefault();
    onSelect({ slide: s.id, selection: s.id });
    const items: MenuItem[] = [
      { label: "Cut", icon: "cut", command: "home.cut" },
      { label: "Copy", icon: "copy", command: "home.copy" },
      { separator: true },
      { label: "New Slide", icon: "newSlide", command: "slides.new", value: "Title and Content" },
      { label: "Duplicate Slide", icon: "copy", command: "slides.duplicate" },
      { label: "Delete Slide", icon: "deleteCells", command: "slides.delete" },
      { label: "Add Section", icon: "section", dialog: "addSection" },
      { separator: true },
      ...LAYOUTS.slice(0, 7).map((l) => ({ label: `Layout: ${l}`, icon: "layout", command: "slides.layout", value: l })),
      { label: "Reset Slide", icon: "reset", command: "slides.reset" },
      { separator: true },
      { label: "Format Background...", icon: "background", dialog: "formatBackground" },
      { label: s.hidden ? "Unhide Slide" : "Hide Slide", icon: "close", command: "slides.hide" },
      { label: "New Comment", icon: "comment", dialog: "newComment" },
    ];
    onContextMenu(e.clientX, e.clientY, items);
  };

  const partMenu = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!ui.selection.split(",").includes(key)) onSelect({ selection: key, slide: key.split(".")[0] });
    const isObj = !["title", "subtitle", "body", "body2"].includes(key.split(".")[1] ?? "");
    const items: MenuItem[] = [
      { label: "Cut", icon: "cut", command: "home.cut" },
      { label: "Copy", icon: "copy", command: "home.copy" },
      { label: "Paste", icon: "paste", command: "home.paste" },
      { separator: true },
    ];
    if (isObj) {
      items.push(
        { label: "Bring to Front", icon: "bringForward", command: "object.bringToFront" },
        { label: "Send to Back", icon: "sendBackward", command: "object.sendToBack" },
        { label: "Group", icon: "groupObjects", command: "object.group" },
        { label: "Edit Alt Text...", icon: "altText", dialog: "altText" },
        { label: "Link", icon: "link", dialog: "link" },
        { separator: true },
      );
    } else {
      items.push({ label: "Font...", icon: "fontColor", dialog: "font" }, { label: "Paragraph...", icon: "lineSpacing", dialog: "paragraph" }, { label: "Convert to SmartArt", icon: "smartart", command: "home.convertSmartArt", value: "Basic Block List" }, { separator: true });
    }
    items.push({ label: "New Comment", icon: "comment", dialog: "newComment" });
    onContextMenu(e.clientX, e.clientY, items);
  };

  const thumbs = (
    <aside className="w-44 shrink-0 overflow-auto border-r border-gray-300 bg-[#f3f3f3] py-2" aria-label="Slide thumbnails">
      {deck.slides.map((s, i) => {
        const showSection = s.section && (i === 0 || deck.slides[i - 1].section !== s.section);
        const active = s.id === slide.id;
        return (
          <div key={s.id}>
            {showSection && <div className="px-2 pb-1 pt-2 text-[11px] font-semibold text-gray-600">▾ {s.section}</div>}
            <div
              draggable
              onDragStart={() => setDragFrom(s.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (dragFrom && dragFrom !== s.id) onCommit({ kind: "command", id: "slides.move", value: `${dragFrom}@${i + 1}` }); setDragFrom(null); }}
              onClick={() => { if (editRef.current) commitEdit(); onSelect({ slide: s.id, selection: s.id }); focusRef.current?.focus({ preventScroll: true }); }}
              onContextMenu={(e) => thumbMenu(e, s)}
              data-thumb={s.id}
              className="flex cursor-pointer gap-1.5 px-2 py-1.5"
            >
              <span className={`w-4 text-right text-[11px] ${s.hidden ? "text-gray-400 line-through" : "text-gray-600"}`}>{i + 1}</span>
              <div className={`border-2 ${active ? "border-[#c43e1c]" : "border-transparent hover:border-[#f4b183]"} ${s.hidden ? "opacity-50" : ""}`}>
                <SlideView deck={deck} slide={s} width={128} index={i} />
              </div>
              {s.transition && <span className="text-[10px] text-gray-500" title={`Transition: ${s.transition}`}>★</span>}
            </div>
          </div>
        );
      })}
    </aside>
  );

  /* ---------- views ---------- */

  if (view === "show" || view === "reading") {
    const s = view === "show" ? visibleSlides[Math.min(showIndex, visibleSlides.length - 1)] : slide;
    const i = deck.slides.findIndex((x) => x.id === s?.id);
    return (
      <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="flex h-full flex-col bg-black outline-none" onClick={() => view === "show" && advance(1)}>
        <div ref={mainRef} className="flex flex-1 items-center justify-center overflow-hidden p-2">
          {s && (
            <div key={`${s.id}-${build}`} className={s.transition && view === "show" ? "animate-[simfade_.6s_ease-out]" : ""}>
              <SlideView deck={deck} slide={s} width={fitW(16, 16)} index={i} buildStep={view === "show" ? build : undefined} />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between bg-black/80 px-3 py-1 text-[11px] text-white/70">
          <span>{view === "show" ? "Slide Show" : "Reading View"} · Slide {i + 1} of {deck.slides.length}</span>
          <span className="flex gap-2">
            <button type="button" onClick={(e) => { e.stopPropagation(); advance(-1); }} className="px-2 hover:text-white">◀</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); advance(1); }} className="px-2 hover:text-white">▶</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); onCommit({ kind: "command", id: view === "show" ? "slideshow.end" : "view.mode", value: view === "show" ? undefined : "Normal" }); }} className="px-2 hover:text-white">End (Esc)</button>
          </span>
        </div>
        <style>{"@keyframes simfade{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}"}</style>
      </div>
    );
  }

  if (view === "sorter") {
    return (
      <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="h-full overflow-auto bg-[#e7e7e7] p-4 outline-none">
        <div className="flex flex-wrap gap-4">
          {deck.slides.map((s, i) => (
            <div
              key={s.id}
              draggable
              onDragStart={() => setDragFrom(s.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (dragFrom && dragFrom !== s.id) onCommit({ kind: "command", id: "slides.move", value: `${dragFrom}@${i + 1}` }); setDragFrom(null); }}
              onClick={() => onSelect({ slide: s.id, selection: s.id })}
              onDoubleClick={() => onCommit({ kind: "command", id: "view.mode", value: "Normal" })}
              onContextMenu={(e) => thumbMenu(e, s)}
              data-thumb={s.id}
              className="cursor-pointer"
            >
              {s.section && (i === 0 || deck.slides[i - 1].section !== s.section) && <div className="mb-1 text-[11px] font-semibold text-gray-600">{s.section}</div>}
              <div className={`border-[3px] ${s.id === slide.id ? "border-[#c43e1c]" : "border-transparent"} ${s.hidden ? "opacity-50" : ""}`}>
                <SlideView deck={deck} slide={s} width={200} index={i} />
              </div>
              <div className="mt-1 flex justify-between text-[11px] text-gray-600">
                <span className={s.hidden ? "line-through" : ""}>{i + 1}</span>
                {s.transition && <span>★ {s.transition}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const pane = deck.pane;
  const showNotes = !deck.flags?.hideNotes && view !== "notes";

  return (
    <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="flex h-full outline-none">
      {view === "outline" ? (
        <aside className="w-60 shrink-0 overflow-auto border-r border-gray-300 bg-white p-2 text-[12px]">
          {deck.slides.map((s, i) => (
            <div key={s.id} className={`mb-2 cursor-pointer rounded p-1 ${s.id === slide.id ? "bg-[#fde9d9]" : ""}`} onClick={() => onSelect({ slide: s.id, selection: `${s.id}.title` })}>
              <div className="flex gap-2 font-semibold"><span className="text-gray-500">{i + 1}</span><Icon name="newSlide" size={14} />{s.title || "(untitled)"}</div>
              {(s.body ?? []).map((b, j) => <div key={j} className="pl-8 text-gray-700">• {b.replace(/^\t+/, "")}</div>)}
            </div>
          ))}
        </aside>
      ) : view === "master" ? (
        <aside className="w-44 shrink-0 overflow-auto border-r border-gray-300 bg-[#f3f3f3] py-2 text-[11px]">
          <div className="px-2 pb-1 font-semibold">Slide Master</div>
          {["Office Theme Slide Master", ...LAYOUTS.slice(0, 7)].map((l, i) => (
            <button key={l} type="button" onClick={() => onSelect({ selection: i === 0 ? "master.title" : "master.body" })} className={`mb-1 ${i ? "ml-4" : "ml-1"} block w-[85%] border-2 bg-white p-1 text-left ${i === 0 && ui.selection === "master.title" ? "border-[#c43e1c]" : "border-transparent"}`}>
              <div className="h-12 border border-gray-200 p-1" style={{ background: themeOf(deck).bg }}>
                <div className="h-2 w-2/3" style={{ background: deck.master?.titleColor ?? themeOf(deck).title }} />
              </div>
              <div className="truncate pt-0.5">{l}</div>
            </button>
          ))}
        </aside>
      ) : (
        thumbs
      )}

      <div className="flex min-w-0 flex-1 flex-col bg-[#e7e7e7]">
        <div ref={mainRef} className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-4" onMouseDown={() => { if (editRef.current) commitEdit(); }}>
          {view === "master" ? (
            <div className="bg-white shadow">
              <div
                onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: "master.title" }); }}
                className={`m-6 cursor-pointer border p-3 ${ui.selection === "master.title" ? "border-gray-600" : "border-dashed border-gray-300"}`}
                style={{ fontFamily: `'${deck.master?.titleFont ?? themeOf(deck).titleFont}', sans-serif`, color: deck.master?.titleColor ?? themeOf(deck).title, fontSize: 28, width: Math.min(mainW - 80, 700) }}
              >
                Click to edit Master title style
              </div>
              <div
                onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: "master.body" }); }}
                className={`m-6 cursor-pointer border p-3 text-[18px] ${ui.selection === "master.body" ? "border-gray-600" : "border-dashed border-gray-300"}`}
                style={{ fontFamily: `'${deck.master?.bodyFont ?? themeOf(deck).font}', sans-serif`, color: themeOf(deck).body, minHeight: 180 }}
              >
                • Click to edit Master text styles
                <div className="pl-6 text-[16px]">– Second level</div>
                <div className="pl-12 text-[14px]">• Third level</div>
              </div>
            </div>
          ) : view === "notes" ? (
            <div className="bg-white p-6 shadow" style={{ width: Math.min(mainW - 40, 620) }}>
              <SlideView deck={deck} slide={slide} width={Math.min(mainW - 88, 572)} index={idx} />
              <div
                onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: `${slide.id}.notes` }); }}
                onDoubleClick={() => setEditing({ key: `${slide.id}.notes`, text: slide.notes ?? "" })}
                className={`mt-4 min-h-[100px] border p-2 text-[13px] ${ui.selection === `${slide.id}.notes` ? "border-gray-600" : "border-dashed border-gray-300"}`}
              >
                {editing?.key === `${slide.id}.notes` ? <PartEditor multiline value={editing.text} onChange={(t) => setEditing({ key: `${slide.id}.notes`, text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} /> : slide.notes || <span className="text-gray-400">Click to add text</span>}
              </div>
            </div>
          ) : (
            <div className="shadow-[0_0_0_1px_#c8c8c8,0_2px_8px_rgba(0,0,0,.18)]">
              <SlideView
                deck={deck}
                slide={slide}
                width={fitW(40, 32) * Number(deck.flags?.zoom ?? 100) / 100}
                index={idx}
                interactive
                selection={ui.selection}
                editing={editing}
                onPart={(key, e) => selectPart(key, e)}
                onEditStart={(key) => { onSelect({ selection: key, slide: key.split(".")[0] }); setEditing({ key, text: textOf(key) }); }}
                onEditChange={(t) => setEditing({ key: editRef.current!.key, text: t })}
                onEditCommit={commitEdit}
                onEditCancel={() => setEditing(null)}
                onContext={partMenu}
                showBadges
              />
            </div>
          )}
        </div>
        {showNotes && view !== "master" && (
          <div
            onMouseDown={() => onSelect({ selection: `${slide.id}.notes` })}
            onDoubleClick={() => setEditing({ key: `${slide.id}.notes`, text: slide.notes ?? "" })}
            className={`h-16 shrink-0 cursor-text overflow-auto border-t border-gray-300 bg-white px-4 py-2 text-[12px] ${ui.selection === `${slide.id}.notes` ? "outline outline-1 outline-gray-500" : ""}`}
            aria-label="Notes"
          >
            {editing?.key === `${slide.id}.notes` ? (
              <PartEditor multiline value={editing.text} onChange={(t) => setEditing({ key: `${slide.id}.notes`, text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} />
            ) : slide.notes ? (
              slide.notes
            ) : (
              <span className="text-gray-400">Click to add notes</span>
            )}
          </div>
        )}
      </div>

      {pane && <PptPane deck={deck} ui={ui} pane={pane} onCommit={onCommit} openDialog={openDialog} onSelect={onSelect} />}
    </div>
  );
}

function PptPane({ deck, ui, pane, onCommit, openDialog, onSelect }: { deck: PptDeck; ui: CanvasProps<PptDeck>["ui"]; pane: string; onCommit: CanvasProps<PptDeck>["onCommit"]; openDialog: (id: string) => void; onSelect: CanvasProps<PptDeck>["onSelect"] }) {
  const slide = activeSlide(deck, ui)!;
  let title = pane;
  let body: React.ReactNode = <p className="text-gray-600">This feature is shown for practice.</p>;
  if (pane === "Designer") {
    title = "Designer";
    body = (
      <div className="space-y-3">
        <p className="text-gray-600">Design Ideas for this slide</p>
        {[1, 2, 3].map((n) => (
          <button key={n} type="button" onClick={() => onCommit({ kind: "command", id: "design.idea", value: `Design Idea ${n}` })} className="block w-full border border-gray-300 hover:border-[#c43e1c]" aria-label={`Design Idea ${n}`}>
            <div className="h-20 p-2" style={{ background: n === 1 ? "#1F3864" : n === 2 ? "linear-gradient(90deg,#c43e1c 0 30%,#fff 30%)" : "#F2F2F2" }}>
              <div className={`h-2.5 w-2/3 ${n === 1 ? "bg-white" : "bg-gray-700"}`} />
              <div className="mt-2 h-1.5 w-1/2 bg-gray-400" />
            </div>
          </button>
        ))}
      </div>
    );
  } else if (pane === "Spelling") {
    const s = deck.slides.find((x) => x.spell?.length);
    const w = s?.spell?.[0];
    body = w ? (
      <div className="space-y-2">
        <p className="text-[11px] uppercase text-gray-500">Spelling</p>
        <p className="text-[14px]"><span className="underline decoration-red-600 decoration-wavy">{w.word}</span></p>
        {w.suggestions.map((sg) => <button key={sg} type="button" onClick={() => onCommit({ kind: "command", id: "spelling.change", value: sg })} className="block w-full rounded border border-gray-300 px-2 py-1 text-left hover:bg-[#fde9d9]">{sg}</button>)}
        <button type="button" onClick={() => onCommit({ kind: "command", id: "spelling.ignore" })} className="text-[#c43e1c] hover:underline">Ignore Once</button>
      </div>
    ) : <p>Spelling check complete.</p>;
  } else if (pane === "Spelling: done") {
    title = "Spelling";
    body = <p>Spelling check complete. You&apos;re good to go!</p>;
  } else if (pane === "Comments") {
    body = (
      <div className="space-y-2">
        {(slide.comments ?? []).length === 0 && <p className="text-gray-500">No comments on this slide.</p>}
        {(slide.comments ?? []).map((c, i) => <div key={i} className="rounded border border-gray-300 p-2"><b>{c.author}</b><p>{c.text}</p></div>)}
        <button type="button" onClick={() => openDialog("newComment")} className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-50">+ New</button>
      </div>
    );
  } else if (pane === "Animation Pane") {
    const items: { label: string; anim: string; order: number; key: string }[] = [];
    if (slide.titleAnimation) items.push({ label: `Title: ${slide.title ?? ""}`, anim: slide.titleAnimation, order: 1, key: `${slide.id}.title` });
    if (slide.bodyAnimation) items.push({ label: "Content Placeholder", anim: slide.bodyAnimation, order: 2, key: `${slide.id}.body` });
    (slide.objects ?? []).filter((o) => o.animation).forEach((o) => items.push({ label: o.label ?? o.id, anim: o.animation!, order: o.animationOrder ?? 1, key: `${slide.id}.${o.id}` }));
    items.sort((a, b) => a.order - b.order);
    body = items.length ? (
      <div className="space-y-1">
        {items.map((it) => (
          <button key={it.key} type="button" onClick={() => onSelect({ selection: it.key })} className={`flex w-full items-center gap-2 rounded px-1 py-1 text-left ${ui.selection === it.key ? "bg-[#fde9d9]" : "hover:bg-gray-50"}`}>
            <span className="w-4 text-gray-500">{it.order}</span>
            <span className="text-emerald-700">★</span>
            <span className="flex-1 truncate">{it.label}</span>
            <span className="text-[10px] text-gray-500">{it.anim}</span>
          </button>
        ))}
      </div>
    ) : <p className="text-gray-500">No animations on this slide.</p>;
  } else if (pane === "Accessibility") {
    const missing = deck.slides.flatMap((s, i) => (s.objects ?? []).filter((o) => (o.kind === "image" || o.kind === "chart" || o.kind === "smartart") && !o.alt).map((o) => ({ s: i + 1, o })));
    const untitled = deck.slides.map((s, i) => ({ s, i })).filter(({ s }) => !s.title && s.layout !== "Blank");
    body = missing.length + untitled.length === 0 ? <p className="text-emerald-700">No accessibility issues found.</p> : (
      <div className="space-y-2">
        {missing.map(({ s, o }) => <button key={`${s}${o.id}`} type="button" onClick={() => openDialog("altText")} className="block w-full rounded border border-red-200 bg-red-50 px-2 py-1 text-left">Missing alternative text: {o.label} (Slide {s})</button>)}
        {untitled.map(({ i }) => <p key={i} className="rounded border border-amber-200 bg-amber-50 px-2 py-1">Missing slide title: Slide {i + 1}</p>)}
      </div>
    );
  } else if (pane.startsWith("Replace")) {
    title = "Replace";
    body = <p>{pane.replace("Replace: ", "")} made.</p>;
  } else if (pane === "Thesaurus" || pane === "Search" || pane === "Translator" || pane === "Help" || pane === "Find") {
    body = <p className="text-gray-700">{pane === "Find" ? `Searching ${deck.slides.length} slides: ${deck.slides.map(slideText).join(" ").length} characters of text.` : "Results for the selected text appear here."}</p>;
  }
  return (
    <aside className="flex w-60 shrink-0 flex-col border-l border-gray-300 bg-white text-[12px]">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-[13px]">{title}</span>
        <button type="button" aria-label={`Close ${title}`} onClick={() => onCommit({ kind: "command", id: "pane.close" })} className="px-1 hover:bg-gray-100">✕</button>
      </div>
      <div className="flex-1 overflow-auto p-3">{body}</div>
    </aside>
  );
}

export function PptStatusBar({ doc: deck, ui, onCommit }: StatusBarProps<PptDeck>) {
  const slide = activeSlide(deck, ui);
  const idx = deck.slides.findIndex((s) => s.id === slide?.id);
  const zoom = Number(deck.flags?.zoom ?? 100);
  const views: [string, string, string][] = [
    ["Normal", "normalView", "normal"],
    ["Slide Sorter", "sorter", "sorter"],
    ["Reading View", "readMode", "reading"],
  ];
  return (
    <div className="flex h-6 shrink-0 items-center gap-4 border-t border-gray-300 bg-[#f3f3f3] px-3 text-[11px] text-gray-700">
      <span>Slide {idx + 1} of {deck.slides.length}</span>
      <span className="hidden sm:inline">English (United States)</span>
      {deck.flags?.lastAction && <span className="hidden text-gray-500 sm:inline">Last action: {String(deck.flags.lastAction)}</span>}
      <span className="flex-1" />
      <button type="button" onClick={() => onCommit({ kind: "command", id: "view.notes" })} className="hover:bg-gray-200">Notes</button>
      <button type="button" onClick={() => onCommit({ kind: "command", id: "review.showComments" })} className="hover:bg-gray-200">Comments</button>
      <span className="flex items-center gap-1">
        {views.map(([v, icon, key]) => (
          <button key={v} type="button" title={v} aria-label={v} onClick={() => onCommit({ kind: "command", id: "view.mode", value: v })} className={`rounded p-0.5 hover:bg-gray-200 ${(deck.view ?? "normal") === key ? "bg-gray-300" : ""}`}>
            <Icon name={icon} size={14} />
          </button>
        ))}
        <button type="button" title="Slide Show" aria-label="Slide Show" onClick={() => onCommit({ kind: "command", id: "slideshow.fromCurrent" })} className="rounded p-0.5 hover:bg-gray-200">
          <Icon name="slideShow" size={14} />
        </button>
      </span>
      <span className="flex items-center gap-1">
        <button type="button" aria-label="Zoom out" onClick={() => onCommit({ kind: "command", id: "view.zoom", value: String(Math.max(40, zoom - 10)) })} className="px-1 hover:bg-gray-200">−</button>
        <input type="range" aria-label="Zoom" min={40} max={150} step={10} value={zoom} onChange={(e) => onCommit({ kind: "command", id: "view.zoom", value: e.target.value })} className="h-1 w-20 accent-gray-600" />
        <button type="button" aria-label="Zoom in" onClick={() => onCommit({ kind: "command", id: "view.zoom", value: String(Math.min(150, zoom + 10)) })} className="px-1 hover:bg-gray-200">+</button>
        <span className="w-9 text-right">{zoom}%</span>
      </span>
    </div>
  );
}
