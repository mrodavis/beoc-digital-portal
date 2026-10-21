"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { CalendarLogo, ChatLogo, GmailLogo, Icon, MeetLogo } from "./icons";
import { categoriesOn, conversations, personOf, todayOf } from "./model";
import type { GmPerson, GmailDoc } from "./types";

export interface GmCtx {
  doc: GmailDoc;
  ui: SimUi;
  onSelect: (p: Partial<SimUi>) => void;
  onCommit: (c: SimCommit) => void;
  cmd: (id: string, value?: SimValue) => void;
  type: (target: string, value: string) => void;
}
export const Ctx = createContext<GmCtx | null>(null);
export const useGm = () => useContext(Ctx)!;

export const FONT = "'Google Sans', Roboto, Arial, sans-serif";
export const TEXT = "Roboto, Arial, sans-serif";
export const BLUE = "#0b57d0";
const COLORS = ["#1a73e8", "#e8710a", "#188038", "#d93025", "#9334e6", "#129eaf", "#e52592", "#b06000"];

export function colorFor(p: { name: string; color?: string } | undefined): string {
  if (!p) return COLORS[0];
  if (p.color) return p.color;
  let h = 0;
  for (const ch of p.name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return COLORS[h % COLORS.length];
}

export function Avatar({ person, size = 32 }: { person?: GmPerson | { name: string; color?: string }; size?: number }) {
  const name = person?.name ?? "?";
  return (
    <span title={name} aria-hidden="true" className="inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium text-white" style={{ width: size, height: size, background: colorFor(person), fontSize: size * 0.45, fontFamily: FONT }}>
      {(name.trim()[0] ?? "?").toUpperCase()}
    </span>
  );
}

export function IconBtn({ icon, label, onClick, pressed, size = 20, disabled, className, color, box = 40, title }: { icon: string; label: string; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; pressed?: boolean; size?: number; disabled?: boolean; className?: string; color?: string; box?: number; title?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={title ?? label}
      disabled={disabled}
      aria-pressed={pressed}
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => { e.stopPropagation(); onClick?.(e); }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full disabled:opacity-40 ${pressed ? "bg-[#d3e3fd]" : "hover:bg-[#e9eef6]"} ${className ?? ""}`}
      style={{ width: box, height: box }}
    >
      <Icon name={icon} size={size} color={color ?? (pressed ? "#041e49" : "#444746")} />
    </button>
  );
}

export function Btn({ children, onClick, kind = "filled", disabled, label, className, small }: { children: React.ReactNode; onClick?: () => void; kind?: "filled" | "tonal" | "text" | "outlined" | "danger"; disabled?: boolean; label?: string; className?: string; small?: boolean }) {
  const styles: Record<string, string> = {
    filled: "bg-[#0b57d0] text-white hover:bg-[#0842a0] hover:shadow",
    tonal: "bg-[#c2e7ff] text-[#001d35] hover:bg-[#b3d7ef]",
    text: "text-[#0b57d0] hover:bg-[#0b57d0]/10",
    outlined: "border border-[#747775] text-[#0b57d0] hover:bg-[#0b57d0]/10",
    danger: "bg-[#dc362e] text-white hover:bg-[#b3261e]",
  };
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className={`inline-flex ${small ? "h-8 px-4 text-[13px]" : "h-9 px-5 text-[14px]"} shrink-0 items-center justify-center gap-1.5 rounded-full font-medium disabled:opacity-40 ${styles[kind]} ${className ?? ""}`} style={{ fontFamily: FONT }}>
      {children}
    </button>
  );
}

export interface MenuPos {
  x: number;
  y: number;
}
export type MenuItem = { label: string; icon?: string; onClick?: () => void; disabled?: boolean; sub?: MenuItem[]; checked?: boolean; hint?: string } | { sep: true } | { head: string };

export function Menu({ items, pos, onClose, width = 240, label = "Menu" }: { items: MenuItem[]; pos: MenuPos; onClose: () => void; width?: number; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [sub, setSub] = useState<{ i: number; pos: MenuPos } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const r = el.getBoundingClientRect();
    let dx = 0, dy = 0;
    if (r.right > window.innerWidth - 4) dx = window.innerWidth - 4 - r.right;
    if (r.bottom > window.innerHeight - 4) dy = Math.max(-r.top + 4, window.innerHeight - 4 - r.bottom);
    if (dx || dy) setOff({ x: dx, y: dy });
  }, [pos.x, pos.y]);
  return (
    <div className="fixed inset-0 z-[190]" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} onContextMenu={(e) => { e.preventDefault(); onClose(); }}>
      <div
        ref={ref}
        role="menu"
        aria-label={label}
        className="fixed z-[200] rounded-md bg-white py-1.5 text-[14px] text-[#1f1f1f]"
        style={{ left: pos.x + off.x, top: pos.y + off.y, minWidth: width, boxShadow: "0 2px 6px 2px rgba(60,64,67,.15), 0 1px 2px rgba(60,64,67,.3)", fontFamily: TEXT }}
        onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } }}
      >
        {items.map((it, i) => {
          if ("sep" in it) return <div key={i} className="my-1.5 border-t border-[#e0e0e0]" />;
          if ("head" in it) return <div key={i} className="px-4 pb-1 pt-2 text-[12px] font-medium text-[#5f6368]">{it.head}</div>;
          return (
            <button
              key={i}
              type="button"
              role="menuitem"
              aria-label={it.label}
              disabled={it.disabled}
              onMouseEnter={(ev) => {
                if (it.sub) {
                  const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
                  setSub({ i, pos: { x: r.right - 4, y: r.top - 6 } });
                } else setSub(null);
              }}
              onClick={(ev) => {
                if (it.sub) {
                  const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
                  setSub({ i, pos: { x: r.right - 4, y: r.top - 6 } });
                  return;
                }
                onClose();
                it.onClick?.();
              }}
              className="flex min-h-8 w-full items-center gap-3 px-3 py-1 text-left hover:bg-[#f1f3f4] disabled:text-[#bdc1c6]"
            >
              <span className="flex w-5 shrink-0 justify-center">{it.checked ? <Icon name="check" size={18} color="#1f1f1f" /> : it.icon ? <Icon name={it.icon} size={18} /> : null}</span>
              <span className="flex-1">{it.label}{it.hint && <span className="block text-[12px] text-[#5f6368]">{it.hint}</span>}</span>
              {it.sub && <Icon name="chevronRight" size={18} color="#5f6368" />}
            </button>
          );
        })}
        {sub && (() => {
          const it = items[sub.i];
          return it && "sub" in it && it.sub ? <Menu items={it.sub} pos={sub.pos} onClose={onClose} /> : null;
        })()}
      </div>
    </div>
  );
}

export function Modal({ title, children, onClose, width = 480, footer, label }: { title: React.ReactNode; children: React.ReactNode; onClose: () => void; width?: number; footer?: React.ReactNode; label?: string }) {
  return (
    <div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/40 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } }}>
      <div role="dialog" aria-label={label ?? (typeof title === "string" ? title : "Dialog")} className="flex max-h-full w-full flex-col overflow-hidden rounded-[24px] bg-white" style={{ maxWidth: width, boxShadow: "0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)", fontFamily: TEXT }}>
        <div className="flex items-start gap-2 px-6 pb-2 pt-5">
          <h2 className="flex-1 text-[20px] leading-7 text-[#1f1f1f]" style={{ fontFamily: FONT }}>{title}</h2>
          <IconBtn icon="close" label="Close" onClick={onClose} box={32} />
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-6 pb-2 text-[14px] text-[#1f1f1f]">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 pb-5 pt-3">{footer}</div>}
      </div>
    </div>
  );
}

export function Field({ label, value, onChange, onEnter, autoFocus, type = "text", placeholder, multiline, className }: { label: string; value: string; onChange: (v: string) => void; onEnter?: () => void; autoFocus?: boolean; type?: string; placeholder?: string; multiline?: boolean; className?: string }) {
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);
  const cls = "w-full rounded border border-[#747775] px-3 text-[14px] text-[#1f1f1f] outline-none focus:border-2 focus:border-[#0b57d0]";
  return (
    <label className={`relative mb-4 block ${className ?? ""}`}>
      <span className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#444746]">{label}</span>
      {multiline ? (
        <textarea ref={ref} aria-label={label} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className={`${cls} min-h-[90px] py-2`} />
      ) : (
        <input ref={ref} aria-label={label} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") onEnter?.(); }} className={`${cls} h-11`} />
      )}
    </label>
  );
}

export function Check({ label, checked, onChange, className }: { label: React.ReactNode; checked: boolean; onChange: (v: boolean) => void; className?: string }) {
  return (
    <label className={`flex cursor-pointer items-center gap-2.5 text-[14px] ${className ?? ""}`}>
      <input type="checkbox" aria-label={typeof label === "string" ? label : undefined} checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-[18px] w-[18px] shrink-0 accent-[#0b57d0]" />
      <span>{label}</span>
    </label>
  );
}

export function Select({ label, value, options, onChange, className, hideLabel }: { label: string; value: string; options: string[]; onChange: (v: string) => void; className?: string; hideLabel?: boolean }) {
  return (
    <label className={`block ${className ?? ""}`}>
      {!hideLabel && <span className="mb-1 block text-[12px] text-[#444746]">{label}</span>}
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => e.stopPropagation()} className="h-9 w-full rounded border border-[#747775] bg-white px-2 text-[14px] outline-none focus:border-2 focus:border-[#0b57d0]">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

/** Bottom-left notice ("Message sent  Undo  View message"). */
export function Toast() {
  const g = useGm();
  const t = g.doc.toast;
  if (!t) return null;
  return (
    <div role="status" className="absolute bottom-4 left-4 z-[160] flex max-w-[560px] items-center gap-4 rounded bg-[#323232] px-4 py-3 text-[14px] text-white shadow-lg" style={{ fontFamily: TEXT }}>
      <span>{t.text}</span>
      {t.undo && <button type="button" onClick={() => g.cmd("gm.undoSend", t.undo)} className="font-medium text-[#a8c7fa] hover:underline">Undo</button>}
      {t.view && <button type="button" onClick={() => g.cmd("gm.open", t.view)} className="font-medium text-[#a8c7fa] hover:underline">View message</button>}
      <button type="button" aria-label="Close notice" onClick={() => g.cmd("toast", "")} className="ml-1 text-white/80 hover:text-white">✕</button>
    </div>
  );
}

const TAB_FOR: Record<string, (doc: GmailDoc) => { title: string; url: string; logo: React.ReactNode }> = {
  mail: (doc) => {
    const unread = conversations(doc, (m) => m.box === "inbox" && Boolean(m.unread) && (m.category ?? "Primary") === "Primary").length;
    const folder = doc.view?.folder ?? "inbox";
    const name = folder === "inbox" ? "Inbox" : folder === "search" ? "Search results" : folder.startsWith("label:") ? folder.slice(6) : folder[0].toUpperCase() + folder.slice(1);
    return {
      title: `${name}${folder === "inbox" && unread ? ` (${unread})` : ""} - ${doc.me.email} - ${doc.org?.name ?? "Gmail"} Mail`,
      url: `mail.google.com/mail/u/0/#${folder === "search" ? `search/${encodeURIComponent(doc.view?.search ?? "")}` : folder.startsWith("label:") ? `label/${encodeURIComponent(folder.slice(6))}` : folder}`,
      logo: <GmailLogo size={16} />,
    };
  },
  calendar: (doc) => ({ title: `Google Calendar - ${doc.view?.calView ?? "Week"} of ${doc.view?.calDate ?? todayOf(doc)}`, url: `calendar.google.com/calendar/u/0/r/${(doc.view?.calView ?? "Week").toLowerCase()}`, logo: <CalendarLogo size={16} /> }),
  meet: (doc) => ({ title: doc.meeting ? `Meet - ${doc.meeting.code}` : "Google Meet", url: `meet.google.com/${doc.meeting?.code ?? ""}`, logo: <MeetLogo size={16} /> }),
  chat: () => ({ title: "Chat", url: "mail.google.com/chat/u/0/", logo: <ChatLogo size={16} /> }),
};

