"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { OutlookDoc } from "./types";
import { CATEGORY_COLORS, catName } from "./model";

/* ------------------------------------------------------------------ */
/* Canvas icons (Fluent-style line icons, 16×16 grid)                  */
/* ------------------------------------------------------------------ */

const P: Record<string, ReactNode> = {
  mail: <path d="M2 4h12v8H2zM2 4l6 5 6-5" />,
  mailOpen: <path d="M2 7l6-4 6 4v6H2zM2 7l6 4 6-4" />,
  calendar: (
    <>
      <rect x="2" y="3" width="12" height="11" rx="1" />
      <path d="M2 6h12M5 1.5v3M11 1.5v3" />
    </>
  ),
  people: (
    <>
      <circle cx="6" cy="5.5" r="2.5" />
      <path d="M1.5 14c.5-3 2.3-4.5 4.5-4.5s4 1.5 4.5 4.5M11 3.5a2.2 2.2 0 0 1 0 4.4M12.5 9.8c1 .6 1.7 1.9 2 4.2" />
    </>
  ),
  tasks: (
    <>
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
      <path d="M5 8l2 2 4-4.5" />
    </>
  ),
  more: <path d="M3.5 8h.01M8 8h.01M12.5 8h.01" strokeWidth="2.4" />,
  flag: <path d="M3.5 14V2.5M3.5 3h8l-2 3 2 3h-8" />,
  flagFill: <path d="M3.5 14V2.5M3.5 3h8l-2 3 2 3h-8z" fill="currentColor" />,
  check: <path d="M3 8.5l3 3 7-7" />,
  clip: <path d="M10.5 4.5l-5 5a1.4 1.4 0 0 0 2 2l5.5-5.5a2.8 2.8 0 0 0-4-4L3.5 7.5a4.2 4.2 0 0 0 6 6L13 10" />,
  reply: <path d="M6 4L2.5 7.5 6 11M2.5 7.5H10a3.5 3.5 0 0 1 3.5 3.5v1" />,
  replyAll: <path d="M7 4L3.5 7.5 7 11M4 4L.5 7.5 4 11M3.5 7.5H10a3.5 3.5 0 0 1 3.5 3.5v1" />,
  forward: <path d="M10 4l3.5 3.5L10 11M13.5 7.5H6A3.5 3.5 0 0 0 2.5 11v1" />,
  trash: <path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 9h5.8l.6-9M7 7v4.5M9 7v4.5" />,
  archive: <path d="M2 3h12v3H2zM3 6v7h10V6M6.5 8.5h3" />,
  search: (
    <>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </>
  ),
  chevronDown: <path d="M4 6l4 4 4-4" />,
  chevronRight: <path d="M6 4l4 4-4 4" />,
  chevronLeft: <path d="M10 4L6 8l4 4" />,
  chevronUp: <path d="M4 10l4-4 4 4" />,
  close: <path d="M4 4l8 8M12 4l-8 8" />,
  pin: <path d="M9.5 2l4.5 4.5-2 .5-2.5 2.5L9 12 4 7l2.5-.5L9 4z M5.5 10.5L2 14" />,
  important: <path d="M8 2.5v7.5M8 12.5v.5" strokeWidth="2" />,
  down: <path d="M8 3v10M4 9l4 4 4-4" />,
  folder: <path d="M1.5 4h5l1.5 1.5h6.5v7.5h-13z" />,
  folderOpen: <path d="M1.5 4h5l1.5 1.5h5V7M1.5 13l2-6h11l-2 6z" />,
  inbox: <path d="M2 9l2-6h8l2 6v4H2zM2 9h3.5l1 1.5h3l1-1.5H14" />,
  send: <path d="M2 8l12-5.5L9 14l-2-4.5zM7 9.5l7-7" />,
  draft: <path d="M3 13l1-3.5 7-7 2.5 2.5-7 7zM9.5 4L12 6.5" />,
  junk: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M4.2 11.8l7.6-7.6" />
    </>
  ),
  outbox: <path d="M2 9l2-6h8l2 6v4H2zM8 10V5M6 7l2-2 2 2" />,
  person: (
    <>
      <circle cx="8" cy="5" r="3" />
      <path d="M2.5 14.5c.6-3.4 2.8-5 5.5-5s4.9 1.6 5.5 5" />
    </>
  ),
  group: (
    <>
      <circle cx="5.5" cy="6" r="2.2" />
      <circle cx="10.5" cy="6" r="2.2" />
      <path d="M1.5 13c.4-2.4 1.8-3.6 4-3.6s3.6 1.2 4 3.6M8.5 9.6c.6-.2 1.3-.2 2-.2 2.2 0 3.6 1.2 4 3.6" />
    </>
  ),
  phone: <path d="M4.5 2l2 3-1.5 1.5c.7 1.6 2 2.9 3.5 3.5L10 8.5l3 2-1 2.5c-5 .5-10-4.5-9.5-9.5z" />,
  notes: <path d="M3 2h7l3 3v9H3zM10 2v3h3M5.5 8h5M5.5 10.5h5" />,
  teams: (
    <>
      <rect x="1.5" y="4" width="8" height="8" rx="1" fill="#5b5fc7" stroke="none" />
      <path d="M3.5 6.2h4M5.5 6.2v4" stroke="#fff" />
      <circle cx="12.5" cy="5" r="1.6" fill="#7b83eb" stroke="none" />
      <path d="M10.5 7.5h4v3a2 2 0 0 1-4 0z" fill="#7b83eb" stroke="none" />
    </>
  ),
  lock: (
    <>
      <rect x="3.5" y="7" width="9" height="7" rx="1" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </>
  ),
  recur: <path d="M12.5 6A5 5 0 0 0 3.5 5M3.5 2v3h3M3.5 10a5 5 0 0 0 9 1M12.5 14v-3h-3" />,
  bell: <path d="M4 11V7a4 4 0 0 1 8 0v4l1.5 1.5h-11zM6.5 14h3" />,
  link: <path d="M7 9l2-2M6 7.5L4.5 9a2.1 2.1 0 0 0 3 3L9 10.5M10 8.5L11.5 7a2.1 2.1 0 0 0-3-3L7 5.5" />,
  warning: <path d="M8 2l6.5 11.5h-13zM8 6.5v3.5M8 12v.2" />,
  info: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7v4.5M8 4.8v.2" />
    </>
  ),
  shield: <path d="M8 1.5l5.5 2v4c0 3.5-2.5 6-5.5 7-3-1-5.5-3.5-5.5-7v-4z" />,
  plus: <path d="M8 3v10M3 8h10" />,
  edit: <path d="M3 13l1-3.5 6.5-6.5 2.5 2.5L6.5 12zM9 4.5L11.5 7" />,
  globe: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12" />
    </>
  ),
  clock: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </>
  ),
  location: <path d="M8 14.5s-4.5-4.5-4.5-8a4.5 4.5 0 0 1 9 0c0 3.5-4.5 8-4.5 8zM8 8a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 8 8z" />,
  popout: <path d="M9 2.5h4.5V7M13.5 2.5L8 8M11.5 9.5v4h-9v-9h4" />,
  arrowLeft: <path d="M13 8H3M7 4L3 8l4 4" />,
  dots: <path d="M8 3.5h.01M8 8h.01M8 12.5h.01" strokeWidth="2.4" />,
  file: <path d="M4 1.5h5.5l3 3v10h-8.5zM9.5 1.5v3h3" />,
};

