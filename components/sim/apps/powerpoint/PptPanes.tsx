"use client";

import { useEffect, useRef, useState } from "react";
import type { PptDeck } from "@/types/sim";
import type { CanvasProps, MenuItem } from "../../types";
import { activeSlide, animKey, animSequence, clipApp, clipHistory, clipLabel, slideText, type AnimItem } from "./model";
import { THESAURUS, ox, sx, type CommentX } from "./ext";

type Props = {
  deck: PptDeck;
  ui: CanvasProps<PptDeck>["ui"];
  pane: string;
  onCommit: CanvasProps<PptDeck>["onCommit"];
  openDialog: (id: string) => void;
  onSelect: CanvasProps<PptDeck>["onSelect"];
  onContextMenu?: CanvasProps<PptDeck>["onContextMenu"];
};

/* ------------------------------------------------------------------ */
/* Office Clipboard (Home › Clipboard dialog box launcher)             */
/* ------------------------------------------------------------------ */

const APP_BADGE: Record<string, { letter: string; color: string }> = {
  Word: { letter: "W", color: "#2b579a" },
  Excel: { letter: "X", color: "#217346" },
  PowerPoint: { letter: "P", color: "#b7472a" },
  Outlook: { letter: "O", color: "#0078d4" },
};

/**
 * The Office Clipboard task pane, docked on the left like PowerPoint's. Click an item to paste it
 * at the selection (a placeholder, the Notes pane, or the slide); each item's arrow has Paste and Delete.
 */
export function ClipboardPane({ deck, onCommit, onContextMenu }: { deck: PptDeck; onCommit: Props["onCommit"]; onContextMenu?: Props["onContextMenu"] }) {
  const items = clipHistory(deck);
  const itemMenu = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    e.stopPropagation();
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onContextMenu?.(r.right - 8, r.bottom, [
      { label: "Paste", icon: "paste", command: "clipboard.paste", value: label },
      { label: "Delete", icon: "reject", command: "clipboard.delete", value: label },
    ]);
  };
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-gray-300 bg-white text-[12px]" aria-label="Clipboard">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-[13px]">Clipboard</span>
        <button type="button" aria-label="Close Clipboard" onClick={() => onCommit({ kind: "command", id: "pane.close" })} className="px-1 hover:bg-gray-100">✕</button>
      </div>
      <div className="flex gap-2 border-b px-3 py-1.5">
        <button type="button" disabled={!items.length} onClick={() => onCommit({ kind: "command", id: "clipboard.pasteAll" })} className="rounded border border-gray-300 px-2 py-0.5 hover:bg-[#fde9d9] disabled:opacity-40">Paste All</button>
        <button type="button" disabled={!items.length} onClick={() => onCommit({ kind: "command", id: "clipboard.clear" })} className="rounded border border-gray-300 px-2 py-0.5 hover:bg-[#fde9d9] disabled:opacity-40">Clear All</button>
      </div>
      <p className="px-3 pt-2 text-[11px] text-gray-500">{items.length ? "Click an Item to Paste:" : "Clipboard empty. Copy or cut to collect items."}</p>
      <div className="flex-1 space-y-1 overflow-auto p-2">
        {items.map((c, i) => {
          const label = clipLabel(c);
          const app = APP_BADGE[clipApp(c)] ?? APP_BADGE.PowerPoint;
          return (
            <div key={`${i}-${label}`} className="group relative">
              <button type="button" title={label} aria-label={`Paste ${label}`} onClick={() => onCommit({ kind: "command", id: "clipboard.paste", value: label })} onContextMenu={(e) => itemMenu(e, label)} className="flex w-full items-start gap-2 rounded border border-gray-200 px-2 py-1.5 pr-6 text-left hover:border-[#c43e1c] hover:bg-[#fde9d9]">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-[9px] font-bold text-white" style={{ background: app.color }}>{app.letter}</span>
                <span className="line-clamp-3 break-words">{c.kind === "obj" && c.objs[0]?.kind === "chart" ? "📊 " : ""}{label}</span>
              </button>
              <button type="button" aria-label={`Options for ${label}`} onClick={(e) => itemMenu(e, label)} className="absolute right-1 top-1 hidden rounded px-1 text-gray-600 hover:bg-gray-200 group-hover:block">▾</button>
            </div>
          );
        })}
      </div>
      <div className="border-t px-3 py-1.5 text-[11px] text-gray-500">Options ▾</div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Animation Pane                                                      */
