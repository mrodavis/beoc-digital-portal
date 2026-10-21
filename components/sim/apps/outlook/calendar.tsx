"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Ctx, FormDraft } from "./ctx";
import type { OlEvent } from "./types";
import { MenuButton, OIcon } from "./parts";
import { eventMenu, slotMenu } from "./menus";
import { RecipientField } from "./mail";
import { CATEGORY_COLORS, busyFor, conflictsWith, hasFreeBusy, occurrences, people, recurrenceEndText, recurrenceText, selKeys, todayOf, type Occurrence } from "./model";
import {
  DAY_SHORT, TIME_OPTIONS_15, addDays, addMinutes, addMonths, at, dateOf, dow, fmtDate, fmtDateDay, fmtDuration, fmtHour, fmtLong, fmtMonthDay,
  fmtMonthYear, fmtTime, minutesBetween, monthStart, parseTime, parseUsDate, toMs, weekStart,
} from "./dates";

const SLOT = 20; // px per 30 minutes
const VIEW_RANGE: Record<string, (d: string) => string[]> = {
  Day: (d) => [d],
  "Schedule View": (d) => [d],
  "Work Week": (d) => Array.from({ length: 5 }, (_, i) => addDays(weekStart(d), i + 1)),
  Week: (d) => Array.from({ length: 7 }, (_, i) => addDays(weekStart(d), i)),
};

const timeValue = (hhmm: string) => fmtTime(`2026-01-01T${hhmm}`);
const minutesOf = (iso: string) => +iso.slice(11, 13) * 60 + +iso.slice(14, 16);

/* ------------------------------------------------------------------ */
/* Date navigator                                                      */
/* ------------------------------------------------------------------ */

