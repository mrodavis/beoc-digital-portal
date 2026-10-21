"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { DialogField, SimCommit, SimValue } from "@/types/sim";
import type { SimUi } from "../../types";
import { googleDialogs } from "./dialogs";
import { AppLogo, DriveLogo, GIcon } from "./icons";
import { isItem, PALETTE_ROWS, SAVE_AS_GOOGLE, SEP, type GEntry, type GItem, type GTool } from "./menus";
import { fileOf, isOffice, meOf, officeExt, openFile, personOf, viewOn } from "./model";
import type { GComment, GoogleDoc, GPerson } from "./types";

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export interface GCtx {
  doc: GoogleDoc;
  ui: SimUi;
  onSelect: (p: Partial<SimUi>) => void;
  onCommit: (c: SimCommit) => void;
  cmd: (id: string, value?: SimValue) => void;
  /** Canvas-only actions: share, link, comment, rename, table, special, image:<source>, open, selectAll, fn:<NAME>, note, newFolder, upload, searchMenus, select. */
  act: (action: string, arg?: string) => void;
  /** Open one of the dialogs in dialogs.ts with starting values. */
  dialog: (id: string, initial?: Record<string, SimValue>) => void;
  /** Pressed / checked state for toolbars and menus. */
  state: Record<string, SimValue | undefined>;
  /** Replace $open, $slide, $row, $col placeholders. */
  resolve: (v: string) => string;
  /** Focus the canvas so keyboard shortcuts work. */
  focus: () => void;
  /** Callbacks the surfaces register for the canvas's keyboard and menu actions. */
  hooksRef: { current: Hooks };
}

export interface Hooks {
  /** Start typing into the selection ("\n" opens it for editing without a first key). */
  type?: (key: string) => void;
  /** File › Rename in an editor: open the title box. */
  rename?: () => void;
  /** Insert › Function in Sheets: start a formula. */
  fn?: (name: string) => void;
}

export const Ctx = createContext<GCtx | null>(null);
export const useG = () => useContext(Ctx)!;

export const FONT = "'Google Sans', Roboto, Arial, sans-serif";
export const TEXT_FONT = "Roboto, Arial, sans-serif";
export const BLUE = "#0b57d0";
export const COLLAB = ["#1a73e8", "#e8710a", "#188038", "#d93025", "#9334e6", "#129eaf", "#e52592", "#b06000"];

export function colorFor(p: { name: string; color?: string } | string | undefined): string {
  if (!p) return COLLAB[0];
  if (typeof p !== "string" && p.color) return p.color;
  const name = typeof p === "string" ? p : p.name;
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return COLLAB[h % COLLAB.length];
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "?").toUpperCase() + (parts.length > 1 ? "" : "");
}