export function OIcon({ name, size = 16, className, color }: { name: string; size?: number; className?: string; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" className={`shrink-0 ${className ?? ""}`} style={{ color }} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {P[name] ?? <rect x="3" y="3" width="10" height="10" rx="2" />}
    </svg>
  );
}

/** Office-style file tile icon from the extension. */
export function FileBadge({ name, size = 28 }: { name: string; size?: number }) {
  const ext = (name.split(".").pop() ?? "").toLowerCase();
  const map: Record<string, [string, string]> = {
    docx: ["#185abd", "W"], doc: ["#185abd", "W"], xlsx: ["#107c41", "X"], xls: ["#107c41", "X"], csv: ["#107c41", "X"], pptx: ["#c43e1c", "P"],
    pdf: ["#d13438", "PDF"], msg: ["#0f6cbd", "✉"], ics: ["#0f6cbd", "31"], vcf: ["#0f6cbd", "👤"], png: ["#8764b8", "🖼"], jpg: ["#8764b8", "🖼"], zip: ["#8a6d00", "ZIP"],
  };
  const [bg, label] = map[ext] ?? ["#6b7280", ext.slice(0, 3).toUpperCase() || "?"];
  return (
    <span className="flex shrink-0 items-center justify-center rounded-sm font-bold text-white" style={{ background: bg, width: size, height: size, fontSize: label.length > 2 ? size * 0.3 : size * 0.45 }} aria-hidden="true">
      {label}
    </span>
  );
}

