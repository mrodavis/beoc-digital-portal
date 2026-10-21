"use client";

import { useState } from "react";
import { FileIcon, OIcon } from "./icons";
import { locationLabel, nameOf, personOf } from "./model";
import type { OdComment, OdItem } from "./types";
import { Avatar, Btn, colorFor, FONT, useOd } from "./ui";
import { BrowserFrame } from "./Web";

const WORD_BLUE = "#185abd";

/** A file opened from OneDrive: Word for the web, the Word app, or a preview. */
export function Viewer() {
  const ctx = useOd();
  const { doc } = ctx;
  const it = doc.items.find((i) => i.id === doc.viewer?.file);
  if (!it) return null;
  const desktop = doc.viewer?.app === "desktop";
  if (it.kind !== "word") {
    return (
      <BrowserFrame tabs={["My files - OneDrive", it.name]} active={1} onTab={(i) => { if (i === 0) ctx.cmd("od.close"); }} url={`${doc.account === "work" ? `${(doc.org?.domain ?? "contoso.com").split(".")[0]}-my.sharepoint.com` : "onedrive.live.com"}/…/${encodeURIComponent(it.name)}`}>
        <Preview it={it} />
      </BrowserFrame>
    );
  }
  if (desktop) return <WordDoc it={it} desktop />;
  return (
    <BrowserFrame tabs={["My files - OneDrive", `${it.name.replace(/\.docx?$/i, "")}.docx`]} active={1} onTab={(i) => { if (i === 0) ctx.cmd("od.close"); }} url={`${doc.account === "work" ? `${(doc.org?.domain ?? "contoso.com").split(".")[0]}-my.sharepoint.com/:w:/r/personal/…` : "onedrive.live.com/edit?id=…"}`}>
      <WordDoc it={it} />
    </BrowserFrame>
  );
}

