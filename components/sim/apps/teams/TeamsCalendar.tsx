"use client";

import { useMemo, useState } from "react";
import type { TeamsEvent } from "./types";
import { TIcon } from "./icons";
import { addDays, allChannels, DEFAULT_TODAY, findEvent, fmtTime, isoToMDY, longDate, mondayOf, parseTime, personName, serializeForm, shortDay } from "./model";
import { Avatar, IconBtn, PersonAvatar, PrimaryBtn, SecondaryBtn, inputCls, useAccepted, useOutsideClose, useTeams } from "./TeamsShared";

const HOUR_H = 48;
const pickCls = "w-auto rounded-[4px] border border-[#d1d1d1] border-b-[#616161] bg-white px-2.5 py-1.5 text-[14px] text-[#242424] outline-none focus:border-b-2 focus:border-b-[#5b5fc7]";
const START_H = 8;
const END_H = 18;

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

function layoutDay(events: TeamsEvent[]) {
  const sorted = [...events].sort((a, b) => parseTime(a.start) - parseTime(b.start));
  const cols: { ev: TeamsEvent; col: number; cols: number }[] = [];
  let group: { ev: TeamsEvent; col: number }[] = [];
  let groupEnd = -1;
  const flush = () => {
    const n = Math.max(1, ...group.map((g) => g.col + 1));
    for (const g of group) cols.push({ ...g, cols: n });
    group = [];
  };
  for (const ev of sorted) {
    const s = parseTime(ev.start);
    if (s >= groupEnd && group.length) flush();
    const used = new Set(group.filter((g) => parseTime(g.ev.end) > s).map((g) => g.col));
    let c = 0;
    while (used.has(c)) c++;
    group.push({ ev, col: c });
    groupEnd = Math.max(groupEnd, parseTime(ev.end));
  }
  if (group.length) flush();
  return cols;
}

