"use client";

import { useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { BackstageProps } from "../../types";
import type { AccessDoc } from "./types";
import { activeTab } from "./model";
import { AccIcon } from "./icons";
import { Icon } from "../../chrome/icons";
import { Btn, Win, TextIn, Check, Combo } from "./ui";
import { WizardHost, isWizardPage } from "./Wizards";

const cmd = (id: string, value?: string): SimCommit => ({ kind: "command", id, value });
const ACCENT = "#a4373a";
const TEMPLATES = [
  { name: "Blank database", color: "" },
  { name: "Contacts", color: "#a4373a" },
  { name: "Asset tracking", color: "#2b579a" },
  { name: "Students", color: "#217346" },
  { name: "Event management", color: "#b7472a" },
  { name: "Task management", color: "#5c2d91" },
];

function BlankDbPanel({ onCreate, onCancel, location }: { onCreate: (name: string) => void; onCancel: () => void; location: string }) {
  const [name, setName] = useState("Database1.accdb");
  return (
    <Win title="Blank database" width={380} onClose={onCancel} footer={<><Btn primary onClick={() => onCreate(name)}>Create</Btn><Btn onClick={onCancel}>Cancel</Btn></>}>
      <div className="flex gap-3">
        <div className="flex h-24 w-20 shrink-0 items-center justify-center border border-gray-300 bg-white"><AccIcon name="accdb" size={36} /></div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="flex flex-col gap-0.5">
            File Name
            <span className="flex items-center gap-1">
              <TextIn ariaLabel="File Name" value={name} onChange={setName} onEnter={() => onCreate(name)} className="h-[24px] flex-1 border border-[#7a7a7a] bg-white px-1 outline-none" />
              <span title="Browse for a location to put your database" className="border border-gray-400 bg-white p-0.5"><AccIcon name="folder" size={14} /></span>
            </span>
          </label>
          <span className="text-[11px] text-gray-600">{location}\</span>
        </div>
      </div>
    </Win>
  );
}

function SaveFileDialog({ title, defaultName, ext, folder, onSave, onCancel }: { title: string; defaultName: string; ext: string; folder: string; onSave: (name: string, folder: string) => void; onCancel: () => void }) {
  const [name, setName] = useState(defaultName);
  const [loc, setLoc] = useState(folder);
  const places = ["C:\\Users\\Student\\Documents", "C:\\Users\\Student\\Documents\\Backups", "C:\\Users\\Student\\OneDrive - BEOC\\Documents", "S:\\Lakeside Shared"];
  return (
    <Win title={title} width={520} onClose={onCancel} footer={<><Btn primary onClick={() => onSave(name, loc)}>Save</Btn><Btn onClick={onCancel}>Cancel</Btn></>}>
      <div className="mb-2 flex items-center gap-1 border border-[#c6c6c6] bg-white px-2 py-1 text-[11.5px]"><AccIcon name="folder" size={13} />{loc}</div>
      <div className="flex gap-2">
        <div className="flex w-44 flex-col border border-[#c6c6c6] bg-white py-1">
          {places.map((p) => (
            <button key={p} type="button" onClick={() => setLoc(p)} className={`flex items-center gap-1 truncate px-2 py-[2px] text-left ${loc === p ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}><AccIcon name="folder" size={12} />{p.split("\\").slice(-1)[0]}</button>
          ))}
        </div>
        <div className="h-[110px] flex-1 border border-[#c6c6c6] bg-white p-1 text-[11px] text-gray-500">This folder is empty.</div>
      </div>
      <label className="mt-2 flex items-center gap-2"><span className="w-20">File name:</span><TextIn ariaLabel="File name" value={name} onChange={setName} onEnter={() => onSave(name, loc)} className="h-[22px] flex-1 border border-[#7a7a7a] bg-white px-1 outline-none" /></label>
      <label className="mt-1 flex items-center gap-2"><span className="w-20">Save as type:</span><span className="flex-1 border border-[#7a7a7a] bg-white px-1">{ext}</span></label>
    </Win>
  );
}

export function StartScreen({ doc, onCommit }: { doc: AccessDoc; onCommit: (c: SimCommit) => void }) {
  const [page, setPage] = useState<"home" | "new" | "open">("home");
  const [blank, setBlank] = useState(false);
  const name = doc.saved?.name ?? "Database1.accdb";
  return (
    <div className="absolute inset-0 z-20 flex bg-white text-[13px]">
      <nav className="flex w-44 shrink-0 flex-col text-white" style={{ background: ACCENT }}>
        <div className="px-5 py-4 text-[20px] font-light">Access</div>
        {(["home", "new", "open"] as const).map((p) => (
          <button key={p} type="button" onClick={() => setPage(p)} className={`flex items-center gap-2 px-5 py-2 text-left hover:bg-white/15 ${page === p ? "bg-white/25" : ""}`}>
            <Icon name={p === "home" ? "home" : p === "new" ? "new" : "open"} size={16} />
            {p === "home" ? "Home" : p === "new" ? "New" : "Open"}
          </button>
        ))}
        <div className="flex-1" />
        <span className="px-5 py-2 text-white/80">Account</span>
        <span className="px-5 py-2 text-white/80">Feedback</span>
        <span className="mb-3 px-5 py-2 text-white/80">Options</span>
      </nav>
      <div className="flex-1 overflow-auto px-8 py-6">
        <h2 className="mb-4 text-2xl font-light">{page === "home" ? "Good morning" : page === "new" ? "New" : "Open"}</h2>
        {page !== "open" && (
          <div className="mb-6 flex flex-wrap gap-4">
            {TEMPLATES.map((t) => (
              <button key={t.name} type="button" onClick={() => (t.name === "Blank database" ? setBlank(true) : onCommit(cmd("file.new", t.name)))} className="flex w-[118px] flex-col items-center gap-1.5 text-center text-[12px] hover:text-[#a4373a]">
                <span className="flex h-[118px] w-[110px] items-center justify-center border border-gray-300 bg-white shadow-sm hover:border-[#a4373a]" style={t.color ? { background: `linear-gradient(${t.color} 0 34%, #fff 34%)` } : undefined}>
                  {!t.color && <AccIcon name="table" size={34} />}
                </span>
                {t.name}
              </button>
            ))}
          </div>
        )}
        {page !== "new" && (
          <>
            <h3 className="mb-2 text-[14px] font-semibold">Recent</h3>
            <div className="grid grid-cols-[1fr_260px_110px] border-b px-2 py-1 text-[11px] text-gray-500"><span>Name</span><span>Location</span><span>Date modified</span></div>
            {doc.tables.length > 0 && (
              <button type="button" onClick={() => onCommit(cmd("file.open", name))} className="grid w-full grid-cols-[1fr_260px_110px] items-center px-2 py-1.5 text-left text-[12px] hover:bg-[#f6e9e9]">
                <span className="flex items-center gap-2"><AccIcon name="accdb" size={18} />{name}</span>
                <span className="truncate text-gray-500">{doc.saved?.location ?? "C:\\Users\\Student\\Documents"}</span>
                <span className="text-gray-500">Yesterday</span>
              </button>
            )}
          </>
        )}
      </div>
      {blank && <BlankDbPanel location={doc.saved?.location ?? "C:\\Users\\Student\\Documents"} onCancel={() => setBlank(false)} onCreate={(n) => { setBlank(false); onCommit(cmd("file.new", n.trim())); }} />}
    </div>
  );
}

type Page = "home" | "new" | "open" | "info" | "saveAs" | "print" | "account" | "options";

export function AccessBackstage(props: BackstageProps<AccessDoc>) {
  const { doc, fileName, startPage = "home", onCommit, onClose } = props;
  if (isWizardPage(startPage)) return <WizardHost {...props} page={startPage} />;
  return <FileTab doc={doc} fileName={fileName} startPage={startPage} onCommit={onCommit} onClose={onClose} />;
}

function FileTab({ doc, fileName, startPage, onCommit, onClose }: { doc: AccessDoc; fileName: string; startPage: string; onCommit: (c: SimCommit) => void; onClose: () => void }) {
  const [page, setPage] = useState<Page>((["home", "new", "open", "info", "saveAs", "print", "account", "options"].includes(startPage) ? startPage : "home") as Page);
  const [blank, setBlank] = useState(false);
  const [pw, setPw] = useState<{ a: string; b: string; err?: string } | null>(null);
  const [saveKind, setSaveKind] = useState<"db" | "object">("db");
  const [dbFmt, setDbFmt] = useState("Access Database");
  const [objFmt, setObjFmt] = useState("Save Object As");
  const [fileDlg, setFileDlg] = useState<null | { title: string; name: string; ext: string; format: string }>(null);
  const [printDlg, setPrintDlg] = useState(false);
  const [opts, setOpts] = useState(() => ({ appTitle: doc.options?.appTitle ?? "", displayForm: doc.options?.displayForm ?? "(none)", compact: Boolean(doc.options?.compactOnClose), cat: "Current Database" }));
  const db = fileName.replace(/\.accdb$/i, "");
  const loc = doc.saved?.location ?? "C:\\Users\\Student\\Documents";
  const tab = activeTab(doc);
  const commitClose = (c: SimCommit) => {
    onCommit(c);
    onClose();
  };
  const NAV: { id: Page | "save" | "close"; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "new", label: "New" },
    { id: "open", label: "Open" },
    { id: "info", label: "Info" },
    { id: "save", label: "Save" },
    { id: "saveAs", label: "Save As" },
    { id: "print", label: "Print" },
    { id: "close", label: "Close" },
  ];
  const dbTypes = [
    { name: "Access Database", desc: "Default database format." },
    { name: "Access 2002-2003 Database", desc: "Save a copy that will be compatible with Access 2002-2003." },
    { name: "Access 2000 Database", desc: "Save a copy that will be compatible with Access 2000." },
    { name: "Template", desc: "Save the current database as a database template (ACCDT)." },
  ];
  const advanced = [
    { name: "Package and Sign", desc: "Package the database and apply a digital signature." },
    { name: "Make ACCDE", desc: "File will be compiled into an executable only file." },
    { name: "Back Up Database", desc: "Back up important databases regularly to prevent data loss." },
    { name: "SharePoint", desc: "Share the database by saving it to a document management server." },
  ];
  const doSaveAs = () => {
    if (saveKind === "db") {
      if (dbFmt === "Back Up Database") setFileDlg({ title: "Save As", name: `${db}_2026-10-20`, ext: "Microsoft Access Database (*.accdb)", format: "Back Up Database" });
      else if (dbFmt === "Package and Sign" || dbFmt === "SharePoint") return;
      else setFileDlg({ title: "Save As", name: dbFmt === "Template" ? db : `${db}`, ext: dbFmt === "Template" ? "Microsoft Access Template (*.accdt)" : dbFmt === "Make ACCDE" ? "ACCDE File (*.accde)" : dbFmt.includes("2002") || dbFmt.includes("2000") ? "Microsoft Access Database (2002-2003) (*.mdb)" : "Microsoft Access Database (*.accdb)", format: dbFmt });
    } else {
      if (!tab) return;
      setFileDlg({ title: objFmt === "PDF or XPS" ? "Publish as PDF or XPS" : "Save As", name: objFmt === "PDF or XPS" ? tab.name : `Copy of ${tab.name}`, ext: objFmt === "PDF or XPS" ? "PDF (*.pdf)" : tab.kind[0].toUpperCase() + tab.kind.slice(1), format: objFmt });
    }
  };
  return (
    <div className="absolute inset-0 z-40 flex bg-white text-[13px] text-gray-900">
      <nav className="flex w-44 shrink-0 flex-col text-white" style={{ background: ACCENT }}>
        <button type="button" onClick={onClose} aria-label="Back to the database" className="m-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2" fill="none" /></svg>
        </button>
        {NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => {
              if (n.id === "save") commitClose(cmd("file.save"));
              else if (n.id === "close") commitClose(cmd("file.close"));
              else setPage(n.id);
            }}
            className={`px-5 py-2 text-left hover:bg-white/15 ${page === n.id ? "bg-white/25 font-semibold" : ""}`}
          >
            {n.label}
          </button>
        ))}
        <div className="flex-1" />
        <button type="button" onClick={() => setPage("account")} className={`px-5 py-2 text-left hover:bg-white/15 ${page === "account" ? "bg-white/25" : ""}`}>Account</button>
        <span className="px-5 py-2 text-white/80">Feedback</span>
        <button type="button" onClick={() => setPage("options")} className={`mb-3 px-5 py-2 text-left hover:bg-white/15 ${page === "options" ? "bg-white/25" : ""}`}>Options</button>
      </nav>
      <div className="relative flex-1 overflow-auto px-8 py-6">
        {(page === "home" || page === "new") && (
          <section>
            <h2 className="mb-4 text-2xl font-light">{page === "home" ? "Good morning" : "New"}</h2>
            <div className="mb-6 flex flex-wrap gap-4">
              {TEMPLATES.map((t) => (
                <button key={t.name} type="button" onClick={() => (t.name === "Blank database" ? setBlank(true) : commitClose(cmd("file.new", t.name)))} className="flex w-[118px] flex-col items-center gap-1.5 text-center text-[12px] hover:text-[#a4373a]">
                  <span className="flex h-[118px] w-[110px] items-center justify-center border border-gray-300 bg-white shadow-sm hover:border-[#a4373a]" style={t.color ? { background: `linear-gradient(${t.color} 0 34%, #fff 34%)` } : undefined}>
                    {!t.color && <AccIcon name="table" size={34} />}
                  </span>
                  {t.name}
                </button>
              ))}
            </div>
            {page === "home" && (
              <>
                <h3 className="mb-2 text-[14px] font-semibold">Recent</h3>
                <button type="button" onClick={() => commitClose(cmd("file.open", fileName))} className="grid w-full grid-cols-[1fr_260px_110px] items-center px-2 py-1.5 text-left text-[12px] hover:bg-[#f6e9e9]">
                  <span className="flex items-center gap-2"><AccIcon name="accdb" size={18} />{fileName}</span>
                  <span className="truncate text-gray-500">{loc}</span>
                  <span className="text-gray-500">Today</span>
                </button>
              </>
            )}
          </section>
        )}
        {page === "open" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Open</h2>
            <div className="flex gap-8">
              <div className="flex w-48 flex-col gap-1">
                {["Recent", "OneDrive - BEOC", "This PC", "Browse"].map((l) => (
                  <button key={l} type="button" className="flex items-center gap-2 px-2 py-1.5 text-left hover:bg-gray-100"><Icon name={l.includes("OneDrive") ? "cloud" : l === "This PC" ? "pc" : l === "Browse" ? "folder" : "history"} size={20} />{l}</button>
                ))}
              </div>
              <div className="flex-1">
                <button type="button" onClick={() => commitClose(cmd("file.open", fileName))} className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-[12px] hover:bg-[#f6e9e9]"><AccIcon name="accdb" size={18} /><span>{fileName}</span><span className="ml-auto text-gray-500">{loc}</span></button>
              </div>
            </div>
          </section>
        )}
        {page === "info" && (
          <section>
            <h2 className="mb-1 text-2xl font-light">Info</h2>
            <p className="mb-6 text-gray-600">{db}<br /><span className="text-[12px]">{loc}\{fileName}</span></p>
            <div className="flex max-w-2xl flex-col gap-5">
              <div className="flex gap-4">
                <button type="button" onClick={() => commitClose(cmd("dbtools.compact"))} className="flex h-24 w-28 shrink-0 flex-col items-center justify-center gap-1 border border-gray-300 text-center text-[11px] hover:bg-[#f6e9e9]"><Icon name="checkIssues" size={30} />Compact &amp; Repair Database</button>
                <div><h3 className="font-semibold">Compact &amp; Repair</h3><p className="text-[12px] text-gray-600">Help prevent and correct database file problems by using Compact and Repair.</p></div>
              </div>
              <div className="flex gap-4">
                {doc.encrypted ? (
                  <button type="button" onClick={() => commitClose(cmd("file.protect", "Decrypt Database"))} className="flex h-24 w-28 shrink-0 flex-col items-center justify-center gap-1 border border-gray-300 text-center text-[11px] hover:bg-[#f6e9e9]"><Icon name="protect" size={30} />Decrypt Database</button>
                ) : (
                  <button type="button" onClick={() => setPw({ a: "", b: "" })} className="flex h-24 w-28 shrink-0 flex-col items-center justify-center gap-1 border border-gray-300 text-center text-[11px] hover:bg-[#f6e9e9]"><Icon name="protect" size={30} />Encrypt with Password</button>
                )}
                <div><h3 className="font-semibold">{doc.encrypted ? "Decrypt Database" : "Encrypt with Password"}</h3><p className="text-[12px] text-gray-600">{doc.encrypted ? "This database is encrypted. Remove the database password." : "Use a password to restrict access to your database. Files that use the 2007 Microsoft Access file format or later are encrypted."}</p></div>
              </div>
              <p className="text-[12px] text-[#0063b1]">View and edit database properties</p>
            </div>
          </section>
        )}
        {page === "saveAs" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Save As</h2>
            <div className="flex gap-6">
              <div className="w-52">
                <h3 className="mb-1 border-b pb-1 text-[13px] font-semibold">File Types</h3>
                {(["db", "object"] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setSaveKind(k)} className={`flex w-full items-center gap-2 px-2 py-2 text-left ${saveKind === k ? "bg-[#f1dada]" : "hover:bg-gray-100"}`}>
                    <AccIcon name={k === "db" ? "accdb" : "table"} size={18} />
                    {k === "db" ? "Save Database As" : "Save Object As"}
                  </button>
                ))}
              </div>
              <div className="max-w-xl flex-1">
                {saveKind === "db" ? (
                  <>
                    <h3 className="mb-1 border-b pb-1 text-[13px] font-semibold">Database File Types</h3>
                    <div className="mb-3 grid grid-cols-2 gap-1">
                      {dbTypes.map((t) => (
                        <button key={t.name} type="button" onClick={() => setDbFmt(t.name)} className={`flex flex-col px-2 py-1.5 text-left ${dbFmt === t.name ? "bg-[#f1dada]" : "hover:bg-gray-100"}`}>
                          <span className="font-semibold">{t.name}</span>
                          <span className="text-[11px] text-gray-600">{t.desc}</span>
                        </button>
                      ))}
                    </div>
                    <h3 className="mb-1 border-b pb-1 text-[13px] font-semibold">Advanced</h3>
                    <div className="grid grid-cols-2 gap-1">
                      {advanced.map((t) => (
                        <button key={t.name} type="button" onClick={() => setDbFmt(t.name)} className={`flex flex-col px-2 py-1.5 text-left ${dbFmt === t.name ? "bg-[#f1dada]" : "hover:bg-gray-100"}`}>
                          <span className="font-semibold">{t.name}</span>
                          <span className="text-[11px] text-gray-600">{t.desc}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="mb-1 border-b pb-1 text-[13px] font-semibold">Database File Types</h3>
                    {[{ name: "Save Object As", desc: "Save the current database object as a new object." }, { name: "PDF or XPS", desc: "Publish a copy of the object as a PDF or XPS file." }].map((t) => (
                      <button key={t.name} type="button" onClick={() => setObjFmt(t.name)} className={`flex w-full flex-col px-2 py-1.5 text-left ${objFmt === t.name ? "bg-[#f1dada]" : "hover:bg-gray-100"}`}>
                        <span className="font-semibold">{t.name}</span>
                        <span className="text-[11px] text-gray-600">{t.desc}</span>
                      </button>
                    ))}
                    {!tab && <p className="mt-2 text-[12px] text-gray-500">Open an object first to save it as a new object.</p>}
                  </>
                )}
                <button type="button" onClick={doSaveAs} className="mt-4 flex flex-col items-center gap-1 border border-gray-300 px-6 py-2 text-[12px] hover:bg-[#f6e9e9]">
                  <Icon name="folder" size={28} />
                  Save As
                </button>
              </div>
            </div>
          </section>
        )}
        {page === "print" && (
          <section>
            <h2 className="mb-4 text-2xl font-light">Print</h2>
            <div className="flex max-w-xl flex-col gap-4">
              {[
                { t: "Quick Print", d: "Send the object directly to the default printer without making changes.", go: () => commitClose({ kind: "dialog", id: "file.print", values: { printer: "BEOC-Lab-Printer on 14BP", range: "All", copies: 1 } }) },
                { t: "Print", d: "Select a printer, number of copies, and other printing options before printing.", go: () => setPrintDlg(true) },
                { t: "Print Preview", d: "Preview and make changes to pages before printing.", go: () => commitClose(cmd("view.switch", "Print Preview")) },
              ].map((x) => (
                <div key={x.t} className="flex gap-4">
                  <button type="button" onClick={x.go} className="flex h-20 w-24 shrink-0 flex-col items-center justify-center gap-1 border border-gray-300 text-[11px] hover:bg-[#f6e9e9]"><Icon name={x.t === "Print Preview" ? "preview" : "print"} size={28} />{x.t}</button>
                  <div><h3 className="font-semibold">{x.t}</h3><p className="text-[12px] text-gray-600">{x.d}</p></div>
                </div>
              ))}
            </div>
          </section>
        )}
        {page === "account" && (
          <section className="text-[12px]">
            <h2 className="mb-4 text-2xl font-light">Account</h2>
            <p className="font-semibold">User Information</p>
            <p>BEOC Student · student@beoc.example</p>
            <p className="mt-4 font-semibold">Product Information</p>
            <p>Microsoft 365 Apps (training simulation) · Access</p>
          </section>
        )}
        {page === "options" && (
          <Win
            title="Access Options"
            width={640}
            onClose={() => setPage("home")}
            bodyClass="p-0"
            footer={
              <>
                <Btn
                  primary
                  onClick={() => {
                    const before = { appTitle: doc.options?.appTitle ?? "", displayForm: doc.options?.displayForm ?? "(none)", compact: Boolean(doc.options?.compactOnClose) };
                    if (opts.displayForm !== before.displayForm) onCommit(cmd("file.options", `Display Form: ${opts.displayForm}`));
                    if (opts.appTitle !== before.appTitle) onCommit(cmd("file.options", `Application Title: ${opts.appTitle}`));
                    if (opts.compact !== before.compact) onCommit(cmd("file.options", `Compact on Close: ${opts.compact ? "Yes" : "No"}`));
                    onClose();
                  }}
                >
                  OK
                </Btn>
                <Btn onClick={() => setPage("home")}>Cancel</Btn>
              </>
            }
          >
            <div className="flex min-h-[320px]">
              <div className="w-44 shrink-0 border-r border-gray-200 bg-white py-1">
                {["General", "Current Database", "Datasheet", "Object Designers", "Proofing", "Language", "Client Settings", "Customize Ribbon", "Quick Access Toolbar", "Add-ins", "Trust Center"].map((c) => (
                  <button key={c} type="button" onClick={() => setOpts({ ...opts, cat: c })} className={`block w-full px-3 py-1 text-left ${opts.cat === c ? "bg-[#f1dada]" : "hover:bg-gray-100"}`}>{c}</button>
                ))}
              </div>
              <div className="flex-1 bg-white p-4">
                {opts.cat === "Current Database" ? (
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">Options for the current database.</p>
                    <p className="border-b pb-1 font-semibold">Application Options</p>
                    <label className="flex items-center gap-2"><span className="w-32">Application Title:</span><TextIn ariaLabel="Application Title" value={opts.appTitle} onChange={(v) => setOpts({ ...opts, appTitle: v })} width={240} /></label>
                    <label className="flex items-center gap-2"><span className="w-32">Display Form:</span><Combo ariaLabel="Display Form" value={opts.displayForm} options={["(none)", ...doc.forms.filter((f) => f.saved !== false).map((f) => f.name)]} onChange={(v) => setOpts({ ...opts, displayForm: v })} width={240} /></label>
                    <Check checked label="Display Status Bar" onChange={() => undefined} />
                    <p className="mt-1">Document Window Options</p>
                    <label className="ml-4 flex items-center gap-1.5"><input type="radio" name="dwo" readOnly /> Overlapping Windows</label>
                    <label className="ml-4 flex items-center gap-1.5"><input type="radio" name="dwo" checked readOnly /> Tabbed Documents</label>
                    <Check checked={opts.compact} label="Compact on Close" onChange={(v) => setOpts({ ...opts, compact: v })} />
                    <p className="mt-1 border-b pb-1 font-semibold">Navigation</p>
                    <Check checked label="Display Navigation Pane" onChange={() => undefined} />
                  </div>
                ) : (
                  <p className="text-gray-600">General options for working with Access. Choose Current Database to set startup options for this database.</p>
                )}
              </div>
            </div>
          </Win>
        )}
        {blank && <BlankDbPanel location={loc} onCancel={() => setBlank(false)} onCreate={(n) => { setBlank(false); commitClose(cmd("file.new", n.trim())); }} />}
        {pw && (
          <Win
            title="Set Database Password"
            width={300}
            onClose={() => setPw(null)}
            footer={
              <>
                <Btn primary onClick={() => {
                  if (!pw.a) { setPw({ ...pw, err: "Enter a password." }); return; }
                  if (pw.a !== pw.b) { setPw({ ...pw, err: "Verification failed. Please retype the password in the Verify box." }); return; }
                  setPw(null);
                  commitClose(cmd("file.protect", "Encrypt with Password"));
                }}>OK</Btn>
                <Btn onClick={() => setPw(null)}>Cancel</Btn>
              </>
            }
          >
            <label className="mb-2 flex flex-col gap-0.5">Password:<TextIn ariaLabel="Password" password value={pw.a} onChange={(v) => setPw({ ...pw, a: v })} /></label>
            <label className="flex flex-col gap-0.5">Verify:<TextIn ariaLabel="Verify" password value={pw.b} onChange={(v) => setPw({ ...pw, b: v })} /></label>
            {pw.err && <p className="mt-2 text-[#c42b1c]">{pw.err}</p>}
          </Win>
        )}
        {fileDlg && (
          <SaveFileDialog
            title={fileDlg.title}
            defaultName={fileDlg.name}
            ext={fileDlg.ext}
            folder={fileDlg.format === "Back Up Database" ? loc : loc}
            onCancel={() => setFileDlg(null)}
            onSave={(n, folder) => {
              const f = fileDlg;
              setFileDlg(null);
              commitClose({ kind: "dialog", id: "file.saveAs", values: { format: f.format, name: n.replace(/\.(accdb|mdb|accdt|accde|pdf)$/i, ""), location: folder } });
            }}
          />
        )}
        {printDlg && <PrintDialog onCancel={() => setPrintDlg(false)} onOk={(v) => { setPrintDlg(false); commitClose({ kind: "dialog", id: "file.print", values: v }); }} />}
      </div>
    </div>
  );
}