/* ------------------------------------------------------------------ */

function AnimationPane({ deck, ui, onCommit, onSelect, onContextMenu }: Pick<Props, "deck" | "ui" | "onCommit" | "onSelect" | "onContextMenu">) {
  const slide = activeSlide(deck, ui)!;
  const items = animSequence(slide);
  const selKey = ui.selection;
  const current = items.find((it) => animKey(it) === selKey);
  const pick = (it: AnimItem) => onSelect({ selection: animKey(it), slide: slide.id });
  const menu = (e: React.MouseEvent, it: AnimItem) => {
    e.preventDefault();
    e.stopPropagation();
    pick(it);
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const tick = (s: string) => (it.start === s ? "✓ " : "    ");
    const items: MenuItem[] = [
      { label: `${tick("On Click")}Start On Click`, command: "animation.start", value: "On Click" },
      { label: `${tick("With Previous")}Start With Previous`, command: "animation.start", value: "With Previous" },
      { label: `${tick("After Previous")}Start After Previous`, command: "animation.start", value: "After Previous" },
      { separator: true },
      { label: "Effect Options...", dialog: "animEffect" },
      { label: "Timing...", dialog: "animTiming" },
      { separator: true },
      { label: "Remove", icon: "reject", command: "animation.remove" },
    ];
    onContextMenu?.(e.type === "contextmenu" ? e.clientX : r.right - 8, e.type === "contextmenu" ? e.clientY : r.bottom, items);
  };
  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center gap-1">
        <button
          type="button"
          onClick={() => onCommit(current ? { kind: "command", id: "animation.playFrom", value: animKey(current) } : { kind: "command", id: "animation.preview" })}
          className="rounded border border-gray-300 px-2 py-0.5 hover:bg-gray-50"
        >
          ▶ {current ? (items.indexOf(current) === 0 ? "Play All" : "Play From") : "Play All"}
        </button>
        <span className="flex-1" />
        <button type="button" aria-label="Move Earlier" title="Move Earlier" disabled={!current || items.indexOf(current) === 0} onClick={() => onCommit({ kind: "command", id: "animation.earlier" })} className="rounded border border-gray-300 px-1.5 hover:bg-gray-50 disabled:opacity-40">▲</button>
        <button type="button" aria-label="Move Later" title="Move Later" disabled={!current || items.indexOf(current) === items.length - 1} onClick={() => onCommit({ kind: "command", id: "animation.later" })} className="rounded border border-gray-300 px-1.5 hover:bg-gray-50 disabled:opacity-40">▼</button>
      </div>
      <div className="flex-1 space-y-0.5 overflow-auto">
        {items.length ? items.map((it) => {
          const on = animKey(it) === selKey;
          return (
            <div key={it.key} className={`group flex items-center rounded ${on ? "bg-[#fde9d9] outline outline-1 outline-[#e8a08a]" : "hover:bg-gray-50"}`}>
              <button type="button" aria-label={`${it.group || ""} ${it.label} ${it.name}`.trim()} onClick={() => pick(it)} onDoubleClick={() => { pick(it); }} onContextMenu={(e) => menu(e, it)} className="flex min-w-0 flex-1 items-center gap-2 px-1 py-1 text-left">
                <span className="w-4 text-gray-500">{it.start === "On Click" ? it.group : ""}</span>
                <span className="text-[10px] text-gray-500" title={it.start}>{it.start === "On Click" ? "🖱" : it.start === "With Previous" ? "⇉" : "⏱"}</span>
                <span className="text-emerald-700">★</span>
                <span className="flex-1 truncate">{it.label}</span>
                <span className="text-[10px] text-gray-500">{it.name}</span>
              </button>
              <button type="button" aria-label={`Options for ${it.label}`} title="Options" onClick={(e) => menu(e, it)} className={`px-1 text-gray-600 hover:bg-gray-200 ${on ? "" : "invisible group-hover:visible"}`}>▾</button>
            </div>
          );
        }) : <p className="text-gray-500">No animations on this slide.</p>}
      </div>
      <p className="pt-2 text-[11px] text-gray-500">Click an effect to select it. Press Delete to remove it, or use its arrow for Start, Effect Options, Timing and Remove.</p>
    </div>
  );
}

