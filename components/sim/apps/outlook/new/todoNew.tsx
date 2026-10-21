"use client";

import { useState } from "react";
import type { OlMessage, OlTask } from "../types";
import { OIcon } from "../parts";
import { selIds, todayOf } from "../model";
import { fmtLong } from "../dates";
import type { NCtx } from "./mailNew";
import { NMenuButton } from "./ui";

/* ------------------------------------------------------------------ */
/* To Do in new Outlook                                                */
/* ------------------------------------------------------------------ */

const LISTS: [string, string][] = [
  ["My Day", "sun"],
  ["Important", "star"],
  ["Planned", "calendar"],
  ["Assigned to me", "person"],
  ["Flagged email", "flag"],
  ["Tasks", "home"],
];

type Item = { key: string; title: string; done: boolean; due?: string; important?: boolean; msg?: OlMessage; task?: OlTask };

function itemsFor(ctx: NCtx, list: string): Item[] {
  const doc = ctx.doc;
  const tasks = (doc.tasks ?? []).map((t) => ({ key: `task:${t.id}`, title: t.subject, done: t.status === "Completed", due: t.due, important: t.important, task: t }));
  const flagged = doc.messages
    .filter((m) => m.flag && m.folder !== "deleted")
    .map((m) => ({ key: `msg:${m.id}`, title: m.subject, done: Boolean(m.flag?.complete), due: m.flag?.due, msg: m }));
  switch (list) {
    case "My Day":
      return tasks.filter((t) => t.task!.myDay);
    case "Important":
      return tasks.filter((t) => t.important);
    case "Planned":
      return [...tasks.filter((t) => t.due), ...flagged.filter((f) => f.due)];
    case "Assigned to me":
      return tasks.filter((t) => t.task!.owner && t.task!.owner === doc.account.name);
    case "Flagged email":
      return flagged;
    case "Tasks":
      return tasks.filter((t) => (t.task!.list ?? "Tasks") === "Tasks");
    default:
      return tasks.filter((t) => t.task!.list === list);
  }
}