export function PrintDialog({ onOk, onCancel }: { onOk: (v: Record<string, SimValue>) => void; onCancel: () => void }) {
  const [printer, setPrinter] = useState("BEOC-Lab-Printer on 14BP");
  const [range, setRange] = useState("All");
  const [copies, setCopies] = useState(1);
  return (
    <Win title="Print" width={440} onClose={onCancel} footer={<><Btn primary onClick={() => onOk({ printer, range, copies })}>OK</Btn><Btn onClick={onCancel}>Cancel</Btn></>}>
      <fieldset className="mb-2 border border-gray-300 p-2">
        <legend className="px-1">Printer</legend>
        <label className="flex items-center gap-2">Name: <Combo ariaLabel="Printer Name" value={printer} options={["BEOC-Lab-Printer on 14BP", "Microsoft Print to PDF", "Front Desk HP LaserJet"]} onChange={setPrinter} width={260} /></label>
      </fieldset>
      <div className="flex gap-2">
        <fieldset className="flex-1 border border-gray-300 p-2">
          <legend className="px-1">Print Range</legend>
          {["All", "Pages", "Selected Record(s)"].map((r) => <label key={r} className="flex items-center gap-1.5"><input type="radio" name="pr" checked={range === r} onChange={() => setRange(r)} />{r}</label>)}
        </fieldset>
        <fieldset className="flex-1 border border-gray-300 p-2">
          <legend className="px-1">Copies</legend>
          <label className="flex items-center gap-2">Number of Copies: <input aria-label="Number of Copies" type="number" min={1} value={copies} onChange={(e) => setCopies(Number(e.target.value) || 1)} onKeyDown={(e) => e.stopPropagation()} className="w-14 border border-gray-400 px-1" /></label>
        </fieldset>
      </div>
    </Win>
  );
}
