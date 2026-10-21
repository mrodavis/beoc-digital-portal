"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { DialogDef, DialogField, SimValue } from "@/types/sim";
import { OIcon } from "../parts";

/*
 * Fluent-style building blocks for the new Outlook canvas. Every control that
 * commits carries data-c (command id) and data-v (value), every dialog opener
 * data-dlg, every selectable item data-sel and every typed field data-t, so
 * scripts can drive a simulation the way a learner would.
 */

export type NEntry = {
  label?: string;
  icon?: string;
  color?: string;
  onPick?: () => void;
  sub?: NEntry[];
  separator?: boolean;
  heading?: boolean;
  disabled?: boolean;
  checked?: boolean;
  shortcut?: string;
  /** For scripts and the Ribbon search. */
  cmd?: string;
  val?: string;
  dlg?: string;
};

function List({ items, x, y, onClose, depth = 0 }: { items: NEntry[]; x: number; y: number; onClose: () => void; depth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  const [open, setOpen] = useState<{ i: number; x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let nx = x;
    let ny = y;
    if (nx + r.width > window.innerWidth - 6) nx = depth ? Math.max(6, x - r.width - 200) : Math.max(6, window.innerWidth - r.width - 6);
    if (ny + r.height > window.innerHeight - 6) ny = Math.max(6, window.innerHeight - r.height - 6);
    setPos({ x: nx, y: ny });
  }, [x, y, depth]);
  return (
    <div
      ref={ref}
      role="menu"
      data-nmenu="1"
      className="fixed z-[230] max-h-[420px] min-w-[200px] overflow-auto rounded-md border border-gray-200 bg-white py-1 text-[13px] text-gray-900 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
      style={{ left: pos.x, top: pos.y }}
    >
      {items.map((it, i) => {
        if (it.separator) return <div key={i} className="my-1 border-t border-gray-200" />;
        if (it.heading) return <div key={i} className="px-3 pb-0.5 pt-1.5 text-[11.5px] font-semibold text-gray-500">{it.label}</div>;
        return (
          <div key={i} className="relative">
            <button
              type="button"
              role="menuitem"
              disabled={it.disabled}
              aria-haspopup={it.sub ? "menu" : undefined}
              data-c={it.cmd}
              data-v={it.val}
              data-dlg={it.dlg}
              data-sub={it.sub ? "1" : undefined}
              onMouseEnter={(e) => {
                if (it.sub) {
                  const r = e.currentTarget.getBoundingClientRect();
                  setOpen({ i, x: r.right - 2, y: r.top - 4 });
                } else setOpen(null);
              }}
              onClick={(e) => {
                if (it.sub) {
                  const r = e.currentTarget.getBoundingClientRect();
                  setOpen({ i, x: r.right - 2, y: r.top - 4 });
                  return;
                }
                it.onPick?.();
                onClose();
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-[6px] text-left hover:bg-[#f0f0f0] disabled:opacity-40 ${open?.i === i ? "bg-[#f0f0f0]" : ""}`}
            >
              <span className="flex w-4 shrink-0 justify-center text-gray-700">
                {it.color ? <span className="h-3.5 w-3.5 rounded-sm" style={{ background: it.color }} /> : it.checked ? <OIcon name="check" size={14} /> : it.icon ? <OIcon name={it.icon} size={15} /> : null}
              </span>
              <span className="flex-1 whitespace-nowrap">{it.label}</span>
              {it.shortcut && <span className="pl-4 text-[11px] text-gray-500">{it.shortcut}</span>}
              {it.sub && <OIcon name="chevronRight" size={12} />}
            </button>
            {open?.i === i && it.sub && <List items={it.sub} x={open.x} y={open.y} onClose={onClose} depth={depth + 1} />}
          </div>
        );
      })}
    </div>
  );
}

export function NMenu({ x, y, items, onClose }: { x: number; y: number; items: NEntry[]; onClose: () => void }) {
  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("[data-nmenu]")) onClose();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    document.addEventListener("keydown", key);
    window.addEventListener("resize", onClose);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", onClose);
    };
  }, [onClose]);
  return <List items={items} x={x} y={y} onClose={onClose} />;
}

