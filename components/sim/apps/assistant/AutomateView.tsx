"use client";

import { useEffect, useMemo, useState } from "react";
import type { AssistantFlow, FlowStep } from "./types";
import { type ACtx, useAccepted, useOutside } from "./hooks";
import { AIcon, CopilotMark } from "./icons";
import { CONNECTOR_COLOR, CONNECTOR_GLYPH, STEP_ACTIONS, TRIGGERS, actionDef } from "./catalog";

const BLUE = "#0066ff";

function Glyph({ connector, size = 28 }: { connector: string; size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-md font-bold text-white" style={{ width: size, height: size, background: CONNECTOR_COLOR[connector] ?? "#605e5c", fontSize: size * 0.45 }} aria-hidden="true">
      {CONNECTOR_GLYPH[connector] ?? connector[0]}
    </span>
  );
}

function Btn({ children, onClick, primary, disabled, label }: { children: React.ReactNode; onClick?: () => void; primary?: boolean; disabled?: boolean; label?: string }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className={`flex items-center gap-1.5 rounded-[4px] px-3 py-1.5 text-[13px] font-semibold disabled:opacity-40 ${primary ? "text-white hover:brightness-110" : "border border-[#d1d1d1] bg-white hover:bg-[#f5f5f5]"}`} style={primary ? { background: BLUE } : undefined}>
      {children}
    </button>
  );
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIMES = Array.from({ length: 24 }, (_, i) => {
  const h = 6 + Math.floor(i / 2);
  const m = i % 2 ? 30 : 0;
  return `${h % 12 === 0 ? 12 : h % 12}:${m ? "30" : "00"} ${h >= 12 ? "PM" : "AM"}`;
});
const START_DATES = ["10/20/2026", "10/21/2026", "10/22/2026", "10/23/2026", "10/26/2026", "10/27/2026"];

/* ------------------------------------------------------------------ */
/* Build a flow                                                        */
/* ------------------------------------------------------------------ */

