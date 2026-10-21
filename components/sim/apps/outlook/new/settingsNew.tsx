"use client";

import { useEffect, useState } from "react";
import type { OutlookDoc } from "../types";
import { OIcon } from "../parts";
import { CATEGORY_COLORS, CATEGORY_SLOTS, serializeAutoReplies, serializeSignatures } from "../model";
import { TIME_OPTIONS_15, fmtDate, fmtTime, parseTime, parseUsDate } from "../dates";
import { DEFAULT_ZONE, RULE_ACTIONS, RULE_CONDITIONS, TIME_ZONES, catLabel } from "./model";
import type { NCtx } from "./mailNew";
import { FButton, Switch, inputCls } from "./ui";

/*
 * Settings (the gear in the title bar, or View › View settings). Pages are
 * "Category/Page". Saving a page commits what new Outlook would save:
 *   Accounts/Signatures   type "signatures"      Accounts/Automatic replies  type "autoReplies"
 *   Mail/Message list     settings.focusedInbox  Mail/Reading pane          settings.conversations / settings.readingPane
 *   Mail/Compose and reply settings.undoSend     Mail/Rules                 newRule, rules.run / rules.toggle / rules.delete
 *   Mail/Junk email       junk.blockAddress / junk.safeAddress / junk.remove
 *   Mail/Quick steps      quickStep              Calendar/View              settings.timeZone, settings.addTimeZone
 */

export const SETTINGS_PAGES: Record<string, { icon: string; pages: string[] }> = {
  Accounts: { icon: "person", pages: ["Email accounts", "Signatures", "Automatic replies", "Categories"] },
  General: { icon: "gear", pages: ["Language and time", "Appearance", "Notifications", "About Outlook"] },
  Mail: { icon: "mail", pages: ["Message list", "Reading pane", "Compose and reply", "Rules", "Sweep", "Junk email", "Quick steps"] },
  Calendar: { icon: "calendar", pages: ["View", "Shared calendars"] },
  People: { icon: "group", pages: ["Contacts"] },
};

export function pageFor(v?: string): string {
  const s = String(v ?? "").toLowerCase();
  if (s.includes("categor")) return "Accounts/Categories";
  if (s.includes("rule")) return "Mail/Rules";
  if (s.includes("quick")) return "Mail/Quick steps";
  if (s.includes("signature")) return "Accounts/Signatures";
  if (s.includes("automatic")) return "Accounts/Automatic replies";
  if (s.includes("junk")) return "Mail/Junk email";
  if (s.includes("/")) return v!;
  return "Mail/Message list";
}

const H = ({ children }: { children: React.ReactNode }) => <h3 className="mb-3 text-[18px] font-semibold">{children}</h3>;
const Sub = ({ children }: { children: React.ReactNode }) => <h4 className="mb-1.5 mt-4 text-[14px] font-semibold">{children}</h4>;
const P = ({ children }: { children: React.ReactNode }) => <p className="mb-2 text-[12.5px] leading-snug text-gray-600">{children}</p>;

function Footer({ onSave, onDiscard, saveLabel = "Save" }: { onSave: () => void; onDiscard?: () => void; saveLabel?: string }) {
  return (
    <div className="mt-5 flex gap-2 border-t border-gray-200 pt-3">
      <FButton primary ok onClick={onSave}>
        {saveLabel}
      </FButton>
      {onDiscard && <FButton onClick={onDiscard}>Discard</FButton>}
    </div>
  );
}