function Preview({ it }: { it: OdItem }) {
  const ctx = useOd();
  return (
    <div className="flex h-full flex-col bg-[#3b3a39] text-white" style={{ fontFamily: FONT }}>
      <div className="flex h-11 items-center gap-3 px-3">
        <button type="button" aria-label="Close" onClick={() => ctx.cmd("od.close")} className="rounded p-1.5 hover:bg-white/10"><OIcon name="back" size={18} color="#fff" /></button>
        <FileIcon kind={it.kind} size={20} />
        <span className="flex-1 truncate text-[14px]">{it.name}</span>
        <button type="button" aria-label="Share" onClick={() => ctx.open({ kind: "share", file: it.id })} className="flex items-center gap-1 rounded px-2 py-1 text-[13px] hover:bg-white/10"><OIcon name="share" size={16} color="#fff" /> Share</button>
        <button type="button" aria-label="Download" onClick={() => ctx.commit("od.download", { file: it.id })} className="flex items-center gap-1 rounded px-2 py-1 text-[13px] hover:bg-white/10"><OIcon name="download" size={16} color="#fff" /> Download</button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center p-6">
        <div className="flex h-full max-h-[380px] w-full max-w-[320px] flex-col items-center justify-center gap-3 rounded bg-white p-4 text-[#424242] shadow-2xl">
          <FileIcon kind={it.kind} size={72} />
          <span className="text-center text-[13px]">{it.name}</span>
          {(it.text ?? []).slice(0, 4).map((t, i) => <span key={i} className="w-full truncate text-[11px] text-[#616161]">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function WordDoc({ it, desktop }: { it: OdItem; desktop?: boolean }) {
  const ctx = useOd();
  const { doc, ui } = ctx;
  const [tab, setTab] = useState(desktop ? "Home" : "Home");
  const [composer, setComposer] = useState<string | null>(null);
  const [titleMenu, setTitleMenu] = useState(false);
  const mode = doc.viewer?.mode ?? "Editing";
  const pane = doc.viewer?.pane ?? null;
  const autosave = Boolean(doc.viewer?.autosave);
  const paras = (it.text ?? [""]).map((t, i) => ({ id: `p${i + 1}`, text: t }));
  const selPara = ui.selection.startsWith("para:") ? ui.selection.slice(5) : null;
  const comments = it.comments ?? [];
  const coauthors = (it.coauthors ?? []).map((c) => ({ ...c, person: personOf(doc, c.email) ?? { name: c.email, email: c.email } }));
  const startComment = (para?: string | null) => {
    const p = para ?? selPara;
    if (!p) {
      ctx.cmd("od.toast", "Select a paragraph first, then add a comment");
      return;
    }
    if (pane !== "comments") ctx.cmd("od.pane", "comments");
    setComposer(p);
  };
  const tabs = ["File", "Home", "Insert", "Layout", "References", "Review", "View", "Help"];

  return (
    <div className="flex h-full flex-col bg-[#f3f2f1]" style={{ fontFamily: FONT }}>
      {desktop ? (
        <div className="relative flex h-9 shrink-0 items-center gap-2 bg-[#185abd] px-2 text-[12px] text-white">
          <span className="flex items-center gap-1.5">
            AutoSave
            <button type="button" role="switch" aria-checked={autosave} aria-label="AutoSave" onClick={() => ctx.commit("od.autosave", { file: it.id, on: !autosave })} className={`relative h-4 w-8 rounded-full border border-white/80 ${autosave ? "bg-white" : ""}`}>
              <span className={`absolute top-[2px] h-2.5 w-2.5 rounded-full ${autosave ? "left-[17px] bg-[#185abd]" : "left-[2px] bg-white"}`} />
            </button>
            <span className="text-[11px]">{autosave ? "On" : "Off"}</span>
          </span>
          <button type="button" aria-label="Save" title="Save" className="rounded p-1 hover:bg-white/15"><OIcon name="documents" size={14} color="#fff" /></button>
          <button type="button" aria-label={`${it.name} file information`} onClick={() => setTitleMenu((v) => !v)} className="mx-auto flex items-center gap-1 rounded px-2 py-0.5 hover:bg-white/15">
            {it.name.replace(/\.docx?$/i, "")} • {autosave ? `Saved to OneDrive` : "Saved"} <OIcon name="chevronDown" size={11} color="#fff" />
          </button>
          <span className="flex -space-x-1">{coauthors.map((c) => <Avatar key={c.email} person={c.person} size={22} ring />)}</span>
          <Avatar person={doc.me} size={22} />
          <button type="button" aria-label="Close Word" title="Close" onClick={() => ctx.cmd("od.close")} className="ml-2 flex h-9 w-10 items-center justify-center hover:bg-[#c42b1c]"><OIcon name="close" size={14} color="#fff" /></button>
          {titleMenu && (
            <div className="absolute left-1/2 top-9 z-50 w-[340px] -translate-x-1/2 rounded-md border border-[#e0e0e0] bg-white p-4 text-[13px] text-[#242424] shadow-xl" role="dialog" aria-label="File information">
              <div className="mb-1 text-[12px] text-[#616161]">File Name</div>
              <div className="mb-3 rounded border border-[#d1d1d1] px-2 py-1">{it.name.replace(/\.docx?$/i, "")}</div>
              <div className="mb-1 text-[12px] text-[#616161]">Location</div>
              <div className="mb-3 flex items-center gap-1"><OIcon name="cloud" size={14} color="#0f6cbd" /> OneDrive - {doc.account === "work" ? doc.org?.name : "Personal"} › {locationLabel(doc, it).replace(/^My files ?>? ?/, "") || "Documents"}</div>
              <button type="button" onClick={() => { setTitleMenu(false); ctx.open({ kind: "versions", file: it.id }); }} className="font-semibold text-[#0f6cbd] hover:underline">Version History</button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-11 shrink-0 items-center gap-2 px-2 text-white" style={{ background: WORD_BLUE }}>
          <OIcon name="waffle" size={16} color="#fff" />
          <span className="text-[15px] font-semibold">Word</span>
          <span className="ml-3 truncate text-[13px]">{it.name.replace(/\.docx?$/i, "")} <span className="opacity-80">• Saved</span></span>
          <span className="flex-1" />
          <span className="flex -space-x-1" aria-label="People editing">
            {coauthors.map((c) => <Avatar key={c.email} person={c.person} size={26} ring />)}
          </span>
          <Avatar person={doc.me} size={26} />
        </div>
      )}

      {/* Ribbon tabs */}
      <div className="flex h-9 shrink-0 items-center gap-1 border-b border-[#e0e0e0] bg-white px-2">
        {tabs.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`h-8 px-2 text-[13px] ${tab === t ? "border-b-2 border-[#185abd] font-semibold text-[#185abd]" : "text-[#424242] hover:bg-[#f5f5f5]"}`}>
            {t}
          </button>
        ))}
        <span className="flex-1" />
        <button type="button" aria-label="Comments" onClick={() => ctx.cmd("od.pane", pane === "comments" ? "" : "comments")} className={`flex h-7 items-center gap-1 rounded px-2 text-[13px] ${pane === "comments" ? "bg-[#ebf3fc]" : "hover:bg-[#f5f5f5]"}`}>
          <OIcon name="comment" size={16} color={WORD_BLUE} /> Comments
        </button>
        {!desktop && (
          <button
            type="button"
            aria-label={`Mode: ${mode}`}
            onClick={(e) =>
              ctx.menu(e, [
                { label: "Editing", icon: "pen", check: mode === "Editing", onClick: () => ctx.commit("od.mode", { file: it.id, mode: "Editing" }) },
                { label: "Reviewing", icon: "comment", check: mode === "Reviewing", onClick: () => ctx.commit("od.mode", { file: it.id, mode: "Reviewing" }) },
                { label: "Viewing", icon: "eye", check: mode === "Viewing", onClick: () => ctx.commit("od.mode", { file: it.id, mode: "Viewing" }) },
              ])
            }
            className="flex h-7 items-center gap-1 rounded px-2 text-[13px] hover:bg-[#f5f5f5]"
          >
            <OIcon name={mode === "Editing" ? "pen" : mode === "Reviewing" ? "comment" : "eye"} size={15} color={WORD_BLUE} /> {mode} <OIcon name="chevronDown" size={11} />
          </button>
        )}
        <button type="button" aria-label="Share" onClick={() => ctx.open({ kind: "share", file: it.id })} className="flex h-7 items-center gap-1 rounded bg-[#185abd] px-3 text-[13px] font-semibold text-white hover:bg-[#124078]">
          <OIcon name="share" size={15} color="#fff" /> Share
        </button>
      </div>
      <div className="flex h-11 shrink-0 items-center gap-1 border-b border-[#e0e0e0] bg-[#fafafa] px-3 text-[13px]">
        {tab === "Review" ? (
          <>
            <button type="button" aria-label="New comment" onClick={() => startComment()} className="flex h-8 items-center gap-1.5 rounded px-2 hover:bg-[#ebebeb]"><OIcon name="comment" size={17} color={WORD_BLUE} /> New comment</button>
            <button type="button" aria-label="Show comments" onClick={() => ctx.cmd("od.pane", "comments")} className="flex h-8 items-center gap-1.5 rounded px-2 hover:bg-[#ebebeb]"><OIcon name="chat" size={17} color={WORD_BLUE} /> Show comments</button>
          </>
        ) : tab === "File" ? (
          <>
            <button type="button" aria-label="Info: Version History" onClick={() => ctx.open({ kind: "versions", file: it.id })} className="flex h-8 items-center gap-1.5 rounded px-2 hover:bg-[#ebebeb]"><OIcon name="history" size={17} color={WORD_BLUE} /> Info › Version History</button>
            <button type="button" aria-label="Share" onClick={() => ctx.open({ kind: "share", file: it.id })} className="flex h-8 items-center gap-1.5 rounded px-2 hover:bg-[#ebebeb]"><OIcon name="share" size={17} color={WORD_BLUE} /> Share</button>
          </>
        ) : (
          <>
            <OIcon name="restore" size={16} color="#616161" />
            <span className="mx-1 h-6 border-l border-[#d1d1d1]" />
            <span className="rounded border border-[#d1d1d1] bg-white px-2 py-0.5 text-[12px]">Aptos (Body)</span>
            <span className="rounded border border-[#d1d1d1] bg-white px-2 py-0.5 text-[12px]">12</span>
            <span className="ml-2 font-bold">B</span><span className="italic">I</span><span className="underline">U</span>
            <span className="ml-3 text-[#616161]">Select Review › New comment to comment on a paragraph.</span>
          </>
        )}
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 overflow-auto py-5" onClick={() => ctx.onSelect({ selection: "" })}>
          <div className="mx-auto min-h-full w-[min(620px,90%)] bg-white px-12 py-10 shadow-sm" aria-label="Document">
            {paras.map((p, i) => {
              const co = coauthors.find((c) => c.para === p.id);
              const n = comments.filter((c) => c.para === p.id && !c.resolved).length;
              const on = selPara === p.id;
              return (
                <div
                  key={p.id}
                  role="paragraph"
                  aria-label={p.text || "Empty paragraph"}
                  onClick={(e) => { e.stopPropagation(); ctx.onSelect({ selection: `para:${p.id}` }); }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    ctx.onSelect({ selection: `para:${p.id}` });
                    ctx.menu(e, [{ label: "New comment", icon: "comment", onClick: () => startComment(p.id) }]);
                  }}
                  className={`relative mb-3 cursor-text rounded-sm px-1 ${i === 0 ? "text-[20px] font-semibold text-[#1f3864]" : "text-[14px] leading-6 text-[#242424]"} ${on ? "bg-[#cfe4fa]" : ""} ${n ? "bg-[#fff4ce]" : ""}`}
                  style={co ? { boxShadow: `inset 3px 0 0 ${colorFor(co.person)}` } : undefined}
                >
                  {p.text || "\u00a0"}
                  {co && (
                    <span className="absolute right-full top-0.5 mr-1.5 rounded px-1 text-[10px] font-semibold text-white" style={{ background: colorFor(co.person) }}>{co.person.name.split(" ")[0]}</span>
                  )}
                  {n > 0 && (
                    <button type="button" aria-label={`${n} comment${n === 1 ? "" : "s"}`} onClick={(e) => { e.stopPropagation(); ctx.cmd("od.pane", "comments"); }} className="absolute -right-9 top-0 rounded p-1 hover:bg-[#f0f0f0]">
                      <OIcon name="comment" size={16} color={WORD_BLUE} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {pane === "comments" && (
          <CommentsPane it={it} composer={composer} onCloseComposer={() => setComposer(null)} onNew={() => startComment()} />
        )}
      </div>
      <div className="flex h-6 shrink-0 items-center gap-4 border-t border-[#e0e0e0] bg-[#f3f2f1] px-3 text-[11px] text-[#616161]">
        <span>Page 1 of 1</span>
        <span>{paras.reduce((n, p) => n + (p.text ? p.text.split(/\s+/).length : 0), 0)} words</span>
        <span>English (U.S.)</span>
        {!desktop && <span className="ml-auto">Saved to OneDrive</span>}
      </div>
    </div>
  );
}

function CommentsPane({ it, composer, onCloseComposer, onNew }: { it: OdItem; composer: string | null; onCloseComposer: () => void; onNew: () => void }) {
  const ctx = useOd();
  const { doc } = ctx;
  const open = (it.comments ?? []).filter((c) => !c.resolved);
  const resolved = (it.comments ?? []).filter((c) => c.resolved);
  return (
    <aside aria-label="Comments" className="flex w-[300px] shrink-0 flex-col border-l border-[#e0e0e0] bg-[#fafafa]">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex-1 text-[15px] font-semibold">Comments</span>
        <Btn kind="secondary" icon="comment" onClick={onNew}>New</Btn>
        <button type="button" aria-label="Close comments" onClick={() => ctx.cmd("od.pane", "")} className="rounded p-1 hover:bg-[#f0f0f0]"><OIcon name="close" size={14} /></button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-3 pb-3">
        {composer && <Composer target={`comment:${it.id}.${composer}`} paraText={(it.text ?? [])[Number(composer.slice(1)) - 1] ?? ""} onDone={onCloseComposer} />}
        {open.map((c) => <Thread key={c.id} c={c} it={it} />)}
        {resolved.length > 0 && <div className="mb-2 mt-3 text-[12px] font-semibold text-[#616161]">Resolved</div>}
        {resolved.map((c) => (
          <div key={c.id} className="mb-2 rounded-md border border-[#e0e0e0] bg-white p-2 text-[12px] text-[#616161]" aria-label={`Resolved comment: ${c.text}`}>
            <span className="font-semibold">{nameOf(doc, c.author)}</span>: {c.text}
          </div>
        ))}
        {!open.length && !resolved.length && !composer && <p className="mt-4 text-center text-[13px] text-[#616161]">No comments yet. Select a paragraph, then select New.</p>}
      </div>
    </aside>
  );
}

function MentionBox({ value, onChange, placeholder, label, onSubmit }: { value: string; onChange: (v: string) => void; placeholder: string; label: string; onSubmit: () => void }) {
  const ctx = useOd();
  const m = /@([A-Za-z]*)$/.exec(value);
  const q = m ? m[1].toLowerCase() : null;
  const sugg = q !== null ? (ctx.doc.people ?? []).filter((p) => p.name.toLowerCase().split(" ").some((w) => w.startsWith(q)) || p.name.toLowerCase().startsWith(q)).slice(0, 4) : [];
  return (
    <div className="relative">
      <textarea
        aria-label={label}
        placeholder={placeholder}
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            onSubmit();
          }
        }}
        className="w-full resize-none rounded border border-[#d1d1d1] p-2 text-[13px] outline-none focus:border-[#0f6cbd]"
      />
      {sugg.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg" role="listbox" aria-label="People to mention">
          {sugg.map((p) => (
            <button key={p.email} type="button" role="option" aria-selected={false} aria-label={p.name} onClick={() => onChange(value.replace(/@[A-Za-z]*$/, `@${p.name} `))} className="flex w-full items-center gap-2 px-2 py-1 text-left text-[13px] hover:bg-[#f5f5f5]">
              <Avatar person={p} size={22} /> {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Composer({ target, paraText, onDone }: { target: string; paraText: string; onDone: () => void }) {
  const ctx = useOd();
  const [text, setText] = useState("");
  const post = () => {
    if (!text.trim()) return;
    ctx.onCommit({ kind: "type", target, value: text.trim() });
    onDone();
  };
  return (
    <div className="mb-3 rounded-md border-2 border-[#0f6cbd] bg-white p-2" aria-label="New comment">
      <div className="mb-1 flex items-center gap-2 text-[12px]"><Avatar person={ctx.doc.me} size={22} /> <span className="font-semibold">{ctx.doc.me.name}</span></div>
      <p className="mb-2 truncate border-l-2 border-[#d1d1d1] pl-2 text-[11px] italic text-[#616161]">{paraText}</p>
      <MentionBox value={text} onChange={setText} placeholder="Start a conversation. Use @ to mention someone." label="Comment" onSubmit={post} />
      <div className="mt-1 flex justify-end gap-1">
        <Btn kind="subtle" onClick={onDone}>Cancel</Btn>
        <Btn kind="primary" icon="send" disabled={!text.trim()} onClick={post} label="Post comment">Post</Btn>
      </div>
    </div>
  );
}

function Thread({ c, it }: { c: OdComment; it: OdItem }) {
  const ctx = useOd();
  const { doc, ui } = ctx;
  const [reply, setReply] = useState("");
  const on = ui.selection === `comment:${c.id}`;
  const p = personOf(doc, c.author) ?? { name: c.author, email: c.author };
  const send = () => {
    if (!reply.trim()) return;
    ctx.onCommit({ kind: "type", target: `reply:${c.id}`, value: reply.trim() });
    setReply("");
  };
  const para = c.para ? (it.text ?? [])[Number(c.para.slice(1)) - 1] : undefined;
  return (
    <div role="group" aria-label={`Comment from ${p.name}: ${c.text}`} onClick={() => ctx.onSelect({ selection: `comment:${c.id}` })} className={`mb-3 rounded-md border bg-white p-2.5 ${on ? "border-[#0f6cbd]" : "border-[#e0e0e0]"}`}>
      {para && <p className="mb-2 truncate border-l-2 border-[#d1d1d1] pl-2 text-[11px] italic text-[#616161]">{para}</p>}
      <div className="mb-1 flex items-center gap-2">
        <Avatar person={p} size={24} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold">{p.name}</div>
          <div className="text-[11px] text-[#616161]">{c.time ?? ""}</div>
        </div>
        <button type="button" aria-label={`More thread actions for ${p.name}'s comment`} onClick={(e) => { e.stopPropagation(); ctx.menu(e, [{ label: "Resolve thread", icon: "check", onClick: () => ctx.commit("od.resolve", { comment: c.id }) }]); }} className="rounded p-1 hover:bg-[#f0f0f0]">
          <OIcon name="more" size={14} />
        </button>
      </div>
      <p className="text-[13px]">{renderMentions(c.text)}</p>
      {(c.replies ?? []).map((r, i) => (
        <div key={i} className="mt-2 border-t border-[#f0f0f0] pt-2">
          <div className="text-[12px] font-semibold">{nameOf(doc, r.author)} <span className="font-normal text-[#616161]">{r.time ?? ""}</span></div>
          <p className="text-[13px]">{renderMentions(r.text)}</p>
        </div>
      ))}
      <div className="mt-2" onClick={(e) => e.stopPropagation()}>
        <MentionBox value={reply} onChange={setReply} placeholder="Reply" label={`Reply to ${p.name}`} onSubmit={send} />
        {reply.trim() && (
          <div className="mt-1 flex justify-end"><Btn kind="primary" icon="send" onClick={send} label="Send reply">Reply</Btn></div>
        )}
      </div>
    </div>
  );
}

function renderMentions(text: string) {
  const parts = text.split(/(@[A-Z][a-z]+(?: [A-Z][a-z'-]+)?)/g);
  return parts.map((s, i) => (s.startsWith("@") ? <span key={i} className="rounded bg-[#ebf3fc] px-0.5 font-semibold text-[#0f6cbd]">{s}</span> : <span key={i}>{s}</span>));
}
