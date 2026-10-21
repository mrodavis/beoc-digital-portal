"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarLogo, Icon } from "./icons";
import {
  DAY_LONG,
  DAY_SHORT,
  MON_LONG,
  PERMISSIONS,
  REPEATS,
  TIME_ZONES,
  addDays,
  calOf,
  calendarsOf,
  eventOf,
  fmtDayYear,
  fmtLongDay,
  fmtTime,
  fromMinutes,
  minutes,
  personOf,
  primaryZone,
  todayOf,
  tzOffset,
  weekStart,
  weekday,
  zoneShift,
} from "./model";
import type { GmEvent, GmailDoc } from "./types";
import { AppsMenu, Avatar, BLUE, Btn, Check, FONT, IconBtn, Menu, Modal, Select, TEXT, useGm, type MenuPos } from "./ui";

const HOUR = 48;
const START_HOUR = 7;

type Draft = {
  id?: string;
  title: string;
  day: string;
  start: string;
  end: string;
  allDay: boolean;
  repeat: string;
  timeZone: string;
  guests: { email: string; optional?: boolean }[];
  meet: boolean;
  location: string;
  notifications: string[];
  calendar: string;
  description: string;
  perms: string[];
};

function draftFrom(doc: GmailDoc, e?: GmEvent, slot?: { day: string; start: string }): Draft {
  const mine = calendarsOf(doc).find((c) => c.mine)?.id ?? "main";
  if (e)
    return {
      id: e.id,
      title: e.title,
      day: e.day,
      start: e.start ?? "09:00",
      end: e.end ?? "10:00",
      allDay: Boolean(e.allDay),
      repeat: e.repeat ?? "Does not repeat",
      timeZone: e.timeZone ?? primaryZone(doc),
      guests: (e.guests ?? []).map((g) => ({ email: g.email, optional: g.optional })),
      meet: Boolean(e.meet),
      location: e.location ?? "",
      notifications: e.notifications ?? [],
      calendar: e.calendar,
      description: e.description ?? "",
      perms: e.guestPerms ?? ["See guest list"],
    };
  const start = slot?.start ?? "10:00";
  return { title: "", day: slot?.day ?? todayOf(doc), start, end: fromMinutes(minutes(start) + 60), allDay: false, repeat: "Does not repeat", timeZone: primaryZone(doc), guests: [], meet: false, location: "", notifications: ["30 minutes before"], calendar: mine, description: "", perms: ["See guest list"] };
}

function serialize(doc: GmailDoc, d: Draft, invitations?: "Send" | "Don't send"): string {
  const lines = [`Title: ${d.title}`, `Date: ${fmtDayYear(d.day)}`];
  if (!d.allDay) lines.push(`Start: ${fmtTime(d.start)}`, `End: ${fmtTime(d.end)}`);
  lines.push(`All day: ${d.allDay ? "yes" : "no"}`, `Repeat: ${d.repeat}`, `Time zone: ${d.timeZone}`);
  d.guests.forEach((g) => lines.push(`${g.optional ? "Optional" : "Guest"}: ${g.email}`));
  lines.push(`Google Meet: ${d.meet ? "yes" : "no"}`);
  if (d.location) lines.push(`Location: ${d.location}`);
  d.notifications.forEach((n) => lines.push(n.startsWith("Email:") ? n : `Notification: ${n}`));
  lines.push(`Calendar: ${calOf(doc, d.calendar)?.name ?? d.calendar}`);
  if (d.guests.length) lines.push(`Guests can: ${d.perms.map((p) => p.toLowerCase()).join(", ")}`);
  lines.push(`Invitations: ${invitations ?? "none"}`);
  lines.push(`Description: ${d.description.trim()}`);
  return lines.join("\n");
}

const TIMES = Array.from({ length: 48 }, (_, i) => fromMinutes(i * 30));
const NOTIFY = ["5 minutes before", "10 minutes before", "15 minutes before", "30 minutes before", "1 hour before", "1 day before"];

export function CalendarSurface() {
  const g = useGm();
  const { doc, ui } = g;
  const v = doc.view ?? {};
  const date = v.calDate ?? todayOf(doc);
  const mode = v.calView ?? "Week";
  const page = v.calPage ?? null;
  const [create, setCreate] = useState<MenuPos | null>(null);
  const [quick, setQuick] = useState<null | { day: string; start: string; tab: "Event" | "Task" | "Appointment schedule"; pos: MenuPos }>(null);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [appt, setAppt] = useState(false);
  const [apps, setApps] = useState<MenuPos | null>(null);
  const [viewMenu, setViewMenu] = useState<MenuPos | null>(null);
  const [gear, setGear] = useState<MenuPos | null>(null);
  const openEvt = ui.selection.startsWith("evt:") ? eventOf(doc, ui.selection.slice(4)) : undefined;
  const days = mode === "Day" ? [date] : Array.from({ length: 7 }, (_, i) => addDays(weekStart(date), i));
  const title = mode === "Month" || mode === "Week" ? (() => {
    const a = days[0], b = days[days.length - 1];
    const ma = Number(a.slice(5, 7)) - 1, mb = Number(b.slice(5, 7)) - 1;
    return ma === mb || mode === "Month" ? `${MON_LONG[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}` : `${MON_LONG[ma].slice(0, 3)} – ${MON_LONG[mb].slice(0, 3)} ${b.slice(0, 4)}`;
  })() : fmtLongDay(date) + `, ${date.slice(0, 4)}`;
  const step = mode === "Day" ? 1 : mode === "Week" ? 7 : 30;

  if (editing) return <EventPage draft={editing} onClose={() => setEditing(null)} />;
  if (appt) return <AppointmentPage onClose={() => setAppt(false)} />;

  return (
    <div className="flex h-full flex-col bg-[#f8fafd]" style={{ fontFamily: TEXT }}>
      <div className="flex h-16 shrink-0 items-center gap-2 px-3">
        <IconBtn icon="menu" label="Main menu" box={44} size={22} onClick={() => g.cmd("toast", "The main menu stays open in this practice.")} />
        <CalendarLogo size={36} day={Number(todayOf(doc).slice(8))} />
        <span className="mr-8 text-[22px] text-[#444746]" style={{ fontFamily: FONT }}>Calendar</span>
        <Btn kind="outlined" onClick={() => g.cmd("cal.today")} label="Today" className="text-[#1f1f1f]">Today</Btn>
        <IconBtn icon="chevronLeft" label={mode === "Day" ? "Previous day" : mode === "Week" ? "Previous week" : "Previous month"} onClick={() => g.cmd("cal.go", addDays(date, -step))} />
        <IconBtn icon="chevronRight" label={mode === "Day" ? "Next day" : mode === "Week" ? "Next week" : "Next month"} onClick={() => g.cmd("cal.go", addDays(date, step))} />
        <h1 className="ml-2 text-[22px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>{title}</h1>
        <span className="flex-1" />
        <IconBtn icon="search" label="Search" onClick={() => g.cmd("toast", "Search isn't part of this practice.")} />
        <IconBtn icon="help" label="Support" onClick={() => g.cmd("toast", "Calendar Help opens in a new tab.")} />
        <IconBtn icon="settings" label="Settings menu" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setGear({ x: r.left - 120, y: r.bottom + 4 }); }} />
        <button type="button" aria-label={`View: ${mode}`} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setViewMenu({ x: r.left, y: r.bottom + 4 }); }} className="ml-2 flex h-9 items-center gap-1 rounded-full border border-[#747775] px-4 text-[14px] font-medium hover:bg-[#f1f3f4]">
          {mode} <Icon name="dropDown" size={18} />
        </button>
        <IconBtn icon="apps" label="Google apps" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setApps({ x: r.right, y: r.bottom + 4 }); }} />
        <Avatar person={doc.me} size={32} />
      </div>
      {apps && <AppsMenu pos={apps} onClose={() => setApps(null)} />}
      {viewMenu && <Menu label="View" pos={viewMenu} onClose={() => setViewMenu(null)} width={180} items={(["Day", "Week", "Month"] as const).map((m) => ({ label: m, checked: m === mode, onClick: () => g.cmd("cal.view", m) }))} />}
      {gear && <Menu label="Settings menu" pos={gear} onClose={() => setGear(null)} items={[{ label: "Settings", icon: "settings", onClick: () => g.cmd("cal.page", "settings") }, { label: "Trash", icon: "delete", onClick: () => g.cmd("toast", "Trash isn't part of this practice.") }]} />}

      {page ? (
        <SettingsPage page={page} />
      ) : (
        <div className="flex min-h-0 flex-1">
          <aside className="flex w-[256px] shrink-0 flex-col overflow-y-auto px-2 pb-4 [&>*]:shrink-0">
            <button type="button" aria-label="Create" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setCreate({ x: r.left, y: r.bottom + 4 }); }} className="mb-4 ml-1 mt-1 flex h-14 w-[136px] items-center gap-3 rounded-2xl bg-white px-4 text-[14px] font-medium shadow-[0_1px_3px_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)] hover:bg-[#f6fafe]" style={{ fontFamily: FONT }}>
              <Icon name="plus" size={26} color={BLUE} /> Create <Icon name="dropDown" size={18} />
            </button>
            <MiniMonth date={date} onPick={(d) => g.cmd("cal.go", d)} />
            <div className="mx-2 mb-3 mt-3 flex h-10 items-center gap-2 rounded bg-[#e9eef6] px-3 text-[14px] text-[#444746]"><Icon name="people" size={18} /> Search for people</div>
            <CalendarList />
          </aside>
          <main className="mb-2 mr-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white">
            {mode === "Month" ? <MonthGrid date={date} /> : <TimeGrid days={days} onSlot={(day, start, pos) => setQuick({ day, start, tab: "Event", pos })} />}
          </main>
        </div>
      )}
      {create && (
        <Menu
          label="Create"
          pos={create}
          onClose={() => setCreate(null)}
          width={220}
          items={[
            { label: "Event", icon: "calendar", onClick: () => setQuick({ day: date, start: "10:00", tab: "Event", pos: { x: 320, y: 140 } }) },
            { label: "Task", icon: "task", onClick: () => setQuick({ day: date, start: "10:00", tab: "Task", pos: { x: 320, y: 140 } }) },
            { label: "Appointment schedule", icon: "today", onClick: () => setAppt(true) },
          ]}
        />
      )}
      {quick && <QuickCreate slot={quick} onClose={() => setQuick(null)} onMore={(d) => { setQuick(null); setEditing(d); }} onAppt={() => { setQuick(null); setAppt(true); }} />}
      {openEvt && <EventCard e={openEvt} onEdit={() => { g.cmd("cal.close"); setEditing(draftFrom(doc, openEvt)); }} />}
    </div>
  );
}

