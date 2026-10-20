"use client";

import { useEffect, useRef, useState } from "react";
import type { PptDeck, PptSlide } from "@/types/sim";
import { SlideView } from "../powerpoint/PptSlide";
import { activeSlide, showSlideId } from "../powerpoint/model";
import { GIcon } from "./icons";
import { ANIMATION_STARTS, ANIMATIONS, gTheme, LAYOUT_NAMES, pptLayout, SLIDES_MENUS, SLIDES_TOOLBAR, THEME_NAMES, TRANSITIONS } from "./menus";
import { asDeck, openFile, viewOn } from "./model";
import { CommentCard, CommentComposer, CommentsPanel, DetailsPanel, EditorHeader, IconBtn, KeyboardShortcuts, MenuList, PillBtn, Popup, SidePanel, TEXT_FONT, Toolbar, useG, useWidth, type MenuPos } from "./ui";
import { ExplorePanel } from "./Docs";

const TEXT_PARTS = ["title", "subtitle", "body", "body2", "notes"];

/** The deck as PowerPoint's SlideView should draw it: Google theme colors and fonts, PowerPoint layout names. */
export function renderDeck(deck: PptDeck): PptDeck {
  const t = gTheme(deck.theme);
  return {
    ...deck,
    theme: t.base,
    variant: 1,
    slides: deck.slides.map((s) => ({
      ...s,
      layout: pptLayout(s.layout),
      background: s.background ?? t.bg,
      titleProps: { font: t.titleFont, color: t.title, ...(s.titleProps ?? {}) },
      subtitleProps: { font: t.font, color: t.body, ...(s.subtitleProps ?? {}) },
      bodyProps: { font: t.font, color: t.body, ...(s.bodyProps ?? {}), ...({ bulletColor: (s.bodyProps as { bulletColor?: string } | undefined)?.bulletColor ?? t.accent } as object) },
    })),
  };
}

function textOf(deck: PptDeck, key: string): string {
  const [sid, part] = key.split(".");
  const s = deck.slides.find((x) => x.id === sid);
  if (!s) return "";
  if (part === "title") return s.title ?? "";
  if (part === "subtitle") return s.subtitle ?? "";
  if (part === "body") return (s.body ?? []).join("\n");
  if (part === "body2") return (s.body2 ?? []).join("\n");
  if (part === "notes") return s.notes ?? "";
  const o = s.objects?.find((x) => x.id === part);
  return o?.text ?? "";
}

function editableKey(deck: PptDeck, key: string) {
  const [sid, part, sub] = key.split(".");
  const s = deck.slides.find((x) => x.id === sid);
  if (!s || !part || sub) return false;
  if (TEXT_PARTS.includes(part)) return true;
  const o = s.objects?.find((x) => x.id === part);
  return Boolean(o && (o.kind === "textbox" || o.kind === "shape"));
}

