"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import type { EhrDoc } from "./types";
import type { EhrField, EhrForm, FieldOpt, FormCtx } from "./forms";

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export type MenuEntry = { label: string; onPick: () => void; disabled?: boolean; danger?: boolean } | { separator: true };

export type Ehr = {
  doc: EhrDoc;
  ui: SimUi;
  sel: string;
  select: (s: string) => void;
  commit: (c: SimCommit) => void;
  cmd: (id: string, value?: SimValue) => void;
  type: (target: string, value: string) => void;
  openForm: (id: string, ctx?: FormCtx, initial?: Record<string, SimValue>) => void;
  menu: (e: { clientX: number; clientY: number }, items: MenuEntry[]) => void;
  openPatient: (pid: string) => void;
};

export const EhrContext = createContext<Ehr | null>(null);

export function useEhr(): Ehr {
  const v = useContext(EhrContext);
  if (!v) throw new Error("useEhr outside the EHR canvas");
  return v;
}

/* ------------------------------------------------------------------ */
/* Icons (24×24 line icons)                                            */
/* ------------------------------------------------------------------ */

const PATHS: Record<string, string> = {
  search: "M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.43 1.06-1.06-4.43-4.43A6.5 6.5 0 0 0 10.5 4zm0 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10z",
  chart: "M5 3h9l5 5v13H5V3zm8.5 1.5V9h4.5M8 12h8M8 15h8M8 18h5",
  calendar: "M4 6h16v14H4V6zm0 4h16M8 3v5M16 3v5M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 16.5h2M11 16.5h2",
  board: "M3.5 5h4.5v14H3.5V5zm6.25 0h4.5v9h-4.5V5zm6.25 0h4.5v11.5H16V5z",
  shield: "M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6l7-3zm-3 9l2.2 2.2L15.5 10",
  book: "M5 4.5h6a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H5V4.5zm14 0h-6M19 4.5V18h-6",
  receipt: "M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21V3zm3 5h6M9 11h6M9 14h4",
  claim: "M4 4h16v16H4V4zm0 5h16M9 9v11M12.5 12.5h4.5M12.5 15.5h4.5",
  bars: "M4 20h16M6.5 20V11M11 20V5M15.5 20v-6M20 20V8",
  eye: "M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zm9.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  lock: "M6.5 10.5h11V20h-11v-9.5zm2.5 0V8a3 3 0 0 1 6 0v2.5",
  logout: "M14 4h5v16h-5M10 8l-4 4 4 4M6 12h9",
  alert: "M12 3.5l9.5 16.5h-19L12 3.5zm0 6v5M12 17v.6",
  x: "M6 6l12 12M18 6L6 18",
  check: "M5 12.5l4.5 4.5L19 7.5",
  flag: "M6 21V4m0 0h11l-2 4 2 4H6",
  plus: "M12 5v14M5 12h14",
  left: "M15 5l-7 7 7 7",
  right: "M9 5l7 7-7 7",
  user: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-7 16c0-3.3 3.1-6 7-6s7 2.7 7 6",
  card: "M3 6h18v12H3V6zm0 4h18M6 14.5h5",
  pen: "M4 20l4-1 11-11-3-3L5 16l-1 4zm10.5-13.5l3 3",
  dots: "M6 12h.01M12 12h.01M18 12h.01",
  report: "M5 3h14v18H5V3zm3.5 4h7M8.5 10.5h7M8.5 14h4",
  pill: "M8.5 15.5l7-7a3.5 3.5 0 0 1 5 5l-7 7a3.5 3.5 0 0 1-5-5zm3.5-3.5l5 5",
  flask: "M9.5 3h5M10.5 3v6L5 19.5h14L13.5 9V3M7.5 15h9",
  image: "M4 5h16v14H4V5zm2.5 11l4-5 3 3.5 2-2 3 3.5M15.5 8.5h.01",
  referral: "M4 12h12m-4-4 4 4-4 4M20 5v14",
  set: "M5 5h6v6H5V5zm8 0h6v6h-6V5zM5 13h6v6H5v-6zm8 0h6v6h-6v-6z",
};

export function Icon({ name, size = 16, className = "", strokeWidth = 1.7 }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const filled = name === "search";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name] ?? PATHS.chart} />
    </svg>
  );
}

