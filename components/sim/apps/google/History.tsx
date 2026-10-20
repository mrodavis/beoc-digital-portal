"use client";

import { useRef, useState } from "react";
import type { ExcelBook, PptDeck, WordDoc } from "@/types/sim";
import { SlideView } from "../powerpoint/PptSlide";
import { GIcon } from "./icons";
import { contentOf, meOf, openFile, personOf, TODAY } from "./model";
import type { GContent } from "./types";
import { DocPages } from "./Docs";
import { SheetGrid } from "./Sheets";
import { renderDeck } from "./Slides";
import { Avatar, FONT, IconBtn, MenuList, PillBtn, Popup, TEXT_FONT, useG, useWidth, type MenuPos } from "./ui";

/** File › Version history › See version history. */
export function VersionHistory() {
  const g = useG();
  const { doc, ui } = g;
  const f = openFile(doc)!;
  const me = meOf(doc);
  const [named, setNamed] = useState(false);
  const [menu, setMenu] = useState<{ id: string; pos: MenuPos } | null>(null);
  const [naming, setNaming] = useState<{ id: string; text: string } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pw = useWidth(previewRef, 700);
  const sel = ui.selection.startsWith("ver:") ? ui.selection.slice(4) : "current";
  const cur = f.current ?? {};
  const entries = [
    { id: "current", time: cur.time ?? f.modified ?? TODAY, author: cur.author ?? me.name, name: cur.name, content: contentOf(f), current: true },
    ...(f.versions ?? []).map((v) => ({ ...v, current: false })),
  ].filter((e) => !named || e.name);
  const shown = entries.find((e) => e.id === sel) ?? entries[0] ?? { id: "current", time: "", author: me.name, content: contentOf(f), current: true };
  const content: GContent = shown.content;

  const preview = () => {
    if (f.kind === "doc") return <div className="py-4"><DocPages w={content as WordDoc} zoom={Math.min(1, (pw - 48) / 816)} /></div>;
    if (f.kind === "sheet") {
      const b = content as ExcelBook;
      const sh = b.sheets.find((s) => s.name === b.active) ?? b.sheets[0];
      return <div className="bg-white"><SheetGrid book={b} sheet={sh} file={f} /></div>;
    }
    const d = renderDeck(content as PptDeck);
    return (
      <div className="space-y-4 p-6">
        {d.slides.map((s, i) => <div key={s.id} className="mx-auto w-fit shadow"><SlideView deck={d} slide={s} width={Math.min(560, pw - 80)} index={i} /></div>)}
      </div>
    );
  };

  return (
    <div className="absolute inset-0 z-[90] flex flex-col bg-[#f9fbfd]" style={{ fontFamily: TEXT_FONT }} role="dialog" aria-label="Version history">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-[#dadce0] bg-white px-3">
        <IconBtn icon="back" label="Back" onClick={() => g.cmd("g.versions.close")} />
        <span className="text-[18px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>{shown.current ? "Current version" : shown.time}</span>
        <span className="flex-1" />
        {!shown.current && <PillBtn onClick={() => g.cmd("g.version.restore", shown.id)}>Restore this version</PillBtn>}
      </div>
      <div className="flex min-h-0 flex-1">
        <div ref={previewRef} className="min-w-0 flex-1 overflow-auto" aria-label="Version preview">{preview()}</div>
        <aside className="flex w-[300px] shrink-0 flex-col border-l border-[#dadce0] bg-white" aria-label="Version history list">
          <div className="px-4 pb-2 pt-4">
            <h2 className="mb-2 text-[18px]" style={{ fontFamily: FONT }}>Version history</h2>
            <select aria-label="Which versions" value={named ? "Named versions" : "All versions"} onChange={(e) => setNamed(e.target.value === "Named versions")} className="h-9 w-full rounded border border-[#747775] px-2 text-[14px]">
              <option>All versions</option>
              <option>Named versions</option>
            </select>
          </div>
          <div className="min-h-0 flex-1 overflow-auto py-1">
            {entries.length === 0 && <p className="px-4 py-6 text-center text-[13px] text-[#5f6368]">No named versions yet.</p>}
            {entries.map((e) => {
              const on = e.id === shown.id;
              const person = personOf(doc, e.author) ?? { name: e.author };
              return (
                <div key={e.id} role="option" aria-selected={on} aria-label={e.name ?? e.time} onClick={() => g.onSelect({ selection: `ver:${e.id}` })} className={`group relative cursor-default border-l-4 px-4 py-2.5 ${on ? "border-[#0b57d0] bg-[#e8f0fe]" : "border-transparent hover:bg-[#f1f3f4]"}`}>
                  {naming?.id === e.id ? (
                    <input
                      autoFocus
                      aria-label="Version name"
                      value={naming.text}
                      onClick={(ev) => ev.stopPropagation()}
                      onChange={(ev) => setNaming({ ...naming, text: ev.target.value })}
                      onKeyDown={(ev) => { ev.stopPropagation(); if (ev.key === "Enter") { g.onSelect({ selection: `ver:${e.id}` }); g.onCommit({ kind: "type", target: `vername:${e.id}`, value: naming.text }); setNaming(null); } if (ev.key === "Escape") setNaming(null); }}
                      onBlur={() => setNaming(null)}
                      className="mb-1 h-8 w-full rounded border-2 border-[#0b57d0] px-2 text-[14px] outline-none"
                    />
                  ) : (
                    <div className="text-[14px] font-medium text-[#1f1f1f]">{e.name ?? e.time}</div>
                  )}
                  {e.name && <div className="text-[12px] text-[#444746]">{e.time}</div>}
                  {e.current && <div className="text-[12px] italic text-[#444746]">Current version</div>}
                  <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-[#444746]"><Avatar person={person} size={10} />{person.name}</div>
                  <button type="button" aria-label={`More actions for ${e.name ?? e.time}`} onClick={(ev) => { ev.stopPropagation(); g.onSelect({ selection: `ver:${e.id}` }); const r = ev.currentTarget.getBoundingClientRect(); setMenu({ id: e.id, pos: { x: r.left - 180, y: r.bottom } }); }} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5">
                    <GIcon name="more" size={18} />
                  </button>
                </div>
              );
            })}
          </div>
          <label className="flex items-center gap-2 border-t border-[#dadce0] px-4 py-3 text-[13px]">
            <input type="checkbox" defaultChecked className="accent-[#0b57d0]" aria-label="Show changes" /> Show changes
          </label>
        </aside>
      </div>
      {menu && (
        <Popup onClose={() => setMenu(null)}>
          <MenuList
            pos={menu.pos}
            width={220}
            entries={[{ label: "Name this version", icon: "edit", value: "name" }, ...(menu.id !== "current" ? [{ label: "Restore this version", icon: "restore", value: "restore" }] : []), { label: "Make a copy", icon: "copy", value: "copy" }]}
            onPick={(i) => {
              setMenu(null);
              const e = entries.find((x) => x.id === menu.id);
              if (i.value === "name") setNaming({ id: menu.id, text: e?.name ?? "" });
              else if (i.value === "restore") g.cmd("g.version.restore", menu.id);
              else g.dialog("g.makeCopy");
            }}
            onClose={() => setMenu(null)}
          />
        </Popup>
      )}
    </div>
  );
}
