"use client";

import { useEffect, useRef, useState } from "react";
import { ChatLogo, FileTile, Icon } from "./icons";
import { personOf } from "./model";
import type { GmChatMessage, GmDriveFile, GmPerson, GmSpace } from "./types";
import { Avatar, Btn, FONT, Field, IconBtn, Menu, Modal, TEXT, useGm, type MenuPos } from "./ui";

/** Emoji offered by Add reaction. */
const REACTIONS: { emoji: string; label: string }[] = [
  { emoji: "👍", label: "Thumbs up" },
  { emoji: "❤️", label: "Red heart" },
  { emoji: "😂", label: "Face with tears of joy" },
  { emoji: "🎉", label: "Party popper" },
  { emoji: "🙏", label: "Folded hands" },
  { emoji: "✅", label: "Check mark button" },
];
const ROLES = ["Viewer", "Commenter", "Editor"] as const;

const spaceTitle = (doc: ReturnType<typeof useGm>["doc"], s: GmSpace) => (s.kind === "dm" ? s.members.map((m) => personOf(doc, m).name).join(", ") : s.name);

/** Google Chat inside Gmail: shortcuts, direct messages and spaces. */
export function ChatSurface() {
  const g = useGm();
  const { doc } = g;
  const spaces = doc.spaces ?? [];
  const openId = doc.view?.space ?? null;
  const open = spaces.find((s) => s.id === openId);
  const [newChat, setNewChat] = useState<MenuPos | null>(null);
  const [creating, setCreating] = useState(false);
  const [adding, setAdding] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { listRef.current?.scrollTo({ top: 99999 }); }, [open?.messages.length, openId]);
  const row = (s: GmSpace) => (
    <button key={s.id} type="button" aria-label={spaceTitle(doc, s)} aria-current={openId === s.id ? "page" : undefined} onClick={() => { g.onSelect({ selection: `space:${s.id}` }); g.cmd("chat.open", s.id); }} className={`flex h-9 w-full items-center gap-3 rounded-r-full pl-5 pr-3 text-[14px] ${openId === s.id ? "bg-[#d3e3fd] font-medium" : "hover:bg-[#e9eef6]"} ${s.unread ? "font-bold" : ""}`}>
      {s.kind === "space" ? <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#e8f0fe] text-[12px] text-[#1a73e8]">{s.name[0]}</span> : s.members.length > 1 ? <Icon name="people" size={22} color="#444746" /> : <Avatar person={personOf(doc, s.members[0])} size={24} />}
      <span className="truncate">{spaceTitle(doc, s)}</span>
    </button>
  );
  const shortcut = (label: string, icon: string) => (
    <button key={label} type="button" onClick={() => g.cmd("toast", `${label} isn't part of this practice.`)} className="flex h-9 w-full items-center gap-3 rounded-r-full pl-5 pr-3 text-[14px] hover:bg-[#e9eef6]">
      <Icon name={icon} size={20} color="#444746" /> {label}
    </button>
  );
  return (
    <div className="flex h-full flex-col bg-[#f6f8fc]" style={{ fontFamily: TEXT }}>
      <div className="flex h-16 shrink-0 items-center gap-3 px-4">
        <IconBtn icon="back" label="Back to Gmail" onClick={() => g.cmd("gm.go", "inbox")} />
        <ChatLogo size={32} />
        <span className="text-[22px] text-[#444746]" style={{ fontFamily: FONT }}>Chat</span>
      </div>
      <div className="flex min-h-0 flex-1">
        <nav aria-label="Chat" className="w-[260px] shrink-0 overflow-y-auto pr-2">
          <button type="button" aria-label="New chat" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setNewChat({ x: r.left, y: r.bottom + 4 }); }} className="mb-3 ml-2 flex h-14 items-center gap-3 rounded-2xl bg-[#c2e7ff] px-5 text-[14px] font-medium text-[#001d35] hover:shadow" style={{ fontFamily: FONT }}>
            <Icon name="edit" size={20} color="#001d35" /> New chat
          </button>
          <div className="px-5 pb-1 pt-1 text-[12px] font-medium text-[#444746]">Shortcuts</div>
          {shortcut("Home", "inbox")}
          {shortcut("Mentions", "people")}
          {shortcut("Starred", "star")}
          <div className="px-5 pb-1 pt-4 text-[12px] font-medium text-[#444746]">Direct messages</div>
          {spaces.filter((s) => s.kind === "dm").map(row)}
          <div className="px-5 pb-1 pt-4 text-[12px] font-medium text-[#444746]">Spaces</div>
          {spaces.filter((s) => s.kind === "space").map(row)}
        </nav>
        <main className="mb-2 mr-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white">
          {open ? (
            <>
              <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e0e0e0] px-5">
                <h2 className="flex-1 truncate text-[18px]" style={{ fontFamily: FONT }}>{spaceTitle(doc, open)}</h2>
                {open.kind === "space" && <span className="text-[13px] text-[#444746]">{open.members.length + 1} members</span>}
                {open.kind === "space" && <Btn kind="outlined" small onClick={() => setAdding(true)} label="Add people"><Icon name="personAdd" size={16} color="#0b57d0" /> Add people</Btn>}
              </div>
              <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4 text-[14px]" role="log" aria-label="Messages">
                {open.messages.length === 0 && <p className="text-center text-[#5f6368]">No messages yet. Say hello!</p>}
                {open.messages.map((m, i) => <ChatMessage key={i} space={open} m={m} index={i} />)}
              </div>
              <Composer space={open} />
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center text-[14px] text-[#444746]"><ChatLogo size={64} /><p className="mt-3">Select a conversation or a space, or start a new chat.</p></div>
          )}
        </main>
      </div>
      {newChat && <NewChat pos={newChat} onClose={() => setNewChat(null)} onCreateSpace={() => { setNewChat(null); setTimeout(() => setCreating(true), 0); }} />}
      {creating && <CreateSpace onClose={() => setCreating(false)} />}
      {adding && open && <AddPeople spaceId={open.id} onClose={() => setAdding(false)} />}
    </div>
  );
}

