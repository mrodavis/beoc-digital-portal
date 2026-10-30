"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Popover, type PopoverItem } from "../../chrome/Ribbon";
import { Icon } from "../../chrome/icons";
import { AccIcon } from "./icons";

/** The last selection the Access window rendered, for dialogs opened from the Ribbon. */
export const bridge: { selection: string } = { selection: "" };

export function Btn({ children, onClick, primary, disabled, className, title }: { children: ReactNode; onClick?: () => void; primary?: boolean; disabled?: boolean; className?: string; title?: string }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`min-w-[72px] border px-3 py-[3px] text-[12px] disabled:opacity-40 ${primary ? "border-[#0078d4] bg-[#e5f1fb] hover:bg-[#cce4f7]" : "border-[#adadad] bg-[#e1e1e1] hover:border-[#0078d4] hover:bg-[#e5f1fb]"} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

/** A modal Access/Windows dialog window. */
export function Win({
  title,
  width = 420,
  onClose,
  children,
  footer,
  icon,
  className,
  bodyClass,
}: {
  title: string;
  width?: number;
  onClose?: () => void;
  children: ReactNode;
  footer?: ReactNode;
  icon?: string;
  className?: string;
  bodyClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>("[data-autofocus], input:not([type=checkbox]):not([type=radio]), textarea, select");
    el?.focus();
  }, []);
  return (
    <div className="absolute inset-0 z-[55] flex items-center justify-center bg-black/10" onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Escape") onClose?.(); }} onMouseDown={(e) => e.stopPropagation()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className={`flex max-h-[94%] flex-col border border-[#8a8a8a] bg-[#f0f0f0] text-[12px] text-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${className ?? ""}`} style={{ width, maxWidth: "96%" }}>
        <div className="flex h-7 shrink-0 items-center justify-between bg-white pl-2">
          <span className="flex items-center gap-1.5 truncate">
            {icon && <AccIcon name={icon} size={14} />}
            {title}
          </span>
          <div className="flex h-full items-center">
            <span className="px-2 text-gray-500" aria-hidden="true">?</span>
            {onClose && (
              <button type="button" aria-label="Close" onClick={onClose} className="flex h-full w-9 items-center justify-center hover:bg-[#e81123] hover:text-white">
                ✕
              </button>
            )}
          </div>
        </div>
        <div className={`min-h-0 flex-1 overflow-auto ${bodyClass ?? "p-3"}`}>{children}</div>
        {footer && <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#dfdfdf] px-3 py-2">{footer}</div>}
      </div>
    </div>
  );
}

/** Access message box (warning/info/error/question) with its buttons. */
export function MsgBox({
  title = "Microsoft Access",
  text,
  icon = "warning",
  buttons,
}: {
  title?: string;
  text: string;
  icon?: string;
  buttons: { label: string; onClick: () => void; primary?: boolean }[];
}) {
  return (
    <Win title={title} width={Math.min(520, Math.max(340, Math.round(text.length * 1.6)))} onClose={buttons[buttons.length - 1]?.onClick} footer={buttons.map((b, i) => <Btn key={i} primary={b.primary ?? i === 0} onClick={b.onClick}>{b.label}</Btn>)}>
      <div className="flex gap-3 bg-white p-3">
        {icon && <AccIcon name={icon} size={32} />}
        <div className="whitespace-pre-line text-[12.5px] leading-snug">{text}</div>
      </div>
    </Win>
  );
}

/** A right-click menu item; `sub` makes it open a flyout (Change To ›). */
export type MenuItemDef = Omit<PopoverItem, "key"> & { key?: string; sub?: MenuItemDef[] };

export function Menu({ x, y, items, onClose }: { x: number; y: number; items: MenuItemDef[]; onClose: () => void }) {
  if (items.some((it) => it.sub)) return <CascadeMenu x={x} y={y} items={items} onClose={onClose} />;
  return <Popover anchor={{ x, y }} onClose={onClose} items={items.map((it, i) => ({ ...it, key: it.key ?? String(i) }))} />;
}

/** A shortcut menu with flyout submenus, styled like the shared Popover list. */
function CascadeMenu({ x, y, items, onClose }: { x: number; y: number; items: MenuItemDef[]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  useLayoutEffect(() => {
    const el = ref.current?.firstElementChild as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: x + r.width > window.innerWidth - 8 ? Math.max(8, window.innerWidth - r.width - 8) : x, y: y + r.height > window.innerHeight - 8 ? Math.max(8, window.innerHeight - r.height - 8) : y });
  }, [x, y]);
  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    document.addEventListener("keydown", key);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [onClose]);
  return (
    <div ref={ref} className="fixed z-[200]" style={{ left: pos.x, top: pos.y }}>
      <CascadeList items={items} onClose={onClose} />
    </div>
  );
}

