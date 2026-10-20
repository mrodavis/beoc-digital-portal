"use client";

import { useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { BackstageSpec } from "../types";
import { Icon } from "./icons";

type Page = "home" | "new" | "open" | "info" | "saveAs" | "print" | "share" | "export" | "account" | "options";

const NAV: { id: Page | "save" | "close"; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "new", label: "New", icon: "new" },
  { id: "open", label: "Open", icon: "open" },
  { id: "info", label: "Info", icon: "info" },
  { id: "save", label: "Save", icon: "save" },
  { id: "saveAs", label: "Save As", icon: "folder" },
  { id: "print", label: "Print", icon: "print" },
  { id: "share", label: "Share", icon: "share" },
  { id: "export", label: "Export", icon: "export" },
  { id: "close", label: "Close", icon: "close" },
];

export function Backstage({
  app,
  accent,
  spec,
  fileName,
  saved,
  startPage = "home",
  onCommit,
  onClose,
}: {
  app: string;
  accent: string;
  spec: BackstageSpec;
  fileName: string;
  saved?: { name?: string; location?: string; format?: string };
  startPage?: string;
  onCommit: (c: SimCommit) => void;
  onClose: () => void;
}) {
  const [page, setPage] = useState<Page>((startPage as Page) ?? "home");
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const [location, setLocation] = useState<string>(saved?.location ?? "");
  const [name, setName] = useState(baseName);
  const [format, setFormat] = useState(spec.formats[0]);
  const [print, setPrint] = useState<Record<string, SimValue>>({
    copies: 1,
    printer: "BEOC-Lab-Printer on 14BP",
    range: app === "PowerPoint" ? "Print All Slides" : app === "Excel" ? "Print Active Sheets" : "Print All Pages",
    pages: "",
    sides: "Print One Sided",
    collate: "Collated",
    orientation: "Portrait Orientation",
    paper: "Letter",
    margins: "Normal Margins",
    perSheet: "1 Page Per Sheet",
  });
  const [share, setShare] = useState<Record<string, SimValue>>({ email: "", permission: "Can edit", message: "" });
  const [protectOpen, setProtectOpen] = useState(false);
  const [inspectOpen, setInspectOpen] = useState(false);

  const commit = (c: SimCommit) => onCommit(c);
  const noun = app === "Word" ? "Document" : app === "Excel" ? "Workbook" : "Presentation";

  const nav = (id: (typeof NAV)[number]["id"]) => {
    if (id === "save") {
      if (!saved?.location) setPage("saveAs");
      else commit({ kind: "command", id: "file.save" });
      return;
    }
    if (id === "close") {
      commit({ kind: "command", id: "file.close" });
      return;
    }
    setPage(id);
  };

  const sel = (k: string, v: SimValue) => setPrint((p) => ({ ...p, [k]: v }));

  return (
    <div className="absolute inset-0 z-40 flex bg-white text-[13px] text-gray-900">
      <nav className="flex w-44 shrink-0 flex-col text-white" style={{ background: accent }}>
        <button type="button" onClick={onClose} aria-label="Back to document" className="m-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        </button>
        {NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => nav(n.id)}
            className={`px-5 py-2 text-left text-[13px] hover:bg-white/15 ${page === n.id ? "bg-white/25 font-semibold" : ""}`}
          >
            {n.label}
          </button>
        ))}
        <div className="flex-1" />
        <button type="button" onClick={() => setPage("account")} className={`px-5 py-2 text-left hover:bg-white/15 ${page === "account" ? "bg-white/25" : ""}`}>Account</button>
        <button type="button" onClick={() => setPage("options")} className={`mb-3 px-5 py-2 text-left hover:bg-white/15 ${page === "options" ? "bg-white/25" : ""}`}>Options</button>
      </nav>

      <div className="flex-1 overflow-auto px-8 py-6">
        {(page === "home" || page === "new") && (
          <section>
            <h2 className="mb-4 text-2xl font-light">{page === "home" ? "Good morning" : "New"}</h2>
            <div className="flex flex-wrap gap-4">
              {spec.templates.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => commit({ kind: "command", id: "file.new", value: t.name })}
                  className="flex w-32 flex-col items-center gap-2 text-center text-[12px] hover:text-[#0078d4]"
                >
                  <span className="flex h-36 w-28 items-end justify-center border border-gray-300 bg-white p-2 shadow-sm hover:border-[#0078d4]" style={t.color ? { background: `linear-gradient(${t.color} 0 38%, #fff 38%)` } : undefined}>
                    {!t.color && <span className="text-[10px] text-gray-400">&nbsp;</span>}
                  </span>
                  {t.name}
                </button>
              ))}
            </div>
            {page === "home" && (
              <>
                <h3 className="mb-2 mt-8 text-[14px] font-semibold">Recent</h3>
                <RecentList spec={spec} onOpen={(n) => commit({ kind: "command", id: "file.open", value: n })} />
              </>
            )}
          </section>
        )}

        {page === "open" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Open</h2>
            <div className="flex gap-8">
              <div className="flex w-48 flex-col gap-1">
                {["Recent", "Shared with Me", "OneDrive - Personal", "This PC", "Browse"].map((l) => (
                  <button key={l} type="button" onClick={() => l === "Browse" && commit({ kind: "command", id: "file.browse" })} className="flex items-center gap-2 px-2 py-1.5 text-left hover:bg-gray-100">
                    <Icon name={l.includes("OneDrive") ? "cloud" : l === "This PC" ? "pc" : l === "Browse" ? "folder" : "history"} size={20} />
                    {l}
                  </button>
                ))}
              </div>
              <div className="flex-1">
                <RecentList spec={spec} onOpen={(n) => commit({ kind: "command", id: "file.open", value: n })} />
              </div>
            </div>
          </section>
        )}

        {page === "info" && (
          <section>
            <h2 className="mb-1 text-2xl font-light">Info</h2>
            <p className="mb-6 text-gray-600">{fileName}{saved?.location ? ` · ${saved.location}` : ""}</p>
            <div className="flex gap-10">
              <div className="flex max-w-xl flex-1 flex-col gap-4">
                <InfoRow
                  icon="protect"
                  title={`Protect ${noun}`}
                  text={`Control what types of changes people can make to this ${noun.toLowerCase()}.`}
                  onClick={() => setProtectOpen((o) => !o)}
                  open={protectOpen}
                  options={
                    app === "Excel"
                      ? ["Always Open Read-Only", "Encrypt with Password", "Protect Current Sheet", "Protect Workbook Structure", "Mark as Final"]
                      : ["Always Open Read-Only", "Encrypt with Password", "Restrict Editing", "Mark as Final"]
                  }
                  onPick={(v) => commit({ kind: "command", id: "file.protect", value: v })}
                />
                <InfoRow
                  icon="checkIssues"
                  title={`Inspect ${noun}`}
                  text="Before publishing this file, be aware that it contains document properties, author's name, and comments."
                  onClick={() => setInspectOpen((o) => !o)}
                  open={inspectOpen}
                  options={[`Inspect ${app === "Word" ? "Document" : noun}`, "Check Accessibility", "Check Compatibility"]}
                  onPick={(v) => commit({ kind: "command", id: "file.inspect", value: v })}
                />
                <InfoRow icon="history" title="Version History" text="View and restore previous versions." onClick={() => commit({ kind: "command", id: "file.versionHistory" })} />
                {(spec.info ?? []).map((r) => (
                  <InfoRow key={r.title} icon={r.icon ?? "link"} title={r.title} text={r.text} onClick={() => commit({ kind: "command", id: r.command, value: r.value })} />
                ))}
              </div>
              <div className="w-56 text-[12px] text-gray-600">
                <h3 className="mb-2 text-[13px] font-semibold text-gray-900">Properties</h3>
                <p>Size: 24.1KB</p>
                <p>Title: Add a title</p>
                <p>Tags: Add a tag</p>
                <h3 className="mb-1 mt-3 text-[13px] font-semibold text-gray-900">Related People</h3>
                <p>Author: BEOC Student</p>
              </div>
            </div>
          </section>
        )}

        {page === "saveAs" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Save As</h2>
            <div className="flex gap-8">
              <div className="flex w-52 flex-col gap-1">
                {[
                  { l: "OneDrive - Personal", i: "cloud" },
                  { l: "This PC", i: "pc" },
                  { l: "Add a Place", i: "folder" },
                  { l: "Browse", i: "folder" },
                ].map(({ l, i }) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLocation(l)}
                    className={`flex items-center gap-2 px-2 py-2 text-left hover:bg-gray-100 ${location === l ? "bg-gray-200" : ""}`}
                  >
                    <Icon name={i} size={22} />
                    {l}
                  </button>
                ))}
              </div>
              <div className="flex max-w-md flex-1 flex-col gap-3">
                <p className="text-[12px] text-gray-600">{location ? `${location} › Documents` : "Pick a location on the left."}</p>
                <label className="flex flex-col gap-1">
                  <span className="text-[12px] text-gray-600">File name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="border border-gray-400 px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[12px] text-gray-600">File type</span>
                  <select value={format} onChange={(e) => setFormat(e.target.value)} className="border border-gray-400 px-2 py-1">
                    {spec.formats.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </label>
                <button
                  type="button"
                  disabled={!location}
                  onClick={() => commit({ kind: "dialog", id: "file.saveAs", values: { location, name, format } })}
                  className="self-start border border-[#0078d4] bg-[#0078d4] px-5 py-1.5 text-white hover:bg-[#106ebe] disabled:opacity-40"
                >
                  Save
                </button>
              </div>
            </div>
          </section>
        )}

        {page === "print" && (
          <section className="flex gap-8">
            <div className="flex w-72 flex-col gap-2 text-[12px]">
              <h2 className="mb-2 text-2xl font-light">Print</h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => commit({ kind: "dialog", id: "file.print", values: print })}
                  className="flex h-20 w-20 flex-col items-center justify-center gap-1 border border-gray-300 hover:bg-[#e5f1fb]"
                >
                  <Icon name="print" size={34} />
                  Print
                </button>
                <label className="flex items-center gap-2">
                  Copies:
                  <input
                    type="number"
                    min={1}
                    value={String(print.copies)}
                    onChange={(e) => sel("copies", Number(e.target.value))}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="w-14 border border-gray-400 px-1"
                  />
                </label>
              </div>
              <h3 className="mt-2 font-semibold">Printer</h3>
              <PSelect value={print.printer} onChange={(v) => sel("printer", v)} options={["BEOC-Lab-Printer on 14BP", "Microsoft Print to PDF", "Front Desk HP LaserJet"]} />
              <h3 className="mt-2 font-semibold">Settings</h3>
              <PSelect
                value={print.range}
                onChange={(v) => sel("range", v)}
                options={app === "Excel" ? ["Print Active Sheets", "Print Entire Workbook", "Print Selection"] : app === "PowerPoint" ? ["Print All Slides", "Print Current Slide", "Custom Range"] : ["Print All Pages", "Print Current Page", "Custom Print"]}
              />
              <label className="flex items-center gap-2">
                {app === "PowerPoint" ? "Slides:" : "Pages:"}
                <input
                  value={String(print.pages)}
                  onChange={(e) => {
                    const v = e.target.value;
                    // Like Office: typing a page range switches Settings to the custom option.
                    setPrint((p) => ({ ...p, pages: v, ...(v.trim() && app === "Word" ? { range: "Custom Print" } : v.trim() && app === "PowerPoint" ? { range: "Custom Range" } : {}) }));
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="flex-1 border border-gray-400 px-1"
                />
              </label>
              {app === "PowerPoint" && (
                <PSelect value={print.layout ?? "Full Page Slides"} onChange={(v) => sel("layout", v)} options={["Full Page Slides", "Notes Pages", "Outline", "3 Slides (Handouts)", "6 Slides Horizontal (Handouts)"]} />
              )}
              <PSelect value={print.sides} onChange={(v) => sel("sides", v)} options={["Print One Sided", "Print on Both Sides (long edge)", "Print on Both Sides (short edge)"]} />
              <PSelect value={print.collate} onChange={(v) => sel("collate", v)} options={["Collated", "Uncollated"]} />
              {app !== "PowerPoint" && <PSelect value={print.orientation} onChange={(v) => sel("orientation", v)} options={["Portrait Orientation", "Landscape Orientation"]} />}
              {app !== "PowerPoint" && <PSelect value={print.paper} onChange={(v) => sel("paper", v)} options={["Letter", "Legal", "A4"]} />}
              {app !== "PowerPoint" && <PSelect value={print.margins} onChange={(v) => sel("margins", v)} options={["Normal Margins", "Narrow Margins", "Wide Margins"]} />}
              {app === "Excel" && <PSelect value={print.scaling ?? "No Scaling"} onChange={(v) => sel("scaling", v)} options={["No Scaling", "Fit Sheet on One Page", "Fit All Columns on One Page", "Fit All Rows on One Page"]} />}
              {app === "Word" && <PSelect value={print.perSheet} onChange={(v) => sel("perSheet", v)} options={["1 Page Per Sheet", "2 Pages Per Sheet", "4 Pages Per Sheet"]} />}
            </div>
            <div className="flex flex-1 items-start justify-center bg-gray-100 p-6">
              <div className="h-[300px] w-[232px] bg-white shadow-md" style={String(print.orientation).startsWith("Landscape") ? { width: 300, height: 232 } : undefined}>
                <div className="m-6 space-y-2">
                  <div className="h-3 w-2/3 bg-gray-300" />
                  {Array.from({ length: 9 }).map((_, i) => <div key={i} className="h-1.5 bg-gray-200" style={{ width: `${90 - (i % 3) * 12}%` }} />)}
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "share" && (
          <section className="max-w-md">
            <h2 className="mb-4 text-2xl font-light">Share</h2>
            <div className="flex flex-col gap-3 text-[12px]">
              <label className="flex flex-col gap-1">
                Invite people (name or email)
                <input value={String(share.email)} onChange={(e) => setShare((s) => ({ ...s, email: e.target.value }))} onKeyDown={(e) => e.stopPropagation()} className="border border-gray-400 px-2 py-1" />
              </label>
              <label className="flex flex-col gap-1">
                Permission
                <select value={String(share.permission)} onChange={(e) => setShare((s) => ({ ...s, permission: e.target.value }))} className="border border-gray-400 px-2 py-1">
                  <option>Can edit</option>
                  <option>Can view</option>
                </select>
              </label>
              <label className="flex flex-col gap-1">
                Message (optional)
                <input value={String(share.message)} onChange={(e) => setShare((s) => ({ ...s, message: e.target.value }))} onKeyDown={(e) => e.stopPropagation()} className="border border-gray-400 px-2 py-1" />
              </label>
              <div className="flex gap-2">
                <button type="button" onClick={() => commit({ kind: "dialog", id: "file.share", values: share })} className="bg-[#0078d4] px-4 py-1.5 text-white hover:bg-[#106ebe]">Send</button>
                <button type="button" onClick={() => commit({ kind: "command", id: "file.copyLink" })} className="border border-gray-400 px-4 py-1.5 hover:bg-gray-100">Copy link</button>
              </div>
              <div className="mt-4 border-t pt-3">
                <p className="mb-2 font-semibold">Send a copy</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => commit({ kind: "command", id: "file.email", value: app })} className="border border-gray-400 px-3 py-1 hover:bg-gray-100">{app} {noun}</button>
                  <button type="button" onClick={() => commit({ kind: "command", id: "file.email", value: "PDF" })} className="border border-gray-400 px-3 py-1 hover:bg-gray-100">PDF</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "export" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Export</h2>
            <div className="flex gap-8">
              <div className="flex w-60 flex-col gap-1">
                <button type="button" className="flex items-center gap-2 bg-gray-200 px-2 py-2 text-left">
                  <Icon name="pdf" size={22} /> Create PDF/XPS Document
                </button>
                <button type="button" onClick={() => commit({ kind: "command", id: "file.changeType", value: spec.formats[1] ?? spec.formats[0] })} className="flex items-center gap-2 px-2 py-2 text-left hover:bg-gray-100">
                  <Icon name="new" size={22} /> Change File Type
                </button>
                {(spec.exports ?? []).map((x) => (
                  <button key={x.label} type="button" onClick={() => commit({ kind: "command", id: x.command, value: x.value })} className="flex items-center gap-2 px-2 py-2 text-left hover:bg-gray-100">
                    <Icon name={x.icon ?? "new"} size={22} /> {x.label}
                  </button>
                ))}
              </div>
              <div className="flex max-w-sm flex-col gap-3 text-[12px]">
                <p>Preserves layout, formatting, fonts, and images. Content can&apos;t be easily changed.</p>
                <label className="flex flex-col gap-1">
                  File name
                  <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="border border-gray-400 px-2 py-1" />
                </label>
                <button
                  type="button"
                  onClick={() => commit({ kind: "dialog", id: "file.exportPdf", values: { name, format: "PDF" } })}
                  className="flex w-36 flex-col items-center gap-1 border border-gray-300 p-3 hover:bg-[#e5f1fb]"
                >
                  <Icon name="pdf" size={34} />
                  Create PDF/XPS
                </button>
              </div>
            </div>
          </section>
        )}

        {page === "account" && (
          <section className="text-[12px]">
            <h2 className="mb-4 text-2xl font-light">Account</h2>
            <p className="font-semibold">User Information</p>
            <p>BEOC Student · student@beoc.example</p>
            <p className="mt-4 font-semibold">Product Information</p>
            <p>Microsoft 365 (training simulation)</p>
          </section>
        )}

        {page === "options" && (
          <section className="text-[12px]">
            <h2 className="mb-4 text-2xl font-light">{app} Options</h2>
            <div className="flex flex-col gap-2">
              {[
                ["General", "User name: BEOC Student"],
                ["Proofing", "Check spelling as you type: On"],
                ["Save", "AutoRecover every 10 minutes: On"],
              ].map(([h, t]) => (
                <button key={h} type="button" onClick={() => commit({ kind: "command", id: "file.options", value: h })} className="flex gap-4 border border-gray-200 px-3 py-2 text-left hover:bg-gray-50">
                  <span className="w-24 font-semibold">{h}</span>
                  <span>{t}</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function RecentList({ spec, onOpen }: { spec: BackstageSpec; onOpen: (name: string) => void }) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1fr_200px_120px] border-b px-2 py-1 text-[11px] text-gray-500">
        <span>Name</span>
        <span>Location</span>
        <span>Modified</span>
      </div>
      {spec.recent.map((r) => (
        <button
          key={r.name}
          type="button"
          onDoubleClick={() => onOpen(r.name)}
          onClick={() => onOpen(r.name)}
          className="grid grid-cols-[1fr_200px_120px] items-center px-2 py-1.5 text-left text-[12px] hover:bg-[#e5f1fb]"
        >
          <span className="flex items-center gap-2"><Icon name="new" size={18} />{r.name}</span>
          <span className="truncate text-gray-500">{r.location}</span>
          <span className="text-gray-500">{r.when}</span>
        </button>
      ))}
    </div>
  );
}

function InfoRow({
  icon,
  title,
  text,
  onClick,
  open,
  options,
  onPick,
}: {
  icon: string;
  title: string;
  text: string;
  onClick: () => void;
  open?: boolean;
  options?: string[];
  onPick?: (v: string) => void;
}) {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <button type="button" onClick={onClick} className="flex h-20 w-24 flex-col items-center justify-center gap-1 border border-gray-300 text-[11px] hover:bg-[#e5f1fb]">
          <Icon name={icon} size={30} />
          {title}
        </button>
        {open && options && (
          <div className="absolute left-0 top-full z-10 w-60 border border-gray-300 bg-white py-1 shadow-lg">
            {options.map((o) => (
              <button key={o} type="button" onClick={() => onPick?.(o)} className="block w-full px-3 py-1.5 text-left text-[12px] hover:bg-[#e5f1fb]">
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-[12px] text-gray-600">{text}</p>
      </div>
    </div>
  );
}

function PSelect({ value, options, onChange }: { value: SimValue | undefined; options: string[]; onChange: (v: string) => void }) {
  return (
    <select value={String(value ?? options[0])} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-300 px-2 py-1.5 hover:border-gray-500">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}
