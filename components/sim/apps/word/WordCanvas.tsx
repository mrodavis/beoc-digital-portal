"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { WordDoc, WordPara, WordRun } from "@/types/sim";
import type { CanvasProps, MenuItem, StatusBarProps } from "../../types";
import {
  dictationText,
  headingsOf,
  marginsOf,
  paraLook,
  paraRange,
  paraText,
  parseSel,
  researchResults,
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
  if (key === "header" || key === "footer") return true;
  const s = parseSel(doc, key);
  if (s.cell) return s.cell.r > 0 && s.cell.c > 0;
  if (s.run) return true;
  const p = doc.paragraphs.find((x) => x.id === s.paras[0]);
  if (!p) return false;
  if (p.kind === "textbox" || p.kind === "shape" || p.kind === "chart") return true;
  return !p.kind || p.kind === "p";
}

const SYNONYMS: Record<string, string[]> = {
  important: ["significant", "essential", "critical", "key"],
  help: ["assist", "support", "aid"],
  quick: ["fast", "rapid", "prompt"],
  show: ["display", "present", "reveal"],
  big: ["large", "substantial", "major"],
  begin: ["start", "commence", "initiate"],
  urgent: ["pressing", "time-sensitive", "critical"],
};

/** Smart Lookup definitions the sim can show. */
const GLOSSARY: Record<string, string> = {
  hypertension: "Abnormally high blood pressure in the arteries. A reading of 130/80 mm Hg or higher is generally considered high.",
  systolic: "The top number in a blood pressure reading: the pressure in the arteries when the heart beats.",
  diastolic: "The bottom number in a blood pressure reading: the pressure in the arteries between heartbeats.",
  influenza: "A contagious respiratory illness caused by influenza viruses, often called the flu.",
  copay: "A fixed amount a patient pays for a covered health care service, usually at the time of the visit.",
  copayment: "A fixed amount a patient pays for a covered health care service, usually at the time of the visit.",
  deductible: "The amount a patient pays for covered services before the insurance plan starts to pay.",
  "prior authorization": "Approval from a health plan that may be required before a service or medication is covered.",
  hipaa: "The Health Insurance Portability and Accountability Act, a U.S. law that protects patients' health information.",
  triage: "The process of sorting patients by how urgently they need care.",
  "a1c": "A blood test that shows a person's average blood sugar level over the past two to three months.",
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

export function WordCanvas({ doc, ui, onSelect, onCommit, onContextMenu, openDialog }: CanvasProps<WordDoc>) {
  const [editing, setEditingState] = useState<{ key: string; text: string; ph?: boolean } | null>(null);
  const editingRef = useRef<{ key: string; text: string; ph?: boolean } | null>(null);
  const setEditing = (v: { key: string; text: string; ph?: boolean } | null) => {
    editingRef.current = v;
    setEditingState(v);
  };
  const [findText, setFindText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const z = (doc.zoom ?? 100) / 100;
  const view = doc.view ?? "print";
  const sel = parseSel(doc, ui.selection);
  const selected = new Set(sel.paras);
  const markup = doc.markup ?? "all";
  const pageBg = doc.pageColor ?? "#fff";

  useEffect(() => {
    editingRef.current = null;
    setEditingState(null);
  }, [doc]);

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

  const startEdit = (key: string, initial?: string) => {
    if (!editable(doc, key)) return;
    onSelect({ selection: key });
    const cur = textAt(doc, key);
    // Placeholder text ("[Type here]", "[Recipient Name]") is replaced as you type, like a content control.
    const placeholder = /^\[[^\]]*\]$/.test(cur.trim()) || /^(\[Type here\]\s*)+$/.test(cur.trim());
    setEditing({ key, text: initial ?? (placeholder ? "" : cur), ph: placeholder });
  };

  const commitEdit = () => {
    const e = editingRef.current;
    if (!e) return;
    const orig = textAt(doc, e.key);
    setEditing(null);
    if (e.ph && !e.text.trim()) return;
    if (e.text !== orig) onCommit({ kind: "type", target: e.key, value: e.text });
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
      items.push({ label: "Edit Alt Text...", icon: "altText", dialog: "altText" });
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
    items.push({ label: "Search", icon: "smartLookup", command: "review.smartLookup" });
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

  const renderRun = (p: WordPara, r: WordRun, i: number, textOverride?: string) => {
    const key = r.id ? `${p.id}.${r.id}` : undefined;
    const merge = doc.merge;
    const record = merge?.preview ? merge.recipients?.[merge.record ?? 0] : undefined;
    const findTerm = doc.pane?.startsWith("Find:") ? doc.pane.slice(5).toLowerCase() : "";
    const style = runStyle(p, r, key);
    let text = textOverride ?? (r.field ? (record ? mergeValue(r.field, record) : `«${r.field}»`) : r.text);
    if (editing && key && editing.key === key && textOverride === undefined) {
      return <InlineEditor key={i} value={editing.text} onChange={(t) => setEditing({ ...editingRef.current!, key, text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} inline style={style} />;
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
                select(key, e);
              }
            : r.link
              ? (e) => {
                  if (e.ctrlKey || e.metaKey) {
                    e.stopPropagation();
                    onCommit({ kind: "click", target: `link:${r.link}` });
                  }
                }
              : undefined
        }
        onDoubleClick={key ? (e) => { e.stopPropagation(); startEdit(key); } : undefined}
        onContextMenu={key ? (e) => ctxMenu(e, key) : undefined}
        title={r.link ? `${r.link}\nCtrl+Click to follow link` : undefined}
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

  type Page = { paras: WordPara[]; section: number };
  const pages: Page[] = [{ paras: [], section: 0 }];
  {
    let sec = 0;
    for (const p of doc.paragraphs) {
      const cur = pages[pages.length - 1];
      if (xp(p).pageBreakBefore && cur.paras.length) pages.push({ paras: [], section: sec });
      pages[pages.length - 1].paras.push(p);
      if (p.kind === "sectionBreak") sec++;
      if (p.kind === "pageBreak" || (p.kind === "sectionBreak" && p.text !== "Continuous")) pages.push({ paras: [], section: sec });
    }
  }
  const pageOf = (pid: string) => Math.max(0, pages.findIndex((pg) => pg.paras.some((p) => p.id === pid)));

  const renderToc = (p: WordPara, isSel: boolean) => {
    const entries = xp(p).entries ?? liveHeadings;
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
        <div style={{ color: themeOf(doc).heading, fontFamily: cssFont(themeOf(doc).headingFont), fontSize: 16 * PT * z }} className="mb-1">Contents</div>
        {entries.length === 0 && <div className="italic text-gray-500">No table of contents entries found.</div>}
        {entries.map((h) => (
          <div
            key={h.id}
            className="flex items-end gap-1"
            style={{ paddingLeft: (h.level - 1) * 0.25 * PX_PER_IN * z }}
            title="Ctrl+Click to follow link"
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey) {
                e.stopPropagation();
                if (doc.paragraphs.some((x) => x.id === h.id)) onCommit({ kind: "click", target: `toc:${h.id}` });
              }
            }}
          >
            <span className="whitespace-nowrap">{h.text}</span>
            <span className="mb-1 flex-1 border-b border-dotted border-gray-500" />
            <span>{pageOf(h.id) + 1}</span>
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
                        onDoubleClick={(e) => { e.stopPropagation(); startEdit(key); }}
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
                          <InlineEditor value={editing.text} onChange={(tx) => setEditing({ ...editingRef.current!, key, text: tx })} onCommit={commitEdit} onCancel={() => setEditing(null)} onTab={(back) => { commitEdit(); tabInTable(key, back); }} />
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
          onDoubleClick={(e) => { e.stopPropagation(); startEdit(titleKey); }}
          title="Double-click to edit the chart title"
        >
          {editing?.key === titleKey ? <InlineEditor value={editing.text} onChange={(t) => setEditing({ ...editingRef.current!, key: titleKey, text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} /> : ch.title ?? "Chart Title"}
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
          {editing?.key === p.id ? <InlineEditor value={editing.text} onChange={(t) => setEditing({ ...editingRef.current!, key: p.id, text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} /> : o.text || " "}
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
          {editing?.key === p.id ? <InlineEditor value={editing.text} onChange={(t) => setEditing({ ...editingRef.current!, key: p.id, text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} /> : o.text}
        </div>
      );
    }
    const grouped = o.group && doc.paragraphs.some((x) => selected.has(x.id) && (x.object as XObject | undefined)?.group === o.group);
    return (
      <div
        key={p.id}
        style={box}
        onClick={(e) => { e.stopPropagation(); select(p.id, e); }}
        onDoubleClick={(e) => { e.stopPropagation(); if (p.kind === "textbox" || p.kind === "shape") startEdit(p.id); }}
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
      if (!doc.showMarks && p.kind !== "sectionBreak") {
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
    const empty = !text && !runsOf(p).some((r) => r.field);
    const hasChange = runsOf(p).some((r) => r.ins || r.del);
    const tabbed = x.tabStops?.length && text.includes("\t") && editing?.key !== p.id;

    return (
      <div
        key={p.id}
        data-para={p.id}
        style={style}
        onClick={(e) => select(p.id, e)}
        onDoubleClick={() => startEdit(p.id)}
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
          <InlineEditor value={editing.text} onChange={(t) => setEditing({ ...editingRef.current!, key: p.id, text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} />
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

  const pageEl = (page: Page, i: number) => {
    const { w, h } = pageSize(doc, sectionProps(doc, page.section).orientation);
    const hideHf = diffFirst && i === 0;
    const showHeader = !hideHf && (doc.header !== undefined || pageNumPos === "top");
    const showFooter = !hideHf && (doc.footer !== undefined || pageNumPos === "bottom");
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
          display: vCenter && view === "print" ? "flex" : undefined,
          flexDirection: vCenter && view === "print" ? "column" : undefined,
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
        {hideHf && ui.selection === "header" && (
          <div className="absolute inset-x-0 top-0 border-b border-dashed border-[#2b579a] bg-[#eef4fb]" style={{ height: m.t * PX_PER_IN * z * 0.75 }}>
            <span className="absolute -bottom-4 left-2 bg-[#2b579a] px-1 text-[9px] text-white">First Page Header</span>
          </div>
        )}
        {showHeader && (
          <div
            onClick={(e) => { e.stopPropagation(); select("header", e); }}
            onDoubleClick={(e) => { e.stopPropagation(); startEdit("header"); }}
            className={`absolute inset-x-0 top-0 flex items-end px-[inherit] text-gray-600 ${ui.selection === "header" ? "border-b border-dashed border-[#2b579a] bg-[#eef4fb]" : ""}`}
            style={{ height: m.t * PX_PER_IN * z * 0.75, paddingLeft: m.l * PX_PER_IN * z, paddingRight: m.r * PX_PER_IN * z, fontSize: 11 * PT * z }}
          >
            {ui.selection === "header" && <span className="absolute -bottom-4 left-2 bg-[#2b579a] px-1 text-[9px] text-white">Header</span>}
            <span className="flex-1 whitespace-pre-wrap">
              {editing?.key === "header" ? <InlineEditor value={editing.text} onChange={(t) => setEditing({ ...editingRef.current!, key: "header", text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} /> : doc.header}
            </span>
            {pageNumPos === "top" && <span style={{ textAlign: pageNumAlign }}>{i + 1}</span>}
          </div>
        )}
        <div>{renderBody(page.paras)}</div>
        {showFooter && (
          <div
            onClick={(e) => { e.stopPropagation(); select("footer", e); }}
            onDoubleClick={(e) => { e.stopPropagation(); startEdit("footer"); }}
            className={`absolute inset-x-0 bottom-0 flex items-start pt-2 text-gray-600 ${ui.selection === "footer" ? "border-t border-dashed border-[#2b579a] bg-[#eef4fb]" : ""}`}
            style={{ height: m.b * PX_PER_IN * z * 0.75, paddingLeft: m.l * PX_PER_IN * z, paddingRight: m.r * PX_PER_IN * z, fontSize: 11 * PT * z }}
          >
            {ui.selection === "footer" && <span className="absolute -top-4 left-2 bg-[#2b579a] px-1 text-[9px] text-white">Footer</span>}
            <span className="flex-1 whitespace-pre-wrap">
              {editing?.key === "footer" ? <InlineEditor value={editing.text} onChange={(t) => setEditing({ ...editingRef.current!, key: "footer", text: t })} onCommit={commitEdit} onCancel={() => setEditing(null)} /> : doc.footer}
            </span>
            {pageNumPos === "bottom" && <span className="absolute inset-x-0 bottom-3 px-[inherit]" style={{ textAlign: pageNumAlign, paddingLeft: m.l * PX_PER_IN * z, paddingRight: m.r * PX_PER_IN * z }}>{i + 1}</span>}
          </div>
        )}
        {doc.footnotes && doc.footnotes.length > 0 && i === pages.length - 1 && (
          <div className="mt-6 border-t border-gray-400 pt-1 text-gray-700" style={{ fontSize: 9 * PT * z, width: "35%" }}>
            {doc.footnotes.map((f, k) => <div key={k}><sup>{k + 1}</sup> {f}</div>)}
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
            ["Pages", String(1 + doc.paragraphs.filter((p) => p.kind === "pageBreak" || (p.kind === "sectionBreak" && p.text !== "Continuous")).length)],
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
    const word = (run?.text ?? "").trim().toLowerCase();
    const syns = SYNONYMS[word] ?? ["(select a single word)"];
    body = (
      <div>
        <p className="mb-2 font-semibold">{word || "Thesaurus"}</p>
        {syns.map((x) => <p key={x} className="py-0.5">{x}</p>)}
      </div>
    );
  } else if (pane === "Search") {
    const paraWords = selPara && (!selPara.kind || selPara.kind === "p") ? paraText(selPara).trim() : "";
    const term = (run?.text ?? (paraWords.split(/\s+/).length <= 3 ? paraWords : "")).trim().replace(/[.,;:]$/, "");
    const def = GLOSSARY[term.toLowerCase()];
    title = "Search";
    body = term ? (
      <div className="space-y-2">
        <p className="text-[14px] font-semibold">{term}</p>
        <p className="text-[11px] uppercase tracking-wide text-gray-500">Definition</p>
        <p className="text-gray-800">{def ?? "No definition found. Results from the web for this text would appear here."}</p>
        <p className="text-[11px] text-gray-500">Results powered by Bing. Check that a source is trustworthy before you rely on it.</p>
      </div>
    ) : (
      <p className="text-gray-700">Select a word or phrase, then choose Search to look it up without leaving the document.</p>
    );
  } else if (pane === "Researcher") {
    const query = (run?.text ?? (selPara ? paraText(selPara) : "")).trim().slice(0, 60);
    const results = researchResults(query || paraText(doc.paragraphs[0] ?? { id: "" }));
    const cited = new Set((xdoc(doc).sources ?? []).map((x) => x.title));
    body = (
      <div className="space-y-2">
        <div className="flex items-center gap-1 rounded border border-gray-400 px-2 py-1 text-gray-700"><Icon name="find" size={12} /> {query || "Search"}</div>
        <p className="text-[11px] uppercase tracking-wide text-gray-500">Top sources</p>
        {results.map((r) => (
          <div key={r.title} className="rounded border border-gray-200 p-2">
            <div className="mb-1 flex items-center gap-1">
              <span className="rounded bg-gray-100 px-1 text-[9px] uppercase text-gray-600">{r.kind}</span>
              <span className="flex-1 font-semibold leading-tight">{r.title}</span>
              <button
                type="button"
                aria-label={`Add and cite: ${r.title}`}
                title="Add and cite"
                onClick={() => onCommit({ kind: "command", id: "researcher.add", value: r.title })}
                className="flex h-5 w-5 items-center justify-center rounded-full border border-[#2b579a] text-[#2b579a] hover:bg-[#e5f1fb]"
              >
                {cited.has(r.title) ? "✓" : "+"}
              </button>
            </div>
            <p className="text-[10px] text-gray-500">{r.publisher} · {r.year}</p>
            <p className="mt-1 text-gray-700">{r.snippet}</p>
          </div>
        ))}
        <p className="text-[10px] text-gray-500">Researcher does not judge sources for you. Prefer journals and public health agencies over blogs.</p>
      </div>
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

function InlineEditor({
  value,
  onChange,
  onCommit,
  onCancel,
  onTab,
  inline,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  onCommit: () => void;
  onCancel: () => void;
  /** Tab / Shift+Tab (table cells move to the next / previous cell). */
  onTab?: (back: boolean) => void;
  inline?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
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
      rows={1}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()}
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
      onBlur={onCommit}
      className={`${inline ? "inline-block min-w-[4ch] align-baseline" : "block w-full"} resize-none overflow-hidden border-0 bg-[#fffbe6] p-0 outline outline-1 outline-[#2b579a]`}
      style={{ font: "inherit", color: "inherit", lineHeight: "inherit", textAlign: "inherit", textIndent: 0, ...(style ?? {}), width: inline ? `${Math.max(4, value.length + 1)}ch` : undefined }}
    />
  );
}

export function WordStatusBar({ doc, onCommit }: StatusBarProps<WordDoc>) {
  const zoom = doc.zoom ?? 100;
  const pages = 1 + doc.paragraphs.filter((p) => p.kind === "pageBreak" || (p.kind === "sectionBreak" && p.text !== "Continuous")).length;
  const sections = 1 + doc.paragraphs.filter((p) => p.kind === "sectionBreak").length;
  const merge = doc.merge;
  return (
    <div className="flex h-6 shrink-0 items-center gap-4 border-t border-gray-300 bg-[#f3f3f3] px-3 text-[11px] text-gray-700">
      <span>Page 1 of {pages}</span>
      {sections > 1 && <span className="hidden sm:inline">{sections} sections</span>}
      <button type="button" onClick={() => onCommit({ kind: "command", id: "review.wordCount" })} className="hover:bg-gray-200">{wordCount(doc)} words</button>
      <span className="hidden sm:inline">English (United States)</span>
      {doc.trackChanges && <span className="rounded bg-amber-100 px-1 text-amber-800">Track Changes: On</span>}
      {merge?.preview && <span className="rounded bg-sky-100 px-1 text-sky-800">Record {(merge.record ?? 0) + 1} of {merge.recipients?.length ?? 1}</span>}
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