function CascadeList({ items, onClose, style }: { items: MenuItemDef[]; onClose: () => void; style?: CSSProperties }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div role="menu" className="relative min-w-[160px] rounded border border-gray-300 bg-white py-1 text-[12px] text-gray-800 shadow-xl" style={style}>
      {items.map((it, i) => {
        if (it.separator) return <div key={it.key ?? i} className="my-1 border-t border-gray-200" />;
        return (
          <div key={it.key ?? i} className="relative" onMouseEnter={() => setOpen(it.sub ? i : null)}>
            <button
              type="button"
              role="menuitem"
              disabled={it.disabled}
              aria-haspopup={it.sub ? "menu" : undefined}
              aria-expanded={it.sub ? open === i : undefined}
              onClick={() => {
                if (it.sub) return setOpen(i);
                it.onPick?.();
                onClose();
              }}
              className={`flex w-full items-center gap-2 px-2 py-1 text-left hover:bg-[#e5f1fb] disabled:opacity-40 ${open === i ? "bg-[#e5f1fb]" : ""}`}
            >
              {it.icon ? <Icon name={it.icon} size={16} /> : <span className="w-4 shrink-0" />}
              <span className="flex-1 whitespace-nowrap">{it.label}</span>
              {it.sub && (
                <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" className="ml-3 shrink-0">
                  <path d="M2 1l4 3-4 3z" fill="currentColor" />
                </svg>
              )}
            </button>
            {it.sub && open === i && <CascadeList items={it.sub} onClose={onClose} style={{ position: "absolute", left: "100%", top: -5 }} />}
          </div>
        );
      })}
    </div>
  );
}

/** Text box that commits on Enter or when focus leaves; Escape cancels. */
export function InlineEdit({
  value,
  onCommit,
  onCancel,
  className,
  placeholder,
  maxLength,
  selectAll = true,
  onKey,
  ariaLabel,
}: {
  value: string;
  onCommit: (v: string, how: "enter" | "blur" | "tab" | "shiftTab" | "up" | "down") => void;
  onCancel: () => void;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  selectAll?: boolean;
  onKey?: (e: React.KeyboardEvent<HTMLInputElement>, setText: (v: string) => void) => boolean | void;
  ariaLabel?: string;
}) {
  const [text, setText] = useState(value);
  const done = useRef(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
    if (selectAll) ref.current?.select();
    else {
      const n = ref.current?.value.length ?? 0;
      ref.current?.setSelectionRange(n, n);
    }
  }, [selectAll]);
  const finish = (how: "enter" | "blur" | "tab" | "shiftTab" | "up" | "down") => {
    if (done.current) return;
    done.current = true;
    onCommit(text, how);
  };
  return (
    <input
      ref={ref}
      aria-label={ariaLabel}
      value={text}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => finish("blur")}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (onKey && onKey(e, setText)) return;
        if (e.key === "Enter") { e.preventDefault(); finish("enter"); }
        else if (e.key === "Tab") { e.preventDefault(); finish(e.shiftKey ? "shiftTab" : "tab"); }
        else if (e.key === "ArrowUp") { e.preventDefault(); finish("up"); }
        else if (e.key === "ArrowDown") { e.preventDefault(); finish("down"); }
        else if (e.key === "Escape") { e.preventDefault(); done.current = true; onCancel(); }
      }}
      className={className ?? "h-full w-full border-0 bg-white px-1 text-[12px] outline-none"}
    />
  );
}

export function ListBox({ items, value, onPick, onDouble, height = 150, ariaLabel, render }: { items: string[]; value?: string | null; onPick: (v: string) => void; onDouble?: (v: string) => void; height?: number; ariaLabel: string; render?: (v: string) => ReactNode }) {
  return (
    <div role="listbox" aria-label={ariaLabel} className="overflow-auto border border-[#7a7a7a] bg-white" style={{ height }}>
      {items.map((it) => (
        <button
          key={it}
          type="button"
          role="option"
          aria-selected={value === it}
          onClick={() => onPick(it)}
          onDoubleClick={() => onDouble?.(it)}
          className={`block w-full truncate px-1.5 py-[1px] text-left text-[12px] ${value === it ? "bg-[#0078d7] text-white" : "hover:bg-[#e5f1fb]"}`}
        >
          {render ? render(it) : it}
        </button>
      ))}
    </div>
  );
}