/** A button that opens a menu below itself. */
export function NMenuButton({
  items, className, children, title, ariaLabel, dd,
}: { items: NEntry[]; className?: string; children: ReactNode; title?: string; ariaLabel?: string; dd?: string }) {
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);
  return (
    <>
      <button
        type="button"
        title={title}
        aria-label={ariaLabel ?? title}
        aria-haspopup="menu"
        data-dd={dd ?? "1"}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setAt({ x: r.left, y: r.bottom + 2 });
        }}
        className={className}
      >
        {children}
      </button>
      {at && <NMenu x={at.x} y={at.y} items={items} onClose={() => setAt(null)} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Fluent dialog                                                       */
/* ------------------------------------------------------------------ */

export function FluentModal({
  title, children, onClose, width = 460, footer, subtitle,
}: { title: string; children: ReactNode; onClose: () => void; width?: number; footer?: ReactNode; subtitle?: string }) {
  return (
    <div
      className="absolute inset-0 z-[80] flex items-center justify-center bg-black/25 p-3"
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Escape") onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={title} className="flex max-h-full flex-col rounded-lg bg-white text-[13px] text-gray-900 shadow-[0_12px_40px_rgba(0,0,0,0.3)]" style={{ width, maxWidth: "100%" }}>
        <div className="flex items-start justify-between gap-3 px-5 pb-2 pt-4">
          <div>
            <h2 className="text-[17px] font-semibold">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[12.5px] text-gray-600">{subtitle}</p>}
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded p-1 text-gray-600 hover:bg-gray-100">
            <OIcon name="close" size={14} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 pb-3">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-5 pb-4 pt-1">{footer}</div>}
      </div>
    </div>
  );
}

export function FButton({ children, onClick, primary, disabled, ok, ariaLabel, cmd, val }: { children: ReactNode; onClick: () => void; primary?: boolean; disabled?: boolean; ok?: boolean; ariaLabel?: string; cmd?: string; val?: string }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      data-ok={ok ? "1" : undefined}
      data-c={cmd}
      data-v={val}
      className={`min-w-[80px] rounded-[4px] border px-3.5 py-[5px] text-[13px] font-semibold disabled:opacity-50 ${primary ? "border-[#0f6cbd] bg-[#0f6cbd] text-white hover:bg-[#115ea3]" : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"}`}
    >
      {children}
    </button>
  );
}

export function Switch({ on, onChange, label, f }: { on: boolean; onChange: (v: boolean) => void; label: string; f?: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-[13px]">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        data-f={f}
        onClick={() => onChange(!on)}
        className={`relative h-5 w-10 rounded-full border ${on ? "border-[#0f6cbd] bg-[#0f6cbd]" : "border-gray-500 bg-white"}`}
      >
        <span className={`absolute top-[2px] h-3.5 w-3.5 rounded-full ${on ? "left-[22px] bg-white" : "left-[3px] bg-gray-600"}`} />
      </button>
      <span>{label}</span>
    </label>
  );
}

function defaultsOf(fields: DialogField[]): Record<string, SimValue> {
  const out: Record<string, SimValue> = {};
  for (const f of fields) {
    if (f.type === "note") continue;
    if (f.type === "checkbox") out[f.key] = f.default ?? false;
    else if (f.type === "number") out[f.key] = f.default ?? 0;
    else if (f.type === "select" || f.type === "radio" || f.type === "list" || f.type === "color") out[f.key] = f.default ?? f.options[0] ?? "";
    else out[f.key] = f.default ?? "";
  }
  return out;
}

export const inputCls = "w-full rounded-[4px] border border-gray-300 bg-white px-2 py-[5px] text-[13px] outline-none focus:border-[#0f6cbd] focus:shadow-[inset_0_-2px_0_#0f6cbd]";