export function TodoPaneNew({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const cur = doc.todoList ?? "My Day";
  const lists: [string, string][] = [...LISTS, ...(doc.todoLists ?? []).map((l) => [l, "list"] as [string, string])];
  return (
    <div className="min-h-0 flex-1 overflow-auto py-2">
      {lists.map(([l, icon]) => (
        <button
          key={l}
          type="button"
          data-c="todo.list"
          data-v={l}
          onClick={() => ctx.cmd("todo.list", l)}
          className={`relative mx-1 flex w-[calc(100%-8px)] items-center gap-2.5 rounded-[4px] px-2.5 py-[6px] text-left text-[13px] ${cur === l ? "bg-[#d6e7f8] font-semibold" : "hover:bg-[#ebebeb]"}`}
        >
          {cur === l && <span className="absolute left-0 top-1.5 h-4 w-[3px] rounded-full bg-[#0f6cbd]" />}
          <OIcon name={icon} size={15} className="text-gray-600" />
          <span className="flex-1">{l}</span>
          <span className="text-[12px] text-gray-500">{itemsFor(ctx, l).filter((i) => !i.done).length || ""}</span>
        </button>
      ))}
    </div>
  );
}

export function TodoMainNew({ ctx }: { ctx: NCtx }) {
  const doc = ctx.doc;
  const cur = doc.todoList ?? "My Day";
  const [text, setText] = useState("");
  const items = itemsFor(ctx, cur);
  const open = items.filter((i) => !i.done);
  const done = items.filter((i) => i.done);
  const sel = ctx.ui.selection;
  const selTask = (doc.tasks ?? []).find((t) => selIds(sel, "task")[0] === t.id);
  const selMsg = doc.messages.find((m) => selIds(sel, "msg")[0] === m.id);
  const row = (i: Item) => (
    <div
      key={i.key}
      role="option"
      aria-selected={sel === i.key}
      data-sel={i.key}
      onClick={() => ctx.select(i.key)}
      className={`mx-2 mb-1 flex cursor-default items-center gap-3 rounded-[4px] bg-white px-3 py-2.5 text-[13.5px] shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.12)] ${sel === i.key ? "outline outline-2 outline-[#0f6cbd]" : ""}`}
    >
      <button
        type="button"
        aria-label={i.done ? "Mark as not completed" : "Mark as completed"}
        data-c={i.msg ? "item.followUp" : "task.complete"}
        data-v={i.msg ? (i.done ? "Clear flag" : "Mark complete") : undefined}
        onClick={(ev) => {
          ev.stopPropagation();
          ctx.select(i.key);
          // A flagged message's circle completes the flag; a task's circle completes the task.
          if (i.msg) ctx.cmd("item.followUp", i.done ? "Clear flag" : "Mark complete");
          else ctx.cmd("task.complete");
        }}
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${i.done ? "border-[#0f6cbd] bg-[#0f6cbd] text-white" : "border-gray-500 hover:bg-gray-100"}`}
      >
        {i.done && <OIcon name="check" size={11} />}
      </button>
      <span className="min-w-0 flex-1">
        <span className={`block truncate ${i.done ? "text-gray-500 line-through" : ""}`}>{i.title}</span>
        <span className="block text-[11.5px] text-gray-500">
          {i.msg ? "Flagged email · " : ""}
          {i.due ? (i.due === todayOf(doc) ? "Due today" : `Due ${fmtLong(i.due).replace(/, \d{4}$/, "")}`) : i.task?.myDay ? "My Day" : ""}
        </span>
      </span>
      {i.task && (
        <button
          type="button"
          aria-label={i.important ? "Remove importance" : "Mark task as important"}
          data-c="todo.important"
          onClick={(ev) => {
            ev.stopPropagation();
            ctx.select(i.key);
            ctx.cmd("todo.important");
          }}
          className={i.important ? "text-[#0f6cbd]" : "text-gray-500"}
        >
          <OIcon name="star" size={16} />
        </button>
      )}
    </div>
  );
  return (
    <div className="flex min-h-0 min-w-0 flex-1 gap-2">
      <section aria-label={cur} className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg bg-[#f0f6fc]">
        <div className="px-4 pb-2 pt-3">
          <h2 className="text-[20px] font-semibold text-[#0f6cbd]">{cur}</h2>
          {cur === "My Day" && <p className="text-[12.5px] text-gray-600">{fmtLong(todayOf(doc))}</p>}
        </div>
        {cur !== "Flagged email" && cur !== "Assigned to me" && (
          <div className="mx-2 mb-2 flex items-center gap-2 rounded-[4px] bg-white px-3 py-2 shadow-[0_0_2px_rgba(0,0,0,0.12)]">
            <OIcon name="plus" size={15} className="text-[#0f6cbd]" />
            <input
              aria-label="Add a task"
              placeholder="Add a task"
              data-t="todo.new"
              value={text}
              onChange={(ev) => setText(ev.target.value)}
              onKeyDown={(ev) => {
                ev.stopPropagation();
                if (ev.key === "Enter" && text.trim()) {
                  ctx.commit({ kind: "type", target: "todo.new", value: text.trim() });
                  setText("");
                }
              }}
              className="flex-1 text-[13.5px] outline-none placeholder:text-[#0f6cbd]"
            />
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-auto pb-2">
          {open.map(row)}
          {!items.length && <p className="px-4 py-6 text-center text-[13px] text-gray-500">{cur === "Flagged email" ? "Flag email messages to see them here." : "Tasks you add show up here."}</p>}
          {done.length > 0 && <div className="px-4 pb-1 pt-2 text-[12.5px] font-semibold text-gray-600">Completed {done.length}</div>}
          {done.map(row)}
        </div>
      </section>
      {(selTask || selMsg) && (
        <aside aria-label="Task details" className="w-64 shrink-0 overflow-auto rounded-lg bg-white p-4 text-[13px] shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]">
          <h3 className="mb-3 text-[15px] font-semibold">{selTask?.subject ?? selMsg?.subject}</h3>
          {selTask && (
            <>
              <button type="button" data-c="todo.myDay" onClick={() => ctx.cmd("todo.myDay")} className="mb-2 flex w-full items-center gap-2 rounded-[4px] border border-gray-200 px-3 py-2 text-left hover:bg-gray-50">
                <OIcon name="sun" size={15} /> {selTask.myDay ? "Added to My Day" : "Add to My Day"}
              </button>
              <NMenuButton
                dd="todo.due"
                ariaLabel="Add due date"
                items={["Today", "Tomorrow", "Next week", "Remove due date"].map((v) => ({ label: v, cmd: "todo.due", val: v, onPick: () => ctx.cmd("todo.due", v) }))}
                className="mb-2 flex w-full items-center gap-2 rounded-[4px] border border-gray-200 px-3 py-2 text-left hover:bg-gray-50"
              >
                <OIcon name="calendar" size={15} /> {selTask.due ? `Due ${fmtLong(selTask.due)}` : "Add due date"}
              </NMenuButton>
            </>
          )}
          {selMsg && (
            <p className="text-gray-600">
              From {selMsg.from.name}. {selMsg.flag?.due ? `Due ${fmtLong(selMsg.flag.due)}.` : ""}
            </p>
          )}
        </aside>
      )}
    </div>
  );
}
