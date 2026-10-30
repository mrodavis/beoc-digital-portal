"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PptDeck, PptObject, PptSlide, SimCommit } from "@/types/sim";
import type { CanvasProps, MenuItem, SimUi, StatusBarProps } from "../../types";
import { Icon } from "../../chrome/icons";
import { LAYOUTS, activeSlide, deckLayouts, isFinal, layoutName, readClip, themeOf } from "./model";
import { flagJson, ox, readMaster } from "./ext";
import { PartEditor, SlideView } from "./PptSlide";
import { lineSpan, parseRange } from "./runs";
import { ChartDataSheet, ClipboardPane, PptPane } from "./PptPanes";
import { SlideShow } from "./PptShow";
import { CustomShowsDialog, LinksDialog, MarkedFinalDialog } from "./PptDialogs";

const TEXT_PARTS = ["title", "subtitle", "body", "body2", "notes"];
const isCell = (k: string) => /^[^.]+\.o\d+\.r\d+c\d+$/.test(k);
const cellRC = (k: string): [number, number] => {
  const m = /r(\d+)c(\d+)$/.exec(k);
  return m ? [Number(m[1]), Number(m[2])] : [1, 1];
};
const isMasterScope = (sid: string) => sid === "master" || sid.startsWith("layout:");

/** A stand-in slide used to draw (and edit) the slide master or one of its layouts. */
function masterSlide(deck: PptDeck, key: string): PptSlide {
  const m = readMaster(deck);
  if (key === "master") {
    return { id: "master", layout: "Title and Content", title: m.titleText || "Click to edit Master title style", body: m.bodyText?.length ? m.bodyText : ["Click to edit Master text styles", "\tSecond level", "\t\tThird level"], objects: m.objects ?? [] };
  }
  const name = key.replace(/^layout:/, "");
  const layout = LAYOUTS.includes(name) ? name : "Title and Content";
  const typed = m.layoutText?.[name] ?? {};
  const s: PptSlide = { id: key, layout, objects: m.layoutObjects?.[name] ?? [] };
  if (layout !== "Blank") s.title = typed.title || "Click to edit Master title style";
  if (layout === "Title Slide" || layout === "Section Header") s.subtitle = typed.subtitle || "Click to edit Master subtitle style";
  if (!["Title Slide", "Section Header", "Title Only", "Blank", "Picture with Caption"].includes(layout)) s.body = typed.body ? typed.body.split("\n") : ["Click to edit Master text styles", "\tSecond level"];
  if (layout === "Two Content" || layout === "Comparison" || layout === "Content with Caption" || layout === "Picture with Caption") s.body2 = typed.body2 ? typed.body2.split("\n") : ["Click to edit Master text styles"];
  return s;
}

/**
 * The window a sim runs in (SimPlayer's root). Dialogs drawn by the canvas are portaled there so
 * they cover the whole window like the player's own dialogs.
 */
function simRootOf(el: Element | null): HTMLElement | null {
  return (el?.closest('[aria-label*="practice simulation"]') as HTMLElement | null) ?? null;
}

type Editing = { key: string; text: string; sel?: [number, number] };