function BuildDialog({ c, type, onClose }: { c: ACtx; type: AssistantFlow["type"]; onClose: () => void }) {
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState<string>("");
  const [q, setQ] = useState("");
  const [start, setStart] = useState(START_DATES[0]);
  const [at, setAt] = useState("8:00 AM");
  const [every, setEvery] = useState("1");
  const [unit, setUnit] = useState("Week");
  const [days, setDays] = useState<string[]>([]);
  const accepted = useAccepted(c.doc);
  const triggers = TRIGGERS.filter((t) => t.flowType === type && t.name.toLowerCase().includes(q.toLowerCase()));
  const title = type === "Scheduled" ? "Build a scheduled cloud flow" : type === "Instant" ? "Build an instant cloud flow" : "Build an automated cloud flow";
  const create = () => {
    const lines: [string, string][] = [
      ["Type", type],
      ["Name", name.trim()],
    ];
    if (type === "Scheduled") {
      lines.push(["Starting", start], ["At", at], ["Repeat every", `${every.trim() || "1"} ${unit}`], ["On these days", unit === "Week" ? DAYS.filter((d) => days.includes(d)).join(", ") : ""]);
    } else lines.push(["Trigger", trigger]);
    accepted(() => c.act("flows", { kind: "type", target: "flow.create", value: lines.map(([k, v]) => `${k}: ${v}`).join("\n") }), onClose);
  };
  return (
    <div className="absolute inset-0 z-[80] flex items-center justify-center bg-black/30 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label={title} className="flex max-h-full w-[640px] flex-col rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between px-6 pb-2 pt-5">
          <div>
            <h2 className="text-[20px] font-semibold">{title}</h2>
            <p className="text-[12px] text-[#616161]">{type === "Scheduled" ? "You choose when and how often it runs." : type === "Instant" ? "Runs when you select it." : "Triggered by a designated event."}</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded p-1 hover:bg-[#f0f0f0]">
            <AIcon name="close" size={16} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-6 py-2 text-[13px]">
          <label className="mb-4 block">
            <span className="mb-1 block font-semibold">Flow name</span>
            <input aria-label="Flow name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-[4px] border border-[#8a8886] px-2.5 py-1.5 outline-none focus:border-[#0066ff]" />
          </label>
          {type === "Scheduled" ? (
            <>
              <div className="mb-1 font-semibold">Run this flow</div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="w-16 text-[#616161]">Starting</span>
                <select aria-label="Starting" value={start} onChange={(e) => setStart(e.target.value)} className="rounded-[4px] border border-[#8a8886] px-2 py-1.5">
                  {START_DATES.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <span className="text-[#616161]">at</span>
                <select aria-label="At" value={at} onChange={(e) => setAt(e.target.value)} className="rounded-[4px] border border-[#8a8886] px-2 py-1.5">
                  {TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3 flex items-center gap-2">
                <span className="w-16 text-[#616161]">Repeat every</span>
                <input aria-label="Repeat every" value={every} onChange={(e) => setEvery(e.target.value.replace(/[^0-9]/g, ""))} className="w-16 rounded-[4px] border border-[#8a8886] px-2 py-1.5" />
                <select aria-label="Repeat unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded-[4px] border border-[#8a8886] px-2 py-1.5">
                  {["Minute", "Hour", "Day", "Week", "Month"].map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
              {unit === "Week" && (
                <div className="mb-3">
                  <div className="mb-1 text-[#616161]">On these days</div>
                  <div className="flex gap-1.5">
                    {DAYS.map((d) => (
                      <button key={d} type="button" aria-label={d} aria-pressed={days.includes(d)} onClick={() => setDays(days.includes(d) ? days.filter((x) => x !== d) : [...days, d])} className={`h-8 w-8 rounded-full border text-[12px] font-semibold ${days.includes(d) ? "border-[#0066ff] bg-[#0066ff] text-white" : "border-[#8a8886] hover:bg-[#f5f5f5]"}`}>
                        {d[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-[12px] text-[#616161]">
                This flow will run: {every || "1"} {unit.toLowerCase()}
                {every !== "1" ? "s" : ""}
                {unit === "Week" && days.length ? ` on ${DAYS.filter((d) => days.includes(d)).join(", ")}` : ""} at {at}
              </p>
            </>
          ) : (
            <>
              <div className="mb-1 font-semibold">Choose your flow&apos;s trigger</div>
              <input aria-label="Search all triggers" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all triggers" className="mb-2 w-full rounded-[4px] border border-[#8a8886] px-2.5 py-1.5 outline-none focus:border-[#0066ff]" />
              <div className="max-h-56 overflow-auto rounded-[4px] border border-[#e1e1e1]">
                {triggers.map((t) => (
                  <label key={t.name} className={`flex cursor-pointer items-center gap-3 border-b border-[#f3f2f1] px-3 py-2 last:border-0 ${trigger === t.name ? "bg-[#eff6fc]" : "hover:bg-[#faf9f8]"}`}>
                    <input type="radio" name="pa-trigger" checked={trigger === t.name} onChange={() => setTrigger(t.name)} aria-label={t.name} />
                    <Glyph connector={t.connector} size={26} />
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-[11px] text-[#616161]">{t.connector}</span>
                    </span>
                  </label>
                ))}
                {!triggers.length && <div className="p-3 text-[#616161]">No triggers match your search.</div>}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end gap-2 px-6 pb-5 pt-3">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn primary label="Create" disabled={!name.trim() || (type !== "Scheduled" && !trigger)} onClick={create}>
            Create
          </Btn>
        </div>
      </div>
    </div>
  );
}

function DescribeBox({ c }: { c: ACtx }) {
  const [text, setText] = useState("");
  const accepted = useAccepted(c.doc);
  const miss = c.doc.flags?.describeMiss;
  return (
    <div className="rounded-xl border border-[#d9d0f7] bg-gradient-to-br from-[#faf8ff] to-[#f2f7ff] p-4">
      <div className="mb-2 flex items-center gap-2 text-[14px] font-semibold">
        <CopilotMark size={20} /> Describe it to design it
      </div>
      <p className="mb-2 text-[12px] text-[#616161]">Tell Copilot what you want to automate: what starts it, and what should happen.</p>
      <div className="flex items-end gap-2 rounded-lg border border-[#d6d6d6] bg-white p-2">
        <textarea
          aria-label="Describe your flow"
          value={text}
          rows={2}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (text.trim()) accepted(() => c.act("flows", { kind: "type", target: "flow.describe", value: text.trim() }), () => setText(""));
            }
          }}
          placeholder="For example: Every Monday at 8 AM, send an email to my team"
          className="flex-1 resize-none text-[13px] outline-none"
        />
        <button type="button" aria-label="Generate" disabled={!text.trim()} onClick={() => accepted(() => c.act("flows", { kind: "type", target: "flow.describe", value: text.trim() }), () => setText(""))} className="rounded-full p-1.5 text-white disabled:bg-[#e0e0e0]" style={{ background: text.trim() ? "#6d28d9" : undefined }}>
          <AIcon name="send" size={16} />
        </button>
      </div>
      {typeof miss === "string" && <p className="mt-2 text-[12px] text-[#a4262c]">Copilot couldn&apos;t build a flow from that description. Say what starts the flow and what it should do.</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

function CreatePage({ c, onBuild }: { c: ACtx; onBuild: (t: AssistantFlow["type"]) => void }) {
  const tiles: [AssistantFlow["type"], string, string, string][] = [
    ["Automated", "Automated cloud flow", "Triggered by a designated event.", "bolt"],
    ["Instant", "Instant cloud flow", "Triggered manually as needed.", "play"],
    ["Scheduled", "Scheduled cloud flow", "You choose when and how often it runs.", "regenerate"],
  ];
  return (
    <div className="px-8 py-6">
      <h1 className="mb-1 text-[22px] font-semibold">Three ways to make a flow</h1>
      <p className="mb-5 text-[13px] text-[#616161]">Start from blank, a template, or a description.</p>
      <div className="mb-6 max-w-[760px]">
        <DescribeBox c={c} />
      </div>
      <h2 className="mb-2 text-[15px] font-semibold">Start from blank</h2>
      <div className="mb-6 flex flex-wrap gap-3">
        {tiles.map(([t, title, desc, icon]) => (
          <button key={t} type="button" aria-label={title} onClick={() => onBuild(t)} className="flex w-[220px] flex-col items-start gap-2 rounded-lg border border-[#e1e1e1] bg-white p-4 text-left shadow-sm hover:border-[#0066ff] hover:shadow-md">
            <span className="flex h-9 w-9 items-center justify-center rounded-md text-white" style={{ background: BLUE }}>
              <AIcon name={icon} size={18} />
            </span>
            <span className="text-[14px] font-semibold">{title}</span>
            <span className="text-[12px] text-[#616161]">{desc}</span>
          </button>
        ))}
      </div>
      {(c.doc.templates ?? []).length > 0 && (
        <>
          <h2 className="mb-2 text-[15px] font-semibold">Start from a template</h2>
          <TemplateGrid c={c} limit={3} />
        </>
      )}
    </div>
  );
}

function TemplateGrid({ c, limit, filter }: { c: ACtx; limit?: number; filter?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const list = (c.doc.templates ?? []).filter((t) => !filter || `${t.name} ${t.description}`.toLowerCase().includes(filter.toLowerCase())).slice(0, limit);
  const t = c.doc.templates?.find((x) => x.name === open);
  return (
    <>
      <div className="grid max-w-[980px] grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3">
        {list.map((x) => (
          <button key={x.name} type="button" aria-label={x.name} onClick={() => setOpen(x.name)} className="flex flex-col gap-2 rounded-lg border border-[#e1e1e1] bg-white p-4 text-left shadow-sm hover:border-[#0066ff] hover:shadow-md">
            <span className="flex gap-1">
              {x.connectors.map((cn) => (
                <Glyph key={cn} connector={cn} size={24} />
              ))}
            </span>
            <span className="text-[13px] font-semibold leading-snug">{x.name}</span>
            <span className="line-clamp-2 text-[12px] text-[#616161]">{x.description}</span>
            <span className="mt-auto text-[11px] text-[#8a8886]">{x.type} cloud flow</span>
          </button>
        ))}
        {!list.length && <div className="text-[13px] text-[#616161]">No templates match.</div>}
      </div>
      {t && (
        <div className="absolute inset-0 z-[80] flex items-center justify-center bg-black/30 p-4" onMouseDown={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div role="dialog" aria-label={t.name} className="w-[560px] rounded-lg bg-white p-6 shadow-2xl">
            <div className="mb-3 flex gap-1">
              {t.connectors.map((cn) => (
                <Glyph key={cn} connector={cn} size={30} />
              ))}
            </div>
            <h2 className="mb-1 text-[18px] font-semibold">{t.name}</h2>
            <p className="mb-4 text-[13px] text-[#616161]">{t.description}</p>
            <div className="mb-4 rounded-md bg-[#faf9f8] p-3 text-[12px]">
              <div className="mb-1 font-semibold">This flow will</div>
              <div>
                1. {t.trigger.action} ({t.trigger.connector})
              </div>
              {t.steps.map((s, i) => (
                <div key={i}>
                  {i + 2}. {s.action} ({s.connector})
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Btn onClick={() => setOpen(null)}>Cancel</Btn>
              <Btn
                primary
                label="Continue"
                onClick={() => {
                  setOpen(null);
                  c.cmd("flows", "flow.template", t.name);
                }}
              >
                Continue
              </Btn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FlowsPage({ c }: { c: ACtx }) {
  const [menu, setMenu] = useState<string | null>(null);
  const ref = useOutside(Boolean(menu), () => setMenu(null));
  const flows = c.doc.flows ?? [];
  return (
    <div className="px-8 py-6">
      <h1 className="mb-4 text-[22px] font-semibold">My flows</h1>
      <div className="mb-3 flex gap-5 border-b border-[#edebe9] text-[13px]">
        <span className="border-b-2 pb-2 font-semibold" style={{ borderColor: BLUE }}>
          Cloud flows
        </span>
        <span className="pb-2 text-[#616161]">Desktop flows</span>
        <span className="pb-2 text-[#616161]">Shared with me</span>
      </div>
      <table className="w-full max-w-[980px] text-[13px]">
        <thead>
          <tr className="border-b border-[#edebe9] text-left text-[12px] text-[#616161]">
            <th className="py-2 font-normal">Name</th>
            <th className="py-2 font-normal">Modified</th>
            <th className="py-2 font-normal">Type</th>
            <th className="py-2 font-normal">Status</th>
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {flows.map((f) => (
            <tr key={f.id} className="border-b border-[#f3f2f1] hover:bg-[#faf9f8]">
              <td className="py-2">
                <button type="button" onClick={() => c.go({ page: "designer", flow: f.id, selection: `flow:${f.id}` })} className="flex items-center gap-2 font-semibold hover:underline">
                  <Glyph connector={f.trigger.connector} size={22} /> {f.name}
                </button>
              </td>
              <td className="py-2 text-[#616161]">{f.modified ?? ""}</td>
              <td className="py-2 text-[#616161]">{f.type}</td>
              <td className="py-2">
                <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${f.on ? "bg-[#dff6dd] text-[#107c10]" : "bg-[#f3f2f1] text-[#616161]"}`}>{f.on ? "On" : "Off"}</span>
              </td>
              <td className="relative py-2">
                <button type="button" aria-label={`More commands for ${f.name}`} onClick={() => setMenu(menu === f.id ? null : f.id)} className="rounded p-1 hover:bg-[#edebe9]">
                  <AIcon name="more" size={16} />
                </button>
                {menu === f.id && (
                  <div ref={ref} className="absolute right-0 top-8 z-30 w-44 rounded-md border border-[#e1e1e1] bg-white py-1 shadow-lg" role="menu">
                    <button type="button" role="menuitem" onClick={() => { setMenu(null); c.go({ page: "designer", flow: f.id, selection: `flow:${f.id}` }); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f5f5f5]">
                      <AIcon name="edit" size={14} /> Edit
                    </button>
                    <button type="button" role="menuitem" onClick={() => { setMenu(null); c.cmd(`flow:${f.id}`, f.on ? "flow.turnOff" : "flow.turnOn"); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f5f5f5]">
                      <AIcon name="power" size={14} /> {f.on ? "Turn off" : "Turn on"}
                    </button>
                    <button type="button" role="menuitem" onClick={() => { setMenu(null); c.cmd(`flow:${f.id}`, "flow.delete"); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[#a4262c] hover:bg-[#f5f5f5]">
                      <AIcon name="trash" size={14} /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!flows.length && <p className="mt-6 text-[13px] text-[#616161]">You don&apos;t have any flows yet. Select Create to make one.</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Designer                                                            */
/* ------------------------------------------------------------------ */

type Pane = { kind: "params"; step: string } | { kind: "add"; after: string } | { kind: "test"; stage: "choose" | "run" } | null;

function ParamField({ c, flow, step, name, type, options, placeholder, required }: { c: ACtx; flow: AssistantFlow; step: FlowStep; name: string; type?: string; options?: string[]; placeholder?: string; required?: boolean }) {
  const cur = step.params[name] ?? "";
  const [v, setV] = useState(cur);
  useEffect(() => setV(cur), [cur, step.id]);
  const target = `flowparam:${flow.id}/${step.id}/${name}`;
  const commit = (val: string) => {
    if (val !== cur) c.act(`flow:${flow.id}`, { kind: "type", target, value: val });
  };
  const cls = "w-full rounded-[4px] border border-[#8a8886] bg-white px-2 py-1.5 text-[13px] outline-none focus:border-[#0066ff]";
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-[12px] font-semibold">
        {name}
        {required && <span className="text-[#a4262c]"> *</span>}
      </span>
      {type === "select" ? (
        <select aria-label={name} value={v} onChange={(e) => { setV(e.target.value); commit(e.target.value); }} className={cls}>
          <option value="">Select an option</option>
          {(options ?? []).map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea aria-label={name} value={v} rows={4} placeholder={placeholder} onChange={(e) => setV(e.target.value)} onBlur={(e) => commit(e.target.value)} className={`${cls} resize-none`} />
      ) : (
        <input aria-label={name} value={v} placeholder={placeholder} onChange={(e) => setV(e.target.value)} onBlur={(e) => commit(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()} className={cls} />
      )}
    </label>
  );
}

function Designer({ c, flow }: { c: ACtx; flow: AssistantFlow }) {
  const [pane, setPane] = useState<Pane>(null);
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);
  const menuRef = useOutside(menu, () => setMenu(false));
  const key = `flow:${flow.id}`;
  const all = [flow.trigger, ...flow.steps];
  const failing = flow.lastTest === "Failed" ? all.find((s) => (actionDef(s.action)?.params ?? []).some((p) => p.required && !(s.params[p.name] ?? "").trim())) : undefined;
  const nsteps = flow.steps.length;
  useEffect(() => {
    if (pane?.kind === "add") setPane(null);
  }, [nsteps]); // eslint-disable-line react-hooks/exhaustive-deps
  const groups = useMemo(() => {
    const list = STEP_ACTIONS.filter((a) => `${a.name} ${a.connector}`.toLowerCase().includes(q.toLowerCase()));
    const by: Record<string, typeof list> = {};
    for (const a of list) (by[a.connector] = by[a.connector] ?? []).push(a);
    return by;
  }, [q]);
  const paneStep = pane?.kind === "params" ? all.find((s) => s.id === pane.step) : undefined;
  const plus = (after: string) => (
    <div className="flex flex-col items-center">
      <span className="h-4 w-px bg-[#8a8886]" />
      <button
        type="button"
        aria-label={`Insert a new step${after === "trigger" ? " after the trigger" : ""}`}
        title="Insert a new step"
        onClick={() => {
          setQ("");
          setPane({ kind: "add", after });
          c.go({ insertAfter: after, selection: key });
        }}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-[#8a8886] bg-white text-[#323130] hover:border-[#0066ff] hover:text-[#0066ff]"
      >
        <AIcon name="plus" size={14} />
      </button>
      <span className="h-4 w-px bg-[#8a8886]" />
    </div>
  );
  const card = (s: FlowStep, isTrigger: boolean) => {
    const sel = pane?.kind === "params" && pane.step === s.id;
    const status = flow.lastTest === "Succeeded" ? "ok" : failing?.id === s.id ? "bad" : null;
    return (
      <div key={s.id} className={`relative w-[340px] rounded-lg border bg-white shadow-sm ${sel ? "border-[#0066ff] ring-2 ring-[#c7e0f4]" : "border-[#c8c6c4] hover:border-[#8a8886]"}`}>
        <button type="button" aria-label={`${s.action} settings`} onClick={() => setPane({ kind: "params", step: s.id })} className="flex w-full items-center gap-3 px-3 py-3 text-left">
          <Glyph connector={s.connector} size={30} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold">{s.action}</span>
            <span className="block truncate text-[11px] text-[#616161]">{isTrigger ? `Trigger · ${s.connector}` : s.connector}</span>
          </span>
          {status === "ok" && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#107c10] text-white"><AIcon name="check" size={12} strokeWidth={2} /></span>}
          {status === "bad" && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#a4262c] text-white"><AIcon name="close" size={12} strokeWidth={2} /></span>}
        </button>
      </div>
    );
  };
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[#edebe9] bg-white px-4">
        <button type="button" aria-label="Back to My flows" onClick={() => c.go({ page: "flows", selection: "flows" })} className="rounded p-1 hover:bg-[#f3f2f1]">
          <AIcon name="back" size={18} />
        </button>
        <span className="truncate text-[14px] font-semibold">{flow.name}</span>
        <span className={`rounded px-1.5 py-0.5 text-[11px] ${flow.saved ? "bg-[#f3f2f1] text-[#616161]" : "bg-[#fff4ce] text-[#8a6100]"}`}>{flow.saved ? "Saved" : "Unsaved changes"}</span>
        {!flow.on && <span className="rounded bg-[#f3f2f1] px-1.5 py-0.5 text-[11px] text-[#616161]">Off</span>}
        <div className="flex-1" />
        <Btn label="Save" onClick={() => c.cmd(key, "flow.save")}>
          <AIcon name="save" size={15} /> Save
        </Btn>
        <Btn label="Test" onClick={() => setPane({ kind: "test", stage: "choose" })}>
          <AIcon name="play" size={14} /> Test
        </Btn>
        <span className="flex items-center gap-1.5 px-2 text-[13px] text-[#616161]">
          <AIcon name="check" size={14} /> Flow checker
        </span>
        <div className="relative" ref={menuRef}>
          <button type="button" aria-label="More commands" onClick={() => setMenu((m) => !m)} className="rounded p-1.5 hover:bg-[#f3f2f1]">
            <AIcon name="more" size={16} />
          </button>
          {menu && (
            <div className="absolute right-0 top-9 z-30 w-44 rounded-md border border-[#e1e1e1] bg-white py-1 text-[13px] shadow-lg" role="menu">
              <button type="button" role="menuitem" onClick={() => { setMenu(false); c.cmd(key, flow.on ? "flow.turnOff" : "flow.turnOn"); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f5f5f5]">
                <AIcon name="power" size={14} /> {flow.on ? "Turn off" : "Turn on"}
              </button>
              <button type="button" role="menuitem" onClick={() => { setMenu(false); c.cmd(key, "flow.delete"); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[#a4262c] hover:bg-[#f5f5f5]">
                <AIcon name="trash" size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {flow.lastTest && (
        <div className={`flex items-center gap-2 px-4 py-2 text-[13px] ${flow.lastTest === "Succeeded" ? "bg-[#dff6dd] text-[#0b5a08]" : "bg-[#fde7e9] text-[#a4262c]"}`} role="status">
          <AIcon name={flow.lastTest === "Succeeded" ? "check" : "warning"} size={16} />
          {flow.lastTest === "Succeeded" ? "Your flow ran successfully." : `Your flow failed. ${failing ? `"${failing.action}" is missing a required field.` : ""}`}
        </div>
      )}
      <div className="flex min-h-0 flex-1">
        <div className="min-h-0 flex-1 overflow-auto bg-[#faf9f8] py-8" style={{ backgroundImage: "radial-gradient(#d2d0ce 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
          <div className="flex flex-col items-center">
            {card(flow.trigger, true)}
            {plus("trigger")}
            {flow.steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                {card(s, false)}
                {plus(s.id)}
              </div>
            ))}
          </div>
        </div>
        {pane && (
          <div className="flex w-[360px] shrink-0 flex-col border-l border-[#edebe9] bg-white">
            <div className="flex h-12 items-center gap-2 border-b border-[#edebe9] px-4">
              {paneStep && <Glyph connector={paneStep.connector} size={22} />}
              <span className="flex-1 truncate text-[14px] font-semibold">{pane.kind === "add" ? "Add an action" : pane.kind === "test" ? "Test Flow" : paneStep?.action}</span>
              <button type="button" aria-label="Close pane" onClick={() => setPane(null)} className="rounded p-1 hover:bg-[#f3f2f1]">
                <AIcon name="close" size={16} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4 text-[13px]">
              {pane.kind === "add" && (
                <>
                  <input aria-label="Search for an action or connector" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for an action or connector" className="mb-3 w-full rounded-[4px] border border-[#8a8886] px-2.5 py-1.5 outline-none focus:border-[#0066ff]" />
                  {Object.entries(groups).map(([cn, list]) => (
                    <div key={cn} className="mb-3">
                      <div className="mb-1 flex items-center gap-2 text-[12px] font-semibold text-[#616161]">
                        <Glyph connector={cn} size={18} /> {cn}
                      </div>
                      {list.map((a) => (
                        <button key={a.name} type="button" aria-label={a.name} onClick={() => c.cmd(key, "flow.addAction", a.name)} className="mb-0.5 flex w-full flex-col rounded-md px-2 py-1.5 text-left hover:bg-[#f3f2f1]">
                          <span className="font-semibold">{a.name}</span>
                          <span className="text-[11px] text-[#616161]">{a.description}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </>
              )}
              {pane.kind === "params" && paneStep && (
                <>
                  <div className="mb-3 flex gap-4 border-b border-[#edebe9] text-[12px]">
                    <span className="border-b-2 pb-1.5 font-semibold" style={{ borderColor: BLUE }}>
                      Parameters
                    </span>
                    <span className="pb-1.5 text-[#616161]">Settings</span>
                    <span className="pb-1.5 text-[#616161]">About</span>
                  </div>
                  {(actionDef(paneStep.action)?.params ?? []).map((p) => (
                    <ParamField key={`${paneStep.id}-${p.name}`} c={c} flow={flow} step={paneStep} name={p.name} type={p.type} options={p.options} placeholder={p.placeholder} required={p.required} />
                  ))}
                  {!(actionDef(paneStep.action)?.params ?? []).length && <p className="text-[#616161]">This trigger has no parameters. You start it with Run.</p>}
                  {paneStep.id !== "trigger" && (
                    <button type="button" onClick={() => { setPane(null); c.cmd(key, "flow.removeAction", paneStep.id); }} className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-[#a4262c] hover:underline">
                      <AIcon name="trash" size={14} /> Delete this action
                    </button>
                  )}
                </>
              )}
              {pane.kind === "test" &&
                (!flow.saved ? (
                  <p className="rounded-md bg-[#fff4ce] p-3 text-[#5c4300]">Save your flow before you test it. Select Save in the command bar.</p>
                ) : pane.stage === "choose" ? (
                  <>
                    <p className="mb-3 text-[#616161]">Run your flow now to make sure it works before you leave it running on its own.</p>
                    <label className="mb-2 flex items-center gap-2">
                      <input type="radio" name="pa-test" defaultChecked aria-label="Manually" /> Manually
                    </label>
                    <label className="mb-4 flex items-center gap-2 text-[#a19f9d]">
                      <input type="radio" name="pa-test" disabled aria-label="Automatically" /> Automatically (no recent runs)
                    </label>
                    <Btn primary label="Test" onClick={() => setPane({ kind: "test", stage: "run" })}>
                      Test
                    </Btn>
                  </>
                ) : (
                  <>
                    <p className="mb-2 font-semibold">Run flow</p>
                    <p className="mb-4 text-[#616161]">
                      {flow.type === "Automated" ? "Copilot will send a sample event that matches your trigger so the flow runs once." : "The flow runs once now, using your connections."}
                    </p>
                    <div className="flex gap-2">
                      <Btn primary label="Run flow" onClick={() => { setPane(null); c.cmd(key, "flow.test", "Manually"); }}>
                        Run flow
                      </Btn>
                      <Btn onClick={() => setPane({ kind: "test", stage: "choose" })}>Cancel</Btn>
                    </div>
                  </>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export function AutomateView({ c }: { c: ACtx }) {
  const page = c.ui.page ?? "home";
  const flow = c.doc.flows?.find((f) => f.id === c.ui.flow);
  const [build, setBuild] = useState<AssistantFlow["type"] | null>(null);
  const [tq, setTq] = useState("");
  const account = c.doc.accounts?.find((a) => a.id === c.doc.account) ?? c.doc.accounts?.[0];
  const nav: [NonNullable<typeof c.ui.page>, string, string][] = [
    ["home", "Home", "home"],
    ["create", "Create", "plus"],
    ["templates", "Templates", "templates"],
    ["flows", "My flows", "list"],
  ];
  return (
    <div className="relative flex min-w-0 flex-1">
      <aside className="w-[210px] shrink-0 border-r border-[#edebe9] bg-[#faf9f8] py-3">
        <div className="mb-3 flex items-center gap-2 px-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-md text-white" style={{ background: BLUE }}>
            <AIcon name="flow" size={16} />
          </span>
          <span className="text-[15px] font-semibold">Power Automate</span>
        </div>
        {nav.map(([p, label, icon]) => (
          <button key={p} type="button" aria-current={page === p ? "page" : undefined} onClick={() => c.go({ page: p, selection: "flows" })} className={`mx-2 flex w-[calc(100%-16px)] items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] ${page === p ? "bg-white font-semibold shadow-sm" : "hover:bg-white/70"}`}>
            <AIcon name={icon} size={16} /> {label}
          </button>
        ))}
        <div className="mx-2 mt-2 flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#a19f9d]">
          <AIcon name="approvals" size={16} /> Approvals
        </div>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto bg-white">
        {page === "designer" && flow ? (
          <Designer key={flow.id} c={c} flow={flow} />
        ) : page === "create" ? (
          <CreatePage c={c} onBuild={setBuild} />
        ) : page === "templates" ? (
          <div className="px-8 py-6">
            <h1 className="mb-3 text-[22px] font-semibold">Templates</h1>
            <input aria-label="Search templates" value={tq} onChange={(e) => setTq(e.target.value)} placeholder="Search templates" className="mb-4 w-full max-w-[480px] rounded-[4px] border border-[#8a8886] px-3 py-1.5 text-[13px] outline-none focus:border-[#0066ff]" />
            <TemplateGrid c={c} filter={tq} />
          </div>
        ) : page === "flows" ? (
          <FlowsPage c={c} />
        ) : (
          <div className="px-8 py-6">
            <h1 className="mb-1 text-[22px] font-semibold">Good morning, {(account?.name ?? "").split(" ")[0]}</h1>
            <p className="mb-5 text-[13px] text-[#616161]">Automate repetitive tasks so they run on their own. Test every flow before you rely on it.</p>
            <div className="mb-6 max-w-[760px]">
              <DescribeBox c={c} />
            </div>
            {(c.doc.templates ?? []).length > 0 && (
              <>
                <h2 className="mb-2 text-[15px] font-semibold">Templates for you</h2>
                <TemplateGrid c={c} limit={4} />
              </>
            )}
            <div className="mt-6">
              <Btn primary label="Create a flow" onClick={() => c.go({ page: "create", selection: "flows" })}>
                <AIcon name="plus" size={14} /> Create a flow
              </Btn>
            </div>
          </div>
        )}
      </div>
      {build && <BuildDialog c={c} type={build} onClose={() => setBuild(null)} />}
    </div>
  );
}