function SignaturesPage({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const [sigs, setSigs] = useState(doc.signatures ?? []);
  const [cur, setCur] = useState<number>(sigs.length ? 0 : -1);
  const [defNew, setDefNew] = useState(doc.defaultNew ?? "");
  const [defReply, setDefReply] = useState(doc.defaultReply ?? "");
  const s = cur >= 0 ? sigs[cur] : undefined;
  const upd = (patch: Partial<{ name: string; text: string }>) => {
    if (cur < 0) return;
    const prev = sigs[cur];
    const next = sigs.map((x, i) => (i === cur ? { ...x, ...patch } : x));
    setSigs(next);
    if (patch.name !== undefined) {
      if (defNew === prev.name) setDefNew(patch.name);
      if (defReply === prev.name) setDefReply(patch.name);
    }
  };
  return (
    <>
      <H>Signatures</H>
      <P>Create a signature that Outlook can add to your messages. Signatures are saved with your account.</P>
      <div className="mb-3 flex flex-wrap gap-2">
        {sigs.map((x, i) => (
          <button key={i} type="button" onClick={() => setCur(i)} className={`rounded-[4px] border px-2.5 py-1 text-[12.5px] ${i === cur ? "border-[#0f6cbd] bg-[#ebf3fc]" : "border-gray-300"}`}>
            {x.name || "(no name)"}
          </button>
        ))}
        <button
          type="button"
          data-addsig="1"
          onClick={() => {
            setSigs([...sigs, { name: "", text: "" }]);
            setCur(sigs.length);
          }}
          className="flex items-center gap-1 rounded-[4px] px-2 py-1 text-[12.5px] text-[#0f6cbd] hover:bg-gray-100"
        >
          <OIcon name="plus" size={13} /> Add signature
        </button>
      </div>
      {s && (
        <div className="flex flex-col gap-2">
          <input aria-label="Edit signature name" placeholder="Edit signature name" data-f="sigName" value={s.name} onChange={(e) => upd({ name: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
          <textarea aria-label="Signature text" data-f="sigText" value={s.text} onChange={(e) => upd({ text: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className={`${inputCls} min-h-[90px]`} />
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" data-f="sigNew" checked={Boolean(s.name) && defNew === s.name} onChange={(e) => setDefNew(e.target.checked ? s.name : "")} className="accent-[#0f6cbd]" />
            Add this signature to new messages
          </label>
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" data-f="sigReply" checked={Boolean(s.name) && defReply === s.name} onChange={(e) => setDefReply(e.target.checked ? s.name : "")} className="accent-[#0f6cbd]" />
            Add this signature to replies and forwards
          </label>
        </div>
      )}
      <Footer
        onSave={() =>
          ctx.commit({ kind: "type", target: "signatures", value: serializeSignatures(sigs.filter((x) => x.name.trim()), defNew || undefined, defReply || undefined) })
        }
      />
    </>
  );
}

function AutoRepliesPage({ ctx }: { ctx: NCtx }) {
  const a = ctx.doc.autoReplies;
  const today = (ctx.doc.now ?? "2026-10-20").slice(0, 10);
  const [on, setOn] = useState(Boolean(a?.on));
  const [period, setPeriod] = useState(Boolean(a?.start));
  const [sd, setSd] = useState(fmtDate(a?.start ?? today));
  const [st, setSt] = useState(a?.start ? fmtTime(a.start) : "8:00 AM");
  const [ed, setEd] = useState(fmtDate(a?.end ?? today));
  const [et, setEt] = useState(a?.end ? fmtTime(a.end) : "5:00 PM");
  const [inside, setInside] = useState(a?.inside ?? "");
  const [outsideOn, setOutsideOn] = useState(Boolean(a?.outsideOn));
  const [scope, setScope] = useState(a?.outsideScope === "My Contacts only" ? "contacts" : "all");
  const [outside, setOutside] = useState(a?.outside ?? "");
  const iso = (d: string, t: string) => {
    const dd = parseUsDate(d);
    const tt = parseTime(t);
    return dd && tt ? `${dd}T${tt}` : undefined;
  };
  const time = (v: string, set: (x: string) => void, f: string, label: string) => (
    <select aria-label={label} data-f={f} value={v} onChange={(e) => set(e.target.value)} className={`${inputCls} w-28`}>
      {(TIME_OPTIONS_15.includes(v) ? TIME_OPTIONS_15 : [v, ...TIME_OPTIONS_15]).map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
  return (
    <>
      <H>Automatic replies</H>
      <Switch on={on} f="arOn" label="Turn on automatic replies" onChange={setOn} />
      <div className={on ? "" : "pointer-events-none opacity-50"}>
        <label className="mt-3 flex items-center gap-2 text-[13px]">
          <input type="checkbox" data-f="arPeriod" checked={period} onChange={(e) => setPeriod(e.target.checked)} className="accent-[#0f6cbd]" />
          Send replies only during a time period
        </label>
        {period && (
          <div className="ml-6 mt-2 grid max-w-[420px] grid-cols-[70px_1fr_auto] items-center gap-2 text-[13px]">
            <span>Start time</span>
            <input aria-label="Start date" data-f="arStartDate" value={sd} onChange={(e) => setSd(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
            {time(st, setSt, "arStartTime", "Start time")}
            <span>End time</span>
            <input aria-label="End date" data-f="arEndDate" value={ed} onChange={(e) => setEd(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
            {time(et, setEt, "arEndTime", "End time")}
          </div>
        )}
        <Sub>Send automatic replies inside your organization</Sub>
        <textarea aria-label="Automatic reply inside your organization" data-f="arInside" value={inside} onChange={(e) => setInside(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={`${inputCls} min-h-[70px]`} />
        <label className="mt-3 flex items-center gap-2 text-[13px]">
          <input type="checkbox" data-f="arOutsideOn" checked={outsideOn} onChange={(e) => setOutsideOn(e.target.checked)} className="accent-[#0f6cbd]" />
          Send replies outside your organization
        </label>
        {outsideOn && (
          <div className="ml-6 mt-2 flex flex-col gap-1.5 text-[13px]">
            <label className="flex items-center gap-2">
              <input type="radio" name="arscope" data-f="arScope" data-v="contacts" checked={scope === "contacts"} onChange={() => setScope("contacts")} /> Send replies only to contacts
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="arscope" data-f="arScope" data-v="all" checked={scope === "all"} onChange={() => setScope("all")} /> Send replies to all external senders
            </label>
            <textarea aria-label="Automatic reply outside your organization" data-f="arOutside" value={outside} onChange={(e) => setOutside(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={`${inputCls} mt-1 min-h-[60px]`} />
          </div>
        )}
      </div>
      <Footer
        onSave={() =>
          ctx.commit({
            kind: "type",
            target: "autoReplies",
            value: serializeAutoReplies({
              on,
              start: on && period ? iso(sd, st) : undefined,
              end: on && period ? iso(ed, et) : undefined,
              inside,
              outsideOn: on && outsideOn,
              outsideScope: scope === "contacts" ? "My Contacts only" : "Anyone outside my organization",
              outside,
            }),
          })
        }
      />
    </>
  );
}

function RulesPage({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const [editing, setEditing] = useState(false);
  const [v, setV] = useState({ name: "", condition: RULE_CONDITIONS[0], conditionValue: "", action: RULE_ACTIONS[0], actionValue: "", stop: false });
  const folders = [...["Inbox", "Archive", "Deleted Items", "Junk Email"], ...(doc.folders ?? []).filter((f) => !f.mailbox).map((f) => f.name)];
  return (
    <>
      <H>Rules</H>
      <P>Rules run on messages as they arrive. To run a rule on messages already in your Inbox, select Run rule now next to it.</P>
      {(doc.rules ?? []).map((r) => (
        <div key={r.id} className="mb-1.5 flex items-center gap-2 rounded-[4px] border border-gray-200 px-3 py-2 text-[13px]">
          <Switch on={!r.off} c="rules.toggle" label="" onChange={() => ctx.cmd("rules.toggle", r.name)} />
          <span className="min-w-0 flex-1 truncate font-semibold">{r.name}</span>
          <span className="truncate text-[12px] text-gray-500">
            {r.from ? `From ${r.from}` : r.subject ? `Subject includes "${r.subject}"` : r.sentToMe ? "Sent to me" : ""}
            {r.moveTo ? ` → move to ${r.moveTo}` : r.category ? ` → ${catLabel(doc, r.category)}` : r.markRead ? " → mark as read" : r.pin ? " → pin" : r.deleteIt ? " → delete" : ""}
          </span>
          <button type="button" title="Run rule now" aria-label={`Run rule now: ${r.name}`} data-c="rules.run" data-v={r.name} onClick={() => ctx.cmd("rules.run", r.name)} className="rounded p-1 text-[#0f6cbd] hover:bg-gray-100">
            <OIcon name="play" size={14} />
          </button>
          <button type="button" title="Delete" aria-label={`Delete rule ${r.name}`} data-c="rules.delete" data-v={r.name} onClick={() => ctx.cmd("rules.delete", r.name)} className="rounded p-1 text-gray-600 hover:bg-gray-100">
            <OIcon name="trash" size={14} />
          </button>
        </div>
      ))}
      {!editing ? (
        <button type="button" data-addrule="1" onClick={() => setEditing(true)} className="mt-2 flex items-center gap-1 rounded-[4px] px-2 py-1 text-[13px] text-[#0f6cbd] hover:bg-gray-100">
          <OIcon name="plus" size={13} /> Add new rule
        </button>
      ) : (
        <div className="mt-2 flex max-w-[520px] flex-col gap-2 rounded-lg border border-gray-200 p-3 text-[13px]">
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Name your rule</span>
            <input data-f="name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
          </label>
          <span className="font-semibold">Add a condition</span>
          <div className="flex gap-2">
            <select data-f="condition" aria-label="Condition" value={v.condition} onChange={(e) => setV({ ...v, condition: e.target.value })} className={`${inputCls} w-44`}>
              {RULE_CONDITIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
            {v.condition !== "Sent to me" && <input data-f="conditionValue" aria-label="Condition value" placeholder={v.condition === "From" ? "Name or email address" : "Words"} value={v.conditionValue} onChange={(e) => setV({ ...v, conditionValue: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />}
          </div>
          <span className="font-semibold">Add an action</span>
          <div className="flex gap-2">
            <select data-f="action" aria-label="Action" value={v.action} onChange={(e) => setV({ ...v, action: e.target.value, actionValue: "" })} className={`${inputCls} w-44`}>
              {RULE_ACTIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
            {v.action === "Move to" && (
              <select data-f="actionValue" aria-label="Folder" value={v.actionValue} onChange={(e) => setV({ ...v, actionValue: e.target.value })} className={inputCls}>
                <option value="">Select a folder</option>
                {folders.map((f) => <option key={f}>{f}</option>)}
              </select>
            )}
            {v.action === "Categorize" && (
              <select data-f="actionValue" aria-label="Category" value={v.actionValue} onChange={(e) => setV({ ...v, actionValue: e.target.value })} className={inputCls}>
                <option value="">Select a category</option>
                {CATEGORY_SLOTS.map((c) => <option key={c} value={catLabel(doc, c)}>{catLabel(doc, c)}</option>)}
              </select>
            )}
            {v.action === "Forward to" && <input data-f="actionValue" aria-label="Forward to" value={v.actionValue} onChange={(e) => setV({ ...v, actionValue: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />}
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" data-f="stop" checked={v.stop} onChange={(e) => setV({ ...v, stop: e.target.checked })} className="accent-[#0f6cbd]" /> Stop processing more rules
          </label>
          <div className="flex gap-2">
            <FButton
              primary
              ok
              onClick={() => {
                ctx.commit({ kind: "dialog", id: "newRule", values: v });
                setEditing(false);
                setV({ name: "", condition: RULE_CONDITIONS[0], conditionValue: "", action: RULE_ACTIONS[0], actionValue: "", stop: false });
              }}
            >
              Save
            </FButton>
            <FButton onClick={() => setEditing(false)}>Discard</FButton>
          </div>
        </div>
      )}
    </>
  );
}

function JunkPage({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const [b, setB] = useState("");
  const [s, setS] = useState("");
  const list = (items: string[], label: string) => (
    <div className="mb-2 max-h-28 overflow-auto rounded border border-gray-200">
      {items.length ? (
        items.map((x) => (
          <div key={x} className="flex items-center justify-between px-2 py-1 text-[12.5px]">
            {x}
            <button type="button" aria-label={`Remove ${x}`} data-c="junk.remove" data-v={x} onClick={() => ctx.cmd("junk.remove", x)} className="rounded p-0.5 hover:bg-gray-100">
              <OIcon name="trash" size={12} />
            </button>
          </div>
        ))
      ) : (
        <p className="px-2 py-1 text-[12px] text-gray-500">No {label} yet.</p>
      )}
    </div>
  );
  return (
    <>
      <H>Junk email</H>
      <Sub>Blocked senders and domains</Sub>
      <P>Messages from these senders or domains go straight to your Junk Email folder.</P>
      <div className="mb-2 flex gap-2">
        <input aria-label="Blocked sender or domain" data-f="blockAddr" placeholder="Example: abc123@fourthcoffee.com or fourthcoffee.com" value={b} onChange={(e) => setB(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
        <FButton cmd="junk.blockAddress" onClick={() => { if (b.trim()) ctx.cmd("junk.blockAddress", b.trim()); setB(""); }}>Add</FButton>
      </div>
      {list(doc.blocked ?? [], "blocked senders")}
      <Sub>Safe senders and domains</Sub>
      <P>Don&apos;t move email from these senders or domains to my Junk Email folder.</P>
      <div className="mb-2 flex gap-2">
        <input aria-label="Safe sender or domain" data-f="safeAddr" placeholder="Example: name@lakesidemed.example.com" value={s} onChange={(e) => setS(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
        <FButton cmd="junk.safeAddress" onClick={() => { if (s.trim()) ctx.cmd("junk.safeAddress", s.trim()); setS(""); }}>Add</FButton>
      </div>
      {list(doc.safe ?? [], "safe senders")}
    </>
  );
}

function QuickStepsPage({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const [editing, setEditing] = useState(false);
  const [two, setTwo] = useState(false);
  const blank = { name: "", action1: "Move to folder", target1: "", action2: "(none)", target2: "", shortcut: "Choose a shortcut", tooltip: "" };
  const [v, setV] = useState(blank);
  const actions = ["Move to folder", "Copy to folder", "Delete message", "Mark as read", "Mark as unread", "Categorize", "Flag message", "Clear flag", "Reply", "Reply all", "Forward"];
  const folders = [...["Inbox", "Archive", "Deleted Items"], ...(doc.folders ?? []).filter((f) => !f.mailbox).map((f) => f.name)];
  const target = (a: string, k: "target1" | "target2") =>
    a === "Move to folder" || a === "Copy to folder" ? (
      <select data-f={k} aria-label="Folder" value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className={inputCls}>
        <option value="">Choose a folder</option>
        {folders.map((f) => <option key={f}>{f}</option>)}
      </select>
    ) : a === "Categorize" ? (
      <select data-f={k} aria-label="Category" value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className={inputCls}>
        <option value="">Choose a category</option>
        {CATEGORY_SLOTS.map((c) => <option key={c} value={catLabel(doc, c)}>{catLabel(doc, c)}</option>)}
      </select>
    ) : a === "Forward" ? (
      <input data-f={k} aria-label="To" placeholder="Email address" value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
    ) : null;
  return (
    <>
      <H>Quick steps</H>
      <P>Quick steps apply several actions to a message with one click. They show in the Quick steps menu on the Home tab.</P>
      {(doc.quickSteps ?? []).map((q) => (
        <div key={q.id} className="mb-1.5 flex items-center gap-2 rounded-[4px] border border-gray-200 px-3 py-2 text-[13px]">
          <OIcon name="bolt" size={14} className="text-[#0f6cbd]" />
          <span className="font-semibold">{q.name}</span>
          <span className="truncate text-[12px] text-gray-500">{q.actions.map((a) => `${a.action}${a.target ? ` (${a.target})` : ""}`).join(", ")}</span>
        </div>
      ))}
      {!editing ? (
        <button type="button" data-addqs="1" onClick={() => setEditing(true)} className="mt-2 flex items-center gap-1 rounded-[4px] px-2 py-1 text-[13px] text-[#0f6cbd] hover:bg-gray-100">
          <OIcon name="plus" size={13} /> New quick step
        </button>
      ) : (
        <div className="mt-2 flex max-w-[520px] flex-col gap-2 rounded-lg border border-gray-200 p-3 text-[13px]">
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Name your quick step</span>
            <input data-f="name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
          </label>
          <span className="font-semibold">Choose an action</span>
          <div className="flex gap-2">
            <select data-f="action1" aria-label="Choose an action" value={v.action1} onChange={(e) => setV({ ...v, action1: e.target.value, target1: "" })} className={`${inputCls} w-48`}>
              {actions.map((a) => <option key={a}>{a}</option>)}
            </select>
            {target(v.action1, "target1")}
          </div>
          {two ? (
            <div className="flex gap-2">
              <select data-f="action2" aria-label="Choose an action" value={v.action2} onChange={(e) => setV({ ...v, action2: e.target.value, target2: "" })} className={`${inputCls} w-48`}>
                {["(none)", ...actions].map((a) => <option key={a}>{a}</option>)}
              </select>
              {target(v.action2, "target2")}
            </div>
          ) : (
            <button type="button" data-addaction="1" onClick={() => setTwo(true)} className="self-start text-[#0f6cbd] underline">
              Add another action
            </button>
          )}
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Choose a shortcut</span>
            <select data-f="shortcut" value={v.shortcut} onChange={(e) => setV({ ...v, shortcut: e.target.value })} className={`${inputCls} w-48`}>
              {["Choose a shortcut", "Ctrl+Shift+5", "Ctrl+Shift+6", "Ctrl+Shift+7", "Ctrl+Shift+8", "Ctrl+Shift+9"].map((a) => <option key={a}>{a}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Customize your quick step (description)</span>
            <input data-f="tooltip" value={v.tooltip} onChange={(e) => setV({ ...v, tooltip: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
          </label>
          <div className="flex gap-2">
            <FButton
              primary
              ok
              onClick={() => {
                ctx.commit({ kind: "dialog", id: "quickStep", values: v });
                setEditing(false);
                setTwo(false);
                setV(blank);
              }}
            >
              Save
            </FButton>
            <FButton onClick={() => setEditing(false)}>Discard</FButton>
          </div>
        </div>
      )}
    </>
  );
}

function CalendarViewPage({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const [zone, setZone] = useState(doc.timeZone ?? DEFAULT_ZONE);
  const [label, setLabel] = useState("");
  const [adding, setAdding] = useState(false);
  const [zone2, setZone2] = useState(TIME_ZONES[0]);
  const [label2, setLabel2] = useState("");
  return (
    <>
      <H>View</H>
      <Sub>Time zones</Sub>
      <label className="flex max-w-[460px] flex-col gap-1 text-[13px]">
        <span>Display my calendar in time zone</span>
        <select data-f="zone" value={zone} onChange={(e) => setZone(e.target.value)} className={inputCls}>
          {TIME_ZONES.map((z) => <option key={z}>{z}</option>)}
        </select>
      </label>
      <label className="mt-2 flex max-w-[460px] flex-col gap-1 text-[13px]">
        <span>Label</span>
        <input data-f="label" value={label} onChange={(e) => setLabel(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
      </label>
      <div className="mt-2">
        <FButton primary ok onClick={() => ctx.commit({ kind: "dialog", id: "settings.timeZone", values: { zone, label } })}>
          Save
        </FButton>
      </div>
      <Sub>Other time zones</Sub>
      {(doc.extraTimeZones ?? []).map((z) => (
        <p key={z.zone} className="text-[12.5px]">
          {z.label ? `${z.label}: ` : ""}
          {z.zone} (shown in calendar)
        </p>
      ))}
      {!adding ? (
        <button type="button" data-addzone="1" onClick={() => setAdding(true)} className="mt-1 flex items-center gap-1 rounded-[4px] px-2 py-1 text-[13px] text-[#0f6cbd] hover:bg-gray-100">
          <OIcon name="plus" size={13} /> Add time zone
        </button>
      ) : (
        <div className="mt-2 flex max-w-[460px] flex-col gap-2 rounded-lg border border-gray-200 p-3 text-[13px]">
          <select data-f="zone2" aria-label="Other time zones" value={zone2} onChange={(e) => setZone2(e.target.value)} className={inputCls}>
            {TIME_ZONES.map((z) => <option key={z}>{z}</option>)}
          </select>
          <input data-f="label2" aria-label="Label" placeholder="Label" value={label2} onChange={(e) => setLabel2(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={inputCls} />
          <div className="flex gap-2">
            <FButton
              primary
              ok
              onClick={() => {
                ctx.commit({ kind: "dialog", id: "settings.addTimeZone", values: { zone: zone2, label: label2 } });
                setAdding(false);
              }}
            >
              Save
            </FButton>
            <FButton onClick={() => setAdding(false)}>Discard</FButton>
          </div>
        </div>
      )}
    </>
  );
}

function Page({ ctx, page }: { ctx: NCtx; page: string }) {
  const doc = ctx.doc;
  const [focused, setFocused] = useState(Boolean(doc.focused));
  const [grouping, setGrouping] = useState(doc.conversations ? "Group messages by conversation" : "Do not group messages");
  const [position, setPosition] = useState(doc.readingPane === "Bottom" ? "Show on the bottom" : doc.readingPane === "Off" ? "Hide reading pane" : "Show on the right");
  const [seconds, setSeconds] = useState(doc.undoSend ?? 0);
  useEffect(() => {
    setFocused(Boolean(doc.focused));
  }, [doc.focused]);
  switch (page) {
    case "Accounts/Email accounts":
      return (
        <>
          <H>Email accounts</H>
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-[13px]">
            <OIcon name="person" size={22} className="text-[#0f6cbd]" />
            <div className="flex-1">
              <div className="font-semibold">{doc.account.name}</div>
              <div className="text-gray-600">{doc.account.email} · Microsoft 365</div>
            </div>
            <span className="rounded bg-[#ebf3fc] px-2 py-0.5 text-[12px] text-[#0f6cbd]">Primary account</span>
          </div>
          {(doc.shared ?? []).filter((s) => s.added).length > 0 && (
            <>
              <Sub>Shared mailboxes</Sub>
              {(doc.shared ?? []).filter((s) => s.added).map((s) => <p key={s.email} className="text-[13px]">{s.name} ({s.email})</p>)}
            </>
          )}
        </>
      );
    case "Accounts/Signatures":
      return <SignaturesPage ctx={ctx} />;
    case "Accounts/Automatic replies":
      return <AutoRepliesPage ctx={ctx} />;
    case "Accounts/Categories":
      return (
        <>
          <H>Categories</H>
          <P>Categories are color labels you can add to messages and events. Rename them so the colors mean something to your team.</P>
          {CATEGORY_SLOTS.map((c) => (
            <div key={c} className="mb-1 flex items-center gap-2 text-[13px]">
              <span className="h-3.5 w-3.5 rounded-sm" style={{ background: CATEGORY_COLORS[c] }} /> {catLabel(doc, c)}
            </div>
          ))}
          <button type="button" data-dlg="newCategory" onClick={() => ctx.openDialog("newCategory")} className="mt-2 flex items-center gap-1 rounded-[4px] px-2 py-1 text-[13px] text-[#0f6cbd] hover:bg-gray-100">
            <OIcon name="plus" size={13} /> Create category
          </button>
        </>
      );
    case "General/About Outlook":
      return (
        <>
          <H>About Outlook</H>
          <P>You&apos;re using the new Outlook for Windows. If your ribbon shows Home, View and Help tabs and a Settings button at the top right, you have the new Outlook. Classic Outlook has a File tab instead.</P>
        </>
      );
    case "General/Language and time":
      return (
        <>
          <H>Language and time</H>
          <P>Language: English (United States). Date format: M/d/yyyy. Time format: h:mm tt.</P>
          <P>Current time zone: {doc.timeZone ?? DEFAULT_ZONE}. To change the time zone your calendar uses, go to Calendar › View.</P>
        </>
      );
    case "Mail/Message list":
      return (
        <>
          <H>Message list</H>
          <Sub>Focused Inbox</Sub>
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" data-f="focused" checked={focused} onChange={(e) => setFocused(e.target.checked)} className="accent-[#0f6cbd]" />
            Sort messages into Focused and Other
          </label>
          <Footer onSave={() => focused !== Boolean(doc.focused) && ctx.cmd("settings.focusedInbox", focused ? "On" : "Off")} />
        </>
      );
    case "Mail/Reading pane":
      return (
        <>
          <H>Reading pane</H>
          <Sub>Message organization</Sub>
          {["Group messages by conversation", "Group messages by branches within conversations", "Do not group messages"].map((o) => (
            <label key={o} className="mb-1 flex items-center gap-2 text-[13px]">
              <input type="radio" name="grouping" data-f="grouping" data-v={o} checked={grouping === o} onChange={() => setGrouping(o)} /> {o}
            </label>
          ))}
          <Sub>Reading pane</Sub>
          {["Show on the right", "Show on the bottom", "Hide reading pane"].map((o) => (
            <label key={o} className="mb-1 flex items-center gap-2 text-[13px]">
              <input type="radio" name="position" data-f="position" data-v={o} checked={position === o} onChange={() => setPosition(o)} /> {o}
            </label>
          ))}
          <Footer
            onSave={() => {
              if ((grouping !== "Do not group messages") !== Boolean(doc.conversations)) ctx.commit({ kind: "dialog", id: "settings.conversations", values: { grouping } });
              const want = position === "Show on the bottom" ? "Bottom" : position === "Hide reading pane" ? "Off" : "Right";
              if (want !== (doc.readingPane ?? "Right")) setTimeout(() => ctx.commit({ kind: "dialog", id: "settings.readingPane", values: { position } }), 60);
            }}
          />
        </>
      );
    case "Mail/Compose and reply":
      return (
        <>
          <H>Compose and reply</H>
          <Sub>Undo send</Sub>
          <P>Choose how long Outlook waits before sending, so you can cancel a message you just sent. You can choose up to 10 seconds.</P>
          <select aria-label="Undo send" data-f="seconds" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className={`${inputCls} w-40`}>
            {[0, 5, 10].map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "Off" : `${n} seconds`}
              </option>
            ))}
          </select>
          <Footer onSave={() => ctx.commit({ kind: "dialog", id: "settings.undoSend", values: { seconds } })} />
        </>
      );
    case "Mail/Rules":
      return <RulesPage ctx={ctx} />;
    case "Mail/Sweep":
      return (
        <>
          <H>Sweep</H>
          <P>Sweep rules you set up from the Sweep button show here.</P>
          {Object.entries(doc.flags ?? {})
            .filter(([k]) => k.startsWith("sweep:"))
            .map(([k, v]) => (
              <p key={k} className="text-[13px]">
                {k.slice(6)}: {String(v)}
              </p>
            ))}
        </>
      );
    case "Mail/Junk email":
      return <JunkPage ctx={ctx} />;
    case "Mail/Quick steps":
      return <QuickStepsPage ctx={ctx} />;
    case "Calendar/View":
      return <CalendarViewPage ctx={ctx} />;
    case "Calendar/Shared calendars":
      return (
        <>
          <H>Shared calendars</H>
          <P>Share your calendar with a coworker and choose what they can see or do.</P>
          <button type="button" data-dlg="shareCalendar" onClick={() => ctx.openDialog("shareCalendar")} className="rounded-[4px] border border-gray-300 px-3 py-1 text-[13px] hover:bg-gray-50">
            Share calendar
          </button>
          {(doc.shares ?? []).map((s) => <p key={s.email} className="mt-2 text-[13px]">{s.email}: {s.permission}</p>)}
        </>
      );
    default:
      return (
        <>
          <H>{page.split("/")[1]}</H>
          <P>These settings aren&apos;t part of this practice.</P>
        </>
      );
  }
}

export function SettingsModal({ ctx, page, setPage, onClose }: { ctx: NCtx; page: string; setPage: (p: string) => void; onClose: () => void }) {
  const [cat, sub] = page.split("/");
  return (
    <div className="absolute inset-0 z-[75] flex items-center justify-center bg-black/25 p-3" onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Escape") onClose(); }}>
      <div role="dialog" aria-modal="true" aria-label="Settings" className="flex h-full max-h-[540px] w-full max-w-[980px] overflow-hidden rounded-lg bg-white text-gray-900 shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
        <nav aria-label="Settings categories" className="w-44 shrink-0 border-r border-gray-200 bg-[#fafafa] p-2">
          <div className="mb-2 px-2 pt-1 text-[16px] font-semibold">Settings</div>
          {Object.entries(SETTINGS_PAGES).map(([k, v]) => (
            <button key={k} type="button" data-setcat={k} onClick={() => setPage(`${k}/${v.pages[0]}`)} className={`flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-left text-[13px] ${k === cat ? "bg-[#ebf3fc] font-semibold" : "hover:bg-gray-100"}`}>
              <OIcon name={v.icon} size={15} /> {k}
            </button>
          ))}
        </nav>
        <nav aria-label={`${cat} settings`} className="w-48 shrink-0 border-r border-gray-200 p-2">
          {(SETTINGS_PAGES[cat]?.pages ?? []).map((p) => (
            <button key={p} type="button" data-setpage={`${cat}/${p}`} onClick={() => setPage(`${cat}/${p}`)} className={`block w-full rounded-[4px] px-2 py-1.5 text-left text-[13px] ${p === sub ? "bg-[#ebf3fc] font-semibold" : "hover:bg-gray-100"}`}>
              {p}
            </button>
          ))}
        </nav>
        <div className="relative min-w-0 flex-1 overflow-auto p-5">
          <button type="button" aria-label="Close settings" data-c="settings.close" onClick={onClose} className="absolute right-3 top-3 rounded p-1 text-gray-600 hover:bg-gray-100">
            <OIcon name="close" size={14} />
          </button>
          <Page key={page} ctx={ctx} page={page} />
        </div>
      </div>
    </div>
  );
}

export function docHasSettingsPage(doc: OutlookDoc): boolean {
  return Boolean(doc.settingsPage);
}
