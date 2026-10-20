"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PptDeck, PptObject, PptSlide, SimCommit, TextProps } from "@/types/sim";
import { Icon } from "../../chrome/icons";
import { ANIMATIONS, EXITS, animSequence, themeOf, type PptTheme } from "./model";
import { bulletGlyph, clock, isContentPart, layoutBoxes, mediaLength, numberMarker, ox, readMaster, sx, type BodyPropsX, type Part } from "./ext";

const PLACEHOLDER: Record<Part, string> = { title: "Click to add title", subtitle: "Click to add subtitle", body: "Click to add text", body2: "Click to add text" };
export const PAL = ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47"];

export function textStyle(p: (TextProps & { align?: string }) | undefined, base: { font: string; size: number; color: string; align?: string }): React.CSSProperties {
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

/** Clip path or radius for a shape, by its kind and its gallery name. */
export function shapeCss(o: { shape?: string; label?: string }): React.CSSProperties {
  const l = o.label ?? "";
  if (/Diamond|Decision/.test(l)) return { clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" };
  if (/Triangle/.test(l)) return { clipPath: "polygon(50% 0,100% 100%,0 100%)" };
  if (/Folded Corner/.test(l)) return { clipPath: "polygon(0 0,100% 0,100% 78%,82% 100%,0 100%)" };
  if (/Heart/.test(l)) return { clipPath: "polygon(50% 100%,8% 58%,0 36%,4% 14%,20% 2%,38% 4%,50% 18%,62% 4%,80% 2%,96% 14%,100% 36%,92% 58%)" };
  if (/Sun/.test(l)) return { clipPath: "polygon(50% 0,58% 22%,79% 9%,74% 32%,98% 32%,80% 48%,98% 66%,74% 66%,79% 90%,58% 77%,50% 100%,42% 77%,21% 90%,26% 66%,2% 66%,20% 48%,2% 32%,26% 32%,21% 9%,42% 22%)" };
  switch (o.shape) {
    case "oval": return { borderRadius: "50%" };
    case "rounded": return { borderRadius: 18 };
    case "arrow": return { clipPath: "polygon(0 25%, 65% 25%, 65% 0, 100% 50%, 65% 100%, 65% 75%, 0 75%)" };
    case "star": return { clipPath: "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" };
    case "callout": return { borderRadius: 12 };
  }
  if (/Oval/.test(l)) return { borderRadius: "50%" };
  if (/Rounded/.test(l)) return { borderRadius: 18 };
  return {};
}

function effectCss(effect: string | undefined, accent: string): React.CSSProperties {
  if (!effect) return {};
  if (/Shadow|Intense/.test(effect)) return { boxShadow: "0 8px 16px rgba(0,0,0,.35)" };
  if (/Glow/.test(effect)) return { boxShadow: `0 0 16px 6px ${accent}aa` };
  if (/Soft Edges/.test(effect)) return { boxShadow: "inset 0 0 18px 10px rgba(255,255,255,.75)" };
  if (/Reflection/.test(effect)) return { WebkitBoxReflect: "below 4px linear-gradient(transparent 60%, rgba(255,255,255,.35))" } as React.CSSProperties;
  if (/Bevel|3-D/.test(effect)) return { boxShadow: "inset 3px 3px 6px rgba(255,255,255,.55), inset -3px -3px 6px rgba(0,0,0,.3)" };
  return {};
}

function pictureFilter(o: PptObject): string | undefined {
  const fx = ox(o).fx ?? {};
  const legacy = o.style ?? "";
  const f: string[] = [];
  const corr = fx.corrections ?? (/^corrections:/.test(legacy) ? legacy : "");
  const bm = /Brightness: ([+-]?\d+)%/.exec(corr);
  const cm = /Contrast: ([+-]?\d+)%/.exec(corr);
  if (bm) f.push(`brightness(${1 + Number(bm[1]) / 100})`);
  if (cm) f.push(`contrast(${1 + Number(cm[1]) / 100})`);
  if (/Sharpen/.test(corr)) f.push("contrast(1.08)");
  if (/Soften/.test(corr)) f.push("blur(0.6px)");
  const col = fx.color ?? (/^color:/.test(legacy) ? legacy : "");
  if (/Grayscale|Saturation: 0%/.test(col)) f.push("grayscale(1)");
  if (/Saturation: 200%/.test(col)) f.push("saturate(2)");
  if (/Sepia/.test(col)) f.push("sepia(1)");
  if (/Washout/.test(col)) f.push("opacity(.55)");
  if (/Black and White/.test(col)) f.push("grayscale(1) contrast(3)");
  const art = fx.artistic ?? (/^artistic:/.test(legacy) ? legacy : "");
  if (/Blur/.test(art)) f.push("blur(1.5px)");
  if (/Pencil Sketch/.test(art)) f.push("grayscale(1) contrast(1.6) brightness(1.2)");
  if (/Paint Brush|Watercolor/.test(art)) f.push("saturate(1.6) contrast(1.1)");
  if (/Glow Edges/.test(art)) f.push("invert(.85) hue-rotate(180deg)");
  return f.length ? f.join(" ") : undefined;
}

function frameCss(style: string, border?: string): React.CSSProperties {
  const css: React.CSSProperties = {};
  if (/Frame, White|Simple Frame, White/.test(style)) Object.assign(css, { border: "10px solid #fff", outline: "1px solid #bbb", boxShadow: "0 3px 8px rgba(0,0,0,.25)" });
  if (/Frame, Black/.test(style)) Object.assign(css, { border: "10px solid #111" });
  if (/Metal Frame|Monitor/.test(style)) Object.assign(css, { border: "10px solid #8a8a8a", boxShadow: "inset 0 0 0 2px #ddd" });
  if (/Drop Shadow|Shadow Rectangle/.test(style)) css.boxShadow = "0 12px 22px rgba(0,0,0,.42)";
  if (/Rounded/.test(style)) css.borderRadius = 22;
  if (/Oval/.test(style)) css.borderRadius = "50%";
  if (/Soft Edge/.test(style)) css.boxShadow = "inset 0 0 22px 12px rgba(255,255,255,.85)";
  if (/Reflected/.test(style)) (css as Record<string, string>).WebkitBoxReflect = "below 4px linear-gradient(transparent 60%, rgba(255,255,255,.35))";
  if (/Bevel/.test(style)) css.boxShadow = "inset 4px 4px 8px rgba(255,255,255,.6), inset -4px -4px 8px rgba(0,0,0,.35), 0 6px 12px rgba(0,0,0,.3)";
  if (border && border !== "No Outline") css.border = `4px solid ${border}`;
  return css;
}

/* ------------------------------------------------------------------ */
/* Media playback bar                                                  */
/* ------------------------------------------------------------------ */

export function MediaBar({ o, onCommit }: { o: PptObject; onCommit?: (c: SimCommit) => void }) {
  const len = mediaLength(o);
  const m = ox(o).media ?? {};
  const start = m.trimStart ?? 0;
  const end = m.trimEnd ?? len;
  const [pos, setPos] = useState(m.position ?? start);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { if (!playing) setPos(m.position ?? start); }, [m.position, start, playing]);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPos((p) => {
      if (p + 1 >= end) { setPlaying(false); onCommit?.({ kind: "command", id: "media.seek", value: m.rewind ? start : end }); return m.rewind ? start : end; }
      return p + 1;
    }), 1000);
    return () => clearInterval(t);
  }, [playing, end, start, m.rewind, onCommit]);
  const seek = (s: number) => {
    const v = Math.max(start, Math.min(end, Math.round(s)));
    setPos(v);
    onCommit?.({ kind: "command", id: "media.seek", value: v });
  };
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  return (
    <div className="absolute inset-x-0 top-full mt-1 flex items-center gap-1 rounded bg-white/95 px-1 py-0.5 text-[13px] text-gray-800 shadow" onMouseDown={stop} onDoubleClick={stop} onContextMenu={stop}>
      <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={() => { if (playing) { setPlaying(false); seek(pos); } else setPlaying(true); }} className="w-7 rounded px-1 hover:bg-gray-200">{playing ? "❚❚" : "▶"}</button>
      <button type="button" aria-label="Move Back 1 Second" onClick={() => seek(pos - 1)} className="rounded px-1 hover:bg-gray-200">◀◀</button>
      <button type="button" aria-label="Move Forward 1 Second" onClick={() => seek(pos + 1)} className="rounded px-1 hover:bg-gray-200">▶▶</button>
      <div
        role="slider"
        aria-label="Playback position"
        aria-valuemin={0}
        aria-valuemax={len}
        aria-valuenow={pos}
        tabIndex={0}
        onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * len); }}
        className="relative h-3 flex-1 cursor-pointer rounded bg-gray-300"
      >
        <div className="absolute inset-y-0 bg-gray-400/60" style={{ left: 0, width: `${(start / len) * 100}%` }} />
        <div className="absolute inset-y-0 bg-gray-400/60" style={{ left: `${(end / len) * 100}%`, right: 0 }} />
        <div className="absolute inset-y-0 left-0 rounded bg-[#c43e1c]" style={{ width: `${(pos / len) * 100}%` }} />
      </div>
      <span className="w-20 text-right tabular-nums">{clock(pos)} / {clock(len)}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Objects                                                             */