export function MiniMonth({ month, selected, today, marks, onPick, onPrev, onNext, highlight }: {
  month: string; selected?: string; today: string; marks?: Set<string>; onPick: (d: string) => void; onPrev?: () => void; onNext?: () => void; highlight?: string[];
}) {
  const first = monthStart(month);
  const start = weekStart(first);
  const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
  const inMonth = (d: string) => d.slice(0, 7) === first.slice(0, 7);
  const hl = new Set(highlight ?? []);
  return (
    <div className="select-none text-[11px]">
      <div className="mb-1 flex items-center justify-between px-1">
        {onPrev ? (
          <button type="button" aria-label="Previous month" onClick={onPrev} className="rounded px-1 hover:bg-gray-200">
            <OIcon name="chevronLeft" size={11} />
          </button>
        ) : <span />}
        <span className="text-[12px] font-semibold">{fmtMonthYear(first)}</span>
        {onNext ? (
          <button type="button" aria-label="Next month" onClick={onNext} className="rounded px-1 hover:bg-gray-200">
            <OIcon name="chevronRight" size={11} />
          </button>
        ) : <span />}
      </div>
      <div className="grid grid-cols-7 text-center text-gray-500">
        {DAY_SHORT.map((d) => (
          <span key={d}>{d.slice(0, 2)}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {days.map((d) => (
          <button
            key={d}
            type="button"
            aria-label={fmtLong(d)}
            onClick={() => onPick(d)}
            className={`m-[1px] rounded-sm py-[1px] ${!inMonth(d) ? "text-gray-400" : ""} ${d === today ? "bg-[#0f6cbd] font-semibold text-white" : d === selected ? "bg-[#cfe4fa]" : hl.has(d) ? "bg-[#e5f1fb]" : "hover:bg-gray-200"} ${marks?.has(d) && d !== today ? "font-bold" : ""}`}
          >
            {+d.slice(8, 10)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CalendarPane({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const cur = doc.calDate ?? todayOf(doc);
  const [month, setMonth] = useState(monthStart(cur));
  useEffect(() => setMonth(monthStart(cur)), [cur]);
  const marks = useMemo(() => new Set(occurrences(doc, addDays(month, -7), addDays(month, 70)).map((o) => o.date)), [doc, month]);
  const range = (VIEW_RANGE[doc.calView ?? "Work Week"] ?? ((d: string) => [d]))(cur);
  return (
    <div className="min-h-0 flex-1 overflow-auto p-2">
      <MiniMonth month={month} selected={cur} today={todayOf(doc)} marks={marks} highlight={range} onPick={(d) => ctx.cmd("cal.goto", d)} onPrev={() => setMonth(addMonths(month, -1))} onNext={() => setMonth(addMonths(month, 1))} />
      <div className="mt-2">
        <MiniMonth month={addMonths(month, 1)} selected={cur} today={todayOf(doc)} marks={marks} highlight={range} onPick={(d) => ctx.cmd("cal.goto", d)} />
      </div>
      <div className="mt-3 text-[12px]">
        <div className="mb-1 flex items-center gap-1 font-semibold text-gray-700">
          <OIcon name="chevronDown" size={10} /> My Calendars
        </div>
        <label className="flex items-center gap-2 py-0.5 pl-3">
          <input type="checkbox" checked readOnly aria-label="Calendar" />
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: ctx.accent }} />
          Calendar
        </label>
        {(doc.calendars ?? []).map((c) => (
          <label key={c.name} className="flex items-center gap-2 py-0.5 pl-3">
            <input type="checkbox" checked={Boolean(c.shown)} onChange={() => ctx.cmd("cal.toggleCalendar", c.name)} aria-label={c.name} />
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c.color ?? "#498205" }} />
            {c.name}
          </label>
        ))}
        {(doc.shares ?? []).length > 0 && (
          <p className="mt-2 pl-3 text-[11px] text-gray-500">
            Shared with: {doc.shares!.map((s) => `${people(doc).find((p) => p.email === s.email)?.name ?? s.email} (${s.permission})`).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calendar grid                                                       */
/* ------------------------------------------------------------------ */

function eventColors(ctx: Ctx, e: OlEvent): { bg: string; border: string; text: string; pattern?: string } {
  if (e.calendar) {
    const c = (ctx.doc.calendars ?? []).find((x) => x.name === e.calendar)?.color ?? "#498205";
    return { bg: c + "33", border: c, text: "#1b1b1b" };
  }
  const cat = e.categories?.[0];
  const base = cat ? CATEGORY_COLORS[cat] : ctx.accent;
  const show = e.showAs ?? "Busy";
  if (show === "Out of Office") return { bg: "#e9dff5", border: "#8764b8", text: "#1b1b1b" };
  if (show === "Free") return { bg: "#ffffff", border: base, text: "#1b1b1b" };
  if (show === "Tentative") return { bg: "#ffffff", border: base, text: "#1b1b1b", pattern: `repeating-linear-gradient(135deg, ${base}33 0 4px, #fff 4px 8px)` };
  return { bg: cat ? base + "40" : "#cfe4fa", border: base, text: "#1b1b1b" };
}

function layoutDay(list: Occurrence[]): Map<string, { col: number; cols: number }> {
  const out = new Map<string, { col: number; cols: number }>();
  const sorted = list.slice().sort((a, b) => toMs(a.start) - toMs(b.start) || toMs(b.end) - toMs(a.end));
  let cluster: Occurrence[] = [];
  let clusterEnd = 0;
  const flush = () => {
    const cols: number[] = [];
    const assign: [Occurrence, number][] = [];
    for (const o of cluster) {
      let c = cols.findIndex((end) => end <= toMs(o.start));
      if (c === -1) {
        c = cols.length;
        cols.push(0);
      }
      cols[c] = toMs(o.end);
      assign.push([o, c]);
    }
    for (const [o, c] of assign) out.set(o.key, { col: c, cols: cols.length });
    cluster = [];
  };
  for (const o of sorted) {
    if (cluster.length && toMs(o.start) >= clusterEnd) flush();
    cluster.push(o);
    clusterEnd = Math.max(clusterEnd, toMs(o.end));
  }
  if (cluster.length) flush();
  return out;
}

function EventBlock({ ctx, o, style, compact }: { ctx: Ctx; o: Occurrence; style?: React.CSSProperties; compact?: boolean }) {
  const e = o.evt;
  const selected = selKeys(ctx.ui.selection).includes(o.key);
  const col = eventColors(ctx, e);
  return (
    <div
      role="button"
      tabIndex={0}
      data-sel={o.key}
      aria-label={`${e.title}, ${e.allDay ? "all day" : `${fmtTime(o.start)} to ${fmtTime(o.end)}`}${e.location ? `, ${e.location}` : ""}`}
      aria-pressed={selected}
      draggable={!e.calendar}
      onDragStart={(ev) => {
        ctx.select(o.key);
        ev.dataTransfer.setData("text/x-olevt", o.key);
        ev.dataTransfer.effectAllowed = "move";
      }}
      onClick={(ev) => {
        ev.stopPropagation();
        ctx.select(o.key);
      }}
      onDoubleClick={(ev) => {
        ev.stopPropagation();
        ctx.cmd("item.open", o.key);
      }}
      onContextMenu={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        ctx.select(o.key);
        ctx.menu({ x: ev.clientX, y: ev.clientY }, eventMenu(ctx, o));
      }}
      className={`absolute overflow-hidden rounded-[2px] border-l-[3px] px-1 text-left text-[11px] leading-tight shadow-sm ${selected ? "outline outline-2 outline-[#1b1b1b]" : ""}`}
      style={{ background: col.pattern ?? col.bg, borderColor: col.border, color: col.text, ...style }}
      title={`${e.title}\n${e.allDay ? "All day" : `${fmtTime(o.start)} - ${fmtTime(o.end)}`}${e.location ? `\n${e.location}` : ""}${e.calendar ? `\n(${e.calendar})` : ""}`}
    >
      <div className="flex items-center gap-1">
        <span className="truncate font-semibold">{e.title || "(No title)"}</span>
        {e.recurrence && <OIcon name="recur" size={10} />}
        {e.private && <OIcon name="lock" size={10} />}
        {e.teams && <OIcon name="teams" size={11} />}
      </div>
      {!compact && e.location && <div className="truncate">{e.location}</div>}
      {!compact && e.calendar && <div className="truncate text-[10px] italic">{e.calendar}</div>}
    </div>
  );
}

function dropTo(ctx: Ctx, ev: React.DragEvent, iso: string) {
  const key = ev.dataTransfer.getData("text/x-olevt");
  if (!key) return;
  ev.preventDefault();
  ctx.select(key);
  ctx.cmd("event.move", `${fmtDate(iso)} ${fmtTime(iso)}`);
}

function TimeGrid({ ctx, days }: { ctx: Ctx; days: string[] }) {
  const doc = ctx.doc;
  const today = todayOf(doc);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 7.5 * 2 * SLOT;
  }, []);
  const occ = occurrences(doc, days[0], days[days.length - 1]);
  const allDay = occ.filter((o) => o.evt.allDay || minutesBetween(o.start, o.end) >= 1440);
  const timed = occ.filter((o) => !allDay.includes(o));
  const sel = selKeys(ctx.ui.selection)[0] ?? "";
  const nowMin = minutesOf(doc.now ?? "2026-10-20T09:30");
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex border-b border-gray-300 bg-white pr-3">
        {(doc.extraTimeZones ?? []).slice(0, 1).map((z) => (
          <div key={z.zone} className="w-12 shrink-0 truncate px-0.5 pt-2 text-right text-[9.5px] text-gray-500" title={z.zone}>
            {z.label || z.zone.replace(/^\(UTC[^)]*\)\s*/, "").split(" ")[0]}
          </div>
        ))}
        <div className="w-14 shrink-0 pt-2 text-right text-[9.5px] text-gray-500">{doc.extraTimeZones?.length ? "Local" : ""}</div>
        {days.map((d) => (
          <div key={d} className={`min-w-0 flex-1 border-l border-gray-200 px-2 py-1 ${d === today ? "border-t-2" : ""}`} style={d === today ? { borderTopColor: ctx.accent } : undefined}>
            <span className={`text-[20px] font-light ${d === today ? "" : "text-gray-700"}`} style={d === today ? { color: ctx.accent } : undefined}>
              {+d.slice(8, 10)}
            </span>{" "}
            <span className="text-[12px] text-gray-600">{DAY_SHORT[dow(d)]}</span>
          </div>
        ))}
      </div>
      <div className="flex border-b border-gray-300 bg-white pr-3">
        {(doc.extraTimeZones ?? []).slice(0, 1).map((z) => <div key={z.zone} className="w-12 shrink-0" />)}
        <div className="w-14 shrink-0 py-0.5 text-right text-[10px] text-gray-500" />
        {days.map((d) => {
          const list = allDay.filter((o) => dateOf(o.start) <= d && dateOf(addMinutes(o.end, -1)) >= d);
          return (
            <div key={d} className="relative min-h-[22px] min-w-0 flex-1 border-l border-gray-200 p-0.5" onDoubleClick={() => ctx.cmd("cal.newAppointment", at(d, "09:00"))}>
              {list.map((o, i) => (
                <div key={o.key} className="relative h-[18px]" style={{ marginTop: i ? 2 : 0 }}>
                  <EventBlock ctx={ctx} o={o} compact style={{ inset: 0 }} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-y-auto bg-white">
        <div className="flex" style={{ height: 48 * SLOT }}>
          {(doc.extraTimeZones ?? []).slice(0, 1).map((z) => {
            const m = /UTC([+-]\d{2}):(\d{2})/.exec(z.zone);
            const off = (m ? +m[1] : 0) - (doc.timeZone ? +(/UTC([+-]\d{2})/.exec(doc.timeZone)?.[1] ?? -5) : -5);
            return (
              <div key={z.zone} className="w-12 shrink-0 border-r border-gray-100 text-right text-[10px] text-gray-400" title={z.label ? `${z.label}: ${z.zone}` : z.zone}>
                {Array.from({ length: 24 }, (_, h) => (
                  <div key={h} className="pr-1" style={{ height: 2 * SLOT }}>
                    {fmtHour((((h + off) % 24) + 24) % 24)}
                  </div>
                ))}
              </div>
            );
          })}
          <div className="w-14 shrink-0 text-right text-[10.5px] text-gray-500">
            {Array.from({ length: 24 }, (_, h) => (
              <div key={h} className="pr-1.5" style={{ height: 2 * SLOT }}>
                {fmtHour(h)}
              </div>
            ))}
          </div>
          {days.map((d) => {
            const list = timed.filter((o) => dateOf(o.start) === d);
            const lay = layoutDay(list);
            const work = dow(d) > 0 && dow(d) < 6;
            return (
              <div key={d} className="relative min-w-0 flex-1 border-l border-gray-200">
                {Array.from({ length: 48 }, (_, i) => {
                  const iso = at(d, `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`);
                  const inWork = work && i >= 16 && i < 34;
                  return (
                    <div
                      key={i}
                      role="gridcell"
                      aria-label={`${fmtLong(d)} ${fmtTime(iso)}`}
                      aria-selected={sel === `slot:${iso}`}
                      onClick={() => ctx.select(`slot:${iso}`)}
                      onDoubleClick={() => ctx.cmd("cal.newAppointment", iso)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        ctx.select(`slot:${iso}`);
                        ctx.menu({ x: e.clientX, y: e.clientY }, slotMenu(ctx, iso));
                      }}
                      onDragOver={(e) => e.dataTransfer.types.includes("text/x-olevt") && e.preventDefault()}
                      onDrop={(e) => dropTo(ctx, e, iso)}
                      className={`${i % 2 ? "border-b border-gray-200" : "border-b border-dotted border-gray-100"} ${sel === `slot:${iso}` ? "bg-[#cfe4fa]" : inWork ? "bg-white hover:bg-[#f0f6fc]" : "bg-[#f7f7f7] hover:bg-[#eef4fb]"}`}
                      style={{ height: SLOT }}
                    />
                  );
                })}
                {d === today && <div className="pointer-events-none absolute inset-x-0 z-10 h-0.5 bg-[#c50f1f]" style={{ top: (nowMin / 30) * SLOT }} />}
                {list.map((o) => {
                  const l = lay.get(o.key) ?? { col: 0, cols: 1 };
                  const top = (minutesOf(o.start) / 30) * SLOT;
                  const h = Math.max(SLOT - 2, (minutesBetween(o.start, o.end) / 30) * SLOT - 2);
                  return <EventBlock key={o.key} ctx={ctx} o={o} compact={h < 30} style={{ top, height: h, left: `${(l.col / l.cols) * 100}%`, width: `calc(${100 / l.cols}% - 3px)` }} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MonthGrid({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const cur = doc.calDate ?? todayOf(doc);
  const first = monthStart(cur);
  const start = weekStart(first);
  const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
  const occ = occurrences(doc, days[0], days[41]);
  const today = todayOf(doc);
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="grid grid-cols-7 border-b border-gray-300 text-[12px] text-gray-600">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
          <div key={d} className="border-l border-gray-200 px-2 py-1">{d}</div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6">
        {days.map((d) => {
          const list = occ.filter((o) => (o.evt.allDay ? dateOf(o.start) <= d && dateOf(addMinutes(o.end, -1)) >= d : dateOf(o.start) === d));
          return (
            <div
              key={d}
              onDoubleClick={() => ctx.cmd("cal.newAppointment", at(d, "09:00"))}
              onClick={() => ctx.select(`slot:${at(d, "09:00")}`)}
              onDragOver={(e) => e.dataTransfer.types.includes("text/x-olevt") && e.preventDefault()}
              onDrop={(e) => {
                const key = e.dataTransfer.getData("text/x-olevt");
                const o = occ.find((x) => x.key === key);
                dropTo(ctx, e, at(d, o ? o.start.slice(11, 16) : "09:00"));
              }}
              className={`min-h-0 overflow-hidden border-b border-l border-gray-200 p-0.5 text-[11px] ${d.slice(0, 7) !== first.slice(0, 7) ? "bg-[#f7f7f7] text-gray-400" : ""}`}
            >
              <div className="px-1 text-right">
                <span className={d === today ? "rounded-sm px-1 font-semibold text-white" : ""} style={d === today ? { background: ctx.accent } : undefined}>
                  {+d.slice(8, 10) === 1 ? fmtMonthDay(d).replace(/^(\w{3})\w*/, "$1") : +d.slice(8, 10)}
                </span>
              </div>
              {list.slice(0, 3).map((o) => (
                <div key={o.key} className="relative mb-[1px] h-[16px]">
                  <EventBlock ctx={ctx} o={o} compact style={{ inset: 0 }} />
                </div>
              ))}
              {list.length > 3 && <div className="px-1 text-gray-500">+{list.length - 3} more</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScheduleGrid({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const d = doc.calDate ?? todayOf(doc);
  const rows = [{ name: "Calendar", cal: undefined as string | undefined }, ...(doc.calendars ?? []).filter((c) => c.shown).map((c) => ({ name: c.name, cal: c.name as string | undefined }))];
  const occ = occurrences(doc, d, d);
  const from = 7 * 60, to = 19 * 60;
  const pct = (iso: string) => Math.max(0, Math.min(100, ((minutesOf(iso) - from) / (to - from)) * 100));
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-white">
      <div className="flex border-b border-gray-300 text-[11px] text-gray-600">
        <div className="w-36 shrink-0 px-2 py-1">{fmtLong(d)}</div>
        <div className="relative flex-1">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="absolute top-1" style={{ left: `${(i / 12) * 100}%` }}>
              {fmtHour(7 + i)}
            </span>
          ))}
        </div>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="flex h-12 border-b border-gray-200">
          <div className="w-36 shrink-0 truncate px-2 py-3 text-[12px] font-semibold">{r.name}</div>
          <div className="relative flex-1">
            {occ
              .filter((o) => (o.evt.calendar ?? undefined) === r.cal && !o.evt.allDay)
              .map((o) => (
                <EventBlock key={o.key} ctx={ctx} o={o} compact style={{ top: 8, height: 30, left: `${pct(o.start)}%`, width: `${Math.max(2, pct(o.end) - pct(o.start))}%` }} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CalendarView({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const view = doc.calView ?? "Work Week";
  const cur = doc.calDate ?? todayOf(doc);
  const days = (VIEW_RANGE[view] ?? VIEW_RANGE.Day)(cur);
  const title =
    view === "Month"
      ? fmtMonthYear(cur)
      : days.length === 1
        ? fmtLong(cur)
        : days[0].slice(0, 7) === days[days.length - 1].slice(0, 7)
          ? `${fmtMonthDay(days[0])} - ${+days[days.length - 1].slice(8, 10)}, ${days[0].slice(0, 4)}`
          : `${fmtMonthDay(days[0])} - ${fmtMonthDay(days[days.length - 1])}, ${days[0].slice(0, 4)}`;
  return (
    <section aria-label="Calendar" className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-1.5">
        <button type="button" aria-label="Back" onClick={() => ctx.cmd("cal.prev")} className="rounded p-1 hover:bg-gray-100">
          <OIcon name="chevronLeft" size={14} />
        </button>
        <button type="button" aria-label="Forward" onClick={() => ctx.cmd("cal.next")} className="rounded p-1 hover:bg-gray-100">
          <OIcon name="chevronRight" size={14} />
        </button>
        <h2 className="text-[16px] font-light text-gray-900">{title}</h2>
        <span className="flex-1" />
        <button type="button" onClick={() => ctx.cmd("cal.today")} className="rounded border border-gray-300 px-2 py-0.5 text-[12px] hover:bg-gray-100">
          Today
        </button>
        <MenuButton
          ariaLabel="Change view"
          className="rounded border border-gray-300 px-2 py-0.5 text-[12px] hover:bg-gray-100"
          items={["Day", "Work Week", "Week", "Month", "Schedule View"].map((v) => ({ label: v, checked: v === view, onPick: () => ctx.cmd("cal.view", v) }))}
        >
          {view} ▾
        </MenuButton>
      </div>
      {view === "Month" ? <MonthGrid ctx={ctx} /> : view === "Schedule View" ? <ScheduleGrid ctx={ctx} /> : <TimeGrid ctx={ctx} days={days} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Appointment / meeting form                                          */
/* ------------------------------------------------------------------ */

function DateField({ value, onChange, label, disabled }: { value: string; onChange: (iso: string) => void; label: string; disabled?: boolean }) {
  const [text, setText] = useState(fmtDateDay(value));
  const [pick, setPick] = useState<{ x: number; y: number } | null>(null);
  const [month, setMonth] = useState(monthStart(value));
  useEffect(() => {
    setText(fmtDateDay(value));
    setMonth(monthStart(value));
  }, [value]);
  const commit = () => {
    const iso = parseUsDate(text);
    if (iso) onChange(iso);
    else setText(fmtDateDay(value));
  };
  return (
    <span className="relative flex items-center border border-gray-300 bg-white">
      <input aria-label={label} disabled={disabled} value={text} onChange={(e) => setText(e.target.value)} onBlur={commit} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") commit(); }} className="w-[104px] px-1 py-0.5 text-[12px] outline-none disabled:bg-gray-100" />
      <button
        type="button"
        disabled={disabled}
        aria-label={`${label} calendar`}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPick(pick ? null : { x: r.left - 150, y: r.bottom + 2 });
        }}
        className="border-l border-gray-300 px-1 hover:bg-gray-100 disabled:opacity-40"
      >
        <OIcon name="calendar" size={12} />
      </button>
      {pick && (
        <>
          <span className="fixed inset-0 z-[205]" onMouseDown={() => setPick(null)} aria-hidden="true" />
          <span className="fixed z-[206] w-48 rounded border border-gray-300 bg-white p-2 shadow-xl" style={{ left: Math.max(6, pick.x), top: pick.y }}>
            <MiniMonth month={month} selected={value} today="2026-10-20" onPrev={() => setMonth(addMonths(month, -1))} onNext={() => setMonth(addMonths(month, 1))} onPick={(d) => { onChange(d); setPick(null); }} />
          </span>
        </>
      )}
    </span>
  );
}

function TimeSelect({ value, onChange, label, from, disabled }: { value: string; onChange: (hhmm: string) => void; label: string; from?: string; disabled?: boolean }) {
  const opts = TIME_OPTIONS_15.map((t) => parseTime(t)!);
  const list = opts.includes(value) ? opts : [...opts, value].sort();
  return (
    <select aria-label={label} disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} className="border border-gray-300 bg-white px-1 py-0.5 text-[12px] disabled:bg-gray-100">
      {list.map((t) => {
        const dur = from ? minutesBetween(`2026-01-01T${from}`, `2026-01-01T${t}`) : -1;
        return (
          <option key={t} value={t}>
            {timeValue(t)}
            {from && dur >= 0 ? ` (${fmtDuration(dur)})` : ""}
          </option>
        );
      })}
    </select>
  );
}

function draftStart(d: FormDraft) {
  return d.allDay ? `${d.startDate}T00:00` : `${d.startDate}T${d.startTime}`;
}
function draftEnd(d: FormDraft) {
  return d.allDay ? `${addDays(d.endDate, 1)}T00:00` : `${d.endDate}T${d.endTime}`;
}

function setStart(ctx: Ctx, d: FormDraft, date: string, time: string) {
  const len = Math.max(0, minutesBetween(draftStart(d), draftEnd(d)));
  const s = `${date}T${time}`;
  const e = addMinutes(s, d.allDay ? Math.max(0, len - 1440) : len);
  ctx.setFdraft({ startDate: date, startTime: time, endDate: dateOf(e), endTime: d.allDay ? d.endTime : e.slice(11, 16) });
}

function SchedulingAssistant({ ctx, d }: { ctx: Ctx; d: FormDraft }) {
  const doc = ctx.doc;
  const date = d.startDate;
  const from = 8 * 60, to = 18 * 60;
  const slots = (to - from) / 30;
  const attendees = [
    { token: doc.account.email, name: `${doc.account.name}`, role: "Organizer" },
    ...d.required.map((t) => ({ token: t, name: people(doc).find((p) => p.email.toLowerCase() === t.toLowerCase())?.name ?? t, role: "Required" })),
    ...d.optional.map((t) => ({ token: t, name: people(doc).find((p) => p.email.toLowerCase() === t.toLowerCase())?.name ?? t, role: "Optional" })),
  ];
  const len = Math.max(30, minutesBetween(draftStart(d), draftEnd(d)));
  const exceptId = doc.form?.id;
  const busyOf = (email: string) => busyFor(doc, email, date, exceptId);
  const conflictsAt = (s: string, e: string) =>
    attendees.filter((a) => busyOf(a.token).some((b) => b.status !== "Free" && b.status !== "Working Elsewhere" && toMs(b.start) < toMs(e) && toMs(b.end) > toMs(s))).map((a) => a.name);
  const startMin = minutesOf(draftStart(d));
  const pct = (m: number) => ((m - from) / (to - from)) * 100;
  const cur = conflictsAt(draftStart(d), draftEnd(d));
  const suggestions = Array.from({ length: slots }, (_, i) => at(date, `${String(Math.floor((from + i * 30) / 60)).padStart(2, "0")}:${(from + i * 30) % 60 ? "30" : "00"}`))
    .filter((s) => minutesOf(s) + len <= to)
    .map((s) => ({ s, c: conflictsAt(s, addMinutes(s, len)) }))
    .sort((a, b) => a.c.length - b.c.length || toMs(a.s) - toMs(b.s))
    .slice(0, 8)
    .sort((a, b) => toMs(a.s) - toMs(b.s));
  const block = (status: string) => (status === "Out of Office" ? "#8764b8" : status === "Tentative" ? "repeating-linear-gradient(135deg,#0f6cbd 0 3px,#cfe4fa 3px 6px)" : status === "Working Elsewhere" ? "#c8c6c4" : "#0f6cbd");
  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-gray-200 px-2 py-1 text-[12px]">
          <button type="button" aria-label="Previous day" onClick={() => setStart(ctx, d, addDays(date, -1), d.startTime)} className="rounded p-0.5 hover:bg-gray-100">
            <OIcon name="chevronLeft" size={12} />
          </button>
          <span className="font-semibold">{fmtLong(date)}</span>
          <button type="button" aria-label="Next day" onClick={() => setStart(ctx, d, addDays(date, 1), d.startTime)} className="rounded p-0.5 hover:bg-gray-100">
            <OIcon name="chevronRight" size={12} />
          </button>
          <span className="flex-1" />
          <span className={cur.length ? "font-semibold text-[#a4262c]" : "text-green-800"}>{cur.length ? `Conflict: ${cur.join(", ")} ${cur.length > 1 ? "are" : "is"} busy` : "No conflicts"}</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          <div className="min-w-[560px]">
            <div className="flex border-b border-gray-300 bg-[#faf9f8] text-[10.5px] text-gray-600">
              <div className="w-44 shrink-0 px-2 py-1">All Attendees</div>
              <div className="relative h-6 flex-1">
                {Array.from({ length: 11 }, (_, i) => (
                  <span key={i} className="absolute top-1 border-l border-gray-300 pl-0.5" style={{ left: `${(i / 10) * 100}%` }}>
                    {fmtHour(8 + i)}
                  </span>
                ))}
              </div>
            </div>
            {[{ token: "__all", name: "All Attendees", role: "" }, ...attendees].map((a) => {
              const blocks = a.token === "__all" ? attendees.flatMap((x) => busyOf(x.token)) : busyOf(a.token);
              const unknown = a.token !== "__all" && !hasFreeBusy(doc, a.token);
              return (
                <div key={a.token} className="flex h-7 border-b border-gray-200 text-[12px]">
                  <div className="flex w-44 shrink-0 items-center gap-1 truncate px-2">
                    {a.role === "Organizer" && <OIcon name="person" size={12} />}
                    {a.role === "Required" && <OIcon name="people" size={12} />}
                    {a.role === "Optional" && <OIcon name="people" size={12} className="text-gray-400" />}
                    <span className={`truncate ${a.token === "__all" ? "font-semibold" : ""}`} title={a.role ? `${a.name} (${a.role})` : a.name}>
                      {a.name}
                    </span>
                  </div>
                  <div
                    className="relative flex-1"
                    style={unknown ? { background: "repeating-linear-gradient(135deg,#eee 0 4px,#fff 4px 8px)" } : undefined}
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      const m = from + Math.floor(((e.clientX - r.left) / r.width) * slots) * 30;
                      setStart(ctx, d, date, `${String(Math.floor(m / 60)).padStart(2, "0")}:${m % 60 ? "30" : "00"}`);
                    }}
                  >
                    {Array.from({ length: slots }, (_, i) => (
                      <span key={i} className={`absolute inset-y-0 ${i % 2 ? "border-l border-dotted border-gray-200" : "border-l border-gray-200"}`} style={{ left: `${(i / slots) * 100}%` }} />
                    ))}
                    {blocks.map((b, i) => (
                      <span key={i} className="absolute top-1.5 h-4" title={`${b.status}${b.title ? `: ${b.title}` : ""} ${fmtTime(b.start)} - ${fmtTime(b.end)}`} style={{ left: `${Math.max(0, pct(minutesOf(b.start)))}%`, width: `${Math.max(1, pct(minutesOf(b.end)) - Math.max(0, pct(minutesOf(b.start))))}%`, background: block(b.status) }} />
                    ))}
                    {unknown && <span className="absolute left-1 top-1 text-[10px] text-gray-500">No information</span>}
                    {!d.allDay && (
                      <span className="pointer-events-none absolute inset-y-0 border-l-2 border-r-2 border-l-green-600 border-r-red-600 bg-white/40" style={{ left: `${pct(startMin)}%`, width: `${(len / (to - from)) * 100}%` }} />
                    )}
                  </div>
                </div>
              );
            })}
            <div className="flex h-7 items-center border-b border-gray-200">
              <div className="w-44 shrink-0 px-1">
                <AddAttendee ctx={ctx} d={d} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 px-2 py-1.5 text-[12px]">
          <span className="w-16 text-gray-600">Start time</span>
          <DateField label="Start date" value={d.startDate} onChange={(v) => setStart(ctx, d, v, d.startTime)} />
          <TimeSelect label="Start time" disabled={d.allDay} value={d.startTime} onChange={(v) => setStart(ctx, d, d.startDate, v)} />
          <span className="ml-3 w-14 text-gray-600">End time</span>
          <DateField label="End date" value={d.endDate} onChange={(v) => ctx.setFdraft({ endDate: v })} />
          <TimeSelect label="End time" disabled={d.allDay} value={d.endTime} from={d.endDate === d.startDate ? d.startTime : undefined} onChange={(v) => ctx.setFdraft({ endTime: v })} />
          <span className="ml-2 flex items-center gap-2 text-[11px] text-gray-600">
            <span className="inline-block h-3 w-3" style={{ background: "#0f6cbd" }} /> Busy
            <span className="inline-block h-3 w-3" style={{ background: "repeating-linear-gradient(135deg,#0f6cbd 0 3px,#cfe4fa 3px 6px)" }} /> Tentative
            <span className="inline-block h-3 w-3" style={{ background: "#8764b8" }} /> Out of Office
            <span className="inline-block h-3 w-3 border border-gray-300" style={{ background: "repeating-linear-gradient(135deg,#eee 0 3px,#fff 3px 6px)" }} /> No Information
          </span>
        </div>
      </div>
      <aside aria-label="Room Finder" className="hidden w-52 shrink-0 flex-col overflow-auto border-l border-gray-200 bg-[#faf9f8] p-2 text-[12px] sm:flex">
        <MiniMonth month={monthStart(date)} selected={date} today={todayOf(doc)} onPick={(v) => setStart(ctx, d, v, d.startTime)} />
        <p className="mb-1 mt-3 font-semibold">Suggested times:</p>
        {suggestions.map(({ s, c }) => (
          <button key={s} type="button" onClick={() => setStart(ctx, d, date, s.slice(11, 16))} className={`mb-1 block w-full rounded border px-2 py-1 text-left hover:bg-white ${toMs(s) === toMs(draftStart(d)) ? "border-[#0f6cbd] bg-white" : "border-gray-200"}`}>
            <span className="block">{fmtTime(s)} - {fmtTime(addMinutes(s, len))}</span>
            <span className={`block text-[11px] ${c.length ? "text-[#a4262c]" : "text-green-800"}`}>{c.length ? `${c.length} conflict${c.length > 1 ? "s" : ""}: ${c.join(", ")}` : "No conflicts"}</span>
          </button>
        ))}
      </aside>
    </div>
  );
}

function AddAttendee({ ctx, d }: { ctx: Ctx; d: FormDraft }) {
  return (
    <input
      aria-label="Add attendee"
      placeholder="Click here to add a name"
      value={d.pending.required}
      onChange={(e) => ctx.setFdraft({ pending: { ...d.pending, required: e.target.value } })}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
          const t = d.pending.required.trim().toLowerCase();
          const p = people(ctx.doc).find((x) => x.email.toLowerCase() === t || x.name.toLowerCase() === t || x.name.toLowerCase().startsWith(t));
          const tok = p?.email ?? (/@/.test(t) ? d.pending.required.trim() : "");
          if (tok && !d.required.includes(tok)) ctx.setFdraft({ required: [...d.required, tok], pending: { ...d.pending, required: "" } });
        }
      }}
      className="w-full border-0 bg-transparent px-1 text-[12px] italic outline-none placeholder:text-gray-400"
    />
  );
}

export function EventForm({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const f = doc.form!;
  const d = ctx.fdraft;
  if (!d) return null;
  const meeting = f.kind === "meeting";
  const start = draftStart(d), end = draftEnd(d);
  const conflicts = d.allDay ? [] : conflictsWith(doc, start, end, f.id);
  const adjacent = !conflicts.length && !d.allDay && occurrences(doc, d.startDate, d.startDate).some((o) => !o.evt.allDay && o.evt.id !== f.id && (o.end === start || o.start === end));
  const r = f.data.recurrence;
  const row = "flex items-center gap-2 border-b border-gray-200 py-1";
  const label = "w-16 shrink-0 text-[12px] text-gray-600";
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white" aria-label={meeting ? "Meeting" : "Appointment"}>
      <div className="flex items-center justify-end border-b border-gray-200 px-2 py-0.5">
        <button type="button" aria-label="Close" title="Close" onClick={() => ctx.cmd("event.close")} className="rounded p-1 text-gray-600 hover:bg-red-600 hover:text-white">
          <OIcon name="close" size={12} />
        </button>
      </div>
      {meeting && !f.id && <Bar icon="info">You haven&apos;t sent this meeting invitation yet.</Bar>}
      {conflicts.length > 0 && <Bar icon="warning" tone="yellow">Conflicts with another appointment on your Calendar: {conflicts.map((o) => `${o.evt.title} (${fmtTime(o.start)} - ${fmtTime(o.end)})`).join(", ")}.</Bar>}
      {adjacent && <Bar icon="info">Adjacent to another appointment on your Calendar.</Bar>}
      {toMs(start) < toMs(`${todayOf(doc)}T00:00`) && <Bar icon="info">This appointment occurs in the past.</Bar>}
      {f.data.reminder && f.data.reminder !== "None" && <Bar icon="bell">Reminder: {f.data.reminder} before start.</Bar>}
      {f.view === "scheduling" ? (
        <SchedulingAssistant ctx={ctx} d={d} />
      ) : (
        <>
          <div className="flex gap-2 px-3 pt-2">
            {meeting && (
              // A meeting that was already sent shows Send Update, as in Outlook.
              <button type="button" onClick={() => ctx.saveForm()} aria-label={f.id ? "Send Update" : "Send"} title={`${f.id ? "Send Update" : "Send"} (Alt+S)`} className="flex h-[52px] w-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded border border-gray-300 bg-white text-center text-[12px] leading-[1.1] hover:bg-[#e5f1fb]">
                <OIcon name="send" size={f.id ? 18 : 20} className="shrink-0 text-[#0f6cbd]" />
                {f.id ? "Send Update" : "Send"}
              </button>
            )}
            <div className="min-w-0 flex-1">
              {meeting && (
                <>
                  <RecipientField ctx={ctx} label="Required" tokens={d.required} pending={d.pending.required} onTokens={(t) => ctx.setFdraft({ required: t })} onPending={(s) => ctx.setFdraft({ pending: { ...d.pending, required: s } })} onButton={() => ctx.cmd("compose.addressBook", "Required")} />
                  <RecipientField ctx={ctx} label="Optional" tokens={d.optional} pending={d.pending.optional} onTokens={(t) => ctx.setFdraft({ optional: t })} onPending={(s) => ctx.setFdraft({ pending: { ...d.pending, optional: s } })} onButton={() => ctx.cmd("compose.addressBook", "Optional")} />
                </>
              )}
              <div className={row}>
                <label htmlFor="ol-title" className={label}>Title</label>
                <input id="ol-title" value={d.title} onChange={(e) => ctx.setFdraft({ title: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 py-0.5 text-[12.5px] outline-none" />
              </div>
              <div className={row}>
                <label htmlFor="ol-loc" className={label}>Location</label>
                <input id="ol-loc" value={d.location} placeholder={f.data.teams ? "Microsoft Teams Meeting" : ""} onChange={(e) => ctx.setFdraft({ location: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 py-0.5 text-[12.5px] outline-none" />
                <button type="button" disabled className="rounded border border-gray-300 px-1.5 text-[11px] text-gray-500">Rooms...</button>
              </div>
              <div className={`${row} flex-wrap`}>
                <span className={label}>Start time</span>
                <DateField label="Start date" value={d.startDate} onChange={(v) => setStart(ctx, d, v, d.startTime)} />
                <TimeSelect label="Start time" disabled={d.allDay} value={d.startTime} onChange={(v) => setStart(ctx, d, d.startDate, v)} />
                <label className="ml-2 flex items-center gap-1 text-[12px]">
                  <input
                    type="checkbox"
                    checked={d.allDay}
                    onChange={(e) => {
                      ctx.setFdraft({ allDay: e.target.checked, endDate: e.target.checked ? d.startDate : d.endDate });
                      ctx.cmd("event.showAs", e.target.checked ? "Free" : "Busy");
                    }}
                  />{" "}
                  All day event
                </label>
                <button type="button" onClick={() => ctx.openDialog("recurrence")} className="ml-1 flex items-center gap-1 rounded border border-gray-300 px-1.5 py-0.5 text-[11.5px] hover:bg-gray-100">
                  <OIcon name="recur" size={12} /> {r ? "Edit Recurrence" : "Make Recurring"}
                </button>
              </div>
              <div className={`${row} flex-wrap`}>
                <span className={label}>End time</span>
                <DateField label="End date" value={d.endDate} onChange={(v) => ctx.setFdraft({ endDate: v })} />
                <TimeSelect label="End time" disabled={d.allDay} value={d.endTime} from={d.endDate === d.startDate ? d.startTime : undefined} onChange={(v) => ctx.setFdraft({ endTime: v })} />
              </div>
              {r && (
                <div className="flex items-center gap-2 border-b border-gray-200 py-1 text-[12px]">
                  <OIcon name="recur" size={13} />
                  <span>
                    Occurs {recurrenceText(r).replace(/^Weekly on/, "every").replace(/^Daily/, "every day").replace(/^Every weekday/, "every weekday")} effective {fmtDate(d.startDate)}
                    {d.allDay ? "" : ` from ${timeValue(d.startTime)} to ${timeValue(d.endTime)}`}. {recurrenceEndText(r)}.
                  </span>
                </div>
              )}
            </div>
          </div>
          {f.data.teams && (
            <div className="mx-3 mt-2 rounded border border-gray-200 bg-[#f5f5ff] p-2 text-[12px]">
              <p className="flex items-center gap-1 font-semibold"><OIcon name="teams" size={16} /> Microsoft Teams meeting</p>
              <p>Join on your computer, mobile app or room device</p>
              <span className="text-[#5b5fc7] underline">Click here to join the meeting</span>
            </div>
          )}
          <div className="flex min-h-0 flex-1 flex-col px-3 pb-2 pt-2">
            <textarea aria-label={meeting ? "Meeting notes and agenda" : "Appointment notes"} value={d.body} onChange={(e) => ctx.setFdraft({ body: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-h-[90px] w-full flex-1 resize-none border border-gray-200 p-1.5 text-[13px] leading-relaxed outline-none focus:border-[#0f6cbd]" />
          </div>
        </>
      )}
    </div>
  );
}

function Bar({ icon, children, tone = "gray" }: { icon: string; children: React.ReactNode; tone?: "gray" | "yellow" }) {
  return (
    <div className={`flex items-center gap-2 border-b px-3 py-1 text-[12px] ${tone === "yellow" ? "border-[#f7e28c] bg-[#fff4ce]" : "border-gray-200 bg-[#f3f2f1]"}`}>
      <OIcon name={icon} size={13} />
      <span>{children}</span>
    </div>
  );
}
