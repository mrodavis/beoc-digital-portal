"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { WordDoc, WordPara, WordRun } from "@/types/sim";
import type { CanvasProps, MenuItem, SimUi, StatusBarProps } from "../../types";
import {
  RESTRICT_TYPES,
  activeRecipients,
  canTypeAt,
  dictationText,
  headingsOf,
  marginsOf,
  noteLabel,
  noteRefs,
  notesOf,
  pagesOf,
  selectionPage,
  paraLook,
  paraRange,
  paraText,
  parseSel,
  runsOf,
  sectionIndex,
  sectionProps,
  themeOf,
  wordCount,
  type TabStop,
  type XChart,
  type XDoc,
  type XObject,
  type XPara,
  type XRun,
  type XTable,
} from "./model";
import { Icon } from "../../chrome/icons";

const PX_PER_IN = 96;
const PT = 4 / 3;

const xp = (p: WordPara) => p as XPara;

function pageSize(doc: WordDoc, orientation?: "portrait" | "landscape") {
  const size = doc.page?.size ?? "Letter";
  let w = 8.5, h = 11;
  if (size === "Legal") h = 14;
  if (size === "A4") { w = 8.27; h = 11.69; }
  if (size === "A5") { w = 5.83; h = 8.27; }
  if (size === "Executive") { w = 7.25; h = 10.5; }
  if ((orientation ?? doc.page?.orientation) === "landscape") [w, h] = [h, w];
  return { w, h };
}

function cssFont(f?: string) {
  return f ? `'${f}', Calibri, 'Segoe UI', Arial, sans-serif` : undefined;
}

function capsStyle(c?: string): React.CSSProperties {
  if (c === "upper") return { textTransform: "uppercase" };
  if (c === "lower") return { textTransform: "lowercase" };
  if (c === "title") return { textTransform: "capitalize" };
  return {};
}

/** Text of whatever the selection key points at, for in-place editing. */
function textAt(doc: WordDoc, key: string): string {
  if (key === "header") return doc.header ?? "";
  if (key === "footer") return doc.footer ?? "";
  const s = parseSel(doc, key);
  if (s.note) return notesOf(doc, s.note.kind)[s.note.n - 1] ?? "";
  if (s.cell) {
    const p = doc.paragraphs.find((x) => x.id === s.cell!.para);
    return p?.table?.rows[s.cell.r - 1]?.[s.cell.c - 1] ?? "";
  }
  if (s.run) {
    const p = doc.paragraphs.find((x) => x.id === s.run!.para);
    return p?.runs?.find((r) => r.id === s.run!.run)?.text ?? "";
  }
  const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
  if (!p) return "";
  if (p.object && (p.kind === "textbox" || p.kind === "shape")) return p.object.text ?? "";
  if (p.kind === "chart") return p.chart?.title ?? "";
  return paraText(p);
}

function editable(doc: WordDoc, key: string): boolean {
  if (!key || key === "all" || key.includes(",")) return false;
  // Restrict Editing: a protected form only lets you type in its content controls.
  if (!canTypeAt(doc, key)) return false;
  if (key === "header" || key === "footer") return true;
  const s = parseSel(doc, key);
  if (s.note) return true;
  if (s.cell) return s.cell.r > 0 && s.cell.c > 0;
  if (s.run) {
    const r = doc.paragraphs.find((x) => x.id === s.run!.para)?.runs?.find((x) => x.id === s.run!.run) as XRun | undefined;
    // Check boxes and pictures are clicked, not typed into.
    return !(r?.cc && (r.cc.type === "checkBox" || r.cc.type === "picture" || r.cc.lockEdit));
  }
  const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
  if (!p) return false;
  if (p.kind === "textbox" || p.kind === "shape" || p.kind === "chart") return true;
  return !p.kind || p.kind === "p";
}

/**
 * What is open for typing: the selection key, the text so far, whether the
 * original was placeholder text (`ph`, replaced as you type, with `phText`
 * still showing until you do), and whether the text starts out selected.
 */
type Editing = { key: string; text: string; ph?: boolean; phText?: string; selectAll?: boolean };

const isPlaceholderText = (t: string) => /^\[[^\]]*\]$/.test(t.trim()) || /^(\[Type here\]\s*)+$/.test(t.trim());

function editState(doc: WordDoc, key: string, initial?: string, selectAll = false): Editing {
  const cur = textAt(doc, key);
  // Placeholder text ("[Type here]", "[Recipient Name]") is replaced as you type, like a content control.
  const ph = isPlaceholderText(cur);
  return { key, text: initial ?? (ph ? "" : cur), ph, phText: ph ? cur.trim() : undefined, selectAll: selectAll && initial === undefined && !ph && Boolean(cur) };
}

/** Right-click › Synonyms and Review › Thesaurus offer these replacements (keys are lowercase). */
const SYNONYMS: Record<string, string[]> = {
  important: ["significant", "essential", "critical", "key"],
  help: ["assist", "support", "aid"],
  quick: ["fast", "rapid", "prompt"],
  show: ["display", "present", "reveal"],
  big: ["large", "substantial", "major"],
  begin: ["start", "commence", "initiate"],
  urgent: ["pressing", "time-sensitive", "critical"],
  check: ["monitor", "verify", "examine", "inspect"],
  reliable: ["dependable", "trustworthy", "consistent", "accurate"],
  regular: ["routine", "steady", "frequent", "consistent"],
};

const PALETTES: Record<string, string[]> = {
  "Colorful Palette 1": ["#4472C4", "#ED7D31", "#A5A5A5", "#FFC000", "#5B9BD5", "#70AD47"],
  "Colorful Palette 2": ["#ED7D31", "#FFC000", "#70AD47", "#5B9BD5", "#A5A5A5", "#4472C4"],
  "Monochromatic Palette 1": ["#1F3864", "#2F5496", "#4472C4", "#8EAADB", "#B4C6E7", "#D9E2F3"],
};

const SHAPE_CLIP: Record<string, string> = {
  "Right Arrow": "polygon(0 25%, 65% 25%, 65% 0, 100% 50%, 65% 100%, 65% 75%, 0 75%)",
  "Down Arrow": "polygon(25% 0, 75% 0, 75% 60%, 100% 60%, 50% 100%, 0 60%, 25% 60%)",
  "Star: 5 Points": "polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
  Triangle: "polygon(50% 0,100% 100%,0 100%)",
  Diamond: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
  "Flowchart: Decision": "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
  Hexagon: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)",
  "Double Wave": "polygon(0 8%, 25% 0, 50% 8%, 75% 0, 100% 8%, 100% 92%, 75% 100%, 50% 92%, 25% 100%, 0 92%)",
  "Speech Bubble: Rectangle": "polygon(0 0, 100% 0, 100% 75%, 45% 75%, 25% 100%, 28% 75%, 0 75%)",
};

/* ------------------------------------------------------------------ */

