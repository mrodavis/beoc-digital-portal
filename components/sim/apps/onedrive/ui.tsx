"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { OIcon } from "./icons";
import type { OdPerson, OneDriveDoc } from "./types";

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export type Dlg =
  | { kind: "share"; file: string; view?: "main" | "settings" }
  | { kind: "copylink"; file: string; view?: "main" | "settings" }
  | { kind: "manage"; file: string; tab?: "People" | "Groups" | "Links" }
  | { kind: "rename"; file: string }
  | { kind: "newFolder"; parent: string }
  | { kind: "upload"; folder: string; mode: "files" | "folder" }
  | { kind: "pick"; files: string[]; mode: "move" | "copy" }
  | { kind: "delete"; files: string[] }
  | { kind: "purge"; files: string[] }
  | { kind: "emptyBin" }
  | { kind: "stopSharing"; file: string }
  | { kind: "versions"; file: string }
  | { kind: "vault" }
  | { kind: "odSettings"; tab?: string }
  | { kind: "backup" }
  | { kind: "settingsPane" }
  | { kind: "removeLink"; file: string; link: string };

export interface MenuItem {
  label?: string;
  icon?: string;
  onClick?: () => void;
  sub?: MenuItem[];
  disabled?: boolean;
  sep?: boolean;
  check?: boolean;
  danger?: boolean;
}

export interface OdCtxValue {
  doc: OneDriveDoc;
  ui: SimUi;
  onSelect: (p: Partial<SimUi>) => void;
  onCommit: (c: SimCommit) => void;
  cmd: (id: string, value?: SimValue) => void;
  commit: (id: string, values: Record<string, SimValue>) => void;
  dlg: Dlg | null;
  open: (d: Dlg | null) => void;
  menu: (e: { clientX: number; clientY: number }, items: MenuItem[]) => void;
}

export const OdCtx = createContext<OdCtxValue | null>(null);
export const useOd = () => useContext(OdCtx)!;

export const FONT = "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif";
export const BRAND = "#0f6cbd";
const AVATAR = ["#0f6cbd", "#8764b8", "#038387", "#c239b3", "#ca5010", "#498205", "#986f0b", "#4f6bed", "#d13438", "#005b70"];

export function colorFor(p?: { name: string; color?: string }): string {
  if (!p) return AVATAR[0];
  if (p.color) return p.color;
  let h = 0;
  for (const ch of p.name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR[h % AVATAR.length];
}

export function initials(name: string): string {
  const parts = name.replace(/[^A-Za-z@. -]/g, "").trim().split(/\s+/);
  if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0]?.[0] ?? "?").toUpperCase();
}