export function PptCanvas({ doc: deck, ui, onSelect: onSelectRaw, onCommit, onContextMenu, openDialog }: CanvasProps<PptDeck>) {
  const view = deck.view ?? "normal";
  const slide = activeSlide(deck, ui)!;
  const idx = deck.slides.findIndex((s) => s.id === slide.id);
  const [editing, setEditingState] = useState<Editing | null>(null);
  const editRef = useRef<Editing | null>(null);
  const keepKey = useRef<string | null>(null);
  const setEditing = (v: Editing | null) => { editRef.current = v; setEditingState(v); };
  // The last selection the canvas made (so a box that loses focus to the Ribbon keeps its text
  // selection, but not after you clicked something else on the slide). Every selection the canvas
  // makes also drops the insertion point a box left behind for Paste.
  const lastSel = useRef<string>(ui.selection);
  const onSelect = (patch: Partial<SimUi>) => {
    if (patch.selection !== undefined) lastSel.current = patch.selection;
    onSelectRaw({ ...patch, caret: undefined } as Partial<SimUi>);
  };
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainW, setMainW] = useState(640);
  const [mainH, setMainH] = useState(360);
  const focusRef = useRef<HTMLDivElement>(null);
  const [dragFrom, setDragFrom] = useState<string | null>(null);
  const anchor = useRef<string | null>(null);

  useEffect(() => {
    if (keepKey.current && editRef.current?.key === keepKey.current) { keepKey.current = null; return; }
    keepKey.current = null;
    editRef.current = null;
    setEditingState(null);
  }, [deck]);
  useEffect(() => {
    if (view === "reading") focusRef.current?.focus({ preventScroll: true });
  }, [view]);
  // Like PowerPoint, the slide gets the keyboard back after a command runs (so you can type into a
  // new table or text box right away), unless you are typing somewhere else or a dialog is open.
  useEffect(() => {
    if (view === "show" || editRef.current) return;
    const ae = document.activeElement as HTMLElement | null;
    if (ae && (["INPUT", "TEXTAREA", "SELECT"].includes(ae.tagName) || ae.closest('[role="dialog"],[role="menu"]'))) return;
    focusRef.current?.focus({ preventScroll: true });
  }, [deck, ui.selection, view]);
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { setMainW(el.clientWidth); setMainH(el.clientHeight); });
    ro.observe(el);
    setMainW(el.clientWidth);
    setMainH(el.clientHeight);
    return () => ro.disconnect();
  }, [view]);

  // "master" and "layout:<name>" resolve to the stand-in slide drawn in Slide Master view, so
  // typing into a master or layout placeholder or object works like typing on a slide.
  const findSlide = (sid: string) => (isMasterScope(sid) ? (deck.view === "master" ? masterSlide(deck, sid) : undefined) : deck.slides.find((x) => x.id === sid));
  const findObj = (sid: string, oid: string) => findSlide(sid)?.objects?.find((o) => o.id === oid);

  // The Clipboard group's dialog box launcher opens the Office Clipboard pane. The shared Ribbon's
  // launchers can only open dialogs, so the canvas takes that one click (inside this sim's window)
  // and runs the pane command instead. Search › "Clipboard" still opens the Clipboard dialog.
  const commitRef = useRef(onCommit);
  commitRef.current = onCommit;
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element | null)?.closest?.('button[aria-label="Clipboard dialog box launcher"]');
      const root = simRootOf(focusRef.current);
      if (!btn || !root || !root.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();
      commitRef.current({ kind: "command", id: "home.clipboardPane" });
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);
  // Canvas dialogs (Custom Shows, Links) cover the whole window, like the player's dialogs.
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  useEffect(() => { setPortalRoot(simRootOf(focusRef.current)); }, [view]);

  const textOf = (key: string): string => {
    const [sid, part, sub] = key.split(".");
    const s = findSlide(sid);
    if (!s) return "";
    if (part === "title") return s.title ?? "";
    if (part === "subtitle") return s.subtitle ?? "";
    if (part === "body") return (s.body ?? []).join("\n");
    if (part === "body2") return (s.body2 ?? []).join("\n");
    if (part === "notes") return s.notes ?? "";
    const o = s.objects?.find((x) => x.id === part);
    if (!o) return "";
    if (sub && /^r\d+c\d+$/.test(sub)) { const [r, c] = cellRC(sub); return o.rows?.[r - 1]?.[c - 1] ?? ""; }
    if (sub === "title") return ox(o).chart?.title ?? "Chart Title";
    if (o.kind === "smartart") return (o.items ?? []).join("\n");
    return o.text ?? "";
  };
  const editable = (key: string) => {
    const [sid, part, sub] = key.split(".");
    if (!part || !findSlide(sid)) return false;
    if (TEXT_PARTS.includes(part)) return !sub;
    const o = findObj(sid, part);
    if (!o) return false;
    if (sub) return (o.kind === "table" && /^r\d+c\d+$/.test(sub)) || (o.kind === "chart" && sub === "title");
    return o.kind === "textbox" || o.kind === "shape" || o.kind === "smartart";
  };
  const startEdit = (key: string, text?: string, sel?: [number, number]) => {
    // Marked as final: typing is turned off until Edit Anyway.
    if (!editable(key) || isFinal(deck)) return;
    onSelect({ selection: key, slide: key.split(".")[0] });
    setEditing({ key, text: text ?? textOf(key), sel });
  };

  /** Placeholders and text boxes whose words can be selected and formatted on their own. */
  const rangeable = (key: string) => {
    const [sid, part, sub] = key.split(".");
    if (sub || isMasterScope(sid)) return false;
    if (["title", "subtitle", "body", "body2"].includes(part)) return true;
    const o = findObj(sid, part);
    return o?.kind === "textbox" || o?.kind === "shape";
  };
  /**
   * What stays selected when a box loses focus to the Ribbon or a menu: the selected text
  * ("s2.title.t4-7"), all of it (the placeholder), one whole bullet ("s2.body.3"), or, with
   * nothing selected, the placeholder plus the insertion point for Paste.
   */
  const keepSelection = (key: string, text: string, [a0, b0]: [number, number]) => {
    const a = Math.min(a0, b0), b = Math.max(a0, b0);
    const slideId = key.split(".")[0];
    if (a === b) { onSelect({ selection: key, slide: slideId }); onSelectRaw({ caret: `${key}@${a}` } as Partial<SimUi>); return; }
    if (a === 0 && b >= text.length) return onSelect({ selection: key, slide: slideId });
    const part = key.split(".")[1];
    if (part === "body" || part === "body2") {
      const n = text.slice(0, a).split("\n").length;
      const sp = lineSpan(text, n);
      if (sp && (a === sp.start || a === sp.textStart) && (b === sp.end || (b === sp.end + 1 && text[sp.end] === "\n")) && sp.end > sp.textStart) return onSelect({ selection: `${key}.${n}`, slide: slideId });
    }
    onSelect({ selection: `${key}.t${a}-${b}`, slide: slideId });
  };

  const commitEdit = (next?: "tab" | "shiftTab", range?: [number, number]) => {
    const e = editRef.current;
    if (!e) return;
    setEditing(null);
    const changed = e.text !== textOf(e.key);
    if (changed) onCommit({ kind: "type", target: e.key, value: e.text });
    // Focus went to the Ribbon or a menu (not to something else on the slide): keep the text selection.
    if (range && rangeable(e.key) && lastSel.current === e.key) { keepSelection(e.key, e.text, range); return; }
    if (next && isCell(e.key)) {
      const [sid, oid] = e.key.split(".");
      const t = findObj(sid, oid);
      const rows = t?.rows?.length ?? 1, cols = t?.rows?.[0]?.length ?? 1;
      let [r, c] = cellRC(e.key);
      if (next === "tab") { c++; if (c > cols) { c = 1; r++; } } else { c--; if (c < 1) { c = cols; r = Math.max(1, r - 1); } }
      if (r > rows) onCommit({ kind: "command", id: "table.tabRow" });
      const nk = `${sid}.${oid}.r${r}c${c}`;
      keepKey.current = nk;
      onSelect({ selection: nk, slide: sid });
      setEditing({ key: nk, text: r > rows ? "" : textOf(nk) });
      return;
    }
    focusRef.current?.focus({ preventScroll: true });
  };

  const selectPart = (key: string, e: React.MouseEvent) => {
    // Right-clicking text you selected inside a box keeps that selection for the menu's commands.
    if (e.button === 2 && key.includes(".") && !editRef.current && ui.selection.split(",").some((k) => k.startsWith(`${key}.t`) || /\.\d+$/.test(k) && k.startsWith(`${key}.`))) return;
    if (editRef.current && editRef.current.key !== key) commitEdit();
    let next = key;
    const [sid, oid, sub] = key.split(".");
    const multi = e.shiftKey || e.ctrlKey || e.metaKey;
    if (oid && !TEXT_PARTS.includes(oid) && !sub) {
      const o = findObj(sid, oid);
      if (o?.group) next = (findSlide(sid)?.objects ?? []).filter((x) => x.group === o.group).map((x) => `${sid}.${x.id}`).join(",");
    }
    if (multi && isCell(key) && anchor.current && isCell(anchor.current) && anchor.current.split(".").slice(0, 2).join(".") === key.split(".").slice(0, 2).join(".")) {
      const [r1, c1] = cellRC(anchor.current), [r2, c2] = cellRC(key);
      const keys: string[] = [];
      for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) keys.push(`${sid}.${oid}.r${r}c${c}`);
      onSelect({ selection: keys.join(","), slide: sid });
      return;
    }
    if (multi && key.includes(".") && ui.selection.includes(".") && !isCell(key) && !TEXT_PARTS.includes(oid ?? "")) {
      const set = new Set(ui.selection.split(",").filter((k) => k.split(".").length === 2 && !TEXT_PARTS.includes(k.split(".")[1])));
      for (const k of next.split(",")) set.has(k) ? set.delete(k) : set.add(k);
      next = Array.from(set).join(",") || key;
    }
    anchor.current = key;
    onSelect({ selection: next, slide: key.split(".")[0] });
    if (key.includes(".") && deck.flags?.painter) onCommit({ kind: "command", id: "home.formatPainter.apply" });
    else if (key.includes(".") && deck.flags?.animPainter) onCommit({ kind: "command", id: "animation.painter.apply" });
    focusRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (editing || view === "show") return;
    const k = e.key;
    // Text selected inside a box (after a Ribbon command) or a selected bullet: typing replaces it,
    // F2 or Enter goes back to editing with it still selected.
    const rs = /^(.+)\.(t\d+-\d+)$/.exec(ui.selection);
    const ls = /^([^.]+\.(?:body|body2))\.(\d+)$/.exec(ui.selection);
    const rbase = rs?.[1] ?? ls?.[1];
    const lsp = ls ? lineSpan(textOf(ls[1]), Number(ls[2])) : undefined;
    const rr: [number, number] | undefined = rs ? parseRange(rs[2]) : lsp ? [lsp.textStart, lsp.end] : undefined;
    if (rbase && rr && rangeable(rbase) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (k === "F2" || k === "Enter") { e.preventDefault(); startEdit(rbase, undefined, rr); return; }
      if (k.length === 1) {
        e.preventDefault();
        const t = textOf(rbase);
        startEdit(rbase, t.slice(0, rr[0]) + k + t.slice(rr[1]), [rr[0] + 1, rr[0] + 1]);
        return;
      }
    }
    if (view === "reading") {
      if (k === "Escape") { e.preventDefault(); onCommit({ kind: "command", id: "view.mode", value: "Normal" }); return; }
      if (["ArrowRight", "ArrowDown", " ", "Enter", "PageDown"].includes(k)) { e.preventDefault(); nav(1); return; }
      if (["ArrowLeft", "ArrowUp", "Backspace", "PageUp"].includes(k)) { e.preventDefault(); nav(-1); return; }
      return;
    }
    const sel = ui.selection;
    if (e.ctrlKey && !sel.includes(".") && (k === "ArrowUp" || k === "ArrowDown") && view !== "master") {
      e.preventDefault();
      const to = k === "ArrowUp" ? idx : idx + 2;
      if (to >= 1 && to <= deck.slides.length) onCommit({ kind: "command", id: "slides.move", value: `${slide.id}@${to}` });
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (k === "Delete" || k === "Backspace") {
      e.preventDefault();
      if (view === "master" && !sel.includes(".")) return;
      onCommit({ kind: "command", id: sel.includes(".") ? "edit.delete" : "slides.delete" });
      return;
    }
    if (sel.endsWith(".anim")) return; // an Animation Pane item: Delete removes the effect; typing does nothing
    if (k === "Tab") {
      const parts = sel.split(".");
      if (parts.length === 3 && (parts[1] === "body" || parts[1] === "body2")) {
        e.preventDefault();
        onCommit({ kind: "command", id: e.shiftKey ? "home.indentDec" : "home.indentInc" });
        return;
      }
      if (isCell(sel)) {
        e.preventDefault();
        const [sid, oid] = sel.split(".");
        const t = findObj(sid, oid);
        const cols = t?.rows?.[0]?.length ?? 1, rows = t?.rows?.length ?? 1;
        let [r, c] = cellRC(sel);
        if (e.shiftKey) { c--; if (c < 1) { c = cols; r = Math.max(1, r - 1); } } else { c++; if (c > cols) { c = 1; r = Math.min(rows, r + 1); } }
        onSelect({ selection: `${sid}.${oid}.r${r}c${c}`, slide: sid });
        return;
      }
      const objs = (slide.objects ?? []).map((o) => `${slide.id}.${o.id}`);
      if (objs.length && view === "normal") {
        e.preventDefault();
        const i = objs.indexOf(sel);
        onSelect({ selection: objs[(i + (e.shiftKey ? objs.length - 1 : 1)) % objs.length] ?? objs[0], slide: slide.id });
      }
      return;
    }
    if (!sel.includes(".") && view !== "master" && (k === "ArrowDown" || k === "ArrowUp")) {
      e.preventDefault();
      const n = deck.slides[Math.max(0, Math.min(deck.slides.length - 1, idx + (k === "ArrowDown" ? 1 : -1)))];
      onSelect({ slide: n.id, selection: n.id });
      return;
    }
    if (!sel.includes(".") && view !== "master" && k === "Enter") {
      e.preventDefault();
      onCommit({ kind: "command", id: "slides.new", value: "Title and Content" });
      return;
    }
    if (k === "F2" || k === "Enter") {
      const target = sel.split(".").length === 3 && !isCell(sel) ? sel.split(".").slice(0, 2).join(".") : sel;
      if (editable(target)) { e.preventDefault(); startEdit(target); }
      return;
    }
    if (k.length === 1 && editable(sel)) {
      e.preventDefault();
      startEdit(sel, k);
    }
  };

  const ratio = deck.size === "4:3" ? 4 / 3 : 16 / 9;
  const fitW = (padW: number, padH: number, max = 1100) => Math.max(240, Math.min(mainW - padW, (mainH - padH) * ratio, max));
  const nav = (dir: number) => {
    const n = deck.slides[Math.max(0, Math.min(deck.slides.length - 1, idx + dir))];
    onSelect({ slide: n.id, selection: n.id });
  };

  /* ---------- context menus ---------- */

  const thumbMenu = (e: React.MouseEvent, s: PptSlide) => {
    e.preventDefault();
    onSelect({ slide: s.id, selection: s.id });
    const hasClip = Boolean(deck.flags?.clip || deck.flags?.clipObj);
    const items: MenuItem[] = [
      { label: "Cut", icon: "cut", command: "home.cut", shortcut: "Ctrl+X" },
      { label: "Copy", icon: "copy", command: "home.copy", shortcut: "Ctrl+C" },
      { label: "Paste", icon: "paste", command: "home.paste", shortcut: "Ctrl+V", disabled: !hasClip },
      { separator: true },
      { label: "New Slide", icon: "newSlide", command: "slides.new", value: "Title and Content" },
      { label: "Duplicate Slide", icon: "copy", command: "slides.duplicate" },
      { label: "Delete Slide", icon: "deleteCells", command: "slides.delete" },
      { label: "Add Section", icon: "section", dialog: "addSection" },
      { separator: true },
      ...deckLayouts(deck).map((l) => ({ label: `Layout: ${layoutName(deck, l)}`, icon: "layout", command: "slides.layout", value: l })),
      { label: "Reset Slide", icon: "reset", command: "slides.reset" },
      { separator: true },
      { label: "Format Background...", icon: "background", dialog: "formatBackground" },
      { label: s.hidden ? "Unhide Slide" : "Hide Slide", icon: "close", command: "slides.hide" },
      { label: "New Comment", icon: "comment", dialog: "newComment" },
    ];
    onContextMenu(e.clientX, e.clientY, items);
  };

  const sectionMenu = (e: React.MouseEvent, first: PptSlide) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect({ slide: first.id, selection: first.id });
    onContextMenu(e.clientX, e.clientY, [
      { label: "Rename Section", icon: "textbox", dialog: "renameSection" },
      { label: "Remove Section", icon: "reject", command: "slides.section", value: "Remove Section" },
      { label: "Remove Section & Slides", icon: "deleteCells", command: "slides.section", value: "Remove Section & Slides" },
      { label: "Remove All Sections", icon: "reject", command: "slides.section", value: "Remove All Sections" },
      { separator: true },
      { label: "Move Section Up", icon: "undo", command: "slides.section", value: "Move Section Up" },
      { label: "Move Section Down", icon: "redo", command: "slides.section", value: "Move Section Down" },
      { separator: true },
      { label: "Collapse All", command: "slides.section", value: "Collapse All" },
      { label: "Expand All", command: "slides.section", value: "Expand All" },
    ]);
  };

  /** Paste Options for what is on the clipboard, then Paste Special (like the right-click Paste Options icons). */
  const pasteItems = (textTarget: boolean): MenuItem[] => {
    const clip = readClip(deck);
    if (!clip) return [{ label: "Paste", icon: "paste", disabled: true, shortcut: "Ctrl+V" }];
    const opt = (v: string): MenuItem => ({ label: `Paste Options: ${v}`, icon: v.includes("Link") ? "link" : "paste", command: "home.paste", value: v });
    const chart = clip.kind === "obj" && clip.objs.length === 1 && clip.objs[0].kind === "chart" && !ox(clip.objs[0]).ole;
    const linkable = Boolean(clip.source?.file);
    const options = chart
      ? ["Use Destination Theme & Embed Workbook", "Keep Source Formatting & Embed Workbook", ...(linkable ? ["Use Destination Theme & Link Data", "Keep Source Formatting & Link Data"] : []), "Picture"]
      : clip.kind === "text" || textTarget ? ["Use Destination Theme", "Keep Source Formatting", "Picture", "Keep Text Only"] : ["Use Destination Theme", "Keep Source Formatting", "Picture"];
    return [{ label: "Paste", icon: "paste", command: "home.paste", shortcut: "Ctrl+V" }, ...options.map(opt), { label: "Paste Special...", icon: "paste", dialog: "pasteSpecial", shortcut: "Ctrl+Alt+V" }];
  };

  /** Right-click on an empty part of the slide. */
  const backgroundMenu = (e: React.MouseEvent, s: PptSlide) => {
    e.preventDefault();
    e.stopPropagation();
    if (editRef.current) commitEdit();
    onSelect({ slide: s.id, selection: s.id });
    onContextMenu(e.clientX, e.clientY, [
      ...pasteItems(false),
      { separator: true },
      ...deckLayouts(deck).map((l) => ({ label: `Layout: ${layoutName(deck, l)}`, icon: "layout", command: "slides.layout", value: l })),
      { label: "Reset Slide", icon: "reset", command: "slides.reset" },
      { separator: true },
      { label: "Format Background...", icon: "background", dialog: "formatBackground" },
      { label: "New Comment", icon: "comment", dialog: "newComment" },
    ]);
  };

  const partMenu = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!key.includes(".")) {
      const bg = findSlide(key);
      if (bg && !isMasterScope(key)) backgroundMenu(e, bg);
      return;
    }
    if (!ui.selection.split(",").includes(key)) onSelect({ selection: key, slide: key.split(".")[0] });
    const [sid, part, sub] = key.split(".");
    const s = findSlide(sid);
    const items: MenuItem[] = [];
    if (s && TEXT_PARTS.includes(part)) {
      const text = textOf(`${sid}.${part}`);
      const w = (s.spell ?? []).find((x) => text.includes(x.word));
      if (w) {
        items.push(...w.suggestions.map((sg) => ({ label: sg, command: "spelling.change", value: sg })), { label: "Ignore All", command: "spelling.ignoreAll", value: w.word }, { separator: true });
      }
    }
    items.push(
      { label: "Cut", icon: "cut", command: "home.cut", shortcut: "Ctrl+X" },
      { label: "Copy", icon: "copy", command: "home.copy", shortcut: "Ctrl+C" },
      ...pasteItems(TEXT_PARTS.includes(part)),
      { separator: true },
    );
    if (part === "notes") {
      onContextMenu(e.clientX, e.clientY, [...items, { label: "Font...", icon: "fontColor", dialog: "font" }, { label: "Paragraph...", icon: "lineSpacing", dialog: "paragraph" }]);
      return;
    }
    const o = s && !TEXT_PARTS.includes(part) && part !== "picture" ? s.objects?.find((x) => x.id === part) : undefined;
    if (!o) {
      items.push(
        { label: "Font...", icon: "fontColor", dialog: "font" },
        { label: "Paragraph...", icon: "lineSpacing", dialog: "paragraph" },
        { label: "Bullets: Filled Round Bullets", icon: "bullets", command: "home.bullets", value: "Filled Round Bullets" },
        { label: "Numbering: 1. 2. 3.", icon: "numbering", command: "home.numbering", value: "1. 2. 3." },
        { label: "Convert to SmartArt: Basic Process", icon: "smartart", command: "home.convertSmartArt", value: "Basic Process" },
        { label: "Convert to SmartArt: Vertical Bullet List", icon: "smartart", command: "home.convertSmartArt", value: "Vertical Bullet List" },
        { label: "Convert to SmartArt: Basic Block List", icon: "smartart", command: "home.convertSmartArt", value: "Basic Block List" },
        { label: "More SmartArt Graphics...", icon: "smartart", dialog: "convertSmartArt" },
        { label: "Link...", icon: "link", dialog: "link", shortcut: "Ctrl+K" },
        { label: "Synonyms (Thesaurus)", icon: "thesaurus", command: "review.thesaurus", shortcut: "Shift+F7" },
        { separator: true },
      );
    } else {
      if (o.kind === "image") items.push({ label: "Change Picture...", icon: "picture", dialog: "changePicture" }, { label: "Crop", icon: "crop", command: "picture.crop" });
      // A Paste Special Excel object: Update Link and the Linked Chart Object submenu (Links... is Edit Links to Files).
      if (ox(o).ole) {
        const noun = o.kind === "table" ? "Worksheet" : "Chart";
        if (ox(o).dataLink) items.push(
          { label: "Update Link", icon: "reset", command: "links.update", value: `${sid}.${o.id}` },
          { label: `Linked ${noun} Object: Open Link`, icon: "open", command: "links.openSource", value: `${sid}.${o.id}` },
          { label: `Linked ${noun} Object: Links...`, icon: "link", command: "links.edit", value: `${sid}.${o.id}` },
        );
        else items.push({ label: `${noun} Object: Edit`, icon: "table", disabled: true });
      } else if (o.kind === "chart") items.push({ label: "Edit Data", icon: "table", command: "chart.editData" }, { label: "Change Chart Type...", icon: "chart", dialog: "changeChartType" });
      if (o.kind === "icon") items.push({ label: "Change Graphic: From Icons...", icon: "icons", dialog: "changeGraphic" });
      if (o.kind === "smartart") items.push({ label: "Reset Graphic", icon: "reset", command: "smartart.reset" }, { label: "Convert to Text", icon: "textbox", command: "smartart.convert", value: "Convert to Text" }, { label: "Show Text Pane", icon: "navPane", command: "smartart.textPane" });
      if (o.kind === "table") {
        items.push(
          { label: "Insert Rows Above", icon: "insertCells", command: "table.insertAbove" },
          { label: "Insert Rows Below", icon: "insertCells", command: "table.insertBelow" },
          { label: "Insert Columns to the Left", icon: "insertCells", command: "table.insertLeft" },
          { label: "Insert Columns to the Right", icon: "insertCells", command: "table.insertRight" },
          { label: "Delete Rows", icon: "deleteCells", command: "table.delete", value: "Delete Rows" },
          { label: "Delete Columns", icon: "deleteCells", command: "table.delete", value: "Delete Columns" },
          { label: "Merge Cells", icon: "merge", command: "table.merge", disabled: ui.selection.split(",").length < 2 },
        );
      }
      if (o.kind === "video") items.push({ label: "Trim", icon: "crop", dialog: "trimVideo" });
      if (o.kind === "audio") items.push({ label: "Trim", icon: "crop", dialog: "trimAudio" });
      items.push(
        { separator: true },
        o.group ? { label: "Ungroup", icon: "groupObjects", command: "object.ungroup" } : { label: "Group", icon: "groupObjects", command: "object.group", disabled: ui.selection.split(",").length < 2 },
        { label: "Bring to Front", icon: "bringForward", command: "object.bringToFront" },
        { label: "Send to Back", icon: "sendBackward", command: "object.sendToBack" },
        { label: "Link...", icon: "link", dialog: "link" },
        { label: "View Alt Text...", icon: "altText", dialog: "altText" },
        { label: "Size and Position...", icon: "rotate", dialog: "rotation" },
        { separator: true },
      );
    }
    items.push({ label: "New Comment", icon: "comment", dialog: "newComment" });
    onContextMenu(e.clientX, e.clientY, items);
  };

  const chartMenu = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const [sid, oid] = key.split(".");
    const o = findObj(sid, oid);
    const ch = (o && ox(o).chart) ?? {};
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const box = (on: boolean, label: string) => `${on ? "☑" : "☐"}  ${label}`;
    onContextMenu(r.right + 4, r.top, [
      { label: "Chart Elements", disabled: true },
      { label: box(Boolean(ch.axisTitles), "Axis Titles"), command: "chart.addElement", value: ch.axisTitles ? "Axis Titles: None" : "Axis Titles: Primary Horizontal" },
      { label: box(ch.showTitle !== false, "Chart Title"), command: "chart.addElement", value: ch.showTitle !== false ? "Chart Title: None" : "Chart Title: Above Chart" },
      { label: box(Boolean(ch.dataLabels), "Data Labels"), command: "chart.addElement", value: ch.dataLabels ? "Data Labels: None" : "Data Labels: Outside End" },
      { label: box(ch.gridlines !== false, "Gridlines"), command: "chart.addElement", value: ch.gridlines !== false ? "Gridlines: None" : "Gridlines: Primary Major Horizontal" },
      { label: box(Boolean(ch.legend), "Legend"), command: "chart.addElement", value: ch.legend ? "Legend: None" : "Legend: Bottom" },
    ]);
  };

  const slideProps = {
    interactive: true,
    selection: ui.selection,
    editing,
    onPart: (key: string, e: React.MouseEvent) => selectPart(key, e),
    onEditStart: (key: string) => startEdit(key),
    onEditChange: (t: string) => editRef.current && setEditing({ key: editRef.current.key, text: t }),
    onEditCommit: commitEdit,
    onEditFormat: (command: string, range: [number, number]) => {
      const ed = editRef.current;
      if (!ed) return;
      if (!rangeable(ed.key)) { commitEdit(); return; }
      commitEdit(undefined, range);
      onCommit({ kind: "command", id: command });
    },
    onEditCancel: () => setEditing(null),
    onContext: partMenu,
    onLineDrop: (from: string, to: number) => onCommit({ kind: "command", id: "text.move", value: `${from}@${to}` }),
    onInsertIcon: (part: string, dialog: string) => { onSelect({ selection: `${slide.id}.${part}`, slide: slide.id }); openDialog(dialog); },
    onChartButton: chartMenu,
    onMedia: onCommit,
    showBadges: true,
  };

  /* ---------- thumbnails ---------- */

  const collapsed = new Set(flagJson<string[]>(deck, "collapsed", []));
  const thumbs = (
    <aside className="w-44 shrink-0 overflow-auto border-r border-gray-300 bg-[#f3f3f3] py-2" aria-label="Slide thumbnails">
      {deck.slides.map((s, i) => {
        const showSection = s.section && (i === 0 || deck.slides[i - 1].section !== s.section);
        const isCollapsed = Boolean(s.section && collapsed.has(s.section));
        const active = s.id === slide.id;
        const count = s.section ? deck.slides.filter((x) => x.section === s.section).length : 0;
        return (
          <div key={s.id}>
            {showSection && (
              <button
                type="button"
                onClick={() => onCommit({ kind: "command", id: "section.toggle", value: s.section })}
                onContextMenu={(e) => sectionMenu(e, s)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragFrom) {
                    // Dropping on a heading lands the slide at the end of the section above it.
                    const f = deck.slides.findIndex((x) => x.id === dragFrom);
                    const pos = f < i ? i : i + 1;
                    const into = i > 0 ? deck.slides[i - 1].section ?? "" : s.section ?? "";
                    onCommit({ kind: "command", id: "slides.move", value: `${dragFrom}@${Math.max(1, pos)}|${into}` });
                  }
                  setDragFrom(null);
                }}
                className="flex w-full items-center gap-1 px-2 pb-1 pt-2 text-left text-[11px] font-semibold text-gray-600 hover:text-gray-900"
                title={`${s.section} (right-click for section options)`}
              >
                <span>{isCollapsed ? "▸" : "▾"}</span>
                <span className="truncate">{s.section}</span>
                {isCollapsed && <span className="font-normal text-gray-500">({count})</span>}
              </button>
            )}
            {!isCollapsed && (
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
                <div className={`border-2 ${active ? (ui.selection === s.id ? "border-[#c43e1c]" : "border-[#e8a08a]") : "border-transparent hover:border-[#f4b183]"} ${s.hidden ? "opacity-50" : ""}`}>
                  <SlideView deck={deck} slide={s} width={128} index={i} />
                </div>
                <span className="flex w-3 flex-col gap-0.5 text-[10px] text-gray-500">
                  {s.transition && <span title={`Transition: ${s.transition}`}>★</span>}
                  {(s.comments?.length ?? 0) > 0 && <span title="Comments">💬</span>}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );

  /* ---------- views ---------- */

  if (view === "show") return <SlideShow deck={deck} onCommit={onCommit} onContextMenu={onContextMenu} />;

  /* ---------- dialogs drawn by the canvas (open while flags.pptDialog names them) ---------- */

  const dlg = String(deck.flags?.pptDialog ?? "");
  const dlgCommit = (c: SimCommit) => onCommit(c);
  const dlgBody =
    dlg === "customShows" ? <CustomShowsDialog deck={deck} onCommit={dlgCommit} /> :
    dlg === "links" ? <LinksDialog deck={deck} onCommit={dlgCommit} /> :
    dlg === "markedFinal" ? <MarkedFinalDialog onCommit={dlgCommit} /> :
    null;
  const modal = dlgBody ? (portalRoot ? createPortal(dlgBody, portalRoot) : dlgBody) : null;

  // Mark as Final: the message bar under the Ribbon, with Edit Anyway.
  const finalBar = isFinal(deck) ? (
    <div role="status" aria-label="Marked as final" className="flex shrink-0 items-center gap-3 border-b border-[#e1c66b] bg-[#fff4ce] px-3 py-1.5 text-[12px] text-gray-900">
      <span className="font-semibold">MARKED AS FINAL</span>
      <span>An author has marked this presentation as final to discourage editing.</span>
      <button type="button" onClick={() => onCommit({ kind: "command", id: "file.editAnyway" })} className="border border-gray-400 bg-white px-2.5 py-0.5 hover:bg-gray-100">Edit Anyway</button>
    </div>
  ) : null;

  if (view === "reading") {
    return (
      <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="flex h-full flex-col bg-[#3a3a3a] outline-none">
        <div ref={mainRef} className="flex flex-1 items-center justify-center overflow-hidden p-2" onClick={() => nav(1)}>
          <SlideView deck={deck} slide={slide} width={fitW(16, 16)} index={idx} />
        </div>
        <div className="flex items-center justify-between bg-[#f3f3f3] px-3 py-1 text-[11px] text-gray-700">
          <span>Reading View · Slide {idx + 1} of {deck.slides.length}</span>
          <span className="flex gap-2">
            <button type="button" aria-label="Previous slide" onClick={() => nav(-1)} className="px-2 hover:bg-gray-200">◀</button>
            <button type="button" aria-label="Next slide" onClick={() => nav(1)} className="px-2 hover:bg-gray-200">▶</button>
            <button type="button" onClick={() => onCommit({ kind: "command", id: "view.mode", value: "Normal" })} className="px-2 hover:bg-gray-200">Normal (Esc)</button>
          </span>
        </div>
      </div>
    );
  }

  if (view === "sorter") {
    return (
      <div className="flex h-full flex-col">
      {finalBar}
      <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="min-h-0 flex-1 overflow-auto bg-[#e7e7e7] p-4 outline-none">
        {modal}
        <div className="flex flex-wrap gap-4">
          {deck.slides.map((s, i) => {
            const head = s.section && (i === 0 || deck.slides[i - 1].section !== s.section);
            const isCollapsed = Boolean(s.section && collapsed.has(s.section));
            return (
              <div key={s.id} className="contents">
                {head && (
                  <button type="button" onClick={() => onCommit({ kind: "command", id: "section.toggle", value: s.section })} onContextMenu={(e) => sectionMenu(e, s)} className="w-full text-left text-[12px] font-semibold text-gray-700">
                    {isCollapsed ? "▸" : "▾"} {s.section}
                  </button>
                )}
                {!isCollapsed && (
                  <div
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
                    <div className={`border-[3px] ${s.id === slide.id ? "border-[#c43e1c]" : "border-transparent"} ${s.hidden ? "opacity-50" : ""}`}>
                      <SlideView deck={deck} slide={s} width={200} index={i} />
                    </div>
                    <div className="mt-1 flex justify-between text-[11px] text-gray-600">
                      <span className={s.hidden ? "line-through" : ""}>{i + 1}</span>
                      <span>{s.transition ? `★ ${s.transition}` : ""}{s.transitionOptions?.advanceAfter ? `  ${String(Math.floor(s.transitionOptions.advanceAfter / 60)).padStart(2, "0")}:${String(Math.round(s.transitionOptions.advanceAfter % 60)).padStart(2, "0")}` : ""}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    );
  }

  const pane = deck.pane;
  const showNotes = !deck.flags?.hideNotes && view !== "notes" && view !== "master";
  const m = readMaster(deck);
  const masterKey = view === "master" ? (ui.slide === "master" || ui.slide?.startsWith("layout:") ? ui.slide : "master") : "";

  const masterPane = view === "master" && (
    <aside className="w-48 shrink-0 overflow-auto border-r border-gray-300 bg-[#f3f3f3] py-2 text-[11px]" aria-label="Slide Master thumbnails">
      {["master", ...LAYOUTS.map((l) => `layout:${l}`), ...(m.customLayouts ?? []).map((l) => `layout:${l}`)].map((k, i) => {
        const name = k === "master" ? `${deck.theme ?? "Office Theme"} Slide Master` : layoutName(deck, k.slice(7));
        const selected = masterKey === k;
        const used = k === "master" ? deck.slides.length : deck.slides.filter((s) => s.layout === k.slice(7)).length;
        return (
          <button key={k} type="button" title={`${name}: used by ${used} slide${used === 1 ? "" : "s"}`} onClick={() => onSelect({ slide: k, selection: k })} className={`mb-1.5 block ${i ? "ml-5 w-[78%]" : "ml-1 w-[90%]"} text-left`}>
            <div className={`border-2 ${selected ? "border-[#c43e1c]" : "border-transparent hover:border-[#f4b183]"}`}>
              <SlideView deck={deck} slide={masterSlide(deck, k)} width={i ? 130 : 152} index={0} />
            </div>
            <div className="truncate pt-0.5">{name}</div>
          </button>
        );
      })}
    </aside>
  );

  const rulerOn = Boolean(deck.flags?.["view.ruler"]) && view === "normal";
  const slideW = fitW(40 + (rulerOn ? 18 : 0), 32 + (rulerOn ? 18 : 0)) * Number(deck.flags?.zoom ?? 100) / 100;

  return (
    <div className="flex h-full flex-col">
    {finalBar}
    <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="flex min-h-0 flex-1 outline-none">
      {modal}
      {pane === "Clipboard" && <ClipboardPane deck={deck} onCommit={onCommit} onContextMenu={onContextMenu} />}
      {view === "outline" ? (
        <aside className="w-64 shrink-0 overflow-auto border-r border-gray-300 bg-white p-2 text-[12px]" aria-label="Outline">
          {deck.slides.map((s, i) => (
            <div key={s.id} className={`mb-2 rounded p-1 ${s.id === slide.id ? "bg-[#fde9d9]" : ""}`}>
              <div
                className="flex cursor-text gap-2 font-semibold"
                onClick={() => onSelect({ slide: s.id, selection: `${s.id}.title` })}
                onDoubleClick={() => startEdit(`${s.id}.title`)}
              >
                <span className="text-gray-500">{i + 1}</span>
                <Icon name="newSlide" size={14} />
                {editing?.key === `${s.id}.title` && view === "outline" ? (
                  <div className="flex-1"><PartEditor value={editing.text} onChange={(t) => setEditing({ key: `${s.id}.title`, text: t })} onCommit={() => commitEdit()} onCancel={() => setEditing(null)} /></div>
                ) : (s.title || <span className="font-normal text-gray-400">(untitled)</span>)}
              </div>
              <div onClick={() => onSelect({ slide: s.id, selection: `${s.id}.body` })} onDoubleClick={() => startEdit(`${s.id}.body`)} className="cursor-text">
                {editing?.key === `${s.id}.body` && view === "outline" ? (
                  <div className="ml-8 h-24"><PartEditor multiline tabMode="indent" value={editing.text} onChange={(t) => setEditing({ key: `${s.id}.body`, text: t })} onCommit={() => commitEdit()} onCancel={() => setEditing(null)} /></div>
                ) : (s.body ?? []).map((b, j) => <div key={j} className="text-gray-700" style={{ paddingLeft: 32 + (/^\t+/.exec(b)?.[0].length ?? 0) * 16 }}>• {b.replace(/^\t+/, "")}</div>)}
              </div>
            </div>
          ))}
        </aside>
      ) : view === "master" ? masterPane : (
        thumbs
      )}

      <div className="relative flex min-w-0 flex-1 flex-col bg-[#e7e7e7]">
        <div ref={mainRef} className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-4" onMouseDown={() => { if (editRef.current) commitEdit(); }}>
          {view === "master" ? (
            <div className="shadow-[0_0_0_1px_#c8c8c8,0_2px_8px_rgba(0,0,0,.18)]">
              <SlideView
                deck={{ ...deck, master: (masterKey === "master" || !masterKey ? { ...m, objects: [], layoutObjects: {} } : { ...m, layoutObjects: {} }) as PptDeck["master"] }}
                slide={masterSlide(deck, masterKey || "master")}
                width={fitW(40, 32)}
                index={0}
                {...slideProps}
                onInsertIcon={undefined}
                onContext={(e: React.MouseEvent, key: string) => { e.preventDefault(); e.stopPropagation(); onSelect({ selection: key, slide: key.split(".")[0] }); }}
                showBadges={false}
              />
            </div>
          ) : view === "notes" ? (
            <div className="bg-white p-6 shadow" style={{ width: Math.min(mainW - 40, 620) }}>
              <SlideView deck={deck} slide={slide} width={Math.min(mainW - 88, 572)} index={idx} />
              <div
                onMouseDown={(e) => { e.stopPropagation(); onSelect({ selection: `${slide.id}.notes` }); }}
                onDoubleClick={() => startEdit(`${slide.id}.notes`)}
                onContextMenu={(e) => partMenu(e, `${slide.id}.notes`)}
                className={`mt-4 min-h-[100px] border p-2 text-[13px] ${ui.selection === `${slide.id}.notes` ? "border-gray-600" : "border-dashed border-gray-300"}`}
              >
                {editing?.key === `${slide.id}.notes` ? <PartEditor multiline value={editing.text} onChange={(t) => setEditing({ key: `${slide.id}.notes`, text: t })} onCommit={() => commitEdit()} onCancel={() => setEditing(null)} /> : slide.notes || <span className="text-gray-400">Click to add text</span>}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {rulerOn && <div className="mb-0.5 h-[14px] bg-white text-[8px] text-gray-500" style={{ width: slideW, marginLeft: 16, backgroundImage: "repeating-linear-gradient(90deg,#999 0 1px,transparent 1px 7.2%)" }} />}
              <div className="flex">
                {rulerOn && <div className="mr-0.5 w-[14px] bg-white" style={{ backgroundImage: "repeating-linear-gradient(180deg,#999 0 1px,transparent 1px 13.3%)" }} />}
                <div className="shadow-[0_0_0_1px_#c8c8c8,0_2px_8px_rgba(0,0,0,.18)]" style={{ filter: deck.flags?.["view.grayscale"] === "Grayscale" ? "grayscale(1)" : deck.flags?.["view.grayscale"] === "Black and White" ? "grayscale(1) contrast(3)" : undefined }}>
                  <SlideView deck={deck} slide={slide} width={slideW} index={idx} {...slideProps} />
                </div>
              </div>
            </div>
          )}
        </div>
        {showNotes && (
          <div
            onMouseDown={() => onSelect({ selection: `${slide.id}.notes` })}
            onDoubleClick={() => startEdit(`${slide.id}.notes`)}
            onContextMenu={(e) => partMenu(e, `${slide.id}.notes`)}
            className={`h-16 shrink-0 cursor-text overflow-auto border-t border-gray-300 bg-white px-4 py-2 text-[12px] ${ui.selection === `${slide.id}.notes` ? "outline outline-1 outline-gray-500" : ""}`}
            aria-label="Notes"
          >
            {editing?.key === `${slide.id}.notes` ? (
              <PartEditor multiline value={editing.text} onChange={(t) => setEditing({ key: `${slide.id}.notes`, text: t })} onCommit={() => commitEdit()} onCancel={() => setEditing(null)} />
            ) : slide.notes ? (
              slide.notes
            ) : (
              <span className="text-gray-400">Click to add notes</span>
            )}
          </div>
        )}
        {pane === "Chart Data" && <ChartDataSheet deck={deck} onCommit={onCommit} />}
      </div>

      {pane && pane !== "Chart Data" && pane !== "Clipboard" && <PptPane deck={deck} ui={ui} pane={pane} onCommit={onCommit} openDialog={openDialog} onSelect={onSelect} onContextMenu={onContextMenu} />}
    </div>
    </div>
  );
}

export function PptStatusBar({ doc: deck, ui, onCommit }: StatusBarProps<PptDeck>) {
  // A slide show (and Presenter View) fills the screen: PowerPoint's window and its status bar are hidden.
  if (deck.view === "show") return null;
  const slide = activeSlide(deck, ui);
  const idx = deck.slides.findIndex((s) => s.id === slide?.id);
  const zoom = Number(deck.flags?.zoom ?? 100);
  const views: [string, string, string][] = [
    ["Normal", "normalView", "normal"],
    ["Slide Sorter", "sorter", "sorter"],
    ["Reading View", "readMode", "reading"],
  ];
  const t = themeOf(deck);
  return (
    <div className="flex h-6 shrink-0 items-center gap-4 border-t border-gray-300 bg-[#f3f3f3] px-3 text-[11px] text-gray-700">
      <span>{deck.view === "master" ? "Slide Master" : `Slide ${idx + 1} of ${deck.slides.length}`}</span>
      {isFinal(deck) && <span title="This presentation has been marked as final." aria-label="Marked as Final" className="flex items-center"><Icon name="protect" size={13} /></span>}
      <span className="hidden sm:inline">English (United States)</span>
      {deck.flags?.lastAction && <span className="hidden text-gray-500 sm:inline">Last action: {String(deck.flags.lastAction)}</span>}
      <span className="flex-1" />
      <span className="hidden text-gray-400 md:inline" title="Theme">{deck.theme ?? "Office Theme"}{t.dark ? " (dark)" : ""}</span>
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
        <button type="button" title="Fit slide to current window" aria-label="Fit slide to current window" onClick={() => onCommit({ kind: "command", id: "view.fit" })} className="rounded p-0.5 hover:bg-gray-200"><Icon name="pageWidth" size={14} /></button>
      </span>
    </div>
  );
}

export type { PptObject };