function MiniMonth({ date, onPick }: { date: string; onPick: (d: string) => void }) {
  const g = useGm();
  const first = `${date.slice(0, 7)}-01`;
  const start = weekStart(first);
  const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i));
  const month = date.slice(5, 7);
  return (
    <div className="px-3 text-[12px]" aria-label="Mini calendar">
      <div className="mb-1 flex items-center">
        <span className="flex-1 pl-1 text-[14px] font-medium">{MON_LONG[Number(month) - 1]} {date.slice(0, 4)}</span>
        <IconBtn icon="chevronLeft" label="Previous month" box={28} size={18} onClick={() => onPick(addDays(first, -1))} />
        <IconBtn icon="chevronRight" label="Next month" box={28} size={18} onClick={() => onPick(addDays(first, 32))} />
      </div>
      <div className="grid grid-cols-7 text-center text-[11px] text-[#444746]">{DAY_SHORT.map((d) => <span key={d} className="py-1">{d[0]}</span>)}</div>
      <div className="grid grid-cols-7 text-center">
        {cells.map((d) => {
          const today = d === todayOf(g.doc);
          const inMonth = d.slice(5, 7) === month;
          return (
            <button key={d} type="button" aria-label={fmtLongDay(d)} onClick={() => onPick(d)} className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${today ? "bg-[#0b57d0] font-medium text-white" : d === date ? "bg-[#d3e3fd]" : "hover:bg-[#e9eef6]"} ${inMonth ? "" : "text-[#9aa0a6]"}`}>
              {Number(d.slice(8))}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CalendarList() {
  const g = useGm();
  const cals = calendarsOf(g.doc);
  const [mine, setMine] = useState(true);
  const [other, setOther] = useState(true);
  const [opts, setOpts] = useState<{ id: string; pos: MenuPos } | null>(null);
  const [add, setAdd] = useState<MenuPos | null>(null);
  const booking = Array.from(new Set((g.doc.events ?? []).filter((e) => e.kind === "appointments").map((e) => e.title)));
  const item = (id: string, name: string, color: string, off?: boolean) => (
    <div key={id} className="group flex h-8 items-center gap-3 rounded px-2 hover:bg-[#e9eef6]">
      <input type="checkbox" aria-label={name} checked={!off} onChange={(e) => g.cmd("cal.show", `${id}|${e.target.checked ? "on" : "off"}`)} className="h-[18px] w-[18px]" style={{ accentColor: color }} />
      <span className="min-w-0 flex-1 truncate text-[14px]">{name}</span>
      {id !== "tasks" && (
        <button type="button" aria-label={`Options for ${name}`} onClick={(e) => { g.onSelect({ selection: `cal:${id}` }); const r = e.currentTarget.getBoundingClientRect(); setOpts({ id, pos: { x: r.left, y: r.bottom } }); }} className="invisible rounded-full p-1 hover:bg-[#dde3ea] group-hover:visible">
          <Icon name="more" size={18} />
        </button>
      )}
    </div>
  );
  return (
    <div className="text-[14px]">
      <button type="button" onClick={() => setMine((x) => !x)} className="flex h-9 w-full items-center px-2 font-medium">
        <span className="flex-1 text-left">My calendars</span><Icon name="expand" size={20} style={{ transform: mine ? "rotate(180deg)" : undefined }} />
      </button>
      {mine && (
        <>
          {cals.filter((c) => c.mine).map((c) => item(c.id, c.name, c.color, c.off))}
          {item("tasks", "Tasks", "#1a73e8", Boolean(g.doc.flags?.tasksOff))}
        </>
      )}
      <div className="mt-2 flex h-9 items-center px-2 font-medium">
        <button type="button" onClick={() => setOther((x) => !x)} className="flex-1 text-left">Other calendars</button>
        <IconBtn icon="plus" label="Add other calendars" box={28} size={18} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setAdd({ x: r.left, y: r.bottom }); }} />
        <Icon name="expand" size={20} style={{ transform: other ? "rotate(180deg)" : undefined }} />
      </div>
      {other && cals.filter((c) => !c.mine).map((c) => item(c.id, c.name, c.color, c.off))}
      {booking.length > 0 && (
        <>
          <div className="mt-2 flex h-9 items-center px-2 font-medium">Booking pages</div>
          {booking.map((t) => (
            <div key={t} className="group flex h-8 items-center gap-3 rounded px-2 hover:bg-[#e9eef6]">
              <Icon name="today" size={18} color={BLUE} />
              <span className="min-w-0 flex-1 truncate">{t}</span>
              <button type="button" aria-label={`Copy link for ${t}`} onClick={() => g.cmd("toast", "Link copied")} className="invisible rounded px-1.5 text-[12px] font-medium text-[#0b57d0] hover:bg-[#dde3ea] group-hover:visible">Copy link</button>
            </div>
          ))}
        </>
      )}
      {opts && (
        <Menu
          label={`Options for ${calOf(g.doc, opts.id)?.name}`}
          pos={opts.pos}
          onClose={() => setOpts(null)}
          items={[
            { label: "Display this only", onClick: () => calendarsOf(g.doc).forEach((c) => g.cmd("cal.show", `${c.id}|${c.id === opts.id ? "on" : "off"}`)) },
            { label: "Hide from list", onClick: () => g.cmd("cal.show", `${opts.id}|off`) },
            { label: "Settings and sharing", onClick: () => g.cmd("cal.page", `settings:${opts.id}`) },
          ]}
        />
      )}
      {add && (
        <Menu
          label="Add other calendars"
          pos={add}
          onClose={() => setAdd(null)}
          items={[
            { label: "Subscribe to calendar", onClick: () => g.cmd("toast", "Subscribing isn't part of this practice.") },
            { label: "Create new calendar", onClick: () => g.cmd("cal.page", "newcal") },
            { label: "Browse calendars of interest", onClick: () => g.cmd("toast", "Browsing isn't part of this practice.") },
            { label: "From URL", onClick: () => g.cmd("toast", "From URL isn't part of this practice.") },
            { label: "Import", onClick: () => g.cmd("toast", "Import isn't part of this practice.") },
          ]}
        />
      )}
    </div>
  );
}

function visibleEvents(doc: GmailDoc): GmEvent[] {
  const off = new Set(calendarsOf(doc).filter((c) => c.off).map((c) => c.id));
  return (doc.events ?? []).filter((e) => (e.kind === "task" ? !doc.flags?.tasksOff : !off.has(e.calendar)));
}
function colorOf(doc: GmailDoc, e: GmEvent): string {
  if (e.kind === "task") return "#1a73e8";
  return calOf(doc, e.calendar)?.color ?? "#039be5";
}

function TimeGrid({ days, onSlot }: { days: string[]; onSlot: (day: string, start: string, pos: MenuPos) => void }) {
  const g = useGm();
  const { doc } = g;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = START_HOUR * HOUR; }, []);
  const events = visibleEvents(doc);
  const allDay = (d: string) => events.filter((e) => e.day === d && (e.allDay || !e.start));
  const timed = (d: string) => events.filter((e) => e.day === d && !e.allDay && e.start);
  const now = minutes(doc.now ?? "10:02");
  const second = doc.flags?.tz2on ? String(doc.flags.tz2 || "") : "";
  const open = (e: GmEvent) => g.cmd("cal.open", e.id);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex border-b border-[#dadce0] pr-3">
        {second && <div className="w-14 shrink-0 self-end pb-1 pr-1 text-right text-[10px] text-[#70757a]">{second.slice(1, 10).replace(":00", "")}</div>}
        <div className="w-16 shrink-0 self-end pb-1 pr-2 text-right text-[10px] text-[#70757a]">{primaryZone(doc).slice(1, 10).replace(":00", "")}</div>
        {days.map((d) => {
          const today = d === todayOf(doc);
          return (
            <div key={d} className="min-w-0 flex-1 border-l border-[#dadce0]">
              <div className="flex flex-col items-center pt-2">
                <span className={`text-[11px] font-medium ${today ? "text-[#0b57d0]" : "text-[#70757a]"}`}>{DAY_SHORT[weekday(d)].toUpperCase()}</span>
                <button type="button" aria-label={fmtLongDay(d)} onClick={() => { g.cmd("cal.go", d); g.cmd("cal.view", "Day"); }} className={`flex h-11 w-11 items-center justify-center rounded-full text-[24px] ${today ? "bg-[#0b57d0] text-white" : "text-[#3c4043] hover:bg-[#f1f3f4]"}`}>{Number(d.slice(8))}</button>
              </div>
              <div className="min-h-[24px] space-y-0.5 px-1 pb-1">
                {allDay(d).map((e) => (
                  <button key={e.id} type="button" aria-label={`${e.title}, ${e.kind === "task" ? "task, " : "all day, "}${fmtLongDay(d)}`} onClick={() => open(e)} className={`block w-full truncate rounded px-2 py-0.5 text-left text-[12px] text-white ${e.done ? "line-through opacity-60" : ""}`} style={{ background: colorOf(doc, e) }}>
                    {e.kind === "task" && "☐ "}{e.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div ref={ref} className="relative min-h-0 flex-1 overflow-y-auto">
        <div className="flex" style={{ height: 24 * HOUR }}>
          {second && (
            <div className="relative w-14 shrink-0" aria-label={`Secondary time zone: ${second}`}>
              {Array.from({ length: 24 }, (_, h) => h > 0 && <span key={h} className="absolute right-1 -translate-y-1/2 text-[10px] text-[#70757a]" style={{ top: h * HOUR }}>{fmtTime(fromMinutes(((h * 60 + tzOffset(second) - tzOffset(primaryZone(doc))) % 1440 + 1440) % 1440)).replace(":00", "")}</span>)}
            </div>
          )}
          <div className="relative w-16 shrink-0">
            {Array.from({ length: 24 }, (_, h) => h > 0 && <span key={h} className="absolute right-2 -translate-y-1/2 text-[10px] text-[#70757a]" style={{ top: h * HOUR }}>{fmtTime(`${String(h).padStart(2, "0")}:00`).replace(":00", "")}</span>)}
          </div>
          {days.map((d) => (
            <div key={d} className="relative min-w-0 flex-1 border-l border-[#dadce0]">
              {Array.from({ length: 48 }, (_, i) => {
                const t = fromMinutes(i * 30);
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${fmtLongDay(d)}, ${fmtTime(t)}`}
                    onClick={(e) => onSlot(d, t, { x: e.clientX, y: e.clientY })}
                    className={`absolute left-0 right-0 hover:bg-[#f1f3f4]/60 ${i % 2 === 0 ? "border-t border-[#dadce0]" : ""}`}
                    style={{ top: i * (HOUR / 2), height: HOUR / 2 }}
                  />
                );
              })}
              {timed(d).map((e) => {
                const sh = zoneShift(doc, e);
                const s0 = minutes(e.start!) + sh;
                const e0 = minutes(e.end ?? fromMinutes(minutes(e.start!) + 30)) + sh;
                const top = (s0 / 60) * HOUR;
                const h = Math.max(HOUR / 2.2, ((e0 - s0) / 60) * HOUR);
                const declined = e.myResponse === "No";
                const pending = e.organizer && !e.myResponse;
                const bg = colorOf(doc, e);
                return (
                  <button
                    key={e.id}
                    type="button"
                    aria-label={`${e.title}, ${fmtTime(fromMinutes(s0))} to ${fmtTime(fromMinutes(e0))}, ${fmtLongDay(d)}`}
                    onClick={() => open(e)}
                    className={`absolute left-0.5 right-2 z-10 overflow-hidden rounded px-1.5 py-0.5 text-left text-[12px] leading-4 ${e.done ? "line-through opacity-60" : ""}`}
                    style={{ top, height: h, background: e.kind === "appointments" ? `repeating-linear-gradient(135deg, ${bg}22, ${bg}22 6px, ${bg}44 6px, ${bg}44 12px)` : pending || declined ? "#fff" : bg, color: e.kind === "appointments" || pending || declined ? bg : "#fff", border: pending || declined || e.kind === "appointments" ? `1px solid ${bg}` : undefined, textDecoration: declined ? "line-through" : undefined }}
                  >
                    <span className="block truncate font-medium">{e.kind === "task" ? "☐ " : ""}{e.title}</span>
                    <span className="block truncate">{fmtTime(fromMinutes(s0))} – {fmtTime(fromMinutes(e0))}{e.location ? `, ${e.location}` : ""}</span>
                  </button>
                );
              })}
              {d === todayOf(doc) && <div className="pointer-events-none absolute left-0 right-0 z-20 h-0.5 bg-[#ea4335]" style={{ top: (now / 60) * HOUR }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MonthGrid({ date }: { date: string }) {
  const g = useGm();
  const first = `${date.slice(0, 7)}-01`;
  const start = weekStart(first);
  const cells = Array.from({ length: 35 }, (_, i) => addDays(start, i));
  const events = visibleEvents(g.doc);
  return (
    <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-5">
      {cells.map((d, i) => (
        <div key={d} className="min-h-0 overflow-hidden border-b border-l border-[#dadce0] p-1 text-[12px]">
          {i < 7 && <div className="text-center text-[11px] font-medium text-[#70757a]">{DAY_SHORT[weekday(d)].toUpperCase()}</div>}
          <div className={`mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full ${d === todayOf(g.doc) ? "bg-[#0b57d0] text-white" : ""} ${d.slice(5, 7) !== date.slice(5, 7) ? "text-[#9aa0a6]" : ""}`}>{Number(d.slice(8))}</div>
          {events.filter((e) => e.day === d).slice(0, 3).map((e) => (
            <button key={e.id} type="button" aria-label={`${e.title}, ${fmtLongDay(d)}`} onClick={() => g.cmd("cal.open", e.id)} className="block w-full truncate rounded px-1 text-left hover:bg-[#f1f3f4]">
              <span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ background: colorOf(g.doc, e) }} />
              {e.start && !e.allDay ? `${fmtTime(e.start).replace(":00", "").toLowerCase()} ` : ""}{e.title}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function EventCard({ e, onEdit }: { e: GmEvent; onEdit: () => void }) {
  const g = useGm();
  const { doc } = g;
  const cal = calOf(doc, e.calendar);
  const mine = !e.organizer || e.organizer.toLowerCase() === doc.me.email.toLowerCase();
  const guests = e.guests ?? [];
  const yes = guests.filter((x) => x.response === "Yes").length;
  const no = guests.filter((x) => x.response === "No").length;
  const maybe = guests.filter((x) => x.response === "Maybe").length;
  const awaiting = guests.length - yes - no - maybe;
  const [rsvpMenu, setRsvpMenu] = useState<MenuPos | null>(null);
  return (
    <div className="absolute inset-0 z-[140] flex items-center justify-center bg-black/10" onMouseDown={(ev) => { if (ev.target === ev.currentTarget) g.cmd("cal.close"); }}>
      <div role="dialog" aria-label={e.title} className="max-h-[90%] w-[448px] overflow-y-auto rounded-[28px] bg-[#f0f4f9] pb-4 shadow-[0_24px_38px_3px_rgba(0,0,0,.14),0_9px_46px_8px_rgba(0,0,0,.12)]" style={{ fontFamily: TEXT }}>
        <div className="flex justify-end gap-1 px-2 pt-2">
          {mine && e.kind !== "appointments" && <IconBtn icon="edit" label={e.kind === "task" ? "Edit task" : "Edit event"} onClick={onEdit} />}
          {mine && <IconBtn icon="delete" label={e.kind === "task" ? "Delete task" : "Delete event"} onClick={() => g.cmd("cal.delete")} />}
          {guests.length > 0 && <IconBtn icon="mail" label="Email guests" onClick={() => g.cmd("toast", "Email guests opens a message to everyone invited.")} />}
          <IconBtn icon="more" label="Options" onClick={() => g.cmd("toast", "Print, duplicate and other options aren't part of this practice.")} />
          <IconBtn icon="close" label="Close" onClick={() => g.cmd("cal.close")} />
        </div>
        <div className="flex gap-4 px-6">
          <span className="mt-2 h-4 w-4 shrink-0 rounded" style={{ background: colorOf(doc, e) }} />
          <div>
            <h2 className={`text-[22px] leading-7 text-[#1f1f1f] ${e.done ? "line-through" : ""}`} style={{ fontFamily: FONT }}>{e.title}</h2>
            <p className="text-[14px] text-[#444746]">{fmtLongDay(e.day)}{e.allDay || !e.start ? "" : ` · ${fmtTime(fromMinutes(minutes(e.start) + zoneShift(doc, e)))} – ${fmtTime(fromMinutes(minutes(e.end ?? e.start) + zoneShift(doc, e)))}`}</p>
            {e.repeat && <p className="text-[14px] text-[#444746]">{e.repeat}</p>}
            {e.timeZone && e.timeZone !== primaryZone(doc) && e.start && <p className="text-[13px] text-[#444746]">{fmtTime(e.start)} – {fmtTime(e.end)} {e.timeZone}</p>}
          </div>
        </div>
        {e.kind === "appointments" && (
          <p className="mt-4 px-6 text-[13px] text-[#444746]">Bookable time. To share your booking page, point to it under Booking pages on the left and select Copy link.</p>
        )}
        {e.meet && (
          <div className="mt-4 flex items-start gap-4 px-6">
            <Icon name="video" size={20} color="#00832d" />
            <div>
              <Btn onClick={() => g.cmd("meet.open", e.meet)} label="Join with Google Meet">Join with Google Meet</Btn>
              <p className="mt-1 text-[12px] text-[#444746]">meet.google.com/{e.meet}</p>
            </div>
          </div>
        )}
        {e.location && <div className="mt-4 flex gap-4 px-6 text-[14px]"><Icon name="place" size={20} /> {e.location}</div>}
        {guests.length > 0 && (
          <div className="mt-4 flex gap-4 px-6 text-[14px]">
            <Icon name="people" size={20} />
            <div className="min-w-0 flex-1">
              <div>{guests.length + (e.organizer ? 0 : 1)} guests</div>
              <div className="text-[12px] text-[#444746]">{[yes && `${yes} yes`, no && `${no} no`, maybe && `${maybe} maybe`, awaiting && `${awaiting} awaiting`].filter(Boolean).join(", ")}</div>
              <ul className="mt-2 space-y-1.5">
                <li className="flex items-center gap-2"><Avatar person={personOf(doc, e.organizer ?? doc.me.email)} size={24} /> {personOf(doc, e.organizer ?? doc.me.email).name}<span className="text-[12px] text-[#444746]">Organizer</span></li>
                {guests.filter((x) => x.email !== (e.organizer ?? doc.me.email)).map((x) => (
                  <li key={x.email} className="flex items-center gap-2">
                    <Avatar person={personOf(doc, x.email)} size={24} />
                    <span className="truncate">{x.email.toLowerCase() === doc.me.email.toLowerCase() ? `${doc.me.name} (you)` : personOf(doc, x.email).name}</span>
                    {x.optional && <span className="text-[12px] text-[#444746]">Optional</span>}
                    {x.response && x.response !== "Awaiting" && <span className="text-[12px] text-[#444746]">{x.response === "Yes" ? "Going" : x.response === "No" ? "Not going" : "Maybe"}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {e.description && <div className="mt-4 flex gap-4 px-6 text-[14px]"><Icon name="notes" size={20} /> <p className="whitespace-pre-wrap">{e.description}</p></div>}
        {(e.notifications ?? []).length > 0 && <div className="mt-4 flex gap-4 px-6 text-[14px]"><Icon name="bell" size={20} /><div>{e.notifications!.map((n) => <div key={n}>{n}</div>)}</div></div>}
        <div className="mt-4 flex gap-4 px-6 text-[14px]"><Icon name="calendar" size={20} /> {e.kind === "task" ? "Tasks · My Tasks" : cal?.name}</div>
        {e.kind === "task" && !e.done && <div className="mt-5 flex justify-end px-6"><Btn onClick={() => g.cmd("cal.taskDone")} label="Mark completed">Mark completed</Btn></div>}
        {!mine && (
          <div className="mt-5 flex items-center gap-2 border-t border-[#dadce0] px-6 pt-4 text-[14px]">
            <span className="mr-2">Going?</span>
            {(["Yes", "No", "Maybe"] as const).map((a) => (
              <button key={a} type="button" aria-label={a} aria-pressed={e.myResponse === a} onClick={() => g.cmd("cal.rsvp", a)} className={`rounded-full border px-4 py-1.5 ${e.myResponse === a ? "border-transparent bg-[#c2e7ff] font-medium" : "border-[#747775] hover:bg-[#e3e8ee]"}`}>{a}</button>
            ))}
            <IconBtn icon="dropDown" label="More options" box={32} onClick={(ev) => { const r = ev.currentTarget.getBoundingClientRect(); setRsvpMenu({ x: r.left, y: r.bottom }); }} />
            {rsvpMenu && <Menu label="More response options" pos={rsvpMenu} onClose={() => setRsvpMenu(null)} items={[{ label: "Add note", onClick: () => g.cmd("toast", "Add note isn't part of this practice.") }, { label: "Propose a new time", onClick: () => g.cmd("toast", "Propose a new time isn't part of this practice.") }]} />}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Quick create and the full event page                                */
/* ------------------------------------------------------------------ */

function QuickCreate({ slot, onClose, onMore, onAppt }: { slot: { day: string; start: string; tab: "Event" | "Task" | "Appointment schedule"; pos: MenuPos }; onClose: () => void; onMore: (d: Draft) => void; onAppt: () => void }) {
  const g = useGm();
  const { doc } = g;
  const [tab, setTab] = useState(slot.tab);
  const [d, setD] = useState<Draft>(() => draftFrom(doc, undefined, slot));
  const [taskTime, setTaskTime] = useState("");
  const [guest, setGuest] = useState("");
  const set = (p: Partial<Draft>) => setD((x) => ({ ...x, ...p }));
  const save = () => {
    if (tab === "Task") {
      const lines = [`Title: ${d.title}`, `Date: ${fmtDayYear(d.day)}`, ...(taskTime ? [`Time: ${fmtTime(taskTime)}`] : []), `List: My Tasks`, `Description: ${d.description}`];
      g.type("task:new", lines.join("\n"));
    } else g.type("event:new", serialize(doc, d));
    onClose();
  };
  const addGuest = (raw: string) => {
    const s = raw.trim();
    if (!s) return;
    const p = doc.people.find((x) => x.email.toLowerCase() === s.toLowerCase() || x.name.toLowerCase() === s.toLowerCase()) ?? doc.people.filter((x) => x.name.toLowerCase().includes(s.toLowerCase())).at(0);
    const email = p?.email ?? (/@/.test(s) ? s : "");
    if (email && !d.guests.some((x) => x.email === email)) set({ guests: [...d.guests, { email }] });
    setGuest("");
  };
  return (
    <div className="absolute inset-0 z-[140]" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label="Quick event" className="absolute left-1/2 top-16 w-[448px] -translate-x-1/2 rounded-[28px] bg-[#f0f4f9] pb-4 shadow-[0_24px_38px_3px_rgba(0,0,0,.14),0_9px_46px_8px_rgba(0,0,0,.12)]" style={{ fontFamily: TEXT }}>
        <div className="flex justify-end px-2 pt-2"><IconBtn icon="close" label="Close" onClick={onClose} /></div>
        <div className="px-6">
          <input autoFocus aria-label="Add title and time" placeholder="Add title and time" value={d.title} onChange={(e) => set({ title: e.target.value })} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") save(); }} className="h-10 w-full border-b border-[#747775] bg-transparent text-[22px] outline-none focus:border-b-2 focus:border-[#0b57d0]" />
          <div role="tablist" aria-label="Item type" className="mt-3 flex gap-2">
            {(["Event", "Task", "Appointment schedule"] as const).map((t) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => (t === "Appointment schedule" ? onAppt() : setTab(t))} className={`rounded px-3 py-1.5 text-[14px] ${tab === t ? "bg-[#c2e7ff] font-medium text-[#001d35]" : "hover:bg-[#e3e8ee]"}`}>{t}</button>
            ))}
          </div>
          <div className="mt-4 space-y-3 text-[14px]">
            <div className="flex items-center gap-4">
              <Icon name="clock" size={20} />
              <input type="date" aria-label="Date" value={d.day} onChange={(e) => set({ day: e.target.value })} className="h-8 rounded bg-white px-2" />
              {tab === "Event" ? (
                <>
                  <select aria-label="Start time" value={d.start} onChange={(e) => set({ start: e.target.value, end: fromMinutes(minutes(e.target.value) + (minutes(d.end) - minutes(d.start))) })} className="h-8 rounded bg-white px-1">{TIMES.map((t) => <option key={t} value={t}>{fmtTime(t)}</option>)}</select>
                  –
                  <select aria-label="End time" value={d.end} onChange={(e) => set({ end: e.target.value })} className="h-8 rounded bg-white px-1">{TIMES.map((t) => <option key={t} value={t}>{fmtTime(t)}</option>)}</select>
                </>
              ) : (
                <select aria-label="Task time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} className="h-8 rounded bg-white px-1"><option value="">Add time</option>{TIMES.map((t) => <option key={t} value={t}>{fmtTime(t)}</option>)}</select>
              )}
            </div>
            {tab === "Event" ? (
              <>
                <div className="flex items-start gap-4">
                  <Icon name="people" size={20} />
                  <div className="flex-1">
                    <input aria-label="Add guests" placeholder="Add guests" value={guest} onChange={(e) => setGuest(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") addGuest(guest); }} onBlur={() => addGuest(guest)} className="h-8 w-full rounded bg-white px-2 outline-none" />
                    {d.guests.map((x) => <div key={x.email} className="mt-1 flex items-center gap-2 text-[13px]"><Avatar person={personOf(doc, x.email)} size={20} />{personOf(doc, x.email).name}</div>)}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="video" size={20} color="#00832d" />
                  {d.meet ? <span className="text-[14px]">Google Meet video conferencing added</span> : <Btn kind="filled" small onClick={() => set({ meet: true })} label="Add Google Meet video conferencing">Add Google Meet video conferencing</Btn>}
                </div>
                <div className="flex items-center gap-4"><Icon name="place" size={20} /><input aria-label="Add location" placeholder="Add location" value={d.location} onChange={(e) => set({ location: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-8 flex-1 rounded bg-white px-2 outline-none" /></div>
              </>
            ) : null}
            <div className="flex items-start gap-4"><Icon name="notes" size={20} /><textarea aria-label={tab === "Task" ? "Add description" : "Add description or a Google Drive attachment"} placeholder={tab === "Task" ? "Add description" : "Add description or a Google Drive attachment"} value={d.description} onChange={(e) => set({ description: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-14 flex-1 resize-none rounded bg-white p-2 outline-none" /></div>
            <div className="flex items-center gap-4"><Icon name="calendar" size={20} />{tab === "Task" ? "My Tasks" : calOf(doc, d.calendar)?.name}</div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            {tab === "Event" && <Btn kind="text" onClick={() => onMore({ ...d, guests: guest.trim() ? d.guests : d.guests })} label="More options">More options</Btn>}
            <Btn onClick={save} label="Save">Save</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventPage({ draft, onClose }: { draft: Draft; onClose: () => void }) {
  const g = useGm();
  const { doc } = g;
  const [d, setD] = useState<Draft>(draft);
  const [tab, setTab] = useState<"Event details" | "Find a time">("Event details");
  const [guest, setGuest] = useState("");
  const [tz, setTz] = useState(false);
  const [ask, setAsk] = useState(false);
  const set = (p: Partial<Draft>) => setD((x) => ({ ...x, ...p }));
  const hits = guest.trim() ? doc.people.filter((p) => !d.guests.some((x) => x.email === p.email) && (p.name.toLowerCase().includes(guest.toLowerCase()) || p.email.toLowerCase().includes(guest.toLowerCase()))).slice(0, 5) : [];
  const addGuest = (email: string) => { if (!d.guests.some((x) => x.email === email)) set({ guests: [...d.guests, { email }] }); setGuest(""); };
  const commit = (inv?: "Send" | "Don't send") => { g.type(d.id ? `event:${d.id}` : "event:new", serialize(doc, d, inv)); onClose(); };
  const save = () => (d.guests.length ? setAsk(true) : commit());
  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: TEXT }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <IconBtn icon="close" label="Close" onClick={onClose} />
        <input aria-label="Title" placeholder="Add title" value={d.title} onChange={(e) => set({ title: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-12 flex-1 rounded bg-[#f0f4f9] px-3 text-[22px] outline-none focus:border-b-2 focus:border-[#0b57d0]" />
        <Btn onClick={save} label="Save">Save</Btn>
      </div>
      <div className="flex flex-wrap items-center gap-2 px-[72px] text-[14px]">
        <input type="date" aria-label="Start date" value={d.day} onChange={(e) => set({ day: e.target.value })} className="h-9 rounded bg-[#f0f4f9] px-2" />
        {!d.allDay && (
          <>
            <select aria-label="Start time" value={d.start} onChange={(e) => set({ start: e.target.value, end: fromMinutes(minutes(e.target.value) + (minutes(d.end) - minutes(d.start))) })} className="h-9 rounded bg-[#f0f4f9] px-1">{TIMES.map((t) => <option key={t} value={t}>{fmtTime(t)}</option>)}</select>
            to
            <select aria-label="End time" value={d.end} onChange={(e) => set({ end: e.target.value })} className="h-9 rounded bg-[#f0f4f9] px-1">{TIMES.map((t) => <option key={t} value={t}>{fmtTime(t)}</option>)}</select>
            <button type="button" onClick={() => setTz(true)} className="rounded px-2 py-1 text-[14px] font-medium text-[#0b57d0] hover:bg-[#0b57d0]/10">Time zone</button>
          </>
        )}
      </div>
      <div className="flex items-center gap-6 px-[72px] py-2 text-[14px]">
        <Check label="All day" checked={d.allDay} onChange={(v) => set({ allDay: v })} />
        <Select label="Repeat" hideLabel value={d.repeat} options={REPEATS(d.day)} onChange={(v) => set({ repeat: v })} className="w-[300px]" />
        {d.timeZone !== primaryZone(doc) && <span className="text-[13px] text-[#444746]">{d.timeZone}</span>}
      </div>
      <div className="flex min-h-0 flex-1 gap-6 px-6 pb-4">
        <div className="min-w-0 flex-1">
          <div role="tablist" aria-label="Event page" className="mb-3 ml-12 flex border-b border-[#dadce0]">
            {(["Event details", "Find a time"] as const).map((t) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-[14px] font-medium ${tab === t ? "border-b-[3px] border-[#0b57d0] text-[#0b57d0]" : "text-[#444746]"}`}>{t}</button>
            ))}
          </div>
          {tab === "Event details" ? (
            <div className="space-y-4 overflow-y-auto text-[14px]">
              <div className="flex items-center gap-6">
                <Icon name="video" size={20} color="#00832d" />
                {d.meet ? (
                  <span className="flex items-center gap-3">Join with Google Meet <button type="button" aria-label="Remove conference" onClick={() => set({ meet: false })} className="text-[#5f6368]">✕</button></span>
                ) : (
                  <Btn small onClick={() => set({ meet: true })} label="Add Google Meet video conferencing">Add Google Meet video conferencing</Btn>
                )}
              </div>
              <div className="flex items-center gap-6"><Icon name="place" size={20} /><input aria-label="Add location" placeholder="Add location" value={d.location} onChange={(e) => set({ location: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-10 flex-1 rounded bg-[#f0f4f9] px-3 outline-none" /></div>
              <div className="flex items-start gap-6">
                <Icon name="bell" size={20} />
                <div className="space-y-2">
                  {d.notifications.map((n, i) => {
                    const email = n.startsWith("Email:");
                    const when = n.replace(/^Email:\s*/, "");
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <select aria-label={`Notification ${i + 1} type`} value={email ? "Email" : "Notification"} onChange={(e) => set({ notifications: d.notifications.map((x, j) => (j === i ? (e.target.value === "Email" ? `Email: ${when}` : when) : x)) })} className="h-9 rounded bg-[#f0f4f9] px-1"><option>Notification</option><option>Email</option></select>
                        <select aria-label={`Notification ${i + 1} time`} value={when} onChange={(e) => set({ notifications: d.notifications.map((x, j) => (j === i ? (email ? `Email: ${e.target.value}` : e.target.value) : x)) })} className="h-9 rounded bg-[#f0f4f9] px-1">{NOTIFY.map((t) => <option key={t}>{t}</option>)}</select>
                        <button type="button" aria-label={`Remove notification ${i + 1}`} onClick={() => set({ notifications: d.notifications.filter((_, j) => j !== i) })} className="text-[#5f6368]">✕</button>
                      </div>
                    );
                  })}
                  <button type="button" onClick={() => set({ notifications: [...d.notifications, "10 minutes before"] })} className="text-[14px] font-medium text-[#0b57d0]">Add notification</button>
                </div>
              </div>
              <div className="flex items-center gap-6"><Icon name="calendar" size={20} /><Select label="Calendar" hideLabel value={calOf(doc, d.calendar)?.name ?? ""} options={calendarsOf(doc).filter((c) => c.mine).map((c) => c.name)} onChange={(v) => set({ calendar: calendarsOf(doc).find((c) => c.name === v)?.id ?? d.calendar })} className="w-[260px]" /></div>
              <div className="flex items-start gap-6"><Icon name="notes" size={20} /><textarea aria-label="Description" placeholder="Add description" value={d.description} onChange={(e) => set({ description: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="h-40 flex-1 rounded bg-[#f0f4f9] p-3 outline-none" /></div>
            </div>
          ) : (
            <FindATime d={d} onPick={(start) => set({ start, end: fromMinutes(minutes(start) + (minutes(d.end) - minutes(d.start))) })} />
          )}
        </div>
        <aside className="w-[300px] shrink-0 text-[14px]" aria-label="Guests">
          <div role="tablist" className="mb-3 border-b border-[#dadce0]"><span className="inline-block border-b-[3px] border-[#0b57d0] px-3 py-2.5 font-medium text-[#0b57d0]">Guests</span></div>
          <div className="relative">
            <input aria-label="Add guests" placeholder="Add guests" value={guest} onChange={(e) => setGuest(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { if (hits[0]) addGuest(hits[0].email); else if (/@/.test(guest)) addGuest(guest.trim()); } }} className="h-10 w-full rounded bg-[#f0f4f9] px-3 outline-none" />
            {hits.length > 0 && (
              <div role="listbox" aria-label="Suggested guests" className="absolute left-0 right-0 top-full z-10 rounded bg-white py-1 shadow-lg">
                {hits.map((p) => (
                  <button key={p.email} type="button" role="option" aria-selected={false} aria-label={`${p.name} ${p.email}`} onMouseDown={(e) => { e.preventDefault(); addGuest(p.email); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f1f3f4]"><Avatar person={p} size={24} /><span><span className="block">{p.name}</span><span className="block text-[12px] text-[#5f6368]">{p.email}</span></span></button>
                ))}
              </div>
            )}
          </div>
          <ul className="mt-3 space-y-2">
            {d.guests.length > 0 && <li className="flex items-center gap-2"><Avatar person={doc.me} size={28} /> {doc.me.name}<span className="text-[12px] text-[#444746]">Organizer</span></li>}
            {d.guests.map((x) => (
              <li key={x.email} className="group flex items-center gap-2">
                <Avatar person={personOf(doc, x.email)} size={28} />
                <span className="min-w-0 flex-1 truncate">{personOf(doc, x.email).name}{x.optional && <span className="block text-[12px] text-[#444746]">Optional</span>}</span>
                <button type="button" aria-label={x.optional ? `Mark ${personOf(doc, x.email).name} required` : `Mark ${personOf(doc, x.email).name} optional`} onClick={() => set({ guests: d.guests.map((y) => (y.email === x.email ? { ...y, optional: !y.optional } : y)) })} className="rounded p-1 text-[#5f6368] hover:bg-[#f1f3f4]" title={x.optional ? "Mark required" : "Mark optional"}><Icon name="person" size={16} /></button>
                <button type="button" aria-label={`Remove ${personOf(doc, x.email).name}`} onClick={() => set({ guests: d.guests.filter((y) => y.email !== x.email) })} className="rounded p-1 text-[#5f6368] hover:bg-[#f1f3f4]">✕</button>
              </li>
            ))}
          </ul>
          {d.guests.length > 0 && (
            <div className="mt-4">
              <div className="mb-1 font-medium">Guest permissions</div>
              {["Modify event", "Invite others", "See guest list"].map((p) => <Check key={p} label={p} checked={d.perms.includes(p)} onChange={(v) => set({ perms: v ? [...d.perms, p] : d.perms.filter((x) => x !== p) })} className="py-1" />)}
            </div>
          )}
        </aside>
      </div>
      {tz && (
        <Modal title="Event time zone" onClose={() => setTz(false)} width={460} footer={<><Btn kind="text" onClick={() => setTz(false)}>Cancel</Btn><Btn onClick={() => setTz(false)}>OK</Btn></>}>
          <Select label="Event time zone" value={d.timeZone} options={TIME_ZONES} onChange={(v) => set({ timeZone: v })} />
          <p className="mt-3 text-[12px] text-[#5f6368]">Guests see the event in their own time zone.</p>
        </Modal>
      )}
      {ask && (
        <Modal title="Would you like to send invitation emails to Google Calendar guests?" onClose={() => setAsk(false)} width={480} footer={<><Btn kind="text" onClick={() => setAsk(false)}>Back to editing</Btn><Btn kind="text" onClick={() => { setAsk(false); commit("Don't send"); }} label="Don't send">Don't send</Btn><Btn onClick={() => { setAsk(false); commit("Send"); }} label="Send">Send</Btn></>}>
          <p className="text-[14px]">Guests get an email with the event details and can answer Yes, No or Maybe.</p>
        </Modal>
      )}
    </div>
  );
}

function FindATime({ d, onPick }: { d: Draft; onPick: (start: string) => void }) {
  const g = useGm();
  const { doc } = g;
  const people = [doc.me.email, ...d.guests.map((x) => x.email)];
  const busyFor = (email: string) => {
    if (email === doc.me.email) return (doc.events ?? []).filter((e) => e.day === d.day && e.start && !e.allDay && e.kind !== "task" && e.id !== d.id && e.myResponse !== "No").map((e) => ({ start: e.start!, end: e.end ?? e.start!, title: e.title }));
    return (doc.busy ?? []).filter((b) => b.email.toLowerCase() === email.toLowerCase() && b.day === d.day).map((b) => ({ start: b.start, end: b.end, title: b.title ?? "Busy" }));
  };
  const H = 40;
  const from = 8, to = 18;
  return (
    <div className="text-[13px]" aria-label="Find a time">
      <div className="mb-2 ml-12 text-[14px] font-medium">{fmtLongDay(d.day)}</div>
      <div className="flex overflow-x-auto">
        <div className="relative w-12 shrink-0" style={{ height: (to - from) * H + 28 }}>
          {Array.from({ length: to - from }, (_, i) => <span key={i} className="absolute right-1 text-[10px] text-[#70757a]" style={{ top: 28 + i * H - 6 }}>{fmtTime(`${String(from + i).padStart(2, "0")}:00`).replace(":00", "")}</span>)}
        </div>
        {people.map((p) => (
          <div key={p} className="min-w-[110px] flex-1 border-l border-[#dadce0]">
            <div className="flex h-7 items-center justify-center gap-1 truncate px-1 text-[12px] font-medium"><Avatar person={personOf(doc, p)} size={18} />{p === doc.me.email ? "You" : personOf(doc, p).name.split(" ")[0]}</div>
            <div className="relative" style={{ height: (to - from) * H }}>
              {Array.from({ length: (to - from) * 2 }, (_, i) => {
                const t = fromMinutes(from * 60 + i * 30);
                return <button key={i} type="button" aria-label={`Pick ${fmtTime(t)} for ${p === doc.me.email ? "you" : personOf(doc, p).name}`} onClick={() => onPick(t)} className={`absolute left-0 right-0 hover:bg-[#e8f0fe] ${i % 2 === 0 ? "border-t border-[#eee]" : ""}`} style={{ top: i * (H / 2), height: H / 2 }} />;
              })}
              {busyFor(p).map((b, i) => (
                <div key={i} className="pointer-events-none absolute left-1 right-1 rounded bg-[#5f6368]/80 px-1 text-[11px] text-white" style={{ top: ((minutes(b.start) - from * 60) / 60) * H, height: Math.max(14, ((minutes(b.end) - minutes(b.start)) / 60) * H) }}>{p === doc.me.email ? b.title : "Busy"}</div>
              ))}
              <div className="pointer-events-none absolute left-0 right-0 border-2 border-[#0b57d0] bg-[#0b57d0]/10" style={{ top: ((minutes(d.start) - from * 60) / 60) * H, height: ((minutes(d.end) - minutes(d.start)) / 60) * H }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[12px] text-[#5f6368]">Click a free time to move the event there. Gray blocks are busy.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Appointment schedule                                                */
/* ------------------------------------------------------------------ */

const DURATIONS = ["15 minutes", "30 minutes", "45 minutes", "1 hour", "1.5 hours", "2 hours"];

function AppointmentPage({ onClose }: { onClose: () => void }) {
  const g = useGm();
  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30 minutes");
  const [days, setDays] = useState<Record<string, { on: boolean; start: string; end: string }>>(() => Object.fromEntries(DAY_SHORT.map((d, i) => [d, { on: i >= 1 && i <= 5, start: "09:00", end: "17:00" }])));
  const [windowDays, setWindowDays] = useState("60 days in advance");
  const [buffer, setBuffer] = useState("No buffer time");
  const [location, setLocation] = useState("Google Meet video conferencing");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState(false);
  const [verify, setVerify] = useState(false);
  const save = () => {
    const lines = [`Title: ${title}`, `Duration: ${duration}`];
    DAY_SHORT.forEach((d) => { if (days[d].on) lines.push(`Availability: ${d} ${fmtTime(days[d].start)} - ${fmtTime(days[d].end)}`); });
    lines.push(`Scheduling window: ${windowDays}`, `Buffer time: ${buffer}`, `Location: ${location}`, `Booking form: First name, Last name, Email address${phone ? ", Phone number" : ""}`, `Require email verification: ${verify ? "yes" : "no"}`, `Description: ${desc}`);
    g.type("appointments:new", lines.join("\n"));
    onClose();
  };
  return (
    <div className="flex h-full bg-white" style={{ fontFamily: TEXT }}>
      <aside className="flex w-[420px] shrink-0 flex-col border-r border-[#dadce0]" aria-label="Bookable appointment schedule">
        <div className="flex items-center gap-2 px-4 py-3">
          <IconBtn icon="close" label="Close" onClick={onClose} />
          <h2 className="flex-1 text-[18px]" style={{ fontFamily: FONT }}>Bookable appointment schedule</h2>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 pb-6 text-[14px]">
          {step === 1 ? (
            <>
              <input aria-label="Add title" placeholder="Add title" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-11 w-full border-b border-[#747775] text-[20px] outline-none focus:border-b-2 focus:border-[#0b57d0]" />
              <div><div className="mb-1 font-medium">Appointment duration</div><Select label="Appointment duration" hideLabel value={duration} options={DURATIONS} onChange={setDuration} className="w-[200px]" /></div>
              <div>
                <div className="mb-1 font-medium">General availability</div>
                <p className="mb-2 text-[12px] text-[#5f6368]">Set when you're regularly available for appointments. Repeat weekly.</p>
                {DAY_SHORT.map((d) => (
                  <div key={d} className="flex h-10 items-center gap-2">
                    <Check label={d} checked={days[d].on} onChange={(v) => setDays((s) => ({ ...s, [d]: { ...s[d], on: v } }))} className="w-16" />
                    {days[d].on ? (
                      <>
                        <select aria-label={`${d} start`} value={days[d].start} onChange={(e) => setDays((s) => ({ ...s, [d]: { ...s[d], start: e.target.value } }))} className="h-8 rounded bg-[#f0f4f9] px-1">{TIMES.map((t) => <option key={t} value={t}>{fmtTime(t)}</option>)}</select>
                        –
                        <select aria-label={`${d} end`} value={days[d].end} onChange={(e) => setDays((s) => ({ ...s, [d]: { ...s[d], end: e.target.value } }))} className="h-8 rounded bg-[#f0f4f9] px-1">{TIMES.map((t) => <option key={t} value={t}>{fmtTime(t)}</option>)}</select>
                      </>
                    ) : (
                      <span className="text-[#5f6368]">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
              <div><div className="mb-1 font-medium">Scheduling window</div><Select label="Scheduling window" hideLabel value={windowDays} options={["Available now", "30 days in advance", "60 days in advance", "90 days in advance"]} onChange={setWindowDays} className="w-[240px]" /></div>
              <div><div className="mb-1 font-medium">Booked appointment settings</div><Select label="Buffer time" value={buffer} options={["No buffer time", "15 minutes", "30 minutes"]} onChange={setBuffer} className="w-[240px]" /></div>
              <div className="flex justify-end"><Btn onClick={() => setStep(2)} disabled={!title.trim()} label="Next">Next</Btn></div>
            </>
          ) : (
            <>
              <div><div className="mb-1 font-medium">Location and conferencing</div><Select label="Location and conferencing" hideLabel value={location} options={["Google Meet video conferencing", "In-person meeting", "Phone call", "None"]} onChange={setLocation} className="w-[300px]" /></div>
              <div><div className="mb-1 font-medium">Description</div><textarea aria-label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-24 w-full rounded bg-[#f0f4f9] p-2 outline-none" /></div>
              <div>
                <div className="mb-1 font-medium">Booking form</div>
                <p className="text-[13px]">First name · Last name · Email address</p>
                <Check label="Phone number" checked={phone} onChange={setPhone} className="mt-2" />
                <Check label="Require email verification" checked={verify} onChange={setVerify} className="mt-2" />
              </div>
              <div className="flex justify-between"><Btn kind="text" onClick={() => setStep(1)}>Back</Btn><Btn onClick={save} label="Save">Save</Btn></div>
            </>
          )}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center p-6 text-center text-[14px] text-[#444746]">
        <Icon name="today" size={48} color={BLUE} />
        <p className="mt-3 max-w-[360px]">Your bookable times show on your calendar. After you save, the schedule appears under Booking pages on the left, where you can copy its link to share.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Settings pages                                                      */
/* ------------------------------------------------------------------ */

function SettingsPage({ page }: { page: string }) {
  const g = useGm();
  const { doc } = g;
  const cals = calendarsOf(doc).filter((c) => c.mine);
  const calId = page.startsWith("settings:") ? page.slice(9) : null;
  return (
    <div className="flex min-h-0 flex-1 bg-white">
      <aside className="w-[260px] shrink-0 overflow-y-auto py-2 text-[14px]">
        <div className="flex items-center gap-2 px-3 pb-2">
          <IconBtn icon="back" label="Back to calendar" onClick={() => g.cmd("cal.page", "close")} />
          <h2 className="text-[22px]" style={{ fontFamily: FONT }}>Settings</h2>
        </div>
        <button type="button" onClick={() => g.cmd("cal.page", "settings")} className={`block w-full rounded-r-full py-2 pl-6 text-left ${page === "settings" ? "bg-[#d3e3fd] font-medium" : "hover:bg-[#f1f3f4]"}`}>General</button>
        <div className="mt-3 pl-6 font-medium">Settings for my calendars</div>
        {cals.map((c) => (
          <button key={c.id} type="button" onClick={() => g.cmd("cal.page", `settings:${c.id}`)} className={`flex w-full items-center gap-2 rounded-r-full py-2 pl-6 text-left ${calId === c.id ? "bg-[#d3e3fd] font-medium" : "hover:bg-[#f1f3f4]"}`}><span className="h-3 w-3 rounded-full" style={{ background: c.color }} />{c.name}</button>
        ))}
        <div className="mt-3 pl-6 font-medium">Add calendar</div>
        <button type="button" onClick={() => g.cmd("cal.page", "newcal")} className={`block w-full rounded-r-full py-2 pl-6 text-left ${page === "newcal" ? "bg-[#d3e3fd] font-medium" : "hover:bg-[#f1f3f4]"}`}>Create new calendar</button>
      </aside>
      <div className="min-w-0 flex-1 overflow-y-auto px-8 py-4 text-[14px]">
        {page === "settings" ? <GeneralCalSettings /> : page === "newcal" ? <NewCalendar /> : calId ? <CalendarSettings id={calId} /> : null}
      </div>
    </div>
  );
}

function GeneralCalSettings() {
  const g = useGm();
  const f = g.doc.flags ?? {};
  const primary = String(f.tz || TIME_ZONES[0]);
  const second = String(f.tz2 || TIME_ZONES[1]);
  const [show, setShow] = useState(Boolean(f.tz2on));
  return (
    <div className="max-w-[680px]">
      <section className="mb-6 rounded-lg border border-[#dadce0] p-5">
        <h3 className="mb-4 text-[16px] font-medium" style={{ fontFamily: FONT }}>Time zone</h3>
        <Select label="Primary time zone" value={primary} options={TIME_ZONES} onChange={(v) => g.type("settings:timezone", `Primary time zone: ${v}`)} className="mb-4 w-[420px]" />
        <Check label="Show additional time zones" checked={show} onChange={(v) => { setShow(v); g.type("settings:timezone", `Show additional time zones: ${v ? "on" : "off"}`); }} />
        {show && <Select label="Secondary time zone" value={second} options={TIME_ZONES} onChange={(v) => g.type("settings:timezone", `Secondary time zone: ${v}`)} className="ml-7 mt-3 w-[420px]" />}
        <p className="mt-3 text-[12px] text-[#5f6368]">Changes save automatically.</p>
      </section>
      <section className="rounded-lg border border-[#dadce0] p-5 text-[#5f6368]">
        <h3 className="mb-2 text-[16px] font-medium text-[#1f1f1f]" style={{ fontFamily: FONT }}>Event settings</h3>
        Default duration: 60 minutes
      </section>
    </div>
  );
}

function CalendarSettings({ id }: { id: string }) {
  const g = useGm();
  const c = calOf(g.doc, id);
  const [add, setAdd] = useState(false);
  const [pub, setPub] = useState(false);
  if (!c) return null;
  return (
    <div className="max-w-[680px] space-y-6">
      <section className="rounded-lg border border-[#dadce0] p-5">
        <h3 className="mb-3 text-[16px] font-medium" style={{ fontFamily: FONT }}>Calendar settings</h3>
        <div className="mb-1 text-[12px] text-[#444746]">Name</div>
        <div className="mb-3">{c.name}</div>
        {c.description && (<><div className="mb-1 text-[12px] text-[#444746]">Description</div><div>{c.description}</div></>)}
      </section>
      <section className="rounded-lg border border-[#dadce0] p-5">
        <h3 className="mb-3 text-[16px] font-medium" style={{ fontFamily: FONT }}>Access permissions for events</h3>
        <Check label="Make available to public" checked={Boolean(c.public)} onChange={(v) => { if (v) setPub(true); else g.type(`calpublic:${id}`, "Make available to public: off"); }} />
      </section>
      <section className="rounded-lg border border-[#dadce0] p-5" aria-label="Shared with">
        <h3 className="mb-3 text-[16px] font-medium" style={{ fontFamily: FONT }}>Shared with</h3>
        <ul className="mb-3 space-y-2">
          <li className="flex items-center gap-3"><Avatar person={g.doc.me} size={28} /><span className="flex-1">{g.doc.me.name}</span><span className="text-[13px] text-[#444746]">Make changes and manage sharing</span></li>
          {(c.shared ?? []).map((s) => (
            <li key={s.email} className="flex items-center gap-3"><Avatar person={personOf(g.doc, s.email)} size={28} /><span className="flex-1">{personOf(g.doc, s.email).name}<span className="block text-[12px] text-[#5f6368]">{s.email}</span></span><span className="text-[13px] text-[#444746]">{s.permission}</span></li>
          ))}
        </ul>
        <Btn kind="outlined" small onClick={() => setAdd(true)} label="Add people and groups"><Icon name="personAdd" size={16} color={BLUE} /> Add people and groups</Btn>
      </section>
      {add && <ShareCalendar id={id} onClose={() => setAdd(false)} />}
      {pub && (
        <Modal title="Warning" onClose={() => setPub(false)} width={460} footer={<><Btn kind="text" onClick={() => setPub(false)}>Cancel</Btn><Btn onClick={() => { setPub(false); g.type(`calpublic:${id}`, "Make available to public: on"); }}>OK</Btn></>}>
          <p>Making your calendar public will make all events visible to the world, including via Google search. Are you sure?</p>
        </Modal>
      )}
    </div>
  );
}

function ShareCalendar({ id, onClose }: { id: string; onClose: () => void }) {
  const g = useGm();
  const [email, setEmail] = useState("");
  const [perm, setPerm] = useState(PERMISSIONS[1]);
  const hits = email.trim() && !email.includes("@") ? g.doc.people.filter((p) => p.name.toLowerCase().includes(email.toLowerCase())).slice(0, 4) : [];
  const resolved = g.doc.people.find((p) => p.email.toLowerCase() === email.trim().toLowerCase())?.email ?? (email.includes("@") ? email.trim() : "");
  return (
    <Modal title="Share with specific people or groups" onClose={onClose} width={520} footer={<><Btn kind="text" onClick={onClose}>Cancel</Btn><Btn disabled={!resolved} onClick={() => { onClose(); g.type(`calshare:${id}`, `Share with: ${resolved}\nPermission: ${perm}`); }} label="Send">Send</Btn></>}>
      <div className="relative">
        <input aria-label="Add email or name" placeholder="Add email or name" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && hits[0]) setEmail(hits[0].email); }} className="mb-4 h-11 w-full rounded border border-[#747775] px-3 outline-none focus:border-2 focus:border-[#0b57d0]" />
        {hits.length > 0 && (
          <div role="listbox" aria-label="Suggestions" className="absolute left-0 right-0 top-11 z-10 rounded bg-white py-1 shadow-lg">
            {hits.map((p) => <button key={p.email} type="button" role="option" aria-selected={false} aria-label={`${p.name} ${p.email}`} onMouseDown={(e) => { e.preventDefault(); setEmail(p.email); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-[#f1f3f4]"><Avatar person={p} size={24} />{p.name} <span className="text-[12px] text-[#5f6368]">{p.email}</span></button>)}
          </div>
        )}
      </div>
      <Select label="Permissions" value={perm} options={PERMISSIONS} onChange={setPerm} />
    </Modal>
  );
}

function NewCalendar() {
  const g = useGm();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className="max-w-[560px]">
      <h3 className="mb-4 text-[20px]" style={{ fontFamily: FONT }}>Create new calendar</h3>
      <input aria-label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="mb-4 h-11 w-full rounded bg-[#f0f4f9] px-3 outline-none focus:border-b-2 focus:border-[#0b57d0]" />
      <textarea aria-label="Description" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="mb-4 h-24 w-full rounded bg-[#f0f4f9] p-3 outline-none" />
      <Select label="Time zone" value={TIME_ZONES[0]} options={TIME_ZONES} onChange={() => undefined} className="mb-6" />
      <Btn disabled={!name.trim()} onClick={() => g.type("newcal", `Name: ${name.trim()}\nDescription: ${desc.trim()}`)} label="Create calendar">Create calendar</Btn>
    </div>
  );
}

export const _calendarInternals = { DAY_LONG };