export function CalendarView() {
  const { doc, go, cmd } = useTeams();
  const today = doc.today ?? DEFAULT_TODAY;
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState<{ id: string; x: number; y: number } | null>(null);
  const monday = addDays(mondayOf(today), offset * 7);
  const days = [0, 1, 2, 3, 4].map((i) => addDays(monday, i));
  const month = new Date(`${monday}T12:00:00Z`).toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  const nowMin = parseTime(doc.now ?? "10:02 AM");

  return (
    <div className="relative flex min-w-0 flex-1 flex-col bg-white">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-[#e0e0e0] px-5">
        <TIcon name="calendar" size={20} className="text-[#5b5fc7]" />
        <h1 className="text-[18px] font-bold">Calendar</h1>
        <div className="flex-1" />
        <button type="button" aria-label="Meet now" onClick={() => cmd("view:calendar", "calendar.meetNow")} className="flex items-center gap-1.5 rounded-[4px] border border-[#d1d1d1] px-3 py-1 text-[13px] font-semibold hover:bg-[#f5f5f5]">
          <TIcon name="video" size={16} /> Meet now
        </button>
        <button type="button" aria-label="New meeting" onClick={() => go({ overlay: "schedule", selection: "schedule" })} className="flex items-center gap-1.5 rounded-[4px] bg-[#5b5fc7] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-[#4f52b2]">
          <TIcon name="plus" size={16} /> New meeting
        </button>
      </div>
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-[#e0e0e0] px-5 text-[14px]">
        <button type="button" onClick={() => setOffset(0)} className="flex items-center gap-1 rounded-[4px] border border-[#d1d1d1] px-2.5 py-0.5 text-[13px] hover:bg-[#f5f5f5]">
          <TIcon name="calendar" size={14} /> Today
        </button>
        <IconBtn icon="chevronLeft" label="Previous week" size={16} onClick={() => setOffset((o) => o - 1)} />
        <IconBtn icon="chevronRight" label="Next week" size={16} onClick={() => setOffset((o) => o + 1)} />
        <span className="font-semibold">{month}</span>
        <div className="flex-1" />
        <span className="flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-[13px] text-[#424242]">
          <TIcon name="view" size={14} /> Work week <TIcon name="chevronDown" size={12} />
        </span>
      </div>
      <div className="flex shrink-0 border-b border-[#e0e0e0] pl-14">
        {days.map((d) => (
          <div key={d} className={`flex-1 border-l border-[#e0e0e0] px-2 py-1.5 ${d === today ? "text-[#5b5fc7]" : ""}`}>
            <div className="text-[20px] font-semibold leading-none">{Number(d.slice(8))}</div>
            <div className="text-[12px]">{longDate(d).split(",")[0]}</div>
          </div>
        ))}
      </div>
      <div className="relative min-h-0 flex-1 overflow-auto">
        <div className="relative flex" style={{ height: (END_H - START_H) * HOUR_H }}>
          <div className="w-14 shrink-0">
            {Array.from({ length: END_H - START_H }, (_, i) => (
              <div key={i} className="relative pr-2 text-right text-[11px] text-[#616161]" style={{ height: HOUR_H }}>
                <span className="relative -top-2">{i === 0 ? "" : fmtTime((START_H + i) * 60).replace(":00", "")}</span>
              </div>
            ))}
          </div>
          {days.map((d) => {
            const evs = (doc.events ?? []).filter((e) => e.day === d && e.response !== "Declined");
            return (
              <div key={d} className="relative flex-1 border-l border-[#e0e0e0]">
                {Array.from({ length: END_H - START_H }, (_, i) => (
                  <div key={i} className="border-b border-[#f0f0f0]" style={{ height: HOUR_H }}>
                    <div className="h-1/2 border-b border-dashed border-[#f5f5f5]" />
                  </div>
                ))}
                {d === today && nowMin > START_H * 60 && nowMin < END_H * 60 && (
                  <div className="absolute left-0 right-0 z-10 border-t-2 border-[#c4314b]" style={{ top: ((nowMin - START_H * 60) / 60) * HOUR_H }}>
                    <span className="absolute -left-1 -top-[5px] h-2 w-2 rounded-full bg-[#c4314b]" />
                  </div>
                )}
                {layoutDay(evs).map(({ ev, col, cols }) => {
                  const top = ((parseTime(ev.start) - START_H * 60) / 60) * HOUR_H;
                  const h = Math.max(22, ((parseTime(ev.end) - parseTime(ev.start)) / 60) * HOUR_H - 2);
                  const tentative = ev.response === "Tentative";
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      aria-label={`${ev.title}, ${ev.start} to ${ev.end}`}
                      onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        setOpen({ id: ev.id, x: r.right + 6, y: r.top });
                        go({ selection: `event:${ev.id}` });
                      }}
                      className={`absolute overflow-hidden rounded-[4px] border-l-4 px-1.5 py-0.5 text-left text-[12px] leading-tight shadow-sm ${ev.live ? "border-[#5b5fc7] bg-[#c5cbfa]" : "border-[#5b5fc7] bg-[#e8ebfa] hover:bg-[#dce0fa]"} ${tentative ? "bg-[repeating-linear-gradient(45deg,#e8ebfa,#e8ebfa_6px,#fff_6px,#fff_12px)]" : ""}`}
                      style={{ top, height: h, left: `calc(${(col / cols) * 100}% + 2px)`, width: `calc(${100 / cols}% - 4px)` }}
                    >
                      <div className="truncate font-semibold">{ev.title}</div>
                      {h > 30 && <div className="truncate text-[11px] text-[#424242]">{ev.online === false ? ev.location ?? "" : "Microsoft Teams Meeting"}</div>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {open && <EventCard id={open.id} x={open.x} y={open.y} onClose={() => setOpen(null)} />}
    </div>
  );
}

function EventCard({ id, x, y, onClose }: { id: string; x: number; y: number; onClose: () => void }) {
  const { doc, go, cmd } = useTeams();
  const ref = useOutsideClose(true, onClose);
  const ev = findEvent(doc, id);
  if (!ev) return null;
  const organizer = ev.organizer === "me";
  const people = Array.from(new Set([ev.organizer, ...ev.attendees]));
  const left = Math.min(x, (typeof window !== "undefined" ? window.innerWidth : 1200) - 380);
  const top = Math.max(8, Math.min(y, (typeof window !== "undefined" ? window.innerHeight : 800) - 420));
  return (
    <div ref={ref} role="dialog" aria-label={ev.title} className="fixed z-[100] w-[360px] rounded-lg border border-[#e0e0e0] bg-white p-4 text-[13px] shadow-[0_8px_24px_rgba(0,0,0,0.2)]" style={{ left, top }}>
      <div className="mb-2 flex items-start gap-2">
        <span className="mt-1 h-3 w-3 shrink-0 rounded-sm bg-[#5b5fc7]" />
        <div className="flex-1 text-[16px] font-semibold leading-tight">{ev.title}</div>
        <button type="button" aria-label="Close" onClick={onClose} className="text-[#616161]">
          <TIcon name="close" size={16} />
        </button>
      </div>
      <div className="mb-1 flex items-center gap-2 text-[#424242]">
        <TIcon name="clock" size={14} /> {longDate(ev.day)} {ev.start} - {ev.end}
      </div>
      {ev.repeat && ev.repeat !== "Does not repeat" && (
        <div className="mb-1 flex items-center gap-2 text-[#424242]">
          <TIcon name="repeat" size={14} /> {ev.repeat}
        </div>
      )}
      {ev.location && (
        <div className="mb-1 flex items-center gap-2 text-[#424242]">
          <TIcon name="location" size={14} /> {ev.location}
        </div>
      )}
      {ev.channel && (
        <div className="mb-1 flex items-center gap-2 text-[#424242]">
          <TIcon name="teams" size={14} /> {ev.channel}
        </div>
      )}
      {ev.online !== false && (
        <div className="mb-3 mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="Join"
            onClick={() => {
              onClose();
              cmd(`event:${ev.id}`, "meeting.prejoin", ev.id);
            }}
            className="flex items-center gap-1.5 rounded-[4px] bg-[#5b5fc7] px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#4f52b2]"
          >
            <TIcon name="video" size={16} /> Join
          </button>
          {ev.chat && (
            <button
              type="button"
              onClick={() => {
                onClose();
                go({ view: "chat", conv: ev.chat, tab: "chat", selection: `chat:${ev.chat}` });
              }}
              className="flex items-center gap-1.5 rounded-[4px] border border-[#d1d1d1] px-3 py-1.5 text-[13px] font-semibold hover:bg-[#f5f5f5]"
            >
              <TIcon name="chat" size={16} /> Chat with participants
            </button>
          )}
        </div>
      )}
      <div className="mb-2 flex items-center gap-2 text-[#424242]">
        <PersonAvatar id={ev.organizer} size={20} showPresence={false} />
        <span>
          {personName(doc, ev.organizer)} <span className="text-[#616161]">(Organizer)</span>
        </span>
      </div>
      <div className="mb-2 flex items-center gap-1">
        {people.slice(0, 6).map((p) => (
          <PersonAvatar key={p} id={p} size={24} showPresence={false} />
        ))}
        <span className="ml-1 text-[12px] text-[#616161]">{people.length} invited</span>
      </div>
      {ev.details && <div className="mb-3 max-h-24 overflow-auto whitespace-pre-line rounded bg-[#fafafa] p-2 text-[12px] text-[#424242]">{ev.details}</div>}
      {!organizer && (
        <div className="flex gap-2 border-t border-[#ebebeb] pt-3">
          {(
            [
              ["Accept", "Accepted", "check"],
              ["Tentative", "Tentative", "clock"],
              ["Decline", "Declined", "close"],
            ] as const
          ).map(([v, state, icon]) => (
            <button key={v} type="button" aria-pressed={ev.response === state} onClick={() => cmd(`event:${ev.id}`, "event.rsvp", v)} className={`flex items-center gap-1 rounded-[4px] border px-2.5 py-1 text-[12px] font-semibold ${ev.response === state ? "border-[#5b5fc7] bg-[#e8ebfa] text-[#5b5fc7]" : "border-[#d1d1d1] hover:bg-[#f5f5f5]"}`}>
              <TIcon name={icon} size={14} /> {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* New meeting form                                                    */
/* ------------------------------------------------------------------ */

const TIMES = Array.from({ length: 49 }, (_, i) => fmtTime(7 * 60 + i * 15));
const REPEATS = ["Does not repeat", "Every weekday (Mon-Fri)", "Daily", "Weekly", "Monthly", "Yearly"];

export function ScheduleForm() {
  const { doc, go, act } = useTeams();
  const today = doc.today ?? DEFAULT_TODAY;
  const monday = mondayOf(today);
  const dates = [0, 1, 2, 3, 4, 7, 8, 9, 10, 11].map((i) => addDays(monday, i));
  const nowMin = parseTime(doc.now ?? "10:02 AM");
  const startDefault = fmtTime(Math.min(17 * 60, Math.ceil((nowMin + 1) / 30) * 30));
  const [title, setTitle] = useState("");
  const [ids, setIds] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [date, setDate] = useState(today);
  const [start, setStart] = useState(startDefault);
  const [end, setEnd] = useState(fmtTime(parseTime(startDefault) + 30));
  const [repeat, setRepeat] = useState(REPEATS[0]);
  const [channel, setChannel] = useState("None");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const accepted = useAccepted(doc);
  const matches = useMemo(() => (q.trim() ? doc.people.filter((p) => !ids.includes(p.id) && p.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : []), [q, ids, doc.people]);
  const channels = ["None", ...allChannels(doc).map((c) => `${c.team.name} > ${c.channel.name}`)];

  const send = () => {
    const names = ids.map((id) => personName(doc, id)).sort((a, b) => a.localeCompare(b));
    const value = serializeForm([
      ["Title", title.trim()],
      ["Attendees", names.join("; ")],
      ["Date", isoToMDY(date)],
      ["Start", start],
      ["End", end],
      ["Repeat", repeat],
      ["Channel", channel],
      ["Location", location.trim()],
      ["Details", details.trim()],
    ]);
    accepted(() => act("schedule", { kind: "type", target: "schedule", value }), () => undefined);
  };

  const row = (icon: string, children: React.ReactNode) => (
    <div className="flex items-start gap-4 border-b border-[#f0f0f0] py-2.5">
      <span className="mt-1.5 text-[#616161]">
        <TIcon name={icon} size={18} />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );

  return (
    <div className="absolute inset-0 z-[70] flex flex-col bg-white" role="dialog" aria-label="New meeting">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e0e0e0] px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#e8ebfa] text-[#5b5fc7]">
          <TIcon name="calendar" size={18} />
        </span>
        <h1 className="text-[18px] font-bold">New meeting</h1>
        <span className="ml-4 border-b-[3px] border-[#5b5fc7] pb-[14px] pt-[17px] text-[14px] font-semibold">Details</span>
        <span className="pb-[14px] pt-[17px] text-[14px] text-[#616161]">Scheduling Assistant</span>
        <div className="flex-1" />
        <PrimaryBtn onClick={send} disabled={!title.trim()}>
          Send
        </PrimaryBtn>
        <SecondaryBtn onClick={() => go({ overlay: null, selection: "view:calendar" })}>Close</SecondaryBtn>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-6 py-2">
        <div className="max-w-[760px]">
          {row(
            "edit",
            <input aria-label="Add title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add title" className="w-full border-b border-transparent py-1 text-[18px] font-semibold outline-none placeholder:font-normal placeholder:text-[#707070] focus:border-[#5b5fc7]" />,
          )}
          {row(
            "addPeople",
            <div className="relative flex flex-wrap items-center gap-1.5">
              {ids.map((id) => (
                <span key={id} className="flex items-center gap-1 rounded-full bg-[#ebebeb] py-0.5 pl-0.5 pr-2 text-[13px]">
                  <PersonAvatar id={id} size={20} showPresence={false} />
                  {personName(doc, id)}
                  <button type="button" aria-label={`Remove ${personName(doc, id)}`} onClick={() => setIds(ids.filter((x) => x !== id))}>
                    <TIcon name="close" size={12} />
                  </button>
                </span>
              ))}
              <input
                aria-label="Enter name or email"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && matches[0]) {
                    setIds([...ids, matches[0].id]);
                    setQ("");
                  }
                }}
                placeholder={ids.length ? "" : "Enter name or email"}
                className="min-w-[160px] flex-1 py-1 text-[14px] outline-none placeholder:text-[#707070]"
              />
              <span className="text-[13px] text-[#616161]">Optional</span>
              {matches.length > 0 && (
                <div className="absolute left-0 top-8 z-30 w-72 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg">
                  {matches.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setIds([...ids, p.id]);
                        setQ("");
                      }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]"
                    >
                      <PersonAvatar id={p.id} size={28} />
                      <span className="flex flex-col">
                        <span>{p.name}</span>
                        <span className="text-[11px] text-[#616161]">{p.title}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>,
          )}
          {row(
            "clock",
            <div className="flex flex-wrap items-center gap-2">
              <select aria-label="Start date" value={date} onChange={(e) => setDate(e.target.value)} className={pickCls}>
                {dates.map((d) => (
                  <option key={d} value={d}>
                    {shortDay(d)}/{d.slice(0, 4)}
                  </option>
                ))}
              </select>
              <select
                aria-label="Start time"
                value={start}
                onChange={(e) => {
                  const s = e.target.value;
                  const dur = Math.max(30, parseTime(end) - parseTime(start));
                  setStart(s);
                  setEnd(fmtTime(Math.min(19 * 60, parseTime(s) + dur)));
                }}
                className={pickCls}
              >
                {TIMES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <TIcon name="fwd" size={14} className="text-[#616161]" />
              <select aria-label="End time" value={end} onChange={(e) => setEnd(e.target.value)} className={pickCls}>
                {TIMES.filter((t) => parseTime(t) > parseTime(start)).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <span className="text-[12px] text-[#616161]">{(parseTime(end) - parseTime(start)) / 60 >= 1 ? `${(parseTime(end) - parseTime(start)) / 60} hr` : `${parseTime(end) - parseTime(start)} min`}</span>
            </div>,
          )}
          {row(
            "repeat",
            <select aria-label="Repeat" value={repeat} onChange={(e) => setRepeat(e.target.value)} className={pickCls}>
              {REPEATS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>,
          )}
          {row(
            "teams",
            <select aria-label="Add channel" value={channel} onChange={(e) => setChannel(e.target.value)} className={pickCls}>
              {channels.map((c) => (
                <option key={c} value={c}>
                  {c === "None" ? "Add channel" : c}
                </option>
              ))}
            </select>,
          )}
          {row("location", <input aria-label="Add location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Add location" className="w-full py-1 text-[14px] outline-none placeholder:text-[#707070]" />)}
          {row(
            "note",
            <div className="rounded-md border border-[#e0e0e0]">
              <div className="flex gap-1 border-b border-[#ebebeb] px-2 py-1 text-[#616161]" aria-hidden="true">
                <TIcon name="bold" size={14} />
                <TIcon name="italic" size={14} />
                <TIcon name="underline" size={14} />
                <TIcon name="bullets" size={14} />
                <TIcon name="numbers" size={14} />
              </div>
              <textarea aria-label="Type details for this new meeting" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Type details for this new meeting" rows={6} className="w-full resize-none px-3 py-2 text-[14px] outline-none placeholder:text-[#707070]" />
            </div>,
          )}
          <div className="flex items-center gap-2 py-3 text-[13px] text-[#424242]">
            <span className="flex h-5 w-9 items-center rounded-full bg-[#5b5fc7] px-0.5">
              <span className="ml-auto h-4 w-4 rounded-full bg-white" />
            </span>
            Online meeting (Microsoft Teams)
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calls                                                               */
/* ------------------------------------------------------------------ */

export function CallsView() {
  const { doc, cmd } = useTeams();
  const [q, setQ] = useState("");
  const matches = q.trim() ? doc.people.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5) : [];
  return (
    <>
      <div className="flex w-[300px] shrink-0 flex-col border-r border-[#e0e0e0] bg-[#f5f5f5]">
        <div className="flex h-14 items-center px-4">
          <h1 className="text-[18px] font-bold">Calls</h1>
        </div>
        <div className="relative px-4 pb-3">
          <input aria-label="Type a name or number" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a name or number" className={inputCls} />
          {matches.length > 0 && (
            <div className="absolute left-4 right-4 top-10 z-30 rounded-md border border-[#e0e0e0] bg-white py-1 shadow-lg">
              {matches.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setQ("");
                    cmd(`person:${p.id}`, "calls.call", p.id);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#f5f5f5]"
                >
                  <PersonAvatar id={p.id} size={24} />
                  <span className="flex-1">{p.name}</span>
                  <TIcon name="calls" size={14} className="text-[#5b5fc7]" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="px-4 pb-1 text-[12px] font-semibold text-[#616161]">Speed dial</div>
        <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
          {doc.people.slice(0, 8).map((p) => (
            <div key={p.id} className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-white/70">
              <PersonAvatar id={p.id} size={32} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px]">{p.name}</span>
                <span className="block truncate text-[11px] text-[#616161]">{p.presence ?? ""}</span>
              </span>
              <button type="button" aria-label={`Call ${p.name}`} title={`Call ${p.name}`} onClick={() => cmd(`person:${p.id}`, "calls.call", p.id)} className="rounded p-1 text-[#5b5fc7] hover:bg-[#e8ebfa]">
                <TIcon name="calls" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex h-14 items-center border-b border-[#e0e0e0] px-5">
          <h2 className="text-[16px] font-bold">History</h2>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-[13px] text-[#616161]">
          <Avatar name={doc.me.name} size={48} />
          No recent calls. Calls you make and receive appear here.
        </div>
      </div>
    </>
  );
}
