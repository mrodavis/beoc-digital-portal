"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { RibbonControl, RibbonOption, RibbonTab, SimValue } from "@/types/sim";
import { OIcon } from "../parts";
import { NMenuButton, type NEntry } from "./ui";
import { VALUE_FACE } from "./ribbon";

type Handlers = { onCmd: (id: string, value?: SimValue) => void; onDialog: (id: string) => void };

function optionEntries(c: Extract<RibbonControl, { type: "dropdown" | "gallery" }>, h: Handlers, state: Record<string, SimValue | undefined>): NEntry[] {
  const cur = state[("stateKey" in c && c.stateKey) || c.id];
  return c.options.map((o: RibbonOption) =>
    o.heading
      ? { heading: true, label: o.label ?? o.value }
      : {
          label: o.label ?? o.value,
          icon: o.icon,
          color: o.color,
          checked: cur !== undefined && String(cur).toLowerCase() === o.value.toLowerCase(),
          cmd: o.dialog ? undefined : o.command ?? c.id,
          val: o.dialog ? undefined : o.value,
          dlg: o.dialog,
          onPick: () => (o.dialog ? h.onDialog(o.dialog) : h.onCmd(o.command ?? c.id, o.value)),
        },
  );
}

function Control({ c, h, state }: { c: RibbonControl; h: Handlers; state: Record<string, SimValue | undefined> }) {
  const base = "flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[4px] px-2 text-[13px] text-gray-800 hover:bg-[#ebebeb]";
  if (c.type === "separator") return <span className="mx-1 h-5 w-px shrink-0 bg-gray-300" aria-hidden="true" />;
  if (c.type === "button") {
    return (
      <button
        type="button"
        title={c.shortcut ? `${c.label} (${c.shortcut})` : c.label}
        aria-label={c.label}
        data-c={c.dialog ? undefined : c.id}
        data-dlg={c.dialog}
        onClick={() => (c.dialog ? h.onDialog(c.dialog) : h.onCmd(c.id))}
        className={base}
      >
        {c.icon && <OIcon name={c.icon} size={17} className="text-[#0f6cbd]" />}
        {c.showLabel !== false && c.icon && <span>{c.label}</span>}
        {!c.icon && <span>{c.label}</span>}
      </button>
    );
  }
  if (c.type === "toggle") {
    const on = Boolean(state[c.stateKey ?? c.id]);
    return (
      <button type="button" aria-pressed={on} aria-label={c.label} title={c.shortcut ? `${c.label} (${c.shortcut})` : c.label} data-c={c.id} onClick={() => h.onCmd(c.id)} className={`${base} ${on ? "bg-[#e0e0e0]" : ""}`}>
        {c.icon && <OIcon name={c.icon} size={17} className="text-[#0f6cbd]" />}
        {c.showLabel !== false && c.icon ? <span>{c.label}</span> : null}
      </button>
    );
  }
  if (c.type === "dropdown" && c.combo) {
    const v = String(state[c.stateKey ?? c.id] ?? c.options[0]?.value ?? "");
    return (
      <select aria-label={c.label} data-c={c.id} value={v} onChange={(e) => h.onCmd(c.id, e.target.value)} className="h-7 shrink-0 rounded-[4px] border border-gray-300 bg-white px-1 text-[12.5px]" style={{ width: c.width ?? 90 }}>
        {(c.options.some((o) => o.value === v) ? c.options : [{ value: v }, ...c.options]).map((o) => (
          <option key={o.value} value={o.value}>
            {o.label ?? o.value}
          </option>
        ))}
      </select>
    );
  }
  if (c.type === "dropdown" || c.type === "gallery") {
    const entries = optionEntries(c, h, state);
    const icon = "icon" in c ? c.icon : undefined;
    if (c.type === "dropdown" && c.split) {
      const face = c.options.find((o) => o.value === c.faceValue) ?? c.options[0];
      const faceCmd = face?.command ?? c.id;
      return (
        <span className="flex shrink-0 items-center">
          <button
            type="button"
            aria-label={c.label}
            title={c.label}
            data-c={face?.dialog ? undefined : faceCmd}
            data-v={face?.dialog || face?.command ? undefined : face?.value}
            data-dlg={face?.dialog}
            onClick={() => (face?.dialog ? h.onDialog(face.dialog) : face?.command ? h.onCmd(face.command) : h.onCmd(c.id, c.faceValue))}
            className={`${base} rounded-r-none pr-1`}
          >
            {icon && <OIcon name={icon} size={17} className="text-[#0f6cbd]" />}
            <span>{c.label}</span>
          </button>
          <NMenuButton dd={c.id} ariaLabel={`${c.label} options`} items={entries} className="flex h-8 items-center rounded-r-[4px] px-1 text-gray-600 hover:bg-[#ebebeb]">
            <OIcon name="chevronDown" size={11} />
          </NMenuButton>
        </span>
      );
    }
    const cur = VALUE_FACE.has(c.id) ? state[("stateKey" in c && c.stateKey) || c.id] : undefined;
    const curOpt = cur === undefined ? undefined : c.options.find((o) => o.value.toLowerCase() === String(cur).toLowerCase());
    const face = cur === undefined ? c.label : curOpt ? curOpt.label ?? curOpt.value : String(cur);
    return (
      <NMenuButton dd={c.id} ariaLabel={c.label} title={c.label} items={entries} className={base}>
        {icon && <OIcon name={icon} size={17} className="text-[#0f6cbd]" />}
        <span>{face}</span>
        <OIcon name="chevronDown" size={11} className="text-gray-600" />
      </NMenuButton>
    );
  }
  return null;
}