export function StarMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#c2410c" />
      <path d="M12 4.5l1.9 5.2 5.6.3-4.4 3.4 1.5 5.4L12 15.7l-4.6 3.1 1.5-5.4L4.5 10l5.6-.3L12 4.5z" fill="#fff7ed" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Basic pieces                                                        */
/* ------------------------------------------------------------------ */

export function Btn({
  children,
  onClick,
  disabled,
  tone = "default",
  label,
  title,
  icon,
  small,
}: {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "default" | "primary" | "danger" | "ghost" | "warn";
  label?: string;
  title?: string;
  icon?: string;
  small?: boolean;
}) {
  const tones: Record<string, string> = {
    default: "border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
    primary: "border-sky-800 bg-sky-700 text-white hover:bg-sky-600",
    danger: "border-rose-800 bg-rose-700 text-white hover:bg-rose-600",
    warn: "border-amber-600 bg-amber-50 text-amber-900 hover:bg-amber-100",
    ghost: "border-transparent bg-transparent text-sky-800 hover:bg-sky-50",
  };
  return (
    <button
      type="button"
      aria-label={label}
      title={title ?? label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-[3px] border font-semibold disabled:cursor-not-allowed disabled:opacity-45 ${small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]"} ${tones[tone]}`}
    >
      {icon && <Icon name={icon} size={small ? 12 : 14} />}
      {children}
    </button>
  );
}

export function Panel({ title, right, children, className = "", bodyClass = "" }: { title?: ReactNode; right?: ReactNode; children: ReactNode; className?: string; bodyClass?: string }) {
  return (
    <section className={`rounded-[3px] border border-slate-300 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] ${className}`}>
      {(title || right) && (
        <header className="flex min-h-[28px] items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-2.5 py-1">
          <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-600">{title}</h3>
          {right && <div className="flex items-center gap-1.5">{right}</div>}
        </header>
      )}
      <div className={bodyClass || "p-2.5"}>{children}</div>
    </section>
  );
}

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "green" | "red" | "amber" | "blue" | "orange" | "violet" | "teal" }) {
  const t: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 ring-slate-300",
    green: "bg-emerald-50 text-emerald-800 ring-emerald-300",
    red: "bg-rose-50 text-rose-800 ring-rose-300",
    amber: "bg-amber-50 text-amber-900 ring-amber-300",
    blue: "bg-sky-50 text-sky-800 ring-sky-300",
    orange: "bg-orange-50 text-orange-800 ring-orange-300",
    violet: "bg-violet-50 text-violet-800 ring-violet-300",
    teal: "bg-teal-50 text-teal-800 ring-teal-300",
  };
  return <span className={`inline-flex items-center whitespace-nowrap rounded-[3px] px-1.5 py-[1px] text-[10.5px] font-semibold ring-1 ring-inset ${t[tone]}`}>{children}</span>;
}

export function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="mb-0.5 block text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">
      {children}
      {required && <span className="text-rose-600"> *</span>}
    </span>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="px-3 py-6 text-center text-[12px] text-slate-500">{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Committing fields                                                   */
/* ------------------------------------------------------------------ */

const inputCls =
  "h-[26px] w-full rounded-[3px] border border-slate-300 bg-white px-1.5 text-[12.5px] text-slate-900 shadow-inner outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200 disabled:bg-slate-50 disabled:text-slate-600";

/** A text field that commits a "type" action on Enter or when focus leaves it, only if the value changed. */
export function EField({
  target,
  value,
  label,
  placeholder,
  disabled,
  className = "",
  mono,
  multiline,
  width,
  required,
  onFocus,
}: {
  target: string;
  value?: string | number;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  mono?: boolean;
  multiline?: boolean;
  width?: number | string;
  required?: boolean;
  onFocus?: () => void;
}) {
  const { type } = useEhr();
  const base = value === undefined || value === null ? "" : String(value);
  const [draft, setDraft] = useState<string | null>(null);
  const draftRef = useRef<string | null>(null);
  useEffect(() => {
    draftRef.current = null;
    setDraft(null);
  }, [base]);
  const set = (s: string | null) => {
    draftRef.current = s;
    setDraft(s);
  };
  const commit = () => {
    const d = draftRef.current;
    set(null);
    if (d !== null && d !== base) type(target, d);
  };
  const common = {
    "aria-label": label ?? target,
    value: draft ?? base,
    placeholder,
    disabled,
    onFocus,
    onChange: (e: { target: { value: string } }) => set(e.target.value),
    onBlur: commit,
  };
  const field = multiline ? (
    <textarea
      {...common}
      rows={3}
      onKeyDown={(e) => {
        if (e.key === "Escape") set(null);
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) commit();
      }}
      className={`${inputCls} h-auto min-h-[64px] py-1 leading-snug ${mono ? "font-mono" : ""}`}
    />
  ) : (
    <input
      {...common}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commit();
        } else if (e.key === "Escape") set(null);
      }}
      className={`${inputCls} ${mono ? "font-mono tracking-tight" : ""}`}
      style={width ? { width } : undefined}
    />
  );
  if (!label) return <span className={className}>{field}</span>;
  return (
    <label className={`block ${className}`}>
      <Label required={required}>{label}</Label>
      {field}
    </label>
  );
}

