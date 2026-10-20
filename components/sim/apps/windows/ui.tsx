"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import type { WinDoc } from "./types";
import { G } from "./icons";

/* ------------------------------------------------------------------ */
/* Theme tokens (CSS variables set on the canvas root)                 */
/* ------------------------------------------------------------------ */

export const T = {
  bg: "var(--w-bg)",
  panel: "var(--w-panel)",
  panel2: "var(--w-panel2)",
  card: "var(--w-card)",
  text: "var(--w-text)",
  sub: "var(--w-sub)",
  line: "var(--w-line)",
  hover: "var(--w-hover)",
  press: "var(--w-press)",
  sel: "var(--w-sel)",
  selLine: "var(--w-selline)",
  accent: "var(--w-accent)",
  accentText: "var(--w-accenttext)",
  flyout: "var(--w-flyout)",
  taskbar: "var(--w-taskbar)",
  input: "var(--w-input)",
};

export const THEME_VARS = (dark: boolean): Record<string, string> =>
  dark
    ? {
        "--w-bg": "#202020",
        "--w-panel": "#272727",
        "--w-panel2": "#2c2c2c",
        "--w-card": "#2d2d2d",
        "--w-text": "#ffffff",
        "--w-sub": "#c8c8c8",
        "--w-line": "#3d3d3d",
        "--w-hover": "rgba(255,255,255,0.06)",
        "--w-press": "rgba(255,255,255,0.1)",
        "--w-sel": "rgba(96,205,255,0.16)",
        "--w-selline": "rgba(96,205,255,0.45)",
        "--w-accent": "#60cdff",
        "--w-accenttext": "#000000",
        "--w-flyout": "rgba(40,40,40,0.96)",
        "--w-taskbar": "rgba(28,28,28,0.9)",
        "--w-input": "#2d2d2d",
      }
    : {
        "--w-bg": "#f3f3f3",
        "--w-panel": "#ffffff",
        "--w-panel2": "#f9f9f9",
        "--w-card": "#fbfbfb",
        "--w-text": "#1b1b1b",
        "--w-sub": "#5f5f5f",
        "--w-line": "#e5e5e5",
        "--w-hover": "rgba(0,0,0,0.04)",
        "--w-press": "rgba(0,0,0,0.07)",
        "--w-sel": "#e5f1fb",
        "--w-selline": "#99d1ff",
        "--w-accent": "#005fb8",
        "--w-accenttext": "#ffffff",
        "--w-flyout": "rgba(242,242,242,0.97)",
        "--w-taskbar": "rgba(238,240,244,0.92)",
        "--w-input": "#ffffff",
      };

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export type MItem = {
  label?: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  sep?: boolean;
  check?: boolean;
  dot?: boolean;
  danger?: boolean;
  sub?: MItem[];
  onClick?: () => void;
};

export type SaveOpts = { title?: string; dir: string; name: string; types?: string[]; onSave: (path: string) => void };

export type WinCtxValue = {
  doc: WinDoc;
  ui: SimUi;
  sel: string;
  select: (selection: string) => void;
  cmd: (id: string, value?: SimValue) => void;
  commit: (c: SimCommit) => void;
  menu: (at: { clientX: number; clientY: number }, items: MItem[], top?: MItem[]) => void;
  closeMenu: () => void;
  modal: (node: ReactNode | null) => void;
  renaming: string | null;
  setRenaming: (p: string | null) => void;
  dark: boolean;
  focusRoot: () => void;
  clips: string[];
  addClip: (t: string) => void;
  insertRef: React.MutableRefObject<((t: string) => void) | null>;
  saveAs: (o: SaveOpts) => void;
  share: (path: string, provider?: "ms" | "google") => void;
  startSnip: () => void;
  /** Apps register keyboard handlers here; the shell calls the focused app's handler. */
  keys: React.MutableRefObject<Record<string, (e: React.KeyboardEvent) => boolean>>;
};

export const WinCtx = createContext<WinCtxValue | null>(null);
export function useWin(): WinCtxValue {
  const c = useContext(WinCtx);
  if (!c) throw new Error("WinCtx missing");
  return c;
}

/* ------------------------------------------------------------------ */
/* Context menu                                                        */
/* ------------------------------------------------------------------ */

