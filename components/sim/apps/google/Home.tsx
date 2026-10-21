"use client";

import { useState } from "react";
import { AppLogo, GIcon } from "./icons";
import { meOf, personOf } from "./model";
import { templatesFor } from "./templates";
import type { GFile, GHomeApp } from "./types";
import { AccountButton, AppsButton, FONT, IconBtn, TEXT_FONT, useG } from "./ui";

const NAMES: Record<GHomeApp, { app: string; noun: string; plural: string; kinds: string[]; logo: string }> = {
  docs: { app: "Docs", noun: "document", plural: "documents", kinds: ["doc", "word"], logo: "doc" },
  sheets: { app: "Sheets", noun: "spreadsheet", plural: "spreadsheets", kinds: ["sheet", "excel"], logo: "sheet" },
  slides: { app: "Slides", noun: "presentation", plural: "presentations", kinds: ["slides", "powerpoint"], logo: "slides" },
};

/** A thumbnail for the template strip: a page with a few lines in the template's style. */
function Thumb({ app, name }: { app: GHomeApp; name: string }) {
  if (app === "sheets") {
    return (
      <div className="h-full w-full bg-white p-2">
        <div className="grid h-full grid-cols-4 grid-rows-6 gap-px bg-[#e0e0e0]">
          {Array.from({ length: 24 }, (_, i) => <span key={i} className={i < 4 ? "bg-[#cfe2f3]" : "bg-white"} />)}
        </div>
      </div>
    );
  }
  if (app === "slides") {
    return (
      <div className={`flex h-full w-full flex-col justify-center p-3 ${name === "Portfolio" ? "bg-[#212121] text-white" : "bg-white text-[#1c4587]"}`}>
        <div className="text-[13px] font-bold">{name === "Pitch" ? "Your big idea" : name}</div>
        <div className="mt-1 h-1 w-10 bg-[#3c78d8]" />
      </div>
    );
  }
  return (
    <div className="h-full w-full bg-white p-3">
      <div className="mb-2 h-2 w-2/3 rounded bg-[#4285f4]/70" />
      {Array.from({ length: 6 }, (_, i) => <div key={i} className="mb-1.5 h-1 rounded bg-[#dadce0]" style={{ width: `${90 - ((i * 13) % 35)}%` }} />)}
    </div>
  );
}

/** docs.google.com, sheets.google.com, slides.google.com: Start a new …, the template strip, and recent files. */
export function HomeScreen() {
  const g = useG();
  const { doc } = g;
  const app = doc.homeApp ?? "docs";
  const n = NAMES[app];
  const me = meOf(doc);
  const [gallery, setGallery] = useState(false);
  const [q, setQ] = useState("");
  const [owner, setOwner] = useState<"Owned by anyone" | "Owned by me" | "Not owned by me">("Owned by anyone");
  const templates = templatesFor(app);
  const mine = (f: GFile) => !f.owner || f.owner === me.email;
  const files = doc.files
    .filter((f) => !f.trashed && n.kinds.includes(f.kind))
    .filter((f) => (owner === "Owned by me" ? mine(f) : owner === "Not owned by me" ? !mine(f) : true))
    .filter((f) => !q.trim() || f.name.toLowerCase().includes(q.trim().toLowerCase()));
  const blank = `Google ${n.app}`;
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white" style={{ fontFamily: TEXT_FONT }}>
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center gap-2 px-4">
        <IconBtn icon="menu" label="Main menu" onClick={() => g.cmd("g.toast", "The main menu links to Docs, Sheets, Slides, Forms, and Drive")} />
        <span className="flex items-center gap-2 pr-6">
          <AppLogo kind={n.logo} size={36} />
          <span className="text-[22px] text-[#444746]" style={{ fontFamily: FONT }}>{n.app}</span>
        </span>
        <div className="mx-auto flex h-12 w-full max-w-[720px] items-center gap-2 rounded-full bg-[#e9eef6] px-4 focus-within:bg-white focus-within:shadow">
          <GIcon name="search" size={22} />
          <input aria-label="Search" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none" />
        </div>
        <AppsButton />
        <AccountButton />
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        {/* Start a new … */}
        <section className="bg-[#f1f3f4] pb-5 pt-3" aria-label={`Start a new ${n.noun}`}>
          <div className="mx-auto max-w-[920px] px-6">
            <div className="mb-3 flex items-center">
              <h2 className="flex-1 text-[16px] text-[#202124]">Start a new {n.noun}</h2>
              <button type="button" aria-label="Template gallery" onClick={() => setGallery((x) => !x)} className="flex items-center gap-1 rounded px-3 py-1.5 text-[14px] text-[#202124] hover:bg-black/5">
                Template gallery <GIcon name={gallery ? "collapse" : "expand"} size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-5">
              <div className="w-[144px]">
                <button type="button" aria-label={`Blank ${n.noun}`} onClick={() => g.cmd("g.new", blank)} className="flex h-[186px] w-[144px] items-center justify-center rounded border border-[#dadce0] bg-white hover:border-[#4285f4]">
                  <GIcon name="plus" size={56} color="#4285f4" />
                </button>
                <div className="mt-2 text-[14px] font-medium text-[#202124]">Blank {n.noun}</div>
              </div>
              {(gallery ? templates : templates.slice(0, 4)).map((t) => (
                <div key={t.name} className="w-[144px]">
                  <button type="button" aria-label={`Template: ${t.name}`} onClick={() => g.cmd("g.template", t.name)} className="block h-[186px] w-[144px] overflow-hidden rounded border border-[#dadce0] bg-white hover:border-[#4285f4]">
                    <Thumb app={app} name={t.name} />
                  </button>
                  <div className="mt-2 truncate text-[14px] font-medium text-[#202124]">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent */}
        <section className="mx-auto max-w-[920px] px-6 py-4" aria-label={`Recent ${n.plural}`}>
          <div className="mb-2 flex items-center gap-3">
            <h2 className="flex-1 text-[16px] font-medium text-[#202124]">Recent {n.plural}</h2>
            <select aria-label="Owner filter" value={owner} onChange={(e) => setOwner(e.target.value as typeof owner)} className="h-8 rounded bg-transparent px-2 text-[14px] text-[#202124] hover:bg-[#f1f3f4]">
              {["Owned by anyone", "Owned by me", "Not owned by me"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          {files.length === 0 ? (
            <p className="py-10 text-center text-[14px] text-[#5f6368]">No {n.plural} yet. Start a new one above.</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {files.map((f) => (
                <button key={f.id} type="button" aria-label={f.name} onClick={() => g.cmd("g.open", f.id)} className="overflow-hidden rounded border border-[#dadce0] text-left hover:border-[#4285f4]">
                  <div className="h-[150px] border-b border-[#dadce0] bg-[#f8f9fa]"><Thumb app={app} name={f.name} /></div>
                  <div className="p-3">
                    <div className="truncate text-[14px] font-medium text-[#202124]">{f.name}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[#5f6368]">
                      <AppLogo kind={f.kind === "word" ? "word" : f.kind === "excel" ? "excel" : f.kind === "powerpoint" ? "powerpoint" : n.logo} size={16} />
                      <span className="truncate">{mine(f) ? "Opened" : `Owner: ${personOf(doc, f.owner)?.name ?? f.owner}`} · {f.modified ?? "Oct 1, 2026"}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