/** A dropdown field that commits a "type" action as soon as a different option is chosen. */
export function ESelect({ target, value, options, label, disabled, className = "", placeholder = "Select…", required }: { target: string; value?: string; options: FieldOpt[]; label?: string; disabled?: boolean; className?: string; placeholder?: string; required?: boolean }) {
  const { type } = useEhr();
  const v = value ?? "";
  const known = options.some((o) => o.value === v);
  const sel = (
    <select
      aria-label={label ?? target}
      value={v}
      disabled={disabled}
      onChange={(e) => {
        if (e.target.value !== v) type(target, e.target.value);
      }}
      className={`${inputCls} pr-6`}
    >
      {(!v || !known) && <option value={v}>{v && !known ? v : placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label ?? o.value}
        </option>
      ))}
    </select>
  );
  if (!label) return <span className={className}>{sel}</span>;
  return (
    <label className={`block ${className}`}>
      <Label required={required}>{label}</Label>
      {sel}
    </label>
  );
}

export function ReadField({ label, value, mono, className = "" }: { label: string; value?: ReactNode; mono?: boolean; className?: string }) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className={`min-h-[26px] rounded-[3px] border border-transparent px-0.5 py-[3px] text-[12.5px] text-slate-900 ${mono ? "font-mono" : ""}`}>{value || <span className="text-slate-400">None</span>}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tables                                                              */
/* ------------------------------------------------------------------ */