const AVATAR_COLORS = ["#0f6cbd", "#c239b3", "#038387", "#ca5010", "#8764b8", "#498205", "#4f6bed", "#986f0b", "#c50f1f", "#00727c"];
export function initials(name: string): string {
  const p = name.replace(/[<>(),]/g, " ").trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "?";
  if (p[0].includes("@")) return p[0][0].toUpperCase();
  return ((p[0][0] ?? "") + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
}
export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return (
    <span className="flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white" style={{ width: size, height: size, background: AVATAR_COLORS[h % AVATAR_COLORS.length], fontSize: size * 0.38 }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

export function CategoryChips({ doc, cats, compact }: { doc: OutlookDoc; cats?: string[]; compact?: boolean }) {
  if (!cats?.length) return null;
  return (
    <span className="flex shrink-0 items-center gap-0.5">
      {cats.map((c) =>
        compact ? (
          <span key={c} title={catName(doc, c)} className="inline-block h-3 w-3 rounded-[2px]" style={{ background: CATEGORY_COLORS[c] ?? "#999" }} />
        ) : (
          <span key={c} className="rounded-sm px-1.5 py-[1px] text-[11px] text-gray-900" style={{ background: (CATEGORY_COLORS[c] ?? "#999") + "55", borderLeft: `3px solid ${CATEGORY_COLORS[c] ?? "#999"}` }}>
            {catName(doc, c)}
          </span>
        ),
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Context menu with submenus                                          */
/* ------------------------------------------------------------------ */

export type MenuEntry = {
  label?: string;
  icon?: ReactNode;
  color?: string;
  onPick?: () => void;
  sub?: MenuEntry[];
  separator?: boolean;
  disabled?: boolean;
  shortcut?: string;
  bold?: boolean;
  checked?: boolean;
};

function MenuList({ items, x, y, onClose, depth = 0 }: { items: MenuEntry[]; x: number; y: number; onClose: () => void; depth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  const [open, setOpen] = useState<{ i: number; x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let nx = x, ny = y;
    if (nx + r.width > window.innerWidth - 6) nx = depth ? Math.max(6, x - r.width - 190) : Math.max(6, window.innerWidth - r.width - 6);
    if (ny + r.height > window.innerHeight - 6) ny = Math.max(6, window.innerHeight - r.height - 6);
    setPos({ x: nx, y: ny });
  }, [x, y, depth]);
  return (
    <div ref={ref} role="menu" data-olmenu="1" className="fixed z-[210] min-w-[190px] rounded border border-gray-300 bg-white py-1 text-[12px] text-gray-900 shadow-xl" style={{ left: pos.x, top: pos.y }}>
      {items.map((it, i) => {
        if (it.separator) return <div key={i} className="my-1 border-t border-gray-200" />;
        return (
          <div key={i} className="relative">
            <button
              type="button"
              role="menuitem"
              disabled={it.disabled}
              aria-haspopup={it.sub ? "menu" : undefined}
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
              className={`flex w-full items-center gap-2 px-2.5 py-[5px] text-left hover:bg-[#e5f1fb] disabled:opacity-40 ${open?.i === i ? "bg-[#e5f1fb]" : ""}`}
            >
              <span className="flex w-4 shrink-0 justify-center">
                {it.color ? <span className="h-3 w-3 rounded-[2px]" style={{ background: it.color }} /> : it.checked ? <OIcon name="check" size={14} /> : it.icon}
              </span>
              <span className={`flex-1 whitespace-nowrap ${it.bold ? "font-semibold" : ""}`}>{it.label}</span>
              {it.shortcut && <span className="pl-4 text-[11px] text-gray-500">{it.shortcut}</span>}
              {it.sub && <OIcon name="chevronRight" size={12} />}
            </button>
            {open?.i === i && it.sub && <MenuList items={it.sub} x={open.x} y={open.y} onClose={onClose} depth={depth + 1} />}
          </div>
        );
      })}
    </div>
  );
}

export function ContextMenu({ x, y, items, onClose }: { x: number; y: number; items: MenuEntry[]; onClose: () => void }) {
  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("[data-olmenu]")) onClose();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    document.addEventListener("keydown", key);
    window.addEventListener("scroll", onClose, true);
    window.addEventListener("resize", onClose);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
      window.removeEventListener("scroll", onClose, true);
      window.removeEventListener("resize", onClose);
    };
  }, [onClose]);
  return <MenuList items={items} x={x} y={y} onClose={onClose} />;
}

/** A dropdown button that opens a MenuEntry list (reading pane Accept ▾, Send ▾, sort menus). */
export function MenuButton({ label, items, className, children, title, ariaLabel }: { label?: ReactNode; items: MenuEntry[]; className?: string; children?: ReactNode; title?: string; ariaLabel?: string }) {
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);
  return (
    <>
      <button
        type="button"
        title={title}
        aria-label={ariaLabel ?? (typeof label === "string" ? label : title)}
        aria-haspopup="menu"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setAt({ x: r.left, y: r.bottom + 2 });
        }}
        className={className}
      >
        {children ?? label}
      </button>
      {at && <ContextMenu x={at.x} y={at.y} items={items} onClose={() => setAt(null)} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Modal frame (canvas-drawn dialogs)                                  */
/* ------------------------------------------------------------------ */

export function Modal({
  title,
  children,
  onClose,
  width = 440,
  footer,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: number;
  footer?: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/10 p-2" onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Escape") onClose(); }}>
      <div role="dialog" aria-modal="true" aria-label={title} className="flex max-h-full flex-col border border-gray-400 bg-[#f0f0f0] text-[12px] text-gray-900 shadow-2xl" style={{ width, maxWidth: "100%" }}>
        <div className="flex items-center justify-between bg-white px-3 py-1.5">
          <span>{title}</span>
          <button type="button" aria-label="Close" onClick={onClose} className="px-2 hover:bg-red-600 hover:text-white">
            ✕
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-white p-3">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-gray-300 px-3 py-2">{footer}</div>}
      </div>
    </div>
  );
}

