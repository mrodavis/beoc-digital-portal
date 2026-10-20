"use client";

import { useRef, useState } from "react";
import type { BackstageProps } from "../../types";
import type { OutlookDoc } from "./types";
import { SimDialog } from "../../chrome/Dialog";
import { Icon } from "../../chrome/icons";
import { AutoRepliesDialog, SignaturesDialog } from "./canvasDialogs";
import { outlookDialogs } from "./dialogs";
import { outlookDialogDef, outlookDialogDefaults } from "./model";
import { OIcon } from "./parts";
import { fmtDate, fmtTime } from "./dates";

type Page = "info" | "open" | "saveAs" | "attachments" | "print" | "account" | "feedback" | "options";

const NAV: { id: Page | "exit"; label: string }[] = [
  { id: "info", label: "Info" },
  { id: "open", label: "Open & Export" },
  { id: "saveAs", label: "Save As" },
  { id: "attachments", label: "Save Attachments" },
  { id: "print", label: "Print" },
];

export function OutlookBackstage({ doc, accent, startPage, onCommit, onClose }: BackstageProps<OutlookDoc>) {
  const start: Page = startPage === "print" ? "print" : startPage === "saveAs" ? "saveAs" : startPage === "options" ? "options" : "info";
  const [page, setPage] = useState<Page>(start);
  const [sub, setSub] = useState<"autoReplies" | "signatures" | "rules" | "accounts" | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const [optCat, setOptCat] = useState("Mail");
  const docRef = useRef(doc);
  docRef.current = doc;
  const [saveName, setSaveName] = useState("Message");
  const [saveType, setSaveType] = useState("Outlook Message Format - Unicode (*.msg)");
  const [printer, setPrinter] = useState("BEOC-Lab-Printer on 14BP");
  const [style, setStyle] = useState(doc.module === "calendar" ? "Weekly Agenda Style" : "Memo Style");
  const [copies, setCopies] = useState(1);
  const ui = { selection: "" };

  const tile = (icon: string, title: string, text: string, onClick: () => void, caret?: boolean) => (
    <div className="flex items-start gap-4 border-b border-gray-200 py-4">
      <button type="button" onClick={onClick} className="flex h-[88px] w-[88px] shrink-0 flex-col items-center justify-center gap-1 border border-gray-300 bg-white text-[12px] hover:bg-[#e5f1fb]">
        <Icon name={icon} size={32} />
        <span className="px-1 text-center leading-tight">{title}{caret ? " ▾" : ""}</span>
      </button>
      <div className="pt-1">
        <h3 className="text-[15px] font-semibold">{title}</h3>
        <p className="max-w-md text-[12.5px] text-gray-600">{text}</p>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 z-40 flex bg-white text-[13px] text-gray-900">
      <nav className="flex w-44 shrink-0 flex-col text-white" style={{ background: accent }}>
        <button type="button" onClick={onClose} aria-label="Back to Outlook" className="m-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        </button>
        {NAV.map((n) => (
          <button key={n.id} type="button" onClick={() => setPage(n.id as Page)} className={`px-5 py-2 text-left hover:bg-white/15 ${page === n.id ? "bg-white/25 font-semibold" : ""}`}>
            {n.label}
          </button>
        ))}
        <div className="flex-1" />
        <button type="button" onClick={() => setPage("account")} className={`px-5 py-2 text-left hover:bg-white/15 ${page === "account" ? "bg-white/25" : ""}`}>Office Account</button>
        <button type="button" onClick={() => setPage("feedback")} className={`px-5 py-2 text-left hover:bg-white/15 ${page === "feedback" ? "bg-white/25" : ""}`}>Feedback</button>
        <button type="button" onClick={() => setPage("options")} className={`px-5 py-2 text-left hover:bg-white/15 ${page === "options" ? "bg-white/25" : ""}`}>Options</button>
        <button type="button" onClick={() => { onCommit({ kind: "command", id: "file.exit" }); onClose(); }} className="mb-3 px-5 py-2 text-left hover:bg-white/15">Exit</button>
      </nav>

      <div className="relative min-w-0 flex-1 overflow-auto px-8 py-6">
        {page === "info" && (
          <section>
            <h2 className="mb-3 text-2xl font-light">Account Information</h2>
            <div className="mb-2 flex items-center gap-3 border border-gray-200 bg-[#faf9f8] px-3 py-2">
              <OIcon name="mail" size={22} />
              <div>
                <div className="font-semibold">{doc.account.email}</div>
                <div className="text-[12px] text-gray-600">Microsoft Exchange</div>
              </div>
            </div>
            <button type="button" onClick={() => onCommit({ kind: "command", id: "file.accountSettings" })} className="mb-2 text-[12.5px] hover:underline">+ Add Account</button>
            <div className="relative">
              {tile("options", "Account Settings", "Change settings for this account or set up more connections. Access this account on the web.", () => setMenu(menu === "acct" ? null : "acct"), true)}
              {menu === "acct" && (
                <div className="absolute left-0 top-[96px] z-10 w-64 border border-gray-300 bg-white py-1 shadow-lg">
                  {["Account Settings...", "Name and Sync Settings", "Download Address Book...", "Manage Profiles"].map((l) => (
                    <button key={l} type="button" onClick={() => { setMenu(null); setSub("accounts"); onCommit({ kind: "command", id: "file.accountSettings" }); }} className="block w-full px-3 py-1 text-left hover:bg-[#e5f1fb]">{l}</button>
                  ))}
                </div>
              )}
            </div>
            {tile("history", "Automatic Replies", doc.autoReplies?.on ? "Automatic replies are being sent for this account." : "Use automatic replies to notify others that you are out of office, on vacation, or not available to respond to email messages.", () => setSub("autoReplies"))}
            <div className="relative">
              {tile("clear", "Tools", "Manage the size of your mailbox by emptying Deleted Items and archiving.", () => setMenu(menu === "tools" ? null : "tools"), true)}
              {menu === "tools" && (
                <div className="absolute left-0 top-[96px] z-10 w-64 border border-gray-300 bg-white py-1 shadow-lg">
                  <button type="button" onClick={() => { setMenu(null); onCommit({ kind: "command", id: "file.cleanupTools" }); }} className="block w-full px-3 py-1 text-left hover:bg-[#e5f1fb]">Mailbox Cleanup...</button>
                  <button type="button" onClick={() => { setMenu(null); onCommit({ kind: "command", id: "mail.emptyDeleted" }); onClose(); }} className="block w-full px-3 py-1 text-left hover:bg-[#e5f1fb]">Empty Deleted Items Folder</button>
                </div>
              )}
            </div>
            {tile("filter", "Manage Rules & Alerts", "Use Rules and Alerts to help organize your incoming email messages, and receive updates when items are added, changed, or removed.", () => setSub("rules"))}
          </section>
        )}

        {page === "open" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Open</h2>
            {[
              ["date", "Open Calendar", "Open a calendar file (.ics, .vcs) in Outlook.", "file.openCalendar"],
              ["open", "Open Outlook Data File", "Open an Outlook data file (.pst).", "file.import"],
              ["export", "Import/Export", "Import or export files and settings.", "file.import"],
              ["recipients", "Other User's Folder", "Open a folder shared by another user.", "file.openCalendar"],
            ].map(([icon, title, text, id]) => (
              <button key={title} type="button" onClick={() => onCommit({ kind: "command", id })} className="mb-1 flex w-full max-w-xl items-center gap-3 px-2 py-2 text-left hover:bg-[#e5f1fb]">
                <Icon name={icon} size={32} />
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="block text-[12px] text-gray-600">{text}</span>
                </span>
              </button>
            ))}
          </section>
        )}

        {page === "saveAs" && (
          <section className="max-w-lg">
            <h2 className="mb-4 text-2xl font-light">Save As</h2>
            <label className="mb-2 block">
              <span className="mb-1 block text-[12px] text-gray-600">File name</span>
              <input aria-label="File name" value={saveName} onChange={(e) => setSaveName(e.target.value)} className="w-full border border-gray-400 px-2 py-1" />
            </label>
            <label className="mb-4 block">
              <span className="mb-1 block text-[12px] text-gray-600">Save as type</span>
              <select aria-label="Save as type" value={saveType} onChange={(e) => setSaveType(e.target.value)} className="w-full border border-gray-400 bg-white px-2 py-1">
                {["Outlook Message Format - Unicode (*.msg)", "Outlook Message Format (*.msg)", "Text Only (*.txt)", "HTML (*.htm;*.html)", "MHT files (*.mht)"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <button type="button" onClick={() => onCommit({ kind: "dialog", id: "file.saveAs", values: { name: saveName, format: saveType, location: "Documents" } })} className="rounded px-4 py-1.5 font-semibold text-white" style={{ background: accent }}>
              Save
            </button>
          </section>
        )}

        {page === "attachments" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Save Attachments</h2>
            <p className="text-gray-600">Select a message with attachments first, then choose Save All Attachments.</p>
          </section>
        )}

        {page === "print" && (
          <section className="flex gap-8">
            <div className="w-64">
              <h2 className="mb-4 text-2xl font-light">Print</h2>
              <button type="button" onClick={() => onCommit({ kind: "dialog", id: "file.print", values: { printer, style, copies } })} className="mb-4 flex h-20 w-20 flex-col items-center justify-center border border-gray-300 hover:bg-[#e5f1fb]">
                <Icon name="print" size={36} />
                Print
              </button>
              <label className="mb-2 block">
                <span className="mb-1 block text-[12px] text-gray-600">Printer</span>
                <select aria-label="Printer" value={printer} onChange={(e) => setPrinter(e.target.value)} className="w-full border border-gray-400 bg-white px-1 py-1">
                  {["BEOC-Lab-Printer on 14BP", "Front Desk HP LaserJet", "Microsoft Print to PDF"].map((p) => <option key={p}>{p}</option>)}
                </select>
              </label>
              <label className="mb-2 block">
                <span className="mb-1 block text-[12px] text-gray-600">Copies</span>
                <input aria-label="Copies" type="number" min={1} value={copies} onChange={(e) => setCopies(Number(e.target.value) || 1)} className="w-20 border border-gray-400 px-1 py-0.5" />
              </label>
              <p className="mb-1 text-[12px] text-gray-600">Settings</p>
              {(doc.module === "calendar" ? ["Daily Style", "Weekly Agenda Style", "Weekly Calendar Style", "Monthly Style", "Calendar Details Style"] : doc.module === "people" ? ["Card Style", "Small Booklet Style", "Phone Directory Style"] : ["Table Style", "Memo Style"]).map((s) => (
                <button key={s} type="button" onClick={() => setStyle(s)} className={`mb-1 block w-full border px-2 py-1.5 text-left ${style === s ? "border-[#0f6cbd] bg-[#e5f1fb]" : "border-gray-300 hover:bg-gray-50"}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="hidden flex-1 items-start justify-center bg-[#e7e7e7] p-6 md:flex">
              <div className="h-[330px] w-[255px] bg-white p-4 text-[9px] text-gray-700 shadow">
                <div className="mb-2 border-b border-black pb-1 text-[11px] font-bold">{doc.account.name}</div>
                <p>{style}</p>
                <p className="mt-2">Printed {fmtDate(doc.now ?? "2026-10-20T09:30")} {fmtTime(doc.now ?? "2026-10-20T09:30")}</p>
              </div>
            </div>
          </section>
        )}

        {page === "account" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Office Account</h2>
            <p className="font-semibold">User Information</p>
            <p>{doc.account.name}</p>
            <p className="mb-4 text-gray-600">{doc.account.email}</p>
            <p className="font-semibold">Product Information</p>
            <p>Microsoft 365 Apps for enterprise</p>
            <p className="text-gray-600">This product contains Outlook, Word, Excel, PowerPoint, Teams, and OneNote.</p>
          </section>
        )}

        {page === "feedback" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Feedback</h2>
            <p className="text-gray-600">I like something · I don&apos;t like something · I have a suggestion</p>
          </section>
        )}

        {page === "options" && (
          <section className="flex h-full max-h-[460px] border border-gray-300">
            <div className="w-40 shrink-0 border-r border-gray-300 bg-[#f3f2f1] py-1">
              {["General", "Mail", "Calendar", "Groups", "People", "Tasks", "Search", "Language", "Accessibility", "Advanced", "Customize Ribbon", "Quick Access Toolbar", "Add-ins", "Trust Center"].map((c) => (
                <button key={c} type="button" onClick={() => setOptCat(c)} className={`block w-full px-3 py-1 text-left text-[12.5px] ${optCat === c ? "bg-white font-semibold" : "hover:bg-white/60"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-auto p-4 text-[12.5px]">
                <h3 className="mb-3 text-[15px] font-semibold">{optCat === "Mail" ? "Change the settings for messages you create and receive." : `${optCat} options`}</h3>
                {optCat === "Mail" ? (
                  <>
                    <OptRow title="Compose messages" text="Create or modify signatures for messages.">
                      <button type="button" onClick={() => setSub("signatures")} className="border border-gray-400 bg-[#e1e1e1] px-3 py-1 hover:bg-[#e5f1fb]">Signatures...</button>
                    </OptRow>
                    <OptRow title="Outlook panes" text="Customize how items are marked as read when using the Reading Pane.">
                      <button type="button" className="border border-gray-400 bg-[#e1e1e1] px-3 py-1">Reading Pane...</button>
                    </OptRow>
                    <OptRow title="Automatic replies" text="Send automatic replies to let people know you're out of the office or unavailable.">
                      <button type="button" onClick={() => setSub("autoReplies")} className="border border-gray-400 bg-[#e1e1e1] px-3 py-1 hover:bg-[#e5f1fb]">Automatic Replies...</button>
                    </OptRow>
                    <OptRow title="Conversation Clean Up" text="Cleaned-up items will go to this folder: Deleted Items." />
                  </>
                ) : optCat === "Calendar" ? (
                  <OptRow title="Work time" text="Work hours: Start time 8:00 AM, End time 5:00 PM. Work week: Mon, Tue, Wed, Thu, Fri. First day of week: Sunday." />
                ) : (
                  <p className="text-gray-600">These settings are shown for practice.</p>
                )}
              </div>
              <div className="flex justify-end gap-2 border-t border-gray-300 bg-[#f0f0f0] px-3 py-2">
                <button type="button" onClick={() => { onCommit({ kind: "command", id: "file.options" }); onClose(); }} className="min-w-[72px] border border-[#0078d4] bg-[#e5f1fb] px-3 py-1">OK</button>
                <button type="button" onClick={onClose} className="min-w-[72px] border border-gray-400 bg-[#e1e1e1] px-3 py-1">Cancel</button>
              </div>
            </div>
          </section>
        )}

        {sub === "autoReplies" && <AutoRepliesDialog doc={doc} onCommit={onCommit} onClose={() => setSub(null)} docNow={() => docRef.current} />}
        {sub === "signatures" && <SignaturesDialog doc={doc} onCommit={onCommit} onClose={() => setSub(null)} docNow={() => docRef.current} />}
        {sub === "accounts" && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10">
            <div className="w-[460px] border border-gray-400 bg-[#f0f0f0] text-[12px] shadow-2xl">
              <div className="bg-white px-3 py-1.5">Account Settings</div>
              <div className="bg-white p-3">
                <p className="mb-2 font-semibold">Email</p>
                <div className="border border-gray-300">
                  <div className="grid grid-cols-2 bg-[#f3f2f1] px-2 py-0.5 text-gray-600"><span>Name</span><span>Type</span></div>
                  <div className="grid grid-cols-2 bg-[#cce4f7] px-2 py-0.5"><span>{doc.account.email}</span><span>Microsoft Exchange (send from this account by default)</span></div>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-300 px-3 py-2">
                <button type="button" onClick={() => setSub(null)} className="min-w-[72px] border border-gray-400 bg-[#e1e1e1] px-3 py-1">Close</button>
              </div>
            </div>
          </div>
        )}
        {sub === "rules" && (
          <SimDialog
            def={outlookDialogDef(doc, ui, "rulesAlerts", outlookDialogs.rulesAlerts) ?? outlookDialogs.rulesAlerts}
            initial={outlookDialogDefaults(doc, ui, "rulesAlerts")}
            onCancel={() => setSub(null)}
            onOk={(values) => {
              setSub(null);
              onCommit({ kind: "dialog", id: "rulesAlerts", values });
            }}
          />
        )}
      </div>
    </div>
  );
}

function OptRow({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h4 className="mb-1 border-b border-gray-200 pb-0.5 font-semibold">{title}</h4>
      <div className="flex items-center justify-between gap-4">
        <p className="text-gray-700">{text}</p>
        {children}
      </div>
    </div>
  );
}
