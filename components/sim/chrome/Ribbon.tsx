"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RibbonControl, RibbonGroup, RibbonOption, RibbonTab, SimValue } from "@/types/sim";
import { Icon } from "./icons";

export interface RibbonHandlers {
  onCommand: (id: string, value?: SimValue) => void;
  onDialog: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/* Popover menu (dropdowns, galleries, context menus)                  */
/* ------------------------------------------------------------------ */

export interface PopoverItem {
  key: string;
  label?: string;
  icon?: string;
  color?: string;
  heading?: boolean;
  separator?: boolean;
  disabled?: boolean;
  shortcut?: string;
  preview?: React.CSSProperties;
  onPick?: () => void;
}

export function Popover({
  anchor,
  items,
  layout = "list",
  onClose,
  width,
}: {
  anchor: { x: number; y: number };
  items: PopoverItem[];
  layout?: "list" | "grid" | "swatches" | "symbols";
  onClose: () => void;
  width?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(anchor);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let { x, y } = anchor;
    // Keep the menu inside the simulated app window (a menu near its right edge opens leftward, as on screen).
    const win = el.parentElement?.closest('[aria-label*="practice simulation"]')?.getBoundingClientRect();
    if (win && x + r.width > win.right - 4) x = Math.max(win.left + 4, win.right - r.width - 4);
    if (x + r.width > window.innerWidth - 8) x = Math.max(8, window.innerWidth - r.width - 8);
    if (y + r.height > window.innerHeight - 8) y = Math.max(8, window.innerHeight - r.height - 8);
    setPos({ x, y });
  }, [anchor]);

  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    document.addEventListener("keydown", key);
    // Close when the page scrolls, but not when the popover's own list scrolls.
    const scroll = (e: Event) => {
      if (ref.current && e.target instanceof Node && ref.current.contains(e.target)) return;
      onClose();
    };
    window.addEventListener("scroll", scroll, true);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
      window.removeEventListener("scroll", scroll, true);
    };
  }, [onClose]);

  const grid = layout === "swatches" || layout === "grid" || layout === "symbols";

  return (
    <div
      ref={ref}
      role="menu"
      className="fixed z-[200] max-h-[360px] overflow-auto rounded border border-gray-300 bg-white py-1 text-[12px] text-gray-800 shadow-xl"
      style={{ left: pos.x, top: pos.y, width: width ?? (layout === "swatches" ? 196 : layout === "grid" ? 300 : layout === "symbols" ? 196 : undefined), minWidth: 160 }}
    >
      <div className={grid ? "flex flex-wrap gap-1 px-2 py-1" : ""}>
        {items.map((it) => {
          if (it.separator) return <div key={it.key} className={grid ? "w-full" : "my-1 border-t border-gray-200"} />;
          if (it.heading)
            return (
              <div key={it.key} className={`${grid ? "w-full" : ""} bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-600`}>
                {it.label}
              </div>
            );
          if (layout === "swatches" && it.color)
            return (
              <button
                key={it.key}
                type="button"
                role="menuitem"
                title={it.label}
                aria-label={it.label}
                onClick={() => { it.onPick?.(); onClose(); }}
                className="h-5 w-5 border border-gray-300 hover:outline hover:outline-2 hover:outline-orange-400"
                style={{ background: it.color }}
              />
            );
          // Insert › Symbol: a grid of symbols; commands with an icon (More Symbols...) run across below it.
          if (layout === "symbols" && !it.icon)
            return (
              <button
                key={it.key}
                type="button"
                role="menuitem"
                title={it.label}
                aria-label={it.label}
                onClick={() => { it.onPick?.(); onClose(); }}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-gray-200 text-[17px] hover:border-orange-300 hover:bg-orange-50"
              >
                {it.label}
              </button>
            );
          if (layout === "symbols")
            return (
              <button key={it.key} type="button" role="menuitem" onClick={() => { it.onPick?.(); onClose(); }} className="mt-1 flex w-full items-center gap-2 border-t border-gray-200 px-1 pt-1.5 text-left hover:bg-[#e5f1fb]">
                <Icon name={it.icon} size={16} />
                {it.label}
              </button>
            );
          if (layout === "grid")
            return (
              <button
                key={it.key}
                type="button"
                role="menuitem"
                disabled={it.disabled}
                title={it.label}
                onClick={() => { it.onPick?.(); onClose(); }}
                className="flex w-[88px] flex-col items-center gap-1 rounded border border-transparent p-1.5 text-center hover:border-orange-300 hover:bg-orange-50"
              >
                {it.color ? (
                  <span className="block h-10 w-full rounded-sm border border-gray-200" style={{ background: it.color }} />
                ) : (
                  <Icon name={it.icon} size={28} />
                )}
                <span className="line-clamp-2 text-[11px] leading-tight" style={it.preview}>{it.label}</span>
              </button>
            );
          return (
            <button
              key={it.key}
              type="button"
              role="menuitem"
              disabled={it.disabled}
              onClick={() => { it.onPick?.(); onClose(); }}
              className="flex w-full items-center gap-2 px-2 py-1 text-left hover:bg-[#e5f1fb] disabled:opacity-40"
            >
              {it.color ? (
                <span className="h-3.5 w-3.5 shrink-0 border border-gray-300" style={{ background: it.color }} />
              ) : it.icon ? (
                <Icon name={it.icon} size={16} />
              ) : (
                <span className="w-4 shrink-0" />
              )}
              <span className="flex-1 whitespace-nowrap" style={it.preview}>{it.label}</span>
              {it.shortcut && <span className="pl-4 text-[11px] text-gray-500">{it.shortcut}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

function optionItems(
  opts: RibbonOption[],
  parentId: string,
  h: RibbonHandlers,
): PopoverItem[] {
  return opts.map((o, i) => ({
    key: `${o.value}-${i}`,
    label: o.label ?? o.value,
    icon: o.icon,
    color: o.color,
    heading: o.heading,
    preview: o.preview
      ? {
          fontWeight: o.preview.bold ? 700 : undefined,
          fontStyle: o.preview.italic ? "italic" : undefined,
          fontSize: o.preview.size ? Math.min(o.preview.size, 20) : undefined,
          color: o.preview.color,
          fontFamily: o.preview.font,
        }
      : undefined,
    onPick: o.heading
      ? undefined
      : () => (o.dialog ? h.onDialog(o.dialog) : h.onCommand(o.command ?? parentId, o.value)),
  }));
}

function Caret() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" className="shrink-0">
      <path d="M1 2.5l3 3 3-3" stroke="#555" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/** Combo boxes Office shows without a caption (everything else gets "Label:" like Indent Left or Duration). */
const UNLABELED_COMBOS = new Set(["Font", "Font Size", "Number Format", "Display for Review"]);

function ControlView({
  c,
  state,
  h,
  forceSmall,
}: {
  c: RibbonControl;
  state: Record<string, SimValue | undefined>;
  h: RibbonHandlers;
  forceSmall?: boolean;
}) {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);
  const [comboText, setComboText] = useState<string | null>(null);

  if (c.type === "separator") return <div className="mx-0.5 h-full w-px bg-gray-200" />;

  const large = !forceSmall && c.type !== "gallery" && "size" in c && c.size === "large";
  const pressed = c.type === "toggle" ? Boolean(state[c.stateKey ?? c.id]) : false;
  const tip = "tip" in c && c.tip ? c.tip : c.label + ("shortcut" in c && c.shortcut ? ` (${c.shortcut})` : "");

  const openMenu = (el: Element | null) => {
    const r = (el ?? btnRef.current)?.getBoundingClientRect();
    if (r) setMenu({ x: r.left, y: r.bottom + 2 });
  };

  if (c.type === "gallery") {
    const visible = c.options.filter((o) => !o.heading && !o.dialog).slice(0, 4);
    return (
      <div className="flex h-[62px] items-stretch rounded-sm border border-gray-300 bg-white" style={{ width: c.width ?? 300 }}>
        <div className="flex flex-1 items-stretch gap-0.5 overflow-hidden p-0.5">
          {visible.map((o) => (
            <button
              key={o.value}
              type="button"
              title={o.label ?? o.value}
              onClick={() => h.onCommand(o.command ?? c.id, o.value)}
              className={`flex min-w-0 flex-1 flex-col justify-center rounded-sm border px-1 text-left hover:border-orange-300 hover:bg-orange-50 ${
                state[c.id] === o.value ? "border-orange-400 bg-orange-50" : "border-transparent"
              }`}
            >
              {o.color && <span className="mb-0.5 block h-6 w-full rounded-sm" style={{ background: o.color }} />}
              <span
                className="truncate text-[11px] leading-tight"
                style={{
                  fontWeight: o.preview?.bold ? 700 : undefined,
                  fontStyle: o.preview?.italic ? "italic" : undefined,
                  color: o.preview?.color,
                  fontSize: o.preview?.size ? Math.min(o.preview.size, 15) : undefined,
                  fontFamily: o.preview?.font,
                }}
              >
                {o.label ?? o.value}
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          ref={btnRef as React.RefObject<HTMLButtonElement>}
          aria-label={`More ${c.label}`}
          title={`More ${c.label}`}
          onClick={(e) => openMenu(e.currentTarget)}
          className="flex w-4 items-end justify-center border-l border-gray-200 pb-1 hover:bg-gray-100"
        >
          <Caret />
        </button>
        {menu && (
          <Popover
            anchor={menu}
            items={optionItems(c.options, c.id, h)}
            layout={c.options.some((o) => o.color) ? "grid" : "list"}
            onClose={() => setMenu(null)}
          />
        )}
      </div>
    );
  }

  if (c.type === "dropdown" && c.combo) {
    const val = String(state[c.stateKey ?? c.id] ?? "");
    const labeled = "showLabel" in c && c.showLabel !== undefined ? Boolean(c.showLabel) : !UNLABELED_COMBOS.has(c.label);
    return (
      <div className="flex items-center gap-1" title={tip}>
      {labeled && <span className="whitespace-nowrap text-[11.5px] text-gray-700">{c.label}:</span>}
      <div className="flex h-[22px] items-stretch rounded-sm border border-gray-300 bg-white" style={{ width: c.width ?? 120 }}>
        <input
          aria-label={c.label}
          value={comboText ?? val}
          onChange={(e) => setComboText(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={() => setComboText(null)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" && comboText !== null) {
              h.onCommand(c.id, comboText.trim());
              setComboText(null);
              (e.target as HTMLInputElement).blur();
            }
            if (e.key === "Escape") {
              setComboText(null);
              (e.target as HTMLInputElement).blur();
            }
          }}
          className="min-w-0 flex-1 px-1 text-[12px] outline-none"
        />
        <button
          type="button"
          aria-label={`${c.label} list`}
          onClick={(e) => openMenu(e.currentTarget.parentElement)}
          className="flex w-4 items-center justify-center border-l border-gray-200 hover:bg-[#e5f1fb]"
        >
          <Caret />
        </button>
        {menu && (
          <Popover anchor={menu} items={optionItems(c.options, c.id, h)} onClose={() => setMenu(null)} width={c.width ? Math.max(c.width, 180) : undefined} />
        )}
      </div>
      </div>
    );
  }

  // A toggle with no icon is a checkbox in Office (Different First Page, Gridlines, Hide Background Graphics).
  if (c.type === "toggle" && !c.icon) {
    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={pressed}
        title={tip}
        onClick={() => h.onCommand(c.id)}
        className="flex h-[22px] items-center gap-1.5 rounded-sm border border-transparent px-1 text-[11.5px] leading-tight text-gray-800 hover:border-[#cce4f7] hover:bg-[#e5f1fb]"
      >
        <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border ${pressed ? "border-[#0f6cbd] bg-[#0f6cbd]" : "border-gray-500 bg-white"}`} aria-hidden="true">
          {pressed && (
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 5.2l2 2 4-4.4" stroke="#fff" strokeWidth="1.6" fill="none" />
            </svg>
          )}
        </span>
        <span className="whitespace-nowrap">{c.label}</span>
      </button>
    );
  }

  const isDropdown = c.type === "dropdown";
  const split = isDropdown && c.split;

  const onFace = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (c.type === "button") {
      if (c.dialog) h.onDialog(c.dialog);
      else h.onCommand(c.id);
    } else if (c.type === "toggle") {
      h.onCommand(c.id);
    } else if (c.type === "dropdown") {
      if (c.split) h.onCommand(c.id, c.faceValue);
      else openMenu(e.currentTarget);
    }
  };

  const showLabel = large || ("showLabel" in c && c.showLabel);
  const base = `flex items-center rounded-sm border text-[11.5px] leading-tight text-gray-800 ${
    pressed ? "border-[#9cc3e5] bg-[#cce4f7]" : "border-transparent hover:border-[#cce4f7] hover:bg-[#e5f1fb]"
  }`;

  return (
    <div className={`relative flex ${large && split ? "flex-col" : ""}`}>
      <button
        type="button"
        ref={btnRef as React.RefObject<HTMLButtonElement>}
        title={tip}
        aria-label={c.label}
        aria-pressed={c.type === "toggle" ? pressed : undefined}
        aria-haspopup={isDropdown && !split ? "menu" : undefined}
        onClick={onFace}
        className={
          large
            ? `${base} ${split ? "h-[38px] justify-center rounded-b-none" : "h-[66px] justify-start pt-1"} min-w-[44px] max-w-[96px] flex-col gap-0.5 px-1 text-center`
            : `${base} h-[22px] gap-1 px-1`
        }
      >
        <Icon name={"icon" in c ? c.icon : undefined} size={large ? 30 : 16} />
        {showLabel && !(large && split) && (
          <span className={large ? "flex items-start gap-0.5 whitespace-normal text-[11px]" : "whitespace-nowrap"}>
            <span className={large ? "line-clamp-2" : undefined}>{c.label}</span>
            {isDropdown && !split && large && <span className="mt-1"><Caret /></span>}
          </span>
        )}
        {isDropdown && !split && !large && <Caret />}
      </button>
      {split && (
        <button
          type="button"
          aria-label={`${c.label} options`}
          title={`${c.label} options`}
          onClick={(e) => openMenu(large ? e.currentTarget.parentElement : e.currentTarget)}
          className={`flex items-center justify-center rounded-sm border border-transparent hover:border-[#cce4f7] hover:bg-[#e5f1fb] ${
            large ? "h-[28px] w-full max-w-[96px] items-start gap-0.5 rounded-t-none text-center text-[11px] leading-tight text-gray-800" : "h-[22px] w-3"
          }`}
        >
          {/* Office's large split button: the icon runs the command; the label and arrow below open the menu. */}
          {large && <span className="line-clamp-2">{c.label}</span>}
          <span className={large ? "mt-1" : undefined}><Caret /></span>
        </button>
      )}
      {menu && isDropdown && (
        <Popover
          anchor={menu}
          items={optionItems((c as Extract<RibbonControl, { type: "dropdown" }>).options, c.id, h)}
          layout={(c as Extract<RibbonControl, { type: "dropdown" }>).gallery ?? "list"}
          onClose={() => setMenu(null)}
        />
      )}
    </div>
  );
}

/** A group shrunk to one button when the Ribbon is too narrow; clicking it drops the full group down. */
function CollapsedGroupView({ g, state, h }: { g: RibbonGroup; state: Record<string, SimValue | undefined>; h: RibbonHandlers }) {
  const [open, setOpen] = useState<{ x: number; y: number } | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const first = [...(g.rows ?? []).flat(), ...g.controls].find((c) => c.type !== "separator" && "icon" in c && c.icon);
  const icon = first && "icon" in first ? first.icon : undefined;
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpen(null);
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const t = setTimeout(() => document.addEventListener("mousedown", down), 0);
    document.addEventListener("keydown", key);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  const closeAfter: RibbonHandlers = {
    onCommand: (id, v) => {
      setOpen(null);
      h.onCommand(id, v);
    },
    onDialog: (id) => {
      setOpen(null);
      h.onDialog(id);
    },
  };
  return (
    <div className="relative flex h-full shrink-0 flex-col items-center border-r border-gray-200 px-1">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={Boolean(open)}
        title={g.label}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOpen(open ? null : { x: r.left, y: r.bottom + 2 });
        }}
        className={`flex h-[66px] min-w-[52px] max-w-[84px] flex-col items-center justify-start gap-0.5 rounded-sm border px-1 pt-1 text-center text-[11px] leading-tight text-gray-800 ${
          open ? "border-[#9cc3e5] bg-[#cce4f7]" : "border-transparent hover:border-[#cce4f7] hover:bg-[#e5f1fb]"
        }`}
      >
        <Icon name={icon} size={30} />
        <span className="flex items-start gap-0.5">
          <span className="line-clamp-2">{g.label}</span>
          <span className="mt-1"><Caret /></span>
        </span>
      </button>
      {open && (
        <div ref={panel} className="fixed z-[190] flex h-[92px] rounded-sm border border-gray-300 bg-white py-1 shadow-xl" style={{ left: open.x, top: open.y }}>
          <GroupView g={g} state={state} h={closeAfter} />
        </div>
      )}
    </div>
  );
}

function GroupView({ g, state, h }: { g: RibbonGroup; state: Record<string, SimValue | undefined>; h: RibbonHandlers }) {
  // Lay out: large controls each take a column; consecutive small ones stack in columns of 3.
  const cols: RibbonControl[][] = [];
  let pending: RibbonControl[] = [];
  const flush = () => {
    if (pending.length) cols.push(pending);
    pending = [];
  };
  for (const c of g.controls) {
    const isLarge = c.type !== "separator" && c.type !== "gallery" && "size" in c && c.size === "large";
    if (isLarge || c.type === "gallery" || c.type === "separator") {
      flush();
      cols.push([c]);
    } else {
      pending.push(c);
      if (pending.length === 3) flush();
    }
  }
  flush();

  return (
    <div className="relative flex h-full shrink-0 flex-col border-r border-gray-200 px-1.5">
      <div className="flex flex-1 items-start gap-0.5 pt-0.5">
        {g.rows && (
          <div className="flex flex-col gap-[3px] pr-1">
            {g.rows.map((row, i) => (
              <div key={i} className="flex items-center gap-0.5">
                {row.map((c, j) => (
                  <ControlView key={j} c={c} state={state} h={h} forceSmall />
                ))}
              </div>
            ))}
          </div>
        )}
        {cols.map((col, i) => (
          <div key={i} className={`flex ${col.length > 1 || (col[0].type !== "gallery" && "size" in col[0] && col[0].size !== "large") ? "flex-col gap-[1px]" : ""}`}>
            {col.map((c, j) => (
              <ControlView key={j} c={c} state={state} h={h} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center pb-0.5 text-[11px] text-gray-500">
        <span className="px-3">{g.label}</span>
        {g.launcher && (
          <button
            type="button"
            title={`${g.label} settings`}
            aria-label={`${g.label} dialog box launcher`}
            onClick={() => h.onDialog(g.launcher!)}
            className="absolute bottom-0.5 right-0.5 rounded-sm hover:bg-[#e5f1fb]"
          >
            <Icon name="dialogLauncher" size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export function Ribbon({
  tabs,
  activeTab,
  setActiveTab,
  state,
  handlers,
  accent,
  collapsed,
  onToggleCollapse,
  onFile,
}: {
  tabs: RibbonTab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  state: Record<string, SimValue | undefined>;
  handlers: RibbonHandlers;
  accent: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onFile: () => void;
}) {
  const [peek, setPeek] = useState(false);
  const tab = tabs.find((t) => t.id === activeTab) ?? tabs[0];
  const showBody = !collapsed || peek;

  // When the groups don't fit, shrink them one at a time from the right into
  // single buttons, the way Office does in a narrow window, so nothing is
  // hidden off the edge.
  const panelRef = useRef<HTMLDivElement>(null);
  const [shrunk, setShrunk] = useState(0);
  const [width, setWidth] = useState(0);
  const groupCount = tab?.groups.length ?? 0;
  useLayoutEffect(() => setShrunk(0), [tab?.id, width, groupCount]);
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth + 1 && shrunk < groupCount) setShrunk((n) => n + 1);
  });
  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setWidth(Math.round(el.clientWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [showBody]);

  return (
    <div className="relative select-none border-b border-gray-300 bg-[#f3f3f3]">
      <div role="tablist" className="flex items-end gap-0.5 overflow-x-auto px-1 pt-1 text-[12.5px]">
        <button
          type="button"
          onClick={onFile}
          className="rounded-t-sm px-3 py-1 font-medium text-white hover:brightness-110"
          style={{ background: accent }}
        >
          File
        </button>
        {tabs.map((t) => {
          const active = t.id === tab.id && showBody;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === tab.id}
              onClick={() => {
                setActiveTab(t.id);
                if (collapsed) setPeek((p) => (t.id === tab.id ? !p : true));
              }}
              onDoubleClick={onToggleCollapse}
              className={`relative whitespace-nowrap rounded-t-sm px-3 py-1 ${
                active ? "bg-white font-medium shadow-[0_-1px_0_#d1d1d1,1px_0_0_#d1d1d1,-1px_0_0_#d1d1d1]" : "hover:bg-white/70"
              } ${t.contextual && !t.plain ? "text-[#7a3f00]" : "text-gray-800"}`}
              style={active ? { color: t.contextual && !t.plain ? "#7a3f00" : accent } : undefined}
            >
              {t.contextual && !t.plain && <span className="absolute inset-x-1 top-0 h-0.5 bg-amber-500" aria-hidden="true" />}
              {t.label}
            </button>
          );
        })}
      </div>
      {showBody && (
        <div
          role="tabpanel"
          ref={panelRef}
          className={`flex h-[92px] items-stretch overflow-x-auto bg-white py-1 ${collapsed ? "absolute inset-x-0 top-full z-30 border-b border-gray-300 shadow-lg" : ""}`}
        >
          {tab.groups.map((g, i) =>
            i >= tab.groups.length - shrunk ? (
              <CollapsedGroupView key={`${tab.id}-${i}-c`} g={g} state={state} h={handlers} />
            ) : (
              <GroupView key={`${tab.id}-${i}`} g={g} state={state} h={handlers} />
            ),
          )}
          <div className="flex-1" />
          <button
            type="button"
            title={collapsed ? "Pin the ribbon" : "Collapse the Ribbon (Ctrl+F1)"}
            aria-label={collapsed ? "Pin the ribbon" : "Collapse the Ribbon"}
            onClick={() => {
              setPeek(false);
              onToggleCollapse();
            }}
            className="mr-1 self-end rounded-sm p-1 hover:bg-gray-100"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d={collapsed ? "M2 5l4 4 4-4" : "M2 8l4-4 4 4"} stroke="#444" strokeWidth="1.4" fill="none" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/** Flattened list of every command reachable from the Ribbon, for the search box. */
export function searchRibbon(tabs: RibbonTab[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const out: { label: string; path: string; id: string; value?: string; dialog?: string }[] = [];
  const seen = new Set<string>();
  const add = (label: string, path: string, id: string, value?: string, dialog?: string) => {
    const k = `${id}|${value ?? ""}|${dialog ?? ""}`;
    if (seen.has(k)) return;
    seen.add(k);
    out.push({ label, path, id, value, dialog });
  };
  for (const t of tabs) {
    for (const g of t.groups) {
      const all = [...g.controls, ...(g.rows ?? []).flat()];
      if (g.launcher && `${g.label} settings`.toLowerCase().includes(q)) add(`${g.label} Settings…`, `${t.label} › ${g.label}`, "", undefined, g.launcher);
      for (const c of all) {
        if (c.type === "separator") continue;
        const path = `${t.label} › ${g.label}`;
        if (c.label.toLowerCase().includes(q)) {
          if (c.type === "button") add(c.label, path, c.id, undefined, c.dialog);
          else if (c.type === "toggle") add(c.label, path, c.id);
          else if (c.type === "dropdown" && c.split) add(c.label, path, c.id, c.faceValue);
        }
        if (c.type === "dropdown" || c.type === "gallery") {
          for (const o of c.options) {
            if (o.heading) continue;
            const l = o.label ?? o.value;
            if (l.toLowerCase().includes(q) || c.label.toLowerCase().includes(q)) {
              add(`${c.label}: ${l}`, path, o.command ?? c.id, o.value, o.dialog);
            }
          }
        }
      }
    }
  }
  return out.slice(0, 12);
}