function overflowEntry(c: RibbonControl, h: Handlers, state: Record<string, SimValue | undefined>): NEntry | null {
  if (c.type === "separator") return { separator: true };
  if (c.type === "button") return { label: c.label, icon: c.icon, cmd: c.dialog ? undefined : c.id, dlg: c.dialog, onPick: () => (c.dialog ? h.onDialog(c.dialog) : h.onCmd(c.id)) };
  if (c.type === "toggle") return { label: c.label, icon: c.icon, checked: Boolean(state[c.stateKey ?? c.id]), cmd: c.id, onPick: () => h.onCmd(c.id) };
  if (c.type === "dropdown" || c.type === "gallery") return { label: c.label, icon: "icon" in c ? c.icon : undefined, sub: optionEntries(c, h, state) };
  return null;
}

export function RibbonBar({
  tabs, active, setActive, state, h, onToggleFolders, collapsed, onCollapse,
}: {
  tabs: RibbonTab[];
  active: string;
  setActive: (id: string) => void;
  state: Record<string, SimValue | undefined>;
  h: Handlers;
  onToggleFolders?: () => void;
  collapsed?: boolean;
  onCollapse?: () => void;
}) {
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  const controls: RibbonControl[] = [];
  tab?.groups.forEach((g, i) => {
    if (i > 0 && g.controls.length) controls.push({ type: "separator" });
    controls.push(...g.controls);
  });
  const rowRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(controls.length);
  const [w, setW] = useState(0);
  useLayoutEffect(() => setFit(controls.length), [tab?.id, w, controls.length]);
  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const limit = el.clientWidth - 44;
    const kids = Array.from(el.querySelectorAll<HTMLElement>(":scope > [data-rc]"));
    let n = kids.length;
    for (let i = 0; i < kids.length; i++) {
      if (kids[i].offsetLeft + kids[i].offsetWidth > limit) {
        n = i;
        break;
      }
    }
    if (n < fit) setFit(n);
  });
  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setW(Math.round(el.clientWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const shown = controls.slice(0, fit);
  while (shown.length && shown[shown.length - 1].type === "separator") shown.pop();
  const hidden = controls.slice(fit).map((c) => overflowEntry(c, h, state)).filter(Boolean) as NEntry[];
  while (hidden.length && hidden[0].separator) hidden.shift();
  return (
    <div className="shrink-0 select-none bg-[#f5f5f5] px-2 pb-1.5">
      <div role="tablist" className="flex items-center gap-1 pb-1 text-[13px]">
        {onToggleFolders && (
          <button type="button" aria-label="Show or hide the folder pane" title="Show navigation pane" data-c="view.folderPane" onClick={onToggleFolders} className="mr-1 rounded p-1 text-gray-700 hover:bg-[#e6e6e6]">
            <OIcon name="hamburger" size={16} />
          </button>
        )}
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            data-tab={t.id}
            aria-selected={t.id === tab?.id}
            onClick={() => setActive(t.id)}
            className={`relative rounded px-2.5 py-1 ${t.id === tab?.id ? "font-semibold text-gray-900" : "text-gray-700 hover:bg-[#e6e6e6]"}`}
          >
            {t.label}
            {t.id === tab?.id && <span className="absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full bg-[#0f6cbd]" />}
          </button>
        ))}
      </div>
      {!collapsed && tab && (
        <div ref={rowRef} role="toolbar" aria-label={`${tab.label} commands`} className="relative flex h-10 items-center gap-0.5 overflow-hidden rounded-lg bg-white px-1.5 shadow-[0_0_2px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]">
          {shown.map((c, i) => (
            <span key={`${tab.id}-${i}`} data-rc="1" className="flex shrink-0 items-center">
              <Control c={c} h={h} state={state} />
            </span>
          ))}
          <span className="flex-1" />
          {hidden.length > 0 && (
            <NMenuButton dd="__more" ariaLabel="More options" title="More options" items={hidden} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] hover:bg-[#ebebeb]">
              <OIcon name="more" size={16} />
            </NMenuButton>
          )}
          {onCollapse && (
            <button type="button" aria-label="Ribbon layout" title="Ribbon layout" onClick={onCollapse} className="flex h-8 w-6 shrink-0 items-center justify-center rounded hover:bg-[#ebebeb]">
              <OIcon name="chevronDown" size={11} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
