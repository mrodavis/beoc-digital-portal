"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DialogDef, DialogField, SimValue } from "@/types/sim";

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

export function SimDialog({
  def,
  initial,
  onOk,
  onCancel,
}: {
  def: DialogDef;
  initial?: Record<string, SimValue>;
  onOk: (values: Record<string, SimValue>) => void;
  onCancel: () => void;
}) {
  const allFields = useMemo(() => [...(def.fields ?? []), ...(def.tabs ?? []).flatMap((t) => t.fields)], [def]);
  const [values, setValues] = useState<Record<string, SimValue>>(() => ({ ...defaultsOf(allFields), ...(initial ?? {}) }));
  const [tab, setTab] = useState(0);
  const firstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = firstRef.current?.querySelector<HTMLElement>("input,select,button");
    el?.focus();
  }, [tab]);

  const set = (k: string, v: SimValue) => setValues((s) => ({ ...s, [k]: v }));
  const fields = def.tabs ? def.tabs[tab].fields : def.fields ?? [];

  const render = (f: DialogField, i: number) => {
    const id = `dlg-${def.id}-${"key" in f ? f.key : i}`;
    switch (f.type) {
      case "note":
        return <p key={i} className="text-[12px] leading-snug text-gray-600">{f.text}</p>;
      case "select":
        return (
          <label key={f.key} htmlFor={id} className="flex items-center justify-between gap-3">
            <span>{f.label}</span>
            <select id={id} value={String(values[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} className="w-48 rounded-sm border border-gray-400 bg-white px-1 py-0.5">
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
        );
      case "list":
        return (
          <div key={f.key} className="flex flex-col gap-1">
            <span>{f.label}</span>
            <div role="listbox" aria-label={f.label} className="overflow-auto border border-gray-400 bg-white" style={{ height: f.height ?? 120 }}>
              {f.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  role="option"
                  aria-selected={values[f.key] === o}
                  onClick={() => set(f.key, o)}
                  className={`block w-full px-2 py-0.5 text-left ${values[f.key] === o ? "bg-[#0078d4] text-white" : "hover:bg-[#e5f1fb]"}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        );
      case "number":
        return (
          <label key={f.key} htmlFor={id} className="flex items-center justify-between gap-3">
            <span>{f.label}</span>
            <span className="flex items-center gap-1">
              <input
                id={id}
                type="number"
                value={String(values[f.key] ?? "")}
                min={f.min}
                max={f.max}
                step={f.step ?? 1}
                onChange={(e) => set(f.key, e.target.value === "" ? "" : Number(e.target.value))}
                className="w-20 rounded-sm border border-gray-400 px-1 py-0.5"
              />
              {f.suffix && <span className="text-gray-500">{f.suffix}</span>}
            </span>
          </label>
        );
      case "text":
        return (
          <label key={f.key} htmlFor={id} className="flex items-center justify-between gap-3">
            <span>{f.label}</span>
            <input
              id={id}
              type={f.password ? "password" : "text"}
              value={String(values[f.key] ?? "")}
              placeholder={f.placeholder}
              onChange={(e) => set(f.key, e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") onOk(values);
              }}
              className="w-56 rounded-sm border border-gray-400 px-1 py-0.5"
            />
          </label>
        );
      case "checkbox":
        return (
          <label key={f.key} htmlFor={id} className="flex items-center gap-2">
            <input id={id} type="checkbox" checked={Boolean(values[f.key])} onChange={(e) => set(f.key, e.target.checked)} />
            <span>{f.label}</span>
          </label>
        );
      case "radio":
        return (
          <fieldset key={f.key} className="flex flex-col gap-1">
            <legend className="mb-1">{f.label}</legend>
            {f.options.map((o) => (
              <label key={o} className="flex items-center gap-2 pl-2">
                <input type="radio" name={id} checked={values[f.key] === o} onChange={() => set(f.key, o)} />
                <span>{o}</span>
              </label>
            ))}
          </fieldset>
        );
      case "color":
        return (
          <div key={f.key} className="flex items-center justify-between gap-3">
            <span>{f.label}</span>
            <div role="radiogroup" aria-label={f.label} className="flex flex-wrap gap-1">
              {f.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={values[f.key] === o}
                  title={o}
                  aria-label={o}
                  onClick={() => set(f.key, o)}
                  className={`h-5 w-5 border ${values[f.key] === o ? "outline outline-2 outline-[#0078d4]" : "border-gray-300"}`}
                  style={{ background: o.startsWith("#") ? o : o.toLowerCase().replace(/\s/g, "") }}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10" onKeyDown={(e) => e.stopPropagation()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={def.title}
        className="flex max-h-[92%] flex-col border border-gray-400 bg-[#f0f0f0] text-[12px] text-gray-900 shadow-2xl"
        style={{ width: def.width ?? 420 }}
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel();
        }}
      >
        <div className="flex items-center justify-between bg-white px-3 py-1.5">
          <span>{def.title}</span>
          <div className="flex items-center gap-1">
            <span className="px-1 text-gray-500">?</span>
            <button type="button" aria-label="Close" onClick={onCancel} className="px-2 hover:bg-red-600 hover:text-white">✕</button>
          </div>
        </div>
        {def.tabs && (
          <div role="tablist" className="flex gap-0.5 border-b border-gray-300 px-2 pt-2">
            {def.tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={`border border-b-0 px-3 py-1 ${i === tab ? "border-gray-300 bg-white" : "border-transparent"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
        <div ref={firstRef} className="flex flex-col gap-2.5 overflow-auto bg-white p-4">
          {fields.map(render)}
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-300 px-3 py-2">
          <button
            type="button"
            onClick={() => onOk(values)}
            className="min-w-[72px] border border-[#0078d4] bg-[#e5f1fb] px-3 py-1 hover:bg-[#cce4f7]"
          >
            {def.okLabel ?? "OK"}
          </button>
          <button type="button" onClick={onCancel} className="min-w-[72px] border border-gray-400 bg-[#e1e1e1] px-3 py-1 hover:bg-[#e5f1fb]">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
