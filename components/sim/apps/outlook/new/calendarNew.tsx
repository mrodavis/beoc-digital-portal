"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormDraft } from "../ctx";
import { Avatar, OIcon } from "../parts";
import { MiniMonth } from "../calendar";
import { busyFor, occurrences, people, recurrenceText, todayOf } from "../model";
import { TIME_OPTIONS_15, addDays, addMinutes, addMonths, fmtDate, fmtTime, monthStart, parseTime, parseUsDate, weekStart } from "../dates";
import type { NCtx } from "./mailNew";
import { Switch, inputCls } from "./ui";
import { resolveToken, suggestionsFor } from "../mail";

const VIEW_RANGE: Record<string, (d: string) => string[]> = {
  Day: (d) => [d],
  "Work Week": (d) => Array.from({ length: 5 }, (_, i) => addDays(weekStart(d), i + 1)),
  Week: (d) => Array.from({ length: 7 }, (_, i) => addDays(weekStart(d), i)),
};

export function CalendarPaneNew({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const cur = doc.calDate ?? todayOf(doc);
  const [month, setMonth] = useState(monthStart(cur));
  useEffect(() => setMonth(monthStart(cur)), [cur]);
  const marks = useMemo(() => new Set(occurrences(doc, addDays(month, -7), addDays(month, 42)).map((o) => o.date)), [doc, month]);
  const range = (VIEW_RANGE[doc.calView ?? "Work Week"] ?? ((d: string) => [d]))(cur);
  return (
    <div className="min-h-0 flex-1 overflow-auto px-2 py-2">
      <button
        type="button"
        data-c="cal.newAppointment"
        onClick={() => ctx.cmd("cal.newAppointment")}
        className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-[4px] bg-[#0f6cbd] py-1.5 text-[13px] font-semibold text-white hover:bg-[#115ea3]"
      >
        <OIcon name="calendarAdd" size={15} /> New event
      </button>
      <MiniMonth month={month} selected={cur} today={todayOf(doc)} marks={marks} highlight={range} onPick={(d) => ctx.cmd("cal.goto", d)} onPrev={() => setMonth(addMonths(month, -1))} onNext={() => setMonth(addMonths(month, 1))} />
      <div className="mt-4 text-[13px]">
        <div className="mb-1 flex items-center gap-1 font-semibold text-gray-800">
          <OIcon name="chevronDown" size={10} /> My calendars
        </div>
        <label className="flex items-center gap-2 py-1 pl-3">
          <input type="checkbox" checked readOnly aria-label="Calendar" className="accent-[#0f6cbd]" />
          Calendar
        </label>
        {(doc.calendars ?? []).map((c) => (
          <label key={c.name} className="flex items-center gap-2 py-1 pl-3">
            <input type="checkbox" checked={Boolean(c.shown)} data-c="cal.toggleCalendar" data-v={c.name} onChange={() => ctx.cmd("cal.toggleCalendar", c.name)} aria-label={c.name} className="accent-[#498205]" />
            <span className="truncate">{c.name}</span>
          </label>
        ))}
        {(doc.shares ?? []).length > 0 && (
          <p className="mt-2 pl-3 text-[11.5px] text-gray-500">
            Shared with: {doc.shares!.map((s) => `${people(doc).find((p) => p.email === s.email)?.name ?? s.email} (${s.permission})`).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Event form                                                          */
/* ------------------------------------------------------------------ */

function PeopleField({ ctx, label, tokens, pending, onTokens, onPending, t }: { ctx: NCtx; label: string; tokens: string[]; pending: string; onTokens: (x: string[]) => void; onPending: (s: string) => void; t: string }) {
  const [focus, setFocus] = useState(false);
  const sugg = focus ? suggestionsFor(ctx, pending) : [];
  const add = (tok: string) => {
    if (!tokens.some((x) => x.toLowerCase() === tok.toLowerCase())) onTokens([...tokens, tok]);
    onPending("");
  };
  const nameOf = (x: string) => people(ctx.doc).find((p) => p.email.toLowerCase() === x.toLowerCase())?.name ?? x;
  return (
    <div className="relative flex min-h-[32px] flex-wrap items-center gap-1 rounded-[4px] border border-gray-300 px-2 py-1">
      <OIcon name="group" size={15} className="text-gray-500" />
      {tokens.map((x) => (
        <span key={x} className="flex items-center gap-1 rounded-full bg-[#ebf3fc] py-[1px] pl-0.5 pr-2 text-[12.5px]">
          <Avatar name={nameOf(x)} size={18} />
          {nameOf(x)}
          <button type="button" aria-label={`Remove ${nameOf(x)}`} onClick={() => onTokens(tokens.filter((y) => y !== x))} className="text-gray-500">
            ×
          </button>
        </span>
      ))}
      <input
        aria-label={label}
        placeholder={tokens.length ? "" : label}
        data-t={t}
        value={pending}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setTimeout(() => setFocus(false), 150);
          const r = pending.trim() ? resolveToken(ctx, pending) : null;
          if (r) add(r);
        }}
        onChange={(ev) => onPending(ev.target.value)}
        onKeyDown={(ev) => {
          ev.stopPropagation();
          if ((ev.key === "Enter" || ev.key === "Tab" || ev.key === ";") && pending.trim()) {
            const r = sugg[0]?.token ?? resolveToken(ctx, pending);
            if (r) {
              ev.preventDefault();
              add(r);
            }
          }
        }}
        className="min-w-[120px] flex-1 text-[13px] outline-none"
      />
      {sugg.length > 0 && (
        <div className="absolute left-0 top-full z-40 mt-1 w-80 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {sugg.map((s) => (
            <button key={s.token} type="button" onMouseDown={(ev) => { ev.preventDefault(); add(s.token); }} className="flex w-full items-center gap-2 px-2.5 py-1 text-left text-[12.5px] hover:bg-[#ebf3fc]">
              <Avatar name={s.label} size={22} />
              <span className="min-w-0">
                <span className="block truncate">{s.label}</span>
                <span className="block truncate text-[11px] text-gray-500">{s.sub}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TimeSel({ value, onChange, label, f }: { value: string; onChange: (hhmm: string) => void; label: string; f: string }) {
  const opts = TIME_OPTIONS_15;
  const cur = fmtTime(`2026-01-01T${value}`);
  return (
    <select aria-label={label} data-f={f} value={cur} onChange={(ev) => onChange(parseTime(ev.target.value) ?? value)} className={`${inputCls} w-28`}>
      {(opts.includes(cur) ? opts : [cur, ...opts]).map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function DateBox({ value, onChange, label, f }: { value: string; onChange: (iso: string) => void; label: string; f: string }) {
  const [text, setText] = useState(fmtDate(value));
  useEffect(() => setText(fmtDate(value)), [value]);
  return (
    <input
      aria-label={label}
      data-f={f}
      value={text}
      onChange={(ev) => setText(ev.target.value)}
      onBlur={() => {
        const d = parseUsDate(text);
        if (d) onChange(d);
        else setText(fmtDate(value));
      }}
      onKeyDown={(ev) => {
        ev.stopPropagation();
        if (ev.key === "Enter") (ev.target as HTMLInputElement).blur();
      }}
      className={`${inputCls} w-28`}
    />
  );
}

function SchedulingView({ ctx, d }: { ctx: NCtx; d: FormDraft }) {
  const doc = ctx.doc;
  const date = d.startDate;
  const attendees = [doc.account.email, ...d.required, ...d.optional];
  const from = 8 * 60;
  const to = 18 * 60;
  const pct = (iso: string) => {
    const m = +iso.slice(11, 13) * 60 + +iso.slice(14, 16);
    return Math.max(0, Math.min(100, ((m - from) / (to - from)) * 100));
  };
  const start = `${date}T${d.startTime}`;
  const end = `${d.endDate}T${d.endTime}`;
  const nameOf = (x: string) => people(doc).find((p) => p.email.toLowerCase() === x.toLowerCase())?.name ?? x;
  const slots = Array.from({ length: 20 }, (_, i) => `${String(8 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`);
  const len = Math.max(15, (+d.endTime.slice(0, 2) * 60 + +d.endTime.slice(3, 5)) - (+d.startTime.slice(0, 2) * 60 + +d.startTime.slice(3, 5)));
  return (
    <div className="mt-2 rounded-lg border border-gray-200 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[14px] font-semibold">Scheduling Assistant · {fmtDate(date)}</span>
        <button type="button" data-c="event.view" data-v="Appointment" onClick={() => ctx.cmd("event.view", "Appointment")} className="rounded-[4px] border border-gray-300 px-2.5 py-0.5 text-[12.5px] hover:bg-gray-50">
          Done
        </button>
      </div>
      <div className="mb-1 flex text-[10.5px] text-gray-500">
        <span className="w-36 shrink-0" />
        <div className="relative h-4 flex-1">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className="absolute" style={{ left: `${(i / 10) * 100}%` }}>
              {((8 + i - 1) % 12) + 1}
              {8 + i < 12 ? "a" : "p"}
            </span>
          ))}
        </div>
      </div>
      {attendees.map((a) => {
        const busy = a.toLowerCase() === doc.account.email.toLowerCase() ? occurrences(doc, date, date).filter((o) => !o.evt.allDay && !o.evt.calendar && o.evt.id !== ctx.doc.form?.id).map((o) => ({ start: o.start, end: o.end, title: o.evt.title })) : busyFor(doc, a, date);
        return (
          <div key={a} className="mb-1 flex items-center text-[12px]">
            <span className="flex w-36 shrink-0 items-center gap-1.5 truncate pr-2">
              <Avatar name={nameOf(a)} size={18} /> <span className="truncate">{nameOf(a)}</span>
            </span>
            <div className="relative h-6 flex-1 rounded-sm border border-gray-200 bg-white">
              {busy.map((b, i) => (
                <span key={i} title={`Busy ${fmtTime(b.start)} - ${fmtTime(b.end)}`} className="absolute top-0.5 h-4 rounded-sm bg-[#8a8886]/50" style={{ left: `${pct(b.start)}%`, width: `${Math.max(1.5, pct(b.end) - pct(b.start))}%` }} />
              ))}
              <span className="absolute inset-y-0 border-x-2 border-[#0f6cbd] bg-[#0f6cbd]/15" style={{ left: `${pct(start)}%`, width: `${Math.max(1.5, pct(end) - pct(start))}%` }} />
            </div>
          </div>
        );
      })}
      <div className="mt-2 flex flex-wrap items-center gap-1 text-[12px]">
        <span className="mr-1 text-gray-600">Pick a start time:</span>
        {slots.map((s) => (
          <button
            key={s}
            type="button"
            data-slot={s}
            onClick={() => ctx.setFdraft({ startTime: s, endTime: addMinutes(`${date}T${s}`, len).slice(11, 16), endDate: addMinutes(`${date}T${s}`, len).slice(0, 10) })}
            className={`rounded border px-1.5 py-0.5 ${s === d.startTime ? "border-[#0f6cbd] bg-[#ebf3fc] font-semibold" : "border-gray-300 hover:bg-gray-50"}`}
          >
            {fmtTime(`2026-01-01T${s}`)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function EventFormNew({ ctx }: { ctx: NCtx }) {
  const f = ctx.doc.form!;
  const d = ctx.fdraft;
  const [showOptional, setShowOptional] = useState(false);
  if (!d) return null;
  const hasPeople = d.required.length + d.optional.length > 0 || d.pending.required.trim() || d.pending.optional.trim();
  const setStart = (date: string, time: string) => {
    const lenMin = Math.max(0, (Date.parse(`${d.endDate}T${d.endTime}`) - Date.parse(`${d.startDate}T${d.startTime}`)) / 60000);
    const end = addMinutes(`${date}T${time}`, lenMin || 30);
    ctx.setFdraft({ startDate: date, startTime: time, endDate: end.slice(0, 10), endTime: end.slice(11, 16) });
  };
  const rec = recurrenceText(f.data.recurrence);
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto rounded-lg bg-white p-4 shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]" aria-label="Event">
      <div className="mb-3 flex items-center gap-2">
        <button type="button" data-c="event.saveClose" onClick={() => ctx.saveForm()} className="flex items-center gap-1.5 rounded-[4px] bg-[#0f6cbd] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-[#115ea3]">
          <OIcon name={hasPeople ? "send" : "save"} size={15} /> {hasPeople ? "Send" : "Save"}
        </button>
        <button type="button" data-c="event.discard" onClick={() => ctx.cmd("event.discard")} className="flex items-center gap-1.5 rounded-[4px] border border-gray-300 px-3 py-1.5 text-[13px] hover:bg-gray-50">
          <OIcon name="trash" size={15} /> Discard
        </button>
        <span className="flex-1" />
        <span className="text-[12px] text-gray-500">{f.id ? "Edit event" : "New event"}</span>
      </div>
      <input
        aria-label="Add a title"
        placeholder="Add a title"
        data-f="title"
        value={d.title}
        onChange={(ev) => ctx.setFdraft({ title: ev.target.value })}
        onKeyDown={(ev) => ev.stopPropagation()}
        className="mb-3 w-full border-b border-gray-300 pb-1 text-[20px] outline-none placeholder:text-gray-400 focus:border-[#0f6cbd]"
      />
      <div className="mb-2 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <PeopleField ctx={ctx} label="Invite required attendees" t="event.required" tokens={d.required} pending={d.pending.required} onTokens={(x) => ctx.setFdraft({ required: x })} onPending={(s) => ctx.setFdraft({ pending: { ...d.pending, required: s } })} />
          {(showOptional || d.optional.length > 0) && (
            <div className="mt-1.5">
              <PeopleField ctx={ctx} label="Invite optional attendees" t="event.optional" tokens={d.optional} pending={d.pending.optional} onTokens={(x) => ctx.setFdraft({ optional: x })} onPending={(s) => ctx.setFdraft({ pending: { ...d.pending, optional: s } })} />
            </div>
          )}
        </div>
        {!showOptional && !d.optional.length && (
          <button type="button" data-showoptional="1" onClick={() => setShowOptional(true)} className="mt-1 rounded px-1.5 py-1 text-[12.5px] text-[#0f6cbd] hover:bg-gray-100">
            Optional
          </button>
        )}
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[13px]">
        <OIcon name="clock" size={16} className="text-gray-500" />
        <DateBox label="Start date" f="startDate" value={d.startDate} onChange={(v) => setStart(v, d.startTime)} />
        {!d.allDay && <TimeSel label="Start time" f="startTime" value={d.startTime} onChange={(v) => setStart(d.startDate, v)} />}
        <span className="text-gray-500">to</span>
        {!d.allDay && <TimeSel label="End time" f="endTime" value={d.endTime} onChange={(v) => ctx.setFdraft({ endTime: v })} />}
        <DateBox label="End date" f="endDate" value={d.endDate} onChange={(v) => ctx.setFdraft({ endDate: v })} />
        <Switch on={d.allDay} f="allDay" label="All day" onChange={(v) => ctx.setFdraft({ allDay: v })} />
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[13px]">
        <OIcon name="recur" size={16} className="text-gray-500" />
        <button type="button" data-dlg="recurrence" onClick={() => ctx.openDialog("recurrence")} className="rounded-[4px] border border-gray-300 px-2.5 py-1 hover:bg-gray-50">
          {rec ? `Repeats: ${rec}` : "Make recurring"}
        </button>
        <button type="button" data-c="event.view" data-v="Scheduling Assistant" onClick={() => ctx.cmd("event.view", "Scheduling Assistant")} className="rounded-[4px] border border-gray-300 px-2.5 py-1 hover:bg-gray-50">
          <span className="flex items-center gap-1.5"><OIcon name="group" size={14} /> Scheduling Assistant</span>
        </button>
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[13px]">
        <OIcon name="location" size={16} className="text-gray-500" />
        <input aria-label="Add a location" placeholder="Add a location" data-f="location" value={d.location} onChange={(ev) => ctx.setFdraft({ location: ev.target.value })} onKeyDown={(ev) => ev.stopPropagation()} className={`${inputCls} max-w-[280px]`} />
        <Switch on={Boolean(f.data.teams)} c="event.teams" label="Teams meeting" onChange={() => ctx.cmd("event.teams")} />
      </div>
      {f.view === "scheduling" && <SchedulingView ctx={ctx} d={d} />}
      <textarea
        aria-label="Add a description or attach documents"
        placeholder="Add a description or attach documents"
        data-t="event.body"
        value={d.body}
        onChange={(ev) => ctx.setFdraft({ body: ev.target.value })}
        onKeyDown={(ev) => ev.stopPropagation()}
        className="mt-2 min-h-[90px] w-full flex-1 resize-none rounded-[4px] border border-gray-200 p-2 text-[13px] outline-none focus:border-[#0f6cbd]"
      />
    </div>
  );
}
