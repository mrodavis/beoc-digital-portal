"use client";

import { useState } from "react";
import type { EhrAppt, EhrApptStatus } from "../types";
import { fmtDate, fmtTime } from "../forms";
import { ageOf, patientOf, providerOf } from "../model";
import { Badge, Btn, Icon, type MenuEntry, useEhr } from "../ui";

const START = 8 * 60;
const END = 17 * 60;
const STEP = 15;
const ROW = 20;

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toHm = (n: number) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}

const STATUS_STYLE: Record<EhrApptStatus, string> = {
  Scheduled: "border-slate-400 bg-white text-slate-800",
  Confirmed: "border-sky-500 bg-sky-50 text-sky-950",
  Arrived: "border-emerald-600 bg-emerald-50 text-emerald-950",
  Roomed: "border-teal-600 bg-teal-50 text-teal-950",
  "With provider": "border-violet-600 bg-violet-50 text-violet-950",
  Checkout: "border-amber-500 bg-amber-50 text-amber-950",
  Departed: "border-slate-400 bg-slate-200 text-slate-600",
  "No show": "border-rose-500 bg-rose-50 text-rose-800 line-through",
  Canceled: "border-slate-300 bg-slate-100 text-slate-400 line-through",
};

const canCheckIn = (a: EhrAppt) => a.status === "Scheduled" || a.status === "Confirmed";
const canCheckOut = (a: EhrAppt) => ["Arrived", "Roomed", "With provider", "Checkout"].includes(a.status);

function useApptActions() {
  const { doc, select, cmd, openForm, openPatient } = useEhr();
  return (a: EhrAppt): MenuEntry[] => [
    { label: "Check in…", onPick: () => (select(`appt:${a.id}`), openForm("ehr.checkin", { appt: a.id })), disabled: !canCheckIn(a) },
    { label: "Confirm appointment", onPick: () => (select(`appt:${a.id}`), cmd("ehr.appt.confirm")), disabled: a.status !== "Scheduled" },
    { label: "Mark no show", onPick: () => (select(`appt:${a.id}`), cmd("ehr.appt.noShow")), disabled: !canCheckIn(a) },
    { label: "Cancel appointment", onPick: () => (select(`appt:${a.id}`), cmd("ehr.appt.cancel")), disabled: !canCheckIn(a), danger: true },
    { separator: true },
    { label: "Room patient", onPick: () => (select(`appt:${a.id}`), cmd("ehr.track.status", "Roomed")), disabled: a.status !== "Arrived" },
    { label: "With provider", onPick: () => (select(`appt:${a.id}`), cmd("ehr.track.status", "With provider")), disabled: a.status !== "Roomed" && a.status !== "Arrived" },
    { label: "Ready for checkout", onPick: () => (select(`appt:${a.id}`), cmd("ehr.track.status", "Checkout")), disabled: a.status !== "With provider" && a.status !== "Roomed" },
    { label: "Check out…", onPick: () => (select(`appt:${a.id}`), openForm("ehr.checkout", { appt: a.id })), disabled: !canCheckOut(a) },
    ...(doc.workspaces.includes("chart") ? [{ separator: true } as MenuEntry, { label: "Open chart", onPick: () => openPatient(a.patient) }] : []),
  ];
}

function ApptToolbar({ a }: { a?: EhrAppt }) {
  const { select, cmd, openForm, openPatient, doc } = useEhr();
  if (!a) return null;
  const pick = () => select(`appt:${a.id}`);
  return (
    <>
      <Btn small tone="primary" disabled={!canCheckIn(a)} onClick={() => (pick(), openForm("ehr.checkin", { appt: a.id }))}>
        Check in
      </Btn>
      <Btn small disabled={a.status !== "Scheduled"} onClick={() => (pick(), cmd("ehr.appt.confirm"))}>
        Confirm
      </Btn>
      <Btn small disabled={!canCheckIn(a)} onClick={() => (pick(), cmd("ehr.appt.noShow"))}>
        No show
      </Btn>
      <Btn small disabled={!canCheckIn(a)} onClick={() => (pick(), cmd("ehr.appt.cancel"))}>
        Cancel appt
      </Btn>
      <Btn small disabled={!canCheckOut(a)} onClick={() => (pick(), openForm("ehr.checkout", { appt: a.id }))}>
        Check out
      </Btn>
      {doc.workspaces.includes("chart") && (
        <Btn small icon="chart" onClick={() => openPatient(a.patient)}>
          Open chart
        </Btn>
      )}
    </>
  );
}

