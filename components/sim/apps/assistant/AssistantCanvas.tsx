"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { type ACtx, useAccepted, useOutside } from "./hooks";
import type { SimCommit, SimValue } from "@/types/sim";
import type { CanvasProps, SimUi, StatusBarProps } from "../../types";
import type { AssistantDoc, AssistantMessage, AssistantSource, AssistantUiState } from "./types";
import { AIcon, CopilotMark, FileTile } from "./icons";
import { visibleMessages } from "./core";
import { AutomateView } from "./AutomateView";

/* ------------------------------------------------------------------ */
/* Markdown-lite                                                       */
/* ------------------------------------------------------------------ */

function Inline({ text, onCite }: { text: string; onCite?: (n: number) => void }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[\d+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**") && p.length > 4) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (/^\[\d+\]$/.test(p)) {
          const n = Number(p.slice(1, -1));
          return (
            <button key={i} type="button" aria-label={`Source ${n}`} onClick={() => onCite?.(n)} className="mx-0.5 inline-flex h-[17px] min-w-[17px] -translate-y-[2px] items-center justify-center rounded-full bg-[#e8e4fb] px-1 text-[10px] font-semibold text-[#5b3cc4] hover:bg-[#d8d0fa]">
              {n}
            </button>
          );
        }
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export function Markdown({ text, onCite }: { text: string; onCite?: (n: number) => void }) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) {
      i++;
      continue;
    }
    if (/^#{2,3}\s/.test(l)) {
      out.push(
        <h3 key={i} className="mb-1 mt-3 text-[15px] font-semibold first:mt-0">
          <Inline text={l.replace(/^#+\s/, "")} onCite={onCite} />
        </h3>,
      );
      i++;
      continue;
    }
    if (/^\s*\|/.test(l)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        const cells = lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      out.push(
        <div key={i} className="my-2 overflow-auto rounded-lg border border-[#e0e0e0]">
          <table className="w-full text-[13px]">
            <thead className="bg-[#f5f5f5]">
              <tr>{rows[0]?.map((c, j) => <th key={j} className="px-3 py-1.5 text-left font-semibold"><Inline text={c} onCite={onCite} /></th>)}</tr>
            </thead>
            <tbody>
              {rows.slice(1).map((r, k) => (
                <tr key={k} className="border-t border-[#eee]">
                  {r.map((c, j) => (
                    <td key={j} className="px-3 py-1.5 align-top"><Inline text={c} onCite={onCite} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (/^\s*[-•]\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-•]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-•]\s+/, ""));
      out.push(
        <ul key={i} className="my-1.5 list-disc space-y-0.5 pl-5">
          {items.map((t, j) => (
            <li key={j}><Inline text={t} onCite={onCite} /></li>
          ))}
        </ul>,
      );
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ""));
      out.push(
        <ol key={i} className="my-1.5 list-decimal space-y-0.5 pl-5">
          {items.map((t, j) => (
            <li key={j}><Inline text={t} onCite={onCite} /></li>
          ))}
        </ol>,
      );
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|\s*\||\s*[-•]\s+|\s*\d+[.)]\s+)/.test(lines[i])) para.push(lines[i++]);
    out.push(
      <p key={i} className="my-1.5 first:mt-0">
        {para.map((t, j) => (
          <span key={j}>
            {j > 0 && <br />}
            <Inline text={t} onCite={onCite} />
          </span>
        ))}
      </p>,
    );
  }
  return <div className="text-[14px] leading-[22px] text-[#242424]">{out}</div>;
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export function AssistantCanvas({ doc, ui, onSelect, onCommit }: CanvasProps<AssistantDoc>) {
  const u = ui as AssistantUiState;
  const go = useCallback((p: Partial<AssistantUiState>) => onSelect(p as Partial<SimUi>), [onSelect]);
  const act = useCallback(
    (selection: string, c: SimCommit) => {
      onSelect({ selection } as Partial<SimUi>);
      onCommit(c);
    },
    [onSelect, onCommit],
  );
  const cmd = useCallback((selection: string, id: string, value?: string) => act(selection, { kind: "command", id, ...(value !== undefined ? { value: value as SimValue } : {}) }), [act]);
  const ctx: ACtx = { doc, ui: u, go, act, cmd };
  const view = u.view ?? "chat";
  return (
    <div className="flex h-full bg-[#f0f0f0] text-[14px] text-[#242424]" style={{ fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}>
      <nav className="flex w-[52px] shrink-0 flex-col items-center gap-1 bg-[#e8e8e8] pt-2" aria-label="Apps">
        {(
          [
            ["chat", "Copilot"],
            ["automate", "Power Automate"],
          ] as const
        ).map(([v, label]) => (
          <button key={v} type="button" aria-label={label} title={label} aria-current={view === v ? "page" : undefined} onClick={() => go(v === "chat" ? { view: "chat", selection: u.ctx ?? "chat", overlay: null } : { view: "automate", page: u.page && u.page !== "designer" ? u.page : u.flow ? "designer" : "home", selection: u.flow && u.page === "designer" ? `flow:${u.flow}` : "flows", overlay: null })} className={`relative flex w-11 flex-col items-center gap-0.5 rounded-md py-1.5 text-[9px] ${view === v ? "bg-white font-semibold text-[#242424] shadow-sm" : "text-[#616161] hover:bg-white/60"}`}>
            {view === v && <span className="absolute -left-1 top-2 h-5 w-[3px] rounded-full bg-[#6d28d9]" />}
            {v === "chat" ? <CopilotMark size={22} /> : <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#0066ff] text-white"><AIcon name="flow" size={15} /></span>}
            {v === "chat" ? "Copilot" : "Automate"}
          </button>
        ))}
        {[
          ["mail", "Outlook", "#0078d4"],
          ["word", "Word", "#185abd"],
        ].map(([icon, label, color]) => (
          <span key={label} title={`${label} (not part of this practice)`} className="flex w-11 flex-col items-center gap-0.5 py-1.5 text-[9px] text-[#9e9e9e]">
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md text-white opacity-50" style={{ background: color }}>
              <AIcon name={icon} size={14} />
            </span>
            {label}
          </span>
        ))}
      </nav>
      <div className="flex min-w-0 flex-1 overflow-hidden rounded-tl-lg bg-white">{view === "automate" ? <AutomateView c={ctx} /> : <CopilotView c={ctx} />}</div>
    </div>
  );
}

export function AssistantStatusBar(_props: StatusBarProps<AssistantDoc>) {
  return null;
}

/* ------------------------------------------------------------------ */
/* Copilot chat                                                        */
/* ------------------------------------------------------------------ */

type Panel = { kind: "source"; src: AssistantSource; n: number } | { kind: "file"; name: string } | { kind: "edit"; msg: AssistantMessage } | null;

function CopilotView({ c }: { c: ACtx }) {
  const { doc, ui, go, cmd } = c;
  const chatCtx = ui.ctx ?? "chat";
  const agent = chatCtx.startsWith("agent:") ? doc.agents?.find((a) => a.id === chatCtx.slice(6)) : undefined;
  const account = doc.accounts?.find((a) => a.id === doc.account) ?? doc.accounts?.[0];
  const work = Boolean(account?.work);
  const msgs = visibleMessages(doc, chatCtx);
  const [panel, setPanel] = useState<Panel>(null);
  const [draft, setDraft] = useState("");
  const [feedbackFor, setFeedbackFor] = useState<AssistantMessage | null>(null);
  const [acctOpen, setAcctOpen] = useState(false);
  const [savePrompt, setSavePrompt] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const acctRef = useOutside(acctOpen, () => setAcctOpen(false));
  const feedbackSig = msgs.map((m) => m.feedback ?? "").join("|");
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs.length, feedbackSig]);
  useEffect(() => setPanel(null), [chatCtx]);
  const first = (account?.name ?? "there").split(" ")[0];
  const suggestions = agent ? agent.suggestions ?? [] : doc.suggestions ?? [];

  return (
    <>
      <aside className="flex w-[250px] shrink-0 flex-col border-r border-[#e8e8e8] bg-[#fafafa]">
        <div className="flex h-14 items-center gap-2 px-4">
          <CopilotMark size={26} />
          <span className="flex-1 text-[16px] font-semibold">Copilot</span>
        </div>
        <div className="px-3">
          <button type="button" aria-label="New chat" onClick={() => { cmd(chatCtx, "chat.new"); setPanel(null); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[14px] font-semibold hover:bg-[#ededed]">
            <AIcon name="newchat" size={18} /> New chat
          </button>
        </div>
        <div className="mt-3 px-5 pb-1 text-[12px] font-semibold text-[#616161]">Agents</div>
        <div className="px-3">
          <button type="button" onClick={() => go({ ctx: "chat", selection: "chat" })} className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] ${chatCtx === "chat" ? "bg-white font-semibold shadow-sm" : "hover:bg-[#ededed]"}`}>
            <CopilotMark size={20} /> Copilot
          </button>
          {(doc.agents ?? []).map((a) => (
            <button key={a.id} type="button" aria-label={`${a.name} agent`} onClick={() => go({ ctx: `agent:${a.id}`, selection: `agent:${a.id}` })} className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] ${chatCtx === `agent:${a.id}` ? "bg-white font-semibold shadow-sm" : "hover:bg-[#ededed]"}`}>
              <span className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-white" style={{ background: a.color ?? "#8764b8" }}>
                {a.glyph ?? a.name[0]}
              </span>
              <span className="truncate">{a.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 px-5 pb-1 text-[12px] font-semibold text-[#616161]">Chats</div>
        <div className="min-h-0 flex-1 overflow-auto px-3">
          {(doc.history ?? []).map((h) => (
            <div key={h.id} className="group flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] hover:bg-[#ededed]">
              <span className="flex-1 truncate">{h.title}</span>
              <button type="button" aria-label={`Delete ${h.title}`} title="Delete" onClick={() => cmd(`history:${h.id}`, "history.delete", h.id)} className="invisible rounded p-0.5 text-[#616161] hover:bg-white hover:text-[#c4314b] group-hover:visible">
                <AIcon name="trash" size={15} />
              </button>
            </div>
          ))}
          {!(doc.history ?? []).length && <div className="px-2.5 py-1 text-[12px] text-[#9e9e9e]">No recent chats</div>}
        </div>
        <div className="relative border-t border-[#e8e8e8] p-2" ref={acctRef}>
          {acctOpen && (
            <div className="absolute bottom-full left-2 right-2 z-30 mb-1 rounded-lg border border-[#e0e0e0] bg-white py-1 shadow-lg" role="menu">
              <div className="px-3 py-1 text-[11px] font-semibold text-[#616161]">Switch account</div>
              {(doc.accounts ?? []).map((a) => (
                <button key={a.id} type="button" role="menuitem" onClick={() => { setAcctOpen(false); cmd("account", "account.switch", a.id); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8e4fb] text-[11px] font-semibold text-[#5b3cc4]">{a.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{a.email}</span>
                    <span className="block text-[11px] text-[#616161]">{a.work ? `Work account · ${a.org ?? ""}` : "Personal account"}</span>
                  </span>
                  {a.id === account?.id && <AIcon name="check" size={14} className="text-[#6d28d9]" />}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Account" onClick={() => setAcctOpen((x) => !x)} className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-[#ededed]">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8e4fb] text-[12px] font-semibold text-[#5b3cc4]">{(account?.name ?? "?").split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold">{account?.name}</span>
                <span className="block truncate text-[11px] text-[#616161]">{work ? account?.org ?? "Work" : "Personal"}</span>
              </span>
            </button>
            <button type="button" aria-label="Settings" title="Settings" onClick={() => go({ overlay: "settings", selection: "settings" })} className="rounded-lg p-2 text-[#424242] hover:bg-[#ededed]">
              <AIcon name="gear" size={18} />
            </button>
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#f0f0f0] px-5">
          <span className="text-[16px] font-semibold">{agent ? agent.name : doc.product ?? "Microsoft 365 Copilot Chat"}</span>
          {agent && <span className="truncate text-[12px] text-[#616161]">{agent.description}</span>}
          <div className="flex-1" />
          {work ? (
            <span className="flex items-center gap-1 rounded-full bg-[#dff6dd] px-2.5 py-1 text-[12px] font-semibold text-[#107c10]" title="Enterprise data protection applies to this chat">
              <AIcon name="shield" size={14} /> Protected
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-[#f5f5f5] px-2.5 py-1 text-[12px] text-[#616161]" title="Signed in with a personal account">
              <AIcon name="globe" size={14} /> Personal account
            </span>
          )}
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <div ref={scroller} className="min-h-0 flex-1 overflow-auto">
              <div className="mx-auto w-full max-w-[760px] px-6 py-5">
                {!msgs.length && (
                  <div className="flex flex-col items-center pt-8 text-center">
                    {agent ? (
                      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-[20px] font-bold text-white" style={{ background: agent.color ?? "#8764b8" }}>
                        {agent.glyph ?? agent.name[0]}
                      </span>
                    ) : (
                      <CopilotMark size={48} />
                    )}
                    <h2 className="mb-1 mt-3 text-[22px] font-semibold">{agent ? agent.greeting ?? `Hi, I'm ${agent.name}.` : `Hi ${first}, how can I help?`}</h2>
                    <p className="mb-5 max-w-[460px] text-[13px] text-[#616161]">{agent ? agent.description : "Ask a question, draft an email, summarize a file, or brainstorm ideas."}</p>
                    {suggestions.length > 0 && (
                      <div className="grid w-full max-w-[640px] grid-cols-2 gap-2">
                        {suggestions.map((s) => (
                          <button key={s} type="button" onClick={() => setDraft(s)} className="rounded-xl border border-[#e0e0e0] bg-white px-4 py-3 text-left text-[13px] shadow-sm hover:border-[#c8b8f5] hover:bg-[#faf8ff]">
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {msgs.map((m) =>
                  m.role === "user" ? (
                    <UserMsg key={m.id} m={m} onFile={(name) => setPanel({ kind: "file", name })} onSave={() => setSavePrompt(m.text)} />
                  ) : (
                    <AssistantMsg key={m.id} c={c} m={m} onCite={(n) => { const src = m.sources?.[n - 1]; if (!src) return; setPanel({ kind: "source", src, n }); cmd(`msg:${m.id}`, "source.open", String(n)); }} onEdit={() => setPanel({ kind: "edit", msg: m })} onDown={() => setFeedbackFor(m)} onFollow={(t) => setDraft(t)} />
                  ),
                )}
              </div>
            </div>
            <PromptBox c={c} ctxKey={chatCtx} draft={draft} setDraft={setDraft} placeholder={agent ? `Message ${agent.name}` : "Message Copilot"} work={work} onSavePrompt={(t) => setSavePrompt(t)} onFile={(name) => setPanel({ kind: "file", name })} />
          </div>
          {panel && <SidePanel c={c} panel={panel} onClose={() => setPanel(null)} />}
        </div>
      </div>
      {feedbackFor && <FeedbackDialog c={c} m={feedbackFor} onClose={() => setFeedbackFor(null)} />}
      {savePrompt !== null && <SavePromptDialog c={c} text={savePrompt} onClose={() => setSavePrompt(null)} />}
      {ui.overlay === "settings" && <SettingsDialog c={c} />}
    </>
  );
}

function UserMsg({ m, onFile, onSave }: { m: AssistantMessage; onFile: (n: string) => void; onSave: () => void }) {
  return (
    <div className="group mb-5 flex flex-col items-end">
      {m.attachments?.length ? (
        <div className="mb-1 flex flex-wrap justify-end gap-1.5">
          {m.attachments.map((a) => (
            <button key={a} type="button" aria-label={`Open ${a}`} onClick={() => onFile(a)} className="flex items-center gap-2 rounded-lg border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-[12px] shadow-sm hover:bg-[#fafafa]">
              <FileTile name={a} size={20} /> {a}
            </button>
          ))}
        </div>
      ) : null}
      <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-[#ebe7fb] px-4 py-2.5 text-[14px] leading-[21px]">{m.text}</div>
      <button type="button" onClick={onSave} className="invisible mt-1 flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-[#616161] hover:bg-[#f5f5f5] group-hover:visible">
        <AIcon name="prompts" size={13} /> Save prompt
      </button>
    </div>
  );
}

function ActionBtn({ icon, label, onClick, active }: { icon: string; label: string; onClick: () => void; active?: boolean }) {
  return (
    <button type="button" title={label} aria-label={label} aria-pressed={active} onClick={onClick} className={`rounded-md p-1.5 ${active ? "bg-[#ebe7fb] text-[#5b3cc4]" : "text-[#616161] hover:bg-[#f0f0f0] hover:text-[#242424]"}`}>
      <AIcon name={icon} size={16} />
    </button>
  );
}

function AssistantMsg({ c, m, onCite, onEdit, onDown, onFollow }: { c: ACtx; m: AssistantMessage; onCite: (n: number) => void; onEdit: () => void; onDown: () => void; onFollow: (t: string) => void }) {
  const key = `msg:${m.id}`;
  const [copiedFlash, setCopiedFlash] = useState(false);
  const total = m.rule ? 1 + (c.doc.rules.find((r) => r.id === m.rule)?.variants?.length ?? 0) : 1;
  const negative = m.feedback && m.feedback !== "Like";
  return (
    <div className="mb-6 flex gap-3" data-mid={m.id}>
      <span className="mt-0.5">
        <CopilotMark size={24} />
      </span>
      <div className="min-w-0 flex-1">
        {m.edited !== undefined ? (
          <>
            <div className="mb-1 inline-flex items-center gap-1 rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[11px] text-[#616161]">
              <AIcon name="edit" size={11} /> Edited by you
            </div>
            <Markdown text={m.edited} onCite={onCite} />
          </>
        ) : (
          <Markdown text={m.text} onCite={onCite} />
        )}
        {m.sources?.length ? (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[12px] font-semibold text-[#616161]">Sources</span>
            {m.sources.map((s, i) => (
              <button key={i} type="button" onClick={() => onCite(i + 1)} className="flex max-w-[260px] items-center gap-1.5 rounded-full border border-[#e0e0e0] bg-white px-2 py-0.5 text-[12px] hover:bg-[#faf8ff]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#e8e4fb] text-[10px] font-semibold text-[#5b3cc4]">{i + 1}</span>
                <span className="truncate">{s.title}</span>
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-1.5 flex items-center gap-0.5">
          <ActionBtn
            icon={copiedFlash ? "check" : "copy"}
            label="Copy"
            onClick={() => {
              c.cmd(key, "response.copy");
              setCopiedFlash(true);
              setTimeout(() => setCopiedFlash(false), 1200);
            }}
          />
          <ActionBtn icon="edit" label="Edit" onClick={onEdit} />
          <ActionBtn icon="regenerate" label="Regenerate" onClick={() => c.cmd(key, "response.regenerate")} />
          <ActionBtn icon="thumbUp" label="Like" active={m.feedback === "Like"} onClick={() => c.cmd(key, "response.feedback", "Like")} />
          <ActionBtn icon="thumbDown" label="Dislike" active={Boolean(negative)} onClick={onDown} />
          {total > 1 && <span className="ml-1 text-[11px] text-[#616161]">{(m.variant ?? 0) + 1} of {total}</span>}
          <span className="ml-auto text-[11px] text-[#9e9e9e]">AI-generated content may be incorrect</span>
        </div>
        {negative && (
          <div className="mt-2 rounded-lg border border-[#f3d6d8] bg-[#fdf3f4] px-3 py-2 text-[12px] text-[#7a1f2b]" role="status">
            Thanks for your feedback ({m.feedback}).
            {m.error && m.feedback === "Inaccurate" && (
              <span className="mt-1 block text-[#424242]">
                <strong>The claim:</strong> {m.error.claim}
                <br />
                <strong>What the source says:</strong> {m.error.correction}
              </span>
            )}
          </div>
        )}
        {m.followups?.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {m.followups.map((f) => (
              <button key={f} type="button" onClick={() => onFollow(f)} className="rounded-full border border-[#d9d0f7] bg-white px-3 py-1 text-[12px] text-[#5b3cc4] hover:bg-[#faf8ff]">
                {f}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PromptBox({ c, ctxKey, draft, setDraft, placeholder, work, onSavePrompt, onFile }: { c: ACtx; ctxKey: string; draft: string; setDraft: (s: string) => void; placeholder: string; work: boolean; onSavePrompt: (t: string) => void; onFile: (n: string) => void }) {
  const { doc, act, cmd } = c;
  const [blocked, setBlocked] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [gallery, setGallery] = useState(false);
  const ta = useRef<HTMLTextAreaElement>(null);
  const accepted = useAccepted(doc);
  const addRef = useOutside(addOpen, () => setAddOpen(false));
  const galRef = useOutside(gallery, () => setGallery(false));
  const files = doc.attached?.[ctxKey] ?? [];
  useLayoutEffect(() => {
    const el = ta.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(200, Math.max(24, el.scrollHeight))}px`;
  }, [draft]);
  useEffect(() => setBlocked(null), [draft]);
  const send = () => {
    const v = draft.trim();
    if (!v) return;
    const hit = doc.policy?.blockTerms.find((t) => v.toLowerCase().includes(t.toLowerCase()));
    if (hit && doc.policy) {
      setBlocked(doc.policy.message);
      return;
    }
    accepted(() => act(ctxKey, { kind: "type", target: "prompt", value: v }), () => setDraft(""));
  };
  return (
    <div className="mx-auto w-full max-w-[760px] px-6 pb-4">
      {blocked && (
        <div className="mb-2 flex items-start gap-2 rounded-lg border border-[#f1bbbc] bg-[#fdf3f4] px-3 py-2 text-[13px] text-[#a4262c]" role="alert">
          <AIcon name="warning" size={16} />
          <span className="flex-1">{blocked}</span>
          <button type="button" aria-label="Dismiss" onClick={() => setBlocked(null)}>
            <AIcon name="close" size={14} />
          </button>
        </div>
      )}
      <div className="rounded-2xl border border-[#d6d6d6] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] focus-within:border-[#a28bf0]">
        {files.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-3 pt-3">
            {files.map((f) => (
              <span key={f} className="flex items-center gap-2 rounded-lg border border-[#e0e0e0] bg-[#fafafa] px-2 py-1 text-[12px]">
                <button type="button" onClick={() => onFile(f)} className="flex items-center gap-2" aria-label={`Preview ${f}`}>
                  <FileTile name={f} size={18} /> {f}
                </button>
                <button type="button" aria-label={`Remove ${f}`} onClick={() => cmd(ctxKey, "prompt.detach", f)} className="text-[#616161] hover:text-[#242424]">
                  <AIcon name="close" size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
        <textarea
          ref={ta}
          aria-label={placeholder}
          placeholder={placeholder}
          value={draft}
          rows={1}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          className="block w-full resize-none bg-transparent px-4 pt-3 text-[14px] leading-[22px] outline-none placeholder:text-[#8a8a8a]"
        />
        <div className="flex items-center gap-1 px-2 pb-2 pt-1">
          <div className="relative" ref={addRef}>
            <button type="button" aria-label="Add content" title="Add content" onClick={() => setAddOpen((x) => !x)} className="rounded-full p-1.5 text-[#424242] hover:bg-[#f0f0f0]">
              <AIcon name="plus" size={18} />
            </button>
            {addOpen && (
              <div className="absolute bottom-full left-0 z-30 mb-1 w-72 rounded-lg border border-[#e0e0e0] bg-white py-1 text-[13px] shadow-lg" role="menu">
                <div className="px-3 py-1 text-[11px] font-semibold text-[#616161]">Upload from this device</div>
                {(doc.files ?? []).map((f) => (
                  <button key={f.name} type="button" role="menuitem" onClick={() => { setAddOpen(false); cmd(ctxKey, "prompt.attach", f.name); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f5f5f5]">
                    <FileTile name={f.name} size={18} />
                    <span className="flex-1 truncate">{f.name}</span>
                    <span className="text-[11px] text-[#9e9e9e]">{f.size ?? ""}</span>
                  </button>
                ))}
                {!(doc.files ?? []).length && <div className="px-3 py-1.5 text-[#9e9e9e]">No files available</div>}
              </div>
            )}
          </div>
          <div className="relative" ref={galRef}>
            <button type="button" aria-label="View prompts" onClick={() => setGallery((x) => !x)} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] text-[#424242] hover:bg-[#f0f0f0]">
              <AIcon name="prompts" size={15} /> View prompts
            </button>
            {gallery && (
              <div className="absolute bottom-full left-0 z-30 mb-1 w-80 rounded-lg border border-[#e0e0e0] bg-white py-1 text-[13px] shadow-lg" role="menu">
                <div className="px-3 py-1 text-[11px] font-semibold text-[#616161]">Saved prompts</div>
                {(doc.savedPrompts ?? []).map((p) => (
                  <button key={p.title} type="button" role="menuitem" onClick={() => { setGallery(false); setDraft(p.text); }} className="block w-full px-3 py-1.5 text-left hover:bg-[#f5f5f5]">
                    <span className="block font-semibold">{p.title}</span>
                    <span className="block truncate text-[12px] text-[#616161]">{p.text}</span>
                  </button>
                ))}
                {!(doc.savedPrompts ?? []).length && <div className="px-3 py-1.5 text-[12px] text-[#9e9e9e]">Prompts you save appear here.</div>}
                <div className="my-1 border-t border-[#eee]" />
                <button type="button" role="menuitem" disabled={!draft.trim()} onClick={() => { setGallery(false); onSavePrompt(draft); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f5f5f5] disabled:opacity-40">
                  <AIcon name="save" size={14} /> Save the prompt in the box
                </button>
              </div>
            )}
          </div>
          <div className="flex-1" />
          <button type="button" aria-label="Send" title="Send" disabled={!draft.trim()} onClick={send} className={`rounded-full p-1.5 ${draft.trim() ? "bg-[#6d28d9] text-white hover:bg-[#5b21b6]" : "bg-[#f0f0f0] text-[#bdbdbd]"}`}>
            <AIcon name="send" size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-1 text-[11px] text-[#8a8a8a]">
        {work ? (
          <>
            <AIcon name="shield" size={12} className="text-[#107c10]" /> Enterprise data protection applies. Your prompts and responses are not used to train the models.
          </>
        ) : (
          "AI-generated content may be incorrect. Check important facts."
        )}
      </div>
    </div>
  );
}

function SidePanel({ c, panel, onClose }: { c: ACtx; panel: NonNullable<Panel>; onClose: () => void }) {
  const { doc, act } = c;
  const [text, setText] = useState(panel.kind === "edit" ? (panel.msg.edited ?? panel.msg.text).replace(/\*\*/g, "") : "");
  const accepted = useAccepted(doc);
  const title = panel.kind === "source" ? `Source ${panel.n}` : panel.kind === "file" ? panel.name : "Edit response";
  return (
    <div className="flex w-[380px] shrink-0 flex-col border-l border-[#ececec] bg-[#fcfcfc]">
      <div className="flex h-12 items-center gap-2 border-b border-[#ececec] px-4">
        <span className="flex-1 truncate text-[14px] font-semibold">{title}</span>
        <button type="button" aria-label="Close" onClick={onClose} className="rounded p-1 hover:bg-[#f0f0f0]">
          <AIcon name="close" size={16} />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        {panel.kind === "source" &&
          (panel.src.missing ? (
            <div className="rounded-lg border border-[#e0e0e0] bg-white p-5 text-center">
              <div className="mb-2 text-[40px] font-bold text-[#c8c8c8]">404</div>
              <div className="mb-1 text-[14px] font-semibold">We can&apos;t find that page</div>
              <p className="text-[12px] text-[#616161]">The address for &quot;{panel.src.title}&quot; doesn&apos;t lead anywhere. The page may never have existed.</p>
            </div>
          ) : (
            <div className="rounded-lg border border-[#e0e0e0] bg-white p-4">
              <div className="mb-0.5 text-[15px] font-semibold">{panel.src.title}</div>
              {panel.src.site && <div className="mb-3 text-[12px] text-[#107c10]">{panel.src.site}</div>}
              <div className="whitespace-pre-line text-[13px] leading-[20px] text-[#424242]">{panel.src.body ?? panel.src.snippet ?? ""}</div>
            </div>
          ))}
        {panel.kind === "file" && (
          <div className="rounded-lg border border-[#e0e0e0] bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileTile name={panel.name} size={22} />
              <span className="text-[14px] font-semibold">{panel.name}</span>
            </div>
            <div className="whitespace-pre-line text-[13px] leading-[20px] text-[#424242]">{doc.files?.find((f) => f.name === panel.name)?.preview ?? "Preview isn't available."}</div>
          </div>
        )}
        {panel.kind === "edit" && (
          <>
            <p className="mb-2 text-[12px] text-[#616161]">Edit the response before you use it. Replace placeholders, fix facts, and make it sound like you.</p>
            <textarea aria-label="Edit response" value={text} onChange={(e) => setText(e.target.value)} className="h-[340px] w-full resize-none rounded-lg border border-[#d6d6d6] bg-white p-3 text-[13px] leading-[20px] outline-none focus:border-[#a28bf0]" />
          </>
        )}
      </div>
      {panel.kind === "edit" && (
        <div className="flex justify-end gap-2 border-t border-[#ececec] p-3">
          <button type="button" onClick={onClose} className="rounded-md border border-[#d1d1d1] px-4 py-1.5 text-[13px] font-semibold hover:bg-[#f5f5f5]">
            Cancel
          </button>
          <button type="button" aria-label="Done" onClick={() => accepted(() => act(`msg:${panel.msg.id}`, { kind: "type", target: `edit:${panel.msg.id}`, value: text }), onClose)} className="rounded-md bg-[#6d28d9] px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#5b21b6]">
            Done
          </button>
        </div>
      )}
    </div>
  );
}

function Dialog({ title, children, onClose, footer, width = 440 }: { title: string; children: React.ReactNode; onClose: () => void; footer?: React.ReactNode; width?: number }) {
  return (
    <div className="absolute inset-0 z-[80] flex items-center justify-center bg-black/30 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label={title} className="flex max-h-full flex-col rounded-xl bg-white shadow-2xl" style={{ width }}>
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <h2 className="text-[17px] font-semibold">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded p-1 hover:bg-[#f0f0f0]">
            <AIcon name="close" size={16} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 py-2 text-[13px]">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-5 pb-4 pt-2">{footer}</div>}
      </div>
    </div>
  );
}

function FeedbackDialog({ c, m, onClose }: { c: ACtx; m: AssistantMessage; onClose: () => void }) {
  const [reason, setReason] = useState("Inaccurate");
  const [note, setNote] = useState("");
  const accepted = useAccepted(c.doc);
  return (
    <Dialog
      title="Submit feedback"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className="rounded-md border border-[#d1d1d1] px-4 py-1.5 font-semibold hover:bg-[#f5f5f5]">
            Cancel
          </button>
          <button type="button" aria-label="Submit" onClick={() => accepted(() => c.cmd(`msg:${m.id}`, "response.feedback", reason), onClose)} className="rounded-md bg-[#6d28d9] px-4 py-1.5 font-semibold text-white hover:bg-[#5b21b6]">
            Submit
          </button>
        </>
      }
    >
      <div className="mb-2 font-semibold">What went wrong?</div>
      <div className="mb-3 space-y-1">
        {["Inaccurate", "Not helpful", "Harmful or offensive", "Other"].map((r) => (
          <label key={r} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[#f5f5f5]">
            <input type="radio" name="as-fb" checked={reason === r} onChange={() => setReason(r)} aria-label={r} /> {r}
          </label>
        ))}
      </div>
      <textarea aria-label="Tell us more" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tell us more (optional). Don't include personal information." rows={3} className="w-full resize-none rounded-md border border-[#d6d6d6] p-2 outline-none focus:border-[#a28bf0]" />
    </Dialog>
  );
}

function SavePromptDialog({ c, text, onClose }: { c: ACtx; text: string; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(text);
  const accepted = useAccepted(c.doc);
  return (
    <Dialog
      title="Save prompt"
      onClose={onClose}
      width={480}
      footer={
        <>
          <button type="button" onClick={onClose} className="rounded-md border border-[#d1d1d1] px-4 py-1.5 font-semibold hover:bg-[#f5f5f5]">
            Cancel
          </button>
          <button type="button" aria-label="Save" disabled={!title.trim() || !body.trim()} onClick={() => accepted(() => c.act("chat", { kind: "type", target: "saveprompt", value: `Title: ${title.trim()}\nPrompt: ${body.trim()}` }), onClose)} className="rounded-md bg-[#6d28d9] px-4 py-1.5 font-semibold text-white hover:bg-[#5b21b6] disabled:opacity-40">
            Save
          </button>
        </>
      }
    >
      <label className="mb-3 block">
        <span className="mb-1 block font-semibold">Title</span>
        <input aria-label="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-md border border-[#d6d6d6] px-2.5 py-1.5 outline-none focus:border-[#a28bf0]" />
      </label>
      <label className="block">
        <span className="mb-1 block font-semibold">Prompt</span>
        <textarea aria-label="Prompt" value={body} onChange={(e) => setBody(e.target.value)} rows={6} className="w-full resize-none rounded-md border border-[#d6d6d6] p-2.5 outline-none focus:border-[#a28bf0]" />
      </label>
      <p className="mt-1 text-[11px] text-[#616161]">Use [brackets] for the parts that change each time, like [CLIENT NAME] or [DATE].</p>
    </Dialog>
  );
}

function Toggle({ on, label, onChange, disabled }: { on: boolean; label: string; onChange: () => void; disabled?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} disabled={disabled} onClick={onChange} className={`relative h-5 w-10 shrink-0 rounded-full border transition-colors disabled:opacity-40 ${on ? "border-[#6d28d9] bg-[#6d28d9]" : "border-[#616161] bg-white"}`}>
      <span className={`absolute top-[2px] h-3.5 w-3.5 rounded-full transition-all ${on ? "left-[21px] bg-white" : "left-[3px] bg-[#616161]"}`} />
    </button>
  );
}

function SettingsDialog({ c }: { c: ACtx }) {
  const { doc, go, cmd } = c;
  const s = doc.settings ?? {};
  const account = doc.accounts?.find((a) => a.id === doc.account) ?? doc.accounts?.[0];
  const work = Boolean(account?.work);
  const close = () => go({ overlay: null, selection: c.ui.ctx ?? "chat" });
  const row = (label: string, desc: string, on: boolean, id: string) => (
    <div className="flex items-start gap-4 border-b border-[#f0f0f0] py-3">
      <div className="flex-1">
        <div className="text-[14px] font-semibold">{label}</div>
        <div className="text-[12px] text-[#616161]">{desc}</div>
      </div>
      <Toggle on={on} label={label} disabled={work} onChange={() => cmd("settings", id, on ? "off" : "on")} />
    </div>
  );
  return (
    <Dialog title="Settings" onClose={close} width={560} footer={<button type="button" onClick={close} className="rounded-md bg-[#6d28d9] px-4 py-1.5 font-semibold text-white">Done</button>}>
      <div className="mb-3 flex gap-2 text-[13px]">
        <span className="rounded-full bg-[#ebe7fb] px-3 py-1 font-semibold text-[#5b3cc4]">Privacy</span>
        <span className="rounded-full px-3 py-1 text-[#616161]">Personalization</span>
        <span className="rounded-full px-3 py-1 text-[#616161]">Account</span>
      </div>
      {work ? (
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-[#dff6dd] p-3 text-[13px] text-[#0b5a08]">
          <AIcon name="shield" size={18} />
          <span>
            You are signed in with your work account ({account?.org}). Enterprise data protection applies: your organization&apos;s agreement controls how prompts are stored, and they are not used to train the models. Your administrator manages these settings.
          </span>
        </div>
      ) : (
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-[#fff4ce] p-3 text-[13px] text-[#5c4300]">
          <AIcon name="info" size={18} />
          <span>You are signed in with a personal account. Prompts you send are processed in the provider&apos;s cloud and may be kept according to the consumer terms.</span>
        </div>
      )}
      {row("Model training on text", "Allow your conversations to be used to train the AI models.", s.training ?? true, "settings.training")}
      {row("Model training on voice", "Allow voice conversations to be used to train the AI models.", s.voiceTraining ?? true, "settings.voiceTraining")}
      {row("Personalization and memory", "Let Copilot remember details from your conversations.", s.personalization ?? true, "settings.personalization")}
    </Dialog>
  );
}
