"use client";

/**
 * Dialogs the PowerPoint canvas draws itself, because their buttons act on a list (the shared
 * SimDialog only has OK and Cancel). Each is open while `flags.pptDialog` names it:
 *
 *  "customShows"  Slide Show › Custom Slide Show › Custom Shows... (New / Edit / Remove / Copy / Show),
 *                 with Define Custom Show for New and Edit
 *  "links"        Edit Links to Files (right-click a linked Excel object › Linked Chart Object › Links...):
 *                 Update Now, Open Source, Change Source, Break Link, Automatic / Manual update
 *
 * Commits: dialog "defineCustomShow" { name, slides: "s1,s2,s10", original }, commands
 * slideshow.customShow / customShow.remove / customShow.copy (value: show name), links.update /
 * links.openSource / links.break (value: "s2.o1"), links.changeSource ("s2.o1|Other.xlsx"),
 * links.mode ("s2.o1|Manual"), and modal.close (free) for Close.
 */
import { useEffect, useState } from "react";
import type { PptDeck, SimCommit } from "@/types/sim";
import { customShows, deckLinks, linkSources } from "./model";

type Commit = (c: SimCommit) => void;

function Shell({ title, width, onClose, children, footer }: { title: string; width: number; onClose: () => void; children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10" onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Escape") onClose(); }} onMouseDown={(e) => e.stopPropagation()}>
      <div role="dialog" aria-modal="true" aria-label={title} className="flex max-h-[92%] flex-col border border-gray-400 bg-[#f0f0f0] text-[12px] text-gray-900 shadow-2xl" style={{ width }}>
        <div className="flex items-center justify-between bg-white px-3 py-1.5">
          <span>{title}</span>
          <div className="flex items-center gap-1">
            <span className="px-1 text-gray-500">?</span>
            <button type="button" aria-label="Close" onClick={onClose} className="px-2 hover:bg-red-600 hover:text-white">✕</button>
          </div>
        </div>
        <div className="overflow-auto bg-white p-4">{children}</div>
        <div className="flex justify-end gap-2 border-t border-gray-300 px-3 py-2">{footer}</div>
      </div>
    </div>
  );
}

const btn = "min-w-[80px] border border-gray-400 bg-[#e1e1e1] px-3 py-1 hover:bg-[#e5f1fb] disabled:opacity-40";
const primary = "min-w-[80px] border border-[#0078d4] bg-[#e5f1fb] px-3 py-1 hover:bg-[#cce4f7] disabled:opacity-40";