export function BrowserFrame({ children }: { children: React.ReactNode }) {
  const g = useGm();
  const { doc } = g;
  const open = Array.from(new Set(["mail", ...(doc.tabs ?? [])])).filter((s) => s !== "chat") as ("mail" | "calendar" | "meet")[];
  const active = doc.surface === "chat" ? "mail" : doc.surface;
  const info = TAB_FOR[doc.surface](doc);
  return (
    <div className="flex h-full flex-col bg-[#dfe3e7]" style={{ fontFamily: TEXT }}>
      <div className="flex h-[34px] shrink-0 items-end gap-0.5 px-2" role="tablist" aria-label="Browser tabs">
        {open.map((s) => {
          const t = TAB_FOR[s](doc);
          const on = active === s;
          return (
            <div key={s} role="tab" aria-selected={on} aria-label={`Browser tab: ${s === "mail" ? "Gmail" : s === "calendar" ? "Google Calendar" : "Google Meet"}`} onClick={() => g.cmd("app", s)} className={`flex h-[30px] min-w-0 max-w-[230px] flex-1 cursor-default items-center gap-2 rounded-t-lg px-3 text-[12px] ${on ? "bg-white text-[#1f1f1f]" : "text-[#3c4043] hover:bg-white/50"}`}>
              <span className="shrink-0">{t.logo}</span>
              <span className="min-w-0 flex-1 truncate">{t.title}</span>
            </div>
          );
        })}
        <span className="mb-1 ml-1 flex h-6 w-6 items-center justify-center rounded-full text-[#3c4043]" aria-hidden="true">+</span>
        <span className="flex-1" />
      </div>
      <div className="flex h-[34px] shrink-0 items-center gap-1 border-b border-[#dadce0] bg-white px-2">
        <Icon name="back" size={18} color="#5f6368" />
        <Icon name="back" size={18} color="#bdc1c6" style={{ transform: "scaleX(-1)" }} />
        <Icon name="refresh" size={18} color="#5f6368" />
        <div className="mx-2 flex h-[26px] min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f1f3f4] px-3 text-[13px] text-[#202124]">
          <Icon name="tune" size={14} color="#5f6368" />
          <span className="truncate" aria-label="Address">{info.url}</span>
        </div>
        <Avatar person={doc.me} size={22} />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">{children}</div>
    </div>
  );
}

