"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { WordDoc, WordPara, WordRun } from "@/types/sim";
import { dictationText, paraRange, paraText, parseSel, runsOf, wordCount, type XDoc, type XPara } from "../word/model";
import { GIcon } from "./icons";
import { DOCS_MENUS, DOCS_TOOLBAR } from "./menus";
import { asWord, firstMisspelled, meOf, openFile, personOf, viewOn, type SuggestRun } from "./model";
import type { GComment, GMode, GRun } from "./types";
import { ChipView } from "./Chips";
import { templatesFor } from "./templates";
import { Avatar, colorFor, CommentCard, CommentComposer, CommentsPanel, DetailsPanel, EditorHeader, IconBtn, KeyboardShortcuts, MenuList, Modal, PillBtn, Popup, SidePanel, TEXT_FONT, Toolbar, useG, useWidth, type MenuPos } from "./ui";

const PX = 96;
const PT = 4 / 3;

/** Google Docs' built-in paragraph styles. */
const GSTYLE: Record<string, { size: number; color?: string; italic?: boolean; before: number; after: number; level?: number }> = {
  Normal: { size: 11, before: 0, after: 0 },
  Title: { size: 26, before: 0, after: 3, level: 0 },
  Subtitle: { size: 15, color: "#666666", before: 0, after: 16 },
  "Heading 1": { size: 20, before: 20, after: 6, level: 1 },
  "Heading 2": { size: 16, before: 18, after: 6, level: 2 },
  "Heading 3": { size: 14, color: "#434343", before: 16, after: 4, level: 3 },
  "Heading 4": { size: 12, color: "#666666", before: 14, after: 4, level: 4 },
  "Heading 5": { size: 11, color: "#666666", before: 12, after: 4, level: 5 },
  "Heading 6": { size: 11, color: "#666666", italic: true, before: 12, after: 4, level: 6 },
};

export function styleName(p?: WordPara) {
  const s = p?.style ?? "Normal";
  return s === "Normal" ? "Normal text" : s;
}

export function gLook(w: WordDoc, p: WordPara) {
  const st = GSTYLE[p.style ?? "Normal"] ?? GSTYLE.Normal;
  const ov = ((w as XDoc).styleDefs?.[p.style ?? "Normal"] ?? {}) as Record<string, unknown>;
  return {
    font: (p.font ?? (ov.font as string | undefined) ?? "Arial") as string,
    size: (p.size ?? (ov.size as number | undefined) ?? st.size) as number,
    color: (p.color ?? (ov.color as string | undefined) ?? st.color ?? "#000000") as string,
    bold: p.bold ?? (ov.bold as boolean | undefined),
    italic: p.italic ?? (ov.italic as boolean | undefined) ?? st.italic,
    underline: p.underline ?? (ov.underline as boolean | undefined),
    strike: p.strike,
    highlight: p.highlight,
    align: (p.align ?? (ov.align as WordPara["align"]) ?? "left") as NonNullable<WordPara["align"]>,
    lineSpacing: p.lineSpacing ?? (ov.lineSpacing as number | undefined) ?? 1.15,
    spaceBefore: p.spaceBefore ?? (ov.spaceBefore as number | undefined) ?? st.before,
    spaceAfter: p.spaceAfter ?? (ov.spaceAfter as number | undefined) ?? st.after,
    indentLeft: p.indentLeft ?? 0,
    level: st.level,
  };
}

export function outlineOf(w: WordDoc) {
  return w.paragraphs.filter((p) => (!p.kind || p.kind === "p") && GSTYLE[p.style ?? "Normal"]?.level !== undefined && paraText(p).trim()).map((p) => ({ id: p.id, text: paraText(p), level: GSTYLE[p.style ?? "Normal"].level ?? 1 }));
}

const BULLETS: Record<string, string[]> = { "●": ["●", "○", "■"], "❖": ["❖", "➢", "■"], "➔": ["➔", "◆", "●"], "✔": ["✔", "●", "●"], "★": ["★", "○", "■"], "-": ["-", "-", "-"], "•": ["●", "○", "■"] };
const ROMAN = ["", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];

function numLabel(preset: string | undefined, level: number, counters: number[]): string {
  const p = preset ?? "1. a. i.";
  const n = counters[level];
  const alpha = (k: number, up: boolean) => String.fromCharCode((up ? 64 : 96) + k);
  if (p === "1. 1.1. 1.1.1.") return `${counters.slice(0, level + 1).join(".")}.`;
  const parts = p.split(" ");
  const fmt = parts[Math.min(level, parts.length - 1)] ?? "1.";
  const suffix = fmt.replace(/^[0-9A-Za-z]+/, "") || ".";
  const head = fmt[0];
  if (head === "1") return `${n}${suffix}`;
  if (head === "A") return `${alpha(n, true)}${suffix}`;
  if (head === "a") return `${alpha(n, false)}${suffix}`;
  if (head === "I") return `${(ROMAN[n] ?? String(n)).toUpperCase()}${suffix}`;
  if (head === "i") return `${ROMAN[n] ?? n}${suffix}`;
  return `${n}.`;
}

export interface Suggestion {
  pid: string;
  author: string;
  added: string;
  removed: string;
}

export function suggestionsOf(w: WordDoc): Suggestion[] {
  const out: Suggestion[] = [];
  for (const p of w.paragraphs) {
    const rs = (p.runs ?? []) as SuggestRun[];
    if (!rs.some((r) => r.ins || r.del)) continue;
    out.push({ pid: p.id, author: rs.find((r) => r.ins || r.del)?.author ?? "Someone", added: rs.filter((r) => r.ins).map((r) => r.text).join(""), removed: rs.filter((r) => r.del).map((r) => r.text).join("") });
  }
  return out;
}

export function quoteIn(w: WordDoc, anchor: string): string {
  const s = parseSel(w, anchor);
  if (s.run) return w.paragraphs.find((p) => p.id === s.run!.para)?.runs?.find((r) => r.id === s.run!.run)?.text ?? "";
  if (s.cell) return "";
  return s.paras.map((id) => w.paragraphs.find((p) => p.id === id)).filter(Boolean).map((p) => paraText(p!)).join(" ").slice(0, 80);
}

/* ------------------------------------------------------------------ */
/* Page renderer                                                       */
/* ------------------------------------------------------------------ */

export interface PageProps {
  w: WordDoc;
  zoom: number;
  interactive?: boolean;
  selection?: string;
  comments?: GComment[];
  activeComment?: string;
  mode?: GMode;
  spelling?: boolean;
  onSelect?: (key: string, e?: React.MouseEvent) => void;
  onEdit?: (key: string, initial?: string) => void;
  /** `selectAll`: the editor opened on a run by double-click, with the run's words selected. */
  editing?: { key: string; text: string; selectAll?: boolean } | null;
  setEditText?: (t: string) => void;
  commitEdit?: () => void;
  cancelEdit?: () => void;
  onContext?: (e: React.MouseEvent, key: string) => void;
  onCheck?: (pid: string) => void;
  onToc?: (pid: string) => void;
  /** View › Show non-printing characters. */
  nonPrinting?: boolean;
}

