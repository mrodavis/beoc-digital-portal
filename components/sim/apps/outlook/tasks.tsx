"use client";

import { useState } from "react";
import type { Ctx } from "./ctx";
import type { OlContact, OlMessage, OlTask } from "./types";
import { CategoryChips, OIcon } from "./parts";
import { flaggedMenu, taskMenu } from "./menus";
import { MessageView, RecipientField } from "./mail";
import { PRIORITIES, TASK_STATUS, selKeys, todayOf } from "./model";
import { TIME_OPTIONS, addDays, dow, fmtDate, fmtLong, toMs, weekStart } from "./dates";

type Item = { key: string; subject: string; due?: string; start?: string; kind: "task" | "msg" | "contact"; task?: OlTask; msg?: OlMessage; contact?: OlContact; done: boolean; cats?: string[]; priority?: string; status?: string; percent?: number; owner?: string };

function items(ctx: Ctx): Item[] {
  const doc = ctx.doc;
  const out: Item[] = (doc.tasks ?? []).map((t) => ({
    key: `task:${t.id}`, subject: t.subject, due: t.due, start: t.start, kind: "task" as const, task: t, done: t.status === "Completed", cats: t.categories, priority: t.priority ?? "Normal",
    status: t.status ?? "Not Started", percent: t.percent ?? 0, owner: t.owner,
  }));
  for (const m of doc.messages) if (m.flag && m.folder !== "deleted") out.push({ key: `msg:${m.id}`, subject: m.subject, due: m.flag.due, start: m.flag.start, kind: "msg", msg: m, done: Boolean(m.flag.complete), cats: m.categories, priority: m.importance ?? "Normal", status: m.flag.complete ? "Completed" : "Not Started", percent: m.flag.complete ? 100 : 0 });
  for (const c of doc.contacts ?? []) if (c.flag) out.push({ key: `contact:${c.id}`, subject: `Follow up: ${c.name}`, due: c.flag.due, start: c.flag.start, kind: "contact", contact: c, done: Boolean(c.flag.complete), cats: c.categories, priority: "Normal", status: c.flag.complete ? "Completed" : "Not Started", percent: 0 });
  return out;
}

function dueGroup(due: string | undefined, today: string): string {
  if (!due) return "No Date";
  if (due < today) return "Overdue";
  if (due === today) return "Today";
  if (due === addDays(today, 1)) return "Tomorrow";
  const sat = addDays(weekStart(today), 6);
  if (due <= sat) return "This Week";
  if (due <= addDays(sat, 7)) return "Next Week";
  return "Later";
}
const GROUP_ORDER = ["Overdue", "Today", "Tomorrow", "This Week", "Next Week", "Later", "No Date"];

export function TasksPane({ ctx }: { ctx: Ctx }) {
  const cur = ctx.doc.tasksFolder ?? "To-Do List";
  return (
    <div className="min-h-0 flex-1 overflow-auto py-1 text-[12.5px]">
      <div className="flex items-center gap-1 px-2 py-1 text-[12px] font-semibold text-gray-700">
        <OIcon name="chevronDown" size={10} /> My Tasks
      </div>
      {(["To-Do List", "Tasks"] as const).map((f) => (
        <button key={f} type="button" onClick={() => ctx.cmd("tasks.folder", f)} className={`block w-full py-[3px] pl-6 pr-2 text-left ${cur === f ? "bg-[#cfe4fa] font-semibold" : "hover:bg-[#f0f6fc]"}`}>
          {f}
        </button>
      ))}
    </div>
  );
}

function dueLabel(due: string | undefined, today: string) {
  if (!due) return "";
  if (due === today) return "Today";
  if (due === addDays(today, 1)) return "Tomorrow";
  return `${fmtLong(due).split(",")[0].slice(0, 3)} ${fmtDate(due)}`;
}