function ListBox({ label, items, value, onPick, height = 150, onDoubleClick }: { label: string; items: { key: string; text: string; dim?: boolean }[]; value: string; onPick: (k: string) => void; height?: number; onDoubleClick?: (k: string) => void }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <span>{label}</span>
      <div role="listbox" aria-label={label} className="overflow-auto border border-gray-400 bg-white" style={{ height }}>
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            role="option"
            aria-selected={value === it.key}
            onClick={() => onPick(it.key)}
            onDoubleClick={() => onDoubleClick?.(it.key)}
            className={`block w-full truncate px-2 py-0.5 text-left ${value === it.key ? "bg-[#0078d4] text-white" : it.dim ? "text-gray-500 hover:bg-[#e5f1fb]" : "hover:bg-[#e5f1fb]"}`}
          >
            {it.text}
          </button>
        ))}
        {!items.length && <p className="px-2 py-1 text-gray-400">(none)</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Custom Shows                                                        */
/* ------------------------------------------------------------------ */

function DefineShow({ deck, initial, onOk, onCancel }: { deck: PptDeck; initial: { name: string; slides: string[] }; onOk: (name: string, slides: string[]) => void; onCancel: () => void }) {
  const [name, setName] = useState(initial.name);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [inShow, setInShow] = useState<string[]>(initial.slides);
  const [pick, setPick] = useState<number>(-1);
  const label = (id: string) => {
    const i = deck.slides.findIndex((s) => s.id === id);
    const s = deck.slides[i];
    if (!s) return id;
    return `${s.hidden ? `(${i + 1})` : `${i + 1}.`} ${s.title || "(untitled)"}`;
  };
  const add = () => {
    const ids = deck.slides.filter((s) => checked.has(s.id)).map((s) => s.id);
    if (!ids.length) return;
    setInShow((l) => [...l, ...ids]);
    setChecked(new Set());
  };
  const move = (d: -1 | 1) => {
    if (pick < 0) return;
    const j = pick + d;
    if (j < 0 || j >= inShow.length) return;
    const next = inShow.slice();
    [next[pick], next[j]] = [next[j], next[pick]];
    setInShow(next);
    setPick(j);
  };
  const remove = () => {
    if (pick < 0) return;
    setInShow((l) => l.filter((_, k) => k !== pick));
    setPick(-1);
  };
  return (
    <Shell
      title="Define Custom Show"
      width={560}
      onClose={onCancel}
      footer={
        <>
          <button type="button" className={primary} disabled={!inShow.length || !name.trim()} onClick={() => onOk(name.trim(), inShow)}>OK</button>
          <button type="button" className={btn} onClick={onCancel}>Cancel</button>
        </>
      }
    >
      <label className="mb-3 flex items-center gap-2">
        <span>Slide show name:</span>
        <input aria-label="Slide show name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="w-64 rounded-sm border border-gray-400 px-1 py-0.5" />
      </label>
      <div className="flex items-stretch gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span>Slides in presentation:</span>
          <div role="group" aria-label="Slides in presentation" className="h-48 overflow-auto border border-gray-400 bg-white py-0.5">
            {deck.slides.map((s) => (
              <label key={s.id} className={`flex items-center gap-2 px-2 py-0.5 hover:bg-[#e5f1fb] ${s.hidden ? "text-gray-500" : ""}`}>
                <input type="checkbox" checked={checked.has(s.id)} onChange={(e) => setChecked((c) => { const n = new Set(c); if (e.target.checked) n.add(s.id); else n.delete(s.id); return n; })} />
                <span className="truncate">{label(s.id)}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <button type="button" className={btn} onClick={add} disabled={!checked.size}>Add »</button>
        </div>
        <div className="flex min-w-0 flex-1 gap-1">
          <ListBox label="Slides in custom show:" items={inShow.map((id, k) => ({ key: String(k), text: `${k + 1}. ${label(id).replace(/^\(?\d+\)?\.?\s/, "")}` }))} value={String(pick)} onPick={(k) => setPick(Number(k))} height={192} />
          <div className="flex flex-col justify-center gap-1 pt-4">
            <button type="button" aria-label="Move up" title="Up" className="border border-gray-400 bg-[#e1e1e1] px-2 py-0.5 hover:bg-[#e5f1fb] disabled:opacity-40" disabled={pick <= 0} onClick={() => move(-1)}>↑</button>
            <button type="button" aria-label="Remove" title="Remove" className="border border-gray-400 bg-[#e1e1e1] px-2 py-0.5 hover:bg-[#e5f1fb] disabled:opacity-40" disabled={pick < 0} onClick={remove}>✕</button>
            <button type="button" aria-label="Move down" title="Down" className="border border-gray-400 bg-[#e1e1e1] px-2 py-0.5 hover:bg-[#e5f1fb] disabled:opacity-40" disabled={pick < 0 || pick >= inShow.length - 1} onClick={() => move(1)}>↓</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function CustomShowsDialog({ deck, onCommit }: { deck: PptDeck; onCommit: Commit }) {
  const shows = customShows(deck);
  const focusFlag = String(deck.flags?.customShowFocus ?? "");
  const [focus, setFocus] = useState(focusFlag || shows[0]?.name || "");
  const [define, setDefine] = useState<{ name: string; slides: string[]; original: string } | null>(null);
  useEffect(() => { if (focusFlag) setFocus(focusFlag); }, [focusFlag]);
  const cur = shows.find((s) => s.name === focus) ?? shows[0];
  const close = () => onCommit({ kind: "command", id: "modal.close" });

  if (define) {
    return (
      <DefineShow
        deck={deck}
        initial={define}
        onCancel={() => setDefine(null)}
        onOk={(name, slides) => {
          setDefine(null);
          setFocus(name);
          onCommit({ kind: "dialog", id: "defineCustomShow", values: { name, slides: slides.join(","), original: define.original } });
        }}
      />
    );
  }

  const nextName = () => {
    let n = 1;
    while (shows.some((s) => s.name === `Custom Show ${n}`)) n++;
    return `Custom Show ${n}`;
  };
  return (
    <Shell
      title="Custom Shows"
      width={420}
      onClose={close}
      footer={
        <>
          <button type="button" className={primary} disabled={!cur} onClick={() => cur && onCommit({ kind: "command", id: "slideshow.customShow", value: cur.name })}>Show</button>
          <button type="button" className={btn} onClick={close}>Close</button>
        </>
      }
    >
      <div className="flex gap-3">
        <ListBox
          label="Custom shows:"
          items={shows.map((s) => ({ key: s.name, text: s.name }))}
          value={cur?.name ?? ""}
          onPick={setFocus}
          onDoubleClick={(k) => { const s = shows.find((x) => x.name === k); if (s) setDefine({ name: s.name, slides: s.slides.slice(), original: s.name }); }}
          height={170}
        />
        <div className="flex flex-col gap-1.5 pt-5">
          <button type="button" className={btn} onClick={() => setDefine({ name: nextName(), slides: [], original: "" })}>New...</button>
          <button type="button" className={btn} disabled={!cur} onClick={() => cur && setDefine({ name: cur.name, slides: cur.slides.slice(), original: cur.name })}>Edit...</button>
          <button type="button" className={btn} disabled={!cur} onClick={() => cur && onCommit({ kind: "command", id: "customShow.remove", value: cur.name })}>Remove</button>
          <button type="button" className={btn} disabled={!cur} onClick={() => cur && onCommit({ kind: "command", id: "customShow.copy", value: cur.name })}>Copy</button>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Links (Edit Links to Files)                                         */
/* ------------------------------------------------------------------ */

export function LinksDialog({ deck, onCommit }: { deck: PptDeck; onCommit: Commit }) {
  const links = deckLinks(deck);
  const focusFlag = String(deck.flags?.linkFocus ?? "");
  const [focus, setFocus] = useState(focusFlag || links[0]?.key || "");
  const [changing, setChanging] = useState<string | null>(null);
  useEffect(() => { if (focusFlag) setFocus(focusFlag); }, [focusFlag]);
  const cur = links.find((l) => l.key === focus) ?? links[0];
  const close = () => onCommit({ kind: "command", id: "modal.close" });
  const cmd = (id: string, value: string) => onCommit({ kind: "command", id, value });

  if (changing !== null && cur) {
    const files = Array.from(new Set([cur.link.file, ...Object.keys(linkSources(deck))]));
    return (
      <Shell
        title="Change Source"
        width={420}
        onClose={() => setChanging(null)}
        footer={
          <>
            <button type="button" className={primary} disabled={!changing} onClick={() => { cmd("links.changeSource", `${cur.key}|${changing}`); setChanging(null); }}>Open</button>
            <button type="button" className={btn} onClick={() => setChanging(null)}>Cancel</button>
          </>
        }
      >
        <p className="mb-2 text-gray-600">{cur.link.path ?? "This PC › Documents"}</p>
        <ListBox label="File name:" items={files.map((f) => ({ key: f, text: f }))} value={changing} onPick={setChanging} height={130} />
      </Shell>
    );
  }

  return (
    <Shell title="Links" width={560} onClose={close} footer={<button type="button" className={btn} onClick={close}>Close</button>}>
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[1fr_70px_60px] border border-b-0 border-gray-400 bg-gray-100 px-2 py-0.5 text-gray-600"><span>Links:</span><span>Type</span><span>Update</span></div>
          <div role="listbox" aria-label="Links" className="h-36 overflow-auto border border-gray-400 bg-white">
            {links.map((l) => (
              <button key={l.key} type="button" role="option" aria-selected={cur?.key === l.key} onClick={() => setFocus(l.key)} className={`grid w-full grid-cols-[1fr_70px_60px] px-2 py-0.5 text-left ${cur?.key === l.key ? "bg-[#0078d4] text-white" : "hover:bg-[#e5f1fb]"}`}>
                <span className="truncate">{l.link.file}{l.link.item ? `!${l.link.item}` : ""}</span>
                <span>{l.link.type === "Worksheet" ? "Worksheet" : "Chart"}</span>
                <span>{l.link.mode === "Manual" ? "Manual" : "Auto"}</span>
              </button>
            ))}
            {!links.length && <p className="px-2 py-1 text-gray-400">This presentation has no links to other files.</p>}
          </div>
          {cur && (
            <div className="mt-3 space-y-1.5">
              <p className="truncate">Source: {cur.link.path ? `${cur.link.path} › ` : ""}{cur.link.file}{cur.link.item ? `!${cur.link.item}` : ""}</p>
              <p>Type: Microsoft Excel {cur.link.type === "Worksheet" ? "Worksheet" : "Chart"}</p>
              <fieldset className="flex items-center gap-4">
                <legend className="float-left mr-2">Update:</legend>
                {(["Automatic", "Manual"] as const).map((m) => (
                  <label key={m} className="flex items-center gap-1">
                    <input type="radio" name="link-update" checked={(cur.link.mode ?? "Automatic") === m} onChange={() => cmd("links.mode", `${cur.key}|${m}`)} />
                    {m}
                  </label>
                ))}
              </fieldset>
              {cur.link.updated && <p className="text-emerald-700">Updated from the source file.</p>}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5 pt-5">
          <button type="button" className={btn} disabled={!cur} onClick={() => cur && cmd("links.update", cur.key)}>Update Now</button>
          <button type="button" className={btn} disabled={!cur} onClick={() => cur && cmd("links.openSource", cur.key)}>Open Source</button>
          <button type="button" className={btn} disabled={!cur} onClick={() => cur && setChanging(cur.link.file)}>Change Source...</button>
          <button type="button" className={btn} disabled={!cur} onClick={() => cur && cmd("links.break", cur.key)}>Break Link</button>
        </div>
      </div>
    </Shell>
  );
}