/** Renders any DialogDef in Fluent style. */
export function FluentDialog({
  def, initial, onOk, onCancel, okLabel, extra,
}: { def: DialogDef; initial?: Record<string, SimValue>; onOk: (v: Record<string, SimValue>) => void; onCancel: () => void; okLabel?: string; extra?: ReactNode }) {
  const fields = useMemo(() => [...(def.fields ?? []), ...(def.tabs ?? []).flatMap((t) => t.fields)], [def]);
  const [values, setValues] = useState<Record<string, SimValue>>(() => ({ ...defaultsOf(fields), ...(initial ?? {}) }));
  const set = (k: string, v: SimValue) => setValues((s) => ({ ...s, [k]: v }));
  const render = (f: DialogField, i: number) => {
    switch (f.type) {
      case "note":
        return <p key={i} className="text-[12.5px] leading-snug text-gray-600">{f.text}</p>;
      case "select":
        return (
          <label key={f.key} className="flex flex-col gap-1">
            <span className="font-semibold">{f.label}</span>
            <select data-f={f.key} value={String(values[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} className={inputCls}>
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
        );
      case "list":
        return (
          <div key={f.key} className="flex flex-col gap-1">
            <span className="font-semibold">{f.label}</span>
            <div role="listbox" aria-label={f.label} className="overflow-auto rounded border border-gray-300" style={{ height: f.height ?? 150 }}>
              {f.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  role="option"
                  aria-selected={String(values[f.key]) === o}
                  data-f={f.key}
                  data-v={o.trim()}
                  onClick={() => set(f.key, o)}
                  onDoubleClick={() => onOk({ ...values, [f.key]: o })}
                  className={`flex w-full items-center gap-2 px-2 py-1 text-left ${String(values[f.key]) === o ? "bg-[#ebf3fc] font-semibold" : "hover:bg-gray-50"}`}
                >
                  <OIcon name="folder" size={14} className="text-gray-500" />
                  <span className="whitespace-pre">{o}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case "radio":
        return (
          <fieldset key={f.key} className="flex flex-col gap-1.5">
            <legend className="mb-1 font-semibold">{f.label}</legend>
            {f.options.map((o) => (
              <label key={o} className="flex items-start gap-2">
                <input type="radio" name={`${def.id}-${f.key}`} data-f={f.key} data-v={o} checked={String(values[f.key]) === o} onChange={() => set(f.key, o)} className="mt-0.5 accent-[#0f6cbd]" />
                <span>{o}</span>
              </label>
            ))}
          </fieldset>
        );
      case "checkbox":
        return (
          <label key={f.key} className="flex items-center gap-2">
            <input type="checkbox" data-f={f.key} checked={Boolean(values[f.key])} onChange={(e) => set(f.key, e.target.checked)} className="accent-[#0f6cbd]" />
            <span>{f.label}</span>
          </label>
        );
      case "number":
        return (
          <label key={f.key} className="flex flex-col gap-1">
            <span className="font-semibold">{f.label}</span>
            <input type="number" data-f={f.key} min={f.min} max={f.max} step={f.step} value={Number(values[f.key] ?? 0)} onChange={(e) => set(f.key, Number(e.target.value))} onKeyDown={(e) => e.stopPropagation()} className={`${inputCls} w-28`} />
          </label>
        );
      case "color":
        return null;
      default:
        return (
          <label key={f.key} className="flex flex-col gap-1">
            <span className="font-semibold">{f.label}</span>
            <input
              data-f={f.key}
              value={String(values[f.key] ?? "")}
              placeholder={f.placeholder}
              onChange={(e) => set(f.key, e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") onOk(values);
              }}
              className={inputCls}
            />
          </label>
        );
    }
  };
  return (
    <FluentModal
      title={def.title}
      width={def.width ? Math.max(def.width, 420) : 460}
      onClose={onCancel}
      footer={
        <>
          <FButton primary ok onClick={() => onOk(values)}>
            {okLabel ?? def.okLabel ?? "OK"}
          </FButton>
          <FButton onClick={onCancel}>Cancel</FButton>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        {fields.map(render)}
        {extra}
      </div>
    </FluentModal>
  );
}

/** Wait until `test` passes (the player applied the commit) or give up. */
export async function settle(test: () => boolean, ms = 500): Promise<boolean> {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (test()) return true;
    await new Promise((r) => setTimeout(r, 8));
  }
  return test();
}
