"use client";

import { useState } from "react";
import { FileIcon, OIcon } from "./icons";
import { baseOf, childrenOf, extOf, isFolder, isMine, itemOf, nameOf } from "./model";
import type { OdLocalFile } from "./types";
import { Avatar, Btn, BRAND, FONT, Modal, SidePanel, TextField, useOd } from "./ui";

/* ------------------------------------------------------------------ */
/* Small dialogs                                                       */
/* ------------------------------------------------------------------ */

export function RenameDialog({ fileId }: { fileId: string }) {
  const ctx = useOd();
  const it = itemOf(ctx.doc, fileId);
  const [name, setName] = useState(it?.name ?? "");
  if (!it) return null;
  const close = () => ctx.open(null);
  const ok = () => {
    let n = name.trim();
    if (!n) return;
    const ext = extOf(it.name);
    if (ext && !isFolder(it) && !extOf(n)) n = `${n}.${ext}`;
    ctx.commit("od.rename", { file: it.id, name: n });
    close();
  };
  return (
    <Modal title="Rename" onClose={close} width={420} footer={<><Btn kind="primary" onClick={ok} disabled={!name.trim()}>Rename</Btn><Btn onClick={close}>Cancel</Btn></>}>
      <TextField ariaLabel="Enter a name" label="Enter a name" value={name} onChange={setName} autoFocus onEnter={ok} />
      {/["*:<>?/\\|]/.test(name) && <p className="mt-2 text-[12px] text-[#c50f1f]">A name can't contain any of these characters: &quot; * : &lt; &gt; ? / \ |</p>}
    </Modal>
  );
}

export function NewFolderDialog({ parent }: { parent: string }) {
  const ctx = useOd();
  const [name, setName] = useState("");
  const close = () => ctx.open(null);
  const ok = () => {
    if (!name.trim()) return;
    ctx.commit("od.newFolder", { parent, name: name.trim() });
    close();
  };
  return (
    <Modal title="Create a folder" onClose={close} width={420} footer={<><Btn kind="primary" onClick={ok} disabled={!name.trim()}>Create</Btn><Btn onClick={close}>Cancel</Btn></>}>
      <TextField ariaLabel="Enter your folder name" placeholder="Enter your folder name" value={name} onChange={setName} autoFocus onEnter={ok} />
    </Modal>
  );
}

export function ConfirmDialog({ kind, files }: { kind: "delete" | "purge" | "emptyBin"; files: string[] }) {
  const ctx = useOd();
  const close = () => ctx.open(null);
  const n = files.length;
  const one = itemOf(ctx.doc, files[0]);
  const title = kind === "emptyBin" ? "Empty recycle bin?" : kind === "purge" ? "Permanently delete?" : "Delete?";
  const text =
    kind === "emptyBin"
      ? "All items in the recycle bin will be permanently deleted. You can't undo this."
      : kind === "purge"
        ? `${n === 1 ? `“${one?.name}”` : `These ${n} items`} will be permanently deleted. You can't undo this.`
        : `Are you sure you want to send ${n === 1 ? `“${one?.name}”` : `these ${n} items`} to the recycle bin?`;
  return (
    <Modal
      title={title}
      onClose={close}
      width={420}
      footer={
        <>
          <Btn
            kind={kind === "delete" ? "primary" : "danger"}
            onClick={() => {
              if (kind === "emptyBin") ctx.commit("od.emptyBin", {});
              else ctx.commit(kind === "purge" ? "od.purge" : "od.delete", { file: [...files].sort().join(",") });
              close();
            }}
          >
            {kind === "emptyBin" ? "Yes" : "Delete"}
          </Btn>
          <Btn onClick={close}>Cancel</Btn>
        </>
      }
    >
      <p className="text-[14px] text-[#424242]">{text}</p>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Upload: a Windows file picker                                       */
/* ------------------------------------------------------------------ */

export function UploadDialog({ folder, mode }: { folder: string; mode: "files" | "folder" }) {
  const ctx = useOd();
  const all = ctx.doc.computer ?? [];
  const list = all.filter((f) => (mode === "folder" ? f.folder : !f.folder));
  const [picked, setPicked] = useState<string[]>([]);
  const close = () => ctx.open(null);
  const ok = () => {
    if (!picked.length) return;
    ctx.commit("od.upload", { folder, file: [...picked].sort().join("; ") });
    close();
  };
  const pick = (f: OdLocalFile, e: React.MouseEvent) => {
    if (mode === "files" && (e.ctrlKey || e.metaKey)) setPicked((p) => (p.includes(f.name) ? p.filter((x) => x !== f.name) : [...p, f.name]));
    else setPicked([f.name]);
  };
  const dest = folder === "root" ? "My files" : itemOf(ctx.doc, folder)?.name ?? "OneDrive";
  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center bg-black/30">
      <div role="dialog" aria-label={mode === "folder" ? "Select Folder to Upload" : "Open"} className="flex h-[400px] w-[640px] flex-col rounded-lg border border-[#c8c6c4] bg-[#f3f3f3] shadow-2xl" style={{ fontFamily: FONT }}>
        <div className="flex h-9 items-center justify-between px-3 text-[12px]">
          <span>{mode === "folder" ? "Select Folder to Upload" : "Open"}</span>
          <button type="button" aria-label="Close" onClick={close} className="rounded px-2 py-1 hover:bg-[#e0e0e0]"><OIcon name="close" size={14} /></button>
        </div>
        <div className="mx-3 mb-2 flex h-8 items-center gap-2 rounded border border-[#d1d1d1] bg-white px-2 text-[12px] text-[#424242]">
          <OIcon name="pc" size={14} /> This PC <OIcon name="chevronRight" size={12} /> Documents
        </div>
        <div className="flex min-h-0 flex-1 gap-2 px-3">
          <div className="w-36 shrink-0 rounded bg-white p-1 text-[12px]">
            {["Desktop", "Documents", "Downloads", "Pictures"].map((l) => (
              <div key={l} className={`flex items-center gap-2 rounded px-2 py-1 ${l === "Documents" ? "bg-[#e0eaf5]" : ""}`}>
                <OIcon name={l === "Desktop" ? "desktop" : l === "Pictures" ? "pictures" : l === "Downloads" ? "download" : "documents"} size={14} /> {l}
              </div>
            ))}
          </div>
          <div className="min-w-0 flex-1 overflow-auto rounded bg-white" role="listbox" aria-label="Files on this PC" aria-multiselectable={mode === "files"}>
            <div className="sticky top-0 flex h-7 items-center border-b border-[#e0e0e0] bg-white px-2 text-[12px] text-[#616161]">
              <span className="flex-1">Name</span><span className="w-32">Date modified</span><span className="w-16 text-right">Size</span>
            </div>
            {list.map((f) => (
              <div
                key={f.name}
                role="option"
                aria-selected={picked.includes(f.name)}
                aria-label={f.name}
                onClick={(e) => pick(f, e)}
                onDoubleClick={() => { if (mode === "files") { ctx.commit("od.upload", { folder, file: f.name }); close(); } }}
                className={`flex h-7 cursor-default items-center px-2 text-[12px] ${picked.includes(f.name) ? "bg-[#cce4f7]" : "hover:bg-[#e5f1fb]"}`}
              >
                <span className="flex min-w-0 flex-1 items-center gap-2 truncate"><FileIcon kind={f.folder ? "folder" : extKind(f.name)} size={16} /> {f.name}</span>
                <span className="w-32 text-[#616161]">{f.modified ?? "10/19/2026 3:12 PM"}</span>
                <span className="w-16 text-right text-[#616161]">{f.folder ? "" : f.size ?? ""}</span>
              </div>
            ))}
            {!list.length && <p className="p-4 text-[12px] text-[#616161]">No {mode === "folder" ? "folders" : "files"} here.</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-3 text-[12px]">
          <span className="w-20 text-right">{mode === "folder" ? "Folder:" : "File name:"}</span>
          <div className="h-7 min-w-0 flex-1 truncate rounded border border-[#d1d1d1] bg-white px-2 leading-7">{picked.map((p) => (picked.length > 1 ? `"${p}"` : p)).join(" ")}</div>
          <span className="text-[#616161]">to {dest}</span>
        </div>
        <div className="flex justify-end gap-2 px-3 pb-3">
          <Btn kind="primary" onClick={ok} disabled={!picked.length}>{mode === "folder" ? "Upload" : "Open"}</Btn>
          <Btn onClick={close}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

function extKind(name: string) {
  const e = extOf(name);
  if (e === "docx" || e === "doc") return "word" as const;
  if (e === "xlsx" || e === "xls" || e === "csv") return "excel" as const;
  if (e === "pptx") return "powerpoint" as const;
  if (e === "pdf") return "pdf" as const;
  if (["jpg", "jpeg", "png", "heic"].includes(e)) return "image" as const;
  if (["mp4", "mov"].includes(e)) return "video" as const;
  return "text" as const;
}

/* ------------------------------------------------------------------ */
/* Move to / Copy to                                                   */
/* ------------------------------------------------------------------ */

export function PickPanel({ files, mode }: { files: string[]; mode: "move" | "copy" }) {
  const ctx = useOd();
  const { doc } = ctx;
  const [at, setAt] = useState("root");
  const moving = new Set(files);
  const folders = childrenOf(doc, at).filter((f) => isFolder(f) && !f.shortcutTo && f.kind !== "vault" && !moving.has(f.id) && isMine(doc, f));
  const vault = at === "root" ? childrenOf(doc, "root").find((f) => f.kind === "vault" && doc.vault?.locked === false) : undefined;
  const here = at === "root" ? "My files" : itemOf(doc, at)?.name ?? "My files";
  const parentOf = (id: string) => itemOf(doc, id)?.parent ?? "root";
  const first = itemOf(doc, files[0]);
  const close = () => ctx.open(null);
  const go = () => {
    ctx.commit(mode === "move" ? "od.move" : "od.copy", { file: [...files].sort().join(","), folder: at });
    close();
  };
  const same = mode === "move" && files.every((f) => (itemOf(doc, f)?.parent ?? "") === at);
  return (
    <SidePanel
      title={`${mode === "move" ? "Move" : "Copy"} ${files.length === 1 ? `“${first?.name}”` : `${files.length} items`}`}
      label={mode === "move" ? "Move to" : "Copy to"}
      onClose={close}
      footer={<><Btn kind="primary" onClick={go} disabled={same}>{mode === "move" ? "Move here" : "Copy here"}</Btn><Btn onClick={close}>Cancel</Btn></>}
    >
      <p className="mb-2 text-[13px] text-[#616161]">Choose a destination</p>
      <div className="mb-2 flex items-center gap-1 text-[14px] font-semibold">
        {at !== "root" && <button type="button" aria-label="Back" onClick={() => setAt(parentOf(at))} className="rounded p-1 hover:bg-[#f0f0f0]"><OIcon name="back" size={16} /></button>}
        <OIcon name="folder" size={16} color={BRAND} /> {here}
      </div>
      <div className="rounded border border-[#e0e0e0]" role="listbox" aria-label="Folders">
        {[...folders, ...(vault ? [vault] : [])].map((f) => (
          <button key={f.id} type="button" role="option" aria-selected={false} aria-label={f.name} onClick={() => setAt(f.id)} className="flex h-10 w-full items-center gap-3 border-b border-[#f0f0f0] px-3 text-left text-[14px] last:border-b-0 hover:bg-[#f5f5f5]">
            <FileIcon kind={f.kind} size={22} /> <span className="flex-1 truncate">{f.name}</span> <OIcon name="chevronRight" size={14} color="#616161" />
          </button>
        ))}
        {!folders.length && !vault && <p className="p-4 text-[13px] text-[#616161]">No folders here. Select {mode === "move" ? "Move here" : "Copy here"} to use {here}.</p>}
      </div>
    </SidePanel>
  );
}

/* ------------------------------------------------------------------ */
/* Version history                                                     */
/* ------------------------------------------------------------------ */

export function VersionsPanel({ fileId }: { fileId: string }) {
  const ctx = useOd();
  const { doc } = ctx;
  const it = itemOf(doc, fileId);
  const [peek, setPeek] = useState<string | null>(null);
  if (!it) return null;
  const close = () => ctx.open(null);
  const vers = it.versions ?? [];
  const pv = vers.find((v) => v.id === peek);
  return (
    <SidePanel title="Version history" label="Version history" onClose={close} width={420}>
      <p className="mb-3 truncate text-[13px] text-[#616161]">{it.name}</p>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="h-8 border-b border-[#e0e0e0] text-left text-[12px] text-[#616161]">
            <th className="font-semibold">Version</th>
            <th className="font-semibold">Modified</th>
            <th className="font-semibold">Modified by</th>
            <th className="w-8" />
          </tr>
        </thead>
        <tbody>
          <tr className="h-12 border-b border-[#f0f0f0] bg-[#f5f9fd]">
            <td className="font-semibold">{it.version ?? "1.0"}<div className="text-[11px] font-normal text-[#107c10]">Current version</div></td>
            <td>{it.modified}</td>
            <td className="truncate">{it.modifiedBy === doc.me.email || !it.modifiedBy ? doc.me.name : nameOf(doc, it.modifiedBy)}</td>
            <td />
          </tr>
          {/* Microsoft Support documents the ellipses (...) next to a version › Restore. It doesn't name the
              command that opens a version, so here selecting the version's date shows it read-only. */}
          {vers.map((v) => (
            <tr key={v.id} className="h-12 border-b border-[#f0f0f0]">
              <td>{v.label}</td>
              <td>
                <button type="button" aria-label={`View version ${v.label}, ${v.modified}`} data-peek={v.id} onClick={() => setPeek(v.id)} className="text-left text-[#0f6cbd] hover:underline">
                  {v.modified}
                </button>
              </td>
              <td className="truncate">{nameOf(doc, v.by)}</td>
              <td>
                <button
                  type="button"
                  aria-label={`More options for version ${v.label}`}
                  onClick={(e) =>
                    ctx.menu(e, [
                      { label: "Restore", icon: "restore", onClick: () => ctx.commit("od.restoreVersion", { file: it.id, version: v.id }) },
                    ])
                  }
                  className="rounded p-1 hover:bg-[#f0f0f0]"
                >
                  <OIcon name="more" size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!vers.length && <p className="mt-3 text-[13px] text-[#616161]">There are no earlier versions of this file yet.</p>}
      {pv && (
        <div className="mt-4 rounded-md border border-[#e0e0e0] p-3" aria-label={`Version ${pv.label} preview`}>
          <div className="mb-2 flex items-center">
            <span className="flex-1 text-[13px] font-semibold">Version {pv.label} (read-only)</span>
            <button type="button" aria-label="Close version preview" onClick={() => setPeek(null)} className="rounded p-1 hover:bg-[#f0f0f0]"><OIcon name="close" size={12} /></button>
          </div>
          {(pv.text ?? ["(No preview available)"]).map((t, i) => <p key={i} className="mb-1 text-[12px] text-[#424242]">{t}</p>)}
        </div>
      )}
    </SidePanel>
  );
}

/* ------------------------------------------------------------------ */
/* Personal Vault                                                      */
/* ------------------------------------------------------------------ */

export const VAULT_CODE = "482019";

export function VaultDialog() {
  const ctx = useOd();
  const [step, setStep] = useState<"intro" | "method" | "code">("intro");
  const [method, setMethod] = useState("Text");
  const [code, setCode] = useState("");
  const close = () => ctx.open(null);
  const masked = ctx.doc.me.email.replace(/^(.).*(@.*)$/, "$1•••••$2");
  return (
    <Modal title="Personal Vault" onClose={close} width={440} label="Personal Vault">
      <div className="flex flex-col items-center pb-2 text-center">
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#ebf3fc]"><OIcon name="shield" size={30} color={BRAND} /></span>
        {step === "intro" && (
          <>
            <p className="mb-4 text-[14px] text-[#424242]">Personal Vault is locked. To open it, verify your identity.</p>
            <Btn kind="primary" icon="unlock" onClick={() => setStep("method")}>Unlock</Btn>
          </>
        )}
        {step === "method" && (
          <div className="w-full text-left">
            <p className="mb-3 text-[14px] font-semibold">Verify your identity</p>
            {[
              { m: "Text", t: "Text •••-•••-4127" },
              { m: "Email", t: `Email ${masked}` },
              { m: "Authenticator app", t: "Use the Microsoft Authenticator app" },
            ].map((o) => (
              <label key={o.m} className="mb-2 flex items-center gap-2 rounded border border-[#e0e0e0] px-3 py-2 text-[14px]">
                <input type="radio" name="vault-method" aria-label={o.t} checked={method === o.m} onChange={() => setMethod(o.m)} /> {o.t}
              </label>
            ))}
            <div className="mt-3 flex justify-end"><Btn kind="primary" onClick={() => setStep("code")}>Next</Btn></div>
          </div>
        )}
        {step === "code" && (
          <div className="w-full text-left">
            <p className="mb-1 text-[14px] font-semibold">Enter code</p>
            <p className="mb-3 text-[12px] text-[#616161]">{method === "Authenticator app" ? "Enter the code shown in the Authenticator app." : `We sent a code by ${method.toLowerCase()}.`} (For this practice, the code is {VAULT_CODE}.)</p>
            <TextField ariaLabel="Code" value={code} onChange={setCode} autoFocus onEnter={() => { if (code.trim() === VAULT_CODE) { ctx.commit("od.vault", { action: "unlock", method }); close(); } }} />
            {code && code.trim() !== VAULT_CODE && code.length >= 6 && <p className="mt-1 text-[12px] text-[#c50f1f]">That code didn&apos;t work. Check it and try again.</p>}
            <div className="mt-3 flex justify-end">
              <Btn kind="primary" disabled={code.trim() !== VAULT_CODE} onClick={() => { ctx.commit("od.vault", { action: "unlock", method }); close(); }}>Verify</Btn>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Settings pane (gear)                                                */
/* ------------------------------------------------------------------ */

export function SettingsPane() {
  const ctx = useOd();
  const work = ctx.doc.account === "work";
  const close = () => ctx.open(null);
  return (
    <SidePanel title="Settings" label="Settings" onClose={close} width={320}>
      <div className="flex flex-col gap-1">
        {work ? (
          <>
            <button type="button" onClick={() => { close(); ctx.cmd("od.toast", "OneDrive settings: notifications and views"); }} className="rounded px-2 py-2 text-left text-[14px] text-[#0f6cbd] hover:bg-[#f5f5f5]">OneDrive settings</button>
            <button type="button" onClick={() => { close(); ctx.cmd("od.go", "restore"); }} className="rounded px-2 py-2 text-left text-[14px] text-[#0f6cbd] hover:bg-[#f5f5f5]">Restore OneDrive</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => { close(); ctx.cmd("od.go", "restore"); }} className="rounded px-2 py-2 text-left text-[14px] text-[#0f6cbd] hover:bg-[#f5f5f5]">Options</button>
            <button type="button" onClick={() => { close(); ctx.cmd("od.toast", "Plans and storage"); }} className="rounded px-2 py-2 text-left text-[14px] text-[#0f6cbd] hover:bg-[#f5f5f5]">Plans and storage</button>
          </>
        )}
        <div className="my-2 border-t border-[#e0e0e0]" />
        <p className="px-2 text-[12px] text-[#616161]">Signed in as {ctx.doc.me.email}</p>
      </div>
    </SidePanel>
  );
}

/* ------------------------------------------------------------------ */
/* Restore your OneDrive                                               */
/* ------------------------------------------------------------------ */

const PRESETS = ["Yesterday", "One week ago", "Three weeks ago", "Custom date and time"];
const PRESET_DAYS: Record<string, number> = { Yesterday: 1, "One week ago": 7, "Three weeks ago": 21 };

export function RestoreView() {
  const ctx = useOd();
  const { doc } = ctx;
  const acts = doc.activities ?? [];
  const [date, setDate] = useState("");
  const [from, setFrom] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const work = doc.account === "work";
  const chosen = new Set(
    date === "Custom date and time"
      ? from
        ? acts.slice(0, acts.findIndex((a) => a.id === from) + 1).map((a) => a.id)
        : []
      : date
        ? acts.filter((a) => a.daysAgo < PRESET_DAYS[date]).map((a) => a.id)
        : [],
  );
  const counts = Array.from({ length: 30 }, (_, d) => acts.filter((a) => a.daysAgo === 29 - d).length);
  const max = Math.max(1, ...counts);
  if (doc.restored) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center" onClick={(e) => e.stopPropagation()}>
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#dff6dd]"><OIcon name="check" size={28} color="#107c10" strokeWidth={2} /></span>
        <h2 className="mb-2 text-[20px] font-semibold">Your OneDrive was restored</h2>
        <p className="mb-4 max-w-md text-[14px] text-[#424242]">Files and folders were returned to how they were. Files created after the restore point were moved to the Recycle bin. To undo the restore, run Restore again and select the restore activity.</p>
        <Btn kind="primary" onClick={() => ctx.cmd("od.go", "root")}>Go to My files</Btn>
      </div>
    );
  }
  return (
    <div className="flex min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
      {!work && (
        <nav aria-label="Options" className="w-44 shrink-0 border-r border-[#e0e0e0] p-3 text-[13px]">
          <div className="mb-2 font-semibold">Options</div>
          {["Manage storage", "Plans and upgrades", "Restore your OneDrive", "Notifications"].map((o) => (
            <div key={o} className={`rounded px-2 py-1.5 ${o === "Restore your OneDrive" ? "bg-[#ebebeb] font-semibold" : "text-[#424242]"}`}>{o}</div>
          ))}
        </nav>
      )}
      <div className="min-w-0 flex-1 overflow-auto px-6 py-4">
        <h1 className="mb-2 text-[20px] font-semibold">Restore your OneDrive</h1>
        <p className="mb-4 max-w-2xl text-[13px] text-[#424242]">If something went wrong, you can restore your OneDrive to a previous time. Select a date, and then use the activity chart and feed to review recent activities you want to undo.</p>
        <label className="mb-4 flex items-center gap-3 text-[14px]">
          <span className="font-semibold">Select a date</span>
          <select aria-label="Select a date" value={date} onChange={(e) => { setDate(e.target.value); setFrom(null); }} onKeyDown={(e) => e.stopPropagation()} className="h-8 w-60 rounded border border-[#d1d1d1] px-2">
            <option value="">Select a date</option>
            {PRESETS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <div className="mb-1 flex h-20 items-end gap-[3px] border-b border-[#e0e0e0]" aria-label="Activity chart">
          {counts.map((c, i) => (
            <div key={i} className="flex-1 rounded-t-sm" title={`${c} activities`} style={{ height: `${(c / max) * 100}%`, minHeight: c ? 4 : 1, background: c ? (acts.some((a) => a.daysAgo === 29 - i && chosen.has(a.id)) ? "#0f6cbd" : "#9ec5ea") : "#e0e0e0" }} />
          ))}
        </div>
        <div className="mb-4 flex justify-between text-[11px] text-[#616161]"><span>30 days ago</span><span>Today</span></div>
        <div className="mb-2 text-[13px] font-semibold">Activity</div>
        <div className="mb-4 rounded border border-[#e0e0e0]" role="list" aria-label="Activity feed">
          {acts.map((a) => (
            <button
              key={a.id}
              type="button"
              role="listitem"
              aria-label={`${a.time}: ${a.text}`}
              disabled={date !== "Custom date and time"}
              onClick={() => setFrom(a.id)}
              className={`flex w-full items-center gap-3 border-b border-[#f0f0f0] px-3 py-2 text-left text-[13px] last:border-b-0 ${chosen.has(a.id) ? "bg-[#ebf3fc]" : ""} ${date === "Custom date and time" ? "hover:bg-[#f5f5f5]" : "cursor-default"}`}
            >
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${chosen.has(a.id) ? "border-[#0f6cbd] bg-[#0f6cbd]" : "border-[#8a8886]"}`}>{chosen.has(a.id) && <OIcon name="check" size={11} color="#fff" strokeWidth={2.2} />}</span>
              <span className="w-36 shrink-0 text-[#616161]">{a.time}</span>
              <span className="min-w-0 flex-1 truncate">{a.text}</span>
            </button>
          ))}
          {!acts.length && <p className="p-3 text-[13px] text-[#616161]">No recent activity.</p>}
        </div>
        {date === "Custom date and time" && <p className="mb-3 text-[12px] text-[#616161]">Select the earliest activity you want to undo. Everything after it is selected too.</p>}
        <Btn kind="primary" disabled={!chosen.size} onClick={() => setConfirm(true)}>Restore</Btn>
      </div>
      {confirm && (
        <Modal
          title="Restore your OneDrive?"
          onClose={() => setConfirm(false)}
          width={420}
          footer={
            <>
              <Btn kind="primary" onClick={() => { ctx.commit("od.restoreOneDrive", { date, from: from ?? "" }); setConfirm(false); }}>Restore</Btn>
              <Btn onClick={() => setConfirm(false)}>Cancel</Btn>
            </>
          }
        >
          <p className="text-[14px] text-[#424242]">{chosen.size} activit{chosen.size === 1 ? "y" : "ies"} will be undone. You can undo a restore by running Restore again.</p>
        </Modal>
      )}
    </div>
  );
}

export function personLine(name: string) {
  return <span className="flex items-center gap-2"><Avatar person={{ name }} size={20} /> {name}</span>;
}

export { baseOf };
