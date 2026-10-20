"use client";

import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { SimCommit, SimValue } from "@/types/sim";
import type { CanvasProps, StatusBarProps } from "../../types";
import type { WinDoc, WinWindow } from "./types";
import { APPS, NOW, SETTINGS_CATS, WALLPAPERS, appInfo } from "./data";
import { AppIcon, FileArt, G, WinLogo } from "./icons";
import { Avatar, Btn, Menu, Modal, T, THEME_VARS, Toggle, WinCtx, relPos, type MItem, type SaveOpts, type WinCtxValue } from "./ui";
import { FrameCtx } from "./frame";
import {
  S,
  curDesk,
  deskOf,
  devices,
  focused,
  installedApps,
  looksLikeUrl,
  net,
  pinOf,
  specs,
  startPins,
  taskbarApps,
  userName,
} from "./model";
import { allFiles, baseOf, getItem, isFolder, parentOf, realPath } from "./fs";
import {
  ExplorerApp,
  backgroundMenu,
  confirmEmpty,
  dragOver,
  dropOnto,
  entryOf,
  fileKeys,
  itemMenu,
  listEntries,
  newMenu,
  openItem,
  pasteInto,
  sortEntries,
  startItemDrag,
  useItemSelect,
  RenameBox,
  type Entry,
} from "./Explorer";
import { SecurityApp, SettingsApp, connectWifi } from "./Settings";
import { EdgeApp, ShareDialog } from "./Edge";
import { CalculatorApp, CmdApp, GenericApp, NotepadApp, OfficeApp, OutlookApp, PrintQueueApp, SaveDialog, SnipApp, TaskMgrApp, TeamsApp } from "./Apps";

const TASKBAR_H = 48;

/* ------------------------------------------------------------------ */
/* Window frame                                                        */
/* ------------------------------------------------------------------ */

type Rect = { x: number; y: number; w: number; h: number };

const SIZES: Record<string, Partial<Rect>> = {
  calculator: { w: 26, h: 70 },
  printqueue: { w: 60, h: 62 },
  snip: { w: 56, h: 62 },
  cmd: { w: 66, h: 66 },
  notepad: { w: 62, h: 72 },
  taskmgr: { w: 76, h: 82 },
};