export function WordCanvas({ doc, ui, onSelect: onSelectRaw, onCommit, onContextMenu, openDialog }: CanvasProps<WordDoc>) {
  // The last selection the canvas made, so a text box that loses focus to the Ribbon can leave its
  // insertion point behind (for Insert › Symbol) unless you clicked something else first. Every
  // selection the canvas makes drops that insertion point.
  const lastSel = useRef(ui.selection);
  const onSelect = (patch: Partial<SimUi>) => {
    if (patch.selection !== undefined) lastSel.current = patch.selection;
    onSelectRaw({ ...patch, caret: undefined } as Partial<SimUi>);
  };
  const [editing, setEditingState] = useState<Editing | null>(null);
  const editingRef = useRef<Editing | null>(null);
  const setEditing = (v: Editing | null) => {
    editingRef.current = v;
    setEditingState(v);
  };
  const [findText, setFindText] = useState("");
  /**
   * The page whose header/footer is open for typing. The header and footer
   * repeat on every page, but only this page's copy is an editor (the others
   * show the same text, read-only), so exactly one text box ever has focus.
   */
  const [hfPage, setHfPage] = useState(0);
  /** The page of the last body selection: Go to Header / Go to Footer open that page's header or footer. */
  const bodyPageRef = useRef(0);
  /** The selection as of the previous render (to tell "entered the header" from "moved within it"). */
  const prevSelRef = useRef(ui.selection);
  /** Last seen `flags.hfEdit`: the model bumps it when a command puts the cursor in the header or footer. */
  const hfSeenRef = useRef(doc.flags?.hfEdit);
  const scrollRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  /** Ctrl+Click on a contents entry or cross-reference: the paragraph to scroll to once the cursor moves there. */
  const jumpRef = useRef<string | null>(null);
  const z = (doc.zoom ?? 100) / 100;
  const view = doc.view ?? "print";
  const sel = parseSel(doc, ui.selection);
  const selected = new Set(sel.paras);
  const markup = doc.markup ?? "all";
  const pageBg = doc.pageColor ?? "#fff";

  useEffect(() => {
    const target = jumpRef.current;
    if (!target || ui.selection !== target) return;
    jumpRef.current = null;
    const sc = scrollRef.current;
    const el = sc?.querySelector(`[data-para="${CSS.escape(target)}"]`);
    if (sc && el) sc.scrollTop += el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 24;
  }, [ui.selection]);

  /** Follow a contents entry or cross-reference (Ctrl+Click): Word moves the cursor to that paragraph and scrolls to it. */
  const followTo = (pid: string, target: string) => {
    jumpRef.current = pid;
    onCommit({ kind: "click", target });
  };

  useEffect(() => {
    const key = ui.selection;
    let next: Editing | null = null;
    // Insert Footnote / Insert Endnote put the cursor in the new, empty note.
    if (/^(footnote|endnote):\d+$/.test(key) && !textAt(doc, key)) next = { key, text: "" };
    // Insert › Header/Footer and Header & Footer › Go to Header/Footer put the cursor in the header or footer.
    const bump = doc.flags?.hfEdit;
    if (bump !== hfSeenRef.current) {
      hfSeenRef.current = bump;
      if ((key === "header" || key === "footer") && editable(doc, key)) {
        // Coming from the body: the page the cursor was on. Moving between header and footer: stay on this page.
        if (prevSelRef.current !== "header" && prevSelRef.current !== "footer") setHfPage(bodyPageRef.current);
        next = editState(doc, key);
      }
    }
    editingRef.current = next;
    setEditingState(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc]);
  // Runs after the effect above in the same commit, so that one still sees the previous selection.
  useEffect(() => {
    prevSelRef.current = ui.selection;
  });

  const focus = () => focusRef.current?.focus({ preventScroll: true });

  const select = (key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (editingRef.current) commitEdit();
    let next = key;
    const base = parseSel(doc, ui.selection).paras;
    const isPara = !key.includes(".") && key !== "header" && key !== "footer";
    if (e?.shiftKey && isPara && base.length) next = paraRange(doc, base[0], key).join(",");
    else if ((e?.ctrlKey || e?.metaKey) && isPara && base.length && !ui.selection.includes(".")) {
      const set = new Set(base);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      next = Array.from(set).join(",");
    } else if (isPara) {
      // Clicking a grouped object selects the whole group.
      const o = doc.paragraphs.find((p) => p.id === key)?.object as XObject | undefined;
      if (o?.group) next = doc.paragraphs.filter((p) => (p.object as XObject | undefined)?.group === o.group).map((p) => p.id).join(",");
    }
    onSelect({ selection: next });
    if (doc.painter) onCommit({ kind: "command", id: "home.formatPainter.apply" });
    focus();
  };

  /**
   * Open `key` for typing. `initial` is the first key typed over a selection
   * (it replaces the text). `selectAll` is a double-click: like Word selecting
   * the word you double-click, the run's (or paragraph's, cell's, title's)
   * text starts out selected, so typing replaces it; press End or click to
   * add to it instead.
   */
  const startEdit = (key: string, initial?: string, selectAll = false) => {
    if (!editable(doc, key)) return;
    // Already typing here (a double-click inside the text box): keep what has been typed.
    if (editingRef.current?.key === key) return;
    onSelect({ selection: key });
    setEditing(editState(doc, key, initial, selectAll));
  };

  /** The text box for whatever is being edited (call only while `editing?.key === key`). */
  const editorFor = (key: string, opts: { inline?: boolean; style?: React.CSSProperties; onTab?: (back: boolean) => void; reactKey?: number } = {}) => (
    <InlineEditor
      key={opts.reactKey}
      value={editing?.text ?? ""}
      placeholder={editing?.ph && !editing.text ? editing.phText : undefined}
      selectAll={editing?.selectAll}
      onChange={(t) => setEditing({ ...editingRef.current!, key, text: t })}
      onCommit={(range) => commitEdit(range)}
      onCancel={() => setEditing(null)}
      onTab={opts.onTab}
      inline={opts.inline}
      style={opts.style}
    />
  );

  /** `range`: where the cursor (or selection) was when the box lost focus to the Ribbon or a menu. */
  const commitEdit = (range?: [number, number]) => {
    const e = editingRef.current;
    if (!e) return;
    const orig = textAt(doc, e.key);
    setEditing(null);
    if (e.ph && !e.text.trim()) return;
    if (e.text !== orig) onCommit({ kind: "type", target: e.key, value: e.text });
    // A paragraph or a run: remember the insertion point for commands that insert at it (Symbol).
    if (range && lastSel.current === e.key && /^[^.,:]+(\.[^.,:]+)?$/.test(e.key) && !/\.r\d+c\d+$/.test(e.key)) {
      onSelectRaw({ caret: `${e.key}@${Math.min(...range)}-${Math.max(...range)}` } as Partial<SimUi>);
    }
  };

  /** Tab / Shift+Tab inside a table: next or previous cell; Tab in the last cell adds a row. */
  const tabInTable = (key: string, back: boolean) => {
    const s = parseSel(doc, key);
    const p = doc.paragraphs.find((x) => x.id === s.cell?.para);
    if (!s.cell || !p?.table) return false;
    const t = p.table as XTable;
    const rows = t.rows.length, cols = t.rows[0]?.length ?? 1;
    const isMerged = (r: number) => t.merged?.includes(r);
    let r = s.cell.r, c = s.cell.c;
    if (back) {
      c -= 1;
      if (c < 1) { r -= 1; c = r >= 1 && isMerged(r) ? 1 : cols; }
      if (r < 1) return true;
    } else {
      c = isMerged(r) ? cols + 1 : c + 1;
      if (c > cols) { r += 1; c = 1; }
      if (r > rows) {
        onCommit({ kind: "command", id: "table.insertBelow", value: "Tab" });
        return true;
      }
    }
    onSelect({ selection: `${p.id}.r${r}c${c}` });
    focus();
    return true;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (editing) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
      e.preventDefault();
      e.stopPropagation();
      onSelect({ selection: "all" });
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Tab") {
      if (sel.cell && sel.cell.r > 0 && sel.cell.c > 0) {
        e.preventDefault();
        tabInTable(ui.selection, e.shiftKey);
        return;
      }
      const ps = sel.paras.map((id) => doc.paragraphs.find((p) => p.id === id));
      if (!sel.cell && ps.length && ps.every((p) => p?.list)) {
        e.preventDefault();
        onCommit({ kind: "command", id: e.shiftKey ? "home.indentDec" : "home.indentInc" });
      }
      return;
    }
    if (e.key === "Escape" && view === "read") {
      onCommit({ kind: "command", id: "view.mode", value: "Print Layout" });
      return;
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      if (ui.selection && ui.selection !== "header" && ui.selection !== "footer") {
        e.preventDefault();
        onCommit({ kind: "command", id: "edit.delete" });
      }
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const ids = doc.paragraphs.map((p) => p.id);
      const cur = ids.indexOf(sel.paras[sel.paras.length - 1]);
      const n = ids[Math.max(0, Math.min(ids.length - 1, cur + (e.key === "ArrowDown" ? 1 : -1)))];
      if (n) {
        e.preventDefault();
        onSelect({ selection: e.shiftKey && sel.paras.length ? paraRange(doc, sel.paras[0], n).join(",") : n });
      }
      return;
    }
    if (e.key === "Enter" || e.key === "F2") {
      if (editable(doc, ui.selection)) {
        e.preventDefault();
        startEdit(ui.selection);
      }
      return;
    }
    if (e.key.length === 1 && editable(doc, ui.selection)) {
      e.preventDefault();
      startEdit(ui.selection, e.key);
    }
  };

  const ctxMenu = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (ui.selection !== key && !(ui.selection.split(",").includes(key))) onSelect({ selection: key });
    const items: MenuItem[] = [];
    const s = parseSel(doc, key);
    const run = s.run ? doc.paragraphs.find((x) => x.id === s.run!.para)?.runs?.find((x) => x.id === s.run!.run) : undefined;
    if (run?.misspelled) {
      (run.suggestions ?? []).forEach((sg) => items.push({ label: sg, command: "spelling.change", value: sg }));
      items.push({ label: "Ignore All", command: "spelling.ignore" }, { separator: true });
    }
    items.push(
      { label: "Cut", icon: "cut", command: "home.cut", shortcut: "Ctrl+X" },
      { label: "Copy", icon: "copy", command: "home.copy", shortcut: "Ctrl+C" },
      { label: "Paste: Keep Source Formatting", icon: "paste", command: "home.paste", value: "Keep Source Formatting" },
      { label: "Paste: Keep Text Only", icon: "paste", command: "home.paste", value: "Keep Text Only" },
      { separator: true },
    );
    const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
    // A tracked change under the pointer: accept or reject it right here.
    if ((run && (run.ins || run.del)) || (!s.run && p && runsOf(p).some((r) => r.ins || r.del))) {
      items.push(
        { label: "Accept Change", icon: "accept", command: "review.accept", value: "Accept This Change" },
        { label: "Reject Change", icon: "reject", command: "review.reject", value: "Reject Change" },
        { separator: true },
      );
    }
    const cc = (run as XRun | undefined)?.cc;
    if (cc) {
      if (cc.type === "dropDown" || cc.type === "comboBox") (cc.items ?? []).forEach((it) => items.push({ label: it, command: "contentControl.choose", value: it }));
      items.push({ label: "Properties...", icon: "options", dialog: "controlProperties" }, { separator: true });
    }
    if (s.cell || p?.kind === "table") {
      const wide = s.cell && (s.cell.r === 0 || s.cell.c === 0);
      items.push(
        { label: "Insert Rows Above", icon: "insertCells", command: "table.insertAbove" },
        { label: "Insert Rows Below", icon: "insertCells", command: "table.insertBelow" },
        { label: "Insert Columns to the Left", icon: "insertCells", command: "table.insertLeft" },
        { label: "Insert Columns to the Right", icon: "insertCells", command: "table.insertRight" },
        { label: "Delete Row", icon: "deleteCells", command: "table.delete", value: "Delete Rows" },
        { label: "Delete Column", icon: "deleteCells", command: "table.delete", value: "Delete Columns" },
        { label: "Delete Table", icon: "deleteCells", command: "table.delete", value: "Delete Table" },
        ...(wide ? [{ label: "Merge Cells", icon: "merge", command: "table.merge" } as MenuItem] : []),
        { separator: true },
      );
    } else if (p?.object || p?.kind === "chart") {
      items.push({ label: "View Alt Text...", icon: "altText", dialog: "altText" });
      if (p.object) {
        items.push(
          { label: "Wrap Text: Square", icon: "wrapText", command: p.kind === "image" ? "picture.wrap" : "shape.wrap", value: "Square" },
          { label: "Wrap Text: In Line with Text", icon: "wrapText", command: p.kind === "image" ? "picture.wrap" : "shape.wrap", value: "In Line with Text" },
          { label: "Bring Forward", icon: "bringForward", command: "object.bringForward", value: "Bring Forward" },
          { label: "Send Backward", icon: "sendBackward", command: "object.sendBackward", value: "Send Backward" },
        );
        if (sel.paras.length > 1) items.push({ label: "Group", icon: "groupObjects", command: "object.group", value: "Group" });
        if ((p.object as XObject).group) items.push({ label: "Ungroup", icon: "groupObjects", command: "object.ungroup", value: "Ungroup" });
      }
      items.push({ separator: true });
    } else if (p?.kind === "toc") {
      items.push({ label: "Update Field", icon: "reset", command: "references.updateToc", shortcut: "F9" }, { separator: true });
    } else {
      items.push({ label: "Font...", icon: "fontColor", dialog: "font" }, { label: "Paragraph...", icon: "lineSpacing", dialog: "paragraph" });
      if (p?.list === "number") {
        items.push(
          { separator: true },
          { label: "Restart at 1", icon: "numbering", command: "list.restart" },
          { label: "Continue Numbering", icon: "numbering", command: "list.continue" },
          { label: "Set Numbering Value...", icon: "numbering", dialog: "setNumbering" },
        );
      }
      items.push({ separator: true });
    }
    // Right-click › Synonyms (shown flat): one entry per synonym for a single selected word, then Thesaurus.
    const syns = run && !run.misspelled ? SYNONYMS[run.text.trim().toLowerCase()] : undefined;
    if (syns) {
      items.push({ label: "Synonyms", icon: "thesaurus", disabled: true });
      syns.forEach((w) => items.push({ label: w, command: "thesaurus.insert", value: w }));
      items.push({ label: "Thesaurus...", icon: "thesaurus", command: "review.thesaurus", shortcut: "Shift+F7" }, { separator: true });
    }
    if (run?.link) {
      items.push(
        { label: "Edit Hyperlink...", icon: "link", dialog: "link" },
        { label: "Open Hyperlink", icon: "link", command: "link.open", value: run.link },
        { label: "Remove Hyperlink", icon: "link", command: "link.remove" },
      );
    } else items.push({ label: "Link", icon: "link", dialog: "link" });
    items.push({ label: "New Comment", icon: "comment", dialog: "newComment" });
    if (p?.comment) items.push({ label: "Delete Comment", icon: "reject", command: "review.deleteComment", value: "Delete" });
    onContextMenu(e.clientX, e.clientY, items);
  };

  /* ---------- run + paragraph rendering ---------- */

  const runVisible = (r: WordRun) => {
    if (markup === "none" && r.del) return false;
    if (markup === "simple" && r.del) return false;
    if (markup === "original" && r.ins) return false;
    return true;
  };

  const mergeValue = (field: string, record: Record<string, string>): string => {
    if (record[field] !== undefined) return record[field];
    if (field === "AddressBlock") {
      const name = [record.First_Name, record.Last_Name].filter(Boolean).join(" ");
      const city = [record.City, [record.State, record.ZIP].filter(Boolean).join(" ")].filter(Boolean).join(", ");
      return [name, record.Address, city].filter(Boolean).join("\n");
    }
    if (field === "GreetingLine") return `Dear ${[record.First_Name, record.Last_Name].filter(Boolean).join(" ")},`;
    return `«${field}»`;
  };

  const runStyle = (p: WordPara, r: WordRun, key?: string): React.CSSProperties => {
    const isSel = key && ui.selection === key;
    const deco: string[] = [];
    if (r.underline ?? false) deco.push("underline");
    if (r.strike) deco.push("line-through");
    const showTrack = markup === "all";
    if (r.ins && showTrack) deco.push("underline");
    if (r.del && showTrack) deco.push("line-through");
    if (r.link && !deco.includes("underline")) deco.push("underline");
    const style: React.CSSProperties = {
      fontWeight: r.bold === undefined ? undefined : r.bold ? 700 : 400,
      fontStyle: r.italic === undefined ? undefined : r.italic ? "italic" : "normal",
      textDecorationLine: deco.length ? deco.join(" ") : undefined,
      textDecorationStyle: r.misspelled ? "wavy" : undefined,
      textDecorationColor: r.misspelled ? "#d13438" : r.ins || r.del ? "#c00000" : undefined,
      color: r.link ? "#0563C1" : (r.ins || r.del) && showTrack ? "#c00000" : r.color,
      background: isSel ? "rgba(0,120,215,.28)" : r.highlight ?? (r.field ? "#e6e6e6" : undefined),
      fontFamily: cssFont(r.font),
      fontSize: r.size ? r.size * PT * z : undefined,
      verticalAlign: r.superscript ? "super" : r.subscript ? "sub" : undefined,
      ...(r.superscript || r.subscript ? { fontSize: "0.7em" } : {}),
      ...capsStyle(r.caps),
      cursor: key ? "text" : undefined,
      borderRadius: isSel ? 2 : undefined,
    };
    if (r.misspelled) style.textDecorationLine = "underline";
    void p;
    return style;
  };

  const renderControl = (p: WordPara, r: XRun, i: number, key: string | undefined, style: React.CSSProperties) => {
    const cc = r.cc!;
    const isSel = Boolean(key) && ui.selection === key;
    const design = Boolean(doc.flags?.designMode);
    const openList = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!key) return;
      select(key, e);
      const items: MenuItem[] =
        cc.type === "datePicker"
          ? ["10/20/2026", "10/21/2026", "10/22/2026", "10/23/2026", "10/26/2026", "10/27/2026", "10/30/2026"].map((d) => ({ label: d, icon: "date", command: "contentControl.choose", value: d }))
          : (cc.items ?? []).length
            ? cc.items!.map((it) => ({ label: it, command: "contentControl.choose", value: it }))
            : [{ label: "(No items: add them in Developer › Properties)", disabled: true }];
      onContextMenu(e.clientX, e.clientY, items);
    };
    let body: React.ReactNode;
    if (cc.type === "checkBox") {
      body = (
        <button
          type="button"
          role="checkbox"
          aria-checked={Boolean(cc.checked)}
          aria-label={cc.title ?? "Check box"}
          onClick={(e) => {
            e.stopPropagation();
            if (!key) return;
            select(key, e);
            onCommit({ kind: "command", id: "contentControl.toggle" });
          }}
          className="px-0.5 leading-none"
          style={{ font: "inherit" }}
        >
          {cc.checked ? "☒" : "☐"}
        </button>
      );
    } else if (editing && key && editing.key === key) {
      body = editorFor(key, { inline: true, style });
    } else if (!r.text) {
      body = <span className="text-gray-500">{cc.type === "picture" ? "🖼 " : ""}{cc.placeholder}</span>;
    } else body = r.text;
    const hasList = cc.type === "dropDown" || cc.type === "comboBox" || cc.type === "datePicker";
    return (
      <span
        key={i}
        data-run={key}
        data-control={cc.type}
        title={cc.title}
        style={{ ...style, background: isSel ? "#e8f0fe" : style.background === "rgba(0,120,215,.28)" ? undefined : style.background, outline: isSel || design ? "1px solid #7da7d9" : undefined, borderRadius: 2, padding: "0 1px" }}
        className="relative cursor-text hover:outline hover:outline-1 hover:outline-[#a7c3e6]"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={key ? (e) => { e.stopPropagation(); select(key, e); } : undefined}
        onDoubleClick={key ? (e) => { e.stopPropagation(); startEdit(key, undefined, true); } : undefined}
        onContextMenu={key ? (e) => ctxMenu(e, key) : undefined}
      >
        {(design || isSel) && cc.title && (
          <span className="absolute -top-3.5 left-0 whitespace-nowrap rounded-t bg-[#7da7d9] px-1 text-[9px] leading-[14px] text-white" style={{ fontStyle: "normal", fontWeight: 400 }}>
            {cc.title}
          </span>
        )}
        {design && <span className="text-[#7da7d9]" aria-hidden="true">[</span>}
        {body}
        {design && <span className="text-[#7da7d9]" aria-hidden="true">]</span>}
        {hasList && (
          <button type="button" aria-label={cc.type === "datePicker" ? "Choose a date" : "Choose an item"} onClick={openList} className="ml-0.5 border-l border-[#a7c3e6] px-0.5 text-[0.8em] text-gray-600">
            ▾
          </button>
        )}
      </span>
    );
  };

  /** A reference mark's note text (shown when you point at the mark). */
  const noteTextOf = (kind: "footnote" | "endnote", label: string): string => {
    const list = notesOf(doc, kind);
    const i = list.findIndex((_, k) => noteLabel(kind, k + 1) === label);
    return i >= 0 ? list[i] : "";
  };

  const mergeRecord = (() => {
    if (!doc.merge?.preview) return undefined;
    const list = activeRecipients(doc);
    return list[Math.min(doc.merge.record ?? 0, Math.max(0, list.length - 1))];
  })();

  const renderRun = (p: WordPara, r: WordRun, i: number, textOverride?: string) => {
    const key = r.id ? `${p.id}.${r.id}` : undefined;
    const x = r as XRun;
    const record = mergeRecord;
    const findTerm = doc.pane?.startsWith("Find:") ? doc.pane.slice(5).toLowerCase() : "";
    const style = runStyle(p, r, key);
    if (x.cc && textOverride === undefined) return renderControl(p, x, i, key, style);
    let text = textOverride ?? (r.field ? (record ? mergeValue(r.field, record) : `«${r.field}»`) : r.text);
    if (editing && key && editing.key === key && textOverride === undefined) {
      return editorFor(key, { inline: true, style, reactKey: i });
    }

    const content: React.ReactNode[] = [];
    if (findTerm && text.toLowerCase().includes(findTerm)) {
      const parts = text.split(new RegExp(`(${findTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "i"));
      parts.forEach((pt, j) => content.push(pt.toLowerCase() === findTerm ? <mark key={j} className="bg-yellow-300">{pt}</mark> : <Fragment key={j}>{pt}</Fragment>));
    } else content.push(text);
    if (!text) text = "";
    return (
      <span
        key={i}
        style={style}
        data-run={key}
        onMouseDown={key ? (e) => { e.stopPropagation(); } : undefined}
        onClick={
          key
            ? (e) => {
                e.stopPropagation();
                if (r.link && (e.ctrlKey || e.metaKey)) onCommit({ kind: "click", target: `link:${r.link}` });
                else if (x.xref && (e.ctrlKey || e.metaKey)) { followTo(x.xref.target, `goto:${x.xref.target}`); return; }
                select(key, e);
              }
            : r.link || x.xref
              ? (e) => {
                  if (e.ctrlKey || e.metaKey) {
                    e.stopPropagation();
                    if (r.link) onCommit({ kind: "click", target: `link:${r.link}` });
                    else followTo(x.xref!.target, `goto:${x.xref!.target}`);
                  }
                }
              : undefined
        }
        onDoubleClick={key ? (e) => { e.stopPropagation(); startEdit(key, undefined, true); } : undefined}
        onContextMenu={key ? (e) => ctxMenu(e, key) : undefined}
        title={r.link ? `${r.link}\nCtrl+Click to follow link` : x.xref ? "Ctrl+Click to follow link" : x.note ? noteTextOf(x.note, r.text) || undefined : undefined}
      >
        {content}
      </span>
    );
  };

  const renderRuns = (p: WordPara) => runsOf(p).filter(runVisible).map((r, i) => renderRun(p, r, i));

  /** A paragraph with custom tab stops: each tab-separated segment sits at its stop. */
  const renderTabbed = (p: WordPara, stops: TabStop[]) => {
    const segs: { r: WordRun; text: string; i: number }[][] = [[]];
    runsOf(p).filter(runVisible).forEach((r, i) => {
      const parts = r.text.split("\t");
      parts.forEach((t, j) => {
        if (j > 0) segs.push([]);
        if (t) segs[segs.length - 1].push({ r, text: t, i: i * 100 + j });
      });
    });
    const px = (inch: number) => inch * PX_PER_IN * z;
    return (
      <span className="relative block" style={{ minHeight: "1.2em" }}>
        {segs.map((seg, k) => {
          const content = seg.map(({ r, text, i }) => renderRun(p, r, i, text));
          if (k === 0) return <span key={k} className="relative" style={{ background: pageBg, zIndex: 1 }}>{content}</span>;
          const stop = stops[k - 1] ?? { pos: (stops[stops.length - 1]?.pos ?? 0) + 0.5 * (k - stops.length), align: "left" as const };
          const shift = stop.align === "right" || stop.align === "decimal" ? "translateX(-100%)" : stop.align === "center" ? "translateX(-50%)" : undefined;
          const prevPos = k >= 2 ? stops[k - 2]?.pos ?? 0 : 0;
          return (
            <Fragment key={k}>
              {stop.leader && (
                <span
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: px(prevPos),
                    width: Math.max(0, px(stop.pos) - px(prevPos)),
                    bottom: "0.3em",
                    borderBottom: `${stop.leader === "line" ? "1px solid" : stop.leader === "dashes" ? "1px dashed" : "2px dotted"} #444`,
                  }}
                />
              )}
              <span className="absolute top-0 whitespace-nowrap" style={{ left: px(stop.pos), transform: shift, background: pageBg, zIndex: 1, paddingLeft: shift ? 2 : 0, paddingRight: shift ? 0 : 2 }}>
                {content}
              </span>
            </Fragment>
          );
        })}
      </span>
    );
  };

  // List numbering: consecutive numbered paragraphs share a counter per level.
  const numbers: Record<string, string> = {};
  {
    let counters = [0, 0, 0, 0];
    let saved = [0, 0, 0, 0];
    let prevNum = false;
    const roman = ["", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];
    for (const p0 of doc.paragraphs) {
      const p = xp(p0);
      if (p.list === "number") {
        const lvl = Math.min(3, p.listLevel ?? 0);
        if (!prevNum) counters = p.numberContinue ? saved.slice() : [0, 0, 0, 0];
        if (p.numberStart !== undefined) counters[lvl] = p.numberStart - 1;
        counters[lvl] += 1;
        for (let i = lvl + 1; i < 4; i++) counters[i] = 0;
        const n = counters[lvl];
        let label: string;
        if (p.multi === "1. 1.1. 1.1.1.") label = `${counters.slice(0, lvl + 1).join(".")}.`;
        else if (p.multi === "Article I. Section 1.01") label = lvl === 0 ? `Article ${(roman[n] ?? String(n)).toUpperCase()}.` : `Section ${counters[0]}.${String(n).padStart(2, "0")}`;
        else {
          const fmt = lvl === 0 ? p.numberFormat ?? "1." : lvl === 1 ? "a." : "i.";
          label =
            fmt.startsWith("1") ? `${n}${fmt.slice(1)}` :
            fmt.startsWith("A") ? `${String.fromCharCode(64 + n)}${fmt.slice(1)}` :
            fmt.startsWith("a") ? `${String.fromCharCode(96 + n)}${fmt.slice(1)}` :
            fmt.startsWith("I") ? `${(roman[n] ?? String(n)).toUpperCase()}${fmt.slice(1)}` :
            fmt.startsWith("i") ? `${roman[n] ?? n}${fmt.slice(1)}` : `${n}.`;
        }
        numbers[p.id] = label;
        prevNum = true;
        saved = counters.slice();
      } else if (p.list !== "bullet" || !prevNum) {
        prevNum = false;
      }
    }
  }

  const liveHeadings = headingsOf(doc);

  /* ---------- pages ---------- */

  const pages = pagesOf(doc);
  type Page = (typeof pages)[number];
  const pageOf = (pid: string) => Math.max(0, pages.findIndex((pg) => pg.paras.some((p) => p.id === pid)));
  if (sel.paras.length && ui.selection !== "all") bodyPageRef.current = pageOf(sel.paras[0]);

  const renderToc = (p: WordPara, isSel: boolean) => {
    const o = xp(p).tocOptions;
    const entries = xp(p).entries ?? liveHeadings.filter((h) => h.level <= (o?.levels ?? 9));
    // A custom table of contents has no "Contents" title; Automatic Table 2 says "Table of Contents".
    const title = o ? null : p.text === "Automatic Table 2" ? "Table of Contents" : "Contents";
    const showNum = o?.pageNumbers ?? true;
    const right = o?.rightAlign ?? true;
    const leader = o?.leader ?? "dots";
    const fmt = o?.format ?? "From template";
    const entryStyle = (level: number): React.CSSProperties => {
      if (level !== 1) return fmt === "Distinctive" || fmt === "Fancy" ? { fontStyle: "italic" } : {};
      if (fmt === "Classic") return { fontVariant: "small-caps", letterSpacing: 0.3 };
      if (fmt === "Distinctive") return { fontWeight: 700 };
      if (fmt === "Fancy") return { fontWeight: 700, fontSize: 12 * PT * z };
      if (fmt === "Modern") return { fontWeight: 700, color: themeOf(doc).accent };
      if (fmt === "Formal") return { textTransform: "uppercase", letterSpacing: 0.5 };
      return {};
    };
    return (
      <div
        key={p.id}
        onClick={(e) => select(p.id, e)}
        onContextMenu={(e) => ctxMenu(e, p.id)}
        className={`relative my-2 rounded-sm ${isSel ? "outline outline-1 outline-[#2b579a]" : "hover:outline hover:outline-1 hover:outline-gray-300"}`}
        style={{ fontFamily: cssFont(themeOf(doc).bodyFont), fontSize: 11 * PT * z }}
      >
        {isSel && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); openDialog("updateToc"); }}
            className="absolute -top-5 left-0 flex items-center gap-1 rounded-t border border-b-0 border-[#2b579a] bg-white px-1.5 text-[10px] text-[#2b579a]"
          >
            <Icon name="reset" size={10} /> Update Table...
          </button>
        )}
        {title && <div style={{ color: themeOf(doc).heading, fontFamily: cssFont(themeOf(doc).headingFont), fontSize: 16 * PT * z }} className="mb-1">{title}</div>}
        {entries.length === 0 && <div className="italic text-gray-500">No table of contents entries found.</div>}
        {entries.map((h) => (
          <div
            key={h.id}
            className="flex items-end gap-1"
            style={{ paddingLeft: (h.level - 1) * 0.25 * PX_PER_IN * z, ...entryStyle(h.level) }}
            title="Ctrl+Click to follow link"
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey) {
                e.stopPropagation();
                if (doc.paragraphs.some((x) => x.id === h.id)) followTo(h.id, `toc:${h.id}`);
              }
            }}
          >
            <span className="whitespace-nowrap">{h.text}</span>
            {showNum && right && (
              <span
                className={`mb-1 flex-1 border-b ${leader === "dots" ? "border-dotted border-gray-500" : leader === "dashes" ? "border-dashed border-gray-500" : leader === "line" ? "border-solid border-gray-600" : "border-transparent"}`}
              />
            )}
            {showNum && <span className={right ? "" : "ml-1"}>{pageOf(h.id) + 1}</span>}
          </div>
        ))}
      </div>
    );
  };

  const renderTable = (p: WordPara) => {
    const t = p.table as XTable;
    const stylish = t.style && t.style !== "Table Grid";
    const accent = t.headerFill ?? (t.style?.includes("Accent 2") ? "#ED7D31" : t.style?.includes("Accent 6") ? "#70AD47" : t.style?.includes("Dark") ? "#2F5496" : t.style?.startsWith("Plain") ? undefined : themeOf(doc).accent);
    const cellSel = sel.cell && sel.cell.para === p.id ? sel.cell : undefined;
    const width = t.autofit === "AutoFit Contents" ? "auto" : t.align === "center" ? "80%" : "100%";
    return (
      <div key={p.id} className={`my-2 ${t.align === "center" ? "flex justify-center" : ""}`} onContextMenu={(e) => ctxMenu(e, cellSel ? ui.selection : `${p.id}.r1c1`)}>
        <table className="border-collapse" style={{ fontSize: 11 * PT * z, fontFamily: cssFont(themeOf(doc).bodyFont), width }}>
          <tbody>
            {t.rows.map((row, r) => {
              const merged = t.merged?.includes(r + 1);
              const cells = merged ? [row[0]] : row;
              return (
                <tr key={r}>
                  {cells.map((cell, c) => {
                    const key = `${p.id}.r${r + 1}c${c + 1}`;
                    const header = r === 0 && t.headerRow !== false && stylish;
                    const banded = t.bandedRows && r > 0 && r % 2 === 1;
                    const isCell = Boolean(cellSel && (cellSel.r === 0 || cellSel.r === r + 1) && (cellSel.c === 0 || cellSel.c === c + 1 || (merged && cellSel.c <= row.length)));
                    return (
                      <td
                        key={c}
                        colSpan={merged ? row.length : undefined}
                        onClick={(e) => { e.stopPropagation(); select(key, e); }}
                        onDoubleClick={(e) => { e.stopPropagation(); startEdit(key, undefined, true); }}
                        onContextMenu={(e) => ctxMenu(e, isCell ? ui.selection : key)}
                        className="border px-1.5 py-0.5 align-top"
                        style={{
                          borderColor: stylish ? accent ?? "#999" : "#000",
                          background: isCell ? "rgba(0,120,215,.18)" : header ? accent ?? "#f2f2f2" : banded ? "#eef3fb" : undefined,
                          color: header && accent ? "#fff" : undefined,
                          fontWeight: header || (merged && r === 0) ? 700 : undefined,
                          textAlign: merged ? "center" : undefined,
                          minWidth: 40,
                          whiteSpace: t.autofit === "AutoFit Contents" ? "nowrap" : undefined,
                          height: 11 * PT * z * 1.6,
                        }}
                      >
                        {editing?.key === key ? (
                          editorFor(key, { onTab: (back) => { commitEdit(); tabInTable(key, back); } })
                        ) : (
                          cell || " "
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderChart = (p: WordPara, isSel: boolean) => {
    const ch = p.chart as XChart;
    const palette = PALETTES[ch.colors ?? ""] ?? PALETTES["Colorful Palette 1"];
    const els = new Set(ch.elements ?? []);
    const max = Math.max(...ch.series.map((s) => s.value), 1);
    const dark = ch.style === "Style 6";
    const fs = 10 * z;
    const labels = els.has("Data Labels");
    const fmt = (v: number) => (Number.isInteger(v) ? v.toLocaleString() : v.toFixed(1));
    let plot: React.ReactNode;
    if (/Pie|Doughnut/.test(ch.type)) {
      const total = ch.series.reduce((a, s) => a + s.value, 0) || 1;
      let acc = 0;
      const stops = ch.series.map((s, i) => {
        const from = (acc / total) * 100;
        acc += s.value;
        return `${palette[i % palette.length]} ${from}% ${(acc / total) * 100}%`;
      });
      plot = (
        <div className="relative mx-auto aspect-square w-2/5 rounded-full" style={{ background: `conic-gradient(${stops.join(",")})` }}>
          {/Doughnut/.test(ch.type) && <div className="absolute inset-[28%] rounded-full" style={{ background: dark ? "#333" : "#fff" }} />}
          {labels && <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white">{ch.series.map((s) => `${Math.round((s.value / total) * 100)}%`).join(" · ")}</div>}
        </div>
      );
    } else if (/Line|Area/.test(ch.type)) {
      const n = ch.series.length;
      const pts = ch.series.map((s, i) => [n === 1 ? 50 : (i / (n - 1)) * 100, 100 - (s.value / max) * 90]);
      plot = (
        <div className="relative h-28 border-b border-l border-gray-300">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            {els.has("Gridlines") && [25, 50, 75].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#ddd" strokeWidth="0.5" />)}
            {/Area/.test(ch.type) ? (
              <polygon points={`0,100 ${pts.map((q) => q.join(",")).join(" ")} 100,100`} fill={palette[0]} opacity="0.8" />
            ) : (
              <polyline points={pts.map((q) => q.join(",")).join(" ")} fill="none" stroke={palette[0]} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            )}
          </svg>
          {pts.map(([x, y], i) => (
            <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
              {!/Area/.test(ch.type) && <span className="block h-1.5 w-1.5 rounded-full" style={{ background: palette[0] }} />}
              {labels && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px]">{fmt(ch.series[i].value)}</span>}
            </span>
          ))}
        </div>
      );
    } else if (/Bar/.test(ch.type)) {
      plot = (
        <div className="flex flex-col gap-1 border-l border-gray-300 py-1">
          {ch.series.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="w-20 shrink-0 truncate text-right">{s.label}</span>
              <span className="h-3" style={{ width: `${(s.value / max) * 70}%`, background: palette[i % palette.length] }} />
              {labels && <span className="text-[9px]">{fmt(s.value)}</span>}
            </div>
          ))}
        </div>
      );
    } else {
      plot = (
        <div className="relative flex h-28 items-end gap-2 border-b border-l border-gray-300 px-2">
          {els.has("Gridlines") && [25, 50, 75].map((y) => <span key={y} className="absolute inset-x-0 border-t border-gray-200" style={{ bottom: `${y}%` }} />)}
          {ch.series.map((s, i) => (
            <div key={i} className="relative flex h-full flex-1 flex-col items-center justify-end">
              {labels && <span className="text-[9px]">{fmt(s.value)}</span>}
              <div className="w-full" style={{ height: `${(s.value / max) * 92}%`, background: palette[ch.series.length > 1 && !ch.colors ? 0 : i % palette.length] }} />
            </div>
          ))}
        </div>
      );
    }
    const titleKey = p.id;
    return (
      <div className="p-2" style={{ fontSize: fs, background: dark ? "#333" : ch.style === "Style 4" ? "#f2f2f2" : "#fff", color: dark ? "#fff" : undefined }}>
        <div
          className={`mb-1 text-center font-semibold ${dark ? "" : "text-gray-700"} ${isSel ? "cursor-text hover:outline hover:outline-1 hover:outline-gray-300" : ""}`}
          style={{ fontSize: 13 * z }}
          onDoubleClick={(e) => { e.stopPropagation(); startEdit(titleKey, undefined, true); }}
          title="Double-click to edit the chart title"
        >
          {editing?.key === titleKey ? editorFor(titleKey) : ch.title ?? "Chart Title"}
        </div>
        {plot}
        {!/Bar|Pie|Doughnut/.test(ch.type) && <div className="mt-1 flex justify-around">{ch.series.map((s, i) => <span key={i}>{s.label}</span>)}</div>}
        {(els.has("Legend") || /Pie|Doughnut/.test(ch.type)) && (
          <div className="mt-1 flex flex-wrap justify-center gap-2">
            {(/Pie|Doughnut/.test(ch.type) ? ch.series : [{ label: "Series 1", value: 0 }]).map((s, i) => (
              <span key={i} className="flex items-center gap-1"><span className="inline-block h-2 w-2" style={{ background: palette[i % palette.length] }} />{s.label}</span>
            ))}
          </div>
        )}
        {els.has("Data Table") && (
          <table className="mx-auto mt-1 border-collapse text-[9px]"><tbody><tr>{ch.series.map((s, i) => <td key={i} className="border border-gray-300 px-1">{s.label}: {fmt(s.value)}</td>)}</tr></tbody></table>
        )}
      </div>
    );
  };

  const renderObject = (p: WordPara, isSel: boolean) => {
    const o = (p.object ?? { label: p.chart?.title ?? "Chart", wrap: "inline" as const, width: 60 }) as XObject;
    const width = `${o.width ?? 40}%`;
    const floatSide = o.align === "right" ? "right" : o.align === "center" ? undefined : "left";
    const floating = o.wrap && o.wrap !== "inline" && o.wrap !== "topBottom";
    const styleName = o.style ?? "";
    const effect = o.effect ?? "";
    const crop = o.crop ?? "";
    const shadow = /shadow|drop|reflect/i.test(styleName) || effect === "Shadow" ? "0 6px 14px rgba(0,0,0,.35)" : effect === "Glow" ? `0 0 14px 4px ${themeOf(doc).accent}88` : effect === "Reflection" ? "0 14px 10px -8px rgba(0,0,0,.25)" : effect === "Bevel" ? "inset 0 0 0 3px rgba(255,255,255,.45), inset 0 -4px 6px rgba(0,0,0,.25)" : undefined;
    const rounded = crop === "Oval" || o.label === "Oval" ? "50%" : crop === "Rounded Rectangle" || /rounded|soft/i.test(styleName) ? 14 : undefined;
    const frame = /frame|matte|beveled/i.test(styleName);
    const transforms = [o.rotate ? `rotate(${o.rotate}deg)` : "", o.flipH ? "scaleX(-1)" : "", o.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ");
    const filters = [
      /Grayscale|Saturation:_0%/.test(styleName) ? "grayscale(1)" : "",
      /Sepia/.test(styleName) ? "sepia(1)" : "",
      /Washout/.test(styleName) ? "opacity(.55)" : "",
      /Blur/.test(styleName) ? "blur(1px)" : "",
      /Pencil_Sketch/.test(styleName) ? "grayscale(1) contrast(1.6)" : "",
      /Paint_Brush/.test(styleName) ? "saturate(1.8)" : "",
      /Brightness:_\+20%/.test(styleName) ? "brightness(1.2)" : "",
      /Contrast:_\+20%/.test(styleName) ? "contrast(1.2)" : "",
      /Sharpen/.test(styleName) ? "contrast(1.05)" : "",
      effect === "Soft Edges" ? "blur(0.4px)" : "",
    ].filter(Boolean).join(" ");
    const box: React.CSSProperties = {
      width,
      float: floating && floatSide ? floatSide : undefined,
      margin: floating ? (floatSide === "right" ? "4px 0 6px 12px" : "4px 12px 6px 0") : o.align === "center" ? "6px auto" : o.align === "right" ? "6px 0 6px auto" : "6px 0",
      transform: transforms || undefined,
      boxShadow: shadow,
      border: frame ? "6px solid #fff" : o.border ? `2px solid ${o.border}` : undefined,
      outline: frame ? "1px solid #ccc" : undefined,
      borderRadius: rounded,
      clipPath: crop && SHAPE_CLIP[crop] ? SHAPE_CLIP[crop] : undefined,
      overflow: rounded ? "hidden" : undefined,
      position: "relative",
      zIndex: o.wrap === "behind" ? 0 : o.z !== undefined ? 2 + o.z : undefined,
      opacity: o.wrap === "behind" ? 0.6 : undefined,
      filter: filters || undefined,
    };
    let inner: React.ReactNode;
    if (p.kind === "chart" && p.chart) {
      inner = renderChart(p, isSel);
    } else if (p.kind === "image") {
      inner = (
        <div className={`flex ${o.aspect === "1:1" ? "aspect-square" : o.aspect === "3:4" || o.aspect === "2:3" ? "aspect-[3/4]" : o.aspect === "16:9" ? "aspect-video" : "aspect-[4/3]"} flex-col items-center justify-center gap-1 bg-gradient-to-br from-sky-100 to-emerald-100 text-center`} style={{ fontSize: 11 * z }}>
          <span style={{ fontSize: 28 * z }}>{o.glyph ?? "🖼️"}</span>
          <span className="px-2 text-gray-600">{o.label}</span>
        </div>
      );
    } else if (p.kind === "textbox") {
      const fill = o.shapeFill && o.shapeFill !== "No Fill" ? o.shapeFill : "#fff";
      inner = (
        <div
          className="p-2 italic"
          style={{
            fontSize: 11 * PT * z,
            color: o.textColor ?? (o.shapeFill && o.shapeFill !== "No Fill" && o.shapeFill !== "#FFFFFF" ? "#fff" : themeOf(doc).heading),
            background: fill,
            border: o.border ? `1.5px solid ${o.border}` : "1px solid #9ca3af",
            borderRadius: o.label === "Oval" ? "50%" : o.label?.includes("Rounded") ? 14 : undefined,
            clipPath: SHAPE_CLIP[o.label] ?? undefined,
            textAlign: o.label === "Oval" ? "center" : undefined,
            padding: o.label === "Oval" ? "18px 22px" : undefined,
          }}
        >
          {editing?.key === p.id ? editorFor(p.id) : o.text || " "}
        </div>
      );
    } else {
      inner = (
        <div
          className="flex aspect-[3/2] items-center justify-center p-2 text-center"
          style={{
            background: o.shapeFill === "No Fill" ? "transparent" : o.shapeFill ?? themeOf(doc).accent,
            color: o.textColor ?? (o.shapeFill === "#FFFFFF" || o.shapeFill === "No Fill" ? "#222" : "#fff"),
            border: o.border ? `2px solid ${o.border}` : undefined,
            borderRadius: o.label === "Oval" ? "50%" : o.label?.includes("Rounded") ? 16 : o.label === "Flowchart: Terminator" ? 999 : undefined,
            clipPath: SHAPE_CLIP[o.label] ?? undefined,
            fontSize: 11 * PT * z,
          }}
        >
          {editing?.key === p.id ? editorFor(p.id) : o.text}
        </div>
      );
    }
    const grouped = o.group && doc.paragraphs.some((x) => selected.has(x.id) && (x.object as XObject | undefined)?.group === o.group);
    return (
      <div
        key={p.id}
        style={box}
        onClick={(e) => { e.stopPropagation(); select(p.id, e); }}
        onDoubleClick={(e) => { e.stopPropagation(); if (p.kind === "textbox" || p.kind === "shape") startEdit(p.id, undefined, true); }}
        onContextMenu={(e) => ctxMenu(e, p.id)}
        className={`cursor-pointer ${isSel ? "outline outline-2 outline-offset-2 outline-[#2b579a]" : grouped ? "outline-dashed outline-1 outline-offset-2 outline-[#2b579a]" : ""}`}
        title={o.label}
      >
        {inner}
        {isSel && (
          <>
            {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map((c) => (
              <span key={c} className={`absolute ${c} h-2.5 w-2.5 rounded-full border border-[#2b579a] bg-white`} />
            ))}
            {floating && (
              <span className="absolute -left-5 top-0 text-[11px]" title={o.anchor === "fixed" ? "Fixed position on page" : "Moves with text"} aria-hidden="true">
                {o.anchor === "fixed" ? "📌" : "⚓"}
              </span>
            )}
          </>
        )}
      </div>
    );
  };

  const renderPara = (p: WordPara) => {
    const isSel = selected.has(p.id) && !sel.run && !sel.cell;
    const look = paraLook(doc, p);
    const fs = look.size * PT * z;

    if (p.kind === "pageBreak" || p.kind === "sectionBreak" || p.kind === "columnBreak") {
      const label = p.kind === "pageBreak" ? "Page Break" : p.kind === "columnBreak" ? "Column Break" : `Section Break (${p.text || "Next Page"})`;
      // Like page breaks, section and column breaks show only with Show/Hide ¶ on.
      if (!doc.showMarks) {
        return p.kind === "columnBreak" ? <div key={p.id} style={{ breakAfter: "column" }} /> : null;
      }
      return (
        <div key={p.id} onClick={(e) => select(p.id, e)} style={p.kind === "columnBreak" ? { breakAfter: "column" } : undefined} className={`my-1 flex items-center gap-2 text-[10px] text-[#2b579a] ${isSel ? "bg-[#cce4f7]" : ""}`}>
          <span className="flex-1 border-t border-dotted border-[#2b579a]" />
          {label}
          <span className="flex-1 border-t border-dotted border-[#2b579a]" />
        </div>
      );
    }

    if (p.kind === "toc") return renderToc(p, isSel);
    if (p.kind === "table" && p.table) return renderTable(p);
    if ((p.kind === "image" || p.kind === "shape" || p.kind === "textbox" || p.kind === "chart") && (p.object || p.chart)) return renderObject(p, isSel);

    const x = xp(p);
    const listPad = p.list ? (0.25 + 0.25 * (p.listLevel ?? 0)) * PX_PER_IN * z : 0;
    const indent = look.indentLeft * PX_PER_IN * z + listPad;
    const firstLine = p.firstLine ? p.firstLine * PX_PER_IN * z : p.hanging ? -p.hanging * PX_PER_IN * z : 0;
    const style: React.CSSProperties = {
      fontFamily: cssFont(look.font),
      fontSize: fs,
      color: look.color ?? "#000",
      fontWeight: look.bold ? 700 : 400,
      fontStyle: look.italic ? "italic" : undefined,
      textDecorationLine: [look.underline ? "underline" : "", look.strike ? "line-through" : ""].filter(Boolean).join(" ") || undefined,
      background: isSel ? "rgba(0,120,215,.22)" : look.shading ?? look.highlight,
      textAlign: look.align === "justify" ? "justify" : look.align,
      marginTop: look.spaceBefore * PT * z,
      marginBottom: look.spaceAfter * PT * z,
      lineHeight: look.lineSpacing * 1.22,
      paddingLeft: indent + (p.hanging ? p.hanging * PX_PER_IN * z : 0),
      paddingRight: x.indentRight ? x.indentRight * PX_PER_IN * z : undefined,
      textIndent: firstLine || undefined,
      borderBottom: look.border ? `1px solid ${look.border}` : undefined,
      borderTop: (p.style === "Intense Quote" || (doc.styleSet === "Lines (Distinctive)" && look.level === 1)) && look.border ? `1px solid ${look.border}` : undefined,
      paddingBottom: look.border ? 2 : undefined,
      letterSpacing: look.letterSpacing,
      position: "relative",
      minHeight: fs * 1.2,
      whiteSpace: "pre-wrap",
      tabSize: `${Math.round(0.5 * PX_PER_IN * z)}px`,
      breakInside: "avoid-column",
      ...capsStyle(look.caps),
    };
    const marker = p.list === "bullet" ? p.bulletChar ?? ((p.listLevel ?? 0) === 1 ? "○" : (p.listLevel ?? 0) === 2 ? "■" : "•") : p.list === "number" ? numbers[p.id] : null;
    const text = paraText(p);
    const empty = !text && !runsOf(p).some((r) => r.field || (r as XRun).cc || (r as XRun).note);
    const hasChange = runsOf(p).some((r) => r.ins || r.del);
    const tabbed = x.tabStops?.length && text.includes("\t") && editing?.key !== p.id;

    return (
      <div
        key={p.id}
        data-para={p.id}
        style={style}
        onClick={(e) => select(p.id, e)}
        onDoubleClick={() => startEdit(p.id, undefined, true)}
        onContextMenu={(e) => ctxMenu(e, p.id)}
        className="cursor-text rounded-[1px]"
      >
        {hasChange && markup === "simple" && <span className="absolute -left-4 top-0 h-full w-0.5 bg-red-600" aria-hidden="true" />}
        {marker && (
          <span className="absolute" style={{ left: indent - 0.25 * PX_PER_IN * z, textIndent: 0, color: p.list === "bullet" ? x.bulletColor : undefined }}>
            {marker}
          </span>
        )}
        {editing?.key === p.id ? (
          editorFor(p.id)
        ) : empty ? (
          <span className="text-gray-400">{p.placeholder ?? " "}</span>
        ) : tabbed ? (
          renderTabbed(p, x.tabStops!)
        ) : (
          renderRuns(p)
        )}
        {doc.showMarks && <span className="text-[#7f9cc7]" aria-hidden="true">¶</span>}
        {p.comment && markup !== "none" && !p.comment.resolved && (
          <span className="ml-1 inline-block align-super text-[10px] text-[#c00000]" aria-hidden="true">💬</span>
        )}
      </div>
    );
  };

  const m0 = marginsOf(doc.page?.margins);
  const m = { t: m0.t, r: m0.r, b: m0.b, l: m0.l + m0.g };
  const comments = doc.paragraphs.filter((p) => p.comment);
  const showComments = comments.length > 0 && markup !== "none" && markup !== "original" && !doc.flags?.["review.showComments"];
  const pageNumPos = doc.pageNumbers && !/Remove/.test(doc.pageNumbers) ? (doc.pageNumbers.startsWith("Top") ? "top" : doc.pageNumbers.startsWith("Bottom") ? "bottom" : null) : null;
  const pageNumAlign = doc.pageNumbers?.includes("3") ? "right" : doc.pageNumbers?.includes("2") ? "center" : "left";
  const diffFirst = Boolean(doc.flags?.differentFirst);
  const vCenter = doc.flags?.vAlign === "Center";

  /** Paragraphs of one page, split into runs of the same section so each can have its own columns. */
  const renderBody = (paras: WordPara[]) => {
    const segs: { sec: number; paras: WordPara[] }[] = [];
    for (const p of paras) {
      const sec = sectionIndex(doc, p.id);
      if (!segs.length || segs[segs.length - 1].sec !== sec) segs.push({ sec, paras: [] });
      segs[segs.length - 1].paras.push(p);
    }
    return segs.map((s, i) => {
      const sp = sectionProps(doc, s.sec);
      const cols = sp.columns ?? 1;
      return (
        <div
          key={i}
          style={{
            columnCount: cols > 1 ? cols : undefined,
            columnGap: cols > 1 ? (sp.spacing ?? 0.5) * PX_PER_IN * z : undefined,
            columnRule: cols > 1 && sp.line ? "1px solid #9ca3af" : undefined,
          }}
        >
          {s.paras.map(renderPara)}
        </div>
      );
    });
  };

  // Page X of Y ("… - Bold Numbers 1|2|3") or a plain number.
  const pageXofY = /Bold Numbers/.test(doc.pageNumbers ?? "");
  const pageNumber = (i: number) => (pageXofY ? <>Page <b>{i + 1}</b> of <b>{pages.length}</b></> : i + 1);

  const footRefs = noteRefs(doc, "footnote");
  const footTexts = notesOf(doc, "footnote");
  const endTexts = notesOf(doc, "endnote");

  /** Which page's header/footer copy is the editor: the one chosen, or the next page that shows it (Different First Page hides page 1's). */
  const hfOpenPage = (() => {
    const n = Math.max(0, Math.min(hfPage, pages.length - 1));
    return diffFirst && n === 0 && pages.length > 1 ? 1 : n;
  })();
  const hfEditingOn = (kind: "header" | "footer", i: number) => editing?.key === kind && i === hfOpenPage;
  /** Header/footer text as every page shows it, updating live while it is typed on one page. */
  const hfText = (kind: "header" | "footer") => (editing?.key === kind ? editing.text || (editing.ph ? editing.phText ?? "" : "") : doc[kind]);
  // Show Document Text off: the body is hidden while you work in the header or footer.
  const hideBody = Boolean(doc.flags?.hideDocText) && (ui.selection === "header" || ui.selection === "footer" || editing?.key === "header" || editing?.key === "footer");

  /** Open the header or footer on page `i` for typing (double-clicking the top or bottom margin works even when there is none yet). */
  const openHf = (kind: "header" | "footer", i: number) => {
    if (editingRef.current) commitEdit();
    setHfPage(i);
    focus();
    startEdit(kind);
  };

  /** A click in a page's header or footer: select it there (typing then opens it on that page). */
  const clickHf = (e: React.MouseEvent<HTMLElement>, kind: "header" | "footer", i: number) => {
    e.stopPropagation();
    if (hfEditingOn(kind, i)) {
      e.currentTarget.querySelector("textarea")?.focus();
      return;
    }
    setHfPage(i);
    select(kind, e);
  };

  const renderNote = (kind: "footnote" | "endnote", n: number) => {
    const key = `${kind}:${n}`;
    const isSel = ui.selection === key;
    return (
      <div
        key={key}
        data-note={key}
        className={`flex cursor-text gap-1 rounded-[1px] ${isSel ? "bg-[#eef4fb]" : ""}`}
        onClick={(e) => { e.stopPropagation(); if (editingRef.current && editingRef.current.key !== key) commitEdit(); onSelect({ selection: key }); focus(); }}
        onDoubleClick={(e) => { e.stopPropagation(); startEdit(key); }}
      >
        <sup className="pt-1">{noteLabel(kind, n)}</sup>
        <span className="min-w-0 flex-1 whitespace-pre-wrap">
          {editing?.key === key ? (
            editorFor(key)
          ) : (
            textAt(doc, key) || " "
          )}
        </span>
      </div>
    );
  };

  const pageEl = (page: Page, i: number) => {
    const { w, h } = pageSize(doc, sectionProps(doc, page.section).orientation);
    const hideHf = diffFirst && i === 0;
    const showHeader = (!hideHf && (doc.header !== undefined || pageNumPos === "top" || ui.selection === "header")) || hfEditingOn("header", i);
    const showFooter = (!hideHf && (doc.footer !== undefined || pageNumPos === "bottom" || ui.selection === "footer")) || hfEditingOn("footer", i);
    const last = i === pages.length - 1;
    // Footnotes print at the bottom of the page that has their reference mark (any without a mark go on the last page).
    const notesHere = footRefs.filter((r) => page.paras.some((p) => p.id === r.para)).map((r) => r.n);
    if (last) for (let n = footRefs.length + 1; n <= footTexts.length; n++) notesHere.push(n);
    const flexCol = view === "print";
    return (
      <div
        key={i}
        className="relative mx-auto mb-6 shadow-[0_0_0_1px_#c8c8c8,0_2px_6px_rgba(0,0,0,.15)]"
        style={{
          width: w * PX_PER_IN * z,
          minHeight: view === "print" ? h * PX_PER_IN * z : undefined,
          background: pageBg,
          padding: `${m.t * PX_PER_IN * z}px ${m.r * PX_PER_IN * z}px ${m.b * PX_PER_IN * z}px ${m.l * PX_PER_IN * z}px`,
          backgroundImage: doc.gridlines ? "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)" : undefined,
          backgroundSize: doc.gridlines ? `${0.25 * PX_PER_IN * z}px ${0.25 * PX_PER_IN * z}px` : undefined,
          display: flexCol ? "flex" : undefined,
          flexDirection: flexCol ? "column" : undefined,
          justifyContent: vCenter && view === "print" ? "center" : undefined,
        }}
        onClick={() => onSelect({ selection: "" })}
      >
        {doc.pageBorder && <div className="pointer-events-none absolute inset-6 border-2" style={{ borderColor: themeOf(doc).accent }} />}
        {doc.watermark && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="select-none font-bold text-gray-300/70" style={{ fontSize: 72 * z, transform: "rotate(-40deg)" }}>{doc.watermark}</span>
          </div>
        )}
        {/* The top and bottom margins: double-click to open the header or footer, even before one exists. */}
        {!showHeader && (
          <div
            aria-label="Header area"
            title="Double-click to edit the header"
            className="absolute inset-x-0 top-0"
            style={{ height: m.t * PX_PER_IN * z * 0.85 }}
            onDoubleClick={(e) => { e.stopPropagation(); openHf("header", i); }}
          />
        )}
        {!showFooter && (
          <div
            aria-label="Footer area"
            title="Double-click to edit the footer"
            className="absolute inset-x-0 bottom-0"
            style={{ height: m.b * PX_PER_IN * z * 0.85 }}
            onDoubleClick={(e) => { e.stopPropagation(); openHf("footer", i); }}
          />
        )}
        {hideHf && ui.selection === "header" && (
          <div className="pointer-events-none absolute inset-x-0 top-0 border-b border-dashed border-[#2b579a] bg-[#eef4fb]" style={{ height: m.t * PX_PER_IN * z * 0.75 }}>
            <span className="absolute -bottom-4 left-2 bg-[#2b579a] px-1 text-[9px] text-white">First Page Header</span>
          </div>
        )}
        {showHeader && (
          <div
            data-hf="header"
            data-page={i + 1}
            onClick={(e) => clickHf(e, "header", i)}
            onDoubleClick={(e) => { e.stopPropagation(); if (!hfEditingOn("header", i)) openHf("header", i); }}
            className={`absolute inset-x-0 top-0 flex items-end px-[inherit] text-gray-600 ${ui.selection === "header" ? "border-b border-dashed border-[#2b579a] bg-[#eef4fb]" : ""}`}
            style={{ height: m.t * PX_PER_IN * z * 0.75, paddingLeft: m.l * PX_PER_IN * z, paddingRight: m.r * PX_PER_IN * z, fontSize: 11 * PT * z }}
          >
            {ui.selection === "header" && <span className="absolute -bottom-4 left-2 bg-[#2b579a] px-1 text-[9px] text-white">Header</span>}
            <span className="flex-1 whitespace-pre-wrap">
              {hfEditingOn("header", i) ? editorFor("header") : hfText("header")}
            </span>
            {pageNumPos === "top" && <span style={{ textAlign: pageNumAlign }}>{pageNumber(i)}</span>}
          </div>
        )}
        <div style={hideBody ? { visibility: "hidden" } : undefined}>{renderBody(page.paras)}</div>
        {last && endTexts.length > 0 && (
          <div className="mt-4 text-gray-800" style={{ fontSize: 10 * PT * z }} aria-label="Endnotes">
            <div className="mb-1 w-1/3 border-t border-gray-500" />
            {endTexts.map((_, k) => renderNote("endnote", k + 1))}
          </div>
        )}
        {notesHere.length > 0 && (
          <div className="pt-6 text-gray-800" style={{ fontSize: 10 * PT * z, marginTop: flexCol && !vCenter ? "auto" : undefined }} aria-label="Footnotes">
            <div className="mb-1 w-1/3 border-t border-gray-500" />
            {notesHere.map((n) => renderNote("footnote", n))}
          </div>
        )}
        {showFooter && (
          <div
            data-hf="footer"
            data-page={i + 1}
            onClick={(e) => clickHf(e, "footer", i)}
            onDoubleClick={(e) => { e.stopPropagation(); if (!hfEditingOn("footer", i)) openHf("footer", i); }}
            className={`absolute inset-x-0 bottom-0 flex items-start pt-2 text-gray-600 ${ui.selection === "footer" ? "border-t border-dashed border-[#2b579a] bg-[#eef4fb]" : ""}`}
            style={{ height: m.b * PX_PER_IN * z * 0.75, paddingLeft: m.l * PX_PER_IN * z, paddingRight: m.r * PX_PER_IN * z, fontSize: 11 * PT * z }}
          >
            {ui.selection === "footer" && <span className="absolute -top-4 left-2 bg-[#2b579a] px-1 text-[9px] text-white">Footer</span>}
            <span className="flex-1 whitespace-pre-wrap">
              {hfEditingOn("footer", i) ? editorFor("footer") : hfText("footer")}
            </span>
            {pageNumPos === "bottom" && <span className="absolute inset-x-0 bottom-3 px-[inherit]" style={{ textAlign: pageNumAlign, paddingLeft: m.l * PX_PER_IN * z, paddingRight: m.r * PX_PER_IN * z }}>{pageNumber(i)}</span>}
          </div>
        )}
      </div>
    );
  };

  const pane = doc.pane && !doc.pane.startsWith("Find:") && doc.pane !== "Navigation" ? doc.pane : null;
  const findMode = doc.pane?.startsWith("Find:");
  const { w: pageW } = pageSize(doc, sectionProps(doc, 0).orientation);

  if (view === "read") {
    return (
      <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="flex h-full flex-col bg-[#f4f1ea] outline-none">
        <div className="flex items-center gap-4 bg-white px-4 py-1 text-[12px] text-gray-700 shadow-sm">
          <span>File</span><span>Tools</span><span>View</span>
          <span className="flex-1 text-center">{doc.saved?.name ?? "Read Mode"}</span>
          <button type="button" onClick={() => onCommit({ kind: "command", id: "view.mode", value: "Print Layout" })} className="rounded border border-gray-300 px-2 py-0.5 hover:bg-gray-100">
            Edit Document
          </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl columns-2 gap-12 text-[15px] leading-relaxed text-gray-900" style={{ fontFamily: cssFont(themeOf(doc).bodyFont) }}>
            {doc.paragraphs.map((p) => (
              <p key={p.id} className={paraLook(doc, p).level || p.style === "Title" ? "mb-2 text-xl font-semibold" : "mb-3"} style={{ color: paraLook(doc, p).color }}>
                {paraText(p)}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={focusRef} tabIndex={0} onKeyDown={onKeyDown} className="flex h-full outline-none">
      {doc.navPane && (
        <aside className="flex w-56 shrink-0 flex-col border-r border-gray-300 bg-white text-[12px]">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[13px]">Navigation</span>
            <button type="button" aria-label="Close Navigation pane" onClick={() => onCommit({ kind: "command", id: "view.navPane" })} className="px-1 hover:bg-gray-100">✕</button>
          </div>
          <div className="px-3">
            <input
              aria-label="Search document"
              placeholder="Search document"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") onCommit({ kind: "type", target: "find", value: findText });
              }}
              className="w-full border border-gray-400 px-2 py-1"
            />
          </div>
          <div className="mt-2 flex gap-3 border-b px-3 text-[12px]">
            <span className={!findMode ? "border-b-2 border-[#2b579a] pb-1 font-semibold" : "pb-1"}>Headings</span>
            <span className="pb-1">Pages</span>
            <span className={findMode ? "border-b-2 border-[#2b579a] pb-1 font-semibold" : "pb-1"}>Results</span>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {findMode ? (
              (() => {
                const term = doc.pane!.slice(5).toLowerCase();
                const hits = doc.paragraphs.filter((p) => paraText(p).toLowerCase().includes(term));
                return (
                  <>
                    <p className="mb-2 text-gray-600">{hits.length} result{hits.length === 1 ? "" : "s"}</p>
                    {hits.map((p) => (
                      <button key={p.id} type="button" onClick={() => onSelect({ selection: p.id })} className="mb-1 block w-full rounded border border-gray-200 p-1.5 text-left hover:bg-[#e5f1fb]">
                        {paraText(p).slice(0, 80)}
                      </button>
                    ))}
                  </>
                );
              })()
            ) : liveHeadings.length ? (
              liveHeadings.map((hd) => (
                <button key={hd.id} type="button" onClick={() => onSelect({ selection: hd.id })} className={`block w-full px-1 py-0.5 text-left hover:bg-[#e5f1fb] ${ui.selection === hd.id ? "bg-[#cce4f7]" : ""}`} style={{ paddingLeft: (hd.level - 1) * 12 + 4 }}>
                  {hd.text}
                </button>
              ))
            ) : (
              <p className="text-gray-500">Create an interactive outline of your document by applying heading styles.</p>
            )}
          </div>
        </aside>
      )}

      <div ref={scrollRef} className={`relative min-w-0 flex-1 overflow-auto ${view === "print" ? "bg-[#e7e7e7]" : "bg-white"}`}>
        {doc.ruler && view === "print" && (
          <div
            className="sticky top-0 z-10 mx-auto h-5 border-b border-gray-300 bg-[#f3f3f3]"
            style={{ width: pageW * PX_PER_IN * z }}
            onDoubleClick={() => openDialog("paragraph")}
            title="Double-click the ruler to open the Paragraph dialog (Tabs)"
          >
            <div className="relative mx-auto h-full bg-white" style={{ marginLeft: m.l * PX_PER_IN * z, marginRight: m.r * PX_PER_IN * z, backgroundImage: "repeating-linear-gradient(90deg, #999 0 1px, transparent 1px 12px)", backgroundSize: "12px 6px", backgroundRepeat: "repeat-x", backgroundPosition: "bottom" }}>
              {(() => {
                const p = doc.paragraphs.find((x) => x.id === sel.paras[0]);
                if (!p) return null;
                const lk = paraLook(doc, p);
                const left = lk.indentLeft * PX_PER_IN * z;
                const first = left + (p.firstLine ?? 0) * PX_PER_IN * z;
                const hang = left + (p.hanging ?? 0) * PX_PER_IN * z;
                return (
                  <>
                    <span className="absolute top-0 h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-gray-600" style={{ left: first - 4 }} title="First Line Indent" />
                    <span className="absolute bottom-0 h-0 w-0 border-x-[4px] border-b-[5px] border-x-transparent border-b-gray-600" style={{ left: (p.hanging ? hang : left) - 4 }} title="Hanging Indent" />
                    {(xp(p).tabStops ?? []).map((t, k) => (
                      <span key={k} className="absolute bottom-0 text-[9px] leading-none text-gray-800" style={{ left: t.pos * PX_PER_IN * z - 3 }} title={`${t.align} tab`}>{t.align === "right" ? "┘" : t.align === "center" ? "┴" : t.align === "decimal" ? "┴." : "└"}</span>
                    ))}
                    {xp(p).indentRight ? <span className="absolute bottom-0 h-0 w-0 border-x-[4px] border-b-[5px] border-x-transparent border-b-gray-600" style={{ right: xp(p).indentRight! * PX_PER_IN * z - 4 }} title="Right Indent" /> : null}
                  </>
                );
              })()}
            </div>
          </div>
        )}
        {typeof doc.replaced === "number" && doc.pane?.startsWith("Replace") && (
          <div className="sticky top-0 z-10 flex items-center justify-between bg-[#fff4ce] px-3 py-1 text-[12px]">
            <span>All done. We made {doc.replaced} replacement{doc.replaced === 1 ? "" : "s"}.</span>
            <button type="button" onClick={() => onCommit({ kind: "command", id: "pane.close" })} className="px-1">✕</button>
          </div>
        )}
        {view === "outline" ? (
          <div className="p-6 text-[14px]">
            {doc.paragraphs.map((p) => {
              const lvl = paraLook(doc, p).level;
              return (
                <div key={p.id} onClick={(e) => select(p.id, e)} className={`flex gap-2 py-0.5 ${selected.has(p.id) ? "bg-[#cce4f7]" : ""}`} style={{ paddingLeft: lvl ? (lvl - 1) * 24 : 72 }}>
                  <span className="text-gray-500">{lvl ? "⊕" : "○"}</span>
                  <span className={lvl ? "font-semibold" : ""}>{paraText(p)}</span>
                  {lvl && <span className="text-[11px] text-gray-400">Level {lvl}</span>}
                </div>
              );
            })}
          </div>
        ) : view === "web" || view === "draft" ? (
          <div className="p-6" style={{ background: doc.pageColor }}>{doc.paragraphs.map(renderPara)}</div>
        ) : (
          <div className="flex items-start justify-center gap-3 py-6">
            <div>{pages.map(pageEl)}</div>
            {showComments && (
              <div className="sticky top-2 w-56 shrink-0 space-y-2">
                {comments.map((p) => (
                  <CommentCard
                    key={p.id}
                    para={p}
                    selected={ui.selection === p.id || sel.paras[0] === p.id}
                    onSelect={() => onSelect({ selection: p.id })}
                    onCommit={(c) => { onSelect({ selection: p.id }); onCommit(c); }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {pane && !pane.startsWith("Replace") && (
        <SidePane doc={doc} ui={ui} pane={pane} onCommit={onCommit} onSelect={onSelect} openDialog={openDialog} />
      )}
    </div>
  );
}

function CommentCard({ para, selected, onSelect, onCommit }: { para: WordPara; selected: boolean; onSelect: () => void; onCommit: CanvasProps<WordDoc>["onCommit"] }) {
  const [reply, setReply] = useState("");
  const [menu, setMenu] = useState(false);
  const c = para.comment!;
  const initials = (n: string) => n.split(" ").map((x) => x[0]).join("").slice(0, 2);
  return (
    <div
      role="group"
      aria-label={`Comment by ${c.author}`}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className={`relative block w-full rounded-md border p-2 text-left text-[11px] shadow-sm ${c.resolved ? "bg-gray-50 text-gray-500" : "bg-white"} ${selected ? "border-[#2b579a]" : "border-gray-300"}`}
    >
      <div className="mb-1 flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c43e1c] text-[9px] font-bold text-white">{initials(c.author)}</span>
        <span className="flex-1 font-semibold">{c.author}</span>
        {c.resolved && <span className="rounded bg-gray-200 px-1 text-[9px]">Resolved</span>}
        <button type="button" aria-label="More thread actions" onClick={(e) => { e.stopPropagation(); onSelect(); setMenu((m) => !m); }} className="rounded px-1 hover:bg-gray-100">⋯</button>
      </div>
      {menu && (
        <div className="absolute right-2 top-7 z-20 w-36 border border-gray-300 bg-white py-1 text-[11px] text-gray-900 shadow-lg">
          <button type="button" className="block w-full px-2 py-1 text-left hover:bg-[#e5f1fb]" onClick={(e) => { e.stopPropagation(); setMenu(false); onCommit({ kind: "command", id: "review.resolveComment" }); }}>
            {c.resolved ? "Reopen thread" : "Resolve thread"}
          </button>
          <button type="button" className="block w-full px-2 py-1 text-left hover:bg-[#e5f1fb]" onClick={(e) => { e.stopPropagation(); setMenu(false); onCommit({ kind: "command", id: "review.deleteComment", value: "Delete" }); }}>
            Delete thread
          </button>
        </div>
      )}
      <p className="text-gray-800">{c.text}</p>
      {c.replies?.map((r, k) => <p key={k} className="mt-1 border-t pt-1 text-gray-700"><b>{r.author}:</b> {r.text}</p>)}
      {selected && !c.resolved && (
        <input
          aria-label="Reply"
          placeholder="Reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" && reply.trim()) {
              onCommit({ kind: "command", id: "comment.reply", value: reply.trim() });
              setReply("");
            }
          }}
          className="mt-2 w-full rounded border border-gray-300 px-1.5 py-1 text-[11px]"
        />
      )}
      {selected && c.resolved && (
        <button type="button" onClick={(e) => { e.stopPropagation(); onCommit({ kind: "command", id: "review.resolveComment" }); }} className="mt-1 text-[11px] text-[#2b579a] hover:underline">Reopen</button>
      )}
    </div>
  );
}

function SidePane({ doc, ui, pane, onCommit, onSelect, openDialog }: { doc: WordDoc; ui: CanvasProps<WordDoc>["ui"]; pane: string; onCommit: CanvasProps<WordDoc>["onCommit"]; onSelect: CanvasProps<WordDoc>["onSelect"]; openDialog: (id: string) => void }) {
  const close = () => onCommit({ kind: "command", id: "pane.close" });
  const [said, setSaid] = useState("");
  const [thesMenu, setThesMenu] = useState<string | null>(null);
  const s = parseSel(doc, ui.selection);
  const run = s.run ? doc.paragraphs.find((p) => p.id === s.run!.para)?.runs?.find((r) => r.id === s.run!.run) : undefined;
  const selPara = doc.paragraphs.find((p) => p.id === s.paras[0]);
  let body: React.ReactNode = <p className="text-gray-600">This feature is shown for practice.</p>;
  let title = pane;

  if (pane === "Editor") {
    title = "Editor";
    body = run?.misspelled ? (
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wide text-gray-500">Spelling</p>
        <p className="text-[14px]"><span className="underline decoration-red-600 decoration-wavy">{run.text}</span></p>
        <div className="flex flex-col gap-1">
          {(run.suggestions ?? []).map((sg) => (
            <button key={sg} type="button" onClick={() => onCommit({ kind: "command", id: "spelling.change", value: sg })} className="rounded border border-gray-300 px-2 py-1 text-left hover:bg-[#e5f1fb]">
              {sg}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => onCommit({ kind: "command", id: "spelling.ignore" })} className="text-[12px] text-[#2b579a] hover:underline">Ignore Once</button>
      </div>
    ) : (
      <p className="text-gray-700">Select a word with a red squiggle, or run Spelling &amp; Grammar to review the next issue.</p>
    );
  } else if (pane === "Editor: done") {
    title = "Editor";
    body = <p className="text-gray-700">The spelling and grammar check is complete.</p>;
  } else if (pane === "Word Count") {
    const chars = doc.paragraphs.reduce((n, p) => n + paraText(p).length, 0);
    body = (
      <table className="w-full text-[12px]">
        <tbody>
          {[
            ["Pages", String(pagesOf(doc).length)],
            ["Words", String(wordCount(doc))],
            ["Characters (with spaces)", String(chars)],
            ["Paragraphs", String(doc.paragraphs.filter((p) => !p.kind || p.kind === "p").length)],
          ].map(([k, v]) => (
            <tr key={k}><td className="py-0.5 text-gray-600">{k}</td><td className="text-right font-semibold">{v}</td></tr>
          ))}
        </tbody>
      </table>
    );
  } else if (pane === "Accessibility" || pane === "Check Accessibility") {
    title = "Accessibility";
    const missing = doc.paragraphs.filter((p) => {
      const o = p.object as XObject | undefined;
      if (p.kind === "image") return !o?.text && !o?.decorative;
      if (p.kind === "shape") return !o?.alt && !o?.text && !o?.decorative;
      if (p.kind === "chart") return !(p.chart as XChart | undefined)?.alt && !(p.chart as XChart | undefined)?.decorative;
      return false;
    });
    const noHeader = doc.paragraphs.filter((p) => p.kind === "table" && p.table?.headerRow === false);
    body = missing.length + noHeader.length === 0 ? (
      <p className="text-emerald-700">No accessibility issues found. People with disabilities should not have difficulty reading this document.</p>
    ) : (
      <div className="space-y-2">
        {missing.length > 0 && <p className="text-[11px] uppercase tracking-wide text-gray-500">Errors</p>}
        {missing.map((p) => (
          <button key={p.id} type="button" onClick={() => { onSelect({ selection: p.id }); openDialog("altText"); }} className="block w-full rounded border border-red-200 bg-red-50 px-2 py-1 text-left text-[12px]">
            Missing alternative text: {p.object?.label ?? p.chart?.title ?? "Picture"}
          </button>
        ))}
        {noHeader.length > 0 && <p className="text-[11px] uppercase tracking-wide text-gray-500">Warnings</p>}
        {noHeader.map((p) => (
          <button key={p.id} type="button" onClick={() => onSelect({ selection: `${p.id}.r1c1` })} className="block w-full rounded border border-amber-200 bg-amber-50 px-2 py-1 text-left text-[12px]">
            Missing table header: Table
          </button>
        ))}
      </div>
    );
  } else if (pane === "Thesaurus") {
    const word = (run?.text ?? "").trim();
    const syns = SYNONYMS[word.toLowerCase()];
    body = syns ? (
      <div className="space-y-1">
        <div className="mb-2 flex items-center gap-1 rounded border border-gray-400 px-2 py-1 text-gray-800"><Icon name="find" size={12} /> {word}</div>
        <p className="text-[11px] uppercase tracking-wide text-gray-500">Synonyms</p>
        {syns.map((x) => (
          <div key={x} className="relative">
            <div className="group flex items-center gap-1 rounded px-1 py-0.5 hover:bg-[#e5f1fb]">
              <span className="flex-1">{x}</span>
              <button
                type="button"
                aria-label={`Options for ${x}`}
                aria-expanded={thesMenu === x}
                onClick={() => setThesMenu(thesMenu === x ? null : x)}
                className={`rounded border px-1 text-[10px] ${thesMenu === x ? "border-gray-400 bg-white" : "border-transparent text-gray-500 group-hover:border-gray-300 group-hover:bg-white"}`}
              >
                ▾
              </button>
            </div>
            {thesMenu === x && (
              <div role="menu" className="absolute right-0 top-full z-10 w-28 border border-gray-300 bg-white py-1 shadow-lg">
                <button type="button" role="menuitem" onClick={() => { setThesMenu(null); onCommit({ kind: "command", id: "thesaurus.insert", value: x }); }} className="block w-full px-3 py-1 text-left hover:bg-[#e5f1fb]">Insert</button>
                <button type="button" role="menuitem" onClick={() => setThesMenu(null)} className="block w-full px-3 py-1 text-left hover:bg-[#e5f1fb]">Copy</button>
              </div>
            )}
          </div>
        ))}
        <p className="pt-2 text-[10px] text-gray-500">Point to a word, select its arrow, and choose Insert to replace the selected word.</p>
      </div>
    ) : (
      <p className="text-gray-700">{word ? `No results found for “${word}”.` : "Select a single word, then open the Thesaurus to see synonyms."}</p>
    );
  } else if (pane === "Selection") {
    const objs = doc.paragraphs.filter((p) => p.object || p.kind === "chart");
    const names: Record<string, string> = { image: "Picture", shape: "Shape", textbox: "Text Box", chart: "Chart" };
    const ordered = objs.map((p, i) => ({ p, i, z: (p.object as XObject | undefined)?.z ?? 0 })).sort((a, b) => b.z - a.z || b.i - a.i);
    body = (
      <div className="space-y-1">
        <p className="text-[11px] text-gray-500">Objects, top of the stack first</p>
        {ordered.map(({ p, i }) => (
          <button key={p.id} type="button" onClick={() => onSelect({ selection: p.id })} className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left hover:bg-[#e5f1fb] ${s.paras.includes(p.id) ? "bg-[#cce4f7]" : ""}`}>
            <span className="flex-1">{names[p.kind ?? "image"]} {i + 1}{p.object?.label ? `: ${p.object.label}` : ""}</span>
            {(p.object as XObject | undefined)?.group && <span className="text-[10px] text-gray-500">Group</span>}
            <span aria-hidden="true">👁</span>
          </button>
        ))}
        {!objs.length && <p className="text-gray-500">There are no shapes or pictures on this page.</p>}
      </div>
    );
  } else if (pane === "Dictation") {
    const lang = String(doc.flags?.dictationLanguage ?? "English (United States)");
    const target = s.run ? ui.selection : selPara && (!selPara.kind || selPara.kind === "p") ? selPara.id : "";
    const speak = () => {
      if (!said.trim() || !target) return;
      const add = dictationText(said);
      const cur = textAt(doc, target);
      onCommit({ kind: "type", target, value: cur ? `${cur.replace(/\s+$/, "")} ${add}` : add });
      setSaid("");
    };
    title = "Dictation";
    body = (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2b579a] text-white"><Icon name="dictate" size={18} /></span>
          <div>
            <p className="font-semibold">Listening…</p>
            <p className="text-[11px] text-gray-500">{lang}</p>
          </div>
        </div>
        <label className="block">
          <span className="text-[11px] text-gray-600">Say (type what you would say out loud, then press Enter):</span>
          <input
            aria-label="Say"
            value={said}
            placeholder={target ? "e.g. patient checked in comma thank you period" : "Click in the document first"}
            onChange={(e) => setSaid(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") speak();
            }}
            className="mt-1 w-full rounded border border-gray-400 px-2 py-1"
          />
        </label>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-gray-500">Say these for punctuation</p>
          <p className="text-gray-700">period · comma · question mark · exclamation point · colon · semicolon · open parenthesis · close parenthesis</p>
        </div>
        <button type="button" onClick={() => onCommit({ kind: "command", id: "home.dictate" })} className="rounded border border-gray-400 px-2 py-1 hover:bg-gray-100">Stop dictation</button>
      </div>
    );
  } else if (pane === "Read Aloud") {
    const para = selPara ?? doc.paragraphs.find((p) => paraText(p));
    body = (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[14px]"><span>⏮</span><span>⏸</span><span>⏭</span><span className="text-[11px] text-gray-500">Speed 1x</span></div>
        <p className="text-gray-700">Reading: “{para ? paraText(para).slice(0, 120) : ""}”</p>
      </div>
    );
  } else if (pane === "Restrict Editing") {
    title = "Restrict Editing";
    body = <RestrictPane doc={doc} onCommit={onCommit} />;
  } else if (pane === "Inspect Document") {
    body = <p className="text-gray-700">Document Inspector found: Comments, Revisions, Document Properties and Personal Information. Use Remove All to clear them before sharing.</p>;
  } else if (pane === "Version History") {
    body = <ul className="space-y-1 text-[12px]"><li>Today, 9:41 AM · BEOC Student</li><li>Yesterday, 4:12 PM · BEOC Student</li><li>Oct 14, 11:05 AM · Tasha Morales</li></ul>;
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-l border-gray-300 bg-white text-[12px]">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-[13px]">{title}</span>
        <button type="button" aria-label={`Close ${title}`} onClick={close} className="px-1 hover:bg-gray-100">✕</button>
      </div>
      <div className="flex-1 overflow-auto p-3">{body}</div>
    </aside>
  );
}

const xdoc = (d: WordDoc) => d as XDoc;

const PERMISSIONS: Record<string, string> = {
  "Filling in forms": "This document is protected from unintentional editing. You may only fill in forms in this region.",
  "No changes (Read only)": "This document is protected from unintentional editing. You may only view this region.",
  Comments: "This document is protected from unintentional editing. You may only insert comments into this document.",
  "Tracked changes": "You may edit in this region, but all changes will be tracked.",
};

/** Review › Restrict Editing task pane. */
function RestrictPane({ doc, onCommit }: { doc: WordDoc; onCommit: CanvasProps<WordDoc>["onCommit"] }) {
  const prot = xdoc(doc).protection;
  const [allow, setAllow] = useState(false);
  const [type, setType] = useState<string>("No changes (Read only)");
  const [limitFmt, setLimitFmt] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  if (prot) {
    return (
      <div className="space-y-3">
        <p className="font-semibold">Your permissions</p>
        <p className="text-gray-700">{PERMISSIONS[prot.type]}</p>
        <button type="button" onClick={() => onCommit({ kind: "command", id: "review.stopProtection" })} className="rounded border border-gray-400 px-2 py-1 hover:bg-gray-100">
          Stop Protection
        </button>
      </div>
    );
  }
  const mismatch = pw !== pw2;
  return (
    <div className="space-y-4">
      <section className="space-y-1">
        <p className="font-semibold">1. Formatting restrictions</p>
        <label className="flex items-start gap-2">
          <input type="checkbox" checked={limitFmt} onChange={(e) => setLimitFmt(e.target.checked)} className="mt-0.5" />
          <span>Limit formatting to a selection of styles</span>
        </label>
      </section>
      <section className="space-y-1">
        <p className="font-semibold">2. Editing restrictions</p>
        <label className="flex items-start gap-2">
          <input type="checkbox" checked={allow} onChange={(e) => setAllow(e.target.checked)} className="mt-0.5" />
          <span>Allow only this type of editing in the document:</span>
        </label>
        <select aria-label="Type of editing allowed" disabled={!allow} value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-gray-400 bg-white px-1 py-0.5 disabled:opacity-50">
          {RESTRICT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </section>
      <section className="space-y-1">
        <p className="font-semibold">3. Start enforcement</p>
        <p className="text-gray-600">Are you ready to apply these settings? (You can turn them off later)</p>
        <button type="button" disabled={!allow} onClick={() => setPrompt(true)} className="rounded border border-gray-400 px-2 py-1 hover:bg-gray-100 disabled:opacity-40">
          Yes, Start Enforcing Protection
        </button>
      </section>
      {prompt && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/10" onKeyDown={(e) => e.stopPropagation()}>
          <div role="dialog" aria-label="Start Enforcing Protection" className="w-80 border border-gray-400 bg-[#f0f0f0] text-[12px] shadow-2xl">
            <div className="flex items-center justify-between bg-white px-3 py-1.5">
              <span>Start Enforcing Protection</span>
              <button type="button" aria-label="Close" onClick={() => setPrompt(false)} className="px-2 hover:bg-red-600 hover:text-white">✕</button>
            </div>
            <div className="space-y-2 bg-white p-4">
              <p>Protection method: Password (optional). The document is not encrypted.</p>
              <label className="flex items-center justify-between gap-2">
                <span>Enter new password (optional):</span>
                <input type="password" aria-label="Enter new password (optional)" value={pw} onChange={(e) => setPw(e.target.value)} className="w-28 border border-gray-400 px-1 py-0.5" />
              </label>
              <label className="flex items-center justify-between gap-2">
                <span>Reenter password to confirm:</span>
                <input type="password" aria-label="Reenter password to confirm" value={pw2} onChange={(e) => setPw2(e.target.value)} className="w-28 border border-gray-400 px-1 py-0.5" />
              </label>
              {mismatch && pw2 && <p className="text-red-700">The passwords don't match.</p>}
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-300 px-3 py-2">
              <button
                type="button"
                disabled={mismatch}
                onClick={() => {
                  setPrompt(false);
                  onCommit({ kind: "command", id: "review.enforce", value: type });
                }}
                className="min-w-[72px] border border-[#0078d4] bg-[#e5f1fb] px-3 py-1 hover:bg-[#cce4f7] disabled:opacity-40"
              >
                OK
              </button>
              <button type="button" onClick={() => setPrompt(false)} className="min-w-[72px] border border-gray-400 bg-[#e1e1e1] px-3 py-1 hover:bg-[#e5f1fb]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InlineEditor({
  value,
  onChange,
  onCommit,
  onCancel,
  onTab,
  inline,
  style,
  selectAll,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  /** `range` is passed when the box loses focus (to the Ribbon, a menu...): the cursor or selection then. */
  onCommit: (range?: [number, number]) => void;
  onCancel: () => void;
  /** Tab / Shift+Tab (table cells move to the next / previous cell). */
  onTab?: (back: boolean) => void;
  inline?: boolean;
  style?: React.CSSProperties;
  /** Open with all of the text selected (a double-click), so typing replaces it. Otherwise the cursor goes at the end. */
  selectAll?: boolean;
  /** Placeholder text ("[Type here]") still showing until you type over it. */
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    if (selectAll) el.select();
    else el.setSelectionRange(el.value.length, el.value.length);
    // Only when it opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      aria-label="Type here"
      value={value}
      placeholder={placeholder}
      rows={1}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      // Double-click selects a word (and must not reopen the text); triple-click selects all of it, as in Word.
      onDoubleClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => {
        if (e.detail >= 3) {
          e.preventDefault();
          e.currentTarget.select();
        }
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onCommit();
        }
        if (e.key === "Tab" && onTab) {
          e.preventDefault();
          onTab(e.shiftKey);
        }
        if (e.key === "Escape") onCancel();
      }}
      onBlur={(e) => onCommit([e.currentTarget.selectionStart, e.currentTarget.selectionEnd])}
      className={`${inline ? "inline-block min-w-[4ch] align-baseline" : "block w-full"} resize-none overflow-hidden border-0 bg-[#fffbe6] p-0 outline outline-1 outline-[#2b579a]`}
      style={{ font: "inherit", color: "inherit", lineHeight: "inherit", textAlign: "inherit", textIndent: 0, ...(style ?? {}), width: inline ? `${Math.max(4, value.length + 1, (placeholder?.length ?? 0) + 1)}ch` : undefined }}
    />
  );
}

export function WordStatusBar({ doc, ui, onCommit }: StatusBarProps<WordDoc>) {
  const zoom = doc.zoom ?? 100;
  const pages = pagesOf(doc).length;
  const page = Math.min(pages, selectionPage(doc, ui));
  const sections = 1 + doc.paragraphs.filter((p) => p.kind === "sectionBreak").length;
  const merge = doc.merge;
  const mergeCount = merge?.preview ? activeRecipients(doc).length : 0;
  const protection = (doc as XDoc).protection;
  return (
    <div className="flex h-6 shrink-0 items-center gap-4 border-t border-gray-300 bg-[#f3f3f3] px-3 text-[11px] text-gray-700">
      <span>Page {page} of {pages}</span>
      {sections > 1 && <span className="hidden sm:inline">{sections} sections</span>}
      <button type="button" onClick={() => onCommit({ kind: "command", id: "review.wordCount" })} className="hover:bg-gray-200">{wordCount(doc)} words</button>
      <span className="hidden sm:inline">English (United States)</span>
      {doc.trackChanges && <span className="rounded bg-amber-100 px-1 text-amber-800">Track Changes: On</span>}
      {merge?.preview && <span className="rounded bg-sky-100 px-1 text-sky-800">Record {Math.min((merge.record ?? 0) + 1, Math.max(1, mergeCount))} of {mergeCount}</span>}
      {protection && <span className="rounded bg-amber-100 px-1 text-amber-800">Restricted: {protection.type}</span>}
      {doc.pane === "Dictation" && <span className="rounded bg-sky-100 px-1 text-sky-800">Dictation: listening</span>}
      {doc.flags?.lastAction && <span className="hidden text-gray-500 sm:inline">Last action: {String(doc.flags.lastAction)}</span>}
      <span className="flex-1" />
      <span className="flex items-center gap-1">
        {[
          ["Read Mode", "readMode"],
          ["Print Layout", "printLayout"],
          ["Web Layout", "webLayout"],
        ].map(([v, icon]) => (
          <button key={v} type="button" title={v} aria-label={v} onClick={() => onCommit({ kind: "command", id: "view.mode", value: v })} className={`rounded p-0.5 hover:bg-gray-200 ${(doc.view ?? "print") === (v === "Read Mode" ? "read" : v === "Print Layout" ? "print" : "web") ? "bg-gray-300" : ""}`}>
            <Icon name={icon} size={14} />
          </button>
        ))}
      </span>
      <span className="flex items-center gap-1">
        <button type="button" aria-label="Zoom out" onClick={() => onCommit({ kind: "command", id: "view.zoom", value: String(Math.max(30, zoom - 10)) })} className="px-1 hover:bg-gray-200">−</button>
        <input
          type="range"
          aria-label="Zoom"
          min={30}
          max={200}
          step={10}
          value={zoom}
          onChange={(e) => onCommit({ kind: "command", id: "view.zoom", value: e.target.value })}
          className="h-1 w-24 accent-gray-600"
        />
        <button type="button" aria-label="Zoom in" onClick={() => onCommit({ kind: "command", id: "view.zoom", value: String(Math.min(200, zoom + 10)) })} className="px-1 hover:bg-gray-200">+</button>
        <span className="w-9 text-right">{zoom}%</span>
      </span>
    </div>
  );
}