export function Table({ head, children, dense, className = "" }: { head: ReactNode[]; children: ReactNode; dense?: boolean; className?: string }) {
  return (
    <table className={`w-full border-collapse text-left text-[12px] ${className}`}>
      <thead>
        <tr className="bg-slate-100 text-[10.5px] uppercase tracking-wide text-slate-600">
          {head.map((h, i) => (
            <th key={i} className={`border-b border-slate-300 px-2 font-semibold ${dense ? "py-1" : "py-1.5"}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function Row({ selected, onClick, onDoubleClick, onContextMenu, children, label, tone }: { selected?: boolean; onClick?: () => void; onDoubleClick?: () => void; onContextMenu?: (e: React.MouseEvent) => void; children: ReactNode; label?: string; tone?: "warn" | "muted" }) {
  return (
    <tr
      aria-selected={selected}
      aria-label={label}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" && onDoubleClick) onDoubleClick();
        else if ((e.key === " " || e.key === "Enter") && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`border-b border-slate-200 outline-none ${onClick ? "cursor-pointer" : ""} ${selected ? "bg-sky-100 ring-1 ring-inset ring-sky-500" : tone === "warn" ? "bg-amber-50/70 hover:bg-sky-50" : tone === "muted" ? "text-slate-400 hover:bg-sky-50" : "hover:bg-sky-50"} focus-visible:ring-2 focus-visible:ring-sky-400`}
    >
      {children}
    </tr>
  );
}

export const Td = ({ children, className = "", mono }: { children?: ReactNode; className?: string; mono?: boolean }) => <td className={`px-2 py-1 align-top ${mono ? "font-mono" : ""} ${className}`}>{children}</td>;

/* ------------------------------------------------------------------ */
/* Modal forms                                                         */
/* ------------------------------------------------------------------ */

export function Modal({ title, subtitle, tone = "default", children, footer, onClose, width = 460 }: { title: string; subtitle?: string; tone?: "default" | "warn" | "danger"; children: ReactNode; footer: ReactNode; onClose?: () => void; width?: number }) {
  const bar = tone === "danger" ? "bg-rose-800" : tone === "warn" ? "bg-amber-700" : "bg-slate-800";
  return (
    <div className="absolute inset-0 z-40 flex items-start justify-center overflow-auto bg-slate-950/45 p-3 pt-8" role="dialog" aria-modal="true" aria-label={title}>
      <div className="flex max-h-full w-full flex-col overflow-hidden rounded-[4px] border border-slate-500 bg-white shadow-2xl" style={{ maxWidth: width }}>
        <div className={`flex items-center gap-2 px-3 py-2 text-white ${bar}`}>
          {tone !== "default" && <Icon name="alert" size={16} />}
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold leading-tight">{title}</div>
            {subtitle && <div className="truncate text-[11px] text-white/75">{subtitle}</div>}
          </div>
          {onClose && (
            <button type="button" aria-label="Close" onClick={onClose} className="rounded p-0.5 hover:bg-white/15">
              <Icon name="x" size={16} />
            </button>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-3 text-[12.5px] text-slate-800">{children}</div>
        <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-3 py-2">{footer}</div>
      </div>
    </div>
  );
}

function defaultsFor(fields: EhrField[]): Record<string, SimValue> {
  const out: Record<string, SimValue> = {};
  for (const f of fields) {
    if (f.type === "note") continue;
    if (f.type === "checkbox") out[f.key] = false;
    else if (f.type === "fixed") out[f.key] = f.value;
    else if (f.type === "select" && f.options.length === 1) out[f.key] = f.options[0].value;
    else out[f.key] = "";
  }
  return out;
}

export function FormModal({ form, initial, onOk, onCancel }: { form: EhrForm; initial?: Record<string, SimValue>; onOk: (values: Record<string, SimValue>) => void; onCancel?: () => void }) {
  const [values, setValues] = useState<Record<string, SimValue>>(() => ({ ...defaultsFor(form.fields), ...(form.initial ?? {}), ...(initial ?? {}) }));
  const set = (k: string, v: SimValue) => setValues((s) => ({ ...s, [k]: v }));
  const missing = useMemo(
    () =>
      form.fields.filter((f) => {
        if (f.type === "note" || f.type === "fixed" || !("required" in f) || !f.required) return false;
        const v = values[f.key];
        return f.type === "checkbox" ? v !== true : v === "" || v === undefined;
      }),
    [form.fields, values],
  );
  const submit = () => {
    if (missing.length) return;
    const out: Record<string, SimValue> = {};
    for (const f of form.fields) {
      if (f.type === "note" || f.type === "password") continue;
      out[f.key] = values[f.key] ?? "";
    }
    onOk(out);
  };
  return (
    <Modal
      title={form.title}
      subtitle={form.subtitle}
      tone={form.tone}
      onClose={onCancel}
      width={form.width}
      footer={
        <>
          {missing.length > 0 && <span className="mr-auto self-center text-[11px] text-rose-700">Complete: {missing.map((f) => ("label" in f ? f.label : "")).join(", ")}</span>}
          {onCancel && <Btn onClick={onCancel}>Cancel</Btn>}
          <Btn tone={form.tone === "danger" ? "danger" : "primary"} onClick={submit} disabled={missing.length > 0}>
            {form.okLabel}
          </Btn>
        </>
      }
    >
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && onCancel) onCancel();
        }}
      >
        {form.fields.map((f, i) => (
          <FormField key={"key" in f ? f.key : `n${i}`} f={f} value={"key" in f ? values[f.key] : undefined} set={set} />
        ))}
        <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
      </form>
    </Modal>
  );
}

function FormField({ f, value, set }: { f: EhrField; value: SimValue | undefined; set: (k: string, v: SimValue) => void }) {
  switch (f.type) {
    case "note": {
      const tone = f.tone === "danger" ? "border-rose-300 bg-rose-50 text-rose-900" : f.tone === "warn" ? "border-amber-300 bg-amber-50 text-amber-900" : f.tone === "plain" ? "border-slate-200 bg-slate-50 text-slate-800" : "border-sky-200 bg-sky-50 text-sky-900";
      return (
        <div className={`col-span-2 rounded-[3px] border px-2.5 py-2 text-[12px] leading-snug ${tone}`}>
          <div className={f.lines ? "font-semibold" : ""}>{f.text}</div>
          {f.lines?.map((l, i) => (
            <div key={i} className="mt-0.5">
              {l}
            </div>
          ))}
        </div>
      );
    }
    case "fixed":
      return (
        <div className="col-span-2">
          <Label>{f.label}</Label>
          <div className="rounded-[3px] bg-slate-100 px-2 py-1 text-[12.5px] font-semibold text-slate-800">{f.display ?? f.value}</div>
        </div>
      );
    case "text":
      return (
        <label className={`block ${f.multiline ? "col-span-2" : f.money ? "" : "col-span-2"}`}>
          <Label required={f.required}>{f.label}</Label>
          {f.multiline ? (
            <textarea aria-label={f.label} value={String(value ?? "")} onChange={(e) => set(f.key, e.target.value)} rows={3} className={`${inputCls} h-auto py-1`} />
          ) : (
            <span className="relative block">
              {f.money && <span className="pointer-events-none absolute left-1.5 top-[4px] text-[12.5px] text-slate-500">$</span>}
              <input aria-label={f.label} value={String(value ?? "")} placeholder={f.placeholder} onChange={(e) => set(f.key, e.target.value)} className={`${inputCls} ${f.money ? "pl-4 text-right font-mono" : ""}`} />
            </span>
          )}
        </label>
      );
    case "password":
      return (
        <label className="col-span-2 block">
          <Label required={f.required}>{f.label}</Label>
          <input aria-label={f.label} type="password" value={String(value ?? "")} onChange={(e) => set(f.key, e.target.value)} className={inputCls} />
        </label>
      );
    case "checkbox":
      return (
        <label className="col-span-2 flex items-start gap-2 text-[12.5px]">
          <input type="checkbox" checked={value === true} onChange={(e) => set(f.key, e.target.checked)} className="mt-[2px] h-3.5 w-3.5 accent-sky-700" />
          <span>
            {f.label}
            {f.required && <span className="text-rose-600"> *</span>}
          </span>
        </label>
      );
    case "select":
      return (
        <label className={`block ${f.wide ? "col-span-2" : ""}`}>
          <Label required={f.required}>{f.label}</Label>
          <select aria-label={f.label} value={String(value ?? "")} onChange={(e) => set(f.key, e.target.value)} className={inputCls}>
            <option value="">Select…</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label ?? o.value}
              </option>
            ))}
          </select>
        </label>
      );
    case "radio":
      return (
        <fieldset className="col-span-2">
          <Label required={f.required}>{f.label}</Label>
          <div className="flex flex-col gap-1">
            {f.options.map((o) => (
              <label key={o.value} className={`flex cursor-pointer items-start gap-2 rounded-[3px] border px-2 py-1 text-[12.5px] ${value === o.value ? "border-sky-600 bg-sky-50" : "border-slate-200 hover:bg-slate-50"}`}>
                <input type="radio" name={f.key} checked={value === o.value} onChange={() => set(f.key, o.value)} className="mt-[2px] accent-sky-700" />
                <span>{o.label ?? o.value}</span>
              </label>
            ))}
          </div>
        </fieldset>
      );
    case "checklist": {
      const cur = String(value ?? "").split(",").filter(Boolean);
      const toggle = (id: string) => {
        const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
        set(f.key, next.sort().join(","));
      };
      return (
        <fieldset className="col-span-2">
          <Label>{f.label}</Label>
          <div className="max-h-40 overflow-auto rounded-[3px] border border-slate-200">
            {f.options.length === 0 && <div className="px-2 py-1.5 text-slate-500">No documents</div>}
            {f.options.map((o) => (
              <label key={o.value} className="flex cursor-pointer items-start gap-2 border-b border-slate-100 px-2 py-1 text-[12px] last:border-b-0 hover:bg-slate-50">
                <input type="checkbox" checked={cur.includes(o.value)} onChange={() => toggle(o.value)} className="mt-[2px] accent-sky-700" />
                <span>{o.label ?? o.value}</span>
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
  }
}
