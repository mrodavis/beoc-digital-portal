"use client";

import { useEffect, useRef, useState } from "react";
import { AppLogo, GIcon } from "./icons";
import { BUILDING_BLOCKS } from "./menus";
import { meOf, personOf, TODAY_SHORT } from "./model";
import type { GChip } from "./types";
import { Avatar, TEXT_FONT, useG } from "./ui";

const DATES: { label: string; value: string }[] = [
  { label: "Today", value: TODAY_SHORT },
  { label: "Tomorrow", value: "Oct 21, 2026" },
  { label: "Yesterday", value: "Oct 19, 2026" },
];

/**
 * The @ menu (type @ in a document) and Insert › Smart chips: people, files,
 * dates, and building blocks. Picking one commits the g.chip dialog (or g.block).
 */
export function ChipPicker({ tab, onClose }: { tab: "all" | "person" | "file" | "date"; onClose: () => void }) {
  const g = useG();
  const { doc } = g;
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const me = meOf(doc);
  const qq = q.trim().toLowerCase();
  const people = [me, ...(doc.people ?? [])].filter((p) => !qq || p.name.toLowerCase().includes(qq) || p.email.toLowerCase().includes(qq));
  const files = doc.files.filter((f) => !f.trashed && ["doc", "sheet", "slides", "pdf", "word", "excel", "powerpoint"].includes(f.kind) && f.id !== doc.open && (!qq || f.name.toLowerCase().includes(qq)));
  const dates = DATES.filter((d) => !qq || d.label.toLowerCase().includes(qq) || d.value.toLowerCase().includes(qq));
  const blocks = BUILDING_BLOCKS.filter((b) => !qq || b.toLowerCase().includes(qq));
  const pick = (kind: GChip["kind"], value: string) => {
    onClose();
    g.onCommit({ kind: "dialog", id: "g.chip", values: { kind, value } });
  };
  const show = (k: string) => tab === "all" || tab === k;
  const head = (t: string) => <div className="px-4 pb-1 pt-2 text-[12px] font-medium text-[#5f6368]">{t}</div>;
  const row = (key: string, icon: React.ReactNode, label: string, sub: string | undefined, onClick: () => void) => (
    <button key={key} type="button" role="option" aria-selected={false} aria-label={label} onClick={onClick} className="flex w-full items-center gap-3 px-4 py-1.5 text-left text-[14px] hover:bg-[#f1f3f4]">
      <span className="flex w-6 shrink-0 justify-center">{icon}</span>
      <span className="min-w-0 flex-1"><span className="block truncate">{label}</span>{sub && <span className="block truncate text-[12px] text-[#5f6368]">{sub}</span>}</span>
    </button>
  );
  return (
    <div className="absolute inset-0 z-[120]" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label="Smart chips" className="absolute left-1/2 top-24 w-[380px] -translate-x-1/2 overflow-hidden rounded-lg bg-white py-2 shadow-[0_2px_6px_2px_rgba(60,64,67,.15),0_1px_2px_rgba(60,64,67,.3)]" style={{ fontFamily: TEXT_FONT }}>
        <div className="mx-3 mb-1 flex items-center gap-2 rounded border-2 border-[#0b57d0] px-2">
          <span className="text-[16px] text-[#0b57d0]">@</span>
          <input ref={ref} aria-label="Search people, files, dates" placeholder={tab === "person" ? "Search people" : tab === "file" ? "Search files" : tab === "date" ? "Search dates" : "Search people, files, dates, and more"} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Escape") onClose(); }} className="h-9 min-w-0 flex-1 text-[14px] outline-none" />
        </div>
        <div className="max-h-[340px] overflow-auto" role="listbox" aria-label="Suggestions">
          {show("person") && people.length > 0 && (
            <>
              {head("People")}
              {people.slice(0, 6).map((p) => row(p.email, <Avatar person={p} size={22} />, p.name, p.email, () => pick("person", p.email)))}
            </>
          )}
          {show("file") && files.length > 0 && (
            <>
              {head("Files")}
              {files.slice(0, 6).map((f) => row(f.id, <AppLogo kind={f.kind} size={20} />, f.name, undefined, () => pick("file", f.id)))}
            </>
          )}
          {show("date") && dates.length > 0 && (
            <>
              {head("Dates")}
              {dates.map((d) => row(d.label, <GIcon name="calendar" size={20} />, d.label, d.value, () => pick("date", d.value)))}
            </>
          )}
          {tab === "all" && blocks.length > 0 && (
            <>
              {head("Building blocks")}
              {blocks.map((b) => row(b, <GIcon name="blocks" size={20} />, b, undefined, () => { onClose(); g.cmd("g.block", b); }))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** A smart chip as it appears in the document. */
export function ChipView({ chip, selected, z = 1 }: { chip: GChip; selected?: boolean; z?: number }) {
  const g = useG();
  const p = chip.kind === "person" ? personOf(g.doc, chip.ref ?? chip.label) : undefined;
  const f = chip.kind === "file" ? g.doc.files.find((x) => x.id === chip.ref) : undefined;
  return (
    <span
      className="mx-[1px] inline-flex items-center gap-1 rounded-full align-baseline"
      style={{ background: selected ? "#c2e7ff" : "#e8eaed", padding: `0 ${6 * z}px 0 ${2 * z}px`, fontSize: "0.92em", lineHeight: 1.5 }}
      title={chip.kind === "person" ? `${chip.label}${p ? ` · ${p.email}` : ""}` : chip.label}
    >
      {chip.kind === "person" ? (
        <Avatar person={p ?? { name: chip.label }} size={Math.round(16 * z)} />
      ) : chip.kind === "file" ? (
        <AppLogo kind={f?.kind ?? "doc"} size={Math.round(16 * z)} />
      ) : (
        <GIcon name="calendar" size={Math.round(15 * z)} color="#444746" />
      )}
      {chip.label}
    </span>
  );
}