export function Menu({ x, y, items, top, onClose, bounds }: { x: number; y: number; items: MItem[]; top?: MItem[]; onClose: () => void; bounds: { w: number; h: number } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  const [open, setOpen] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let nx = x;
    let ny = y;
    if (nx + r.width > bounds.w - 4) nx = Math.max(4, bounds.w - r.width - 4);
    if (ny + r.height > bounds.h - 4) ny = Math.max(4, y - r.height);
    if (ny < 4) ny = 4;
    setPos({ x: nx, y: ny });
  }, [x, y, bounds.w, bounds.h]);
  return (
    <div
      ref={ref}
      role="menu"
      className="w11-pop absolute z-[400] min-w-[220px] rounded-lg py-1 text-[12px] shadow-2xl"
      style={{ left: pos.x, top: pos.y, background: T.flyout, color: T.text, border: `1px solid ${T.line}`, backdropFilter: "blur(20px)" }}
      onMouseDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {top && top.length > 0 && (
        <div className="mb-1 flex gap-1 border-b px-2 pb-1" style={{ borderColor: T.line }}>
          {top.map((t, i) => (
            <button
              key={i}
              type="button"
              title={t.label}
              aria-label={t.label}
              disabled={t.disabled}
              onClick={() => {
                onClose();
                t.onClick?.();
              }}
              className="flex h-8 w-8 items-center justify-center rounded hover:bg-[var(--w-hover)] disabled:opacity-35"
            >
              <G n={t.icon ?? "app"} s={16} />
            </button>
          ))}
        </div>
      )}
      {items.map((it, i) =>
        it.sep ? (
          <div key={i} className="my-1 border-t" style={{ borderColor: T.line }} />
        ) : (
          <div key={i} className="relative px-1" onMouseEnter={() => setOpen(it.sub ? i : null)}>
            <button
              type="button"
              role="menuitem"
              disabled={it.disabled}
              aria-label={it.label}
              onClick={() => {
                if (it.sub) {
                  setOpen(i);
                  return;
                }
                onClose();
                it.onClick?.();
              }}
              className="flex h-8 w-full items-center gap-3 rounded px-2 text-left hover:bg-[var(--w-hover)] disabled:opacity-40"
              style={{ color: it.danger ? "#c42b1c" : undefined }}
            >
              <span className="flex w-4 justify-center">
                {it.check ? <G n="check" s={14} /> : it.dot ? <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.text }} /> : it.icon ? <G n={it.icon} s={16} /> : null}
              </span>
              <span className="flex-1 truncate">{it.label}</span>
              {it.shortcut && <span className="text-[11px]" style={{ color: T.sub }}>{it.shortcut}</span>}
              {it.sub && <G n="chevR" s={12} />}
            </button>
            {it.sub && open === i && (
              <div className="absolute left-full top-0 z-[401] -ml-1">
                <SubMenu items={it.sub} onClose={onClose} />
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
}

function SubMenu({ items, onClose }: { items: MItem[]; onClose: () => void }) {
  return (
    <div className="w11-pop min-w-[200px] rounded-lg py-1 text-[12px] shadow-2xl" style={{ background: T.flyout, color: T.text, border: `1px solid ${T.line}` }}>
      {items.map((it, i) =>
        it.sep ? (
          <div key={i} className="my-1 border-t" style={{ borderColor: T.line }} />
        ) : (
          <div key={i} className="px-1">
            <button
              type="button"
              role="menuitem"
              aria-label={it.label}
              disabled={it.disabled}
              onClick={() => {
                onClose();
                it.onClick?.();
              }}
              className="flex h-8 w-full items-center gap-3 rounded px-2 text-left hover:bg-[var(--w-hover)] disabled:opacity-40"
            >
              <span className="flex w-4 justify-center">
                {it.check ? <G n="check" s={14} /> : it.dot ? <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.text }} /> : it.icon ? <G n={it.icon} s={16} /> : null}
              </span>
              <span className="flex-1 truncate">{it.label}</span>
              {it.shortcut && <span className="text-[11px]" style={{ color: T.sub }}>{it.shortcut}</span>}
            </button>
          </div>
        ),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

export function Toggle({ on, onChange, label, showText = true }: { on: boolean; onChange: (v: boolean) => void; label: string; showText?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className="flex items-center gap-2.5 text-[12px]">
      {showText && <span style={{ color: T.text }}>{on ? "On" : "Off"}</span>}
      <span
        className="relative inline-block h-5 w-10 rounded-full transition-colors"
        style={{ background: on ? T.accent : "transparent", border: on ? `1px solid ${T.accent}` : `1px solid ${T.sub}` }}
      >
        <span className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full transition-all" style={{ left: on ? 23 : 4, background: on ? T.accentText : T.sub }} />
      </span>
    </button>
  );
}

export function Select({ value, options, onChange, label, width = 200, fmt }: { value: string; options: string[]; onChange: (v: string) => void; label: string; width?: number; fmt?: (v: string) => string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  return (
    <div ref={ref} className="relative" style={{ width }}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-full items-center justify-between gap-2 rounded px-3 text-left text-[12px] hover:brightness-95"
        style={{ background: T.input, border: `1px solid ${T.line}`, borderBottomColor: T.sub, color: T.text }}
      >
        <span className="truncate">{value ? (fmt ? fmt(value) : value) : "Select"}</span>
        <G n="chevD" s={12} />
      </button>
      {open && (
        <div role="listbox" className="w11-pop absolute right-0 z-[300] mt-1 max-h-64 w-full min-w-max overflow-auto rounded-lg py-1 shadow-2xl" style={{ background: T.flyout, border: `1px solid ${T.line}` }}>
          {options.map((o) => (
            <button
              key={o}
              type="button"
              role="option"
              aria-selected={o === value}
              onClick={() => {
                setOpen(false);
                if (o !== value) onChange(o);
              }}
              className="relative flex h-8 w-full items-center whitespace-nowrap px-4 text-left text-[12px] hover:bg-[var(--w-hover)]"
              style={{ color: T.text }}
            >
              {o === value && <span className="absolute left-1 top-2 h-4 w-[3px] rounded" style={{ background: T.accent }} />}
              {fmt ? fmt(o) : o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Btn({ children, onClick, primary, disabled, label, className = "", small }: { children: ReactNode; onClick?: () => void; primary?: boolean; disabled?: boolean; label?: string; className?: string; small?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded px-3 ${small ? "h-7" : "h-8"} whitespace-nowrap text-[12px] transition hover:brightness-95 disabled:opacity-40 ${className}`}
      style={primary ? { background: T.accent, color: T.accentText, border: `1px solid ${T.accent}` } : { background: T.card, color: T.text, border: `1px solid ${T.line}` }}
    >
      {children}
    </button>
  );
}

export function TextIn({ value, onChange, label, placeholder, type = "text", onEnter, autoFocus, width, className = "", mono }: { value: string; onChange: (v: string) => void; label: string; placeholder?: string; type?: string; onEnter?: () => void; autoFocus?: boolean; width?: number | string; className?: string; mono?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!autoFocus) return;
    // Focus and select the starting text, the way Windows and web apps do in naming dialogs.
    const t = setTimeout(() => {
      ref.current?.focus();
      ref.current?.select();
    }, 10);
    return () => clearTimeout(t);
  }, [autoFocus]);
  return (
    <input
      ref={ref}
      aria-label={label}
      value={value}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") onEnter?.();
      }}
      className={`h-8 rounded px-2.5 text-[12px] outline-none focus:border-b-2 ${mono ? "font-mono" : ""} ${className}`}
      style={{ width, background: T.input, color: T.text, border: `1px solid ${T.line}`, borderBottomColor: T.sub }}
    />
  );
}

/** A modal dialog drawn inside the canvas. */
export function Modal({ title, children, footer, onClose, width = 420, icon }: { title: string; children: ReactNode; footer?: ReactNode; onClose: () => void; width?: number; icon?: ReactNode }) {
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    // Esc closes the dialog, as it does in Windows (inputs inside stop key propagation, so listen on the document).
    const h = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      close.current();
    };
    document.addEventListener("keydown", h, true);
    return () => document.removeEventListener("keydown", h, true);
  }, []);
  return (
    <div className="absolute inset-0 z-[500] flex items-center justify-center bg-black/25" onMouseDown={(e) => e.stopPropagation()}>
      <div role="dialog" aria-label={title} className="w11-pop max-h-[92%] overflow-hidden rounded-lg shadow-2xl" style={{ width, maxWidth: "94%", background: T.panel, color: T.text, border: `1px solid ${T.line}` }}>
        <div className="flex h-8 items-center gap-2 pl-3 text-[12px]">
          {icon}
          <span className="flex-1 truncate">{title}</span>
          <button type="button" aria-label="Close" onClick={onClose} className="flex h-8 w-11 items-center justify-center hover:bg-[#c42b1c] hover:text-white">
            <G n="close" s={12} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-auto px-5 pb-4 pt-2 text-[12.5px]">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 px-5 py-3" style={{ background: T.bg, borderTop: `1px solid ${T.line}` }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function Avatar({ name, s = 32 }: { name: string; s?: number }) {
  const ini = name
    .split(/\s+/)
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white" style={{ width: s, height: s, fontSize: s * 0.38, background: "linear-gradient(135deg,#5b8def,#2f5fc4)" }}>
      {ini}
    </span>
  );
}

/** Position of a mouse event relative to an element. */
export function relPos(el: HTMLElement | null, e: { clientX: number; clientY: number }) {
  const r = el?.getBoundingClientRect();
  return { x: e.clientX - (r?.left ?? 0), y: e.clientY - (r?.top ?? 0) };
}