/* ------------------------------------------------------------------ */

interface ObjectCtx {
  theme: PptTheme;
  interactive?: boolean;
  slideId: string;
  selection: Set<string>;
  editing?: { key: string; text: string } | null;
  onPart?: (key: string, e: React.MouseEvent) => void;
  onEditStart?: (key: string) => void;
  editor?: (key: string, multiline: boolean, tabMode?: "indent" | "cell") => React.ReactNode;
}

function tableStyleColors(style: string | undefined, accent: string) {
  const m = /Accent (\d)/.exec(style ?? "");
  const a = m ? ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47"][Number(m[1]) - 1] : accent;
  if (/Light/.test(style ?? "")) return { head: "#ffffff", headText: a, band: `${a}22`, plain: "#ffffff", border: a };
  if (/Dark/.test(style ?? "")) return { head: "#000000", headText: "#ffffff", band: `${a}cc`, plain: a, border: "#ffffff", text: "#ffffff" };
  if (/Themed/.test(style ?? "")) return { head: a, headText: "#ffffff", band: `${a}33`, plain: "#ffffff", border: a };
  return { head: a, headText: "#ffffff", band: `${a}40`, plain: `${a}1f`, border: "#ffffff" };
}

function TableBody({ o, ctx }: { o: PptObject; ctx: ObjectCtx }) {
  const rows = o.rows ?? [];
  const t = ox(o).table ?? {};
  const header = t.headerRow ?? true;
  const banded = t.bandedRows ?? true;
  const colors = tableStyleColors(ox(o).fx?.style ?? (o.style?.startsWith("style:") ? o.style.slice(6) : o.style), ctx.theme.accent);
  const spans = new Map<string, { rs: number; cs: number }>();
  const covered = new Set<string>();
  for (const mg of t.merges ?? []) {
    const m = /^r(\d+)c(\d+):r(\d+)c(\d+)$/.exec(mg);
    if (!m) continue;
    const [r1, c1, r2, c2] = m.slice(1).map(Number);
    spans.set(`r${r1}c${c1}`, { rs: r2 - r1 + 1, cs: c2 - c1 + 1 });
    for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) if (r !== r1 || c !== c1) covered.add(`r${r}c${c}`);
  }
  const cols = rows[0]?.length ?? 1;
  return (
    <table className="h-full w-full border-collapse text-[18px]" style={{ fontFamily: `'${ctx.theme.font}', sans-serif`, tableLayout: t.distributed ? "fixed" : undefined }}>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) => {
              const ck = `r${i + 1}c${j + 1}`;
              if (covered.has(ck)) return null;
              const span = spans.get(ck);
              const key = `${ctx.slideId}.${o.id}.${ck}`;
              const isHead = header && i === 0;
              const isTotal = t.totalRow && i === rows.length - 1;
              const firstCol = t.firstColumn && j === 0;
              const lastCol = t.lastColumn && j === cols - 1;
              const band = banded ? (i - (header ? 1 : 0)) % 2 === 0 : false;
              const bandCol = t.bandedColumns && j % 2 === 0;
              const selected = ctx.selection.has(key);
              return (
                <td
                  key={j}
                  rowSpan={span?.rs}
                  colSpan={span?.cs}
                  onMouseDown={ctx.interactive ? (e) => { e.stopPropagation(); ctx.onPart?.(key, e); } : undefined}
                  onDoubleClick={ctx.interactive ? (e) => { e.stopPropagation(); ctx.onEditStart?.(key); } : undefined}
                  className="border px-2 py-1"
                  style={{
                    borderColor: colors.border,
                    background: selected ? "#9ec5ee" : isHead ? colors.head : band || bandCol ? colors.band : colors.plain,
                    color: isHead ? colors.headText : colors.text ?? "#000",
                    fontWeight: isHead || isTotal || firstCol || lastCol ? 700 : 400,
                    borderTop: isTotal ? `3px double ${colors.head}` : undefined,
                    textAlign: (t.align?.[ck] ?? "left") as React.CSSProperties["textAlign"],
                    verticalAlign: t.valign === "Center Vertically" ? "middle" : t.valign === "Align Bottom" ? "bottom" : "top",
                  }}
                >
                  {ctx.editing?.key === key ? ctx.editor?.(key, false, "cell") : cell || " "}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ChartBody({ o, ctx }: { o: PptObject; ctx: ObjectCtx }) {
  const s = o.series ?? [];
  // Charts placed in a deck by hand carry no element settings: show them clean (no title, no legend).
  const ch = ox(o).chart ?? { showTitle: false, legend: null, gridlines: true };
  const type = o.label ?? "";
  const palette = /Monochromatic/.test(ox(o).fx?.color ?? "") ? ["#1F3864", "#2F5597", "#4472C4", "#8FAADC", "#B4C7E7", "#DAE3F3"] : /Palette 2/.test(ox(o).fx?.color ?? "") ? ["#ED7D31", "#A5A5A5", "#FFC000", "#4472C4", "#70AD47", "#5B9BD5"] : PAL;
  const max = Math.max(1, ...s.map((x) => x.value));
  const fmt = (v: number) => (Math.abs(v) >= 1000 ? v.toLocaleString("en-US") : String(v));
  const titleKey = `${ctx.slideId}.${o.id}.title`;
  const legend = ch.legend ?? null;
  const labels = ch.dataLabels ?? null;
  const styleN = Number((ox(o).fx?.style ?? "").replace(/\D/g, "")) || 1;
  const bg = styleN >= 7 ? "#262626" : "#ffffff";
  const ink = styleN >= 7 ? "#f2f2f2" : "#595959";
  const title = ch.showTitle !== false ? (
    <div
      className="mb-1 text-center text-[20px]"
      style={{ color: ink }}
      onDoubleClick={ctx.interactive ? (e) => { e.stopPropagation(); ctx.onEditStart?.(titleKey); } : undefined}
    >
      {ctx.editing?.key === titleKey ? ctx.editor?.(titleKey, false) : ch.title ?? "Chart Title"}
    </div>
  ) : null;
  const legendEl = legend ? (
    <div className={`flex ${legend === "Right" || legend === "Left" ? "flex-col justify-center" : "justify-center"} gap-3 px-2 text-[14px]`} style={{ color: ink }}>
      {/Pie|Doughnut/.test(type)
        ? s.map((x, i) => <span key={i} className="flex items-center gap-1"><span className="h-3 w-3" style={{ background: palette[i % palette.length] }} />{x.label}</span>)
        : <span className="flex items-center gap-1"><span className="h-3 w-3" style={{ background: palette[0] }} />{ch.seriesName ?? "Series 1"}</span>}
    </div>
  ) : null;
  let plot: React.ReactNode;
  if (/Pie|Doughnut/.test(type)) {
    const total = s.reduce((a, b) => a + b.value, 0) || 1;
    let acc = 0;
    const stops = s.map((x, i) => { const a = (acc / total) * 100; acc += x.value; return `${palette[i % palette.length]} ${a}% ${(acc / total) * 100}%`; }).join(",");
    plot = (
      <div className="flex flex-1 items-center justify-center">
        <div className="relative aspect-square h-[90%] rounded-full" style={{ background: `conic-gradient(${stops})` }}>
          {/Doughnut/.test(type) && <div className="absolute inset-[28%] rounded-full" style={{ background: bg }} />}
          {labels && s.map((x, i) => {
            const before = s.slice(0, i).reduce((a, b) => a + b.value, 0) + x.value / 2;
            const ang = (before / total) * Math.PI * 2 - Math.PI / 2;
            return <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 text-[14px] font-semibold text-white" style={{ left: `${50 + 34 * Math.cos(ang)}%`, top: `${50 + 34 * Math.sin(ang)}%` }}>{fmt(x.value)}</span>;
          })}
        </div>
      </div>
    );
  } else if (/Bar/.test(type)) {
    plot = (
      <div className="flex flex-1 flex-col justify-around border-l border-gray-300 py-2 pr-6">
        {s.map((x, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-20 shrink-0 truncate text-right text-[13px]" style={{ color: ink }}>{x.label}</span>
            <div className="h-5" style={{ width: `${(x.value / max) * 80}%`, background: palette[0] }} />
            {labels && <span className="text-[13px]" style={{ color: ink }}>{fmt(x.value)}</span>}
          </div>
        ))}
      </div>
    );
  } else {
    const line = /Line|Area/.test(type);
    plot = (
      <div className="relative flex flex-1 flex-col">
        <div className="relative flex flex-1 items-end gap-4 border-b border-gray-300 px-4">
          {ch.gridlines !== false && [0.25, 0.5, 0.75, 1].map((g) => <div key={g} className="pointer-events-none absolute inset-x-0 border-t border-gray-200" style={{ bottom: `${g * 90}%` }} />)}
          {!line && s.map((x, i) => (
            <div key={i} className="relative flex h-full flex-1 flex-col items-center justify-end">
              {labels && <span className="mb-0.5 text-[13px]" style={{ color: ink, marginBottom: labels === "Inside End" || labels === "Center" || labels === "Inside Base" ? undefined : 2 }}>{labels === "Outside End" ? fmt(x.value) : ""}</span>}
              <div className="relative flex w-3/5 items-start justify-center" style={{ height: `${(x.value / max) * 88}%`, background: /Stacked/.test(type) ? palette[i % palette.length] : palette[0] }}>
                {labels && labels !== "Outside End" && <span className="absolute text-[13px] text-white" style={{ top: labels === "Inside End" ? 2 : labels === "Center" ? "45%" : undefined, bottom: labels === "Inside Base" ? 2 : undefined }}>{fmt(x.value)}</span>}
              </div>
            </div>
          ))}
          {line && (
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/Area/.test(type) && <polygon fill={`${palette[0]}66`} points={`0,100 ${s.map((x, i) => `${(i + 0.5) * (100 / s.length)},${100 - (x.value / max) * 88}`).join(" ")} 100,100`} />}
              <polyline fill="none" stroke={palette[0]} strokeWidth="2" vectorEffect="non-scaling-stroke" points={s.map((x, i) => `${(i + 0.5) * (100 / s.length)},${100 - (x.value / max) * 88}`).join(" ")} />
            </svg>
          )}
          {line && labels && s.map((x, i) => <span key={i} className="absolute text-[13px]" style={{ color: ink, left: `${(i + 0.5) * (100 / s.length)}%`, bottom: `${(x.value / max) * 88 + 2}%`, transform: "translateX(-50%)" }}>{fmt(x.value)}</span>)}
        </div>
        <div className="flex justify-around px-4 pt-1 text-[13px]" style={{ color: ink }}>{s.map((x, i) => <span key={i}>{x.label}</span>)}</div>
        {ch.axisTitles && <div className="text-center text-[12px]" style={{ color: ink }}>Axis Title</div>}
      </div>
    );
  }
  const side = legend === "Right" || legend === "Left";
  return (
    <div className="flex h-full w-full flex-col p-3" style={{ background: bg }}>
      {legend === "Top" && legendEl}
      {title}
      <div className={`flex min-h-0 flex-1 ${side ? "flex-row" : "flex-col"}`}>
        {legend === "Left" && legendEl}
        {plot}
        {legend === "Right" && legendEl}
      </div>
      {legend === "Bottom" && <div className="pt-1">{legendEl}</div>}
    </div>
  );
}

function smartArtFill(o: PptObject, theme: PptTheme, i: number): string {
  const c = ox(o).fx?.color ?? (o.style?.startsWith("colors:") ? o.style.slice(7) : "");
  if (/Colorful - Accent|Colorful Range/.test(c)) return PAL[(i + (/2 to 3/.test(c) ? 1 : /4 to 5/.test(c) ? 3 : 0)) % PAL.length];
  const m = /Accent (\d)/.exec(c);
  if (m) return PAL[Number(m[1]) - 1] ?? theme.accent;
  if (/Dark 2/.test(c)) return "#44546A";
  return theme.accent;
}
function smartArtShade(o: PptObject): React.CSSProperties {
  const st = ox(o).fx?.style ?? "";
  if (/Polished|Inset|Cartoon|Powder|Brick|Sunset/.test(st)) return { backgroundImage: "linear-gradient(180deg, rgba(255,255,255,.45), rgba(255,255,255,0) 50%, rgba(0,0,0,.18))", boxShadow: "0 6px 10px rgba(0,0,0,.35)" };
  if (/Intense|Moderate/.test(st)) return { boxShadow: "0 5px 9px rgba(0,0,0,.3)" };
  if (/White Outline/.test(st)) return { outline: "2px solid #fff", outlineOffset: -4 };
  return {};
}

function SmartArtBody({ o, theme }: { o: PptObject; theme: PptTheme }) {
  const items = o.items ?? [];
  const layout = o.label ?? o.style ?? "";
  const fill = (i: number) => smartArtFill(o, theme, i);
  const shade = smartArtShade(o);
  if (/Process/.test(layout)) {
    const up = /Step Up/.test(layout);
    return (
      <div className={`flex h-full w-full ${up ? "items-end" : "items-center"} justify-center gap-2`}>
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2" style={up ? { marginBottom: `${i * 6}%` } : undefined}>
            <div className="flex h-24 w-36 items-center justify-center rounded p-2 text-center text-[17px] text-white" style={{ background: fill(i), ...shade }}>{t}</div>
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
            <div key={i} className="absolute flex h-20 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-2 text-center text-[15px] text-white" style={{ left: `${50 + 34 * Math.cos(a)}%`, top: `${50 + 38 * Math.sin(a)}%`, background: fill(i), ...shade }}>
              {t}
            </div>
          );
        })}
      </div>
    );
  }
  if (/Venn/.test(layout)) {
    return (
      <div className="relative h-full w-full">
        {items.slice(0, 3).map((t, i) => (
          <div key={i} className="absolute flex h-[60%] w-[34%] items-center justify-center rounded-full p-4 text-center text-[16px] text-white" style={{ left: `${18 + i * 22}%`, top: i === 1 ? "8%" : "30%", background: `${fill(i)}bb` }}>{t}</div>
        ))}
      </div>
    );
  }
  if (/Vertical/.test(layout)) {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-2">
        {items.map((t, i) => <div key={i} className="rounded px-4 py-2 text-[18px] text-white" style={{ background: fill(i), ...shade }}>{t}</div>)}
      </div>
    );
  }
  if (/Hierarchy/.test(layout)) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="rounded px-6 py-3 text-[18px] text-white" style={{ background: fill(0), ...shade }}>{items[0]}</div>
        <div className="flex gap-4">{items.slice(1).map((t, i) => <div key={i} className="rounded px-4 py-2 text-[16px] text-white" style={{ background: fill(i + 1), ...shade }}>{t}</div>)}</div>
      </div>
    );
  }
  return (
    <div className="grid h-full w-full grid-cols-3 content-center gap-3">
      {items.map((t, i) => <div key={i} className="flex h-24 items-center justify-center rounded p-2 text-center text-[17px] text-white" style={{ background: fill(i), ...shade }}>{t}</div>)}
    </div>
  );
}