export function Avatar({ person, size = 32, ring }: { person?: GPerson | { name: string; color?: string }; size?: number; ring?: boolean }) {
  const name = person?.name ?? "?";
  return (
    <span
      title={name}
      className="inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium text-white"
      style={{ width: size, height: size, background: colorFor(person), fontSize: size * 0.45, boxShadow: ring ? "0 0 0 2px #fff" : undefined, fontFamily: FONT }}
    >
      {initials(name)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Google apps menu and account menu                                    */
/* ------------------------------------------------------------------ */

function AppTile({ name, children, onClick }: { name: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" role="menuitem" aria-label={name} onClick={onClick} className="flex h-[86px] w-[86px] flex-col items-center justify-center gap-1.5 rounded-xl text-[13px] text-[#1f1f1f] hover:bg-[#e8f0fe]">
      <span className="flex h-10 w-10 items-center justify-center">{children}</span>
      <span className="truncate">{name}</span>
    </button>
  );
}

const ROUND = (bg: string, icon: string) => (
  <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: bg }}>
    <GIcon name={icon} size={22} color="#fff" />
  </span>
);

/** The Google apps menu (the grid of dots at the top right). */
export function AppsMenu({ onClose, pos }: { onClose: () => void; pos: MenuPos }) {
  const g = useG();
  const me = meOf(g.doc);
  const go = (app: string) => { onClose(); g.cmd("g.app", app); };
  const apps: [string, React.ReactNode][] = [
    ["Account", <Avatar key="a" person={me} size={34} />],
    ["Gmail", ROUND("#ea4335", "mail")],
    ["Drive", <DriveLogo key="d" size={36} />],
    ["Calendar", ROUND("#1a73e8", "calendar")],
    ["Meet", ROUND("#188038", "video")],
    ["Chat", ROUND("#34a853", "chat")],
    ["Docs", <AppLogo key="doc" kind="doc" size={38} />],
    ["Sheets", <AppLogo key="sheet" kind="sheet" size={38} />],
    ["Slides", <AppLogo key="slides" kind="slides" size={38} />],
    ["Forms", <AppLogo key="form" kind="form" size={38} />],
    ["Keep", ROUND("#f4b400", "note")],
    ["Contacts", ROUND("#1a73e8", "person")],
  ];
  return (
    <Popup onClose={onClose}>
      <div role="menu" aria-label="Google apps" className="fixed z-[200] w-[310px] rounded-[28px] bg-[#e9eef6] p-2" style={{ left: Math.max(8, pos.x - 310), top: pos.y + 6, boxShadow: "0 4px 8px 3px rgba(60,64,67,.15)", fontFamily: TEXT_FONT }}>
        <div className="grid grid-cols-3 justify-items-center gap-1 rounded-[22px] bg-white p-3">
          {apps.map(([n, icon]) => (
            <AppTile key={n} name={n} onClick={() => (n === "Account" ? (onClose(), g.cmd("g.account")) : go(n))}>
              {icon}
            </AppTile>
          ))}
        </div>
      </div>
    </Popup>
  );
}

export function AppsButton() {
  const [pos, setPos] = useState<MenuPos | null>(null);
  return (
    <>
      <IconBtn icon="apps" label="Google apps" pressed={Boolean(pos)} onClick={(e) => { e.stopPropagation(); const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setPos({ x: r.right, y: r.bottom }); }} />
      {pos && <AppsMenu pos={pos} onClose={() => setPos(null)} />}
    </>
  );
}

/** The account menu that opens from your profile picture: Manage your Google Account, Add account, Sign out. */
export function AccountButton({ size = 32 }: { size?: number }) {
  const g = useG();
  const me = meOf(g.doc);
  const [pos, setPos] = useState<MenuPos | null>(null);
  return (
    <>
      <button type="button" aria-label={`Google Account: ${me.name} (${me.email})`} title={`Google Account\n${me.name}\n${me.email}`} onClick={(e) => { e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); setPos({ x: r.right, y: r.bottom }); }} className="shrink-0 rounded-full p-1 hover:bg-black/5">
        <Avatar person={me} size={size} />
      </button>
      {pos && (
        <Popup onClose={() => setPos(null)}>
          <div role="dialog" aria-label="Account" className="fixed z-[200] w-[360px] rounded-[28px] bg-[#e9eef6] p-3 text-center text-[#1f1f1f]" style={{ left: Math.max(8, pos.x - 360), top: pos.y + 6, boxShadow: "0 4px 8px 3px rgba(60,64,67,.15)", fontFamily: TEXT_FONT }}>
            <div className="mb-3 flex items-center">
              <span className="flex-1 truncate pl-8 text-[14px] font-medium">{me.email}</span>
              <IconBtn icon="close" label="Close" onClick={() => setPos(null)} />
            </div>
            <div className="mb-2 flex justify-center"><Avatar person={me} size={80} /></div>
            <div className="mb-4 text-[22px]" style={{ fontFamily: FONT }}>Hi, {me.name.split(" ")[0]}!</div>
            <button type="button" onClick={() => { setPos(null); g.cmd("g.account"); }} className="mb-4 rounded-full border border-[#747775] px-6 py-2 text-[14px] font-medium text-[#0b57d0] hover:bg-[#0b57d0]/10" style={{ fontFamily: FONT }}>
              Manage your Google Account
            </button>
            <div className="flex gap-1 overflow-hidden rounded-[22px] text-[14px]">
              <button type="button" onClick={() => { setPos(null); g.cmd("g.toast", "Add another account opens the sign-in page"); }} className="flex flex-1 items-center justify-center gap-2 bg-white py-4 hover:bg-[#f1f3f4]">
                <GIcon name="plus" size={20} /> Add account
              </button>
              <button type="button" aria-label="Sign out" onClick={() => { setPos(null); g.cmd("g.signOut"); }} className="flex flex-1 items-center justify-center gap-2 bg-white py-4 hover:bg-[#f1f3f4]">
                <GIcon name="logout" size={20} /> Sign out
              </button>
            </div>
            <div className="mt-3 text-[12px] text-[#444746]">Privacy Policy · Terms of Service</div>
          </div>
        </Popup>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function IconBtn({ icon, label, onClick, pressed, size = 20, disabled, className, color, box = 32 }: { icon: string; label: string; onClick?: (e: React.MouseEvent) => void; pressed?: boolean; size?: number; disabled?: boolean; className?: string; color?: string; box?: number }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      aria-pressed={pressed}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center justify-center rounded-full disabled:opacity-40 ${pressed ? "bg-[#d3e3fd]" : "hover:bg-[#e9eef6]"} ${className ?? ""}`}
      style={{ width: box, height: box }}
    >
      <GIcon name={icon} size={size} color={color ?? (pressed ? "#041e49" : "#444746")} />
    </button>
  );
}

export function PillBtn({ children, onClick, kind = "filled", disabled, label, className }: { children: React.ReactNode; onClick?: () => void; kind?: "filled" | "tonal" | "text" | "outlined"; disabled?: boolean; label?: string; className?: string }) {
  const styles: Record<string, string> = {
    filled: "bg-[#0b57d0] text-white hover:bg-[#0842a0] hover:shadow",
    tonal: "bg-[#c2e7ff] text-[#001d35] hover:bg-[#b3d7ef]",
    text: "text-[#0b57d0] hover:bg-[#0b57d0]/10",
    outlined: "border border-[#747775] text-[#0b57d0] hover:bg-[#0b57d0]/10",
  };
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className={`inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full px-5 text-[14px] font-medium disabled:opacity-40 ${styles[kind]} ${className ?? ""}`} style={{ fontFamily: FONT }}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Menus                                                               */
/* ------------------------------------------------------------------ */

export interface MenuPos {
  x: number;
  y: number;
  /** Open to the left of x (for submenus near the right edge). */
  alignRight?: boolean;
}

function useClamp(ref: React.RefObject<HTMLDivElement | null>, pos: MenuPos) {
  const [off, setOff] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const r = el.getBoundingClientRect();
    let dx = 0, dy = 0;
    if (r.right > window.innerWidth - 4) dx = window.innerWidth - 4 - r.right;
    if (r.bottom > window.innerHeight - 4) dy = Math.max(-r.top + 4, window.innerHeight - 4 - r.bottom);
    if (dx || dy) setOff({ x: dx, y: dy });
  }, [pos.x, pos.y, ref]);
  return off;
}

export function MenuList({ entries, pos, onPick, state, resolve, onClose, width = 300 }: { entries: GEntry[]; pos: MenuPos; onPick: (i: GItem) => void; state?: Record<string, SimValue | undefined>; resolve?: (s: string) => string; onClose?: () => void; width?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const off = useClamp(ref, pos);
  const [sub, setSub] = useState<{ i: number; pos: MenuPos } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const lbl = (s: string) => (resolve ? resolve(s) : s);
  return (
    <div
      ref={ref}
      role="menu"
      className="fixed z-[200] rounded-md bg-white py-1.5 text-[14px] text-[#1f1f1f]"
      style={{ left: pos.x + off.x, top: pos.y + off.y, minWidth: width, boxShadow: "0 2px 6px 2px rgba(60,64,67,.15), 0 1px 2px rgba(60,64,67,.3)", fontFamily: TEXT_FONT }}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); onClose?.(); } }}
    >
      {entries.map((e, i) => {
        if ("sep" in e) return <div key={i} className="my-1.5 border-t border-[#e0e0e0]" />;
        if ("head" in e) return <div key={i} className="px-4 pb-1 pt-2 text-[12px] font-medium text-[#5f6368]">{e.head}</div>;
        const checked = e.check ? Boolean(state?.[e.check]) : false;
        return (
          <button
            key={i}
            type="button"
            role="menuitem"
            aria-label={lbl(e.label)}
            disabled={e.disabled}
            onMouseEnter={(ev) => {
              if (timer.current) clearTimeout(timer.current);
              if (e.sub) {
                const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
                setSub({ i, pos: { x: r.right - 4, y: r.top - 6 } });
              } else timer.current = setTimeout(() => setSub(null), 120);
            }}
            onClick={(ev) => {
              if (e.sub && !e.command && !e.dialog && !e.action) {
                const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
                setSub({ i, pos: { x: r.right - 4, y: r.top - 6 } });
                return;
              }
              onPick(e);
            }}
            className={`flex h-8 w-full items-center gap-3 px-3 text-left disabled:text-[#bdc1c6] ${sub?.i === i ? "bg-[#e8eaed]" : "hover:bg-[#f1f3f4]"}`}
          >
            <span className="flex w-5 shrink-0 justify-center">
              {checked ? <GIcon name="check" size={18} color="#1f1f1f" /> : e.swatch ? <span className="h-4 w-4 rounded-full" style={{ background: e.swatch }} /> : e.icon ? <GIcon name={e.icon} size={18} color="#444746" /> : null}
            </span>
            <span className="flex-1 truncate">{e.swatch ? "" : lbl(e.label)}</span>
            {e.shortcut && <span className="ml-6 whitespace-nowrap text-[12.5px] text-[#5f6368]">{e.shortcut}</span>}
            {e.sub && <GIcon name="chevronRight" size={18} color="#5f6368" />}
          </button>
        );
      })}
      {sub && isItem(entries[sub.i]) && (entries[sub.i] as GItem).sub && (
        <MenuList entries={(entries[sub.i] as GItem).sub!} pos={sub.pos} onPick={onPick} state={state} resolve={resolve} onClose={onClose} width={240} />
      )}
    </div>
  );
}

/** A click-away layer and a menu at a viewport position. */
export function Popup({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[190]"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onContextMenu={(e) => { e.preventDefault(); onClose(); }}
    >
      {children}
    </div>
  );
}

/** Run a menu item through the canvas context. */
export function useRunItem() {
  const g = useG();
  return (i: GItem) => {
    if (i.dialog) return g.dialog(i.dialog);
    if (i.action) return g.act(i.action);
    if (i.command) return g.cmd(i.command, i.value === undefined ? undefined : g.resolve(i.value));
  };
}

export function MenuBar({ menus }: { menus: Record<string, GEntry[]> }) {
  const g = useG();
  const run = useRunItem();
  const [open, setOpen] = useState<{ name: string; pos: MenuPos } | null>(null);
  const show = (name: string, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setOpen({ name, pos: { x: r.left, y: r.bottom } });
  };
  return (
    <div className="flex items-center gap-0.5 text-[14px] text-[#1f1f1f]" role="menubar" style={{ fontFamily: TEXT_FONT }}>
      {Object.keys(menus).map((name) => (
        <button
          key={name}
          type="button"
          role="menuitem"
          aria-label={name}
          onMouseDown={(e) => { e.preventDefault(); if (open?.name === name) setOpen(null); else show(name, e.currentTarget); }}
          onMouseEnter={(e) => { if (open && open.name !== name) show(name, e.currentTarget); }}
          className={`rounded px-[7px] py-[2px] ${open?.name === name ? "bg-[#e8eaed]" : "hover:bg-[#e8eaed]"}`}
        >
          {name}
        </button>
      ))}
      {open && (
        <Popup onClose={() => setOpen(null)}>
          <MenuList entries={menus[open.name]} pos={open.pos} state={g.state} resolve={g.resolve} onPick={(i) => { setOpen(null); run(i); }} onClose={() => setOpen(null)} />
        </Popup>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toolbar                                                             */
/* ------------------------------------------------------------------ */

export function ColorGrid({ pos, onPick, onClose, resetLabel = "Reset" }: { pos: MenuPos; onPick: (hex: string) => void; onClose: () => void; resetLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const off = useClamp(ref, pos);
  return (
    <Popup onClose={onClose}>
      <div ref={ref} className="fixed z-[200] rounded-md bg-white p-3" style={{ left: pos.x + off.x, top: pos.y + off.y, boxShadow: "0 2px 6px 2px rgba(60,64,67,.15)" }}>
        <button type="button" onClick={() => onPick(resetLabel)} className="mb-2 flex w-full items-center gap-2 rounded px-1 py-1 text-left text-[13px] hover:bg-[#f1f3f4]">
          <GIcon name="restore" size={16} /> {resetLabel === "None" ? "None" : "Reset"}
        </button>
        <div className="space-y-1">
          {PALETTE_ROWS.map((row, ri) => (
            <div key={ri} className={`flex gap-1 ${ri === 1 ? "mb-2" : ""}`}>
              {row.map((p) => (
                <button key={p.hex} type="button" title={p.name} aria-label={p.name} onClick={() => onPick(p.hex)} className="h-[17px] w-[17px] rounded-full border border-black/10 hover:scale-110" style={{ background: p.hex }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
}

function ComboBox({ tool }: { tool: GTool }) {
  const g = useG();
  const run = useRunItem();
  const [open, setOpen] = useState<MenuPos | null>(null);
  const [text, setText] = useState<string | null>(null);
  const cur = String(g.state[tool.stateKey ?? ""] ?? "");
  const editable = tool.kind === "combo" && (tool.id === "size" || tool.id === "zoom");
  const commit = (v: string) => {
    setText(null);
    setOpen(null);
    if (v.trim()) g.cmd(tool.command!, tool.id === "zoom" && tool.command === "view.zoom" ? v.replace("%", "") : v.trim());
  };
  const options = tool.options ?? [];
  return (
    <span className={`relative inline-flex h-7 shrink-0 items-center rounded ${tool.id === "size" ? "border border-[#747775]" : "hover:bg-[#e9eef6]"}`} style={{ width: tool.width ? tool.width + (tool.id === "size" ? 0 : 18) : undefined }}>
      {editable ? (
        <input
          aria-label={tool.label}
          title={tool.label}
          value={text ?? cur}
          onChange={(e) => setText(e.target.value)}
          onFocus={(e) => { setText(cur); e.currentTarget.select(); }}
          onBlur={() => setText(null)}
          onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { commit(e.currentTarget.value); g.focus(); } if (e.key === "Escape") { setText(null); g.focus(); } }}
          className={`h-full w-full bg-transparent text-[14px] text-[#1f1f1f] outline-none ${tool.id === "size" ? "text-center" : "pl-1.5"}`}
        />
      ) : (
        <button
          type="button"
          aria-label={tool.label}
          title={tool.label}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setOpen({ x: r.left, y: r.bottom + 2 }); }}
          className="flex h-full w-full items-center truncate pl-1.5 text-left text-[14px] text-[#1f1f1f]"
        >
          <span className="flex-1 truncate">{cur}</span>
        </button>
      )}
      {tool.id !== "size" && (
        <button type="button" aria-label={`${tool.label} options`} tabIndex={-1} onMouseDown={(e) => e.preventDefault()} onClick={(e) => { const r = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect(); setOpen({ x: r.left, y: r.bottom + 2 }); }} className="flex h-full w-[18px] items-center justify-center">
          <GIcon name="dropDown" size={18} />
        </button>
      )}
      {tool.id === "size" && (
        <button type="button" aria-label="Font size options" tabIndex={-1} onMouseDown={(e) => e.preventDefault()} onClick={(e) => { const r = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect(); setOpen({ x: r.left, y: r.bottom + 2 }); }} className="absolute inset-y-0 right-0 w-2" />
      )}
      {open && (
        <Popup onClose={() => setOpen(null)}>
          <MenuList
            entries={options.map((o) => ({ label: o, command: tool.command, value: tool.command === "view.zoom" ? o.replace("%", "") : o, check: `opt:${tool.id}:${o}` }))}
            pos={open}
            width={tool.id === "style" ? 220 : tool.id === "font" ? 200 : 90}
            state={{ [`opt:${tool.id}:${cur}`]: true }}
            onPick={(i) => { setOpen(null); run(i); }}
            onClose={() => setOpen(null)}
          />
        </Popup>
      )}
    </span>
  );
}

function ToolItem({ tool, onDone }: { tool: GTool; onDone?: () => void }) {
  const g = useG();
  const run = useRunItem();
  const [menu, setMenu] = useState<MenuPos | null>(null);
  const [colors, setColors] = useState<MenuPos | null>(null);
  if (tool.kind === "sep") return <span className="mx-1 h-5 w-px shrink-0 bg-[#c7c7c7]" />;
  if (tool.kind === "combo" || tool.kind === "select") return <ComboBox tool={tool} />;
  const label = `${tool.label}${tool.shortcut ? ` (${tool.shortcut})` : ""}`;
  const pressed = tool.kind === "toggle" && Boolean(g.state[tool.stateKey ?? ""]);
  const icon = tool.stateKey === "alignIcon" ? String(g.state.alignIcon ?? tool.icon) : tool.icon;
  const face = () => {
    onDone?.();
    if (tool.dialog) return g.dialog(tool.dialog);
    if (tool.action) return g.act(tool.action);
    if (tool.command) return g.cmd(tool.command, tool.value === undefined ? undefined : g.resolve(tool.value));
  };
  const openMenu = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setMenu({ x: r.left, y: r.bottom + 2 });
  };
  const btnCls = "inline-flex h-7 shrink-0 items-center justify-center rounded";
  const iconColor = "#444746";
  return (
    <>
      {tool.kind === "colors" ? (
        <button type="button" aria-label={tool.label} title={tool.label} onMouseDown={(e) => e.preventDefault()} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setColors({ x: r.left, y: r.bottom + 2 }); }} className={`${btnCls} w-7 flex-col hover:bg-[#e9eef6]`}>
          <GIcon name={tool.icon!} size={17} color={iconColor} />
          <span className="-mt-0.5 h-[3px] w-4" style={{ background: String(g.state[tool.stateKey ?? ""] ?? (tool.command === "home.highlight" || tool.command === "home.fill" ? "transparent" : "#000")) }} />
        </button>
      ) : tool.kind === "menu" ? (
        <button type="button" aria-label={tool.label} title={label} onMouseDown={(e) => e.preventDefault()} onClick={(e) => openMenu(e.currentTarget)} className={`${btnCls} gap-0 px-0.5 hover:bg-[#e9eef6] ${menu ? "bg-[#d3e3fd]" : ""}`}>
          {icon ? <GIcon name={icon} size={20} color={iconColor} /> : <span className="px-1.5 text-[14px] text-[#1f1f1f]">{tool.label}</span>}
          {icon && <GIcon name="dropDown" size={16} color={iconColor} />}
        </button>
      ) : tool.kind === "split" ? (
        <span className={`${btnCls} ${pressed ? "bg-[#d3e3fd]" : ""}`}>
          <button type="button" aria-label={tool.label} title={label} onMouseDown={(e) => e.preventDefault()} onClick={face} className="inline-flex h-7 w-7 items-center justify-center rounded-l hover:bg-[#e9eef6]">
            <GIcon name={tool.icon!} size={20} color={iconColor} />
          </button>
          <button type="button" aria-label={`${tool.label} menu`} title={`${tool.label} menu`} onMouseDown={(e) => e.preventDefault()} onClick={(e) => openMenu(e.currentTarget.parentElement as HTMLElement)} className="inline-flex h-7 w-3.5 items-center justify-center rounded-r hover:bg-[#e9eef6]">
            <GIcon name="dropDown" size={16} color={iconColor} />
          </button>
        </span>
      ) : (
        <button type="button" aria-label={tool.label} title={label} aria-pressed={tool.kind === "toggle" ? pressed : undefined} onMouseDown={(e) => e.preventDefault()} onClick={face} className={`${btnCls} ${tool.icon ? "w-7" : "px-2 text-[14px] text-[#1f1f1f]"} ${pressed ? "bg-[#d3e3fd]" : "hover:bg-[#e9eef6]"}`}>
          {tool.icon ? <GIcon name={tool.icon} size={20} color={pressed ? "#041e49" : iconColor} /> : tool.label}
        </button>
      )}
      {menu && tool.items && (
        <Popup onClose={() => setMenu(null)}>
          <MenuList entries={tool.items} pos={menu} state={g.state} resolve={g.resolve} width={tool.id === "align" ? 200 : 240} onPick={(i) => { setMenu(null); onDone?.(); run(i); }} onClose={() => setMenu(null)} />
        </Popup>
      )}
      {colors && <ColorGrid pos={colors} resetLabel={tool.command === "home.highlight" ? "None" : "Reset"} onClose={() => setColors(null)} onPick={(hex) => { setColors(null); onDone?.(); g.cmd(tool.command!, hex); }} />}
    </>
  );
}

/** The rounded toolbar. Tools that do not fit move into the ⋮ overflow. */
export function Toolbar({ tools, right }: { tools: GTool[]; right?: React.ReactNode }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(0);
  const [over, setOver] = useState<MenuPos | null>(null);
  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const max = el.clientWidth - 34;
      let n = 0;
      for (const k of kids) {
        k.style.visibility = "";
        if (k.offsetLeft + k.offsetWidth > max) { k.style.visibility = "hidden"; n++; }
      }
      setHidden(n);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tools]);
  const visibleCount = tools.length - hidden;
  return (
    <div className="mx-2 mb-1.5 flex h-10 shrink-0 items-center rounded-full bg-[#edf2fa] px-2" role="toolbar" aria-label="Toolbar">
      <div ref={rowRef} className="relative flex min-w-0 flex-1 items-center gap-[1px] overflow-hidden">
        {tools.map((t, i) => <ToolItem key={i} tool={t} />)}
      </div>
      {hidden > 0 && (
        <IconBtn icon="more" label="More" box={28} onClick={(e) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); setOver({ x: Math.max(8, r.right - 360), y: r.bottom + 4 }); }} />
      )}
      {right}
      {over && (
        <Popup onClose={() => setOver(null)}>
          <div className="fixed z-[200] flex max-w-[380px] flex-wrap items-center gap-[1px] rounded-md bg-white p-1.5" style={{ left: over.x, top: over.y, boxShadow: "0 2px 6px 2px rgba(60,64,67,.15)" }}>
            {tools.slice(visibleCount).map((t, i) => <ToolItem key={i} tool={t} onDone={() => setOver(null)} />)}
          </div>
        </Popup>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dialogs                                                             */
/* ------------------------------------------------------------------ */

export function Modal({ title, children, onClose, width = 480, footer }: { title: React.ReactNode; children: React.ReactNode; onClose: () => void; width?: number; footer?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center bg-black/40 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } }}>
      <div role="dialog" aria-label={typeof title === "string" ? title : "Dialog"} className="flex max-h-full w-full flex-col overflow-hidden rounded-[28px] bg-white" style={{ maxWidth: width, boxShadow: "0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)", fontFamily: TEXT_FONT }}>
        <div className="flex items-start gap-2 px-6 pb-2 pt-6">
          <h2 className="flex-1 text-[22px] leading-7 text-[#1f1f1f]" style={{ fontFamily: FONT }}>{title}</h2>
          <IconBtn icon="close" label="Close" onClick={onClose} box={32} />
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-6 pb-2 text-[14px] text-[#1f1f1f]">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 pb-5 pt-3">{footer}</div>}
      </div>
    </div>
  );
}

export function TextField({ label, value, onChange, onEnter, autoFocus, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; onEnter?: () => void; autoFocus?: boolean; type?: string; placeholder?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (autoFocus) { ref.current?.focus(); ref.current?.select(); } }, [autoFocus]);
  return (
    <label className="relative mb-4 block">
      <span className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#444746]">{label}</span>
      <input
        ref={ref}
        aria-label={label}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") onEnter?.(); }}
        className="h-12 w-full rounded border border-[#747775] px-3.5 text-[16px] text-[#1f1f1f] outline-none focus:border-2 focus:border-[#0b57d0]"
      />
    </label>
  );
}

function FieldInput({ f, value, set }: { f: DialogField; value: SimValue | undefined; set: (v: SimValue) => void }) {
  if (f.type === "note") return <p className="mb-3 text-[13px] text-[#444746]">{f.text}</p>;
  if (f.type === "checkbox")
    return (
      <label className="mb-3 flex items-center gap-3 text-[14px]">
        <input type="checkbox" aria-label={f.label} checked={Boolean(value)} onChange={(e) => set(e.target.checked)} className="h-[18px] w-[18px] accent-[#0b57d0]" />
        {f.label}
      </label>
    );
  if (f.type === "radio")
    return (
      <fieldset className="mb-3">
        <legend className="mb-1 text-[12px] font-medium text-[#444746]">{f.label}</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {f.options.map((o) => (
            <label key={o} className="flex items-center gap-2 text-[14px]">
              <input type="radio" name={f.key} aria-label={o} checked={value === o} onChange={() => set(o)} className="h-[18px] w-[18px] accent-[#0b57d0]" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
    );
  if (f.type === "select" || f.type === "list")
    return (
      <label className="relative mb-4 block">
        <span className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#444746]">{f.label}</span>
        <select aria-label={f.label} value={String(value ?? "")} onChange={(e) => set(e.target.value)} className="h-12 w-full rounded border border-[#747775] bg-white px-3 text-[15px] outline-none focus:border-2 focus:border-[#0b57d0]">
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    );
  if (f.type === "color")
    return (
      <div className="mb-4">
        <div className="mb-1 text-[12px] font-medium text-[#444746]">{f.label}</div>
        <div className="flex flex-wrap gap-1">
          {PALETTE_ROWS.slice(0, 4).flat().map((p) => (
            <button key={p.hex} type="button" title={p.name} aria-label={p.name} onClick={() => set(p.hex)} className={`h-5 w-5 rounded-full border ${String(value).toLowerCase() === p.hex ? "border-2 border-[#0b57d0]" : "border-black/10"}`} style={{ background: p.hex }} />
          ))}
        </div>
      </div>
    );
  if (f.type === "number")
    return (
      <label className="relative mb-4 block">
        <span className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#444746]">{f.label}</span>
        <input type="number" aria-label={f.label} value={String(value ?? "")} step={f.step} min={f.min} max={f.max} onChange={(e) => set(e.target.value === "" ? "" : Number(e.target.value))} onKeyDown={(e) => e.stopPropagation()} className="h-12 w-full rounded border border-[#747775] px-3.5 text-[16px] outline-none focus:border-2 focus:border-[#0b57d0]" />
      </label>
    );
  return <TextField label={f.label} value={String(value ?? "")} onChange={(v) => set(v)} />;
}

export function defaultsOf(id: string): Record<string, SimValue> {
  const def = googleDialogs[id];
  const out: Record<string, SimValue> = {};
  for (const f of [...(def?.fields ?? []), ...(def?.tabs ?? []).flatMap((t) => t.fields)]) {
    if ("key" in f && "default" in f && f.default !== undefined) out[f.key] = f.default as SimValue;
    else if ("key" in f && (f.type === "select" || f.type === "radio") && f.options.length) out[f.key] = f.options[0];
  }
  return out;
}

/** Any dialog in dialogs.ts, drawn in Google's style. */
export function DefDialog({ id, initial, onOk, onClose, hide = [], options = {}, title }: { id: string; initial?: Record<string, SimValue>; onOk: (v: Record<string, SimValue>) => void; onClose: () => void; hide?: string[]; options?: Record<string, string[]>; title?: string }) {
  const def = googleDialogs[id];
  const [vals, setVals] = useState<Record<string, SimValue>>(() => ({ ...defaultsOf(id), ...(initial ?? {}) }));
  if (!def) return null;
  const fields = (def.fields ?? []).filter((f) => !("key" in f) || (f.key !== "file" && !hide.includes(f.key)));
  return (
    <Modal
      title={title ?? def.title}
      onClose={onClose}
      width={def.width ?? 480}
      footer={
        <>
          <PillBtn kind="text" onClick={onClose}>Cancel</PillBtn>
          <PillBtn onClick={() => onOk(vals)}>{def.okLabel ?? "OK"}</PillBtn>
        </>
      }
    >
      <div className="pt-2">
        {fields.map((f, i) => {
          const ff = "key" in f && options[f.key] && (f.type === "select" || f.type === "radio") ? ({ ...f, options: options[f.key] } as DialogField) : f;
          return <FieldInput key={i} f={ff} value={"key" in f ? vals[f.key] : undefined} set={(v) => "key" in f && setVals((s) => ({ ...s, [f.key]: v }))} />;
        })}
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Panels and toasts                                                   */
/* ------------------------------------------------------------------ */

export function SidePanel({ title, onClose, children, width = 300 }: { title: React.ReactNode; onClose: () => void; children: React.ReactNode; width?: number }) {
  return (
    <aside className="flex shrink-0 flex-col border-l border-[#e0e0e0] bg-white" style={{ width, fontFamily: TEXT_FONT }} aria-label={typeof title === "string" ? title : "Panel"}>
      <div className="flex h-12 shrink-0 items-center gap-2 px-4">
        <h3 className="flex-1 truncate text-[16px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>{title}</h3>
        <IconBtn icon="close" label={`Close ${typeof title === "string" ? title : "panel"}`} onClick={onClose} />
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-4 pb-4 text-[14px] text-[#1f1f1f]">{children}</div>
    </aside>
  );
}

export function Toast() {
  const g = useG();
  const text = g.doc.toast;
  const [shown, setShown] = useState<string | null>(null);
  useEffect(() => {
    if (!text) return;
    setShown(text);
    const t = setTimeout(() => setShown(null), 4000);
    return () => clearTimeout(t);
  }, [text, g.doc]);
  if (!shown || shown !== text) return null;
  return (
    <div role="status" className="absolute bottom-4 left-4 z-[130] flex items-center gap-4 rounded bg-[#303030] px-4 py-3 text-[14px] text-[#f2f2f2] shadow-lg" style={{ fontFamily: TEXT_FONT }}>
      {shown}
      <button type="button" aria-label="Dismiss" onClick={() => setShown(null)} className="text-[#a8c7fa]">
        <GIcon name="close" size={18} color="#e3e3e3" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Browser frame                                                       */
/* ------------------------------------------------------------------ */

export function urlFor(doc: GoogleDoc): string {
  const f = openFile(doc);
  if (doc.surface === "signin") return "accounts.google.com/v3/signin/identifier";
  if (doc.surface === "home") return `${doc.homeApp === "sheets" ? "docs.google.com/spreadsheets" : doc.homeApp === "slides" ? "docs.google.com/presentation" : "docs.google.com/document"}/u/0/`;
  if (doc.surface === "drive") {
    const loc = doc.drive?.location ?? "root";
    const seg: Record<string, string> = { root: "my-drive", home: "home", shared: "shared-with-me", recent: "recent", starred: "starred", trash: "trash", storage: "quota", computers: "computers", shareddrives: "shared-drives", spam: "spam" };
    if (doc.drive?.query) return `drive.google.com/drive/search?q=${encodeURIComponent(doc.drive.query)}`;
    return `drive.google.com/drive/${seg[loc] ?? `folders/${loc}`}`;
  }
  const kind = doc.surface === "docs" ? "document" : doc.surface === "sheets" ? "spreadsheets" : "presentation";
  return `docs.google.com/${kind}/d/1${(f?.id ?? "x").replace(/[^a-z0-9]/gi, "")}Qw8LkZ${doc.surface === "sheets" ? "/edit#gid=0" : "/edit"}`;
}

const SUFFIX: Record<string, string> = { docs: "Google Docs", sheets: "Google Sheets", slides: "Google Slides" };

export function BrowserFrame({ children }: { children: React.ReactNode }) {
  const g = useG();
  const { doc } = g;
  const loc = doc.drive?.location ?? "root";
  const locName = loc === "root" ? "My Drive" : loc === "home" ? "Home" : loc === "shared" ? "Shared with me" : loc === "recent" ? "Recent" : loc === "starred" ? "Starred" : loc === "trash" ? "Trash" : loc === "storage" ? "Storage" : loc === "computers" ? "Computers" : loc === "shareddrives" ? "Shared drives" : loc === "spam" ? "Spam" : fileOf(doc, loc)?.name ?? doc.sharedDrives?.find((d) => d.id === loc)?.name ?? "My Drive";
  const firstTab =
    doc.surface === "signin"
      ? { icon: <GIcon name="person" size={14} color="#5f6368" />, title: "Sign in - Google Accounts" }
      : doc.homeApp
        ? { icon: <AppLogo kind={doc.homeApp === "docs" ? "doc" : doc.homeApp === "sheets" ? "sheet" : "slides"} size={14} />, title: SUFFIX[doc.homeApp] }
        : { icon: <DriveLogo size={14} />, title: doc.drive?.query ? "Search results - Google Drive" : `${locName} - Google Drive` };
  const tabs = (doc.tabs ?? []).map((id) => fileOf(doc, id)).filter(Boolean);
  const tab = (active: boolean, icon: React.ReactNode, title: string, onClick: () => void, onClose?: () => void, key?: string) => (
    <div
      key={key}
      role="tab"
      aria-selected={active}
      aria-label={title}
      onClick={onClick}
      className={`group relative flex h-[30px] min-w-0 max-w-[220px] flex-1 cursor-default items-center gap-2 rounded-t-lg px-3 text-[12px] ${active ? "bg-white text-[#1f1f1f]" : "text-[#3c4043] hover:bg-white/50"}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {onClose && (
        <button type="button" aria-label={`Close ${title}`} onClick={(e) => { e.stopPropagation(); onClose(); }} className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full hover:bg-black/10">
          <GIcon name="close" size={12} color="#3c4043" />
        </button>
      )}
    </div>
  );
  return (
    <div className="flex h-full flex-col bg-[#dfe3e7]" style={{ fontFamily: TEXT_FONT }}>
      <div className="flex h-[34px] shrink-0 items-end gap-0.5 px-2" role="tablist" aria-label="Browser tabs">
        {tab(doc.surface === "drive" || doc.surface === "home" || doc.surface === "signin", firstTab.icon, firstTab.title, () => { if (doc.surface !== "signin") g.cmd("g.tab", "drive"); }, undefined, "drive")}
        {tabs.map((f) => tab(doc.surface !== "drive" && doc.surface !== "home" && doc.surface !== "signin" && doc.open === f!.id, <AppLogo kind={f!.kind} size={14} />, `${f!.name} - ${SUFFIX[f!.kind === "doc" || f!.kind === "word" ? "docs" : f!.kind === "sheet" || f!.kind === "excel" ? "sheets" : "slides"]}`, () => g.cmd("g.tab", f!.id), () => g.cmd("g.closeTab", f!.id), f!.id))}
        <span className="mb-1 ml-1 flex h-6 w-6 items-center justify-center rounded-full text-[#3c4043]" aria-hidden="true">+</span>
        <span className="flex-1" />
      </div>
      <div className="flex h-[34px] shrink-0 items-center gap-1 border-b border-[#dadce0] bg-white px-2">
        <GIcon name="back" size={18} color="#5f6368" />
        <GIcon name="back" size={18} color="#bdc1c6" style={{ transform: "scaleX(-1)" }} />
        <GIcon name="restore" size={18} color="#5f6368" />
        <div className="mx-2 flex h-[26px] min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f1f3f4] px-3 text-[13px] text-[#202124]">
          <GIcon name="tune" size={14} color="#5f6368" />
          <span className="truncate">{urlFor(doc)}</span>
        </div>
        {doc.surface === "signin" && !doc.flags?.signedIn ? <span className="h-[22px] w-[22px] rounded-full bg-[#e8eaed]" aria-hidden="true" /> : <Avatar person={meOf(doc)} size={22} />}
      </div>
      <div className="relative min-h-0 flex-1 bg-white">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Editor header                                                       */
/* ------------------------------------------------------------------ */

export function EditorHeader({ menus, extraRight }: { menus: Record<string, GEntry[]>; extraRight?: React.ReactNode }) {
  const g = useG();
  const { doc } = g;
  const f = openFile(doc)!;
  const [editing, setEditingState] = useState<string | null>(null);
  const live = useRef<string | null>(null);
  const setEditing = (v: string | null) => { live.current = v; setEditingState(v); };
  const [status, setStatus] = useState(false);
  const surface = doc.surface as "docs" | "sheets" | "slides";
  const commitName = () => {
    // Enter commits and moves focus, which also blurs the box: commit once.
    const v = live.current;
    if (v === null) return;
    setEditing(null);
    if (v.trim() && v.trim() !== f.name) g.onCommit({ kind: "type", target: `rename:${f.id}`, value: v.trim() });
    g.focus();
  };
  g.hooksRef.current.rename = () => setEditing(f.name);
  const others = (f.sharing?.people ?? []).length > 0 || (f.sharing?.access && f.sharing.access !== "Restricted");
  return (
    <div className="flex shrink-0 items-start gap-1 px-3 pt-2" style={{ fontFamily: TEXT_FONT }}>
      <button type="button" aria-label={`${SUFFIX[surface]} home`} title={`${SUFFIX[surface]} home`} onClick={() => g.cmd("g.app", surface === "docs" ? "Docs" : surface === "sheets" ? "Sheets" : "Slides")} className="mt-1 shrink-0 rounded-full p-1 hover:bg-[#e9eef6]">
        <AppLogo kind={surface === "docs" ? "doc" : surface === "sheets" ? "sheet" : "slides"} size={34} />
      </button>
      <div className="min-w-0 flex-1 pl-1">
        <div className="flex h-8 items-center gap-1">
          {editing !== null ? (
            <input
              autoFocus
              aria-label="Rename"
              value={editing}
              onChange={(e) => setEditing(e.target.value)}
              onBlur={commitName}
              onFocus={(e) => e.currentTarget.select()}
              onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") commitName(); if (e.key === "Escape") { setEditing(null); g.focus(); } }}
              className="h-7 min-w-[120px] max-w-[320px] rounded border-2 border-[#0b57d0] px-1.5 text-[18px] text-[#1f1f1f] outline-none"
              style={{ width: `${Math.max(8, editing.length + 2)}ch` }}
            />
          ) : (
            <button type="button" aria-label="Rename" title="Rename" onClick={() => setEditing(f.name)} className="h-7 max-w-[320px] truncate rounded border border-transparent px-1.5 text-left text-[18px] text-[#1f1f1f] hover:border-[#747775]">
              {f.name}
            </button>
          )}
          {isOffice(f.kind) && (
            <span title="This is a Microsoft Office file. Changes are saved in its original format." className="shrink-0 rounded border border-[#747775] px-1.5 text-[11px] font-medium leading-[18px] text-[#444746]">
              {officeExt(f.kind)}
            </span>
          )}
          <IconBtn icon={f.starred ? "starFilled" : "star"} label={f.starred ? "Remove from starred" : "Star"} color={f.starred ? "#f4b400" : undefined} onClick={() => g.cmd("g.star", f.id)} size={18} box={28} />
          <IconBtn icon="move" label="Move" onClick={() => g.dialog("g.move", { file: f.id })} size={18} box={28} />
          <span className="relative">
            <IconBtn icon="cloudDone" label="See document status" onClick={() => setStatus((s) => !s)} size={18} box={28} />
            {status && (
              <Popup onClose={() => setStatus(false)}>
                <div className="fixed z-[200] w-64 rounded-md bg-white p-4 text-[13px] shadow-lg" style={{ left: 260, top: 110 }}>
                  <div className="mb-1 flex items-center gap-2 font-medium"><GIcon name="cloudDone" size={18} color="#188038" /> Saved to Drive</div>
                  <p className="text-[#444746]">All changes are saved automatically. There is no Save button in Google {surface === "docs" ? "Docs" : surface === "sheets" ? "Sheets" : "Slides"}.</p>
                </div>
              </Popup>
            )}
          </span>
          {doc.flags?.edited && <span className="ml-1 hidden truncate text-[12px] text-[#5f6368] md:inline">Saved to Drive</span>}
        </div>
        <MenuBar menus={isOffice(f.kind) ? { ...menus, File: [SAVE_AS_GOOGLE[surface], SEP, ...menus.File] } : menus} />
      </div>
      <div className="flex shrink-0 items-center gap-1 pt-1">
        <IconBtn icon="history" label={`Last edit was ${f.modified === "10:42 AM" ? "seconds ago" : f.modified ? `on ${f.modified}` : "recently"}. Open version history`} onClick={() => g.cmd("g.versions")} />
        <IconBtn icon="comment" label="Open comment history" onClick={() => g.cmd("g.pane", "Comments")} pressed={doc.pane === "Comments"} />
        <IconBtn icon="video" label="Join a call here or present this tab to the call" onClick={() => g.cmd("g.help", "Google Meet")} />
        {extraRight}
        <button
          type="button"
          aria-label="Share"
          title={others ? "Shared with others" : "Private to only me"}
          onClick={() => g.act("share")}
          className="ml-1 flex h-10 items-center gap-2 rounded-full bg-[#c2e7ff] px-5 text-[14px] font-medium text-[#001d35] hover:shadow"
          style={{ fontFamily: FONT }}
        >
          <GIcon name={others ? "people" : "lock"} size={18} color="#001d35" />
          Share
        </button>
        <span className="ml-1"><AccountButton /></span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comments                                                            */
/* ------------------------------------------------------------------ */

export function timeLabel(t?: string) {
  return t ?? "";
}

export function CommentCard({ c, active, onActivate, quote }: { c: GComment; active: boolean; onActivate: () => void; quote?: string }) {
  const g = useG();
  const [reply, setReply] = useState("");
  const [menu, setMenu] = useState<MenuPos | null>(null);
  const assignee = personOf(g.doc, c.assignee);
  const sendReply = () => {
    if (!reply.trim()) return;
    g.onSelect({ selection: `comment:${c.id}` });
    g.onCommit({ kind: "type", target: `reply:${c.id}`, value: reply.trim() });
    setReply("");
  };
  return (
    <div
      role="group"
      aria-label={`Comment by ${c.author}`}
      onClick={(e) => { e.stopPropagation(); onActivate(); }}
      className={`relative rounded-lg bg-white p-3 text-[13px] text-[#1f1f1f] ${active ? "shadow-[0_1px_3px_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]" : "bg-[#f8fafd] hover:shadow"}`}
      style={{ fontFamily: TEXT_FONT, background: active ? "#fff" : c.resolved ? "#f1f3f4" : "#f0f4f9" }}
    >
      {assignee && <div className="-mx-3 -mt-3 mb-2 rounded-t-lg bg-[#c2e7ff] px-3 py-1 text-[12px] text-[#001d35]">Assigned to {assignee.name}</div>}
      <div className="mb-1 flex items-center gap-2">
        <Avatar person={personOf(g.doc, c.author) ?? { name: c.author }} size={28} />
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium">{c.author}</div>
          <div className="text-[11px] text-[#5f6368]">{timeLabel(c.time)}</div>
        </div>
        {!c.resolved ? (
          <button type="button" aria-label="Mark as done and hide discussion" title="Mark as done and hide discussion" onClick={(e) => { e.stopPropagation(); g.onSelect({ selection: `comment:${c.id}` }); g.cmd("g.comment.resolve", c.id); }} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-black/5">
            <GIcon name="check" size={18} color="#0b57d0" />
          </button>
        ) : (
          <button type="button" aria-label="Re-open" onClick={(e) => { e.stopPropagation(); g.onSelect({ selection: `comment:${c.id}` }); g.cmd("g.comment.reopen", c.id); }} className="rounded-full px-2 py-1 text-[12px] text-[#0b57d0] hover:bg-black/5">Re-open</button>
        )}
        <button type="button" aria-label="More options" onClick={(e) => { e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); setMenu({ x: r.left - 120, y: r.bottom }); }} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-black/5">
          <GIcon name="more" size={18} />
        </button>
      </div>
      {quote && <div className="mb-1 truncate border-l-2 border-[#fbbc04] pl-2 text-[12px] text-[#5f6368]">{quote}</div>}
      <p className="whitespace-pre-wrap break-words">{renderMentions(c.text)}</p>
      {(c.replies ?? []).map((r, i) => (
        <div key={i} className="mt-2 border-t border-[#e0e0e0] pt-2">
          <div className="mb-0.5 flex items-center gap-2">
            <Avatar person={personOf(g.doc, r.author) ?? { name: r.author }} size={22} />
            <span className="font-medium">{r.author}</span>
            <span className="text-[11px] text-[#5f6368]">{r.time}</span>
          </div>
          <p className="whitespace-pre-wrap break-words pl-[30px]">{renderMentions(r.text)}</p>
        </div>
      ))}
      {active && !c.resolved && (
        <div className="mt-2" onClick={(e) => e.stopPropagation()}>
          <input
            aria-label="Reply or add others with @"
            placeholder="Reply or add others with @"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") sendReply(); }}
            className="h-9 w-full rounded-full border border-[#747775] px-4 text-[13px] outline-none focus:border-[#0b57d0]"
          />
          {reply && (
            <div className="mt-2 flex justify-end gap-2">
              <PillBtn kind="text" onClick={() => setReply("")}>Cancel</PillBtn>
              <PillBtn onClick={sendReply}>Reply</PillBtn>
            </div>
          )}
        </div>
      )}
      {menu && (
        <Popup onClose={() => setMenu(null)}>
          <MenuList
            entries={[{ label: "Delete", icon: "trash", command: "g.comment.delete", value: c.id }, { label: "Get link to this comment", icon: "link", command: "g.toast", value: "Link copied" }]}
            pos={menu}
            width={220}
            onPick={(i) => { setMenu(null); g.onSelect({ selection: `comment:${c.id}` }); g.cmd(i.command!, i.value); }}
            onClose={() => setMenu(null)}
          />
        </Popup>
      )}
    </div>
  );
}

export function renderMentions(text: string): React.ReactNode {
  const parts = text.split(/(@[A-Z][a-zA-Z'-]+(?: [A-Z][a-zA-Z'-]+)?|\+[\w.-]+@[\w.-]+)/g);
  return parts.map((p, i) => (/^(@[A-Z]|\+)/.test(p) ? <span key={i} className="rounded-full bg-[#c2e7ff] px-1.5 text-[#001d35]">{p}</span> : <span key={i}>{p}</span>));
}

/** The new-comment box. Typing @ suggests people; a mention offers "Assign to". */
export function CommentComposer({ onCancel, autoFocus = true }: { onCancel: () => void; autoFocus?: boolean }) {
  const g = useG();
  const me = meOf(g.doc);
  const [text, setText] = useState("");
  const [assign, setAssign] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);
  const people = [...(g.doc.people ?? [])];
  const at = /@([A-Za-z]*)$/.exec(text);
  const matches = at ? people.filter((p) => p.name.toLowerCase().startsWith(at[1].toLowerCase()) || p.name.toLowerCase().split(" ").some((w) => w.startsWith(at[1].toLowerCase())) || p.email.toLowerCase().startsWith(at[1].toLowerCase())).slice(0, 5) : [];
  const mentioned = people.find((p) => text.includes(`@${p.name}`) || text.includes(`+${p.email}`));
  const post = () => {
    if (!text.trim()) return;
    g.onCommit({ kind: "type", target: mentioned && assign ? `assign:${mentioned.email}` : "comment", value: text.trim() });
    setText("");
    onCancel();
  };
  return (
    <div className="relative rounded-lg bg-white p-3 shadow-[0_1px_3px_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} style={{ fontFamily: TEXT_FONT }}>
      <div className="mb-2 flex items-center gap-2 text-[13px]">
        <Avatar person={me} size={28} />
        <span className="font-medium">{me.name}</span>
      </div>
      <textarea
        ref={ref}
        aria-label="Comment or add others with @"
        placeholder="Comment or add others with @"
        value={text}
        rows={2}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) post(); if (e.key === "Escape") onCancel(); }}
        className="w-full resize-none rounded-2xl border-2 border-[#0b57d0] px-3 py-2 text-[13px] outline-none"
      />
      {matches.length > 0 && (
        <div className="absolute left-3 right-3 z-10 mt-1 rounded-md bg-white py-1 shadow-lg" role="listbox" aria-label="People">
          {matches.map((p) => (
            <button key={p.email} type="button" role="option" aria-selected={false} aria-label={p.name} onClick={() => { setText(text.replace(/@([A-Za-z]*)$/, `@${p.name} `)); ref.current?.focus(); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#f1f3f4]">
              <Avatar person={p} size={24} />
              <span className="flex-1"><span className="block">{p.name}</span><span className="block text-[11px] text-[#5f6368]">{p.email}</span></span>
            </button>
          ))}
        </div>
      )}
      {mentioned && (
        <label className="mt-2 flex items-center gap-2 text-[13px]">
          <input type="checkbox" aria-label={`Assign to ${mentioned.name}`} checked={assign} onChange={(e) => setAssign(e.target.checked)} className="h-4 w-4 accent-[#0b57d0]" />
          Assign to {mentioned.name}
        </label>
      )}
      {mentioned && assign && <p className="mt-1 text-[11px] text-[#5f6368]">{mentioned.name.split(" ")[0]} will be notified and responsible for marking as done.</p>}
      <div className="mt-2 flex justify-end gap-2">
        <PillBtn kind="text" onClick={onCancel}>Cancel</PillBtn>
        <PillBtn onClick={post} disabled={!text.trim()}>{mentioned && assign ? "Assign" : "Comment"}</PillBtn>
      </div>
    </div>
  );
}

/** Comments panel (comment history): open and resolved threads. */
export function CommentsPanel({ quoteOf }: { quoteOf: (anchor: string) => string }) {
  const g = useG();
  const f = openFile(g.doc);
  const [filter, setFilter] = useState<"All" | "Open" | "Resolved" | "For you">("All");
  const me = meOf(g.doc);
  const list = (f?.comments ?? []).filter((c) => (filter === "Open" ? !c.resolved : filter === "Resolved" ? c.resolved : filter === "For you" ? c.assignee === me.email || c.text.includes(`@${me.name}`) : true));
  return (
    <SidePanel title="Comments" onClose={() => g.cmd("g.pane", "")}>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {(["All", "For you", "Open", "Resolved"] as const).map((k) => (
          <button key={k} type="button" onClick={() => setFilter(k)} className={`rounded-lg border px-3 py-1 text-[13px] ${filter === k ? "border-transparent bg-[#c2e7ff] text-[#001d35]" : "border-[#747775] text-[#444746]"}`}>{k}</button>
        ))}
      </div>
      {list.length === 0 && <p className="py-6 text-center text-[13px] text-[#5f6368]">No comments to show.</p>}
      <div className="space-y-2">
        {list.map((c) => (
          <CommentCard key={c.id} c={c} quote={quoteOf(c.anchor)} active={g.ui.selection === `comment:${c.id}`} onActivate={() => g.onSelect({ selection: `comment:${c.id}` })} />
        ))}
      </div>
    </SidePanel>
  );
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export function useWidth(ref: React.RefObject<HTMLElement | null>, initial: number) {
  const [w, setW] = useState(initial);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth || initial);
    return () => ro.disconnect();
  }, [ref, initial]);
  return w;
}

export function useHeight(ref: React.RefObject<HTMLElement | null>, initial: number) {
  const [h, setH] = useState(initial);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setH(el.clientHeight));
    ro.observe(el);
    setH(el.clientHeight || initial);
    return () => ro.disconnect();
  }, [ref, initial]);
  return h;
}

export function KeyboardShortcuts() {
  const g = useG();
  const rows: [string, string][] = [
    ["Bold, italic, underline", "Ctrl+B, Ctrl+I, Ctrl+U"],
    ["Insert link", "Ctrl+K"],
    ["Insert comment", "Ctrl+Alt+M"],
    ["Undo, redo", "Ctrl+Z, Ctrl+Y"],
    ["Find and replace", "Ctrl+H"],
    ["Word count (Docs)", "Ctrl+Shift+C"],
    ["Heading 1 to 6 (Docs)", "Ctrl+Alt+1 to 6"],
    ["Normal text (Docs)", "Ctrl+Alt+0"],
    ["Numbered, bulleted list (Docs)", "Ctrl+Shift+7, Ctrl+Shift+8"],
    ["Currency, percent (Sheets)", "Ctrl+Shift+4, Ctrl+Shift+5"],
    ["New slide (Slides)", "Ctrl+M"],
    ["Present from beginning (Slides)", "Ctrl+Shift+F5"],
    ["Version history", "Ctrl+Alt+Shift+H"],
  ];
  return (
    <Modal title="Keyboard shortcuts" onClose={() => g.cmd("g.pane", "")} width={560} footer={<PillBtn kind="text" onClick={() => g.cmd("g.pane", "")}>Close</PillBtn>}>
      <table className="w-full text-[13px]">
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-b border-[#e0e0e0]"><td className="py-2">{a}</td><td className="py-2 text-right text-[#444746]">{b}</td></tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

/** The ? shown for features the sim draws but does not build out. */
export function DetailsPanel() {
  const g = useG();
  const f = openFile(g.doc);
  if (!f) return null;
  const owner = personOf(g.doc, f.owner) ?? (f.owner ? { name: f.owner, email: f.owner } : meOf(g.doc));
  const loc = f.parent === "root" || !f.parent ? "My Drive" : fileOf(g.doc, f.parent)?.name ?? "My Drive";
  return (
    <SidePanel title="Details" onClose={() => g.cmd("g.pane", "")}>
      {[
        ["Type", f.kind === "doc" ? "Google Docs" : f.kind === "sheet" ? "Google Sheets" : "Google Slides"],
        ["Owner", owner.name === meOf(g.doc).name ? "me" : owner.name],
        ["Location", loc],
        ["Modified", f.modified ?? TODAY_SHORT],
        ["Created", "Oct 1, 2026"],
      ].map(([k, v]) => (
        <div key={k} className="mb-3"><div className="text-[12px] text-[#5f6368]">{k}</div><div>{v}</div></div>
      ))}
      <p className="text-[12px] text-[#5f6368]">{viewOn(g.doc, "printLayout") ? "" : ""}</p>
    </SidePanel>
  );
}

const TODAY_SHORT = "Oct 20, 2026";