function frameStyle(w: WinWindow, r: Rect): React.CSSProperties {
  if (w.max) return { left: 0, top: 0, width: "100%", height: "100%", borderRadius: 0 };
  switch (w.snap) {
    case "left": return { left: 0, top: 0, width: "50%", height: "100%" };
    case "right": return { left: "50%", top: 0, width: "50%", height: "100%" };
    case "tl": return { left: 0, top: 0, width: "50%", height: "50%" };
    case "tr": return { left: "50%", top: 0, width: "50%", height: "50%" };
    case "bl": return { left: 0, top: "50%", width: "50%", height: "50%" };
    case "br": return { left: "50%", top: "50%", width: "50%", height: "50%" };
  }
  return { left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` };
}

function AppBody({ w }: { w: WinWindow }) {
  switch (w.app) {
    case "explorer": return <ExplorerApp w={w} />;
    case "settings": return <SettingsApp w={w} />;
    case "security": return <SecurityApp w={w} />;
    case "edge":
    case "edgeprivate": return <EdgeApp w={w} />;
    case "notepad": return <NotepadApp w={w} />;
    case "taskmgr": return <TaskMgrApp w={w} />;
    case "cmd": return <CmdApp w={w} />;
    case "snip": return <SnipApp w={w} />;
    case "printqueue": return <PrintQueueApp w={w} />;
    case "word":
    case "excel":
    case "powerpoint": return <OfficeApp w={w} />;
    case "outlook": return <OutlookApp />;
    case "teams": return <TeamsApp />;
    case "calculator": return <CalculatorApp />;
    default: return <GenericApp w={w} />;
  }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const isTyping = (t: EventTarget | null) => {
  const el = t as HTMLElement | null;
  return Boolean(el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable));
};

function appName(doc: WinDoc, id: string) {
  if (id.startsWith("webapp:")) return (doc.webApps ?? []).find((w) => `webapp:${w.url}` === id)?.name ?? id.slice(7);
  return appInfo(id).name;
}

function Flyout({ children, style, className = "", label }: { children: ReactNode; style?: React.CSSProperties; className?: string; label: string }) {
  return (
    <div role="dialog" aria-label={label} className={`w11-up absolute z-[260] overflow-hidden rounded-lg shadow-2xl ${className}`} style={{ background: T.flyout, color: T.text, border: `1px solid ${T.line}`, backdropFilter: "blur(30px)", ...style }} onMouseDown={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export function WindowsCanvas({ doc, ui, onSelect, onCommit }: CanvasProps<WinDoc>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; items: MItem[]; top?: MItem[] } | null>(null);
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [renaming, setRenamingRaw] = useState<string | null>(null);
  // Remember whether the learner was last working on the desktop, so that renaming a
  // Desktop item opens one rename box (on the desktop or in File Explorer), never both.
  const deskActive = useRef(false);
  const setRenaming = useCallback((p: string | null) => setRenamingRaw(p && deskActive.current ? `desk:${p}` : p), []);
  const [flyout, setFlyout] = useState<null | "start" | "search" | "quick" | "notify" | "tray" | "onedrive" | "clip" | "power" | "user">(null);
  const [startAll, setStartAll] = useState(false);
  const [query, setQuery] = useState("");
  const [quickSub, setQuickSub] = useState<null | "wifi" | "bt" | "sound" | "access">(null);
  const [helper, setHelper] = useState(false);
  const [taskView, setTaskView] = useState(false);
  const [altTab, setAltTab] = useState<{ i: number } | null>(null);
  const altTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [snipping, setSnipping] = useState<null | "choose">(null);
  const [pinPanel, setPinPanel] = useState(false);
  const pinRef = useRef<HTMLInputElement>(null);
  const pinErr = Boolean(doc.flags?.pinError);
  useEffect(() => {
    if (!pinPanel || !doc.locked || pinErr) return;
    const t = setTimeout(() => pinRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [pinPanel, doc.locked, pinErr]);
  const [pin, setPin] = useState("");
  const [boot, setBoot] = useState(false);
  const [toastHidden, setToastHidden] = useState<number | null>(null);
  const [clips, setClips] = useState<string[]>(doc.clips ?? []);
  const [pos, setPos] = useState<Record<string, Rect>>({});
  const [bounds, setBounds] = useState({ w: 900, h: 600 });
  const insertRef = useRef<((t: string) => void) | null>(null);
  const keys = useRef<Record<string, (e: React.KeyboardEvent) => boolean>>({});
  const drag = useRef<{ id: string; sx: number; sy: number; r: Rect; dw: number; dh: number } | null>(null);

  const dark = S(doc, "theme") === "Dark";
  const scale = (parseInt(S(doc, "display.scale"), 10) || 100) / 100;
  const sel = ui.selection ?? "";

  const focusRoot = useCallback(
    () =>
      setTimeout(() => {
        const root = rootRef.current;
        const a = typeof document !== "undefined" ? document.activeElement : null;
        // Leave focus alone when a dialog or rename box has just taken it.
        if (root && a && a !== root && root.contains(a) && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
        root?.focus();
      }, 0),
    [],
  );
  const select = useCallback((s: string) => onSelect({ selection: s }), [onSelect]);
  const cmd = useCallback((id: string, value?: SimValue) => onCommit({ kind: "command", id, value }), [onCommit]);
  const commit = useCallback((c: SimCommit) => onCommit(c), [onCommit]);
  const addClip = useCallback((t: string) => {
    if (!t) return;
    setClips((c) => [t, ...c.filter((x) => x !== t)].slice(0, 25));
    try {
      void navigator.clipboard?.writeText(t);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBounds({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // A newly created item opens in rename mode.
  const lastFresh = useRef<string | null | undefined>(doc.fresh);
  useEffect(() => {
    if (doc.fresh && doc.fresh !== lastFresh.current && getItem(doc, doc.fresh)) setRenaming(doc.fresh);
    lastFresh.current = doc.fresh;
  }, [doc]);

  // Restart animation.
  const lastBoot = useRef(doc.flags?.bootN);
  useEffect(() => {
    if (doc.flags?.bootN !== lastBoot.current) {
      lastBoot.current = doc.flags?.bootN;
      setBoot(true);
      const t = setTimeout(() => setBoot(false), 1600);
      return () => clearTimeout(t);
    }
  }, [doc.flags?.bootN]);

  useEffect(() => {
    if (!doc.locked) {
      setPinPanel(false);
      setPin("");
    }
  }, [doc.locked]);

  // Toasts hide themselves.
  const toastN = doc.toast?.n ?? null;
  useEffect(() => {
    if (toastN === null) return;
    const t = setTimeout(() => setToastHidden(toastN), 5000);
    return () => clearTimeout(t);
  }, [toastN]);

  const ctx: WinCtxValue = useMemo(
    () => ({
      doc,
      ui,
      sel,
      select,
      cmd,
      commit,
      menu: (at, items, top) => {
        const p = relPos(rootRef.current, at);
        setMenu({ x: p.x, y: p.y, items, top });
      },
      closeMenu: () => setMenu(null),
      modal: (n) => {
        setModal(n);
        if (!n) focusRoot();
      },
      renaming,
      setRenaming,
      dark,
      focusRoot,
      clips,
      addClip,
      insertRef,
      saveAs: (o: SaveOpts) => setModal(<SaveDialog o={o} />),
      share: (path, provider) => setModal(<ShareDialog path={path} provider={provider === "google" ? "google" : "ms"} />),
      startSnip: () => setSnipping("choose"),
      keys,
    }),
    [doc, ui, sel, select, cmd, commit, renaming, dark, focusRoot, clips, addClip],
  );

  const desk = curDesk(doc);
  const visible = doc.windows.filter((w) => !w.min && deskOf(w) === desk);
  const fw = focused(doc);
  const deskRoot = doc.fs.find((r) => r.root === "desktop");
  const closeFly = () => {
    setFlyout(null);
    setQuickSub(null);
    setStartAll(false);
  };

  /* ---------------- shortcuts (helper strip and keyboard) ---------------- */

  const runCombo = (combo: string) => {
    const f = focused(doc);
    switch (combo) {
      case "Win":
        setFlyout((x) => (x === "start" ? null : "start"));
        setQuery("");
        return;
      case "Win+E": closeFly(); cmd("win.open", "explorer"); return;
      case "Win+D": closeFly(); cmd("win.showDesktop"); return;
      case "Win+I": closeFly(); cmd("win.open", "settings"); return;
      case "Win+L": closeFly(); setHelper(false); cmd("win.lock"); return;
      case "Win+S": setQuery(""); setFlyout("search"); return;
      case "Win+X": {
        const r = rootRef.current?.getBoundingClientRect();
        quickLink({ clientX: (r?.left ?? 0) + (r?.width ?? 800) / 2 - 120, clientY: (r?.bottom ?? 600) - 430 });
        return;
      }
      case "Win+Shift+S": closeFly(); setSnipping("choose"); return;
      case "Win+V": cmd("clip.open"); setFlyout("clip"); return;
      case "Win+Tab": closeFly(); cmd("win.taskView"); setTaskView((t) => !t); return;
      case "Ctrl+Shift+Esc": closeFly(); cmd("win.open", "taskmgr"); return;
      case "Win+Left": if (f) cmd("win.snap", `${f.id}:left`); return;
      case "Win+Right": if (f) cmd("win.snap", `${f.id}:right`); return;
      case "Win+Up": if (f && !f.max) cmd("win.maximize", f.id); return;
      case "Win+Down": if (f) cmd(f.max || f.snap ? "win.restore" : "win.minimize", f.id); return;
      case "Win+Ctrl+D": cmd("vd.new"); return;
      case "Win+Ctrl+Right": cmd("vd.switch", Math.min(doc.desks ?? 1, desk + 1)); return;
      case "Win+Ctrl+Left": cmd("vd.switch", Math.max(1, desk - 1)); return;
      case "Win+Ctrl+F4": cmd("vd.close", desk); return;
      case "Alt+Tab": {
        const order = [...doc.windows].filter((w) => deskOf(w) === desk).reverse();
        if (order.length < 2 && !order.some((w) => w.min)) return;
        const next = altTab ? (altTab.i + 1) % order.length : Math.min(1, order.length - 1);
        setAltTab({ i: next });
        if (altTimer.current) clearTimeout(altTimer.current);
        altTimer.current = setTimeout(() => {
          setAltTab(null);
          const w = order[next];
          if (w) cmd("win.focus", w.id);
        }, 1100);
        return;
      }
    }
  };

  const quickLink = (at: { clientX: number; clientY: number }) => {
    closeFly();
    ctx.menu(at, [
      { label: "Installed apps", onClick: () => cmd("settings.nav", "apps/installed") },
      { label: "Mobility Center", disabled: true },
      { label: "Power Options", onClick: () => cmd("settings.nav", "system/power") },
      { label: "Event Viewer", disabled: true },
      { label: "System", onClick: () => cmd("settings.nav", "system/about") },
      { label: "Device Manager", disabled: true },
      { label: "Network Connections", onClick: () => cmd("settings.nav", "network") },
      { label: "Disk Management", disabled: true },
      { label: "Computer Management", disabled: true },
      { label: "Terminal", onClick: () => cmd("win.open", "cmd") },
      { sep: true },
      { label: "Task Manager", onClick: () => cmd("win.open", "taskmgr") },
      { label: "Settings", onClick: () => cmd("win.open", "settings") },
      { label: "File Explorer", onClick: () => cmd("win.open", "explorer") },
      { label: "Search", onClick: () => setFlyout("search") },
      { label: "Run", disabled: true },
      { sep: true },
      { label: "Shut down or sign out", sub: [{ label: "Sign out", onClick: () => cmd("power.signout") }, { label: "Sleep", onClick: () => cmd("power.sleep") }, { label: "Shut down", onClick: () => cmd("power.shutdown") }, { label: "Restart", onClick: () => cmd("power.restart") }] },
      { label: "Desktop", onClick: () => cmd("win.showDesktop") },
    ]);
  };

  const desktopEntries = useMemo((): Entry[] => {
    if (!deskRoot) return [];
    const showExt = S(doc, "explorer.extensions") === "on";
    const list = (deskRoot.children ?? []).map((c) => entryOf(doc, `${deskRoot.name}/${c.name}`, showExt)).filter((x): x is Entry => Boolean(x));
    return sortEntries(list, "name", "asc");
  }, [doc, deskRoot]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (isTyping(e.target)) return;
    const done = () => {
      e.preventDefault();
      e.stopPropagation();
    };
    if (doc.power && doc.power !== "on") {
      cmd("power.on");
      return done();
    }
    if (doc.locked) {
      setPinPanel(true);
      return done();
    }
    if (e.key === "Escape") {
      if (menu || flyout || taskView || snipping || helper) {
        setMenu(null);
        closeFly();
        setTaskView(false);
        setSnipping(null);
        return done();
      }
      return;
    }
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl && e.shiftKey && e.key === "Escape") {
      runCombo("Ctrl+Shift+Esc");
      return done();
    }
    if (modal) return;
    const f = focused(doc);
    if (f && keys.current[f.id]?.(e)) return done();
    if (f?.app === "explorer") {
      if (e.altKey && e.key === "ArrowLeft") { cmd("explorer.back"); return done(); }
      if (e.altKey && e.key === "ArrowRight") { cmd("explorer.forward"); return done(); }
      if (e.altKey && e.key === "ArrowUp") { cmd("explorer.up"); return done(); }
      if (e.key === "Backspace") { cmd("explorer.back"); return done(); }
      if (e.key === "F5") { cmd("explorer.refresh"); return done(); }
      if (e.altKey && e.key === "Enter") return done();
      if (fileKeys(e, ctx, f.loc ?? "Home", listEntries(doc, f))) return done();
      return;
    }
    if (!f && deskRoot) {
      if (fileKeys(e, ctx, deskRoot.name, desktopEntries)) return done();
    }
  };

  /* ---------------- window dragging ---------------- */

  const rectOf = (w: WinWindow, i: number): Rect => {
    const p = pos[w.id];
    if (p) return p;
    const s = SIZES[w.app] ?? {};
    return { x: 5 + ((i * 3) % 15), y: 3 + ((i * 4) % 12), w: s.w ?? 76, h: s.h ?? 84 };
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const d = drag.current;
      if (!d) return;
      const dx = ((e.clientX - d.sx) / d.dw) * 100;
      const dy = ((e.clientY - d.sy) / d.dh) * 100;
      setPos((p) => ({ ...p, [d.id]: { ...d.r, x: Math.max(-d.r.w + 10, Math.min(95, d.r.x + dx)), y: Math.max(0, Math.min(92, d.r.y + dy)) } }));
    };
    const up = () => {
      drag.current = null;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  /* ---------------- pieces ---------------- */

  const onlineNow = () => {
    const n = net(doc);
    return n.connected !== false && S(doc, "airplane") !== "on" && !(n.type === "wifi" && S(doc, "wifi") === "off");
  };
  const n = net(doc);
  const muted = S(doc, "sound.mute") === "on" || S(doc, "volume") === "0";
  const laptop = Boolean(specs(doc).battery);
  const align = S(doc, "taskbar.align");
  const searchMode = S(doc, "taskbar.search");
  const tbApps = taskbarApps(doc);
  const running = doc.windows.map((w) => w.app).filter((a, i, arr) => arr.indexOf(a) === i && !tbApps.includes(a));
  const allTb = [...tbApps, ...running];
  const updatesPending = Boolean(doc.flags?.updateInstalled) && !doc.flags?.updateDone;
  const notifications = doc.notifications ?? [];

  const tbClick = (app: string) => {
    closeFly();
    const w = doc.windows.find((x) => x.app === app);
    if (!w) return cmd("win.open", app);
    if (fw?.id === w.id) return cmd("win.minimize", w.id);
    cmd("win.focus", w.id);
  };

  const tbMenu = (e: React.MouseEvent, app: string) => {
    e.preventDefault();
    const pinned = tbApps.includes(app);
    const open = doc.windows.some((w) => w.app === app);
    ctx.menu({ clientX: e.clientX, clientY: e.clientY - 150 }, [
      { label: appName(doc, app), icon: "app", onClick: () => cmd("win.open", app) },
      pinned ? { label: "Unpin from taskbar", icon: "pin", onClick: () => cmd("taskbar.unpin", app) } : { label: "Pin to taskbar", icon: "pin", onClick: () => cmd("taskbar.pin", app) },
      ...(open ? [{ label: "Close window", icon: "close", onClick: () => cmd("win.close", app) }] : []),
    ]);
  };

  /* --- Search results --- */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const apps = [...APPS.filter((a) => a.list), ...(doc.webApps ?? []).map((w) => ({ id: `webapp:${w.url}`, name: w.name, keys: "" }))].filter((a) => `${a.name} ${a.keys ?? ""}`.toLowerCase().includes(q));
    apps.sort((a, b) => (a.name.toLowerCase().startsWith(q) ? -1 : 0) - (b.name.toLowerCase().startsWith(q) ? -1 : 0));
    const settings: { id: string; title: string }[] = [];
    for (const c of SETTINGS_CATS) for (const p of c.pages) if (`${p.title} ${p.keys ?? ""}`.toLowerCase().includes(q)) settings.push({ id: p.id, title: p.title });
    if ("windows update check for updates".includes(q) || q.includes("update")) settings.push({ id: "update", title: "Check for updates" });
    if (q.includes("add or remove") || q.includes("programs")) settings.unshift({ id: "apps/installed", title: "Add or remove programs" });
    if (q.includes("printer")) settings.unshift({ id: "bluetooth/printers", title: "Printers & scanners" });
    const files = allFiles(doc).filter((f) => f.item.name.toLowerCase().includes(q)).slice(0, 6);
    type Hit = { kind: "app" | "setting" | "file" | "web"; id: string; title: string; sub: string };
    const hits: Hit[] = [
      ...apps.slice(0, 5).map((a) => ({ kind: "app" as const, id: a.id, title: a.name, sub: "App" })),
      ...settings.slice(0, 5).map((s) => ({ kind: "setting" as const, id: s.id, title: s.title, sub: "System settings" })),
      ...files.map((f) => ({ kind: "file" as const, id: f.path, title: f.item.name, sub: isFolder(f.item) ? "Folder" : "Document" })),
    ];
    const best = hits.find((h) => h.kind === "app" && h.title.toLowerCase().startsWith(q)) ?? hits.find((h) => h.title.toLowerCase().startsWith(q)) ?? hits[0];
    return { hits, best, q: query.trim() };
  }, [query, doc]);

  const openHit = (h: { kind: string; id: string; title: string } | undefined) => {
    if (!h) return;
    closeFly();
    setQuery("");
    if (h.kind === "app") cmd("win.open", h.id);
    else if (h.kind === "setting") cmd("settings.nav", h.id);
    else if (h.kind === "file") openItem(ctx, h.id);
    else cmd("edge.search", h.title);
  };

  /* ---------------- desktop ---------------- */

  const onDeskSelect = useItemSelect(desktopEntries, { sel, select });
  const onDeskDown = (e: React.MouseEvent, en: Entry) => {
    if (doc.focus && e.button === 0) cmd("win.focus", "");
    closeFly();
    onDeskSelect(e, en);
  };
  const deskSel = new Set(sel.split(",").filter(Boolean));
  const [deskHint, setDeskHint] = useState<string | null>(null);
  const recycleFull = (doc.recycle ?? []).length > 0;

  const desktop = (
    <div
      className="absolute inset-0"
      onMouseDownCapture={() => {
        deskActive.current = true;
      }}
      onMouseDown={(e) => {
        if (e.target !== e.currentTarget) return;
        closeFly();
        setMenu(null);
        if (doc.focus) cmd("win.focus", "");
        select("");
      }}
      onContextMenu={(e) => {
        if (e.target !== e.currentTarget) return;
        e.preventDefault();
        select("");
        ctx.menu(e, [
          { label: "View", icon: "view", sub: [{ label: "Large icons" }, { label: "Medium icons", dot: true }, { label: "Small icons" }, { sep: true }, { label: "Auto arrange icons", check: true }, { label: "Align icons to grid", check: true }, { label: "Show desktop icons", check: true }] },
          { label: "Sort by", icon: "sort", sub: [{ label: "Name" }, { label: "Size" }, { label: "Item type" }, { label: "Date modified" }] },
          { label: "Refresh", icon: "refresh" },
          { sep: true },
          { label: "Undo", icon: "restoreItem", shortcut: "Ctrl+Z", disabled: !(doc.undo ?? []).length, onClick: () => cmd("fs.undo") },
          { label: "Paste", icon: "paste", shortcut: "Ctrl+V", disabled: !doc.clipboard || !deskRoot, onClick: () => deskRoot && pasteInto(ctx, deskRoot.name) },
          { label: "New", icon: "newc", sub: deskRoot ? newMenu(ctx, deskRoot.name) : [] },
          { sep: true },
          { label: "Display settings", icon: "monitor", onClick: () => cmd("settings.nav", "system/display") },
          { label: "Personalize", icon: "personalization", onClick: () => cmd("settings.nav", "personalization/background") },
          { sep: true },
          { label: "Open in Terminal", icon: "cmd", onClick: () => cmd("win.open", "cmd") },
          { label: "Show more options", icon: "more", disabled: true },
        ]);
      }}
      onDragOver={(e) => deskRoot && dragOver(e, doc, deskRoot.name, setDeskHint)}
      onDragLeave={() => setDeskHint(null)}
      onDrop={(e) => {
        setDeskHint(null);
        if (deskRoot) dropOnto(e, ctx, deskRoot.name);
      }}
    >
      <div className="pointer-events-none absolute inset-0 flex flex-col flex-wrap content-start gap-1 p-1.5">
        <DeskIcon
          label="Recycle Bin"
          art={recycleFull ? "recycleFull" : "recycle"}
          selected={sel === "sys:recycle"}
          onDown={(e) => { e.stopPropagation(); if (doc.focus) cmd("win.focus", ""); select("sys:recycle"); }}
          onOpen={() => cmd("explorer.nav", "Recycle Bin")}
          onMenu={(e) => { select("sys:recycle"); ctx.menu(e, [{ label: "Open", icon: "open", onClick: () => cmd("explorer.nav", "Recycle Bin") }, { label: "Empty Recycle Bin", icon: "delete", disabled: !recycleFull, onClick: () => confirmEmpty(ctx) }, { label: "Properties", icon: "properties", disabled: true }]); }}
          onDrop={(e) => dropOnto(e, ctx, "Recycle Bin")}
          dropTarget
        />
        {desktopEntries.map((en) => (
          <DeskIcon
            key={en.key}
            label={en.label}
            art={en.art}
            shortcut={Boolean(en.item?.app)}
            appIcon={en.item?.app}
            selected={deskSel.has(en.key)}
            renaming={renaming !== null && renaming.toLowerCase() === `desk:${en.path}`.toLowerCase() ? en : null}
            onDown={(e) => onDeskDown(e, en)}
            onOpen={() => openItem(ctx, en.path)}
            onMenu={(e) => { if (!deskSel.has(en.key)) select(en.key); itemMenu(ctx, e, en); }}
            onDragStart={(e) => startItemDrag(e, ctx, en)}
            onDrop={en.folder ? (e) => dropOnto(e, ctx, en.path) : undefined}
            dropTarget={en.folder}
            path={en.path}
          />
        ))}
      </div>
      {deskHint && <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-white px-2 py-0.5 text-[11px] text-black shadow">{deskHint}</span>}
    </div>
  );

  /* ---------------- start menu ---------------- */

  const pins = startPins(doc).filter((p) => p.startsWith("webapp:") ? (doc.webApps ?? []).some((w) => `webapp:${w.url}` === p) : true);
  const allApps = [...APPS.filter((a) => a.list).map((a) => ({ id: a.id, name: a.name })), ...(doc.webApps ?? []).map((w) => ({ id: `webapp:${w.url}`, name: w.name }))].sort((a, b) => a.name.localeCompare(b.name));
  const startLeft = align === "Left";
  const flyW = Math.min(620, bounds.w - 24);
  const startStyle: React.CSSProperties = { bottom: 12, width: flyW, height: Math.min(600, bounds.h / scale - TASKBAR_H - 24), ...(startLeft ? { left: 12 } : { left: "50%", marginLeft: -flyW / 2 }) };

  const startMenu = flyout === "start" && (
    <Flyout label="Start" style={startStyle} className="flex flex-col">
      <div className="px-8 pt-6">
        <div className="flex h-9 items-center gap-2 rounded-full px-4" style={{ background: T.input, border: `1px solid ${T.line}` }}>
          <G n="search" s={14} />
          <input aria-label="Search for apps, settings, and documents" autoFocus placeholder="Search for apps, settings, and documents" value={query} onChange={(e) => { setQuery(e.target.value); if (e.target.value) setFlyout("search"); }} onKeyDown={(e) => e.stopPropagation()} className="min-w-0 flex-1 bg-transparent text-[12.5px] outline-none" style={{ color: T.text }} />
        </div>
      </div>
      {!startAll ? (
        <div className="min-h-0 flex-1 overflow-auto px-8 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-semibold">Pinned</span>
            <button type="button" aria-label="All apps" onClick={() => setStartAll(true)} className="flex items-center gap-1 rounded px-2 py-1 text-[11.5px] hover:bg-[var(--w-hover)]" style={{ background: T.card, border: `1px solid ${T.line}` }}>All <G n="chevR" s={10} /></button>
          </div>
          <div className="mb-5 grid grid-cols-6 gap-1">
            {pins.map((id) => (
              <button
                key={id}
                type="button"
                aria-label={appName(doc, id)}
                onClick={() => { closeFly(); cmd("win.open", id); }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  ctx.menu(e, [
                    { label: "Unpin from Start", icon: "pin", onClick: () => cmd("start.unpin", id) },
                    tbApps.includes(id) ? { label: "Unpin from taskbar", icon: "pin", onClick: () => cmd("taskbar.unpin", id) } : { label: "Pin to taskbar", icon: "pin", onClick: () => cmd("taskbar.pin", id) },
                    { label: "App settings", icon: "gear", disabled: true },
                    { label: "Uninstall", icon: "delete", disabled: !id.startsWith("webapp:"), onClick: () => cmd("app.uninstall", appName(doc, id)) },
                  ]);
                }}
                className="flex flex-col items-center gap-1.5 rounded p-2 text-[11px] hover:bg-[var(--w-hover)]"
              >
                <AppIcon id={id} s={30} />
                <span className="w-full truncate text-center">{appName(doc, id)}</span>
              </button>
            ))}
          </div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-semibold">Recommended</span>
          </div>
          {S(doc, "start.recent") === "on" && (doc.recent ?? []).length ? (
            <div className="grid grid-cols-2 gap-1 pb-3">
              {(doc.recent ?? []).filter((p) => getItem(doc, p)).slice(0, 6).map((p) => (
                <button key={p} type="button" aria-label={baseOf(p)} onClick={() => { closeFly(); openItem(ctx, p); }} className="flex items-center gap-3 rounded p-2 text-left hover:bg-[var(--w-hover)]">
                  <FileArt kind={entryOf(doc, p, false)?.art ?? "file"} s={28} />
                  <span className="min-w-0"><span className="block truncate text-[12px]">{baseOf(p)}</span><span className="block text-[10.5px]" style={{ color: T.sub }}>Recently opened</span></span>
                </button>
              ))}
            </div>
          ) : (
            <p className="pb-3 text-[11.5px]" style={{ color: T.sub }}>To show your recent files and new apps, turn them on in Settings.</p>
          )}
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-auto px-8 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-semibold">All</span>
            <button type="button" aria-label="Back" onClick={() => setStartAll(false)} className="flex items-center gap-1 rounded px-2 py-1 text-[11.5px] hover:bg-[var(--w-hover)]" style={{ background: T.card, border: `1px solid ${T.line}` }}><G n="chevL" s={10} /> Back</button>
          </div>
          {allApps.map((a, i) => (
            <div key={a.id}>
              {(i === 0 || allApps[i - 1].name[0].toUpperCase() !== a.name[0].toUpperCase()) && <div className="px-2 pb-1 pt-2 text-[11px] font-semibold" style={{ color: T.sub }}>{a.name[0].toUpperCase()}</div>}
              <button
                type="button"
                aria-label={a.name}
                onClick={() => { closeFly(); cmd("win.open", a.id); }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  ctx.menu(e, [
                    pins.includes(a.id) ? { label: "Unpin from Start", icon: "pin", onClick: () => cmd("start.unpin", a.id) } : { label: "Pin to Start", icon: "pin", onClick: () => cmd("start.pin", a.id) },
                    { label: "More", sub: [tbApps.includes(a.id) ? { label: "Unpin from taskbar", icon: "pin", onClick: () => cmd("taskbar.unpin", a.id) } : { label: "Pin to taskbar", icon: "pin", onClick: () => cmd("taskbar.pin", a.id) }, { label: "App settings", disabled: true }] },
                    { label: "Uninstall", icon: "delete", disabled: !a.id.startsWith("webapp:"), onClick: () => cmd("app.uninstall", a.name) },
                  ]);
                }}
                className="flex h-9 w-full items-center gap-3 rounded px-2 text-left text-[12px] hover:bg-[var(--w-hover)]"
              >
                <AppIcon id={a.id} s={22} /> {a.name}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex h-14 shrink-0 items-center justify-between px-10" style={{ background: T.bg, borderTop: `1px solid ${T.line}` }}>
        <button
          type="button"
          aria-label={userName(doc)}
          onClick={(e) =>
            ctx.menu({ clientX: e.clientX, clientY: e.clientY - 130 }, [
              { label: "Change account settings", icon: "accounts", onClick: () => { closeFly(); cmd("settings.nav", "accounts/info"); } },
              { label: "Lock", icon: "lock", onClick: () => { closeFly(); cmd("win.lock"); } },
              { label: "Sign out", icon: "open", onClick: () => { closeFly(); cmd("power.signout"); } },
            ])
          }
          className="flex items-center gap-3 rounded px-2 py-1.5 text-[12px] hover:bg-[var(--w-hover)]"
        >
          <Avatar name={userName(doc)} s={30} /> {userName(doc)}
        </button>
        <button
          type="button"
          aria-label="Power"
          title="Power"
          onClick={(e) =>
            ctx.menu({ clientX: e.clientX - 150, clientY: e.clientY - 170 }, [
              { label: "Sign-in options", icon: "key", onClick: () => { closeFly(); cmd("settings.nav", "accounts/signin"); } },
              { sep: true },
              { label: "Sleep", icon: "moon", onClick: () => { closeFly(); cmd("power.sleep"); } },
              { label: updatesPending ? "Update and shut down" : "Shut down", icon: "power", onClick: () => { closeFly(); cmd("power.shutdown"); } },
              { label: updatesPending ? "Update and restart" : "Restart", icon: "refresh", onClick: () => { closeFly(); cmd("power.restart"); } },
            ])
          }
          className="rounded p-2 hover:bg-[var(--w-hover)]"
        >
          <G n="power" s={18} />
        </button>
      </div>
    </Flyout>
  );

  const searchFly = flyout === "search" && (
    <Flyout label="Search" style={startStyle} className="flex flex-col">
      <div className="px-6 pt-5">
        <div className="flex h-9 items-center gap-2 rounded-full px-4" style={{ background: T.input, border: `1px solid ${T.accent}` }}>
          <G n="search" s={14} />
          <input
            aria-label="Type here to search"
            autoFocus
            placeholder="Type here to search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                if (results?.best) openHit(results.best);
                else if (query.trim()) openHit({ kind: "web", id: "", title: query.trim() });
              }
              if (e.key === "Escape") closeFly();
            }}
            className="min-w-0 flex-1 bg-transparent text-[12.5px] outline-none"
            style={{ color: T.text }}
          />
        </div>
      </div>
      <div className="flex min-h-0 flex-1 gap-3 p-4">
        {!results ? (
          <div className="flex-1 overflow-auto px-2">
            <div className="mb-2 text-[13px] font-semibold">Top apps</div>
            <div className="mb-4 flex flex-wrap gap-1">
              {["explorer", "edge", "settings", "notepad", "taskmgr", "cmd"].map((id) => (
                <button key={id} type="button" aria-label={appName(doc, id)} onClick={() => { closeFly(); cmd("win.open", id); }} className="flex w-20 flex-col items-center gap-1.5 rounded p-2 text-[11px] hover:bg-[var(--w-hover)]">
                  <AppIcon id={id} s={26} /><span className="w-full truncate text-center">{appName(doc, id)}</span>
                </button>
              ))}
            </div>
            <div className="mb-2 text-[13px] font-semibold">Quick searches</div>
            <div className="flex flex-wrap gap-2">
              {["Display settings", "Printers & scanners", "Windows Update", "Bluetooth"].map((s) => (
                <button key={s} type="button" aria-label={s} onClick={() => setQuery(s)} className="rounded-full px-3 py-1 text-[11.5px]" style={{ background: T.card, border: `1px solid ${T.line}` }}>{s}</button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="w-[52%] overflow-auto">
              {results.best && (
                <>
                  <div className="mb-1 text-[12px] font-semibold">Best match</div>
                  <button type="button" aria-label={`${results.best.title}, ${results.best.sub}`} onClick={() => openHit(results.best)} className="mb-3 flex w-full items-center gap-3 rounded p-2 text-left" style={{ background: T.sel }}>
                    {results.best.kind === "app" ? <AppIcon id={results.best.id} s={30} /> : results.best.kind === "setting" ? <AppIcon id="settings" s={30} /> : <FileArt kind={entryOf(doc, results.best.id, false)?.art ?? "file"} s={30} />}
                    <span><span className="block text-[13px]">{results.best.title}</span><span className="text-[11px]" style={{ color: T.sub }}>{results.best.sub}</span></span>
                  </button>
                </>
              )}
              {(["app", "setting", "file"] as const).map((k) => {
                const list = results.hits.filter((h) => h.kind === k && h !== results.best);
                if (!list.length) return null;
                return (
                  <div key={k} className="mb-2">
                    <div className="mb-1 text-[12px] font-semibold">{k === "app" ? "Apps" : k === "setting" ? "Settings" : "Documents"}</div>
                    {list.map((h) => (
                      <button key={h.id + h.title} type="button" aria-label={h.title} onClick={() => openHit(h)} className="flex h-8 w-full items-center gap-2 rounded px-2 text-left text-[12px] hover:bg-[var(--w-hover)]">
                        {k === "app" ? <AppIcon id={h.id} s={18} /> : k === "setting" ? <G n="gear" s={15} /> : <FileArt kind={entryOf(doc, h.id, false)?.art ?? "file"} s={18} />}
                        <span className="truncate">{h.title}</span>
                      </button>
                    ))}
                  </div>
                );
              })}
              <div className="mb-1 text-[12px] font-semibold">Search the web</div>
              <button type="button" aria-label={`${results.q} - See more search results`} onClick={() => openHit({ kind: "web", id: "", title: results.q })} className="flex h-8 w-full items-center gap-2 rounded px-2 text-left text-[12px] hover:bg-[var(--w-hover)]">
                <G n="search" s={14} /> <span className="truncate">{results.q} <span style={{ color: T.sub }}>- See more search results</span></span>
              </button>
            </div>
            {results.best && (
              <div className="flex flex-1 flex-col items-center rounded-lg p-4 text-center" style={{ background: T.card, border: `1px solid ${T.line}` }}>
                {results.best.kind === "app" ? <AppIcon id={results.best.id} s={56} /> : results.best.kind === "setting" ? <AppIcon id="settings" s={56} /> : <FileArt kind={entryOf(doc, results.best.id, false)?.art ?? "file"} s={56} />}
                <div className="mt-2 text-[15px] font-semibold">{results.best.title}</div>
                <div className="mb-3 text-[11.5px]" style={{ color: T.sub }}>{results.best.sub}</div>
                <div className="w-full border-t pt-2 text-left" style={{ borderColor: T.line }}>
                  <button type="button" aria-label="Open" onClick={() => openHit(results.best)} className="flex h-8 w-full items-center gap-2 rounded px-2 text-[12px] hover:bg-[var(--w-hover)]"><G n="open" s={14} /> Open</button>
                  {results.best.kind === "file" && (
                    <button type="button" aria-label="Open file location" onClick={() => { const b = results.best!; closeFly(); setQuery(""); cmd("explorer.nav", parentOf(b.id)); select(`file:${realPath(doc, b.id)}`); }} className="flex h-8 w-full items-center gap-2 rounded px-2 text-[12px] hover:bg-[var(--w-hover)]"><FileArt kind="folder" s={14} /> Open file location</button>
                  )}
                  {results.best.kind === "app" && (
                    <>
                      <button type="button" aria-label="Pin to Start" onClick={() => cmd("start.pin", results.best!.id)} className="flex h-8 w-full items-center gap-2 rounded px-2 text-[12px] hover:bg-[var(--w-hover)]"><G n="pin" s={14} /> Pin to Start</button>
                      <button type="button" aria-label="Pin to taskbar" onClick={() => cmd("taskbar.pin", results.best!.id)} className="flex h-8 w-full items-center gap-2 rounded px-2 text-[12px] hover:bg-[var(--w-hover)]"><G n="pin" s={14} /> Pin to taskbar</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Flyout>
  );

  /* ---------------- quick settings ---------------- */

  const setS = (k: string, on: boolean) => cmd("settings.set", `${k}=${on ? "on" : "off"}`);
  const wifiOn = S(doc, "wifi") === "on";
  const btOn = S(doc, "bt") === "on";
  const quickFly = flyout === "quick" && (
    <Flyout label="Quick settings" style={{ right: 12, bottom: 12, width: 360 }}>
      {!quickSub && (
        <div className="p-5">
          <div className="mb-5 grid grid-cols-3 gap-3">
            <Tile label="Wi-Fi" icon={wifiOn ? "wifi" : "wifiOff"} on={wifiOn} sub={wifiOn && n.type === "wifi" && onlineNow() ? n.ssid : wifiOn ? "Wi-Fi" : "Wi-Fi"} onToggle={() => setS("wifi", !wifiOn)} onMore={() => setQuickSub("wifi")} />
            <Tile label="Bluetooth" icon="bluetooth" on={btOn} sub={btOn ? (devices(doc).find((d) => d.bt && d.connected)?.name ?? "Bluetooth") : "Bluetooth"} onToggle={() => setS("bt", !btOn)} onMore={() => setQuickSub("bt")} />
            <Tile label="Airplane mode" icon="airplane" on={S(doc, "airplane") === "on"} onToggle={() => setS("airplane", S(doc, "airplane") !== "on")} />
            <Tile label="Energy saver" icon="leaf" on={S(doc, "energySaver") === "on"} onToggle={() => setS("energySaver", S(doc, "energySaver") !== "on")} />
            <Tile label="Night light" icon="moon" on={S(doc, "nightlight") === "on"} onToggle={() => setS("nightlight", S(doc, "nightlight") !== "on")} />
            <Tile label="Accessibility" icon="access" on={false} onToggle={() => setQuickSub("access")} onMore={() => setQuickSub("access")} />
          </div>
          <div className="space-y-3">
            <QSlider k="display.brightness" label="Brightness" icon="sun" />
            <div className="flex items-center gap-1">
              <div className="flex-1"><QSlider k="volume" label="Volume" muted={muted} icon={muted ? "mute" : "volume"} onIcon={() => cmd("settings.set", `sound.mute=${S(doc, "sound.mute") === "on" ? "off" : "on"}`)} /></div>
              <button type="button" aria-label="Select a sound output" onClick={() => setQuickSub("sound")} className="rounded p-1 hover:bg-[var(--w-hover)]"><G n="chevR" s={12} /></button>
            </div>
          </div>
        </div>
      )}
      {quickSub === "wifi" && (
        <div className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <button type="button" aria-label="Back" onClick={() => setQuickSub(null)} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="back" s={14} /></button>
            <span className="flex-1 text-[14px] font-semibold">Wi-Fi</span>
            <Toggle label="Wi-Fi" on={wifiOn} onChange={(v) => setS("wifi", v)} showText={false} />
          </div>
          {!wifiOn ? (
            <p className="px-2 text-[12px]" style={{ color: T.sub }}>Wi-Fi is turned off.</p>
          ) : (
            n.networks.map((x) => {
              const cur = n.type === "wifi" && n.ssid === x.ssid && onlineNow();
              return (
                <div key={x.ssid} className="mb-1 flex items-center gap-3 rounded px-2 py-2 hover:bg-[var(--w-hover)]" style={{ background: cur ? T.sel : undefined }}>
                  <G n="wifi" s={18} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12.5px]">{x.ssid}</div>
                    <div className="text-[11px]" style={{ color: T.sub }}>{cur ? "Connected, secured" : x.secure === false ? "Open" : "Secured"}{x.note ? ` · ${x.note}` : ""}</div>
                  </div>
                  {cur ? <Btn small label={`Disconnect ${x.ssid}`} onClick={() => cmd("net.disconnect", x.ssid)}>Disconnect</Btn> : <Btn small primary label={`Connect ${x.ssid}`} onClick={() => connectWifi(ctx, x.ssid)}>Connect</Btn>}
                </div>
              );
            })
          )}
          <button type="button" aria-label="More Wi-Fi settings" onClick={() => { closeFly(); cmd("settings.nav", "network/wifi"); }} className="mt-2 px-2 text-[12px] hover:underline" style={{ color: T.accent }}>More Wi-Fi settings</button>
        </div>
      )}
      {quickSub === "bt" && (
        <div className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <button type="button" aria-label="Back" onClick={() => setQuickSub(null)} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="back" s={14} /></button>
            <span className="flex-1 text-[14px] font-semibold">Bluetooth</span>
            <Toggle label="Bluetooth" on={btOn} onChange={(v) => setS("bt", v)} showText={false} />
          </div>
          {devices(doc).filter((d) => d.bt).map((d) => (
            <div key={d.name} className="mb-1 flex items-center gap-3 rounded px-2 py-2 hover:bg-[var(--w-hover)]">
              <G n={d.kind === "keyboard" ? "keyboard" : d.kind === "mouse" ? "mouse" : "headset"} s={18} />
              <div className="flex-1 text-[12.5px]">{d.name}<div className="text-[11px]" style={{ color: T.sub }}>{d.connected && btOn ? "Connected" : "Paired"}</div></div>
              {btOn && (d.connected ? <Btn small label={`Disconnect ${d.name}`} onClick={() => cmd("bt.disconnect", d.name)}>Disconnect</Btn> : <Btn small label={`Connect ${d.name}`} onClick={() => cmd("bt.connect", d.name)}>Connect</Btn>)}
            </div>
          ))}
          <button type="button" aria-label="More Bluetooth settings" onClick={() => { closeFly(); cmd("settings.nav", "bluetooth"); }} className="mt-2 px-2 text-[12px] hover:underline" style={{ color: T.accent }}>More Bluetooth settings</button>
        </div>
      )}
      {quickSub === "sound" && (
        <div className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <button type="button" aria-label="Back" onClick={() => setQuickSub(null)} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="back" s={14} /></button>
            <span className="text-[14px] font-semibold">Sound output</span>
          </div>
          {["Speakers (Realtek(R) Audio)", ...devices(doc).filter((d) => d.connected && ["headset", "earbuds", "speaker"].includes(d.kind)).map((d) => (d.kind === "speaker" ? `Speaker (${d.name})` : `Headphones (${d.name})`))].map((o) => (
            <button key={o} type="button" aria-label={o} onClick={() => o !== S(doc, "sound.output") && cmd("settings.set", `sound.output=${o}`)} className="mb-1 flex w-full items-center gap-3 rounded px-2 py-2 text-left text-[12.5px] hover:bg-[var(--w-hover)]" style={{ background: S(doc, "sound.output") === o ? T.sel : undefined }}>
              <G n="volume" s={16} /> {o}
            </button>
          ))}
          <button type="button" aria-label="More volume settings" onClick={() => { closeFly(); cmd("settings.nav", "system/sound"); }} className="mt-2 px-2 text-[12px] hover:underline" style={{ color: T.accent }}>More volume settings</button>
        </div>
      )}
      {quickSub === "access" && (
        <div className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <button type="button" aria-label="Back" onClick={() => setQuickSub(null)} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="back" s={14} /></button>
            <span className="text-[14px] font-semibold">Accessibility</span>
          </div>
          {[["access.magnifier", "Magnifier"], ["access.colorFilters", "Color filters"], ["access.narrator", "Narrator"], ["access.captions", "Live captions"]].map(([k, l]) => (
            <div key={k} className="mb-1 flex items-center justify-between rounded px-2 py-2 text-[12.5px]">
              {l}
              <Toggle label={l} on={S(doc, k) === "on"} onChange={(v) => setS(k, v)} showText={false} />
            </div>
          ))}
          <button type="button" aria-label="More accessibility settings" onClick={() => { closeFly(); cmd("settings.nav", "accessibility"); }} className="mt-2 px-2 text-[12px] hover:underline" style={{ color: T.accent }}>More accessibility settings</button>
        </div>
      )}
      <div className="flex h-12 items-center justify-between px-5" style={{ background: T.bg, borderTop: `1px solid ${T.line}` }}>
        <span className="flex items-center gap-2 text-[12px]">{laptop ? <><G n="battery" s={16} /> {specs(doc).battery}</> : null}</span>
        <span className="flex gap-1">
          <button type="button" aria-label="Edit quick settings" className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="edit" s={15} /></button>
          <button type="button" aria-label="All settings" onClick={() => { closeFly(); cmd("win.open", "settings"); }} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="gear" s={15} /></button>
        </span>
      </div>
    </Flyout>
  );

  /* ---------------- notification center ---------------- */

  const dnd = S(doc, "notifications.dnd") === "on";
  const notifyFly = flyout === "notify" && (
    <Flyout label="Notification center" style={{ right: 12, bottom: 12, width: 360, maxHeight: "92%" }} className="flex flex-col">
      <div className="min-h-0 flex-1 overflow-auto p-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[13px] font-semibold">Notifications</span>
          <span className="flex items-center gap-1">
            {notifications.length > 0 && <button type="button" aria-label="Clear all notifications" onClick={() => cmd("notify.clear")} className="rounded px-2 py-1 text-[11px] hover:bg-[var(--w-hover)]">Clear all</button>}
            <button type="button" aria-label="Do not disturb" aria-pressed={dnd} title="Do not disturb" onClick={() => cmd("settings.set", `notifications.dnd=${dnd ? "off" : "on"}`)} className="rounded p-1.5 hover:bg-[var(--w-hover)]" style={{ background: dnd ? T.accent : undefined, color: dnd ? T.accentText : undefined }}><G n={dnd ? "bellOff" : "bell"} s={15} /></button>
          </span>
        </div>
        {notifications.length === 0 ? <p className="py-6 text-center text-[12px]" style={{ color: T.sub }}>No new notifications</p> : notifications.map((x, i) => (
          <div key={i} className="mb-2 rounded-lg p-3" style={{ background: T.card, border: `1px solid ${T.line}` }}>
            <div className="mb-1 flex items-center gap-2 text-[11px]" style={{ color: T.sub }}><AppIcon id={x.app} s={14} /> {appName(doc, x.app)} <span className="flex-1" /> {x.time ?? ""}</div>
            <div className="text-[12.5px] font-semibold">{x.title}</div>
            <div className="text-[12px]" style={{ color: T.sub }}>{x.text}</div>
          </div>
        ))}
      </div>
      <div className="p-3" style={{ borderTop: `1px solid ${T.line}` }}>
        <div className="mb-2 text-[13px] font-semibold">{NOW.long}</div>
        <div className="grid grid-cols-7 gap-0.5 text-center text-[11px]">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d} className="py-1" style={{ color: T.sub }}>{d}</span>)}
          {Array.from({ length: 4 }).map((_, i) => <span key={`b${i}`} />)}
          {Array.from({ length: 31 }).map((_, i) => (
            <span key={i} className="flex h-7 items-center justify-center rounded-full" style={{ background: i + 1 === 20 ? T.accent : undefined, color: i + 1 === 20 ? T.accentText : undefined }}>{i + 1}</span>
          ))}
        </div>
      </div>
    </Flyout>
  );

  /* ---------------- tray overflow / OneDrive ---------------- */

  const odRoot = doc.fs.find((r) => r.root === "onedrive");
  const odError = odRoot ? allFiles(doc).some((f) => f.path.startsWith(`${odRoot.name}/`) && f.item.sync === "error") : false;
  const trayFly = flyout === "tray" && (
    <Flyout label="Show hidden icons" style={{ right: 210, bottom: 12, width: 150 }}>
      <div className="grid grid-cols-3 gap-1 p-2">
        {odRoot && <button type="button" aria-label="OneDrive" title="OneDrive" onClick={() => setFlyout("onedrive")} className="flex h-10 items-center justify-center rounded hover:bg-[var(--w-hover)]"><AppIcon id="onedrive" s={20} /></button>}
        <button type="button" aria-label="Windows Security" title="Windows Security" onClick={() => { closeFly(); cmd("win.open", "security"); }} className="flex h-10 items-center justify-center rounded hover:bg-[var(--w-hover)]"><AppIcon id="security" s={18} /></button>
        <button type="button" aria-label="Microsoft Teams" title="Microsoft Teams" onClick={() => { closeFly(); cmd("win.open", "teams"); }} className="flex h-10 items-center justify-center rounded hover:bg-[var(--w-hover)]"><AppIcon id="teams" s={18} /></button>
      </div>
    </Flyout>
  );
  const oneDriveFly = flyout === "onedrive" && odRoot && (
    <Flyout label="OneDrive" style={{ right: 120, bottom: 12, width: 340 }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${T.line}` }}>
        <AppIcon id="onedrive" s={22} />
        <span className="flex-1 text-[13px] font-semibold">{odRoot.label ?? "OneDrive"}</span>
        <button type="button" aria-label="Open online" title="View online" onClick={() => { closeFly(); cmd("edge.nav", "onedrive.live.com"); }} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><G n="globe" s={15} /></button>
        <button type="button" aria-label="Open folder" title="Open folder" onClick={() => { closeFly(); cmd("explorer.nav", odRoot.name); }} className="rounded p-1.5 hover:bg-[var(--w-hover)]"><FileArt kind="folder" s={15} /></button>
        <button
          type="button"
          aria-label="Help & Settings"
          title="Help & Settings"
          onClick={(e) => ctx.menu(e, [{ label: "Settings", icon: "gear", onClick: () => { closeFly(); setModal(<OneDriveSettings />); } }, { label: "Pause syncing", disabled: true }, { label: "Quit OneDrive", disabled: true }])}
          className="rounded p-1.5 hover:bg-[var(--w-hover)]"
        >
          <G n="gear" s={15} />
        </button>
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <span style={{ color: odError ? "#c42b1c" : "#107c10" }}><G n={odError ? "warn" : "cloudCheck"} s={22} /></span>
        <div className="text-[12px]">
          <div className="font-semibold">{odError ? "1 sync issue" : "Your files are synced"}</div>
          <div style={{ color: T.sub }}>{odError ? "A file couldn't be uploaded. Check the file name and try again." : "Files are up to date in the cloud."}</div>
        </div>
      </div>
      <div className="px-4 pb-3 text-[11px]" style={{ color: T.sub }}>2.1 GB of 1 TB cloud storage used</div>
    </Flyout>
  );

  /* ---------------- shortcut helper ---------------- */

  const combos: [string, string][] = [
    ["Win", "Start"],
    ["Win+E", "File Explorer"],
    ["Win+D", "Show desktop"],
    ["Win+I", "Settings"],
    ["Win+L", "Lock"],
    ["Win+S", "Search"],
    ["Win+X", "Quick Link menu"],
    ["Win+Shift+S", "Snip"],
    ["Win+V", "Clipboard history"],
    ["Win+Tab", "Task view"],
    ["Alt+Tab", "Switch windows"],
    ["Ctrl+Shift+Esc", "Task Manager"],
    ["Win+Left", "Snap left"],
    ["Win+Right", "Snap right"],
    ["Win+Up", "Maximize"],
    ["Win+Down", "Restore / minimize"],
    ["Win+Ctrl+D", "New desktop"],
    ["Win+Ctrl+Left", "Previous desktop"],
    ["Win+Ctrl+Right", "Next desktop"],
  ];
  const keyLabel = (c: string) => c.replace("Win", "⊞").replace("Left", "←").replace("Right", "→").replace("Up", "↑").replace("Down", "↓");
  const helperStrip = helper && (
    <div role="toolbar" aria-label="Windows key shortcuts" className="w11-up absolute inset-x-2 z-[270] rounded-lg px-2 py-1.5 shadow-2xl" style={{ bottom: 6, background: T.flyout, color: T.text, border: `1px solid ${T.line}` }} onMouseDown={(e) => e.stopPropagation()}>
      <div className="flex flex-wrap items-center gap-1">
        <span className="mr-1 flex items-center gap-1.5 text-[11px] font-semibold" title="Your computer keeps the Windows key for itself, so press Windows key shortcuts here. Ctrl shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z, F2, Delete) work on your own keyboard.">
          <G n="keyboard" s={14} /> Shortcuts
        </span>
        {combos.map(([c, label]) => (
          <button key={c} type="button" aria-label={`${c.replace("Win", "Windows key").replace(/\+/g, " + ")} (${label})`} title={label} onMouseDown={(e) => e.preventDefault()} onClick={() => runCombo(c)} className="flex flex-col items-start rounded px-1.5 py-0.5 text-left leading-tight hover:brightness-95" style={{ background: T.card, border: `1px solid ${T.line}` }}>
            <span className="whitespace-nowrap font-mono text-[10.5px] font-semibold">{keyLabel(c)}</span>
            <span className="whitespace-nowrap text-[9px]" style={{ color: T.sub }}>{label}</span>
          </button>
        ))}
        <button type="button" aria-label="Close shortcuts" onClick={() => setHelper(false)} className="ml-auto rounded p-1 hover:bg-[var(--w-hover)]"><G n="close" s={10} /></button>
      </div>
    </div>
  );

  /* ---------------- clipboard history ---------------- */

  const clipFly = flyout === "clip" && (
    <Flyout label="Clipboard history" style={{ left: "50%", marginLeft: -170, bottom: 12, width: 340, maxHeight: 400 }} className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-2" style={{ borderBottom: `1px solid ${T.line}` }}>
        <G n="emoji" s={16} />
        <G n="clip" s={16} style={{ color: T.accent }} />
        <span className="flex-1 text-[12.5px] font-semibold">Clipboard</span>
        {S(doc, "clipboard.history") === "on" && clips.length > 0 && <button type="button" aria-label="Clear all" onClick={() => setClips([])} className="text-[11px] hover:underline">Clear all</button>}
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-3">
        {S(doc, "clipboard.history") !== "on" ? (
          <div className="py-4 text-center">
            <p className="mb-1 text-[13px] font-semibold">Can&apos;t show history</p>
            <p className="mb-3 text-[11.5px]" style={{ color: T.sub }}>To see the history of what you&apos;ve copied, turn on clipboard history.</p>
            <Btn primary label="Turn on" onClick={() => cmd("settings.set", "clipboard.history=on")}>Turn on</Btn>
          </div>
        ) : clips.length === 0 ? (
          <p className="py-6 text-center text-[12px]" style={{ color: T.sub }}>You&apos;ll see your clipboard history here once you&apos;ve copied something.</p>
        ) : (
          clips.map((c, i) => (
            <button key={i} type="button" aria-label={`Paste ${c.slice(0, 40)}`} onClick={() => { closeFly(); insertRef.current?.(c); }} className="mb-1.5 block w-full rounded-lg p-3 text-left text-[12px] hover:brightness-95" style={{ background: T.card, border: `1px solid ${T.line}` }}>
              <span className="line-clamp-3 whitespace-pre-wrap">{c}</span>
            </button>
          ))
        )}
      </div>
    </Flyout>
  );

  /* ---------------- taskbar ---------------- */

  const trayNetIcon = !onlineNow() ? (S(doc, "airplane") === "on" ? "airplane" : "globeOff") : n.type === "wifi" ? "wifi" : "ethernet";
  const vpnOn = n.vpns.some((v) => v.connected);
  const taskbar = (
    <div
      role="toolbar"
      aria-label="Taskbar"
      className="absolute inset-x-0 bottom-0 z-[250] flex items-center px-2"
      style={{ height: TASKBAR_H, background: T.taskbar, borderTop: `1px solid ${T.line}`, backdropFilter: "blur(30px)", color: T.text }}
      onMouseDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        // Empty taskbar space: the bar itself or the strip that holds the app buttons.
        if (e.target !== e.currentTarget && !(e.target as HTMLElement).dataset?.tbEmpty) return;
        e.preventDefault();
        ctx.menu({ clientX: e.clientX, clientY: e.clientY - 80 }, [{ label: "Task Manager", icon: "chart", onClick: () => cmd("win.open", "taskmgr") }, { label: "Taskbar settings", icon: "gear", onClick: () => cmd("settings.nav", "personalization/taskbar") }]);
      }}
    >
      {S(doc, "taskbar.widgets") === "on" && align !== "Left" && (
        <button type="button" aria-label="Widgets" title="Widgets" className="flex h-10 items-center gap-2 rounded px-2 text-[11.5px] hover:bg-[var(--w-hover)]">
          <span className="text-[18px]">⛅</span>
          <span className="hidden leading-tight sm:block"><span className="block font-semibold">64°F</span><span style={{ color: T.sub }}>Partly sunny</span></span>
        </button>
      )}
      <div data-tb-empty="1" className={`flex min-w-0 flex-1 items-center gap-0.5 ${align === "Left" ? "justify-start" : "justify-center"}`}>
        <button
          type="button"
          aria-label="Start"
          title="Start"
          onClick={() => { setQuery(""); setStartAll(false); setFlyout((f) => (f === "start" ? null : "start")); }}
          onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); quickLink({ clientX: e.clientX, clientY: e.clientY - 420 }); }}
          className="flex h-10 w-10 items-center justify-center rounded hover:bg-[var(--w-hover)]"
          style={{ background: flyout === "start" ? T.hover : undefined }}
        >
          <WinLogo s={22} />
        </button>
        {searchMode === "Search box" || searchMode === "Search icon and label" ? (
          <button type="button" aria-label="Search" onClick={() => { setQuery(""); setFlyout((f) => (f === "search" ? null : "search")); }} className="mx-1 flex h-8 w-44 items-center gap-2 rounded-full px-3 text-[12px] hover:brightness-95" style={{ background: T.input, border: `1px solid ${T.line}`, color: T.sub }}>
            <G n="search" s={15} /> Search
          </button>
        ) : searchMode === "Search icon only" ? (
          <button type="button" aria-label="Search" onClick={() => { setQuery(""); setFlyout((f) => (f === "search" ? null : "search")); }} className="flex h-10 w-10 items-center justify-center rounded hover:bg-[var(--w-hover)]"><G n="search" s={18} /></button>
        ) : null}
        {S(doc, "taskbar.taskview") === "on" && (
          <button type="button" aria-label="Task View" title="Task View" onClick={() => { closeFly(); cmd("win.taskView"); setTaskView((t) => !t); }} className="flex h-10 w-10 items-center justify-center rounded hover:bg-[var(--w-hover)]"><G n="taskview" s={18} /></button>
        )}
        {allTb.map((app) => {
          const w = doc.windows.find((x) => x.app === app);
          const active = fw?.app === app;
          return (
            <button
              key={app}
              type="button"
              aria-label={appName(doc, app)}
              title={w ? `${appName(doc, app)} - 1 running window` : appName(doc, app)}
              onClick={() => tbClick(app)}
              onContextMenu={(e) => tbMenu(e, app)}
              className="relative flex h-10 w-10 items-center justify-center rounded hover:bg-[var(--w-hover)]"
              style={{ background: active ? T.hover : undefined }}
            >
              <AppIcon id={app} s={24} />
              {w && <span className="absolute bottom-0.5 h-[3px] rounded-full transition-all" style={{ width: active ? 16 : 6, background: active ? T.accent : T.sub }} />}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-0.5">
        <button type="button" aria-label="Show hidden icons" title="Show hidden icons" onClick={() => setFlyout((f) => (f === "tray" ? null : "tray"))} className="flex h-10 w-7 items-center justify-center rounded hover:bg-[var(--w-hover)]"><G n="chevU" s={12} /></button>
        {odRoot && (
          <button type="button" aria-label="OneDrive" title={odError ? "OneDrive - Sync issue" : "OneDrive - Up to date"} onClick={() => setFlyout((f) => (f === "onedrive" ? null : "onedrive"))} className="relative flex h-10 w-8 items-center justify-center rounded hover:bg-[var(--w-hover)]">
            <G n="cloud" s={17} />
            {odError && <span className="absolute bottom-2 right-1 h-2 w-2 rounded-full bg-[#c42b1c]" />}
          </button>
        )}
        <button
          type="button"
          aria-label="Keyboard shortcuts"
          title="Windows key shortcuts"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setHelper((h) => !h)}
          className="flex h-10 w-9 items-center justify-center rounded hover:bg-[var(--w-hover)]"
          style={{ background: helper ? T.hover : undefined, color: helper ? T.accent : undefined }}
        >
          <G n="keyboard" s={18} />
        </button>
        <button
          type="button"
          aria-label={`Quick settings: ${onlineNow() ? (n.type === "wifi" ? `${n.ssid} Internet access` : "Network Internet access") : "No internet access"}, Volume ${muted ? "muted" : S(doc, "volume")}`}
          onClick={() => { setQuickSub(null); setFlyout((f) => (f === "quick" ? null : "quick")); }}
          className="flex h-10 items-center gap-2 rounded px-2 hover:bg-[var(--w-hover)]"
          style={{ background: flyout === "quick" ? T.hover : undefined }}
        >
          <span className="relative">
            <G n={trayNetIcon} s={16} />
            {vpnOn && <span className="absolute -bottom-1 -right-1 rounded-sm bg-[#107c10] px-0.5 text-[7px] font-bold text-white">VPN</span>}
          </span>
          <G n={muted ? "mute" : "volume"} s={16} />
          {laptop && <G n="battery" s={16} />}
        </button>
        <button type="button" aria-label={`Clock ${NOW.time} ${NOW.date}, notification center`} onClick={() => setFlyout((f) => (f === "notify" ? null : "notify"))} className="relative flex h-10 flex-col items-end justify-center rounded px-2 text-[11.5px] leading-tight hover:bg-[var(--w-hover)]" style={{ background: flyout === "notify" ? T.hover : undefined }}>
          <span>{NOW.time}</span>
          <span>{NOW.date}</span>
          {notifications.length > 0 && !dnd && <span className="absolute right-0 top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-1 text-[9px]" style={{ background: T.accent, color: T.accentText }}>{notifications.length}</span>}
          {dnd && <span className="absolute right-0 top-1"><G n="bellOff" s={11} /></span>}
        </button>
        <button type="button" aria-label="Show desktop" title="Show desktop" onClick={() => cmd("win.showDesktop")} className="ml-1 h-10 w-1.5 hover:border-l" style={{ borderColor: T.line }} />
      </div>
    </div>
  );

  /* ---------------- Task view / Alt+Tab / snip ---------------- */

  const taskViewLayer = taskView && (
    <div className="absolute inset-0 z-[240] flex flex-col bg-black/45 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setTaskView(false); }}>
      <div className="flex flex-1 flex-wrap content-center items-center justify-center gap-5 p-8" onMouseDown={(e) => { if (e.target === e.currentTarget) setTaskView(false); }}>
        {doc.windows.filter((w) => deskOf(w) === desk).map((w) => (
          <button key={w.id} type="button" aria-label={appName(doc, w.app)} onClick={() => { setTaskView(false); cmd("win.focus", w.id); }} className="flex w-56 flex-col overflow-hidden rounded-lg text-left shadow-xl hover:outline hover:outline-2 hover:outline-white">
            <span className="flex items-center gap-2 bg-[#2b2b2b] px-2 py-1.5 text-[11.5px] text-white"><AppIcon id={w.app} s={14} /> {appName(doc, w.app)}</span>
            <span className="flex h-32 items-center justify-center" style={{ background: T.panel }}><AppIcon id={w.app} s={40} /></span>
          </button>
        ))}
        {doc.windows.filter((w) => deskOf(w) === desk).length === 0 && <p className="text-[13px] text-white">No open windows on this desktop</p>}
      </div>
      <div className="flex shrink-0 items-center justify-center gap-3 bg-black/40 p-3">
        {Array.from({ length: doc.desks ?? 1 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <button type="button" aria-label={`Desktop ${i + 1}`} onClick={() => { setTaskView(false); cmd("vd.switch", i + 1); }} className="h-16 w-28 rounded" style={{ background: WALLPAPERS[S(doc, "wallpaper")] ?? WALLPAPERS.Bloom, outline: i + 1 === desk ? "2px solid white" : undefined }} />
            <span className="flex items-center gap-1 text-[11px] text-white">
              Desktop {i + 1}
              {(doc.desks ?? 1) > 1 && <button type="button" aria-label={`Close Desktop ${i + 1}`} onClick={() => cmd("vd.close", i + 1)} className="rounded px-1 hover:bg-white/20"><G n="close" s={9} /></button>}
            </span>
          </div>
        ))}
        <button type="button" aria-label="New desktop" onClick={() => cmd("vd.new")} className="flex h-16 w-28 flex-col items-center justify-center gap-1 rounded border border-dashed border-white/60 text-[11px] text-white hover:bg-white/10">
          <G n="plus" s={16} /> New desktop
        </button>
      </div>
    </div>
  );

  const altOrder = [...doc.windows].filter((w) => deskOf(w) === desk).reverse();
  const altTabLayer = altTab && altOrder.length > 0 && (
    <div className="pointer-events-auto absolute inset-0 z-[245] flex items-center justify-center">
      <div className="flex max-w-[90%] flex-wrap justify-center gap-3 rounded-xl bg-black/60 p-4 backdrop-blur">
        {altOrder.map((w, i) => (
          <button key={w.id} type="button" aria-label={appName(doc, w.app)} onClick={() => { if (altTimer.current) clearTimeout(altTimer.current); setAltTab(null); cmd("win.focus", w.id); }} className="flex w-36 flex-col overflow-hidden rounded-lg" style={{ outline: i === altTab.i ? "3px solid white" : undefined }}>
            <span className="flex items-center gap-1.5 bg-[#2b2b2b] px-2 py-1 text-[11px] text-white"><AppIcon id={w.app} s={12} /> <span className="truncate">{appName(doc, w.app)}</span></span>
            <span className="flex h-20 items-center justify-center" style={{ background: T.panel }}><AppIcon id={w.app} s={30} /></span>
          </button>
        ))}
      </div>
    </div>
  );

  const snipLayer = snipping && (
    <div className="absolute inset-0 z-[280] cursor-crosshair bg-black/35" onMouseDown={(e) => e.stopPropagation()}>
      <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1 rounded-lg p-1 shadow-xl" style={{ background: T.flyout, color: T.text }}>
        {[["rectangle", "rect", "Rectangle"], ["window", "windowSnip", "Window"], ["fullscreen", "fullscreen", "Full screen"], ["freeform", "freeform", "Freeform"]].map(([m, ic, l]) => (
          <button
            key={m}
            type="button"
            aria-label={`${l} mode`}
            title={l}
            onClick={() => {
              if (m === "window") {
                setSnipping(null);
                setTimeout(() => cmd("snip.capture", "window"), 0);
                return;
              }
              setSnipping(null);
              cmd("snip.capture", m);
            }}
            className="flex h-9 w-9 items-center justify-center rounded hover:bg-[var(--w-hover)]"
          >
            <G n={ic} s={18} />
          </button>
        ))}
        <span className="mx-1 h-5 border-l" style={{ borderColor: T.line }} />
        <button type="button" aria-label="Close snipping" onClick={() => setSnipping(null)} className="flex h-9 w-9 items-center justify-center rounded hover:bg-[var(--w-hover)]"><G n="close" s={14} /></button>
      </div>
      <p className="absolute left-1/2 top-16 -translate-x-1/2 rounded bg-black/60 px-3 py-1 text-[12px] text-white">Choose a snip mode above, or drag to snip a rectangle</p>
      <div className="absolute inset-0 top-14" onMouseUp={() => { setSnipping(null); cmd("snip.capture", "rectangle"); }} />
    </div>
  );

  /* ---------------- lock screen ---------------- */

  const pinLen = pinOf(doc).length || 4;
  const lockLayer = doc.locked && (!doc.power || doc.power === "on") && (
    <div className="absolute inset-0 z-[600] flex flex-col items-center text-white" style={{ background: WALLPAPERS[S(doc, "wallpaper")] ?? WALLPAPERS.Bloom }} onMouseDown={(e) => { e.preventDefault(); setPinPanel(true); }} role="region" aria-label="Lock screen">
      <div className="absolute inset-0" style={{ background: pinPanel ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.08)", backdropFilter: pinPanel ? "blur(14px)" : undefined }} />
      {!pinPanel ? (
        <div className="relative mt-[12%] text-center drop-shadow-lg">
          <div className="text-[84px] font-semibold leading-none">{NOW.time.replace(/ (AM|PM)/, "")}</div>
          <div className="mt-2 text-[20px]">{NOW.long}</div>
          <p className="mt-10 text-[12px] opacity-80">Click or press any key to sign in</p>
        </div>
      ) : (
        <div className="relative mt-[10%] flex flex-col items-center gap-3" onMouseDown={(e) => e.stopPropagation()}>
          <Avatar name={userName(doc)} s={96} />
          <div className="text-[22px] font-semibold">{userName(doc)}</div>
          {doc.flags?.pinError ? (
            <>
              <p className="text-[13px]">The PIN is incorrect. Try again.</p>
              <button type="button" aria-label="OK" onClick={() => { setPin(""); cmd("win.unlock", ""); }} className="rounded bg-white/20 px-8 py-1.5 text-[13px] hover:bg-white/30">OK</button>
            </>
          ) : (
            <input
              ref={pinRef}
              autoFocus
              aria-label="PIN"
              type="password"
              inputMode="numeric"
              placeholder="PIN"
              value={pin}
              onChange={(e) => {
                const v = e.target.value;
                setPin(v);
                if (pinOf(doc) && v.length === pinLen && /^\d+$/.test(pinOf(doc))) {
                  setPin("");
                  cmd("win.unlock", v);
                }
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter" && pin) {
                  const v = pin;
                  setPin("");
                  cmd("win.unlock", v);
                }
              }}
              className="h-9 w-64 rounded border-b-2 border-white bg-white/20 px-3 text-[14px] text-white placeholder:text-white/70 outline-none"
            />
          )}
          <button type="button" aria-label="I forgot my PIN" className="text-[12px] opacity-80 hover:underline">I forgot my PIN</button>
          <p className="text-[11px] opacity-75">Practice PIN: {pinOf(doc) || doc.password || "none"}</p>
        </div>
      )}
      <div className="absolute bottom-4 right-5 flex gap-4" onMouseDown={(e) => e.stopPropagation()}>
        <G n={trayNetIcon} s={18} />
        <G n="access" s={18} />
        <button type="button" aria-label="Power" onClick={(e) => ctx.menu({ clientX: e.clientX - 120, clientY: e.clientY - 110 }, [{ label: "Sleep", icon: "moon", onClick: () => cmd("power.sleep") }, { label: "Shut down", icon: "power", onClick: () => cmd("power.shutdown") }, { label: "Restart", icon: "refresh", onClick: () => cmd("power.restart") }])}><G n="power" s={18} /></button>
      </div>
    </div>
  );

  const offLayer = doc.power && doc.power !== "on" && (
    <div className="absolute inset-0 z-[650] flex items-center justify-center bg-black" role="region" aria-label={doc.power === "off" ? "Computer is off" : "Computer is asleep"} onMouseDown={() => cmd("power.on")}>
      <button type="button" aria-label="Press the power button" onClick={() => cmd("power.on")} className="flex flex-col items-center gap-3 text-white/70 hover:text-white">
        <G n="power" s={40} />
        <span className="text-[12px]">{doc.power === "off" ? "The PC is off. Press the power button to turn it on." : "Sleeping. Move the mouse or press a key to wake."}</span>
      </button>
    </div>
  );

  const bootLayer = boot && (
    <div className="absolute inset-0 z-[700] flex flex-col items-center justify-center gap-4 bg-[#0b2a5b] text-white">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      <span className="text-[16px]">{doc.flags?.boot === "signout" ? "Signing out" : "Restarting"}</span>
    </div>
  );

  /* ---------------- toast and SmartScreen app dialog ---------------- */

  const toast = doc.toast && doc.toast.n !== toastHidden && !doc.locked && (
    <div role="status" className="w11-up absolute bottom-3 right-3 z-[290] w-[340px] rounded-lg p-3 shadow-2xl" style={{ background: T.flyout, color: T.text, border: `1px solid ${T.line}` }} onMouseDown={(e) => e.stopPropagation()}>
      <div className="mb-1 flex items-center gap-2 text-[11px]" style={{ color: T.sub }}>
        <G n="bell" s={12} /> <span className="flex-1">{doc.toast.title}</span>
        <button type="button" aria-label="Dismiss notification" onClick={() => setToastHidden(doc.toast?.n ?? null)}><G n="close" s={10} /></button>
      </div>
      <div className="text-[12.5px]">{doc.toast.text}</div>
    </div>
  );

  const smartApp = doc.flags?.smartApp && (
    <div className="absolute inset-0 z-[480] flex items-center justify-center bg-black/30" onMouseDown={(e) => e.stopPropagation()}>
      <SmartAppDialog name={String(doc.flags.smartApp)} />
    </div>
  );

  /* ---------------- render ---------------- */

  const wall = WALLPAPERS[S(doc, "wallpaper")] ?? WALLPAPERS.Bloom;
  const bright = Number(S(doc, "display.brightness") || 70);
  return (
    <WinCtx.Provider value={ctx}>
      <div
        ref={rootRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative h-full w-full select-none overflow-hidden outline-none"
        style={{ ...(THEME_VARS(dark) as React.CSSProperties), isolation: "isolate", background: "#000", fontFamily: "'Segoe UI Variable Text', 'Segoe UI', system-ui, sans-serif" }}
        onMouseDownCapture={(e) => {
          if (!(e.target as HTMLElement).closest?.('[role="menu"]')) deskActive.current = false;
        }}
        onMouseDown={() => setMenu(null)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <style>{`
          .w11-pop{animation:w11pop .12s ease-out}
          .w11-up{animation:w11up .16s ease-out}
          @keyframes w11pop{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
          @keyframes w11up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        `}</style>
        <div className="absolute inset-0" style={{ zoom: scale }}>
          <div className="absolute inset-0" style={{ background: wall }} />
          <div ref={deskRef} className="absolute inset-x-0 top-0" style={{ bottom: TASKBAR_H }}>
            {desktop}
            {doc.windows.map((w, i) => {
              if (w.min || deskOf(w) !== desk) return null;
              const r = rectOf(w, i);
              const active = fw?.id === w.id;
              const z = 10 + doc.windows.indexOf(w);
              return (
                <FrameCtx.Provider
                  key={w.id}
                  value={{
                    w,
                    active,
                    startDrag: (e) => {
                      if (e.button !== 0 || w.max || w.snap) return;
                      const box = deskRef.current?.getBoundingClientRect();
                      drag.current = { id: w.id, sx: e.clientX, sy: e.clientY, r, dw: box?.width ?? 800, dh: box?.height ?? 500 };
                    },
                  }}
                >
                  <div
                    role="application"
                    aria-label={appName(doc, w.app)}
                    className="absolute flex flex-col overflow-hidden"
                    style={{ ...frameStyle(w, r), zIndex: z, borderRadius: w.max ? 0 : 8, boxShadow: active ? "0 18px 50px rgba(0,0,0,.38), 0 0 0 1px rgba(0,0,0,.18)" : "0 8px 26px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.12)", background: T.bg }}
                    onMouseDown={() => {
                      if (doc.focus !== w.id || doc.windows[doc.windows.length - 1]?.id !== w.id) cmd("win.focus", w.id);
                      closeFly();
                    }}
                  >
                    <AppBody w={w} />
                  </div>
                </FrameCtx.Provider>
              );
            })}
            {startMenu}
            {searchFly}
            {quickFly}
            {notifyFly}
            {trayFly}
            {oneDriveFly}
            {clipFly}
            {helperStrip}
            {toast}
            {taskViewLayer}
            {altTabLayer}
          </div>
          {taskbar}
          {snipLayer}
        </div>
        {bright < 70 && <div className="pointer-events-none absolute inset-0 z-[590]" style={{ background: `rgba(0,0,0,${((70 - bright) / 70) * 0.5})` }} />}
        {S(doc, "nightlight") === "on" && <div className="pointer-events-none absolute inset-0 z-[591]" style={{ background: "rgba(255,140,40,.13)", mixBlendMode: "multiply" }} />}
        {smartApp}
        {modal}
        {menu && <Menu x={menu.x} y={menu.y} items={menu.items} top={menu.top} bounds={bounds} onClose={() => { setMenu(null); focusRoot(); }} />}
        {lockLayer}
        {offLayer}
        {bootLayer}
      </div>
    </WinCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop icon                                                        */
/* ------------------------------------------------------------------ */

function DeskIcon({
  label,
  art,
  selected,
  onDown,
  onOpen,
  onMenu,
  onDragStart,
  onDrop,
  dropTarget,
  shortcut,
  appIcon,
  renaming,
  path,
}: {
  label: string;
  art: string;
  selected: boolean;
  onDown: (e: React.MouseEvent) => void;
  onOpen: () => void;
  onMenu: (e: React.MouseEvent) => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  dropTarget?: boolean;
  shortcut?: boolean;
  appIcon?: string;
  renaming?: Entry | null;
  path?: string;
}) {
  const [hot, setHot] = useState(false);
  return (
    <div
      role="option"
      aria-selected={selected}
      aria-label={label}
      draggable={Boolean(onDragStart)}
      onDragStart={onDragStart}
      onDragOver={dropTarget ? (e) => { if (Array.from(e.dataTransfer.types).includes("application/x-win-paths")) { e.preventDefault(); e.stopPropagation(); setHot(true); } } : undefined}
      onDragLeave={() => setHot(false)}
      onDrop={onDrop ? (e) => { setHot(false); onDrop(e); } : undefined}
      onMouseDown={onDown}
      onDoubleClick={onOpen}
      onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); onMenu(e); }}
      data-path={path}
      className="pointer-events-auto flex w-[78px] cursor-default flex-col items-center gap-1 rounded p-1 text-center text-[11.5px] text-white"
      style={{ background: selected ? "rgba(255,255,255,.28)" : hot ? "rgba(255,255,255,.18)" : undefined, outline: selected ? "1px solid rgba(255,255,255,.5)" : undefined }}
    >
      <span className="relative">
        {appIcon ? <AppIcon id={appIcon} s={40} /> : <FileArt kind={art} s={42} />}
        {shortcut && <span className="absolute -bottom-0.5 -left-0.5"><FileArt kind="shortcut" s={13} /></span>}
      </span>
      {renaming ? <RenameBox entry={renaming} center className="w-full" /> : <span className="line-clamp-2 break-words leading-tight" style={{ textShadow: "0 1px 3px rgba(0,0,0,.8)" }}>{label}</span>}
    </div>
  );
}

function SmartAppDialog({ name }: { name: string }) {
  const [more, setMore] = useState(false);
  const ctx = useContext(WinCtx);
  return (
    <div role="dialog" aria-label="Windows protected your PC" className="w11-pop w-[440px] max-w-[94%] bg-[#0f6cbd] p-6 text-white shadow-2xl">
      <h2 className="mb-3 text-[24px] font-semibold">Windows protected your PC</h2>
      <p className="mb-2 text-[13px]">Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk.</p>
      {!more ? (
        <button type="button" aria-label="More info" onClick={() => setMore(true)} className="mb-6 text-[13px] underline">More info</button>
      ) : (
        <div className="mb-6 text-[13px]">
          <p>App: {name}</p>
          <p>Publisher: Unknown publisher</p>
        </div>
      )}
      <div className="flex justify-end gap-2">
        {more && <button type="button" aria-label="Run anyway" onClick={() => ctx?.cmd("fs.runAnyway", name)} className="border border-white px-5 py-1.5 text-[13px]">Run anyway</button>}
        <button type="button" aria-label="Don't run" onClick={() => ctx?.cmd("fs.dontRun", name)} className="border border-white bg-white/10 px-5 py-1.5 text-[13px]">Don&apos;t run</button>
      </div>
    </div>
  );
}

function Tile({ label, icon, on, onToggle, onMore, sub }: { label: string; icon: string; on: boolean; onToggle: () => void; onMore?: () => void; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-12 w-full overflow-hidden rounded" style={{ background: on ? T.accent : T.card, color: on ? T.accentText : T.text, border: `1px solid ${on ? T.accent : T.line}` }}>
        <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onToggle} className="flex flex-1 items-center justify-center hover:brightness-110"><G n={icon} s={18} /></button>
        {onMore && (
          <button type="button" aria-label={`Manage ${label}`} onClick={onMore} className="flex w-7 items-center justify-center hover:brightness-110" style={{ borderLeft: `1px solid ${on ? "rgba(255,255,255,.35)" : T.line}` }}><G n="chevR" s={11} /></button>
        )}
      </div>
      <span className="w-full truncate text-center text-[11px]">{sub ?? label}</span>
    </div>
  );
}

function QSlider({ k, label, icon, onIcon, muted }: { k: string; label: string; icon: string; onIcon?: () => void; muted?: boolean }) {
  const ctx = useContext(WinCtx);
  const key = k === "display.brightness" ? "brightness" : k;
  const cur = Number((ctx ? S(ctx.doc, k) : "0") || 0);
  const [v, setV] = useState(cur);
  useEffect(() => setV(cur), [cur]);
  const send = () => {
    const r = Math.round(v / 10) * 10;
    if (r !== cur) ctx?.cmd("settings.slide", `${key}=${r}`);
  };
  return (
    <div className="flex items-center gap-3">
      <button type="button" aria-label={onIcon ? (muted ? "Unmute" : "Mute") : label} onClick={onIcon} className="rounded p-1 hover:bg-[var(--w-hover)]"><G n={icon} s={18} /></button>
      <input type="range" aria-label={label} min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} onMouseUp={send} onKeyUp={send} onTouchEnd={send} className="flex-1" style={{ accentColor: "var(--w-accent)" }} />
      <span className="w-7 text-right text-[11px]">{Math.round(v / 10) * 10}</span>
    </div>
  );
}