export function Avatar({ person, size = 28, ring }: { person?: OdPerson | { name: string; color?: string }; size?: number; ring?: boolean }) {
  const name = person?.name ?? "?";
  return (
    <span
      title={name}
      className="inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, background: colorFor(person), fontSize: Math.round(size * 0.38), boxShadow: ring ? "0 0 0 2px #fff" : undefined }}
    >
      {initials(name)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons and fields                                                  */
/* ------------------------------------------------------------------ */

export function Btn({ children, onClick, kind = "secondary", disabled, label, className, icon }: { children?: React.ReactNode; onClick?: (e: React.MouseEvent) => void; kind?: "primary" | "secondary" | "subtle" | "danger"; disabled?: boolean; label?: string; className?: string; icon?: string }) {
  const styles: Record<string, string> = {
    primary: "bg-[#0f6cbd] text-white hover:bg-[#115ea3] border border-[#0f6cbd]",
    secondary: "bg-white text-[#242424] border border-[#d1d1d1] hover:bg-[#f5f5f5]",
    subtle: "bg-transparent text-[#242424] border border-transparent hover:bg-[#f5f5f5]",
    danger: "bg-[#c50f1f] text-white border border-[#c50f1f] hover:bg-[#a80d1a]",
  };
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className={`inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded px-3 text-[13px] font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${styles[kind]} ${className ?? ""}`}>
      {icon && <OIcon name={icon} size={16} />}
      {children}
    </button>
  );
}

export function CmdBtn({ icon, label, onClick, disabled, showLabel = true, pressed }: { icon: string; label: string; onClick?: (e: React.MouseEvent) => void; disabled?: boolean; showLabel?: boolean; pressed?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      aria-pressed={pressed}
      onClick={(e) => { e.stopPropagation(); onClick?.(e); }}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded px-2 text-[13px] text-[#242424] disabled:opacity-40 ${pressed ? "bg-[#ebf3fc]" : "hover:bg-[#f0f0f0]"}`}
    >
      <OIcon name={icon} size={18} color={BRAND} />
      {showLabel && <span>{label}</span>}
    </button>
  );
}

export function TextField({ label, value, onChange, placeholder, autoFocus, onEnter, type = "text", ariaLabel }: { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean; onEnter?: () => void; type?: string; ariaLabel?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
      ref.current?.select();
    }
  }, [autoFocus]);
  return (
    <label className="block">
      {label && <span className="mb-1 block text-[13px] font-semibold text-[#242424]">{label}</span>}
      <input
        ref={ref}
        type={type}
        aria-label={ariaLabel ?? label ?? placeholder}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") onEnter?.();
        }}
        className="h-8 w-full rounded border border-[#d1d1d1] border-b-[#616161] px-2 text-[14px] outline-none focus:border-b-2 focus:border-b-[#0f6cbd]"
      />
    </label>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={`relative h-5 w-10 shrink-0 rounded-full border ${on ? "border-[#0f6cbd] bg-[#0f6cbd]" : "border-[#616161] bg-white"}`}>
      <span className={`absolute top-[3px] h-3 w-3 rounded-full transition-all ${on ? "left-[23px] bg-white" : "left-[3px] bg-[#616161]"}`} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Surfaces                                                            */
/* ------------------------------------------------------------------ */

export function Modal({ title, children, footer, onClose, width = 480, label }: { title: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode; onClose: () => void; width?: number; label?: string }) {
  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center bg-black/40" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-label={label ?? (typeof title === "string" ? title : "Dialog")} className="flex max-h-[92%] flex-col rounded-lg bg-white shadow-2xl" style={{ width, fontFamily: FONT }} onMouseDown={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } }}>
        <div className="flex items-start gap-2 px-6 pb-2 pt-5">
          <h2 className="min-w-0 flex-1 text-[18px] font-semibold leading-6 text-[#242424]">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="-mr-2 -mt-1 rounded p-1.5 hover:bg-[#f0f0f0]">
            <OIcon name="close" size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-6 pb-2 text-[14px] text-[#242424]">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-6 pb-5 pt-3">{footer}</div>}
      </div>
    </div>
  );
}

/** A right-hand panel over the file list (Version history, Move to). */
export function SidePanel({ title, children, footer, onClose, width = 380, label }: { title: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode; onClose: () => void; width?: number; label?: string }) {
  return (
    <div className="absolute inset-0 z-[110] flex justify-end bg-black/20" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <aside role="dialog" aria-label={label ?? (typeof title === "string" ? title : "Panel")} className="flex h-full flex-col bg-white shadow-2xl" style={{ width, fontFamily: FONT }} onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-5 pb-3 pt-4">
          <h2 className="min-w-0 flex-1 truncate text-[18px] font-semibold text-[#242424]">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded p-1.5 hover:bg-[#f0f0f0]">
            <OIcon name="close" size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 pb-3 text-[14px] text-[#242424]">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-[#e0e0e0] px-5 py-3">{footer}</div>}
      </aside>
    </div>
  );
}

function useClamp(ref: React.RefObject<HTMLDivElement | null>, x: number, y: number) {
  const [off, setOff] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const r = el.getBoundingClientRect();
    let dx = 0, dy = 0;
    if (r.right > window.innerWidth - 4) dx = window.innerWidth - 4 - r.right;
    if (r.bottom > window.innerHeight - 4) dy = Math.max(-r.top + 4, window.innerHeight - 4 - r.bottom);
    if (dx || dy) setOff({ x: dx, y: dy });
  }, [x, y, ref]);
  return off;
}

export function Menu({ items, x, y, onClose, width = 240 }: { items: MenuItem[]; x: number; y: number; onClose: () => void; width?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const off = useClamp(ref, x, y);
  const [sub, setSub] = useState<{ i: number; x: number; y: number } | null>(null);
  return (
    <div
      ref={ref}
      role="menu"
      className="fixed z-[300] rounded-md border border-[#e0e0e0] bg-white py-1 text-[14px] text-[#242424] shadow-[0_8px_16px_rgba(0,0,0,.14)]"
      style={{ left: x + off.x, top: y + off.y, minWidth: width, fontFamily: FONT }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.map((it, i) => {
        if (it.sep) return <div key={i} className="my-1 border-t border-[#e0e0e0]" />;
        return (
          <button
            key={i}
            type="button"
            role="menuitem"
            aria-label={it.label}
            disabled={it.disabled}
            onMouseEnter={(e) => {
              if (it.sub) {
                const r = e.currentTarget.getBoundingClientRect();
                setSub({ i, x: r.right - 2, y: r.top - 4 });
              } else setSub(null);
            }}
            onClick={(e) => {
              if (it.sub) {
                const r = e.currentTarget.getBoundingClientRect();
                setSub({ i, x: r.right - 2, y: r.top - 4 });
                return;
              }
              onClose();
              it.onClick?.();
            }}
            className={`flex h-8 w-full items-center gap-2.5 px-3 text-left disabled:text-[#bdbdbd] ${sub?.i === i ? "bg-[#f0f0f0]" : "hover:bg-[#f5f5f5]"} ${it.danger ? "text-[#c50f1f]" : ""}`}
          >
            <span className="flex w-5 shrink-0 justify-center">{it.check ? <OIcon name="check" size={16} /> : it.icon ? <OIcon name={it.icon} size={17} color={it.disabled ? "#bdbdbd" : it.danger ? "#c50f1f" : "#424242"} /> : null}</span>
            <span className="flex-1 truncate">{it.label}</span>
            {it.sub && <OIcon name="chevronRight" size={14} color="#616161" />}
          </button>
        );
      })}
      {sub && items[sub.i]?.sub && <Menu items={items[sub.i].sub!} x={sub.x} y={sub.y} onClose={onClose} width={200} />}
    </div>
  );
}

export function Toast({ text }: { text: string }) {
  return (
    <div role="status" className="pointer-events-none absolute bottom-4 left-1/2 z-[150] -translate-x-1/2 rounded-md bg-[#242424] px-4 py-2 text-[13px] text-white shadow-lg" style={{ fontFamily: FONT }}>
      {text}
    </div>
  );
}

export function RadioRow({ checked, onClick, title, text, icon, disabled, note }: { checked: boolean; onClick: () => void; title: string; text?: string; icon?: string; disabled?: boolean; note?: string }) {
  return (
    <button type="button" role="radio" aria-checked={checked} aria-label={title} disabled={disabled} onClick={onClick} className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left disabled:cursor-not-allowed disabled:opacity-50 ${checked ? "border-[#0f6cbd] bg-[#ebf3fc]" : "border-[#e0e0e0] hover:bg-[#f5f5f5]"}`}>
      {icon && (
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${checked ? "bg-[#0f6cbd]" : "bg-[#f0f0f0]"}`}>
          <OIcon name={icon} size={17} color={checked ? "#fff" : "#424242"} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold">{title}</span>
        {text && <span className="block text-[12px] text-[#616161]">{text}</span>}
        {note && <span className="block text-[12px] text-[#c50f1f]">{note}</span>}
      </span>
      {checked && <OIcon name="check" size={18} color={BRAND} />}
    </button>
  );
}