/** Available Fields ⇄ Selected Fields, as in the Access wizards. */
export function FieldPicker({ available, selected, onChange, height = 170 }: { available: string[]; selected: string[]; onChange: (s: string[]) => void; height?: number }) {
  const [a, setA] = useState<string | null>(null);
  const [s, setS] = useState<string | null>(null);
  const avail = available.filter((f) => !selected.includes(f));
  const add = (f: string | null) => f && onChange([...selected, f]);
  const remove = (f: string | null) => f && onChange(selected.filter((x) => x !== f));
  return (
    <div className="flex items-start gap-2">
      <div className="flex-1">
        <div className="mb-0.5">Available Fields:</div>
        <ListBox ariaLabel="Available Fields" items={avail} value={a} onPick={setA} onDouble={(f) => { add(f); setA(null); }} height={height} />
      </div>
      <div className="mt-6 flex flex-col gap-1.5">
        <Btn className="!min-w-[36px] !px-2" onClick={() => { add(a ?? avail[0] ?? null); setA(null); }} title="Add the selected field">&gt;</Btn>
        <Btn className="!min-w-[36px] !px-2" onClick={() => onChange([...selected, ...avail])} title="Add all fields">&gt;&gt;</Btn>
        <Btn className="!min-w-[36px] !px-2" onClick={() => { remove(s ?? selected[selected.length - 1] ?? null); setS(null); }} title="Remove the selected field">&lt;</Btn>
        <Btn className="!min-w-[36px] !px-2" onClick={() => onChange([])} title="Remove all fields">&lt;&lt;</Btn>
      </div>
      <div className="flex-1">
        <div className="mb-0.5">Selected Fields:</div>
        <ListBox ariaLabel="Selected Fields" items={selected} value={s} onPick={setS} onDouble={(f) => { remove(f); setS(null); }} height={height} />
      </div>
    </div>
  );
}

export function Combo({ value, options, onChange, className, ariaLabel, width }: { value: string; options: string[]; onChange: (v: string) => void; className?: string; ariaLabel?: string; width?: number }) {
  return (
    <select aria-label={ariaLabel} value={value} onChange={(e) => onChange(e.target.value)} onMouseDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} className={className ?? "h-[22px] border border-[#7a7a7a] bg-white px-1 text-[12px]"} style={width ? { width } : undefined}>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

export function TextIn({ value, onChange, className, ariaLabel, onEnter, width, password }: { value: string; onChange: (v: string) => void; className?: string; ariaLabel?: string; onEnter?: () => void; width?: number; password?: boolean }) {
  return (
    <input
      aria-label={ariaLabel}
      type={password ? "password" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") onEnter?.(); }}
      className={className ?? "h-[22px] border border-[#7a7a7a] bg-white px-1 text-[12px] outline-none focus:border-[#0078d4]"}
      style={width ? { width } : undefined}
    />
  );
}

export function Check({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-1.5">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export function Radio({ checked, onChange, label, name }: { checked: boolean; onChange: () => void; label: string; name: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-1.5">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-[2px]" />
      <span>{label}</span>
    </label>
  );
}

/** Wizard frame with Cancel / < Back / Next > / Finish. */
export function Wizard({
  title,
  width = 560,
  page,
  pages,
  setPage,
  onCancel,
  onFinish,
  canNext = true,
  canFinish = true,
  children,
  heading,
}: {
  title: string;
  width?: number;
  page: number;
  pages: number;
  setPage: (n: number) => void;
  onCancel: () => void;
  onFinish: () => void;
  canNext?: boolean;
  canFinish?: boolean;
  children: ReactNode;
  heading?: ReactNode;
}) {
  return (
    <Win
      title={title}
      width={width}
      onClose={onCancel}
      bodyClass="p-0"
      footer={
        <>
          <Btn onClick={onCancel}>Cancel</Btn>
          <Btn disabled={page === 0} onClick={() => setPage(page - 1)}>&lt; Back</Btn>
          <Btn disabled={page >= pages - 1 || !canNext} onClick={() => setPage(page + 1)}>Next &gt;</Btn>
          <Btn primary disabled={!canFinish} onClick={onFinish}>Finish</Btn>
        </>
      }
    >
      {heading && <div className="border-b border-[#dfdfdf] bg-white px-4 py-3 text-[12.5px]">{heading}</div>}
      <div className="flex min-h-[260px] flex-col gap-2 p-4">{children}</div>
    </Win>
  );
}
