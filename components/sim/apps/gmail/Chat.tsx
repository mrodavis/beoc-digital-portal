"use client";

import { useEffect, useRef, useState } from "react";
import { ChatLogo, Icon } from "./icons";
import { personOf } from "./model";
import { Avatar, Btn, FONT, Field, IconBtn, Menu, Modal, TEXT, useGm, type MenuPos } from "./ui";

/** Google Chat inside Gmail: Home, direct messages and spaces. */
export function ChatSurface() {
  const g = useGm();
  const { doc } = g;
  const spaces = doc.spaces ?? [];
  const openId = doc.view?.space ?? null;
  const open = spaces.find((s) => s.id === openId);
  const [menu, setMenu] = useState<MenuPos | null>(null);
  const [creating, setCreating] = useState(false);
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { listRef.current?.scrollTo({ top: 99999 }); }, [open?.messages.length, openId]);
  const send = () => { if (open && text.trim()) { g.type(`chat:${open.id}`, text.trim()); setText(""); } };
  const row = (id: string, name: string, kind: "space" | "dm", unread?: boolean) => (
    <button key={id} type="button" aria-label={name} aria-current={openId === id ? "page" : undefined} onClick={() => { g.onSelect({ selection: `space:${id}` }); g.cmd("chat.open", id); }} className={`flex h-9 w-full items-center gap-3 rounded-r-full pl-5 pr-3 text-[14px] ${openId === id ? "bg-[#d3e3fd] font-medium" : "hover:bg-[#e9eef6]"} ${unread ? "font-bold" : ""}`}>
      {kind === "space" ? <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e8f0fe] text-[12px] text-[#1a73e8]">{name[0]}</span> : <Avatar person={personOf(doc, name)} size={24} />}
      <span className="truncate">{kind === "dm" ? personOf(doc, name).name : name}</span>
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
          <button type="button" aria-label="New chat" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMenu({ x: r.left, y: r.bottom + 4 }); }} className="mb-3 ml-2 flex h-14 items-center gap-3 rounded-2xl bg-[#c2e7ff] px-5 text-[14px] font-medium text-[#001d35] hover:shadow" style={{ fontFamily: FONT }}>
            <Icon name="edit" size={20} color="#001d35" /> New chat
          </button>
          <div className="px-5 pb-1 pt-2 text-[12px] font-medium text-[#444746]">Direct messages</div>
          {spaces.filter((s) => s.kind === "dm").map((s) => row(s.id, s.members[0], "dm", s.unread))}
          <div className="px-5 pb-1 pt-4 text-[12px] font-medium text-[#444746]">Spaces</div>
          {spaces.filter((s) => s.kind === "space").map((s) => row(s.id, s.name, "space", s.unread))}
        </nav>
        <main className="mb-2 mr-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white">
          {open ? (
            <>
              <div className="flex h-14 items-center gap-3 border-b border-[#e0e0e0] px-5">
                <h2 className="flex-1 truncate text-[18px]" style={{ fontFamily: FONT }}>{open.kind === "dm" ? personOf(doc, open.members[0]).name : open.name}</h2>
                {open.kind === "space" && <span className="text-[13px] text-[#444746]">{open.members.length + 1} members</span>}
                {open.kind === "space" && <Btn kind="outlined" small onClick={() => setAdding(true)} label="Add people"><Icon name="personAdd" size={16} color="#0b57d0" /> Add people</Btn>}
              </div>
              <div ref={listRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-4 text-[14px]" role="log" aria-label="Messages">
                {open.messages.length === 0 && <p className="text-center text-[#5f6368]">No messages yet. Say hello!</p>}
                {open.messages.map((m, i) => {
                  const p = m.from === "me" ? doc.me : personOf(doc, m.from);
                  return (
                    <div key={i} className="flex gap-3">
                      <Avatar person={p} size={32} />
                      <div><div className="text-[13px]"><span className="font-medium">{m.from === "me" ? "You" : p.name}</span> <span className="text-[12px] text-[#5f6368]">{m.time}</span></div><div className="whitespace-pre-wrap">{m.text}</div></div>
                    </div>
                  );
                })}
              </div>
              <div className="m-4 flex items-center gap-2 rounded-full bg-[#f1f3f4] pl-5 pr-1">
                <input aria-label="Message" placeholder={`Message ${open.kind === "dm" ? personOf(doc, open.members[0]).name : open.name}`} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") send(); }} className="h-12 flex-1 bg-transparent outline-none" />
                <IconBtn icon="send" label="Send message" onClick={send} disabled={!text.trim()} color="#0b57d0" />
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center text-[14px] text-[#444746]"><ChatLogo size={64} /><p className="mt-3">Select a conversation or a space, or start a new chat.</p></div>
          )}
        </main>
      </div>
      {menu && <Menu label="New chat" pos={menu} onClose={() => setMenu(null)} items={[{ label: "Create a space", icon: "people", onClick: () => setTimeout(() => setCreating(true), 0) }, { label: "Browse spaces", icon: "search", onClick: () => g.cmd("toast", "Browse spaces isn't part of this practice.") }]} />}
      {creating && <CreateSpace onClose={() => setCreating(false)} />}
      {adding && open && <AddPeople spaceId={open.id} onClose={() => setAdding(false)} />}
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