export function ScheduleView() {
  const { doc, sel, select, cmd, openForm, menu } = useEhr();
  const actions = useApptActions();
  const day = doc.nav.day ?? doc.today;
  const appts = (doc.appointments ?? []).filter((a) => a.date === day);
  const selAppt = sel.startsWith("appt:") ? (doc.appointments ?? []).find((a) => a.id === sel.slice(5)) : undefined;
  const selSlot = sel.startsWith("slot:") ? sel : "";
  const rows = Array.from({ length: (END - START) / STEP }, (_, i) => START + i * STEP);
  const book = (slot: string) => {
    select(slot);
    openForm("ehr.appt.new", { slot });
  };
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-300 bg-white px-2.5 py-1.5">
        <div className="flex items-center gap-1">
          <Btn small label="Previous day" onClick={() => cmd("ehr.sched.day", addDays(day, -1))}>
            <Icon name="left" size={12} />
          </Btn>
          <div className="min-w-[128px] text-center text-[13px] font-bold">{fmtDate(day)}</div>
          <Btn small label="Next day" onClick={() => cmd("ehr.sched.day", addDays(day, 1))}>
            <Icon name="right" size={12} />
          </Btn>
          <Btn small disabled={day === doc.today} onClick={() => cmd("ehr.sched.day", doc.today)}>
            Today
          </Btn>
        </div>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        {selSlot ? (
          <Btn small tone="primary" icon="plus" onClick={() => book(selSlot)}>
            New appointment
          </Btn>
        ) : (
          <ApptToolbar a={selAppt} />
        )}
        {!selSlot && !selAppt && <span className="text-[11.5px] text-slate-500">Click an appointment to work it, or an open slot to book one.</span>}
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-white">
        <div className="sticky top-0 z-10 flex border-b border-slate-300 bg-slate-100">
          <div className="w-14 shrink-0" />
          {doc.providers.map((p) => (
            <div key={p.id} className="min-w-[170px] flex-1 border-l border-slate-300 px-2 py-1 text-[11.5px] leading-tight">
              <div className="font-bold text-slate-800">
                {p.name}, {p.credentials}
              </div>
              <div className="text-[10.5px] text-slate-500">{p.specialty}</div>
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="w-14 shrink-0">
            {rows.map((m) => (
              <div key={m} className={`pr-1 text-right text-[10px] text-slate-500 ${m % 60 === 0 ? "font-semibold text-slate-700" : ""}`} style={{ height: ROW }}>
                {m % 30 === 0 ? fmtTime(toHm(m)) : ""}
              </div>
            ))}
          </div>
          {doc.providers.map((pr) => (
            <div key={pr.id} className="relative min-w-[170px] flex-1 border-l border-slate-300" style={{ height: rows.length * ROW }}>
              {rows.map((m) => {
                const key = `slot:${pr.id}@${day}T${toHm(m)}`;
                const taken = appts.some((a) => a.provider === pr.id && a.status !== "Canceled" && toMin(a.time) <= m && toMin(a.time) + a.minutes > m);
                return (
                  <button
                    key={m}
                    type="button"
                    aria-label={`Open slot ${fmtTime(toHm(m))} with ${pr.name}`}
                    disabled={taken}
                    onClick={() => select(key)}
                    onDoubleClick={() => book(key)}
                    className={`block w-full border-b text-left ${m % 60 === 45 ? "border-slate-300" : "border-slate-100"} ${selSlot === key ? "bg-sky-200 ring-2 ring-inset ring-sky-600" : "hover:bg-sky-50"} disabled:cursor-default`}
                    style={{ height: ROW }}
                  />
                );
              })}
              {appts
                .filter((a) => a.provider === pr.id)
                .map((a) => {
                  const p = patientOf(doc, a.patient);
                  const top = ((toMin(a.time) - START) / STEP) * ROW;
                  const h = Math.max(1, a.minutes / STEP) * ROW - 2;
                  const isSel = selAppt?.id === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      aria-label={`${fmtTime(a.time)} ${p?.last}, ${p?.first}, ${a.type}, ${a.status}`}
                      onClick={() => select(`appt:${a.id}`)}
                      onDoubleClick={() => canCheckIn(a) && (select(`appt:${a.id}`), openForm("ehr.checkin", { appt: a.id }))}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        select(`appt:${a.id}`);
                        menu(e, actions(a));
                      }}
                      className={`absolute left-1 right-1 overflow-hidden rounded-[3px] border-l-4 border px-1.5 text-left text-[11px] leading-tight shadow-sm ${STATUS_STYLE[a.status]} ${isSel ? "z-[5] ring-2 ring-sky-600" : ""}`}
                      style={{ top: top + 1, height: h }}
                    >
                      <span className="font-bold">{fmtTime(a.time)}</span> {p ? `${p.last}, ${p.first}` : a.patient}
                      <span className="block truncate text-[10.5px] opacity-80">
                        {a.type}
                        {a.reason ? ` · ${a.reason}` : ""} · {a.status}
                      </span>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const COLUMNS: { id: string; label: string; match: EhrApptStatus[] }[] = [
  { id: "Scheduled", label: "Scheduled", match: ["Scheduled", "Confirmed"] },
  { id: "Arrived", label: "Arrived", match: ["Arrived"] },
  { id: "Roomed", label: "Roomed", match: ["Roomed"] },
  { id: "With provider", label: "With provider", match: ["With provider"] },
  { id: "Checkout", label: "Checkout", match: ["Checkout"] },
  { id: "Departed", label: "Departed", match: ["Departed"] },
];

function minutesSince(since: string | undefined, clock: string): number | null {
  if (!since) return null;
  return Math.max(0, toMin(clock) - toMin(since));
}

export function TrackerView() {
  const { doc, sel, select, cmd, openForm, menu } = useEhr();
  const actions = useApptActions();
  const [drag, setDrag] = useState<string | null>(null);
  const appts = (doc.appointments ?? []).filter((a) => a.date === doc.today).sort((a, b) => a.time.localeCompare(b.time));
  const selAppt = sel.startsWith("appt:") ? appts.find((a) => a.id === sel.slice(5)) : undefined;
  const off = appts.filter((a) => a.status === "No show" || a.status === "Canceled");

  const drop = (col: string, id: string) => {
    const a = appts.find((x) => x.id === id);
    if (!a) return;
    select(`appt:${a.id}`);
    if (col === "Arrived") canCheckIn(a) && openForm("ehr.checkin", { appt: a.id });
    else if (col === "Departed") canCheckOut(a) && openForm("ehr.checkout", { appt: a.id });
    else if (col === "Roomed" || col === "With provider" || col === "Checkout") cmd("ehr.track.status", col);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-300 bg-white px-2.5 py-1.5">
        <div className="text-[13px] font-bold">Patient tracker · {fmtDate(doc.today)}</div>
        <span className="text-[11px] text-slate-500">Clock {fmtTime(doc.clock)}</span>
        <span className="mx-1 h-5 w-px bg-slate-300" />
        {selAppt ? (
          <>
            <Btn small tone="primary" disabled={!canCheckIn(selAppt)} onClick={() => openForm("ehr.checkin", { appt: selAppt.id })}>
              Check in
            </Btn>
            <Btn small disabled={selAppt.status !== "Arrived"} onClick={() => cmd("ehr.track.status", "Roomed")}>
              Room patient
            </Btn>
            <Btn small disabled={selAppt.status !== "Roomed" && selAppt.status !== "Arrived"} onClick={() => cmd("ehr.track.status", "With provider")}>
              With provider
            </Btn>
            <Btn small disabled={selAppt.status !== "With provider" && selAppt.status !== "Roomed"} onClick={() => cmd("ehr.track.status", "Checkout")}>
              Ready for checkout
            </Btn>
            <Btn small disabled={!canCheckOut(selAppt)} onClick={() => openForm("ehr.checkout", { appt: selAppt.id })}>
              Check out
            </Btn>
          </>
        ) : (
          <span className="text-[11.5px] text-slate-500">Select a card to move the patient, or drag it to a column.</span>
        )}
        <div className="flex-1" />
        {off.length > 0 && (
          <span className="text-[11px] text-slate-600">
            Not on the board: {off.map((a) => `${patientOf(doc, a.patient)?.last} (${a.status.toLowerCase()})`).join(", ")}
          </span>
        )}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-6 gap-1.5 overflow-auto bg-slate-200 p-1.5">
        {COLUMNS.map((col) => {
          const cards = appts.filter((a) => col.match.includes(a.status));
          return (
            <section
              key={col.id}
              aria-label={`${col.label} column`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain") || drag;
                setDrag(null);
                if (id) drop(col.id, id);
              }}
              className="flex min-w-[118px] flex-col rounded-[3px] bg-slate-100"
            >
              <header className="flex items-center justify-between border-b-2 border-slate-400 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700">
                {col.label}
                <span className="rounded-full bg-slate-300 px-1.5 text-[10px] text-slate-800">{cards.length}</span>
              </header>
              <div className="flex flex-col gap-1.5 p-1.5">
                {cards.map((a) => {
                  const p = patientOf(doc, a.patient);
                  const pr = providerOf(doc, a.provider);
                  const mins = minutesSince(a.since, doc.clock);
                  const isSel = selAppt?.id === a.id;
                  return (
                    <div
                      key={a.id}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`${p?.first} ${p?.last}, ${a.status}`}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", a.id);
                        setDrag(a.id);
                      }}
                      onClick={() => select(`appt:${a.id}`)}
                      onKeyDown={(e) => e.key === "Enter" && select(`appt:${a.id}`)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        select(`appt:${a.id}`);
                        menu(e, actions(a));
                      }}
                      className={`cursor-grab rounded-[3px] border-l-4 border bg-white px-1.5 py-1 text-[11px] leading-tight shadow-sm ${STATUS_STYLE[a.status].replace("line-through", "")} ${isSel ? "ring-2 ring-sky-600" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold">{fmtTime(a.time)}</span>
                        <button
                          type="button"
                          aria-label={`Actions for ${p?.first} ${p?.last}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            select(`appt:${a.id}`);
                            menu(e, actions(a));
                          }}
                          className="rounded px-0.5 text-slate-500 hover:bg-slate-200"
                        >
                          <Icon name="dots" size={14} strokeWidth={3} />
                        </button>
                      </div>
                      <div className="truncate text-[12px] font-semibold">
                        {p?.last}, {p?.first}
                      </div>
                      <div className="text-slate-600">
                        {p ? `${ageOf(p.dob, doc.today)} y ${p.sex[0]}` : ""} · {pr?.name.split(" ").slice(-1)[0]}
                      </div>
                      <div className="truncate text-slate-600">{a.type}</div>
                      <div className="mt-0.5 flex flex-wrap gap-1">
                        {a.room && <Badge tone="teal">{a.room}</Badge>}
                        {mins !== null && a.status !== "Departed" && <Badge tone={mins >= 20 ? "red" : "slate"}>{mins} min</Badge>}
                        {a.status === "Confirmed" && <Badge tone="blue">Confirmed</Badge>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