export function TaskList({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const today = todayOf(doc);
  const folder = doc.tasksFolder ?? "To-Do List";
  const view = doc.tasksView ?? (folder === "Tasks" ? "Simple List" : "To-Do List");
  const [newTask, setNewTask] = useState("");
  const sel = selKeys(ctx.ui.selection);
  let list = items(ctx);
  if (folder === "Tasks") list = list.filter((i) => i.kind === "task");
  if (view === "To-Do List" || view === "Active" || view === "Prioritized") list = list.filter((i) => !i.done);
  if (view === "Completed") list = list.filter((i) => i.done);
  if (view === "Today") list = list.filter((i) => !i.done && i.due && i.due <= today);
  if (view === "Next 7 Days") list = list.filter((i) => !i.done && i.due && i.due >= today && i.due <= addDays(today, 6));
  if (view === "Overdue") list = list.filter((i) => !i.done && i.due && i.due < today);
  if (view === "Assigned") list = list.filter((i) => i.owner);
  list.sort((a, b) => toMs(a.due ?? "2099-12-31") - toMs(b.due ?? "2099-12-31") || a.subject.localeCompare(b.subject));
  const pick = (i: Item) => ctx.select(i.key);
  const menuFor = (ev: React.MouseEvent, i: Item) => {
    ev.preventDefault();
    pick(i);
    if (i.task) ctx.menu({ x: ev.clientX, y: ev.clientY }, taskMenu(ctx, i.task));
    else if (i.msg) ctx.menu({ x: ev.clientX, y: ev.clientY }, flaggedMenu(ctx, i.msg));
  };
  const complete = (ev: React.MouseEvent, i: Item) => {
    ev.stopPropagation();
    pick(i);
    ctx.cmd("task.complete");
  };
  const addBox = (
    <div className="border-b border-gray-200 px-2 py-1.5">
      <input
        aria-label="Type a new task"
        placeholder="Type a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter" && newTask.trim()) {
            ctx.commit({ kind: "type", target: "tasks.new", value: newTask.trim() });
            setNewTask("");
          }
        }}
        className="w-full border border-gray-300 px-1.5 py-1 text-[12px] italic outline-none focus:border-[#0f6cbd] focus:not-italic"
      />
    </div>
  );
  const table = view === "Detailed" || view === "Simple List" || view === "Prioritized" || view === "Active" || view === "Completed" || view === "Assigned" || view === "Overdue" || view === "Today" || view === "Next 7 Days";
  const wide = table && view !== "Simple List";
  return (
    <section aria-label={folder} className={`flex min-h-0 flex-col border-r border-gray-200 bg-white ${wide ? "flex-1" : "w-[360px] shrink-0"}`}>
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-1.5 text-[12px]">
        <span className="font-semibold">{folder}</span>
        <span className="text-gray-500">{view}</span>
      </div>
      {addBox}
      <div role="listbox" aria-label="Tasks" tabIndex={0} className="min-h-0 flex-1 overflow-auto">
        {list.length === 0 && <p className="p-6 text-center text-[12px] text-gray-500">There are no items to show in this view.</p>}
        {table ? (
          <table className="w-full text-[12px]">
            <thead className="sticky top-0 bg-[#faf9f8] text-left text-[11.5px] text-gray-600">
              <tr>
                <th className="w-6 px-1 py-1" aria-label="Complete">✓</th>
                {wide && <th className="w-4 px-1 py-1" aria-label="Priority">!</th>}
                <th className="px-1 py-1 font-normal">Task Subject</th>
                {wide && <th className="px-1 py-1 font-normal">Status</th>}
                <th className="px-1 py-1 font-normal">Due Date</th>
                {wide && <th className="px-1 py-1 font-normal">% Complete</th>}
                <th className="px-1 py-1 font-normal">Categories</th>
                {wide && <th className="px-1 py-1 font-normal">Owner</th>}
                <th className="w-6 px-1 py-1" aria-label="Flag" />
              </tr>
            </thead>
            <tbody>
              {(view === "Prioritized" ? [...list].sort((a, b) => PRIORITIES.indexOf(b.priority ?? "Normal") - PRIORITIES.indexOf(a.priority ?? "Normal")) : list).map((i) => (
                <tr
                  key={i.key}
                  role="option"
                  aria-selected={sel.includes(i.key)}
                  onClick={() => pick(i)}
                  onDoubleClick={() => ctx.cmd("item.open", i.key)}
                  onContextMenu={(e) => menuFor(e, i)}
                  className={`border-b border-gray-100 ${sel.includes(i.key) ? "bg-[#cfe4fa]" : "hover:bg-[#f3f2f1]"} ${i.done ? "text-gray-500 line-through" : ""} ${!i.done && i.due && i.due < today ? "text-[#c50f1f]" : ""}`}
                >
                  <td className="px-1 py-1">
                    <input type="checkbox" aria-label={`Mark ${i.subject} complete`} checked={i.done} onChange={() => undefined} onClick={(e) => complete(e, i)} />
                  </td>
                  {wide && <td className="px-1 py-1 font-bold text-[#c50f1f]">{i.priority === "High" ? "!" : i.priority === "Low" ? "↓" : ""}</td>}
                  <td className="px-1 py-1">
                    <span className="flex items-center gap-1">
                      {i.kind === "msg" && <OIcon name="mail" size={12} />}
                      {i.kind === "contact" && <OIcon name="person" size={12} />}
                      {i.subject}
                    </span>
                  </td>
                  {wide && <td className="px-1 py-1">{i.status}</td>}
                  <td className="whitespace-nowrap px-1 py-1">{i.due ? fmtLong(i.due).replace(/^(\w{3})\w*, (\w+) (\d+), (\d+)$/, "$1 $2 $3") : "None"}</td>
                  {wide && <td className="px-1 py-1">{i.percent ?? 0}%</td>}
                  <td className="px-1 py-1"><CategoryChips doc={doc} cats={i.cats} compact /></td>
                  {wide && <td className="px-1 py-1">{i.owner ?? ""}</td>}
                  <td className="px-1 py-1">
                    <button type="button" aria-label={i.done ? "Completed" : "Mark complete"} onClick={(e) => complete(e, i)}>
                      {i.done ? <OIcon name="check" size={12} /> : <OIcon name="flagFill" size={12} color={i.due ? "#c50f1f" : "#a19f9d"} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          GROUP_ORDER.map((g) => {
            const rows = list.filter((i) => dueGroup(i.due, today) === g);
            if (!rows.length) return null;
            return (
              <div key={g}>
                <div className={`px-3 pb-0.5 pt-2 text-[11.5px] font-semibold ${g === "Overdue" ? "text-[#c50f1f]" : "text-gray-600"}`}>{g}</div>
                {rows.map((i) => (
                  <div
                    key={i.key}
                    role="option"
                    aria-selected={sel.includes(i.key)}
                    onClick={() => pick(i)}
                    onDoubleClick={() => ctx.cmd("item.open", i.key)}
                    onContextMenu={(e) => menuFor(e, i)}
                    className={`group flex cursor-default items-center gap-2 border-b border-gray-100 px-3 py-1.5 text-[12.5px] ${sel.includes(i.key) ? "bg-[#cfe4fa]" : "hover:bg-[#f3f2f1]"}`}
                  >
                    <OIcon name={i.kind === "msg" ? "mail" : i.kind === "contact" ? "person" : "tasks"} size={14} className="text-gray-500" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{i.subject}</span>
                      <span className={`block text-[11px] ${g === "Overdue" ? "text-[#c50f1f]" : "text-gray-500"}`}>
                        {i.due ? `Due ${dueLabel(i.due, today)}` : "No due date"}
                        {i.priority === "High" ? " · High importance" : ""}
                        {i.status && i.status !== "Not Started" ? ` · ${i.status}` : ""}
                      </span>
                    </span>
                    <CategoryChips doc={doc} cats={i.cats} compact />
                    <button type="button" aria-label="Mark complete" title="Mark complete" onClick={(e) => complete(e, i)} className="rounded p-0.5 hover:bg-gray-300">
                      <OIcon name="flagFill" size={13} color="#c50f1f" />
                    </button>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export function TaskDetails({ ctx }: { ctx: Ctx }) {
  const doc = ctx.doc;
  const k = selKeys(ctx.ui.selection)[0] ?? "";
  if (k.startsWith("msg:")) {
    const m = doc.messages.find((x) => x.id === k.slice(4));
    if (m) return <MessageView ctx={ctx} m={m} />;
  }
  const t = k.startsWith("task:") ? (doc.tasks ?? []).find((x) => x.id === k.slice(5)) : undefined;
  if (!t)
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-white text-[13px] text-gray-500">
        <OIcon name="tasks" size={44} className="mb-2 text-gray-300" />
        Select a task to see its details
      </div>
    );
  const today = todayOf(doc);
  const days = t.due ? Math.round((toMs(t.due) - toMs(today)) / 86400000) : null;
  const row = (label: string, value?: React.ReactNode) => (
    <div className="flex gap-2 py-0.5 text-[12.5px]">
      <span className="w-24 shrink-0 text-gray-500">{label}</span>
      <span>{value ?? "None"}</span>
    </div>
  );
  return (
    <article aria-label={`Task ${t.subject}`} className="min-h-0 flex-1 overflow-auto bg-white p-4">
      <h2 className={`mb-1 text-[18px] font-semibold ${t.status === "Completed" ? "text-gray-500 line-through" : ""}`}>{t.subject}</h2>
      {t.status === "Completed" ? (
        <p className="mb-2 text-[12px] text-gray-600">Completed on {t.completedOn ? fmtLong(t.completedOn) : "a previous date"}.</p>
      ) : days !== null ? (
        <p className={`mb-2 text-[12px] ${days < 0 ? "text-[#c50f1f]" : "text-gray-600"}`}>{days < 0 ? `Overdue by ${-days} day${days === -1 ? "" : "s"}.` : days === 0 ? "Due today." : `Due in ${days} day${days === 1 ? "" : "s"}.`}</p>
      ) : null}
      <div className="mb-3 flex gap-1.5">
        <button type="button" onClick={() => ctx.cmd("task.complete")} className="flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-[12px] hover:bg-gray-100">
          <OIcon name="check" size={13} /> {t.status === "Completed" ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button type="button" onClick={() => ctx.cmd("item.open", k)} className="flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-[12px] hover:bg-gray-100">
          <OIcon name="edit" size={13} /> Open
        </button>
      </div>
      {row("Start date", t.start ? fmtLong(t.start) : undefined)}
      {row("Due date", t.due ? fmtLong(t.due) : undefined)}
      {row("Status", t.status ?? "Not Started")}
      {row("Priority", t.priority ?? "Normal")}
      {row("% Complete", `${t.percent ?? 0}%`)}
      {row("Owner", t.owner ?? doc.account.name)}
      {row("Reminder", t.reminder ? `${fmtDate(t.reminder)} ${t.reminder.slice(11)}` : undefined)}
      {row("Categories", t.categories?.length ? <CategoryChips doc={doc} cats={t.categories} /> : undefined)}
      {t.notes && <p className="mt-3 whitespace-pre-wrap border-t border-gray-200 pt-2 text-[12.5px]">{t.notes}</p>}
    </article>
  );
}

export function TaskForm({ ctx }: { ctx: Ctx }) {
  const f = ctx.doc.form!;
  const d = ctx.fdraft;
  if (!d) return null;
  const today = todayOf(ctx.doc);
  const dueIso = d.tDue ? (/^\d{4}/.test(d.tDue) ? d.tDue : null) : null;
  void dueIso;
  const sel = "border border-gray-300 bg-white px-1 py-0.5 text-[12px]";
  const lab = "w-20 shrink-0 text-[12px] text-gray-700";
  const due = d.tDue && /\d+\/\d+\/\d+/.test(d.tDue) ? d.tDue : "";
  const dueDays = due ? Math.round((Date.parse(due) - Date.parse(`${+today.slice(5, 7)}/${+today.slice(8, 10)}/${today.slice(0, 4)}`)) / 86400000) : null;
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white" aria-label="Task">
      <div className="flex items-center justify-end border-b border-gray-200 px-2 py-0.5">
        <button type="button" aria-label="Close" onClick={() => ctx.cmd("form.close")} className="rounded p-1 text-gray-600 hover:bg-red-600 hover:text-white">
          <OIcon name="close" size={12} />
        </button>
      </div>
      {dueDays !== null && d.status !== "Completed" && (
        <div className="flex items-center gap-2 border-b border-gray-200 bg-[#f3f2f1] px-3 py-1 text-[12px]">
          <OIcon name="info" size={13} />
          {dueDays < 0 ? `Overdue by ${-dueDays} days.` : dueDays === 0 ? "Due today." : `Due in ${dueDays} day${dueDays === 1 ? "" : "s"}.`}
        </div>
      )}
      {f.data.assign && (
        <div className="flex gap-2 px-3 pt-2">
          <button type="button" onClick={() => ctx.saveForm()} aria-label="Send" className="flex h-[30px] w-14 shrink-0 items-center justify-center gap-1 rounded border border-gray-300 bg-white text-[12px] hover:bg-[#e5f1fb]">
            <OIcon name="send" size={14} className="text-[#0f6cbd]" /> Send
          </button>
          <div className="min-w-0 flex-1">
            <RecipientField ctx={ctx} label="To..." tokens={d.assignTo} pending={d.pending.assignTo} onTokens={(t) => ctx.setFdraft({ assignTo: t })} onPending={(s) => ctx.setFdraft({ pending: { ...d.pending, assignTo: s } })} onButton={() => ctx.cmd("compose.addressBook", "To")} />
          </div>
        </div>
      )}
      {f.view === "details" ? (
        <div className="p-3 text-[12px] text-gray-700">
          <p className="mb-2">Date completed: {d.status === "Completed" ? fmtDate(today) : "None"}</p>
          <p className="mb-2">Total work: 0 hours · Actual work: 0 hours</p>
          <p>Company: · Mileage: · Billing information:</p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-1 p-3">
          <div className="flex items-center gap-2">
            <label htmlFor="tk-subj" className={lab}>Subject</label>
            <input id="tk-subj" value={d.subject} onChange={(e) => ctx.setFdraft({ subject: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 border border-gray-300 px-1 py-0.5 text-[12.5px] outline-none focus:border-[#0f6cbd]" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="tk-start" className={lab}>Start date</label>
            <input id="tk-start" placeholder="None" value={d.tStart} onChange={(e) => ctx.setFdraft({ tStart: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="w-28 border border-gray-300 px-1 py-0.5 text-[12px]" />
            <label htmlFor="tk-status" className="ml-3 w-14 text-[12px] text-gray-700">Status</label>
            <select id="tk-status" value={d.status} onChange={(e) => ctx.setFdraft({ status: e.target.value, percent: e.target.value === "Completed" ? "100" : d.percent === "100" ? "0" : d.percent })} className={sel}>
              {TASK_STATUS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="tk-due" className={lab}>Due date</label>
            <input id="tk-due" placeholder="None" value={d.tDue} onChange={(e) => ctx.setFdraft({ tDue: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="w-28 border border-gray-300 px-1 py-0.5 text-[12px]" />
            <label htmlFor="tk-pri" className="ml-3 w-14 text-[12px] text-gray-700">Priority</label>
            <select id="tk-pri" value={d.priority} onChange={(e) => ctx.setFdraft({ priority: e.target.value })} className={sel}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
            <label htmlFor="tk-pct" className="ml-3 text-[12px] text-gray-700">% Complete</label>
            <select id="tk-pct" value={d.percent} onChange={(e) => ctx.setFdraft({ percent: e.target.value, status: e.target.value === "100" ? "Completed" : d.status === "Completed" ? "In Progress" : e.target.value !== "0" && d.status === "Not Started" ? "In Progress" : d.status })} className={sel}>
              {["0", "25", "50", "75", "100"].map((p) => <option key={p} value={p}>{p}%</option>)}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className={`${lab} flex items-center gap-1`}>
              <input type="checkbox" checked={d.reminderOn} onChange={(e) => ctx.setFdraft({ reminderOn: e.target.checked })} /> Reminder
            </label>
            <input aria-label="Reminder date" disabled={!d.reminderOn} value={d.reminderDate} onChange={(e) => ctx.setFdraft({ reminderDate: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="w-28 border border-gray-300 px-1 py-0.5 text-[12px] disabled:bg-gray-100" />
            <select aria-label="Reminder time" disabled={!d.reminderOn} value={d.reminderTime} onChange={(e) => ctx.setFdraft({ reminderTime: e.target.value })} className={`${sel} disabled:bg-gray-100`}>
              {TIME_OPTIONS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <span className="ml-3 text-[12px] text-gray-600">Owner: {ctx.doc.account.name}</span>
          </div>
          <p className="text-[11px] text-gray-500">Type dates as M/D/YYYY (for example {fmtDate(addDays(today, 3))}). Leave a date blank for None.{dow(today) ? "" : ""}</p>
          <textarea aria-label="Task notes" value={d.notes} onChange={(e) => ctx.setFdraft({ notes: e.target.value })} onKeyDown={(e) => e.stopPropagation()} className="mt-1 min-h-[90px] w-full flex-1 resize-none border border-gray-200 p-1.5 text-[13px] outline-none focus:border-[#0f6cbd]" />
        </div>
      )}
    </div>
  );
}