function ChatMessage({ space, m, index }: { space: GmSpace; m: GmChatMessage; index: number }) {
  const g = useGm();
  const { doc } = g;
  const [pick, setPick] = useState<MenuPos | null>(null);
  const p = m.from === "me" ? doc.me : personOf(doc, m.from);
  const author = m.from === "me" ? "You" : p.name;
  return (
    <div className="group relative flex gap-3 rounded-lg px-2 py-1 hover:bg-[#f6f8fc]" aria-label={`Message from ${author}`} role="article">
      <Avatar person={p} size={32} />
      <div className="min-w-0 flex-1">
        <div className="text-[13px]"><span className="font-medium">{author}</span> <span className="text-[12px] text-[#5f6368]">{m.time}</span></div>
        <div className="whitespace-pre-wrap">{m.text}</div>
        {m.files?.map((f) => (
          <div key={f} className="mt-1 inline-flex items-center gap-2 rounded-lg border border-[#dadce0] px-3 py-1.5 text-[13px]"><FileTile kind={(doc.drive ?? []).find((x) => x.name === f)?.kind ?? "doc"} size={18} />{f}</div>
        ))}
        {Boolean(m.reactions?.length) && (
          <div className="mt-1 flex gap-1">
            {m.reactions!.map((r) => (
              <button key={r.emoji} type="button" aria-label={`${r.emoji} ${r.by.length}`} onClick={() => g.cmd("chat.react", `${space.id}:${index}|${r.emoji}`)} className={`flex h-6 items-center gap-1 rounded-full border px-2 text-[12px] ${r.by.includes("me") ? "border-[#0b57d0] bg-[#d3e3fd]" : "border-[#dadce0]"}`}>
                {r.emoji} {r.by.length}
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="absolute right-2 top-1 hidden rounded-full bg-white shadow group-hover:flex group-focus-within:flex">
        <IconBtn icon="emoji" label="Add reaction" box={30} size={18} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPick({ x: r.left - 200, y: r.bottom + 4 }); }} />
      </span>
      {pick && (
        <Menu
          label="Add reaction"
          pos={pick}
          width={240}
          onClose={() => setPick(null)}
          items={REACTIONS.map((r) => ({ label: `${r.emoji} ${r.label}`, onClick: () => g.cmd("chat.react", `${space.id}:${index}|${r.emoji}`) }))}
        />
      )}
    </div>
  );
}

type Pending = { text: string; file?: string; outsiders: GmPerson[]; needAccess: string[] };

/** The reply area: type a message, @ to mention a person or add a Drive file, Send. */
function Composer({ space }: { space: GmSpace }) {
  const g = useGm();
  const { doc } = g;
  const [text, setText] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);
  const [step, setStep] = useState<"members" | "access" | null>(null);
  const [addMembers, setAddMembers] = useState(true);
  const [role, setRole] = useState<(typeof ROLES)[number]>("Viewer");
  useEffect(() => { setText(""); setFile(null); setPending(null); setStep(null); }, [space.id]);
  const at = /(?:^|\s)@([^@\n]*)$/.exec(text);
  const q = at ? at[1].toLowerCase() : "";
  const people = at ? doc.people.filter((p) => p.email !== doc.me.email && (p.name.toLowerCase().includes(q) || p.email.toLowerCase().startsWith(q))).slice(0, 5) : [];
  const files = at && q.length > 0 ? (doc.drive ?? []).filter((f) => f.kind !== "folder" && f.name.toLowerCase().includes(q)).slice(0, 4) : [];
  const insertPerson = (p: GmPerson) => setText(text.replace(/@([^@\n]*)$/, `@${p.name} `));
  const insertFile = (f: GmDriveFile) => { setFile(f.name); setText(text.replace(/@([^@\n]*)$/, "").trimEnd() + (text.replace(/@([^@\n]*)$/, "").trim() ? " " : "")); };

  const commit = (p: Pending, members: boolean, access: string | null) => {
    const lines = [`Message: ${p.text}`];
    if (members) for (const o of p.outsiders) lines.push(`Add member: ${o.email}`);
    if (p.file) lines.push(`File: ${p.file}`);
    if (p.file && access) lines.push(`File access: ${access}`);
    g.type(`chat:${space.id}`, p.outsiders.length || p.file ? lines.join("\n") : p.text);
    setText(""); setFile(null); setPending(null); setStep(null);
  };
  const send = () => {
    const t = text.trim();
    if (!t && !file) return;
    const mentioned = doc.people.filter((p) => t.includes(`@${p.name}`));
    const outsiders = space.kind === "space" ? mentioned.filter((p) => !space.members.some((m) => m.toLowerCase() === p.email.toLowerCase())) : [];
    const f = file ? (doc.drive ?? []).find((x) => x.name === file) : undefined;
    const p: Pending = { text: t, file: file ?? undefined, outsiders, needAccess: [] };
    const audience = [...space.members, ...outsiders.map((o) => o.email)];
    p.needAccess = f ? audience.filter((m) => !(f.sharedWith ?? []).some((s) => s.toLowerCase() === m.toLowerCase())) : [];
    if (outsiders.length) { setPending(p); setStep("members"); return; }
    if (p.needAccess.length) { setPending(p); setStep("access"); return; }
    commit(p, false, null);
  };
  const afterMembers = (add: boolean) => {
    if (!pending) return;
    setAddMembers(add);
    const audience = [...space.members, ...(add ? pending.outsiders.map((o) => o.email) : [])];
    const f = pending.file ? (doc.drive ?? []).find((x) => x.name === pending.file) : undefined;
    const need = f ? audience.filter((m) => !(f.sharedWith ?? []).some((s) => s.toLowerCase() === m.toLowerCase())) : [];
    if (need.length) { setPending({ ...pending, needAccess: need }); setStep("access"); return; }
    commit(pending, add, null);
  };
  const placeholder = `Message ${spaceTitle(doc, space)}`;
  return (
    <>
    <div className="relative m-4 shrink-0">
      {(people.length > 0 || files.length > 0) && (
        <div role="listbox" aria-label="Suggestions" className="absolute bottom-[calc(100%+6px)] left-0 z-20 w-[340px] rounded-lg bg-white py-1 text-[14px] shadow-[0_2px_6px_2px_rgba(60,64,67,.15)]">
          {people.length > 0 && <div className="px-3 pb-1 pt-1 text-[12px] font-medium text-[#444746]">People</div>}
          {people.map((p) => (
            <button key={p.email} type="button" role="option" aria-selected={false} aria-label={p.name} onMouseDown={(e) => { e.preventDefault(); insertPerson(p); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f1f3f4]">
              <Avatar person={p} size={24} /> <span>{p.name}</span> <span className="truncate text-[12px] text-[#5f6368]">{p.email}</span>
            </button>
          ))}
          {files.length > 0 && <div className="px-3 pb-1 pt-2 text-[12px] font-medium text-[#444746]">Files</div>}
          {files.map((f) => (
            <button key={f.name} type="button" role="option" aria-selected={false} aria-label={f.name} onMouseDown={(e) => { e.preventDefault(); insertFile(f); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f1f3f4]">
              <FileTile kind={f.kind} size={20} /> <span className="truncate">{f.name}</span>
            </button>
          ))}
        </div>
      )}
      <div className="rounded-3xl bg-[#f1f3f4] px-2 py-1">
        {file && (
          <div className="mx-3 mt-2 inline-flex items-center gap-2 rounded-lg border border-[#dadce0] bg-white px-3 py-1.5 text-[13px]">
            <FileTile kind={(doc.drive ?? []).find((x) => x.name === file)?.kind ?? "doc"} size={18} /> {file}
            <button type="button" aria-label={`Remove ${file}`} onClick={() => setFile(null)} className="text-[#5f6368]">✕</button>
          </div>
        )}
        <div className="flex items-center gap-2 pl-3">
          <input aria-label="Message" placeholder={placeholder} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && !people.length && !files.length) send(); }} className="h-12 flex-1 bg-transparent outline-none" />
          <IconBtn icon="send" label="Send message" onClick={send} disabled={!text.trim() && !file} color="#0b57d0" />
        </div>
      </div>
    </div>
      {pending && step === "members" && (
        <Modal
          title={pending.outsiders.length === 1 ? `${pending.outsiders[0].name} isn't in this space` : "Some people aren't in this space"}
          onClose={() => { setPending(null); setStep(null); }}
          width={440}
          footer={<><Btn kind="text" onClick={() => afterMembers(false)} label="Send message only">Send message only</Btn><Btn onClick={() => afterMembers(true)} label="Add member and send">Add member and send</Btn></>}
        >
          <p className="text-[14px] text-[#444746]">Add {pending.outsiders.map((o) => o.name).join(" and ")} to {space.name} so they get a notification and can see the conversation, or send the message without adding them.</p>
        </Modal>
      )}
      {pending && step === "access" && (
        <Modal
          title="Select the type of access"
          onClose={() => { setPending(null); setStep(null); }}
          width={460}
          footer={<><Btn kind="text" onClick={() => { setPending(null); setStep(null); }}>Cancel</Btn><Btn onClick={() => commit(pending, addMembers, role)} label="Send">Send</Btn></>}
        >
          <p className="mb-3 text-[14px] text-[#444746]">{pending.needAccess.map((m) => personOf(doc, m).name).join(", ")} {pending.needAccess.length === 1 ? "doesn't" : "don't"} have access to {pending.file}. Give access in this conversation:</p>
          {ROLES.map((r) => (
            <label key={r} className="flex items-center gap-3 py-1 text-[14px]">
              <input type="radio" name="chatAccess" aria-label={r} checked={role === r} onChange={() => setRole(r)} className="accent-[#0b57d0]" /> {r}
            </label>
          ))}
        </Modal>
      )}
    </>
  );
}

/** New chat: add one or more people and Start chat, or Create a space. */
function NewChat({ pos, onClose, onCreateSpace }: { pos: MenuPos; onClose: () => void; onCreateSpace: () => void }) {
  const g = useGm();
  const [list, setList] = useState<string[]>([]);
  const [text, setText] = useState("");
  const hits = text.trim() ? g.doc.people.filter((p) => p.email !== g.doc.me.email && !list.includes(p.email) && (p.name.toLowerCase().includes(text.toLowerCase()) || p.email.toLowerCase().includes(text.toLowerCase()))).slice(0, 5) : [];
  const start = () => { if (list.length) { g.type("newdm", `People: ${list.join("; ")}`); onClose(); } };
  return (
    <div className="fixed inset-0 z-[150]" onMouseDown={onClose}>
      <div role="dialog" aria-label="New chat" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} className="absolute w-[340px] rounded-2xl bg-white p-3 text-[14px] shadow-[0_4px_8px_3px_rgba(60,64,67,.15),0_1px_3px_rgba(60,64,67,.3)]" style={{ left: Math.max(8, pos.x), top: pos.y }}>
        <div className="relative">
          <input autoFocus aria-label="Enter a name or email" placeholder="Add 1 or more people" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { if (hits[0]) { setList([...list, hits[0].email]); setText(""); } else start(); } }} className="h-10 w-full rounded border border-[#747775] px-3 outline-none focus:border-2 focus:border-[#0b57d0]" />
          {hits.length > 0 && (
            <div role="listbox" aria-label="People" className="absolute left-0 right-0 top-11 z-10 rounded bg-white py-1 shadow-lg">
              {hits.map((p) => <button key={p.email} type="button" role="option" aria-selected={false} aria-label={`${p.name} ${p.email}`} onMouseDown={(e) => { e.preventDefault(); setList([...list, p.email]); setText(""); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f1f3f4]"><Avatar person={p} size={24} />{p.name}</button>)}
            </div>
          )}
        </div>
        {list.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {list.map((e) => <span key={e} className="flex items-center gap-1 rounded-full border border-[#dadce0] px-2 py-0.5 text-[13px]"><Avatar person={personOf(g.doc, e)} size={18} />{personOf(g.doc, e).name}<button type="button" aria-label={`Remove ${e}`} onClick={() => setList(list.filter((x) => x !== e))}>✕</button></span>)}
          </div>
        )}
        <div className="mt-2 flex justify-end"><Btn disabled={!list.length} onClick={start} label="Start chat">Start chat</Btn></div>
        <div className="my-2 border-t border-[#e0e0e0]" />
        <button type="button" onClick={onCreateSpace} className="flex h-10 w-full items-center gap-3 rounded px-2 hover:bg-[#f1f3f4]"><Icon name="people" size={20} color="#444746" /> Create a space</button>
        <button type="button" onClick={() => { g.cmd("toast", "Browse spaces isn't part of this practice."); onClose(); }} className="flex h-10 w-full items-center gap-3 rounded px-2 hover:bg-[#f1f3f4]"><Icon name="search" size={20} color="#444746" /> Browse spaces</button>
      </div>
    </div>
  );
}

