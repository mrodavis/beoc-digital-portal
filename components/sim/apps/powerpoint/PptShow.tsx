"use client";

import { useEffect, useRef, useState } from "react";
import type { PptDeck, SimCommit } from "@/types/sim";
import type { MenuItem } from "../../types";
import { animSequence, showSlideId } from "./model";
import { SlideView } from "./PptSlide";

type Stroke = { color: string; width: number; pts: [number, number][] };

function useSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ w: 800, h: 450 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

const fmt = (sec: number) => `${Math.floor(sec / 3600)}:${String(Math.floor((sec % 3600) / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

export function SlideShow({ deck, onCommit, onContextMenu }: { deck: PptDeck; onCommit: (c: SimCommit) => void; onContextMenu: (x: number, y: number, items: MenuItem[]) => void }) {
  const focusRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const size = useSize(stageRef);
  const f = deck.flags ?? {};
  const curId = showSlideId(deck);
  const idx = deck.slides.findIndex((s) => s.id === curId);
  const slide = deck.slides[idx] ?? deck.slides[0];
  const [build, setBuild] = useState(0);
  const [digits, setDigits] = useState("");
  const [ink, setInk] = useState<Record<string, Stroke[]>>({});
  const drawing = useRef<Stroke | null>(null);
  const [laser, setLaser] = useState<{ x: number; y: number } | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [slideTime, setSlideTime] = useState(0);
  const times = useRef<Record<string, number>>({});
  const pointer = String(f.showPointer ?? "Arrow");
  const kiosk = String(f.showType ?? "").includes("kiosk");
  const presenter = Boolean(f.presenter);
  const ended = Boolean(f.showEnd);
  const seq = slide ? animSequence(slide) : [];
  const maxStep = f.noAnimation ? 0 : Math.max(0, ...seq.map((a) => a.group));
  const startStep = seq.length && seq[0].group === 0 ? 0 : 0;

  useEffect(() => { setBuild(f.noAnimation ? maxStep : startStep); setSlideTime(0); }, [curId, ended]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { focusRef.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => { setInk({}); }, [f.inkErased]);
  useEffect(() => {
    const t = setInterval(() => {
      setElapsed((e) => e + 1);
      setSlideTime((s) => s + 1);
      if (curId) times.current[curId] = (times.current[curId] ?? 0) + 1;
    }, 1000);
    return () => clearInterval(t);
  }, [curId]);

  // After Previous / With Previous items in the next click group play on their own.
  useEffect(() => {
    if (!slide || ended) return;
    const next = seq.find((a) => a.group === build + 1);
    if (next && next.start !== "On Click") {
      const t = setTimeout(() => setBuild((b) => b + 1), 600);
      return () => clearTimeout(t);
    }
  }, [build, curId, ended]); // eslint-disable-line react-hooks/exhaustive-deps

  // Automatic advance from slide timings (kiosks, rehearsed timings).
  useEffect(() => {
    const after = slide?.transitionOptions?.advanceAfter;
    if (!after || ended || f.timingsPrompt || f.advance === "Manually" || f.rehearsing) return;
    if (build < maxStep) return;
    const t = setTimeout(() => onCommit({ kind: "command", id: "slideshow.next" }), after * 1000);
    return () => clearTimeout(t);
  }, [curId, build, ended, f.timingsPrompt, f.advance, f.rehearsing]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (dir: 1 | -1) => {
    if (f.timingsPrompt) return;
    if (dir > 0 && !ended && build < maxStep) { setBuild(build + 1); return; }
    onCommit({ kind: "command", id: dir > 0 ? "slideshow.next" : "slideshow.prev" });
  };
  const end = () => {
    if (f.rehearsing && !f.timingsPrompt) onCommit({ kind: "command", id: "slideshow.recordTimings", value: JSON.stringify(times.current) });
    onCommit({ kind: "command", id: "slideshow.end" });
  };
  const cmd = (id: string, value?: string | number) => onCommit({ kind: "command", id, value });

  const onKeyDown = (e: React.KeyboardEvent) => {
    const k = e.key;
    const handled = () => { e.preventDefault(); e.stopPropagation(); };
    if (f.timingsPrompt) return;
    if (e.ctrlKey && ["p", "P", "l", "L", "a", "A", "i", "I", "e", "E"].includes(k)) {
      handled();
      const map: Record<string, string> = { p: "Pen", l: "Laser Pointer", a: "Arrow", i: "Highlighter", e: "Eraser" };
      cmd("slideshow.pointer", map[k.toLowerCase()]);
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (k === "Escape") {
      handled();
      if (f.showSeeAll) cmd("slideshow.seeAll");
      else if (pointer !== "Arrow" && pointer !== "Laser Pointer") cmd("slideshow.pointer", "Arrow");
      else end();
      return;
    }
    if (/^\d$/.test(k)) { handled(); setDigits((d) => (d + k).slice(-3)); return; }
    if (k === "Enter" && digits) { handled(); cmd("slideshow.goto", Number(digits)); setDigits(""); return; }
    if (k === "b" || k === "B" || k === ".") { handled(); cmd("slideshow.screen", "Black"); return; }
    if (k === "w" || k === "W" || k === ",") { handled(); cmd("slideshow.screen", "White"); return; }
    if (k === "e" || k === "E") { handled(); cmd("slideshow.erase"); return; }
    if (k === "g" || k === "G" || k === "-") { handled(); cmd("slideshow.seeAll"); return; }
    if (kiosk) { handled(); return; }
    if (["ArrowRight", "ArrowDown", " ", "Enter", "PageDown", "n", "N"].includes(k)) { handled(); go(1); return; }
    if (["ArrowLeft", "ArrowUp", "Backspace", "PageUp", "p", "P"].includes(k)) { handled(); go(-1); return; }
  };

  const showMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContextMenu(e.clientX, e.clientY, [
      { label: "Next", command: "slideshow.next" },
      { label: "Previous", command: "slideshow.prev" },
      { label: "See All Slides", command: "slideshow.seeAll" },
      { separator: true },
      { label: presenter ? "Hide Presenter View" : "Show Presenter View", command: "slideshow.showPresenter" },
      { label: "Screen: Black Screen", command: "slideshow.screen", value: "Black" },
      { label: "Screen: White Screen", command: "slideshow.screen", value: "White" },
      { separator: true },
      { label: "Pointer Options: Laser Pointer", command: "slideshow.pointer", value: "Laser Pointer" },
      { label: "Pointer Options: Pen", command: "slideshow.pointer", value: "Pen" },
      { label: "Pointer Options: Highlighter", command: "slideshow.pointer", value: "Highlighter" },
      { label: "Pointer Options: Eraser", command: "slideshow.pointer", value: "Eraser" },
      { label: "Erase All Ink on Slide", command: "slideshow.erase" },
      { label: "Arrow Options: Arrow", command: "slideshow.pointer", value: "Arrow" },
      { separator: true },
      { label: "End Show", command: "slideshow.end" },
    ]);
  };

  const penMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onContextMenu(r.left, r.top - 170, [
      { label: "Laser Pointer", command: "slideshow.pointer", value: "Laser Pointer", shortcut: "Ctrl+L" },
      { label: "Pen", command: "slideshow.pointer", value: "Pen", shortcut: "Ctrl+P" },
      { label: "Highlighter", command: "slideshow.pointer", value: "Highlighter", shortcut: "Ctrl+I" },
      { label: "Eraser", command: "slideshow.pointer", value: "Eraser", shortcut: "Ctrl+E" },
      { label: "Erase All Ink on Slide", command: "slideshow.erase", shortcut: "E" },
      { label: "Arrow", command: "slideshow.pointer", value: "Arrow", shortcut: "Ctrl+A" },
    ]);
  };
  const moreMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onContextMenu(r.left, r.top - 140, [
      { label: presenter ? "Hide Presenter View" : "Show Presenter View", command: "slideshow.showPresenter" },
      { label: "Black Screen", command: "slideshow.screen", value: "Black", shortcut: "B" },
      { label: "White Screen", command: "slideshow.screen", value: "White", shortcut: "W" },
      { separator: true },
      { label: "End Show", command: "slideshow.end", shortcut: "Esc" },
    ]);
  };

  const strokes = slide ? ink[slide.id] ?? [] : [];
  const drawable = pointer === "Pen" || pointer === "Highlighter";
  const toLocal = (e: React.MouseEvent): [number, number] => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100];
  };

  const slideArea = (w: number, interactiveInk: boolean) => (
    <div
      className="relative"
      style={{ cursor: drawable ? "crosshair" : pointer === "Laser Pointer" ? "none" : pointer === "Eraser" ? "cell" : "default" }}
      onMouseDown={(e) => {
        if (!interactiveInk || e.button !== 0) return;
        if (drawable && slide) {
          e.stopPropagation();
          drawing.current = { color: pointer === "Pen" ? "#d00000" : "rgba(255,230,0,.55)", width: pointer === "Pen" ? 0.5 : 2.2, pts: [toLocal(e)] };
          setInk((m) => ({ ...m, [slide.id]: [...(m[slide.id] ?? []), drawing.current!] }));
        }
        if (pointer === "Eraser" && slide) { e.stopPropagation(); setInk((m) => ({ ...m, [slide.id]: (m[slide.id] ?? []).slice(0, -1) })); }
      }}
      onMouseMove={(e) => {
        if (pointer === "Laser Pointer") { const [x, y] = toLocal(e); setLaser({ x, y }); }
        if (drawing.current && slide) {
          drawing.current.pts.push(toLocal(e));
          setInk((m) => ({ ...m, [slide.id]: [...(m[slide.id] ?? []).slice(0, -1), { ...drawing.current! }] }));
        }
      }}
      onMouseUp={() => { if (drawing.current) { drawing.current = null; cmd("slideshow.ink"); } }}
      onMouseLeave={() => setLaser(null)}
      onClick={(e) => { if (interactiveInk && (drawable || pointer === "Eraser")) e.stopPropagation(); }}
    >
      {slide && (
        <div key={`${slide.id}-${build}`} className={slide.transition && !ended ? "animate-[simfade_.6s_ease-out]" : ""}>
          <SlideView deck={deck} slide={slide} width={w} index={idx} buildStep={build} />
        </div>
      )}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {strokes.map((s, i) => <polyline key={i} fill="none" stroke={s.color} strokeWidth={s.width} strokeLinecap="round" strokeLinejoin="round" points={s.pts.map((p) => p.join(",")).join(" ")} />)}
      </svg>
      {laser && pointer === "Laser Pointer" && <span className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 shadow-[0_0_8px_3px_rgba(255,0,0,.7)]" style={{ left: `${laser.x}%`, top: `${laser.y}%` }} />}
      {f.showScreen === "Black" && <div className="absolute inset-0 bg-black" />}
      {f.showScreen === "White" && <div className="absolute inset-0 bg-white" />}
      {ended && (
        <div className="absolute inset-0 flex items-start justify-center bg-black pt-6 text-[13px] text-white/80">
          {f.timingsPrompt ? "" : "End of slide show, click to exit."}
        </div>
      )}
      {f.showSeeAll && (
        <div className="absolute inset-0 overflow-auto bg-[#1f1f1f]/95 p-3" onClick={(e) => e.stopPropagation()}>
          <div className="mb-2 flex items-center justify-between text-[12px] text-white"><span>See all slides</span><button type="button" onClick={() => cmd("slideshow.seeAll")} className="px-2 hover:bg-white/10">✕</button></div>
          <div className="flex flex-wrap gap-3">
            {deck.slides.map((s, i) => (
              <button key={s.id} type="button" aria-label={`Slide ${i + 1}`} onClick={() => cmd("slideshow.goto", i + 1)} className={`border-2 ${s.id === slide?.id ? "border-[#f4b183]" : "border-transparent"} ${s.hidden ? "opacity-50" : ""}`}>
                <SlideView deck={deck} slide={s} width={150} index={i} />
                <span className={`block text-[11px] text-white/80 ${s.hidden ? "line-through" : ""}`}>{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const toolbar = (
    <div className="flex items-center gap-1 rounded bg-black/40 px-1.5 py-1 text-[13px] text-white/80" onClick={(e) => e.stopPropagation()}>
      <button type="button" aria-label="Previous" title="Previous" onClick={() => go(-1)} className="rounded px-1.5 hover:bg-white/20">◀</button>
      <button type="button" aria-label="Next" title="Next" onClick={() => go(1)} className="rounded px-1.5 hover:bg-white/20">▶</button>
      <button type="button" aria-label="Pen and laser pointer tools" title="Pen and laser pointer tools" onClick={penMenu} className={`rounded px-1.5 hover:bg-white/20 ${pointer !== "Arrow" ? "bg-white/25" : ""}`}>✎</button>
      <button type="button" aria-label="See all slides" title="See all slides" onClick={() => cmd("slideshow.seeAll")} className="rounded px-1.5 hover:bg-white/20">▦</button>
      <button type="button" aria-label="More slide show options" title="More slide show options" onClick={moreMenu} className="rounded px-1.5 hover:bg-white/20">···</button>
    </div>
  );

  const prompt = f.timingsPrompt ? (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50" onClick={(e) => e.stopPropagation()}>
      <div className="w-[380px] border border-gray-400 bg-white text-[12px] text-gray-900 shadow-2xl">
        <div className="bg-white px-3 py-1.5">Microsoft PowerPoint</div>
        <p className="px-4 py-3">The total time for the slide show was {fmt(Object.values(JSON.parse(String(f.rehearsalTimes ?? "{}")) as Record<string, number>).reduce((a, b) => a + b, 0) || elapsed)}. Do you want to save the new slide timings?</p>
        <div className="flex justify-end gap-2 border-t border-gray-300 px-3 py-2">
          <button type="button" onClick={() => cmd("slideshow.keepTimings", "Yes")} className="min-w-[72px] border border-[#0078d4] bg-[#e5f1fb] px-3 py-1 hover:bg-[#cce4f7]">Yes</button>
          <button type="button" onClick={() => cmd("slideshow.keepTimings", "No")} className="min-w-[72px] border border-gray-400 bg-[#e1e1e1] px-3 py-1 hover:bg-[#e5f1fb]">No</button>
        </div>
      </div>
    </div>
  ) : null;

  const rehearsalBar = f.rehearsing && !f.timingsPrompt ? (
    <div className="absolute left-2 top-2 z-10 flex items-center gap-2 rounded border border-gray-400 bg-white px-2 py-1 text-[12px] text-gray-800 shadow" onClick={(e) => e.stopPropagation()}>
      <span className="font-semibold">Recording</span>
      <button type="button" aria-label="Next" onClick={() => go(1)} className="px-1 hover:bg-gray-100">➜</button>
      <span className="tabular-nums">{fmt(slideTime)}</span>
      <span className="text-gray-400">|</span>
      <span className="tabular-nums">{fmt(elapsed)}</span>
    </div>
  ) : null;

  const onStageClick = () => {
    if (f.timingsPrompt || f.showSeeAll) return;
    if (f.showScreen) { cmd("slideshow.screen", String(f.showScreen)); return; }
    if (drawable || pointer === "Eraser") return;
    if (ended) { end(); return; }
    if (kiosk || (slide?.transitionOptions as { onClick?: boolean } | undefined)?.onClick === false) return;
    go(1);
  };

  if (presenter) {
    const visible = deck.slides.filter((s) => !s.hidden);
    const nextSlide = deck.slides.slice(idx + 1).find((s) => !s.hidden);
    const mainW = Math.max(240, Math.min(size.w * 0.58, (size.h - 90) * (16 / 9)));
    return (
      <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} onContextMenu={showMenu} className="flex h-full flex-col bg-[#1f1f1f] text-white outline-none">
        <div className="flex items-center gap-4 border-b border-white/10 px-3 py-1 text-[12px] text-white/70">
          <span>Show Taskbar</span><span>Display Settings ▾</span>
          <button type="button" onClick={end} className="rounded px-2 hover:bg-white/10">End Slide Show</button>
          <span className="flex-1" />
          <span className="text-white/50">Presenter View</span>
        </div>
        <div ref={stageRef} className="flex min-h-0 flex-1 gap-3 p-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-[18px] tabular-nums"><span>{fmt(elapsed)}</span><span className="text-[12px] text-white/50">10:42 AM</span></div>
            <div onClick={onStageClick}>{slideArea(mainW, true)}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[16px]">
                <button type="button" aria-label="Pen and laser pointer tools" title="Pen and laser pointer tools" onClick={penMenu} className={`rounded px-2 hover:bg-white/10 ${pointer !== "Arrow" ? "bg-white/20" : ""}`}>✎</button>
                <button type="button" aria-label="See all slides" title="See all slides" onClick={() => cmd("slideshow.seeAll")} className="rounded px-2 hover:bg-white/10">▦</button>
                <button type="button" aria-label="Black or unblack slide show" title="Black or unblack slide show" onClick={() => cmd("slideshow.screen", "Black")} className={`rounded px-2 hover:bg-white/10 ${f.showScreen === "Black" ? "bg-white/20" : ""}`}>◼</button>
                <button type="button" aria-label="More slide show options" title="More slide show options" onClick={moreMenu} className="rounded px-2 hover:bg-white/10">···</button>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <button type="button" aria-label="Previous" onClick={() => go(-1)} className="rounded px-2 hover:bg-white/10">◀</button>
                <span>Slide {idx + 1} of {deck.slides.length}</span>
                <button type="button" aria-label="Next" onClick={() => go(1)} className="rounded px-2 hover:bg-white/10">▶</button>
              </div>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="text-[12px] text-white/60">{ended ? "End of slide show" : build < maxStep ? "Next: animation on this slide" : "Next Slide"}</span>
            {nextSlide && build >= maxStep ? <SlideView deck={deck} slide={nextSlide} width={Math.min(320, size.w * 0.3)} index={deck.slides.indexOf(nextSlide)} /> : <div className="flex h-24 items-center justify-center bg-black/40 text-[12px] text-white/50">{visible.length ? (build < maxStep ? "Click to play the next animation" : "End of slide show") : ""}</div>}
            <div className="min-h-0 flex-1 overflow-auto rounded bg-black/30 p-2 text-[15px] leading-relaxed" aria-label="Speaker notes">{slide?.notes || <span className="text-white/40">No notes for this slide.</span>}</div>
          </div>
        </div>
        {prompt}
        <style>{"@keyframes simfade{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}"}</style>
      </div>
    );
  }

  const fitW = Math.max(240, Math.min(size.w - 16, (size.h - 16) * (deck.size === "4:3" ? 4 / 3 : 16 / 9), 1400));
  return (
    <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} onContextMenu={showMenu} className="group relative flex h-full flex-col bg-black outline-none" onClick={onStageClick}>
      <div ref={stageRef} className="flex flex-1 items-center justify-center overflow-hidden p-2">{slideArea(fitW, true)}</div>
      <div className="absolute bottom-2 left-3 opacity-30 transition-opacity group-hover:opacity-100">{toolbar}</div>
      {digits && <div className="absolute bottom-2 right-3 rounded bg-black/60 px-2 text-[13px] text-white">Go to slide {digits}</div>}
      {rehearsalBar}
      {prompt}
      <style>{"@keyframes simfade{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}"}</style>
    </div>
  );
}