function CommentCard({ c, i, onCommit, focused }: { c: CommentX; i: number; onCommit: Props["onCommit"]; focused: boolean }) {
  const [reply, setReply] = useState("");
  const [menu, setMenu] = useState(false);
  const post = () => {
    if (!reply.trim()) return;
    onCommit({ kind: "command", id: "comment.focus", value: i });
    onCommit({ kind: "command", id: "comment.reply", value: reply.trim() });
    setReply("");
  };
  return (
    <div className={`rounded border p-2 ${focused ? "border-[#c43e1c]" : "border-gray-300"} ${c.resolved ? "opacity-60" : ""}`} onClick={() => onCommit({ kind: "command", id: "comment.focus", value: i })}>
      <div className="flex items-start justify-between gap-1">
        <div>
          <b>{c.author}</b>
          {c.resolved && <span className="ml-1 text-[10px] text-emerald-700">Resolved</span>}
        </div>
        <div className="relative">
          <button type="button" aria-label="More thread actions" onClick={(e) => { e.stopPropagation(); setMenu((m) => !m); }} className="px-1 hover:bg-gray-100">···</button>
          {menu && (
            <div className="absolute right-0 top-5 z-10 w-36 border border-gray-300 bg-white py-1 shadow-lg">
              <button type="button" onClick={(e) => { e.stopPropagation(); setMenu(false); onCommit({ kind: "command", id: "comment.focus", value: i }); onCommit({ kind: "command", id: "review.deleteComment", value: "Delete" }); }} className="block w-full px-2 py-1 text-left hover:bg-[#e5f1fb]">Delete thread</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); setMenu(false); onCommit({ kind: "command", id: "comment.resolve", value: i }); }} className="block w-full px-2 py-1 text-left hover:bg-[#e5f1fb]">{c.resolved ? "Reopen thread" : "Resolve thread"}</button>
            </div>
          )}
        </div>
      </div>
      <p className="mt-0.5">{c.text}</p>
      {(c.replies ?? []).map((r, k) => (
        <div key={k} className="mt-1.5 border-l-2 border-gray-200 pl-2">
          <b>{r.author}</b>
          <p>{r.text}</p>
        </div>
      ))}
      {!c.resolved && (
        <div className="mt-2 flex gap-1">
          <input
            aria-label="Reply"
            placeholder="Reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); post(); } }}
            className="min-w-0 flex-1 rounded border border-gray-300 px-1.5 py-0.5"
          />
          <button type="button" aria-label="Post reply" onClick={(e) => { e.stopPropagation(); post(); }} className="rounded border border-gray-300 px-1.5 hover:bg-[#fde9d9]">➤</button>
        </div>
      )}
    </div>
  );
}

function TextPane({ deck, ui, onCommit }: Pick<Props, "deck" | "ui" | "onCommit">) {
  const slide = activeSlide(deck, ui)!;
  const key = ui.selection.split(",")[0];
  const o = slide.objects?.find((x) => `${slide.id}.${x.id}` === key && x.kind === "smartart") ?? slide.objects?.find((x) => x.kind === "smartart");
  const text = (o?.items ?? []).join("\n");
  const [draft, setDraft] = useState(text);
  useEffect(() => setDraft(text), [text]);
  if (!o) return <p className="text-gray-500">Select a SmartArt graphic to edit its text.</p>;
  const commit = () => { if (draft !== text) onCommit({ kind: "type", target: `${slide.id}.${o.id}`, value: draft }); };
  return (
    <div className="flex h-full flex-col gap-2">
      <p className="text-gray-600">Type your text here. Press Enter for a new shape, then click outside the box (or press Ctrl+Enter) to update the graphic.</p>
      <textarea
        aria-label="SmartArt Text Pane"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && e.ctrlKey) { e.preventDefault(); commit(); } }}
        onBlur={commit}
        className="min-h-[160px] flex-1 resize-none rounded border border-gray-300 p-2 font-[inherit] leading-6"
        style={(() => {
          // One bullet per line of text, not a bullet on every empty row of the box.
          const lines = Math.max(1, draft.split("\n").length);
          const dot = "radial-gradient(circle at 6px 12px, #555 2px, transparent 2.5px)";
          return {
            backgroundImage: Array(lines).fill(dot).join(","),
            backgroundSize: "12px 24px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: Array.from({ length: lines }, (_, i) => `0 ${8 + i * 24}px`).join(","),
            backgroundAttachment: "local",
            paddingLeft: 18,
          };
        })()}
      />
      <p className="text-[11px] text-gray-500">{o.label}</p>
    </div>
  );
}

