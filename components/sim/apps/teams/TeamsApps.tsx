"use client";

import { useId, useState } from "react";
import type { TeamsChat } from "./types";
import { TIcon } from "./icons";
import { DEFAULT_TODAY, addDays, findChannel, findMessage, isoToMDY, personName, serializeForm, shortDay } from "./model";
import { Avatar, Field, Modal, PersonAvatar, PrimaryBtn, RichText, SecondaryBtn, inputCls, useAccepted, useTeams } from "./TeamsShared";

/* ------------------------------------------------------------------ */
/* Immersive Reader                                                    */
/* ------------------------------------------------------------------ */

export function ImmersiveReader() {
  const { doc, cmd } = useTeams();
  const id = doc.flags?.reader as string | undefined;
  const hit = id ? findMessage(doc, id) : null;
  const [size, setSize] = useState(28);
  if (!hit) return null;
  return (
    <div className="absolute inset-0 z-[85] flex flex-col bg-[#fdf6e3]" role="dialog" aria-label="Immersive Reader">
      <div className="flex h-12 items-center gap-2 border-b border-[#e8dcc0] px-4 text-[#424242]">
        <span className="font-semibold">Immersive Reader</span>
        <div className="flex-1" />
        <button type="button" aria-label="Smaller text" onClick={() => setSize((s) => Math.max(18, s - 4))} className="rounded px-2 py-1 hover:bg-black/5">
          A-
        </button>
        <button type="button" aria-label="Larger text" onClick={() => setSize((s) => Math.min(44, s + 4))} className="rounded px-2 py-1 text-[18px] hover:bg-black/5">
          A+
        </button>
        <button type="button" aria-label="Close Immersive Reader" onClick={() => cmd(`reader:${hit.msg.id}`, "reader.close")} className="rounded p-1 hover:bg-black/5">
          <TIcon name="close" size={18} />
        </button>
      </div>
      <div className="flex flex-1 justify-center overflow-auto px-6 py-10">
        <div className="max-w-[720px] leading-[1.9] tracking-wide text-[#242424]" style={{ fontSize: size }}>
          <div className="mb-4 text-[0.6em] text-[#616161]">{personName(doc, hit.msg.from)}</div>
          <RichText text={hit.msg.text} />
        </div>
      </div>
      <div className="flex justify-center pb-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5b5fc7] text-white" aria-label="Play (read aloud)" title="Play (read aloud)">
          ▶
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* New items › Join team                                               */
/* ------------------------------------------------------------------ */

export function JoinTeamPage() {
  const { doc, go, cmd } = useTeams();
  const [q, setQ] = useState("");
  const list = (doc.discover ?? []).filter((t) => !q.trim() || `${t.name} ${t.description ?? ""}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div className="absolute inset-0 z-[70] flex flex-col bg-[#fafafa]" role="dialog" aria-label="Join a team">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[#e0e0e0] bg-white px-4">
        <button type="button" aria-label="Back" onClick={() => go({ overlay: null, selection: "" })} className="rounded p-1 hover:bg-[#f5f5f5]">
          <TIcon name="back" size={18} />
        </button>
        <h1 className="text-[18px] font-bold">Join a team</h1>
        <div className="flex-1" />
        <input aria-label="Type to search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type to search" className={`${inputCls} max-w-[280px]`} />
      </div>
      <div className="grid flex-1 auto-rows-min grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 overflow-auto p-6">
        {list.map((t) => (
          <div key={t.id} className="group flex flex-col items-center gap-2 rounded-lg border border-[#e0e0e0] bg-white p-5 text-center shadow-sm">
            <Avatar name={t.name} size={56} square color={t.color ?? "#5b5fc7"} />
            <div className="text-[15px] font-semibold">{t.name}</div>
            <div className="line-clamp-2 min-h-[32px] text-[12px] text-[#616161]">{t.description ?? ""}</div>
            <div className="text-[11px] text-[#616161]">{t.members ?? t.channels.length * 5} members</div>
            <button type="button" aria-label={`Join team ${t.name}`} onClick={() => cmd("discover", "team.join", t.id)} className="mt-1 rounded-[4px] bg-[#5b5fc7] px-4 py-1 text-[13px] font-semibold text-white hover:bg-[#4f52b2]">
              Join team
            </button>
          </div>
        ))}
        {!list.length && <div className="col-span-full py-10 text-center text-[13px] text-[#616161]">No teams match your search.</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Add a tab                                                           */
/* ------------------------------------------------------------------ */

const TAB_APPS: [string, string, string][] = [
  ["Planner", "note", "Track the team's tasks on a shared plan."],
  ["Lists", "bullets", "Track information such as supply requests or issues."],
  ["Forms", "check", "Create surveys and quizzes and see the results."],
  ["Word", "note", "Show a Word document from this channel's files."],
  ["Excel", "view", "Show an Excel workbook from this channel's files."],
  ["Website", "globe", "Show a web page as a tab."],
];

export function AddTabDialog({ channelId, onClose }: { channelId: string; onClose: () => void }) {
  const { doc, cmd } = useTeams();
  const accepted = useAccepted(doc);
  const [pick, setPick] = useState<string | null>(null);
  const ch = findChannel(doc, channelId)?.channel;
  return (
    <Modal
      title="Add a tab"
      onClose={onClose}
      width={560}
      footer={
        <>
          <SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>
          <PrimaryBtn disabled={!pick} onClick={() => pick && accepted(() => cmd(`channel:${channelId}`, "tab.add", pick), onClose)}>
            Add
          </PrimaryBtn>
        </>
      }
    >
      <p className="mb-3 text-[13px] text-[#616161]">Add an app as a tab at the top of {ch ? `the ${ch.name} channel` : "this channel"}.</p>
      <div className="grid grid-cols-3 gap-2">
        {TAB_APPS.map(([name, icon, text]) => (
          <button key={name} type="button" aria-label={name} aria-pressed={pick === name} onClick={() => setPick(name)} className={`flex flex-col items-start gap-1 rounded-md border p-3 text-left ${pick === name ? "border-[#5b5fc7] bg-[#f0f1fd]" : "border-[#e0e0e0] hover:bg-[#fafafa]"}`}>
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#e8ebfa] text-[#5b5fc7]">
              <TIcon name={icon} size={18} />
            </span>
            <span className="text-[13px] font-semibold">{name}</span>
            <span className="text-[11px] leading-snug text-[#616161]">{text}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Chat participants: View and add participants › Add people           */
/* ------------------------------------------------------------------ */

export function ParticipantsPanel({ chat, onClose }: { chat: TeamsChat; onClose: () => void }) {
  const rid = useId();
  const { doc, act } = useTeams();
  const accepted = useAccepted(doc);
  const [adding, setAdding] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [history, setHistory] = useState("Don't include chat history");
  const matches = q.trim() ? doc.people.filter((p) => !ids.includes(p.id) && !chat.members.includes(p.id) && p.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5) : [];
  const commit = () => {
    const value = serializeForm([
      ["People", ids.map((i) => personName(doc, i)).sort().join("; ")],
      ["History", history],
    ]);
    accepted(() => act(`addpeople:${chat.id}`, { kind: "type", target: `addpeople:${chat.id}`, value }), onClose);
  };
  return (
    <div className="absolute right-4 top-14 z-[60] w-[340px] rounded-lg border border-[#e0e0e0] bg-white p-4 text-[13px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]" role="dialog" aria-label="Participants">
      {!adding ? (
        <>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[14px] font-semibold">People ({chat.members.length + 1})</span>
            <button type="button" aria-label="Close" onClick={onClose} className="rounded p-1 hover:bg-[#f5f5f5]">
              <TIcon name="close" size={14} />
            </button>
          </div>
          {["me", ...chat.members].map((m) => (
            <div key={m} className="flex items-center gap-2 py-1">
              <PersonAvatar id={m} size={28} />
              <span>{m === "me" ? `${doc.me.name} (You)` : personName(doc, m)}</span>
            </div>
          ))}
          <button type="button" aria-label="Add people" onClick={() => setAdding(true)} className="mt-2 flex items-center gap-2 rounded px-1 py-1 font-semibold text-[#5b5fc7] hover:bg-[#f5f5f5]">
            <TIcon name="addPeople" size={16} /> Add people
          </button>
        </>
      ) : (
        <>
          <div className="mb-2 text-[14px] font-semibold">Add people</div>
          <div className="relative mb-3">
            <div className="flex flex-wrap items-center gap-1.5 rounded-[4px] border border-[#d1d1d1] px-2 py-1.5">
              {ids.map((id) => (
                <span key={id} className="flex items-center gap-1 rounded-full bg-[#ebebeb] py-0.5 pl-0.5 pr-2">
                  <PersonAvatar id={id} size={18} showPresence={false} />
                  {personName(doc, id)}
                  <button type="button" aria-label={`Remove ${personName(doc, id)}`} onClick={() => setIds(ids.filter((x) => x !== id))}>
                    <TIcon name="close" size={12} />
                  </button>
                </span>
              ))}
              <input aria-label="Enter a name, email, or tag" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && matches[0]) { setIds([...ids, matches[0].id]); setQ(""); } }} placeholder="Enter a name, email, or tag" className="min-w-[120px] flex-1 outline-none" />
            </div>
            {matches.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg">
                {matches.map((p) => (
                  <button key={p.id} type="button" onClick={() => { setIds([...ids, p.id]); setQ(""); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f5f5f5]">
                    <PersonAvatar id={p.id} size={22} /> {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {chat.members.length > 1 &&
            ["Don't include chat history", "Include all chat history"].map((o) => (
              <label key={o} className="mb-1 flex items-center gap-2">
                <input type="radio" name={`${rid}-hist`} checked={history === o} onChange={() => setHistory(o)} aria-label={o} /> {o}
              </label>
            ))}
          <div className="mt-3 flex justify-end gap-2">
            <SecondaryBtn onClick={() => setAdding(false)}>Cancel</SecondaryBtn>
            <PrimaryBtn disabled={!ids.length} onClick={commit}>
              Add
            </PrimaryBtn>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Apps, Planner, Approvals                                            */
/* ------------------------------------------------------------------ */

const APP_LIST: [string, string, string, string][] = [
  ["planner", "Planner", "note", "Your tasks and plans in one place: My Day, My Tasks, and My Plans."],
  ["approvals", "Approvals", "check", "Send, receive, and track approval requests."],
  ["lists", "Lists", "bullets", "Track information with your team."],
  ["forms", "Forms", "check", "Create surveys, quizzes, and polls."],
];

export function AppsView() {
  const { doc, go, cmd } = useTeams();
  const [q, setQ] = useState("");
  const pinned = doc.pinnedApps ?? [];
  const list = APP_LIST.filter(([, name, , text]) => !q.trim() || `${name} ${text}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#fafafa]">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e0e0e0] bg-white px-5">
        <h1 className="text-[18px] font-bold">Apps</h1>
        <div className="flex-1" />
        <input aria-label="Search apps" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search apps" className={`${inputCls} max-w-[260px]`} />
      </div>
      <div className="grid auto-rows-min grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3 overflow-auto p-5">
        {list.map(([id, name, icon, text]) => {
          const usable = id === "planner" || id === "approvals";
          return (
            <div key={id} className="flex gap-3 rounded-lg border border-[#e0e0e0] bg-white p-4 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e8ebfa] text-[#5b5fc7]">
                <TIcon name={icon} size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold">{name}</div>
                <div className="mb-2 text-[12px] text-[#616161]">{text}</div>
                <div className="flex gap-2">
                  <button type="button" aria-label={`Open ${name}`} disabled={!usable} onClick={() => go({ view: id as "planner" | "approvals", selection: id })} className="rounded-[4px] bg-[#5b5fc7] px-3 py-1 text-[12px] font-semibold text-white hover:bg-[#4f52b2] disabled:bg-[#e0e0e0] disabled:text-[#9e9e9e]">
                    Open
                  </button>
                  {usable && (
                    <button type="button" aria-label={`${pinned.includes(id) ? "Unpin" : "Pin"} ${name}`} onClick={() => cmd("view:apps", "apps.pin", id)} className="rounded-[4px] border border-[#d1d1d1] px-3 py-1 text-[12px] font-semibold hover:bg-[#f5f5f5]">
                      {pinned.includes(id) ? "Unpin" : "Pin"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PlannerView() {
  const { doc, act, cmd } = useTeams();
  const accepted = useAccepted(doc);
  const today = doc.today ?? DEFAULT_TODAY;
  const [page, setPage] = useState<"My Day" | "My Tasks" | "My Plans">("My Tasks");
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [who, setWho] = useState("");
  const tasks = (doc.tasks ?? []).filter((t) => (page === "My Day" ? t.due === isoToMDY(today) : true));
  const dates = [0, 1, 2, 3, 4, 5, 6, 7, 14].map((i) => addDays(today, i));
  const add = () => {
    if (!title.trim()) return;
    const value = serializeForm([
      ["Task", title.trim()],
      ["Due", due],
      ["Assigned to", who],
    ]);
    accepted(() => act("planner", { kind: "type", target: "planner:new", value }), () => { setTitle(""); setDue(""); setWho(""); });
  };
  return (
    <div className="flex min-w-0 flex-1">
      <div className="w-[200px] shrink-0 border-r border-[#e0e0e0] bg-[#f5f5f5] py-3 text-[14px]">
        <div className="mb-2 flex items-center gap-2 px-4 text-[16px] font-bold">
          <TIcon name="note" size={18} className="text-[#5b5fc7]" /> Planner
        </div>
        {(["My Day", "My Tasks", "My Plans"] as const).map((p) => (
          <button key={p} type="button" aria-current={page === p ? "page" : undefined} onClick={() => setPage(p)} className={`mx-2 flex w-[calc(100%-16px)] items-center rounded-md px-3 py-1.5 text-left ${page === p ? "bg-white font-semibold shadow-sm" : "text-[#424242] hover:bg-white/70"}`}>
            {p}
          </button>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex h-12 items-center border-b border-[#ebebeb] px-5 text-[16px] font-bold">{page}</div>
        {page === "My Plans" ? (
          <div className="p-5 text-[13px]">
            {Array.from(new Set((doc.tasks ?? []).map((t) => t.plan).filter(Boolean))).map((p) => (
              <div key={p} className="mb-2 flex items-center gap-2 rounded-md border border-[#e0e0e0] px-3 py-2">
                <TIcon name="note" size={16} className="text-[#5b5fc7]" /> {p}
              </div>
            ))}
            <p className="text-[#616161]">Shared plans also appear as Planner tabs in channels.</p>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-auto px-5 py-3">
            <div className="mb-3 flex flex-wrap items-center gap-2 rounded-md border border-[#e0e0e0] p-2">
              <TIcon name="plus" size={16} className="text-[#5b5fc7]" />
              <input aria-label="Add new task" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Add new task" className="min-w-[200px] flex-1 text-[14px] outline-none" />
              <select aria-label="Due date" value={due} onChange={(e) => setDue(e.target.value)} className="rounded border border-[#d1d1d1] px-1.5 py-1 text-[12px]">
                <option value="">Due date</option>
                {dates.map((d) => (
                  <option key={d} value={isoToMDY(d)}>
                    {shortDay(d)}
                  </option>
                ))}
              </select>
              <select aria-label="Assign to" value={who} onChange={(e) => setWho(e.target.value)} className="rounded border border-[#d1d1d1] px-1.5 py-1 text-[12px]">
                <option value="">Assign to</option>
                <option value={doc.me.name}>{doc.me.name} (me)</option>
                {doc.people.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <PrimaryBtn disabled={!title.trim()} onClick={add}>
                Add
              </PrimaryBtn>
            </div>
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-3 border-b border-[#f0f0f0] py-2 text-[14px]">
                <button type="button" role="checkbox" aria-checked={Boolean(t.done)} aria-label={`Mark ${t.title} complete`} onClick={() => cmd("planner", "planner.complete", t.id)} className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${t.done ? "border-[#5b5fc7] bg-[#5b5fc7] text-white" : "border-[#8a8886] hover:border-[#5b5fc7]"}`}>
                  {t.done && <TIcon name="check" size={12} />}
                </button>
                <span className={`flex-1 ${t.done ? "text-[#9e9e9e] line-through" : ""}`}>{t.title}</span>
                {t.plan && <span className="rounded bg-[#f0f0f0] px-1.5 text-[11px] text-[#616161]">{t.plan}</span>}
                <span className="w-24 text-[12px] text-[#616161]">{t.due ?? ""}</span>
                <span className="w-36 truncate text-[12px] text-[#616161]">{t.assigned ?? ""}</span>
              </div>
            ))}
            {!tasks.length && <div className="py-8 text-center text-[13px] text-[#616161]">No tasks here yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export function ApprovalsView() {
  const { doc, act } = useTeams();
  const accepted = useAccepted(doc);
  const [form, setForm] = useState(false);
  const [name, setName] = useState("");
  const [ids, setIds] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [details, setDetails] = useState("");
  const matches = q.trim() ? doc.people.filter((p) => !ids.includes(p.id) && p.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5) : [];
  const send = () => {
    const value = serializeForm([
      ["Approval name", name.trim()],
      ["Approvers", ids.map((i) => personName(doc, i)).sort().join("; ")],
      ["Details", details.trim()],
    ]);
    accepted(() => act("approval", { kind: "type", target: "approval:new", value }), () => { setForm(false); setName(""); setIds([]); setDetails(""); });
  };
  return (
    <div className="relative flex min-w-0 flex-1 flex-col bg-white">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e0e0e0] px-5">
        <TIcon name="check" size={20} className="text-[#5b5fc7]" />
        <h1 className="text-[18px] font-bold">Approvals</h1>
        <div className="flex-1" />
        <button type="button" aria-label="New approval request" onClick={() => setForm(true)} className="flex items-center gap-1.5 rounded-[4px] bg-[#5b5fc7] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-[#4f52b2]">
          <TIcon name="plus" size={16} /> New approval request
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-5 py-3">
        <div className="flex border-b border-[#ebebeb] py-2 text-[12px] text-[#616161]">
          <span className="flex-1">Title</span>
          <span className="w-28">Status</span>
          <span className="w-40">Source</span>
          <span className="w-44">Approvers</span>
        </div>
        {(doc.approvals ?? []).map((a) => (
          <div key={a.id} className="flex items-center border-b border-[#f5f5f5] py-2 text-[13px]">
            <span className="flex-1 font-semibold">{a.name}</span>
            <span className="w-28">
              <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${a.status === "Approved" ? "bg-[#e7f2da] text-[#3b6e22]" : a.status === "Rejected" ? "bg-[#fde7e9] text-[#a4262c]" : "bg-[#fcf0d8] text-[#8e562e]"}`}>{a.status}</span>
            </span>
            <span className="w-40 text-[#616161]">{a.from === "me" ? "Sent by you" : personName(doc, a.from ?? "")}</span>
            <span className="w-44 truncate text-[#616161]">{a.approvers.map((x) => personName(doc, x)).join(", ")}</span>
          </div>
        ))}
        {!(doc.approvals ?? []).length && <div className="py-8 text-center text-[13px] text-[#616161]">No approvals yet.</div>}
      </div>
      {form && (
        <Modal
          title="New approval request"
          onClose={() => setForm(false)}
          width={480}
          footer={
            <>
              <SecondaryBtn onClick={() => setForm(false)}>Cancel</SecondaryBtn>
              <PrimaryBtn disabled={!name.trim() || !ids.length} onClick={send}>
                Send
              </PrimaryBtn>
            </>
          }
        >
          <Field label="Request type">
            <select aria-label="Request type" className={inputCls} defaultValue="Basic">
              <option>Basic</option>
            </select>
          </Field>
          <Field label="Approval name">
            <input aria-label="Approval name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name your request" className={inputCls} />
          </Field>
          <div className="relative mb-3">
            <span className="mb-1 block text-[13px] font-semibold text-[#424242]">Approvers</span>
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
              <input aria-label="Approvers" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && matches[0]) { setIds([...ids, matches[0].id]); setQ(""); } }} placeholder="Enter a name" className="min-w-[120px] flex-1 text-[14px] outline-none" />
            </div>
            {matches.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg">
                {matches.map((p) => (
                  <button key={p.id} type="button" onClick={() => { setIds([...ids, p.id]); setQ(""); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]">
                    <PersonAvatar id={p.id} size={22} /> {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Field label="Additional details">
            <textarea aria-label="Additional details" value={details} onChange={(e) => setDetails(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
          </Field>
        </Modal>
      )}
    </div>
  );
}