function CreateSpace({ onClose }: { onClose: () => void }) {
  const g = useGm();
  const [name, setName] = useState("");
  const ok = () => { if (name.trim()) { g.type("newspace", `Space name: ${name.trim()}`); onClose(); } };
  return (
    <Modal title="Create a space" onClose={onClose} width={460} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn disabled={!name.trim()} onClick={ok} label="Create">Create</Btn></>}>
      <Field label="Space name" value={name} onChange={setName} onEnter={ok} autoFocus />
      <p className="text-[12px] text-[#5f6368]">After you create the space, add people to it.</p>
    </Modal>
  );
}

function AddPeople({ spaceId, onClose }: { spaceId: string; onClose: () => void }) {
  const g = useGm();
  const [list, setList] = useState<string[]>([]);
  const [text, setText] = useState("");
  const hits = text.trim() ? g.doc.people.filter((p) => !list.includes(p.email) && (p.name.toLowerCase().includes(text.toLowerCase()) || p.email.toLowerCase().includes(text.toLowerCase()))).slice(0, 5) : [];
  return (
    <Modal title="Add people" onClose={onClose} width={480} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn disabled={!list.length} onClick={() => { g.type(`addpeople:${spaceId}`, `People: ${list.join("; ")}`); onClose(); }} label="Add">Add</Btn></>}>
      <div className="relative">
        <input aria-label="Add people" placeholder="Enter name or email" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && hits[0]) { setList([...list, hits[0].email]); setText(""); } }} className="mb-3 h-11 w-full rounded border border-[#747775] px-3 outline-none focus:border-2 focus:border-[#0b57d0]" />
        {hits.length > 0 && (
          <div role="listbox" aria-label="Suggestions" className="absolute left-0 right-0 top-11 z-10 rounded bg-white py-1 shadow-lg">
            {hits.map((p) => <button key={p.email} type="button" role="option" aria-selected={false} aria-label={`${p.name} ${p.email}`} onMouseDown={(e) => { e.preventDefault(); setList([...list, p.email]); setText(""); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f1f3f4]"><Avatar person={p} size={24} />{p.name}</button>)}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">{list.map((e) => <span key={e} className="flex items-center gap-1 rounded-full border border-[#dadce0] px-2 py-0.5 text-[13px]"><Avatar person={personOf(g.doc, e)} size={18} />{personOf(g.doc, e).name}<button type="button" aria-label={`Remove ${e}`} onClick={() => setList(list.filter((x) => x !== e))}>✕</button></span>)}</div>
    </Modal>
  );
}