export function DlgButton({ children, onClick, primary, disabled }: { children: ReactNode; onClick: () => void; primary?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-w-[72px] border px-3 py-1 disabled:opacity-50 ${primary ? "border-[#0078d4] bg-[#e5f1fb] hover:bg-[#cce4f7]" : "border-gray-400 bg-[#e1e1e1] hover:bg-[#e5f1fb]"}`}
    >
      {children}
    </button>
  );
}

export type AlertSpec = { title: string; text: string; icon?: "warning" | "info"; buttons: { label: string; primary?: boolean; onClick?: () => void }[] };

export function AlertBox({ spec, onClose }: { spec: AlertSpec; onClose: () => void }) {
  return (
    <Modal
      title={spec.title}
      width={400}
      onClose={onClose}
      footer={spec.buttons.map((b) => (
        <DlgButton key={b.label} primary={b.primary} onClick={() => { onClose(); b.onClick?.(); }}>
          {b.label}
        </DlgButton>
      ))}
    >
      <div className="flex items-start gap-3">
        <span className={spec.icon === "info" ? "text-[#0f6cbd]" : "text-amber-500"}>
          <OIcon name={spec.icon === "info" ? "info" : "warning"} size={28} />
        </span>
        <p className="whitespace-pre-line pt-1 text-[12.5px] leading-snug">{spec.text}</p>
      </div>
    </Modal>
  );
}

/** Wait until `test` passes (the player applied the commit) or give up. */
export async function waitFor(test: () => boolean, ms = 160): Promise<boolean> {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (test()) return true;
    await new Promise((r) => setTimeout(r, 8));
  }
  return test();
}