export function PptPane({ deck, ui, pane, onCommit, openDialog, onSelect, onContextMenu }: Props) {
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
        <p className="text-[11px] uppercase text-gray-500">Spelling · Slide {deck.slides.indexOf(s!) + 1}</p>
        <p className="text-[14px]"><span className="underline decoration-red-600 decoration-wavy">{w.word}</span></p>
        {w.suggestions.map((sg) => <button key={sg} type="button" onClick={() => onCommit({ kind: "command", id: "spelling.change", value: sg })} className="block w-full rounded border border-gray-300 px-2 py-1 text-left hover:bg-[#fde9d9]">{sg}</button>)}
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={() => onCommit({ kind: "command", id: "spelling.ignore" })} className="text-[#c43e1c] hover:underline">Ignore Once</button>
          <button type="button" onClick={() => onCommit({ kind: "command", id: "spelling.ignoreAll", value: w.word })} className="text-[#c43e1c] hover:underline">Ignore All</button>
        </div>
      </div>
    ) : <p>Spelling check complete.</p>;
  } else if (pane === "Spelling: done") {
    title = "Spelling";
    body = <p>Spelling check complete. You&apos;re good to go!</p>;
  } else if (pane === "Comments") {
    const list = (sx(slide).comments ?? []) as CommentX[];
    const focus = Number(deck.flags?.commentFocus ?? 0);
    body = (
      <div className="space-y-2">
        <button type="button" onClick={() => openDialog("newComment")} className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-50">+ New</button>
        {list.length === 0 && <p className="text-gray-500">No comments on this slide.</p>}
        {list.map((c, i) => <CommentCard key={`${slide.id}-${i}-${c.text}`} c={c} i={i} focused={list.length > 1 && i === focus} onCommit={onCommit} />)}
      </div>
    );
  } else if (pane === "Animation Pane") {
    body = <AnimationPane deck={deck} ui={ui} onCommit={onCommit} onSelect={onSelect} onContextMenu={onContextMenu} />;
  } else if (pane === "Accessibility") {
    const missing = deck.slides.flatMap((s, i) => (s.objects ?? []).filter((o) => (o.kind === "image" || o.kind === "chart" || o.kind === "smartart" || o.kind === "video") && !o.alt && !ox(o).decorative).map((o) => ({ s, i: i + 1, o })));
    const untitled = deck.slides.map((s, i) => ({ s, i })).filter(({ s }) => !s.title && s.layout !== "Blank");
    body = missing.length + untitled.length === 0 ? <p className="text-emerald-700">No accessibility issues found. People with disabilities should not have difficulty reading this presentation.</p> : (
      <div className="space-y-2">
        <p className="font-semibold">Errors</p>
        {missing.map(({ s, i, o }) => <button key={`${s.id}${o.id}`} type="button" onClick={() => { onSelect({ slide: s.id, selection: `${s.id}.${o.id}` }); openDialog("altText"); }} className="block w-full rounded border border-red-200 bg-red-50 px-2 py-1 text-left">Missing alternative text: {o.label} (Slide {i})</button>)}
        {untitled.map(({ s, i }) => <button key={s.id} type="button" onClick={() => onSelect({ slide: s.id, selection: `${s.id}.title` })} className="block w-full rounded border border-amber-200 bg-amber-50 px-2 py-1 text-left">Missing slide title: Slide {i + 1}</button>)}
      </div>
    );
  } else if (pane.startsWith("Replace")) {
    title = "Replace";
    body = <p>PowerPoint searched your presentation and made {pane.replace("Replace: ", "")}.</p>;
  } else if (pane.startsWith("Find: ")) {
    title = "Find";
    body = <p>{pane.slice(6)}</p>;
  } else if (pane === "Thesaurus") {
    const word = String(deck.flags?.thesaurusWord ?? "");
    const syn = THESAURUS[word.toLowerCase()] ?? [];
    body = word ? (
      <div className="space-y-2">
        <p className="rounded border border-gray-300 px-2 py-1 font-semibold">{word}</p>
        <p className="text-[11px] uppercase text-gray-500">Synonyms (adj./n./v.)</p>
        {syn.map((s) => (
          <div key={s} className="flex items-center justify-between rounded px-1 py-0.5 hover:bg-gray-50">
            <span>{s}</span>
            <button type="button" onClick={() => onCommit({ kind: "command", id: "thesaurus.insert", value: s })} className="rounded border border-gray-300 px-1.5 text-[11px] hover:bg-[#fde9d9]">Insert</button>
          </div>
        ))}
      </div>
    ) : <p className="text-gray-600">Select a word on the slide, then open the Thesaurus again to see synonyms.</p>;
  } else if (pane === "Selection") {
    const objs = (slide.objects ?? []).slice().sort((a, b) => (b.z ?? 0) - (a.z ?? 0));
    const sel = new Set(ui.selection.split(","));
    body = objs.length ? (
      <div className="space-y-0.5">
        {objs.map((o) => {
          const k = `${slide.id}.${o.id}`;
          return (
            <button key={o.id} type="button" onClick={(e) => onSelect({ slide: slide.id, selection: e.shiftKey || e.ctrlKey ? Array.from(new Set([...Array.from(sel).filter((x) => x.startsWith(`${slide.id}.o`)), k])).join(",") : k })} className={`flex w-full items-center justify-between rounded px-2 py-1 text-left ${sel.has(k) ? "bg-[#cde4f7]" : "hover:bg-gray-50"}`}>
              <span className="truncate">{o.kind === "image" ? "Picture" : o.kind === "textbox" ? "TextBox" : o.kind === "shape" ? o.label?.split(":")[0] : o.kind === "icon" ? "Graphic" : ox(o).ole ? "Object" : o.kind[0].toUpperCase() + o.kind.slice(1)} {o.id.slice(1)}{o.label && (o.kind === "image" || o.kind === "icon") ? `: ${o.label}` : ""}</span>
              <span className="text-gray-400">👁</span>
            </button>
          );
        })}
        <p className="pt-2 text-[11px] text-gray-500">Top of the list is in front. Shift+click to select several.</p>
      </div>
    ) : <p className="text-gray-500">There are no shapes on this slide.</p>;
  } else if (pane === "Text Pane") {
    body = <TextPane deck={deck} ui={ui} onCommit={onCommit} />;
  } else if (pane === "Inspect Presentation") {
    title = "Document Inspector";
    const comments = deck.slides.reduce((n, s) => n + (s.comments?.length ?? 0), 0);
    const notes = deck.slides.filter((s) => s.notes?.trim()).length;
    const row = (label: string, found: string | null, what: string) => (
      <div className="border-b border-gray-200 py-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold">{found ? "! " : "✓ "}{label}</p>
            <p className="text-gray-600">{found ?? "No items were found."}</p>
          </div>
          {found && <button type="button" onClick={() => onCommit({ kind: "command", id: "inspector.remove", value: what })} className="shrink-0 rounded border border-gray-400 px-2 py-0.5 hover:bg-gray-100">Remove All</button>}
        </div>
      </div>
    );
    body = (
      <div>
        <p className="mb-2 text-gray-600">Review the inspection results.</p>
        {row("Comments", comments ? `${comments} comment${comments === 1 ? " was" : "s were"} found.` : null, "Comments")}
        {row("Document Properties and Personal Information", deck.flags?.["removed:Document Properties and Personal Information"] ? null : "The following document information was found: Document properties, Author", "Document Properties and Personal Information")}
        {row("Presentation Notes", notes ? "Presentation notes were found." : null, "Presentation Notes")}
      </div>
    );
  } else if (pane === "Compatibility") {
    title = "Compatibility Checker";
    body = <p>No compatibility issues were found. Older versions of PowerPoint can open this presentation.</p>;
  } else if (pane === "Version History") {
    body = (
      <div className="space-y-2">
        {["Today, 9:42 AM · BEOC Student", "Yesterday, 4:15 PM · BEOC Student", "Oct 16, 11:02 AM · Dana Whitfield"].map((v, i) => (
          <div key={v} className={`rounded border px-2 py-1 ${i === 0 ? "border-[#c43e1c]" : "border-gray-300"}`}>{i === 0 ? "Current version · " : ""}{v}{i > 0 && <span className="ml-1 text-[#c43e1c]">Open version</span>}</div>
        ))}
      </div>
    );
  } else if (pane === "Thesaurus" || pane === "Search" || pane === "Translator" || pane === "Help" || pane === "Find") {
    body = <p className="text-gray-700">{pane === "Find" ? `Searching ${deck.slides.length} slides: ${deck.slides.map(slideText).join(" ").length} characters of text.` : "Results for the selected text appear here."}</p>;
  }
  return (
    <aside className="flex w-64 shrink-0 flex-col border-l border-gray-300 bg-white text-[12px]">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-[13px]">{title}</span>
        <button type="button" aria-label={`Close ${title}`} onClick={() => onCommit({ kind: "command", id: "pane.close" })} className="px-1 hover:bg-gray-100">✕</button>
      </div>
      <div className="flex-1 overflow-auto p-3">{body}</div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Chart data sheet ("Chart in Microsoft PowerPoint")                  */
/* ------------------------------------------------------------------ */

export function ChartDataSheet({ deck, onCommit }: { deck: PptDeck; onCommit: CanvasProps<PptDeck>["onCommit"] }) {
  const key = String(deck.flags?.chartData ?? "");
  const [sid, oid] = key.split(".");
  const o = deck.slides.find((s) => s.id === sid)?.objects?.find((x) => x.id === oid && x.kind === "chart");
  const [edit, setEditState] = useState<{ cell: string; text: string } | null>(null);
  const editRef = useRef<{ cell: string; text: string } | null>(null);
  const setEdit = (v: { cell: string; text: string } | null) => { editRef.current = v; setEditState(v); };
  useEffect(() => { editRef.current = null; setEditState(null); }, [key]);
  if (!o) return null;
  const series = o.series ?? [];
  const rows = Math.max(5, series.length + 2);
  const valueOf = (cell: string): string => {
    const col = cell[0];
    const r = Number(cell.slice(1));
    if (r === 1) return col === "B" ? ox(o).chart?.seriesName ?? "Series 1" : "";
    const it = series[r - 2];
    if (!it) return "";
    return col === "A" ? it.label : col === "B" ? String(it.value) : "";
  };
  const commit = (move: "down" | "right" | null) => {
    const cur = editRef.current;
    if (!cur) return;
    const changed = cur.text !== valueOf(cur.cell);
    const col = cur.cell[0];
    const r = Number(cur.cell.slice(1));
    const next = move === "down" ? `${col}${r + 1}` : move === "right" ? `${col === "A" ? "B" : "A"}${col === "A" ? r : r + 1}` : null;
    setEdit(next ? { cell: next, text: valueOf(next) } : null);
    if (changed) onCommit({ kind: "type", target: `${key}.${cur.cell}`, value: cur.text });
  };
  return (
    <div className="absolute left-1/2 top-3 z-30 w-[360px] -translate-x-1/2 border border-gray-400 bg-white text-[12px] shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between bg-[#217346] px-2 py-1 text-white">
        <span>Chart in Microsoft PowerPoint</span>
        <button type="button" aria-label="Close chart data" onClick={() => { commit(null); onCommit({ kind: "command", id: "pane.close" }); }} className="px-1 hover:bg-white/20">✕</button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="w-8 border border-gray-300" />
            {["A", "B", "C"].map((c) => <th key={c} className="border border-gray-300 font-normal">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, i) => i + 1).map((r) => (
            <tr key={r}>
              <td className="border border-gray-300 bg-gray-100 text-center text-gray-600">{r}</td>
              {["A", "B", "C"].map((c) => {
                const cell = `${c}${r}`;
                const inRange = r <= series.length + 1 && c !== "C";
                const editing = edit?.cell === cell;
                return (
                  <td key={c} onClick={() => { if (!editing) { commit(null); setEdit({ cell, text: valueOf(cell) }); } }} className={`h-6 border px-1 ${inRange ? "border-[#4472C4]/50" : "border-gray-300"} ${c === "B" && r > 1 ? "text-right" : ""} ${editing ? "outline outline-2 outline-[#217346]" : ""}`}>
                    {editing ? (
                      <input
                        autoFocus
                        aria-label={`Cell ${cell}`}
                        value={edit.text}
                        onChange={(e) => setEdit({ cell, text: e.target.value })}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === "Enter") { e.preventDefault(); commit("down"); }
                          if (e.key === "Tab") { e.preventDefault(); commit("right"); }
                          if (e.key === "Escape") { e.preventDefault(); setEdit(null); }
                        }}
                        onBlur={() => commit(null)}
                        onFocus={(e) => e.currentTarget.select()}
                        className="w-full outline-none"
                      />
                    ) : valueOf(cell)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-2 py-1 text-[11px] text-gray-500">Click a cell, type, and press Enter. The chart updates as you go.</p>
    </div>
  );
}
