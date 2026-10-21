"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import type { TeamsFile } from "./types";
import { FileIcon, FolderIcon, TIcon } from "./icons";
import { findChannel, findFile, personName, serializeForm } from "./model";
import { Field, Modal, PersonAvatar, PrimaryBtn, RichText, SecondaryBtn, inputCls, useAccepted, useTeams } from "./TeamsShared";

/* ------------------------------------------------------------------ */
/* Pickers and dialogs                                                 */
/* ------------------------------------------------------------------ */

export function UploadPicker({ onPick, onClose }: { onPick: (name: string) => void; onClose: () => void }) {
  const { doc, overlayRoot } = useTeams();
  const [sel, setSel] = useState<string | null>(null);
  const files = doc.localFiles ?? [];
  const node = (
    <div className="absolute inset-0 z-[95] flex items-center justify-center bg-black/25" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label="Open" className="w-[560px] overflow-hidden rounded-md border border-[#c8c8c8] bg-white text-[13px] shadow-2xl">
        <div className="flex items-center justify-between bg-[#f3f3f3] px-3 py-2">
          <span>Open</span>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded p-0.5 hover:bg-[#e0e0e0]">
            <TIcon name="close" size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2 border-b border-[#e5e5e5] px-3 py-2 text-[12px] text-[#424242]">
          <TIcon name="back" size={14} /> <TIcon name="fwd" size={14} />
          <span className="flex-1 rounded border border-[#d1d1d1] px-2 py-0.5">This PC › Documents</span>
        </div>
        <div className="flex h-[260px]">
          <div className="w-36 shrink-0 border-r border-[#e5e5e5] bg-[#fafafa] py-2 text-[12px] text-[#424242]">
            {["Desktop", "Documents", "Downloads", "Pictures"].map((f) => (
              <div key={f} className={`flex items-center gap-1.5 px-3 py-1 ${f === "Documents" ? "bg-[#e5f1fb]" : ""}`}>
                <TIcon name="folder" size={14} /> {f}
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-auto">
            <div className="flex border-b border-[#e5e5e5] px-3 py-1 text-[11px] text-[#616161]">
              <span className="flex-1">Name</span>
              <span className="w-20">Size</span>
            </div>
            {files.map((f) => (
              <button
                key={f.name}
                type="button"
                aria-label={f.name}
                aria-selected={sel === f.name}
                onClick={() => setSel(f.name)}
                onDoubleClick={() => onPick(f.name)}
                className={`flex w-full items-center gap-2 px-3 py-1 text-left ${sel === f.name ? "bg-[#cce8ff]" : "hover:bg-[#e5f3ff]"}`}
              >
                <FileIcon name={f.name} size={16} />
                <span className="flex-1 truncate">{f.name}</span>
                <span className="w-20 text-[#616161]">{f.size ?? ""}</span>
              </button>
            ))}
            {!files.length && <div className="p-4 text-[#616161]">This folder is empty.</div>}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-[#e5e5e5] bg-[#f3f3f3] px-3 py-2">
          <span>File name:</span>
          <input aria-label="File name" readOnly value={sel ?? ""} className="flex-1 rounded border border-[#d1d1d1] bg-white px-2 py-0.5" />
          <button type="button" disabled={!sel} onClick={() => sel && onPick(sel)} className="rounded border border-[#0067c0] bg-[#0067c0] px-4 py-1 text-white disabled:opacity-50">
            Open
          </button>
          <button type="button" onClick={onClose} className="rounded border border-[#d1d1d1] bg-white px-4 py-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
  return overlayRoot ? createPortal(node, overlayRoot) : node;
}

const LINK_OPTIONS = (org: string) => ["Anyone with the link", `People in ${org}`, "People with existing access", "People you choose"];

export function ShareDialog({ file, onClose }: { file: TeamsFile; onClose: () => void }) {
  const { doc, act } = useTeams();
  const org = doc.org ?? "Contoso";
  const [ids, setIds] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [link, setLink] = useState(`People in ${org}`);
  const [perm, setPerm] = useState("Can edit");
  const [msg, setMsg] = useState("");
  const [settings, setSettings] = useState(false);
  const [draftLink, setDraftLink] = useState(link);
  const [draftPerm, setDraftPerm] = useState(perm);
  const accepted = useAccepted(doc);
  const matches = q.trim() ? doc.people.filter((p) => !ids.includes(p.id) && p.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5) : [];
  const commit = (action: "Send" | "Copy link") => {
    const value = serializeForm([
      ["People", ids.map((i) => personName(doc, i)).sort().join("; ")],
      ["Link", link],
      ["Permission", perm],
      ["Message", msg.trim()],
      ["Action", action],
    ]);
    accepted(() => act(`share:${file.id}`, { kind: "type", target: `share:${file.id}`, value }), onClose);
  };
  if (settings)
    return (
      <Modal
        title="Link settings"
        onClose={() => setSettings(false)}
        width={420}
        footer={
          <>
            <SecondaryBtn onClick={() => setSettings(false)}>Cancel</SecondaryBtn>
            <PrimaryBtn
              onClick={() => {
                setLink(draftLink);
                setPerm(draftPerm);
                setSettings(false);
              }}
            >
              Apply
            </PrimaryBtn>
          </>
        }
      >
        <div className="mb-2 text-[13px] font-semibold">Share the link with</div>
        <div className="mb-4 space-y-1">
          {LINK_OPTIONS(org).map((o) => (
            <label key={o} className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-[14px] ${draftLink === o ? "border-[#5b5fc7] bg-[#f0f1fd]" : "border-[#e0e0e0]"}`}>
              <input type="radio" name="tm-link" checked={draftLink === o} onChange={() => setDraftLink(o)} aria-label={o} />
              <TIcon name={o.startsWith("Anyone") ? "globe" : o.startsWith("People in") ? "teams" : o.startsWith("People with") ? "lock" : "people"} size={16} />
              {o}
            </label>
          ))}
        </div>
        <Field label="More settings">
          <select aria-label="Link permission" value={draftPerm} onChange={(e) => setDraftPerm(e.target.value)} className={inputCls}>
            <option>Can edit</option>
            <option>Can view</option>
          </select>
        </Field>
      </Modal>
    );
  return (
    <Modal title={`Share "${file.name}"`} onClose={onClose} width={480}>
      <div className="relative mb-3">
        <div className="flex flex-wrap items-center gap-1.5 rounded-[4px] border border-[#d1d1d1] px-2 py-1.5">
          {ids.map((id) => (
            <span key={id} className="flex items-center gap-1 rounded-full bg-[#ebebeb] py-0.5 pl-0.5 pr-2 text-[13px]">
              <PersonAvatar id={id} size={18} showPresence={false} />
              {personName(doc, id)}
              <button type="button" aria-label={`Remove ${personName(doc, id)}`} onClick={() => setIds(ids.filter((x) => x !== id))}>
                <TIcon name="close" size={12} />
              </button>
            </span>
          ))}
          <input aria-label="Add a name, group, or email" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && matches[0]) { setIds([...ids, matches[0].id]); setQ(""); } }} placeholder="Add a name, group, or email" className="min-w-[140px] flex-1 text-[14px] outline-none" />
        </div>
        {matches.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg">
            {matches.map((p) => (
              <button key={p.id} type="button" onClick={() => { setIds([...ids, p.id]); setQ(""); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]">
                <PersonAvatar id={p.id} size={24} /> {p.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <textarea aria-label="Add a message" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Add a message (optional)" rows={2} className={`${inputCls} mb-3 resize-none`} />
      <button
        type="button"
        aria-label="Link settings"
        onClick={() => {
          setDraftLink(link);
          setDraftPerm(perm);
          setSettings(true);
        }}
        className="mb-4 flex w-full items-center gap-2 rounded-md bg-[#f5f5f5] px-3 py-2 text-left text-[13px] hover:bg-[#ebebeb]"
      >
        <TIcon name={link.startsWith("Anyone") ? "globe" : "teams"} size={16} />
        <span className="flex-1">
          {link} {perm === "Can view" ? "can view" : "can edit"}
        </span>
        <TIcon name="gear" size={16} />
      </button>
      <div className="flex justify-end gap-2 pb-3">
        <SecondaryBtn onClick={() => commit("Copy link")}>
          <span className="flex items-center gap-1.5">
            <TIcon name="link" size={14} /> Copy link
          </span>
        </SecondaryBtn>
        <PrimaryBtn onClick={() => commit("Send")} disabled={!ids.length}>
          Send
        </PrimaryBtn>
      </div>
    </Modal>
  );
}

function MoveDialog({ file, onClose }: { file: TeamsFile; onClose: () => void }) {
  const { doc, cmd } = useTeams();
  const accepted = useAccepted(doc);
  const [dest, setDest] = useState("root");
  const folders = (doc.files ?? []).filter((f) => f.isFolder && f.id !== file.id && !f.folder.startsWith("ch:"));
  const depth = (f: TeamsFile): number => (f.folder === "root" ? 1 : 1 + depth(folders.find((x) => x.id === f.folder) ?? { ...f, folder: "root" }));
  const ordered: TeamsFile[] = [];
  const walk = (parent: string) => {
    for (const f of folders.filter((x) => x.folder === parent).sort((a, b) => a.name.localeCompare(b.name))) {
      ordered.push(f);
      walk(f.id);
    }
  };
  walk("root");
  return (
    <Modal
      title={`Move "${file.name}"`}
      onClose={onClose}
      width={420}
      footer={
        <>
          <SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>
          <PrimaryBtn onClick={() => accepted(() => cmd(`file:${file.id}`, "files.move", dest), onClose)}>Move here</PrimaryBtn>
        </>
      }
    >
      <div className="max-h-64 overflow-auto rounded-md border border-[#e0e0e0] py-1">
        <button type="button" aria-label="My files" onClick={() => setDest("root")} className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] ${dest === "root" ? "bg-[#e8ebfa]" : "hover:bg-[#f5f5f5]"}`}>
          <TIcon name="onedrive" size={16} /> My files
        </button>
        {ordered.map((f) => (
          <button key={f.id} type="button" aria-label={f.name} onClick={() => setDest(f.id)} className={`flex w-full items-center gap-2 py-1.5 pr-3 text-left text-[13px] ${dest === f.id ? "bg-[#e8ebfa]" : "hover:bg-[#f5f5f5]"}`} style={{ paddingLeft: 12 + depth(f) * 16 }}>
            <FolderIcon size={18} /> {f.name}
          </button>
        ))}
      </div>
    </Modal>
  );
}

export function FileViewer() {
  const { doc, act, cmd, openMenu } = useTeams();
  const id = doc.flags?.viewing as string | undefined;
  const f = id ? findFile(doc, id) : undefined;
  const [comments, setComments] = useState(false);
  const [text, setText] = useState("");
  const accepted = useAccepted(doc);
  if (!f) return null;
  const office = /\.(docx|xlsx|pptx)$/i.test(f.name);
  const appName = /\.xlsx$/i.test(f.name) ? "Excel" : /\.pptx$/i.test(f.name) ? "PowerPoint" : "Word";
  const post = () => text.trim() && accepted(() => act(`comment:${f.id}`, { kind: "type", target: `comment:${f.id}`, value: text.trim() }), () => setText(""));
  return (
    <div className="absolute inset-0 z-[75] flex flex-col bg-[#f5f5f5]" role="dialog" aria-label={f.name}>
      <div className="flex h-12 items-center gap-3 border-b border-[#e0e0e0] bg-white px-4">
        <FileIcon name={f.name} size={22} />
        <span className="flex-1 truncate font-semibold">{f.name}</span>
        {(f.editors ?? []).length > 0 && (
          <span className="flex items-center gap-1" aria-label={`Also editing: ${(f.editors ?? []).map((e) => personName(doc, e)).join(", ")}`} title={`Also editing: ${(f.editors ?? []).map((e) => personName(doc, e)).join(", ")}`}>
            {(f.editors ?? []).map((e) => (
              <span key={e} className="rounded-full ring-2 ring-[#5b5fc7]">
                <PersonAvatar id={e} size={26} showPresence={false} />
              </span>
            ))}
          </span>
        )}
        <span className="text-[12px] text-[#616161]">Edited {f.modified ?? ""}</span>
        {office && (
          <>
            <button type="button" aria-label="Comments" aria-pressed={comments} onClick={() => setComments((x) => !x)} className={`flex items-center gap-1 rounded-[4px] border px-3 py-1 text-[13px] font-semibold ${comments ? "border-[#5b5fc7] bg-[#e8ebfa] text-[#5b5fc7]" : "border-[#d1d1d1] hover:bg-[#f5f5f5]"}`}>
              <TIcon name="chat" size={14} /> Comments
            </button>
            <button
              type="button"
              aria-label="Open in"
              onClick={(e) =>
                openMenu(
                  e.currentTarget.getBoundingClientRect(),
                  [
                    { label: `Open in ${appName} desktop app`, icon: "popout", onClick: () => cmd(`file:${f.id}`, "files.openIn", "Desktop app") },
                    { label: "Open in browser", icon: "globe", onClick: () => cmd(`file:${f.id}`, "files.openIn", "Browser") },
                  ],
                  240,
                )
              }
              className="flex items-center gap-1 rounded-[4px] border border-[#d1d1d1] px-3 py-1 text-[13px] font-semibold hover:bg-[#f5f5f5]"
            >
              Open <TIcon name="chevronDown" size={12} />
            </button>
          </>
        )}
        <button type="button" aria-label="Close" onClick={() => cmd(`file:${f.id}`, "files.close")} className="flex items-center gap-1 rounded-[4px] border border-[#d1d1d1] px-3 py-1 text-[13px] font-semibold hover:bg-[#f5f5f5]">
          Close
        </button>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex flex-1 justify-center overflow-auto p-6">
          <div className="min-h-[420px] w-full max-w-[640px] bg-white p-10 text-[14px] leading-relaxed shadow">
            <h2 className="mb-4 text-[20px] font-semibold">{f.name.replace(/\.[^.]+$/, "")}</h2>
            <p className="whitespace-pre-line text-[#424242]">{f.preview ?? "Preview of this file."}</p>
          </div>
        </div>
        {comments && (
          <div className="flex w-[300px] shrink-0 flex-col border-l border-[#e0e0e0] bg-white" aria-label="Comments pane">
            <div className="px-4 py-3 text-[14px] font-semibold">Comments</div>
            <div className="min-h-0 flex-1 space-y-2 overflow-auto px-4">
              {(f.comments ?? []).map((c, i) => (
                <div key={i} className="rounded-md border border-[#e0e0e0] p-2 text-[13px]">
                  <div className="mb-0.5 flex items-center gap-1.5 text-[12px] font-semibold">
                    <PersonAvatar id={c.from} size={18} showPresence={false} /> {personName(doc, c.from)}
                  </div>
                  <RichText text={c.text} />
                </div>
              ))}
              {!(f.comments ?? []).length && <p className="text-[12px] text-[#616161]">No comments yet.</p>}
            </div>
            <div className="border-t border-[#ebebeb] p-3">
              <textarea
                aria-label="Add a comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    post();
                  }
                }}
                rows={2}
                placeholder="Add a comment. Use @ to mention someone."
                className={`${inputCls} resize-none`}
              />
              <div className="mt-2 flex justify-end">
                <PrimaryBtn disabled={!text.trim()} onClick={post}>
                  Post
                </PrimaryBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function fileMenuItems(ctx: ReturnType<typeof useTeams>, f: TeamsFile, opts: { channel?: boolean; onRename?: () => void; onShare?: () => void; onMove?: () => void }) {
  const key = `file:${f.id}`;
  return [
    { label: "Open", icon: "popout", onClick: () => (f.isFolder ? ctx.go({ folder: f.id, selection: `folder:${f.id}` }) : ctx.cmd(key, "files.open", f.id)) },
    ...(opts.onShare ? [{ label: "Share", icon: "share", onClick: opts.onShare }] : []),
    { label: "Copy link", icon: "link", onClick: () => ctx.cmd(key, "files.copyLink") },
    ...(opts.channel ? [{ label: f.pinned ? "Unpin" : "Pin to top", icon: "pin", onClick: () => ctx.cmd(key, "files.pin") }] : []),
    ...(opts.onRename ? [{ label: "Rename", icon: "edit", onClick: opts.onRename }] : []),
    ...(opts.onMove ? [{ label: "Move to", icon: "fwd", onClick: opts.onMove }] : []),
    ...(!f.isFolder ? [{ label: "Download", icon: "download", onClick: () => ctx.cmd(key, "files.download") }] : []),
    { separator: true },
    { label: "Delete", icon: "trash", danger: true, onClick: () => ctx.cmd(key, "files.delete") },
  ];
}

function findChannelName(doc: ReturnType<typeof useTeams>["doc"], id: string) {
  return findChannel(doc, id)?.channel.name ?? "General";
}

/* ------------------------------------------------------------------ */
/* Channel Files tab                                                   */
/* ------------------------------------------------------------------ */

export function ChannelFiles({ channelId }: { channelId: string }) {
  const ctx = useTeams();
  const { doc, cmd, openMenu } = ctx;
  const [upload, setUpload] = useState(false);
  const [share, setShare] = useState<TeamsFile | null>(null);
  const [sub, setSub] = useState<"Files" | "Links">("Files");
  const files = (doc.files ?? []).filter((f) => f.folder === `ch:${channelId}`).sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || a.name.localeCompare(b.name));
  const links = (findChannel(doc, channelId)?.channel.posts ?? []).flatMap((p) => [p, ...(p.replies ?? [])]).flatMap((m) => (m.text.match(/https?:\/\/\S+/g) ?? []).map((u) => ({ u, from: m.from })));
  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-white">
      <div className="flex gap-2 px-5 pt-3">
        {(["Files", "Links"] as const).map((t) => (
          <button key={t} type="button" aria-pressed={sub === t} onClick={() => setSub(t)} className={`rounded-full border px-3 py-0.5 text-[12px] ${sub === t ? "border-[#5b5fc7] bg-[#e8ebfa] font-semibold text-[#5b5fc7]" : "border-[#d1d1d1]"}`}>
            {t}
          </button>
        ))}
      </div>
      {sub === "Links" ? (
        <div className="min-h-0 flex-1 overflow-auto px-5 py-3 text-[13px]">
          {links.map((l, i) => (
            <div key={i} className="flex items-center gap-2 border-b border-[#f5f5f5] py-2">
              <TIcon name="link" size={16} className="text-[#5b5fc7]" />
              <span className="flex-1 truncate">{l.u}</span>
              <span className="text-[#616161]">{personName(doc, l.from)}</span>
            </div>
          ))}
          {!links.length && <div className="py-10 text-center text-[#616161]">Links shared in this channel appear here.</div>}
        </div>
      ) : (
      <>
      <div className="flex h-11 shrink-0 items-center gap-1 border-b border-[#ebebeb] px-5 text-[13px]">
        <button type="button" aria-label="New" disabled className="flex items-center gap-1 rounded px-2 py-1 text-[#616161]">
          <TIcon name="plus" size={16} /> New <TIcon name="chevronDown" size={12} />
        </button>
        <button type="button" aria-label="Upload" onClick={(e) => openMenu(e.currentTarget.getBoundingClientRect(), [{ label: "Files", icon: "note", onClick: () => setUpload(true) }, { label: "Folder", icon: "folder", disabled: true }], 160)} className="flex items-center gap-1 rounded px-2 py-1 hover:bg-[#f5f5f5]">
          <TIcon name="upload" size={16} /> Upload <TIcon name="chevronDown" size={12} />
        </button>
        <span className="flex items-center gap-1 px-2 py-1 text-[#616161]">
          <TIcon name="view" size={16} /> Edit in grid view
        </span>
        <div className="flex-1" />
        <span className="text-[12px] text-[#616161]">Documents › {findChannelName(doc, channelId)}</span>
        <button type="button" aria-label="Open in SharePoint" onClick={() => cmd(`files:${channelId}`, "files.openIn", "SharePoint")} className="ml-2 flex items-center gap-1 rounded px-2 py-1 text-[#424242] hover:bg-[#f5f5f5]">
          <TIcon name="globe" size={14} /> Open in SharePoint
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-5">
        <div className="flex border-b border-[#ebebeb] py-2 text-[12px] text-[#616161]">
          <span className="w-10" />
          <span className="flex-1">Name</span>
          <span className="w-32">Modified</span>
          <span className="w-40">Modified By</span>
          <span className="w-8" />
        </div>
        {files.map((f) => (
          <div key={f.id} className="group flex items-center border-b border-[#f5f5f5] py-2 text-[13px] hover:bg-[#fafafa]" onContextMenu={(e) => { e.preventDefault(); openMenu({ clientX: e.clientX, clientY: e.clientY }, fileMenuItems(ctx, f, { channel: true, onShare: () => setShare(f) })); }}>
            <span className="w-10">
              <FileIcon name={f.name} size={22} />
            </span>
            <button type="button" onClick={() => cmd(`file:${f.id}`, "files.open", f.id)} className="flex flex-1 items-center gap-1 truncate text-left hover:underline">
              {f.name}
              {f.pinned && <TIcon name="pin" size={12} className="text-[#5b5fc7]" />}
            </button>
            <span className="w-32 text-[#616161]">{f.modified ?? ""}</span>
            <span className="w-40 truncate text-[#616161]">{f.modifiedBy ?? ""}</span>
            <span className="w-8">
              <button type="button" aria-label={`More options for ${f.name}`} title="More options" onClick={(e) => openMenu(e.currentTarget.getBoundingClientRect(), fileMenuItems(ctx, f, { channel: true, onShare: () => setShare(f) }))} className="invisible rounded p-0.5 text-[#424242] hover:bg-[#ebebeb] group-hover:visible">
                <TIcon name="more" size={16} />
              </button>
            </span>
          </div>
        ))}
        {!files.length && <div className="py-10 text-center text-[13px] text-[#616161]">No files yet. Upload files to share them with the team.</div>}
      </div>
      </>
      )}
      {upload && (
        <UploadPicker
          onClose={() => setUpload(false)}
          onPick={(name) => {
            setUpload(false);
            cmd(`files:${channelId}`, "files.upload", name);
          }}
        />
      )}
      {share && <ShareDialog file={share} onClose={() => setShare(null)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* OneDrive                                                            */
/* ------------------------------------------------------------------ */

export function OneDriveView() {
  const ctx = useTeams();
  const { doc, ui, go, act, cmd, openMenu } = ctx;
  const folder = ui.folder ?? "root";
  const [upload, setUpload] = useState(false);
  const [newFolder, setNewFolder] = useState<string | null>(null);
  const [renaming, setRenaming] = useState<{ id: string; text: string } | null>(null);
  const [share, setShare] = useState<TeamsFile | null>(null);
  const [move, setMove] = useState<TeamsFile | null>(null);
  const acceptedNew = useAccepted(doc);
  const acceptedRename = useAccepted(doc);
  const all = (doc.files ?? []).filter((f) => !f.folder.startsWith("ch:"));
  const items = all.filter((f) => f.folder === folder).sort((a, b) => Number(Boolean(b.isFolder)) - Number(Boolean(a.isFolder)) || a.name.localeCompare(b.name));
  const crumbs: TeamsFile[] = [];
  let cur = all.find((f) => f.id === folder);
  while (cur) {
    crumbs.unshift(cur);
    const parent: string = cur.folder;
    cur = all.find((f) => f.id === parent);
  }
  const folderKey = `folder:${folder}`;

  return (
    <div className="flex min-w-0 flex-1">
      <div className="w-[200px] shrink-0 border-r border-[#e0e0e0] bg-[#f5f5f5] py-3 text-[14px]">
        <div className="mb-2 flex items-center gap-2 px-4 text-[16px] font-bold">
          <TIcon name="onedrive" size={20} className="text-[#0364b8]" /> OneDrive
        </div>
        {[
          ["home", "Home"],
          ["onedrive", "My files"],
          ["people", "Shared"],
          ["star", "Favorites"],
          ["trash", "Recycle bin"],
        ].map(([icon, label]) => (
          <button key={label} type="button" onClick={() => label === "My files" && go({ folder: "root", selection: "folder:root" })} className={`mx-2 flex w-[calc(100%-16px)] items-center gap-2 rounded-md px-2 py-1.5 text-left ${label === "My files" ? "bg-white font-semibold shadow-sm" : "text-[#424242] hover:bg-white/70"}`}>
            <TIcon name={icon} size={16} /> {label}
          </button>
        ))}
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex h-12 shrink-0 items-center gap-1 border-b border-[#ebebeb] px-5 text-[13px]">
          <button
            type="button"
            aria-label="Add new"
            onClick={(e) =>
              openMenu(
                e.currentTarget.getBoundingClientRect(),
                [
                  { label: "Folder", icon: "folder", onClick: () => setNewFolder("") },
                  { label: "Upload files", icon: "upload", onClick: () => setUpload(true) },
                ],
                180,
              )
            }
            className="flex items-center gap-1.5 rounded-[4px] bg-[#5b5fc7] px-3 py-1.5 font-semibold text-white hover:bg-[#4f52b2]"
          >
            <TIcon name="plus" size={16} /> Add new
          </button>
          <button type="button" aria-label="Upload" onClick={() => setUpload(true)} className="flex items-center gap-1 rounded px-2 py-1.5 hover:bg-[#f5f5f5]">
            <TIcon name="upload" size={16} /> Upload
          </button>
        </div>
        <div className="flex items-center gap-1 px-5 pt-3 text-[16px]">
          <button type="button" onClick={() => go({ folder: "root", selection: "folder:root" })} className={`rounded px-1 hover:bg-[#f5f5f5] ${crumbs.length ? "text-[#424242]" : "font-bold"}`}>
            My files
          </button>
          {crumbs.map((c, i) => (
            <span key={c.id} className="flex items-center gap-1">
              <TIcon name="chevronRight" size={14} className="text-[#616161]" />
              <button type="button" onClick={() => go({ folder: c.id, selection: `folder:${c.id}` })} className={`rounded px-1 hover:bg-[#f5f5f5] ${i === crumbs.length - 1 ? "font-bold" : "text-[#424242]"}`}>
                {c.name}
              </button>
            </span>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 pt-2">
          <div className="flex border-b border-[#ebebeb] py-2 text-[12px] text-[#616161]">
            <span className="w-10" />
            <span className="flex-1">Name</span>
            <span className="w-28">Modified</span>
            <span className="w-36">Modified By</span>
            <span className="w-48">Sharing</span>
            <span className="w-8" />
          </div>
          {newFolder !== null && (
            <div className="flex items-center gap-2 border-b border-[#f5f5f5] py-2">
              <span className="w-10">
                <FolderIcon size={22} />
              </span>
              <input
                autoFocus
                aria-label="Folder name"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setNewFolder(null);
                  if (e.key === "Enter" && newFolder.trim()) acceptedNew(() => act(`newfolder:${folder}`, { kind: "type", target: `newfolder:${folder}`, value: newFolder.trim() }), () => setNewFolder(null));
                }}
                placeholder="Enter your folder name"
                className={`${inputCls} max-w-[360px]`}
              />
              <PrimaryBtn disabled={!newFolder.trim()} onClick={() => acceptedNew(() => act(`newfolder:${folder}`, { kind: "type", target: `newfolder:${folder}`, value: newFolder.trim() }), () => setNewFolder(null))}>
                Create
              </PrimaryBtn>
              <SecondaryBtn onClick={() => setNewFolder(null)}>Cancel</SecondaryBtn>
            </div>
          )}
          {items.map((f) => {
            const menu = fileMenuItems(ctx, f, { onRename: () => setRenaming({ id: f.id, text: f.name }), onShare: () => setShare(f), onMove: () => setMove(f) });
            return (
              <div key={f.id} className="group flex items-center border-b border-[#f5f5f5] py-2 text-[13px] hover:bg-[#fafafa]" onContextMenu={(e) => { e.preventDefault(); openMenu({ clientX: e.clientX, clientY: e.clientY }, menu); }}>
                <span className="w-10">{f.isFolder ? <FolderIcon size={22} /> : <FileIcon name={f.name} size={22} />}</span>
                {renaming?.id === f.id ? (
                  <input
                    autoFocus
                    aria-label="Rename"
                    value={renaming.text}
                    onChange={(e) => setRenaming({ id: f.id, text: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setRenaming(null);
                      if (e.key === "Enter" && renaming.text.trim()) acceptedRename(() => act(`rename:${f.id}`, { kind: "type", target: `rename:${f.id}`, value: renaming.text.trim() }), () => setRenaming(null));
                    }}
                    onBlur={() => setRenaming(null)}
                    className={`${inputCls} mr-4 flex-1`}
                  />
                ) : (
                  <button type="button" onClick={() => (f.isFolder ? go({ folder: f.id, selection: `folder:${f.id}` }) : cmd(`file:${f.id}`, "files.open", f.id))} className="flex-1 truncate text-left hover:underline">
                    {f.name}
                  </button>
                )}
                <span className="w-28 text-[#616161]">{f.modified ?? ""}</span>
                <span className="w-36 truncate text-[#616161]">{f.modifiedBy ?? ""}</span>
                <span className="flex w-48 items-center gap-1 truncate text-[#616161]">
                  {f.sharing && f.sharing !== "Private" && <TIcon name={f.sharing.startsWith("Anyone") ? "globe" : "people"} size={14} />}
                  {f.sharing ?? "Private"}
                </span>
                <span className="flex w-8 items-center">
                  <button type="button" aria-label={`More options for ${f.name}`} title="More options" onClick={(e) => openMenu(e.currentTarget.getBoundingClientRect(), menu)} className="invisible rounded p-0.5 text-[#424242] hover:bg-[#ebebeb] group-hover:visible">
                    <TIcon name="more" size={16} />
                  </button>
                </span>
              </div>
            );
          })}
          {!items.length && newFolder === null && <div className="py-10 text-center text-[13px] text-[#616161]">This folder is empty. Select Add new to create a folder or upload files.</div>}
        </div>
        {upload && (
          <UploadPicker
            onClose={() => setUpload(false)}
            onPick={(name) => {
              setUpload(false);
              cmd(folderKey, "files.upload", name);
            }}
          />
        )}
        {share && <ShareDialog file={share} onClose={() => setShare(null)} />}
        {move && <MoveDialog file={move} onClose={() => setMove(null)} />}
        <FileViewer />
      </div>
    </div>
  );
}