export function DocPages(props: PageProps) {
  const { w, zoom: z, interactive, selection = "", comments = [] } = props;
  const sel = parseSel(w, selection);
  const selected = new Set(sel.paras);
  const pageless = Boolean(w.flags?.pageless);
  const landscape = w.page?.orientation === "landscape";
  let pw = 8.5, ph = 11;
  if (w.page?.size === "Legal") ph = 14;
  if (w.page?.size === "A4") { pw = 8.27; ph = 11.69; }
  if (w.page?.size === "A5") { pw = 5.83; ph = 8.27; }
  if (w.page?.size === "Tabloid") { pw = 11; ph = 17; }
  if (landscape) [pw, ph] = [ph, pw];
  const marg = (() => {
    const m = /T ([\d.]+)" B ([\d.]+)" L ([\d.]+)" R ([\d.]+)"/.exec(w.page?.margins ?? "");
    if (m) return { t: Number(m[1]), b: Number(m[2]), l: Number(m[3]), r: Number(m[4]) };
    if (w.page?.margins === "Narrow") return { t: 0.5, b: 0.5, l: 0.5, r: 0.5 };
    if (w.page?.margins === "Wide") return { t: 1, b: 1, l: 2, r: 2 };
    return { t: 1, b: 1, l: 1, r: 1 };
  })();
  const anchorIds = new Map<string, GComment>();
  for (const c of comments) if (!c.resolved) anchorIds.set(c.anchor, c);
  const commentOn = (key: string) => anchorIds.get(key);

  // List numbering
  const labels: Record<string, string> = {};
  {
    let counters = [0, 0, 0, 0, 0];
    let prev = false;
    for (const p0 of w.paragraphs) {
      const p = p0 as XPara;
      if (p.list === "number") {
        const lvl = Math.min(4, p.listLevel ?? 0);
        if (!prev && !p.numberContinue) counters = [0, 0, 0, 0, 0];
        if (p.numberStart !== undefined) counters[lvl] = p.numberStart - 1;
        counters[lvl] += 1;
        for (let i = lvl + 1; i < 5; i++) counters[i] = 0;
        labels[p.id] = numLabel(p.numberFormat, lvl, counters);
        prev = true;
      } else if (p.list !== "bullet") prev = false;
    }
  }

  const sz = (pt: number) => pt * PT * z;

  const runEl = (p: WordPara, r: WordRun, i: number) => {
    const key = r.id ? `${p.id}.${r.id}` : undefined;
    const sr = r as SuggestRun;
    const isSel = key && selection === key;
    const cm = key ? commentOn(key) : undefined;
    const sugColor = r.ins || r.del ? colorFor(sr.author ?? "Someone") : undefined;
    const deco: string[] = [];
    if (r.underline || r.link) deco.push("underline");
    if (r.strike || r.del) deco.push("line-through");
    const style: React.CSSProperties = {
      fontWeight: r.bold === undefined ? undefined : r.bold ? 700 : 400,
      fontStyle: r.italic === undefined ? undefined : r.italic ? "italic" : "normal",
      textDecorationLine: r.misspelled && props.spelling !== false ? "underline" : deco.join(" ") || undefined,
      textDecorationStyle: r.misspelled && props.spelling !== false ? "wavy" : undefined,
      textDecorationColor: r.misspelled && props.spelling !== false ? "#d93025" : sugColor,
      color: r.link ? "#1155cc" : sugColor ?? r.color,
      background: isSel ? "rgba(26,115,232,.25)" : cm ? (props.activeComment === cm.id ? "rgba(251,188,4,.55)" : "rgba(251,188,4,.28)") : r.highlight,
      fontFamily: r.font ? `'${r.font}', Arial, sans-serif` : undefined,
      fontSize: r.size ? sz(r.size) : undefined,
      verticalAlign: r.superscript ? "super" : r.subscript ? "sub" : undefined,
      ...(r.superscript || r.subscript ? { fontSize: "0.7em" } : {}),
      textTransform: r.caps === "upper" ? "uppercase" : undefined,
    };
    if (props.editing?.key === key && key) return <InlineEdit key={i} {...props} style={style} inline />;
    const chip = (r as GRun).chip;
    if (chip) {
      return (
        <span key={i} data-run={key} role="button" aria-label={`Smart chip: ${chip.label}`} onClick={key && interactive ? (e) => { e.stopPropagation(); props.onSelect?.(key, e); } : undefined} onContextMenu={key && interactive ? (e) => props.onContext?.(e, key) : undefined} className="cursor-pointer">
          <ChipView chip={chip} selected={Boolean(isSel)} z={z} />
        </span>
      );
    }
    return (
      <span
        key={i}
        style={style}
        data-run={key}
        title={r.link ? r.link : sr.author && (r.ins || r.del) ? `Suggested by ${sr.author}` : undefined}
        onClick={key && interactive ? (e) => { e.stopPropagation(); props.onSelect?.(key, e); } : undefined}
        onDoubleClick={key && interactive ? (e) => { e.stopPropagation(); props.onEdit?.(key); } : undefined}
        onContextMenu={key && interactive ? (e) => props.onContext?.(e, key) : undefined}
        className={key && interactive ? "cursor-text" : undefined}
      >
        {r.field ? `«${r.field}»` : r.text}
      </span>
    );
  };

  const paraEl = (p: WordPara) => {
    const isSel = selected.has(p.id) && !sel.run && !sel.cell;
    if (p.kind === "pageBreak") return interactive && props.nonPrinting ? <div key={p.id} className="my-2 border-t border-dashed border-[#9aa0a6] text-center text-[10px] text-[#5f6368]">Page break</div> : null;
    if (p.kind === "sectionBreak") return <div key={p.id} className="my-2 flex items-center gap-2 text-[10px] text-[#5f6368]"><span className="flex-1 border-t border-dashed border-[#9aa0a6]" />Section break ({p.text === "Continuous" ? "continuous" : "next page"})<span className="flex-1 border-t border-dashed border-[#9aa0a6]" /></div>;
    if (p.kind === "toc") {
      const entries = (p as XPara).entries ?? outlineOf(w);
      const style = p.text ?? "Plain text";
      return (
        <div key={p.id} onClick={interactive ? (e) => props.onSelect?.(p.id, e) : undefined} className={`relative my-2 ${isSel ? "outline outline-1 outline-[#1a73e8]" : ""}`} style={{ fontSize: sz(11), fontFamily: "Arial" }}>
          {isSel && interactive && (
            <button type="button" aria-label="Update table of contents" title="Update table of contents" onClick={(e) => { e.stopPropagation(); props.onToc?.(p.id); }} className="absolute -left-9 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow">
              <GIcon name="restore" size={18} color="#1a73e8" />
            </button>
          )}
          {entries.length === 0 && <div className="text-[#5f6368]">Add headings (Format › Paragraph styles) and they will appear in your table of contents.</div>}
          {entries.map((h, k) => (
            <div key={k} className="flex items-end gap-1" style={{ paddingLeft: Math.max(0, h.level - 1) * 0.25 * PX * z, marginBottom: 2 * z }}>
              <span style={{ color: style === "With blue links" ? "#1155cc" : undefined, textDecoration: style === "With blue links" ? "underline" : undefined }}>{h.text}</span>
              {style === "Dotted" && (
                <>
                  <span className="mb-1 flex-1 border-b border-dotted border-black" />
                  <span>{1 + w.paragraphs.slice(0, w.paragraphs.findIndex((x) => x.id === h.id)).filter((x) => x.kind === "pageBreak").length}</span>
                </>
              )}
            </div>
          ))}
        </div>
      );
    }
    if (p.kind === "table" && p.table) {
      const cellSel = sel.cell && sel.cell.para === p.id ? sel.cell : undefined;
      return (
        <table key={p.id} className="my-1 w-full border-collapse" style={{ fontSize: sz(11), fontFamily: "Arial" }}>
          <tbody>
            {p.table.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => {
                  const key = `${p.id}.r${r + 1}c${c + 1}`;
                  const on = cellSel && (cellSel.r === 0 || cellSel.r === r + 1) && (cellSel.c === 0 || cellSel.c === c + 1);
                  return (
                    <td
                      key={c}
                      onClick={interactive ? (e) => { e.stopPropagation(); props.onSelect?.(key, e); } : undefined}
                      onDoubleClick={interactive ? (e) => { e.stopPropagation(); props.onEdit?.(key); } : undefined}
                      onContextMenu={interactive ? (e) => props.onContext?.(e, key) : undefined}
                      className="border border-black align-top"
                      style={{ padding: 5 * z, background: on ? "rgba(26,115,232,.18)" : r === 0 && p.table!.headerFill ? p.table!.headerFill : undefined, fontWeight: r === 0 && p.table!.headerRow ? 700 : undefined, height: sz(11) * 1.8 }}
                    >
                      {props.editing?.key === key ? <InlineEdit {...props} /> : cell || " "}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if ((p.kind === "image" || p.kind === "shape" || p.kind === "textbox" || p.kind === "chart") && (p.object || p.chart)) {
      const o = p.object;
      return (
        <div key={p.id} onClick={interactive ? (e) => { e.stopPropagation(); props.onSelect?.(p.id, e); } : undefined} onContextMenu={interactive ? (e) => props.onContext?.(e, p.id) : undefined} className={`relative my-2 ${isSel ? "outline outline-2 outline-[#1a73e8]" : ""}`} style={{ width: `${o?.width ?? 50}%`, marginLeft: o?.align === "center" ? "auto" : o?.align === "right" ? "auto" : undefined, marginRight: o?.align === "center" ? "auto" : undefined }}>
          {p.kind === "chart" && p.chart ? (
            <div className="border border-[#dadce0] bg-white p-2" style={{ fontSize: 11 * z }}>
              <div className="mb-1 text-center font-medium">{p.chart.title ?? "Chart title"}</div>
              <div className="flex h-24 items-end gap-2 border-b border-l border-[#9aa0a6] px-2">
                {p.chart.series.map((s, i) => <div key={i} className="flex-1" style={{ height: `${(s.value / Math.max(...p.chart!.series.map((x) => x.value), 1)) * 95}%`, background: ["#4285f4", "#ea4335", "#fbbc04", "#34a853"][i % 4] }} />)}
              </div>
            </div>
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#e8f0fe] to-[#e6f4ea] text-center" style={{ fontSize: 11 * z }}>
              <span style={{ fontSize: 28 * z }}>{o?.glyph ?? "🖼️"}</span>
              <span className="px-2 text-[#5f6368]">{o?.label}</span>
            </div>
          )}
          {isSel && ["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((c) => <span key={c} className={`absolute ${c} h-2 w-2 border border-[#1a73e8] bg-white`} />)}
        </div>
      );
    }
    const lk = gLook(w, p);
    const x = p as XPara;
    const listPad = p.list ? (0.25 + 0.25 * (p.listLevel ?? 0)) * PX * z : 0;
    const indent = lk.indentLeft * PX * z + listPad;
    const cm = commentOn(p.id);
    const style: React.CSSProperties = {
      fontFamily: `'${lk.font}', Arial, sans-serif`,
      fontSize: sz(lk.size),
      color: lk.color,
      fontWeight: lk.bold ? 700 : 400,
      fontStyle: lk.italic ? "italic" : undefined,
      textDecorationLine: [lk.underline ? "underline" : "", lk.strike ? "line-through" : ""].filter(Boolean).join(" ") || undefined,
      background: isSel ? "rgba(26,115,232,.18)" : cm ? (props.activeComment === cm.id ? "rgba(251,188,4,.55)" : "rgba(251,188,4,.28)") : lk.highlight,
      textAlign: lk.align,
      marginTop: sz(lk.spaceBefore),
      marginBottom: sz(lk.spaceAfter),
      lineHeight: lk.lineSpacing * 1.18,
      paddingLeft: indent + (p.hanging ? p.hanging * PX * z : 0),
      paddingRight: x.indentRight ? x.indentRight * PX * z : undefined,
      textIndent: p.firstLine ? p.firstLine * PX * z : p.hanging ? -p.hanging * PX * z : undefined,
      borderBottom: p.border ? `1px solid ${p.border}` : undefined,
      minHeight: sz(lk.size) * 1.15,
      position: "relative",
      whiteSpace: "pre-wrap",
    };
    const glyphs = BULLETS[p.bulletChar ?? "●"] ?? [p.bulletChar ?? "●"];
    const check = p.bulletChar === "☐" || p.bulletChar === "☑";
    const marker = p.list === "bullet" ? (check ? p.bulletChar : glyphs[Math.min(glyphs.length - 1, p.listLevel ?? 0)]) : p.list === "number" ? labels[p.id] : null;
    const text = paraText(p);
    const emptySel = interactive && !text && isSel && props.mode !== "Viewing";
    return (
      <div key={p.id} data-para={p.id} style={style} onClick={interactive ? (e) => props.onSelect?.(p.id, e) : undefined} onDoubleClick={interactive ? () => props.onEdit?.(p.id) : undefined} onContextMenu={interactive ? (e) => props.onContext?.(e, p.id) : undefined} className={interactive ? "cursor-text" : undefined}>
        {marker && (
          <span
            className={`absolute ${check && interactive ? "cursor-pointer" : ""}`}
            style={{ left: indent - 0.25 * PX * z, textIndent: 0, fontSize: check ? sz(lk.size) * 1.1 : undefined, color: check && p.bulletChar === "☑" ? "#1a73e8" : undefined, textDecoration: "none" }}
            onClick={check && interactive ? (e) => { e.stopPropagation(); props.onCheck?.(p.id); } : undefined}
            role={check ? "checkbox" : undefined}
            aria-checked={check ? p.bulletChar === "☑" : undefined}
            aria-label={check ? `Check off: ${text}` : undefined}
          >
            {marker}
          </span>
        )}
        {props.editing?.key === p.id ? <InlineEdit {...props} /> : emptySel ? <span className="text-[#9aa0a6]">Type @ to insert</span> : runsOf(p).map((r, i) => runEl(p, r, i))}
        {interactive && props.nonPrinting && <span className="text-[#9aa0a6]">¶</span>}
      </div>
    );
  };

  // Pages split at page breaks.
  const pages: WordPara[][] = [[]];
  for (const p of w.paragraphs) {
    pages[pages.length - 1].push(p);
    if (p.kind === "pageBreak" || (p.kind === "sectionBreak" && p.text !== "Continuous")) pages.push([]);
  }
  const pnPos = w.pageNumbers ?? "";
  const pageNum = (i: number, where: "Top" | "Bottom") => (pnPos.startsWith(where) && !(pnPos.includes("skip first") && i === 0) ? i + 1 : null);
  const hdr = (where: "header" | "footer", i: number) => {
    const text = where === "header" ? w.header : w.footer;
    const num = pageNum(i, where === "header" ? "Top" : "Bottom");
    const active = selection === where;
    const shown = text !== undefined || num !== null || active;
    return (
      <div
        className={`absolute inset-x-0 flex items-end ${active ? "bg-[#f8f9fa]" : ""}`}
        style={{ [where === "header" ? "top" : "bottom"]: 0, height: (where === "header" ? marg.t : marg.b) * PX * z * 0.8, padding: `0 ${marg.r * PX * z}px 0 ${marg.l * PX * z}px`, alignItems: where === "header" ? "flex-end" : "flex-start", fontSize: sz(11), fontFamily: "Arial", borderBottom: active && where === "header" ? "1px solid #9aa0a6" : undefined, borderTop: active && where === "footer" ? "1px solid #9aa0a6" : undefined }}
        onClick={interactive && shown ? (e) => { e.stopPropagation(); props.onSelect?.(where, e); } : undefined}
        onDoubleClick={interactive ? (e) => { e.stopPropagation(); props.onEdit?.(where); } : undefined}
      >
        {active && <span className="absolute left-2 text-[11px] text-[#5f6368]" style={{ [where === "header" ? "bottom" : "top"]: -18 }}>{where === "header" ? "Header" : "Footer"}</span>}
        <span className="flex-1 whitespace-pre-wrap">{props.editing?.key === where ? <InlineEdit {...props} /> : text && !/^\[Type here\]$/.test(text) ? text : ""}</span>
        {num !== null && <span>{num}</span>}
      </div>
    );
  };

  const columns = w.page?.columns && w.page.columns > 1 ? w.page.columns : undefined;
  if (pageless) {
    return (
      <div className="mx-auto bg-white" style={{ width: Math.max(pw * PX * z, 640), padding: `${0.6 * PX * z}px ${0.8 * PX * z}px`, background: w.pageColor ?? "#fff", minHeight: "100%" }}>
        <div style={{ columnCount: columns }}>{w.paragraphs.map(paraEl)}</div>
      </div>
    );
  }
  return (
    <>
      {pages.map((paras, i) => (
        <div
          key={i}
          className="relative mx-auto mb-3 bg-white"
          style={{ width: pw * PX * z, minHeight: ph * PX * z, padding: `${marg.t * PX * z}px ${marg.r * PX * z}px ${marg.b * PX * z}px ${marg.l * PX * z}px`, background: w.pageColor ?? "#fff", boxShadow: "0 1px 3px 1px rgba(60,64,67,.15)" }}
          onClick={interactive ? () => props.onSelect?.("") : undefined}
        >
          {hdr("header", i)}
          <div style={{ columnCount: columns }}>{paras.map(paraEl)}</div>
          {hdr("footer", i)}
          {i === pages.length - 1 && (w.footnotes?.length ?? 0) > 0 && (
            <div className="mt-6 w-1/3 border-t border-black pt-1" style={{ fontSize: sz(10), fontFamily: "Arial" }}>
              {w.footnotes!.map((fn, k) => <div key={k}><sup>{k + 1}</sup> {fn}</div>)}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

function InlineEdit(props: PageProps & { inline?: boolean; style?: React.CSSProperties }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const value = props.editing?.text ?? "";
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    // Double-clicking words selects them, as in Docs, so typing replaces them; otherwise the caret goes to the end.
    if (props.editing?.selectAll) el.select();
    else el.setSelectionRange(el.value.length, el.value.length);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
      onChange={(e) => props.setEditText?.(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); props.commitEdit?.(); }
        if (e.key === "Escape") props.cancelEdit?.();
      }}
      onBlur={() => props.commitEdit?.()}
      className={`${props.inline ? "inline-block min-w-[4ch] align-baseline" : "block w-full"} resize-none overflow-hidden border-0 bg-transparent p-0 outline-none`}
      style={{ font: "inherit", color: "inherit", lineHeight: "inherit", textAlign: "inherit", textIndent: 0, caretColor: "#000", ...(props.style ?? {}), background: "rgba(26,115,232,.06)", width: props.inline ? `${Math.max(4, value.length + 1)}ch` : undefined }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Docs surface                                                        */
/* ------------------------------------------------------------------ */

function textAt(w: WordDoc, key: string): string {
  if (key === "header") return w.header && !/^\[Type here\]$/.test(w.header) ? w.header : "";
  if (key === "footer") return w.footer && !/^\[Type here\]$/.test(w.footer) ? w.footer : "";
  const s = parseSel(w, key);
  if (s.cell) return w.paragraphs.find((x) => x.id === s.cell!.para)?.table?.rows[s.cell.r - 1]?.[s.cell.c - 1] ?? "";
  if (s.run) return w.paragraphs.find((x) => x.id === s.run!.para)?.runs?.find((r) => r.id === s.run!.run)?.text ?? "";
  const p = w.paragraphs.find((x) => x.id === s.paras[0]);
  return p ? paraText(p) : "";
}

function editableKey(w: WordDoc, key: string): boolean {
  if (!key || key === "all" || key.includes(",")) return false;
  if (key === "header" || key === "footer") return true;
  const s = parseSel(w, key);
  if (s.cell) return s.cell.r > 0 && s.cell.c > 0;
  if (s.run) return true;
  const p = w.paragraphs.find((x) => x.id === s.paras[0]);
  return Boolean(p && (!p.kind || p.kind === "p"));
}

const GLOSSARY: Record<string, string> = {
  copay: "A fixed amount a patient pays for a covered health care service, usually at the time of the visit.",
  deductible: "The amount a patient pays for covered services before the insurance plan starts to pay.",
  referral: "A written order from a primary care provider for a patient to see a specialist.",
  hipaa: "The Health Insurance Portability and Accountability Act, a U.S. law that protects patients' health information.",
  triage: "The process of sorting patients by how urgently they need care.",
  validation: "Free parking for visitors, stamped or recorded by the office at check-in.",
};

export function DocsSurface({ composer, setComposer }: { composer: boolean; setComposer: (v: boolean) => void }) {
  const g = useG();
  const { doc, ui } = g;
  const f = openFile(doc)!;
  const w = asWord(f);
  const mode: GMode = doc.mode ?? "Editing";
  type Editing = { key: string; text: string; selectAll?: boolean };
  const [editing, setEditingState] = useState<Editing | null>(null);
  const editRef = useRef<Editing | null>(null);
  const setEditing = (v: Editing | null) => { editRef.current = v; setEditingState(v); };
  const scrollRef = useRef<HTMLDivElement>(null);
  const width = useWidth(scrollRef, 900);
  const [ctx, setCtx] = useState<{ pos: MenuPos; key: string } | null>(null);
  useEffect(() => { editRef.current = null; setEditingState(null); }, [doc]);

  const comments = (f.comments ?? []).filter((c) => !c.resolved);
  const sugs = suggestionsOf(w);
  const showMargin = comments.length > 0 || sugs.length > 0 || composer;
  const outline = viewOn(doc, "outline");
  const pane = doc.pane;
  const sidePane = pane && ["Templates", "Comments", "Review suggested edits", "Dictionary", "Details"].includes(pane) ? pane : null;
  const pageW = (w.page?.orientation === "landscape" ? 11 : 8.5) * PX;
  const avail = width - (showMargin ? 300 : 40) - 24;
  const fit = Math.max(0.45, Math.min(1, avail / pageW));
  const z = w.zoom ? w.zoom / 100 : fit;
  const activeComment = ui.selection.startsWith("comment:") ? ui.selection.slice(8) : comments.find((c) => c.anchor === ui.selection)?.id;

  const select = (key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (editRef.current) commitEdit();
    let next = key;
    const base = parseSel(w, ui.selection).paras;
    const isPara = key && !key.includes(".") && key !== "header" && key !== "footer";
    if (e?.shiftKey && isPara && base.length && !ui.selection.includes(".")) next = paraRange(w, base[0], key).join(",");
    g.onSelect({ selection: next });
    if (w.painter && key) g.cmd("home.formatPainter.apply");
    g.focus();
  };
  const startEdit = (key: string, initial?: string) => {
    if (mode === "Viewing" || !editableKey(w, key)) return;
    g.onSelect({ selection: key });
    setEditing({ key, text: initial ?? textAt(w, key), ...(initial === undefined && parseSel(w, key).run ? { selectAll: true } : {}) });
  };
  const commitEdit = () => {
    const e = editRef.current;
    if (!e) return;
    setEditing(null);
    if (e.text !== textAt(w, e.key)) g.onCommit({ kind: "type", target: e.key, value: e.text });
    g.focus();
  };
  g.hooksRef.current.type = (k: string) => {
    if (!editableKey(w, ui.selection)) return;
    // @ opens the smart chip menu (people, files, dates, building blocks), as in Docs.
    if (k === "@" && !ui.selection.includes(".r") && ui.selection !== "header" && ui.selection !== "footer") return g.act("chip:@");
    if (k === "\n") startEdit(ui.selection);
    else startEdit(ui.selection, k);
  };

  const context = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (ui.selection !== key && !ui.selection.split(",").includes(key)) g.onSelect({ selection: key });
    setCtx({ pos: { x: e.clientX, y: e.clientY }, key });
  };
  const ctxEntries = (key: string) => {
    const s = parseSel(w, key);
    const run = s.run ? w.paragraphs.find((p) => p.id === s.run!.para)?.runs?.find((r) => r.id === s.run!.run) : undefined;
    const items: { label: string; icon?: string; command?: string; value?: string; action?: string; shortcut?: string; dialog?: string }[] = [];
    if (run?.misspelled) for (const sg of run.suggestions ?? []) items.push({ label: sg, command: "spelling.change", value: sg });
    if (run?.misspelled) items.push({ label: "Ignore", command: "spelling.ignore", icon: "close" });
    return [
      ...items,
      ...(items.length ? [{ sep: true as const }] : []),
      { label: "Cut", icon: "cut", command: "home.cut", shortcut: "Ctrl+X" },
      { label: "Copy", icon: "copy", command: "home.copy", shortcut: "Ctrl+C" },
      { label: "Paste", icon: "paste", command: "home.paste", shortcut: "Ctrl+V" },
      { label: "Paste without formatting", icon: "paste", command: "home.paste", value: "Keep Text Only", shortcut: "Ctrl+Shift+V" },
      { label: "Delete", icon: "trash", command: "edit.delete" },
      { sep: true as const },
      { label: "Comment", icon: "addComment", action: "comment", shortcut: "Ctrl+Alt+M" },
      { label: "Suggest edits", icon: "suggest", command: "g.mode", value: "Suggesting" },
      { sep: true as const },
      { label: run?.link ? "Edit link" : "Insert link", icon: "link", action: "link", shortcut: "Ctrl+K" },
      { label: "Define", icon: "dictionary", command: "g.pane", value: "Dictionary" },
      { sep: true as const },
      { label: "Clear formatting", icon: "clearFormat", command: "home.clearFormatting", shortcut: "Ctrl+\\" },
      ...(s.cell ? [{ sep: true as const }, { label: "Insert row above", command: "table.insertAbove" }, { label: "Insert row below", command: "table.insertBelow" }, { label: "Delete row", command: "table.delete", value: "Delete Rows" }, { label: "Delete table", command: "table.delete", value: "Delete Table" }] : []),
    ];
  };

  const modeIcon = mode === "Suggesting" ? "suggest" : mode === "Viewing" ? "eye" : "edit";
  const [modeMenu, setModeMenu] = useState<MenuPos | null>(null);
  const modeSwitch = (
    <span className="ml-1 shrink-0">
      <button type="button" aria-label={`Mode: ${mode}`} title="Editing mode" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setModeMenu({ x: r.right - 320, y: r.bottom + 4 }); }} className={`flex h-8 items-center gap-1 rounded-full px-3 text-[14px] ${mode === "Suggesting" ? "bg-[#c4eed0] text-[#0d652d]" : mode === "Viewing" ? "bg-[#e3e3e3]" : "hover:bg-[#dde3ea]"}`}>
        <GIcon name={modeIcon} size={18} color={mode === "Suggesting" ? "#0d652d" : "#444746"} />
        <span className="hidden xl:inline">{mode}</span>
        <GIcon name="dropDown" size={18} />
      </button>
      {modeMenu && (
        <Popup onClose={() => setModeMenu(null)}>
          <div className="fixed z-[200] w-[320px] rounded-md bg-white py-2 shadow-lg" style={{ left: Math.max(8, modeMenu.x), top: modeMenu.y }} role="menu">
            {([
              ["Editing", "edit", "Edit document directly"],
              ["Suggesting", "suggest", "Edits become suggestions"],
              ["Viewing", "eye", "Read or print final document"],
            ] as const).map(([m, ic, d]) => (
              <button key={m} type="button" role="menuitem" aria-label={m} onClick={() => { setModeMenu(null); g.cmd("g.mode", m); }} className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-[#f1f3f4]">
                <GIcon name={ic} size={20} />
                <span className="flex-1"><span className="block text-[14px]">{m}</span><span className="block text-[12px] text-[#5f6368]">{d}</span></span>
                {mode === m && <GIcon name="check" size={18} />}
              </button>
            ))}
          </div>
        </Popup>
      )}
    </span>
  );

  const fullScreen = viewOn(doc, "fullScreen");
  return (
    <div className="flex h-full flex-col bg-[#f9fbfd]">
      {!fullScreen && <EditorHeader menus={DOCS_MENUS} />}
      {!fullScreen && <Toolbar tools={mode === "Viewing" ? DOCS_TOOLBAR.filter((t) => ["Search the menus", "Print", "Zoom"].includes(t.label ?? "")) : DOCS_TOOLBAR} right={modeSwitch} />}
      {fullScreen && <button type="button" onClick={() => g.cmd("g.view", "fullScreen")} className="absolute right-3 top-2 z-20 rounded-full bg-[#303030] px-4 py-1.5 text-[13px] text-white">Exit full screen</button>}
      {mode === "Suggesting" && <div className="mx-auto -mt-1 mb-1 rounded-full bg-[#c4eed0] px-3 py-0.5 text-[12px] text-[#0d652d]">You are suggesting. Your edits show as suggestions the owner can accept or reject.</div>}
      <div className="flex min-h-0 flex-1">
        {outline ? (
          <aside className="w-[240px] shrink-0 overflow-auto pl-3 pr-2 pt-1 text-[13px]" aria-label="Tabs & outlines" style={{ fontFamily: TEXT_FONT }}>
            <div className="mb-2 flex items-center gap-1">
              <IconBtn icon="back" label="Hide tabs & outlines" onClick={() => g.cmd("g.view", "outline")} box={30} size={18} />
              <span className="flex-1 text-[14px] font-medium text-[#1f1f1f]">Document tabs</span>
              <IconBtn icon="plus" label="Add tab" onClick={() => g.cmd("g.toast", "Add tab adds another tab to this document, like adding a sheet in Sheets")} box={30} size={18} />
            </div>
            <div className="mb-1 flex h-9 items-center gap-2 rounded-full bg-[#d3e3fd] px-3 text-[14px] font-medium text-[#041e49]">
              <GIcon name="doc" size={16} color="#041e49" />
              <span className="flex-1 truncate">Tab 1</span>
              <IconBtn icon="more" label="Tab options" onClick={() => g.cmd("g.toast", "Tab options: Rename, Choose emoji, Add subtab, Hide outline, Delete")} box={24} size={16} />
            </div>
            <div className="ml-4 border-l border-[#c7c7c7] pl-2" aria-label="Document outline">
              {outlineOf(w).length === 0 && <p className="py-1 text-[12px] text-[#5f6368]">Headings you add to the document will appear here.</p>}
              {outlineOf(w).map((h) => (
                <button key={h.id} type="button" onClick={() => select(h.id)} className={`block w-full truncate rounded py-1 text-left ${ui.selection === h.id ? "bg-[#e8f0fe] text-[#0b57d0]" : "text-[#444746] hover:bg-[#f1f3f4]"}`} style={{ paddingLeft: 6 + Math.max(0, h.level - 1) * 12 }}>
                  {h.text}
                </button>
              ))}
            </div>
          </aside>
        ) : (
          !fullScreen && (
            <div className="w-12 shrink-0 pl-2 pt-1">
              <IconBtn icon="tabsPanel" label="Show tabs & outlines" onClick={() => g.cmd("g.view", "outline")} box={36} size={20} />
            </div>
          )
        )}
        <div ref={scrollRef} className="relative min-w-0 flex-1 overflow-auto" onClick={() => select("")}>
          {viewOn(doc, "ruler") && !w.flags?.pageless && (
            <div className="sticky top-0 z-10 mx-auto mb-2 h-5 bg-[#f9fbfd]" style={{ width: pageW * z, marginLeft: showMargin ? Math.max(12, (width - 300 - pageW * z) / 2) : undefined }} aria-hidden="true">
              <div className="h-full border-b border-[#c7c7c7] bg-white" style={{ marginLeft: PX * z, marginRight: PX * z, backgroundImage: "repeating-linear-gradient(90deg,#9aa0a6 0 1px,transparent 1px 12px)", backgroundSize: "12px 5px", backgroundRepeat: "repeat-x", backgroundPosition: "bottom" }} />
            </div>
          )}
          <div className="flex items-start pb-6" style={{ justifyContent: showMargin ? "flex-start" : "center", paddingLeft: showMargin ? Math.max(12, (width - 300 - pageW * z) / 2) : undefined }}>
            <div>
              <DocPages
                w={w}
                zoom={z}
                interactive
                selection={ui.selection}
                comments={f.comments}
                activeComment={activeComment}
                mode={mode}
                spelling={viewOn(doc, "spelling")}
                nonPrinting={viewOn(doc, "nonPrinting")}
                onSelect={(k, e) => select(k, e)}
                onEdit={startEdit}
                editing={editing}
                setEditText={(t) => setEditing({ ...editRef.current!, text: t })}
                commitEdit={commitEdit}
                cancelEdit={() => { setEditing(null); g.focus(); }}
                onContext={context}
                onCheck={(pid) => { g.onSelect({ selection: pid }); g.cmd("g.check"); }}
                onToc={(pid) => { g.onSelect({ selection: pid }); g.cmd("references.updateToc"); }}
              />
            </div>
            {showMargin && (
              <div className="ml-4 w-[260px] shrink-0 space-y-2 pt-1" onClick={(e) => e.stopPropagation()}>
                {composer && <CommentComposer onCancel={() => setComposer(false)} />}
                {sugs.map((s) => {
                  const active = ui.selection === s.pid;
                  return (
                    <div key={s.pid} role="group" aria-label={`Suggestion by ${s.author}`} onClick={() => g.onSelect({ selection: s.pid })} className={`rounded-lg p-3 text-[13px] ${active ? "bg-white shadow-[0_1px_3px_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]" : "bg-[#f0f4f9] hover:shadow"}`} style={{ fontFamily: TEXT_FONT }}>
                      <div className="mb-1 flex items-center gap-2">
                        <Avatar person={personOf(doc, s.author) ?? { name: s.author }} size={28} />
                        <div className="min-w-0 flex-1"><div className="truncate font-medium">{s.author}</div><div className="text-[11px] text-[#5f6368]">{s.author === meOf(doc).name ? "Just now" : "Yesterday"}</div></div>
                        <button type="button" aria-label="Accept suggestion" title="Accept suggestion" onClick={(e) => { e.stopPropagation(); g.onSelect({ selection: s.pid }); g.cmd("review.accept"); }} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-black/5"><GIcon name="check" size={18} color="#0b57d0" /></button>
                        <button type="button" aria-label="Reject suggestion" title="Reject suggestion" onClick={(e) => { e.stopPropagation(); g.onSelect({ selection: s.pid }); g.cmd("review.reject"); }} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-black/5"><GIcon name="close" size={18} color="#444746" /></button>
                      </div>
                      <p>
                        {s.added && s.removed ? (
                          <>Replace: <b style={{ color: colorFor(s.author) }}>“{s.removed.trim()}”</b> with <b style={{ color: colorFor(s.author) }}>“{s.added.trim()}”</b></>
                        ) : s.added ? (
                          <>Add: <b style={{ color: colorFor(s.author) }}>“{s.added.trim()}”</b></>
                        ) : (
                          <>Delete: <b style={{ color: colorFor(s.author) }}>“{s.removed.trim()}”</b></>
                        )}
                      </p>
                    </div>
                  );
                })}
                {comments.map((c) => (
                  <CommentCard key={c.id} c={c} active={activeComment === c.id} onActivate={() => g.onSelect({ selection: `comment:${c.id}` })} quote={quoteIn(w, c.anchor)} />
                ))}
              </div>
            )}
          </div>
          {pane === "Spelling and grammar" && <SpellingCard w={w} />}
          {pane === "Voice typing" && <VoiceTyping w={w} />}
          {doc.flags?.wordCountWhileTyping && (
            <div className="sticky bottom-3 left-3 z-10 w-fit rounded-lg bg-white px-3 py-2 text-[13px] shadow" style={{ fontFamily: TEXT_FONT }}>{wordCount(w)} words</div>
          )}
        </div>
        {sidePane === "Templates" && <TemplatesPanel />}
        {sidePane === "Comments" && <CommentsPanel quoteOf={(a) => quoteIn(w, a)} />}
        {sidePane === "Review suggested edits" && <ReviewPanel w={w} />}
        {sidePane === "Dictionary" && <DictionaryPanel w={w} />}
        {sidePane === "Details" && <DetailsPanel />}
      </div>
      {pane === "Word count" && <WordCountDialog w={w} />}
      {pane === "Keyboard shortcuts" && <KeyboardShortcuts />}
      {ctx && (
        <Popup onClose={() => setCtx(null)}>
          <MenuList
            entries={ctxEntries(ctx.key) as never}
            pos={ctx.pos}
            width={300}
            onPick={(i) => { setCtx(null); if (i.action) g.act(i.action); else if (i.command) g.cmd(i.command, i.value); }}
            onClose={() => setCtx(null)}
          />
        </Popup>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Docs panels                                                         */
/* ------------------------------------------------------------------ */

function SpellingCard({ w }: { w: WordDoc }) {
  const g = useG();
  const s = parseSel(w, g.ui.selection);
  const run = s.run ? w.paragraphs.find((p) => p.id === s.run!.para)?.runs?.find((r) => r.id === s.run!.run) : undefined;
  const next = firstMisspelled(w);
  const current = run?.misspelled ? run : undefined;
  return (
    <div className="absolute right-4 top-2 z-20 w-[300px] rounded-lg bg-white p-4 text-[14px] shadow-[0_1px_3px_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]" role="dialog" aria-label="Spelling and grammar" onClick={(e) => e.stopPropagation()} style={{ fontFamily: TEXT_FONT }}>
      <div className="mb-2 flex items-center">
        <span className="flex-1 font-medium">{current ? "Spelling" : "Spelling and grammar"}</span>
        <IconBtn icon="close" label="Close" onClick={() => g.cmd("g.pane", "")} box={28} size={18} />
      </div>
      {current ? (
        <>
          <p className="mb-1 text-[13px] text-[#444746]">Change to:</p>
          <p className="mb-3 text-[16px]"><span className="font-medium text-[#188038]">{current.suggestions?.[0] ?? current.text}</span> <span className="ml-1 text-[#5f6368] line-through">{current.text}</span></p>
          <div className="flex gap-2">
            <PillBtn onClick={() => g.cmd("spelling.change", current.suggestions?.[0] ?? current.text)}>Accept</PillBtn>
            <PillBtn kind="outlined" onClick={() => g.cmd("spelling.ignore")}>Ignore</PillBtn>
          </div>
          {(current.suggestions?.length ?? 0) > 1 && (
            <div className="mt-3 border-t border-[#e0e0e0] pt-2 text-[13px]">
              <p className="mb-1 text-[#444746]">Other suggestions</p>
              {current.suggestions!.slice(1).map((sg) => <button key={sg} type="button" onClick={() => g.cmd("spelling.change", sg)} className="mr-2 rounded-full border border-[#747775] px-3 py-1 hover:bg-[#f1f3f4]">{sg}</button>)}
            </div>
          )}
        </>
      ) : next ? (
        <PillBtn onClick={() => g.onSelect({ selection: next })}>Go to next suggestion</PillBtn>
      ) : (
        <p className="text-[#444746]">Nothing to fix. No spelling or grammar suggestions.</p>
      )}
    </div>
  );
}

function VoiceTyping({ w }: { w: WordDoc }) {
  const g = useG();
  const [listening, setListening] = useState(false);
  const [said, setSaid] = useState("");
  const s = parseSel(w, g.ui.selection);
  const target = s.paras.length === 1 && !s.cell && !s.header ? s.paras[0] : "";
  const p = w.paragraphs.find((x) => x.id === target);
  const speak = () => {
    if (!said.trim() || !p) return;
    const add = dictationText(said);
    const cur = paraText(p);
    g.onCommit({ kind: "type", target, value: cur ? `${cur.replace(/\s+$/, "")} ${add}` : add });
    setSaid("");
  };
  return (
    <div className="absolute left-4 top-4 z-20 w-[220px] rounded-lg bg-white p-3 text-center text-[13px] shadow-lg" role="dialog" aria-label="Voice typing" onClick={(e) => e.stopPropagation()} style={{ fontFamily: TEXT_FONT }}>
      <div className="mb-1 flex items-center justify-between text-[12px] text-[#444746]">
        <span>English (US)</span>
        <IconBtn icon="close" label="Close voice typing" onClick={() => g.cmd("g.pane", "")} box={24} size={16} />
      </div>
      <button type="button" aria-label={listening ? "Stop voice typing" : "Click to speak"} onClick={() => setListening((x) => !x)} className={`mx-auto my-2 flex h-20 w-20 items-center justify-center rounded-full ${listening ? "bg-[#d93025]" : "bg-[#f1f3f4] hover:bg-[#e8eaed]"}`}>
        <GIcon name="mic" size={40} color={listening ? "#fff" : "#444746"} />
      </button>
      <p className="mb-2 text-[#444746]">{listening ? "Listening…" : "Click to speak"}</p>
      {listening && (
        <>
          <input
            autoFocus
            aria-label="Say"
            placeholder={p ? "Type what you would say, then press Enter" : "Click a paragraph first"}
            value={said}
            onChange={(e) => setSaid(e.target.value)}
            onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") speak(); }}
            className="w-full rounded border border-[#747775] px-2 py-1.5 text-[12px]"
          />
          <p className="mt-2 text-left text-[11px] text-[#5f6368]">Say “period”, “comma”, “question mark” or “new line” for punctuation.</p>
        </>
      )}
    </div>
  );
}

function WordCountDialog({ w }: { w: WordDoc }) {
  const g = useG();
  const words = wordCount(w);
  const text = w.paragraphs.map(paraText).join("");
  const pages = 1 + w.paragraphs.filter((p) => p.kind === "pageBreak").length;
  return (
    <Modal title="Word count" onClose={() => g.cmd("g.pane", "")} width={400} footer={<PillBtn onClick={() => g.cmd("g.pane", "")}>OK</PillBtn>}>
      <table className="mb-3 w-full text-[14px]">
        <tbody>
          {[["Pages", pages], ["Words", words], ["Characters", text.length], ["Characters excluding spaces", text.replace(/\s/g, "").length]].map(([k, v]) => (
            <tr key={k as string} className="border-b border-[#e0e0e0]"><td className="py-2">{k}</td><td className="py-2 text-right">{v}</td></tr>
          ))}
        </tbody>
      </table>
      <label className="flex items-center gap-3 text-[14px]">
        <input type="checkbox" aria-label="Display word count while typing" checked={Boolean(g.doc.flags?.wordCountWhileTyping)} onChange={() => g.cmd("g.wordCountWhileTyping")} className="h-[18px] w-[18px] accent-[#0b57d0]" />
        Display word count while typing
      </label>
    </Modal>
  );
}

function ReviewPanel({ w }: { w: WordDoc }) {
  const g = useG();
  const list = suggestionsOf(w);
  return (
    <SidePanel title="Suggested edits" onClose={() => g.cmd("g.pane", "")}>
      <div className="mb-3 flex gap-2">
        <PillBtn kind="outlined" disabled={!list.length} onClick={() => g.cmd("review.accept", "Accept all")}><GIcon name="check" size={16} color="#0b57d0" /> Accept all</PillBtn>
        <PillBtn kind="outlined" disabled={!list.length} onClick={() => g.cmd("review.reject", "Reject all")}><GIcon name="close" size={16} color="#0b57d0" /> Reject all</PillBtn>
      </div>
      {list.length === 0 && <p className="py-6 text-center text-[13px] text-[#5f6368]">No suggested edits.</p>}
      {list.map((s) => (
        <div key={s.pid} onClick={() => g.onSelect({ selection: s.pid })} className={`mb-2 rounded-lg p-3 text-[13px] ${g.ui.selection === s.pid ? "bg-[#e8f0fe]" : "bg-[#f0f4f9]"}`}>
          <div className="mb-1 flex items-center gap-2">
            <Avatar person={personOf(g.doc, s.author) ?? { name: s.author }} size={24} />
            <span className="flex-1 font-medium">{s.author}</span>
            <button type="button" aria-label="Accept suggestion" onClick={(e) => { e.stopPropagation(); g.onSelect({ selection: s.pid }); g.cmd("review.accept"); }} className="rounded-full p-1 hover:bg-black/5"><GIcon name="check" size={18} color="#0b57d0" /></button>
            <button type="button" aria-label="Reject suggestion" onClick={(e) => { e.stopPropagation(); g.onSelect({ selection: s.pid }); g.cmd("review.reject"); }} className="rounded-full p-1 hover:bg-black/5"><GIcon name="close" size={18} /></button>
          </div>
          <p>{s.added && s.removed ? `Replace “${s.removed.trim()}” with “${s.added.trim()}”` : s.added ? `Add “${s.added.trim()}”` : `Delete “${s.removed.trim()}”`}</p>
        </div>
      ))}
    </SidePanel>
  );
}

function DictionaryPanel({ w }: { w: WordDoc }) {
  const g = useG();
  const s = parseSel(w, g.ui.selection);
  const run = s.run ? w.paragraphs.find((p) => p.id === s.run!.para)?.runs?.find((r) => r.id === s.run!.run) : undefined;
  const word = (run?.text ?? "").trim().replace(/[.,;:]$/, "");
  const def = GLOSSARY[word.toLowerCase()];
  return (
    <SidePanel title="Dictionary" onClose={() => g.cmd("g.pane", "")}>
      <div className="mb-3 flex h-10 items-center gap-2 rounded-full bg-[#f1f3f4] px-3"><GIcon name="search" size={18} /><span className="text-[14px]">{word || "Search the dictionary"}</span></div>
      {word ? (def ? <><p className="mb-1 text-[18px] font-medium">{word}</p><p className="text-[#444746]">{def}</p></> : <p className="text-[#5f6368]">No definition found for “{word}”.</p>) : <p className="text-[#5f6368]">Select a word in the document to look it up.</p>}
    </SidePanel>
  );
}

/** File › New › From a template: a gallery in the side panel. */
function TemplatesPanel() {
  const g = useG();
  const [pick, setPick] = useState<string | null>(null);
  return (
    <SidePanel title="Templates" onClose={() => g.cmd("g.pane", "")}>
      <p className="mb-3 text-[12px] text-[#5f6368]">Pick a template, then click Insert. In a blank document, the template fills the document.</p>
      <div className="mb-3 grid grid-cols-2 gap-2" role="listbox" aria-label="Templates">
        {templatesFor("docs").map((t) => (
          <button key={t.name} type="button" role="option" aria-selected={pick === t.name} aria-label={t.name} onClick={() => setPick(t.name)} className={`rounded-lg border p-2 text-left text-[12px] ${pick === t.name ? "border-2 border-[#0b57d0]" : "border-[#dadce0] hover:border-[#4285f4]"}`}>
            <div className="mb-1 h-16 rounded bg-[#f8f9fa] p-2">
              <div className="mb-1 h-1.5 w-2/3 rounded bg-[#4285f4]/70" />
              <div className="mb-1 h-1 w-full rounded bg-[#dadce0]" />
              <div className="h-1 w-4/5 rounded bg-[#dadce0]" />
            </div>
            {t.name}
          </button>
        ))}
      </div>
      <PillBtn disabled={!pick} onClick={() => pick && g.cmd("g.template", pick)}>Insert</PillBtn>
    </SidePanel>
  );
}