export function SlidesSurface({ composer, setComposer }: { composer: boolean; setComposer: (v: boolean) => void }) {
  const g = useG();
  const { doc, ui } = g;
  const f = openFile(doc)!;
  const deck = asDeck(f);
  const rdeck = renderDeck(deck);
  const slide = activeSlide(deck, ui) ?? deck.slides[0];
  const idx = deck.slides.findIndex((s) => s.id === slide.id);
  const rslide = rdeck.slides[idx];
  const [editing, setEditingState] = useState<{ key: string; text: string } | null>(null);
  const editRef = useRef<{ key: string; text: string } | null>(null);
  const setEditing = (v: { key: string; text: string } | null) => { editRef.current = v; setEditingState(v); };
  const mainRef = useRef<HTMLDivElement>(null);
  const mainW = useWidth(mainRef, 640);
  const [menu, setMenu] = useState<{ pos: MenuPos; kind: "thumb" | "part" | "show"; sid?: string } | null>(null);
  const [dragFrom, setDragFrom] = useState<string | null>(null);
  const [notesEdit, setNotesEdit] = useState<string | null>(null);
  useEffect(() => { editRef.current = null; setEditingState(null); setNotesEdit(null); }, [doc]);

  const startEdit = (key: string, initial?: string) => {
    if (doc.mode === "Viewing" || !editableKey(deck, key)) return;
    g.onSelect({ selection: key, slide: key.split(".")[0] });
    setEditing({ key, text: initial ?? textOf(deck, key) });
  };
  const commitEdit = () => {
    const e = editRef.current;
    if (!e) return;
    setEditing(null);
    if (e.text !== textOf(deck, e.key)) g.onCommit({ kind: "type", target: e.key, value: e.text });
    g.focus();
  };
  g.hooksRef.current.type = (k: string) => {
    const sel = ui.selection;
    if (k === "\n") { if (editableKey(deck, sel)) startEdit(sel); return; }
    if (editableKey(deck, sel)) startEdit(sel, k);
  };

  const selectPart = (key: string, e?: React.MouseEvent) => {
    if (editRef.current && editRef.current.key !== key) commitEdit();
    const sid = key.split(".")[0];
    let next = key;
    if (e && (e.shiftKey || e.ctrlKey) && ui.selection.includes(".") && key.includes(".")) {
      const set = new Set(ui.selection.split(","));
      if (set.has(key)) set.delete(key);
      else set.add(key);
      next = Array.from(set).join(",");
    }
    g.onSelect({ selection: next, slide: sid });
    if (key.includes(".") && deck.flags?.painter) g.cmd("home.formatPainter.apply");
    g.focus();
  };

  const ratio = deck.size === "4:3" ? 4 / 3 : 16 / 9;
  const showNotes = viewOn(doc, "notes");
  const showStrip = viewOn(doc, "filmstrip");
  const zoomPct = Number(deck.flags?.zoom ?? 100) / 100;
  const slideW = Math.max(260, Math.min(mainW - 48, 1100)) * Math.min(1, zoomPct);
  const pane = doc.pane;
  const side = pane && ["Themes", "Motion", "Comments", "Explore", "Details"].includes(pane) ? pane : null;
  const textSelected = /\.(title|subtitle|body|body2)$|\.o\d+$/.test(ui.selection.split(",")[0]) && !ui.selection.endsWith(".notes");
  const tools = SLIDES_TOOLBAR.filter((t) => !t.when || (t.when === "text" ? textSelected : !textSelected));
  const comments = (f.comments ?? []).filter((c) => !c.resolved && (c.anchor === slide.id || c.anchor.startsWith(`${slide.id}.`)));
  const [slideshowMenu, setSlideshowMenu] = useState<MenuPos | null>(null);

  const slideshowBtn = (
    <span className="ml-1 flex h-10 shrink-0 items-center overflow-hidden rounded-full border border-[#747775]" style={{ fontFamily: TEXT_FONT }}>
      <button type="button" aria-label="Slideshow" title="Start slideshow (Ctrl+F5)" onClick={() => g.cmd("slideshow.fromCurrent")} className="flex h-full items-center gap-1.5 pl-4 pr-2 text-[14px] font-medium text-[#1f1f1f] hover:bg-[#e9eef6]">
        <GIcon name="present" size={18} /> Slideshow
      </button>
      <button type="button" aria-label="Slideshow options" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setSlideshowMenu({ x: r.right - 260, y: r.bottom + 4 }); }} className="flex h-full items-center border-l border-[#747775] px-2 hover:bg-[#e9eef6]">
        <GIcon name="dropDown" size={18} />
      </button>
      {slideshowMenu && (
        <Popup onClose={() => setSlideshowMenu(null)}>
          <MenuList
            pos={slideshowMenu}
            width={260}
            entries={[
              { label: "Presenter view", icon: "present", command: "slideshow.presenterStart" },
              { label: "Present from beginning", icon: "play", command: "slideshow.fromBeginning", shortcut: "Ctrl+Shift+F5" },
              { label: "Present on another screen", icon: "computer", command: "g.help", value: "Cast" },
            ]}
            onPick={(i) => { setSlideshowMenu(null); g.cmd(i.command!, i.value); }}
            onClose={() => setSlideshowMenu(null)}
          />
        </Popup>
      )}
    </span>
  );

  const thumbMenu = () => [
    { label: "Cut", icon: "cut", command: "home.cut", shortcut: "Ctrl+X" },
    { label: "Copy", icon: "copy", command: "home.copy", shortcut: "Ctrl+C" },
    { label: "Paste", icon: "paste", command: "home.paste", shortcut: "Ctrl+V" },
    { sep: true as const },
    { label: "New slide", icon: "newSlide", command: "slides.new", value: "Title and body", shortcut: "Ctrl+M" },
    { label: "Duplicate slide", icon: "copy", command: "slides.duplicate" },
    { label: "Delete", icon: "trash", command: "slides.delete" },
    { label: slide.hidden ? "Unskip slide" : "Skip slide", icon: "eyeOff", command: "slides.hide" },
    { sep: true as const },
    { label: "Change background", icon: "background", dialog: "g.background" },
    { label: "Apply layout", icon: "layout", sub: LAYOUT_NAMES.map((l) => ({ label: l, command: "slides.layout", value: l })) },
    { label: "Change transition", icon: "motion", command: "g.pane", value: "Motion" },
    { sep: true as const },
    { label: "Move slide to beginning", command: "slides.move", value: `${slide.id}@1` },
    { label: "Move slide to end", command: "slides.move", value: `${slide.id}@${deck.slides.length}` },
    { sep: true as const },
    { label: "Comment", icon: "addComment", action: "comment", shortcut: "Ctrl+Alt+M" },
  ];
  const partMenu = () => [
    { label: "Cut", icon: "cut", command: "home.cut", shortcut: "Ctrl+X" },
    { label: "Copy", icon: "copy", command: "home.copy", shortcut: "Ctrl+C" },
    { label: "Paste", icon: "paste", command: "home.paste", shortcut: "Ctrl+V" },
    { label: "Delete", icon: "trash", command: "edit.delete" },
    { sep: true as const },
    { label: "Comment", icon: "addComment", action: "comment", shortcut: "Ctrl+Alt+M" },
    { label: "Animate", icon: "motion", command: "g.pane", value: "Motion" },
    { label: "Insert link", icon: "link", action: "link", shortcut: "Ctrl+K" },
    { sep: true as const },
    { label: "Order", icon: "order", sub: [{ label: "Bring to front", command: "object.bringToFront" }, { label: "Send to back", command: "object.sendToBack" }] },
    { label: "Change background", icon: "background", dialog: "g.background" },
  ];
  const runItem = (i: { command?: string; value?: string; action?: string; dialog?: string }) => {
    setMenu(null);
    if (i.dialog) g.dialog(i.dialog);
    else if (i.action) g.act(i.action);
    else if (i.command) g.cmd(i.command, i.value);
  };

  if (deck.view === "show") return <Present deck={deck} rdeck={rdeck} />;
  const fullScreen = viewOn(doc, "fullScreen");
  const grid = viewOn(doc, "grid");

  return (
    <div className="flex h-full flex-col bg-[#f9fbfd]">
      {!fullScreen && <EditorHeader menus={SLIDES_MENUS} extraRight={slideshowBtn} />}
      {!fullScreen && <Toolbar tools={tools} />}
      {fullScreen && <button type="button" onClick={() => g.cmd("g.view", "fullScreen")} className="absolute right-3 top-2 z-20 rounded-full bg-[#303030] px-4 py-1.5 text-[13px] text-white">Exit full screen</button>}
      <div className="flex min-h-0 flex-1">
        {grid ? (
          <div className="min-w-0 flex-1 overflow-auto p-6" aria-label="Grid view">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
              {rdeck.slides.map((s, i) => (
                <button key={s.id} type="button" aria-label={`Slide ${i + 1}`} onClick={() => g.onSelect({ slide: s.id, selection: s.id })} onDoubleClick={() => g.cmd("g.view", "grid")} className={`rounded-lg p-1 ${slide.id === s.id ? "ring-[3px] ring-[#0b57d0]" : "ring-1 ring-[#dadce0]"} ${s.hidden ? "opacity-50" : ""}`}>
                  <SlideView deck={rdeck} slide={s} width={196} index={i} />
                  <span className="mt-1 block text-[12px] text-[#444746]">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {showStrip && (
              <div className="w-[190px] shrink-0 overflow-y-auto py-2 pr-2" role="listbox" aria-label="Slides">
                {rdeck.slides.map((s, i) => {
                  const on = slide.id === s.id;
                  return (
                    <div
                      key={s.id}
                      role="option"
                      aria-selected={on}
                      aria-label={`Slide ${i + 1}${s.title ? `: ${s.title}` : ""}`}
                      draggable
                      onDragStart={() => setDragFrom(s.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => { if (dragFrom && dragFrom !== s.id) g.cmd("slides.move", `${dragFrom}@${i + 1}`); setDragFrom(null); }}
                      onClick={() => { if (editRef.current) commitEdit(); g.onSelect({ slide: s.id, selection: s.id }); g.focus(); }}
                      onContextMenu={(e) => { e.preventDefault(); g.onSelect({ slide: s.id, selection: s.id }); setMenu({ pos: { x: e.clientX, y: e.clientY }, kind: "thumb", sid: s.id }); }}
                      className="mb-3 flex cursor-default gap-1"
                    >
                      <span className="w-6 shrink-0 pt-0.5 text-right text-[12px] text-[#444746]">{i + 1}</span>
                      <span className={`relative block rounded-md ${on ? "ring-[3px] ring-[#0b57d0]" : "ring-1 ring-[#dadce0]"} ${s.hidden ? "opacity-50" : ""}`}>
                        <SlideView deck={rdeck} slide={s} width={150} index={i} />
                        {s.hidden && <span className="absolute bottom-1 right-1 rounded-full bg-white p-0.5"><GIcon name="eyeOff" size={14} /></span>}
                        {s.transition && <span className="absolute bottom-1 left-1 rounded bg-white/90 px-1 text-[9px] text-[#444746]" title={`Transition: ${s.transition}`}>⟿</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <div ref={mainRef} className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#f9fbfd] p-4" onMouseDown={() => { if (editRef.current) commitEdit(); g.onSelect({ selection: slide.id, slide: slide.id }); }}>
                <div style={{ width: slideW, maxHeight: "100%" }} className="g-slide-canvas shadow-[0_1px_3px_1px_rgba(60,64,67,.15)]">
                  {/* Google Slides placeholders show only their prompt, not PowerPoint's Insert icons. */}
                  <style>{`.g-slide-canvas div:has(> button[aria-label="Insert Table"]){display:none}`}</style>
                  <SlideView
                    deck={rdeck}
                    slide={rslide}
                    width={slideW}
                    index={idx}
                    interactive={doc.mode !== "Viewing"}
                    selection={ui.selection}
                    editing={editing}
                    onPart={(k, e) => selectPart(k, e)}
                    onEditStart={(k) => startEdit(k)}
                    onEditChange={(t) => setEditing({ ...editRef.current!, text: t })}
                    onEditCommit={() => commitEdit()}
                    onEditCancel={() => setEditing(null)}
                    onContext={(e, k) => { e.preventDefault(); e.stopPropagation(); if (!ui.selection.split(",").includes(k)) g.onSelect({ selection: k, slide: k.split(".")[0] }); setMenu({ pos: { x: e.clientX, y: e.clientY }, kind: "part" }); }}
                    onInsertIcon={(part, dialog) => {
                      g.onSelect({ selection: `${slide.id}.${part}`, slide: slide.id });
                      if (dialog === "insertTable") g.act("table");
                      else if (dialog === "insertChart") g.cmd("insert.chart", "Column");
                      else g.act("image:Upload from computer");
                    }}
                  />
                </div>
                {(composer || comments.length > 0) && (
                  <div className="absolute right-3 top-3 z-10 w-[260px] space-y-2" onMouseDown={(e) => e.stopPropagation()}>
                    {composer && <CommentComposer onCancel={() => setComposer(false)} />}
                    {comments.map((c) => <CommentCard key={c.id} c={c} active={ui.selection === `comment:${c.id}`} onActivate={() => g.onSelect({ selection: `comment:${c.id}` })} />)}
                  </div>
                )}
              </div>
              {showNotes && (
                <div className="h-[86px] shrink-0 border-t border-[#dadce0] bg-white px-4 py-2 text-[14px]" style={{ fontFamily: "Arial" }} onClick={() => { g.onSelect({ selection: `${slide.id}.notes`, slide: slide.id }); if (doc.mode !== "Viewing") setNotesEdit(slide.notes ?? ""); }}>
                  {notesEdit !== null ? (
                    <textarea
                      autoFocus
                      aria-label="Speaker notes"
                      value={notesEdit}
                      onChange={(e) => setNotesEdit(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={() => { const v = notesEdit; setNotesEdit(null); if (v !== (slide.notes ?? "")) g.onCommit({ kind: "type", target: `${slide.id}.notes`, value: v }); }}
                      onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.blur(); } if (e.key === "Escape") setNotesEdit(null); }}
                      className="h-full w-full resize-none outline-none"
                    />
                  ) : slide.notes ? (
                    <p className="h-full cursor-text overflow-auto whitespace-pre-wrap">{slide.notes}</p>
                  ) : (
                    <p className="cursor-text text-[#80868b]">Click to add speaker notes</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {side === "Themes" && <ThemesPanel deck={deck} />}
        {side === "Motion" && <MotionPanel deck={deck} slide={slide} />}
        {side === "Comments" && <CommentsPanel quoteOf={(a) => a} />}
        {side === "Explore" && <ExplorePanel q={slide.title ?? ""} />}
        {side === "Details" && <DetailsPanel />}
      </div>
      {pane === "Keyboard shortcuts" && <KeyboardShortcuts />}
      {menu && (
        <Popup onClose={() => setMenu(null)}>
          <MenuList entries={(menu.kind === "thumb" ? thumbMenu() : partMenu()) as never} pos={menu.pos} width={260} onPick={runItem} onClose={() => setMenu(null)} />
        </Popup>
      )}
    </div>
  );
}

function ThemesPanel({ deck }: { deck: PptDeck }) {
  const g = useG();
  const cur = deck.theme ?? "Simple Light";
  const first = deck.slides[0];
  return (
    <SidePanel title="Themes" onClose={() => g.cmd("g.pane", "")} width={260}>
      <p className="mb-2 text-[12px] font-medium text-[#444746]">In this presentation</p>
      <ThemeCard name={cur} title={first?.title} active onPick={() => undefined} />
      <p className="mb-2 mt-4 text-[12px] font-medium text-[#444746]">Available themes</p>
      {THEME_NAMES.filter((n) => n !== cur).map((n) => <ThemeCard key={n} name={n} title={first?.title} onPick={() => g.cmd("design.theme", n)} />)}
      <PillBtn kind="outlined" className="mt-2" onClick={() => g.cmd("g.help", "Import theme")}>Import theme</PillBtn>
    </SidePanel>
  );
}

function ThemeCard({ name, onPick, active, title }: { name: string; onPick: () => void; active?: boolean; title?: string }) {
  const t = gTheme(name);
  return (
    <button type="button" aria-label={`Theme ${name}`} onClick={onPick} className={`mb-3 block w-full rounded-md text-left ${active ? "ring-2 ring-[#0b57d0]" : "ring-1 ring-[#dadce0] hover:ring-[#0b57d0]"}`}>
      <span className="relative flex aspect-video flex-col justify-center overflow-hidden rounded-t-md px-4" style={{ background: t.bg }}>
        <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: t.accent }} />
        <span className="truncate text-[15px]" style={{ color: t.title, fontFamily: t.titleFont }}>{title || "Click to add title"}</span>
        <span className="text-[10px]" style={{ color: t.body, fontFamily: t.font }}>Click to add subtitle</span>
      </span>
      <span className="block px-2 py-1.5 text-[13px] text-[#1f1f1f]">{name}</span>
    </button>
  );
}

function MotionPanel({ deck, slide }: { deck: PptDeck; slide: PptSlide }) {
  const g = useG();
  const sel = g.ui.selection;
  const [sid, part] = sel.split(".");
  const obj = part && sid === slide.id ? (part === "title" ? { label: "Title", anim: slide.titleAnimation } : part === "body" ? { label: "Body", anim: slide.bodyAnimation } : (() => { const o = slide.objects?.find((x) => x.id === part); return o ? { label: o.label ?? o.kind, anim: o.animation } : undefined; })()) : undefined;
  const animated: { key: string; label: string; anim: string }[] = [
    ...(slide.titleAnimation ? [{ key: `${slide.id}.title`, label: "Title", anim: slide.titleAnimation }] : []),
    ...(slide.bodyAnimation ? [{ key: `${slide.id}.body`, label: "Body", anim: slide.bodyAnimation }] : []),
    ...(slide.objects ?? []).filter((o) => o.animation).map((o) => ({ key: `${slide.id}.${o.id}`, label: o.label ?? o.kind, anim: o.animation! })),
  ];
  const speed = slide.transitionOptions?.duration ?? 0.5;
  return (
    <SidePanel title="Motion" onClose={() => g.cmd("g.pane", "")} width={280}>
      <p className="mb-2 text-[14px] font-medium">Slide transition</p>
      <label className="mb-1 block text-[12px] text-[#444746]">Transition</label>
      <select aria-label="Transition type" value={slide.transition ?? "None"} onChange={(e) => { g.onSelect({ slide: slide.id, selection: slide.id }); g.cmd("transition.apply", e.target.value); }} className="mb-3 h-9 w-full rounded border border-[#747775] px-1 text-[14px]">
        {TRANSITIONS.map((t) => <option key={t}>{t}</option>)}
      </select>
      <label className="mb-1 block text-[12px] text-[#444746]">Speed: {speed <= 0.3 ? "Fast" : speed >= 1 ? "Slow" : "Medium"}</label>
      <input type="range" aria-label="Transition speed" min={0.2} max={2} step={0.1} value={speed} onChange={(e) => g.cmd("transition.duration", e.target.value)} className="mb-3 w-full accent-[#0b57d0]" />
      <div className="mb-5 flex gap-2">
        <PillBtn kind="outlined" onClick={() => g.cmd("transition.applyAll")}>Apply to all slides</PillBtn>
        <PillBtn kind="text" onClick={() => g.cmd("g.toast", "Playing transition")}>Play</PillBtn>
      </div>
      <p className="mb-2 text-[14px] font-medium">Object animations</p>
      {animated.map((a) => (
        <div key={a.key} onClick={() => g.onSelect({ selection: a.key, slide: slide.id })} className={`mb-2 rounded border p-2 text-[13px] ${sel === a.key ? "border-[#0b57d0] bg-[#e8f0fe]" : "border-[#dadce0]"}`}>
          <div className="font-medium">{a.anim} · {a.label}</div>
        </div>
      ))}
      {obj ? (
        <div className="rounded border border-[#dadce0] p-3 text-[13px]">
          {obj.anim ? (
            <>
              <label className="mb-1 block text-[12px] text-[#444746]">Animation for {obj.label}</label>
              <select aria-label="Animation type" value={obj.anim} onChange={(e) => g.cmd("animation.apply", e.target.value)} className="mb-2 h-9 w-full rounded border border-[#747775] px-1">
                {ANIMATIONS.map((t) => <option key={t}>{t}</option>)}
              </select>
              <select aria-label="Animation start" defaultValue="On click" onChange={(e) => g.cmd("animation.start", e.target.value)} className="h-9 w-full rounded border border-[#747775] px-1">
                {ANIMATION_STARTS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </>
          ) : (
            <PillBtn kind="outlined" onClick={() => g.cmd("animation.apply", "Fade in")}><GIcon name="plus" size={16} color="#0b57d0" /> Add animation</PillBtn>
          )}
        </div>
      ) : (
        <p className="text-[12px] text-[#5f6368]">Select an object on the slide to animate it.</p>
      )}
      <p className="mt-3 text-[11px] text-[#5f6368]">{deck.slides.filter((s) => s.transition).length} of {deck.slides.length} slides have a transition.</p>
    </SidePanel>
  );
}

/* ------------------------------------------------------------------ */
/* Present and presenter view                                          */
/* ------------------------------------------------------------------ */

function Present({ deck, rdeck }: { deck: PptDeck; rdeck: PptDeck }) {
  const g = useG();
  const ref = useRef<HTMLDivElement>(null);
  const w = useWidth(ref, 800);
  const cur = showSlideId(deck);
  const i = Math.max(0, deck.slides.findIndex((s) => s.id === cur));
  const s = rdeck.slides[i];
  const ended = Boolean(deck.flags?.showEnd);
  const presenter = Boolean(deck.flags?.presenter);
  const [secs, setSecs] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { ref.current?.focus(); }, []);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSecs((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [paused]);
  const next = () => g.cmd("slideshow.next");
  const prev = () => g.cmd("slideshow.prev");
  const end = () => g.cmd("slideshow.end");
  const key = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (["ArrowRight", "ArrowDown", " ", "Enter", "PageDown"].includes(e.key)) { e.preventDefault(); next(); }
    if (["ArrowLeft", "ArrowUp", "Backspace", "PageUp"].includes(e.key)) { e.preventDefault(); prev(); }
    if (e.key === "Escape") { e.preventDefault(); end(); }
  };
  const clock = `${String(Math.floor(secs / 3600)).padStart(2, "0")}:${String(Math.floor(secs / 60) % 60).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  if (presenter) {
    const nextSlide = rdeck.slides.slice(i + 1).find((x) => !x.hidden);
    return (
      <div ref={ref} tabIndex={0} onKeyDown={key} className="absolute inset-0 z-[100] flex flex-col bg-[#f1f3f4] outline-none" role="dialog" aria-label="Presenter view" style={{ fontFamily: TEXT_FONT }}>
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[#dadce0] bg-white px-3 text-[14px]">
          <span className="font-medium">Presenter view</span>
          <span className="text-[12px] text-[#5f6368]">The audience sees only the slide.</span>
          <span className="flex-1" />
          <PillBtn kind="outlined" onClick={prev}><GIcon name="chevronLeft" size={18} color="#0b57d0" /> Previous</PillBtn>
          <span className="rounded border border-[#747775] px-3 py-1.5">Slide {i + 1} of {deck.slides.length}</span>
          <PillBtn kind="outlined" onClick={next}>Next <GIcon name="chevronRight" size={18} color="#0b57d0" /></PillBtn>
          <span className="ml-3 font-mono text-[16px]" aria-label="Timer">{clock}</span>
          <PillBtn kind="text" onClick={() => setPaused((p) => !p)}>{paused ? "Resume" : "Pause"}</PillBtn>
          <PillBtn kind="text" onClick={() => setSecs(0)}>Reset</PillBtn>
          <PillBtn onClick={end}>End show</PillBtn>
        </div>
        <div className="flex min-h-0 flex-1 gap-4 p-4">
          <div className="flex w-[42%] shrink-0 flex-col gap-3">
            <div className="rounded bg-black p-1">{ended ? <div className="flex aspect-video items-center justify-center text-[13px] text-white">End of slideshow</div> : <SlideView deck={rdeck} slide={s} width={Math.max(200, w * 0.4)} index={i} />}</div>
            <p className="text-[12px] text-[#5f6368]">Next</p>
            {nextSlide ? <div className="w-1/2 rounded ring-1 ring-[#dadce0]"><SlideView deck={rdeck} slide={nextSlide} width={Math.max(120, w * 0.2)} index={i + 1} /></div> : <p className="text-[12px] text-[#5f6368]">End of presentation</p>}
          </div>
          <div className="flex min-w-0 flex-1 flex-col rounded-lg bg-white">
            <div className="flex border-b border-[#dadce0] px-4 text-[14px]">
              <span className="border-b-[3px] border-[#0b57d0] py-2 font-medium text-[#0b57d0]">Speaker notes</span>
              <span className="ml-6 py-2 text-[#5f6368]">Audience tools</span>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4 text-[20px] leading-relaxed text-[#1f1f1f]">{deck.slides[i]?.notes || <span className="text-[#80868b]">No speaker notes for this slide.</span>}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div ref={ref} tabIndex={0} onKeyDown={key} onClick={next} className="group absolute inset-0 z-[100] flex items-center justify-center bg-black outline-none" role="dialog" aria-label="Slideshow">
      {ended ? (
        <p className="text-[15px] text-white/80">End of slideshow. Click to exit.</p>
      ) : (
        <SlideView deck={rdeck} slide={s} width={Math.min(w - 20, (ref.current?.clientHeight ?? 500) * (deck.size === "4:3" ? 4 / 3 : 16 / 9))} index={i} />
      )}
      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded bg-[#303030] px-2 py-1 text-[13px] text-white opacity-0 transition-opacity group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
        <IconBtn icon="chevronLeft" label="Previous" color="#fff" onClick={prev} box={28} />
        <span className="px-2">{i + 1} / {deck.slides.length}</span>
        <IconBtn icon="chevronRight" label="Next" color="#fff" onClick={next} box={28} />
        <IconBtn icon="close" label="Exit slideshow" color="#fff" onClick={end} box={28} />
      </div>
    </div>
  );
}