export function ObjectBody({ o, ctx, onMedia }: { o: PptObject; ctx: ObjectCtx; onMedia?: (c: SimCommit) => void }) {
  const theme = ctx.theme;
  const fx = ox(o).fx ?? {};
  const legacy = o.style ?? "";
  if (o.kind === "image") {
    const style = fx.style ?? (legacy.startsWith("style:") ? legacy : "");
    const border = fx.border ?? (legacy.startsWith("border:") ? legacy.split(":")[1] : undefined);
    const crop = fx.cropShape ? shapeCss({ label: fx.cropShape, shape: /Oval/.test(fx.cropShape) ? "oval" : undefined }) : {};
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sky-200 to-emerald-200 text-center"
        style={{
          ...frameCss(style, border),
          ...effectCss(fx.effects ?? ox(o).effect, theme.accent),
          ...crop,
          filter: pictureFilter(o),
          clipPath: crop.clipPath ?? (o.crop ? "inset(8% 8% 8% 8%)" : undefined),
          containerType: "size",
        }}
      >
        {/* Icon and file name shrink with the picture so a small logo is not clipped. */}
        <span style={{ fontSize: "min(44px, 42cqh)", lineHeight: 1.1 }}>{fx.artistic === "Background Removed" ? "🧍" : o.glyph ?? "🖼️"}</span>
        <span className="max-w-full truncate px-2 text-gray-700" style={{ fontSize: "min(15px, 16cqh)" }}>{o.label}</span>
      </div>
    );
  }
  if (o.kind === "video") {
    const m = ox(o).media ?? {};
    const style = m.style ?? fx.style ?? "";
    const poster = typeof m.poster === "number" ? `Poster frame: ${clock(m.poster)}` : m.poster ? "Poster frame: image" : "";
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-black text-white/80" style={{ ...frameCss(style, fx.border), ...effectCss(fx.effects, theme.accent), ...(fx.cropShape ? shapeCss({ label: fx.cropShape }) : {}) }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={poster ? { background: "linear-gradient(135deg,#2f6f8f,#88b9a0)" } : undefined}>
          <span className="text-5xl">▶</span>
          <span className="mt-2 px-2 text-center text-sm text-white/80">{o.label}</span>
          {poster && <span className="mt-1 rounded bg-black/40 px-2 text-[12px] text-white">{poster}</span>}
        </div>
        {ctx.interactive && ctx.selection.has(`${ctx.slideId}.${o.id}`) && <MediaBar o={o} onCommit={onMedia} />}
      </div>
    );
  }
  if (o.kind === "audio") {
    return (
      <div className="relative flex h-full w-full items-center justify-center text-5xl">
        🔊
        {ctx.interactive && ctx.selection.has(`${ctx.slideId}.${o.id}`) && <div className="absolute left-1/2 top-full w-[420px] -translate-x-1/2"><div className="relative"><MediaBar o={o} onCommit={onMedia} /></div></div>}
      </div>
    );
  }
  if (o.kind === "icon") return <div className="flex h-full w-full items-center justify-center" style={{ fontSize: 60, color: o.color ?? theme.accent }}>{o.glyph ?? "★"}</div>;
  if (o.kind === "table") return <div className={`h-full w-full ${ctx.interactive ? "p-[3px]" : ""}`}><TableBody o={o} ctx={ctx} /></div>;
  if (o.kind === "chart") return <ChartBody o={o} ctx={ctx} />;
  if (o.kind === "smartart") {
    const key = `${ctx.slideId}.${o.id}`;
    if (ctx.editing?.key === key) return <div className="h-full w-full bg-white/90 p-2 text-[18px]">{ctx.editor?.(key, true)}</div>;
    return <SmartArtBody o={o} theme={theme} />;
  }
  // shape / textbox
  const isShape = o.kind === "shape";
  const weight = ox(o).outlineWeight;
  const outline = o.color && o.color !== "transparent" && o.color !== "No Outline" ? `${Math.max(1, Math.round((weight ?? 2.25) * 1.333))}px solid ${o.color}` : weight && isShape ? `${Math.max(1, Math.round(weight * 1.333))}px solid #2f528f` : undefined;
  const key = `${ctx.slideId}.${o.id}`;
  return (
    <div
      className="flex h-full w-full items-center justify-center whitespace-pre-wrap p-2 text-center"
      style={{
        background: isShape ? (o.fill === "transparent" ? "transparent" : o.fill ?? theme.accent) : undefined,
        border: outline,
        color: isShape ? "#fff" : theme.body,
        ...shapeCss(o),
        ...textStyle(o.props, { font: theme.font, size: isShape ? 18 : 20, color: isShape ? "#fff" : theme.body, align: isShape ? "center" : "left" }),
        justifyContent: o.props?.align === "left" ? "flex-start" : o.props?.align === "right" ? "flex-end" : isShape ? "center" : "flex-start",
        ...effectCss(ox(o).effect ?? (/^style:.*Intense/.test(legacy) ? "Shadow" : undefined), theme.accent),
      }}
    >
      {ctx.editing?.key === key ? ctx.editor?.(key, true) : o.text}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Slide                                                               */
/* ------------------------------------------------------------------ */

export interface SlideViewProps {
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
  onEditCommit?: (next?: "tab" | "shiftTab") => void;
  onEditCancel?: () => void;
  onContext?: (e: React.MouseEvent, key: string) => void;
  /** Drag a paragraph of a placeholder onto another paragraph. */
  onLineDrop?: (from: string, to: number) => void;
  /** Click one of the Insert icons inside an empty content placeholder. */
  onInsertIcon?: (part: string, dialog: string) => void;
  /** Chart Elements (+) button beside a selected chart. */
  onChartButton?: (key: string, e: React.MouseEvent) => void;
  onMedia?: (c: SimCommit) => void;
  showBadges?: boolean;
  /** Slide Show build step: only animated items in click groups <= step are shown. */
  buildStep?: number;
}

const INSERT_ICONS: { dialog: string; icon: string; label: string }[] = [
  { dialog: "insertTable", icon: "table", label: "Insert Table" },
  { dialog: "insertChart", icon: "chart", label: "Insert Chart" },
  { dialog: "insertSmartArt", icon: "smartart", label: "Insert a SmartArt Graphic" },
  { dialog: "insertPicture", icon: "picture", label: "Pictures" },
  { dialog: "stockImages", icon: "onlinePicture", label: "Stock Images" },
  { dialog: "insertVideo", icon: "video", label: "Insert Video" },
];

export function masterObjectsFor(deck: PptDeck, slide: PptSlide): PptObject[] {
  const m = readMaster(deck);
  if (sx(slide).hideGraphics || m.hideOn?.includes(slide.layout)) return m.layoutObjects?.[slide.layout] ?? [];
  return [...(m.objects ?? []), ...(m.layoutObjects?.[slide.layout] ?? [])];
}

export function SlideView(props: SlideViewProps) {
  const { deck, slide, width, index, interactive, selection, editing } = props;
  const theme = themeOf(deck);
  const W = deck.size === "4:3" ? 720 : 960;
  const H = 540;
  const scale = width / W;
  const boxes = layoutBoxes(slide.layout);
  const sel = new Set((selection ?? "").split(",").map((s) => s.trim()));
  const m = readMaster(deck);
  const titleFont = m.titleFont ?? theme.titleFont;
  const bodyFont = m.bodyFont ?? theme.font;
  const titleColor = m.titleColor ?? theme.title;
  const isTitle = slide.layout === "Title Slide";
  const seqList = animSequence(slide);
  const groupOf = (target: string) => seqList.find((a) => a.target === target);
  const visible = (target: string) => {
    if (props.buildStep === undefined) return true;
    const a = groupOf(target);
    if (!a) return true;
    if (EXITS.includes(a.name)) return a.group > props.buildStep;
    if (ANIMATIONS.includes(a.name) && a.name !== "None") return a.group <= props.buildStep;
    return true;
  };
  const badge = (target: string) => {
    const a = groupOf(target);
    return props.showBadges && a ? <span className="absolute -left-7 top-1 z-10 bg-gray-200 px-1 text-[16px] text-gray-700">{a.group}</span> : null;
  };

  const spellWords = (slide.spell ?? []).map((s) => s.word);
  const marked = (t: string) => {
    if (!spellWords.length || !interactive) return t;
    const parts = t.split(new RegExp(`(${spellWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`));
    return parts.map((p, i) => (spellWords.includes(p) ? <span key={i} className="underline decoration-red-600 decoration-wavy">{p}</span> : p));
  };

  const editor = (key: string, multiline: boolean, tabMode?: "indent" | "cell") => (
    <PartEditor multiline={multiline} tabMode={tabMode} value={editing?.key === key ? editing.text : ""} onChange={(t) => props.onEditChange?.(t)} onCommit={(n) => props.onEditCommit?.(n)} onCancel={() => props.onEditCancel?.()} />
  );
  const ctx: ObjectCtx = { theme, interactive, slideId: slide.id, selection: sel, editing, onPart: props.onPart, onEditStart: props.onEditStart, editor };
  const taken = (part: string) => (slide.objects ?? []).some((o) => ox(o).placeholder === part);

  const placeholder = (part: Part) => {
    const b = boxes[part];
    if (!b) return null;
    if (taken(part)) return null;
    const key = `${slide.id}.${part}`;
    const lineSel = Array.from(sel).find((k) => k.startsWith(`${key}.`));
    const isSel = sel.has(key) || Boolean(lineSel);
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
    const target = part === "title" ? "title" : "body";
    if (!visible(target)) return null;
    const bp = (slide.bodyProps ?? {}) as BodyPropsX;
    const bullets = (part === "body" || part === "body2") && bp.bullets !== false;
    const numbered = (part === "body" || part === "body2") && bp.numbered;
    const content = (part === "body" || part === "body2") && isContentPart(slide.layout, part);
    const counters: number[] = [];
    return (
      <div
        key={part}
        data-part={key}
        onMouseDown={interactive ? (e) => { e.stopPropagation(); props.onPart?.(key, e); } : undefined}
        onDoubleClick={interactive ? (e) => { e.stopPropagation(); props.onEditStart?.(key); } : undefined}
        onContextMenu={interactive ? (e) => props.onContext?.(e, lineSel ?? key) : undefined}
        onDragOver={interactive && (part === "body" || part === "body2") ? (e) => e.preventDefault() : undefined}
        onDrop={interactive && (part === "body" || part === "body2") ? (e) => { const from = e.dataTransfer.getData("text/x-ppt-line"); if (from) props.onLineDrop?.(from, (Array.isArray(text) ? text.length : 0) + 1); } : undefined}
        className={`absolute ${interactive ? "cursor-text" : ""} ${interactive && (isSel || empty) ? (isSel ? "outline outline-1 outline-[#888]" : "outline-dashed outline-1 outline-[#bbb]") : ""}`}
        style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, display: "flex", flexDirection: "column", justifyContent: part === "title" && !isTitle ? "center" : part === "title" ? "flex-end" : "flex-start", padding: 8, ...textStyle(props_, base), lineHeight: (part === "body" || part === "body2") ? 1.2 * (bp.lineSpacing ?? 1) : 1.05 }}
      >
        {badge(target)}
        {editingThis ? (
          editor(key, part === "body" || part === "body2", "indent")
        ) : empty ? (
          <>
            <span style={{ color: "#8a8a8a" }}>{PLACEHOLDER[part]}</span>
            {interactive && content && (
              <div className="absolute inset-0 flex items-center justify-center" onMouseDown={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-3 gap-3">
                  {INSERT_ICONS.map((ic) => (
                    <button key={ic.dialog} type="button" title={ic.label} aria-label={ic.label} onClick={(e) => { e.stopPropagation(); props.onInsertIcon?.(part, ic.dialog); }} className="rounded p-1 opacity-60 hover:bg-gray-200 hover:opacity-100">
                      <Icon name={ic.icon} size={34} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : Array.isArray(text) ? (
          <ul style={{ paddingLeft: (bp.indent ?? 0) * 72 }}>
            {text.map((line, i) => {
              const lvl = /^\t+/.exec(line)?.[0].length ?? 0;
              counters.length = lvl + 1;
              counters[lvl] = (counters[lvl] ?? 0) + 1;
              const lk = `${key}.${i + 1}`;
              const lineSelected = sel.has(lk);
              const marker = numbered ? numberMarker(lvl ? "a. b. c." : bp.numberFormat, counters[lvl] + (lvl ? 0 : (bp.startAt ?? 1) - 1)) : lvl ? "–" : bulletGlyph(bp.bulletStyle);
              return (
                <li
                  key={i}
                  data-line={lk}
                  draggable={interactive && lineSelected}
                  onDragStart={(e) => { e.dataTransfer.setData("text/x-ppt-line", lk); e.dataTransfer.effectAllowed = "move"; }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.stopPropagation(); const from = e.dataTransfer.getData("text/x-ppt-line"); if (from) props.onLineDrop?.(from, i + 1); }}
                  onMouseDown={interactive ? (e) => { if (isSel && !e.shiftKey && e.button === 0) { e.stopPropagation(); props.onPart?.(lk, e); } else if (isSel && e.button !== 0) e.stopPropagation(); } : undefined}
                  className={`flex gap-3 ${lineSelected ? "bg-[#cde4f7]" : ""} ${interactive && lineSelected ? "cursor-move" : ""}`}
                  style={{ paddingLeft: lvl * 36, fontSize: lvl ? "0.83em" : undefined, marginTop: i ? `${0.35 + (bp.spaceBefore ?? 0) / 24}em` : undefined, marginBottom: bp.spaceAfter ? `${bp.spaceAfter / 24}em` : undefined }}
                >
                  {bullets && <span style={{ color: bp.bulletColor ?? theme.accent, fontSize: bp.bulletSize ? `${bp.bulletSize}%` : undefined, minWidth: numbered ? "1.4em" : undefined }}>{marker}</span>}
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
  const pictureTaken = taken("picture") || (slide.objects ?? []).some((o) => o.kind === "image" && !ox(o).placeholder && slide.layout === "Picture with Caption" && o.x < 20);
  const masterObjs = masterObjectsFor(deck, slide);
  return (
    <div className="relative overflow-hidden" style={{ width, height: H * scale }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})`, background: slide.background ?? theme.bg }}
        onMouseDown={interactive ? () => props.onPart?.(slide.id, {} as React.MouseEvent) : undefined}
      >
        {theme.band && !sx(slide).hideGraphics && (
          <div
            className="absolute"
            style={{
              background: theme.band.color,
              ...(theme.band.side === "left" ? { left: 0, top: 0, bottom: 0, width: `${theme.band.size}%` } : theme.band.side === "right" ? { right: 0, top: 0, bottom: 0, width: `${theme.band.size}%` } : theme.band.side === "top" ? { left: 0, right: 0, top: 0, height: `${theme.band.size}%` } : { left: 0, right: 0, bottom: 0, height: `${theme.band.size}%` }),
            }}
          />
        )}
        {masterObjs.map((o) => (
          <div key={`m-${o.id}`} className="pointer-events-none absolute" style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%`, transform: transformOf(o) }}>
            <ObjectBody o={o} ctx={{ ...ctx, interactive: false }} />
          </div>
        ))}
        {deck.flags?.["view.gridlines"] && interactive && <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(#0001 1px, transparent 1px), linear-gradient(90deg, #0001 1px, transparent 1px)", backgroundSize: "40px 40px" }} />}
        {deck.flags?.["view.guides"] && interactive && <><div className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-gray-400" /><div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-gray-400" /></>}
        {boxes.picture && !pictureTaken && interactive && (
          <div className="absolute flex flex-col items-center justify-center border border-dashed border-gray-400 text-gray-500" style={{ left: `${boxes.picture.x}%`, top: `${boxes.picture.y}%`, width: `${boxes.picture.w}%`, height: `${boxes.picture.h}%` }} onMouseDown={(e) => { e.stopPropagation(); props.onPart?.(`${slide.id}.picture`, e); }}>
            <button type="button" aria-label="Pictures" title="Pictures" onClick={(e) => { e.stopPropagation(); props.onInsertIcon?.("picture", "insertPicture"); }} className="rounded p-1 hover:bg-gray-200">
              <Icon name="picture" size={40} />
            </button>
            <span className="text-[16px]">Click icon to add picture</span>
          </div>
        )}
        {(["title", "subtitle", "body", "body2"] as Part[]).map(placeholder)}
        {(slide.objects ?? [])
          .slice()
          .sort((a, b) => (a.z ?? 0) - (b.z ?? 0))
          .map((o) => {
            if (!visible(o.id)) return null;
            if (ox(o).hidden) return null;
            const key = `${slide.id}.${o.id}`;
            const isSel = sel.has(key) || Array.from(sel).some((k) => k.startsWith(`${key}.`));
            const hideInShow = props.buildStep !== undefined && o.kind === "audio" && ox(o).media?.hide;
            if (hideInShow) return null;
            return (
              <div
                key={o.id}
                data-obj={key}
                onMouseDown={interactive ? (e) => { e.stopPropagation(); props.onPart?.(key, e); } : undefined}
                onDoubleClick={interactive && (o.kind === "textbox" || o.kind === "shape" || o.kind === "smartart") ? (e) => { e.stopPropagation(); props.onEditStart?.(key); } : undefined}
                onContextMenu={interactive ? (e) => props.onContext?.(e, Array.from(sel).find((k) => k.startsWith(`${key}.`)) ?? key) : undefined}
                className={`absolute ${interactive ? "cursor-move" : ""}`}
                style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%`, transform: transformOf(o), outline: isSel ? "1.5px solid #6b6b6b" : o.kind === "textbox" && !o.text && interactive ? "1px dashed #bbb" : undefined, outlineOffset: 2, zIndex: isSel ? 5 : undefined }}
              >
                <ObjectBody o={o} ctx={ctx} onMedia={props.onMedia} />
                {badge(o.id)}
                {isSel && o.kind !== "table" && ["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map((c) => <span key={c} className={`pointer-events-none absolute ${c} h-3 w-3 rounded-full border border-gray-500 bg-white`} />)}
                {isSel && o.kind === "chart" && interactive && (
                  <button type="button" aria-label="Chart Elements" title="Chart Elements" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => props.onChartButton?.(key, e)} className="absolute -right-10 top-0 flex h-8 w-8 items-center justify-center border border-gray-400 bg-white text-[22px] text-gray-700 shadow hover:bg-gray-50">+</button>
                )}
              </div>
            );
          })}
        {footer && !hideFooter && (
          <div className="pointer-events-none absolute inset-x-[4%] bottom-[2%] flex items-center justify-between text-[14px]" style={{ color: theme.dark ? "#ddd" : "#7f7f7f", fontFamily: `'${bodyFont}', sans-serif` }}>
            <span>{footer.date ? "10/20/2026" : ""}</span>
            <span>{footer.text ?? ""}</span>
            <span>{footer.slideNumber ? index + 1 : ""}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function transformOf(o: PptObject): string | undefined {
  const x = ox(o);
  const parts: string[] = [];
  if (o.rotate) parts.push(`rotate(${o.rotate}deg)`);
  if (x.flipH) parts.push("scaleX(-1)");
  if (x.flipV) parts.push("scaleY(-1)");
  return parts.length ? parts.join(" ") : undefined;
}

export function PartEditor({ value, onChange, onCommit, onCancel, multiline, tabMode }: { value: string; onChange: (v: string) => void; onCommit: (next?: "tab" | "shiftTab") => void; onCancel: () => void; multiline?: boolean; tabMode?: "indent" | "cell" }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const done = useRef(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);
  const commit = (n?: "tab" | "shiftTab") => {
    if (done.current) return;
    done.current = true;
    onCommit(n);
  };
  return (
    <textarea
      ref={ref}
      aria-label="Type here"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter" && (!multiline || e.ctrlKey)) { e.preventDefault(); commit(); }
        if (e.key === "Escape") { e.preventDefault(); if (e.shiftKey) { done.current = true; onCancel(); } else commit(); }
        if (e.key === "Tab" && tabMode === "cell") { e.preventDefault(); commit(e.shiftKey ? "shiftTab" : "tab"); return; }
        if (e.key === "Tab" && multiline) {
          e.preventDefault();
          const el = e.currentTarget;
          const start = el.value.lastIndexOf("\n", el.selectionStart - 1) + 1;
          onChange(e.shiftKey ? el.value.slice(0, start) + el.value.slice(start).replace(/^\t/, "") : el.value.slice(0, start) + "\t" + el.value.slice(start));
        }
      }}
      onBlur={() => commit()}
      className="h-full w-full resize-none border-0 bg-white/80 p-0 outline-none"
      style={{ font: "inherit", color: "inherit", textAlign: "inherit", lineHeight: "inherit", tabSize: 2 }}
    />
  );
}