function OneDriveSettings() {
  const ctx = useContext(WinCtx);
  if (!ctx) return null;
  const doc = ctx.doc;
  return (
    <Modal title="OneDrive settings" width={440} onClose={() => ctx.modal(null)} footer={<Btn primary label="Close" onClick={() => ctx.modal(null)}>Close</Btn>}>
      <div className="mb-2 text-[14px] font-semibold">Sync and back up</div>
      <p className="mb-3 text-[12px]" style={{ color: T.sub }}>Back up your important PC folders to OneDrive. They&apos;ll be protected and available on other devices.</p>
      {[["desktop", "Desktop"], ["documents", "Documents"], ["pictures", "Pictures"]].map(([k, l]) => (
        <div key={k} className="mb-2 flex items-center justify-between rounded p-3" style={{ background: T.bg }}>
          <span className="flex items-center gap-2 text-[12.5px]"><FileArt kind={k} s={18} /> {l}</span>
          <Toggle label={`Back up ${l}`} on={S(doc, `od.backup.${k}`) === "on"} onChange={(v) => ctx.cmd("settings.set", `od.backup.${k}=${v ? "on" : "off"}`)} />
        </div>
      ))}
    </Modal>
  );
}

export function WindowsStatusBar(_props: StatusBarProps<WinDoc>) {
  return null;
}