/** The Google apps grid, offered from the top bar of every app. */
export function AppsMenu({ pos, onClose }: { pos: MenuPos; onClose: () => void }) {
  const g = useGm();
  const apps: { label: string; logo: React.ReactNode; to: string }[] = [
    { label: "Gmail", logo: <GmailLogo size={30} />, to: "mail" },
    { label: "Calendar", logo: <CalendarLogo size={32} />, to: "calendar" },
    { label: "Meet", logo: <MeetLogo size={32} />, to: "meet" },
    { label: "Chat", logo: <ChatLogo size={32} />, to: "chat" },
  ];
  return (
    <div className="fixed inset-0 z-[190]" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="menu" aria-label="Google apps" className="fixed z-[200] grid w-[300px] grid-cols-3 gap-2 rounded-2xl bg-[#e9eef6] p-4" style={{ left: Math.max(8, pos.x - 300), top: pos.y, boxShadow: "0 4px 8px 3px rgba(0,0,0,.15)" }}>
        {apps.map((a) => (
          <button key={a.label} type="button" role="menuitem" aria-label={a.label} onClick={() => { onClose(); g.cmd("app", a.to); }} className="flex flex-col items-center gap-1 rounded-xl bg-white px-2 py-3 text-[13px] hover:bg-[#f8fafd]">
            {a.logo}
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function useMenuPos() {
  const [pos, setPos] = useState<MenuPos | null>(null);
  const openAt = (e: React.MouseEvent, alignRight = false, w = 240) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ x: alignRight ? r.right - w : r.left, y: r.bottom + 4 });
  };
  return { pos, openAt, close: () => setPos(null), setPos };
}

export function who(doc: GmailDoc, email: string) {
  return personOf(doc, email);
}

export { categoriesOn };
